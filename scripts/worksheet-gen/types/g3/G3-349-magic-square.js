/**
 * G3-349 — Magic-square style: every row and column adds to the same total.
 * 3×3 with some cells blank; the magic constant is shown in a badge.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

// classic 3x3 magic square base (constant 15) — rotations/reflections via rng
const BASE = [2, 7, 6, 9, 5, 1, 4, 3, 8];

function transform(sq, rng) {
  let g = sq.slice();
  const rot = (a) => [a[6], a[3], a[0], a[7], a[4], a[1], a[8], a[5], a[2]];
  const flip = (a) => [a[2], a[1], a[0], a[5], a[4], a[3], a[8], a[7], a[6]];
  const r = rng.int(0, 3);
  for (let k = 0; k < r; k++) g = rot(g);
  if (rng.next() < 0.5) g = flip(g);
  return g;
}

module.exports = {
  id: 'G3-349',
  slug: 'magic-squares',
  gradeBand: 'G23',
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: false },
  difficulty: {
    1: { blanks: 3, offset: 0, cards: 2 },
    2: { blanks: 4, offset: 0, cards: 2 },
    3: { blanks: 5, offset: 3, cards: 2 },   // offset shifts all values (+3 → constant 24)
  },
  i18n: {
    en: { title: 'Magic Squares', instruction: 'Every row and column adds up to the magic number. Fill the empty cells.' },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      const sq = transform(BASE, rng).map((v) => v + d.offset);
      const constant = 15 + 3 * d.offset;
      // blanks: never leave a row or column fully blank
      let blanks;
      let guard = 0;
      do {
        blanks = rng.sample(sq.map((_, k) => k), d.blanks);
        guard++;
      } while (guard < 60 && [0, 1, 2].some((r) =>
        [0, 1, 2].every((c) => blanks.includes(r * 3 + c)) ||
        [0, 1, 2].every((c) => blanks.includes(c * 3 + r))));
      const cells = sq.map((v, k) => blanks.includes(k)
        ? `<span style="display:flex;align-items:center;justify-content:center">${answerBox({ w: 74, h: 74, answer: v })}</span>`
        : `<span class="ws-pattern-slot" style="width:84px;height:84px;font-family:'Baloo 2';font-weight:700;font-size:30px;color:#3A3530" data-lcs-cell="${v}">${v}</span>`
      ).join('');
      cards.push(
        `<div class="ws-card-stage" style="gap:30px" data-lcs-constant="${constant}">` +
        `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">` +
        `<span style="display:inline-flex;align-items:center;justify-content:center;width:74px;height:74px;border-radius:50%;background:#F2784B;` +
        `color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:28px" data-lcs-badge="${constant}">${constant}</span></span>` +
        `<div style="display:grid;grid-template-columns:repeat(3,auto);gap:8px" data-lcs-grid>${cells}</div>` +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.cards }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-constant]').forEach((stage, i) => {
        const constant = +stage.dataset.lcsConstant;
        const grid = [...stage.querySelector('[data-lcs-grid]').children].map((el) => {
          const box = el.querySelector('[data-lcs-answer]');
          return box ? +box.dataset.lcsAnswer : +el.dataset.lcsCell;
        });
        if (grid.length !== 9) { fails.push(`card ${i + 1}: not 3x3`); return; }
        for (let r = 0; r < 3; r++) {
          const rs = grid[r * 3] + grid[r * 3 + 1] + grid[r * 3 + 2];
          const cs = grid[r] + grid[r + 3] + grid[r + 6];
          if (rs !== constant) fails.push(`card ${i + 1}: row ${r + 1} sums ${rs} != ${constant}`);
          if (cs !== constant) fails.push(`card ${i + 1}: col ${r + 1} sums ${cs} != ${constant}`);
        }
        if (+stage.querySelector('[data-lcs-badge]').dataset.lcsBadge !== constant) fails.push(`card ${i + 1}: badge mismatch`);
      });
      return fails;
    });
  },
};
