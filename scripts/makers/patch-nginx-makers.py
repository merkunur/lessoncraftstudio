#!/usr/bin/env python3
"""
patch-nginx-makers.py — serve the worksheet makers' static trees (ARCHITECTURE §1, §2.3, §5.2, §8.2; task 3 of the ten).

NEVER RUN BY THE BUILD SESSION. The operator runs it on Hetzner once, at the makers' release (after the first
install-release.js), and again only if this file changes. Idempotent: the marker block is removed and re-inserted.

WHAT
----
    /makers/<maker>/<hash>/…   a maker version (bundle, templates.json, data-manifest.json, strings ×11, thumbs)
    /makers/data/<hash>/…      a data snapshot (word banks, i18n slices, picture manifests)
    /makers/play/<hash>/…      a student play shell version
        -> immutable (Cache-Control: public, max-age=31536000, immutable): a folder is never rewritten after deploy
          (scripts/makers/install-release.js refuses to), so the hash in the path IS the cache key
    /makers-assets/themes-512/… · /makers-assets/fonts/…
        -> the reviewed pictures (512 px) and the fonts: 30 days (the asset base is unversioned —
          scripts/worksheet-gen/lib/platform/browser.js ASSET_BASE — so no `immutable`)
    /makers/versions.json · /makers/<maker>/current.txt · /makers/data/current.txt · /makers/play/current.txt ·
    /makers/play/strings.json · /makers/play/landings.json · /makers/migrations/<maker>.json · /makers/app/…
        -> the POINTERS and the maker app shell: 5-minute edge TTL (CLAUDE.md §15.8), so a release shows within
          5 minutes and the shell's `cache:'no-store'` fetches of versions.json always see the newest release
    Every maker surface carries `X-Robots-Tag: noindex` (CLAUDE.md §21.7: the app shell and the play shell are iframe /
    app targets; the indexable pages are the landings at /<loc>/tools/<slug> and the makers' own landings).
    /s/<linkId> is NOT here: Next serves it (frontend/app/s/[id]/route.ts) with its own noindex + s-maxage headers.
    /api/makers/* is NOT here either: it goes through `location /` (the Next proxy), which already carries the per-IP
    `limit_req zone=lcsperip` of patch-nginx-bot-limits.py — the rate limit ARCHITECTURE §9 asks for.

MECHANISM
---------
Three locations inserted before `location / {` (the hub-cache / level-sets idiom): a REGEX location for the
hash-versioned folders (nginx tests regex locations after the longest prefix match and lets a matching regex win,
so the plain `location /makers/` prefix below it serves only the pointers and the shell), a `^~` prefix for the
assets, and the plain prefix for the pointers. All `root`-based (no alias rewriting), quoted regex, NO bare {n}
quantifier outside quotes (nginx's parser treats { } as block delimiters). Backup to /root/nginx-backups/ (never
inside sites-enabled/), `nginx -t` before reload, abort without changes on any failure.

    python3 scripts/makers/patch-nginx-makers.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Worksheet makers: static trees (2026-11-01)"
DRY = "--dry-run" in sys.argv

MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

BLOCK = """    {marker}
    # Hash-versioned maker / data / play folders: never rewritten after deploy (install-release.js) -> immutable.
    location ~ "^/makers/(?:[a-z0-9-]+|data|play)/[a-f0-9]{{12,24}}/" {{
        root /var/www/lcs-media;
        gzip_static on;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Robots-Tag "noindex" always;
        add_header X-Content-Type-Options nosniff;
    }}
    # The reviewed pictures (512 px) and the fonts; unversioned base -> long but not immutable.
    location ^~ /makers-assets/ {{
        root /var/www/lcs-media;
        gzip_static on;
        add_header Cache-Control "public, max-age=2592000";
        add_header X-Robots-Tag "noindex" always;
        add_header X-Content-Type-Options nosniff;
    }}
    # The pointers (versions.json, current.txt, play/strings.json, migrations/*.json) and the maker app shell
    # (/makers/app/): a release shows within 5 minutes.
    location /makers/ {{
        root /var/www/lcs-media;
        gzip_static on;
        add_header Cache-Control "public, max-age=0, s-maxage=300";
        add_header Cloudflare-CDN-Cache-Control "max-age=300";
        add_header X-Robots-Tag "noindex" always;
        add_header X-Content-Type-Options nosniff;
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
        # the block holds THREE locations: remove from the marker to the end of the third balanced block
        end = start
        depth = 0
        blocks = 0
        for i in range(start, len(lines)):
            opened = lines[i].count("{")
            depth += opened - lines[i].count("}")
            if opened:
                pass
            if depth == 0 and ("}" in lines[i]):
                blocks += 1
                if blocks == 3:
                    end = i
                    break
        while end + 1 < len(lines) and lines[end + 1].strip() == "":
            end += 1
        lines = lines[:start] + lines[end + 1:]
        print("removed the previous makers block — reinstalling current version.")

    insert_at = None
    for i, ln in enumerate(lines):
        if MAIN_LOC_RE.match(ln):
            insert_at = i
            break
    if insert_at is None:
        print("FATAL: could not locate `location / {`. Aborting WITHOUT changes.")
        sys.exit(3)

    new_content = "".join(lines[:insert_at]) + BLOCK + "".join(lines[insert_at:])
    if DRY:
        print("DRY-RUN — would insert before line %d:" % (insert_at + 1))
        print(BLOCK)
        sys.exit(0)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup -> " + backup)
    with open(CONF, "w") as f:
        f.write(new_content)

    t = run(["nginx", "-t"])
    if t.returncode != 0:
        print("nginx -t FAILED — restoring the backup:\n" + t.stderr)
        shutil.copy2(backup, CONF)
        sys.exit(4)
    r = run(["systemctl", "reload", "nginx"])
    if r.returncode != 0:
        print("reload FAILED:\n" + r.stderr)
        sys.exit(5)
    print("installed + reloaded.")


if __name__ == "__main__":
    main()
