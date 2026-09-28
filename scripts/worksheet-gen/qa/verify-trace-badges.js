#!/usr/bin/env node
/**
 * verify-trace-badges.js — 2026-09-28 (operator screenshot: "some circles of the numbers showing the order of
 * writing are cut off"). Builds EVERY tracing letter of all 11 locales (capitals + lowercase, specials, IJ)
 * with strokeLetterLane at every size that prints stroke-order badges, and asserts per badge:
 *   1. the whole circle (incl. its 1.5 px ring) lies inside the lane SVG (the SVG clips — that was the defect);
 *   2. it does not touch a start dot, an arrow head or another badge;
 *   3. it does not sit on a traced stroke (clear of the stroke's centreline by the badge radius + half the pen).
 * Browser-free: it reads the SVG markup the primitive emits and re-samples the strokes with the same geometry.
 *
 *   node qa/verify-trace-badges.js [--poison]
 * --poison builds with the pre-fix placement (legacyBadges) and must FAIL (B/D badge 2 above the lane).
 */
'use strict';
const { strokeLetterLane, samplePath, BADGE_R, LM, textLaneGeometry } = require('../primitives/trace-path.js');
const letterStrokes = require('../data/tracing/letter-strokes.js');
const { LETTER_SETS, LOWERCASE_SETS } = require('../data/tracing/letter-sets.js');

const POISON = process.argv.includes('--poison');
// every size that prints badges (glyphH >= 80): published K-258/K-283 + the Level Set L1 sizes
const SIZES = [{ glyphH: 104, h: 152 }, { glyphH: 84, h: 110 }];
const W = 660, REPS = 4;
const letters = (sets) => [...new Set(Object.values(sets).flatMap((s) => [...s.alphabet, ...s.specials]))];
const CASES = [...letters(LETTER_SETS).map((t) => ({ t, lc: false })), ...letters(LOWERCASE_SETS).map((t) => ({ t, lc: true }))];

const num = (s, a) => { const m = new RegExp(`${a}="([-\\d.]+)"`).exec(s); return m ? +m[1] : NaN; };
let checked = 0;
const fails = [];
for (const size of SIZES) {
  for (const { t, lc } of CASES) {
    const { svg } = strokeLetterLane({ text: t, w: W, h: size.h, glyphH: size.glyphH, reps: REPS, emptyLast: true, lowercase: lc, legacyBadges: POISON });
    const badges = [...svg.matchAll(/<circle[^>]*data-lcs-badge="(\d+)"[^>]*>/g)].map((m) => ({ n: m[1], x: num(m[0], 'cx'), y: num(m[0], 'cy') }));
    const dots = [...svg.matchAll(/<circle(?![^>]*data-lcs-badge)[^>]*>/g)].map((m) => ({ x: num(m[0], 'cx'), y: num(m[0], 'cy'), r: num(m[0], 'r') }));
    const arrows = [...svg.matchAll(/<polygon[^>]*points="([^"]+)"/g)].map((m) => m[1].trim().split(/\s+/).map((p) => p.split(',').map(Number)));
    // ink of the guided repetition (rep 1): same geometry as strokeLetterLane
    const { items, width: rawW } = letterStrokes.textGlyphs(t);
    const one = items.length === 1;
    const width = one ? letterStrokes.BOX.w : rawW;
    const its = one ? [{ ...items[0], x: 0 }] : items;
    const topUnit = lc ? LM.ascender : LM.capTop;
    const { scale, yBase } = textLaneGeometry({ h: size.h, glyphH: size.glyphH, heightUnits: LM.base - topUnit, inkTop: lc ? LM.ascender : LM.capMarkTop, inkBottom: LM.desc });
    const x0 = 1.5 * (W / REPS) - width * scale / 2;
    const ty = yBase - LM.base * scale;
    const ink = its.flatMap((it) => it.strokes.flatMap((s) => samplePath(s.d, (gx, gy) => ({ x: x0 + (it.x + gx) * scale, y: ty + gy * scale }))));
    const tag = `${lc ? 'lower' : 'CAP'} ${t} @${size.glyphH}`;
    if (!badges.length) { fails.push(`${tag}: no badges printed at a badge size`); continue; }
    for (const b of badges) {
      checked++;
      const R = BADGE_R + 0.75;
      if (b.x - R < 0 || b.y - R < 0 || b.x + R > W || b.y + R > size.h) fails.push(`${tag} badge ${b.n}: outside the lane (${b.x.toFixed(1)},${b.y.toFixed(1)} in ${W}x${size.h})`);
      // boxes, exactly as K-238 verify() measures on the rendered page (a rotated arrow's box is larger than its disc)
      const bb = { x0: b.x - R, x1: b.x + R, y0: b.y - R, y1: b.y + R };
      const hits = (q) => q.x0 < bb.x1 - 0.5 && q.x1 > bb.x0 + 0.5 && q.y0 < bb.y1 - 0.5 && q.y1 > bb.y0 + 0.5;
      for (const d of dots) if (hits({ x0: d.x - d.r, x1: d.x + d.r, y0: d.y - d.r, y1: d.y + d.r })) fails.push(`${tag} badge ${b.n}: touches a start dot`);
      for (const o of badges) if (o !== b && hits({ x0: o.x - R, x1: o.x + R, y0: o.y - R, y1: o.y + R })) fails.push(`${tag} badge ${b.n}: touches badge ${o.n}`);
      for (const poly of arrows) {
        const xs = poly.map((q) => q[0]), ys = poly.map((q) => q[1]);
        if (hits({ x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) })) { fails.push(`${tag} badge ${b.n}: touches an arrow`); break; }
      }
      const near = Math.min(...ink.map((p) => Math.hypot(p.x - b.x, p.y - b.y)));
      if (near < BADGE_R + 1.7) fails.push(`${tag} badge ${b.n}: sits on a stroke (${near.toFixed(1)} px from the line)`);
    }
  }
}
for (const f of fails.slice(0, 40)) console.log('FAIL ' + f);
console.log(`${CASES.length} letters × ${SIZES.length} sizes, ${checked} badges checked, ${fails.length} problem(s)`);
if (POISON) {
  const clipped = fails.filter((f) => /outside the lane/.test(f) && /CAP (B|D) /.test(f)).length;
  console.log(clipped ? `poison KILLED (${clipped} B/D badges outside the lane)` : 'poison SURVIVED — the gate cannot see the defect');
  process.exit(clipped ? 0 : 1);
}
process.exit(fails.length ? 1 : 0);
