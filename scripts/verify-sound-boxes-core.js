#!/usr/bin/env node
/* =====================================================================
   verify-sound-boxes-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/sound-boxes-core.js (window shim) and proves, for
   the shipped manifest (RF.K.2.d phoneme isolation):

     1. EXACTLY-ONE-MATCH per round — exactly one option shares the target's
        phoneme at round.position; oracle accepted, distractors rejected.
     2. DERIVED_NOT_STORED — no stored correctIndex/answer/match key (deep scan);
        the grade reads the phoneme LIVE: mutating the oracle option's
        position-phoneme away → correctCount 0; mutating a distractor's
        position-phoneme to the target's → correctCount 2.
     3. positions VARIED — all 3 of b/m/e present (medial + final are the unowned
        RF.K.2.d core vs the owned RF.K.3.a initial); ≥6 distinct targets; ≥7.
     4. ASSET/GATE cross-check — every noun is a clean 3-phoneme CVC (single
        b/m/e keys, /x/-free), is in approved-words-en.json (§20.5 phonics gate),
        and has a COLOR @2x.webp image on disk (§20.5 color-only).

   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['correctIndex', 'answer', 'answerIndex', 'correct', 'isCorrect', 'match', 'matchIndex', 'oracle'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'sound-boxes-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.SoundBoxesCore;
if (!Core) { console.error('FAIL: sound-boxes-core.js did not define window.SoundBoxesCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'sound-boxes-activities.json'), 'utf8'));
const approved = (() => {
  const d = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-en.json'), 'utf8'));
  return new Set((d.entries || []).map((w) => w.key || w.word));
})();
const THEMES = path.join(REPO, 'image-library-webp', 'themes');

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));
function imageExists(w) {
  return fs.existsSync(path.join(THEMES, w.themeDir, w.noun + '@2x.webp')) && !/\bbw\b|black/i.test(w.themeDir);
}
function cleanCVC(w) {
  return ['b', 'm', 'e'].every((p) => typeof w[p] === 'string' && w[p].length >= 1) && w.b !== 'x' && w.e !== 'x' && w.m !== 'x';
}

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.positionValid, `${label}: bad position "${r.position}"`);
    check(f.optionCount >= 3, `${label}: <3 options`);
    check(f.exactlyOneMatch, `${label}: not exactly one match (${Core.correctCount(r)})`);
    check(oi >= 0 && Core.isAnswer(r, oi), `${label}: oracle is not a match`);
    check(f.allHavePhonemes, `${label}: a word is missing b/m/e phonemes`);

    // every distractor rejected
    (r.options || []).forEach((o, i) => { if (i !== oi) check(!Core.isAnswer(r, i), `${label}: distractor ${o.noun} accepted`); });

    // DERIVED (live): break the match → 0; make a distractor match → 2
    const m0 = clone(r); m0.options[oi][r.position] = r.target[r.position] + 'Z';
    check(Core.correctCount(m0) === 0, `${label}: grade not live (breaking the oracle phoneme still matched)`);
    const distractorIdx = (r.options || []).findIndex((_, i) => i !== oi);
    const m2 = clone(r); m2.options[distractorIdx][r.position] = r.target[r.position];
    check(Core.correctCount(m2) === 2, `${label}: grade not live (making a distractor share the phoneme did not add a match)`);

    // ASSET / GATE cross-check on every word
    [r.target].concat(r.options).forEach((w) => {
      check(cleanCVC(w), `${label}: ${w.noun} is not a clean 3-phoneme CVC (b/m/e)`);
      check(approved.has(w.noun), `${label}: ${w.noun} not in approved-words-en.json (§20.5 gate)`);
      check(imageExists(w), `${label}: ${w.noun} has no COLOR @2x.webp at themes/${w.themeDir}/`);
    });
  });

  const df = Core.deckFacts(rounds);
  const posSet = {};
  rounds.forEach((r) => { posSet[r.position] = 1; });
  check(df.distinctPositions >= 3 && posSet.b && posSet.m && posSet.e, `positions not varied across b/m/e (${Object.keys(posSet).join(',')})`);
  check(df.distinctTargets >= 6, `only ${df.distinctTargets} distinct targets (<6)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} sound-boxes violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s), ${df0.distinctTargets} targets across positions b/m/e: exactly-one phoneme-match; oracle 100%; derived-not-stored (grade reads the phoneme live); every word a clean CVC + approved + color-imaged; ≥${VARIETY_MIN} distinct rounds. [RF.K.2.d phoneme/Elkonin]`);
process.exit(0);
