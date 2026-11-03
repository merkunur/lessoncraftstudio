/**
 * G1-515 — Ordinal Numbers to 31 (Ordinal Numbers maker 2026-11-02, NEW-TEMPLATES §52 T1; the national "Ordnungszahlen
 * bis 31", es "números ordinales hasta el 30", pt "números ordinais", it "numeri ordinali", sv "ordningstal"): ordinals
 * written as a number to turn into a word, and words to write as a number — each language's own written form (en 21st,
 * de / da / no / fi 21., fr 21e, es 21.º, pt / it 21º, nl 21e, sv 21:a), never the English suffixes elsewhere. 1-10 are
 * the reviewed bank (data/b3/ordinals.js), 11-31 data/ordinal-numbers/ordinals-31.js (types/_shared/ordinal-more.js);
 * the citation (position) word, the forms a teacher also accepts as alts on the screen. Half the rows each way, every
 * ordinal different. The key prints every answer in its box.
 * Levels: 1 to 10th · 2 from 11th to 20th · 3 from 21st to 31st (the days of a month).
 */
'use strict';
const { ord } = require('../_shared/ordinal-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { lo: 1, hi: 10, n: 6, boxW: 300, font: 26 }, 2: { lo: 11, hi: 20, n: 6, boxW: 380, font: 24 }, 3: { lo: 21, hi: 31, n: 6, boxW: 520, font: 21 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-515',
  slug: 'ordinal-numbers-to-31',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'ordinal-numbers',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Ordinal Numbers to 31', instruction: 'Write each ordinal number as a word. Write each word as an ordinal number.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const ks = rng.sample(Array.from({ length: d.hi - d.lo + 1 }, (_, i) => d.lo + i), d.n);
    // fi: ordinals above 10 are written in digits at school (a 26-letter kolmaskymmenesensimmäinen is no grade-1 task):
    // level 3 there reads every word and writes "21." (native review 2026-11-02)
    const dirs = (L === 'fi' && d.lo > 20) ? ks.map(() => 'toNotation') : rng.shuffle(ks.map((_, i) => (i < d.n / 2 ? 'toNotation' : 'toWord')));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const arrow = `<span style="font:700 26px/1 'Baloo 2',cursive;color:${T.teal};flex:0 0 auto">→</span>`;
    const box = (w, answer, alts) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(answer)}"${alts && alts.length ? ` data-lcs-alts="${esc(alts.join('|'))}"` : ''}` : ''} style="width:${w}px;height:58px;flex:0 0 auto"></span>`;
    const items = ks.map((k) => ord(k, L));
    const rows = items.map((o, i) => {
      const inner = dirs[i] === 'toNotation'
        ? `<span style="flex:1;min-width:0;font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(o.word)}</span>${arrow}${box(120, o.notation, o.notationAlts)}`
        : `<span style="flex:1;min-width:0;font:700 36px/1 'Baloo 2',cursive;color:${T.ink}">${esc(o.notation)}</span>${arrow}${box(d.boxW, o.word, o.wordAlts)}`;
      return `<div data-lcs-ord-row="${i + 1}" data-lcs-dir="${dirs[i]}" data-lcs-k="${o.k}" style="display:flex;align-items:center;gap:14px;padding:10px 16px;border-radius:14px;background:${T.cream}">${inner}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-ordinals-both style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">${rows.join('')}</div>`,
      meta: { items: items.map((o, i) => (dirs[i] === 'toNotation' ? `${o.word} → ${o.notation}` : `${o.notation} → ${o.word}`)) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-ord-row]')];
      if (rows.length < 4) fails.push(`${rows.length} rows`);
      const ks = rows.map((r) => r.dataset.lcsK);
      if (new Set(ks).size !== ks.length) fails.push('an ordinal twice');
      const root = document.querySelector('[data-lcs-ordinals-both]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`); r.querySelectorAll('.ws-answerbox').forEach((x) => { if (x.getBoundingClientRect().right > b.right + 0.5) fails.push(`row ${i + 1}: box past its row`); }); });
      return fails;
    });
  },
};
