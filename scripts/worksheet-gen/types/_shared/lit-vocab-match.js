/**
 * Factory: LITERACY vocab-match — two columns; a printed WORD on the left, its
 * PICTURE on the right (deranged); the child draws a line from each word to the
 * picture it names. (Mode 'word-picture'; the read-the-word ↔ meaning skill.)
 *
 * NATIVE-PER-LANGUAGE: each locale's words come from its gated
 * approved-words-<locale>.json pool, paired with the noun's picture. The word
 * is the locale word ("Katze" with a cat picture in de); authored per locale.
 *
 * cfg: { id, slug, gradeBand, exerciseType, [mode], data, i18n, [difficulty] }
 *   data = { pairs: { en:[{theme,noun,word}], … } }
 *
 * Cores untouched: borrows .ws-match / .ws-match-col / .ws-match-item /
 * .ws-match-dot; word-tile CSS scoped inline. themeAxis OFF; pair sample +
 * derangement = variety.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');

const SCOPED_CSS = `
.lit-vm-word{display:flex;align-items:center;justify-content:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;font-family:'Baloo 2',cursive;font-weight:700;color:#146B5E}
`;

function makeLitVocabMatch(cfg) {
  const pairsByLocale = (cfg.data && cfg.data.pairs) || {};
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'picture-vocabulary',
    mode: cfg.mode || 'word-picture',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { pairs: 5 }, 2: { pairs: 6 }, 3: { pairs: 7 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const all = pairsByLocale[locale] || pairsByLocale.en || [];
      const n = Math.min(d.pairs, all.length);
      const pairs = rng.sample(all, n);

      let order;
      do { order = rng.shuffle(pairs.map((_, i) => i)); }
      while (n > 1 && order.some((v, i) => v === i));

      const itemH = Math.floor((720 - (n - 1) * 16) / n);
      const iconPx = Math.min(96, itemH - 26);
      const wordFs = Math.min(34, Math.round(itemH * 0.34));

      const left = pairs.map((p) =>
        `<div class="ws-match-item" style="width:230px;height:${itemH}px" data-lit-left="${p.noun}">` +
        `<span class="lit-vm-word" data-lit-content style="min-width:150px;height:${Math.min(64, itemH - 24)}px;` +
        `padding:0 16px;font-size:${wordFs}px">${p.word}</span>` +
        `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');

      const right = order.map((srcIdx) => {
        const p = pairs[srcIdx];
        return `<div class="ws-match-item ws-match-item--plain" style="width:200px;height:${itemH}px" data-lit-right="${p.noun}">` +
          `<span class="ws-match-dot ws-match-dot--left"></span>` +
          `<img class="ws-icon" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${iconPx}px;height:${iconPx}px"></div>`;
      }).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="ws-match" style="padding:6px 44px">` +
          `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
        meta: { mode: this.mode, pairs: pairs.map((p) => p.word + '→' + p.noun) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const left = [...document.querySelectorAll('[data-lit-left]')].map((e) => e.dataset.litLeft);
        const right = [...document.querySelectorAll('[data-lit-right]')].map((e) => e.dataset.litRight);
        if (left.length < 4) fails.push('fewer than 4 word-picture pairs');
        if (left.length !== right.length) fails.push('column length mismatch');
        if ([...left].sort().join() !== [...right].sort().join()) fails.push('right column not a permutation of left');
        left.forEach((v, i) => { if (right[i] === v) fails.push(`row ${i + 1}: word sits straight across from its picture`); });
        return fails;
      });
    },
  };
}

module.exports = { makeLitVocabMatch };
