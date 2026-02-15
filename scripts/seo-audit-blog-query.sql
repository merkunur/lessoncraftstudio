-- English Blog Post SEO Metadata Extraction
-- Part 1 of ONE CLICK A DAY SEO Plan
--
-- Run on server:
-- PGPASSWORD='LcS2025SecureDBPass' psql -U lcs_user -d lessoncraftstudio_prod \
--   -t -A -f /opt/lessoncraftstudio/scripts/seo-audit-blog-query.sql \
--   -o /tmp/blog-seo-data.json
--
-- Then download:
-- pscp ... root@65.108.5.250:/tmp/blog-seo-data.json docs/audit-results/blog-seo-data.json

SELECT json_agg(blog_row) FROM (
  SELECT
    json_build_object(
      'type', 'blog',
      'file', 'database:blog_posts',
      'slug', slug,
      'title', COALESCE(translations->'en'->>'metaTitle', translations->'en'->>'title', ''),
      'titleLength', LENGTH(COALESCE(translations->'en'->>'metaTitle', translations->'en'->>'title', '')),
      'description', COALESCE(translations->'en'->>'metaDescription', ''),
      'descriptionLength', LENGTH(COALESCE(translations->'en'->>'metaDescription', '')),
      'keywords', COALESCE(translations->'en'->>'focusKeyword', ''),
      'h1', COALESCE(translations->'en'->>'title', ''),
      'url', '/en/blog/' || slug,
      'issues', '[]'::json
    ) AS blog_row
  FROM blog_posts
  WHERE translations->'en' IS NOT NULL
    AND status = 'published'
  ORDER BY slug
) sub;
