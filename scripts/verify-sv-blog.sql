SELECT 'DUP_TITLES' as chk, COUNT(*) as groups FROM (
  SELECT translations->'sv'->>'metaTitle', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_DESCS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'sv'->>'metaDescription', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_FKS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'sv'->>'focusKeyword', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT MIN(LENGTH(translations->'sv'->>'metaTitle')) as min_t, MAX(LENGTH(translations->'sv'->>'metaTitle')) as max_t,
  MIN(LENGTH(translations->'sv'->>'metaDescription')) as min_d, MAX(LENGTH(translations->'sv'->>'metaDescription')) as max_d
FROM blog_posts WHERE status='published';
