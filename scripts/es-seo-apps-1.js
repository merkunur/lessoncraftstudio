/**
 * ES SEO Part 1: Apps 1-2 (Addition + Subtraction)
 * Applies the full SEO strategy from spanish-complete-seo-prompt.md
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'es');

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function replaceField(content, fieldName, newValue) {
  // Match field: 'value' or field: "value"
  const re = new RegExp(`(${fieldName}:\\s*)(['"])(?:[^'\"\\\\]|\\\\.)*\\2`);
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newValue)}'`);
  }
  // Try multiline with template or continuation
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
  // The hero description is typically a long string after description: inside hero block
  // Match description: followed by a string (single or double quoted, possibly multiline via \n)
  const re = /(hero:\s*\{[\s\S]*?description:\s*\n?\s*)(['"])([\s\S]*?)\2(,?\s*\n\s*\})/;
  if (re.test(content)) {
    return content.replace(re, `$1'${esc(newDesc)}'$4`);
  }
  // Simpler: just find description: inside hero block
  // Look for the pattern after tagline
  const re2 = /(tagline:[\s\S]*?description:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (re2.test(content)) {
    return content.replace(re2, `$1'${esc(newDesc)}'`);
  }
  console.warn('  WARNING: Could not replace hero description');
  return content;
}

// ============================================================
// APP 1: ADDITION
// ============================================================
const apps = [
  {
    file: 'addition.ts',
    seo: {
      primaryKeyword: 'crear fichas de sumas para vender en Etsy',
      secondaryKeywords: [
        'generador de fichas de sumas para vendedores de Etsy',
        'fichas de matemáticas para Amazon KDP',
        'ejercicios de suma imprimibles con licencia comercial',
        'crear cuadernillos de sumas para vender online',
        'fichas de cálculo para negocio de imprimibles',
      ],
      lsiKeywords: [
        'licencia comercial 300 DPI listo para imprimir',
        'ingreso pasivo fichas educativas Etsy KDP Hotmart',
        'mercado hispano 500 millones hispanohablantes imprimibles',
      ],
      titleTag: 'Crear fichas de sumas para vender en Etsy | LessonCraftStudio',
      metaDescription: 'Cree fichas de sumas profesionales para vender en Etsy, KDP y Hotmart. Licencia comercial incluida. Pruebe gratis con marca de agua — sin registro.',
    },
    hero: {
      title: 'Cree y venda fichas de sumas profesionales en Etsy, KDP y Hotmart',
      tagline: 'Genere fichas de sumas con imágenes temáticas en menos de 3 minutos — listas para vender.',
      description: 'Cree fichas de sumas para vender en Etsy, Amazon KDP o Hotmart — y genérelas en menos de 3 minutos. Este generador crea ejercicios de suma con imágenes temáticas de más de 3.000 ilustraciones que atraen a los niños y convencen a los padres compradores. Exporte PDFs listos para imprimir a 300 DPI con hojas de respuestas automáticas y véndalos con la licencia comercial incluida — sin atribución requerida, sin restricciones. El mercado hispano de materiales educativos en Etsy es un océano azul: más de 500 millones de hispanohablantes buscan fichas en español, pero hay muy pocos vendedores que las ofrezcan. Esta es su oportunidad de capturar un mercado enorme con demanda creciente y competencia mínima — desde España hasta México, Estados Unidos y toda Latinoamérica. Pruebe gratis con todas las funciones — sin registro, sin tarjeta de crédito. Las descargas incluyen una marca de agua; compre una licencia para eliminarla.',
    },
    sectionHeadings: {
      howItWorks: 'Cómo crear fichas de sumas en menos de 3 minutos',
      keyFeatures: 'Por qué las fichas de matemáticas se venden todo el año en Etsy',
      businessUseCases: 'Exportar y vender en Etsy, KDP, Hotmart y más',
    },
  },
  // ============================================================
  // APP 2: SUBTRACTION
  // ============================================================
  {
    file: 'subtraction.ts',
    seo: {
      primaryKeyword: 'generador de fichas de restas para vender en Etsy',
      secondaryKeywords: [
        'crear fichas de sustracción para tienda Etsy',
        'fichas de restas para Amazon KDP',
        'ejercicios de resta ilustrados licencia comercial',
        'fichas de cálculo para vender en Hotmart',
      ],
      lsiKeywords: [
        'licencia comercial paquetes matemáticos PDF 300 DPI',
        'negocio imprimibles resta mercado hispano',
        'combinar sumas restas paquetes mayores ventas',
      ],
      titleTag: 'Fichas de restas — Vender en Etsy y KDP | LessonCraftStudio',
      metaDescription: 'Cree fichas de restas para vender en Etsy, KDP y Hotmart. Imágenes temáticas, solucionario, licencia comercial. Pruebe gratis con marca de agua.',
    },
    hero: {
      title: 'Genere fichas de restas para vender en Etsy, KDP y Hotmart',
      tagline: 'Convierta la resta en un producto vendible con fichas ilustradas y solucionario automático.',
      description: 'Convierta la resta en un producto vendible con un generador diseñado para emprendedores de imprimibles. Cree fichas de resta ilustradas con imágenes temáticas de más de 100 categorías — animales, vehículos, alimentos, naturaleza — que hacen las matemáticas atractivas y sus anuncios irresistibles. Cada ficha se exporta en PDF 300 DPI listo para imprimir con solucionario automático, lista para subir a Etsy, compilar en un cuadernillo de Amazon KDP, o vender en Hotmart. La licencia comercial está incluida con cada ficha. Estrategia rentable: combine sumas y restas en paquetes — los vendedores reportan ventas promedio significativamente más altas con paquetes matemáticos combinados. El mercado hispano ofrece un potencial enorme con competencia mínima. Pruebe gratis con todas las funciones — sin registro. Las descargas incluyen marca de agua; compre una licencia para eliminarla.',
    },
    sectionHeadings: {
      howItWorks: 'Crear fichas de resta profesionales paso a paso',
      keyFeatures: 'Por qué las fichas de restas son un básico para tiendas de imprimibles',
      businessUseCases: 'Exportar, fijar precios y vender en cualquier plataforma',
    },
  },
];

let totalUpdated = 0;

for (const app of apps) {
  const filePath = path.join(BASE, app.file);
  console.log(`\nProcessing: ${app.file}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ERROR: File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update SEO fields
  content = replaceField(content, 'primaryKeyword', app.seo.primaryKeyword);
  content = replaceArrayField(content, 'secondaryKeywords', app.seo.secondaryKeywords);
  content = replaceArrayField(content, 'lsiKeywords', app.seo.lsiKeywords);
  content = replaceField(content, 'titleTag', app.seo.titleTag);

  // metaDescription might be on next line after field name
  const mdRe = /(metaDescription:\s*\n?\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (mdRe.test(content)) {
    content = content.replace(mdRe, `$1'${esc(app.seo.metaDescription)}'`);
  }

  // Update hero fields
  // Hero title - first 'title' inside hero block
  const heroTitleRe = /(hero:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
  if (heroTitleRe.test(content)) {
    content = content.replace(heroTitleRe, `$1'${esc(app.hero.title)}'`);
  }

  // Tagline
  content = replaceField(content, 'tagline', app.hero.tagline);

  // Hero description - complex multiline
  content = replaceHeroDescription(content, app.hero.description);

  // Update section headings
  if (app.sectionHeadings.howItWorks) {
    const hiwRe = /(howItWorks:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
    if (hiwRe.test(content)) {
      content = content.replace(hiwRe, `$1'${esc(app.sectionHeadings.howItWorks)}'`);
    }
  }
  if (app.sectionHeadings.keyFeatures) {
    const kfRe = /(keyFeatures:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
    if (kfRe.test(content)) {
      content = content.replace(kfRe, `$1'${esc(app.sectionHeadings.keyFeatures)}'`);
    }
  }
  if (app.sectionHeadings.businessUseCases) {
    const bucRe = /(businessUseCases:\s*\{[\s\S]*?title:\s*)(['"])(?:[^'"\\]|\\.)*\2/;
    if (bucRe.test(content)) {
      content = content.replace(bucRe, `$1'${esc(app.sectionHeadings.businessUseCases)}'`);
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
    console.log(`  titleTag: ${titleMatch[1].length} chars ✓`);
  }

  const metaMatch = content.match(/metaDescription:\s*\n?\s*'([^']*)'/);
  if (metaMatch && metaMatch[1].length > 155) {
    console.warn(`  WARNING: metaDescription is ${metaMatch[1].length} chars (max 155): "${metaMatch[1]}"`);
  } else if (metaMatch) {
    console.log(`  metaDescription: ${metaMatch[1].length} chars ✓`);
  }

  // Check for unicode escapes
  if (/\\u[0-9a-fA-F]{4}/.test(content)) {
    console.warn('  WARNING: Found \\uXXXX unicode escapes!');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ Updated ${app.file}`);
  totalUpdated++;
}

console.log(`\n=== Done: ${totalUpdated} files updated ===`);
