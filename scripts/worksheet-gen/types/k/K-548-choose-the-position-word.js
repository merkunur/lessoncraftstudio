/**
 * K-548 — Choose the Position Word (Position Words maker 2026-11-02, NEW-TEMPLATES §44 T3; K.G.A.1): a scene showing ONE
 * relation of a picture to a shape, the grammar engine's sentence with a gap, and three words to circle — the right one
 * and two the engine says fit the same sentence frame (prepDistractorLabels: frame-valid, never on top of against above).
 * Every word is a tap target; the right one is ringed on the key. A row whose frame gives fewer than two other words is
 * drawn with another shape.
 * Levels: 1 four rows (in, on top of, under, next to) · 2 five rows (+ above, between) · 3 six rows (+ behind, in front of).
 *
 * ONE defensible word per row (review 2026-11-16, rendered pages). Every scene was read for the other words a child could
 * defend for it, and a row never offers those (ALSO_FITS — the scene's word is right, these would be too):
 *   between      the picture stands next to each of the two shapes → "next to (the circles)" is also true
 *   in front of  the picture covers the shape's lower part and hangs below it → "under"; and part of it sits inside the
 *                outline → "in"
 *   in           the picture is drawn over the shape — the very 2D convention "in front of" uses → "in front of"; and
 *                the on-top-of word means "on" in de / fr / it / pt (auf, sur, sopra, em cima de) → "on top of"
 *   behind       the picture peeks out at the shape's side (scene opts.behindSide) → "next to"; the old scene raised its
 *                upper half over the top edge, so "above" / "on top of" stay excluded as well
 *   above / on top of   each other (the grammar engine's own CONFUSABLE_PREPS already keeps that pair apart); on a
 *                cylinder "on top of" also "in" (its light top ellipse reads as an open can)
 *   under, next to      "in front of" (below or beside a 3-D shape reads as nearer — native review 2026-11-16)
 * and the scenes are measured (position-scenes opts): "above" floats at least a fifth of the picture's height over the
 * shape at every level (the old gap was clamped to 3-5 px at rows 128 / 112 and read as "on top of"); "on top of"
 * rests the picture's INK on the outline (a fish, car or cup drawn high in its square, and any picture over a heart's
 * lobes, used to float); "behind" never rises above the shape's top edge. verify() measures all of it on the page.
 */
'use strict';
const path = require('path');
const P = require('../_shared/position-scenes.js');
const { positionItems, sentenceHtml, NO_PREP, SEVERAL } = require('../_shared/position-items.js');
const slot = require('../../lib/slot.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { rows: 4 }, 2: { rows: 5 }, 3: { rows: 6 } };
// the other words a child could defend for each scene (see the header) — a row of that scene never offers them. Native
// review 2026-11-16 added: "in" never with the on-top-of word (de auf, fr sur, it sopra, pt em cima de mean "on", and a
// picture over a filled shape is ON it); "under" and "next to" never with "in front of" (below a 3-D shape reads as nearer;
// the mirror of behind / next to); and on a CYLINDER "on top of" never with "in" (its light top ellipse reads as an open can)
const ALSO_FITS = {
  between: ['next to'],
  'in front of': ['under', 'in'],
  in: ['in front of', 'on top of'],
  behind: ['next to', 'above', 'on top of'],
  above: ['on top of'],
  'on top of': ['above'],
  under: ['in front of'],
  'next to': ['in front of'],
};
const ALSO_FITS_ON = { 'on top of': { cylinder: ['in'] } };
const pairedWith = (prep, shape) => [...(ALSO_FITS[prep] || []), ...(((ALSO_FITS_ON[prep] || {})[shape]) || [])];
const ABOVE_GAP = 0.22;   // the "above" gap, a share of the picture's height (verify asks for at least a fifth)
let _ink;
/** the picture's ink box (data/hm/ink-boxes.json, measured on the drawing), or null */
function inkOf(it) {
  if (_ink === undefined) { const p = path.join(__dirname, '..', '..', 'data', 'hm', 'ink-boxes.json'); const PL = require('../../lib/platform/index.js'); _ink = PL.exists(p) ? PL.readJson(p) : {}; }
  return _ink[it.theme + '/' + it.noun] || null;
}
/** the labels of the words never offered with the row's word, for this shape (labels differ per shape in some languages) */
function excludedLabels(L, prep, shape) {
  return new Set(pairedWith(prep, shape).map((q) => (P.sentence(L, q, shape) || {}).expected).filter(Boolean));
}

// ONE LINE OF CHIPS (2026-11-16). A row's three chips share a 417 px strip (10 px gaps); a chip is max(56, text + 2 ×
// padding + 2 × 2 px border) wide, its text 700 20px Baloo 2. Measured in Chromium on 4,950 rows (11 languages × 3 levels
// × 30 seeds): that formula gives every chip to 0.000 px and every wrap exactly — 168 rows wrapped, all pt (na frente
// de · embaixo de · em cima de …), and pt level 3 then overflowed the page on 5 of 12 seeds. A row whose chips fit is
// drawn exactly as before; one that does not narrows the padding of ITS three chips (16 → 12 → 10 px), then the font
// (19 → 16 px, never smaller), and only if even that fails takes the two shortest other words. Text widths at 20 px,
// measured in Chromium for every label this type can print (11 languages × 8 words × 8 shapes, 77 labels):
const LABEL_W20 = { above: 54.95, 'accanto a': 85.91, achter: 58.53, 'acima de': 79.67, 'al di sopra di': 113.42, 'al lado de': 85.81, alla: 32.34, 'ao lado de': 91.88, 'atrás de': 72.97, 'au-dessous': 103.86, 'au-dessus': 92.2, auf: 30.61, bag: 33.47, bak: 33.09, bakom: 61.06, behind: 62.47, between: 78.89, boven: 55.8, bovenop: 78.88, bredvid: 69.38, dans: 43.33, 'davanti a': 82.52, 'debajo de': 88.14, dentro: 61.02, 'dentro de': 87.39, derrière: 73.23, 'detrás de': 84.7, devant: 62.75, dietro: 54.95, edessä: 63.36, 'em cima de': 100.64, 'embaixo de': 103.48, 'encima de': 91.34, 'enfrente de': 105.31, entre: 48.75, foran: 49.53, framför: 70.89, hinter: 55.09, i: 5.45, in: 16.95, 'in front of': 91.56, mellan: 60.83, mellem: 66.3, mellom: 67.02, 'na frente de': 109.13, naast: 50.27, neben: 56.28, 'next to': 63.63, 'on top of': 81.86, onder: 53.53, oppå: 45.31, ovanför: 71.56, ovanpå: 66.16, 'oven på': 70.41, over: 40.77, 'por encima de': 126.5, päällä: 54.56, sisällä: 57.23, sopra: 51.3, sotto: 48.23, sous: 42.39, sur: 29.19, takana: 62.13, tra: 26.31, tussen: 60.97, under: 53.45, unter: 49.59, 'ved siden af': 109, 'ved siden av': 110.95, vieressä: 75.67, voor: 41.75, vor: 30.19, välissä: 62.19, yläpuolella: 99.47, zwischen: 83.75, 'à côté': 54.19, über: 42 };
const CHIP_STRIP = 417, CHIP_SAFE = 4, CHIP_FLOOR = 16;
const chipText = (w, fs) => (LABEL_W20[w] != null ? LABEL_W20[w] : [...w].length * 13) * fs / 20;   // an unmeasured label: 13 px a letter (wider than any measured one)
const chipsWidth = (words, fs, pad) => words.reduce((a, w) => a + Math.max(56, chipText(w, fs) + 2 * pad + 4), 0) + 20;
/** the chip font + padding of a row: the default when the three fit, else the first narrower step that fits; null = none */
function chipStyle(words) {
  if (chipsWidth(words, 20, 16) <= CHIP_STRIP) return { fs: 20, pad: 16 };
  for (const [fs, pad] of [[20, 12], [20, 10], [19, 10], [18, 10], [17, 10], [CHIP_FLOOR, 10]]) if (chipsWidth(words, fs, pad) <= CHIP_STRIP - CHIP_SAFE) return { fs, pad };
  return null;
}

module.exports = {
  id: 'K-548',
  slug: 'choose-the-position-word',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'position-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Choose the Position Word', instruction: 'Look at each picture. Circle the word that fits in the sentence.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    // never a word of a relation the language leaves out (es / it / pt "above"), not even as a wrong option
    const droppedOf = (sh) => new Set((NO_PREP[L] || []).map((p) => (P.sentence(L, p, sh) || {}).expected).filter(Boolean));
    // the words a row may offer besides its own: frame-valid, not dropped, never one that also describes the scene
    const others = (p, sh) => { const dr = droppedOf(sh), ex = excludedLabels(L, p, sh); return P.distractors(L, p, sh).filter((w) => !dr.has(w) && !ex.has(w)); };
    // a shape whose sentence frame gives two other words — else another shape; a scene no shape can give two other words in
    // this language is not drawn at all (measured 2026-11-16: none — fr is tightest, two words for in / next to / above /
    // in front of — so `preps` stays undefined and the page draws as before)
    const levelPreps = P.LEVEL_PREPS[difficulty] || P.LEVEL_PREPS[2];
    const drawable = (p) => (p === 'in' ? P.CONTAINERS : P.SHAPES).some((sh) => P.sentence(L, p, sh) && others(p, sh).length >= 2);
    const preps = levelPreps.every((p) => (NO_PREP[L] || []).includes(p) || drawable(p)) ? undefined : levelPreps.filter(drawable);
    const items = positionItems({ locale: L, level: difficulty, rows: d.rows, rng, preps, accept: (p, sh) => others(p, sh).length >= 2, ctx });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const h = d.rows <= 4 ? 150 : d.rows === 5 ? 128 : 112;
    const rows = items.map((it, ri) => {
      // the two other words: frame-valid labels of the level's position words where they exist, else any frame-valid one
      const levelWords = new Set((P.LEVEL_PREPS[difficulty] || []).filter((p) => !(NO_PREP[L] || []).includes(p)).map((p) => (P.sentence(L, p, it.shape) || {}).expected).filter(Boolean));
      const dropped = droppedOf(it.shape), excluded = excludedLabels(L, it.prep, it.shape);
      const all = P.distractors(L, it.prep, it.shape).filter((w) => !dropped.has(w));
      // the same two shuffles as before (a row that offered no excluded word draws exactly as it did), then the excluded
      // words leave the list
      const ranked = [...rng.shuffle(all.filter((w) => levelWords.has(w))), ...rng.shuffle(all.filter((w) => !levelWords.has(w)))].filter((w) => !excluded.has(w));
      let pick = ranked.slice(0, 2);
      if (pick.length < 2) throw new Error(`K-548: ${L} "${it.prep}" with a ${it.shape} has ${pick.length} other words`);
      // one line of chips: the row's own size; a triple no size fits gives way to the two shortest other words
      let cs = chipStyle([it.sent.expected, ...pick]);
      if (!cs) { pick = ranked.slice().sort((a, b) => chipText(a, 20) - chipText(b, 20)).slice(0, 2); cs = chipStyle([it.sent.expected, ...pick]); }
      if (!cs) throw new Error(`K-548: ${L} "${it.prep}": no three words fit on one line`);
      const opts = rng.shuffle([it.sent.expected, ...pick]);
      const chips = opts.map((w) => `<span class="ws-chip" data-lcs-pos-chip="${w}"${mark && w === it.sent.expected ? ' data-lcs-correct="1"' : ''} style="width:auto;min-width:56px;height:46px;padding:0 ${cs.pad}px;border-radius:23px;font:700 ${cs.fs}px/1 'Baloo 2',cursive;color:${T.ink};white-space:nowrap">${w}</span>`).join('');
      return `<div data-lcs-choose-row="${it.prep}"${slot.attr(ctx, 'pic', ri)} style="display:flex;align-items:center;gap:14px;padding:4px 12px;border-radius:14px;background:${T.cream}">` +
        `${P.scene(it.prep, it.shape, it.src, { w: 220, h, s: Math.round(h * 0.5), o: Math.round(h * 0.4), ink: inkOf(it), aboveGap: ABOVE_GAP, behindSide: true })}` +
        `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:8px"><div style="font:700 21px/1.4 'Baloo 2',cursive;color:${T.ink}">${sentenceHtml(it, `<span style="display:inline-block;width:80px;border-bottom:3px solid ${T.ink};margin:0 4px"></span>`, 34)}</div>` +
        `<div class="ws-choices" style="gap:10px;justify-content:flex-start;flex-wrap:wrap">${chips}</div></div></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-choose style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${rows.join('')}</div>`,
      meta: { rows: items.map((it) => `${it.key} ${it.prep} ${it.shape}`), sentences: items.map((it) => it.sent.prefix.replace('{img}', `[${it.key}]`) + `<${it.sent.expected}>` + it.sent.suffix), answers: items.map((it) => it.sent.expected) },
    };
  },

  async verify(page) {
    const got = await page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-choose-row]')];
      if (rows.length < 4) fails.push(`${rows.length} rows`);
      const rootEl = document.querySelector('[data-lcs-choose]'), root = rootEl.getBoundingClientRect();
      // the rows fit the page: nothing spills out of the body's box
      if (rootEl.scrollHeight > rootEl.clientHeight + 1) fails.push(`the rows overflow the page by ${rootEl.scrollHeight - rootEl.clientHeight} px`);
      const box = (b) => ({ l: b.left, t: b.top, r: b.right, b: b.bottom, w: b.width, h: b.height });
      const seen = rows.map((r, i) => {
        const chips = [...r.querySelectorAll('[data-lcs-pos-chip]')].map((c) => c.dataset.lcsPosChip);
        if (chips.length !== 3 || new Set(chips).size !== 3) fails.push(`row ${i + 1}: not three different words`);
        // one line of chips, one size per row, never below 16 px
        const els = [...r.querySelectorAll('[data-lcs-pos-chip]')], tops = els.map((c) => c.getBoundingClientRect().top);
        if (els.length && Math.max(...tops) - Math.min(...tops) > 1) fails.push(`row ${i + 1}: the chips wrap onto a second line`);
        const sizes = els.map((c) => getComputedStyle(c).fontSize + ' ' + getComputedStyle(c).paddingLeft);
        if (new Set(sizes).size > 1) fails.push(`row ${i + 1}: the chips are not one size`);
        const fs = Math.min(...els.map((c) => parseFloat(getComputedStyle(c).fontSize)));
        if (fs < 16) fails.push(`row ${i + 1}: chip text ${fs} px (< 16)`);
        r.querySelectorAll('[data-lcs-pos-chip]').forEach((c) => { const b = c.getBoundingClientRect(); if (b.right > root.right + 1) fails.push(`row ${i + 1}: a word leaves the page`); });
        r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); });
        // the scene: the shape's drawn box (the union of its parts, stroke excluded) and the picture's square
        const sc = r.querySelector('[data-lcs-scene-prep]'), svg = sc && sc.querySelector('svg'), im = sc && sc.querySelector('img');
        if (!svg || !im) return { i, chips, prep: r.dataset.lcsChooseRow, missing: true };
        const parts = [...svg.children].map((e) => e.getBoundingClientRect());
        const shape = { l: Math.min(...parts.map((b) => b.left)), t: Math.min(...parts.map((b) => b.top)), r: Math.max(...parts.map((b) => b.right)), b: Math.max(...parts.map((b) => b.bottom)) };
        return { i, chips, prep: r.dataset.lcsChooseRow, shapeKey: sc.dataset.lcsSceneShape, shape, img: box(im.getBoundingClientRect()), src: im.getAttribute('src') || '', zImg: Number(getComputedStyle(im).zIndex), zSvg: Number(getComputedStyle(svg).zIndex) };
      });
      return { fails, seen, lang: document.documentElement.lang || 'en' };
    });
    const fails = got.fails, L = A.loc2(got.lang), ALL = P.LEVEL_PREPS[3];
    const picOfSrc = (src) => { const m = /\/themes(?:-512)?\/([^/]+)\/([^/?#@]+)(?:@\dx)?\.(?:webp|png)/.exec(src); return m ? { theme: decodeURIComponent(m[1]), noun: decodeURIComponent(m[2]) } : null; };
    const inkOfSrc = (src) => { const p = picOfSrc(src); return p ? inkOf(p) : null; };
    for (const r of got.seen) {
      const n = r.i + 1;
      if (r.missing) { fails.push(`row ${n}: no scene`); continue; }
      // the sentence is singular: never a picture that shows several of its noun
      const pic = picOfSrc(r.src);
      if (pic && SEVERAL.has(pic.theme + '/' + pic.noun)) fails.push(`row ${n}: ${pic.theme}/${pic.noun} shows several under a singular sentence`);
      // ONE defensible word: no other offered word also describes this row's scene
      const keyOf = new Map(ALL.map((q) => [(P.sentence(L, q, r.shapeKey) || {}).expected, q]).filter((x) => x[0]));
      const keys = r.chips.map((w) => keyOf.get(w)).filter(Boolean);
      if (!keys.includes(r.prep)) fails.push(`row ${n}: the right word "${r.prep}" is not offered`);
      for (const k of pairedWith(r.prep, r.shapeKey)) if (keys.includes(k)) fails.push(`row ${n}: "${k}" is offered with "${r.prep}" and also describes the ${r.prep} scene${ALSO_FITS_ON[r.prep] && ALSO_FITS_ON[r.prep][r.shapeKey] ? ' on a ' + r.shapeKey : ''}`);
      const ink = inkOfSrc(r.src), I = r.img;
      const inkTop = ink ? I.t + ink.t * I.h : I.t, inkBottom = ink ? I.t + (ink.t + ink.h) * I.h : I.b;
      if (r.prep === 'above') {
        // a clear gap: the picture's square ends at least a fifth of its height above the shape's outline (its stroke)
        const gap = r.shape.t - 1.5 - I.b;
        if (gap < I.h / 5) fails.push(`row ${n}: "above" leaves ${gap.toFixed(1)} px over the ${r.shapeKey} (< ${(I.h / 5).toFixed(1)}, a fifth of the picture): it reads as "on top of"`);
      }
      if (r.prep === 'on top of') {
        // the picture's ink rests on the outline: it reaches the shape's top, and does not sink into it
        if (inkBottom < r.shape.t - 1.5) fails.push(`row ${n}: "on top of" floats ${(r.shape.t - inkBottom).toFixed(1)} px over the ${r.shapeKey}: it reads as "above"`);
        if (inkBottom > r.shape.t + 0.35 * (r.shape.b - r.shape.t)) fails.push(`row ${n}: "on top of" sinks into the ${r.shapeKey}`);
      }
      if (r.prep === 'behind') {
        // nothing rises above the shape's top edge; the shape hides part of the picture (drawn over it)
        if (inkTop < r.shape.t - 0.5) fails.push(`row ${n}: "behind" rises ${(r.shape.t - inkTop).toFixed(1)} px above the ${r.shapeKey}: "above" would fit too`);
        const iL = ink ? I.l + ink.l * I.w : I.l, iR = ink ? I.l + (ink.l + ink.w) * I.w : I.r;
        const hidden = Math.max(0, Math.min(iR, r.shape.r) - Math.max(iL, r.shape.l)) / Math.max(1, iR - iL);
        if (hidden < 0.3) fails.push(`row ${n}: "behind" hides only ${Math.round(hidden * 100)}% of the picture's width`);
        if (!(r.zImg < r.zSvg)) fails.push(`row ${n}: "behind" draws the picture over the shape`);
      }
    }
    return [...new Set(fails)];
  },
};
