/**
 * G3-486 — Two-Step Story Problems: Multiply and Divide (Year pages T, 2026-11-14; 3.OA.D.8 two-step problems with
 * the four operations; de "Sachaufgaben mit zwei Rechenschritten: mal und geteilt", sv "textuppgifter i två steg med
 * multiplikation och division"). A face of the two-step engine (G2-489): one step multiplies or divides a fact within
 * 100, the other adds or subtracts (data/word-problems/two-step-muldiv-frames.json): packs and some at home (× then +),
 * baskets and some taken out (× then −), shared into baskets and more put into one (÷ then +), two boxes shared by
 * children (+ then ÷), some kept and the rest shared (− then ÷). The five numbers of a story differ, the answer is no
 * number of the story, and no two stories of a page share an answer or a fact.
 * Levels: 1 two stories that multiply first, factors 2 to 5, the two steps given as number sentences with boxes ·
 * 2 three stories (one multiplies first, one divides first, one adds first), facts to 9 × 9, the steps given ·
 * 3 three stories of the five kinds, one box for the answer (the child finds the steps and works in the dotted space).
 * Text only (no picture is counted); printed page only.
 */
'use strict';
const base = require('../g2/G2-489-two-step-word-problems.js');

module.exports = {
  ...base,
  id: 'G3-486',
  slug: 'two-step-story-problems-multiply-and-divide',
  gradeBand: 'G3',
  interactive: false,
  qaRetries() { return [{ wpFit: 1 }, { wpFit: 2 }]; },   // a page that runs past the footer is rebuilt one step tighter
  difficulty: {
    1: { n: 2, max: 100, steps: true, font: 21, place: true, muldiv: true, easy: true, kinds: [['M1'], ['M2']] },
    2: { n: 3, max: 100, steps: true, font: 19, place: true, muldiv: true, kinds: [['M1', 'M2'], ['M3'], ['M4']] },
    3: { n: 3, max: 100, steps: false, font: 20, place: true, muldiv: true, kinds: [['M1', 'M2'], ['M3', 'M5'], ['M4', 'M5']] },
  },
  i18n: { en: { title: 'Two-Step Story Problems: Multiply and Divide', instruction: 'Read each story. Do the first step, then the second step. Write the numbers in the boxes.' } },
};
