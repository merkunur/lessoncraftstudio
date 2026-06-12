/**
 * Factory for number-sequence strips (count forward/backward, skip counting):
 * rows of numeral boxes with blanks the child fills. Direction and step are
 * per-type; sequences and blank positions vary per row via the seed.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

function makeNumberStripType(cfg) {
  const { id, slug, gradeBand, rangeMax, i18n, descending, len } = cfg;
  // step may vary by difficulty (e.g. G3 skip-25/50/100); resolve at build
  const stepFor = (diff) => (typeof cfg.step === 'object' ? cfg.step[diff] : cfg.step);
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'numeral-charts',
    exerciseType: 'number-charts',
    themeAxis: { applicable: true, minNouns: 1, decorative: true },
    difficulty: cfg.difficulty || {
      1: { rows: 4, blanks: 2 },
      2: { rows: 5, blanks: 3 },
      3: { rows: 5, blanks: 4 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const step = stepFor(difficulty);
      const L = len || 8;
      const cards = [];
      for (let i = 0; i < d.rows; i++) {
        // pick a start so the whole sequence stays within [0, rangeMax]
        const span = step * (L - 1);
        let start;
        if (cfg.startFixed !== undefined) {
          start = cfg.startFixed;
        } else if (descending) {
          start = rng.int(span, rangeMax);
        } else {
          start = step * rng.int(0, Math.floor((rangeMax - span) / step));
          if (step === 1) start = rng.int(Math.min(1, rangeMax - span), rangeMax - span);
        }
        const seq = Array.from({ length: L }, (_, k) => descending ? start - k * step : start + k * step);
        // blanks: never the first cell (the anchor), spread out
        const blankIdx = rng.sample(Array.from({ length: L - 1 }, (_, k) => k + 1), d.blanks);
        const cellW = Math.min(72, Math.floor(600 / L) - 6);
        const cells = seq.map((v, k) => blankIdx.includes(k)
          ? `<span class="ws-answerbox" style="width:${cellW}px;height:${cellW}px;font-size:22px" data-lcs-answer="${v}"></span>`
          : `<span class="ws-pattern-slot" style="width:${cellW}px;height:${cellW}px;font-family:'Baloo 2';font-weight:600;font-size:${Math.round(cellW * 0.38)}px;color:#3A3530" data-lcs-val="${v}">${v}</span>`
        ).join('');
        cards.push(
          `<div class="ws-card-stage" style="justify-content:center;gap:8px" data-lcs-step="${descending ? -step : step}">${cells}</div>`
        );
      }
      // small theme flourish row keeps the page warm without touching content
      const n = ctx.rng.pick(labelSafeNouns(theme));
      const flourish = `<div style="display:flex;justify-content:flex-end;padding:2px 8px">` +
        `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:44px;height:44px"></div>`;
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }) + flourish, meta: {} };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        document.querySelectorAll('[data-lcs-step]').forEach((stage, i) => {
          const step = parseInt(stage.dataset.lcsStep, 10);
          const cells = [...stage.children].map((el) =>
            parseInt(el.dataset.lcsVal !== undefined ? el.dataset.lcsVal : el.dataset.lcsAnswer, 10));
          for (let k = 1; k < cells.length; k++) {
            if (cells[k] - cells[k - 1] !== step) fails.push(`row ${i + 1}: ${cells[k - 1]}→${cells[k]} breaks step ${step}`);
          }
          if (cells.some((v) => v < 0)) fails.push(`row ${i + 1}: negative value`);
          if (!stage.querySelector('[data-lcs-answer]')) fails.push(`row ${i + 1}: no blanks`);
          if (stage.children[0].dataset.lcsAnswer !== undefined) fails.push(`row ${i + 1}: first cell is blank (no anchor)`);
        });
        return fails;
      });
    },
  };
}

module.exports = { makeNumberStripType };
