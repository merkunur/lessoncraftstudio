#!/usr/bin/env node
/* =====================================================================
   verify-word-builder-vowelteam.js — build-time correctness gate for the RF.1.3
   vowel-teams "Build the Vowel-Team Word" build-vowel-teams activity (EN-only,
   word-builder engine).
   ---------------------------------------------------------------------
   Loads REAL word-builder-core + IMAGE_VOCABULARY + filesystem, and proves,
   MEASURED, per word:
     1. tiles.join('') === targetWord;
     2. EXACTLY ONE tile is a vowel-team (∈ the team set) + the rest single-char;
     3. ≥1 distractor is a confusable vowel-team (≠ the target's) — picking the
        right team is load-bearing;
     4. driving the REAL core (mutePerTile:true; palette = tiles+distractors):
        placing `tiles` in order → tileAnswers === tiles (correct); placing a
        confusable-team distractor in the vowel slot → tileAnswers ≠ tiles;
     5. image EXISTS + color theme (§5);
     6. targetWord === IMAGE_VOCABULARY[noun][en][0] lowercased;
     7. ≥7 words.
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'syllable-builder.build-vowel-teams.rf-1-3';
const REPO = path.join(__dirname, '..');
const THEMES = path.join(REPO, 'image-library-webp', 'themes');
const VOWEL_TEAMS = new Set(['ai', 'ay', 'ea', 'ee', 'ey', 'ie', 'oa', 'oe', 'oo', 'ow', 'ou', 'ue', 'ui', 'igh', 'eigh']);

const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'word-builder-core.js'), 'utf8'))(win);
const Core = win.WordBuilderCore;
if (!Core) { console.error('FAIL: no WordBuilderCore'); process.exit(1); }
const VOCAB = new Function(fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + '\nreturn (typeof IMAGE_VOCABULARY!=="undefined")?IMAGE_VOCABULARY:null;')();

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'syllable-builder-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const isBW = (n) => /\bbw\b/i.test(n);
const imgExists = (themeDir, noun) => { try { return fs.existsSync(path.join(THEMES, themeDir, noun + '@2x.webp')); } catch (e) { return false; } };
const tilesEqual = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => x === b[i]);

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'build-vowel-teams', `task_template ${row.task_template} ≠ build-vowel-teams`);
check(row.alignment && row.alignment.code === 'RF.1.3', `alignment ${row.alignment && row.alignment.code} ≠ RF.1.3`);

Core.init({ el: () => ({}), sound: () => {}, announce: () => {}, track: () => {}, lang: 'en' });

const words = (row.params && Array.isArray(row.params.words)) ? row.params.words : [];
check(words.length >= VARIETY_MIN, `${words.length} words < ${VARIETY_MIN}`);

words.forEach((w, i) => {
  const label = `word#${i}[${w.targetWord}]`;
  const tiles = w.tiles || [], distractors = w.distractors || [];
  check(tiles.join('') === w.targetWord, `${label}: tiles.join "${tiles.join('')}" ≠ targetWord`);
  const teamTiles = tiles.filter((t) => VOWEL_TEAMS.has(t));
  check(teamTiles.length === 1, `${label}: expected exactly 1 vowel-team tile, saw ${teamTiles.length} (${JSON.stringify(tiles)})`);
  const team = teamTiles[0];
  tiles.forEach((t) => { if (t !== team) check(t.length === 1, `${label}: non-team tile "${t}" not single-char`); });
  check(distractors.some((d) => VOWEL_TEAMS.has(d) && d !== team), `${label}: no confusable vowel-team distractor`);

  // drive REAL core — correct
  const palette = tiles.concat(distractors);
  Core.setupTask({ slots: tiles.length, palette: palette, targetWord: w.targetWord, targetTiles: tiles, mutePerTile: true, language: 'en-US' });
  tiles.forEach((t) => Core.selectTile(t));
  check(tilesEqual(Core.tileAnswers, tiles), `${label}: correct tile order built ${JSON.stringify(Core.tileAnswers)} ≠ ${JSON.stringify(tiles)}`);
  check(Core.answer === w.targetWord, `${label}: answer "${Core.answer}" ≠ "${w.targetWord}"`);
  // wrong — confusable team in the vowel slot
  const vIdx = tiles.indexOf(team);
  const wrongTeam = distractors.find((d) => VOWEL_TEAMS.has(d) && d !== team);
  Core.setupTask({ slots: tiles.length, palette: palette, targetWord: w.targetWord, targetTiles: tiles, mutePerTile: true, language: 'en-US' });
  tiles.forEach((t, k) => Core.selectTile(k === vIdx ? wrongTeam : t));
  check(!tilesEqual(Core.tileAnswers, tiles), `${label}: wrong vowel-team "${wrongTeam}" in vowel slot still matched`);

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
console.log(`PASS — ${words.length} words: tiles.join=targetWord, exactly 1 vowel-team tile, confusable-team distractor, REAL core builds target on the team tile only (mutePerTile), image exists (color), targetWord=vocab[en]; ≥${VARIETY_MIN}.`);
process.exit(0);
