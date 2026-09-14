'use strict';
/**
 * b3var-rows/seasons.js — the five variation faces of K-322 `seasons`
 * (design docs/worksheet-gen/b3-designs/K-322-seasons.md §3; record
 * _work/K-322-faces.md). Ids are FIXED by _records/b3var-id-allocation.json.
 * Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets
 * the base's additive `layout` knob (types/k/K-322-seasons.js `_buildFace`);
 * the base's own configs carry no `layout`, so the published base deck is
 * byte-identical (tools/b3-baseline.js). The base's d2 keys a face ignores
 * (perBin / rowLen / cols / maxAlignedPerRow / binH / rowGap …) ride along in
 * D; each face builder reads only its own keys (`tile` / `iconPx` are shared
 * names the F3 row re-sets). The family is THEMELESS (the pools are the
 * theme): `coordinate.theme:''`, `coordinate.mode` = the layout string.
 *
 *   F1 K-338  layout:'which'   4 cards: three markers of ONE season, ring its sign among the four (K)
 *   F2 K-339  layout:'wheel'   the season wheel with one given slot + a scrambled bank of three signs (K)
 *   F3 K-340  layout:'odd'     4 rows of 4 markers, cross out the one from another season (K)
 *   F4 G1-323 layout:'months'  12 months in calendar order, colour each circle by the season legend (G1)
 *   F5 K-341  layout:'tree'    OPEN-ENDED: draw the same bare tree in each of the four seasons (K)
 *
 * EN title + instruction = the bank's strings['K-338'..] verbatim
 * (data/b3/seasons.js; the gate asserts the pair is one source). F4 carries
 * `extra {gradeBand:'G1'}` (the base is K; qa/lints.js + emit/manifest.js read
 * spec.gradeBand) — its floors are the G1 ones (circle 44).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['k', 'K-338', 'seasons-which-season-is-it', 'K-322-seasons.js', 2,
    { layout: 'which', cards: 4, rows: 2, markers: 3, choices: 4, distinctSeasons: true, iconPx: 88, choicePx: 56, choiceTile: 68 },
    'Which Season Is It?', 'Look at the three pictures on each card and circle the season sign they belong to.'],
  ['k', 'K-339', 'seasons-season-wheel', 'K-322-seasons.js', 2,
    { layout: 'wheel', given: 1, tiles: 3 },
    'Season Wheel: Seasons in Order', 'One season is already on the wheel. Draw the other three signs in the empty circles in the right order.'],
  ['k', 'K-340', 'seasons-what-does-not-belong', 'K-322-seasons.js', 2,
    { layout: 'odd', rows: 4, items: 4, tile: 116, iconPx: 96, rowMin: 140 },
    'Seasons: What Does Not Belong?', 'Cross out the one picture in each row that belongs to a different season.'],
  ['g1', 'G1-323', 'seasons-months-and-seasons', 'K-322-seasons.js', 2,
    { layout: 'months', months: 12, legend: 'color', mode: 'circle', tileW: 217, colGap: 12, tileH: 88, tileMax: 128, circle: 48, namePx: 22 },
    'Months and Seasons: Color the Season', 'Color the circle next to each month in the color of its season.',
    { gradeBand: 'G1' }],
  ['k', 'K-341', 'seasons-draw-the-tree', 'K-322-seasons.js', 2,
    { layout: 'tree', figure: 'tree', caption: false },
    'Draw the Tree in Four Seasons', 'Draw what the tree looks like in each of the four seasons.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
