#!/bin/bash
set -eo pipefail

MAP_FILE="/tmp/image-rename-map.json"

declare -A RENAME_MAP
while IFS=$'\t' read -r old_name new_name; do
    RENAME_MAP["$old_name"]="$new_name"
done < <(jq -r 'to_entries[] | "\(.key)\t\(.value)"' "$MAP_FILE")

echo "Map size: ${#RENAME_MAP[@]}"

# Test specific key
TEST="Addition Fun 1.webp"
if [[ -v "RENAME_MAP[$TEST]" ]]; then
    echo "MATCH: $TEST -> ${RENAME_MAP[$TEST]}"
else
    echo "NO MATCH for: $TEST"
    # Show first 5 keys
    count=0
    for k in "${!RENAME_MAP[@]}"; do
        echo "  key: [$k]"
        ((count++)) || true
        if [ "$count" -ge 5 ]; then break; fi
    done
fi

# Test against an actual file on disk
ACTUAL=$(ls /var/www/lcs-media/samples/english/addition/ | head -1)
echo "First file on disk: [$ACTUAL]"
if [[ -v "RENAME_MAP[$ACTUAL]" ]]; then
    echo "DISK MATCH: $ACTUAL -> ${RENAME_MAP[$ACTUAL]}"
else
    echo "NO DISK MATCH for: $ACTUAL"
fi
