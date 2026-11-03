/**
 * G1-498 — Capital Letters (Grammar maker 2026-11-02, NEW-TEMPLATES §45 T4; L.1.2.a capitalise names and the first word
 * of a sentence; de "Nomen großschreiben" — every noun; en the pronoun I): sentences printed in small letters only; the
 * child circles every word that needs a capital letter — the first word, names, and in German every noun. Level 3 also
 * gives a line under each sentence to write it again correctly. The sentences, the word classes and the rule per locale
 * are literals (data/grammar/grammar-tables.js SENTENCES + CAPITAL_RULE: de nouns and names, en names and I, every other
 * locale names — weekdays and months are not in these sentences). The right words are ringed on the key.
 * Levels: 1 four sentences · 2 six sentences · 3 four sentences, each written again on a line.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { SENTENCES, CAPITAL_RULE } = require('../../data/grammar/grammar-tables.js');
const { writingRow } = require('../../primitives/trace-path.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 4, rewrite: false }, 2: { n: 6, rewrite: false }, 3: { n: 4, rewrite: true } };
const parse = (s) => s.split(' ').map((t) => { const i = t.lastIndexOf('/'); return { w: t.slice(0, i), tag: t.slice(i + 1) }; });

module.exports = {
  id: 'G1-498',
  slug: 'capital-letters',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'capitals-punctuation',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Capital Letters', instruction: 'Read each sentence. Circle every word that needs a capital letter.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[1], rng = ctx.rng, L = A.loc2(locale);
    const bank = SENTENCES[L];
    if (!bank) throw new Error(`G1-498: no sentences for ${L}`);
    const rule = CAPITAL_RULE[L] || CAPITAL_RULE.default;
    const needs = (t, k) => k === 0 || rule.includes(t.tag) || (rule.includes('I') && t.w === 'I');
    // a page the child cannot solve by position (review 2026-11-02: "first word + last word" answered every sentence):
    // sentences with a capital inside, at least one with it NOT on the last word (a name at the start or in the middle),
    // and about one sentence in three whose only capital is the first word
    const words = (toks) => toks.filter((t) => t.tag !== '.');
    const caps = (toks) => words(toks).map((t, k) => (k > 0 && needs(t, k) ? k : -1)).filter((k) => k > 0);
    const all = rng.shuffle(bank.map(parse));
    const inner = all.filter((x) => caps(x).length), plain = all.filter((x) => !caps(x).length);
    const midFirst = inner.filter((x) => caps(x).some((k) => k < words(x).length - 1));
    const nPlain = Math.min(plain.length, Math.max(1, Math.floor(d.n / 3)));
    const picks = [];
    if (midFirst.length) picks.push(midFirst[0]);
    for (const x of inner) { if (picks.length >= d.n - nPlain) break; if (!picks.includes(x)) picks.push(x); }
    picks.push(...plain.slice(0, d.n - picks.length));
    if (picks.length < d.n) throw new Error(`G1-498: ${L} has ${picks.length} sentences (< ${d.n})`);
    rng.shuffle(picks).forEach((x, i) => { picks[i] = x; });
    // a teacher's sentences (maker): a sentence with a capital inside for one of those ('in'), one whose only capital is the first
    // word for one of those ('first'); the page keeps a sentence with a capital in the middle
    const textOf = (toks) => toks.map((t) => t.w).join(' ');   // a sentence's key: its words
    all.forEach((t) => { t.word = textOf(t); });
    const KS = slot.byKind(ctx, picks, (x) => (caps(x).length ? 'in' : 'first'), (k) => (k === 'in' ? inner : plain), { words: true, prefix: 'c', page: (out) => !midFirst.length || out.some((x) => midFirst.includes(x)) });
    KS.items.forEach((x, i) => { picks[i] = x; });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const html = picks.map((toks, i) => {
      const words = toks.filter((t) => t.tag !== '.');
      const spans = words.map((t, k) => `<span data-lcs-pick="1"${mark && needs(t, k) ? ' data-lcs-correct="1"' : ''} data-lcs-cap="${needs(t, k) ? 1 : 0}" style="display:inline-block;padding:4px 8px;margin:3px 2px;border-radius:12px;font:700 ${d.rewrite ? 26 : 28}px/1.2 'Baloo 2',cursive;color:${T.ink}">${t.w.toLocaleLowerCase(L)}</span>`).join('');
      const line = d.rewrite ? `<div style="margin-top:4px">${writingRow({ w: 640, h: 60, glyphH: 30, xHeight: true }).svg}</div>` : '';
      return `<div data-lcs-cap-sentence="${i + 1}"${KS.tap(i)} style="padding:6px 12px;border-radius:14px;background:${T.cream}">${spans}<span style="font:700 28px/1 'Baloo 2',cursive;color:${T.ink}">.</span>${line}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-capitals style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${html.join('')}</div>`,
      meta: { sentences: picks.map((toks) => toks.filter((t) => t.tag !== '.').map((t, k) => (needs(t, k) ? `[${t.w}]` : t.w.toLocaleLowerCase(L))).join(' ') + '.') },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const ss = [...document.querySelectorAll('[data-lcs-cap-sentence]')];
      if (ss.length < 4) fails.push(`${ss.length} sentences`);
      ss.forEach((s, i) => {
        const toks = [...s.querySelectorAll('[data-lcs-cap]')];
        if (!toks.length || toks[0].dataset.lcsCap !== '1') fails.push(`sentence ${i + 1}: its first word is not marked`);
        if (toks.some((t) => t.textContent !== t.textContent.toLowerCase())) fails.push(`sentence ${i + 1} prints a capital`);
      });
      const root = document.querySelector('[data-lcs-capitals]').getBoundingClientRect();
      ss.forEach((s, i) => { if (s.getBoundingClientRect().right > root.right + 1) fails.push(`sentence ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
