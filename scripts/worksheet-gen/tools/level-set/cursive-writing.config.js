/** Level Set config — Cursive Writing (G2-377 + G2-384/385/386/387 + G3-401), 2026-09-28. PDF ONLY. */
'use strict';
// sv + fi refuse the whole type (no joined national school script) — every other locale publishes all six faces
const LOCALES = new Set(['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'da', 'no']);
module.exports = {
  prefix: 'cur',
  themeless: true,
  interactive: false,       // handwriting: the pencil is the point — PDF only, no screen version, no answer key
  titleMax: 80,   // noindex decks; de group titles name 4 letters + the script (e.g. "… p, j, y und v in Vereinfachter Ausgangsschrift")
  maxCopies: 5,
  maxShared: 2,
  seeds: 60,
  // one copy per GROUP of the alphabet (every group, every script the locale teaches): lowercase lesson groups in the
  // country's teaching order; capitals in alphabet groups. 'skipFirstAtCore' = group 1 at level 2 IS the published page
  groupFaces: { 'G2-377': 'skipFirstAtCore', 'G2-384': true },
  note: 'Level Set 2026-09-28: Cursive Writing (G2-377 + 5 faces), PDF only. Letters and capitals cover the WHOLE alphabet (lowercase in each country\'s lesson groups, capitals in alphabet groups, de in both scripts); levels change the task (bigger letters / traced twice / baseline joins / short words / four pairs / a model under every sentence; harder: one chain, names and words printed not traced, top joins, long sentences without a model). Native content by 9 native panels. Visible to teachers, never indexed.',
  faces: {
    'G2-377': { levels: [2, 1, 3] },
    'G2-384': { levels: [2, 1, 3] },
    'G2-385': { levels: [2, 1, 3] },
    'G2-386': { levels: [2, 1] },
    'G2-387': { levels: [2, 1] },
    'G3-401': { levels: [2, 1, 3] },
  },
  include: (loc) => LOCALES.has(loc),
};
