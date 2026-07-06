#!/usr/bin/env python3
"""
patch-nginx-next-image-limits.py — carve /_next/image out of the per-IP bot limit
(broken-thumbnails fix, 2026-07-06).

Measured problem: the bot-defense `limit_req zone=lcsperip rate=8r/s burst=40`
inside `location /` (patch-nginx-bot-limits.py, commission #1) also swallows
`/_next/image` — the Next image-optimizer endpoint has no file extension and no
dedicated location, so it falls into the rate-limited catch-all. A single page
view of /<locale>/worksheets fires 24-84 near-simultaneous /_next/image
requests, blowing the burst → nginx 429s a random subset → intermittently
broken thumbnails that change per refresh (access.log 2026-07-06 11:37: 131
429s in one minute from one real Chrome visitor; error.log `limiting requests,
excess: 40.x by zone "lcsperip"`).

Fix: a dedicated `location /_next/image` proxy block using the EXISTING
`lcsasset` zone (50 r/s, the same zone /mini-tools/ and /api/play/ use) with
burst=300 — sized for image fan-out, still a real ceiling against scrapers.
The bot defense on `location /` (fleet-signature 429 + 8 r/s for doc/RSC
requests) is untouched.

Idempotent (marker comment); backup to /root/nginx-backups/; `nginx -t` with
auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-next-image-limits.py
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Next image-optimizer carve-out (broken-thumbnails fix, 2026-07-06)"

# Anchor: the Next.js catch-all proxy — insert the new location BEFORE it.
LOC_ANCHOR_RE = re.compile(r'^(\s*)location\s+/\s*\{\s*$')

BLOCK = """{indent}{marker}
{indent}# /_next/image has no extension so it otherwise falls into the rate-limited
{indent}# `location /` (zone=lcsperip burst=40) — a 24-84-image page paint overflows
{indent}# the burst and 429s a random subset of thumbnails. Reuse the generous asset
{indent}# zone instead; bot defense on `location /` stays intact.
{indent}location /_next/image {{
{indent}    limit_req zone=lcsasset burst=300 nodelay;
{indent}    proxy_pass http://nextjs;
{indent}    proxy_http_version 1.1;
{indent}    proxy_set_header Upgrade $http_upgrade;
{indent}    proxy_set_header Connection $connection_upgrade;
{indent}    proxy_set_header Host $host;
{indent}    proxy_set_header X-Real-IP $remote_addr;
{indent}    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
{indent}    proxy_set_header X-Forwarded-Proto $scheme;
{indent}    proxy_cache_bypass $http_upgrade;
{indent}}}

"""


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    if MARKER in original:
        print("IDEMPOTENT: /_next/image carve-out already present — no change.")
        r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    if "zone=lcsasset" not in original:
        print("FATAL: lcsasset zone not found — run patch-nginx-studio-limits.py first. Aborting.")
        sys.exit(3)

    lines = original.splitlines(keepends=True)

    loc_at = None
    loc_indent = "    "
    for i, ln in enumerate(lines):
        m = LOC_ANCHOR_RE.match(ln)
        if m:
            loc_at = i
            loc_indent = m.group(1)
            break
    if loc_at is None:
        print("FATAL: could not locate the `location / {` Next.js proxy anchor. Aborting without changes.")
        sys.exit(3)

    block = BLOCK.format(indent=loc_indent, marker=MARKER)
    lines.insert(loc_at, block)
    new_content = "".join(lines)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted /_next/image carve-out before `location /` (line ~" + str(loc_at + 1) + ").")

    r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx -t OK:")
    print(r.stderr.strip())

    r2 = subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
    if r2.returncode != 0:
        r2 = subprocess.run(["nginx", "-s", "reload"], capture_output=True, text=True)
    if r2.returncode != 0:
        print("reload FAILED — rolling back + reload:")
        print((r2.stderr or "").strip())
        shutil.copy2(backup, CONF)
        subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
        sys.exit(5)
    print("nginx reloaded. /_next/image carve-out live.")


if __name__ == "__main__":
    main()
