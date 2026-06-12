/**
 * K-069 — Visual closure: which whole picture matches the part?
 * Prompt shows only the top portion of an icon (clipped); the child circles
 * the matching whole picture among three choices.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'K-069',
  slug: 'visual-closure',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-discrimination',
  themeAxis: { applicable: true, minNouns: 8 },
  difficulty: {
    1: { rows: 4, visible: 0.6 },
    2: { rows: 4, visible: 0.5 },
    3: { rows: 5, visible: 0.4 },
  },
  i18n: {
    en: {
      title: 'What Is It?',
      instruction: 'Only part of the picture is showing. Circle the whole picture it belongs to.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const pool = labelSafeNouns(theme);
    const px = 76;
    const cards = [];
    for (let i = 0; i < d.rows; i++) {
      const [target, d1, d2] = rng.sample(pool, 3);
      const clipH = Math.round(px * d.visible);
      const prompt =
        `<span class="ws-pattern-slot" style="width:${px + 30}px;height:${px + 30}px" data-lcs-part="${target.vocabKey}">` +
        `<span style="display:block;width:${px}px;height:${clipH}px;overflow:hidden">` +
        `<img class="ws-icon" src="${fileUri(theme, target.noun)}" alt="" style="width:${px}px;height:${px}px;display:block"></span></span>`;
      const chips = rng.shuffle([target, d1, d2]).map((n) =>
        `<span class="ws-pattern-chip" style="width:${px + 18}px;height:${px + 18}px"` +
        `${n.vocabKey === target.vocabKey ? ' data-lcs-correct="1"' : ''} data-lcs-opt="${n.vocabKey}">` +
        `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:${px - 8}px;height:${px - 8}px"></span>`).join('');
      cards.push(
        `<div class="ws-card-stage" style="justify-content:space-between;padding:6px 14px">` +
        prompt + `<span class="ws-pattern-choices">${chips}</span></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const part = card.querySelector('[data-lcs-part]');
        const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
        if (correct[0].dataset.lcsOpt !== part.dataset.lcsPart) fails.push(`row ${i + 1}: correct chip != clipped noun`);
        // the clip wrapper must actually hide part of the image
        const wrap = part.querySelector('span');
        const img = wrap.querySelector('img');
        if (wrap.getBoundingClientRect().height >= img.getBoundingClientRect().height - 2) {
          fails.push(`row ${i + 1}: prompt is not actually clipped`);
        }
      });
      return fails;
    });
  },
};
