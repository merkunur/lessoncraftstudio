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
const { esc } = require('../../primitives/_svg.js');
const SB = require('../../primitives/sky-bodies.js');
const { blankNumeralBox } = require('../components-b3.js');

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

module.exports = { skyHead, factRow, skyChart };
