/**
 * number-bond — part-part-whole bond diagram (SVG). The iconic K-1 visual:
 * a grand WHOLE circle on top, two PART circles below, connected by short
 * struts. The missing slot renders with the house dashed-coral "act here"
 * convention (mirrors .ws-pattern-slot--blank). Optional subitizing dots
 * inside the whole at K difficulty 1.
 *
 * { whole, a, b, blank:'a'|'b'|'whole'|null, size, dots } → { svg }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, circle, el, line } = require('./_svg.js');

function bondCircle({ cx, cy, r, value, isBlank, fs }) {
  const parts = [circle({
    cx, cy, r,
    fill: tokens.color.white,
    strokeColor: isBlank ? tokens.color.coral : tokens.color.teal,
    strokeWidth: isBlank ? 2.5 : 3,
    data: isBlank
      ? { 'stroke-dasharray': '7 5', 'data-lcs-blank': '1', 'data-lcs-answer': value }
      : { 'data-lcs-value': value },
  })];
  if (!isBlank) {
    parts.push(el('text', {
      x: cx, y: cy,
      'font-family': tokens.font.display, 'font-size': fs, 'font-weight': 700,
      fill: tokens.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central',
    }, String(value)));
  }
  return parts.join('');
}

/** Subitizing dot cluster (≤10) tucked under the whole's numeral. */
function subDots({ cx, cy, n, r = 4.5 }) {
  const perRow = 5;
  const rows = Math.ceil(n / perRow);
  const parts = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / perRow);
    const inRow = Math.min(perRow, n - row * perRow);
    const col = i % perRow;
    const x = cx + (col - (inRow - 1) / 2) * (r * 2 + 3);
    const y = cy + row * (r * 2 + 3);
    parts.push(circle({ cx: x, cy: y, r, fill: tokens.color.coral }));
  }
  return parts.join('');
}

function numberBond({ whole, a, b, blank = null, size = 210, dots = false }) {
  if (a + b !== whole) throw new Error(`number-bond: ${a}+${b} != ${whole}`);
  const w = size, h = Math.round(size * 0.86);
  const rW = Math.round(size * 0.225);   // whole radius
  const rP = Math.round(size * 0.175);   // part radius
  const cxW = w / 2, cyW = rW + 4;
  const cxA = w * 0.24, cxB = w * 0.76;
  const cyP = h - rP - 4;

  const strut = (x2, y2) => {
    // trim the strut to circle edges
    const dx = x2 - cxW, dy = y2 - cyW;
    const len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    return line({
      x1: cxW + ux * rW, y1: cyW + uy * rW,
      x2: x2 - ux * rP, y2: y2 - uy * rP,
      strokeColor: tokens.color.teal, strokeWidth: 3,
    });
  };

  const fsW = Math.round(rW * 0.95);
  const fsP = Math.round(rP * 0.95);
  const parts = [
    strut(cxA, cyP), strut(cxB, cyP),
    bondCircle({ cx: cxW, cy: cyW, r: rW, value: whole, isBlank: blank === 'whole', fs: dots && blank !== 'whole' ? Math.round(fsW * 0.8) : fsW }),
    bondCircle({ cx: cxA, cy: cyP, r: rP, value: a, isBlank: blank === 'a', fs: fsP }),
    bondCircle({ cx: cxB, cy: cyP, r: rP, value: b, isBlank: blank === 'b', fs: fsP }),
  ];
  if (dots && blank !== 'whole') {
    parts.push(subDots({ cx: cxW, cy: cyW + rW * 0.45, n: whole }));
  }
  return {
    svg: svgRoot({ width: w, height: h, label: `number bond ${a}+${b}=${whole}` }, parts.join(''),
      { 'data-lcs-prim': 'number-bond', 'data-lcs-whole': whole, 'data-lcs-a': a, 'data-lcs-b': b, 'data-lcs-blankslot': blank || 'none' }),
    width: w, height: h,
  };
}

module.exports = numberBond;
