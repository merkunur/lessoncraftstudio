#!/usr/bin/env node
// Phase A.4 — FAQ dedup execution (steps 2 + 3)
//
// Removes from every per-app content file (33 × 11 locales), wherever present:
//   - Any FAQ whose question contains "KDP"         → sell-rights near-dup of shared S2
//   - Any FAQ whose question contains a locale-specific commercial-license phrase
//     AND asks what's "included/covered" → near-/exact-dup of shared S1
//
// The shared pool (shared-commercial-faqs.ts) is left untouched; it's the canonical source.
//
// Safe: only removes entries inside the `faq: [...]` array. Uses brace+string-aware
// block tracking so multi-line answer strings are deleted correctly.

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..', 'frontend', 'config', 'app-content');
const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const APP_FILES = [
  'addition.ts', 'alphabet-train.ts', 'big-small.ts', 'bingo.ts',
  'chart-count.ts', 'code-addition.ts', 'coloring.ts', 'crossword.ts',
  'cryptogram.ts', 'draw-and-color.ts', 'drawing-lines.ts', 'find-and-count.ts',
  'find-objects.ts', 'grid-match.ts', 'matching.ts', 'math-puzzle.ts',
  'math-worksheet.ts', 'missing-pieces.ts', 'more-less.ts', 'odd-one-out.ts',
  'pattern-train.ts', 'pattern-worksheet.ts', 'picture-path.ts', 'picture-sort.ts',
  'prepositions.ts', 'shadow-match.ts', 'subtraction.ts', 'sudoku.ts',
  'treasure-hunt.ts', 'word-guess.ts', 'word-scramble.ts', 'wordsearch.ts',
  'writing.ts',
];

// Locale-specific substring for the commercial-license question
// (per-app duplicate/near-duplicate of shared pool S1).
// Requires the substring to appear inside the question string.
const COMMERCIAL_LICENSE_SUBSTR = {
  en: 'commercial license include',
  de: 'kommerzielle Lizenz',
  fr: 'licence commerciale',
  es: 'licencia comercial',
  it: 'licenza commerciale',
  pt: 'licença comercial',
  nl: 'commerciële licentie',
  sv: 'kommersiella licensen',
  da: 'kommercielle licens',
  no: 'kommersielle lisensen',
  fi: 'kaupallinen lisenssi',
};

function findFaqArrayStart(text) {
  const match = /\bfaq\s*:\s*\[/.exec(text);
  if (!match) return -1;
  return match.index + match[0].length;
}

function listFaqEntries(text, arrayStart) {
  const entries = [];
  let i = arrayStart;
  while (i < text.length) {
    while (i < text.length && /[\s,]/.test(text[i])) i++;
    if (text[i] === ']') break;
    if (text[i] !== '{') break;
    const entryStart = i;
    let depth = 0;
    let inStr = null;
    for (; i < text.length; i++) {
      const ch = text[i];
      if (inStr) {
        if (ch === '\\') { i++; continue; }
        if (ch === inStr) { inStr = null; continue; }
      } else {
        if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') {
          depth--;
          if (depth === 0) { i++; break; }
        }
      }
    }
    entries.push({ start: entryStart, end: i });
  }
  return entries;
}

function extractQuestion(entryText) {
  const m = /question\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s.exec(entryText);
  if (!m) return null;
  return m[2];
}

function removeEntry(text, start, end) {
  // Extend `start` backward over leading whitespace on the entry's line
  // (but not past the preceding newline). This prevents orphaned indent from
  // piling up when consecutive entries are deleted.
  let newStart = start;
  while (newStart > 0 && text[newStart - 1] !== '\n' && /[ \t]/.test(text[newStart - 1])) {
    newStart--;
  }
  // Extend `end` forward through the trailing `,` and consume up through the
  // following newline (inclusive). That way an entire "  { ... },\n" chunk
  // is taken out cleanly.
  let newEnd = end;
  while (newEnd < text.length && /[,\s]/.test(text[newEnd])) {
    if (text[newEnd] === '\n') { newEnd++; break; }
    newEnd++;
  }
  return text.slice(0, newStart) + text.slice(newEnd);
}

let totalRemoved = 0;
let filesChanged = 0;
const removedLog = [];
const perLocaleCounts = {};

for (const locale of LOCALES) {
  perLocaleCounts[locale] = { sell: 0, commercial: 0, files: 0 };
  const commSubstr = COMMERCIAL_LICENSE_SUBSTR[locale];

  for (const filename of APP_FILES) {
    const filepath = path.join(ROOT, locale, filename);
    if (!fs.existsSync(filepath)) continue;
    let text = fs.readFileSync(filepath, 'utf8');
    const originalText = text;
    let removedThisFile = 0;

    // Loop: find the first entry matching a deletion pattern, remove it, re-parse, repeat.
    while (true) {
      const faqStart = findFaqArrayStart(text);
      if (faqStart < 0) break;
      const entries = listFaqEntries(text, faqStart);
      let matched = null;
      let matchKind = null;
      for (const e of entries) {
        const entryText = text.slice(e.start, e.end);
        const q = extractQuestion(entryText);
        if (!q) continue;
        if (q.includes('KDP')) { matched = e; matchKind = 'sell'; break; }
        if (commSubstr && q.toLowerCase().includes(commSubstr.toLowerCase())) {
          // Must be the "What does the commercial license include?" shape,
          // NOT "What's the difference between Commercial License and Full Access?".
          // Exclude anything referencing Full Access / comparison / difference.
          const lower = q.toLowerCase();
          const isComparison =
            lower.includes('full access') || lower.includes('accès complet') ||
            lower.includes('acceso completo') || lower.includes('accesso completo') ||
            lower.includes('acesso completo') || lower.includes('volledige toegang') ||
            lower.includes('fullständig åtkomst') || lower.includes('fuld adgang') ||
            lower.includes('full tilgang') || lower.includes('täysi pääsy') ||
            lower.includes('vollzugriff') || lower.includes('voller zugriff') ||
            lower.includes('différence') || lower.includes('diferencia') ||
            lower.includes('differenza') || lower.includes('diferença') ||
            lower.includes('difference') || lower.includes('verschil') ||
            lower.includes('skillnad') || lower.includes('forskel') ||
            lower.includes('forskjell') || lower.includes('ero') ||
            lower.includes('unterschied');
          if (!isComparison && q.length <= 80) { matched = e; matchKind = 'commercial'; break; }
        }
      }
      if (!matched) break;
      const question = extractQuestion(text.slice(matched.start, matched.end));
      removedLog.push(`${locale}/${filename} [${matchKind}]: "${question}"`);
      text = removeEntry(text, matched.start, matched.end);
      removedThisFile++;
      perLocaleCounts[locale][matchKind]++;
    }

    if (text !== originalText) {
      if (!DRY_RUN) fs.writeFileSync(filepath, text, 'utf8');
      filesChanged++;
      totalRemoved += removedThisFile;
      perLocaleCounts[locale].files++;
    }
  }
}

console.log('=== Removed entries ===');
for (const line of removedLog) console.log(line);

console.log('\n=== Per-locale summary ===');
for (const locale of LOCALES) {
  const p = perLocaleCounts[locale];
  console.log(`  ${locale}: ${p.files} files changed, ${p.sell} sell-rights removed, ${p.commercial} commercial-license removed`);
}

console.log(`\nTotal files changed: ${filesChanged}`);
console.log(`Total FAQ entries removed: ${totalRemoved}`);
if (DRY_RUN) console.log(`\n[DRY RUN] No files were written. Re-run without --dry-run to apply.`);
