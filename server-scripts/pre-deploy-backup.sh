#!/bin/bash
# Pre-deployment backup script for LessonCraftStudio samples
# This script should be called BEFORE any deployment to create a safety backup
#
# Location on server: /var/www/lcs-media/scripts/pre-deploy-backup.sh

set -e

SAMPLES_DIR="/var/www/lcs-media/samples"
BACKUP_DIR="/var/www/lcs-media/backups/pre-deploy"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Count current files
JPEG_COUNT=$(find "$SAMPLES_DIR" -name "*.jpeg" 2>/dev/null | wc -l)
WEBP_COUNT=$(find "$SAMPLES_DIR" -name "*.webp" 2>/dev/null | wc -l)
TOTAL_COUNT=$((JPEG_COUNT + WEBP_COUNT))

echo "Pre-deployment backup starting..."
echo "  JPEG files: $JPEG_COUNT"
echo "  WebP files: $WEBP_COUNT"
echo "  Total: $TOTAL_COUNT"

# Only create backup if there are files to back up
if [ "$TOTAL_COUNT" -gt 0 ]; then
    BACKUP_FILE="$BACKUP_DIR/samples_$TIMESTAMP.tar.gz"

    echo "Creating backup: $BACKUP_FILE"
    tar -czf "$BACKUP_FILE" -C /var/www/lcs-media samples/

    # Verify backup was created
    if [ -f "$BACKUP_FILE" ] && [ -s "$BACKUP_FILE" ]; then
        BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        echo "Backup created successfully: $BACKUP_FILE ($BACKUP_SIZE)"
    else
        echo "ERROR: Backup file not created or is empty!"
        exit 1
    fi

    # Keep only last 5 pre-deploy backups (cleanup old ones)
    ls -t "$BACKUP_DIR"/samples_*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm -f
    echo "Cleanup: keeping last 5 pre-deploy backups"
else
    echo "No sample files to backup (this is OK for fresh installs)"
fi

# Output counts for verification by calling script
echo ""
echo "COUNTS:$JPEG_COUNT:$WEBP_COUNT"
