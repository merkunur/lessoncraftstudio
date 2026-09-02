/**
 * K-286 — Copy the Grid Picture (nt20-B; `grid-copy`, K, readiness —
 * fr "reproduction sur quadrillage" / de "Gitterbilder" / pt "malha
 * quadriculada"). Two rows: a pixel picture on the left grid (solid teal), a
 * coral arrow, an empty twin grid on the right. The child colours the same
 * squares. Every figure is asymmetric under all three flips, so a mirrored
 * copy is provably wrong. d1 6×6 · d2 7×7 · d3 8×8 with A-H / 1-8 labels on
 * both grids (the bridge to grid-coordinates). Language-free.
 */
'use strict';
const gridCopy = require('../../primitives/grid-copy.js');
const { copyArrow } = require('../../templates/components-b2.js');
const { pixelFiguresOfSize } = require('../../data/b2/figures.js');

module.exports = {
  id: 'K-286',
  slug: 'copy-the-grid-picture',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'grid-copy',
  themeAxis: { applicable: false },
  difficulty: {
    1: { size: 6, cell: 48, labels: false },
    2: { size: 7, cell: 42, labels: false },
    3: { size: 8, cell: 36, labels: true },
  },
  i18n: {
    en: {
      title: 'Copy the Grid Picture',
      instruction: 'Look at the picture on the left. Color the same squares on the empty grid so the picture appears again.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const pool = pixelFiguresOfSize(d.size);
    if (pool.length < 2) throw new Error(`K-286: fewer than 2 figures of size ${d.size}`);
    const picks = rng.sample(pool, 2);
    const rows = picks.map((fig) => {
      const g = gridCopy({ figure: fig, cell: d.cell, labels: d.labels });
      return `<div class="ws-card" style="flex-direction:row;align-items:center;justify-content:center;gap:20px;padding:14px" data-lcs-copy="${fig.key}" data-ws-content>` +
        `<div class="ws-card-stage" style="flex:0 0 auto">${g.modelSvg}</div>${copyArrow()}<div class="ws-card-stage" style="flex:0 0 auto">${g.targetSvg}</div></div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:14px">${rows.join('')}</div>`,
      meta: { figures: picks.map((f) => f.key) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-copy]')];
      if (rows.length !== 2) fails.push(`${rows.length} rows`);
      const keys = rows.map((r) => r.dataset.lcsCopy);
      if (new Set(keys).size !== keys.length) fails.push('same figure twice');
      rows.forEach((row, i) => {
        const model = row.querySelector('[data-lcs-prim="grid-copy-model"]');
        const target = row.querySelector('[data-lcs-prim="grid-copy-target"]');
        if (!model || !target) { fails.push(`row ${i + 1}: grids missing`); return; }
        const given = [...model.querySelectorAll('[data-lcs-given]')].map((r) => r.dataset.lcsGiven).sort();
        const answer = [...target.querySelectorAll('[data-lcs-answer-cell]')].map((r) => r.dataset.lcsAnswerCell).sort();
        if (given.join('|') !== answer.join('|')) fails.push(`row ${i + 1}: model/target cell sets differ`);
        if (given.length !== +model.dataset.lcsFilled) fails.push(`row ${i + 1}: filled count stamp mismatch`);
        const n = +model.dataset.lcsCols;
        if (model.dataset.lcsCols !== target.dataset.lcsCols || model.dataset.lcsCell !== target.dataset.lcsCell) fails.push(`row ${i + 1}: grid geometry differs`);
        if (+model.dataset.lcsCell < 36) fails.push(`row ${i + 1}: cell ${model.dataset.lcsCell}px < 36`);
        // target shows no fill
        for (const r of target.querySelectorAll('rect')) {
          const f = (r.getAttribute('fill') || '').toUpperCase();
          if (f && f !== 'NONE' && f !== '#FFFFFF') fails.push(`row ${i + 1}: target has a visible fill`);
        }
        // asymmetry + fill + connectivity re-derived from the given set
        const set = new Set(given);
        const cells = given.map((s) => s.split(',').map(Number));
        const has = (c, r) => set.has(`${c},${r}`);
        const lr = cells.every(([c, r]) => has(n - 1 - c, r));
        const tb = cells.every(([c, r]) => has(c, n - 1 - r));
        const rot = cells.every(([c, r]) => has(n - 1 - c, n - 1 - r));
        if (lr || tb || rot) fails.push(`row ${i + 1}: figure symmetric (mirrored copy would pass)`);
        if (cells.length / (n * n) < 0.40) fails.push(`row ${i + 1}: fill < 40%`);
        const seen = new Set(); const st = [cells[0]]; seen.add(given[0]);
        while (st.length) { const [c, r] = st.pop(); for (let dc = -1; dc <= 1; dc++) for (let dr = -1; dr <= 1; dr++) { const k = `${c + dc},${r + dr}`; if (set.has(k) && !seen.has(k)) { seen.add(k); st.push([c + dc, r + dr]); } } }
        if (seen.size !== set.size) fails.push(`row ${i + 1}: figure not connected`);
      });
      return fails;
    });
  },
};
