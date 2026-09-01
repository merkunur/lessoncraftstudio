/** K-245 — Wavy Lines and Curves. nt20-VAR variation of K-236 (same family: pre-writing). */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
module.exports = {
  ...base,
  id: 'K-245',
  slug: 'prewriting-waves-bumps',
  difficulty: { 1: {"reps":4,"n":4,"laneH":100,"strokes":["wave","bumps","cups","loops"]}, 2: {"reps":4,"n":4,"laneH":100,"strokes":["wave","bumps","cups","loops"]}, 3: {"reps":4,"n":4,"laneH":100,"strokes":["wave","bumps","cups","loops"]} },
  i18n: { en: { title: "Wavy Lines and Curves", instruction: "Trace each line with your pencil. Start at the orange dot and follow the arrow." } },
};
