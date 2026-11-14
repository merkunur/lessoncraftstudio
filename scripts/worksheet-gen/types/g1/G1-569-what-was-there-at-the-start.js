/** G1-569 — What Was There at the Start? (Year pages R, 2026-11-14; 1.OA.A.1 / 2.OA.A.1 add to / take from with the
 *  start unknown; sv "räknehändelser där starten saknas", de "Anfangsmenge gesucht"). Change stories in which the change
 *  and the end are told and the start is asked; a bar model, an equation frame and the answer.
 *  Level 1 within 10, the first story worked · 2 within 20 · 3 whole tens within 100.
 *  See types/_shared/story-model.js. */
'use strict';
const { makeStoryModelType } = require('../_shared/story-model.js');
module.exports = makeStoryModelType({
  id: 'G1-569', slug: 'what-was-there-at-the-start', gradeBand: 'G1',
  levels: { 1: { max: 10, kinds: ['addStart', 'subStart', 'addStart'], worked: true }, 2: { max: 20, kinds: ['addStart', 'subStart', 'subStart'] }, 3: { max: 100, tens: true, kinds: ['addStart', 'subStart', 'addStart'] } },
  i18n: { en: { title: 'How Many at the Start? Story Problems', instruction: 'Read each story. In the bar model, write the two numbers you know and a question mark for the missing number. Write an equation. Then write the answer.' } },
});
