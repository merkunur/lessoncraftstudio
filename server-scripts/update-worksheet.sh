#!/bin/bash
# update-worksheet.sh - Safely update a protected worksheet/translation/admin file
#
# Unlocks immutable flag, copies new file, re-locks.
#
# Location on server: /var/www/lcs-media/scripts/update-worksheet.sh
#                     /opt/lessoncraftstudio/server-scripts/update-worksheet.sh
#
# Usage:
#   update-worksheet.sh <source-file> <relative-target>
#   update-worksheet.sh --admin <source-file> <relative-target>
#   update-worksheet.sh --public <source-file> <relative-target>
#
# Examples:
#   update-worksheet.sh /tmp/addition.html addition.html
#   update-worksheet.sh /tmp/translations-addition-complete.js js/translations-addition-complete.js
#   update-worksheet.sh --admin /tmp/product-sample-manager.html product-sample-manager.html
#   update-worksheet.sh --public /tmp/homepage-content-manager.html homepage-content-manager.html

set -e

# ============================================
# PARSE ARGUMENTS
# ============================================
MODE="worksheet"
BASE_DIR="/var/www/lcs-media/worksheet-generators"

if [ "$1" = "--admin" ]; then
    MODE="admin"
    BASE_DIR="/var/www/lcs-media/admin-panels"
    shift
elif [ "$1" = "--public" ]; then
    MODE="public"
    BASE_DIR="/opt/lessoncraftstudio/frontend/public"
    shift
fi

SOURCE="$1"
TARGET="$2"

if [ -z "$SOURCE" ] || [ -z "$TARGET" ]; then
    echo "Usage: $0 [--admin|--public] <source-file> <relative-target>"
    echo ""
    echo "Modes:"
    echo "  (default)  worksheet generators: /var/www/lcs-media/worksheet-generators/"
    echo "  --admin    admin panels:          /var/www/lcs-media/admin-panels/"
    echo "  --public   public root files:     /opt/lessoncraftstudio/frontend/public/"
    echo ""
    echo "Examples:"
    echo "  $0 /tmp/addition.html addition.html"
    echo "  $0 /tmp/translations-addition.js js/translations-addition.js"
    echo "  $0 --admin /tmp/product-sample-manager.html product-sample-manager.html"
    echo "  $0 --public /tmp/homepage-content-manager.html homepage-content-manager.html"
    exit 1
fi

FULL_TARGET="$BASE_DIR/$TARGET"

# ============================================
# VALIDATE
# ============================================
if [ ! -f "$SOURCE" ]; then
    echo "ERROR: Source file not found: $SOURCE"
    exit 1
fi

# Ensure target directory exists
TARGET_DIR=$(dirname "$FULL_TARGET")
if [ ! -d "$TARGET_DIR" ]; then
    echo "ERROR: Target directory does not exist: $TARGET_DIR"
    exit 1
fi

echo "=== Safe File Update ==="
echo "  Mode:   $MODE"
echo "  Source: $SOURCE"
echo "  Target: $FULL_TARGET"
echo ""

# ============================================
# UNLOCK (remove immutable flag if set)
# ============================================
if [ -f "$FULL_TARGET" ]; then
    echo "Unlocking existing file..."
    chattr -i "$FULL_TARGET" 2>/dev/null || true
fi

# ============================================
# COPY
# ============================================
echo "Copying new file..."
cp "$SOURCE" "$FULL_TARGET"

# ============================================
# SET OWNERSHIP & PERMISSIONS
# ============================================
if [ "$MODE" = "public" ]; then
    # Public root files: keep current ownership
    chmod 644 "$FULL_TARGET"
else
    # Isolated storage: lcs-media ownership
    chown lcs-media:lcs-media "$FULL_TARGET"
    chmod 644 "$FULL_TARGET"
fi

# ============================================
# RE-LOCK (set immutable flag)
# ============================================
echo "Re-locking file..."
chattr +i "$FULL_TARGET"

# ============================================
# VERIFY
# ============================================
echo ""
echo "Verifying..."
ls -la "$FULL_TARGET"
ATTRS=$(lsattr "$FULL_TARGET" 2>/dev/null || echo "(lsattr unavailable)")
echo "Attributes: $ATTRS"

# Clean up source from /tmp
if [[ "$SOURCE" == /tmp/* ]]; then
    rm -f "$SOURCE"
    echo "Cleaned up: $SOURCE"
fi

echo ""
echo "Update complete."
