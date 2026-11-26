#!/bin/bash
#
# cf-origin-firewall.sh — the origin answers web requests (80/443) ONLY from Cloudflare.
#
# WHY (measured 2026-11-26): ufw allowed 80/443 from anywhere, so
#   curl --resolve www.lessoncraftstudio.com:443:65.108.5.250 https://www.lessoncraftstudio.com/...
# returned the full page. Anyone who knows the server address bypasses every Cloudflare rule
# (Super Bot Fight Mode, WAF custom rules, rate limiting) and can forge CF-Connecting-IP, the
# header the nginx logs and the per-IP limits key on. Chinese cloud IPs were already probing it.
#
# WHAT: one ufw rule per Cloudflare range (https://www.cloudflare.com/ips-v4 and ips-v6),
# "allow proto tcp from <range> to any port 80,443", comment "cloudflare"; then the two
# "Anywhere" allow rules for 80/tcp and 443/tcp are deleted. SSH (22) and loopback are untouched,
# so on-server checks against 127.0.0.1 keep working.
#
# ⚠ After --apply the site works ONLY while the DNS records stay proxied (orange cloud).
#   Grey-clouding lessoncraftstudio.com / www would point visitors straight at a server that
#   refuses them. Run --open first if the DNS ever has to go grey.
#
# Usage (as root on Hetzner):
#   bash cf-origin-firewall.sh --dry-run   print what --apply would change, change nothing
#   bash cf-origin-firewall.sh --apply     make the live rules match Cloudflare's current list
#   bash cf-origin-firewall.sh --check     exit 1 if the live rules differ from Cloudflare's list,
#                                          or 80/443 is still open to anywhere (housekeeping runs this)
#   bash cf-origin-firewall.sh --open      ROLLBACK: allow 80/443 from anywhere again
#
# Refuses to change anything when either list cannot be fetched or looks wrong (too few ranges,
# a line that is not a CIDR), so a Cloudflare outage can never empty the allow list.
set -u
export LC_ALL=C
MODE="${1:-}"
case "$MODE" in --dry-run|--apply|--check|--open) ;; *) echo "usage: $0 --dry-run|--apply|--check|--open"; exit 2;; esac
[ "$(id -u)" = 0 ] || { echo "run as root"; exit 2; }
command -v ufw >/dev/null || { echo "ufw not installed"; exit 2; }

if [ "$MODE" = "--open" ]; then
  ufw allow 80/tcp && ufw allow 443/tcp
  echo "80/443 are open to anywhere again (the cloudflare rules are left in place; they are harmless)."
  exit 0
fi

fetch() { curl -fsS --max-time 20 "$1"; }
V4=$(fetch https://www.cloudflare.com/ips-v4) || { echo "FATAL: could not fetch ips-v4 — nothing changed"; exit 3; }
V6=$(fetch https://www.cloudflare.com/ips-v6) || { echo "FATAL: could not fetch ips-v6 — nothing changed"; exit 3; }
V4=$(printf '%s\n' "$V4" | tr -d '\r' | sed '/^\s*$/d')
V6=$(printf '%s\n' "$V6" | tr -d '\r' | sed '/^\s*$/d')
N4=$(printf '%s\n' "$V4" | wc -l); N6=$(printf '%s\n' "$V6" | wc -l)
BAD4=$(printf '%s\n' "$V4" | grep -cvE '^[0-9]{1,3}(\.[0-9]{1,3}){3}/[0-9]{1,2}$')
BAD6=$(printf '%s\n' "$V6" | grep -cvE '^[0-9a-f:]+/[0-9]{1,3}$')
if [ "$N4" -lt 10 ] || [ "$N6" -lt 4 ] || [ "$BAD4" -ne 0 ] || [ "$BAD6" -ne 0 ]; then
  echo "FATAL: the Cloudflare lists look wrong (v4=$N4 ranges, v6=$N6, bad lines v4=$BAD4 v6=$BAD6) — nothing changed"
  exit 3
fi
WANT=$(printf '%s\n%s\n' "$V4" "$V6" | sort -u)

# Live state, read from `ufw show added` (stable, one command per rule, independent of column widths).
ADDED=$(ufw show added 2>/dev/null)
HAVE=$(printf '%s\n' "$ADDED" | grep "comment 'cloudflare'" | sed -E 's/.* from ([^ ]+) to any port 80,443.*/\1/' | sort -u)
OPEN80=$(printf '%s\n' "$ADDED" | grep -cE '^ufw allow 80/tcp$')
OPEN443=$(printf '%s\n' "$ADDED" | grep -cE '^ufw allow 443/tcp$')
MISSING=$(comm -23 <(printf '%s\n' "$WANT") <(printf '%s\n' "$HAVE" | sed '/^$/d'))
STALE=$(comm -13 <(printf '%s\n' "$WANT") <(printf '%s\n' "$HAVE" | sed '/^$/d'))
NMISS=$(printf '%s' "$MISSING" | grep -c . || true); NSTALE=$(printf '%s' "$STALE" | grep -c . || true)

echo "Cloudflare publishes $N4 IPv4 + $N6 IPv6 ranges; ufw has $(printf '%s' "$HAVE" | grep -c . || true) cloudflare rules."
echo "missing: $NMISS · stale: $NSTALE · 80/tcp open to anywhere: $OPEN80 · 443/tcp open to anywhere: $OPEN443"

if [ "$MODE" = "--check" ]; then
  if [ "$NMISS" -eq 0 ] && [ "$NSTALE" -eq 0 ] && [ "$OPEN80" -eq 0 ] && [ "$OPEN443" -eq 0 ]; then
    echo "OK — the origin answers 80/443 only from Cloudflare's current ranges."; exit 0
  fi
  [ -n "$MISSING" ] && echo "missing ranges:" && printf '   %s\n' $MISSING
  [ -n "$STALE" ] && echo "stale ranges:" && printf '   %s\n' $STALE
  echo "DRIFT — run: bash $0 --apply"; exit 1
fi

run() { if [ "$MODE" = "--apply" ]; then "$@" >/dev/null || { echo "FAILED: $*"; exit 4; }; fi; echo "   $*"; }

[ "$MODE" = "--dry-run" ] && echo "DRY RUN — would run:"
for r in $MISSING; do run ufw allow proto tcp from "$r" to any port 80,443 comment cloudflare; done
for r in $STALE;   do run ufw delete allow proto tcp from "$r" to any port 80,443; done

# Close the general openings only once every Cloudflare range is allowed.
if [ "$MODE" = "--apply" ]; then
  AFTER=$(ufw show added | grep -c "comment 'cloudflare'")
  if [ "$AFTER" -lt $((N4 + N6)) ]; then echo "FATAL: only $AFTER cloudflare rules present after adding — 80/443 left OPEN"; exit 4; fi
fi
[ "$OPEN80" -gt 0 ]  && run ufw delete allow 80/tcp
[ "$OPEN443" -gt 0 ] && run ufw delete allow 443/tcp

if [ "$MODE" = "--apply" ]; then
  ufw status | grep -qE '^22/tcp +ALLOW' || echo "WARNING: no 22/tcp ALLOW rule visible — check SSH access before logging out"
  echo "applied."
fi
