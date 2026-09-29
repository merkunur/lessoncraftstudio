/** K-245 — Wavy Lines and Curves. nt20-VAR variation of K-236 (same family: pre-writing). */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
module.exports = {
  ...base,
  id: 'K-245',
  slug: 'prewriting-waves-bumps',
  // Level Set 2026-09-29: the published page is level 2; levels 1 / 3 FADE the trace (level audit)
  difficulty: { 1: { ...{"reps":4,"n":4,"laneH":100,"strokes":["wave","bumps","cups","loops"]}, reps: 3, laneH: 120, fade: 'all' }, 2: {"reps":4,"n":4,"laneH":100,"strokes":["wave","bumps","cups","loops"]}, 3: { ...{"reps":4,"n":4,"laneH":100,"strokes":["wave","bumps","cups","loops"]}, fade: 'fade' } },
  i18n: { en: { title: "Wavy Lines and Curves", instruction: "Trace each line with your pencil. Start at the orange dot and follow the arrow." } },
};
