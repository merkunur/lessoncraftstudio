/**
 * K-512 — Sorting Mats and Picture Cards (Sorting maker 2026-11-02, NEW-TEMPLATES §24 T5): a sorting centre on one sheet —
 * two or three big labelled mats above a grid of picture cards to cut out. Nothing is glued (K-240 glues): the teacher
 * laminates the sheet, cuts the cards once, and the children sort them onto the mats again and again (L.K.5.a).
 *
 * The groups are the reviewed per-sheet lists the other sorting templates use (Animals / Fruits / Vehicles; you can eat it
 * or not; moves by itself or needs a push), so every card has one right mat. Each mat carries its name and one small picture
 * of its group (not among the cards) so a child who cannot read the name still knows the mat. An item retired in the
 * page's language is never drawn. The KEY numbers the mats and gives every card its mat's number.
 * Levels: 1 two mats (two of animals / fruits / vehicles), four cards each · 2 the three mats, four cards each · 3 two
 * mats by a rule — copy 1 eat or not, copy 2 moves by itself or not … — six cards each.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { keyNumber } = require('../_shared/key-number.js');
const T = require('../../primitives/_tokens.js').color;

const CAT = require('../../data/literacy/category-vocab.json');
const EAT = require('../../data/sorting/can-you-eat-it.json');
const MOVES = require('../../data/sorting/moves-by-itself.json');
const D = { 1: { mats: 2, perMat: 4, cardPx: 120, cols: 4 }, 2: { mats: 3, perMat: 4, cardPx: 104, cols: 6 }, 3: { mats: 2, perMat: 6, cardPx: 104, cols: 6, rule: true } };
const retiredIn = (it, L) => it.retired === true || (Array.isArray(it.retired) && it.retired.includes(L));

function scissors(s) {
  const c = T.inkSoft;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" data-lcs-scissors="1" style="flex:0 0 auto">` +
    `<path d="M${s * 0.2} ${s * 0.2}L${s * 0.85} ${s * 0.62}M${s * 0.2} ${s * 0.8}L${s * 0.85} ${s * 0.38}" stroke="${c}" stroke-width="2.4" stroke-linecap="round" fill="none"/>` +
    `<circle cx="${s * 0.16}" cy="${s * 0.16}" r="${s * 0.13}" fill="none" stroke="${c}" stroke-width="2"/><circle cx="${s * 0.16}" cy="${s * 0.84}" r="${s * 0.13}" fill="none" stroke="${c}" stroke-width="2"/></svg>`;
}

module.exports = {
  id: 'K-512',
  slug: 'sorting-mats-and-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sorting-categories',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Sorting Mats and Picture Cards',
      instruction: 'Cut out the picture cards. Put each card on the mat where it belongs.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2), key = !!(ctx && ctx.answerKey);
    const copy = Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
    const data = d.rule ? (copy % 2 ? EAT : MOVES) : CAT;
    const items = Object.values(data.items);
    const live = (bin) => items.filter((it) => it.bin === bin && !retiredIn(it, L));
    const bins = rng.sample(data.bins.filter((b) => live(b.key).length >= d.perMat + 1), d.mats);
    if (bins.length < d.mats) throw new Error(`K-512: fewer than ${d.mats} groups with ${d.perMat + 1} pictures in ${L}`);
    // each mat: one sample picture, then its cards (never the sample); a card's picture may be swapped within its own group
    const mats = bins.map((b, k) => {
      const pool = live(b.key), picks = rng.sample(pool, d.perMat + 1);
      const sample = picks[0], cards = slot.anyPictures(ctx, picks.slice(1), pool.filter((it) => it.noun !== sample.noun), 'm' + k);
      return { b, k, sample, cards: cards.map((it) => ({ ...it, bin: b.key })) };
    });
    const cards = rng.shuffle(mats.flatMap((m) => m.cards.map((it, i) => ({ it, m, i }))));
    const matW = Math.floor((660 - (d.mats - 1) * 18) / d.mats);
    const label = (b) => b.label[L] || b.label.en;
    const matsHtml = mats.map(({ b, k, sample }) =>
      `<div data-lcs-mat="${b.key}" style="position:relative;box-sizing:border-box;width:${matW}px;border:3px solid ${T.teal};border-radius:20px;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;padding:12px 10px">` +
      (key ? `<span style="position:absolute;bottom:4px;right:4px;width:48px;height:48px">${keyNumber(k + 1)}</span>` : '') +
      `<div style="display:flex;align-items:center;gap:10px;max-width:100%;background:${T.cream || '#FBF3E4'};border:2.5px solid ${T.teal};border-radius:999px;padding:4px 14px 4px 6px">` +
      `<img class="ws-icon" src="${fileUri(sample.theme, sample.noun)}" alt="" data-lcs-mat-sample="1" style="width:46px;height:46px;flex:0 0 auto">` +
      `<span style="font:700 ${[...label(b)].length > 16 ? 17 : 21}px/1.15 'Baloo 2',cursive;color:${T.teal}">${label(b)}</span></div></div>`).join('');
    const cardHtml = ({ it, m, i }) =>
      `<span data-lcs-card="${m.b.key}" style="position:relative;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;width:${d.cardPx}px;height:${d.cardPx}px;border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}"${slot.attr(ctx, 'm' + m.k, i)}>` +
      (key ? `<span style="position:absolute;top:3px;right:4px">${keyNumber(m.k + 1)}</span>` : '') +
      `<img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${Math.round(d.cardPx * 0.76)}px;height:${Math.round(d.cardPx * 0.76)}px"></span>`;
    const body = `<div data-ws-content style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:18px;padding-top:6px">` +
      `<div style="flex:1 1 auto;min-height:0;display:flex;gap:18px;justify-content:center;align-items:stretch">${matsHtml}</div>` +
      `<div style="display:flex;align-items:center;gap:10px">${scissors(26)}` +
      `<div data-lcs-cards="1" style="display:grid;grid-template-columns:repeat(${d.cols},${d.cardPx}px);border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}">${cards.map(cardHtml).join('')}</div></div></div>`;
    return { bodyHtml: body, meta: { source: data === CAT ? 'category-vocab' : data === EAT ? 'eat' : 'moves', mats: bins.map((b) => b.key), cards: cards.map(({ it, m }) => ({ noun: it.noun, mat: m.b.key })) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const mats = [...document.querySelectorAll('[data-lcs-mat]')], cards = [...document.querySelectorAll('[data-lcs-card]')];
      if (mats.length < 2) fails.push(`${mats.length} mats`);
      const keys = mats.map((m) => m.dataset.lcsMat);
      const per = {};
      cards.forEach((c) => { per[c.dataset.lcsCard] = (per[c.dataset.lcsCard] || 0) + 1; if (!keys.includes(c.dataset.lcsCard)) fails.push('a card has no mat'); });
      const counts = keys.map((k) => per[k] || 0);
      if (new Set(counts).size !== 1 || counts[0] < 3) fails.push(`cards per mat ${counts.join('/')}`);
      const srcs = cards.map((c) => c.querySelector('img').getAttribute('src')).concat(mats.map((m) => m.querySelector('[data-lcs-mat-sample]').getAttribute('src')));
      if (new Set(srcs).size !== srcs.length) fails.push('a picture twice on the page');
      document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
      cards.forEach((c) => { const r = c.getBoundingClientRect(); if (r.width < 96 || r.height < 96) fails.push('a card is too small to cut'); });
      mats.forEach((m) => { const r = m.getBoundingClientRect(); if (r.height < 200) fails.push('a mat is too small to sort on'); });
      if (!document.querySelector('[data-lcs-scissors]')) fails.push('no scissors');
      return fails;
    });
  },
};
