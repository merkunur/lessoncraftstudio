/**
 * components-b4/odd-and-even.js — the G1-351 `odd-and-even` family components
 * (design: docs/worksheet-gen/b4-designs/G1-351-odd-and-even.md §2 "NEW",
 * critic record _work/G1-351-critic.md ruling 23 for the export set). Merged
 * into the templates/components-b4.js namespace; every name is type-scoped.
 *
 * The one thing this family owns: the RULE of parity and its PROOF, on
 * numerals. Nothing here ever prints an answer: a chip carries its numeral
 * and NOTHING about parity; the only place a house name meets a numeral is a
 * WORKED example inside the house, and the pair cue (`pairDots`) can only be
 * drawn inside a `workedTile` (the `host:'worked'` token — a cue beside an
 * open item would print that item's answer). The only words a surface may
 * print are whole literals from the bank (the two K-016 chip words on the
 * house signs; the F3 rule; the two captions; the two place-value letters;
 * two names) — no frame has a slot, nothing inflects.
 *
 * Exports (exactly the eleven names of the design §2):
 *   chipStrip({values, chip=64, gap=7, perRow, attrs})   `.ws-lane[data-lcs-strip][data-ws-content]`
 *       (default padding: inner 639) holding `values.length` round `.ws-chip`s
 *       (page.css :190, size overridden inline to chip x chip, Baloo 2 700 26)
 *       each `data-lcs-val="<v>"`, centred, wrapping after `perRow`
 *       (default = all on one row). Asserts perRow x (chip + gap) - gap <= 639
 *       and every value a positive integer. 9 x 64 + 8 x 7 = 632 at the defaults.
 *   houseBin({parity, label, w=330, worked:[{n}], boxes:{cols:4, rows:2, w:64,
 *       h:74, gapX:8, gapY:24}, layout:{sign:152, worked:220, grid:314, pad:30},
 *       signW=260})   the house (h DERIVED by `houseHeight(boxes, layout)` =
 *       grid + rows x h + (rows-1) x gapY + pad + 2 = 518 at the defaults; the
 *       2026-09-21 reviewer ruling: the stage uses the page top-anchored, the
 *       slack falls BELOW it, so the design's 62x60 / 14 boxes at h 426 grew
 *       to 64x74 / 24 at h 518 — the WIDTH lever is capped by the 290 body:
 *       4 x 68 + 3 x 12 = 308 > 284, so the height carries the growth): an SVG shell
 *       (viewBox 0 0 w h; chimney FIRST `roundedRect 236,40 28x52 r3` white;
 *       roof polygon (10,120)(165,4)(320,120) tealSoft for even / coralSoft for
 *       odd; body `roundedRect 20,120 290x(h-122) r6` white drawn AFTER the roof so
 *       the eave is the body's top edge; every stroke teal 3, linejoin round)
 *       under three absolutely positioned HTML layers over the body's inner
 *       width (x 20..310 = 290): the sign (`.ws-pill` `[data-lcs-sign]`, top
 *       layout.sign, h 44, Nunito 800 20 ink, padding 0 18, nowrap, max-width
 *       signW — an overflow is refused by the render gate, never shrunk), the
 *       worked row (top layout.worked, flex gap 12, centred) of `workedTile`s,
 *       the box grid (top layout.grid, `repeat(cols, w)` gap gapY gapX, centred)
 *       of `blankNumeralBox`es. Root `<div data-lcs-house="odd|even"
 *       data-lcs-h="<h>" data-ws-content>` w x h. Asserts
 *       w >= 300, parity odd|even, a non-empty label, cols x w + (cols-1) x
 *       gapX <= 284 (the 290 body minus the 3 px walls), the worked row
 *       <= 284, every worked n of the house's parity.
 *   workedTile({n})   136 x 60 white, 2 px creamDeep, r 10 (the GIVEN-cell
 *       style of lineUpStrip, ordinal-numbers.js :110-112): `[numeral Baloo 2
 *       700 26 ink, 36 wide][8][pairDots]` + padding 14. `data-lcs-given="<n>"`.
 *       n in 1..10 (the pairDots ceiling).
 *   pairDots({n, r=4.5, pitch=12, host})   svg (cols x pitch + 4) x 30, cols =
 *       ceil(n/2), dot i at column floor(i/2), row i % 2 (COLUMN-first: a
 *       column IS a pair); pair dots `circle r fill teal`; the single (odd n,
 *       the top of the last column) `fill none stroke coral 2.5` (hollow vs
 *       solid = the mono cue). Stamps data-lcs-pairdots data-lcs-n
 *       data-lcs-pairs="floor(n/2)" data-lcs-single="n%2". Throws for n < 1,
 *       n > 10, or `host !== 'worked'` (only workedTile may draw the cue).
 *
 * Phase-2 face components (design §3; built to contract + smoke-measured by
 * the gate, consumed by no spec yet):
 *   dotRowCard({n, dot=16, gap=8, perRow=10, boxW=44, remW=36, remLabel})   F1:
 *       a dots panel (`[data-lcs-dots][data-lcs-n]` white 2 px creamDeep r 12
 *       padding 4; ceil(n/perRow) rows of `circle r 8 fill teal` at pitch 24,
 *       NO pairing drawn, NO coral single) + the equation row `n = [a] + [b] +
 *       [r]` (`[data-lcs-num]`, `[data-lcs-eq]`, three blankNumeralBoxes with
 *       data-lcs-role a|b|r, r narrower) + the `leftover` caption (Nunito 800
 *       12 inkSoft) under the r box. `=` lives in the equation row ONLY.
 *   shareLane({n, src, names:[a, b], leftoverLabel, iconPx=44, perRow=6})   F2:
 *       `.ws-lane` (inline `padding:4px 16px`) row `[pile 284][plate a 64]
 *       [plate b 64][leftover col 84]` — pills are the SPEC's (order =
 *       houseOrder), passed as `pills` html. Plates `[data-lcs-plate]
 *       [data-lcs-name]` = name (Nunito 800 14, nowrap) + blankNumeralBox 56x44
 *       role each; leftover col = caption + blankNumeralBox 44x44 role r.
 *   countLane({n, src, pairsLabel, iconPx=44, perRow=9, pills})   F5: `.ws-lane`
 *       (inline `padding:4px 16px`) row `[pile 436][pairs col 56][pills]`.
 *   placeValueRow({digits:[t, o], boxW=48})   F3: `[tens box white 2 px grid r 8]
 *       [4][ones box coralSoft, coral 2.5 SOLID, r 8, data-lcs-highlight]`,
 *       digits Baloo 2 700 30 ink, root `[data-lcs-pv][data-lcs-val]`.
 *   tickPair({keys=['even','odd'], correct, size=44, gap=10})   F3 / F4: two
 *       EMPTY `.ws-chip` circles `data-lcs-tick="even|odd"`, one
 *       `data-lcs-correct="1"`; never a word inside.
 *   ruleStrip({text, px=15})   F3: `.ws-lane` inline `padding:8px 16px`, Nunito
 *       800 px ink, centred, `[data-lcs-rule]`.
 *   parityTable({chips, order=['ee','oo','eo']})   F4: `.ws-lane` inline
 *       `padding:8px 16px` `width:max-content`, three rows Baloo 2 700 16 ink
 *       `chips[x] + chips[y] = chips[z]` (`[data-lcs-table]`, rows
 *       `[data-lcs-trow="ee|oo|eo"]`).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, roundedRect, circle, esc } = require('../../primitives/_svg.js');

const T = tokens.color;
const F = tokens.font;
const LANE_INNER = 639;                 // .ws-lane inner width at the default padding (README ruling)
const BODY_X = 20, BODY_W = 290;        // the house body: x 20..310 inside the 330 viewBox
const BODY_INNER = BODY_W - 6;          // minus the 3 px walls
const PAIR_MAX = 10;
const EAVE = 120;                       // the roof's eave = the body's top edge (viewBox y)
const SIGN_H = 44, TILE_H = 60;
/** The roomy layout (2026-09-21 reviewer ruling: the stage uses the page, the slack falls BELOW it): sign 152, worked 220, grid 314, pad 30. */
const LAYOUT = { sign: 152, worked: 220, grid: 314, pad: 30 };
const BOXES = { cols: 4, rows: 2, w: 64, h: 74, gapX: 8, gapY: 24 };
/** The house height for a box geometry + layout: grid top + rows x h + (rows - 1) x gapY + pad (+ 2 for the wall stroke). */
function houseHeight(boxes = {}, layout = {}) {
  const B = { ...BOXES, ...boxes }, L = { ...LAYOUT, ...layout };
  if (L.sign < EAVE + 12 || L.sign + SIGN_H > L.worked || L.worked + TILE_H > L.grid) throw new Error(`houseHeight: layout sign ${L.sign} / worked ${L.worked} / grid ${L.grid} overlaps (sign ${SIGN_H}, tile ${TILE_H})`);
  return L.grid + B.rows * B.h + (B.rows - 1) * B.gapY + L.pad + 2;
}
const NUMERAL = `font-family:${F.display},cursive;font-weight:700;font-size:26px;line-height:1;color:${T.ink}`;

function parity(n) { return n % 2 ? 'odd' : 'even'; }
function posInt(v) { return Number.isInteger(v) && v >= 1; }
function blankBox(o) { return require('../components-b3.js').blankNumeralBox(o); }   // call-time: the b3 namespace is complete by then

/* ------------------------------------------------------------------ the base */
function chipStrip({ values, chip = 64, gap = 7, perRow = null, attrs = '' }) {
  if (!Array.isArray(values) || !values.length) throw new Error('chipStrip: values must be a non-empty array');
  for (const v of values) if (!posInt(v)) throw new Error('chipStrip: every value must be a positive integer (got ' + v + ')');
  const per = perRow || values.length;
  const rowW = per * chip + (per - 1) * gap;
  if (rowW > LANE_INNER) throw new Error(`chipStrip: ${per} x ${chip} + ${per - 1} x ${gap} = ${rowW} > ${LANE_INNER} (the lane's inner width)`);
  const chips = values.map((v) => `<span class="ws-chip" data-lcs-val="${v}" style="width:${chip}px;height:${chip}px;flex:0 0 ${chip}px;font-size:26px;line-height:1">${v}</span>`).join('');
  return `<div class="ws-lane" data-lcs-strip="${values.length}" data-ws-content ${attrs} style="display:flex;justify-content:center;align-items:center;min-width:0">` +
    `<div style="display:flex;flex-wrap:wrap;gap:8px ${gap}px;justify-content:center;width:${rowW}px">${chips}</div></div>`;
}

function pairDots({ n, r = 4.5, pitch = 12, host = null }) {
  if (host !== 'worked') throw new Error('pairDots: only a workedTile may draw the pair cue (host:\'worked\') — a cue beside an open item prints its answer');
  if (!posInt(n) || n > PAIR_MAX) throw new Error(`pairDots: n must be 1..${PAIR_MAX} (got ${n})`);
  const cols = Math.ceil(n / 2);
  const w = cols * pitch + 4, h = 30;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const col = Math.floor(i / 2), row = i % 2;
    const cx = 2 + col * pitch + pitch / 2, cy = 2 + row * pitch + 7;
    const single = (n % 2 === 1) && i === n - 1;
    parts.push(single
      ? circle({ cx, cy, r, fill: 'none', strokeColor: T.coral, strokeWidth: 2.5, data: { 'data-lcs-dot': 'single' } })
      : circle({ cx, cy, r, fill: T.teal, data: { 'data-lcs-dot': 'pair' } }));
  }
  return svgRoot({ width: w, height: h, label: '' }, parts.join(''),
    { 'aria-hidden': 'true', 'data-lcs-pairdots': '1', 'data-lcs-n': n, 'data-lcs-pairs': Math.floor(n / 2), 'data-lcs-single': n % 2, style: 'flex:0 0 auto' });
}

function workedTile({ n }) {
  if (!posInt(n) || n > PAIR_MAX) throw new Error(`workedTile: n must be 1..${PAIR_MAX} (got ${n})`);
  return `<span data-lcs-given="${n}" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:136px;height:60px;flex:0 0 136px;box-sizing:border-box;padding:0 14px;` +
    `background:${T.white};border:2px solid ${T.creamDeep};border-radius:10px">` +
    `<span style="display:inline-block;width:36px;text-align:center;${NUMERAL}">${n}</span>${pairDots({ n, host: 'worked' })}</span>`;
}

function houseShell({ parity: p, w, h }) {
  const roofFill = p === 'even' ? T.tealSoft : T.coralSoft;
  const stroke = { strokeColor: T.teal, strokeWidth: tokens.stroke.primitive };
  const chimney = roundedRect({ x: 236, y: 40, w: 28, h: 52, r: 3, fill: T.white, ...stroke, data: { 'data-lcs-part': 'chimney' } });
  const roof = el('polygon', { points: '10,120 165,4 320,120', fill: roofFill, stroke: T.teal, 'stroke-width': tokens.stroke.primitive, 'stroke-linejoin': 'round', 'data-lcs-part': 'roof' });
  const body = roundedRect({ x: BODY_X, y: EAVE, w: BODY_W, h: h - EAVE - 2, r: 6, fill: T.white, ...stroke, data: { 'data-lcs-part': 'body' } });
  return svgRoot({ width: w, height: h, viewBox: `0 0 ${w} ${h}`, label: '' }, chimney + roof + body,
    { 'aria-hidden': 'true', 'data-lcs-shell': p, style: 'position:absolute;left:0;top:0;display:block' });
}

function houseBin({ parity: p, label, w = 330, worked = [], boxes = {}, layout = {}, signW = 260 }) {
  if (p !== 'odd' && p !== 'even') throw new Error('houseBin: parity must be odd|even');
  if (typeof label !== 'string' || !label.trim()) throw new Error('houseBin: the sign needs a non-empty literal');
  if (!(w >= 300)) throw new Error(`houseBin: w ${w} < 300`);
  const B = { ...BOXES, ...boxes }, L = { ...LAYOUT, ...layout };
  const h = houseHeight(B, L);
  if (B.h < 44 || B.w < 44) throw new Error(`houseBin: boxes ${B.w} x ${B.h} below the G1 floor 44`);
  const gridW = B.cols * B.w + (B.cols - 1) * B.gapX;
  if (gridW > BODY_INNER) throw new Error(`houseBin: ${B.cols} x ${B.w} + ${B.cols - 1} x ${B.gapX} = ${gridW} > ${BODY_INNER} (the body's inner width)`);
  if (!Array.isArray(worked)) throw new Error('houseBin: worked must be an array');
  const rowW = worked.length * 136 + Math.max(0, worked.length - 1) * 12;
  if (rowW > BODY_INNER) throw new Error(`houseBin: ${worked.length} worked tiles = ${rowW} > ${BODY_INNER}`);
  for (const t of worked) if (parity(t.n) !== p) throw new Error(`houseBin: a worked ${t.n} in the ${p} house`);
  const layer = (top, inner, extra = '') => `<div style="position:absolute;left:${BODY_X}px;top:${top}px;width:${BODY_W}px;display:flex;justify-content:center;${extra}">${inner}</div>`;
  const sign = `<span class="ws-pill" data-lcs-sign="${p}" style="height:44px;padding:0 18px;box-sizing:border-box;max-width:${signW}px;white-space:nowrap;overflow:hidden;` +
    `font-family:${F.body},sans-serif;font-weight:800;font-size:20px;line-height:1;color:${T.ink}">${esc(label)}</span>`;
  const tiles = worked.map((t) => workedTile({ n: t.n })).join('');
  const grid = `<div data-lcs-boxes="${B.cols * B.rows}" style="display:grid;grid-template-columns:repeat(${B.cols},${B.w}px);gap:${B.gapY}px ${B.gapX}px;justify-content:center">` +
    Array.from({ length: B.cols * B.rows }, () => blankBox({ w: B.w, h: B.h })).join('') + `</div>`;
  return `<div data-lcs-house="${p}" data-lcs-h="${h}" data-ws-content style="position:relative;width:${w}px;height:${h}px;flex:0 0 ${w}px">` +
    houseShell({ parity: p, w, h }) + layer(L.sign, sign) + layer(L.worked, tiles, 'gap:12px') + layer(L.grid, grid) + `</div>`;
}

/* ------------------------------------------------------------------ the faces (Phase 2 consumers) */
const CAPTION = `font-family:${F.body},sans-serif;font-weight:800;color:${T.inkSoft};white-space:nowrap;line-height:1`;

function dotRowCard({ n, dot = 16, gap = 8, perRow = 10, boxW = 44, remW = 36, remLabel }) {
  if (!posInt(n) || n > 20) throw new Error(`dotRowCard: n must be 1..20 (got ${n})`);
  if (typeof remLabel !== 'string' || !remLabel.trim()) throw new Error('dotRowCard: remLabel (the leftover literal) is required');
  const pitch = dot + gap, r = dot / 2;
  const rows = Math.ceil(n / perRow);
  const svgW = perRow * pitch - gap, svgH = rows * pitch - gap;   // a row of 10 = 232, two rows = 40 (design §3)
  const dots = [];
  for (let i = 0; i < n; i++) dots.push(circle({ cx: (i % perRow) * pitch + dot / 2, cy: Math.floor(i / perRow) * pitch + dot / 2, r, fill: T.teal }));
  const panel = `<div data-lcs-dots data-lcs-n="${n}" style="display:flex;justify-content:center;align-items:center;min-height:52px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;padding:4px;box-sizing:border-box">` +
    svgRoot({ width: svgW, height: svgH, label: '' }, dots.join(''), { 'aria-hidden': 'true', style: 'display:block' }) + `</div>`;
  const glyph = (t, col) => `<span data-lcs-eq style="font-family:${F.display},cursive;font-weight:700;font-size:22px;line-height:1;color:${col}">${t}</span>`;
  const rBox = `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px">` +
    blankBox({ w: remW, h: 40, attrs: 'data-lcs-role="r"' }) +
    `<span data-lcs-caption style="${CAPTION};font-size:12px;line-height:16px;height:16px">${esc(remLabel)}</span></span>`;
  const eq = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px">` +
    `<span data-lcs-num="${n}" style="${NUMERAL};height:44px;display:inline-flex;align-items:center">${n}</span>` + glyph('=', T.inkSoft) +
    blankBox({ w: boxW, h: 44, attrs: 'data-lcs-role="a"' }) + glyph('+', T.teal) + blankBox({ w: boxW, h: 44, attrs: 'data-lcs-role="b"' }) + glyph('+', T.teal) + rBox + `</div>`;
  return `<div data-lcs-proof data-lcs-n="${n}" style="display:flex;flex-direction:column;gap:10px">${panel}${eq}</div>`;
}

function pile({ n, src, iconPx, perRow, gapX, gapY, w }) {
  const icons = Array.from({ length: n }, () => `<img class="ws-icon" src="${esc(src)}" alt="" style="width:${iconPx}px;height:${iconPx}px">`).join('');
  return `<div data-lcs-pile data-lcs-n="${n}" style="display:flex;flex-wrap:wrap;gap:${gapY}px ${gapX}px;width:${w}px;flex:0 0 ${w}px;justify-content:flex-start;align-content:center">${icons}</div>`;
}

function shareLane({ n, src, names, leftoverLabel, pills = '', iconPx = 44, perRow = 6 }) {
  if (!posInt(n) || n > 12) throw new Error(`shareLane: n must be 1..12 (got ${n})`);
  if (!Array.isArray(names) || names.length !== 2 || names[0] === names[1]) throw new Error('shareLane: two DIFFERENT names');
  if (typeof leftoverLabel !== 'string' || !leftoverLabel.trim()) throw new Error('shareLane: leftoverLabel is required');
  const plate = (name) => `<span data-lcs-plate data-lcs-name="${esc(name)}" style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;width:64px;flex:0 0 64px">` +
    `<span style="font-family:${F.body},sans-serif;font-weight:800;font-size:14px;line-height:18px;height:18px;color:${T.ink};white-space:nowrap;max-width:64px;overflow:hidden">${esc(name)}</span>` +
    blankBox({ w: 56, h: 44, attrs: 'data-lcs-role="each"' }) + `</span>`;
  const left = `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;width:84px;flex:0 0 84px">` +
    `<span data-lcs-caption style="${CAPTION};font-size:14px;line-height:18px;height:18px">${esc(leftoverLabel)}</span>` + blankBox({ w: 44, h: 44, attrs: 'data-lcs-role="r"' }) + `</span>`;
  return `<div class="ws-lane" data-lcs-share data-lcs-n="${n}" data-ws-content style="padding:4px 16px;display:flex;align-items:center;gap:12px;min-width:0">` +
    pile({ n, src, iconPx, perRow, gapX: 4, gapY: 6, w: perRow * iconPx + (perRow - 1) * 4 }) +
    `<span style="display:inline-flex;align-items:center;gap:8px">${plate(names[0])}${plate(names[1])}${left}</span>${pills}</div>`;
}

function countLane({ n, src, pairsLabel, pills = '', iconPx = 44, perRow = 9 }) {
  if (!posInt(n) || n > 18) throw new Error(`countLane: n must be 1..18 (got ${n})`);
  if (typeof pairsLabel !== 'string' || !pairsLabel.trim()) throw new Error('countLane: pairsLabel is required');
  const col = `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;width:56px;flex:0 0 56px">` +
    `<span data-lcs-caption style="${CAPTION};font-size:14px;line-height:18px;height:18px">${esc(pairsLabel)}</span>` + blankBox({ w: 56, h: 44, attrs: 'data-lcs-role="pairs"' }) + `</span>`;
  return `<div class="ws-lane" data-lcs-count data-lcs-n="${n}" data-ws-content style="padding:4px 16px;display:flex;align-items:center;gap:12px;min-width:0">` +
    pile({ n, src, iconPx, perRow, gapX: 7, gapY: 6, w: perRow * iconPx + (perRow - 1) * 7 }) + col + pills + `</div>`;
}

function placeValueRow({ digits, boxW = 48 }) {
  if (!Array.isArray(digits) || digits.length !== 2 || digits.some((d) => !Number.isInteger(d) || d < 0 || d > 9)) throw new Error('placeValueRow: digits = [tens, ones], each 0..9');
  if (digits[0] === 0) throw new Error('placeValueRow: a leading 0 (numbers are 10..99)');
  const v = digits[0] * 10 + digits[1];
  const box = (d, hi) => `<span${hi ? ' data-lcs-highlight' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:${boxW}px;height:${boxW}px;box-sizing:border-box;border-radius:8px;` +
    (hi ? `background:${T.coralSoft};border:2.5px solid ${T.coral};` : `background:${T.white};border:2px solid ${T.grid};`) +
    `font-family:${F.display},cursive;font-weight:700;font-size:30px;line-height:1;color:${T.ink}">${d}</span>`;
  return `<span data-lcs-pv data-lcs-val="${v}" style="display:inline-flex;align-items:center;gap:4px">${box(digits[0], false)}${box(digits[1], true)}</span>`;
}

function tickPair({ keys = ['even', 'odd'], correct, size = 44, gap = 10 }) {
  if (!Array.isArray(keys) || keys.length !== 2 || keys[0] === keys[1] || keys.some((k) => k !== 'odd' && k !== 'even')) throw new Error('tickPair: keys = a permutation of [even, odd]');
  if (!keys.includes(correct)) throw new Error('tickPair: correct must be one of the keys');
  return `<span data-lcs-ticks style="display:inline-flex;align-items:center;gap:${gap}px">` +
    keys.map((k) => `<span class="ws-chip" data-lcs-tick="${k}"${k === correct ? ' data-lcs-correct="1"' : ''} style="width:${size}px;height:${size}px;flex:0 0 ${size}px"></span>`).join('') + `</span>`;
}

function ruleStrip({ text, px = 15 }) {
  if (typeof text !== 'string' || !text.trim()) throw new Error('ruleStrip: text is required');
  return `<div class="ws-lane" data-lcs-rule data-ws-content style="padding:8px 16px;text-align:center;font-family:${F.body},sans-serif;font-weight:800;font-size:${px}px;line-height:20px;color:${T.ink}">${esc(text)}</div>`;
}

const TABLE_ROWS = { ee: ['even', 'even', 'even'], oo: ['odd', 'odd', 'even'], eo: ['even', 'odd', 'odd'] };
function parityTable({ chips, order = ['ee', 'oo', 'eo'] }) {
  if (!chips || typeof chips.odd !== 'string' || typeof chips.even !== 'string') throw new Error('parityTable: chips {odd, even}');
  if (!Array.isArray(order) || order.length !== 3 || new Set(order).size !== 3 || order.some((k) => !TABLE_ROWS[k])) throw new Error('parityTable: order = a permutation of ee|oo|eo');
  const rows = order.map((k) => { const [x, y, z] = TABLE_ROWS[k]; return `<div data-lcs-trow="${k}" style="height:24px;line-height:24px">${esc(chips[x])} + ${esc(chips[y])} = ${esc(chips[z])}</div>`; }).join('');
  return `<div class="ws-lane" data-lcs-table data-ws-content style="padding:8px 16px;width:max-content;margin:0 auto;font-family:${F.display},cursive;font-weight:700;font-size:16px;color:${T.ink};text-align:center">${rows}</div>`;
}

module.exports = { chipStrip, houseBin, workedTile, pairDots, houseHeight, HOUSE_LAYOUT: LAYOUT, HOUSE_BOXES: BOXES, dotRowCard, shareLane, countLane, placeValueRow, tickPair, ruleStrip, parityTable };
