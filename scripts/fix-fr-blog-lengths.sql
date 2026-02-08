-- Fix short French titles (add grade context to reach 50+ chars)

-- CP: 41 → 55 chars
UPDATE blog_posts SET translations = jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CP (6-7 ans) | Gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- CE1: 42 → 56 chars
UPDATE blog_posts SET translations = jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CE1 (7-8 ans) | Gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- CE2: 42 → 56 chars
UPDATE blog_posts SET translations = jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CE2 (8-9 ans) | Gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- CM1-CM2: 47 → already borderline, add suffix
UPDATE blog_posts SET translations = jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CM1-CM2 (9-11 ans) | PDF"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- Maternelle: 49 → add suffix
UPDATE blog_posts SET translations = jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches Maternelle (3-5 ans) | PDF"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Trim 2 descriptions from 162 to 160
UPDATE blog_posts SET translations = jsonb_set(translations,
  '{fr,metaDescription}', '"Découvrez les meilleurs générateurs de fiches pour la maternelle. Motricité fine, formes et premières lettres. Fiches PDF imprimables en 3 min."')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

UPDATE blog_posts SET translations = jsonb_set(translations,
  '{fr,metaDescription}', '"Les meilleurs générateurs de fiches pour la grande section. Chiffres, lettres et exercices visuels. Fiches pédagogiques gratuites PDF imprimables en 3 min."')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';
