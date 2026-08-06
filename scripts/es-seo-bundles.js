/**
 * ES SEO: Bundle Content (6 files)
 * Updates SEO fields, hero title/tagline/description for Spanish bundle pages.
 * Replaces Gumroad -> Hotmart throughout.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'es');

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

function replaceHeroTitle(content, newTitle) {
  const re = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newTitle)}'`);
  }
  console.warn('  WARNING: Could not replace hero title');
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
// BUNDLE DATA
// ============================================================
const bundles = [
  {
    file: 'math-bundle.ts',
    seo: {
      primaryKeyword: 'paquete de generadores de mates para vendedores Etsy',
      secondaryKeywords: [
        'paquete fichas de matemáticas licencia comercial Etsy',
        'generadores de mates para Amazon KDP vendedores',
        'kit completo fichas de sumas y restas para vender',
        'herramientas de mates para negocio de imprimibles',
      ],
      lsiKeywords: [
        'ahorro paquete versus compra individual generadores',
        'variedad catálogo productos matemáticos Etsy KDP',
        'licencia comercial incluida múltiples plataformas venta',
      ],
      titleTag: 'Paquete de mates para vendedores Etsy | LCS',
      metaDescription: 'Paquete de 6 generadores de mates para vender en Etsy y KDP. Suma, resta, puzzles y álgebra con licencia comercial. Ahorre frente a la compra individual.',
    },
    hero: {
      title: 'Paquete de generadores de mates para vendedores Etsy y KDP',
      tagline: 'Seis generadores de fichas de matemáticas en un solo paquete con descuento — licencia comercial incluida.',
      description: 'Ahorre significativamente frente a la compra individual con este paquete de seis generadores de fichas de matemáticas diseñado para vendedores de Etsy, Amazon KDP y Hotmart. Incluye suma, resta, puzzles criptaritméticos, comparación mayor-menor, puzzles de cuadrícula con imágenes y ecuaciones algebraicas visuales — cada habilidad matemática básica que los compradores buscan activamente. Exporte PDFs listos para imprimir a 300 DPI con solucionarios automáticos y véndolos en cualquier plataforma con la licencia comercial incluida. Cinco de los seis generadores producen fichas puramente visuales que funcionan en cualquier idioma — un solo diseño se vende a compradores de todo el mundo sin traducción. Combine más de 100 conjuntos de imágenes temáticas con los seis generadores para crear docenas de productos únicos desde una sola inversión. El mercado hispano de materiales educativos es un océano azul con demanda creciente y competencia mínima. Pruebe gratis con marca de agua — sin registro, sin tarjeta de crédito.',
    },
  },
  {
    file: 'literacy-bundle.ts',
    seo: {
      primaryKeyword: 'paquete de juegos de palabras Etsy KDP',
      secondaryKeywords: [
        'paquete generadores fichas de lectoescritura comercial',
        'kit sopas de letras y criptogramas para vender',
        'fichas de abecedario multilingües licencia comercial',
        'herramientas de lenguaje para tienda de imprimibles',
      ],
      lsiKeywords: [
        'multiplicar catálogo 11 idiomas un solo paquete',
        'ahorro paquete versus individual fichas lectura',
        'variedad productos lectoescritura múltiples plataformas',
      ],
      titleTag: 'Paquete juegos de palabras — Vender | LCS',
      metaDescription: 'Paquete de 7 generadores de fichas de lectoescritura para Etsy y KDP. Sopas de letras, criptogramas, abecedario en 11 idiomas. Licencia comercial.',
    },
    hero: {
      title: 'Paquete de juegos de palabras para vender en Etsy, KDP y Hotmart',
      tagline: 'Siete generadores de fichas de lectoescritura con soporte multilingüe — multiplique su catálogo en 11 idiomas.',
      description: 'Consiga siete generadores de fichas de lectoescritura por una fracción del precio individual y multiplique su línea de productos en 11 idiomas desde el primer día. Este paquete incluye abecedario, preposiciones, adivinanza de palabras, letras revueltas, sopas de letras, criptogramas y práctica de escritura — cada tipo de ficha de lectura que los compradores buscan en Etsy. Seis de los siete generadores producen contenido específico del idioma con signos diacríticos correctos y vocabulario nativo, lo que significa que un solo diseño se convierte en 11 productos distintos cuando cambia de idioma. Exporte PDFs a 300 DPI con solucionarios automáticos y venda con la licencia comercial incluida en Etsy, Amazon KDP o Hotmart. Combine más de 100 conjuntos de imágenes temáticas para crear cientos de variaciones únicas sin repetir productos. Este paquete le da la variedad y el alcance lingüístico que los vendedores monolingües no pueden igualar. Pruebe gratis con marca de agua — sin registro.',
    },
  },
  {
    file: 'visual-bundle.ts',
    seo: {
      primaryKeyword: 'paquete de fichas visuales para vendedores',
      secondaryKeywords: [
        'paquete generadores fichas de colorear para Etsy',
        'kit fichas de dibujo y actividades visuales KDP',
        'fichas de búsqueda de objetos licencia comercial',
        'herramientas visuales para negocio de imprimibles',
      ],
      lsiKeywords: [
        'ahorro paquete fichas visuales compra individual',
        'productos creativos colorear dibujar buscar objetos',
        'licencia comercial fichas visuales múltiples plataformas',
      ],
      titleTag: 'Paquete fichas visuales para vendedores | LCS',
      metaDescription: 'Paquete de 5 generadores de fichas visuales para vender en Etsy y KDP. Colorear, dibujar, buscar objetos y contar. Licencia comercial incluida.',
    },
    hero: {
      title: 'Paquete de fichas visuales para vendedores de Etsy y KDP',
      tagline: 'Cinco generadores de actividades visuales en un paquete con descuento — colorear, dibujar y buscar.',
      description: 'Ahorre frente a la compra individual y lance una línea completa de productos visuales con cinco generadores en un solo paquete. Incluye fichas de colorear, dibujo guiado, búsqueda de objetos ocultos, busca y cuenta, y trazado de caminos — las categorías visuales más demandadas en Etsy y Amazon KDP. Cada generador produce archivos PDF listos para imprimir a 300 DPI con la licencia comercial incluida para vender sin restricciones en cualquier plataforma. Las fichas visuales son universales: no contienen texto, así que un solo producto se vende a compradores de cualquier país sin traducción. Combine más de 100 conjuntos de imágenes temáticas con los cinco generadores para crear cientos de listados únicos que capturen diferentes búsquedas y nichos de mercado. Los productos visuales tienen la ventaja de atraer a un público amplio — desde padres hasta educadores — y se venden todo el año con picos en temporadas escolares. Pruebe gratis con marca de agua — sin registro, sin tarjeta de crédito.',
    },
  },
  {
    file: 'matching-bundle.ts',
    seo: {
      primaryKeyword: 'paquete de asociación y clasificación Etsy',
      secondaryKeywords: [
        'paquete generadores fichas de emparejar para vender',
        'kit fichas de clasificación y sombras KDP',
        'fichas de asociar tamaños licencia comercial',
        'herramientas de lógica visual para tienda imprimibles',
      ],
      lsiKeywords: [
        'ahorro paquete asociación versus compra individual',
        'variedad fichas emparejar clasificar ordenar Etsy',
        'licencia comercial fichas lógica múltiples plataformas',
      ],
      titleTag: 'Paquete asociación y clasificación | LCS',
      metaDescription: 'Paquete de 5 generadores de fichas de asociación y clasificación para Etsy y KDP. Emparejar, sombras, tamaños y ordenar. Licencia comercial incluida.',
    },
    hero: {
      title: 'Paquete de fichas de asociación y clasificación para Etsy y KDP',
      tagline: 'Cinco generadores de fichas de emparejar y ordenar en un solo paquete con descuento — licencia comercial incluida.',
      description: 'Construya una línea completa de productos de lógica visual con cinco generadores de fichas de asociación y clasificación por una fracción del precio individual. Este paquete incluye emparejamiento clásico, sombras, comparación de tamaños, clasificación por categorías y fichas de cuadrícula — los tipos de actividades de lógica temprana más buscados en Etsy y Amazon KDP. Cada generador produce PDFs listos para imprimir a 300 DPI con solucionarios automáticos y la licencia comercial incluida para vender en cualquier plataforma sin restricciones. Todas las fichas son puramente visuales — sin texto en la página — lo que significa que cada producto se vende a compradores de cualquier país sin necesidad de traducción. Combine más de 100 conjuntos de imágenes temáticas con los cinco generadores para crear cientos de productos únicos que cubran diferentes nichos y temporadas. Las fichas de asociación son un básico de preescolar y primaria que se vende de forma consistente todo el año. Pruebe gratis con marca de agua — sin registro.',
    },
  },
  {
    file: 'puzzle-bundle.ts',
    seo: {
      primaryKeyword: 'paquete de rompecabezas lógicos para KDP',
      secondaryKeywords: [
        'paquete generadores puzzles imprimibles para vender',
        'kit fichas de sudoku y laberintos Etsy',
        'fichas de lógica y puzzles licencia comercial',
        'herramientas de rompecabezas para libros KDP',
      ],
      lsiKeywords: [
        'ahorro paquete puzzles versus compra individual',
        'variedad libros puzzles sudoku laberintos KDP',
        'licencia comercial rompecabezas múltiples plataformas',
      ],
      titleTag: 'Paquete rompecabezas para libros KDP | LCS',
      metaDescription: 'Paquete de 5 generadores de rompecabezas para publicar en KDP y vender en Etsy. Sudoku, laberintos, intrusos y patrones. Licencia comercial incluida.',
    },
    hero: {
      title: 'Paquete de rompecabezas lógicos para libros KDP y tiendas Etsy',
      tagline: 'Cinco generadores de puzzles en un paquete con descuento — ideal para publicar libros de actividades en KDP.',
      description: 'Publique libros de rompecabezas en Amazon KDP y cree listados de puzzles en Etsy con cinco generadores en un solo paquete a precio reducido. Incluye sudoku con imágenes, laberintos temáticos, búsqueda del intruso, piezas faltantes y patrones lógicos — los tipos de puzzles más populares en el mercado de libros de actividades. Cada generador produce PDFs listos para imprimir a 300 DPI con solucionarios automáticos, perfectos para compilar cuadernos de 50 a 100 páginas y subirlos directamente a KDP. La licencia comercial está incluida para vender sin restricciones en cualquier plataforma. Todas las fichas son puramente visuales — funcionan en cualquier idioma sin traducción — lo que le permite vender el mismo libro de puzzles en mercados KDP de todo el mundo. Combine más de 100 conjuntos de imágenes temáticas para crear libros de rompecabezas por temporada, por tema o por nivel de dificultad, multiplicando su catálogo desde una sola inversión. Pruebe gratis con marca de agua — sin registro, sin tarjeta de crédito.',
    },
  },
  {
    file: 'search-bundle.ts',
    seo: {
      primaryKeyword: 'paquete busca y encuentra para vendedores',
      secondaryKeywords: [
        'paquete generadores fichas de búsqueda para Etsy',
        'kit sopas de letras y busca objetos KDP',
        'fichas de búsqueda visual licencia comercial',
        'herramientas busca y encuentra negocio imprimibles',
      ],
      lsiKeywords: [
        'ahorro paquete búsqueda versus compra individual',
        'variedad fichas buscar encontrar contar Etsy KDP',
        'licencia comercial fichas búsqueda múltiples plataformas',
      ],
      titleTag: 'Paquete busca y encuentra | LCS',
      metaDescription: 'Paquete de generadores de fichas de búsqueda para vender en Etsy y KDP. Sopas de letras, busca objetos y crucigramas. Licencia comercial incluida.',
    },
    hero: {
      title: 'Paquete de fichas busca y encuentra para vendedores Etsy y KDP',
      tagline: 'Generadores de fichas de búsqueda en un solo paquete con descuento — sopas de letras, crucigramas y más.',
      description: 'Lance una línea completa de productos de búsqueda y descubrimiento con este paquete de generadores a precio reducido frente a la compra individual. Incluye sopas de letras, crucigramas, búsqueda de objetos ocultos y variantes de busca y encuentra — las categorías de fichas de búsqueda más demandadas en Etsy y Amazon KDP. Cada generador produce PDFs listos para imprimir a 300 DPI con solucionarios automáticos y la licencia comercial incluida para vender sin restricciones. Los generadores de palabras soportan 11 idiomas con vocabulario nativo y signos diacríticos correctos, lo que le permite crear productos en español, inglés, francés, alemán y más desde el mismo paquete. Combine más de 100 conjuntos de imágenes temáticas para crear cientos de listados únicos por temporada, tema o nivel de dificultad. Las fichas de búsqueda tienen demanda constante todo el año y atraen tanto a padres como a educadores, generando ventas recurrentes en su tienda. Pruebe gratis con marca de agua — sin registro.',
    },
  },
];

// ============================================================
// APPLY UPDATES
// ============================================================
let totalUpdated = 0;

for (const bundle of bundles) {
  const filePath = path.join(BASE, bundle.file);
  console.log(`\nProcessing: ${bundle.file}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ERROR: File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update SEO fields
  content = replaceField(content, 'primaryKeyword', bundle.seo.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', bundle.seo.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', bundle.seo.lsiKeywords);
  content = replaceField(content, 'titleTag', bundle.seo.titleTag);

  // metaDescription
  const mdRe = /(metaDescription:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (mdRe.test(content)) {
    content = content.replace(mdRe, `$1'${esc(bundle.seo.metaDescription)}'`);
  }

  // Update hero fields
  content = replaceHeroTitle(content, bundle.hero.title);
  content = replaceField(content, 'tagline', bundle.hero.tagline);
  content = replaceHeroDescription(content, bundle.hero.description);

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

  // Hero title length check
  const heroTitleMatch = content.match(/hero:\s*\{[\s\S]*?title:\s*'([^']*)'/);
  if (heroTitleMatch && heroTitleMatch[1].length > 70) {
    console.warn(`  WARNING: hero.title is ${heroTitleMatch[1].length} chars (max 70): "${heroTitleMatch[1]}"`);
  } else if (heroTitleMatch) {
    console.log(`  hero.title: ${heroTitleMatch[1].length} chars OK`);
  }

  // Check for unicode escapes
  if (/\\u[0-9a-fA-F]{4}/.test(content)) {
    console.warn('  WARNING: Found \\uXXXX unicode escapes!');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated ${bundle.file}`);
  totalUpdated++;
}

console.log(`\n=== Done: ${totalUpdated} of ${bundles.length} files updated ===`);
