/**
 * K-546 — Read and Draw (Position Words maker 2026-11-02, NEW-TEMPLATES §44 T1; K.G.A.1 describe positions; the old
 * Prepositions app's sentence mode): each row a sentence from the grammar engine — the picture, then where it is ("[ball]
 * is under the circle.") — and the shape alone in a box; the child draws the picture in that place. The key shows the
 * picture where it belongs.
 * Levels: 1 four rows (in, on top of, under, next to) · 2 five rows (+ above, between) · 3 six rows (+ behind, in front of).
 */
'use strict';
const P = require('../_shared/position-scenes.js');
const { positionItems, sentenceHtml } = require('../_shared/position-items.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { rows: 4 }, 2: { rows: 5 }, 3: { rows: 6 } };

module.exports = {
  id: 'K-546',
  slug: 'read-and-draw-positions',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'position-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Read and Draw', instruction: 'Read each sentence. Draw the picture in the right place next to the shape.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = A.loc2(locale);
    const items = positionItems({ locale: L, level: difficulty, rows: d.rows, rng: ctx.rng });
    const key = !!(ctx && ctx.answerKey);
    const h = d.rows <= 4 ? 150 : d.rows === 5 ? 124 : 104;
    const rows = items.map((it) => `<div data-lcs-draw-row="${it.prep}" style="display:flex;align-items:center;gap:16px;padding:6px 12px;border-radius:14px;background:${T.cream}">` +
      `<div style="flex:1 1 auto;min-width:0;font:700 22px/1.35 'Baloo 2',cursive;color:${T.ink}">${sentenceHtml(it, `<span>${it.sent.expected}</span>`, 38)}</div>` +
      `<div style="flex:0 0 auto;border:2px dashed ${T.grid};border-radius:12px;background:#FFFFFF">${P.scene(it.prep, it.shape, it.src, { w: 250, h, s: Math.round(h * 0.5), o: Math.round(h * 0.38), noObject: true, keyObject: key })}</div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-draw style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${rows.join('')}</div>`,
      meta: { rows: items.map((it) => `${it.key} ${it.prep} ${it.shape}`), sentences: items.map((it) => it.sent.prefix.replace('{img}', `[${it.key}]`) + `<${it.sent.expected}>` + it.sent.suffix) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-draw-row]')];
      if (rows.length < 4) fails.push(`${rows.length} rows`);
      const root = document.querySelector('[data-lcs-draw]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1) fails.push(`row ${i + 1} leaves the page`); r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); }); });
      return fails;
    });
  },
};
