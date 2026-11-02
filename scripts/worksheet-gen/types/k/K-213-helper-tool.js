/** K-213 — Match each community helper to the tool they use. SCIENCE curated-pair match. */
'use strict';
const { makeSciencePairMatch } = require('../_shared/science-pair-match.js');
module.exports = makeSciencePairMatch({
  id: 'K-213', slug: 'community-helpers-and-tools', gradeBand: 'K', exerciseType: 'science-match',
  data: require('../../data/science/helper-tool.json'),
  // real levels (2026-11-02; level 2 is the published page): level 1 four helpers and FIVE tools (one is left over), level 3 six
  difficulty: { 1: { pairs: 4, extra: 1 }, 2: { pairs: 5 }, 3: { pairs: 6 } },
  i18n: { en: { title: 'Community Helpers and Their Tools', instruction: 'Draw a line from each helper to the tool they use.' } },
});
