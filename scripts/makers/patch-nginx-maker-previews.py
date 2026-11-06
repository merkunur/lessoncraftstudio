#!/usr/bin/env python3
"""
patch-nginx-maker-previews.py — serve the maker landings' images at a stable, indexable path.

WHY
---
Every /makers/ path carries `X-Robots-Tag: noindex` and its thumbnails sit under a version hash, so they can never be the
image Google shows for a maker landing. /maker-previews/ holds the same pages at 640 px plus each page's 1200 x 630 share
image, at URLs that survive a release, with no noindex (CLAUDE.md §17.8.19, LAUNCH-HANDOFF §3).

    /maker-previews/<maker>/<loc>/<template>.webp   every template's sample page
    /maker-previews/<maker>/<loc>/app.webp          the maker itself, in that language
    /maker-previews/<maker>/<loc>/og.jpg            the search and share image

A week of browser cache: the URLs are stable, so a re-render must be able to reach visitors.

Idempotent (marker block removed and re-inserted); backup to /root/nginx-backups/ (never inside sites-enabled/);
`nginx -t` before reload, restore on failure.

    python3 scripts/makers/patch-nginx-maker-previews.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Maker landing previews (2026-11-06)"
END = "# Maker landing previews: end"
DRY = "--dry-run" in sys.argv
MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

BLOCK = """    {marker}
    location ^~ /maker-previews/ {{
        root /var/www/lcs-media;
        add_header Cache-Control "public, max-age=604800";
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
