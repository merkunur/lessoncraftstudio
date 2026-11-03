/**
 * K-544 — Picture Dictionary (Picture Word Cards maker 2026-11-02, NEW-TEMPLATES §43 T3; L.K.6 vocabulary, alphabetical
 * order; the "imagier" / "Bildwörterbuch" page): the theme's words in alphabetical order, each with its picture, the
 * first letter in colour and a letter tab where a new letter begins. The order is the language's own (data/b2/collation.js:
 * å ä ö after z in sv / fi, æ ø å in da / no, ñ after n in es — never a plain localeCompare). The words are the theme's
 * card words (types/_shared/picture-word-pool.js). No answer, no key.
 * Levels: 1 six words · 2 nine words · 3 twelve words.
 */
'use strict';
const { pictureWordPool } = require('../_shared/picture-word-pool.js');
const { compare } = require('../../data/b2/collation.js');
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 6, cols: 2, px: 140 },
  2: { n: 9, cols: 3, px: 118 },
  3: { n: 12, cols: 3, px: 96 },
};

module.exports = {
  id: 'K-544',
  slug: 'picture-dictionary',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-vocabulary',
  themeAxis: { applicable: true, minNouns: 12, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'My Picture Dictionary', instruction: 'Read the words in alphabetical order. Say the name of each picture.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const pool = pictureWordPool(theme, L, { maxLetters: d.cols === 3 ? 11 : 13 });
    if (pool.length < d.n) throw new Error(`K-544: theme ${theme}/${L} has ${pool.length} card words (< ${d.n})`);
    const picks = rng.sample(pool, d.n).sort((a, b) => compare(a.word.toLocaleLowerCase(L), b.word.toLocaleLowerCase(L), L));
    let prev = null;
    const html = picks.map((e) => {
      const first = [...e.word][0], f = first.toLocaleLowerCase(L), tab = f !== prev; prev = f;
      return `<div data-lcs-dict-entry="${e.word}" style="position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:10px 6px;border-radius:16px;background:${T.cream}">` +
        (tab ? `<span data-lcs-dict-tab="${f}" style="position:absolute;left:8px;top:8px;min-width:34px;height:34px;padding:0 6px;box-sizing:border-box;border-radius:10px;background:${T.teal};color:#FFFFFF;font:700 24px/34px 'Baloo 2',cursive;text-align:center">${first.toLocaleUpperCase(L)}</span>` : '') +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" style="width:${d.px}px;height:${d.px}px">` +
        `<span style="font:700 24px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center"><span style="color:${T.coral}">${first}</span>${[...e.word].slice(1).join('')}</span></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-dictionary style="flex:1;display:grid;grid-template-columns:repeat(${d.cols},minmax(0,1fr));grid-auto-rows:1fr;gap:12px;min-height:0">${html.join('')}</div>`,
      meta: { words: picks.map((e) => e.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const es = [...document.querySelectorAll('[data-lcs-dict-entry]')];
      if (es.length < 6) fails.push(`${es.length} entries`);
      es.forEach((c, i) => {
        const R = c.getBoundingClientRect();
        c.querySelectorAll('img,span').forEach((x) => { const r = x.getBoundingClientRect(); if (r.width && (r.right > R.right + 1 || r.bottom > R.bottom + 1)) fails.push(`entry ${i + 1}: content leaves the entry`); });
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`entry ${i + 1}: the picture did not load`);
      });
      return [...new Set(fails)];
    });
  },
};
