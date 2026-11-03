/**
 * K-524 — Letters and Pictures (Letter Tracing maker 2026-11-02, NEW-TEMPLATES §33 T2; RF.K.1.d + RF.K.3.a letter–sound):
 * each row a picture whose name starts with the letter's SOUND beside that letter's capital and small form to trace —
 * the child says the word, hears the first sound and writes its letter. The pictures are the reviewed letter-picture
 * chart (data/alphabet/letter-pictures.json, tools/build-letter-pictures.js: approved words of the phonics pipeline, deny-
 * onset rules, every picture opened, every word native-reviewed); a letter with no picture in the locale is not drawn on
 * this page. Copies walk the alphabet through the letters that have a picture; a row's picture is a slot (any picture the
 * chart lists for that letter).
 * Levels: 1 four letters, big, the word printed under its picture · 2 five letters, the word printed · 3 six letters,
 * no word: the child names the picture.
 */
'use strict';
const { strokeLetterLane } = require('../../primitives/trace-path.js');
const { letterUnits, unitForms } = require('./K-238-letter-tracing.js');
const { fileUri } = require('../../image-cache/resolve.js');
const CHART = require('../../data/alphabet/letter-pictures.json').letters;
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { n: 4, glyphH: 68, laneH: 140, reps: 3, empty: 1, word: true, px: 110 },
  2: { n: 5, glyphH: 56, laneH: 108, reps: 4, empty: 1, word: true, px: 88 },
  3: { n: 6, glyphH: 46, laneH: 92, reps: 4, empty: 2, word: false, px: 76 },
};

module.exports = {
  id: 'K-524',
  slug: 'letters-and-pictures',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Letters and Pictures', instruction: 'Say the name of each picture and listen to its first sound. Trace the letter for that sound, then write it yourself.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2), chart = CHART[L] || {};
    const units = letterUnits(L).filter((u) => u !== 'ß' && (chart[u] || []).length);
    if (units.length < d.n) throw new Error(`K-524: ${L} has pictures for ${units.length} letters (< ${d.n})`);
    const copy = Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
    const letters = Array.from({ length: d.n }, (_, i) => units[((copy - 1) * d.n + i) % units.length]);
    const rows = letters.map((u, i) => {
      const f = unitForms(u, L), pair = f.cap + f.low, list = chart[u];
      const pic = slot.anyPictures(ctx, [list[(copy - 1) % list.length]], list, 'pic' + i)[0];
      const lane = strokeLetterLane({ text: pair, w: 660 - d.px - 30, h: d.laneH, glyphH: d.glyphH, reps: d.reps, emptyCount: d.empty, lowercase: true });
      return `<div class="ws-trace-lane" data-lcs-letter-row="${pair}" data-lcs-picture-word="${pic.word}" style="display:flex;align-items:center;gap:14px">` +
        `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:${d.px + 16}px;flex:0 0 auto">` +
        `<img class="ws-icon" src="${fileUri(pic.theme, pic.noun)}" alt="" data-lcs-pic="${pic.key}"${slot.attr(ctx, 'pic' + i, 0)} style="width:${d.px}px;height:${d.px}px">` +
        (d.word ? `<span style="font-family:'Baloo 2',cursive;font-weight:700;font-size:${[...pic.word].length > 9 ? 18 : 22}px;color:${T.ink};line-height:1.1;text-align:center" data-lcs-word-label>${pic.word}</span>` : '') +
        `</div><div data-lcs-letter="${pair}">${lane.svg}</div></div>`;
    });
    return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${rows.join('')}</div>`, meta: { letters } };
  },

  async verify(page) {
    const base = await require('./K-238-letter-tracing.js').verify(page);
    const own = await page.evaluate(() => {
      const out = [];
      const rows = [...document.querySelectorAll('[data-lcs-letter-row]')];
      if (rows.length < 3) out.push(`${rows.length} rows`);
      rows.forEach((r, i) => {
        const pair = r.dataset.lcsLetterRow, word = r.dataset.lcsPictureWord.toLocaleLowerCase(), low = [...pair].slice(1).join('');
        // the picture's word starts with the letter (its accent folded where the letter has none; ä ö ü å æ ø ñ are their own)
        const base = (s) => s.normalize('NFD').replace(/\p{M}/gu, '');
        const own = /[äöüåæøñ]/.test(low);
        if (own ? !word.startsWith(low) : !base(word).startsWith(base(low))) out.push(`row ${i + 1}: "${r.dataset.lcsPictureWord}" does not start with ${pair}`);
        const im = r.querySelector('img'); if (!im.complete || !im.naturalWidth) out.push(`row ${i + 1}: the picture did not load`);
      });
      return out;
    });
    return base.concat(own);
  },
};
