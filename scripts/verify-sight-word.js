#!/usr/bin/env node
/* =====================================================================
   verify-sight-word.js — build-time gate for the E9 read-sight-word
   choice-board skill (RF.K.3.c). The target word is SPOKEN; the child taps
   the matching written word among 4 look-alikes, so the measured invariants
   are: exactly one aurally-correct answer, real single-token words, and the
   real choice-board core grades target→correct / every distractor→wrong.

   Loads the REAL mini tools/choice-board-core.js (window shim) and asserts,
   per locale × round of the shipped read-sight-word row:
     1. 4 options (target + 3 distractors), all DISTINCT strings;
     2. each word a single real token — letters only (no spaces/punctuation/
        empty) — `/^\p{L}+$/u` (catches the " og" / "op je" / "che?" class);
     3. the target is NOT among its own distractors;
     4. no distractor is a known HOMOPHONE of the target (per-locale blocklist
        — the audio form of the no-two-correct rule; fr est/et, de ist/isst…);
     5. driving the real core: selecting the target → answer===targetKey true,
        selecting EACH distractor → false (grade discriminates);
     6. ≥7 rounds per locale (§A.13.60 variety floor).
   "Measured, not eyeballed." Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.ChoiceBoardCore;
if (!Core) { console.error('FAIL: choice-board-core.js did not define window.ChoiceBoardCore'); process.exit(1); }
Core.init({ sound: function () {} });  /* api stub — selectKey calls api.sound; paint early-returns w/o tiles */

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-activities.json'), 'utf8'));
/* every sight-word activity rides the read-sight-word template (#1 read + #2 tell-apart) */
const rows = manifest.filter((r) => r.task_template === 'read-sight-word');
if (!rows.length) { console.error('FAIL: no read-sight-word rows in choice-board-activities.json'); process.exit(1); }

/* Known homophone pairs that must NOT co-occur as target+distractor (a spoken
   target would have two correct tiles). Seeded from the native early-literacy
   reads; unordered. EN/de/nl/sv/da clean by construction — kept as backstops. */
const HOMOPHONES = {
  en: [],
  de: [['ist', 'isst'], ['wahl', 'wal'], ['mehr', 'meer'], ['lehre', 'leere']],
  es: [['el', 'él'], ['que', 'qué'], ['si', 'sí'], ['tu', 'tú'], ['mi', 'mí'], ['de', 'dé'], ['mas', 'más'], ['se', 'sé']],
  pt: [['que', 'quê'], ['e', 'é'], ['por que', 'porque']],
  fr: [['il', 'ils'], ['elle', 'aile'], ['est', 'et'], ['a', 'à'], ['ou', 'où'], ['on', 'ont'], ['son', 'sont'], ['ce', 'se'], ['mes', 'mais'], ['ces', 'ses'], ['et', 'est']],
  it: [['di', 'dì'], ['e', 'è'], ['la', 'là'], ['ne', 'né'], ['si', 'sì']],
  nl: [],
  sv: [],
  da: [],
  no: [['og', 'å']]
};
function isHomophonePair(loc, a, b) {
  const list = HOMOPHONES[loc] || [];
  const x = a.toLowerCase(), y = b.toLowerCase();
  return list.some((p) => (p[0] === x && p[1] === y) || (p[0] === y && p[1] === x));
}

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const TOKEN = /^\p{L}+$/u;

let roundCount = 0, localeCount = 0;

for (const row of rows) {
 const short = row.id.split('.')[1] || row.id;   /* read-sight-word | tell-words-apart */
 const byLoc = (row.params && row.params.byLocale) || {};
 for (const loc of Object.keys(byLoc)) {
  localeCount++;
  const rounds = (byLoc[loc] && byLoc[loc].rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${short}/${loc}: ${rounds.length} rounds < ${VARIETY_MIN} variety floor`);
  rounds.forEach((r, i) => {
    roundCount++;
    const label = `${short}/${loc}#${i}[${r.target}]`;
    const distractors = r.distractors || [];
    const words = [r.target].concat(distractors);

    // 1. 4 options, all distinct
    check(words.length === 4, `${label}: ${words.length} words (expected 4: target + 3 distractors)`);
    check(new Set(words).size === words.length, `${label}: duplicate option(s) in ${JSON.stringify(words)}`);
    // 2. each a single real token (letters only)
    words.forEach((w) => check(typeof w === 'string' && TOKEN.test(w), `${label}: "${w}" is not a single letters-only word`));
    // 3. target not in its own distractors
    check(distractors.indexOf(r.target) < 0, `${label}: target appears in its own distractors`);
    // 4. no distractor is a homophone of the target
    distractors.forEach((d) => check(!isHomophonePair(loc, r.target, d), `${label}: distractor "${d}" is a homophone of target "${r.target}" (two aurally-correct answers)`));

    // 5. drive the REAL core — target selects correct, each distractor wrong
    const options = words.map((w) => ({ key: w, text: w }));
    Core.setupTask(options, r.target, null);
    Core.selectKey(r.target);
    check(Core.answer === Core.targetKey, `${label}: selecting the target was not graded correct`);
    distractors.forEach((d) => {
      Core.reset();
      Core.selectKey(d);
      check(!(Core.answer === Core.targetKey), `${label}: selecting distractor "${d}" was graded correct`);
    });
  });
 }
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} sight-word violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${roundCount} round(s) across ${localeCount} locale(s): 4 distinct single-token options, target∉distractors, no homophone foil, real core grades target→correct + every distractor→wrong, ≥${VARIETY_MIN} rounds/locale.`);
process.exit(0);
