#!/usr/bin/env bash
#
# refresh-deck-noindex-exempt.sh — regenerate the deck noindex EXEMPT map and,
# ONLY IF it changed, install it + reload nginx.
#
# Why: the deck location block serves `X-Robots-Tag: noindex, indexifembedded` to
# EVERY deck, and `/etc/nginx/deck-noindex-exempt.map` carves out the landing-less
# decks — the ones that are SELF-canonical and are their own only indexable surface
# (they are also the 9,752 URLs in sitemap shards 0/1). The map lists what to EXEMPT
# and the default stays noindex, so it FAILS TOWARD NOINDEX: when it goes stale, a
# deck that has just lost its landing keeps being told "noindex" while the sitemap
# advertises it. That is silent de-indexing of indexable pages.
#
# gen-deck-noindex-exempt-map.js's own header says to re-run it "after any landing
# wave or the exempt set goes stale" — but nothing did. Audited 2026-07-31: the map
# was in sync only because someone ran it by hand on 2026-07-30, and 5 decks had
# already drifted (e.g. /en/decks/sudoku-thanksgivinng/). This makes it automatic
# rather than a manual runbook step, exactly like refresh-old-slug-redirects.sh.
#
# Runs on Hetzner as root. Self-contained + idempotent + change-detecting: safe on a
# frequent cron. Generates to a staging path, diffs against the live map, and only
# backs up + installs + `nginx -t` + reloads when the content actually differs.
# Does NOT touch the nginx config structure (the `map` block + the `include` are a
# one-time install by patch-nginx-deck-noindex-exempt.py).
#
# Installed via root cron (hourly is ample — landing waves are not minute-scale):
#   7 * * * * /opt/lessoncraftstudio/scripts/publish-cli/refresh-deck-noindex-exempt.sh >> /var/log/lessoncraftstudio-noindex-exempt.log 2>&1
# Re-apply that crontab line after any server rebuild. Can also be run by hand right
# after a landing wave for an immediate refresh.
#
# NOTE: publish-wave.js already calls the generator as a non-fatal STEP 7b. This
# cron is the safety net for every OTHER path that changes landing coverage
# (render-landing-html, repoint scripts, manual unpublishes).
set -euo pipefail

REPO=/opt/lessoncraftstudio
GEN="$REPO/scripts/publish-cli/gen-deck-noindex-exempt-map.js"
STAGE="$REPO/deck-noindex-exempt.map.new"
ETC_MAP=/etc/nginx/deck-noindex-exempt.map
BKDIR=/root/nginx-backups

log() { echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) refresh-deck-noindex-exempt: $*"; }

cd "$REPO"

# 1. regenerate to a STAGING path — never straight over the live map, so a failed
#    generation cannot leave nginx including a truncated file.
node "$GEN" --out="$STAGE" >/dev/null

if [ ! -s "$STAGE" ]; then
  log "ERROR: generator produced an empty/missing map at $STAGE — refusing to install"
  rm -f "$STAGE"
  exit 1
fi

# 2. change-detect against the live map nginx actually includes.
if [ -f "$ETC_MAP" ] && cmp -s "$STAGE" "$ETC_MAP"; then
  log "map unchanged ($(wc -l < "$ETC_MAP") lines) — no reload"
  rm -f "$STAGE"
  exit 0
fi

# 3. changed (or first install): back up the live map, install, test, reload.
mkdir -p "$BKDIR"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BK="$BKDIR/deck-noindex-exempt.map.$STAMP.bak"
if [ -f "$ETC_MAP" ]; then
  cp -p "$ETC_MAP" "$BK"
  log "backed up live map -> $BK ($(wc -l < "$BK") lines)"
fi

cp "$STAGE" "$ETC_MAP"
rm -f "$STAGE"
log "installed new exempt map ($(wc -l < "$ETC_MAP") lines)"

if ! nginx -t >/tmp/refresh-noindex-exempt-nginxt.log 2>&1; then
  log "ERROR: nginx -t FAILED after map install — rolling back"
  cat /tmp/refresh-noindex-exempt-nginxt.log
  if [ -f "$BK" ]; then
    cp "$BK" "$ETC_MAP"
    log "restored previous map from $BK"
  fi
  exit 1
fi

if systemctl reload nginx 2>/dev/null || nginx -s reload; then
  log "nginx reloaded — landing-less decks exempted from noindex"
else
  log "ERROR: nginx reload FAILED"
  exit 1
fi
