/** K-205 — Match each grown-up animal to its baby. SCIENCE curated-pair match. */
'use strict';
const { makeSciencePairMatch } = require('../_shared/science-pair-match.js');
module.exports = makeSciencePairMatch({
  id: 'K-205', slug: 'animal-babies', gradeBand: 'K', exerciseType: 'science-match',
  data: require('../../data/science/baby-animals.json'),
  i18n: { en: { title: 'Animal Babies', instruction: 'Draw a line from each grown-up animal to its baby.' } },
});
