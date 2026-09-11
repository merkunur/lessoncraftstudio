#!/bin/bash
#
# LessonCraftStudio weekly housekeeping — the ONE place that expires the file classes
# our own scripts create and never remove. Origin: the 2026-09-11 disk audit (309/436 GB
# used; ~145 GB of it was these classes — see memory project_server_disk_cleanup_2026_09).
#
# Cron (root):  30 4 * * 0 /opt/lessoncraftstudio/server-scripts/housekeeping.sh >> /var/log/lessoncraftstudio-housekeeping.log 2>&1
#               (Sunday 04:30 — after backup-decks.sh 01:00 and the 04:00 DB-dump prunes)
#
# Usage:  housekeeping.sh            real run
#         housekeeping.sh --dry-run  print what would be removed, remove nothing
#
# What it expires, and why each window:
#   1. decks/**/deck.html.bak.*   > 14 d  — write-once safety copies from the 8 retrofit scripts
#                                           (rewrite-deck-html-*.js, inject-deck-teaching-block.js,
#                                           reconcile-deck-canonicals.js, strip-deck-hreflang.js).
#                                           Never read back; publish-wave step 4 adds one per deck
#                                           on EVERY wave. 14 d keeps a rollback window.
#   2. .publish-cli-staging/batch-* > 7 d — dry-run extraction dirs (bulk.js prunes them itself
#                                           after a REAL publish since 6f7c9e04; dry-run-only
#                                           batches are inspection output and expire here).
#                                           The _*.txt reports + _failures/ are KEPT.
#   3. /root/.pm2/logs/*.log      > 14 d  — pm2-logrotate's retain=7 is per process-index, so
#                                           logs from a dead index (-0, -2) never rotate out.
#   4. /root/*.log                > 30 d  — session deploy captures (nt20-deploy.log style).
#   5. /tmp is NOT handled here — /etc/tmpfiles.d/lcs-tmp-age.conf (14 d) does it daily.
#
# Never touches: live deck dirs/symlinks, image-library*, worksheet-generators, admin-panels,
# design-elements, backups/*.tar.gz|*.sql.gz (their own crons), releases/, the DB, nginx.
#
set -u
DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
DECKS=/var/www/lcs-media/decks
STAGING=/opt/lessoncraftstudio/.publish-cli-staging
PM2LOGS=/root/.pm2/logs

echo "=========================================="
echo "LessonCraftStudio housekeeping — $(date -u '+%Y-%m-%d %H:%M UTC')${DRY:+ }$([ $DRY = 1 ] && echo '[DRY RUN]')"
echo "=========================================="
echo "before: $(df -h / | tail -1)"

# Sum bytes of a file list on stdin (NUL-separated); prints "N files, X MB".
sum_files() { awk 'BEGIN{RS="\0"} {n++; s+=$0} END {printf "%d files, %.0f MB", n, s/1048576}'; }

# 1. deck.html.bak.* older than 14 days
echo ""
echo "1. deck.html.bak.* > 14 d in $DECKS"
find "$DECKS" -type f -name 'deck.html.bak.*' -mtime +14 -printf '%s\0' | sum_files; echo
if [ $DRY = 0 ]; then
  find "$DECKS" -type f -name 'deck.html.bak.*' -mtime +14 -delete
fi

# 2. stale publish-cli staging batches — remove extraction dirs, keep reports
echo ""
echo "2. .publish-cli-staging/batch-* > 7 d (extraction dirs only; _* reports kept)"
if [ -d "$STAGING" ]; then
  find "$STAGING" -mindepth 1 -maxdepth 1 -type d -name 'batch-*' -mtime +7 -print0 |
  while IFS= read -r -d '' b; do
    n=$(find "$b" -mindepth 1 -maxdepth 1 -type d ! -name '_*' | wc -l)
    [ "$n" -gt 0 ] || continue
    sz=$(find "$b" -mindepth 1 -maxdepth 1 -type d ! -name '_*' -exec du -sb {} + 2>/dev/null | awk '{s+=$1} END {printf "%.0f", s/1048576}')
    echo "   $(basename "$b"): $n extraction dir(s), ${sz} MB"
    if [ $DRY = 0 ]; then
      find "$b" -mindepth 1 -maxdepth 1 -type d ! -name '_*' -exec rm -rf {} +
    fi
  done
else
  echo "   (no staging root)"
fi

# 3. pm2 logs older than 14 days
echo ""
echo "3. $PM2LOGS/*.log > 14 d"
find "$PM2LOGS" -maxdepth 1 -type f -name '*.log' -mtime +14 -printf '%s\0' 2>/dev/null | sum_files; echo
if [ $DRY = 0 ]; then
  find "$PM2LOGS" -maxdepth 1 -type f -name '*.log' -mtime +14 -delete 2>/dev/null
fi

# 4. session logs dropped in /root
echo ""
echo "4. /root/*.log > 30 d"
find /root -maxdepth 1 -type f -name '*.log' -mtime +30 -printf '%s\0' | sum_files; echo
if [ $DRY = 0 ]; then
  find /root -maxdepth 1 -type f -name '*.log' -mtime +30 -delete
fi

echo ""
echo "after:  $(df -h / | tail -1)"
echo "backups: $(ls /opt/lessoncraftstudio/backups/decks_*.tar.gz 2>/dev/null | wc -l) deck tarball(s), $(du -sh /opt/lessoncraftstudio/backups 2>/dev/null | cut -f1) total"
echo ""
