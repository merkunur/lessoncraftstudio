/** K-059 — Find and circle all of one object in the scene. */
'use strict';
const { makeSceneCountType } = require('../_shared/scene-count.js');

module.exports = makeSceneCountType({
  id: 'K-059', slug: 'find-and-circle', mode: 'find',
  i18n: { en: { title: 'Find and Circle', instruction: 'Find every picture like the one in the box. Circle them all.' } },
});
