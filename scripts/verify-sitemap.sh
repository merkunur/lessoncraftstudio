#!/bin/bash
# Comprehensive sitemap audit

echo "=== SITEMAP ACCURACY AUDIT ==="
echo ""

# Fetch the sitemap
SITEMAP=$(curl -s "http://localhost:3000/sitemap.xml")

# Total URL count
total_urls=$(echo "$SITEMAP" | grep -c '<loc>')
echo "Total URLs in sitemap: $total_urls"
echo ""

# Count by page type
homepage_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep -P '/[a-z]{2}</loc>$' | wc -l)
echo "Homepage URLs: $homepage_urls (expected: 11)"

apps_collection=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep '/apps</loc>' | wc -l)
echo "Apps collection URLs: $apps_collection (expected: 11)"

product_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep '/apps/' | grep -v '/category/' | grep -v '/grades/' | grep -v 'apps</loc>' | wc -l)
echo "Product page URLs: $product_urls (expected: 363)"

product_cat_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep '/apps/category/' | wc -l)
echo "Product category URLs: $product_cat_urls (expected: 88)"

grade_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep '/apps/grades/' | wc -l)
echo "Grade URLs: $grade_urls (expected: 55)"

blog_listing_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep -P '/blog</loc>$' | wc -l)
echo "Blog listing URLs: $blog_listing_urls (expected: 11)"

blog_category_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep '/blog/category/' | wc -l)
echo "Blog category URLs: $blog_category_urls (expected: 77)"

blog_post_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep '/blog/' | grep -v '/category/' | grep -v 'blog</loc>' | wc -l)
echo "Blog post URLs: $blog_post_urls (expected: ~1232)"

pricing_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep '/pricing' | wc -l)
echo "Pricing URLs: $pricing_urls (expected: 11)"

legal_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep -P '/(terms|privacy|contact|license|faq)</loc>' | wc -l)
echo "Legal/FAQ URLs: $legal_urls (expected: 55)"

echo ""
echo "--- HREFLANG CHECKS ---"

# Check hreflang alternates count on sample entries
# Homepage EN should have 12 alternates (11 locales + x-default)
homepage_en_alternates=$(echo "$SITEMAP" | grep -A 50 'lessoncraftstudio.com/en</loc>' | grep -c 'xhtml:link')
echo "Homepage EN alternates: $homepage_en_alternates (expected: 12)"

# Check x-default presence
xdefault_count=$(echo "$SITEMAP" | grep -c 'x-default')
echo "x-default entries: $xdefault_count"

echo ""
echo "--- DUPLICATE CHECK ---"
# Check for duplicate URLs
dup_count=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | sort | uniq -d | wc -l)
echo "Duplicate URLs: $dup_count (expected: 0)"
if [ "$dup_count" -gt 0 ]; then
  echo "Duplicates:"
  echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | sort | uniq -d | head -10
fi

echo ""
echo "--- LASTMOD CHECK ---"
# Check lastmod dates exist
lastmod_count=$(echo "$SITEMAP" | grep -c '<lastmod>')
echo "URLs with lastmod: $lastmod_count (should match total: $total_urls)"

echo ""
echo "--- PROTOCOL CHECK ---"
# All URLs should be HTTPS
http_only=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep 'http://' | wc -l)
echo "HTTP-only URLs (should be 0): $http_only"

# All URLs should have www
no_www=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+</loc>' | grep -v 'www\.' | wc -l)
echo "URLs without www (should be 0): $no_www"

echo ""
echo "--- LOCALE DISTRIBUTION ---"
for locale in en de fr es pt it nl sv da no fi; do
  count=$(echo "$SITEMAP" | grep -oP "<loc>[^<]*/${locale}/[^<]*</loc>" | wc -l)
  echo "  $locale: $count URLs"
done

echo ""
echo "--- SAMPLE 404 CHECK (10 random blog URLs) ---"
blog_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+/blog/[a-z][^<]+</loc>' | grep -v '/category/' | sed 's/<[^>]*>//g' | shuf | head -10)
ok404=0
fail404=0
for url in $blog_urls; do
  # Convert to localhost
  local_url=$(echo "$url" | sed 's|https://www.lessoncraftstudio.com|http://localhost:3000|')
  code=$(curl -s -o /dev/null -w '%{http_code}' "$local_url")
  if [ "$code" = "200" ]; then
    ok404=$((ok404+1))
  else
    fail404=$((fail404+1))
    echo "  $code: $url"
  fi
done
echo "Blog URL spot-check: $ok404/10 OK, $fail404 non-200"

echo ""
echo "--- SAMPLE 404 CHECK (5 random product URLs) ---"
prod_urls=$(echo "$SITEMAP" | grep -oP '<loc>[^<]+/apps/[a-z][^<]+</loc>' | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | shuf | head -5)
okp=0
failp=0
for url in $prod_urls; do
  local_url=$(echo "$url" | sed 's|https://www.lessoncraftstudio.com|http://localhost:3000|')
  code=$(curl -s -o /dev/null -w '%{http_code}' "$local_url")
  if [ "$code" = "200" ]; then
    okp=$((okp+1))
  else
    failp=$((failp+1))
    echo "  $code: $url"
  fi
done
echo "Product URL spot-check: $okp/5 OK, $failp non-200"
