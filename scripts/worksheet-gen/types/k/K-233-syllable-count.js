/** K-233 — Write how many syllables each picture's word has. LITERACY sound-match (digit answer). */
'use strict';
const { makeLitSoundMatch } = require('../_shared/lit-sound-match.js');
module.exports = makeLitSoundMatch({
  id: 'K-233', slug: 'count-the-syllables', gradeBand: 'K', exerciseType: 'phonological-awareness', mode: 'syllable-count',
  data: require('../../data/literacy/syllable-count.json'),
  i18n: { en: { title: 'Count the Syllables', instruction: 'Write how many syllables you hear in each word.' } },
});
