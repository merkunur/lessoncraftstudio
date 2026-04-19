#!/bin/bash
# delete-design-element.sh - Safely hard-delete a design-element file
#
# Unlocks immutable flag, deletes the file.
# Requires explicit --confirm flag to run (prevents accidental deletion).
#
# Location on server: /var/www/lcs-media/scripts/delete-design-element.sh
#
# Usage:
#   delete-design-element.sh --confirm <relative-target>
#
# Example:
#   delete-design-element.sh --confirm frames/scalloped.svg

set -e

BASE_DIR="/var/www/lcs-media/design-elements"

if [ "$1" != "--confirm" ]; then
    echo "Usage: $0 --confirm <relative-target>"
    echo "Refusing to run without --confirm."
    exit 1
fi
shift

TARGET="$1"

if [ -z "$TARGET" ]; then
    echo "ERROR: No target provided."
    exit 1
fi

FULL_TARGET="$BASE_DIR/$TARGET"

# Path traversal guard
RESOLVED=$(readlink -f "$FULL_TARGET" 2>/dev/null || echo "$FULL_TARGET")
case "$RESOLVED" in
    "$BASE_DIR"/*) ;;
    *)
        echo "ERROR: Target resolves outside $BASE_DIR: $RESOLVED"
        exit 1
        ;;
esac

# Refuse to delete the critical index files via this helper
case "$TARGET" in
    manifest.json|palettes.json)
        echo "ERROR: Refusing to delete $TARGET via this helper (regenerate instead)."
        exit 1
        ;;
esac

if [ ! -f "$FULL_TARGET" ]; then
    echo "ERROR: File does not exist: $FULL_TARGET"
    exit 1
fi

echo "Deleting $FULL_TARGET"
chattr -i "$FULL_TARGET" 2>/dev/null || true
rm -f "$FULL_TARGET"

echo "Deleted."
