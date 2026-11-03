/**
 * K-534 — Alphabet Cards to Order (Alphabet & Letters maker 2026-11-02, NEW-TEMPLATES §37 T6; RF.K.1.d; material):
 * the letters of the locale's alphabet on cards printed in a mixed-up order; the children cut them out along the dashed
 * lines, lay them in alphabet order and read the line (the hands-on alphabet line). The order on the page is a seeded
 * shuffle that never leaves two letters side by side as they come in the alphabet. Where the cards carry pictures, they
 * are the chart pictures (a word that starts with the letter's sound; a letter with none shows the letter alone). The
 * answer is the alphabet itself: no key.
 * Levels: 1 the first half of the alphabet, capitals with their pictures · 2 the whole alphabet, small letters · 3 the
 * whole alphabet, each card the capital and its small letter.
 */
'use strict';
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { half: true, form: 'upper', pics: true, cols: 4 },
  2: { half: false, form: 'lower', pics: false, cols: 6 },
  3: { half: false, form: 'pair', pics: false, cols: 6 },
};
const W = 660, BUDGET = 700;

module.exports = {
  id: 'K-534',
  slug: 'alphabet-cards-to-order',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'alphabetical-order',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'ABC Order Cards', instruction: 'Cut out the cards along the dashed lines. Put them in alphabet order and read the letters.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const all = A.orderAlphabetOf(L), letters = d.half ? all.slice(0, Math.ceil(all.length / 2)) : all;
    // a shuffle in which no two neighbours of the alphabet stand side by side (the order would show itself)
    let order = null;
    for (let t = 0; t < 400 && !order; t++) {
      const o = rng.shuffle(letters.map((_, i) => i));
      if (o.every((v, k) => k === 0 || Math.abs(v - o[k - 1]) !== 1)) order = o;
    }
    if (!order) throw new Error(`K-534: ${L}: no mixed order`);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rows = Math.ceil(letters.length / d.cols), w = Math.floor(W / d.cols), h = Math.floor((BUDGET - extra) / rows);
    const cards = order.map((i) => {
      const ch = letters[i], text = d.form === 'upper' ? A.inCase(ch, true, L) : d.form === 'lower' ? ch : A.inCase(ch, true, L) + ch;
      const p = d.pics ? A.pictureOf(ch, L) : null;
      const fs = Math.round(Math.min(h * (p ? 0.36 : 0.52), (w - 16) / (d.form === 'pair' ? 1.5 : 0.9)));
      const pic = p ? Math.max(0, Math.min(w - 24, h - fs - 30)) : 0;
      return `<div data-lcs-abc-card="${ch}" style="box-sizing:border-box;width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}">` +
        `<span data-lcs-card-text style="font:700 ${fs}px/1 'Baloo 2',cursive;color:${T.teal}">${text}</span>` +
        (p ? `<img class="ws-icon" src="${p.src}" alt="" data-lcs-card-pic="${p.noun}" style="width:${pic}px;height:${pic}px;object-fit:contain">` : '') + `</div>`;
    });
    const grid = `<div data-lcs-abc-cards style="display:grid;grid-template-columns:repeat(${d.cols},${w}px);border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}">${cards.join('')}</div>`;
    return { bodyHtml: `<div data-ws-content data-lcs-alphabet="${letters.join('')}" style="flex:1;display:flex;align-items:center;justify-content:center">${grid}</div>`, meta: { order: order.map((i) => letters[i]).join('') } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const want = [...document.querySelector('[data-lcs-alphabet]').dataset.lcsAlphabet];
      const cards = [...document.querySelectorAll('[data-lcs-abc-card]')].map((c) => c.dataset.lcsAbcCard);
      if (cards.slice().sort().join('') !== want.slice().sort().join('')) fails.push('the cards are not the letters of the alphabet');
      cards.forEach((c, k) => { if (k && Math.abs(want.indexOf(c) - want.indexOf(cards[k - 1])) === 1) fails.push(`cards ${k} and ${k + 1} stand in alphabet order`); });
      document.querySelectorAll('[data-lcs-abc-card]').forEach((c, k) => {
        const r = c.getBoundingClientRect(); [...c.children].forEach((x) => { const q = x.getBoundingClientRect(); if (q.left < r.left - 0.5 || q.right > r.right + 0.5 || q.top < r.top - 0.5 || q.bottom > r.bottom + 0.5) fails.push(`card ${k + 1}: something leaves the card`); });
        const im = c.querySelector('img'); if (im && (!im.complete || !im.naturalWidth)) fails.push(`card ${k + 1}: the picture did not load`);
      });
      return fails;
    });
  },
};
