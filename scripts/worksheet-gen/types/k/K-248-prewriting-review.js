/** K-248 — Pencil Path Review. nt20-VAR variation of K-236 (same family: pre-writing). */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
module.exports = {
  ...base,
  id: 'K-248',
  slug: 'prewriting-review',
  difficulty: { 1: {"reps":4,"n":4,"laneH":100,"strokes":["line","wave","zigzag","cups","bumps"]}, 2: {"reps":4,"n":4,"laneH":100,"strokes":["line","wave","zigzag","cups","bumps"]}, 3: {"reps":4,"n":4,"laneH":100,"strokes":["line","wave","zigzag","cups","bumps"]} },
  i18n: { en: { title: "Pencil Path Review", instruction: "Trace each line with your pencil. Start at the orange dot and follow the arrow." } },
};
