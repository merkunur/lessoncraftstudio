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

/* ======================================================================
 * PHASE 2 (2026-09-14) — the five face components (design §3). Type-scoped
 * names (season… / marker… / odd… / month…); the design's
 * primitives/season-wheel.js and primitives/bare-tree.js live HERE as
 * seasonWheel / seasonBareTree (the face brief allows new components only in
 * this family file). Every colour is a token; all CSS inline.
 *
 *   markerRow({ items:[{theme, noun, src, season}], px = 88, gap = 12 })
 *     F1: a bare row of marker pictures (no tile frame — 3 × 88 + 2 × 12 =
 *     288 fits the 294 card stage), each stamped data-lcs-item / data-lcs-season.
 *   seasonChoiceRow({ keys, px = 56, tile = 68, gap = 6 })
 *     F1: the four glyph tiles in cycle order (white, teal border 2, r 10),
 *     data-lcs-choice="<key>". 4 × 68 + 3 × 6 = 290.
 *   seasonWhichCard({ cardIndex, answer, markers, keys, px, gap, choicePx, choiceTile, choiceGap })
 *     F1: one card's inner HTML (markerRow + 16 + seasonChoiceRow), the
 *     answer only in data-lcs-answer on the stage wrapper.
 *   seasonWheel({ d = 440, slots:[{key, name, given, icon}], slotPx = 110, iconPx = 40, namePx = 18, ringR = 160 })
 *     F2: ring stroke 4 radius 160, four slot circles ON the ring at N E S W
 *     (clockwise = the cycle); a given slot tealSoft + glyph 40 (the base's
 *     sign glyph; 56 pushed `printemps` / `primavera` at 18 outside the 110
 *     circle, measured) + name on a 20 px line, an empty
 *     slot white with a dashed coral ring; four clockwise arc arrows (+22° …
 *     +66° per quadrant, head 12). Slots stamp data-lcs-slot="<key>"
 *     data-lcs-given="0|1".
 *   modelBank({ keys, names, px = 56, tile = 100, gap = 24, h = 96, namePx = 16 })
 *     F2: the missing signs as tiles (glyph + name), data-lcs-model="<key>".
 *   oddRow({ index, items, px = 96, tile = 116, gap = 24, odd, majority })
 *     F3: a .ws-lane row (padding 10 16, inner 639): badge 26 + 12 + N
 *     markerTiles (dot:'none'); data-lcs-odd-row / data-lcs-odd="<index>" /
 *     data-lcs-majority="<key>".
 *   seasonLegend({ entries:[{key, name, color, colorName, colorWord}], iconPx = 32, namePx = 18, wordPx = 17 })
 *     F4: glyph + name + swatch 22 (a codeColors hex, ink stroke 1) + the
 *     colour WORD; flex-wrap. data-lcs-legend="<key>" data-lcs-color="<codeColor name>".
 *   monthTile({ index, name, season, w = 210, h = 88, circle = 44, namePx = 22, mode = 'circle' })
 *     F4: name left, an empty circle (stroke grid 2) right; data-lcs-month /
 *     data-lcs-season. `h` is the MIN height (the tile stretches to its grid
 *     row). mode:'write' swaps the circle for a 120 × 40 empty box.
 *   seasonBareTree({ w = 260, h = 250 })
 *     F5: a bare deciduous tree — trunk + eight tapering branches + a ground
 *     line — the constant object the child dresses per season; data-lcs-open.
 *   seasonTreeCard({ key, name, iconPx = 36, namePx = 20, figureHtml })
 *     F5: header (glyph + name, 40 high) + 10 + the figure.
 * ====================================================================== */

function markerRow({ items, px = 88, gap = 12 }) {
  const tiles = items.map((it) =>
    '<span class="ws-marker-bare" data-lcs-item="' + esc(it.theme + '/' + it.noun) + '" data-lcs-season="' + esc(it.season) + '" style="display:block;width:' + px + 'px;height:' + px + 'px;flex:0 0 auto">' +
    '<img class="ws-icon" src="' + it.src + '" alt="" style="width:' + px + 'px;height:' + px + 'px;display:block"></span>').join('');
  return '<div class="ws-marker-row" data-lcs-markers style="display:flex;justify-content:center;gap:' + gap + 'px;height:' + px + 'px;flex:0 0 auto">' + tiles + '</div>';
}

function seasonChoiceRow({ keys, px = 56, tile = 68, gap = 6 }) {
  const tiles = keys.map((k) =>
    '<span class="ws-season-choice" data-lcs-choice="' + esc(k) + '" style="display:flex;align-items:center;justify-content:center;width:' + tile + 'px;height:' + tile + 'px;flex:0 0 auto;' +
    'background:' + T.white + ';border:2px solid ' + T.teal + ';border-radius:10px;box-sizing:border-box">' + seasonIcon({ season: k, px }) + '</span>').join('');
  return '<div class="ws-season-choices" data-lcs-choices style="display:flex;justify-content:center;gap:' + gap + 'px;flex:0 0 auto">' + tiles + '</div>';
}

function seasonWhichCard({ cardIndex, answer, markers, keys, px = 88, gap = 12, choicePx = 56, choiceTile = 68, choiceGap = 6 }) {
  return '<div class="ws-card-stage" data-lcs-which="' + cardIndex + '" data-lcs-answer="' + esc(answer) + '" style="flex-direction:column;gap:16px">' +
    markerRow({ items: markers, px, gap }) +
    seasonChoiceRow({ keys, px: choicePx, tile: choiceTile, gap: choiceGap }) +
    '</div>';
}

/** Point on the wheel ring at deg clockwise from N. */
function ringPt(cx, cy, r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [f1(cx + r * Math.cos(a)), f1(cy + r * Math.sin(a))];
}

function seasonWheel({ d = 440, slots, slotPx = 110, iconPx = 40, namePx = 18, ringR = 160 }) {
  if (!Array.isArray(slots) || slots.length !== 4) throw new Error('seasonWheel: four slots, clockwise from N');
  const cx = d / 2, cy = d / 2, sr = slotPx / 2;
  const parts = [];
  parts.push(circle({ cx, cy, r: ringR, strokeColor: T.teal, strokeWidth: 4 }));
  // four clockwise arc arrows between the slots: +22° … +66° per quadrant (a 110 slot
  // covers ±20° of a 160 ring, so the design's 18…72 ran under the slot edges), head 12
  for (let q = 0; q < 4; q++) {
    const a0 = q * 90 + 22, a1 = q * 90 + 66;
    const [x0, y0] = ringPt(cx, cy, ringR, a0);
    const [x1, y1] = ringPt(cx, cy, ringR, a1);
    parts.push(el('path', { d: 'M ' + x0 + ' ' + y0 + ' A ' + ringR + ' ' + ringR + ' 0 0 1 ' + x1 + ' ' + y1, fill: 'none', stroke: T.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'data-lcs-arrow': q }));
    // head: two 10-unit barbs back from the tip, ±35° off the clockwise tangent
    const tang = (a1 * Math.PI) / 180;                 // clockwise tangent direction at a1 (screen coords)
    const tx = Math.cos(tang), ty = Math.sin(tang);
    for (const s of [-1, 1]) {
      const rot = (s * 35 * Math.PI) / 180;
      const bx = -(tx * Math.cos(rot) - ty * Math.sin(rot)), by = -(tx * Math.sin(rot) + ty * Math.cos(rot));
      parts.push(line({ x1, y1, x2: f1(x1 + bx * 12), y2: f1(y1 + by * 12), strokeColor: T.coral, strokeWidth: 4 }));
    }
  }
  const svg = svgRoot({ width: d, height: d, label: '' }, parts.join(''), { 'aria-hidden': 'true', style: 'position:absolute;left:0;top:0' });
  const slotHtml = slots.map((s, i) => {
    const [x, y] = ringPt(cx, cy, ringR, i * 90);
    const box = 'position:absolute;left:' + f1(x - sr) + 'px;top:' + f1(y - sr) + 'px;width:' + slotPx + 'px;height:' + slotPx + 'px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;';
    if (s.given) {
      const nameHtml = s.name == null ? '' : '<span class="ws-season-slot-name" style="display:block;font-family:' + F.display + ',cursive;font-weight:700;font-size:' + namePx + 'px;line-height:' + (namePx + 2) + 'px;color:' + T.teal + ';white-space:nowrap;text-align:center">' + esc(s.name) + '</span>';
      const icon = s.icon === false ? '' : seasonIcon({ season: s.key, px: iconPx });
      return '<div class="ws-season-slot" data-lcs-slot="' + esc(s.key) + '" data-lcs-given="1" style="' + box + 'background:' + T.tealSoft + ';border:3px solid ' + T.teal + '">' + icon + nameHtml + '</div>';
    }
    return '<div class="ws-season-slot" data-lcs-slot="' + esc(s.key) + '" data-lcs-given="0" style="' + box + 'background:' + T.white + ';border:2.5px dashed ' + T.coral + '"></div>';
  }).join('');
  return '<div class="ws-season-wheel" data-lcs-wheel style="position:relative;width:' + d + 'px;height:' + d + 'px;flex:0 0 auto;margin:0 auto">' + svg + slotHtml + '</div>';
}

function modelBank({ keys, names, px = 56, tile = 100, gap = 24, h = 96, namePx = 16 }) {
  const tiles = keys.map((k) =>
    '<div class="ws-season-model" data-lcs-model="' + esc(k) + '" style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:' + tile + 'px;height:' + h + 'px;flex:0 0 auto;' +
    'background:' + T.white + ';border:2px solid ' + T.teal + ';border-radius:12px;box-sizing:border-box">' + seasonIcon({ season: k, px }) +
    '<span class="ws-season-model-name" style="display:block;margin-top:2px;font-family:' + F.display + ',cursive;font-weight:700;font-size:' + namePx + 'px;line-height:' + (namePx + 4) + 'px;color:' + T.teal + ';white-space:nowrap">' + esc(names[k]) + '</span></div>').join('');
  return '<div class="ws-season-bank" data-lcs-bank style="display:flex;justify-content:center;gap:' + gap + 'px;flex:0 0 auto">' + tiles + '</div>';
}

function oddRow({ index, items, px = 96, tile = 116, gap = 24, odd, majority }) {
  const badge = '<span class="ws-odd-badge" style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:13px;background:' + T.teal + ';color:' + T.white + ';font-family:' + F.display + ',cursive;font-weight:600;font-size:15px;flex:0 0 auto">' + (index + 1) + '</span>';
  const tiles = items.map((it) => markerTile({ theme: it.theme, noun: it.noun, src: it.src, season: it.season, px, tile, dot: 'none' })).join('');
  return '<div class="ws-lane" data-lcs-odd-row="' + index + '" data-lcs-odd="' + odd + '" data-lcs-majority="' + esc(majority) + '" style="padding:10px 16px;display:flex;align-items:center;gap:12px;min-height:0">' +
    badge + '<div style="display:flex;align-items:center;gap:' + gap + 'px;flex:1 1 auto;justify-content:center">' + tiles + '</div></div>';
}

function seasonLegend({ entries, iconPx = 32, namePx = 18, wordPx = 17 }) {
  const items = entries.map((e) =>
    '<span class="ws-season-legend-item" data-lcs-legend="' + esc(e.key) + '" data-lcs-color="' + esc(e.colorName) + '" style="display:inline-flex;align-items:center;gap:8px;flex:0 0 auto">' +
    seasonIcon({ season: e.key, px: iconPx }) +
    '<span class="ws-season-legend-name" style="font-family:' + F.display + ',cursive;font-weight:700;font-size:' + namePx + 'px;line-height:' + (namePx + 6) + 'px;color:' + T.teal + ';white-space:nowrap">' + esc(e.name) + '</span>' +
    '<span class="ws-season-swatch" data-lcs-swatch style="display:inline-block;width:22px;height:22px;border-radius:5px;background:' + e.color + ';border:1px solid ' + T.ink + ';box-sizing:border-box"></span>' +
    '<span class="ws-season-legend-word" data-lcs-colorword style="font-family:' + F.body + ',sans-serif;font-weight:800;font-size:' + wordPx + 'px;line-height:' + (wordPx + 5) + 'px;color:' + T.ink + ';white-space:nowrap">' + esc(e.colorWord) + '</span></span>').join('');
  return '<div class="ws-season-legend" data-lcs-legend-row style="display:flex;flex-wrap:wrap;justify-content:center;column-gap:28px;row-gap:8px;padding:8px 12px;background:' + T.white + ';border:2px solid ' + T.creamDeep + ';border-radius:12px;flex:0 0 auto">' + items + '</div>';
}

function monthTile({ index, name, season, w = 210, h = 88, circle: circlePx = 44, namePx = 22, mode = 'circle' }) {
  const answer = mode === 'write'
    ? '<span class="ws-answerbox" data-lcs-write style="width:120px;height:40px;flex:0 0 auto"></span>'
    : '<span class="ws-season-circle" data-lcs-circle style="display:block;width:' + circlePx + 'px;height:' + circlePx + 'px;border-radius:50%;border:2px solid ' + T.grid + ';background:' + T.white + ';box-sizing:border-box;flex:0 0 auto"></span>';
  return '<div class="ws-month-tile" data-lcs-month="' + index + '" data-lcs-season="' + esc(season) + '" style="display:flex;align-items:center;justify-content:space-between;gap:12px;width:' + w + 'px;min-height:' + h + 'px;align-self:stretch;padding:0 16px;box-sizing:border-box;' +
    'background:' + T.cream + ';border:2px solid ' + T.creamDeep + ';border-radius:14px">' +
    '<span class="ws-month-name" style="font-family:' + F.display + ',cursive;font-weight:700;font-size:' + namePx + 'px;line-height:' + (namePx + 6) + 'px;color:' + T.ink + ';white-space:nowrap">' + esc(name) + '</span>' + answer + '</div>';
}

function seasonBareTree({ w = 260, h = 250 }) {
  // trunk 22 wide, y 130..250; tapering branches (quadratic), a ground line at y 246
  const sx = w / 260, sy = h / 250;
  const P = (x, y) => f1(x * sx) + ' ' + f1(y * sy);
  const parts = [];
  parts.push(line({ x1: f1(6 * sx), y1: f1(246 * sy), x2: f1(254 * sx), y2: f1(246 * sy), strokeColor: T.grid, strokeWidth: 1.5 }));
  parts.push(el('path', { d: 'M ' + P(117, 250) + ' L ' + P(121, 130) + ' L ' + P(139, 130) + ' L ' + P(143, 250) + ' Z', fill: T.white, stroke: T.teal, 'stroke-width': 3, 'stroke-linejoin': 'round' }));
  const branches = [
    [128, 134, 88, 76, 34, 44, 6], [132, 134, 172, 76, 226, 44, 6],
    [129, 130, 104, 66, 76, 14, 5], [131, 130, 156, 66, 184, 14, 5],
    [130, 128, 124, 70, 116, 22, 4.5], [130, 128, 136, 70, 144, 22, 4.5],
    [122, 176, 92, 158, 52, 128, 4.5], [138, 176, 168, 158, 208, 128, 4.5],
  ];
  for (const [x0, y0, cx, cy, x1, y1, sw] of branches) {
    parts.push(el('path', { d: 'M ' + P(x0, y0) + ' Q ' + P(cx, cy) + ' ' + P(x1, y1), fill: 'none', stroke: T.teal, 'stroke-width': sw, 'stroke-linecap': 'round' }));
  }
  return '<span data-lcs-open="tree" style="display:block;width:' + w + 'px;height:' + h + 'px">' +
    svgRoot({ width: w, height: h, label: '' }, parts.join(''), { 'aria-hidden': 'true', style: 'display:block' }) + '</span>';
}

function seasonTreeCard({ key, name, iconPx = 36, namePx = 20, figureHtml }) {
  return '<div class="ws-card-stage" data-lcs-tree-card="' + esc(key) + '" style="flex-direction:column;gap:10px;justify-content:flex-start">' +
    '<div class="ws-season-tree-head" style="display:flex;align-items:center;justify-content:center;gap:8px;height:40px;flex:0 0 auto">' + seasonIcon({ season: key, px: iconPx }) +
    '<span class="ws-season-tree-name" style="font-family:' + F.display + ',cursive;font-weight:700;font-size:' + namePx + 'px;line-height:' + (namePx + 6) + 'px;color:' + T.teal + ';white-space:nowrap">' + esc(name) + '</span></div>' +
    figureHtml + '</div>';
}

module.exports = {
  seasonIcon, markerTile, seasonBin, seasonSortStage,
  markerRow, seasonChoiceRow, seasonWhichCard, seasonWheel, modelBank, oddRow, seasonLegend, monthTile, seasonBareTree, seasonTreeCard,
};
