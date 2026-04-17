#!/usr/bin/env node
// Phase C.2 — split FAQs by intent.
//
// Apps pages keep ONLY commercial/licensing FAQs. Tools pages keep ONLY
// usage/technical + generator-specific FAQs.
//
// Two-pass:
//   1. Classify each per-app FAQ (EN). Commercial → keep. Everything else → delete.
//   2. Classify each per-tool FAQ (EN). Commercial → delete. Everything else → keep.
//
// Also adds 2 missing canonical FAQs to the shared commercial pool (all 11
// locales) — handled via a separate Edit pass (not this script).

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const APP_DIR = path.join(ROOT, 'app-content', 'en');
const TOOL_DIR = path.join(ROOT, 'tool-content', 'en');

// Commercial-intent keyword list (case-insensitive). Any EN question
// containing ≥ 1 of these is considered commercial.
const COMMERCIAL_KEYWORDS = [
  'refund', 'license', 'commercial', 'royalt', 'monetiz',
  ' sell', 'sell ', 'selling', 'resell', 'seller',
  'Etsy', 'KDP', 'TPT', 'Teachers Pay Teachers', 'Gumroad', 'marketplace',
  'bundle', 'bundling', 'price', 'pricing', 'revenue', 'profit',
  'team ', 'employee', 'virtual assistant', 'per-sale', 'ongoing fee',
  'buyer', 'marketplace',
  'after I purchase', 'after purchase',
  'as separate products', 'different products',
  '11 languages as separate',
];

function isCommercialQuestion(q) {
  const lower = q.toLowerCase();
  for (const kw of COMMERCIAL_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) return true;
  }
  return false;
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
  if (!m) return null;
  return m[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
}

// Remove an entry, including leading whitespace on its line and trailing comma+newline.
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

function processFile(filepath, keepCommercial) {
  let text = fs.readFileSync(filepath, 'utf8');
  const originalText = text;
  const removed = [];
  while (true) {
    const faqStart = findFaqArrayStart(text);
    if (faqStart < 0) break;
    const entries = listFaqEntries(text, faqStart);
    let toRemove = null;
    for (const e of entries) {
      const entryText = text.slice(e.start, e.end);
      const q = extractQuestion(entryText);
      if (!q) continue;
      const isComm = isCommercialQuestion(q);
      // keepCommercial=true means this is an apps file: keep commercial, remove non-commercial
      // keepCommercial=false means this is a tools file: keep non-commercial, remove commercial
      const shouldRemove = keepCommercial ? !isComm : isComm;
      if (shouldRemove) { toRemove = e; removed.push(q); break; }
    }
    if (!toRemove) break;
    text = removeEntry(text, toRemove.start, toRemove.end);
  }
  if (text !== originalText) {
    if (!DRY_RUN) fs.writeFileSync(filepath, text, 'utf8');
    return removed;
  }
  return [];
}

// Apps: keep commercial only
console.log('=== Apps EN — keep commercial, remove others ===');
let appsRemovedTotal = 0;
const appFiles = fs.readdirSync(APP_DIR).filter(f => f.endsWith('.ts')).sort();
for (const f of appFiles) {
  const filepath = path.join(APP_DIR, f);
  const removed = processFile(filepath, true);
  if (removed.length > 0) {
    console.log(`\n[apps/${f}] removed ${removed.length}:`);
    for (const q of removed) console.log(`  - ${q}`);
    appsRemovedTotal += removed.length;
  }
}

// Tools: remove commercial only
console.log('\n=== Tools EN — remove commercial ===');
let toolsRemovedTotal = 0;
const toolFiles = fs.readdirSync(TOOL_DIR).filter(f => f.endsWith('.ts')).sort();
for (const f of toolFiles) {
  const filepath = path.join(TOOL_DIR, f);
  const removed = processFile(filepath, false);
  if (removed.length > 0) {
    console.log(`\n[tools/${f}] removed ${removed.length}:`);
    for (const q of removed) console.log(`  - ${q}`);
    toolsRemovedTotal += removed.length;
  }
}

console.log(`\n=== Summary ===`);
console.log(`Apps EN: ${appsRemovedTotal} non-commercial FAQs removed`);
console.log(`Tools EN: ${toolsRemovedTotal} commercial FAQs removed`);
if (DRY_RUN) console.log('\n[DRY RUN] No files written.');
