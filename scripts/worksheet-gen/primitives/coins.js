/**
 * coins — stylized schoolbook coin primitive (SVG). Deliberately GENERIC,
 * never a legal-tender replica: a circle with a ring treatment, the value
 * printed large ON the coin (teaching prop — honesty carried by the
 * instruction line), differentiated by SIZE + RING, never by hue, so a B&W
 * printer loses nothing (design-panel lock).
 *
 * Tints map into the token palette: gold → cream fill, silver → white fill,
 * copper → coralSoft fill; higher values earn a double ring.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, circle, el } = require('./_svg.js');

const TINT_FILL = {
  gold: tokens.color.cream,
  silver: tokens.color.white,
  copper: tokens.color.coralSoft,
};

/** Diameter ladder: value rank within the set drives size (min→max px). */
function sizeFor(value, allValues, { minPx, maxPx }) {
  const sorted = [...new Set(allValues)].sort((a, b) => a - b);
  const rank = sorted.indexOf(value);
  const t = sorted.length > 1 ? rank / (sorted.length - 1) : 1;
  return Math.round(minPx + t * (maxPx - minPx));
}

/**
 * One coin. { value, tint, d } → { svg, width, height }
 * d = diameter px. Double ring on the top-2 denominations is the caller's
 * choice via `doubleRing`.
 */
function coin({ value, tint, d, doubleRing }) {
  const c = d / 2;
  const parts = [
    circle({ cx: c, cy: c, r: c - 2, fill: TINT_FILL[tint] || tokens.color.white, strokeColor: tokens.color.teal, strokeWidth: 2.5 }),
  ];
  if (doubleRing) {
    parts.push(circle({ cx: c, cy: c, r: c - 7, fill: 'none', strokeColor: tokens.color.teal, strokeWidth: 1.2 }));
  }
  const fs = Math.round(d * (String(value).length > 1 ? 0.34 : 0.42));
  parts.push(el('text', {
    x: c, y: c,
    'font-family': tokens.font.display, 'font-size': fs, 'font-weight': 700,
    fill: tokens.color.ink, 'text-anchor': 'middle', 'dominant-baseline': 'central',
  }, String(value)));
  return {
    svg: svgRoot({ width: d, height: d, label: `coin ${value}` }, parts.join(''),
      { 'data-lcs-prim': 'coin', 'data-lcs-value': value }),
    width: d, height: d,
  };
}

/**
 * A purse of coins laid out in centered rows (largest first — the counting
 * strategy the worksheet teaches). { values, denoms, minPx, maxPx, gap }
 * → { html, total } where html is a flex row block of coin SVGs.
 */
function coinRow({ values, denoms, minPx = 44, maxPx = 64, gap = 8 }) {
  const all = denoms.map((x) => x.v);
  const tintByV = Object.fromEntries(denoms.map((x) => [x.v, x.tint]));
  const topTwo = [...new Set(all)].sort((a, b) => b - a).slice(0, 2);
  const sorted = [...values].sort((a, b) => b - a);
  const svgs = sorted.map((v) => coin({
    value: v, tint: tintByV[v],
    d: sizeFor(v, all, { minPx, maxPx }),
    doubleRing: topTwo.includes(v),
  }).svg);
  const total = values.reduce((a, b) => a + b, 0);
  return {
    html: `<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:${gap}px" data-lcs-cointotal="${total}">${svgs.join('')}</div>`,
    total,
  };
}

module.exports = { coin, coinRow, sizeFor };
