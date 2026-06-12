/** K-013 — Count by category: mixed scene, write each count. */
'use strict';
const { makeSceneCountType } = require('../_shared/scene-count.js');

module.exports = makeSceneCountType({
  id: 'K-013', slug: 'count-by-category', mode: 'legend',
  i18n: { en: { title: 'Count Each Kind', instruction: 'Count each kind of picture. Write how many you find.' } },
});
