/**
 * Shared SVG helpers — the common drawing vocabulary all primitives use, so a
 * tick mark / rounded cell / label is literally the same code in a ruler, a
 * number line, and a thermometer.
 *
 * Conventions:
 *  - All emitters return SVG element strings.
 *  - Ground-truth attributes for QA carry the data-lcs- prefix.
 *  - Escape every interpolated text value via esc().
 */
'use strict';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function attrs(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
}

function el(tag, a, children) {
  const inner = children == null ? '' : (Array.isArray(children) ? children.join('') : String(children));
  return inner === '' && tag !== 'text' && tag !== 'tspan'
    ? `<${tag}${attrs(a)}/>`
    : `<${tag}${attrs(a)}>${inner}</${tag}>`;
}

function svgRoot({ width, height, viewBox, label }, children, extra) {
  return el('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width, height,
    viewBox: viewBox || `0 0 ${width} ${height}`,
    role: 'img',
    'aria-label': label,
    ...(extra || {}),
  }, children);
}

function roundedRect({ x, y, w, h, r, fill, strokeColor, strokeWidth, dash, data }) {
  return el('rect', {
    x, y, width: w, height: h, rx: r, ry: r,
    fill: fill || 'none',
    stroke: strokeColor || undefined,
    'stroke-width': strokeWidth || undefined,
    'stroke-dasharray': dash || undefined,
    ...(data || {}),
  });
}

function line({ x1, y1, x2, y2, strokeColor, strokeWidth, cap, dash, data }) {
  return el('line', {
    x1, y1, x2, y2,
    stroke: strokeColor, 'stroke-width': strokeWidth,
    'stroke-linecap': cap || 'round',
    'stroke-dasharray': dash || undefined,
    ...(data || {}),
  });
}

function circle({ cx, cy, r, fill, strokeColor, strokeWidth, data }) {
  return el('circle', {
    cx, cy, r,
    fill: fill || 'none',
    stroke: strokeColor || undefined,
    'stroke-width': strokeWidth || undefined,
    ...(data || {}),
  });
}

/** Text with the generator's font conventions. anchor: start|middle|end */
function label({ x, y, text, size, color, fontFamily, weight, anchor, data }) {
  return el('text', {
    x, y,
    'font-family': fontFamily,
    'font-size': size,
    'font-weight': weight || 600,
    fill: color,
    'text-anchor': anchor || 'middle',
    'dominant-baseline': 'central',
    ...(data || {}),
  }, esc(text));
}

/**
 * A horizontal tick row — THE shared scale engine (number line, ruler,
 * thermometer, line plot axes all call this).
 * Returns { svg, xFor } where xFor(value) maps a value to an x coordinate.
 */
function tickRow({ x, y, w, min, max, tickStep, majorEvery, tickH, majorH, strokeColor, strokeWidth, labelEvery, labelSize, labelColor, fontFamily, labelDy }) {
  const span = max - min;
  const xFor = (v) => x + ((v - min) / span) * w;
  const parts = [];
  const n = Math.round(span / tickStep);
  for (let i = 0; i <= n; i++) {
    const v = min + i * tickStep;
    const isMajor = majorEvery ? (Math.round(v / tickStep) % majorEvery === 0) : true;
    const h = isMajor ? majorH : tickH;
    parts.push(line({
      x1: xFor(v), y1: y - h / 2, x2: xFor(v), y2: y + h / 2,
      strokeColor, strokeWidth, data: { 'data-lcs-tick': v },
    }));
    if (labelEvery && Math.round((v - min) / tickStep) % labelEvery === 0) {
      parts.push(label({
        x: xFor(v), y: y + (labelDy == null ? majorH : labelDy), text: v,
        size: labelSize, color: labelColor, fontFamily, weight: 700,
        data: { 'data-lcs-ticklabel': v },
      }));
    }
  }
  return { svg: parts.join(''), xFor };
}

module.exports = { esc, attrs, el, svgRoot, roundedRect, line, circle, label, tickRow };
