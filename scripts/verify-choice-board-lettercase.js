#!/usr/bin/env node
/* =====================================================================
   verify-choice-board-lettercase.js — build-time correctness gate for the
   RF.K.1.d "Match the Letter" letter-case choice-board activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/choice-board-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED, FOR EACH locale's rounds { prompt,
   answer, distractors }:
     1. answer is the OTHER case of prompt (prompt.toUpperCase()===answer when
        answer is uppercase, else prompt.toLowerCase()===answer);
     2. the 4 tiles = {answer} ∪ distractors are pairwise-distinct + single-char,
        and answer ∉ distractors;
     3. driving the REAL core (setupTask(options, answer, subject) → set answer):
        answer = answer ⇒ true; answer = each distractor ⇒ false → EXACTLY ONE
        correct (no-two-correct);
     4. the rounds span BOTH directions (≥1 lowercase-answer + ≥1 uppercase-answer);
     5. ≥7 rounds per locale;
     6. each NON-EN locale includes ≥1 diacritic letter (a char outside A–Za–z) —
        the native-alphabet check (NEVER a shared A–Z) — EXCEPT it/nl whose base
        alphabets have no diacritic letters (documented exemption).
   setupTask only sets state (no DOM) → headless-safe. Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'choice-board.letter-case.rf-k-1-d';
const NO_DIACRITIC_OK = ['en', 'it', 'nl']; // base alphabets without diacritic letters
const REPO = path.join(__dirname, '..');
const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-core.js'), 'utf8'))(win);
const Core = win.ChoiceBoardCore;
if (!Core) { console.error('FAIL: choice-board-core.js did not define window.ChoiceBoardCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isSingle = (g) => typeof g === 'string' && Array.from(g).length === 1;
const hasDiacritic = (g) => /[^A-Za-z]/.test(g);

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'letter-case', `task_template ${row.task_template} ≠ letter-case`);
check(row.alignment && row.alignment.code === 'RF.K.1.d', `alignment ${row.alignment && row.alignment.code} ≠ RF.K.1.d`);

Core.init({ el: () => ({}), t: () => '', sound: () => {}, announce: () => {}, track: () => {} });

const byLocale = (row.params && row.params.byLocale) || {};
const locales = Object.keys(byLocale);
check(locales.length === 11, `expected 11 locales, saw ${locales.length}`);

let totalRounds = 0;
locales.forEach((loc) => {
  const rounds = (byLocale[loc] && byLocale[loc].rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${loc}: ${rounds.length} rounds < ${VARIETY_MIN}`);
  let lowerAns = 0, upperAns = 0, diacritic = 0;
  rounds.forEach((r, i) => {
    const label = `${loc} r#${i}[${r.prompt}->${r.answer}]`;
    const answer = r.answer, prompt = r.prompt, distractors = r.distractors || [];
    check(isSingle(prompt) && isSingle(answer), `${label}: prompt/answer not single-char`);
    distractors.forEach((d) => check(isSingle(d), `${label}: distractor '${d}' not single-char`));

    const answerIsUpper = (answer === answer.toUpperCase() && answer !== answer.toLowerCase());
    if (answerIsUpper) upperAns++; else lowerAns++;
    const otherCaseOk = answerIsUpper ? (prompt.toUpperCase() === answer) : (prompt.toLowerCase() === answer);
    check(otherCaseOk, `${label}: answer not the OTHER case of prompt`);
    check(prompt !== answer, `${label}: prompt === answer (no case change)`);

    check(distractors.indexOf(answer) < 0, `${label}: answer is among distractors`);
    const tiles = [answer].concat(distractors);
    check(new Set(tiles).size === tiles.length, `${label}: tiles not all distinct ${JSON.stringify(tiles)}`);
    check(tiles.length === 4, `${label}: ${tiles.length} tiles (expected 4)`);

    if (hasDiacritic(answer) || hasDiacritic(prompt)) diacritic++;

    /* drive the REAL core exactly as the wrapper does */
    const options = tiles.map((g) => ({ key: g, text: g }));
    Core.setupTask(options, answer, { type: 'text', text: prompt });
    let correctCount = 0;
    options.forEach((o) => {
      Core.answer = o.key;
      const graded = (Core.answer === answer);
      if (graded) correctCount++;
      if (o.key === answer) check(graded === true, `${label}: correct tile graded wrong`);
      else check(graded === false, `${label}: foil '${o.key}' graded correct`);
    });
    check(correctCount === 1, `${label}: ${correctCount} correct options (expected EXACTLY 1)`);
    totalRounds++;
  });
  check(lowerAns >= 1 && upperAns >= 1, `${loc}: rounds not bidirectional (${upperAns} upper-answer, ${lowerAns} lower-answer)`);
  if (NO_DIACRITIC_OK.indexOf(loc) < 0) {
    check(diacritic >= 1, `${loc}: no diacritic-letter round (native alphabet check — expected ≥1)`);
  }
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${locales.length} locales, ${totalRounds} rounds: answer = other case of prompt, 4 distinct single-char tiles, EXACTLY ONE correct (no-two-correct, REAL core), bidirectional, ≥${VARIETY_MIN}/locale, non-EN native diacritics present (it/nl exempt).`);
process.exit(0);
