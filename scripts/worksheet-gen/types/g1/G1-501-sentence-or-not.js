/**
 * G1-501 — Sentence or Not? (Sentences maker 2026-11-02, NEW-TEMPLATES §47 T4; L.1.1.j / L.2.1.f complete sentences; de
 * "Satz oder kein Satz"): word groups, some whole sentences and some only a part of one; the child ticks a whole sentence
 * and crosses a part. Every item is printed the same way — a capital first letter and a full stop — so the form never
 * gives the answer away. The sentences are the tagged grammar sentences (data/grammar/grammar-tables.js SENTENCES, native, the
 * same 18 in every language); a part is the subject alone (the big dog) or, where the language needs its subject, the
 * predicate alone (plays with Tom) — only in en / sv / da / no: "Juega con Tom" (es pt it fi) IS a sentence, and de
 * "Spielt mit Tom", fr "Joue avec Tom", nl "Speelt" read as an order. Level 3 adds a line
 * under each item: the child finishes a part into a sentence (the key prints the sentence it came from). Every tick /
 * cross is a choice; the right one is ringed on the key. Half the items are sentences.
 * Levels: 1 six items, parts = subjects · 2 eight items, both kinds of part · 3 six items, finish the parts.
 */
'use strict';
const { sentencesOf, split, text, PRO_DROP } = require('../_shared/sentence-items.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const VP_PART = new Set(['en', 'sv', 'da', 'no']);
const D = { 1: { n: 6, vp: false, finish: false }, 2: { n: 8, vp: true, finish: false }, 3: { n: 6, vp: true, finish: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const TICK = `<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CROSS = `<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="${T.coral}" stroke-width="3.2" stroke-linecap="round"/></svg>`;

module.exports = {
  id: 'G1-501',
  slug: 'sentence-or-not',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'sentence-building',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Sentence or Not?', instruction: 'Read each group of words. Circle the check if it is a whole sentence. Circle the X if it is not.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    // a predicate alone is a part only where it cannot be read as a sentence: never in the pro-drop locales, and never
    // where the 3rd-person verb is also an imperative (de "Spielt mit Tom!", fr "Joue avec Tom !", nl "Speelt!")
    const vp = d.vp && VP_PART.has(L) && !PRO_DROP.has(L);
    const pool = rng.shuffle(sentencesOf(L).map((s) => ({ ...s, sp: split(s.tokens) })).filter((s) => s.sp));
    if (pool.length < d.n) throw new Error(`G1-501: ${L} has ${pool.length} sentences (< ${d.n})`);
    const nWhole = Math.floor(d.n / 2);
    // a predicate alone only from a one-person subject (no "Mia and I": "Eat a sweet cake" is an order) and, in sv / da /
    // no, only when a preposition follows the verb ("Hjälper Elias" reads as the question "Does Elias help?")
    // (a preposition or a particle: med / i / på / hen til / op i — never the "and" of "spiser og sover", review 2026-11-02)
    const AND = new Set(['och', 'og']);
    const vpOk = (s) => !s.sp.subject.some((t) => t.tag === 'X') && (!['sv', 'da', 'no'].includes(L) ||
      (s.sp.predicate[1] && s.sp.predicate[1].tag === 'X' && !AND.has(s.sp.predicate[1].w.toLowerCase())));
    const items = [], seen = new Set();
    for (const s of pool) {
      if (items.length === d.n) break;
      const whole = text(s.tokens.filter((t) => t.tag !== '.'));
      const k = items.length;
      let it;
      if (k < nWhole) it = { whole: true, shown: whole, full: whole };
      else { const part = vp && k % 2 && vpOk(s) ? s.sp.predicate : s.sp.subject; it = { whole: false, shown: text(part), full: whole }; }
      // never the same words twice on a page (Die kleine Katze is the subject of two sentences)
      const sig = it.shown.toLocaleLowerCase(L);
      if (seen.has(sig)) continue;
      seen.add(sig); items.push(it);
    }
    if (items.length < d.n) throw new Error(`G1-501: ${L} has ${items.length} different items (< ${d.n})`);
    const order = rng.shuffle(items);
    const cap = (s) => s.charAt(0).toLocaleUpperCase(L) + s.slice(1);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen)), key = !!(ctx && ctx.answerKey);
    const chip = (svg, right) => `<span data-lcs-pick="1"${mark && right ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border:2.5px solid ${T.grid};border-radius:999px;background:#FFFFFF">${svg}</span>`;
    const rows = order.map((it, i) => {
      const row = d.finish ? writingRow({ w: 620, h: 44, glyphH: 24, xHeight: true }).svg : '';
      const line = d.finish ? `<div>${key && !it.whole ? seatOnRow(row, it.full + '.', { fill: T.teal }) : row}</div>` : '';
      return `<div data-lcs-sentence-item="${i + 1}" data-lcs-whole="${it.whole ? 1 : 0}" style="display:flex;flex-direction:column;gap:2px;padding:${d.finish ? 4 : 6}px 14px;border-radius:14px;background:${T.cream}">` +
        `<div style="display:flex;align-items:center;gap:16px"><span style="flex:1;font:700 ${d.finish ? 23 : 26}px/1.25 'Baloo 2',cursive;color:${T.ink}">${esc(cap(it.shown))}.</span>` +
        `<span class="ws-choices" style="display:inline-flex;gap:12px">${chip(TICK, it.whole)}${chip(CROSS, !it.whole)}</span></div>${line}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-sentence-or-not style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${rows.join('')}</div>`,
      meta: { items: order.map((it) => `${it.whole ? 'SENTENCE' : 'PART'}: ${cap(it.shown)}.${it.whole ? '' : ' ← ' + it.full}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-sentence-item]')];
      if (rows.length < 6) fails.push(`${rows.length} items`);
      const whole = rows.filter((r) => r.dataset.lcsWhole === '1').length;
      if (whole < 2 || rows.length - whole < 2) fails.push(`${whole} sentences of ${rows.length}`);
      const root = document.querySelector('[data-lcs-sentence-or-not]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`item ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
