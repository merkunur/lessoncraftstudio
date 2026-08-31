/**
 * balance — two-pan balance-scale primitive (SVG) for mass comparison and
 * weighing with unit weights (g/kg). Three tilt states: 'left' (left pan
 * heavier/down), 'right', 'level'. Pan CONTENT is the caller's HTML overlay
 * concern for image icons; for pure-SVG content this primitive renders
 * unit-weight blocks (kg/g cubes with the value printed on them).
 *
 * { tilt, w, h, leftLabel, rightLabel, leftWeights, rightWeights, unit }
 * leftWeights/rightWeights: number[] — rendered as stacked weight blocks.
 * → { svg, panRects } (panRects in local coords for HTML icon overlay).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, line, label, roundedRect, circle } = require('./_svg.js');

const TILT_DEG = { left: 7, right: -7, level: 0 };

function weightBlocks({ weights, unit, cx, panY }) {
  // stack blocks upward from the pan surface, largest at the bottom
  const sorted = [...weights].sort((a, b) => b - a);
  const parts = [];
  let y = panY;
  sorted.forEach((v) => {
    const bw = 26 + Math.min(3, String(v).length) * 8;
    const bh = 24;
    y -= bh + 2;
    parts.push(roundedRect({
      x: cx - bw / 2, y, w: bw, h: bh, r: 5,
      fill: tokens.color.cream, strokeColor: tokens.color.teal, strokeWidth: 2,
      data: { 'data-lcs-weight': v },
    }));
    parts.push(label({
      x: cx, y: y + bh / 2, text: `${v}`, size: 13, color: tokens.color.ink,
      fontFamily: tokens.font.display, weight: 700,
    }));
  });
  if (weights.length) {
    parts.push(label({
      x: cx, y: panY + 14, text: unit, size: 11, color: tokens.color.inkSoft,
      fontFamily: tokens.font.body, weight: 800,
    }));
  }
  return parts.join('');
}

function balance({ tilt = 'level', w = 300, h = 190, leftWeights = [], rightWeights = [], unit = 'g' }) {
  const deg = TILT_DEG[tilt];
  if (deg === undefined) throw new Error(`balance: bad tilt ${tilt}`);
  const cx = w / 2;
  // beam sits low enough that a 4-block weight stack stays inside the svg
  const beamY = h * 0.52;
  const beamHalf = w * 0.32;
  const rad = deg * Math.PI / 180;

  // beam endpoints
  const lx = cx - Math.cos(rad) * beamHalf, ly = beamY + Math.sin(rad) * beamHalf;
  const rx = cx + Math.cos(rad) * beamHalf, ry = beamY - Math.sin(rad) * beamHalf;

  const panW = w * 0.26, panDrop = 24;
  const pan = (px, py, side) => {
    const y = py + panDrop;
    return [
      // strings
      line({ x1: px, y1: py, x2: px - panW / 2 + 6, y2: y, strokeColor: tokens.color.teal, strokeWidth: 1.5 }),
      line({ x1: px, y1: py, x2: px + panW / 2 - 6, y2: y, strokeColor: tokens.color.teal, strokeWidth: 1.5 }),
      // pan: shallow arc dish
      el('path', {
        d: `M ${px - panW / 2} ${y} Q ${px} ${y + 16} ${px + panW / 2} ${y}`,
        fill: tokens.color.white, stroke: tokens.color.teal, 'stroke-width': 3,
        'data-lcs-pan': side,
      }),
    ].join('');
  };

  const parts = [
    // pedestal
    el('path', {
      d: `M ${cx - 22} ${h - 8} L ${cx + 22} ${h - 8} L ${cx + 8} ${beamY + 6} L ${cx - 8} ${beamY + 6} Z`,
      fill: tokens.color.tealSoft, stroke: tokens.color.teal, 'stroke-width': 2.5, 'stroke-linejoin': 'round',
    }),
    // beam
    line({ x1: lx, y1: ly, x2: rx, y2: ry, strokeColor: tokens.color.teal, strokeWidth: 5 }),
    circle({ cx, cy: beamY, r: 6, fill: tokens.color.coral }),
    pan(lx, ly, 'left'),
    pan(rx, ry, 'right'),
    weightBlocks({ weights: leftWeights, unit, cx: lx, panY: ly + panDrop }),
    weightBlocks({ weights: rightWeights, unit, cx: rx, panY: ry + panDrop }),
  ];

  const panRects = {
    left: { x: lx - panW / 2, y: ly + panDrop - 60, w: panW, h: 60 },
    right: { x: rx - panW / 2, y: ry + panDrop - 60, w: panW, h: 60 },
  };

  return {
    svg: svgRoot({ width: w, height: h, label: `balance scale tilted ${tilt}` }, parts.join(''),
      { 'data-lcs-prim': 'balance', 'data-lcs-tilt': tilt }),
    panRects,
    width: w, height: h,
  };
}

module.exports = balance;
