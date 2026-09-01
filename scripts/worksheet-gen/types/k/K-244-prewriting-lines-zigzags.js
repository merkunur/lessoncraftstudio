/** K-244 — Straight Lines and Zigzags. nt20-VAR variation of K-236 (same family: pre-writing). */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
module.exports = {
  ...base,
  id: 'K-244',
  slug: 'prewriting-lines-zigzags',
  difficulty: { 1: {"reps":4,"n":4,"laneH":100,"strokes":["line","zigzag","mountains","castle"]}, 2: {"reps":4,"n":4,"laneH":100,"strokes":["line","zigzag","mountains","castle"]}, 3: {"reps":4,"n":4,"laneH":100,"strokes":["line","zigzag","mountains","castle"]} },
  i18n: { en: { title: "Straight Lines and Zigzags", instruction: "Trace each line with your pencil. Start at the orange dot and follow the arrow." } },
};
