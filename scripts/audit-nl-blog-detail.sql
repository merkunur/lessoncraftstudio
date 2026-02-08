-- All 8 known problematic posts - Dutch detail
SELECT slug,
  translations->'nl'->>'metaTitle' as nl_title,
  LENGTH(translations->'nl'->>'metaTitle') as title_len,
  translations->'nl'->>'metaDescription' as nl_desc,
  translations->'nl'->>'focusKeyword' as nl_fk
FROM blog_posts
WHERE status = 'published'
AND (slug LIKE 'top-10-worksheet-generators-for-%'
  OR slug = '33-editable-worksheet-generators-elementary-teachers'
  OR slug = 'multi-language-worksheet-generation-serving-scandinavian-markets'
  OR slug = '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported'
  OR slug = 'parent-homeschool-worksheet-generators-complete-curriculum-support'
  OR slug = 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators'
  OR slug = 'your-complete-yearly-planning-guide-12-month-worksheet-strategy'
  OR slug = 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load'
  OR slug = 'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support'
  OR slug = 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets')
ORDER BY slug;
