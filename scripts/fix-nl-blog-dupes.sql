-- Fix duplicate/generic Dutch meta for 15 blog posts

-- === Grade-level posts (6) - Dutch uses Groep system ===

-- Pre-K (ages 3-5) = Voorschool / Peutergroep
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Top 10 Werkblad Generatoren Voorschool (3-5 jaar) | Gratis"'),
  '{nl,metaDescription}', '"Ontdek de beste werkblad generatoren voor de voorschool. Fijne motoriek, vormen en eerste letters. Gratis printbare PDF-werkbladen in 3 minuten."'),
  '{nl,focusKeyword}', '"werkblad generatoren voorschool gratis"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (ages 5-6) = Groep 1-2
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Top 10 Werkblad Generatoren Groep 1-2 (5-6 jaar) | PDF"'),
  '{nl,metaDescription}', '"De beste werkblad generatoren voor groep 1-2. Cijfers, letters en visuele oefeningen. Gratis printbare werkbladen als PDF in 3 minuten maken."'),
  '{nl,focusKeyword}', '"werkblad generatoren groep 1-2 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (ages 6-7) = Groep 3
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Top 10 Werkblad Generatoren Groep 3 (6-7 jaar) | Gratis"'),
  '{nl,metaDescription}', '"De beste werkblad generatoren voor groep 3. Optellen, lezen en schrijfoefeningen voor beginners. Gratis printbare PDF-werkbladen in 3 minuten."'),
  '{nl,focusKeyword}', '"werkblad generatoren groep 3 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (ages 7-8) = Groep 4
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Top 10 Werkblad Generatoren Groep 4 (7-8 jaar) | Gratis"'),
  '{nl,metaDescription}', '"De beste werkblad generatoren voor groep 4. Aftrekken, woordpuzzels en logica-oefeningen. Gratis printbare PDF-werkbladen in 3 minuten maken."'),
  '{nl,focusKeyword}', '"werkblad generatoren groep 4 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (ages 8-9) = Groep 5
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Top 10 Werkblad Generatoren Groep 5 (8-9 jaar) | Gratis"'),
  '{nl,metaDescription}', '"De beste werkblad generatoren voor groep 5. Cryptogrammen, algebra en kritisch denken. Gratis printbare PDF-werkbladen in 3 minuten maken."'),
  '{nl,focusKeyword}', '"werkblad generatoren groep 5 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (ages 9-11) = Groep 6-7
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Top 10 Werkblad Generatoren Groep 6-7 (9-11 jaar) | PDF"'),
  '{nl,metaDescription}', '"De beste werkblad generatoren voor groep 6 en 7. Geavanceerde logica, breuken en redeneren. Gratis printbare PDF-werkbladen in 3 minuten."'),
  '{nl,focusKeyword}', '"werkblad generatoren groep 6-7 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- === Other problematic posts (9) ===

-- 33 Editable Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"33 Bewerkbare Werkblad Generatoren voor Leerkrachten"'),
  '{nl,metaDescription}', '"Maak werkbladen met 33 bewerkbare generatoren. Rekenen, lezen, schrijven en kleuren. Commerciële licentie inbegrepen. PDF 300 DPI in 3 minuten."'),
  '{nl,focusKeyword}', '"bewerkbare werkblad generatoren leerkrachten"')
WHERE slug = '33-editable-worksheet-generators-elementary-teachers' AND status = 'published';

-- 7 Picture-Based Worksheet Generators for ESL
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"7 Visuele Werkblad Generatoren voor NT2-leerlingen"'),
  '{nl,metaDescription}', '"Maak visuele werkbladen voor NT2-leerlingen met 7 beeldgebaseerde generatoren. Ondersteuning in 11 talen voor taalleren. Gratis PDF-werkbladen."'),
  '{nl,focusKeyword}', '"visuele werkblad generatoren NT2 meertalig"')
WHERE slug = '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported' AND status = 'published';

-- Parent Homeschool Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Werkblad Generatoren voor Thuisonderwijs en Ouders"'),
  '{nl,metaDescription}', '"Maak werkbladen op maat voor thuisonderwijs. Generatoren voor rekenen, letters en creatieve activiteiten. Volledige leerplanondersteuning als PDF."'),
  '{nl,focusKeyword}', '"werkblad generatoren thuisonderwijs ouders"')
WHERE slug = 'parent-homeschool-worksheet-generators-complete-curriculum-support' AND status = 'published';

-- Ultimate Guide to Differentiated Instruction
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Gids voor Gedifferentieerd Onderwijs met Werkbladen"'),
  '{nl,metaDescription}', '"Complete gids voor gedifferentieerd onderwijs met bewerkbare werkblad generatoren. Pas activiteiten aan per leerniveau van uw leerlingen."'),
  '{nl,focusKeyword}', '"gedifferentieerd onderwijs werkbladen"')
WHERE slug = 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators' AND status = 'published';

-- Complete Yearly Planning Guide
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Jaarplanning Werkbladen: 12 Maanden Strategie Gids"'),
  '{nl,metaDescription}', '"Plan 12 maanden werkbladen met deze complete gids. Maandelijkse strategieën voor basisschoolleerkrachten. Sjablonen en ideeën voor elk seizoen."'),
  '{nl,focusKeyword}', '"jaarplanning werkbladen basisschool"')
WHERE slug = 'your-complete-yearly-planning-guide-12-month-worksheet-strategy' AND status = 'published';

-- ADHD-Friendly Worksheet Activities
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"ADHD-werkbladen: 9 Generatoren met Lage Belasting"'),
  '{nl,metaDescription}', '"Maak werkbladen geschikt voor leerlingen met ADHD met 9 gespecialiseerde generatoren. Activiteiten met lage cognitieve belasting voor betere concentratie."'),
  '{nl,focusKeyword}', '"ADHD werkbladen lage cognitieve belasting"')
WHERE slug = 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load' AND status = 'published';

-- Dyslexia-Friendly Worksheet Strategies
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Dyslexie-werkbladen: 7 Generatoren met Fonetiek"'),
  '{nl,metaDescription}', '"Maak werkbladen voor leerlingen met dyslexie met 7 gespecialiseerde generatoren. Fonetische en visuele ondersteuning voor lezen en leren."'),
  '{nl,focusKeyword}', '"dyslexie werkbladen fonetische ondersteuning"')
WHERE slug = 'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support' AND status = 'published';

-- Upper Elementary Grades 4-5
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Uitdagende Werkbladen Bovenbouw Groep 6-7 | Gratis PDF"'),
  '{nl,metaDescription}', '"Daag gevorderde leerlingen in groep 6 en 7 uit met complexe werkbladen. Generatoren voor logica, geavanceerd rekenen en kritisch denken. Gratis PDF."'),
  '{nl,focusKeyword}', '"uitdagende werkbladen bovenbouw groep 6-7"')
WHERE slug = 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets' AND status = 'published';

-- Multi-Language Worksheet Generation for Scandinavian Markets
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{nl,metaTitle}', '"Meertalige Werkblad Generator voor Scandinavische Landen"'),
  '{nl,metaDescription}', '"Maak werkbladen in het Zweeds, Deens, Noors en Fins. Meertalige generator met 11 talen. Ideaal voor internationale scholen en leerkrachten."'),
  '{nl,focusKeyword}', '"meertalige werkblad generator scandinavisch"')
WHERE slug = 'multi-language-worksheet-generation-serving-scandinavian-markets' AND status = 'published';
