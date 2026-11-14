/**
 * G1-571 — Story Problems Within 20: Write the Question (Year pages R, 2026-11-14; 1.OA.A.1; sv "Hitta på en egen
 * fråga", de "Fragen zu Rechengeschichten finden"). Three short stories a page with numbers within 20 and the three
 * lines of G2-506 under each (question, equation, answer); the child makes up the question. The same engine as G2-506
 * (types/g2/G2-506-story-problems-three-lines.js) with small numbers: the stories are the bank's own, told in a place or
 * in a child's hands, with any thing of the reviewed list.
 * Level 1 within 10, two questions to write (one is printed, as the model) · 2 within 20, all three questions to write ·
 * 3 within 20, one story compares two amounts, all three questions to write (a compare story takes more than one
 * honest question: that is the point of the lesson; the key shows the bank's question as one that fits).
 * No two stories of a page share an answer or a pair of numbers, no answer is a number the story prints. Printed page only.
 */
'use strict';
const base = require('../g2/G2-506-story-problems-three-lines.js');

module.exports = {
  ...base,
  id: 'G1-571',
  slug: 'story-problems-write-the-question',
  gradeBand: 'G1',
  difficulty: {
    1: { max: 10, kinds: ['add', 'sub', 'add'], missing: 2 },
    2: { max: 20, kinds: ['add', 'sub', 'add'], missing: 3 },
    3: { max: 20, kinds: ['add', 'sub', 'compare'], missing: 3, anyQuestion: true },
  },
  i18n: { en: { title: 'Write the Question: Story Problems Within 20', instruction: 'Read each story. If the question is missing, write a question you can answer by adding or subtracting. Then write the equation and the answer.' } },
};
