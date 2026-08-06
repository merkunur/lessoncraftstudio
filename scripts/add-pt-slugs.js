const fs = require('fs');
const path = require('path');

// Tool page slugs (33)
const toolSlugs = {
  'image-addition': 'gerador-fichas-adicao',
  'image-subtraction': 'gerador-fichas-subtracao',
  'code-addition': 'gerador-adicao-codificada',
  'more-less': 'gerador-comparacao-quantidades',
  'math-puzzle': 'gerador-puzzles-matematicos',
  'math-worksheet': 'gerador-exercicios-matematica',
  'alphabet-train': 'gerador-trem-alfabeto',
  'prepositions': 'gerador-fichas-preposicoes',
  'word-guess': 'gerador-adivinhar-palavras',
  'word-scramble': 'gerador-palavras-embaralhadas',
  'word-search': 'gerador-caca-palavras',
  'cryptogram': 'gerador-criptogramas',
  'writing': 'gerador-fichas-escrita',
  'big-small': 'gerador-fichas-grande-pequeno',
  'pattern-train': 'gerador-trem-padroes',
  'pattern-worksheet': 'gerador-fichas-padroes',
  'draw-and-color': 'gerador-desenho-quadricula',
  'drawing-lines': 'gerador-fichas-grafomotricidade',
  'coloring': 'gerador-paginas-colorir',
  'chart-count': 'gerador-graficos-imagens',
  'matching': 'gerador-fichas-associacao',
  'grid-match': 'gerador-puzzle-quadricula',
  'shadow-match': 'gerador-discriminacao-visual',
  'bingo': 'gerador-cartelas-bingo',
  'picture-sort': 'gerador-classificacao-imagens',
  'missing-pieces': 'gerador-pecas-faltantes',
  'odd-one-out': 'gerador-fichas-intruso',
  'sudoku': 'gerador-sudoku-infantil',
  'picture-path': 'gerador-percurso-imagens',
  'find-and-count': 'gerador-procura-conta',
  'find-objects': 'gerador-procura-objetos',
  'crossword': 'gerador-palavras-cruzadas',
  'treasure-hunt': 'gerador-caca-tesouro',
};

// Bundle page slugs (6)
const bundleSlugs = {
  'math-bundle': 'pacote-dominio-matematica',
  'literacy-bundle': 'pacote-leitura-linguagem',
  'visual-bundle': 'pacote-aprendizagem-visual',
  'matching-bundle': 'pacote-associacao-classificacao',
  'puzzle-bundle': 'pacote-puzzles-logica',
  'search-bundle': 'pacote-procura-encontra',
};

// Start page slugs (12)
const startSlugs = {
  'complete-guide-printable-business': 'guia-completo-negocio-imprimiveis',
  'create-worksheets-that-sell': 'criar-fichas-que-vendem',
  'printable-business-blueprint': 'plano-negocio-imprimiveis',
  'etsy-printable-business': 'negocio-imprimiveis-etsy',
  'amazon-kdp-activity-books': 'livros-atividades-amazon-kdp',
  'create-multilingual-worksheets': 'criar-fichas-multilingues',
  'commercial-license-guide': 'guia-licenca-comercial',
  'printable-business-income': 'rendimentos-negocio-imprimiveis',
  'tools-for-printable-business': 'ferramentas-negocio-imprimiveis',
  'marketing-printable-business': 'marketing-negocio-imprimiveis',
  'scaling-printable-business': 'escalar-negocio-imprimiveis',
  'printable-business-legal': 'aspectos-legais-negocio-imprimiveis',
};

// Guide page slugs (65)
const guideSlugs = {
  // Platform Guides (20)
  'sell-math-worksheets-etsy': 'vender-fichas-matematica-etsy',
  'sell-word-search-etsy': 'vender-caca-palavras-etsy',
  'start-etsy-printable-shop': 'abrir-loja-etsy-imprimiveis',
  'create-etsy-coloring-pages': 'criar-paginas-colorir-etsy',
  'sell-educational-printables-etsy': 'vender-material-educativo-etsy',
  'price-etsy-printables': 'precos-imprimiveis-etsy',
  'etsy-seo-educational-printables': 'seo-etsy-material-educativo',
  'create-etsy-worksheet-bundles': 'criar-pacotes-fichas-etsy',
  'math-activity-books-kdp': 'livros-atividades-matematica-kdp',
  'publish-puzzle-books-kdp': 'publicar-livros-puzzles-kdp',
  'word-search-books-kdp': 'livros-caca-palavras-kdp',
  'make-money-kdp-activity-books': 'ganhar-dinheiro-kdp-livros-atividades',
  'kdp-formatting-worksheets': 'formatacao-kdp-fichas',
  'best-kdp-activity-book-niches': 'melhores-nichos-kdp-livros-atividades',
  'sudoku-books-kdp': 'livros-sudoku-kdp',
  'kdp-vs-etsy-printables': 'kdp-ou-etsy-imprimiveis',
  'create-sell-tpt-resources': 'criar-vender-recursos-tpt',
  'tpt-store-optimization': 'otimizacao-loja-tpt',
  'sell-printables-gumroad': 'vender-imprimiveis-gumroad',
  'sell-creative-fabrica': 'vender-creative-fabrica',
  // Product Creation Guides (25)
  'create-addition-worksheets': 'criar-fichas-adicao',
  'create-subtraction-worksheets': 'criar-fichas-subtracao',
  'create-word-search-puzzles': 'criar-caca-palavras',
  'create-crossword-puzzles': 'criar-palavras-cruzadas',
  'create-math-puzzle-worksheets': 'criar-fichas-puzzles-matematicos',
  'create-handwriting-sheets': 'criar-fichas-escrita',
  'create-coloring-pages': 'criar-paginas-colorir',
  'create-bingo-cards': 'criar-cartelas-bingo',
  'create-matching-worksheets': 'criar-fichas-associacao',
  'create-pattern-worksheets': 'criar-fichas-padroes',
  'create-picture-sudoku': 'criar-sudoku-imagens',
  'create-maze-worksheets': 'criar-fichas-labirintos',
  'create-hidden-object-worksheets': 'criar-fichas-objetos-ocultos',
  'create-size-comparison-worksheets': 'criar-fichas-comparacao-tamanhos',
  'create-counting-worksheets': 'criar-fichas-contagem',
  'create-drawing-worksheets': 'criar-fichas-desenho',
  'create-sorting-worksheets': 'criar-fichas-classificacao',
  'create-shadow-matching-worksheets': 'criar-fichas-discriminacao-visual',
  'create-odd-one-out-puzzles': 'criar-fichas-intruso',
  'create-missing-pieces-puzzles': 'criar-puzzles-pecas-faltantes',
  'create-treasure-hunt-worksheets': 'criar-fichas-caca-tesouro',
  'create-alphabet-worksheets': 'criar-fichas-alfabeto',
  'create-preposition-worksheets': 'criar-fichas-preposicoes',
  'create-cryptogram-puzzles': 'criar-criptogramas',
  'create-chart-count-worksheets': 'criar-fichas-graficos-imagens',
  // Business Strategy Guides (20)
  'create-worksheet-bundles': 'criar-pacotes-fichas-exercicios',
  'niche-selection-printables': 'selecao-nicho-imprimiveis',
  'create-printable-product-line': 'criar-linha-produtos-imprimiveis',
  'pricing-educational-printables': 'precos-material-educativo',
  'scale-printable-business-guide': 'guia-escalar-negocio-imprimiveis',
  'passive-income-worksheets': 'rendimentos-passivos-fichas',
  'understanding-commercial-licenses': 'entender-licencas-comerciais',
  'research-profitable-niches': 'pesquisar-nichos-rentaveis',
  'multilingual-printable-business': 'negocio-imprimiveis-multilingue',
  'worksheets-multiple-languages': 'fichas-exercicios-varios-idiomas',
  'copyright-printable-sellers': 'direitos-autor-vendedores-imprimiveis',
  'customer-support-digital-products': 'suporte-cliente-produtos-digitais',
  'automate-printable-business': 'automatizar-negocio-imprimiveis',
  'social-media-printable-marketing': 'marketing-redes-sociais-imprimiveis',
  'pinterest-marketing-worksheets': 'marketing-pinterest-fichas',
  'email-marketing-printables': 'email-marketing-imprimiveis',
  'get-reviews-printable-products': 'obter-avaliacoes-produtos-imprimiveis',
  'seasonal-marketing-printables': 'marketing-sazonal-imprimiveis',
  'digital-vs-physical-printables': 'digital-ou-fisico-imprimiveis',
  'quality-standards-worksheets': 'padroes-qualidade-fichas-exercicios',
};

// Idea page slugs (45)
const ideaSlugs = {
  // Animals & Nature (8)
  'farm-animals-printable-ideas': 'animais-fazenda-ideias-imprimiveis',
  'ocean-animals-printable-ideas': 'animais-marinhos-ideias-imprimiveis',
  'safari-animals-printable-ideas': 'animais-safari-ideias-imprimiveis',
  'pets-printable-ideas': 'animais-estimacao-ideias-imprimiveis',
  'dinosaur-printable-ideas': 'dinossauros-ideias-imprimiveis',
  'birds-printable-ideas': 'aves-ideias-imprimiveis',
  'insects-printable-ideas': 'insetos-ideias-imprimiveis',
  'forest-animals-printable-ideas': 'animais-floresta-ideias-imprimiveis',
  // Seasons & Holidays (10)
  'christmas-printable-ideas': 'natal-ideias-imprimiveis',
  'halloween-printable-ideas': 'halloween-ideias-imprimiveis',
  'easter-printable-ideas': 'pascoa-ideias-imprimiveis',
  'valentines-day-printable-ideas': 'dia-namorados-ideias-imprimiveis',
  'back-to-school-printable-ideas': 'regresso-aulas-ideias-imprimiveis',
  'summer-printable-ideas': 'verao-ideias-imprimiveis',
  'winter-printable-ideas': 'inverno-ideias-imprimiveis',
  'spring-printable-ideas': 'primavera-ideias-imprimiveis',
  'thanksgiving-printable-ideas': 'acao-gracas-ideias-imprimiveis',
  'parents-day-printable-ideas': 'dia-dos-pais-ideias-imprimiveis',
  // Interests & Activities (10)
  'space-printable-ideas': 'espaco-ideias-imprimiveis',
  'transportation-printable-ideas': 'transportes-ideias-imprimiveis',
  'food-cooking-printable-ideas': 'culinaria-alimentacao-ideias-imprimiveis',
  'sports-printable-ideas': 'desportos-ideias-imprimiveis',
  'music-printable-ideas': 'musica-ideias-imprimiveis',
  'construction-printable-ideas': 'construcao-ideias-imprimiveis',
  'pirates-printable-ideas': 'piratas-ideias-imprimiveis',
  'fairy-tale-printable-ideas': 'contos-fadas-ideias-imprimiveis',
  'camping-printable-ideas': 'campismo-ideias-imprimiveis',
  'underwater-printable-ideas': 'submarino-ideias-imprimiveis',
  // Educational Focus (10)
  'preschool-printable-ideas': 'pre-escolar-ideias-imprimiveis',
  'kindergarten-printable-ideas': 'jardim-infancia-ideias-imprimiveis',
  'first-grade-printable-ideas': 'primeiro-ano-ideias-imprimiveis',
  'second-grade-printable-ideas': 'segundo-ano-ideias-imprimiveis',
  'third-grade-printable-ideas': 'terceiro-ano-ideias-imprimiveis',
  'homeschool-printable-ideas': 'ensino-domestico-ideias-imprimiveis',
  'special-education-printable-ideas': 'educacao-especial-ideias-imprimiveis',
  'esl-printable-ideas': 'ple-ideias-imprimiveis',
  'summer-learning-printable-ideas': 'aprendizagem-verao-ideias-imprimiveis',
  'math-facts-printable-ideas': 'bases-matematica-ideias-imprimiveis',
  // Business Models (7)
  'subscription-box-printable-ideas': 'caixa-assinatura-ideias-imprimiveis',
  'print-on-demand-printable-ideas': 'impressao-sob-demanda-ideias-imprimiveis',
  'digital-download-printable-ideas': 'download-digital-ideias-imprimiveis',
  'physical-printable-product-ideas': 'produtos-impressos-fisicos-ideias',
  'party-supply-printable-ideas': 'artigos-festa-ideias-imprimiveis',
  'custom-worksheet-service-ideas': 'servico-fichas-personalizadas-ideias',
  'bulk-licensing-printable-ideas': 'licencas-volume-ideias-imprimiveis',
};

function addPtSlug(content, idField, slugMap) {
  let modified = content;
  for (const [id, ptSlug] of Object.entries(slugMap)) {
    // Find the es: 'slug' line within this entry's slugs block and add pt: after it
    // The es line may end with comma or not, and } may be on the next line
    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const esPattern = new RegExp(
      `(${idField}: '${escapedId}',[\\s\\S]*?es: '[^']*'),?(\\s*\\})`
    );
    const match = modified.match(esPattern);
    if (match) {
      modified = modified.replace(esPattern, `$1, pt: '${ptSlug}'$2`);
    } else {
      console.warn(`WARNING: Could not find entry for ${id}`);
    }
  }
  return modified;
}

// Process all 5 config files
const configDir = path.join(__dirname, '..', 'frontend', 'config');

const toolFile = path.join(configDir, 'tool-page-slugs.ts');
let toolContent = fs.readFileSync(toolFile, 'utf8');
toolContent = addPtSlug(toolContent, 'toolId', toolSlugs);
fs.writeFileSync(toolFile, toolContent, 'utf8');
console.log(`Updated tool-page-slugs.ts (${Object.keys(toolSlugs).length} slugs)`);

const bundleFile = path.join(configDir, 'bundle-page-slugs.ts');
let bundleContent = fs.readFileSync(bundleFile, 'utf8');
bundleContent = addPtSlug(bundleContent, 'bundleId', bundleSlugs);
fs.writeFileSync(bundleFile, bundleContent, 'utf8');
console.log(`Updated bundle-page-slugs.ts (${Object.keys(bundleSlugs).length} slugs)`);

const startFile = path.join(configDir, 'start-page-slugs.ts');
let startContent = fs.readFileSync(startFile, 'utf8');
startContent = addPtSlug(startContent, 'startId', startSlugs);
fs.writeFileSync(startFile, startContent, 'utf8');
console.log(`Updated start-page-slugs.ts (${Object.keys(startSlugs).length} slugs)`);

const guideFile = path.join(configDir, 'guide-page-slugs.ts');
let guideContent = fs.readFileSync(guideFile, 'utf8');
guideContent = addPtSlug(guideContent, 'guideId', guideSlugs);
fs.writeFileSync(guideFile, guideContent, 'utf8');
console.log(`Updated guide-page-slugs.ts (${Object.keys(guideSlugs).length} slugs)`);

const ideaFile = path.join(configDir, 'idea-page-slugs.ts');
let ideaContent = fs.readFileSync(ideaFile, 'utf8');
ideaContent = addPtSlug(ideaContent, 'ideaId', ideaSlugs);
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
  console.log(`\nAll ${allSlugs.length} Portuguese slugs are unique. No duplicates.`);
}

// Verify no diacritics
const badSlugs = allSlugs.filter(s => !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s));
if (badSlugs.length > 0) {
  console.error('SLUGS WITH INVALID CHARACTERS:', badSlugs);
} else {
  console.log('All slugs pass regex validation (lowercase alphanumeric + hyphens only).');
}

// Verify length
const longSlugs = allSlugs.filter(s => s.length > 60);
if (longSlugs.length > 0) {
  console.error('SLUGS OVER 60 CHARS:', longSlugs);
} else {
  console.log('All slugs are under 60 characters.');
}
