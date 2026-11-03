/**
 * K-537 — Rhyme Memory Cards (Rhyming Words maker 2026-11-02, NEW-TEMPLATES §39 T1; RF.K.2.a recognise rhyming words;
 * material / game): picture cards to cut out, two of each rhyme; the children turn them face down and play Memory,
 * keeping a pair when the two pictures rhyme. The pairs come from the reviewed rhyme bank (data/b3/rhyming-words.js +
 * data/b3/locales: classes BY SOUND in each language, every picture opened): one pair per class, so no picture on the
 * page rhymes with a card of another pair. Level 1 prints each picture's word under it.
 * On the screen the child taps two cards that rhyme (each pair once); the key numbers the two cards of each pair alike.
 * Levels: 1 six pairs, words under the pictures · 2 eight pairs · 3 ten pairs.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { keyNumber } = require('../_shared/key-number.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const { rhymeSlots } = require('../_shared/rhyme-slots.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660, BUDGET = 700;
const D = {
  1: { pairs: 6, cols: 3, words: true },
  2: { pairs: 8, cols: 4, words: false },
  3: { pairs: 10, cols: 4, words: false },
};

module.exports = {
  id: 'K-537',
  slug: 'rhyme-memory-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'rhyming-words',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Rhyme Memory Cards', instruction: 'Cut out the cards and turn them face down. Turn over two cards: if the pictures rhyme, keep them!' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const R = bank('rhyming-words', L);
    const classes = rng.shuffle((R.classes || []).filter((c) => c.members.filter((m) => m.pic && m.picOpened).length >= 2));
    if (classes.length < d.pairs) throw new Error(`K-537: ${L} has ${classes.length} rhyme classes with two pictures (< ${d.pairs})`);
    const pairs = classes.slice(0, d.pairs).map((c, i) => { const two = rng.sample(c.members.filter((m) => m.pic && m.picOpened), 2); return { id: 'p' + (i + 1), cls: c.id, two }; });
    // a teacher's pictures (maker): another member of the same rhyme class, never one already on the page
    const RS = rhymeSlots(ctx, pairs.flatMap((p) => p.two.map((m) => ({ m, cls: p.cls }))), R, (m) => m.pic && m.picOpened, pairs.flatMap((p) => p.two), L);
    pairs.forEach((p, i) => { p.two = [RS.ms[2 * i], RS.ms[2 * i + 1]]; });
    const cards = rng.shuffle(pairs.flatMap((p) => p.two.map((m, k) => ({ m, p, k }))));
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rows = Math.ceil(cards.length / d.cols), w = Math.floor(W / d.cols), h = Math.floor((BUDGET - extra) / rows);
    const pic = Math.max(48, Math.min(w - 26, h - (d.words ? 52 : 22)));
    const html = cards.map(({ m, p, k }) => {
      const mk = scr ? (k === 0 ? ` data-lcs-key-badge="${p.id}"` : ` data-lcs-pair="${p.id}"`) : '';
      return `<div data-lcs-memory-card="${p.cls}" data-lcs-word="${m.word}"${mk} style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}">` +
        (key ? keyNumber(pairs.indexOf(p) + 1) : '') +
        `<img class="ws-icon" src="${fileUri(m.pic.theme, m.pic.noun)}" alt="" style="width:${pic}px;height:${pic}px;object-fit:contain">` +
        (d.words ? `<span style="font:700 22px/1 'Baloo 2',cursive;color:${T.ink}">${m.word}</span>` : '') + `</div>`;
    });
    const grid = `<div data-lcs-memory style="display:grid;grid-template-columns:repeat(${d.cols},${w}px);border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}">${html.join('')}</div>`;
    return {
      bodyHtml: RS.stamp(`<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center">${grid}</div>`, (m) => fileUri(m.pic.theme, m.pic.noun)),
      meta: { pairs: pairs.map((p) => p.two.map((m) => m.word).join('/')) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-memory-card]')];
      if (cards.length < 12) fails.push(`${cards.length} cards`);
      const by = {}; cards.forEach((c) => { (by[c.dataset.lcsMemoryCard] = by[c.dataset.lcsMemoryCard] || []).push(c.dataset.lcsWord); });
      Object.entries(by).forEach(([k, v]) => { if (v.length !== 2 || v[0] === v[1]) fails.push(`rhyme ${k}: ${v.length} cards`); });
      cards.forEach((c, i) => {
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: the picture did not load`);
        const R = c.getBoundingClientRect(), r = im.getBoundingClientRect();
        if (r.bottom > R.bottom + 1 || r.right > R.right + 1) fails.push(`card ${i + 1}: the picture leaves the card`);
      });
      return fails;
    });
  },
};
