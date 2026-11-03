/**
 * K-509 — Which Pictures Are Hiding? (Same & Different maker 2026-11-02, NEW-TEMPLATES §23 T5): the OUTLINES of two to
 * four pictures drawn on top of each other in one tangle; under it a row of pictures — the child circles the ones whose
 * outline is in the tangle (figure–ground: following one outline through the others).
 *
 * The outlines are the drawings' own silhouettes: the edge of each library drawing's filled body (the Picture Tracing
 * store, data/pt/traces: the mask the tracer measured), drawn as one even line. Every picture of a page — the hidden ones
 * and the others in the row — has an outline unlike every other's (their silhouettes, each fitted to a 32 × 32 square,
 * overlap by less than 0.72: two round fruits would be one answer for two choices). The pictures in the row are the same
 * drawings in black and white (the library's own), in the row's shuffled order. Copies walk the themes.
 * Levels: 1 two hidden among four · 2 three among five · 3 four among six.
 */
'use strict';
const { sceneTrace } = require('../../lib/pt-scene.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');
const { makeRng } = require('../../lib/rng.js');
const INDEX = require('../../data/pt/index.json');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { hidden: 2, choices: 4 }, 2: { hidden: 3, choices: 5 }, 3: { hidden: 4, choices: 6 } };
const BASES = ['animals', 'sea life', 'vehicles', 'toys', 'fruits', 'birds', 'farm animals', 'zoo animals', 'Christmas', 'Easter', 'beach', 'classroom'];
let _groups = null;
/** the traced simple drawings (bands P1-P2) by base theme, in a fixed order */
function groups() {
  if (_groups) return _groups;
  const man = require('../../image-cache/resolve.js').manifest().themes;   // (the platform's manifest: the maker preloads it)
  _groups = new Map();
  for (const src of Object.keys(INDEX).sort()) {
    const [theme, noun] = src.split('/');
    if (!['P1', 'P2'].includes(INDEX[src].band) || refusedPicture(theme, noun)) continue;
    const base = (man[theme] && man[theme].baseTheme) || theme;
    if (!BASES.includes(base)) continue;
    if (!_groups.has(base)) _groups.set(base, []);
    _groups.get(base).push(src);
  }
  return _groups;
}
/** a drawing's silhouette (its body mask) fitted to a 32 × 32 square: the shape compared between pictures — precomputed
 *  (data/pt/silhouettes.json, tools/pt-silhouettes.js) so a maker page fetches only the traces it draws */
const _sig = new Map();
let _pre = null;
function signature(src) {
  if (_sig.has(src)) return _sig.get(src);
  if (!_pre) { try { _pre = require('../../data/pt/silhouettes.json'); } catch (e) { _pre = {}; } }
  if (_pre[src]) { const h = _pre[src], out = new Uint8Array(1024); for (let k = 0; k < 1024; k++) out[k] = (parseInt(h[k >> 2], 16) >> (3 - (k & 3))) & 1; _sig.set(src, out); return out; }
  return measure(src);
}
function measure(src) {
  const tr = sceneTrace(src), { W, H, body } = tr;
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (body[y * W + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const S = 32, out = new Uint8Array(S * S), side = Math.max(x1 - x0, y1 - y0) + 1, ox = x0 - (side - (x1 - x0 + 1)) / 2, oy = y0 - (side - (y1 - y0 + 1)) / 2;
  for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) { const x = Math.floor(ox + (i + 0.5) * side / S), y = Math.floor(oy + (j + 0.5) * side / S); out[j * S + i] = x >= 0 && y >= 0 && x < W && y < H && body[y * W + x] ? 1 : 0; }
  _sig.set(src, out);
  return out;
}
const iou = (a, b) => { let i = 0, u = 0; for (let k = 0; k < a.length; k++) { if (a[k] && b[k]) i++; if (a[k] || b[k]) u++; } return u ? i / u : 0; };
/** the silhouette's edge as one path (every boundary between body and paper, in 2-px steps), fitted into box h tall at (cx, cy) */
function silhouettePath(src, h, cx, cy) {
  const { W, H, body } = sceneTrace(src), st = 2;
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (body[y * W + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const s = h / (y1 - y0 + 1), w = (x1 - x0 + 1) * s, X = (x) => (cx - w / 2 + (x - x0) * s).toFixed(1), Y = (y) => (cy - h / 2 + (y - y0) * s).toFixed(1);
  const on = (x, y) => x >= 0 && y >= 0 && x < W && y < H && body[Math.floor(y) * W + Math.floor(x)] === 1;
  const seg = [];
  for (let y = y0 - st; y <= y1 + st; y += st) for (let x = x0 - st; x <= x1 + st; x += st) {
    const a = on(x, y);
    if (a !== on(x + st, y)) seg.push(`M${X(x + st)} ${Y(y)}V${Y(y + st)}`);
    if (a !== on(x, y + st)) seg.push(`M${X(x)} ${Y(y + st)}H${X(x + st)}`);
  }
  return { d: seg.join(''), w };
}

module.exports = {
  id: 'K-509',
  _measure: measure, _groups: groups,
  slug: 'which-pictures-are-hiding',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'visual-discrimination',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Which Pictures Are Hiding?',
      instruction: 'Some pictures are hiding in the tangle of lines. Find their outlines, then circle those pictures in the row below.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const G = groups(), bases = makeRng('K-509|bases').shuffle([...G.keys()]);
    const copy = Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
    let pick = null;
    for (let k = 0; k < bases.length && !pick; k++) {
      const list = rng.shuffle(G.get(bases[(copy - 1 + k) % bases.length]).slice()), chosen = [];
      const noun = (s) => s.split('/')[1].replace(/_\d+$/, '');
      for (const src of list) {
        if (chosen.length === d.choices) break;
        if (chosen.some((c) => noun(c) === noun(src))) continue;
        let sg; try { sg = signature(src); } catch (e) { continue; }
        if (chosen.some((c) => iou(signature(c), sg) >= 0.72)) continue;
        chosen.push(src);
      }
      if (chosen.length === d.choices) pick = chosen;
    }
    if (!pick) throw new Error('K-509: no theme has ' + d.choices + ' pictures with outlines unlike each other');
    const hidden = pick.slice(0, d.hidden), row = rng.shuffle(pick.slice());
    // the tangle: the hidden outlines around the middle of a 600 × 380 box, each shifted so they cross but none hides
    // neighbours' centres are 0.55 of their mean width apart (they always cross), the group centred, heights alternating
    const BW = 600, BH = 380, H0 = 230;
    const widths = hidden.map((src) => silhouettePath(src, H0, 0, 0).w);
    const xs = [0]; for (let i = 1; i < widths.length; i++) xs.push(xs[i - 1] + 0.55 * (widths[i - 1] + widths[i]) / 2);
    const span = xs[xs.length - 1] - xs[0], shift = BW / 2 - span / 2;
    const paths = hidden.map((src, i) => { const p = silhouettePath(src, H0, shift + xs[i], BH / 2 + (i % 2 ? 28 : -28) + rng.int(-8, 8)); return `<path d="${p.d}" fill="none" stroke="${T.ink}" stroke-width="3.2" stroke-linecap="square" data-lcs-outline="${i + 1}"/>`; });
    const tangle = `<svg xmlns="http://www.w3.org/2000/svg" width="${BW}" height="${BH}" viewBox="0 0 ${BW} ${BH}" data-lcs-prim="tangle" data-lcs-hidden="${hidden.length}" style="display:block">${paths.join('')}</svg>`;
    const px = d.choices > 5 ? 82 : 96;
    const chips = row.map((src) => { const [theme, noun] = src.split('/'); const isHidden = hidden.includes(src);
      return `<span class="ws-pattern-chip" data-lcs-pick="1" data-lcs-label="${noun}"${isHidden ? ' data-lcs-correct="1"' : ''} style="width:${px + 18}px;height:${px + 18}px"><img class="ws-icon" src="${fileUri(theme, noun)}" alt="" data-lcs-src="${src}" style="width:${px}px;height:${px}px"></span>`; }).join('');
    const body = `<div data-ws-content style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px" data-lcs-sd-mode="hiding">` +
      `<div class="ws-card" style="width:640px;align-items:center;justify-content:center;padding:10px">${tangle}</div>` +
      `<div class="ws-card" style="width:640px;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:12px;padding:14px">${chips}</div></div>`;
    return { bodyHtml: body, meta: { hidden, row } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const t = document.querySelector('[data-lcs-prim="tangle"]');
      if (!t) return ['no tangle'];
      const n = +t.dataset.lcsHidden, outlines = t.querySelectorAll('[data-lcs-outline]').length;
      const chips = [...document.querySelectorAll('[data-lcs-pick]')], right = chips.filter((c) => c.hasAttribute('data-lcs-correct'));
      if (outlines !== n) fails.push(`${outlines} outlines for ${n} hidden pictures`);
      if (right.length !== n) fails.push(`${right.length} pictures marked hidden, ${n} in the tangle`);
      if (chips.length <= n) fails.push('nothing in the row is a wrong choice');
      const srcs = chips.map((c) => c.querySelector('img').dataset.lcsSrc);
      if (new Set(srcs).size !== srcs.length) fails.push('a picture twice in the row');
      chips.forEach((c) => { const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
      // every outline crosses at least one other (a tangle, not pictures side by side)
      const boxes = [...t.querySelectorAll('[data-lcs-outline]')].map((p) => p.getBBox());
      boxes.forEach((a, i) => { if (!boxes.some((b, j) => j !== i && a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height)) fails.push(`outline ${i + 1} crosses no other`); });
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      document.querySelectorAll('.ws-card').forEach((c) => { if (c.getBoundingClientRect().bottom > pg.bottom + 1) fails.push('a card leaves the page'); });
      return fails;
    });
  },
};
