/**
 * body-figure.js — the K-354 `human-body` apparatus: ONE tall line-art child,
 * front view, neutral (no skin tone, no gender cue), pure SVG on
 * primitives/_tokens.js. Design: docs/worksheet-gen/b4-designs/K-354-human-body.md
 * §2 "NEW primitives/body-figure.js"; every ruling in _work/K-354-critic.md.
 *
 *   bodyFigure({ h = 504, fill = 'cream'|'white', hide = [], markers = [], id })
 *     -> { svg, width, height, scale, anchors, regions, obstacles }
 *
 *   viewBox 0 0 300 560 (midline x 150); width = h * 300/560. Stroke teal
 *   3 PX at every h (user units = 3/scale, so a h-300 figure and a h-540
 *   figure carry the same 3 px outline); detail lines (hair strands, ear
 *   arc, finger seams) 1.5 px (`stroke.grid`); the knee arc 2.5 px; fill
 *   cream (default; the page is white) or white (inside cream cards, on the
 *   colouring face). Eyes are teal discs. Coral appears ONLY in `markers`
 *   (the component draws its own coral rings). No other hex.
 *
 *   ANCHORS (16 ids, figure units; bilateral carry {L, R}, nose / mouth /
 *   neck are midline points). Returned SCALED in px, relative to the svg's
 *   top-left. Every anchor lies inside its own drawn shape (asserted by
 *   qa/verify-body-figure.js against the geometry, not eyeballed).
 *   Deviations from the design table, each measured in the build record:
 *     head  (122,86)/(178,86)  not (118,72): at y 72 a horizontal leader runs
 *           through the ear bump (y 53..79) 5.4 px from the ear anchor;
 *           at y 86 the ring (r 7 px) sits on the lower cheek, inside the
 *           disc by >= 1.4 units, 7 units below the ear.
 *     hair  (130,34)/(170,34)  not (128,30): at (128,30) the ring's top
 *           (22.2) reaches the cap's outer arc (23.6 - 4); at (130,34) the
 *           whole ring is inside the cap and above the fringe (47).
 *     neck  (150,118) midline, not (140,118)/(160,118): the neck is 20
 *           units wide and a r 7 px ring is 15.6 units across — off-centre
 *           it straddles the neck's outline; centred it ENCIRCLES the neck.
 *     toe   (102,537)/(198,537) not (140,538)/(160,538): a leader from the
 *           big toe (inside) runs across the four other toes; from the two
 *           outer toes it leaves the foot at once.
 *
 *   REGIONS (12 fill ids, each a <g data-lcs-region="<id>">): hair head neck
 *   torso arm-L arm-R hand-L hand-R leg-L leg-R foot-L foot-R. `arm-X` =
 *   upper + fore (one tapered silhouette path, elbow rounded); `hand-X` =
 *   palm + four fingers (one comb silhouette) + thumb; `leg-X` = thigh +
 *   shin (one tapered path) + knee arc; `foot-X` = ellipse + five toe discs.
 *   The eyes ride in `head`; ear-L / ear-R / nose / mouth are FEATURES
 *   (<g data-lcs-feature>) drawn on top of the head.
 *
 *   HIDEABLE: arm-L arm-R hand-L hand-R leg-L leg-R foot-L foot-R hair
 *   mouth nose ear-L ear-R. A hidden id is stamped data-lcs-hidden on the
 *   root and its element is ABSENT from the DOM (never display:none).
 *   Hiding `hand-X` leaves the forearm's round cap as a wrist; `foot-X`
 *   the shin's cap; `leg-X` also drops that foot; `arm-X` also that hand.
 *
 *   markers:[{id, side, n}]  coral disc r 13 px at the anchor + white Baloo 2
 *   700 16 numeral, data-lcs-marker="<id>" data-lcs-n; centres >= 30 px apart
 *   (asserted).
 *
 *   regions  [{id, bbox:{x,y,w,h} px, bboxMin, min}] — per fill region at
 *   this h: `bboxMin` = the smaller bbox dimension (the F4 "an omitted class
 *   is >= 14 px" floor reads it) and `min` = the NARROWEST drawn width a
 *   crayon meets (the forearm 26, the palm 34, the shin 34, the foot 36, the
 *   head 92, the neck 20, the torso 100 — the F2 >= 24 px floor reads it).
 *   obstacles  the drawn shapes in px (circle / capsule / rect / ellipse)
 *   tagged by region, so a label component can reject a leader that crosses
 *   a limb it does not belong to (templates/components-b4/human-body.js).
 *
 *   MIN_H 240 (throws below: the eye disc falls under 2 px); LABEL_MIN_H 420
 *   (the label component asserts it: three 64 px lanes a side need the
 *   anchors spread >= 400 px); MAX_H 560.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, esc } = require('./_svg.js');

const T = tokens.color;
const F = tokens.font;
const S = tokens.stroke;

const VB_W = 300, VB_H = 560, MID = 150;
const MIN_H = 240, LABEL_MIN_H = 420, MAX_H = 560;
const MARKER_R = 13, MARKER_PX = 16, MARKER_MIN_GAP = 30;

/* ---------------------------------------------------------------- geometry (figure units, RIGHT side; L = mirror x -> 300 - x) */
const HEAD = { cx: 150, cy: 64, r: 46 };
const HAIR_OUT = 4;                                       // the cap extends 4 units outside the disc
const FRINGE = [[104, 62], [114, 46], [126, 50], [138, 42], [150, 50], [162, 42], [174, 50], [186, 46], [196, 62]];
const STRANDS = [[[150, 20], [146, 40]], [[128, 26], [130, 44]], [[172, 26], [170, 44]]];
const EAR = { cx: 196, cy: 66, rx: 9, ry: 13 };
const EYE = { cx: 167, cy: 66, r: 5 };
const NOSE = [[150, 74], [145, 84], [155, 84]];
const MOUTH = 'M 136 94 Q 150 106 164 94';
const NECK = { x: 140, y: 108, w: 20, h: 20 };
const TORSO = { x: 100, y: 126, w: 100, h: 176, rx: 22 };
// the upper arm starts 3 units lower than the design's (196,138): at 138 its cap top (123) left a neck leader at y 118
// only 1.7 px of paper above the sleeve; at 141 the sleeve seam meets the torso top (126) and the gap is 4.5 px (measured)
const ARM = { upper: { a: [196, 141], b: [232, 218], w: 30 }, fore: { a: [232, 218], b: [252, 292], w: 26 } };
const PALM = { cx: 262, cy: 318, rx: 17, ry: 19 };
const FINGERS = [{ x: 250, tip: 350 }, { x: 258, tip: 354 }, { x: 266, tip: 352 }, { x: 274, tip: 346 }];   // r 4 each, touching
const FINGER_R = 4, FINGER_BASE = 332;
const THUMB = { a: [247, 312], b: [238, 326], w: 8 };
const LEG = { thigh: { a: [173, 300], b: [176, 402], w: 40 }, shin: { a: [176, 402], b: [178, 494], w: 34 } };
const KNEE_ARC = 'M 168 406 Q 176 414 184 406';
const FOOT = { cx: 178, cy: 522, rx: 26, ry: 18 };
const TOES = [[160, 537, 7], [172, 540, 6], [183, 540, 5.5], [193, 538, 5], [202, 535, 4.5]];

const ANCHORS = {
  head: { L: { x: 122, y: 86 }, R: { x: 178, y: 86 } },
  hair: { L: { x: 130, y: 34 }, R: { x: 170, y: 34 } },
  eye: { L: { x: 133, y: 66 }, R: { x: 167, y: 66 } },
  ear: { L: { x: 100, y: 66 }, R: { x: 200, y: 66 } },
  nose: { x: 150, y: 80 },
  mouth: { x: 150, y: 98 },
  neck: { x: 150, y: 118 },
  shoulder: { L: { x: 106, y: 132 }, R: { x: 194, y: 132 } },
  arm: { L: { x: 86, y: 178 }, R: { x: 214, y: 178 } },
  elbow: { L: { x: 68, y: 218 }, R: { x: 232, y: 218 } },
  hand: { L: { x: 38, y: 318 }, R: { x: 262, y: 318 } },
  finger: { L: { x: 30, y: 346 }, R: { x: 270, y: 346 } },
  leg: { L: { x: 124, y: 452 }, R: { x: 176, y: 452 } },
  knee: { L: { x: 124, y: 404 }, R: { x: 176, y: 404 } },
  foot: { L: { x: 122, y: 520 }, R: { x: 178, y: 520 } },
  toe: { L: { x: 102, y: 537 }, R: { x: 198, y: 537 } },
};
const ANCHOR_IDS = Object.keys(ANCHORS);
const REGIONS = ['hair', 'head', 'neck', 'torso', 'arm-L', 'arm-R', 'hand-L', 'hand-R', 'leg-L', 'leg-R', 'foot-L', 'foot-R'];
const FEATURES = ['ear-L', 'ear-R', 'nose', 'mouth'];
const HIDEABLE = ['arm-L', 'arm-R', 'hand-L', 'hand-R', 'leg-L', 'leg-R', 'foot-L', 'foot-R', 'hair', 'mouth', 'nose', 'ear-L', 'ear-R'];
/** The region(s) an anchor lives in — a leader from it may cross these and no other drawn shape. */
const OWN_REGIONS = {
  head: ['head', 'hair'], hair: ['hair', 'head'], eye: ['head', 'hair'], ear: ['head', 'hair', 'ear'], nose: ['head'], mouth: ['head'],
  neck: ['neck', 'head'], shoulder: ['arm', 'torso'], arm: ['arm'], elbow: ['arm'], hand: ['hand', 'arm'], finger: ['hand'],
  leg: ['leg'], knee: ['leg'], foot: ['foot', 'leg'], toe: ['foot'],
};

/* ---------------------------------------------------------------- pure geometry helpers */
const mx = (x) => 2 * MID - x;
const mirror = (pts) => pts.map(([x, y]) => [mx(x), y]);
const fmt = (n) => (Math.round(n * 100) / 100).toString();
function polyPath(pts, close = true) {
  return pts.map(([x, y], i) => (i ? 'L' : 'M') + fmt(x) + ' ' + fmt(y)).join(' ') + (close ? ' Z' : '');
}
/** Points of a circular arc, centre c, radius r, from angle a0 to a1 (radians, screen coords), n steps. */
function arcPts(c, r, a0, a1, n = 10) {
  const out = [];
  for (let i = 0; i <= n; i++) { const t = a0 + (a1 - a0) * i / n; out.push([c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]); }
  return out;
}
/**
 * A limb silhouette over a polyline of joints with a radius per joint (a tapered
 * capsule chain): round caps at both ends, the convex side of a bend rounded, the
 * concave side a plain corner (round joins soften it). Sampled, so no arc-flag
 * arithmetic and a trivial bbox.
 */
function limbPath(joints) {
  const n = joints.length;
  const dir = [], nor = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = joints[i + 1].p[0] - joints[i].p[0], dy = joints[i + 1].p[1] - joints[i].p[1], L = Math.hypot(dx, dy);
    dir.push([dx / L, dy / L]); nor.push([-dy / L, dx / L]);
  }
  const off = (i, k, s) => [joints[i].p[0] + s * joints[i].r * nor[k][0], joints[i].p[1] + s * joints[i].r * nor[k][1]];
  const ang = (v) => Math.atan2(v[1], v[0]);
  const pts = [];
  // side +: from the start cap along +normal
  const a0 = ang(dir[0]);
  pts.push(...arcPts(joints[0].p, joints[0].r, a0 + Math.PI / 2, a0 + 3 * Math.PI / 2, 12));   // start cap (from +n over the back to -n)
  for (let i = 0; i < n - 1; i++) {
    pts.push(off(i, i, -1));
    pts.push(off(i + 1, i, -1));
    if (i < n - 2) {   // bend at joint i+1 on the - side: an arc between the two offsets (convex or concave, both sampled)
      const from = ang(nor[i]) + Math.PI, to = ang(nor[i + 1]) + Math.PI;
      let d = to - from; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
      pts.push(...arcPts(joints[i + 1].p, joints[i + 1].r, from, from + d, 6).slice(1, -1));
    }
  }
  const a1 = ang(dir[n - 2]);
  pts.push(...arcPts(joints[n - 1].p, joints[n - 1].r, a1 - Math.PI / 2, a1 + Math.PI / 2, 12));   // end cap
  for (let i = n - 2; i >= 0; i--) {
    pts.push(off(i + 1, i, 1));
    pts.push(off(i, i, 1));
    if (i > 0) {
      const from = ang(nor[i]), to = ang(nor[i - 1]);
      let d = to - from; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
      pts.push(...arcPts(joints[i].p, joints[i].r, from, from + d, 6).slice(1, -1));
    }
  }
  return pts;
}
/** The hand silhouette (right hand): the palm's upper arc + the four-finger comb, one closed outline. */
function handPath() {
  const pts = [];
  const xl = FINGERS[0].x - FINGER_R, xr = FINGERS[3].x + FINGER_R;         // 246 / 278
  const tl = Math.PI - Math.acos((PALM.cx - xl) / PALM.rx);                  // lower-left junction (y > cy)
  const tr = Math.acos((xr - PALM.cx) / PALM.rx);                            // lower-right junction
  // the upper arc from the left junction over the top to the right junction (t increasing through pi, 3pi/2)
  const t0 = tl, t1 = 2 * Math.PI - tr;
  for (let i = 0; i <= 28; i++) { const t = t0 + (t1 - t0) * i / 28; pts.push([PALM.cx + PALM.rx * Math.cos(t), PALM.cy + PALM.ry * Math.sin(t)]); }
  // the comb, right to left
  for (let k = FINGERS.length - 1; k >= 0; k--) {
    const f = FINGERS[k];
    pts.push([f.x + FINGER_R, f.tip]);
    pts.push(...arcPts([f.x, f.tip], FINGER_R, 0, Math.PI, 8).slice(1));   // right -> bottom -> left
  }
  pts.push([xl, PALM.cy + PALM.ry * Math.sin(tl)]);
  return pts;
}
function bboxOf(pts) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
function union(a, b) {
  if (!a) return b;
  const x0 = Math.min(a.x, b.x), y0 = Math.min(a.y, b.y);
  return { x: x0, y: y0, w: Math.max(a.x + a.w, b.x + b.w) - x0, h: Math.max(a.y + a.h, b.y + b.h) - y0 };
}
const circleBox = (cx, cy, r) => ({ x: cx - r, y: cy - r, w: 2 * r, h: 2 * r });
const ellipseBox = (e) => ({ x: e.cx - e.rx, y: e.cy - e.ry, w: 2 * e.rx, h: 2 * e.ry });

/* ---------------------------------------------------------------- the figure (unit geometry, built once, mirrored per side) */
function unitShapes() {
  const armR = limbPath([{ p: ARM.upper.a, r: ARM.upper.w / 2 }, { p: ARM.upper.b, r: (ARM.upper.w + ARM.fore.w) / 4 }, { p: ARM.fore.b, r: ARM.fore.w / 2 }]);
  const legR = limbPath([{ p: LEG.thigh.a, r: LEG.thigh.w / 2 }, { p: LEG.shin.b, r: LEG.shin.w / 2 }]);
  const handR = handPath();
  const thumbR = limbPath([{ p: THUMB.a, r: THUMB.w / 2 }, { p: THUMB.b, r: THUMB.w / 2 }]);
  const hairCap = (() => {
    const [lx, ly] = FRINGE[0], [rx, ry] = FRINGE[FRINGE.length - 1];
    const ext = ([x, y]) => { const dx = x - HEAD.cx, dy = y - HEAD.cy, L = Math.hypot(dx, dy); return [HEAD.cx + dx / L * (HEAD.r + HAIR_OUT), HEAD.cy + dy / L * (HEAD.r + HAIR_OUT)]; };
    const el0 = ext([lx, ly]), er0 = ext([rx, ry]);
    const a0 = Math.atan2(el0[1] - HEAD.cy, el0[0] - HEAD.cx), a1 = Math.atan2(er0[1] - HEAD.cy, er0[0] - HEAD.cx);
    // from the left extension over the TOP (angles decreasing through -pi/2) to the right extension
    const pts = [el0];
    let d = a1 - a0; while (d < 0) d += 2 * Math.PI;   // the positive sweep from the left point passes 3pi/2 = the TOP in screen coords
    pts.push(...arcPts([HEAD.cx, HEAD.cy], HEAD.r + HAIR_OUT, a0, a0 + d, 40).slice(1));
    pts.push([rx, ry]);
    for (let i = FRINGE.length - 2; i >= 0; i--) pts.push(FRINGE[i]);
    return pts;
  })();
  return { armR, armL: mirror(armR), legR, legL: mirror(legR), handR, handL: mirror(handR), thumbR, thumbL: mirror(thumbR), hairCap };
}
let _unit = null;
const unit = () => (_unit || (_unit = unitShapes()));

/* ---------------------------------------------------------------- bodyFigure */
function bodyFigure({ h = 504, fill = 'cream', hide = [], markers = [], id } = {}) {
  if (!(h >= MIN_H)) throw new Error(`body-figure: h ${h} < MIN_H ${MIN_H} (the eye disc falls under 2 px)`);
  if (h > MAX_H) throw new Error(`body-figure: h ${h} > MAX_H ${MAX_H}`);
  if (fill !== 'cream' && fill !== 'white') throw new Error(`body-figure: fill "${fill}" is not cream|white`);
  const hidden = new Set(hide);
  for (const x of hidden) if (!HIDEABLE.includes(x)) throw new Error(`body-figure: "${x}" is not hideable (${HIDEABLE.join(' ')})`);
  // the cascade: an arm goes with its hand, a leg with its foot (design: "arm-X removes upper + fore + hand")
  for (const x of [...hidden]) { const m = /^(arm|leg)-([LR])$/.exec(x); if (m) hidden.add((m[1] === 'arm' ? 'hand-' : 'foot-') + m[2]); }
  const scale = h / VB_H;
  const width = h * VB_W / VB_H;
  const FILL = fill === 'white' ? T.white : T.cream;
  const sw = (px) => fmt(px / scale);          // a stroke that renders `px` wide at this h
  const U = unit();
  const body = (d, extra) => el('path', { d, fill: FILL, stroke: T.teal, 'stroke-width': sw(S.primitive), 'stroke-linejoin': 'round', 'stroke-linecap': 'round', ...(extra || {}) });
  const detail = (d, w = S.grid) => el('path', { d, fill: 'none', stroke: T.teal, 'stroke-width': sw(w), 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  const regionBoxes = {};
  const obstacles = [];
  const parts = [];
  const group = (rid, kind, inner, box) => {
    regionBoxes[rid] = box;
    if (hidden.has(rid)) return;
    parts.push(el('g', { [kind === 'region' ? 'data-lcs-region' : 'data-lcs-feature']: rid }, inner));
  };
  const side = (s, x) => (s === 'R' ? x : mx(x));

  // neck (under the head and the torso)
  group('neck', 'region', el('rect', { x: NECK.x, y: NECK.y, width: NECK.w, height: NECK.h, fill: FILL, stroke: T.teal, 'stroke-width': sw(S.primitive), 'stroke-linejoin': 'round' }),
    { x: NECK.x, y: NECK.y, w: NECK.w, h: NECK.h });
  obstacles.push({ region: 'neck', kind: 'rect', x: NECK.x, y: NECK.y, w: NECK.w, h: NECK.h });
  // legs (thigh + shin as one tapered silhouette + the knee arc), then feet
  for (const s of ['L', 'R']) {
    const pts = s === 'R' ? U.legR : U.legL;
    const arc = s === 'R' ? KNEE_ARC : KNEE_ARC.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => `${fmt(mx(+x))} ${y}`);
    group('leg-' + s, 'region', body(polyPath(pts)) + detail(arc, 2.5), bboxOf(pts));
    obstacles.push({ region: 'leg-' + s, kind: 'capsule', a: [side(s, LEG.thigh.a[0]), LEG.thigh.a[1]], b: [side(s, LEG.thigh.b[0]), LEG.thigh.b[1]], w: LEG.thigh.w });
    obstacles.push({ region: 'leg-' + s, kind: 'capsule', a: [side(s, LEG.shin.a[0]), LEG.shin.a[1]], b: [side(s, LEG.shin.b[0]), LEG.shin.b[1]], w: LEG.shin.w });
  }
  for (const s of ['L', 'R']) {
    const cx = side(s, FOOT.cx);
    const toes = TOES.map(([x, y, r]) => el('circle', { cx: side(s, x), cy: y, r, fill: FILL, stroke: T.teal, 'stroke-width': sw(S.primitive) }));
    const inner = el('ellipse', { cx, cy: FOOT.cy, rx: FOOT.rx, ry: FOOT.ry, fill: FILL, stroke: T.teal, 'stroke-width': sw(S.primitive) }) + toes.join('');
    let box = ellipseBox({ cx, cy: FOOT.cy, rx: FOOT.rx, ry: FOOT.ry });
    for (const [x, y, r] of TOES) box = union(box, circleBox(side(s, x), y, r));
    group('foot-' + s, 'region', inner, box);
    obstacles.push({ region: 'foot-' + s, kind: 'ellipse', cx, cy: FOOT.cy, rx: FOOT.rx, ry: FOOT.ry + 4 });
  }
  // torso
  group('torso', 'region', el('rect', { x: TORSO.x, y: TORSO.y, width: TORSO.w, height: TORSO.h, rx: TORSO.rx, ry: TORSO.rx, fill: FILL, stroke: T.teal, 'stroke-width': sw(S.primitive) }),
    { x: TORSO.x, y: TORSO.y, w: TORSO.w, h: TORSO.h });
  obstacles.push({ region: 'torso', kind: 'rect', x: TORSO.x, y: TORSO.y, w: TORSO.w, h: TORSO.h });
  // arms, then hands (thumb under the palm, one comb silhouette, three 1.5 px seams)
  for (const s of ['L', 'R']) {
    const pts = s === 'R' ? U.armR : U.armL;
    group('arm-' + s, 'region', body(polyPath(pts)), bboxOf(pts));
    obstacles.push({ region: 'arm-' + s, kind: 'capsule', a: [side(s, ARM.upper.a[0]), ARM.upper.a[1]], b: [side(s, ARM.upper.b[0]), ARM.upper.b[1]], w: ARM.upper.w });
    obstacles.push({ region: 'arm-' + s, kind: 'capsule', a: [side(s, ARM.fore.a[0]), ARM.fore.a[1]], b: [side(s, ARM.fore.b[0]), ARM.fore.b[1]], w: ARM.fore.w });
  }
  for (const s of ['L', 'R']) {
    const hand = s === 'R' ? U.handR : U.handL, thumb = s === 'R' ? U.thumbR : U.thumbL;
    const seams = [];
    for (let k = 0; k < FINGERS.length - 1; k++) {
      const x = side(s, FINGERS[k].x + FINGER_R), yb = Math.min(FINGERS[k].tip, FINGERS[k + 1].tip);
      seams.push(detail(`M ${fmt(x)} ${FINGER_BASE} L ${fmt(x)} ${fmt(yb)}`));
    }
    group('hand-' + s, 'region', body(polyPath(thumb)) + body(polyPath(hand)) + seams.join(''), union(bboxOf(hand), bboxOf(thumb)));
    obstacles.push({ region: 'hand-' + s, kind: 'ellipse', cx: side(s, PALM.cx), cy: PALM.cy, rx: PALM.rx + 4, ry: PALM.ry });
    obstacles.push({ region: 'hand-' + s, kind: 'rect', x: Math.min(side(s, FINGERS[0].x - FINGER_R), side(s, FINGERS[3].x + FINGER_R)), y: FINGER_BASE, w: FINGERS[3].x + FINGER_R - (FINGERS[0].x - FINGER_R), h: Math.max(...FINGERS.map((f) => f.tip)) + FINGER_R - FINGER_BASE });
  }
  // head disc + eyes
  {
    const eyes = ['L', 'R'].map((s) => el('circle', { cx: side(s, EYE.cx), cy: EYE.cy, r: EYE.r, fill: T.teal, 'data-lcs-eye': s }));
    group('head', 'region', el('circle', { cx: HEAD.cx, cy: HEAD.cy, r: HEAD.r, fill: FILL, stroke: T.teal, 'stroke-width': sw(S.primitive) }) + eyes.join(''), circleBox(HEAD.cx, HEAD.cy, HEAD.r));
    obstacles.push({ region: 'head', kind: 'circle', cx: HEAD.cx, cy: HEAD.cy, r: HEAD.r });
  }
  // hair cap + three strands
  group('hair', 'region', body(polyPath(U.hairCap)) + STRANDS.map(([a, b]) => detail(`M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`)).join(''),
    (() => { const b = bboxOf(U.hairCap); return { x: b.x, y: b.y, w: b.w, h: Math.max(...FRINGE.map((p) => p[1])) - b.y }; })());
  obstacles.push({ region: 'hair', kind: 'circle', cx: HEAD.cx, cy: HEAD.cy, r: HEAD.r + HAIR_OUT });
  // ears (a D outside the disc + a 1.5 inner arc), nose, mouth
  for (const s of ['L', 'R']) {
    const cx = side(s, EAR.cx), sweep = s === 'R' ? 1 : 0;
    const d = `M ${cx} ${EAR.cy - EAR.ry} A ${EAR.rx} ${EAR.ry} 0 0 ${sweep} ${cx} ${EAR.cy + EAR.ry} Z`;
    const inner = `M ${cx} ${EAR.cy - 8} A 5 8 0 0 ${sweep} ${cx} ${EAR.cy + 8}`;
    group('ear-' + s, 'feature', body(d) + detail(inner), { x: s === 'R' ? cx : cx - EAR.rx, y: EAR.cy - EAR.ry, w: EAR.rx, h: 2 * EAR.ry });
    obstacles.push({ region: 'ear-' + s, kind: 'circle', cx: side(s, EAR.cx + EAR.rx / 2), cy: EAR.cy, r: EAR.ry });
  }
  group('nose', 'feature', detail(polyPath(NOSE, false), S.primitive), bboxOf(NOSE));
  group('mouth', 'feature', detail(MOUTH, S.primitive), { x: 136, y: 94, w: 28, h: 6 });
  // markers (coral disc + white numeral) — the only numerals a figure ever prints
  const markerPts = [];
  for (const m of markers) {
    const a = anchorUnit(m.id, m.side);
    const r = MARKER_R / scale;
    markerPts.push({ id: m.id, x: a.x, y: a.y });
    parts.push(el('g', { 'data-lcs-marker': m.id, 'data-lcs-n': m.n, 'data-lcs-side': m.side || '' },
      el('circle', { cx: a.x, cy: a.y, r: fmt(r), fill: T.coral }) +
      el('text', { x: a.x, y: a.y, 'font-family': F.display, 'font-size': fmt(MARKER_PX / scale), 'font-weight': 700, fill: T.white, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, esc(String(m.n)))));
  }
  for (let i = 0; i < markerPts.length; i++) for (let j = i + 1; j < markerPts.length; j++) {
    const d = Math.hypot(markerPts[i].x - markerPts[j].x, markerPts[i].y - markerPts[j].y) * scale;
    if (d < MARKER_MIN_GAP) throw new Error(`body-figure: markers ${markerPts[i].id} and ${markerPts[j].id} are ${d.toFixed(1)} px apart (< ${MARKER_MIN_GAP})`);
  }

  const px = (v) => v * scale;
  const anchors = {};
  for (const id of ANCHOR_IDS) {
    const a = ANCHORS[id];
    anchors[id] = a.L ? { L: { x: px(a.L.x), y: px(a.L.y) }, R: { x: px(a.R.x), y: px(a.R.y) } } : { x: px(a.x), y: px(a.y) };
  }
  // `min` = the narrowest drawn dimension a crayon meets in the region (a limb's width, not its bbox)
  const NARROW = { arm: ARM.fore.w, hand: 2 * PALM.rx, leg: LEG.shin.w, foot: 2 * FOOT.ry, head: 2 * HEAD.r, neck: NECK.w, torso: TORSO.w };
  const regions = REGIONS.map((rid) => {
    const b = regionBoxes[rid];
    const narrow = NARROW[rid.replace(/-[LR]$/, '')];
    return { id: rid, hidden: hidden.has(rid), bbox: { x: px(b.x), y: px(b.y), w: px(b.w), h: px(b.h) }, bboxMin: px(Math.min(b.w, b.h)), min: px(narrow != null ? narrow : Math.min(b.w, b.h)) };
  });
  const obs = obstacles.map((o) => {
    if (o.kind === 'circle') return { region: o.region, kind: 'circle', cx: px(o.cx), cy: px(o.cy), r: px(o.r) };
    if (o.kind === 'ellipse') return { region: o.region, kind: 'ellipse', cx: px(o.cx), cy: px(o.cy), rx: px(o.rx), ry: px(o.ry) };
    if (o.kind === 'rect') return { region: o.region, kind: 'rect', x: px(o.x), y: px(o.y), w: px(o.w), h: px(o.h) };
    return { region: o.region, kind: 'capsule', a: [px(o.a[0]), px(o.a[1])], b: [px(o.b[0]), px(o.b[1])], w: px(o.w) };
  });
  const svg = svgRoot({ width: fmt(width), height: h, viewBox: `0 0 ${VB_W} ${VB_H}`, label: '' }, parts.join(''), {
    'data-lcs-body': '', 'data-lcs-body-h': h, 'data-lcs-body-fill': fill, 'data-lcs-scale': fmt(scale),
    ...(hidden.size ? { 'data-lcs-hidden': [...hidden].join(' ') } : {}),
    ...(id ? { id } : {}),
    style: 'display:block',
  });
  return { svg, width, height: h, scale, anchors, regions, obstacles: obs };
}

/** An anchor in figure units for (id, side) — side-free ids ignore the side; a bilateral id without a side throws. */
function anchorUnit(id, side) {
  const a = ANCHORS[id];
  if (!a) throw new Error(`body-figure: unknown anchor id "${id}"`);
  if (a.L) { if (side !== 'L' && side !== 'R') throw new Error(`body-figure: anchor ${id} needs a side L|R`); return a[side]; }
  return a;
}

module.exports = { bodyFigure, ANCHORS, ANCHOR_IDS, REGIONS, FEATURES, HIDEABLE, OWN_REGIONS, MIN_H, LABEL_MIN_H, MAX_H, MARKER_R, MARKER_MIN_GAP, VB_W, VB_H, MID, anchorUnit,
  _geometry: { HEAD, HAIR_OUT, FRINGE, EAR, EYE, NOSE, NECK, TORSO, ARM, PALM, FINGERS, FINGER_R, FINGER_BASE, THUMB, LEG, FOOT, TOES, unit } };
