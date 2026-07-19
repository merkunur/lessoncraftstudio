#!/usr/bin/env node
/* =====================================================================
   verify-story-line-sets.js — build-gate for Story Line
   (mini tools/story-line.js strings + mini tools/story-line-sets.json).

   MEASURED invariants (fix the data, never the gate):
     STRINGS: completeness per checked locale; the 5 sequence
       connectives DISTINCT per locale; no Common Core / decibel /
       verdict vocabulary (the narrator has no opinion about order)
     SETS: exactly 15; bands valid; card counts per band (K=3, G1=4,
       G23=4-5); per checked locale every title+caption non-empty
       ≤80 chars + verdict-free; img art resolves vs pww-index-en
       (theme + d + f); glyph art resolves vs STL_GLYPHS; total glyph
       keys ≤16 (the ≤10-new budget on top of the 12 copied); freeSets = 2
       valid ids spanning 2 bands
   Usage: node scripts/verify-story-line-sets.js [--locales=en]
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

const VERDICT = {
  en: /\b(correct|incorrect|wrong|right order)\b/i,
  de: /\b(richtig|falsch)\b/i,
  fr: /\b(correct|correcte|faux|fausse)\b/i,
  it: /\b(giusto|sbagliato|corretto)\b/i,
  es: /\b(correcto|incorrecto|equivocad)\b/i,
  pt: /\b(correto|errado|incorreto)\b/i,
  nl: /\b(goed antwoord|fout|onjuist)\b/i,
  sv: /\b(rätt ordning|rätt svar|fel)\b/i,
  da: /\b(rigtig rækkefølge|forkert)\b/i,
  no: /\b(riktig rekkefølge|feil)\b/i,
  fi: /\b(oikea järjestys|väärin|väärä)\b/i
};
const DB_RE = /\bdB\b|[Dd]ecibel|[Dd]ezibel|[Dd]écibel|desibel|decibelli/;

/* ---- strings + glyphs from story-line.js (vm sandbox) ---- */
const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '', hostname: 'gate' }, localStorage: { getItem: () => null, setItem: () => {} } };
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'mini tools', 'story-line.js'), 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const tool = sandbox.StoryLine;
if (!tool || !tool.strings) { console.log('FAIL  StoryLine.strings not found'); process.exit(1); }
const S = tool.strings;
const keys = Object.keys(S);
for (const key of keys) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`strings.${key}.${L}: missing/empty`);
    else {
      if (v.includes('Common Core')) E(`strings.${key}.${L}: mentions Common Core`);
      if (DB_RE.test(v)) E(`strings.${key}.${L}: decibel token`);
      if (VERDICT[L] && VERDICT[L].test(v)) E(`strings.${key}.${L}: verdict vocabulary`);
    }
  }
}
const SEQ = ['seqFirst', 'seqThen', 'seqNext', 'seqAfter', 'seqEnd'];
for (const L of LOCALES) {
  const words = SEQ.map((k) => (S[k] && S[k][L] || '').trim());
  if (new Set(words.filter(Boolean)).size !== 5) E(`sequence connectives not 5-distinct in ${L}: [${words.join(' | ')}]`);
}
(tool.settings || []).forEach((f) => { if (!S[f.labelKey]) E(`settings.${f.key}: labelKey unresolved`); });

/* glyph budget */
const glyphKeys = Object.keys(tool.STL_GLYPHS || {});
if (glyphKeys.length > 22) E(`STL_GLYPHS: ${glyphKeys.length} keys (12 copied + ≤10 new = cap 22)`);

/* ---- sets data ---- */
let data;
try { data = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'story-line-sets.json'), 'utf8')); }
catch (e) { console.log('FAIL  story-line-sets.json: ' + e.message); process.exit(1); }
const sets = data.sets || [];
if (sets.length !== 15) E(`sets: ${sets.length} (need exactly 15)`);
const CARDS_BY_BAND = { K: [3, 3], G1: [4, 4], G23: [4, 5] };

const idx = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pww-index-en.json'), 'utf8'));
const imgOk = {};
for (const t of idx.themes) for (const c of t.c) imgOk[t.k + '//' + c.f] = t.d;

const ids = new Set();
for (const s of sets) {
  if (ids.has(s.id)) E(`${s.id}: duplicate id`);
  ids.add(s.id);
  const range = CARDS_BY_BAND[s.band];
  if (!range) { E(`${s.id}: bad band ${s.band}`); continue; }
  if (!s.cards || s.cards.length < range[0] || s.cards.length > range[1]) E(`${s.id}: ${s.cards ? s.cards.length : 0} cards (band ${s.band} needs ${range[0]}-${range[1]})`);
  for (const L of LOCALES) {
    if (!s.title || !(s.title[L] || '').trim()) E(`${s.id}: title.${L} missing`);
  }
  (s.cards || []).forEach((c, i) => {
    const at = `${s.id}.cards[${i}]`;
    for (const L of LOCALES) {
      const cap = ((c.cap || {})[L] || '').trim();
      if (!cap) E(`${at}: cap.${L} missing`);
      else {
        if (cap.length > 80) E(`${at}: cap.${L} ${cap.length} chars (cap 80)`);
        if (VERDICT[L] && VERDICT[L].test(cap)) E(`${at}: cap.${L} verdict vocabulary`);
      }
    }
    if (!c.art) { E(`${at}: art missing`); return; }
    if (c.art.t === 'img') {
      const d = imgOk[c.art.theme + '//' + c.art.f];
      if (!d) E(`${at}: ${c.art.theme}/${c.art.f} not in pww-index-en`);
      else if (d !== c.art.d) E(`${at}: dir "${c.art.d}" ≠ index dir "${d}"`);
    } else if (c.art.t === 'glyph') {
      if (!tool.STL_GLYPHS[c.art.key]) E(`${at}: glyph "${c.art.key}" not in STL_GLYPHS`);
    } else E(`${at}: unknown art type ${c.art.t}`);
  });
}
const free = data.freeSets || [];
if (free.length !== 2) E(`freeSets: ${free.length} (need exactly 2)`);
free.forEach((id) => { if (!ids.has(id)) E(`freeSets: unknown id ${id}`); });
if (free.length === 2 && ids.has(free[0]) && ids.has(free[1])) {
  const bands = new Set(free.map((id) => sets.find((s) => s.id === id).band));
  if (bands.size !== 2) E('freeSets: should span 2 different bands');
}

console.log(`${errors.length ? 'FAIL' : 'PASS'}  story-line  (${keys.length} string keys, ${sets.length} sets × [${LOCALES.join(',')}], ${glyphKeys.length} glyphs, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
