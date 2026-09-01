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
    1: { cards: 2, cols: 2, rows: 1, cell: 30, band: 'simple' },
    2: { cards: 4, cols: 2, rows: 2, cell: 26, band: 'any' },
    3: { cards: 4, cols: 2, rows: 2, cell: 26, band: 'hard' },
  },
  i18n: {
    en: {
      title: 'Complete the Symmetry Picture',
      instruction: 'Each picture is only half done. Color the squares on the other side of the line to make it symmetrical.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const names = FIGURE_NAMES[loc] || FIGURE_NAMES.en;
    // band ranking is FROZEN to the original 16 figures (file order is
    // append-only): the nt20-VAR additions are reachable only via d.figures,
    // so growing the art pool can never change the published band pages
    const ranked = FIGURES.slice(0, 16).map((f) => ({ f, n: answerCellsOf(f) })).sort((a, b) => a.n - b.n);
    let pool;
    if (d.figures) pool = FIGURES.filter((f) => d.figures.includes(f.key)); // nt20-VAR: explicit figure allowlist
    else if (d.band === 'simple') pool = ranked.slice(0, 6).map((x) => x.f);
    else if (d.band === 'hard') pool = ranked.slice(-8).map((x) => x.f);
    else pool = ranked.map((x) => x.f);
    if (pool.length < d.cards) throw new Error(`G2-253: figure pool ${pool.length} < cards ${d.cards}`);
    const picks = rng.sample(pool, d.cards);

    const cards = picks.map((fig) => {
      const g = symGrid({ figure: fig, cell: d.cell, axis: d.axis }); // nt20-VAR: axis 'h' = horizontal mirror page
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
        const givenCols = Math.ceil(W / 2);
        const givenRows = Math.ceil(H / 2);
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
          if (horiz ? r < givenRows : c < givenCols) fails.push(`grid ${i + 1}: answer cell on the given side`);
          const twin = horiz ? `${c},${H - 1 - r}` : `${W - 1 - c},${r}`;
          if (!given.has(twin)) fails.push(`grid ${i + 1}: cell ${cell} has no mirror twin`);
        });
        // and no given cell sits past the mirror line
        given.forEach((cell) => {
          const [c, r] = cell.split(',').map(Number);
          if (horiz ? r >= givenRows : c >= givenCols) fails.push(`grid ${i + 1}: given cell past the line`);
        });
        if (!g.querySelector('[data-lcs-mirror]')) fails.push(`grid ${i + 1}: no mirror line`);
      });
      return fails;
    });
  },
};
