/**
 * K-543 — Word Wall Labels (Picture Word Cards maker 2026-11-02, NEW-TEMPLATES §43 T2; L.K.6 vocabulary; material): big
 * labels for the classroom word wall or a labelled corner — each a picture and its word in large print, cut along the
 * dashed lines. The words are the theme's card words (types/_shared/picture-word-pool.js: K-324's bank rules, every
 * picture a child names otherwise refused). No answer, no key.
 * Levels: 1 six labels · 2 four labels · 3 two large labels.
 */
'use strict';
const { pictureWordPool } = require('../_shared/picture-word-pool.js');
const slot = require('../../lib/slot.js');
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660, BUDGET = 700;
const D = {
  1: { labels: 6, cols: 2 },
  2: { labels: 4, cols: 1 },
  3: { labels: 2, cols: 1 },
};

module.exports = {
  id: 'K-543',
  slug: 'word-wall-labels',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-word-cards',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Word Wall Labels', instruction: 'Cut out the labels along the dashed lines and hang them on the word wall.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const pool = pictureWordPool(theme, L, { maxLetters: d.cols === 2 ? 10 : 14 });
    if (pool.length < d.labels) throw new Error(`K-543: theme ${theme}/${L} has ${pool.length} card words (< ${d.labels})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.labels), pool, theme);   // a teacher's picture choice (maker)
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rows = Math.ceil(d.labels / d.cols), w = Math.floor(W / d.cols), h = Math.floor((BUDGET - extra) / rows);
    const pic = Math.min(h - 28, Math.floor(w * 0.36));
    const longest = Math.max(...picks.map((e) => [...e.word].length));
    const fs = Math.max(28, Math.min(Math.round(h * 0.42), Math.floor((w - pic - 60) / (longest * 0.58))));
    const html = picks.map((e, i) => `<div data-lcs-wall-label="${e.word}"${slot.attr(ctx, 'pic', i)} style="box-sizing:border-box;width:${w}px;height:${h}px;display:flex;align-items:center;gap:18px;padding:0 20px;border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}">` +
      `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${pic}px;height:${pic}px;object-fit:contain;flex:0 0 auto">` +
      `<span style="flex:1 1 auto;min-width:0;font:800 ${fs}px/1.05 Nunito,'Baloo 2',sans-serif;color:${T.ink};overflow-wrap:anywhere">${e.word}</span></div>`);
    const grid = `<div data-lcs-wall style="display:grid;grid-template-columns:repeat(${d.cols},${w}px);border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}">${html.join('')}</div>`;
    return {
      bodyHtml: `<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center">${grid}</div>`,
      meta: { words: picks.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const labels = [...document.querySelectorAll('[data-lcs-wall-label]')];
      if (labels.length < 2) fails.push(`${labels.length} labels`);
      labels.forEach((c, i) => {
        const R = c.getBoundingClientRect(), t = c.querySelector('span').getBoundingClientRect();
        if (t.right > R.right + 1 || t.bottom > R.bottom + 1) fails.push(`label ${i + 1}: the word leaves the label`);
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`label ${i + 1}: the picture did not load`);
      });
      return fails;
    });
  },
};
