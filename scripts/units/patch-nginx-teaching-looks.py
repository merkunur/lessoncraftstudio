#!/usr/bin/env python3
"""
patch-nginx-teaching-looks.py — serve the pictures of real pages of the Teacher plan's files.

WHY
---
The files of the Teacher plan (teacher guides, guest teacher pages, unit check teacher pages) are outside everything
nginx serves, so a page could only TELL a visitor what the plan holds. scripts/units/build-looks.js makes one picture of
a real page per file kind and grade; they are uploaded to /var/www/lcs-media/teaching-looks/<language>/ and shown on
topic pages (Daily Teaching System, Part 11.6).

    /teaching-looks/<language>/g<grade>-<unit|pack|check>.<hash>.webp

The name carries the picture's hash: a rebuilt picture has a new address, so a year of browser cache is safe.
`noindex`: a picture of a paid file's page is a look for a visitor, not a page for an image search.

Idempotent (marker block removed and re-inserted); backup to /root/nginx-backups/ (never inside sites-enabled/);
`nginx -t` before reload, restore on failure.

    python3 scripts/units/patch-nginx-teaching-looks.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Teaching looks (2026-11-12)"
END = "# Teaching looks: end"
DRY = "--dry-run" in sys.argv
MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

BLOCK = """    {marker}
    location ^~ /teaching-looks/ {{
        root /var/www/lcs-media;
        add_header Cache-Control "public, max-age=31536000, immutable";
        add_header X-Robots-Tag "noindex" always;
        add_header X-Content-Type-Options nosniff;
    }}
    {end}

""".format(marker=MARKER, end=END)


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        return 1
    with open(CONF, encoding="utf-8") as f:
        text = f.read()
    if MARKER in text:
        text = re.sub(re.escape("    " + MARKER) + r".*?" + re.escape(END) + r"\n\n?", "", text, flags=re.S)
    lines = text.split("\n")
    # every server block that proxies the site gets the location
    out, inserted = [], 0
    for line in lines:
        if MAIN_LOC_RE.match(line):
            out.append(BLOCK.rstrip("\n"))
            out.append("")
            inserted += 1
        out.append(line)
    if not inserted:
        print("FATAL: no `location / {` found")
        return 1
    new = "\n".join(out)
    if DRY:
        print(BLOCK)
        print("dry run: would insert before %d location block(s)" % inserted)
        return 0
    os.makedirs(BACKUP_DIR, exist_ok=True)
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio.%s.bak" % time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()))
    shutil.copy2(CONF, backup)
    with open(CONF, "w", encoding="utf-8") as f:
        f.write(new)
    t = run(["nginx", "-t"])
    if t.returncode != 0:
        shutil.copy2(backup, CONF)
        print("FATAL: nginx -t failed, config restored\n" + t.stderr)
        return 1
    r = run(["systemctl", "reload", "nginx"])
    if r.returncode != 0:
        print("FATAL: reload failed\n" + r.stderr)
        return 1
    print("backup -> " + backup)
    print("installed + reloaded (%d location block(s)). Read error.log for [emerg] after a reload." % inserted)
    return 0


if __name__ == "__main__":
    sys.exit(main())
