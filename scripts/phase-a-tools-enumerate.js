#!/usr/bin/env node
// Phase A.8 step 1: enumerate tools-side FAQ dups across all 11 locales.
// Read-only — produces a markdown report listing every per-tool file that has
// a question string exactly matching a shared-usage question (U1-U5), plus
// known U4 "short form" near-dups.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const TOOL_CONTENT = path.join(ROOT, 'tool-content');
const SHARED_USAGE = path.join(TOOL_CONTENT, 'shared-usage-faqs.ts');

const LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

// Parse the `<locale>: [ ... ]` block from shared-usage-faqs.ts.
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

function parseFaqQuestions(text) {
  const m = /\bfaq\s*:\s*\[/.exec(text);
  if (!m) return [];
  let i = m.index + m[0].length;
  const entries = [];
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
    const entryText = text.slice(entryStart, i);
    const qM = /question\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s.exec(entryText);
    if (qM) entries.push(unescape(qM[2]));
  }
  return entries;
}

function unescape(s) {
  return s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\`/g, '`').replace(/\\\\/g, '\\');
}

// Return the "short form" of U4 — the prefix ending at the first `?`.
function shortFormOfU4(u4) {
  const idx = u4.indexOf('?');
  if (idx < 0) return null;
  return u4.slice(0, idx + 1).trim();
}

const sharedText = fs.readFileSync(SHARED_USAGE, 'utf8');

console.log('# Phase A.8 step 1 — tools-side dedup enumeration\n');
console.log('Source: `shared-usage-faqs.ts` + all 11 locales of `tool-content/[locale]/*.ts`.\n');
console.log('Matching rules:');
console.log('- **EXACT**: a per-tool question string is byte-identical to one of the shared U-questions in the same locale.');
console.log('- **U4-SHORT**: a per-tool question string is byte-identical to the shared U4 prefix up to the first `?` (e.g. `"What page sizes are supported?"` when U4 is `"What page sizes are supported? How do I print on A4 vs Letter?"`).\n');

let totalExact = 0;
let totalShort = 0;
const perLocale = {};

for (const locale of LOCALES) {
  perLocale[locale] = { files: [], exactCount: 0, shortCount: 0 };
  const shared = parseSharedLocale(sharedText, locale);
  if (shared.length === 0) {
    console.log(`## ${locale} — skipped (no shared pool found)\n`);
    continue;
  }
  const sharedSet = new Set(shared);
  const u4 = shared.find(q => /page sizes|Seitenformate|Seitengrößen|formats de page|tamaños de página|formati di pagina|tamanhos de página|paginaformaten|sidstorlekar|sidformater|sidestørrelser|sidestørrelser|sivukoko/i.test(q)) || shared[3] || null;
  const u4Short = u4 ? shortFormOfU4(u4) : null;

  const dir = path.join(TOOL_CONTENT, locale);
  if (!fs.existsSync(dir)) {
    console.log(`## ${locale} — skipped (no directory)\n`);
    continue;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();

  const rows = [];
  for (const filename of files) {
    const filepath = path.join(dir, filename);
    const text = fs.readFileSync(filepath, 'utf8');
    const questions = parseFaqQuestions(text);
    const exactMatches = [];
    const shortMatches = [];
    for (const q of questions) {
      if (sharedSet.has(q)) exactMatches.push(q);
      else if (u4Short && q === u4Short && u4 !== u4Short) shortMatches.push(q);
    }
    if (exactMatches.length > 0 || shortMatches.length > 0) {
      rows.push({ filename, exactMatches, shortMatches });
      perLocale[locale].exactCount += exactMatches.length;
      perLocale[locale].shortCount += shortMatches.length;
    }
  }

  console.log(`## ${locale.toUpperCase()} — ${rows.length} file(s) flagged\n`);
  console.log(`**Shared U-questions in this locale:**`);
  shared.forEach((q, i) => console.log(`- U${i + 1}: "${q}"`));
  if (u4Short && u4Short !== u4) console.log(`- **U4 short form to also delete:** "${u4Short}"`);
  console.log('');

  if (rows.length === 0) {
    console.log(`*(no per-tool duplicates — clean)*\n`);
    continue;
  }
  console.log(`| File | EXACT-match deletions (matches shared U-question) | U4-SHORT deletions |`);
  console.log(`|---|---|---|`);
  for (const r of rows) {
    const ex = r.exactMatches.length ? r.exactMatches.map(q => `"${q}"`).join(' ; ') : '—';
    const sh = r.shortMatches.length ? r.shortMatches.map(q => `"${q}"`).join(' ; ') : '—';
    console.log(`| ${r.filename} | ${ex} | ${sh} |`);
  }
  console.log('');
  totalExact += perLocale[locale].exactCount;
  totalShort += perLocale[locale].shortCount;
}

console.log('## Totals\n');
console.log(`| Locale | EXACT deletions | U4-SHORT deletions | Total |`);
console.log(`|---|---|---|---|`);
for (const locale of LOCALES) {
  const p = perLocale[locale];
  const t = (p.exactCount || 0) + (p.shortCount || 0);
  console.log(`| ${locale} | ${p.exactCount || 0} | ${p.shortCount || 0} | ${t} |`);
}
console.log(`| **GRAND TOTAL** | **${totalExact}** | **${totalShort}** | **${totalExact + totalShort}** |`);
