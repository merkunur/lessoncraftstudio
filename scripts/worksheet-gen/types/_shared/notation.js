/**
 * notation.js — the ONE per-locale arithmetic-sign table for printable sheets.
 *
 * sv panel ruling (nt20-VAR, G3-369): division is written with '/' in Swedish
 * lågstadiet — ':' is Danish/Norwegian and '÷' is FORBIDDEN (it meant MINUS
 * in older Swedish notation). de/it/nl/da/no/fi write ':'; en/fr/es/pt '÷'.
 * Multiplication: de/sv/da/no/fi write '·', the rest '×'.
 *
 * Consumers: G3-369 (origin of the table), _shared/array-tasks.js,
 * _shared/number-line-tasks.js (the two factories that hard-coded '÷' until
 * nt20-C prerequisite C1, 2026-09-14). Any new sign-printing type reads this
 * module; never a second table.
 */
'use strict';

const MUL_DOT = new Set(['de', 'sv', 'da', 'no', 'fi']);
const DIV_SLASH = new Set(['sv']);
const DIV_COLON = new Set(['de', 'it', 'nl', 'da', 'no', 'fi']);

function loc2(locale) { return String(locale || 'en').slice(0, 2); }
function divGlyph(locale) { const l = loc2(locale); return DIV_SLASH.has(l) ? '/' : DIV_COLON.has(l) ? ':' : '÷'; }
function mulGlyph(locale) { return MUL_DOT.has(loc2(locale)) ? '·' : '×'; }

module.exports = { MUL_DOT, DIV_SLASH, DIV_COLON, divGlyph, mulGlyph };
