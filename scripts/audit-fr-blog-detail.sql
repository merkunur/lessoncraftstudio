-- Full French meta for top-10 grade-level posts
SELECT slug,
  translations->'fr'->>'metaTitle' as fr_title,
  translations->'fr'->>'metaDescription' as fr_desc,
  translations->'fr'->>'focusKeyword' as fr_fk
FROM blog_posts
WHERE status = 'published'
AND slug LIKE 'top-10-worksheet-generators-for-%'
ORDER BY slug;

-- Duplicate French titles (all posts)
SELECT translations->'fr'->>'metaTitle' as title, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'fr'->>'metaTitle' HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- Duplicate French focusKeywords (all posts)
SELECT translations->'fr'->>'focusKeyword' as fk, COUNT(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY translations->'fr'->>'focusKeyword' HAVING COUNT(*) > 1
ORDER BY cnt DESC;
