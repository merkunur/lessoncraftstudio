/**
 * K-031 — Which is 1st, 2nd, 3rd? Under three of the row's pictures sits an
 * empty circle; the child writes that picture's position (counting from the
 * arrow). Numerals only — language-neutral by construction.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const ARROW_SVG =
  '<svg width="30" height="30" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<path d="M4 17h20M16 8l9 9-9 9" fill="none" stroke="#F2784B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

module.exports = {
  id: 'K-031',
  slug: 'write-the-position',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: {
    1: { rowLen: 5, rows: 3, asks: 2 },
    2: { rowLen: 6, rows: 3, asks: 3 },
    3: { rowLen: 8, rows: 3, asks: 3 },
  },
  i18n: {
    en: {
      title: 'What Position?',
      instruction: 'Start at the arrow. Write each marked picture’s position in its circle.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.rows);
    const iconPx = Math.min(60, Math.floor((480 - (d.rowLen - 1) * 10) / d.rowLen));
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const asked = ctx.rng.sample(Array.from({ length: d.rowLen }, (_, k) => k), d.asks);
      const items = [];
      for (let k = 0; k < d.rowLen; k++) {
        const circle = asked.includes(k)
          ? `<span class="ws-answerbox" style="width:40px;height:40px;border-radius:50%" data-lcs-answer="${k + 1}"></span>`
          : `<span style="width:40px;height:40px"></span>`;
        items.push(
          `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">` +
          `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px">` +
          circle + `</span>`
        );
      }
      cards.push(
        `<div class="ws-card-stage" style="gap:14px;padding:6px 10px" data-lcs-rowlen="${d.rowLen}">` +
        `<span style="flex:0 0 auto">${ARROW_SVG}</span>` +
        `<span style="flex:1 1 auto;display:flex;justify-content:space-evenly;min-width:0">${items.join('')}</span>` +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-rowlen]').forEach((stage, i) => {
        const len = parseInt(stage.dataset.lcsRowlen, 10);
        const cols = [...stage.querySelectorAll('img')].length;
        if (cols !== len) fails.push(`row ${i + 1}: ${cols} icons != ${len}`);
        const wrappers = [...stage.querySelectorAll('span')].filter((s) => s.querySelector(':scope > img'));
        stage.querySelectorAll('[data-lcs-answer]').forEach((box) => {
          const declared = parseInt(box.dataset.lcsAnswer, 10);
          const wrap = box.closest('span').parentElement ? box.parentElement : null;
          const idx = wrappers.indexOf(wrap);
          if (idx !== -1 && idx + 1 !== declared) fails.push(`row ${i + 1}: circle declares ${declared}, sits at ${idx + 1}`);
        });
      });
      return fails;
    });
  },
};
