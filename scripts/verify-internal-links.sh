#!/bin/bash
echo "=== INTERNAL LINKING AUDIT ==="
echo ""

# ============================================================
# 1. HOMEPAGE → PRODUCT LINKS (all 33 apps linked from homepage?)
# ============================================================
echo "--- 1. HOMEPAGE → PRODUCT LINKS ---"
PASS_HP=0
FAIL_HP=0
for locale in en de fr; do
  html=$(curl -s "http://localhost:3000/${locale}")
  app_links=$(echo "$html" | grep -oP "/${locale}/apps/[a-z][a-z0-9-]+" | grep -v '/category/' | grep -v '/grades/' | sort -u | wc -l)
  if [ "$app_links" -ge 30 ]; then
    echo "  $locale: $app_links app links (PASS)"
    PASS_HP=$((PASS_HP+1))
  else
    echo "  $locale: $app_links app links (FAIL — expected 33)"
    FAIL_HP=$((FAIL_HP+1))
  fi
done
# Spot-check remaining locales
for locale in es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}")
  app_links=$(echo "$html" | grep -oP "/${locale}/apps/[a-z][a-z0-9-]+" | grep -v '/category/' | grep -v '/grades/' | sort -u | wc -l)
  if [ "$app_links" -ge 30 ]; then
    PASS_HP=$((PASS_HP+1))
  else
    echo "  $locale: $app_links app links (FAIL)"
    FAIL_HP=$((FAIL_HP+1))
  fi
done
echo "  Homepage → Product: $PASS_HP/11 locales OK"
echo ""

# ============================================================
# 2. BLOG → PRODUCT LINKS (RelatedProducts on blog posts)
# ============================================================
echo "--- 2. BLOG → PRODUCT LINKS (10 random posts) ---"
PASS_BP=0
FAIL_BP=0
BLOG_SLUGS=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP '<loc>[^<]+/en/blog/[a-z][^<]+</loc>' | grep -v '/category/' | sed 's/<[^>]*>//g' | sed 's|https://www.lessoncraftstudio.com||' | shuf | head -10)
for path in $BLOG_SLUGS; do
  html=$(curl -s "http://localhost:3000${path}")
  product_links=$(echo "$html" | grep -oP '/en/apps/[a-z][a-z0-9-]+' | grep -v '/category/' | grep -v '/grades/' | sort -u | wc -l)
  slug=$(echo "$path" | sed 's|/en/blog/||')
  if [ "$product_links" -ge 1 ]; then
    PASS_BP=$((PASS_BP+1))
  else
    echo "  FAIL: $slug — 0 product links"
    FAIL_BP=$((FAIL_BP+1))
  fi
done
echo "  Blog → Product: $PASS_BP/10 posts have product links"
echo ""

# ============================================================
# 3. BLOG → BLOG LINKS (related posts / inline links)
# ============================================================
echo "--- 3. BLOG → BLOG LINKS (10 random posts) ---"
PASS_BB=0
FAIL_BB=0
for path in $BLOG_SLUGS; do
  html=$(curl -s "http://localhost:3000${path}")
  blog_links=$(echo "$html" | grep -oP '/en/blog/[a-z][a-z0-9-]+' | sort -u | wc -l)
  slug=$(echo "$path" | sed 's|/en/blog/||')
  if [ "$blog_links" -ge 1 ]; then
    PASS_BB=$((PASS_BB+1))
  else
    echo "  FAIL: $slug — 0 blog-to-blog links"
    FAIL_BB=$((FAIL_BB+1))
  fi
done
echo "  Blog → Blog: $PASS_BB/10 posts have blog cross-links"
echo ""

# ============================================================
# 4. PRODUCT → BLOG LINKS (RelatedBlogPosts on product pages)
# ============================================================
echo "--- 4. PRODUCT → BLOG LINKS (10 random products) ---"
PASS_PB=0
FAIL_PB=0
PROD_PATHS=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP '<loc>[^<]+/en/apps/[a-z][^<]+</loc>' | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed 's|https://www.lessoncraftstudio.com||' | shuf | head -10)
for path in $PROD_PATHS; do
  html=$(curl -s "http://localhost:3000${path}")
  blog_links=$(echo "$html" | grep -oP '/en/blog/[a-z][a-z0-9-]+' | sort -u | wc -l)
  slug=$(echo "$path" | sed 's|/en/apps/||')
  if [ "$blog_links" -ge 1 ]; then
    PASS_PB=$((PASS_PB+1))
  else
    echo "  WARN: $slug — 0 blog links on product page"
    FAIL_PB=$((FAIL_PB+1))
  fi
done
echo "  Product → Blog: $PASS_PB/10 products have blog links"
echo ""

# ============================================================
# 5. KEYWORD → PRODUCT MAPPING (check inline auto-links)
# ============================================================
echo "--- 5. INLINE AUTO-LINKS IN BLOG CONTENT ---"
PASS_KW=0
FAIL_KW=0
for path in $BLOG_SLUGS; do
  html=$(curl -s "http://localhost:3000${path}")
  # Count auto-injected product links within article body
  inline_links=$(echo "$html" | grep -oP '<a[^>]+href="/en/apps/[^"]+' | wc -l)
  slug=$(echo "$path" | sed 's|/en/blog/||')
  if [ "$inline_links" -ge 1 ]; then
    PASS_KW=$((PASS_KW+1))
  else
    FAIL_KW=$((FAIL_KW+1))
  fi
done
echo "  Inline auto-links: $PASS_KW/10 posts have keyword→product links in body"
echo ""

# ============================================================
# 6. BROKEN LINK CHECK (sample 20 internal links)
# ============================================================
echo "--- 6. BROKEN LINK CHECK (20 random internal links) ---"
# Grab links from a few pages
ALL_LINKS=$(curl -s "http://localhost:3000/en" | grep -oP 'href="/en/[^"]+' | sed 's/href="//' | sort -u | shuf | head -10)
ALL_LINKS="$ALL_LINKS $(curl -s "http://localhost:3000/en/blog" | grep -oP 'href="/en/[^"]+' | sed 's/href="//' | sort -u | shuf | head -10)"
OK_LINKS=0
BROKEN=0
for link in $ALL_LINKS; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${link}")
  if [ "$code" = "200" ] || [ "$code" = "304" ]; then
    OK_LINKS=$((OK_LINKS+1))
  else
    BROKEN=$((BROKEN+1))
    echo "  BROKEN ($code): $link"
  fi
done
TOTAL_CHECKED=$((OK_LINKS+BROKEN))
echo "  Broken links: $BROKEN/$TOTAL_CHECKED"
echo ""

# ============================================================
# SUMMARY
# ============================================================
echo "=== INTERNAL LINKING SUMMARY ==="
echo "  Homepage → Product: $PASS_HP/11 locales have 30+ app links"
echo "  Blog → Product: $PASS_BP/10 posts"
echo "  Blog → Blog: $PASS_BB/10 posts"
echo "  Product → Blog: $PASS_PB/10 products"
echo "  Inline auto-links: $PASS_KW/10 posts"
echo "  Broken links: $BROKEN found"
