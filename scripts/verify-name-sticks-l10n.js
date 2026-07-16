#!/usr/bin/env node
/* =====================================================================
   verify-name-sticks-l10n.js — build-gate for the Name Sticks strings
   (mini tools/name-sticks.js).

   MEASURED invariants (fix the data, never the gate):
     1. every strings key carries ALL 11 locales, non-empty
     2. the 6 team-name keys exist (teamFox/Turtle/Bee/Rabbit/Whale/Owl)
        and every TEAMS entry references an existing key + a valid
        animal glyph
     3. the privacy line + the free-session note exist ×11 (the PII
        promise must be readable in every locale)
     4. {n} survives in sticksLeft ×11; {name} survives in dupPrompt ×11
     5. no locale value contains "Common Core"
     6. all 12 ANIMAL_KEYS have a glyph in ANIMALS
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const TEAM_KEYS = ['teamFox', 'teamTurtle', 'teamBee', 'teamRabbit', 'teamWhale', 'teamOwl'];
const file = path.join(__dirname, '..', 'mini tools', 'name-sticks.js');
const errors = [];
const E = (m) => errors.push(m);

const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '' }, localStorage: { getItem: () => null, setItem: () => {} }, sessionStorage: { getItem: () => null, setItem: () => {} } };
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const tool = sandbox.NameSticks;
if (!tool || !tool.strings) { console.log('FAIL  NameSticks.strings not found'); process.exit(1); }
const S = tool.strings;

const keys = Object.keys(S);
for (const key of keys) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`${key}.${L}: missing/empty`);
    else if (v.includes('Common Core')) E(`${key}.${L}: mentions Common Core`);
  }
}
for (const k of TEAM_KEYS) if (!S[k]) E(`team key ${k} missing`);
for (const k of ['privacyLine', 'freeNote']) if (!S[k]) E(`${k} missing (the PII promise)`);
for (const L of LOCALES) {
  if (S.sticksLeft && S.sticksLeft[L] && !S.sticksLeft[L].includes('{n}')) E(`sticksLeft.${L}: {n} missing`);
  if (S.dupPrompt && S.dupPrompt[L] && !S.dupPrompt[L].includes('{name}')) E(`dupPrompt.${L}: {name} missing`);
}
(tool.TEAMS || []).forEach((t) => {
  if (!S[t.key]) E(`TEAMS references unknown key ${t.key}`);
  if (!tool.ANIMALS[t.animal]) E(`TEAMS references unknown animal ${t.animal}`);
});
(tool.ANIMAL_KEYS || []).forEach((a) => { if (!tool.ANIMALS[a]) E(`ANIMAL_KEYS "${a}" has no glyph`); });
if ((tool.ANIMAL_KEYS || []).length !== 12) E(`ANIMAL_KEYS length ${(tool.ANIMAL_KEYS || []).length} (need 12)`);

console.log(`${errors.length ? 'FAIL' : 'PASS'}  name-sticks l10n  (${keys.length} keys × 11 locales, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
