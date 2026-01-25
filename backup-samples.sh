#!/bin/bash
#
# LessonCraftStudio Sample Images Backup Script
# ============================================
# Creates timestamped backups of all sample images
# Run this before any major changes to the sample system
#
# Usage: bash /opt/lessoncraftstudio/backup-samples.sh
#

set -e  # Exit on error

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/lessoncraftstudio/backups"
SAMPLES_DIR="/opt/lessoncraftstudio/samples"

echo "=========================================="
echo "LessonCraftStudio Sample Backup"
echo "=========================================="
echo ""

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Count files before backup
JPEG_COUNT=$(find $SAMPLES_DIR -name "*.jpeg" 2>/dev/null | wc -l)
WEBP_COUNT=$(find $SAMPLES_DIR -name "*.webp" 2>/dev/null | wc -l)
PDF_COUNT=$(find $SAMPLES_DIR -name "*.pdf" 2>/dev/null | wc -l)

echo "📊 Sample Statistics:"
echo "   JPEG files: $JPEG_COUNT"
echo "   WebP files: $WEBP_COUNT"
echo "   PDF files:  $PDF_COUNT"
echo ""

if [ "$JPEG_COUNT" -lt 100 ]; then
    echo "ℹ️  Note: Few JPEG files found ($JPEG_COUNT)"
    echo "   (Samples are managed via content manager - zero is valid)"
fi

# Create the backup
BACKUP_FILE="$BACKUP_DIR/samples_$TIMESTAMP.tar.gz"
echo "📦 Creating backup: $BACKUP_FILE"
echo "   This may take several minutes for large sample sets..."
echo ""

tar -czf "$BACKUP_FILE" -C /opt/lessoncraftstudio samples/

# Get backup size
BACKUP_SIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')
echo "✅ Backup created successfully!"
echo "   File: $BACKUP_FILE"
echo "   Size: $BACKUP_SIZE"
echo ""

# Keep only last 3 backups to save disk space
echo "🧹 Cleaning old backups (keeping last 3)..."
BACKUP_COUNT=$(ls -t $BACKUP_DIR/samples_*.tar.gz 2>/dev/null | wc -l)
if [ "$BACKUP_COUNT" -gt 3 ]; then
    ls -t $BACKUP_DIR/samples_*.tar.gz | tail -n +4 | xargs -r rm -v
    echo "   Removed $(($BACKUP_COUNT - 3)) old backup(s)"
else
    echo "   No old backups to remove"
fi

echo ""
echo "📋 Current backups:"
ls -lh $BACKUP_DIR/samples_*.tar.gz 2>/dev/null || echo "   None found"

echo ""
echo "=========================================="
echo "Backup complete!"
echo "=========================================="
echo ""
echo "To restore from this backup:"
echo "  tar -xzf $BACKUP_FILE -C /opt/lessoncraftstudio/"
echo ""
