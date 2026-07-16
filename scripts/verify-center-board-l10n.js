#!/usr/bin/env node
/* =====================================================================
   verify-center-board-l10n.js — build-gate for the Center Board strings
   (mini tools/center-board.js).

   MEASURED invariants (fix the data, never the gate):
     1. every strings key carries ALL 11 locales, non-empty
     2. the 12 station-default keys exist and every ICON_KEYS entry has
        a glyph + a name key
     3. the 6 team keys BYTE-MATCH the shipped name-sticks.js values
        (cross-tool identity: a rename in one tool must ripple)
     4. voiceRotate + voiceOneMin + doneLine present ×11
     5. {n} and {m} survive in roundOf ×11
     6. no locale value contains "Common Core"
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const STATION_KEYS = ['stListening', 'stLibrary', 'stMath', 'stTeacher', 'stWriting', 'stArt', 'stComputer', 'stBlocks', 'stScience', 'stWordWork', 'stGames', 'stDiscovery'];
const TEAM_KEYS = ['teamFox', 'teamTurtle', 'teamBee', 'teamRabbit', 'teamWhale', 'teamOwl'];
const errors = [];
const E = (m) => errors.push(m);

function loadTool(file, name) {
  const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '' }, localStorage: { getItem: () => null, setItem: () => {} }, sessionStorage: { getItem: () => null, setItem: () => {} } };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  return sandbox[name];
}

let tool, sticks;
try {
  tool = loadTool(path.join(__dirname, '..', 'mini tools', 'center-board.js'), 'CenterBoard');
  sticks = loadTool(path.join(__dirname, '..', 'mini tools', 'name-sticks.js'), 'NameSticks');
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
if (!tool || !tool.strings) { console.log('FAIL  CenterBoard.strings not found'); process.exit(1); }
const S = tool.strings;

const keys = Object.keys(S);
for (const key of keys) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`${key}.${L}: missing/empty`);
    else if (v.includes('Common Core')) E(`${key}.${L}: mentions Common Core`);
  }
}
for (const k of STATION_KEYS) if (!S[k]) E(`station key ${k} missing`);
for (const k of TEAM_KEYS) {
  if (!S[k]) { E(`team key ${k} missing`); continue; }
  for (const L of LOCALES) {
    if (sticks.strings[k] && S[k][L] !== sticks.strings[k][L]) {
      E(`${k}.${L}: "${S[k][L]}" ≠ name-sticks "${sticks.strings[k][L]}" (cross-tool byte-match)`);
    }
  }
}
for (const k of ['voiceRotate', 'voiceOneMin', 'doneLine']) if (!S[k]) E(`${k} missing`);
for (const L of LOCALES) {
  if (S.roundOf && S.roundOf[L]) {
    if (!S.roundOf[L].includes('{n}')) E(`roundOf.${L}: {n} missing`);
    if (!S.roundOf[L].includes('{m}')) E(`roundOf.${L}: {m} missing`);
  }
}
(tool.ICON_KEYS || []).forEach((k) => {
  if (!tool.STATION_ICONS[k]) E(`ICON_KEYS "${k}" has no glyph`);
  if (!tool.ICON_NAME_KEY[k] || !S[tool.ICON_NAME_KEY[k]]) E(`ICON_KEYS "${k}" has no name key`);
});
if ((tool.ICON_KEYS || []).length !== 12) E(`ICON_KEYS length ${(tool.ICON_KEYS || []).length} (need 12)`);
(tool.TEAMS || []).forEach((t) => {
  if (!S[t.key]) E(`TEAMS references unknown key ${t.key}`);
  if (!tool.ANIMALS[t.animal]) E(`TEAMS references unknown animal ${t.animal}`);
  if (!t.ink) E(`TEAMS ${t.key} missing ink (light-cup readability)`);
});

console.log(`${errors.length ? 'FAIL' : 'PASS'}  center-board l10n  (${keys.length} keys × 11 locales, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
