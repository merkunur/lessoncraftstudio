/**
 * G1-516 — Ordinal Numbers: Symbol and Word (Ordinal Numbers maker 2026-11-02, NEW-TEMPLATES §52 T3; the ordinal
 * notation of each language — de "3.", fr "3e", es "3.º", en "3rd", sv "3:e"; da "ordenstal", fi "järjestysluvut"):
 * ordinals written as numbers in one column, as words in the other, both shuffled (no row lines up with its partner);
 * the child joins each to its word (G1-316 joins words to pictures; this is the symbol ↔ word link). The forms are the
 * reviewed bank 1-10 and data/ordinal-numbers/ordinals-31.js 11-20 (types/_shared/ordinal-more.js), never the English
 * suffixes elsewhere. On the screen each number links to its word; the key badges each number with its word.
 * Levels: 1 five pairs, 1st-5th · 2 eight pairs from 1st-10th · 3 eight pairs from 11th-20th.
 */
'use strict';
const { ord } = require('../_shared/ordinal-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { lo: 1, hi: 5, n: 5 }, 2: { lo: 1, hi: 10, n: 8 }, 3: { lo: 11, hi: 20, n: 8 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-516',
  slug: 'ordinal-symbol-and-word',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'ordinal-numbers',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Ordinal Numbers: Symbol and Word', instruction: 'Draw a line from each ordinal number to its word.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const left = rng.sample(Array.from({ length: d.hi - d.lo + 1 }, (_, i) => d.lo + i), d.n).map((k) => ord(k, L));
    let order = null;
    for (let t = 0; t < 200 && !order; t++) { const o = rng.shuffle([...Array(d.n).keys()]); if (o.every((v, i) => v !== i)) order = o; }
    const right = (order || [...Array(d.n).keys()].map((i) => (i + 1) % d.n)).map((i) => left[i]);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const dot = `<span style="width:12px;height:12px;border-radius:6px;background:${T.ink};flex:0 0 auto"></span>`;
    const h = Math.floor(640 / d.n) - 12, font = Math.max(18, Math.min(28, Math.floor(420 / Math.max(...left.map((o) => [...o.word].length)) * 1.4)));
    const L1 = left.map((o) => `<div data-lcs-ord-num="${o.k}"${mark ? ` data-lcs-key-badge="${esc(o.word)}"` : ''} style="display:flex;align-items:center;justify-content:flex-end;gap:14px;height:${h}px">` +
      `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:96px;height:${Math.min(64, h)}px;padding:0 10px;box-sizing:border-box;border:3px solid ${T.teal};border-radius:14px;background:#FFFFFF;font:700 34px/1 'Baloo 2',cursive;color:${T.ink}">${esc(o.notation)}</span>${dot}</div>`);
    const R = right.map((o) => `<div data-lcs-ord-word="${o.k}" style="display:flex;align-items:center;gap:14px;height:${h}px">${dot}` +
      `<span${mark ? ` data-lcs-pair="${esc(o.word)}" data-lcs-label="${esc(o.word)}"` : ''} style="flex:1;display:inline-flex;align-items:center;justify-content:center;min-height:${Math.min(60, h)}px;padding:4px 12px;box-sizing:border-box;border:2.5px solid ${T.grid};border-radius:14px;background:#FFFFFF;font:700 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};text-align:center">${esc(o.word)}</span></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-ord-match style="flex:1;display:flex;justify-content:space-between;gap:70px;min-height:0">` +
        `<div style="display:flex;flex-direction:column;justify-content:space-evenly;width:170px">${L1.join('')}</div>` +
        `<div style="display:flex;flex-direction:column;justify-content:space-evenly;flex:1">${R.join('')}</div></div>`,
      meta: { pairs: left.map((o) => `${o.notation} = ${o.word}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const l = [...document.querySelectorAll('[data-lcs-ord-num]')].map((e) => +e.dataset.lcsOrdNum);
      const r = [...document.querySelectorAll('[data-lcs-ord-word]')].map((e) => +e.dataset.lcsOrdWord);
      if (l.length < 4 || l.length !== r.length) fails.push('columns of different lengths');
      if ([...l].sort().join() !== [...r].sort().join()) fails.push('the columns hold different ordinals');
      l.forEach((v, i) => { if (r[i] === v) fails.push(`row ${i + 1} lines up with its word`); });
      const root = document.querySelector('[data-lcs-ord-match]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-ord-num], [data-lcs-ord-word]').forEach((e) => { const b = e.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push('an item leaves the page'); });
      document.querySelectorAll('[data-lcs-ord-word] span').forEach((s) => { if (s.scrollWidth > s.clientWidth + 1) fails.push('a word does not fit its box'); });
      return fails;
    });
  },
};
