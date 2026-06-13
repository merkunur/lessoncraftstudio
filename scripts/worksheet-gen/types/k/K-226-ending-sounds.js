/** K-226 — Write the ending sound (final grapheme) of each picture. LITERACY sound-match. */
'use strict';
const { makeLitSoundMatch } = require('../_shared/lit-sound-match.js');
module.exports = makeLitSoundMatch({
  id: 'K-226', slug: 'ending-sounds', gradeBand: 'K', exerciseType: 'phonological-awareness', mode: 'ending',
  data: require('../../data/literacy/ending-sounds.json'),
  i18n: { en: { title: 'Ending Sounds', instruction: 'Write the letter that each picture ends with.' } },
});
