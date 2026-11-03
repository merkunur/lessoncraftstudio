/**
 * G1-497 — Word Classes in Sentences (Grammar maker 2026-11-02, NEW-TEMPLATES §45 T2; L.1.1.b-f / L.2.1 the word classes
 * in context; de "Wortarten bestimmen", nl "woordsoorten benoemen", sv "ordklasser"): short sentences, every word a
 * tappable box; the child circles every word of one class — level 1 the nouns (names are nouns too), level 2 the verbs,
 * level 3 the adjectives — in context, not sorted from a list (G1-293 / G2-275 sort isolated words). The sentences and
 * every word's class in them are literals per locale (data/grammar/grammar-tables.js SENTENCES), so a word that can be
 * two classes is tagged by the sentence it stands in. The right words are ringed on the key.
 * Levels: 1 five sentences, nouns · 2 six sentences, verbs · 3 six sentences, adjectives.
 */
'use strict';
const { SENTENCES } = require('../../data/grammar/grammar-tables.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 5, find: ['N', 'M'] }, 2: { n: 6, find: ['V'] }, 3: { n: 6, find: ['A'] } };
const parse = (s) => s.split(' ').map((t) => { const i = t.lastIndexOf('/'); return { w: t.slice(0, i), tag: t.slice(i + 1) }; });

module.exports = {
  id: 'G1-497',
  slug: 'word-classes-in-sentences',
  gradeBand: 'G1',
  assetClass: 'none',
  exerciseType: 'word-classes',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Parts of Speech in Sentences', instruction: 'Read each sentence. Circle every noun. Names are nouns too.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[1], rng = ctx.rng, L = A.loc2(locale);
    const bank = SENTENCES[L];
    if (!bank) throw new Error(`G1-497: no sentences for ${L}`);
    const picks = rng.sample(bank.map(parse).filter((toks) => toks.some((t) => d.find.includes(t.tag))), d.n);
    if (picks.length < d.n) throw new Error(`G1-497: ${L} has ${picks.length} sentences with the class`);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const html = picks.map((toks, i) => {
      const words = toks.filter((t) => t.tag !== '.');
      const spans = words.map((t) => `<span data-lcs-pick="1"${mark && d.find.includes(t.tag) ? ' data-lcs-correct="1"' : ''} data-lcs-tag="${t.tag}" style="display:inline-block;padding:4px 8px;margin:3px 2px;border-radius:12px;font:700 28px/1.2 'Baloo 2',cursive;color:${T.ink}">${t.w}</span>`).join('');
      return `<div data-lcs-class-sentence="${i + 1}" style="padding:6px 12px;border-radius:14px;background:${T.cream};line-height:1.6">${spans}<span style="font:700 28px/1 'Baloo 2',cursive;color:${T.ink}">.</span></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-classes="${d.find.join('')}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${html.join('')}</div>`,
      meta: { find: d.find.join(''), sentences: picks.map((toks) => toks.map((t) => (d.find.includes(t.tag) ? `[${t.w}]` : t.w)).join(' ')) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const ss = [...document.querySelectorAll('[data-lcs-class-sentence]')];
      if (ss.length < 5) fails.push(`${ss.length} sentences`);
      const find = document.querySelector('[data-lcs-classes]').dataset.lcsClasses;
      ss.forEach((s, i) => { if (![...s.querySelectorAll('[data-lcs-tag]')].some((t) => find.includes(t.dataset.lcsTag))) fails.push(`sentence ${i + 1} has no word to find`); });
      const root = document.querySelector('[data-lcs-classes]').getBoundingClientRect();
      ss.forEach((s, i) => { if (s.getBoundingClientRect().right > root.right + 1) fails.push(`sentence ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
