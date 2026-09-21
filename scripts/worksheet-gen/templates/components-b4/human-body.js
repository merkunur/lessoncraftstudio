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
 * FACES (Phase 2, 2026-09-21): bodyCountCard (F1) · bodyColorLegend + bodyArrowGlyph (F2) ·
 * bodySpellRow (F3) · bodyMissingCard (F4) · bodyPairCard (F5) — see each JSDoc below;
 * the spec composes + stamps + guards, these only draw.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, el, line, circle, esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { bodyFigure, ANCHORS, OWN_REGIONS, LABEL_MIN_H } = require('../../primitives/body-figure.js');
const { aboutMePlaceLanes: placeLanes } = require('../components-b3.js');
const { wordBank, letterBoxes } = require('../components-b2.js');
const { blankNumeralBox } = require('../components-b3/ordinal-numbers.js');

const T = tokens.color;
const F = tokens.font;
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

/* ================================================================ FACES (Phase 2, 2026-09-21) — design §2 list + §3
 * Every face component is pure markup on the tokens; the SPEC composes, stamps and
 * guards (types/k/K-354-human-body.js _buildFace). Sizes are the design's d2 numbers
 * unless a comment says why they differ (each difference measured in _work/K-354-faces.md).
 */
const FACE_LABEL_PX = 18;

/** A 14 px arrow glyph in T.grid (the F2 legend's "colour -> part" joiner; no text). */
function bodyArrowGlyph(size = 14) {
  const m = size / 2;
  return svgRoot({ width: size, height: size, label: '' },
    line({ x1: 1.5, y1: m, x2: size - 4, y2: m, strokeColor: T.grid, strokeWidth: 2.5, cap: 'round' }) +
    el('path', { d: `M ${size - 6.5} ${m - 4.5} L ${size - 1.5} ${m} L ${size - 6.5} ${m + 4.5}`, fill: 'none', stroke: T.grid, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    { 'aria-hidden': 'true', 'data-lcs-arrow': '', style: 'flex:0 0 auto' });
}

/**
 * bodyCountCard({ n, id, src, label, count, pic=72, boxW=68, boxH=56, labelPx=18 })
 *   F1 "How Many?" — ONE `.ws-card` (cream, badge numeral n): `[cue picture pic][6][fact
 *   label Nunito 800 labelPx, a 2-line reserve][8][blankNumeralBox boxW x boxH]`, the
 *   column centred in the card so a taller grid row (rows minmax(214px,1fr) fill the
 *   body) shares its slack above and below the content. Stamps data-lcs-fact="<id>"
 *   data-lcs-count="<n>" on the card (the count is a FACT of the child's body, never
 *   printed); the box stamps data-lcs-answer="" (blankNumeralBox, never answerBox).
 */
function bodyCountCard({ n, id, src, label, count, pic = 72, boxW = 68, boxH = 56, labelPx = FACE_LABEL_PX }) {
  const lh = Math.round(labelPx * 1.22);
  return `<section class="ws-card" data-lcs-fact="${esc(id)}" data-lcs-count="${esc(count)}" style="align-items:center;justify-content:center;gap:0">` +
    (n != null ? `<span class="ws-card-badge">${n}</span>` : '') +
    `<img class="ws-icon" src="${esc(src)}" data-lcs-cue="${esc(id)}" style="width:${pic}px;height:${pic}px;flex:0 0 ${pic}px">` +
    `<span data-lcs-fact-label style="display:flex;align-items:center;justify-content:center;text-align:center;width:100%;min-height:${2 * lh}px;margin-top:6px;` +
    `font-family:${F.body},sans-serif;font-weight:800;font-size:${labelPx}px;line-height:${lh}px;color:${T.ink}">${esc(label)}</span>` +
    `<span style="display:block;margin-top:8px;flex:0 0 auto">${blankNumeralBox({ w: boxW, h: boxH })}</span>` +
    `</section>`;
}

/**
 * bodyColorLegend({ entries:[{id, color, colorHex, colorWord, partWord}], rowW=374, rowH=48, swatch=26, wordPx=18, gap=12, h })
 *   F2 "Colour by Legend" — a column (h high when given: the rows SHARE that height,
 *   flex 1 1 0 with rowH as the minimum) of white rows (r 12, border 2 creamDeep):
 *   `[swatch (r 6, ink 1 stroke)][12][colour word Nunito 800][arrow][part word]`, the
 *   text wrapping to a second line inside a tall row when the locale needs it. Two SEPARATE literals per row
 *   (COLOR_WORDS[loc][key] and the part word: the locale's PLURAL for a class the body
 *   has two of, its SINGULAR for head / hair); the code never joins them into one string.
 *   Row stamps data-lcs-legend="<id>" data-lcs-color="<key>"; the swatch
 *   data-lcs-swatch, the words data-lcs-colorword / data-lcs-partword.
 */
function bodyColorLegend({ entries, rowW = 374, rowH = 48, swatch = 26, wordPx = FACE_LABEL_PX, gap = 12, h }) {
  // with `h` the rows SHARE the column height (flex 1 1 0, min rowH) — a colouring key a K child reads across the room;
  // the text block wraps so a long locale ("vaaleanpunainen" / "-> käsivarret") takes two lines inside its tall row
  const arrowPx = Math.max(14, Math.round(wordPx * 0.7));
  const rows = entries.map((e) =>
    `<div data-lcs-legend="${esc(e.id)}" data-lcs-color="${esc(e.color)}" style="display:flex;align-items:center;gap:12px;width:${rowW}px;${h ? `flex:1 1 0;min-height:${rowH}px` : `height:${rowH}px;flex:0 0 ${rowH}px`};padding:0 14px;` +
    `background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px;min-width:0">` +
    svgRoot({ width: swatch, height: swatch, label: '' }, el('rect', { x: 0.5, y: 0.5, width: swatch - 1, height: swatch - 1, rx: 6, ry: 6, fill: e.colorHex, stroke: T.ink, 'stroke-width': 1 }), { 'aria-hidden': 'true', 'data-lcs-swatch': e.color, style: 'flex:0 0 auto' }) +
    `<span data-lcs-legend-text style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;min-width:0;line-height:1.2">` +
    `<span data-lcs-colorword style="font-family:${F.body},sans-serif;font-weight:800;font-size:${wordPx}px;color:${T.ink};white-space:nowrap">${esc(e.colorWord)}</span>` +
    `<span style="display:inline-flex;align-items:center;gap:10px;white-space:nowrap">` + bodyArrowGlyph(arrowPx) +
    `<span data-lcs-partword style="font-family:${F.body},sans-serif;font-weight:800;font-size:${wordPx}px;color:${T.ink};white-space:nowrap">${esc(e.partWord)}</span></span>` +
    `</span></div>`).join('');
  return `<div data-lcs-legend-column style="display:flex;flex-direction:column;justify-content:center;gap:${gap}px;width:${rowW}px;flex:0 0 ${rowW}px${h ? `;height:${h}px` : ''}">${rows}</div>`;
}

/**
 * bodySpellRow({ n, id, len, box=44, gap=4, chip=44, numeralPx=26 })
 *   F3 "Write the Word" — ONE numbered BLOCK: the `.ws-chip` row numeral (Baloo 2 700
 *   numeralPx) ABOVE letterBoxes({n:len, box, gap}), left-aligned, 4 px apart; block
 *   height chip + 4 + box + 2. (The design's inline `[chip][10][boxes]` row bound the
 *   figure to h 423 beside an 8-letter row and left ~300 px of blank paper under a
 *   464 px stage; stacking the numeral over the boxes frees 54 px of row width, so
 *   the figure grows to 520 and six blocks fill 624 px — measured in _work/K-354-faces.md.)
 *   The WORD is never printed: the block stamps data-lcs-spell="<id>" data-lcs-n="<n>"
 *   and letterBoxes stamps data-lcs-letterboxes="<len>" (the box count is the only scaffold).
 */
function bodySpellRow({ n, id, len, box = 44, gap = 4, chip = 44, numeralPx = 26 }) {
  const h = chip + 4 + box + 2;
  return `<div data-lcs-spell="${esc(id)}" data-lcs-n="${n}" style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;height:${h}px;flex:0 0 ${h}px">` +
    `<span class="ws-chip" data-lcs-row-n="${n}" style="width:${chip}px;height:${chip}px;padding:0;font-size:${numeralPx}px;color:${T.teal};flex:0 0 ${chip}px">${n}</span>` +
    `<span style="display:inline-flex;align-items:center;flex:0 0 auto">${letterBoxes({ n: len, box, gap })}</span>` +
    `</div>`;
}

/**
 * bodyMissingCard({ hidden, side, figureH=300, chips:[{id, src, correct}], chip=80, pic=64, gapX=16, gapY=16 })
 *   F4 "What Is Missing?" — the INNER of a `.ws-card` (cardGrid supplies the card +
 *   badge): `[bodyFigure h figureH, fill white, hide:[<class>-<side>|hair]][gapX]
 *   [column of chips: white chip x chip r 14 border 2 creamDeep holding a pic px
 *   .ws-icon, gap gapY]`, the pair centred. No text on the item. Stamps
 *   data-lcs-missing="<class>" data-lcs-missing-side on the item; each chip
 *   data-lcs-chip="<id>" data-lcs-correct="1|0" (the ONLY answer stamp, never
 *   rendered — every chip looks the same). Returns { html, figure }.
 */
function bodyMissingCard({ hidden, side, figureH = 300, chips, chip = 80, pic = 64, gapX = 16, gapY = 16 }) {
  const hide = hidden === 'hair' ? ['hair'] : [hidden + '-' + side];
  const fig = bodyFigure({ h: figureH, fill: 'white', hide });
  const col = chips.map((c) =>
    `<span data-lcs-chip="${esc(c.id)}" data-lcs-correct="${c.correct ? 1 : 0}" style="display:inline-flex;align-items:center;justify-content:center;width:${chip}px;height:${chip}px;` +
    `background:${T.white};border:2px solid ${T.creamDeep};border-radius:14px;flex:0 0 ${chip}px"><img class="ws-icon" src="${esc(c.src)}" style="width:${pic}px;height:${pic}px"></span>`).join('');
  const html = `<div data-lcs-missing="${esc(hidden)}" data-lcs-missing-side="${esc(side || '')}" ` +
    `style="display:flex;align-items:center;justify-content:center;gap:${gapX}px;flex:1 1 auto;min-height:0">` +
    `<span data-lcs-figure data-lcs-body-h="${figureH}" style="display:block;width:${fig.width.toFixed(2)}px;height:${figureH}px;flex:0 0 auto">${fig.svg}</span>` +
    `<span data-lcs-chips style="display:flex;flex-direction:column;gap:${gapY}px;flex:0 0 auto">${col}</span>` +
    `</div>`;
  return { html, figure: fig };
}

/**
 * bodyPairCard({ id, src, word, pair, pic=88, wordPx=18 })
 *   F5 "Which Come in Twos?" — ONE `.ws-card` (cream, NO badge): the picture ABOVE the
 *   SINGULAR word (a column; the design's `[pic 64][10][word]` row grew into a column
 *   so the card fills a body-filling grid row without air — measured in the record).
 *   Stamps data-lcs-pair-card="<id>" data-lcs-pair="1|0" (the fact; never printed).
 */
function bodyPairCard({ id, src, word, pair, pic = 88, wordPx = FACE_LABEL_PX }) {
  return `<section class="ws-card" data-lcs-pair-card="${esc(id)}" data-lcs-pair="${pair ? 1 : 0}" style="align-items:center;justify-content:center;gap:6px">` +
    `<img class="ws-icon" src="${esc(src)}" data-lcs-pic="${esc(id)}" style="width:${pic}px;height:${pic}px;flex:0 0 ${pic}px">` +
    `<span data-lcs-pair-word style="display:block;max-width:100%;text-align:center;font-family:${F.body},sans-serif;font-weight:800;font-size:${wordPx}px;line-height:1.2;color:${T.ink};white-space:nowrap">${esc(word)}</span>` +
    `</section>`;
}

module.exports = { bodyLabelStage, bodyLabelBank, bodyLeaderSweep, BODY_LANE_HINT: LANE_HINT, BODY_RING_R: RING_R, BODY_FOREIGN_RING_PX: FOREIGN_RING_PX,
  bodyCountCard, bodyColorLegend, bodyArrowGlyph, bodySpellRow, bodyMissingCard, bodyPairCard };
