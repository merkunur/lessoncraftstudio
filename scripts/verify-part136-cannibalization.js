#!/usr/bin/env node

/**
 * Part 136: Cross-Theme Keyword Cannibalization Check (All 250 EN Pages)
 *
 * Checks all 50 themes x 5 grades = 250 theme+grade pages for keyword
 * cannibalization — situations where two different pages target the same
 * keyword phrase and would compete against each other in SERPs.
 *
 * Three checks:
 *   A. Primary keyword uniqueness — first phrase must be unique per page
 *   B. Phrase-level overlap — no identical phrase on two different pages
 *   C. Token-level Jaccard similarity — flag pairs with >70% overlap
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.resolve(__dirname, '..', 'frontend', 'content', 'themes');
const GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

// Stopwords excluded from Jaccard similarity tokens
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'it', 'its', 'this', 'that', 'as', 'if', 'not', 'no', 'do', 'does',
  'did', 'will', 'would', 'can', 'could', 'has', 'have', 'had',
  'free', 'printable', 'worksheet', 'worksheets', 'kids', 'children',
]);

// ── Helpers ──────────────────────────────────────────────────────────

function resolveEscapes(raw) {
  return raw
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

/** Brace-balanced block extraction (from Part 15 pattern) */
function extractBlock(text, blockName) {
  const patterns = [
    new RegExp(`['"]${blockName}['"]\\s*:\\s*\\{`),
    new RegExp(`${blockName}\\s*:\\s*\\{`),
  ];
  let braceStart = -1;
  for (const pat of patterns) {
    const m = pat.exec(text);
    if (m) {
      braceStart = text.indexOf('{', m.index);
      break;
    }
  }
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) return text.slice(braceStart, i + 1);
  }
  return null;
}

/** Extract seoKeywords string from a grade block */
function extractSeoKeywords(block) {
  const m = block.match(/seoKeywords:\s*'([^']*(?:\\.[^']*)*)'/);
  if (m) return resolveEscapes(m[1]);
  const mb = block.match(/seoKeywords:\s*`([^`]*(?:\\.[^`]*)*)`/);
  if (mb) return resolveEscapes(mb[1]);
  return null;
}

/** Split keyword string into individual phrases */
function splitPhrases(kwString) {
  return kwString.split(',').map(p => p.trim().toLowerCase()).filter(p => p.length > 0);
}

/** Tokenize a phrase into content words (no stopwords) */
function tokenize(phrase) {
  return phrase.toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

/** Jaccard similarity between two sets */
function jaccard(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

// ── Main ─────────────────────────────────────────────────────────────

const errors = [];
const warnings = [];
let pagesChecked = 0;

// Collect all page keyword data: { pageId, theme, grade, primaryPhrase, phrases[], tokenSet }
const pages = [];

const themeDirs = fs.readdirSync(THEMES_DIR)
  .filter(d => fs.statSync(path.join(THEMES_DIR, d)).isDirectory());

for (const theme of themeDirs) {
  const fp = path.join(THEMES_DIR, theme, 'en.ts');
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, 'utf8');

  for (const grade of GRADE_IDS) {
    const block = extractBlock(content, grade);
    if (!block) {
      errors.push(`${theme}/${grade}: Could not extract grade block`);
      continue;
    }

    const kwString = extractSeoKeywords(block);
    if (!kwString) {
      errors.push(`${theme}/${grade}: MISSING seoKeywords`);
      continue;
    }

    const phrases = splitPhrases(kwString);
    if (phrases.length === 0) {
      errors.push(`${theme}/${grade}: seoKeywords is empty`);
      continue;
    }

    // Build token set from ALL phrases combined
    const allTokens = new Set();
    for (const phrase of phrases) {
      for (const token of tokenize(phrase)) {
        allTokens.add(token);
      }
    }

    pagesChecked++;
    pages.push({
      pageId: `${theme}/${grade}`,
      theme,
      grade,
      primaryPhrase: phrases[0],
      phrases,
      tokenSet: allTokens,
    });
  }
}

// ── Check A: Primary Keyword Uniqueness ─────────────────────────────

const primaryMap = new Map(); // phrase → [pageId, ...]
for (const page of pages) {
  const key = page.primaryPhrase;
  if (!primaryMap.has(key)) primaryMap.set(key, []);
  primaryMap.get(key).push(page.pageId);
}
for (const [phrase, pageIds] of primaryMap) {
  if (pageIds.length > 1) {
    errors.push(`PRIMARY DUPLICATE: "${phrase}" shared by: ${pageIds.join(', ')}`);
  }
}

// ── Check B: Phrase-Level Overlap ───────────────────────────────────

const phraseMap = new Map(); // phrase → [pageId, ...]
for (const page of pages) {
  for (const phrase of page.phrases) {
    if (!phraseMap.has(phrase)) phraseMap.set(phrase, []);
    phraseMap.get(phrase).push(page.pageId);
  }
}

let phraseOverlapCount = 0;
for (const [phrase, pageIds] of phraseMap) {
  if (pageIds.length > 1) {
    // Only flag as error if the pages are from DIFFERENT themes
    // Same theme across grades is expected hierarchy (e.g. "animal worksheets")
    const themes = new Set(pageIds.map(id => id.split('/')[0]));
    if (themes.size > 1) {
      errors.push(`PHRASE OVERLAP (cross-theme): "${phrase}" shared by: ${pageIds.join(', ')}`);
      phraseOverlapCount++;
    } else {
      // Same theme, different grades — only warn if exact same phrase
      warnings.push(`PHRASE OVERLAP (same theme): "${phrase}" shared by: ${pageIds.join(', ')}`);
    }
  }
}

// ── Check C: Token-Level Jaccard Similarity ─────────────────────────

const JACCARD_THRESHOLD = 0.70;
let highSimilarityCount = 0;

// Only compare pages from DIFFERENT themes (same theme across grades is expected)
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    // Skip same-theme comparisons
    if (pages[i].theme === pages[j].theme) continue;

    const sim = jaccard(pages[i].tokenSet, pages[j].tokenSet);
    if (sim >= JACCARD_THRESHOLD) {
      highSimilarityCount++;
      warnings.push(
        `HIGH SIMILARITY (${(sim * 100).toFixed(0)}%): ${pages[i].pageId} vs ${pages[j].pageId}`
      );
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────

console.log('=== CROSS-THEME KEYWORD CANNIBALIZATION CHECK (Part 136) ===\n');
console.log(`Themes scanned: ${themeDirs.length}`);
console.log(`Pages checked: ${pagesChecked} / 250 expected`);
console.log(`Unique primary keywords: ${primaryMap.size}`);
console.log(`Total unique phrases: ${phraseMap.size}`);
console.log(`Cross-theme phrase overlaps: ${phraseOverlapCount}`);
console.log(`High-similarity pairs (>${JACCARD_THRESHOLD * 100}%): ${highSimilarityCount}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}\n`);

if (errors.length > 0) {
  console.log('--- ERRORS ---');
  errors.forEach(e => console.log('  ERROR: ' + e));
  console.log('');
}

if (warnings.length > 0) {
  console.log('--- WARNINGS ---');
  // Show first 30 warnings, then summarize
  const shown = warnings.slice(0, 30);
  shown.forEach(w => console.log('  WARN: ' + w));
  if (warnings.length > 30) {
    console.log(`  ... and ${warnings.length - 30} more warnings`);
  }
  console.log('');
}

if (errors.length === 0) {
  console.log('NO CANNIBALIZATION ERRORS FOUND — all 250 pages have distinct keyword targeting.');
}

process.exit(errors.length > 0 ? 1 : 0);
