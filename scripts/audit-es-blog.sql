-- Spanish Blog SEO Audit

-- 1. Count posts with Spanish translations
SELECT 'TOTAL_ES_POSTS' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND translations->'es'->>'title' IS NOT NULL
AND translations->'es'->>'title' != '';

-- 2. Meta title length distribution
SELECT 'TITLE_LENGTHS' as metric,
  MIN(LENGTH(translations->'es'->>'metaTitle')) as min_len,
  MAX(LENGTH(translations->'es'->>'metaTitle')) as max_len,
  ROUND(AVG(LENGTH(translations->'es'->>'metaTitle'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'es'->>'metaTitle') < 50 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'es'->>'metaTitle') > 60 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 3. Meta description length distribution
SELECT 'DESC_LENGTHS' as metric,
  MIN(LENGTH(translations->'es'->>'metaDescription')) as min_len,
  MAX(LENGTH(translations->'es'->>'metaDescription')) as max_len,
  ROUND(AVG(LENGTH(translations->'es'->>'metaDescription'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'es'->>'metaDescription') < 140 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'es'->>'metaDescription') > 160 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 4. Missing focusKeyword
SELECT 'MISSING_FOCUS_KW' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND (translations->'es'->>'focusKeyword' IS NULL OR translations->'es'->>'focusKeyword' = '');

-- 5. Duplicate Spanish meta titles
SELECT translations->'es'->>'metaTitle' as dup_title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'es'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 6. Duplicate Spanish meta descriptions
SELECT LEFT(translations->'es'->>'metaDescription', 80) as dup_desc, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'es'->>'metaDescription' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 7. Duplicate Spanish focusKeywords
SELECT translations->'es'->>'focusKeyword' as dup_fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'es'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 8. Show the top-10 grade-level posts Spanish meta
SELECT slug,
  translations->'es'->>'metaTitle' as es_title,
  LENGTH(translations->'es'->>'metaTitle') as title_len,
  translations->'es'->>'focusKeyword' as es_fk
FROM blog_posts
WHERE status = 'published'
AND slug LIKE 'top-10-worksheet-generators-for-%'
ORDER BY slug;

-- 9. Check the other 2 known problematic posts
SELECT slug,
  translations->'es'->>'metaTitle' as es_title,
  LENGTH(translations->'es'->>'metaTitle') as title_len,
  translations->'es'->>'focusKeyword' as es_fk
FROM blog_posts
WHERE status = 'published'
AND slug IN ('33-editable-worksheet-generators-elementary-teachers',
             'multi-language-worksheet-generation-serving-scandinavian-markets')
ORDER BY slug;
