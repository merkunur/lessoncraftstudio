-- Check quality of NON-fixed posts across locales
-- Sample 5 random posts that weren't in the "problematic 15"

-- Swedish: check for missing å/ä/ö
SELECT 'SV_GARBLED' as chk, COUNT(*) as total,
  COUNT(CASE WHEN translations->'sv'->>'metaTitle' !~ '[åäöÅÄÖ]' THEN 1 END) as no_swedish_chars,
  COUNT(CASE WHEN translations->'sv'->>'metaTitle' LIKE '%Gratis Utskrivbar%' THEN 1 END) as templated
FROM blog_posts WHERE status = 'published'
AND slug NOT LIKE 'top-10-worksheet-generators-for-%'
AND slug NOT IN ('33-editable-worksheet-generators-elementary-teachers',
  'multi-language-worksheet-generation-serving-scandinavian-markets',
  '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
  'parent-homeschool-worksheet-generators-complete-curriculum-support',
  'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
  'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
  'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
  'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
  'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets');

-- Danish: check for missing æ/ø/å
SELECT 'DA_GARBLED' as chk, COUNT(*) as total,
  COUNT(CASE WHEN translations->'da'->>'metaTitle' !~ '[æøåÆØÅ]' THEN 1 END) as no_danish_chars,
  COUNT(CASE WHEN translations->'da'->>'metaTitle' LIKE '%Gratis Printbar%' THEN 1 END) as templated
FROM blog_posts WHERE status = 'published'
AND slug NOT LIKE 'top-10-worksheet-generators-for-%'
AND slug NOT IN ('33-editable-worksheet-generators-elementary-teachers',
  'multi-language-worksheet-generation-serving-scandinavian-markets',
  '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
  'parent-homeschool-worksheet-generators-complete-curriculum-support',
  'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
  'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
  'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
  'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
  'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets');

-- French: check for missing accents é/è/ê/ë/à/â/ù/û/ç
SELECT 'FR_GARBLED' as chk, COUNT(*) as total,
  COUNT(CASE WHEN translations->'fr'->>'metaTitle' !~ '[éèêëàâùûçÉÈÊ]' THEN 1 END) as no_french_chars,
  COUNT(CASE WHEN translations->'fr'->>'metaTitle' LIKE '%Gratuit Imprimable%' THEN 1 END) as templated
FROM blog_posts WHERE status = 'published'
AND slug NOT LIKE 'top-10-worksheet-generators-for-%'
AND slug NOT IN ('33-editable-worksheet-generators-elementary-teachers',
  'multi-language-worksheet-generation-serving-scandinavian-markets',
  '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
  'parent-homeschool-worksheet-generators-complete-curriculum-support',
  'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
  'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
  'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
  'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
  'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets');

-- German: check template pattern
SELECT 'DE_GARBLED' as chk, COUNT(*) as total,
  COUNT(CASE WHEN translations->'de'->>'metaTitle' LIKE '%Gratis Druckbar%' THEN 1 END) as templated
FROM blog_posts WHERE status = 'published'
AND slug NOT LIKE 'top-10-worksheet-generators-for-%'
AND slug NOT IN ('33-editable-worksheet-generators-elementary-teachers',
  'multi-language-worksheet-generation-serving-scandinavian-markets');

-- Show 5 sample non-fixed Swedish titles
SELECT slug, translations->'sv'->>'metaTitle' as sv_title
FROM blog_posts WHERE status = 'published'
AND slug NOT LIKE 'top-10-worksheet-generators-for-%'
AND slug NOT IN ('33-editable-worksheet-generators-elementary-teachers',
  'multi-language-worksheet-generation-serving-scandinavian-markets',
  '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
  'parent-homeschool-worksheet-generators-complete-curriculum-support',
  'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
  'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
  'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
  'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
  'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets')
ORDER BY random() LIMIT 5;

-- Show 5 sample non-fixed French titles
SELECT slug, translations->'fr'->>'metaTitle' as fr_title
FROM blog_posts WHERE status = 'published'
AND slug NOT LIKE 'top-10-worksheet-generators-for-%'
AND slug NOT IN ('33-editable-worksheet-generators-elementary-teachers',
  'multi-language-worksheet-generation-serving-scandinavian-markets',
  '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported',
  'parent-homeschool-worksheet-generators-complete-curriculum-support',
  'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators',
  'your-complete-yearly-planning-guide-12-month-worksheet-strategy',
  'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load',
  'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support',
  'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets')
ORDER BY random() LIMIT 5;
