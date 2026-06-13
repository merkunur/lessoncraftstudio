/** K-232 — Match the two pictures that rhyme. LITERACY, reuses science pair-match. */
'use strict';
const { makeSciencePairMatch } = require('../_shared/science-pair-match.js');
module.exports = makeSciencePairMatch({
  id: 'K-232', slug: 'rhyming-pairs', gradeBand: 'K', exerciseType: 'phonological-awareness',
  data: require('../../data/literacy/rhyming-pairs.json'),
  i18n: { en: { title: 'Rhyming Pairs', instruction: 'Draw a line between the two pictures that rhyme.' } },
});
