-- Portuguese Blog SEO Audit

-- 1. Count posts with Portuguese translations
SELECT 'TOTAL_PT_POSTS' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND translations->'pt'->>'title' IS NOT NULL
AND translations->'pt'->>'title' != '';

-- 2. Meta title length distribution
SELECT 'TITLE_LENGTHS' as metric,
  MIN(LENGTH(translations->'pt'->>'metaTitle')) as min_len,
  MAX(LENGTH(translations->'pt'->>'metaTitle')) as max_len,
  ROUND(AVG(LENGTH(translations->'pt'->>'metaTitle'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'pt'->>'metaTitle') < 50 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'pt'->>'metaTitle') > 60 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 3. Meta description length distribution
SELECT 'DESC_LENGTHS' as metric,
  MIN(LENGTH(translations->'pt'->>'metaDescription')) as min_len,
  MAX(LENGTH(translations->'pt'->>'metaDescription')) as max_len,
  ROUND(AVG(LENGTH(translations->'pt'->>'metaDescription'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'pt'->>'metaDescription') < 140 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'pt'->>'metaDescription') > 160 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

-- 4. Missing focusKeyword
SELECT 'MISSING_FOCUS_KW' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND (translations->'pt'->>'focusKeyword' IS NULL OR translations->'pt'->>'focusKeyword' = '');

-- 5. Duplicate Portuguese meta titles
SELECT translations->'pt'->>'metaTitle' as dup_title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'pt'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 6. Duplicate Portuguese meta descriptions
SELECT LEFT(translations->'pt'->>'metaDescription', 80) as dup_desc, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'pt'->>'metaDescription' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 7. Duplicate Portuguese focusKeywords
SELECT translations->'pt'->>'focusKeyword' as dup_fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'pt'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- 8. Show the 8 known problematic posts
SELECT slug,
  translations->'pt'->>'metaTitle' as pt_title,
  LENGTH(translations->'pt'->>'metaTitle') as title_len,
  translations->'pt'->>'focusKeyword' as pt_fk
FROM blog_posts
WHERE status = 'published'
AND (slug LIKE 'top-10-worksheet-generators-for-%'
  OR slug = '33-editable-worksheet-generators-elementary-teachers'
  OR slug = 'multi-language-worksheet-generation-serving-scandinavian-markets')
ORDER BY slug;
