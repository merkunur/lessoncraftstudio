/**
 * nt20-B figure data — hand-designed, gate-verified (qa/verify-b2-figures.js).
 *
 * DOT_FIGURES — 16 closed clockwise polylines in a 0-100 box (y DOWN), index 0
 * = dot 1 (top of the figure). 12-20 vertices, min pairwise spacing ≥ 7 units
 * (39 px at the K page's 5.6 px/unit), no self-intersection, every vertex
 * ≥ 5 units from any non-incident edge. `marks` are pre-printed details
 * (eye, window, kite spar) drawn in ink so the finished picture "comes alive".
 * Consumed by K-285 (dot-to-dot) through primitives/dot-figure.js.
 *
 * PIXEL_FIGURES — 12 square 6×6..8×8 pixel pictures; '.' = empty, a colour
 * letter = filled (r red · b blue · y yellow · g green · o orange · p purple ·
 * n brown · k pink). Every figure is ASYMMETRIC under left-right, top-bottom
 * and 180° flips (so a mirrored copy is provably wrong), ≥ 40 % filled, and
 * one 8-connected component. Consumed mono (any letter = filled) by K-286
 * (grid-copy) and by colour letter by G2-279 (grid-coordinates).
 *
 * Names ×11 live in data/b2/figure-names.js (GENERATED at the locale fan) and
 * are never printed on a page — they feed the deck meta / landing copy only.
 *
 * Both tables are validated at load: a malformed row throws, so a bad edit
 * cannot reach a render.
 */
'use strict';

const DOT_FIGURES = [
  { key: 'star', pts: [[50,4],[61,31],[90,27],[72,50],[90,73],[61,69],[50,96],[39,69],[10,73],[28,50],[10,27],[39,31]], marks: [] },
  { key: 'house', pts: [[50,15],[72,35],[72,22],[80,22],[80,42],[94,50],[82,50],[82,90],[62,90],[62,70],[48,70],[48,90],[18,90],[18,50],[6,50]],
    marks: [{ type: 'square', x: 24, y: 58, s: 12 }] },
  { key: 'boat', pts: [[44,18],[52,18],[52,30],[60,30],[60,46],[70,46],[70,62],[94,62],[80,82],[20,82],[6,62],[22,62],[22,46],[34,46],[34,30],[44,30]],
    marks: [{ type: 'dot', x: 50, y: 72, r: 3.5 }, { type: 'dot', x: 64, y: 72, r: 3.5 }, { type: 'dot', x: 36, y: 72, r: 3.5 }] },
  { key: 'rocket', pts: [[50,6],[62,20],[66,40],[66,62],[84,78],[84,92],[66,80],[60,92],[40,92],[34,80],[16,92],[16,78],[34,62],[34,40],[38,20]],
    marks: [{ type: 'dot', x: 50, y: 36, r: 6 }] },
  { key: 'fish', pts: [[40,24],[58,26],[72,36],[76,44],[94,28],[90,50],[94,72],[76,56],[72,64],[58,74],[40,76],[22,68],[8,50],[22,32]],
    marks: [{ type: 'dot', x: 24, y: 46, r: 3 }] },
  { key: 'kite', pts: [[50,6],[68,23],[86,40],[71,55],[56,70],[64,78],[58,86],[50,94],[42,86],[36,78],[44,70],[29,55],[14,40],[32,23]],
    marks: [{ type: 'line', pts: [[50,6],[50,70]] }, { type: 'line', pts: [[14,40],[86,40]] }] },
  { key: 'heart', pts: [[40,20],[50,30],[60,20],[70,16],[82,20],[90,32],[90,46],[78,64],[50,92],[22,64],[10,46],[10,32],[18,20],[30,16]], marks: [] },
  { key: 'butterfly', pts: [[50,12],[58,22],[74,12],[90,20],[94,38],[84,52],[92,66],[86,82],[70,88],[58,74],[50,86],[42,74],[30,88],[14,82],[8,66],[16,52],[6,38],[10,20],[26,12],[42,22]],
    marks: [{ type: 'line', pts: [[50,12],[44,2]] }, { type: 'line', pts: [[50,12],[56,2]] }] },
  { key: 'tree', pts: [[50,6],[64,28],[56,28],[72,50],[62,50],[82,72],[58,72],[58,92],[42,92],[42,72],[18,72],[38,50],[28,50],[44,28],[36,28]], marks: [] },
  { key: 'car', pts: [[38,30],[64,30],[78,48],[94,54],[94,68],[82,68],[76,80],[64,80],[60,68],[40,68],[36,80],[24,80],[18,68],[6,68],[6,52],[28,48]],
    marks: [{ type: 'square', x: 46, y: 40, s: 10 }, { type: 'square', x: 60, y: 40, s: 10 }] },
  { key: 'cat', pts: [[24,8],[32,22],[44,20],[56,20],[68,22],[76,8],[84,30],[82,46],[90,60],[92,84],[80,92],[20,92],[8,84],[10,60],[18,46],[16,30]],
    marks: [{ type: 'dot', x: 38, y: 34, r: 3 }, { type: 'dot', x: 62, y: 34, r: 3 }, { type: 'dot', x: 50, y: 42, r: 2.5 }] },
  { key: 'ice-cream', pts: [[50,6],[64,8],[74,18],[72,28],[80,36],[80,46],[70,54],[60,74],[50,94],[40,74],[30,54],[20,46],[20,36],[28,28],[26,18],[36,8]],
    marks: [{ type: 'line', pts: [[40,74],[60,74]] }] },
  { key: 'umbrella', pts: [[50,8],[78,16],[94,50],[84,44],[74,50],[64,44],[54,50],[54,84],[46,92],[34,90],[28,80],[38,78],[46,82],[46,50],[36,44],[26,50],[16,44],[6,50],[22,16]],
    marks: [{ type: 'line', pts: [[50,8],[50,50]] }] },
  { key: 'whale', pts: [[30,32],[52,32],[70,40],[80,50],[96,34],[88,56],[96,76],[80,62],[66,72],[60,84],[50,80],[24,76],[8,70],[6,58],[12,42]],
    marks: [{ type: 'dot', x: 18, y: 50, r: 3 }] },
  { key: 'sailboat', pts: [[56,14],[66,26],[78,42],[86,60],[56,60],[56,70],[92,70],[82,86],[50,90],[18,86],[8,70],[48,70],[48,60],[24,60],[48,24],[48,14]], marks: [] },
  { key: 'crown', pts: [[50,8],[60,44],[72,14],[80,46],[96,24],[88,70],[88,90],[12,90],[12,70],[4,24],[20,46],[28,14],[40,44]],
    marks: [{ type: 'dot', x: 50, y: 80, r: 3.5 }, { type: 'dot', x: 30, y: 80, r: 3.5 }, { type: 'dot', x: 70, y: 80, r: 3.5 }] },
];

const PIXEL_FIGURES = [
  { key: 'duck',     rows: ['.yy...', '.yyyo.', '..y...', '.yyyy.', 'yyyyyy', '.yyyy.'] },
  { key: 'flag',     rows: ['nrrrr.', 'nbbbb.', 'nrrrr.', 'n.....', 'n.....', 'n.....'] },
  { key: 'cup',      rows: ['bbbb..', 'bbbbo.', 'yyyy.o', 'bbbbo.', 'bbbb..', '.bb...'] },
  { key: 'boot',     rows: ['.rr...', '.rr...', '.rr...', '.rrr..', '.rrrr.', 'nnnnnn'] },
  { key: 'boat',     rows: ['...r...', '..rr...', '..rrr..', '..rrrr.', '...b...', 'bbbbbbb', '.bbbbb.'] },
  { key: 'key',      rows: ['.yyy...', 'yy.yy..', 'yy.yy..', '.yyy...', '..y....', '..yyy..', '..yy...'] },
  { key: 'fish',     rows: ['...b...', '..bbb..', '.bybbbb', 'bbbbb.b', '.bbbbbb', '..bbb..', '.......'] },
  { key: 'cherries', rows: ['....ggg', '...g.gg', '...g...', '..g.g..', '.rr.rr.', 'rrr.rrr', '.rr.rr.'] },
  { key: 'elephant', rows: ['..gggggg', '.ggygggg', '.ggggggg', 'g..gg.gg', 'g..gg.gg', 'g..gg.gg', 'g.......', '........'] },
  { key: 'bird',     rows: ['....bb..', '...bybbo', '...bbbb.', '.bbbbb..', 'bbbbbb..', '.bbbbb..', '...b.b..', '...n.n..'] },
  { key: 'giraffe',  rows: ['yyy.....', 'yyy.....', '.y......', '.y......', '.yoyyoy.', '.yyoyyy.', '.yyyyyy.', '.y.y..y.'] },
  { key: 'umbrella', rows: ['...rr...', '..rrrr..', '.rrrrrr.', 'rrrrrrrr', 'r.rnr.r.', '...n....', '...n....', '..nn....'] },
];

const COLOR_LETTERS = { r: 'red', b: 'blue', y: 'yellow', g: 'green', o: 'orange', p: 'purple', n: 'brown', k: 'pink' };

// load-time shape validation (the deep geometry gate lives in qa/verify-b2-figures.js)
for (const f of DOT_FIGURES) {
  if (!Array.isArray(f.pts) || f.pts.length < 12 || f.pts.length > 20) throw new Error(`figures: ${f.key} needs 12-20 vertices`);
  for (const p of f.pts) if (p.length !== 2 || p.some((v) => v < 2 || v > 98)) throw new Error(`figures: ${f.key} vertex out of box`);
}
for (const f of PIXEL_FIGURES) {
  const H = f.rows.length, W = f.rows[0].length;
  if (H !== W || H < 6 || H > 8) throw new Error(`figures: ${f.key} not square 6-8`);
  for (const row of f.rows) {
    if (row.length !== W) throw new Error(`figures: ${f.key} ragged row`);
    for (const ch of row) if (ch !== '.' && !COLOR_LETTERS[ch]) throw new Error(`figures: ${f.key} bad char ${ch}`);
  }
}

/** Mono view of a pixel figure: '#' filled / '.' empty. */
function monoRows(figure) { return figure.rows.map((r) => r.replace(/[^.]/g, '#')); }
/** Filled-cell count. */
function filledCount(figure) { return figure.rows.join('').replace(/\./g, '').length; }
/** Figures whose grid size equals n (6, 7 or 8). */
function pixelFiguresOfSize(n) { return PIXEL_FIGURES.filter((f) => f.rows.length === n); }

module.exports = { DOT_FIGURES, PIXEL_FIGURES, COLOR_LETTERS, monoRows, filledCount, pixelFiguresOfSize };
