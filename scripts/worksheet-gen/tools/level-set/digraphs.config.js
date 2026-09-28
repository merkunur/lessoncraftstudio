/** Level Set config — Digraphs (G1-380 + K-378 / G1-392 / G1-393 / G1-394 / G2-372), 2026-09-28. PDF + interactive. */
'use strict';
// the faces each locale PUBLISHES (seo-landing corpus); es / it / sv / da / no refuse the family (design §1)
const PUBLISHED = {
  en: ['G1-380', 'K-378', 'G1-392', 'G1-393', 'G1-394', 'G2-372'],
  de: ['G1-380', 'K-378', 'G1-392', 'G1-393', 'G1-394', 'G2-372'],
  fr: ['G1-380', 'K-378', 'G1-392', 'G1-393', 'G1-394', 'G2-372'],
  fi: ['G1-380', 'K-378', 'G1-392', 'G1-393', 'G1-394', 'G2-372'],
  pt: ['G1-380', 'K-378', 'G1-392', 'G1-393', 'G2-372'],
  nl: ['G1-380', 'K-378', 'G1-392', 'G1-393', 'G2-372'],
};
const ALL = 'skipFirstAtCore';
module.exports = {
  prefix: 'dig',
  themeless: true,
  titleMax: 80,
  maxCopies: 5,
  maxShared: 2,
  seeds: 1,
  // one copy per TEAM SET (group 1 = the published teams, then the native panels' sets); at level 2 the
  // published set is the published page itself, so it is skipped there
  groupFaces: { 'G1-380': ALL, 'K-378': ALL, 'G1-392': ALL, 'G1-393': ALL, 'G1-394': ALL, 'G2-372': ALL },
  note: 'Level Set 2026-09-28: Digraphs (G1-380 + 5 faces). New letter-team sets by 6 native panels (every picture opened); levels change the task (two teams instead of three, fewer pictures, four words, three sentences; harder: ten wires with foil letters in the word, eight pictures, the team inside or at the end, four teams hidden inside the word). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: {
    'G1-380': { levels: [2, 1, 3] },
    'K-378': { levels: [2, 1, 3] },
    'G1-392': { levels: [2, 1, 3] },
    'G1-393': { levels: [2, 1] },
    'G1-394': { levels: [2, 3] },
    'G2-372': { levels: [2, 1] },
  },
  include: (loc, face) => (PUBLISHED[loc] || []).includes(face),
};
