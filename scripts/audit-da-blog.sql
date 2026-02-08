-- Danish Blog SEO Audit

SELECT 'TOTAL_DA_POSTS' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND translations->'da'->>'title' IS NOT NULL AND translations->'da'->>'title' != '';

SELECT 'TITLE_LENGTHS' as metric,
  MIN(LENGTH(translations->'da'->>'metaTitle')) as min_len,
  MAX(LENGTH(translations->'da'->>'metaTitle')) as max_len,
  ROUND(AVG(LENGTH(translations->'da'->>'metaTitle'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'da'->>'metaTitle') < 50 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'da'->>'metaTitle') > 60 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

SELECT 'DESC_LENGTHS' as metric,
  MIN(LENGTH(translations->'da'->>'metaDescription')) as min_len,
  MAX(LENGTH(translations->'da'->>'metaDescription')) as max_len,
  ROUND(AVG(LENGTH(translations->'da'->>'metaDescription'))) as avg_len,
  COUNT(CASE WHEN LENGTH(translations->'da'->>'metaDescription') < 140 THEN 1 END) as too_short,
  COUNT(CASE WHEN LENGTH(translations->'da'->>'metaDescription') > 160 THEN 1 END) as too_long
FROM blog_posts WHERE status = 'published';

SELECT 'MISSING_FOCUS_KW' as metric, COUNT(*) as value
FROM blog_posts WHERE status = 'published'
AND (translations->'da'->>'focusKeyword' IS NULL OR translations->'da'->>'focusKeyword' = '');

-- Duplicate groups
SELECT translations->'da'->>'metaTitle' as dup_title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'da'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

SELECT LEFT(translations->'da'->>'metaDescription', 80) as dup_desc, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'da'->>'metaDescription' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

SELECT translations->'da'->>'focusKeyword' as dup_fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'da'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- All 15 known problematic posts
SELECT slug,
  translations->'da'->>'metaTitle' as da_title,
  LENGTH(translations->'da'->>'metaTitle') as title_len,
  translations->'da'->>'focusKeyword' as da_fk
FROM blog_posts WHERE status = 'published'
AND (slug LIKE 'top-10-worksheet-generators-for-%'
  OR slug IN ('33-editable-worksheet-generators-elementary-teachers',
    'multi-language-worksheet-generation-serving-scandinavian-markets',
    '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
    'parent-homeschool-worksheet-generators-complete-curriculum-support',
    'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
    'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
    'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
    'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
    'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets'))
ORDER BY slug;
