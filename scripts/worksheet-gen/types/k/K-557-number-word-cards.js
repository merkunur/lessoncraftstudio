/**
 * K-557 — Number Word Cards (Number of the Day maker 2026-11-02, NEW-TEMPLATES §51 T5; K.CC.A.3, material; en "number
 * words anchor chart", fr "nombres en lettres affichage", de "Zahlwörter Liste"): cards to cut out for the word wall or
 * for matching games — each card the numeral, its word and (to 20) its ten frame, a dashed line between the parts (cut
 * along it for a matching game). Never a 0 card (counting never includes 0). The words are lib/number-words-1000.js
 * (the published table; nl 1 «één»). A word is never broken: two columns of cards when every word of the page fits its
 * card, else one column of wide cards (fi kahdeksantoista, fr quatre-vingt-dix). Material: no key, no screen.
 * Levels: 1 cards 1-10 · 2 cards 11-20 (two ten frames, the first full) · 3 the tens 10-100 (numeral and word).
 */
'use strict';
const tenFrame = require('../../primitives/ten-frame.js');
const { numberWord1000 } = require('../../lib/number-words-1000.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], frames: true },
  2: { nums: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], frames: true },
  3: { nums: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], frames: false },
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CUT = 'align-self:stretch;display:flex;align-items:center;padding-left:12px;border-left:2px dashed #8A8276';

module.exports = {
  id: 'K-557',
  slug: 'number-word-cards',
  gradeBand: 'K',
  assetClass: 'none',
  exerciseType: 'number-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Number Word Cards', instruction: 'Cut out the cards. Put them on the word wall, or cut along the dashed lines and match the number, the word and the picture.' } },

  build({ difficulty, locale }, ctx) {
    void ctx;
    const d = D[difficulty] || D[1], L = String(locale || 'en').slice(0, 2);
    const words = d.nums.map((n) => numberWord1000(n, L));
    const longest = Math.max(...words.map((w) => [...w].length));
    // the word's room on a two-column card (numeral 64, frames 80 or none, paddings and gaps): a Nunito bold letter is
    // about 0.62 em wide
    const twoCol = longest * 0.62 * 22 <= (d.frames ? 118 : 210);
    const font = twoCol ? 22 : 26, h = twoCol ? 124 : 62, cell = twoCol ? (d.frames && d.nums[0] > 10 ? 14 : 16) : 12;
    const cards = d.nums.map((n, i) => {
      const pic = d.frames ? (n > 10 ? `<span style="display:flex;flex-direction:column;gap:3px">${tenFrame({ a: 10, cell }).svg}${tenFrame({ a: n - 10, cell }).svg}</span>` : tenFrame({ a: n, cell }).svg) : '';
      return `<div data-lcs-card-n="${n}" style="display:flex;align-items:center;gap:12px;box-sizing:border-box;height:${h}px;padding:${twoCol ? 8 : 4}px 14px;border:2.5px dashed #8A8276;border-radius:12px;background:#FFFFFF">` +
        `<span style="flex:0 0 auto;width:${twoCol ? 64 : 84}px;text-align:center;font:700 ${twoCol ? 52 : 44}px/1 'Baloo 2',cursive;color:${T.teal}">${n}</span>` +
        `<span data-lcs-cut style="flex:1;min-width:0;justify-content:center;${CUT};font:700 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(words[i])}</span>` +
        (pic ? `<span data-lcs-cut style="flex:0 0 auto;${CUT}">${pic}</span>` : '') + '</div>';
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-word-cards style="flex:1;display:grid;grid-template-columns:${twoCol ? '1fr 1fr' : '1fr'};grid-auto-rows:${h}px;gap:${twoCol ? '14px 16px' : '8px'};align-content:space-evenly;min-height:0">${cards.join('')}</div>`,
      meta: { cards: d.nums.map((n, i) => `${n} ${words[i]}`), columns: twoCol ? 2 : 1 },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-card-n]')];
      if (cards.length !== 10) fails.push(`${cards.length} cards`);
      if (cards.some((c) => +c.dataset.lcsCardN < 1)) fails.push('a 0 card');
      const root = document.querySelector('[data-lcs-word-cards]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        c.querySelectorAll('[data-lcs-cut]').forEach((s) => { if (s.scrollWidth > s.clientWidth + 1) fails.push(`card ${i + 1}: the word does not fit`); });
      });
      return fails;
    });
  },
};
