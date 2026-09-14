/**
 * components-b3/seasons.js — the K-322 `seasons` family components (design:
 * docs/worksheet-gen/b3-designs/K-322-seasons.md §2). Merged into the
 * templates/components-b3.js namespace; every name is type-scoped
 * (`season…` / `markerTile`) so no sibling family can collide.
 *
 * Exports (the BASE page consumes all four; the face components the design
 * names — markerRow, seasonChoiceRow, oddRow, seasonLegend, monthTile,
 * modelBank, and the season-wheel / bare-tree primitives — are Phase 2 and
 * are NOT exported here, nothing on the base consumes them):
 *
 *   seasonIcon({ season, px = 40 })
 *     The language-free SIGN glyph: token-only inline SVG on a 64 viewBox,
 *     `aria-hidden`, `data-lcs-icon="<season>"`. winter = an open six-arm
 *     line star (the only one with no fill), spring = five coral petals on a
 *     stem with a teal leaf, summer = the only SOLID disc with eight rays,
 *     autumn = a pale five-lobed maple leaf with dark veins. Each keeps its
 *     identity in greyscale (line-star / cluster-on-a-stem / solid disc /
 *     lobed shape), so a mono print of the signs still sorts.
 *
 *   markerTile({ theme, noun, src, season, px = 88, tile = 112, dot })
 *     One cream tile (border 2 creamDeep, r 14) with the marker picture
 *     (`.ws-icon`, no alt, NO rotation) centred and a coral dot (12 px, 2 px
 *     white ring — the science-category-sort `.sci-dot` idiom) on the edge
 *     that faces the signs (`dot:'bottom'|'top'|'none'`). Ground truth =
 *     data-lcs-item="<theme>/<noun>" + data-lcs-season="<key>"; the season is
 *     never printed on the tile.
 *
 *   seasonBin({ key, name, w = 150, h = 160, iconPx = 40, namePx = 22, writeLane = false })
 *     One white SIGN card (border 3 teal, r 16, NO dashed open top — a bucket
 *     opening upward would make the lower row's lines arrive at its base):
 *     the glyph over the season NAME (Baloo 2 700, teal, nowrap), or over an
 *     empty `writingRow` when `writeLane` (d3: the child writes the name).
 *     Coral dots at the top-edge and bottom-edge centres. data-lcs-bin="<key>".
 *
 *   seasonSortStage({ top, bins, bottom, tile, rowGap, cols })
 *     The SANDWICH: a top marker row (dots on the bottom edge), the four
 *     signs, a bottom marker row (dots on the top edge) in a
 *     `justify-content:space-between` flex column that fills the body
 *     (`flex:1 1 auto; min-height:0`), so the two line zones absorb whatever
 *     the chrome leaves (722 → 169 px each at d2, 814 → 215). Tiles are placed
 *     on the BIN COLUMNS when `cols` is given (an array of column indexes per
 *     tile: tile centres = bin centres 75 / 250 / 425 / 600), else centred
 *     with `rowGap`. Stamps data-ws-content + data-lcs-seasons on the root.
 *
 * Every colour is a token (qa/lints.js rejects off-palette hex); all CSS is
 * inline and scoped to this stage (no page.css edit).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc, el, svgRoot, circle, line } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');

const T = tokens.color;
const F = tokens.font;

const BIN_W = 150;
const BIN_GAP = 25;
/** Bin column centres on the 675 px body: 75 / 250 / 425 / 600. */
const BIN_CENTRES = [0, 1, 2, 3].map((i) => i * (BIN_W + BIN_GAP) + BIN_W / 2);

function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
const f1 = (n) => Math.round(n * 10) / 10;

function winterGlyph() {
  const parts = [];
  for (let k = 0; k < 6; k++) {
    const deg = k * 60 - 90;
    const [x2, y2] = polar(32, 32, 27, deg);
    parts.push(line({ x1: 32, y1: 32, x2: f1(x2), y2: f1(y2), strokeColor: T.teal, strokeWidth: 3.5 }));
    const [tx, ty] = polar(32, 32, 17, deg);
    for (const s of [-55, 55]) {
      const [ex, ey] = polar(tx, ty, 7, deg + s);
      parts.push(line({ x1: f1(tx), y1: f1(ty), x2: f1(ex), y2: f1(ey), strokeColor: T.teal, strokeWidth: 3 }));
    }
  }
  parts.push(circle({ cx: 32, cy: 32, r: 3, fill: T.coral }));
  return parts.join('');
}

function springGlyph() {
  // head centred (32,22): petals r 10, rx 7.5 ry 10.5 (long axis radial); stem 40-62; leaf at (22,54)
  const parts = [];
  parts.push(line({ x1: 32, y1: 40, x2: 32, y2: 62, strokeColor: T.teal, strokeWidth: 3.5 }));
  parts.push(el('ellipse', { cx: 22, cy: 54, rx: 9, ry: 5, fill: T.tealSoft, stroke: T.teal, 'stroke-width': 2, transform: 'rotate(-35 22 54)' }));
  for (let k = 0; k < 5; k++) {
    const deg = k * 72 - 90;
    const [px, py] = polar(32, 22, 10, deg);
    parts.push(el('ellipse', { cx: f1(px), cy: f1(py), rx: 7.5, ry: 10.5, fill: T.coralSoft, stroke: T.coral, 'stroke-width': 2.5, transform: `rotate(${deg + 90} ${f1(px)} ${f1(py)})` }));
  }
  parts.push(circle({ cx: 32, cy: 22, r: 6, fill: T.coral }));
  return parts.join('');
}

function summerGlyph() {
  const parts = [];
  for (let k = 0; k < 8; k++) {
    const deg = k * 45;
    const [x1, y1] = polar(32, 32, 18, deg);
    const [x2, y2] = polar(32, 32, 27, deg);
    parts.push(line({ x1: f1(x1), y1: f1(y1), x2: f1(x2), y2: f1(y2), strokeColor: T.teal, strokeWidth: 3.5 }));
  }
  parts.push(circle({ cx: 32, cy: 32, r: 13, fill: T.coral }));
  return parts.join('');
}

function autumnGlyph() {
  // five lobes: tips (32,6) (10,20) (54,20) (16,46) (48,46); notches at r 17 from (32,30)
  // (the design's r 14 read as a star at 40 px — measured on the glyph sheet; shallower
  // notches keep the lobes and the leaf identity); base (32,50), stem to (32,62)
  const pts = [
    [32, 50], [25.5, 45.7], [16, 46], [15.3, 33], [10, 20], [22.8, 15.8],
    [32, 6], [41.2, 15.8], [54, 20], [48.7, 33], [48, 46], [38.5, 45.7],
  ];
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L ') + ' Z';
  return [
    el('path', { d, fill: T.coralSoft, stroke: T.teal, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }),
    line({ x1: 32, y1: 50, x2: 32, y2: 62, strokeColor: T.teal, strokeWidth: 3.5 }),
    line({ x1: 32, y1: 48, x2: 32, y2: 12, strokeColor: T.teal, strokeWidth: 2 }),
    line({ x1: 32, y1: 38, x2: 15, y2: 24, strokeColor: T.teal, strokeWidth: 2 }),
    line({ x1: 32, y1: 38, x2: 49, y2: 24, strokeColor: T.teal, strokeWidth: 2 }),
  ].join('');
}

const GLYPHS = { winter: winterGlyph, spring: springGlyph, summer: summerGlyph, autumn: autumnGlyph };

function seasonIcon({ season, px = 40 }) {
  const g = GLYPHS[season];
  if (!g) throw new Error('seasonIcon: unknown season "' + season + '"');
  return svgRoot({ width: px, height: px, viewBox: '0 0 64 64', label: '' }, g(),
    { 'aria-hidden': 'true', 'data-lcs-icon': season, style: 'display:block' });
}

function dotStyle(edge) {
  const pos = edge === 'top' ? 'top:-7px' : 'bottom:-7px';
  return `position:absolute;${pos};left:50%;transform:translateX(-50%);width:12px;height:12px;border-radius:50%;background:${T.coral};border:2px solid ${T.white}`;
}

function markerTile({ theme, noun, src, season, px = 88, tile = 112, dot = 'bottom' }) {
  const dotHtml = dot === 'none' ? '' : `<span class="ws-season-dot" style="${dotStyle(dot)}"></span>`;
  return `<div class="ws-marker" style="position:relative;width:${tile}px;height:${tile}px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;` +
    `background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px" ` +
    `data-lcs-item="${esc(theme + '/' + noun)}" data-lcs-season="${esc(season)}">` +
    `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px">${dotHtml}</div>`;
}

function seasonBin({ key, name, w = BIN_W, h = 160, iconPx = 40, namePx = 22, writeLane = false }) {
  const inner = w - 6 - 16;   // border 3 + padding 8 each side
  const nameHtml = writeLane
    ? `<div class="ws-season-write" style="width:${inner - 2}px;margin-top:6px">${writingRow({ w: inner - 2, h: 52, glyphH: 40, xHeight: true }).svg}</div>`
    : `<span class="ws-season-name" style="display:block;margin-top:6px;font-family:${F.display},cursive;font-weight:700;font-size:${namePx}px;line-height:${namePx + 6}px;color:${T.teal};white-space:nowrap;text-align:center">${esc(name)}</span>`;
  return `<div class="ws-season-bin" style="position:relative;width:${w}px;height:${h}px;flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;` +
    `padding:0 8px;background:${T.white};border:3px solid ${T.teal};border-radius:16px" data-lcs-bin="${esc(key)}"${writeLane ? ' data-lcs-write="1"' : ''}>` +
    `<span class="ws-season-dot" style="${dotStyle('top')}"></span>` +
    seasonIcon({ season: key, px: iconPx }) + nameHtml +
    `<span class="ws-season-dot" style="${dotStyle('bottom')}"></span></div>`;
}

/** A marker row: tiles on the bin columns (`cols`) or centred with `rowGap`. */
function markerRowHtml(tiles, { which, tile, cols, rowGap }) {
  if (cols) {
    // absolute placement on the bin centres: tile i sits centred on BIN_CENTRES[cols[i]]
    const inner = tiles.map((html, i) => {
      const cx = BIN_CENTRES[cols[i]];
      return `<div style="position:absolute;top:0;left:${f1(cx - tile / 2)}px" data-lcs-col="${cols[i]}">${html}</div>`;
    }).join('');
    return `<div class="ws-marker-row" data-lcs-row="${which}" style="position:relative;height:${tile}px;width:100%;flex:0 0 auto">${inner}</div>`;
  }
  return `<div class="ws-marker-row" data-lcs-row="${which}" style="display:flex;justify-content:center;gap:${rowGap}px;height:${tile}px;flex:0 0 auto">${tiles.join('')}</div>`;
}

function seasonSortStage({ top, bins, bottom, tile = 112, rowGap = 20, cols = null }) {
  return `<div class="ws-seasonstage" data-ws-content data-lcs-seasons style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;min-height:0;width:100%">` +
    markerRowHtml(top, { which: 'top', tile, cols, rowGap }) +
    `<div class="ws-season-bins" data-lcs-bins style="display:flex;justify-content:space-between;flex:0 0 auto;width:100%">${bins.join('')}</div>` +
    markerRowHtml(bottom, { which: 'bottom', tile, cols, rowGap }) +
    `</div>`;
}

module.exports = { seasonIcon, markerTile, seasonBin, seasonSortStage };
