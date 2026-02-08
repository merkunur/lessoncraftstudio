#!/bin/bash
# Final comprehensive internal linking summary across ALL locales

echo "=== INTERNAL LINKING — FINAL COMPREHENSIVE AUDIT ==="
echo ""

# 1. Homepage → Product links (all 11 locales)
echo "--- 1. HOMEPAGE → PRODUCT LINKS ---"
HP_PASS=0
HP_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}")
  app_links=$(echo "$html" | grep -oP "/${locale}/apps/[a-z][a-z0-9-]+" | grep -v '/category/' | grep -v '/grades/' | sort -u | wc -l)
  if [ "$app_links" -ge 30 ]; then
    HP_PASS=$((HP_PASS+1))
  else
    echo "  FAIL: $locale — $app_links app links (expected 30+)"
    HP_FAIL=$((HP_FAIL+1))
  fi
done
echo "  Result: $HP_PASS/11 locales have 30+ product links"
echo ""

# 2. Blog → Product links (2 posts per locale)
echo "--- 2. BLOG → PRODUCT LINKS (2 posts × 11 locales) ---"
BP_PASS=0
BP_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  slugs=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -2)
  for path in $slugs; do
    html=$(curl -s "http://localhost:3000${path}")
    prod=$(echo "$html" | grep -oP "/${locale}/apps/[a-z][a-z0-9-]+" | sort -u | wc -l)
    if [ "$prod" -ge 1 ]; then
      BP_PASS=$((BP_PASS+1))
    else
      slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
      echo "  FAIL: [$locale] ${slug:0:50} — 0 product links"
      BP_FAIL=$((BP_FAIL+1))
    fi
  done
done
BP_TOTAL=$((BP_PASS+BP_FAIL))
echo "  Result: $BP_PASS/$BP_TOTAL posts have product links"
echo ""

# 3. Blog → Blog cross-links (2 posts per locale)
echo "--- 3. BLOG → BLOG CROSS-LINKS (2 posts × 11 locales) ---"
BB_PASS=0
BB_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  slugs=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -2)
  for path in $slugs; do
    html=$(curl -s "http://localhost:3000${path}")
    blog=$(echo "$html" | grep -oP "/${locale}/blog/[a-z][a-z0-9-]+" | sort -u | wc -l)
    if [ "$blog" -ge 1 ]; then
      BB_PASS=$((BB_PASS+1))
    else
      slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
      echo "  FAIL: [$locale] ${slug:0:50} — 0 blog links"
      BB_FAIL=$((BB_FAIL+1))
    fi
  done
done
BB_TOTAL=$((BB_PASS+BB_FAIL))
echo "  Result: $BB_PASS/$BB_TOTAL posts have blog cross-links"
echo ""

# 4. Product → Blog links (2 products per locale)
echo "--- 4. PRODUCT → BLOG LINKS (2 products × 11 locales) ---"
PB_PASS=0
PB_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  prods=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -2)
  for path in $prods; do
    html=$(curl -s "http://localhost:3000${path}")
    blog=$(echo "$html" | grep -oP "/${locale}/blog/[a-z][a-z0-9-]+" | sort -u | wc -l)
    if [ "$blog" -ge 1 ]; then
      PB_PASS=$((PB_PASS+1))
    else
      slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
      echo "  WARN: [$locale] $slug — 0 blog links"
      PB_FAIL=$((PB_FAIL+1))
    fi
  done
done
PB_TOTAL=$((PB_PASS+PB_FAIL))
echo "  Result: $PB_PASS/$PB_TOTAL products have blog links"
echo ""

# 5. Inline auto-links (keyword→product in body, 1 post per locale)
echo "--- 5. INLINE AUTO-LINKS (1 post × 11 locales) ---"
KW_PASS=0
KW_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  inline=$(echo "$html" | grep -c "href=\"/${locale}/apps/")
  if [ "$inline" -ge 1 ]; then
    KW_PASS=$((KW_PASS+1))
  else
    echo "  FAIL: [$locale] no inline auto-links"
    KW_FAIL=$((KW_FAIL+1))
  fi
done
echo "  Result: $KW_PASS/11 locales have inline auto-links"
echo ""

# 6. Broken link check (sample 30 links across locales)
echo "--- 6. BROKEN LINK SPOT-CHECK (30 random links) ---"
OK=0
BROKEN=0
BROKEN_LIST=""

for locale in en de fr es pt; do
  links=$(curl -s "http://localhost:3000/${locale}" | grep -oP "href=\"/${locale}/[^\"#?]+" | sed 's/href="//' | sort -u | shuf | head -3)
  blog_links=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/[^\"#?]+" | sed 's/href="//' | sort -u | shuf | head -3)
  all_links="$links $blog_links"
  for link in $all_links; do
    if echo "$link" | grep -qP '\.(js|css|png|jpg|webp|svg|ico)$'; then continue; fi
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${link}")
    if [ "$code" = "200" ] || [ "$code" = "304" ] || [ "$code" = "301" ] || [ "$code" = "307" ] || [ "$code" = "308" ]; then
      OK=$((OK+1))
    else
      BROKEN=$((BROKEN+1))
      BROKEN_LIST="${BROKEN_LIST}\n  ${code}: ${link}"
    fi
  done
done
TOTAL=$((OK+BROKEN))
echo "  Checked: $TOTAL links"
echo "  OK: $OK | Broken: $BROKEN"
if [ -n "$BROKEN_LIST" ]; then
  echo -e "  Broken:${BROKEN_LIST}"
fi
echo ""

echo "=== SUMMARY ==="
echo "  1. Homepage → Product: $HP_PASS/11 locales (30+ links each)"
echo "  2. Blog → Product: $BP_PASS/$BP_TOTAL posts checked"
echo "  3. Blog → Blog: $BB_PASS/$BB_TOTAL posts checked"
echo "  4. Product → Blog: $PB_PASS/$PB_TOTAL products checked"
echo "  5. Inline auto-links: $KW_PASS/11 locales"
echo "  6. Broken links: $BROKEN/$TOTAL"
