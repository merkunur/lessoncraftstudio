/**
 * components-b5/earth-and-space.js — the G1-378 `earth-and-space` base
 * components (design docs/worksheet-gen/b5-designs/G1-378-earth-and-space.md §2
 * "NEW templates/components-b5/earth-and-space.js"). Inline CSS only (no page.css
 * edit); token colours only.
 *
 * BASE (built 2026-09-23) — "the Sky Chart":
 *   skyHead({body, name, box, pillPx})   one body drawn at honest relative size
 *                                        (sky-bodies.js) over its name pill
 *   factRow({n, id, body, text, cfg, zebra})  one numbered fact + three EMPTY tick boxes
 *   skyChart({heads, rows, cfg})         the white chart card: a head row of the three
 *                                        bodies, then the fact rows; every row is the
 *                                        same 6-column grid (badge | gap | fact | 3 x body)
 * The face components the design names (moonRail, growCue, phaseCard,
 * dayNightModel, pinTable, orbitFan, planetBankCard, sizeBins) land with the
 * faces (Phase E) in this same file.
 */
'use strict';
const T = require('../../primitives/_tokens.js');
const { esc, svgRoot, el } = require('../../primitives/_svg.js');
const SB = require('../../primitives/sky-bodies.js');
const { blankNumeralBox } = require('../components-b3.js');
const { answerBox } = require('../components.js');

const C = T.color;
const COLS = (cfg) => `${cfg.badge}px ${cfg.badgeGap}px minmax(0,1fr) ${cfg.col}px ${cfg.col}px ${cfg.col}px`;

/** The body drawing for a head box: Sun = the box, Earth = box / 2, Moon = box x 26 / 88 (the design's 88 / 44 / 26). */
function bodyDrawing(body, box, sunDiscR = 34) {
  if (body === 'sun') return SB.sunDisc({ d: box, discR: sunDiscR }).svg;
  if (body === 'earth') return SB.earthDisc({ d: +(box / 2).toFixed(2) }).svg;
  if (body === 'moon') return SB.moonDisc({ d: +(box * 26 / 88).toFixed(2) }).svg;
  throw new Error(`earth-and-space skyHead: unknown body "${body}"`);
}

/** A head: the drawing box (bodies bottom-aligned) + 6 + a name pill (h 30, teal ring 2, nowrap, <= col - 4). */
function skyHead({ body, name, box, pillPx = 17, colW = 92, sunDiscR }) {
  const pill = `<span class="es-pill" data-lcs-pill="${esc(body)}" style="box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;height:30px;` +
    `max-width:${colW}px;padding:0 8px;background:${C.white};border:2px solid ${C.teal};border-radius:999px;font-family:'Baloo 2',sans-serif;font-weight:700;` +
    `font-size:${pillPx}px;line-height:1;color:${C.ink};white-space:nowrap;overflow:hidden">${esc(name)}</span>`;
  return `<div class="es-head" data-lcs-head="${esc(body)}" style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;padding-bottom:4px;min-width:0">` +
    `<div class="es-draw" style="height:${box}px;width:100%;display:flex;align-items:flex-end;justify-content:center">${bodyDrawing(body, box, sunDiscR)}</div>${pill}</div>`;
}

/** One fact row: badge | gap | the fact | three empty tick boxes (one per body column). */
function factRow({ n, id, body, text, cfg, zebra }) {
  const bg = zebra ? C.creamDeep : C.white;
  const sep = `border-left:1.5px solid ${C.grid};`;
  const tick = (b, i) => `<div class="es-tickcell" style="display:flex;align-items:center;justify-content:center;${i ? sep : ''}">` +
    blankNumeralBox({ w: cfg.tick, h: cfg.tick, attrs: `data-lcs-tick="${b}"` }) + `</div>`;
  return `<div class="es-row" data-lcs-row="${n}" data-lcs-fact="${esc(id)}" data-lcs-body="${esc(body)}" style="display:grid;grid-template-columns:${COLS(cfg)};` +
    `align-items:stretch;flex:1 1 0;min-height:${cfg.rowMin}px;background:${bg}">` +
    `<div style="display:flex;align-items:center;justify-content:center"><span class="es-badge" style="box-sizing:border-box;display:flex;align-items:center;justify-content:center;` +
    `width:${cfg.badge}px;height:${cfg.badge}px;border:2px solid ${C.teal};border-radius:50%;background:${C.white};font-family:'Baloo 2',sans-serif;font-weight:700;font-size:17px;line-height:1;color:${C.ink}">${n}</span></div>` +
    `<div></div>` +
    `<div style="display:flex;align-items:center;min-width:0"><p class="es-fact" data-lcs-fact-text style="margin:0;font-family:'Nunito',sans-serif;font-weight:800;font-size:${cfg.factPx}px;line-height:1.2;color:${C.ink}">${esc(text)}</p></div>` +
    ['sun', 'earth', 'moon'].map(tick).join('') + `</div>`;
}

/** The chart card: head row + fact rows. `heads` = [{body, name}] in order sun, earth, moon; `rows` = [{n, id, body, text}]. */
function skyChart({ heads, rows, cfg }) {
  const pillPx = (name) => ([...name].length * 0.56 * 17 + 16 > cfg.col - 4 ? 15 : 17);   // est.; the render gate measures the pill (<= col, no clip)
  const sep = `border-left:1.5px solid ${C.grid};`;
  const headRow = `<div class="es-headrow" style="display:grid;grid-template-columns:${COLS(cfg)};flex:0 0 ${cfg.headH}px;height:${cfg.headH}px;border-bottom:2px solid ${C.creamDeep}">` +
    `<div></div><div></div><div></div>` +
    heads.map((h, i) => `<div style="display:flex;justify-content:center;${i ? sep : ''}">${skyHead({ body: h.body, name: h.name, box: cfg.headBox, pillPx: pillPx(h.name), colW: cfg.col - 4, sunDiscR: cfg.sunDiscR })}</div>`).join('') + `</div>`;
  const body = rows.map((r, i) => factRow({ ...r, cfg, zebra: i % 2 === 1 })).join('');
  return `<div class="es-chart" style="box-sizing:border-box;flex:1 1 auto;min-height:0;display:flex;flex-direction:column;background:${C.white};` +
    `border:2px solid ${C.creamDeep};border-radius:16px;padding:8px;overflow:hidden">${headRow}${body}</div>`;
}

/* ============================================================== FACES (Phase E, 2026-09-23)
 * Every face drawing is sized by CSS custom properties the spec derives from the BODY height
 * (container-type:size on the face root; lin(a, b) = a px at the 677 chrome, b px at the 811
 * one, clamped). An emitted SVG keeps its own width / height ATTRIBUTES (what the gate
 * rasterises); only its DISPLAYED box follows the variable, so the geometry never changes
 * with the chrome, and every floor holds at the smallest (677) body. */
const { moonPhase } = require('../../primitives/moon-phase.js');
const { planetGlyph } = require('../../primitives/planets.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { wordBank, rulingBlock } = require('../components-b2.js');

const H0 = 677, H1 = 811;
/** A length that is `a` px at the 677 body and `b` px at the 811 body, linear between, clamped. */
function lin(a, b) {
  const k = (b - a) / (H1 - H0), c = a - k * H0;
  return `clamp(${Math.min(a, b)}px, calc(${(k * 100).toFixed(4)}cqh + ${c.toFixed(2)}px), ${Math.max(a, b)}px)`;
}
/** Re-size an emitted <svg>'s DISPLAY box (its attributes stay as emitted). */
const sized = (svg, css) => svg.replace(/^<svg /, `<svg style="${css}" `);
const r2 = (x) => Math.round(x * 100) / 100;

/** The face root: an outer size container (so cqh = the body height) + an inner column carrying the variables. */
function faceRoot({ attrs, vars, inner, gap = '0px' }) {
  return `<div data-ws-content ${attrs} style="flex:1 1 auto;min-height:0;container-type:size;position:relative">` +
    `<div class="es-face" style="${vars}height:100%;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:${gap}">${inner}</div></div>`;
}

/* ---------- F1 Moon Phases in Order ---------- */
/** growCue: an abstract wedge that WIDENS left -> right ('grow') or NARROWS ('shrink') above a coral
 *  arrow in reading order. Never a moon inside (it would print the rail's first / last shape). */
function growCue({ dir }) {
  if (dir !== 'grow' && dir !== 'shrink') throw new Error(`earth-and-space growCue: dir "${dir}"`);
  const wedge = dir === 'grow' ? 'M 3 17 L 117 3 L 117 31 Z' : 'M 3 3 L 117 17 L 3 31 Z';
  const parts = [
    el('path', { d: wedge, fill: C.tealSoft, stroke: C.teal, 'stroke-width': 3, 'stroke-linejoin': 'round', 'data-lcs-part': 'wedge' }),
    el('line', { x1: 4, y1: 42, x2: 104, y2: 42, stroke: C.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'data-lcs-part': 'arrow' }),
    el('path', { d: 'M 102 35 L 117 42 L 102 49 Z', fill: C.coral, 'data-lcs-part': 'arrow-head' }),
  ];
  return sized(svgRoot({ width: 120, height: 50, viewBox: '0 0 120 50', label: '' }, parts, { 'data-lcs-cue': dir }), 'width:var(--es-cw);height:auto;display:block');
}
/** moonRail: one white card = the cue + five moon slots, each a moon over an EMPTY numeral box
 *  (hidden data-lcs-answer = the moon's place 1..5 in the rail's order). */
function moonRail({ n, cue, slots, hemisphere, d, forceAnswerBox }) {
  const cells = slots.map((s, i) => {
    const moon = sized(moonPhase({ phase: s.phase, hemisphere, d }).svg, 'width:var(--es-md);height:var(--es-md);display:block');
    const box = forceAnswerBox
      ? answerBox({ w: 56, h: 52, answer: undefined })
      : blankNumeralBox({ w: 56, h: 52, answer: String(s.answer), attrs: `data-lcs-box="${i + 1}"` }).replace(/width:56px;height:52px;flex:0 0 56px/, 'width:var(--es-bw);height:var(--es-bh);flex:0 0 auto');
    return `<div class="es-slot" data-lcs-slotcol="${i + 1}" style="display:flex;flex-direction:column;align-items:center;gap:var(--es-g2);width:var(--es-md)">${moon}${box}</div>`;
  }).join('');
  return `<div class="es-rail" data-lcs-rail="${n}" data-lcs-cue="${cue}" data-lcs-frame style="box-sizing:border-box;width:100%;flex:0 0 auto;background:${C.white};border:2px solid ${C.creamDeep};border-radius:16px;` +
    `padding:var(--es-p) 18px;display:flex;flex-direction:column;gap:var(--es-g1)">` +
    `<div class="es-cuebox" style="display:flex">${growCue({ dir: cue })}</div>` +
    `<div class="es-slots" style="display:flex;justify-content:space-between;align-items:flex-start">${cells}</div></div>`;
}

/* ---------- F2 Name the Moon Phases ---------- */
/** phaseBank: the four phase names (components-b2 wordBank; data-lcs-bank = the phase id). */
function phaseBank({ names, order }) {
  return wordBank({ words: order.map((p) => ({ word: names[p], vocabKey: String(p) })), wordPx: 18 });
}
/** phaseCard: a creamDeep square holding one moon, beside two EMPTY writing lines. */
function phaseCard({ n, phase, hemisphere, d, lineW, lineH, glyphH }) {
  const moon = sized(moonPhase({ phase, hemisphere, d }).svg, 'width:var(--es-md);height:var(--es-md);display:block');
  return `<div class="es-pcard" data-lcs-card="${n}" data-lcs-phase="${phase}" data-lcs-frame style="box-sizing:border-box;min-height:0;display:flex;align-items:center;justify-content:center;gap:14px;` +
    `padding:10px;background:${C.white};border:2px solid ${C.creamDeep};border-radius:14px">` +
    `<div class="es-psq" style="flex:0 0 auto;width:var(--es-sq);height:var(--es-sq);background:${C.creamDeep};border-radius:12px;display:flex;align-items:center;justify-content:center">${moon}</div>` +
    `<div data-lcs-lines style="flex:0 0 auto">${rulingBlock({ rows: 2, w: lineW, h: lineH, glyphH, gap: 6 })}</div></div>`;
}

/* ---------- F3 Why Do We Have Day and Night? ---------- */
/** dayNightModel: the Sun cut by the panel edge (its rays re-aimed at the VISIBLE limb), three
 *  coral light arrows, ONE Earth seen from above the North Pole with numbered pins. Nothing marks
 *  which half is lit — the child decides that from where the Sun is. */
function dayNightModel({ sunDir, r, pins, sunH, shade }) {
  const R = Math.max(sunH, (sunH * sunH / 4 + 96 * 96) / 192) + 20;
  const ang = Math.asin(150 / (R + 30)) * 180 / Math.PI;   // the outer rays stay 150 px off the middle: inside the smallest (380) panel
  const sun = SB.sunEdge({ side: sunDir, w: 130, h: sunH, depth: 96, rayDeg: [-ang, -ang / 2, 0, ang / 2, ang].map((x) => r2(x)), asPath: true });
  let esvg = SB.earthTop({ r, sunDir, pins, spin: 'ring' }).svg;
  if (shade) {   // poison seam only (PR7): a night half drawn over the Earth
    const Cc = r + 20, x0 = sunDir === 'left' ? Cc : Cc - r;
    esvg = esvg.replace(/(data-lcs-part="disc"\/>)/, `$1<rect x="${x0}" y="${Cc - r}" width="${r}" height="${2 * r}" fill="${C.inkSoft}" data-lcs-part="night"/>`);
  }
  const x1 = sunDir === 'left' ? '2%' : '98%', x2 = sunDir === 'left' ? '90%' : '10%';
  const arrows = [26, 50, 74].map((y) => `<line x1="${x1}" y1="${y}%" x2="${x2}" y2="${y}%" stroke="${C.coral}" stroke-width="4" stroke-dasharray="12 8" marker-end="url(#es-light-head)" data-lcs-light-ray=""/>`).join('');
  const light = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-label="" data-lcs-light="" style="display:block;overflow:visible">` +
    `<defs><marker id="es-light-head" markerWidth="4" markerHeight="4" refX="1" refY="2" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 4 2 L 0 4 Z" fill="${C.coral}"/></marker></defs>${arrows}</svg>`;
  return `<div class="es-model" data-lcs-model data-lcs-sundir="${sunDir}" data-lcs-frame style="box-sizing:border-box;width:100%;height:var(--es-ph);flex:0 0 auto;display:flex;flex-direction:${sunDir === 'left' ? 'row' : 'row-reverse'};align-items:center;` +
    `background:${C.white};border:2px solid ${C.creamDeep};border-radius:16px;overflow:hidden">` +
    `<div data-lcs-sun-wrap style="flex:0 0 130px;height:100%;overflow:hidden">${sun.svg.replace(/^<svg /, `<svg style="display:block;width:130px;height:100%" preserveAspectRatio="${sunDir === 'left' ? 'xMinYMid' : 'xMaxYMid'} slice" `)}</div>` +
    `<div style="flex:1 1 60px;min-width:60px;height:100%;margin:0 12px">${light}</div>` +
    `<div data-lcs-earth-wrap style="flex:0 0 auto;width:var(--es-ew);margin:0 24px">${sized(esvg, 'width:100%;height:auto;display:block')}</div></div>`;
}
/** pinTable: 2 columns x 3 rows; a row = the pin's numeral badge + the Day and Night words (same order every row, unmarked). */
function pinTable({ rows, words }) {
  const row = (rw) => `<div class="es-pinrow" data-lcs-pinrow="${rw.n}" data-lcs-answer="${rw.answer}" style="display:flex;align-items:center;gap:8px">` +
    `<span class="es-pinbadge" style="box-sizing:border-box;flex:0 0 auto;width:34px;height:34px;border-radius:50%;background:${C.coral};color:${C.white};display:flex;align-items:center;justify-content:center;` +
    `font-family:'Baloo 2',sans-serif;font-weight:700;font-size:18px;line-height:1">${rw.n}</span>` +
    ['day', 'night'].map((k) => `<span class="ws-achip" data-lcs-chip="${k}" style="width:112px;height:var(--es-ch);font-size:20px">${esc(words[k])}</span>`).join('') + `</div>`;
  const col = (list) => `<div style="display:flex;flex-direction:column;gap:var(--es-rg)">${list.map(row).join('')}</div>`;
  const half = Math.ceil(rows.length / 2);
  return `<div class="es-pintable" data-lcs-pin-table data-lcs-frame style="box-sizing:border-box;align-self:center;flex:0 0 auto;display:flex;background:${C.white};border:2px solid ${C.creamDeep};border-radius:14px;padding:var(--es-tp) 0">` +
    `<div style="padding:0 18px">${col(rows.slice(0, half))}</div><div style="padding:0 18px;border-left:2px solid ${C.creamDeep}">${col(rows.slice(half))}</div></div>`;
}

/* ---------- F4 Planets in Order from the Sun ---------- */
/** planetBankCard: a planet glyph (ONE size for all eight; never an answer target) over its printed name. */
function planetBankCard({ id, name }) {
  return `<div class="es-bankcard" data-lcs-bank-card="${id}" style="box-sizing:border-box;flex:1 1 0;min-width:0;height:var(--es-bch);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;` +
    `background:${C.white};border:2px solid ${C.creamDeep};border-radius:12px;padding:0">` +
    sized(planetGlyph({ id, box: 64 }).svg, 'width:var(--es-gb);height:var(--es-gb);display:block;flex:0 0 auto') +
    `<span data-lcs-bank-name="${id}" style="font-family:'Nunito',sans-serif;font-weight:800;font-size:16px;line-height:1.1;color:${C.ink};white-space:nowrap;max-width:100%;overflow:hidden">${esc(name)}</span></div>`;
}
/** Geometry of the orbit fan (pure). Sun centre (-40,-40); slot k at y_k = top + (k-1) pitch, on the orbit
 *  rho_k = 1.25 (y_k + 40) at x_k = -40 + 0.75 (y_k + 40); its line starts at x_k + 30. */
function fanGeometry({ slots = 8, pitch, top = 120, W = 639 }) {
  const H = top + (slots - 1) * pitch + 28;
  const rows = [];
  for (let k = 1; k <= slots; k++) {
    const y = top + (k - 1) * pitch, x = -40 + 0.75 * (y + 40), rho = 1.25 * (y + 40);
    rows.push({ k, x, y, rho, lineX: x + 30, lineW: W - (x + 30) });
  }
  return { W, H, rows };
}
/** orbitFan: the Sun in the top-left corner, eight IDENTICAL numbered orbit discs outward, one writing line each
 *  (hidden data-lcs-answer = the planet id). An orbit arc runs only from its disc down-left to the panel edge. */
function orbitFan({ slots, pitch, discD, glyphH, answers, top = 120 }) {
  const g = fanGeometry({ slots, pitch, top });
  const sunRays = [25, 45, 65].map((deg) => { const a = deg * Math.PI / 180; return el('line', { x1: r2(-40 + 120 * Math.cos(a)), y1: r2(-40 + 120 * Math.sin(a)), x2: r2(-40 + 140 * Math.cos(a)), y2: r2(-40 + 140 * Math.sin(a)), stroke: C.coral, 'stroke-width': 4, 'stroke-linecap': 'round', 'data-lcs-part': 'ray' }); });
  const arcs = g.rows.map((r) => {
    const a0 = Math.atan2(r.y + 40, r.x + 40) + Math.asin((discD / 2 + 5) / r.rho);
    const aX = Math.acos(Math.min(1, 40 / r.rho));                                        // leaves by the left edge (x = 0)
    const aY = (g.H + 40) / r.rho >= 1 ? Infinity : Math.asin((g.H + 40) / r.rho);         // or by the bottom edge (y = H)
    const a1 = Math.min(aX, aY);
    const p = (a) => `${r2(-40 + r.rho * Math.cos(a))} ${r2(-40 + r.rho * Math.sin(a))}`;
    return el('path', { d: `M ${p(a0)} A ${r2(r.rho)} ${r2(r.rho)} 0 0 1 ${p(a1)}`, fill: 'none', stroke: C.grid, 'stroke-width': 1.5, 'stroke-dasharray': '6 6', 'data-lcs-orbit': r.k });
  });
  const sunX = r2(-40 + Math.sqrt(110 * 110 - 40 * 40));
  const discs = g.rows.map((r) => SB.orbitDisc({ d: discD, n: r.k }).svg.replace(/^<svg /, `<svg x="${r2(r.x - discD / 2)}" y="${r2(r.y - discD / 2)}" `));
  const lines = g.rows.map((r, i) => `<g data-lcs-slot="${r.k}" data-lcs-answer="${esc(answers[i])}">` +
    writingRow({ w: r2(r.lineW), h: 44, glyphH }).svg.replace(/^<svg /, `<svg x="${r2(r.lineX)}" y="${r2(r.y - 22)}" `) + `</g>`);
  const parts = [
    // the Sun = the visible quarter of a disc at (-40,-40) r 110, drawn as a path (a clipped circle keeps a bounding box that leaves the page)
    ...arcs, el('path', { d: `M 0 0 L ${sunX} 0 A 110 110 0 0 1 0 ${sunX} Z`, fill: C.coral, 'data-lcs-part': 'sun' }), ...sunRays,
    ...discs, ...lines,
  ];
  return sized(svgRoot({ width: g.W, height: g.H, label: '' }, parts, { 'data-lcs-fan': '', 'data-lcs-pitch': pitch, 'data-lcs-top': top }), 'height:var(--es-fh);width:auto;max-width:100%;display:block;flex:0 0 auto;align-self:center');
}

/* ---------- F5 Giant and Rocky Planets ---------- */
/** sizeBank: the ten names (8 planets + the Sun + the Moon); hidden data-lcs-class = the size class. */
function sizeBank({ items }) {
  const words = items.map((it) => `<span class="ws-bankword" style="font-size:18px;padding:var(--es-bp) 14px" data-lcs-size-word="${esc(it.id)}" data-lcs-class="${it.cls}"><span>${esc(it.word)}</span></span>`).join('');
  return `<div class="ws-scene-banner ws-bank" data-lcs-bank-banner style="box-sizing:border-box;margin-bottom:0;flex:0 0 auto">${words}</div>`;
}
/** The three ABSTRACT header glyphs: an outline circle d 54 (giant) / d 24 (rocky) / d 40 crossed (not a planet).
 *  No ring, no band, no planet picture (a drawn planet size would print the answer). */
function sizeGlyph(key) {
  const ring = (rr) => el('circle', { cx: 30, cy: 30, r: rr, fill: 'none', stroke: C.teal, 'stroke-width': 3, 'data-lcs-part': 'size-ring' });
  const parts = key === 'giant' ? [ring(27)] : key === 'rocky' ? [ring(12)] : [ring(20), el('line', { x1: 13, y1: 47, x2: 47, y2: 13, stroke: C.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'data-lcs-part': 'cross' })];
  return sized(svgRoot({ width: 60, height: 60, viewBox: '0 0 60 60', label: '' }, parts, { 'data-lcs-size-glyph': key }), 'width:var(--es-hg);height:var(--es-hg);display:block;flex:0 0 auto');
}
/** sizeBins: three bins, each an abstract size glyph + its label + the SAME number of empty lines. */
function sizeBins({ bins, lines, lineW, lineH, glyphH }) {
  const bin = (b) => `<div class="es-bin" data-lcs-bin="${b.key}" data-lcs-frame style="box-sizing:border-box;flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;` +
    `background:${C.white};border:3px solid ${C.teal};border-radius:16px;padding:10px 6px var(--es-pb)">` +
    `<div class="es-binhead" style="display:flex;flex-direction:column;align-items:center;gap:4px">${sizeGlyph(b.key)}` +
    `<span data-lcs-bin-label="${b.key}" style="font-family:'Baloo 2',sans-serif;font-weight:700;font-size:18px;line-height:1.15;color:${C.teal};text-align:center;max-width:${lineW}px">${esc(b.label)}</span></div>` +
    Array.from({ length: b.lines === undefined ? lines : b.lines }, (_, i) => `<div data-lcs-bin-line="${i + 1}">${writingRow({ w: lineW, h: lineH, glyphH, xHeight: true }).svg}</div>`).join('') + `</div>`;
  return `<div class="es-bins" style="display:flex;gap:12px;width:100%;flex:1 1 auto;min-height:0">${bins.map(bin).join('')}</div>`;
}

module.exports = { skyHead, factRow, skyChart, lin, faceRoot, growCue, moonRail, phaseBank, phaseCard, dayNightModel, pinTable, planetBankCard, fanGeometry, orbitFan, sizeBank, sizeGlyph, sizeBins };
