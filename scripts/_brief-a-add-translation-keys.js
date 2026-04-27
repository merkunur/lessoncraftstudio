// One-shot script to add Brief A translation keys to per-app translation files.
// Inserts shared SEO/end-deck keys plus per-app sr-only keys into the en + de
// language blocks. Other 9 languages fall back to English via the existing
// t() chain. Safe to re-run — skips files that already have seoFreeInteractive.
//
// Run from repo root: node scripts/_brief-a-add-translation-keys.js
//
// This is a one-shot tool — gitignore the file or delete it after Brief A ships.

const fs = require('fs');
const path = require('path');

const SHARED_EN = {
  seoFreeInteractive: 'Free interactive',
  seoFor: 'for',
  seoPrintOrPlayOnline: 'Print or play online',
  srWorksheetQuestions: 'Worksheet questions',
  endDeckHeading: 'Want more?',
  endDeckMoreType: 'More {type} worksheets',
  endDeckMoreTheme: 'More {theme} worksheets',
  endDeckMoreLevel: 'More worksheets for {level}',
  endDeckBrowseAll: 'Browse all worksheets'
};

const SHARED_DE = {
  seoFreeInteractive: 'Kostenloses interaktives',
  seoFor: 'für',
  seoPrintOrPlayOnline: 'Drucken oder online spielen',
  srWorksheetQuestions: 'Arbeitsblatt-Fragen',
  endDeckHeading: 'Mehr davon?',
  endDeckMoreType: 'Mehr {type}-Arbeitsblätter',
  endDeckMoreTheme: 'Mehr {theme}-Arbeitsblätter',
  endDeckMoreLevel: 'Mehr Arbeitsblätter für {level}',
  endDeckBrowseAll: 'Alle Arbeitsblätter durchsuchen'
};

// Per-app sr-only keys. Only add the apps we're processing in this batch.
const PER_APP = {
  'translations-wordsearch-complete.js': {
    en: { srPuzzleWordsearch: 'Word search puzzle. Find these words in the letter grid: {words}.' },
    de: { srPuzzleWordsearch: 'Wortsuche-Rätsel. Finde diese Wörter im Buchstabengitter: {words}.' }
  },
  'translations-treasure-hunt.js': {
    en: { srPuzzleTreasureHunt: 'Treasure hunt puzzle. Trace the path from {start} to {end} following the directional clues.' },
    de: { srPuzzleTreasureHunt: 'Schatzsuche-Rätsel. Verfolge den Weg von {start} nach {end} und folge den Richtungshinweisen.' }
  }
};

function addKeysToBlock(content, langCode, kvPairs) {
  // Match either  "<langCode>": {  or  <langCode>: {  (translation files
  // are inconsistent across apps — some use quoted keys, some unquoted).
  const startRe = new RegExp('(?:^|[\\s,])"?' + langCode + '"?\\s*:\\s*\\{', 'm');
  const startMatch = content.match(startRe);
  if (!startMatch) return { content, changed: 0, error: 'no language block ' + langCode };

  const startIdx = startMatch.index + startMatch[0].length;
  // Walk forward through the language block, tracking brace depth
  let depth = 1;
  let inString = false;
  let escapeNext = false;
  let i = startIdx;
  while (i < content.length && depth > 0) {
    const c = content[i];
    if (escapeNext) { escapeNext = false; }
    else if (c === '\\') { escapeNext = true; }
    else if (inString) {
      if (c === '"') inString = false;
    } else {
      if (c === '"') inString = true;
      else if (c === '{') depth++;
      else if (c === '}') depth--;
      if (depth === 0) break;
    }
    i++;
  }
  if (depth !== 0) return { content, changed: 0, error: 'unbalanced braces' };

  // Find the previous non-whitespace char to decide whether to add a comma
  let j = i - 1;
  while (j > startIdx && /\s/.test(content[j])) j--;
  const prevChar = content[j];
  const needsComma = prevChar !== ',' && prevChar !== '{';

  // Match the indentation of the most recent key line (look back for 4-space pattern)
  const indent = '    ';
  const newLines = Object.entries(kvPairs)
    .map(([k, v]) => indent + JSON.stringify(k) + ': ' + JSON.stringify(v))
    .join(',\n');
  const insert = (needsComma ? ',\n' : '\n') + newLines + '\n  ';
  const out = content.slice(0, i) + insert + content.slice(i);
  return { content: out, changed: Object.keys(kvPairs).length };
}

const dir = 'REFERENCE TRANSLATIONS';
let totalFiles = 0, totalKeys = 0;

for (const [file, perAppKeys] of Object.entries(PER_APP)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.error('MISSING: ' + filePath);
    continue;
  }
  let s = fs.readFileSync(filePath, 'utf8');
  if (s.includes('seoFreeInteractive')) {
    console.log('SKIP (already has): ' + file);
    continue;
  }
  const enKeys = Object.assign({}, SHARED_EN, perAppKeys.en);
  const deKeys = Object.assign({}, SHARED_DE, perAppKeys.de);

  let r = addKeysToBlock(s, 'en', enKeys);
  if (r.error) { console.error('FAIL en for ' + file + ': ' + r.error); continue; }
  s = r.content;
  const enAdded = r.changed;

  r = addKeysToBlock(s, 'de', deKeys);
  if (r.error) { console.error('FAIL de for ' + file + ': ' + r.error); continue; }
  s = r.content;
  const deAdded = r.changed;

  fs.writeFileSync(filePath, s, 'utf8');
  console.log('OK: ' + file + ' (en: +' + enAdded + ', de: +' + deAdded + ')');
  totalFiles++;
  totalKeys += enAdded + deAdded;
}

console.log('\nTotal: ' + totalFiles + ' files, ' + totalKeys + ' key additions.');
