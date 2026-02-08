-- Verify Spanish fixes

-- Duplicate counts
SELECT 'DUP_TITLES' as chk, COUNT(*) as groups FROM (
  SELECT translations->'es'->>'metaTitle', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_DESCS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'es'->>'metaDescription', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_FKS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'es'->>'focusKeyword', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;

-- Fixed posts detail
SELECT slug,
  LENGTH(translations->'es'->>'metaTitle') as title_len,
  LENGTH(translations->'es'->>'metaDescription') as desc_len,
  translations->'es'->>'metaTitle' as title
FROM blog_posts WHERE status='published'
AND (slug LIKE 'top-10-worksheet-generators-for-%'
  OR slug='33-editable-worksheet-generators-elementary-teachers'
  OR slug='multi-language-worksheet-generation-serving-scandinavian-markets')
ORDER BY slug;

-- Overall range
SELECT MIN(LENGTH(translations->'es'->>'metaTitle')) as min_t, MAX(LENGTH(translations->'es'->>'metaTitle')) as max_t,
  MIN(LENGTH(translations->'es'->>'metaDescription')) as min_d, MAX(LENGTH(translations->'es'->>'metaDescription')) as max_d
FROM blog_posts WHERE status='published';
