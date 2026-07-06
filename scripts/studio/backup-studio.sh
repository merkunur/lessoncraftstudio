#!/bin/bash
#
# LessonCraftStudio Story-Studio Tenant Asset-Tree Backup
# =======================================================
# Weekly tarball of /var/www/lcs-media/studio/ (teacher-story binaries:
# scenes, uploads, cast, SEP exercises, audio). The story/strings JSON
# lives in Postgres and is covered by the daily pg_dump cron; this closes
# the §A.14.6 backup gap for the binary side. Mirrors backup-decks.sh.
#
# Install (cron, Sundays 1:30 AM, between the decks and samples jobs):
#   30 1 * * 0 /opt/lessoncraftstudio/scripts/studio/backup-studio.sh >> /var/log/lessoncraftstudio-backup.log 2>&1
#
# Recovery: tar -xzf <backup-file> -C /var/www/lcs-media/
#
set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/lessoncraftstudio/backups"
STUDIO_DIR="/var/www/lcs-media/studio"
KEEP=4

echo "=========================================="
echo "Story Studio tenant asset-tree backup"
echo "$(date)"
echo "=========================================="

if [ ! -d "$STUDIO_DIR" ]; then
  echo "Nothing to back up ($STUDIO_DIR missing)"
  exit 0
fi

# The GLOBAL storybook asset library (characters/backgrounds) is written
# LIVE by the library manager (/api/admin/storybook-library) — the served
# tree is authoritative (git holds only the bootstrap seed), so it rides
# in the same weekly tarball.
LIB_DIR="/var/www/lcs-media/mini-tools/storybook-library"
TARGETS="studio"
[ -d "$LIB_DIR" ] && TARGETS="$TARGETS mini-tools/storybook-library"

mkdir -p "$BACKUP_DIR"
OUT="$BACKUP_DIR/studio_${TIMESTAMP}.tar.gz"
tar -czf "$OUT" -C /var/www/lcs-media $TARGETS
echo "Wrote $OUT ($(du -h "$OUT" | cut -f1)) [$TARGETS]"

# retain the newest $KEEP
ls -t "$BACKUP_DIR"/studio_*.tar.gz 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm
echo "Retention: newest $KEEP kept"
