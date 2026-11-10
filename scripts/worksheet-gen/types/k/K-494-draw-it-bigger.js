/**
 * K-494 — Draw It Bigger on the Grid (How to Draw maker 2026-11-02, NEW-TEMPLATES §30 T2): a drawing on a small grid,
 * and the same grid with squares twice as big; the child copies the drawing square by square onto the big grid —
 * enlarging, the readiness step for proportion and scale ("agrandir sur quadrillage"). The grid copy at the same size is
 * G1-416; this page changes the size.
 *
 * The drawing is a reviewed library lesson the maker ships (data/b7 how-to-draw: the published lessons + the allocated
 * Level Set lessons), drawn whole inside the small grid (htdGrid model). The squares of the big grid are exactly twice
 * the small ones (the page's verify measures it). The key draws the picture in the big grid.
 * Levels: 1 a 3 × 3 grid and a simple drawing (≤ 4 steps) · 2 a 4 × 4 grid · 3 a 5 × 5 grid and a detailed drawing (≥ 4 steps).
 */
'use strict';
const H = require('../../lib/htd-faces.js');
const C7 = require('../../templates/components-b7.js');

const D = {
  // model + 14 + big (2×) = the body: 3 × 72 → 220 + 436 · 4 × 54 → 220 + 436 · 5 × 44 → 224 + 444
  1: { cells: 3, cellPx: 72, steps: [3, 4] },
  2: { cells: 4, cellPx: 54, steps: [3, 5] },
  3: { cells: 5, cellPx: 44, steps: [4, 5] },
};
const fits = (S, d) => S.steps.length >= d.steps[0] && S.steps.length <= d.steps[1];

module.exports = {
  id: 'K-494',
  slug: 'draw-it-bigger-on-the-grid',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'how-to-draw',
  themeAxis: { applicable: false },
  fitsChrome: true,
  difficulty: D,
  i18n: {
    en: {
      title: 'Draw It Bigger on the Grid',
      instruction: 'Copy the picture onto the big grid, one square at a time. Every square of the big grid is twice as big, so your picture will be twice as big too.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const key = !!(ctx && ctx.answerKey);
    const list = H.pinned('K-494', difficulty) || H.order('K-494');
    const unit = H.pick(list, ctx);
    const S = H.B.stepsFor(unit);
    // a teacher's longer title gives the grids back their px (fitsChrome): both grids shrink together, the ratio stays 2
    const extra = (ctx && ctx.chromeExtra) || 0;
    const cell = extra ? Math.floor(d.cellPx * Math.max(0.7, 1 - extra / 680)) : d.cellPx;
    const model = C7.htdGrid({ cells: d.cells, cellPx: cell, frame: 'card', model: S, attrs: 'data-lcs-htd-small="1"' });
    const big = C7.htdGrid({ cells: d.cells, cellPx: cell * 2, frame: 'pencil', model: key ? S : null, attrs: `data-lcs-htd-big="1"${key ? ' data-lcs-key-sample="drawing"' : ''}` });
    const body = `<div style="display:flex;flex-direction:column;align-items:center;gap:14px">${model}${big}</div>`;
    return { bodyHtml: H.root('bigger', unit, body, `data-lcs-htd-cells="${d.cells}"${require('../../lib/fl-art.js').tap(ctx)}`), meta: { unit, cells: d.cells } };
  },

  /** the pin tool's test (tools/build-htd-face-pins.js) */
  pinFits(unit, level) { return fits(H.B.stepsFor(unit), D[level]); },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const small = document.querySelector('[data-lcs-htd-small]'), big = document.querySelector('[data-lcs-htd-big]');
      if (!small || !big) return ['the small or the big grid is missing'];
      const [a, b] = [small, big].map((g) => g.getAttribute('data-lcs-htd-grid').match(/^(\d+)x(\d+)@(\d+)$/).slice(1).map(Number));
      if (a[0] !== b[0] || a[1] !== b[1]) fails.push('the two grids have different numbers of squares');
      if (b[2] !== 2 * a[2]) fails.push(`the big squares are ${b[2]} px, not twice ${a[2]}`);
      if (!small.querySelector('[data-lcs-htd-gridmodel]')) fails.push('no drawing in the small grid');
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect(), r = big.getBoundingClientRect();
      if (r.bottom > pg.bottom + 1 || r.right > pg.right + 1) fails.push('the big grid leaves the page');
      return fails;
    });
  },
};
