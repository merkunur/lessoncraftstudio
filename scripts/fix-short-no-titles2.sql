-- Fix pattern-train: 49 -> 54 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{no,metaTitle}', '"Mønsterboks: Klipp og Lim-aktiviteter for Mønstre"')
WHERE slug = 'pattern-train-cut-and-paste-multi-sensory-learning-for-pattern-recognition';

-- Verify
SELECT slug,
  length(jsonb_extract_path_text(translations, 'no', 'metaTitle')) as len,
  jsonb_extract_path_text(translations, 'no', 'metaTitle') as title
FROM blog_posts
WHERE slug = 'pattern-train-cut-and-paste-multi-sensory-learning-for-pattern-recognition';
