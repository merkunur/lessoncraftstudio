/** G2-518 — Length Story Problems (length-stories factory; Year pages AB, 2026-11-14; 2.MD.B.5) */
'use strict';
const { makeLengthStoriesType } = require('../_shared/length-stories.js');
module.exports = makeLengthStoriesType({
  id: 'G2-518', slug: 'length-story-problems', gradeBand: 'G2',
  i18n: { en: { title: "Length Story Problems", instruction: "Read each story. In the bar model, write the two lengths you know and a question mark for the length you need to find. The longest length goes in the top bar. Write an equation. Then write the answer." } },
});
