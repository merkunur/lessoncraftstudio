/** G1-572 — Draw, Solve, Answer (Year pages R, 2026-11-14; 1.OA.A.1 "by using objects, drawings, and equations"; sv "Rita,
 *  räkna, svara", de "Zeichnen, rechnen, antworten"). Three story problems a page; under each a large empty box to draw
 *  the story in (no picture is printed: the drawing is the child's work), an equation frame and the answer box.
 *  Level 1 within 10, some come or some go · 2 the larger amount is 11 to 20 · 3 within 20, the change is asked in two
 *  of the stories (the drawing is what finds it).
 *  The same factory as the bar-model pages (types/_shared/story-model.js) with a drawing box in the place of the bar. */
'use strict';
const { makeStoryModelType } = require('../_shared/story-model.js');
module.exports = makeStoryModelType({
  id: 'G1-572', slug: 'draw-solve-answer', gradeBand: 'G1', draw: true,
  levels: { 1: { max: 10, kinds: ['add', 'sub', 'add'] }, 2: { max: 20, kinds: ['add', 'sub', 'sub'] }, 3: { max: 20, kinds: ['addChange', 'subChange', 'add'] } },
  i18n: { en: { title: 'Draw, Solve, Answer: Story Problems Within 20', instruction: 'Read each story. Draw it in the box. Write the equation. Then write the answer.' } },
});
