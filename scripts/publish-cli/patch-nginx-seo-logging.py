#!/usr/bin/env python3
"""
patch-nginx-seo-logging.py — end the SEO observability blackout.

WHY
---
`/etc/nginx/sites-enabled/lessoncraftstudio` carried 23 `access_log off;`
directives, and they sat on exactly the surfaces every SEO decision is argued
from: the tier-3 LANDINGS block, the deck page/asset/PDF blocks, and
/mini-tools/. Measured over 15 days / 1.84M log lines (2026-07-31):

    /<loc>/worksheets/<slug>   2,112 lines, ZERO 200s
    /<loc>/decks/...          15,832 lines, ZERO 200s

A successful landing serve CANNOT appear in that log. This invalidated a
load-bearing decision: robots.txt permanently blocks five prefixes partly on
the grounds that "the 30,078 /worksheets/ landings received ZERO fetches" —
which is a logging artifact, not a fact. It also means the standing rule
"re-measure from nginx logs before ANY SEO claim" could not be satisfied.

Second defect, same layer: nginx.conf uses the DEFAULT `combined` log_format,
so behind Cloudflare every `$remote_addr` is a CF edge IP and the real client
is never recorded. Googlebot therefore cannot be verified by reverse DNS —
and >=6.8% of "Googlebot"-UA hits in the sample were provably forged
(credential probes for /.env.local, /.git/config, /.aws/credentials).

WHAT THIS DOES
--------------
1. Writes /etc/nginx/conf.d/lcs-log-format.conf defining `lcs_seo`, which is
   `combined` plus the real client IP, the CF ray, cache status and upstream
   time. conf.d/*.conf is included INSIDE http{} (nginx.conf:59), which is the
   only context where log_format is legal — so nginx.conf itself is untouched.
2. Points the server block at it (`access_log ... lcs_seo;`), overriding the
   http-level default for this vhost only.
3. Removes `access_log off;` from the LANDINGS and DECK-PAGE blocks so they
   inherit it. Deliberately does NOT touch the other `access_log off` lines
   (images, samples, audio, /mini-tools/ asset fan-out) — those are genuine
   high-volume static noise and were switched off on purpose.

Idempotent (marker comment + presence checks); backs up to /root/nginx-backups/
(NEVER inside sites-enabled/, per CLAUDE.md §A.14.11); `nginx -t` with
auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-seo-logging.py
                     python3 scripts/publish-cli/patch-nginx-seo-logging.py --dry-run
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
FORMAT_CONF = "/etc/nginx/conf.d/lcs-log-format.conf"
BACKUP_DIR = "/root/nginx-backups"
MARKER = "# SEO logging restored (2026-07-31)"
DRY = "--dry-run" in sys.argv

# The two blocks whose logging must come back. Matched on their `location` line.
LANDING_LOC = re.compile(r"^\s*location\s+~\s+\^/\(en\|de\|fr\|es\|pt\|it\|nl\|sv\|da\|no\|fi\)/worksheets/\(\[\^/\]\+\)\$\s*\{")
DECK_LOC = re.compile(r"^\s*location\s+~\s+\^/\(en\|de\|fr\|es\|pt\|it\|nl\|sv\|da\|no\|fi\)/decks/\(\.\+\?\)/\$\s*\{")

LOG_FORMAT = """# Managed by scripts/publish-cli/patch-nginx-seo-logging.py — do not hand-edit.
#
# `combined` records $remote_addr, which behind Cloudflare is always a CF edge
# IP. That made Googlebot unverifiable (no reverse-DNS possible) and hid the
# real client entirely. $http_cf_connecting_ip is the true origin address.
log_format lcs_seo '$http_cf_connecting_ip $remote_addr - $remote_user [$time_local] '
                   '"$request" $status $body_bytes_sent '
                   '"$http_referer" "$http_user_agent" '
                   'cf=$http_cf_ray cc=$upstream_cache_status rt=$request_time';
"""

SERVER_ACCESS_LOG = '    access_log /var/log/nginx/access.log lcs_seo;\n'


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    # Idempotency is checked per-operation below, not by the marker alone: the first
    # run of this script set the marker but put the access_log directive in the WRONG
    # server block, so a marker-only guard would have refused to self-correct.
    already_logged = MARKER in original
    fmt_ok = os.path.exists(FORMAT_CONF)

    lines = original.splitlines(keepends=True)

    # --- locate the two blocks and their `access_log off;` line -------------
    def find_access_log_off(loc_re, label):
        loc_at = None
        for i, ln in enumerate(lines):
            if loc_re.match(ln):
                loc_at = i
                break
        if loc_at is None:
            return None, "could not locate the %s location block" % label
        depth = 0
        for i in range(loc_at, len(lines)):
            depth += lines[i].count("{") - lines[i].count("}")
            if i > loc_at and re.match(r"^\s*access_log\s+off\s*;", lines[i]):
                return i, None
            if depth == 0:
                break
        return None, "%s block has no `access_log off;` (already restored?)" % label

    landing_at, landing_err = find_access_log_off(LANDING_LOC, "landings")
    deck_at, deck_err = find_access_log_off(DECK_LOC, "deck-page")

    if landing_at is None and deck_at is None:
        if already_logged:
            # Expected on a re-run: the `access_log off;` lines are already gone.
            # Op B (correct placement of the lcs_seo directive) may still need to run.
            print("logging already re-enabled on both blocks; checking directive placement.")
        else:
            print("FATAL: neither target block yielded an `access_log off;` line,")
            print("       and the marker is absent — the config is not the shape expected.")
            print("  landings : " + str(landing_err))
            print("  deck-page: " + str(deck_err))
            print("  Aborting WITHOUT changes (config untouched).")
            sys.exit(3)
    else:
        if landing_err:
            print("WARN: " + landing_err)
        if deck_err:
            print("WARN: " + deck_err)

    # --- build the new config ----------------------------------------------
    drop = {i for i in (landing_at, deck_at) if i is not None}
    out = []
    for i, ln in enumerate(lines):
        if i in drop:
            indent = re.match(r"^\s*", ln).group(0)
            out.append(indent + MARKER + "\n")
            out.append(indent + "# access_log intentionally ON: this is the surface every SEO\n")
            out.append(indent + "# measurement depends on. Do not switch it off again.\n")
            continue
        out.append(ln)

    new_content = "".join(out)

    # Server-level access_log with the new format.
    #
    # It MUST land in the server block that actually serves the landings. Anchoring
    # on the first `server_name` put it in the port-80 → https redirect block, where
    # it applied to nothing: the probe still logged in `combined` with a Cloudflare
    # edge IP even though nginx -t passed and the patch reported success. Anchor on
    # the block CONTAINING the landings location instead — that cannot be ambiguous.
    out_lines = new_content.splitlines(keepends=True)

    # Drop any previously mis-placed directive so re-running self-corrects.
    out_lines = [l for l in out_lines if "access_log /var/log/nginx/access.log lcs_seo;" not in l]

    landing_now = None
    for i, ln in enumerate(out_lines):
        if LANDING_LOC.match(ln):
            landing_now = i
            break
    if landing_now is None:
        print("FATAL: lost the landings location while rebuilding — aborting.")
        sys.exit(3)

    server_at = None
    for i in range(landing_now, -1, -1):
        if re.match(r"^\s*server\s*\{", out_lines[i]):
            server_at = i
            break
    if server_at is None:
        print("FATAL: could not find the enclosing `server {` for the landings block.")
        sys.exit(3)

    out_lines.insert(server_at + 1, SERVER_ACCESS_LOG)
    new_content = "".join(out_lines)
    print("anchored access_log in the server block at line %d (the one serving landings)." % (server_at + 1))

    if DRY:
        print("DRY-RUN — would write %s and re-enable logging on %d block(s)." % (FORMAT_CONF, len(drop)))
        for i in sorted(drop):
            print("  line %d: %s" % (i + 1, lines[i].strip()))
        sys.exit(0)

    # --- apply --------------------------------------------------------------
    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    fmt_existed = fmt_ok
    with open(FORMAT_CONF, "w") as f:
        f.write(LOG_FORMAT)
    print(("rewrote " if fmt_existed else "wrote ") + FORMAT_CONF)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("re-enabled access logging on %d block(s); server now logs with `lcs_seo`." % len(drop))

    r = run(["nginx", "-t"])
    if r.returncode != 0:
        print("nginx -t FAILED — rolling back:")
        print(r.stderr.strip())
        shutil.copy2(backup, CONF)
        if not fmt_existed:
            os.remove(FORMAT_CONF)
        print("restored original from " + backup)
        sys.exit(4)
    print("nginx -t OK:")
    print(r.stderr.strip())

    r2 = run(["systemctl", "reload", "nginx"])
    if r2.returncode != 0:
        print("reload FAILED:")
        print(r2.stderr.strip())
        sys.exit(5)
    print("nginx reloaded. Verify with:")
    print("  curl -s -o /dev/null https://www.lessoncraftstudio.com/en/worksheets/treasure-hunt-animals")
    print("  tail -2 /var/log/nginx/access.log   # the hit must now appear, with a real client IP")


if __name__ == "__main__":
    main()
