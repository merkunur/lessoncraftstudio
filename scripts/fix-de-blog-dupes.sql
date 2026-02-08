-- Fix duplicate German meta for top-10 grade-level posts

-- Pre-K (ages 3-5)
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{de,metaTitle}', '"Top 10 Arbeitsblatt-Generatoren Vorschule (3-5 Jahre)"'),
  '{de,metaDescription}', '"Entdecken Sie die besten Arbeitsblatt-Generatoren für Vorschulkinder. Feinmotorik, Mustererkennung und erste Buchstaben. Druckbare PDF-Arbeitsblätter in 3 Min."'),
  '{de,focusKeyword}', '"arbeitsblatt-generatoren vorschule kostenlos"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (ages 5-6)
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{de,metaTitle}', '"Top 10 Arbeitsblatt-Generatoren Kindergarten (5-6 Jahre)"'),
  '{de,metaDescription}', '"Die besten Arbeitsblatt-Generatoren für den Kindergarten. Zahlen, Buchstaben und visuelle Übungen. Kostenlose druckbare Arbeitsblätter als PDF in 3 Minuten."'),
  '{de,focusKeyword}', '"arbeitsblatt-generatoren kindergarten kostenlos"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (ages 6-7)
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{de,metaTitle}', '"Top 10 Arbeitsblatt-Generatoren 1. Klasse (6-7 Jahre)"'),
  '{de,metaDescription}', '"Die besten Arbeitsblatt-Generatoren für die 1. Klasse. Addition, Lesen und Schreibübungen für Erstklässler. Kostenlose PDF-Arbeitsblätter in 3 Minuten."'),
  '{de,focusKeyword}', '"arbeitsblatt-generatoren 1. klasse kostenlos"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (ages 7-8)
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{de,metaTitle}', '"Top 10 Arbeitsblatt-Generatoren 2. Klasse (7-8 Jahre)"'),
  '{de,metaDescription}', '"Die besten Arbeitsblatt-Generatoren für die 2. Klasse. Subtraktion, Kreuzworträtsel und Logikübungen. Kostenlose druckbare PDF-Arbeitsblätter in 3 Minuten."'),
  '{de,focusKeyword}', '"arbeitsblatt-generatoren 2. klasse kostenlos"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (ages 8-9)
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{de,metaTitle}', '"Top 10 Arbeitsblatt-Generatoren 3. Klasse (8-9 Jahre)"'),
  '{de,metaDescription}', '"Die besten Arbeitsblatt-Generatoren für die 3. Klasse. Kryptogramme, Algebra und kritisches Denken. Kostenlose druckbare PDF-Arbeitsblätter in 3 Minuten."'),
  '{de,focusKeyword}', '"arbeitsblatt-generatoren 3. klasse kostenlos"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (ages 9-11)
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{de,metaTitle}', '"Top 10 Arbeitsblatt-Generatoren 4.-5. Klasse (9-11 Jahre)"'),
  '{de,metaDescription}', '"Die besten Arbeitsblatt-Generatoren für 4. und 5. Klasse. Komplexe Muster, mehrstufige Logik und Rasterzeichnen. Druckbare PDF-Arbeitsblätter in 3 Minuten."'),
  '{de,focusKeyword}', '"arbeitsblatt-generatoren 4. 5. klasse kostenlos"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';
