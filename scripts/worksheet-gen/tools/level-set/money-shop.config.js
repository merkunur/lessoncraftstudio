/** Level Set config — Counting Money, shop faces (G2-276 Shopping Math + 7 variations), 2026-10-05. PDF + interactive
 *  + key. Only themes a shop sells (every picture opened on contact sheets; non-merchandise and look-alike pictures
 *  refused in G2-276 SHOP_REFUSALS). The published theme of each face (read from the live manifests 2026-10-05, the
 *  same in all 11 locales) is skipped at level 2. */
'use strict';
const PUB = { 'G2-276': 'fruits', 'G2-289': 'animals', 'G2-290': 'vehicles', 'G2-291': 'toys', 'G2-292': 'fruits', 'G2-293': 'animals', 'G2-294': 'vehicles', 'G2-295': 'toys' };
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'shop',
  titleMax: 100,
  faceWideDistinct: false,   // 11 shop themes cannot give one face 15 different themes; they differ within a level
  crossFaceShare: true,      // the faces are different tasks (total / change / enough money / difference …)
  allowFewer: true,
  themeAllow: ['fruits', 'vegetables', 'toys', 'At the Supermarket', 'bakery', 'breakfast', 'desserts and sweets', 'clothing', 'accessories', 'classroom', 'music'],
  note: 'Level Set 2026-10-05: Shopping Math (G2-276 + 7 variations). The base sheet for every shop theme at 3 levels; each variation 5 themes per level. Level 1 smaller prices, level 2 the published page, level 3 bigger prices, more questions, change paid with several coins, close calls. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(Object.entries(PUB).map(([id, t]) => [id, { published: t, levels: id === 'G2-276' ? { 1: 'all', 2: 'all', 3: 'all' } : FIVE }])),
  include: () => true,
};
