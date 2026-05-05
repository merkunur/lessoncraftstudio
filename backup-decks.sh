#!/bin/bash
#
# LessonCraftStudio Deck Asset-Tree Backup Script
# ================================================
# Creates timestamped backups of the published deck asset-tree at
# /var/www/lcs-media/decks/. Closes the URGENT backup-gap finding from
# Scaling Arc 3 audit-report (commit 9850df93 / docs/scaling-arc-3-asset-tree-audit-2026-05-05.md).
#
# Run weekly via cron (Sun 1 AM, 1 hour before backup-samples.sh) OR manually
# before major catalog changes.
#
# Recovery: tar -xzf <backup-file> -C /var/www/lcs-media/
# (extracts to /var/www/lcs-media/decks/ — the canonical asset-tree path
# per CLAUDE.md §A.1 isolated storage convention)
#
# Usage: bash /opt/lessoncraftstudio/backup-decks.sh
#
# Off-host backup deferred per Scaling Arc 3 Q3 trigger (~10 GB asset-bytes
# / ~6-7K decks). At that scale this same-host weekly tarball + retain-3
# becomes a rotation-only fallback to the off-host strategy.
#

set -e  # Exit on error

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/lessoncraftstudio/backups"
DECKS_DIR="/var/www/lcs-media/decks"

echo "=========================================="
echo "LessonCraftStudio Deck Asset-Tree Backup"
echo "=========================================="
echo ""

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Count published symlinks per locale before backup (sanity signal — informational only)
TOTAL_SYMLINKS=$(find $DECKS_DIR -maxdepth 2 -type l 2>/dev/null | wc -l)
TOTAL_FILES=$(find $DECKS_DIR -type f 2>/dev/null | wc -l)
TOTAL_BYTES=$(du -sb $DECKS_DIR 2>/dev/null | cut -f1)
TOTAL_HUMAN=$(du -sh $DECKS_DIR 2>/dev/null | cut -f1)

echo "📊 Asset-Tree Statistics:"
echo "   Top-level symlinks (published decks): $TOTAL_SYMLINKS"
echo "   Total files (incl. versioned dirs + .archived/): $TOTAL_FILES"
echo "   Total size: $TOTAL_HUMAN ($TOTAL_BYTES bytes)"
echo ""

if [ "$TOTAL_SYMLINKS" -lt 1 ]; then
    echo "⚠️  WARNING: Zero published-deck symlinks found at $DECKS_DIR"
    echo "   This is unexpected at any catalog state past empty-substrate."
    echo "   Aborting backup to avoid creating an empty/misleading tarball."
    exit 1
fi

# Create the backup
BACKUP_FILE="$BACKUP_DIR/decks_$TIMESTAMP.tar.gz"
echo "📦 Creating backup: $BACKUP_FILE"
echo "   Source: $DECKS_DIR (includes all locales + .archived/)"
echo "   This may take several minutes; tarball compresses ~50% at current scale..."
echo ""

# Tar with --dereference=NO so symlinks are preserved as symlinks (not as
# duplicated content following each link target). Extract round-trips cleanly:
# the <slug> symlinks land alongside the <slug>-vN/ directories they point at,
# preserving the §15.7 atomic-symlink-swap convention.
tar -czf "$BACKUP_FILE" -C /var/www/lcs-media decks/

# Get backup size
BACKUP_SIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')
BACKUP_BYTES=$(ls -l "$BACKUP_FILE" | awk '{print $5}')
echo "✅ Backup created successfully!"
echo "   File: $BACKUP_FILE"
echo "   Size: $BACKUP_SIZE ($BACKUP_BYTES bytes)"
echo ""

# Keep only last 3 backups to save disk space (matches backup-samples.sh
# retention pattern per audit-report §11.1 Option A spec)
echo "🧹 Cleaning old backups (keeping last 3)..."
BACKUP_COUNT=$(ls -t $BACKUP_DIR/decks_*.tar.gz 2>/dev/null | wc -l)
if [ "$BACKUP_COUNT" -gt 3 ]; then
    ls -t $BACKUP_DIR/decks_*.tar.gz | tail -n +4 | xargs -r rm -v
    echo "   Removed $(($BACKUP_COUNT - 3)) old backup(s)"
else
    echo "   No old backups to remove"
fi

echo ""
echo "📋 Current decks/ backups:"
ls -lh $BACKUP_DIR/decks_*.tar.gz 2>/dev/null || echo "   None found"

echo ""
echo "=========================================="
echo "Backup complete!"
echo "=========================================="
echo ""
echo "To restore from this backup:"
echo "  tar -xzf $BACKUP_FILE -C /var/www/lcs-media/"
echo "  (extracts to /var/www/lcs-media/decks/ — verify symlinks resolve post-restore)"
echo ""
