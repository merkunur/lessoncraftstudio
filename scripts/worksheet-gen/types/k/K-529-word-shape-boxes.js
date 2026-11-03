/**
 * K-529 — Word Shape Boxes (Word Tracing & Writing maker 2026-11-02, NEW-TEMPLATES §34 T3; L.K.2 / L.1.2.d): each picture
 * with its word's SHAPE — one box per letter, tall for a letter that reaches up (b d f h k l t, a capital), hanging below
 * the line for one that reaches down (g j p q y), small for the rest (lib/letter-heights.js) — the classic spelling
 * scaffold; the child says the word and writes one letter in each box. Words from image-vocabulary through the reviewed
 * picture-word rules (lib/picture-word-review.js freshKeep), one word only, letters only, distinct on the page; every
 * picture is a slot. Each box the child fills is an empty answer box with its letter: the KEY shows the word in its boxes
 * and the screen types it letter by letter.
 * Levels: 1 four words of 3-5 letters, the first letter written in its box · 2 six words of 3-6 letters · 3 six words of
 * 5-8 letters.
 */
'use strict';
const { entriesFor, displayWord, distinctByWord, fileUri } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');   // pictures a child names otherwise (contact sheets 2026-11-02)
const { shapeOf } = require('../../lib/letter-heights.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 4, min: 3, max: 5, first: true, px: 120, unit: 34 },
  2: { n: 6, min: 3, max: 6, first: false, px: 92, unit: 28 },
  3: { n: 6, min: 5, max: 8, first: false, px: 92, unit: 26 },
};

/** the boxes of one word: x-height boxes on one baseline, a tall box rising 0.75 unit higher, a low one hanging 0.75 lower */
// every box the child fills is an empty answer box holding its letter (the key shows it, the screen types it, one letter
// per box); the printed first letter of level 1 is given text, not an answer
function boxes(word, unit, first) {
  const shape = shapeOf(word), w = Math.round(unit * 0.95), ext = Math.round(unit * 0.75);
  const cells = [...word].map((ch, i) => {
    const s = shape[i], h = unit + (s === 'mid' ? 0 : ext), mt = s === 'tall' ? 0 : ext, given = first && i === 0;
    return `<span data-lcs-shape-box="${s}"${given ? ' data-lcs-given="1"' : ` data-lcs-answer="${ch}"`} style="display:inline-flex;align-items:${s === 'low' ? 'flex-start' : 'flex-end'};justify-content:center;box-sizing:border-box;width:${w}px;height:${h}px;margin-top:${mt}px;border:2.5px solid ${T.teal};border-radius:4px;background:#FFFFFF;font-family:'Baloo 2',cursive;font-weight:700;font-size:${Math.round(unit * 0.95)}px;line-height:1;color:${T.ink}">${given ? ch : ''}</span>`;
  });
  return `<span style="display:inline-flex;align-items:flex-start;gap:3px">${cells.join('')}</span>`;
}

module.exports = {
  id: 'K-529',
  slug: 'word-shape-boxes',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'write-the-word',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Word Shape Boxes', instruction: 'Say the name of each picture. Write one letter in each box: tall letters in the tall boxes, letters that hang down in the low boxes.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, loc = String(locale || 'en').slice(0, 2);
    let pool = entriesFor(theme, loc).filter((e) => freshKeep(theme, e, loc) && !nameRefused(theme, e.noun)).map((e) => ({ ...e, word: displayWord(e.singular, loc) }))
      .filter((e) => /^\p{L}+$/u.test(e.word) && [...e.word].length >= d.min && [...e.word].length <= d.max && shapeOf(e.word).every(Boolean));
    pool = distinctByWord(pool, (e) => e.word);
    if (pool.length < d.n) throw new Error(`K-529: theme ${theme}/${loc} has ${pool.length} words of ${d.min}-${d.max} letters (< ${d.n})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme, 'pic');
    const rows = picks.map((e, i) => `<div class="ws-card-stage" data-lcs-shape-word="${e.word}" style="justify-content:flex-start;gap:26px;padding:6px 20px">` +
      `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt=""${slot.attr(ctx, 'pic', i)} style="width:${d.px}px;height:${d.px}px;flex:0 0 auto">` +
      `<span data-lcs-boxes-of="${e.word}" style="display:inline-flex">${boxes(e.word, d.unit, d.first)}</span></div>`);
    const { cardGrid } = require('../../templates/layouts/card-grid.js');
    return { bodyHtml: cardGrid({ cards: rows, cols: 1, rows: rows.length, numbered: false }), meta: { words: picks.map((e) => e.word) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-shape-word]')];
      if (rows.length < 4) fails.push(`${rows.length} words`);
      // the base-letter rule (lib/letter-heights.js): a capital or b d f h k l t ß is tall, g j p q y hangs, every other
      // Latin school letter (an accented one by its base letter, æ ø œ) is small; a letter of no class fails the page
      const TALL = 'bdfhklt', LOW = 'gjpqy', MID = 'acemnorsuvwxziæøœ';
      rows.forEach((r, i) => {
        const w = r.dataset.lcsShapeWord, bs = [...r.querySelectorAll('[data-lcs-shape-box]')];
        if (bs.length !== [...w].length) { fails.push(`word ${i + 1}: ${bs.length} boxes for "${w}"`); return; }
        // the box heights follow the letters (measured on the page): tall > mid, low hangs below the mid boxes' line
        const H = bs.map((b) => b.getBoundingClientRect());
        [...w].forEach((ch, j) => {
          const lo = ch.toLowerCase(), base = lo.normalize('NFD')[0];
          const known = lo === 'ß' || (TALL + LOW + MID).includes(base);
          if (!known) { fails.push(`word ${i + 1}: "${ch}" has no box class`); return; }
          const want = lo === 'ß' || ch !== lo || TALL.includes(base) ? 'tall' : LOW.includes(base) ? 'low' : 'mid';
          if (bs[j].dataset.lcsShapeBox !== want) fails.push(`word ${i + 1}: "${ch}" in a ${bs[j].dataset.lcsShapeBox} box`);
        });
        const mids = H.filter((_, j) => bs[j].dataset.lcsShapeBox === 'mid');
        H.forEach((h, j) => { const s = bs[j].dataset.lcsShapeBox; if (s !== 'mid' && mids.length && h.height <= mids[0].height + 4) fails.push(`word ${i + 1}: box ${j + 1} is not taller than a small one`); });
        const im = r.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`word ${i + 1}: the picture did not load`);
      });
      const ws = rows.map((r) => r.dataset.lcsShapeWord); if (new Set(ws).size !== ws.length) fails.push('a word twice');
      return fails;
    });
  },
};
