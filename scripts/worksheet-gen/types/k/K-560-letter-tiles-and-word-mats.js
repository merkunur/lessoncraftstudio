/**
 * K-560 — Letter Tiles and Word Mats (Spelling maker 2026-11-02, NEW-TEMPLATES §3 T6; RF.K.3 build words; material for
 * the literacy centre): word mats (a picture and one empty box per letter) and, below the dashed line, the letter tiles
 * those words need — exactly their letters, sorted in the language's alphabet order (data/b2/collation.js) so a child
 * finds them, one tile more of each vowel the words use (the second vowel set). The teacher cuts the tiles; the child
 * builds each word on its mat. The words are the theme's reviewed picture words (de nouns capitalised: the tile keeps
 * the capital). The key fills the mats.
 * Levels: 1 four words of 3-4 letters · 2 six words of 3-5 letters · 3 six words of 4-6 letters.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const SW = require('../_shared/spelling-words.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

// level 1: words a kindergartner can build from their sounds (types/_shared/spelling-words.js decodable: en cat not kite,
// fr sac not chat, da no silent letter, es / pt / it no k, w or silent h — native review 2026-11-03)
const D = { 1: { n: 4, min: 3, max: 4, decodable: true }, 2: { n: 6, min: 3, max: 5 }, 3: { n: 6, min: 4, max: 6 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'K-560',
  slug: 'letter-tiles-and-word-mats',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'word-building',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Letter Tiles and Word Mats', instruction: 'Cut out the letter tiles. Say the name of each picture and build its word on the mat.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = SW.pool(theme, L, d.min, d.max).filter((e) => !d.decodable || SW.decodable(e.word, L));
    if (pool.length < d.n) throw new Error(`K-560: theme ${theme}/${L} has ${pool.length} words of ${d.min}-${d.max} letters (< ${d.n})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme);   // a teacher's words (maker)
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    // two mats a row while the words have 4 letters or fewer; else one mat a row (a 5-letter mat is wider than half the page)
    const U = (e) => SW.units(e.word, L);   // nl ij: one tile, one box
    const two = Math.max(...picks.map((e) => U(e).length)) <= 4, mpx = two ? 68 : 56, mbw = two ? 50 : 44, mbh = two ? 54 : 48;
    const mats = picks.map((e, i) => `<div data-lcs-mat="${i + 1}"${slot.attr(ctx, 'pic', i)} data-lcs-word="${esc(e.word)}" style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:14px;background:${T.cream}">` +
      `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${mpx}px;height:${mpx}px;object-fit:contain;flex:0 0 auto">` +
      `<span style="display:flex;gap:5px">${U(e).map((c) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(c)}"` : ''} style="width:${mbw}px;height:${mbh}px"></span>`).join('')}</span></div>`);
    // the tiles: every letter of the words (a second tile of each vowel), in the alphabet's order
    const letters = picks.flatMap(U);
    const vowels = [...new Set(letters.filter((c) => SW.isVowel(c, L)))];
    const tiles = [...letters, ...vowels].sort((a, b) => a.toLocaleLowerCase(L).localeCompare(b.toLocaleLowerCase(L), L) || (a < b ? -1 : 1));
    // the tiles shrink when there are many (six long words): every tile row is 13 wide or fewer
    const tw = tiles.length <= 24 ? 52 : tiles.length <= 36 ? 48 : 44, tth = tw + 4;
    const tileHtml = tiles.map((c) => `<span data-lcs-tile style="display:inline-flex;align-items:center;justify-content:center;width:${tw}px;height:${tth}px;box-sizing:border-box;border:2px dashed #8A8276;background:#FFFFFF;font:700 34px/1 'Baloo 2',cursive;color:${T.teal}">${esc(c)}</span>`).join('');
    return {
      bodyHtml: `<div data-ws-content data-lcs-word-mats style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:space-evenly;min-height:0">` +
        `<div style="display:grid;grid-template-columns:${two ? 'repeat(2,minmax(0,1fr))' : 'minmax(0,1fr)'};gap:12px 16px">${mats.join('')}</div>` +
        `<div style="border-top:2.5px dashed #8A8276;padding-top:14px"><div data-lcs-tiles style="display:flex;flex-wrap:wrap;justify-content:center;gap:0">${tileHtml}</div></div></div>`,
      meta: { words: picks.map((e) => e.word), tiles: tiles.join('') },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const mats = [...document.querySelectorAll('[data-lcs-mat]')];
      if (mats.length < 4) fails.push(`${mats.length} mats`);
      const tiles = [...document.querySelectorAll('[data-lcs-tile]')].map((t) => t.textContent);
      const need = {};
      mats.forEach((m) => [...m.dataset.lcsWord].forEach((c) => { need[c] = (need[c] || 0) + 1; }));
      const have = {}; tiles.forEach((t) => [...t].forEach((c) => { have[c] = (have[c] || 0) + 1; }));   // an nl ij tile holds two letters
      Object.entries(need).forEach(([c, k]) => { if ((have[c] || 0) < k) fails.push(`not enough "${c}" tiles`); });
      const root = document.querySelector('[data-lcs-word-mats]').getBoundingClientRect();
      [...mats, ...document.querySelectorAll('[data-lcs-tile]')].forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('an item leaves the page'); });
      mats.forEach((m, i) => { const r = m.getBoundingClientRect(); m.querySelectorAll('.ws-answerbox, img').forEach((b) => { if (b.getBoundingClientRect().right > r.right + 0.5) fails.push(`mat ${i + 1}: a box past its edge`); }); });
      return fails;
    });
  },
};
