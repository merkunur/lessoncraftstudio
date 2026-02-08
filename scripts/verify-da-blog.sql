SELECT 'DUP_TITLES' as chk, COUNT(*) as groups FROM (
  SELECT translations->'da'->>'metaTitle', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_DESCS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'da'->>'metaDescription', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_FKS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'da'->>'focusKeyword', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT MIN(LENGTH(translations->'da'->>'metaTitle')) as min_t, MAX(LENGTH(translations->'da'->>'metaTitle')) as max_t,
  MIN(LENGTH(translations->'da'->>'metaDescription')) as min_d, MAX(LENGTH(translations->'da'->>'metaDescription')) as max_d
FROM blog_posts WHERE status='published';
