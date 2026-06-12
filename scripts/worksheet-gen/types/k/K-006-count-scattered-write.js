/**
 * K-006 — Count the objects in a scattered group, write the number.
 * Four cards; icons scattered (not gridded) so the child must track while
 * counting; dashed write-in box for the answer.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconScatter, answerBox } = require('../../templates/components.js');

module.exports = {
  id: 'K-006',
  slug: 'count-scattered-objects',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { min: 2, max: 6, cards: 4 },
    2: { min: 4, max: 10, cards: 4 },
    3: { min: 8, max: 15, cards: 4 },
  },
  i18n: {
    en: {
      title: 'Count and Write',
      instruction: 'Count the pictures in each box. Write the number.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = rng.sample(labelSafeNouns(theme), d.cards);
    const all = [];
    for (let v = d.min; v <= d.max; v++) all.push(v);
    const counts = rng.sample(all, d.cards);

    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      const n = counts[i];
      const iconPx = n <= 6 ? 64 : (n <= 10 ? 54 : 46);
      cards.push(
        `<div class="ws-card-stage" data-lcs-count="${n}" data-lcs-noun="${nouns[i].vocabKey}">` +
        iconScatter({ theme, noun: nouns[i].noun, n, w: 290, h: 240, iconPx, rng }) +
        `</div>` +
        `<div class="ws-choices">${answerBox({ w: 84, h: 56, answer: n })}</div>`
      );
    }
    return {
      bodyHtml: cardGrid({ cards, cols: 2, rows: 2 }),
      meta: { counts },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card) => {
        const n = parseInt(card.querySelector('[data-lcs-count]').dataset.lcsCount, 10);
        const icons = card.querySelectorAll('.ws-icon').length;
        if (icons !== n) fails.push(`card ${card.dataset.lcsCard}: ${icons} icons != ${n}`);
        const box = card.querySelector('[data-lcs-answer]');
        if (!box || parseInt(box.dataset.lcsAnswer, 10) !== n) fails.push(`card ${card.dataset.lcsCard}: answer box mismatch`);
      });
      return fails;
    });
  },
};
