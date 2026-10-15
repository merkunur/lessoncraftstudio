#!/usr/bin/env python3
"""
patch-nginx-level-sets.py — serve the per-set TEACHER SHEETS (Level Sets v2 phase 2, 2026-10-15).

WHAT
----
One light PDF per face ladder lives at
    /var/www/lcs-media/level-sets/<locale>/<code>-teacher-sheet.pdf
and is served at
    https://www.lessoncraftstudio.com/<locale>/level-sets/<code>-teacher-sheet.pdf
The ONLY link to it is the metered proxy (/api/quota/dl?kind=record) from the noindex set page,
so the file carries `X-Robots-Tag: noindex` (the answer-key PDF convention) and the deck-PDF
edge TTLs. Not a deck: no deck page, no thumbnail, no DB row — ≈0.6 GB for ≈7,150 sheets instead
of ≈6 GB as full decks (operator decision 2026-10-15).

MECHANISM
---------
A dedicated regex location inserted before `location / {`, like patch-nginx-hub-cache.py.
Self-updating (marker block removed and re-inserted), backup to /root/nginx-backups/ (NEVER
inside sites-enabled/), `nginx -t` before reload, abort without changes on any failure.
NOTE the quoted pattern + no bare {n} quantifier (nginx's parser treats { } as block delimiters).

    python3 scripts/publish-cli/patch-nginx-level-sets.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Level Set teacher sheets (2026-10-15)"
DRY = "--dry-run" in sys.argv

MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

BLOCK = """    {marker}
    # One light PDF per face ladder, linked ONLY through the metered proxy from the
    # noindex set page. noindex like the answer keys; deck-PDF edge TTLs.
    location ~ "^/(en|de|fr|es|pt|it|nl|sv|da|no|fi)/level-sets/([a-z0-9-]+)\\.pdf$" {{
        alias /var/www/lcs-media/level-sets/$1/$2.pdf;
        add_header Cache-Control "public, max-age=3600";
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
        lines = lines[:start] + lines[end + 1:]
        print("removed the previous level-sets block — reinstalling current version.")

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
    print("backup → " + backup)
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
