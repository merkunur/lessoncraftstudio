/**
 * G2-511 — Two-Step Story Problems Within 100 (Year pages S, 2026-11-14; 2.OA.A.1 two-step problems within 100; de
 * "Sachaufgaben mit zwei Rechenschritten", sv "räknehändelser i två steg"). A face of the two-step engine (G2-489) with
 * two-digit numbers: the four step pairs (+ then −, − then +, + then +, − then −) are told in a PLACE (a box, a shelf,
 * a table: data/word-problems/two-step-place-frames.json), with things that come by the dozen, because 53 forks belong
 * to nobody. Every printed number is two-digit, both results stay from 10 to 100, no two stories of a page share a
 * number or an answer, and a child is named in one story only.
 * Levels: 1 two stories with whole tens, the two steps given as number sentences with boxes · 2 three stories with any
 * two-digit numbers, the steps given · 3 three stories, one box for the answer (the child finds the steps).
 * Text only (no picture is counted); printed page only.
 */
'use strict';
const base = require('./G2-489-two-step-word-problems.js');

module.exports = {
  ...base,
  id: 'G2-511',
  slug: 'two-step-story-problems-within-100',
  interactive: false,
  difficulty: {
    1: { n: 2, max: 100, steps: true, font: 21, place: true, tens: true },
    2: { n: 3, max: 100, steps: true, font: 19, place: true },
    3: { n: 3, max: 100, steps: false, font: 20, place: true },
  },
  i18n: { en: { title: 'Two-Step Story Problems Within 100', instruction: 'Read each story. Do the first step, then the second step. Write the numbers in the boxes.' } },
};
