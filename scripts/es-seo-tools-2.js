const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'es');

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

const updates = [
  {
    file: 'missing-pieces.ts',
    primaryKeyword: 'generador de piezas faltantes gratis',
    secondaryKeywords: [
      'fichas de piezas faltantes gratis sin registro',
      'generador de rompecabezas de piezas faltantes en línea',
      'crear fichas de piezas faltantes gratis para imprimir',
      'piezas faltantes gratis con clave de respuestas',
    ],
    lsiKeywords: [
      'rompecabezas visual piezas recortadas ficha imprimible',
      'puzzle de discriminación visual con opciones distractoras',
      'actividad de razonamiento espacial piezas faltantes PDF',
    ],
    titleTag: 'Piezas faltantes gratis en línea | LCS',
    metaDescription: 'Cree fichas de piezas faltantes gratis sin registro. 6 formas de pieza, dificultad configurable, clave de respuestas automática. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de piezas faltantes gratis en línea',
    heroDescription: 'Cree fichas de rompecabezas de piezas faltantes gratis con este generador en línea. Elija entre 6 formas de pieza, configure de 1 a 5 huecos con 2 a 6 opciones de solución incluyendo distractoras, y exporte fichas con clave de respuestas autogenerada. Navegue 104 colecciones temáticas con más de 3.100 ilustraciones o suba sus propias imágenes. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación — empiece ahora. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de piezas faltantes gratis en 8 pasos',
  },
  {
    file: 'shadow-match.ts',
    primaryKeyword: 'generador de fichas de sombras gratis',
    secondaryKeywords: [
      'fichas de sombras gratis sin registro',
      'generador de discriminación visual de sombras en línea',
      'crear fichas de emparejar sombras gratis para imprimir',
      'fichas de sombras gratis con respuestas PDF',
    ],
    lsiKeywords: [
      'actividad de siluetas y contornos ficha imprimible',
      'discriminación visual emparejar sombras preescolar',
      'fichas de reconocimiento de formas sombras PDF gratis',
    ],
    titleTag: 'Fichas de sombras gratis en línea | LCS',
    metaDescription: 'Cree fichas de emparejar sombras gratis sin registro. Siluetas automáticas, 104 temas, clave de respuestas incluida. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de emparejar sombras gratis en línea',
    heroDescription: 'Cree fichas de discriminación visual de sombras gratis con este generador en línea. El sistema genera siluetas automáticas a partir de más de 3.100 ilustraciones en 104 colecciones temáticas. Configure el número de imágenes y opciones de respuesta, y exporte fichas con clave de respuestas autogenerada. Ideal para actividades de reconocimiento de formas y percepción visual. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de emparejar sombras gratis en 8 pasos',
  },
  {
    file: 'picture-path.ts',
    primaryKeyword: 'generador de laberintos ilustrados gratis',
    secondaryKeywords: [
      'fichas de laberintos con imágenes gratis sin registro',
      'generador de caminos ilustrados en línea gratis',
      'crear laberintos ilustrados gratis para imprimir',
      'laberintos con imágenes gratis PDF con respuestas',
    ],
    lsiKeywords: [
      'actividad de seguir el camino con ilustraciones',
      'ficha de recorrido visual laberinto imprimible',
      'laberinto de imágenes motricidad fina preescolar',
    ],
    titleTag: 'Laberintos ilustrados gratis | LCS',
    metaDescription: 'Cree laberintos ilustrados gratis sin registro. Caminos con imágenes temáticas, 104 colecciones, clave de respuestas incluida. Pase a licencia comercial para vender.',
    heroTitle: 'Cree laberintos ilustrados gratis en línea',
    heroDescription: 'Cree fichas de laberintos ilustrados gratis con este generador en línea. Diseñe caminos visuales donde los usuarios siguen secuencias de imágenes a través de cuadrículas temáticas. Navegue 104 colecciones con más de 3.100 ilustraciones o suba sus propias imágenes. Configure la dificultad, el tamaño de cuadrícula y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación — empiece ahora. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear laberintos ilustrados gratis en 8 pasos',
  },
  {
    file: 'picture-sort.ts',
    primaryKeyword: 'generador de fichas de clasificación gratis',
    secondaryKeywords: [
      'fichas de clasificación de imágenes gratis sin registro',
      'generador de fichas de ordenar y clasificar en línea',
      'crear fichas de clasificación gratis para imprimir',
      'fichas de clasificación visual gratis PDF con respuestas',
    ],
    lsiKeywords: [
      'actividad de categorización de imágenes ficha imprimible',
      'ficha de agrupar objetos por categoría preescolar',
      'clasificación visual por tamaño y tipo PDF gratis',
    ],
    titleTag: 'Fichas de clasificación gratis | LCS',
    metaDescription: 'Cree fichas de clasificación de imágenes gratis sin registro. Ordene por categoría, tamaño o tipo. 104 temas, respuestas incluidas. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de clasificación de imágenes gratis',
    heroDescription: 'Cree fichas de clasificación visual gratis con este generador en línea. Los usuarios ordenan imágenes en categorías según criterios configurables. Navegue 104 colecciones temáticas con más de 3.100 ilustraciones o suba sus propias imágenes. Configure el número de categorías, imágenes por grupo y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de clasificación gratis en 8 pasos',
  },
  {
    file: 'prepositions.ts',
    primaryKeyword: 'generador de fichas de preposiciones gratis',
    secondaryKeywords: [
      'fichas de preposiciones gratis sin registro',
      'generador de fichas de preposiciones en línea',
      'crear fichas de preposiciones gratis para imprimir',
      'fichas de preposiciones visuales gratis PDF con respuestas',
    ],
    lsiKeywords: [
      'actividad de preposiciones de lugar con imágenes',
      'ficha de arriba abajo dentro fuera imprimible',
      'preposiciones espaciales con ilustraciones PDF gratis',
    ],
    titleTag: 'Fichas de preposiciones gratis | LCS',
    metaDescription: 'Cree fichas de preposiciones gratis sin registro. Ilustraciones de arriba, abajo, dentro, fuera. 104 temas, respuestas incluidas. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de preposiciones gratis en línea',
    heroDescription: 'Cree fichas de preposiciones visuales gratis con este generador en línea. Genere actividades donde los usuarios identifican posiciones espaciales — arriba, abajo, dentro, fuera, al lado, detrás — usando ilustraciones temáticas. Navegue 104 colecciones con más de 3.100 imágenes o suba las suyas. Configure preposiciones, número de ejercicios y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de preposiciones gratis en 8 pasos',
  },
  {
    file: 'coloring.ts',
    primaryKeyword: 'generador de dibujos para colorear gratis',
    secondaryKeywords: [
      'dibujos para colorear gratis sin registro',
      'generador de páginas para colorear en línea gratis',
      'crear dibujos para colorear gratis para imprimir',
      'páginas para colorear gratis PDF escala de grises',
    ],
    lsiKeywords: [
      'lienzo libre para crear páginas de colorear imprimibles',
      'dibujos para colorear con imágenes temáticas gratis',
      'exportar dibujos para colorear en escala de grises PDF',
    ],
    titleTag: 'Dibujos para colorear gratis | LCS',
    metaDescription: 'Cree dibujos para colorear gratis sin registro. Lienzo libre, 3.100+ ilustraciones, 104 temas, exportación en escala de grises. Pase a licencia comercial para vender.',
    heroTitle: 'Cree dibujos para colorear gratis en línea',
    heroDescription: 'Cree páginas para colorear profesionales gratis con este generador de lienzo libre en línea. Coloque imágenes donde quiera sin plantillas ni restricciones. Explore 104 colecciones temáticas con más de 3.100 ilustraciones, dibuje a mano alzada y añada asistentes de mercado con un clic. Active la exportación en escala de grises para páginas con ahorro de tinta. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear dibujos para colorear gratis en 8 pasos',
  },
  {
    file: 'draw-and-color.ts',
    primaryKeyword: 'crear fichas de dibujo y colorear gratis',
    secondaryKeywords: [
      'fichas de dibujo y colorear gratis sin registro',
      'generador de fichas de dibujo guiado en línea gratis',
      'crear fichas de dibujo en cuadrícula gratis para imprimir',
      'fichas de dibujo y colorear gratis PDF con modelo',
    ],
    lsiKeywords: [
      'actividad de dibujo paso a paso con cuadrícula',
      'ficha de copiar y colorear modelo imprimible',
      'dibujo guiado con cuadrícula motricidad fina gratis',
    ],
    titleTag: 'Fichas de dibujo y colorear gratis | LCS',
    metaDescription: 'Cree fichas de dibujo y colorear gratis sin registro. Cuadrícula guiada, modelo para copiar, 104 temas. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de dibujo y colorear gratis en línea',
    heroDescription: 'Cree fichas de dibujo en cuadrícula gratis con este generador en línea. Los usuarios copian un modelo ilustrado en una cuadrícula vacía y luego colorean el resultado. Navegue 104 colecciones temáticas con más de 3.100 ilustraciones o suba sus propias imágenes. Configure el tamaño de cuadrícula, nivel de dificultad y exporte fichas listas para imprimir. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de dibujo y colorear gratis en 8 pasos',
  },
  {
    file: 'alphabet-train.ts',
    primaryKeyword: 'generador de fichas de abecedario gratis',
    secondaryKeywords: [
      'fichas de abecedario gratis sin registro',
      'generador de tren del abecedario en línea gratis',
      'crear fichas de letras gratis para imprimir',
      'fichas de abecedario con imágenes gratis PDF',
    ],
    lsiKeywords: [
      'tren de letras actividad de alfabetización preescolar',
      'ficha de reconocimiento de letras con ilustraciones',
      'abecedario ilustrado imprimible para niños gratis',
    ],
    titleTag: 'Fichas de abecedario gratis | LCS',
    metaDescription: 'Cree fichas de abecedario gratis sin registro. Tren de letras con ilustraciones temáticas, 104 colecciones, 11 idiomas. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de abecedario gratis en línea',
    heroDescription: 'Cree fichas de tren del abecedario gratis con este generador en línea. Cada vagón del tren muestra una letra con una ilustración temática correspondiente. Navegue 104 colecciones con más de 3.100 imágenes en 11 idiomas. Configure letras mayúsculas o minúsculas, seleccione el rango de letras y personalice colores y fuentes. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación — empiece ahora. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de abecedario gratis en 8 pasos',
  },
  {
    file: 'bingo.ts',
    primaryKeyword: 'generador de cartones de bingo gratis con imágenes',
    secondaryKeywords: [
      'cartones de bingo gratis sin registro',
      'generador de bingo con imágenes en línea gratis',
      'crear cartones de bingo gratis para imprimir',
      'bingo con ilustraciones gratis PDF para niños',
    ],
    lsiKeywords: [
      'cartones de bingo visual con imágenes temáticas',
      'generador de tarjetas de bingo aleatorias imprimibles',
      'bingo educativo con ilustraciones gratis PDF',
    ],
    titleTag: 'Cartones de bingo gratis con imágenes | LCS',
    metaDescription: 'Cree cartones de bingo con imágenes gratis sin registro. Cartones únicos aleatorios, 104 temas, tarjeta de llamada incluida. Pase a licencia comercial para vender.',
    heroTitle: 'Cree cartones de bingo con imágenes gratis en línea',
    heroDescription: 'Cree cartones de bingo con imágenes gratis con este generador en línea. Genere múltiples cartones únicos con distribución aleatoria de imágenes, más una tarjeta de llamada para el organizador. Navegue 104 colecciones temáticas con más de 3.100 ilustraciones o suba sus propias imágenes. Configure el tamaño de cuadrícula, casilla libre central y personalice colores y fuentes. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear cartones de bingo con imágenes gratis en 8 pasos',
  },
  {
    file: 'pattern-train.ts',
    primaryKeyword: 'generador de fichas de patrones gratis',
    secondaryKeywords: [
      'fichas de patrones gratis sin registro',
      'generador de tren de patrones en línea gratis',
      'crear fichas de secuencias gratis para imprimir',
      'fichas de patrones con imágenes gratis PDF',
    ],
    lsiKeywords: [
      'tren de patrones actividad de secuencias visuales',
      'ficha de completar el patrón con ilustraciones',
      'reconocimiento de patrones preescolar imprimible gratis',
    ],
    titleTag: 'Fichas de patrones gratis en línea | LCS',
    metaDescription: 'Cree fichas de patrones en tren gratis sin registro. Secuencias visuales con imágenes temáticas, 104 colecciones, respuestas incluidas. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de patrones en tren gratis en línea',
    heroDescription: 'Cree fichas de tren de patrones gratis con este generador en línea. Los vagones del tren muestran secuencias de imágenes que los usuarios deben completar identificando el patrón. Navegue 104 colecciones temáticas con más de 3.100 ilustraciones o suba sus propias imágenes. Configure la longitud de la secuencia, dificultad del patrón y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de patrones en tren gratis en 8 pasos',
  },
  {
    file: 'pattern-worksheet.ts',
    primaryKeyword: 'fichas de reconocimiento de patrones gratis',
    secondaryKeywords: [
      'fichas de patrones gratis sin registro',
      'generador de fichas de patrones en línea gratis',
      'crear fichas de reconocimiento de patrones para imprimir',
      'fichas de completar patrones gratis PDF con respuestas',
    ],
    lsiKeywords: [
      'actividad de secuencias lógicas con imágenes imprimible',
      'ficha de continuar el patrón visual preescolar',
      'reconocimiento de patrones con ilustraciones PDF gratis',
    ],
    titleTag: 'Reconocimiento de patrones gratis | LCS',
    metaDescription: 'Cree fichas de reconocimiento de patrones gratis sin registro. Secuencias visuales configurables, 104 temas, respuestas incluidas. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de reconocimiento de patrones gratis',
    heroDescription: 'Cree fichas de reconocimiento de patrones gratis con este generador en línea. Los usuarios identifican y completan secuencias visuales con imágenes temáticas. Navegue 104 colecciones con más de 3.100 ilustraciones o suba sus propias imágenes. Configure la complejidad del patrón, número de ejercicios por ficha y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de reconocimiento de patrones gratis en 8 pasos',
  },
  {
    file: 'treasure-hunt.ts',
    primaryKeyword: 'generador de búsqueda del tesoro gratis',
    secondaryKeywords: [
      'fichas de búsqueda del tesoro gratis sin registro',
      'generador de búsqueda del tesoro en línea gratis',
      'crear fichas de búsqueda del tesoro gratis para imprimir',
      'búsqueda del tesoro con imágenes gratis PDF',
    ],
    lsiKeywords: [
      'actividad de buscar y encontrar objetos imprimible',
      'ficha de búsqueda visual de imágenes escondidas',
      'búsqueda del tesoro con ilustraciones temáticas PDF gratis',
    ],
    titleTag: 'Búsqueda del tesoro gratis | LCS',
    metaDescription: 'Cree fichas de búsqueda del tesoro gratis sin registro. Busque imágenes escondidas en escenas temáticas, 104 colecciones, respuestas incluidas. Pase a licencia comercial.',
    heroTitle: 'Cree fichas de búsqueda del tesoro gratis en línea',
    heroDescription: 'Cree fichas de búsqueda del tesoro gratis con este generador en línea. Los usuarios buscan imágenes específicas escondidas en escenas llenas de ilustraciones temáticas. Navegue 104 colecciones con más de 3.100 imágenes o suba las suyas. Configure el número de objetos a encontrar, la densidad de la escena y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua. Sin registro, sin instalación — empiece ahora. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de búsqueda del tesoro gratis en 8 pasos',
  },
  {
    file: 'sudoku.ts',
    primaryKeyword: 'generador de sudoku con imágenes gratis para niños',
    secondaryKeywords: [
      'sudoku con imágenes gratis sin registro',
      'generador de sudoku visual en línea gratis para niños',
      'crear sudoku con ilustraciones gratis para imprimir',
      'sudoku con imágenes gratis PDF con solución',
    ],
    lsiKeywords: [
      'sudoku 4x4 con ilustraciones para preescolar',
      'puzzle de lógica visual con imágenes para niños',
      'sudoku con dibujos imprimible gratis PDF',
    ],
    titleTag: 'Sudoku con imágenes gratis niños | LCS',
    metaDescription: 'Cree sudoku con imágenes gratis para niños sin registro. Cuadrículas 4x4 con ilustraciones, 104 temas, solución incluida. Pase a licencia comercial para vender.',
    heroTitle: 'Cree sudoku con imágenes gratis para niños',
    heroDescription: 'Cree sudoku con imágenes gratis para niños con este generador en línea. Genere cuadrículas 4x4 donde los usuarios colocan ilustraciones temáticas en lugar de números, ideal para introducir la lógica del sudoku a los más pequeños. Navegue 104 colecciones con más de 3.100 imágenes o suba las suyas. Configure la dificultad ajustando las casillas vacías y exporte con solución autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear sudoku con imágenes gratis en 8 pasos',
  },
  {
    file: 'big-small.ts',
    primaryKeyword: 'fichas de comparación de tamaños gratis',
    secondaryKeywords: [
      'fichas de grande y pequeño gratis sin registro',
      'generador de fichas de comparación de tamaños en línea',
      'crear fichas de grande y pequeño gratis para imprimir',
      'fichas de comparación de tamaños gratis PDF con respuestas',
    ],
    lsiKeywords: [
      'actividad de grande y pequeño con imágenes preescolar',
      'ficha de comparar tamaños con ilustraciones imprimible',
      'conceptos de tamaño grande mediano pequeño PDF gratis',
    ],
    titleTag: 'Comparación de tamaños gratis | LCS',
    metaDescription: 'Cree fichas de comparación de tamaños gratis sin registro. Grande, mediano, pequeño con ilustraciones, 104 temas, respuestas incluidas. Pase a licencia comercial.',
    heroTitle: 'Cree fichas de comparación de tamaños gratis',
    heroDescription: 'Cree fichas de comparación de tamaños gratis con este generador en línea. Los usuarios identifican cuál es más grande, más pequeño o del mismo tamaño entre ilustraciones temáticas. Navegue 104 colecciones con más de 3.100 imágenes o suba las suyas. Configure los niveles de comparación, número de ejercicios por ficha y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de comparación de tamaños gratis en 8 pasos',
  },
  {
    file: 'more-less.ts',
    primaryKeyword: 'fichas de mayor y menor gratis',
    secondaryKeywords: [
      'fichas de mayor y menor gratis sin registro',
      'generador de fichas de mayor que menor que en línea',
      'crear fichas de mayor y menor gratis para imprimir',
      'fichas de comparar cantidades gratis PDF con respuestas',
    ],
    lsiKeywords: [
      'actividad de mayor que menor que con imágenes',
      'ficha de comparar cantidades preescolar imprimible',
      'conceptos de más y menos con ilustraciones PDF gratis',
    ],
    titleTag: 'Mayor y menor gratis en línea | LCS',
    metaDescription: 'Cree fichas de mayor y menor gratis sin registro. Compare cantidades con ilustraciones temáticas, 104 colecciones, respuestas incluidas. Pase a licencia comercial.',
    heroTitle: 'Cree fichas de mayor y menor gratis en línea',
    heroDescription: 'Cree fichas de mayor y menor gratis con este generador en línea. Los usuarios comparan cantidades de imágenes temáticas e identifican cuál grupo tiene más o menos elementos. Navegue 104 colecciones con más de 3.100 ilustraciones o suba las suyas. Configure el rango de cantidades, número de ejercicios por ficha y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de mayor y menor gratis en 8 pasos',
  },
  {
    file: 'odd-one-out.ts',
    primaryKeyword: 'generador de encuentra el intruso gratis',
    secondaryKeywords: [
      'fichas de encuentra el intruso gratis sin registro',
      'generador de el intruso en línea gratis',
      'crear fichas de encuentra el intruso gratis para imprimir',
      'fichas del intruso gratis PDF con respuestas',
    ],
    lsiKeywords: [
      'actividad de clasificación y exclusión con imágenes',
      'ficha de cuál no pertenece con ilustraciones',
      'encuentra el intruso discriminación visual PDF gratis',
    ],
    titleTag: 'Encuentra el intruso gratis | LCS',
    metaDescription: 'Cree fichas de encuentra el intruso gratis sin registro. Identifique la imagen diferente, 104 temas, respuestas incluidas. Pase a licencia comercial para vender.',
    heroTitle: 'Cree fichas de encuentra el intruso gratis en línea',
    heroDescription: 'Cree fichas de encuentra el intruso gratis con este generador en línea. Los usuarios identifican cuál imagen no pertenece al grupo entre ilustraciones temáticas. Navegue 104 colecciones con más de 3.100 imágenes o suba las suyas. Configure el número de opciones por ejercicio, la dificultad y exporte con clave de respuestas autogenerada. Exporte en JPEG y PDF a 300 DPI en tamaño Carta, A4 o personalizado. La prueba gratis incluye todas las funciones con marca de agua en las descargas. Sin registro, sin instalación. ¿Quiere vender? Pase a la licencia comercial para eliminar la marca de agua y obtener uso comercial completo.',
    tutorialTitle: 'Cómo crear fichas de encuentra el intruso gratis en 8 pasos',
  },
];

let totalUpdated = 0;

for (const u of updates) {
  const filePath = path.join(BASE, u.file);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING: ${u.file}`);
    continue;
  }

  console.log(`Updating ${u.file}...`);
  let content = fs.readFileSync(filePath, 'utf8');

  // SEO fields
  content = replaceField(content, 'primaryKeyword', u.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', u.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', u.lsiKeywords);
  content = replaceField(content, 'titleTag', u.titleTag);
  content = replaceField(content, 'metaDescription', u.metaDescription);

  // Hero fields
  content = replaceHeroTitle(content, u.heroTitle);
  content = replaceHeroDescription(content, u.heroDescription);

  // Tutorial title
  content = replaceSectionTitle(content, 'tutorial', u.tutorialTitle);

  // Replace Gumroad with Hotmart
  content = content.replace(/Gumroad/g, 'Hotmart');

  fs.writeFileSync(filePath, content, 'utf8');
  totalUpdated++;
  console.log(`  OK — ${u.file} updated`);
}

console.log(`\nDone! Updated ${totalUpdated}/${updates.length} files.`);
