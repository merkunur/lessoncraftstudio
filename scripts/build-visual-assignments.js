#!/usr/bin/env node
/**
 * build-visual-assignments.js
 *
 * Reads guide/bundle/idea/start content files, extracts referenced apps,
 * and assigns 4 visual showcase sections per page from "visuals to enrich the pages/".
 *
 * Output: frontend/config/page-visual-assignments.ts
 */

const fs = require('fs');
const path = require('path');

// ─── Visual inventory: which HTML files exist per app folder ───
const VISUALS_DIR = path.join(__dirname, '..', 'visuals to enrich the pages');

function buildVisualInventory() {
  const inventory = {};
  for (const folder of fs.readdirSync(VISUALS_DIR)) {
    const folderPath = path.join(VISUALS_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;
    const files = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.html'))
      .map(f => f.replace('.html', ''))
      .sort();
    if (files.length > 0) inventory[folder] = files;
  }
  return inventory;
}

// ─── appId/slug → visual folder name mapping ───
const APP_ID_TO_FOLDER = {
  'addition': 'addition',
  'addition-worksheets': 'addition',
  'alphabet-train': 'alphabet-train',
  'alphabet-train-worksheets': 'alphabet-train',
  'big-and-small': 'big-small',
  'big-small': 'big-small',
  'big-small-worksheets': 'big-small',
  'bingo': 'bingo',
  'bingo-worksheets': 'bingo',
  'chart-count': 'chart-count',
  'chart-count-worksheets': 'chart-count',
  'code-addition': 'code-addition',
  'code-addition-worksheets': 'code-addition',
  'coloring': 'coloring',
  'coloring-worksheets': 'coloring',
  'crossword': 'crossword',
  'crossword-worksheets': 'crossword',
  'cryptogram': 'cryptogram',
  'cryptogram-worksheets': 'cryptogram',
  'draw-and-color': 'draw-and-color',
  'draw-and-color-worksheets': 'draw-and-color',
  'drawing-lines': 'drawing-lines',
  'drawing-lines-worksheets': 'drawing-lines',
  'find-and-count': 'find-and-count',
  'find-and-count-worksheets': 'find-and-count',
  'find-count': 'find-and-count',
  'find-objects': 'find-objects',
  'find-objects-worksheets': 'find-objects',
  'grid-match': 'grid-match',
  'grid-match-worksheets': 'grid-match',
  'hidden-objects': 'find-objects',
  'matching': 'matching',
  'matching-worksheets': 'matching',
  'math-puzzle': 'math-puzzle',
  'math-puzzle-worksheets': 'math-puzzle',
  'math-worksheet': 'math-worksheet',
  'math-worksheets': 'math-worksheet',
  'maze': 'picture-path',
  'missing-pieces': 'missing-pieces',
  'missing-pieces-worksheets': 'missing-pieces',
  'more-less': 'more-less',
  'more-less-worksheets': 'more-less',
  'odd-one-out': 'odd-one-out',
  'odd-one-out-worksheets': 'odd-one-out',
  'pattern-train': 'pattern-train',
  'pattern-train-worksheets': 'pattern-train',
  'pattern-worksheet': 'pattern-worksheet',
  'pattern-worksheets': 'pattern-worksheet',
  'picture-bingo-worksheets': 'bingo',
  'picture-path': 'picture-path',
  'picture-path-worksheets': 'picture-path',
  'picture-sort': 'picture-sort',
  'picture-sort-worksheets': 'picture-sort',
  'prepositions': 'prepositions',
  'prepositions-worksheets': 'prepositions',
  'shadow-match': 'shadow-match',
  'shadow-match-worksheets': 'shadow-match',
  'subtraction': 'subtraction',
  'subtraction-worksheets': 'subtraction',
  'sudoku': 'sudoku',
  'sudoku-worksheets': 'sudoku',
  'treasure-hunt': 'treasure-hunt',
  'treasure-hunt-worksheets': 'treasure-hunt',
  'word-guess': 'word-guess',
  'word-guess-worksheets': 'word-guess',
  'word-scramble': 'word-scramble',
  'word-scramble-worksheets': 'word-scramble',
  'word-search': 'wordsearch',
  'word-search-worksheets': 'wordsearch',
  'wordsearch': 'wordsearch',
  'wordsearch-worksheets': 'wordsearch',
  'writing': 'writing',
  'writing-worksheets': 'writing',
};

// ─── Section type labels ───
const SECTION_TYPES = ['hero', 'features', 'progression', 'fun'];
const SECTION_NUMBERS = ['001', '002', '003', '004'];

// ─── All 33 visual folder names (fallback pool) ───
const ALL_APPS = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
  'code-addition', 'coloring', 'crossword', 'cryptogram', 'draw-and-color',
  'drawing-lines', 'find-and-count', 'find-objects', 'grid-match', 'matching',
  'math-puzzle', 'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out',
  'pattern-train', 'pattern-worksheet', 'picture-path', 'picture-sort',
  'prepositions', 'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt',
  'word-guess', 'word-scramble', 'wordsearch', 'writing',
];

// ─── Extract page IDs from slug config files ───
function extractPageIds(filePath, idField) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`${idField}:\\s*'([^']+)'`, 'g');
  const ids = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

// ─── Extract app references from a content file ───
function extractAppRefs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const refs = [];

  // toolsRecommended[].appId and productIdeas[].appId
  const appIdMatches = content.matchAll(/appId:\s*'([^']+)'/g);
  for (const m of appIdMatches) {
    const folder = APP_ID_TO_FOLDER[m[1]];
    if (folder && !refs.includes(folder)) refs.push(folder);
  }

  // internalLinks with pageType 'app'
  const linkMatches = content.matchAll(/pageType:\s*'app',\s*slug:\s*'([^']+)'/g);
  for (const m of linkMatches) {
    const folder = APP_ID_TO_FOLDER[m[1]];
    if (folder && !refs.includes(folder)) refs.push(folder);
  }

  // Also try pageType 'tool' links
  const toolMatches = content.matchAll(/pageType:\s*'tool',\s*slug:\s*'([^']+)'/g);
  for (const m of toolMatches) {
    const folder = APP_ID_TO_FOLDER[m[1]];
    if (folder && !refs.includes(folder)) refs.push(folder);
  }

  return refs;
}

// ─── Pick visual file for an app + desired section number ───
function pickVisual(app, sectionIdx, inventory) {
  const available = inventory[app];
  if (!available) return null;

  const desired = SECTION_NUMBERS[sectionIdx];
  if (available.includes(desired)) {
    return { file: `${app}/${desired}.html`, app, type: SECTION_TYPES[sectionIdx] };
  }
  // Fallback: use highest available
  const fallback = available[available.length - 1];
  return { file: `${app}/${fallback}.html`, app, type: SECTION_TYPES[sectionIdx] };
}

// ─── Assign 4 visuals to a page ───
function assignVisuals(pageId, appRefs, inventory, usedAppsGlobal) {
  // Get 4 distinct apps from references
  let apps = appRefs.filter(a => inventory[a]).slice(0, 4);

  // If we don't have 4, fill from the global pool (round-robin to diversify)
  if (apps.length < 4) {
    const remaining = ALL_APPS.filter(a => !apps.includes(a) && inventory[a]);
    // Pick least-used apps for diversity
    remaining.sort((a, b) => (usedAppsGlobal[a] || 0) - (usedAppsGlobal[b] || 0));
    for (const a of remaining) {
      if (apps.length >= 4) break;
      apps.push(a);
    }
  }

  const visuals = [];
  for (let i = 0; i < 4; i++) {
    const v = pickVisual(apps[i], i, inventory);
    if (v) visuals.push(v);
    // Track usage
    if (apps[i]) usedAppsGlobal[apps[i]] = (usedAppsGlobal[apps[i]] || 0) + 1;
  }

  return visuals;
}

// ─── Main ───
function main() {
  const inventory = buildVisualInventory();
  console.log(`Visual inventory: ${Object.keys(inventory).length} apps`);
  for (const [app, files] of Object.entries(inventory)) {
    console.log(`  ${app}: ${files.join(', ')}`);
  }

  const configDir = path.join(__dirname, '..', 'frontend', 'config');
  const usedAppsGlobal = {};
  const allEntries = [];

  // ─── Process each page type ───
  const pageTypes = [
    {
      type: 'guide',
      slugFile: path.join(configDir, 'guide-page-slugs.ts'),
      idField: 'guideId',
      contentDir: path.join(configDir, 'guide-content', 'en'),
    },
    {
      type: 'bundle',
      slugFile: path.join(configDir, 'bundle-page-slugs.ts'),
      idField: 'bundleId',
      contentDir: path.join(configDir, 'bundle-content', 'en'),
    },
    {
      type: 'idea',
      slugFile: path.join(configDir, 'idea-page-slugs.ts'),
      idField: 'ideaId',
      contentDir: path.join(configDir, 'idea-content', 'en'),
    },
    {
      type: 'start',
      slugFile: path.join(configDir, 'start-page-slugs.ts'),
      idField: 'startId',
      contentDir: path.join(configDir, 'start-content', 'en'),
    },
  ];

  for (const pt of pageTypes) {
    const ids = extractPageIds(pt.slugFile, pt.idField);
    console.log(`\n${pt.type}: ${ids.length} pages`);

    for (const id of ids) {
      const contentFile = path.join(pt.contentDir, `${id}.ts`);
      let appRefs = [];
      if (fs.existsSync(contentFile)) {
        appRefs = extractAppRefs(contentFile);
      } else {
        console.warn(`  WARNING: No content file for ${pt.type}/${id}`);
      }

      const visuals = assignVisuals(id, appRefs, inventory, usedAppsGlobal);
      if (visuals.length < 4) {
        console.warn(`  WARNING: Only ${visuals.length} visuals for ${id}`);
      }

      allEntries.push({
        pageType: pt.type,
        pageId: id,
        visuals,
      });
    }
  }

  console.log(`\nTotal entries: ${allEntries.length}`);

  // ─── Verify all files exist ───
  let missingCount = 0;
  for (const entry of allEntries) {
    for (const v of entry.visuals) {
      const fullPath = path.join(VISUALS_DIR, v.file);
      if (!fs.existsSync(fullPath)) {
        console.error(`  MISSING: ${v.file}`);
        missingCount++;
      }
    }
  }
  if (missingCount > 0) {
    console.error(`\n${missingCount} missing visual files!`);
  } else {
    console.log('All visual file paths verified.');
  }

  // ─── Check for duplicate apps within entries ───
  let dupCount = 0;
  for (const entry of allEntries) {
    const apps = entry.visuals.map(v => v.app);
    if (new Set(apps).size !== apps.length) {
      console.warn(`  DUPLICATE apps in ${entry.pageId}: ${apps.join(', ')}`);
      dupCount++;
    }
  }
  if (dupCount === 0) console.log('No duplicate apps within any page.');

  // ─── Generate TypeScript output ───
  const lines = [];
  lines.push(`// Auto-generated by scripts/build-visual-assignments.js`);
  lines.push(`// Maps each guide/bundle/idea/start page to 4 visual showcase HTML sections`);
  lines.push(`// from "visuals to enrich the pages/" folder`);
  lines.push(``);
  lines.push(`export interface VisualAssignment {`);
  lines.push(`  /** Path relative to "visuals to enrich the pages/" */`);
  lines.push(`  file: string;`);
  lines.push(`  /** Which app this visual comes from */`);
  lines.push(`  app: string;`);
  lines.push(`  /** Section type: hero | features | progression | fun */`);
  lines.push(`  type: string;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export interface PageVisualConfig {`);
  lines.push(`  pageType: 'guide' | 'bundle' | 'idea' | 'start';`);
  lines.push(`  pageId: string;`);
  lines.push(`  visuals: [VisualAssignment, VisualAssignment, VisualAssignment, VisualAssignment];`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const pageVisualAssignments: PageVisualConfig[] = [`);

  for (const entry of allEntries) {
    lines.push(`  {`);
    lines.push(`    pageType: '${entry.pageType}',`);
    lines.push(`    pageId: '${entry.pageId}',`);
    lines.push(`    visuals: [`);
    for (const v of entry.visuals) {
      lines.push(`      { file: '${v.file}', app: '${v.app}', type: '${v.type}' },`);
    }
    lines.push(`    ],`);
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);

  const outputPath = path.join(configDir, 'page-visual-assignments.ts');
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
  console.log(`\nWritten: ${outputPath}`);
  console.log(`Entries: ${allEntries.length}`);
}

main();
