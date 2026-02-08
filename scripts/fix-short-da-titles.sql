-- Fix 1 too-short DA metaTitle

-- kinesthetic-learning: 49 -> 54 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{da,metaTitle}', '"Kinæstetisk Læring: 6 Opgavegeneratorer med Bevægelse"')
WHERE slug = 'kinesthetic-learning-6-movement-integrated-worksheet-generators';

-- Verify
SELECT slug,
  length(jsonb_extract_path_text(translations, 'da', 'metaTitle')) as len,
  jsonb_extract_path_text(translations, 'da', 'metaTitle') as title
FROM blog_posts
WHERE slug = 'kinesthetic-learning-6-movement-integrated-worksheet-generators';
