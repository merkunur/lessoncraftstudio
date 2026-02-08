-- Fix duplicate/garbled French meta for 8 blog posts

-- Pre-K (ages 3-5) = Petite/Moyenne Section Maternelle
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches Maternelle (3-5 ans)"'),
  '{fr,metaDescription}', '"Découvrez les meilleurs générateurs de fiches pour la maternelle. Motricité fine, reconnaissance des formes et premières lettres. Fiches PDF imprimables en 3 min."'),
  '{fr,focusKeyword}', '"générateurs fiches maternelle gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (ages 5-6) = Grande Section Maternelle
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches Grande Section (5-6 ans)"'),
  '{fr,metaDescription}', '"Les meilleurs générateurs de fiches pour la grande section. Chiffres, lettres et exercices visuels. Fiches pédagogiques gratuites en PDF imprimables en 3 minutes."'),
  '{fr,focusKeyword}', '"générateurs fiches grande section gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (ages 6-7) = CP
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CP (6-7 ans)"'),
  '{fr,metaDescription}', '"Les meilleurs générateurs de fiches pour le CP. Addition, lecture et exercices d''écriture pour le cours préparatoire. Fiches PDF gratuites en 3 minutes."'),
  '{fr,focusKeyword}', '"générateurs fiches CP gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (ages 7-8) = CE1
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CE1 (7-8 ans)"'),
  '{fr,metaDescription}', '"Les meilleurs générateurs de fiches pour le CE1. Soustraction, mots croisés et exercices de logique. Fiches pédagogiques gratuites imprimables en PDF en 3 min."'),
  '{fr,focusKeyword}', '"générateurs fiches CE1 gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (ages 8-9) = CE2
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CE2 (8-9 ans)"'),
  '{fr,metaDescription}', '"Les meilleurs générateurs de fiches pour le CE2. Cryptogrammes, algèbre et pensée critique. Fiches pédagogiques gratuites imprimables en PDF en 3 minutes."'),
  '{fr,focusKeyword}', '"générateurs fiches CE2 gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (ages 9-11) = CM1-CM2
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"Top 10 Générateurs de Fiches CM1-CM2 (9-11 ans)"'),
  '{fr,metaDescription}', '"Les meilleurs générateurs de fiches pour CM1 et CM2. Logique avancée, fractions et exercices de raisonnement. Fiches PDF imprimables gratuites en 3 minutes."'),
  '{fr,focusKeyword}', '"générateurs fiches CM1 CM2 gratuit"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- 33 Editable Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"33 Générateurs de Fiches Modifiables pour Enseignants"'),
  '{fr,metaDescription}', '"Créez des fiches pédagogiques avec 33 générateurs modifiables. Maths, lecture, écriture et coloriage. Licence commerciale incluse. PDF 300 DPI en 3 minutes."'),
  '{fr,focusKeyword}', '"générateurs fiches modifiables enseignants"')
WHERE slug = '33-editable-worksheet-generators-elementary-teachers' AND status = 'published';

-- Multi-Language Worksheet Generation for Scandinavian Markets
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{fr,metaTitle}', '"Générateur de Fiches Multilingue pour les Pays Scandinaves"'),
  '{fr,metaDescription}', '"Créez des fiches pédagogiques en suédois, danois, norvégien et finnois. Générateur multilingue avec 11 langues. Idéal pour les écoles internationales."'),
  '{fr,focusKeyword}', '"générateur fiches multilingue scandinave"')
WHERE slug = 'multi-language-worksheet-generation-serving-scandinavian-markets' AND status = 'published';
