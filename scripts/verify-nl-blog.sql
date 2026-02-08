SELECT 'DUP_TITLES' as chk, COUNT(*) as groups FROM (
  SELECT translations->'nl'->>'metaTitle', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_DESCS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'nl'->>'metaDescription', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_FKS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'nl'->>'focusKeyword', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT MIN(LENGTH(translations->'nl'->>'metaTitle')) as min_t, MAX(LENGTH(translations->'nl'->>'metaTitle')) as max_t,
  MIN(LENGTH(translations->'nl'->>'metaDescription')) as min_d, MAX(LENGTH(translations->'nl'->>'metaDescription')) as max_d
FROM blog_posts WHERE status='published';
