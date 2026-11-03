/**
 * K-533 — Colour the Vowels (Alphabet & Letters maker 2026-11-02, NEW-TEMPLATES §37 T5; RF.K.1 + the locale's vowel
 * set): picture words of the theme, each printed letter by letter in boxes beside its picture; the child colours every
 * vowel (K-230 sorts isolated letters; here the vowels are found inside real words). The vowels are the locale's own
 * (types/_shared/alphabet-more.js: de ä ö ü, sv/fi y å ä ö, da/no y æ ø å, fr y; every accented vowel é è ê à ã õ …).
 * A word whose letters are not plainly vowel or consonant in the locale is never drawn: en/es/pt/it/nl/de words with y
 * (en "boy", es "rey"), nl words with the ij digraph. Words come through the reviewed picture-word rules
 * (lib/picture-word-review.js freshKeep), one word each, letters only, distinct on the page; every picture is a slot.
 * Every letter box is a tap target; the vowels are the correct ones (key: ringed).
 * Levels: 1 four words of 3-5 letters · 2 six words of 4-7 letters · 3 six words of 5-9 letters.
 */
'use strict';
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 4, min: 3, max: 5, px: 104, box: 52 },
  2: { n: 6, min: 4, max: 7, px: 78, box: 44 },
  3: { n: 6, min: 5, max: 9, px: 72, box: 40 },
};
// letters whose vowel-or-consonant role depends on the word: kept off these pages
const AMBIGUOUS = { en: /y/u, es: /y/u, pt: /y/u, it: /y/u, de: /y/u, nl: /y|ij/u };
// loanwords that keep a foreign spelling (native review 2026-11-02): a Nordic q-word (squash) puts a /w/ u among the vowels
const LOAN = { sv: /q/u, da: /q/u, no: /q/u };
// every letter of a word is one of the locale's school alphabet (an accented vowel counts as its vowel; de ß): it koala
// has a k the 21-letter Italian alphabet does not teach
const inAlphabet = (word, L) => { const al = new Set(A.alphabetOf(L)); return [...word.toLocaleLowerCase(L)].every((ch) => al.has(ch) || al.has(ch.normalize('NFD')[0]) || (L === 'de' && ch === 'ß')); };

module.exports = {
  id: 'K-533',
  slug: 'colour-the-vowels',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-knowledge',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Color the Vowels', instruction: 'Say the name of each picture. Color every vowel in the word.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const amb = AMBIGUOUS[L];
    let pool = entriesFor(theme, L).filter((e) => freshKeep(theme, e, L) && !nameRefused(theme, e.noun)).map((e) => ({ ...e, word: displayWord(e.singular, L) }))
      .filter((e) => /^\p{L}+$/u.test(e.word) && [...e.word].length >= d.min && [...e.word].length <= d.max && !(amb && amb.test(e.word.toLocaleLowerCase(L))) && !(LOAN[L] && LOAN[L].test(e.word.toLocaleLowerCase(L))) && inAlphabet(e.word, L))
      .filter((e) => [...e.word].some((ch) => A.isVowel(ch, L)) && [...e.word].some((ch) => !A.isVowel(ch, L)));
    pool = distinctByWord(pool, (e) => e.word);
    if (pool.length < d.n) throw new Error(`K-533: theme ${theme}/${L} has ${pool.length} words of ${d.min}-${d.max} letters (< ${d.n})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme, 'pic');
    const rows = picks.map((e, i) => {
      const tiles = [...e.word].map((ch) => `<span data-lcs-pick="1"${A.isVowel(ch, L) ? ' data-lcs-correct="1"' : ''} data-lcs-tile="${ch}" style="display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:${d.box}px;height:${d.box + 6}px;border:2.5px solid ${T.teal};border-radius:8px;background:#FFFFFF;font:700 ${Math.round(d.box * 0.66)}px/1 'Baloo 2',cursive;color:${T.ink}">${ch}</span>`).join('');
      return `<div class="ws-card-stage" data-lcs-vowel-word="${e.word}" style="justify-content:flex-start;gap:22px;padding:6px 18px">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt=""${slot.attr(ctx, 'pic', i)} style="width:${d.px}px;height:${d.px}px;flex:0 0 auto">` +
        `<span style="display:inline-flex;gap:5px">${tiles}</span></div>`;
    });
    const { cardGrid } = require('../../templates/layouts/card-grid.js');
    return { bodyHtml: cardGrid({ cards: rows, cols: 1, rows: rows.length, numbered: false }), meta: { words: picks.map((e) => e.word) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-vowel-word]')];
      if (rows.length < 4) fails.push(`${rows.length} words`);
      const ws = rows.map((r) => r.dataset.lcsVowelWord); if (new Set(ws).size !== ws.length) fails.push('a word twice');
      rows.forEach((r, i) => {
        const tiles = [...r.querySelectorAll('[data-lcs-tile]')];
        if (tiles.map((t) => t.textContent).join('') !== r.dataset.lcsVowelWord) fails.push(`word ${i + 1}: the boxes do not spell it`);
        const v = tiles.filter((t) => t.hasAttribute('data-lcs-correct')).length;
        if (!v || v === tiles.length) fails.push(`word ${i + 1}: ${v} vowels of ${tiles.length} letters`);
        const im = r.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`word ${i + 1}: the picture did not load`);
        const R = r.getBoundingClientRect(); tiles.forEach((t) => { if (t.getBoundingClientRect().right > R.right - 2) fails.push(`word ${i + 1}: a letter leaves the card`); });
      });
      return fails;
    });
  },
};
