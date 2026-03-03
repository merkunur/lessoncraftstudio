#!/bin/bash
# setup-worksheet-isolation.sh - Migrate worksheet generators, translations,
# and admin panels to isolated storage at /var/www/lcs-media/
#
# Run this ONCE on the server. Follows the same pattern as protect-image-library.sh.
#
# Location on server: /opt/lessoncraftstudio/server-scripts/setup-worksheet-isolation.sh

set -e

# ============================================
# PATHS
# ============================================
CODE_BASE="/opt/lessoncraftstudio/frontend/public"
WG_SOURCE="$CODE_BASE/worksheet-generators"
ADMIN_SOURCE="$CODE_BASE/admin"
WG_DEST="/var/www/lcs-media/worksheet-generators"
ADMIN_DEST="/var/www/lcs-media/admin-panels"
BACKUP_DIR="/var/www/lcs-media/backups/pre-deploy"

# Individual content manager files in public/ root
INDIVIDUAL_FILES=(
    "homepage-content-manager.html"
    "user-control.html"
)

echo "=========================================="
echo "Worksheet & Content Manager Isolation Setup"
echo "=========================================="
echo ""

# ============================================
# PRE-FLIGHT CHECKS
# ============================================

# Must run as root
if [ "$(id -u)" -ne 0 ]; then
    echo "ERROR: This script must be run as root"
    exit 1
fi

# Check if already migrated (symlink exists)
if [ -L "$WG_SOURCE" ]; then
    echo "Already migrated - symlink exists at: $WG_SOURCE"
    echo "Points to: $(readlink -f "$WG_SOURCE")"
    echo ""

    DST_HTML=$(find "$WG_DEST" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
    DST_JS=$(find "$WG_DEST/js" -name "*.js" -type f 2>/dev/null | wc -l)
    echo "Worksheet HTML files: $DST_HTML"
    echo "Translation JS files: $DST_JS"

    if [ "$DST_HTML" -ge 30 ] && [ "$DST_JS" -ge 30 ]; then
        echo "Worksheet generators are protected."
    else
        echo "WARNING: Destination has fewer files than expected!"
    fi

    if [ -L "$ADMIN_SOURCE" ]; then
        ADM_COUNT=$(find "$ADMIN_DEST" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
        echo "Admin panel HTML files: $ADM_COUNT"
        echo "Admin panels are protected."
    fi

    exit 0
fi

# Check source directories exist
if [ ! -d "$WG_SOURCE" ]; then
    echo "ERROR: Worksheet generators source not found: $WG_SOURCE"
    exit 1
fi

# ============================================
# COUNT SOURCE FILES
# ============================================
SRC_HTML=$(find "$WG_SOURCE" -maxdepth 1 -name "*.html" -type f | wc -l)
SRC_JS=$(find "$WG_SOURCE/js" -name "*.js" -type f 2>/dev/null | wc -l)
echo "Source worksheet HTML files: $SRC_HTML"
echo "Source translation JS files: $SRC_JS"

if [ "$SRC_HTML" -lt 30 ]; then
    echo ""
    echo "WARNING: Source has fewer than 30 HTML files (found $SRC_HTML)."
    echo "Expected 33+ worksheet generator apps."
    read -p "Continue anyway? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "Aborted."
        exit 1
    fi
fi

# Count admin files
SRC_ADMIN=0
if [ -d "$ADMIN_SOURCE" ]; then
    SRC_ADMIN=$(find "$ADMIN_SOURCE" -maxdepth 1 -name "*.html" -type f | wc -l)
fi
echo "Source admin HTML files: $SRC_ADMIN"

# Count individual files
INDIV_COUNT=0
for f in "${INDIVIDUAL_FILES[@]}"; do
    if [ -f "$CODE_BASE/$f" ]; then
        INDIV_COUNT=$((INDIV_COUNT + 1))
    fi
done
echo "Individual content manager files: $INDIV_COUNT"
echo ""

# ============================================
# ENSURE lcs-media USER EXISTS
# ============================================
if ! id "lcs-media" &>/dev/null; then
    echo "Creating lcs-media user..."
    useradd -r -s /bin/false lcs-media
fi

# ============================================
# MIGRATE WORKSHEET GENERATORS
# ============================================
echo "--- Migrating worksheet generators ---"
echo "Creating destination: $WG_DEST"
mkdir -p "$WG_DEST"

echo "Copying worksheet generators..."
cp -rp "$WG_SOURCE"/* "$WG_DEST"/

# Verify copy
DST_HTML=$(find "$WG_DEST" -maxdepth 1 -name "*.html" -type f | wc -l)
DST_JS=$(find "$WG_DEST/js" -name "*.js" -type f 2>/dev/null | wc -l)
echo "Copied: $DST_HTML HTML, $DST_JS JS"

if [ "$DST_HTML" -lt "$SRC_HTML" ]; then
    echo "ERROR: HTML copy incomplete! Aborting."
    echo "Source directory NOT removed - manual intervention required."
    exit 1
fi

# Remove original directory, create symlink
echo "Removing original and creating symlink..."
rm -rf "$WG_SOURCE"
ln -s "$WG_DEST" "$WG_SOURCE"

if [ ! -L "$WG_SOURCE" ]; then
    echo "ERROR: Failed to create worksheet-generators symlink!"
    exit 1
fi
echo "Symlink: $WG_SOURCE -> $WG_DEST"
echo ""

# ============================================
# MIGRATE ADMIN PANELS
# ============================================
if [ "$SRC_ADMIN" -gt 0 ]; then
    echo "--- Migrating admin panels ---"
    echo "Creating destination: $ADMIN_DEST"
    mkdir -p "$ADMIN_DEST"

    echo "Copying admin panels..."
    cp -rp "$ADMIN_SOURCE"/* "$ADMIN_DEST"/

    DST_ADMIN=$(find "$ADMIN_DEST" -maxdepth 1 -name "*.html" -type f | wc -l)
    echo "Copied: $DST_ADMIN admin HTML files"

    if [ "$DST_ADMIN" -lt "$SRC_ADMIN" ]; then
        echo "ERROR: Admin panel copy incomplete! Aborting."
        exit 1
    fi

    rm -rf "$ADMIN_SOURCE"
    ln -s "$ADMIN_DEST" "$ADMIN_SOURCE"

    if [ ! -L "$ADMIN_SOURCE" ]; then
        echo "ERROR: Failed to create admin symlink!"
        exit 1
    fi
    echo "Symlink: $ADMIN_SOURCE -> $ADMIN_DEST"
else
    echo "--- No admin panel directory found, skipping ---"
    mkdir -p "$ADMIN_DEST"
fi
echo ""

# ============================================
# PROTECT INDIVIDUAL CONTENT MANAGER FILES
# ============================================
echo "--- Protecting individual content manager files ---"
for f in "${INDIVIDUAL_FILES[@]}"; do
    if [ -f "$CODE_BASE/$f" ]; then
        echo "  Setting immutable flag on: $CODE_BASE/$f"
        chattr +i "$CODE_BASE/$f" 2>/dev/null || echo "  (chattr not available or already set)"
    else
        echo "  Not found (skipping): $CODE_BASE/$f"
    fi
done
echo ""

# ============================================
# SET OWNERSHIP & PERMISSIONS
# ============================================
echo "Setting ownership to lcs-media..."
chown -R lcs-media:lcs-media "$WG_DEST"
chown -R lcs-media:lcs-media "$ADMIN_DEST"
chmod -R 755 "$WG_DEST"
chmod -R 755 "$ADMIN_DEST"

# ============================================
# SET IMMUTABLE FLAGS
# ============================================
echo "Setting immutable flags on all files..."
find "$WG_DEST" -type f -exec chattr +i {} \;
find "$ADMIN_DEST" -type f -exec chattr +i {} \;
echo "Immutable flags set."

# ============================================
# CREATE INITIAL BACKUP
# ============================================
echo ""
echo "Creating initial backup..."
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/worksheets_${TIMESTAMP}.tar.gz"

tar -czf "$BACKUP_FILE" \
    -C /var/www/lcs-media \
    worksheet-generators/ \
    admin-panels/

if [ -f "$BACKUP_FILE" ] && [ -s "$BACKUP_FILE" ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "Initial backup: $BACKUP_FILE ($BACKUP_SIZE)"
else
    echo "WARNING: Backup may have failed"
fi

# ============================================
# SUMMARY
# ============================================
echo ""
echo "=========================================="
echo "MIGRATION COMPLETE"
echo "=========================================="
echo ""
echo "Worksheet generators:"
echo "  Location:  $WG_DEST"
echo "  Symlink:   $WG_SOURCE -> $WG_DEST"
echo "  HTML files: $DST_HTML"
echo "  JS files:   $DST_JS"
echo ""
echo "Admin panels:"
echo "  Location:  $ADMIN_DEST"
echo "  Symlink:   $ADMIN_SOURCE -> $ADMIN_DEST"
DST_ADMIN_FINAL=$(find "$ADMIN_DEST" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
echo "  HTML files: $DST_ADMIN_FINAL"
echo ""
echo "Individual files (immutable in place):"
for f in "${INDIVIDUAL_FILES[@]}"; do
    if [ -f "$CODE_BASE/$f" ]; then
        echo "  $CODE_BASE/$f (protected)"
    fi
done
echo ""
echo "7-Layer Protection Active:"
echo "  1. Physical isolation at /var/www/lcs-media/"
echo "  2. Owned by lcs-media user"
echo "  3. Immutable flags on all files"
echo "  4. Initial backup created"
echo "  5. Deploy guards (in deploy.sh)"
echo "  6. Symlinks transparent to Next.js"
echo "  7. CLAUDE.md rules"
echo ""
echo "Next steps:"
echo "  1. Deploy updated code: bash /opt/lessoncraftstudio/deploy.sh"
echo "  2. Verify apps load: curl -sI https://www.lessoncraftstudio.com/worksheet-generators/addition.html"
echo "  3. Copy new scripts to /var/www/lcs-media/scripts/"
