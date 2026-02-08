-- Fix garbled/duplicate Danish meta for 15 blog posts

-- === Grade-level posts (6) ===

-- Pre-K (3-5) = Børnehave
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Top 10 Opgave-generatorer Børnehave (3-5 år) | Gratis"'),
  '{da,metaDescription}', '"Opdag de bedste opgave-generatorer til børnehaven. Finmotorik, former og første bogstaver. Gratis printbare PDF-arbejdsark på 3 minutter."'),
  '{da,focusKeyword}', '"opgave generatorer børnehave gratis"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (5-6) = Børnehaveklasse
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Top 10 Opgave-generatorer Børnehaveklasse (5-6 år)"'),
  '{da,metaDescription}', '"De bedste opgave-generatorer til børnehaveklassen. Tal, bogstaver og visuelle øvelser. Gratis printbare PDF-arbejdsark på 3 minutter."'),
  '{da,focusKeyword}', '"opgave generatorer børnehaveklasse gratis"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (6-7) = 1. klasse
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Top 10 Opgave-generatorer 1. Klasse (6-7 år) | Gratis"'),
  '{da,metaDescription}', '"De bedste opgave-generatorer til 1. klasse. Addition, læsning og skriveøvelser for begyndere. Gratis printbare PDF-arbejdsark på 3 minutter."'),
  '{da,focusKeyword}', '"opgave generatorer 1. klasse gratis"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (7-8) = 2. klasse
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Top 10 Opgave-generatorer 2. Klasse (7-8 år) | Gratis"'),
  '{da,metaDescription}', '"De bedste opgave-generatorer til 2. klasse. Subtraktion, krydsord og logikøvelser. Gratis printbare PDF-arbejdsark på 3 minutter."'),
  '{da,focusKeyword}', '"opgave generatorer 2. klasse gratis"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (8-9) = 3. klasse
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Top 10 Opgave-generatorer 3. Klasse (8-9 år) | Gratis"'),
  '{da,metaDescription}', '"De bedste opgave-generatorer til 3. klasse. Kryptogrammer, algebra og kritisk tænkning. Gratis printbare PDF-arbejdsark på 3 minutter."'),
  '{da,focusKeyword}', '"opgave generatorer 3. klasse gratis"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (9-11) = 4.-5. klasse
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Top 10 Opgave-generatorer 4.-5. Klasse (9-11 år) | PDF"'),
  '{da,metaDescription}', '"De bedste opgave-generatorer til 4. og 5. klasse. Avanceret logik, brøker og ræsonnement. Gratis printbare PDF-arbejdsark på 3 minutter."'),
  '{da,focusKeyword}', '"opgave generatorer 4.-5. klasse gratis"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- === Other posts (9) ===

-- 33 Editable Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"33 Redigerbare Opgave-generatorer for Lærere | Gratis"'),
  '{da,metaDescription}', '"Opret arbejdsark med 33 redigerbare generatorer. Matematik, læsning, skrivning og tegning. Kommerciel licens inkluderet. PDF 300 DPI på 3 minutter."'),
  '{da,focusKeyword}', '"redigerbare opgave generatorer lærere"')
WHERE slug = '33-editable-worksheet-generators-elementary-teachers' AND status = 'published';

-- 7 Picture-Based for ESL
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"7 Billedbaserede Opgave-generatorer til Sprogundervisning"'),
  '{da,metaDescription}', '"Opret visuelle arbejdsark til sprogundervisning med 7 billedbaserede generatorer. Understøttelse på 11 sprog. Gratis PDF-arbejdsark."'),
  '{da,focusKeyword}', '"billedbaserede opgave generatorer sprogundervisning"')
WHERE slug = '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported' AND status = 'published';

-- Parent Homeschool
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Opgave-generatorer til Hjemmeundervisning og Forældre"'),
  '{da,metaDescription}', '"Opret tilpassede arbejdsark til hjemmeundervisning. Generatorer til matematik, bogstaver og kreative aktiviteter. Komplet læreplanstøtte som PDF."'),
  '{da,focusKeyword}', '"opgave generatorer hjemmeundervisning forældre"')
WHERE slug = 'parent-homeschool-worksheet-generators-complete-curriculum-support' AND status = 'published';

-- Differentiated Instruction
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Guide til Differentieret Undervisning med Arbejdsark"'),
  '{da,metaDescription}', '"Komplet guide til differentieret undervisning med redigerbare opgave-generatorer. Tilpas aktiviteter til hver elevs læringsniveau."'),
  '{da,focusKeyword}', '"differentieret undervisning arbejdsark"')
WHERE slug = 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators' AND status = 'published';

-- Yearly Planning Guide
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Årsplanlægning Arbejdsark: 12 Måneders Strategi"'),
  '{da,metaDescription}', '"Planlæg 12 måneder med arbejdsark med denne komplette guide. Månedlige strategier for grundskolelærere. Skabeloner og idéer til hver årstid."'),
  '{da,focusKeyword}', '"årsplanlægning arbejdsark grundskole"')
WHERE slug = 'your-complete-yearly-planning-guide-12-month-worksheet-strategy' AND status = 'published';

-- ADHD-Friendly
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"ADHD-arbejdsark: 9 Generatorer med Lav Belastning"'),
  '{da,metaDescription}', '"Opret arbejdsark tilpasset elever med ADHD med 9 specialiserede generatorer. Aktiviteter med lav kognitiv belastning for bedre koncentration."'),
  '{da,focusKeyword}', '"ADHD arbejdsark lav kognitiv belastning"')
WHERE slug = 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load' AND status = 'published';

-- Dyslexia-Friendly
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Ordblinde-arbejdsark: 7 Generatorer med Fonetisk Støtte"'),
  '{da,metaDescription}', '"Opret arbejdsark til ordblinde elever med 7 specialiserede generatorer. Fonetisk og visuel støtte til læsning og indlæring."'),
  '{da,focusKeyword}', '"ordblinde arbejdsark fonetisk støtte"')
WHERE slug = 'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support' AND status = 'published';

-- Upper Elementary
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Udfordrende Arbejdsark 4.-5. Klasse for Dygtige Elever"'),
  '{da,metaDescription}', '"Udfordr dygtige elever i 4. og 5. klasse med komplekse arbejdsark. Generatorer til logik, avanceret matematik og kritisk tænkning. Gratis PDF."'),
  '{da,focusKeyword}', '"udfordrende arbejdsark 4.-5. klasse"')
WHERE slug = 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets' AND status = 'published';

-- Multi-Language Scandinavian
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{da,metaTitle}', '"Flersproget Opgave-generator til Skandinaviske Lande"'),
  '{da,metaDescription}', '"Opret arbejdsark på dansk, svensk, norsk og finsk. Flersproget generator med 11 sprog. Perfekt til internationale skoler og lærere."'),
  '{da,focusKeyword}', '"flersproget opgave generator skandinavien"')
WHERE slug = 'multi-language-worksheet-generation-serving-scandinavian-markets' AND status = 'published';
