/**
 * K-556 — Number, Word and Picture (Number of the Day maker 2026-11-02, NEW-TEMPLATES §51 T3; K.CC.A.3 + K.CC.B.4 +
 * number words; it "numeri in lettere", fi "lukusanat"): three columns — numerals, number words, filled ten frames; the
 * child joins each numeral to its word and each word to its ten frame (G1-225 matches two). Every column is shuffled on
 * its own: no two columns alike, reversed or one row apart, none sorted, at most one straight line across. The words are
 * lib/number-words-1000.js (the published table; nl 1 «één»). On the screen the numerals and the frames are linked to the
 * words (each word takes two links); the key badges each numeral and each frame with its word.
 * Levels: 1 four numbers 1-10 · 2 six numbers 1-10 · 3 five numbers 11-20 (two ten frames, the first full).
 */
'use strict';
const tenFrame = require('../../primitives/ten-frame.js');
const { numberWord1000 } = require('../../lib/number-words-1000.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { lo: 1, hi: 10, n: 4, cell: 26 }, 2: { lo: 1, hi: 10, n: 6, cell: 22 }, 3: { lo: 11, hi: 20, n: 5, cell: 20 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// a column order the child cannot learn (review 2026-11-02): no two columns alike, reversed or one row apart, no column
// sorted, at most one straight-across match between neighbouring columns (sometimes one, sometimes none)
const same = (a, b) => a.every((v, i) => v === b[i]);
const patterned = (a, b) => same(a, b) || same(a, [...b].reverse()) || same(a, [...b.slice(1), b[0]]) || same(a, [b[b.length - 1], ...b.slice(0, -1)]);
const sorted = (a) => a.every((v, i) => !i || v > a[i - 1]) || a.every((v, i) => !i || v < a[i - 1]);
const across = (a, b) => a.filter((v, i) => v === b[i]).length;
function columns(pick, rng) {
  for (let t = 0; t < 2000; t++) {
    const nums = rng.shuffle(pick), words = rng.shuffle(pick), frames = rng.shuffle(pick);
    if ([nums, words, frames].some(sorted)) continue;
    if (patterned(nums, words) || patterned(words, frames) || patterned(nums, frames)) continue;
    if (across(nums, words) > 1 || across(words, frames) > 1) continue;
    return { nums, words, frames };
  }
  throw new Error('K-556: no column order');
}

module.exports = {
  id: 'K-556',
  slug: 'number-word-and-picture',
  gradeBand: 'K',
  assetClass: 'none',
  exerciseType: 'number-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Number, Word and Picture', instruction: 'Draw a line from each number to its word. Then draw a line from each word to its picture.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = Array.from({ length: d.hi - d.lo + 1 }, (_, i) => d.lo + i);
    const { nums, words, frames } = columns(rng.sample(pool, d.n), rng);   // each column top to bottom
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const W = (n) => numberWord1000(n, L);
    const dot = `<span style="width:12px;height:12px;border-radius:6px;background:${T.ink};flex:0 0 auto"></span>`;
    const rowH = Math.floor(640 / d.n);
    const numeral = (n) => `<div data-lcs-num="${n}"${mark ? ` data-lcs-key-badge="${esc(W(n))}"` : ''} style="display:flex;align-items:center;justify-content:flex-end;gap:12px;height:${rowH - 10}px">` +
      `<span style="display:inline-flex;align-items:center;justify-content:center;width:84px;height:${Math.min(84, rowH - 14)}px;border:3px solid ${T.teal};border-radius:14px;background:#FFFFFF;font:700 52px/1 'Baloo 2',cursive;color:${T.ink}">${n}</span>${dot}</div>`;
    const word = (n) => `<div data-lcs-word-n="${n}" style="display:flex;align-items:center;gap:12px;height:${rowH - 10}px">${dot}` +
      `<span${mark ? ` data-lcs-pair="${esc(W(n))}" data-lcs-label="${esc(W(n))}"` : ''} style="flex:1;display:inline-flex;align-items:center;justify-content:center;min-height:${Math.min(70, rowH - 14)}px;padding:4px 10px;border:2.5px solid ${T.grid};border-radius:14px;background:#FFFFFF;font:700 ${d.n > 5 ? 24 : 28}px/1.15 'Nunito',sans-serif;color:${T.ink};text-align:center">${esc(W(n))}</span>${dot}</div>`;
    const frame = (n) => {
      const svg = n > 10 ? `<span style="display:flex;flex-direction:column;gap:4px">${tenFrame({ a: 10, cell: d.cell }).svg}${tenFrame({ a: n - 10, cell: d.cell }).svg}</span>` : tenFrame({ a: n, cell: d.cell }).svg;
      return `<div data-lcs-frame-n="${n}"${mark ? ` data-lcs-key-badge="${esc(W(n))}"` : ''} style="display:flex;align-items:center;gap:12px;height:${rowH - 10}px">${dot}${svg}</div>`;
    };
    const col = (items, w) => `<div style="display:flex;flex-direction:column;justify-content:space-evenly;width:${w}px">${items.join('')}</div>`;
    return {
      bodyHtml: `<div data-ws-content data-lcs-three-way style="flex:1;display:flex;justify-content:space-between;align-items:stretch;gap:20px;min-height:0">` +
        col(nums.map(numeral), 130) + col(words.map(word), 280) + col(frames.map(frame), 190) + '</div>',
      meta: { numerals: nums, words: words.map(W), frames },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const n = [...document.querySelectorAll('[data-lcs-num]')].map((e) => +e.dataset.lcsNum);
      const w = [...document.querySelectorAll('[data-lcs-word-n]')].map((e) => +e.dataset.lcsWordN);
      const f = [...document.querySelectorAll('[data-lcs-frame-n]')].map((e) => +e.dataset.lcsFrameN);
      if (n.length < 4 || w.length !== n.length || f.length !== n.length) fails.push('columns of different lengths');
      if ([...n].sort().join() !== [...w].sort().join() || [...w].sort().join() !== [...f].sort().join()) fails.push('the columns hold different numbers');
      if (n.filter((v, i) => w[i] === v).length > 1 || w.filter((v, i) => f[i] === v).length > 1) fails.push('more than one straight line across');
      if (n.some((v) => v < 1)) fails.push('a number below 1');
      const root = document.querySelector('[data-lcs-three-way]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-num], [data-lcs-word-n], [data-lcs-frame-n]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('an item leaves the page'); });
      return fails;
    });
  },
};
