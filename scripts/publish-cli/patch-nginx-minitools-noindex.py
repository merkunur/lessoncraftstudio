#!/usr/bin/env python3
"""
patch-nginx-minitools-noindex.py — add `X-Robots-Tag: noindex` to /mini-tools/*.html.

Operator-approved 2026-07-12 (JS-vs-SSR SEO verification): the 138 mini-tool
engine pages are thin JS-only documents (a <title> + empty mount; all content
client-rendered) that exist solely as iframe targets for the SSR activity
wrapper pages, which carry the full indexable prose + JSON-LD. Google discovers
iframe src URLs, and the engine pages were crawlable AND indexable (200, no
X-Robots-Tag, no meta noindex, no canonical) — exactly the thin/blank
programmatic-page class. The SSR wrapper is the single indexable surface.

Mechanism: `noindex` only, NOT nofollow, and NOT robots.txt Disallow (a
Disallow blocks the crawl so Google never sees the header and leaves bare
URL-only index entries). Scoped to .html via the location block's established
set/if idiom — nginx omits a header whose value is empty, so json/atlas/image
assets under /mini-tools/ are untouched.

Inserts INSIDE the existing `location /mini-tools/` block (a new regex
location would out-rank the prefix location and need its own alias/captures).

Idempotent (marker comment); backs up to /root/nginx-backups/ (NEVER inside
sites-enabled/, per CLAUDE.md §A.14.11); `nginx -t` with auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-minitools-noindex.py
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# mini-tools html noindex (2026-07-12)"

LOCATION_RE = re.compile(r'^\s*location\s+/mini-tools/\s*\{')
ANCHOR_RE = re.compile(r'^\s*add_header\s+Cache-Control\s+\$mt_cache;')

BLOCK = """
        {marker}
        # Engine pages are iframe-only; the SSR activity wrapper is the single
        # indexable surface. Empty value => header omitted for non-html assets.
        set $mt_robots "";
        if ($uri ~* \\.html$) {{
            set $mt_robots "noindex";
        }}
        add_header X-Robots-Tag $mt_robots always;
""".format(marker=MARKER)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    if MARKER in original:
        print("IDEMPOTENT: mini-tools-noindex block already present — no change.")
        r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    lines = original.splitlines(keepends=True)

    # Find the `location /mini-tools/ {` block, then the Cache-Control anchor
    # line within it (before the block's closing brace at the same nesting).
    loc_at = None
    for i, ln in enumerate(lines):
        if LOCATION_RE.match(ln):
            loc_at = i
            break
    if loc_at is None:
        print("FATAL: could not locate `location /mini-tools/ {` block.")
        print("       Aborting WITHOUT changes (config untouched).")
        sys.exit(3)

    insert_at = None
    depth = 0
    for i in range(loc_at, len(lines)):
        depth += lines[i].count("{") - lines[i].count("}")
        if i > loc_at and ANCHOR_RE.match(lines[i]):
            insert_at = i + 1
            break
        if depth == 0:
            break  # left the location block without finding the anchor
    if insert_at is None:
        print("FATAL: could not locate `add_header Cache-Control $mt_cache;` inside the mini-tools block.")
        print("       Aborting WITHOUT changes (config untouched).")
        sys.exit(3)

    new_content = "".join(lines[:insert_at]) + BLOCK + "".join(lines[insert_at:])

    # backup OUTSIDE sites-enabled/
    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted mini-tools-noindex lines inside location /mini-tools/ (line ~" + str(insert_at + 1) + ").")

    # validate
    r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx -t OK:")
    print(r.stderr.strip())

    # reload
    r2 = subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
    if r2.returncode != 0:
        r2 = subprocess.run(["nginx", "-s", "reload"], capture_output=True, text=True)
    if r2.returncode != 0:
        print("reload FAILED — rolling back + reload:")
        print((r2.stderr or "").strip())
        shutil.copy2(backup, CONF)
        subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
        sys.exit(5)
    print("nginx reloaded. mini-tools html noindex live.")


if __name__ == "__main__":
    main()
