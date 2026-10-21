#!/usr/bin/env node
/**
 * pt-straight.js — the share of a drawing's traced guide length that is STRAIGHT (F5 "straight-line pictures": the
 * contract demands ≥ 80 %). A stretch is straight where the direction turns by less than 5° over ±12 work px (a radius-200 arc counts as curved).
 *   node tools/pt-straight.js "<theme>/<noun>" …        (also exported: straightShare(tr))
 */
'use strict';
const path = require('path');
const { traceDrawing } = require('../lib/pt-trace.js');
function straightShare(tr) {
  let tot = 0, str = 0;
  for (const p of tr.paths) {
    const P = p.pts;
    for (let i = 1; i < P.length; i++) {
      const L = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); tot += L;
      // direction over a window of ±6 px of arc
      let a = i - 1, b = i, d = 0; while (a > 0 && d < 12) { d += Math.hypot(P[a][0] - P[a - 1][0], P[a][1] - P[a - 1][1]); a--; }
      d = 0; while (b < P.length - 1 && d < 12) { d += Math.hypot(P[b + 1][0] - P[b][0], P[b + 1][1] - P[b][1]); b++; }
      const d1 = Math.atan2(P[i - 1][1] - P[a][1], P[i - 1][0] - P[a][0]), d2 = Math.atan2(P[b][1] - P[i][1], P[b][0] - P[i][0]);
      let t = Math.abs(d2 - d1); if (t > Math.PI) t = 2 * Math.PI - t;
      if (a === i - 1 || b === i || t < 5 * Math.PI / 180) str += L;
    }
  }
  return tot ? str / tot : 0;
}
module.exports = { straightShare };
if (require.main === module) (async () => {
  for (const k of process.argv.slice(2)) {
    const tr = await traceDrawing(path.join(__dirname, '..', 'cache', 'themes', k + '@3x.webp'));
    console.log(k.padEnd(36), (100 * straightShare(tr)).toFixed(0) + ' % straight');
  }
})();

/** the DIRECTION mix of a drawing's straight runs (F5: the down column needs vertical lines, across horizontal, slanted
 *  slanted): { v, h, s } shares of straight length within 15° of vertical / horizontal / neither */
function directionMix(tr) {
  let v = 0, h = 0, s = 0;
  for (const p of tr.paths) {
    const P = p.pts;
    for (let i = 6; i < P.length; i += 3) {
      const a = P[i - 6], b = P[i]; const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 4) continue;
      // straight here? the middle point is within 0.8 px of the chord
      const m = P[i - 3]; const d = Math.abs((b[0] - a[0]) * (a[1] - m[1]) - (a[0] - m[0]) * (b[1] - a[1])) / L;
      if (d > 0.8) continue;
      let ang = Math.abs(Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI); if (ang > 90) ang = 180 - ang;
      if (ang > 75) v += L; else if (ang < 15) h += L; else s += L;
    }
  }
  const t = v + h + s || 1; return { v: v / t, h: h / t, s: s / t };
}
module.exports.directionMix = directionMix;
