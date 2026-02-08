#!/bin/bash
# Verify blog listing featured images have localized alt text in all 11 locales

echo "=== BLOG IMAGE ALT TEXT VERIFICATION ==="
echo ""

PASS=0
FAIL=0

for locale in en de fr es pt it nl sv da no fi; do
  html=$(curl -s "http://localhost:3000/${locale}/blog")

  # Count images WITH alt text (excluding logo)
  imgs_with_alt=$(echo "$html" | grep -oP '<img[^>]+alt="[^"]+"' | grep -v 'LessonCraftStudio' | wc -l)

  # Count images WITHOUT alt text
  imgs_no_alt=$(echo "$html" | grep -oP '<img(?![^>]*alt=)[^>]*>' | wc -l)

  # Get first blog post image alt for locale check
  first_alt=$(echo "$html" | grep -oP '<img[^>]+alt="[^"]+"' | grep -v 'LessonCraftStudio' | head -1 | grep -oP 'alt="[^"]+"')

  if [ "$imgs_no_alt" -eq 0 ] && [ "$imgs_with_alt" -gt 0 ]; then
    status="PASS"
    PASS=$((PASS+1))
  else
    status="FAIL"
    FAIL=$((FAIL+1))
  fi

  echo "[$locale] $status — imgs_with_alt=$imgs_with_alt, imgs_no_alt=$imgs_no_alt"
  echo "  Sample: $first_alt"
done

echo ""
echo "RESULT: $PASS/11 PASS, $FAIL FAIL"
