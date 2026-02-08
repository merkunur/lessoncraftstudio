-- Verify Italian fixes
SELECT 'DUP_TITLES' as chk, COUNT(*) as groups FROM (
  SELECT translations->'it'->>'metaTitle', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_DESCS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'it'->>'metaDescription', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;
SELECT 'DUP_FKS' as chk, COUNT(*) as groups FROM (
  SELECT translations->'it'->>'focusKeyword', COUNT(*) FROM blog_posts WHERE status='published' GROUP BY 1 HAVING COUNT(*)>1) t;

SELECT MIN(LENGTH(translations->'it'->>'metaTitle')) as min_t, MAX(LENGTH(translations->'it'->>'metaTitle')) as max_t,
  MIN(LENGTH(translations->'it'->>'metaDescription')) as min_d, MAX(LENGTH(translations->'it'->>'metaDescription')) as max_d
FROM blog_posts WHERE status='published';
