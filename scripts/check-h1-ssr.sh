#!/bin/bash
echo "=== H1 SSR CHECK ==="

# Homepages
echo "--- Homepages ---"
for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}")
  h1_count=$(echo "$html" | grep -c '<h1 ')
  echo "  ${locale} homepage: ${h1_count} H1 tags"
done

echo ""
echo "--- Product Pages (1 per locale) ---"
for locale in en de fr es pt it nl sv da no fi; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  h1_count=$(echo "$html" | grep -c '<h1')
  slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
  echo "  ${locale} ${slug}: ${h1_count} H1 tags"
done

echo ""
echo "--- Blog Posts (1 per locale) ---"
for locale in en de fr es pt it nl sv da no fi; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  h1_count=$(echo "$html" | grep -c '<h1')
  article_count=$(echo "$html" | grep -c '<article')
  echo "  ${locale} blog: H1=${h1_count} article=${article_count}"
done
