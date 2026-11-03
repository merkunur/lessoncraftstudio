/**
 * K-511 — Sort by a Rule (Sorting maker 2026-11-02, NEW-TEMPLATES §24 T4): two groups named by an everyday rule — "you can
 * eat it / you cannot" or "moves by itself / needs a push or a pull" — and a strip of pictures the child sorts into them
 * with a line (L.K.5.a, sorting by a property instead of by a picture's kind).
 *
 * The rules' pictures are hand-reviewed per-sheet lists (data/sorting/can-you-eat-it.json, data/sorting/moves-by-itself.json):
 * every picture was opened on a contact sheet, and anything a child could fairly put in either group (a drink, a spoon, a
 * mushroom; a motor scooter, a kite) is not on them. The unreviewed attribute table is never read (ENGINES sorting-Q1 tier
 * 3). The sort itself is the science-category-sort page every list sort uses (lines to labelled bins, key, screen).
 * Levels: 1 eat or not, three pictures a group · 2 moves by itself or not, four a group · 3 six a group, the rule
 * alternating by copy (copy 1 eat, copy 2 moves …), the eat sort with things from the supermarket that are not food.
 */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');

const EAT = require('../../data/sorting/can-you-eat-it.json');
const MOVES = require('../../data/sorting/moves-by-itself.json');
const D = { 1: { perBin: 3, rule: 'eat' }, 2: { perBin: 4, rule: 'moves' }, 3: { perBin: 6, rule: 'copy' } };
const I18N = { en: { title: 'Sort by a Rule', instruction: 'Read the names of the two groups. Draw a line from each picture to the group it belongs to.' } };

const base = makeScienceCategorySort({ id: 'K-511', slug: 'sort-by-a-rule', data: EAT, i18n: I18N });

module.exports = {
  ...base,
  id: 'K-511',
  slug: 'sort-by-a-rule',
  gradeBand: 'K',
  exerciseType: 'sorting-categories',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: I18N,

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2];
    const copy = Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
    const rule = d.rule === 'copy' ? (copy % 2 ? 'eat' : 'moves') : d.rule;
    const data = rule === 'eat' ? EAT : MOVES;
    const sort = makeScienceCategorySort({
      id: 'K-511', slug: 'sort-by-a-rule', data,
      difficulty: { [difficulty]: { perBin: d.perBin } },
      i18n: I18N,
    });
    const out = sort.build({ difficulty, locale }, ctx);
    out.meta = Object.assign({}, out.meta, { rule });
    return out;
  },
};
