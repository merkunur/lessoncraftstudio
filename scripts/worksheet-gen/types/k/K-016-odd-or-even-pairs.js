/**
 * K-016 — Odd or even? Pair the pictures (two-column pairing layout makes the
 * leftover visible), then circle the answer chip. Chip labels are the only
 * localized words beyond the instruction.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'K-016',
  slug: 'odd-or-even-pictures',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { min: 2, max: 7, cards: 4 },
    2: { min: 4, max: 10, cards: 4 },
    3: { min: 6, max: 13, cards: 4 },
  },
  i18n: {
    en: {
      title: 'Odd or Even?',
      instruction: 'Pair them up! If one is left over, the number is odd.',
      odd: 'odd',
      even: 'even',
    },
    // Non-EN blocks carry ONLY the extra chip words (title/instruction resolve
    // via i18n/strings.<locale>.json; build() reads odd/even from here).
    de: { odd: 'ungerade', even: 'gerade' },
    es: { odd: 'impar', even: 'par' },
    nl: { odd: 'oneven', even: 'even' },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const s = (this.i18n[locale] || this.i18n.en);
    const nouns = rng.sample(labelSafeNouns(theme), d.cards);
    const all = [];
    for (let v = d.min; v <= d.max; v++) all.push(v);
    const counts = rng.sample(all, d.cards);

    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      const n = counts[i];
      const px = 40;
      // pairs stacked as 2-icon columns; the leftover (odd) stands alone
      const pairCols = [];
      for (let k = 0; k < Math.floor(n / 2); k++) {
        pairCols.push(
          `<span style="display:inline-flex;flex-direction:column;gap:4px;padding:5px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:10px">` +
          `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" style="width:${px}px;height:${px}px">` +
          `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" style="width:${px}px;height:${px}px"></span>`
        );
      }
      if (n % 2 === 1) {
        pairCols.push(
          `<span style="display:inline-flex;flex-direction:column;gap:4px;padding:5px;border:2.5px dashed #F2784B;border-radius:10px" data-lcs-leftover="1">` +
          `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" style="width:${px}px;height:${px}px"></span>`
        );
      }
      const isOdd = n % 2 === 1;
      const chips =
        `<span class="ws-chip" style="width:auto;min-width:64px;height:40px;font-size:17px;border-radius:20px;padding:0 14px"` +
        `${isOdd ? ' data-lcs-correct="1"' : ''} data-lcs-val="odd">${s.odd}</span>` +
        `<span class="ws-chip" style="width:auto;min-width:64px;height:40px;font-size:17px;border-radius:20px;padding:0 14px"` +
        `${!isOdd ? ' data-lcs-correct="1"' : ''} data-lcs-val="even">${s.even}</span>`;

      cards.push(
        `<div class="ws-card-stage" data-lcs-count="${n}" style="gap:8px;flex-wrap:wrap;align-content:center">${pairCols.join('')}</div>` +
        `<div class="ws-choices" style="gap:10px">` +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#3A3530;align-self:center" data-lcs-num="${n}">${n}</span>` +
        `<span style="align-self:center;color:#C8BFAE">→</span>` + chips + `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: { counts } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const n = parseInt(card.querySelector('[data-lcs-count]').dataset.lcsCount, 10);
        const icons = card.querySelectorAll('.ws-icon').length;
        if (icons !== n) fails.push(`card ${i + 1}: ${icons} icons != ${n}`);
        const printed = parseInt(card.querySelector('[data-lcs-num]').dataset.lcsNum, 10);
        if (printed !== n) fails.push(`card ${i + 1}: printed numeral != count`);
        const leftover = card.querySelectorAll('[data-lcs-leftover]').length;
        if ((n % 2 === 1) !== (leftover === 1)) fails.push(`card ${i + 1}: leftover marking wrong`);
        const correct = [...card.querySelectorAll('.ws-chip')].filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) fails.push(`card ${i + 1}: ${correct.length} correct chips`);
        else {
          const expect = n % 2 === 1 ? 'odd' : 'even';
          if (correct[0].dataset.lcsVal !== expect) fails.push(`card ${i + 1}: chip ${correct[0].dataset.lcsVal} != ${expect}`);
        }
      });
      return fails;
    });
  },
};
