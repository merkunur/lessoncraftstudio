/**
 * flat-shape.js — ONE exact flat shape (outline only) on an optional white
 * "lens" disc. nt10-E K-368 `2d-shapes` (design docs/worksheet-gen/b5-designs/
 * K-368-2d-shapes.md §2 "NEW primitives/flat-shape.js"). Pure SVG on the token
 * palette, Node-testable, no DOM.
 *
 *   flatShape({kind, sub, variant='none', vside=0, rot=0, flip=false, aspect=1,
 *              R, pad=3, sw=3, lens=0}) -> {svg, box, verts, meta}
 *
 * Geometry (the design's five steps, in this order):
 *   1. take the UNIT polygon (x right, y down); `flip` mirrors x;
 *   2. translate its bbox centre to the origin and scale so the LARGEST vertex
 *      distance is 1 (unit circumradius about the bbox centre);
 *   3. rotate by `rot` degrees CLOCKWISE on the page, scale by `R`;
 *   4. translate to the box centre (R+pad+lens, R+pad+lens). The box is the
 *      square of side 2(R+pad+lens) and never depends on `rot`: every vertex
 *      is within R of the centre, so any rotation stays inside;
 *   5. apply `variant` to side `vside`.
 * Emits ONE <path fill="none" stroke=teal stroke-width=sw round joins/caps>
 * (circle / ellipse as <circle> / <ellipse>, chord as a path with one arc),
 * and, if lens > 0, a <circle r=R+pad+lens fill=white data-lcs-lens> FIRST.
 * No text, no fill on any figure.
 *
 * Kinds (unit vertices before step 2; the design's table verbatim):
 *   square                     (-1,-1) (1,-1) (1,1) (-1,1)
 *   rectangle aspect a         (-a,-1) (a,-1) (a,1) (-a,1)   a in [1.5, 3.0]; a < 1.5 THROWS
 *   triangle equilateral       (0,-1) (√3/2,1/2) (-√3/2,1/2)
 *   triangle right             (0,0) (0,1.4) (2,1.4)
 *   triangle obtuse            (0,0) (2,0) (2.7,1.4)          116.6° (A's (2.9,1) is rejected)
 *   triangle scalene           (0,0) (2,0) (0.6,1.3)
 *   triangle skinny            (0,0) (2.6,0) (0.45,0.75)      short/long 0.336
 *   hexagon                    (cos 60k, sin 60k)
 *   circle                     <circle>, 64 sampled verts
 *   near-miss rhombus          (0,0) (2,0) (3,√3) (1,√3)
 *   near-miss parallelogram    (0,0) (2.4,0) (3.084,1.879) (0.684,1.879)   70°
 *   near-miss trapezoid        (0,0) (3,0) (2.3,1.3) (0.7,1.3)
 *   near-miss kite             (0,-1.2) (0.8,0) (0,1.6) (-0.8,0)
 *   near-miss ellipse          rx a, ry 1, a in [1.4, 1.8]
 *   near-miss chord            unit circle cut by the chord y = 0.75 (y down)
 *
 * Variants (side `vside`; the stamped vertex list is the UNMODIFIED polygon):
 *   gap     removes the middle g = clamp(max(14 / L, 0.16), 0.16, 0.30) of the
 *           side (open path from the gap's far end round to its near end);
 *           circle: a 30° missing arc centred on the figure's "top" (rotated).
 *           A side too short for gL − sw >= 11 THROWS (the 0.30 cap cannot
 *           reach 14 px on a side < 46.7 px — gap a longer side).
 *   curved  the side as a quadratic Bézier, control = mid + 0.40 L n_out
 *           (sagitta 0.20 L); the figure is then shrunk about the centre until
 *           the curve's farthest point is R (the bulge would otherwise leave
 *           the lens clearance: +4..+9 px at R 44..69, measured)
 *   round   EVERY corner filleted, r = 0.25 × shortest side, trim
 *           t = r / tan(θ/2) must be <= 0.45 of each adjacent side (else THROWS)
 * Near-misses AND variants (a variant is a near-miss) are never drawn at
 * R < 44 (throws).
 *
 * Stamps on the <svg>: data-lcs-prim="flat-shape" data-lcs-verts="x,y;…" (px,
 * the unmodified polygon) data-lcs-variant data-lcs-vside data-lcs-rot
 * data-lcs-R data-lcs-kind (+ data-lcs-sub). data-lcs-kind / -sub are DEBUG
 * ONLY: every gate re-derives the kind from the drawn path.
 *
 * Exports: flatShape, UNIT, unitPolygon, minR, measurePolygon, KNOBS (the
 * variant constants; the primitive gate poisons them), NEAR_MISS, TRUE_KINDS.
 */
'use strict';
const T = require('./_tokens.js');
const { esc } = require('./_svg.js');

const S3 = Math.sqrt(3);
/** The design's unit polygons (x right, y down), before normalisation. */
const UNIT = {
  square: () => [[-1, -1], [1, -1], [1, 1], [-1, 1]],
  rectangle: (a) => [[-a, -1], [a, -1], [a, 1], [-a, 1]],
  'triangle/equilateral': () => [[0, -1], [S3 / 2, 0.5], [-S3 / 2, 0.5]],
  'triangle/right': () => [[0, 0], [0, 1.4], [2, 1.4]],
  'triangle/obtuse': () => [[0, 0], [2, 0], [2.7, 1.4]],
  'triangle/scalene': () => [[0, 0], [2, 0], [0.6, 1.3]],
  'triangle/skinny': () => [[0, 0], [2.6, 0], [0.45, 0.75]],
  hexagon: () => [0, 1, 2, 3, 4, 5].map((k) => [Math.cos(k * Math.PI / 3), Math.sin(k * Math.PI / 3)]),
  rhombus: () => [[0, 0], [2, 0], [3, S3], [1, S3]],
  parallelogram: () => [[0, 0], [2.4, 0], [3.084, 1.879], [0.684, 1.879]],
  trapezoid: () => [[0, 0], [3, 0], [2.3, 1.3], [0.7, 1.3]],
  kite: () => [[0, -1.2], [0.8, 0], [0, 1.6], [-0.8, 0]],
};
const TRUE_KINDS = ['circle', 'square', 'rectangle', 'triangle', 'hexagon'];
const NEAR_MISS = ['rhombus', 'parallelogram', 'trapezoid', 'kite', 'ellipse', 'chord'];
const TRIANGLE_SUBS = ['equilateral', 'right', 'obtuse', 'scalene', 'skinny'];
const CHORD_Y = 0.75;
const CIRCLE_SAMPLES = 64;
/** Variant + validity constants. The primitive gate (qa/verify-flat-shape.js) poisons these; a page never touches them. */
const KNOBS = {
  gapPx: 14, gapMin: 0.16, gapMax: 0.30,   // gap fraction of the side
  gapVisibleMin: 11,                       // the design's claim "gL - sw >= 11" as a guard: a side shorter than 46.7 px cannot carry a gap
  curveK: 0.40,                            // control offset / side length (sagitta = curveK / 2)
  roundK: 0.25,                            // fillet radius / shortest side
  roundTrimMax: 0.45,                      // trim / adjacent side
  rectMin: 1.5, rectMax: 3.0,              // rectangle aspect
  ellipseMin: 1.4, ellipseMax: 1.8,        // ellipse aspect
  circleGapDeg: 30,
  nearMissMinR: 44,
};

const r2 = (v) => Math.round(v * 100) / 100;
const fmt = (v) => String(r2(v) === 0 ? 0 : r2(v));

function unitKey(kind, sub) { return kind === 'triangle' ? 'triangle/' + (sub || 'equilateral') : kind; }

/** The unit polygon for a kind (flip + normalisation applied: bbox centre at 0, max vertex distance 1). */
function unitPolygon(kind, sub, aspect, flip, _unit) {
  let pts;
  if (_unit) pts = _unit.map((p) => p.slice());
  else if (kind === 'rectangle') pts = UNIT.rectangle(aspect);
  else {
    const f = UNIT[unitKey(kind, sub)];
    if (!f) throw new Error(`flat-shape: unknown kind "${kind}"${sub ? ' / "' + sub + '"' : ''}`);
    pts = f();
  }
  if (flip) pts = pts.map(([x, y]) => [-x, y]).reverse();
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  pts = pts.map(([x, y]) => [x - cx, y - cy]);
  const m = Math.max(...pts.map(([x, y]) => Math.hypot(x, y)));
  return pts.map(([x, y]) => [x / m, y / m]);
}

/** Minimum caliper width + maximum extent of a CONVEX point set (px or unit). */
function measurePolygon(pts) {
  let minW = Infinity, maxE = 0;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (L < 1e-9) continue;
    let w = 0;
    for (const p of pts) w = Math.max(w, Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / L);
    minW = Math.min(minW, w);
  }
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) maxE = Math.max(maxE, Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]));
  return { minWidth: minW, maxExtent: maxE };
}

function unitMeasure(kind, sub, aspect, _unit) {
  if (kind === 'circle') return { minWidth: 2, maxExtent: 2 };
  if (kind === 'ellipse') { const a = aspect; return { minWidth: 2 / a, maxExtent: 2 }; }
  if (kind === 'chord') {
    const pts = chordUnitPoints(256).pts;
    return measurePolygon(pts);
  }
  return measurePolygon(unitPolygon(kind, sub, aspect, false, _unit));
}

/**
 * The smallest R at which a kind meets the page floors: R >= max(minWidth / unitMinWidth,
 * maxWidth / unitMaxExtent) (design §2 "Per-kind minimum R"; K floors 30 / 72).
 */
function minR(kind, sub, aspect, floors) {
  const f = floors || {};
  const minWidth = f.minWidth == null ? 30 : f.minWidth, maxWidth = f.maxWidth == null ? 72 : f.maxWidth;
  const u = unitMeasure(kind, sub, kind === 'rectangle' || kind === 'ellipse' ? aspect : 1, f._unit);
  return Math.max(minWidth / u.minWidth, maxWidth / u.maxExtent);
}

/** The chord segment's unit outline: bbox centre at 0, max distance 1. Returns {pts, scale, cy} (cy = the bbox shift). */
function chordUnitPoints(n) {
  const x0 = Math.sqrt(1 - CHORD_Y * CHORD_Y);
  const cy = (-1 + CHORD_Y) / 2;                     // bbox y in [-1, 0.75]
  const a0 = Math.atan2(CHORD_Y, x0);               // right chord end (angle below the x axis, y down)
  const a1 = Math.PI - a0;                          // left chord end
  const raw = [];
  // the arc from the right end, over the TOP (angles decreasing through -π/2), to the left end
  for (let k = 0; k <= n; k++) { const t = a0 - (2 * Math.PI - (a1 - a0)) * k / n; raw.push([Math.cos(t), Math.sin(t) - cy]); }
  const m = Math.max(...raw.map(([x, y]) => Math.hypot(x, y)));
  return { pts: raw.map(([x, y]) => [x / m, y / m]), scale: 1 / m, cy, x0 };
}

function rotPt([x, y], deg) {
  const t = deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
  return [x * c - y * s, x * s + y * c];
}

function signedArea2(pts) { let a = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; } return a; }

function pathPolygon(P) { return 'M' + P.map((p) => fmt(p[0]) + ' ' + fmt(p[1])).join(' L') + ' Z'; }

function variantPath(P, variant, vside, sw) {
  const n = P.length;
  const at = (i) => P[((i % n) + n) % n];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const len = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  const c = P.reduce((s, p) => [s[0] + p[0] / n, s[1] + p[1] / n], [0, 0]);
  if (variant === 'gap') {
    const A = at(vside), B = at(vside + 1), L = len(A, B);
    const g = Math.min(Math.max(KNOBS.gapPx / L, KNOBS.gapMin), KNOBS.gapMax);
    if (g * L - sw < KNOBS.gapVisibleMin - 1e-9 && !KNOBS._allowShortGap) throw new Error(`flat-shape: side ${vside} (${L.toFixed(1)} px) is too short for a gap (visible ${(g * L - sw).toFixed(1)} px < ${KNOBS.gapVisibleMin}) — gap a longer side`);
    const near = lerp(A, B, 0.5 - g / 2), far = lerp(A, B, 0.5 + g / 2);
    const seq = [far];
    for (let k = 1; k <= n; k++) seq.push(at(vside + k));
    seq.push(near);
    return { d: 'M' + seq.map((p) => fmt(p[0]) + ' ' + fmt(p[1])).join(' L'), g, visibleGap: g * L - sw };
  }
  if (variant === 'curved') {
    const A = at(vside), B = at(vside + 1), L = len(A, B);
    const mid = lerp(A, B, 0.5);
    let nx = (B[1] - A[1]) / L, ny = -(B[0] - A[0]) / L;
    if ((mid[0] + nx - c[0]) ** 2 + (mid[1] + ny - c[1]) ** 2 < (mid[0] - c[0]) ** 2 + (mid[1] - c[1]) ** 2) { nx = -nx; ny = -ny; }
    const ctl = [mid[0] + KNOBS.curveK * L * nx, mid[1] + KNOBS.curveK * L * ny];
    let d = 'M' + fmt(A[0]) + ' ' + fmt(A[1]) + ' Q' + fmt(ctl[0]) + ' ' + fmt(ctl[1]) + ' ' + fmt(B[0]) + ' ' + fmt(B[1]);
    for (let k = 2; k <= n; k++) d += ' L' + fmt(at(vside + k)[0]) + ' ' + fmt(at(vside + k)[1]);
    return { d: d + ' Z', sagitta: KNOBS.curveK * L / 2 };
  }
  if (variant === 'round') {
    const sides = P.map((p, i) => len(p, at(i + 1)));
    const r = KNOBS.roundK * Math.min(...sides);
    const cw = signedArea2(P) > 0 ? 1 : 0;   // y down: positive area = clockwise on the page
    const cut = [];
    for (let i = 0; i < n; i++) {
      const v = at(i), p = at(i - 1), q = at(i + 1);
      const u1 = [(p[0] - v[0]) / len(v, p), (p[1] - v[1]) / len(v, p)], u2 = [(q[0] - v[0]) / len(v, q), (q[1] - v[1]) / len(v, q)];
      const th = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])));
      const t = r / Math.tan(th / 2);
      if (t > KNOBS.roundTrimMax * len(v, p) + 1e-9 || t > KNOBS.roundTrimMax * len(v, q) + 1e-9) {
        throw new Error(`flat-shape: round corner ${i} trims ${t.toFixed(1)} px of a ${Math.min(len(v, p), len(v, q)).toFixed(1)} px side (> ${KNOBS.roundTrimMax}) — this figure cannot be rounded`);
      }
      cut.push({ inP: [v[0] + u1[0] * t, v[1] + u1[1] * t], outP: [v[0] + u2[0] * t, v[1] + u2[1] * t] });
    }
    let d = 'M' + fmt(cut[0].outP[0]) + ' ' + fmt(cut[0].outP[1]);
    for (let k = 1; k <= n; k++) {
      const cc = cut[k % n];
      d += ' L' + fmt(cc.inP[0]) + ' ' + fmt(cc.inP[1]) + ' A' + fmt(r) + ' ' + fmt(r) + ' 0 0 ' + cw + ' ' + fmt(cc.outP[0]) + ' ' + fmt(cc.outP[1]);
    }
    return { d: d + ' Z', fillet: r };
  }
  throw new Error(`flat-shape: unknown variant "${variant}"`);
}

function flatShape(o) {
  const {
    kind, sub, variant = 'none', vside = 0, rot = 0, flip = false, R, pad = 3, sw = 3, lens = 0, _unit,
  } = o || {};
  let aspect = o && o.aspect != null ? o.aspect : 1;
  if (!(R > 0)) throw new Error(`flat-shape: R must be > 0 (got ${R})`);
  if (!(lens >= 0)) throw new Error(`flat-shape: lens must be >= 0 (got ${lens})`);
  if (!['none', 'gap', 'curved', 'round'].includes(variant)) throw new Error(`flat-shape: unknown variant "${variant}"`);
  const polygonal = kind !== 'circle' && kind !== 'ellipse' && kind !== 'chord';
  if (kind === 'rectangle') {
    if (!(aspect >= KNOBS.rectMin - 1e-9)) throw new Error(`flat-shape: rectangle aspect ${aspect} < ${KNOBS.rectMin} — a near-square rectangle never reaches a page`);
    if (!(aspect <= KNOBS.rectMax + 1e-9)) throw new Error(`flat-shape: rectangle aspect ${aspect} > ${KNOBS.rectMax}`);
  } else if (kind === 'ellipse') {
    if (!(aspect >= KNOBS.ellipseMin - 1e-9 && aspect <= KNOBS.ellipseMax + 1e-9)) throw new Error(`flat-shape: ellipse aspect ${aspect} outside ${KNOBS.ellipseMin}..${KNOBS.ellipseMax}`);
  } else aspect = 1;
  if (kind === 'triangle' && sub && !TRIANGLE_SUBS.includes(sub)) throw new Error(`flat-shape: unknown triangle "${sub}"`);
  if (NEAR_MISS.includes(kind) && R < KNOBS.nearMissMinR - 1e-9) throw new Error(`flat-shape: near-miss ${kind} at R ${R} < ${KNOBS.nearMissMinR}`);
  if (NEAR_MISS.includes(kind) && variant !== 'none') throw new Error(`flat-shape: a near-miss (${kind}) carries no variant`);
  if (variant !== 'none' && R < KNOBS.nearMissMinR - 1e-9) throw new Error(`flat-shape: a ${variant} variant is a near-miss and is never drawn at R ${R} < ${KNOBS.nearMissMinR}`);
  if ((kind === 'ellipse' || kind === 'chord') && variant !== 'none') throw new Error(`flat-shape: ${kind} carries no variant`);
  if (kind === 'circle' && (variant === 'curved' || variant === 'round')) throw new Error(`flat-shape: a circle cannot be ${variant}`);

  const half = R + pad + lens;
  const box = 2 * half;
  const C = [half, half];
  const place = (p) => { const q = rotPt(p, rot); return [C[0] + q[0] * R, C[1] + q[1] * R]; };
  const stroke = { fill: 'none', stroke: T.color.teal, 'stroke-width': sw, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
  const A = (obj) => Object.entries(obj).map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
  let figure, verts, extra = {};

  if (kind === 'circle') {
    verts = [];
    for (let k = 0; k < CIRCLE_SAMPLES; k++) { const t = 2 * Math.PI * k / CIRCLE_SAMPLES; verts.push([C[0] + R * Math.cos(t), C[1] + R * Math.sin(t)]); }
    if (variant === 'gap') {
      const g = KNOBS.circleGapDeg * Math.PI / 180;
      const mid = (rot - 90) * Math.PI / 180;           // the rotated "top"
      const a0 = mid + g / 2, a1 = mid - g / 2 + 2 * Math.PI;
      const p0 = [C[0] + R * Math.cos(a0), C[1] + R * Math.sin(a0)], p1 = [C[0] + R * Math.cos(a1), C[1] + R * Math.sin(a1)];
      figure = `<path d="M${fmt(p0[0])} ${fmt(p0[1])} A${fmt(R)} ${fmt(R)} 0 1 1 ${fmt(p1[0])} ${fmt(p1[1])}"${A(stroke)}/>`;
      extra.visibleGap = 2 * R * Math.sin(g / 2) - sw;
    } else figure = `<circle cx="${fmt(C[0])}" cy="${fmt(C[1])}" r="${fmt(R)}"${A(stroke)}/>`;
  } else if (kind === 'ellipse') {
    const rx = R, ry = R / aspect;
    verts = [];
    for (let k = 0; k < CIRCLE_SAMPLES; k++) { const t = 2 * Math.PI * k / CIRCLE_SAMPLES; verts.push(place([Math.cos(t), Math.sin(t) / aspect])); }
    figure = `<ellipse cx="${fmt(C[0])}" cy="${fmt(C[1])}" rx="${fmt(rx)}" ry="${fmt(ry)}" transform="rotate(${fmt(rot)} ${fmt(C[0])} ${fmt(C[1])})"${A(stroke)}/>`;
  } else if (kind === 'chord') {
    const cu = chordUnitPoints(CIRCLE_SAMPLES);
    verts = cu.pts.map(place);
    const rr = R * cu.scale;
    const flipSign = flip ? -1 : 1;
    const right = place([flipSign * cu.x0 * cu.scale, (CHORD_Y - cu.cy) * cu.scale]);
    const left = place([-flipSign * cu.x0 * cu.scale, (CHORD_Y - cu.cy) * cu.scale]);
    // from the right end over the top to the left end = counter-clockwise on the page (sweep 0); a flip reverses it
    figure = `<path d="M${fmt(right[0])} ${fmt(right[1])} A${fmt(rr)} ${fmt(rr)} 0 1 ${flip ? 1 : 0} ${fmt(left[0])} ${fmt(left[1])} Z"${A(stroke)}/>`;
    extra.radius = rr;
    extra.sagitta = rr * (1 - CHORD_Y);
  } else {
    const U = unitPolygon(kind, sub, aspect, flip, _unit);
    verts = U.map(place);
    if (variant === 'none') figure = `<path d="${pathPolygon(verts)}"${A(stroke)}/>`;
    else {
      if (!(Number.isInteger(vside) && vside >= 0 && vside < verts.length)) throw new Error(`flat-shape: vside ${vside} outside 0..${verts.length - 1}`);
      let v = variantPath(verts, variant, vside, sw);
      if (variant === 'curved') {
        // the bulge would leave the circumradius disc (sagitta 0.20 L past a side whose ends are ON the circle):
        // shrink the whole figure about the centre until the curve's farthest point is R, so the box stays
        // 2(R+pad+lens) and the lens clearance holds at every rotation (measured: +4..+9 px at R 44..69 unshrunk).
        const q = /Q([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)/.exec(v.d);
        const A0 = verts[vside], ctl = [+q[1], +q[2]], B0 = verts[(vside + 1) % verts.length];
        let far = 0;
        for (let k = 0; k <= 64; k++) { const u = k / 64; const x = (1 - u) ** 2 * A0[0] + 2 * (1 - u) * u * ctl[0] + u * u * B0[0], y = (1 - u) ** 2 * A0[1] + 2 * (1 - u) * u * ctl[1] + u * u * B0[1]; far = Math.max(far, Math.hypot(x - C[0], y - C[1])); }
        if (far > R) {
          const k = R / far;
          verts = verts.map((p) => [C[0] + (p[0] - C[0]) * k, C[1] + (p[1] - C[1]) * k]);
          v = variantPath(verts, variant, vside, sw);
          extra.curveShrink = k;
        }
      }
      figure = `<path d="${v.d}"${A(stroke)}/>`;
      Object.assign(extra, v);
      delete extra.d;
    }
  }
  const unitM = polygonal ? measurePolygon(unitPolygon(kind, sub, aspect, flip, _unit)) : unitMeasure(kind, sub, aspect);
  const lensSvg = lens > 0 ? `<circle data-lcs-lens="1" cx="${fmt(C[0])}" cy="${fmt(C[1])}" r="${fmt(half)}" fill="${T.color.white}"/>` : '';
  const vertStamp = verts.map((p) => fmt(p[0]) + ',' + fmt(p[1])).join(';');
  const rootAttrs = {
    xmlns: 'http://www.w3.org/2000/svg', width: fmt(box), height: fmt(box), viewBox: `0 0 ${fmt(box)} ${fmt(box)}`, role: 'img', 'aria-hidden': 'true',
    'data-lcs-prim': 'flat-shape', 'data-lcs-verts': vertStamp, 'data-lcs-variant': variant, 'data-lcs-vside': variant === 'none' ? '' : vside,
    'data-lcs-rot': fmt(rot), 'data-lcs-R': fmt(R), 'data-lcs-kind': kind, 'data-lcs-sub': sub || '',
    style: 'display:block;overflow:visible',
  };
  const svg = `<svg${A(rootAttrs)}>${lensSvg}${figure}</svg>`;
  return {
    svg, box, verts,
    meta: { kind, sub: sub || null, variant, vside: variant === 'none' ? null : vside, rot, flip, aspect, R, pad, sw, lens,
      minWidth: unitM.minWidth * R, maxExtent: unitM.maxExtent * R, ...extra },
  };
}

module.exports = { flatShape, UNIT, unitPolygon, unitMeasure, minR, measurePolygon, KNOBS, NEAR_MISS, TRUE_KINDS, TRIANGLE_SUBS, CHORD_Y };
