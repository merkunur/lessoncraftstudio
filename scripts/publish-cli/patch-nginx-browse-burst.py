#!/usr/bin/env python3
"""
patch-nginx-browse-burst.py — stop the per-IP limit refusing ordinary browsing.

WHY
---
Measured 2026-10-28 (nginx access log, 07:43-12:14 UTC): real visitors were
getting "429 Too Many Requests" from the per-IP zone `lcsperip` (8 r/s,
burst 40), in two patterns the zone was never sized for:

  * Next.js link prefetch. A topic page with ~100 links prefetches them all
    as `?_rsc=` fetches within one second. One Swedish visitor: 167 x 200,
    97 x 429, all `/sv/topic/<slug>?_rsc=…` in the same second.
  * The worksheet makers load every theme's pictures at once through
    `/api/images?theme=…` — one French visitor: 60 x 200, 57 x 429 in one
    second, so the maker opened with pictures missing.

Neither pattern is the scraper the limits exist for: that one (28k IPs, one
filter-combination request each, browser UA, faked same-site Referer) is
handled by the facet cap and by the Cloudflare challenge rule.

WHAT
----
Requests whose URI is an `_rsc=` fetch or `/api/images` move from `lcsperip`
to a generous per-IP zone `lcsburst` (20 r/s, burst 150). Every other request
keeps `lcsperip` exactly as before. A key that maps to "" is not limited by
nginx, so each request is counted in exactly one of the two zones. The stale-
Chrome fleet block on `_rsc` walks (patch-nginx-bot-limits.py) is untouched.

Idempotent: re-running reports every step as already done. Backup first,
`nginx -t`, automatic rollback on failure. `--dry-run` prints the change,
`--selftest` (after install) fires a burst of each class at the origin.
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
DRY = "--dry-run" in sys.argv
SELFTEST = "--selftest" in sys.argv

MARKER = "# Browse burst (2026-10-28): start"
ZONE_OLD = "limit_req_zone $lcs_client_ip zone=lcsperip:20m rate=8r/s;"
ZONE_NEW = "limit_req_zone $lcs_peri_key zone=lcsperip:20m rate=8r/s;"
BLOCK = """# Browse burst (2026-10-28): start
# Prefetch (`_rsc=`) and maker picture loads (`/api/images`) burst far past
# 40 in a second from ONE real visitor; they get their own per-IP zone.
map $request_uri $lcs_burst_class {
    default 0;
    "~(^/api/images(\\?|$)|[?&]_rsc=)" 1;
}
map "$lcs_burst_class:$lcs_client_ip" $lcs_peri_key {
    default "";
    "~^0:(?<lcs_pk>.+)$" $lcs_pk;
}
map "$lcs_burst_class:$lcs_client_ip" $lcs_burst_key {
    default "";
    "~^1:(?<lcs_bk>.+)$" $lcs_bk;
}
limit_req_zone $lcs_burst_key zone=lcsburst:20m rate=20r/s;
# Browse burst: end
"""
PERIP_RE = re.compile(r"^(\s*)limit_req zone=lcsperip burst=40 nodelay;\s*$")
BURST_LINE = "limit_req zone=lcsburst burst=150 nodelay;"


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def selftest():
    """Fire 80 parallel requests of each class with a test visitor IP; count the 429s."""
    def burst(path, ip):
        cmd = ("seq 80 | xargs -P 40 -I{} curl -s -o /dev/null -w '%{http_code}\\n' --max-time 20 "
               "-H 'CF-Connecting-IP: " + ip + "' --resolve www.lessoncraftstudio.com:443:127.0.0.1 "
               "'https://www.lessoncraftstudio.com" + path + "'")
        out = run(["bash", "-c", cmd]).stdout.split()
        return sum(1 for c in out if c == "429"), len(out)
    r1 = burst("/en/topic/animals?_rsc=selftest", "203.0.113.71")
    r2 = burst("/api/images?theme=animals&locale=en", "203.0.113.72")
    r3 = burst("/en/learn", "203.0.113.73")
    print("selftest  _rsc prefetch burst : %d of %d refused (want 0)" % r1)
    print("selftest  /api/images burst   : %d of %d refused (want 0)" % r2)
    print("selftest  plain page burst    : %d of %d refused (want > 0: the per-IP limit still works)" % r3)
    ok = r1[0] == 0 and r2[0] == 0 and r3[0] > 0 and r1[1] == r2[1] == r3[1] == 80
    print("SELFTEST " + ("PASS" if ok else "FAIL"))
    sys.exit(0 if ok else 5)


def main():
    if SELFTEST:
        selftest()
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)
    with open(CONF, "r") as f:
        original = f.read()
    lines = original.splitlines(keepends=True)
    changed = 0

    # 1. the zones + maps, just before the lcsperip zone
    if MARKER in original:
        print("maps + lcsburst zone: already installed")
    else:
        at = next((i for i, ln in enumerate(lines) if ln.strip() in (ZONE_OLD, ZONE_NEW)), None)
        if at is None:
            print("FATAL: could not find the lcsperip zone line. Aborting WITHOUT changes.")
            sys.exit(3)
        lines = lines[:at] + [BLOCK] + lines[at:]
        changed += 1
        print("maps + lcsburst zone: inserted")

    # 2. lcsperip keyed on $lcs_peri_key
    idx = next((i for i, ln in enumerate(lines) if ln.strip() == ZONE_OLD), None)
    if idx is None:
        print("lcsperip zone key: already $lcs_peri_key")
    else:
        lines[idx] = lines[idx].replace(ZONE_OLD, ZONE_NEW)
        changed += 1
        print("lcsperip zone key: now $lcs_peri_key")

    # 3. a lcsburst line beside every lcsperip line
    out, added, have = [], 0, 0
    for i, ln in enumerate(lines):
        out.append(ln)
        m = PERIP_RE.match(ln)
        if m:
            nxt = lines[i + 1] if i + 1 < len(lines) else ""
            if BURST_LINE in nxt:
                have += 1
            else:
                out.append(m.group(1) + BURST_LINE + "\n")
                added += 1
    lines = out
    print("lcsburst beside lcsperip: %d added, %d already there" % (added, have))
    changed += added
    if added + have == 0:
        print("FATAL: no `limit_req zone=lcsperip burst=40 nodelay;` line found. Aborting WITHOUT changes.")
        sys.exit(3)

    if not changed:
        print("nothing to do — already installed.")
        sys.exit(0)
    new_content = "".join(lines)
    if DRY:
        print("DRY-RUN — no file written.")
        sys.exit(0)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + time.strftime("%Y%m%dT%H%M%SZ", time.gmtime()) + ".bak")
    shutil.copy2(CONF, backup)
    print("backup -> " + backup)
    with open(CONF, "w") as f:
        f.write(new_content)
    r = run(["nginx", "-t"])
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx -t OK")
    r2 = run(["systemctl", "reload", "nginx"])
    if r2.returncode != 0:
        print("reload FAILED: " + r2.stderr.strip())
        shutil.copy2(backup, CONF)
        run(["systemctl", "reload", "nginx"])
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx reloaded. Run with --selftest to measure.")


if __name__ == "__main__":
    main()
