#!/bin/bash
echo "=== TECHNICAL SEO AUDIT ==="
echo ""

# ============================================================
# 1. ROBOTS.TXT
# ============================================================
echo "--- 1. ROBOTS.TXT ---"
robots=$(curl -s "http://localhost:3000/robots.txt")
echo "$robots"
echo ""

# Check essentials
has_sitemap=$(echo "$robots" | grep -c 'Sitemap:')
has_allow=$(echo "$robots" | grep -c 'Allow:')
has_disallow_api=$(echo "$robots" | grep -c 'Disallow: /api')
echo "Sitemap references: $has_sitemap"
echo "Allow directives: $has_allow"
echo "Disallows /api: $has_disallow_api"
echo ""

# ============================================================
# 2. ROBOTS META TAGS — pages should be index,follow
# ============================================================
echo "--- 2. ROBOTS META TAGS ---"
NOINDEX=0
for locale in en de fr es pt it nl sv da no fi; do
  for page in "/${locale}" "/${locale}/blog" "/${locale}/apps/word-search-worksheets"; do
    html=$(curl -s "http://localhost:3000${page}")
    noindex=$(echo "$html" | grep -i 'noindex' | wc -l)
    if [ "$noindex" -gt 0 ]; then
      echo "  NOINDEX found: $page"
      NOINDEX=$((NOINDEX+1))
    fi
  done
done
if [ "$NOINDEX" -eq 0 ]; then
  echo "  No noindex tags found on public pages — PASS"
else
  echo "  FAIL: $NOINDEX pages have noindex"
fi
echo ""

# ============================================================
# 3. SSR VERIFICATION — critical content in server-rendered HTML
# ============================================================
echo "--- 3. SSR VERIFICATION ---"
SSR_PASS=0
SSR_FAIL=0

# Homepage H1
for locale in en de fr; do
  html=$(curl -s "http://localhost:3000/${locale}")
  h1=$(echo "$html" | grep -oP '<h1[^>]*>[^<]+</h1>' | head -1)
  if [ -n "$h1" ]; then
    SSR_PASS=$((SSR_PASS+1))
  else
    echo "  FAIL: [$locale] homepage H1 not in SSR HTML"
    SSR_FAIL=$((SSR_FAIL+1))
  fi
done

# Product page H1 + description
for locale in en de fr; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  h1=$(echo "$html" | grep -oP '<h1[^>]*>.*?</h1>' | head -1)
  if [ -n "$h1" ]; then
    SSR_PASS=$((SSR_PASS+1))
  else
    echo "  FAIL: [$locale] product H1 not in SSR HTML"
    SSR_FAIL=$((SSR_FAIL+1))
  fi
done

# Blog post H1 + content
for locale in en de fr; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  h1=$(echo "$html" | grep -oP '<h1[^>]*>.*?</h1>' | head -1)
  article=$(echo "$html" | grep -c '<article')
  if [ -n "$h1" ] && [ "$article" -ge 1 ]; then
    SSR_PASS=$((SSR_PASS+1))
  else
    echo "  FAIL: [$locale] blog H1/article not in SSR HTML"
    SSR_FAIL=$((SSR_FAIL+1))
  fi
done

echo "  SSR checks: $SSR_PASS/$((SSR_PASS+SSR_FAIL)) PASS"
echo ""

# ============================================================
# 4. JSON-LD SCHEMAS IN SSR HTML
# ============================================================
echo "--- 4. JSON-LD SCHEMAS IN SSR ---"
SCHEMA_PASS=0
SCHEMA_FAIL=0

# Homepage schemas
html=$(curl -s "http://localhost:3000/en")
org=$(echo "$html" | grep -c '"@type":"Organization"')
website=$(echo "$html" | grep -c '"@type":"WebSite"')
software=$(echo "$html" | grep -c '"@type":"SoftwareApplication"')
echo "  Homepage schemas: Organization=$org WebSite=$website SoftwareApplication=$software"
if [ "$org" -ge 1 ] && [ "$website" -ge 1 ]; then
  SCHEMA_PASS=$((SCHEMA_PASS+1))
else
  SCHEMA_FAIL=$((SCHEMA_FAIL+1))
fi

# Product page schemas
path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/en/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
html=$(curl -s "http://localhost:3000${path}")
sw=$(echo "$html" | grep -c '"@type":"SoftwareApplication"')
bcl=$(echo "$html" | grep -c '"@type":"BreadcrumbList"')
faq=$(echo "$html" | grep -c '"@type":"FAQPage"')
howto=$(echo "$html" | grep -c '"@type":"HowTo"')
echo "  Product schemas: SoftwareApp=$sw Breadcrumb=$bcl FAQ=$faq HowTo=$howto"
if [ "$sw" -ge 1 ] && [ "$bcl" -ge 1 ]; then
  SCHEMA_PASS=$((SCHEMA_PASS+1))
else
  SCHEMA_FAIL=$((SCHEMA_FAIL+1))
fi

# Blog post schemas
path=$(curl -s "http://localhost:3000/en/blog" | grep -oP 'href="/en/blog/[a-z][a-z0-9-]+' | sed 's/href="//' | sort -u | head -1)
html=$(curl -s "http://localhost:3000${path}")
bp=$(echo "$html" | grep -c '"@type":"BlogPosting"')
lr=$(echo "$html" | grep -c '"@type":"LearningResource"')
bcl2=$(echo "$html" | grep -c '"@type":"BreadcrumbList"')
echo "  Blog schemas: BlogPosting=$bp LearningResource=$lr Breadcrumb=$bcl2"
if [ "$bp" -ge 1 ] && [ "$bcl2" -ge 1 ]; then
  SCHEMA_PASS=$((SCHEMA_PASS+1))
else
  SCHEMA_FAIL=$((SCHEMA_FAIL+1))
fi

echo "  Schema SSR checks: $SCHEMA_PASS/$((SCHEMA_PASS+SCHEMA_FAIL)) PASS"
echo ""

# ============================================================
# 5. HTTP STATUS CODES — sample across page types
# ============================================================
echo "--- 5. HTTP STATUS CODES ---"
OK_COUNT=0
REDIRECT_COUNT=0
ERROR_COUNT=0
ERROR_LIST=""

# Homepages
for locale in en de fr es pt it nl sv da no fi; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/${locale}")
  if [ "$code" = "200" ]; then
    OK_COUNT=$((OK_COUNT+1))
  else
    ERROR_COUNT=$((ERROR_COUNT+1))
    ERROR_LIST="${ERROR_LIST}\n  ${code}: /${locale}"
  fi
done

# Key pages
for page in /en/blog /en/apps /en/pricing /en/terms /en/privacy /en/contact /en/faq /en/license; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${page}")
  if [ "$code" = "200" ]; then
    OK_COUNT=$((OK_COUNT+1))
  else
    ERROR_COUNT=$((ERROR_COUNT+1))
    ERROR_LIST="${ERROR_LIST}\n  ${code}: ${page}"
  fi
done

# Random products
for locale in en de fr es; do
  paths=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | shuf | head -3)
  for path in $paths; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${path}")
    if [ "$code" = "200" ]; then
      OK_COUNT=$((OK_COUNT+1))
    else
      ERROR_COUNT=$((ERROR_COUNT+1))
      ERROR_LIST="${ERROR_LIST}\n  ${code}: ${path}"
    fi
  done
done

# Random blog posts
for locale in en de fr; do
  paths=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/blog/[a-z][^<]+</loc>" | grep -v '/category/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | shuf | head -3)
  for path in $paths; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${path}")
    if [ "$code" = "200" ]; then
      OK_COUNT=$((OK_COUNT+1))
    else
      ERROR_COUNT=$((ERROR_COUNT+1))
      ERROR_LIST="${ERROR_LIST}\n  ${code}: ${path}"
    fi
  done
done

TOTAL=$((OK_COUNT+ERROR_COUNT))
echo "  Checked: $TOTAL URLs"
echo "  200 OK: $OK_COUNT"
echo "  Errors: $ERROR_COUNT"
if [ -n "$ERROR_LIST" ]; then
  echo -e "  Error details:${ERROR_LIST}"
fi
echo ""

# ============================================================
# 6. REDIRECT CHAINS — check for double redirects
# ============================================================
echo "--- 6. REDIRECT CHAIN CHECK ---"
CHAIN_COUNT=0
# Test common redirect patterns
for url in "http://localhost:3000/" "http://localhost:3000/en/" "http://localhost:3000/blog" "http://localhost:3000/apps"; do
  # Follow redirects, count hops
  hops=$(curl -s -L -o /dev/null -w '%{num_redirects}' "$url")
  if [ "$hops" -gt 1 ]; then
    echo "  WARN: $url — $hops redirects (chain)"
    CHAIN_COUNT=$((CHAIN_COUNT+1))
  fi
done
if [ "$CHAIN_COUNT" -eq 0 ]; then
  echo "  No redirect chains found — PASS"
fi
echo ""

# ============================================================
# 7. MIXED CONTENT CHECK — HTTP references in HTTPS pages
# ============================================================
echo "--- 7. MIXED CONTENT CHECK ---"
MIXED=0
for locale in en de; do
  html=$(curl -s "http://localhost:3000/${locale}")
  # Check for http:// in src or href (excluding localhost)
  http_refs=$(echo "$html" | grep -oP '(src|href)="http://(?!localhost)[^"]+' | wc -l)
  if [ "$http_refs" -gt 0 ]; then
    echo "  WARN: [$locale] homepage has $http_refs HTTP references"
    echo "$html" | grep -oP '(src|href)="http://(?!localhost)[^"]+' | head -3
    MIXED=$((MIXED+1))
  fi
done
for locale in en; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  http_refs=$(echo "$html" | grep -oP '(src|href)="http://(?!localhost)[^"]+' | wc -l)
  if [ "$http_refs" -gt 0 ]; then
    echo "  WARN: [$locale] blog post has $http_refs HTTP references"
    echo "$html" | grep -oP '(src|href)="http://(?!localhost)[^"]+' | head -3
    MIXED=$((MIXED+1))
  fi
done
if [ "$MIXED" -eq 0 ]; then
  echo "  No mixed content found — PASS"
fi
echo ""

# ============================================================
# 8. CANONICAL URLS
# ============================================================
echo "--- 8. CANONICAL URL CHECK ---"
CAN_PASS=0
CAN_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}")
  canonical=$(echo "$html" | grep -oP 'rel="canonical"[^>]+href="[^"]+"' | grep -oP 'href="[^"]+"' | sed 's/href="//' | sed 's/"$//')
  if [ -z "$canonical" ]; then
    canonical=$(echo "$html" | grep -oP 'href="[^"]+"[^>]+rel="canonical"' | grep -oP 'href="[^"]+"' | sed 's/href="//' | sed 's/"$//')
  fi
  if echo "$canonical" | grep -qP '^https://www\.lessoncraftstudio\.com/'; then
    CAN_PASS=$((CAN_PASS+1))
  else
    echo "  FAIL: [$locale] canonical=$canonical"
    CAN_FAIL=$((CAN_FAIL+1))
  fi
done
echo "  Homepage canonicals: $CAN_PASS/11 correct (https://www.)"
echo ""

# ============================================================
# 9. HEADING HIERARCHY
# ============================================================
echo "--- 9. HEADING HIERARCHY ---"
HEAD_PASS=0
HEAD_FAIL=0
for locale in en de fr; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  h1_count=$(echo "$html" | grep -oP '<h1[^>]*>' | wc -l)
  h2_count=$(echo "$html" | grep -oP '<h2[^>]*>' | wc -l)
  h3_count=$(echo "$html" | grep -oP '<h3[^>]*>' | wc -l)
  if [ "$h1_count" -eq 1 ] && [ "$h2_count" -ge 1 ]; then
    HEAD_PASS=$((HEAD_PASS+1))
  else
    echo "  WARN: [$locale] h1=$h1_count h2=$h2_count h3=$h3_count"
    HEAD_FAIL=$((HEAD_FAIL+1))
  fi
done
echo "  Heading hierarchy: $HEAD_PASS/3 blog posts correct"
echo ""

# ============================================================
# 10. FRAMER MOTION OPACITY:0 CHECK
# ============================================================
echo "--- 10. FRAMER MOTION OPACITY:0 ---"
OP_TOTAL=0
for locale in en; do
  # Homepage
  html=$(curl -s "http://localhost:3000/${locale}")
  hp_op=$(echo "$html" | grep -oP 'style="[^"]*opacity:\s*0[^.0-9][^"]*"' | wc -l)
  echo "  Homepage: $hp_op elements with opacity:0"
  OP_TOTAL=$((OP_TOTAL+hp_op))

  # Product page
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  pp_op=$(echo "$html" | grep -oP 'style="[^"]*opacity:\s*0[^.0-9][^"]*"' | wc -l)
  echo "  Product page: $pp_op elements with opacity:0"
  OP_TOTAL=$((OP_TOTAL+pp_op))

  # Blog post
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  bp_op=$(echo "$html" | grep -oP 'style="[^"]*opacity:\s*0[^.0-9][^"]*"' | wc -l)
  echo "  Blog post: $bp_op elements with opacity:0"
  OP_TOTAL=$((OP_TOTAL+bp_op))
done

# Check WHAT has opacity:0
echo ""
echo "  Elements with opacity:0 on product page:"
path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/en/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
html=$(curl -s "http://localhost:3000${path}")
echo "$html" | grep -oP '<[a-z]+[^>]*style="[^"]*opacity:\s*0[^.0-9][^"]*"[^>]*>' | sed 's/style="[^"]*"/.../g' | sed 's/ class="[^"]*"//g' | head -10
echo ""

echo "=== TECHNICAL SEO AUDIT COMPLETE ==="
