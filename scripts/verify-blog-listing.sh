#!/bin/bash
# Verify blog listing pages across all 11 locales

LOCALES="en de fr es pt it nl sv da no fi"
OK=0
FAIL=0
ISSUES=""

for locale in $LOCALES; do
  url="http://localhost:3000/${locale}/blog"
  code=$(curl -s -o /dev/null -w '%{http_code}' "$url")
  html=$(curl -s "$url")

  # Extract title
  title=$(echo "$html" | grep -oP '(?<=<title>)[^<]+' | head -1)
  title_len=${#title}

  # Extract meta description
  desc=$(echo "$html" | grep -oP '(?<=<meta name="description" content=")[^"]+' | head -1)
  desc_len=${#desc}

  # Check CollectionPage schema
  has_collection=$(echo "$html" | grep -c 'CollectionPage')

  # Check canonical
  canonical=$(echo "$html" | grep -oP '(?<=<link rel="canonical" href=")[^"]+' | head -1)

  # Check hreflang count
  hreflang_count=$(echo "$html" | grep -c 'hreflang=')

  # Check og:type
  og_type=$(echo "$html" | grep -oP '(?<=<meta property="og:type" content=")[^"]+' | head -1)

  # Check for post links in server HTML
  post_links=$(echo "$html" | grep -c "/${locale}/blog/[a-z]")

  # Check alt text on images
  img_alt_count=$(echo "$html" | grep -oP '<img[^>]+alt="[^"]+"' | wc -l)
  img_no_alt=$(echo "$html" | grep -oP '<img(?![^>]*alt=)[^>]*>' | wc -l)

  # Check breadcrumb
  has_breadcrumb=$(echo "$html" | grep -c 'BreadcrumbList')

  # Determine status
  status="OK"
  issues=""

  if [ "$code" != "200" ]; then
    issues="${issues} HTTP${code}"
    status="FAIL"
  fi
  if [ "$has_collection" -eq 0 ]; then
    issues="${issues} NO_SCHEMA"
    status="FAIL"
  fi
  if [ -z "$canonical" ]; then
    issues="${issues} NO_CANONICAL"
    status="FAIL"
  fi
  if [ "$hreflang_count" -lt 10 ]; then
    issues="${issues} HREFLANG(${hreflang_count})"
    status="FAIL"
  fi
  if [ "$post_links" -lt 5 ]; then
    issues="${issues} FEW_LINKS(${post_links})"
    status="FAIL"
  fi
  if [ "$img_no_alt" -gt 0 ]; then
    issues="${issues} MISSING_ALT(${img_no_alt})"
    status="FAIL"
  fi
  if [ "$has_breadcrumb" -eq 0 ]; then
    issues="${issues} NO_BREADCRUMB"
    status="FAIL"
  fi

  if [ "$status" = "OK" ]; then
    OK=$((OK+1))
  else
    FAIL=$((FAIL+1))
    ISSUES="${ISSUES}\n  ${locale}: ${issues}"
  fi

  echo "${locale} | ${code} | ${status} | title=${title_len}c | desc=${desc_len}c | schema=${has_collection} | hreflang=${hreflang_count} | links=${post_links} | imgs_alt=${img_alt_count} | breadcrumb=${has_breadcrumb} ${issues}"
done

echo ""
echo "RESULT: $OK/11 OK, $FAIL FAIL"
if [ -n "$ISSUES" ]; then
  echo -e "ISSUES:${ISSUES}"
fi
