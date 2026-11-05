/**
 * G1-490 — Label the Pictures (Word Tracing & Writing maker 2026-11-02, NEW-TEMPLATES §34 T2; L.1.2.d, the de "Bilder
 * beschriften" / fr "légender"): a board of pictures from one theme, a line under each; the child writes each picture's
 * name on its line — from a word bank at levels 1-2, from memory at level 3. G1-244 writes one word beside each picture
 * on a card; this is the labelled board (the vocabulary poster a class makes), every word on its own line.
 * Words come from image-vocabulary through the reviewed picture-word rules (lib/picture-word-review.js freshKeep: a word a
 * child names from the drawing), distinct on the page; the bank is in alphabetical order (lib collation), never the
 * board's order nor its reverse. Every picture is a slot (the theme's own pictures). A page holds at most ONE picture of
 * each look-alike group (LOOKALIKE: the round red and orange fruits are drawn alike — a peach, an apricot and a cherry read
 * as apples; boats; cars; a sofa and a couch): with a bank, two of them would make two names fit one picture.
 * Levels: 1 four pictures, the bank, words of at most 7 letters · 2 six pictures, the bank · 3 six pictures, no bank.
 */
'use strict';
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');   // pictures a child names otherwise (contact sheets 2026-11-02)
const { wordBank } = require('../../templates/components-b2.js');
const { compare } = require('../../data/b2/collation.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const LOOKALIKE = [
  ['apple', 'peach', 'apricot', 'nectarine', 'cherry', 'plum', 'mango', 'orange', 'clementine', 'tangerine', 'persimmon', 'pomegranate', 'grapefruit', 'tomato'],
  ['lemon', 'lime'], ['cucumber', 'zucchini'], ['boat', 'ship', 'ferry', 'yacht', 'sailboat'], ['car', 'taxi', 'jeep', 'race_car'],
  ['sofa', 'couch'], ['cup', 'mug'], ['jug', 'pitcher'], ['rabbit', 'bunny'], ['chick', 'duckling'], ['duck', 'goose', 'swan'],
  ['dog', 'puppy', 'wolf'], ['cat', 'kitten'], ['bear', 'teddy_bear'], ['airplane', 'jet'], ['hat', 'cap'],
];
const groupOf = (k) => LOOKALIKE.findIndex((g) => g.includes(k));

const D = {
  1: { n: 4, cols: 2, px: 160, bank: true, maxLetters: 7, lineW: 230, fs: 30 },
  2: { n: 6, cols: 3, px: 126, bank: true, maxLetters: 10, lineW: 190, fs: 26 },
  3: { n: 6, cols: 3, px: 126, bank: false, maxLetters: 10, lineW: 190, fs: 26 },
};

module.exports = {
  id: 'G1-490',
  slug: 'label-the-pictures',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'write-the-word',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Label the Pictures', instruction: 'Write the name of each picture on the line under it. The word bank can help you.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, loc = String(locale || 'en').slice(0, 2);
    let pool = entriesFor(theme, loc).filter((e) => freshKeep(theme, e, loc) && !nameRefused(theme, e.noun)).map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => /^\p{L}+$/u.test(e.word) && [...e.word].length >= 2 && [...e.word].length <= d.maxLetters);
    pool = distinctByWord(pool, (e) => e.word);
    if (pool.length < d.n) throw new Error(`G1-490: theme ${theme}/${loc} has ${pool.length} words of at most ${d.maxLetters} letters (< ${d.n})`);
    // drawn one at a time so no two pictures of one look-alike group share the page
    const drawn = [];
    for (const e of rng.shuffle(pool)) { if (drawn.length === d.n) break; const g = groupOf(e.vocabKey); if (g >= 0 && drawn.some((x) => groupOf(x.vocabKey) === g)) continue; drawn.push(e); }
    if (drawn.length < d.n) throw new Error(`G1-490: theme ${theme}/${loc} has ${drawn.length} pictures that do not look alike (< ${d.n})`);
    let picks = slot.pictures(ctx, drawn, pool, theme, 'pic');
    // a teacher's swap that brings a look-alike onto the page is refused
    // (the slot is recorded again without the override, so the screen shows the page's own pictures, not the refused one)
    if (picks.some((e, i) => { const g = groupOf(e.vocabKey); return g >= 0 && picks.some((x, j) => j !== i && groupOf(x.vocabKey) === g); })) { picks = slot.pictures({ ...ctx, overrides: null }, drawn, pool, theme, 'pic'); slot.refuse(ctx, 'pic'); }
    const sorted = picks.slice().sort((a, b) => compare(a.word, b.word, loc));
    let order = picks.map((e, i) => ({ e, i }));
    const same = (a, b) => a.map((x) => x.word).join('|') === b.map((x) => x.word).join('|');
    for (let g = 0; g < 50 && (same(order.map((x) => x.e), sorted) || same(order.map((x) => x.e), sorted.slice().reverse())); g++) order = rng.shuffle(order);
    const cells = order.map(({ e, i }) => `<div data-lcs-label-cell="${e.word}" style="display:flex;flex-direction:column;align-items:center;gap:10px">` +
      `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-vocab="${e.vocabKey}"${slot.attr(ctx, 'pic', i)} style="width:${d.px}px;height:${d.px}px">` +
      `<span class="ws-answerbox" data-lcs-answer="${e.word}" style="display:inline-block;width:${d.lineW}px;height:${Math.round(d.fs * 1.6)}px;border:0;border-bottom:2.5px solid ${T.ink};border-radius:0;background:transparent;font-size:${d.fs}px;line-height:${Math.round(d.fs * 1.6)}px;text-align:center"></span></div>`);
    const bank = d.bank ? wordBank({ words: sorted.map((e) => ({ word: e.word, vocabKey: e.vocabKey })), wordPx: 20 }) : '';
    const board = `<div class="ws-card" style="width:660px;padding:18px 10px;background:#FFFFFF;flex:1 1 auto;display:grid;grid-template-columns:repeat(${d.cols},1fr);align-content:space-evenly;justify-items:center;row-gap:24px" data-lcs-board>${cells.join('')}</div>`;
    return { bodyHtml: `<div data-ws-content data-lcs-bankmode="${d.bank ? 1 : 0}" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:14px;min-height:0">${bank}${board}</div>`, meta: { words: order.map((x) => x.e.word) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cells = [...document.querySelectorAll('[data-lcs-label-cell]')], words = cells.map((c) => c.dataset.lcsLabelCell);
      if (cells.length < 4) fails.push(`${cells.length} pictures`);
      if (new Set(words).size !== words.length) fails.push('a word twice');
      cells.forEach((c, i) => {
        const a = c.querySelector('[data-lcs-answer]'); if (!a || a.dataset.lcsAnswer !== c.dataset.lcsLabelCell) fails.push(`picture ${i + 1}: its line is not its word`);
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`picture ${i + 1}: did not load`);
      });
      const bankMode = document.querySelector('[data-lcs-bankmode]').dataset.lcsBankmode === '1';
      const bank = [...document.querySelectorAll('[data-lcs-bank-word]')].map((b) => b.dataset.lcsBankWord);
      if (bankMode) {
        if (bank.slice().sort().join('|') !== words.slice().sort().join('|')) fails.push('the bank is not the board\'s words');
        if (bank.join('|') === words.join('|') || bank.join('|') === words.slice().reverse().join('|')) fails.push('the bank is in the board\'s order');
      } else if (bank.length) fails.push('a bank on a page without one');
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect(), b = document.querySelector('[data-lcs-board]').getBoundingClientRect();
      if (b.bottom > pg.bottom + 1) fails.push('the board leaves the page');
      return fails;
    });
  },
};
