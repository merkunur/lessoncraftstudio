/**
 * Grid Coordinates Level Set pictures (2026-10-14) — NEW pages only.
 *
 * The published Grid Coordinates pages (G2-279/302/303/308, one per locale) draw from
 * data/b2/figures.js PIXEL_FIGURES, which has only four pictures per size, so a second
 * copy of a level could only have moved the same picture. These pictures give every copy
 * of a level its own picture. PIXEL_FIGURES is untouched (K-286 Grid Copy and the
 * published pages read it), so no live page changes.
 *
 * Same alphabet as figures.js: '.' empty, a colour letter = filled
 * (r red · b blue · y yellow · g green · o orange · p purple · n brown · k pink).
 * `cls` sorts a picture into the level it serves:
 *   small6  6×6, 9-15 cells           — easier pages (fewer codes)
 *   reg6    6×6, 17-25 cells, ≥3 colours — the 6×6 harder page (more colour groups)
 *   f7      7×7                        — the core 8×8 grid
 *   f8      8×8                        — the 10×10 grid
 *   f9      9×9, up to 48 cells          — the harder 10×10 page
 * The geometry gate is qa/verify-gc-figures.js (asymmetric under the three flips AND the
 * diagonal swap, one connected piece, size + cell + colour bounds per class).
 */
'use strict';
const { COLOR_LETTERS } = require('./figures.js');

const LS_PIXEL_FIGURES = [
  // ---- small6: easier pages ----
  { key: 'balloon',   cls: 'small6', rows: ['.rr...', 'rrrr..', 'rrrr..', '.rr...', '..n...', '...n..'] },
  { key: 'note',      cls: 'small6', rows: ['...p..', '...pp.', '...p.p', '...p..', '.ppp..', '.ppp..'] },
  { key: 'flower',    cls: 'small6', rows: ['.kkk..', 'kkykk.', '.kkk..', '..g...', '.gg...', '..g...'] },
  { key: 'pencil',    cls: 'small6', rows: ['....kk', '...yyk', '..yyy.', '.yyy..', '.oy...', 'n.....'] },
  { key: 'pine',      cls: 'small6', rows: ['...g..', '..ggg.', '...g..', '..ggg.', '.ggggg', '...n..'] },
  { key: 'icecream',  cls: 'small6', rows: ['..kk..', '.kkkk.', '.oooo.', '..oo..', '..o...', '......'] },
  { key: 'mushroom',  cls: 'small6', rows: ['.rrr..', 'rrrrr.', '.yy...', '.yy...', '.yy...', '......'] },

  // ---- reg6: the 6×6 harder page ----
  { key: 'house',     cls: 'reg6', rows: ['...r..', '..rrr.', '.rrrrr', '.ybyy.', '.yyny.', '.yyny.'] },
  { key: 'apple',     cls: 'reg6', rows: ['..n...', '..ngg.', '.rrrr.', 'rrrrrr', 'rrrrrr', '.rrrr.'] },
  { key: 'rocket',    cls: 'reg6', rows: ['..r...', '.rrr..', '.byb..', '.bbb..', 'rbbbr.', 'r.o.r.'] },
  { key: 'car',       cls: 'reg6', rows: ['......', '.rrr..', 'rbbbr.', 'rrrrrr', 'rrrrry', '.n..n.'] },
  { key: 'tulip',     cls: 'reg6', rows: ['r.r.r.', 'rrrrr.', 'rrrrr.', '.rrr..', '..g.gg', '..gg..'] },

  { key: 'cat',       cls: 'reg6', rows: ['o...o.', 'oo.oo.', 'ooooo.', 'obobo.', 'okkko.', '.ooo..'] },
  { key: 'shirt',     cls: 'reg6', rows: ['gg.gg.', 'ggggg.', '.ggg..', '.gkg..', '.ggg..', '......'] },
  { key: 'goldfish',  cls: 'reg6', rows: ['..oo..', '.ooooo', 'obooo.', '.ooooo', '..oo..', '......'] },
  { key: 'bell',      cls: 'reg6', rows: ['..y...', '.yyy..', '.yyy..', 'yyyyy.', 'yyyyy.', '..n...'] },
  { key: 'pumpkin',   cls: 'reg6', rows: ['...g..', '..n...', '.oooo.', 'onoono', 'onoono', '.oooo.'] },
  { key: 'hat',       cls: 'reg6', rows: ['.ppp..', '.ppp..', '.rrr..', '.ppp..', 'ppppp.', '......'] },
  { key: 'gift',      cls: 'reg6', rows: ['..r.r.', '...r..', 'bbrbb.', 'bbrbb.', 'rrrrr.', 'bbrbb.'] },

  // ---- f7: the core 8×8 grid ----
  { key: 'apple-tree', cls: 'f7', rows: ['..ggg..', '.ggggg.', 'ggrgggg', '.ggggr.', '...n...', '...n...', '..nn...'] },
  { key: 'train',      cls: 'f7', rows: ['.n.....', '.n..rrr', 'rrrrrbr', 'rrrrrrr', 'rrrrrrr', '.n.n.n.', '.......'] },
  { key: 'bus',        cls: 'f7', rows: ['.......', 'yyyyyyy', 'ybybyby', 'yyyyyyy', 'yyyyyyr', '.n..n..', '.......'] },
  { key: 'pear',       cls: 'f7', rows: ['....g..', '...n...', '...yy..', '..yyy..', '.yyyyy.', '.yyyyy.', '..yyy..'] },
  { key: 'popsicle',   cls: 'f7', rows: ['...rrr.', '...rrr.', '...ooo.', '...ooo.', '...yyy.', '....n..', '....n..'] },

  // ---- f8: the 10×10 grid ----
  { key: 'dog',       cls: 'f8', rows: ['.n......', 'nnn....n', 'nbnnnnnn', '.nnnnnnn', '..nnnnn.', '..n.n.n.', '..n.n.n.', '........'] },
  { key: 'cupcake',   cls: 'f8', rows: ['....r...', '..kkkk..', '.kkkkkk.', 'kkkkkkkk', '.onono..', '.onono..', '..ono...', '........'] },
  { key: 'airplane',  cls: 'f8', rows: ['........', 'r.......', 'rr......', 'bbbbbbbo', '.bbbbbb.', '...rr...', '....rr..', '........'] },
  { key: 'turtle',    cls: 'f8', rows: ['........', '..ggg...', '.gngng..', 'gggggg.y', 'ggggggyy', '.y..y...', '.y..y...', '........'] },
  { key: 'sunflower', cls: 'f8', rows: ['..yyy...', '.yynyy..', '.ynnny..', '.yynyy..', '..yyy.g.', '...g.gg.', '...gg...', '...g....'] },

  { key: 'hen',       cls: 'f8', rows: ['.rr.....', '.nnn....', 'onbn..nn', '.rnnnnnn', '.nnnnnnn', '..nnnnn.', '...o.o..', '..oo.oo.'] },
  { key: 'frog',      cls: 'f8', rows: ['.g...g..', 'gbg.gbg.', 'ggggggg.', 'grrrrrg.', '.ggggg..', 'gg...gg.', '........', '........'] },
  { key: 'tent',      cls: 'f8', rows: ['...nr...', '..ooo...', '.ooooo..', 'ooonooo.', 'oonnnoo.', '........', '........', '........'] },
  { key: 'butterfly', cls: 'f8', rows: ['.n...n..', '..n.n...', 'kk.n.kk.', 'kkknkkk.', '.kknkk..', 'kk.n.kk.', 'kk...kk.', '........'] },
  { key: 'lighthouse', cls: 'f8', rows: ['...r....', '..ooo...', '..rrr...', '..yyy...', '..rrr...', '..yyy...', '.rrrrr..', 'bbbbbbbb'] },
  { key: 'helicopter', cls: 'f8', rows: ['nnnnnn..', '...n....', '.bbbb...', 'bbybbbbb', 'bbbbb..b', '.n..n...', 'nnnnnn..', '........'] },

  // ---- f9: the harder 10×10 page ----
  { key: 'robot',     cls: 'f9', rows: ['.....y...', '..bbbbb..', '..bybyb..', '..bbbbb..', '...ppp...', 'bppppppb.', 'b.poppp.b', '..ppppp..', '..b...b..'] },
  { key: 'ship',      cls: 'f9', rows: ['...n.....', '...rr....', '...rrr...', '...rrrr..', '...n.....', 'bbbbbbbbb', '.bybbybb.', '..bbbbb..', '.........'] },
  { key: 'owl',       cls: 'f9', rows: ['.n...n...', '.nnnnn...', 'nyynyyn..', 'nybnybn..', 'nnnonnn..', '.nkkkn...', '.nkkkn...', '..nnn....', '..o.o....'] },
  { key: 'castle',    cls: 'f9', rows: ['......r..', '......n..', 'p.p.p.p..', 'ppppppp..', 'pbpppbp..', 'ppppppp..', 'ppnnnpp..', 'ppnnnpp..', '.........'] },
  { key: 'strawberry', cls: 'f9', rows: ['....n....', '..gggg...', '.rrrrrr..', '.ryrrryr.', '.rrryrrr.', '..ryrrr..', '..rrrry..', '...rrr...', '....r....'] },
];

const CLASSES = {
  small6: { size: 6, min: 9, max: 15, minColors: 1 },
  reg6:   { size: 6, min: 17, max: 25, minColors: 2 },
  f7:     { size: 7, min: 15, max: 30, minColors: 1 },
  f8:     { size: 8, min: 18, max: 36, minColors: 1 },
  f9:     { size: 9, min: 28, max: 48, minColors: 2 },
};

for (const f of LS_PIXEL_FIGURES) {
  const C = CLASSES[f.cls];
  if (!C) throw new Error(`figures-levelset: ${f.key} unknown class ${f.cls}`);
  if (f.rows.length !== C.size) throw new Error(`figures-levelset: ${f.key} must be ${C.size} rows`);
  for (const row of f.rows) {
    if (row.length !== C.size) throw new Error(`figures-levelset: ${f.key} ragged row "${row}"`);
    for (const ch of row) if (ch !== '.' && !COLOR_LETTERS[ch]) throw new Error(`figures-levelset: ${f.key} bad char ${ch}`);
  }
}

/** Pictures of one class. */
function lsFigures(cls) { return LS_PIXEL_FIGURES.filter((f) => f.cls === cls); }
/** Number of distinct colours in a picture. */
function colorCount(f) { return new Set(f.rows.join('').replace(/\./g, '')).size; }

module.exports = { LS_PIXEL_FIGURES, CLASSES, lsFigures, colorCount };
