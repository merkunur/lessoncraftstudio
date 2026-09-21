/**
 * data/b4/tangram-figures.js — the K-353 `tangram` figure bank (design file
 * §5). GLOBAL and locale-neutral: every drawing on every face of the family
 * is a STORED placement of the 7 tans (or a declared subset) from this one
 * bank, placed by {id, x, y, rot, flip} on the √2 lattice and validated AT
 * LOAD (rules 1-6 of tools/gate-tangram-figures.js: ids, 45° steps, flip on
 * P only, area, no overlap, edge-connected, one silhouette loop) — a
 * malformed entry throws, so a bad edit cannot reach a render. `rng` only
 * ever picks WHICH stored entries, which transform and which order.
 *
 * The bank stores the placements exactly as MEASURED (scratch K-353-final.js,
 * 2026-09-21), in unit-square decimals with h = Math.SQRT2 / 4; every vertex
 * is a + b√2 in units of 1/8 by construction (the ring property), so the
 * loader never converts and the gate's 1e-9 tolerances are exact.
 *
 * Derived by the loader for every entry (never authored): `polys`, `bbox`,
 * `area`, `silhouette`, `symmetryGroup`, `chiral`, `outlineKind`
 * (triangle | square | other), `counts {tans, triangles, squares}`, and for
 * MINIS `unique` (the lattice tiler, LAZY — first access, memoised; the base
 * page never touches a mini). `data/` is gitignored — the reviewer `git add -f`s.
 *
 * No name, no label, no string in any locale lives in this file (rule 12);
 * the titles + instructions live in data/b4/tangram.js `strings` (en) and
 * i18n/strings.<loc>.json.
 */
'use strict';
const P = require('../../primitives/tangram.js');

const h = Math.SQRT2 / 4;
const T = (id, x, y, rot, flip) => ({ id, x, y, rot, flip: !!flip });
/** 5 small tans as a square of side 2h (origin = its top-left). */
const SMALLSQ = (ox, oy) => [T('M', ox + h, oy + h, 45), T('Q', ox + 2 * h, oy, 45), T('S1', ox + 2 * h, oy + 2 * h, 225), T('S2', ox + h, oy, 135), T('P', ox + h, oy, 45)];
/** 5 small tans as the classic half: the right triangle (0,0) (1,1) (0,1). */
const H = (ox, oy) => [T('M', ox, oy + 1, 270), T('Q', ox + 0.5, oy + 0.5, 0), T('S1', ox + 1, oy + 1, 180), T('S2', ox + 0.25, oy + 0.75, 270), T('P', ox, oy, 0)];

// key: placements                                                                      bbox (unit)   symmetry group (m)   used by
const FIGURES = {
  square: [T('L1', 0, 0, 0), T('L2', 1, 0, 90), ...H(0, 0)],                                      // 1 x 1        all 8               base template, F2, F3
  rectangle: [T('L1', 0, 2 * h, 315), T('L2', 2 * h, 0, 135), ...SMALLSQ(2 * h, 0)],               // 1.414 x 0.707 id rot180 mirX mirY base, F2, F3, F4
  triangle: [T('L1', 0, 0, 90), T('L2', 0, 1, 180), ...H(0, 0)],                                   // 2 x 1        id mirX             d1 / d3 only
  tree: [T('L1', -2 * h, 2 * h, 315), T('L2', 0, 0, 45), ...SMALLSQ(-h, 2 * h)],                    // 1.414 x 1.414 id mirX            base, F2, F3, F4 (was "house": reads as a fir tree)
  arrow: [...SMALLSQ(0, 0), T('L1', 2 * h, -h, 45), T('L2', 4 * h, h, 135)],                        // 1.414 x 1.414 id mirY            base, F2, F3, F4
  boat: [T('M', 0, 2 * h, 225), T('Q', 0, 0, 315), T('S1', 2 * h, 0, 135), T('S2', 0, h, 225), T('P', -2 * h, 0, 315), T('L1', 0.5, 0, 180), T('L2', -0.5, 0, 270)],   // 1.414 x 1.707 id   base
  cat: [T('Q', 0.25, 0, 0), T('S1', 0, 0.25, 270), T('S2', 0.5, -0.25, 90), T('L1', 0.5, 0.25, 90), T('L2', 0.5, 1.25, 180), T('M', -0.5, 0.75, 0), T('P', 0.5, 1.25, 180, true)],   // 1.25 x 1.5  id   base, F2 (722), F3 (722), F4
  rabbit: [T('Q', 0.25, 0, 0), T('P', 0, 0.25, 180, true), T('S1', 0.5, -0.25, 90), T('S2', 0.25, 0, 270), T('L1', 0.5, 0.25, 90), T('L2', 0.5, 1.25, 180), T('M', -0.5, 0.75, 0)],   // 1 x 1.75  id   d3 only
  trapezoid: [...SMALLSQ(2 * h, 0), T('L1', 0, 2 * h, 315), T('L2', 4 * h, 0, 45)],                 // 2.121 x 0.707 id mirX            d1 only
  parallelogram: [...SMALLSQ(2 * h, 0), T('L1', 0, 2 * h, 315), T('L2', 6 * h, 0, 135)],            // 2.121 x 0.707 id rot180          d1 only
};

/** A sub-figure keeps its parent's coordinates: every count set / mini is a real fragment of a real figure. */
const pick = (fig, ids) => {
  const src = FIGURES[fig];
  if (!src) throw new Error('tangram-figures: pick() from unknown figure ' + fig);
  const out = src.filter((t) => ids.includes(t.id));
  if (out.length !== ids.length) throw new Error('tangram-figures: pick(' + fig + ') did not find ' + ids.join(' '));
  return out;
};

// F1 outlines; `unique` is PROVED by the lattice tiler (never authored). Keys listed in
// MINI_REFUSED must report >= 2 tilings (the three controls of the gate's rule 7).
const MINIS = {
  'm-from-2s': [T('S1', 0, 0, 0), T('S2', 0.5, 0, 90)],
  'p-from-2s': [T('S1', 0, 0, 0), T('S2', 0.75, 0.25, 180)],
  'trap-m-s': [T('M', 0, 0, 0), T('S1', 0.5, 0, 180)],
  'bigtri-2l': [T('L1', 0, 0, 0), T('L2', 1, 0, 90)],
  'trap-l-m': [T('L1', 0, 0, 0), T('M', 1, 0.5, 180)],
  'para-2l': [T('L1', 0, 0, 0), T('L2', 1.5, 0.5, 180)],   // d3 / wide (327 px at S 216)
  'trap-q-2s': pick('square', ['Q', 'S1', 'S2']),
  'kite-l-q-s': pick('square', ['L2', 'S1', 'Q']),
  'pent-l-s-p': pick('trapezoid', ['L1', 'S2', 'P']),
};
// REFUSED (each must report 2 tilings — the gate's rule-7 controls): the square from two S
// (either diagonal) and the 2h x h rectangle from M+S+S. Never in a pool.
const MINI_REFUSED = {
  'sq-from-2s': [T('S1', 0, 0, 0), T('S2', 0.5, 0, 180)],
  'rect-m-2s': [T('M', 0, 0, 45), T('S1', 0, 0, 135), T('S2', h, h, 225)],
};
// PROVEN-UNIQUE CANDIDATES in no pool: the large triangle from Q+S+S reports ONE tiling under
// the lattice tiler (the design's "2" was a -0.00000 vs 0.00000 key artefact of the scratch
// tiler, measured 2026-09-21; an axis-aligned square on the base does not fit the triangle at
// all). Admitting it to F1 is a face-build / panel decision, not a data edit.
const MINI_CANDIDATES = {
  'l-from-2s-q': [T('S1', 0, 0, 0), T('S2', 0.5, 0, 0), T('Q', 0.5, 0, 0)],
};

// F5 count sets: tans / triangles / squares derived at load
const SUBS = {
  'cat-head': pick('cat', ['Q', 'S1', 'S2']),
  'rabbit-head': pick('rabbit', ['Q', 'P', 'S1', 'S2']),
  'tree-4tri': pick('tree', ['L1', 'L2', 'S2', 'P', 'M']),
  'rabbit-body': pick('rabbit', ['L1', 'L2', 'M']),
  'arrow-head-q': pick('arrow', ['L1', 'L2', 'Q', 'S1']),
  'trap-q-2s': MINIS['trap-q-2s'],
  'kite-l-q-s': MINIS['kite-l-q-s'],
  'pent-l-s-p': MINIS['pent-l-s-p'],
  'cat-no-tail': pick('cat', ['Q', 'S1', 'S2', 'L1', 'L2', 'M']),         // d3
  'boat-sail-hull-m': pick('boat', ['L1', 'L2', 'M', 'S2', 'Q']),         // d3
};
// EXCLUDED from F5 by the outline rule (a K child honestly counts the outline too): kept so the
// gate can PROVE the rule fires on them (rule 9 poison P12), never in any face pool.
const SUBS_EXCLUDED = {
  'half-h': pick('square', ['M', 'Q', 'S1', 'S2', 'P']),   // triangle outline
  'smallsq': pick('rectangle', ['M', 'Q', 'S1', 'S2', 'P']),   // square outline
  'bigsq': pick('rectangle', ['L1', 'L2']),   // square outline
  'l-q': pick('square', ['L2', 'Q']),   // 2 tans
};

const SET = FIGURES.square;
const BASE_POOL = ['tree', 'boat', 'arrow', 'cat', 'rectangle'];
const F4_REFUSED = ['square'];
const F4_POOL = ['tree', 'arrow', 'rectangle', 'cat'];
const F5_POOL = ['cat-head', 'rabbit-head', 'tree-4tri', 'rabbit-body', 'arrow-head-q', 'trap-q-2s', 'kite-l-q-s', 'pent-l-s-p'];
const F1_POOL2 = ['m-from-2s', 'p-from-2s', 'trap-m-s', 'bigtri-2l', 'trap-l-m'];
const F1_POOL3 = ['trap-q-2s', 'kite-l-q-s', 'pent-l-s-p'];
const F2_POOL = ['tree', 'arrow', 'cat', 'rectangle', 'square'];
const F3_POOL = ['tree', 'arrow', 'cat', 'rectangle', 'square'];
// the design's symmetry table (§5) — DIFFED by the gate against the derived groups (a silent
// change of a figure changes F4's distractor set)
const SYMMETRY_TABLE = {
  square: ['id', 'rot90', 'rot180', 'rot270', 'mirX', 'mirY', 'mirD', 'mirA'],
  rectangle: ['id', 'rot180', 'mirX', 'mirY'],
  triangle: ['id', 'mirX'],
  tree: ['id', 'mirX'],
  arrow: ['id', 'mirY'],
  boat: ['id'],
  cat: ['id'],
  rabbit: ['id'],
  trapezoid: ['id', 'mirX'],
  parallelogram: ['id', 'rot180'],
};

/* ------------------------------------------------------------------ the loader: validate at load, derive per entry */
const KEY_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function derive(kind, key, tans) {
  if (!KEY_RE.test(key)) throw new Error(`tangram-figures: ${kind} key "${key}" is not an ASCII slug`);
  const a = P.analyze(tans, { full: kind === 'figure' });
  if (a.faults.length) throw new Error(`tangram-figures: ${kind} "${key}" is invalid — ${a.faults.join('; ')}`);
  return { key, kind, tans, ...a };
}
const _cache = new Map();
function entry(kind, table, key) {
  const ck = kind + ':' + key;
  if (_cache.has(ck)) return _cache.get(ck);
  const tans = table[key];
  if (!tans) throw new Error(`tangram-figures: no ${kind} "${key}"`);
  const e = derive(kind, key, tans);
  _cache.set(ck, e);
  return e;
}
function figure(key) { return entry('figure', FIGURES, key); }
function sub(key) { return entry('sub', SUBS, key); }
/** A MINI carries `unique` (the lattice tiler, lazy + memoised); a non-unique mini REFUSES to load. */
const _unique = new Map();
function tilingsOf(tans) {
  const a = P.analyze(tans);
  if (a.faults.length) throw new Error('tangram-figures: tilingsOf on an invalid tiling — ' + a.faults.join('; '));
  return P.countTilings(a.silhouette, tans.map((t) => P.clsOf(t.id)));
}
function mini(key) {
  const e = entry('mini', MINIS, key);
  if (!_unique.has(key)) _unique.set(key, tilingsOf(e.tans));
  const n = _unique.get(key);
  if (n !== 1) throw new Error(`tangram-figures: mini "${key}" has ${n} tilings (not unique) — refused`);
  return { ...e, unique: true, tilings: n };
}

// validate EVERY table at load (rules 1-6; a malformed row throws before any render)
for (const [k, t] of Object.entries(FIGURES)) derive('figure', k, t);
for (const [k, t] of Object.entries(MINIS)) derive('mini', k, t);
for (const [k, t] of Object.entries(MINI_REFUSED)) derive('mini', k, t);
for (const [k, t] of Object.entries(MINI_CANDIDATES)) derive('mini', k, t);
for (const [k, t] of Object.entries(SUBS)) derive('sub', k, t);
for (const [k, t] of Object.entries(SUBS_EXCLUDED)) derive('sub', k, t);
{
  const all = [...Object.keys(FIGURES), ...Object.keys(MINIS), ...Object.keys(MINI_REFUSED), ...Object.keys(MINI_CANDIDATES), ...Object.keys(SUBS).filter((k) => !MINIS[k]), ...Object.keys(SUBS_EXCLUDED)];
  const seen = new Set();
  for (const k of all) { if (seen.has(k)) throw new Error('tangram-figures: key "' + k + '" is used twice across the tables'); seen.add(k); }
  for (const k of [...BASE_POOL, ...F2_POOL, ...F3_POOL, ...F4_POOL, ...F4_REFUSED, ...Object.keys(SYMMETRY_TABLE)]) if (!FIGURES[k]) throw new Error('tangram-figures: pool names unknown figure ' + k);
  for (const k of [...F1_POOL2, ...F1_POOL3]) if (!MINIS[k]) throw new Error('tangram-figures: pool names unknown mini ' + k);
  for (const k of F5_POOL) if (!SUBS[k]) throw new Error('tangram-figures: pool names unknown sub ' + k);
}

/**
 * The bbox-filtered pool of a face at a shipped body height (the gate's rule 10
 * reads it at 722 AND 677). `cfg` = the face's resolved config ({S, pool, pad,
 * chipW, box, ...}); the container limits are the design's measured card
 * inners (§3). A drawn figure is bbox x S + 2 x pad wide/tall, pad = the svg
 * root's stroke pad (stroke/2 + 1 = 2.5 by default; a face may declare
 * `pad` when it draws with a tighter root, e.g. F4 at box 160).
 */
function poolFor(face, cfg, bodyH) {
  const S = cfg.S;
  const pad = cfg.pad == null ? 2.5 : cfg.pad;
  const tall = bodyH >= 722;
  const dims = (e) => ({ w: e.bbox.w * S + 2 * pad, h: e.bbox.h * S + 2 * pad });
  if (face === 'base') {
    // row 2: two figures + 24 gap inside 675; height = the body minus the strip + template block + gap
    const maxH = bodyH - (30 + Math.ceil(S + 2 * pad) + 16);
    return (cfg.pool || BASE_POOL).filter((k) => { if (k === 'square') return false; const d = dims(figure(k)); return d.w <= (675 - 24) / 2 && d.h <= maxH; });
  }
  if (face === 'silhouette') { const inner = tall ? 338 : 315; return (cfg.pool || F2_POOL).filter((k) => { const d = dims(figure(k)); return d.w <= 314 && d.h <= inner; }); }
  if (face === 'missing') { const inner = tall ? 203 : 188; const maxW = 302 - 12 - (cfg.chipW || 104); return (cfg.pool || F3_POOL).filter((k) => { const d = dims(figure(k)); return d.w <= maxW && d.h <= inner; }); }
  if (face === 'match') {
    const inner = (cfg.box || 160) - 4;
    return (cfg.pool || F4_POOL).filter((k) => {
      if (F4_REFUSED.includes(k)) return false;
      const f = figure(k); const d = dims(f);
      const outside = P.TRANSFORM_NAMES.filter((t) => !f.symmetryGroup.includes(t)).length;
      return Math.max(d.w, d.h) <= inner && outside >= 2;
    });
  }
  if (face === 'count') { const maxH = tall ? 264 : 241; return (cfg.pool || F5_POOL).filter((k) => { const s = sub(k); const d = dims(s); return d.w <= 302 && d.h <= maxH && s.outlineKind === 'other' && s.counts.tans >= 3 && s.counts.tans <= 6; }); }
  if (face === 'compose') { const inner = tall ? 326 : 303; return [...(cfg.pool2 || F1_POOL2), ...(cfg.pool3 || F1_POOL3)].filter((k) => { const d = dims(entry('mini', MINIS, k)); return d.w <= 302 && 44 + 12 + d.h <= inner; }); }
  throw new Error('tangram-figures: poolFor unknown face ' + face);
}

const TANGRAM_FIGURES = {
  h, T, SMALLSQ, H, pick,
  FIGURES, MINIS, MINI_REFUSED, MINI_CANDIDATES, SUBS, SUBS_EXCLUDED, SET, BASE_POOL,
  F1_POOL2, F1_POOL3, F2_POOL, F3_POOL, F4_POOL, F4_REFUSED, F5_POOL, SYMMETRY_TABLE,
  figure, mini, sub, poolFor, tilingsOf, derive,
};
module.exports = { TANGRAM_FIGURES };
