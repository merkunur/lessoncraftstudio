-- Dutch Blog SEO Audit

-- 1. Stats
SELECT 'TOTAL_NL_POSTS' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND translations->'nl'->>'title' IS NOT NULL
AND translations->'nl'->>'title' != '';

SELECT 'TITLE_LENGTHS' as metric,
  MIN(LENGTH(translations->'nl'->>'metaTitle')) as min_len,
  MAX(LENGTH(translations->'nl'->>'metaTitle')) as max_len,
  ROUND(AVG(LENGTH(translations->'nl'->>'metaTitle'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'nl'->>'metaTitle') < 50 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'nl'->>'metaTitle') > 60 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

SELECT 'DESC_LENGTHS' as metric,
  MIN(LENGTH(translations->'nl'->>'metaDescription')) as min_len,
  MAX(LENGTH(translations->'nl'->>'metaDescription')) as max_len,
  ROUND(AVG(LENGTH(translations->'nl'->>'metaDescription'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'nl'->>'metaDescription') < 140 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'nl'->>'metaDescription') > 160 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

SELECT 'MISSING_FOCUS_KW' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND (translations->'nl'->>'focusKeyword' IS NULL OR translations->'nl'->>'focusKeyword' = '');

-- 2. All duplicate groups
SELECT translations->'nl'->>'metaTitle' as dup_title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'nl'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

SELECT LEFT(translations->'nl'->>'metaDescription', 80) as dup_desc, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'nl'->>'metaDescription' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

SELECT translations->'nl'->>'focusKeyword' as dup_fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'nl'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 3. All posts with duplicate titles - show slugs
SELECT slug, translations->'nl'->>'metaTitle' as nl_title, translations->'nl'->>'focusKeyword' as nl_fk
FROM blog_posts WHERE status = 'published'
AND translations->'nl'->>'metaTitle' IN (
  SELECT translations->'nl'->>'metaTitle' FROM blog_posts WHERE status='published'
  GROUP BY 1 HAVING COUNT(*) > 1
)
ORDER BY translations->'nl'->>'metaTitle', slug;
