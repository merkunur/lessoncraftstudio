/**
 * G1-244 — Write the Word (nt20-B; `write-the-word`, G1, L.1.2.d — the
 * French "dictée muette" / de "Bild beschriften"). Eight landscape cards:
 * picture on the left, a school-line ruling on the right; the child writes
 * the picture's name.
 *   d1 — a word bank on top (alphabetical, so position never leaks) and the
 *        first letter printed on the ruling as a starter.
 *   d2 — NO bank: one dashed letter box per letter under the picture (the
 *        dictée muette proper).
 *   d3 — plain ruling, nothing else.
 * The word never appears on its own card (verify).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { writingRow, strokeWordLane } = require('../../primitives/trace-path.js');
const { wordBank, letterBoxes } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { compare } = require('../../data/b2/collation.js');
// Level Set 2026-10-03: new pages name only reviewed pictures and words (shared with Word Tracing)
const { freshKeep, PAGE_SWAP } = require('../../lib/picture-word-review.js');

module.exports = {
  id: 'G1-244',
  slug: 'write-the-word',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'write-the-word',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true, levelSetBw: true },   // Level Set: a B&W theme is its own all-line-art page
  difficulty: {
    1: { cards: 6, cols: 2, rows: 3, bank: true, starter: true, boxes: false, pic: 104, glyphH: 36, rulingW: 190, maxLetters: 6 },
    2: { cards: 8, cols: 2, rows: 4, bank: false, starter: false, boxes: true, pic: 80, glyphH: 30, rulingW: 214, maxLetters: 12 },
    3: { cards: 8, cols: 2, rows: 4, bank: false, starter: false, boxes: false, pic: 80, glyphH: 30, rulingW: 214, minLetters: 5, maxLetters: 12 },
  },
  i18n: {
    en: {
      title: 'Write the Word',
      instruction: 'Say the name of each picture. Write the word on the line.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const fresh = !(Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1);
    let d = this.difficulty[difficulty];
    // NEW pages (the review 2026-10-03): with no word bank, a grade-1 child writes words of at most 9 letters
    if (fresh && !d.bank && d.maxLetters > 9) d = { ...d, maxLetters: 9 };
    let pool = entriesFor(theme, loc).filter((e) => !fresh || freshKeep(theme, e, loc))
      // one box per letter cannot hold a hyphen or an apostrophe (pt estrela-do-mar)
      .filter((e) => !fresh || !d.boxes || !/[-'’]/.test(displayWord(e.singular, loc))).map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => /^[\p{L}][\p{L}' ’-]*$/u.test(e.word))
      .filter((e) => [...e.word.replace(/[ '’-]/g, '')].length <= d.maxLetters && [...e.word].length >= (d.minLetters || 2));
    pool = distinctByWord(pool, (e) => e.word);
    if (d.starter) {
      // no two words sharing their first two letters (the starter must not be ambiguous)
      const out = [];
      for (const e of rng.shuffle(pool)) if (!out.some((o) => o.word.slice(0, 2).toLowerCase() === e.word.slice(0, 2).toLowerCase())) out.push(e);
      pool = out;
    }
    if (pool.length < d.cards) throw new Error(`G1-244: theme ${theme}/${loc} has ${pool.length} eligible nouns < ${d.cards}`);
    const picks = rng.sample(pool, d.cards);
    // a picture a child names otherwise (or a brand) on the PUBLISHED page: swapped after the draw for the next clean
    // word, so a published page without one is byte-identical (lib/picture-word-review.js PAGE_SWAP)
    if (!fresh) for (let i = 0; i < picks.length; i++) {
      if (!PAGE_SWAP.has(picks[i].vocabKey)) continue;
      const alt = pool.find((e) => !PAGE_SWAP.has(e.vocabKey) && !picks.includes(e));
      if (!alt) throw new Error(`G1-244: no clean word to replace "${picks[i].word}" (${loc} ${theme})`);
      picks[i] = alt;
    }
    const sorted = picks.slice().sort((a, b) => compare(a.word, b.word, loc));
    // card order must not equal the bank order nor its reverse
    let order = picks.slice(), guard = 0;
    const same = (a, b) => a.map((x) => x.word).join('|') === b.map((x) => x.word).join('|');
    while ((same(order, sorted) || same(order, sorted.slice().reverse())) && guard++ < 50) order = rng.shuffle(order);
    const cards = order.map((e) => {
      let right;
      if (d.starter) {
        const first = strokeWordLane({ text: [...e.word][0], w: 40, h: 64, glyphH: d.glyphH, reps: 1, stack: true, padLeft: 6 });
        right = `<div style="position:relative;width:${d.rulingW}px" data-lcs-hint="${[...e.word][0]}">${writingRow({ w: d.rulingW, h: 64, glyphH: d.glyphH, xHeight: true }).svg}` +
          `<div style="position:absolute;left:0;top:0">${first.svg}</div></div>`;
      } else {
        right = `<div style="width:${d.rulingW}px">${writingRow({ w: d.rulingW, h: 64, glyphH: d.glyphH, xHeight: true }).svg}</div>`;
      }
      const boxes = d.boxes ? `<div style="display:flex;justify-content:center;padding-top:2px">${letterBoxes({ n: [...e.word.replace(/[ ]/g, '')].length, box: Math.min(24, Math.floor(280 / [...e.word].length) - 4) })}</div>` : '';
      return `<div class="ws-card-stage" style="flex-direction:column;gap:4px;padding:6px 6px 2px" data-lcs-word="${e.word}" data-lcs-vocab="${e.vocabKey}">` +
        `<div style="display:flex;align-items:center;gap:12px;width:100%;justify-content:center">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${d.pic}px;height:${d.pic}px;flex:0 0 auto">${right}</div>${boxes}</div>`;
    });
    const bank = d.bank ? wordBank({ words: sorted.map((e) => ({ word: e.word, vocabKey: e.vocabKey })), wordPx: 17 }) : '';
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;min-height:0" data-lcs-bankmode="${d.bank ? 1 : 0}" data-lcs-boxes="${d.boxes ? 1 : 0}">${bank}${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
      meta: { words: order.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-bankmode]');
      const bankMode = root.dataset.lcsBankmode === '1', boxesMode = root.dataset.lcsBoxes === '1';
      const cards = [...document.querySelectorAll('[data-lcs-word]')];
      if (cards.length < 4) fails.push(`only ${cards.length} cards`);   // Level Set level 1: 4 big cards
      const words = cards.map((c) => c.dataset.lcsWord);
      if (new Set(words).size !== words.length) fails.push('duplicate words');
      cards.forEach((c, i) => {
        const w = c.dataset.lcsWord;
        const txt = [...c.querySelectorAll('*')].filter((n) => n.children.length === 0 && n.tagName !== 'IMG').map((n) => n.textContent.trim()).filter(Boolean).join(' ');
        if (txt) fails.push(`card ${i + 1}: visible text "${txt}"`);
        // the word must not be traced/printed on its card (only the starter letter is allowed)
        const lanes = c.querySelectorAll('[data-lcs-prim="trace-word"]');
        const hintEl = c.querySelector('[data-lcs-hint]'); if (hintEl) {
          if (lanes.length !== 1 || lanes[0].dataset.lcsText !== [...w][0]) fails.push(`card ${i + 1}: starter is not the first letter`);
        } else if (lanes.length) fails.push(`card ${i + 1}: word traced on its own card`);
        if (!c.querySelector('[data-lcs-prim="writing-row"]')) fails.push(`card ${i + 1}: no ruling`);
        const lb = c.querySelector('[data-lcs-letterboxes]');
        if (boxesMode) {
          if (!lb) fails.push(`card ${i + 1}: no letter boxes`);
          else if (+lb.dataset.lcsLetterboxes !== [...w.replace(/ /g, '')].length) fails.push(`card ${i + 1}: ${lb.dataset.lcsLetterboxes} boxes for "${w}"`);
        } else if (lb) fails.push(`card ${i + 1}: unexpected letter boxes`);
        const img = c.querySelector('img');
        if (!img || !img.complete || img.naturalWidth === 0) fails.push(`card ${i + 1}: picture broken`);
      });
      const bank = [...document.querySelectorAll('[data-lcs-bank-word]')].map((b) => b.dataset.lcsBankWord);
      if (bankMode) {
        if (bank.slice().sort().join('|') !== words.slice().sort().join('|')) fails.push('bank set != card set');
        if (bank.join('|') === words.join('|') || bank.join('|') === words.slice().reverse().join('|')) fails.push('bank order equals card order (position leak)');
      } else if (bank.length) fails.push('bank present outside d1');
      return fails;
    });
  },
};
