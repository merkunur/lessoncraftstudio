/** G2-211 — Array → multiplication sentence (class-9 exemplar). */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${ch}</span>`;

module.exports = {
  id: 'G2-211',
  slug: 'array-multiplication',
  gradeBand: 'G23',
  assetClass: 'arrays',
  exerciseType: 'arrays-multiplication',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { maxR: 3, maxC: 5, cards: 4 },
    2: { maxR: 4, maxC: 6, cards: 4 },
    3: { maxR: 5, maxC: 8, cards: 4 },
  },
  i18n: {
    en: { title: 'Rows and Columns', instruction: 'Count the rows and columns. Finish the multiplication sentence.' },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.cards);
    const cards = [];
    const used = new Set();
    for (let i = 0; i < d.cards; i++) {
      let r, c, guard = 0;
      do { r = rng.int(2, d.maxR); c = rng.int(2, d.maxC); guard++; } while (used.has(r + 'x' + c) && guard < 30);
      used.add(r + 'x' + c);
      const px = Math.min(40, Math.floor(230 / c), Math.floor(150 / r));
      const rows = [];
      for (let rr = 0; rr < r; rr++) {
        const imgs = Array.from({ length: c }, () =>
          `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" style="width:${px}px;height:${px}px">`).join('');
        rows.push(`<div class="ws-icon-row" style="gap:6px">${imgs}</div>`);
      }
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-r="${r}" data-lcs-c="${c}">` +
        `<div class="ws-icon-rows" style="gap:6px" data-lcs-array>${rows.join('')}</div>` +
        `<span style="display:inline-flex;align-items:center;gap:8px">` +
        NUM(r) + OP('×') + NUM(c) + OP('=') + answerBox({ w: 64, h: 50, answer: r * c }) + `</span></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const r = +card.querySelector('[data-lcs-r]').dataset.lcsR;
        const c = +card.querySelector('[data-lcs-r]').dataset.lcsC;
        const rows = [...card.querySelectorAll('[data-lcs-array] .ws-icon-row')];
        if (rows.length !== r) fails.push(`card ${i + 1}: ${rows.length} rows != ${r}`);
        rows.forEach((row, k) => {
          if (row.querySelectorAll('.ws-icon').length !== c) fails.push(`card ${i + 1} row ${k + 1}: cols != ${c}`);
        });
        const nums = [...card.querySelectorAll('[data-lcs-num]')].map((e) => +e.dataset.lcsNum);
        if (nums[0] !== r || nums[1] !== c) fails.push(`card ${i + 1}: printed equation != array`);
        if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== r * c) fails.push(`card ${i + 1}: product mismatch`);
      });
      return fails;
    });
  },
};
