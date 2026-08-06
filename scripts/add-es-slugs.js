const fs = require('fs');
const path = require('path');

// Tool page slugs (33)
const toolSlugs = {
  'image-addition': 'generador-fichas-suma',
  'image-subtraction': 'generador-fichas-resta',
  'code-addition': 'generador-suma-codificada',
  'more-less': 'generador-comparacion-cantidades',
  'math-puzzle': 'generador-puzzles-matematicos',
  'math-worksheet': 'generador-ejercicios-matematicas',
  'alphabet-train': 'generador-tren-abecedario',
  'prepositions': 'generador-fichas-preposiciones',
  'word-guess': 'generador-adivinar-palabras',
  'word-scramble': 'generador-palabras-desordenadas',
  'word-search': 'generador-sopa-letras',
  'cryptogram': 'generador-criptogramas',
  'writing': 'generador-fichas-escritura',
  'big-small': 'generador-fichas-grande-pequeno',
  'pattern-train': 'generador-tren-patrones',
  'pattern-worksheet': 'generador-fichas-patrones',
  'draw-and-color': 'generador-dibujo-cuadricula',
  'drawing-lines': 'generador-fichas-grafomotricidad',
  'coloring': 'generador-paginas-colorear',
  'chart-count': 'generador-graficos-imagenes',
  'matching': 'generador-fichas-asociacion',
  'grid-match': 'generador-puzzle-cuadricula',
  'shadow-match': 'generador-discriminacion-visual',
  'bingo': 'generador-tarjetas-bingo',
  'picture-sort': 'generador-clasificacion-imagenes',
  'missing-pieces': 'generador-piezas-faltantes',
  'odd-one-out': 'generador-fichas-intruso',
  'sudoku': 'generador-sudoku-infantil',
  'picture-path': 'generador-recorrido-imagenes',
  'find-and-count': 'generador-busca-cuenta',
  'find-objects': 'generador-busca-objetos',
  'crossword': 'generador-crucigramas-imagenes',
  'treasure-hunt': 'generador-busqueda-tesoro',
};

// Bundle page slugs (6)
const bundleSlugs = {
  'math-bundle': 'paquete-dominio-matematicas',
  'literacy-bundle': 'paquete-lectura-lenguaje',
  'visual-bundle': 'paquete-aprendizaje-visual',
  'matching-bundle': 'paquete-asociacion-clasificacion',
  'puzzle-bundle': 'paquete-puzzles-logica',
  'search-bundle': 'paquete-busca-encuentra',
};

// Start page slugs (12)
const startSlugs = {
  'complete-guide-printable-business': 'guia-completa-negocio-imprimibles',
  'create-worksheets-that-sell': 'crear-fichas-que-se-venden',
  'printable-business-blueprint': 'plan-negocio-imprimibles',
  'etsy-printable-business': 'negocio-imprimibles-etsy',
  'amazon-kdp-activity-books': 'libros-actividades-amazon-kdp',
  'create-multilingual-worksheets': 'crear-fichas-multilingues',
  'commercial-license-guide': 'guia-licencia-comercial',
  'printable-business-income': 'ingresos-negocio-imprimibles',
  'tools-for-printable-business': 'herramientas-negocio-imprimibles',
  'marketing-printable-business': 'marketing-negocio-imprimibles',
  'scaling-printable-business': 'escalar-negocio-imprimibles',
  'printable-business-legal': 'aspectos-legales-negocio-imprimibles',
};

// Guide page slugs (65)
const guideSlugs = {
  // Platform Guides (20)
  'sell-math-worksheets-etsy': 'vender-fichas-matematicas-etsy',
  'sell-word-search-etsy': 'vender-sopas-letras-etsy',
  'start-etsy-printable-shop': 'abrir-tienda-etsy-imprimibles',
  'create-etsy-coloring-pages': 'crear-paginas-colorear-etsy',
  'sell-educational-printables-etsy': 'vender-material-educativo-etsy',
  'price-etsy-printables': 'precios-imprimibles-etsy',
  'etsy-seo-educational-printables': 'seo-etsy-material-educativo',
  'create-etsy-worksheet-bundles': 'crear-paquetes-fichas-etsy',
  'math-activity-books-kdp': 'libros-actividades-matematicas-kdp',
  'publish-puzzle-books-kdp': 'publicar-libros-puzzles-kdp',
  'word-search-books-kdp': 'libros-sopas-letras-kdp',
  'make-money-kdp-activity-books': 'ganar-dinero-kdp-libros-actividades',
  'kdp-formatting-worksheets': 'formato-kdp-fichas',
  'best-kdp-activity-book-niches': 'mejores-nichos-kdp-libros-actividades',
  'sudoku-books-kdp': 'libros-sudoku-kdp',
  'kdp-vs-etsy-printables': 'kdp-o-etsy-imprimibles',
  'create-sell-tpt-resources': 'crear-vender-recursos-tpt',
  'tpt-store-optimization': 'optimizacion-tienda-tpt',
  'sell-printables-gumroad': 'vender-imprimibles-gumroad',
  'sell-creative-fabrica': 'vender-creative-fabrica',
  // Product Creation Guides (25)
  'create-addition-worksheets': 'crear-fichas-suma',
  'create-subtraction-worksheets': 'crear-fichas-resta',
  'create-word-search-puzzles': 'crear-sopas-letras',
  'create-crossword-puzzles': 'crear-crucigramas',
  'create-math-puzzle-worksheets': 'crear-fichas-puzzles-matematicos',
  'create-handwriting-sheets': 'crear-fichas-escritura',
  'create-coloring-pages': 'crear-paginas-colorear',
  'create-bingo-cards': 'crear-tarjetas-bingo',
  'create-matching-worksheets': 'crear-fichas-asociacion',
  'create-pattern-worksheets': 'crear-fichas-patrones',
  'create-picture-sudoku': 'crear-sudoku-imagenes',
  'create-maze-worksheets': 'crear-fichas-laberintos',
  'create-hidden-object-worksheets': 'crear-fichas-objetos-ocultos',
  'create-size-comparison-worksheets': 'crear-fichas-comparacion-tamanos',
  'create-counting-worksheets': 'crear-fichas-conteo',
  'create-drawing-worksheets': 'crear-fichas-dibujo',
  'create-sorting-worksheets': 'crear-fichas-clasificacion',
  'create-shadow-matching-worksheets': 'crear-fichas-discriminacion-visual',
  'create-odd-one-out-puzzles': 'crear-fichas-intruso',
  'create-missing-pieces-puzzles': 'crear-puzzles-piezas-faltantes',
  'create-treasure-hunt-worksheets': 'crear-fichas-busqueda-tesoro',
  'create-alphabet-worksheets': 'crear-fichas-abecedario',
  'create-preposition-worksheets': 'crear-fichas-preposiciones',
  'create-cryptogram-puzzles': 'crear-criptogramas',
  'create-chart-count-worksheets': 'crear-fichas-graficos-imagenes',
  // Business Strategy Guides (20)
  'create-worksheet-bundles': 'crear-paquetes-fichas-ejercicios',
  'niche-selection-printables': 'seleccion-nicho-imprimibles',
  'create-printable-product-line': 'crear-linea-productos-imprimibles',
  'pricing-educational-printables': 'precios-material-educativo',
  'scale-printable-business-guide': 'guia-escalar-negocio-imprimibles',
  'passive-income-worksheets': 'ingresos-pasivos-fichas-ejercicios',
  'understanding-commercial-licenses': 'entender-licencias-comerciales',
  'research-profitable-niches': 'investigar-nichos-rentables',
  'multilingual-printable-business': 'negocio-imprimibles-multilingue',
  'worksheets-multiple-languages': 'fichas-ejercicios-varios-idiomas',
  'copyright-printable-sellers': 'derechos-autor-vendedores-imprimibles',
  'customer-support-digital-products': 'soporte-cliente-productos-digitales',
  'automate-printable-business': 'automatizar-negocio-imprimibles',
  'social-media-printable-marketing': 'marketing-redes-sociales-imprimibles',
  'pinterest-marketing-worksheets': 'marketing-pinterest-fichas',
  'email-marketing-printables': 'email-marketing-imprimibles',
  'get-reviews-printable-products': 'obtener-resenas-productos-imprimibles',
  'seasonal-marketing-printables': 'marketing-estacional-imprimibles',
  'digital-vs-physical-printables': 'digital-o-fisico-imprimibles',
  'quality-standards-worksheets': 'estandares-calidad-fichas-ejercicios',
};

// Idea page slugs (45)
const ideaSlugs = {
  // Animals & Nature (8)
  'farm-animals-printable-ideas': 'animales-granja-ideas-imprimibles',
  'ocean-animals-printable-ideas': 'animales-marinos-ideas-imprimibles',
  'safari-animals-printable-ideas': 'animales-safari-ideas-imprimibles',
  'pets-printable-ideas': 'mascotas-ideas-imprimibles',
  'dinosaur-printable-ideas': 'dinosaurios-ideas-imprimibles',
  'birds-printable-ideas': 'aves-ideas-imprimibles',
  'insects-printable-ideas': 'insectos-ideas-imprimibles',
  'forest-animals-printable-ideas': 'animales-bosque-ideas-imprimibles',
  // Seasons & Holidays (10)
  'christmas-printable-ideas': 'navidad-ideas-imprimibles',
  'halloween-printable-ideas': 'halloween-ideas-imprimibles',
  'easter-printable-ideas': 'pascua-ideas-imprimibles',
  'valentines-day-printable-ideas': 'san-valentin-ideas-imprimibles',
  'back-to-school-printable-ideas': 'vuelta-al-cole-ideas-imprimibles',
  'summer-printable-ideas': 'verano-ideas-imprimibles',
  'winter-printable-ideas': 'invierno-ideas-imprimibles',
  'spring-printable-ideas': 'primavera-ideas-imprimibles',
  'thanksgiving-printable-ideas': 'accion-de-gracias-ideas-imprimibles',
  'parents-day-printable-ideas': 'dia-de-los-padres-ideas-imprimibles',
  // Interests & Activities (10)
  'space-printable-ideas': 'espacio-ideas-imprimibles',
  'transportation-printable-ideas': 'transporte-ideas-imprimibles',
  'food-cooking-printable-ideas': 'cocina-alimentacion-ideas-imprimibles',
  'sports-printable-ideas': 'deportes-ideas-imprimibles',
  'music-printable-ideas': 'musica-ideas-imprimibles',
  'construction-printable-ideas': 'construccion-ideas-imprimibles',
  'pirates-printable-ideas': 'piratas-ideas-imprimibles',
  'fairy-tale-printable-ideas': 'cuentos-hadas-ideas-imprimibles',
  'camping-printable-ideas': 'camping-ideas-imprimibles',
  'underwater-printable-ideas': 'submarino-ideas-imprimibles',
  // Educational Focus (10)
  'preschool-printable-ideas': 'preescolar-ideas-imprimibles',
  'kindergarten-printable-ideas': 'infantil-ideas-imprimibles',
  'first-grade-printable-ideas': 'primer-grado-ideas-imprimibles',
  'second-grade-printable-ideas': 'segundo-grado-ideas-imprimibles',
  'third-grade-printable-ideas': 'tercer-grado-ideas-imprimibles',
  'homeschool-printable-ideas': 'educacion-en-casa-ideas-imprimibles',
  'special-education-printable-ideas': 'educacion-especial-ideas-imprimibles',
  'esl-printable-ideas': 'ele-ideas-imprimibles',
  'summer-learning-printable-ideas': 'aprendizaje-verano-ideas-imprimibles',
  'math-facts-printable-ideas': 'bases-matematicas-ideas-imprimibles',
  // Business Models (7)
  'subscription-box-printable-ideas': 'caja-suscripcion-ideas-imprimibles',
  'print-on-demand-printable-ideas': 'impresion-bajo-demanda-ideas-imprimibles',
  'digital-download-printable-ideas': 'descarga-digital-ideas-imprimibles',
  'physical-printable-product-ideas': 'productos-impresos-fisicos-ideas',
  'party-supply-printable-ideas': 'articulos-fiesta-ideas-imprimibles',
  'custom-worksheet-service-ideas': 'servicio-fichas-personalizadas-ideas',
  'bulk-licensing-printable-ideas': 'licencias-volumen-ideas-imprimibles',
};

function addEsSlug(content, idField, slugMap) {
  let modified = content;
  for (const [id, esSlug] of Object.entries(slugMap)) {
    // Match the pattern: fr: 'some-slug' } (end of slugs block for this entry)
    // We need to add es: 'slug' after the fr line
    const frPattern = new RegExp(
      `(${idField}: '${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*slugs:\\s*\\{[^}]*fr:\\s*'[^']*')\\s*(\\})`
    );
    const match = modified.match(frPattern);
    if (match) {
      modified = modified.replace(frPattern, `$1, es: '${esSlug}' $2`);
    } else {
      console.warn(`WARNING: Could not find entry for ${id}`);
    }
  }
  return modified;
}

// Process tool-page-slugs.ts
const configDir = path.join(__dirname, '..', 'frontend', 'config');

const toolFile = path.join(configDir, 'tool-page-slugs.ts');
let toolContent = fs.readFileSync(toolFile, 'utf8');
toolContent = addEsSlug(toolContent, 'toolId', toolSlugs);
fs.writeFileSync(toolFile, toolContent, 'utf8');
console.log(`Updated tool-page-slugs.ts (${Object.keys(toolSlugs).length} slugs)`);

const bundleFile = path.join(configDir, 'bundle-page-slugs.ts');
let bundleContent = fs.readFileSync(bundleFile, 'utf8');
bundleContent = addEsSlug(bundleContent, 'bundleId', bundleSlugs);
fs.writeFileSync(bundleFile, bundleContent, 'utf8');
console.log(`Updated bundle-page-slugs.ts (${Object.keys(bundleSlugs).length} slugs)`);

const startFile = path.join(configDir, 'start-page-slugs.ts');
let startContent = fs.readFileSync(startFile, 'utf8');
startContent = addEsSlug(startContent, 'startId', startSlugs);
fs.writeFileSync(startFile, startContent, 'utf8');
console.log(`Updated start-page-slugs.ts (${Object.keys(startSlugs).length} slugs)`);

const guideFile = path.join(configDir, 'guide-page-slugs.ts');
let guideContent = fs.readFileSync(guideFile, 'utf8');
guideContent = addEsSlug(guideContent, 'guideId', guideSlugs);
fs.writeFileSync(guideFile, guideContent, 'utf8');
console.log(`Updated guide-page-slugs.ts (${Object.keys(guideSlugs).length} slugs)`);

const ideaFile = path.join(configDir, 'idea-page-slugs.ts');
let ideaContent = fs.readFileSync(ideaFile, 'utf8');
ideaContent = addEsSlug(ideaContent, 'ideaId', ideaSlugs);
fs.writeFileSync(ideaFile, ideaContent, 'utf8');
console.log(`Updated idea-page-slugs.ts (${Object.keys(ideaSlugs).length} slugs)`);

// Verify no duplicates
const allSlugs = [
  ...Object.values(toolSlugs),
  ...Object.values(bundleSlugs),
  ...Object.values(startSlugs),
  ...Object.values(guideSlugs),
  ...Object.values(ideaSlugs),
];
const dupes = allSlugs.filter((s, i) => allSlugs.indexOf(s) !== i);
if (dupes.length > 0) {
  console.error('DUPLICATE SLUGS FOUND:', dupes);
} else {
  console.log(`\nAll ${allSlugs.length} Spanish slugs are unique. No duplicates.`);
}
