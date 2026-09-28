/**
 * key-on-row.js — seat an ANSWER KEY's text on a school-line writing row, the way the worksheets seat their
 * pre-printed starters (templates/components-b2.js starterFontPx, the 2026-09-21 fix): an SVG <text> INSIDE the
 * row's own svg, its baseline on the base rule, sized so the font's MEASURED x-height (primitives/font-metrics.json)
 * fills the base → dashed-midline band. Operator report 2026-09-28: keys placed their words with guessed CSS offsets
 * (`bottom:6px`, `::after … bottom:14px`), so the words sat under or over the lines.
 *
 * The geometry is read from the row's OWN rules (the three horizontal <line>s), so any row size works.
 * Gate: qa/verify-key-text.js.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const FONT_METRICS = require('../primitives/font-metrics.json');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const FAMILY = { 'nunito-700': [tokens.font.body, 700], 'nunito-800': [tokens.font.body, 800], 'baloo2-700': [tokens.font.display, 700] };

/** The rules of a writing-row svg string: { top, mid, base, w }. */
function rulesOf(svg) {
  const ys = [...String(svg).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]).sort((a, b) => a - b);
  if (ys.length !== 3) throw new Error(`key-on-row: the row has ${ys.length} horizontal rules (want 3)`);
  const w = +((/\bwidth="([\d.]+)"/.exec(svg) || [])[1]);
  return { top: ys[0], mid: ys[1], base: ys[2], w };
}

/**
 * seatOnRow(svg, text, { fill, font }) -> the row svg with the answer seated on it.
 * A text wider than the row (8 px inset each side, estimated at 0.56 em per glyph) is fitted with textLength.
 */
function seatOnRow(svg, text, { fill = tokens.color.coral, font = 'nunito-700' } = {}) {
  const s = String(svg);
  if (!/data-lcs-prim="writing-row"/.test(s)) throw new Error('key-on-row: not a writing-row svg');
  const m = FONT_METRICS[font];
  if (!m || !(m.xHeight > 0)) throw new Error(`key-on-row: no measured metrics for "${font}"`);
  const r = rulesOf(s);
  const px = Math.round(((r.base - r.mid) / m.xHeight) * 2) / 2;
  const room = r.w - 16;
  const fit = [...String(text)].length * px * 0.56 > room ? ` textLength="${room}" lengthAdjust="spacingAndGlyphs"` : '';
  const [family, weight] = FAMILY[font];
  const t = `<text x="8" y="${r.base.toFixed(2)}" font-family="${esc(family)}" font-size="${px}" font-weight="${weight}" fill="${fill}" data-lcs-starter="1" data-lcs-keytext="1"${fit}>${esc(text)}</text>`;
  const end = s.lastIndexOf('</svg>');
  return s.slice(0, end) + t + s.slice(end);
}

/**
 * seatInElements(html, attrRe, pick) — for every element whose opening tag matches `attrRe`, seat pick(match)
 * on the FIRST writing-row svg after it (the row that belongs to that item). Returns the new html.
 */
function seatAfter(html, needle, text, opts) {
  const at = html.indexOf(needle);
  if (at < 0) throw new Error(`key-on-row: no element "${needle.slice(0, 60)}"`);
  // the item's OWN row: the first writing-row svg after it (a picture cue or a prefix chip may come first)
  const rel = html.slice(at).search(/<svg[^>]*data-lcs-prim="writing-row"/);
  if (rel < 0) throw new Error(`key-on-row: no writing row after "${needle.slice(0, 60)}"`);
  const s = at + rel;
  const e = html.indexOf('</svg>', s) + 6;
  return html.slice(0, s) + seatOnRow(html.slice(s, e), text, opts) + html.slice(e);
}

module.exports = { seatOnRow, seatAfter, rulesOf };
