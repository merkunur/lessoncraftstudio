/** G1-106 — Make 10! (frame-counting factory, mode make-10) */
'use strict';
const { makeFrameCountingType } = require('../_shared/frame-counting.js');
module.exports = makeFrameCountingType({
  id: 'G1-106', slug: 'making-10', mode: 'make-10', gradeBand: 'G1',
  i18n: { en: { title: 'Make 10!', instruction: 'How many more dots to make 10? Write the missing number.' } },
});
