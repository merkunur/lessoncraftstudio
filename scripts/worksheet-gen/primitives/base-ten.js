/**
 * baseTenBlocks — place-value blocks primitive (SVG).
 * params: { h=0, t=0, o=0, unit=13 } → hundred-flats (10×10), ten-rods (1×10),
 * unit cubes, laid out left-to-right with wrapping columns for rods/units.
 * meta: { h, t, o, value }
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, roundedRect, el } = require('./_svg.js');

function flat(x, y, u, t) {
  const parts = [roundedRect({ x, y, w: u * 10, h: u * 10, r: 3, fill: t.color.tealSoft, strokeColor: t.color.teal, strokeWidth: 2.5, data: { 'data-lcs-block': 'hundred' } })];
  for (let k = 1; k < 10; k++) {
    parts.push(el('line', { x1: x + k * u, y1: y, x2: x + k * u, y2: y + u * 10, stroke: t.color.teal, 'stroke-width': 0.8, opacity: 0.5 }));
    parts.push(el('line', { x1: x, y1: y + k * u, x2: x + u * 10, y2: y + k * u, stroke: t.color.teal, 'stroke-width': 0.8, opacity: 0.5 }));
  }
  return parts.join('');
}

function rod(x, y, u, t) {
  const parts = [roundedRect({ x, y, w: u, h: u * 10, r: 2, fill: t.color.tealSoft, strokeColor: t.color.teal, strokeWidth: 2, data: { 'data-lcs-block': 'ten' } })];
  for (let k = 1; k < 10; k++) {
    parts.push(el('line', { x1: x, y1: y + k * u, x2: x + u, y2: y + k * u, stroke: t.color.teal, 'stroke-width': 0.8, opacity: 0.5 }));
  }
  return parts.join('');
}

function unitCube(x, y, u, t) {
  return roundedRect({ x, y, w: u, h: u, r: 2, fill: t.color.coralSoft, strokeColor: t.color.coral, strokeWidth: 2, data: { 'data-lcs-block': 'one' } });
}

function baseTenBlocks({ h = 0, t: tens = 0, o = 0, unit = 13, pile = false }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const u = unit;
  // a pile of loose ones only (the bundling faces, Year pages D): columns of five, as high as five cubes and not as
  // a ten rod, with a gap wide enough for the pencil ring that bundles ten of them
  if (pile) {
    const g = Math.max(5, Math.round(u * 0.3)), parts = [];
    for (let i = 0; i < o; i++) { const col = Math.floor(i / 5), row = i % 5; parts.push(unitCube(4 + col * (u + g + 2), 4 + (4 - row) * (u + g), u, t)); }
    const W = 8 + Math.ceil(o / 5) * (u + g + 2) - (g + 2), Hp = 8 + 5 * u + 4 * g;
    return { svg: svgRoot({ width: W, height: Hp, label: `${o} loose ones` }, parts.join(''), { 'data-lcs-prim': 'base-ten', 'data-lcs-h': 0, 'data-lcs-t': 0, 'data-lcs-o': o }), meta: { h: 0, t: 0, o, value: o }, width: W, height: Hp };
  }
  const gap = u * 1.2;
  let x = 4;
  const parts = [];
  const H = u * 10 + 8;
  for (let i = 0; i < h; i++) { parts.push(flat(x, 4, u, t)); x += u * 10 + gap; }
  for (let i = 0; i < tens; i++) { parts.push(rod(x, 4, u, t)); x += u + gap; }
  // units stack in columns of 5, bottom-aligned with the rods
  const colH = 5;
  for (let i = 0; i < o; i++) {
    const col = Math.floor(i / colH), row = i % colH;
    parts.push(unitCube(x + col * (u + 6), 4 + u * 10 - (row + 1) * u - row * 4, u, t));
  }
  x += o > 0 ? Math.ceil(o / colH) * (u + 6) : 0;

  return {
    svg: svgRoot({ width: Math.max(x + 4, 40), height: H, label: `base ten blocks showing ${h * 100 + tens * 10 + o}` },
      parts.join(''), { 'data-lcs-prim': 'base-ten', 'data-lcs-h': h, 'data-lcs-t': tens, 'data-lcs-o': o }),
    meta: { h, t: tens, o, value: h * 100 + tens * 10 + o },
    width: Math.max(x + 4, 40),
    height: H,
  };
}

module.exports = baseTenBlocks;
