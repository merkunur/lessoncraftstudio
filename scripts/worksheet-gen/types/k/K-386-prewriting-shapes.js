/**
 * K-386 — Circles, Squares and More Shapes. Level Set 2026-09-29: a NEW variation of K-236 (family
 * pre-writing). The pre-writing shapes: circles (from the top, round to the left), squares (top-left
 * corner, down first), triangles and diamonds (from the top point) — rows of small closed shapes.
 * Levels fade the trace like every pre-writing page. No published page (all levels are new).
 */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
const S = { reps: 4, n: 4, laneH: 100, strokes: ['circles', 'squares', 'triangles', 'diamonds'] };
module.exports = {
  ...base,
  id: 'K-386',
  slug: 'prewriting-shapes',
  difficulty: { 1: { ...S, reps: 3, laneH: 120, fade: 'all' }, 2: { ...S, fade: 'core' }, 3: { ...S, fade: 'fade' } },
  i18n: { en: { title: 'Circles, Squares and More Shapes', instruction: 'Trace each shape with your pencil. Start at the orange dot and follow the arrow.' } },
};
