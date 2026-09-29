/** Level Set config — Prefixes, Suffixes and Root Words (G2-359 + G1-397 / G2-375 / G2-376 / G3-398 / G3-399), 2026-09-29. PDF + interactive + key. */
'use strict';
// the pages each locale PUBLISHES (the recorded refusals: es/fr who-does-it, it root-word, fi prefix-key)
const ALL = ['G2-359', 'G1-397', 'G2-375', 'G2-376', 'G3-398', 'G3-399'];
const REFUSED = { es: ['G3-398'], fr: ['G3-398'], it: ['G2-375'], fi: ['G2-376'] };
module.exports = {
  prefix: 'wpt',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 3,          // a new copy shares at most a THIRD of its families / pictures / rows (≤ 3) with any other copy of its level — two thirds new
  shareFrac: 1 / 3,
  seeds: 40,
  note: 'Level Set 2026-09-29: Prefixes, Suffixes and Root Words (G2-359 + 5 faces). Levels change the task: walls 2×3 derived with pictures / 2×5 / 3×4 mixed; picture word 2 / 3 / 4 words per picture; find the root 6 derived sets / 9 / 9 without the worked example; prefix key 2 / 3 / 4 prefixes; person word regular endings / mixed / mostly other endings; words in sentences 1 block / 2 / the two blocks\' words in ONE mixed strip. Native panels roughly doubled every bank. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  // person words: the portraits bound the pool (~13 built person words per locale) — a copy shares at most half its people
  faces: Object.fromEntries(ALL.map((id) => [id, id === 'G3-398' ? { levels: [2, 1, 3], shareFrac: 0.5, maxShared: 4 } : id === 'G2-376' ? { levels: [2, 1, 3], shareFrac: 0.4 } : { levels: [2, 1, 3] }])),
  include: (loc, face) => !(REFUSED[loc] || []).includes(face),
};
