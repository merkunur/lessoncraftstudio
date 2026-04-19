#!/bin/bash
# Pre-deployment backup script for LessonCraftStudio
# Backs up samples, worksheet generators, translations, and admin panels
# before any deployment to create a safety backup
#
# Location on server: /var/www/lcs-media/scripts/pre-deploy-backup.sh

set -e

SAMPLES_DIR="/var/www/lcs-media/samples"
WG_DIR="/var/www/lcs-media/worksheet-generators"
ADMIN_DIR="/var/www/lcs-media/admin-panels"
DE_DIR="/var/www/lcs-media/design-elements"
PUBLIC_DIR="/opt/lessoncraftstudio/frontend/public"
BACKUP_DIR="/var/www/lcs-media/backups/pre-deploy"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "Pre-deployment backup starting..."

# ============================================
# SAMPLES BACKUP
# ============================================
JPEG_COUNT=$(find "$SAMPLES_DIR" -name "*.jpeg" 2>/dev/null | wc -l)
WEBP_COUNT=$(find "$SAMPLES_DIR" -name "*.webp" 2>/dev/null | wc -l)
TOTAL_COUNT=$((JPEG_COUNT + WEBP_COUNT))

echo "  Samples: $TOTAL_COUNT (JPEG: $JPEG_COUNT, WebP: $WEBP_COUNT)"

if [ "$TOTAL_COUNT" -gt 0 ]; then
    SAMPLE_BACKUP="$BACKUP_DIR/samples_$TIMESTAMP.tar.gz"
    tar -czf "$SAMPLE_BACKUP" -C /var/www/lcs-media samples/

    if [ -f "$SAMPLE_BACKUP" ] && [ -s "$SAMPLE_BACKUP" ]; then
        BACKUP_SIZE=$(du -h "$SAMPLE_BACKUP" | cut -f1)
        echo "  Sample backup: $SAMPLE_BACKUP ($BACKUP_SIZE)"
    else
        echo "  ERROR: Sample backup failed!"
        exit 1
    fi

    # Keep only last 5 sample pre-deploy backups
    ls -t "$BACKUP_DIR"/samples_*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm -f
else
    echo "  No sample files to backup"
fi

# ============================================
# WORKSHEETS + ADMIN BACKUP
# ============================================
WG_HTML=$(find "$WG_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
WG_JS=$(find "$WG_DIR/js" -name "*.js" -type f 2>/dev/null | wc -l)
ADMIN_HTML=$(find "$ADMIN_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)

echo "  Worksheets: $WG_HTML HTML, $WG_JS JS"
echo "  Admin panels: $ADMIN_HTML"

WG_TOTAL=$((WG_HTML + WG_JS + ADMIN_HTML))
if [ "$WG_TOTAL" -gt 0 ]; then
    WG_BACKUP="$BACKUP_DIR/worksheets_$TIMESTAMP.tar.gz"

    tar -czf "$WG_BACKUP" \
        -C /var/www/lcs-media \
        worksheet-generators/ \
        admin-panels/

    if [ -f "$WG_BACKUP" ] && [ -s "$WG_BACKUP" ]; then
        WG_SIZE=$(du -h "$WG_BACKUP" | cut -f1)
        echo "  Worksheet backup: $WG_BACKUP ($WG_SIZE)"
    else
        echo "  ERROR: Worksheet backup failed!"
        exit 1
    fi

    # Keep only last 5 worksheet pre-deploy backups
    ls -t "$BACKUP_DIR"/worksheets_*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm -f
else
    echo "  No worksheet files to backup"
fi

# ============================================
# DESIGN ELEMENTS BACKUP
# ============================================
DE_SVG=$(find "$DE_DIR" -name "*.svg" -type f 2>/dev/null | wc -l)
echo "  Design elements: $DE_SVG SVGs"

if [ "$DE_SVG" -gt 0 ]; then
    DE_BACKUP="$BACKUP_DIR/design-elements_$TIMESTAMP.tar.gz"
    tar -czf "$DE_BACKUP" -C /var/www/lcs-media design-elements/

    if [ -f "$DE_BACKUP" ] && [ -s "$DE_BACKUP" ]; then
        DE_SIZE=$(du -h "$DE_BACKUP" | cut -f1)
        echo "  Design-elements backup: $DE_BACKUP ($DE_SIZE)"
    else
        echo "  ERROR: Design-elements backup failed!"
        exit 1
    fi

    # Keep only last 5 design-elements pre-deploy backups
    ls -t "$BACKUP_DIR"/design-elements_*.tar.gz 2>/dev/null | tail -n +6 | xargs -r rm -f
else
    echo "  No design-element files to backup"
fi

echo ""
echo "Pre-deployment backup complete."
echo "COUNTS:$JPEG_COUNT:$WEBP_COUNT:$WG_HTML:$WG_JS:$ADMIN_HTML:$DE_SVG"
