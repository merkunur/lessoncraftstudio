/**
 * Factory for number-neighbor tables (before/after, between, N more/N less):
 * rows of [blank][given][blank] (or given+blank pairs) in big friendly boxes.
 * mode: 'before-after' | 'between' | 'more-less'(delta)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const GIVEN = (v) => `<span class="ws-pattern-slot" style="width:84px;height:64px;font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530;background:#DDEBE8;border-color:#146B5E" data-lcs-given="${v}">${v}</span>`;
const BLANK = (ans) => `<span class="ws-answerbox" style="width:84px;height:64px" data-lcs-answer="${ans}"></span>`;
const ARROW = (label) => `<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:'Nunito';font-weight:800;font-size:13px;color:#8A8276">` +
  `<span style="font-family:'Baloo 2';font-weight:700;font-size:20px;color:#F2784B">${label}</span></span>`;

function makeNeighborsType(cfg) {
  const { id, slug, mode, delta, rangeMax, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'numeral-charts',
    exerciseType: 'number-charts',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || {
      1: { rows: 6, max: Math.min(10, rangeMax) },
      2: { rows: 6, max: rangeMax },
      3: { rows: 8, max: rangeMax },
    },
    i18n,

    build({ difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cards = [];
      const used = new Set();
      for (let i = 0; i < d.rows; i++) {
        let v;
        let guard = 0;
        const lo = mode === 'more-less' ? delta : 1;
        const hi = mode === 'more-less' ? d.max - delta : d.max - 1;
        do { v = rng.int(lo, hi); guard++; } while (used.has(v) && guard < 50);
        used.add(v);
        let row;
        if (mode === 'before-after') {
          row = BLANK(v - 1) + GIVEN(v) + BLANK(v + 1);
        } else if (mode === 'between') {
          row = GIVEN(v - 1) + BLANK(v) + GIVEN(v + 1);
        } else { // more-less
          row = BLANK(v - delta) + ARROW('−' + delta) + GIVEN(v) + ARROW('+' + delta) + BLANK(v + delta);
        }
        cards.push(`<div class="ws-card-stage" style="justify-content:center;gap:16px" data-lcs-mode="${mode}" data-lcs-delta="${delta || 1}">${row}</div>`);
      }
      const cols = d.rows > 6 ? 2 : 1;
      return { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(d.rows / cols), numbered: false }), meta: {} };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        document.querySelectorAll('[data-lcs-mode]').forEach((stage, i) => {
          const delta = parseInt(stage.dataset.lcsDelta, 10);
          const seq = [...stage.querySelectorAll('[data-lcs-given],[data-lcs-answer]')].map((el) =>
            parseInt(el.dataset.lcsGiven !== undefined ? el.dataset.lcsGiven : el.dataset.lcsAnswer, 10));
          for (let k = 1; k < seq.length; k++) {
            if (seq[k] - seq[k - 1] !== delta) fails.push(`row ${i + 1}: ${seq[k - 1]}→${seq[k]} != +${delta}`);
          }
          if (seq.some((v) => v < 0)) fails.push(`row ${i + 1}: negative value`);
          if (!stage.querySelector('[data-lcs-given]')) fails.push(`row ${i + 1}: no anchor`);
        });
        return fails;
      });
    },
  };
}

module.exports = { makeNeighborsType };
