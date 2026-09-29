/**
 * K-385 — Down Lines, Slants and Crosses. Level Set 2026-09-29: a NEW variation of K-236 (family pre-writing).
 * The pre-writing marks the horizontal stroke set lacks, in developmental order: vertical lines (rain),
 * plus signs, slants / and \, and X crosses — rows of short separate marks, each drawn from its top.
 * Levels fade the trace like every pre-writing page: 1 every repetition dashed · 2 model + dashed ·
 * 3 model, one dashed trace, then start dots only. No published page (all levels are new).
 */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
const S = { reps: 4, n: 4, laneH: 100, strokes: ['rain', 'plus', 'slash', 'backslash', 'cross'] };
module.exports = {
  ...base,
  id: 'K-385',
  slug: 'prewriting-vertical-slanted-lines',
  difficulty: { 1: { ...S, reps: 3, laneH: 120, fade: 'all' }, 2: { ...S, fade: 'core' }, 3: { ...S, fade: 'fade' } },
  i18n: { en: { title: 'Down Lines, Slants and Crosses', instruction: 'Trace each line with your pencil. Start at the orange dot and follow the arrow.' } },
};
