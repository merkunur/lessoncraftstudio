/** G3-632 — Egen undersökning: från fråga till diagram (Batch E-1, Daily Teaching System Stage E, 2026-11-25; Swedish only, new:samband-slump-statistik). e1-math.js mode 'e1-undersokning'. */
'use strict';
const { makeE1Type } = require('../_shared/e1-math.js');
module.exports = makeE1Type({
  id: 'G3-632', slug: 'my-own-survey-from-question-to-graph', mode: 'e1-undersokning', exerciseType: 'graphing-data', gradeBand: 'G3',
  i18n: { en: { title: "My Own Survey: From Question to Graph", instruction: "Write your question and your answer choices. Ask the class and fill in the table with tally marks and numbers. Draw a bar graph with a title, the axes and a scale where one step is 2. Write what your graph shows." } },
});
