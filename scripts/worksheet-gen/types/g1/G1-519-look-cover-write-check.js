/**
 * G1-519 — Look, Cover, Write, Check (Spelling maker 2026-11-02, NEW-TEMPLATES §3 T3; L.2.2.d spelling lists; de
 * "Lernwörter", nl "woordpakket", sv "veckans ord", fr "mots de la semaine"): a list of words; the child reads each,
 * folds the page along the dashed line to cover it, writes it from memory, writes it again, unfolds and checks (a box to
 * tick). The words start from the theme's reviewed picture words (level 1 with their pictures); the teacher may tap any
 * word and type her own list (letters only, up to 16). The column heads are data/spelling/look-cover.js. Open writing:
 * no key, no screen (on a screen the word cannot be covered).
 * Levels: 1 six words with pictures, two tries · 2 eight words, three tries · 3 ten words, three tries.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const SW = require('../_shared/spelling-words.js');
const { LOOK_COVER } = require('../../data/spelling/look-cover.js');
const { writingRow } = require('../../primitives/trace-path.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 6, tries: 2, pics: true, min: 3, max: 6 }, 2: { n: 8, tries: 3, pics: false, min: 3, max: 8 }, 3: { n: 10, tries: 3, pics: false, min: 4, max: 9 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = {
  id: 'G1-519',
  slug: 'look-cover-write-check',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'word-building',
  themeAxis: { applicable: true, minNouns: 10, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Look, Cover, Write, Check', instruction: 'Read each word. Fold the page on the dashed line to cover it. Write the word, then write it again. Unfold and check.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const H = LOOK_COVER[L];
    if (!H) throw new Error(`G1-519: no column heads for ${L}`);
    const pool = SW.pool(theme, L, d.min, d.max);
    if (pool.length < d.n) throw new Error(`G1-519: theme ${theme}/${L} has ${pool.length} words (< ${d.n})`);
    const picks = rng.sample(pool, d.n);
    // the teacher's own words: letters only (a hyphen or an apostrophe inside), up to 16 characters
    const words = picks.map((e, i) => {
      const t = slot.text(ctx, e.word, 'w' + i, 16);
      if (t !== e.word && !/^\p{L}+(?:[-'’]\p{L}+)*$/u.test(t)) { slot.refuse(ctx, 'w' + i); return { word: e.word, e }; }
      return { word: t, e: t === e.word ? e : null };
    });
    const wordW = d.pics ? 200 : 170, checkW = 64, gap = 10;
    const tryW = Math.floor((672 - wordW - checkW - gap * (d.tries + 2)) / d.tries);
    const rowH = Math.floor(600 / d.n);
    const line = () => writingRow({ w: tryW, h: Math.min(52, rowH - 8), glyphH: Math.min(24, Math.round((rowH - 8) * 0.46)), xHeight: true }).svg;
    const head = (s, w) => `<span style="width:${w}px;flex:0 0 auto;font:800 14px/1.2 'Nunito',sans-serif;color:#8A8276;text-align:center">${esc(s)}</span>`;
    const heads = `<div style="display:flex;gap:${gap}px;align-items:flex-end">${head(H.look, wordW)}${Array.from({ length: d.tries }, (_, k) => head(k ? H.again : H.write, tryW)).join('')}${head(H.check, checkW)}</div>`;
    const rows = words.map((w, i) => slot.stamp(ctx, 'w' + i, 0, `<div data-lcs-lcwc="${i + 1}" style="display:flex;gap:${gap}px;align-items:center;height:${rowH}px;border-bottom:1.5px solid #F0E4CB">`) +
      `<span style="width:${wordW}px;flex:0 0 auto;align-self:stretch;display:flex;align-items:center;gap:8px;padding-right:8px;box-sizing:border-box;border-right:2.5px dashed #8A8276">` +
      (d.pics && w.e ? `<img class="ws-icon" src="${fileUri(theme, w.e.noun)}" alt="" style="width:${Math.min(56, rowH - 16)}px;height:${Math.min(56, rowH - 16)}px;object-fit:contain;flex:0 0 auto">` : '') +
      `<span style="font:700 ${d.n > 8 ? 22 : 26}px/1.1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(w.word)}</span></span>` +
      Array.from({ length: d.tries }, () => `<span style="width:${tryW}px;flex:0 0 auto;display:flex;align-items:center">${line()}</span>`).join('') +
      `<span style="width:${checkW}px;flex:0 0 auto;display:flex;justify-content:center"><span style="width:30px;height:30px;border:2.5px solid ${T.teal};border-radius:6px;box-sizing:border-box"></span></span></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-look-cover style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0">${heads}<div>${rows.join('')}</div></div>`,
      meta: { words: words.map((w) => w.word) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-lcwc]')];
      if (rows.length < 6) fails.push(`${rows.length} words`);
      const root = document.querySelector('[data-lcs-look-cover]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect();
        if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`);
        const word = r.querySelector('span > span');
        if (word && word.scrollWidth > word.parentElement.clientWidth + 1) fails.push(`row ${i + 1}: the word does not fit its column`);
      });
      return fails;
    });
  },
};
