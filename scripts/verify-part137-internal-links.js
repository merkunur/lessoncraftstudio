#!/usr/bin/env node

/**
 * Part 137: Internal Linking Completeness Audit (All 250 EN Pages)
 *
 * Validates that every EN theme+grade page has complete internal linking data:
 *   A. curatedAppIds — 8-15 valid app IDs per theme
 *   B. appCategories — all 4 categories present, apps match curatedAppIds
 *   C. relatedThemes — 5-7 valid ThemeIds, no self-refs, bidirectional
 *   D. gradeContent — all 5 grade blocks exist
 *
 * Sections B/C/E/F (grade hub, other grades, cross-theme, breadcrumbs) are
 * automatic and don't need content-level validation.
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.resolve(__dirname, '..', 'frontend', 'content', 'themes');

const ALL_THEME_IDS = [
  'animals', 'food', 'transportation', 'nature', 'school',
  'sports', 'emotions', 'body', 'clothing', 'household',
  'toys', 'music', 'jobs', 'space', 'seasons',
  'holidays', 'weather', 'colors', 'shapes', 'numbers',
  'alphabet', 'furniture', 'easter', 'halloween', 'xmas',
  'winter', 'farm', 'ocean', 'dinosaurs', 'insects',
  'fruits', 'vegetables', 'flowers', 'birds', 'pets',
  'zoo', 'garden', 'camping', 'pirates', 'fairy-tales',
  'robots', 'superheroes', 'construction', 'cooking', 'travel',
  'birthday', 'circus', 'forest', 'spring', 'summer',
];

const ALL_APP_IDS = [
  'image-addition', 'math-worksheet', 'chart-count-color', 'code-addition',
  'math-puzzle', 'more-less', 'subtraction', 'alphabet-train',
  'word-scramble', 'prepositions', 'writing-app', 'word-search',
  'image-crossword', 'word-guess', 'coloring', 'draw-and-color',
  'sudoku', 'image-cryptogram', 'odd-one-out', 'picture-path',
  'find-and-count', 'find-objects', 'missing-pieces', 'matching-app',
  'grid-match', 'shadow-match', 'picture-sort', 'drawing-lines',
  'pattern-train', 'pattern-worksheet', 'picture-bingo', 'big-small-app',
  'treasure-hunt',
];

const ALL_GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
const ALL_CATEGORIES = ['math', 'literacy', 'visual', 'puzzles'];

const THEME_SET = new Set(ALL_THEME_IDS);
const APP_SET = new Set(ALL_APP_IDS);

// ── Helpers ──────────────────────────────────────────────────────────

function resolveEscapes(raw) {
  return raw
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

/** Extract a string array like curatedAppIds: ['a', 'b', ...] */
function extractStringArray(text, fieldName) {
  // Match fieldName: [ ... ] with possible multiline
  const pat = new RegExp(`${fieldName}\\s*:\\s*\\[`, 'g');
  const m = pat.exec(text);
  if (!m) return null;

  const start = text.indexOf('[', m.index);
  let depth = 0;
  let end = -1;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;

  const arrStr = text.slice(start, end + 1);
  // Extract quoted strings
  const items = [];
  const strPat = /['"]([^'"]+)['"]/g;
  let sm;
  while ((sm = strPat.exec(arrStr)) !== null) {
    items.push(resolveEscapes(sm[1]));
  }
  return items;
}

/** Extract appCategories array of { category, appIds } */
function extractAppCategories(text) {
  const pat = /appCategories\s*:\s*\[/;
  const m = pat.exec(text);
  if (!m) return null;

  const start = text.indexOf('[', m.index);
  let depth = 0;
  let end = -1;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;

  const arrStr = text.slice(start, end + 1);

  // Extract each { category: '...', appIds: [...] }
  const catPat = /category:\s*['"](\w+)['"]/g;
  const cats = [];
  let cm;
  while ((cm = catPat.exec(arrStr)) !== null) {
    const category = cm[1];
    // Find the appIds array following this category
    const afterCat = arrStr.slice(cm.index);
    const appIdsMatch = afterCat.match(/appIds:\s*\[([^\]]*)\]/);
    const appIds = [];
    if (appIdsMatch) {
      const idPat = /['"]([^'"]+)['"]/g;
      let im;
      while ((im = idPat.exec(appIdsMatch[1])) !== null) {
        appIds.push(im[1]);
      }
    }
    cats.push({ category, appIds });
  }
  return cats;
}

/** Check if gradeContent has a given grade key */
function hasGradeBlock(text, gradeId) {
  // Match 'preschool': { or "preschool": { or preschool: {
  const patterns = [
    new RegExp(`['"]${gradeId}['"]\\s*:\\s*\\{`),
    new RegExp(`${gradeId}\\s*:\\s*\\{`),
  ];
  return patterns.some(p => p.test(text));
}

// ── Main ─────────────────────────────────────────────────────────────

let errors = 0;
let warnings = 0;
let themesChecked = 0;
let gradeBlocksChecked = 0;

// Collect relatedThemes for bidirectional check
const relatedMap = new Map(); // themeId -> Set of related themeIds

for (const themeId of ALL_THEME_IDS) {
  const filePath = path.join(THEMES_DIR, themeId, 'en.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`ERROR  [${themeId}] en.ts file not found`);
    errors++;
    continue;
  }

  const src = fs.readFileSync(filePath, 'utf-8');
  themesChecked++;

  // ── Check 1: curatedAppIds ──
  const curatedAppIds = extractStringArray(src, 'curatedAppIds');
  if (!curatedAppIds) {
    console.log(`ERROR  [${themeId}] curatedAppIds not found`);
    errors++;
  } else {
    if (curatedAppIds.length < 8) {
      console.log(`ERROR  [${themeId}] curatedAppIds has only ${curatedAppIds.length} entries (min 8)`);
      errors++;
    } else if (curatedAppIds.length > 15) {
      console.log(`ERROR  [${themeId}] curatedAppIds has ${curatedAppIds.length} entries (max 15)`);
      errors++;
    }

    // Check 2: all curatedAppIds are valid
    for (const id of curatedAppIds) {
      if (!APP_SET.has(id)) {
        console.log(`ERROR  [${themeId}] invalid curatedAppId: '${id}'`);
        errors++;
      }
    }

    // Check for duplicates
    const dupes = curatedAppIds.filter((v, i) => curatedAppIds.indexOf(v) !== i);
    if (dupes.length > 0) {
      console.log(`WARN   [${themeId}] duplicate curatedAppIds: ${[...new Set(dupes)].join(', ')}`);
      warnings++;
    }
  }

  // ── Check 3: appCategories ──
  const appCats = extractAppCategories(src);
  if (!appCats) {
    console.log(`ERROR  [${themeId}] appCategories not found`);
    errors++;
  } else {
    const foundCats = new Set(appCats.map(c => c.category));
    for (const cat of ALL_CATEGORIES) {
      if (!foundCats.has(cat)) {
        console.log(`ERROR  [${themeId}] appCategories missing category: '${cat}'`);
        errors++;
      }
    }

    // Check 4: appCategories app IDs match curatedAppIds
    if (curatedAppIds) {
      const curatedSet = new Set(curatedAppIds);
      const catAppIds = new Set(appCats.flatMap(c => c.appIds));

      for (const id of catAppIds) {
        if (!curatedSet.has(id)) {
          console.log(`WARN   [${themeId}] appCategories contains '${id}' not in curatedAppIds`);
          warnings++;
        }
      }

      for (const id of curatedAppIds) {
        if (!catAppIds.has(id)) {
          console.log(`WARN   [${themeId}] curatedAppId '${id}' not in any appCategory`);
          warnings++;
        }
      }
    }

    // Check appCategory app IDs are valid
    for (const cat of appCats) {
      for (const id of cat.appIds) {
        if (!APP_SET.has(id)) {
          console.log(`ERROR  [${themeId}] invalid app ID '${id}' in appCategories.${cat.category}`);
          errors++;
        }
      }
    }
  }

  // ── Check 5: relatedThemes ──
  const relatedThemes = extractStringArray(src, 'relatedThemes');
  if (!relatedThemes) {
    console.log(`ERROR  [${themeId}] relatedThemes not found`);
    errors++;
  } else {
    if (relatedThemes.length < 5) {
      console.log(`ERROR  [${themeId}] relatedThemes has only ${relatedThemes.length} entries (min 5)`);
      errors++;
    } else if (relatedThemes.length > 7) {
      console.log(`WARN   [${themeId}] relatedThemes has ${relatedThemes.length} entries (target 5-7)`);
      warnings++;
    }

    // Check 6: all relatedThemes are valid theme IDs
    for (const rt of relatedThemes) {
      if (!THEME_SET.has(rt)) {
        console.log(`ERROR  [${themeId}] invalid relatedTheme: '${rt}'`);
        errors++;
      }
    }

    // Check 9: no self-references
    if (relatedThemes.includes(themeId)) {
      console.log(`ERROR  [${themeId}] relatedThemes contains self-reference`);
      errors++;
    }

    // Check for duplicates
    const rtDupes = relatedThemes.filter((v, i) => relatedThemes.indexOf(v) !== i);
    if (rtDupes.length > 0) {
      console.log(`WARN   [${themeId}] duplicate relatedThemes: ${[...new Set(rtDupes)].join(', ')}`);
      warnings++;
    }

    // Store for bidirectional check
    relatedMap.set(themeId, new Set(relatedThemes));
  }

  // ── Check 8: grade blocks exist for all 5 grades ──
  for (const gradeId of ALL_GRADE_IDS) {
    if (!hasGradeBlock(src, gradeId)) {
      console.log(`ERROR  [${themeId}] missing gradeContent block: '${gradeId}'`);
      errors++;
    } else {
      gradeBlocksChecked++;
    }
  }
}

// ── Check 7: bidirectional relatedThemes ──
let nonBidirectional = 0;
for (const [themeA, related] of relatedMap) {
  for (const themeB of related) {
    const bRelated = relatedMap.get(themeB);
    if (bRelated && !bRelated.has(themeA)) {
      console.log(`WARN   [bidirectional] ${themeA} -> ${themeB} but ${themeB} does NOT -> ${themeA}`);
      nonBidirectional++;
      warnings++;
    }
  }
}

// ── Summary ──────────────────────────────────────────────────────────

console.log('\n' + '='.repeat(70));
console.log('INTERNAL LINKING COMPLETENESS AUDIT — SUMMARY');
console.log('='.repeat(70));
console.log(`Themes checked:       ${themesChecked}/50`);
console.log(`Grade blocks checked: ${gradeBlocksChecked}/250`);
console.log(`Bidirectional gaps:   ${nonBidirectional}`);
console.log(`Errors:               ${errors}`);
console.log(`Warnings:             ${warnings}`);
console.log('='.repeat(70));

if (errors === 0) {
  console.log('PASS — All 250 EN theme+grade pages have complete internal linking data.');
} else {
  console.log(`FAIL — ${errors} error(s) found. Fix content files and re-run.`);
}

process.exit(errors > 0 ? 1 : 0);
