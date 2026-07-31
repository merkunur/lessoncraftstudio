#!/usr/bin/env python3
"""
patch-nginx-hub-cache.py — make the SSR indexable surfaces cacheable again.

WHY
---
Measured 2026-07-31, sampling every sitemap shard:

    shard2 intersections  6/6 no-store   (955 URLs)
    shard3 topics+static  6/6 no-store   (3,283 URLs)
    shard8 activities     6/6 no-store   (1,113 URLs)
    shard9 tools+makers   6/6 no-store   (813 URLs)   <- highest commercial intent
    shard4 landings       0/6 no-store   (public, max-age=3600)  <- the only cacheable class

i.e. 6,164 indexable URLs answer `Cache-Control: private, no-cache, no-store,
max-age=0, must-revalidate` from the origin. It is not intentional:
app/[locale]/topic/[slug]/page.tsx:78 declares `export const revalidate = 3600`,
but the route reads `searchParams` (the §16.5.4 filter/sort/pagination contract),
which forces dynamic rendering — and Next defaults dynamic responses to no-store,
silently overriding the declared ISR. These routes also sit inside the
rate-limited `location /`, so the two compound during a crawl-budget shortfall.

Not personalization: two anonymous fetches of /en/topic/addition are byte-identical
except Cloudflare's own per-request RUM token, and none of these routes reads
cookies or a session at the route level. Cloudflare already serves some of them
from a shared edge cache (observed `cf-cache-status: HIT, Age 397`), so a shared
cached copy is already the status quo — this only makes it explicit and consistent.

MECHANISM
---------
`proxy_hide_header` the upstream Cache-Control and set a short public TTL, in a
dedicated regex location for the four path classes. Short (5 min) deliberately:
long enough to spare the origin on a crawl burst, short enough that a newly
published deck shows up on its hub quickly — the same 300s the deck pages use.

Idempotent (marker); backs up to /root/nginx-backups/ (NEVER inside sites-enabled/,
per CLAUDE.md §A.14.11); `nginx -t` with auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-hub-cache.py
                     python3 scripts/publish-cli/patch-nginx-hub-cache.py --dry-run
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# SSR hub/activity/tool cacheability (2026-07-31)"
DRY = "--dry-run" in sys.argv

MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

# NOTE the quoted pattern: nginx's config parser treats a bare {2} as a block
# delimiter and truncates the regex (learned the hard way on the admin-noindex
# patch — `nginx -t` fails with "missing ) in ...").
BLOCK = """    {marker}
    # 6,164 indexable URLs were answering `no-store` because a searchParams read
    # forces dynamic rendering, silently overriding `export const revalidate`.
    # Anonymous renders verified byte-identical; no cookie/session read in-route.
    # Covers: locale root, topic hubs + 2-axis intersections, activities, tools +
    # makers, standards, the worksheet-makers hub, and the /worksheets HUB itself.
    # It deliberately does NOT cover `/<loc>/worksheets/<slug>` — the tier-3 landing
    # is served from disk by an earlier location with its own max-age=3600. All of
    # these were verified byte-identical across anonymous fetches and read no
    # session/cookie server-side.
    location ~ "^/[a-z]{{2}}(?:/(?:topic|activities|tools|standards|worksheet-makers)(?:/.*)?|/worksheets)?$" {{
        limit_req zone=lcsperip burst=40 nodelay;
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        proxy_hide_header Cache-Control;
        add_header Cache-Control "public, max-age=300" always;
        add_header X-Content-Type-Options nosniff always;
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

    # Self-updating: if a previously-installed block is present, REMOVE it and
    # re-insert the current one. A marker-only "already present, skip" guard cannot
    # widen the path set later, and would silently leave an out-of-date pattern in
    # production while reporting success.
    lines = original.splitlines(keepends=True)
    if MARKER in original:
        start = next(i for i, ln in enumerate(lines) if MARKER in ln)
        end = start
        depth = 0
        seen_brace = False
        for i in range(start, len(lines)):
            depth += lines[i].count("{") - lines[i].count("}")
            if lines[i].count("{"):
                seen_brace = True
            if seen_brace and depth == 0:
                end = i
                break
        while end + 1 < len(lines) and lines[end + 1].strip() == "":
            end += 1
        removed = end - start + 1
        lines = lines[:start] + lines[end + 1:]
        print("removed the previous hub-cache block (%d lines) — reinstalling current version." % removed)

    insert_at = None
    for i, ln in enumerate(lines):
        if MAIN_LOC_RE.match(ln):
            insert_at = i
            break
    if insert_at is None:
        print("FATAL: could not locate `location / {`.")
        print("       Aborting WITHOUT changes (config untouched).")
        sys.exit(3)

    new_content = "".join(lines[:insert_at]) + BLOCK + "".join(lines[insert_at:])

    if DRY:
        print("DRY-RUN — would insert the hub-cache location before line %d:" % (insert_at + 1))
        print(BLOCK)
        sys.exit(0)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted hub-cache location before line %d." % (insert_at + 1))

    r = run(["nginx", "-t"])
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx -t OK:")
    print(r.stderr.strip())

    r2 = run(["systemctl", "reload", "nginx"])
    if r2.returncode != 0:
        print("reload FAILED:")
        print(r2.stderr.strip())
        sys.exit(5)
    print("nginx reloaded. Verify:")
    print("  curl -sI https://www.lessoncraftstudio.com/en/topic/addition | grep -i cache-control")


if __name__ == "__main__":
    main()
