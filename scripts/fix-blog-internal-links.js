#!/usr/bin/env node
/**
 * fix-blog-internal-links.js
 *
 * Fixes broken internal link slugs in all 1,232 blog content files.
 * All internalLinks should use ENGLISH slugs since resolveInternalLinkSlug()
 * in the blog page.tsx handles locale-specific resolution at render time.
 *
 * Strategy:
 * 1. Parse all slug config files to build reverse lookup maps
 * 2. Add manual mappings for approximate/wrong slugs
 * 3. Replace every non-English slug with its English equivalent
 * 4. Fix pageType mismatches where needed
 */

const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(__dirname, '..', 'frontend', 'config');
const BLOG_DIR = path.join(CONFIG_DIR, 'blog-content');

// ============================================================
// 1. Parse slug config files
// ============================================================

function parseSlugConfig(filePath, arrayName, idField) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find all id + slugs pairs using a two-step approach
  const entries = [];

  // Step 1: Find each entry by its idField
  const idRegex = new RegExp(idField + "\\s*:\\s*'([^']+)'", 'g');
  let idMatch;
  while ((idMatch = idRegex.exec(content)) !== null) {
    const id = idMatch[1];

    // Step 2: From this position, find the slugs object
    const afterId = content.substring(idMatch.index);
    const slugsStart = afterId.indexOf('slugs:');
    if (slugsStart === -1) continue;

    const braceStart = afterId.indexOf('{', slugsStart);
    if (braceStart === -1) continue;

    // Find matching closing brace
    let depth = 0;
    let braceEnd = braceStart;
    for (let i = braceStart; i < afterId.length; i++) {
      if (afterId[i] === '{') depth++;
      if (afterId[i] === '}') depth--;
      if (depth === 0) { braceEnd = i; break; }
    }

    const slugsStr = afterId.substring(braceStart, braceEnd + 1);
    const slugs = {};

    // Parse individual locale: 'slug' pairs
    const slugRegex = /(\w+)\s*:\s*'([^']+)'/g;
    let slugMatch;
    while ((slugMatch = slugRegex.exec(slugsStr)) !== null) {
      slugs[slugMatch[1]] = slugMatch[2];
    }

    entries.push({ id, slugs });
  }

  return entries;
}

// Parse all config files
const appConfigs = parseSlugConfig(
  path.join(CONFIG_DIR, 'product-page-slugs.ts'),
  'productPageSlugs', 'appId'
);

const toolConfigs = parseSlugConfig(
  path.join(CONFIG_DIR, 'tool-page-slugs.ts'),
  'toolPageSlugs', 'toolId'
);

const guideConfigs = parseSlugConfig(
  path.join(CONFIG_DIR, 'guide-page-slugs.ts'),
  'guidePageSlugs', 'guideId'
);

const bundleConfigs = parseSlugConfig(
  path.join(CONFIG_DIR, 'bundle-page-slugs.ts'),
  'bundlePageSlugs', 'bundleId'
);

const startConfigs = parseSlugConfig(
  path.join(CONFIG_DIR, 'start-page-slugs.ts'),
  'startPageSlugs', 'startId'
);

const ideaConfigs = parseSlugConfig(
  path.join(CONFIG_DIR, 'idea-page-slugs.ts'),
  'ideaPageSlugs', 'ideaId'
);

console.log(`Parsed configs: ${appConfigs.length} apps, ${toolConfigs.length} tools, ${guideConfigs.length} guides, ${bundleConfigs.length} bundles, ${startConfigs.length} starts, ${ideaConfigs.length} ideas`);

// ============================================================
// 2. Build reverse lookup: any slug -> { pageType, englishSlug }
// ============================================================

// slugLookup maps: slug -> { pageType, englishSlug }
const slugLookup = new Map();

function addToLookup(configs, pageType, idToEnSlug) {
  for (const config of configs) {
    const enSlug = config.slugs.en;
    if (!enSlug) continue;

    // Map the ID itself
    slugLookup.set(`${pageType}:${config.id}`, { pageType, englishSlug: enSlug });

    // Map every locale slug to English slug
    for (const [locale, slug] of Object.entries(config.slugs)) {
      const key = `${pageType}:${slug}`;
      if (!slugLookup.has(key)) {
        slugLookup.set(key, { pageType, englishSlug: enSlug });
      }
      // Also add without pageType prefix for cross-type lookups
      if (!slugLookup.has(slug)) {
        slugLookup.set(slug, { pageType, englishSlug: enSlug });
      }
    }
  }
}

addToLookup(appConfigs, 'app', null);
addToLookup(toolConfigs, 'tool', null);
addToLookup(guideConfigs, 'guide', null);
addToLookup(bundleConfigs, 'bundle', null);
addToLookup(startConfigs, 'start', null);
addToLookup(ideaConfigs, 'idea', null);

// ============================================================
// 3. Manual mappings for broken/approximate slugs
// ============================================================

// Format: { slug: string, pageType?: string } -> { englishSlug: string, pageType: string }
// When pageType is specified in the key, it's type-specific. Otherwise applies to any type.

const manualMappings = new Map();

function addManual(slug, fromType, toSlug, toType) {
  const key = fromType ? `${fromType}:${slug}` : slug;
  manualMappings.set(key, { englishSlug: toSlug, pageType: toType });
}

// --- App broken slugs (short names without -worksheets) ---
addManual('wordsearch', 'app', 'word-search-worksheets', 'app');
addManual('word-search', 'app', 'word-search-worksheets', 'app');
addManual('matching', 'app', 'matching-worksheets', 'app');
addManual('coloring-pages', 'app', 'coloring-worksheets', 'app');
addManual('coloring', 'app', 'coloring-worksheets', 'app');
addManual('bingo', 'app', 'picture-bingo-worksheets', 'app');
addManual('addition', 'app', 'addition-worksheets', 'app');
addManual('subtraction', 'app', 'subtraction-worksheets', 'app');
addManual('crossword', 'app', 'crossword-worksheets', 'app');
addManual('math-puzzle', 'app', 'math-puzzle-worksheets', 'app');
addManual('prepositions', 'app', 'prepositions-worksheets', 'app');
addManual('drawing-lines', 'app', 'drawing-lines-worksheets', 'app');
addManual('treasure-hunt', 'app', 'treasure-hunt-worksheets', 'app');
addManual('big-small', 'app', 'big-small-worksheets', 'app');
addManual('find-and-count', 'app', 'find-and-count-worksheets', 'app');
addManual('handwriting-worksheets', 'app', 'writing-worksheets', 'app');
addManual('shadow-matching-worksheets', 'app', 'shadow-match-worksheets', 'app');
addManual('grid-matching-worksheets', 'app', 'grid-match-worksheets', 'app');
addManual('picture-maze-worksheets', 'app', 'picture-path-worksheets', 'app');
addManual('sorting-worksheets', 'app', 'picture-sort-worksheets', 'app');
addManual('alphabet-worksheets', 'app', 'alphabet-train-worksheets', 'app');
addManual('bingo-worksheets', 'app', 'picture-bingo-worksheets', 'app');
addManual('picture-sudoku-worksheets', 'app', 'sudoku-worksheets', 'app');
addManual('size-comparison-worksheets', 'app', 'big-small-worksheets', 'app');
addManual('preposition-worksheets', 'app', 'prepositions-worksheets', 'app');
addManual('maze-worksheets', 'app', 'picture-path-worksheets', 'app');
addManual('tracing-worksheets', 'app', 'drawing-lines-worksheets', 'app');
addManual('counting-worksheets', 'app', 'find-and-count-worksheets', 'app');
addManual('hidden-object-worksheets', 'app', 'find-objects-worksheets', 'app');
addManual('letter-spotting-worksheets', 'app', 'word-guess-worksheets', 'app');
addManual('word-guess', 'app', 'word-guess-worksheets', 'app');
addManual('word-scramble', 'app', 'word-scramble-worksheets', 'app');
addManual('math-worksheets', 'app', 'math-worksheets', 'app'); // already correct EN slug
addManual('sudoku', 'app', 'sudoku-worksheets', 'app');
addManual('odd-one-out', 'app', 'odd-one-out-worksheets', 'app');
addManual('pattern-worksheets', 'app', 'pattern-worksheets', 'app'); // already correct EN slug
addManual('pattern-train', 'app', 'pattern-train-worksheets', 'app');
addManual('draw-and-color', 'app', 'draw-and-color-worksheets', 'app');
addManual('chart-count', 'app', 'chart-count-worksheets', 'app');
addManual('code-addition', 'app', 'code-addition-worksheets', 'app');
addManual('cryptogram', 'app', 'cryptogram-worksheets', 'app');
addManual('find-objects', 'app', 'find-objects-worksheets', 'app');
addManual('grid-match', 'app', 'grid-match-worksheets', 'app');
addManual('missing-pieces', 'app', 'missing-pieces-worksheets', 'app');
addManual('more-less', 'app', 'more-less-worksheets', 'app');
addManual('picture-sort', 'app', 'picture-sort-worksheets', 'app');
addManual('picture-path', 'app', 'picture-path-worksheets', 'app');
addManual('shadow-match', 'app', 'shadow-match-worksheets', 'app');
addManual('writing', 'app', 'writing-worksheets', 'app');
addManual('handwriting', 'app', 'writing-worksheets', 'app');
addManual('image-addition', 'app', 'addition-worksheets', 'app');
addManual('image-crossword', 'app', 'crossword-worksheets', 'app');
addManual('image-cryptogram', 'app', 'cryptogram-worksheets', 'app');

// German app slugs that appear in blog files
addManual('alphabet-arbeitsblaetter', 'app', 'alphabet-train-worksheets', 'app');
addManual('handschrift-arbeitsblaetter', 'app', 'writing-worksheets', 'app');
addManual('nachspur-arbeitsblaetter', 'app', 'drawing-lines-worksheets', 'app');
addManual('malbild-arbeitsblaetter', 'app', 'coloring-worksheets', 'app');
addManual('bingo-arbeitsblaetter', 'app', 'picture-bingo-worksheets', 'app');
addManual('wortsuche-arbeitsblaetter', 'app', 'word-search-worksheets', 'app');
addManual('sudoku-arbeitsblaetter', 'app', 'sudoku-worksheets', 'app');
addManual('labyrinth-arbeitsblaetter', 'app', 'picture-path-worksheets', 'app');
addManual('rechenraetsel-arbeitsblaetter', 'app', 'math-puzzle-worksheets', 'app');
addManual('sortier-arbeitsblaetter', 'app', 'picture-sort-worksheets', 'app');

// French app slugs that appear in blog files
addManual('alphabet-fiches', 'app', 'alphabet-train-worksheets', 'app');
addManual('ecriture-fiches', 'app', 'writing-worksheets', 'app');
addManual('tracage-fiches', 'app', 'drawing-lines-worksheets', 'app');
addManual('bingo-fiches', 'app', 'picture-bingo-worksheets', 'app');
addManual('labyrinthe-fiches', 'app', 'picture-path-worksheets', 'app');
addManual('sudoku-fiches', 'app', 'sudoku-worksheets', 'app');
addManual('tri-fiches', 'app', 'picture-sort-worksheets', 'app');
addManual('coloriage-fiches', 'app', 'coloring-worksheets', 'app');
addManual('puzzle-maths-fiches', 'app', 'math-puzzle-worksheets', 'app');

// Spanish app slugs that appear in blog files
addManual('alfabeto-fichas', 'app', 'alphabet-train-worksheets', 'app');
addManual('escritura-fichas', 'app', 'writing-worksheets', 'app');
addManual('trazos-fichas', 'app', 'drawing-lines-worksheets', 'app');
addManual('bingo-fichas', 'app', 'picture-bingo-worksheets', 'app');
addManual('laberinto-fichas', 'app', 'picture-path-worksheets', 'app');
addManual('sudoku-fichas', 'app', 'sudoku-worksheets', 'app');
addManual('clasificacion-fichas', 'app', 'picture-sort-worksheets', 'app');
addManual('colorear-fichas', 'app', 'coloring-worksheets', 'app');
addManual('rompecabezas-matematicos-fichas', 'app', 'math-puzzle-worksheets', 'app');
addManual('sopa-de-letras-fichas', 'app', 'word-search-worksheets', 'app');

// Italian app slugs that appear in blog files
addManual('alfabeto-schede', 'app', 'alphabet-train-worksheets', 'app');
addManual('scrittura-schede', 'app', 'writing-worksheets', 'app');
addManual('pregrafismo-schede', 'app', 'drawing-lines-worksheets', 'app');
addManual('bingo-schede', 'app', 'picture-bingo-worksheets', 'app');
addManual('labirinto-schede', 'app', 'picture-path-worksheets', 'app');
addManual('sudoku-schede', 'app', 'sudoku-worksheets', 'app');
addManual('classificazione-schede', 'app', 'picture-sort-worksheets', 'app');
addManual('colorare-schede', 'app', 'coloring-worksheets', 'app');
addManual('puzzle-matematici-schede', 'app', 'math-puzzle-worksheets', 'app');
addManual('cerca-parole-schede', 'app', 'word-search-worksheets', 'app');

// Portuguese app slugs that appear in blog files
addManual('alfabeto-fichas', 'app', 'alphabet-train-worksheets', 'app');
addManual('caligrafia-fichas', 'app', 'writing-worksheets', 'app');
addManual('tracos-fichas', 'app', 'drawing-lines-worksheets', 'app');
addManual('bingo-fichas', 'app', 'picture-bingo-worksheets', 'app');
addManual('labirinto-fichas', 'app', 'picture-path-worksheets', 'app');
addManual('sudoku-fichas', 'app', 'sudoku-worksheets', 'app');
addManual('classificacao-fichas', 'app', 'picture-sort-worksheets', 'app');
addManual('colorir-fichas', 'app', 'coloring-worksheets', 'app');
addManual('caca-palavras-fichas', 'app', 'word-search-worksheets', 'app');

// Dutch app slugs
addManual('alfabet-werkbladen', 'app', 'alphabet-train-worksheets', 'app');
addManual('schrijf-werkbladen', 'app', 'writing-worksheets', 'app');
addManual('bingo-werkbladen', 'app', 'picture-bingo-worksheets', 'app');
addManual('doolhof-werkbladen', 'app', 'picture-path-worksheets', 'app');
addManual('sudoku-werkbladen', 'app', 'sudoku-worksheets', 'app');
addManual('sorteer-werkbladen', 'app', 'picture-sort-worksheets', 'app');
addManual('kleurplaten-werkbladen', 'app', 'coloring-worksheets', 'app');
addManual('woordzoeker-werkbladen', 'app', 'word-search-worksheets', 'app');
addManual('rekenpuzzel-werkbladen', 'app', 'math-puzzle-worksheets', 'app');

// Swedish app slugs
addManual('alfabetet-arbetsblad', 'app', 'alphabet-train-worksheets', 'app');
addManual('ordsoek-arbetsblad', 'app', 'word-search-worksheets', 'app');
addManual('skrivovningar-arbetsblad', 'app', 'writing-worksheets', 'app');
addManual('bingo-arbetsblad', 'app', 'picture-bingo-worksheets', 'app');
addManual('labyrint-arbetsblad', 'app', 'picture-path-worksheets', 'app');
addManual('mattepussel-arbetsblad', 'app', 'math-puzzle-worksheets', 'app');
addManual('sortering-arbetsblad', 'app', 'picture-sort-worksheets', 'app');
addManual('malarbilder-arbetsblad', 'app', 'coloring-worksheets', 'app');

// Danish app slugs
addManual('alfabet-arbejdsark', 'app', 'alphabet-train-worksheets', 'app');
addManual('ordsoegning-arbejdsark', 'app', 'word-search-worksheets', 'app');
addManual('bingo-arbejdsark', 'app', 'picture-bingo-worksheets', 'app');
addManual('sudoku-arbejdsark', 'app', 'sudoku-worksheets', 'app');
addManual('labyrint-arbejdsark', 'app', 'picture-path-worksheets', 'app');
addManual('malebog-arbejdsark', 'app', 'coloring-worksheets', 'app');

// Norwegian app slugs
addManual('alfabet-arbeidsark', 'app', 'alphabet-train-worksheets', 'app');
addManual('ordsoek-arbeidsark', 'app', 'word-search-worksheets', 'app');
addManual('bingo-arbeidsark', 'app', 'picture-bingo-worksheets', 'app');
addManual('sudoku-arbeidsark', 'app', 'sudoku-worksheets', 'app');
addManual('labyrint-arbeidsark', 'app', 'picture-path-worksheets', 'app');

// Finnish app slugs
addManual('aakkoset-tyoarkit', 'app', 'alphabet-train-worksheets', 'app');
addManual('sananhaku-tyoarkit', 'app', 'word-search-worksheets', 'app');
addManual('bingo-tyoarkit', 'app', 'picture-bingo-worksheets', 'app');
addManual('sudoku-tyoarkit', 'app', 'sudoku-worksheets', 'app');
addManual('labyrintti-tyoarkit', 'app', 'picture-path-worksheets', 'app');

// --- Tool broken slugs ---
addManual('code-addition-maker', 'tool', 'code-addition-worksheet-maker', 'tool');
addManual('alphabet-maker', 'tool', 'alphabet-train-maker', 'tool');
addManual('alphabet-worksheet-maker', 'tool', 'alphabet-train-maker', 'tool');
addManual('handwriting-maker', 'tool', 'handwriting-worksheet-maker', 'tool');
addManual('writing-maker', 'tool', 'handwriting-worksheet-maker', 'tool');
addManual('bingo-maker', 'tool', 'bingo-card-maker', 'tool');
addManual('coloring-maker', 'tool', 'coloring-page-maker', 'tool');
addManual('word-search-worksheet-maker', 'tool', 'word-search-maker', 'tool');
addManual('crossword-worksheet-maker', 'tool', 'crossword-maker', 'tool');
addManual('math-puzzle-worksheet-maker', 'tool', 'math-puzzle-maker', 'tool');
addManual('sudoku-worksheet-maker', 'tool', 'sudoku-maker', 'tool');
addManual('picture-path-maker', 'tool', 'picture-path-maker', 'tool');
addManual('picture-sort-maker', 'tool', 'picture-sort-maker', 'tool');
addManual('shadow-match-maker', 'tool', 'shadow-match-maker', 'tool');
addManual('grid-match-maker', 'tool', 'grid-match-maker', 'tool');
addManual('find-and-count-maker', 'tool', 'find-and-count-maker', 'tool');
addManual('find-objects-maker', 'tool', 'hidden-object-maker', 'tool');
addManual('hidden-object-worksheet-maker', 'tool', 'hidden-object-maker', 'tool');
addManual('treasure-hunt-worksheet-maker', 'tool', 'treasure-hunt-maker', 'tool');
addManual('missing-pieces-maker', 'tool', 'missing-pieces-maker', 'tool');
addManual('odd-one-out-worksheet-maker', 'tool', 'odd-one-out-maker', 'tool');
addManual('drawing-lines-worksheet-maker', 'tool', 'drawing-lines-maker', 'tool');
addManual('chart-count-maker', 'tool', 'chart-count-maker', 'tool');
addManual('pattern-train-maker', 'tool', 'pattern-train-maker', 'tool');
addManual('pattern-worksheet-maker', 'tool', 'pattern-worksheet-maker', 'tool');
addManual('more-less-maker', 'tool', 'more-or-less-worksheet-maker', 'tool');
addManual('more-or-less-maker', 'tool', 'more-or-less-worksheet-maker', 'tool');
addManual('draw-and-color-maker', 'tool', 'draw-and-color-maker', 'tool');
addManual('subtraction-maker', 'tool', 'subtraction-worksheet-maker', 'tool');
addManual('addition-maker', 'tool', 'addition-worksheet-maker', 'tool');

// French tool slugs
addManual('alphabet-fiches', 'tool', 'alphabet-train-maker', 'tool');
addManual('generateur-alphabet', 'tool', 'alphabet-train-maker', 'tool');

// --- Bundle broken slugs ---
addManual('math-number-bundle', 'bundle', 'math-mastery-bundle', 'bundle');
addManual('puzzle-games-bundle', 'bundle', 'puzzles-logic-bundle', 'bundle');
addManual('letters-words-bundle', 'bundle', 'literacy-language-bundle', 'bundle');
addManual('drawing-art-bundle', 'bundle', 'visual-learning-bundle', 'bundle');
addManual('pattern-logic-bundle', 'bundle', 'matching-sorting-bundle', 'bundle');
addManual('activity-bundle', 'bundle', 'math-mastery-bundle', 'bundle');
addManual('literacy-bundle', 'bundle', 'literacy-language-bundle', 'bundle');
addManual('visual-bundle', 'bundle', 'visual-learning-bundle', 'bundle');
addManual('matching-bundle', 'bundle', 'matching-sorting-bundle', 'bundle');
addManual('puzzle-bundle', 'bundle', 'puzzles-logic-bundle', 'bundle');
addManual('search-bundle', 'bundle', 'search-find-bundle', 'bundle');
addManual('math-bundle', 'bundle', 'math-mastery-bundle', 'bundle');

// German bundle slugs
addManual('mathematik-paket', 'bundle', 'math-mastery-bundle', 'bundle');
addManual('lese-sprach-paket', 'bundle', 'literacy-language-bundle', 'bundle');
addManual('visuelles-lernen-paket', 'bundle', 'visual-learning-bundle', 'bundle');
addManual('zuordnung-sortierung-paket', 'bundle', 'matching-sorting-bundle', 'bundle');
addManual('raetsel-logik-paket', 'bundle', 'puzzles-logic-bundle', 'bundle');
addManual('suchen-finden-paket', 'bundle', 'search-find-bundle', 'bundle');

// French bundle slugs
addManual('pack-maitrise-maths', 'bundle', 'math-mastery-bundle', 'bundle');
addManual('pack-lecture-langage', 'bundle', 'literacy-language-bundle', 'bundle');
addManual('pack-apprentissage-visuel', 'bundle', 'visual-learning-bundle', 'bundle');
addManual('pack-association-tri', 'bundle', 'matching-sorting-bundle', 'bundle');
addManual('pack-puzzles-logique', 'bundle', 'puzzles-logic-bundle', 'bundle');
addManual('pack-cherche-trouve', 'bundle', 'search-find-bundle', 'bundle');

// --- Start broken slugs ---
addManual('sell-educational-printables-etsy', 'start', 'sell-educational-printables-etsy', 'guide');
addManual('sell-worksheets-etsy', 'start', 'create-worksheets-that-sell', 'start');
addManual('start-etsy-printable-shop', 'start', 'etsy-printable-business', 'start');
addManual('start-etsy-shop', 'start', 'etsy-printable-business', 'start');
addManual('sell-math-worksheets-etsy', 'start', 'sell-math-worksheets-etsy', 'guide');

// German start slugs
addManual('druckvorlagen-auf-etsy-verkaufen', 'start', 'etsy-printable-business', 'start');
addManual('etsy-druckvorlagen-geschaeft', 'start', 'etsy-printable-business', 'start');
addManual('komplettanleitung-druckvorlagen-geschaeft', 'start', 'complete-guide-printable-business', 'start');
addManual('druckvorlagen-geschaeft-bauplan', 'start', 'printable-business-blueprint', 'start');

// French start slugs
addManual('guide-complet-activite-imprimables', 'start', 'complete-guide-printable-business', 'start');
addManual('activite-imprimables-etsy', 'start', 'etsy-printable-business', 'start');
addManual('plan-activite-imprimables', 'start', 'printable-business-blueprint', 'start');

// Spanish start slugs
addManual('guia-completa-negocio-imprimibles', 'start', 'complete-guide-printable-business', 'start');
addManual('negocio-imprimibles-etsy', 'start', 'etsy-printable-business', 'start');
addManual('plan-negocio-imprimibles', 'start', 'printable-business-blueprint', 'start');

// Italian start slugs
addManual('guida-completa-attivita-stampabili', 'start', 'complete-guide-printable-business', 'start');
addManual('attivita-stampabili-etsy', 'start', 'etsy-printable-business', 'start');
addManual('piano-attivita-stampabili', 'start', 'printable-business-blueprint', 'start');

// Portuguese start slugs
addManual('guia-completo-negocio-imprimiveis', 'start', 'complete-guide-printable-business', 'start');
addManual('negocio-imprimiveis-etsy', 'start', 'etsy-printable-business', 'start');
addManual('plano-negocio-imprimiveis', 'start', 'printable-business-blueprint', 'start');

// Dutch start slugs
addManual('complete-gids-printable-bedrijf', 'start', 'complete-guide-printable-business', 'start');
addManual('etsy-printable-bedrijf', 'start', 'etsy-printable-business', 'start');
addManual('blauwdruk-printable-bedrijf', 'start', 'printable-business-blueprint', 'start');
addManual('printables-verkopen-etsy', 'start', 'etsy-printable-business', 'start');

// Swedish start slugs
addManual('komplett-guide-utskriftsbart-foretagande', 'start', 'complete-guide-printable-business', 'start');
addManual('etsy-utskriftsbart-foretag', 'start', 'etsy-printable-business', 'start');
addManual('saelj-utskrifter-etsy', 'start', 'etsy-printable-business', 'start');
addManual('ritning-utskriftsbart-foretag', 'start', 'printable-business-blueprint', 'start');

// Danish start slugs
addManual('komplet-guide-printbar-forretning', 'start', 'complete-guide-printable-business', 'start');
addManual('etsy-printbar-forretning', 'start', 'etsy-printable-business', 'start');
addManual('printbar-forretning-plan', 'start', 'printable-business-blueprint', 'start');

// Norwegian start slugs
addManual('komplett-guide-utskriftsbar-forretning', 'start', 'complete-guide-printable-business', 'start');
addManual('etsy-utskriftsbar-forretning', 'start', 'etsy-printable-business', 'start');
addManual('utskriftsbar-forretning-plan', 'start', 'printable-business-blueprint', 'start');

// --- Guide broken slugs ---
addManual('create-worksheets', 'guide', 'create-addition-worksheets', 'guide');
addManual('niches-imprimables', 'guide', 'best-kdp-activity-book-niches', 'guide');
addManual('nichos-imprimibles-rentables', 'guide', 'research-profitable-niches', 'guide');
addManual('guide-creation-fiches', 'guide', 'create-addition-worksheets', 'guide');
addManual('crear-fichas-educativas', 'guide', 'create-addition-worksheets', 'guide');
addManual('creare-schede-educative', 'guide', 'create-addition-worksheets', 'guide');
addManual('criar-fichas-educativas', 'guide', 'create-addition-worksheets', 'guide');
addManual('werkbladen-maken', 'guide', 'create-addition-worksheets', 'guide');
addManual('arbeitsblaetter-erstellen', 'guide', 'create-addition-worksheets', 'guide');
addManual('create-worksheets-guide', 'guide', 'create-addition-worksheets', 'guide');
addManual('printable-business-ideas', 'guide', 'niche-selection-printables', 'guide');

// French guide slugs that are localized
addManual('creer-fiches-addition', 'guide', 'create-addition-worksheets', 'guide');
addManual('creer-mots-caches', 'guide', 'create-word-search-puzzles', 'guide');
addManual('creer-mots-croises', 'guide', 'create-crossword-puzzles', 'guide');
addManual('niches-imprimables', 'guide', 'best-kdp-activity-book-niches', 'guide');
addManual('ouvrir-boutique-etsy-imprimables', 'guide', 'start-etsy-printable-shop', 'guide');

// Spanish guide slugs
addManual('crear-fichas-suma', 'guide', 'create-addition-worksheets', 'guide');
addManual('crear-sopas-letras', 'guide', 'create-word-search-puzzles', 'guide');
addManual('crear-crucigramas', 'guide', 'create-crossword-puzzles', 'guide');
addManual('nichos-imprimibles-rentables', 'guide', 'research-profitable-niches', 'guide');
addManual('abrir-tienda-etsy-imprimibles', 'guide', 'start-etsy-printable-shop', 'guide');

// German guide slugs
addManual('additions-arbeitsblaetter-erstellen', 'guide', 'create-addition-worksheets', 'guide');
addManual('wortsuche-raetsel-erstellen', 'guide', 'create-word-search-puzzles', 'guide');
addManual('kreuzwortraetsel-erstellen', 'guide', 'create-crossword-puzzles', 'guide');
addManual('etsy-druckvorlagen-shop-starten', 'guide', 'start-etsy-printable-shop', 'guide');

// Italian guide slugs
addManual('creare-schede-addizione', 'guide', 'create-addition-worksheets', 'guide');
addManual('creare-cerca-parole', 'guide', 'create-word-search-puzzles', 'guide');
addManual('creare-cruciverba', 'guide', 'create-crossword-puzzles', 'guide');

// Portuguese guide slugs
addManual('criar-fichas-adicao', 'guide', 'create-addition-worksheets', 'guide');
addManual('criar-caca-palavras', 'guide', 'create-word-search-puzzles', 'guide');
addManual('criar-palavras-cruzadas', 'guide', 'create-crossword-puzzles', 'guide');

// Dutch guide slugs
addManual('optellen-werkbladen-maken', 'guide', 'create-addition-worksheets', 'guide');
addManual('woordzoekers-maken', 'guide', 'create-word-search-puzzles', 'guide');
addManual('kruiswoordpuzzels-maken', 'guide', 'create-crossword-puzzles', 'guide');

// --- Idea broken slugs (generic form) ---
addManual('printable-business-ideas', 'idea', 'christmas-printable-ideas', 'idea');
addManual('etsy-coloring-pages', 'idea', 'christmas-printable-ideas', 'idea');
addManual('etsy-worksheet-bundles', 'idea', 'christmas-printable-ideas', 'idea');
addManual('math-worksheet-ideas', 'idea', 'math-facts-printable-ideas', 'idea');
addManual('etsy-printable-niches', 'idea', 'christmas-printable-ideas', 'idea');
addManual('handwriting-printables-niche', 'idea', 'preschool-printable-ideas', 'idea');
addManual('toddler-printables-niche', 'idea', 'preschool-printable-ideas', 'idea');
addManual('multilingual-worksheets-niche', 'idea', 'esl-printable-ideas', 'idea');
addManual('seasonal-printable-ideas', 'idea', 'christmas-printable-ideas', 'idea');
addManual('subtraction-printables-niche', 'idea', 'math-facts-printable-ideas', 'idea');
addManual('word-search-business-ideas', 'idea', 'christmas-printable-ideas', 'idea');

// --- Additional German app slugs (fabricated localized forms) ---
addManual('kreuzwortraetsel-arbeitsblaetter', 'app', 'crossword-worksheets', 'app');
addManual('finde-und-zaehle-arbeitsblaetter', 'app', 'find-and-count-worksheets', 'app');
addManual('groessenvergleich-arbeitsblaetter', 'app', 'big-small-worksheets', 'app');
addManual('suchbild-arbeitsblaetter', 'app', 'find-objects-worksheets', 'app');
addManual('gitter-zuordnungs-arbeitsblaetter', 'app', 'grid-match-worksheets', 'app');
addManual('schatten-zuordnung-arbeitsblaetter', 'app', 'shadow-match-worksheets', 'app');
addManual('bilder-labyrinth-arbeitsblaetter', 'app', 'picture-path-worksheets', 'app');
addManual('code-additions-arbeitsblaetter', 'app', 'code-addition-worksheets', 'app');
addManual('bilder-sudoku-arbeitsblaetter', 'app', 'sudoku-worksheets', 'app');
addManual('muster-arbeitsblaetter', 'app', 'pattern-worksheets', 'app');
addManual('diagramm-zaehlen-arbeitsblaetter', 'app', 'chart-count-worksheets', 'app');
addManual('zeichnen-und-ausmalen-arbeitsblaetter', 'app', 'draw-and-color-worksheets', 'app');
addManual('subtraktions-arbeitsblaetter', 'app', 'subtraction-worksheets', 'app');
addManual('kryptogramm-arbeitsblaetter', 'app', 'cryptogram-worksheets', 'app');
addManual('fehlende-teile-arbeitsblaetter', 'app', 'missing-pieces-worksheets', 'app');
addManual('wort-ratespiel-arbeitsblaetter', 'app', 'word-guess-worksheets', 'app');

// --- Additional French app slugs (fabricated localized forms) ---
addManual('trouver-et-compter-fiches', 'app', 'find-and-count-worksheets', 'app');
addManual('code-addition-fiches', 'app', 'code-addition-worksheets', 'app');
addManual('mots-croises-fiches', 'app', 'crossword-worksheets', 'app');
addManual('objets-caches-fiches', 'app', 'find-objects-worksheets', 'app');
addManual('puzzles-maths-fiches', 'app', 'math-puzzle-worksheets', 'app');
addManual('comparaison-tailles-fiches', 'app', 'big-small-worksheets', 'app');
addManual('sudoku-images-fiches', 'app', 'sudoku-worksheets', 'app');
addManual('motifs-fiches', 'app', 'pattern-worksheets', 'app');
addManual('diagramme-comptage-fiches', 'app', 'chart-count-worksheets', 'app');
addManual('dessiner-et-colorier-fiches', 'app', 'draw-and-color-worksheets', 'app');
addManual('cryptogramme-fiches', 'app', 'cryptogram-worksheets', 'app');
addManual('grille-association-fiches', 'app', 'grid-match-worksheets', 'app');
addManual('association-ombres-fiches', 'app', 'shadow-match-worksheets', 'app');
addManual('soustraction-fiches', 'app', 'subtraction-worksheets', 'app');
addManual('pieces-manquantes-fiches', 'app', 'missing-pieces-worksheets', 'app');
addManual('intrus-fiches', 'app', 'odd-one-out-worksheets', 'app');
addManual('plus-moins-fiches', 'app', 'more-less-worksheets', 'app');
addManual('labyrinthes-images-fiches', 'app', 'picture-path-worksheets', 'app');
addManual('chasse-tresor-fiches', 'app', 'treasure-hunt-worksheets', 'app');
addManual('anagrammes-fiches', 'app', 'word-scramble-worksheets', 'app');
addManual('train-motifs-fiches', 'app', 'pattern-train-worksheets', 'app');
addManual('prepositions-fiches', 'app', 'prepositions-worksheets', 'app');
addManual('devinettes-mots-fiches', 'app', 'word-guess-worksheets', 'app');
addManual('association-fiches', 'app', 'matching-worksheets', 'app');

// --- Additional Spanish app slugs (fabricated localized forms) ---
addManual('puzzles-matematicos-fichas', 'app', 'math-puzzle-worksheets', 'app');
addManual('crucigramas-fichas', 'app', 'crossword-worksheets', 'app');
addManual('patrones-fichas', 'app', 'pattern-worksheets', 'app');
addManual('criptogramas-fichas', 'app', 'cryptogram-worksheets', 'app');
addManual('intruso-fichas', 'app', 'odd-one-out-worksheets', 'app');
addManual('anagramas-fichas', 'app', 'word-scramble-worksheets', 'app');
addManual('asociacion-fichas', 'app', 'matching-worksheets', 'app');
addManual('comparacion-tamanos-fichas', 'app', 'big-small-worksheets', 'app');
addManual('codigo-suma-fichas', 'app', 'code-addition-worksheets', 'app');
addManual('trazado-fichas', 'app', 'drawing-lines-worksheets', 'app');
addManual('objetos-ocultos-fichas', 'app', 'find-objects-worksheets', 'app');
addManual('sudoku-imagenes-fichas', 'app', 'sudoku-worksheets', 'app');
addManual('buscar-y-contar-fichas', 'app', 'find-and-count-worksheets', 'app');
addManual('mas-menos-fichas', 'app', 'more-less-worksheets', 'app');
addManual('cuadricula-asociacion-fichas', 'app', 'grid-match-worksheets', 'app');
addManual('asociacion-sombras-fichas', 'app', 'shadow-match-worksheets', 'app');
addManual('resta-fichas', 'app', 'subtraction-worksheets', 'app');
addManual('busqueda-tesoro-fichas', 'app', 'treasure-hunt-worksheets', 'app');
addManual('graficos-conteo-fichas', 'app', 'chart-count-worksheets', 'app');
addManual('piezas-faltantes-fichas', 'app', 'missing-pieces-worksheets', 'app');
addManual('laberintos-imagenes-fichas', 'app', 'picture-path-worksheets', 'app');
addManual('dibujar-y-colorear-fichas', 'app', 'draw-and-color-worksheets', 'app');
addManual('tren-patrones-fichas', 'app', 'pattern-train-worksheets', 'app');
addManual('adivinar-palabras-fichas', 'app', 'word-guess-worksheets', 'app');
addManual('preposiciones-fichas', 'app', 'prepositions-worksheets', 'app');
addManual('matematicas-fichas', 'app', 'math-worksheets', 'app');
addManual('sopa-de-letras-fichas', 'app', 'word-search-worksheets', 'app');

// --- Additional Italian app slugs (fabricated localized forms) ---
addManual('cruciverba-schede', 'app', 'crossword-worksheets', 'app');
addManual('ricalco-schede', 'app', 'drawing-lines-worksheets', 'app');
addManual('intruso-schede', 'app', 'odd-one-out-worksheets', 'app');
addManual('motivi-schede', 'app', 'pattern-worksheets', 'app');
addManual('sudoku-immagini-schede', 'app', 'sudoku-worksheets', 'app');
addManual('abbinamento-schede', 'app', 'matching-worksheets', 'app');
addManual('codice-addizione-schede', 'app', 'code-addition-worksheets', 'app');
addManual('crittogrammi-schede', 'app', 'cryptogram-worksheets', 'app');
addManual('piu-meno-schede', 'app', 'more-less-worksheets', 'app');
addManual('labirinti-immagini-schede', 'app', 'picture-path-worksheets', 'app');
addManual('caccia-tesoro-schede', 'app', 'treasure-hunt-worksheets', 'app');
addManual('trova-e-conta-schede', 'app', 'find-and-count-worksheets', 'app');
addManual('tombola-schede', 'app', 'picture-bingo-worksheets', 'app');
addManual('disegnare-e-colorare-schede', 'app', 'draw-and-color-worksheets', 'app');
addManual('griglia-abbinamento-schede', 'app', 'grid-match-worksheets', 'app');
addManual('abbinamento-ombre-schede', 'app', 'shadow-match-worksheets', 'app');
addManual('sottrazione-schede', 'app', 'subtraction-worksheets', 'app');
addManual('confronto-dimensioni-schede', 'app', 'big-small-worksheets', 'app');
addManual('anagrammi-schede', 'app', 'word-scramble-worksheets', 'app');
addManual('pezzi-mancanti-schede', 'app', 'missing-pieces-worksheets', 'app');
addManual('oggetti-nascosti-schede', 'app', 'find-objects-worksheets', 'app');
addManual('treno-motivi-schede', 'app', 'pattern-train-worksheets', 'app');
addManual('preposizioni-schede', 'app', 'prepositions-worksheets', 'app');
addManual('indovina-parola-schede', 'app', 'word-guess-worksheets', 'app');

// --- Additional Portuguese app slugs (fabricated localized forms) ---
addManual('padroes-fichas', 'app', 'pattern-worksheets', 'app');
addManual('encontrar-e-contar-fichas', 'app', 'find-and-count-worksheets', 'app');
addManual('sudoku-imagens-fichas', 'app', 'sudoku-worksheets', 'app');
addManual('labirintos-imagens-fichas', 'app', 'picture-path-worksheets', 'app');
addManual('comparacao-tamanhos-fichas', 'app', 'big-small-worksheets', 'app');
addManual('tracado-fichas', 'app', 'drawing-lines-worksheets', 'app');
addManual('associacao-fichas', 'app', 'matching-worksheets', 'app');
addManual('palavras-cruzadas-fichas', 'app', 'crossword-worksheets', 'app');
addManual('objetos-escondidos-fichas', 'app', 'find-objects-worksheets', 'app');
addManual('grade-associacao-fichas', 'app', 'grid-match-worksheets', 'app');
addManual('graficos-contagem-fichas', 'app', 'chart-count-worksheets', 'app');
addManual('desenhar-e-colorir-fichas', 'app', 'draw-and-color-worksheets', 'app');
addManual('associacao-sombras-fichas', 'app', 'shadow-match-worksheets', 'app');
addManual('subtracao-fichas', 'app', 'subtraction-worksheets', 'app');
addManual('pecas-faltantes-fichas', 'app', 'missing-pieces-worksheets', 'app');
addManual('mais-menos-fichas', 'app', 'more-less-worksheets', 'app');
addManual('trem-padroes-fichas', 'app', 'pattern-train-worksheets', 'app');
addManual('caca-tesouro-fichas', 'app', 'treasure-hunt-worksheets', 'app');
addManual('adivinhar-palavras-fichas', 'app', 'word-guess-worksheets', 'app');
addManual('codigo-adicao-fichas', 'app', 'code-addition-worksheets', 'app');
addManual('preposicoes-fichas', 'app', 'prepositions-worksheets', 'app');

// --- Additional Dutch app slugs (fabricated localized forms) ---
addManual('zoek-voorwerp-werkbladen', 'app', 'find-objects-worksheets', 'app');
addManual('raster-koppel-werkbladen', 'app', 'grid-match-worksheets', 'app');
addManual('handschrift-werkbladen', 'app', 'writing-worksheets', 'app');
addManual('overtrek-werkbladen', 'app', 'drawing-lines-worksheets', 'app');
addManual('plaatjes-doolhof-werkbladen', 'app', 'picture-path-worksheets', 'app');
addManual('schaduw-koppel-werkbladen', 'app', 'shadow-match-worksheets', 'app');
addManual('woordkraker-werkbladen', 'app', 'word-scramble-worksheets', 'app');
addManual('cryptogram-werkbladen', 'app', 'cryptogram-worksheets', 'app');
addManual('zoek-en-tel-werkbladen', 'app', 'find-and-count-worksheets', 'app');
addManual('meer-minder-werkbladen', 'app', 'more-less-worksheets', 'app');
addManual('aftrekken-werkbladen', 'app', 'subtraction-worksheets', 'app');
addManual('kruiswoordpuzzel-werkbladen', 'app', 'crossword-worksheets', 'app');
addManual('plaatjes-sudoku-werkbladen', 'app', 'sudoku-worksheets', 'app');
addManual('patronen-werkbladen', 'app', 'pattern-worksheets', 'app');
addManual('code-optellen-werkbladen', 'app', 'code-addition-worksheets', 'app');
addManual('teken-en-kleur-werkbladen', 'app', 'draw-and-color-worksheets', 'app');
addManual('koppel-werkbladen', 'app', 'matching-worksheets', 'app');
addManual('ontbrekende-stukjes-werkbladen', 'app', 'missing-pieces-worksheets', 'app');
addManual('buitenbeentje-werkbladen', 'app', 'odd-one-out-worksheets', 'app');
addManual('patronen-trein-werkbladen', 'app', 'pattern-train-worksheets', 'app');
addManual('voorzetsels-werkbladen', 'app', 'prepositions-worksheets', 'app');
addManual('groottevergelijking-werkbladen', 'app', 'big-small-worksheets', 'app');
addManual('speurtocht-werkbladen', 'app', 'treasure-hunt-worksheets', 'app');
addManual('woord-raad-werkbladen', 'app', 'word-guess-worksheets', 'app');

// --- Additional Danish app slugs (fabricated localized forms) ---
addManual('farvelaegning-arbejdsark', 'app', 'coloring-worksheets', 'app');
addManual('banko-arbejdsark', 'app', 'picture-bingo-worksheets', 'app');
addManual('haandskrift-arbejdsark', 'app', 'writing-worksheets', 'app');
addManual('spoer-arbejdsark', 'app', 'drawing-lines-worksheets', 'app');
addManual('sorterings-arbejdsark', 'app', 'picture-sort-worksheets', 'app');
addManual('kode-addition-arbejdsark', 'app', 'code-addition-worksheets', 'app');
addManual('billed-sudoku-arbejdsark', 'app', 'sudoku-worksheets', 'app');
addManual('kryptogram-arbejdsark', 'app', 'cryptogram-worksheets', 'app');
addManual('skyggematching-arbejdsark', 'app', 'shadow-match-worksheets', 'app');
addManual('gitter-matchning-arbejdsark', 'app', 'grid-match-worksheets', 'app');
addManual('skjulte-genstande-arbejdsark', 'app', 'find-objects-worksheets', 'app');
addManual('billedlabyrint-arbejdsark', 'app', 'picture-path-worksheets', 'app');
addManual('mere-mindre-arbejdsark', 'app', 'more-less-worksheets', 'app');
addManual('stoerrelsesammenligning-arbejdsark', 'app', 'big-small-worksheets', 'app');
addManual('moenster-tog-arbejdsark', 'app', 'pattern-train-worksheets', 'app');
addManual('find-fejlen-arbejdsark', 'app', 'odd-one-out-worksheets', 'app');
addManual('praepositioner-arbejdsark', 'app', 'prepositions-worksheets', 'app');
addManual('ordgaettespil-arbejdsark', 'app', 'word-guess-worksheets', 'app');
addManual('bogstavmix-arbejdsark', 'app', 'word-scramble-worksheets', 'app');

// --- Additional Swedish app slugs (fabricated localized forms) ---
addManual('korsord-arbetsblad', 'app', 'crossword-worksheets', 'app');
addManual('alfabet-arbetsblad', 'app', 'alphabet-train-worksheets', 'app');
addManual('handskrivning-arbetsblad', 'app', 'writing-worksheets', 'app');
addManual('spoera-arbetsblad', 'app', 'drawing-lines-worksheets', 'app');
addManual('matchning-arbetsblad', 'app', 'matching-worksheets', 'app');
addManual('hitta-och-raekna-arbetsblad', 'app', 'find-and-count-worksheets', 'app');

// --- Additional Norwegian app slugs (fabricated localized forms) ---
addManual('bokstavoppgaver-arbeidsark', 'app', 'word-scramble-worksheets', 'app');
addManual('bildekryssord-arbeidsark', 'app', 'crossword-worksheets', 'app');

// --- Additional Finnish app slugs (fabricated localized forms) ---
addManual('aakkosjuna-tyoarkit', 'app', 'alphabet-train-worksheets', 'app');
addManual('kasinkirjoitus-tyoarkit', 'app', 'writing-worksheets', 'app');
addManual('etsi-ja-laske-tyoarkit', 'app', 'find-and-count-worksheets', 'app');
addManual('etsi-esineet-tyoarkit', 'app', 'find-objects-worksheets', 'app');
addManual('sanansekoitus-tyoarkit', 'app', 'word-scramble-worksheets', 'app');

// --- Additional tool broken slugs (fabricated localized forms) ---
addManual('grid-matching-maker', 'tool', 'grid-match-maker', 'tool');
addManual('picture-maze-maker', 'tool', 'picture-path-maker', 'tool');
addManual('picture-sudoku-maker', 'tool', 'sudoku-maker', 'tool');
addManual('preposition-maker', 'tool', 'prepositions-worksheet-maker', 'tool');
addManual('shadow-matching-maker', 'tool', 'shadow-match-maker', 'tool');
addManual('size-comparison-maker', 'tool', 'big-and-small-worksheet-maker', 'tool');
addManual('sorting-worksheet-maker', 'tool', 'picture-sort-maker', 'tool');

// French tool slugs
addManual('bingo-fiches', 'tool', 'bingo-card-maker', 'tool');
addManual('diagramme-comptage-fiches', 'tool', 'chart-count-maker', 'tool');
addManual('code-addition-fiches', 'tool', 'code-addition-worksheet-maker', 'tool');
addManual('coloriage-fiches', 'tool', 'coloring-page-maker', 'tool');
addManual('mots-croises-fiches', 'tool', 'crossword-maker', 'tool');
addManual('cryptogramme-fiches', 'tool', 'cryptogram-maker', 'tool');
addManual('dessiner-et-colorier-fiches', 'tool', 'draw-and-color-maker', 'tool');
addManual('trouver-et-compter-fiches', 'tool', 'find-and-count-maker', 'tool');
addManual('grille-association-fiches', 'tool', 'grid-match-maker', 'tool');
addManual('ecriture-fiches', 'tool', 'handwriting-worksheet-maker', 'tool');
addManual('objets-caches-fiches', 'tool', 'hidden-object-maker', 'tool');
addManual('association-fiches', 'tool', 'matching-worksheet-maker', 'tool');
addManual('puzzles-maths-fiches', 'tool', 'math-puzzle-maker', 'tool');
addManual('pieces-manquantes-fiches', 'tool', 'missing-pieces-maker', 'tool');
addManual('plus-moins-fiches', 'tool', 'more-or-less-worksheet-maker', 'tool');
addManual('intrus-fiches', 'tool', 'odd-one-out-maker', 'tool');
addManual('train-motifs-fiches', 'tool', 'pattern-train-maker', 'tool');
addManual('motifs-fiches', 'tool', 'pattern-worksheet-maker', 'tool');
addManual('labyrinthes-images-fiches', 'tool', 'picture-path-maker', 'tool');
addManual('sudoku-images-fiches', 'tool', 'sudoku-maker', 'tool');
addManual('prepositions-fiches', 'tool', 'prepositions-worksheet-maker', 'tool');
addManual('addition-fiches', 'tool', 'addition-worksheet-maker', 'tool');
addManual('soustraction-fiches', 'tool', 'subtraction-worksheet-maker', 'tool');
addManual('association-ombres-fiches', 'tool', 'shadow-match-maker', 'tool');
addManual('comparaison-tailles-fiches', 'tool', 'big-and-small-worksheet-maker', 'tool');
addManual('tri-fiches', 'tool', 'picture-sort-maker', 'tool');
addManual('tracage-fiches', 'tool', 'drawing-lines-maker', 'tool');
addManual('chasse-tresor-fiches', 'tool', 'treasure-hunt-maker', 'tool');
addManual('devinettes-mots-fiches', 'tool', 'word-guess-maker', 'tool');
addManual('anagrammes-fiches', 'tool', 'word-scramble-maker', 'tool');
addManual('mots-caches-fiches', 'tool', 'word-search-maker', 'tool');
addManual('optellen-werkbladen-maker', 'tool', 'addition-worksheet-maker', 'tool');
addManual('addisjon-arbeidsark', 'tool', 'addition-worksheet-maker', 'tool');

// --- Additional French guide broken slugs ---
addManual('bingo-fiches', 'guide', 'create-bingo-cards', 'guide');
addManual('diagramme-comptage-fiches', 'guide', 'create-chart-count-worksheets', 'guide');
addManual('code-addition-fiches', 'guide', 'create-addition-worksheets', 'guide');
addManual('mots-croises-fiches', 'guide', 'create-crossword-puzzles', 'guide');
addManual('cryptogramme-fiches', 'guide', 'create-cryptogram-puzzles', 'guide');
addManual('objets-caches-fiches', 'guide', 'create-hidden-object-worksheets', 'guide');
addManual('puzzles-maths-fiches', 'guide', 'create-math-puzzle-worksheets', 'guide');
addManual('soustraction-fiches', 'guide', 'create-subtraction-worksheets', 'guide');
addManual('mots-caches-fiches', 'guide', 'create-word-search-puzzles', 'guide');
addManual('prepositions-fiches', 'guide', 'create-preposition-worksheets', 'guide');
addManual('addition-fiches', 'guide', 'create-addition-worksheets', 'guide');
addManual('guide-vendeur-imprimables', 'guide', 'sell-educational-printables-etsy', 'guide');
addManual('trouver-niche-imprimables', 'guide', 'niche-selection-printables', 'guide');
addManual('licence-commerciale-imprimables', 'guide', 'understanding-commercial-licenses', 'guide');
addManual('droit-auteur-imprimables', 'guide', 'copyright-printable-sellers', 'guide');
addManual('publicite-etsy-imprimables', 'guide', 'etsy-seo-educational-printables', 'guide');
addManual('creer-fiches-exercices-vendre', 'guide', 'create-worksheet-bundles', 'guide');
addManual('fixer-prix-imprimables', 'guide', 'price-etsy-printables', 'guide');
addManual('lancer-boutique-etsy-imprimables', 'guide', 'start-etsy-printable-shop', 'guide');
addManual('avis-clients-etsy', 'guide', 'get-reviews-printable-products', 'guide');
addManual('optimisation-seo-etsy-imprimables', 'guide', 'etsy-seo-educational-printables', 'guide');
addManual('creer-fiches-rapidement', 'guide', 'create-addition-worksheets', 'guide');
addManual('imprimables-multilingues', 'guide', 'multilingual-printable-business', 'guide');
addManual('marketing-imprimables-pinterest', 'guide', 'pinterest-marketing-worksheets', 'guide');
addManual('strategie-bundles-etsy', 'guide', 'create-etsy-worksheet-bundles', 'guide');
addManual('revenus-imprimables-realiste', 'guide', 'passive-income-worksheets', 'guide');
addManual('eviter-erreurs-imprimables', 'guide', 'quality-standards-worksheets', 'guide');
addManual('creer-fiches-sans-design', 'guide', 'create-addition-worksheets', 'guide');
addManual('photos-mockup-imprimables', 'guide', 'social-media-printable-marketing', 'guide');
addManual('branding-boutique-imprimables', 'guide', 'social-media-printable-marketing', 'guide');
addManual('planification-saisonniere-imprimables', 'guide', 'seasonal-marketing-printables', 'guide');
addManual('plateformes-vente-fiches', 'guide', 'kdp-vs-etsy-printables', 'guide');
addManual('productivite-creation-fiches', 'guide', 'automate-printable-business', 'guide');
addManual('publier-cahier-exercices-kdp', 'guide', 'publish-puzzle-books-kdp', 'guide');

// --- Additional Spanish guide broken slugs ---
addManual('comparar-plataformas-imprimibles', 'guide', 'kdp-vs-etsy-printables', 'guide');
addManual('estrategia-negocio-imprimibles', 'guide', 'scale-printable-business-guide', 'guide');
addManual('encontrar-nicho-imprimibles', 'guide', 'niche-selection-printables', 'guide');
addManual('licencia-comercial-imprimibles', 'guide', 'understanding-commercial-licenses', 'guide');
addManual('email-marketing-imprimibles', 'guide', 'email-marketing-printables', 'guide');
addManual('publicidad-etsy-imprimibles', 'guide', 'etsy-seo-educational-printables', 'guide');
addManual('optimizar-listings-etsy-fichas', 'guide', 'etsy-seo-educational-printables', 'guide');
addManual('precios-imprimibles-etsy', 'guide', 'price-etsy-printables', 'guide');
addManual('crear-tienda-etsy-imprimibles', 'guide', 'start-etsy-printable-shop', 'guide');
addManual('conseguir-resenas-etsy', 'guide', 'get-reviews-printable-products', 'guide');
addManual('seo-etsy-imprimibles-educativos', 'guide', 'etsy-seo-educational-printables', 'guide');
addManual('estrategia-catalogo-etsy', 'guide', 'create-printable-product-line', 'guide');
addManual('publicar-libros-actividades-kdp', 'guide', 'publish-puzzle-books-kdp', 'guide');
addManual('imprimibles-multilingues-negocio', 'guide', 'multilingual-printable-business', 'guide');
addManual('ingresos-pasivos-imprimibles', 'guide', 'passive-income-worksheets', 'guide');
addManual('marketing-pinterest-imprimibles', 'guide', 'pinterest-marketing-worksheets', 'guide');
addManual('crear-paquetes-imprimibles', 'guide', 'create-worksheet-bundles', 'guide');
addManual('branding-tienda-imprimibles', 'guide', 'social-media-printable-marketing', 'guide');
addManual('planificacion-estacional-imprimibles', 'guide', 'seasonal-marketing-printables', 'guide');
addManual('ingresos-negocio-imprimibles', 'guide', 'passive-income-worksheets', 'guide');
addManual('estrategia-catalogo-imprimibles', 'guide', 'create-printable-product-line', 'guide');
addManual('suma-fichas', 'guide', 'create-addition-worksheets', 'guide');

// --- Additional Italian guide broken slugs ---
addManual('creare-puzzle-codice-addizione', 'guide', 'create-addition-worksheets', 'guide');
addManual('creare-schede-sottrazione', 'guide', 'create-subtraction-worksheets', 'guide');

// --- Additional Portuguese guide broken slugs ---
addManual('como-vender-etsy', 'guide', 'sell-educational-printables-etsy', 'guide');
addManual('criar-fichas-subtracao', 'guide', 'create-subtraction-worksheets', 'guide');

// --- Additional German guide broken slugs ---
addManual('druckvorlagen-geschaeft-starten', 'guide', 'scale-printable-business-guide', 'guide');
addManual('marketing-fuer-druckvorlagen-geschaeft', 'guide', 'social-media-printable-marketing', 'guide');
addManual('arbeitsblaetter-pakete-erstellen', 'guide', 'create-worksheet-bundles', 'guide');
addManual('etsy-seo-fuer-druckvorlagen', 'guide', 'etsy-seo-educational-printables', 'guide');
addManual('kommerzielle-lizenz-fuer-druckvorlagen', 'guide', 'understanding-commercial-licenses', 'guide');
addManual('kundenservice-fuer-digitale-produkte', 'guide', 'customer-support-digital-products', 'guide');
addManual('etsy-shop-fuer-druckvorlagen-eroeffnen', 'guide', 'start-etsy-printable-shop', 'guide');
addManual('raetselbuecher-fuer-amazon-kdp', 'guide', 'publish-puzzle-books-kdp', 'guide');
addManual('code-additions-arbeitsblaetter-erstellen', 'guide', 'create-addition-worksheets', 'guide');
addManual('kreuzwortraetsel-arbeitsblaetter-erstellen', 'guide', 'create-crossword-puzzles', 'guide');
addManual('mehrsprachige-arbeitsblaetter-erstellen', 'guide', 'worksheets-multiple-languages', 'guide');
addManual('mathe-raetsel-arbeitsblaetter-erstellen', 'guide', 'create-math-puzzle-worksheets', 'guide');
addManual('addition-arbeitsblaetter-erstellen', 'guide', 'create-addition-worksheets', 'guide');
addManual('subtraktions-arbeitsblaetter-erstellen', 'guide', 'create-subtraction-worksheets', 'guide');
addManual('wortsuche-arbeitsblaetter-erstellen', 'guide', 'create-word-search-puzzles', 'guide');

// --- Additional Dutch guide broken slugs ---
addManual('optellen-werkbladen-gids', 'guide', 'create-addition-worksheets', 'guide');
addManual('alfabet-werkbladen-gids', 'guide', 'create-alphabet-worksheets', 'guide');
addManual('bingo-werkbladen-gids', 'guide', 'create-bingo-cards', 'guide');
addManual('kleurplaten-werkbladen-gids', 'guide', 'create-coloring-pages', 'guide');
addManual('kdp-puzzelboeken-publiceren', 'guide', 'publish-puzzle-books-kdp', 'guide');
addManual('teken-en-kleur-werkbladen-gids', 'guide', 'create-drawing-worksheets', 'guide');
addManual('bundels-samenstellen', 'guide', 'create-worksheet-bundles', 'guide');
addManual('meer-minder-werkbladen-gids', 'guide', 'create-size-comparison-worksheets', 'guide');
addManual('buitenbeentje-werkbladen-gids', 'guide', 'create-odd-one-out-puzzles', 'guide');
addManual('patronen-trein-werkbladen-gids', 'guide', 'create-pattern-worksheets', 'guide');
addManual('patronen-werkbladen-gids', 'guide', 'create-pattern-worksheets', 'guide');
addManual('plaatjes-doolhof-werkbladen-gids', 'guide', 'create-maze-worksheets', 'guide');
addManual('plaatjes-sudoku-werkbladen-gids', 'guide', 'create-picture-sudoku', 'guide');
addManual('voorzetsels-werkbladen-gids', 'guide', 'create-preposition-worksheets', 'guide');
addManual('aftrekken-werkbladen-maken', 'guide', 'create-subtraction-worksheets', 'guide');
addManual('schaduw-koppel-werkbladen-gids', 'guide', 'create-shadow-matching-worksheets', 'guide');
addManual('groottevergelijking-werkbladen-gids', 'guide', 'create-size-comparison-worksheets', 'guide');
addManual('sorteer-werkbladen-gids', 'guide', 'create-sorting-worksheets', 'guide');
addManual('speurtocht-werkbladen-gids', 'guide', 'create-treasure-hunt-worksheets', 'guide');
addManual('woordpuzzels-verkopen', 'guide', 'sell-word-search-etsy', 'guide');
addManual('puzzels-verkopen-etsy', 'guide', 'sell-word-search-etsy', 'guide');

// --- Additional guide broken slugs (EN wrong names) ---
addManual('create-handwriting-worksheets', 'guide', 'create-handwriting-sheets', 'guide');
addManual('multilingual-worksheets', 'guide', 'worksheets-multiple-languages', 'guide');
addManual('commercial-license', 'guide', 'understanding-commercial-licenses', 'guide');
addManual('create-word-scramble-worksheets', 'guide', 'create-word-search-puzzles', 'guide');
addManual('create-code-addition-worksheets', 'guide', 'create-addition-worksheets', 'guide');
addManual('create-draw-and-color-worksheets', 'guide', 'create-drawing-worksheets', 'guide');
addManual('create-find-and-count-worksheets', 'guide', 'create-counting-worksheets', 'guide');
addManual('create-grid-matching-worksheets', 'guide', 'create-matching-worksheets', 'guide');
addManual('create-find-objects-worksheets', 'guide', 'create-hidden-object-worksheets', 'guide');
addManual('create-missing-pieces-worksheets', 'guide', 'create-missing-pieces-puzzles', 'guide');
addManual('create-more-less-worksheets', 'guide', 'create-size-comparison-worksheets', 'guide');
addManual('create-odd-one-out-worksheets', 'guide', 'create-odd-one-out-puzzles', 'guide');
addManual('create-pattern-train-worksheets', 'guide', 'create-pattern-worksheets', 'guide');
addManual('create-picture-sudoku-worksheets', 'guide', 'create-picture-sudoku', 'guide');
addManual('create-code-addition-puzzles', 'guide', 'create-addition-worksheets', 'guide');
addManual('create-grid-matching-puzzles', 'guide', 'create-matching-worksheets', 'guide');

// --- Additional bundle broken slugs ---
addManual('mathe-zahlen-paket', 'bundle', 'math-mastery-bundle', 'bundle');

// --- Additional start broken slugs ---
addManual('create-kdp-activity-books', 'start', 'amazon-kdp-activity-books', 'start');
addManual('reken-werkbladen-verkopen-etsy', 'start', 'create-worksheets-that-sell', 'start');
addManual('puzzels-verkopen-amazon', 'start', 'amazon-kdp-activity-books', 'start');
addManual('puzzels-verkopen-etsy', 'start', 'etsy-printable-business', 'start');
addManual('saelg-matematik-arbejdsark-etsy', 'start', 'create-worksheets-that-sell', 'start');
addManual('saelj-matte-arbetsblad-etsy', 'start', 'create-worksheets-that-sell', 'start');
addManual('sell-word-search-etsy', 'start', 'create-worksheets-that-sell', 'start');
addManual('vendere-schede-matematica-etsy', 'start', 'create-worksheets-that-sell', 'start');
addManual('vender-fichas-matematica-etsy', 'start', 'create-worksheets-that-sell', 'start');

// --- Additional Danish guide broken slugs ---
addManual('opret-additions-arbejdsark', 'guide', 'create-addition-worksheets', 'guide');

// --- Additional Swedish guide broken slugs ---
addManual('flersprakiga-arbetsblad', 'guide', 'worksheets-multiple-languages', 'guide');
addManual('skapa-professionella-arbetsblad', 'guide', 'create-worksheet-bundles', 'guide');
addManual('skapa-arbetsblad-paket', 'guide', 'create-worksheet-bundles', 'guide');

// --- Spanish tool slugs ---
addManual('suma-fichas', 'tool', 'addition-worksheet-maker', 'tool');

// ============================================================
// 4. Resolve a slug: find the English slug for any given slug+pageType
// ============================================================

function resolveSlug(pageType, slug) {
  // Already a valid English slug?
  const typeKey = `${pageType}:${slug}`;

  // Check manual mappings first (highest priority)
  if (manualMappings.has(typeKey)) {
    return manualMappings.get(typeKey);
  }
  if (manualMappings.has(slug)) {
    return manualMappings.get(slug);
  }

  // Check the auto-parsed slug lookup
  if (slugLookup.has(typeKey)) {
    const result = slugLookup.get(typeKey);
    return { englishSlug: result.englishSlug, pageType: result.pageType };
  }

  // Check without type prefix (cross-type lookup)
  if (slugLookup.has(slug)) {
    const result = slugLookup.get(slug);
    return { englishSlug: result.englishSlug, pageType: result.pageType };
  }

  return null;
}

// ============================================================
// 5. Process all blog files
// ============================================================

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

let totalFiles = 0;
let totalLinksScanned = 0;
let totalLinksFixed = 0;
let totalFilesModified = 0;
const unresolvedSlugs = new Map(); // slug -> count

for (const locale of LOCALES) {
  const localeDir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    totalFiles++;

    // Find the internalLinks section
    const linksMatch = content.match(/internalLinks\s*:\s*\[/);
    if (!linksMatch) continue;

    // Find all pageType/slug pairs in the internalLinks array
    let modified = false;
    const linkRegex = /(\{\s*pageType:\s*')([^']+)(',\s*slug:\s*')([^']+)(')/g;
    let match;

    const newContent = content.replace(linkRegex, (fullMatch, prefix1, pageType, prefix2, slug, suffix) => {
      totalLinksScanned++;

      const resolution = resolveSlug(pageType, slug);
      if (resolution) {
        const newPageType = resolution.pageType;
        const newSlug = resolution.englishSlug;

        if (newSlug !== slug || newPageType !== pageType) {
          totalLinksFixed++;
          modified = true;
          return `${prefix1}${newPageType}${prefix2}${newSlug}${suffix}`;
        }
      } else {
        // Check if the slug is already a valid English slug for its type
        const isAlreadyValid = checkIsValidEnglishSlug(pageType, slug);
        if (!isAlreadyValid) {
          const key = `${pageType}:${slug}`;
          unresolvedSlugs.set(key, (unresolvedSlugs.get(key) || 0) + 1);
        }
      }

      return fullMatch;
    });

    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      totalFilesModified++;
    }
  }
}

function checkIsValidEnglishSlug(pageType, slug) {
  let configs;
  switch (pageType) {
    case 'app': configs = appConfigs; break;
    case 'tool': configs = toolConfigs; break;
    case 'guide': configs = guideConfigs; break;
    case 'bundle': configs = bundleConfigs; break;
    case 'start': configs = startConfigs; break;
    case 'idea': configs = ideaConfigs; break;
    default: return false;
  }
  return configs.some(c => c.slugs.en === slug);
}

// ============================================================
// 6. Report
// ============================================================

console.log('\n=== Blog Internal Links Fix Report ===');
console.log(`Total files scanned: ${totalFiles}`);
console.log(`Total links scanned: ${totalLinksScanned}`);
console.log(`Total links fixed: ${totalLinksFixed}`);
console.log(`Total files modified: ${totalFilesModified}`);

if (unresolvedSlugs.size > 0) {
  console.log(`\n=== Unresolved slugs (${unresolvedSlugs.size} unique patterns) ===`);
  const sorted = [...unresolvedSlugs.entries()].sort((a, b) => b[1] - a[1]);
  for (const [slug, count] of sorted) {
    console.log(`  ${slug} (${count} occurrences)`);
  }
} else {
  console.log('\nAll internal link slugs resolved successfully!');
}
