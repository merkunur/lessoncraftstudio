/**
 * htd-faces.js — the shared parts of the NEW How to Draw templates of the maker (makers 2026-11-02, NEW-TEMPLATES §30:
 * K-493 Draw with Shapes · K-494 Draw It Bigger · K-496 Draw Them Together · K-497 Step Cards to Cut and Order). They
 * read K-396's library parts — the lessons (data/b7/how-to-draw.js stepsFor / vectorStepsFor), the step renderer
 * (lib/htd-steps.js) and the apparatus (templates/components-b7/how-to-draw.js) — so K-396 and its published faces stay
 * untouched.
 *
 *   pool()                    every lesson the maker ships: the published units + every allocated Level Set unit
 *   order(face)               the face's own fixed order of that pool (two faces never start on the same lesson)
 *   pinned(face, level)       the lessons the face accepts at the level (data/b7/htd-face-pins.json, tools/build-htd-face-pins.js)
 *   copyOf(ctx)               the copy number of a maker page (its variant)
 *   root(face, unit, inner)   the page root
 */
'use strict';
const B = require('../data/b7/how-to-draw.js');
const { makeRng } = require('./rng.js');
const platform = require('./platform/index.js');
const path = require('path');

let _pool = null;
function pool() {
  if (!_pool) {
    const A = require('../data/htdx/allocation.json').faces || {};
    const s = new Set(B.UNITS.map((u) => u.slug));
    for (const f of Object.values(A)) for (const l of Object.values(f)) for (const c of l) if (c.unit) s.add(c.unit);
    _pool = [...s].sort();
  }
  return _pool;
}
const _order = new Map();
function order(face, list) { const k = face + '|' + (list ? list.length : 'pool'); if (!_order.has(k)) _order.set(k, makeRng('htd-faces|' + face).shuffle((list || pool()).slice())); return _order.get(k); }
let _pins = null;
function pinned(face, level) {
  if (_pins == null) { const f = path.join(__dirname, '..', 'data', 'b7', 'htd-face-pins.json'); _pins = platform.exists(f) ? platform.readJson(f) : {}; }
  const l = ((_pins.faces || {})[face] || {})[String(level)];
  return l && l.length ? l : null;
}
const copyOf = (ctx) => Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
/** the n-th entry of a list (copy n of the page) */
const nth = (list, ctx, k = 0) => list[(copyOf(ctx) - 1 + k) % list.length];
function root(face, unit, inner, extra = '') {
  return `<div data-ws-content data-lcs-htd-face="${face}" data-lcs-htd-unit="${unit}" ${extra} style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:0">${inner}</div>`;
}
module.exports = { pool, order, pinned, copyOf, nth, root, B };
