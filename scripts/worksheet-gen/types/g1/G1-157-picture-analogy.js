/**
 * G1-157 — Picture analogy: A is to B as C is to ? (size relation —
 * visual and language-neutral: big-X : small-X :: big-Y : small-Y).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const BIG = 64, SMALL = 36;

module.exports = {
  id: 'G1-157',
  slug: 'picture-analogies',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: true, minNouns: 6 },
  difficulty: {
    1: { rows: 4 },
    2: { rows: 4 },
    3: { rows: 5 },
  },
  i18n: {
    en: {
      title: 'Picture Puzzles',
      instruction: 'Look at the first pair. Circle what completes the second pair the same way.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const pool = labelSafeNouns(theme);
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const [x, y, z] = rng.sample(pool, 3);
      const bigToSmall = rng.next() < 0.5;
      const slot = (noun, px, extra) =>
        `<span class="ws-pattern-slot" style="width:78px;height:78px"${extra || ''}>` +
        `<img class="ws-icon" src="${fileUri(theme, noun.noun)}" alt="" style="width:${px}px;height:${px}px"></span>`;
      const colon = `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#C8BFAE;flex:0 0 auto">:</span>`;
      const dcolon = `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#F2784B;flex:0 0 auto">::</span>`;
      const p1 = bigToSmall ? [BIG, SMALL] : [SMALL, BIG];
      // choices: correct = y at the analogous size; distractors: y at the wrong size, z
      const correctPx = p1[1];
      const chips = rng.shuffle([
        { noun: y, px: correctPx, ok: true },
        { noun: y, px: p1[0], ok: false },
        { noun: z, px: correctPx, ok: false },
      ]).map((c) =>
        `<span class="ws-pattern-chip" style="width:74px;height:74px"${c.ok ? ' data-lcs-correct="1"' : ''} ` +
        `data-lcs-opt="${c.noun.vocabKey}-${c.px}">` +
        `<img class="ws-icon" src="${fileUri(theme, c.noun.noun)}" alt="" style="width:${Math.min(c.px, 54)}px;height:${Math.min(c.px, 54)}px"></span>`).join('');

      cards.push(
        `<div class="ws-card-stage" style="justify-content:space-between;padding:6px 8px" data-lcs-rel="${bigToSmall ? 'big-small' : 'small-big'}" data-lcs-expect="${y.vocabKey}-${correctPx}">` +
        `<span style="display:inline-flex;align-items:center;gap:8px">` +
        slot(x, p1[0]) + colon + slot(x, p1[1]) + dcolon + slot(y, p1[0]) + colon +
        `<span class="ws-pattern-slot ws-pattern-slot--blank" style="width:78px;height:78px">?</span></span>` +
        `<span class="ws-pattern-choices">${chips}</span>` +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-expect]').forEach((stage, i) => {
        const correct = [...stage.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
        if (correct[0].dataset.lcsOpt !== stage.dataset.lcsExpect) fails.push(`row ${i + 1}: correct chip != expected analogy completion`);
        const opts = [...stage.querySelectorAll('.ws-pattern-chip')].map((c) => c.dataset.lcsOpt);
        if (new Set(opts).size !== opts.length) fails.push(`row ${i + 1}: duplicate options`);
      });
      return fails;
    });
  },
};
