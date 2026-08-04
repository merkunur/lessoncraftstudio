#!/usr/bin/env node
/* =====================================================================
   apply-fraction-kitchen-locales.js — write the strings block from SoT
   ---------------------------------------------------------------------
   Run:  node scripts/apply-fraction-kitchen-locales.js [--dry-run]

   Rewrites the whole `strings: { … }` block in mini tools/fraction-kitchen.js
   from scripts/_fraction-kitchen-strings.js. Idempotent.

   It replaces apply-fraction-kitchen-fanout.js, which reads a scratchpad
   path from a session that ended long ago and therefore can never run
   again — so until now no string in this tool could be changed
   reproducibly at all.

   ⚠ IT REFUSES TO WRITE rather than ship a defect:
     · a missing or empty key in any locale
     · a key present in one locale and absent in another
     · a non-EN string identical to the English (an untranslated leak),
       excepting the handful that are genuinely the same word everywhere
     · a lost or invented placeholder
     · fraction NOTATION (½, 3/4) — this tool is meaning before notation
     · a VERDICT word — the kitchen has no opinion about a cut
     · "Common Core" (verify §4 bans it, and the framework name is
       localized per §20.10 anyway)
     · ⭐ A DOUBLED ARTICLE ONCE THE FORMS ARE SLOTTED IN. English shipped
       three of these — "one one half", "cut the the pizza", "share the
       the cake" — because the `s` and food forms already carry an
       article and the template added another. A template check cannot
       see it; only the RENDERED string can.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const TOOL = path.join(REPO, 'mini tools', 'fraction-kitchen.js');
const SOT = require('./_fraction-kitchen-strings.js');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const errors = [];
const E = (m) => errors.push(m);

/* ⚠ AN AUDITABLE EXEMPTION LIST, never a loosened rule. Each entry states
   WHY it may legitimately match the English:
     chipPizza  — "Pizza" is the word in all eleven
     chipBar/chipCake — several locales share the English form
     pieceName  — a bare `{fs}` slot; the article lives in the FRAC form
     pieceCount — a pure-slot template `{a} {small}` with NO WORDS at all.
                  It exists so a locale CAN reorder or add a particle, not
                  because any of them needs to today. */
const SHARED_OK = new Set(['chipPizza', 'chipBar', 'chipCake', 'pieceName', 'pieceCount']);

const NOTATION = /\d\s*\/\s*\d|[½⅓¼⅙⅛⅔¾⅚⅜]/;
const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops)\b/i, de: /\b(richtig|falsch)\b/i,
  fr: /\b(correct|correcte|faux|fausse)\b/i, it: /\b(giusto|sbagliato|corretto)\b/i,
  es: /\b(correcto|incorrecto|equivocad)\b/i, pt: /\b(correto|errado|incorreto)\b/i,
  nl: /\b(goed antwoord|fout|onjuist)\b/i, sv: /\b(rätt svar|fel)\b/i,
  da: /\b(rigtigt svar|forkert)\b/i, no: /\b(riktig svar|feil)\b/i,
  fi: /\b(oikein|väärin|väärä)\b/i
};

/* ---- 1. shape ------------------------------------------------------ */
for (const L of LOCALES) if (!SOT[L]) E(`SoT is missing the locale "${L}"`);
const keys = Object.keys(SOT.en || {});
if (keys.length < 20) E(`SoT parsed only ${keys.length} keys — implausible; refusing to run`);
for (const L of LOCALES) {
  if (!SOT[L]) continue;
  for (const k of keys) {
    const v = SOT[L][k];
    if (typeof v !== 'string' || !v.trim()) { E(`${L}.${k} is missing or empty`); continue; }
    const ph = (SOT.en[k].match(/\{\w+\}/g) || []);
    for (const p of ph) if (v.indexOf(p) < 0) E(`${L}.${k} drops the placeholder ${p}`);
    for (const p of (v.match(/\{\w+\}/g) || [])) if (ph.indexOf(p) < 0) E(`${L}.${k} invents the placeholder ${p}`);
    if (NOTATION.test(v)) E(`${L}.${k} contains fraction notation: "${v}"`);
    if (VERDICT[L] && VERDICT[L].test(v)) E(`${L}.${k} contains verdict vocabulary: "${v}"`);
    if (/Common Core/i.test(v)) E(`${L}.${k} names Common Core`);
    if (L !== 'en' && v === SOT.en[k] && !SHARED_OK.has(k)) E(`${L}.${k} is identical to the English — an untranslated leak`);
  }
  for (const k of Object.keys(SOT[L])) if (keys.indexOf(k) < 0) E(`${L} has an extra key "${k}" that en does not`);
}

/* ---- 2. ⭐ the RENDERED doubling check ------------------------------ */
{
  const sandbox = {
    window: {}, navigator: {}, location: { search: '' },
    document: { createElement: () => ({ style: {} }), head: { appendChild() {} }, addEventListener() {}, body: { classList: { add() {} } } },
    localStorage: { getItem: () => null, setItem() {} }, URLSearchParams, Math, JSON, Date
  };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(TOOL, 'utf8'), sandbox);
  const FRAC = sandbox.FractionKitchen.FRAC;
  const foods = ['foodPizza', 'foodBar', 'foodCake'];
  for (const L of LOCALES) {
    if (!SOT[L]) continue;
    const slot = (k, extra) => {
      let s = SOT[L][k] || '';
      const a = Object.assign({ n: 4, f: 3, p: 6, a: 2, fp: FRAC[4].p[L], fs: FRAC[4].s[L], fc: FRAC[4].c[L], small: FRAC[4].c[L], big: FRAC[2].s[L] }, extra);
      return s.replace(/\{(\w+)\}/g, (m, key) => (key in a) ? String(a[key]) : m);
    };
    for (const k of keys) {
      const renders = foods.map((f) => slot(k, { food: SOT[L][f] }));
      for (const r of renders) {
        const d = /(?:^|\s)(\p{L}+)\s+\1(?=\s|[.!?,]|$)/iu.exec(r);
        if (d) E(`${L}.${k} renders "${r}" — the doubled word "${d[1]} ${d[1]}" (the template adds what the slotted form already carries)`);
      }
    }
  }
}

if (errors.length) {
  console.log(`REFUSING TO WRITE — ${errors.length} problem(s):`);
  errors.slice(0, 30).forEach((e) => console.log('  ✗ ' + e));
  if (errors.length > 30) console.log(`  … +${errors.length - 30} more`);
  process.exit(1);
}

/* ---- 3. rebuild the block ------------------------------------------ */
const src = fs.readFileSync(TOOL, 'utf8');
const start = src.indexOf('  strings: {');
if (start < 0) { console.log('FAIL: no `strings: {` block found'); process.exit(1); }
/* find the matching close: the block ends at the line `  },` at depth 0 */
/* ⚠ THE SCANNER MUST SKIP COMMENTS. Without that, a quotation mark inside
   an explanatory comment — and this block is full of them — opens a string
   the scanner never closes, and the whole match desyncs. It reported
   "unbalanced strings block" on a file `node --check` calls perfectly
   valid, which is exactly the shape of a tool blaming its subject. */
let i = src.indexOf('{', start), depth = 0, end = -1, q = null;
for (; i < src.length; i++) {
  const c = src[i], nx = src[i + 1];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '/' && nx === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? src.length : e + 1; continue; }
  if (c === '/' && nx === '/') { const e = src.indexOf('\n', i); i = e < 0 ? src.length : e; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (!depth) { end = i; break; } }
}
if (end < 0) { console.log('FAIL: unbalanced strings block'); process.exit(1); }

const esc = (s) => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const width = Math.max.apply(null, keys.map((k) => k.length));
let block = '  strings: {\n';
keys.forEach((k, idx) => {
  const row = LOCALES.map((L) => L + ':' + esc(SOT[L][k])).join(',');
  block += '    ' + (k + ':').padEnd(width + 2) + '{' + row + '}' + (idx === keys.length - 1 ? '' : ',') + '\n';
});
block += '  }';

const out = src.slice(0, start) + block + src.slice(end + 1);
if (out === src) { console.log('apply-fraction-kitchen-locales: already up to date (no change)'); process.exit(0); }
if (DRY) {
  console.log(`DRY RUN — would rewrite ${keys.length} keys × ${LOCALES.length} locales (${out.length - src.length >= 0 ? '+' : ''}${out.length - src.length} bytes)`);
  process.exit(0);
}
fs.writeFileSync(TOOL, out, 'utf8');
console.log(`apply-fraction-kitchen-locales: wrote ${keys.length} keys × ${LOCALES.length} locales`);
console.log('⚠ bump the ?v=N cache-buster in fraction-kitchen.html (§A.13.42) and re-run verify + local-test.');
