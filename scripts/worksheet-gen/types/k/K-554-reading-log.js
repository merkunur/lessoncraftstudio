/**
 * K-554 — Reading Log (Reading maker 2026-11-02, NEW-TEMPLATES §48 T4; RL.K-3 engagement; de "Lesetagebuch", fr "carnet
 * de lecture", nl "leeslogboek"; material): a page to fill for any book — its title, its author, how much the child
 * liked it (five stars to colour), the favourite part, a new word, and a box to draw the favourite part. The field
 * labels are literals per locale (data/reading/reading-new.js LOG). Open: no answer key, no screen.
 * Levels: 1 title, stars, drawing · 2 title, author, stars, favourite part, drawing · 3 + a new word.
 */
'use strict';
const { LOG } = require('../../data/reading/reading-new.js');
const { writingRow } = require('../../primitives/trace-path.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { fields: ['title', 'stars'], fav: 0, draw: 330 },
  2: { fields: ['title', 'author', 'stars'], fav: 2, draw: 230 },
  // no date field: the page head already asks for the date
  3: { fields: ['title', 'author', 'stars', 'word'], fav: 2, draw: 200 },
};
const STAR = `<svg width="46" height="46" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.9 6 6.5.8-4.8 4.5 1.2 6.5L12 17.3l-5.8 3.1 1.2-6.5L2.6 9.4l6.5-.8z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

module.exports = {
  id: 'K-554',
  slug: 'reading-log',
  gradeBand: 'K',
  assetClass: 'none',
  exerciseType: 'reading-comprehension',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'My Reading Log', instruction: 'Fill in the page about the book you read. Color the stars to show how much you liked it.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = A.loc2(locale);
    const t = LOG[L];
    if (!t) throw new Error(`K-554: no reading-log words for ${L}`);
    const label = (s) => `<span style="font:700 22px/1.2 'Baloo 2',cursive;color:${T.teal}">${s}</span>`;
    const line = (w) => writingRow({ w, h: 50, glyphH: 26, xHeight: true }).svg;
    const field = (k) => k === 'stars'
      ? `<div data-lcs-log-field="stars" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">${label(t.stars)}<span style="display:inline-flex;gap:6px">${STAR.repeat(5)}</span></div>`
      : `<div data-lcs-log-field="${k}" style="display:flex;align-items:center;gap:12px">${label(t[k])}<div style="flex:1;min-width:0;display:flex">${line(440)}</div></div>`;
    const fav = d.fav ? `<div data-lcs-log-field="fav" style="display:flex;flex-direction:column;gap:2px">${label(t.fav)}${Array.from({ length: d.fav }, () => line(640)).join('')}</div>` : '';
    const draw = `<div data-lcs-log-field="draw" style="display:flex;flex-direction:column;gap:6px">${label(t.draw)}<div style="height:${d.draw}px;border:2.5px dashed ${T.teal};border-radius:16px;background:#FFFFFF"></div></div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-reading-log style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${d.fields.map(field).join('')}${fav}${draw}</div>`,
      meta: { fields: [...d.fields, ...(d.fav ? ['fav'] : []), 'draw'] },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const fs = [...document.querySelectorAll('[data-lcs-log-field]')];
      if (fs.length < 3) fails.push(`${fs.length} fields`);
      const root = document.querySelector('[data-lcs-reading-log]').getBoundingClientRect();
      fs.forEach((f, i) => { const b = f.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`field ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
