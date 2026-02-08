-- Fix duplicate NL focusKeyword: add grade level

UPDATE blog_posts
SET translations = jsonb_set(translations, '{nl,focusKeyword}', '"beste werkblad generators groep 3"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7';

UPDATE blog_posts
SET translations = jsonb_set(translations, '{nl,focusKeyword}', '"beste werkblad generators groep 4"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8';

-- Verify
SELECT slug,
  jsonb_extract_path_text(translations, 'nl', 'focusKeyword') as kw
FROM blog_posts
WHERE slug IN (
  'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7',
  'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8'
);
