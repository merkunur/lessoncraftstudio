/**
 * fractionShape — partitioned/shaded fraction model primitive (SVG).
 * params: { shape: 'circle'|'bar'|'square', d, shaded, size=120, equal=true }
 * equal:false renders deliberately UNEQUAL parts (for equal-vs-unequal types).
 * meta: { d, shaded, equal }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, roundedRect } = require('./_svg.js');

function circleShape({ d, shaded, size, equal }, t) {
  const c = size / 2, r = c - 4;
  const parts = [];
  if (d === 1) {
    parts.push(el('circle', { cx: c, cy: c, r, fill: shaded >= 1 ? t.color.tealSoft : t.color.white, stroke: t.color.teal, 'stroke-width': 3, 'data-lcs-part': 1, 'data-lcs-shaded': shaded >= 1 ? 1 : 0 }));
  } else {
    // sector angles: equal slices, or skewed slices when equal:false
    let angles = [];
    if (equal) {
      for (let k = 0; k <= d; k++) angles.push((k / d) * 2 * Math.PI - Math.PI / 2);
    } else {
      // skew: first slice gets 1.8 shares, rest split the remainder
      const shares = [1.8, ...Array(d - 1).fill((d - 1.8) / (d - 1))];
      let acc = -Math.PI / 2;
      angles = [acc];
      shares.forEach((s) => { acc += (s / d) * 2 * Math.PI; angles.push(acc); });
    }
    for (let k = 0; k < d; k++) {
      const a1 = angles[k], a2 = angles[k + 1];
      const large = a2 - a1 > Math.PI ? 1 : 0;
      const isShaded = k < shaded;
      parts.push(el('path', {
        d: `M ${c} ${c} L ${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)} A ${r} ${r} 0 ${large} 1 ${c + r * Math.cos(a2)} ${c + r * Math.sin(a2)} Z`,
        fill: isShaded ? t.color.tealSoft : t.color.white,
        stroke: t.color.teal, 'stroke-width': 2.5, 'stroke-linejoin': 'round',
        'data-lcs-part': 1, 'data-lcs-shaded': isShaded ? 1 : 0,
      }));
    }
  }
  return parts.join('');
}

function barShape({ d, shaded, size, equal }, t) {
  const W = size * 1.5, H = size * 0.42;
  const parts = [];
  let widths;
  if (equal) widths = Array(d).fill(W / d);
  else {
    const shares = [1.8, ...Array(d - 1).fill((d - 1.8) / (d - 1))];
    widths = shares.map((s) => (s / d) * W);
  }
  let x = 0;
  for (let k = 0; k < d; k++) {
    const isShaded = k < shaded;
    parts.push(roundedRect({
      x: x + 1.5, y: 1.5, w: widths[k] - 3, h: H - 3, r: 3,
      fill: isShaded ? t.color.tealSoft : t.color.white,
      strokeColor: t.color.teal, strokeWidth: 2.5,
      data: { 'data-lcs-part': 1, 'data-lcs-shaded': isShaded ? 1 : 0 },
    }));
    x += widths[k];
  }
  return parts.join('');
}

function squareShape({ d, shaded, size, equal }, t) {
  // grid partition: 2→2x1, 3→3x1, 4→2x2, 6→3x2, 8→4x2, 9→3x3
  const grids = { 2: [2, 1], 3: [3, 1], 4: [2, 2], 6: [3, 2], 8: [4, 2], 9: [3, 3] };
  const [gc, gr] = grids[d] || [d, 1];
  const parts = [];
  const cw = size / gc, ch = size / gr;
  let k = 0;
  for (let r = 0; r < gr; r++) {
    for (let c = 0; c < gc; c++) {
      const isShaded = k < shaded;
      parts.push(roundedRect({
        x: c * cw + 1.5, y: r * ch + 1.5, w: cw - 3, h: ch - 3, r: 2,
        fill: isShaded ? t.color.tealSoft : t.color.white,
        strokeColor: t.color.teal, strokeWidth: 2.5,
        data: { 'data-lcs-part': 1, 'data-lcs-shaded': isShaded ? 1 : 0 },
      }));
      k++;
    }
  }
  return parts.join('');
}

function fractionShape({ shape = 'circle', d, shaded = 0, size = 120, equal = true }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  if (shaded > d) throw new Error(`fractionShape: shaded ${shaded} > d ${d}`);
  let inner, W = size, H = size;
  if (shape === 'circle') inner = circleShape({ d, shaded, size, equal }, t);
  else if (shape === 'bar') { inner = barShape({ d, shaded, size, equal }, t); W = size * 1.5; H = size * 0.42; }
  else inner = squareShape({ d, shaded, size, equal }, t);
  return {
    svg: svgRoot({ width: W, height: H, label: `${shaded} of ${d} parts shaded` },
      inner, { 'data-lcs-prim': 'fraction', 'data-lcs-d': d, 'data-lcs-shadedn': shaded, 'data-lcs-equal': equal ? 1 : 0 }),
    meta: { d, shaded, equal },
    width: W,
    height: H,
  };
}

module.exports = fractionShape;
