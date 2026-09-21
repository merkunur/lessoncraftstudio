'use strict';
/**
 * b4var-rows/recycling.js — the five variation faces of K-357 `recycling`
 * (design docs/worksheet-gen/b4-designs/K-357-recycling.md §3; record
 * _work/K-357-faces.md). Ids are FIXED by _records/b4var-id-allocation.json:
 * F1 + F4 are K ids, F2 + F5 G1 ids (`types/g1/`, `extra {gradeBand:'G1'}`),
 * F3 a G2 id (`types/g2/`, `extra {gradeBand:'G2'}`). Read by
 * tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets the
 * base's additive `layout` knob (types/k/K-357-recycling.js `_buildFace`);
 * the base's own configs carry no `layout`, so the published base deck is
 * byte-identical (tools/b3-baseline.js). The base's d2 keys a face ignores
 * (items / perBinMin / perBinMax / binH / strips / zone / twinsAllowed) ride
 * along in D; each builder reads only its own keys (every guard on the RESOLVED
 * config). The family is THEMELESS: `coordinate.theme:''`, `coordinate.mode` =
 * the layout string.
 *
 *   F1 K-366   layout:'which'  six rows, one product + the N mini bins in the FIXED locale order; circle one (a key strip of the N bins on top)
 *   F2 G1-364  layout:'write'  eight product rows + a bank of the locale's material words; WRITE the material on a school-line row
 *   F3 G2-348  layout:'odd'    four cards of four DIFFERENT products, three of one material class; circle the odd one
 *   F4 K-367   layout:'color'  legend (colour chip + colour word + bin word, shuffled) over N WHITE bins with example shelves; colour each bin its locale colour
 *   F5 G1-365  layout:'open'   three draw-and-write lanes: draw a thing you recycle at home, write what it is
 *
 * EN title + instruction = the bank's strings['K-366' / 'G1-364' / 'G2-348' /
 * 'G1-365'] verbatim (data/b4/recycling.js; the gate asserts the pair is one
 * source). **K-367 (F4) is REFUSED in en** (no national bin-colour convention;
 * a classroom key would be K-241's colour-by-code — design §3 F4, README hub
 * matrix en = 5): the en bank carries `refuse:['color']` and NO K-367 string,
 * so the EN pair below is the §6 candidate the non-EN panels rewrite; the spec
 * is emitted for the locales that keep the face (de / es / pt / fr / fi
 * confirmed; it / nl / sv / da / no contingent), and `build()` REFUSES on the
 * en block by construction (the gate proves it). The EN wave must not list
 * K-367 (hub-expectations en = 5).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const G1 = { gradeBand: 'G1' };
const G2 = { gradeBand: 'G2' };
const ROWS = [
  ['k', 'K-366', 'recycling-which-bin', 'K-357-recycling.js', 2,
    { layout: 'which', rows: 6, tile: 72, iconPx: 60, chipTile: 64, chipBin: 44, keyPx: 15, shuffleChips: false },
    'Recycling Sort: Which Bin?', 'Look at each thing and circle the bin it goes in when it is empty or finished.'],
  ['g1', 'G1-364', 'recycling-what-is-it-made-of', 'K-357-recycling.js', 2,
    { layout: 'write', rows: 8, tile: 64, iconPx: 52, rulingW: 400, glyphH: 30, bankPx: 18, bank: true },
    'Recycling Sort: What Is It Made Of?', 'What is each thing made of? Write the word from the bank on the line.', G1],
  ['g2', 'G2-348', 'recycling-odd-one-out-by-material', 'K-357-recycling.js', 2,
    { layout: 'odd', rows: 4, items: 4, box: 120, iconPx: 84, boxMax: 150, organicOdd: true },
    'Recycling Sort: Odd One Out', 'In each row three things are made of the same material. Circle the one that is different.', G2],
  ['k', 'K-367', 'recycling-color-the-bins', 'K-357-recycling.js', 2,
    { layout: 'color', bins: 'locale', binH: 330, examples: 2, pic: 84, legendPx: 17, legendOrder: 'shuffled' },
    'Recycling Sort: Color the Bins', 'Read the name on each bin and color it in the color the legend shows.'],
  ['g1', 'G1-365', 'recycling-three-things-i-recycle', 'K-357-recycling.js', 2,
    { layout: 'open', lanes: 3, draw: { w: 170, h: 150 }, rows: 2, rulingW: 400, glyphH: 36, starters: false },
    'Recycling Sort: Three Things I Recycle', 'Draw three things you recycle at home and write what each one is.', G1],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
