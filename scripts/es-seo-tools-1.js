/**
 * ES SEO Tools Part 1: Tools 1-17
 * Applies the full SEO strategy from spanish-complete-seo-prompt.md
 * Tool pages target "gratis" / free keywords (top of funnel)
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'es');

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function replaceField(content, fieldName, newValue) {
  const re = new RegExp(`(${fieldName}:\\s*)(['"])(?:[^'\"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newValue)}'`);
  }
  const re2 = new RegExp(`(${fieldName}:\\s*\\n\\s*)(['"])(?:[^'\"\\\\]|\\\\.)*\\2`);
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

function replaceHeroDescription(content, newDesc) {
  const re = /(hero:\s*\{[\s\S]*?description:\s*\n?\s*)(['"])([\s\S]*?)\2(,?\s*\n\s*\})/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newDesc)}'$4`);
  }
  const re2 = /(tagline:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re2.test(content)) {
    return content.replace(re2, `$1'${esc(newDesc)}'`);
  }
  console.warn('  WARNING: Could not replace hero description');
  return content;
}

// ============================================================
// 17 TOOL FILES — SEO DATA
// ============================================================
const tools = [
  // ============================================================
  // TOOL 1: IMAGE-ADDITION
  // ============================================================
  {
    file: 'image-addition.ts',
    seo: {
      primaryKeyword: 'generador de fichas de sumas gratis en linea',
      secondaryKeywords: [
        'fichas de sumas gratis sin registro',
        'generador de sumas con imagenes gratis en linea',
        'ejercicios de suma gratis para imprimir',
        'fichas de sumas gratis sin tarjeta de credito',
      ],
      lsiKeywords: [
        'fichas de matematicas para primaria imprimibles',
        'ejercicios de calculo con imagenes tematicas',
        'hojas de sumas con solucionario automatico',
      ],
      titleTag: 'Generador de fichas de sumas gratis | LCS',
      metaDescription: 'Cree fichas de sumas gratis con imagenes tematicas. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Pase a licencia comercial para vender.',
    },
    hero: {
      title: 'Cree fichas de sumas gratis con imagenes tematicas',
      tagline: 'Genere fichas de sumas ilustradas en segundos — sin registro, sin tarjeta de credito.',
      description: 'Cree fichas de sumas gratis con imagenes tematicas de mas de 3.000 ilustraciones — animales, vehiculos, alimentos y mas. Este generador en linea le permite elegir el rango de numeros, la cantidad de ejercicios y el tema visual. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito: todas las funciones estan disponibles desde el primer momento. Las descargas incluyen una marca de agua transparente. Ideal para padres, educadores y creadores de contenido que quieren probar antes de comprar. ¿Quiere vender fichas de sumas? Pase a la licencia comercial para eliminar la marca de agua y obtener archivos a 300 DPI listos para Etsy, KDP y Hotmart.',
    },
    tutorial: {
      title: 'Como crear fichas de sumas gratis paso a paso',
    },
  },
  // ============================================================
  // TOOL 2: IMAGE-SUBTRACTION
  // ============================================================
  {
    file: 'image-subtraction.ts',
    seo: {
      primaryKeyword: 'generador de fichas de restas gratis',
      secondaryKeywords: [
        'fichas de restas gratis sin registro',
        'generador de restas con imagenes gratis',
        'ejercicios de resta gratis para imprimir',
        'fichas de sustraccion gratis en linea',
      ],
      lsiKeywords: [
        'fichas de matematicas de resta para primaria',
        'ejercicios de sustraccion con ilustraciones',
        'hojas de resta con respuestas automaticas',
      ],
      titleTag: 'Fichas de restas gratis en linea | LCS',
      metaDescription: 'Genere fichas de restas gratis con imagenes tematicas. Sin registro, sin tarjeta. Descarga con marca de agua. Licencia comercial disponible para vender.',
    },
    hero: {
      title: 'Genere fichas de restas gratis con ilustraciones tematicas',
      tagline: 'Fichas de resta ilustradas listas en segundos — sin registro ni costes.',
      description: 'Cree fichas de restas gratis con imagenes tematicas que hacen las matematicas atractivas para los ninos. Seleccione el rango de numeros, la cantidad de problemas y elija entre mas de 100 categorias de imagenes. Cada ficha genera un solucionario automatico y se exporta en PDF de alta calidad. No necesita cuenta ni tarjeta de credito — empiece a crear de inmediato. Las descargas incluyen marca de agua transparente para uso de prueba. Perfecto para padres que buscan material de practica y educadores que necesitan recursos rapidos. ¿Quiere vender fichas de restas en su tienda? Pase a la licencia comercial para obtener PDFs sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como generar fichas de restas gratis en 3 pasos',
    },
  },
  // ============================================================
  // TOOL 3: CODE-ADDITION
  // ============================================================
  {
    file: 'code-addition.ts',
    seo: {
      primaryKeyword: 'crear rompecabezas matematicos codificados gratis',
      secondaryKeywords: [
        'rompecabezas de codigo matematico gratis sin registro',
        'generador de sumas codificadas gratis en linea',
        'fichas de codigo de sumas gratis para imprimir',
        'puzzles matematicos con codigo gratis',
      ],
      lsiKeywords: [
        'actividades de logica matematica para ninos',
        'ejercicios de decodificacion con sumas',
        'fichas de matematicas divertidas imprimibles',
      ],
      titleTag: 'Rompecabezas de codigo gratis | LCS',
      metaDescription: 'Cree rompecabezas matematicos codificados gratis. Los ninos resuelven sumas para descifrar mensajes. Sin registro, sin tarjeta. Licencia comercial disponible.',
    },
    hero: {
      title: 'Cree rompecabezas matematicos codificados gratis en linea',
      tagline: 'Combine sumas con decodificacion — fichas divertidas listas en segundos.',
      description: 'Cree rompecabezas matematicos codificados gratis donde los ninos resuelven sumas para descifrar palabras y mensajes ocultos. Este generador combina calculo con logica de decodificacion, haciendo las matematicas mucho mas atractivas. Seleccione el nivel de dificultad, el tema visual y el tipo de mensaje. Cada ficha incluye solucionario y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones disponibles al instante. Las descargas incluyen marca de agua. Ideal para padres y educadores que buscan actividades diferentes. ¿Quiere vender estas fichas? Pase a la licencia comercial para eliminar la marca de agua y vender en Etsy, KDP o Hotmart.',
    },
    tutorial: {
      title: 'Como crear rompecabezas codificados gratis paso a paso',
    },
  },
  // ============================================================
  // TOOL 4: MATH-WORKSHEET
  // ============================================================
  {
    file: 'math-worksheet.ts',
    seo: {
      primaryKeyword: 'generador de fichas de matematicas gratis',
      secondaryKeywords: [
        'fichas de matematicas gratis sin registro',
        'generador de ejercicios de mates gratis en linea',
        'fichas de calculo gratis para imprimir',
        'hojas de matematicas gratis sin tarjeta de credito',
      ],
      lsiKeywords: [
        'ejercicios de suma resta multiplicacion division',
        'fichas de matematicas para primaria imprimibles',
        'generador de operaciones matematicas con respuestas',
      ],
      titleTag: 'Generador de fichas de mates gratis | LCS',
      metaDescription: 'Genere fichas de matematicas gratis: sumas, restas, multiplicaciones y divisiones. Sin registro, sin tarjeta. Pase a licencia comercial para vender.',
    },
    hero: {
      title: 'Genere fichas de matematicas gratis en segundos',
      tagline: 'Todas las operaciones basicas en un solo generador — gratis y sin registro.',
      description: 'Cree fichas de matematicas gratis que cubren sumas, restas, multiplicaciones y divisiones. Este generador le permite configurar el rango de numeros, la cantidad de problemas por pagina y el tipo de operacion. Cada ficha incluye solucionario automatico y se exporta en PDF de alta calidad. No necesita crear una cuenta ni introducir tarjeta de credito — empiece a generar fichas de inmediato. Las descargas incluyen marca de agua para uso de prueba. Perfecto para padres que quieren material de practica y educadores que necesitan fichas rapidas. ¿Quiere vender fichas de matematicas? Pase a la licencia comercial para archivos sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear fichas de matematicas gratis en 3 minutos',
    },
  },
  // ============================================================
  // TOOL 5: MATH-PUZZLE
  // ============================================================
  {
    file: 'math-puzzle.ts',
    seo: {
      primaryKeyword: 'crear rompecabezas de matematicas gratis',
      secondaryKeywords: [
        'rompecabezas de mates gratis sin registro',
        'puzzles matematicos gratis en linea',
        'generador de rompecabezas de matematicas gratis',
        'fichas de puzzles matematicos gratis para imprimir',
      ],
      lsiKeywords: [
        'actividades de logica y calculo para ninos',
        'fichas de matematicas divertidas imprimibles',
        'rompecabezas de numeros con solucionario',
      ],
      titleTag: 'Rompecabezas de mates gratis | LCS',
      metaDescription: 'Cree rompecabezas de matematicas gratis con imagenes tematicas. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Licencia comercial disponible.',
    },
    hero: {
      title: 'Cree rompecabezas de matematicas gratis con imagenes',
      tagline: 'Puzzles matematicos ilustrados listos en segundos — sin registro ni costes.',
      description: 'Cree rompecabezas de matematicas gratis que combinan calculo con resolucion de puzzles visuales. Este generador produce fichas donde los ninos resuelven operaciones para completar imagenes tematicas de mas de 100 categorias. Seleccione el nivel de dificultad, el tipo de operacion y el tema visual. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones disponibles desde el inicio. Las descargas incluyen marca de agua transparente. Ideal para padres y creadores de contenido educativo. ¿Quiere vender rompecabezas? Pase a la licencia comercial para PDFs sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear rompecabezas matematicos gratis paso a paso',
    },
  },
  // ============================================================
  // TOOL 6: CHART-COUNT
  // ============================================================
  {
    file: 'chart-count.ts',
    seo: {
      primaryKeyword: 'fichas de conteo y graficos gratis',
      secondaryKeywords: [
        'generador de fichas de conteo gratis sin registro',
        'fichas de graficos y conteo gratis en linea',
        'hojas de conteo gratis para imprimir',
        'fichas de graficos de barras gratis para ninos',
      ],
      lsiKeywords: [
        'actividades de conteo para preescolar imprimibles',
        'fichas de graficos para primaria',
        'hojas de trabajo de datos y conteo',
      ],
      titleTag: 'Fichas de conteo gratis en linea | LCS',
      metaDescription: 'Cree fichas de conteo y graficos gratis con imagenes tematicas. Sin registro, sin tarjeta. Descarga con marca de agua. Licencia comercial para vender.',
    },
    hero: {
      title: 'Cree fichas de conteo y graficos gratis en linea',
      tagline: 'Fichas de conteo con graficos visuales — gratis y sin registro.',
      description: 'Cree fichas de conteo y graficos gratis con imagenes tematicas que ensenan a los ninos a contar, clasificar y representar datos visualmente. Este generador produce hojas de trabajo con graficos de barras, pictogramas y tablas de conteo. Seleccione el tema visual de mas de 100 categorias de imagenes y configure el nivel de dificultad. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — acceda a todas las funciones al instante. Las descargas incluyen marca de agua. Ideal para padres y educadores de preescolar y primaria. ¿Quiere vender fichas de conteo? Pase a la licencia comercial para archivos sin marca de agua.',
    },
    tutorial: {
      title: 'Como crear fichas de conteo y graficos gratis',
    },
  },
  // ============================================================
  // TOOL 7: WORD-SEARCH
  // ============================================================
  {
    file: 'word-search.ts',
    seo: {
      primaryKeyword: 'generador de sopas de letras gratis con imagenes',
      secondaryKeywords: [
        'sopas de letras gratis sin registro',
        'generador de sopas de letras gratis en linea',
        'crear sopas de letras gratis para imprimir',
        'sopas de letras con imagenes gratis sin tarjeta',
      ],
      lsiKeywords: [
        'juegos de palabras imprimibles para ninos',
        'sopas de letras tematicas en espanol',
        'actividades de vocabulario con busqueda de palabras',
      ],
      titleTag: 'Generador de sopas de letras gratis | LCS',
      metaDescription: 'Genere sopas de letras gratis con imagenes tematicas. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Licencia comercial disponible.',
    },
    hero: {
      title: 'Genere sopas de letras gratis con imagenes tematicas',
      tagline: 'Sopas de letras ilustradas listas en segundos — gratis y sin registro.',
      description: 'Cree sopas de letras gratis con imagenes tematicas de mas de 3.000 ilustraciones. Este generador produce sopas de letras donde los ninos buscan palabras asociadas a imagenes — animales, alimentos, vehiculos y mucho mas. Seleccione el tamano de la cuadricula, el nivel de dificultad y el idioma. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones disponibles al instante. Las descargas incluyen marca de agua transparente. Perfecto para padres, educadores y creadores de contenido. ¿Quiere vender sopas de letras? Pase a la licencia comercial para PDFs sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear sopas de letras gratis paso a paso',
    },
  },
  // ============================================================
  // TOOL 8: CROSSWORD
  // ============================================================
  {
    file: 'crossword.ts',
    seo: {
      primaryKeyword: 'generador de crucigramas gratis con imagenes',
      secondaryKeywords: [
        'crucigramas gratis sin registro',
        'generador de crucigramas gratis en linea',
        'crear crucigramas gratis para imprimir',
        'crucigramas con imagenes gratis sin tarjeta',
      ],
      lsiKeywords: [
        'juegos de palabras cruzadas imprimibles',
        'crucigramas tematicos en espanol para ninos',
        'actividades de vocabulario con crucigramas',
      ],
      titleTag: 'Generador de crucigramas gratis | LCS',
      metaDescription: 'Cree crucigramas gratis con imagenes tematicas como pistas visuales. Sin registro, sin tarjeta. Descarga con marca de agua. Licencia comercial disponible.',
    },
    hero: {
      title: 'Cree crucigramas gratis con imagenes como pistas',
      tagline: 'Crucigramas ilustrados listos en segundos — gratis y sin registro.',
      description: 'Cree crucigramas gratis con imagenes tematicas que sirven como pistas visuales. Este generador produce crucigramas donde los ninos identifican la imagen y escriben la palabra correspondiente. Seleccione el tema visual de mas de 100 categorias, el nivel de dificultad y el idioma. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — empiece a crear de inmediato. Las descargas incluyen marca de agua transparente. Ideal para padres, educadores y creadores de material didactico. ¿Quiere vender crucigramas? Pase a la licencia comercial para eliminar la marca de agua y obtener archivos a 300 DPI.',
    },
    tutorial: {
      title: 'Como generar crucigramas gratis en 3 pasos',
    },
  },
  // ============================================================
  // TOOL 9: CRYPTOGRAM
  // ============================================================
  {
    file: 'cryptogram.ts',
    seo: {
      primaryKeyword: 'generador de criptogramas gratis',
      secondaryKeywords: [
        'criptogramas gratis sin registro',
        'generador de criptogramas gratis en linea',
        'crear criptogramas gratis para imprimir',
        'fichas de criptogramas gratis sin tarjeta',
      ],
      lsiKeywords: [
        'juegos de decodificacion de letras imprimibles',
        'actividades de criptografia para ninos',
        'fichas de descifrar mensajes secretos',
      ],
      titleTag: 'Generador de criptogramas gratis | LCS',
      metaDescription: 'Cree criptogramas gratis donde los ninos descifran mensajes secretos. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Licencia comercial.',
    },
    hero: {
      title: 'Cree criptogramas gratis para descifrar mensajes',
      tagline: 'Fichas de decodificacion listas en segundos — gratis y sin registro.',
      description: 'Cree criptogramas gratis donde los ninos descifran mensajes secretos sustituyendo simbolos por letras. Este generador produce fichas de criptografia educativa con diferentes niveles de dificultad y temas. Cada ficha incluye la clave de decodificacion y el solucionario automatico, y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones estan disponibles desde el primer momento. Las descargas incluyen marca de agua transparente. Perfecto para padres que buscan actividades de logica y educadores que quieren material diferente. ¿Quiere vender criptogramas? Pase a la licencia comercial para PDFs sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear criptogramas gratis paso a paso',
    },
  },
  // ============================================================
  // TOOL 10: WORD-SCRAMBLE
  // ============================================================
  {
    file: 'word-scramble.ts',
    seo: {
      primaryKeyword: 'generador de anagramas gratis en linea',
      secondaryKeywords: [
        'anagramas gratis sin registro',
        'generador de palabras desordenadas gratis',
        'crear anagramas gratis para imprimir',
        'fichas de anagramas gratis sin tarjeta de credito',
      ],
      lsiKeywords: [
        'juegos de ordenar letras imprimibles',
        'actividades de vocabulario con anagramas',
        'fichas de palabras mezcladas para ninos',
      ],
      titleTag: 'Generador de anagramas gratis | LCS',
      metaDescription: 'Genere anagramas gratis con imagenes tematicas como pistas. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Licencia comercial disponible.',
    },
    hero: {
      title: 'Genere anagramas gratis con imagenes como pistas',
      tagline: 'Fichas de palabras desordenadas listas en segundos — gratis y sin registro.',
      description: 'Cree anagramas gratis donde los ninos reordenan letras para formar palabras, guiados por imagenes tematicas como pistas visuales. Este generador produce fichas con palabras mezcladas de mas de 100 categorias — animales, alimentos, vehiculos y mas. Seleccione el nivel de dificultad y el tema visual. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — acceda a todas las funciones al instante. Las descargas incluyen marca de agua. Ideal para padres y educadores que buscan actividades de vocabulario divertidas. ¿Quiere vender fichas de anagramas? Pase a la licencia comercial para archivos sin marca de agua.',
    },
    tutorial: {
      title: 'Como crear anagramas gratis en 3 sencillos pasos',
    },
  },
  // ============================================================
  // TOOL 11: WORD-GUESS
  // ============================================================
  {
    file: 'word-guess.ts',
    seo: {
      primaryKeyword: 'crear juegos de adivinar palabras gratis',
      secondaryKeywords: [
        'juegos de adivinar palabras gratis sin registro',
        'generador de adivinar palabras gratis en linea',
        'fichas de adivinar palabras gratis para imprimir',
        'juegos de adivinanzas de vocabulario gratis',
      ],
      lsiKeywords: [
        'actividades de vocabulario con pistas visuales',
        'fichas de adivinanzas imprimibles para ninos',
        'juegos de palabras educativos con imagenes',
      ],
      titleTag: 'Adivinar palabras gratis en linea | LCS',
      metaDescription: 'Cree juegos de adivinar palabras gratis con imagenes como pistas. Sin registro, sin tarjeta. Descarga con marca de agua. Licencia comercial disponible.',
    },
    hero: {
      title: 'Cree juegos de adivinar palabras gratis en linea',
      tagline: 'Juegos de vocabulario con pistas visuales — gratis y sin registro.',
      description: 'Cree juegos de adivinar palabras gratis donde los ninos descubren palabras ocultas usando imagenes tematicas como pistas. Este generador produce fichas interactivas con diferentes niveles de dificultad y temas visuales de mas de 100 categorias. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — empiece a crear juegos al instante. Las descargas incluyen marca de agua transparente. Perfecto para padres que buscan actividades de vocabulario y educadores que necesitan material ludico. ¿Quiere vender juegos de adivinar palabras? Pase a la licencia comercial para PDFs sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear juegos de adivinar palabras gratis',
    },
  },
  // ============================================================
  // TOOL 12: WRITING
  // ============================================================
  {
    file: 'writing.ts',
    seo: {
      primaryKeyword: 'generador de fichas de escritura gratis',
      secondaryKeywords: [
        'fichas de escritura gratis sin registro',
        'generador de fichas de caligrafia gratis en linea',
        'fichas de escritura gratis para imprimir',
        'hojas de escritura gratis sin tarjeta de credito',
      ],
      lsiKeywords: [
        'fichas de caligrafia para preescolar imprimibles',
        'hojas de practica de escritura para ninos',
        'fichas de trazado de letras y palabras',
      ],
      titleTag: 'Fichas de escritura gratis en linea | LCS',
      metaDescription: 'Genere fichas de escritura y caligrafia gratis. Practique trazado de letras y palabras. Sin registro, sin tarjeta. Licencia comercial para vender.',
    },
    hero: {
      title: 'Genere fichas de escritura y caligrafia gratis',
      tagline: 'Fichas de trazado de letras y palabras — gratis y sin registro.',
      description: 'Cree fichas de escritura gratis para practicar el trazado de letras, palabras y frases. Este generador produce hojas de caligrafia con lineas guia, letras punteadas para trazar y espacios de practica libre. Seleccione el tipo de letra, el tamano y el contenido que desea practicar. Cada ficha se exporta en PDF de alta calidad listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones estan disponibles desde el primer momento. Las descargas incluyen marca de agua. Ideal para padres de ninos en preescolar y primaria que inician la escritura. ¿Quiere vender fichas de escritura? Pase a la licencia comercial para archivos sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear fichas de escritura gratis paso a paso',
    },
  },
  // ============================================================
  // TOOL 13: MATCHING
  // ============================================================
  {
    file: 'matching.ts',
    seo: {
      primaryKeyword: 'generador de fichas de asociacion gratis',
      secondaryKeywords: [
        'fichas de asociacion gratis sin registro',
        'generador de fichas de emparejar gratis en linea',
        'fichas de asociacion gratis para imprimir',
        'hojas de emparejar imagenes gratis sin tarjeta',
      ],
      lsiKeywords: [
        'actividades de asociacion visual para preescolar',
        'fichas de emparejar imagenes y palabras',
        'hojas de trabajo de conexion imprimibles',
      ],
      titleTag: 'Fichas de asociacion gratis | LCS',
      metaDescription: 'Cree fichas de asociacion gratis con imagenes tematicas. Empareje imagenes con palabras. Sin registro, sin tarjeta. Licencia comercial para vender.',
    },
    hero: {
      title: 'Cree fichas de asociacion gratis con imagenes',
      tagline: 'Fichas de emparejar ilustradas listas en segundos — gratis y sin registro.',
      description: 'Cree fichas de asociacion gratis donde los ninos emparejan imagenes con palabras, numeros u otras imagenes. Este generador produce fichas de asociacion visual con imagenes tematicas de mas de 100 categorias. Seleccione el tipo de asociacion, el nivel de dificultad y el tema visual. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — acceda a todas las funciones al instante. Las descargas incluyen marca de agua transparente. Perfecto para padres y educadores de preescolar y primaria. ¿Quiere vender fichas de asociacion? Pase a la licencia comercial para PDFs sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear fichas de asociacion gratis en 3 pasos',
    },
  },
  // ============================================================
  // TOOL 14: DRAWING-LINES
  // ============================================================
  {
    file: 'drawing-lines.ts',
    seo: {
      primaryKeyword: 'generador de fichas de trazo gratis',
      secondaryKeywords: [
        'fichas de trazo gratis sin registro',
        'generador de fichas de trazado gratis en linea',
        'fichas de grafomotricidad gratis para imprimir',
        'hojas de trazo gratis sin tarjeta de credito',
      ],
      lsiKeywords: [
        'fichas de grafomotricidad para preescolar',
        'actividades de trazado de lineas imprimibles',
        'hojas de practica de motricidad fina',
      ],
      titleTag: 'Fichas de trazo gratis en linea | LCS',
      metaDescription: 'Genere fichas de trazo y grafomotricidad gratis con imagenes tematicas. Sin registro, sin tarjeta. Descarga con marca de agua. Licencia comercial disponible.',
    },
    hero: {
      title: 'Genere fichas de trazo y grafomotricidad gratis',
      tagline: 'Fichas de trazado con imagenes tematicas — gratis y sin registro.',
      description: 'Cree fichas de trazo gratis para practicar grafomotricidad con imagenes tematicas que motivan a los ninos. Este generador produce hojas de trazado de lineas rectas, curvas, zigzag y formas basicas con guias visuales. Seleccione el tipo de trazo, el nivel de dificultad y el tema de mas de 100 categorias de imagenes. Cada ficha se exporta en PDF de alta calidad listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones disponibles al instante. Las descargas incluyen marca de agua. Ideal para padres de ninos en preescolar y educadores de motricidad fina. ¿Quiere vender fichas de trazo? Pase a la licencia comercial para archivos sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear fichas de trazo gratis paso a paso',
    },
  },
  // ============================================================
  // TOOL 15: FIND-OBJECTS
  // ============================================================
  {
    file: 'find-objects.ts',
    seo: {
      primaryKeyword: 'generador de busca y encuentra gratis',
      secondaryKeywords: [
        'busca y encuentra gratis sin registro',
        'generador de busca objetos gratis en linea',
        'fichas de busca y encuentra gratis para imprimir',
        'hojas de encontrar objetos gratis sin tarjeta',
      ],
      lsiKeywords: [
        'actividades de atencion visual para ninos',
        'fichas de buscar objetos ocultos imprimibles',
        'juegos de observacion y concentracion',
      ],
      titleTag: 'Busca y encuentra gratis en linea | LCS',
      metaDescription: 'Cree fichas de busca y encuentra gratis con imagenes tematicas. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Licencia comercial.',
    },
    hero: {
      title: 'Cree fichas de busca y encuentra gratis en linea',
      tagline: 'Fichas de buscar objetos listas en segundos — gratis y sin registro.',
      description: 'Cree fichas de busca y encuentra gratis donde los ninos localizan objetos escondidos entre imagenes tematicas. Este generador produce fichas de atencion visual con ilustraciones de mas de 100 categorias — animales, alimentos, vehiculos y mas. Seleccione el nivel de dificultad, la cantidad de objetos y el tema visual. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones disponibles al instante. Las descargas incluyen marca de agua transparente. Perfecto para padres y educadores que buscan actividades de concentracion. ¿Quiere vender fichas de busca y encuentra? Pase a la licencia comercial para PDFs sin marca de agua.',
    },
    tutorial: {
      title: 'Como crear fichas de busca y encuentra gratis',
    },
  },
  // ============================================================
  // TOOL 16: GRID-MATCH
  // ============================================================
  {
    file: 'grid-match.ts',
    seo: {
      primaryKeyword: 'crear cuadriculas de asociacion gratis',
      secondaryKeywords: [
        'cuadriculas de asociacion gratis sin registro',
        'generador de cuadriculas de emparejar gratis',
        'fichas de cuadricula de asociacion gratis en linea',
        'hojas de cuadricula de asociacion gratis para imprimir',
      ],
      lsiKeywords: [
        'actividades de logica visual para ninos',
        'fichas de cuadricula de emparejamiento imprimibles',
        'juegos de asociacion en cuadricula',
      ],
      titleTag: 'Cuadriculas de asociacion gratis | LCS',
      metaDescription: 'Cree cuadriculas de asociacion gratis con imagenes tematicas. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Licencia comercial.',
    },
    hero: {
      title: 'Cree cuadriculas de asociacion gratis con imagenes',
      tagline: 'Fichas de cuadricula para emparejar — gratis y sin registro.',
      description: 'Cree cuadriculas de asociacion gratis donde los ninos emparejan imagenes en un formato de cuadricula visual. Este generador produce fichas de asociacion en cuadricula con imagenes tematicas de mas de 100 categorias. Seleccione el tamano de la cuadricula, el nivel de dificultad y el tema visual. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — acceda a todas las funciones al instante. Las descargas incluyen marca de agua transparente. Ideal para padres y educadores que buscan actividades de logica visual. ¿Quiere vender cuadriculas de asociacion? Pase a la licencia comercial para PDFs sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear cuadriculas de asociacion gratis',
    },
  },
  // ============================================================
  // TOOL 17: FIND-AND-COUNT
  // ============================================================
  {
    file: 'find-and-count.ts',
    seo: {
      primaryKeyword: 'generador de busca y cuenta gratis',
      secondaryKeywords: [
        'busca y cuenta gratis sin registro',
        'generador de busca y cuenta gratis en linea',
        'fichas de busca y cuenta gratis para imprimir',
        'hojas de buscar y contar gratis sin tarjeta',
      ],
      lsiKeywords: [
        'actividades de conteo visual para preescolar',
        'fichas de buscar y contar objetos imprimibles',
        'juegos de observacion y conteo para ninos',
      ],
      titleTag: 'Busca y cuenta gratis en linea | LCS',
      metaDescription: 'Cree fichas de busca y cuenta gratis con imagenes tematicas. Sin registro, sin tarjeta de credito. Descarga con marca de agua. Licencia comercial disponible.',
    },
    hero: {
      title: 'Cree fichas de busca y cuenta gratis en linea',
      tagline: 'Fichas de buscar y contar listas en segundos — gratis y sin registro.',
      description: 'Cree fichas de busca y cuenta gratis donde los ninos buscan objetos entre imagenes tematicas y cuentan cuantos hay de cada tipo. Este generador combina atencion visual con habilidades de conteo usando ilustraciones de mas de 100 categorias. Seleccione el nivel de dificultad, la cantidad de objetos y el tema visual. Cada ficha incluye solucionario automatico y se exporta en PDF listo para imprimir. No necesita registro ni tarjeta de credito — todas las funciones disponibles al instante. Las descargas incluyen marca de agua. Ideal para padres y educadores de preescolar y primaria. ¿Quiere vender fichas de busca y cuenta? Pase a la licencia comercial para archivos sin marca de agua a 300 DPI.',
    },
    tutorial: {
      title: 'Como crear fichas de busca y cuenta gratis',
    },
  },
];

// ============================================================
// APPLY CHANGES
// ============================================================
let totalUpdated = 0;

for (const tool of tools) {
  const filePath = path.join(BASE, tool.file);
  console.log(`\nProcessing: ${tool.file}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ERROR: File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update SEO fields
  content = replaceField(content, 'primaryKeyword', tool.seo.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', tool.seo.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', tool.seo.lsiKeywords);
  content = replaceField(content, 'titleTag', tool.seo.titleTag);

  // metaDescription might be on next line after field name
  const mdRe = /(metaDescription:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (mdRe.test(content)) {
    content = content.replace(mdRe, `$1'${esc(tool.seo.metaDescription)}'`);
  }

  // Update hero fields
  // Hero title - first 'title' inside hero block
  const heroTitleRe = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (heroTitleRe.test(content)) {
    content = content.replace(heroTitleRe, `$1'${esc(tool.hero.title)}'`);
  }

  // Tagline
  content = replaceField(content, 'tagline', tool.hero.tagline);

  // Hero description - complex multiline
  content = replaceHeroDescription(content, tool.hero.description);

  // Update tutorial section title (tool pages use tutorial instead of howItWorks)
  if (tool.tutorial && tool.tutorial.title) {
    const tutorialRe = /(tutorial:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
    if (tutorialRe.test(content)) {
      content = content.replace(tutorialRe, `$1'${esc(tool.tutorial.title)}'`);
    } else {
      console.warn('  WARNING: Could not find tutorial title');
    }
  }

  // Replace Gumroad references with Hotmart
  content = content.replace(/Gumroad/g, 'Hotmart');
  content = content.replace(/gumroad\.com/g, 'hotmart.com');
  content = content.replace(/teacherspayteachers\.com/g, 'hotmart.com');

  // Validate lengths
  const titleMatch = content.match(/titleTag:\s*'([^']*)'/);
  if (titleMatch && titleMatch[1].length > 60) {
    console.warn(`  WARNING: titleTag is ${titleMatch[1].length} chars (max 60): "${titleMatch[1]}"`);
  } else if (titleMatch) {
    console.log(`  titleTag: ${titleMatch[1].length} chars OK`);
  }

  const metaMatch = content.match(/metaDescription:\s*\n?\s*'([^']*)'/);
  if (metaMatch && metaMatch[1].length > 155) {
    console.warn(`  WARNING: metaDescription is ${metaMatch[1].length} chars (max 155): "${metaMatch[1]}"`);
  } else if (metaMatch) {
    console.log(`  metaDescription: ${metaMatch[1].length} chars OK`);
  }

  // Check for unicode escapes
  if (/\\u[0-9a-fA-F]{4}/.test(content)) {
    console.warn('  WARNING: Found \\uXXXX unicode escapes!');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated ${tool.file}`);
  totalUpdated++;
}

console.log(`\n=== Done: ${totalUpdated} of ${tools.length} files updated ===`);
