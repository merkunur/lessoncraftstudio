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
# A running nginx REFUSES to change the key of an existing shared zone ("uses the
# $lcs_peri_key key while previously it used the $lcs_client_ip key") and keeps the
# old config — while `systemctl reload` still returns 0. A different size makes a
# fresh zone, so the new key is accepted. ZONE_MID is the rejected 20m version.
ZONE_MID = "limit_req_zone $lcs_peri_key zone=lcsperip:20m rate=8r/s;"
ZONE_NEW = "limit_req_zone $lcs_peri_key zone=lcsperip:24m rate=8r/s;"
ERRLOG = "/var/log/nginx/error.log"
BLOCK = """# Browse burst (2026-10-28): start
# Prefetch (`_rsc=`) and maker picture loads (`/api/images`) burst far past
# 40 in a second from ONE real visitor; they get their own per-IP zone.
map $request_uri $lcs_burst_class {
    default 0;
    "~(^/api/images([?]|$)|[?&]_rsc=)" 1;
}
# No regex captures: in the general location the stale-Chrome `if` runs a regex
# map first, and a capture-built key came out wrong there (live, 2026-10-28).
map $lcs_burst_class $lcs_peri_key {
    default $lcs_client_ip;
    1       "";
}
map $lcs_burst_class $lcs_burst_key {
    default "";
    1       $lcs_client_ip;
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
    # a fresh test IP per burst, and a pause between them, so no burst inherits another's budget.
    # The control is a quick uncached API call: slow page renders can space a burst out
    # under the limit and make the control pass for the wrong reason (it did, first run).
    # Both prefetch cases: the hub location AND the general location (whose stale-Chrome
    # `if` broke the first, capture-based version only there — a hub-only test missed it).
    r1 = burst("/en/topic/animals?_rsc=selftest", "203.0.113.81")
    time.sleep(6)
    r1b = burst("/en/pricing?_rsc=selftest", "203.0.113.84")
    time.sleep(6)
    r2 = burst("/api/images?theme=animals&locale=en", "203.0.113.82")
    time.sleep(6)
    r3 = burst("/api/themes-translated?locale=en", "203.0.113.83")
    print("selftest  _rsc prefetch, hub page     : %d of %d refused (want 0)" % r1)
    print("selftest  _rsc prefetch, general page : %d of %d refused (want 0)" % r1b)
    print("selftest  /api/images burst           : %d of %d refused (want 0)" % r2)
    print("selftest  plain API burst             : %d of %d refused (want > 0: the per-IP limit still works)" % r3)
    ok = r1[0] == 0 and r1b[0] == 0 and r2[0] == 0 and r3[0] > 0 and r1[1] == r1b[1] == r2[1] == r3[1] == 80
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

    # 1. the zones + maps, just before the lcsperip zone. Self-updating: an
    # installed block that differs from BLOCK is replaced. The first install
    # carried a backslash-escaped `?`, which nginx read as the PCRE branch-reset
    # `(?|$)` — so `/api/images?theme=…` never matched. Character classes only.
    if MARKER in original:
        s0 = next(i for i, ln in enumerate(lines) if MARKER in ln)
        s1 = next(i for i, ln in enumerate(lines) if i >= s0 and ln.strip() == "# Browse burst: end")
        if "".join(lines[s0:s1 + 1]) == BLOCK:
            print("maps + lcsburst zone: already installed")
        else:
            lines = lines[:s0] + [BLOCK] + lines[s1 + 1:]
            changed += 1
            print("maps + lcsburst zone: replaced with the current version")
    else:
        at = next((i for i, ln in enumerate(lines) if ln.strip() in (ZONE_OLD, ZONE_MID, ZONE_NEW)), None)
        if at is None:
            print("FATAL: could not find the lcsperip zone line. Aborting WITHOUT changes.")
            sys.exit(3)
        lines = lines[:at] + [BLOCK] + lines[at:]
        changed += 1
        print("maps + lcsburst zone: inserted")

    # 2. lcsperip keyed on $lcs_peri_key
    idx = next((i for i, ln in enumerate(lines) if ln.strip() in (ZONE_OLD, ZONE_MID)), None)
    if idx is None:
        print("lcsperip zone key: already $lcs_peri_key (24m)")
    else:
        lines[idx] = lines[idx].replace(lines[idx].strip(), ZONE_NEW)
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
    # `systemctl reload` returns 0 even when the master rejects the new config while
    # loading it; the only evidence is an [emerg] line in the error log. Read it.
    before = os.path.getsize(ERRLOG) if os.path.exists(ERRLOG) else 0
    r2 = run(["systemctl", "reload", "nginx"])
    time.sleep(3)
    tail = ""
    if os.path.exists(ERRLOG):
        with open(ERRLOG, "r", errors="replace") as f:
            f.seek(before)
            tail = f.read()
    emerg = [ln for ln in tail.splitlines() if "[emerg]" in ln]
    if r2.returncode != 0 or emerg:
        print("reload REJECTED by nginx: " + (r2.stderr.strip() or "; ".join(emerg)))
        shutil.copy2(backup, CONF)
        run(["systemctl", "reload", "nginx"])
        print("restored original from " + backup + " (the running config never changed)")
        sys.exit(6)
    print("nginx reloaded and the master accepted the new config (no [emerg]). Run with --selftest to measure.")


if __name__ == "__main__":
    main()
