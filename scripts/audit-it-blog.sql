-- Italian Blog SEO Audit

-- 1. Count posts with Italian translations
SELECT 'TOTAL_IT_POSTS' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND translations->'it'->>'title' IS NOT NULL
AND translations->'it'->>'title' != '';

-- 2. Meta title length distribution
SELECT 'TITLE_LENGTHS' as metric,
  MIN(LENGTH(translations->'it'->>'metaTitle')) as min_len,
  MAX(LENGTH(translations->'it'->>'metaTitle')) as max_len,
  ROUND(AVG(LENGTH(translations->'it'->>'metaTitle'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'it'->>'metaTitle') < 50 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'it'->>'metaTitle') > 60 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 3. Meta description length distribution
SELECT 'DESC_LENGTHS' as metric,
  MIN(LENGTH(translations->'it'->>'metaDescription')) as min_len,
  MAX(LENGTH(translations->'it'->>'metaDescription')) as max_len,
  ROUND(AVG(LENGTH(translations->'it'->>'metaDescription'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'it'->>'metaDescription') < 140 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'it'->>'metaDescription') > 160 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 4. Missing focusKeyword
SELECT 'MISSING_FOCUS_KW' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND (translations->'it'->>'focusKeyword' IS NULL OR translations->'it'->>'focusKeyword' = '');

-- 5. Duplicate Italian meta titles
SELECT translations->'it'->>'metaTitle' as dup_title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'it'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 6. Duplicate Italian meta descriptions
SELECT LEFT(translations->'it'->>'metaDescription', 80) as dup_desc, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'it'->>'metaDescription' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 7. Duplicate Italian focusKeywords
SELECT translations->'it'->>'focusKeyword' as dup_fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'it'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 8. Show the 8 known problematic posts
SELECT slug,
  translations->'it'->>'metaTitle' as it_title,
  LENGTH(translations->'it'->>'metaTitle') as title_len,
  translations->'it'->>'metaDescription' as it_desc,
  translations->'it'->>'focusKeyword' as it_fk
FROM blog_posts
WHERE status = 'published'
AND (slug LIKE 'top-10-worksheet-generators-for-%'
  OR slug = '33-editable-worksheet-generators-elementary-teachers'
  OR slug = 'multi-language-worksheet-generation-serving-scandinavian-markets')
ORDER BY slug;
