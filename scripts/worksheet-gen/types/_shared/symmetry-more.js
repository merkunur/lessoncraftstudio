/**
 * More symmetry templates (the Symmetry & Grid Copy maker, 2026-11-02):
 *   two-axis  G2-479 Symmetry with Two Mirror Lines — a grid with a vertical AND a horizontal mirror line through its
 *             middle; the top-left quarter of a picture is coloured, the child colours the other three quarters so the
 *             picture is the same on both sides of each line (data/symmetry/two-axis.js: hand-drawn quarters, exact by
 *             construction). Level 1 two 8 × 8 pictures, level 2 four 10 × 10, level 3 four 12 × 12.
 *   draw-half G1-484 Draw the Other Half — a real drawing from the library (a how-to-draw lesson's line art, data/symmetry/
 *             draw-half.js: front-facing pictures whose left half mirrored is the whole) on a square grid; only its left
 *             half is printed, the child draws the right half square by square. The mirror line is the grid's middle
 *             line, so every square has its twin. Level 1 large parts on a 6 × 6 grid, level 2 8 × 8, level 3 10 × 10 with
 *             small details. The answer key draws the mirrored half in coral (the left half mirrored exactly).
 * Both are drawing tasks (screen verdict: writing) and language-free on the page.
 */
'use strict';
const path = require('path');
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, line } = require('../../primitives/_svg.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { QUARTERS, wholeOf } = require('../../data/symmetry/two-axis.js');
const { DRAW_HALF } = require('../../data/symmetry/draw-half.js');
const platform = require('../../lib/platform/index.js');   // file reads go through the platform (the makers bundle this module)

const TWO_AXIS = {
  1: { set: 'q4', cards: 2, cols: 1, rows: 2, cell: 38 },
  2: { set: 'q5', cards: 4, cols: 2, rows: 2, cell: 28 },
  3: { set: 'q6', cards: 4, cols: 2, rows: 2, cell: 24 },
};
const DRAW = { 1: { level: 1, cells: 6 }, 2: { level: 2, cells: 8 }, 3: { level: 3, cells: 10 } };
const GRID_PX = 600;   // the draw-half grid: one picture fills the page's width (632 px with its card)

/** a two-line grid: the top-left quarter given (teal), the other three quarters the answers (coral on the key) */
function twoAxisGrid(q, cell, key) {
  const rows = wholeOf(q), n = rows.length, m = n / 2, w = n * cell, T = tokens.color;
  const parts = [];
  for (let i = 0; i <= n; i++) {
    parts.push(line({ x1: 0, y1: i * cell, x2: w, y2: i * cell, strokeColor: T.grid, strokeWidth: 1, cap: 'butt' }));
    parts.push(line({ x1: i * cell, y1: 0, x2: i * cell, y2: w, strokeColor: T.grid, strokeWidth: 1, cap: 'butt' }));
  }
  let answers = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (rows[r][c] !== '#') continue;
    const box = { x: c * cell + 1, y: r * cell + 1, width: cell - 2, height: cell - 2 };
    if (r < m && c < m) parts.push(el('rect', { ...box, fill: T.teal, 'data-lcs-given': `${c},${r}` }));
    else { answers++; parts.push(el('rect', { ...box, fill: key ? T.coral : 'none', 'data-lcs-answer-cell': `${c},${r}`, ...(key ? { 'data-lcs-key-sample': '1' } : {}) })); }
  }
  // the two mirror lines on the grid's middle lines, coral dashed (as the one-line pages)
  parts.push(line({ x1: m * cell, y1: -4, x2: m * cell, y2: w + 4, strokeColor: T.coral, strokeWidth: 3, dash: '8 6', data: { 'data-lcs-mirror': 'v' } }));
  parts.push(line({ x1: -4, y1: m * cell, x2: w + 4, y2: m * cell, strokeColor: T.coral, strokeWidth: 3, dash: '8 6', data: { 'data-lcs-mirror': 'h' } }));
  return svgRoot({ width: w + 8, height: w + 8, viewBox: `-4 -4 ${w + 8} ${w + 8}`, label: `two mirror lines: ${q.key}` }, parts.join(''),
    { 'data-lcs-prim': 'sym2-grid', 'data-lcs-figure': q.key, 'data-lcs-cols': n, 'data-lcs-cell': cell, 'data-lcs-answer-count': answers });
}

/** a lesson's ink (how-to-draw: the drawing's own lines as filled shapes) */
function lessonInk(id) {
  const [dir, name] = id.split('/');
  return platform.readJson(path.join(__dirname, '..', '..', 'data', dir, name + '.json'));
}

/** the draw-half grid: the drawing's left half on a cells × cells grid, its mirror line the grid's middle line */
function drawHalfGrid(entry, cells, key) {
  const L = lessonInk(entry.id), [x0, y0, , y1] = L.bbox, a = entry.axis, half = a - x0, bh = y1 - y0;
  const G = GRID_PX, cell = G / cells, T = tokens.color;
  const s = Math.min((0.88 * G) / (2 * half), (0.88 * G) / bh);
  const tx = 2 + G / 2 - a * s, ty = 2 + G / 2 - (y0 + bh / 2) * s, f = (v) => +v.toFixed(3);
  const clip = `dh-${key ? 'k' : 'p'}`;
  const lines = [];
  for (let i = 1; i < cells; i++) {
    lines.push(`<line x1="${f(2 + i * cell)}" y1="2" x2="${f(2 + i * cell)}" y2="${2 + G}"/>`, `<line x1="2" y1="${f(2 + i * cell)}" x2="${2 + G}" y2="${f(2 + i * cell)}"/>`);
  }
  const ink = `<path d="${L.full}" fill="${T.ink}" clip-path="url(#${clip})" data-lcs-half="given"/>`;
  const mirror = key ? `<g transform="translate(${2 * a} 0) scale(-1 1)"><path d="${L.full}" fill="${T.coral}" clip-path="url(#${clip})" data-lcs-key-sample="1"/></g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${G + 4}" height="${G + 4}" viewBox="0 0 ${G + 4} ${G + 4}" role="img" aria-label="half a drawing to finish" ` +
    `data-lcs-prim="draw-half" data-lcs-lesson="${entry.id}" data-lcs-cells="${cells}" data-lcs-grid="${G}" data-lcs-axis="${a}" style="display:block;flex:0 0 auto">` +
    `<defs><clipPath id="${clip}"><rect x="-9999" y="-9999" width="${a + 9999}" height="99999"/></clipPath></defs>` +
    `<rect x="2" y="2" width="${G}" height="${G}" rx="10" fill="${T.white}" stroke="${T.teal}" stroke-width="2"/>` +
    `<g stroke="${T.grid}" stroke-width="1">${lines.join('')}</g>` +
    `<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(s)})">${ink}${mirror}</g>` +
    `<line x1="${2 + G / 2}" y1="-2" x2="${2 + G / 2}" y2="${G + 6}" stroke="${T.coral}" stroke-width="3" stroke-dasharray="10 7" data-lcs-mirror="v"/></svg>`;
}

function makeSymmetryMoreType({ id, slug, mode, gradeBand, i18n }) {
  const two = mode === 'two-axis';
  return {
    id, slug, gradeBand, assetClass: 'geometry', exerciseType: 'symmetry',
    themeAxis: { applicable: false },
    difficulty: two ? TWO_AXIS : DRAW,
    i18n,
    levelSetWords() { return []; },

    build({ difficulty }, ctx) {
      const lv = Number(difficulty) || 2, rng = ctx.rng, key = !!(ctx && ctx.answerKey);
      if (two) {
        const d = TWO_AXIS[lv], picks = rng.sample(QUARTERS[d.set], d.cards);
        const cards = picks.map((q) => `<div class="ws-card-stage" style="justify-content:center">${twoAxisGrid(q, d.cell, key)}</div>`);
        return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;min-height:0" data-lcs-two-axis="${lv}">${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
          meta: { figures: picks.map((q) => q.key) } };
      }
      const d = DRAW[lv], pool = DRAW_HALF.filter((e) => e.level === d.level);
      const entry = rng.pick(pool);
      return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center;min-height:0" data-lcs-draw-half="${lv}">` +
          `<div class="ws-card" style="align-items:center;justify-content:center;padding:14px">${drawHalfGrid(entry, d.cells, key)}</div></div>`,
        meta: { lesson: entry.id } };
    },

    async verify(page) {
      return page.evaluate((isTwo) => {
        const fails = [];
        if (isTwo) {
          const grids = [...document.querySelectorAll('[data-lcs-prim="sym2-grid"]')];
          if (grids.length < 2) fails.push(`${grids.length} grids`);
          if (new Set(grids.map((g) => g.dataset.lcsFigure)).size !== grids.length) fails.push('a picture twice');
          grids.forEach((g, i) => {
            const n = +g.dataset.lcsCols, m = n / 2, cell = +g.dataset.lcsCell;
            if (n % 2) fails.push(`grid ${i + 1}: odd size`);
            const given = new Set([...g.querySelectorAll('[data-lcs-given]')].map((e) => e.dataset.lcsGiven));
            const ans = new Set([...g.querySelectorAll('[data-lcs-answer-cell]')].map((e) => e.dataset.lcsAnswerCell));
            if (ans.size !== +g.dataset.lcsAnswerCount || ans.size < 12) fails.push(`grid ${i + 1}: ${ans.size} squares to colour`);
            given.forEach((s) => { const [c, r] = s.split(',').map(Number); if (c >= m || r >= m) fails.push(`grid ${i + 1}: a given square outside the top-left quarter`); });
            // every coloured square of the whole picture has its three mirror twins, and its top-left twin is given
            const all = new Set([...given, ...ans]);
            all.forEach((s) => {
              const [c, r] = s.split(',').map(Number);
              for (const t of [`${n - 1 - c},${r}`, `${c},${n - 1 - r}`, `${n - 1 - c},${n - 1 - r}`]) if (!all.has(t)) fails.push(`grid ${i + 1}: ${s} has no mirror twin ${t}`);
              if (!given.has(`${Math.min(c, n - 1 - c)},${Math.min(r, n - 1 - r)}`)) fails.push(`grid ${i + 1}: ${s} has no given twin`);
            });
            const v = g.querySelector('[data-lcs-mirror="v"]'), h = g.querySelector('[data-lcs-mirror="h"]');
            if (!v || !h) fails.push(`grid ${i + 1}: a mirror line is missing`);
            else if (Math.abs(+v.getAttribute('x1') - m * cell) > 0.5 || Math.abs(+h.getAttribute('y1') - m * cell) > 0.5) fails.push(`grid ${i + 1}: a mirror line is not on the middle line`);
          });
        } else {
          const g = document.querySelector('[data-lcs-prim="draw-half"]');
          if (!g) return ['no grid'];
          const n = +g.dataset.lcsCells, G = +g.dataset.lcsGrid;
          if (n % 2) fails.push('odd number of squares: the mirror line cannot be a grid line');
          const ml = g.querySelector('[data-lcs-mirror]');
          if (!ml || Math.abs(+ml.getAttribute('x1') - (2 + G / 2)) > 0.5) fails.push('the mirror line is not the middle grid line');
          // the printed half is clipped at the drawing's own axis (a bounding box ignores the clip, so the clip is read), and
          // the drawing fills most of the grid's height
          const half = g.querySelector('[data-lcs-half="given"]'), id = (half.getAttribute('clip-path') || '').replace(/^url\(#|\)$/g, '');
          const cr = id && g.querySelector(`clipPath[id="${id}"] rect`);
          if (!cr || Math.abs(+cr.getAttribute('x') + +cr.getAttribute('width') - +g.dataset.lcsAxis) > 0.01) fails.push('the printed half is not cut at the mirror line');
          const box = half.getBoundingClientRect(), gb = g.getBoundingClientRect();
          if (box.height < gb.height * 0.6) fails.push(`the drawing is small: ${Math.round(box.height)} of ${Math.round(gb.height)} px`);
        }
        return fails;
      }, two);
    },
  };
}

module.exports = { makeSymmetryMoreType, TWO_AXIS, DRAW };
