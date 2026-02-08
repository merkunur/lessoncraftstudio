-- Check templated/garbled meta across ALL locales for ALL 112 posts

-- Template patterns per locale
SELECT 'de' as locale, COUNT(CASE WHEN translations->'de'->>'metaTitle' LIKE '%Gratis Druckbar%' OR translations->'de'->>'metaTitle' LIKE '%Kostenlos%Druckbar%' THEN 1 END) as templated,
  COUNT(CASE WHEN translations->'de'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END) as has_brand_suffix
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'fr', COUNT(CASE WHEN translations->'fr'->>'metaTitle' LIKE '%Gratuit Imprimable%' THEN 1 END),
  COUNT(CASE WHEN translations->'fr'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'es', COUNT(CASE WHEN translations->'es'->>'metaTitle' LIKE '%Gratis Imprimible%' THEN 1 END),
  COUNT(CASE WHEN translations->'es'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'pt', COUNT(CASE WHEN translations->'pt'->>'metaTitle' LIKE '%Grátis Imprimível%' OR translations->'pt'->>'metaTitle' LIKE '%Grtis Imprimvel%' THEN 1 END),
  COUNT(CASE WHEN translations->'pt'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'it', COUNT(CASE WHEN translations->'it'->>'metaTitle' LIKE '%Gratuito Stampabile%' THEN 1 END),
  COUNT(CASE WHEN translations->'it'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'nl', COUNT(CASE WHEN translations->'nl'->>'metaTitle' LIKE '%Gratis Printbaar%' THEN 1 END),
  COUNT(CASE WHEN translations->'nl'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'sv', COUNT(CASE WHEN translations->'sv'->>'metaTitle' LIKE '%Gratis Utskrivbar%' THEN 1 END),
  COUNT(CASE WHEN translations->'sv'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'da', COUNT(CASE WHEN translations->'da'->>'metaTitle' LIKE '%Gratis Printbar%' THEN 1 END),
  COUNT(CASE WHEN translations->'da'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'no', COUNT(CASE WHEN translations->'no'->>'metaTitle' LIKE '%Gratis Utskrivbar%' OR translations->'no'->>'metaTitle' LIKE '%Gratis Skrivbar%' THEN 1 END),
  COUNT(CASE WHEN translations->'no'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'fi', COUNT(CASE WHEN translations->'fi'->>'metaTitle' LIKE '%Ilmainen Tulostettava%' THEN 1 END),
  COUNT(CASE WHEN translations->'fi'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published'
UNION ALL
SELECT 'en', COUNT(CASE WHEN translations->'en'->>'metaTitle' LIKE '%Free Printable%' THEN 1 END),
  COUNT(CASE WHEN translations->'en'->>'metaTitle' LIKE '% - LessonCraft%' THEN 1 END)
FROM blog_posts WHERE status = 'published';

-- Show a few English titles for comparison (the "good" baseline)
SELECT slug, translations->'en'->>'metaTitle' as en_title, LENGTH(translations->'en'->>'metaTitle') as len
FROM blog_posts WHERE status = 'published'
ORDER BY random() LIMIT 5;
