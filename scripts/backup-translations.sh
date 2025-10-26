#!/bin/bash
#
# Translation Files Backup Script
# Daily automated backups of REFERENCE TRANSLATIONS folder
# Created: 2025-10-26
# Purpose: Maintain 30-day rolling backup of translation files
#

echo "════════════════════════════════════════════════════════"
echo "💾 Translation Files Backup Script"
echo "════════════════════════════════════════════════════════"
echo ""

# Configuration
REFERENCE_DIR="REFERENCE TRANSLATIONS"
BACKUP_BASE_DIR="backups/translations"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="$BACKUP_BASE_DIR/$DATE"
KEEP_DAYS=30

# Server details (optional - uncomment to enable server backups)
# SERVER_HOST="root@65.108.5.250"
# SERVER_PASSWORD="JfmiPF_QW4_Nhm"
# SERVER_HOSTKEY="SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU"
# SERVER_BACKUP_PATH="/opt/lessoncraftstudio/backups/translations"

echo "📅 Backup Date: $DATE"
echo "⏰ Timestamp: $TIMESTAMP"
echo ""

# Check if REFERENCE TRANSLATIONS folder exists
if [ ! -d "$REFERENCE_DIR" ]; then
    echo "❌ ERROR: REFERENCE TRANSLATIONS folder not found!"
    echo "   Expected: $REFERENCE_DIR"
    exit 1
fi

# Create backup directory structure
echo "📁 Creating backup directory..."
mkdir -p "$BACKUP_DIR"

if [ $? -ne 0 ]; then
    echo "❌ ERROR: Could not create backup directory"
    exit 1
fi

echo "   ✅ Backup directory created: $BACKUP_DIR"
echo ""

# Count translation files
TOTAL_FILES=$(find "$REFERENCE_DIR" -name "translations-*.js" -type f | wc -l)
echo "📊 Found $TOTAL_FILES translation files to backup"
echo ""

# Create backup with timestamp
echo "💾 Creating backup archive..."
BACKUP_FILE="$BACKUP_DIR/translations-backup-$TIMESTAMP.tar.gz"

tar -czf "$BACKUP_FILE" "$REFERENCE_DIR"

if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "   ✅ Backup created: $BACKUP_FILE"
    echo "   📦 Size: $BACKUP_SIZE"
else
    echo "   ❌ ERROR: Backup creation failed"
    exit 1
fi

echo ""

# Create quick-access symlink to latest backup
echo "🔗 Creating symlink to latest backup..."
LATEST_LINK="$BACKUP_BASE_DIR/latest"
rm -f "$LATEST_LINK"
ln -s "$DATE" "$LATEST_LINK"
echo "   ✅ Symlink created: $LATEST_LINK -> $DATE"
echo ""

# Clean up old backups (older than KEEP_DAYS)
echo "🧹 Cleaning up old backups (keeping last $KEEP_DAYS days)..."

DELETED_COUNT=0
for old_backup in "$BACKUP_BASE_DIR"/*; do
    # Skip if not a directory or if it's the 'latest' symlink
    if [ ! -d "$old_backup" ] || [ "$(basename "$old_backup")" = "latest" ]; then
        continue
    fi

    # Get backup date from directory name
    BACKUP_DATE=$(basename "$old_backup")

    # Calculate age in days
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        BACKUP_EPOCH=$(date -j -f "%Y-%m-%d" "$BACKUP_DATE" +%s 2>/dev/null)
    else
        # Linux
        BACKUP_EPOCH=$(date -d "$BACKUP_DATE" +%s 2>/dev/null)
    fi

    if [ -z "$BACKUP_EPOCH" ]; then
        # Skip if date parsing failed
        continue
    fi

    CURRENT_EPOCH=$(date +%s)
    AGE_DAYS=$(( ($CURRENT_EPOCH - $BACKUP_EPOCH) / 86400 ))

    if [ $AGE_DAYS -gt $KEEP_DAYS ]; then
        echo "   🗑️  Deleting old backup: $BACKUP_DATE (${AGE_DAYS} days old)"
        rm -rf "$old_backup"
        DELETED_COUNT=$((DELETED_COUNT + 1))
    fi
done

if [ $DELETED_COUNT -eq 0 ]; then
    echo "   ✅ No old backups to delete"
else
    echo "   ✅ Deleted $DELETED_COUNT old backup(s)"
fi

echo ""

# Optional: Upload to production server
# Uncomment this section to enable server backups
#
# if [ ! -z "$SERVER_HOST" ]; then
#     echo "☁️  Uploading backup to production server..."
#
#     # Create server backup directory if it doesn't exist
#     "C:\Program Files\PuTTY\plink.exe" -batch -pw "$SERVER_PASSWORD" \
#         -hostkey "$SERVER_HOSTKEY" "$SERVER_HOST" \
#         "mkdir -p $SERVER_BACKUP_PATH/$DATE"
#
#     # Upload backup file
#     "C:\Program Files\PuTTY\pscp.exe" -batch -pw "$SERVER_PASSWORD" \
#         -hostkey "$SERVER_HOSTKEY" "$BACKUP_FILE" \
#         "$SERVER_HOST:$SERVER_BACKUP_PATH/$DATE/"
#
#     if [ $? -eq 0 ]; then
#         echo "   ✅ Backup uploaded to server: $SERVER_BACKUP_PATH/$DATE/"
#     else
#         echo "   ⚠️  WARNING: Server upload failed"
#     fi
#
#     echo ""
# fi

# Summary
echo "════════════════════════════════════════════════════════"
echo "✅ Backup Complete!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📊 Summary:"
echo "   Files backed up: $TOTAL_FILES translation files"
echo "   Backup location: $BACKUP_FILE"
echo "   Backup size: $BACKUP_SIZE"
echo "   Retention: $KEEP_DAYS days"
echo ""
echo "🔍 To restore from this backup:"
echo "   tar -xzf \"$BACKUP_FILE\""
echo ""
echo "🔍 To view all backups:"
echo "   ls -lh \"$BACKUP_BASE_DIR\""
echo ""
echo "════════════════════════════════════════════════════════"
echo ""

exit 0
