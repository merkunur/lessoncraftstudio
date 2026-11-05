/**
 * G1-529 — Give the Directions (Maps & Coordinates maker 2026-11-03, NEW-TEMPLATES §54 T2; the production inverse of
 * G1-528 Treasure Hunt; pt "orientação e localização", es "puntos cardinales en planos"): a route is drawn on a grid
 * from one picture to another; the child writes it as steps — for each straight part, which way (circle the arrow; level
 * 3 the compass letter) and how many squares. Every part turns a corner from the one before (a straight run is one step,
 * so the answer is unique), the route never crosses itself. The way is a choice (the right one ringed on the key), the
 * count an answer box.
 * Levels: 1 a 5 × 5 grid, two parts · 2 a 6 × 6 grid, three parts · 3 a 6 × 6 grid, four parts, the way as a compass
 * letter (N E S W in the language's letters, a compass rose beside the grid).
 */
'use strict';
const slot = require('../../lib/slot.js');
const { fileUri } = require('../../lib/b2-common.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');
const { compassRose } = require('../../primitives/compass-rose.js');
const B5 = require('../../lib/b5-common.js');
const { MAPS_NEW, DELTA } = require('../../data/maps/maps-new.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 5, parts: 2, compass: false }, 2: { n: 6, parts: 3, compass: false }, 3: { n: 6, parts: 4, compass: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ROT = { up: 0, right: 90, down: 180, left: 270 };
const COMPASS = { up: 'n', right: 'e', down: 's', left: 'w' };
const arrow = (dir, px = 30) => `<svg width="${px}" height="${px}" viewBox="0 0 24 24" aria-hidden="true" style="display:block"><g transform="rotate(${ROT[dir]} 12 12)"><path d="M12 3 L19 11 L14.5 11 L14.5 21 L9.5 21 L9.5 11 L5 11 Z" fill="${T.teal}"/></g></svg>`;

/** a route of `k` straight parts, each turning a corner, never touching a cell twice */
function corners(n, k, rng) {
  const DIRS = ['up', 'right', 'down', 'left'];
  for (let t = 0; t < 2000; t++) {
    let r = rng.int(0, n - 1), c = rng.int(0, n - 1);
    const start = [r, c], seen = new Set([r + ',' + c]), parts = [];
    let ok = true, prev = null;
    for (let i = 0; i < k && ok; i++) {
      const opts = [];
      for (const dir of DIRS) {
        if (prev && (dir === prev || DELTA[dir].every((v, j) => v === -DELTA[prev][j]))) continue;   // a corner, never back
        for (let s = 1; s <= 3; s++) {
          let fine = true;
          for (let q = 1; q <= s; q++) { const nr = r + DELTA[dir][0] * q, nc = c + DELTA[dir][1] * q; if (nr < 0 || nr >= n || nc < 0 || nc >= n || seen.has(nr + ',' + nc)) { fine = false; break; } }
          if (fine) opts.push({ dir, steps: s });
        }
      }
      if (!opts.length) { ok = false; break; }
      const m = rng.pick(opts);
      for (let q = 1; q <= m.steps; q++) seen.add((r + DELTA[m.dir][0] * q) + ',' + (c + DELTA[m.dir][1] * q));
      r += DELTA[m.dir][0] * m.steps; c += DELTA[m.dir][1] * m.steps;
      parts.push(m); prev = m.dir;
    }
    if (ok) return { start, parts, end: [r, c] };
  }
  throw new Error('G1-529: no route');
}

module.exports = {
  id: 'G1-529',
  slug: 'give-the-directions',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'maps',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Give the Directions', instruction: 'Follow the path from the first picture. For each part, circle the direction and write how many squares.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const M = MAPS_NEW[L];
    const pool = labelSafeNouns(theme).filter((x) => !refusedPicture(theme, x.noun));
    if (pool.length < 2) throw new Error(`G1-529: theme ${theme} has too few pictures`);
    const [a, b] = slot.pictures(ctx, rng.sample(pool, 2), pool, theme);   // a teacher's start and finish pictures (maker)
    const { start, parts, end } = corners(d.n, d.parts, rng);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const cell = d.compass ? 70 : d.n === 5 ? 84 : 76, W = d.n * cell;
    const cx = (c) => c * cell + cell / 2, cy = (r) => r * cell + cell / 2;
    // the path: a thick coral line through the cell centres, an arrowhead into the last cell
    const pts = [[start[0], start[1]]];
    for (const p of parts) { const [r, c] = pts[pts.length - 1]; pts.push([r + DELTA[p.dir][0] * p.steps, c + DELTA[p.dir][1] * p.steps]); }
    const last = pts[pts.length - 1], prevP = pts[pts.length - 2];
    const ux = Math.sign(last[1] - prevP[1]), uy = Math.sign(last[0] - prevP[0]);
    const tipX = cx(last[1]) - ux * cell * 0.36, tipY = cy(last[0]) - uy * cell * 0.36;
    const line = pts.map(([r, c], i) => (i === pts.length - 1 ? [tipX - ux * 12, tipY - uy * 12] : [cx(c), cy(r)])).map((p) => p.join(',')).join(' ');
    const head = `<path d="M${tipX},${tipY} L${tipX - ux * 16 - uy * 11},${tipY - uy * 16 - ux * 11} L${tipX - ux * 16 + uy * 11},${tipY - uy * 16 + ux * 11} Z" fill="${T.coral}"/>`;
    const gridLines = [];
    for (let i = 0; i <= d.n; i++) gridLines.push(`<line x1="${i * cell}" y1="0" x2="${i * cell}" y2="${W}" stroke="${T.grid}" stroke-width="2"/><line x1="0" y1="${i * cell}" x2="${W}" y2="${i * cell}" stroke="${T.grid}" stroke-width="2"/>`);
    const img = (p, r, c) => `<image href="${fileUri(theme, p.noun)}"${slot.attr(ctx, 'pic', p === a ? 0 : 1)} x="${c * cell + 6}" y="${r * cell + 6}" width="${cell - 12}" height="${cell - 12}" preserveAspectRatio="xMidYMid meet"/>`;
    const svg = `<svg data-lcs-dir-grid width="${W + 4}" height="${W + 4}" viewBox="-2 -2 ${W + 4} ${W + 4}" style="flex:0 0 auto"><rect x="0" y="0" width="${W}" height="${W}" fill="#FFFFFF"/>${gridLines.join('')}` +
      `<polyline points="${line}" fill="none" stroke="${T.coral}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>${head}${img(a, start[0], start[1])}${img(b, end[0], end[1])}` +
      `<rect x="0" y="0" width="${W}" height="${W}" fill="none" stroke="${T.teal}" stroke-width="3"/></svg>`;
    const letters = d.compass ? B5.bank('maps', L).dirLetters : null;
    const chip = (dir, ok) => `<span class="ws-dir-choice"${mark && ok ? ' data-lcs-correct="1"' : ''} data-lcs-label="${esc(d.compass ? letters[COMPASS[dir]] : M.dirs[dir])}" style="display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border:2.5px solid ${T.grid};border-radius:12px;background:#FFFFFF;font:700 24px/1 'Baloo 2',cursive;color:${T.teal}">${d.compass ? esc(letters[COMPASS[dir]]) : arrow(dir)}</span>`;
    // the chips in ONE order at every level — up, down, left, right (level 3: N S W E, each letter where its arrow stood
    // at level 2). Every part turns a corner, so the ways alternate up-down / left-right: in the compass's clockwise order
    // N E S W the answer was always a neighbour of the last one, and "one chip on each time" scored 33 % against 25 %
    // (settings-space 2026-11-05, en + fi, 192 answers each)
    const order = ['up', 'down', 'left', 'right'];
    const rows = parts.map((p, i) => `<div data-lcs-dir-part="${i + 1}" style="display:flex;align-items:center;gap:12px">` +
      `<span style="flex:0 0 28px;height:28px;border-radius:14px;background:${T.teal};color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;font:700 16px/1 'Baloo 2',cursive">${i + 1}</span>` +
      `<span style="display:inline-flex;gap:6px">${order.map((dir) => chip(dir, dir === p.dir)).join('')}</span>` +
      `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${p.steps}"` : ''} style="width:60px;height:46px;flex:0 0 auto"></span></div>`);
    const heads = `<div style="display:flex;gap:12px;font:700 16px/1.2 'Nunito',sans-serif;color:${T.ink}"><span style="flex:0 0 28px"></span><span style="flex:0 0 ${4 * 46 + 18}px;text-align:center">${esc(M.steps.way)}</span><span style="flex:0 0 150px">${esc(M.steps.count)}</span></div>`;
    const rose = d.compass ? compassRose({ px: 112, letters, reference: true }).svg : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-give-dirs style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:16px;min-height:0">` +
        `<div style="display:flex;align-items:center;gap:16px">${svg}${rose}</div>` +
        `<div data-lcs-dir-parts style="display:flex;flex-direction:column;gap:10px;padding:12px 16px;border-radius:14px;background:${T.cream}">${heads}${rows.join('')}</div></div>`,
      meta: { start, end, parts: parts.map((p) => `${p.dir} ${p.steps}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const parts = [...document.querySelectorAll('[data-lcs-dir-part]')];
      if (parts.length < 2) fails.push(`${parts.length} parts`);
      const root = document.querySelector('[data-lcs-give-dirs]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-dir-grid], [data-lcs-dir-parts]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
      return fails;
    });
  },
};
