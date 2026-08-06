#!/bin/bash
# do-server-rename.sh
# Reads verified-rename-map.json and renames files on the production server.
# Handles immutable flags, generates rollback, validates each rename.
#
# Usage:
#   bash /tmp/do-server-rename.sh --dry-run     # Preview (default)
#   bash /tmp/do-server-rename.sh --apply        # Execute renames

set -euo pipefail

MODE="${1:---dry-run}"
SAMPLES="/var/www/lcs-media/samples"
MAP="/tmp/verified-rename-map.json"
LOG="/tmp/rename-$(date +%Y%m%d-%H%M%S).log"
ROLLBACK="/tmp/rename-rollback-$(date +%Y%m%d-%H%M%S).sh"

if [ ! -f "$MAP" ]; then
  echo "ERROR: $MAP not found. Upload verified-rename-map.json first."
  exit 1
fi

echo "=== Server File Rename ===" | tee "$LOG"
echo "Mode: $MODE" | tee -a "$LOG"
echo "Map: $MAP" | tee -a "$LOG"

if [ "$MODE" = "--apply" ]; then
  echo '#!/bin/bash' > "$ROLLBACK"
  echo '# Rollback script — reverses all renames' >> "$ROLLBACK"
  chmod +x "$ROLLBACK"
fi

OK=0
FAIL=0
SKIP=0
MISSING=0
TOTAL=0

# Process each rename entry from the JSON map
# jq outputs tab-separated old\tnew pairs
while IFS=$'\t' read -r old_rel new_rel; do
  TOTAL=$((TOTAL + 1))

  old_path="$SAMPLES/$old_rel"
  new_path="$SAMPLES/$new_rel"
  dir_path=$(dirname "$old_path")

  # If target already exists, skip
  if [ -f "$new_path" ]; then
    SKIP=$((SKIP + 1))
    continue
  fi

  # If source doesn't exist, report missing
  if [ ! -f "$old_path" ]; then
    echo "  MISSING: $old_rel" | tee -a "$LOG"
    MISSING=$((MISSING + 1))
    continue
  fi

  if [ "$MODE" = "--apply" ]; then
    # Unlock immutable flags
    chattr -i "$old_path" 2>/dev/null || true
    chattr -i "$dir_path" 2>/dev/null || true

    if mv "$old_path" "$new_path"; then
      # Re-lock and set ownership
      chattr +i "$new_path" 2>/dev/null || true
      chattr +i "$dir_path" 2>/dev/null || true
      chown lcs-media:lcs-media "$new_path" 2>/dev/null || true
      echo "  OK: $old_rel -> $(basename "$new_rel")" | tee -a "$LOG"
      OK=$((OK + 1))

      # Add rollback entry
      echo "chattr -i \"$new_path\" \"$dir_path\" 2>/dev/null || true; mv \"$new_path\" \"$old_path\"; chattr +i \"$old_path\" \"$dir_path\" 2>/dev/null || true" >> "$ROLLBACK"
    else
      echo "  FAIL: $old_rel" | tee -a "$LOG"
      # Re-lock on failure
      chattr +i "$old_path" 2>/dev/null || true
      chattr +i "$dir_path" 2>/dev/null || true
      FAIL=$((FAIL + 1))
    fi
  else
    echo "  WOULD: $old_rel -> $(basename "$new_rel")" | tee -a "$LOG"
    OK=$((OK + 1))
  fi
done < <(jq -r 'to_entries[] | "\(.key)\t\(.value)"' "$MAP")

echo "" | tee -a "$LOG"
echo "=== Summary ===" | tee -a "$LOG"
echo "  Total entries: $TOTAL" | tee -a "$LOG"
echo "  Renamed:       $OK" | tee -a "$LOG"
echo "  Skipped:       $SKIP (target already exists)" | tee -a "$LOG"
echo "  Missing:       $MISSING (source not found)" | tee -a "$LOG"
echo "  Failed:        $FAIL" | tee -a "$LOG"
echo "  Log:           $LOG" | tee -a "$LOG"
if [ "$MODE" = "--apply" ]; then
  echo "  Rollback:      $ROLLBACK" | tee -a "$LOG"
fi
