-- Generic blog meta verification -- replace LOCALE placeholder before running
-- Usage: sed 's/LOCALE/de/g' verify-blog-meta.sql | psql ...

-- 1. Length distributions
SELECT 'metaTitle' as field,
  sum(CASE WHEN length(jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle')) < 50 THEN 1 ELSE 0 END) as too_short,
  sum(CASE WHEN length(jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle')) BETWEEN 50 AND 60 THEN 1 ELSE 0 END) as optimal,
  sum(CASE WHEN length(jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle')) > 60 THEN 1 ELSE 0 END) as too_long,
  sum(CASE WHEN jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle') IS NULL OR jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle') = '' THEN 1 ELSE 0 END) as missing
FROM blog_posts WHERE status = 'published';

SELECT 'metaDesc' as field,
  sum(CASE WHEN length(jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription')) < 140 THEN 1 ELSE 0 END) as too_short,
  sum(CASE WHEN length(jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription')) BETWEEN 140 AND 160 THEN 1 ELSE 0 END) as optimal,
  sum(CASE WHEN length(jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription')) > 160 THEN 1 ELSE 0 END) as too_long,
  sum(CASE WHEN jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription') IS NULL OR jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription') = '' THEN 1 ELSE 0 END) as missing
FROM blog_posts WHERE status = 'published';

SELECT 'focusKW' as field,
  sum(CASE WHEN jsonb_extract_path_text(translations, 'LOCALE', 'focusKeyword') IS NOT NULL AND jsonb_extract_path_text(translations, 'LOCALE', 'focusKeyword') != '' THEN 1 ELSE 0 END) as present,
  sum(CASE WHEN jsonb_extract_path_text(translations, 'LOCALE', 'focusKeyword') IS NULL OR jsonb_extract_path_text(translations, 'LOCALE', 'focusKeyword') = '' THEN 1 ELSE 0 END) as missing
FROM blog_posts WHERE status = 'published';

-- 2. Min/Max lengths
SELECT 'lengths' as check_name,
  min(length(jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle'))) as min_title,
  max(length(jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle'))) as max_title,
  min(length(jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription'))) as min_desc,
  max(length(jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription'))) as max_desc
FROM blog_posts WHERE status = 'published';

-- 3. Garbage patterns
SELECT 'GARBAGE_TITLE' as issue, slug, left(jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle'), 60) as val
FROM blog_posts WHERE status = 'published'
  AND (jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle') LIKE 'Free Printable%'
    OR jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle') LIKE 'Kostenlos%Druckbar%'
    OR jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle') LIKE 'Kostenlose Druckbare%'
    OR jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle') LIKE '%...%-%LessonCraftStudio%');

SELECT 'GARBAGE_DESC' as issue, slug, left(jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription'), 60) as val
FROM blog_posts WHERE status = 'published'
  AND (jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription') LIKE 'Download free%'
    OR jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription') LIKE 'Laden Sie kostenlose%');

-- 4. Duplicates
SELECT 'DUP_TITLE' as issue, jsonb_extract_path_text(translations, 'LOCALE', 'metaTitle') as val, count(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY val HAVING count(*) > 1;

SELECT 'DUP_DESC' as issue, left(jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription'), 60) as val, count(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY jsonb_extract_path_text(translations, 'LOCALE', 'metaDescription') HAVING count(*) > 1;

SELECT 'DUP_KW' as issue, jsonb_extract_path_text(translations, 'LOCALE', 'focusKeyword') as val, count(*) as cnt
FROM blog_posts WHERE status = 'published'
GROUP BY val HAVING count(*) > 1;
