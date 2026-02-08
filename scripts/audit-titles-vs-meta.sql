-- Compare actual post titles vs metaTitles
-- Check if the real titles are good quality

-- English: post title vs metaTitle
SELECT slug,
  translations->'en'->>'title' as real_title,
  LENGTH(translations->'en'->>'title') as title_len,
  translations->'en'->>'metaTitle' as meta_title
FROM blog_posts WHERE status = 'published'
ORDER BY random() LIMIT 10;

-- Norwegian (the clean locale): check quality
SELECT slug,
  translations->'no'->>'title' as real_title,
  translations->'no'->>'metaTitle' as meta_title,
  LENGTH(translations->'no'->>'metaTitle') as meta_len
FROM blog_posts WHERE status = 'published'
ORDER BY random() LIMIT 5;

-- Check if real titles contain useful content
SELECT 'EN_TITLE_QUALITY' as chk,
  MIN(LENGTH(translations->'en'->>'title')) as min_len,
  MAX(LENGTH(translations->'en'->>'title')) as max_len,
  ROUND(AVG(LENGTH(translations->'en'->>'title'))) as avg_len
FROM blog_posts WHERE status = 'published';

-- Check all locales real title quality
SELECT 'de' as locale, MIN(LENGTH(translations->'de'->>'title')) as min_t, MAX(LENGTH(translations->'de'->>'title')) as max_t, ROUND(AVG(LENGTH(translations->'de'->>'title'))) as avg_t FROM blog_posts WHERE status='published'
UNION ALL SELECT 'fr', MIN(LENGTH(translations->'fr'->>'title')), MAX(LENGTH(translations->'fr'->>'title')), ROUND(AVG(LENGTH(translations->'fr'->>'title'))) FROM blog_posts WHERE status='published'
UNION ALL SELECT 'es', MIN(LENGTH(translations->'es'->>'title')), MAX(LENGTH(translations->'es'->>'title')), ROUND(AVG(LENGTH(translations->'es'->>'title'))) FROM blog_posts WHERE status='published'
UNION ALL SELECT 'sv', MIN(LENGTH(translations->'sv'->>'title')), MAX(LENGTH(translations->'sv'->>'title')), ROUND(AVG(LENGTH(translations->'sv'->>'title'))) FROM blog_posts WHERE status='published'
UNION ALL SELECT 'no', MIN(LENGTH(translations->'no'->>'title')), MAX(LENGTH(translations->'no'->>'title')), ROUND(AVG(LENGTH(translations->'no'->>'title'))) FROM blog_posts WHERE status='published'
UNION ALL SELECT 'fi', MIN(LENGTH(translations->'fi'->>'title')), MAX(LENGTH(translations->'fi'->>'title')), ROUND(AVG(LENGTH(translations->'fi'->>'title'))) FROM blog_posts WHERE status='published';
