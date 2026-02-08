-- Fix duplicate NO focusKeyword: add grade level

UPDATE blog_posts
SET translations = jsonb_set(translations, '{no,focusKeyword}', '"topp oppgavegeneratorer 2. klasse"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8';

UPDATE blog_posts
SET translations = jsonb_set(translations, '{no,focusKeyword}', '"topp oppgavegeneratorer 3. klasse"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9';

-- Verify
SELECT slug,
  jsonb_extract_path_text(translations, 'no', 'focusKeyword') as kw
FROM blog_posts
WHERE slug IN (
  'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8',
  'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9'
);
