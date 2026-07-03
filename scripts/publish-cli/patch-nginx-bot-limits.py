#!/usr/bin/env python3
"""
patch-nginx-bot-limits.py — origin-side bot mitigation (commission #1, 2026-07-03).

Measured problem (14-day log analysis): a rotating-UA scraper fleet (Chrome
majors 103-149 in a flat distribution, ~266k `?_rsc=` route-graph walks) plus
misc single-IP walkers hammer the Next.js origin. Cloudflare-side rules are a
separate operator-dashboard step (docs/ops/cloudflare-hardening.md); this patch
is the creds-free origin layer.

Two mechanisms, BOTH scoped to the `location /` Next.js proxy only (static
assets, decks, generators, images are untouched):

1. Per-client rate limit — `limit_req` keyed on CF-Connecting-IP (falls back to
   $remote_addr for direct hits), 8 r/s with burst 40 nodelay → 429. Generous:
   real users' doc/_rsc requests never approach it (chunk/image requests hit
   other locations); single-IP walkers get throttled.

2. Fleet-signature 429 — requests where BOTH hold: (a) the UA claims a stale
   Chrome major (90-138 — years old by mid-2026, the fleet's signature) AND is
   not a known crawler UA (Googlebot's evergreen UA also carries a Chrome
   token and MUST be exempt), and (b) the request is an `?_rsc=` prefetch.
   Plain page views from genuinely old browsers are NEVER blocked — only the
   RSC-walk requests no human browser issues at volume.

Idempotent (marker comment); backup to /root/nginx-backups/; `nginx -t` with
auto-rollback; reload.

Usage (on Hetzner):  python3 scripts/publish-cli/patch-nginx-bot-limits.py
"""
import os
import re
import sys
import time
import shutil
import subprocess

CONF = "/etc/nginx/sites-enabled/lessoncraftstudio"
BACKUP_DIR = "/root/nginx-backups"
MARKER_TOP = "# Bot limits: maps + zone (commission #1, 2026-07-03)"
MARKER_LOC = "# Bot limits: enforcement (commission #1, 2026-07-03)"

# Anchor 1: the first existing top-level map (WebSocket map) — insert BEFORE it.
TOP_ANCHOR_RE = re.compile(r'^map\s+\$http_upgrade\s+\$connection_upgrade\s*\{')
# Anchor 2: the Next.js proxy location — insert right AFTER the opening line.
LOC_ANCHOR_RE = re.compile(r'^(\s*)location\s+/\s*\{\s*$')

TOP_BLOCK = MARKER_TOP + """
# Client IP: behind Cloudflare the connection IP is a CF edge; the visitor IP
# rides in CF-Connecting-IP. Fall back to $remote_addr for direct-origin hits.
map $http_cf_connecting_ip $lcs_client_ip {
    default $http_cf_connecting_ip;
    ""      $remote_addr;
}
# Stale-Chrome fleet UA flag. Order matters: known crawler UAs (incl. evergreen
# Googlebot, which carries a Chrome token) are exempted FIRST, then the stale
# Chrome majors (90-138) flag as fleet-suspect. Current browsers (139+) never match.
map $http_user_agent $lcs_stale_chrome_ua {
    default 0;
    "~*(googlebot|google-inspectiontool|adsbot|googleother|storebot|bingbot|bingpreview|msnbot|duckduckbot|yandex|applebot|slurp|baiduspider|petalbot|seznambot|semrush|ahrefs|mj12bot|dotbot|dataforseo|gptbot|oai-searchbot|chatgpt|claudebot|claude-user|anthropic|perplexity|amazonbot|bytespider|ccbot|facebookexternalhit|meta-externalagent|twitterbot|linkedinbot|pinterest|whatsapp|telegrambot|slackbot|discordbot)" 0;
    "~Chrome/(9[0-9]|10[0-9]|11[0-9]|12[0-9]|13[0-8])\\." 1;
}
# Block only when fleet-UA AND an _rsc prefetch param are both present.
map "$lcs_stale_chrome_ua:$arg__rsc" $lcs_fleet_block {
    default 0;
    "~^1:.+" 1;
}
# Per-client-IP rate limit zone for the Next.js proxy (dynamic routes only).
limit_req_zone $lcs_client_ip zone=lcsperip:20m rate=8r/s;
limit_req_status 429;

"""

LOC_BLOCK = """{indent}    {marker}
{indent}    # Fleet-signature RSC walks → 429 (see maps at top of file).
{indent}    if ($lcs_fleet_block) {{
{indent}        return 429;
{indent}    }}
{indent}    limit_req zone=lcsperip burst=40 nodelay;
"""


def main():
    if not os.path.exists(CONF):
        print("FATAL: nginx config not found at " + CONF)
        sys.exit(2)

    with open(CONF, "r") as f:
        original = f.read()

    if MARKER_TOP in original and MARKER_LOC in original:
        print("IDEMPOTENT: bot-limit blocks already present — no change.")
        r = subprocess.run(["nginx", "-t"], capture_output=True, text=True)
        print(r.stderr.strip())
        sys.exit(0)
    if (MARKER_TOP in original) != (MARKER_LOC in original):
        print("FATAL: half-applied state (one marker present, the other missing).")
        print("       Restore from /root/nginx-backups/ and re-run. Aborting without changes.")
        sys.exit(6)

    lines = original.splitlines(keepends=True)

    top_at = None
    for i, ln in enumerate(lines):
        if TOP_ANCHOR_RE.match(ln):
            top_at = i
            break
    if top_at is None:
        print("FATAL: could not locate the top-level $http_upgrade map anchor. Aborting without changes.")
        sys.exit(3)

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

    # Insert bottom-up so earlier indices stay valid.
    loc_block = LOC_BLOCK.format(indent=loc_indent, marker=MARKER_LOC)
    lines.insert(loc_at + 1, loc_block)
    lines.insert(top_at, TOP_BLOCK)
    new_content = "".join(lines)

    os.makedirs(BACKUP_DIR, exist_ok=True)
    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    backup = os.path.join(BACKUP_DIR, "lessoncraftstudio." + stamp + ".bak")
    shutil.copy2(CONF, backup)
    print("backup → " + backup)

    with open(CONF, "w") as f:
        f.write(new_content)
    print("inserted bot-limit maps+zone (line ~" + str(top_at + 1) + ") and enforcement in location / (line ~" + str(loc_at + 1) + ").")

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
    print("nginx reloaded. Bot limits live.")


if __name__ == "__main__":
    main()
