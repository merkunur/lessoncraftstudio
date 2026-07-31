#!/usr/bin/env python3
"""
patch-nginx-admin-noindex.py — noindex the admin/debug surfaces that ship live.

WHY
---
The §21.7 indexable-route gate (added 2026-07-31) surfaced 17 `text/html` surfaces
that are live, HTTP 200 and fully indexable with NO robots directive at all.
Verified against production the same day. They fall in two groups:

  * Admin tooling, titles and all:
      /user-control.html                    "LessonCraftStudio - Professional …"
      /homepage-content-manager.html        "Homepage Content Manager v3 - Fixed"
      /homepage-content-manager-v2.html
      /homepage-content-manager-v3.html
      /homepage-content-manager-v3-fixed.html
      /easy-page-manager.html               "Easy Page Manager - LessonCraftStudio"
      /check-tier.html                      "Tier Check"
  * Debug/test scratch pages:
      /big-small-debug.html  /big-small-final.html  /clear-device-and-test.html
      /find-count-borders-only.html  /test-auth.html  /test-device-conflict.html
      /test-watermark.html  /static-pages/en/pages/cryptopicpuzzlestudio.html
      /upload  /<locale>/test  /<locale>/test-simple   (these three even say
                                                        `index, follow` explicitly)

None is blocked by robots.txt — note `Disallow: /uploads/` (plural) does NOT cover
`/upload` (singular).

WHY NGINX IS THE ONLY LAYER
---------------------------
Every one of these paths is in the Next.js middleware `matcher` exclusion list
(middleware.ts config.matcher — `homepage-content-manager.*\\.html`, `test-.*\\.html`,
`easy-page-manager\\.html`, `upload`, …), so middleware never runs for them and
cannot add a header. And CLAUDE.md §A.3 lists `user-control.html` +
`homepage-content-manager.html` as immutable content managers, so editing the files
themselves is out. A header at the edge is the only correct lever.

MECHANISM
---------
A dedicated regex location (regex beats the `location /` prefix match) that adds
`X-Robots-Tag: noindex` and proxies exactly as `location /` does. `noindex` only —
NOT nofollow, and NOT a robots.txt Disallow, because a Disallow blocks the crawl so
Google never sees the header and leaves bare URL-only index entries.

`location /` carries no add_header of its own and there are zero server-level
add_headers, so nothing is being cancelled by introducing one here.

Idempotent (marker); backs up to /root/nginx-backups/ (NEVER inside sites-enabled/,
per CLAUDE.md §A.14.11); `nginx -t` with auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-admin-noindex.py
                     python3 scripts/publish-cli/patch-nginx-admin-noindex.py --dry-run
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# admin/debug surfaces noindex (2026-07-31)"
DRY = "--dry-run" in sys.argv

MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

BLOCK = """    {marker}
    # Live 200s with no robots directive — see the §21.7 gate. Header-only:
    # a robots.txt Disallow would hide the header and leave URL-only entries.
    # The pattern MUST be quoted: nginx's own config parser treats a bare `{{`/`}}`
    # as a block delimiter, so an unquoted `[a-z]{{2}}` truncates the regex at
    # `[a-z]` and `nginx -t` fails with "missing ) in ...". Same idiom as the
    # placeholder-410 location already in this file.
    location ~ "^/(?:(?:big-small-debug|big-small-final|check-tier|clear-device-and-test|easy-page-manager|find-count-borders-only|homepage-content-manager|homepage-content-manager-v2|homepage-content-manager-v3|homepage-content-manager-v3-fixed|test-auth|test-device-conflict|test-watermark|user-control)\\.html|static-pages/en/pages/cryptopicpuzzlestudio\\.html|upload/?|[a-z]{{2}}/test(?:-simple)?/?)$" {{
        add_header X-Robots-Tag "noindex" always;
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

    if MARKER in original:
        print("IDEMPOTENT: admin/debug noindex block already present — no change.")
        r = run(["nginx", "-t"])
        print(r.stderr.strip())
        sys.exit(0)

    lines = original.splitlines(keepends=True)

    # Insert immediately BEFORE `location / {`. (Regex locations out-rank the
    # prefix match regardless of order, but keeping it adjacent makes the
    # relationship obvious to the next reader.)
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
        print("DRY-RUN — would insert the noindex location before line %d:" % (insert_at + 1))
        print(BLOCK)
        sys.exit(0)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted admin/debug noindex location before line %d." % (insert_at + 1))

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
    print("nginx reloaded. Verify at ORIGIN (not through Cloudflare):")
    print("  curl -sI -H 'Host: www.lessoncraftstudio.com' https://127.0.0.1/user-control.html -k | grep -i x-robots")


if __name__ == "__main__":
    main()
