/** K-213 — Match each community helper to the tool they use. SCIENCE curated-pair match. */
'use strict';
const { makeSciencePairMatch } = require('../_shared/science-pair-match.js');
module.exports = makeSciencePairMatch({
  id: 'K-213', slug: 'community-helpers-and-tools', gradeBand: 'K', exerciseType: 'science-match',
  data: require('../../data/science/helper-tool.json'),
  i18n: { en: { title: 'Community Helpers and Their Tools', instruction: 'Draw a line from each helper to the tool they use.' } },
});
