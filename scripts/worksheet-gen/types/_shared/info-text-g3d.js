/**
 * info-text-g3d.js — two Grade 3 pages on a text read TOGETHER WITH A GRAPHIC (English literacy year, Daily Teaching
 * System Part 12.3, 2026-11-16; unit "Reading to Learn: Informational Texts", Grade 3, lesson "Maps, diagrams, and
 * photos"; RI.3.7: use information gained from illustrations, for example maps, and the words in a text to demonstrate
 * understanding of the text: where, when, why, and how key events occur). The texts are data/literacy/info-graphics-g3.en.json
 * (`maps` and `diagrams`): three numbered paragraphs of 120 to 160 words, and ONE graphic built here from simple
 * geometry and library pictures (no drawn picture).
 *
 * THE GRAPHIC
 *   map      real places at their real latitude and longitude, projected onto a lettered grid (columns A, B, C ...,
 *            rows 1, 2, 3 ...; no place stands within 8 px of a grid line, no two places share a square, the map is
 *            stretched at most 1.33 : 1), lines (a railroad, a river, a trail, a road), areas (water, a park), a
 *            compass rose, a key, and library pictures as landmarks (a mountain range, a herd of bison). A map text
 *            never names a compass direction and never a square: those are the map's to tell.
 *   diagram  three or four steps in a row (a chain, or a cycle with an arrow back to the start), each a library
 *            picture and a name; the arrows between them. Where the diagram is the only source of a name (the
 *            science words of the water cycle, the animals of a food chain), the text never uses it.
 *
 * THE QUESTIONS — every question is answered from ONE source, and the child says which: the map (the diagram), the
 * text, or both. Graphic questions are made from the graphic itself on the map page (the square of a place, the place
 * in a square, the direction from one place to another, a symbol of the key) and come from the bank on the diagram
 * page; text questions are answered by words that the graphic does not show; a BOTH question needs one fact from each
 * (the text tells which place, the map tells its square; or the map tells which place, the text tells about it). Two
 * questions on one page never share an answer or a group (one would give the other away), and a both question never
 * stands beside a text question that names its place.
 *
 *   map      Read the Text and the Map
 *              level 1  six questions (two from the map, two from the text, two that need both): three answers to
 *                       circle, and "I found it in: the map, the text, both" to circle
 *              level 2  the same six kinds of question: the answer is written on a line, and the child puts a check
 *                       mark by the source
 *              level 3  four questions to write and check, and two places on the map show a number instead of a
 *                       name: the child names them from the text and the key
 *   diagram  Read the Text and the Diagram
 *              level 1  six questions (two from the diagram, two from the text, two that need both): circle the
 *                       answer and the source
 *              level 2  six questions: write the answer and check the source
 *              level 3  four questions to write and check, and one step of the diagram is a question mark: the child
 *                       writes what happens in that step, from the text
 *
 * Writing lines are the single-rule lines of info-text-g3.js (rule()). English only. Themeless: a copy is another
 * text and other questions. PDF only. The bank is checked when this file loads (faultsOf); no picture is looked up at
 * load (fileUri runs inside build()).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/info-graphics-g3.en.json');
const { placesFor, _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;
const { _parts3 } = require('./info-text-g3.js');
const { rule, cream, label, num } = _parts3;

/* ------------------------------------------------------------------ words */
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const core = (s) => norm(s).replace(/^(a|an|the)\s+/, '');
const has = (hay, needle) => (' ' + norm(hay) + ' ').includes(' ' + norm(needle) + ' ');
/** a cue of a question stands in the text as it is or in its plural (herbivore: herbivores) */
const hasForm = (hay, needle) => has(hay, needle) || has(hay, needle + 's') || has(hay, needle + 'es');
/** 'North America' names a continent, not a direction: the one exemption of the compass rule */
const noContinent = (s) => String(s).replace(/North America|South America/g, '');
const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const textOf = (t) => t.parts.map((p) => p.join(' ')).join(' ');
const COMPASS = /\b(north|south|east|west|northern|southern|eastern|western|northeast|northwest|southeast|southwest)\b/i;
const GRIDREF = /\b[A-H][1-9]\b/;
const LETTERS = 'ABCDEFGH';
const SRC = ['graphic', 'text', 'both'];

/* ------------------------------------------------------------------ the map's geometry (Node AND the gates) */
function project(m, [lat, lon]) {
  const [lo0, lo1, la0, la1] = m.bbox;
  return { x: (lon - lo0) / (lo1 - lo0) * m.gw, y: (la1 - lat) / (la1 - la0) * m.gh };
}
function cellOf(m, at) {
  const { x, y } = project(m, at), cw = m.gw / m.cols, ch = m.gh / m.rows;
  const c = Math.floor(x / cw), r = Math.floor(y / ch);
  return { cell: LETTERS[c] + (r + 1), c, r, margin: Math.min(x - c * cw, (c + 1) * cw - x, y - r * ch, (r + 1) * ch - y), x, y };
}
const stretch = (m) => { const [lo0, lo1, la0, la1] = m.bbox, mid = (la0 + la1) / 2; return (m.gw / ((lo1 - lo0) * Math.cos(mid * Math.PI / 180))) / (m.gh / (la1 - la0)); };
/** the angle of a line on the map or on the earth: 0 = north, 90 = east (dx toward the east, dy toward the north) */
const bearing = (dx, dy) => (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
const offFrom = (ang, c) => Math.min(Math.abs(ang - c), 360 - Math.abs(ang - c));
const DIRS = [['north', 0], ['east', 90], ['south', 180], ['west', 270]];
/** the compass direction of place a FROM place b, or null. Asked only when a and b share a row (east, west) or a column
 *  (north, south) of the grid AND the direction lies within 12 degrees of that compass point both on the earth and on
 *  the drawn map (the reviewer, 2026-11-17: a place that lies a little to the south-east is never keyed east) */
function directionOf(m, a, b) {
  const A = cellOf(m, a.at), B = cellOf(m, b.at);
  const mid = (a.at[0] + b.at[0]) / 2;
  const real = bearing((a.at[1] - b.at[1]) * Math.cos(mid * Math.PI / 180), a.at[0] - b.at[0]);
  const drawn = bearing(A.x - B.x, B.y - A.y);
  for (const [d, c] of DIRS) {
    if (offFrom(real, c) > 12 || offFrom(drawn, c) > 12) continue;
    if ((d === 'east' || d === 'west') && A.r !== B.r) return null;
    if ((d === 'north' || d === 'south') && A.c !== B.c) return null;
    return d;
  }
  return null;
}
const mapStrings = (m) => [...m.places.flatMap((p) => (p.noLabel ? [] : [p.name, ...(p.labels || []).flat()])), ...(m.areas || []).flatMap((a) => [a.name || '', ...[].concat(a.label || [])]).filter(Boolean), ...m.key.map((k) => k.text)];
const diagramStrings = (d) => [d.name, d.note || '', ...d.stages.flatMap((s) => [s.name, ...(s.label || [])])].filter(Boolean);
const inAny = (list, needle) => list.some((s) => has(s, needle));
const placesNamedIn = (m, s) => [...m.places.map((p) => p.name), ...(m.areas || []).filter((a) => a.name).map((a) => a.name)].filter((n) => has(s, n));
/** three answers to circle fit two rows of a question card in any order (14 px Nunito 700: measured 6.3 to 7.8 px a letter, 7.3 taken; 19 px of ring and padding a pill) */
const fitsTwoRows = (opts) => { const w = opts.map((o) => o.length * 7.3 + 19).sort((a, b) => b - a); return w[0] + 6 + w[1] <= 290; };   // the two widest share a row, so no order needs a third

/* ------------------------------------------------------------------ the map's names: placed here, measured in the page */
/** the advance of every letter of a map name (Nunito 800, 13 px), measured on the page fonts 2026-11-17 */
const CW13 = { ' ': 3.627, '.': 3.38, ',': 3.38, "'": 3.328, '-': 5.72, A: 9.789, B: 9.035, C: 8.596, D: 10.063, E: 7.866, F: 7.41, G: 9.646, H: 10.141, I: 3.862, J: 4.589, K: 8.945, L: 7.449, M: 11.388, N: 9.789, O: 10.348, P: 8.632, Q: 10.348, R: 9.048, S: 8.334, T: 8.389, U: 9.659, V: 9.452, W: 14.56, X: 8.905, Y: 8.29, Z: 7.995,
  a: 7.241, b: 7.93, c: 6.091, d: 7.93, e: 7.138, f: 4.633, g: 7.995, h: 7.735, i: 3.484, j: 3.549, k: 7.255, l: 4.33, m: 11.557, n: 7.735, o: 7.657, p: 7.93, q: 7.93, r: 5.356, s: 6.396, t: 4.808, u: 7.67, v: 7.473, w: 11.724, x: 7.267, y: 7.46, z: 6.241 };
const textW = (s) => [...String(s)].reduce((w, ch) => w + (CW13[ch] != null ? CW13[ch] : 9), 0);
const LH13 = 14.1;                                                           // the line height of a name (13 px x 1.08)
const HALF = { dot: 6.5, star: 11, triangle: 8.5, diamond: 8.5, pic: 15 };   // half the size of each drawn symbol
const box = (x0, y0, x1, y1) => ({ x0, y0, x1, y1 });
const grow = (r, d) => box(r.x0 - d, r.y0 - d, r.x1 + d, r.y1 + d);
const meets = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const within = (a, b) => a.x0 >= b.x0 && a.x1 <= b.x1 && a.y0 >= b.y0 && a.y1 <= b.y1;
/** does the segment a-b cross the box? (Liang-Barsky) */
function segMeets(a, b, r) {
  let t0 = 0, t1 = 1; const dx = b.x - a.x, dy = b.y - a.y;
  for (const [p, q] of [[-dx, a.x - r.x0], [dx, r.x1 - a.x], [-dy, a.y - r.y0], [dy, r.y1 - a.y]]) {
    if (p === 0) { if (q < 0) return false; continue; }
    const t = q / p;
    if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return true;
}
const pathMeets = (pts, r, closed) => pts.some((p, i) => (i || closed) && segMeets(pts[i ? i - 1 : pts.length - 1], p, r));
function inPoly(p, pts) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const a = pts[i], b = pts[j]; if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) c = !c; } return c; }
/** a polygon cut to the map's box (Sutherland-Hodgman): a sea that reaches beyond the map ends at its edge */
function clipPoly(pts, W, H) {
  const planes = [[(p) => p.x >= 0, (a, b) => ({ x: 0, y: a.y + (0 - a.x) / (b.x - a.x) * (b.y - a.y) })], [(p) => p.x <= W, (a, b) => ({ x: W, y: a.y + (W - a.x) / (b.x - a.x) * (b.y - a.y) })],
    [(p) => p.y >= 0, (a, b) => ({ x: a.x + (0 - a.y) / (b.y - a.y) * (b.x - a.x), y: 0 })], [(p) => p.y <= H, (a, b) => ({ x: a.x + (H - a.y) / (b.y - a.y) * (b.x - a.x), y: H })]];
  let out = pts;
  for (const [inside, cut] of planes) {
    const src = out; out = [];
    src.forEach((p, i) => { const q = src[(i + src.length - 1) % src.length]; if (inside(p)) { if (!inside(q)) out.push(cut(q, p)); out.push(p); } else if (inside(q)) out.push(cut(q, p)); });
    if (!out.length) break;
  }
  return out;
}
/** a line cut to the map's box (Liang-Barsky on each piece): the pieces that stand on the map */
function clipLine(pts, W, H) {
  const pieces = [];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i], dx = b.x - a.x, dy = b.y - a.y; let t0 = 0, t1 = 1, ok = true;
    for (const [p, q] of [[-dx, a.x], [dx, W - a.x], [-dy, a.y], [dy, H - a.y]]) {
      if (p === 0) { if (q < 0) { ok = false; break; } continue; }
      const t = q / p; if (p < 0) { if (t > t1) { ok = false; break; } if (t > t0) t0 = t; } else { if (t < t0) { ok = false; break; } if (t < t1) t1 = t; }
    }
    if (!ok || t1 - t0 < 1e-9) continue;
    const P = { x: a.x + t0 * dx, y: a.y + t0 * dy }, Q = { x: a.x + t1 * dx, y: a.y + t1 * dy }, last = pieces.length && pieces[pieces.length - 1];
    if (last && Math.hypot(last[last.length - 1].x - P.x, last[last.length - 1].y - P.y) < 1e-6) last.push(Q); else pieces.push([P, Q]);
  }
  return pieces;
}
/** an area of the map in px: its outline (a rectangle, an ellipse as 48 points, or a polygon of real coordinates), cut to the map */
function areaPx(m, a) {
  const Q = (pt) => project(m, pt);
  let pts;
  if (a.shape === 'rect') { const p = Q(a.from), q = Q(a.to); let y0 = Math.min(p.y, q.y), y1 = Math.max(p.y, q.y); if (y1 - y0 < 7) { const c = (y0 + y1) / 2; y0 = c - 3.5; y1 = c + 3.5; } const x0 = Math.min(p.x, q.x), x1 = Math.max(p.x, q.x); pts = [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }]; }
  else if (a.shape === 'ellipse') { const c = Q(a.at), rx = a.r[0] / (m.bbox[1] - m.bbox[0]) * m.gw, ry = a.r[1] / (m.bbox[3] - m.bbox[2]) * m.gh; pts = Array.from({ length: 48 }, (_, k) => ({ x: c.x + rx * Math.cos(k * Math.PI / 24), y: c.y + ry * Math.sin(k * Math.PI / 24) })); }
  else pts = a.pts.map(Q);
  pts = clipPoly(pts, m.gw, m.gh);
  const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
  const bx = box(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
  return { a, pts, box: bx, cx: a.labelAt ? Q(a.labelAt).x : (bx.x0 + bx.x1) / 2, cy: a.labelAt ? Q(a.labelAt).y : (bx.y0 + bx.y1) / 2 };
}
/** the box of a name (its lines) on one side of a point whose symbol is `half` px from its centre to its edge */
function labelBox(lines, x, y, half, side) {
  const w = Math.max(...lines.map(textW)) + 2, h = lines.length * LH13, g = half + 4, d = half + 3;   // a corner name clears its symbol (and the 2 px kept free around it)
  const at = { r: [x + g, y - h / 2], l: [x - g - w, y - h / 2], t: [x - w / 2, y - g - h], b: [x - w / 2, y + g], c: [x - w / 2, y - h / 2],
    tr: [x + d, y - d - h], br: [x + d, y + d], tl: [x - d - w, y - d - h], bl: [x - d - w, y + d] }[side];
  return box(at[0], at[1], at[0] + w, at[1] + h);
}
const SIDES = ['r', 'l', 'b', 't', 'br', 'bl', 'tr', 'tl'];
/** a tall map too long to leave room for the rose and the key under it: they stand, compact, under the text */
const COMPACT = (m) => m.layout === 'tall' && m.gh > 360;
/** the key in two columns: the widest half of the entries in the first */
const keyColumns = (m) => { const k = m.key.slice().sort((a, b) => textW(b.text) - textW(a.text)), n = Math.ceil(k.length / 2); return [k.slice(0, n), k.slice(n)]; };
/** an area with a drawn outline (water); a park is a fill without one */
const OUTLINED = (a) => a.fill !== 'park';
const BADGE = 24;
const LAYOUTS = new WeakMap();
/**
 * The map laid out in px (the reviewer, 2026-11-17: a name across a grid line made "which square" unreadable):
 *   - every place in its own square, its symbol 8 px or more from every grid line (a picture wholly inside its square);
 *   - every name WHOLLY inside the square of its symbol, 8 px or more from every grid line, touching no line of the map,
 *     no outline, no symbol and no other name; a long name breaks over two lines (the bank gives the breaks to try);
 *   - every area name inside one square (inside its area clear of the outline, or beside it);
 *   - a level-3 number (24 px) beside each place and inside each named area, by the same rules;
 *   - no empty row and no empty column.
 * Returns { places, labels, badges, areas, lines, areaCells, faults }. The page draws from it, and the page's check
 * measures the same rules on the rendered boxes.
 */
function layoutMap(m) {
  if (LAYOUTS.has(m)) return LAYOUTS.get(m);
  const f = [], cw = m.gw / m.cols, ch = m.gh / m.rows;
  const cellBox = (c, r) => box(c * cw, r * ch, (c + 1) * cw, (r + 1) * ch);
  const inner = (b) => grow(b, -8);
  const cellAt = (b) => { const c = Math.floor(((b.x0 + b.x1) / 2) / cw), r = Math.floor(((b.y0 + b.y1) / 2) / ch); return { c, r, cell: LETTERS[c] + (r + 1), box: cellBox(c, r) }; };
  // a line on the map; a river that flows in from beyond the map (offMap) is cut at the edge, and must stay ONE piece
  const lines = (m.lines || []).map((ln) => { const P = clipLine(ln.pts.map((pt) => project(m, pt)), m.gw, m.gh); if (P.length !== 1) f.push(`a ${ln.style} line is not one piece on the map`); return P[0] || []; });
  const areas = (m.areas || []).map((a) => areaPx(m, a));
  const places = m.places.map((p) => { const c = cellOf(m, p.at), h = HALF[p.sym] || 8; return { p, ...c, half: h, sym: box(c.x - h, c.y - h, c.x + h, c.y + h), cbox: cellBox(c.c, c.r) }; });
  const labels = [], badges = {};
  // an area blocks a name when the name crosses its outline (a park has none: a name may stand on its grass), or when
  // the name stands inside an area that has a name of its own (a lake); a name of an area may stand inside that area
  const areaName = (a) => a.name || (a.label ? [].concat(a.label).join(' ') : null);
  const free = (b, own) => !places.some((q) => meets(grow(q.sym, 2), b)) && !labels.some((l) => l.name !== own && meets(grow(l.box, 3), b)) &&
    !lines.some((pts) => pathMeets(pts, grow(b, 2), false)) &&
    !areas.some((A) => (own && areaName(A.a) === own) ? false : ((OUTLINED(A.a) && pathMeets(A.pts, grow(b, 2), true)) || (A.a.name && inPoly({ x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 }, A.pts))));
  const inOneSquare = (b) => within(b, inner(cellAt(b).box));
  // area names first: wholly inside the area clear of its outline, or beside it; always inside one square
  areas.forEach((A) => {
    const a = A.a; if (!a.label) return;
    const v = [].concat(a.label), name = a.name || v.join(' ');
    const tries = [];
    const inside = labelBox(v, A.cx, A.cy, 0, 'c');
    if (!pathMeets(A.pts, grow(inside, 3), true) && inPoly({ x: A.cx, y: A.cy }, A.pts)) tries.push(['c', inside]);
    // beside the area: under it or over it at five places along it, or at its ends
    const cx = (A.box.x0 + A.box.x1) / 2, cy = (A.box.y0 + A.box.y1) / 2, hw = (A.box.x1 - A.box.x0) / 2, hh = (A.box.y1 - A.box.y0) / 2;
    for (const sd of a.sides || ['b', 't', 'r', 'l']) {
      if (sd === 'b' || sd === 't') for (const fr of [0, -0.4, 0.4, -0.7, 0.7]) tries.push([sd, labelBox(v, cx + fr * hw, cy, hh, sd)]);
      else tries.push([sd, labelBox(v, cx, cy, hw, sd)]);
    }
    // ... in a square that holds part of the area (a lake's name never stands in a square the lake is not in)
    const ofArea = (b) => { const cb = cellAt(b).box; return pathMeets(A.pts, cb, true) || inPoly({ x: (cb.x0 + cb.x1) / 2, y: (cb.y0 + cb.y1) / 2 }, A.pts); };
    const got = tries.find(([sd, b]) => inOneSquare(b) && ofArea(b) && (sd === 'c' ? free(b, name) : free(b, null)));
    if (got) labels.push({ name, lines: v, side: got[0], box: got[1], area: true, cell: cellAt(got[1]).cell });
    else f.push(`the name "${name}" finds no room inside one square`);
  });
  // the names of the places
  places.forEach((q) => {
    if (q.p.noLabel) return;   // a landmark picture the key explains (the text names it)
    const variants = q.p.labels || [[q.p.name]], sides = q.p.sides || SIDES;
    let got = null;
    for (const v of variants) { for (const sd of sides) { const b = labelBox(v, q.x, q.y, q.half, sd); if (within(b, inner(q.cbox)) && free(b, null)) { got = { name: q.p.name, lines: v, side: sd, box: b, cell: q.cell }; break; } } if (got) break; }
    if (got) labels.push(got); else f.push(`${q.p.name}: no room for its name inside square ${q.cell} (8 px from every grid line, touching nothing)`);
  });
  // the level-3 numbers (each replaces its own name, so it may stand where that name stood)
  places.forEach((q) => {
    const g = q.half + 4 + BADGE / 2, d = q.half + 3 + BADGE / 2;
    const at = { r: [g, 0], l: [-g, 0], t: [0, -g], b: [0, g], tr: [d, -d], br: [d, d], tl: [-d, -d], bl: [-d, d] };
    for (const sd of q.p.sides || SIDES) { const [dx, dy] = at[sd], cx = q.x + dx, cy = q.y + dy, bx = box(cx - BADGE / 2, cy - BADGE / 2, cx + BADGE / 2, cy + BADGE / 2); if (within(bx, inner(q.cbox)) && free(bx, q.p.name)) { badges[q.p.name] = bx; break; } }
  });
  areas.forEach((A) => { const name = A.a.name; if (!name) return; const bx = box(A.cx - BADGE / 2, A.cy - BADGE / 2, A.cx + BADGE / 2, A.cy + BADGE / 2);
    if (!pathMeets(A.pts, grow(bx, 2), true) && inOneSquare(bx)) badges[name] = bx; });
  // symbols inside their squares; no empty row or column
  places.forEach((q) => { const need = q.half + 2; /* the whole symbol inside its square */ if (q.margin < need) f.push(`${q.p.name} stands ${q.margin.toFixed(1)} px from a grid line`); });
  // (a named area, such as a lake, fills its square too)
  const named = areas.filter((A) => A.a.name).map((A) => ({ c: Math.floor(A.cx / cw), r: Math.floor(A.cy / ch) }));
  for (let c = 0; c < m.cols; c++) if (!places.some((q) => q.c === c) && !named.some((q) => q.c === c)) f.push(`column ${LETTERS[c]} holds no place`);
  for (let r = 0; r < m.rows; r++) if (!places.some((q) => q.r === r) && !named.some((q) => q.r === r)) f.push(`row ${r + 1} holds no place`);
  // the squares that hold (part of) an area that has a name ("Which ... is in square B2?" is never asked of them)
  const areaCells = new Set();
  for (let c = 0; c < m.cols; c++) for (let r = 0; r < m.rows; r++) {
    const cb = cellBox(c, r);
    if (areas.some((A) => A.a.name && (pathMeets(A.pts, cb, true) || inPoly({ x: (cb.x0 + cb.x1) / 2, y: (cb.y0 + cb.y1) / 2 }, A.pts)))) areaCells.add(LETTERS[c] + (r + 1));
  }
  const out = { places, labels, badges, areas, lines, areaCells, faults: f };
  LAYOUTS.set(m, out);
  return out;
}

/* ------------------------------------------------------------------ the bank's check */
function textFaults(t) {
  const f = [], id = t.id;
  if (!Array.isArray(t.parts) || t.parts.length !== 3) return [id + ': not three paragraphs'];
  const n = wordsIn(textOf(t));
  if (n < 120 || n > 160) f.push(`${id}: ${n} words (a text has 120 to 160)`);
  t.parts.forEach((p, i) => {
    const k = wordsIn(p.join(' '));
    if (p.length < 3 || k < 28 || k > 66) f.push(`${id} paragraph ${i + 1}: ${p.length} sentences, ${k} words (three or more sentences, 28 to 66 words)`);
    p.forEach((s) => { if (wordsIn(s) > 24) f.push(`${id}: a sentence of ${wordsIn(s)} words`); if (!/[.!?]$/.test(s)) f.push(`${id}: "${s.slice(0, 30)}" has no end mark`); });
  });
  if (!t.title || t.title.length > 34) f.push(id + ': no title of at most 34 letters');
  return f;
}
function questionFaults(id, q, needAnswer = true) {
  const f = [];
  if (!/\?$/.test(q.q || '')) f.push(`${id}: "${q.q}" has no question mark`);
  if (needAnswer && (!q.answer || !Array.isArray(q.wrong) || q.wrong.length !== 2 || new Set([q.answer, ...q.wrong].map(core)).size !== 3)) f.push(`${id}: "${q.q}" has not one right and two different wrong answers`);
  return f;
}
function mapFaults(t) {
  const f = textFaults(t), id = t.id, m = t.map, text = textOf(t);
  if (COMPASS.test(noContinent(text))) f.push(`${id}: the text names a compass direction ("${COMPASS.exec(noContinent(text))[0]}"): the map must be the only source of directions`);
  if (GRIDREF.test(text)) f.push(`${id}: the text names a grid square`);
  if (!m || !m.bbox || !m.places) return f.concat(id + ': no map');
  // a wide map stands under the text (its box at most 205 px high); a tall one beside it (rows of 100 px or more)
  if (m.layout === 'tall' ? (m.gw > 260 || m.gh > 470 || m.gh / m.rows < 100) : (m.gw > 470 || m.gh > 205)) f.push(`${id}: the map does not fit its place on the page`);
  // beside a wide map: its frame and padding (25), the row names (18), the gap (12), a key entry's swatch (36) and its words
  if (m.layout !== 'tall' && m.gw + 25 + 18 + 12 + 36 + Math.max(...(m.key || []).map((k) => textW(k.text))) > W) f.push(`${id}: the key does not fit beside the map`);
  // under the text beside a long tall map: the map's box (gw + 35), the gap (8), the side box's frame (17), the rose (64 + 8), two columns (36 a swatch, 10 between)
  if (COMPACT(m)) { const [c1, c2] = keyColumns(m), w = (c) => 36 + Math.max(...c.map((k) => textW(k.text))); if (m.gw + 35 + 8 + 17 + 72 + w(c1) + 10 + w(c2) > W) f.push(`${id}: the key does not fit under the text`); }
  // under a short tall map: the rose and the two columns within the map's own width (its row names and padding)
  else if (m.layout === 'tall') { const [c1, c2] = keyColumns(m), w = (c) => 36 + Math.max(...c.map((k) => textW(k.text))); if (72 + w(c1) + 10 + w(c2) > m.gw + 30) f.push(`${id}: the key does not fit under the map`); }
  const st = stretch(m); if (st < 0.75 || st > 1.34) f.push(`${id}: the map is stretched ${st.toFixed(2)} : 1`);
  const names = m.places.map((p) => p.name);
  if (new Set(names).size !== names.length || names.length < 4) f.push(id + ': not four or more places with different names');
  const cells = new Map();
  m.places.forEach((p) => {
    const c = cellOf(m, p.at);
    if (cells.has(c.cell)) f.push(`${id}: ${p.name} and ${cells.get(c.cell)} share square ${c.cell}`); cells.set(c.cell, p.name);
    if (!['dot', 'star', 'triangle', 'diamond', 'pic'].includes(p.sym)) f.push(`${id}: ${p.name} has no known symbol`);
    if (p.sym === 'pic' && (!p.pic || !p.kind || /\bbw\b|bw\s*\d*$/i.test(p.pic[0]))) f.push(`${id}: ${p.name} has no colour picture or no kind ("mountains")`);
  });
  if (f.length) return f;   // the layout reads the places checked above
  const L = layoutMap(m);
  L.faults.forEach((x) => f.push(`${id}: ${x}`));
  // a line stays on the map; one marked offMap (a river that flows in from beyond the map) only enters it
  for (const ln of m.lines || []) { const out = ln.pts.map((pt) => project(m, pt)).filter(({ x, y }) => x < -1 || x > m.gw + 1 || y < -1 || y > m.gh + 1).length;
    if (out && (!ln.offMap || out === ln.pts.length)) f.push(`${id}: a ${ln.style} line leaves the map`); }
  const syms = new Set([...m.places.map((p) => p.sym), ...(m.lines || []).map((l) => 'line:' + l.style), ...(m.lines || []).filter((l) => l.arrows).map(() => 'arrow'), ...(m.areas || []).map((a) => 'area:' + a.fill)]);
  m.key.forEach((k) => { if (!syms.has(k.sym)) f.push(`${id}: the key shows "${k.sym}", which the map does not use`); });
  if (m.key.length < 3 || new Set(m.key.map((k) => k.text)).size !== m.key.length) f.push(id + ': not three or more different key entries');
  m.places.forEach((p) => { if (p.sym !== 'pic' && !m.key.some((k) => k.sym === p.sym)) f.push(`${id}: the key does not explain the symbol of ${p.name}`); });
  (m.areas || []).forEach((a) => { if (!m.key.some((k) => k.sym === 'area:' + a.fill)) f.push(`${id}: the key does not explain the ${a.fill} area`); });
  const MS = mapStrings(m);
  // text questions: the words that prove the answer stand in the text and nowhere on the map
  (t.text || []).forEach((q) => { f.push(...questionFaults(id, q)); const fd = q.find || core(q.answer);
    if (!has(text, fd)) f.push(`${id}: the answer of "${q.q}" ("${fd}") is not in the text`);
    if (inAny(MS, fd)) f.push(`${id}: the answer of "${q.q}" is printed on the map too (two sources)`);
    if (GRIDREF.test(q.q) || COMPASS.test(q.q)) f.push(`${id}: the text question "${q.q}" names a square or a direction`); });
  (t.both || []).forEach((q) => {
    f.push(...questionFaults(id, q, q.kind !== 'where'));
    if (q.kind === 'where' || q.kind === 'what') {
      if (!names.includes(q.place)) f.push(`${id}: "${q.q}" asks about ${q.place}, which is not on the map`);
      // the text names the place, or (via) the key names its kind and the text tells about that kind (a checkpoint)
      const viaOk = q.via && m.key.some((k) => k.text === q.via && k.sym === (m.places.find((p) => p.name === q.place) || {}).sym) && hasForm(text, q.via);
      if (!has(text, q.place) && !viaOk) f.push(`${id}: "${q.q}": the text never names ${q.place}, so the text cannot tell which place it is`);
      if (q.lure && !names.includes(q.lure)) f.push(`${id}: "${q.q}": its lure ${q.lure} is not on the map`);
    }
    if (q.kind === 'where') {
      if (has(q.q, q.place)) f.push(`${id}: "${q.q}" names its own place (the map alone would answer it)`);
      if (!q.cue || !hasForm(text, q.cue) || inAny(MS, q.cue)) f.push(`${id}: "${q.q}": its cue "${q.cue}" is not words of the text alone`);
    } else if (q.kind === 'what') {
      const fd = q.find || core(q.answer);
      if (!/\{SQ\}/.test(q.q)) f.push(`${id}: "${q.q}" does not name the square`);
      if (!has(text, fd)) f.push(`${id}: the answer of "${q.q}" ("${fd}") is not in the text`);
      if (inAny(MS, fd)) f.push(`${id}: the answer of "${q.q}" is printed on the map (the text is not needed)`);
    } else if (q.kind === 'name') {
      if (!inAny(MS, q.answer) || has(text, q.answer)) f.push(`${id}: the answer of "${q.q}" is not a name only the map prints`);
      if (!q.cue || !has(q.q, q.cue) || !hasForm(text, q.cue) || inAny(MS, q.cue)) f.push(`${id}: "${q.q}": its cue "${q.cue}" is not words of the text alone`);
      (q.uses || []).forEach((u) => { if (!names.includes(u)) f.push(`${id}: "${q.q}" uses ${u}, which is not on the map`); });
    } else f.push(`${id}: "${q.q}" is no where, what or name question`);
  });
  if ((t.text || []).length < 3 || (t.both || []).length < 3) f.push(id + ': fewer than three text questions or three both questions');
  const areaNames = (m.areas || []).filter((a) => a.name).map((a) => a.name);
  if (!Array.isArray(t.blanks) || t.blanks.length !== 2 || t.blanks.some((b) => !names.includes(b) && !areaNames.includes(b)) || t.blanks.some((b) => !has(text, b))) f.push(id + ': not two places (or areas) to name on level 3, both named in the text');
  else t.blanks.forEach((b) => { if (!L.badges[b]) f.push(`${id}: no room for the level-3 number of ${b}`); });
  // every level can be filled (asked only of a sound bank: the search reads the places and questions checked above)
  if (f.length) return f;
  const R0 = makeRng('info-text-g3d|' + id), SIX = { graphic: 2, text: 2, both: 2 };
  if (!pickQuestions(poolsOf(t, 'map'), SIX, R0, { short: true, mode: 'map' })) f.push(id + ': no set of six questions with short answers for level 1');
  if (!pickQuestions(poolsOf(t, 'map'), SIX, R0, { short: false, mode: 'map' })) f.push(id + ': no set of six questions for level 2');
  if (!pickFour(poolsOf(t, 'map', t.blanks), R0, 'map')) f.push(id + ': no set of four questions without the blank places for level 3');
  return f;
}
function diagramFaults(t) {
  const f = textFaults(t), id = t.id, d = t.diagram, text = textOf(t);
  if (!d || !Array.isArray(d.stages) || d.stages.length < 3 || d.stages.length > 4) return f.concat(id + ': not a diagram of three or four steps');
  if (!['chain', 'cycle'].includes(d.shape) || !d.name) f.push(id + ': the diagram is no chain or cycle with a name');
  const sn = d.stages.map((s) => s.name);
  if (new Set(sn.map(norm)).size !== sn.length) f.push(id + ': two steps share a name');
  d.stages.forEach((s) => {
    // a step without a picture only where the library has none that shows exactly what the step names (noPic: why)
    if (s.pic ? /bw\s*\d*$/i.test(s.pic[0]) : !s.noPic) f.push(`${id}: ${s.name} has no colour picture`);
    if (!s.says || !/\.$/.test(s.says) || s.says.length > 90) f.push(`${id}: ${s.name} has no sentence of at most 90 letters for the missing step`);
    if ((s.label ? s.label : [s.name]).some((l) => l.length > 13)) f.push(`${id}: the name of ${s.name} is too long for its box (13 letters a line)`);
  });
  const DS = diagramStrings(d);
  const onlyDiagram = (s) => inAny(DS, s) && !has(text, s);
  const target = (a) => core(a).replace(/^to (the )?/, '');   // "to the grass" names the step Grass
  (t.graphic || []).forEach((q) => { f.push(...questionFaults(id, q));
    if (!onlyDiagram(target(q.answer)) && !q.usesAll) f.push(`${id}: the answer of "${q.q}" is not printed on the diagram alone`);
    if (q.usesAll && has(text, q.answer)) f.push(`${id}: the answer of "${q.q}" stands in the text too`); });
  (t.text || []).forEach((q) => { f.push(...questionFaults(id, q)); const fd = q.find || core(q.answer);
    if (!has(text, fd)) f.push(`${id}: the answer of "${q.q}" ("${fd}") is not in the text`);
    if (inAny(DS, fd)) f.push(`${id}: the answer of "${q.q}" is printed on the diagram too`);
    if (sn.some((s) => !has(text, s) && has(q.q, s))) f.push(`${id}: the text question "${q.q}" names a step only the diagram shows`); });
  (t.both || []).forEach((q) => { f.push(...questionFaults(id, q));
    if (onlyDiagram(core(q.answer))) {   // the diagram names it; the text tells which one
      if (!q.cue || !has(q.q, q.cue) || !hasForm(text, q.cue) || inAny(DS, q.cue)) f.push(`${id}: "${q.q}": its cue "${q.cue}" is not words of the text alone`);
    } else {                            // the question names a step only the diagram shows; the text tells the answer
      const fd = q.find || core(q.answer);
      if (!has(text, fd) || inAny(DS, fd)) f.push(`${id}: the answer of "${q.q}" ("${fd}") is not words of the text alone`);
      // a step only the diagram names, or a step by its place in the diagram ("the last step in the diagram")
      if (!sn.some((s) => !has(text, s) && has(q.q, s)) && !(q.via === 'diagram' && /\b(first|last) step in the diagram\b/.test(q.q))) f.push(`${id}: "${q.q}" names no step that only the diagram shows`);
    } });
  if ((t.graphic || []).length < 2 || (t.text || []).length < 3 || (t.both || []).length < 3) f.push(id + ': fewer than two diagram, three text or three both questions');
  if (f.length) return f;
  const R0 = makeRng('info-text-g3d|' + id), SIX = { graphic: 2, text: 2, both: 2 };
  if (!pickQuestions(poolsOf(t, 'diagram'), SIX, R0, { short: true, mode: 'diagram' })) f.push(id + ': no set of six questions with short answers for level 1');
  if (!pickQuestions(poolsOf(t, 'diagram'), SIX, R0, { short: false, mode: 'diagram' })) f.push(id + ': no set of six questions for level 2');
  if (hideableSteps(t, R0).length < 2) f.push(id + ': fewer than two steps can be the missing step of level 3 (too few questions without them)');
  return f;
}
function faultsOf(bank) {
  return [...(bank.maps || []).flatMap(mapFaults), ...(bank.diagrams || []).flatMap(diagramFaults),
    ...((bank.maps || []).length < 5 || (bank.diagrams || []).length < 5 ? ['the bank holds fewer than five maps or five diagrams'] : [])];
}

/* ------------------------------------------------------------------ the question pools of one text */
/** every question a page of this text may ask, each with its source, its answer, its wrong answers and what it uses
 *  (the places or steps it names; a page that hides one of them does not ask it) */
function poolsOf(t, mode, hidden = []) {
  const H = new Set(hidden.map(norm));
  const hides = (uses) => uses.some((u) => H.has(norm(u)));
  if (mode === 'map') {
    const m = t.map, L = layoutMap(m), P = m.places;
    const cell = (p) => cellOf(m, p.at).cell;
    const nm = (p) => (p.the ? 'the ' : '') + p.name;
    // the kind of a place, as the key names it ("city", "checkpoint") or as the bank names a picture ("mountains")
    const kindOf = (p) => p.kind || (p.sym === 'dot' ? (m.key.find((k) => k.sym === 'dot') || {}).text : null) || null;
    const graphic = [];
    const shown = P.filter((p) => !p.noLabel);
    // a landmark picture without a name: "In which square are the bison?", when the map shows one such picture
    P.filter((p) => p.noLabel && P.filter((o) => o.sym === 'pic' && o.pic.join('/') === p.pic.join('/')).length === 1).forEach((p) => {
      const k = m.key.find((x) => x.sym === 'pic' && x.pic.join('/') === p.pic.join('/'));
      if (k) graphic.push({ src: 'graphic', kind: 'square', q: `In which square are the ${k.text}?`, answer: cell(p), wrongs: P.filter((o) => o !== p).map(cell), uses: [p.name], a: p.name });
    });
    shown.forEach((p) => {
      const others = P.filter((o) => o !== p);
      graphic.push({ src: 'graphic', kind: 'square', q: `In which square ${p.plural ? 'are' : 'is'} ${nm(p)}?`, answer: cell(p), wrongs: others.map(cell), uses: [p.name], a: p.name });
      // "Which city is in square F1?": only of a square that holds one thing of that kind and no named area (the reviewer,
      // 2026-11-17: B2 of the Mall also held the Reflecting Pool)
      const kd = kindOf(p);
      if (kd && !L.areaCells.has(cell(p)) && P.filter((o) => kindOf(o) === kd && cell(o) === cell(p)).length === 1) {
        const same = others.filter((o) => kindOf(o) === kd && !o.noLabel);
        graphic.push({ src: 'graphic', kind: 'whatin', q: `Which ${kd} ${p.plural ? 'are' : 'is'} in square ${cell(p)}?`, answer: p.name, wrongs: (same.length >= 2 ? same : others.filter((o) => !o.noLabel)).map((o) => o.name), uses: [p.name], a: p.name, sq: cell(p), what: kd });
      }
    });
    for (const a of shown) for (const b of shown) { if (a === b) continue; const d = directionOf(m, a, b); if (d) graphic.push({ src: 'graphic', kind: 'dir', q: `In which direction ${a.plural ? 'are' : 'is'} ${nm(a)} from ${nm(b)}?`, answer: d, wrongs: ['north', 'east', 'south', 'west'].filter((x) => x !== d), uses: [a.name, b.name], a: a.name, b: b.name }); }
    m.key.filter((k) => k.ask).forEach((k) => graphic.push({ src: 'graphic', kind: 'key', fact: true, sym: k.sym, q: 'What does {SYM} on the map stand for?', answer: k.text, wrongs: m.key.filter((x) => x !== k).map((x) => x.text), uses: m.places.filter((p) => p.sym === k.sym).map((p) => p.name) }));
    const text = (t.text || []).map((q) => ({ ...q, src: 'text', kind: 'text', fact: true, uses: placesNamedIn(m, q.q) }));
    const both = (t.both || []).map((q) => {
      if (q.kind === 'where') return { ...q, src: 'both', answer: cell(m.places.find((p) => p.name === q.place)), wrongs: P.filter((p) => p.name !== q.place).map(cell), lureAnswer: q.lure ? cell(m.places.find((p) => p.name === q.lure)) : null, uses: [q.place] };
      if (q.kind === 'what') return { ...q, src: 'both', fact: true, q: q.q.replace('{SQ}', cell(m.places.find((p) => p.name === q.place))), uses: [q.place] };
      return { ...q, src: 'both', uses: q.uses || [] };
    });
    return { graphic: graphic.filter((q) => !hides(q.uses)), text: text.filter((q) => !hides(q.uses)), both: both.filter((q) => !hides(q.uses)) };
  }
  const d = t.diagram, names = d.stages.map((s) => s.name);
  const named = (s, n) => has(s, n) || has(s, n + 's') || has(s, n + 'es');
  const usesOf = (q) => (q.usesAll ? names.slice() : names.filter((n) => named(q.q, n) || named(q.answer, n)));
  const isName = (a) => names.some((n) => core(a) === core(n) || core(a) === 'new ' + core(n));
  const tag = (list, src) => (list || []).map((q) => ({ ...q, src, kind: src, fact: src !== 'graphic' && !isName(q.answer), uses: usesOf(q) }));
  const graphic = tag(t.graphic, 'graphic'), text = tag(t.text, 'text'), both = tag(t.both, 'both');
  return { graphic: graphic.filter((q) => !hides(q.uses)), text: text.filter((q) => !hides(q.uses)), both: both.filter((q) => !hides(q.uses)) };
}
/** the questions of one page: `want` = how many of each source; never two of one group, two with one answer, or a
 *  question that names the place (step) of a both question; on level 1 only answers that fit one circled row */
function clash(q, g, mode) {
  // a question never prints the answer of another ("In which square was the golden spike tapped?" beside "What was tapped?")
  // (a fact of the text: the names a map or a diagram prints stand in many questions as their subject)
  const tells = (a, b) => b.fact && core(b.answer).length >= 3 && has(a.q, core(b.answer));
  // one answer twice ("to the shark" and "the shark" are one answer)
  const same = (a, b) => core(a).replace(/^to (the )?/, '') === core(b).replace(/^to (the )?/, '');
  // a group may be a list: two questions that share any group never stand on one page
  const groups = (x) => [].concat(x.group || []);
  return groups(q).some((k) => groups(g).includes(k)) || same(q.answer, g.answer) || tells(q, g) || tells(g, q) ||
    // on the map, a both question never stands beside another question about its place (a diagram's questions share its
    // steps by nature: there a giveaway is named by the bank's groups)
    (mode === 'map' && q.src === 'both' && g.src !== 'graphic' && g.uses.some((u) => q.uses.includes(u))) || (mode === 'map' && g.src === 'both' && q.src !== 'graphic' && q.uses.some((u) => g.uses.includes(u))) ||
    // on the map, two map questions are of two kinds about other places, and a map question never asks about the place
    // of a both question ("In which square is Omaha?" would answer "In which square did the Union Pacific start?")
    (mode === 'map' && q.src === 'graphic' && g.src === 'graphic' && (q.kind === g.kind || q.uses.some((u) => g.uses.includes(u)))) ||
    (mode === 'map' && q.src === 'graphic' && g.src === 'both' && q.uses.some((u) => g.uses.includes(u)) && q.kind !== 'key') ||
    (mode === 'map' && g.src === 'graphic' && q.src === 'both' && g.uses.some((u) => q.uses.includes(u)) && g.kind !== 'key');
}
function* combos(list, k, from = 0, acc = []) {
  if (acc.length === k) { yield acc; return; }
  for (let i = from; i < list.length; i++) yield* combos(list, k, i + 1, [...acc, list[i]]);
}
/** a complete search over the (shuffled) pools: the first set that keeps every rule, or null when none exists */
function pickQuestions(P, want, rng, { short, mode }) {
  const wrongOf = (q) => q.wrong || (q.lureAnswer ? [q.lureAnswer, rng.pick(q.wrongs.filter((x) => x !== q.lureAnswer))] : shuffle(q.wrongs, rng).slice(0, 2));
  const pool = {};
  for (const src of SRC) pool[src] = shuffle(P[src], rng).map((q) => ({ ...q, wrong: wrongOf(q) })).filter((q) => !short || fitsTwoRows([q.answer, ...q.wrong]));
  const fine = (set) => set.every((q, i) => set.every((g, j) => j <= i || !clash(q, g, mode)));
  for (const b of combos(pool.both, want.both)) {
    if (!fine(b)) continue;
    for (const t of combos(pool.text, want.text)) {
      if (!fine([...b, ...t])) continue;
      for (const g of combos(pool.graphic, want.graphic)) { const set = [...b, ...t, ...g]; if (fine(set) && set.filter((q) => /^[A-H][1-9]$/.test(q.answer)).length <= set.length - 2) return set; }
    }
  }
  return null;
}
/** level 3: four questions with every source, two both questions where the pools allow it (else two of another source) */
const FOURS = [{ graphic: 1, text: 1, both: 2 }, { graphic: 1, text: 2, both: 1 }, { graphic: 2, text: 1, both: 1 }];
const pickFour = (P, rng, mode) => { for (const w of FOURS) { const got = pickQuestions(P, w, rng, { short: false, mode }); if (got) return got; } return null; };
/** the steps of a diagram that level 3 may hide: those that leave a set of four questions */
const hideableSteps = (t, rng) => t.diagram.stages.filter((s) => pickFour(poolsOf(t, 'diagram', [s.name]), rng, 'diagram'));
/**
 * A sequence of places (0, 1, 2: the circled answer, or the source map/text/both) that a child could follow without
 * reading: three alike in a row, a staircase of three (0 1 2, 2 1 0), pairs (A A B B ..), a repeat (A B A B ..,
 * A B C A B C), or all of one kind together. Checked in reading order AND down each printed column (the reviewer,
 * 2026-11-17: level 1 of the water cycle read 3,3,2,2,1,1).
 */
function patterned(s, cols = 2) {
  const bad = (a) => a.some((x, i) => i >= 2 && ((x === a[i - 1] && x === a[i - 2]) || (Math.abs(x - a[i - 1]) === 1 && x - a[i - 1] === a[i - 1] - a[i - 2])))
    || (a.length >= 4 && a.length % 2 === 0 && a.every((x, i) => i % 2 === 0 || x === a[i - 1]))
    || (a.length >= 4 && a.every((x, i) => i < 2 || x === a[i - 2]))
    || (a.length >= 6 && a.every((x, i) => i < 3 || x === a[i - 3]))
    || (a.length >= 4 && (a.join('') === [...a].sort().join('') || a.join('') === [...a].sort().reverse().join('')));
  if (bad(s)) return true;
  for (let c = 0; c < cols; c++) { const col = s.filter((_, i) => i % cols === c); if (col.length >= 3 && bad(col)) return true; }
  return false;
}
/** an order of the questions in which the sources (and so the circled or checked source) stand in no pattern */
function orderOf(qs, rng) {
  for (let n = 0; n < 2000; n++) {
    const o = shuffle(qs, rng), s = o.map((q) => SRC.indexOf(q.src));
    if (s.length >= 4 && new Set(s).size < 3) continue;
    if (!patterned(s)) return o;
  }
  throw new Error('info-text-g3d: no order of the sources without a pattern');
}
/** the places of the right answers among three (level 1): every place used, no pattern in rows or columns */
function positionsFor(n, rng) {
  for (let k = 0; k < 2000; k++) {
    const p = Array.from({ length: n }, () => rng.int(0, 2));
    if (n >= 4 && new Set(p).size < 3) continue;
    if (!patterned(p)) return p;
  }
  throw new Error('info-text-g3d: no places for the right answers without a pattern');
}

/* ------------------------------------------------------------------ check the bank now */
const MAPS = BANK.maps || [], DIAGRAMS = BANK.diagrams || [];
{ const f = faultsOf(BANK); if (f.length) throw new Error('info-graphics-g3.en.json: ' + f.join('; ')); }

const LEVELS = {
  map: { 1: { font: 14.5, lh: 1.27 }, 2: { font: 14.5, lh: 1.27 }, 3: { font: 14.5, lh: 1.27 } },
  diagram: { 1: { font: 15, lh: 1.32 }, 2: { font: 15, lh: 1.32 }, 3: { font: 14.6, lh: 1.3 } },
};

/* ------------------------------------------------------------------ drawing */
const tab = (n) => `<span data-lcs-paratab="${n}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;margin-top:1px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 13px/1 'Nunito',sans-serif">${n}</span>`;
function textBox(t, { font, lh }, grow = false) {   // grow: the box fills the height beside a tall map
  const parts = t.parts.map((p, i) => `<div data-lcs-part="${i + 1}" style="display:flex;gap:7px;margin-top:${i ? 3 : 0}px">${tab(i + 1)}<div data-lcs-partbody style="flex:1 1 auto;min-width:0;font:700 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}">${esc(p.join(' '))}</div></div>`).join('');
  return `<div data-lcs-gtext="${t.id}" data-lcs-words="${wordsIn(textOf(t))}" style="${grow ? 'flex:1 1 auto;' : 'flex:0 0 auto;'}padding:4px 14px 6px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div data-lcs-title style="font:700 20px/1.15 'Baloo 2',cursive;color:${T.ink};margin-bottom:1px">${esc(t.title)}</div>${parts}</div>`;
}
const HALO = 'text-shadow:0 0 2px #FFFFFF,0 0 2px #FFFFFF,0 0 3px #FFFFFF,0 0 4px #FFFFFF';
const STAR = (cx, cy, r) => { const p = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1)); } return `M${p.join(' L')} Z`; };
/** a key symbol (or a map symbol) as svg markup centred at (cx, cy) */
function symbol(sym, cx, cy) {
  if (sym === 'dot') return `<circle cx="${cx}" cy="${cy}" r="5.5" fill="${T.ink}" stroke="${T.white}" stroke-width="1.5"/>`;
  if (sym === 'star') return `<path d="${STAR(cx, cy, 10)}" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.3" stroke-linejoin="round"/>`;
  if (sym === 'triangle') return `<path d="M${cx} ${cy - 8} L${cx + 7.5} ${cy + 6} L${cx - 7.5} ${cy + 6} Z" fill="${T.teal}" stroke="${T.ink}" stroke-width="1.3" stroke-linejoin="round"/>`;
  if (sym === 'diamond') return `<path d="M${cx} ${cy - 8} L${cx + 7} ${cy} L${cx} ${cy + 8} L${cx - 7} ${cy} Z" fill="${T.teal}" stroke="${T.ink}" stroke-width="1.3" stroke-linejoin="round"/>`;
  return '';
}
const LINE = {
  rail: `stroke="${T.ink}" stroke-width="3.2"`, rail2: `stroke="${T.ink}" stroke-width="3.2" stroke-dasharray="9 6"`,
  trail: `stroke="${T.coral}" stroke-width="3.2" stroke-dasharray="7 5"`, river: `stroke="${T.teal}" stroke-width="4"`,
  river2: `stroke="${T.teal}" stroke-width="2.2"`, road: `stroke="${T.inkSoft}" stroke-width="2"`,
};
const AREA = { water: `fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.5"`, park: `fill="${T.creamDeep}" stroke="none"` };
/** the swatch of a key entry (and the symbol a key question shows), 30 x 18 */
function swatch(k, pic) {
  const s = k.sym;
  if (s.startsWith('line:')) return `<svg data-lcs-swatch="${s}" width="30" height="18" viewBox="0 0 30 18" style="flex:0 0 auto;display:block"><path d="M2 9 H28" fill="none" stroke-linecap="butt" ${LINE[s.slice(5)]}/></svg>`;
  if (s.startsWith('area:')) return `<svg data-lcs-swatch="${s}" width="30" height="18" viewBox="0 0 30 18" style="flex:0 0 auto;display:block"><rect x="3" y="3" width="24" height="12" rx="3" ${AREA[s.slice(5)]}/></svg>`;
  if (s === 'arrow') return `<svg data-lcs-swatch="arrow" width="30" height="18" viewBox="0 0 30 18" style="flex:0 0 auto;display:block"><path d="M2 9 H26" stroke="${T.teal}" stroke-width="4" fill="none"/><path d="M19 3 L28 9 L19 15 Z" fill="${T.teal}" stroke="${T.ink}" stroke-width="1"/></svg>`;
  if (s === 'pic') return `<img class="ws-icon" data-lcs-swatch="pic" src="${pic}" alt="" style="flex:0 0 auto;width:30px;height:24px;object-fit:contain;display:block">`;
  return `<svg data-lcs-swatch="${s}" width="30" height="20" viewBox="0 0 30 20" style="flex:0 0 auto;display:block">${symbol(s, 15, 10)}</svg>`;
}
/** a name on the map at its laid-out box (left- or right-aligned by its side, centred above or below its symbol) */
function nameHtml(l, m, attrs, color) {
  const b = l.box, left = /r$/.test(l.side), right = /l$/.test(l.side) && l.side !== 'l' ? true : l.side === 'l';
  const pos = left ? `left:${b.x0.toFixed(1)}px` : right ? `right:${(m.gw - b.x1).toFixed(1)}px` : `left:${((b.x0 + b.x1) / 2).toFixed(1)}px;transform:translateX(-50%)`;
  return `<span ${attrs} style="position:absolute;${pos};top:${b.y0.toFixed(1)}px;white-space:nowrap;text-align:${left ? 'left' : right ? 'right' : 'center'};font:800 13px/${LH13}px 'Nunito',sans-serif;color:${color};${HALO}">${l.lines.map(esc).join('<br>')}</span>`;
}
/**
 * The map: the lettered grid with its areas, lines, places and names (all from layoutMap), and the compass rose and the
 * key. Returns { fig, side }: the page puts the side beside a wide map, or under the text beside a tall one.
 */
function mapBox(t, { blanks }) {
  const m = t.map, L = layoutMap(m), cw = m.gw / m.cols, ch = m.gh / m.rows;
  const pts = (ps) => ps.map((p) => p.x.toFixed(1) + ' ' + p.y.toFixed(1)).join(' L');
  let svg = `<rect x="0" y="0" width="${m.gw}" height="${m.gh}" fill="${T.white}"/>`;
  L.areas.forEach((A) => { svg += `<path data-lcs-area="${esc(A.a.name || [].concat(A.a.label || A.a.fill).join(' '))}"${A.a.name ? ' data-lcs-named="1"' : ''}${OUTLINED(A.a) ? ' data-lcs-outline="1"' : ''} data-lcs-fill="${A.a.fill}" d="M${pts(A.pts)} Z" stroke-linejoin="round" ${AREA[A.a.fill]}/>`; });
  for (let c = 1; c < m.cols; c++) svg += `<path data-lcs-gridline="c${c}" d="M${(c * cw).toFixed(1)} 0 V${m.gh}" stroke="${T.grid}" stroke-width="1.3"/>`;
  for (let r = 1; r < m.rows; r++) svg += `<path data-lcs-gridline="r${r}" d="M0 ${(r * ch).toFixed(1)} H${m.gw}" stroke="${T.grid}" stroke-width="1.3"/>`;
  (m.lines || []).forEach((ln, i) => {
    const P = L.lines[i];
    svg += `<path data-lcs-mapline="${ln.style}" d="M${pts(P)}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${LINE[ln.style]}/>`;
    if (ln.arrows) {   // arrowheads that point down the river, at the given fractions of its length
      const seg = P.slice(1).map((p, k) => Math.hypot(p.x - P[k].x, p.y - P[k].y)), tot = seg.reduce((a, v) => a + v, 0);
      for (const fr of ln.arrows) { let d = fr * tot, k = 0; while (k < seg.length - 1 && d > seg[k]) d -= seg[k++]; const a = P[k], b = P[k + 1], u = (b.x - a.x) / seg[k], v = (b.y - a.y) / seg[k], x = a.x + u * d, y = a.y + v * d;
        svg += `<path data-lcs-flowarrow d="M${(x + u * 8).toFixed(1)} ${(y + v * 8).toFixed(1)} L${(x - u * 5 - v * 6).toFixed(1)} ${(y - v * 5 + u * 6).toFixed(1)} L${(x - u * 5 + v * 6).toFixed(1)} ${(y - v * 5 - u * 6).toFixed(1)} Z" fill="${T.teal}" stroke="${T.ink}" stroke-width="1"/>`; }
    }
  });
  svg += `<rect x="1" y="1" width="${m.gw - 2}" height="${m.gh - 2}" fill="none" stroke="${T.ink}" stroke-width="2"/>`;
  let over = '';
  const blankNo = new Map((blanks || []).map((b, i) => [b, i + 1]));
  const badge = (n, bx, name) => `<span data-lcs-blank="${n}" data-lcs-blankname="${esc(name)}" style="position:absolute;left:${bx.x0.toFixed(1)}px;top:${bx.y0.toFixed(1)}px;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:${BADGE}px;height:${BADGE}px;border-radius:50%;background:${T.coral};border:2px solid ${T.white};color:#FFFFFF;font:800 14px/1 'Nunito',sans-serif">${n}</span>`;
  L.places.forEach((q) => {
    const p = q.p, a = `data-lcs-place="${esc(p.name)}" data-lcs-cell="${q.cell}"${p.kind || p.sym === 'dot' ? ` data-lcs-kind="${esc(p.kind || (m.key.find((k) => k.sym === 'dot') || {}).text || '')}"` : ''}`;
    over += p.sym === 'pic'
      ? `<img class="ws-icon" ${a} src="${fileUri(p.pic[0], p.pic[1])}" alt="" style="position:absolute;left:${(q.x - HALF.pic).toFixed(1)}px;top:${(q.y - HALF.pic).toFixed(1)}px;width:${2 * HALF.pic}px;height:${2 * HALF.pic}px;object-fit:contain">`
      : `<svg ${a} width="24" height="24" viewBox="0 0 24 24" style="position:absolute;left:${(q.x - 12).toFixed(1)}px;top:${(q.y - 12).toFixed(1)}px;overflow:visible">${symbol(p.sym, 12, 12)}</svg>`;
  });
  L.labels.forEach((l) => {
    if (blankNo.has(l.name)) over += badge(blankNo.get(l.name), L.badges[l.name], l.name);
    else over += nameHtml(l, m, `data-lcs-maplabel="${esc(l.name)}" data-lcs-labelcell="${l.cell}"${l.area ? ' data-lcs-arealabel="1"' : ''}`, l.area ? T.teal : T.ink);
  });
  // a hidden area without a printed name (its number stands inside it)
  for (const [name, n] of blankNo) if (!L.labels.some((l) => l.name === name)) over += badge(n, L.badges[name], name);
  const cols = Array.from({ length: m.cols }, (_, c) => `<span data-lcs-colname="${LETTERS[c]}" style="flex:1 1 0;text-align:center;font:700 15px/1 'Baloo 2',cursive;color:${T.teal}">${LETTERS[c]}</span>`).join('');
  const rows = Array.from({ length: m.rows }, (_, r) => `<span data-lcs-rowname="${r + 1}" style="flex:1 1 0;display:flex;align-items:center;justify-content:center;font:700 15px/1 'Baloo 2',cursive;color:${T.teal}">${r + 1}</span>`).join('');
  const fig = `<div data-lcs-mapfig style="flex:0 0 auto;display:grid;grid-template-columns:16px ${m.gw}px;grid-template-rows:17px ${m.gh}px;gap:0 2px">` +
    `<span></span><div style="display:flex">${cols}</div><div style="display:flex;flex-direction:column">${rows}</div>` +
    `<div data-lcs-maparea data-lcs-cols="${m.cols}" data-lcs-rows="${m.rows}" style="position:relative;width:${m.gw}px;height:${m.gh}px"><svg width="${m.gw}" height="${m.gh}" viewBox="0 0 ${m.gw} ${m.gh}" style="display:block">${svg}</svg>${over}</div></div>`;
  const entry = (k) => `<div data-lcs-keyentry="${esc(k.sym)}" data-lcs-keymean="${esc(k.text)}" style="display:flex;align-items:center;gap:6px;white-space:nowrap;font:700 13px/1.1 'Nunito',sans-serif;color:${T.ink}">${swatch(k, k.sym === 'pic' ? fileUri(k.pic[0], k.pic[1]) : null)}<span>${esc(k.text)}</span></div>`;
  const key = m.key.map(entry).join('');
  const wide = m.layout !== 'tall', row = !wide || W - 60 - m.gw >= 300;
  if (m.layout === 'tall') {   // beside the text: a 64 px rose and the key in two columns, the widest entries in the first
    const [c1, c2] = keyColumns(m);
    const col = (list) => `<div style="display:flex;flex-direction:column;gap:2px">${list.map(entry).join('')}</div>`;
    return { fig, side: `<div data-lcs-side style="flex:0 0 auto;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:8px">` +
      `<div data-lcs-compass style="align-self:center">${rose(64)}</div><div data-lcs-key style="display:flex;flex-direction:column;gap:2px"><div style="font:700 14px/1 'Baloo 2',cursive;color:${T.teal}">Key</div><div style="display:flex;gap:10px">${col(c1)}${col(c2)}</div></div></div>` };
  }
  const side = `<div data-lcs-side style="flex:0 0 auto;display:flex;flex-direction:${row ? 'row' : 'column'};align-items:${row ? 'center' : 'flex-start'};justify-content:center;gap:${row ? 22 : 3}px">` +
    `<div data-lcs-compass style="align-self:center">${rose()}</div><div data-lcs-key style="display:flex;flex-direction:column;gap:2px"><div style="font:700 14px/1 'Baloo 2',cursive;color:${T.teal}">Key</div>${key}</div></div>`;
  return { fig, side };
}
/** a compass rose of four points, the north point coral, the letters N, E, S, W outside the points (15 px) */
function rose(S = 74) {
  const c = S / 2, arm = Math.round(S * 0.23);
  const kite = (k) => `<g transform="rotate(${k * 90} ${c} ${c})"><path d="M${c} ${c - arm} L${c + 5} ${c - 5} L${c} ${c} Z" fill="${k ? T.teal : T.coral}"/><path d="M${c} ${c - arm} L${c} ${c} L${c - 5} ${c - 5} Z" fill="${k ? T.white : T.coralSoft}"/>` +
    `<path d="M${c} ${c - arm} L${c + 5} ${c - 5} L${c} ${c} L${c - 5} ${c - 5} Z" fill="none" stroke="${T.ink}" stroke-width="1.2" stroke-linejoin="round"/></g>`;
  const letter = (d, x, y) => `<text data-lcs-dirletter="${d}" x="${x}" y="${y}" font-family="'Baloo 2', cursive" font-size="15" font-weight="700" fill="${T.ink}" text-anchor="middle" dominant-baseline="central">${d}</text>`;
  return `<svg data-lcs-rose width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" style="display:block">${[0, 1, 2, 3].map(kite).join('')}<circle cx="${c}" cy="${c}" r="2.5" fill="${T.ink}"/>` +
    letter('N', c, 9) + letter('E', S - 8, c + 1) + letter('S', c, S - 8) + letter('W', 8, c + 1) + `</svg>`;
}
const BOX = 120, GAP = 38;
/** the diagram: the steps in a row with arrows between them (a cycle: and an arrow back from the last to the first) */
function diagramBox(t, { blank }) {
  const d = t.diagram, n = d.stages.length;
  const arrow = `<svg data-lcs-arrow width="${GAP}" height="22" viewBox="0 0 ${GAP} 22" style="flex:0 0 auto;display:block"><path d="M4 11 H${GAP - 12}" stroke="${T.teal}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M${GAP - 14} 4 L${GAP - 3} 11 L${GAP - 14} 18 Z" fill="${T.teal}"/></svg>`;
  const stage = (s, i) => (s.name === blank
    ? `<div data-lcs-stage="${i + 1}" data-lcs-stageblank="${esc(s.name)}" style="flex:0 0 auto;box-sizing:border-box;width:${BOX}px;height:100px;display:flex;align-items:center;justify-content:center;border:2.5px dashed ${T.coral};border-radius:12px;background:#FFFFFF"><span data-lcs-qmark style="font:800 46px/1 'Baloo 2',cursive;color:${T.coral}">?</span></div>`
    : `<div data-lcs-stage="${i + 1}" data-lcs-stagename="${esc(s.name)}" style="flex:0 0 auto;box-sizing:border-box;width:${BOX}px;height:100px;display:flex;flex-direction:column;align-items:center;justify-content:${s.pic ? 'flex-start' : 'center'};gap:3px;padding:6px 4px 4px;border:2px solid ${T.teal};border-radius:12px;background:${T.cream}">` +
      // a young tree is drawn small, standing on the same ground as the big one (the library has no sapling); a step the
      // library has no true picture of shows its name alone
      (s.pic ? `<img class="ws-icon" data-lcs-stagepic="${esc(s.pic.join('/'))}"${s.small ? ' data-lcs-small="1"' : ''} src="${fileUri(s.pic[0], s.pic[1])}" alt="" style="width:${s.small ? 32 : 54}px;height:${s.small ? 32 : 54}px;margin-top:${s.small ? 22 : 0}px;object-fit:contain;display:block">` : '') +
      `<span data-lcs-stagelabel style="text-align:center;font:800 15px/1.05 'Nunito',sans-serif;color:${T.ink}">${(s.label || [s.name]).map(esc).join('<br>')}</span></div>`);
  const row = d.stages.map((s, i) => stage(s, i) + (i < n - 1 ? arrow : '')).join('');
  const rowW = n * BOX + (n - 1) * GAP;
  let back = '';
  if (d.shape === 'cycle') {   // from the bottom of the last step, under the row, up into the bottom of the first
    const x0 = rowW - BOX / 2, x1 = BOX / 2;
    back = `<svg data-lcs-arrow data-lcs-backarrow width="${rowW}" height="26" viewBox="0 0 ${rowW} 26" style="display:block"><path d="M${x0} 0 V14 Q${x0} 20 ${x0 - 6} 20 H${x1 + 6} Q${x1} 20 ${x1} 14 V9" stroke="${T.teal}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M${x1 - 7} 11 L${x1} 1 L${x1 + 7} 11 Z" fill="${T.teal}"/></svg>`;
  }
  return `<div data-lcs-graphic="diagram" data-lcs-shape="${d.shape}" style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 10px 6px;border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF">` +
    `<div data-lcs-dname style="font:700 17px/1.1 'Baloo 2',cursive;color:${T.teal}">${esc(d.name)}</div>` +
    `<div style="display:flex;flex-direction:column;align-items:center"><div data-lcs-stages style="display:flex;align-items:center">${row}</div>${back}</div>` +
    (d.note ? `<div data-lcs-dnote style="font:700 14px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(d.note)}</div>` : '') + `</div>`;
}

/* ------------------------------------------------------------------ the answer parts of a card */
const pill = (text, ok, key, attrs) => `<span ${attrs}${ok ? ' data-lcs-ok="1"' : ''} style="display:inline-block;white-space:nowrap;font:700 14px/1.25 'Nunito',sans-serif;color:${T.ink};padding:0 7px;border:2.5px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px">${text}</span>`;
const CHECK = `<svg width="18" height="18" viewBox="0 0 20 20"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SRCNAME = { map: { graphic: 'map', text: 'text', both: 'both' }, diagram: { graphic: 'diagram', text: 'text', both: 'both' } };
/** "Found in": circle one (level 1) or put a check mark next to one (levels 2 and 3); one row, never wrapped */
function sourceRow(src, key, mode, tick) {
  const opts = SRC.map((s) => tick
    ? `<span data-lcs-srcopt="${s}"${s === src ? ' data-lcs-ok="1"' : ''} style="display:inline-flex;align-items:center;gap:5px;font:700 14px/1 'Nunito',sans-serif;color:${T.ink}"><span data-lcs-tick style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF;line-height:0">${key && s === src ? CHECK : ''}</span>${SRCNAME[mode][s]}</span>`
    : pill(SRCNAME[mode][s], s === src, key, `data-lcs-srcopt="${s}"`)).join('');
  return `<div data-lcs-source data-lcs-want="${src}" style="display:flex;flex-wrap:nowrap;align-items:center;gap:${tick ? 12 : 4}px;white-space:nowrap"><span data-lcs-srclabel style="font:800 13.5px/1.25 'Nunito',sans-serif;color:${T.teal}">Found in:</span>${opts}</div>`;
}
/** a key answer spread over two lines: the first holds the words that fit in n letters */
function splitAt(text, n) { const w = String(text).split(' '); let a = '', i = 0; for (; i < w.length && (a + ' ' + w[i]).length <= n; i++) a += (a ? ' ' : '') + w[i]; return [a, w.slice(i).join(' ')]; }
const symInline = (sym) => `<span style="display:inline-block;vertical-align:middle;margin:-3px 2px 0">${swatch({ sym })}</span>`;

/* ------------------------------------------------------------------ will the page fit? */
// Measured on the rendered pages (2026-11-17, 84 probe pages): the body is 799 px high; a text box is 45 px plus its
// lines; a wide map's box is its grid + 32, a chain diagram 136 (+18 with a note line, +26 for a cycle's way back); a
// card is 75 px (level 1: one line of question, one row of answers) or 82 (levels 2 and 3: one line, one answer line),
// +17.5 a question line, +21.5 a second row of answers, +28 a second answer line; the level-3 task is 74 (map) or 105
// (diagram). Line counts use the 13 px advances (textW) scaled to the font, wide enough never to count too few lines
// (1.02 for the text, 0.98 for questions: 0 of 252 paragraphs and 0 of 448 questions under-counted).
const BODY_H = 799;
const wrapLines = (text, width, px, k) => { let n = 1, cur = 0; const sp = textW(' ') * px / 13 * k; for (const w of String(text).split(' ')) { const ww = textW(w) * px / 13 * k; if (cur && cur + sp + ww > width) { n++; cur = ww; } else cur += (cur ? sp : 0) + ww; } return n; };
function topHeight(t, mode, d) {
  const lines = (width) => t.parts.reduce((s, p) => s + wrapLines(p.join(' '), width, d.font, 1.02), 0), lh = d.font * d.lh;
  if (mode === 'diagram') return 45 + lh * lines(614) + 5 + 136 + (t.diagram.note ? 18 : 0) + (t.diagram.shape === 'cycle' ? 26 : 0);
  const m = t.map;
  if (m.layout !== 'tall') return 45 + lh * lines(614) + 5 + m.gh + 32;
  const text = 45 + lh * lines(580 - m.gw);
  return COMPACT(m) ? Math.max(m.gh + 32, text + 6 + 77) : Math.max(m.gh + 32 + 8 + 64, text);
}
function cardHeight(q, lv, mode) {
  const ql = wrapLines('6. ' + q.q.replace('{SYM}', 'XXXX'), 308, 14, 0.98);
  if (lv === 1) { const w = [q.answer, ...q.wrong].reduce((s, o) => s + textW(o) * 14 / 13 * 0.98 + 19, 0) + 12; return 75 + 17.5 * (ql - 1) + (w <= 296 ? 0 : 21.5); }
  return 82 + 17 * (ql - 1) + ((q.answer.length > 24 || (lv === 3 && mode === 'diagram')) ? 28 : 0);
}
function pageFits(t, mode, lv, qs, d) {
  const h = qs.map((q) => cardHeight(q, lv, mode)), rows = [];
  for (let i = 0; i < h.length; i += 2) rows.push(Math.max(h[i], h[i + 1] || 0));
  if (lv === 3) rows.push(mode === 'map' ? 74 : 105);
  return topHeight(t, mode, d) + 5 + rows.reduce((s, x) => s + x, 0) + 5 * (rows.length - 1) <= BODY_H - 3;
}

function makeInfoText3dType({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('info-text-g3d: unknown mode ' + mode);
  const POOL = mode === 'map' ? MAPS : DIAGRAMS;
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType: 'reading-comprehension',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the texts are English texts (no ${locale} bank)`);
      if (!POOL.length) throw new Error(`${id}: the bank holds no ${mode} text`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const t = rng.sample(POOL, 1)[0];
      const inner = W - 24, cellW = (inner - 12) / 2 - 24;
      // level 3 hides two places of the map (or one step of the diagram)
      let hidden = [];
      if (lv === 3) hidden = mode === 'map' ? t.blanks.slice()
        : [rng.pick(hideableSteps(t, rng)).name];
      const P = poolsOf(t, mode, hidden);
      // a set (and an order) whose cards fit the page under this text and graphic; a set that would push the last
      // row into the footer is drawn again (the estimate is measured, see pageFits)
      let qs = null;
      for (let n = 0; n < 40 && !(qs && pageFits(t, mode, lv, qs, d)); n++) {
        const got = lv === 3 ? pickFour(P, rng, mode) : pickQuestions(P, { graphic: 2, text: 2, both: 2 }, rng, { short: lv === 1, mode });
        if (!got) throw new Error(`${id}: no set of questions for ${t.id} level ${lv}`);
        qs = orderOf(got, rng);
      }
      const at = positionsFor(qs.length, rng);
      const cards = qs.map((q, k) => {
        const wrong = q.wrong;
        const qtext = q.kind === 'key' ? esc(q.q).replace('{SYM}', symInline(q.sym)) : esc(q.q);
        const attrs = `data-lcs-question="${k + 1}" data-lcs-src="${q.src}" data-lcs-kind="${q.kind}" data-lcs-answer="${esc(q.answer)}" data-lcs-uses="${esc(q.uses.join('|'))}"` +
          (q.a ? ` data-lcs-a="${esc(q.a)}"` : '') + (q.b ? ` data-lcs-b="${esc(q.b)}"` : '') + (q.sq ? ` data-lcs-sq="${q.sq}" data-lcs-what="${esc(q.what || '')}"` : '') + (q.kind === 'where' ? ` data-lcs-qplace="${esc(q.place)}"` : '') + (q.kind === 'key' ? ` data-lcs-sym="${esc(q.sym)}"` : '');
        let body = label(num(k + 1) + qtext, 14);
        if (lv === 1) {
          const opts = wrong.slice(); opts.splice(at[k], 0, q.answer);
          body += `<div data-lcs-choices style="display:flex;flex-wrap:wrap;gap:0 6px;padding-left:12px">${opts.map((o, i) => pill(esc(o), i === at[k], key, `data-lcs-choice="${i}"`)).join('')}</div>` + sourceRow(q.src, key, mode, false);
        } else {
          // a long answer (a phrase or a sentence) gets two lines; every answer of level 3 on the diagram page does
          const two = q.answer.length > 24 || (lv === 3 && mode === 'diagram');
          const half = two ? splitAt(q.answer, 30) : [q.answer, ''];
          body += `<div data-lcs-answerlines="${two ? 2 : 1}">` + rule({ w: cellW, h: 28, answer: key ? half[0] : null }) + (two ? rule({ w: cellW, h: 28, answer: key && half[1] ? half[1] : null }) : '') + `</div>` + sourceRow(q.src, key, mode, true);
        }
        return cream(attrs, body, 4, 'justify-content:space-between');
      });
      let task = '';
      if (lv === 3 && mode === 'map') {
        const line = (n, name) => `<div style="flex:1 1 0;min-width:0;display:flex;align-items:flex-end;gap:8px"><span style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;margin-bottom:3px;border-radius:50%;background:${T.coral};color:#FFFFFF;font:800 14px/1 'Nunito',sans-serif">${n}</span><div style="flex:1 1 auto;min-width:0">${rule({ w: inner / 2 - 50, h: 28, answer: key ? name : null })}</div></div>`;
        task = cream('data-lcs-nametask="1"', label(`<b style="font-weight:800;color:${T.teal}">Name the places.</b> Two places on the map show a number instead of a name. Use the text and the map to write their names.`, 14) +
          `<div style="display:flex;gap:22px">${line(1, t.blanks[0])}${line(2, t.blanks[1])}</div>`, 4, 'grid-column:1 / -1');
      }
      if (lv === 3 && mode === 'diagram') {
        const s = t.diagram.stages.find((x) => x.name === hidden[0]);
          const sample = key ? splitAt('Sample answer: ' + s.says, 70) : [null, null];
        task = cream(`data-lcs-steptask="${esc(s.name)}"`, label(`<b style="font-weight:800;color:${T.teal}">The missing step.</b> One step in the diagram is a question mark. Use the text to tell what happens in that step.`, 14) +
          rule({ w: inner, h: 28, answer: sample[0], sample: true }) + rule({ w: inner, h: 28, answer: sample[1] || null, sample: true }) +
          (key ? `<div data-lcs-keynote style="font:700 12.5px/1.2 'Nunito',sans-serif;color:${T.teal}">Accept any answer that tells this step from the text.</div>` : ''), 4, 'grid-column:1 / -1');
      }
      const grid = `<div data-lcs-qgrid style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:5px 12px;align-content:stretch">${cards.join('')}${task}</div>`;
      let top;
      if (mode === 'map') {
        const mb = mapBox(t, { blanks: lv === 3 ? t.blanks : null });
        const frame = `border:2.5px solid ${T.teal};border-radius:16px;background:#FFFFFF`;
        // a tall map beside the text: a short one (Yellowstone) has room for the rose and the key under it; a long one
        // (the Mississippi) leaves them under the text
        top = t.map.layout === 'tall' && !COMPACT(t.map)
          ? `<div data-lcs-toprow style="flex:0 0 auto;display:flex;gap:8px;align-items:stretch"><div data-lcs-graphic="map" style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:8px;padding:4px 8px 6px 4px;${frame}">${mb.fig}${mb.side}</div>` +
            `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column">${textBox(t, d, true)}</div></div>`
          : t.map.layout === 'tall'
          ? `<div data-lcs-toprow style="flex:0 0 auto;display:flex;gap:8px;align-items:stretch"><div data-lcs-graphic="map" style="flex:0 0 auto;display:flex;align-items:center;padding:4px 8px 6px 4px;${frame}">${mb.fig}</div>` +
            `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:6px">${textBox(t, d)}<div data-lcs-mapside style="flex:1 1 auto;display:flex;align-items:center;justify-content:center;padding:4px 6px;${frame}">${mb.side}</div></div></div>`
          : textBox(t, d) + `<div data-lcs-graphic="map" style="flex:0 0 auto;display:flex;align-items:center;justify-content:space-evenly;gap:12px;padding:4px 10px 6px;${frame}">${mb.fig}${mb.side}</div>`;
      } else top = textBox(t, d) + diagramBox(t, { blank: hidden[0] || null });
      return {
        // no joined letters: the font joins fi and ff (an inline font shorthand resets the ligature setting, so the rule
        // stands before the root and reaches every element below it)
        bodyHtml: `<style>[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style><div data-ws-content data-lcs-info3d="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} data-lcs-noliga="1" data-lcs-hidden="${esc(hidden.join('|'))}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px;min-height:0">` +
          top + grid + `</div>`,
        meta: { text: t.id, items: qs.map((q) => t.id + ': ' + q.q) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-info3d]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsInfo3d.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const hidden = (root.dataset.lcsHidden || '').split('|').filter(Boolean);
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        { const joined = [...root.querySelectorAll('span, div')].filter((e) => e.children.length === 0 && /f[fil]/.test(e.textContent) && getComputedStyle(e).fontVariantLigatures !== 'none'); if (joined.length) fails.push('ligatures are on in ' + joined.length + ' places: fi and ff print as one joined letter (the font shorthand resets them: the page needs its rule)'); }
        const inside = (e, box, pad = 0.5) => { const r = R(e), b = R(box); return r.left >= b.left - pad && r.right <= b.right + pad && r.top >= b.top - pad && r.bottom <= b.bottom + pad; };
        const overlap = (a, b, pad = 0) => { const p = R(a), q = R(b); return p.left < q.right - pad && q.left < p.right - pad && p.top < q.bottom - pad && q.top < p.bottom - pad; };
        const fs = (e) => parseFloat(getComputedStyle(e).fontSize);
        const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        // ---- the text
        const box = document.querySelector('[data-lcs-gtext]');
        const n = +box.dataset.lcsWords;
        if (n < 120 || n > 160) fails.push(`the text has ${n} words`);
        const parts = [...box.querySelectorAll('[data-lcs-part]')];
        if (parts.length !== 3 || [...box.querySelectorAll('[data-lcs-paratab]')].map((e) => e.dataset.lcsParatab).join('') !== '123') fails.push('the paragraphs are not three, numbered 1 to 3');
        parts.forEach((p, i) => { if (fs(p.querySelector('[data-lcs-partbody]')) < 14.5) fails.push('paragraph ' + (i + 1) + ' is printed too small'); });
        box.querySelectorAll('*').forEach((e) => { if (R(e).width && !inside(e, box)) fails.push('something leaves the text box'); });
        // ---- the page
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
        const graphic = document.querySelector('[data-lcs-graphic]');
        if (!graphic || graphic.dataset.lcsGraphic !== mode) fails.push('no ' + mode + ' on the page');
        // (inside an svg its own box clips: a river that flows in from beyond the map is cut at the map's edge)
        [graphic, document.querySelector('[data-lcs-mapside]')].filter(Boolean).forEach((g) => g.querySelectorAll('*').forEach((e) => { if (e.tagName.toLowerCase() !== 'svg' && e.closest('svg')) return; if (R(e).width && !inside(e, g)) fails.push('something leaves the ' + mode); }));
        // ---- the map
        const cellAt = (area, e) => { const a = R(area), r = R(e), x = (r.left + r.right) / 2 - a.left, y = (r.top + r.bottom) / 2 - a.top, cols = +area.dataset.lcsCols, rows = +area.dataset.lcsRows, cw = a.width / cols, ch = a.height / rows;
          const c = Math.floor(x / cw), rr = Math.floor(y / ch); return { cell: 'ABCDEFGH'[c] + (rr + 1), c, r: rr, x, y, margin: Math.min(x - c * cw, (c + 1) * cw - x, y - rr * ch, (rr + 1) * ch - y) }; };
        const area = document.querySelector('[data-lcs-maparea]');
        const marks = [...document.querySelectorAll('[data-lcs-maparea] [data-lcs-place]')];
        // what a place really covers: the drawn symbol (not its 24 px svg box), or the picture's box
        const ink = (m) => { const e = m.tagName.toLowerCase() === 'img' ? null : m.querySelector('circle, path'); if (e) return e; return m; };
        const covers = (l, m, pad = 1) => { const p = R(l), q = R(ink(m)); return p.left < q.right + pad && q.left < p.right + pad && p.top < q.bottom + pad && q.top < p.bottom + pad; };
        const markOf = (name) => marks.find((m) => m.dataset.lcsPlace === name);
        /** the box of a square of the grid, in page px */
        const squareBox = (cell) => { const a = R(area), cols = +area.dataset.lcsCols, rows = +area.dataset.lcsRows, cw = a.width / cols, ch = a.height / rows, c = 'ABCDEFGH'.indexOf(cell[0]), r = +cell.slice(1) - 1; return { left: a.left + c * cw, top: a.top + r * ch, right: a.left + (c + 1) * cw, bottom: a.top + (r + 1) * ch }; };
        /** points along every drawn line and outline of the map (the rivers, railroads, trails and the areas' edges) */
        const strokes = () => [...document.querySelectorAll('[data-lcs-mapline], [data-lcs-area][data-lcs-outline]')].flatMap((ln) => { const L = ln.getTotalLength(), M = ln.ownerSVGElement.getScreenCTM(), n = Math.max(40, Math.ceil(L / 3));
          return Array.from({ length: n + 1 }, (_, k) => { const p = ln.getPointAtLength(L * k / n); return { x: M.a * p.x + M.c * p.y + M.e, y: M.b * p.x + M.d * p.y + M.f, what: ln.dataset.lcsMapline || ln.dataset.lcsArea }; }); });
        if (mode === 'map') {
          if (!area) return fails.concat('no map area');
          const cols = +area.dataset.lcsCols, rows = +area.dataset.lcsRows;
          if (document.querySelectorAll('[data-lcs-colname]').length !== cols || document.querySelectorAll('[data-lcs-rowname]').length !== rows) fails.push('the grid is not lettered and numbered');
          document.querySelectorAll('[data-lcs-colname], [data-lcs-rowname]').forEach((e) => { if (fs(e) < 13) fails.push('a grid letter under 13 px'); });
          { const L = [...document.querySelectorAll('[data-lcs-compass] [data-lcs-dirletter]')], at = (d) => R(L.find((e) => e.dataset.lcsDirletter === d) || document.body), cx = (r) => (r.left + r.right) / 2, cy = (r) => (r.top + r.bottom) / 2;
            if (L.map((e) => e.dataset.lcsDirletter).join('') !== 'NESW' || !(cy(at('N')) < cy(at('S')) && cx(at('W')) < cx(at('E'))) || L.some((e) => fs(e) < 13)) fails.push('no compass rose with N, E, S and W in their places'); }
          const cells = new Set();
          marks.forEach((m) => { const c = cellAt(area, m), pic = m.tagName.toLowerCase() === 'img';
            if (c.cell !== m.dataset.lcsCell) fails.push(`${m.dataset.lcsPlace} is drawn in square ${c.cell}, keyed ${m.dataset.lcsCell}`);
            { const b = squareBox(c.cell), r = R(pic ? m : ink(m)); if (r.left < b.left + 1.5 || r.right > b.right - 1.5 || r.top < b.top + 1.5 || r.bottom > b.bottom - 1.5) fails.push(`${m.dataset.lcsPlace} is not wholly inside square ${c.cell}`); }
            if (cells.has(c.cell)) fails.push('two places in square ' + c.cell); cells.add(c.cell); });
          const filled = [...marks, ...document.querySelectorAll('[data-lcs-area][data-lcs-named]')].map((e) => cellAt(area, e));   // a named lake fills its square too
          for (let c = 0; c < cols; c++) if (!filled.some((x) => x.c === c)) fails.push(`column ${'ABCDEFGH'[c]} holds no place`);
          for (let r = 0; r < rows; r++) if (!filled.some((x) => x.r === r)) fails.push(`row ${r + 1} holds no place`);
          const labels = [...document.querySelectorAll('[data-lcs-maplabel]')], badges = [...document.querySelectorAll('[data-lcs-blank]')].sort((a, b) => a.dataset.lcsBlank - b.dataset.lcsBlank);
          const pts = strokes();
          // every name WHOLLY inside the square of its symbol, 8 px from its lines, touching nothing
          [...labels, ...badges].forEach((l, i, all) => {
            const nm = l.dataset.lcsMaplabel || 'number ' + l.dataset.lcsBlank, r = R(l);
            const sq = l.dataset.lcsLabelcell || (markOf(l.dataset.lcsBlankname) ? cellAt(area, markOf(l.dataset.lcsBlankname)).cell : cellAt(area, l).cell);
            if (l.dataset.lcsMaplabel && fs(l) < 13) fails.push(`the name ${nm} is under 13 px`);
            if (!l.dataset.lcsArealabel && l.dataset.lcsMaplabel) { const m = markOf(l.dataset.lcsMaplabel); if (!m || cellAt(area, m).cell !== sq) fails.push(`the name ${nm} is not in the square of its place`); }
            if (sq) { const b = squareBox(sq); if (r.left < b.left + 7.5 || r.right > b.right - 7.5 || r.top < b.top + 7.5 || r.bottom > b.bottom - 7.5) fails.push(`the name ${nm} is not wholly inside square ${sq}, 8 px from its lines`); }
            all.slice(i + 1).forEach((o) => { if (overlap(l, o, -2)) fails.push(`${nm} and ${o.dataset.lcsMaplabel || 'a number'} touch`); });
            marks.forEach((m) => { if (covers(l, m)) fails.push(`${nm} touches the place ${m.dataset.lcsPlace}`); });
            const hit = pts.find((p) => p.x > r.left - 1 && p.x < r.right + 1 && p.y > r.top - 1 && p.y < r.bottom + 1);
            if (hit) fails.push(`${nm} touches the ${hit.what} line`);
            // no name stands inside another area that has a name (a lake)
            document.querySelectorAll('[data-lcs-area][data-lcs-named]').forEach((a) => { if (a.dataset.lcsArea === (l.dataset.lcsMaplabel || l.dataset.lcsBlankname)) return; const P = new DOMPoint((r.left + r.right) / 2, (r.top + r.bottom) / 2).matrixTransform(a.getScreenCTM().inverse()); if (a.isPointInFill(P)) fails.push(`${nm} stands in the ${a.dataset.lcsArea}`); });
          });
          document.querySelectorAll('[data-lcs-keyentry]').forEach((k) => { if (fs(k) < 13) fails.push('a key entry under 13 px'); });
          if (lv === 3) {
            if (badges.length !== 2 || badges.map((b) => b.dataset.lcsBlank).join('') !== '12' || badges.map((b) => b.dataset.lcsBlankname).join('|') !== hidden.join('|')) fails.push('level 3 does not hide two places behind the numbers 1 and 2');
            hidden.forEach((h) => { if (labels.some((l) => l.dataset.lcsMaplabel === h)) fails.push(`the hidden place ${h} still shows its name`); });
            const task = document.querySelector('[data-lcs-nametask]');
            const tl = task ? [...task.querySelectorAll('[data-lcs-line]')] : [];
            if (tl.length !== 2) fails.push('the naming task has not two lines');
            if (isKey) tl.forEach((l, i) => { if (l.dataset.lcsAnswer !== hidden[i]) fails.push(`line ${i + 1} of the naming task is keyed ${l.dataset.lcsAnswer}`); });
          } else if (badges.length || document.querySelector('[data-lcs-nametask]')) fails.push('numbers instead of names below level 3');
        }
        // ---- the diagram
        if (mode === 'diagram') {
          const st = [...document.querySelectorAll('[data-lcs-stage]')], arrows = document.querySelectorAll('[data-lcs-arrow]').length;
          const cyc = graphic.dataset.lcsShape === 'cycle';
          if (st.length < 3 || st.length > 4 || arrows !== st.length - 1 + (cyc ? 1 : 0)) fails.push(`${st.length} steps and ${arrows} arrows`);
          st.forEach((s, i) => { const lab = s.querySelector('[data-lcs-stagelabel]'); if (lab && fs(lab) < 14) fails.push('a step name under 14 px'); if (s.dataset.lcsStage !== String(i + 1)) fails.push('the steps are out of order');
            s.querySelectorAll('*').forEach((e) => { if (R(e).width && !inside(e, s)) fails.push('something leaves step ' + (i + 1)); }); });
          const blank = st.filter((s) => s.dataset.lcsStageblank);
          if (lv === 3) {
            if (blank.length !== 1 || blank[0].dataset.lcsStageblank !== hidden[0] || blank[0].querySelector('img')) fails.push('level 3 does not hide one step behind a question mark');
            const task = document.querySelector('[data-lcs-steptask]');
            if (!task || task.dataset.lcsSteptask !== hidden[0] || task.querySelectorAll('[data-lcs-line]').length !== 2) fails.push('the missing-step task has not two lines for the hidden step');
          } else if (blank.length || document.querySelector('[data-lcs-steptask]')) fails.push('a missing step below level 3');
        }
        // ---- the questions
        const qs = [...document.querySelectorAll('[data-lcs-question]')];
        const srcs = qs.map((q) => q.dataset.lcsSrc);
        const want = lv === 3 ? 4 : 6;
        if (qs.length !== want) fails.push(`${qs.length} questions (wanted ${want})`);
        const count = (s) => srcs.filter((x) => x === s).length;
        if (lv < 3 ? ['graphic', 'text', 'both'].some((s) => count(s) !== 2) : ['graphic', 'text', 'both'].some((s) => count(s) < 1)) fails.push('the sources of the questions are ' + srcs.join(','));
        const sidx = srcs.map((s) => ['graphic', 'text', 'both'].indexOf(s));
        const patterned = (s, cols = 2) => { const bad = (a) => a.some((x, i) => i >= 2 && ((x === a[i - 1] && x === a[i - 2]) || (Math.abs(x - a[i - 1]) === 1 && x - a[i - 1] === a[i - 1] - a[i - 2])))
          || (a.length >= 4 && a.length % 2 === 0 && a.every((x, i) => i % 2 === 0 || x === a[i - 1])) || (a.length >= 4 && a.every((x, i) => i < 2 || x === a[i - 2])) || (a.length >= 6 && a.every((x, i) => i < 3 || x === a[i - 3]))
          || (a.length >= 4 && (a.join('') === [...a].sort().join('') || a.join('') === [...a].sort().reverse().join('')));
          if (bad(s)) return true; for (let c = 0; c < cols; c++) { const col = s.filter((_, i) => i % cols === c); if (col.length >= 3 && bad(col)) return true; } return false; };
        if (patterned(sidx)) fails.push('the sources stand in a pattern: ' + sidx.join(''));
        if (qs.filter((q) => /^[A-H][1-9]$/.test(q.dataset.lcsAnswer)).length > qs.length - 2) fails.push('fewer than two questions that are not "which square"');
        if (new Set(qs.map((q) => norm(q.dataset.lcsAnswer))).size !== qs.length) fails.push('two questions share an answer');
        const sets = [...document.querySelectorAll('[data-lcs-choices]')];
        const place = sets.map((c) => [...c.querySelectorAll('[data-lcs-choice]')].findIndex((e) => e.dataset.lcsOk));
        qs.forEach((q, i) => {
          const qb = R(q);
          q.querySelectorAll('[data-lcs-label], [data-lcs-choice], [data-lcs-srcopt], [data-lcs-line], [data-lcs-tick], svg, img').forEach((e) => { const r = R(e); if (r.width && (r.right > qb.right + 0.5 || r.bottom > qb.bottom + 0.5 || r.left < qb.left - 0.5)) fails.push(`something leaves question ${i + 1}`); });
          const lab = q.querySelector('[data-lcs-label]'); if (lab && fs(lab) < 14) fails.push(`question ${i + 1} is printed under 14 px`);
          const src = q.querySelector('[data-lcs-source]'), opts = src ? [...src.querySelectorAll('[data-lcs-srcopt]')] : [];
          if (opts.length !== 3 || opts.map((o) => o.dataset.lcsSrcopt).join() !== 'graphic,text,both') fails.push(`question ${i + 1} does not offer the three sources`);
          const ok = opts.filter((o) => o.dataset.lcsOk);
          if (ok.length !== 1 || ok[0].dataset.lcsSrcopt !== q.dataset.lcsSrc) fails.push(`the source of question ${i + 1} is keyed wrong`);
          opts.forEach((o) => { if (fs(o) < 13.5) fails.push('a source under 13.5 px'); const tick = o.querySelector('[data-lcs-tick]'); if (tick && (R(tick).width < 22 || (isKey ? !!tick.querySelector('svg') !== !!o.dataset.lcsOk : tick.querySelector('svg')))) fails.push(`a check box of question ${i + 1} is wrong`); });
          const ch = q.querySelector('[data-lcs-choices]'), lines = q.querySelectorAll('[data-lcs-line]');
          if (lv === 1) {
            const all = ch ? [...ch.querySelectorAll('[data-lcs-choice]')] : [];
            if (lines.length || opts.some((o) => o.querySelector('[data-lcs-tick]')) || all.length !== 3 || all.filter((e) => e.dataset.lcsOk).length !== 1 || new Set(all.map((e) => norm(e.textContent))).size !== 3) fails.push(`question ${i + 1} has not three answers to circle and the sources to circle`);
            const okc = all.find((e) => e.dataset.lcsOk); if (okc && okc.textContent.trim() !== q.dataset.lcsAnswer) fails.push(`question ${i + 1} is keyed to "${okc.textContent.trim()}"`);
            all.forEach((e) => { if (fs(e) < 14) fails.push('an answer under 14 px'); });
          } else {
            const al = q.querySelector('[data-lcs-answerlines]'), wantLines = al ? +al.dataset.lcsAnswerlines : 0;
            if (ch || !wantLines || lines.length !== wantLines || opts.some((o) => !o.querySelector('[data-lcs-tick]'))) fails.push(`question ${i + 1} has not its answer lines and three boxes`);
            if (wantLines === 1 && q.dataset.lcsAnswer.length > 24) fails.push(`question ${i + 1} gives a long answer one line`);
            if (isKey && [...lines].map((l) => l.dataset.lcsAnswer || '').filter(Boolean).join(' ') !== q.dataset.lcsAnswer) fails.push(`the lines of question ${i + 1} are keyed ${[...lines].map((l) => l.dataset.lcsAnswer).join(' / ')}`);
            lines.forEach((l) => { if (R(l).height < 27.5) fails.push('a writing line under 28 px'); if (R(l).width < 240) fails.push(`a writing line of ${Math.round(R(l).width)} px`);
              const kt = l.querySelector('[data-lcs-keytext]'); if (kt && (R(kt).right > R(l).right + 0.5 || fs(kt) < 9)) fails.push('a key answer does not fit its line'); });
          }
          // the graphic questions of the map are read off the drawn map
          const kind = q.dataset.lcsKind, ans = q.dataset.lcsAnswer;
          if (mode === 'map' && area) {
            if (kind === 'square' || kind === 'where') { const m = markOf(q.dataset.lcsA || q.dataset.lcsQplace); if (!m || cellAt(area, m).cell !== ans) fails.push(`question ${i + 1}: ${q.dataset.lcsA || q.dataset.lcsQplace} is not drawn in square ${ans}`); }
            if (kind === 'whatin') { const inSq = marks.filter((m) => cellAt(area, m).cell === q.dataset.lcsSq); if (inSq.length !== 1 || inSq[0].dataset.lcsPlace !== ans || inSq[0].dataset.lcsKind !== q.dataset.lcsWhat) fails.push(`question ${i + 1}: square ${q.dataset.lcsSq} holds ${inSq.map((m) => m.dataset.lcsPlace).join(', ') || 'nothing'} of the kind ${q.dataset.lcsWhat}`);
              const b = squareBox(q.dataset.lcsSq); if (strokes().some((p) => document.querySelector(`[data-lcs-area="${p.what}"][data-lcs-named]`) && p.x > b.left && p.x < b.right && p.y > b.top && p.y < b.bottom)) fails.push(`question ${i + 1}: square ${q.dataset.lcsSq} also holds a named area`); }
            if (kind === 'dir') { const a = markOf(q.dataset.lcsA), b = markOf(q.dataset.lcsB); if (!a || !b) fails.push(`question ${i + 1}: a place is not drawn`); else {
              const A = cellAt(area, a), B = cellAt(area, b), ang = (Math.atan2(A.x - B.x, B.y - A.y) * 180 / Math.PI + 360) % 360, want = { north: 0, east: 90, south: 180, west: 270 }[ans], off = Math.min(Math.abs(ang - want), 360 - Math.abs(ang - want));
              if (!(off <= 12.5) || ((ans === 'east' || ans === 'west') ? A.r !== B.r : A.c !== B.c)) fails.push(`question ${i + 1}: ${q.dataset.lcsA} is drawn ${ang.toFixed(0)} degrees from ${q.dataset.lcsB}, keyed ${ans}`); } }
            if (kind === 'key') { const k = document.querySelector(`[data-lcs-keyentry="${q.dataset.lcsSym}"]`); if (!k || k.dataset.lcsKeymean !== ans) fails.push(`question ${i + 1}: the key does not say ${ans}`); }
          }
          if (lv === 3 && hidden.some((h) => (q.dataset.lcsUses || '').split('|').includes(h))) fails.push(`question ${i + 1} asks about a hidden ${mode === 'map' ? 'place' : 'step'}`);
        });
        if (lv === 1) {
          if (sets.length !== qs.length) fails.push('not one set of answers for every question');
          if (new Set(place).size < 3 || patterned(place)) fails.push('the right answers stand in a pattern: ' + place.join(''));
        }
        return fails;
      });
    },
  };
}

module.exports = { makeInfoText3dType, faultsOf, poolsOf, cellOf, directionOf, MAPS, DIAGRAMS, LEVELS };
