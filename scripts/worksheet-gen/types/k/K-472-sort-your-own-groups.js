/**
 * K-472 — Sort Into Your Own Groups (Sorting maker, 2026-11-02; ENGINES [sorting-Q1] "own labels"). The teacher names two
 * groups and chooses every picture of each group herself: tap a group's name to type it, tap a picture to choose another
 * from ANY colour picture of the library — the picture stays in the group it was chosen for. Her assignment is the answer
 * (strict scoring on her truth, A14); the maker checks only the structure: every group keeps its pictures, and a picture
 * already in the other group is refused (one picture in two groups would have two right answers).
 *
 * Until she edits it, the page is a REVIEWED two-group sort, drawn from the per-sheet lists the other sorting templates
 * use (Animals / Fruits / Vehicles, can fly or not, needs and wants, land / water / air, the food groups) — never an
 * unreviewed attribute (tier 3 is refused). A list item retired in the page's language is never drawn.
 */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
const { manifest, labelSafeNouns } = require('../../image-cache/resolve.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');

const SOURCES = [
  require('../../data/literacy/category-vocab.json'),
  require('../../data/science/can-fly-vs-cannot.json'),
  require('../../data/science/wants-vs-needs.json'),
  require('../../data/science/transportation-land-water-air.json'),
  require('../../data/science/food-groups.json'),
];
/** every two-group sort the lists hold: [source, binA, binB] */
const PAIRS = [];
for (const data of SOURCES) for (let i = 0; i < data.bins.length; i++) for (let j = i + 1; j < data.bins.length; j++) PAIRS.push([data, data.bins[i], data.bins[j]]);

const retiredIn = (it, L) => it.retired === true || (Array.isArray(it.retired) && it.retired.includes(L));
/** any colour picture of the library (never black-and-white beside colour; never a refused picture) — built once */
let _library = null;
function library() {
  if (_library) return _library;
  _library = [];
  for (const theme of Object.keys(manifest().themes).filter((t) => !/\sbw(\s+\d+)?$/i.test(t)).sort()) {
    for (const n of labelSafeNouns(theme)) if (!refusedPicture(theme, n.noun)) _library.push({ theme, noun: n.noun, vocabKey: n.vocabKey });
  }
  return _library;
}

const base = makeScienceCategorySort({ id: 'K-472', slug: 'sort-your-own-groups', data: SOURCES[0], i18n: {} });

module.exports = {
  ...base,
  id: 'K-472',
  slug: 'sort-your-own-groups',
  gradeBand: 'K',
  exerciseType: 'sorting-categories',
  themeAxis: { applicable: false },
  difficulty: { 1: { perBin: 3 }, 2: { perBin: 4 }, 3: { perBin: 5 } },
  i18n: { en: { title: "Sort Into Two Groups", instruction: "Draw a line from each picture to the group it belongs to." } },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const L = String(locale || 'en').slice(0, 2);
    const live = (data, bin) => data.items.filter((it) => it.bin === bin.key && !retiredIn(it, L)).length;
    const fits = PAIRS.filter(([data, a, b]) => live(data, a) >= d.perBin && live(data, b) >= d.perBin);
    if (!fits.length) throw new Error(`K-472: no reviewed two-group list has ${d.perBin} pictures a group in ${L}`);
    const [data, a, b] = ctx.rng.pick(fits);
    const sort = makeScienceCategorySort({
      id: 'K-472', slug: 'sort-your-own-groups',
      data: { bins: [a, b], items: data.items.filter((it) => it.bin === a.key || it.bin === b.key) },
      difficulty: this.difficulty,
      slotPool: () => library(),
      nameSlots: true,
      i18n: {},
    });
    return sort.build({ difficulty, locale }, ctx);
  },
};
