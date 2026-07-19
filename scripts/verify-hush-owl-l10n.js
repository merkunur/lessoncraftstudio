#!/usr/bin/env node
/* =====================================================================
   verify-hush-owl-l10n.js — build-gate for the Hush Owl strings
   (mini tools/hush-owl.js).

   MEASURED invariants (fix the data, never the gate):
     1. every strings key carries ALL 11 locales, non-empty
     2. the 4 level-name keys exist and are DISTINCT within each locale
        (two levels sharing a name would make the wooden sign ambiguous)
     3. the privacy line exists ×11 and looks like the ruled triple —
        it must contain an em-dash clause and be ≥80 chars (the
        recorded/saved/sent promise cannot shrink to a fragment)
     4. no child-facing string contains a decibel token (dB / decibel /
        Dezibel / décibel / decibelli…) — numbers-free is pedagogy-locked
     5. no locale value contains "Common Core"
     6. LEVEL_ORDER ↔ LEVELS ↔ LEVEL_LABEL ↔ PICTO stay consistent
        (every level key resolves a threshold, a label key and a pictogram)
     7. settings option labelKeys resolve to real string keys
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const file = path.join(__dirname, '..', 'mini tools', 'hush-owl.js');
const errors = [];
const E = (m) => errors.push(m);

/* evaluate the tool file in a sandbox to get the real strings object */
const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '', hostname: 'gate' }, localStorage: { getItem: () => null, setItem: () => {} } };
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const tool = sandbox.HushOwl;
if (!tool || !tool.strings) { console.log('FAIL  HushOwl.strings not found'); process.exit(1); }
const S = tool.strings;

/* 1 + 5: completeness + no Common Core */
const keys = Object.keys(S);
for (const key of keys) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`${key}.${L}: missing/empty`);
    else if (v.includes('Common Core')) E(`${key}.${L}: mentions Common Core`);
  }
}

/* 2: level names distinct per locale */
const LEVEL_KEYS = ['levelSilent', 'levelWhisper', 'levelPartner', 'levelGroup'];
for (const k of LEVEL_KEYS) if (!S[k]) E(`level key ${k} missing`);
for (const L of LOCALES) {
  const names = LEVEL_KEYS.map((k) => (S[k] && S[k][L] || '').trim().toLowerCase()).filter(Boolean);
  if (new Set(names).size !== names.length) E(`level names collide in ${L}: [${names.join(' | ')}]`);
}

/* 3: the privacy promise */
for (const L of LOCALES) {
  const v = (S.privacy && S.privacy[L]) || '';
  if (v.length < 80) E(`privacy.${L}: too short (${v.length} chars) — the recorded/saved/sent triple cannot shrink`);
  if (!/—/.test(v)) E(`privacy.${L}: missing the em-dash clause`);
}

/* 4: no decibel tokens anywhere (numbers-free is pedagogy-locked) */
const DB_RE = /\bdB\b|[Dd]ecibel|[Dd]ezibel|[Dd]écibel|desibel|decibelli/;
for (const key of keys) {
  for (const L of LOCALES) {
    const v = S[key][L] || '';
    if (DB_RE.test(v)) E(`${key}.${L}: contains a decibel token`);
  }
}

/* 6: level table consistency */
(tool.LEVEL_ORDER || []).forEach((lv) => {
  if (!(tool.LEVELS && typeof tool.LEVELS[lv] === 'number')) E(`LEVELS.${lv}: threshold missing`);
  if (!(tool.LEVEL_LABEL && S[tool.LEVEL_LABEL[lv]])) E(`LEVEL_LABEL.${lv}: does not resolve a string key`);
  if (!(tool.PICTO && tool.PICTO[lv])) E(`PICTO.${lv}: pictogram missing`);
});
if ((tool.LEVEL_ORDER || []).length !== 4) E(`LEVEL_ORDER: ${(tool.LEVEL_ORDER || []).length} levels (need exactly 4)`);

/* 7: settings labelKeys resolve */
(tool.settings || []).forEach((f) => {
  if (!S[f.labelKey]) E(`settings.${f.key}: labelKey ${f.labelKey} unresolved`);
  (f.options || []).forEach((o) => { if (!S[o.labelKey]) E(`settings.${f.key}.${o.value}: labelKey ${o.labelKey} unresolved`); });
});

console.log(`${errors.length ? 'FAIL' : 'PASS'}  hush-owl l10n  (${keys.length} keys × 11 locales, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
