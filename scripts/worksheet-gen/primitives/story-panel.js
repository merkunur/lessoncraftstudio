/**
 * story-panel.js — the K-379 `story-sequencing` picture cards (nt5-F), pure SVG
 * on primitives/_tokens.js. Design: docs/worksheet-gen/b6-designs/
 * K-379-story-sequencing.md §2 "NEW primitives/story-panel.js" + the story bank.
 *
 *   storyPanel({ story, rank, w, frame = true })
 *       -> { svg, width: w, height: 0.75 * w, meta: { story, rank, setKind,
 *            irr, occluded, carrierMinPx } }
 *       story = a bank id (COMMON.stories of data/b6/story-sequencing.js) or a
 *       story OBJECT (the gate's poison seam). rank = the panel's rank in the
 *       story (1-based). w >= MIN_W (100) or it THROWS.
 *   setOnly({ story, w })       the stage alone (reserved; unused at d2)
 *   STORY_IDS, MIN_W, VIEW_W, VIEW_H, opBBox(op), opPoints(op), strokePx(sw, w)
 *
 * viewBox 0 0 160 120 (4:3). Two layers:
 *   <g data-lcs-set>   the stage: BYTE-IDENTICAL across every panel of a story
 *                      (it carries no rank, no id), pale fills + grid 1.5 px.
 *   <g data-lcs-prop data-lcs-rank=k>  everything that changes; each counted
 *                      irreversible part carries data-irr="<var>".
 * Strokes are declared in PAGE PX by the bank and converted here to units
 * (px * 160 / w), so a 3 px outline is 3 px at every card size; the prop
 * outline drops to 2.5 px below 110 px. The frame is teal 2 px. No <text>, no
 * letters, no digits, no faces anywhere (the walker is road-pictogram.js's
 * faceless silhouette). Colour ids are TOKEN NAMES in the bank; an unknown name
 * throws (the qa/lints.js palette lint is the page-side backstop).
 * Gate: qa/verify-b6-story-panel.js (render-measuring).
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { glyphGroup } = require('./road-pictogram.js');

const VIEW_W = 160, VIEW_H = 120, MIN_W = 100;
const HEX = { ...tokens.color, ...tokens.codeColors };
const fmt = (n) => (Math.round(n * 1000) / 1000).toString();

function hex(name) {
  if (name == null || name === 'none') return 'none';
  if (!HEX[name]) throw new Error(`story-panel: unknown colour token "${name}"`);
  return HEX[name];
}
/** A stroke width in page px -> viewBox units at panel width w (the prop outline 3 -> 2.5 below 110 px). */
function strokePx(sw, w) { return sw === 3 && w < 110 ? 2.5 : sw; }
const toUnits = (px, w) => px * VIEW_W / w;

let _bank = null;
function bankCommon() {
  if (!_bank) _bank = require('../data/b6/story-sequencing.js').COMMON;
  return _bank;
}
function storyById(id) {
  const s = bankCommon().stories.find((x) => x.id === id);
  if (!s) throw new Error(`story-panel: unknown story "${id}"`);
  return s;
}
const STORY_IDS = () => bankCommon().stories.map((s) => s.id);

/* ---------------------------------------------------------------- geometry (the gate + meta share it) */
function parseTf(tf) {
  // returns a 2x3 matrix [a b c d e f] for translate / rotate(a [cx cy]) / scale(s [sy]) sequences
  let m = [1, 0, 0, 1, 0, 0];
  const mul = (A, B) => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];
  for (const [, fn, args] of String(tf || '').matchAll(/(translate|rotate|scale)\(([^)]*)\)/g)) {
    const a = args.split(/[\s,]+/).filter(Boolean).map(Number);
    if (fn === 'translate') m = mul(m, [1, 0, 0, 1, a[0] || 0, a[1] || 0]);
    else if (fn === 'scale') m = mul(m, [a[0], 0, 0, a.length > 1 ? a[1] : a[0], 0, 0]);
    else {
      const t = a[0] * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
      const cx = a[1] || 0, cy = a[2] || 0;
      m = mul(m, [1, 0, 0, 1, cx, cy]); m = mul(m, [c, s, -s, c, 0, 0]); m = mul(m, [1, 0, 0, 1, -cx, -cy]);
    }
  }
  return m;
}
const apply = (m, [x, y]) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];

/** Sample an SVG path (absolute M L H V Q C A Z + relative h v l) into points. */
function pathPoints(d) {
  const toks = String(d).match(/[MLHVQCAZmlhvz]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  const out = []; let i = 0, cmd = null, cur = [0, 0], start = [0, 0];
  const num = () => +toks[i++];
  while (i < toks.length) {
    if (/[A-Za-z]/.test(toks[i])) { cmd = toks[i++]; if (/z/i.test(cmd)) { cur = start.slice(); out.push(cur); continue; } }
    if (cmd === 'M') { cur = [num(), num()]; start = cur.slice(); out.push(cur); cmd = 'L'; }
    else if (cmd === 'L') { cur = [num(), num()]; out.push(cur); }
    else if (cmd === 'l') { cur = [cur[0] + num(), cur[1] + num()]; out.push(cur); }
    else if (cmd === 'H') { cur = [num(), cur[1]]; out.push(cur); }
    else if (cmd === 'h') { cur = [cur[0] + num(), cur[1]]; out.push(cur); }
    else if (cmd === 'V') { cur = [cur[0], num()]; out.push(cur); }
    else if (cmd === 'v') { cur = [cur[0], cur[1] + num()]; out.push(cur); }
    else if (cmd === 'Q') { const c = [num(), num()], e = [num(), num()]; for (let k = 1; k <= 20; k++) { const u = k / 20; out.push([(1 - u) ** 2 * cur[0] + 2 * (1 - u) * u * c[0] + u * u * e[0], (1 - u) ** 2 * cur[1] + 2 * (1 - u) * u * c[1] + u * u * e[1]]); } cur = e; }
    else if (cmd === 'C') { const c1 = [num(), num()], c2 = [num(), num()], e = [num(), num()]; for (let k = 1; k <= 20; k++) { const u = k / 20, v = 1 - u; out.push([v ** 3 * cur[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u ** 3 * e[0], v ** 3 * cur[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u ** 3 * e[1]]); } cur = e; }
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
      for (let k = 1; k <= 24; k++) { const th = th1 + dth * k / 24; out.push([cx + rx * Math.cos(th) * cosR - ry * Math.sin(th) * sinR, cy + rx * Math.cos(th) * sinR + ry * Math.sin(th) * cosR]); }
      cur = [x2, y2];
    } else i++;
  }
  return out;
}
/** The geometry of one op as sample points (in the op's parent space), transforms applied. */
function opPoints(op) {
  let P = [];
  const ring = (cx, cy, rx, ry) => { for (let k = 0; k < 48; k++) { const t = k / 48 * 2 * Math.PI; P.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); } };
  switch (op.k) {
    case 'rect': P = [[op.x, op.y], [op.x + op.w, op.y], [op.x, op.y + op.h], [op.x + op.w, op.y + op.h]]; break;
    case 'circle': ring(op.cx, op.cy, op.r, op.r); break;
    case 'ellipse': ring(op.cx, op.cy, op.rx, op.ry); break;
    case 'path': P = pathPoints(op.d); break;
    case 'line': P = [[op.x1, op.y1], [op.x2, op.y2]]; break;
    case 'poly': P = op.pts.map((q) => q.slice()); break;
    case 'g': P = op.children.flatMap(opPoints); break;
    case 'walker': { const s = op.h / 100; P = [[op.x - 20 * s, op.y - 94 * s], [op.x + 20 * s, op.y]]; break; }
    default: throw new Error(`story-panel: unknown op kind "${op.k}"`);
  }
  let tf = op.tf || '';
  if (op.rot && op.k === 'ellipse') tf = `rotate(${op.rot} ${op.cx} ${op.cy}) ` + tf;
  if (op.rot && op.k === 'rect') tf = `rotate(${op.rot} ${op.rcx != null ? op.rcx : op.x + op.w / 2} ${op.rcy != null ? op.rcy : op.y + op.h / 2}) ` + tf;
  if (tf) { const m = parseTf(tf); P = P.map((q) => apply(m, q)); }
  return P;
}
function opBBox(op) {
  if (op.bbox) return { x0: op.bbox[0], y0: op.bbox[1], x1: op.bbox[2], y1: op.bbox[3], w: op.bbox[2] - op.bbox[0], h: op.bbox[3] - op.bbox[1] };
  const P = opPoints(op);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of P) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}
/** Every op with an `irr` (descending into groups): [{op, irr}]. */
function irrOps(ops) {
  const out = [];
  const walk = (list) => { for (const op of list) { if (op.irr) out.push(op); if (op.k === 'g' && !op.irr) walk(op.children); } };
  walk(ops);
  return out;
}

/* ---------------------------------------------------------------- render */
function renderOp(op, ctx) {
  const w = ctx.w;
  const a = {};
  if (op.fill !== undefined && op.k !== 'g' && op.k !== 'walker') a.fill = hex(op.fill);
  else if (op.k !== 'g' && op.k !== 'walker' && op.k !== 'line') a.fill = 'none';
  if (op.st) { a.stroke = hex(op.st); a['stroke-width'] = fmt(toUnits(strokePx(op.sw == null ? 1.5 : op.sw, w), w)); }
  if (op.cap) a['stroke-linecap'] = op.cap;
  if (op.join) a['stroke-linejoin'] = op.join;
  if (op.dash) a['stroke-dasharray'] = op.dash;
  if (op.irr) a['data-irr'] = op.irr;
  let tf = op.tf || '';
  if (op.rot && op.k === 'ellipse') tf = `rotate(${op.rot} ${op.cx} ${op.cy})` + (tf ? ' ' + tf : '');
  if (op.rot && op.k === 'rect') tf = `rotate(${op.rot} ${op.rcx != null ? op.rcx : op.x + op.w / 2} ${op.rcy != null ? op.rcy : op.y + op.h / 2})` + (tf ? ' ' + tf : '');
  if (tf) a.transform = tf;
  switch (op.k) {
    case 'rect': return el('rect', { x: fmt(op.x), y: fmt(op.y), width: fmt(op.w), height: fmt(op.h), rx: op.rx != null ? fmt(op.rx) : undefined, ...a });
    case 'circle': return el('circle', { cx: fmt(op.cx), cy: fmt(op.cy), r: fmt(op.r), ...a });
    case 'ellipse': return el('ellipse', { cx: fmt(op.cx), cy: fmt(op.cy), rx: fmt(op.rx), ry: fmt(op.ry), ...a });
    case 'path': return el('path', { d: op.d, ...a });
    case 'line': return el('line', { x1: fmt(op.x1), y1: fmt(op.y1), x2: fmt(op.x2), y2: fmt(op.y2), ...a });
    case 'poly': return el(op.open ? 'polyline' : 'polygon', { points: op.pts.map(([x, y]) => fmt(x) + ',' + fmt(y)).join(' '), ...a });
    case 'g': {
      // mask: the op's shape (fill + a stroke 1.5 px wider than the food outline) limits what the group paints,
      // so a white bite disc erases the food and its outline but never the stage or a neighbour.
      let pre = '';
      if (op.mask) {
        const id = ctx.idBase + '-m' + (ctx.n++);
        const m = { ...op.mask, fill: 'white', st: 'white', sw: (op.mask.sw || 3) + 1.5, irr: undefined, tf: op.mask.tf };
        pre = el('mask', { id }, renderOp(m, ctx));
        a.mask = 'url(#' + id + ')';
      }
      return pre + el('g', a, op.children.map((c) => renderOp(c, ctx)));
    }
    case 'walker': {
      const s = op.h / 100;
      const g = glyphGroup({ pose: op.pose });
      return el('g', { transform: `translate(${fmt(op.x - 50 * s)} ${fmt(op.y - 94 * s)}) scale(${fmt(s)})`, ...(op.irr ? { 'data-irr': op.irr } : {}) }, g);
    }
    default: throw new Error(`story-panel: unknown op kind "${op.k}"`);
  }
}
function renderLayer(ops, ctx) { return ops.map((o) => renderOp(o, ctx)).join(''); }

function bankBackdrop(kind, T) { const m = require('../data/b6/story-sequencing.js'); return m.backdrop ? m.backdrop(kind, T) : []; }
function resolveStory(story) { return typeof story === 'string' ? storyById(story) : story; }

/**
 * The story's VIEW WINDOW for a card of aspect 160 : vh (lead review 2026-09-23: "make the story the hero").
 * vh = 120 is the full 4:3 art (no zoom; the primitive gate calibrates there). A taller card ZOOMS IN on the
 * union of every panel's prop (padded 9 units), so the thing that changes fills the card; the window is the
 * SAME for every panel of the story (the stage stays byte-identical), clamped inside the 160-wide art and
 * never below its ground (y <= 120). Where the window rises above y 0 the stage's backdrop continues.
 */
const _win = new Map();
function viewWindow(s, vh) {
  if (vh === VIEW_H) return { x0: 0, y0: 0, w: VIEW_W, h: VIEW_H };
  const key = s.id + '|' + vh;
  if (typeof s.id === 'string' && _win.has(key) && _win.get(key).src === s) return _win.get(key).win;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const pn of s.panels) for (const op of pn.prop) { const bb = opBBox(op); x0 = Math.min(x0, bb.x0); y0 = Math.min(y0, bb.y0); x1 = Math.max(x1, bb.x1); y1 = Math.max(y1, bb.y1); }
  const pad = 9;
  x0 = Math.max(0, x0 - pad); x1 = Math.min(VIEW_W, x1 + pad); y0 -= pad; y1 += pad;
  const aspect = vh / VIEW_W;                                   // h / w of the card
  let W = Math.min(VIEW_W, Math.max(x1 - x0, (y1 - y0) / aspect, 96));
  const H = W * aspect;
  let wx = Math.min(Math.max((x0 + x1) / 2 - W / 2, 0), VIEW_W - W);
  let wy = (y0 + y1) / 2 - H / 2;
  if (wy + H > VIEW_H) wy = VIEW_H - H;
  const win = { x0: Math.round(wx * 100) / 100, y0: Math.round(wy * 100) / 100, w: Math.round(W * 100) / 100, h: Math.round(H * 100) / 100 };
  _win.set(key, { src: s, win });
  return win;
}

/**
 * vh (view height, default 120 = the 4:3 card): a taller card zooms in on the story (viewWindow). uid
 * disambiguates clip / mask ids when one page shows the same panel twice (F2's regression foil).
 */
/**
 * Set ops cut to the view window (a zoomed card): a clip-path hides what lies outside, but the page lints
 * measure the UNCLIPPED geometry (a 160-wide table band overflowed the page from an edge card). Axis-aligned
 * rects and lines are intersected with the window; any other set op wholly outside it is dropped; one that
 * straddles it is kept (none does in the bank; the family gate's lints would catch it).
 */
function cropToWindow(ops, win) {
  const X0 = win.x0, Y0 = win.y0, X1 = win.x0 + win.w, Y1 = win.y0 + win.h;
  const out = [];
  for (const op of ops) {
    const bb = opBBox(op);
    if (bb.x1 < X0 || bb.x0 > X1 || bb.y1 < Y0 || bb.y0 > Y1) continue;
    if (op.k === 'rect' && !op.rot && !op.tf) {
      const x = Math.max(op.x, X0), y = Math.max(op.y, Y0), x2 = Math.min(op.x + op.w, X1), y2 = Math.min(op.y + op.h, Y1);
      out.push({ ...op, x, y, w: x2 - x, h: y2 - y });
    } else if (op.k === 'line' && !op.tf && (op.y1 === op.y2 || op.x1 === op.x2)) {
      out.push(op.y1 === op.y2 ? { ...op, x1: Math.max(Math.min(op.x1, op.x2), X0), x2: Math.min(Math.max(op.x1, op.x2), X1) } : { ...op, y1: Math.max(Math.min(op.y1, op.y2), Y0), y2: Math.min(Math.max(op.y1, op.y2), Y1) });
    } else out.push(op);
  }
  return out;
}

function storyPanel({ story, rank, w, frame = true, vh = VIEW_H, uid = '', data = {} } = {}) {
  if (!(w >= MIN_W)) throw new Error(`story-panel: w ${w} < MIN_W ${MIN_W} (a carrier would fall under 5 px)`);
  if (!(vh >= VIEW_H)) throw new Error(`story-panel: vh ${vh} < ${VIEW_H}`);
  const s = resolveStory(story);
  if (!s || !Array.isArray(s.panels)) throw new Error('story-panel: no story');
  const p = s.panels.find((x) => x.rank === rank);
  if (!p) throw new Error(`story-panel: story "${s.id}" has no rank ${rank}`);
  const h = w * vh / VIEW_W;
  const win = viewWindow(s, vh);
  const unitW = win.w;                                          // units across the card: strokes convert with it
  const fw = 2 * unitW / w;
  const tag = `${s.id}-${rank}-${Math.round(w)}-${vh}${uid ? '-' + uid : ''}`;
  const clipId = `ss-clip-${tag}`;
  const back = vh === VIEW_H ? [] : bankBackdrop(s.setKind, win);
  const ctx = (b) => ({ w: w * VIEW_W / unitW, idBase: b, n: 0 });   // renderOp converts px with (px * 160 / w)
  const set = el('g', { 'data-lcs-set': '1' }, renderLayer(back, ctx('ss-bd-' + tag)) + renderLayer(vh === VIEW_H ? s.set : cropToWindow(s.set, win), ctx('ss-set-' + tag)));
  const prop = el('g', { 'data-lcs-prop': '1', 'data-lcs-rank': rank }, renderLayer(p.prop, ctx('ss-' + tag)));
  // frame:false (the page draws a CSS frame that grows with its row): no inset, no white margin ring
  const inset = frame ? 3 * unitW / VIEW_W : 0, r = frame ? 10 * unitW / VIEW_W : 0;
  const parts = [
    el('defs', {}, el('clipPath', { id: clipId }, el('rect', { x: fmt(win.x0 + inset), y: fmt(win.y0 + inset), width: fmt(win.w - 2 * inset), height: fmt(win.h - 2 * inset), rx: fmt(r * 0.8) }))),
    el('rect', { x: fmt(win.x0), y: fmt(win.y0), width: fmt(win.w), height: fmt(win.h), rx: fmt(r), fill: HEX.white }),
    el('g', { 'clip-path': `url(#${clipId})` }, set + prop),
  ];
  if (frame) parts.push(el('rect', { x: fmt(win.x0 + fw / 2), y: fmt(win.y0 + fw / 2), width: fmt(win.w - fw), height: fmt(win.h - fw), rx: fmt(r), fill: 'none', stroke: HEX.teal, 'stroke-width': fmt(fw), 'data-lcs-frame': '1' }));
  const extra = { style: 'display:block', 'data-lcs-story-panel': '1', 'data-lcs-story': s.id, 'data-lcs-rank': rank, 'data-lcs-setkind': s.setKind };
  for (const [k, v] of Object.entries(data)) extra['data-lcs-' + k] = v;
  const svg = svgRoot({ width: fmt(w), height: fmt(h), viewBox: `${fmt(win.x0)} ${fmt(win.y0)} ${fmt(win.w)} ${fmt(win.h)}`, label: '' }, parts.join(''), extra);
  const carriers = irrOps(p.prop).map((o) => { const bb = opBBox(o); return Math.min(bb.w, bb.h); });
  return {
    svg, width: w, height: h, window: win,
    meta: { story: s.id, rank, setKind: s.setKind, irr: { ...p.irr }, occluded: { ...(p.occluded || {}) }, zoom: VIEW_W / unitW, carrierMinPx: carriers.length ? Math.min(...carriers) * w / unitW : null },
  };
}

function setOnly({ story, w }) {
  if (!(w >= MIN_W)) throw new Error(`story-panel: w ${w} < MIN_W ${MIN_W}`);
  const s = resolveStory(story);
  const h = w * VIEW_H / VIEW_W;
  return { svg: svgRoot({ width: fmt(w), height: fmt(h), viewBox: `0 0 ${VIEW_W} ${VIEW_H}`, label: '' }, el('rect', { x: 0, y: 0, width: VIEW_W, height: VIEW_H, rx: 10, fill: HEX.white }) + el('g', { 'data-lcs-set': '1' }, renderLayer(s.set, { w, idBase: 'ss-seto-' + s.id, n: 0 })), { style: 'display:block' }), width: w, height: h };
}

module.exports = { viewWindow, storyPanel, setOnly, STORY_IDS, MIN_W, VIEW_W, VIEW_H, opBBox, opPoints, irrOps, strokePx, pathPoints, storyById };
