#!/bin/bash
echo "================================================================"
echo "  PART 33: FINAL REGRESSION AUDIT — ALL PAGES × ALL LOCALES"
echo "================================================================"
echo ""
echo "Started: $(date)"
echo ""

TOTAL_PASS=0
TOTAL_FAIL=0
FAIL_DETAILS=""

pass() { TOTAL_PASS=$((TOTAL_PASS+1)); }
fail() { TOTAL_FAIL=$((TOTAL_FAIL+1)); FAIL_DETAILS="${FAIL_DETAILS}\n  FAIL: $1"; echo "  FAIL: $1"; }

# ============================================================
# A. HOMEPAGE CHECKS (11 locales)
# ============================================================
echo "=== A. HOMEPAGES (11 locales) ==="

for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}")

  # A1. H1 present
  h1=$(echo "$html" | grep -c '<h1 ')
  [ "$h1" -eq 1 ] && pass || fail "[$locale] homepage H1 count=$h1"

  # A2. Meta title
  title=$(echo "$html" | grep -oP '<title>[^<]+</title>' | head -1)
  [ -n "$title" ] && pass || fail "[$locale] homepage missing <title>"

  # A3. Meta description
  desc=$(echo "$html" | grep -c 'name="description"')
  [ "$desc" -ge 1 ] && pass || fail "[$locale] homepage missing meta description"

  # A4. Canonical
  canonical=$(echo "$html" | grep -oP 'rel="canonical"[^>]+href="https://www\.lessoncraftstudio\.com/' | wc -l)
  [ "$canonical" -ge 1 ] && pass || fail "[$locale] homepage bad canonical"

  # A5. Hreflang (12 = 11 locales + x-default)
  hreflang=$(echo "$html" | grep -oP 'hrefLang="[^"]+"' | wc -l)
  [ "$hreflang" -ge 12 ] && pass || fail "[$locale] homepage hreflang=$hreflang (expected 12)"

  # A6. OG image
  og=$(echo "$html" | grep -c 'property="og:image"')
  [ "$og" -ge 1 ] && pass || fail "[$locale] homepage missing og:image"

  # A7. Organization schema
  org=$(echo "$html" | grep -c '"@type":"Organization"')
  [ "$org" -ge 1 ] && pass || fail "[$locale] homepage missing Organization schema"

  # A8. 30+ product links
  app_links=$(echo "$html" | grep -oP "/${locale}/apps/[a-z][a-z0-9-]+" | grep -v '/category/' | grep -v '/grades/' | sort -u | wc -l)
  [ "$app_links" -ge 30 ] && pass || fail "[$locale] homepage only $app_links product links"

  # A9. No noindex
  noindex=$(echo "$html" | grep -ic 'noindex')
  [ "$noindex" -eq 0 ] && pass || fail "[$locale] homepage has noindex"

  # A10. No broken /help link
  help_link=$(echo "$html" | grep -c "/${locale}/help")
  [ "$help_link" -eq 0 ] && pass || fail "[$locale] homepage still has /help link"

  # A11. No opacity:0 on headings
  hidden_h=$(echo "$html" | python3 -c "
import sys, re
html = sys.stdin.read()
segs = re.split(r'(style=\"[^\"]*opacity:\s*0(?![.0-9])[^\"]*\")', html)
count = 0
for i in range(1, len(segs), 2):
    after = segs[i+1][:3000] if i+1 < len(segs) else ''
    if re.search(r'<h[1-6]', after): count += 1
print(count)
" 2>/dev/null)
  [ "$hidden_h" = "0" ] && pass || fail "[$locale] homepage $hidden_h hidden headings"
done

HP_PASS=$TOTAL_PASS
HP_FAIL=$TOTAL_FAIL
echo "  Homepage checks: $HP_PASS pass, $HP_FAIL fail (${HP_PASS} of $((HP_PASS+HP_FAIL)))"
echo ""

# ============================================================
# B. PRODUCT PAGES — Sample of 33 (1 per locale for 3 locales + extras)
# ============================================================
echo "=== B. PRODUCT PAGES (33 products × 3 locales = 99 spot-checks) ==="

B_START_PASS=$TOTAL_PASS
B_START_FAIL=$TOTAL_FAIL

for locale in en de fr; do
  prods=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||")

  for path in $prods; do
    html=$(curl -s "http://localhost:3000${path}")
    slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${path}")

    # B1. HTTP 200
    [ "$code" = "200" ] && pass || fail "[$locale] $slug HTTP $code"

    # B2. H1 present
    h1=$(echo "$html" | grep -c '<h1')
    [ "$h1" -eq 1 ] && pass || fail "[$locale] $slug H1 count=$h1"

    # B3. SoftwareApplication schema
    sw=$(echo "$html" | grep -c '"@type":"SoftwareApplication"')
    [ "$sw" -ge 1 ] && pass || fail "[$locale] $slug missing SoftwareApplication"

    # B4. BreadcrumbList schema
    bcl=$(echo "$html" | grep -c '"@type":"BreadcrumbList"')
    [ "$bcl" -ge 1 ] && pass || fail "[$locale] $slug missing BreadcrumbList"

    # B5. Sample images present
    samples=$(echo "$html" | grep -oP '/samples/[a-z]+/' | wc -l)
    [ "$samples" -ge 1 ] && pass || fail "[$locale] $slug no sample images"

    # B6. No hidden headings
    hidden_h=$(echo "$html" | python3 -c "
import sys, re
html = sys.stdin.read()
segs = re.split(r'(style=\"[^\"]*opacity:\s*0(?![.0-9])[^\"]*\")', html)
count = 0
for i in range(1, len(segs), 2):
    after = segs[i+1][:3000] if i+1 < len(segs) else ''
    if re.search(r'<h[1-6]', after): count += 1
print(count)
" 2>/dev/null)
    [ "$hidden_h" = "0" ] && pass || fail "[$locale] $slug $hidden_h hidden headings"
  done
done

B_PASS=$((TOTAL_PASS - B_START_PASS))
B_FAIL=$((TOTAL_FAIL - B_START_FAIL))
echo "  Product checks: $B_PASS pass, $B_FAIL fail"
echo ""

# ============================================================
# C. BLOG META QUALITY — ALL 112 posts × 11 locales via SQL
# ============================================================
echo "=== C. BLOG META QUALITY (1,232 posts via DB) ==="

C_START_PASS=$TOTAL_PASS
C_START_FAIL=$TOTAL_FAIL

PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -t -A -c "
SELECT 'total_posts', COUNT(*) FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'locales_checked', 11
" 2>/dev/null | while IFS='|' read -r key val; do
  echo "  $key: $val"
done

for locale in en de fr es pt it nl sv da no fi; do
  result=$(PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod -t -A -c "
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN length(translations->'${locale}'->>'metaTitle') BETWEEN 50 AND 60 THEN 1 ELSE 0 END) AS title_ok,
    SUM(CASE WHEN length(translations->'${locale}'->>'metaDescription') BETWEEN 120 AND 160 THEN 1 ELSE 0 END) AS desc_ok,
    SUM(CASE WHEN length(translations->'${locale}'->>'focusKeyword') > 3 THEN 1 ELSE 0 END) AS kw_ok,
    SUM(CASE WHEN translations->'${locale}'->>'metaTitle' LIKE '%Free Printable%' OR translations->'${locale}'->>'metaTitle' LIKE '%Worksheet%Generator%' THEN 1 ELSE 0 END) AS garbage,
    COUNT(*) - COUNT(DISTINCT translations->'${locale}'->>'metaTitle') AS dupe_titles,
    COUNT(*) - COUNT(DISTINCT translations->'${locale}'->>'focusKeyword') AS dupe_kw
  FROM blog_posts WHERE status = 'published';
  " 2>/dev/null)

  total=$(echo "$result" | cut -d'|' -f1)
  title_ok=$(echo "$result" | cut -d'|' -f2)
  desc_ok=$(echo "$result" | cut -d'|' -f3)
  kw_ok=$(echo "$result" | cut -d'|' -f4)
  garbage=$(echo "$result" | cut -d'|' -f5)
  dupe_titles=$(echo "$result" | cut -d'|' -f6)
  dupe_kw=$(echo "$result" | cut -d'|' -f7)

  # Titles 50-60 chars
  [ "$title_ok" = "$total" ] && pass || fail "[$locale] blog titles: $title_ok/$total in 50-60 range"

  # Descriptions 120-160 chars
  [ "$desc_ok" = "$total" ] && pass || fail "[$locale] blog descriptions: $desc_ok/$total in 120-160 range"

  # Keywords present
  [ "$kw_ok" = "$total" ] && pass || fail "[$locale] blog keywords: $kw_ok/$total present"

  # No garbage patterns
  [ "$garbage" = "0" ] && pass || fail "[$locale] blog garbage: $garbage still templated"

  # No duplicate titles
  [ "$dupe_titles" = "0" ] && pass || fail "[$locale] blog dupe titles: $dupe_titles"

  # No duplicate keywords
  [ "$dupe_kw" = "0" ] && pass || fail "[$locale] blog dupe keywords: $dupe_kw"
done

C_PASS=$((TOTAL_PASS - C_START_PASS))
C_FAIL=$((TOTAL_FAIL - C_START_FAIL))
echo "  Blog meta checks: $C_PASS pass, $C_FAIL fail (11 locales × 6 checks)"
echo ""

# ============================================================
# D. BLOG POSTS — SSR, schemas, links (2 per locale)
# ============================================================
echo "=== D. BLOG POSTS — SSR & SCHEMAS (2 × 11 locales) ==="

D_START_PASS=$TOTAL_PASS
D_START_FAIL=$TOTAL_FAIL

for locale in en de fr es pt it nl sv da no fi; do
  paths=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -2)
  for path in $paths; do
    html=$(curl -s "http://localhost:3000${path}")
    slug=$(echo "$path" | rev | cut -d/ -f1 | rev)

    # D1. HTTP 200
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${path}")
    [ "$code" = "200" ] && pass || fail "[$locale] blog $slug HTTP $code"

    # D2. H1 present
    h1=$(echo "$html" | grep -c '<h1')
    [ "$h1" -eq 1 ] && pass || fail "[$locale] blog $slug H1=$h1"

    # D3. BlogPosting schema
    bp=$(echo "$html" | grep -c '"@type":"BlogPosting"')
    [ "$bp" -ge 1 ] && pass || fail "[$locale] blog $slug missing BlogPosting"

    # D4. BreadcrumbList
    bcl=$(echo "$html" | grep -c '"@type":"BreadcrumbList"')
    [ "$bcl" -ge 1 ] && pass || fail "[$locale] blog $slug missing BreadcrumbList"

    # D5. Product links present
    prod_links=$(echo "$html" | grep -oP "/${locale}/apps/[a-z][a-z0-9-]+" | sort -u | wc -l)
    [ "$prod_links" -ge 1 ] && pass || fail "[$locale] blog $slug 0 product links"

    # D6. Blog cross-links
    blog_links=$(echo "$html" | grep -oP "/${locale}/blog/[a-z][a-z0-9-]+" | sort -u | wc -l)
    [ "$blog_links" -ge 1 ] && pass || fail "[$locale] blog $slug 0 blog cross-links"

    # D7. Hreflang
    hreflang=$(echo "$html" | grep -oP 'hrefLang="[^"]+"' | wc -l)
    [ "$hreflang" -ge 12 ] && pass || fail "[$locale] blog $slug hreflang=$hreflang"

    # D8. OG image
    og=$(echo "$html" | grep -c 'property="og:image"')
    [ "$og" -ge 1 ] && pass || fail "[$locale] blog $slug missing og:image"
  done
done

D_PASS=$((TOTAL_PASS - D_START_PASS))
D_FAIL=$((TOTAL_FAIL - D_START_FAIL))
echo "  Blog post checks: $D_PASS pass, $D_FAIL fail"
echo ""

# ============================================================
# E. BLOG LISTING & CATEGORY PAGES
# ============================================================
echo "=== E. BLOG LISTING & CATEGORY PAGES ==="

E_START_PASS=$TOTAL_PASS
E_START_FAIL=$TOTAL_FAIL

for locale in en de fr es pt it nl sv da no fi; do
  # Listing page
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/${locale}/blog")
  [ "$code" = "200" ] && pass || fail "[$locale] blog listing HTTP $code"

  html=$(curl -s "http://localhost:3000/${locale}/blog")
  # Alt text on images
  imgs_no_alt=$(echo "$html" | grep -oP '<img(?![^>]*alt=)[^>]*>' | wc -l)
  [ "$imgs_no_alt" -eq 0 ] && pass || fail "[$locale] blog listing $imgs_no_alt images without alt"

  # Category pages
  for cat in math literacy creativity fine-motor critical-thinking technology classroom-management; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/${locale}/blog/category/${cat}")
    [ "$code" = "200" ] && pass || fail "[$locale] category $cat HTTP $code"
  done
done

E_PASS=$((TOTAL_PASS - E_START_PASS))
E_FAIL=$((TOTAL_FAIL - E_START_FAIL))
echo "  Listing & category checks: $E_PASS pass, $E_FAIL fail"
echo ""

# ============================================================
# F. SITEMAP ACCURACY
# ============================================================
echo "=== F. SITEMAP ==="

F_START_PASS=$TOTAL_PASS
F_START_FAIL=$TOTAL_FAIL

sitemap=$(curl -s "http://localhost:3000/sitemap.xml")

# Total URLs
total_urls=$(echo "$sitemap" | grep -c '<loc>')
[ "$total_urls" -ge 1900 ] && pass || fail "sitemap only $total_urls URLs (expected 1900+)"

# No duplicates
dupes=$(echo "$sitemap" | grep -oP '<loc>[^<]+</loc>' | sort | uniq -d | wc -l)
[ "$dupes" -eq 0 ] && pass || fail "sitemap $dupes duplicate URLs"

# All HTTPS
http_only=$(echo "$sitemap" | grep -oP '<loc>[^<]+</loc>' | grep 'http://' | wc -l)
[ "$http_only" -eq 0 ] && pass || fail "sitemap $http_only HTTP-only URLs"

# All www
no_www=$(echo "$sitemap" | grep -oP '<loc>[^<]+</loc>' | grep -v 'www\.' | wc -l)
[ "$no_www" -eq 0 ] && pass || fail "sitemap $no_www URLs without www"

# x-default present
xdefault=$(echo "$sitemap" | grep -c 'x-default')
[ "$xdefault" -ge 100 ] && pass || fail "sitemap only $xdefault x-default entries"

# Lastmod on all
lastmod=$(echo "$sitemap" | grep -c '<lastmod>')
[ "$lastmod" -eq "$total_urls" ] && pass || fail "sitemap lastmod: $lastmod/$total_urls"

# Image sitemap
img_sitemap=$(curl -s "http://localhost:3000/sitemap-images.xml")
img_pages=$(echo "$img_sitemap" | grep -c '<url>')
[ "$img_pages" -ge 1500 ] && pass || fail "image sitemap only $img_pages pages"

# robots.txt has sitemaps
robots=$(curl -s "http://localhost:3000/robots.txt")
sitemap_refs=$(echo "$robots" | grep -c 'Sitemap:')
[ "$sitemap_refs" -ge 4 ] && pass || fail "robots.txt only $sitemap_refs sitemap refs"

F_PASS=$((TOTAL_PASS - F_START_PASS))
F_FAIL=$((TOTAL_FAIL - F_START_FAIL))
echo "  Sitemap checks: $F_PASS pass, $F_FAIL fail"
echo ""

# ============================================================
# G. BROKEN LINK CHECK (50 random links)
# ============================================================
echo "=== G. BROKEN LINK CHECK (50 links across locales) ==="

G_START_PASS=$TOTAL_PASS
G_START_FAIL=$TOTAL_FAIL

for locale in en de fr es pt it nl sv da no fi; do
  # Get 3-5 links from each locale's homepage
  links=$(curl -s "http://localhost:3000/${locale}" | grep -oP "href=\"/${locale}/[^\"#?]+" | sed 's/href="//' | sort -u | shuf | head -5)
  for link in $links; do
    if echo "$link" | grep -qP '\.(js|css|png|jpg|webp|svg|ico)$'; then continue; fi
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${link}")
    if [ "$code" = "200" ] || [ "$code" = "304" ] || [ "$code" = "301" ] || [ "$code" = "307" ] || [ "$code" = "308" ]; then
      pass
    else
      fail "broken link $code: $link"
    fi
  done
done

G_PASS=$((TOTAL_PASS - G_START_PASS))
G_FAIL=$((TOTAL_FAIL - G_START_FAIL))
echo "  Broken link checks: $G_PASS pass, $G_FAIL fail"
echo ""

# ============================================================
# H. CROSS-LOCALE CONSISTENCY
# ============================================================
echo "=== H. CROSS-LOCALE CONSISTENCY ==="

H_START_PASS=$TOTAL_PASS
H_START_FAIL=$TOTAL_FAIL

# Check that all locales have similar structure
for locale in en de fr es pt it nl sv da no fi; do
  # Same number of product pages in sitemap
  prod_count=$(echo "$sitemap" | grep -oP "<loc>[^<]*/${locale}/apps/[a-z][^<]*</loc>" | grep -v '/category/' | grep -v '/grades/' | wc -l)
  [ "$prod_count" -eq 33 ] && pass || fail "[$locale] $prod_count product pages (expected 33)"
done

# Reciprocal hreflang check (EN homepage should reference DE, and DE should reference EN)
en_html=$(curl -s "http://localhost:3000/en")
de_html=$(curl -s "http://localhost:3000/de")
en_refs_de=$(echo "$en_html" | grep -c 'hrefLang="de"')
de_refs_en=$(echo "$de_html" | grep -c 'hrefLang="en"')
[ "$en_refs_de" -ge 1 ] && pass || fail "EN homepage doesn't reference DE in hreflang"
[ "$de_refs_en" -ge 1 ] && pass || fail "DE homepage doesn't reference EN in hreflang"

# Check blog post count per locale in sitemap
for locale in en de fr es pt it nl sv da no fi; do
  blog_count=$(echo "$sitemap" | grep -oP "<loc>[^<]*/${locale}/blog/[a-z][^<]*</loc>" | grep -v '/category/' | wc -l)
  [ "$blog_count" -ge 100 ] && pass || fail "[$locale] only $blog_count blog posts in sitemap"
done

H_PASS=$((TOTAL_PASS - H_START_PASS))
H_FAIL=$((TOTAL_FAIL - H_START_FAIL))
echo "  Cross-locale checks: $H_PASS pass, $H_FAIL fail"
echo ""

# ============================================================
# I. SCHEMA VALIDATION SPOT-CHECK
# ============================================================
echo "=== I. SCHEMA VALIDATION (spot-check) ==="

I_START_PASS=$TOTAL_PASS
I_START_FAIL=$TOTAL_FAIL

for locale in en de fr; do
  # Product page
  path=$(echo "$sitemap" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")

  # Check for required schema types
  for stype in SoftwareApplication BreadcrumbList FAQPage HowTo ImageObject; do
    count=$(echo "$html" | grep -c "\"@type\":\"${stype}\"")
    [ "$count" -ge 1 ] && pass || fail "[$locale] product missing $stype schema"
  done

  # Blog post
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")

  for stype in BlogPosting BreadcrumbList LearningResource; do
    count=$(echo "$html" | grep -c "\"@type\":\"${stype}\"")
    [ "$count" -ge 1 ] && pass || fail "[$locale] blog missing $stype schema"
  done
done

I_PASS=$((TOTAL_PASS - I_START_PASS))
I_FAIL=$((TOTAL_FAIL - I_START_FAIL))
echo "  Schema checks: $I_PASS pass, $I_FAIL fail"
echo ""

# ============================================================
# J. IMAGE SEO FINAL CHECK
# ============================================================
echo "=== J. IMAGE SEO ==="

J_START_PASS=$TOTAL_PASS
J_START_FAIL=$TOTAL_FAIL

# Thumbnails complete
jpeg_count=$(find /var/www/lcs-media/samples -name '*.jpeg' | wc -l)
thumb_count=$(find /var/www/lcs-media/samples -name '*_thumb.webp' | wc -l)
preview_count=$(find /var/www/lcs-media/samples -name '*_preview.webp' | wc -l)

[ "$jpeg_count" -eq "$thumb_count" ] && pass || fail "thumbnail mismatch: $jpeg_count JPEG vs $thumb_count thumb"
[ "$jpeg_count" -eq "$preview_count" ] && pass || fail "preview mismatch: $jpeg_count JPEG vs $preview_count preview"
[ "$jpeg_count" -ge 4000 ] && pass || fail "only $jpeg_count JPEGs (expected 4000+)"

# No oversized files
oversized=$(find /var/www/lcs-media/samples -type f -size +5M 2>/dev/null | wc -l)
[ "$oversized" -eq 0 ] && pass || fail "$oversized files over 5MB"

# Blog listing alt text
for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}/blog")
  no_alt=$(echo "$html" | grep -oP '<img(?![^>]*alt=)[^>]*>' | wc -l)
  [ "$no_alt" -eq 0 ] && pass || fail "[$locale] blog listing $no_alt images without alt"
done

# OG images load
for locale in en de fr; do
  html=$(curl -s "http://localhost:3000/${locale}")
  og_url=$(echo "$html" | grep -oP 'property="og:image"[^>]+content="[^"]+"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//')
  if [ -z "$og_url" ]; then
    og_url=$(echo "$html" | grep -oP 'content="[^"]+"[^>]+property="og:image"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//')
  fi
  if [ -n "$og_url" ]; then
    code=$(curl -s -o /dev/null -w '%{http_code}' "$og_url")
    [ "$code" = "200" ] && pass || fail "[$locale] OG image HTTP $code"
  else
    fail "[$locale] no OG image URL found"
  fi
done

J_PASS=$((TOTAL_PASS - J_START_PASS))
J_FAIL=$((TOTAL_FAIL - J_START_FAIL))
echo "  Image SEO checks: $J_PASS pass, $J_FAIL fail"
echo ""

# ============================================================
# K. TECHNICAL SEO FINAL CHECK
# ============================================================
echo "=== K. TECHNICAL SEO ==="

K_START_PASS=$TOTAL_PASS
K_START_FAIL=$TOTAL_FAIL

# No redirect chains
for url in "http://localhost:3000/" "http://localhost:3000/en/" "http://localhost:3000/blog"; do
  hops=$(curl -s -L -o /dev/null -w '%{num_redirects}' "$url")
  [ "$hops" -le 1 ] && pass || fail "$url has $hops redirects (chain)"
done

# No mixed content
for locale in en de; do
  html=$(curl -s "http://localhost:3000/${locale}")
  http_refs=$(echo "$html" | grep -oP '(src|href)="http://(?!localhost)[^"]+' | wc -l)
  [ "$http_refs" -eq 0 ] && pass || fail "[$locale] homepage $http_refs mixed content refs"
done

# No noindex on public pages
for locale in en de fr; do
  for page in "/${locale}" "/${locale}/blog" "/${locale}/apps"; do
    html=$(curl -s "http://localhost:3000${page}")
    noindex=$(echo "$html" | grep -ic 'noindex')
    [ "$noindex" -eq 0 ] && pass || fail "$page has noindex"
  done
done

K_PASS=$((TOTAL_PASS - K_START_PASS))
K_FAIL=$((TOTAL_FAIL - K_START_FAIL))
echo "  Technical SEO checks: $K_PASS pass, $K_FAIL fail"
echo ""

# ============================================================
# FINAL SUMMARY
# ============================================================
echo "================================================================"
echo "  FINAL REGRESSION AUDIT — SUMMARY"
echo "================================================================"
echo ""
echo "  Total checks:  $((TOTAL_PASS + TOTAL_FAIL))"
echo "  PASSED:        $TOTAL_PASS"
echo "  FAILED:        $TOTAL_FAIL"
echo ""

if [ "$TOTAL_FAIL" -eq 0 ]; then
  echo "  ✅ ALL CHECKS PASSED — ZERO FAILURES"
else
  echo "  ❌ FAILURES FOUND:"
  echo -e "$FAIL_DETAILS"
fi

echo ""
echo "  Sections:"
echo "    A. Homepages:          $HP_PASS pass, $HP_FAIL fail"
echo "    B. Product pages:      $B_PASS pass, $B_FAIL fail"
echo "    C. Blog meta (DB):     $C_PASS pass, $C_FAIL fail"
echo "    D. Blog posts (SSR):   $D_PASS pass, $D_FAIL fail"
echo "    E. Listings/Categories: $E_PASS pass, $E_FAIL fail"
echo "    F. Sitemap:            $F_PASS pass, $F_FAIL fail"
echo "    G. Broken links:       $G_PASS pass, $G_FAIL fail"
echo "    H. Cross-locale:       $H_PASS pass, $H_FAIL fail"
echo "    I. Schemas:            $I_PASS pass, $I_FAIL fail"
echo "    J. Image SEO:          $J_PASS pass, $J_FAIL fail"
echo "    K. Technical SEO:      $K_PASS pass, $K_FAIL fail"
echo ""
echo "  Completed: $(date)"
echo "================================================================"
