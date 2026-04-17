#!/usr/bin/env node
// Phase A.8 steps 3-4: tools-side FAQ dedup execution.
// For each locale × per-tool file, deletes any FAQ whose question exactly
// matches one of the 5 shared-usage U-questions in that locale, OR the
// "U4 short form" (prefix up to first `?`).
//
// Same brace/string-aware `removeEntry` helper as the fixed
// `scripts/phase-a-dedup.js` — strips leading whitespace on the entry's line
// so no cosmetic cleanup pass is ever needed.

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const TOOL_CONTENT = path.join(ROOT, 'tool-content');
const SHARED_USAGE = path.join(TOOL_CONTENT, 'shared-usage-faqs.ts');

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function unescape(s) {
  return s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`').replace(/\\\\/g, '\\');
}

function parseSharedLocale(text, locale) {
  const re = new RegExp('\\b' + locale + '\\s*:\\s*\\[');
  const m = re.exec(text);
  if (!m) return [];
  let i = m.index + m[0].length;
  let depth = 1;
  let inStr = null;
  const start = i;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) { inStr = null; continue; }
    } else {
      if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) break; }
    }
  }
  const block = text.slice(start, i);
  const questions = [];
  const qRe = /question\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/gs;
  let qm;
  while ((qm = qRe.exec(block)) !== null) {
    questions.push(unescape(qm[2]));
  }
  return questions;
}

function findFaqArrayStart(text) {
  const m = /\bfaq\s*:\s*\[/.exec(text);
  if (!m) return -1;
  return m.index + m[0].length;
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
        else if (ch === '}') { depth--; if (depth === 0) { i++; break; } }
      }
    }
    entries.push({ start: entryStart, end: i });
  }
  return entries;
}

function extractQuestion(entryText) {
  const m = /question\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s.exec(entryText);
  return m ? unescape(m[2]) : null;
}

// Fixed removeEntry: strips leading whitespace on the entry's line so
// deleting adjacent entries doesn't pile up orphan indent.
function removeEntry(text, start, end) {
  let newStart = start;
  while (newStart > 0 && text[newStart - 1] !== '\n' && /[ \t]/.test(text[newStart - 1])) {
    newStart--;
  }
  let newEnd = end;
  while (newEnd < text.length && /[,\s]/.test(text[newEnd])) {
    if (text[newEnd] === '\n') { newEnd++; break; }
    newEnd++;
  }
  return text.slice(0, newStart) + text.slice(newEnd);
}

function shortFormOfU4(u4) {
  const idx = u4.indexOf('?');
  if (idx < 0) return null;
  return u4.slice(0, idx + 1).trim();
}

const sharedText = fs.readFileSync(SHARED_USAGE, 'utf8');

let totalRemoved = 0;
let filesChanged = 0;
const removedLog = [];
const perLocaleCounts = {};

for (const locale of LOCALES) {
  perLocaleCounts[locale] = { files: 0, exact: 0, short: 0 };
  const shared = parseSharedLocale(sharedText, locale);
  if (shared.length === 0) continue;
  const sharedSet = new Set(shared);
  const u4 = shared.find(q => /page sizes|Seitenformate|Seitengrößen|formats de page|tamaños de página|formati pagina|formati di pagina|tamanhos de página|paginaformaten|sidstorlekar|sidformater|sidestørrelser|sivukoko/i.test(q)) || shared[3] || null;
  const u4Short = u4 ? shortFormOfU4(u4) : null;
  const u4ShortActive = u4Short && u4Short !== u4 ? u4Short : null;

  const dir = path.join(TOOL_CONTENT, locale);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();

  for (const filename of files) {
    const filepath = path.join(dir, filename);
    let text = fs.readFileSync(filepath, 'utf8');
    const originalText = text;
    let removedThisFile = 0;

    // Loop: find an entry matching deletion criteria, remove it, re-parse, repeat.
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
        if (sharedSet.has(q)) { matched = e; matchKind = 'exact'; break; }
        if (u4ShortActive && q === u4ShortActive) { matched = e; matchKind = 'short'; break; }
      }
      if (!matched) break;
      const q = extractQuestion(text.slice(matched.start, matched.end));
      removedLog.push(`${locale}/${filename} [${matchKind}]: "${q}"`);
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
  console.log(`  ${locale}: ${p.files} files changed, ${p.exact} exact U-matches, ${p.short} U4-short matches`);
}

console.log(`\nTotal files changed: ${filesChanged}`);
console.log(`Total FAQ entries removed: ${totalRemoved}`);
if (DRY_RUN) console.log('\n[DRY RUN] No files written.');
