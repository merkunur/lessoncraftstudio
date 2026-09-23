/**
 * components-b5/2d-shapes.js — the K-368 `2d-shapes` base components (design
 * docs/worksheet-gen/b5-designs/K-368-2d-shapes.md §2 "NEW templates/
 * components-b5/2d-shapes.js"). Inline CSS only (no page.css edit); token
 * colours only; every stage stamps data-ws-content.
 *
 * BASE (built 2026-09-23):
 *   nameTag({kind, label, w=132, h=48, px=18})   a white round tag the child CIRCLES
 *   lensFigure({shape, lensD})                   one exact flat shape on its round white lens
 *   nameCard({shape, tags, lensD, layout, …})    the base card: lens left + tag column
 *                                                (layout 'row'), or lens over a tag row
 *                                                (layout 'column', the d1 188 px lens)
 * The face components the design names (givenPill, realRow, objectCard,
 * shapeChoice, writeLane, riddleCard, bubble, dotCard, dotLattice) land with the
 * faces (Phase E) in this same file.
 */
'use strict';
const T = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { flatShape } = require('../../primitives/flat-shape.js');

const C = T.color;

/** A name to circle: white, 2 px teal border, fully round, Baloo 2 700. Text never wraps; an overflowing literal is measured (scrollWidth) by the gate, never shrunk here. */
function nameTag({ kind, label, w = 132, h = 48, px = 18 }) {
  return `<span class="s2d-tag" data-lcs-tag="${esc(kind)}" style="box-sizing:border-box;display:flex;align-items:center;justify-content:center;` +
    `flex:0 0 auto;width:${w}px;height:${h}px;padding:0 8px;background:${C.white};border:2px solid ${C.teal};border-radius:999px;` +
    `font-family:'Baloo 2',sans-serif;font-weight:700;font-size:${px}px;line-height:1;color:${C.ink};white-space:nowrap;overflow:hidden">` +
    `<span data-lcs-tag-text style="display:block;white-space:nowrap">${esc(label)}</span></span>`;
}

/** One flat shape centred on a white lens of diameter lensD: the shape's box IS the lens box (R + pad + lens = lensD / 2). */
function lensFigure({ shape, lensD }) {
  const pad = shape.pad == null ? 3 : shape.pad;
  const lens = lensD / 2 - shape.R - pad;
  if (!(lens > 0)) throw new Error(`2d-shapes lensFigure: R ${shape.R} + pad ${pad} does not fit a ${lensD} px lens`);
  const r = flatShape({ ...shape, pad, lens });
  return { html: `<div class="s2d-lens" style="flex:0 0 auto;width:${lensD}px;height:${lensD}px">${r.svg}</div>`, fig: r };
}

/**
 * The base card stage: the lens and its name tags.
 *   layout 'row'    : lens | gap | a column of tags (d2 / d3: 156 + 14 + 132 = 302 <= 302.5)
 *   layout 'column' : lens over a row of tags (d1: 188 over 2 × 140 + 10)
 * `tags` = [{kind, label}] in PRINTED order.
 */
function nameCard({ shape, tags, lensD, layout = 'row', gap = 14, tagGap = 10, tagW = 132, tagH = 48, tagPx = 18 }) {
  const lf = lensFigure({ shape, lensD });
  const tagHtml = tags.map((t) => nameTag({ kind: t.kind, label: t.label, w: tagW, h: tagH, px: tagPx })).join('');
  const dir = layout === 'column' ? 'column' : 'row';
  const tagBox = `<div class="s2d-tags" style="display:flex;flex-direction:${dir === 'row' ? 'column' : 'row'};gap:${tagGap}px;flex:0 0 auto">${tagHtml}</div>`;
  const html = `<div class="s2d-stage" data-ws-content style="flex:1 1 auto;min-height:0;display:flex;flex-direction:${dir};align-items:center;justify-content:center;gap:${gap}px">` +
    `${lf.html}${tagBox}</div>`;
  return { html, fig: lf.fig };
}

module.exports = { nameTag, lensFigure, nameCard };
