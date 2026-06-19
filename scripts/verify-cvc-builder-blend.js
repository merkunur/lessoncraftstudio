#!/usr/bin/env node
/* =====================================================================
   verify-cvc-builder-blend.js — build-time correctness gate for the RF.1.3
   "Build the Blend/Digraph Word" build-blend-word cvc-builder activity (EN-only).
   ---------------------------------------------------------------------
   Loads REAL cvc-builder-core + IMAGE_VOCABULARY + filesystem, and proves,
   MEASURED, per word:
     1. chunks.join('') === targetWord (the build identity);
     2. ≥1 chunk is multi-char (the blend/digraph UNIT);
     3. chunks[0] (or a chunk) is a real blend/digraph cluster;
     4. ≥1 distractor is a multi-char CLUSTER (confusable-cluster → picking the
        right unit is load-bearing) + ≥1 distractor total;
     5. driving the REAL core: tapping the chunks IN ORDER → answer === targetWord;
        tapping a distractor-cluster as the first chunk → answer ≠ targetWord
        (the exact chunk sequence is the only correct build);
     6. image EXISTS on disk + color theme (§5);
     7. targetWord === IMAGE_VOCABULARY[noun][en][0] lowercased (vocab cross-check);
     8. ≥7 words.
   selectLetter mutates state only (paint no-ops without slotEls) → headless-safe.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'cvc-builder.build-blend-word.rf-1-3';
const REPO = path.join(__dirname, '..');
const THEMES = path.join(REPO, 'image-library-webp', 'themes');
const CLUSTERS = new Set(['sh', 'ch', 'th', 'wh', 'ck', 'ph', 'ng',
  'st', 'sp', 'sk', 'sm', 'sn', 'sl', 'sw',
  'fr', 'fl', 'dr', 'cr', 'cl', 'br', 'bl', 'gr', 'gl', 'pr', 'pl', 'tr', 'tw']);

const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'cvc-builder-core.js'), 'utf8'))(win);
const Core = win.CvcBuilderCore;
if (!Core) { console.error('FAIL: no CvcBuilderCore'); process.exit(1); }
const vocabSrc = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
const VOCAB = new Function(vocabSrc + '\nreturn (typeof IMAGE_VOCABULARY!=="undefined")?IMAGE_VOCABULARY:null;')();

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'cvc-builder-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isBW = (n) => /\bbw\b/i.test(n);
const imgExists = (themeDir, noun) => { try { return fs.existsSync(path.join(THEMES, themeDir, noun + '@2x.webp')); } catch (e) { return false; } };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'build-blend-word', `task_template ${row.task_template} ≠ build-blend-word`);
check(row.alignment && row.alignment.code === 'RF.1.3', `alignment ${row.alignment && row.alignment.code} ≠ RF.1.3`);

Core.init({ el: () => ({}), sound: () => {}, announce: () => {}, track: () => {}, t: () => '' });

const words = (row.params && Array.isArray(row.params.words)) ? row.params.words : [];
check(words.length >= VARIETY_MIN, `${words.length} words < ${VARIETY_MIN}`);

words.forEach((w, i) => {
  const label = `word#${i}[${w.targetWord}]`;
  const chunks = w.chunks || [], distractors = w.distractors || [];
  check(chunks.join('') === w.targetWord, `${label}: chunks.join "${chunks.join('')}" ≠ targetWord`);
  check(chunks.some((c) => c.length >= 2), `${label}: no multi-char chunk (the cluster unit)`);
  check(chunks.some((c) => CLUSTERS.has(c)), `${label}: no chunk is a known blend/digraph cluster (${JSON.stringify(chunks)})`);
  check(distractors.length >= 1, `${label}: no distractors`);
  check(distractors.some((d) => d.length >= 2 && CLUSTERS.has(d)), `${label}: no confusable-cluster distractor`);

  // drive the REAL core — correct build
  Core.setupTask({ slots: chunks.length, palette: chunks.concat(distractors), targetWord: w.targetWord, chunks: chunks });
  chunks.forEach((c) => Core.selectLetter(c));
  check(Core.answer === w.targetWord, `${label}: correct chunk sequence built "${Core.answer}" ≠ "${w.targetWord}"`);
  // wrong build — first chunk replaced by a cluster distractor
  const wrongFirst = distractors.find((d) => d.length >= 2) || distractors[0];
  Core.setupTask({ slots: chunks.length, palette: chunks.concat(distractors), targetWord: w.targetWord, chunks: chunks });
  Core.selectLetter(wrongFirst);
  for (var k = 1; k < chunks.length; k++) Core.selectLetter(chunks[k]);
  check(Core.answer !== w.targetWord, `${label}: wrong first chunk "${wrongFirst}" still built the target`);

  // image + vocab
  check(!isBW(w.themeDir), `${label}: themeDir "${w.themeDir}" is B&W`);
  check(imgExists(w.themeDir, w.noun), `${label}: image MISSING themes/${w.themeDir}/${w.noun}@2x.webp`);
  const v = VOCAB[w.noun]; const vw = v && v.en && v.en[0];
  check(vw && vw.toLowerCase() === w.targetWord.toLowerCase(), `${label}: targetWord "${w.targetWord}" ≠ vocab[${w.noun}][en]="${vw}"`);
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${words.length} words: chunks.join=targetWord, ≥1 cluster chunk, confusable-cluster distractor, REAL-core builds the target only on the exact chunk sequence, image exists (color), targetWord=vocab[en]; ≥${VARIETY_MIN}.`);
process.exit(0);
