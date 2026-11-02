/**
 * Picture pieces (the Same & Different maker, 2026-11-02; the cores of the old grid-match and missing-pieces apps):
 *   missing  K-469 Find the Missing Piece — a picture cut into a grid with a piece (level 3: two pieces) taken out;
 *            beside it pieces of the SAME picture, the right one among them. Level 1 a 2 × 2 grid, level 2 3 × 3 (one
 *            piece, circle it), level 3 3 × 3 with two pieces numbered 1 and 2 (draw a line from each piece to its place).
 *   puzzle   K-470 Picture Puzzle — the picture cut into 2 × 2 / 3 × 3 / 4 × 4 pieces to cut out and glue back on the
 *            empty grid, a small picture of the whole beside it (cut and glue: classroom material).
 *   (A "match the close-up" template was built and withdrawn the same day: a detail's colours and shapes recur across a
 *   theme — a red sail and a red-and-white ship, a green leaf and three leafy fruits — and the browser-safe data (24 × 24
 *   masks, 8 × 8 colour signatures) cannot prove one right answer; refused rather than shipped ambiguous.)
 * One right answer, by construction:
 *   - only pictures whose drawing fills its box (art extents ≥ 75 % both ways), so the pieces are pieces of the drawing;
 *   - a missing piece and every piece offered with it hold at least a quarter ink, and no two offered pieces have the
 *     same shape (24 × 24 masks, lib/picture-masks.js: a blank corner or two equal patches of fur would be two answers).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { artExtentSync } = require('../../image-cache/silhouette.js');
const PM = require('../../lib/picture-masks.js');
const slot = require('../../lib/slot.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const TEAL = tokens.color.teal, CORAL = tokens.color.coral, GRID = tokens.color.grid, INK = tokens.color.ink;
const N = 24;

/** the pictures that can be cut: their drawing fills the box both ways */
function cuttable(theme) {
  return labelSafeNouns(theme).filter((n) => {
    if (!PM.has(theme, n.noun)) return false;
    let e; try { e = artExtentSync(theme, n.noun); } catch (x) { return false; }
    return e.widthFrac >= 0.75 && e.heightFrac >= 0.75;
  });
}
/** a tile of an n × n grid over the 24 × 24 box mask: its cells, and how much of it is ink */
function tileMask(m, n, tx, ty) {
  const a = Math.round((tx * N) / n), b = Math.round(((tx + 1) * N) / n), c = Math.round((ty * N) / n), d = Math.round(((ty + 1) * N) / n);
  const out = [];
  for (let y = c; y < d; y++) for (let x = a; x < b; x++) out.push(m[y * N + x]);
  return out;
}
const inkOf = (cells) => cells.reduce((s, v) => s + v, 0) / cells.length;
const sameTile = (a, b) => PM.iou(a, b) >= 0.75 || (inkOf(a) > 0.92 && inkOf(b) > 0.92);   // two solid patches look alike

/** one tile of the picture as an image crop (T px square) */
function tileView(theme, noun, n, tx, ty, T, attrs = '') {
  return `<span style="display:block;position:relative;width:${T}px;height:${T}px;overflow:hidden;flex:0 0 auto"${attrs}>` +
    `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="position:absolute;left:${-tx * T}px;top:${-ty * T}px;width:${n * T}px;height:${n * T}px;max-width:none;display:block"></span>`;
}

const LEVELS = {
  missing: { 1: { n: 2, gaps: 1, opts: 3, T: 104 }, 2: { n: 3, gaps: 1, opts: 3, T: 84 }, 3: { n: 3, gaps: 2, opts: 4, T: 84 } },
  puzzle: { 1: { n: 2, T: 124 }, 2: { n: 3, T: 96 }, 3: { n: 4, T: 76 } },
};

function makePicturePiecesType({ id, slug, mode, gradeBand, i18n }) {
  return {
    id, slug, gradeBand, assetClass: 'icon-placement', exerciseType: 'visual-matching',
    themeAxis: { applicable: true, minNouns: 4, excludeBw: true },
    difficulty: LEVELS[mode],
    i18n,

    build({ theme, difficulty }, ctx) {
      const lv = Number(difficulty) || 2, d = LEVELS[mode][lv], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
      const pool = cuttable(theme);

      if (mode === 'missing') {
        // two puzzles a page: a picture each (one slot role, two pictures) and its gaps + offered pieces
        const tiles = []; for (let ty = 0; ty < d.n; ty++) for (let tx = 0; tx < d.n; tx++) tiles.push([tx, ty]);
        const plan = (noun) => {
          const m = PM.maskA(theme, noun), info = tiles.map(([tx, ty]) => ({ tx, ty, cells: tileMask(m, d.n, tx, ty) }));
          for (let t = 0; t < 12; t++) {
            const gaps = rng.sample(info.filter((x) => inkOf(x.cells) >= 0.3), d.gaps);
            if (gaps.length < d.gaps) return null;
            if (d.gaps === 2 && sameTile(gaps[0].cells, gaps[1].cells)) continue;
            const others = rng.shuffle(info.filter((x) => !gaps.includes(x) && inkOf(x.cells) >= 0.25 && gaps.every((g) => !sameTile(x.cells, g.cells))));
            const picked = [];
            for (const o of others) { if (picked.every((p) => !sameTile(p.cells, o.cells))) picked.push(o); if (picked.length === d.opts - d.gaps) break; }
            if (picked.length === d.opts - d.gaps) return { gaps, opts: rng.shuffle([...gaps, ...picked]) };
          }
          return null;
        };
        const usable = pool.filter((n) => !!plan(n.noun));
        if (usable.length < 2) throw new Error(`${id}: theme ${theme} has ${usable.length} pictures to cut into ${d.n} × ${d.n} pieces`);
        const pics = slot.pictures(ctx, rng.sample(usable, 2), usable, theme, 'picture');
        const cards = pics.map((p, k) => {
          const pl = plan(p.noun) || plan(p.noun);
          if (!pl) throw new Error(`${id}: ${theme}/${p.noun} cannot be cut into ${d.n} × ${d.n} pieces`);
          const gapNo = new Map(pl.gaps.map((g, i) => [g, k * d.gaps + i + 1]));   // numbered across the page: a key badge prints its id
          const grid = tiles.map(([tx, ty]) => {
            const g = pl.gaps.find((x) => x.tx === tx && x.ty === ty);
            const pos = `position:absolute;left:${tx * d.T}px;top:${ty * d.T}px`;
            if (!g) return `<span style="${pos}">${tileView(theme, p.noun, d.n, tx, ty, d.T)}</span>`;
            const no = gapNo.get(g);
            const pair = d.gaps > 1 ? ` data-lcs-pair="${no}"` : '';
            return `<span style="${pos};width:${d.T}px;height:${d.T}px;box-sizing:border-box;border:3px dashed ${CORAL};background:#FFFFFF;display:flex;align-items:center;justify-content:center" data-lcs-gap="${tx},${ty}"${pair}>` +
              (key ? tileView(theme, p.noun, d.n, tx, ty, d.T - 6, ' data-lcs-key-sample="1"') : d.gaps > 1 ? `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:${CORAL}">${no}</span>` : '') + `</span>`;
          }).join('');
          const opts = pl.opts.map((o) => {
            const g = pl.gaps.includes(o) ? gapNo.get(o) : 0;
            const mark = g ? (d.gaps > 1 ? ` data-lcs-key-badge="${g}"` : ' data-lcs-correct="1"') : '';
            return `<span class="ws-pattern-chip" style="width:${d.T + 14}px;height:${d.T + 14}px;border-radius:12px" data-lcs-piece="${o.tx},${o.ty}"${mark}>${tileView(theme, p.noun, d.n, o.tx, o.ty, d.T)}</span>`;
          }).join('');
          const optCols = d.opts > 3 ? 2 : d.opts;
          return `<div class="ws-card-stage" style="justify-content:space-around;gap:16px;padding:8px 14px" data-lcs-missing="${p.noun}">` +
            `<div style="position:relative;flex:0 0 auto;width:${d.n * d.T}px;height:${d.n * d.T}px;border:2px solid ${TEAL};box-sizing:content-box"${slot.attr(ctx, 'picture', k)}>${grid}</div>` +
            `<div style="display:grid;grid-template-columns:repeat(${optCols},auto);gap:12px;flex:0 0 auto" data-lcs-pieces>${opts}</div></div>`;
        });
        return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;min-height:0">${cardGrid({ cards, cols: 1, rows: 2 })}</div>`,
          meta: { pictures: pics.map((p) => p.noun) } };
      }

      if (mode === 'puzzle') {
        const p = slot.pictures(ctx, [rng.pick(pool)], pool, theme, 'picture')[0];
        if (!p) throw new Error(`${id}: theme ${theme} has no picture to cut`);
        const tiles = []; for (let ty = 0; ty < d.n; ty++) for (let tx = 0; tx < d.n; tx++) tiles.push([tx, ty]);
        // the pieces in an order where no piece stands in its own place (a derangement)
        let order; do order = rng.shuffle(tiles.map((_, i) => i)); while (order.some((v, i) => v === i));
        const W = d.n * d.T;
        const lines = []; for (let i = 1; i < d.n; i++) lines.push(`<line x1="${i * d.T}" y1="0" x2="${i * d.T}" y2="${W}"/><line x1="0" y1="${i * d.T}" x2="${W}" y2="${i * d.T}"/>`);
        const board = `<div style="position:relative;width:${W}px;height:${W}px;border:2px solid ${TEAL};background:#FFFFFF;flex:0 0 auto" data-lcs-board="${d.n}"${slot.attr(ctx, 'picture', 0)}>` +
          (key ? tiles.map(([tx, ty]) => `<span style="position:absolute;left:${tx * d.T}px;top:${ty * d.T}px">${tileView(theme, p.noun, d.n, tx, ty, d.T, ' data-lcs-key-sample="1"')}</span>`).join('') : '') +
          `<svg width="${W}" height="${W}" style="position:absolute;left:0;top:0" stroke="${GRID}" stroke-width="1.5" stroke-dasharray="${key ? '0' : '6 5'}">${lines.join('')}</svg></div>`;
        const ref = `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto" data-lcs-whole><span style="width:132px;height:132px;border:2px solid ${GRID};border-radius:12px;background:#FFFFFF;display:flex;align-items:center;justify-content:center"><img class="ws-icon" src="${fileUri(theme, p.noun)}" alt="" style="width:120px;height:120px"></span></div>`;
        const pieces = order.map((i) => `<span style="box-sizing:border-box;border:2px dashed ${INK};background:#FFFFFF;line-height:0" data-lcs-cutout="${tiles[i][0]},${tiles[i][1]}">${tileView(theme, p.noun, d.n, tiles[i][0], tiles[i][1], d.T)}</span>`).join('');
        return {
          bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;gap:18px;min-height:0" data-lcs-puzzle="${d.n}">` +
            `<div style="display:flex;align-items:center;justify-content:center;gap:34px">${ref}${board}</div>` +
            (key ? '' : `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0;max-width:640px;border-top:2px dashed ${GRID};padding-top:14px" data-lcs-cutouts>${pieces}</div>`) + `</div>`,
          meta: { picture: p.noun },
        };
      }

      throw new Error(`${id}: unknown mode ${mode}`);
    },

    async verify(page) {
      return page.evaluate((m) => {
        const fails = [];
        if (m === 'missing') {
          const cards = [...document.querySelectorAll('[data-lcs-missing]')];
          if (cards.length !== 2) fails.push(`${cards.length} puzzles`);
          cards.forEach((c, i) => {
            const gaps = [...c.querySelectorAll('[data-lcs-gap]')].map((g) => g.dataset.lcsGap);
            const pieces = [...c.querySelectorAll('[data-lcs-piece]')];
            const right = pieces.filter((p) => p.hasAttribute('data-lcs-correct') || p.hasAttribute('data-lcs-key-badge')).map((p) => p.dataset.lcsPiece);
            if (!gaps.length) fails.push(`puzzle ${i + 1}: no gap`);
            if (right.sort().join('|') !== gaps.slice().sort().join('|')) fails.push(`puzzle ${i + 1}: the right pieces (${right}) are not the gaps (${gaps})`);
            if (new Set(pieces.map((p) => p.dataset.lcsPiece)).size !== pieces.length) fails.push(`puzzle ${i + 1}: a piece offered twice`);
          });
        } else {
          const n = +document.querySelector('[data-lcs-puzzle]').dataset.lcsPuzzle;
          const cut = [...document.querySelectorAll('[data-lcs-cutout]')].map((c) => c.dataset.lcsCutout);
          if (cut.length && (cut.length !== n * n || new Set(cut).size !== n * n)) fails.push(`${cut.length} pieces for a ${n} × ${n} grid`);
        }
        return fails;
      }, mode);
    },
  };
}

module.exports = { makePicturePiecesType, LEVELS, cuttable };
