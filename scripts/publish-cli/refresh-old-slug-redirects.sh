#!/usr/bin/env bash
#
# refresh-old-slug-redirects.sh — regenerate the old->native deck 301 map from the
# live symlink layout and, ONLY IF it changed, install it + reload nginx.
#
# Why: after ANY native re-slug (migrate-native-mode-slugs.js, rename-pdf-files.js,
# salvage-*-chartcount.js, fix-deck-pdf-filenames.py, or any future one-off) the
# on-disk symlinks change, so the $deck_redirect map (page + PDF legacy URLs, per
# gen-old-slug-redirects.js) goes stale -> legacy English-slug page/PDF URLs 404 or
# redirect-loop (the SEO breakage fixed in commit 229cbfa0). This makes the refresh
# automatic instead of a manual runbook step.
#
# Runs on Hetzner as root. Self-contained + idempotent + change-detecting: safe to
# run on a frequent cron. Rebuilds /opt map, diffs vs the live /etc/nginx map, and
# only backs up + copies + `nginx -t` + reloads when the content actually differs.
# Does NOT touch the nginx config structure (the `map $uri $deck_redirect` block,
# the page in-location 301, and the 4 PDF-location $deck_redirect hooks are one-time
# installs by patch-nginx-deck-redirects.py + patch-nginx-pdf-deck-redirect.py).
#
# Installed via root cron (self-healing net; the guarantee):
#   */15 * * * * /opt/lessoncraftstudio/scripts/publish-cli/refresh-old-slug-redirects.sh >> /var/log/lessoncraftstudio-redirects.log 2>&1
# Re-apply that crontab line after any server rebuild. Can also be run by hand right
# after a re-slug for an immediate refresh.
#
# Note: map_hash sizing (map_hash_max_size / map_hash_bucket_size at the top of
# /etc/nginx/sites-enabled/lessoncraftstudio) is server-side config, not managed
# here. If the map grows enough to fail `nginx -t`, this script's test gate catches
# it (rolls back + logs non-zero) — bump the sizing then.
set -euo pipefail

REPO=/opt/lessoncraftstudio
GEN="$REPO/scripts/publish-cli/gen-old-slug-redirects.js"
OPT_MAP="$REPO/old-slug-redirects.map"
ETC_MAP=/etc/nginx/old-slug-redirects.map
BKDIR=/root/nginx-backups

log() { echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) refresh-old-slug-redirects: $*"; }

cd "$REPO"

# 1. regenerate the /opt map (+ pairs.txt) from the live symlink layout.
node "$GEN" >/dev/null

# 2. change-detect against the live map nginx actually includes.
if [ -f "$ETC_MAP" ] && cmp -s "$OPT_MAP" "$ETC_MAP"; then
  log "map unchanged ($(wc -l < "$ETC_MAP") lines) — no reload"
  exit 0
fi

# 3. changed (or first install): back up the live map, install, test, reload.
mkdir -p "$BKDIR"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BK="$BKDIR/old-slug-redirects.map.$STAMP.bak"
if [ -f "$ETC_MAP" ]; then
  cp -p "$ETC_MAP" "$BK"
  log "backed up live map -> $BK"
fi

cp "$OPT_MAP" "$ETC_MAP"
log "installed new map ($(wc -l < "$ETC_MAP") lines)"

if ! nginx -t >/tmp/refresh-old-slug-nginxt.log 2>&1; then
  log "ERROR: nginx -t FAILED after map install — rolling back"
  cat /tmp/refresh-old-slug-nginxt.log
  if [ -f "$BK" ]; then
    cp "$BK" "$ETC_MAP"
    log "restored previous map from $BK"
  fi
  exit 1
fi

if systemctl reload nginx 2>/dev/null || nginx -s reload; then
  log "nginx reloaded — legacy page + PDF redirects made whole"
else
  log "ERROR: nginx reload FAILED"
  exit 1
fi
