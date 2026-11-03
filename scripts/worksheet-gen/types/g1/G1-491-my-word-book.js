/**
 * G1-491 — My Word Book (Word Tracing & Writing maker 2026-11-02, NEW-TEMPLATES §34 T4; L.1.6 + W.1.2): the vocabulary
 * notebook page — each entry a picture of the theme, a line for its word and lines for the child's own sentence about it.
 * Words come from image-vocabulary through the reviewed picture-word rules (lib/picture-word-review.js freshKeep: a word a
 * child names from the drawing), one word only, distinct on the page; every picture is a slot. The sentence is the
 * child's own, so the page has no answer key.
 * Levels: 1 two entries, the word dashed to trace, two sentence lines · 2 four entries, the word line empty, one sentence
 * line · 3 three entries, the word line empty, two sentence lines.
 */
'use strict';
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');   // pictures a child names otherwise (contact sheets 2026-11-02)
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');
const { rulingBlock } = require('../../templates/components-b2.js');
const slot = require('../../lib/slot.js');

const D = {
  1: { n: 2, px: 190, trace: true, lines: 2, wordH: 92, glyphH: 56, lineH: 84, maxLetters: 9 },
  2: { n: 4, px: 112, trace: false, lines: 1, wordH: 64, glyphH: 34, lineH: 58, maxLetters: 10 },
  3: { n: 3, px: 120, trace: false, lines: 2, wordH: 62, glyphH: 32, lineH: 56, maxLetters: 10 },
};

module.exports = {
  id: 'G1-491',
  slug: 'my-word-book',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'write-the-word',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'My Word Book', instruction: 'Write the name of each picture on the first line. Then write a sentence of your own about it.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, loc = String(locale || 'en').slice(0, 2);
    let pool = entriesFor(theme, loc).filter((e) => freshKeep(theme, e, loc) && !nameRefused(theme, e.noun)).map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => /^\p{L}+$/u.test(e.word) && [...e.word].length <= d.maxLetters);
    pool = distinctByWord(pool, (e) => e.word);
    if (pool.length < d.n) throw new Error(`G1-491: theme ${theme}/${loc} has ${pool.length} words (< ${d.n})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme, 'pic');
    const ruleW = 660 - d.px - 60;
    const entries = picks.map((e, i) => {
      const word = d.trace
        ? strokeWordLane({ text: e.word, w: ruleW, h: d.wordH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true, padLeft: 8 }).svg
        : writingRow({ w: ruleW, h: d.wordH, glyphH: d.glyphH, xHeight: true }).svg;
      return `<div class="ws-card" data-lcs-book-entry="${e.word}" style="width:660px;flex:0 0 auto;flex-direction:row;align-items:center;gap:20px;padding:10px 14px;background:#FFFFFF">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt=""${slot.attr(ctx, 'pic', i)} style="width:${d.px}px;height:${d.px}px;flex:0 0 auto">` +
        `<div style="display:flex;flex-direction:column;gap:10px"><div data-lcs-word-line>${word}</div>` +
        `<div data-lcs-sentence-lines="${d.lines}">${rulingBlock({ rows: d.lines, w: ruleW, h: d.lineH, glyphH: Math.round(d.lineH * 0.42) })}</div></div></div>`;
    });
    return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center">${entries.join('')}</div>`, meta: { words: picks.map((e) => e.word) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const es = [...document.querySelectorAll('[data-lcs-book-entry]')];
      if (es.length < 2) fails.push(`${es.length} entries`);
      const ws = es.map((e) => e.dataset.lcsBookEntry); if (new Set(ws).size !== ws.length) fails.push('a word twice');
      es.forEach((e, i) => {
        const lane = e.querySelector('[data-lcs-word-line] [data-lcs-prim="trace-word"]');
        if (lane && lane.dataset.lcsText !== e.dataset.lcsBookEntry) fails.push(`entry ${i + 1}: the traced word is not the picture's`);
        if (!e.querySelector('[data-lcs-sentence-lines]')) fails.push(`entry ${i + 1}: no sentence lines`);
        const im = e.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`entry ${i + 1}: the picture did not load`);
      });
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      es.forEach((e) => { if (e.getBoundingClientRect().bottom > pg.bottom + 1) fails.push('an entry leaves the page'); });
      return fails;
    });
  },
};
