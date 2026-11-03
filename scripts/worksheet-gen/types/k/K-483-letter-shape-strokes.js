/**
 * K-483 — Letter Strokes (Pencil Control Lines maker 2026-11-02, NEW-TEMPLATES B4 T2): before letters, the strokes
 * letters are made of — the straight stem of l, the round c-curve of c o a d g q, the bar of t f, the arch of n m h r,
 * the cup of u, the slants of v w x k. Each row shows its letters, then the stroke itself on school lines: the first
 * one solid (the model), the rest dashed with a start dot and an arrow.
 *
 * The families are COMPUTED from the platform's letter model (data/tracing/letter-strokes.js: the stroke paths of the
 * school print every tracing page uses), never authored: a stroke's shape decides its family (classify below), and the
 * row draws the stroke exactly as that model draws it, the same way round. That model is the US-school print, so the
 * page is offered where it is the school's letter (en, es — NEW-TEMPLATES B4 T2 named pt too; the review found pt-BR writes capitals, then cursive); another language waits for its own
 * letter model (letter-tracing-Q1) and is refused, never given a foreign hand.
 *
 * Levels (the order strokes are learned): 1 three rows — stem, c-curve, bar, big · 2 three rows — arch, cup, slant ·
 * 3 five rows of every family, smaller and more repetitions.
 */
'use strict';
const LS = require('../../data/tracing/letter-strokes.js');
const { schoolLines, renderPath } = require('../../primitives/trace-path.js');
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el } = require('../../primitives/_svg.js');

const MODEL_LOCALES = new Set(['en', 'es']);   // (pt-BR children write capitals, then cursive — lowercase print is read, not written: review 2026-11-02)
const M = LS.METRICS;
const TOP = M.ascender;   // the lanes run from the ascender line to the baseline
const FAMILY_ORDER = ['stem', 'c-curve', 'bar', 'arch', 'cup', 'slant'];
const LEAD = { stem: 'l', 'c-curve': 'c', bar: 't', arch: 'n', cup: 'u', slant: 'v' };   // whose strokes a row repeats

const numsOf = (d) => d.match(/-?[\d.]+/g).map(Number);
const ptsOf = (d) => { const n = numsOf(d), o = []; for (let i = 0; i + 1 < n.length; i += 2) o.push([n[i], n[i + 1]]); return o; };
// a straight line: the chord spans the whole stroke (a closed bowl's chord is ~0 and would pass any distance test) and
// every point lies within 1.5 units of it
function isLine(p) {
  const s = p[0], e = p[p.length - 1], l = Math.hypot(e[0] - s[0], e[1] - s[1]);
  const xs = p.map((q) => q[0]), ys = p.map((q) => q[1]);
  if (l < 0.9 * Math.hypot(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys))) return false;
  return p.every((q) => Math.abs((e[0] - s[0]) * (s[1] - q[1]) - (s[0] - q[0]) * (e[1] - s[1])) / l < 1.5);
}

/** a stroke's family, from its shape alone (the letter model's coordinates: y down, baseline M.base) */
function classify(d) {
  const p = ptsOf(d), xs = p.map((q) => q[0]), ys = p.map((q) => q[1]);
  const dx = Math.max(...xs) - Math.min(...xs), dy = Math.max(...ys) - Math.min(...ys);
  const s = p[0], e = p[p.length - 1], last = p.length - 1;
  const ymin = Math.min(...ys), ymax = Math.max(...ys), xmin = Math.min(...xs);
  const iymin = ys.indexOf(ymin), iymax = ys.indexOf(ymax), ixmin = xs.indexOf(xmin);
  if (dx < 3 && dy > 8) return 'stem';
  if (dy < 3 && dx > 8) return 'bar';
  if (dx > 6 && isLine(p)) return 'slant';
  // an arch rises from the stem to the x-height and comes down to the baseline (n m h r — not e, which ends above it)
  if (iymin > 0 && iymin < last && ymin < s[1] - 4 && e[0] > s[0] && e[1] >= M.base - 2) return 'arch';
  // a cup falls to the baseline and rises again (u)
  if (iymax > 0 && iymax < last && ymax > s[1] + 4 && ymax > e[1] + 4 && e[0] > s[0]) return 'cup';
  // the c-curve starts at the right, turns left and down, and comes back to the right (c o a d g q — not s, not f's hook)
  if (ixmin > 0 && ixmin < last && s[0] > xmin + 6 && e[0] > xmin + 6) return 'c-curve';
  return null;
}

const lengthOf = (d) => { const p = ptsOf(d); let l = 0; for (let i = 1; i < p.length; i++) l += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return l; };
/** the families of the letter model: the letters made with each (ranked by how much of the letter's ink is that stroke:
 *  i is nearly all stem, b only half — a quarter at least, five at most) + the lead letter's strokes of that family */
let FAM = null;
function families() {
  if (FAM) return FAM;
  FAM = {};
  const share = {};
  for (const ch of 'abcdefghijklmnopqrstuvwxyz') {
    const g = LS.glyphFor(ch), all = g.strokes.reduce((a, st) => a + lengthOf(st.d), 0);
    for (const st of g.strokes) { if (st.mark) continue; const f = classify(st.d); if (f) { share[f] = share[f] || {}; share[f][ch] = (share[f][ch] || 0) + lengthOf(st.d) / all; } }
  }
  for (const [f, by] of Object.entries(share)) FAM[f] = { letters: Object.entries(by).filter(([, v]) => v >= 0.25).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5).map(([ch]) => ch), strokes: [] };
  for (const f of Object.keys(FAM)) FAM[f].strokes = LS.glyphFor(LEAD[f]).strokes.filter((st) => !st.mark && classify(st.d) === f);
  for (const f of FAMILY_ORDER) if (!FAM[f] || !FAM[f].strokes.length) throw new Error(`K-483: the letter model yields no ${f} stroke`);
  return FAM;
}

/** a model path (M / C pairs only) scaled by k about (ox, oy) and moved to (dx, dy) */
function moveD(d, k, ox, oy, dx, dy) {
  let i = 0;
  return d.replace(/-?[\d.]+/g, (m) => { const v = +m, isX = i % 2 === 0; i++; return (isX ? dx + (v - ox) * k : dy + (v - oy) * k).toFixed(1); });
}
/** one stroke in a lane cell: its own ink centred on cx, the ascender line at `top` */
function placeD(d, k, cx, top) { const xs = ptsOf(d).map((q) => q[0]); return moveD(d, k, (Math.min(...xs) + Math.max(...xs)) / 2, TOP, cx, top); }

const D = {
  1: { rows: ['stem', 'c-curve', 'bar'], laneH: 160, reps: 5 },
  2: { rows: ['arch', 'cup', 'slant'], laneH: 160, reps: 5 },
  3: { rows: ['stem', 'c-curve', 'arch', 'cup', 'slant'], laneH: 106, reps: 7 },
};

module.exports = {
  id: 'K-483',
  slug: 'letter-shape-strokes',
  gradeBand: 'K',
  assetClass: 'none',
  exerciseType: 'pre-writing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Letter Strokes: Lines, Curves and Arches',
      instruction: 'Trace each stroke, starting at the orange dot. The letters at the start of the row are made with it.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    if (!MODEL_LOCALES.has(loc)) throw new Error(`K-483: no school letter model for ${loc} (letter-tracing-Q1) — refused, never a foreign hand`);
    const d = this.difficulty[difficulty];
    const F = families();
    const W = 651, H = d.laneH, pad = 10, k = (H - 2 * pad) / (M.base - TOP);
    const yTop = pad, yMid = pad + (M.xTop - TOP) * k, yBase = pad + (M.base - TOP) * k;
    const letW = 128, laneW = W - letW - 14;
    const cards = d.rows.map((f, r) => {
      const fam = F[f];
      // the row's letters, solid, at a smaller scale
      const shown = fam.letters;
      // each letter moved as one piece (every stroke the same transform), side by side, centred in the box
      const lk = Math.min(k * 0.55, (letW - 12) / shown.reduce((a, ch) => { const g = LS.glyphFor(ch); return a + (g.ink.x1 - g.ink.x0) + 12; }, 0));
      const total = shown.reduce((a, ch) => { const g = LS.glyphFor(ch); return a + (g.ink.x1 - g.ink.x0) * lk; }, 0) + (shown.length - 1) * 12 * lk;
      const ly = (H - (M.base - TOP) * lk) / 2;
      let x = (letW - total) / 2;
      const letters = shown.map((ch) => {
        const g = LS.glyphFor(ch), x0 = x;
        x += (g.ink.x1 - g.ink.x0) * lk + 12 * lk;
        return g.strokes.map((st) => el('path', { d: moveD(st.d, lk, g.ink.x0, TOP, x0, ly), fill: st.mark ? tokens.color.ink : 'none', stroke: tokens.color.ink, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })).join('');
      }).join('');
      const lettersSvg = svgRoot({ width: letW, height: H, label: 'letters: ' + shown.join(' ') }, letters, { 'data-lcs-stroke-letters': shown.join('') });
      // the stroke, repeated: the lead letter's strokes of this family in turn (v: \ then /), first one solid
      const cell = laneW / d.reps;
      const parts = [schoolLines({ w: laneW, yTop, yBase, yMid })];
      for (let i = 0; i < d.reps; i++) {
        const st = fam.strokes[i % fam.strokes.length];
        const dd = placeD(st.d, k, cell * (i + 0.5), yTop);
        const s0 = numsOf(dd);
        parts.push(el('g', { 'data-lcs-rep': i === 0 ? 'model' : 'trace' }, renderPath({ d: dd, mode: i === 0 ? 'model' : 'trace', startX: s0[0], startY: s0[1], startAngle: st.angle, dot: i > 0, arrow: i > 0 })));
      }
      const lane = svgRoot({ width: laneW, height: H, label: 'letter stroke: ' + f }, parts.join(''), { 'data-lcs-stroke-family': f, 'data-lcs-prim': 'trace-stroke' });
      return `<section class="ws-card" data-lcs-card="${r + 1}" style="display:flex;flex-direction:row;align-items:center;gap:14px;padding:8px 12px">${lettersSvg}${lane}</section>`;
    });
    const body = `<div class="ws-cardgrid" data-ws-content style="grid-template-columns:minmax(0,1fr);grid-template-rows:repeat(${d.rows.length},minmax(0,1fr))">${cards.join('')}</div>`;
    return { bodyHtml: body, meta: { rows: d.rows } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = [...document.querySelectorAll('svg[data-lcs-stroke-family]')];
      if (lanes.length < 3) return [`only ${lanes.length} stroke rows`];
      const fams = lanes.map((l) => l.dataset.lcsStrokeFamily);
      if (new Set(fams).size !== fams.length) fails.push('a stroke family repeats');
      lanes.forEach((l, i) => {
        const reps = [...l.querySelectorAll('g[data-lcs-rep]')];
        if (reps.length < 4) fails.push(`row ${i + 1}: only ${reps.length} strokes`);
        reps.forEach((g, k) => {
          const p = g.querySelector('path'), dashed = p && !!p.getAttribute('stroke-dasharray');
          if (!p) { fails.push(`row ${i + 1} stroke ${k + 1}: nothing drawn`); return; }
          if ((k === 0) === dashed) fails.push(`row ${i + 1} stroke ${k + 1}: ${k === 0 ? 'the model is dashed' : 'a trace is solid'}`);
          if (k > 0 && !g.querySelector('circle')) fails.push(`row ${i + 1} stroke ${k + 1}: no start dot`);
        });
        const lt = l.parentElement.querySelector('[data-lcs-stroke-letters]');
        if (!lt || !lt.dataset.lcsStrokeLetters) fails.push(`row ${i + 1}: no letters shown`);
      });
      return fails;
    });
  },
  classify,
};
