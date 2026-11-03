/**
 * K-526 — Letter Formation Cards (Letter Tracing maker 2026-11-02, NEW-TEMPLATES §33 T5; L.K.1.a; material): the
 * locale's school letters as the teacher shows them — each capital with its small letter, drawn solid with the start
 * dots, arrows and (on the big cards) the numbers of the stroke order (trace-path strokeLetterLane poster mode: the
 * model AND its guides). Cards to cut for a letter wall or a writing centre, or the whole alphabet as one poster. The
 * letters are K-238's letter units of the locale (its own letters included, ß left out — it has no capital); the card
 * copies walk the alphabet.
 * Levels: 1 six big cards (cut along the dashed lines) · 2 twelve cards · 3 the whole alphabet on one poster.
 */
'use strict';
const { strokeLetterLane } = require('../../primitives/trace-path.js');
const { letterUnits, unitForms } = require('./K-238-letter-tracing.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { cols: 2, n: 6, glyphH: 96, cut: true, badges: true },
  2: { cols: 3, n: 12, glyphH: 64, cut: true, badges: true },
  3: { cols: 5, n: 0, glyphH: 46, cut: false, badges: false },
};

module.exports = {
  id: 'K-526',
  slug: 'letter-formation-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Letter Formation Cards', instruction: 'Each letter starts at the orange dot. Follow the numbers and arrows to see how to write it. Cut out the cards along the dashed lines.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
    const units = letterUnits(L).filter((u) => u !== 'ß');
    const copy = Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
    const letters = d.n ? Array.from({ length: d.n }, (_, i) => units[((copy - 1) * d.n + i) % units.length]) : units;
    const extra = (ctx && ctx.chromeExtra) || 0;
    // the cards share 680 px (a two-line title and a three-line instruction leave ~700: the German default does); a
    // teacher's longer text gives the px it takes (ctx.chromeExtra, fitsChrome)
    const rows = Math.ceil(letters.length / d.cols), cardW = Math.floor(660 / d.cols), cardH = Math.floor((680 - extra) / rows);
    const cards = letters.map((u) => {
      const f = unitForms(u, L), pair = f.cap + f.low;
      const lane = strokeLetterLane({ text: pair, w: cardW - 12, h: Math.min(cardH - 8, Math.round(d.glyphH * 1.75)), glyphH: d.glyphH, reps: 1, poster: true, lowercase: true, badges: d.badges });
      return `<div data-lcs-card="${pair}" style="box-sizing:border-box;width:${cardW}px;height:${cardH}px;display:flex;align-items:center;justify-content:center;` +
        (d.cut ? `border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}` : `border:1px solid ${T.creamDeep || '#E6DCCB'}`) + `">${lane.svg}</div>`;
    });
    const grid = `<div data-lcs-formation="${d.cut ? 'cards' : 'poster'}" style="display:grid;grid-template-columns:repeat(${d.cols},${cardW}px);${d.cut ? `border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}` : ''}">${cards.join('')}</div>`;
    return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center">${grid}</div>`, meta: { letters } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-card]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const seen = new Set();
      cards.forEach((c, i) => {
        const t = c.dataset.lcsCard, svg = c.querySelector('[data-lcs-prim="trace-letter"]');
        if (seen.has(t)) fails.push(`${t} twice`); seen.add(t);
        if (!svg || svg.dataset.lcsText !== t) { fails.push(`card ${i + 1}: not the letter ${t}`); return; }
        // a formation card: the letter SOLID (no dashed stroke) with its start dots and arrows
        if (svg.querySelector('path[stroke-dasharray]:not([data-lcs-school])') && [...svg.querySelectorAll(':scope > g path')].some((p) => p.getAttribute('stroke-dasharray'))) fails.push(`card ${i + 1}: the letter is dashed`);
        if (!svg.querySelector('circle')) fails.push(`card ${i + 1}: no start dot`);
        if (!svg.querySelector('polygon')) fails.push(`card ${i + 1}: no arrows`);
        const R = c.getBoundingClientRect(), r = svg.getBoundingClientRect();
        if (r.width > R.width + 1 || r.height > R.height + 1) fails.push(`card ${i + 1}: the letter leaves its card`);
        svg.querySelectorAll('circle[data-lcs-badge]').forEach((b) => { const q = b.getBoundingClientRect(); if (q.left < r.left - 0.5 || q.right > r.right + 0.5 || q.top < r.top - 0.5 || q.bottom > r.bottom + 0.5) fails.push(`card ${i + 1}: a stroke number is cut off`); });
      });
      return fails;
    });
  },
};
