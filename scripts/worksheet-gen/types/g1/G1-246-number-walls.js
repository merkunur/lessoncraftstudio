/**
 * G1-246 — Number Walls (nt20-B; `number-walls`, G1, 1.OA.C.6 / 1.OA.D.8 —
 * Zahlenmauern / pyramides additives / talpyramider). Brick pyramids: each
 * brick is the sum of the two beneath it. d1/d2: the base is given, the
 * child builds upward. d3: four courses with ONE base gap whose upper
 * neighbour is given — solved by subtraction, then propagated. Uniqueness
 * is proven by a propagation solver (build refuses an unsolvable wall;
 * verify re-implements the solver).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberWall = require('../../primitives/number-wall.js');

module.exports = {
  id: 'G1-246',
  slug: 'number-walls',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'number-walls',
  themeAxis: { applicable: false },
  difficulty: {
    1: { walls: 4, cols: 2, rows: 2, courses: 3, baseMin: 1, baseMax: 4, topMax: 10, brick: { w: 100, h: 88 }, gap: false },
    2: { walls: 6, cols: 2, rows: 3, courses: 3, baseMin: 1, baseMax: 9, topMax: 20, brick: { w: 88, h: 68 }, gap: false },
    3: { walls: 4, cols: 2, rows: 2, courses: 4, baseMin: 1, baseMax: 5, topMax: 20, brick: { w: 78, h: 70 }, gap: true },
  },
  i18n: {
    en: {
      title: 'Number Walls',
      instruction: 'Each brick is the sum of the two bricks under it. Fill in the missing numbers.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const n = d.courses;
    const walls = [];
    const usedBase = new Set(), usedTop = new Set();
    let guard = 0;
    while (walls.length < d.walls && guard++ < 500) {
      const base = Array.from({ length: n }, () => rng.int(d.baseMin, d.baseMax));
      const values = numberWall.pyramidValues(base);
      const top = values[n - 1][0];
      if (top > d.topMax) continue;
      const bkey = base.join(',');
      if (usedBase.has(bkey)) continue;
      if (usedTop.has(top) && usedTop.size < d.walls - 1 && rng.next() < 0.7) continue;
      const blanks = new Set();
      const given = new Set();
      for (let r = 1; r < n; r++) for (let c = 0; c < n - r; c++) blanks.add(`${r},${c}`);
      for (let c = 0; c < n; c++) given.add(`0,${c}`);
      if (d.gap) {
        const g = rng.int(0, n - 1);
        blanks.add(`0,${g}`); given.delete(`0,${g}`);
        const opts = []; if (g > 0) opts.push(`1,${g - 1}`); if (g < n - 1) opts.push(`1,${g}`);
        const giveUp = rng.pick(opts);
        blanks.delete(giveUp); given.add(giveUp);
      }
      if (!numberWall.solvable(n, given)) continue;
      usedBase.add(bkey); usedTop.add(top);
      walls.push({ base, blanks });
    }
    if (walls.length < d.walls) throw new Error(`G1-246: could not generate ${d.walls} distinct walls`);
    const cards = walls.map((w) => `<div class="ws-card-stage">${numberWall({ base: w.base, blanks: w.blanks, brick: d.brick }).svg}</div>`);
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: { walls: walls.map((w) => w.base) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const walls = [...document.querySelectorAll('[data-lcs-prim="number-wall"]')];
      if (walls.length < 4) fails.push(`only ${walls.length} walls`);
      const bases = new Set();
      walls.forEach((w, i) => {
        const n = +w.dataset.lcsRows;
        const base = w.dataset.lcsBase.split(',').map(Number);
        if (bases.has(w.dataset.lcsBase)) fails.push(`wall ${i + 1}: duplicate base`);
        bases.add(w.dataset.lcsBase);
        if (base.some((v) => v < 1)) fails.push(`wall ${i + 1}: base value < 1`);
        // recompute the pyramid
        const rows = [base.slice()];
        while (rows[rows.length - 1].length > 1) { const p = rows[rows.length - 1]; rows.push(p.slice(0, -1).map((v, k) => v + p[k + 1])); }
        const bricks = [...w.querySelectorAll('[data-lcs-brick]')];
        const given = new Set();
        let blanks = 0;
        bricks.forEach((b) => {
          const [r, c] = b.dataset.lcsBrick.split(',').map(Number);
          if (+b.dataset.lcsValue !== rows[r][c]) fails.push(`wall ${i + 1}: brick ${r},${c} value wrong`);
          const txt = b.querySelector('text');
          if (b.dataset.lcsBlank) {
            blanks++;
            if (txt) fails.push(`wall ${i + 1}: blank brick prints text`);
            if (+b.dataset.lcsAnswer !== rows[r][c]) fails.push(`wall ${i + 1}: blank answer wrong`);
          } else {
            given.add(`${r},${c}`);
            if (!txt || +txt.textContent !== rows[r][c]) fails.push(`wall ${i + 1}: given brick text wrong`);
          }
        });
        if (rows[n - 1][0] > 20) fails.push(`wall ${i + 1}: top ${rows[n - 1][0]} > 20`);
        if (blanks < n - 1) fails.push(`wall ${i + 1}: too few blanks`);
        // the top numeral is never printed
        if (bricks.find((b) => b.dataset.lcsBrick === `${n - 1},0` && !b.dataset.lcsBlank)) fails.push(`wall ${i + 1}: top brick given`);
        // propagation solver: every brick must resolve from the givens
        const known = new Set(given); let changed = true;
        while (changed) {
          changed = false;
          for (let r = 1; r < n; r++) for (let c = 0; c < n - r; c++) {
            const up = `${r},${c}`, a = `${r - 1},${c}`, b2 = `${r - 1},${c + 1}`;
            if (!known.has(up) && known.has(a) && known.has(b2)) { known.add(up); changed = true; }
            if (known.has(up) && known.has(a) && !known.has(b2)) { known.add(b2); changed = true; }
            if (known.has(up) && known.has(b2) && !known.has(a)) { known.add(a); changed = true; }
          }
        }
        if (known.size !== bricks.length) fails.push(`wall ${i + 1}: not uniquely solvable`);
      });
      return fails;
    });
  },
};
