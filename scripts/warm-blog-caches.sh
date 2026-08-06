#!/bin/bash
# Warm all blog post caches after deploy
# Warms ALL posts for English, then first post for remaining 10 locales

BLOG_SLUGS=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c \
  "SELECT slug FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC;" 2>/dev/null | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | grep -v '^$')

if [ -z "$BLOG_SLUGS" ]; then
  echo "No published blog posts found"
  exit 0
fi

SLUG_COUNT=$(echo "$BLOG_SLUGS" | wc -l | tr -d ' ')
FIRST_SLUG=$(echo "$BLOG_SLUGS" | head -1)
echo "Found $SLUG_COUNT published blog posts"

echo "Warming all posts for English locale..."
BATCH=0
for slug in $BLOG_SLUGS; do
  [ -z "$slug" ] && continue
  curl -sf "http://localhost:3000/en/blog/${slug}" > /dev/null 2>&1 &
  BATCH=$((BATCH + 1))
  if [ $BATCH -ge 5 ]; then
    wait
    BATCH=0
  fi
done
wait
echo "English blog caches warmed ($SLUG_COUNT posts)"

echo "Warming locale caches with slug: $FIRST_SLUG"
for locale in de fr es pt it nl sv da no fi; do
  curl -sf "http://localhost:3000/${locale}/blog/${FIRST_SLUG}" > /dev/null 2>&1 &
done
wait
echo "All blog caches warmed ($SLUG_COUNT English posts + 10 locale entries)"
