/**
 * data/ptx/scenes-G1430.js — G1-430 "Trace the picture and the word" (L.K.1.a) Level Set copies (ptl): the published four
 * cards and word lanes stay; each copy swaps the four pictures and prints the locale's OWN four names (school-print case:
 * de capital initial, fr capitals, the rest lower case; no article, letters only), checked against
 * REFERENCE TRANSLATIONS/image-vocabulary.js × 11 (out/ptl/_pw.js). Concepts: _work/ptl-scenes-B.json (Designer B; the
 * cottage set (6 letters) and the barnyard set (3-letter får/sau/get/coq) left; apple left the café, it is a published card; pictures a
 * child names otherwise were refused on the contact sheet: alpaca (= llama), curtain (= window), yacht (= boat), tennis (a ball), milk (its carton
 * prints MILK), oven (a stove: cuisinière / stove), rain (its drops break into specks), the toy boat and the couch (rows of
 * round portholes / buttons read as "oooo"), corn and burrito (fields of tiny circles), the dotted birthday cake,
 * the waffle (reads as pancakes), the salted pretzel (salt dots) and the pony-like horse (the L1 page has a pony)).
 * Levels (ptl-levels.md §G1-430): L1 G1-1 — the LONGEST name in every locale ≤ 5 letters, pictures in a 220 × 182 box,
 * the lightest drawing of each noun · L2 G1 — ≤ 7 letters, 165 px · L3 G1-3 — 4-7 letters in every locale, ≥ 2 English
 * names with a digraph or a double letter, 160 px.
 * G1-430 is a narrow face like K-426 / K-427: its difficulty is the WORD and the picture size. Only 20 nameable nouns have
 * a ≤ 5-letter name in all 11 languages, so an L1 page cannot weigh a quarter under the published sun · fish · cat · apple
 * (measured 4,200-6,900 px); L1 takes each noun's lightest drawing and the heavier dash under its own 7,000 cap; L3 stays
 * ≥ 15 % over.
 */
'use strict';
const V = require('../../lib/b2-common.js').vocab();
const { wOf } = require('./lay.js');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BAND = { 1: { band: 'G1-1', style: 'P2' }, 2: { band: 'G1', style: 'P3' }, 3: { band: 'G1-3', style: 'P3' } };
// each picture fills its card's picture box (W × H): a wide drawing is held by the width, a tall one by the height
const LV = { 1: { W: 220, H: 182, bottom: 220, budget: 7000 }, 2: { W: 235, H: 165, bottom: 212 }, 3: { W: 225, H: 160, bottom: 212 } };
const SPAN = { 1: [2, 5], 2: [2, 7], 3: [4, 7] };
const CX = [172, 503, 172, 503], DY = [0, 0, 356, 356];
/** the school-print form of a vocabulary name (the published bank's convention) */
const print = (w, loc) => (loc === 'de' ? w[0].toLocaleUpperCase('de') + w.slice(1) : loc === 'fr' ? w.toLocaleUpperCase('fr') : w.toLocaleLowerCase(loc));
const keyOf = (src) => src.split('/')[1].replace(/_\d+$/, '');
function wordsOf(id, level, srcs) {
  const out = {};
  for (const loc of LOCS) out[loc] = srcs.map((s) => {
    const e = V[keyOf(s)], w = loc === 'en' ? keyOf(s) : e && e[loc] && e[loc][0];
    if (!w) throw new Error(`G1-430 ${id}: no ${loc} name for ${s}`);
    const p = print(w, loc), [lo, hi] = SPAN[level];
    if (!/^\p{L}+$/u.test(p) || p.length < lo || p.length > hi) throw new Error(`G1-430 ${id}: ${loc} "${p}" is outside ${lo}-${hi} letters`);
    return p;
  });
  return out;
}
const copy = (id, level, name, srcs) => {
  const { W, H, bottom, budget } = LV[level];
  // a very long drawing (the train, aspect > 2) takes the card's whole width, or it prints as a thin strip
  const size = (src) => (wOf(src, 1) > 2 ? { w: 270 } : wOf(src, 1) >= W / H ? { w: W } : { h: H });
  return { id: 'ptx-G1-430-' + id, face: 'G1-430', level, name: { en: name }, words: wordsOf(id, level, srcs),
    skin: () => ({ ...BAND[level], ...(budget ? { budget } : {}), items: srcs.map((src, i) => ({ src, x: CX[i], y: bottom + DY[i], ...size(src) })) }) };
};
const SCENES = [
  // ── L1 — names of ≤ 5 letters in every locale, big simple pictures ───────────────────────────────────────────────────
  copy('bedtime', 1, 'At Bedtime', ['home and nature bw/moon', 'classroom bw 2/book', 'household bw/bed', 'furniture bw/sofa']),
  copy('kitchen', 1, 'In the Kitchen', ['food bw 2/bread', 'food bw 3/egg', 'food bw/pizza_2', 'food bw 2/taco']),
  copy('zoo-faces', 1, 'Zoo Faces', ['faces bw/panda_2', 'faces bw/koala', 'faces bw/bear', 'faces bw/wolf']),
  copy('farm', 1, 'On the Farm', ['faces bw/cow', 'birds bw 2/goose', 'animals bw 3/cat', 'farm bw/hay']),
  copy('countryside', 1, 'In the Countryside', ['vehicles bw/train', 'animals bw 4/llama', 'home and nature bw/nest', 'farm animals bw/pony']),
  // ── L2 — names of ≤ 7 letters (the published shape) ──────────────────────────────────────────────────────────────────
  copy('under-sea', 2, 'Under the Sea', ['sea life bw/whale', 'sea life bw 2/shark', 'sea life bw 2/seal', 'beach bw/anchor']),
  copy('market', 2, 'At the Market', ['fruits bw/banana', 'fruits bw/pear', 'vegetables bw/onion', 'Easter bw 2/basket']),
  copy('toy-shelf', 2, 'The Toy Shelf', ['toys bw/drum', 'toys bw 2/robot', 'toys bw/rocket', 'toys bw/duck']),
  copy('jungle', 2, 'In the Jungle', ['faces bw/lion', 'faces bw/tiger', 'faces bw/giraffe', 'faces bw/monkey']),
  copy('garden', 2, 'In the Garden', ['nature bw/bird', 'nature bw/leaf', 'home bw 2/flower', 'faces bw/mouse']),
  // ── L3 — 4-7 letters in every locale, digraphs and double letters ────────────────────────────────────────────────────
  copy('bakery', 3, 'At the Bakery', ['dessert bw/muffin', 'food bw 2/pretzel', 'dessert bw/pudding', 'valentine bw/cake']),
  copy('wildlife', 3, 'At the Wildlife Park', ['birds bw 2/toucan', 'zoo animals bw/gorilla', 'animals bw/bison', 'zoo animals bw/zebra']),
  // horse (or) and barn (ar): the r-controlled vowel teams of the G1 phonics sequence, beside deer (ee)
  copy('ranch', 3, 'On the Ranch', ['farm bw/horse', 'farm bw/barn', 'animals bw 3/deer', 'home bw/cactus']),
  copy('lake', 3, 'By the Lake', ['travel and holiday bw/kayak', 'animals bw/beaver', 'animals bw/otter', 'animals bw/swan']),
  copy('cafe', 3, 'At the Café', ['furniture bw/chair', 'home bw 2/table', 'food bw 2/soup', 'home and nature bw/plant']),
];
module.exports = { SCENES };
