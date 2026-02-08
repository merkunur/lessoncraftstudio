#!/bin/bash
# Deep image SEO checks — localized alt text quality, schema details, oversized images

echo "=== DEEP IMAGE SEO CHECKS ==="
echo ""

# ============================================================
# 1. ALT TEXT LOCALIZATION QUALITY — verify alt is in correct language
# ============================================================
echo "--- 1. ALT TEXT LOCALIZATION QUALITY ---"
for locale in en de fr es fi; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  # Get first sample image alt
  first_alt=$(echo "$html" | grep -oP '<img[^>]+/samples/[^>]+' | head -1 | grep -oP 'alt="[^"]+"')
  echo "  [$locale] $first_alt"
done
echo ""

# ============================================================
# 2. IMAGEOBJECT SCHEMA QUALITY — check @id, inLanguage, description
# ============================================================
echo "--- 2. IMAGEOBJECT SCHEMA DETAIL (EN blog post) ---"
path=$(curl -s "http://localhost:3000/en/blog" | grep -oP 'href="/en/blog/[a-z][a-z0-9-]+' | sed 's/href="//' | sort -u | head -1)
html=$(curl -s "http://localhost:3000${path}")
# Extract first ImageObject schema
echo "$html" | grep -oP '"@type":"ImageObject"[^}]+\}' | head -1 | python3 -c "
import sys, json
raw = sys.stdin.read()
# Wrap in braces if needed
if not raw.startswith('{'):
    raw = '{' + raw
try:
    obj = json.loads(raw)
    for k,v in obj.items():
        if isinstance(v, str) and len(v) > 80:
            v = v[:80] + '...'
        print(f'  {k}: {v}')
except:
    print('  (could not parse)')
" 2>/dev/null || echo "  (parsing skipped)"
echo ""

# ============================================================
# 3. PRODUCT PAGE IMAGEOBJECT SCHEMA COUNT
# ============================================================
echo "--- 3. PRODUCT PAGE IMAGEOBJECT SCHEMA COUNT ---"
for locale in en de fr; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  io_count=$(echo "$html" | grep -oP '"@type":"ImageObject"' | wc -l)
  ig_count=$(echo "$html" | grep -oP '"@type":"ImageGallery"' | wc -l)
  slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
  echo "  [$locale] $slug: $io_count ImageObject, $ig_count ImageGallery"
done
echo ""

# ============================================================
# 4. OVERSIZED FILES CHECK — any file > 5MB?
# ============================================================
echo "--- 4. OVERSIZED FILES CHECK (>5MB) ---"
oversized=$(find /var/www/lcs-media/samples -type f -size +5M 2>/dev/null)
if [ -z "$oversized" ]; then
  echo "  No files over 5MB — PASS"
else
  echo "$oversized" | while read -r f; do
    size=$(du -h "$f" | cut -f1)
    echo "  WARN: $f ($size)"
  done
fi
echo ""

# ============================================================
# 5. THUMBNAIL COMPLETENESS — every JPEG has a _thumb.webp and _preview.webp?
# ============================================================
echo "--- 5. THUMBNAIL COMPLETENESS ---"
MISSING_THUMB=0
MISSING_PREVIEW=0
TOTAL_JPEGS=0
for jpeg in $(find /var/www/lcs-media/samples -name '*.jpeg' | head -200); do
  TOTAL_JPEGS=$((TOTAL_JPEGS+1))
  base="${jpeg%.jpeg}"
  if [ ! -f "${base}_thumb.webp" ]; then
    MISSING_THUMB=$((MISSING_THUMB+1))
    if [ "$MISSING_THUMB" -le 3 ]; then
      echo "  Missing thumb: $jpeg"
    fi
  fi
  if [ ! -f "${base}_preview.webp" ]; then
    MISSING_PREVIEW=$((MISSING_PREVIEW+1))
    if [ "$MISSING_PREVIEW" -le 3 ]; then
      echo "  Missing preview: $jpeg"
    fi
  fi
done
echo "  Checked: $TOTAL_JPEGS JPEGs (sample of 200)"
echo "  Missing thumbnails: $MISSING_THUMB"
echo "  Missing previews: $MISSING_PREVIEW"
echo ""

# ============================================================
# 6. OG IMAGE ACCESSIBILITY — do OG images actually load?
# ============================================================
echo "--- 6. OG IMAGE HTTP CHECK ---"
OG_OK=0
OG_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}")
  og_url=$(echo "$html" | grep -oP 'property="og:image"[^>]+content="[^"]+"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//')
  if [ -z "$og_url" ]; then
    og_url=$(echo "$html" | grep -oP 'content="[^"]+"[^>]+property="og:image"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//')
  fi
  if [ -n "$og_url" ]; then
    code=$(curl -s -o /dev/null -w '%{http_code}' "$og_url")
    if [ "$code" = "200" ]; then
      OG_OK=$((OG_OK+1))
    else
      echo "  FAIL: [$locale] og:image $code — $og_url"
      OG_FAIL=$((OG_FAIL+1))
    fi
  else
    echo "  FAIL: [$locale] no og:image found"
    OG_FAIL=$((OG_FAIL+1))
  fi
done
echo "  Homepage OG images: $OG_OK/11 load OK"
echo ""

# Blog post OG images
echo "--- 7. BLOG OG IMAGE HTTP CHECK ---"
BOG_OK=0
BOG_FAIL=0
for locale in en de fr; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  og_url=$(echo "$html" | grep -oP 'property="og:image"[^>]+content="[^"]+"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//' | head -1)
  if [ -z "$og_url" ]; then
    og_url=$(echo "$html" | grep -oP 'content="[^"]+"[^>]+property="og:image"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//' | head -1)
  fi
  if [ -n "$og_url" ]; then
    code=$(curl -s -o /dev/null -w '%{http_code}' "$og_url")
    if [ "$code" = "200" ]; then
      BOG_OK=$((BOG_OK+1))
    else
      echo "  FAIL: [$locale] og:image $code — $og_url"
      BOG_FAIL=$((BOG_FAIL+1))
    fi
  else
    echo "  WARN: [$locale] no og:image found on blog post"
    BOG_FAIL=$((BOG_FAIL+1))
  fi
done
echo "  Blog OG images: $BOG_OK/3 load OK"
echo ""

# Product OG images
echo "--- 8. PRODUCT OG IMAGE HTTP CHECK ---"
POG_OK=0
POG_FAIL=0
for locale in en de fr; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  og_url=$(echo "$html" | grep -oP 'property="og:image"[^>]+content="[^"]+"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//' | head -1)
  if [ -z "$og_url" ]; then
    og_url=$(echo "$html" | grep -oP 'content="[^"]+"[^>]+property="og:image"' | grep -oP 'content="[^"]+"' | sed 's/content="//' | sed 's/"$//' | head -1)
  fi
  if [ -n "$og_url" ]; then
    code=$(curl -s -o /dev/null -w '%{http_code}' "$og_url")
    if [ "$code" = "200" ]; then
      POG_OK=$((POG_OK+1))
    else
      echo "  FAIL: [$locale] og:image $code — $og_url"
      POG_FAIL=$((POG_FAIL+1))
    fi
  else
    echo "  WARN: [$locale] no og:image on product page"
    POG_FAIL=$((POG_FAIL+1))
  fi
done
echo "  Product OG images: $POG_OK/3 load OK"
echo ""

# ============================================================
# 9. NOSCRIPT FALLBACK ON PRODUCT PAGES
# ============================================================
echo "--- 9. NOSCRIPT IMAGE FALLBACK ---"
for locale in en; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  noscript_imgs=$(echo "$html" | grep -oP '<noscript>.*?</noscript>' | grep -oP '<img[^>]+>' | wc -l)
  slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
  echo "  [$locale] $slug: $noscript_imgs noscript <img> tags"
done
echo ""

echo "=== DEEP IMAGE SEO CHECKS COMPLETE ==="
