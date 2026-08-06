#!/bin/bash
# Measure TTFB for blog posts to verify ISR caching
SLUGS=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c \
  "SELECT slug FROM blog_posts WHERE status = 'published' LIMIT 10;" 2>/dev/null | sed 's/^[[:space:]]*//' | grep -v '^$')

echo "Measuring TTFB for 10 English blog posts (warm ISR cache):"
echo "-----------------------------------------------------------"
for slug in $SLUGS; do
  RESULT=$(curl -o /dev/null -s -w '%{time_starttransfer} %{time_total} %{http_code}' "http://localhost:3000/en/blog/${slug}")
  TTFB=$(echo "$RESULT" | awk '{print $1}')
  TOTAL=$(echo "$RESULT" | awk '{print $2}')
  STATUS=$(echo "$RESULT" | awk '{print $3}')
  printf "  %-4s  TTFB: %ss  Total: %ss  %s\n" "$STATUS" "$TTFB" "$TOTAL" "$slug"
done

echo ""
echo "Measuring TTFB for first post across locales:"
echo "----------------------------------------------"
FIRST_SLUG=$(echo "$SLUGS" | head -1)
for locale in en de fr es pt it nl sv da no fi; do
  RESULT=$(curl -o /dev/null -s -w '%{time_starttransfer} %{time_total} %{http_code}' "http://localhost:3000/${locale}/blog/${FIRST_SLUG}")
  TTFB=$(echo "$RESULT" | awk '{print $1}')
  TOTAL=$(echo "$RESULT" | awk '{print $2}')
  STATUS=$(echo "$RESULT" | awk '{print $3}')
  printf "  %-4s  TTFB: %ss  Total: %ss  /%s/blog/%s\n" "$STATUS" "$TTFB" "$TOTAL" "$locale" "$FIRST_SLUG"
done
