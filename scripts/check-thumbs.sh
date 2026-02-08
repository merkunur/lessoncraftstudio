#!/bin/bash
# Check thumbnail completeness handling spaces in paths

echo "=== THUMBNAIL COMPLETENESS CHECK ==="

MISSING_THUMB=0
MISSING_PREVIEW=0
TOTAL=0
EXAMPLES=""

find /var/www/lcs-media/samples -name '*.jpeg' -print0 | while IFS= read -r -d '' jpeg; do
  TOTAL=$((TOTAL+1))
  base="${jpeg%.jpeg}"
  thumb="${base}_thumb.webp"
  preview="${base}_preview.webp"

  if [ ! -f "$thumb" ]; then
    MISSING_THUMB=$((MISSING_THUMB+1))
    if [ "$MISSING_THUMB" -le 5 ]; then
      echo "  Missing thumb: $jpeg"
    fi
  fi

  if [ ! -f "$preview" ]; then
    MISSING_PREVIEW=$((MISSING_PREVIEW+1))
    if [ "$MISSING_PREVIEW" -le 5 ]; then
      echo "  Missing preview: $jpeg"
    fi
  fi
done

# Use a subshell approach for counting
echo ""
echo "--- Counts ---"
total_jpeg=$(find /var/www/lcs-media/samples -name '*.jpeg' | wc -l)
total_thumb=$(find /var/www/lcs-media/samples -name '*_thumb.webp' | wc -l)
total_preview=$(find /var/www/lcs-media/samples -name '*_preview.webp' | wc -l)

echo "Total JPEG originals: $total_jpeg"
echo "Total _thumb.webp: $total_thumb"
echo "Total _preview.webp: $total_preview"

if [ "$total_jpeg" -eq "$total_thumb" ]; then
  echo "Thumbnail completeness: PASS (1:1 ratio)"
else
  missing=$((total_jpeg - total_thumb))
  echo "Thumbnail completeness: $missing missing thumbnails"
fi

if [ "$total_jpeg" -eq "$total_preview" ]; then
  echo "Preview completeness: PASS (1:1 ratio)"
else
  missing=$((total_jpeg - total_preview))
  echo "Preview completeness: $missing missing previews"
fi

echo ""
echo "--- Sample directory check (english) ---"
for app_dir in /var/www/lcs-media/samples/english/*/; do
  app=$(basename "$app_dir")
  jpegs=$(find "$app_dir" -name '*.jpeg' | wc -l)
  thumbs=$(find "$app_dir" -name '*_thumb.webp' | wc -l)
  previews=$(find "$app_dir" -name '*_preview.webp' | wc -l)
  if [ "$jpegs" -ne "$thumbs" ] || [ "$jpegs" -ne "$previews" ]; then
    echo "  $app: jpeg=$jpegs thumb=$thumbs preview=$previews"
  fi
done
echo "  (only showing mismatches)"
