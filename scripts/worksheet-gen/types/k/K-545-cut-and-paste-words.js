/**
 * K-545 — Cut and Paste the Words (Picture Word Cards maker 2026-11-02, NEW-TEMPLATES §43 T4; RF.K.3.c read and match;
 * hands-on): pictures with an empty box under each and a strip of word tiles to cut out; the child glues each word under
 * its picture. From level 2 one extra word that names no picture is in the strip, so the last word is never placed by
 * elimination. The words are the theme's card words (types/_shared/picture-word-pool.js: K-324's bank rules, every
 * picture a child names otherwise refused). On the screen the child drags each tile to its box; the key prints the words
 * in the boxes.
 * Levels: 1 four pictures · 2 six pictures + one extra word · 3 eight pictures + one extra word.
 */
'use strict';
const { pictureWordPool, sampleMatchable } = require('../_shared/picture-word-pool.js');
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 4, cols: 2, extra: 0, px: 150 },
  2: { n: 6, cols: 3, extra: 1, px: 130 },
  3: { n: 8, cols: 4, extra: 1, px: 112 },
};

module.exports = {
  id: 'K-545',
  slug: 'cut-and-paste-words',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-vocabulary',
  themeAxis: { applicable: true, minNouns: 9, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Cut and Paste the Words', instruction: 'Cut out the words at the bottom. Glue each word in the box under its picture.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const pool = pictureWordPool(theme, L, { maxLetters: 11 });
    if (pool.length < d.n + d.extra) throw new Error(`K-545: theme ${theme}/${L} has ${pool.length} card words (< ${d.n + d.extra})`);
    const all = sampleMatchable(pool, d.n + d.extra, rng);
    if (all.length < d.n + d.extra) throw new Error(`K-545: theme ${theme}/${L} has ${all.length} pictures that cannot be confused (< ${d.n + d.extra})`);
    const picks = all.slice(0, d.n), extra = all.slice(d.n);
    const key = !!(ctx && ctx.answerKey), scr = !key && !!(ctx && ctx.screen);
    // the strip: the words shuffled so that no tile stands under its own picture's column
    let strip = rng.shuffle(all);
    for (let g = 0; g < 30 && strip.some((e, i) => i < d.n && e === picks[i]); g++) strip = rng.shuffle(all);
    const longest = Math.max(...all.map((e) => [...e.word].length));
    const boxW = Math.floor(600 / d.cols) - 20;
    const fs = Math.min(28, Math.floor((boxW - 18) / (longest * 0.62)));
    const cells = picks.map((e, i) => `<div data-lcs-paste-pic="${e.word}" style="display:flex;flex-direction:column;align-items:center;gap:8px">` +
      `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${d.px}px;height:${d.px}px">` +
      `<span class="ws-answerbox"${key ? ` data-lcs-answer="${e.word}"` : scr ? ` data-lcs-drop="1" data-lcs-answer="w${all.indexOf(e)}"` : ''} style="display:inline-flex;align-items:center;justify-content:center;width:${boxW}px;height:${Math.round(fs * 1.9)}px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF;font:700 ${fs}px/1 'Baloo 2',cursive"></span></div>`);
    const tiles = strip.map((e) => `<span data-lcs-paste-word="${e.word}"${scr ? ` data-lcs-bin="w${all.indexOf(e)}"` : ''} style="display:inline-flex;align-items:center;justify-content:center;min-width:${Math.min(boxW, 140)}px;height:${Math.round(fs * 1.9)}px;padding:0 10px;box-sizing:border-box;border:2px dashed ${T.inkSoft};background:#FFFFFF;font:700 ${fs}px/1 'Baloo 2',cursive;color:${T.ink}">${e.word}</span>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-paste style="flex:1;display:flex;flex-direction:column;justify-content:space-between;min-height:0">` +
        `<div style="flex:1;display:grid;grid-template-columns:repeat(${d.cols},minmax(0,1fr));align-items:center;justify-items:center;gap:14px">${cells.join('')}</div>` +
        `<div data-lcs-paste-strip style="display:flex;flex-wrap:wrap;justify-content:center;gap:0;padding-top:16px;border-top:2.5px dashed ${T.grid}">${tiles.join('')}</div></div>`,
      meta: { words: picks.map((e) => e.word), extra: extra.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const pics = [...document.querySelectorAll('[data-lcs-paste-pic]')].map((x) => x.dataset.lcsPastePic);
      const words = [...document.querySelectorAll('[data-lcs-paste-word]')].map((x) => x.dataset.lcsPasteWord);
      if (pics.length < 4) fails.push(`${pics.length} pictures`);
      pics.forEach((w) => { if (!words.includes(w)) fails.push(`no tile for "${w}"`); });
      if (new Set(words).size !== words.length) fails.push('a word twice in the strip');
      document.querySelectorAll('[data-lcs-paste] img').forEach((im, i) => { if (!im.complete || !im.naturalWidth) fails.push(`picture ${i + 1} did not load`); });
      const strip = document.querySelector('[data-lcs-paste-strip]').getBoundingClientRect(), root = document.querySelector('[data-lcs-paste]').getBoundingClientRect();
      if (strip.bottom > root.bottom + 1) fails.push('the word strip leaves the page');
      return fails;
    });
  },
};
