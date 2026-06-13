/** K-227 — Write the middle (medial vowel) sound of each picture. LITERACY sound-match. */
'use strict';
const { makeLitSoundMatch } = require('../_shared/lit-sound-match.js');
module.exports = makeLitSoundMatch({
  id: 'K-227', slug: 'middle-sounds', gradeBand: 'K', exerciseType: 'phonological-awareness', mode: 'middle',
  data: require('../../data/literacy/middle-sounds.json'),
  i18n: { en: { title: 'Middle Sounds', instruction: 'Write the vowel you hear in the middle of each word.' } },
});
