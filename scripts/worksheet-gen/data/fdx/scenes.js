/**
 * data/fdx/scenes.js — the ORIGINAL scenes of the Find the Differences Level Set expansion (operator 2026-10-10:
 * "original scenes, the scenes shouldn't be similar"). Each scene: a setting + variant (lib/fdx-scenery.js), a hero and
 * a cast of library drawings that belong there (data/fdx/catalog.js), laid out by lib/fdx-layout.js. Every scene was
 * READ (tools/fdx-preview.js) in line and colour before it was kept; qa/fdx-distinct.js keeps them apart.
 * The scenes live in batches (scenes-b<N>.js), one per group of settings.
 *   level  1 sparse (6-7 drawings) · 2 medium (8-10) · 3 dense (11-13)
 */
'use strict';
const Sc = (id, en, setting, variant, hero, cast, o = {}) => ({ id: 'fdx-' + id, names: { en }, setting, variant, hero, cast, level: o.level || 2, mirror: !!o.mirror, seed: o.seed, heroScale: o.heroScale, scale: o.scale });
const SCENES = [];
for (const b of ['b1', 'b2', 'b3', 'b4', 'b5', 'b6']) {
  try { SCENES.push(...require('./scenes-' + b + '.js')(Sc)); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
}
// cast swaps (tools/fdx-diversify.js): shared drawings replaced so no two scenes overlap past qa/fdx-distinct.js
{ let SW = {}; try { SW = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'cast-swaps.json'), 'utf8')); } catch (e) { SW = {}; }
  for (const s of SCENES) { const m = SW[s.id]; if (m) s.cast = s.cast.map((c) => { const k = typeof c === 'string' ? c : c.src; return m[k] ? (typeof c === 'string' ? m[k] : { ...c, src: m[k] }) : c; }); } }
// enrichment (data/fdx/enrich.json): the sparsest scenes gain three drawings that belong in their setting
{ let EN = {}; try { EN = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'enrich.json'), 'utf8')); } catch (e) { EN = {}; }
  for (const s of SCENES) { const add = EN[s.id]; if (Array.isArray(add)) s.cast = [...s.cast, ...add]; } }
// the level follows the drawing count (cast + hero), never the authored guess: L1 ≤ 6 · L2 7-9 · L3 ≥ 10
for (const s of SCENES) { const n = s.cast.length + 1; s.level = n <= 6 ? 1 : n >= 10 ? 3 : 2; }
module.exports = { SCENES, Sc };
