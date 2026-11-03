/**
 * K-531 — Alphabet Chart (Alphabet & Letters maker 2026-11-02, NEW-TEMPLATES §37 T2; RF.K.1.d; material): the classroom
 * alphabet chart in the locale's alphabet and school order — each letter, capital and small, with the chart picture of a
 * word that starts with its SOUND (types/_shared/alphabet-more.js: the reviewed letter-picture chart). A letter with no
 * honest picture shows the letter alone, never a wrong-sound picture. Nothing to answer, no key.
 * Levels: 1 a poster, each card with its word printed under the picture · 2 the same poster without the words (the
 * children name the pictures) · 3 four strips to cut and hang as a frieze, each with a quarter of the alphabet.
 */
'use strict';
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { layout: 'poster', words: true, cols: 6 },
  2: { layout: 'poster', words: false, cols: 6 },
  3: { layout: 'strips', words: true, strips: 4 },
};
const W = 660, GAP = 8, BUDGET = 700;

module.exports = {
  id: 'K-531',
  slug: 'alphabet-chart',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-knowledge',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Alphabet Chart', instruction: 'Say each letter and the name of its picture. The picture starts with the sound of the letter.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = A.loc2(locale);
    const letters = A.alphabetOf(L);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const card = (ch, w, h) => {
      const p = A.pictureOf(ch, L), cap = A.inCase(ch, true, L);
      const lf = Math.round(Math.min(h * 0.22, w * 0.26));
      // the word as big as its card allows (Nunito 800 ≈ 0.62 em a letter): a long word (Computer, xylophone) shrinks
      const wordH = d.words && p ? Math.round(Math.min(18, h * 0.15, (w - 10) / (0.64 * [...p.word].length))) : 0;
      const picPx = Math.max(0, Math.min(w - 16, h - lf - wordH - 18));
      const word = d.words && p ? `<span data-lcs-chart-word="${p.word}" style="font:800 ${wordH}px/1.1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap;overflow:hidden;max-width:${w - 8}px">${p.word}</span>` : '';
      const img = p ? `<img class="ws-icon" src="${p.src}" alt="" data-lcs-chart-pic="${p.noun}" style="width:${picPx}px;height:${picPx}px;object-fit:contain">` : '';
      return `<div data-lcs-chart-letter="${ch}" style="box-sizing:border-box;width:${w}px;height:${h}px;flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:${p ? 'space-between' : 'center'};padding:5px 4px;background:#FFFFFF;border:2px solid ${T.creamDeep};border-radius:12px">` +
        `<span data-lcs-chart-pair style="font:700 ${p ? lf : Math.round(lf * 1.6)}px/1 'Baloo 2',cursive;color:${T.teal}">${cap}${ch}</span>${img}${word}</div>`;
    };
    let content;
    if (d.layout === 'poster') {
      const rows = Math.ceil(letters.length / d.cols), w = Math.floor((W - (d.cols - 1) * GAP) / d.cols), h = Math.floor((BUDGET - extra - (rows - 1) * GAP) / rows);
      const rowsHtml = Array.from({ length: rows }, (_, r) => `<div style="display:flex;gap:${GAP}px;justify-content:center">${letters.slice(r * d.cols, (r + 1) * d.cols).map((ch) => card(ch, w, h)).join('')}</div>`);
      content = `<div data-lcs-chart="poster" style="display:flex;flex-direction:column;gap:${GAP}px">${rowsHtml.join('')}</div>`;
    } else {
      const per = Math.ceil(letters.length / d.strips), w = Math.floor((W - 20 - (per - 1) * 5) / per);
      const h = Math.floor((BUDGET - extra - (d.strips - 1) * 22 - d.strips * 16) / d.strips);
      const strips = Array.from({ length: d.strips }, (_, s) => `<div data-lcs-chart-strip="${s + 1}" style="box-sizing:border-box;width:${W}px;padding:6px 8px;border:2px dashed ${T.grid};border-radius:6px;display:flex;gap:5px;justify-content:flex-start">${letters.slice(s * per, (s + 1) * per).map((ch) => card(ch, w, h)).join('')}</div>`);
      content = `<div data-lcs-chart="strips" style="display:flex;flex-direction:column;gap:22px">${strips.join('')}</div>`;
    }
    return { bodyHtml: `<div data-ws-content data-lcs-alphabet="${letters.join('')}" style="flex:1;display:flex;align-items:center;justify-content:center">${content}</div>`, meta: { letters: letters.length } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-alphabet]'), want = [...root.dataset.lcsAlphabet];
      const cards = [...document.querySelectorAll('[data-lcs-chart-letter]')];
      if (cards.map((c) => c.dataset.lcsChartLetter).join('') !== want.join('')) fails.push('the cards are not the alphabet in order');
      cards.forEach((c, i) => {
        const pair = c.querySelector('[data-lcs-chart-pair]'), r = c.getBoundingClientRect();
        const ch = c.dataset.lcsChartLetter;
        if (!pair || pair.textContent.toLowerCase() !== ch + ch) fails.push(`card ${i + 1}: the letters are not ${ch.toUpperCase()}${ch}`);
        const im = c.querySelector('img'); if (im && (!im.complete || !im.naturalWidth)) fails.push(`card ${i + 1}: the picture did not load`);
        const w = c.querySelector('[data-lcs-chart-word]');
        if (w && w.scrollWidth > w.clientWidth + 1) fails.push(`card ${i + 1}: the word "${w.textContent}" is cut`);
        if (w && w.textContent.toLowerCase().normalize('NFD')[0] !== ch.normalize('NFD')[0] && !w.textContent.toLowerCase().startsWith(ch)) fails.push(`card ${i + 1}: "${w.textContent}" does not start with ${ch}`);
        [...c.children].forEach((k) => { const q = k.getBoundingClientRect(); if (q.bottom > r.bottom + 0.5 || q.top < r.top - 0.5) fails.push(`card ${i + 1}: something leaves the card`); });
      });
      return fails;
    });
  },
};
