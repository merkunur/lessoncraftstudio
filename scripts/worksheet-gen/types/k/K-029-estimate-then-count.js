/**
 * K-029 — Estimate first! Dense scatter; circle the better estimate of two.
 * The wrong option is at least ~2× off so estimation (not counting) decides.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconScatter, chipRow } = require('../../templates/components.js');

module.exports = {
  id: 'K-029',
  slug: 'estimate-how-many',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 2 },
  difficulty: {
    1: { options: [[5, 15], [10, 20]], cards: 2 },
    2: { options: [[10, 20], [10, 25], [15, 30]], cards: 2 },
    3: { options: [[15, 30], [20, 40]], cards: 2 },
  },
  i18n: {
    en: {
      title: 'Take a Good Guess!',
      instruction: 'Do not count! Circle the better guess, then check by counting.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.cards);
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      const [optA, optB] = rng.pick(d.options);
      // actual count lands near the LOWER option (±20%) or the HIGHER one
      const target = rng.next() < 0.5 ? optA : optB;
      const n = Math.max(3, Math.round(target * (0.9 + rng.next() * 0.2)));
      const correct = Math.abs(n - optA) < Math.abs(n - optB) ? optA : optB;
      cards.push(
        `<div class="ws-card-stage" data-lcs-count="${n}">` +
        iconScatter({ theme, noun: nouns[i].noun, n, w: 600, h: 250, iconPx: 40, rng }) +
        `</div>` +
        chipRow({ choices: [optA, optB], correct, size: 56 })
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.cards }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const n = parseInt(card.querySelector('[data-lcs-count]').dataset.lcsCount, 10);
        const icons = card.querySelectorAll('.ws-icon').length;
        if (icons !== n) fails.push(`card ${i + 1}: ${icons} icons != ${n}`);
        const chips = [...card.querySelectorAll('[data-lcs-choice]')].map((c) => parseInt(c.dataset.lcsChoice, 10));
        const correct = card.querySelector('[data-lcs-correct]');
        if (!correct) { fails.push(`card ${i + 1}: no correct chip`); return; }
        const cv = parseInt(correct.dataset.lcsChoice, 10);
        const best = chips.reduce((a, b) => (Math.abs(n - a) <= Math.abs(n - b) ? a : b));
        if (cv !== best) fails.push(`card ${i + 1}: marked ${cv} is not the nearer estimate of ${n}`);
      });
      return fails;
    });
  },
};
