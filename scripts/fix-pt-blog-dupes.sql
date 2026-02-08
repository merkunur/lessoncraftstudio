-- Fix duplicate/garbled Portuguese meta for 8 blog posts

-- Pre-K (ages 3-5) = Pré-escola
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"Top 10 Geradores de Atividades Pré-escola (3-5 anos)"'),
  '{pt,metaDescription}', '"Descubra os melhores geradores de atividades para pré-escola. Coordenação motora, formas e primeiras letras. Atividades em PDF para imprimir em 3 minutos."'),
  '{pt,focusKeyword}', '"geradores atividades pré-escola grátis"')
WHERE slug = 'top-10-worksheet-generators-for-pre-k-teachers-ages-3-5' AND status = 'published';

-- Kindergarten (ages 5-6) = Jardim de Infância
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"Top 10 Geradores de Atividades Infantil (5-6 anos)"'),
  '{pt,metaDescription}', '"Os melhores geradores de atividades para educação infantil. Números, letras e exercícios visuais. Atividades educativas gratuitas em PDF em 3 minutos."'),
  '{pt,focusKeyword}', '"geradores atividades educação infantil grátis"')
WHERE slug = 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6' AND status = 'published';

-- 1st Grade (ages 6-7) = 1.° ano
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"Top 10 Geradores de Atividades 1.° Ano (6-7 anos) | PDF"'),
  '{pt,metaDescription}', '"Os melhores geradores de atividades para o 1.° ano. Adição, leitura e exercícios de escrita para alfabetização. Atividades em PDF gratuitas em 3 minutos."'),
  '{pt,focusKeyword}', '"geradores atividades primeiro ano grátis"')
WHERE slug = 'top-10-worksheet-generators-for-1st-grade-teachers-ages-6-7' AND status = 'published';

-- 2nd Grade (ages 7-8) = 2.° ano
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"Top 10 Geradores de Atividades 2.° Ano (7-8 anos) | PDF"'),
  '{pt,metaDescription}', '"Os melhores geradores de atividades para o 2.° ano. Subtração, palavras cruzadas e exercícios de lógica. Atividades educativas em PDF gratuitas em 3 min."'),
  '{pt,focusKeyword}', '"geradores atividades segundo ano grátis"')
WHERE slug = 'top-10-worksheet-generators-for-2nd-grade-teachers-ages-7-8' AND status = 'published';

-- 3rd Grade (ages 8-9) = 3.° ano
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"Top 10 Geradores de Atividades 3.° Ano (8-9 anos) | PDF"'),
  '{pt,metaDescription}', '"Os melhores geradores de atividades para o 3.° ano. Criptogramas, álgebra e pensamento crítico. Atividades educativas em PDF para imprimir em 3 minutos."'),
  '{pt,focusKeyword}', '"geradores atividades terceiro ano grátis"')
WHERE slug = 'top-10-worksheet-generators-for-3rd-grade-teachers-ages-8-9' AND status = 'published';

-- 4th-5th Grade (ages 9-11) = 4.°-5.° ano
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"Top 10 Geradores de Atividades 4.°-5.° Ano (9-11 anos)"'),
  '{pt,metaDescription}', '"Os melhores geradores de atividades para 4.° e 5.° ano. Lógica avançada, frações e raciocínio. Atividades em PDF para imprimir gratuitamente em 3 min."'),
  '{pt,focusKeyword}', '"geradores atividades quarto quinto ano grátis"')
WHERE slug = 'top-10-worksheet-generators-for-4th-5th-grade-teachers-ages-9-11' AND status = 'published';

-- 33 Editable Worksheet Generators
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"33 Geradores de Atividades Editáveis para Professores"'),
  '{pt,metaDescription}', '"Crie atividades educativas com 33 geradores editáveis. Matemática, leitura, escrita e colorir. Licença comercial incluída. PDF 300 DPI em 3 minutos."'),
  '{pt,focusKeyword}', '"geradores atividades editáveis professores"')
WHERE slug = '33-editable-worksheet-generators-elementary-teachers' AND status = 'published';

-- Multi-Language Worksheet Generation for Scandinavian Markets
UPDATE blog_posts SET translations = jsonb_set(jsonb_set(jsonb_set(translations,
  '{pt,metaTitle}', '"Gerador de Atividades Multilíngue para Países Nórdicos"'),
  '{pt,metaDescription}', '"Crie atividades educativas em sueco, dinamarquês, norueguês e finlandês. Gerador multilíngue com 11 idiomas. Ideal para escolas internacionais."'),
  '{pt,focusKeyword}', '"gerador atividades multilíngue nórdicos"')
WHERE slug = 'multi-language-worksheet-generation-serving-scandinavian-markets' AND status = 'published';
