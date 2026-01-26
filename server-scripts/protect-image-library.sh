#!/bin/bash
# protect-image-library.sh - Moves and protects image library
# Run this ONCE to migrate the image library to isolated storage

set -e

SOURCE="/opt/lessoncraftstudio/image library"
DEST="/var/www/lcs-media/image-library"

echo "=== Image Library Protection Script ==="
echo ""

# Check if already migrated (symlink exists)
if [ -L "$SOURCE" ]; then
    echo "Already migrated - symlink exists at: $SOURCE"
    echo "Points to: $(readlink -f "$SOURCE")"

    # Verify destination has files
    DST_COUNT=$(find "$DEST" -type f -name "*.png" 2>/dev/null | wc -l)
    echo "Files in destination: $DST_COUNT"

    if [ "$DST_COUNT" -ge 3000 ]; then
        echo "Image library is protected with $DST_COUNT files"
        exit 0
    else
        echo "WARNING: Destination has fewer files than expected!"
        exit 1
    fi
fi

# Check if source directory exists
if [ ! -d "$SOURCE" ]; then
    echo "ERROR: Source directory not found: $SOURCE"
    echo "Cannot proceed with migration."
    exit 1
fi

# Count source files
SRC_COUNT=$(find "$SOURCE" -type f -name "*.png" | wc -l)
echo "Source PNG files: $SRC_COUNT"

if [ "$SRC_COUNT" -lt 3000 ]; then
    echo "WARNING: Source has fewer than 3000 PNG files. Expected ~3125."
    read -p "Continue anyway? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "Aborted."
        exit 1
    fi
fi

# Create destination directory
echo ""
echo "Creating destination: $DEST"
mkdir -p "$DEST"

# Check for lcs-media user
if ! id "lcs-media" &>/dev/null; then
    echo "Creating lcs-media user..."
    useradd -r -s /bin/false lcs-media
fi

# Copy files (preserving structure and permissions)
echo ""
echo "Copying ~2.6GB of source images..."
echo "This may take a few minutes..."
cp -rp "$SOURCE"/* "$DEST"/

# Verify copy completed
DST_COUNT=$(find "$DEST" -type f -name "*.png" | wc -l)
echo ""
echo "Source: $SRC_COUNT PNG files"
echo "Dest:   $DST_COUNT PNG files"

if [ "$DST_COUNT" -lt "$SRC_COUNT" ]; then
    echo "ERROR: Copy incomplete! Aborting."
    echo "Source directory NOT removed - manual intervention required."
    exit 1
fi

# Remove original and create symlink
echo ""
echo "Removing original and creating symlink..."
rm -rf "$SOURCE"
ln -s "$DEST" "$SOURCE"

# Verify symlink
if [ ! -L "$SOURCE" ]; then
    echo "ERROR: Failed to create symlink!"
    exit 1
fi

echo "Symlink created: $SOURCE -> $DEST"

# Set ownership
echo ""
echo "Setting ownership to lcs-media user..."
chown -R lcs-media:lcs-media "$DEST"

# Set permissions (readable by all, writable by owner only)
chmod -R 755 "$DEST"

# Set immutable flags on all files
echo ""
echo "Setting immutable flags on all files..."
echo "This prevents deletion even by root..."
find "$DEST" -type f -exec chattr +i {} \;

# Verify immutable flags
IMMUTABLE_COUNT=$(lsattr -R "$DEST" 2>/dev/null | grep -c '\-i\-' || echo "0")
echo "Files with immutable flag: $IMMUTABLE_COUNT"

echo ""
echo "=== Protection Complete ==="
echo ""
echo "Image library is now protected with 7 layers:"
echo "  1. Isolated storage at: $DEST"
echo "  2. Symlink at: $SOURCE -> $DEST"
echo "  3. Owned by lcs-media user"
echo "  4. Immutable flags on all files"
echo "  5. Deploy guards (add to deploy.sh)"
echo "  6. Git ignored (already in .gitignore)"
echo "  7. CLAUDE.md rules (update required)"
echo ""
echo "Total PNG files protected: $DST_COUNT"
