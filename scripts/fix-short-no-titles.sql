-- Fix 4 too-short NO metaTitles

-- 1. kinesthetic-learning: 48 -> 54 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{no,metaTitle}', '"Kinestetisk Læring: 6 Bevegelsesintegrerte Aktiviteter"')
WHERE slug = 'kinesthetic-learning-6-movement-integrated-worksheet-generators';

-- 2. pattern-train: 47 -> 50 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{no,metaTitle}', '"Mønsterboks: Klipp og Lim for Mønstergjenkjenning"')
WHERE slug = 'pattern-train-cut-and-paste-multi-sensory-learning-for-pattern-recognition';

-- 3. success-stories: 48 -> 55 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{no,metaTitle}', '"Suksesshistorier: Lærere Forteller om Oppgavegeneratorer"')
WHERE slug = 'success-stories-real-teachers-share-how-worksheets-transformed-their-classrooms';

-- 4. upper-elementary: 48 -> 60 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{no,metaTitle}', '"Avanserte Utfordringer for 4. og 5. Klasse: Rutenettstegning"')
WHERE slug = 'upper-elementary-challenges-grid-drawing-complex-patterns-multi-step-logic';

-- Verify
SELECT slug,
  length(jsonb_extract_path_text(translations, 'no', 'metaTitle')) as len,
  jsonb_extract_path_text(translations, 'no', 'metaTitle') as title
FROM blog_posts
WHERE status = 'published'
AND slug IN (
  'kinesthetic-learning-6-movement-integrated-worksheet-generators',
  'pattern-train-cut-and-paste-multi-sensory-learning-for-pattern-recognition',
  'success-stories-real-teachers-share-how-worksheets-transformed-their-classrooms',
  'upper-elementary-challenges-grid-drawing-complex-patterns-multi-step-logic'
);
