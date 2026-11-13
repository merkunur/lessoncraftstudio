/** G2-509 — Story Problems Within 100: Bar Model (Year pages Q, 2026-11-13; 2.OA.A.1 one-step problems with the unknown
 *  in every position). Two-digit numbers, stories told in a place; a bar model, an equation frame and the answer.
 *  Level 1 the end is asked (some come, some go), the first story worked · 2 the end, then the change · 3 the change or a part is asked.
 *  See types/_shared/story-model.js. */
'use strict';
const { makeStoryModelType } = require('../_shared/story-model.js');
module.exports = makeStoryModelType({
  id: 'G2-509', slug: 'story-problems-bar-model', gradeBand: 'G2',
  levels: { 1: { max: 100, kinds: ['add', 'sub', 'add'], worked: true }, 2: { max: 100, kinds: ['add', 'addChange', 'subChange'] }, 3: { max: 100, kinds: ['addChange', 'subChange', 'part'] } },
  i18n: { en: { title: 'Story Problems Within 100: Bar Model', instruction: 'Read each story. In the bar model, write the two numbers you know and a question mark for the number you need. Write an equation. Then write the answer.' } },
});
