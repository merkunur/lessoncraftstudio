#!/usr/bin/env node
// Phase C.4 — update local code references from space-filenames to hyphen-filenames.
// Targets 5 files identified by audit. All replacements are exact-string swaps
// inside .ts/.tsx files — no structural changes.

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..');

const RENAMES = [
  ['alphabet train.html', 'alphabet-train.html'],
  ['big small.html', 'big-small.html'],
  ['chart count.html', 'chart-count.html'],
  ['code addition.html', 'code-addition.html'],
  ['cvc words.html', 'cvc-words.html'],
  ['draw and color.html', 'draw-and-color.html'],
  ['drawing lines.html', 'drawing-lines.html'],
  ['find and count.html', 'find-and-count.html'],
  ['find objects.html', 'find-objects.html'],
  ['grid match.html', 'grid-match.html'],
  ['math puzzle.html', 'math-puzzle.html'],
  ['math worksheet.html', 'math-worksheet.html'],
  ['missing pieces.html', 'missing-pieces.html'],
  ['more less.html', 'more-less.html'],
  ['odd one out.html', 'odd-one-out.html'],
  ['pattern train.html', 'pattern-train.html'],
  ['pattern worksheet.html', 'pattern-worksheet.html'],
  ['picture path.html', 'picture-path.html'],
  ['picture sort.html', 'picture-sort.html'],
  ['shadow match.html', 'shadow-match.html'],
  ['treasure hunt.html', 'treasure-hunt.html'],
  ['word guess.html', 'word-guess.html'],
  ['word scramble.html', 'word-scramble.html'],
];

const TARGET_FILES = [
  'frontend/config/products.ts',
  'frontend/app/[locale]/apps/[slug]/page.tsx',
  'frontend/app/[locale]/apps/[slug]/AppContent.tsx',
  'frontend/lib/worksheet-generators.ts',
  'frontend/lib/apps-config.ts',
];

let totalReplacements = 0;
let filesChanged = 0;

for (const relPath of TARGET_FILES) {
  const filepath = path.join(ROOT, relPath);
  if (!fs.existsSync(filepath)) {
    console.log(`SKIP missing: ${relPath}`);
    continue;
  }
  let text = fs.readFileSync(filepath, 'utf8');
  const originalText = text;
  let fileReplacements = 0;
  for (const [oldName, newName] of RENAMES) {
    // Replace all occurrences of old filename (in single-quoted or double-quoted contexts).
    // Use split-join to avoid regex escaping of the space.
    const occurrences = text.split(oldName).length - 1;
    if (occurrences > 0) {
      text = text.split(oldName).join(newName);
      fileReplacements += occurrences;
      console.log(`  ${relPath}: "${oldName}" → "${newName}" (${occurrences})`);
    }
  }
  if (text !== originalText) {
    if (!DRY_RUN) fs.writeFileSync(filepath, text, 'utf8');
    totalReplacements += fileReplacements;
    filesChanged++;
  }
}

console.log(`\nFiles changed: ${filesChanged}`);
console.log(`Total replacements: ${totalReplacements}`);
if (DRY_RUN) console.log('[DRY RUN] No files written.');
