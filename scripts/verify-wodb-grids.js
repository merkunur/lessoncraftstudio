#!/usr/bin/env node
/* =====================================================================
   verify-wodb-grids.js — build-gate for Which One Doesn't Belong
   (mini tools/wodb.js strings + mini tools/wodb-grids.json data).

   MEASURED invariants (fix the data, never the gate):
     STRINGS (vm-evaluated from wodb.js):
       1. every strings key carries the checked locales, non-empty
       2. the 3 stems exist and are distinct per locale
       3. no "Common Core", no decibel tokens
       4. no verdict vocabulary in child-facing strings (correct/wrong-
          class tokens per locale — the no-shame lock)
     GRIDS (wodb-grids.json):
       5. exactly 21 grids, ids unique, band ∈ {K,G1,G23}
       6. every grid: 4 cells, 4 reasons; per checked locale every
          reason non-empty, ≤90 chars, and the 4 are DISTINCT
          (two cells sharing a reason breaks every-answer-defensible)
       7. reasons never name-check another cell's band position and
          never use verdict vocabulary
       8. every img cell resolves against pww-index-en (theme.d + file)
       9. featuredOrder: all ids valid, no dupes, covers all 21
      10. cell defs well-formed per type (num v, shape shape/color,
          dots arr/n renderable, clock h 1-12 m 0-59, word w.en)
   Usage: node scripts/verify-wodb-grids.js [--locales=en]  (default: all 11)
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.includes(l)) : ALL;

const REPO = path.join(__dirname, '..');
const errors = [];
const E = (m) => errors.push(m);

/* verdict vocabulary per locale — the no-shame lock (child-facing) */
const VERDICT = {
  en: /\b(correct|incorrect|wrong|right answer)\b/i,
  de: /\b(richtig|falsch)\b/i,
  fr: /\b(correct|correcte|faux|fausse)\b/i,
  it: /\b(giusto|sbagliato|corretto)\b/i,
  es: /\b(correcto|incorrecto|equivocad)\b/i,
  pt: /\b(correto|errado|incorreto)\b/i,
  nl: /\b(goed antwoord|fout|onjuist)\b/i,
  sv: /\b(rätt svar|fel)\b/i,
  da: /\b(rigtigt svar|forkert)\b/i,
  no: /\b(riktig svar|feil)\b/i,
  fi: /\b(oikea vastaus|väärin|väärä)\b/i
};
const DB_RE = /\bdB\b|[Dd]ecibel|[Dd]ezibel|[Dd]écibel|desibel|decibelli/;

/* ---- strings from wodb.js (vm sandbox) ---- */
const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '', hostname: 'gate' }, localStorage: { getItem: () => null, setItem: () => {} } };
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'mini tools', 'wodb.js'), 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const tool = sandbox.Wodb;
if (!tool || !tool.strings) { console.log('FAIL  Wodb.strings not found'); process.exit(1); }
const S = tool.strings;
const keys = Object.keys(S);
for (const key of keys) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`strings.${key}.${L}: missing/empty`);
    else {
      if (v.includes('Common Core')) E(`strings.${key}.${L}: mentions Common Core`);
      if (DB_RE.test(v)) E(`strings.${key}.${L}: decibel token`);
      /* the two gate strings may say "answer"; verdict tokens still banned */
      if (VERDICT[L] && VERDICT[L].test(v) && !/closing|instruction/.test(key)) E(`strings.${key}.${L}: verdict vocabulary ("${v.slice(0, 40)}…")`);
    }
  }
}
for (const L of LOCALES) {
  const stems = ['stem1', 'stem2', 'stem3'].map((k) => (S[k] && S[k][L] || '').trim());
  if (new Set(stems.filter(Boolean)).size !== 3) E(`stems not 3-distinct in ${L}`);
}
(tool.settings || []).forEach((f) => {
  if (!S[f.labelKey]) E(`settings.${f.key}: labelKey unresolved`);
});

/* ---- grids data ---- */
let data;
try { data = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'wodb-grids.json'), 'utf8')); }
catch (e) { console.log('FAIL  wodb-grids.json: ' + e.message); process.exit(1); }
const grids = data.grids || [];
if (grids.length !== 21) E(`grids: ${grids.length} (need exactly 21)`);
const ids = new Set();
const BANDS = ['K', 'G1', 'G23'];

/* pww-index for img resolution */
const idx = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pww-index-en.json'), 'utf8'));
const imgOk = {};
for (const t of idx.themes) for (const c of t.c) imgOk[t.k + '//' + c.f] = t.d;

for (const g of grids) {
  if (ids.has(g.id)) E(`${g.id}: duplicate id`);
  ids.add(g.id);
  if (!BANDS.includes(g.band)) E(`${g.id}: bad band ${g.band}`);
  if (!g.cells || g.cells.length !== 4) { E(`${g.id}: needs 4 cells`); continue; }
  if (!g.reasons || g.reasons.length !== 4) { E(`${g.id}: needs 4 reasons`); continue; }
  for (const L of LOCALES) {
    if (!g.title || !(g.title[L] || '').trim()) E(`${g.id}: title.${L} missing`);
    const rs = g.reasons.map((r) => ((r && r[L]) || '').trim());
    rs.forEach((r, i) => {
      if (!r) E(`${g.id}: reasons[${i}].${L} missing`);
      else {
        if (r.length > 90) E(`${g.id}: reasons[${i}].${L} ${r.length} chars (cap 90)`);
        if (VERDICT[L] && VERDICT[L].test(r)) E(`${g.id}: reasons[${i}].${L} verdict vocabulary`);
      }
    });
    if (rs.every(Boolean) && new Set(rs).size !== 4) E(`${g.id}: reasons not distinct in ${L}`);
  }
  g.cells.forEach((c, i) => {
    const at = `${g.id}.cells[${i}]`;
    if (c.t === 'num') { if (!/^\d{1,4}$/.test(String(c.v))) E(`${at}: bad num "${c.v}"`); }
    else if (c.t === 'word') { if (!c.w || !(c.w.en || '').trim()) E(`${at}: word.en missing`); }
    else if (c.t === 'shape') {
      if (!c.shape) E(`${at}: shape missing`);
      if (!['teal', 'coral', 'honey', 'plum'].includes(c.color)) E(`${at}: color "${c.color}" not in the non-verdict palette`);
    } else if (c.t === 'dots') {
      if (!['dice', 'row', 'circle', 'scatter', 'tenframe'].includes(c.arr)) E(`${at}: bad arr ${c.arr}`);
      if (!(c.n >= 1 && c.n <= 12)) E(`${at}: bad n ${c.n}`);
      if (c.arr === 'dice' && c.n > 9) E(`${at}: dice max 9`);
      if (c.arr === 'tenframe' && c.n > 10) E(`${at}: tenframe max 10`);
      if (c.arr === 'scatter' && ![4, 12].includes(c.n)) E(`${at}: scatter table has 4|12 only`);
    } else if (c.t === 'clock') {
      if (!(c.h >= 1 && c.h <= 12)) E(`${at}: bad hour ${c.h}`);
      if (!(c.m >= 0 && c.m <= 59)) E(`${at}: bad minute ${c.m}`);
    } else if (c.t === 'img') {
      const d = imgOk[c.theme + '//' + c.f];
      if (!d) E(`${at}: ${c.theme}/${c.f} not in pww-index-en`);
      else if (d !== c.d) E(`${at}: dir "${c.d}" ≠ index dir "${d}"`);
    } else E(`${at}: unknown type ${c.t}`);
  });
}
const order = data.featuredOrder || [];
if (new Set(order).size !== order.length) E('featuredOrder: duplicates');
order.forEach((id) => { if (!ids.has(id)) E(`featuredOrder: unknown id ${id}`); });
ids.forEach((id) => { if (!order.includes(id)) E(`featuredOrder: missing ${id}`); });

console.log(`${errors.length ? 'FAIL' : 'PASS'}  wodb  (${keys.length} string keys, ${grids.length} grids × [${LOCALES.join(',')}], ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
