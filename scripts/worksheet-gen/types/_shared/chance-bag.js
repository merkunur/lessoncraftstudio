/**
 * The bag of the chance pages (Year pages P, 2026-11-13): G2-507 Certain, Possible, Impossible · G2-508 Chance
 * Experiment: Draw and Tally · G3-484 Which Bag? More Likely.
 *
 * A bag holds PIECES of four kinds that differ in shape AND colour (a circle, a square, a triangle, a star), the pieces
 * of the classroom tool Draw Bag ("Der Zufallsbeutel", "Slumppåsen"): a page printed in black and white still shows
 * which piece is which, and no sentence has to name a colour (in eleven languages a colour word agrees with its noun).
 * The colours are the page palette's (primitives/_tokens.js), so the palette lint passes.
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const T = TOK.color, C = TOK.codeColors;

const KINDS = ['c', 's', 't', 'x'];
const FILL = { c: T.teal, s: C.codeOrange, t: C.codeYellow, x: T.ink };
const SHAPE = {
  c: '<circle cx="12" cy="12" r="8.8"/>',
  s: '<rect x="4" y="4" width="16" height="16" rx="2.4"/>',
  t: '<polygon points="12,2.8 22,21 2,21"/>',
  x: '<polygon points="12,1.4 15.3,7.45 22.08,8.72 17.34,13.74 18.23,20.58 12,17.62 5.77,20.58 6.66,13.74 1.92,8.72 8.7,7.45"/>',
};
const shapeG = (kind, x, y, s, extra) => `<g ${extra || ''} transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(s / 24).toFixed(3)})" fill="${FILL[kind]}" stroke="${T.ink}" stroke-width="1.3" stroke-linejoin="round">${SHAPE[kind]}</g>`;

/** one piece as a small picture (a statement row, a tally row) */
function piece(kind, px, attr) {
  return `<svg ${attr || ''} data-lcs-piece="${kind}" width="${px}" height="${px}" viewBox="0 0 24 24" style="flex:0 0 auto;display:block" aria-hidden="true"><g fill="${FILL[kind]}" stroke="${T.ink}" stroke-width="1.3" stroke-linejoin="round">${SHAPE[kind]}</g></svg>`;
}

/**
 * A bag, seen open from the front, with its pieces in two rows (every piece can be counted: nothing overlaps).
 *   pieces  the kinds in the order they lie, e.g. ['c','c','s',…] (at most 10)
 *   slots   instead of pieces: this many empty places to draw in
 *   px      the width on the page (the bag is 170 × 150 units)
 *   sample  with `slots`: kinds drawn in outline in the places (the answer key shows one bag that fits)
 */
function bag({ pieces, slots, px, sample, attr }) {
  const list = pieces || [];
  const n = slots || list.length;
  if (n < 1 || n > 10) throw new Error('chance-bag: a bag of ' + n + ' pieces');
  const rows = n <= 3 ? 1 : 2, cols = Math.ceil(n / rows);
  const X0 = 26, X1 = 144, Y0 = 54, Y1 = 136;
  const cw = (X1 - X0) / cols, ch = (Y1 - Y0) / rows, s = Math.min(26, Math.min(cw, ch) * 0.8);
  let inner = '';
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), inRow = r === rows - 1 ? n - cols * (rows - 1) : cols;
    const off = (cols - inRow) * cw / 2;
    const cx = X0 + off + (i % cols) * cw + cw / 2, cy = Y0 + r * ch + ch / 2;
    if (slots) {
      inner += `<rect data-lcs-slot x="${(cx - s / 2).toFixed(1)}" y="${(cy - s / 2).toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="4" fill="${T.white}" stroke="${T.grid}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
      if (sample && sample[i]) inner += `<g data-lcs-sample="${sample[i]}" transform="translate(${(cx - s * 0.4).toFixed(1)} ${(cy - s * 0.4).toFixed(1)}) scale(${(s * 0.8 / 24).toFixed(3)})" fill="none" stroke="${T.coral}" stroke-width="2.4" stroke-linejoin="round">${SHAPE[sample[i]]}</g>`;
    } else inner += shapeG(list[i], cx - s / 2, cy - s / 2, s, `data-lcs-in="${list[i]}"`);
  }
  const h = Math.round(px * 150 / 170);
  return `<svg ${attr || ''} data-lcs-bag="${slots ? 'slots:' + slots : list.join('')}" width="${px}" height="${h}" viewBox="0 0 170 150" style="flex:0 0 auto;display:block" aria-hidden="true">` +
    `<path d="M34 38 L24 13 Q85 3 146 13 L136 38 Z" fill="${T.white}" stroke="${T.ink}" stroke-width="2.2" stroke-linejoin="round"/>` +
    `<path d="M30 38 C6 64 4 124 20 140 Q85 152 150 140 C166 124 164 64 140 38 Z" fill="${T.white}" stroke="${T.ink}" stroke-width="2.2" stroke-linejoin="round"/>` +
    `<path d="M30 38 Q85 46 140 38" fill="none" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>` +
    inner + `</svg>`;
}

/** a box to mark; `mark` = 'key' (the answer key's cross, coral) or 'print' (a cross the page prints, ink). A cross,
 *  not a check: it is the mark "ankreuzen", "cocher", "kryssa i" make, and an American child reads it as marked too. */
function box(px, mark, attr) {
  const check = mark ? `<svg width="${Math.round(px * 0.72)}" height="${Math.round(px * 0.72)}" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke="${mark === 'key' ? T.coral : T.ink}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '';
  return `<span ${attr || ''} style="width:${px}px;height:${px}px;flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;background:${T.white};border:2px solid ${T.ink};border-radius:6px">${check}</span>`;
}

/** how a draw of `kind` from a bag of `pieces` is called: 'certain' | 'possible' | 'impossible' */
function verdict(pieces, kind) {
  const k = pieces.filter((p) => p === kind).length;
  return k === 0 ? 'impossible' : k === pieces.length ? 'certain' : 'possible';
}

module.exports = { KINDS, FILL, SHAPE, piece, bag, box, verdict };
