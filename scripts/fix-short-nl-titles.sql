-- Fix 2 too-short NL metaTitles

-- 1. visual-discrimination: 49 -> 51 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{nl,metaTitle}', '"Visuele Discriminatie Activiteiten: Frostig Methode"')
WHERE slug = 'visual-discrimination-activities-frostig-hornes-five-foundational-skills';

-- 2. 1st-grade-literacy-tools: 49 -> 59 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{nl,metaTitle}', '"Leesgereedschap Groep 3: Woordzoekers en Schrijfoefeningen"')
WHERE slug = '1st-grade-literacy-tools-word-search-alphabet-train-writing-practice';

-- Verify
SELECT slug,
  length(jsonb_extract_path_text(translations, 'nl', 'metaTitle')) as len,
  jsonb_extract_path_text(translations, 'nl', 'metaTitle') as title
FROM blog_posts
WHERE status = 'published'
AND slug IN (
  'visual-discrimination-activities-frostig-hornes-five-foundational-skills',
  '1st-grade-literacy-tools-word-search-alphabet-train-writing-practice'
);
