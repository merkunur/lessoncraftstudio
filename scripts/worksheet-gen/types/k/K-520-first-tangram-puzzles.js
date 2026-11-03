/**
 * K-520 — First Tangram Puzzles (Tangram maker 2026-11-02, NEW-TEMPLATES §36 T2; K.G.B.6): before the seven-piece shadows,
 * small figures made of two or three pieces. Each row: the figure on the left, its own pieces on the right to cut out
 * (dashed cut lines, each piece in the plain pose of the colour legend — never already turned the way the figure needs
 * it), the same scale as the figure, so the cut pieces lie exactly on it.
 * The figures are the bank's MINIS (data/b4/tangram-figures.js): the lattice tiler proved each one's tiling by its listed
 * pieces UNIQUE (FIG.mini refuses otherwise) — so one way to lay them, and the key draws it. Each figure is drawn under a
 * lattice transform that fits the row (the pieces are cut, so turning the figure changes nothing else).
 * Levels: 1 two figures of two pieces, the lines between the pieces shown (the child lays each piece on its own place)
 * · 2 three figures of two or three pieces, the outline only · 3 three figures of three pieces, a solid shadow.
 */
'use strict';
const TG = require('../../primitives/tangram.js');
const { TANGRAM_FIGURES: FIG } = require('../../data/b4/tangram-figures.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { rows: 2, S: 230, pieces: [2], mode: 'solution' },
  2: { rows: 3, S: 190, pieces: [2, 3], mode: 'outline' },
  3: { rows: 3, S: 190, pieces: [3], mode: 'silhouette' },
};
const ORDER = { L: 0, M: 1, S: 2, Q: 3, P: 4 };

/** one piece to cut out: its plain pose at the figure's scale, a dashed cut line round a cream piece */
function cutPiece(cls, S) {
  const sp = 3, pts = TG.canonicalPose(cls, S).map(([x, y]) => [x + sp, y + sp]);
  const w = Math.ceil(Math.max(...pts.map((p) => p[0])) + sp), h = Math.ceil(Math.max(...pts.map((p) => p[1])) + sp);
  return { w, h, html: `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" data-lcs-cut-piece="${cls}" style="display:block;flex:0 0 auto">` +
    `<polygon points="${pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" fill="${T.cream}" stroke="${T.inkSoft}" stroke-width="2" stroke-dasharray="7 5" stroke-linejoin="round"/></svg>` };
}

module.exports = {
  id: 'K-520',
  slug: 'first-tangram-puzzles',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'tangram',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'First Tangram Puzzles', instruction: 'Cut out the pieces beside each figure. Lay them on the figure so that they cover it exactly.' } },

  build({ difficulty }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rowH = Math.floor((716 - extra - (d.rows - 1) * 14) / d.rows), figMax = { w: 300, h: rowH - 16 };
    const pool = Object.keys(FIG.MINIS).filter((k) => { try { return d.pieces.includes(FIG.mini(k).tans.length); } catch (e) { return false; } });
    const keys = rng.sample(pool, d.rows);
    if (keys.length < d.rows) throw new Error(`K-520: only ${keys.length} figures of ${d.pieces.join('/')} pieces`);
    const rows = keys.map((k, i) => {
      const m = FIG.mini(k);
      const classes = m.tans.map((x) => TG.clsOf(x.id)).sort((a, b) => ORDER[a] - ORDER[b]);
      // the row's scale: the level's, made smaller (never under the K floor) until the figure and its pieces both fit the
      // row — the pieces stacked when their height allows, else side by side
      let S = d.S, lay = null;
      for (; S >= 160 && !lay; S -= 10) {
        const fits = TG.TRANSFORM_NAMES.filter((t) => { const q = TG.placeTans(TG.transformTiling(m.tans, t), S, { pad: 2.5 }); return q.w <= figMax.w && q.h <= figMax.h; });
        if (!fits.length) continue;
        const pieces = classes.map((c) => cutPiece(c, S));
        const stackH = pieces.reduce((sum, q) => sum + q.h, 0) + (pieces.length - 1) * 10, sideW = pieces.reduce((sum, q) => sum + q.w, 0) + (pieces.length - 1) * 10;
        const rest = pieces.slice(1), twoH = pieces[0].h + 10 + Math.max(0, ...rest.map((q) => q.h)), twoW = Math.max(pieces[0].w, rest.reduce((sum, q) => sum + q.w, 0) + (rest.length - 1) * 10);
        const room = rowH - 16;
        const how = stackH <= room && Math.max(...pieces.map((q) => q.w)) <= 300 ? 'stack'
          : rest.length && twoH <= room && twoW <= 300 ? 'two-rows'
          : sideW <= 300 && Math.max(...pieces.map((q) => q.h)) <= room ? 'side' : null;
        if (how) lay = { S, fits, pieces, how };
      }
      if (!lay) throw new Error(`K-520: ${k} and its pieces fit no row`);
      const t = rng.pick(lay.fits), tans = TG.transformTiling(m.tans, t);
      // the key draws the figure with its pieces (the solution); the page as the level says
      const fig = TG.tangramFigure({ figure: k, tans, S: lay.S, mode: key ? 'solution' : d.mode, transform: t, data: { 'data-lcs-mini': k, ...(key ? { 'data-lcs-key-sample': '1' } : {}) } });
      const inner = lay.how === 'two-rows' ? `${lay.pieces[0].html}<div style="display:flex;align-items:center;gap:10px">${lay.pieces.slice(1).map((q) => q.html).join('')}</div>` : lay.pieces.map((q) => q.html).join('');
      const piecesHtml = `<div data-lcs-pieces="${classes.join('')}" style="display:flex;flex-direction:${lay.how === 'side' ? 'row' : 'column'};align-items:center;justify-content:center;gap:10px;flex:0 0 auto;width:300px">${inner}</div>`;
      return `<div class="ws-card" data-lcs-first-row="${i + 1}" style="width:675px;height:${rowH}px;flex:0 0 auto;flex-direction:row;align-items:center;justify-content:space-evenly;padding:8px;background:#FFFFFF">` +
        `<div style="display:flex;align-items:center;justify-content:center;width:310px">${fig.html}</div>` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" data-lcs-scissors="1" aria-hidden="true" style="flex:0 0 auto"><path d="M5 5L22 16M5 21L22 10" stroke="${T.inkSoft}" stroke-width="2.2" stroke-linecap="round"/><circle cx="4.5" cy="4.5" r="3.4" fill="none" stroke="${T.inkSoft}" stroke-width="2"/><circle cx="4.5" cy="21.5" r="3.4" fill="none" stroke="${T.inkSoft}" stroke-width="2"/></svg>` +
        `${piecesHtml}</div>`;
    });
    const body = `<div data-ws-content data-lcs-first-tangram="${difficulty}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px;min-height:0">${rows.join('')}</div>`;
    return { bodyHtml: body, meta: { figures: keys } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-first-row]')];
      if (rows.length < 2) fails.push(`${rows.length} figures`);
      const AREA = { L: 0.25, M: 0.125, S: 0.0625, Q: 0.125, P: 0.125 };
      const seen = new Set();
      rows.forEach((r, i) => {
        const fig = r.querySelector('[data-lcs-prim="tangram"]'), pcs = r.querySelector('[data-lcs-pieces]');
        if (!fig || !pcs) { fails.push(`row ${i + 1}: no figure or no pieces`); return; }
        const k = fig.dataset.lcsMini; if (seen.has(k)) fails.push(`row ${i + 1}: ${k} twice`); seen.add(k);
        const cls = pcs.dataset.lcsPieces.split('');
        const cut = [...pcs.querySelectorAll('[data-lcs-cut-piece]')].map((x) => x.dataset.lcsCutPiece);
        if (cut.join('') !== cls.join('')) fails.push(`row ${i + 1}: the pieces drawn are not the figure's`);
        if (cls.length < 2 || cls.length > 3) fails.push(`row ${i + 1}: ${cls.length} pieces`);
        // the pieces are drawn at the figure's scale: their areas add up to the figure's (px², 3 % tolerance for strokes)
        const S = +fig.dataset.lcsScale, want = cls.reduce((s, c) => s + AREA[c], 0) * S * S;
        const polyArea = (pts) => Math.abs(pts.reduce((s, [x, y], j) => { const [x2, y2] = pts[(j + 1) % pts.length]; return s + x * y2 - x2 * y; }, 0)) / 2;
        const got = [...pcs.querySelectorAll('polygon')].reduce((s, pg) => s + polyArea(pg.getAttribute('points').split(' ').map((q) => q.split(',').map(Number))), 0);
        if (Math.abs(got - want) > 0.03 * want) fails.push(`row ${i + 1}: the pieces cover ${Math.round(got)} px², the figure ${Math.round(want)}`);
        const R = r.getBoundingClientRect();
        [fig, pcs].forEach((x) => { const q = x.getBoundingClientRect(); if (q.left < R.left - 1 || q.right > R.right + 1 || q.top < R.top - 1 || q.bottom > R.bottom + 1) fails.push(`row ${i + 1}: something leaves its row`); });
      });
      return fails;
    });
  },
};
