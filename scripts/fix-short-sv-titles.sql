-- Fix 4 too-short SV metaTitles

-- 1. cipher-based-addition: 47 -> 51 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{sv,metaTitle}', '"Kodbaserad Addition: När Kryptering Möter Matematik"')
WHERE slug = 'cipher-based-addition-combining-cryptography-with-elementary-math';

-- 2. i-spy-worksheets: 49 -> 52 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{sv,metaTitle}', '"Professionella Hitta Föremål-arbetsblad: Snabb Guide"')
WHERE slug = 'i-spy-worksheets-with-professional-layouts-in-3-minutes';

-- 3. future-of-education: 49 -> 54 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{sv,metaTitle}', '"Framtidens Utbildning: Teknikutveckling och Arbetsblad"')
WHERE slug = 'future-of-education-technology-trends-the-role-of-worksheet-generators';

-- 4. symbolic-algebra: 26 -> 56 chars
UPDATE blog_posts
SET translations = jsonb_set(translations, '{sv,metaTitle}', '"Matematikpussel med Bilder: Symbolisk Algebra Arbetsblad"')
WHERE slug = 'symbolic-algebra-worksheets';

-- Verify
SELECT slug,
  length(jsonb_extract_path_text(translations, 'sv', 'metaTitle')) as len,
  jsonb_extract_path_text(translations, 'sv', 'metaTitle') as title
FROM blog_posts
WHERE status = 'published'
AND slug IN (
  'cipher-based-addition-combining-cryptography-with-elementary-math',
  'i-spy-worksheets-with-professional-layouts-in-3-minutes',
  'future-of-education-technology-trends-the-role-of-worksheet-generators',
  'symbolic-algebra-worksheets'
);
