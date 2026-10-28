#!/usr/bin/env python3
"""
patch-nginx-log-fetch-signals.py — log the browser-only request headers.

WHY
---
2026-10-28: a scraper fleet (~73k IPs a day, one or two requests each, a Chrome
User-Agent, a faked same-site Referer) copies the public worksheet pages. UA,
IP and Referer cannot separate it from people. Every current browser sends
`Sec-Fetch-Mode` / `Sec-Fetch-Dest` on every navigation (an embedded worksheet
sends `navigate` / `iframe`); simple HTTP scrapers usually do not. If the logs
show the fleet without them, ONE Cloudflare rule can challenge only requests
that lack them — real visitors, embeds and verified crawlers untouched, and the
worksheet pages unchanged. This patch only MEASURES: it appends three fields to
the end of the `lcs_seo` log line (existing field positions are unchanged):
    sf=<Sec-Fetch-Mode> sd=<Sec-Fetch-Dest> al="<Accept-Language>"

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
NEW_TAIL = "'sf=$http_sec_fetch_mode sd=$http_sec_fetch_dest al=\"$http_accept_language\"';"
OLD_END = "'cf=$http_cf_ray cc=$upstream_cache_status rt=$request_time';"
NEW_END = "'cf=$http_cf_ray cc=$upstream_cache_status rt=$request_time '\n                   " + NEW_TAIL


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(FORMAT_CONF):
        print("FATAL: %s not found (run patch-nginx-seo-logging.py first)." % FORMAT_CONF)
        sys.exit(2)
    with open(FORMAT_CONF) as f:
        cur = f.read()
    if "sf=$http_sec_fetch_mode" in cur:
        print("already logging the fetch signals — nothing to do.")
        sys.exit(0)
    if OLD_END not in cur:
        print("FATAL: the lcs_seo format is not the expected shape. Aborting WITHOUT changes.")
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
    print("logging the fetch signals. Latest line ends: ..." + (last[0][-110:] if last else "(none yet)"))


if __name__ == "__main__":
    main()
