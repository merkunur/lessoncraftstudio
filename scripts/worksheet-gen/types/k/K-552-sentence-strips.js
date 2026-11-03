/**
 * K-552 — Sentence Strips (Sentences maker 2026-11-02, NEW-TEMPLATES §47 T1; L.K.1.f / L.1.1.j produce complete
 * sentences; the literacy-centre strip; material): each sentence printed as a strip of word cards with cut lines, its
 * picture beside it, and an empty strip below; the child reads the sentence, cuts the cards apart, mixes them, puts the
 * sentence back together and glues it on the empty strip. The sentences are the native bank's frames with a picture noun
 * of the theme (data/b2/sentences.js, the rules of G1-249: no living thing in a gift frame, the reviewed blocked nouns),
 * or the teacher's own: she taps a sentence and types hers (sentences-Q1: own text is allowed on strips — no puzzle,
 * her text is the content), accepted when it is 2-10 words, ends with . ? or ! and fits the strip; her sentence has no
 * picture. Tokens follow the bank's rules (lib/sentence-bank.js tokenize: an end mark stays on its word). The key prints
 * each sentence on its empty strip.
 * Levels: 1 two sentences · 2 three sentences · 3 four sentences.
 */
'use strict';
const SB = require('../../lib/sentence-bank.js');
const { frameSentences } = require('../_shared/sentence-items.js');
const slot = require('../../lib/slot.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660;
const D = { 1: { n: 2, font: 30, px: 84 }, 2: { n: 3, font: 28, px: 72 }, 3: { n: 4, font: 26, px: 62 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = {
  id: 'K-552',
  slug: 'sentence-strips',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sentence-building',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Sentence Strips', instruction: 'Read the sentence. Cut the words apart, mix them up and put the sentence back together. Glue it on the empty strip.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const items = frameSentences({ locale: L, theme, rng, n: d.n, maxTokens: 8 });
    const key = !!(ctx && ctx.answerKey);
    // the cards of a sentence and the width they need at a font size
    const cardW = (tok, f) => Math.ceil([...tok].length * f * 0.56) + 26;
    const fits = (toks, f, room) => toks.reduce((a, t) => a + cardW(t, f), 0) <= room;
    const rows = items.map((it, i) => {
      // the teacher's own sentence (tap-to-edit): 2-10 words, an end mark, it fits the strip
      let s = slot.text(ctx, it.canonical, 'sent' + i, 70);
      let own = s !== it.canonical;
      let toks = SB.tokenize(s);
      const room = W - (own ? 0 : d.px + 14);
      if (own && !(toks.length >= 2 && toks.length <= 10 && /[.?!]$/.test(s) && /\p{L}/u.test(s) && fits(toks, d.font - 6, room))) { slot.refuse(ctx, 'sent' + i); s = it.canonical; own = false; toks = SB.tokenize(s); }
      let f = d.font;
      while (f > 18 && !fits(toks, f, own ? W : W - d.px - 14)) f -= 2;
      const strip = `<div data-lcs-strip="${i + 1}" style="display:flex;border:2.5px solid ${T.teal};border-radius:10px;background:#FFFFFF;overflow:hidden">` +
        toks.map((t, k) => `<span data-lcs-strip-word="${k + 1}" style="flex:0 0 auto;padding:10px 12px;${k ? `border-left:2.5px dashed ${T.grid};` : ''}font:700 ${f}px/1.2 'Baloo 2',cursive;color:${T.ink};white-space:nowrap">${esc(t)}</span>`).join('') + '</div>';
      const glue = `<div data-lcs-glue="${i + 1}" style="position:relative;height:${Math.round(f * 1.2 + 26)}px;border:2.5px dashed ${T.teal};border-radius:10px;background:${T.cream};display:flex;align-items:center;padding:0 12px">` +
        (key ? `<span data-lcs-key-sample="1" style="font:700 ${f}px/1 'Baloo 2',cursive;color:${T.teal};white-space:nowrap">${esc(s)}</span>` : '') + '</div>';
      const pic = own ? '' : `<img class="ws-icon" src="${it.src}" alt="" style="width:${d.px}px;height:${d.px}px;flex:0 0 auto;object-fit:contain">`;
      return slot.stamp(ctx, 'sent' + i, 0, `<div data-lcs-strip-row="${i + 1}" data-lcs-own="${own ? 1 : 0}" style="display:flex;flex-direction:column;gap:10px">`) +
        `<div style="display:flex;align-items:center;gap:14px">${pic}${strip}</div>${glue}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-strips style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:16px;min-height:0">${rows.join('')}</div>`,
      meta: { sentences: items.map((it) => it.canonical) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-strip-row]')];
      if (rows.length < 2) fails.push(`${rows.length} strips`);
      const root = document.querySelector('[data-lcs-strips]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const s = r.querySelector('[data-lcs-strip]').getBoundingClientRect();
        if (s.right > root.right + 1) fails.push(`strip ${i + 1} leaves the page`);
        if (r.getBoundingClientRect().bottom > root.bottom + 1) fails.push(`strip ${i + 1} runs past the page`);
        const im = r.querySelector('img'); if (im && (!im.complete || !im.naturalWidth)) fails.push(`strip ${i + 1}: the picture did not load`);
      });
      return fails;
    });
  },
};
