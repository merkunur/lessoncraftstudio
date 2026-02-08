SELECT slug,
  translations->'sv'->>'metaTitle' as sv_title,
  LENGTH(translations->'sv'->>'metaTitle') as title_len,
  translations->'sv'->>'focusKeyword' as sv_fk
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
