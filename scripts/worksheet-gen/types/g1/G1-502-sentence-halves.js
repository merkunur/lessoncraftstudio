/**
 * G1-502 — Match the Sentence Halves (Sentences maker 2026-11-02, NEW-TEMPLATES §47 T5; L.1.1.j sentence structure; sv
 * "meningsbyggnad", da "byg sætninger"): the beginnings of sentences on the left, their ends on the right with a picture;
 * the child joins each beginning to its end with a line. Any beginning would make a grammatical sentence with any end, so
 * the picture beside each end — its subject — is what makes ONE right line (A4: a cross-combination is grammatical but
 * false to the picture). The sentences are the tagged grammar sentences (data/grammar/grammar-tables.js SENTENCES,
 * native, the same 18 in every language), split before the verb; only sentences whose subject is a picture (an animal,
 * a ball, an apple), never two with the same subject on a page. The ends are shuffled against the beginnings.
 * On the screen the child pairs the halves; the key numbers each end with its beginning's number.
 * Levels: 1 four sentences · 2 five sentences · 3 six sentences.
 */
'use strict';
const { sentencesOf, split, text } = require('../_shared/sentence-items.js');
const { picOf, srcOf } = require('../_shared/pic-by-key.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 4, px: 64 }, 2: { n: 5, px: 58 }, 3: { n: 6, px: 52 } };
const PICTURED = new Set(['dog', 'bird', 'frog', 'cat', 'rabbit', 'bear', 'ball', 'apple', 'duck', 'fish', 'horse']);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = {
  id: 'G1-502',
  slug: 'sentence-halves',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'sentence-building',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Sentence Halves', instruction: 'Draw a line from each beginning to the end that goes with it. The pictures help you.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const seen = new Set();
    const pool = rng.shuffle(sentencesOf(L).filter((s) => s.key && PICTURED.has(s.key) && picOf(s.key)))
      .filter((s) => (seen.has(s.key) ? false : (seen.add(s.key), true)))
      .map((s) => ({ ...s, sp: split(s.tokens) })).filter((s) => s.sp);
    if (pool.length < d.n) throw new Error(`G1-502: ${L} has ${pool.length} sentences with a pictured subject (< ${d.n})`);
    const picks = pool.slice(0, d.n);
    // the ends in an order where no end sits beside its own beginning
    let order = null;
    for (let t = 0; t < 200 && !order; t++) { const o = rng.shuffle(picks.map((_, i) => i)); if (o.every((v, k) => v !== k)) order = o; }
    if (!order) throw new Error(`G1-502: ${L}: no mixed order`);
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    const end = (s) => { const last = s.tokens[s.tokens.length - 1]; return text(s.sp.predicate) + (last.tag === '.' ? last.w : ''); };
    const rowH = Math.max(d.px + 14, 74);
    const left = picks.map((s, i) => `<div data-lcs-half-start="${i + 1}"${scr ? ` data-lcs-key-badge="h${i + 1}"` : ''} style="position:relative;display:flex;align-items:center;justify-content:flex-end;gap:10px;height:${rowH}px;padding:0 14px 0 50px;border-radius:14px;background:${T.cream};font:700 26px/1.2 'Baloo 2',cursive;color:${T.ink}">` +
      (key ? `<span data-lcs-key-sample="1" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);min-width:32px;height:32px;border-radius:16px;background:${T.teal};color:#FFFFFF;font:700 19px/32px 'Baloo 2',cursive;text-align:center">${i + 1}</span>` : '') +
      `<span style="text-align:right">${esc(text(s.sp.subject))}</span><span style="width:12px;height:12px;border-radius:6px;background:${T.teal};flex:0 0 auto"></span></div>`);
    const right = order.map((j) => { const s = picks[j]; return `<div data-lcs-half-end="${j + 1}"${scr ? ` data-lcs-pair="h${j + 1}"` : ''} style="position:relative;display:flex;align-items:center;gap:10px;height:${rowH}px;padding:0 14px;border-radius:14px;background:${T.cream};font:700 26px/1.2 'Baloo 2',cursive;color:${T.ink}">` +
      `<span style="width:12px;height:12px;border-radius:6px;background:${T.coral};flex:0 0 auto"></span><span style="flex:1">${esc(end(s))}</span>` +
      `<img class="ws-icon" src="${srcOf(picOf(s.key))}" alt="" style="width:${d.px}px;height:${d.px}px;flex:0 0 auto;object-fit:contain">` +
      (key ? `<span data-lcs-key-sample="1" style="position:absolute;right:${d.px + 18}px;top:4px;min-width:28px;height:28px;border-radius:14px;background:${T.teal};color:#FFFFFF;font:700 17px/28px 'Baloo 2',cursive;text-align:center">${j + 1}</span>` : '') + '</div>'; });
    return {
      bodyHtml: `<div data-ws-content data-lcs-halves style="flex:1;display:grid;grid-template-columns:minmax(0,0.85fr) minmax(0,1.15fr);column-gap:70px;align-content:space-evenly;row-gap:14px;min-height:0">` +
        left.map((l, i) => l + right[i]).join('') + '</div>',
      meta: { pairs: picks.map((s) => `${text(s.sp.subject)} | ${end(s)}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const a = [...document.querySelectorAll('[data-lcs-half-start]')], b = [...document.querySelectorAll('[data-lcs-half-end]')];
      if (a.length < 4 || a.length !== b.length) fails.push(`${a.length} beginnings, ${b.length} ends`);
      const root = document.querySelector('[data-lcs-halves]').getBoundingClientRect();
      [...a, ...b].forEach((r, i) => { if (r.scrollWidth > r.clientWidth + 1) fails.push(`half ${i + 1}: the words leave the box`); const x = r.getBoundingClientRect(); if (x.right > root.right + 1 || x.bottom > root.bottom + 1) fails.push(`half ${i + 1} leaves the page`); });
      b.forEach((r, i) => { const im = r.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`end ${i + 1}: the picture did not load`); });
      return fails;
    });
  },
};
