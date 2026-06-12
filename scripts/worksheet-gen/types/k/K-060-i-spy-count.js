/** K-060 — I-spy counting: find and count each kind in the busy scene. */
'use strict';
const { makeSceneCountType } = require('../_shared/scene-count.js');

module.exports = makeSceneCountType({
  id: 'K-060', slug: 'i-spy-counting', mode: 'legend',
  // denser than K-013: more kinds, bigger counts — the "look closely" variant
  difficulty: {
    1: { nouns: 3, minN: 3, maxN: 6 },
    2: { nouns: 4, minN: 3, maxN: 8 },
    3: { nouns: 5, minN: 4, maxN: 9 },
  },
  i18n: { en: { title: 'I Spy…', instruction: 'Look closely! Count each kind and write the number.' } },
});
