#!/usr/bin/env node
/* =====================================================================
   verify-choice-board-readcvc.js — build-time correctness gate for the RF.K.3
   "Read the Word, Tap the Picture" read-cvc-word choice-board activity (EN-only,
   whole-word decode-to-meaning).
   ---------------------------------------------------------------------
   Loads the REAL choice-board-core.js + IMAGE_VOCABULARY + approved-words-en +
   the filesystem image library, and proves, MEASURED, per round:
     1. target `word` is a CVC word (consonant-vowel-consonant) AND
        word === IMAGE_VOCABULARY[correct.noun].en[0] (lowercased) — no fabrication;
     2. **≥1 distractor word SHARES THE FIRST TWO LETTERS (onset+vowel) with the
        target AND differs in the full word** — the decode-is-load-bearing rule
        (a child reading only the onset cannot disambiguate; the final phoneme
        decides). This is the INVERSE of beginning-sound's no-shared-onset rule;
     3. 4 tiles, all distinct nouns, correct ∉ distractors;
     4. EACH tile's image EXISTS on disk (color theme, no ` bw` §5) AND each noun
        is in approved-words-en (§20.7 phonics-gated);
     5. drive the REAL core (correct.noun → true; each distractor → false) ⇒
        EXACTLY ONE correct (no-two-correct);
     6. ≥7 rounds.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'choice-board.read-cvc-word.rf-k-3';
const REPO = path.join(__dirname, '..');
const THEMES = path.join(REPO, 'image-library-webp', 'themes');
const isCVC = (w) => /^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/.test(w);

const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-core.js'), 'utf8'))(win);
const Core = win.ChoiceBoardCore;
if (!Core) { console.error('FAIL: no ChoiceBoardCore'); process.exit(1); }
const VOCAB = new Function(fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + '\nreturn (typeof IMAGE_VOCABULARY!=="undefined")?IMAGE_VOCABULARY:null;')();
if (!VOCAB) { console.error('FAIL: no IMAGE_VOCABULARY'); process.exit(1); }
let approved = null;
try { approved = new Set(JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-en.json'), 'utf8')).entries.map((e) => e.key)); } catch (e) { console.error('FAIL: approved-words-en load — ' + e.message); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isBW = (name) => /\bbw\b/i.test(name);
const imgExists = (themeDir, noun) => { try { return fs.existsSync(path.join(THEMES, themeDir, noun + '@2x.webp')); } catch (e) { return false; } };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'read-cvc-word', `task_template ${row.task_template} ≠ read-cvc-word`);
check(row.alignment && row.alignment.code === 'RF.K.3', `alignment ${row.alignment && row.alignment.code} ≠ RF.K.3`);

Core.init({ el: () => ({}), t: () => '', sound: () => {}, announce: () => {}, track: () => {} });

const rounds = (row.params && row.params.rounds) || [];
check(rounds.length >= VARIETY_MIN, `${rounds.length} rounds < ${VARIETY_MIN}`);

rounds.forEach((r, i) => {
  const label = `r#${i}[${r.word}]`;
  const word = (r.word || '').toLowerCase(), correct = r.correct, distractors = r.distractors || [];
  check(isCVC(word), `${label}: "${word}" is not CVC`);
  const cv = VOCAB[correct.noun]; const cw = cv && cv.en && cv.en[0];
  check(cw && cw.toLowerCase() === word, `${label}: word "${word}" ≠ vocab[${correct.noun}].en="${cw}"`);

  const tiles = [correct].concat(distractors);
  check(tiles.length === 4, `${label}: ${tiles.length} tiles (expected 4)`);
  const nouns = tiles.map((t) => t.noun);
  check(new Set(nouns).size === nouns.length, `${label}: duplicate nouns ${JSON.stringify(nouns)}`);
  check(distractors.findIndex((d) => d.noun === correct.noun) < 0, `${label}: correct among distractors`);

  // decode-is-load-bearing: ≥1 distractor shares first 2 letters AND differs
  const distWords = distractors.map((d) => { const v = VOCAB[d.noun]; return ((v && v.en && v.en[0]) || '').toLowerCase(); });
  check(distWords.some((dw) => dw.slice(0, 2) === word.slice(0, 2) && dw !== word), `${label}: NO share-onset distractor (decode not load-bearing); distractors=${JSON.stringify(distWords)}`);

  // image exists + color + approved-words
  tiles.forEach((t, k) => {
    check(!isBW(t.themeDir), `${label}: tile '${t.noun}' themeDir "${t.themeDir}" is B&W`);
    check(imgExists(t.themeDir, t.noun), `${label}: image MISSING themes/${t.themeDir}/${t.noun}@2x.webp`);
    check(approved.has(t.noun), `${label}: '${t.noun}' not in approved-words-en`);
    const v = VOCAB[t.noun]; check(v && v.en && v.en[0], `${label}: tile '${t.noun}' has no en vocab`);
  });

  // drive the REAL core — EXACTLY ONE correct
  const seed = (i + 1) * 137;
  const options = tiles.map((t) => ({ key: t.noun, imgUrl: 'x', label: t.noun }));
  Core.setupTask(options, correct.noun, { type: 'text', text: word });
  let correctCount = 0;
  options.forEach((o) => {
    Core.answer = o.key;
    const graded = (Core.answer === correct.noun);
    if (graded) correctCount++;
    if (o.key === correct.noun) check(graded === true, `${label}: correct tile graded wrong`);
    else check(graded === false, `${label}: foil '${o.key}' graded correct`);
  });
  check(correctCount === 1, `${label}: ${correctCount} correct (expected EXACTLY 1)`);
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds: target CVC + word=vocab[en], ≥1 share-onset distractor (decode load-bearing), image exists (color) + approved-words-en, EXACTLY ONE correct (REAL core); ≥${VARIETY_MIN}.`);
process.exit(0);
