-- Fix duplicate/generic Spanish meta for 8 blog posts

-- Pre-K (ages 3-5) = Preescolar
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"Top 10 Generadores de Fichas Preescolar (3-5 años)"'),
  '{es,metaDescription}', '"Descubre los mejores generadores de fichas para preescolar. Motricidad fina, reconocimiento de formas y primeras letras. Fichas PDF imprimibles en 3 min."'),
  '{es,focusKeyword}', '"generadores fichas preescolar gratis"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (ages 5-6) = Infantil
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"Top 10 Generadores de Fichas Infantil (5-6 años) | Gratis"'),
  '{es,metaDescription}', '"Los mejores generadores de fichas para educación infantil. Números, letras y ejercicios visuales. Fichas educativas gratuitas en PDF imprimibles en 3 minutos."'),
  '{es,focusKeyword}', '"generadores fichas educación infantil gratis"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (ages 6-7) = 1.° Primaria
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"Top 10 Generadores de Fichas 1.° Primaria (6-7 años)"'),
  '{es,metaDescription}', '"Los mejores generadores de fichas para 1.° de primaria. Suma, lectura y ejercicios de escritura. Fichas educativas gratuitas en PDF imprimibles en 3 minutos."'),
  '{es,focusKeyword}', '"generadores fichas primero primaria gratis"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (ages 7-8) = 2.° Primaria
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"Top 10 Generadores de Fichas 2.° Primaria (7-8 años)"'),
  '{es,metaDescription}', '"Los mejores generadores de fichas para 2.° de primaria. Resta, crucigramas y ejercicios de lógica. Fichas educativas gratuitas imprimibles en PDF en 3 min."'),
  '{es,focusKeyword}', '"generadores fichas segundo primaria gratis"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (ages 8-9) = 3.° Primaria
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"Top 10 Generadores de Fichas 3.° Primaria (8-9 años)"'),
  '{es,metaDescription}', '"Los mejores generadores de fichas para 3.° de primaria. Criptogramas, álgebra y pensamiento crítico. Fichas educativas gratuitas imprimibles en PDF en 3 min."'),
  '{es,focusKeyword}', '"generadores fichas tercero primaria gratis"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (ages 9-11) = 4.°-5.° Primaria
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"Top 10 Generadores de Fichas 4.°-5.° Primaria (9-11 años)"'),
  '{es,metaDescription}', '"Los mejores generadores de fichas para 4.° y 5.° de primaria. Lógica avanzada, fracciones y razonamiento. Fichas PDF imprimibles gratuitas en 3 minutos."'),
  '{es,focusKeyword}', '"generadores fichas cuarto quinto primaria gratis"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- 33 Editable Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"33 Generadores de Fichas Editables para Maestros | Gratis"'),
  '{es,metaDescription}', '"Crea fichas educativas con 33 generadores editables. Matemáticas, lectura, escritura y colorear. Licencia comercial incluida. PDF 300 DPI en 3 minutos."'),
  '{es,focusKeyword}', '"generadores fichas editables maestros"')
WHERE slug = '33-editable-worksheet-generators-elementary-teachers' AND status = 'published';

-- Multi-Language Worksheet Generation for Scandinavian Markets
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{es,metaTitle}', '"Generador de Fichas Multilingüe para Países Nórdicos"'),
  '{es,metaDescription}', '"Crea fichas educativas en sueco, danés, noruego y finlandés. Generador multilingüe con 11 idiomas. Ideal para escuelas internacionales y profesores."'),
  '{es,focusKeyword}', '"generador fichas multilingüe nórdicos"')
WHERE slug = 'multi-language-worksheet-generation-serving-scandinavian-markets' AND status = 'published';
