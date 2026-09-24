#!/usr/bin/env node
/**
 * verify-b6-water-tank.js — the node gate of primitives/water-tank.js (design
 * docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §2; the verify-body-figure.js
 * pattern). Pure node, no browser: every assertion is made on the EMITTED markup (the
 * waterline, the floor line, the rings, the blob, the bubbles and the spots are parsed back
 * out of the svg string), never on the primitive's returned numbers — the returned
 * {waterY, floorY, slots} are cross-checked AGAINST the markup, so a table and its drawing
 * are two independent sources.
 *
 *   node scripts/worksheet-gen/qa/verify-b6-water-tank.js
 *
 * Every mode at 112x56 / 170x85 / 639x520 (+ the d1 190x95, d3 150x75, F2 150x75, F5 240x150
 * sizes; 'spots' only where 150 x 110 spots fit — elsewhere it must THROW):
 *   - the svg is w x h px with viewBox 0 0 w h (NO viewBox scaling), no <text>, no <image>
 *   - only token hexes; coral ONLY on [data-lcs-slot] rings and [data-lcs-spot] rects
 *   - every stroke-width >= 1.5; the glass 3, the waterline 2
 *   - rings: the top ring's centre y within 0.5 px of the waterline y and its x left of 0.5w;
 *     the floor ring's bottom within 1.5 px of the floor line; the rings do not intersect
 *     (centre distance > r1 + r2 + stroke); both rings carry identical attributes but cx/cy/slot;
 *     no pebble sits under a ring centre; ring diameter >= 18 px
 *   - legend-float: the blob centre ON the waterline (and equal to the rings' top-ring y at the
 *     same w x h); legend-sink: the blob centre below waterY + r, its bottom within 1.5 px of the
 *     rings' floor-ring bottom at the same w x h, every bubble's TOP below the wave's lowest
 *     trough-free depth (waterY + amplitude) — a bubble is in the water, never in the air
 *   - spots: 2 per zone, float spots centred ON the waterline, sink spots' bottom ON the floor line,
 *     inside the glass, clear of the tag column (x >= 0.28w), pairwise non-overlapping
 *   - the returned waterY / floorY / slots agree with the markup
 * Throws: w 111, h 55, mode 'bath', waterAt 0.2 / 0.5, spots 4, spots on 'rings'.
 * POISONS (each must FAIL for its own reason; the real primitive is the control):
 *   PT1 the top ring moved 4 px down             -> "top ring centre"
 *   PT2 the two rings with different dash         -> "rings differ"
 *   PT3 the floor ring overlapping the top ring   -> "rings intersect"
 *   PT4 an off-palette hex                        -> "off-palette"
 *   PT5 a bubble lifted into the air              -> "bubble"
 *   PT6 the legend-float blob sunk 6 px           -> "blob"
 *   PT7 the floor ring lifted 4 px off the gravel -> "not on the floor"   (lead review 2026-09-23)
 *   PT8 the float ring fully under water          -> "not ACROSS the waterline"
 *   PT9 the floor ring only tangent to the gravel -> "not settled"   (fix round 2, en landing panel)
 *   PT10 the legend-sink blob lifted 6 px          -> "not settled"
 */
'use strict';
const { color } = require('../primitives/_tokens.js');
const T = require('../primitives/water-tank.js');

const PALETTE = new Set(Object.values(color).map((c) => c.toUpperCase()));
const CORAL = color.coral.toUpperCase();
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

const tagsOf = (s, name) => [...s.matchAll(new RegExp(`<${name}\\s[^>]*?/?>`, 'g'))].map((m) => m[0]);
const attr = (tag, name) => { const m = new RegExp(`\\s${name}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
const num = (tag, name) => { const v = attr(tag, name); return v == null ? NaN : +v; };
/** the inner markup of the first <g data-lcs-tank-part="part"> */
function part(svg, p) { const i = svg.indexOf(`data-lcs-tank-part="${p}"`); if (i < 0) return null; const s = svg.indexOf('>', i) + 1; return svg.slice(s, svg.indexOf('</g>', s)); }

/** Every check on ONE emitted tank; returns findings (the poisons re-run it on doctored markup). */
function checkTank(svg, { w, h, mode }, ret, pairRef) {
  const f = [];
  const E = (c, m) => { if (!c) f.push(m); };
  const root = /^<svg\s[^>]*>/.exec(svg);
  E(root && num(root[0], 'width') === w && num(root[0], 'height') === h && attr(root[0], 'viewBox') === `0 0 ${w} ${h}`, `${mode} ${w}x${h}: not a px-geometry svg (width/height/viewBox)`);
  E(root && attr(root[0], 'data-lcs-tank-mode') === mode, `${mode}: data-lcs-tank-mode missing`);
  E(!/<text[\s>]/.test(svg) && !/<image[\s>]/.test(svg), `${mode} ${w}x${h}: text or an image inside the tank`);
  // palette + coral placement + stroke floor
  for (const m of svg.matchAll(/#[0-9A-Fa-f]{6}\b/g)) E(PALETTE.has(m[0].toUpperCase()), `${mode} ${w}x${h}: off-palette ${m[0]}`);
  for (const tg of [...svg.matchAll(/<(\w+)\s[^>]*>/g)].map((m) => m[0])) {
    if (/#F2784B/i.test(tg)) E(/data-lcs-slot=|data-lcs-spot=/.test(tg), `${mode} ${w}x${h}: coral outside a ring / spot (${tg.slice(0, 50)})`);
    const sw = attr(tg, 'stroke-width');
    if (sw != null) E(+sw >= 1.5, `${mode} ${w}x${h}: a stroke of ${sw} px < 1.5`);
  }
  // the waterline: the path in the waterline group, its M y = the mean line; amplitude = the control offset / 2
  const wl = tagsOf(part(svg, 'waterline') || '', 'path')[0];
  E(!!wl && attr(wl, 'stroke') === color.teal && num(wl, 'stroke-width') === 2, `${mode}: no teal 2 px waterline`);
  const wd = wl ? attr(wl, 'd') : '';
  const wn = (wd.match(/-?\d*\.?\d+/g) || []).map(Number);
  const waterY = wn[1];
  const amp = wn.length > 3 ? Math.abs(wn[3] - waterY) / 2 : 0;
  E(Math.abs((wd.match(/Q/g) || []).length - 6) === 0, `${mode}: the waterline is not 3 crests (6 halves)`);
  const glass = tagsOf(part(svg, 'glass') || '', 'path')[0];
  E(!!glass && num(glass, 'stroke-width') === 3, `${mode}: the glass is not 3 px`);
  const fl = tagsOf(part(svg, 'floor') || '', 'line').find((t) => /data-lcs-floor-top/.test(t));
  const floorY = fl ? num(fl, 'y1') : NaN;
  E(isFinite(floorY) && floorY > waterY + 10, `${mode}: no floor line below the water`);
  E(Math.abs(ret.waterY - waterY) < 0.01 && Math.abs(ret.floorY - floorY) < 0.01, `${mode}: returned waterY/floorY ≠ the markup`);
  const pebbles = tagsOf(part(svg, 'floor') || '', 'ellipse').map((t) => ({ cx: num(t, 'cx'), cy: num(t, 'cy'), rx: num(t, 'rx') }));
  E(pebbles.length === 4 && pebbles.every((p) => p.cy > floorY && p.cy < 0.97 * h), `${mode}: 4 pebbles in the gravel band`);
  // recon 2 (de panel): an OPEN or large pebble reads as an answer ring to colour — pebbles are small filled stones
  { const pt = tagsOf(part(svg, 'floor') || '', 'ellipse');
    E(pt.every((t) => { const f = (t.match(/fill="([^"]*)"/) || [])[1]; return f && f !== 'none' && f.toLowerCase() !== '#ffffff' && f !== 'white'; }), `${mode}: every pebble is a FILLED stone (never an open ring)`);
    E(pebbles.every((q) => q.rx <= 8), `${mode}: pebble rx <= 8 px (never ring-sized)`); }
  const rings = tagsOf(svg, 'circle').filter((t) => /data-lcs-slot=/.test(t));
  const blobTag = tagsOf(svg, 'path').find((t) => /data-lcs-blob=/.test(t));
  const blobOf = (t) => { const n = attr(t, 'd').match(/-?\d*\.?\d+/g).map(Number); const x0 = n[0], y0 = n[1]; const x1 = n[8]; const R = (x1 - x0) / 2; return { cx: x0 + R, cy: y0, R, bottom: y0 + 0.71 * R, top: y0 - 0.79 * R }; };
  if (mode === 'rings') {
    E(rings.length === 2, `rings ${w}x${h}: ${rings.length} rings ≠ 2`);
    const top = rings.find((t) => attr(t, 'data-lcs-slot') === 'top'), flo = rings.find((t) => attr(t, 'data-lcs-slot') === 'floor');
    if (top && flo) {
      const A = { cx: num(top, 'cx'), cy: num(top, 'cy'), r: num(top, 'r') }, B = { cx: num(flo, 'cx'), cy: num(flo, 'cy'), r: num(flo, 'r') };
      E(Math.abs(A.cy - waterY) <= 0.5, `rings ${w}x${h}: top ring centre y ${A.cy} is ${Math.abs(A.cy - waterY).toFixed(2)} px off the waterline ${waterY}`);
      E(A.cx < 0.5 * w, `rings ${w}x${h}: top ring centre not left of 0.5w`);
      // fix round 2 (en panel): a ring only TANGENT to the gravel line read as mid-water; it must SETTLE into the gravel
      // band — bottom >= 3 px under the gravel line and >= 2 px above the glass bottom (0.97h)
      E(B.cy + B.r >= floorY + 3 && B.cy + B.r <= 0.97 * h - 2, `rings ${w}x${h}: floor ring bottom ${(B.cy + B.r).toFixed(2)} is not on the floor — not settled into the gravel band ${floorY}..${(0.97 * h).toFixed(1)} (>= 3 px in, >= 2 px above the glass)`);
      E(A.cy - A.r < waterY - 2 && A.cy + A.r > waterY + 2, `rings ${w}x${h}: the top ring is not ACROSS the waterline (half above, half below)`);
      E(Math.hypot(A.cx - B.cx, A.cy - B.cy) > A.r + B.r + 2.5, `rings ${w}x${h}: rings intersect (centres ${Math.hypot(A.cx - B.cx, A.cy - B.cy).toFixed(1)} px apart, radii ${A.r}+${B.r})`);
      const strip = (t) => t.replace(/\s(cx|cy|data-lcs-slot)="[^"]*"/g, '');
      E(strip(top) === strip(flo), `rings ${w}x${h}: rings differ beyond position (${strip(top)} vs ${strip(flo)})`);
      E(2 * A.r >= 18, `rings ${w}x${h}: ring diameter ${2 * A.r} < 18`);
      for (const p of pebbles) for (const R of [A, B]) E(Math.abs(p.cx - R.cx) > p.rx, `rings ${w}x${h}: a pebble sits under a ring centre`);
      E(!!ret.slots && Math.abs(ret.slots.top.cy - A.cy) < 0.01 && Math.abs(ret.slots.floor.cy - B.cy) < 0.01, `rings ${w}x${h}: returned slots ≠ the markup`);
      if (pairRef) pairRef.rings = { topY: A.cy, floorBottom: B.cy + B.r };
    }
  } else E(rings.length === 0, `${mode}: rings on a non-rings mode`);
  if (mode === 'legend-float' || mode === 'legend-sink') {
    E(!!blobTag && attr(blobTag, 'fill') === color.teal, `${mode}: no teal blob`);
    if (blobTag) {
      const b = blobOf(blobTag);
      if (mode === 'legend-float') {
        E(Math.abs(b.cy - waterY) <= 0.5, `${mode} ${w}x${h}: blob centre ${b.cy} not on the waterline ${waterY}`);
        if (pairRef && pairRef.rings) E(Math.abs(b.cy - pairRef.rings.topY) <= 0.5, `${mode} ${w}x${h}: blob y ≠ the top ring y (the legend teaches the ring position)`);
        E(tagsOf(svg, 'path').filter((t) => /data-lcs-ripple/.test(t)).length === 4, `${mode}: 4 ripple arcs`);
      } else {
        E(b.cy > waterY + b.R, `${mode} ${w}x${h}: blob centre ${b.cy} not below waterY + r`);
        E(b.bottom >= floorY + 3 && b.bottom <= 0.97 * h - 2, `${mode} ${w}x${h}: the sunk blob's bottom ${b.bottom.toFixed(1)} is not settled into the gravel band (fix round 2)`);
        if (pairRef && pairRef.rings) E(Math.abs(b.bottom - pairRef.rings.floorBottom) <= 1.5, `${mode} ${w}x${h}: blob bottom ${b.bottom.toFixed(1)} ≠ the floor ring bottom ${pairRef.rings.floorBottom.toFixed(1)}`);
        const bub = tagsOf(svg, 'circle').filter((t) => /data-lcs-bubble/.test(t));
        E(bub.length === 3, `${mode}: ${bub.length} bubbles ≠ 3`);
        for (const t of bub) { const cy = num(t, 'cy'), r = num(t, 'r'); E(cy - r > waterY + amp, `${mode} ${w}x${h}: a bubble reaches the air (top ${(cy - r).toFixed(1)} <= ${(waterY + amp).toFixed(1)})`); E(cy + r < b.top, `${mode} ${w}x${h}: a bubble overlaps the blob`); }
      }
    }
  } else E(!blobTag, `${mode}: a legend blob on a non-legend mode`);
  const spots = tagsOf(svg, 'rect').filter((t) => /data-lcs-spot=/.test(t)).map((t) => ({ z: attr(t, 'data-lcs-spot'), x: num(t, 'x'), y: num(t, 'y'), w: num(t, 'width'), h: num(t, 'height') }));
  if (mode === 'spots') {
    E(spots.filter((s) => s.z === 'float').length === 2 && spots.filter((s) => s.z === 'sink').length === 2, `spots: 2 per zone`);
    for (const s of spots) {
      if (s.z === 'float') E(Math.abs(s.y + s.h / 2 - waterY) <= 0.5, `spots: a float spot is not centred on the waterline`);
      else E(Math.abs(s.y + s.h - floorY) <= 0.5, `spots: a sink spot's bottom is not on the floor`);
      E(s.x >= 0.28 * w - 0.5 && s.x + s.w <= 0.96 * w && s.y >= 0.06 * h, `spots: a spot leaves the tank / enters the tag column`);
      E(s.w >= 150 && s.h >= 110, 'spots: under 150 x 110');
    }
    for (let i = 0; i < spots.length; i++) for (let j = i + 1; j < spots.length; j++) { const a = spots[i], b = spots[j]; E(!(a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h), 'spots: two spots overlap'); }
  } else E(!spots.length, `${mode}: spots on a non-spots mode`);
  return f;
}

const SIZES = [[112, 56], [150, 75], [170, 85], [190, 95], [240, 150], [639, 520]];
function main() {
  assertions = 0; fails.length = 0;
  let built = 0;
  for (const [w, h] of SIZES) {
    const ref = {};
    for (const mode of ['rings', 'legend-float', 'legend-sink', 'empty', 'spots']) {
      let t = null;
      try { t = T.waterTank({ w, h, mode, spots: mode === 'spots' ? 2 : 0 }); } catch (e) {
        if (mode === 'spots') { ok(h < 300 || w < 500, `spots ${w}x${h} threw: ${e.message}`); continue; }
        if (mode === 'rings' && 0.32 * h < 18) { ok(/rings need h >= 57/.test(e.message), `rings ${w}x${h} threw for the wrong reason: ${e.message}`); continue; }
        ok(false, `${mode} ${w}x${h} threw: ${e.message}`); continue;
      }
      if (mode === 'spots') ok(h >= 300, `spots ${w}x${h}: 150 x 110 spots cannot fit a ${h} px tank — it should THROW`);
      if (mode === 'rings') ok(0.32 * h >= 18, `rings ${w}x${h}: rings under 18 px should THROW`);
      built++;
      for (const x of checkTank(t.svg, { w, h, mode }, t, ref)) ok(false, x);
      assertions += 20;
    }
  }
  // throws
  const throws = (o, re, m) => { let msg = null; try { T.waterTank(o); } catch (e) { msg = e.message; } ok(msg && re.test(msg), `${m}: ${msg || 'did not throw'}`); };
  throws({ w: 111, h: 60 }, /MIN_W/, 'w 111'); throws({ w: 170, h: 55 }, /MIN_H/, 'h 55'); throws({ mode: 'bath' }, /unknown mode/, 'mode bath');
  throws({ waterAt: 0.2 }, /waterAt/, 'waterAt 0.2'); throws({ waterAt: 0.5 }, /waterAt/, 'waterAt 0.5');
  throws({ w: 639, h: 520, mode: 'spots', spots: 4 }, /spots 4/, 'spots 4'); throws({ mode: 'rings', spots: 1 }, /spots 1 on mode/, 'spots on rings');

  // poisons
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  const base = T.waterTank({ w: 170, h: 85, mode: 'rings' });
  const ctl = checkTank(base.svg, { w: 170, h: 85, mode: 'rings' }, base, {});
  ok(!ctl.length, 'control: ' + ctl.join(' | '));
  const retOf = (svg) => ({ ...base, svg });
  const sink = T.waterTank({ w: 170, h: 85, mode: 'legend-sink' });
  const top = /<circle [^>]*data-lcs-slot="top"[^>]*\/>/.exec(base.svg)[0];
  const flo = /<circle [^>]*data-lcs-slot="floor"[^>]*\/>/.exec(base.svg)[0];
  { const s = base.svg.replace(top, top.replace(/cy="([\d.]+)"/, (m, v) => `cy="${+v + 4}"`)); judge('PT1 top ring 4 px down', checkTank(s, { w: 170, h: 85, mode: 'rings' }, { ...retOf(s), slots: null }, {}), /top ring centre/); }
  { const s = base.svg.replace(flo, flo.replace('stroke-dasharray="5 4"', 'stroke-dasharray="3 3"')); judge('PT2 rings with different dash', checkTank(s, { w: 170, h: 85, mode: 'rings' }, retOf(s), {}), /rings differ/); }
  { const s = base.svg.replace(flo, flo.replace(/cx="[\d.]+"/, 'cx="70"').replace(/cy="[\d.]+"/, `cy="${base.slots.top.cy + 16}"`)); judge('PT3 floor ring over the top ring', checkTank(s, { w: 170, h: 85, mode: 'rings' }, { ...retOf(s), slots: null }, {}), /rings intersect/); }
  { const s = base.svg.replace(color.tealSoft, '#AACCEE'); judge('PT4 off-palette water', checkTank(s, { w: 170, h: 85, mode: 'rings' }, retOf(s), {}), /off-palette/); }
  { const s = base.svg.replace(flo, flo.replace(/cy="([\d.]+)"/, (m, v) => `cy="${+v - 4}"`)); judge('PT7 floor ring lifted 4 px off the gravel', checkTank(s, { w: 170, h: 85, mode: 'rings' }, { ...retOf(s), slots: null }, {}), /floor ring bottom .* is not on the floor/); }
  // fix round 2: the pre-fix TANGENT placement (bottom 1 px into the gravel line) is now a poison; the settled ring is the control above
  { const s = base.svg.replace(flo, flo.replace(/cy="([\d.]+)"/, () => `cy="${Math.round((base.floorY + 1 - base.slots.floor.r) * 100) / 100}"`)); judge('PT9 floor ring only tangent to the gravel line (the pre-round-2 placement)', checkTank(s, { w: 170, h: 85, mode: 'rings' }, { ...retOf(s), slots: null }, {}), /floor ring bottom .* not settled into the gravel band/); }
  { const s = sink.svg.replace(/d="([^"]*)"([^>]*data-lcs-blob)/, (m, d, rest) => `d="${d.replace(/(-?[\d.]+) (-?[\d.]+)/g, (q, x, y) => `${x} ${Math.round((+y - 6) * 100) / 100}`)}"${rest}`); judge('PT10 the legend sunk blob lifted 6 px off the gravel', checkTank(s, { w: 170, h: 85, mode: 'legend-sink' }, { ...sink, svg: s }, {}), /sunk blob's bottom .* not settled/); }
  { const s = base.svg.replace(top, top.replace(/cy="([\d.]+)"/, (m, v) => `cy="${+v + base.slots.top.r + 3}"`)); judge('PT8 float ring fully under water', checkTank(s, { w: 170, h: 85, mode: 'rings' }, { ...retOf(s), slots: null }, {}), /top ring is not ACROSS the waterline/); }
  { const s = sink.svg.replace(/(<circle [^>]*cy=")([\d.]+)("[^>]*data-lcs-bubble)/, (m, a, v, b) => a + (sink.waterY - 3) + b); judge('PT5 a bubble in the air', checkTank(s, { w: 170, h: 85, mode: 'legend-sink' }, { ...sink, svg: s }, {}), /bubble reaches the air/); }
  const fl = T.waterTank({ w: 170, h: 85, mode: 'legend-float' });
  { const s = fl.svg.replace(/d="([^"]*)"([^>]*data-lcs-blob)/, (m, d, rest) => `d="${d.replace(/(-?[\d.]+) (-?[\d.]+)/g, (q, x, y) => `${x} ${Math.round((+y + 6) * 100) / 100}`)}"${rest}`); judge('PT6 float blob sunk 6 px', checkTank(s, { w: 170, h: 85, mode: 'legend-float' }, { ...fl, svg: s }, {}), /blob centre .* not on the waterline/); }

  console.log(`water-tank: ${built} tanks built across ${SIZES.length} sizes`);
  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) process.exit(main() ? 0 : 1);
module.exports = { main, checkTank };
