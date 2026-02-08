-- Find ALL Italian duplicate title groups with their slugs

-- Group: "schede didattiche per" (3 posts)
SELECT slug, translations->'it'->>'metaTitle' as title
FROM blog_posts WHERE status = 'published'
AND translations->'it'->>'metaTitle' = (
  SELECT translations->'it'->>'metaTitle' FROM blog_posts WHERE status='published'
  AND slug = '33-editable-worksheet-generators-elementary-teachers'
) ORDER BY slug;

-- Group: "guida completa alla" (2 posts)
SELECT slug, translations->'it'->>'metaTitle' as title, translations->'it'->>'focusKeyword' as fk
FROM blog_posts WHERE status = 'published'
AND translations->'it'->>'focusKeyword' = 'schede gratuite guida completa alla'
ORDER BY slug;

-- Group: "schede didattiche per" with 3 count
SELECT slug, translations->'it'->>'metaTitle' as title, translations->'it'->>'focusKeyword' as fk
FROM blog_posts WHERE status = 'published'
AND translations->'it'->>'focusKeyword' = 'schede gratuite schede didattiche per'
ORDER BY slug;
