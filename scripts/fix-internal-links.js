#!/usr/bin/env node
/**
 * fix-internal-links.js
 *
 * Scans all content files for internalLinks with slugs that don't match
 * any registered slug in the corresponding slug config files.
 *
 * Usage:
 *   node scripts/fix-internal-links.js            # dry-run (report only)
 *   node scripts/fix-internal-links.js --apply     # apply fixes
 */

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const ROOT = path.join(__dirname, '..', 'frontend', 'config');

// ============================================================
// 1. Parse slug config files to build lookup tables
// ============================================================

function parseSlugConfig(filePath, idField) {
  const text = fs.readFileSync(filePath, 'utf8');
  const entries = [];

  // Match each config entry: { guideId: '...', slugs: { en: '...', de: '...', ... } }
  const entryRegex = new RegExp(
    idField + `:\\s*'([^']+)'\\s*,\\s*slugs:\\s*\\{([^}]+)\\}`,
    'g'
  );

  let match;
  while ((match = entryRegex.exec(text)) !== null) {
    const id = match[1];
    const slugsText = match[2];
    const slugs = {};

    const slugRegex = /(\w+):\s*'([^']+)'/g;
    let slugMatch;
    while ((slugMatch = slugRegex.exec(slugsText)) !== null) {
      slugs[slugMatch[1]] = slugMatch[2];
    }

    entries.push({ id, slugs });
  }

  return entries;
}

// Load all 6 slug configs
const configs = {
  app: parseSlugConfig(path.join(ROOT, 'product-page-slugs.ts'), 'appId'),
  guide: parseSlugConfig(path.join(ROOT, 'guide-page-slugs.ts'), 'guideId'),
  tool: parseSlugConfig(path.join(ROOT, 'tool-page-slugs.ts'), 'toolId'),
  bundle: parseSlugConfig(path.join(ROOT, 'bundle-page-slugs.ts'), 'bundleId'),
  start: parseSlugConfig(path.join(ROOT, 'start-page-slugs.ts'), 'startId'),
  idea: parseSlugConfig(path.join(ROOT, 'idea-page-slugs.ts'), 'ideaId'),
};

console.log('Loaded slug configs:');
for (const [type, entries] of Object.entries(configs)) {
  console.log(`  ${type}: ${entries.length} entries`);
}

// Build reverse lookup: slug -> { id, locale } for each pageType
// This lets us find what entry a slug belongs to (across all locales)
const reverseLookup = {}; // { pageType: { slug: { id, locale } } }
for (const [pageType, entries] of Object.entries(configs)) {
  reverseLookup[pageType] = {};
  for (const entry of entries) {
    for (const [locale, slug] of Object.entries(entry.slugs)) {
      reverseLookup[pageType][slug] = { id: entry.id, locale };
    }
  }
}

// Build forward lookup: (pageType, id, locale) -> slug
function getSlugForLocale(pageType, id, locale) {
  const entries = configs[pageType];
  if (!entries) return undefined;
  const entry = entries.find(e => e.id === id);
  if (!entry) return undefined;
  return entry.slugs[locale] || entry.slugs.en;
}

// Build valid slugs set per pageType per locale
function isValidSlug(pageType, slug, locale) {
  const entries = configs[pageType];
  if (!entries) return false;
  for (const entry of entries) {
    if (entry.slugs[locale] === slug) return true;
  }
  return false;
}

// ============================================================
// 2. WarriorPlus appId -> slug-config appId mapping
// ============================================================

const wpAppToSlugApp = {
  'wordsearch': 'word-search',
  'addition': 'image-addition',
  'matching': 'matching-app',
  'bingo': 'picture-bingo',
  'big-small': 'big-small-app',
  'chart-count': 'chart-count-color',
  'crossword': 'image-crossword',
  'cryptogram': 'image-cryptogram',
  'writing': 'writing-app',
};

// ============================================================
// 3. Hardcoded corrections for known broken slugs
//    Maps: broken slug -> { pageType, id } so we can look up
//    the correct locale-specific slug from the config.
// ============================================================

const CORRECTIONS = {
  // === EN app slugs ===
  'big-and-small-worksheets': { pageType: 'app', id: 'big-small-app' },
  'hidden-object-worksheets': { pageType: 'app', id: 'find-objects' },
  'more-or-less-worksheets': { pageType: 'app', id: 'more-less' },
  'pattern-worksheet-worksheets': { pageType: 'app', id: 'pattern-worksheet' },
  'wordsearch-worksheets': { pageType: 'app', id: 'word-search' },
  'handwriting-worksheets': { pageType: 'app', id: 'writing-app' },
  'bingo-worksheets': { pageType: 'app', id: 'picture-bingo' },
  'hidden-objects': { pageType: 'app', id: 'find-objects' },
  'maze': { pageType: 'app', id: 'picture-path' },

  // === DE app slugs ===
  'ausmalbilder-arbeitsblaetter': { pageType: 'app', id: 'coloring' },
  'versteckte-objekte-arbeitsblaetter': { pageType: 'app', id: 'find-objects' },
  'labyrinth-arbeitsblaetter': { pageType: 'app', id: 'picture-path' },
  'muster-raster-arbeitsblaetter': { pageType: 'app', id: 'pattern-worksheet' },
  'zaehlen-finden-arbeitsblaetter': { pageType: 'app', id: 'find-and-count' },

  // === IT app slugs ===
  'puzzle-griglia-schede': { pageType: 'app', id: 'grid-match' },
  'disegni-colorare-schede': { pageType: 'app', id: 'coloring' },
  'schede-matematica': { pageType: 'app', id: 'math-worksheet' },

  // === PT app slugs ===
  'letras-embaralhadas-fichas': { pageType: 'app', id: 'word-scramble' },
  'fichas-adicao': { pageType: 'app', id: 'image-addition' },
  'fichas-caligrafia': { pageType: 'app', id: 'writing-app' },
  'fichas-comboio-alfabeto': { pageType: 'app', id: 'alphabet-train' },
  'fichas-matematica': { pageType: 'app', id: 'math-worksheet' },
  'fichas-matematicas': { pageType: 'app', id: 'math-puzzle' },
  'soma-fichas': { pageType: 'app', id: 'image-addition' },
  'lectoescrita-fichas': { pageType: 'app', id: 'writing-app' },
  'desenho-fichas': { pageType: 'app', id: 'draw-and-color' },
  'desenho-quadricula-fichas': { pageType: 'app', id: 'draw-and-color' },
  'grafomotricidade-fichas': { pageType: 'app', id: 'drawing-lines' },
  'associacao-fichas': { pageType: 'app', id: 'matching-app' },
  'comboio-alfabeto-fichas': { pageType: 'app', id: 'alphabet-train' },
  'comboio-padroes-fichas': { pageType: 'app', id: 'pattern-train' },
  'palavras-cruzadas-fichas': { pageType: 'app', id: 'image-crossword' },
  'criptograma-fichas': { pageType: 'app', id: 'image-cryptogram' },
  'sopas-letras-fichas': { pageType: 'app', id: 'word-search' },
  'labirintos-imagens-fichas': { pageType: 'app', id: 'picture-path' },
  'puzzles-matematicos-fichas': { pageType: 'app', id: 'math-puzzle' },

  // === ES app slugs ===
  'colorear-fichas': { pageType: 'app', id: 'coloring' },
  'sudoku-fichas': { pageType: 'app', id: 'sudoku' },
  'bingo-worksheets': { pageType: 'app', id: 'picture-bingo' },

  // === NL app slugs ===
  'optel-werkbladen': { pageType: 'app', id: 'image-addition' },
  'aftrek-werkbladen': { pageType: 'app', id: 'subtraction' },
  'groot-en-klein-werkbladen': { pageType: 'app', id: 'big-small-app' },
  'code-optelling-werkbladen': { pageType: 'app', id: 'code-addition' },
  'ontbrekende-stukjes-werkbladen': { pageType: 'app', id: 'missing-pieces' },
  'welke-hoort-er-niet-bij-werkbladen': { pageType: 'app', id: 'odd-one-out' },
  'afbeeldingspad-werkbladen': { pageType: 'app', id: 'picture-path' },
  'ik-zie-ik-zie-werkbladen': { pageType: 'app', id: 'find-and-count' },
  'tel-en-vind-werkbladen': { pageType: 'app', id: 'find-and-count' },
  'raad-het-woord-werkbladen': { pageType: 'app', id: 'word-guess' },
  'woordraad-werkbladen': { pageType: 'app', id: 'word-guess' },
  'woordscramble-werkbladen': { pageType: 'app', id: 'word-scramble' },
  'geheimschrift-werkbladen': { pageType: 'app', id: 'image-cryptogram' },
  'zoek-de-voorwerpen-werkbladen': { pageType: 'app', id: 'find-objects' },
  'plaatjesbingo-werkbladen': { pageType: 'app', id: 'picture-bingo' },
  'meer-of-minder-werkbladen': { pageType: 'app', id: 'more-less' },
  'rekenpuzzel-werkbladen': { pageType: 'app', id: 'math-puzzle' },
  'rekenwerkblad-werkbladen': { pageType: 'app', id: 'math-worksheet' },

  // === EN tool slugs ===
  'image-subtraction': { pageType: 'tool', id: 'image-subtraction' },
  'addition-maker': { pageType: 'tool', id: 'image-addition' },

  // === DE tool slugs ===
  'bilder-bingo-ersteller': { pageType: 'tool', id: 'bingo' },
  'mathe-raetsel-arbeitsblatt-ersteller': { pageType: 'tool', id: 'math-puzzle' },
  'mehr-weniger-arbeitsblatt-ersteller': { pageType: 'tool', id: 'more-less' },
  'schattenbilder-zuordnen-ersteller': { pageType: 'tool', id: 'shadow-match' },
  'gross-und-klein-ersteller': { pageType: 'tool', id: 'big-small' },

  // === ES tool slugs ===
  'generador-fichas-emparejamiento': { pageType: 'tool', id: 'matching' },
  'generador-encuentra-diferente': { pageType: 'tool', id: 'odd-one-out' },
  'generador-sopas-letras': { pageType: 'tool', id: 'word-search' },
  'generador-fichas-sombras': { pageType: 'tool', id: 'shadow-match' },
  'generador-fichas-clasificacion': { pageType: 'tool', id: 'picture-sort' },
  'generador-fichas-cuadricula': { pageType: 'tool', id: 'grid-match' },
  'generador-fichas-piezas-faltantes': { pageType: 'tool', id: 'missing-pieces' },
  'generador-buscar-contar': { pageType: 'tool', id: 'find-and-count' },
  'generador-buscar-objetos': { pageType: 'tool', id: 'find-objects' },
  'generador-cuadricula-correspondencias': { pageType: 'tool', id: 'grid-match' },
  'generador-cuadricula-parejas': { pageType: 'tool', id: 'grid-match' },
  'generador-fichas-relacionar': { pageType: 'tool', id: 'matching' },
  'generador-fichas-parejas': { pageType: 'tool', id: 'matching' },
  'generador-letras-revueltas': { pageType: 'tool', id: 'word-scramble' },
  'generador-fichas-matematicas': { pageType: 'tool', id: 'math-worksheet' },
  'generador-rompecabezas-matematicos': { pageType: 'tool', id: 'math-puzzle' },
  'generador-laberinto-imagenes': { pageType: 'tool', id: 'picture-path' },
  'generador-emparejamiento': { pageType: 'tool', id: 'matching' },
  'generador-asociacion-sombras': { pageType: 'tool', id: 'shadow-match' },
  'creador-fichas-suma': { pageType: 'tool', id: 'image-addition' },
  'creador-fichas-resta': { pageType: 'tool', id: 'image-subtraction' },
  'creador-fichas-comparacion': { pageType: 'tool', id: 'more-less' },
  'creador-suma-codificada': { pageType: 'tool', id: 'code-addition' },

  // === PT tool slugs ===
  'gerador-encontra-conta': { pageType: 'tool', id: 'find-and-count' },
  'gerador-encontra-objetos': { pageType: 'tool', id: 'find-objects' },
  'gerador-busca-objetos': { pageType: 'tool', id: 'find-objects' },
  'gerador-fichas-colorir': { pageType: 'tool', id: 'coloring' },
  'gerador-fichas-desenho': { pageType: 'tool', id: 'draw-and-color' },
  'gerador-cartoes-bingo': { pageType: 'tool', id: 'bingo' },
  'criador-comboio-alfabeto': { pageType: 'tool', id: 'alphabet-train' },
  'gerador-sudoku': { pageType: 'tool', id: 'sudoku' },

  // === IT tool slugs ===
  'generatore-schede-sottrazione': { pageType: 'tool', id: 'image-subtraction' },

  // === NL tool slugs ===
  'woordzoeker-werkblad-maker': { pageType: 'tool', id: 'word-search' },
  'rekenpuzzel-werkblad-maker': { pageType: 'tool', id: 'math-puzzle' },
  'optelling-werkblad-maker': { pageType: 'tool', id: 'image-addition' },
  'matching-werkblad-maker': { pageType: 'tool', id: 'matching' },
  'schaduw-matching-werkblad-maker': { pageType: 'tool', id: 'shadow-match' },
  'sorteer-werkblad-maker': { pageType: 'tool', id: 'picture-sort' },
  'zoek-de-uitzondering-werkblad-maker': { pageType: 'tool', id: 'odd-one-out' },
  'ontbrekende-stukken-werkblad-maker': { pageType: 'tool', id: 'missing-pieces' },
  'schattenjacht-werkblad-maker': { pageType: 'tool', id: 'treasure-hunt' },
  'zoek-voorwerpen-werkblad-maker': { pageType: 'tool', id: 'find-objects' },
  'zoek-en-tel-werkblad-maker': { pageType: 'tool', id: 'find-and-count' },
  'plaatjespad-werkblad-maker': { pageType: 'tool', id: 'picture-path' },
  'alfabet-trein-werkblad-maker': { pageType: 'tool', id: 'alphabet-train' },
  'schrijfoefeningen-werkblad-maker': { pageType: 'tool', id: 'writing' },
  'schrijfwerkblad-maker': { pageType: 'tool', id: 'writing' },
  'code-optelling-werkblad-maker': { pageType: 'tool', id: 'code-addition' },
  'kleurplaten-werkblad-maker': { pageType: 'tool', id: 'coloring' },
  'patroontrein-werkblad-maker': { pageType: 'tool', id: 'pattern-train' },
  'lijnen-trekken-werkblad-maker': { pageType: 'tool', id: 'drawing-lines' },
  'teken-en-kleur-maker': { pageType: 'tool', id: 'draw-and-color' },
  'meer-of-minder-werkblad-maker': { pageType: 'tool', id: 'more-less' },
  'rekenwerkblad-werkblad-maker': { pageType: 'tool', id: 'math-worksheet' },
  'woordraad-werkblad-maker': { pageType: 'tool', id: 'word-guess' },
  'woordscramble-werkblad-maker': { pageType: 'tool', id: 'word-scramble' },
  'cryptogram-werkblad-maker': { pageType: 'tool', id: 'cryptogram' },
  'rastertekenen-werkblad-maker': { pageType: 'tool', id: 'draw-and-color' },
  'raster-puzzel-werkblad-maker': { pageType: 'tool', id: 'grid-match' },

  // === PT bundle slugs ===
  'pacote-busca-descobre': { pageType: 'bundle', id: 'search-bundle' },

  // === EN bundle slugs (puzzle-bundle is the bundleId, not a slug) ===
  'puzzle-bundle': { pageType: 'bundle', id: 'puzzle-bundle' },

  // === DE guide slugs ===
  'sprach-arbeitsblaetter-verkaufen-etsy': { pageType: 'guide', id: 'sell-word-search-etsy' },
  'vergleichs-arbeitsblaetter-erstellen': { pageType: 'guide', id: 'create-size-comparison-worksheets' },

  // === IT guide slugs ===
  'creare-bundle-schede-etsy': { pageType: 'guide', id: 'create-etsy-worksheet-bundles' },
  'creare-pagine-da-colorare': { pageType: 'guide', id: 'create-coloring-pages' },
  'aprire-negozio-stampabili-etsy': { pageType: 'guide', id: 'start-etsy-printable-shop' },
  'seo-etsy-stampabili-educativi': { pageType: 'guide', id: 'etsy-seo-educational-printables' },
  'rendimento-passivo-fichas': { pageType: 'guide', id: 'passive-income-worksheets' },

  // === PT guide slugs ===
  'compreender-licencas-comerciais': { pageType: 'guide', id: 'understanding-commercial-licenses' },
  'ganhar-dinheiro-livros-atividades-kdp': { pageType: 'guide', id: 'make-money-kdp-activity-books' },
  'kdp-vs-etsy-imprimiveis': { pageType: 'guide', id: 'kdp-vs-etsy-printables' },
  'livros-sopas-letras-kdp': { pageType: 'guide', id: 'word-search-books-kdp' },
  'seo-etsy-imprimiveis-educativos': { pageType: 'guide', id: 'etsy-seo-educational-printables' },
  'precos-imprimiveis-educativos': { pageType: 'guide', id: 'pricing-educational-printables' },

  // === ES tool slugs (alternative names) ===
  'generador-crucigramas': { pageType: 'tool', id: 'crossword' },

  // === Broken nextSteps guide slugs (EN) ===
  'create-handwriting-worksheets': { pageType: 'guide', id: 'create-handwriting-sheets' },
  'create-handwriting-practice-sheets': { pageType: 'guide', id: 'create-handwriting-sheets' },
  'create-word-search-worksheets': { pageType: 'guide', id: 'create-word-search-puzzles' },
  'create-pattern-train-worksheets': { pageType: 'guide', id: 'create-pattern-worksheets' },
  'create-big-and-small-worksheets': { pageType: 'guide', id: 'create-size-comparison-worksheets' },
  'create-coloring-worksheets': { pageType: 'guide', id: 'create-coloring-pages' },
  'create-more-or-less-worksheets': { pageType: 'guide', id: 'create-size-comparison-worksheets' },
  'create-alphabet-train-worksheets': { pageType: 'guide', id: 'create-alphabet-worksheets' },
  'create-picture-path-worksheets': { pageType: 'guide', id: 'create-maze-worksheets' },
  'create-missing-pieces-worksheets': { pageType: 'guide', id: 'create-missing-pieces-puzzles' },
  'create-odd-one-out-worksheets': { pageType: 'guide', id: 'create-odd-one-out-puzzles' },
  'create-pattern-recognition-worksheets': { pageType: 'guide', id: 'create-pattern-worksheets' },
  'create-drawing-lines-worksheets': { pageType: 'guide', id: 'create-drawing-worksheets' },
  'create-find-and-count-worksheets': { pageType: 'guide', id: 'create-counting-worksheets' },
  'create-word-guess-worksheets': { pageType: 'guide', id: 'create-preposition-worksheets' },
  'create-word-scramble-worksheets': { pageType: 'guide', id: 'create-cryptogram-puzzles' },
  'create-picture-sudoku-worksheets': { pageType: 'guide', id: 'create-picture-sudoku' },
  'create-grid-match-puzzles': { pageType: 'guide', id: 'create-missing-pieces-puzzles' },
  'create-comparison-worksheets': { pageType: 'guide', id: 'create-size-comparison-worksheets' },
  'create-puzzle-worksheets': { pageType: 'guide', id: 'create-missing-pieces-puzzles' },

  // === Broken nextSteps guide slugs (EN - these are actually START pages) ===
  // The safety net filter in rendering code handles the guide/start routing.
  // startId = the same as the EN slug for all start pages.
  'complete-guide-printable-business': { pageType: 'start', id: 'complete-guide-printable-business' },
  'commercial-license-guide': { pageType: 'start', id: 'commercial-license-guide' },
  'create-worksheets-that-sell': { pageType: 'start', id: 'create-worksheets-that-sell' },
  'amazon-kdp-activity-books': { pageType: 'start', id: 'amazon-kdp-activity-books' },
  'etsy-printable-business': { pageType: 'start', id: 'etsy-printable-business' },
  'create-multilingual-worksheets': { pageType: 'start', id: 'create-multilingual-worksheets' },
  'printable-business-income': { pageType: 'start', id: 'printable-business-income' },
  'printable-business-blueprint': { pageType: 'start', id: 'printable-business-blueprint' },
  'tools-for-printable-business': { pageType: 'start', id: 'tools-for-printable-business' },
  'marketing-printable-business': { pageType: 'start', id: 'marketing-printable-business' },
  'scaling-printable-business': { pageType: 'start', id: 'scaling-printable-business' },
  'printable-business-legal': { pageType: 'start', id: 'printable-business-legal' },
  'sell-language-worksheets-etsy': { pageType: 'guide', id: 'sell-word-search-etsy' },
  'sell-alphabet-worksheets-etsy': { pageType: 'guide', id: 'sell-word-search-etsy' },
  'maze-books-kdp': { pageType: 'guide', id: 'publish-puzzle-books-kdp' },
};

// ============================================================
// 4. Try to resolve a broken slug to the correct one
// ============================================================

function resolveSlug(pageType, brokenSlug, targetLocale) {
  // Strategy 0: Check hardcoded corrections map
  const correction = CORRECTIONS[brokenSlug];
  if (correction) {
    const correctSlug = getSlugForLocale(correction.pageType, correction.id, targetLocale);
    if (correctSlug) return correctSlug;
  }

  // Strategy 1: Check if slug exists in a different locale for same pageType
  const reverseEntry = reverseLookup[pageType]?.[brokenSlug];
  if (reverseEntry) {
    // Found in another locale - get correct slug for target locale
    const correctSlug = getSlugForLocale(pageType, reverseEntry.id, targetLocale);
    if (correctSlug) return correctSlug;
  }

  // Strategy 2: If pageType is 'app', try mapping through WP appId
  if (pageType === 'app') {
    const slugAppId = wpAppToSlugApp[brokenSlug] || brokenSlug;
    const entry = configs.app.find(e => e.id === slugAppId);
    if (entry) {
      return entry.slugs[targetLocale] || entry.slugs.en;
    }
  }

  // Strategy 3: Try to find by partial match (slug contains or is contained by a valid slug)
  const entries = configs[pageType];
  if (entries) {
    for (const entry of entries) {
      const validSlug = entry.slugs[targetLocale] || entry.slugs.en;
      // Check if it's a prefix/suffix match
      if (validSlug && (validSlug.includes(brokenSlug) || brokenSlug.includes(validSlug))) {
        return entry.slugs[targetLocale] || entry.slugs.en;
      }
    }
  }

  // Strategy 4: Try across all locales with partial matching
  if (entries) {
    for (const entry of entries) {
      for (const [loc, slug] of Object.entries(entry.slugs)) {
        if (slug && (slug.includes(brokenSlug) || brokenSlug.includes(slug))) {
          return entry.slugs[targetLocale] || entry.slugs.en;
        }
      }
    }
  }

  return undefined;
}

// ============================================================
// 4. Scan content files and validate/fix internalLinks
// ============================================================

const contentDirs = [
  { dir: 'app-content', pageType: 'app' },
  { dir: 'guide-content', pageType: 'guide' },
  { dir: 'tool-content', pageType: 'tool' },
  { dir: 'bundle-content', pageType: 'bundle' },
  { dir: 'start-content', pageType: 'start' },
  { dir: 'idea-content', pageType: 'idea' },
];

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

let totalBroken = 0;
let totalFixed = 0;
let totalUnresolved = 0;
const unresolvedList = [];

for (const { dir, pageType: contentPageType } of contentDirs) {
  const contentRoot = path.join(ROOT, dir);

  for (const locale of LOCALES) {
    const localeDir = path.join(contentRoot, locale);
    if (!fs.existsSync(localeDir)) continue;

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      let text = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Find all internalLinks entries: { pageType: 'xxx', slug: 'yyy', anchorText: 'zzz' }
      const linkRegex = /pageType:\s*'(\w+)'\s*,\s*slug:\s*'([^']+)'/g;
      let linkMatch;
      const replacements = [];

      while ((linkMatch = linkRegex.exec(text)) !== null) {
        const linkPageType = linkMatch[1];
        const slug = linkMatch[2];

        // Validate slug
        if (!isValidSlug(linkPageType, slug, locale)) {
          totalBroken++;
          const resolved = resolveSlug(linkPageType, slug, locale);

          if (resolved && resolved !== slug) {
            totalFixed++;
            replacements.push({ from: slug, to: resolved, pageType: linkPageType });
            console.log(`  FIX: ${dir}/${locale}/${file} | ${linkPageType}:${slug} -> ${resolved}`);
          } else {
            totalUnresolved++;
            unresolvedList.push({ file: `${dir}/${locale}/${file}`, pageType: linkPageType, slug, locale });
            console.log(`  BROKEN: ${dir}/${locale}/${file} | ${linkPageType}:${slug} (no resolution found)`);
          }
        }
      }

      // Also check nextSteps (guide/start content files have nextSteps with guide slugs)
      const nsReplacements = [];
      if (contentPageType === 'guide' || contentPageType === 'start') {
        // Match nextSteps block and find slug entries within it
        const nsBlockMatch = text.match(/nextSteps:\s*\[([\s\S]*?)\]\s*,/);
        if (nsBlockMatch) {
          const nsBlock = nsBlockMatch[1];
          const nsSlugRe = /slug:\s*'([^']+)'/g;
          let nsMatch;
          while ((nsMatch = nsSlugRe.exec(nsBlock)) !== null) {
            const nsSlug = nsMatch[1];
            // nextSteps always link to /guides/
            if (!isValidSlug('guide', nsSlug, locale)) {
              totalBroken++;
              const resolved = resolveSlug('guide', nsSlug, locale);
              if (resolved && resolved !== nsSlug) {
                totalFixed++;
                nsReplacements.push({ from: nsSlug, to: resolved });
                console.log(`  FIX-NS: ${dir}/${locale}/${file} | nextStep:${nsSlug} -> ${resolved}`);
              } else {
                totalUnresolved++;
                unresolvedList.push({ file: `${dir}/${locale}/${file}`, pageType: 'guide(nextStep)', slug: nsSlug, locale });
                console.log(`  BROKEN-NS: ${dir}/${locale}/${file} | nextStep:${nsSlug} (no resolution found)`);
              }
            }
          }
        }
      }

      // Apply replacements
      if (APPLY && (replacements.length > 0 || nsReplacements.length > 0)) {
        for (const { from, to, pageType: pt } of replacements) {
          // Use regex to handle any whitespace/newline between pageType and slug
          const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const escapedPt = pt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const re = new RegExp(
            `(pageType:\\s*'${escapedPt}'\\s*,\\s*(?:\\r?\\n\\s*)?)slug:\\s*'${escapedFrom}'`,
            'g'
          );
          text = text.replace(re, `$1slug: '${to}'`);
        }
        for (const { from, to } of nsReplacements) {
          // For nextSteps, just replace slug values (they don't have pageType)
          // Be careful to only replace within nextSteps context
          const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const re = new RegExp(`(slug:\\s*)'${escapedFrom}'`, 'g');
          text = text.replace(re, `$1'${to}'`);
        }
        fs.writeFileSync(filePath, text, 'utf8');
      }
    }
  }
}

console.log('\n========== SUMMARY ==========');
console.log(`Total broken slugs found: ${totalBroken}`);
console.log(`Auto-resolved: ${totalFixed}`);
console.log(`Unresolved: ${totalUnresolved}`);
if (APPLY) {
  console.log(`Mode: APPLIED fixes`);
} else {
  console.log(`Mode: DRY RUN (use --apply to fix)`);
}

if (unresolvedList.length > 0) {
  console.log('\n--- Unresolved broken links ---');
  for (const item of unresolvedList) {
    console.log(`  ${item.file} | ${item.pageType}:'${item.slug}' (locale: ${item.locale})`);
  }
}
