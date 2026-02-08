-- Swedish Blog SEO Audit

SELECT 'TOTAL_SV_POSTS' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND translations->'sv'->>'title' IS NOT NULL AND translations->'sv'->>'title' != '';

SELECT 'TITLE_LENGTHS' as metric,
  MIN(LENGTH(translations->'sv'->>'metaTitle')) as min_len,
  MAX(LENGTH(translations->'sv'->>'metaTitle')) as max_len,
  ROUND(AVG(LENGTH(translations->'sv'->>'metaTitle'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'sv'->>'metaTitle') < 50 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'sv'->>'metaTitle') > 60 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

SELECT 'DESC_LENGTHS' as metric,
  MIN(LENGTH(translations->'sv'->>'metaDescription')) as min_len,
  MAX(LENGTH(translations->'sv'->>'metaDescription')) as max_len,
  ROUND(AVG(LENGTH(translations->'sv'->>'metaDescription'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'sv'->>'metaDescription') < 140 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'sv'->>'metaDescription') > 160 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

SELECT 'MISSING_FOCUS_KW' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND (translations->'sv'->>'focusKeyword' IS NULL OR translations->'sv'->>'focusKeyword' = '');

-- All duplicate groups
SELECT translations->'sv'->>'metaTitle' as dup_title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'sv'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

SELECT LEFT(translations->'sv'->>'metaDescription', 80) as dup_desc, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'sv'->>'metaDescription' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

SELECT translations->'sv'->>'focusKeyword' as dup_fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'sv'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- All posts with duplicate titles
SELECT slug, translations->'sv'->>'metaTitle' as sv_title, translations->'sv'->>'focusKeyword' as sv_fk
FROM blog_posts WHERE status = 'published'
AND translations->'sv'->>'metaTitle' IN (
  SELECT translations->'sv'->>'metaTitle' FROM blog_posts WHERE status='published'
  GROUP BY 1 HAVING COUNT(*) > 1
)
ORDER BY translations->'sv'->>'metaTitle', slug;
