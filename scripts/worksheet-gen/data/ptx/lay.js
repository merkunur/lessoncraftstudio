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

/** a seeded random (mulberry32) — scatters are deterministic per copy */
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
/** N copies of one picture SCATTERED inside an ellipse (K-427: scattered, never in a row, never touching, never partly
 *  hidden): every ink box inside the ellipse, boxes ≥ gap apart, no three centres on one line, flips alternate.
 *  spec { src, h | w }; region { cx, cy, rx, ry }; returns placed items (anchor bottom). Throws when it cannot place. */
function scatter(n, spec, region, seed, gap = 16, avoid = []) {
  const R = rng(seed), w = spec.w != null ? spec.w : wOf(spec.src, spec.h), h = spec.h != null ? spec.h : hOf(spec.src, spec.w);
  // region: an ellipse { cx, cy, rx, ry } or a rectangle { x0, y0, x1, y1 }
  const rectR = region.x0 != null, B = rectR ? region : { x0: region.cx - region.rx, x1: region.cx + region.rx, y0: region.cy - region.ry, y1: region.cy + region.ry };
  const inside = (x, y) => [[x - w / 2, y - h], [x + w / 2, y - h], [x - w / 2, y], [x + w / 2, y]].every(([px, py]) => (rectR ? px >= B.x0 && px <= B.x1 && py >= B.y0 && py <= B.y1 : ((px - region.cx) / region.rx) ** 2 + ((py - region.cy) / region.ry) ** 2 <= 1));
  const apart = (a, b) => a.x + a.w / 2 + gap <= b.x - b.w / 2 || b.x + b.w / 2 + gap <= a.x - a.w / 2 || a.y + gap <= b.y - b.h || b.y + gap <= a.y - a.h;
  // "never in a row": no three pictures on one level (or one column) — a row is what a child counts by rote
  const row3 = (P, q) => { const m = (o) => [o.x, o.y - o.h / 2], [qx, qy] = m(q), t = Math.min(w, h) * 0.28; let sameY = 0, sameX = 0; for (const o of P) { const [ox, oy] = m(o); if (Math.abs(oy - qy) < t) sameY++; if (Math.abs(ox - qx) < t) sameX++; } return sameY >= 2 || sameX >= 2; };
  for (let attempt = 0; attempt < 400; attempt++) {
    const out = []; let tries = 0;
    while (out.length < n && tries < 4000) {
      tries++;
      const x = B.x0 + w / 2 + R() * (B.x1 - B.x0 - w), y = B.y0 + h + R() * (B.y1 - B.y0 - h);
      const c = { x, y, w, h };
      if (!inside(x, y) || !out.every((o) => apart(o, c)) || !avoid.every((o) => apart(o, c)) || row3(out, c)) continue;
      out.push(c);
    }
    if (out.length === n) return out.map((c, i) => ({ ...spec, x: Math.round(c.x), y: Math.round(c.y), flip: (i + seed) % 2 === 1 }));
  }
  throw new Error('ptl scatter: cannot place ' + n + ' × ' + spec.src);
}
/** the box of a placed item (for avoid lists) */
const boxOfItem = (it) => { const w = it.w != null ? it.w : wOf(it.src, it.h), h = it.h != null ? it.h : hOf(it.src, it.w); return { x: it.x, y: it.y, w, h }; };
module.exports.scatter = scatter; module.exports.rng = rng; module.exports.boxOfItem = boxOfItem;
