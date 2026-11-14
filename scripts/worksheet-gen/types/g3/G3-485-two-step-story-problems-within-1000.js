/**
 * G3-485 — Two-Step Story Problems Within 1,000 (Year pages T, 2026-11-14; 3.OA.D.8 two-step problems with adding and
 * subtracting; de "Sachaufgaben mit zwei Rechenschritten bis 1000", sv "textuppgifter i två steg 0–1000"). A face of
 * the two-step engine (G2-489) with three-digit numbers: the four step pairs (+ then −, − then +, + then +, − then −)
 * are told where hundreds of one thing are believable (a store with a delivery truck, a market, workers who pack, a
 * truck that delivers: data/word-problems/two-step-store-frames.json). Nobody is named. Every printed number has
 * three digits, both results stay from 100 to 999, and no two stories of a page share a number or an answer.
 * Levels: 1 two stories with whole tens (340 + 250), the two steps given as number sentences with boxes · 2 three
 * stories with any three-digit numbers, the steps given · 3 three stories, one box for the answer (the child finds the
 * steps and works in the dotted space).
 * Text only (no picture is counted); printed page only.
 */
'use strict';
const base = require('../g2/G2-489-two-step-word-problems.js');

module.exports = {
  ...base,
  id: 'G3-485',
  slug: 'two-step-story-problems-within-1000',
  gradeBand: 'G3',
  interactive: false,
  qaRetries() { return [{ wpFit: 1 }, { wpFit: 2 }]; },   // a page that runs past the footer is rebuilt one step tighter
  difficulty: {
    1: { n: 2, max: 999, steps: true, font: 21, place: true, store: true, tens: true },
    2: { n: 3, max: 999, steps: true, font: 19, place: true, store: true },
    3: { n: 3, max: 999, steps: false, font: 20, place: true, store: true },
  },
  i18n: { en: { title: 'Two-Step Story Problems Within 1,000', instruction: 'Read each story. Do the first step, then the second step. Write the numbers in the boxes.' } },
};
