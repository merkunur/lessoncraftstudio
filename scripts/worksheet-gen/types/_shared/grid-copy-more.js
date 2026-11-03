/**
 * grid-copy-more — the three new grid pages of the Symmetry & Grid Copy maker (makers 2026-11-02, NEW-TEMPLATES §21):
 *   bigger K-502 Draw It Twice as Big — a pixel picture on a small grid; the child colours it on a grid whose squares
 *               are twice as big (levels 1-2), or on a grid with twice as many squares, each square of the picture
 *               becoming a block of 2 × 2 (level 3). Scaling, square by square.
 *   turn   K-503 Turn the Picture — copy the picture turned a quarter turn to the right (level 1), to the left (level 2)
 *               or flipped like in a mirror (level 3). Every picture changes under its level's move (a picture that
 *               looks the same turned would make the copy the answer: refused).
 *   art    K-504 Copy the Drawing on the Grid — a real drawing (a how-to-draw lesson: data/symmetry/draw-half.js, the
 *               lessons this maker already ships) on a grid; the child copies it square by square onto the empty twin
 *               grid: level 1 only its outline (the lesson's first step), level 2 the outline and the big parts, level 3
 *               the whole drawing on a finer grid. The key draws the copy.
 * The pixel pictures are the grid-copy family's own (data/b2/figures.js + the Level Set figures; ≥ 40 % filled, one
 * piece, asymmetric under every flip: K-286's pool). Language-free pages; the key colours the answer squares coral.
 */
'use strict';
const path = require('path');
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, roundedRect, line, el } = require('../../primitives/_svg.js');
const { pixelFiguresOfSize, filledCount, monoRows } = require('../../data/b2/figures.js');
const { LS_PIXEL_FIGURES } = require('../../data/b2/figures-levelset.js');
const { DRAW_HALF } = require('../../data/symmetry/draw-half.js');
const platform = require('../../lib/platform/index.js');

const T = tokens.color;
const pool = (n) => [...pixelFiguresOfSize(n), ...LS_PIXEL_FIGURES.filter((f) => f.rows.length === n && f.rows[0].length === n)].filter((f) => filledCount(f) / (n * n) >= 0.4);
const cellsOf = (f) => { const m = monoRows(f), out = []; for (let r = 0; r < m.length; r++) for (let c = 0; c < m.length; c++) if (m[r][c] === '#') out.push([c, r]); return out; };
/** the moves of the turn page: a cell (c, r) of an n × n picture → its place after the move */
const MOVES = {
  right: (c, r, n) => [n - 1 - r, c],   // a quarter turn clockwise
  left: (c, r, n) => [r, n - 1 - c],    // a quarter turn anticlockwise
  flip: (c, r, n) => [n - 1 - c, r],    // a mirror image left ↔ right
};

/** a grid: `given` cells teal (the picture), `answers` cells empty (coral on the key) */
function grid({ n, cell, given = [], answers = [], key = false, prim, attrs = {} }) {
  const parts = [el('rect', { x: 2, y: 2, width: n * cell, height: n * cell, fill: T.white })];
  for (const [c, r] of given) parts.push(el('rect', { x: 2 + c * cell + 1, y: 2 + r * cell + 1, width: cell - 2, height: cell - 2, fill: T.teal, 'data-lcs-given': `${c},${r}` }));
  for (const [c, r] of answers) parts.push(el('rect', { x: 2 + c * cell + 1, y: 2 + r * cell + 1, width: cell - 2, height: cell - 2, fill: key ? T.coral : 'none', 'data-lcs-answer-cell': `${c},${r}`, ...(key ? { 'data-lcs-key-sample': '1' } : {}) }));
  for (let i = 0; i <= n; i++) {
    parts.push(line({ x1: 2, y1: 2 + i * cell, x2: 2 + n * cell, y2: 2 + i * cell, strokeColor: T.grid, strokeWidth: 1, cap: 'butt' }));
    parts.push(line({ x1: 2 + i * cell, y1: 2, x2: 2 + i * cell, y2: 2 + n * cell, strokeColor: T.grid, strokeWidth: 1, cap: 'butt' }));
  }
  parts.push(roundedRect({ x: 2, y: 2, w: n * cell, h: n * cell, r: 6, fill: 'none', strokeColor: T.teal, strokeWidth: 2 }));
  return svgRoot({ width: n * cell + 4, height: n * cell + 4, label: prim }, parts.join(''), { 'data-lcs-prim': prim, 'data-lcs-cols': n, 'data-lcs-cell': cell, ...attrs });
}
/** the turn sign between the two grids: a curved arrow (right / left) or two mirrored triangles (flip) — drawn, no codepoint */
function moveSign(move) {
  const body = move === 'flip'
    ? `<line x1="30" y1="6" x2="30" y2="54" stroke="${T.inkSoft}" stroke-width="2.5" stroke-dasharray="5 4"/><path d="M24 18 L8 30 L24 42 Z" fill="${T.coral}"/><path d="M36 18 L52 30 L36 42 Z" fill="none" stroke="${T.coral}" stroke-width="3" stroke-linejoin="round"/>`
    : `<path d="${move === 'right' ? 'M12 40 A20 20 0 1 1 46 26' : 'M48 40 A20 20 0 1 0 14 26'}" fill="none" stroke="${T.coral}" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="${move === 'right' ? 'M38 22 L48 28 L52 16' : 'M22 22 L12 28 L8 16'}" fill="none" stroke="${T.coral}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" data-lcs-move="${move}" style="display:block;flex:0 0 60px">${body}</svg>`;
}
/** a lesson's ink, steps 0..k (how-to-draw: the drawing's own lines as filled shapes) */
function lessonInk(id) { const [dir, name] = id.split('/'); return platform.readJson(path.join(__dirname, '..', '..', 'data', dir, name + '.json')); }
/** a drawing on a grid (or the empty grid with the drawing as the key's sample) */
function artGrid({ L, upto, cells, G, ink, prim, key }) {
  const cell = G / cells, [x0, y0, x1, y1] = L.bbox, bw = x1 - x0, bh = y1 - y0, f = (v) => +v.toFixed(3);
  const s = Math.min((0.86 * G) / bw, (0.86 * G) / bh), tx = 2 + G / 2 - (x0 + bw / 2) * s, ty = 2 + G / 2 - (y0 + bh / 2) * s;
  const d = L.steps.slice(0, upto).map((st) => st.d).join(' ');
  const lines = [];
  for (let i = 1; i < cells; i++) lines.push(`<line x1="${f(2 + i * cell)}" y1="2" x2="${f(2 + i * cell)}" y2="${2 + G}"/>`, `<line x1="2" y1="${f(2 + i * cell)}" x2="${2 + G}" y2="${f(2 + i * cell)}"/>`);
  const drawing = ink ? `<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(s)})"><path d="${d}" fill="${ink}"${key ? ' data-lcs-key-sample="1"' : ' data-lcs-art-ink="1"'}/></g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${G + 4}" height="${G + 4}" viewBox="0 0 ${G + 4} ${G + 4}" data-lcs-prim="${prim}" data-lcs-cells="${cells}" style="display:block;flex:0 0 auto">` +
    `<rect x="2" y="2" width="${G}" height="${G}" rx="10" fill="${T.white}" stroke="${T.teal}" stroke-width="2"/><g stroke="${T.grid}" stroke-width="1">${lines.join('')}</g>${drawing}</svg>`;
}

const LEVELS = {
  bigger: { 1: { n: 6, cell: 36, scale: 'cells' }, 2: { n: 6, cell: 36, scale: 'cells', dense: true }, 3: { n: 6, cell: 36, scale: 'blocks' } },
  turn: { 1: { n: 6, cell: 44, move: 'right' }, 2: { n: 6, cell: 44, move: 'left' }, 3: { n: 6, cell: 44, move: 'flip' } },
  art: { 1: { cells: 6, upto: 1 }, 2: { cells: 8, upto: 2 }, 3: { cells: 10, upto: 99 } },
};

function makeGridCopyMoreType({ id, slug, mode, gradeBand, i18n }) {
  return {
    id, slug, gradeBand, assetClass: 'geometry', exerciseType: 'grid-copy',
    themeAxis: { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords() { return []; },

    build({ difficulty }, ctx) {
      const lv = Number(difficulty) || 2, d = LEVELS[mode][lv], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
      if (mode === 'bigger') {
        let P = pool(d.n);
        if (d.dense) P = P.filter((f) => filledCount(f) >= 18);
        const fig = rng.pick(P), cells = cellsOf(fig);
        const big = d.scale === 'blocks' ? cells.flatMap(([c, r]) => [[2 * c, 2 * r], [2 * c + 1, 2 * r], [2 * c, 2 * r + 1], [2 * c + 1, 2 * r + 1]]) : cells;
        const model = grid({ n: d.n, cell: d.cell, given: cells, prim: 'grid-copy-model', attrs: { 'data-lcs-figure': fig.key, 'data-lcs-filled': cells.length } });
        const target = d.scale === 'blocks'
          ? grid({ n: 2 * d.n, cell: d.cell, answers: big, key, prim: 'grid-copy-target', attrs: { 'data-lcs-scale': 'blocks' } })
          : grid({ n: d.n, cell: 2 * d.cell, answers: big, key, prim: 'grid-copy-target', attrs: { 'data-lcs-scale': 'cells' } });
        return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px" data-lcs-gc-mode="bigger">${model}${target}</div>`, meta: { figure: fig.key } };
      }
      if (mode === 'turn') {
        const mv = MOVES[d.move];
        // two pictures, each changed by the level's move (a picture equal to its own moved copy is not offered)
        const P = pool(d.n).filter((f) => { const s = new Set(cellsOf(f).map(([c, r]) => c + ',' + r)); return !cellsOf(f).every(([c, r]) => s.has(mv(c, r, d.n).join(','))); });
        if (P.length < 2) throw new Error(`${id}: fewer than 2 pictures change under ${d.move}`);
        const picks = rng.sample(P, 2);
        const rows = picks.map((fig) => {
          const cells = cellsOf(fig), moved = cells.map(([c, r]) => mv(c, r, d.n));
          const model = grid({ n: d.n, cell: d.cell, given: cells, prim: 'grid-copy-model', attrs: { 'data-lcs-figure': fig.key, 'data-lcs-filled': cells.length } });
          const target = grid({ n: d.n, cell: d.cell, answers: moved, key, prim: 'grid-copy-target', attrs: { 'data-lcs-move': d.move } });
          return `<div class="ws-card" style="flex-direction:row;align-items:center;justify-content:center;gap:18px;padding:14px" data-lcs-copy="${fig.key}">${model}${moveSign(d.move)}${target}</div>`;
        });
        return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:14px" data-lcs-gc-mode="turn">${rows.join('')}</div>`, meta: { figures: picks.map((f) => f.key), move: d.move } };
      }
      // art: a drawing (its first `upto` steps) on a grid over its empty twin
      const entry = rng.pick(DRAW_HALF), L = lessonInk(entry.id), upto = Math.min(d.upto, L.steps.length);
      const extra = (ctx && ctx.chromeExtra) || 0, G = Math.min(320, Math.floor((700 - extra - 16) / 2) - 4);
      const model = artGrid({ L, upto, cells: d.cells, G, ink: T.ink, prim: 'grid-art-model' });
      const target = artGrid({ L, upto, cells: d.cells, G, ink: key ? T.coral : null, prim: 'grid-art-target', key });
      return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px" data-lcs-gc-mode="art" data-lcs-lesson="${entry.id}" data-lcs-upto="${upto}">${model}${target}</div>`, meta: { lesson: entry.id, upto } };
    },

    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        const set = (g, a) => new Set([...g.querySelectorAll(`[${a}]`)].map((e) => e.getAttribute(a)));
        if (mode === 'art') {
          const m = document.querySelector('[data-lcs-prim="grid-art-model"]'), t = document.querySelector('[data-lcs-prim="grid-art-target"]');
          if (!m || !t) return ['a grid is missing'];
          if (m.dataset.lcsCells !== t.dataset.lcsCells || m.getAttribute('width') !== t.getAttribute('width')) fails.push('the two grids differ');
          if (!m.querySelector('[data-lcs-art-ink]')) fails.push('no drawing on the model grid');
          if (t.querySelector('[data-lcs-art-ink]')) fails.push('the empty grid shows the drawing');
          return fails;
        }
        const pairs = mode === 'turn' ? [...document.querySelectorAll('[data-lcs-copy]')].map((r) => [r.querySelector('[data-lcs-prim="grid-copy-model"]'), r.querySelector('[data-lcs-prim="grid-copy-target"]')])
          : [[document.querySelector('[data-lcs-prim="grid-copy-model"]'), document.querySelector('[data-lcs-prim="grid-copy-target"]')]];
        pairs.forEach(([m, t], i) => {
          if (!m || !t) { fails.push(`row ${i + 1}: a grid is missing`); return; }
          const n = +m.dataset.lcsCols, given = [...set(m, 'data-lcs-given')].map((s) => s.split(',').map(Number)), ans = set(t, 'data-lcs-answer-cell');
          let want;
          if (mode === 'bigger') {
            const blocks = t.dataset.lcsScale === 'blocks';
            if (blocks ? +t.dataset.lcsCols !== 2 * n || t.dataset.lcsCell !== m.dataset.lcsCell : +t.dataset.lcsCols !== n || +t.dataset.lcsCell !== 2 * +m.dataset.lcsCell) fails.push('the big grid is not twice the small one');
            want = blocks ? given.flatMap(([c, r]) => [[2 * c, 2 * r], [2 * c + 1, 2 * r], [2 * c, 2 * r + 1], [2 * c + 1, 2 * r + 1]]) : given;
          } else {
            const mv = t.dataset.lcsMove;
            const f = { right: (c, r) => [n - 1 - r, c], left: (c, r) => [r, n - 1 - c], flip: (c, r) => [n - 1 - c, r] }[mv];
            if (!f) { fails.push(`row ${i + 1}: no move`); return; }
            want = given.map(([c, r]) => f(c, r));
            const gs = new Set(given.map((x) => x.join(',')));
            if (want.every((x) => gs.has(x.join(',')))) fails.push(`row ${i + 1}: the picture looks the same after the move`);
          }
          const w = new Set(want.map((x) => x.join(',')));
          if (w.size !== ans.size || [...w].some((x) => !ans.has(x))) fails.push(`row ${i + 1}: the squares to colour are not the moved picture`);
          for (const r of t.querySelectorAll('rect')) { const fl = (r.getAttribute('fill') || '').toUpperCase(); if (fl && fl !== 'NONE' && fl !== '#FFFFFF' && !r.hasAttribute('data-lcs-key-sample')) fails.push(`row ${i + 1}: the empty grid shows a coloured square`); }
          if (+m.dataset.lcsCell < 36) fails.push(`row ${i + 1}: squares of ${m.dataset.lcsCell} px`);
        });
        const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        document.querySelectorAll('svg[data-lcs-prim]').forEach((s) => { const b = s.getBoundingClientRect(); if (b.right > pg.right + 1 || b.bottom > pg.bottom + 1) fails.push('a grid leaves the page'); });
        return fails;
      }, mode);
    },
  };
}
module.exports = { makeGridCopyMoreType, MOVES };
