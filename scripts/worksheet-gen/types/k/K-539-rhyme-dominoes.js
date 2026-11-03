/**
 * K-539 — Rhyme Dominoes (Rhyming Words maker 2026-11-02, NEW-TEMPLATES §39 T3; RF.K.2.a; material / game): dominoes to
 * cut out, each with two pictures; the children lay them in a ring so that the right picture of each domino rhymes with
 * the left picture of the next. The chain is built over the reviewed rhyme bank's classes BY SOUND (data/b3/rhyming-
 * words.js + data/b3/locales, every picture opened): a ring of N dominoes uses N classes, each with two pictures — one
 * on the right of a domino, the other on the left of the next — so every half has exactly one rhyming partner on the
 * page and the two pictures of one domino never rhyme. The dominoes are printed mixed up (never two neighbours of the
 * ring side by side). Level 1 prints each picture's word under it.
 * On the screen the child joins each right half to the left half it rhymes with; the key numbers the dominoes in ring
 * order.
 * Levels: 1 six dominoes, words under the pictures · 2 eight dominoes · 3 ten dominoes.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { keyNumber } = require('../_shared/key-number.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660, BUDGET = 700;
const D = {
  1: { tiles: 6, words: true },
  2: { tiles: 8, words: false },
  3: { tiles: 10, words: false },
};

module.exports = {
  id: 'K-539',
  slug: 'rhyme-dominoes',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'rhyming-words',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Rhyme Dominoes', instruction: 'Cut out the dominoes. Lay them in a ring: the picture on the right of each domino rhymes with the picture on the left of the next one.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const R = bank('rhyming-words', L);
    const ok = (m) => m && m.pic && m.picOpened;
    const classes = rng.shuffle((R.classes || []).filter((c) => c.members.filter(ok).length >= 2));
    if (classes.length < d.tiles) throw new Error(`K-539: ${L} has ${classes.length} rhyme classes (< ${d.tiles})`);
    const ring = classes.slice(0, d.tiles).map((c) => ({ id: c.id, two: rng.sample(c.members.filter(ok), 2) }));
    // domino i: left = the second picture of class i-1, right = the first picture of class i
    const tiles = ring.map((c, i) => ({ pos: i, left: ring[(i + ring.length - 1) % ring.length].two[1], right: c.two[0], lcls: ring[(i + ring.length - 1) % ring.length].id, rcls: c.id }));
    let order = null;
    for (let t = 0; t < 400 && !order; t++) {
      const o = rng.shuffle(tiles.map((_, i) => i));
      if (o.every((v, k) => k === 0 || (Math.abs(v - o[k - 1]) !== 1 && Math.abs(v - o[k - 1]) !== tiles.length - 1))) order = o;
    }
    if (!order) throw new Error(`K-539: ${L}: no mixed order`);
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const cols = 2, rows = Math.ceil(tiles.length / cols), gap = 18;
    const tw = Math.floor((W - gap) / cols), th = Math.min(150, Math.floor((BUDGET - extra - gap * (rows - 1)) / rows));
    const pic = Math.max(44, Math.min(Math.floor(tw / 2) - 24, th - (d.words ? 46 : 22)));
    const half = (m, mk) => `<div${mk} style="flex:1 1 0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:0">` +
      `<img class="ws-icon" src="${fileUri(m.pic.theme, m.pic.noun)}" alt="" style="width:${pic}px;height:${pic}px;object-fit:contain">` +
      (d.words ? `<span style="font:700 20px/1 'Baloo 2',cursive;color:${T.ink}">${m.word}</span>` : '') + `</div>`;
    const html = order.map((i) => {
      const t = tiles[i];
      return `<div data-lcs-domino="${t.pos}" data-lcs-left="${t.lcls}" data-lcs-right="${t.rcls}" style="position:relative;box-sizing:border-box;width:${tw}px;height:${th}px;display:flex;align-items:stretch;border:2.5px dashed ${T.grid};border-radius:14px;background:#FFFFFF">` +
        (key ? keyNumber(t.pos + 1) : '') +
        half(t.left, scr ? ` data-lcs-pair="${t.lcls}"` : '') +
        `<div style="width:0;border-left:3px solid ${T.teal};margin:12px 0"></div>` +
        half(t.right, scr ? ` data-lcs-key-badge="${t.rcls}"` : '') + `</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center"><div data-lcs-dominoes style="display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:${gap}px">${html.join('')}</div></div>`,
      meta: { ring: tiles.map((t) => `${t.left.word}|${t.right.word}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const tiles = [...document.querySelectorAll('[data-lcs-domino]')];
      if (tiles.length < 6) fails.push(`${tiles.length} dominoes`);
      const lefts = tiles.map((t) => t.dataset.lcsLeft), rights = tiles.map((t) => t.dataset.lcsRight);
      if (lefts.slice().sort().join() !== rights.slice().sort().join()) fails.push('a right half has no rhyming left half');
      tiles.forEach((t, i) => {
        if (t.dataset.lcsLeft === t.dataset.lcsRight) fails.push(`domino ${i + 1}: its two pictures rhyme`);
        t.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`domino ${i + 1}: a picture did not load`); });
      });
      return fails;
    });
  },
};
