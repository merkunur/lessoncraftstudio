#!/bin/bash
# Check pagination on blog listing page 2

echo "=== PAGINATION CHECK (Page 2) ==="
echo ""

for locale in en de fr; do
  url="http://localhost:3000/${locale}/blog?page=2"
  html=$(curl -s "$url")

  # Title should include "Page 2"
  title=$(echo "$html" | grep -oP '(?<=<title>)[^<]+' | head -1)

  # Canonical should include ?page=2
  canonical=$(echo "$html" | grep -oP '(?<=<link rel="canonical" href=")[^"]+' | head -1)

  # Should NOT have hreflang on paginated pages (per Google guidelines)
  hreflang=$(echo "$html" | grep -oP 'hrefLang="[^"]+"' | wc -l)

  # rel prev/next in links
  has_prev=$(echo "$html" | grep -c 'rel="prev"')
  has_next=$(echo "$html" | grep -c 'rel="next"')

  echo "[$locale page 2]"
  echo "  Title: ${title:0:80}"
  echo "  Canonical: $canonical"
  echo "  Hreflang tags: $hreflang (should be 0 on paginated)"
  echo "  rel=prev: $has_prev | rel=next: $has_next"
  echo ""
done
