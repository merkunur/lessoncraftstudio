-- Verify Portuguese fixes
SELECT 'DUP_TITLES' as chk, COUNT(*) as groups FROM (
  SELECT translations->'pt'->>'metaTitle', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_DESCS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'pt'->>'metaDescription', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_FKS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'pt'->>'focusKeyword', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;

SELECT slug,
  LENGTH(translations->'pt'->>'metaTitle') as title_len,
  LENGTH(translations->'pt'->>'metaDescription') as desc_len,
  translations->'pt'->>'metaTitle' as title
FROM blog_posts WHERE status='published'
AND (slug LIKE 'top-10-worksheet-generators-for-%'
  OR slug='33-editable-worksheet-generators-elementary-teachers'
  OR slug='multi-language-worksheet-generation-serving-scandinavian-markets')
ORDER BY slug;

SELECT MIN(LENGTH(translations->'pt'->>'metaTitle')) as min_t, MAX(LENGTH(translations->'pt'->>'metaTitle')) as max_t,
  MIN(LENGTH(translations->'pt'->>'metaDescription')) as min_d, MAX(LENGTH(translations->'pt'->>'metaDescription')) as max_d
FROM blog_posts WHERE status='published';
