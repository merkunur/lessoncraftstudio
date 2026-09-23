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
 * FACES (Phase E, 2026-09-23): givenPill, realRow, shapeChoice, objectCard,
 * writeLane, riddleBubble (the design's `bubble`), riddleCard, dotLattice,
 * dotCard — see the block below.
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

/* ====================================================================== FACES (Phase E, 2026-09-23) */
/*
 * givenPill({kind, label, px=20, h=40})            a teal name to READ (never circled): F1 row head, F5 card head
 * realRow({target, label, figures, lensD, …})      F1: a lane — the name pill over a row of lenses
 * shapeChoice({kind, label, w, h, px})             F2: a tile to COLOUR — an outline glyph + the shape name
 * objectCard({src, obj, answer, labels, pic, …})   F2: a real picture + the two tiles in FIXED order
 * writeLane({shape, lensD, rowW, rowH, glyphH})    F3: a lens + one empty writing row, no letter boxes
 * riddleBubble({text, px, lh})                     F4: the tealSoft bubble with the coral "?" disc
 * riddleCard({key, text, tags, …})                 F4: bubble over three name tags (2 + 1)
 * dotLattice({n, pitch, r, given})                 F5: a bare n×n dot lattice, the given side coral
 * dotCard({kind, label, given, n, pitch})          F5: the name pill over the lattice
 * (the design's `bubble` ships as `riddleBubble`: the components-b5 namespace is shared by
 * ten families and refuses a duplicate export — a bare `bubble` is too likely to collide.)
 */

/** A name to READ: teal fill, white Baloo 2 700. Never a target (data-lcs-given, not data-lcs-tag). */
function givenPill({ kind, label, px = 20, h = 40 }) {
  return `<span class="s2d-given" data-lcs-given="${esc(kind)}" style="box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;` +
    `flex:0 0 auto;height:${h}px;padding:0 20px;background:${C.teal};border-radius:999px;font-family:'Baloo 2',sans-serif;font-weight:700;` +
    `font-size:${px}px;line-height:1;color:${C.white};white-space:nowrap"><span data-lcs-given-text style="display:block;white-space:nowrap">${esc(label)}</span></span>`;
}

/**
 * F1 lane: the target's name (read) over `figures.length` lenses, each figure on its own white lens. The
 * lane fills its share of the stage and spreads its slack EVENLY (space-evenly): a top-anchored pill over
 * a row that floats in a tall lane would leave a > 40 px band at the one-line chrome.
 */
function realRow({ target, label, figures, lensD = 132, pillPx = 20, pillH = 40, gap = 8, justify = 'space-evenly' }) {
  const lenses = figures.map((f, i) => {
    const lf = lensFigure({ shape: f, lensD });
    return `<div class="s2d-real" data-lcs-lens-slot="${i + 1}" style="flex:0 0 auto">${lf.html}</div>`;
  }).join('');
  return `<div class="ws-lane s2d-realrow" data-lcs-row data-lcs-target="${esc(target)}" style="flex:1 1 0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:${justify};gap:${gap}px">` +
    givenPill({ kind: target, label, px: pillPx, h: pillH }) +
    `<div class="s2d-realfigs" data-ws-content style="display:flex;justify-content:space-between;width:100%;flex:0 0 auto">${lenses}</div></div>`;
}

/** Crop a flat-shape svg to a rectangle of its own coordinates (the tile glyph: the rectangle box is square otherwise). */
function cropSvg(svg, x, y, w, h) {
  return svg.replace(/\swidth="[^"]*" height="[^"]*" viewBox="[^"]*"/, ` width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}"`);
}

/** The tile glyph: an outline circle d 44 or an outline rectangle 56 × 34 (flat-shape rot 0, sw 2.5, no fill). */
function tileGlyph(kind) {
  if (kind === 'circle') return flatShape({ kind: 'circle', R: 20.5, pad: 1.5, sw: 2.5 }).svg;   // box 44
  if (kind === 'rectangle') {
    const a = 26.75 / 15.75;                                    // 53.5 × 31.5 at the stroke centre + 2.5 stroke = 56 × 34
    const R = Math.hypot(26.75, 15.75);
    const r = flatShape({ kind: 'rectangle', aspect: a, R, pad: 1, sw: 2.5 });
    const c = r.box / 2;
    return cropSvg(r.svg, +(c - 28).toFixed(2), +(c - 17).toFixed(2), 56, 34);
  }
  throw new Error(`2d-shapes tileGlyph: no tile for "${kind}" (F2 offers circle and rectangle only)`);
}

/** F2: a tile the child COLOURS — white, 2 px teal border, the glyph + the name (Baloo 2 700). */
function shapeChoice({ kind, label, w = 176, h = 56, px = 16 }) {
  return `<span class="s2d-tile" data-lcs-tile="${esc(kind)}" style="box-sizing:border-box;display:flex;align-items:center;gap:8px;flex:0 0 auto;` +
    `width:${w}px;height:${h}px;padding:0 8px;background:${C.white};border:2px solid ${C.teal};border-radius:12px;overflow:hidden">` +
    `<span data-lcs-tile-glyph style="flex:0 0 56px;display:flex;align-items:center;justify-content:center">${tileGlyph(kind)}</span>` +
    `<span data-lcs-tile-text style="font-family:'Baloo 2',sans-serif;font-weight:700;font-size:${px}px;line-height:1;color:${C.ink};white-space:nowrap">${esc(label)}</span></span>`;
}

/** F2 card stage: the opened picture (contain) left, the two tiles right in FIXED order (circle over rectangle). */
function objectCard({ src, obj, answer, labels, pic = 110, tileW = 176, tileH = 56, tilePx = 16, gap = 16, tileGap = 10 }) {
  const tiles = ['circle', 'rectangle'].map((k) => shapeChoice({ kind: k, label: labels[k], w: tileW, h: tileH, px: tilePx })).join('');
  return `<div class="s2d-stage" data-ws-content data-lcs-obj="${esc(obj)}" data-lcs-answer="${esc(answer)}" style="flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center;gap:${gap}px">` +
    `<img src="${esc(src)}" alt="" data-lcs-obj-img style="flex:0 0 auto;width:${pic}px;height:${pic}px;object-fit:contain;display:block">` +
    `<div class="s2d-tiles" style="display:flex;flex-direction:column;gap:${tileGap}px;flex:0 0 auto">${tiles}</div></div>`;
}

/** F3 lane: the lens left, ONE empty writing row right (no starter, no letter boxes). */
function writeLane({ shape, lensD = 78, rowW = 547, rowH = 70, glyphH = 32, gap = 22, rulingBlock }) {
  const lf = lensFigure({ shape, lensD });
  return `<div class="ws-lane s2d-writelane" data-lcs-lane style="padding:4px 12px;flex:1 1 0;min-height:0;display:flex;align-items:center;gap:${gap}px">` +
    `<div data-ws-content style="flex:0 0 auto">${lf.html}</div>` +
    `<div data-lcs-write style="flex:0 0 auto;width:${rowW}px">${rulingBlock({ rows: 1, w: rowW, h: rowH, glyphH })}</div></div>`;
}

/** F4: the riddle bubble (tealSoft, radius 14, Nunito 800) with a coral "?" disc on its top-right corner. It GROWS to its card's slack and centres its text. */
function riddleBubble({ text, px = 16, lh = 20 }) {
  const disc = `<span data-lcs-qdisc aria-hidden="true" style="position:absolute;top:-8px;right:-8px;width:30px;height:30px;border-radius:50%;background:${C.coral};` +
    `color:${C.white};font-family:'Baloo 2',sans-serif;font-weight:700;font-size:20px;line-height:30px;text-align:center">?</span>`;
  return `<div class="s2d-bubble" data-lcs-bubble style="position:relative;box-sizing:border-box;flex:1 1 auto;min-height:${3 * lh + 20}px;width:100%;display:flex;align-items:center;` +
    `padding:10px 26px 10px 20px;background:${C.tealSoft};border-radius:14px">` +
    `<p data-lcs-riddle-text style="margin:0;font-family:'Nunito',sans-serif;font-weight:800;font-size:${px}px;line-height:${lh}px;color:${C.ink}">${esc(text)}</p>${disc}</div>`;
}

/** F4 card stage: bubble over three tags wrapping 2 + 1. */
function riddleCard({ key, text, tags, tagW = 132, tagH = 44, tagPx = 18, px = 16, lh = 20 }) {
  const tagHtml = tags.map((t) => nameTag({ kind: t.kind, label: t.label, w: tagW, h: tagH, px: tagPx })).join('');
  return `<div class="s2d-stage" data-ws-content data-lcs-riddle="${esc(key)}" style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px">` +
    riddleBubble({ text, px, lh }) +
    `<div class="s2d-tags" style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;flex:0 0 auto">${tagHtml}</div></div>`;
}

/**
 * F5: a bare n × n lattice (teal dots) with an optional given side (coral 5 px, round caps, coral end dots r 6).
 * given = [x0, y0, x1, y1] in LATTICE units. The svg scales to its box (meet), so the pitch grows with the
 * card at a short chrome instead of leaving a blank band; the drawn pitch never falls below `pitch`.
 */
function dotLattice({ n = 6, pitch = 46, r = 3.5, margin = 6, given = null }) {
  const size = 2 * margin + (n - 1) * pitch;
  const at = (i) => +(margin + i * pitch).toFixed(2);
  const dots = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) dots.push(`<circle data-lcs-dot cx="${at(x)}" cy="${at(y)}" r="${r}" fill="${C.teal}"/>`);
  let g = '';
  if (given) {
    const [x0, y0, x1, y1] = given;
    g = `<line data-lcs-given-side x1="${at(x0)}" y1="${at(y0)}" x2="${at(x1)}" y2="${at(y1)}" stroke="${C.coral}" stroke-width="5" stroke-linecap="round"/>` +
      `<circle data-lcs-given-end cx="${at(x0)}" cy="${at(y0)}" r="6" fill="${C.coral}"/><circle data-lcs-given-end cx="${at(x1)}" cy="${at(y1)}" r="6" fill="${C.coral}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" data-lcs-lattice="${n}" data-lcs-pitch="${pitch}" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet" ` +
    `aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;display:block"><g data-lcs-dots>${dots.join('')}</g>${g}</svg>`;
}

/** F5 card stage: the name pill over the lattice (the lattice fills the rest of the card, never below its pitch). */
function dotCard({ kind, label, given, n = 6, pitch = 46, pillPx = 22, pillH = 40 }) {
  const size = 12 + (n - 1) * pitch;
  return `<div class="s2d-stage" data-ws-content data-lcs-dotcard="${esc(kind)}" style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;align-items:center;gap:12px">` +
    givenPill({ kind, label, px: pillPx, h: pillH }) +
    `<div data-lcs-lattice-box style="position:relative;flex:1 1 0;min-height:${size}px;width:100%">${dotLattice({ n, pitch, given })}</div></div>`;
}

module.exports = { nameTag, lensFigure, nameCard, givenPill, realRow, shapeChoice, objectCard, writeLane, riddleBubble, riddleCard, dotLattice, dotCard };
