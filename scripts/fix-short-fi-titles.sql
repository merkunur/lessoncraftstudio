-- Fix 1 too-short FI metaTitle

-- maximizing-learning-time: 49 -> 52 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{fi,metaTitle}', '"Opetusajan Maksimointi: Tehokkuusstrategiat Luokassa"')
WHERE slug = 'maximizing-learning-time-efficiency-strategies-with-worksheets';

-- Verify
SELECT slug,
  length(jsonb_extract_path_text(translations, 'fi', 'metaTitle')) as len,
  jsonb_extract_path_text(translations, 'fi', 'metaTitle') as title
FROM blog_posts
WHERE slug = 'maximizing-learning-time-efficiency-strategies-with-worksheets';
