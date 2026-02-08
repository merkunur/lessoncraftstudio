#!/bin/bash
# Final comprehensive blog listing audit

echo "=== BLOG LISTING PAGE — FINAL AUDIT ==="
echo ""

PASS=0
TOTAL=0

check() {
  local name="$1"
  local result="$2"
  local expected="$3"
  TOTAL=$((TOTAL+1))
  if [ "$result" = "$expected" ]; then
    echo "  PASS: $name"
    PASS=$((PASS+1))
  else
    echo "  FAIL: $name (got: $result, expected: $expected)"
  fi
}

for locale in en de fr es pt it nl sv da no fi; do
  echo "--- $locale ---"
  html=$(curl -s "http://localhost:3000/${locale}/blog")

  # 1. HTTP 200
  has_doctype=$(echo "$html" | head -1 | grep -c 'DOCTYPE')
  check "HTTP renders" "$has_doctype" "1"

  # 2. Title present and localized
  title=$(echo "$html" | grep -oP '(?<=<title>)[^<]+' | head -1)
  has_title=$( [ ${#title} -gt 30 ] && echo "1" || echo "0" )
  check "Meta title present (${#title}c)" "$has_title" "1"

  # 3. Meta description present
  desc=$(echo "$html" | grep -oP '(?<=<meta name="description" content=")[^"]+' | head -1)
  has_desc=$( [ ${#desc} -gt 50 ] && echo "1" || echo "0" )
  check "Meta description present (${#desc}c)" "$has_desc" "1"

  # 4. Canonical URL
  canonical=$(echo "$html" | grep -oP '(?<=<link rel="canonical" href=")[^"]+' | head -1)
  correct_canonical="https://www.lessoncraftstudio.com/${locale}/blog"
  is_correct=$( [ "$canonical" = "$correct_canonical" ] && echo "1" || echo "0" )
  check "Canonical correct" "$is_correct" "1"

  # 5. Hreflang tags (12 = 11 locales + x-default)
  hreflang=$(echo "$html" | grep -oP 'hrefLang="[^"]+"' | wc -l)
  has_hreflang=$( [ "$hreflang" -ge 12 ] && echo "1" || echo "0" )
  check "Hreflang tags ($hreflang)" "$has_hreflang" "1"

  # 6. CollectionPage schema
  has_schema=$(echo "$html" | grep -c 'CollectionPage')
  check "CollectionPage schema" "$( [ $has_schema -ge 1 ] && echo 1 || echo 0 )" "1"

  # 7. BreadcrumbList schema
  has_bc=$(echo "$html" | grep -c 'BreadcrumbList')
  check "BreadcrumbList schema" "$( [ $has_bc -ge 1 ] && echo 1 || echo 0 )" "1"

  # 8. OG tags
  og_title=$(echo "$html" | grep -c 'og:title')
  og_desc=$(echo "$html" | grep -c 'og:description')
  og_type=$(echo "$html" | grep -c 'og:type')
  og_total=$((og_title + og_desc + og_type))
  check "OG tags (title+desc+type)" "$( [ $og_total -ge 3 ] && echo 1 || echo 0 )" "1"

  # 9. Server-rendered post links (for crawlability)
  post_links=$(echo "$html" | grep -oP "/${locale}/blog/[a-z][a-z0-9-]+" | sort -u | wc -l)
  check "Server-rendered post links ($post_links)" "$( [ $post_links -ge 50 ] && echo 1 || echo 0 )" "1"

  # 10. Category navigation links (7 categories)
  cat_links=$(echo "$html" | grep -oP "/${locale}/blog/category/[a-z-]+" | sort -u | wc -l)
  check "Category nav links ($cat_links)" "$( [ $cat_links -ge 7 ] && echo 1 || echo 0 )" "1"

  # 11. Images with alt text
  img_alt=$(echo "$html" | grep -oP '<img[^>]+alt="[^"]+' | wc -l)
  check "Images with alt ($img_alt)" "$( [ $img_alt -ge 1 ] && echo 1 || echo 0 )" "1"

  # 12. inLanguage in schema
  has_lang=$(echo "$html" | grep -c 'inLanguage')
  check "inLanguage in schema" "$( [ $has_lang -ge 1 ] && echo 1 || echo 0 )" "1"

  # 13. numberOfItems in schema
  has_items=$(echo "$html" | grep -c 'numberOfItems')
  check "numberOfItems in schema" "$( [ $has_items -ge 1 ] && echo 1 || echo 0 )" "1"

  echo ""
done

echo "=========================================="
echo "FINAL RESULT: $PASS/$TOTAL checks passed"
