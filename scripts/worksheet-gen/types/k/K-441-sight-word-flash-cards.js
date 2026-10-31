/**
 * K-441 — Sight Word Flash Cards (maker template, 2026-10-31). Teacher material: eight big word cards per page to cut
 * out (pocket chart, flashing, word wall, games). One font size for all eight, fitted to the longest word.
 *   level 1: 8 words of the core 24   level 2: 8 of the first 50
 *   level 3: 8 of the whole list, each card also showing the word in its shortest bank sentence (read it in context)
 * Words: the Sight Words Level Set bank; a teacher may swap any word for another of the list (lib/slot.js).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const slot = require('../../lib/slot.js');

const CARD_W = 318;

module.exports = {
  id: 'K-441',
  slug: 'sight-word-flash-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  difficulty: {
    1: { sentence: false },
    2: { sentence: false },
    3: { sentence: true },
  },
  i18n: { en: { title: 'Sight Word Flash Cards', instruction: 'Cut out the cards and read them.' } },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const pool = P.levelWords(loc, difficulty);
    const words = slot.words(ctx, ctx.rng.sample(pool, 8), pool);
    const longest = words.reduce((m, w) => Math.max(m, [...w].length), 1);
    const px = Math.max(36, Math.min(96, Math.floor((CARD_W - 40) / (longest * 0.6))));
    const sentenceOf = (w) => SW.sentencesOf(w, loc).slice().sort((a, b) => a.length - b.length)[0];
    const cards = words.map((w, i) => slot.stamp(ctx, 'word', i,
      `<div data-lcs-frame data-lcs-card-word="${P.esc(w)}" style="border:2px dashed ${P.INK};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:10px;min-height:0">` +
      `<span style="font-family:${P.FONT_B};font-weight:800;font-size:${px}px;line-height:1.1;color:${P.INK}">${P.esc(w)}</span>` +
      (d.sentence ? `<span data-lcs-card-sentence style="font-family:${P.FONT_B};font-weight:700;font-size:18px;line-height:1.3;color:${P.INK};text-align:center">${P.esc(sentenceOf(w))}</span>` : '') +
      `</div>`));
    return {
      // the cards touch: one cut line between two cards
      bodyHtml: `<div data-ws-content data-lcs-flashcards style="flex:1;display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(4,1fr);gap:0">${cards.join('')}</div>`,
      meta: { words },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-card-word]')];
      if (cards.length !== 8) fails.push(`${cards.length} cards, not 8`);
      const words = cards.map((c) => c.dataset.lcsCardWord);
      if (new Set(words).size !== words.length) fails.push('a word appears twice');
      cards.forEach((c, i) => {
        const span = c.firstElementChild;
        if (!span || span.textContent !== words[i]) fails.push(`card ${i + 1} shows another word`);
        if (span && span.getBoundingClientRect().width > c.getBoundingClientRect().width - 8) fails.push(`card ${i + 1}: the word does not fit`);
        const s = c.querySelector('[data-lcs-card-sentence]');
        if (s) {
          const esc = words[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          if (!new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu').test(s.textContent)) fails.push(`card ${i + 1}: the sentence lacks the word`);
        }
      });
      return fails;
    });
  },
};
