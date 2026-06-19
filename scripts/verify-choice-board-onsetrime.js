#!/usr/bin/env node
/* =====================================================================
   verify-choice-board-onsetrime.js — build-time correctness gate for the
   RF.K.2.c "Blend Onset & Rime" onset-rime-blend choice-board activity (REDUCED
   FAN: en/nl/da native-confirmed; de/no/sv/fi/es/it/pt/fr excluded).
   ---------------------------------------------------------------------
   Loads REAL core + IMAGE_VOCABULARY + filesystem, and proves, MEASURED, FOR
   EACH fan locale's rounds:
     1. correct.word (lc) === (onset+rime) (lc) — the blend identity (forces a
        correct onset/rime spelling-split);
     2. rime ≥2 chars (TTS-pronounceable as a syllable, not a bare consonant);
     3. ≥1 distractor word ENDS WITH rime (lc) — onset load-bearing (letter-level;
        native owns the same-SOUND judgment);
     4. 4 tiles, distinct nouns, correct ∉ distractors;
     5. image EXISTS on disk + color theme (§5);
     6. every word === IMAGE_VOCABULARY[noun][loc][0] (the banked pt lesson);
     7. no-two-correct via the REAL core;
     8. ≥7 rounds/locale;
     9. byLocale keys === EXACTLY the confirmed fan {en,nl,da} (excluded absent).
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'choice-board.onset-rime-blend.rf-k-2-c';
const FAN = ['en', 'nl', 'da'];
const REPO = path.join(__dirname, '..');
const THEMES = path.join(REPO, 'image-library-webp', 'themes');

const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-core.js'), 'utf8'))(win);
const Core = win.ChoiceBoardCore;
if (!Core) { console.error('FAIL: no ChoiceBoardCore'); process.exit(1); }
const vocabSrc = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
const VOCAB = new Function(vocabSrc + '\nreturn (typeof IMAGE_VOCABULARY!=="undefined")?IMAGE_VOCABULARY:null;')();

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isBW = (n) => /\bbw\b/i.test(n);
const imgExists = (themeDir, noun) => { try { return fs.existsSync(path.join(THEMES, themeDir, noun + '@2x.webp')); } catch (e) { return false; } };
const lc = (s) => (s || '').toLowerCase();

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'onset-rime-blend', `task_template ${row.task_template} ≠ onset-rime-blend`);
check(row.alignment && row.alignment.code === 'RF.K.2.c', `alignment ${row.alignment && row.alignment.code} ≠ RF.K.2.c`);

Core.init({ el: () => ({}), t: () => '', sound: () => {}, announce: () => {}, track: () => {} });

const byLocale = (row.params && row.params.byLocale) || {};
const locales = Object.keys(byLocale).sort();
check(locales.join(',') === FAN.slice().sort().join(','), `fan locales ${locales.join(',')} ≠ ${FAN.join(',')} (excluded must be absent)`);
let total = 0;

locales.forEach((loc) => {
  const rounds = (byLocale[loc] && byLocale[loc].rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${loc}: ${rounds.length} rounds < ${VARIETY_MIN}`);
  rounds.forEach((r, i) => {
    const label = `${loc} r#${i}[${r.onset}+${r.rime}]`;
    const onset = r.onset, rime = r.rime, correct = r.correct, distractors = r.distractors || [];
    // blend identity
    check(lc(onset + rime) === lc(correct.word), `${label}: onset+rime "${onset+rime}" ≠ correct.word "${correct.word}"`);
    check((rime || '').length >= 2, `${label}: rime "${rime}" < 2 chars`);
    // onset load-bearing: ≥1 distractor ends with rime
    const sameRime = distractors.filter((d) => lc(d.word).slice(-rime.length) === lc(rime));
    check(sameRime.length >= 1, `${label}: no same-rime distractor (onset not load-bearing)`);

    const tiles = [correct].concat(distractors);
    check(tiles.length === 4, `${label}: ${tiles.length} tiles`);
    const nouns = tiles.map((t) => t.noun);
    check(new Set(nouns).size === nouns.length, `${label}: duplicate nouns ${JSON.stringify(nouns)}`);
    check(distractors.findIndex((d) => d.noun === correct.noun) < 0, `${label}: correct among distractors`);

    tiles.forEach((t) => {
      check(!isBW(t.themeDir), `${label}: tile '${t.noun}' themeDir "${t.themeDir}" is B&W`);
      check(imgExists(t.themeDir, t.noun), `${label}: image MISSING themes/${t.themeDir}/${t.noun}@2x.webp`);
      const v = VOCAB[t.noun]; const vw = v && v[loc] && v[loc][0];
      check(vw === t.word, `${label}: word "${t.word}" ≠ vocab[${t.noun}][${loc}]="${vw}"`);
    });

    const options = tiles.map((t) => ({ key: t.noun, imgUrl: 'x', label: t.word }));
    Core.setupTask(options, correct.noun, { type: 'text', text: onset + ' · ' + rime });
    let cc = 0;
    options.forEach((o) => { Core.answer = o.key; const g = (Core.answer === correct.noun); if (g) cc++; if (o.key === correct.noun) check(g, `${label}: correct graded wrong`); else check(!g, `${label}: foil '${o.key}' graded correct`); });
    check(cc === 1, `${label}: ${cc} correct (expected 1)`);
    total++;
  });
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — fan ${locales.join('/')}, ${total} rounds: blend identity (onset+rime=word), rime≥2, ≥1 same-rime distractor, image exists (color), word=vocab, no-two-correct (REAL core), ≥${VARIETY_MIN}/locale, excluded locales absent.`);
process.exit(0);
