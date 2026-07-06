#!/bin/bash
# verify-nginx-contract.sh — asserts the load-bearing nginx invariants that a
# config rebuild would silently lose (broken-thumbnails class, 2026-07-06).
#
# A memory note is not protection: this script IS the guard. It is wired into
# two places:
#   1. deploy.sh (runs with --heal on EVERY deploy): a missing block is
#      re-applied via its idempotent patch script, then re-checked.
#   2. lcs-status (read-only, every 5 min via lcs-watchdog): any violation
#      prints a "!!!" line, which the watchdog appends to /var/log/lcs-alerts.log.
#
# Checks (config greps + one behavioral probe):
#   - /_next/image carve-out (zone=lcsasset)  [heal: patch-nginx-next-image-limits.py]
#     Without it, the image optimizer falls into `location /` (zone=lcsperip
#     burst=40) and a 24-84-image page paint 429s a random subset of
#     thumbnails per refresh — the 2026-07-06 broken-thumbnails incident.
#   - /mini-tools/ static alias (activities previews) [heal: patch-nginx-minitools-static.py]
#   - lcsperip zone + enforcement (bot defense)   [heal: patch-nginx-bot-limits.py]
#   - lcsasset zone (asset fan-out zone)          [heal: patch-nginx-studio-limits.py]
#   - @next_static_miss (stale-chunk login fix, §A.14.11) [check-only; server-side block]
#   - BEHAVIORAL: 48 concurrent /_next/image requests from one IP must produce
#     zero 429 (config greps can lie; the limiter's behavior cannot). Only 429
#     counts as a violation — other non-200s are the site checks' business.
#
# Exit 0 = contract holds; 1 = violation (after heal attempt, if --heal).
set -u

CONF=/etc/nginx/sites-enabled/lessoncraftstudio
REPO=/opt/lessoncraftstudio
HEAL=0
[ "${1:-}" = "--heal" ] && HEAL=1
FAIL=0

if [ ! -f "$CONF" ]; then
  echo "!!! NGINX CONTRACT: config not found at $CONF !!!"
  exit 1
fi

HEALED=0
req() { # req <grep-pattern> <description> [heal-script-path]
  local pattern="$1" desc="$2" heal="${3:-}"
  if grep -qE "$pattern" "$CONF"; then
    echo "   ok  $desc"
    return
  fi
  if [ "$HEAL" = 1 ] && [ -n "$heal" ] && [ -f "$heal" ]; then
    echo "   heal $desc missing — re-applying $(basename "$heal")"
    python3 "$heal" 2>&1 | sed 's/^/        /'
    if grep -qE "$pattern" "$CONF"; then
      echo "   ok  $desc (healed)"
      HEALED=1
      return
    fi
  fi
  echo "!!! NGINX CONTRACT: $desc MISSING — thumbnails/limits will silently break !!!"
  FAIL=1
}

req 'location /_next/image'                    '/_next/image carve-out location'          "$REPO/scripts/publish-cli/patch-nginx-next-image-limits.py"
req 'location /mini-tools/'                    '/mini-tools/ location (activity previews)' "$REPO/scripts/studio/patch-nginx-minitools-static.py"
req 'limit_req_zone .*zone=lcsperip'           'lcsperip rate-limit zone (bot defense)'    "$REPO/scripts/publish-cli/patch-nginx-bot-limits.py"
req 'limit_req_zone .*zone=lcsasset'           'lcsasset rate-limit zone (asset fan-out)'  "$REPO/scripts/studio/patch-nginx-studio-limits.py"
req '@next_static_miss'                        '_next/static 404-no-store handler (§A.14.11)'

# The carve-out must actually use the generous zone (a location without the
# limit_req would inherit nothing, but a wrong zone would re-break bursts).
if grep -qE 'location /_next/image' "$CONF"; then
  if ! grep -A3 'location /_next/image' "$CONF" | grep -qE 'limit_req zone=lcsasset'; then
    echo "!!! NGINX CONTRACT: /_next/image location exists but lacks 'limit_req zone=lcsasset' !!!"
    FAIL=1
  fi
fi

# Behavioral probe: 120 optimizer requests fired as a TRUE burst from ONE curl
# process (--parallel over HTTP/2 lands them within tens of ms — xargs-spawned
# curls were empirically too slow: process spawn + TLS spread 80 requests over
# seconds and the 8r/s drain absorbed them, hiding a broken config). With the
# carve-out (lcsasset burst=300) → zero 429. Without it (lcsperip burst=40) →
# ~80 guaranteed 429s. Identical URL = optimizer cache hit (31d TTL) → cheap.
# After a heal, wait for nginx's new workers — a probe against the old workers
# measures the OLD config (empirically produced a false 39/80).
[ "$HEALED" = 1 ] && sleep 3
PROBE_URL='/_next/image?url=https%3A%2F%2Fwww.lessoncraftstudio.com%2Fen%2Fdecks%2Faddition-find-addend-animals%2Fthumbnail.png&w=384&q=75'
PROBE_CFG=$(mktemp)
for _ in $(seq 120); do
  printf 'url = "https://127.0.0.1%s"\noutput = "/dev/null"\n' "$PROBE_URL"
done > "$PROBE_CFG"
RATE_LIMITED=$(curl -sk --parallel --parallel-max 120 -m 30 -w '%{http_code}\n' \
  -H 'Host: www.lessoncraftstudio.com' -K "$PROBE_CFG" 2>/dev/null | grep -c '^429$')
rm -f "$PROBE_CFG"
if [ "${RATE_LIMITED:-0}" -gt 0 ]; then
  echo "!!! NGINX CONTRACT: ${RATE_LIMITED}/120 burst /_next/image requests got 429 — carve-out not effective !!!"
  FAIL=1
else
  echo "   ok  behavioral: 120-request /_next/image burst, zero 429"
fi

exit $FAIL
