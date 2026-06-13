/**
 * unitCubes — isometric cube-stack primitive (SVG): l × w × h unit cubes in
 * a dimetric projection (top/left/right faces). Also exports thousandCube
 * (a 10×10×10 block with face grids — the base-ten thousands block).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');

const COS = 0.866, SIN = 0.5;

function isoPt(x, y, z, u, ox, oy) {
  return [ox + (x - y) * COS * u, oy + (x + y) * SIN * u - z * u];
}

function cubeAt(x, y, z, u, ox, oy, t, data) {
  const p = (a, b, c) => isoPt(a, b, c, u, ox, oy).join(',');
  const faces = [
    // top
    el('polygon', { points: `${p(x, y, z + 1)} ${p(x + 1, y, z + 1)} ${p(x + 1, y + 1, z + 1)} ${p(x, y + 1, z + 1)}`, fill: t.color.tealSoft, stroke: t.color.teal, 'stroke-width': 1.4, ...(data || {}) }),
    // left (x face)
    el('polygon', { points: `${p(x, y + 1, z)} ${p(x + 1, y + 1, z)} ${p(x + 1, y + 1, z + 1)} ${p(x, y + 1, z + 1)}`, fill: t.color.cream, stroke: t.color.teal, 'stroke-width': 1.4 }),
    // right (y face)
    el('polygon', { points: `${p(x + 1, y, z)} ${p(x + 1, y + 1, z)} ${p(x + 1, y + 1, z + 1)} ${p(x + 1, y, z + 1)}`, fill: t.color.white, stroke: t.color.teal, 'stroke-width': 1.4 }),
  ];
  return faces.join('');
}

function unitCubes({ l, w, h, unit = 22 }, ctx) {
  const t = (ctx && ctx.tokens) || tokens;
  const u = unit;
  const W = (l + w) * COS * u + 16;
  const H = (l + w) * SIN * u + h * u + 16;
  const ox = w * COS * u + 8;
  // oy places the top-back-top vertex at y=8 so the whole stack sits inside the
  // declared H (top vertex at 8, bottom-front vertex at H-8). The previous extra
  // `+ (l+w)*SIN*u - u` offset pushed the stack down past H, clipping the
  // front-bottom row of cubes (worse as l grows).
  const oy = h * u + 8;
  const parts = [];
  // paint order: back-to-front (y desc), left-to-right (x asc), bottom-up (z asc)
  for (let z = 0; z < h; z++) {
    for (let y = w - 1; y >= 0; y--) {
      for (let x = 0; x < l; x++) {
        parts.push(cubeAt(x, y, z, u, ox, oy, t, { 'data-lcs-cube': 1 }));
      }
    }
  }
  return {
    svg: svgRoot({ width: W, height: H, label: `${l * w * h} unit cubes` },
      parts.join(''), { 'data-lcs-prim': 'unit-cubes', 'data-lcs-l': l, 'data-lcs-w': w, 'data-lcs-h': h }),
    meta: { l, w, h, volume: l * w * h },
    width: W,
    height: H,
  };
}

module.exports = unitCubes;
