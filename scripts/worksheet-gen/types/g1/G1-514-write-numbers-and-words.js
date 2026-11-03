/**
 * G1-514 — Write It Both Ways (Number of the Day maker 2026-11-02, NEW-TEMPLATES §51 T2; 2.NBT.A.3 read and write
 * numbers in words; de "Zahlwörter schreiben", es "números en letras", pt "números por extenso", nl "getallen in woorden
 * schrijven"): number words to turn into numerals and numerals to write as words — with NO word bank (G1-227 copies from
 * a bank). Half the rows each way, in a shuffled order; every number different. The words are lib/number-words-1000.js
 * (the published 0..100 table + the hundreds of each language; nl 1 «één»); the screen types the numerals on a number pad
 * and the words on the letter pad, with the spellings a teacher also accepts (alts: de einhundert…, fr the traditional
 * spaces, it centuno). The key prints every answer in its box.
 * Levels: 1 numbers to 20 · 2 numbers 21-100 · 3 numbers 101-120 (grade 1 reads and writes to 120, 1.NBT.A.1; the
 * words to 1000 are the grade-2 face G2-491).
 */
'use strict';
const { numberWord1000, numberWordAlts } = require('../../lib/number-words-1000.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { lo: 1, hi: 20, n: 6, boxW: 300, font: 26 }, 2: { lo: 21, hi: 100, n: 6, boxW: 420, font: 24 }, 3: { lo: 101, hi: 120, n: 6, boxW: 420, font: 22 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-514',
  slug: 'write-numbers-and-number-words',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'number-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Write It Both Ways', instruction: 'Write each number word as a number. Write each number as a word.' } },

  build({ difficulty, locale }, ctx) {
    const DD = this.difficulty || D, d = DD[difficulty] || DD[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);   // a face brings its own levels (G2-491)
    const pool = Array.from({ length: d.hi - d.lo + 1 }, (_, i) => d.lo + i).filter((n) => !d.ok || d.ok(n));   // d.ok: a face's rule
    const nums = rng.sample(pool, d.n);
    const dirs = rng.shuffle(nums.map((_, i) => (i < d.n / 2 ? 'toNumber' : 'toWord')));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const arrow = `<span style="font:700 26px/1 'Baloo 2',cursive;color:${T.teal};flex:0 0 auto">→</span>`;
    const box = (w, answer, alts) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(answer)}"${alts && alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${w}px;height:58px;flex:0 0 auto"></span>`;
    const rows = nums.map((n, i) => {
      const word = numberWord1000(n, L);
      const inner = dirs[i] === 'toNumber'
        ? `<span style="flex:1;min-width:0;font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(word)}</span>${arrow}${box(110, n)}`
        : `<span style="flex:1;min-width:0;font:700 36px/1 'Baloo 2',cursive;color:${T.ink}">${n}</span>${arrow}${box(d.boxW, word, numberWordAlts(n, L))}`;
      return `<div data-lcs-both="${i + 1}" data-lcs-dir="${dirs[i]}" data-lcs-n="${n}" style="display:flex;align-items:center;gap:14px;padding:10px 16px;border-radius:14px;background:${T.cream}">${inner}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-both-ways style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${rows.join('')}</div>`,
      meta: { items: nums.map((n, i) => `${dirs[i] === 'toNumber' ? numberWord1000(n, L) + ' → ' + n : n + ' → ' + numberWord1000(n, L)}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-both]')];
      if (rows.length < 4) fails.push(`${rows.length} rows`);
      const ns = rows.map((r) => r.dataset.lcsN);
      if (new Set(ns).size !== ns.length) fails.push('a number twice');
      if (rows.some((r) => +r.dataset.lcsN < 1)) fails.push('a number below 1');
      const root = document.querySelector('[data-lcs-both-ways]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`); r.querySelectorAll('.ws-answerbox').forEach((x) => { const q = x.getBoundingClientRect(); if (q.right > b.right + 0.5) fails.push(`row ${i + 1}: box past its row`); }); });
      return fails;
    });
  },
};
