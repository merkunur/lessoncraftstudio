-- French Blog SEO Audit

-- 1. Count posts with French translations
SELECT 'TOTAL_FR_POSTS' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND translations->'fr'->>'title' IS NOT NULL
AND translations->'fr'->>'title' != '';

-- 2. Meta title length distribution
SELECT 'TITLE_LENGTHS' as metric,
  MIN(LENGTH(translations->'fr'->>'metaTitle')) as min_len,
  MAX(LENGTH(translations->'fr'->>'metaTitle')) as max_len,
  ROUND(AVG(LENGTH(translations->'fr'->>'metaTitle'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'fr'->>'metaTitle') < 50 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'fr'->>'metaTitle') > 60 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 3. Meta description length distribution
SELECT 'DESC_LENGTHS' as metric,
  MIN(LENGTH(translations->'fr'->>'metaDescription')) as min_len,
  MAX(LENGTH(translations->'fr'->>'metaDescription')) as max_len,
  ROUND(AVG(LENGTH(translations->'fr'->>'metaDescription'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'fr'->>'metaDescription') < 140 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'fr'->>'metaDescription') > 160 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 4. Missing focusKeyword
SELECT 'MISSING_FOCUS_KW' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND (translations->'fr'->>'focusKeyword' IS NULL OR translations->'fr'->>'focusKeyword' = '');

-- 5. Duplicate French meta titles
SELECT 'DUP_TITLE: ' || translations->'fr'->>'metaTitle' as duplicate_title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'fr'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 6. Duplicate French meta descriptions
SELECT 'DUP_DESC: ' || LEFT(translations->'fr'->>'metaDescription', 80) as duplicate_desc, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'fr'->>'metaDescription' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 7. Duplicate French focusKeywords
SELECT 'DUP_FK: ' || translations->'fr'->>'focusKeyword' as duplicate_fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'fr'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 8. Show the top-10 grade-level posts French meta (likely duplicates)
SELECT slug,
  translations->'fr'->>'metaTitle' as fr_title,
  LENGTH(translations->'fr'->>'metaTitle') as title_len,
  translations->'fr'->>'focusKeyword' as fr_fk
FROM blog_posts
WHERE status = 'published'
AND slug LIKE 'top-10-worksheet-generators-for-%'
ORDER BY slug;
