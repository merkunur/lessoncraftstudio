#!/bin/bash
# emergency-restore-worksheets.sh - Restore worksheet generators, translations,
# and admin panels from backup
#
# Location on server: /var/www/lcs-media/scripts/emergency-restore-worksheets.sh
#                     /opt/lessoncraftstudio/server-scripts/emergency-restore-worksheets.sh
#
# Usage: emergency-restore-worksheets.sh [backup-file]

set -e

WG_DIR="/var/www/lcs-media/worksheet-generators"
ADMIN_DIR="/var/www/lcs-media/admin-panels"
BACKUP_BASE="/var/www/lcs-media/backups"
SPECIFIC_BACKUP="$1"

echo "=========================================="
echo "EMERGENCY WORKSHEET RESTORE"
echo "=========================================="
echo ""

# ============================================
# FIND BACKUP
# ============================================
if [ -n "$SPECIFIC_BACKUP" ]; then
    if [ -f "$SPECIFIC_BACKUP" ]; then
        LATEST="$SPECIFIC_BACKUP"
        echo "Using specified backup: $LATEST"
    else
        echo "ERROR: Specified backup file not found: $SPECIFIC_BACKUP"
        exit 1
    fi
else
    # Find most recent worksheets backup across all directories
    LATEST=$(find "$BACKUP_BASE" -name "worksheets_*.tar.gz" -type f -printf '%T@ %p\n' 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2)

    if [ -z "$LATEST" ]; then
        echo "ERROR: No worksheet backup files found in $BACKUP_BASE"
        echo ""
        echo "Available backups:"
        find "$BACKUP_BASE" -name "*.tar.gz" -type f -ls 2>/dev/null || echo "  (none)"
        exit 1
    fi

    echo "Found most recent backup: $LATEST"
fi

# Show backup info
echo ""
echo "Backup details:"
ls -lh "$LATEST"
echo ""

# ============================================
# CURRENT STATE
# ============================================
BEFORE_HTML=$(find "$WG_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
BEFORE_JS=$(find "$WG_DIR/js" -name "*.js" -type f 2>/dev/null | wc -l)
BEFORE_ADMIN=$(find "$ADMIN_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)

echo "Current state:"
echo "  Worksheet HTML: $BEFORE_HTML"
echo "  Translation JS: $BEFORE_JS"
echo "  Admin panels:   $BEFORE_ADMIN"
echo ""

# ============================================
# CONFIRM
# ============================================
read -p "Proceed with restore? This will REPLACE all files [y/N]: " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Restore cancelled."
    exit 0
fi

# ============================================
# PRE-RESTORE BACKUP
# ============================================
echo ""
echo "Creating pre-restore backup of current state..."
EMERGENCY_BACKUP="$BACKUP_BASE/emergency/pre-restore-worksheets_$(date +%Y%m%d_%H%M%S).tar.gz"
mkdir -p "$(dirname "$EMERGENCY_BACKUP")"

tar -czf "$EMERGENCY_BACKUP" \
    -C /var/www/lcs-media \
    worksheet-generators/ \
    admin-panels/ \
    2>/dev/null || true

echo "Pre-restore backup: $EMERGENCY_BACKUP"

# ============================================
# UNLOCK IMMUTABLE FLAGS
# ============================================
echo ""
echo "Unlocking immutable flags..."
find "$WG_DIR" -type f -exec chattr -i {} \; 2>/dev/null || true
find "$ADMIN_DIR" -type f -exec chattr -i {} \; 2>/dev/null || true

# ============================================
# RESTORE FROM BACKUP
# ============================================
echo "Restoring from backup..."
tar -xzf "$LATEST" -C /var/www/lcs-media/

# ============================================
# RE-LOCK IMMUTABLE FLAGS
# ============================================
echo "Re-locking immutable flags..."
find "$WG_DIR" -type f -exec chattr +i {} \;
find "$ADMIN_DIR" -type f -exec chattr +i {} \;

# ============================================
# SET OWNERSHIP
# ============================================
chown -R lcs-media:lcs-media "$WG_DIR"
chown -R lcs-media:lcs-media "$ADMIN_DIR"

# ============================================
# VERIFY
# ============================================
AFTER_HTML=$(find "$WG_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
AFTER_JS=$(find "$WG_DIR/js" -name "*.js" -type f 2>/dev/null | wc -l)
AFTER_ADMIN=$(find "$ADMIN_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)

echo ""
echo "=========================================="
echo "RESTORE COMPLETE"
echo "=========================================="
echo ""
echo "                Before  After"
echo "  Worksheet HTML: $BEFORE_HTML -> $AFTER_HTML"
echo "  Translation JS: $BEFORE_JS -> $AFTER_JS"
echo "  Admin panels:   $BEFORE_ADMIN -> $AFTER_ADMIN"
echo ""
echo "  Restored from: $LATEST"
echo ""

# Sanity check
if [ "$AFTER_HTML" -lt 30 ]; then
    echo "WARNING: Restored HTML count ($AFTER_HTML) is below 30!"
    echo "Check backup contents manually."
fi

echo "Next: restart PM2 to pick up changes"
echo "  pm2 restart lessoncraftstudio"
