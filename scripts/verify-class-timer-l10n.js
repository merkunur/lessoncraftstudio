#!/usr/bin/env node
/* =====================================================================
   verify-class-timer-l10n.js — build-gate for the Class Timer strings
   (mini tools/class-timer.js).

   MEASURED invariants (fix the data, never the gate):
     1. every strings key carries ALL 11 locales, non-empty
     2. voiceStart carries the {label} placeholder in ALL 11 locales
        (the routine name is interpolated — dropping it orphans the line)
     3. the 5 routine-label keys exist (labelCleanup/Centers/Reading/
        Packup/Talk) — they feed both the label chips AND the starter
        presets
     4. exactly 3 end-voice variants (voiceEnd1..3), each ×11
     5. no locale value contains "Common Core"
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const LABELS = ['labelCleanup', 'labelCenters', 'labelReading', 'labelPackup', 'labelTalk'];
const file = path.join(__dirname, '..', 'mini tools', 'class-timer.js');
const errors = [];
const E = (m) => errors.push(m);

/* evaluate the tool file in a sandbox to get the real strings object */
const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '' }, localStorage: { getItem: () => null, setItem: () => {} } };
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const tool = sandbox.ClassTimer;
if (!tool || !tool.strings) { console.log('FAIL  ClassTimer.strings not found'); process.exit(1); }
const S = tool.strings;

const keys = Object.keys(S);
for (const key of keys) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`${key}.${L}: missing/empty`);
    else if (v.includes('Common Core')) E(`${key}.${L}: mentions Common Core`);
  }
}
for (const L of LOCALES) {
  if (S.voiceStart && S.voiceStart[L] && !S.voiceStart[L].includes('{label}')) E(`voiceStart.${L}: {label} placeholder missing`);
}
for (const k of LABELS) if (!S[k]) E(`routine label key ${k} missing`);
const endVars = keys.filter((k) => /^voiceEnd\d+$/.test(k));
if (endVars.length !== 3) E(`end-voice variants: ${endVars.length} (need exactly 3)`);
/* starter presets must reference existing label keys */
(tool.STARTERS || []).forEach((s) => { if (!S[s.labelKey]) E(`starter preset references unknown key ${s.labelKey}`); });

console.log(`${errors.length ? 'FAIL' : 'PASS'}  class-timer l10n  (${keys.length} keys × 11 locales, ${errors.length} errors)`);
for (const e of errors) console.log('   ERROR ' + e);
process.exit(errors.length ? 1 : 0);
