#!/usr/bin/env node
/**
 * Fix broken internal links in content files.
 *
 * Issues found by audit-seo-indexability.js:
 * - NL files use fabricated Dutch slugs instead of English IDs
 * - NL files reference start pages with pageType 'guide' (wrong type)
 * - EN/DE files reference non-existent idea pages
 */

const fs = require('fs');
const path = require('path');

const CONFIG = path.join(__dirname, '..', 'frontend', 'config');

// ── Slug → correct {pageType, slug(=ID)} replacements ──────────────

// Map of broken slug strings to their correct replacements.
// Format: 'broken-slug' → { from: "pageType: 'X', slug: 'broken-slug'", to: "pageType: 'Y', slug: 'correct-id'" }

const NL_FIXES = {
  // Guide links using Dutch slugs → English IDs
  'rekenwerkbladen-verkopen-etsy': { type: 'guide', id: 'sell-math-worksheets-etsy' },
  'woordzoekerboeken-kdp': { type: 'guide', id: 'word-search-books-kdp' },
  'kdp-versus-etsy-printables': { type: 'guide', id: 'kdp-vs-etsy-printables' },
  'woordzoekerpuzzels-maken': { type: 'guide', id: 'create-word-search-puzzles' },
  'zoekdeparen-werkbladen-maken': { type: 'guide', id: 'create-matching-worksheets' },
  'educatieve-printables-verkopen-etsy': { type: 'guide', id: 'sell-educational-printables-etsy' },
  'reviews-krijgen-printable-producten': { type: 'guide', id: 'get-reviews-printable-products' },
  'prijsstelling-educatieve-printables': { type: 'guide', id: 'pricing-educational-printables' },
  'create-worksheets': { type: 'start', id: 'create-worksheets-that-sell' },

  // Guide links that should be start pages (wrong pageType)
  'complete-guide-printable-business': { type: 'start', id: 'complete-guide-printable-business' },
  'printable-business-income': { type: 'start', id: 'printable-business-income' },
  'commercial-license-guide': { type: 'start', id: 'commercial-license-guide' },
  'tools-for-printable-business': { type: 'start', id: 'tools-for-printable-business' },
  'marketing-printable-business': { type: 'start', id: 'marketing-printable-business' },

  // Start link that should be a guide (wrong pageType)
  'start-etsy-printable-shop': { type: 'guide', id: 'start-etsy-printable-shop' },

  // App links using Dutch slugs → English appIds
  'rekenwerkblad-generator': { type: 'app', id: 'math-worksheet' },
  'kruiswoord-werkbladen': { type: 'app', id: 'image-crossword' },
  'rekenpuzzel-werkbladen': { type: 'app', id: 'math-puzzle' },
  'bingo-werkbladen': { type: 'app', id: 'picture-bingo' },
  'zoekdeparen-werkbladen': { type: 'app', id: 'matching-app' },
  'patroontreinen-werkbladen': { type: 'app', id: 'pattern-train' },
  'afbeeldingspad-werkbladen': { type: 'app', id: 'picture-path' },
  'voorwerpen-zoeken-werkbladen': { type: 'app', id: 'find-objects' },
  'tekenen-kleuren-werkbladen': { type: 'app', id: 'draw-and-color' },
  'tekenlijnen-werkbladen': { type: 'app', id: 'drawing-lines' },
  'plaatjes-sorteren-werkbladen': { type: 'app', id: 'picture-sort' },
  'schaduw-koppelen-werkbladen': { type: 'app', id: 'shadow-match' },
  'vreemde-eend-werkbladen': { type: 'app', id: 'odd-one-out' },
  'ontbrekende-stukjes-werkbladen': { type: 'app', id: 'missing-pieces' },
  'wat-hoort-er-niet-bij-maken': { type: 'app', id: 'odd-one-out' },
  'alfabettrein-werkbladen': { type: 'app', id: 'alphabet-train' },
  'grafiek-tellen-werkbladen': { type: 'app', id: 'chart-count-color' },

  // Tool links using Dutch slugs → English toolIds
  'kruiswoord-maker': { type: 'tool', id: 'crossword' },
  'bingo-maker': { type: 'tool', id: 'bingo' },
  'zoekdeparen-maker': { type: 'tool', id: 'matching' },
  'patroonwerkblad-maker': { type: 'tool', id: 'pattern-worksheet' },
  'afbeeldingspad-maker': { type: 'tool', id: 'picture-path' },
  'voorwerpen-zoeken-maker': { type: 'tool', id: 'find-objects' },
  'groot-klein-maker': { type: 'tool', id: 'big-small' },
  'tekenen-kleuren-maker': { type: 'tool', id: 'draw-and-color' },
  'vreemde-eend-maker': { type: 'tool', id: 'odd-one-out' },
  'voorzetsels-maker': { type: 'tool', id: 'prepositions' },
  'grafiek-tellen-maker': { type: 'tool', id: 'chart-count' },
};

// EN/DE idea links → closest existing idea IDs
const IDEA_FIXES = {
  'i-spy-books-kdp': 'farm-animals-printable-ideas',
  'logic-puzzles-printable-ideas': 'math-facts-printable-ideas',
  'visual-discrimination-printable-ideas': 'preschool-printable-ideas',
  'maze-pathway-printable-ideas': 'summer-learning-printable-ideas',
  'ozean-druckvorlagen-ideen': 'ocean-animals-printable-ideas',
  'bauernhof-druckvorlagen-ideen': 'farm-animals-printable-ideas',
  'dschungel-druckvorlagen-ideen': 'safari-animals-printable-ideas',
};

let totalFixes = 0;

// ── Fix NL content files ────────────────────────────────────────────
function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  let src = fs.readFileSync(filePath, 'utf8');
  let fixes = 0;

  for (const [brokenSlug, fix] of Object.entries(NL_FIXES)) {
    // Match: slug: 'brokenSlug' (with any pageType before it)
    const patterns = [
      // pageType: 'X', slug: 'brokenSlug'  (standard format)
      new RegExp(`(pageType:\\s*')([^']+)('\\s*,\\s*slug:\\s*')${escapeRegex(brokenSlug)}'`, 'g'),
      // Also handle slug: "brokenSlug" with double quotes
      new RegExp(`(pageType:\\s*")([^"]+)("\\s*,\\s*slug:\\s*")${escapeRegex(brokenSlug)}"`, 'g'),
    ];

    for (const pattern of patterns) {
      const newSrc = src.replace(pattern, `$1${fix.type}$3${fix.id}'`);
      if (newSrc !== src) {
        fixes++;
        src = newSrc;
      }
    }
  }

  if (fixes > 0) {
    fs.writeFileSync(filePath, src, 'utf8');
    totalFixes += fixes;
    console.log(`  Fixed ${fixes} links in ${path.relative(CONFIG, filePath)}`);
  }
  return fixes;
}

function fixIdeaLinks(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  let src = fs.readFileSync(filePath, 'utf8');
  let fixes = 0;

  for (const [brokenSlug, correctId] of Object.entries(IDEA_FIXES)) {
    const pattern = new RegExp(`slug:\\s*'${escapeRegex(brokenSlug)}'`, 'g');
    const newSrc = src.replace(pattern, `slug: '${correctId}'`);
    if (newSrc !== src) {
      fixes++;
      src = newSrc;
    }
  }

  if (fixes > 0) {
    fs.writeFileSync(filePath, src, 'utf8');
    totalFixes += fixes;
    console.log(`  Fixed ${fixes} idea links in ${path.relative(CONFIG, filePath)}`);
  }
  return fixes;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── Process all NL content files ────────────────────────────────────
console.log('Fixing NL guide content files...');
const nlGuideDir = path.join(CONFIG, 'guide-content', 'nl');
if (fs.existsSync(nlGuideDir)) {
  for (const file of fs.readdirSync(nlGuideDir).filter(f => f.endsWith('.ts'))) {
    fixFile(path.join(nlGuideDir, file));
  }
}

console.log('\nFixing NL app content files...');
const nlAppDir = path.join(CONFIG, 'app-content', 'nl');
if (fs.existsSync(nlAppDir)) {
  for (const file of fs.readdirSync(nlAppDir).filter(f => f.endsWith('.ts'))) {
    fixFile(path.join(nlAppDir, file));
  }
}

console.log('\nFixing NL tool content files...');
const nlToolDir = path.join(CONFIG, 'tool-content', 'nl');
if (fs.existsSync(nlToolDir)) {
  for (const file of fs.readdirSync(nlToolDir).filter(f => f.endsWith('.ts'))) {
    fixFile(path.join(nlToolDir, file));
  }
}

// ── Fix EN/DE idea links ────────────────────────────────────────────
console.log('\nFixing EN app content idea links...');
const enFiles = ['find-and-count', 'sudoku', 'odd-one-out', 'picture-path'];
for (const f of enFiles) {
  // App content uses wpAppId for filenames
  fixIdeaLinks(path.join(CONFIG, 'app-content', 'en', `${f}.ts`));
}

console.log('\nFixing DE app content idea links...');
const deFiles = ['missing-pieces', 'odd-one-out', 'picture-path'];
for (const f of deFiles) {
  fixIdeaLinks(path.join(CONFIG, 'app-content', 'de', `${f}.ts`));
}

console.log(`\n${'═'.repeat(50)}`);
console.log(`Total: ${totalFixes} internal links fixed`);
