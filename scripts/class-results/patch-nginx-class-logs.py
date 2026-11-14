#!/usr/bin/env python3
"""
patch-nginx-class-logs.py — class pages leave no address, no browser name and no class key in the access log.

WHY
---
Legal decision of 2026-11-14, condition E4 (docs/daily-teaching-system/legal/DECISION-2026-11-14.md): a request a
child's tablet makes through a class link (/c/<code>, /api/class/...) must not be written to a log together with the
IP address and the user agent. The site's general log format (lcs_seo) records both, and the address of such a request
carries the class key and, for one endpoint, a seat id.

WHAT
----
1. /etc/nginx/conf.d/lcs-class-log-format.conf: a log format `lcs_class` with the time, the method, the path cut to
   "/c/*" or "/api/class/*", the status, the size and the duration. Nothing else: no address, no user agent, no
   referrer, no class key. It keeps what operations need (how many, how slow, which status).
2. Two locations before `location / {` in every server block that proxies the site:
       location ^~ /c/            the children's class page
       location ^~ /api/class/    what that page and the reporter call
   Each proxies to the app like `location /` and logs with `lcs_class`. Their request limit is the generous one of
   /api/play/ (zone lcsasset, burst 300): thirty tablets of one classroom share ONE address, and the per-address limit
   of `location /` (burst 40) would turn a class away.

The general access log keeps 14 daily files (/etc/logrotate.d/nginx: `daily`, `rotate 14`); the script fails when
that is no longer so, because the privacy text states the number.

Idempotent (marker block removed and re-inserted); backup to /root/nginx-backups/ (never inside sites-enabled/);
`nginx -t` before reload, both files restored on failure.

    python3 scripts/class-results/patch-nginx-class-logs.py [--dry-run]
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
FORMAT_CONF = "/etc/nginx/conf.d/lcs-class-log-format.conf"
LOGROTATE = "/etc/logrotate.d/nginx"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# Class pages: a log without address and browser (2026-11-14)"
END = "# Class pages log: end"
DRY = "--dry-run" in sys.argv
MAIN_LOC_RE = re.compile(r"^\s*location\s+/\s*\{")

FORMAT = """# Managed by scripts/class-results/patch-nginx-class-logs.py — do not hand-edit.
#
# Requests made through a class link are logged WITHOUT the address, the user agent, the referrer and the class key
# (legal decision of 2026-11-14, condition E4). The path is cut to its first part.
map $uri $lcs_class_path {
    default          "-";
    ~^/c/            "/c/*";
    ~^/api/class/    "/api/class/*";
}
log_format lcs_class '[$time_local] $request_method $lcs_class_path $status $body_bytes_sent rt=$request_time';
"""

LOCATION = """    location ^~ {path} {{
        access_log /var/log/nginx/access.log lcs_class;
        limit_req zone=lcsasset burst=300 nodelay;
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }}
"""

BLOCK = "    " + MARKER + "\n" + LOCATION.format(path="/c/") + LOCATION.format(path="/api/class/") + "    " + END + "\n\n"


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def log_days():
    """how many daily files the general access log keeps, or None when the rule is not `daily` + `rotate N`"""
    try:
        with open(LOGROTATE, encoding="utf-8") as f:
            t = f.read()
    except OSError:
        return None
    m = re.search(r"^\s*rotate\s+(\d+)\s*$", t, flags=re.M)
    return int(m.group(1)) if m and re.search(r"^\s*daily\s*$", t, flags=re.M) else None


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        return 1
    days = log_days()
    if days is None or days > 14:
        print("FATAL: the general access log must rotate daily and keep at most 14 files (%s says: %s). "
              "The privacy text states 14 days." % (LOGROTATE, days))
        return 1
    with open(CONF, encoding="utf-8") as f:
        original = f.read()
    text = original
    if MARKER in text:
        text = re.sub(re.escape("    " + MARKER) + r".*?" + re.escape(END) + r"\n\n?", "", text, flags=re.S)
    for needle in ("zone=lcsasset", "upstream nextjs"):
        if needle not in text and needle == "zone=lcsasset":
            print("FATAL: the request zone lcsasset is not used anywhere in the site config; the block would not load")
            return 1
    if re.search(r"location\s+[^{]*\s/c/\s*\{", text) or re.search(r"location\s+[^{]*\s/api/class/\s*\{", text):
        print("FATAL: a location for /c/ or /api/class/ exists outside this script's block; read the config first")
        return 1
    out, inserted = [], 0
    for line in text.split("\n"):
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
        print(FORMAT)
        print(BLOCK)
        print("dry run: would write %s and insert before %d location block(s); the general log keeps %d daily files" % (FORMAT_CONF, inserted, days))
        return 0
    os.makedirs(BACKUP_DIR, exist_ok=True)
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio.%s.bak" % time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()))
    shutil.copy2(CONF, backup)
    had_format = os.path.exists(FORMAT_CONF)
    old_format = open(FORMAT_CONF, encoding="utf-8").read() if had_format else None
    with open(FORMAT_CONF, "w", encoding="utf-8") as f:
        f.write(FORMAT)
    with open(CONF, "w", encoding="utf-8") as f:
        f.write(new)

    def restore():
        shutil.copy2(backup, CONF)
        if had_format:
            with open(FORMAT_CONF, "w", encoding="utf-8") as f2:
                f2.write(old_format)
        else:
            os.remove(FORMAT_CONF)

    t = run(["nginx", "-t"])
    if t.returncode != 0:
        restore()
        print("FATAL: nginx -t failed, both files restored\n" + t.stderr)
        return 1
    r = run(["systemctl", "reload", "nginx"])
    if r.returncode != 0:
        restore()
        run(["systemctl", "reload", "nginx"])
        print("FATAL: reload failed, both files restored\n" + r.stderr)
        return 1
    print("backup -> " + backup)
    print("installed + reloaded (%d location block(s)); the general log keeps %d daily files. "
          "Read error.log for [emerg] after a reload." % (inserted, days))
    return 0


if __name__ == "__main__":
    sys.exit(main())
