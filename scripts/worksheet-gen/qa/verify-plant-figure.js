#!/usr/bin/env node
/**
 * verify-plant-figure.js — the node gate of primitives/plant-figure.js (design
 * docs/worksheet-gen/b5-designs/G1-376-plants.md §2 "Node gate qa/verify-plant-figure.js";
 * the verify-body-figure.js pattern). Pure node, no browser: every assertion is made
 * on the EMITTED markup (the geometry is parsed back out of the svg string — paths
 * with M/L/Q/C/A/Z, rotated ellipses, rotated rects, circles), never on the
 * primitive's own tables, so a table and its drawing are two independent sources.
 *
 *   node scripts/worksheet-gen/qa/verify-plant-figure.js [--table]
 *
 * plantFigure, for ALL 16 anchor combinations (flower x leaf x stem x root picks) at
 * h 600 (the base) AND h 570 (F4), all six parts tagged:
 *   - every ring (the anchor) lies INSIDE its own part's drawn shape: flower -> a petal
 *     ellipse · leaf -> a leaf blade polygon · stem -> the stem polygon · root -> within
 *     half a stroke of a root curve · fruit -> the pod skin but NOT its window and NOT
 *     a seed (the solid tip) · seed -> a seed disc
 *   - root anchors BELOW the soil line (y 440), every other anchor ABOVE it
 *   - no thread intersects another thread; no thread passes within a disc radius of a
 *     tag it does not belong to; tag discs pairwise >= 32 px apart; every tag disc
 *     (with its halo) inside the viewBox
 *   - returned px anchors === ring centre (units) x scale
 *   - only token hexes; coral ONLY inside the tags group (never the plant); every stroke
 *     outside the tags renders 3 / 2.5 / 2 / 1.5 px (the one drawing language)
 *   - the pod and leaf N1 do not intersect; every pebble >= 8 units from every root
 * plus, at h 600, the minimum drawn sizes (design §2): leaf N4 ~82 x 36, flower 100 x 94,
 * pod 30 x 118 (window 20 wide), seed 14 x 14, root system 114 x 140 (each within 12 %).
 * Throws: h 179 (MIN_H 180), stage 'seedling', a fruit tag on the flowering stage, a
 * repeated part, two tags closer than 32 px (a doctored slot).
 * flowerSection: every FLOWER_ANCHORS ring inside its part (petal / sepal / stamen /
 * pistil / stalk / ovary), threads pairwise non-crossing, tags >= 32 px; the anthers are
 * the dark (teal) marks and the pistil light (creamDeep).
 * plantStage: all six stages build (+ potted from seedling), palette clean, the fruiting
 * pod holds >= 3 seed discs, the flowering stage none, the seed stage draws nothing
 * above the soil; plantPartIcon: all six parts, stamped.
 * POISONS (each must fail for its own reason; the real primitive is the control):
 *   PA  the seed anchor moved into the pod window between two seeds  -> "outside its shape"
 *   PB  the root anchor lifted above the soil line                  -> "above the soil line"
 *   PC  stem slot B dragged to (60,330) (its thread crosses the seed's) -> "threads ... cross"
 *   PD  an off-palette hex in the plant                              -> "off-palette"
 *   PE  coral painted on a petal                                     -> "coral in the plant"
 *   PF  the fruit anchor moved onto seed 4 (not the pod wall)        -> "outside its shape"
 *   PG  the fruit ring back on the solid pod tip (reads as a seed)   -> "wholly inside the pod"
 *   PH  the fruit ring on the wall beside seed 2 (one organ, 12 u)   -> "share the pod"
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const P = require('../primitives/plant-figure.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const CORAL = tokens.color.coral.toUpperCase();
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ---------------------------------------------------------------- markup parsing */
/** The inner markup of the first `<g ATTR>` block, balanced over nested <g>. */
function group(svg, attr) {
  const i = svg.indexOf(`<g ${attr}`);
  if (i < 0) return null;
  let depth = 0, k = i;
  const re = /<g[\s>]|<\/g>/g;
  re.lastIndex = i;
  let m;
  while ((m = re.exec(svg))) {
    if (m[0] === '</g>') { depth--; if (depth === 0) { k = m.index; break; } } else depth++;
  }
  return svg.slice(svg.indexOf('>', i) + 1, k);
}
const attrOf = (tag, name) => { const m = new RegExp(`\\s${name}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
const tagsOf = (s, name) => [...(s || '').matchAll(new RegExp(`<${name}\\s[^>]*?/?>`, 'g'))].map((m) => m[0]);
function rotOf(tag) { const t = attrOf(tag, 'transform'); if (!t) return null; const m = /rotate\(([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\)/.exec(t); return m ? { a: +m[1] * Math.PI / 180, cx: +m[2], cy: +m[3] } : null; }
function unrotate(p, r) { if (!r) return p; const dx = p[0] - r.cx, dy = p[1] - r.cy, c = Math.cos(-r.a), s = Math.sin(-r.a); return [r.cx + dx * c - dy * s, r.cy + dx * s + dy * c]; }
/** Sampled points of a path (M L Q C A Z absolute), as polylines (one per subpath). */
function pathPolys(d) {
  const toks = d.match(/[MLQCAZ]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  const polys = []; let poly = null, cmd = null, cur = [0, 0], i = 0;
  const num = () => +toks[i++];
  while (i < toks.length) {
    if (/[MLQCAZ]/.test(toks[i])) { cmd = toks[i++]; if (cmd === 'Z') { if (poly && poly.length) poly.closed = true; continue; } }
    if (cmd === 'M') { cur = [num(), num()]; poly = [cur]; polys.push(poly); cmd = 'L'; }
    else if (cmd === 'L') { cur = [num(), num()]; poly.push(cur); }
    else if (cmd === 'Q') { const c = [num(), num()], e = [num(), num()]; for (let k = 1; k <= 16; k++) { const u = k / 16; poly.push([(1 - u) ** 2 * cur[0] + 2 * (1 - u) * u * c[0] + u * u * e[0], (1 - u) ** 2 * cur[1] + 2 * (1 - u) * u * c[1] + u * u * e[1]]); } cur = e; }
    else if (cmd === 'C') { const c1 = [num(), num()], c2 = [num(), num()], e = [num(), num()]; for (let k = 1; k <= 20; k++) { const u = k / 20, v = 1 - u; poly.push([v ** 3 * cur[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u ** 3 * e[0], v ** 3 * cur[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u ** 3 * e[1]]); } cur = e; }
    else if (cmd === 'A') {
      const rx0 = num(), ry0 = num(), rot = num() * Math.PI / 180, large = num(), sweep = num(), x2 = num(), y2 = num();
      const [x1, y1] = cur, cosR = Math.cos(rot), sinR = Math.sin(rot);
      const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2, xp = cosR * dx + sinR * dy, yp = -sinR * dx + cosR * dy;
      let rx = Math.abs(rx0), ry = Math.abs(ry0); const lam = xp * xp / (rx * rx) + yp * yp / (ry * ry); if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
      const n2 = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp, den = rx * rx * yp * yp + ry * ry * xp * xp;
      let co = Math.sqrt(Math.max(0, n2 / den)); if (large === sweep) co = -co;
      const cxp = co * rx * yp / ry, cyp = -co * ry * xp / rx, cx = cosR * cxp - sinR * cyp + (x1 + x2) / 2, cy = sinR * cxp + cosR * cyp + (y1 + y2) / 2;
      const ang = (ux, uy, vx, vy) => (Math.sign(ux * vy - uy * vx) || 1) * Math.acos(Math.max(-1, Math.min(1, (ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy)))));
      const th1 = ang(1, 0, (xp - cxp) / rx, (yp - cyp) / ry); let dth = ang((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry);
      if (!sweep && dth > 0) dth -= 2 * Math.PI; else if (sweep && dth < 0) dth += 2 * Math.PI;
      for (let k = 1; k <= 16; k++) { const th = th1 + dth * k / 16; poly.push([cx + rx * Math.cos(th) * cosR - ry * Math.sin(th) * sinR, cy + rx * Math.cos(th) * sinR + ry * Math.sin(th) * cosR]); }
      cur = [x2, y2];
    } else i++;
  }
  return polys;
}
function inPoly(p, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c; } return c; }
function distPoly(p, poly) { let d = Infinity; for (let i = 1; i < poly.length; i++) { const a = poly[i - 1], b = poly[i], dx = b[0] - a[0], dy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))); d = Math.min(d, Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)); } return d; }
/** Hit-test shapes of a markup fragment: filled paths (closed), ellipses, circles, rects, stroked open paths / lines. */
function shapes(frag) {
  const out = [];
  for (const t of tagsOf(frag, 'path')) {
    const fill = attrOf(t, 'fill'), sw = +(attrOf(t, 'stroke-width') || 0);
    for (const poly of pathPolys(attrOf(t, 'd'))) out.push(fill && fill !== 'none' && poly.closed !== false && poly.length > 2 ? { kind: 'poly', poly, fill } : { kind: 'stroke', poly, sw });
  }
  for (const t of tagsOf(frag, 'ellipse')) out.push({ kind: 'ellipse', cx: +attrOf(t, 'cx'), cy: +attrOf(t, 'cy'), rx: +attrOf(t, 'rx'), ry: +attrOf(t, 'ry'), rot: rotOf(t), fill: attrOf(t, 'fill') });
  for (const t of tagsOf(frag, 'circle')) out.push({ kind: 'circle', cx: +attrOf(t, 'cx'), cy: +attrOf(t, 'cy'), r: +attrOf(t, 'r'), fill: attrOf(t, 'fill') });
  for (const t of tagsOf(frag, 'rect')) out.push({ kind: 'rect', x: +attrOf(t, 'x'), y: +attrOf(t, 'y'), w: +attrOf(t, 'width'), h: +attrOf(t, 'height'), rot: rotOf(t), fill: attrOf(t, 'fill') });
  for (const t of tagsOf(frag, 'line')) out.push({ kind: 'stroke', poly: [[+attrOf(t, 'x1'), +attrOf(t, 'y1')], [+attrOf(t, 'x2'), +attrOf(t, 'y2')]], sw: +(attrOf(t, 'stroke-width') || 0) });
  return out;
}
function hit(p, s, tol = 0) {
  if (s.kind === 'poly') return inPoly(p, s.poly);
  if (s.kind === 'stroke') return distPoly(p, s.poly) <= s.sw / 2 + tol;
  if (s.kind === 'circle') return Math.hypot(p[0] - s.cx, p[1] - s.cy) <= s.r + tol;
  if (s.kind === 'ellipse') { const q = unrotate(p, s.rot); return ((q[0] - s.cx) / s.rx) ** 2 + ((q[1] - s.cy) / s.ry) ** 2 <= 1; }
  if (s.kind === 'rect') { const q = unrotate(p, s.rot); return q[0] >= s.x && q[0] <= s.x + s.w && q[1] >= s.y && q[1] <= s.y + s.h; }
  return false;
}
function bbox(list) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const add = (x, y) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
  for (const s of list) {
    if (s.poly) s.poly.forEach(([x, y]) => add(x, y));
    else if (s.kind === 'circle') { add(s.cx - s.r, s.cy - s.r); add(s.cx + s.r, s.cy + s.r); }
    else if (s.kind === 'ellipse') { for (let k = 0; k < 32; k++) { const t = k / 32 * 2 * Math.PI; let p = [s.cx + s.rx * Math.cos(t), s.cy + s.ry * Math.sin(t)]; if (s.rot) { const dx = p[0] - s.rot.cx, dy = p[1] - s.rot.cy, c = Math.cos(s.rot.a), sn = Math.sin(s.rot.a); p = [s.rot.cx + dx * c - dy * sn, s.rot.cy + dx * sn + dy * c]; } add(p[0], p[1]); } }
    else if (s.kind === 'rect') { add(s.x, s.y); add(s.x + s.w, s.y + s.h); }
  }
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
const segCross = (a, b) => { const d = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]); return d(a[0], a[1], b[0]) * d(a[0], a[1], b[1]) < 0 && d(b[0], b[1], a[0]) * d(b[0], b[1], a[1]) < 0; };
const segDist = (p, s) => distPoly(p, s);
const POD_RING_SEP = 32;   // 4 ring radii: two rings on one organ must read as two places

/* ---------------------------------------------------------------- plantFigure checks */
/** Which drawn shapes may hold part `p`'s anchor (parsed from the markup). */
function partTest(svg, part) {
  const frag = group(svg, `data-lcs-part="${part}"`);
  if (frag == null) return null;
  const S = shapes(frag);
  if (part === 'flower') { const petals = S.filter((s) => s.kind === 'ellipse'); return (p) => petals.some((s) => hit(p, s)); }
  if (part === 'leaf') { const blades = S.filter((s) => s.kind === 'poly'); return (p) => blades.some((s) => hit(p, s)); }
  if (part === 'stem') { const b = S.filter((s) => s.kind === 'poly'); return (p) => b.some((s) => hit(p, s)); }
  if (part === 'root') { const r = S.filter((s) => s.kind === 'stroke'); return (p) => r.some((s) => hit(p, s, 0.6)); }
  if (part === 'seed') { const c = S.filter((s) => s.kind === 'circle'); return (p) => c.some((s) => hit(p, s)); }
  if (part === 'fruit') {
    const skin = tagsOf(frag, 'path').filter((t) => attrOf(t, 'data-lcs-pod') === 'skin').flatMap((t) => pathPolys(attrOf(t, 'd')));
    const win = S.filter((s) => s.kind === 'rect');
    const seeds = shapes(group(svg, 'data-lcs-part="seed"') || '').filter((s) => s.kind === 'circle');
    return (p) => skin.some((poly) => inPoly(p, poly)) && !win.some((s) => hit(p, s)) && !seeds.some((s) => hit(p, s));
  }
  return null;
}

function checkFigure(h, picks, opts = {}) {
  const tag = `h ${h} picks ${JSON.stringify(picks)}`;
  const tags = P.PARTS.map((part, i) => ({ part, n: i + 1, pick: picks[part] || 0 }));
  const r = P.plantFigure({ h, tags, ...(opts.args || {}) });
  const svg = opts.doctor ? opts.doctor(r.svg) : r.svg;
  const scale = h / P.VB_H;
  ok(Math.abs(r.width - P.VB_W * scale) < 0.02, `${tag}: width ${r.width} ≠ ${P.VB_W * scale}`);
  ok(/data-lcs-plant=""/.test(svg) && /data-lcs-stage="full"/.test(svg), `${tag}: root stamps missing`);
  // rings = anchors, inside their own shapes, soil rule
  const ringOf = {};
  for (const t of tagsOf(svg, 'circle')) { const p = attrOf(t, 'data-lcs-ring'); if (p) ringOf[p] = [+attrOf(t, 'cx'), +attrOf(t, 'cy')]; }
  for (const part of P.PARTS) {
    const a = ringOf[part];
    if (!ok(!!a, `${tag}: no ring for ${part}`)) continue;
    const test = partTest(svg, part);
    ok(!!test && test(a), `${tag}: anchor ${part} (${a[0]},${a[1]}) outside its shape`);
    if (part === 'root') ok(a[1] > P.SOIL_Y, `${tag}: root anchor above the soil line (y ${a[1]})`);
    else ok(a[1] < P.SOIL_Y, `${tag}: ${part} anchor below the soil line (y ${a[1]})`);
    ok(Math.abs(r.anchors[part].x - a[0] * scale) < 0.05 && Math.abs(r.anchors[part].y - a[1] * scale) < 0.05, `${tag}: returned px anchor ${part} ≠ ring x scale`);
  }
  // ONE ORGAN, TWO TAGS (landing review 2026-09-23): the pod carries the fruit AND the seed tag. Rings that both sit
  // inside the pod skin must be >= POD_RING_SEP units apart, and the FRUIT ring must cross the pod's outline (part of it
  // outside the skin) — a ring wholly inside the pod reads as one more seed (the old solid-tip ring did, in 6 locales).
  {
    const skin = tagsOf(group(svg, 'data-lcs-part="fruit"') || '', 'path').filter((t) => attrOf(t, 'data-lcs-pod') === 'skin').flatMap((t) => pathPolys(attrOf(t, 'd'))).map((p) => p.concat([p[0]]));
    const inPod = Object.entries(ringOf).filter(([, a]) => skin.some((poly) => inPoly(a, poly)));
    for (let i = 0; i < inPod.length; i++) for (let j = i + 1; j < inPod.length; j++) {
      const dd = Math.hypot(inPod[i][1][0] - inPod[j][1][0], inPod[i][1][1] - inPod[j][1][1]);
      ok(dd >= POD_RING_SEP, `${tag}: rings ${inPod[i][0]} and ${inPod[j][0]} share the pod ${dd.toFixed(1)} units apart (< ${POD_RING_SEP})`);
    }
    if (ringOf.fruit && skin.length) { const edge = Math.min(...skin.map((poly) => distPoly(ringOf.fruit, poly))); ok(edge < P.RING_R - 1, `${tag}: the fruit ring sits wholly inside the pod (${edge.toFixed(1)} units from its outline; it reads as a seed)`); }
  }
  // threads + tags
  const threads = tagsOf(svg, 'line').filter((t) => attrOf(t, 'data-lcs-thread')).map((t) => ({ p: attrOf(t, 'data-lcs-thread'), s: [[+attrOf(t, 'x1'), +attrOf(t, 'y1')], [+attrOf(t, 'x2'), +attrOf(t, 'y2')]] }));
  const discs = tagsOf(svg, 'circle').filter((t) => attrOf(t, 'data-lcs-tag-disc')).map((t) => ({ p: attrOf(t, 'data-lcs-tag-disc'), c: [+attrOf(t, 'cx'), +attrOf(t, 'cy')], r: +attrOf(t, 'r') }));
  ok(threads.length === 6 && discs.length === 6, `${tag}: ${threads.length} threads / ${discs.length} tags ≠ 6`);
  for (let i = 0; i < threads.length; i++) for (let j = i + 1; j < threads.length; j++) ok(!segCross(threads[i].s, threads[j].s), `${tag}: threads ${threads[i].p} and ${threads[j].p} cross`);
  for (const t of threads) for (const d of discs) if (d.p !== t.p) ok(segDist(d.c, t.s) > d.r + 2, `${tag}: thread ${t.p} runs over tag ${d.p}`);
  for (let i = 0; i < discs.length; i++) for (let j = i + 1; j < discs.length; j++) ok(Math.hypot(discs[i].c[0] - discs[j].c[0], discs[i].c[1] - discs[j].c[1]) * scale >= 32, `${tag}: tags ${discs[i].p} and ${discs[j].p} closer than 32 px`);
  const halo = 19 / scale;
  for (const d of discs) ok(d.c[0] - halo >= 0 && d.c[0] + halo <= P.VB_W && d.c[1] - halo >= 0 && d.c[1] + halo <= P.VB_H, `${tag}: tag ${d.p} leaves the viewBox`);
  // palette, coral, strokes
  for (const m of svg.matchAll(/(fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) ok(PALETTE.has(m[2].toUpperCase()), `${tag}: off-palette ${m[1]} ${m[2]}`);
  const tagsBlock = group(svg, 'data-lcs-tags') || '';
  const plantOnly = svg.replace(tagsBlock, '').replace(group(svg, 'data-lcs-threads') || '', '');
  ok(!new RegExp(CORAL, 'i').test(plantOnly), `${tag}: coral in the plant (outside the tags)`);
  for (const m of plantOnly.matchAll(/stroke-width="([^"]+)"/g)) { const px = +m[1] * scale; ok([3, 2.5, 2, 1.5].some((w) => Math.abs(px - w) < 0.06), `${tag}: a plant stroke renders ${px.toFixed(2)} px`); }
  return { r, svg };
}

function sizesAt600() {
  const svg = P.plantFigure({ h: 600 }).svg;
  const leafG = group(svg, 'data-lcs-leaf="N4"'), flowerG = group(svg, 'data-lcs-part="flower"'), fruitG = group(svg, 'data-lcs-part="fruit"'), rootG = group(svg, 'data-lcs-part="root"'), seedG = group(svg, 'data-lcs-part="seed"');
  const leaf = bbox(shapes(leafG).filter((s) => s.kind === 'poly'));
  const flower = bbox(shapes(flowerG).filter((s) => s.kind === 'ellipse' && s.fill === tokens.color.white));
  // the pod is TILTED: measure it in its own frame (the minimum-width caliper), not its screen bbox
  const podPts = tagsOf(fruitG, 'path').filter((t) => attrOf(t, 'data-lcs-pod') === 'skin').flatMap((t) => pathPolys(attrOf(t, 'd')).flat());
  let podSkin = { w: Infinity, h: 0 };
  for (let a = 0; a < 180; a += 0.25) { const c = Math.cos(a * Math.PI / 180), sn = Math.sin(a * Math.PI / 180); const pr = podPts.map(([x, y]) => x * c + y * sn), qr = podPts.map(([x, y]) => -x * sn + y * c); const w = Math.max(...pr) - Math.min(...pr); if (w < podSkin.w) podSkin = { w, h: Math.max(...qr) - Math.min(...qr) }; }
  const win = shapes(fruitG).filter((s) => s.kind === 'rect')[0];
  const seed = bbox(shapes(seedG).slice(0, 1));
  const roots = bbox(shapes(rootG));
  const near = (got, want, what) => ok(Math.abs(got - want) <= want * 0.12, `size ${what} ${got.toFixed(1)} ≠ ~${want}`);
  near(leaf.w, 82, 'leaf N4 w'); near(leaf.h, 36, 'leaf N4 h');
  near(flower.w, 100, 'flower w'); near(flower.h, 94, 'flower h');
  near(podSkin.w, 30, 'pod w'); near(podSkin.h, 118, 'pod h');
  ok(win && Math.abs(win.w - 20) < 0.5, `pod window ${win && win.w} ≠ 20 wide`);
  near(seed.w, 14, 'seed w'); near(seed.h, 14, 'seed h');
  near(roots.w, 114, 'root system w'); near(roots.h, 140, 'root system h');
  // pod vs N1
  const pod = pathPolys(attrOf(tagsOf(fruitG, 'path').find((t) => attrOf(t, 'data-lcs-pod') === 'skin'), 'd'))[0];
  const n1 = shapes(group(svg, 'data-lcs-leaf="N1"')).filter((s) => s.kind === 'poly')[0].poly;
  ok(!pod.some((p) => inPoly(p, n1)) && !n1.some((p) => inPoly(p, pod)), 'the pod and leaf N1 intersect');
  const podBottom = Math.max(...pod.map((p) => p[1])), n1Top = Math.min(...n1.map((p) => p[1]));
  // pebbles >= 8 units from every root
  const rootPolys = shapes(rootG).filter((s) => s.kind === 'stroke');
  for (const t of tagsOf(svg, 'ellipse').filter((e) => attrOf(e, 'data-lcs-pebble'))) {
    const c = [+attrOf(t, 'cx'), +attrOf(t, 'cy')];
    const d = Math.min(...rootPolys.map((s) => distPoly(c, s.poly)));
    ok(d >= 8, `pebble (${c}) centre ${d.toFixed(1)} units from a root (< 8, design §2)`);
  }
  return { leaf, flower, podSkin, seed, roots, podGap: n1Top - podBottom };
}

function checkFlowerSection() {
  const tags = ['petal', 'sepal', 'stamen', 'pistil', 'stalk', 'ovary'].map((part, i) => ({ part, n: i + 1 }));
  const r = P.flowerSection({ h: 418, tags });
  const svg = r.svg, scale = 418 / 440;
  const ringOf = {};
  for (const t of tagsOf(svg, 'circle')) { const p = attrOf(t, 'data-lcs-ring'); if (p) ringOf[p] = [+attrOf(t, 'cx'), +attrOf(t, 'cy')]; }
  for (const part of Object.keys(P.FLOWER_ANCHORS)) {
    const frag = group(svg, `data-lcs-part="${part}"`);
    const S = shapes(frag || '');
    ok(!!ringOf[part] && S.some((s) => hit(ringOf[part], s, 0.8)), `flowerSection: anchor ${part} outside its shape`);
  }
  const threads = tagsOf(svg, 'line').filter((t) => attrOf(t, 'data-lcs-thread')).map((t) => ({ p: attrOf(t, 'data-lcs-thread'), s: [[+attrOf(t, 'x1'), +attrOf(t, 'y1')], [+attrOf(t, 'x2'), +attrOf(t, 'y2')]] }));
  for (let i = 0; i < threads.length; i++) for (let j = i + 1; j < threads.length; j++) ok(!segCross(threads[i].s, threads[j].s), `flowerSection: threads ${threads[i].p} and ${threads[j].p} cross`);
  const discs = tagsOf(svg, 'g').filter((t) => /data-lcs-tag/.test(t));
  const centres = [...svg.matchAll(/<g data-lcs-tag data-lcs-part="(\w+)"[^>]*><circle cx="([\d.]+)" cy="([\d.]+)"/g)].map((m) => [m[1], +m[2], +m[3]]);
  ok(centres.length === 6, `flowerSection: ${centres.length} tags ≠ 6`);
  for (let i = 0; i < centres.length; i++) for (let j = i + 1; j < centres.length; j++) ok(Math.hypot(centres[i][1] - centres[j][1], centres[i][2] - centres[j][2]) * scale >= 32, `flowerSection: tags ${centres[i][0]} / ${centres[j][0]} < 32 px`);
  const anthers = shapes(group(svg, 'data-lcs-part="stamen"')).filter((s) => s.kind === 'ellipse');
  ok(anthers.length === 4 && anthers.every((s) => s.fill === tokens.color.teal), 'flowerSection: the 4 anthers are not the dark teal marks');
  const pist = shapes(group(svg, 'data-lcs-part="pistil"')).filter((s) => s.fill && s.fill !== 'none');
  ok(pist.length >= 3 && pist.every((s) => s.fill === tokens.color.creamDeep), 'flowerSection: the pistil is not LIGHT (creamDeep)');
  for (const m of svg.matchAll(/(fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) ok(PALETTE.has(m[2].toUpperCase()), `flowerSection: off-palette ${m[2]}`);
  void discs;
}

function checkStages() {
  for (const stage of ['seed', 'sprout', 'seedling', 'young', 'flowering', 'fruiting']) {
    for (const w of [96, 116]) {
      const r = P.plantStage({ stage, w });
      ok(Math.abs(r.height - w * 1.2) < 0.02, `plantStage ${stage}: h ${r.height} ≠ ${w * 1.2}`);
      ok(r.svg.includes(`data-lcs-figure="plant-${stage}"`), `plantStage ${stage}: no figure stamp`);
      for (const m of r.svg.matchAll(/(fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) ok(PALETTE.has(m[2].toUpperCase()), `plantStage ${stage}: off-palette ${m[2]}`);
      ok(!new RegExp(CORAL, 'i').test(r.svg), `plantStage ${stage}: coral in a stage`);
      const seeds = (r.svg.match(/data-lcs-seed="/g) || []).length;
      if (stage === 'fruiting') ok(seeds >= 3, `plantStage fruiting: ${seeds} seed discs < 3`);
      if (stage === 'flowering') ok(seeds === 0 && /data-lcs-petal/.test(r.svg), 'plantStage flowering: seeds or no petals');
      if (stage === 'seed') ok((group(r.svg, 'data-lcs-above') || '').replace(/<ellipse[^>]*data-lcs-seed-coat[^>]*\/>|<path[^>]*data-lcs-hilum[^>]*\/>/g, '') === '', 'plantStage seed: something besides the seed');
    }
  }
  for (const stage of ['seedling', 'young', 'flowering']) { const r = P.plantStage({ stage, w: 88, potted: true }); ok(/data-lcs-pot="rim"/.test(r.svg) && !/data-lcs-root="tap"/.test(r.svg), `plantStage ${stage} potted: no pot or roots drawn`); }
  for (const part of P.PARTS) { const r = P.plantPartIcon({ part, size: 32 }); ok(r.svg.includes(`data-lcs-part-icon="${part}"`), `plantPartIcon ${part}: no stamp`); }
}

function main() {
  const combos = [];
  for (const f of [0, 1]) for (const l of [0, 1]) for (const s of [0, 1]) for (const r of [0, 1]) combos.push({ flower: f, leaf: l, stem: s, root: r });
  for (const h of [600, 570]) for (const c of combos) checkFigure(h, c);
  const sz = sizesAt600();
  checkFlowerSection();
  checkStages();
  const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m ? 'threw "' + m + '"' : 'did not throw'}`); };
  throws(() => P.plantFigure({ h: 179 }), /MIN_H 180/, 'h 179');
  { let okm = true; try { P.plantFigure({ h: 180, stage: 'flowering', ground: 'none' }); } catch (e) { okm = false; } ok(okm, 'control: h 180 flowering builds'); }
  throws(() => P.plantFigure({ stage: 'seedling' }), /not full \| flowering/, 'stage seedling');
  throws(() => P.plantFigure({ stage: 'flowering', tags: [{ part: 'fruit', n: 1 }] }), /no fruit to tag/, 'fruit tag on flowering');
  throws(() => P.plantFigure({ tags: [{ part: 'leaf', n: 1 }, { part: 'leaf', n: 2 }] }), /tagged twice/, 'a repeated part');

  // poisons
  const log = []; let killed = 0; const TOTAL = 8;
  const own = (fn) => { const b = fails.length, a = assertions; fn(); const out = fails.splice(b); assertions = a; return out; };
  const judge = (name, f, re) => { const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  const withAnchor = (part, i, patch, fn) => { const A = P.ANCHORS[part][i], save = { ...A, slot: { ...A.slot } }; Object.assign(A, patch.a || {}); Object.assign(A.slot, patch.slot || {}); try { return fn(); } finally { Object.assign(A, save); A.slot = save.slot; } };
  judge('PA seed in the window', withAnchor('seed', 0, { a: { x: 104, y: 297 } }, () => own(() => checkFigure(600, combos[0]))), /anchor seed .* outside its shape/);
  judge('PB root above soil', withAnchor('root', 1, { a: { x: 150, y: 430 } }, () => own(() => checkFigure(600, { root: 1 }))), /root anchor above the soil line/);
  judge('PC stem thread crosses', withAnchor('stem', 1, { slot: { x: 60, y: 330 } }, () => own(() => checkFigure(600, { stem: 1 }))), /threads .* cross/);
  judge('PD off-palette', own(() => checkFigure(600, combos[0], { doctor: (s) => s.replace('fill="#DDEBE8"', 'fill="#88CC44"') })), /off-palette fill #88CC44/);
  judge('PE coral petal', own(() => checkFigure(600, combos[0], { doctor: (s) => s.replace(/<ellipse[^>]*data-lcs-petal="1"[^>]*>/, (t) => t.replace('fill="#FFFFFF"', 'fill="#F2784B"')) })), /coral in the plant/);
  judge('PF fruit ring on seed 4', withAnchor('fruit', 0, { a: { x: 100.4, y: 325.2 } }, () => own(() => checkFigure(600, combos[0]))), /anchor fruit .* outside its shape/);
  judge('PG fruit ring back on the solid tip', withAnchor('fruit', 0, { a: { x: 99, y: 348 }, slot: { x: 24, y: 352 } }, () => own(() => checkFigure(600, combos[0]))), /fruit ring sits wholly inside the pod/);
  judge('PH fruit ring beside seed 2', withAnchor('fruit', 0, { a: { x: 93, y: 290 } }, () => own(() => checkFigure(600, combos[0]))), /share the pod .* apart/);
  const ctl = own(() => checkFigure(600, combos[5])); log.push(`  control (real primitive): ${ctl.length} findings`); if (ctl.length) killed = -1;

  if (process.argv.includes('--table')) console.log('sizes at h 600:', JSON.stringify(sz, (k, v) => (typeof v === 'number' ? +v.toFixed(1) : v)));
  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + [...new Set(fails)].slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === TOTAL;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
  return pass;
}

if (require.main === module) process.exit(main() ? 0 : 1);
module.exports = { main, checkFigure, group, shapes, hit, pathPolys };
