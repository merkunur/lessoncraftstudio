/**
 * lib/ptx.js — the Picture Tracing Level Set (`ptl`, 2026-10-22): a Level Set copy's unit (`ptx-<face>-<slug>`) → its scene.
 *
 * A copy is a SKIN over its face's published scene (data/b9/face-scenes.js sceneFor): the face keeps its structure (frames,
 * shelves, the porthole, the staircase, the direction columns, the book and arches, the postcard, the word lanes …) and the
 * skin swaps what the face is about — the cast, the setting motifs, the drawn background — plus its level preset (band,
 * guide style). Merge rule: every key the skin sets replaces the published key (items / motifs / decor are whole lists, so a
 * skin never half-inherits a cast); `keep: ['decor']` style is explicit by leaving the key out.
 *
 * Skins live in data/ptx/scenes-*.js as { id, face, level, name: {en,…} | null, nameFrom?: 'hero', skin: {…} | (ctx)=>{…} }.
 * A page without a ptx unit never reaches this module, so every published page is byte-identical (proved by
 * qa/ptx-published-identity.js over all 20 faces × 11 locales).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { sceneFor } = require('../data/b9/face-scenes.js');
const { FACES } = require('../data/b9/picture-tracing.js');

const DIR = path.join(__dirname, '..', 'data', 'ptx');
let CACHE = null;
/** every Level Set skin, by unit id (all data/ptx/scenes-*.js) */
function catalog() {
  if (CACHE) return CACHE;
  CACHE = new Map();
  if (!fs.existsSync(DIR)) return CACHE;
  for (const f of fs.readdirSync(DIR).filter((x) => /^scenes-.*\.js$/.test(x)).sort()) {
    for (const s of require(path.join(DIR, f)).SCENES) {
      if (!/^ptx-/.test(s.id)) throw new Error('ptx: unit id must start "ptx-": ' + s.id);
      if (CACHE.has(s.id)) throw new Error('ptx: duplicate unit ' + s.id + ' (' + f + ')');
      if (![1, 2, 3].includes(s.level)) throw new Error('ptx: ' + s.id + ' has no level 1-3');
      CACHE.set(s.id, { ...s, file: f });
    }
  }
  return CACHE;
}
const MODE_OF = Object.fromEntries(Object.entries(FACES).map(([mode, f]) => [f.id, mode]));
const isPtx = (unit) => /^ptx-/.test(String(unit || ''));

/** unit → { entry, mode, scene } — the face's published scene with the skin merged over it */
function resolvePtx(unit, o = {}) {
  const e = catalog().get(String(unit));
  if (!e) throw new Error('ptx: unknown unit ' + unit);
  const mode = MODE_OF[e.face];
  if (!mode) throw new Error('ptx: ' + unit + ' names an unknown face ' + e.face);
  const base = sceneFor(mode, { words: o.words });
  const skin = typeof e.skin === 'function' ? e.skin({ words: o.words, base }) : e.skin;
  const scene = { ...base, ...skin };
  return { entry: e, mode, scene };
}

module.exports = { catalog, resolvePtx, isPtx, MODE_OF };
