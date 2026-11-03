/**
 * G1-521 — Ordinal Number Cards (Ordinal Numbers maker 2026-11-02, NEW-TEMPLATES §52 T4; material; en "ordinal numbers
 * game", nl "rangtelwoorden", de "Ordnungszahlen Klasse 1"): cards to cut out for matching or for lining up — each card
 * the ordinal as a number (each language's notation: 1st / 1. / 1er / 1.º / 1:a …), its word and a picture of the
 * place: a row of dots with the k-th one coloured (counted from the left), a dashed line between the parts. The forms
 * are the reviewed bank 1-10 and data/ordinal-numbers/ordinals-31.js (types/_shared/ordinal-more.js). A word is never
 * broken: two columns of cards when every word fits, else one column (fi kahdeskymmenesensimmäinen). Material: no key,
 * no screen.
 * (Grade 1: the cards run to the 30th, the days of a month — built as K-559, moved by the native review 2026-11-02.)
 * Levels: 1 cards 1st-10th, ten dots · 2 cards 11th-20th, twenty dots in two rows · 3 cards 21st-30th (number and word).
 */
'use strict';
const { ord } = require('../_shared/ordinal-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { from: 1, dots: 10 },
  2: { from: 11, dots: 20 },
  3: { from: 21, dots: 0 },
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CUT = 'align-self:stretch;display:flex;align-items:center;padding-left:12px;border-left:2px dashed #8A8276';

/** a row (or two rows of ten) of dots, the k-th from the left in coral */
function placeDots(k, total, r) {
  const perRow = 10, rows = Math.ceil(total / perRow), gap = r * 0.7, w = perRow * 2 * r + (perRow - 1) * gap, h = rows * 2 * r + (rows - 1) * gap;
  let s = '';
  for (let i = 0; i < total; i++) {
    const cx = r + (i % perRow) * (2 * r + gap), cy = r + Math.floor(i / perRow) * (2 * r + gap);
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${i + 1 === k ? T.coral : '#FFFFFF'}" stroke="${T.ink}" stroke-width="1.6"/>`;
  }
  return `<svg width="${w.toFixed(0)}" height="${h.toFixed(0)}" viewBox="-1 -1 ${(w + 2).toFixed(1)} ${(h + 2).toFixed(1)}" data-lcs-place-dots="${k}" aria-hidden="true">${s}</svg>`;
}

module.exports = {
  id: 'G1-521',
  slug: 'ordinal-number-cards',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'ordinal-numbers',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Ordinal Number Cards', instruction: 'Cut out the cards. Put them in order, or cut along the dashed lines and match the number, the word and the picture.' } },

  build({ difficulty, locale }, ctx) {
    void ctx;
    const d = D[difficulty] || D[1], L = String(locale || 'en').slice(0, 2);
    const items = Array.from({ length: 10 }, (_, i) => ord(d.from + i, L));
    const longest = Math.max(...items.map((o) => [...o.word].length));
    // the word's room on a two-column card (number 60, ten dots ~105 or none): a Nunito bold letter is about 0.62 em wide
    const twoCol = longest * 0.62 * 20 <= (d.dots ? 86 : 190);
    const h = twoCol ? 124 : 62, font = twoCol ? 20 : 24, r = twoCol ? 4 : (d.dots > 10 ? 3.4 : 5);
    const cards = items.map((o) => `<div data-lcs-card-k="${o.k}" style="display:flex;align-items:center;gap:12px;box-sizing:border-box;height:${h}px;padding:${twoCol ? 8 : 4}px 14px;border:2.5px dashed #8A8276;border-radius:12px;background:#FFFFFF">` +
      `<span style="flex:0 0 auto;min-width:${twoCol ? 60 : 84}px;text-align:center;font:700 ${twoCol ? 34 : 34}px/1 'Baloo 2',cursive;color:${T.teal}">${esc(o.notation)}</span>` +
      `<span data-lcs-cut style="flex:1;min-width:0;justify-content:center;${CUT};font:700 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(o.word)}</span>` +
      (d.dots ? `<span data-lcs-cut style="flex:0 0 auto;${CUT}">${placeDots(o.k, d.dots, r)}</span>` : '') + '</div>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-ordinal-cards style="flex:1;display:grid;grid-template-columns:${twoCol ? 'repeat(2, minmax(0, 1fr))' : 'minmax(0, 1fr)'};grid-auto-rows:${h}px;gap:${twoCol ? '14px 16px' : '8px'};align-content:space-evenly;min-height:0">${cards.join('')}</div>`,
      meta: { cards: items.map((o) => `${o.notation} ${o.word}`), columns: twoCol ? 2 : 1 },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-card-k]')];
      if (cards.length !== 10) fails.push(`${cards.length} cards`);
      cards.forEach((c, i) => {
        const dots = c.querySelector('[data-lcs-place-dots]');
        if (dots && +dots.dataset.lcsPlaceDots !== +c.dataset.lcsCardK) fails.push(`card ${i + 1}: the coloured dot is not its place`);
        if (dots && dots.querySelectorAll('circle')[+c.dataset.lcsCardK - 1].getAttribute('fill') === '#FFFFFF') fails.push(`card ${i + 1}: its dot is not coloured`);
      });
      const root = document.querySelector('[data-lcs-ordinal-cards]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        c.querySelectorAll('[data-lcs-cut]').forEach((s) => { if (s.scrollWidth > s.clientWidth + 1) fails.push(`card ${i + 1}: a part does not fit`); });
      });
      return fails;
    });
  },
};
