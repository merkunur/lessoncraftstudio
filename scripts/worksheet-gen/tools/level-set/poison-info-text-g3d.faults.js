/**
 * The planted faults of poison-info-text-g3d.js (types/_shared/info-text-g3d.js and data/literacy/info-graphics-g3.en.json):
 * [name, file, text to find, its replacement, type, level]. Every text must stand in its file exactly once (bank: at
 * least once); the poison script refuses to run otherwise, so a changed factory cannot pass with a stale list.
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // the sources ("Found in: map, text, both")
  ['the circled source keyed to the text on every question', FACTORY, "pill(SRCNAME[mode][s], s === src, key,", "pill(SRCNAME[mode][s], s === 'text', key,", 'G3-510', 1],
  ['the checked source keyed to both on every question', FACTORY, "<span data-lcs-srcopt=\"${s}\"${s === src ? ' data-lcs-ok=\"1\"' : ''}", "<span data-lcs-srcopt=\"${s}\"${s === 'both' ? ' data-lcs-ok=\"1\"' : ''}", 'G3-511', 2],
  ['the questions grouped by their source', FACTORY, "function orderOf(qs, rng) {", "function orderOf(qs, rng) {\n  return qs.slice().sort((a, b) => SRC.indexOf(a.src) - SRC.indexOf(b.src));", 'G3-511', 2],
  // the map: places, grid, rose, directions
  ['a place drawn in another square than its key', FACTORY, "left:${(q.x - 12).toFixed(1)}px;top:${(q.y - 12).toFixed(1)}px;overflow:visible", "left:${(q.x + 50).toFixed(1)}px;top:${(q.y - 12).toFixed(1)}px;overflow:visible", 'G3-510', 2],
  ['a column of the grid without its letter', FACTORY, "const cols = Array.from({ length: m.cols },", "const cols = Array.from({ length: m.cols - 1 },", 'G3-510', 1],
  ['the compass rose with east and west swapped', FACTORY, "letter('E', S - 8, c + 1) + letter('S', c, S - 8) + letter('W', 8, c + 1)", "letter('E', 8, c + 1) + letter('S', c, S - 8) + letter('W', S - 8, c + 1)", 'G3-510', 2],
  ['directions keyed east for west', FACTORY, "const DIRS = [['north', 0], ['east', 90], ['south', 180], ['west', 270]];", "const DIRS = [['north', 0], ['west', 90], ['south', 180], ['east', 270]];", 'G3-510', 1],
  // the map's names (review round 1: every name wholly inside its square, touching nothing)
  ['names drawn 30 px below their places', FACTORY, "top:${b.y0.toFixed(1)}px;", "top:${(b.y0 + 30).toFixed(1)}px;", 'G3-510', 1],
  ['names laid out across the grid lines', FACTORY, "const inner = (b) => grow(b, -8);", "const inner = (b) => grow(b, 40);", 'G3-510', 2],
  ['names laid out across rivers, railroads and trails', FACTORY, "!lines.some((pts) => pathMeets(pts, grow(b, 2), false)) &&", "true &&", 'G3-510', 2],
  ['map names of 11 px', FACTORY, "font:800 13px/${LH13}px 'Nunito'", "font:800 11px/${LH13}px 'Nunito'", 'G3-510', 2],
  ['level 3 hides no place', FACTORY, "const blankNo = new Map((blanks || []).map((b, i) => [b, i + 1]));", "const blankNo = new Map([]);", 'G3-510', 3],
  ['level 3 asks about the hidden places', FACTORY, "const P = poolsOf(t, mode, hidden);", "const P = poolsOf(t, mode, []);", 'G3-510', 3],
  ['long answers on one line', FACTORY, "const two = q.answer.length > 24 || (lv === 3 && mode === 'diagram');", "const two = lv === 3 && mode === 'diagram';", 'G3-510', 2],
  ['a text of two paragraphs', FACTORY, "const parts = t.parts.map((p, i) => `<div data-lcs-part=", "const parts = t.parts.slice(0, 2).map((p, i) => `<div data-lcs-part=", 'G3-510', 1],
  // the diagram and the answers to circle
  ['level 3 hides no step', FACTORY, "const stage = (s, i) => (s.name === blank", "const stage = (s, i) => (s.name === '___'", 'G3-511', 3],
  ['an arrow of the diagram missing', FACTORY, "stage(s, i) + (i < n - 1 ? arrow : '')", "stage(s, i) + (i < n - 2 ? arrow : '')", 'G3-511', 2],
  ['step names of 12 px', FACTORY, "font:800 15px/1.05 'Nunito'", "font:800 12px/1.05 'Nunito'", 'G3-511', 1],
  ['the circled answer keyed to the next answer', FACTORY, "pill(esc(o), i === at[k], key,", "pill(esc(o), i === (at[k] + 1) % 3, key,", 'G3-511', 1],
  ['the right answers in a staircase', FACTORY, "const at = positionsFor(qs.length, rng);", "const at = [0, 1, 2, 0, 1, 2];", 'G3-511', 1],
  ['the right answers in pairs (0 0 1 1 2 2)', FACTORY, "const at = positionsFor(qs.length, rng);", "const at = [0, 0, 1, 1, 2, 2];", 'G3-510', 1],
  ['ligatures on: fi and ff joined (no rule before the root)', FACTORY, '<style>[data-lcs-noliga] *{', '<style>[data-lcs-noliga-off] *{', 'G3-511', 1],
  // the bank's own check (it runs when the factory loads)
  ['bank: a compass direction in a map text', BANK, '"The race starts in the city of Anchorage."', '"The race starts in the city of Anchorage, far to the south."', 'G3-510', 1],
  ['bank: an answer that is not in the text', BANK, '"answer": "1869"', '"answer": "1870"', 'G3-510', 2],
  ['bank: a text answer the map prints too', BANK, '"answer": "Congress"', '"answer": "Washington Monument"', 'G3-510', 2],
  ['bank: a both question that names its own place', BANK, '"In which square is the memorial that stands beside a small lake?"', '"In which square is the Jefferson Memorial that stands beside a small lake?"', 'G3-510', 2],
  ['bank: two places with one name', BANK, '"name": "McGrath",', '"name": "Unalakleet",', 'G3-510', 1],
  ['bank: a map name that finds no room in its square', BANK, '"name": "Canyon",', '"name": "Grand Canyon of the Yellowstone",', 'G3-510', 1],
  ['bank: a diagram word the text uses too', BANK, '"Many tiny drops together make a cloud."', '"Many tiny drops together make a cloud. This is condensation."', 'G3-511', 2],
  ['bank: a black-and-white picture', BANK, '"ocean life"', '"ocean life bw"', 'G3-511', 1],
];
