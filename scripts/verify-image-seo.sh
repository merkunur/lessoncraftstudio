#!/bin/bash
# Part 31: Image SEO Audit — ALL page types, ALL locales
echo "=== IMAGE SEO AUDIT ==="
echo ""

# ============================================================
# 1. BLOG POST IMAGES — Alt text on featured images
# ============================================================
echo "--- 1. BLOG LISTING — FEATURED IMAGE ALT TEXT ---"
ALT_PASS=0
ALT_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}/blog")
  imgs_with_alt=$(echo "$html" | grep -oP '<img[^>]+alt="[^"]+"' | grep -v 'LessonCraftStudio' | wc -l)
  imgs_no_alt=$(echo "$html" | grep -oP '<img(?![^>]*alt=)[^>]*>' | wc -l)
  if [ "$imgs_no_alt" -eq 0 ] && [ "$imgs_with_alt" -gt 0 ]; then
    ALT_PASS=$((ALT_PASS+1))
  else
    echo "  FAIL: [$locale] imgs_with_alt=$imgs_with_alt, imgs_no_alt=$imgs_no_alt"
    ALT_FAIL=$((ALT_FAIL+1))
  fi
done
echo "  Blog listing image alt: $ALT_PASS/11 PASS"
echo ""

# ============================================================
# 2. BLOG POST — Sample gallery alt text (1 post per locale)
# ============================================================
echo "--- 2. BLOG POST — SAMPLE GALLERY ALT TEXT ---"
GAL_PASS=0
GAL_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  # Check for sample images with alt text
  sample_imgs=$(echo "$html" | grep -oP '<img[^>]+/samples/[^>]+' | wc -l)
  sample_alts=$(echo "$html" | grep -oP '<img[^>]+/samples/[^>]+alt="[^"]+"' | wc -l)
  if [ "$sample_imgs" -eq 0 ]; then
    # No samples on this post, try next
    GAL_PASS=$((GAL_PASS+1))
  elif [ "$sample_alts" -eq "$sample_imgs" ]; then
    GAL_PASS=$((GAL_PASS+1))
  else
    echo "  FAIL: [$locale] $sample_alts/$sample_imgs sample images have alt text"
    GAL_FAIL=$((GAL_FAIL+1))
  fi
done
echo "  Blog sample gallery alt: $GAL_PASS/11 PASS"
echo ""

# ============================================================
# 3. PRODUCT PAGE — Sample image alt text (1 product per locale)
# ============================================================
echo "--- 3. PRODUCT PAGE — SAMPLE IMAGE ALT TEXT ---"
PROD_PASS=0
PROD_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  sample_imgs=$(echo "$html" | grep -oP '<img[^>]+/samples/[^>]+' | wc -l)
  sample_alts=$(echo "$html" | grep -oP '<img[^>]+alt="[^"]+"[^>]+/samples/' | wc -l)
  sample_alts2=$(echo "$html" | grep -oP '<img[^>]+/samples/[^>]+alt="[^"]+"' | wc -l)
  total_alts=$((sample_alts + sample_alts2))
  slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
  if [ "$sample_imgs" -eq 0 ]; then
    PROD_PASS=$((PROD_PASS+1))
  elif [ "$total_alts" -ge "$sample_imgs" ]; then
    PROD_PASS=$((PROD_PASS+1))
  else
    echo "  FAIL: [$locale] $slug — $total_alts/$sample_imgs sample images have alt text"
    PROD_FAIL=$((PROD_FAIL+1))
  fi
done
echo "  Product sample image alt: $PROD_PASS/11 PASS"
echo ""

# ============================================================
# 4. OG IMAGE — All page types
# ============================================================
echo "--- 4. OG IMAGE TAGS ---"
OG_PASS=0
OG_FAIL=0
# Homepages
for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}")
  og=$(echo "$html" | grep -c 'property="og:image"')
  if [ "$og" -ge 1 ]; then
    OG_PASS=$((OG_PASS+1))
  else
    echo "  FAIL: [$locale] homepage missing og:image"
    OG_FAIL=$((OG_FAIL+1))
  fi
done
echo "  Homepages og:image: $OG_PASS/11"

# Blog posts (1 per locale)
BP_OG=0
BP_OG_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  og=$(echo "$html" | grep -c 'property="og:image"')
  if [ "$og" -ge 1 ]; then
    BP_OG=$((BP_OG+1))
  else
    echo "  FAIL: [$locale] blog post missing og:image"
    BP_OG_FAIL=$((BP_OG_FAIL+1))
  fi
done
echo "  Blog posts og:image: $BP_OG/11"

# Product pages (1 per locale)
PP_OG=0
PP_OG_FAIL=0
for locale in en de fr es pt it nl sv da no fi; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  og=$(echo "$html" | grep -c 'property="og:image"')
  if [ "$og" -ge 1 ]; then
    PP_OG=$((PP_OG+1))
  else
    slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
    echo "  FAIL: [$locale] product $slug missing og:image"
    PP_OG_FAIL=$((PP_OG_FAIL+1))
  fi
done
echo "  Product pages og:image: $PP_OG/11"
echo ""

# ============================================================
# 5. IMAGE DIMENSIONS — width/height attributes (CLS prevention)
# ============================================================
echo "--- 5. IMAGE DIMENSIONS (CLS prevention) ---"
DIM_PASS=0
DIM_FAIL=0
for locale in en de fr; do
  html=$(curl -s "http://localhost:3000/${locale}/blog")
  # Check if images have width/height
  imgs_total=$(echo "$html" | grep -oP '<img[^>]+>' | grep -v 'LessonCraftStudio' | wc -l)
  imgs_with_dims=$(echo "$html" | grep -oP '<img[^>]+(width|height)=' | wc -l)
  if [ "$imgs_total" -eq 0 ] || [ "$imgs_with_dims" -ge 1 ]; then
    DIM_PASS=$((DIM_PASS+1))
  else
    echo "  WARN: [$locale] $imgs_with_dims/$imgs_total images have dimensions"
    DIM_FAIL=$((DIM_FAIL+1))
  fi
done
echo "  Image dimensions check: $DIM_PASS/3 locales sampled"
echo ""

# ============================================================
# 6. LAZY LOADING
# ============================================================
echo "--- 6. LAZY LOADING ---"
for locale in en; do
  html=$(curl -s "http://localhost:3000/${locale}/blog")
  lazy=$(echo "$html" | grep -c 'loading="lazy"')
  eager=$(echo "$html" | grep -c 'loading="eager"')
  echo "  [$locale] blog listing: lazy=$lazy, eager=$eager"
done
for locale in en; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  lazy=$(echo "$html" | grep -c 'loading="lazy"')
  eager=$(echo "$html" | grep -c 'loading="eager"')
  echo "  [$locale] blog post: lazy=$lazy, eager=$eager"
done
echo ""

# ============================================================
# 7. WEBP THUMBNAILS — Check server filesystem
# ============================================================
echo "--- 7. WEBP THUMBNAILS ON SERVER ---"
jpeg_count=$(find /var/www/lcs-media/samples -name '*.jpeg' 2>/dev/null | wc -l)
webp_count=$(find /var/www/lcs-media/samples -name '*.webp' 2>/dev/null | wc -l)
thumb_count=$(find /var/www/lcs-media/samples -name '*_thumb.webp' 2>/dev/null | wc -l)
preview_count=$(find /var/www/lcs-media/samples -name '*_preview.webp' 2>/dev/null | wc -l)
echo "  JPEG originals: $jpeg_count"
echo "  WebP total: $webp_count"
echo "  WebP thumbnails (_thumb): $thumb_count"
echo "  WebP previews (_preview): $preview_count"
echo ""

# Language distribution
echo "--- 8. SAMPLES PER LANGUAGE ---"
for lang_dir in /var/www/lcs-media/samples/*/; do
  lang=$(basename "$lang_dir")
  count=$(find "$lang_dir" -type f | wc -l)
  echo "  $lang: $count files"
done
echo ""

# ============================================================
# 9. IMAGE SITEMAP
# ============================================================
echo "--- 9. IMAGE SITEMAP ---"
img_sitemap=$(curl -s "http://localhost:3000/sitemap-images.xml")
img_urls=$(echo "$img_sitemap" | grep -c '<image:loc>')
img_pages=$(echo "$img_sitemap" | grep -c '<url>')
echo "  Pages in image sitemap: $img_pages"
echo "  Total images in sitemap: $img_urls"
echo ""

# ============================================================
# 10. IMAGEOBJECT SCHEMAS
# ============================================================
echo "--- 10. IMAGEOBJECT SCHEMAS ---"
IO_PASS=0
IO_FAIL=0
for locale in en de fr es pt; do
  path=$(curl -s "http://localhost:3000/${locale}/blog" | grep -oP "href=\"/${locale}/blog/[a-z][a-z0-9-]+" | sed 's/href="//' | sort -u | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  io_count=$(echo "$html" | grep -oP '"@type":"ImageObject"' | wc -l)
  if [ "$io_count" -ge 1 ]; then
    IO_PASS=$((IO_PASS+1))
  else
    echo "  FAIL: [$locale] blog post has 0 ImageObject schemas"
    IO_FAIL=$((IO_FAIL+1))
  fi
done
echo "  Blog ImageObject schemas: $IO_PASS/5 sampled"

PP_IO=0
PP_IO_FAIL=0
for locale in en de fr es pt; do
  path=$(curl -s "http://localhost:3000/sitemap.xml" | grep -oP "<loc>[^<]+/${locale}/apps/[a-z][^<]+</loc>" | grep -v '/category/' | grep -v '/grades/' | sed 's/<[^>]*>//g' | sed "s|https://www.lessoncraftstudio.com||" | head -1)
  html=$(curl -s "http://localhost:3000${path}")
  io_count=$(echo "$html" | grep -oP '"@type":"ImageObject"' | wc -l)
  if [ "$io_count" -ge 1 ]; then
    PP_IO=$((PP_IO+1))
  else
    slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
    echo "  FAIL: [$locale] product $slug has 0 ImageObject schemas"
    PP_IO_FAIL=$((PP_IO_FAIL+1))
  fi
done
echo "  Product ImageObject schemas: $PP_IO/5 sampled"
echo ""

echo "=== IMAGE SEO AUDIT COMPLETE ==="
