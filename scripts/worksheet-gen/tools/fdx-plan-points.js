#!/usr/bin/env node
/**
 * fdx-plan-points.js — every RANK plan in data/fdx/catalog.js PLANS turned into a POINT plan (data/fdx/plan-points.json):
 * the drawing is laid out large, its big parts are ranked exactly as lib/fd-scene colours them, and each part's
 * normalised deepest point takes its rank's crayon. A rank plan read at full size moves its colours when a scene draws
 * the drawing small and a part drops under the size floor (a panda's black went onto its head, 2026-10-10); a point
 * plan is the same at every size. Rebuild after any PLANS edit.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const F = require('../lib/fd-scene.js'); const { RANK_PLANS } = require('../data/fdx/catalog.js');
(async () => {
  const out = {};
  for (const [src, plan] of Object.entries(RANK_PLANS)) {
    if (!Array.isArray(plan)) continue;
    const it = { src, x: 300, y: 520, h: 440, colour: ['none'], maxW: 520 };
    const sc = await F.buildLayers({ id: 'pp', items: [it], lines: [], fixed: [], stroke: 7 }, { inherit: false });
    const R = sc.items[0].regions;
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const r of R) { x0 = Math.min(x0, r.bbox[0]); y0 = Math.min(y0, r.bbox[1]); x1 = Math.max(x1, r.bbox[2]); y1 = Math.max(y1, r.bbox[3]); }
    const big = R.filter((r) => r.r >= 9).sort((a, b) => b.area - a.area);
    out[src] = { base: plan[plan.length - 1], points: big.map((r, k) => [+((r.px - x0) / (x1 - x0)).toFixed(3), +((r.py - y0) / (y1 - y0)).toFixed(3), plan[Math.min(k, plan.length - 1)]]) };
  }
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'fdx', 'plan-points.json'), JSON.stringify(out, null, 1));
  console.log(Object.keys(out).length, 'rank plans → point plans');
})().catch((e) => { console.error(e); process.exit(1); });
