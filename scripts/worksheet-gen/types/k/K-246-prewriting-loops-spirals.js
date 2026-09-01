/** K-246 — Loops, Eights and Spirals. nt20-VAR variation of K-236 (same family: pre-writing). */
'use strict';
const base = require('./K-236-prewriting-strokes.js');
module.exports = {
  ...base,
  id: 'K-246',
  slug: 'prewriting-loops-spirals',
  difficulty: { 1: {"reps":4,"n":4,"laneH":100,"strokes":["loops","eight","spiral","wave"]}, 2: {"reps":4,"n":4,"laneH":100,"strokes":["loops","eight","spiral","wave"]}, 3: {"reps":4,"n":4,"laneH":100,"strokes":["loops","eight","spiral","wave"]} },
  i18n: { en: { title: "Loops, Eights and Spirals", instruction: "Trace each line with your pencil. Start at the orange dot and follow the arrow." } },
};
