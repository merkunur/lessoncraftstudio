/**
 * K-040 — Sort by one attribute: circle ALL the big ones.
 * A scatter of one noun at two clearly distinct sizes.
 */
'use strict';
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');

module.exports = {
  id: 'K-040',
  slug: 'circle-the-big-ones',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'comparing-sizes',
  themeAxis: { applicable: true, minNouns: 3 },
  difficulty: {
    1: { big: 3, small: 4 },
    2: { big: 4, small: 5 },
    3: { big: 5, small: 7 },
  },
  i18n: {
    en: {
      title: 'Big Ones Only',
      instruction: 'Circle every BIG picture. Leave the small ones alone.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const noun = rng.pick(labelSafeNouns(theme));
    const total = d.big + d.small;
    const W = 620, H = 600;
    const cols = Math.ceil(Math.sqrt(total * (W / H))), rows = Math.ceil(total / cols);
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([c, r]);
    const chosen = rng.shuffle(cells).slice(0, total);
    const sizes = rng.shuffle([...Array(d.big).fill(96), ...Array(d.small).fill(46)]);
    const imgs = chosen.map(([c, r], i) => {
      const px = sizes[i];
      const x = c * (W / cols) + (W / cols - px) / 2 + (rng.next() * 2 - 1) * 8;
      const y = r * (H / rows) + (H / rows - px) / 2 + (rng.next() * 2 - 1) * 6;
      return `<img class="ws-icon" src="${fileUri(theme, noun.noun)}" alt="" data-lcs-size="${px === 96 ? 'big' : 'small'}"` +
        `${px === 96 ? ' data-lcs-target="1"' : ''} ` +
        `style="position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${px}px;height:${px}px">`;
    });
    return {
      bodyHtml:
        `<div class="ws-scene" style="justify-content:center">` +
        `<div style="position:relative;width:${W}px;height:${H}px" data-lcs-big="${d.big}" data-lcs-small="${d.small}">${imgs.join('')}</div>` +
        `</div>`,
      meta: { big: d.big, small: d.small, noun: noun.vocabKey },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const stage = document.querySelector('[data-lcs-big]');
      const want = { big: parseInt(stage.dataset.lcsBig, 10), small: parseInt(stage.dataset.lcsSmall, 10) };
      const bigs = stage.querySelectorAll('[data-lcs-size="big"]').length;
      const smalls = stage.querySelectorAll('[data-lcs-size="small"]').length;
      if (bigs !== want.big) fails.push(`${bigs} big != ${want.big}`);
      if (smalls !== want.small) fails.push(`${smalls} small != ${want.small}`);
      stage.querySelectorAll('[data-lcs-target]').forEach((el) => {
        if (el.dataset.lcsSize !== 'big') fails.push('target marked on a small icon');
      });
      return fails;
    });
  },
};
