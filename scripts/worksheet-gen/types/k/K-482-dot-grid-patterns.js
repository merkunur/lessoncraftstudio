/**
 * K-482 — Copy the Pattern on the Dots (Pencil Control Lines maker 2026-11-02, NEW-TEMPLATES B4 T3): a geoboard on
 * paper. Each row: a model grid with a path drawn through its dots, and the same empty grid beside it where the child
 * joins the dots the same way. Spatial copying + a pencil line from dot to dot.
 *
 * Levels: 1 a 4 × 4 grid, 3–4 straight moves along the rows and columns (steps, an L, a U), the start dot marked on
 * both grids · 2 a 5 × 5 grid, 4–6 moves with slants (zigzags, a diamond), start marked on both · 3 a 5 × 5 grid, 6–8
 * moves with slants, the start marked on the model only (the child finds it). A path never visits a dot twice and never
 * crosses itself; the rows of a page are different paths. The key draws the path on each copy grid.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { el, svgRoot } = require('../../primitives/_svg.js');
const { copyArrow } = require('../../templates/components-b2.js');   // the drawn arrow (an arrow codepoint is outside the page fonts)

const D = {
  1: { n: 4, moves: [3, 4], diag: false, startOnCopy: true, gap: 52 },
  2: { n: 5, moves: [4, 6], diag: true, startOnCopy: true, gap: 40 },
  3: { n: 5, moves: [6, 8], diag: true, startOnCopy: false, gap: 40 },
};
const DIRS4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const DIRS8 = DIRS4.concat([[1, 1], [1, -1], [-1, 1], [-1, -1]]);

/** a non-crossing path of `segs` straight segments (each 1–2 dots long) on an n × n lattice; null when the walk gets stuck */
function walk(rng, n, segs, diag) {
  const key = (p) => p[0] + ',' + p[1];
  const pts = [[rng.int(0, n - 1), rng.int(0, n - 1)]];
  const seen = new Set([key(pts[0])]);
  const edges = [];   // unit edges, to refuse a crossing of two diagonals
  let prev = null;
  for (let s = 0; s < segs; s++) {
    // a new direction, turning 90° at most (a sharper turn draws a spike that reads as a scribble, not a pattern)
    const dirs = rng.shuffle((diag ? DIRS8 : DIRS4).slice()).filter((d) => !prev || ((d[0] !== prev[0] || d[1] !== prev[1]) && d[0] * prev[0] + d[1] * prev[1] >= 0));
    let moved = false;
    for (const d of dirs) {
      const len = rng.int(1, 2);
      const run = [];
      let ok = true, cur = pts[pts.length - 1];
      for (let k = 0; k < len; k++) {
        const nx = [cur[0] + d[0], cur[1] + d[1]];
        if (nx[0] < 0 || nx[1] < 0 || nx[0] >= n || nx[1] >= n || seen.has(key(nx))) { ok = false; break; }
        // a diagonal step may not cross another diagonal of the same unit square
        if (d[0] && d[1]) { const x = Math.min(cur[0], nx[0]), y = Math.min(cur[1], nx[1]); if (edges.includes('x' + x + ',' + y)) { ok = false; break; } }
        run.push(nx); cur = nx;
      }
      if (!ok || !run.length) continue;
      let c0 = pts[pts.length - 1];
      for (const p of run) { if (d[0] && d[1]) edges.push('x' + Math.min(c0[0], p[0]) + ',' + Math.min(c0[1], p[1])); seen.add(key(p)); pts.push(p); c0 = p; }
      prev = d; moved = true; break;
    }
    if (!moved) return null;
  }
  return pts;
}

/** one dot grid (n × n, spacing gap) with an optional path; the start dot coral when `start` */
function grid({ n, gap, path, start, role, key }) {
  const pad = 14, w = pad * 2 + gap * (n - 1);
  const X = (p) => pad + p[0] * gap, Y = (p) => pad + p[1] * gap;
  const dots = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) dots.push(el('circle', { cx: X([x, y]), cy: Y([x, y]), r: 4.5, fill: tokens.color.ink, 'data-lcs-dot': x + ',' + y }));
  const line = path ? el('polyline', { points: path.map((p) => X(p) + ',' + Y(p)).join(' '), fill: 'none', stroke: tokens.color.teal, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...(key ? { 'data-lcs-key-sample': 'copy' } : { 'data-lcs-model-path': path.map((p) => p.join(',')).join(' ') }) }) : '';
  const s = start ? el('circle', { cx: X(start), cy: Y(start), r: 8, fill: tokens.color.coral, 'data-lcs-start': start.join(',') }) : '';
  return svgRoot({ width: w, height: w, label: role === 'model' ? 'pattern to copy' : 'empty dot grid' }, line + dots.join('') + s, { 'data-lcs-dot-grid': role, 'data-lcs-n': n });
}

module.exports = {
  id: 'K-482',
  slug: 'dot-grid-patterns',
  gradeBand: 'K',
  assetClass: 'none',
  exerciseType: 'pre-writing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: {
      title: 'Copy the Pattern on the Dots',
      instruction: 'Look at the line on the first dots. Draw the same line on the empty dots beside it, from the orange dot.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const rows = [], sigs = new Set();
    for (let tries = 0; rows.length < 3 && tries < 400; tries++) {
      const segs = rng.int(d.moves[0], d.moves[1]);
      const p = walk(rng, d.n, segs, d.diag);
      if (!p) continue;
      const sig = p.map((q) => q.join(',')).join(' ');
      if (sigs.has(sig)) continue;
      sigs.add(sig); rows.push({ path: p, segs });
    }
    if (rows.length < 3) throw new Error('K-482: could not draw three different paths');
    const cards = rows.map((r, i) => {
      const model = grid({ n: d.n, gap: d.gap, path: r.path, start: r.path[0], role: 'model' });
      const copy = grid({ n: d.n, gap: d.gap, path: key ? r.path : null, start: d.startOnCopy || key ? r.path[0] : null, role: 'copy', key });
      return `<section class="ws-card" data-lcs-card="${i + 1}" style="display:flex;flex-direction:row;align-items:center;justify-content:space-around;padding:14px 10px">${model}<span style="flex:0 0 auto;line-height:0">${copyArrow()}</span>${copy}</section>`;
    });
    const body = `<div class="ws-cardgrid" data-ws-content style="grid-template-columns:minmax(0,1fr);grid-template-rows:repeat(3,minmax(0,1fr))">${cards.join('')}</div>`;
    return { bodyHtml: body, meta: { paths: rows.map((r) => r.path.map((q) => q.join(',')).join(' ')) } };
  },

  async verify(page) {
    return page.evaluate((D) => {
      const fails = [];
      const models = [...document.querySelectorAll('svg[data-lcs-dot-grid="model"]')], copies = [...document.querySelectorAll('svg[data-lcs-dot-grid="copy"]')];
      if (models.length !== 3 || copies.length !== 3) return [`${models.length} model grids and ${copies.length} copy grids (3 each)`];
      const sigs = new Set();
      models.forEach((m, i) => {
        const n = +m.dataset.lcsN;
        if (m.querySelectorAll('[data-lcs-dot]').length !== n * n) fails.push(`row ${i + 1}: the model grid is not ${n} × ${n}`);
        const pl = m.querySelector('[data-lcs-model-path]');
        if (!pl) { fails.push(`row ${i + 1}: no model path`); return; }
        const pts = pl.dataset.lcsModelPath.split(' ').map((s) => s.split(',').map(Number));
        sigs.add(pl.dataset.lcsModelPath);
        // every corner is a dot, each step to a neighbouring dot, no dot twice
        const seen = new Set(pts.map((p) => p.join(',')));
        if (seen.size !== pts.length) fails.push(`row ${i + 1}: the path visits a dot twice`);
        for (let k = 1; k < pts.length; k++) { const dx = Math.abs(pts[k][0] - pts[k - 1][0]), dy = Math.abs(pts[k][1] - pts[k - 1][1]); if (dx > 1 || dy > 1 || dx + dy === 0) fails.push(`row ${i + 1}: a step skips a dot`); }
        const start = m.querySelector('[data-lcs-start]');
        if (!start || start.dataset.lcsStart !== pts[0].join(',')) fails.push(`row ${i + 1}: the model's start dot is not where the path begins`);
        const c = copies[i];
        if (+c.dataset.lcsN !== n || c.querySelectorAll('[data-lcs-dot]').length !== n * n) fails.push(`row ${i + 1}: the copy grid differs from the model grid`);
        if (c.querySelector('[data-lcs-model-path]')) fails.push(`row ${i + 1}: the copy grid shows the model`);
        const key = c.querySelector('[data-lcs-key-sample]');
        if (key && key.getAttribute('points') !== pl.getAttribute('points')) fails.push(`row ${i + 1}: the key's copy is not the model`);
        const mr = m.getBoundingClientRect(), cr = c.getBoundingClientRect();
        if (cr.left < mr.right) fails.push(`row ${i + 1}: the copy grid is not beside the model`);
        if (Math.abs(mr.width - cr.width) > 1) fails.push(`row ${i + 1}: the two grids are not the same size`);
      });
      if (sigs.size !== models.length) fails.push('two rows have the same pattern');
      return fails;
    }, D);
  },
};
