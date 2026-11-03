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
/** an empty speech bubble (an ellipse with a tail at the bottom left), w × h */
const bubble = (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" data-lcs-bubble="1"><path d="M${w * 0.5} ${h * 0.04} C ${w * 0.95} ${h * 0.04}, ${w * 0.99} ${h * 0.78}, ${w * 0.5} ${h * 0.78} L ${w * 0.3} ${h * 0.97} L ${w * 0.34} ${h * 0.76} C ${w * 0.02} ${h * 0.7}, ${w * 0.04} ${h * 0.04}, ${w * 0.5} ${h * 0.04} Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
const drawBox = (w, h) => `<div data-lcs-draw style="flex:0 0 ${w}px;width:${w}px;height:${h}px;box-sizing:border-box;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF"></div>`;

module.exports = { starter, line, lines, bubble, drawBox, esc };
