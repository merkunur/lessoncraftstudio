/**
 * components-b5/plants.js — the G1-376 `plants` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-376-plants.md §2 "NEW templates/components-b5/plants.js").
 * Pure markup on the tokens; the SPEC composes, stamps and guards.
 *
 * BASE (built 2026-09-23):
 *   plantTagStage({ parts, anchorPick, numbers, h=600, w=380 })
 *     the tall plant (primitives/plant-figure.js plantFigure, ground 'box') centred
 *     in a w x h cell, one coral numbered tag per part on a thread to its ring.
 *     Returns { html, anchors (px, relative to the stage), tagSlots, offsetX }.
 *   plantLabelCard({ rows, rowH=64, glyphH=30, boxW=205, cardW=279 })
 *     a cream .ws-card: per row [teal ring badge 40 + Baloo 22 numeral][10][.ws-blankbox boxW x rowH
 *     holding writingRow({w: boxW-6, h: rowH-6, glyphH, xHeight:true})]; rows empty; data-lcs-row-n.
 *   plantBank({ words:[{id, word}], wordPx=18 })   -> components-b2 wordBank (data-lcs-bank = part id)
 *
 * FACES (Phase 2, 2026-09-23; record _work/G1-376-faces.md), prefixed `plant` (see below):
 *   plantNeedUnit (F1) · plantCycleRing + plantCycleStrip (F2; G1-377 may import the ring) ·
 *   plantEatCard (F3) · plantFillStage + plantJobCard(+Height) (F4) · plantFlowerFillStage + plantFlowerInset +
 *   plantLabelGrid(+Height) (F5). F4/F5 FILL the body (the figure grows with CSS meet; the cards stretch / pin).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { plantFigure, plantStage, flowerSection, plantPartIcon, ANCHORS: PLANT_ANCHORS, FLOWER_ANCHORS: FLOWER_ANCH, VB_W: PLANT_VB_W, VB_H: PLANT_VB_H } = require('../../primitives/plant-figure.js');
const { wordBank } = require('../components-b2.js');

const T = tokens.color;
const F = tokens.font;
const BADGE = 40, BADGE_GAP = 10, ROW_GAP = 14, CARD_PAD = 12, CARD_BORDER = 2;

function plantTagStage({ parts, anchorPick = {}, numbers, h = 600, w = 380 }) {
  const tags = parts.map((p) => ({ part: p, n: numbers[p], pick: anchorPick[p] || 0 }));
  const fig = plantFigure({ stage: 'full', ground: 'box', h, tags });
  const offsetX = (w - fig.width) / 2;
  const anchors = {}, tagSlots = {};
  for (const p of parts) {
    anchors[p] = { x: +(fig.anchors[p].x + offsetX).toFixed(1), y: fig.anchors[p].y };
    tagSlots[p] = { x: +(fig.tagSlots[p].x + offsetX).toFixed(1), y: fig.tagSlots[p].y };
  }
  const html = `<div data-lcs-plant-stage data-lcs-offset-x="${offsetX.toFixed(1)}" style="position:relative;width:${w}px;height:${h}px;flex:0 0 ${w}px">` +
    `<div style="position:absolute;left:${offsetX.toFixed(1)}px;top:0">${fig.svg}</div></div>`;
  return { html, anchors, tagSlots, offsetX, scale: fig.scale };
}

function rowBadge(n) {
  return svgRoot({ width: BADGE, height: BADGE, label: 'number ' + n },
    el('circle', { cx: 20, cy: 20, r: 18, fill: T.white, stroke: T.teal, 'stroke-width': 3 }) +
    el('text', { x: 20, y: 21, 'font-family': `${F.display}, cursive`, 'font-size': 22, 'font-weight': 700, fill: T.teal, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, String(n)),
    { 'data-lcs-row-badge': n, style: 'display:block;flex:0 0 auto' });
}

function plantLabelCardHeight({ rows, rowH }) { return rows * rowH + (rows - 1) * ROW_GAP + 2 * CARD_PAD + 2 * CARD_BORDER; }

function plantLabelCard({ rows, rowH = 64, glyphH = 30, boxW = 205, cardW = 279 }) {
  const inner = rows.map((n) =>
    `<div data-lcs-card-row="${n}" style="display:flex;align-items:center;gap:${BADGE_GAP}px;height:${rowH}px">` + rowBadge(n) +
    `<span class="ws-blankbox" data-lcs-row-n="${n}" style="width:${boxW}px;height:${rowH}px;flex:0 0 ${boxW}px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center">` +
    writingRow({ w: boxW - 6, h: rowH - 6, glyphH, xHeight: true }).svg + `</span></div>`).join('');
  return `<div class="ws-card" data-lcs-label-card style="width:${cardW}px;box-sizing:border-box;flex:0 0 auto;gap:${ROW_GAP}px;padding:${CARD_PAD}px;border-radius:16px;border-width:${CARD_BORDER}px">${inner}</div>`;
}

function plantBank({ words, wordPx = 18 }) {
  return wordBank({ words: words.map((w) => ({ word: w.word, vocabKey: w.id })), wordPx });
}

/* ================================================================ FACES (Phase 2, 2026-09-23)
 * Names carry a `plant` prefix (the design file's needUnit / cycleRing / cycleStrip / eatCard /
 * jobCard / flowerStage): components-b5.js refuses a duplicate export and nine sibling families
 * build concurrently (G1-377 draws a cycle too), so a bare `cycleRing` risked a namespace clash. */
const { scissorsGlyph, cutLines, blankNumeralBox } = require('../components-b3.js');
const { esc } = require('../../primitives/_svg.js');

/* ---------------------------------------------------------------- F1 needs (K) */
/** Crop a plantStage svg to a viewBox window and re-size it to height h (the pot fills its card). */
function cropStage(svg, [x0, y0, w0, h0], h) {
  const w = +(h * w0 / h0).toFixed(1);
  return {
    svg: svg.replace(/ width="[\d.]+"/, ` width="${w}"`).replace(/ height="[\d.]+"/, ` height="${h}"`).replace(/viewBox="[^"]*"/, `viewBox="${x0} ${y0} ${w0} ${h0}"`),
    width: w, height: h,
  };
}
const POT_CROP = [30, 60, 140, 176];
/**
 * A teal arrow WITH A SHAFT pointing toward the pot ("the plant gets this"). A bare chevron was
 * tried first and READ AS MATHS: the render showed "sun > pot < drop" (greater-than / less-than).
 */
function giftArrow(dir) {
  const W = 24, y = 11;
  const [x0, x1] = dir > 0 ? [2, W - 3] : [W - 2, 3];
  const hx = dir > 0 ? x1 - 8 : x1 + 8;
  return svgRoot({ width: W, height: 22, label: '' },
    el('path', { d: `M ${x0} ${y} L ${hx} ${y}`, fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round' }) +
    el('polygon', { points: `${x1},${y} ${hx},${y - 6} ${hx},${y + 6}`, fill: T.teal, 'stroke-linejoin': 'round' }),
    { 'aria-hidden': 'true', 'data-lcs-gift-arrow': dir > 0 ? 'r' : 'l', style: 'display:block;flex:0 0 auto' });
}
/**
 * plantNeedUnit({ gifts:[{src,key},{src,key}], grows, potH=104, gift=64, w=300, h=120 })
 * a white card: [gift] > [the potted seedling, identical in every unit] < [gift]. `grows` is a
 * stamp only (never drawn: every seedling is byte-identical, no health cue).
 */
function plantNeedUnit({ gifts, grows, potH = 104, gift = 64, w = 300, h = 120, fill = false }) {
  if (!Array.isArray(gifts) || gifts.length !== 2) throw new Error('plantNeedUnit: two gifts');
  const pot = cropStage(plantStage({ stage: 'seedling', potted: true }).svg, POT_CROP, potH);
  const g = (x) => `<span data-lcs-gift="${esc(x.key)}" style="display:inline-flex;align-items:center;justify-content:center;width:${gift}px;height:${gift}px;flex:0 0 ${gift}px">` +
    `<img class="ws-icon" src="${x.src}" alt="" style="width:${gift}px;height:${gift}px;object-fit:contain"></span>`;
  return `<div data-lcs-need-unit data-lcs-gifts="${gifts.map((x) => esc(x.key)).join(',')}" data-lcs-grows="${grows ? 1 : 0}" ` +
    `style="box-sizing:border-box;width:${w}px;${fill ? `min-height:${h}px;align-self:stretch` : `height:${h}px`};flex:0 0 ${w}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:14px;` +
    `display:flex;align-items:center;justify-content:center;gap:8px">` +
    g(gifts[0]) + giftArrow(1) + `<span data-lcs-pot style="display:block;flex:0 0 auto">${pot.svg}</span>` + giftArrow(-1) + g(gifts[1]) + `</div>`;
}

/**
 * plantNeedRow({ n, kind, html, h, pad }) — F1: ONE row as a visible cream BAND (grid-line border, rounded)
 * holding its two pots, so "in each row" reads as five rows of two, not one 10-pot grid (landing review
 * 2026-09-23). The band is h tall; the pots inside are h - 2*pad.
 */
function plantNeedRow({ n, kind, html, h, pad = 8, fill = false }) {
  // fill: the band stretches to its minmax(h,1fr) grid track (no fixed height) and its two pot cards stretch with it
  return `<div data-lcs-need-row="${n}" data-lcs-kind="${esc(kind)}" data-lcs-block data-lcs-row-band style="box-sizing:border-box;display:flex;justify-content:center;align-items:center;gap:39px;${fill ? `min-height:${h}px` : `height:${h}px`};padding:${pad}px 10px;background:${T.cream};border:2px solid ${T.grid};border-radius:18px">${html}</div>`;
}

/* ---------------------------------------------------------------- F2 cycle (G1) */
/**
 * plantCycleRing({ stages, slot:[w,h]=[124,150], R=165, cx=337.5, W=675 })
 * n slots (w x h, dashed coral) at -90 + 360k/n degrees on a circle of radius R about (cx, cy);
 * slot 1 (top) holds stages[0] drawn (the GIVEN seed, a solid teal frame); slots 2..n are EMPTY
 * (data-lcs-slot=k, data-lcs-expect=stages[k-1]). Clockwise teal arrows run along the circle
 * between slot edges; the arrow from slot n back to slot 1 is data-lcs-arrow="return".
 * Returns { html, height }.
 */
function plantCycleRing({ stages, slot = [124, 150], R = 165, cx = 337.5, W = 675, gap = 5, head = 10 }) {
  const n = stages.length;
  if (n < 3) throw new Error('plantCycleRing: >= 3 stages');
  const [sw, sh] = slot;
  const ang = (k) => (-90 + 360 * k / n) * Math.PI / 180;
  // vertical extent: the top slot's top at y 0
  const ys = stages.map((_, k) => Math.sin(ang(k)) * R);
  const top = Math.min(...ys) - sh / 2, bot = Math.max(...ys) + sh / 2;
  const cy = -top, H = +(bot - top).toFixed(1);
  const C = stages.map((_, k) => ({ x: cx + Math.cos(ang(k)) * R, y: cy + Math.sin(ang(k)) * R }));
  const inside = (p, c, m) => Math.abs(p.x - c.x) <= sw / 2 + m && Math.abs(p.y - c.y) <= sh / 2 + m;
  const on = (a) => ({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
  const arrows = [];
  for (let k = 0; k < n; k++) {
    const k2 = (k + 1) % n, a0 = ang(k), a1 = a0 + 2 * Math.PI / n;
    let s = a0, e = a1;
    for (let t = a0; t <= a1; t += 0.0005) if (inside(on(t), C[k], gap)) s = t; else break;
    for (let t = a1; t >= a0; t -= 0.0005) if (inside(on(t), C[k2], gap)) e = t; else break;
    const len = R * (e - s);
    if (len < head + 10) throw new Error(`plantCycleRing: arrow ${k + 1}->${k2 + 1} is ${len.toFixed(1)} px (< ${head + 10})`);
    const eh = e - head / R;                          // the shaft stops where the head begins
    const p0 = on(s), p1 = on(eh), tip = on(e);
    const tg = { x: -Math.sin(e), y: Math.cos(e) };  // clockwise tangent at the tip
    const nn = { x: -tg.y, y: tg.x };
    const b = { x: tip.x - tg.x * head, y: tip.y - tg.y * head };
    const hw = head * 0.55;
    const f = (v) => v.toFixed(1);
    const id = k2 === 0 ? 'return' : String(k + 1);
    arrows.push(`<g data-lcs-arrow="${id}" data-lcs-from="${k + 1}" data-lcs-to="${k2 + 1}">` +
      el('path', { d: `M ${f(p0.x)} ${f(p0.y)} A ${R} ${R} 0 0 1 ${f(p1.x)} ${f(p1.y)}`, fill: 'none', stroke: T.teal, 'stroke-width': 3, 'stroke-linecap': 'round' }) +
      el('polygon', { points: `${f(tip.x)},${f(tip.y)} ${f(b.x + nn.x * hw)},${f(b.y + nn.y * hw)} ${f(b.x - nn.x * hw)},${f(b.y - nn.y * hw)}`, fill: T.teal, 'data-lcs-arrow-head': id }) + `</g>`);
  }
  const svg = svgRoot({ width: W, height: H, label: '' }, arrows.join(''), { 'aria-hidden': 'true', 'data-lcs-cycle-arrows': '1', style: 'position:absolute;left:0;top:0;display:block;overflow:visible' });
  const slots = stages.map((st, k) => {
    const x = C[k].x - sw / 2, y = C[k].y - sh / 2;
    const given = k === 0;
    const frame = given ? `border:3px solid ${T.teal};background:${T.white}` : `border:2.5px dashed ${T.coral};background:${T.white}`;
    const inner = given ? plantStage({ stage: st, w: sw - 8 }).svg : '';
    return `<div data-lcs-slot="${k + 1}" data-lcs-expect="${esc(st)}"${given ? ' data-lcs-given="1"' : ''} data-lcs-block ` +
      `style="position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${sw}px;height:${sh}px;box-sizing:border-box;${frame};border-radius:10px;display:flex;align-items:center;justify-content:center">${inner}</div>`;
  }).join('');
  return { html: `<div data-lcs-cycle-ring style="position:relative;width:${W}px;height:${H}px;margin:0 auto">${svg}${slots}</div>`, height: H, centres: C };
}
/**
 * plantCycleStrip({ stages, card:[w,h]=[124,150] }) — the scissors strip + the abutting cut cards
 * (the K-240 idiom: one dashed frame + dividers, no gutter), each card = plantStage(stage).
 */
function plantCycleStrip({ stages, card = [124, 150] }) {
  const [cw, ch] = card, w = cw * stages.length;
  const strip = `<div data-lcs-cut-strip data-lcs-block style="width:${w}px;height:30px;margin:0 auto;display:flex;align-items:center">${scissorsGlyph(26)}</div>`;
  const cards = stages.map((st) => `<div data-lcs-cut-card data-lcs-stage="${esc(st)}" style="width:${cw}px;height:${ch}px;flex:0 0 ${cw}px;display:flex;align-items:center;justify-content:center">${plantStage({ stage: st, w: cw - 8 }).svg}</div>`).join('');
  const sheet = `<div data-lcs-cut-sheet data-lcs-block style="position:relative;width:${w}px;height:${ch}px;margin:0 auto;display:flex;background:${T.white}">${cards}${cutLines({ w, h: ch, cols: stages.length, rows: 1 })}</div>`;
  return { html: `<div data-lcs-cycle-strip>${strip}${sheet}</div>`, height: 30 + ch };
}

/* ---------------------------------------------------------------- F3 eat (G2) */
/**
 * plantEatCard({ src, food, answer, chips:[{part, word}], pic=96, chipW=150, chipH=38, chipPx=17, w=312, h=150 })
 * [the food picture, NO name][12][three part chips: plantPartIcon + the part word]. The answer is a stamp only.
 */
function plantEatCard({ src, food, answer, chips, pic = 96, chipW = 150, chipH = 38, chipPx = 17, w = 312, h = 150, chipGap = 6, fill = false }) {
  const chipHtml = chips.map((c, i) => `<span data-lcs-chip="${esc(c.part)}" data-lcs-chip-slot="${i}" style="box-sizing:border-box;display:flex;align-items:center;gap:6px;width:${chipW}px;height:${chipH}px;flex:0 0 ${chipH}px;` +
    `padding:0 8px 0 5px;background:${T.white};border:1.5px solid ${T.teal};border-radius:10px;overflow:hidden">` +
    plantPartIcon({ part: c.part, size: 32 }).svg +
    `<span data-lcs-chip-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:${chipPx}px;line-height:1;color:${T.ink};white-space:nowrap;overflow:hidden">${esc(c.word)}</span></span>`).join('');
  return `<div class="ws-card" data-lcs-eat-card data-lcs-food="${esc(food)}" data-lcs-part="${esc(answer)}" data-lcs-block ` +
    `style="box-sizing:border-box;width:${w}px;${fill ? `min-height:${h}px` : `height:${h}px`};padding:10px 12px;flex-direction:row;align-items:center;justify-content:center;gap:12px">` +
    `<span data-lcs-eat-pic style="display:flex;align-items:center;justify-content:center;width:${pic + 12}px;height:${pic + 12}px;flex:0 0 ${pic + 12}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;box-sizing:border-box">` +
    `<img class="ws-icon" src="${src}" alt="" style="width:${pic}px;height:${pic}px;object-fit:contain"></span>` +
    `<div data-lcs-chips style="display:flex;flex-direction:column;gap:${chipGap}px">${chipHtml}</div></div>`;
}

/* ---------------------------------------------------------------- F4 jobs (G2) */
/**
 * plantJobCard({ jobs:[{part, text}], box:[52,48], textPx=17, lineH=22, rowH=76, rowGap=12, w=345 })
 * a cream card: per row [an EMPTY numeral box][10][the job sentence]; data-lcs-job=<part>.
 */
function plantJobCard({ jobs, box = [52, 48], textPx = 17, lineH = 22, rowH = 76, rowGap = 12, w = 345, fill = false }) {
  const textW = w - 2 * CARD_PAD - 2 * CARD_BORDER - box[0] - 10;
  // fill: the card stretches to its grid row and the rows share the height (rowH is the MINIMUM)
  const rowSize = fill ? `flex:1 1 0;min-height:${rowH}px` : `height:${rowH}px`;
  const rows = jobs.map((j) => `<div data-lcs-job="${esc(j.part)}" style="display:flex;align-items:center;gap:10px;${rowSize}">` +
    blankNumeralBox({ w: box[0], h: box[1], attrs: 'data-lcs-job-box' }) +
    `<span data-lcs-job-text style="display:block;width:${textW}px;font-family:${F.body},sans-serif;font-weight:700;font-size:${textPx}px;line-height:${lineH}px;color:${T.ink}">${esc(j.text)}</span></div>`).join('');
  return `<div class="ws-card" data-lcs-job-card data-lcs-block data-lcs-fill style="width:${w}px;box-sizing:border-box;flex:0 0 auto;gap:${rowGap}px;padding:${CARD_PAD}px;border-radius:16px;border-width:${CARD_BORDER}px${fill ? ';height:100%' : ''}">${rows}</div>`;
}
function plantJobCardHeight({ rows, rowH = 76, rowGap = 12 }) { return rows * rowH + (rows - 1) * rowGap + 2 * CARD_PAD + 2 * CARD_BORDER; }

/* ---------------------------------------------------------------- F5 flower (G3) */
/**
 * plantFlowerStage({ labels, numbers, h=418, w=380 }) — the cut-away flower (flowerSection) with one
 * coral tag per label; plantFlowerInset({ h=180 }) — the whole flowering plant, no soil, a teal
 * dashed ring round its flower ("this is the part we look at"), NO tag.
 */
/**
 * FILL stages (coordinator review 2026-09-23: "a short face grows its elements to fill, never floats a
 * small stage"). The figure is DRAWN at its minimum height h (so every px-sized mark, tags / rings /
 * strokes, is at least its design size) and then GROWS with the body: the svg fills its grid cell with
 * preserveAspectRatio xMidYMin meet (top-anchored, centred). Anchors are returned in VIEWBOX units with
 * the viewBox, so verify() maps them through the rendered box at whatever size the chrome left.
 */
function fillSvg(svg) {
  return svg.replace(/ width="[\d.]+"/, ' width="100%"').replace(/ height="[\d.]+"/, ' height="100%"')
    .replace(/style="display:block(;overflow:visible)?"/, 'preserveAspectRatio="xMidYMin meet" style="display:block;overflow:visible;position:absolute;left:0;top:0;width:100%;height:100%"');
}
function plantFillStage({ parts, anchorPick = {}, numbers, h }) {
  const fig = plantFigure({ stage: 'full', ground: 'box', h, tags: parts.map((p) => ({ part: p, n: numbers[p], pick: anchorPick[p] || 0 })) });
  const anchorsU = {};
  for (const p of parts) { const a = PLANT_ANCHORS[p][anchorPick[p] || 0]; anchorsU[p] = { x: a.x, y: a.y }; }
  return { html: `<div data-lcs-plant-stage data-lcs-block style="position:relative;height:100%;min-height:${h}px">${fillSvg(fig.svg)}</div>`, anchorsU, vb: { x: 0, y: 0, w: PLANT_VB_W, h: PLANT_VB_H } };
}
function plantFlowerFillStage({ labels, numbers, h, vbTop = 0 }) {
  const fig = flowerSection({ h, vbTop, tags: labels.map((p) => ({ part: p, n: numbers[p] })) });
  const anchorsU = {};
  for (const p of labels) anchorsU[p] = { x: FLOWER_ANCH[p].x, y: FLOWER_ANCH[p].y };
  return { html: `<div data-lcs-flower-stage data-lcs-block style="position:relative;height:100%;min-height:${h}px">${fillSvg(fig.svg)}</div>`, anchorsU, vb: { x: 0, y: vbTop, w: 400, h: 440 - vbTop } };
}
/** plantLabelGrid — the label card laid out in `cols` columns (column-major: 1-3 | 4-5), for a card under a hero figure. */
function plantLabelGridHeight({ rows, rowH, cols = 2 }) { const r = Math.ceil(rows / cols); return r * rowH + (r - 1) * ROW_GAP + 2 * CARD_PAD + 2 * CARD_BORDER; }
function plantLabelGrid({ rows, rowH = 64, glyphH = 26, boxW = 205, cols = 2, colGap = 28 }) {
  const per = Math.ceil(rows.length / cols);
  const inner = rows.map((n) =>
    `<div data-lcs-card-row="${n}" style="display:flex;align-items:center;gap:${BADGE_GAP}px;height:${rowH}px">` + rowBadge(n) +
    `<span class="ws-blankbox" data-lcs-row-n="${n}" style="width:${boxW}px;height:${rowH}px;flex:0 0 ${boxW}px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center">` +
    writingRow({ w: boxW - 6, h: rowH - 6, glyphH, xHeight: true }).svg + `</span></div>`).join('');
  return `<div class="ws-card" data-lcs-label-card data-lcs-block data-lcs-fill style="box-sizing:border-box;display:grid;grid-auto-flow:column;grid-template-rows:repeat(${per},${rowH}px);column-gap:${colGap}px;row-gap:${ROW_GAP}px;padding:${CARD_PAD}px;border-radius:16px;border-width:${CARD_BORDER}px">${inner}</div>`;
}
function plantFlowerInset({ h = 180, ringR = 62, beside = false }) {
  const fig = plantFigure({ stage: 'flowering', ground: 'none', h, ring: { cx: 160, cy: 64, r: ringR } });
  // a FRAMED picture set to the left (not under the section's stalk): the first render put it straight
  // below the cut-away and the stalk read as running on into the little plant.
  const pad = 8;
  if (beside) return { html: `<div data-lcs-inset data-lcs-block style="box-sizing:border-box;padding:${pad}px ${pad + 6}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;display:flex;justify-content:center">${fig.svg}</div>`, height: h + 2 * pad + 4, width: fig.width + 2 * pad + 16 };
  return { html: `<div data-lcs-inset data-lcs-block style="box-sizing:border-box;align-self:flex-start;margin-left:28px;padding:${pad}px ${pad + 6}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;display:flex;justify-content:center">${fig.svg}</div>`, height: h + 2 * pad + 4, width: fig.width + 2 * pad + 16 };
}

module.exports = {
  plantTagStage, plantLabelCard, plantLabelCardHeight, plantBank,
  plantNeedUnit, plantNeedRow, plantCycleRing, plantCycleStrip, plantEatCard, plantJobCard, plantJobCardHeight, plantFillStage, plantFlowerFillStage, plantFlowerInset, plantLabelGrid, plantLabelGridHeight,
};

