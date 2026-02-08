#!/bin/bash
# Comprehensive blog category page audit — 7 categories × 11 locales = 77 pages

LOCALES="en de fr es pt it nl sv da no fi"
CATEGORIES="teaching-resources worksheet-tips educational-activities learning-strategies curriculum-guides parent-resources seasonal-content"

PASS=0
FAIL=0
TOTAL=0
FAILURES=""

for locale in $LOCALES; do
  for cat in $CATEGORIES; do
    url="http://localhost:3000/${locale}/blog/category/${cat}"
    html=$(curl -s "$url")
    TOTAL=$((TOTAL+1))

    issues=""

    # 1. HTTP 200 (check for DOCTYPE)
    has_doctype=$(echo "$html" | head -1 | grep -c 'DOCTYPE')
    if [ "$has_doctype" -eq 0 ]; then issues="${issues} NO_HTML"; fi

    # 2. Title present
    title=$(echo "$html" | grep -oP '(?<=<title>)[^<]+' | head -1)
    if [ ${#title} -lt 20 ]; then issues="${issues} NO_TITLE"; fi

    # 3. Meta description
    desc=$(echo "$html" | grep -oP '(?<=<meta name="description" content=")[^"]+' | head -1)
    if [ ${#desc} -lt 30 ]; then issues="${issues} NO_DESC"; fi

    # 4. Canonical
    canonical=$(echo "$html" | grep -oP '(?<=<link rel="canonical" href=")[^"]+' | head -1)
    expected="https://www.lessoncraftstudio.com/${locale}/blog/category/${cat}"
    if [ "$canonical" != "$expected" ]; then issues="${issues} BAD_CANONICAL"; fi

    # 5. CollectionPage schema
    has_schema=$(echo "$html" | grep -c 'CollectionPage')
    if [ "$has_schema" -eq 0 ]; then issues="${issues} NO_SCHEMA"; fi

    # 6. BreadcrumbList
    has_bc=$(echo "$html" | grep -c 'BreadcrumbList')
    if [ "$has_bc" -eq 0 ]; then issues="${issues} NO_BREADCRUMB"; fi

    # 7. Category intro text
    intro_len=$(echo "$html" | grep -oP 'category-intro[^>]*>[^<]+' | head -1 | wc -c)
    # Alternative: check for the intro paragraph in any form
    has_intro=$(echo "$html" | grep -c 'text-gray-700.*leading-relaxed\|category-intro\|prose')

    # 8. Post links for this locale
    post_links=$(echo "$html" | grep -oP "/${locale}/blog/[a-z][a-z0-9-]+" | grep -v '/category/' | sort -u | wc -l)
    if [ "$post_links" -lt 1 ]; then issues="${issues} NO_POSTS"; fi

    # 9. RelatedProducts
    has_rp=$(echo "$html" | grep -c 'apps/')
    if [ "$has_rp" -eq 0 ]; then issues="${issues} NO_RELATED_PRODUCTS"; fi

    # 10. OG tags
    og_title=$(echo "$html" | grep -c 'og:title')
    if [ "$og_title" -eq 0 ]; then issues="${issues} NO_OG"; fi

    if [ -z "$issues" ]; then
      PASS=$((PASS+1))
    else
      FAIL=$((FAIL+1))
      FAILURES="${FAILURES}\n  ${locale}/${cat}:${issues} (title=${#title}c, desc=${#desc}c, posts=${post_links})"
    fi
  done
done

echo "=== BLOG CATEGORY PAGES AUDIT ==="
echo "Pages checked: $TOTAL (7 categories × 11 locales)"
echo "PASS: $PASS"
echo "FAIL: $FAIL"
if [ -n "$FAILURES" ]; then
  echo -e "\nFAILURES:${FAILURES}"
fi
