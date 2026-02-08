-- Fix garbled/duplicate Swedish meta for 15 blog posts

-- === Grade-level posts (6) ===

-- Pre-K (3-5) = Förskola
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Top 10 Arbetsblad-generatorer Förskola (3-5 år) | Gratis"'),
  '{sv,metaDescription}', '"Upptäck de bästa arbetsblad-generatorerna för förskolan. Finmotorik, former och första bokstäver. Gratis utskrivbara PDF-arbetsblad på 3 minuter."'),
  '{sv,focusKeyword}', '"arbetsblad generatorer förskola gratis"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (5-6) = Förskoleklass
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Top 10 Arbetsblad-generatorer Förskoleklass (5-6 år)"'),
  '{sv,metaDescription}', '"De bästa arbetsblad-generatorerna för förskoleklassen. Siffror, bokstäver och visuella övningar. Gratis utskrivbara PDF-arbetsblad på 3 minuter."'),
  '{sv,focusKeyword}', '"arbetsblad generatorer förskoleklass gratis"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (6-7) = Årskurs 1
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Top 10 Arbetsblad-generatorer Årskurs 1 (6-7 år) | PDF"'),
  '{sv,metaDescription}', '"De bästa arbetsblad-generatorerna för årskurs 1. Addition, läsning och skrivövningar för nybörjare. Gratis utskrivbara PDF-arbetsblad på 3 minuter."'),
  '{sv,focusKeyword}', '"arbetsblad generatorer årskurs 1 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (7-8) = Årskurs 2
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Top 10 Arbetsblad-generatorer Årskurs 2 (7-8 år) | PDF"'),
  '{sv,metaDescription}', '"De bästa arbetsblad-generatorerna för årskurs 2. Subtraktion, korsord och logikövningar. Gratis utskrivbara PDF-arbetsblad på 3 minuter."'),
  '{sv,focusKeyword}', '"arbetsblad generatorer årskurs 2 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (8-9) = Årskurs 3
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Top 10 Arbetsblad-generatorer Årskurs 3 (8-9 år) | PDF"'),
  '{sv,metaDescription}', '"De bästa arbetsblad-generatorerna för årskurs 3. Kryptogram, algebra och kritiskt tänkande. Gratis utskrivbara PDF-arbetsblad på 3 minuter."'),
  '{sv,focusKeyword}', '"arbetsblad generatorer årskurs 3 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (9-11) = Årskurs 4-5
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Top 10 Arbetsblad-generatorer Årskurs 4-5 (9-11 år)"'),
  '{sv,metaDescription}', '"De bästa arbetsblad-generatorerna för årskurs 4 och 5. Avancerad logik, bråk och resonemang. Gratis utskrivbara PDF-arbetsblad på 3 minuter."'),
  '{sv,focusKeyword}', '"arbetsblad generatorer årskurs 4-5 gratis"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- === Other posts (9) ===

-- 33 Editable Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"33 Redigerbara Arbetsblad-generatorer för Lärare"'),
  '{sv,metaDescription}', '"Skapa arbetsblad med 33 redigerbara generatorer. Matematik, läsning, skrivning och målarbilder. Kommersiell licens ingår. PDF 300 DPI på 3 minuter."'),
  '{sv,focusKeyword}', '"redigerbara arbetsblad generatorer lärare"')
WHERE slug = '33-editable-worksheet-generators-elementary-teachers' AND status = 'published';

-- 7 Picture-Based for ESL
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"7 Bildbaserade Arbetsblad-generatorer för SFI-elever"'),
  '{sv,metaDescription}', '"Skapa visuella arbetsblad för SFI-elever med 7 bildbaserade generatorer. Stöd på 11 språk för språkinlärning. Gratis PDF-arbetsblad."'),
  '{sv,focusKeyword}', '"bildbaserade arbetsblad generatorer SFI"')
WHERE slug = '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported' AND status = 'published';

-- Parent Homeschool
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Arbetsblad-generatorer för Hemundervisning och Föräldrar"'),
  '{sv,metaDescription}', '"Skapa anpassade arbetsblad för hemundervisning. Generatorer för matematik, bokstäver och kreativa aktiviteter. Komplett läroplansstöd som PDF."'),
  '{sv,focusKeyword}', '"arbetsblad generatorer hemundervisning föräldrar"')
WHERE slug = 'parent-homeschool-worksheet-generators-complete-curriculum-support' AND status = 'published';

-- Differentiated Instruction
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Guide till Differentierad Undervisning med Arbetsblad"'),
  '{sv,metaDescription}', '"Komplett guide till differentierad undervisning med redigerbara arbetsblad-generatorer. Anpassa aktiviteter efter varje elevs inlärningsnivå."'),
  '{sv,focusKeyword}', '"differentierad undervisning arbetsblad"')
WHERE slug = 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators' AND status = 'published';

-- Yearly Planning Guide
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Årsplanering Arbetsblad: 12 Månaders Strategi för Lärare"'),
  '{sv,metaDescription}', '"Planera 12 månader med arbetsblad med denna kompletta guide. Månatliga strategier för grundskollärare. Mallar och idéer för varje årstid."'),
  '{sv,focusKeyword}', '"årsplanering arbetsblad grundskola"')
WHERE slug = 'your-complete-yearly-planning-guide-12-month-worksheet-strategy' AND status = 'published';

-- ADHD-Friendly
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"ADHD-arbetsblad: 9 Generatorer med Låg Belastning"'),
  '{sv,metaDescription}', '"Skapa arbetsblad anpassade för elever med ADHD med 9 specialiserade generatorer. Aktiviteter med låg kognitiv belastning för bättre koncentration."'),
  '{sv,focusKeyword}', '"ADHD arbetsblad låg kognitiv belastning"')
WHERE slug = 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load' AND status = 'published';

-- Dyslexia-Friendly
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Dyslexi-arbetsblad: 7 Generatorer med Fonologiskt Stöd"'),
  '{sv,metaDescription}', '"Skapa arbetsblad för elever med dyslexi med 7 specialiserade generatorer. Fonologiskt och visuellt stöd för läsning och inlärning."'),
  '{sv,focusKeyword}', '"dyslexi arbetsblad fonologiskt stöd"')
WHERE slug = 'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support' AND status = 'published';

-- Upper Elementary
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Utmanande Arbetsblad Årskurs 4-5 för Duktiga Elever"'),
  '{sv,metaDescription}', '"Utmana duktiga elever i årskurs 4 och 5 med komplexa arbetsblad. Generatorer för logik, avancerad matematik och kritiskt tänkande. Gratis PDF."'),
  '{sv,focusKeyword}', '"utmanande arbetsblad årskurs 4-5"')
WHERE slug = 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets' AND status = 'published';

-- Multi-Language Scandinavian
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{sv,metaTitle}', '"Flerspråkig Arbetsblad-generator för Skandinavien"'),
  '{sv,metaDescription}', '"Skapa arbetsblad på svenska, danska, norska och finska. Flerspråkig generator med 11 språk. Perfekt för internationella skolor och lärare."'),
  '{sv,focusKeyword}', '"flerspråkig arbetsblad generator skandinavien"')
WHERE slug = 'multi-language-worksheet-generation-serving-scandinavian-markets' AND status = 'published';
