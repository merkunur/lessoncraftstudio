#!/bin/bash
# Check image sitemap localization quality

echo "=== IMAGE SITEMAP LOCALIZATION ==="
echo ""

sitemap=$(curl -s "http://localhost:3000/sitemap-images.xml")

for locale in en de fr es fi; do
  echo "--- [$locale] Sample image entries ---"
  # Get first page for this locale that has images
  echo "$sitemap" | grep -A20 "/${locale}/apps/" | grep -oP '<image:(title|caption)>[^<]+</image:(title|caption)>' | head -4
  echo ""
done

echo "--- Blog image entries (EN) ---"
echo "$sitemap" | grep -A20 '/en/blog/' | grep -oP '<image:(title|caption)>[^<]+</image:(title|caption)>' | head -4
echo ""

echo "--- Total image entries per locale ---"
for locale in en de fr es pt it nl sv da no fi; do
  count=$(echo "$sitemap" | grep -oP "<url>.*?/${locale}/.*?</url>" | grep -c '<image:loc>' 2>/dev/null)
  # Alternative approach
  pages=$(echo "$sitemap" | grep -c "/${locale}/")
  echo "  $locale: ~$pages references"
done
