#!/usr/bin/env node
/**
 * verify-b8-maze-puzzles.js — the b8 Handmade Mazes FAMILY GATE (design FINAL §5).
 *
 *   validateBank(block, loc) → string[]   — one locale block of data/b8/maze-puzzles.js (strings per mode + chrome)
 *   node qa/verify-b8-maze-puzzles.js      — every locale block present, then every rule POISONED both ways
 *
 * Rules (each a defect a child or a teacher would see):
 *   - every one of the 20 modes carries title / printTitle / instruction / tap (a refused mode is absent from the block)
 *   - title ≤ 70, instruction and tap ≤ 150; at most two sentences; the instruction ends in a mark
 *   - no free-claim and no worksheet-word on any visible string; no soft hyphen
 *   - tokens: the letter-hop instruction names the run's end through {LAST}; no other string carries a token
 *   - the running-total face shows a CONSTRUCTION crane: its strings never use the crane-BIRD word that
 *     REFERENCE TRANSLATIONS/image-vocabulary.js holds for `crane` (Kranich, grulla, kraanvogel, trana …)
 *   - the 13 runtime strings exist; mzPathN and mzAt carry {n}
 * The maze ENGINE gates (uniqueness, reach, the raster oracle) run per page in the type's verify() and in
 * tools/hm-reliability.js; this gate owns the words.
 */
'use strict';
const path = require('path');
const { MODES, EN_CHROME, MAZE_PUZZLES } = require('../data/b8/maze-puzzles.js');
const freeClaim = require(path.join(__dirname, '..', '..', 'lib', 'free-claim.js'));

const WORKSHEET = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäväsivu/iu;
// the bird a vocabulary lookup of `crane` would give (the picture is a building-site crane)
const CRANE_BIRD = { de: /kranich/i, fr: /\bgrues? cendr/i, es: /grulla/i, pt: /(?<!\p{L})grou(?!\p{L})/iu, it: /\bgru\b(?=.*\buccell)/i, nl: /kraanvogel/i, sv: /(?<!\p{L})tran(a|an|or)(?!\p{L})/iu, da: /(?<!\p{L})tran(e|en|er)(?!\p{L})/iu, no: /(?<!\p{L})tran(e|en|er)(?!\p{L})/iu, fi: /(?<!\p{L})kur(ki|en|jen|kea)(?!\p{L})/iu, en: /(?!)/ };
const sentences = (s) => (String(s).match(/[.!?](\s|$)/g) || []).length;

function validateBank(block, loc) {
  const errs = []; const E = (m) => errs.push(loc + ' ' + m);
  if (!block || !block.strings) return [loc + ': no strings block'];
  for (const mode of Object.keys(block.strings)) if (!MODES.includes(mode)) E('unknown mode ' + mode);
  for (const mode of MODES) {
    const s = block.strings[mode]; if (!s) continue;   // a refused mode is absent (the draft validator owns refusals)
    for (const k of ['title', 'printTitle', 'instruction', 'tap']) {
      const v = String(s[k] || '').trim();
      if (!v) { E(mode + ': no ' + k); continue; }
      if (freeClaim.hit(v)) E(mode + '.' + k + ' claims free ("' + freeClaim.hit(v) + '")');
      if (WORKSHEET.test(v)) E(mode + '.' + k + ' says worksheet');
      if (/­/.test(v)) E(mode + '.' + k + ' carries a soft hyphen');
      if (k !== 'title' && k !== 'printTitle' && sentences(v) > 2) E(mode + '.' + k + ' has more than two sentences');
      const tok = v.match(/\{[A-Z]+\}/g) || [];
      if (mode === 'letter-hop' && k === 'instruction') { if (!tok.includes('{LAST}') || tok.length !== 1) E('letter-hop.instruction must carry exactly {LAST}'); }
      else if (tok.length) E(mode + '.' + k + ' carries a token ' + tok.join(' '));
      if (mode === 'running-total' && (CRANE_BIRD[loc] || /(?!)/).test(v)) E('running-total.' + k + ' names the crane BIRD — the picture is a building-site crane');
    }
    if ([...String(s.title)].length > 70) E(mode + '.title is ' + [...String(s.title)].length + ' chars (≤ 70)');
    if ([...String(s.instruction)].length > 150) E(mode + '.instruction is ' + [...String(s.instruction)].length + ' chars (≤ 150)');
    if ([...String(s.tap)].length > 150) E(mode + '.tap is ' + [...String(s.tap)].length + ' chars (≤ 150)');
    if (!/[.!?…]$/u.test(String(s.instruction).trim())) E(mode + '.instruction does not end in a mark');
  }
  const c = block.chrome || {};
  for (const k of Object.keys(EN_CHROME)) if (!c[k] || !String(c[k]).trim()) E('chrome.' + k + ' missing');
  for (const k of ['mzPathN', 'mzAt']) if (c[k] && !/\{n\}/.test(c[k])) E('chrome.' + k + ' lacks {n}');
  return errs;
}

if (require.main === module) {
  const { bank } = require('../lib/b8-common.js');
  let bad = 0, n = 0;
  for (const loc of ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']) {
    let block; try { block = bank('maze-puzzles', loc); } catch (e) { console.log(loc + ': no block yet'); continue; }
    const errs = validateBank(block, loc); n++;
    errs.forEach((e) => console.error(' - ' + e)); if (errs.length) bad++;
    console.log(loc + ': ' + (errs.length ? errs.length + ' error(s)' : 'clean'));
  }
  // poisons: each rule must FIRE on a corrupted copy of the EN block and stay silent on the clean one
  const clone = () => JSON.parse(JSON.stringify(MAZE_PUZZLES.en));
  const P = [
    ['a missing tap', (b) => { delete b.strings.river.tap; }],
    ['a 71-char title', (b) => { b.strings.base.title = 'x'.repeat(71); }],
    ['three sentences', (b) => { b.strings.avoid.instruction = 'One. Two. Three.'; }],
    ['a free claim', (b) => { b.strings.collect.tap = 'A free maze to drag.'; }],
    ['no {LAST} on letter-hop', (b) => { b.strings['letter-hop'].instruction = 'Colour the letters.'; }],
    ['a stray token', (b) => { b.strings.base.instruction = 'Go to {LAST}.'; }],
    ['a missing chrome string', (b) => { delete b.chrome.mzGoBack; }],
    ['mzPathN without {n}', (b) => { b.chrome.mzPathN = 'Path'; }],
    ['the crane bird (de)', (b) => { b.strings['running-total'].instruction = 'Bring dem Kranich seine Zahl.'; }, 'de'],
  ];
  if (validateBank(clone(), 'en').length) { console.error('CONTROL FAILED: the clean EN block has errors'); process.exit(1); }
  let killed = 0;
  for (const [name, mut, l] of P) { const b = clone(); mut(b); const e = validateBank(b, l || 'en'); if (e.length) killed++; else console.error('POISON SURVIVED: ' + name); }
  console.log(`poisons: ${killed}/${P.length} caught, control clean · ${n} locale block(s) checked`);
  process.exit(bad || killed !== P.length ? 1 : 0);
}
module.exports = { validateBank };
