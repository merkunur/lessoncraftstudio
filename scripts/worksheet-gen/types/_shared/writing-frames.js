/**
 * writing-frames.js — small pieces of the Stories & Writing maker's open pages (2026-11-02): a sentence starter whose
 * ___ blanks become write-on lines, a ruled line, a speech bubble, a drawing box. Nothing here is an answer.
 */
'use strict';
const { writingRow } = require('../../primitives/trace-path.js');
const T = require('../../primitives/_tokens.js').color;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** a starter with ___ blanks: the text in ink, each blank a write-on stretch (min width) on the same baseline */
function starter(text, { font = 24, blank = 170 } = {}) {
  const parts = String(text).split('___');
  return `<div data-lcs-starter style="display:flex;flex-wrap:wrap;align-items:flex-end;row-gap:10px;font:700 ${font}px/1.6 'Baloo 2',cursive;color:${T.ink}">` +
    parts.map((p, i) => `<span style="white-space:pre-wrap">${esc(p)}</span>` + (i < parts.length - 1 ? `<span style="display:inline-block;flex:1 0 ${blank}px;max-width:${blank * 2}px;height:${Math.round(font * 1.1)}px;border-bottom:2.5px solid ${T.grid};margin:0 6px"></span>` : '')).join('') + '</div>';
}
const line = (w, h = 50) => writingRow({ w, h, glyphH: Math.round(h * 0.52), xHeight: true }).svg;
const lines = (n, w, h) => Array.from({ length: n }, () => `<div>${line(w, h)}</div>`).join('');
/**
 * An empty speech bubble, w × h: a TRUE ellipse (centre BUBBLE.cx·w, BUBBLE.cy·h, radii BUBBLE.rx·w, BUBBLE.ry·h) with a tail
 * at the bottom left. Until 2026-11-05 it was two cubic curves whose control points sat at 2 % and 99 % of the width — a
 * cubic never reaches its control points, so the drawn bubble spanned only 16-85 % of its box and K-555's writing line
 * ran out of both sides (operator). The ellipse is exact, so bubbleLine() can place a line inside it by arithmetic.
 */
const BUBBLE = { cx: 0.5, cy: 0.4, rx: 0.48, ry: 0.36 };
function bubble(w, h) {
  const cx = w * BUBBLE.cx, cy = h * BUBBLE.cy, rx = w * BUBBLE.rx, ry = h * BUBBLE.ry;
  const at = (deg) => { const a = (deg * Math.PI) / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)].map((v) => Math.round(v * 10) / 10); };
  // the tail leaves the ellipse between 100° and 122° (screen angles: below the centre, a little left) and points down-left
  const [ax, ay] = at(100), [bx, by] = at(122), tip = [Math.round((cx - rx * 0.62) * 10) / 10, Math.round(h * 0.97 * 10) / 10];
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" data-lcs-bubble="1" data-lcs-ellipse="${cx},${cy},${rx},${ry}"><path d="M${ax} ${ay} A ${rx} ${ry} 0 1 0 ${bx} ${by} L ${tip[0]} ${tip[1]} Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
}
/** where a writing line lh tall sits inside bubble(w, h): centred on the ellipse, as wide as the ellipse is at the line's top
 *  and bottom edges less a margin m each side → { left, top, width } in the bubble's own pixels */
function bubbleLine(w, h, lh, m = 12) {
  const cx = w * BUBBLE.cx, cy = h * BUBBLE.cy, rx = w * BUBBLE.rx, ry = h * BUBBLE.ry;
  const half = rx * Math.sqrt(1 - ((lh / 2) / ry) ** 2) - m;
  return { left: Math.round(cx - half), top: Math.round(cy - lh / 2), width: Math.floor(2 * half) };
}
const drawBox = (w, h) => `<div data-lcs-draw style="flex:0 0 ${w}px;width:${w}px;height:${h}px;box-sizing:border-box;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF"></div>`;

module.exports = { starter, line, lines, bubble, bubbleLine, BUBBLE, drawBox, esc };
