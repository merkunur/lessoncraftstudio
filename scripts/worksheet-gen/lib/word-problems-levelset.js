/**
 * word-problems-levelset.js — Level Set (walk #65, 2026-10-14): the NEW pages of the Word Problems family
 * (G1-213 + G1-238..241 add/sub stories, G3-370 + G3-371..376 multiply/divide stories). PDF + interactive + key.
 *
 * The published pages (level 2, copy 1) never come here: they are built by each type's untouched `_legacy` draw over
 * data/word-problems/frames.js / data/b2/wp-muldiv-frames.js (byte-identical). Everything below is read by new pages only.
 *
 *  - STORIES: the published frames + data/word-problems/word-problems-levelset.json (native, 11 locales), merged.
 *    New kinds: addChange (7 + ? = 12), subChange (12 − ? = 7), compare (how many more / fewer).
 *  - NOUNS: only things a child can have, get, give away, put in a box or share — an ALLOW-list per theme, every picture
 *    opened on contact sheets 2026-10-14 (refused: pictures that read as something else — a plum that is an apple, a
 *    radish that is a carrot, a toadstool "mushroom"; pictures that hold SEVERAL things, so the icon strip miscounts —
 *    a pancake stack, crayons, cards, two dominoes, cherries in pairs, a cake with candles; people, animals, buildings,
 *    furniture, appliances, knives, religious objects). Countable: the English plural differs from the singular
 *    (dice / chess / lego are refused), and fi needs a partitive form.
 *  - {Q}: the "how many" that agrees with the noun (es Cuántos/Cuántas, pt Quantos/Quantas, it Quanti/Quante — the
 *    gender read from image-vocabulary.js); fr {il}/{il2}: the pronoun of {name}/{name2}; fr elision (de → d', que → qu').
 */
'use strict';
const path = require('path');
const { labels, labelSafeNouns, fileUri } = require('../image-cache/resolve.js');
const { FRAMES } = require('../data/word-problems/frames.js');
const { WP_MULDIV } = require('../data/b2/wp-muldiv-frames.js');
const LS = require('../data/word-problems/word-problems-levelset.json');

const CORAL = '#F2784B', TEAL = '#146B5E', INK = '#3A3530';

// ---------------------------------------------------------------------------------------------- allowed nouns
const ALLOW = {
  fruits: 'apple banana blackberry cherry clementine blueberry dragonfruit fig lemon mango orange pear pineapple pomegranate raspberry strawberry',
  vegetables: 'asparagus bell_pepper broccoli beetroot cabbage carrot cauliflower celery chilli_pepper corn cucumber eggplant garlic green_beans leek lettuce onion potato parsnip radish pumpkin tomato',
  toys: 'airplane ball balloon boat bucket car dinosaur doll helicopter kite race_car robot rocket shovel skateboard teddy_bear train truck',
  bakery: 'bagel baguette brownie bun cake cinnamon_roll cookie cupcake croissant doughnut muffin gingerbread_man pie pretzel waffle',
  'desserts and sweets': 'cake brownie candy_cane cinnamon_roll cookie chocolate_bar cupcake donut gingerbread_man lollipop ice_cream macaron muffin pie popsicle pudding waffle',
  classroom: 'binder backpack book crayon eraser folder lunchbox marker notebook pen pencil ruler scissors tape',
  christmas: 'candle bell candy_cane cookie gingerbread ornament present ribbon star stocking',
  easter: 'candy carrot chocolate daffodil egg feather flower ribbon tulip',
  accessories: 'badge barrette beanie bow_tie bracelet cap crown glove hair_tie handbag hat headband medal mitten necklace party_hat purse ribbon ring scarf sock sun_hat tiara tie umbrella wallet watch whistle',
  'kitchen tools': 'bottle bowl cup fork glass jar ladle mug plate spatula spoon teapot whisk',
  'fruits bw': 'apple banana lemon orange pear pineapple pomegranate watermelon strawberry blackberry',
  'vegetables bw': 'beetroot carrot bell_pepper broccoli corn eggplant cucumber garlic onion lettuce potato pumpkin tomato',
  'toys bw': 'airplane boat bucket dinosaur car drum guitar helicopter party_hat robot rocket rocking_horse spinning_top teddy_bear train trumpet',
  'toys bw 2': 'bucket car helicopter guitar kite pinwheel robot teddy_bear rocket rocking_horse truck trumpet xylophone',
  'food bw 2': 'cake croissant bread donut cheese hamburger ice_cream lollipop pizza hot_dog pretzel muffin sandwich taco',
  'classroom bw': 'book marker notebook pencil pen ruler',
  'Easter bw': 'bell bread candy carrot cookie egg gift lollipop tulip',
  'Christmas bw': 'bell bow candle candy candy_cane gift_box gingerbread_man lollipop ornament santa_hat star stocking',
  'kitchen bw': 'bottle bowl fork glass jar ladle plate spoon teapot teacup whisk',
};
const THEMES = Object.keys(ALLOW);
const ALLOW_SET = Object.fromEntries(Object.entries(ALLOW).map(([t, s]) => [t, new Set(s.split(' '))]));

// Finnish partitive after a numeral: the two word-problem tables, then the shared sentence / instruction banks
let _fi = null;
function fiForm(key) {
  if (!_fi) {
    const S = require('../data/b2/sentences.js').SENTENCES;
    const obj = ((require('./b3-common.js').bank('instructions', 'fi')) || {}).objForms || {};
    _fi = (k) => FRAMES.fi.nounForms[k] || WP_MULDIV.fi.nounForms[k] || (S.fi && S.fi.nounForms && S.fi.nounForms[k]) || (obj[k] && obj[k].part) || null;
  }
  return _fi(key);
}

/** The nouns a NEW page may count on this theme in this locale: [{noun, vocabKey, text, gender}] (throws on an un-listed theme). */
function nounsFor(theme, loc) {
  const allow = ALLOW_SET[theme];
  if (!allow) throw new Error(`word-problems Level Set: theme "${theme}" is not on the allow-list`);
  const out = [];
  for (const n of labelSafeNouns(theme)) {
    if (!allow.has(n.noun)) continue;
    const en = labels(n.vocabKey, 'en');
    if (!en || !en[0] || !en[1] || en[0].trim().toLowerCase() === en[1].trim().toLowerCase()) continue;   // dice, chess, lego
    const l = labels(n.vocabKey, loc);
    if (!l || !l[1]) continue;
    let text = loc === 'fi' ? fiForm(n.vocabKey) : l[1];
    if (!text) continue;
    if (loc !== 'de') text = text.toLocaleLowerCase(loc);
    out.push({ noun: n.noun, vocabKey: n.vocabKey, text, gender: l[2] || null });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------- stories
/** The merged frame list of a kind for a NEW page: the published frames first, then the Level Set ones. */
function framesFor(loc, kind) {
  const ls = LS[loc] || {};
  if (['add', 'sub'].includes(kind)) return [...FRAMES[loc].frames[kind], ...(ls[kind] || [])];
  if (['mul', 'share', 'group'].includes(kind)) return [...WP_MULDIV[loc].frames[kind], ...(ls[kind] || [])];
  const f = ls[kind];
  if (!f || !f.length) throw new Error(`word-problems Level Set: no ${kind} frames for ${loc}`);
  return f;
}
function namesFor(loc, g3) {
  const base = (g3 ? WP_MULDIV : FRAMES)[loc].names;
  return [...new Set([...base, ...((LS[loc] || {}).names || [])])];
}
const QW = {
  es: { m: 'Cuántos', f: 'Cuántas' },
  pt: { m: 'Quantos', f: 'Quantas' },
  it: { m: 'Quanti', f: 'Quante' },
};
function quantWord(loc, gender) {
  const t = QW[loc];
  if (!t) return null;
  const g = gender === 'f' ? 'f' : gender === 'm' ? 'm' : null;
  if (!g) throw new Error(`word-problems Level Set: no gender for a ${loc} noun ("${gender}")`);
  return t[g];
}
/** fr: elide de / que before a vowel (never before h — an aspirated h keeps "de"). */
function frElide(s) {
  return s.replace(/(^|[\s(])(de|que) (?=[aeiouyàâäéèêëîïôöûüœæAEIOUYÀÂÉÈÊËÎÏÔÖÛÜŒÆ])/g, (m0, p, w) => p + (w === 'de' ? 'd\'' : 'qu\''));
}
function fill(tpl, s, loc) {
  let out = tpl;
  if (/\{Q\}/.test(out)) out = out.replace(/\{Q\}/g, quantWord(loc, s.gender));
  if (loc === 'fr' && /\{il2?\}/.test(out)) {
    const G = (LS.fr || {}).nameGender || {};
    const pro = (n) => { const g = G[n]; if (!g) throw new Error('word-problems Level Set: no gender for fr name ' + n); return g === 'f' ? 'elle' : 'il'; };
    out = out.replace(/\{il\}/g, pro(s.name)).replace(/\{il2\}/g, pro(s.name2));
  }
  out = out.replace(/\{(name2|name|n1|n2|n3|noun)\}/g, (_, k) => String(s[k]));
  if (/\{[^}]*\}/.test(out)) throw new Error('word-problems Level Set: unfilled slot in "' + out + '"');
  return loc === 'fr' ? frElide(out) : out;
}

// ---------------------------------------------------------------------------------------------- numbers
/** A G1 problem's numbers for its kind. d: { max, iconMax, n2Set }. Returns {n1, n2, n3, answer} or null (re-draw). */
function drawG1(kind, d, rng) {
  const M = d.max, I = d.iconMax;
  const pick = (lo, hi) => (hi < lo ? null : rng.int(lo, hi));
  const set = d.n2Set ? (lo, hi) => { const c = d.n2Set.filter((v) => v >= lo && v <= hi); return c.length ? rng.pick(c) : null; } : pick;
  let n1, n2 = null, n3 = null, answer;
  if (kind === 'add') { n1 = pick(2, Math.min(I, M) - 2); if (n1 == null) return null; n2 = set(2, Math.min(I, M) - n1); if (n2 == null) return null; answer = n1 + n2; }
  else if (kind === 'sub') { n1 = pick(4, Math.min(I, M)); n2 = set(2, n1 - 2); if (n2 == null) return null; answer = n1 - n2; }
  else if (kind === 'addChange') { n1 = pick(2, Math.min(I, M - 2)); const c = set(2, M - n1); if (c == null) return null; n3 = n1 + c; answer = c; }
  else if (kind === 'subChange') { n1 = pick(4, Math.min(I, M)); const c = set(2, n1 - 2); if (c == null) return null; n3 = n1 - c; answer = c; }
  else if (kind === 'compare') { n1 = pick(4, Math.min(I, M)); n2 = set(2, n1 - 2); if (n2 == null) return null; answer = n1 - n2; }
  else throw new Error('word-problems Level Set: unknown kind ' + kind);
  // the answer is never one of the printed numbers (a child would copy it)
  if ([n1, n2, n3].includes(answer)) return null;
  return { n1, n2, n3, answer };
}
/** The answer of a G1 problem, recomputed from its stamps (verify + the robot's oracle). */
function g1Answer(kind, a, b, c) {
  if (kind === 'add') return a + b;
  if (kind === 'sub' || kind === 'compare') return a - b;
  if (kind === 'addChange') return c - a;
  if (kind === 'subChange') return a - c;
  return NaN;
}

// ---------------------------------------------------------------------------------------------- pictures (G1)
function iconImg(theme, noun, px, extra = '') {
  return `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px${extra}">`;
}
const sign = (s, px = 26) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;color:${TEAL};margin:0 4px">${s}</span>`;
/** change-unknown strip: the known start as pictures, then "+ ?" / "− ?", "=", the result as a numeral */
function changeStrip({ kind, n1, n3, theme, noun, iconPx, qPx = 40 }) {
  const q = `<span data-lcs-unknown style="display:inline-flex;align-items:center;justify-content:center;width:${qPx}px;height:${qPx}px;border:2.5px dashed ${CORAL};border-radius:10px;font-family:'Baloo 2';font-weight:700;font-size:${Math.round(qPx * 0.62)}px;color:${CORAL}">?</span>`;
  return `<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap" data-lcs-strip data-lcs-op="${kind}" data-lcs-n1="${n1}" data-lcs-n3="${n3}">` +
    Array.from({ length: n1 }, () => `<span data-lcs-g1>${iconImg(theme, noun, iconPx)}</span>`).join('') +
    sign(kind === 'addChange' ? '+' : '−', Math.round(iconPx * 0.66)) + q + sign('=', Math.round(iconPx * 0.66)) +
    `<span data-lcs-total style="font-family:'Baloo 2';font-weight:700;font-size:${Math.round(iconPx * 0.75)}px;color:${INK}">${n3}</span></div>`;
}
/** compare strip: two rows, one picture under the other, labelled at the left with the two children of the story — or,
 *  when the story compares two BOXES (no second child), with a red and a blue swatch; the extra pictures are uncovered */
function compareStrip({ n1, n2, theme, noun, iconPx, name, name2, namePx = 15, boxes = false }) {
  const label = (who, colour) => (boxes
    ? `<span data-lcs-swatch="${colour}" style="display:inline-block;width:${Math.round(iconPx * 0.8)}px;height:${Math.round(iconPx * 0.8)}px;border-radius:6px;background:${colour === 'red' ? '#E0533A' : '#3B7DD8'}"></span>`
    : who);
  const row = (n, who, attr) => `<div style="display:flex;align-items:center;gap:5px">` +
    `<span style="flex:0 0 ${iconPx * 2.2}px;font-family:'Nunito';font-weight:800;font-size:${namePx}px;color:${INK};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${label(who, attr === 'data-lcs-g1' ? 'red' : 'blue')}</span>` +
    Array.from({ length: n }, () => `<span ${attr}>${iconImg(theme, noun, iconPx)}</span>`).join('') + `</div>`;
  return `<div style="display:flex;flex-direction:column;gap:6px" data-lcs-strip data-lcs-op="compare" data-lcs-n1="${n1}" data-lcs-n2="${n2}">` +
    row(n1, name, 'data-lcs-g1') + row(n2, name2, 'data-lcs-g2') + `</div>`;
}

// ---------------------------------------------------------------------------------------------- screen + key
/** The write box of the SCREEN version (type-number): big, its stamps let the robot recompute the answer. */
function writeBox(answer, label, meta, w = 112, h = 104) {
  return `<span class="ws-blankbox" data-lcs-wbox data-lcs-answer="${answer}" data-lcs-label="${label}" ${meta} ` +
    `style="width:${w}px;height:${h}px;flex:0 0 ${w}px;box-sizing:border-box;display:inline-block;border:3px solid ${TEAL};border-radius:14px;background:#fff"></span>`;
}
/** The KEY: every answer box of the printed page written in, centred, coral. */
function fillAnswerBoxes(html) {
  return html.replace(/(<span class="ws-answerbox" style=")([^"]*)("[^>]*data-lcs-answer="([^"]*)"[^>]*>)(<\/span>)/g,
    (m0, open, style, close, ans, end) => `${open}${style};display:inline-flex;align-items:center;justify-content:center${close}<span data-lcs-keytext style="font-family:'Baloo 2',cursive;font-weight:700;font-size:30px;line-height:1;color:${CORAL}">${ans}</span>${end}`);
}

/**
 * The PUBLISHED draw's filler (G1-213 / G3-370 `_legacy`): the June slots exactly as before, plus — only in a frame that
 * carries them (the review fixes of 2026-10-14) — {Q} (the noun's gender, es/pt/it) and {il} (fr, the child's name).
 */
function fillLegacy(tpl, slots, loc, vocabKey) {
  let out = tpl;
  if (/{Q}/.test(out)) { const l = labels(vocabKey, loc); out = out.replace(/{Q}/g, quantWord(loc, l && l[2])); }
  if (/{il}/.test(out)) { const g = ((LS.fr || {}).nameGender || {})[slots.name]; if (!g) throw new Error('word-problems: no gender for fr name ' + slots.name); out = out.replace(/{il}/g, g === 'f' ? 'elle' : 'il'); }
  out = out.replace(/\{(name|n1|n2|noun)\}/g, (_, k) => String(slots[k]));
  // fr: de / que elide before a vowel ("Combien d'oranges" — the live "Combien de oranges" was a defect, fixed 2026-10-14)
  return loc === 'fr' ? frElide(out) : out;
}

module.exports = { fillLegacy, ALLOW, THEMES, nounsFor, framesFor, namesFor, fill, frElide, quantWord, drawG1, g1Answer, iconImg, changeStrip, compareStrip, writeBox, fillAnswerBoxes, CORAL, TEAL, INK, LS };
