#!/bin/bash
# Scheduled backup script for LessonCraftStudio samples
# Creates hourly/daily/weekly backups with rotation
#
# Location on server: /var/www/lcs-media/scripts/scheduled-backup.sh
# Usage: scheduled-backup.sh [hourly|daily|weekly|monthly]

set -e

SAMPLES_DIR="/var/www/lcs-media/samples"
BACKUP_BASE="/var/www/lcs-media/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_TYPE="${1:-daily}"

# Set retention based on backup type
case "$BACKUP_TYPE" in
    hourly)
        BACKUP_DIR="$BACKUP_BASE/hourly"
        RETENTION_COUNT=24  # Keep 24 hourly backups (1 day)
        ;;
    daily)
        BACKUP_DIR="$BACKUP_BASE/daily"
        RETENTION_COUNT=7   # Keep 7 daily backups (1 week)
        ;;
    weekly)
        BACKUP_DIR="$BACKUP_BASE/weekly"
        RETENTION_COUNT=4   # Keep 4 weekly backups (1 month)
        ;;
    monthly)
        BACKUP_DIR="$BACKUP_BASE/monthly"
        RETENTION_COUNT=12  # Keep 12 monthly backups (1 year)
        ;;
    *)
        echo "Usage: $0 [hourly|daily|weekly|monthly]"
        exit 1
        ;;
esac

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Count files
JPEG_COUNT=$(find "$SAMPLES_DIR" -name "*.jpeg" 2>/dev/null | wc -l)
WEBP_COUNT=$(find "$SAMPLES_DIR" -name "*.webp" 2>/dev/null | wc -l)
TOTAL_COUNT=$((JPEG_COUNT + WEBP_COUNT))

echo "[$BACKUP_TYPE] Scheduled backup starting at $(date)"
echo "  Files to backup: $TOTAL_COUNT (JPEG: $JPEG_COUNT, WebP: $WEBP_COUNT)"

# Only create backup if there are files
if [ "$TOTAL_COUNT" -gt 0 ]; then
    BACKUP_FILE="$BACKUP_DIR/samples_${BACKUP_TYPE}_$TIMESTAMP.tar.gz"

    tar -czf "$BACKUP_FILE" -C /var/www/lcs-media samples/

    if [ -f "$BACKUP_FILE" ] && [ -s "$BACKUP_FILE" ]; then
        BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        echo "  Backup created: $BACKUP_FILE ($BACKUP_SIZE)"
    else
        echo "  ERROR: Backup failed!"
        exit 1
    fi

    # Rotate old backups
    DELETED=$(ls -t "$BACKUP_DIR"/samples_*.tar.gz 2>/dev/null | tail -n +$((RETENTION_COUNT + 1)) | wc -l)
    ls -t "$BACKUP_DIR"/samples_*.tar.gz 2>/dev/null | tail -n +$((RETENTION_COUNT + 1)) | xargs -r rm -f
    echo "  Rotation: deleted $DELETED old backup(s), keeping $RETENTION_COUNT"
else
    echo "  No files to backup"
fi

echo "[$BACKUP_TYPE] Backup complete at $(date)"
