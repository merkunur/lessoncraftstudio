#!/bin/bash
# rename-samples-server.sh
#
# Server-side script to rename sample image files from old names to
# SEO-friendly names. Handles immutable flags (chattr) on protected files.
#
# MUST be run as root on the production server.
#
# Prerequisites:
#   1. Upload image-rename-map.json to /tmp/image-rename-map.json
#   2. Upload this script to /tmp/rename-samples-server.sh
#
# Usage:
#   bash /tmp/rename-samples-server.sh --dry-run     # Preview changes (default)
#   bash /tmp/rename-samples-server.sh --apply        # Actually rename files
#
# The script:
#   1. Reads the JSON rename map
#   2. For each language folder + app folder combination
#   3. Checks if the old file exists
#   4. Unlocks (chattr -i), renames (mv), re-locks (chattr +i)
#   5. Logs every operation
#   6. Generates a rollback script automatically

set -euo pipefail

MODE="${1:---dry-run}"
SAMPLES_DIR="/var/www/lcs-media/samples"
MAP_FILE="/tmp/image-rename-map.json"
LOG_FILE="/tmp/image-rename-$(date +%Y%m%d-%H%M%S).log"
ROLLBACK_FILE="/tmp/image-rename-rollback-$(date +%Y%m%d-%H%M%S).sh"

# Language folders
LANGUAGES=("english" "german" "french" "spanish" "portuguese" "italian" "dutch" "swedish" "danish" "norwegian" "finnish")

# App folders
APP_FOLDERS=("addition" "subtraction" "code addition" "more less" "math puzzle" "math worksheet" "alphabet train" "prepositions" "word guess" "word scramble" "wordsearch" "cryptogram" "writing" "big small" "pattern train" "pattern worksheet" "draw and color" "drawing lines" "coloring" "chart count" "matching" "grid match" "shadow match" "bingo" "picture sort" "missing pieces" "odd one out" "sudoku" "picture path" "find and count" "find objects" "crossword" "treasure hunt")

# Check prerequisites
if [ ! -f "$MAP_FILE" ]; then
    echo "ERROR: $MAP_FILE not found."
    echo "Upload it first: pscp image-rename-map.json root@server:/tmp/"
    exit 1
fi

if [ ! -d "$SAMPLES_DIR" ]; then
    echo "ERROR: $SAMPLES_DIR not found. Are you on the right server?"
    exit 1
fi

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo "ERROR: jq is required. Install with: apt install jq"
    exit 1
fi

echo "=== Image Rename Script ===" | tee "$LOG_FILE"
echo "Mode: $MODE" | tee -a "$LOG_FILE"
echo "Samples dir: $SAMPLES_DIR" | tee -a "$LOG_FILE"
echo "Map file: $MAP_FILE ($(jq 'length' "$MAP_FILE") entries)" | tee -a "$LOG_FILE"
echo "Log: $LOG_FILE" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# Initialize rollback script
if [ "$MODE" = "--apply" ]; then
    cat > "$ROLLBACK_FILE" << 'HEADER'
#!/bin/bash
# Auto-generated rollback script
# Reverses all renames performed by rename-samples-server.sh
set -euo pipefail
echo "Rolling back image renames..."
HEADER
    chmod +x "$ROLLBACK_FILE"
fi

RENAMED=0
SKIPPED=0
MISSING=0
ERRORS=0

# Process each rename entry
while IFS=$'\t' read -r old_name new_name; do
    # Try each language + app folder combination
    for lang in "${LANGUAGES[@]}"; do
        for app in "${APP_FOLDERS[@]}"; do
            old_path="$SAMPLES_DIR/$lang/$app/$old_name"

            # Check if the old file exists
            if [ ! -f "$old_path" ]; then
                continue
            fi

            new_path="$SAMPLES_DIR/$lang/$app/$new_name"

            # Check if new file already exists (collision)
            if [ -f "$new_path" ] && [ "$old_path" != "$new_path" ]; then
                echo "  SKIP (target exists): $old_path -> $new_path" | tee -a "$LOG_FILE"
                ((SKIPPED++))
                continue
            fi

            if [ "$MODE" = "--apply" ]; then
                # Unlock immutable flag (may not be set, ignore errors)
                chattr -i "$old_path" 2>/dev/null || true

                # Rename
                if mv "$old_path" "$new_path" 2>/dev/null; then
                    # Re-lock
                    chattr +i "$new_path" 2>/dev/null || true
                    chown lcs-media:lcs-media "$new_path" 2>/dev/null || true

                    echo "  RENAMED: $lang/$app/$old_name -> $new_name" | tee -a "$LOG_FILE"
                    ((RENAMED++))

                    # Add rollback entry
                    echo "chattr -i \"$new_path\" 2>/dev/null || true" >> "$ROLLBACK_FILE"
                    echo "mv \"$new_path\" \"$old_path\"" >> "$ROLLBACK_FILE"
                    echo "chattr +i \"$old_path\" 2>/dev/null || true" >> "$ROLLBACK_FILE"
                else
                    echo "  ERROR: Failed to rename $old_path" | tee -a "$LOG_FILE"
                    ((ERRORS++))
                    # Try to re-lock on error
                    chattr +i "$old_path" 2>/dev/null || true
                fi
            else
                echo "  WOULD RENAME: $lang/$app/$old_name -> $new_name" | tee -a "$LOG_FILE"
                ((RENAMED++))
            fi
        done
    done
done < <(jq -r 'to_entries[] | "\(.key)\t\(.value)"' "$MAP_FILE")

echo "" | tee -a "$LOG_FILE"
echo "=== Summary ===" | tee -a "$LOG_FILE"
echo "  ${MODE}: ${RENAMED} renamed, ${SKIPPED} skipped, ${ERRORS} errors" | tee -a "$LOG_FILE"

if [ "$MODE" = "--apply" ]; then
    echo "  Rollback script: $ROLLBACK_FILE" | tee -a "$LOG_FILE"
    echo "" | tee -a "$LOG_FILE"
    echo "IMPORTANT: Remember to also update nginx redirects!" | tee -a "$LOG_FILE"
fi

echo "Log saved to: $LOG_FILE"
