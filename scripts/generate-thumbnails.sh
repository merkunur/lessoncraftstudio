#!/bin/bash
cd /opt/lessoncraftstudio/frontend/public/samples

# Count total images
total=$(find . -type f \( -name "*.jpeg" -o -name "*.jpg" -o -name "*.png" \) | wc -l)
count=0

echo "Starting thumbnail generation for $total images..."

find . -type f \( -name "*.jpeg" -o -name "*.jpg" -o -name "*.png" \) | while read img; do
  base="${img%.*}"

  # Generate 400px thumbnail
  convert "$img" -resize 400x -quality 80 "${base}_thumb.webp" 2>/dev/null

  # Generate 800px preview
  convert "$img" -resize 800x -quality 85 "${base}_preview.webp" 2>/dev/null

  count=$((count + 1))
  echo "[$count/$total] Done: $img"
done

echo "ALL COMPLETE!"
