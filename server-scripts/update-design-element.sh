#!/bin/bash
# update-design-element.sh - Safely update a protected design-element file
#
# Unlocks immutable flag, copies new file, re-locks.
# Same pattern as update-worksheet.sh but for /var/www/lcs-media/design-elements/.
#
# Location on server: /var/www/lcs-media/scripts/update-design-element.sh
#                     /opt/lessoncraftstudio/server-scripts/update-design-element.sh
#
# Usage:
#   update-design-element.sh <source-file> <relative-target>
#
# Examples:
#   update-design-element.sh /tmp/scalloped.svg frames/scalloped.svg
#   update-design-element.sh /tmp/manifest.json manifest.json
#   update-design-element.sh /tmp/palettes.json palettes.json

set -e

BASE_DIR="/var/www/lcs-media/design-elements"

SOURCE="$1"
TARGET="$2"

if [ -z "$SOURCE" ] || [ -z "$TARGET" ]; then
    echo "Usage: $0 <source-file> <relative-target>"
    echo ""
    echo "Examples:"
    echo "  $0 /tmp/scalloped.svg frames/scalloped.svg"
    echo "  $0 /tmp/manifest.json manifest.json"
    echo "  $0 /tmp/palettes.json palettes.json"
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

# Ensure target directory exists — create subcategory dirs if needed
TARGET_DIR=$(dirname "$FULL_TARGET")
if [ ! -d "$TARGET_DIR" ]; then
    mkdir -p "$TARGET_DIR"
    chown lcs-media:lcs-media "$TARGET_DIR"
fi

# Reject targets outside BASE_DIR (path traversal guard)
RESOLVED=$(readlink -f "$FULL_TARGET" 2>/dev/null || echo "$FULL_TARGET")
case "$RESOLVED" in
    "$BASE_DIR"/*) ;;
    *)
        echo "ERROR: Target resolves outside $BASE_DIR: $RESOLVED"
        exit 1
        ;;
esac

echo "=== Safe Design-Element Update ==="
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
chown lcs-media:lcs-media "$FULL_TARGET"
chmod 644 "$FULL_TARGET"

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
