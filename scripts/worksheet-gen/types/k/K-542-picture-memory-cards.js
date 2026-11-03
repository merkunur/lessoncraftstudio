/**
 * K-542 — Picture Memory Cards (Picture Word Cards maker 2026-11-02, NEW-TEMPLATES §43 T1; vocabulary / RF.K.3.c; game):
 * cards to cut out and play Memory — level 1 two of each picture (picture–picture, no reading), levels 2-3 a picture
 * and its word (picture–word). The words are the theme's card words (types/_shared/picture-word-pool.js: K-324's bank
 * rules, every picture a child names otherwise refused). On the screen the child taps the two cards of a pair; the key
 * numbers the two cards of each pair alike.
 * Levels: 1 six pairs, two of each picture · 2 eight pairs, picture and word · 3 ten pairs, picture and word.
 */
'use strict';
const { pictureWordPool, sampleMatchable, matchableSlots } = require('../_shared/picture-word-pool.js');
const slot = require('../../lib/slot.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { keyNumber } = require('../_shared/key-number.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660, BUDGET = 700;
const D = {
  1: { pairs: 6, cols: 3, kind: 'picture' },
  2: { pairs: 8, cols: 4, kind: 'word' },
  3: { pairs: 10, cols: 4, kind: 'word' },
};

module.exports = {
  id: 'K-542',
  slug: 'picture-memory-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-word-cards',
  themeAxis: { applicable: true, minNouns: 10, excludeBw: true },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Picture Memory Cards', instruction: 'Cut out the cards and turn them face down. Turn over two cards: if they go together, keep them!' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const pool = pictureWordPool(theme, L);
    if (pool.length < d.pairs) throw new Error(`K-542: theme ${theme}/${L} has ${pool.length} card words (< ${d.pairs})`);
    const drawn = sampleMatchable(pool, d.pairs, rng);
    if (drawn.length < d.pairs) throw new Error(`K-542: theme ${theme}/${L} has ${drawn.length} pictures that cannot be confused (< ${d.pairs})`);
    const picks = matchableSlots(ctx, drawn, pool, theme);   // a teacher's picture choice (maker), else as drawn
    const cards = rng.shuffle(picks.flatMap((e, i) => [{ e, i, side: 'pic' }, { e, i, side: d.kind === 'picture' ? 'pic2' : 'word' }]));
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rows = Math.ceil(cards.length / d.cols), w = Math.floor(W / d.cols), h = Math.floor((BUDGET - extra) / rows);
    const pic = Math.max(48, Math.min(w - 26, h - 22));
    const fs = Math.min(30, Math.floor((w - 20) / Math.max(5, ...picks.map((e) => [...e.word].length)) * 1.7));
    const html = cards.map(({ e, i, side }) => {
      const mk = scr ? (side === 'pic' ? ` data-lcs-key-badge="p${i + 1}"` : ` data-lcs-pair="p${i + 1}"`) : '';
      const inner = side === 'word'
        ? `<span style="font:700 ${fs}px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center;overflow-wrap:anywhere;padding:0 8px">${e.word}</span>`
        : `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${pic}px;height:${pic}px;object-fit:contain">`;
      return `<div data-lcs-memory-card="${e.vocabKey}" data-lcs-side="${side}"${mk}${side === 'pic' ? slot.attr(ctx, 'pic', i) : ''} style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}">` +
        (key ? keyNumber(i + 1) : '') + inner + `</div>`;
    });
    const grid = `<div data-lcs-memory style="display:grid;grid-template-columns:repeat(${d.cols},${w}px);border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}">${html.join('')}</div>`;
    return {
      bodyHtml: `<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center">${grid}</div>`,
      meta: { kind: d.kind, words: picks.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-memory-card]')];
      if (cards.length < 12) fails.push(`${cards.length} cards`);
      const by = {}; cards.forEach((c) => { by[c.dataset.lcsMemoryCard] = (by[c.dataset.lcsMemoryCard] || 0) + 1; });
      Object.entries(by).forEach(([k, n]) => { if (n !== 2) fails.push(`${k}: ${n} cards`); });
      cards.forEach((c, i) => {
        const R = c.getBoundingClientRect();
        c.querySelectorAll('img,span').forEach((x) => { const r = x.getBoundingClientRect(); if (r.width && (r.right > R.right + 1 || r.bottom > R.bottom + 1 || r.left < R.left - 1)) fails.push(`card ${i + 1}: its content leaves the card`); });
        const im = c.querySelector('img'); if (im && (!im.complete || !im.naturalWidth)) fails.push(`card ${i + 1}: the picture did not load`);
      });
      return [...new Set(fails)];
    });
  },
};
