const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'es');

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
function replaceField(content, fieldName, newValue) {
  const re = new RegExp(`(${fieldName}:\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) return content.replace(re, `$1'${esc(newValue)}'`);
  const re2 = new RegExp(`(${fieldName}:\\s*\\n\\s*)(['"])(?:[^'"\\\\]|\\\\.)*\\2`);
  if (re2.test(content)) return content.replace(re2, `$1'${esc(newValue)}'`);
  console.warn(`  WARNING: Could not find field ${fieldName}`); return content;
}
function replaceArrayField(content, fieldName, newValues) {
  const re = new RegExp(`(${fieldName}:\\s*)\\[[\\s\\S]*?\\]`);
  if (re.test(content)) {
    const formatted = newValues.map(v => `      '${esc(v)}',`).join('\n');
    return content.replace(re, `$1[\n${formatted}\n    ]`);
  }
  console.warn(`  WARNING: Could not find array field ${fieldName}`); return content;
}
function replaceHeroTitle(content, newTitle) {
  const re = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) return content.replace(re, `$1'${esc(newTitle)}'`);
  return content;
}
function replaceHeroDescription(content, newDesc) {
  const re = /(hero:\s*\{[\s\S]*?title:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) return content.replace(re, `$1'${esc(newDesc)}'`);
  const re2 = /(tagline:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re2.test(content)) return content.replace(re2, `$1'${esc(newDesc)}'`);
  console.warn('  WARNING: Could not replace hero description'); return content;
}

const guides = [
  {
    file: 'create-addition-worksheets.ts',
    primaryKeyword: 'crear fichas de sumas para vender',
    secondaryKeywords: [
      'cómo crear fichas de sumas imprimibles',
      'guía paso a paso fichas de sumas',
      'vender fichas de sumas en Etsy y KDP',
      'fichas de sumas con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de adición con imágenes',
      'fichas de matemáticas para negocio de imprimibles',
      'exportar PDF fichas de sumas profesionales',
    ],
    titleTag: 'Crear fichas de sumas para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de sumas para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y licencia comercial incluida.',
    heroTitle: 'Cómo crear fichas de sumas profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de sumas listas para vender en los principales marketplaces de imprimibles educativos. Esta guía paso a paso le enseña a configurar niveles de dificultad, elegir temas visuales atractivos y exportar archivos PDF de calidad profesional con claves de respuestas automáticas. Aprenda a generar variaciones de producto que multipliquen su catálogo, fijar precios competitivos y optimizar sus anuncios en Etsy, Amazon KDP y Hotmart. Todas las funciones están disponibles en la prueba gratis con marca de agua para que evalúe la calidad antes de comprar su licencia comercial.',
  },
  {
    file: 'create-subtraction-worksheets.ts',
    primaryKeyword: 'crear fichas de restas para vender',
    secondaryKeywords: [
      'cómo crear fichas de restas imprimibles',
      'guía paso a paso fichas de sustracción',
      'vender fichas de restas en Etsy y KDP',
      'fichas de restas con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de sustracción con imágenes',
      'fichas de restas para negocio imprimible',
      'exportar PDF fichas de restas profesionales',
    ],
    titleTag: 'Fichas de restas para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de restas para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF lista para imprimir.',
    heroTitle: 'Cómo crear fichas de restas profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de restas atractivas y listas para vender en marketplaces de imprimibles educativos. Esta guía le muestra paso a paso cómo configurar rangos de números, seleccionar temas visuales y generar claves de respuestas automáticas. Aprenda a crear variaciones por dificultad y tema para construir un catálogo completo de productos de sustracción. Optimice sus anuncios para Etsy, Amazon KDP y Hotmart con títulos y descripciones que atraigan compradores. Pruebe todas las funciones gratis con marca de agua antes de adquirir su licencia comercial.',
  },
  {
    file: 'create-word-search-puzzles.ts',
    primaryKeyword: 'crear sopas de letras con imágenes para vender',
    secondaryKeywords: [
      'cómo crear sopas de letras imprimibles',
      'guía paso a paso sopas de letras temáticas',
      'vender sopas de letras en Etsy y KDP',
      'sopas de letras con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de sopas de letras con imágenes',
      'sopas de letras para negocio de imprimibles',
      'exportar PDF sopas de letras profesionales',
    ],
    titleTag: 'Sopas de letras con imágenes | LCS',
    metaDescription: 'Aprenda a crear sopas de letras con imágenes para vender en Etsy, KDP y Hotmart. Guía paso a paso para generar puzzles profesionales con su marca.',
    heroTitle: 'Cómo crear sopas de letras con imágenes para vender',
    heroDescription: 'Descubra cómo crear sopas de letras temáticas con imágenes que se venden en los principales marketplaces. Esta guía paso a paso le enseña a configurar la dificultad, elegir temas visuales atractivos y generar puzzles profesionales con claves de respuestas incluidas. Aprenda a crear variaciones temáticas y estacionales para multiplicar su catálogo de productos imprimibles. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para máxima visibilidad. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-crossword-puzzles.ts',
    primaryKeyword: 'crear crucigramas para vender en línea',
    secondaryKeywords: [
      'cómo crear crucigramas imprimibles',
      'guía paso a paso crucigramas educativos',
      'vender crucigramas en Etsy y Amazon KDP',
      'crucigramas con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de crucigramas con imágenes temáticas',
      'crucigramas para negocio de imprimibles',
      'exportar PDF crucigramas profesionales',
    ],
    titleTag: 'Crucigramas para vender en línea | LCS',
    metaDescription: 'Aprenda a crear crucigramas para vender en línea en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y licencia comercial.',
    heroTitle: 'Cómo crear crucigramas profesionales para vender en línea',
    heroDescription: 'Descubra cómo crear crucigramas educativos listos para vender en marketplaces de imprimibles. Esta guía paso a paso le muestra cómo configurar la dificultad, seleccionar temas con imágenes atractivas y generar puzzles con claves de respuestas automáticas. Aprenda a construir un catálogo completo de crucigramas temáticos y estacionales que atraigan compradores en Etsy, Amazon KDP y Hotmart. Cree variaciones por nivel de dificultad para maximizar su alcance. Pruebe todas las funciones gratis con marca de agua antes de comprar su licencia comercial.',
  },
  {
    file: 'create-math-puzzle-worksheets.ts',
    primaryKeyword: 'crear rompecabezas de mates para vender',
    secondaryKeywords: [
      'cómo crear rompecabezas matemáticos imprimibles',
      'guía paso a paso puzzles de mates',
      'vender rompecabezas de mates en Etsy y KDP',
      'puzzles matemáticos con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de rompecabezas matemáticos con imágenes',
      'puzzles de mates para negocio imprimible',
      'exportar PDF rompecabezas de mates profesionales',
    ],
    titleTag: 'Rompecabezas de mates para vender | LCS',
    metaDescription: 'Aprenda a crear rompecabezas de mates para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF.',
    heroTitle: 'Cómo crear rompecabezas de mates para vender',
    heroDescription: 'Descubra cómo crear rompecabezas matemáticos atractivos y listos para vender en los principales marketplaces. Esta guía paso a paso le enseña a configurar operaciones, elegir temas visuales y generar puzzles con soluciones automáticas. Aprenda a crear variaciones por dificultad y tema para construir un catálogo completo de productos de matemáticas recreativas. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para atraer compradores. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-handwriting-sheets.ts',
    primaryKeyword: 'crear fichas de caligrafía para vender',
    secondaryKeywords: [
      'cómo crear fichas de caligrafía imprimibles',
      'guía paso a paso fichas de escritura',
      'vender fichas de caligrafía en Etsy y KDP',
      'fichas de caligrafía con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de caligrafía con guías',
      'fichas de escritura para negocio imprimible',
      'exportar PDF fichas de caligrafía profesionales',
    ],
    titleTag: 'Fichas de caligrafía para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de caligrafía para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y formatos listos para imprimir.',
    heroTitle: 'Cómo crear fichas de caligrafía profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de caligrafía listas para vender en marketplaces de imprimibles educativos. Esta guía paso a paso le muestra cómo configurar estilos de letra, seleccionar líneas de guía apropiadas y generar fichas profesionales para distintos niveles. Aprenda a crear variaciones por tipo de letra y dificultad para multiplicar su catálogo de productos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con palabras clave efectivas. Pruebe todas las funciones gratis con marca de agua antes de adquirir su licencia comercial.',
  },
  {
    file: 'create-coloring-pages.ts',
    primaryKeyword: 'crear dibujos para colorear para Etsy y KDP',
    secondaryKeywords: [
      'cómo crear páginas para colorear imprimibles',
      'guía paso a paso dibujos para colorear',
      'vender dibujos para colorear en Etsy y Amazon KDP',
      'páginas para colorear con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de dibujos para colorear temáticos',
      'páginas para colorear para negocio imprimible',
      'exportar PDF dibujos para colorear profesionales',
    ],
    titleTag: 'Colorear para Etsy y KDP | LCS',
    metaDescription: 'Aprenda a crear dibujos para colorear para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y licencia comercial incluida.',
    heroTitle: 'Cómo crear dibujos para colorear para Etsy y KDP',
    heroDescription: 'Descubra cómo crear dibujos para colorear atractivos y listos para vender en los principales marketplaces. Esta guía paso a paso le enseña a seleccionar temas populares, configurar el nivel de detalle apropiado y exportar archivos de calidad profesional. Aprenda a crear colecciones temáticas y estacionales que multipliquen su catálogo de productos imprimibles. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para máxima visibilidad entre compradores. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-bingo-cards.ts',
    primaryKeyword: 'crear cartones de bingo con imágenes para vender',
    secondaryKeywords: [
      'cómo crear cartones de bingo imprimibles',
      'guía paso a paso bingo educativo con imágenes',
      'vender cartones de bingo en Etsy y KDP',
      'bingo con imágenes licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de cartones de bingo temáticos',
      'bingo con imágenes para negocio imprimible',
      'exportar PDF cartones de bingo profesionales',
    ],
    titleTag: 'Cartones de bingo para vender | LCS',
    metaDescription: 'Aprenda a crear cartones de bingo con imágenes para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF.',
    heroTitle: 'Cómo crear cartones de bingo con imágenes para vender',
    heroDescription: 'Descubra cómo crear cartones de bingo con imágenes temáticas listos para vender en marketplaces de imprimibles. Esta guía paso a paso le muestra cómo configurar cuadrículas, seleccionar temas visuales atractivos y generar conjuntos únicos de cartones. Aprenda a crear variaciones temáticas y estacionales para construir un catálogo completo de productos de bingo educativo. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con títulos y descripciones efectivas. Pruebe todas las funciones gratis con marca de agua antes de comprar su licencia comercial.',
  },
  {
    file: 'create-matching-worksheets.ts',
    primaryKeyword: 'crear fichas de asociación para vender',
    secondaryKeywords: [
      'cómo crear fichas de asociación imprimibles',
      'guía paso a paso fichas de emparejar',
      'vender fichas de asociación en Etsy y KDP',
      'fichas de emparejar licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de asociación con imágenes',
      'fichas de emparejar para negocio imprimible',
      'exportar PDF fichas de asociación profesionales',
    ],
    titleTag: 'Fichas de asociación para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de asociación para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y claves de respuestas.',
    heroTitle: 'Cómo crear fichas de asociación profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de asociación atractivas y listas para vender en los principales marketplaces. Esta guía paso a paso le enseña a configurar pares de imágenes, seleccionar temas visuales y generar fichas con claves de respuestas automáticas. Aprenda a crear variaciones por tema y dificultad para multiplicar su catálogo de productos imprimibles educativos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para atraer compradores. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-pattern-worksheets.ts',
    primaryKeyword: 'crear fichas de patrones para vender',
    secondaryKeywords: [
      'cómo crear fichas de patrones imprimibles',
      'guía paso a paso fichas de secuencias',
      'vender fichas de patrones en Etsy y KDP',
      'fichas de patrones licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de patrones con imágenes',
      'fichas de secuencias para negocio imprimible',
      'exportar PDF fichas de patrones profesionales',
    ],
    titleTag: 'Fichas de patrones para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de patrones para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF lista para imprimir.',
    heroTitle: 'Cómo crear fichas de patrones profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de patrones y secuencias listas para vender en marketplaces de imprimibles educativos. Esta guía paso a paso le muestra cómo configurar la complejidad de las secuencias, elegir temas visuales atractivos y generar fichas profesionales con claves de respuestas. Aprenda a crear variaciones por dificultad y tema para construir un catálogo completo. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con palabras clave que atraigan compradores. Pruebe todas las funciones gratis con marca de agua antes de adquirir su licencia comercial.',
  },
  {
    file: 'create-picture-sudoku.ts',
    primaryKeyword: 'crear sudoku con imágenes para vender',
    secondaryKeywords: [
      'cómo crear sudoku con imágenes imprimibles',
      'guía paso a paso sudoku visual educativo',
      'vender sudoku con imágenes en Etsy y KDP',
      'sudoku visual licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de sudoku con imágenes temáticas',
      'sudoku visual para negocio de imprimibles',
      'exportar PDF sudoku con imágenes profesional',
    ],
    titleTag: 'Sudoku con imágenes para vender | LCS',
    metaDescription: 'Aprenda a crear sudoku con imágenes para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y soluciones automáticas.',
    heroTitle: 'Cómo crear sudoku con imágenes para vender',
    heroDescription: 'Descubra cómo crear sudoku con imágenes temáticas listos para vender en los principales marketplaces. Esta guía paso a paso le enseña a configurar cuadrículas, seleccionar temas visuales atractivos y generar puzzles con soluciones automáticas incluidas. Aprenda a crear variaciones por tamaño de cuadrícula y tema para multiplicar su catálogo de productos imprimibles. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para máxima visibilidad. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-maze-worksheets.ts',
    primaryKeyword: 'crear laberintos para vender en Etsy',
    secondaryKeywords: [
      'cómo crear laberintos imprimibles para niños',
      'guía paso a paso fichas de laberintos',
      'vender laberintos en Etsy y Amazon KDP',
      'laberintos con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de laberintos temáticos con imágenes',
      'laberintos para negocio de imprimibles',
      'exportar PDF laberintos profesionales',
    ],
    titleTag: 'Laberintos para vender en Etsy | LCS',
    metaDescription: 'Aprenda a crear laberintos para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y niveles de dificultad configurables.',
    heroTitle: 'Cómo crear laberintos profesionales para vender en Etsy',
    heroDescription: 'Descubra cómo crear laberintos atractivos y listos para vender en marketplaces de imprimibles. Esta guía paso a paso le muestra cómo configurar la dificultad, elegir temas con imágenes atractivas y generar laberintos únicos con soluciones automáticas. Aprenda a crear variaciones por nivel de complejidad y tema para construir un catálogo completo de productos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con títulos y descripciones que atraigan compradores. Pruebe todas las funciones gratis con marca de agua antes de comprar su licencia comercial.',
  },
  {
    file: 'create-hidden-object-worksheets.ts',
    primaryKeyword: 'crear busca y encuentra para vender',
    secondaryKeywords: [
      'cómo crear fichas de busca y encuentra imprimibles',
      'guía paso a paso objetos ocultos educativos',
      'vender busca y encuentra en Etsy y KDP',
      'fichas de objetos ocultos licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de busca y encuentra temáticos',
      'fichas de objetos ocultos para negocio imprimible',
      'exportar PDF busca y encuentra profesionales',
    ],
    titleTag: 'Busca y encuentra para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de busca y encuentra para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y licencia comercial.',
    heroTitle: 'Cómo crear fichas de busca y encuentra para vender',
    heroDescription: 'Descubra cómo crear fichas de busca y encuentra listas para vender en los principales marketplaces de imprimibles. Esta guía paso a paso le enseña a configurar la cantidad de objetos ocultos, seleccionar temas visuales atractivos y generar fichas con claves de respuestas automáticas. Aprenda a crear variaciones temáticas y estacionales para multiplicar su catálogo de productos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para máxima visibilidad. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-size-comparison-worksheets.ts',
    primaryKeyword: 'crear fichas de comparación para vender',
    secondaryKeywords: [
      'cómo crear fichas de comparación de tamaños',
      'guía paso a paso fichas grande y pequeño',
      'vender fichas de comparación en Etsy y KDP',
      'fichas de tamaños licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de comparación con imágenes',
      'fichas de tamaños para negocio de imprimibles',
      'exportar PDF fichas de comparación profesionales',
    ],
    titleTag: 'Fichas de comparación para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de comparación de tamaños para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF.',
    heroTitle: 'Cómo crear fichas de comparación de tamaños para vender',
    heroDescription: 'Descubra cómo crear fichas de comparación de tamaños listas para vender en marketplaces de imprimibles educativos. Esta guía paso a paso le muestra cómo configurar los pares de imágenes, seleccionar temas visuales y generar fichas profesionales con claves de respuestas. Aprenda a crear variaciones por tema y dificultad para construir un catálogo completo de productos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con palabras clave efectivas. Pruebe todas las funciones gratis con marca de agua antes de adquirir su licencia comercial.',
  },
  {
    file: 'create-counting-worksheets.ts',
    primaryKeyword: 'crear fichas de conteo para vender en Etsy',
    secondaryKeywords: [
      'cómo crear fichas de conteo imprimibles',
      'guía paso a paso fichas para contar',
      'vender fichas de conteo en Etsy y Amazon KDP',
      'fichas de conteo licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de conteo con imágenes',
      'fichas para contar para negocio imprimible',
      'exportar PDF fichas de conteo profesionales',
    ],
    titleTag: 'Fichas de conteo para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de conteo para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y formatos listos para imprimir.',
    heroTitle: 'Cómo crear fichas de conteo profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de conteo con imágenes listas para vender en los principales marketplaces. Esta guía paso a paso le enseña a configurar rangos numéricos, seleccionar temas visuales atractivos y generar fichas profesionales con claves de respuestas automáticas. Aprenda a crear variaciones por dificultad y tema para multiplicar su catálogo de productos imprimibles. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para atraer compradores. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-drawing-worksheets.ts',
    primaryKeyword: 'crear fichas de dibujo para vender',
    secondaryKeywords: [
      'cómo crear fichas de dibujo imprimibles',
      'guía paso a paso fichas de dibujo dirigido',
      'vender fichas de dibujo en Etsy y KDP',
      'fichas de dibujo licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de dibujo temáticas',
      'fichas de dibujo para negocio de imprimibles',
      'exportar PDF fichas de dibujo profesionales',
    ],
    titleTag: 'Fichas de dibujo para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de dibujo para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y licencia comercial incluida.',
    heroTitle: 'Cómo crear fichas de dibujo profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de dibujo atractivas y listas para vender en marketplaces de imprimibles. Esta guía paso a paso le muestra cómo configurar instrucciones de dibujo, seleccionar temas con imágenes atractivas y generar fichas profesionales para distintos niveles. Aprenda a crear variaciones por tema y estilo para construir un catálogo completo de productos de dibujo. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con descripciones que atraigan compradores. Pruebe todas las funciones gratis con marca de agua antes de comprar su licencia comercial.',
  },
  {
    file: 'create-sorting-worksheets.ts',
    primaryKeyword: 'crear fichas de clasificación para vender',
    secondaryKeywords: [
      'cómo crear fichas de clasificación imprimibles',
      'guía paso a paso fichas de ordenar y clasificar',
      'vender fichas de clasificación en Etsy y KDP',
      'fichas de clasificación licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de clasificación con imágenes',
      'fichas de ordenar para negocio imprimible',
      'exportar PDF fichas de clasificación profesionales',
    ],
    titleTag: 'Fichas de clasificación para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de clasificación para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF.',
    heroTitle: 'Cómo crear fichas de clasificación profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de clasificación listas para vender en los principales marketplaces de imprimibles educativos. Esta guía paso a paso le enseña a configurar categorías, seleccionar temas visuales atractivos y generar fichas con claves de respuestas automáticas. Aprenda a crear variaciones por tema y nivel de dificultad para multiplicar su catálogo de productos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para máxima visibilidad entre compradores. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-shadow-matching-worksheets.ts',
    primaryKeyword: 'crear fichas de sombras para vender',
    secondaryKeywords: [
      'cómo crear fichas de sombras imprimibles',
      'guía paso a paso fichas de emparejar sombras',
      'vender fichas de sombras en Etsy y KDP',
      'fichas de sombras licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de sombras temáticas',
      'fichas de emparejar sombras para negocio imprimible',
      'exportar PDF fichas de sombras profesionales',
    ],
    titleTag: 'Fichas de sombras para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de sombras para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y claves de respuestas incluidas.',
    heroTitle: 'Cómo crear fichas de emparejar sombras para vender',
    heroDescription: 'Descubra cómo crear fichas de emparejar sombras listas para vender en marketplaces de imprimibles. Esta guía paso a paso le muestra cómo configurar los pares de siluetas, seleccionar temas visuales atractivos y generar fichas profesionales con claves de respuestas automáticas. Aprenda a crear variaciones por tema y dificultad para construir un catálogo completo de productos educativos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con palabras clave efectivas. Pruebe todas las funciones gratis con marca de agua antes de adquirir su licencia comercial.',
  },
  {
    file: 'create-odd-one-out-puzzles.ts',
    primaryKeyword: 'crear encuentra el intruso para vender',
    secondaryKeywords: [
      'cómo crear fichas de encuentra el intruso',
      'guía paso a paso puzzles encuentra el diferente',
      'vender encuentra el intruso en Etsy y KDP',
      'fichas encuentra el intruso licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas encuentra el intruso temáticas',
      'puzzles de encuentra el diferente para negocio imprimible',
      'exportar PDF encuentra el intruso profesionales',
    ],
    titleTag: 'Encuentra el intruso para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de encuentra el intruso para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF.',
    heroTitle: 'Cómo crear fichas de encuentra el intruso para vender',
    heroDescription: 'Descubra cómo crear fichas de encuentra el intruso listas para vender en los principales marketplaces de imprimibles. Esta guía paso a paso le enseña a configurar grupos de imágenes, seleccionar temas visuales y generar puzzles con claves de respuestas automáticas. Aprenda a crear variaciones por tema y nivel de dificultad para multiplicar su catálogo de productos educativos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para atraer compradores. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-missing-pieces-puzzles.ts',
    primaryKeyword: 'crear rompecabezas de piezas faltantes para vender',
    secondaryKeywords: [
      'cómo crear fichas de piezas faltantes imprimibles',
      'guía paso a paso puzzles de piezas que faltan',
      'vender rompecabezas piezas faltantes en Etsy y KDP',
      'fichas piezas faltantes licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de puzzles de piezas faltantes temáticos',
      'fichas de piezas que faltan para negocio imprimible',
      'exportar PDF puzzles de piezas faltantes profesionales',
    ],
    titleTag: 'Piezas faltantes para vender | LCS',
    metaDescription: 'Aprenda a crear rompecabezas de piezas faltantes para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y licencia comercial.',
    heroTitle: 'Cómo crear rompecabezas de piezas faltantes para vender',
    heroDescription: 'Descubra cómo crear rompecabezas de piezas faltantes listos para vender en marketplaces de imprimibles. Esta guía paso a paso le muestra cómo configurar la dificultad del puzzle, seleccionar temas con imágenes atractivas y generar fichas profesionales con soluciones incluidas. Aprenda a crear variaciones por tema y complejidad para construir un catálogo completo de productos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con títulos y descripciones efectivas. Pruebe todas las funciones gratis con marca de agua antes de comprar su licencia comercial.',
  },
  {
    file: 'create-treasure-hunt-worksheets.ts',
    primaryKeyword: 'crear búsquedas del tesoro para vender',
    secondaryKeywords: [
      'cómo crear fichas de búsqueda del tesoro imprimibles',
      'guía paso a paso búsquedas del tesoro educativas',
      'vender búsquedas del tesoro en Etsy y KDP',
      'fichas de búsqueda del tesoro licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de búsquedas del tesoro temáticas',
      'fichas de búsqueda del tesoro para negocio imprimible',
      'exportar PDF búsquedas del tesoro profesionales',
    ],
    titleTag: 'Búsquedas del tesoro para vender | LCS',
    metaDescription: 'Aprenda a crear búsquedas del tesoro para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y formatos listos para imprimir.',
    heroTitle: 'Cómo crear búsquedas del tesoro profesionales para vender',
    heroDescription: 'Descubra cómo crear búsquedas del tesoro educativas listas para vender en los principales marketplaces. Esta guía paso a paso le enseña a configurar pistas y objetos, seleccionar temas visuales atractivos y generar fichas profesionales con claves de respuestas. Aprenda a crear variaciones temáticas y estacionales para multiplicar su catálogo de productos imprimibles. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para máxima visibilidad. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-alphabet-worksheets.ts',
    primaryKeyword: 'crear fichas de abecedario para vender en Etsy',
    secondaryKeywords: [
      'cómo crear fichas de abecedario imprimibles',
      'guía paso a paso fichas del alfabeto',
      'vender fichas de abecedario en Etsy y Amazon KDP',
      'fichas del alfabeto licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de abecedario con imágenes',
      'fichas del alfabeto para negocio imprimible',
      'exportar PDF fichas de abecedario profesionales',
    ],
    titleTag: 'Fichas de abecedario para Etsy | LCS',
    metaDescription: 'Aprenda a crear fichas de abecedario para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y licencia comercial incluida.',
    heroTitle: 'Cómo crear fichas de abecedario para vender en Etsy',
    heroDescription: 'Descubra cómo crear fichas de abecedario atractivas y listas para vender en marketplaces de imprimibles educativos. Esta guía paso a paso le muestra cómo configurar letras, seleccionar temas con imágenes atractivas y generar fichas profesionales para distintos niveles. Aprenda a crear variaciones por estilo de letra y tema para construir un catálogo completo de productos del alfabeto. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart con descripciones que atraigan compradores. Pruebe todas las funciones gratis con marca de agua antes de comprar su licencia comercial.',
  },
  {
    file: 'create-preposition-worksheets.ts',
    primaryKeyword: 'crear fichas de preposiciones ELE para vender',
    secondaryKeywords: [
      'cómo crear fichas de preposiciones imprimibles',
      'guía paso a paso fichas de preposiciones espaciales',
      'vender fichas de preposiciones en Etsy y KDP',
      'fichas de preposiciones ELE licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de preposiciones con imágenes',
      'fichas de preposiciones espaciales para negocio imprimible',
      'exportar PDF fichas de preposiciones profesionales',
    ],
    titleTag: 'Fichas de preposiciones ELE | LCS',
    metaDescription: 'Aprenda a crear fichas de preposiciones ELE para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y exportación PDF.',
    heroTitle: 'Cómo crear fichas de preposiciones ELE para vender',
    heroDescription: 'Descubra cómo crear fichas de preposiciones espaciales listas para vender en marketplaces de imprimibles. Esta guía paso a paso le enseña a configurar escenas, seleccionar preposiciones objetivo y generar fichas profesionales con imágenes temáticas y claves de respuestas. Aprenda a crear variaciones por tema y nivel para multiplicar su catálogo de productos ELE. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para atraer compradores de español como lengua extranjera. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
  {
    file: 'create-cryptogram-puzzles.ts',
    primaryKeyword: 'crear criptogramas para vender',
    secondaryKeywords: [
      'cómo crear criptogramas imprimibles',
      'guía paso a paso puzzles de criptogramas',
      'vender criptogramas en Etsy y Amazon KDP',
      'criptogramas con licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de criptogramas temáticos',
      'puzzles de criptogramas para negocio imprimible',
      'exportar PDF criptogramas profesionales',
    ],
    titleTag: 'Criptogramas para vender en línea | LCS',
    metaDescription: 'Aprenda a crear criptogramas para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y soluciones automáticas incluidas.',
    heroTitle: 'Cómo crear criptogramas profesionales para vender',
    heroDescription: 'Descubra cómo crear criptogramas atractivos y listos para vender en los principales marketplaces de imprimibles. Esta guía paso a paso le muestra cómo configurar la dificultad del cifrado, seleccionar temas y generar puzzles profesionales con soluciones automáticas incluidas. Aprenda a crear variaciones por nivel de complejidad y tema para construir un catálogo completo de productos de criptogramas. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para atraer compradores. Pruebe todas las funciones gratis con marca de agua antes de adquirir su licencia comercial.',
  },
  {
    file: 'create-chart-count-worksheets.ts',
    primaryKeyword: 'crear fichas de gráficos para vender',
    secondaryKeywords: [
      'cómo crear fichas de gráficos y conteo imprimibles',
      'guía paso a paso fichas de gráficos educativos',
      'vender fichas de gráficos en Etsy y KDP',
      'fichas de gráficos licencia comercial Hotmart',
    ],
    lsiKeywords: [
      'generador de fichas de gráficos con imágenes',
      'fichas de gráficos para negocio de imprimibles',
      'exportar PDF fichas de gráficos profesionales',
    ],
    titleTag: 'Fichas de gráficos para vender | LCS',
    metaDescription: 'Aprenda a crear fichas de gráficos para vender en Etsy, KDP y Hotmart. Guía paso a paso con generador profesional y formatos listos para imprimir.',
    heroTitle: 'Cómo crear fichas de gráficos profesionales para vender',
    heroDescription: 'Descubra cómo crear fichas de gráficos y conteo listas para vender en los principales marketplaces de imprimibles educativos. Esta guía paso a paso le enseña a configurar tipos de gráficos, seleccionar temas visuales atractivos y generar fichas profesionales con claves de respuestas automáticas. Aprenda a crear variaciones por tema y dificultad para multiplicar su catálogo de productos. Optimice sus anuncios en Etsy, Amazon KDP y Hotmart para máxima visibilidad. Todas las funciones están disponibles en la prueba gratis con marca de agua para evaluar la calidad.',
  },
];

let updated = 0;
let skipped = 0;
let errors = 0;

for (const g of guides) {
  const filePath = path.join(BASE, g.file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${g.file}`);
    errors++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace Gumroad → Hotmart throughout
  content = content.replace(/Gumroad/g, 'Hotmart');

  // SEO fields
  content = replaceField(content, 'primaryKeyword', g.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', g.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', g.lsiKeywords);
  content = replaceField(content, 'titleTag', g.titleTag);
  content = replaceField(content, 'metaDescription', g.metaDescription);

  // Hero
  content = replaceHeroTitle(content, g.heroTitle);
  content = replaceHeroDescription(content, g.heroDescription);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`UPDATED: ${g.file}`);
    updated++;
  } else {
    console.log(`NO CHANGE: ${g.file}`);
    skipped++;
  }
}

console.log(`\nDone: ${updated} updated, ${skipped} unchanged, ${errors} errors`);

// Validation
console.log('\n--- Validation ---');
for (const g of guides) {
  const filePath = path.join(BASE, g.file);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');

  // Check titleTag length
  const titleMatch = content.match(/titleTag:\s*'([^']*)'/);
  if (titleMatch && titleMatch[1].length > 60) {
    console.warn(`  TITLE TOO LONG (${titleMatch[1].length}): ${g.file} — "${titleMatch[1]}"`);
  }

  // Check metaDescription length
  const metaMatch = content.match(/metaDescription:\s*'([^']*)'/);
  if (metaMatch && metaMatch[1].length > 155) {
    console.warn(`  META TOO LONG (${metaMatch[1].length}): ${g.file} — "${metaMatch[1]}"`);
  }

  // Check for remaining Gumroad
  if (content.includes('Gumroad')) {
    console.warn(`  GUMROAD FOUND: ${g.file}`);
  }

  // Check for unicode escapes
  if (/\\u[0-9a-fA-F]{4}/.test(content)) {
    console.warn(`  UNICODE ESCAPE FOUND: ${g.file}`);
  }
}
console.log('Validation complete.');
