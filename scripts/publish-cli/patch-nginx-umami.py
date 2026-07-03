#!/usr/bin/env python3
"""
patch-nginx-umami.py — first-party proxy for the self-hosted Umami analytics
(commission #8, 2026-07-03).

Two exact-match locations on the www vhost:
  /lcs-insights.js  → 127.0.0.1:3100/script.js   (renamed tracker, adblock-hardened)
  /api/send         → 127.0.0.1:3100/api/send    (collection endpoint; POST, never cached)

Same-origin serving keeps the beacon out of blocklists and needs no new DNS.
The Next.js app's middleware matcher excludes /api entirely, and the exact-match
locations win over the `location /` proxy, so neither path ever reaches Next.
Forwards CF-Connecting-IP / CF-IPCountry (Umami reads them via CLIENT_IP_HEADER).

Idempotent (marker); backup to /root/nginx-backups/; nginx -t + rollback; reload.
Usage (on Hetzner): python3 scripts/publish-cli/patch-nginx-umami.py
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Umami first-party analytics proxy (commission #8, 2026-07-03)"

LOC_ANCHOR_RE = re.compile(r'^(\s*)location\s+/\s*\{\s*$')

BLOCK = """    {marker}
    location = /lcs-insights.js {{
        proxy_pass http://127.0.0.1:3100/script.js;
        proxy_set_header Host $host;
        expires 1d;
        add_header Cache-Control "public, max-age=86400";
        access_log off;
    }}
    location = /api/send {{
        proxy_pass http://127.0.0.1:3100/api/send;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
        proxy_set_header CF-IPCountry $http_cf_ipcountry;
        proxy_set_header User-Agent $http_user_agent;
        access_log off;
    }}

""".format(marker=MARKER)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    if MARKER in original:
        print("IDEMPOTENT: Umami proxy block already present — no change.")
        r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)

    lines = original.splitlines(keepends=True)
    insert_at = None
    for i, ln in enumerate(lines):
        if LOC_ANCHOR_RE.match(ln):
            insert_at = i
            break
    if insert_at is None:
        print("FATAL: could not locate the `location / {` anchor. Aborting without changes.")
        sys.exit(3)

    new_content = "".join(lines[:insert_at]) + BLOCK + "".join(lines[insert_at:])

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%S", time.gmtime()) + "-umami"
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted Umami proxy block before location / (line ~" + str(insert_at + 1) + ").")

    r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        sys.exit(4)
    print("nginx -t OK")

    r2 = subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
    if r2.returncode != 0:
        r2 = subprocess.run(["nginx", "-s", "reload"], capture_output=True, text=True)
    if r2.returncode != 0:
        print("reload FAILED — rolling back + reload:")
        shutil.copy2(backup, CONF)
        subprocess.run(["systemctl", "reload", "nginx"], capture_output=True, text=True)
        sys.exit(5)
    print("nginx reloaded. Umami proxy live.")


if __name__ == "__main__":
    main()
