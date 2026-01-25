#!/bin/bash
# LessonCraftStudio Isolated Sample Storage Setup Script
#
# This script sets up the bulletproof sample storage system:
# 1. Creates /var/www/lcs-media/ directory structure
# 2. Creates dedicated lcs-media user
# 3. Sets proper permissions
# 4. Migrates existing samples from /opt/lessoncraftstudio/samples/
# 5. Updates nginx configuration
# 6. Installs cron jobs for backups
#
# Run this script ONCE on the server to set up isolated storage.
# After running, deploy the updated code with the new API paths.
#
# Usage: sudo bash setup-isolated-storage.sh

set -e

echo "=========================================="
echo "LessonCraftStudio Isolated Storage Setup"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "ERROR: This script must be run as root"
    exit 1
fi

# Configuration
MEDIA_BASE="/var/www/lcs-media"
SAMPLES_DIR="$MEDIA_BASE/samples"
SCRIPTS_DIR="$MEDIA_BASE/scripts"
BACKUP_DIR="$MEDIA_BASE/backups"
OLD_SAMPLES="/opt/lessoncraftstudio/samples"
MEDIA_USER="lcs-media"

# Languages and apps
LANGUAGES="english german french spanish italian portuguese dutch danish swedish norwegian finnish"

echo "Step 1: Creating directory structure..."
mkdir -p "$SAMPLES_DIR"
mkdir -p "$SCRIPTS_DIR"
mkdir -p "$BACKUP_DIR"/{pre-deploy,hourly,daily,weekly,monthly,emergency}

# Create language folders
for lang in $LANGUAGES; do
    mkdir -p "$SAMPLES_DIR/$lang/homepage"
done
echo "  Created $SAMPLES_DIR with $( echo $LANGUAGES | wc -w) language folders"

echo ""
echo "Step 2: Creating dedicated user..."
if id "$MEDIA_USER" &>/dev/null; then
    echo "  User $MEDIA_USER already exists"
else
    useradd -r -s /usr/sbin/nologin -d "$MEDIA_BASE" "$MEDIA_USER"
    echo "  Created user: $MEDIA_USER"
fi

echo ""
echo "Step 3: Migrating existing samples..."
if [ -d "$OLD_SAMPLES" ] && [ "$(ls -A $OLD_SAMPLES 2>/dev/null)" ]; then
    # Count files in old location
    OLD_COUNT=$(find "$OLD_SAMPLES" -type f \( -name "*.jpeg" -o -name "*.webp" -o -name "*.pdf" \) 2>/dev/null | wc -l)
    echo "  Found $OLD_COUNT files in $OLD_SAMPLES"

    if [ "$OLD_COUNT" -gt 0 ]; then
        echo "  Copying files to new location..."
        cp -a "$OLD_SAMPLES"/* "$SAMPLES_DIR/"

        # Verify copy
        NEW_COUNT=$(find "$SAMPLES_DIR" -type f \( -name "*.jpeg" -o -name "*.webp" -o -name "*.pdf" \) 2>/dev/null | wc -l)
        echo "  Migrated $NEW_COUNT files to $SAMPLES_DIR"

        if [ "$NEW_COUNT" -eq "$OLD_COUNT" ]; then
            echo "  Migration verified: all files copied successfully"
        else
            echo "  WARNING: File count mismatch ($OLD_COUNT -> $NEW_COUNT)"
            echo "  Please verify manually before proceeding"
        fi
    fi
else
    echo "  No existing samples found in $OLD_SAMPLES (OK for new installs)"
fi

echo ""
echo "Step 4: Setting permissions..."
chown -R "$MEDIA_USER:$MEDIA_USER" "$MEDIA_BASE"
find "$SAMPLES_DIR" -type d -exec chmod 755 {} \;
find "$SAMPLES_DIR" -type f -exec chmod 644 {} \;
echo "  Ownership: $MEDIA_USER:$MEDIA_USER"
echo "  Directories: 755, Files: 644"

echo ""
echo "Step 5: Installing protection scripts..."
SCRIPT_SOURCE="/opt/lessoncraftstudio/server-scripts"
if [ -d "$SCRIPT_SOURCE" ]; then
    cp "$SCRIPT_SOURCE"/*.sh "$SCRIPTS_DIR/" 2>/dev/null || true
    chmod +x "$SCRIPTS_DIR"/*.sh 2>/dev/null || true
    echo "  Installed scripts from $SCRIPT_SOURCE"
else
    echo "  WARNING: Script source not found at $SCRIPT_SOURCE"
    echo "  You'll need to manually copy scripts to $SCRIPTS_DIR"
fi
ls -la "$SCRIPTS_DIR"/*.sh 2>/dev/null || echo "  No scripts installed yet"

echo ""
echo "Step 6: Installing cron jobs..."
CRON_SOURCE="/opt/lessoncraftstudio/server-scripts/lcs-media-backups.cron"
if [ -f "$CRON_SOURCE" ]; then
    cp "$CRON_SOURCE" /etc/cron.d/lcs-media-backups
    chmod 644 /etc/cron.d/lcs-media-backups
    echo "  Installed /etc/cron.d/lcs-media-backups"
else
    echo "  WARNING: Cron file not found at $CRON_SOURCE"
fi

echo ""
echo "Step 7: Updating nginx configuration..."
NGINX_SAMPLES_CONF='
# Sample images - served directly from isolated storage
# Added by setup-isolated-storage.sh
location /samples/ {
    alias /var/www/lcs-media/samples/;
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header X-Content-Type-Options nosniff;
    autoindex off;
}
'
echo "  You need to add this to your nginx site config:"
echo "$NGINX_SAMPLES_CONF"
echo ""
echo "  Then run: nginx -t && systemctl reload nginx"

echo ""
echo "Step 8: Creating initial backup..."
if [ "$(find $SAMPLES_DIR -type f | wc -l)" -gt 0 ]; then
    INITIAL_BACKUP="$BACKUP_DIR/pre-deploy/initial_setup_$(date +%Y%m%d_%H%M%S).tar.gz"
    tar -czf "$INITIAL_BACKUP" -C "$MEDIA_BASE" samples/
    echo "  Created initial backup: $INITIAL_BACKUP"
else
    echo "  No files to backup yet"
fi

echo ""
echo "=========================================="
echo "SETUP COMPLETE"
echo "=========================================="
echo ""
echo "Directory structure:"
echo "  $SAMPLES_DIR/ - Sample images (isolated from code)"
echo "  $SCRIPTS_DIR/ - Backup and health scripts"
echo "  $BACKUP_DIR/  - Backup archives"
echo ""
echo "Next steps:"
echo "  1. Update nginx config to serve /samples/ from $SAMPLES_DIR"
echo "  2. Deploy the updated Next.js code with new API paths"
echo "  3. Test sample uploads via the content manager"
echo "  4. Verify backups are running: ls -la $BACKUP_DIR/"
echo ""
echo "The old samples at $OLD_SAMPLES can be removed after verification:"
echo "  rm -rf $OLD_SAMPLES"
echo ""
