/**
 * K-499 — Trace the Picture, Then Write the Word (Picture Tracing maker 2026-11-02, NEW-TEMPLATES §31 T3): a library
 * picture as a tracing guide, and under it its own name on school lines — the word to trace, then a line to write it
 * (G1-430 does this for one composed page; this one takes any picture of the level's band that has a name).
 *
 * The word is the picture's reviewed word in the page's language (lib/b2-common.js entriesFor + picture-word-review
 * freshKeep: never a picture a child would name differently; German nouns keep their capital), letters only, short
 * enough for the lane; the lane is the platform's school hand (primitives/trace-path.js strokeWordLane, as How to Draw
 * K-404 prints it in every language). The picture keeps the band's rules (lib/pt-faces.js).
 * Levels: 1 PreK — the word solid, then traced twice · 2 K — solid, traced, then written · 3 G1 — solid, then written twice.
 */
'use strict';
const P = require('../../lib/pt-faces.js');
const { strokeWordLane } = require('../../primitives/trace-path.js');
const letterStrokes = require('../../data/tracing/letter-strokes.js');
const { entriesFor, displayWord } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');

const D = {
  1: { reps: 2, emptyLast: false, empties: 0, maxLen: 6 },
  2: { reps: 1, emptyLast: true, empties: 1, maxLen: 8 },
  3: { reps: 0, emptyLast: true, empties: 2, maxLen: 10 },
};
const _lists = new Map();
/** the level's traced drawings that have a reviewed word in the language (picture → word) */
function named(level, loc, lib) {
  const k = level + '|' + loc + '|' + (lib ? 1 : 0);
  if (!_lists.has(k)) {
    const d = D[level], words = new Map();
    for (const fresh of lib ? [false, true] : [false]) for (const src of P.drawings('K-499', level)) {
      const [theme, noun] = src.split('/');
      let e;
      try { e = entriesFor(theme, loc).find((x) => x.noun === noun); } catch (err) { if (!fresh) continue; }
      // a maker page only, after the library's own: a drawing of the flagship set with its reviewed word (lib/fl-forms.js: one traceable word, or none)
      const fw = fresh && !e ? (require('../../lib/fl-forms.js').formOf(src, loc) || {}).word : null;
      if (fresh ? !fw : !e || !freshKeep(theme, e, loc)) continue;
      const w = fw || displayWord(e.singular, loc);
      if (!/^\p{L}+$/u.test(w) || [...w].length > d.maxLen) continue;
      try { letterStrokes.textGlyphs(w); } catch (err) { continue; }
      words.set(src, w);
    }
    _lists.set(k, words);
  }
  return _lists.get(k);
}

module.exports = {
  id: 'K-499',
  slug: 'trace-picture-then-write-word',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Trace the Picture, Then Write the Word',
      instruction: 'Trace the picture. Then trace its name on the lines and write it by yourself.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty], L = P.LEVEL[difficulty];
    const loc = String(locale || 'en').slice(0, 2);
    const words = named(difficulty, loc, !!(ctx && ctx.slotsOut));
    if (!words.size) throw new Error(`K-499: no named drawing at level ${difficulty} in ${loc}`);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rowH = 76, rows = 1 + d.reps + d.empties, laneH = rows * rowH + (rows - 1) * 2;
    const picH = 700 - extra - laneH - 16;
    const got = P.artFits([...words.keys()], ctx, (src) => ({ out: P.composeFit({ W: 675, H: picH, band: L.band, style: L.style, occlusion: false, items: [{ src, x: 337, y: picH - 4, fitBox: [600, picH - 14], start: 'top' }] }, L.band) }));
    const word = words.get(got.src);
    // the lane: the solid model, the traced copies, the empty lines to write on (school lines, the page's full width)
    const model = strokeWordLane({ text: word, w: 600, h: rowH, glyphH: 48, reps: 1, stack: true, align: 'left' });
    const rest = d.reps || d.empties ? strokeWordLane({ text: word, w: 600, h: rowH, glyphH: 48, reps: d.reps, stack: true, modelless: true, emptyLast: d.empties > 0, align: 'left' }) : null;
    const extraEmpty = d.empties > 1 ? strokeWordLane({ text: word, w: 600, h: rowH, glyphH: 48, reps: 0, stack: true, modelless: true, emptyLast: true, align: 'left' }) : null;
    // the traced letters take the palette's soft ink (the lane's tan printed faint beside a dark picture guide — G1-430's
    // finding; outside the picture the page keeps to the palette); the writing-line rules keep the platform colour
    const ink = require('../../primitives/_tokens.js').color.inkSoft;
    const dark = (svg) => svg.replace(/<(?!line\b)[a-z]+\b[^>]*>/g, (t) => t.replace(/stroke="#C8BFAE"/gi, `stroke="${ink}"`));
    const lane = `<div data-lcs-pt-word="${word}" data-lcs-pt-rows="${rows}" style="display:flex;flex-direction:column;gap:2px;width:600px">${model.svg}${rest ? dark(rest.svg) : ''}${extraEmpty ? extraEmpty.svg : ''}</div>`;
    const body = `<div data-ws-content${require('../../lib/fl-art.js').tap(ctx)} data-lcs-pt-face="picture-word" data-lcs-pt-src="${got.src}" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px">${got.out.svg}${lane}</div>`;
    return { bodyHtml: body, meta: { picture: got.src, word, band: L.band } };
  },

  async verify(page) {
    const f = await P.checkPage(page);
    const lane = await page.evaluate(() => {
      const l = document.querySelector('[data-lcs-pt-word]');
      if (!l) return ['no word lane'];
      const out = [];
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect(), b = l.getBoundingClientRect();
      if (b.bottom > pg.bottom + 1) out.push('the word lines leave the page');
      return out;
    });
    return f.concat(lane);
  },
};
