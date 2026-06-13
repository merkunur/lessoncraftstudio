/** K-221 — Write the beginning sound (initial grapheme) of each picture. LITERACY sound-match. */
'use strict';
const { makeLitSoundMatch } = require('../_shared/lit-sound-match.js');
module.exports = makeLitSoundMatch({
  id: 'K-221', slug: 'beginning-sounds', gradeBand: 'K', exerciseType: 'beginning-sounds', mode: 'beginning',
  data: require('../../data/literacy/beginning-sounds.json'),
  i18n: { en: { title: 'Beginning Sounds', instruction: 'Write the letter that each picture begins with.' } },
});
