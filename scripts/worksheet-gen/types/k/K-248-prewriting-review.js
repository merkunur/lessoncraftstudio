/** K-248 — Pencil Path Review. nt20-VAR variation of K-236 (same family: pre-writing). */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
module.exports = {
  ...base,
  id: 'K-248',
  slug: 'prewriting-review',
  // Level Set 2026-09-29: the published page is level 2; levels 1 / 3 FADE the trace (level audit)
  difficulty: { 1: { ...{"reps":4,"n":4,"laneH":100,"strokes":["line","wave","zigzag","cups","bumps"]}, reps: 3, laneH: 120, fade: 'all' }, 2: {"reps":4,"n":4,"laneH":100,"strokes":["line","wave","zigzag","cups","bumps"]}, 3: { ...{"reps":4,"n":4,"laneH":100,"strokes":["line","wave","zigzag","cups","bumps"]}, fade: 'fade' } },
  i18n: { en: { title: "Pencil Path Review", instruction: "Trace each line with your pencil. Start at the orange dot and follow the arrow." } },
};
