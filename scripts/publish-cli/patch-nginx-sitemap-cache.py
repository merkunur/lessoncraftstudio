#!/usr/bin/env python3
"""
patch-nginx-sitemap-cache.py — serve the sitemaps from an nginx cache that never makes a crawler wait.

WHY
---
Search Console reported /sitemap/4.xml "could not be read" (owner, 2026-11-25). Measured in the access log:

    25/Nov 11:58:16  /sitemap/4.xml  504  rt=60.003   Googlebot   (nginx gave up on Next.js)
    25/Nov 11:57:16  /sitemap/0.xml  200  rt=19.716   Googlebot
    25/Nov 11:58:49  /sitemap/6.xml  200  rt=21.698   Googlebot
    25/Nov 10:46:13  /sitemap/6.xml  200  286,720 of 1,634,225 bytes, rt=29.979  AhrefsBot (cut off)

The shards are 1.5 to 22 MB of XML (4-7 hold the 30,000 landings with hreflang and images). Next.js prerenders them at
build, but every request still goes through Next, so whenever Next is busy (a deploy's checks and its pm2 reload: the
504 fell 46 s before the new process started; a crawl burst; a revalidation) a crawler waits on it, and a 504 or a cut
body is "could not be read". A sitemap is the same for everyone and changes slowly, so nginx keeps its own copy:

- `proxy_cache_valid 200 30m` (the routes' own revalidate is 1800 s);
- `proxy_cache_use_stale ... updating` + `proxy_cache_background_update on`: after 30 minutes the next request gets the
  stored copy AT ONCE and nginx refreshes it in the background; while Next is restarting or slow (error, timeout, 5xx)
  the stored copy is served too. `inactive=30d` keeps a copy through a long outage;
- `proxy_cache_lock on`: one request at a time fills an empty cache, the rest wait for it (never 4 parallel builds);
- one copy per URL: Accept-Encoding and the RSC headers are not sent upstream and `Vary` is ignored (Next sends
  `Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch`); nginx gzips the XML itself (gzip_types has application/xml);
- `X-Sitemap-Cache` (HIT / STALE / UPDATING / MISS / EXPIRED) shows what happened.
Only 200 answers are stored: an error never replaces a good copy.

Idempotent and self-updating (marker; the previous block is removed and the current one inserted); backs up to
/root/nginx-backups/ (NEVER inside sites-enabled/, CLAUDE.md §A.14.11); `nginx -t` with automatic rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-sitemap-cache.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
ZONE_CONF = "/etc/nginx/conf.d/lcs-sitemap-cache.conf"
CACHE_DIR = "/var/cache/nginx/lcs-sitemaps"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Sitemap cache (2026-11-25)"
DRY = "--dry-run" in sys.argv

MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

ZONE = (
    "# Managed by scripts/publish-cli/patch-nginx-sitemap-cache.py — do not hand-edit.\n"
    "proxy_cache_path " + CACHE_DIR + " levels=1:2 keys_zone=lcssitemaps:2m max_size=1g inactive=30d use_temp_path=off;\n"
)

# The pattern is quoted: a bare {n} would be read as a block delimiter by nginx's parser.
BLOCK = """    {marker}
    # /sitemap.xml and /sitemap/<n>.xml from an nginx copy that never makes a crawler wait on Next.js
    # (patch-nginx-sitemap-cache.py: Googlebot got a 504 on /sitemap/4.xml during a deploy).
    location ~ "^/sitemap(?:/[0-9]+)?\\.xml$" {{
        limit_req zone=lcsperip burst=40 nodelay;
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Accept-Encoding "";
        proxy_set_header RSC "";
        proxy_set_header Next-Router-State-Tree "";
        proxy_set_header Next-Router-Prefetch "";
        proxy_cache lcssitemaps;
        proxy_cache_key "$scheme://$host$uri";
        proxy_ignore_headers Cache-Control Expires Set-Cookie Vary;
        proxy_hide_header Set-Cookie;
        proxy_cache_valid 200 30m;
        proxy_cache_use_stale error timeout updating invalid_header http_500 http_502 http_503 http_504;
        proxy_cache_background_update on;
        proxy_cache_lock on;
        proxy_cache_lock_timeout 120s;
        proxy_cache_lock_age 120s;
        proxy_connect_timeout 60s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
        add_header X-Sitemap-Cache $upstream_cache_status always;
    }}

""".format(marker=MARKER)


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)
    with open(CONF, "r") as f:
        original = f.read()

    lines = original.splitlines(keepends=True)
    if MARKER in original:
        start = next(i for i, ln in enumerate(lines) if MARKER in ln)
        end, depth, seen = start, 0, False
        for i in range(start, len(lines)):
            depth += lines[i].count("{") - lines[i].count("}")
            if lines[i].count("{"):
                seen = True
            if seen and depth == 0:
                end = i
                break
        while end + 1 < len(lines) and lines[end + 1].strip() == "":
            end += 1
        print("removed the previous sitemap-cache block (%d lines); installing the current one." % (end - start + 1))
        lines = lines[:start] + lines[end + 1:]

    anchors = [i for i, ln in enumerate(lines) if MAIN_LOC_RE.match(ln)]
    if len(anchors) != 1:
        print("FATAL: expected exactly one `location / {` (the https www server), found %d. Config untouched." % len(anchors))
        sys.exit(3)
    at = anchors[0]
    new_content = "".join(lines[:at]) + BLOCK + "".join(lines[at:])

    if DRY:
        print("DRY-RUN: would write " + ZONE_CONF + ":")
        print(ZONE)
        print("and insert before line %d:" % (at + 1))
        print(BLOCK)
        sys.exit(0)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    zone_backup = None
    if os.path.exists(ZONE_CONF):
        zone_backup = os.path.join(BACKUP_DIR, "lcs-sitemap-cache.conf." + stamp + ".bak")
        shutil.copy2(ZONE_CONF, zone_backup)
    print("backup -> " + backup)

    os.makedirs(CACHE_DIR, exist_ok=True)
    subprocess.run(["chown", "-R", "www-data:www-data", CACHE_DIR])
    with open(ZONE_CONF, "w") as f:
        f.write(ZONE)
    with open(CONF, "w") as f:
        f.write(new_content)
    print("wrote " + ZONE_CONF + "; inserted the sitemap-cache location before line %d." % (at + 1))

    r = run(["nginx", "-t"])
    if r.returncode != 0:
        print("nginx -t FAILED, rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        if zone_backup:
            shutil.copy2(zone_backup, ZONE_CONF)
        else:
            os.remove(ZONE_CONF)
        sys.exit(4)
    print("nginx -t OK")
    r2 = run(["systemctl", "reload", "nginx"])
    if r2.returncode != 0:
        print("reload FAILED: " + r2.stderr.strip())
        sys.exit(5)
    print("nginx reloaded. Verify: curl -sI --resolve www.lessoncraftstudio.com:443:127.0.0.1 "
          "https://www.lessoncraftstudio.com/sitemap/4.xml | grep -i x-sitemap-cache   (MISS, then HIT)")


if __name__ == "__main__":
    main()
