/**
 * K-002 — Count and circle the correct number (1–10).
 * Asset class 1: plain icon placement. The base-layout exemplar type.
 *
 * Six problem cards; each shows N theme icons (one noun per card) and three
 * numeral chips — the child counts and circles the correct numeral.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { iconRows, fitIcons, chipRow, distractorsFor } = require('../../templates/components.js');

module.exports = {
  id: 'K-002',
  slug: 'count-and-circle-to-10',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',          // collapsed family key (Gate-1 ruling)
  themeAxis: { applicable: true, minNouns: 6, excludeBw: false },
  difficulty: {
    1: { min: 1, max: 5, cards: 4, cols: 2, rows: 2 },
    2: { min: 2, max: 10, cards: 6, cols: 2, rows: 3 },
    3: { min: 5, max: 20, cards: 6, cols: 2, rows: 3 },
  },
  i18n: {
    // exemplar-stage strings; promoted to i18n/strings.<locale>.json at fan
    en: {
      title: 'Count and Circle',
      instruction: 'Count the pictures in each box. Circle the right number.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const nouns = labelSafeNouns(theme);
    if (nouns.length < this.themeAxis.minNouns) {
      throw new Error(`K-002: theme ${theme} has ${nouns.length} nouns < min ${this.themeAxis.minNouns}`);
    }
    const pickNouns = rng.sample(nouns, d.cards);

    // counts: distinct, spread across [min,max]
    const allCounts = [];
    for (let v = d.min; v <= d.max; v++) allCounts.push(v);
    const counts = rng.sample(allCounts, d.cards);

    const cards = [];
    const truth = [];
    for (let i = 0; i < d.cards; i++) {
      const n = counts[i];
      const noun = pickNouns[i];
      // adaptive icon size: fill the card stage without crowding.
      // card inner width ≈ 300px; stage height ≈ 138px (3-row grid) / 235px (2-row).
      const fit = fitIcons({
        n, stageW: 300, stageH: d.rows === 3 ? 138 : 235,
        maxPx: d.rows === 3 ? 84 : 116,   // roomier 2-row grids earn bigger icons
      });
      const stageHtml = iconRows({ theme, noun: noun.noun, n, iconPx: fit.iconPx, perRow: fit.perRow, rng });

      // choices: correct + 2 distractors clamped to the difficulty's range
      const choices = rng.shuffle([n, ...distractorsFor({ correct: n, count: 2, min: 1, max: d.max, rng })]);

      cards.push(
        `<div class="ws-card-stage" data-lcs-count="${n}" data-lcs-noun="${noun.vocabKey}">${stageHtml}</div>` +
        chipRow({ choices, correct: n })
      );
      truth.push({ card: i + 1, count: n, noun: noun.vocabKey, choices });
    }

    return {
      bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }),
      meta: { cards: truth },
    };
  },

  /** QA: icons per card === data-lcs-count; exactly one correct chip === count. */
  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card) => {
        const stage = card.querySelector('[data-lcs-count]');
        const n = parseInt(stage.getAttribute('data-lcs-count'), 10);
        const icons = card.querySelectorAll('.ws-icon').length;
        if (icons !== n) fails.push(`card ${card.dataset.lcsCard}: ${icons} icons != count ${n}`);
        const correct = card.querySelectorAll('[data-lcs-correct]');
        if (correct.length !== 1) fails.push(`card ${card.dataset.lcsCard}: ${correct.length} correct chips`);
        else if (parseInt(correct[0].getAttribute('data-lcs-choice'), 10) !== n) {
          fails.push(`card ${card.dataset.lcsCard}: correct chip != count`);
        }
      });
      return fails;
    });
  },
};
