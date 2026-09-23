/**
 * habit-pictogram.js — the K-380 `healthy-habits` drawings (nt5-F), pure SVG on
 * primitives/_tokens.js. Design: docs/worksheet-gen/b6-designs/
 * K-380-healthy-habits.md §2 "NEW primitives/habit-pictogram.js" (A's profile
 * language, B's print rules). ONE art source for every face of the family: no
 * library picture ever shares a page with these.
 *
 *   habitFigure({ pose, px = 104, data = {} })   -> { svg, w, h, meta:{pose, parts[]} }
 *   twoFigures({ pose, px = 124, data = {} })    -> F3 own-cup / shared-cup
 *   habitTool({ kind, px = 104, data = {} })     -> { svg, w, h, meta:{kind} }
 *   handsView({ state, px = 176, data = {} })    -> F1 sink-band close-up
 *   brushCard({ kind, px = 104, data = {} })     -> F2 close-up
 *   POSES, POSE_PARTS, TOOLS, HAND_STATES, BRUSH_KINDS, ANCHORS
 *
 * FIGURE GRAMMAR (100 x 100 unit box, scaled to px). Every figure faces RIGHT in
 * profile. Head circle (52,15) r 10 solid ink, NO face, NO hair cap. Anchors
 * MOUTH (61,19), NOSE (62,14), CROWN (52,5). Torso M45,27 H58 Q61,27 61,31 V60
 * H45 Z. Legs round-capped lines stroke 8, feet rect 10 x 4 r 2 pointing right.
 * Arms round-capped polylines stroke 7, shoulder (53,31) -> elbow -> hand, hand
 * circle r 4.5. The NEAR arm always carries a white halo (a stroke-11 white
 * underlay and a white stroke-2 ring on the hand, paint-order stroke) so a hand
 * over the head or body separates in 1-bit print (B's print rule); the FAR arm
 * (both-hands poses) is drawn FIRST in inkSoft. Cue marks: ink stroke 2.5,
 * round caps, fill none. Palette: ink inkSoft teal tealSoft white cream
 * creamDeep coralSoft only — never `coral` (the pencil colour of dots and
 * boxes), never a codeColors hex, never <text>.
 *
 * STAMPS (the gates parse geometry; the stamps only NAME groups):
 *   root <g data-lcs-pictogram="habit" data-lcs-pose="<pose>">
 *   every part <g data-lcs-part="<id>">, the near hand <circle data-lcs-hand="near">
 *   tool root <g data-lcs-glyph="<kind>">, hands close-up <g data-lcs-hands="<state>">,
 *   brush card <g data-lcs-brush="<kind>">.
 *
 * Gate: qa/verify-b6-habit-pictogram.js (render-measuring, 1-bit Jaccard at
 * 60 px, minimal pairs, anchors, part floors, palette). Every drawing here was
 * read by eye at its smallest and largest size in colour and greyscale; the
 * deviations from the design's numbers are listed inline, each with why.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');

const T = tokens.color;
const fmt = (n) => (Math.round(n * 100) / 100).toString();
const ANCHORS = { MOUTH: [61, 19], NOSE: [62, 14], CROWN: [52, 5], SHOULDER: [53, 31] };

/* ============================================================== shared figure pieces */
const TORSO = 'M45,27 H58 Q61,27 61,31 V60 H45 Z';
const part = (id, inner, extra = {}) => el('g', { 'data-lcs-part': id, ...extra }, inner);
const ln = (x1, y1, x2, y2, w, c, extra = {}) => el('line', { x1: fmt(x1), y1: fmt(y1), x2: fmt(x2), y2: fmt(y2), stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', ...extra });
const poly = (pts, w, c) => el('polyline', { points: pts.map((p) => `${fmt(p[0])},${fmt(p[1])}`).join(' '), fill: 'none', stroke: c, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
const mark = (d) => el('path', { d, fill: 'none', stroke: T.ink, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });

function legs(kind) {
  if (kind === 'run') {
    // A's run: the legs spread in a stride, feet flat on the toes line
    return part('legs', ln(49, 58, 38, 90, 8, T.ink) + ln(55, 58, 70, 86, 8, T.ink) +
      el('rect', { x: 32, y: 88, width: 10, height: 4, rx: 2, ry: 2, fill: T.ink }) +
      el('rect', { x: 67, y: 84, width: 10, height: 4, rx: 2, ry: 2, fill: T.ink }));
  }
  return part('legs', ln(49, 58, 48, 91, 8, T.ink) + ln(55, 58, 57, 91, 8, T.ink) +
    el('rect', { x: 45, y: 91, width: 10, height: 4, rx: 2, ry: 2, fill: T.ink }) +
    el('rect', { x: 54, y: 91, width: 10, height: 4, rx: 2, ry: 2, fill: T.ink }));
}
function farArm(E, H) {
  return part('arm-far', poly([ANCHORS.SHOULDER, E, H], 7, T.inkSoft) + el('circle', { cx: H[0], cy: H[1], r: 4.5, fill: T.inkSoft }));
}
function nearArm(E, H) {
  const pts = [ANCHORS.SHOULDER, E, H];
  return part('arm-near', poly(pts, 11, T.white) + poly(pts, 7, T.ink) +
    el('circle', { cx: H[0], cy: H[1], r: 4.5, fill: T.ink, stroke: T.white, 'stroke-width': 2, 'paint-order': 'stroke', 'data-lcs-hand': 'near' }));
}
function body({ near, far, legKind = 'stand' }) {
  return (far ? farArm(far[0], far[1]) : '') +
    legs(legKind) +
    part('torso', el('path', { d: TORSO, fill: T.ink })) +
    part('head', el('circle', { cx: 52, cy: 15, r: 10, fill: T.ink })) +
    nearArm(near[0], near[1]);
}

/* ============================================================== cue / context parts */
function tapParts() {
  // DEVIATION (render read 2026-09-23): the design's floating T-bar tap over a flat 30 x 6 rect read as
  // "a shelf and a hook" at 104 px. The spout keeps the design's shape; a riser joins it to the back of a
  // bowl-shaped basin on a pedestal, so the whole reads as the washbasin every K child uses. The water is
  // drawn OVER the hands (returned separately) so the running stream is never hidden by the arm.
  const tap = part('tap', el('rect', { x: 84, y: 26, width: 5, height: 30, fill: T.teal }) +
    el('path', { d: 'M70,26 H89 V32 H80 V38 H74 V32 H70 Z', fill: T.teal }));
  const basin = part('basin', el('path', { d: 'M60,55 H93 Q93,65 83,67 H71 Q60,65 60,55 Z', fill: T.teal }) +
    el('rect', { x: 73, y: 66, width: 7, height: 29, fill: T.teal }));
  return tap + basin;
}
function waterPart() {
  return part('water', [[73, 71.5], [77, 77], [81, 82.5]].map(([x0, x1]) => ln(x0, 41, x1, 50, 2.5, T.teal)).join(''));
}
function scrubParts() {
  // DEVIATION (render read 2026-09-23): the design's two ")" arcs right of the MOUTH read as SOUND WAVES (a
  // child shouting). The scrub is the comic JIGGLE round the FIST: short arcs on each side of the hand (the left
  // pair white where it crosses the dark head).
  const [hx, hy] = [62, 21];
  const arcR = (dx, c) => mark(`M${hx + dx},${hy - 6} q${dx > 0 ? 3 : -3},6 0,12`).replace(`stroke="${T.ink}"`, `stroke="${c}"`);
  return part('scrub', arcR(15, T.ink) + arcR(19, T.ink) + arcR(-8, T.white) + arcR(-12, T.white));
}
function foamParts() {
  // LEAD RULING (review of the d2 render, 2026-09-23; overrides the design's "scrub arcs, NOT foam"): a fist
  // alone did not read as brushing. A small cluster of toothpaste foam spills from the mouth under the fist.
  // The shared-mark rule still holds on the SHELF: the soap is a bare bar (TOOL_FORBIDDEN soap: foam / bubbles).
  return part('foam', [[69.5, 19.5, 3.4], [73, 24, 2.8], [68, 26, 2.6], [73.5, 15.5, 2.2]].map(([x, y, r]) => bubble(x, y, r)).join(''));
}
function tuftParts() {
  // DEVIATION (render reads 2026-09-23; lead review): triangles read as a CROWN, thick curls as CLAWS / fingers,
  // and a hand at the front of the crown as a SALUTE. Now: a jagged BED-HEAD crest on the back of the head, the
  // hand resting ON TOP of the hair, and three strands lifted up from under the hand, curling back (a combed-up quiff;
  // detached wavy strands read as STEAM).
  const pts = [];
  const A = [-190, -168, -146, -124, -104];
  for (let k = 0; k < A.length; k++) {
    const a = A[k] * Math.PI / 180;
    pts.push([52 + 9.5 * Math.cos(a), 15 + 9.5 * Math.sin(a)]);
    if (k < A.length - 1) {
      const m = (A[k] + A[k + 1]) / 2 * Math.PI / 180;
      pts.push([52 + 15 * Math.cos(m), 15 + 15 * Math.sin(m)]);
    }
  }
  const crest = el('path', { d: 'M' + pts.map((q) => fmt(q[0]) + ',' + fmt(q[1])).join(' L') + ' Z', fill: T.ink, stroke: T.ink, 'stroke-width': 1.5, 'stroke-linejoin': 'round' });
  const strands = el('path', { d: 'M49,7 Q45,-2 38,-5 M53,6 Q51,-5 44,-10 M57,7 Q57,-5 51,-11', fill: 'none', stroke: T.ink, 'stroke-width': 2.6, 'stroke-linecap': 'round' });
  return part('tufts', crest + strands);
}
function burstParts() {
  // a small sneeze burst just in front of the NOSE, ABOVE the mouth line (brush-teeth's arcs sit beside the mouth)
  return part('burst', el('path', { d: 'M69,12 q2,-3 5,-1 q3,-2 5,1 q2,3 -1,4 q0,3 -4,2 q-3,1 -4,-2 q-2,-1 -1,-4 Z', fill: T.white, stroke: T.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round' }));
}
const star4 = (cx, cy, r) => el('path', { d: `M${cx},${cy - r} L${cx + r * 0.3},${cy - r * 0.3} L${cx + r},${cy} L${cx + r * 0.3},${cy + r * 0.3} L${cx},${cy + r} L${cx - r * 0.3},${cy + r * 0.3} L${cx - r},${cy} L${cx - r * 0.3},${cy - r * 0.3} Z`, fill: T.ink });
function sleepContext() {
  // lead review 2026-09-23 (the plaque is PORTRAIT): the night sky is drawn tall above the lying child — a big
  // moon and three stars — so the scene fills a portrait plaque instead of a thin strip at its foot
  const moon = part('moon', el('path', { d: 'M24,-40 A19,19 0 1 0 42,-8 A15,15 0 1 1 24,-40 Z', fill: T.ink }));
  const star = (cx, cy, r) => el('path', { d: `M${cx},${cy - r} L${cx + r * 0.3},${cy - r * 0.3} L${cx + r},${cy} L${cx + r * 0.3},${cy + r * 0.3} L${cx},${cy + r} L${cx - r * 0.3},${cy + r * 0.3} L${cx - r},${cy} L${cx - r * 0.3},${cy - r * 0.3} Z`, fill: T.ink });
  const stars = part('stars', star(64, -30, 8) + star(82, -2, 6) + star(52, 16, 5));
  return moon + stars;
}
function sunPart(cx = 84, cy = 14) {
  const rays = [];
  for (let k = 0; k < 8; k++) {
    const a = k * Math.PI / 4;
    rays.push(ln(cx + 11 * Math.cos(a), cy + 11 * Math.sin(a), cx + 15 * Math.cos(a), cy + 15 * Math.sin(a), 2.5, T.teal));
  }
  return part('sun', el('circle', { cx, cy, r: 8, fill: T.white, stroke: T.ink, 'stroke-width': 2 }) + rays.join(''));
}
function glassPart(x, y, s = 1) {
  // a plain tumbler of water (never a hot drink): white glass, ink 2 outline, tealSoft water
  const w = 12 * s, h = 16 * s;
  return part('glass', el('path', { d: `M${fmt(x)},${fmt(y)} H${fmt(x + w)} L${fmt(x + w - 1.5 * s)},${fmt(y + h)} H${fmt(x + 1.5 * s)} Z`, fill: T.white, stroke: T.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
    el('path', { d: `M${fmt(x + 0.8 * s)},${fmt(y + 5 * s)} H${fmt(x + w - 0.8 * s)} L${fmt(x + w - 1.6 * s)},${fmt(y + h - 1 * s)} H${fmt(x + 1.6 * s)} Z`, fill: T.tealSoft }));
}
function bubble(cx, cy, r) { return el('circle', { cx: fmt(cx), cy: fmt(cy), r, fill: T.white, stroke: T.ink, 'stroke-width': 1.8 }); }

/* ============================================================== poses */
const POSE_DEF = {
  'wash-hands': () => tapParts() + body({ near: [[60, 44], [74, 50]], far: [[57, 45], [70, 52]] }) + waterPart(),
  'brush-teeth': () => body({ near: [[70, 37], [62, 21]] }) + scrubParts() + foamParts(),
  // FIX ROUND 1 (three native panels, 2026-09-23): the lying child under a duvet with a turned-down band read as a
  // child IN BED — the very tool the child must find on the shelf. The habit is now drawn WITHOUT any bed: a child
  // in striped PAJAMAS, both arms up in a big bedtime stretch, under a big moon and three stars. The bed is inferred,
  // never copied (gate: no plaque part is any shelf tool's part; poison: the bed put back in the plaque).
  sleep: () => {
    // lead review (fix round 1b): the sky sits in the two top CORNERS above the head, so the plaque's box is as
    // narrow as a standing child's and this child is drawn as tall as the others (verify: standing heights +-10 %)
    const sky = part('moon', el('path', { d: 'M49,-15 A9.5,9.5 0 1 0 57,0 A8,8 0 1 1 49,-15 Z', fill: T.ink })) +
      part('stars', star4(34, -9, 4.5) + star4(76, -9, 5) + star4(79, 12, 3.8));
    const fig = farArm([44, 20], [38, 5]) + legs('stand') + part('torso', el('path', { d: TORSO, fill: T.ink })) +
      part('pajamas', [34, 40, 46, 52, 57].map((y) => ln(45.5, y, 60.5, y, 1.8, T.white)).join('') +
        [70, 78, 86].map((y) => ln(45.5, y, 51.5, y, 1.6, T.white) + ln(53, y, 59.5, y, 1.6, T.white)).join('')) +
      part('head', el('circle', { cx: 52, cy: 15, r: 10, fill: T.ink })) + nearArm([63, 20], [67, 5]);
    return sky + fig;
  },
  'comb-hair': () => tuftParts() + body({ near: [[72, 12], [53, 3]] }),
  // DEVIATION (gate rule 1, 2026-09-23): standing upright, blow-nose measured 0.77 / 0.73 1-bit Jaccard against
  // brush-teeth / comb-hair at 60 px (the shared body dominates). A sneeze is drawn the way children draw it:
  // the upper body bends FORWARD 16 deg over the hips (legs stay), both hands at the nose, the burst in front.
  // FIX ROUND 1 (fi + de panels, 2026-09-23): the forward-bent child with one hand up read as SNEEZING into the
  // hand — the opposite of the family's own F3 rule. Nose-blowing is now: the child stands, BOTH hands meet at the
  // NOSE (the near hand pinches it: a finger closes on the nose tip), and one small puff blows out of the nose
  // between the fingers. No spray, no open hand, no lean, no tissue (the tissue is the tool on the shelf).
  // (the head bows 10 deg over the hands, as a child does into a handkerchief; measured 0.79 1-bit Jaccard against
  // brush-teeth upright)
  'blow-nose': () => legs('stand') + el('g', { transform: 'rotate(10 52 58)' },
    farArm([58, 38], [61, 20]) + part('torso', el('path', { d: TORSO, fill: T.ink })) +
    part('head', el('circle', { cx: 52, cy: 15, r: 10, fill: T.ink })) + nearArm([64, 34], [65, 17]) +
    part('pinch', poly([[65, 17], [64, 12]], 7, T.white) + poly([[65, 17], [64, 12]], 3.6, T.ink)) +
    burstParts()),
  'sun-protect': () => sunPart(76, 0) + body({ near: [[56, 45], [58, 58]] }),
  // drinking tips the head and chest BACK (the glass up at the mouth): a silhouette apart from brushing, whose
  // elbow sticks out forward (measured 0.79 1-bit Jaccard upright, 2026-09-23 F5)
  'drink-water': () => legs('stand') + el('g', { transform: 'rotate(-12 52 58)' },
    part('torso', el('path', { d: TORSO, fill: T.ink })) + part('head', el('circle', { cx: 52, cy: 15, r: 10, fill: T.ink })) +
    nearArm([63, 38], [62, 23]) + glassPart(60, 6, 1.05)),
  'move-body': () => body({ near: [[62, 42], [70, 32]], far: [[46, 42], [38, 50]], legKind: 'run' }) +
    part('motion', mark('M22,40 H32') + mark('M18,50 H30') + mark('M22,60 H32')),
  'cough-elbow': () => body({ near: [[64, 20], [52, 9]] }) +
    part('cough-puff', mark('M63,24 l3,1.5') + mark('M62,27 l3,2.5')),
  'cough-open': () => body({ near: [[53, 46], [56, 60]] }) +
    part('spray', [[67, 17], [72, 14], [72, 21], [77, 12], [78, 18], [83, 15], [84, 22]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 2.2, fill: T.ink })).join('')),
  'tissue-in-bin': () => binPart() + body({ near: [[62, 40], [74, 46]] }) +
    part('tissue', el('rect', { x: 78, y: 58, width: 10, height: 10, rx: 3, ry: 3, fill: T.white, stroke: T.ink, 'stroke-width': 1.5 })) +
    part('fall', mark('M80,51 v4') + mark('M86,51 v4')),
  'tissue-on-floor': () => binPart() + body({ near: [[53, 46], [56, 60]] }) +
    part('tissue', el('rect', { x: 64, y: 87, width: 10, height: 8, rx: 3, ry: 3, fill: T.white, stroke: T.ink, 'stroke-width': 1.5 })),
  // ---- F4 / F5 (design §2 table: "tools SHOWN on F4 / F5" — the answer there is the reason or the day, not the tool)
  'wash-hands-soap': () => tapParts() + body({ near: [[60, 44], [74, 50]], far: [[57, 45], [70, 52]] }) + waterPart() +
    part('bubbles', [[66, 42, 3], [84, 45, 2.8], [80, 38, 2.4], [68, 51, 2.4]].map(([x, y, r]) => bubble(x, y, r)).join('')),
  'brush-teeth-brush': () => body({ near: [[72, 36], [72, 21]] }) +
    part('toothbrush-held', el('rect', { x: 62, y: 18.5, width: 26, height: 5, rx: 2.5, ry: 2.5, fill: T.teal, stroke: T.white, 'stroke-width': 1.2, 'paint-order': 'stroke' }) +
      el('rect', { x: 57, y: 17.5, width: 8, height: 7, rx: 2, ry: 2, fill: T.white, stroke: T.ink, 'stroke-width': 1.6 })) + foamParts(),
  'sleep-bed': () => {
    const fig = body({ near: [[55, 44], [57, 57]] });
    const lying = el('g', { transform: 'translate(0 16) rotate(-90 50 50)' }, fig);
    const bed = part('bed', el('rect', { x: 3, y: 50, width: 6, height: 38, rx: 2, ry: 2, fill: T.teal }) + el('rect', { x: 93, y: 62, width: 5, height: 26, rx: 2, ry: 2, fill: T.teal }) +
      el('rect', { x: 6, y: 76, width: 90, height: 7, fill: T.teal }) + el('rect', { x: 10, y: 60, width: 18, height: 9, rx: 4, ry: 4, fill: T.white, stroke: T.ink, 'stroke-width': 1.6 }));
    const blanket = part('blanket', el('path', { d: 'M28,77 V56 Q28,52 33,52 H70 Q76,52 80,48 Q86,43 91,48 Q95,52 95,60 V77 Z', fill: T.coralSoft, stroke: T.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round' }) +
      el('path', { d: 'M28,77 V56 Q28,52 33,52 H40 V77 Z', fill: T.white, stroke: T.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round' }));
    return sleepContext() + bed + lying + blanket;
  },
  'sun-hat': () => sunPart(81, 17) + body({ near: [[56, 45], [58, 58]] }) +
    part('hat-on', el('ellipse', { cx: 52, cy: 8, rx: 15, ry: 3.2, fill: T.teal, stroke: T.white, 'stroke-width': 1.2, 'paint-order': 'stroke' }) +
      el('path', { d: 'M43,8 Q43,-3 52,-3 Q61,-3 61,8 Z', fill: T.teal, stroke: T.white, 'stroke-width': 1.2, 'paint-order': 'stroke' })),
};
/** A small open, colourless bin (bin.js fill:'none' look, no lid: the tissue must be SEEN going in). */
function binPart() {
  return part('bin', el('path', { d: 'M72,62 H94 L92,95 H74 Z', fill: T.white, stroke: T.teal, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }) +
    ln(78, 68, 79, 90, 1.5, T.teal) + ln(83, 68, 83, 90, 1.5, T.teal) + ln(88, 68, 87, 90, 1.5, T.teal));
}
const POSES = Object.keys(POSE_DEF);
const CUE = {
  'wash-hands': ['tap', 'water', 'basin'], 'brush-teeth': ['foam', 'scrub'], sleep: ['moon', 'stars', 'pajamas'],
  'comb-hair': ['tufts'], 'blow-nose': ['burst', 'pinch'], 'sun-protect': ['sun'], 'drink-water': ['glass'], 'move-body': ['motion'],
  'cough-elbow': ['cough-puff'], 'cough-open': ['spray'], 'tissue-in-bin': ['bin', 'tissue', 'fall'], 'tissue-on-floor': ['bin', 'tissue'],
  'wash-hands-soap': ['tap', 'water', 'basin', 'bubbles'], 'brush-teeth-brush': ['toothbrush-held', 'foam'], 'sleep-bed': ['moon', 'stars', 'bed', 'blanket'], 'sun-hat': ['sun', 'hat-on'],
};
const TWO_ARM = new Set(['wash-hands', 'move-body', 'wash-hands-soap', 'sleep', 'blow-nose']);
const POSE_PARTS = Object.fromEntries(POSES.map((p) => [p, [...(TWO_ARM.has(p) ? ['arm-far'] : []), 'legs', 'torso', 'head', 'arm-near', ...CUE[p]]]));
/** the anchor the near hand must sit on (gate rule 5); null = no hand anchor for that pose */
const HAND_ANCHOR = { 'brush-teeth': ANCHORS.MOUTH, 'blow-nose': ANCHORS.NOSE, 'comb-hair': ANCHORS.CROWN, 'wash-hands': [77, 46], 'drink-water': ANCHORS.MOUTH };

function dataAttrs(data) { const a = {}; for (const [k, v] of Object.entries(data || {})) a['data-lcs-' + k] = v; return a; }

/** the MOTION marks (ink strokes that show movement); `marks:false` (base d3) drops them: pose + context only */
const MARK_PARTS = ['scrub', 'burst', 'cough-puff', 'motion'];
/**
 * The drawn extent of every pose in unit space (measured getBoundingClientRect at 100 px + 3 units of margin,
 * 2026-09-23). fit:true (the base plaques) uses it as the viewBox and fills its box (100 % x 100 %, meet), so a
 * tall standing child fills a portrait plaque; the default viewBox is the union with the 100 x 100 unit box.
 */
const POSE_BOX = {
  // fix round 1b: the six BASE standing poses share ONE box size (55 x 113, y -16 .. 97) centred on each drawing, so
  // every plaque scales every child to the same height at every level (verify: +-10 %; the sun moved to the top corner)
  'wash-hands': [40, -16, 55, 113], 'brush-teeth': [36, -16, 55, 113], sleep: [29, -16, 55, 113], 'comb-hair': [27, -16, 55, 113],
  'blow-nose': [37, -16, 55, 113], 'sun-protect': [38, -16, 55, 113], 'drink-water': [30, -2, 46, 99], 'move-body': [15, 2, 65, 93],
  'cough-elbow': [39, 1, 30, 97], 'cough-open': [39, 2, 50, 96], 'tissue-in-bin': [39, 2, 58, 96], 'tissue-on-floor': [39, 2, 58, 96],
  'wash-hands-soap': [40, 3, 55, 94], 'brush-teeth-brush': [40, 3, 50, 94], 'sleep-bed': [1, -44, 99, 130], 'sun-hat': [36, -6, 62, 103],
};
function unionBox(b) {
  const x0 = Math.min(0, b[0]), y0 = Math.min(0, b[1]), x1 = Math.max(100, b[0] + b[2]), y1 = Math.max(100, b[1] + b[3]);
  const w = x1 - x0, h = y1 - y0, m = Math.max(w, h);
  return [x0 - (m - w) / 2, y0 - (m - h) / 2, m, m];
}
function habitFigure({ pose, px = 104, marks = true, fit = false, box = null, data = {} } = {}) {
  if (!POSE_DEF[pose]) throw new Error(`habit-pictogram: pose "${pose}" is not one of ${POSES.join(' | ')}`);
  if (!(px > 0)) throw new Error(`habit-pictogram: px ${px}`);
  let inner = POSE_DEF[pose]();
  if (!marks) inner = inner.replace(new RegExp('<g data-lcs-part="(?:' + MARK_PARTS.join('|') + ')">[\\s\\S]*?</g>', 'g'), '');
  const g = el('g', { 'data-lcs-pictogram': 'habit', 'data-lcs-pose': pose, 'data-lcs-marks': marks ? '1' : '0', ...dataAttrs(data) }, inner);
  const vb = box || (fit ? POSE_BOX[pose] : unionBox(POSE_BOX[pose]));
  const svg = fit
    ? svgRoot({ width: '100%', height: '100%', viewBox: vb.map(fmt).join(' '), label: 'child' }, g, { style: 'display:block', preserveAspectRatio: 'xMidYMid meet' })
    : svgRoot({ width: fmt(px), height: fmt(px), viewBox: vb.map(fmt).join(' '), label: 'child' }, g, { style: 'display:block' });
  return { svg, w: px, h: px, meta: { pose, box: vb, parts: POSE_PARTS[pose].filter((x) => marks || !MARK_PARTS.includes(x)) } };
}

/* ============================================================== two figures (F3 own-cup / shared-cup) */
const TWO_POSES = ['own-cup', 'shared-cup'];
function twoFigures({ pose, px = 124, data = {} } = {}) {
  if (!TWO_POSES.includes(pose)) throw new Error(`habit-pictogram: twoFigures pose "${pose}"`);
  const s = 0.72;
  const own = pose === 'own-cup';
  // left figure faces right; the right one is the same figure mirrored. own-cup: each drinks from ITS cup at its
  // mouth; shared-cup: both reach ONE cup held between them (so "the busier tile" is no tell: two figures in each)
  const near = own ? [[63, 36], [62, 23]] : [[64, 38], [76, 36]];
  const fig = body({ near });
  const cupL = own ? glassPart(60, 11, 0.8) : '';
  const left = el('g', { transform: `translate(-6 ${fmt(100 - 100 * s - 4)}) scale(${s})` }, fig + cupL);
  const right = el('g', { transform: `translate(106 ${fmt(100 - 100 * s - 4)}) scale(-${s} ${s})` }, fig + cupL);
  const shared = own ? '' : el('g', { transform: `translate(0 ${fmt(100 - 100 * s - 4)}) scale(${s})` }, glassPart(63.5, 35, 1));
  const cups = own ? 2 : 1;
  const inner = left + right + (shared ? el('g', { 'data-lcs-part': 'cup-shared' }, shared) : '') + part('ground', ln(4, 96, 96, 96, 2, T.ink));
  const g = el('g', { 'data-lcs-pictogram': 'habit', 'data-lcs-pose': pose, 'data-lcs-cups': cups, ...dataAttrs(data) }, inner);
  const svg = svgRoot({ width: px === '100%' ? '100%' : fmt(px), height: px === '100%' ? '100%' : fmt(px), viewBox: '0 0 100 100', label: 'two children' }, g, { style: 'display:block' });
  return { svg, w: px, h: px, meta: { pose, parts: ['figure-left', 'figure-right', 'glass'] } };
}

/* ============================================================== tools (product views, NO bubbles, NO cross) */
const TOOL_DEF = {
  soap: () => part('dish', el('path', { d: 'M12,70 H88 Q86,80 78,80 H22 Q14,80 12,70 Z', fill: T.teal })) +
    part('bar', el('rect', { x: 22, y: 44, width: 56, height: 28, rx: 13, ry: 13, fill: T.white, stroke: T.ink, 'stroke-width': 3 }) +
      el('rect', { x: 34, y: 52, width: 32, height: 12, rx: 6, ry: 6, fill: 'none', stroke: T.ink, 'stroke-width': 2 })),
  toothbrush: () => el('g', { transform: 'rotate(-35 50 50)' },
    part('brush-handle', el('rect', { x: 6, y: 47, width: 60, height: 9, rx: 4.5, ry: 4.5, fill: T.teal })) +
    part('brush-head', el('rect', { x: 62, y: 47, width: 30, height: 9, rx: 4, ry: 4, fill: T.white, stroke: T.ink, 'stroke-width': 2 })) +
    part('bristles', el('rect', { x: 66, y: 33, width: 24, height: 14, rx: 2, ry: 2, fill: T.white, stroke: T.ink, 'stroke-width': 2 }) +
      [72, 78, 84].map((x) => ln(x, 35, x, 45, 2, T.ink)).join(''))),
  comb: () => part('spine', el('rect', { x: 10, y: 34, width: 80, height: 14, rx: 5, ry: 5, fill: T.teal })) +
    part('teeth', Array.from({ length: 11 }, (_, i) => el('rect', { x: fmt(13 + i * 7), y: 46, width: 3.6, height: 22, rx: 1.8, ry: 1.8, fill: T.teal })).join('')),
  bed: () => part('frame', el('rect', { x: 8, y: 30, width: 8, height: 54, rx: 3, ry: 3, fill: T.teal }) +
      el('rect', { x: 86, y: 48, width: 7, height: 36, rx: 3, ry: 3, fill: T.teal }) +
      el('rect', { x: 14, y: 64, width: 74, height: 8, fill: T.teal })) +
    part('mattress', el('rect', { x: 16, y: 55, width: 70, height: 10, rx: 3, ry: 3, fill: T.white, stroke: T.ink, 'stroke-width': 2 })) +
    part('pillow', el('rect', { x: 18, y: 45, width: 20, height: 11, rx: 5, ry: 5, fill: T.white, stroke: T.ink, 'stroke-width': 2 })) +
    part('blanket', el('path', { d: 'M40,50 H84 Q88,50 88,54 V66 H40 Z', fill: T.tealSoft, stroke: T.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' })),
  // lead review 2026-09-23: the flat box with a blob read as a loaf / a toilet. Now the box every child knows: a
  // front face, a lighter top face in perspective with an OVAL SLOT, and one soft tissue popping up out of the
  // slot with a peak and a fold. No cross, no text.
  'tissue-box': () => part('box', el('path', { d: 'M84,52 L94,42 V74 L84,84 Z', fill: T.teal, stroke: T.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
      el('rect', { x: 14, y: 52, width: 70, height: 32, fill: T.teal, stroke: T.ink, 'stroke-width': 2 }) +
      el('path', { d: 'M14,52 L24,42 H94 L84,52 Z', fill: T.tealSoft, stroke: T.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
      el('ellipse', { cx: 54, cy: 47, rx: 20, ry: 3.2, fill: T.white, stroke: T.ink, 'stroke-width': 1.8 })) +
    part('puff', el('path', { d: 'M40,47 C38,36 40,24 48,12 C50,18 54,22 60,20 C62,28 66,32 70,30 C68,36 68,42 68,47 Z', fill: T.white, stroke: T.ink, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }) +
      el('path', { d: 'M48,14 C50,24 54,34 55,46', fill: 'none', stroke: T.ink, 'stroke-width': 1.6, 'stroke-linecap': 'round' })),
  hat: () => part('brim', el('ellipse', { cx: 50, cy: 66, rx: 42, ry: 9, fill: T.teal })) +
    part('crown', el('path', { d: 'M28,64 Q28,34 50,34 Q72,34 72,64 Z', fill: T.teal }) +
      el('rect', { x: 28, y: 55, width: 44, height: 6, fill: T.tealSoft })),
  towel: () => part('towel', el('rect', { x: 22, y: 18, width: 56, height: 66, rx: 4, ry: 4, fill: T.tealSoft, stroke: T.ink, 'stroke-width': 2 }) +
    ln(22, 70, 78, 70, 2, T.ink) + ln(22, 76, 78, 76, 2, T.ink)),
  glass: () => glassPart(30, 18, 3.3),
};
const TOOLS = Object.keys(TOOL_DEF);
const TOOL_PARTS = { soap: ['dish', 'bar'], toothbrush: ['brush-handle', 'brush-head', 'bristles'], comb: ['spine', 'teeth'], bed: ['frame', 'mattress', 'pillow', 'blanket'],
  'tissue-box': ['puff', 'box'], hat: ['brim', 'crown'], towel: ['towel'], glass: ['glass'] };

/** the lowest drawn y of each tool in unit space (measured getBBox + half the outline) — `ground:true` sits it on the box floor */
const TOOL_BOTTOM = { soap: 80, toothbrush: 81, comb: 68, bed: 84, 'tissue-box': 85, hat: 75, towel: 85, glass: 72 };
/**
 * ground:true (the base shelf, ADDITIVE): the viewBox is shifted so the tool's lowest drawn point sits 3 units
 * above the box floor — every tool STANDS on the plank instead of floating at its own height.
 */
function habitTool({ kind, px = 104, ground = false, data = {} } = {}) {
  if (!TOOL_DEF[kind]) throw new Error(`habit-pictogram: tool "${kind}" is not one of ${TOOLS.join(' | ')}`);
  const g = el('g', { 'data-lcs-glyph': kind, ...dataAttrs(data) }, TOOL_DEF[kind]());
  const dy = ground ? TOOL_BOTTOM[kind] - 97 : 0;
  const svg = svgRoot({ width: fmt(px), height: fmt(px), viewBox: `0 ${fmt(dy)} 100 100`, label: kind }, g, { style: 'display:block' });
  return { svg, w: px, h: px, meta: { kind, parts: TOOL_PARTS[kind].slice() } };
}

/* ============================================================== F1: the view into the sink (hands close-up) */
/**
 * REDRAWN for Phase E (2026-09-23): the build-round drafts drew solid black MITTENS that read as boxing gloves and
 * the sink band dominated every card. Hands are now LINE-ART hands (white fill, ink outline, four fingers + a thumb,
 * a tealSoft cuff) — a hand to any five-year-old, in colour and in greyscale, and never a skin colour (colour is
 * never tied to a person). The sink is a slim rim + bowl at the foot of the card, the tap a slim riser on the right.
 *
 * state vector: tap (on|off) · bubbles (0|1) · soap (rim|hands) · towel (0|1)
 */
const HAND_STATES = { wet: ['on', 0, 'rim', 0], soap: ['off', 0, 'hands', 0], rub: ['off', 1, 'rim', 0], rinse: ['on', 1, 'rim', 0], dry: ['off', 0, 'rim', 1] };
/** one line-art hand, fingers UP, palm to the viewer; x,y = palm centre; rot deg; flip mirrors the thumb (a right hand) */
function lineHand(x, y, rot, flip, tag, s = 1) {
  const f = flip ? -1 : 1;
  const shapes = [
    ['rect', { x: -9, y: -3, width: 18, height: 16, rx: 6, ry: 6 }],
    ['rect', { x: -9, y: -17, width: 4.4, height: 18, rx: 2.2, ry: 2.2 }],
    ['rect', { x: -4.4, y: -20, width: 4.4, height: 21, rx: 2.2, ry: 2.2 }],
    ['rect', { x: 0.2, y: -19, width: 4.4, height: 20, rx: 2.2, ry: 2.2 }],
    ['rect', { x: 4.7, y: -15, width: 4.2, height: 16, rx: 2.1, ry: 2.1 }],
    ['path', { d: 'M-8,7 L-15,-3 A2.6,2.6 0 0 1 -11,-6 L-4,3 Z' }],
  ];
  const outline = shapes.map(([t, a]) => el(t, { ...a, fill: T.ink, stroke: T.ink, 'stroke-width': 3.4, 'stroke-linejoin': 'round' })).join('');
  const fill = shapes.map(([t, a]) => el(t, { ...a, fill: T.white })).join('');
  const cuff = el('rect', { x: -8, y: 12, width: 16, height: 10, rx: 2, ry: 2, fill: T.tealSoft, stroke: T.ink, 'stroke-width': 1.6 });
  return el('g', { transform: `translate(${fmt(x)} ${fmt(y)}) rotate(${rot}) scale(${f * s} ${s})`, 'data-lcs-part': tag }, cuff + outline + fill);
}
function sinkBand(tapOn) {
  const P = [];
  P.push(part('tap', el('rect', { x: 86, y: 6, width: 7, height: 74, rx: 2, ry: 2, fill: T.teal }) +
    el('rect', { x: 58, y: 6, width: 35, height: 7, rx: 3.5, ry: 3.5, fill: T.teal }) +
    el('rect', { x: 58, y: 11, width: 9, height: 6, rx: 1.5, ry: 1.5, fill: T.teal })));
  P.push(part('rim', el('rect', { x: 0, y: 79, width: 100, height: 8.5, rx: 4, ry: 4, fill: T.teal })));
  P.push(part('bowl', el('path', { d: 'M5,87 H95 L88,99 H12 Z', fill: T.white, stroke: T.teal, 'stroke-width': 2.5, 'stroke-linejoin': 'round' })));
  return P.join('');
}
/** the running water, drawn OVER the hands (a stream hidden behind the fingers read as a tap that is off) */
function streamPart() {
  return part('stream', el('path', { d: 'M59.5,17 H65.5 L67,44 H58 Z', fill: T.tealSoft, stroke: T.teal, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }) +
    ln(61.5, 20, 61.2, 40, 1.3, T.teal) + ln(63.6, 22, 64, 41, 1.3, T.teal) + drop(52, 44, 2.2) + drop(74, 44, 2.2));
}
function soapBar(x, y, tag = 'soap', w = 18, h = 9) {
  return part(tag, el('rect', { x: fmt(x), y: fmt(y), width: w, height: h, rx: h / 2 - 0.5, ry: h / 2 - 0.5, fill: T.white, stroke: T.ink, 'stroke-width': 2 }) +
    el('rect', { x: fmt(x + w * 0.25), y: fmt(y + h * 0.3), width: fmt(w * 0.5), height: fmt(h * 0.4), rx: h * 0.2, ry: h * 0.2, fill: 'none', stroke: T.ink, 'stroke-width': 1.2 }));
}
const drop = (x, y, r = 3) => el('path', { d: `M${fmt(x)},${fmt(y - 1.6 * r)} Q${fmt(x + 1.3 * r)},${fmt(y)} ${fmt(x)},${fmt(y + r)} Q${fmt(x - 1.3 * r)},${fmt(y)} ${fmt(x)},${fmt(y - 1.6 * r)} Z`, fill: T.teal });
const UNDER_TAP = () => lineHand(52, 54, -18, false, 'hand-left') + lineHand(75, 54, 18, true, 'hand-right') + streamPart();
const HANDS_DEF = {
  wet: () => sinkBand(true) + soapBar(8, 71) + UNDER_TAP(),
  soap: () => sinkBand(false) + lineHand(52, 46, 22, false, 'hand-left') + lineHand(76, 46, -22, true, 'hand-right') + soapBar(55, 45, 'soap-held', 18, 11) +
    part('drops', drop(57, 72) + drop(64, 75) + drop(71, 72)),
  rub: () => sinkBand(false) + soapBar(8, 71) + lineHand(60, 46, 8, false, 'hand-left') + lineHand(67, 46, -8, true, 'hand-right') +
    part('rub-marks', mark('M42,40 q-4,6 0,12') + mark('M85,40 q4,6 0,12')) +
    part('bubbles', [[47, 30, 4], [46, 60, 3.4], [81, 30, 4], [82, 60, 3.4], [55, 22, 3], [73, 22, 3]].map(([x, y, r]) => bubble(x, y, r)).join('')),
  rinse: () => sinkBand(true) + soapBar(8, 71) + UNDER_TAP() +
    part('bubbles', [[55, 90, 2.8], [65, 85, 3.2], [74, 91, 2.8], [62, 95, 2.6]].map(([x, y, r]) => bubble(x, y, r)).join('')),
  dry: () => sinkBand(false) + soapBar(8, 71) +
    part('towel', el('path', { d: 'M34,26 H78 V68 Q56,72 34,68 Z', fill: T.tealSoft, stroke: T.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' }) +
      ln(34, 58, 78, 58, 1.6, T.ink) + ln(34, 62, 78, 62, 1.6, T.ink)) +
    lineHand(34, 30, -12, false, 'hand-left', 0.9) + lineHand(78, 30, 12, true, 'hand-right', 0.9),
};
// F3 `soap` pair (design §3 F3): the SAME hands under the SAME running tap; the ONLY difference is the lather
HANDS_DEF['hands-soap'] = () => sinkBand(true) + UNDER_TAP() +
  part('bubbles', [[38, 38, 4.6], [40, 56, 4.2], [89, 40, 4.6], [88, 58, 4.2], [63, 68, 4], [45, 24, 3.6], [82, 24, 3.6]].map(([x, y, r]) => bubble(x, y, r)).join(''));
HANDS_DEF['hands-water-only'] = () => sinkBand(true) + UNDER_TAP();
function handsView({ state, px = 176, data = {} } = {}) {
  if (!HANDS_DEF[state]) throw new Error(`habit-pictogram: hands state "${state}"`);
  const g = el('g', { 'data-lcs-hands': state, ...dataAttrs(data) }, HANDS_DEF[state]());
  const svg = svgRoot({ width: px === '100%' ? '100%' : fmt(px), height: px === '100%' ? '100%' : fmt(px), viewBox: '0 0 100 100', label: 'hands at the sink' }, g, { style: 'display:block' });
  return { svg, w: px, h: px, meta: { state, vector: HAND_STATES[state] ? HAND_STATES[state].slice() : null } };
}

/* ============================================================== F2: brushing close-ups */
/**
 * REDRAWN for Phase E (2026-09-23). Eight cards a six-year-old names from the drawing: one BIG object per card,
 * the brush always the same brush (teal handle, white head, white bristles with ink slits), the tube always the same
 * tube (white, teal label band, crimped end). No clock, no sand-glass, no mouth-rinse cup, no paste amount.
 */
const BRUSH_KINDS = ['open-tube', 'paste-on-brush', 'chewing', 'outside', 'inside', 'spit', 'rinse-brush', 'brush-in-cup'];
/** the tube lying horizontally, nozzle to the RIGHT at (x+L, y+H/2) */
function tube(x, y, L = 50, H = 20) {
  return part('tube', el('path', { d: `M${x},${y + 2} L${x + 4},${y} H${x + L - 8} Q${x + L},${y + H / 2 - 5} ${x + L},${y + H / 2 - 3} V${y + H / 2 + 3} Q${x + L},${y + H / 2 + 5} ${x + L - 8},${y + H} H${x + 4} L${x},${y + H - 2} Z`, fill: T.white, stroke: T.ink, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }) +
    el('rect', { x: x + 12, y: y + 5, width: L * 0.42, height: H - 10, rx: 2, ry: 2, fill: T.teal }) +
    ln(x + 3, y + 3, x + 3, y + H - 3, 1.4, T.ink) + ln(x + 6, y + 2, x + 6, y + H - 2, 1.4, T.ink) +
    el('rect', { x: x + L, y: y + H / 2 - 3, width: 5, height: 6, fill: T.white, stroke: T.ink, 'stroke-width': 1.8 }));
}
/** the brush lying horizontally, head to the RIGHT, bristles UP (or DOWN with down:true); x,y = handle start (left), centreline y */
function brush(x, y, L = 70, down = false, tag = 'brush') {
  const hw = L * 0.32, s = down ? 1 : -1;
  const P = [];
  P.push(el('rect', { x, y: y - 3, width: L - hw + 2, height: 6, rx: 3, ry: 3, fill: T.teal }));
  P.push(el('rect', { x: x + L - hw, y: y - 3.5, width: hw, height: 7, rx: 2.5, ry: 2.5, fill: T.white, stroke: T.ink, 'stroke-width': 2 }));
  const by = down ? y + 3.5 : y - 3.5 - 10;
  P.push(el('rect', { x: x + L - hw + 1.5, y: by, width: hw - 3, height: 10, rx: 1.5, ry: 1.5, fill: T.white, stroke: T.ink, 'stroke-width': 2 }));
  for (let k = 1; k < 4; k++) P.push(ln(x + L - hw + 1.5 + k * (hw - 3) / 4, by + 2, x + L - hw + 1.5 + k * (hw - 3) / 4, by + 8, 1.3, T.ink));
  return part(tag, P.join(''), { 'data-lcs-brush-head-x': fmt(x + L - hw / 2), 'data-lcs-brush-head-y': fmt(y + s * 8) });
}
/** top view of a U arch of 10 teeth, open to the TOP; returns the tooth centres (the arch polygon) */
function arch(cx, cy, rx = 30, ry = 30) {
  const pts = [], P = [];
  P.push(el('path', { d: `M${cx - rx - 7},${cy - 12} A${rx + 7},${ry + 7} 0 0 0 ${cx + rx + 7},${cy - 12} L${cx + rx - 7},${cy - 12} A${rx - 7},${ry - 7} 0 0 1 ${cx - rx + 7},${cy - 12} Z`, fill: T.coralSoft, stroke: T.ink, 'stroke-width': 1.6 }));
  for (let i = 0; i < 10; i++) {
    const a = Math.PI * (i / 9);
    const x = cx - rx * Math.cos(a), y = cy - 12 + ry * Math.sin(a);
    pts.push([x, y]);
    P.push(el('rect', { x: fmt(x - 5), y: fmt(y - 5), width: 10, height: 10, rx: 3.5, ry: 3.5, fill: T.white, stroke: T.ink, 'stroke-width': 2 }));
  }
  return { svg: part('arch', P.join(''), { 'data-lcs-arch': pts.map((p) => fmt(p[0]) + ',' + fmt(p[1])).join(' ') }), pts };
}
function molars() {
  const P = [el('rect', { x: 8, y: 66, width: 84, height: 22, rx: 8, ry: 8, fill: T.coralSoft, stroke: T.ink, 'stroke-width': 1.8 })];
  for (const x of [12, 38, 64]) P.push(el('path', { d: `M${x},70 V52 Q${x},46 ${x + 6},46 Q${x + 12},42 ${x + 12},48 Q${x + 12},42 ${x + 18},46 Q${x + 24},46 ${x + 24},52 V70 Z`, fill: T.white, stroke: T.ink, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
  return part('molars', P.join(''));
}
const cupPart = (x, y, w = 24, h = 30, tag = 'cup') => part(tag, el('path', { d: `M${x},${y} H${x + w} L${x + w - 3},${y + h} H${x + 3} Z`, fill: T.white, stroke: T.ink, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }) +
  el('path', { d: `M${x + 2},${y + h * 0.55} H${x + w - 2}`, stroke: T.ink, 'stroke-width': 1.2 }));
const BRUSH_DEF = {
  // a big tube lying down, its cap OFF beside the open nozzle, a hand holding the cap and a turning arrow
  'open-tube': () => tube(4, 46, 60, 26) +
    part('cap', el('rect', { x: 76, y: 50, width: 12, height: 18, rx: 2.5, ry: 2.5, fill: T.teal, stroke: T.ink, 'stroke-width': 1.8 }) + ln(80, 53, 80, 65, 1.3, T.white) + ln(84, 53, 84, 65, 1.3, T.white)) +
    lineHand(82, 76, 0, true, 'hand', 0.8) +
    part('turn', mark('M72,40 A14,14 0 0 1 94,44') + el('path', { d: 'M95,45 l-6,-1.5 l3.5,-4.5 Z', fill: T.ink })),
  // the brush lying at the foot, the tube tipped over its head, a white curl of paste on the bristles, a hand on the tube
  'paste-on-brush': () => brush(4, 82, 88) +
    part('paste', el('path', { d: 'M62,70 Q60,62 66,62 Q68,56 74,60 Q80,58 81,64 Q82,70 78,70 Z', fill: T.white, stroke: T.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' })) +
    el('g', { transform: 'rotate(38 70 50)' }, tube(26, 40, 50, 20)) +
    lineHand(40, 24, -52, false, 'hand', 0.8),
  chewing: () => molars() + brush(20, 36, 64, true) + part('scrub', mark('M22,24 h-8') + mark('M92,24 h-6') + el('path', { d: 'M14,24 l4,-3 v6 Z', fill: T.ink }) + el('path', { d: 'M92,24 l-4,-3 v6 Z', fill: T.ink })),
  outside: () => { const a = arch(46, 42); return a.svg + el('g', { transform: 'rotate(-58 82 70)' }, brush(50, 70, 50, false)); },
  inside: () => { const a = arch(46, 42); return a.svg + el('g', { transform: 'translate(44 -4) rotate(90)' }, brush(0, 0, 48, false)); },
  // the child (the family's own faceless figure) bent over the sink, foam drops falling from the mouth into the bowl
  // the child bends over the sink in profile (head over the bowl, one arm on the rim) and white foam drops fall from
  // the mouth into the bowl — no cup, no glass, no rinse
  // FIX ROUND 1 (da panel, 2026-09-23): teardrops falling past the face read as CRYING or face-washing. Now the
  // child bends LOW over the bowl, still holding the brush up in one hand (so it is about brushing), and white
  // toothpaste FOAM (bubbles, never teardrops) leaves the MOUTH and falls into the bowl.
  spit: () => part('torso', el('path', { d: 'M6,84 L16,54 Q19,47 27,48 L42,54 L30,84 Z', fill: T.ink })) +
    part('head', el('circle', { cx: 46, cy: 50, r: 12, fill: T.ink })) +
    part('arm-near', poly([[26, 56], [22, 40], [30, 28]], 11, T.white) + poly([[26, 56], [22, 40], [30, 28]], 7, T.ink) +
      el('circle', { cx: 30, cy: 28, r: 4.5, fill: T.ink, stroke: T.white, 'stroke-width': 2, 'paint-order': 'stroke' })) +
    el('g', { transform: 'rotate(-70 30 28)' }, brush(18, 28, 40, false)) +
    sinkBand(false) +
    part('drops', [[57, 58, 3.4], [60.5, 63, 2.8], [58, 69, 3], [60, 75, 2.6]].map(([x, y, r]) => bubble(x, y, r)).join('')),
  'rinse-brush': () => sinkBand(true) + streamPart() + el('g', { transform: 'rotate(-20 62 44)' }, brush(24, 44, 50, true) +
      // lead review 2026-09-23: USED foam clings to the bristles and falls off them, so the card cannot read as
      // "wet the brush first" (a contested BEFORE step)
      part('foam', [[61.5, 59.5, 3], [66, 60.5, 3.2], [70.5, 59.5, 3]].map(([x, y, r]) => bubble(x, y, r)).join(''))) +
    part('bubbles', [[56, 69, 3.4], [64, 75, 3.4], [58, 82, 3]].map(([x, y, r]) => bubble(x, y, r)).join('')),
  'brush-in-cup': () => sinkBand(false) + el('g', { transform: 'rotate(-80 40 44)' }, brush(16, 44, 62, false)) + cupPart(28, 50, 26, 30),
};
function brushCard({ kind, px = 104, data = {} } = {}) {
  if (!BRUSH_DEF[kind]) throw new Error(`habit-pictogram: brush card "${kind}"`);
  const g = el('g', { 'data-lcs-brush': kind, ...dataAttrs(data) }, BRUSH_DEF[kind]());
  const svg = svgRoot({ width: px === '100%' ? '100%' : fmt(px), height: px === '100%' ? '100%' : fmt(px), viewBox: '0 0 100 100', label: 'tooth brushing' }, g, { style: 'display:block' });
  return { svg, w: px, h: px, meta: { kind } };
}

module.exports = {
  habitFigure, twoFigures, habitTool, handsView, brushCard,
  POSES, POSE_PARTS, TOOLS, TOOL_PARTS, TOOL_BOTTOM, HAND_STATES, BRUSH_KINDS, TWO_POSES, ANCHORS, HAND_ANCHOR, MARK_PARTS, POSE_BOX,
};
