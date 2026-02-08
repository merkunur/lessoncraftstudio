-- Fix duplicate/generic Italian meta for 15 blog posts

-- === GROUP 1: Grade-level posts (6) ===

-- Pre-K (ages 3-5) = Scuola dell'infanzia
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Top 10 Generatori di Schede Infanzia (3-5 anni) | Gratis"'),
  '{it,metaDescription}', '"Scopri i migliori generatori di schede per la scuola dell''infanzia. Motricità fine, forme e prime lettere. Schede didattiche PDF stampabili in 3 minuti."'),
  '{it,focusKeyword}', '"generatori schede scuola infanzia gratis"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (ages 5-6) = Prescuola
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Top 10 Generatori di Schede Prescuola (5-6 anni) | PDF"'),
  '{it,metaDescription}', '"I migliori generatori di schede per la prescuola. Numeri, lettere ed esercizi visivi. Schede didattiche gratuite in PDF stampabili in 3 minuti."'),
  '{it,focusKeyword}', '"generatori schede prescuola gratis"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (ages 6-7) = 1ª Elementare
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Top 10 Generatori di Schede 1ª Elementare (6-7 anni)"'),
  '{it,metaDescription}', '"I migliori generatori di schede per la prima elementare. Addizione, lettura e scrittura per bambini. Schede didattiche gratuite in PDF in 3 minuti."'),
  '{it,focusKeyword}', '"generatori schede prima elementare gratis"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (ages 7-8) = 2ª Elementare
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Top 10 Generatori di Schede 2ª Elementare (7-8 anni)"'),
  '{it,metaDescription}', '"I migliori generatori di schede per la seconda elementare. Sottrazione, cruciverba ed esercizi di logica. Schede didattiche PDF gratuite in 3 minuti."'),
  '{it,focusKeyword}', '"generatori schede seconda elementare gratis"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (ages 8-9) = 3ª Elementare
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Top 10 Generatori di Schede 3ª Elementare (8-9 anni)"'),
  '{it,metaDescription}', '"I migliori generatori di schede per la terza elementare. Crittogrammi, algebra e pensiero critico. Schede didattiche PDF stampabili gratuite in 3 minuti."'),
  '{it,focusKeyword}', '"generatori schede terza elementare gratis"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (ages 9-11) = 4ª-5ª Elementare
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Top 10 Generatori Schede 4ª-5ª Elementare (9-11 anni)"'),
  '{it,metaDescription}', '"I migliori generatori di schede per quarta e quinta elementare. Logica avanzata, frazioni e ragionamento. Schede didattiche PDF gratuite in 3 minuti."'),
  '{it,focusKeyword}', '"generatori schede quarta quinta elementare gratis"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- === GROUP 2: "generatori schede didattiche" (3) ===

-- 33 Editable Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"33 Generatori di Schede Modificabili per Insegnanti"'),
  '{it,metaDescription}', '"Crea schede didattiche con 33 generatori modificabili. Matematica, lettura, scrittura e colorare. Licenza commerciale inclusa. PDF 300 DPI in 3 minuti."'),
  '{it,focusKeyword}', '"generatori schede modificabili insegnanti"')
WHERE slug = '33-editable-worksheet-generators-elementary-teachers' AND status = 'published';

-- 7 Picture-Based Worksheet Generators for ESL
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"7 Generatori di Schede Illustrate per Studenti ESL"'),
  '{it,metaDescription}', '"Genera schede illustrate per studenti ESL con 7 generatori visivi. Supporto in 11 lingue per l''apprendimento linguistico. Schede PDF gratuite in 3 min."'),
  '{it,focusKeyword}', '"generatori schede illustrate ESL multilingue"')
WHERE slug = '7-picture-based-worksheet-generators-for-esl-beginners-11-languages-supported' AND status = 'published';

-- Parent Homeschool Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Generatori di Schede per Homeschooling e Genitori"'),
  '{it,metaDescription}', '"Crea schede personalizzate per l''istruzione domiciliare. Generatori per matematica, lettere e attività creative. Supporto completo al curriculum in PDF."'),
  '{it,focusKeyword}', '"generatori schede homeschooling genitori"')
WHERE slug = 'parent-homeschool-worksheet-generators-complete-curriculum-support' AND status = 'published';

-- === GROUP 3: "guida completa alla" (2) ===

-- Ultimate Guide to Differentiated Instruction
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Guida alla Didattica Differenziata con Schede Editabili"'),
  '{it,metaDescription}', '"Guida completa alla didattica differenziata con generatori di schede editabili. Personalizza le attività per ogni livello di apprendimento degli alunni."'),
  '{it,focusKeyword}', '"didattica differenziata schede editabili"')
WHERE slug = 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators' AND status = 'published';

-- Complete Yearly Planning Guide
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Guida Pianificazione Annuale: Strategia Schede 12 Mesi"'),
  '{it,metaDescription}', '"Pianifica 12 mesi di schede didattiche con questa guida completa. Strategie mensili per insegnanti della scuola primaria. Modelli e idee per ogni stagione."'),
  '{it,focusKeyword}', '"pianificazione annuale schede didattiche"')
WHERE slug = 'your-complete-yearly-planning-guide-12-month-worksheet-strategy' AND status = 'published';

-- === GROUP 4: "schede didattiche per" (3) ===

-- ADHD-Friendly Worksheet Activities
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Schede per ADHD: 9 Generatori a Basso Carico Cognitivo"'),
  '{it,metaDescription}', '"Crea schede adatte a studenti con ADHD con 9 generatori specializzati. Attività a basso carico cognitivo che migliorano concentrazione e apprendimento."'),
  '{it,focusKeyword}', '"schede ADHD basso carico cognitivo"')
WHERE slug = 'adhd-friendly-worksheet-activities-9-generators-that-reduce-cognitive-load' AND status = 'published';

-- Dyslexia-Friendly Worksheet Strategies
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Schede per Dislessia: 7 Generatori con Supporto Fonetico"'),
  '{it,metaDescription}', '"Crea schede adatte a studenti con dislessia con 7 generatori specializzati. Supporto fonetico e visivo per facilitare la lettura e l''apprendimento."'),
  '{it,focusKeyword}', '"schede dislessia supporto fonetico"')
WHERE slug = 'dyslexia-friendly-worksheet-strategies-7-generators-with-phonics-support' AND status = 'published';

-- Upper Elementary Grades 4-5 Challenging Advanced Learners
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Schede Avanzate 4ª-5ª Elementare per Studenti Dotati"'),
  '{it,metaDescription}', '"Sfida gli studenti avanzati di quarta e quinta elementare con schede complesse. Generatori per logica, matematica avanzata e pensiero critico. PDF gratis."'),
  '{it,focusKeyword}', '"schede avanzate elementare studenti dotati"')
WHERE slug = 'upper-elementary-grades-4-5-challenging-advanced-learners-with-complex-worksheets' AND status = 'published';

-- === Multi-language post (unique but bad) ===

UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{it,metaTitle}', '"Generatore di Schede Multilingue per i Paesi Nordici"'),
  '{it,metaDescription}', '"Crea schede didattiche in svedese, danese, norvegese e finlandese. Generatore multilingue con 11 lingue. Ideale per scuole internazionali e insegnanti."'),
  '{it,focusKeyword}', '"generatore schede multilingue paesi nordici"')
WHERE slug = 'multi-language-worksheet-generation-serving-scandinavian-markets' AND status = 'published';
