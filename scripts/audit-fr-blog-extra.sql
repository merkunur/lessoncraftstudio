-- Find posts with the 3rd duplicate pattern
SELECT slug,
  translations->'fr'->>'metaTitle' as fr_title,
  translations->'fr'->>'metaDescription' as fr_desc,
  translations->'fr'->>'focusKeyword' as fr_fk
FROM blog_posts
WHERE status = 'published'
AND translations->'fr'->>'focusKeyword' = 'fiches gratuites gnrateurs fiches pdagogiques'
ORDER BY slug;
