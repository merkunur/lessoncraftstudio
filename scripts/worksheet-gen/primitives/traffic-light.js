/**
 * traffic-light.js — the K-369 `road-safety` signal head on its pole, pure SVG
 * in px from `lampD` (the bin.js convention: no viewBox scaling). Design:
 * docs/worksheet-gen/b5-designs/K-369-road-safety.md §2 "NEW primitives/
 * traffic-light.js".
 *
 *   trafficLight({ kind: 'car'|'ped', lamps: 3|2, on: null|index, fill: 'lit'|'none',
 *                  pedStyle: 'vienna'|'mutcd', pedStop: 'standing'|'hand',
 *                  amberToken: 'codeYellow'|'codeOrange', lampD = 56, poleLen = 6,
 *                  top = 0 })
 *     -> { svg, w, h, meta: { kind, lamps, on, headTop, housing } }
 *
 * GEOMETRY (px). The svg is housingW + 24 wide (a 12 px ray zone each side) and
 * top + housingH + poleLen tall; the housing sits at x 12, y `top`.
 *   car      housing w lampD + 16, h 3·lampD + 12 + 16; lamp i circle r lampD/2,
 *            centre (w/2, 8 + lampD/2 + i·(lampD + 6)); index 0 = TOP.
 *   ped 2    housing w lampD + 20, h 2·lampD + 6 + 24; lamp i a rounded square
 *            side lampD r 10 at (10, 12 + i·(lampD + 6)).
 *   ped 3    (it) housing w lampD + 20, h 3·lampD + 12 + 16 (the car padding).
 *   housing  fill creamDeep, stroke teal 3, radius 0.3·lampD.
 *   pole     w 10 teal, centred, from the housing bottom down `poleLen`.
 *   unlit    lamp white, stroke teal 2; a ped lamp carries its glyph (0.8·lampD
 *            box, road-pictogram) in ink OUTLINE (2 px).
 *   lit      car: codeRed / amberToken / codeGreen by index. ped vienna: the
 *            glyph filled codeRed (index 0) / codeGreen (last), field white.
 *            ped mutcd (en, MUTCD 4I): index 0 = the HAND filled codeOrange;
 *            the last = the lamp field ink with a WHITE walker (lunar white).
 *   rays     the colour-free "on" mark: 3 per side at −30°, 0°, +30°, centred
 *            on the lit lamp's y, starting 2 px outside the housing edge,
 *            length 10, stroke ink 3, round caps. Never inside the housing.
 *   fill:'none' (F1) every lamp white; the on lamp is marked ONLY by rays (ped:
 *            its glyph outline 2.5 instead of 2).
 * Stamps: `<g data-lcs-signal data-lcs-light="car|ped" data-lcs-lamps>`, lamps
 * `<g data-lcs-lamp data-lcs-index data-lcs-on>`, rays `<g data-lcs-rays
 * data-lcs-for>`, `data-lcs-light-part="housing|pole"`. The gate
 * (qa/verify-b5-traffic-light.js) never reads `data-lcs-on` or `meta`: it finds
 * the ray group, the lamp centre the rays are centred on, and its y order.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { glyphGroup } = require('./road-pictogram.js');

const T = tokens.color;
const C = tokens.codeColors;
const RAY_ZONE = 12, RAY_GAP = 2, RAY_LEN = 10, RAY_W = 3;
const fmt = (n) => (Math.round(n * 100) / 100).toString();

function housingSize(kind, lamps, D) {
  if (kind === 'car') return { w: D + 16, h: 3 * D + 12 + 16 };
  if (lamps === 2) return { w: D + 20, h: 2 * D + 6 + 24 };
  return { w: D + 20, h: 3 * D + 12 + 16 };
}
/** Lamp i's box (px, housing-local). */
function lampBox(kind, lamps, D, i) {
  if (kind === 'car') return { x: 8, y: 8 + i * (D + 6), w: D, h: D };
  if (lamps === 2) return { x: 10, y: 12 + i * (D + 6), w: D, h: D };
  return { x: 10, y: 8 + i * (D + 6), w: D, h: D };
}

/**
 * Rays RADIATE from the lamp centre (lx, cy): each ray lies on the line through
 * the centre at −30° / 0° / +30° from horizontal, starts where that line is
 * RAY_GAP px outside the housing edge `ex`, and runs RAY_LEN px outward. (Rays
 * that all started at the edge point met in a tiny arrowhead that read as "an
 * arrow pointing at the lamp" in the first contact sheet; radiating from the
 * centre spreads them ±22 px at lampD 56 — a glow, still clear of the neighbour
 * lamps because every ray is outside the housing.)
 */
function rays(side, ex, lx, cy) {
  const out = [];
  const dx0 = Math.abs(ex - lx) + RAY_GAP;
  for (const deg of [-30, 0, 30]) {
    const a = deg * Math.PI / 180;
    const t0 = dx0 / Math.cos(a);
    const x0 = lx + side * dx0, y0 = cy + Math.sin(a) * t0;
    const x1 = lx + side * (t0 + RAY_LEN) * Math.cos(a), y1 = cy + Math.sin(a) * (t0 + RAY_LEN);
    out.push(el('line', { x1: fmt(x0), y1: fmt(y0), x2: fmt(x1), y2: fmt(y1), stroke: T.ink, 'stroke-width': RAY_W, 'stroke-linecap': 'round' }));
  }
  return out.join('');
}

function trafficLight({ kind = 'car', lamps, on = null, fill = 'lit', pedStyle = 'vienna', pedStop, amberToken = 'codeYellow', lampD = 56, poleLen = 6, top = 0, data = {} } = {}) {
  if (!['car', 'ped'].includes(kind)) throw new Error(`traffic-light: kind "${kind}"`);
  if (lamps == null) lamps = kind === 'car' ? 3 : 2;
  if (kind === 'car' && lamps !== 3) throw new Error('traffic-light: a car light has 3 lamps');
  if (kind === 'ped' && ![2, 3].includes(lamps)) throw new Error(`traffic-light: a pedestrian light has 2 or 3 lamps, not ${lamps}`);
  if (!['lit', 'none'].includes(fill)) throw new Error(`traffic-light: fill "${fill}"`);
  if (on !== null && !(Number.isInteger(on) && on >= 0 && on < lamps)) throw new Error(`traffic-light: on ${on} outside 0..${lamps - 1}`);
  if (!['codeYellow', 'codeOrange'].includes(amberToken)) throw new Error(`traffic-light: amberToken "${amberToken}"`);
  if (!['vienna', 'mutcd'].includes(pedStyle)) throw new Error(`traffic-light: pedStyle "${pedStyle}"`);
  if (kind === 'ped' && !['standing', 'hand'].includes(pedStop)) throw new Error(`traffic-light: pedStop "${pedStop}" (a panel must SET it)`);
  if (kind === 'ped' && lamps === 3 && on === 1) throw new Error('traffic-light: the middle pedestrian lamp is never on');
  const D = lampD;
  const hs = housingSize(kind, lamps, D);
  const W = hs.w + 2 * RAY_ZONE, H = top + hs.h + poleLen;
  const hx = RAY_ZONE, hy = top;
  const parts = [];
  parts.push(el('g', { 'data-lcs-light-part': 'pole' }, el('rect', { x: fmt(W / 2 - 5), y: fmt(hy + hs.h - 2), width: 10, height: fmt(poleLen + 2), fill: T.teal })));
  parts.push(el('g', { 'data-lcs-light-part': 'housing' }, el('rect', { x: hx, y: hy, width: hs.w, height: hs.h, rx: fmt(0.3 * D), ry: fmt(0.3 * D), fill: T.creamDeep, stroke: T.teal, 'stroke-width': 3 })));
  const carFill = (i) => (i === 0 ? C.codeRed : i === 1 ? C[amberToken] : C.codeGreen);
  const scale = 0.8 * D / 100;
  for (let i = 0; i < lamps; i++) {
    const b = lampBox(kind, lamps, D, i);
    const x = hx + b.x, y = hy + b.y, cx = x + D / 2, cy = y + D / 2;
    const isOn = on === i;
    const lit = isOn && fill === 'lit';
    const inner = [];
    if (kind === 'car') {
      inner.push(el('circle', { cx: fmt(cx), cy: fmt(cy), r: fmt(D / 2), fill: lit ? carFill(i) : T.white, stroke: T.teal, 'stroke-width': 2, 'data-lcs-lamp-shape': 'circle' }));
    } else {
      const last = lamps - 1;
      const pose = i === 0 ? pedStop : i === last ? 'walking' : 'standing';
      const darkField = lit && pedStyle === 'mutcd' && i === last;
      inner.push(el('rect', { x: fmt(x), y: fmt(y), width: D, height: D, rx: 10, ry: 10, fill: darkField ? T.ink : T.white, stroke: T.teal, 'stroke-width': 2, 'data-lcs-lamp-shape': 'square' }));
      let g;
      if (!lit) {
        const sw = (isOn ? 2.5 : 2) / scale;
        g = glyphGroup({ pose, outline: true, strokeW: fmt(sw), data: { glyph: '1' } });
      } else if (pedStyle === 'mutcd') {
        g = glyphGroup({ pose, fill: i === 0 ? C.codeOrange : T.white, data: { glyph: '1' } });
      } else {
        g = glyphGroup({ pose, fill: i === 0 ? C.codeRed : C.codeGreen, data: { glyph: '1' } });
      }
      inner.push(el('g', { transform: `translate(${fmt(cx - 0.4 * D)} ${fmt(cy - 0.4 * D)}) scale(${fmt(scale * 10000) / 10000})` }, g));
    }
    parts.push(el('g', { 'data-lcs-lamp': '1', 'data-lcs-index': i, 'data-lcs-on': isOn ? '1' : '0' }, inner.join('')));
    if (isOn) parts.push(el('g', { 'data-lcs-rays': '1', 'data-lcs-for': i }, rays(-1, hx, cx, cy) + rays(1, hx + hs.w, cx, cy)));
  }
  const a = { 'data-lcs-signal': '1', 'data-lcs-light': kind, 'data-lcs-lamps': lamps };
  for (const [k, v] of Object.entries(data)) a['data-lcs-' + k] = v;
  const svg = svgRoot({ width: fmt(W), height: fmt(H), label: kind === 'car' ? 'traffic light' : 'pedestrian light' }, el('g', a, parts.join('')), { style: 'display:block;overflow:visible' });
  return { svg, w: W, h: H, meta: { kind, lamps, on, headTop: top, housing: { x: hx, y: hy, w: hs.w, h: hs.h } } };
}

module.exports = { trafficLight, housingSize, lampBox, RAY_ZONE, RAY_GAP, RAY_LEN };
