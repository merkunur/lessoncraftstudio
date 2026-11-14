/** G2-510 — Story Problems Within 100: Find the Start (Year pages R, 2026-11-14; 2.OA.A.1 one-step problems with the
 *  start unknown). Two-digit numbers, stories told in a place; a bar model, an equation frame and the answer.
 *  Level 1 whole tens, the first story worked · 2 any two-digit numbers · 3 the start or the change is asked (the
 *  child has to read which).
 *  See types/_shared/story-model.js. */
'use strict';
const { makeStoryModelType } = require('../_shared/story-model.js');
module.exports = makeStoryModelType({
  id: 'G2-510', slug: 'story-problems-find-the-start', gradeBand: 'G2',
  levels: { 1: { max: 100, tens: true, kinds: ['addStart', 'subStart', 'addStart'], worked: true }, 2: { max: 100, kinds: ['addStart', 'subStart', 'subStart'] }, 3: { max: 100, kinds: ['addStart', 'subStart', 'addChange'] } },
  i18n: { en: { title: 'Find the Start: Story Problems Within 100', instruction: 'Read each story. In the bar model, write the two numbers you know and a question mark for the number you need. Write an equation. Then write the answer.' } },
});
