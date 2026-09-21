/**
 * components-b4/human-body.js — the K-354 `human-body` components (design
 * docs/worksheet-gen/b4-designs/K-354-human-body.md §2 "NEW
 * templates/components-b4/human-body.js"). Behind the templates/components-b4.js
 * barrel (a duplicate export name throws for every b4 family, so every name
 * here is `body…`). Scoped inline CSS; no page.css edit.
 *
 * BASE (this file, Phase 1):
 *   bodyLabelStage({ targets:[{id, side}], figureH=504, laneW=195, laneH=64,
 *                    glyphH=40, w=675, h=580, gapX=7, fill='cream' })
 *     `[lane L laneW][gapX][bodyFigure h figureH][gapX][lane R laneW]` in a
 *     w x h box, the figure centred (x = (w - figW)/2, y = (h - figureH)/2).
 *     Per target: a coral RING (r 7, stroke 3, fill none, data-lcs-anchor-ring)
 *     on the anchor, a 2.5 px teal leader from the RING'S EDGE to the near-edge
 *     midpoint of its lane and a teal dot (r 3.5) there; the lane = an EMPTY
 *     `.ws-blankbox` (white, dashed coral) holding writingRow({w:laneW-6,
 *     h:laneH-6, glyphH, xHeight:true}), data-lcs-label="<id>" data-lcs-side.
 *     Lanes per side are placed by the K-344 `placeLanes` (imported from
 *     components-b3, never redefined): anchor-centred (+ a per-id lane HINT
 *     for the eye / nose, whose horizontal leader would run through the ear
 *     bump), pushed apart to >= laneH + 20, clamped inside [0, h - laneH].
 *     The overlay stamps every segment K-344-style (data-lcs-pointer -ax -ay
 *     -lx -ly = the ANCHOR CENTRE and the lane end, overlay-local px) so
 *     verify() re-runs the crossing sweep from the stamps.
 *     THE SWEEP (throws `LEADER_CROSS` — the composer redraws): (a) no two
 *     leaders intersect; (b) no leader passes within 16 px of another
 *     TARGET'S ring centre (the design rule); (c) no leader's drawn part
 *     crosses a drawn shape of the figure it does not belong to (the
 *     primitive's `obstacles`, 3 px margin, own regions per anchor from
 *     body-figure OWN_REGIONS) — a leader from the neck never runs over the
 *     shoulder, one from the eye never through the ear. (d) a lane on side
 *     L takes the L coordinate of a bilateral anchor (R likewise; midline
 *     ids either), so a leader never crosses the figure's far half.
 *     Returns { html, lanes:[{id, side, top, left}], segments, anchors:{id:{x,y,side}},
 *               figure:{x, y, w, h}, laneOrder:[ids top-to-bottom, L before R on a tie] }.
 *   bodyLabelBank({ words:[{id, word}], wordPx=18 })
 *     components-b2 wordBank (`.ws-scene-banner.ws-bank`, 59 px one row +
 *     margin-bottom 10) with data-lcs-bank="<id>" per word (via vocabKey).
 *   bodyLeaderSweep(segments, targets, obstacles, opts)
 *     the pure sweep above (exported so the gate can poison it on stamps).
 *
 * FACES (Phase 2, not built here): bodyCountCard · bodyColorLegend ·
 * bodySpellRow · bodyMissingCard · bodyPairCard (design §2 list).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, line, circle, esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { bodyFigure, ANCHORS, OWN_REGIONS, LABEL_MIN_H } = require('../../primitives/body-figure.js');
const { aboutMePlaceLanes: placeLanes } = require('../components-b3.js');
const { wordBank } = require('../components-b2.js');

const T = tokens.color;
const RING_R = 7, RING_STROKE = 3, LEADER_W = 2.5, LANE_DOT_R = 3.5;
const FOREIGN_RING_PX = 16;      // design §2: a leader never passes within 16 px of another target's ring
const OBSTACLE_MARGIN = 3;       // px around every drawn shape the leader does not belong to
const LANE_GAP = 20;
/** Lane hints (px, added to the anchor y as the lane's wanted centre) — measured: the eye's and the nose's horizontal leader would cross the ear bump. */
const LANE_HINT = { eye: 90, nose: 24 };

/* ---------------------------------------------------------------- pure geometry (px) */
function cross(a, b) {
  const d = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
  const A = { x: a.ax, y: a.ay }, B = { x: a.lx, y: a.ly }, C = { x: b.ax, y: b.ay }, D = { x: b.lx, y: b.ly };
  return d(A, B, C) * d(A, B, D) < 0 && d(C, D, A) * d(C, D, B) < 0;
}
function pointSegDist(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const L2 = dx * dx + dy * dy;
  const t = L2 ? Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / L2)) : 0;
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}
function segSegDist(a, b) {
  const s1 = { ax: a[0], ay: a[1], lx: a[2], ly: a[3] }, s2 = { ax: b[0], ay: b[1], lx: b[2], ly: b[3] };
  if (cross(s1, s2)) return 0;
  return Math.min(pointSegDist(a[0], a[1], b[0], b[1], b[2], b[3]), pointSegDist(a[2], a[3], b[0], b[1], b[2], b[3]),
    pointSegDist(b[0], b[1], a[0], a[1], a[2], a[3]), pointSegDist(b[2], b[3], a[0], a[1], a[2], a[3]));
}
function segRectHit(seg, r) {
  const inside = (x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
  if (inside(seg[0], seg[1]) || inside(seg[2], seg[3])) return true;
  const s = { ax: seg[0], ay: seg[1], lx: seg[2], ly: seg[3] };
  const edges = [[r.x, r.y, r.x + r.w, r.y], [r.x + r.w, r.y, r.x + r.w, r.y + r.h], [r.x + r.w, r.y + r.h, r.x, r.y + r.h], [r.x, r.y + r.h, r.x, r.y]];
  return edges.some(([x1, y1, x2, y2]) => cross(s, { ax: x1, ay: y1, lx: x2, ly: y2 }));
}
/** Does the drawn leader `seg` [x1,y1,x2,y2] touch obstacle `o` (px) within `m`? */
function hitsObstacle(seg, o, m) {
  if (o.kind === 'circle') return pointSegDist(o.cx, o.cy, seg[0], seg[1], seg[2], seg[3]) <= o.r + m;
  if (o.kind === 'capsule') return segSegDist(seg, [o.a[0], o.a[1], o.b[0], o.b[1]]) <= o.w / 2 + m;
  if (o.kind === 'rect') return segRectHit(seg, { x: o.x - m, y: o.y - m, w: o.w + 2 * m, h: o.h + 2 * m });
  if (o.kind === 'ellipse') {   // scale the ellipse to the unit circle; a segment stays a segment
    const k = Math.min(o.rx, o.ry);
    const p = [(seg[0] - o.cx) / o.rx, (seg[1] - o.cy) / o.ry, (seg[2] - o.cx) / o.rx, (seg[3] - o.cy) / o.ry];
    return pointSegDist(0, 0, p[0], p[1], p[2], p[3]) <= 1 + m / k;
  }
  throw new Error('bodyLeaderSweep: unknown obstacle kind ' + o.kind);
}
/** The region ids a leader from `id` on `side` may cross. */
function ownRegions(id, side) {
  const own = OWN_REGIONS[id] || [];
  return new Set(own.flatMap((r) => (['arm', 'hand', 'leg', 'foot', 'ear'].includes(r) ? [r + '-' + side] : [r])));
}
/**
 * bodyLeaderSweep(segments, targets, obstacles, {foreignPx, margin}) -> string[] of findings (empty = clean).
 *   segments: [{id, side, ax, ay, lx, ly, dx1, dy1}] — anchor centre, lane end, drawn start (ring edge)
 *   targets:  [{id, side, x, y}] — every ring centre on the page
 */
function bodyLeaderSweep(segments, targets, obstacles, opts = {}) {
  const foreignPx = opts.foreignPx != null ? opts.foreignPx : FOREIGN_RING_PX;
  const m = opts.margin != null ? opts.margin : OBSTACLE_MARGIN;
  const f = [];
  for (let i = 0; i < segments.length; i++) for (let j = i + 1; j < segments.length; j++) if (cross(segments[i], segments[j])) f.push(`leaders ${segments[i].id}-${segments[i].side} and ${segments[j].id}-${segments[j].side} cross`);
  for (const s of segments) for (const t of targets) {
    if (t.id === s.id && t.side === s.side) continue;
    const d = pointSegDist(t.x, t.y, s.ax, s.ay, s.lx, s.ly);
    if (d < foreignPx) f.push(`leader ${s.id}-${s.side} passes ${d.toFixed(1)} px from the ${t.id}-${t.side} ring (< ${foreignPx})`);
  }
  for (const s of segments) {
    const own = ownRegions(s.id, s.side);
    const drawn = [s.dx1, s.dy1, s.lx, s.ly];
    for (const o of obstacles || []) {
      if (own.has(o.region)) continue;
      if (hitsObstacle(drawn, o, m)) f.push(`leader ${s.id}-${s.side} crosses the figure's ${o.region} (${o.kind})`);
    }
  }
  return f;
}

/* ---------------------------------------------------------------- the label stage */
function bodyLabelStage({ targets, figureH = 504, laneW = 195, laneH = 64, glyphH = 40, w = 675, h = 580, gapX = 7, fill = 'cream' }) {
  if (!Array.isArray(targets) || !targets.length) throw new Error('bodyLabelStage: no targets');
  if (figureH < LABEL_MIN_H) throw new Error(`bodyLabelStage: figureH ${figureH} < LABEL_MIN_H ${LABEL_MIN_H}`);
  if (laneH < 56) throw new Error(`bodyLabelStage: laneH ${laneH} < the K floor 56`);
  const fig = bodyFigure({ h: figureH, fill });
  if (2 * laneW + 2 * gapX + fig.width > w + 0.5) throw new Error(`bodyLabelStage: lanes + figure ${(2 * laneW + 2 * gapX + fig.width).toFixed(1)} > ${w}`);
  if (figureH > h) throw new Error(`bodyLabelStage: figure ${figureH} taller than the stage ${h}`);
  const figX = (w - fig.width) / 2, figY = (h - figureH) / 2, midX = figX + fig.width / 2;
  const sides = { L: [], R: [] };
  const anchors = {};
  const seen = new Set();
  for (const t of targets) {
    if (!ANCHORS[t.id]) throw new Error(`bodyLabelStage: unknown anchor "${t.id}"`);
    if (t.side !== 'L' && t.side !== 'R') throw new Error(`bodyLabelStage: target ${t.id} side "${t.side}" is not L|R`);
    if (seen.has(t.id)) throw new Error(`bodyLabelStage: target ${t.id} repeats`);
    seen.add(t.id);
    const a = fig.anchors[t.id];
    const p = a.L ? a[t.side] : a;   // a bilateral id takes ITS side's coordinate (d): a leader never crosses the far half
    anchors[t.id] = { x: figX + p.x, y: figY + p.y, side: t.side, hint: LANE_HINT[t.id] || 0 };
    sides[t.side].push(t.id);
  }
  for (const s of ['L', 'R']) if (sides[s].length * (laneH + LANE_GAP) - LANE_GAP > h) throw new Error(`bodyLabelStage: ${sides[s].length} lanes on side ${s} do not fit ${h} px`);
  const lanes = [], pointers = [], segments = [], laneMeta = [];
  for (const side of ['L', 'R']) {
    const list = sides[side].slice().sort((p, q) => (anchors[p].y + anchors[p].hint) - (anchors[q].y + anchors[q].hint) || anchors[p].y - anchors[q].y);
    const ys = placeLanes(list.map((id) => anchors[id].y + anchors[id].hint), laneH, h, LANE_GAP);
    list.forEach((id, i) => {
      const a = anchors[id];
      const lx = side === 'L' ? 0 : w - laneW, ly = ys[i];
      const ex = side === 'L' ? laneW : w - laneW, ey = ly + laneH / 2;
      const L = Math.hypot(ex - a.x, ey - a.y);
      if (L < RING_R + 10) throw new Error(`bodyLabelStage: lane end for ${id} sits inside its ring`);
      const ux = (ex - a.x) / L, uy = (ey - a.y) / L;
      const dx1 = a.x + ux * (RING_R + RING_STROKE / 2), dy1 = a.y + uy * (RING_R + RING_STROKE / 2);
      laneMeta.push({ id, side, top: ly, left: lx });
      lanes.push(`<span class="ws-blankbox" data-lcs-label="${esc(id)}" data-lcs-side="${side}" style="position:absolute;left:${lx}px;top:${ly}px;width:${laneW}px;height:${laneH}px;` +
        `display:inline-flex;align-items:center;justify-content:center">${writingRow({ w: laneW - 6, h: laneH - 6, glyphH, xHeight: true }).svg}</span>`);
      segments.push({ id, side, ax: a.x, ay: a.y, lx: ex, ly: ey, dx1, dy1 });
      pointers.push(
        line({ x1: dx1.toFixed(1), y1: dy1.toFixed(1), x2: ex, y2: ey, strokeColor: T.teal, strokeWidth: LEADER_W, cap: 'round',
          data: { 'data-lcs-pointer': id, 'data-lcs-side': side, 'data-lcs-ax': a.x.toFixed(1), 'data-lcs-ay': a.y.toFixed(1), 'data-lcs-lx': ex, 'data-lcs-ly': ey } }) +
        circle({ cx: a.x.toFixed(1), cy: a.y.toFixed(1), r: RING_R, fill: 'none', strokeColor: T.coral, strokeWidth: RING_STROKE, data: { 'data-lcs-anchor-ring': id, 'data-lcs-side': side } }) +
        circle({ cx: ex, cy: ey, r: LANE_DOT_R, fill: T.teal, data: { 'data-lcs-lane-dot': id } }));
    });
  }
  const targetPts = Object.entries(anchors).map(([id, a]) => ({ id, side: a.side, x: a.x, y: a.y }));
  const obstacles = fig.obstacles.map((o) => {
    if (o.kind === 'circle' || o.kind === 'ellipse') return { ...o, cx: o.cx + figX, cy: o.cy + figY };
    if (o.kind === 'rect') return { ...o, x: o.x + figX, y: o.y + figY };
    return { ...o, a: [o.a[0] + figX, o.a[1] + figY], b: [o.b[0] + figX, o.b[1] + figY] };
  });
  const findings = bodyLeaderSweep(segments, targetPts, obstacles);
  if (findings.length) { const e = new Error('bodyLabelStage LEADER_CROSS: ' + findings.join('; ')); e.code = 'LEADER_CROSS'; e.findings = findings; throw e; }
  const laneOrder = laneMeta.slice().sort((p, q) => p.top - q.top || (p.side === 'L' ? -1 : 1)).map((l) => l.id);
  const overlay = svgRoot({ width: w, height: h, label: '' }, pointers.join(''), { 'aria-hidden': 'true', 'data-lcs-pointers': targets.length, style: 'position:absolute;left:0;top:0;pointer-events:none' });
  const html = `<div data-lcs-labelstage data-lcs-lane-w="${laneW}" data-lcs-lane-h="${laneH}" data-lcs-ring-r="${RING_R}" style="position:relative;width:${w}px;height:${h}px;flex:0 0 auto">` +
    `<div data-lcs-figure data-lcs-body-h="${figureH}" style="position:absolute;left:${figX.toFixed(2)}px;top:${figY.toFixed(2)}px;width:${fig.width.toFixed(2)}px;height:${figureH}px">${fig.svg}</div>` +
    lanes.join('') + overlay + `</div>`;
  return { html, lanes: laneMeta, segments, anchors, figure: { x: figX, y: figY, w: fig.width, h: figureH, midX }, laneOrder, regions: fig.regions };
}

/** The word bank: components-b2 wordBank with data-lcs-bank="<id>" per word. */
function bodyLabelBank({ words, wordPx = 18 }) {
  return wordBank({ words: words.map((w) => ({ word: w.word, vocabKey: w.id })), wordPx });
}

module.exports = { bodyLabelStage, bodyLabelBank, bodyLeaderSweep, BODY_LANE_HINT: LANE_HINT, BODY_RING_R: RING_R, BODY_FOREIGN_RING_PX: FOREIGN_RING_PX };
