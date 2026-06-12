/**
 * K-012 — One-to-one correspondence: connect each animal to one food.
 * Two rows (primary theme on top, partner theme below), equal counts;
 * the child draws one line per pair. Cross-theme by design.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

const PARTNER = { fruits: 'animals' };   // default partner is fruits unless the page theme IS fruits

module.exports = {
  id: 'K-012',
  slug: 'one-to-one-matching',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'counting-pictures',
  themeAxis: { applicable: true, minNouns: 1 },
  difficulty: {
    1: { n: 4 },
    2: { n: 5 },
    3: { n: 6 },
  },
  i18n: {
    en: {
      title: 'One for Each',
      instruction: 'Give each one a partner. Draw a line to connect them one by one.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const partnerTheme = PARTNER[theme] || 'fruits';
    const top = rng.pick(labelSafeNouns(theme));
    const bottom = rng.pick(labelSafeNouns(partnerTheme));
    const px = Math.min(92, Math.floor((620 - (d.n - 1) * 18) / d.n));

    const row = (th, noun, role) =>
      `<div style="display:flex;justify-content:space-evenly;align-items:center" data-lcs-row="${role}">` +
      Array.from({ length: d.n }, () =>
        `<span class="ws-pattern-slot" style="width:${px + 22}px;height:${px + 22}px">` +
        `<img class="ws-icon" src="${fileUri(th, noun.noun)}" alt="" style="width:${px}px;height:${px}px"></span>`).join('') +
      `</div>`;

    return {
      bodyHtml:
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;min-height:0" data-lcs-n="${d.n}">` +
        row(theme, top, 'top') +
        row(partnerTheme, bottom, 'bottom') +
        `</div>`,
      meta: { n: d.n, top: top.vocabKey, bottom: bottom.vocabKey },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const wrap = document.querySelector('[data-lcs-n]');
      const n = parseInt(wrap.dataset.lcsN, 10);
      ['top', 'bottom'].forEach((role) => {
        const row = wrap.querySelector(`[data-lcs-row="${role}"]`);
        const c = row.querySelectorAll('.ws-icon').length;
        if (c !== n) fails.push(`${role} row has ${c} icons != ${n}`);
        const srcs = new Set([...row.querySelectorAll('.ws-icon')].map((el) => el.src));
        if (srcs.size !== 1) fails.push(`${role} row mixes nouns`);
      });
      return fails;
    });
  },
};
