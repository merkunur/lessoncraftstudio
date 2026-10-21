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
