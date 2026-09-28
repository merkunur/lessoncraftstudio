/**
 * opp-common.js — Level Set 2026-09-28 (Opposites): a native panel's output → the Level Set shape G1-307's
 * mergedBank() reads (data/b3/opposites-levelset.json), and the merged bank for validation.
 *
 * The two PICTURED concepts are locale-neutral pictures opened in session (qa/verify-b3-opposites.js OPENED):
 *   full-empty    a full glass of juice / the same glass empty   (a picture for the published pair where it
 *                                                                  exists; a new pair where it does not)
 *   summer-winter a beach with a parasol / a snowman             (a new noun pair)
 * A panel uses exactly these ids for those two concepts, or maps a concept to its own published pair id with
 * `pictureFor: { "full-empty": "lleno-vacio" }`; every other new pair is text-only.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');

const PICS = {
  'full-empty': { kind: 'two', a: { theme: 'breakfast', noun: 'juice' }, b: { theme: 'kitchen tools', noun: 'glass' } },
  'summer-winter': { kind: 'two', a: { theme: 'summer', noun: 'beach' }, b: { theme: 'winter', noun: 'snowman' } },
};

function toLevelset(loc, P) {
  const pub = bank('opposites', loc);
  const pubIds = new Set(pub.pairs.map((p) => p.id));
  const pairs = (P.pairs || []).map((p) => {
    const q = { alt: { a: [], b: [] }, exclusiveWith: [], syn: null, far: null, pic: null, ...p };
    if (PICS[q.id]) { q.pic = PICS[q.id]; q.picOpened = true; }
    return q;
  });
  const picAdd = {};
  const target = (id) => (P.pictureFor || {})[id] || id;
  for (const id of Object.keys(PICS)) {
    const p = pub.pairs.find((x) => x.id === target(id));
    if (p && !p.pic && !(P.refusePictures || []).includes(id)) picAdd[p.id] = PICS[id];
  }
  const opened = {};
  if (loc !== 'en') {
    for (const [concept, pic] of Object.entries(PICS)) {
      const id = target(concept);
      if (!picAdd[id] && !pairs.some((p) => p.id === id)) continue;
      (opened[`${pic.a.theme}/${pic.a.noun}`] = opened[`${pic.a.theme}/${pic.a.noun}`] || []).push(`${id}:a`);
      (opened[`${pic.b.theme}/${pic.b.noun}`] = opened[`${pic.b.theme}/${pic.b.noun}`] || []).push(`${id}:b`);
    }
  }
  for (const p of pairs) if (pubIds.has(p.id)) throw new Error(`${loc}: new pair id "${p.id}" is already a published pair`);
  // a pair whose one member contains the other (pt educado / mal-educado) prints its answer inside the given word
  const wordIn = (w, s) => new RegExp('(?<!\\p{L})' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(s);
  const dropped = [];
  for (const p of [...pairs]) if (wordIn(p.a, p.b) || wordIn(p.b, p.a)) { pairs.splice(pairs.indexOf(p), 1); dropped.push(p); }
  const gone = new Set(dropped.flatMap((p) => [p.a, p.b]));
  for (const p of pairs) { if (gone.has(p.far)) p.far = null; p.exclusiveWith = (p.exclusiveWith || []).filter((e) => !dropped.some((d) => d.id === e)); }
  const frames = (P.frames || []).filter((fr) => !dropped.some((d) => d.id === fr.pair));
  // a prefix item must start with its own (published) prefix — it "impossibile" is im-, not a published it prefix
  const prefixItems = (P.prefixItems || []).filter((it) => String(it.expected).startsWith(it.prefix));
  const refusedItems = (P.prefixItems || []).filter((it) => !String(it.expected).startsWith(it.prefix));
  return { pairs, picAdd, frames, prefixItems, ...(Object.keys(opened).length ? { opened } : {}), ...(dropped.length || refusedItems.length ? { refused: { pairs: dropped.map((p) => p.id), prefixItems: refusedItems.map((it) => it.expected) } } : {}) };
}

/** The bank a NEW copy reads (mirrors G1-307 mergedBank) — for validation before the import. */
function mergeForCheck(loc, ls) {
  const b = bank('opposites', loc);
  const back = new Map();
  for (const q of ls.pairs) for (const e of q.exclusiveWith || []) (back.get(e) || back.set(e, []).get(e)).push(q.id);
  const pairs = b.pairs.map((p) => (ls.picAdd[p.id] && !p.pic ? { ...p, pic: ls.picAdd[p.id], picOpened: true } : p))
    .map((p) => (back.has(p.id) ? { ...p, exclusiveWith: [...(p.exclusiveWith || []), ...back.get(p.id)] } : p));
  const pre = b.prefix || {};
  return {
    ...b,
    pairs: [...pairs, ...ls.pairs],
    frames: [...(b.frames || []), ...ls.frames],
    prefix: { ...pre, items: [...(pre.items || []), ...ls.prefixItems] },
    ...(b.opened || ls.opened ? { opened: { ...(b.opened || {}), ...(ls.opened || {}) } } : {}),
  };
}

// the printed level instructions a panel must supply, and the screen instructions per layout
const INSTR_KEYS = ['G1-307_L3', 'G1-335_L1', 'G1-335_L3', 'G1-336_L3', 'G1-337_L1', 'G1-337_L3', 'G2-320_L1', 'G2-320_L3'];
const SCREEN_KEYS = ['write', 'frames', 'match', 'choice', 'prefix'];

module.exports = { PICS, toLevelset, mergeForCheck, INSTR_KEYS, SCREEN_KEYS };
