/**
 * data/ptx/lay.js — layout helpers for the composed Level Set scenes (ptl): a picture's width comes from its MEASURED ink
 * aspect (data/pt/index.json), so a row of pictures is spaced by what the pictures really are, never by a guessed width
 * (the first K-418 layout cut a palm tree and a lighthouse by the body edge, 2026-10-22).
 */
'use strict';
const IX = (() => { const j = require('../pt/index.json'); return j.items || j; })();
/** the ink width of a library picture drawn at height h (or the height at width w) */
function wOf(src, h) { const e = IX[src]; if (!e) throw new Error('ptl layout: no index entry for ' + src); return h * e.aspect; }
function hOf(src, w) { const e = IX[src]; if (!e) throw new Error('ptl layout: no index entry for ' + src); return w / e.aspect; }
/** a row standing on y: specs [{ src, h | w, dy?, ... }] spread between x0 and x1 with equal gaps; returns placed items.
 *  Throws when the row does not fit with the minimum gap (the band's clear distance) — a layout never overlaps silently. */
function row(y, specs, x0 = 20, x1 = 655, minGap = 26) {
  const ws = specs.map((s) => (s.w != null ? s.w : wOf(s.src, s.h)));
  const total = ws.reduce((a, b) => a + b, 0), gap = (x1 - x0 - total) / Math.max(1, specs.length - 1);
  if (specs.length > 1 && gap < minGap) throw new Error(`ptl layout: a row of ${specs.length} needs ${Math.round(total + minGap * (specs.length - 1))} px, has ${x1 - x0}`);
  let x = specs.length === 1 ? (x0 + x1) / 2 - ws[0] / 2 : x0;
  return specs.map((s, i) => { const it = { ...s, x: Math.round(x + ws[i] / 2), y: s.y != null ? s.y : y - (s.dy || 0) }; delete it.dy; x += ws[i] + gap; return it; });
}
module.exports = { wOf, hOf, row, IX };
