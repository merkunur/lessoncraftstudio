#!/bin/bash
# Emergency restore script for LessonCraftStudio samples
# Restores from the most recent backup
#
# Location on server: /var/www/lcs-media/scripts/emergency-restore.sh
# Usage: emergency-restore.sh [backup-file]

set -e

SAMPLES_DIR="/var/www/lcs-media/samples"
BACKUP_BASE="/var/www/lcs-media/backups"
SPECIFIC_BACKUP="$1"

echo "=========================================="
echo "EMERGENCY SAMPLE RESTORE"
echo "=========================================="
echo ""

# If specific backup provided, use it
if [ -n "$SPECIFIC_BACKUP" ]; then
    if [ -f "$SPECIFIC_BACKUP" ]; then
        LATEST="$SPECIFIC_BACKUP"
        echo "Using specified backup: $LATEST"
    else
        echo "ERROR: Specified backup file not found: $SPECIFIC_BACKUP"
        exit 1
    fi
else
    # Find the most recent backup across all backup directories
    LATEST=$(find "$BACKUP_BASE" -name "samples_*.tar.gz" -type f -printf '%T@ %p\n' 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2)

    if [ -z "$LATEST" ]; then
        echo "ERROR: No backup files found in $BACKUP_BASE"
        echo ""
        echo "Available backup directories:"
        ls -la "$BACKUP_BASE" 2>/dev/null || echo "  (none)"
        exit 1
    fi

    echo "Found most recent backup: $LATEST"
fi

# Show backup info
echo ""
echo "Backup details:"
ls -lh "$LATEST"
echo ""

# Count files before restore
BEFORE_COUNT=$(find "$SAMPLES_DIR" -type f \( -name "*.jpeg" -o -name "*.webp" \) 2>/dev/null | wc -l)
echo "Current file count: $BEFORE_COUNT"

# Confirm restore
echo ""
read -p "Proceed with restore? This will REPLACE all files in $SAMPLES_DIR [y/N]: " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Restore cancelled"
    exit 0
fi

# Create a quick backup of current state (just in case)
EMERGENCY_BACKUP="$BACKUP_BASE/emergency/pre-restore_$(date +%Y%m%d_%H%M%S).tar.gz"
mkdir -p "$(dirname "$EMERGENCY_BACKUP")"
echo ""
echo "Creating pre-restore backup..."
tar -czf "$EMERGENCY_BACKUP" -C /var/www/lcs-media samples/ 2>/dev/null || true
echo "Pre-restore backup: $EMERGENCY_BACKUP"

# Perform restore
echo ""
echo "Restoring from backup..."
tar -xzf "$LATEST" -C /var/www/lcs-media/

# Count files after restore
AFTER_COUNT=$(find "$SAMPLES_DIR" -type f \( -name "*.jpeg" -o -name "*.webp" \) 2>/dev/null | wc -l)

echo ""
echo "=========================================="
echo "RESTORE COMPLETE"
echo "=========================================="
echo "  Files before: $BEFORE_COUNT"
echo "  Files after:  $AFTER_COUNT"
echo "  Restored from: $LATEST"
echo ""

# Verify nginx can access files
echo "Testing nginx access..."
if curl -s -o /dev/null -w "%{http_code}" "http://localhost/samples/" 2>/dev/null | grep -q "200\|301\|403"; then
    echo "  Nginx can access /samples/ directory"
else
    echo "  WARNING: Nginx access test inconclusive"
fi

echo ""
echo "Restore complete. Verify site is working correctly."
