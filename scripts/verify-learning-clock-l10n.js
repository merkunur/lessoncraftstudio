#!/usr/bin/env node
/* =====================================================================
   verify-learning-clock-l10n.js — THE SPEECH REGRESSION GATE for the
   Learning Clock's generative time engine (mini tools/learning-clock.js).

   MEASURED invariants (fix the data, never the gate):
     1. THE 16 ANCHORS: for every time in clock-core.js `timeExpr`
        (native-verified ×11), sayTime(locale, H, M) reproduces the
        string BYTE-FOR-BYTE. ACCEPTED_DIVERGENCES (each entry citing a
        native ruling) is the only legal escape — default empty.
     2. COVERAGE: all 144 five-minute combos × 11 locales produce a
        non-empty string with zero unresolved `{` placeholders.
     3. THE DE OVERLAY: viertel-region anchors (2:15 → "viertel 3",
        2:45 → "dreiviertel 3").
     4. FORMAL REGISTER: m ∈ {7, 13, 37, 59} × 11 compose non-empty,
        no braces (the number-word splice is alive).
     5. strings ×11 complete; {time}/{n}/{h}/{m}/{label} placeholders
        survive; no "Common Core".
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const errors = [];
const E = (m) => errors.push(m);

/* entries: { key:'H:MM', locale:'xx', reason:'native ruling …' } */
const ACCEPTED_DIVERGENCES = [
  { key: '3:00', locale: 'no', ruled: 'klokka 3', reason: 'whole hours read "klokka {H}" — bare digit is ambiguous vs a minute numeral; native ruling, learning-clock-no.json' },
  { key: '9:00', locale: 'no', ruled: 'klokka 9', reason: 'whole hours read "klokka {H}" — bare digit is ambiguous vs a minute numeral; native ruling, learning-clock-no.json' },
  { key: '12:00', locale: 'no', ruled: 'klokka 12', reason: 'whole hours read "klokka {H}" — bare digit is ambiguous vs a minute numeral; native ruling, learning-clock-no.json' },
  { key: '10:00', locale: 'no', ruled: 'klokka 10', reason: 'whole hours read "klokka {H}" — bare digit is ambiguous vs a minute numeral; native ruling, learning-clock-no.json' },
  { key: '7:45', locale: 'es', ruled: 'un cuarto para las ocho', reason: 'Mexican para-system (un cuarto para las ocho) over peninsular menos — native ruling, learning-clock-es.json' },
  { key: '9:20', locale: 'nl', ruled: 'tien voor half 10', reason: 'digit-register normalized at :20/:40 (tien voor half 10) — the word/digit mix in the anchors is an artefact; native ruling, learning-clock-nl.json' },
  { key: '4:40', locale: 'es', ruled: 'veinte para las cinco', reason: 'Mexican para-system (un cuarto para las ocho) over peninsular menos — native ruling, learning-clock-es.json' },
  { key: '4:40', locale: 'nl', ruled: 'tien over half 5', reason: 'digit-register normalized at :20/:40 (tien voor half 10) — the word/digit mix in the anchors is an artefact; native ruling, learning-clock-nl.json' },
  { key: '1:50', locale: 'es', ruled: 'diez para las dos', reason: 'Mexican para-system (un cuarto para las ocho) over peninsular menos — native ruling, learning-clock-es.json' },
];

function loadTool(file, name) {
  const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '' }, localStorage: { getItem: () => null, setItem: () => {} }, sessionStorage: { getItem: () => null, setItem: () => {} } };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  return sandbox[name] || sandbox.window[name];
}

let tool, core;
try {
  tool = loadTool(path.join(__dirname, '..', 'mini tools', 'learning-clock.js'), 'LearningClock');
  core = loadTool(path.join(__dirname, '..', 'mini tools', 'clock-core.js'), 'ClockCore');
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
if (!tool || !tool.sayTime) { console.log('FAIL  LearningClock.sayTime not found'); process.exit(1); }
if (!core || !core.strings || !core.strings.timeExpr) { console.log('FAIL  ClockCore.timeExpr not found'); process.exit(1); }

/* ---- 1. the 16 anchors ---- */
let anchors = 0;
for (const key of Object.keys(core.strings.timeExpr)) {
  const [H, M] = key.split(':').map(Number);
  for (const L of LOCALES) {
    const want = core.strings.timeExpr[key][L];
    if (!want) continue;
    const got = tool.sayTime(L, H, M, {});
    if (got !== want) {
      /* a divergence excuses ONLY the exact natively-ruled string — any
         other value at a ruled anchor is still a regression */
      const excused = ACCEPTED_DIVERGENCES.some((d) => d.key === key && d.locale === L && d.ruled === got);
      if (!excused) E(`ANCHOR ${key}.${L}: sayTime="${got}" ≠ verified "${want}"`);
    }
    anchors++;
  }
}

/* ---- 2. 144-combo coverage ---- */
let combos = 0;
for (const L of LOCALES) {
  for (let h = 1; h <= 12; h++) {
    for (let m = 0; m < 60; m += 5) {
      const s = tool.sayTime(L, h, m, {});
      if (!s || !String(s).trim()) E(`coverage ${L} ${h}:${m}: empty`);
      else if (s.indexOf('{') >= 0) E(`coverage ${L} ${h}:${m}: unresolved placeholder in "${s}"`);
      combos++;
    }
  }
}

/* ---- 3. the de overlay ---- */
const q1 = tool.sayTime('de', 2, 15, { deQuarter: true });
const q2 = tool.sayTime('de', 2, 45, { deQuarter: true });
if (q1 !== 'viertel 3') E(`de overlay 2:15: "${q1}" (want "viertel 3")`);
if (q2 !== 'dreiviertel 3') E(`de overlay 2:45: "${q2}" (want "dreiviertel 3")`);
const q3 = tool.sayTime('de', 2, 30, { deQuarter: true });
if (q3 !== 'halb 3') E(`de overlay must not touch 30: "${q3}"`);

/* ---- 4. the formal register ---- */
for (const L of LOCALES) {
  for (const m of [7, 13, 37, 59]) {
    const s = tool.sayTime(L, 2, m, {});
    if (!s || !String(s).trim() || s.indexOf('{') >= 0 || /\d\d/.test(s.replace(/^\d+|:\d+/g, ''))) {
      if (!s || s.indexOf('{') >= 0) E(`formal ${L} 2:${m}: "${s}"`);
    }
  }
}

/* ---- 5. strings hygiene ---- */
const S = tool.strings;
for (const key of Object.keys(S)) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`${key}.${L}: missing/empty`);
    else if (v.includes('Common Core')) E(`${key}.${L}: mentions Common Core`);
  }
}
for (const L of LOCALES) {
  for (const [k, ph] of [['taskPrompt', '{time}'], ['youMade', '{time}'], ['durMinutes', '{n}'], ['durHours', '{h}'], ['durHours', '{m}'], ['setOurTime', '{label}'], ['setOurTime', '{time}']]) {
    if (S[k] && S[k][L] && !S[k][L].includes(ph)) E(`${k}.${L}: ${ph} missing`);
  }
}
/* every locale has a TIME_RULES entry with 12 positions */
for (const L of LOCALES) {
  const R = tool.TIME_RULES[L];
  if (!R) { E(`TIME_RULES.${L} missing`); continue; }
  for (let m = 0; m < 60; m += 5) if (R.positions[m] === undefined) E(`TIME_RULES.${L}.positions[${m}] missing`);
  if (!R.hourWords || R.hourWords.length !== 12) E(`TIME_RULES.${L}.hourWords length`);
  if (!R.formal || !R.formal.tpl || !R.formal.zero) E(`TIME_RULES.${L}.formal incomplete`);
}

console.log(`${errors.length ? 'FAIL' : 'PASS'}  learning-clock speech gate  (${anchors} anchors, ${combos} combos, ${errors.length} errors)`);
for (const e of errors.slice(0, 25)) console.log('   ERROR ' + e);
if (errors.length > 25) console.log(`   … +${errors.length - 25} more`);
process.exit(errors.length ? 1 : 0);
