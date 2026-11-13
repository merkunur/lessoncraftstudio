/** G1-568 — What Happened in the Middle? (Year pages Q, 2026-11-13; 1.OA.A.1 add to / take from with the change unknown).
 *  Change stories in which the start and the end are told and the change is asked; a bar model, an equation frame and
 *  the answer. Level 1 within 10, the first story worked · 2 within 20 · 3 whole tens within 100.
 *  See types/_shared/story-model.js. */
'use strict';
const { makeStoryModelType } = require('../_shared/story-model.js');
module.exports = makeStoryModelType({
  id: 'G1-568', slug: 'what-happened-in-the-middle', gradeBand: 'G1',
  levels: { 1: { max: 10, kinds: ['addChange', 'subChange', 'addChange'], worked: true }, 2: { max: 20, kinds: ['addChange', 'subChange', 'subChange'] }, 3: { max: 100, tens: true, kinds: ['addChange', 'subChange', 'addChange'] } },
  i18n: { en: { title: 'What Happened in the Middle? Story Problems', instruction: 'Read each story. In the bar model, write the two numbers you know and a question mark for the missing number. Write an equation. Then write the answer.' } },
});
