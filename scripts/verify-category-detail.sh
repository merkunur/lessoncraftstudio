#!/bin/bash
# Detailed spot-check of category pages — 1 category per locale

echo "=== DETAILED CATEGORY PAGE SPOT-CHECK ==="
echo ""

PAIRS=(
  "en teaching-resources"
  "de worksheet-tips"
  "fr educational-activities"
  "es learning-strategies"
  "pt curriculum-guides"
  "it parent-resources"
  "nl seasonal-content"
  "sv teaching-resources"
  "da worksheet-tips"
  "no educational-activities"
  "fi learning-strategies"
)

for pair in "${PAIRS[@]}"; do
  locale=$(echo "$pair" | cut -d' ' -f1)
  cat=$(echo "$pair" | cut -d' ' -f2)
  url="http://localhost:3000/${locale}/blog/category/${cat}"
  html=$(curl -s "$url")

  # Title
  title=$(echo "$html" | grep -oP '(?<=<title>)[^<]+' | head -1)

  # Description
  desc=$(echo "$html" | grep -oP '(?<=<meta name="description" content=")[^"]+' | head -1)

  # Canonical
  canonical=$(echo "$html" | grep -oP '(?<=<link rel="canonical" href=")[^"]+' | head -1)

  # Hreflang count
  hreflang=$(echo "$html" | grep -oP 'hrefLang="[^"]+"' | wc -l)

  # Schema check
  has_collection=$(echo "$html" | grep -c 'CollectionPage')
  has_breadcrumb=$(echo "$html" | grep -c 'BreadcrumbList')
  has_inlang=$(echo "$html" | grep -c 'inLanguage')

  # Post count
  post_links=$(echo "$html" | grep -oP "/${locale}/blog/[a-z][a-z0-9-]+" | grep -v '/category/' | sort -u | wc -l)

  # Related products (app links)
  app_links=$(echo "$html" | grep -oP "/${locale}/apps/[a-z-]+" | sort -u | wc -l)

  # OG locale
  og_locale=$(echo "$html" | grep -oP '(?<=<meta property="og:locale" content=")[^"]+' | head -1)

  # H1
  h1=$(echo "$html" | grep -oP '(?<=<h1[^>]*>)[^<]+' | head -1)

  echo "[$locale / $cat]"
  echo "  Title: ${title:0:70}"
  echo "  Desc:  ${desc:0:70}..."
  echo "  H1:    ${h1:0:60}"
  echo "  Canonical: $canonical"
  echo "  Hreflang: $hreflang | OG locale: $og_locale"
  echo "  Schema: Collection=$has_collection Breadcrumb=$has_breadcrumb inLang=$has_inlang"
  echo "  Posts: $post_links | App links: $app_links"
  echo ""
done
