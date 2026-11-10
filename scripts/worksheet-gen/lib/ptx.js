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
const path = require('path');
const platform = require('./platform/index.js');   // read through the platform (the Picture Tracing maker, 2026-11-02)
const { sceneFor } = require('../data/b9/face-scenes.js');
const { FACES } = require('../data/b9/picture-tracing.js');

const DIR = path.join(__dirname, '..', 'data', 'ptx');
let CACHE = null;
/** every Level Set skin, by unit id (all data/ptx/scenes-*.js) */
function catalog() {
  if (CACHE) return CACHE;
  CACHE = new Map();
  // one skin file per face, named after it (scenes-K418.js): a browser cannot list a folder
  const files = Object.values(FACES).map((f) => 'scenes-' + f.id.replace('-', '') + '.js').filter((f) => platform.exists(path.join(DIR, f))).sort();
  for (const f of files) {
    for (const s of platform.requireData(path.join(DIR, f)).SCENES) {
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

/**
 * THE MAKER (2026-11-02): copy n of a face at a level is the n-th unit here — level 2 starts with the face's published
 * page (null), then the face's Level Set skins of that level, in catalogue order; levels 1 and 3 are its skins only.
 */
function makerUnits(faceId, level) {
  const all = [...catalog().values()].filter((e) => e.face === faceId), l = all.filter((e) => e.level === Number(level)).map((e) => e.id);
  // past its own level's scenes a copy takes the scenes of the next level up or down, drawn in this level's line (docs/makers/FLAGSHIP.md: a maker never runs dry)
  const more = all.filter((e) => Math.abs(e.level - Number(level)) === 1).map((e) => e.id);
  return (Number(level) === 2 || !l.length ? [null].concat(l) : l).concat(more);
}
/* ---- a teacher's picture on a composed face (docs/makers/FLAGSHIP.md) ---- */
const FL = require('./fl-art.js');
const INDEX = require('../data/pt/index.json');
// the faces where the scene's main drawing is free to be any picture; every other face is ABOUT its drawings (round ones,
// straight lines, Christmas, a count, a half) and keeps its own pages
const ART_FACES = new Set(['first-tracing', 'look-then-trace']);
const BANDS = { 1: ['P1'], 2: ['P1', 'P2'], 3: ['P2', 'P3'] };
/** the pictures a face offers at a level (empty: the face keeps its own pages) */
const artPool = (mode, level) => (ART_FACES.has(mode) ? FL.keys('pt', (b) => (BANDS[level] || BANDS[2]).includes(b)) : []);
/** the scene with its main drawing (the biggest; its model too) replaced by key; others: the next drawings, for a theme */
/** the drawing a scene is known by: its biggest (the one reskin swaps for the chosen picture) */
const sizeOf = (it) => (it.fitBox ? it.fitBox[0] * it.fitBox[1] : (it.h || 0) * (it.w || it.h || 0));
function heroSrc(scene) {
  const its = (scene.items || []).filter((it) => it.src);
  return its.length ? its.reduce((a, b) => (sizeOf(b) > sizeOf(a) ? b : a)).src : null;
}
function reskin(scene, key, others = []) {
  const size = sizeOf;
  const distinct = [...new Set((scene.items || []).filter((it) => it.src && !/^motif:/.test(it.src)).map((it) => it.src))];
  if (!distinct.length) throw new Error('ptx: nothing to swap in this scene');
  const biggest = (scene.items || []).filter((it) => it.src).reduce((a, b) => (size(b) > size(a) ? b : a)).src;
  const map = new Map([[biggest, key]]);
  let i = 0;
  for (const src of distinct) if (src !== biggest && i < others.length) map.set(src, others[i++]);
  // the new drawing takes the old one's footprint (its width and height, whatever its own shape)
  const box = (it) => { if (it.fitBox) return it.fitBox; if (it.fit) return [it.fit, it.fit]; const a = (INDEX[it.src] || {}).aspect || 1, h = it.h || (it.w ? it.w / a : 200); return [Math.round(it.w || h * a), Math.round(h)]; };
  return { ...scene, items: scene.items.map((it) => { if (!map.has(it.src)) return it; const { h, w, fit, ...rest } = it; return { ...rest, src: map.get(it.src), fitBox: box(it) }; }) };
}
module.exports = { catalog, resolvePtx, isPtx, MODE_OF, makerUnits, artPool, reskin, heroSrc };
