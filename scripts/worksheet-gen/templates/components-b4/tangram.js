/**
 * components-b4/tangram.js — the K-353 family's NEW components (design file
 * §2 "NEW templates/components-b4/tangram.js"). Merged into the components-b4
 * namespace by templates/components-b4.js; names are unique across every
 * family file (the barrel refuses a duplicate). Every drawing is the
 * primitives/tangram.js apparatus; nothing here prints a word.
 *
 *   templateBlock({ S, legend, Sg })
 *       [scissors strip 30: scissorsGlyph(26) at x 0] over
 *       [the 7-tan cut-out square in `template` mode (data-lcs-set)] [28]
 *       [tanLegend rows L M S Q P at Sg] — left-aligned, flex:0 0 auto.
 *       Returns {html, width, height}.
 *   figureRow({ figures, S, seams, gap })
 *       the stored figures centred in one row (gap 24): `seams:true` draws
 *       them in `solution` mode (cream tans, 2 px seams, 3 px outline),
 *       `seams:false` as solid teal `silhouette`s (the d3 shadow page).
 *       figures = [{key, tans, transform?}]. Returns {html, width, height}.
 *   composeCard({ mini, S, Sg })          (F1) glyph strip of tanGlyph(cls, Sg) in the fixed
 *                                          class order L M S Q P over the outline (WHITE fill)
 *   shadowCard({ figure, S })             (F2) one `silhouette` (the caller sets the card padding)
 *   missingCard({ figure, missing, S, chips, chipW, pad, chipPad })
 *                                          (F3) the figure in `hole` mode left (root pad `pad`,
 *                                          1.5 on the face so the 128-scale tree clears the 186 px
 *                                          zone), an `.ws-achip` column right: chips = [{cls, flip,
 *                                          correct}] drawn TRUE-SIZE by tanChip; box chipW x
 *                                          (svg h + chipPad, min 44) — the chip svg carries a 2 px
 *                                          pad each side, so chipPad 8 = the design's "glyph h + 12"
 *                                          on the GEOMETRIC height (M/Q 58, S/P 44 at S 128);
 *                                          data-lcs-chip / data-lcs-flip; data-lcs-correct only when
 *                                          the caller stamps it
 *   matchRow({ figure, S, candidates, box, gap })
 *                                          (F4) [cream box: the shadow][gap][white box x N: the
 *                                          solutions] (box 162 / gap 9 on the face: 4 x 162 + 3 x 9
 *                                          = 675); candidates = [{tans, t, correct}]
 *   countCard({ sub, S, boxW, boxH })     (F5) the sub-figure in `solution` mode over the answer
 *                                          row [tri glyph 22][6][answerBox 64x50][16][sq glyph
 *                                          22][6][answerBox 64x50] = 200; the glyphs are DRAWN
 *                                          polygons (never Unicode): the square glyph is
 *                                          axis-aligned while the figure's Q is tilted
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, esc } = require('../../primitives/_svg.js');
const { scissorsGlyph } = require('../components-b3.js');
const { answerBox } = require('../components.js');
const TG = require('../../primitives/tangram.js');

const T = tokens.color;
const STRIP_H = 30;
const LEGEND_GAP = 28;
const ROW_GAP = 24;

function templateBlock({ S, legend = true, Sg = 64, tans, data }) {
  if (!(S > 0)) throw new Error('templateBlock: bad scale ' + S);
  const set = TG.tangramFigure({ figure: 'square', tans, S, mode: 'template', data: { 'data-lcs-set': '1', ...(data || {}) } });
  const leg = legend ? tanLegendBlock(Sg) : '';
  const strip = `<div data-lcs-strip style="height:${STRIP_H}px;display:flex;align-items:center;flex:0 0 auto">${scissorsGlyph(26)}</div>`;
  const row = `<div data-lcs-template-row style="display:flex;align-items:center;gap:${LEGEND_GAP}px;flex:0 0 auto">${set.html}${leg}</div>`;
  const html = `<div data-lcs-template-block style="display:flex;flex-direction:column;align-self:flex-start;flex:0 0 auto">${strip}${row}</div>`;
  return { html, width: set.width + (legend ? LEGEND_GAP + legendWidth(Sg) : 0), height: STRIP_H + set.height };
}
function tanLegendBlock(Sg) { return TG.tanLegend({ rows: TG.CLASSES, Sg }); }
function legendWidth(Sg) { return 22 + 8 + TG.tanGlyph('L', Sg).width; }

function figureRow({ figures, S, seams = true, gap = ROW_GAP, data }) {
  if (!Array.isArray(figures) || !figures.length) throw new Error('figureRow: no figures');
  const drawn = figures.map((f) => TG.tangramFigure({ figure: f.key, tans: f.tans, S, mode: seams ? 'solution' : 'silhouette', transform: f.transform, data: f.data }));
  const html = `<div data-lcs-figure-row${seams ? '' : ' data-lcs-shadows="1"'}${data || ''} style="display:flex;justify-content:center;align-items:center;gap:${gap}px;flex:0 0 auto;min-width:0">${drawn.map((d) => d.html).join('')}</div>`;
  return { html, width: drawn.reduce((a, d) => a + d.width, 0) + gap * (drawn.length - 1), height: Math.max(...drawn.map((d) => d.height)) };
}

/* ---------------- the face components (Phase 2 consumers; built here per design §2) ---------------- */
function composeCard({ mini, S, Sg = 64, transform }) {
  const strip = mini.tans.map((t) => TG.clsOf(t.id)).sort((a, b) => TG.CLASSES.indexOf(a) - TG.CLASSES.indexOf(b)).map((cls) => TG.tanGlyph(cls, Sg).html);
  const outline = TG.tangramFigure({ figure: mini.key, tans: mini.tans, S, mode: 'outline', transform, data: { 'data-lcs-mini': mini.key } });
  return `<div class="ws-card-stage" data-lcs-compose style="flex-direction:column;gap:12px;padding:0">` +
    `<div data-lcs-glyph-strip style="display:flex;align-items:center;justify-content:center;gap:10px;height:44px;flex:0 0 auto">${strip.join('')}</div>${outline.html}</div>`;
}
function shadowCard({ figure, S, transform }) {
  const sil = TG.tangramFigure({ figure: figure.key, tans: figure.tans, S, mode: 'silhouette', transform });
  return `<div class="ws-card-stage" data-lcs-shadow style="padding:0">${sil.html}</div>`;
}
function missingCard({ figure, missing, S, chips, chipW = 104, transform, pad, chipPad = 12 }) {
  const fig = TG.tangramFigure({ figure: figure.key, tans: figure.tans, S, mode: 'hole', missing, transform, pad });
  const col = chips.map((c) => {
    const chip = TG.tanChip(c.cls, S, { flip: c.flip });
    const hgt = Math.max(44, chip.height + chipPad);
    return `<span class="ws-achip" data-lcs-chip="${esc(c.cls)}"${c.flip ? ' data-lcs-flip="1"' : ''}${c.correct ? ' data-lcs-correct="1"' : ''} style="width:${chipW}px;height:${hgt}px;border-radius:14px">${chip.html}</span>`;
  });
  return `<div class="ws-card-stage" data-lcs-missing-card style="gap:12px;padding:0;align-items:center">${fig.html}` +
    `<div data-lcs-chip-col style="display:flex;flex-direction:column;gap:8px;width:${chipW}px;flex:0 0 auto">${col.join('')}</div></div>`;
}
function matchRow({ figure, S, candidates, box = 160, gap = 10, transform }) {
  const target = TG.tangramFigure({ figure: figure.key, tans: figure.tans, S, mode: 'silhouette', transform, stroke: 3, pad: 1.5 });
  const cell = (inner, cls, extra) => `<div ${extra} style="width:${box}px;height:${box}px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;border-radius:14px;${cls}">${inner}</div>`;
  const shadow = cell(target.html, `background:${T.cream};border:2px solid ${T.creamDeep}`, 'data-lcs-target');
  const opts = candidates.map((c, i) => {
    const d = TG.tangramFigure({ figure: figure.key, tans: c.tans, S, mode: 'solution', transform: c.t, stroke: 3, pad: 1.5 });
    return cell(d.html, `background:${T.white};border:2.5px solid ${T.teal}`, `data-lcs-candidate="${i}" data-lcs-t="${esc(c.t)}"${c.correct ? ' data-lcs-correct="1"' : ''}`);
  });
  return `<div data-lcs-match-row data-lcs-figure="${esc(figure.key)}"${transform ? ` data-lcs-transform="${esc(transform)}"` : ''} style="display:flex;align-items:center;justify-content:center;gap:${gap}px;flex:0 0 auto">${shadow}${opts.join('')}</div>`;
}
function countCard({ sub, S, boxW = 64, boxH = 50, transform }) {
  const fig = TG.tangramFigure({ figure: sub.key, tans: sub.tans, S, mode: 'solution', transform, data: { 'data-lcs-sub': sub.key } });
  const tri = svgRoot({ width: 24, height: 24, label: 'triangle' }, el('polygon', { points: '2,21 22,21 12,3', fill: T.cream, stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round', 'data-lcs-count-glyph': 'triangle' }), { style: 'display:block;flex:0 0 auto' });
  const sq = svgRoot({ width: 24, height: 24, label: 'square' }, el('rect', { x: 2, y: 2, width: 20, height: 20, fill: T.cream, stroke: T.teal, 'stroke-width': 2, 'stroke-linejoin': 'round', 'data-lcs-count-glyph': 'square' }), { style: 'display:block;flex:0 0 auto' });
  const row = `<div data-lcs-answer-row style="display:flex;align-items:center;justify-content:center;gap:6px;flex:0 0 auto">${tri}${answerBox({ w: boxW, h: boxH, answer: sub.counts.triangles })}<span style="width:10px"></span>${sq}${answerBox({ w: boxW, h: boxH, answer: sub.counts.squares })}</div>`;
  return `<div class="ws-card-stage" data-lcs-count-card style="flex-direction:column;gap:12px;padding:0">${fig.html}${row}</div>`;
}

module.exports = { templateBlock, figureRow, composeCard, shadowCard, missingCard, matchRow, countCard };
