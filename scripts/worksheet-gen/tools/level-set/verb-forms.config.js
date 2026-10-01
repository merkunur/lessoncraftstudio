/** Level Set config — Verb Forms (G2-317 + G2-334 / G2-335 / G2-336 / G2-337 / G2-338), 2026-10-01. PDF + interactive + key. */
'use strict';
const ALL = ['G2-317', 'G2-334', 'G2-335', 'G2-336', 'G2-337', 'G2-338'];
module.exports = {
  prefix: 'vfm',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 3,          // a new copy shares at most a THIRD of its verbs / sentences (≤ 3) with any other copy of its level
  shareFrac: 1 / 3,
  seeds: 40,
  allowFewer: true,      // a thin pool gives fewer copies, never a filler
  note: 'Level Set 2026-10-01: Verb Forms (G2-317 + 5 faces). New sentences in all languages for the irregular verbs (be / have / do / go, sein / haben, être / avoir …): the irregular-verbs pages keep their verbs and ask them in new sentences. Levels change the task: verb tables 1 table with 3 given forms / 2 tables / 2 tables with no given form and no hint; match 4 verbs (1 table) / 6 / 7 verbs; sentences 4 / 6 / 8; irregular verbs 3 given forms and 2 sentences / 1 given / none and 4 sentences; choose the form 6 rows of 2 forms / 8 of 3 / 9 of 3; find the verb 6 / 8 / 9 sentences. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  // half new on every face: the verb pools are 20-32 verbs, a page asks 6-16 things (a third would leave most levels at 1-3 copies)
  // the irregular core (G2-336) repeats its two to five verbs by design: only its sentences count, half may repeat;
  // match draws from a small regular pool (nl 7 verbs): half may repeat
  faces: Object.fromEntries(ALL.map((id) => [id, (id === 'G2-336' || id === 'G2-334') ? { levels: [2, 1, 3], shareFrac: 0.5, maxShared: 4 } : ['G2-335', 'G2-337', 'G2-338'].includes(id) ? { levels: [2, 1, 3], shareFrac: 0.5, maxShared: 5 } : { levels: [2, 1, 3], shareFrac: 0.5, maxShared: 4 }])),
  include: (loc, face) => !(loc === 'nl' && face === 'G2-336'),   // the nl panel refusal (zijn / hebben: three distinct present forms)
};
