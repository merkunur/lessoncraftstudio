/**
 * K-030 — Ordinal position: circle the Nth object in the row.
 * Each row: a coral start-arrow, a row of icons, and a teal position badge
 * showing "N." — the child counts from the arrow and circles the Nth icon.
 * Language-neutral by construction: the numeral badge carries the task.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { fileUri } = require('../../image-cache/resolve.js');

const ARROW_SVG =
  '<svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<path d="M4 17h20M16 8l9 9-9 9" fill="none" stroke="#F2784B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

module.exports = {
  id: 'K-030',
  slug: 'ordinal-positions',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { rowLen: 5, rows: 4, maxOrdinal: 5 },
    2: { rowLen: 7, rows: 4, maxOrdinal: 7 },
    3: { rowLen: 9, rows: 5, maxOrdinal: 9 },
  },
  i18n: {
    en: {
      title: 'First, Second, Third…',
      instruction: 'Start at the arrow. Circle the picture at the position shown.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.rows);
    const cards = [];
    const truth = [];
    const iconPx = Math.min(58, Math.floor((430 - (d.rowLen - 1) * 8) / d.rowLen));
    for (let i = 0; i < d.rows; i++) {
      const ordinal = rng.int(2, d.maxOrdinal);   // 1st is too easy even for K
      const icons = [];
      for (let k = 0; k < d.rowLen; k++) {
        icons.push(`<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" ` +
          `style="width:${iconPx}px;height:${iconPx}px"${k === ordinal - 1 ? ' data-lcs-nth="1"' : ''}>`);
      }
      cards.push(
        `<div class="ws-card-stage" style="padding:6px 10px;gap:16px" data-lcs-ordinal="${ordinal}" data-lcs-rowlen="${d.rowLen}">` +
        `<span style="flex:0 0 auto;display:flex;align-items:center;gap:8px">` +
        `<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;` +
        `background:#146B5E;color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:22px">${ordinal}.</span>` +
        `${ARROW_SVG}</span>` +
        `<span style="flex:1 1 auto;display:flex;align-items:center;justify-content:space-evenly;min-width:0">${icons.join('')}</span>` +
        `</div>`
      );
      truth.push({ row: i + 1, ordinal });
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: { rows: truth } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-ordinal]').forEach((stage, i) => {
        const ord = parseInt(stage.dataset.lcsOrdinal, 10);
        const len = parseInt(stage.dataset.lcsRowlen, 10);
        const icons = [...stage.querySelectorAll('.ws-icon')];
        if (icons.length !== len) fails.push(`row ${i + 1}: ${icons.length} icons != ${len}`);
        if (ord < 1 || ord > len) fails.push(`row ${i + 1}: ordinal ${ord} out of range`);
        const nth = icons.findIndex((el) => el.dataset.lcsNth);
        if (nth !== ord - 1) fails.push(`row ${i + 1}: marked icon at ${nth + 1} != ordinal ${ord}`);
      });
      return fails;
    });
  },
};
