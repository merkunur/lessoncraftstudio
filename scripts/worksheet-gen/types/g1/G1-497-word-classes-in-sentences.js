/**
 * G1-497 — Word Classes in Sentences (Grammar maker 2026-11-02, NEW-TEMPLATES §45 T2; L.1.1.b-f / L.2.1 the word classes
 * in context; de "Wortarten bestimmen", nl "woordsoorten benoemen", sv "ordklasser"): short sentences, every word a
 * tappable box; the child circles every word of one class — level 1 the nouns (names are nouns too), level 2 the verbs,
 * level 3 the adjectives — in context, not sorted from a list (G1-293 / G2-275 sort isolated words). The sentences and
 * every word's class in them are literals per locale (data/grammar/grammar-tables.js SENTENCES), so a word that can be
 * two classes is tagged by the sentence it stands in. The right words are ringed on the key.
 * Levels: 1 five sentences, nouns · 2 six sentences, verbs · 3 six sentences, adjectives.
 *
 * Where the asked words stand (2026-11-17): in the shared bank every verb is the 4th word and most adjectives the 2nd,
 * so a page could be solved by position. The verb and adjective pages (levels 2 and 3, every copy but the published
 * level-2 copy 1) now also draw from WORD_CLASS_SENTENCES (the verb and the adjective elsewhere) and take the draw
 * whose most common answer place holds at most half of the page's answers (the best of up to 400 seeded draws where
 * a bank cannot give that). Level 1 (nouns: no place holds more than about half) and the published page are as they were.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { SENTENCES, WORD_CLASS_SENTENCES } = require('../../data/grammar/grammar-tables.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 5, find: ['N', 'M'] }, 2: { n: 6, find: ['V'] }, 3: { n: 6, find: ['A'] } };
const parse = (s) => s.split(' ').map((t) => { const i = t.lastIndexOf('/'); return { w: t.slice(0, i), tag: t.slice(i + 1) }; });
/** the places (1-based word numbers) of a sentence's asked words */
const answerPlaces = (toks, find) => toks.filter((t) => t.tag !== '.').map((t, i) => (find.includes(t.tag) ? i + 1 : 0)).filter(Boolean);
/** the share of a pick's answers that stand in its most common place */
function topPlaceShare(pick, find) {
  const n = {}; let all = 0;
  for (const toks of pick) for (const p of answerPlaces(toks, find)) { n[p] = (n[p] || 0) + 1; all++; }
  return all ? Math.max(...Object.values(n)) / all : 1;
}
/** n sentences whose asked words do not stand in one place: the first seeded draw with at most half of the answers in
 *  one place, else the draw with the smallest such share (a bank that cannot give half) */
function placeBalancedSample(fit, n, find, rng) {
  let best = null, bestShare = 2;
  for (let t = 0; t < 400; t++) {
    const s = rng.sample(fit, n), share = topPlaceShare(s, find);
    if (share < bestShare) { best = s; bestShare = share; }
    if (share <= 0.5) break;
  }
  return best;
}

module.exports = {
  _test: { topPlaceShare, placeBalancedSample, answerPlaces, parse },
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
    const textOf = (toks) => toks.map((t) => t.w).join(' ');   // a sentence's key: its words
    // the verb and adjective pages past the published one: the extra sentences too, and a draw that is not solved by place
    const balance = d.find.some((c) => c === 'V' || c === 'A') && !(Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1);
    const all = balance ? bank.concat((WORD_CLASS_SENTENCES[L] || []).filter((s) => !bank.includes(s))) : bank;
    const fit = all.map(parse).filter((toks) => toks.some((t) => d.find.includes(t.tag)));
    fit.forEach((t) => { t.word = textOf(t); });
    const draw = balance ? placeBalancedSample(fit, d.n, d.find, rng) : rng.sample(fit, d.n);
    const picks = slot.words(ctx, draw, fit, 'sent');   // a teacher's sentences (maker): another with the asked class
    if (picks.length < d.n) throw new Error(`G1-497: ${L} has ${picks.length} sentences with the class`);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const html = picks.map((toks, i) => {
      const words = toks.filter((t) => t.tag !== '.');
      // min-width 36: a one-letter word (en "I", "a") printed a 25 px box, and its grown tap target stops half way to its
      // neighbour's (4 px of margin) — 28 px on the screen, under the 34 px tablet floor (screen-from-marks, 2026-11-04)
      const spans = words.map((t) => `<span data-lcs-pick="1"${mark && d.find.includes(t.tag) ? ' data-lcs-correct="1"' : ''} data-lcs-tag="${t.tag}" style="display:inline-block;box-sizing:border-box;min-width:36px;text-align:center;padding:4px 8px;margin:3px 2px;border-radius:12px;font:700 28px/1.2 'Baloo 2',cursive;color:${T.ink}">${t.w}</span>`).join('');
      return `<div data-lcs-class-sentence="${i + 1}"${slot.attr(ctx, 'sent', i)} style="padding:6px 12px;border-radius:14px;background:${T.cream};line-height:1.6">${spans}<span style="margin-left:-9px;font:700 28px/1 'Baloo 2',cursive;color:${T.ink}">.</span></div>`;   // the full stop sits ON the last word (its box's 8 px padding + 2 px margin printed "Mia ." — a space a K-2 page must not model)
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
