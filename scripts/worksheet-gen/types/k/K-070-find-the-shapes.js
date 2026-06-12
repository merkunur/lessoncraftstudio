/** K-070/071 — Find and circle one shape kind in the shape scene. */
'use strict';
const { makeSceneCountType } = require('../_shared/scene-count.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
module.exports = withFixedTheme(makeSceneCountType({
  id: 'K-070', slug: 'find-the-shape', mode: 'find',
  i18n: { en: { title: 'Shape Hunt', instruction: 'Find every shape like the one in the box. Circle them all.' } },
}), 'shapes');
