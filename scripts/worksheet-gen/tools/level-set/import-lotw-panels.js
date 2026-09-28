#!/usr/bin/env node
/**
 * import-lotw-panels.js — Level Set 2026-09-28 (Letter of the Week, whole alphabet): the 11 native panels'
 * reviews + the mechanical candidates → data/b3/letter-of-the-week-levelset.json (new letter blocks, the pair
 * title template, the refusals — the published pages never read it) and the two per-level printed
 * instructions (K-317 L1, K-325 L1) in i18n/level-instructions.json.
 *
 *   node tools/level-set/import-lotw-panels.js <dir> [--exclude=<pictures.json>] [--only=<locs>] [--partial]
 *
 * <dir> holds lotw-cand-<loc>.json + lotw-text-<loc>.json. Every locale must pass validate-lotw-content.js
 * (the family gate's rules on the merged bank) — a failing locale REFUSES the import. `--exclude` = the
 * picture panel's refused "theme/noun" list (applied to items and foils; foils are then re-picked).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { assemble } = require('./lotw-common.js');
const { bank } = require('../../lib/b3-common.js');

// Published-block words the native panels found WITHOUT the letter's sound (or unknown to a 5-year-old). New
// copies leave them out (K-317 mergedBank); the published pages keep them until the operator rules on those.
const PUB_DROP = {
  en: { s: ['fish'], b: ['lamb', 'thumb', 'comb'] },   // the en sound rule (lotw-common enUnheardOnly): sh, silent mb
  no: {
    d: ['hund', 'hånd', 'and', 'brød', 'bord', 'blad', 'sand', 'rød', 'glad', 'strand', 'bånd', 'bonde', 'gjerde', 'sandkasse', 'jordbær', 'slede'],   // silent d
    g: ['geit', 'fugl', 'negl', 'regn', 'tunge', 'finger', 'slange', 'engel'],   // g = j / silent / ng
    n: ['tunge', 'finger', 'slange', 'engel', 'kenguru', 'mango'],               // ng, not n
    k: ['kirke', 'kylling', 'kikkert'],                                          // kj-sound
  },
  da: {
    m: ['mars', 'mistelten', 'parallelogram', 'gymnastik', 'medicin'],   // not K vocabulary
    s: ['isfugl', 'piskeris'],
  },
};

const dir = process.argv[2];
if (!dir) throw new Error('usage: import-lotw-panels.js <dir> [--exclude=…] [--only=…] [--partial]');
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const partial = process.argv.includes('--partial');
const only = arg('only') ? arg('only').split(',') : null;
const exFile = arg('exclude');
const exclude = new Set(exFile ? JSON.parse(fs.readFileSync(exFile, 'utf8')) : []);
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'].filter((l) => !only || only.includes(l));
const ROOT = path.join(__dirname, '..', '..');
const outFile = path.join(ROOT, 'data', 'b3', 'letter-of-the-week-levelset.json');
const out = fs.existsSync(outFile) && partial ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
out._note = 'Level Set 2026-09-28 — Letter of the Week: the NEW letter blocks of the whole-alphabet expansion (mechanical candidates tools/level-set/lotw-candidates.js + 11 native panels + the picture panel; importer tools/level-set/import-lotw-panels.js). Merged onto the published block by K-317 mergedBank() for new copies only; the published pages never read this file.';
const instrFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const instr = JSON.parse(fs.readFileSync(instrFile, 'utf8'));
for (const loc of LOCS) {
  const tf = path.join(dir, `lotw-text-${loc}.json`), cf = path.join(dir, `lotw-cand-${loc}.json`);
  if (!fs.existsSync(tf)) { if (partial) continue; throw new Error(`${loc}: ${tf} missing`); }
  const va = [path.join(__dirname, 'validate-lotw-content.js'), tf, loc, '--cand=' + cf];
  if (exFile) va.push('--exclude=' + exFile);
  execFileSync(process.execPath, va, { stdio: ['ignore', 'ignore', 'inherit'] });   // throws on a failing locale
  const review = JSON.parse(fs.readFileSync(tf, 'utf8'));
  const { blocks, refused } = assemble(loc, JSON.parse(fs.readFileSync(cf, 'utf8')), review, exclude);
  out[loc] = { letters: blocks, pairTitle: review.pairTitle, pairInstruction: review.pairInstruction, refused };
  if (PUB_DROP[loc]) {
    const pub = bank('letter-of-the-week', loc);
    for (const [L, ws] of Object.entries(PUB_DROP[loc])) {
      const blk = pub.letters.find((l) => l.L === L);
      if (!blk) throw new Error(`${loc}: pubDrop names unpublished letter ${L}`);
      for (const w of ws) if (!blk.items.some((i) => i.word === w)) throw new Error(`${loc}: pubDrop ${L} "${w}" is not a published item`);
    }
    out[loc].pubDrop = PUB_DROP[loc];
  }
  for (const [id, key] of [['K-317', 'K-317_L1'], ['K-325', 'K-325_L1']]) ((instr[id] = instr[id] || {})['1'] = instr[id]['1'] || {})[loc] = review.instructions[key];   // always the panel's current text
  console.log(`${loc}: ${blocks.length} new letters, refused ${refused.map((r) => r.L).join(' ') || '—'}`);
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1) + '\n');
fs.writeFileSync(instrFile, JSON.stringify(instr, null, 1) + '\n');
console.log('written');
