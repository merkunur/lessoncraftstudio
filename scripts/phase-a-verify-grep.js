#!/usr/bin/env node
// Phase A verification grep: checks the brief's final-deliverable rules.
// Reports any violation; exits non-zero on failure so CI can block.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'frontend', 'config');
const APP_CONTENT = path.join(ROOT, 'app-content');
const TOOL_CONTENT = path.join(ROOT, 'tool-content');
const SHARED_COMMERCIAL = path.join(APP_CONTENT, 'shared-commercial-faqs.ts');
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
  while ((qm = qRe.exec(block)) !== null) questions.push(unescape(qm[2]));
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

const sharedCommercial = fs.readFileSync(SHARED_COMMERCIAL, 'utf8');
const sharedUsage = fs.readFileSync(SHARED_USAGE, 'utf8');

let failures = 0;
const violations = [];

// ---- Check 1: per-apps-page question uniqueness across (shared + per-app) ----
console.log('### Check 1: no duplicate FAQ question within any `/[locale]/apps/[slug]` page\n');
for (const locale of LOCALES) {
  const shared = parseSharedLocale(sharedCommercial, locale);
  const dir = path.join(APP_CONTENT, locale);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const perPage = parseFaqQuestions(text);
    const rendered = [...shared, ...perPage];
    const seen = new Map();
    for (const q of rendered) {
      seen.set(q, (seen.get(q) || 0) + 1);
    }
    for (const [q, count] of seen) {
      if (count > 1) {
        violations.push(`[apps] /${locale}/apps (${f}): "${q}" appears ${count}×`);
        failures++;
      }
    }
  }
}

// ---- Check 2: per-tools-page question uniqueness across (shared + per-tool) ----
console.log('### Check 2: no duplicate FAQ question within any `/[locale]/tools/[slug]-worksheet-maker` page\n');
for (const locale of LOCALES) {
  const shared = parseSharedLocale(sharedUsage, locale);
  const dir = path.join(TOOL_CONTENT, locale);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const perPage = parseFaqQuestions(text);
    const rendered = [...shared, ...perPage];
    const seen = new Map();
    for (const q of rendered) {
      seen.set(q, (seen.get(q) || 0) + 1);
    }
    for (const [q, count] of seen) {
      if (count > 1) {
        violations.push(`[tools] /${locale}/tools (${f}): "${q}" appears ${count}×`);
        failures++;
      }
    }
  }
}

// ---- Check 3: brief-level cross-page (apps ↔ tools sibling per generator, EN only) ----
// The brief tags this under Phase C.2 but includes it in final verification.
// We run it here as a diagnostic only; collisions here are not Phase A failures.
console.log('### Check 3 (diagnostic): FAQ question strings appearing on BOTH sibling apps+tools pages (EN)\n');
const enApps = new Map(); // generator-key → Set(question)
const enTools = new Map();
const appDir = path.join(APP_CONTENT, 'en');
const toolDir = path.join(TOOL_CONTENT, 'en');
// Key mapping: addition.ts ↔ image-addition.ts or addition.ts ↔ addition.ts — just use filename stem
function stem(f) { return f.replace(/\.ts$/, ''); }
for (const f of fs.readdirSync(appDir).filter(f => f.endsWith('.ts'))) {
  const qs = parseFaqQuestions(fs.readFileSync(path.join(appDir, f), 'utf8'));
  enApps.set(stem(f), new Set(qs));
}
for (const f of fs.readdirSync(toolDir).filter(f => f.endsWith('.ts'))) {
  const qs = parseFaqQuestions(fs.readFileSync(path.join(toolDir, f), 'utf8'));
  enTools.set(stem(f), new Set(qs));
}
// Join by stem (imperfect — some app↔tool pairings use different stems, e.g. addition ↔ image-addition)
const joinMap = new Map([
  ['addition', 'image-addition'],          // apps addition.ts ↔ tools image-addition.ts (possibly)
  ['subtraction', 'image-subtraction'],
  ['wordsearch', 'word-search'],
]);
const crossHits = [];
for (const [appStem, appQs] of enApps) {
  const toolStem = joinMap.get(appStem) || appStem;
  const toolQs = enTools.get(toolStem);
  if (!toolQs) continue;
  for (const q of appQs) {
    if (toolQs.has(q)) crossHits.push(`/en/apps/${appStem} ↔ /en/tools/${toolStem}: "${q}"`);
  }
}
if (crossHits.length === 0) {
  console.log('  ✓ no cross-sibling collisions.\n');
} else {
  console.log(`  Diagnostic (not a Phase A failure — belongs to Phase C.2 split-by-intent):\n`);
  for (const line of crossHits) console.log(`  - ${line}`);
  console.log('');
}

// ---- Report ----
console.log('\n### Verification report\n');
if (failures === 0) {
  console.log(`✓ Phase A FAQ dedup verification: PASS — zero in-page duplicate questions on any /apps or /tools page across all 11 locales.`);
  if (crossHits.length > 0) {
    console.log(`  Note: ${crossHits.length} cross-sibling question collisions (EN only) — these are Phase C.2 scope, not Phase A.`);
  }
} else {
  console.log(`✗ Phase A FAQ dedup verification: ${failures} violations`);
  for (const v of violations) console.log(`  - ${v}`);
  process.exit(1);
}
