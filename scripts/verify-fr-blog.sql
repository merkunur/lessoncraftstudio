-- Verify French fixes

-- 1. Duplicate titles
SELECT 'DUP_TITLES' as check_name, COUNT(*) as dup_groups
FROM (
  SELECT translations->'fr'->>'metaTitle', COUNT(*) as cnt
  FROM blog_posts WHERE status = 'published'
  GROUP BY translations->'fr'->>'metaTitle' HAVING COUNT(*) > 1
) t;

-- 2. Duplicate descriptions
SELECT 'DUP_DESCS' as check_name, COUNT(*) as dup_groups
FROM (
  SELECT translations->'fr'->>'metaDescription', COUNT(*) as cnt
  FROM blog_posts WHERE status = 'published'
  GROUP BY translations->'fr'->>'metaDescription' HAVING COUNT(*) > 1
) t;

-- 3. Duplicate focusKeywords
SELECT 'DUP_FKS' as check_name, COUNT(*) as dup_groups
FROM (
  SELECT translations->'fr'->>'focusKeyword', COUNT(*) as cnt
  FROM blog_posts WHERE status = 'published'
  GROUP BY translations->'fr'->>'focusKeyword' HAVING COUNT(*) > 1
) t;

-- 4. Title lengths for fixed posts
SELECT slug,
  LENGTH(translations->'fr'->>'metaTitle') as title_len,
  LENGTH(translations->'fr'->>'metaDescription') as desc_len,
  translations->'fr'->>'metaTitle' as title
FROM blog_posts
WHERE status = 'published'
AND (slug LIKE 'top-10-worksheet-generators-for-%'
  OR slug = '33-editable-worksheet-generators-elementary-teachers'
  OR slug = 'multi-language-worksheet-generation-serving-scandinavian-markets')
ORDER BY slug;

-- 5. Overall stats
SELECT
  MIN(LENGTH(translations->'fr'->>'metaTitle')) as min_title,
  MAX(LENGTH(translations->'fr'->>'metaTitle')) as max_title,
  MIN(LENGTH(translations->'fr'->>'metaDescription')) as min_desc,
  MAX(LENGTH(translations->'fr'->>'metaDescription')) as max_desc
FROM blog_posts WHERE status = 'published';
