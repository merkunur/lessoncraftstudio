#!/bin/bash
# setup-design-elements-protection.sh - One-time setup for design-elements protection
#
# Applies:
#   - lcs-media:lcs-media ownership on /var/www/lcs-media/design-elements/
#   - chattr +i immutable flag on every .svg + manifest.json + palettes.json
#   - 755 on directories, 644 on files
#
# Safe to re-run — chattr +i on an already-immutable file is a no-op.
#
# Location on server: /opt/lessoncraftstudio/server-scripts/setup-design-elements-protection.sh

set -e

BASE_DIR="/var/www/lcs-media/design-elements"
SCRIPTS_DIR="/var/www/lcs-media/scripts"

if [ ! -d "$BASE_DIR" ]; then
    echo "ERROR: $BASE_DIR does not exist. Upload design elements first."
    exit 1
fi

echo "=== Design Elements Protection Setup ==="
echo ""

# ============================================
# OWNERSHIP & PERMISSIONS
# ============================================
echo "Setting ownership to lcs-media:lcs-media..."
chown -R lcs-media:lcs-media "$BASE_DIR"

echo "Setting directory perms 755, file perms 644..."
find "$BASE_DIR" -type d -exec chmod 755 {} \;
find "$BASE_DIR" -type f -exec chmod 644 {} \;

# ============================================
# IMMUTABLE FLAGS
# ============================================
SVG_COUNT=$(find "$BASE_DIR" -name "*.svg" -type f | wc -l)
echo ""
echo "Applying chattr +i to $SVG_COUNT SVG files..."

# Apply in batches to avoid "Argument list too long" on big directories
find "$BASE_DIR" -name "*.svg" -type f -print0 | xargs -0 -r chattr +i

# Manifest + palettes
if [ -f "$BASE_DIR/manifest.json" ]; then
    chattr +i "$BASE_DIR/manifest.json"
    echo "Locked manifest.json"
fi
if [ -f "$BASE_DIR/palettes.json" ]; then
    chattr +i "$BASE_DIR/palettes.json"
    echo "Locked palettes.json"
fi

# ============================================
# INSTALL UPDATE HELPERS
# ============================================
echo ""
echo "Installing update/delete helpers..."
mkdir -p "$SCRIPTS_DIR"
cp /opt/lessoncraftstudio/server-scripts/update-design-element.sh "$SCRIPTS_DIR/update-design-element.sh"
cp /opt/lessoncraftstudio/server-scripts/delete-design-element.sh "$SCRIPTS_DIR/delete-design-element.sh"
chmod +x "$SCRIPTS_DIR/update-design-element.sh" "$SCRIPTS_DIR/delete-design-element.sh"

# ============================================
# VERIFY
# ============================================
echo ""
echo "Verification:"
LOCKED_COUNT=$(lsattr "$BASE_DIR"/*.json 2>/dev/null | grep -c '^....i' || echo 0)
SVG_LOCKED=$(find "$BASE_DIR" -name "*.svg" -type f -exec lsattr {} + 2>/dev/null | grep -c '^....i' || echo 0)

echo "  SVG files total:    $SVG_COUNT"
echo "  SVG files locked:   $SVG_LOCKED"
echo "  JSON files locked:  $LOCKED_COUNT"
echo ""

if [ "$SVG_LOCKED" -lt "$SVG_COUNT" ]; then
    echo "WARNING: Not all SVGs are locked."
    exit 1
fi

echo "Setup complete."
