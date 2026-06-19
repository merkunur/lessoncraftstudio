#!/usr/bin/env node
/* =====================================================================
   verify-cvc-builder-magice.js — build-time correctness gate for the RF.1.3
   silent-e "Add the Magic e" build-magic-e cvc-builder activity (EN-only).
   ---------------------------------------------------------------------
   Loads REAL cvc-builder-core + IMAGE_VOCABULARY + filesystem, and proves,
   MEASURED, per word:
     1. targetWord ends in "e" + length ≥ 4 (a CVCe magic-e word);
     2. magicLetter "e" ∉ distractors (the magic-e is the unique correct add);
     3. driving the REAL core with prefill (base) + lockPrefilled:
        - the base slots are LOCKED: clearSlot(0) leaves slot 0 filled;
        - activeSlot is the empty final slot;
        - selectLetter("e") → answer === targetWord (the magic-e completes it);
        - (fresh) selectLetter(distractor) → answer ≠ targetWord;
     4. image EXISTS on disk + color theme (§5);
     5. targetWord === IMAGE_VOCABULARY[noun][en][0] lowercased (vocab cross-check);
     6. ≥7 words.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'cvc-builder.build-magic-e.rf-1-3-silent-e';
const REPO = path.join(__dirname, '..');
const THEMES = path.join(REPO, 'image-library-webp', 'themes');

const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'cvc-builder-core.js'), 'utf8'))(win);
const Core = win.CvcBuilderCore;
if (!Core) { console.error('FAIL: no CvcBuilderCore'); process.exit(1); }
const VOCAB = new Function(fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + '\nreturn (typeof IMAGE_VOCABULARY!=="undefined")?IMAGE_VOCABULARY:null;')();

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'cvc-builder-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isBW = (n) => /\bbw\b/i.test(n);
const imgExists = (themeDir, noun) => { try { return fs.existsSync(path.join(THEMES, themeDir, noun + '@2x.webp')); } catch (e) { return false; } };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'build-magic-e', `task_template ${row.task_template} ≠ build-magic-e`);
check(row.alignment && row.alignment.code === 'RF.1.3', `alignment ${row.alignment && row.alignment.code} ≠ RF.1.3`);

Core.init({ el: () => ({}), sound: () => {}, announce: () => {}, track: () => {}, t: () => '' });

const words = (row.params && Array.isArray(row.params.words)) ? row.params.words : [];
check(words.length >= VARIETY_MIN, `${words.length} words < ${VARIETY_MIN}`);

words.forEach((w, i) => {
  const label = `word#${i}[${w.targetWord}]`;
  const tw = String(w.targetWord), distractors = w.distractors || [];
  check(tw.slice(-1) === 'e' && tw.length >= 4, `${label}: not a CVCe magic-e word`);
  const magicLetter = tw.slice(-1);
  const prefill = tw.slice(0, -1).split('').concat([null]);
  check(distractors.indexOf(magicLetter) < 0, `${label}: magic-e "${magicLetter}" is among distractors`);
  check(distractors.length >= 1, `${label}: no distractors`);

  const palette = [magicLetter].concat(distractors);
  // base locked + magic-e completes
  Core.setupTask({ slots: tw.length, palette: palette, targetWord: tw, prefill: prefill, lockPrefilled: true });
  check(Core.activeSlot === tw.length - 1, `${label}: activeSlot ${Core.activeSlot} ≠ final empty ${tw.length - 1}`);
  Core.clearSlot(0);
  check(Core.slotValues[0] === tw[0], `${label}: base slot 0 was cleared (not locked)`);
  Core.selectLetter(magicLetter);
  check(Core.answer === tw, `${label}: adding "e" built "${Core.answer}" ≠ "${tw}"`);
  // fresh: a distractor final letter ≠ target
  Core.setupTask({ slots: tw.length, palette: palette, targetWord: tw, prefill: prefill, lockPrefilled: true });
  Core.selectLetter(distractors[0]);
  check(Core.answer !== tw, `${label}: distractor "${distractors[0]}" still built the target`);

  // image + vocab
  check(!isBW(w.themeDir), `${label}: themeDir "${w.themeDir}" is B&W`);
  check(imgExists(w.themeDir, w.noun), `${label}: image MISSING themes/${w.themeDir}/${w.noun}@2x.webp`);
  const v = VOCAB[w.noun]; const vw = v && v.en && v.en[0];
  check(vw && vw.toLowerCase() === tw.toLowerCase(), `${label}: targetWord "${tw}" ≠ vocab[${w.noun}][en]="${vw}"`);
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${words.length} words: CVCe magic-e, base prefilled+LOCKED (clearSlot no-op), magic-e completes to target, distractor ≠ target, image exists (color), targetWord=vocab[en]; ≥${VARIETY_MIN}.`);
process.exit(0);
