#!/bin/bash
# Check image coverage: do ALL 33 products × 11 locales have sample images?

echo "=== IMAGE COVERAGE — ALL PRODUCTS × ALL LOCALES ==="
echo ""

# Get all product URLs from sitemap
ALL_PRODS=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP '<loc>[^<]+/apps/[a-z][^<]+</loc>' | grep -v '/category/' | grep -v '/grades/' | grep -v 'apps</loc>' | sed 's/<[^>]*>//g' | sed 's|https://www.lessoncraftstudio.com||')

TOTAL=0
WITH_IMAGES=0
WITHOUT_IMAGES=0
NO_IMG_LIST=""

for path in $ALL_PRODS; do
  TOTAL=$((TOTAL+1))
  locale=$(echo "$path" | cut -d/ -f2)
  slug=$(echo "$path" | rev | cut -d/ -f1 | rev)

  # Check if page has sample images (check HTML for /samples/ references)
  html=$(curl -s "http://localhost:3000${path}")
  sample_count=$(echo "$html" | grep -oP '/samples/[a-z]+/[^"]+\.(jpeg|webp)' | sort -u | wc -l)

  if [ "$sample_count" -ge 1 ]; then
    WITH_IMAGES=$((WITH_IMAGES+1))
  else
    WITHOUT_IMAGES=$((WITHOUT_IMAGES+1))
    NO_IMG_LIST="${NO_IMG_LIST}\n  [$locale] $slug"
  fi
done

echo "Total product pages checked: $TOTAL"
echo "Pages with sample images: $WITH_IMAGES"
echo "Pages without sample images: $WITHOUT_IMAGES"
if [ -n "$NO_IMG_LIST" ]; then
  echo -e "\nPages without images:${NO_IMG_LIST}"
fi
echo ""

# Check samples per language on filesystem
echo "--- SAMPLES PER LANGUAGE (filesystem) ---"
for lang_dir in /var/www/lcs-media/samples/*/; do
  lang=$(basename "$lang_dir")
  apps=$(find "$lang_dir" -mindepth 1 -maxdepth 1 -type d | wc -l)
  files=$(find "$lang_dir" -name '*.jpeg' | wc -l)
  echo "  $lang: $apps app folders, $files JPEGs"
done
echo ""

echo "--- IMAGE SITEMAP vs FILESYSTEM ---"
img_sitemap_pages=$(curl -s "http://localhost:3000/sitemap-images.xml" | grep -c '<url>')
img_sitemap_images=$(curl -s "http://localhost:3000/sitemap-images.xml" | grep -c '<image:loc>')
fs_jpegs=$(find /var/www/lcs-media/samples -name '*.jpeg' | wc -l)
echo "  Image sitemap pages: $img_sitemap_pages"
echo "  Image sitemap image entries: $img_sitemap_images"
echo "  Filesystem JPEGs: $fs_jpegs"
echo ""

echo "=== DONE ==="
