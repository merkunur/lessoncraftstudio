'use strict';
/**
 * bankword-width.js — the MEASURED width of a `.ws-bankword` pill (page/page.css:
 * Nunito 800, padding 6px 14px, border 2px) from primitives/bankword-nunito800.advances.json
 * (tools/measure-bankword-advances.js). Never a per-character guess: a character the
 * table does not hold makes textWidthEm THROW, so a gate reports it instead of passing.
 *
 *   textWidthEm(s, table?)       Σ advance + Σ pair kern, per em
 *   pillWidth(s, px)             px · textWidthEm + 28 (padding) + 4 (border)
 */
const path = require('path');
let TABLE = null;
const table = () => TABLE || (TABLE = require(path.join(__dirname, 'bankword-nunito800.advances.json')));
const PILL_PAD_X = 28, PILL_BORDER_X = 4;

function textWidthEm(s, t) {
  const { em, kern } = t || table();
  const cs = [...String(s).normalize('NFC')];
  let w = 0;
  for (const c of cs) {
    if (!(c in em)) throw new Error(`bankword-width: no measured advance for "${c}" (U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}) — add it to tools/measure-bankword-advances.js and re-run`);
    w += em[c];
  }
  for (let i = 1; i < cs.length; i++) w += (kern && kern[cs[i - 1] + cs[i]]) || 0;
  return w;
}
const pillWidth = (s, px) => px * textWidthEm(s) + PILL_PAD_X + PILL_BORDER_X;

module.exports = { textWidthEm, pillWidth, PILL_PAD_X, PILL_BORDER_X };
