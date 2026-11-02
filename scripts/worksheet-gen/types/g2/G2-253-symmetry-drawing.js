/**
 * G2-253 — Symmetry drawing: complete the other half on the grid. The
 * PRODUCTION symmetry task European classrooms assign (de Spiegeln am
 * Gitternetz Klasse 1-2, fr symétrie sur quadrillage — CCSS reaches it at
 * grade 4, which is why the recognition types never covered it). Hand-
 * designed pixel figures (cross-stitch aesthetic), solid teal given half,
 * coral dashed mirror line. Symmetric by construction (figures.js validates
 * palindromic rows at load).
 * d1: 2 large simple figures · d2: 4 figures · d3: 4 intricate figures.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const symGrid = require('../../primitives/sym-grid.js');
const { FIGURES } = require('../../data/symmetry/figures.js');
const { FIGURE_NAMES } = require('../../data/symmetry/figure-names.js');

/**
 * Maker levels of the faces (Symmetry & Grid Copy maker, 2026-11-02). Level 2 is each face's published page. Level 1:
 * two of its pictures, large, one above the other (side by side for the tall pictures of the horizontal page); level 3:
 * the same four mirrored the other way — the given half on the RIGHT of the line, mirroring leftwards is the harder
 * direction. G2-268 (its title names the direction: below the line) takes the hard pictures at level 3 instead.
 */
const FACE_L1 = { cards: 2, cols: 1, rows: 2, cell: 28 };
const FACE_LEVELS = {
  'G2-264': { 1: FACE_L1, 3: { side: 'second' } },
  'G2-265': { 1: FACE_L1, 3: { side: 'second' } },
  'G2-266': { 1: FACE_L1, 3: { side: 'second' } },
  'G2-267': { 1: FACE_L1, 3: { side: 'second' } },
  'G2-268': { 1: { cards: 2, cols: 2, rows: 1, cell: 30 }, 3: { figures: null, band: 'hard' } },   // 30 px: its widest picture is 10 squares
};

function answerCellsOf(fig) {
  const given = Math.ceil(fig.rows[0].length / 2);
  let n = 0;
  for (const r of fig.rows) for (let c = given; c < r.length; c++) if (r[c] === '#') n++;
  return n;
}

module.exports = {
  id: 'G2-253',
  slug: 'symmetry-drawing',
  gradeBand: 'G2',
  assetClass: 'geometry',
  exerciseType: 'symmetry',
  themeAxis: { applicable: false },
  difficulty: {
    // the mirrored picture is 12 squares wide (sym-grid: exact across the line), so level 1's two large grids stand one
    // above the other and the four-grid levels take 24 px squares (12 × 24 = 288 px in a half-page card)
    1: { cards: 2, cols: 1, rows: 2, cell: 28, band: 'simple' },
    2: { cards: 4, cols: 2, rows: 2, cell: 24, band: 'any' },
    3: { cards: 4, cols: 2, rows: 2, cell: 24, band: 'hard' },
  },
  i18n: {
    en: {
      title: 'Complete the Symmetry Picture',
      instruction: 'Each picture is only half done. Color the squares on the other side of the line to make it symmetrical.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = { ...this.difficulty[difficulty], ...((FACE_LEVELS[this.id] || {})[difficulty] || {}) };
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const loc = (locale || 'en').slice(0, 2);
    const names = FIGURE_NAMES[loc] || FIGURE_NAMES.en;
    // band ranking is FROZEN to the original 16 figures (file order is
    // append-only) on the published page (level 2, copy 1): it keeps its
    // pictures. Every other page ranks all the figures, the nt20-VAR additions too.
    const legacy = difficulty === 2 && (ctx.seedVariant || ctx.variant || 1) === 1;
    const ranked = (legacy ? FIGURES.slice(0, 16) : FIGURES).map((f) => ({ f, n: answerCellsOf(f) })).sort((a, b) => a.n - b.n);
    let pool;
    if (d.figures) pool = FIGURES.filter((f) => d.figures.includes(f.key)); // nt20-VAR: explicit figure allowlist
    else if (d.band === 'simple') pool = ranked.slice(0, legacy ? 6 : 9).map((x) => x.f);
    else if (d.band === 'hard') pool = ranked.slice(legacy ? -8 : -12).map((x) => x.f);
    else pool = ranked.map((x) => x.f);
    if (pool.length < d.cards) throw new Error(`G2-253: figure pool ${pool.length} < cards ${d.cards}`);
    const picks = rng.sample(pool, d.cards);

    const cards = picks.map((fig) => {
      const g = symGrid({ figure: fig, cell: d.cell, axis: d.axis, side: d.side, key }); // nt20-VAR: axis 'h' = horizontal mirror page
      const name = names[fig.key] || FIGURE_NAMES.en[fig.key] || fig.key;
      return (
        `<div class="ws-card-stage" style="flex-direction:column;gap:10px">` +
        g.svg +
        `<span style="font-family:'Baloo 2';font-weight:600;font-size:17px;color:#8A8276" data-lcs-figname="${fig.key}">${name}</span>` +
        `</div>`
      );
    });
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const grids = document.querySelectorAll('[data-lcs-prim="sym-grid"]');
      if (!grids.length) fails.push('no grids');
      const seen = new Set();
      grids.forEach((g, i) => {
        const W = +g.dataset.lcsCols;
        const H = +g.dataset.lcsRows;
        const horiz = g.dataset.lcsAxis === 'h'; // nt20-VAR horizontal-mirror page
        // the line runs on the grid line in the middle: an EVEN width (height), the halves mirror each other exactly
        if (horiz ? H % 2 : W % 2) fails.push(`grid ${i + 1}: odd ${horiz ? 'height' : 'width'} — the line cannot run on a grid line in the middle`);
        const givenCols = W / 2;
        const givenRows = H / 2;
        // level 3 of the faces gives the second half (right of / below the line): the answers are on the first side
        const second = g.dataset.lcsGivenSide === 'second';
        const onFirst = (c, r) => (horiz ? r < givenRows : c < givenCols);
        const fig = g.dataset.lcsFigure;
        if (seen.has(fig)) fails.push(`grid ${i + 1}: duplicate figure ${fig}`);
        seen.add(fig);
        const given = new Set([...g.querySelectorAll('[data-lcs-given]')].map((e) => e.dataset.lcsGiven));
        const answers = [...g.querySelectorAll('[data-lcs-answer-cell]')].map((e) => e.dataset.lcsAnswerCell);
        if (answers.length !== +g.dataset.lcsAnswerCount) fails.push(`grid ${i + 1}: answer count mismatch`);
        if (answers.length < 4) fails.push(`grid ${i + 1}: only ${answers.length} cells to draw`);
        // every answer cell's mirror twin must exist as a GIVEN cell
        answers.forEach((cell) => {
          const [c, r] = cell.split(',').map(Number);
          if (onFirst(c, r) !== second) fails.push(`grid ${i + 1}: answer cell on the given side`);
          const twin = horiz ? `${c},${H - 1 - r}` : `${W - 1 - c},${r}`;
          if (!given.has(twin)) fails.push(`grid ${i + 1}: cell ${cell} has no mirror twin`);
        });
        // and no given cell sits past the mirror line
        given.forEach((cell) => {
          const [c, r] = cell.split(',').map(Number);
          if (onFirst(c, r) === second) fails.push(`grid ${i + 1}: given cell past the line`);
        });
        const ml = g.querySelector('[data-lcs-mirror]');
        if (!ml) fails.push(`grid ${i + 1}: no mirror line`);
        else {
          // the line runs exactly between the two halves (a given cell is drawn 1 px inside its square)
          const r0 = g.querySelector('[data-lcs-given]'), cell = r0 ? +r0.getAttribute('width') + 2 : 0;
          const at = horiz ? +ml.getAttribute('y1') : +ml.getAttribute('x1');
          if (cell && Math.abs(at - (horiz ? givenRows : givenCols) * cell) > 0.5) fails.push(`grid ${i + 1}: the mirror line is not between the halves`);
        }
      });
      return fails;
    });
  },
};
