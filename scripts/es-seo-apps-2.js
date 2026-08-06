/**
 * ES SEO Part 2: Apps 3-17
 * Applies SEO strategy from spanish-complete-seo-prompt.md
 * Apps: code-addition, math-worksheet, math-puzzle, chart-count, wordsearch,
 *       crossword, cryptogram, word-scramble, word-guess, writing,
 *       matching, drawing-lines, find-objects, grid-match, find-and-count
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'es');

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function replaceField(content, fieldName, newValue) {
  const re = new RegExp(`(${fieldName}:\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newValue)}'`);
  }
  const re2 = new RegExp(`(${fieldName}:\\s*\\n\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re2.test(content)) {
    return content.replace(re2, `$1'${esc(newValue)}'`);
  }
  console.warn(`  WARNING: Could not find field ${fieldName}`);
  return content;
}

function replaceArrayField(content, fieldName, newValues) {
  const re = new RegExp(`(${fieldName}:\\s*)\\[[\\s\\S]*?\\]`);
  if (re.test(content)) {
    const formatted = newValues.map(v => `      '${esc(v)}',`).join('\n');
    return content.replace(re, `$1[\n${formatted}\n    ]`);
  }
  console.warn(`  WARNING: Could not find array field ${fieldName}`);
  return content;
}

function replaceHeroTitle(content, newTitle) {
  const re = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newTitle)}'`);
  }
  console.warn('  WARNING: Could not replace hero title');
  return content;
}

function replaceHeroDescription(content, newDesc) {
  const re = /(tagline:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newDesc)}'`);
  }
  console.warn('  WARNING: Could not replace hero description');
  return content;
}

function replaceSectionTitle(content, sectionName, newTitle) {
  const re = new RegExp(`(${sectionName}:\\s*\\{[\\s\\S]*?title:\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newTitle)}'`);
  }
  return content;
}

// ============================================================
// DATA FOR APPS 3-17
// ============================================================
const apps = [
  {
    file: 'code-addition.ts',
    seo: {
      primaryKeyword: 'crear rompecabezas matemáticos con código para vender en Etsy',
      secondaryKeywords: [
        'generador de fichas de suma codificada para Etsy',
        'rompecabezas criptaritméticos para Amazon KDP',
        'fichas de descifrar código matemático licencia comercial',
        'crear cuadernillos de código matemático para vender',
      ],
      lsiKeywords: [
        'licencia comercial fichas criptaritméticas 300 DPI',
        'ingreso pasivo rompecabezas educativos Etsy KDP',
        'descifrar código suma negocio imprimibles',
      ],
      titleTag: 'Rompecabezas de código matemático — Etsy | LCS',
      metaDescription: 'Cree rompecabezas de suma codificada para vender en Etsy y KDP. Los niños resuelven sumas para descifrar palabras. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Cree rompecabezas de código matemático para vender en Etsy y KDP',
      tagline: 'Genere fichas donde los niños resuelven sumas para descifrar palabras ocultas.',
      description: 'Cree rompecabezas matemáticos de descifrar código para vender en Etsy, Amazon KDP o Hotmart — un formato único que combina práctica de sumas con descubrimiento de palabras. Los niños resuelven ecuaciones de suma para desbloquear letras y revelar palabras ocultas, lo que convierte cada ficha en un desafío emocionante. El modo Palabra Revelada soporta los 11 idiomas de la interfaz, permitiéndole crear productos para el mercado hispano y otros mercados simultáneamente. Exporte PDFs listos para imprimir a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Los rompecabezas tipo código se destacan en los listados de Etsy porque ofrecen algo diferente a las fichas de matemáticas estándar — los compradores pagan precios premium por formatos creativos. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear rompecabezas de código matemático paso a paso',
      keyFeatures: 'Por qué los rompecabezas de código se venden bien en Etsy',
      businessUseCases: 'Vender rompecabezas de código en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'math-worksheet.ts',
    seo: {
      primaryKeyword: 'generador de fichas de matemáticas para vendedores de Etsy y KDP',
      secondaryKeywords: [
        'crear fichas de cálculo para vender en Etsy',
        'generador de operaciones matemáticas para Amazon KDP',
        'fichas numéricas imprimibles licencia comercial',
        'ejercicios de matemáticas para negocio de imprimibles',
      ],
      lsiKeywords: [
        'fichas matemáticas puras sin imágenes vendedores',
        'operaciones básicas suma resta multiplicación',
        'negocio imprimibles matemáticas mercado hispano',
      ],
      titleTag: 'Fichas de matemáticas para vender en Etsy | LCS',
      metaDescription: 'Genere fichas de cálculo puro para vender en Etsy, KDP y Hotmart. Suma, resta, multiplicación, división. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de matemáticas para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de operaciones numéricas puras — rápidas de generar, fáciles de vender.',
      description: 'Genere fichas de cálculo numérico para vender en Etsy, Amazon KDP o Hotmart. Este generador crea ejercicios de suma, resta, multiplicación y división puros — sin imágenes, solo números y operaciones. Ideal para vendedores que necesitan producir volúmenes altos de fichas de práctica matemática rápidamente. Configure el rango de dificultad, elija las operaciones, defina el número de problemas por página y exporte PDFs listos para imprimir a 300 DPI con solucionario automático. Las fichas numéricas puras funcionan en cualquier idioma y se venden todo el año — las matemáticas no tienen temporada. La licencia comercial está incluida. El mercado hispano de fichas de matemáticas en Etsy tiene competencia mínima y demanda creciente. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de cálculo en minutos',
      keyFeatures: 'Por qué las fichas de matemáticas se venden todo el año',
      businessUseCases: 'Vender fichas de matemáticas en múltiples plataformas',
    },
  },
  {
    file: 'math-puzzle.ts',
    seo: {
      primaryKeyword: 'generador de rompecabezas matemáticos para vender en Etsy',
      secondaryKeywords: [
        'crear puzzles de matemáticas para tienda Etsy',
        'rompecabezas de cuadrícula matemática para Amazon KDP',
        'fichas de puzzles numéricos licencia comercial',
        'generar rompecabezas de lógica matemática para vender',
      ],
      lsiKeywords: [
        'puzzles matemáticos cuadrícula vendedores Etsy',
        'rompecabezas educativos imprimibles KDP Hotmart',
        'fichas lógica matemática negocio imprimibles',
      ],
      titleTag: 'Rompecabezas de mates para vender en Etsy | LCS',
      metaDescription: 'Cree rompecabezas matemáticos de cuadrícula para vender en Etsy y KDP. Formato puzzle único con imágenes temáticas. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere rompecabezas matemáticos para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree puzzles de cuadrícula con imágenes temáticas que se destacan en los listados.',
      description: 'Genere rompecabezas matemáticos de cuadrícula para vender en Etsy, Amazon KDP o Hotmart. Este generador crea puzzles donde los niños resuelven operaciones para completar cuadrículas — un formato más atractivo que las fichas de ejercicios tradicionales. Seleccione imágenes de más de 3.000 ilustraciones en 104 temas para crear rompecabezas visualmente irresistibles que se destacan en los resultados de búsqueda. Exporte PDFs a 300 DPI con solucionario automático y véndalos con licencia comercial. Los rompecabezas matemáticos tienen una ventaja competitiva en Etsy: los compradores los perciben como más divertidos que las fichas estándar y pagan precios más altos. Ideal para cuadernillos de actividades en Amazon KDP. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Crear rompecabezas matemáticos profesionales paso a paso',
      keyFeatures: 'Por qué los puzzles matemáticos se destacan en Etsy',
      businessUseCases: 'Vender puzzles de matemáticas en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'chart-count.ts',
    seo: {
      primaryKeyword: 'fichas de conteo y gráficos para tienda Etsy',
      secondaryKeywords: [
        'generador de fichas de gráficos de conteo para Etsy',
        'fichas de conteo con imágenes para Amazon KDP',
        'ejercicios de gráficos imprimibles licencia comercial',
        'crear fichas de contar y graficar para vender',
      ],
      lsiKeywords: [
        'fichas conteo visual preescolar vendedores',
        'gráficos de barras educativos imprimibles',
        'negocio fichas conteo mercado hispano Etsy',
      ],
      titleTag: 'Fichas de conteo y gráficos para Etsy | LCS',
      metaDescription: 'Cree fichas de conteo y gráficos con imágenes para vender en Etsy y KDP. 104 temas visuales, solucionario. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Cree fichas de conteo y gráficos para vender en Etsy y KDP',
      tagline: 'Genere fichas donde los niños cuentan imágenes y crean gráficos de barras.',
      description: 'Cree fichas de conteo y gráficos para vender en Etsy, Amazon KDP o Hotmart. Los niños cuentan imágenes temáticas y registran los resultados en gráficos de barras — una habilidad matemática esencial para preescolar y primaria. Seleccione entre más de 3.000 ilustraciones en 104 temas para crear fichas visualmente atractivas. Este formato combina conteo, comparación y visualización de datos en una sola ficha, ofreciendo más valor que las fichas de conteo simples. Exporte PDFs a 300 DPI con solucionario y véndalos con la licencia comercial incluida. Las fichas de conteo son un producto perenne — los padres y vendedores las buscan todo el año para preescolar e infantil. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de conteo y gráficos en minutos',
      keyFeatures: 'Por qué las fichas de conteo se venden todo el año',
      businessUseCases: 'Vender fichas de conteo en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'wordsearch.ts',
    seo: {
      primaryKeyword: 'generador de sopas de letras para vender en Etsy y KDP',
      secondaryKeywords: [
        'crear sopas de letras con imágenes para Etsy',
        'generador de busca palabras para Amazon KDP',
        'sopas de letras imprimibles licencia comercial',
        'crear libros de sopas de letras para vender',
      ],
      lsiKeywords: [
        'sopas de letras temáticas vendedores Etsy KDP',
        'libros pasatiempos búsqueda de palabras Amazon',
        'negocio imprimibles sopas letras mercado hispano',
      ],
      titleTag: 'Sopas de letras para vender en Etsy y KDP | LCS',
      metaDescription: 'Cree sopas de letras con imágenes para vender en Etsy y KDP. 104 temas, 11 idiomas, solucionario. Licencia comercial. Pruebe gratis con marca de agua.',
    },
    hero: {
      title: 'Genere sopas de letras para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree sopas de letras con imágenes temáticas en 11 idiomas — listas para vender.',
      description: 'Genere sopas de letras para vender en Etsy, Amazon KDP o Hotmart — el pasatiempo más popular del mundo, ahora con imágenes temáticas que las hacen únicas. Las pistas son imágenes, no texto: los usuarios identifican la imagen, deducen la palabra y la buscan en la cuadrícula. Este formato visual funciona en 11 idiomas, multiplicando su mercado potencial. Seleccione entre más de 3.000 ilustraciones en 104 temas para crear sopas de letras irresistibles. Las sopas de letras son el producto estrella en Amazon KDP — los libros de búsqueda de palabras se venden consistentemente todo el año. Exporte PDFs a 300 DPI con solucionario automático. Licencia comercial incluida. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear sopas de letras profesionales paso a paso',
      keyFeatures: 'Por qué las sopas de letras dominan Amazon KDP',
      businessUseCases: 'Vender sopas de letras en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'crossword.ts',
    seo: {
      primaryKeyword: 'creador de crucigramas para vender en Etsy y KDP',
      secondaryKeywords: [
        'generador de crucigramas con imágenes para Etsy',
        'crear crucigramas imprimibles para Amazon KDP',
        'crucigramas visuales licencia comercial',
        'fichas de palabras cruzadas para vender online',
      ],
      lsiKeywords: [
        'crucigramas temáticos vendedores Etsy Amazon',
        'libros de crucigramas imprimibles KDP',
        'negocio pasatiempos imprimibles mercado hispano',
      ],
      titleTag: 'Crucigramas para vender en Etsy y KDP | LCS',
      metaDescription: 'Cree crucigramas con imágenes para vender en Etsy y KDP. 104 temas, 11 idiomas, solucionario automático. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere crucigramas para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree crucigramas con pistas visuales en 11 idiomas — formato único que se vende.',
      description: 'Genere crucigramas con imágenes como pistas para vender en Etsy, Amazon KDP o Hotmart. En lugar de definiciones escritas, los usuarios ven imágenes temáticas y escriben las palabras correspondientes — un formato innovador que funciona para todas las edades y se vende mejor que los crucigramas tradicionales. Soporte para 11 idiomas permite crear productos para el mercado hispano, europeo y global simultáneamente. Seleccione entre más de 3.000 ilustraciones en 104 temas. Los crucigramas son un clásico perenne con demanda constante en Amazon KDP y Etsy. Exporte PDFs a 300 DPI con solucionario automático y véndalos con licencia comercial. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear crucigramas profesionales paso a paso',
      keyFeatures: 'Por qué los crucigramas con imágenes se venden mejor',
      businessUseCases: 'Vender crucigramas en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'cryptogram.ts',
    seo: {
      primaryKeyword: 'generador de criptogramas para vender en Etsy',
      secondaryKeywords: [
        'crear criptogramas imprimibles para tienda Etsy',
        'fichas de criptogramas para Amazon KDP',
        'generador de mensajes cifrados licencia comercial',
        'criptogramas educativos para vender online',
      ],
      lsiKeywords: [
        'criptogramas descifrar código vendedores Etsy',
        'libros de pasatiempos criptogramas KDP',
        'fichas cifrados educativos negocio imprimibles',
      ],
      titleTag: 'Criptogramas para vender en Etsy y KDP | LCS',
      metaDescription: 'Cree criptogramas imprimibles para vender en Etsy y KDP. Mensajes cifrados educativos con imágenes. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere criptogramas para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de mensajes cifrados con imágenes — un pasatiempo adictivo que se vende.',
      description: 'Genere criptogramas para vender en Etsy, Amazon KDP o Hotmart. Los criptogramas son pasatiempos donde los usuarios descifran mensajes sustituyendo símbolos por letras — un formato adictivo que engancha tanto a niños como a adultos. Este generador crea criptogramas con imágenes temáticas de más de 104 categorías, añadiendo atractivo visual a cada ficha. Los criptogramas son un nicho de baja competencia en Etsy y KDP con compradores leales que buscan variedad constantemente. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El mercado hispano de pasatiempos imprimibles está prácticamente vacío — esta es su oportunidad. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear criptogramas paso a paso',
      keyFeatures: 'Por qué los criptogramas son un nicho rentable',
      businessUseCases: 'Vender criptogramas en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'word-scramble.ts',
    seo: {
      primaryKeyword: 'crear anagramas imprimibles para negocio en Etsy',
      secondaryKeywords: [
        'generador de letras revueltas para vender en Etsy',
        'fichas de anagramas para Amazon KDP',
        'juegos de letras desordenadas licencia comercial',
        'crear fichas de palabras revueltas para vender',
      ],
      lsiKeywords: [
        'anagramas temáticos vendedores Etsy KDP',
        'fichas letras desordenadas imprimibles',
        'negocio pasatiempos palabras mercado hispano',
      ],
      titleTag: 'Anagramas imprimibles para Etsy y KDP | LCS',
      metaDescription: 'Cree fichas de letras revueltas para vender en Etsy y KDP. Los niños reordenan letras con pistas de imágenes. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de anagramas para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de letras revueltas con pistas de imágenes — un formato que se vende solo.',
      description: 'Genere fichas de anagramas para vender en Etsy, Amazon KDP o Hotmart. Los usuarios ven una imagen temática y reordenan las letras desordenadas para formar la palabra correcta — un formato que combina vocabulario con resolución de problemas. Con más de 3.000 imágenes en 104 temas y soporte para 11 idiomas, puede crear productos para múltiples mercados simultáneamente. Las fichas de letras revueltas son ideales para cuadernillos de actividades en KDP y paquetes temáticos en Etsy. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El mercado hispano ofrece competencia mínima para este tipo de pasatiempo. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de anagramas paso a paso',
      keyFeatures: 'Por qué las fichas de letras revueltas se venden bien',
      businessUseCases: 'Vender fichas de anagramas en múltiples plataformas',
    },
  },
  {
    file: 'word-guess.ts',
    seo: {
      primaryKeyword: 'juego de adivinar palabras para vender en Etsy',
      secondaryKeywords: [
        'generador de fichas de adivinar palabras para Etsy',
        'fichas de adivinanzas de vocabulario para KDP',
        'juegos de palabras imprimibles licencia comercial',
        'crear fichas de vocabulario visual para vender',
      ],
      lsiKeywords: [
        'fichas adivinar palabras vendedores Etsy',
        'juegos vocabulario imprimibles KDP Hotmart',
        'negocio fichas lenguaje mercado hispano',
      ],
      titleTag: 'Adivinar palabras para vender en Etsy | LCS',
      metaDescription: 'Cree fichas de adivinar palabras para vender en Etsy y KDP. Pistas de imágenes, 11 idiomas, solucionario. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de adivinar palabras para vender en Etsy y KDP',
      tagline: 'Cree juegos de vocabulario visual donde los niños adivinan palabras letra por letra.',
      description: 'Genere fichas de adivinar palabras para vender en Etsy, Amazon KDP o Hotmart. Los usuarios ven una imagen temática y adivinan la palabra correspondiente completando las letras — un formato interactivo que combina vocabulario con ortografía. Con soporte para 11 idiomas y más de 3.000 imágenes en 104 temas, puede crear fichas de adivinar palabras para el mercado hispano y otros mercados globales. Ideal para cuadernillos de vocabulario en KDP y paquetes educativos en Etsy. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Los juegos de vocabulario visual son especialmente populares para ELE — un mega-nicho con compradores de alto poder adquisitivo. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de adivinar palabras paso a paso',
      keyFeatures: 'Por qué las fichas de vocabulario se venden bien',
      businessUseCases: 'Vender fichas de adivinar palabras en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'writing.ts',
    seo: {
      primaryKeyword: 'generador de fichas de escritura para vender en Etsy y KDP',
      secondaryKeywords: [
        'crear fichas de caligrafía para tienda Etsy',
        'fichas de escritura imprimibles para Amazon KDP',
        'generador de fichas de grafomotricidad licencia comercial',
        'fichas de preescritura para vender online',
      ],
      lsiKeywords: [
        'fichas caligrafía grafomotricidad vendedores',
        'cuadernillos escritura imprimibles KDP Etsy',
        'negocio fichas preescritura mercado hispano',
      ],
      titleTag: 'Fichas de escritura para vender en Etsy | LCS',
      metaDescription: 'Cree fichas de escritura y caligrafía para vender en Etsy y KDP. Letras, palabras, oraciones personalizables. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de escritura para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de caligrafía y grafomotricidad personalizables — un producto perenne.',
      description: 'Genere fichas de escritura para vender en Etsy, Amazon KDP o Hotmart. Este generador crea fichas de caligrafía y grafomotricidad donde los niños practican letras, palabras y oraciones con líneas guía. Personalice el contenido, la fuente, el tamaño de las líneas y la dificultad para crear fichas adaptadas a preescolar, infantil y primaria. Las fichas de escritura son un producto perenne con demanda constante — los padres las buscan todo el año para la práctica en casa. Exporte PDFs a 300 DPI con ejemplos de trazado y véndalos con la licencia comercial incluida. Los cuadernillos de caligrafía son un nicho probado en Amazon KDP con ventas consistentes. El mercado hispano ofrece una oportunidad masiva. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de escritura en minutos',
      keyFeatures: 'Por qué las fichas de escritura son un perenne en Etsy',
      businessUseCases: 'Vender fichas de escritura en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'matching.ts',
    seo: {
      primaryKeyword: 'fichas de asociación para crear y vender en Etsy',
      secondaryKeywords: [
        'generador de fichas de emparejar para Etsy',
        'fichas de asociación con imágenes para Amazon KDP',
        'crear fichas de match para vender online',
        'fichas de emparejamiento licencia comercial',
      ],
      lsiKeywords: [
        'fichas asociación visual vendedores Etsy KDP',
        'ejercicios emparejar imprimibles preescolar',
        'negocio fichas emparejamiento mercado hispano',
      ],
      titleTag: 'Fichas de asociación para vender en Etsy | LCS',
      metaDescription: 'Cree fichas de asociación con imágenes para vender en Etsy y KDP. 104 temas, varios formatos, solucionario. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de asociación para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de emparejar con imágenes temáticas — perfectas para preescolar e infantil.',
      description: 'Genere fichas de asociación para vender en Etsy, Amazon KDP o Hotmart. Las fichas de emparejar son un básico absoluto para preescolar e infantil — los padres y vendedores las buscan constantemente. Este generador crea fichas donde los niños conectan imágenes relacionadas, con más de 3.000 ilustraciones en 104 temas. Ofrezca fichas de asociación por tema (animales, alimentos, vehículos), por estación o por nivel de dificultad. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Las fichas de asociación funcionan en cualquier idioma porque son puramente visuales, multiplicando su mercado potencial. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de asociación en minutos',
      keyFeatures: 'Por qué las fichas de emparejar son un básico para vendedores',
      businessUseCases: 'Vender fichas de asociación en múltiples plataformas',
    },
  },
  {
    file: 'drawing-lines.ts',
    seo: {
      primaryKeyword: 'fichas de trazo y grafomotricidad para vender en Etsy',
      secondaryKeywords: [
        'generador de fichas de trazo para vendedores Etsy',
        'fichas de grafomotricidad para Amazon KDP',
        'ejercicios de motricidad fina imprimibles licencia comercial',
        'crear fichas de preescritura para vender',
      ],
      lsiKeywords: [
        'fichas trazo grafomotricidad vendedores preescolar',
        'ejercicios motricidad fina imprimibles KDP',
        'negocio fichas preescritura mercado hispano',
      ],
      titleTag: 'Fichas de trazo para vender en Etsy y KDP | LCS',
      metaDescription: 'Cree fichas de trazo y grafomotricidad para vender en Etsy y KDP. Imágenes temáticas, dificultad ajustable. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de trazo y grafomotricidad para vender en Etsy y KDP',
      tagline: 'Cree fichas de motricidad fina con imágenes temáticas — el producto preescolar más buscado.',
      description: 'Genere fichas de trazo y grafomotricidad para vender en Etsy, Amazon KDP o Hotmart. Las fichas de trazo son el producto preescolar más buscado — los padres y centros educativos las necesitan constantemente para desarrollar la motricidad fina. Este generador crea fichas donde los niños trazan líneas entre imágenes temáticas, con dificultad ajustable desde trazos rectos hasta curvas y zigzags. Seleccione entre más de 3.000 ilustraciones en 104 temas. Exporte PDFs a 300 DPI con solucionario y véndalos con la licencia comercial incluida. Las fichas de grafomotricidad son puramente visuales y funcionan en cualquier idioma. El mercado hispano de material preescolar en Etsy está masivamente desatendido. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de trazo paso a paso',
      keyFeatures: 'Por qué las fichas de grafomotricidad dominan el preescolar',
      businessUseCases: 'Vender fichas de trazo en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'find-objects.ts',
    seo: {
      primaryKeyword: 'crear busca y encuentra para vender en Etsy y KDP',
      secondaryKeywords: [
        'generador de fichas busca y encuentra para Etsy',
        'fichas de objetos escondidos para Amazon KDP',
        'crear busca y encuentra imprimibles licencia comercial',
        'fichas hidden object para vender online',
      ],
      lsiKeywords: [
        'fichas busca encuentra vendedores Etsy KDP',
        'libros objetos escondidos imprimibles Amazon',
        'negocio fichas búsqueda visual mercado hispano',
      ],
      titleTag: 'Busca y encuentra para vender en Etsy | LCS',
      metaDescription: 'Cree fichas de busca y encuentra para vender en Etsy y KDP. Imágenes temáticas, dificultad ajustable. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de busca y encuentra para vender en Etsy y KDP',
      tagline: 'Cree fichas de objetos escondidos con imágenes temáticas — un formato que engancha.',
      description: 'Genere fichas de busca y encuentra para vender en Etsy, Amazon KDP o Hotmart. Las fichas de objetos escondidos son un formato favorito de niños y adultos — los usuarios buscan imágenes específicas dentro de una escena temática compleja. Este generador crea fichas con imágenes de más de 104 categorías, con dificultad ajustable según la cantidad de objetos y la complejidad visual. Los libros de busca y encuentra son un género probado en Amazon KDP con ventas consistentes. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. El formato es puramente visual y funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de busca y encuentra paso a paso',
      keyFeatures: 'Por qué las fichas de busca y encuentra se venden bien',
      businessUseCases: 'Vender fichas de busca y encuentra en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'grid-match.ts',
    seo: {
      primaryKeyword: 'rompecabezas de cuadrícula para negocio de imprimibles',
      secondaryKeywords: [
        'generador de fichas de cuadrícula para Etsy',
        'rompecabezas de asociación en cuadrícula para KDP',
        'fichas de grid match licencia comercial',
        'crear fichas de cuadrícula visual para vender',
      ],
      lsiKeywords: [
        'fichas cuadrícula asociación vendedores Etsy',
        'rompecabezas cuadrícula imprimibles KDP',
        'negocio fichas lógica visual mercado hispano',
      ],
      titleTag: 'Rompecabezas de cuadrícula para Etsy y KDP | LCS',
      metaDescription: 'Cree rompecabezas de cuadrícula con imágenes para vender en Etsy y KDP. Formato único de lógica visual. Licencia comercial incluida. Pruebe gratis.',
    },
    hero: {
      title: 'Genere rompecabezas de cuadrícula para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas de lógica visual en cuadrícula — un formato innovador que se destaca.',
      description: 'Genere rompecabezas de cuadrícula para vender en Etsy, Amazon KDP o Hotmart. Este formato presenta una cuadrícula con imágenes temáticas donde los niños deben completar patrones, encontrar asociaciones o resolver desafíos de lógica visual. Es un formato diferenciador que se destaca en los listados de Etsy frente a las fichas estándar. Seleccione entre más de 3.000 ilustraciones en 104 temas y configure la dificultad. Exporte PDFs a 300 DPI con solucionario automático y véndalos con la licencia comercial incluida. Los rompecabezas de cuadrícula son ideales para cuadernillos de lógica en Amazon KDP — un nicho en crecimiento con poca competencia en español. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear rompecabezas de cuadrícula paso a paso',
      keyFeatures: 'Por qué los rompecabezas de cuadrícula se destacan en los listados',
      businessUseCases: 'Vender rompecabezas de cuadrícula en Etsy, KDP y Hotmart',
    },
  },
  {
    file: 'find-and-count.ts',
    seo: {
      primaryKeyword: 'fichas de busca y cuenta para vender en Etsy',
      secondaryKeywords: [
        'generador de fichas de busca y cuenta para Etsy',
        'fichas de contar objetos para Amazon KDP',
        'ejercicios de búsqueda y conteo licencia comercial',
        'crear fichas de I Spy para vender online',
      ],
      lsiKeywords: [
        'fichas busca cuenta vendedores Etsy preescolar',
        'ejercicios búsqueda conteo imprimibles KDP',
        'negocio fichas conteo visual mercado hispano',
      ],
      titleTag: 'Fichas busca y cuenta para vender en Etsy | LCS',
      metaDescription: 'Cree fichas de busca y cuenta para vender en Etsy y KDP. Los niños buscan y cuentan imágenes temáticas. Licencia comercial. Pruebe gratis.',
    },
    hero: {
      title: 'Genere fichas de busca y cuenta para vender en Etsy, KDP y Hotmart',
      tagline: 'Cree fichas donde los niños buscan y cuentan imágenes — un formato irresistible.',
      description: 'Genere fichas de busca y cuenta para vender en Etsy, Amazon KDP o Hotmart. Los niños buscan imágenes específicas dentro de una colección temática y cuentan cuántas encuentran — un formato que combina atención visual con conteo y es irresistible para preescolares. Seleccione entre más de 3.000 ilustraciones en 104 temas para crear fichas visualmente ricas. Las fichas de busca y cuenta (I Spy) son uno de los formatos más populares en Etsy para preescolar e infantil, con búsquedas constantes todo el año. Exporte PDFs a 300 DPI con solucionario y véndalos con la licencia comercial incluida. Formato puramente visual — funciona en cualquier idioma. Pruebe gratis con marca de agua — sin registro.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de busca y cuenta en minutos',
      keyFeatures: 'Por qué las fichas de busca y cuenta son populares en Etsy',
      businessUseCases: 'Vender fichas de busca y cuenta en Etsy, KDP y Hotmart',
    },
  },
];

// ============================================================
// APPLY CHANGES
// ============================================================
let totalUpdated = 0;
let errors = [];

for (const app of apps) {
  const filePath = path.join(BASE, app.file);
  console.log(`\nProcessing: ${app.file}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ERROR: File not found: ${filePath}`);
    errors.push(app.file);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update SEO fields
  content = replaceField(content, 'primaryKeyword', app.seo.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', app.seo.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', app.seo.lsiKeywords);
  content = replaceField(content, 'titleTag', app.seo.titleTag);

  // metaDescription
  const mdRe = /(metaDescription:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (mdRe.test(content)) {
    content = content.replace(mdRe, `$1'${esc(app.seo.metaDescription)}'`);
  }

  // Hero title
  content = replaceHeroTitle(content, app.hero.title);

  // Tagline
  content = replaceField(content, 'tagline', app.hero.tagline);

  // Hero description
  content = replaceHeroDescription(content, app.hero.description);

  // Section headings
  if (app.sectionHeadings.howItWorks) {
    content = replaceSectionTitle(content, 'howItWorks', app.sectionHeadings.howItWorks);
  }
  if (app.sectionHeadings.keyFeatures) {
    content = replaceSectionTitle(content, 'keyFeatures', app.sectionHeadings.keyFeatures);
  }
  if (app.sectionHeadings.businessUseCases) {
    content = replaceSectionTitle(content, 'businessUseCases', app.sectionHeadings.businessUseCases);
  }

  // Replace Gumroad with Hotmart
  content = content.replace(/Gumroad/g, 'Hotmart');
  content = content.replace(/gumroad\.com/g, 'hotmart.com');
  content = content.replace(/teacherspayteachers\.com/g, 'hotmart.com');

  // Validate lengths
  const titleMatch = content.match(/titleTag:\s*'([^']*)'/);
  if (titleMatch) {
    const len = titleMatch[1].length;
    if (len > 60) {
      console.warn(`  WARNING: titleTag is ${len} chars (max 60)`);
    } else {
      console.log(`  titleTag: ${len} chars ✓`);
    }
  }

  const metaMatch = content.match(/metaDescription:\s*\n?\s*'([^']*)'/);
  if (metaMatch) {
    const len = metaMatch[1].length;
    if (len > 155) {
      console.warn(`  WARNING: metaDescription is ${len} chars (max 155)`);
    } else {
      console.log(`  metaDescription: ${len} chars ✓`);
    }
  }

  // Check for unicode escapes
  if (/\\u[0-9a-fA-F]{4}/.test(content)) {
    console.warn('  WARNING: Found \\uXXXX unicode escapes!');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ Updated ${app.file}`);
  totalUpdated++;
}

console.log(`\n=== Done: ${totalUpdated}/15 files updated ===`);
if (errors.length) {
  console.error(`Errors: ${errors.join(', ')}`);
}
