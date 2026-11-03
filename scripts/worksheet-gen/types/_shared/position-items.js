/**
 * position-items.js — the items of a Position Words page (2026-11-02): one row per preposition of the level (round robin,
 * shuffled), each with a shape the grammar engine can build the sentence for (a null sentence is a refusal of that
 * shape — another is tried; "in" takes a container shape) and a picture of its own (no picture twice on a page; pictures
 * a child names otherwise refused). accept(prep, shape, sentence) may refuse a shape a page cannot use. Throws when the
 * language cannot give the rows.
 */
'use strict';
const P = require('./position-scenes.js');
const { vocab } = require('../../lib/b2-common.js');
const { manifest, labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const slot = require('../../lib/slot.js');

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
// es encima de / it sopra / pt em cima de also mean "above": a page there never asks for "above" (two right answers, or a
// right word marked wrong; review 2026-11-02)
const NO_PREP = { es: ['above'], it: ['above'], pt: ['above'] };
let PIC = null;
function picOf(key) {
  if (!PIC) {
    PIC = new Map();
    for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) for (const n of labelSafeNouns(theme)) {
      const k = n.vocabKey || n.noun;
      if (!PIC.has(k) && !nameRefused(theme, n.noun) && !REFUSED_NOUNS.has(n.noun)) PIC.set(k, { theme, noun: n.noun });
    }
  }
  return PIC.get(key) || null;
}

function positionItems({ locale, level, rows, rng, preps, accept, ctx }) {
  const L = String(locale || 'en').slice(0, 2);
  const want = (preps || P.LEVEL_PREPS[level] || P.LEVEL_PREPS[2]).filter((p) => !(NO_PREP[L] || []).includes(p));
  const objects = rng.shuffle(P.OBJECTS.filter((k) => picOf(k) && vocab()[k]));
  if (objects.length < rows) throw new Error(`position-items: ${objects.length} pictures for ${rows} rows`);
  // a teacher's pictures (maker): row i's object is item i of the slot 'pic' — any reviewed position object
  const objPool = P.OBJECTS.filter((k) => picOf(k) && vocab()[k]).map((k) => ({ ...picOf(k), key: k }));
  const objs = slot.anyPictures(ctx, objects.slice(0, rows).map((k) => objPool.find((o) => o.key === k)), objPool, 'pic');
  const order = [];
  while (order.length < rows) order.push(...rng.shuffle(want.slice()));
  const out = [];
  for (let i = 0; i < rows; i++) {
    const prep = order[i];
    const shapes = rng.shuffle((prep === 'in' ? P.CONTAINERS : P.SHAPES).slice());
    let got = null;
    for (const sh of shapes) {
      let s = P.sentence(L, prep, sh);
      // en: "The [dog] is in the square." — never a bare "[dog] is …", which reads as a name
      if (s && L === 'en' && /^\{img\}/.test(s.prefix)) s = { ...s, prefix: 'The ' + s.prefix };
      if (s && (!accept || accept(prep, sh, s))) { got = { shape: sh, sent: s }; break; }
    }
    if (!got) throw new Error(`position-items: ${L} has no sentence for "${prep}"`);
    const key = objs[i].key, p = objs[i];
    out.push({ prep, shape: got.shape, sent: got.sent, key, src: fileUri(p.theme, p.noun) });
  }
  return out;
}

/** the sentence as HTML: the picture inline for {img}, the gap (or the answer) where the preposition goes */
function sentenceHtml(item, gapHtml, px = 40) {
  const img = `<img class="ws-icon" src="${item.src}" alt="" style="width:${px}px;height:${px}px;vertical-align:middle">`;
  const pre = item.sent.prefix.replace('{img}', img);
  return `${pre}${gapHtml}${item.sent.suffix}`;
}

module.exports = { positionItems, sentenceHtml, NO_PREP };
