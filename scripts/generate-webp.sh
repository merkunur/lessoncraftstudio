#!/bin/bash
# generate-webp.sh - Generate optimized WebP files for all samples
# For LessonCraftStudio SampleGallery component
#
# This script creates:
# - {filename}_thumb.webp (400px width) for thumbnails
# - {filename}_preview.webp (800px width) for previews

SAMPLES_DIR="/opt/lessoncraftstudio/samples"
THUMB_WIDTH=400
THUMB_QUALITY=80
PREVIEW_WIDTH=800
PREVIEW_QUALITY=85

echo "=============================================="
echo "  LessonCraftStudio WebP Generator"
echo "=============================================="
echo ""
echo "Source directory: $SAMPLES_DIR"
echo "Thumbnail: ${THUMB_WIDTH}px @ ${THUMB_QUALITY}% quality"
echo "Preview: ${PREVIEW_WIDTH}px @ ${PREVIEW_QUALITY}% quality"
echo ""

# Check ImageMagick
if ! command -v convert &> /dev/null; then
    echo "ERROR: ImageMagick 'convert' not found!"
    echo "Install with: apt-get install imagemagick"
    exit 1
fi

echo "ImageMagick: $(convert --version | head -n1)"
echo ""

# Count total files
total=$(find "$SAMPLES_DIR" -type f \( -iname "*.jpeg" -o -iname "*.jpg" -o -iname "*.png" \) 2>/dev/null | wc -l)
echo "Found $total source images to process"
echo ""

# Counters
processed=0
created_thumbs=0
created_previews=0
skipped=0
errors=0

# Process each image
while IFS= read -r -d '' file; do
    ((processed++))

    dir=$(dirname "$file")
    base=$(basename "$file")
    name="${base%.*}"

    thumb="${dir}/${name}_thumb.webp"
    preview="${dir}/${name}_preview.webp"

    # Show progress every 10 files
    if (( processed % 10 == 0 )); then
        percent=$((processed * 100 / total))
        echo -ne "\rProgress: $processed / $total ($percent%) - Thumbs: $created_thumbs, Previews: $created_previews"
    fi

    # Generate thumbnail if not exists
    if [[ ! -f "$thumb" ]]; then
        if convert "$file" -resize "${THUMB_WIDTH}x>" -quality $THUMB_QUALITY "$thumb" 2>/dev/null; then
            ((created_thumbs++))
        else
            ((errors++))
        fi
    else
        ((skipped++))
    fi

    # Generate preview if not exists
    if [[ ! -f "$preview" ]]; then
        if convert "$file" -resize "${PREVIEW_WIDTH}x>" -quality $PREVIEW_QUALITY "$preview" 2>/dev/null; then
            ((created_previews++))
        else
            ((errors++))
        fi
    else
        ((skipped++))
    fi

done < <(find "$SAMPLES_DIR" -type f \( -iname "*.jpeg" -o -iname "*.jpg" -o -iname "*.png" \) -print0 2>/dev/null)

echo ""
echo ""
echo "=============================================="
echo "  Generation Complete!"
echo "=============================================="
echo ""
echo "Source images processed: $processed"
echo "Thumbnails created: $created_thumbs"
echo "Previews created: $created_previews"
echo "Skipped (already exist): $skipped"
echo "Errors: $errors"
echo ""

# Final count
total_webp=$(find "$SAMPLES_DIR" -type f -name "*.webp" 2>/dev/null | wc -l)
echo "Total WebP files on server: $total_webp"

# Disk usage
webp_size=$(du -sh "$SAMPLES_DIR"/*.webp 2>/dev/null | tail -1 | cut -f1 || echo "N/A")
total_size=$(du -sh "$SAMPLES_DIR" 2>/dev/null | cut -f1)
echo "Total samples directory size: $total_size"
echo ""
echo "=============================================="
