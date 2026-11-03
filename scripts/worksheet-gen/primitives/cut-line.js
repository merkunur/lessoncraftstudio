/**
 * cut-line.js — the scissor-skills line (makers 2026-11-02; NEW-TEMPLATES B4 T1). trace-path's stroke generators drawn
 * as a line to CUT along, not to trace: one heavy dashed line with the scissors glyph at its start (no start dot, no
 * arrow — the scissors are the start and point the way), and the simple shapes a child cuts out at level 3.
 *
 *   cutLane({ stroke, w, h, n, amp, width }) → { svg }   one strip: scissors + the dashed line across w
 *   cutShape({ shape, s, width, inner })     → { svg }   a shape's dashed outline in an s × s box, scissors at its start;
 *                                                          `inner` = svg markup drawn inside (the picture to cut out)
 * Every svg stamps data-lcs-cut (the stroke or shape key); the line is the only <path> carrying data-lcs-cut-line.
 */
'use strict';
const tokens = require('./_tokens.js');
const { el, svgRoot } = require('./_svg.js');
const { STROKES } = require('./trace-path.js');

const INK = tokens.color.ink;
const SCISSORS_W = 46;   // the room the glyph takes at a strip's start

/** the scissors glyph centred at (x, y), the blades pointing along angleDeg (0 = to the right) */
function scissors(x, y, size, angleDeg) {
  const s = size, c = tokens.color.teal;
  const ring = (cy) => el('circle', { cx: (-0.34 * s).toFixed(1), cy: (cy * s).toFixed(1), r: (0.15 * s).toFixed(1), fill: '#FFFFFF', stroke: c, 'stroke-width': 2.6 });
  const blade = (y0, y1) => el('path', { d: `M ${(-0.22 * s).toFixed(1)} ${(y0 * s).toFixed(1)} L ${(0.5 * s).toFixed(1)} ${(y1 * s).toFixed(1)}`, stroke: c, 'stroke-width': 3, 'stroke-linecap': 'round', fill: 'none' });
  return el('g', { 'data-lcs-scissors': '1', transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(angleDeg || 0).toFixed(1)})` },
    [blade(-0.13, 0.13), blade(0.13, -0.13), ring(-0.2), ring(0.2), el('circle', { cx: (0.04 * s).toFixed(1), cy: 0, r: (0.045 * s).toFixed(1), fill: c })].join(''));
}

const linePath = (d, width) => el('path', { d, fill: 'none', stroke: INK, 'stroke-width': width, 'stroke-dasharray': `${(width * 2.8).toFixed(1)} ${(width * 1.9).toFixed(1)}`, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round', 'data-lcs-cut-line': '1' });

/** one cutting strip: the scissors at the left, the dashed line from just right of them across the lane */
function cutLane({ stroke, w, h, n = 3, amp, width = 4 }) {
  const gen = STROKES[stroke];
  if (!gen || ['loops', 'spiral', 'eight', 'rain', 'plus', 'slash', 'backslash', 'cross', 'circles', 'squares', 'triangles', 'diamonds'].includes(stroke)) {
    throw new Error(`cut-line: "${stroke}" is not a line a child can cut (one continuous stroke, no loops)`);
  }
  const x0 = SCISSORS_W, lw = w - x0 - 6;
  const { d, startAngle } = gen({ w: lw, cy: h / 2, amp: amp || Math.min(h * 0.26, 24), n });
  const m = d.match(/^M\s*([\d.-]+)\s+([\d.-]+)/);
  const sy = parseFloat(m[2]);
  const body = el('g', { transform: `translate(${x0} 0)` }, linePath(d, width)) + scissors(x0 / 2, sy, 32, Math.max(-35, Math.min(35, startAngle || 0)));
  return { svg: svgRoot({ width: w, height: h, label: `cutting line: ${stroke}` }, body, { 'data-lcs-cut': stroke, 'data-lcs-prim': 'cut-line' }) };
}

/** the outline of a simple shape in an s × s box (start point first, drawn the way the scissors go) */
function shapePath(shape, s) {
  const c = s / 2, m = s * 0.1;
  if (shape === 'circle') { const r = c - m; return { d: `M ${c} ${m} A ${r} ${r} 0 1 0 ${c} ${s - m} A ${r} ${r} 0 1 0 ${c} ${m} Z`, start: [c, m], angle: 180 }; }
  if (shape === 'square') return { d: `M ${m} ${m} L ${s - m} ${m} L ${s - m} ${s - m} L ${m} ${s - m} Z`, start: [m, m], angle: 0 };
  if (shape === 'triangle') return { d: `M ${c} ${m} L ${s - m} ${s - m} L ${m} ${s - m} Z`, start: [c, m], angle: 63 };
  if (shape === 'diamond') return { d: `M ${c} ${m} L ${s - m} ${c} L ${c} ${s - m} L ${m} ${c} Z`, start: [c, m], angle: 45 };
  throw new Error(`cut-line: no shape "${shape}"`);
}

/** a shape to cut out: its dashed outline, the scissors at the start pointing along the outline, `inner` inside */
function cutShape({ shape, s, width = 4, inner = '' }) {
  const p = shapePath(shape, s);
  const a = p.angle * Math.PI / 180;
  // the glyph sits just OUTSIDE the start, behind the cut (so its blades point along the line, not across the shape)
  const gx = p.start[0] - Math.cos(a) * 22, gy = p.start[1] - Math.sin(a) * 22;
  const body = linePath(p.d, width) + inner + scissors(gx, gy, 30, p.angle);
  return { svg: svgRoot({ width: s, height: s, label: `cutting shape: ${shape}` }, body, { 'data-lcs-cut': shape, 'data-lcs-prim': 'cut-shape', style: 'overflow:visible' }) };
}

module.exports = { cutLane, cutShape, shapePath, scissors, SCISSORS_W };
