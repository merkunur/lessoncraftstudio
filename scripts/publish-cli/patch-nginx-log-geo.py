#!/usr/bin/env python3
"""
patch-nginx-log-geo.py — log each visitor's country and network (ASN).

WHY
---
2026-11-26: a scraper fleet that runs real browsers (Chrome 144-154, JavaScript,
Sec-Fetch headers, 1-20 requests per IP) passes Cloudflare's Managed Challenge.
Nothing in the log yet separates it from people. Cloudflare Pro can act on the
visitor's country (ip.src.country) and network (ip.src.asnum), so before any
rule is written the log must show both, for the fleet AND for real visitors
(page views that arrive from a search engine). This patch only MEASURES. It
appends two fields to the end of the `lcs_seo` log line (existing positions
unchanged):
    co=<CF-IPCountry>  as=<x-lcs-asn>
CF-IPCountry is sent by Cloudflare on every request. x-lcs-asn is added by a
Cloudflare request-header Transform Rule (value: to_string(ip.src.asnum));
until that rule exists the field logs "-".

The format text is the same as LOG_FORMAT in patch-nginx-seo-logging.py (which
owns the file and rewrites it whole on each run) — keep the two in step.
Backup first, `nginx -t`, reload, then the error log is read for [emerg]
(a running nginx can reject a config while `systemctl reload` returns 0).
"""
import os
import sys
import time
import shutil
import subprocess

FORMAT_CONF = "/etc/nginx/conf.d/lcs-log-format.conf"
BACKUP_DIR = "/root/nginx-backups"
ERRLOG = "/var/log/nginx/error.log"
OLD_END = "al=\"$http_accept_language\"';"
NEW_END = "al=\"$http_accept_language\" '\n                   'co=$http_cf_ipcountry as=$http_x_lcs_asn';"


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(FORMAT_CONF):
        print("FATAL: %s not found (run patch-nginx-seo-logging.py first)." % FORMAT_CONF)
        sys.exit(2)
    with open(FORMAT_CONF) as f:
        cur = f.read()
    if "co=$http_cf_ipcountry" in cur:
        print("already logging country and network — nothing to do.")
        sys.exit(0)
    if cur.count(OLD_END) != 1:
        print("FATAL: the lcs_seo format is not the expected shape (run patch-nginx-log-fetch-signals.py first). Aborting WITHOUT changes.")
        sys.exit(3)
    os.makedirs(BACKUP_DIR, exist_ok=True)
    backup = os.path.join(BACKUP_DIR, "lcs-log-format." + time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()) + ".bak")
    shutil.copy2(FORMAT_CONF, backup)
    with open(FORMAT_CONF, "w") as f:
        f.write(cur.replace(OLD_END, NEW_END))
    r = run(["nginx", "-t"])
    if r.returncode != 0:
        shutil.copy2(backup, FORMAT_CONF)
        print("nginx -t FAILED — restored:\n" + r.stderr.strip())
        sys.exit(4)
    before = os.path.getsize(ERRLOG) if os.path.exists(ERRLOG) else 0
    run(["systemctl", "reload", "nginx"])
    time.sleep(3)
    with open(ERRLOG, errors="replace") as f:
        f.seek(before)
        emerg = [ln for ln in f.read().splitlines() if "[emerg]" in ln]
    if emerg:
        shutil.copy2(backup, FORMAT_CONF)
        run(["systemctl", "reload", "nginx"])
        print("reload REJECTED — restored: " + "; ".join(emerg))
        sys.exit(6)
    time.sleep(2)
    with open("/var/log/nginx/access.log", errors="replace") as f:
        f.seek(max(0, os.path.getsize("/var/log/nginx/access.log") - 4000))
        last = f.read().splitlines()[-1:]
    print("logging country and network. Latest line ends: ..." + (last[0][-90:] if last else "(none yet)"))


if __name__ == "__main__":
    main()
