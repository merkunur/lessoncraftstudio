/** G1-567 — Find the Missing Part (Year pages Q, 2026-11-13; 1.OA.A.1 put together / take apart with an addend unknown).
 *  Put-together stories in which the whole and one part are told; a bar model, an equation frame and the answer.
 *  Level 1 within 10, the first story worked · 2 within 20 · 3 whole tens within 100 (70 in all, 30 in the red box:
 *  two-digit numbers with regrouping are grade 2 work, native reader 2026-11-13). See types/_shared/story-model.js. */
'use strict';
const { makeStoryModelType } = require('../_shared/story-model.js');
module.exports = makeStoryModelType({
  id: 'G1-567', slug: 'find-the-missing-part', gradeBand: 'G1',
  levels: { 1: { max: 10, kinds: ['part', 'part', 'part'], worked: true }, 2: { max: 20, kinds: ['part', 'part', 'part'] }, 3: { max: 100, tens: true, kinds: ['part', 'part', 'part'] } },
  i18n: { en: { title: 'Find the Missing Part: Story Problems', instruction: 'Read each story. In the bar model, write the two numbers you know and a question mark for the missing part. Write an equation. Then write the answer.' } },
});
