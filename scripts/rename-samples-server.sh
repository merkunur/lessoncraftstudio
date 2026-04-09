#!/bin/bash
# rename-samples-server.sh
#
# Server-side script to rename sample image files from old names to
# SEO-friendly names. Handles immutable flags (chattr) on protected files.
#
# Usage:
#   bash /tmp/rename-samples-server.sh --dry-run     # Preview changes (default)
#   bash /tmp/rename-samples-server.sh --apply        # Actually rename files

MODE="${1:---dry-run}"
SAMPLES_DIR="/var/www/lcs-media/samples"
MAP_FILE="/tmp/image-rename-map.json"
LOG_FILE="/tmp/image-rename-$(date +%Y%m%d-%H%M%S).log"
ROLLBACK_FILE="/tmp/image-rename-rollback-$(date +%Y%m%d-%H%M%S).sh"

if [ ! -f "$MAP_FILE" ]; then
    echo "ERROR: $MAP_FILE not found."
    exit 1
fi

echo "=== Image Rename Script ===" | tee "$LOG_FILE"
echo "Mode: $MODE" | tee -a "$LOG_FILE"

# Build associative array from rename map
declare -A RENAME_MAP
while IFS=$'\t' read -r old_name new_name; do
    RENAME_MAP["$old_name"]="$new_name"
done < <(jq -r 'to_entries[] | "\(.key)\t\(.value)"' "$MAP_FILE")

echo "Loaded ${#RENAME_MAP[@]} rename entries" | tee -a "$LOG_FILE"

# Initialize rollback script
if [ "$MODE" = "--apply" ]; then
    echo '#!/bin/bash' > "$ROLLBACK_FILE"
    echo 'echo "Rolling back image renames..."' >> "$ROLLBACK_FILE"
    chmod +x "$ROLLBACK_FILE"
fi

RENAMED=0
SKIPPED=0
NOT_IN_MAP=0
ERRORS=0

# Build file list first, then iterate
find "$SAMPLES_DIR" -type f -name "*.webp" > /tmp/webp-file-list.txt
TOTAL=$(wc -l < /tmp/webp-file-list.txt)
echo "Scanning $TOTAL webp files..." | tee -a "$LOG_FILE"

while IFS= read -r file_path; do
    filename=$(basename "$file_path")
    dir_path=$(dirname "$file_path")

    # Check if this filename is in the rename map
    if [[ ! -v "RENAME_MAP[$filename]" ]]; then
        NOT_IN_MAP=$((NOT_IN_MAP + 1))
        continue
    fi

    new_name="${RENAME_MAP[$filename]}"
    new_path="$dir_path/$new_name"

    # Skip if same name
    if [ "$filename" = "$new_name" ]; then
        continue
    fi

    # Skip if target already exists
    if [ -f "$new_path" ]; then
        echo "  SKIP (target exists): ${file_path#$SAMPLES_DIR/}" | tee -a "$LOG_FILE"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    rel_path="${file_path#$SAMPLES_DIR/}"

    if [ "$MODE" = "--apply" ]; then
        # Unlock file AND parent directory (both may be immutable)
        chattr -i "$file_path" 2>/dev/null || true
        chattr -i "$dir_path" 2>/dev/null || true
        if mv "$file_path" "$new_path" 2>/dev/null; then
            chattr +i "$new_path" 2>/dev/null || true
            chattr +i "$dir_path" 2>/dev/null || true
            chown lcs-media:lcs-media "$new_path" 2>/dev/null || true
            echo "  RENAMED: $rel_path -> $new_name" | tee -a "$LOG_FILE"
            RENAMED=$((RENAMED + 1))
            echo "chattr -i \"$new_path\" \"$dir_path\" 2>/dev/null || true; mv \"$new_path\" \"$file_path\"; chattr +i \"$file_path\" \"$dir_path\" 2>/dev/null || true" >> "$ROLLBACK_FILE"
        else
            echo "  ERROR: $rel_path" | tee -a "$LOG_FILE"
            chattr +i "$file_path" 2>/dev/null || true
            chattr +i "$dir_path" 2>/dev/null || true
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo "  WOULD RENAME: $rel_path -> $new_name" | tee -a "$LOG_FILE"
        RENAMED=$((RENAMED + 1))
    fi
done < /tmp/webp-file-list.txt

rm -f /tmp/webp-file-list.txt

echo "" | tee -a "$LOG_FILE"
echo "=== Summary ===" | tee -a "$LOG_FILE"
echo "  Mode: $MODE" | tee -a "$LOG_FILE"
echo "  Matched & renamed: $RENAMED" | tee -a "$LOG_FILE"
echo "  Skipped (target exists): $SKIPPED" | tee -a "$LOG_FILE"
echo "  Not in rename map: $NOT_IN_MAP" | tee -a "$LOG_FILE"
echo "  Errors: $ERRORS" | tee -a "$LOG_FILE"
echo "  Total scanned: $TOTAL" | tee -a "$LOG_FILE"
echo "  Log: $LOG_FILE" | tee -a "$LOG_FILE"
if [ "$MODE" = "--apply" ]; then
    echo "  Rollback: $ROLLBACK_FILE" | tee -a "$LOG_FILE"
fi
