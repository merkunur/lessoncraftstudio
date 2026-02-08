#!/bin/bash
# Verify FI blog posts have product links, blog cross-links, and inline auto-links

echo "=== FI BLOG INTERNAL LINKS ==="
echo ""

POSTS=$(curl -s "http://localhost:3000/fi/blog" | grep -oP 'href="/fi/blog/[a-z][a-z0-9-]+' | sed 's/href="//' | sort -u | head -5)

for path in $POSTS; do
  html=$(curl -s "http://localhost:3000${path}")
  slug=$(echo "$path" | sed 's|/fi/blog/||')

  prod_links=$(echo "$html" | grep -oP '/fi/apps/[a-z][a-z0-9-]+' | sort -u | wc -l)
  blog_links=$(echo "$html" | grep -oP '/fi/blog/[a-z][a-z0-9-]+' | sort -u | wc -l)
  inline_links=$(echo "$html" | grep -c 'href="/fi/apps/')

  echo "[fi] ${slug:0:60}"
  echo "  Product links: $prod_links | Blog cross-links: $blog_links | Inline auto-links: $inline_links"
done

echo ""
echo "=== FI PRODUCT → BLOG LINKS ==="
PRODS=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP '<loc>[^<]+/fi/apps/[a-z][^<]+</loc>' | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed 's|https://www.lessoncraftstudio.com||' | shuf | head -5)

for path in $PRODS; do
  html=$(curl -s "http://localhost:3000${path}")
  slug=$(echo "$path" | sed 's|/fi/apps/||')
  blog_links=$(echo "$html" | grep -oP '/fi/blog/[a-z][a-z0-9-]+' | sort -u | wc -l)
  echo "  $slug: $blog_links blog links"
done
