#!/bin/bash
# Comprehensive blog listing page audit — all 11 locales

LOCALES="en de fr es pt it nl sv da no fi"
OK=0
FAIL=0

echo "=== BLOG LISTING PAGE AUDIT ==="
echo ""

for locale in $LOCALES; do
  url="http://localhost:3000/${locale}/blog"
  html=$(curl -s "$url")
  code=$(echo "$html" | head -1 | grep -c 'DOCTYPE')

  # Title
  title=$(echo "$html" | grep -oP '(?<=<title>)[^<]+' | head -1)
  title_len=${#title}

  # Meta description
  desc=$(echo "$html" | grep -oP '(?<=<meta name="description" content=")[^"]+' | head -1)
  desc_len=${#desc}

  # CollectionPage schema
  has_collection=$(echo "$html" | grep -c 'CollectionPage')

  # Canonical
  canonical=$(echo "$html" | grep -oP '(?<=<link rel="canonical" href=")[^"]+' | head -1)

  # Hreflang (React uses hrefLang camelCase)
  hreflang_count=$(echo "$html" | grep -c 'hrefLang=')

  # x-default
  has_xdefault=$(echo "$html" | grep -c 'x-default')

  # OG tags
  og_title=$(echo "$html" | grep -oP '(?<=<meta property="og:title" content=")[^"]+' | head -1)
  og_type=$(echo "$html" | grep -oP '(?<=<meta property="og:type" content=")[^"]+' | head -1)
  og_locale=$(echo "$html" | grep -oP '(?<=<meta property="og:locale" content=")[^"]+' | head -1)

  # Post links in server-rendered HTML
  post_links=$(echo "$html" | grep -oP "/${locale}/blog/[a-z][a-z0-9-]+" | sort -u | wc -l)

  # BreadcrumbList schema
  has_breadcrumb=$(echo "$html" | grep -c 'BreadcrumbList')

  # numberOfItems in schema
  num_items=$(echo "$html" | grep -oP '"numberOfItems":\s*"?\d+' | grep -oP '\d+' | head -1)

  # Category links
  cat_links=$(echo "$html" | grep -oP "/${locale}/blog/category/[a-z-]+" | sort -u | wc -l)

  # Images with alt
  img_with_alt=$(echo "$html" | grep -oP '<img[^>]+alt="[^"]+' | wc -l)

  # RSS feed
  has_rss=$(echo "$html" | grep -c 'feed.xml')

  # Determine issues
  issues=""
  if [ "$has_collection" -eq 0 ]; then issues="${issues} NO_SCHEMA"; fi
  if [ -z "$canonical" ]; then issues="${issues} NO_CANONICAL"; fi
  if [ "$hreflang_count" -lt 11 ]; then issues="${issues} HREFLANG(${hreflang_count})"; fi
  if [ "$has_xdefault" -eq 0 ]; then issues="${issues} NO_XDEFAULT"; fi
  if [ -z "$og_title" ]; then issues="${issues} NO_OG_TITLE"; fi
  if [ -z "$og_type" ]; then issues="${issues} NO_OG_TYPE"; fi
  if [ "$has_breadcrumb" -eq 0 ]; then issues="${issues} NO_BREADCRUMB"; fi
  if [ "$cat_links" -lt 5 ]; then issues="${issues} FEW_CATS(${cat_links})"; fi
  if [ "$has_rss" -eq 0 ]; then issues="${issues} NO_RSS"; fi

  if [ -z "$issues" ]; then
    status="OK"
    OK=$((OK+1))
  else
    status="FAIL"
    FAIL=$((FAIL+1))
  fi

  echo "[$locale] $status"
  echo "  Title (${title_len}c): ${title:0:80}"
  echo "  Desc  (${desc_len}c): ${desc:0:80}"
  echo "  Canonical: $canonical"
  echo "  Hreflang: $hreflang_count tags (+x-default=$has_xdefault)"
  echo "  Schema: CollectionPage=$has_collection BreadcrumbList=$has_breadcrumb"
  echo "  OG: title=${#og_title}c type=$og_type locale=$og_locale"
  echo "  Content: post_links=$post_links cat_links=$cat_links imgs_alt=$img_with_alt items=$num_items rss=$has_rss"
  if [ -n "$issues" ]; then
    echo "  ISSUES:$issues"
  fi
  echo ""
done

echo "=========================================="
echo "RESULT: $OK/11 OK, $FAIL FAIL"
