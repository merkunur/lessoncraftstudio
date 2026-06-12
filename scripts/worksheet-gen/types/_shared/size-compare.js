/**
 * Factory for the size-comparison family:
 *  - circle-superlative: circle the biggest/smallest/tallest/longest (K-032/035/037)
 *  - order-by-size: write 1..N under the icons, smallest→biggest (K-033/034/036)
 * Same-noun icons at distinct uniform scales, baseline-aligned so the size
 * relation reads truthfully (art is never stretched).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');

/** Distinct visual scales, ratio >= 1.3 between neighbors so K eyes rank them. */
const SCALE_LADDER = [0.42, 0.58, 0.76, 1.0, 1.3];

function makeSizeCompareType(cfg) {
  const { id, slug, mode, target, rows, itemsPerRow, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'comparing-sizes',
    themeAxis: { applicable: true, minNouns: rows },
    difficulty: {
      1: { rows, items: itemsPerRow[0] },
      2: { rows, items: itemsPerRow[1] || itemsPerRow[0] + 1 },
      3: { rows, items: itemsPerRow[2] || itemsPerRow[1] || itemsPerRow[0] + 2 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const nouns = rng.sample(labelSafeNouns(theme), d.rows);
      // largest item fills the card stage (~200px tall for 3 stacked cards);
      // order mode reserves room for the write-in box below each icon
      const basePx = mode === 'order' ? 120 : 150;
      const cards = [];
      const truth = [];
      for (let i = 0; i < d.rows; i++) {
        // consecutive ladder steps normalized so the largest = 1.0 (full base size)
        const steps = SCALE_LADDER.slice(0, d.items);
        const maxStep = Math.max(...steps);
        const scales = rng.shuffle(steps.map((s) => Math.round((s / maxStep) * 100) / 100));
        const targetIdx = target === 'largest'
          ? scales.indexOf(Math.max(...scales))
          : scales.indexOf(Math.min(...scales));
        const rank = scales.map((s) => [...scales].sort((a, b) => a - b).indexOf(s) + 1);

        const items = scales.map((s, k) => {
          const px = Math.round(basePx * s);
          const img = `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" ` +
            `style="width:${px}px;height:${px}px"${mode === 'circle' && k === targetIdx ? ' data-lcs-target="1"' : ''} data-lcs-scale="${s}">`;
          if (mode === 'order') {
            return `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px;justify-content:flex-end">` +
              `<span style="display:flex;align-items:flex-end;height:${Math.round(basePx * 1.3)}px">${img}</span>` +
              answerBox({ w: 46, h: 40, answer: rank[k] }) + `</span>`;
          }
          return `<span style="display:flex;align-items:flex-end;height:${Math.round(basePx * 1.3)}px">${img}</span>`;
        });

        cards.push(
          `<div class="ws-card-stage" style="justify-content:space-evenly;align-items:flex-end;padding:10px" ` +
          `data-lcs-mode="${mode}" data-lcs-targetscale="${target === 'largest' ? Math.max(...scales) : Math.min(...scales)}">` +
          items.join('') + `</div>`
        );
        truth.push({ row: i + 1, scales, targetIdx, rank });
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: { rows: truth } };
    },

    async verify(page) {
      const m = mode, tgt = target;
      return page.evaluate(({ mode, target }) => {
        const fails = [];
        document.querySelectorAll('[data-lcs-mode]').forEach((stage, i) => {
          const icons = [...stage.querySelectorAll('.ws-icon')];
          const scales = icons.map((el) => parseFloat(el.dataset.lcsScale));
          if (new Set(scales).size !== scales.length) fails.push(`row ${i + 1}: duplicate scales`);
          if (mode === 'circle') {
            const t = icons.find((el) => el.dataset.lcsTarget);
            if (!t) { fails.push(`row ${i + 1}: no target`); return; }
            const ts = parseFloat(t.dataset.lcsScale);
            const expected = target === 'largest' ? Math.max(...scales) : Math.min(...scales);
            if (ts !== expected) fails.push(`row ${i + 1}: target scale ${ts} != ${expected}`);
          } else {
            const boxes = [...stage.querySelectorAll('[data-lcs-answer]')].map((b) => parseInt(b.dataset.lcsAnswer, 10));
            const sorted = scales.map((s) => [...scales].sort((a, b) => a - b).indexOf(s) + 1);
            if (boxes.join() !== sorted.join()) fails.push(`row ${i + 1}: rank labels wrong`);
          }
        });
        return fails;
      }, { mode: m, target: tgt });
    },
  };
}

module.exports = { makeSizeCompareType, SCALE_LADDER };
