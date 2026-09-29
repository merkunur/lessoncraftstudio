/** K-246 — Loops, Eights and Spirals. nt20-VAR variation of K-236 (same family: pre-writing). */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
module.exports = {
  ...base,
  id: 'K-246',
  slug: 'prewriting-loops-spirals',
  // Level Set 2026-09-29: the published page is level 2; levels 1 / 3 FADE the trace (level audit)
  difficulty: { 1: { ...{"reps":4,"n":4,"laneH":100,"strokes":["loops","eight","spiral","wave"]}, reps: 3, laneH: 120, fade: 'all' }, 2: {"reps":4,"n":4,"laneH":100,"strokes":["loops","eight","spiral","wave"]}, 3: { ...{"reps":4,"n":4,"laneH":100,"strokes":["loops","eight","spiral","wave"]}, fade: 'fade' } },
  i18n: { en: { title: "Loops, Eights and Spirals", instruction: "Trace each line with your pencil. Start at the orange dot and follow the arrow." } },
};
