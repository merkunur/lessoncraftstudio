#!/bin/bash
# Scheduled backup script for LessonCraftStudio
# Creates hourly/daily/weekly backups with rotation for samples AND worksheets
#
# Location on server: /var/www/lcs-media/scripts/scheduled-backup.sh
# Usage: scheduled-backup.sh [hourly|daily|weekly|monthly]

set -e

SAMPLES_DIR="/var/www/lcs-media/samples"
WG_DIR="/var/www/lcs-media/worksheet-generators"
ADMIN_DIR="/var/www/lcs-media/admin-panels"
PUBLIC_DIR="/opt/lessoncraftstudio/frontend/public"
BACKUP_BASE="/var/www/lcs-media/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_TYPE="${1:-daily}"

# Individual content manager files to include
INDIVIDUAL_FILES=(
    "$PUBLIC_DIR/homepage-content-manager.html"
    "$PUBLIC_DIR/user-control.html"
)

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

# ============================================
# SAMPLES BACKUP
# ============================================
JPEG_COUNT=$(find "$SAMPLES_DIR" -name "*.jpeg" 2>/dev/null | wc -l)
WEBP_COUNT=$(find "$SAMPLES_DIR" -name "*.webp" 2>/dev/null | wc -l)
TOTAL_COUNT=$((JPEG_COUNT + WEBP_COUNT))

echo "[$BACKUP_TYPE] Scheduled backup starting at $(date)"
echo "  Sample files: $TOTAL_COUNT (JPEG: $JPEG_COUNT, WebP: $WEBP_COUNT)"

if [ "$TOTAL_COUNT" -gt 0 ]; then
    BACKUP_FILE="$BACKUP_DIR/samples_${BACKUP_TYPE}_$TIMESTAMP.tar.gz"

    tar -czf "$BACKUP_FILE" -C /var/www/lcs-media samples/

    if [ -f "$BACKUP_FILE" ] && [ -s "$BACKUP_FILE" ]; then
        BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        echo "  Sample backup: $BACKUP_FILE ($BACKUP_SIZE)"
    else
        echo "  ERROR: Sample backup failed!"
        exit 1
    fi

    # Rotate old sample backups
    DELETED=$(ls -t "$BACKUP_DIR"/samples_*.tar.gz 2>/dev/null | tail -n +$((RETENTION_COUNT + 1)) | wc -l)
    ls -t "$BACKUP_DIR"/samples_*.tar.gz 2>/dev/null | tail -n +$((RETENTION_COUNT + 1)) | xargs -r rm -f
    echo "  Sample rotation: deleted $DELETED old backup(s), keeping $RETENTION_COUNT"
else
    echo "  No sample files to backup"
fi

# ============================================
# WORKSHEETS + ADMIN + INDIVIDUAL FILES BACKUP
# ============================================
WG_HTML=$(find "$WG_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
WG_JS=$(find "$WG_DIR/js" -name "*.js" -type f 2>/dev/null | wc -l)
ADMIN_HTML=$(find "$ADMIN_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)

echo "  Worksheet files: $WG_HTML HTML, $WG_JS JS"
echo "  Admin panels: $ADMIN_HTML"

WG_TOTAL=$((WG_HTML + WG_JS + ADMIN_HTML))
if [ "$WG_TOTAL" -gt 0 ]; then
    WG_BACKUP_FILE="$BACKUP_DIR/worksheets_${BACKUP_TYPE}_$TIMESTAMP.tar.gz"

    # Build tar with all reference content
    TAR_ARGS="-czf $WG_BACKUP_FILE -C /var/www/lcs-media worksheet-generators/ admin-panels/"

    # Add individual files if they exist
    EXTRA_FILES=""
    for f in "${INDIVIDUAL_FILES[@]}"; do
        if [ -f "$f" ]; then
            EXTRA_FILES="$EXTRA_FILES $f"
        fi
    done

    tar -czf "$WG_BACKUP_FILE" \
        -C /var/www/lcs-media \
        worksheet-generators/ \
        admin-panels/ \
        $(for f in "${INDIVIDUAL_FILES[@]}"; do [ -f "$f" ] && echo "-C / ${f#/}"; done) \
        2>/dev/null || \
    tar -czf "$WG_BACKUP_FILE" \
        -C /var/www/lcs-media \
        worksheet-generators/ \
        admin-panels/

    if [ -f "$WG_BACKUP_FILE" ] && [ -s "$WG_BACKUP_FILE" ]; then
        WG_SIZE=$(du -h "$WG_BACKUP_FILE" | cut -f1)
        echo "  Worksheet backup: $WG_BACKUP_FILE ($WG_SIZE)"
    else
        echo "  ERROR: Worksheet backup failed!"
        exit 1
    fi

    # Rotate old worksheet backups
    WG_DELETED=$(ls -t "$BACKUP_DIR"/worksheets_*.tar.gz 2>/dev/null | tail -n +$((RETENTION_COUNT + 1)) | wc -l)
    ls -t "$BACKUP_DIR"/worksheets_*.tar.gz 2>/dev/null | tail -n +$((RETENTION_COUNT + 1)) | xargs -r rm -f
    echo "  Worksheet rotation: deleted $WG_DELETED old backup(s), keeping $RETENTION_COUNT"
else
    echo "  No worksheet files to backup"
fi

echo "[$BACKUP_TYPE] Backup complete at $(date)"
