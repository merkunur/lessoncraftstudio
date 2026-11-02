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
const { pixelFiguresOfSize, filledCount } = require('../../data/b2/figures.js');
const { LS_PIXEL_FIGURES } = require('../../data/b2/figures-levelset.js');

/**
 * Symmetry & Grid Copy maker (2026-11-02). The published page (level 2, copy 1) keeps its June draw from the four
 * pictures of its size; every other page draws from every picture fit to copy — square, at least 40 % filled (the check
 * below); the Level Set pictures are asymmetric under every flip and one piece by their own gate (qa/verify-gc-figures.js).
 * Levels of the faces (each face's level 2 is its published page): level 1 colours the first rows of the picture on the
 * target grid already (about half its squares) — the child copies the rest; level 3 takes denser pictures (K-298, K-300)
 * or the 7×7 grid (K-299).
 */
const copyPool = (n) => [...pixelFiguresOfSize(n), ...LS_PIXEL_FIGURES.filter((f) => f.rows.length === n && f.rows[0].length === n)]
  .filter((f) => filledCount(f) / (n * n) >= 0.4);
const DENSE = { 6: 21, 7: 25, 8: 31 };
const FACE_LEVELS = {
  'K-298': { 1: { reveal: true }, 3: { dense: true } },
  'K-299': { 1: { reveal: true }, 3: { size: 7, cell: 40 } },   // 40 px: with its labels a 42 px 7×7 pair is wider than the card
  'K-300': { 1: { reveal: true }, 3: { dense: true } },
};
/** the rows to colour already: the fewest top rows holding at least half the picture's squares */
function revealRows(fig) {
  const per = fig.rows.map((r) => r.replace(/\./g, '').length), total = per.reduce((a, b) => a + b, 0);
  let k = 0, got = 0;
  while (k < per.length && got < total / 2) got += per[k++];
  return k;
}

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
    const d = { ...this.difficulty[difficulty], ...((FACE_LEVELS[this.id] || {})[difficulty] || {}) };
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const legacy = difficulty === 2 && (ctx.seedVariant || ctx.variant || 1) === 1;
    let pool = legacy ? pixelFiguresOfSize(d.size) : copyPool(d.size);
    if (d.dense) pool = pool.filter((f) => filledCount(f) >= DENSE[d.size]);
    if (pool.length < 2) throw new Error(`K-286: fewer than 2 figures of size ${d.size}`);
    const picks = rng.sample(pool, 2);
    // the two grids and the coral arrow share the card (615 px inside its padding): the squares shrink until the arrow fits,
    // never below 36 px; where it cannot fit (an 8 × 8 or a lettered 7 × 7 grid) the page has no arrow and narrower side
    // padding. Before (2026-11-02) the arrow was squeezed to nothing and the grids ran into the card's padding.
    const gutter = d.labels ? 20 : 0, fitCell = Math.floor((267 - 4 - gutter) / d.size);
    const arrow = fitCell >= 36, cell = arrow ? Math.min(d.cell, fitCell) : d.cell;
    const rows = picks.map((fig) => {
      const g = gridCopy({ figure: fig, cell, labels: d.labels, reveal: d.reveal ? revealRows(fig) : 0, key });
      return `<div class="ws-card" style="flex-direction:row;align-items:center;justify-content:center;gap:${arrow ? 20 : 7}px;padding:${arrow ? '14px' : '14px 6px'}" data-lcs-copy="${fig.key}" data-ws-content>` +
        `<div class="ws-card-stage" style="flex:0 0 auto">${g.modelSvg}</div>${arrow ? `<div style="flex:0 0 auto;line-height:0">${copyArrow()}</div>` : ''}<div class="ws-card-stage" style="flex:0 0 auto">${g.targetSvg}</div></div>`;
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
        const shown = [...target.querySelectorAll('[data-lcs-given-target]')].map((r) => r.dataset.lcsGivenTarget);
        const answer = [...target.querySelectorAll('[data-lcs-answer-cell]')].map((r) => r.dataset.lcsAnswerCell);
        if ([...shown, ...answer].sort().join('|') !== given.join('|')) fails.push(`row ${i + 1}: model/target cell sets differ`);
        // level 1 colours part of the picture already: still at least four squares to copy, and at least four given
        if (shown.length && (answer.length < 4 || shown.length < 4)) fails.push(`row ${i + 1}: ${shown.length} squares given, ${answer.length} to copy`);
        if (given.length !== +model.dataset.lcsFilled) fails.push(`row ${i + 1}: filled count stamp mismatch`);
        const n = +model.dataset.lcsCols;
        if (model.dataset.lcsCols !== target.dataset.lcsCols || model.dataset.lcsCell !== target.dataset.lcsCell) fails.push(`row ${i + 1}: grid geometry differs`);
        if (+model.dataset.lcsCell < 36) fails.push(`row ${i + 1}: cell ${model.dataset.lcsCell}px < 36`);
        // the target shows no fill but the squares coloured already (level 1) and, on the answer key, the answers
        for (const r of target.querySelectorAll('rect')) {
          const f = (r.getAttribute('fill') || '').toUpperCase();
          if (f && f !== 'NONE' && f !== '#FFFFFF' && !r.hasAttribute('data-lcs-given-target') && !r.hasAttribute('data-lcs-key-sample')) fails.push(`row ${i + 1}: target has a visible fill`);
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
