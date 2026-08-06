/**
 * es-seo-index-pages.js
 * Updates Spanish SEO metadata in 6 index page.tsx files.
 * Uses targeted string replacements for safety.
 */

const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, '..', 'frontend', 'app', '[locale]');
let totalChanges = 0;
let totalWarnings = 0;

function safeReplace(content, oldStr, newStr, label) {
  if (!content.includes(oldStr)) {
    console.warn(`  WARNING: Could not find "${label}" — skipping`);
    totalWarnings++;
    return content;
  }
  const count = content.split(oldStr).length - 1;
  if (count > 1) {
    console.warn(`  WARNING: "${label}" found ${count} times — replacing first only`);
    totalWarnings++;
    return content.replace(oldStr, newStr);
  }
  totalChanges++;
  return content.replace(oldStr, newStr);
}

// ============================================================
// 1. apps/page.tsx — appsMetadata es: block + appsKeywords
// ============================================================
function updateAppsPage() {
  const filePath = path.join(frontendDir, 'apps', 'page.tsx');
  console.log(`\n=== Updating ${filePath} ===`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Title
  content = safeReplace(content,
    `    title: '33 Generadores de Imprimibles | Herramientas Etsy & KDP',`,
    `    title: '33 generadores de imprimibles \u2014 Venda en Etsy | LCS',`,
    'apps es title'
  );

  // Description
  content = safeReplace(content,
    `    description: 'Explora 33 generadores de imprimibles profesionales. Sopa de letras, fichas de matem\u00e1ticas, colorear, puzzles y m\u00e1s. Prueba gratis con marca de agua. Vende en Etsy y Amazon KDP.',`,
    `    description: 'Explore 33 generadores de imprimibles para crear y vender fichas en Etsy, KDP y Hotmart. Sopas de letras, matem\u00e1ticas, colorear, puzzles. Pruebe gratis con marca de agua.',`,
    'apps es description'
  );

  // Keywords
  content = safeReplace(content,
    `    keywords: 'generador imprimibles, Etsy imprimibles, KDP fichas, vender imprimibles online, generador sopa letras, creador fichas matem\u00e1ticas, generador colorear, negocio imprimibles',`,
    `    keywords: 'generadores imprimibles vender Etsy, fichas KDP Hotmart, sopas letras generador, fichas matem\u00e1ticas crear, negocio imprimibles hispano, generador colorear vender',`,
    'apps es keywords'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  Done.');
}

// ============================================================
// 2. tools/page.tsx — toolsMetadata es: + toolsKeywords es:
// ============================================================
function updateToolsPage() {
  const filePath = path.join(frontendDir, 'tools', 'page.tsx');
  console.log(`\n=== Updating ${filePath} ===`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Title
  content = safeReplace(content,
    `    title: 'Generadores de imprimibles gratis | 33 herramientas | LessonCraftStudio',`,
    `    title: '33 generadores gratis \u2014 Pruebe en l\u00ednea | LCS',`,
    'tools es title'
  );

  // Description
  content = safeReplace(content,
    `    description: 'Pruebe los 33 generadores de fichas gratis en l\u00ednea. Sin registro. Sopa de letras, matem\u00e1ticas, colorear, puzzles y m\u00e1s con marca de agua.',`,
    `    description: 'Pruebe los 33 generadores de fichas gratis en l\u00ednea. Sin registro. Sopas de letras, matem\u00e1ticas, colorear, puzzles y m\u00e1s con marca de agua.',`,
    'tools es description'
  );

  // Keywords array
  content = safeReplace(content,
    `  es: ['generadores imprimibles gratis', 'creador de fichas online', 'herramientas imprimibles prueba gratis', 'generador sopa de letras gratis', 'generador fichas matem\u00e1ticas', 'creador colorear online'],`,
    `  es: ['generadores imprimibles gratis', 'creador de fichas online gratis', 'herramientas imprimibles prueba gratis', 'generador sopa de letras gratis', 'generador fichas matem\u00e1ticas gratis', 'creador colorear online gratis'],`,
    'tools es keywords'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  Done.');
}

// ============================================================
// 3. guides/page.tsx — guidesContent es: + guidesKeywords es:
// ============================================================
function updateGuidesPage() {
  const filePath = path.join(frontendDir, 'guides', 'page.tsx');
  console.log(`\n=== Updating ${filePath} ===`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // heroTitle
  content = safeReplace(content,
    `    heroTitle: 'Gu\u00edas pr\u00e1cticas',\n    heroDescription: 'Gu\u00edas paso a paso para crear y vender imprimibles. Desde tutoriales de plataformas hasta estrategias de negocio.',`,
    `    heroTitle: 'Gu\u00edas para vendedores de imprimibles',\n    heroDescription: 'Gu\u00edas paso a paso para crear y vender imprimibles en Etsy, KDP y Hotmart. Desde tutoriales de plataformas hasta estrategias de negocio.',`,
    'guides es heroTitle+heroDescription'
  );

  // metaTitle
  content = safeReplace(content,
    `    metaTitle: 'Gu\u00edas pr\u00e1cticas | Crear y vender imprimibles | LessonCraftStudio',`,
    `    metaTitle: 'Gu\u00edas para vendedores de imprimibles | LCS',`,
    'guides es metaTitle'
  );

  // metaDescription
  content = safeReplace(content,
    `    metaDescription: '65 gu\u00edas paso a paso para crear y vender imprimibles. Gu\u00edas de plataformas, tutoriales de creaci\u00f3n y estrategias de negocio para Etsy, KDP, TPT.',`,
    `    metaDescription: '65 gu\u00edas paso a paso para crear y vender imprimibles en Etsy, KDP y Hotmart. Gu\u00edas de plataformas, tutoriales de creaci\u00f3n y estrategias de negocio.',`,
    'guides es metaDescription'
  );

  // Keywords array
  content = safeReplace(content,
    `  es: ['gu\u00edas negocio imprimibles', 'c\u00f3mo vender fichas', 'tutorial Etsy imprimibles', 'gu\u00eda publicaci\u00f3n KDP', 'crear y vender imprimibles', 'consejos vendedor imprimibles'],`,
    `  es: ['gu\u00edas negocio imprimibles', 'c\u00f3mo vender fichas Etsy', 'tutorial Etsy KDP imprimibles', 'gu\u00eda publicaci\u00f3n KDP Hotmart', 'crear y vender imprimibles', 'consejos vendedor imprimibles'],`,
    'guides es keywords'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  Done.');
}

// ============================================================
// 4. bundles/page.tsx — bundlesContent es: + bundlesKeywords es:
// ============================================================
function updateBundlesPage() {
  const filePath = path.join(frontendDir, 'bundles', 'page.tsx');
  console.log(`\n=== Updating ${filePath} ===`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // heroTitle + heroDescription
  content = safeReplace(content,
    `    heroTitle: 'Packs de generadores',\n    heroDescription: 'Ahorra con packs por categor\u00eda. Obt\u00e9n todos los generadores de una categor\u00eda con licencia comercial a precio de pack.',`,
    `    heroTitle: 'Paquetes de generadores con licencia comercial',\n    heroDescription: 'Ahorre con paquetes por categor\u00eda. Obtenga todos los generadores de una categor\u00eda con licencia comercial a precio de paquete.',`,
    'bundles es heroTitle+heroDescription'
  );

  // metaTitle
  content = safeReplace(content,
    `    metaTitle: 'Packs de generadores de imprimibles | Ahorra por categor\u00eda | LessonCraftStudio',`,
    `    metaTitle: 'Paquetes con licencia comercial | LCS',`,
    'bundles es metaTitle'
  );

  // metaDescription
  content = safeReplace(content,
    `    metaDescription: 'Todos los generadores de una categor\u00eda a precio de pack. 6 packs de matem\u00e1ticas, lectura, dibujo, asociaci\u00f3n, puzzles y b\u00fasqueda. Compra \u00fanica con licencia comercial.',`,
    `    metaDescription: 'Todos los generadores de una categor\u00eda a precio de paquete. 6 paquetes de matem\u00e1ticas, lectura, dibujo, asociaci\u00f3n, puzzles y b\u00fasqueda. Licencia comercial.',`,
    'bundles es metaDescription'
  );

  // Keywords array
  content = safeReplace(content,
    `  es: ['packs de imprimibles', 'lote de fichas', 'packs Etsy imprimibles', 'lote libros actividades KDP', 'licencia comercial pack', 'pack por categor\u00eda'],`,
    `  es: ['paquetes imprimibles licencia comercial', 'lote de fichas Etsy', 'paquetes generadores KDP', 'licencia comercial paquete', 'paquete por categor\u00eda imprimibles', 'ahorro paquetes generadores'],`,
    'bundles es keywords'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  Done.');
}

// ============================================================
// 5. ideas/page.tsx — ideasContent es: + ideasKeywords es:
// ============================================================
function updateIdeasPage() {
  const filePath = path.join(frontendDir, 'ideas', 'page.tsx');
  console.log(`\n=== Updating ${filePath} ===`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // heroTitle + heroDescription
  content = safeReplace(content,
    `    heroTitle: 'Ideas de nichos de imprimibles',\n    heroDescription: 'Encuentra tu nicho perfecto. 45 ideas rentables con sugerencias de productos, consejos de plataformas y estrategias de precios.',`,
    `    heroTitle: 'Ideas de nichos rentables de imprimibles',\n    heroDescription: 'Encuentre su nicho perfecto. 45 ideas rentables con sugerencias de productos, consejos de plataformas y estrategias de precios.',`,
    'ideas es heroTitle+heroDescription'
  );

  // metaTitle
  content = safeReplace(content,
    `    metaTitle: 'Ideas de nichos de imprimibles | 45 nichos rentables | LessonCraftStudio',`,
    `    metaTitle: '45 nichos rentables de imprimibles | LCS',`,
    'ideas es metaTitle'
  );

  // metaDescription
  content = safeReplace(content,
    `    metaDescription: 'Descubre 45 nichos rentables de imprimibles. Ideas organizadas por edad, tema, temporada y formato. Encuentra tu nicho para Etsy y KDP.',`,
    `    metaDescription: 'Descubra 45 nichos rentables para vender imprimibles en Etsy, KDP y Hotmart. Temas, temporadas, edades y formatos con ideas de productos y precios.',`,
    'ideas es metaDescription'
  );

  // Keywords array
  content = safeReplace(content,
    `  es: ['ideas de nichos imprimibles', 'nichos imprimibles rentables', 'investigaci\u00f3n de nicho Etsy', 'ideas nicho KDP', 'qu\u00e9 imprimibles se venden mejor', 'ideas negocio imprimibles'],`,
    `  es: ['ideas nichos imprimibles rentables', 'nichos imprimibles Etsy KDP', 'investigaci\u00f3n nicho imprimibles', 'ideas nicho Hotmart', 'qu\u00e9 imprimibles se venden mejor', 'ideas negocio imprimibles hispano'],`,
    'ideas es keywords'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  Done.');
}

// ============================================================
// 6. start/page.tsx — startPageContent es: + startKeywords es:
// ============================================================
function updateStartPage() {
  const filePath = path.join(frontendDir, 'start', 'page.tsx');
  console.log(`\n=== Updating ${filePath} ===`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // heroTitle + heroDescription
  content = safeReplace(content,
    `    heroTitle: 'Gu\u00edas de negocio de imprimibles',\n    heroDescription: 'Todo lo que necesitas para iniciar y hacer crecer un negocio de imprimibles rentable. Desde elegir un nicho hasta escalar tus ventas.',`,
    `    heroTitle: 'Gu\u00edas de negocio de imprimibles',\n    heroDescription: 'Todo lo que necesita para iniciar y hacer crecer un negocio de imprimibles rentable. Desde elegir un nicho hasta escalar sus ventas.',`,
    'start es heroTitle+heroDescription'
  );

  // metaTitle
  content = safeReplace(content,
    `    metaTitle: 'Gu\u00edas de negocio de imprimibles | Iniciar y crecer | LessonCraftStudio',`,
    `    metaTitle: 'Crear y hacer crecer un negocio de imprimibles | LCS',`,
    'start es metaTitle'
  );

  // metaDescription
  content = safeReplace(content,
    `    metaDescription: 'Gu\u00edas completas para iniciar y hacer crecer un negocio de imprimibles. Venta en Etsy, Amazon KDP, TPT. Precios, marketing y estrategias de nicho.',`,
    `    metaDescription: 'Todo para crear y hacer crecer su negocio de imprimibles. Gu\u00edas de Etsy, KDP, Hotmart, marketing, precios y aspectos legales para el mercado hispano.',`,
    'start es metaDescription'
  );

  // Keywords array
  content = safeReplace(content,
    `  es: ['iniciar negocio imprimibles', 'negocio imprimibles principiantes', 'c\u00f3mo vender imprimibles', 'gu\u00eda vendedor Etsy', 'gu\u00eda principiante KDP', 'ingresos pasivos imprimibles'],`,
    `  es: ['iniciar negocio imprimibles', 'negocio imprimibles principiantes', 'c\u00f3mo vender imprimibles Hotmart', 'gu\u00eda vendedor Etsy', 'gu\u00eda principiante KDP', 'ingresos pasivos imprimibles hispano'],`,
    'start es keywords'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('  Done.');
}

// ============================================================
// 5b. Also update tú→Usted form in CTA sections for ideas
// ============================================================
function updateUstedForms() {
  console.log('\n=== Updating tú → Usted forms across all 6 files ===');

  const files = ['apps', 'tools', 'guides', 'bundles', 'ideas', 'start'];
  for (const page of files) {
    const filePath = path.join(frontendDir, page, 'page.tsx');
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;

    // Common tú-form patterns to Usted-form
    // ideas page: ¿Listo para empezar tu nicho?
    content = safeReplace(content,
      `'\u00bfListo para empezar tu nicho?'`,
      `'\u00bfListo para empezar su nicho?'`,
      `${page} ctaTitle tú→Usted`
    );

    // ideas page: Prueba los 33 generadores
    content = safeReplace(content,
      `'Prueba los 33 generadores gratis con marca de agua. Sin registro.'`,
      `'Pruebe los 33 generadores gratis con marca de agua. Sin registro.'`,
      `${page} ctaDescription tú→Usted`
    );

    // start page: ¿Listo para crear?
    content = safeReplace(content,
      `'\u00bfListo para crear?'`,
      `'\u00bfListo para crear?'`,
      `${page} start ctaTitle` // No change needed, skip
    );

    // start page: Prueba los 33 generadores
    // Already handled above if present

    // bundles: Prueba antes de comprar
    content = safeReplace(content,
      `'Prueba antes de comprar'`,
      `'Pruebe antes de comprar'`,
      `${page} bundles ctaTitle tú→Usted`
    );

    // bundles: Todos los generadores son gratis para probar
    content = safeReplace(content,
      `'Todos los generadores son gratis para probar con marca de agua. Comprueba la calidad antes de comprar.'`,
      `'Todos los generadores son gratis para probar con marca de agua. Compruebe la calidad antes de comprar.'`,
      `${page} bundles ctaDescription tú→Usted`
    );

    // guides: Empieza a crear hoy
    content = safeReplace(content,
      `'Empieza a crear hoy'`,
      `'Empiece a crear hoy'`,
      `${page} guides ctaTitle tú→Usted`
    );

    // guides: Prueba los 33 generadores (in ctaDescription)
    // Already handled by the general pattern above

    // guides subcatDescriptions: "tu negocio"
    content = safeReplace(content,
      `'Crecimiento y escalado de tu negocio de imprimibles'`,
      `'Crecimiento y escalado de su negocio de imprimibles'`,
      `${page} guides subcatDesc tú→Usted`
    );

    // start: "escalar tus ventas" — already changed in heroDescription above
    // start ctaDescription: Prueba los 33 generadores
    content = safeReplace(content,
      `'Prueba los 33 generadores gratis con marca de agua. Sin registro.'`,
      `'Pruebe los 33 generadores gratis con marca de agua. Sin registro.'`,
      `${page} start ctaDescription tú→Usted`
    );

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
}

// ============================================================
// Run all updates
// ============================================================
console.log('Spanish SEO Index Pages Update Script');
console.log('=====================================');

updateAppsPage();
updateToolsPage();
updateGuidesPage();
updateBundlesPage();
updateIdeasPage();
updateStartPage();
updateUstedForms();

console.log('\n=====================================');
console.log(`Total replacements: ${totalChanges}`);
console.log(`Warnings (not found / multiple): ${totalWarnings}`);

if (totalWarnings > 0) {
  console.log('\nSome replacements could not be applied. Check warnings above.');
}

// Validation: re-read all files and check es: blocks
console.log('\n=== Validation ===');
const validations = [
  { file: 'apps/page.tsx', checks: ['Venda en Etsy | LCS', 'fichas KDP Hotmart'] },
  { file: 'tools/page.tsx', checks: ['Pruebe en l\u00ednea | LCS', 'creador de fichas online gratis'] },
  { file: 'guides/page.tsx', checks: ['vendedores de imprimibles | LCS', 'KDP y Hotmart'] },
  { file: 'bundles/page.tsx', checks: ['Paquetes con licencia comercial | LCS', 'paquetes imprimibles licencia comercial'] },
  { file: 'ideas/page.tsx', checks: ['45 nichos rentables de imprimibles | LCS', 'ideas nicho Hotmart'] },
  { file: 'start/page.tsx', checks: ['hacer crecer un negocio de imprimibles | LCS', 'imprimibles Hotmart'] },
];

let allValid = true;
for (const v of validations) {
  const filePath = path.join(frontendDir, v.file);
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const check of v.checks) {
    if (!content.includes(check)) {
      console.log(`  FAIL: ${v.file} missing "${check}"`);
      allValid = false;
    }
  }
}

if (allValid) {
  console.log('  All validations passed!');
} else {
  console.log('  Some validations failed. Check output above.');
}
