/**
 * pt-scene.js — compose one Picture Tracing page body from a SCENE spec (data/b9/scenes.js).
 *
 *   await composeScene(scene, opts) → { svg, placed:[{ src, box, render }], lines, problems:[…] }
 *
 * A scene is a picture in one place (operator 2026-10-21: "original scenes, not similar"), authored in page px on the
 * body box W × H (675 × H; the shell body is 733-766 px tall, a page stack 620-740):
 *   items:  [{ src: 'theme bw/noun', x, y, h | w, anchor?, flip?, render?, style? }]   library drawings, back to front
 *           render 'guide' (default: traced, dashed) · 'model' (the ORIGINAL drawing, solid, to look at) ·
 *           'solid' (the traced lines drawn solid) · 'half' (left half solid, right half guide; see `split`)
 *   motifs: [{ m: 'cloud', a: [cx, y, w], render?, style? }]   lib/pt-motifs.js elements I draw myself
 *   style:  the page's guide style (P1..P4) unless an item/motif names its own
 *   frame:  optional rounded frame around the scene ({ r, inset }) drawn SOLID (it is chrome, not a thing to trace)
 *   decor:  optional solid scene elements (a motif drawn as ink, e.g. a horizon a mixed face leaves solid)
 * Every placed box is checked against the body (cut by the edge) and against each other item (overlap beyond `touch`
 * when the scene does not ask for it) — problems are RETURNED, the caller decides (the family gate refuses them).
 */
'use strict';
const path = require('path');
const { traceDrawing } = require('./pt-trace.js');
const R = require('./pt-render.js');
const M = require('./pt-motifs.js');

const LIB = path.join(__dirname, '..', 'cache', 'themes');
const cache = new Map();
async function traceOf(rel) {
  if (!cache.has(rel)) cache.set(rel, traceDrawing(path.join(LIB, rel + '@3x.webp')));
  return cache.get(rel);
}

/** split every polyline by a point predicate; keep the runs where keep(p) is true */
function clipBy(placed, keep) {
  const out = [];
  for (const ln of placed.lines) {
    let cur = [], broke = false;
    for (const p of ln.pts) { if (keep(p)) cur.push(p); else { broke = true; if (cur.length > 1) out.push({ pts: cur, closed: false }); cur = []; } }
    if (cur.length > 1) out.push({ pts: cur, closed: ln.closed && !broke });
  }
  return { ...placed, lines: out };
}
function clipHalf(placed, xSplit, keepLeft) {
  // split every polyline at x = xSplit; keep the part on one side (a mirror / finish face)
  const out = [];
  for (const ln of placed.lines) {
    let cur = [];
    const inside = (p) => (keepLeft ? p[0] <= xSplit : p[0] >= xSplit);
    for (let i = 0; i < ln.pts.length; i++) {
      const p = ln.pts[i];
      if (inside(p)) cur.push(p);
      else { if (cur.length > 1) out.push({ pts: cur, closed: false }); cur = []; }
    }
    if (cur.length > 1) out.push({ pts: cur, closed: ln.closed && cur.length === ln.pts.length });
  }
  return { ...placed, lines: out };
}

/** the page-px mask of a placed library drawing's body (what it hides behind it) */
function itemMask(tr, pl, it, W, H, occ) {
  const b = tr.inkBox, s = pl.s, left = pl.box.x0, top = pl.box.y0;
  const X0 = Math.max(0, Math.floor(pl.box.x0)), X1 = Math.min(W - 1, Math.ceil(pl.box.x1));
  const Y0 = Math.max(0, Math.floor(pl.box.y0)), Y1 = Math.min(H - 1, Math.ceil(pl.box.y1));
  for (let py = Y0; py <= Y1; py++) for (let px = X0; px <= X1; px++) {
    const wx = Math.round(it.flip ? b.x1 - (px + 0.5 - left) / s : b.x0 + (px + 0.5 - left) / s);
    const wy = Math.round(b.y0 + (py + 0.5 - top) / s);
    if (wx < 0 || wy < 0 || wx >= tr.W || wy >= tr.H) continue;
    if (tr.body[wy * tr.W + wx]) occ[py * W + px] = 1;
  }
}
/** fill a closed polyline into the mask (even-odd scanline) */
function polyMask(pts, W, H, occ) {
  let y0 = 1e9, y1 = -1e9; for (const [, y] of pts) { if (y < y0) y0 = y; if (y > y1) y1 = y; }
  for (let py = Math.max(0, Math.floor(y0)); py <= Math.min(H - 1, Math.ceil(y1)); py++) {
    const yc = py + 0.5, xs = [];
    for (let i = 0; i < pts.length - 1; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1]; if ((ay <= yc) !== (by <= yc)) xs.push(ax + (yc - ay) / (by - ay) * (bx - ax)); }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) for (let px = Math.max(0, Math.ceil(xs[k] - 0.5)); px <= Math.min(W - 1, Math.floor(xs[k + 1] - 0.5)); px++) occ[py * W + px] = 1;
  }
}
/** cut every polyline where it runs under the occluder mask (things in FRONT hide what is behind them) */
function clipByMask(lines, occ, W, H) {
  const hidden = (p) => { const x = Math.round(p[0]), y = Math.round(p[1]); return x >= 0 && y >= 0 && x < W && y < H && occ[y * W + x] === 1; };
  const out = [];
  // ⚠ test the line, not its vertices: a straight motif line is TWO points, so a horizon behind a sail was never cut
  // (sv + it panels, 2026-10-22) — resample every segment to ≤ 2 px before testing
  const dense = (pts) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2); for (let k = 1; k <= n; k++) o.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); } return o; };
  for (const ln0 of lines) {
    const ln = { pts: ln0.pts.length > 1 ? dense(ln0.pts) : ln0.pts, closed: ln0.closed };
    let cur = [], any = false;
    for (const p of ln.pts) { if (hidden(p)) { any = true; if (cur.length > 1) out.push({ pts: cur, closed: false }); cur = []; } else cur.push(p); }
    if (cur.length > 1) out.push({ pts: cur, closed: ln.closed && !any });
  }
  return out;
}

async function composeScene(scene, opts = {}) {
  const W = scene.W || 675, H = scene.H || 716;
  const style = scene.style || 'P2';
  const problems = [], placed = [];
  // 1 every element, back to front: motifs, then items (an entry may carry z to move it; ties keep the authored order)
  const els = [];
  (scene.motifs || []).forEach((mo, i) => els.push({ kind: 'motif', spec: mo, z: mo.z != null ? mo.z : -1000 + i }));
  (scene.items || []).forEach((it, i) => els.push({ kind: 'item', spec: it, z: it.z != null ? it.z : i }));
  els.sort((p, q) => p.z - q.z);
  for (const e of els) {
    if (e.kind === 'motif') {
      const mo = e.spec;
      const fn = mo.m === 'shape' ? M.shapes[mo.shape] : mo.m.split('.').reduce((o, k) => (o ? o[k] : undefined), M);
      if (!fn) { problems.push('unknown motif ' + (mo.shape || mo.m)); e.lines = []; continue; }
      e.lines = [].concat(fn(...mo.a)); e.blobs = [];
      // a motif never leaves the body (a path band's edges ran 27 px below the page, 2026-10-22)
      e.lines = clipBy({ lines: e.lines }, (q) => q[0] >= 2 && q[0] <= W - 2 && q[1] >= 2 && q[1] <= H - 2).lines;
      e.box = bboxOf(e.lines); e.src = 'motif:' + (mo.shape || mo.m);
    } else {
      const it = e.spec;
      e.tr = await traceOf(it.src);
      if (it.axisX != null) {
        // F19 "the other half": the drawing's MEASURED symmetry axis (data/pt/symmetry.json, work px) lands on axisX,
        // and the split is that axis — never the ink-box centre (a hand-drawn picture is rarely centred on its box)
        const SYM = require('../data/pt/symmetry.json'); const sy = SYM[it.src];
        if (!sy) { problems.push(it.src + ': no measured symmetry axis'); }
        else {
          const b = e.tr.inkBox, ih = b.y1 - b.y0 + 1, iw = b.x1 - b.x0 + 1, sc = it.h ? it.h / ih : it.w / iw;
          it.x = it.axisX - (sy.axis - (b.x0 + b.x1) / 2) * sc; it.split = it.axisX; it.symP95 = sy.p95 * sc; it.symMax = sy.max * sc;
        }
      }
      const pl = R.placeTrace(e.tr, it);
      e.lines = pl.lines; e.blobs = pl.blobs; e.box = pl.box; e.pl = pl; e.src = it.src;
    }
  }
  // 2 occlusion, front to back
  const occ = new Uint8Array(W * H);
  for (let k = els.length - 1; k >= 0; k--) {
    const e = els[k];
    if (!(e.spec.occlude === false) && scene.occlusion !== false) e.lines = clipByMask(e.lines, occ, W, H);
    if (e.kind === 'item' && e.spec.hides !== false && (e.spec.render || 'guide') !== 'model') {
      if (e.spec.halo) {                                   // a knockout halo: everything behind stops `halo` px short of it
        const m = new Uint8Array(W * H); itemMask(e.tr, e.pl, e.spec, W, H, m);
        const g = require('./cbn-lineart.js').dilate(m, W, H, e.spec.halo);
        for (let i = 0; i < W * H; i++) if (g[i]) occ[i] = 1;
      } else itemMask(e.tr, e.pl, e.spec, W, H, occ);
    }
    if (e.kind === 'motif' && e.spec.hides) for (const l of e.lines) if (l.closed) polyMask(l.pts, W, H, occ);
  }
  // 3 draw, back to front
  const parts = [];
  if (scene.frame) {
    const i = scene.frame.inset || 2;
    parts.push(R.solidPaths({ lines: M.roundRect(i, i, W - 2 * i, H - 2 * i, scene.frame.r || 18), blobs: [] }, scene.frame.w || 2.4, scene.frame.colour || '#222'));
  }
  // the solid STRUCTURE layer (design B §0.2: frames, panels, shelves, belts — page architecture, never a guide):
  // a motif drawn solid ({ m, a }) or raw path data ({ d }); optional fill, dash (the #12 axis), width, colour.
  // decor with front: true is drawn after the scene (a porthole rim over the sea), the rest before it.
  const decorBoxes = [];
  const decorSvg = (d) => {
    const w = d.w || 2.5, col = d.colour || '#1a1a1a';
    const style = `fill="${d.fill || 'none'}" stroke="${d.stroke === false ? 'none' : col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${d.dash ? ` stroke-dasharray="${d.dash}"` : ''}`;
    if (d.d) { const n = (d.d.match(/-?[\d.]+/g) || []).map(Number); for (let i = 0; i + 1 < n.length; i += 2) decorBoxes.push([n[i], n[i + 1]]); return `<path d="${d.d}" ${style}/>`; }
    const fn = d.m === 'shape' ? M.shapes[d.shape] : d.m.split('.').reduce((o, k) => (o ? o[k] : undefined), M);
    if (!fn) { problems.push('unknown decor ' + (d.shape || d.m)); return ''; }
    let lines = [].concat(fn(...d.a));
    if (!d.front && d.clip !== false && !d.fill) lines = clipByMask(lines, occ, W, H);   // a shelf passes BEHIND what stands on it
    for (const l of lines) for (const p of l.pts) decorBoxes.push(p);
    return lines.map((l) => `<path d="${R.dPath(l.pts, l.closed)}" ${style}/>`).join('');
  };
  for (const d of (scene.decor || []).filter((x) => !x.front)) parts.push(decorSvg(d));
  for (const e of els) {
    const sp = e.spec, render = sp.render || 'guide', st = sp.style || style;
    const pl = { lines: e.lines, blobs: e.blobs };
    if (render === 'model') parts.push(R.modelImage(sp.src, e.tr, sp));
    else if (render === 'solid') parts.push(R.solidPaths(pl, (e.kind === 'motif' ? sp.w : sp.lineW) || 2.6));   // ⚠ an item's `w` is its WIDTH, never a stroke width (a 320 px pen drew the trees as black discs)
    else if (render === 'half') {
      const mid = sp.split != null ? sp.split : (e.box.x0 + e.box.x1) / 2;
      parts.push(R.solidPaths(clipHalf({ lines: e.lines, blobs: [] }, mid, true), sp.solidW || 2.6));
      e.traceLines = clipHalf({ lines: e.lines }, mid, false).lines;
      parts.push(R.guidePaths({ lines: e.traceLines, blobs: e.blobs }, st, { band: sp.band || scene.band }));
    } else if (render === 'part') {
      // #11 "finish the picture": the lines inside part:{x0,y0,x1,y1} (fractions of the ink box) are the missing part
      // (dashed); every other line is the finished picture (solid)
      const b = e.box, P = sp.part;
      const X0 = b.x0 + P.x0 * (b.x1 - b.x0), X1 = b.x0 + P.x1 * (b.x1 - b.x0), Y0 = b.y0 + P.y0 * (b.y1 - b.y0), Y1 = b.y0 + P.y1 * (b.y1 - b.y0);
      const inside = (p) => p[0] >= X0 && p[0] <= X1 && p[1] >= Y0 && p[1] <= Y1;
      // WHOLE lines go to the part (≥ 60 % of their points inside): a box edge cutting a line in two made half a door
      // frame dashed (2026-10-22) — a missing part is a wheel, an ear, a handle, never an arbitrary half-line
      const isPart = (l) => l.pts.filter(inside).length >= 0.6 * l.pts.length;
      parts.push(R.solidPaths({ lines: e.lines.filter((l) => !isPart(l)), blobs: e.blobs }, sp.solidW || 2.6));
      e.traceLines = e.lines.filter(isPart);
      parts.push(R.guidePaths({ lines: e.traceLines, blobs: [] }, st, { band: sp.band || scene.band }));
    } else if (e.kind === 'motif') {
      if (render === 'solid') parts.push(R.solidPaths(pl, sp.lineW || sp.w || 2.6)); else parts.push(R.guidePaths(pl, st, { band: sp.band || scene.band, start: sp.start }));
    } else {
      const start = sp.start || scene.start;
      const contour = start === 'contour' || start === 'top';
      parts.push(R.guidePaths(pl, st, { band: sp.band || scene.band, start: contour ? null : start, outline: sp.outline }));
      if (contour) parts.push(R.contourMarker(e.tr, sp, typeof st === 'string' ? R.STYLES[st] : st, undefined, start === 'top' ? 90 : 30));
    }
    placed.push({ src: e.src, box: e.box, render, s: e.pl && e.pl.s, item: sp, motif: e.kind === 'motif' });
  }
  for (const p of placed) {
    const b = p.box;
    if (!p.motif && (b.x0 < 4 || b.y0 < 4 || b.x1 > W - 4 || b.y1 > H - 4)) problems.push(p.src + ' cut by the body edge');
  }
  for (const d of (scene.decor || []).filter((x) => x.front)) parts.push(decorSvg(d));
  // 4 the page measurements the family gate asserts against the pedagogy contract §1 (band table)
  const metrics = measure(els, scene, W, H);
  if (decorBoxes.length) {                                   // the page's fill includes its structure (porthole, shelves)
    const E = metrics.extent;
    for (const [x, y] of decorBoxes) { if (y < E.y0) E.y0 = Math.round(y); if (y > E.y1) E.y1 = Math.round(y); if (x < E.x0) E.x0 = Math.round(x); if (x > E.x1) E.x1 = Math.round(x); }
    metrics.fill = +((E.y1 - E.y0) / H).toFixed(3);
  }
  // F17 word lanes: the platform's school-hand dashed word lanes (primitives/trace-path.js strokeWordLane), nested
  for (const wd of scene.words || []) {
    const { strokeWordLane } = require('../primitives/trace-path.js');
    const lane = strokeWordLane({ text: wd.text, w: wd.w, h: wd.h, glyphH: wd.glyphH || 40, reps: 1, stack: true, modelless: true, align: 'center' });
    // the letters take the page's guide grey (the lane primitive's tan #C8BFAE printed faint beside dark picture guides —
    // the word is half the lesson); the writing-line rules keep the platform colour
    const ink = (R.STYLES[scene.style] || R.STYLES.P3).colour;
    const lsvg = lane.svg.replace(/<(?!line\b)[a-z]+\b[^>]*>/g, (t) => t.replace(/stroke="#C8BFAE"/gi, `stroke="${ink}"`));
    parts.push(lsvg.replace('<svg ', `<svg x="${wd.x}" y="${wd.y}" `));
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-prim="pt-scene" data-lcs-pt-style="${style}"${scene.words ? ' data-lcs-pt-words="1"' : ''} data-lcs-pt-metrics='${JSON.stringify(metrics)}'>${parts.join('')}</svg>`;
  return { svg, placed, problems, W, H, occ, metrics };
}

/** traced strokes (connected guide runs that are TRACED, not printed solid), the smallest traced picture (longest side),
 *  the closest two separate pictures (box gap; P layouts), the vertical extent of everything drawn */
function measure(els, scene, W, H) {
  const band = scene.band;
  let strokes = 0, solidLen = 0, tracedLen = 0, minPic = 1e9, y0 = 1e9, y1 = -1e9, x0 = 1e9, x1 = -1e9;
  const pics = [];
  for (const e of els) {
    const render = e.spec.render || 'guide';
    const kinds = band ? R.classify(e.lines, band) : e.lines.map(() => 'trace');
    if (render === 'guide' || render === 'half' || render === 'part') {
      const TL = e.traceLines || e.lines;
      let kindsT = band ? R.classify(TL, band) : TL.map(() => 'trace');
      if (e.spec.outline) kindsT = kindsT.map((k, i) => (TL[i].outer ? k : 'solid'));   // the SAME rule the render applies
      TL.forEach((l, k) => { const L = require('./pt-trace.js').plen(l.pts); if (kindsT[k] === 'trace') { strokes++; tracedLen += L; } else solidLen += L; });
      if (false) e.lines.forEach((l, k) => { const L = require('./pt-trace.js').plen(l.pts); if (kinds[k] === 'trace') { strokes++; tracedLen += L; } else solidLen += L; });
      if (e.kind === 'item') { const b = e.box; minPic = Math.min(minPic, Math.max(b.x1 - b.x0, b.y1 - b.y0)); pics.push(b); }
    }
    for (const l of e.lines) for (const [x, y] of l.pts) { if (y < y0) y0 = y; if (y > y1) y1 = y; if (x < x0) x0 = x; if (x > x1) x1 = x; }
    if (render === 'model' && e.box) { y0 = Math.min(y0, e.box.y0); y1 = Math.max(y1, e.box.y1); x0 = Math.min(x0, e.box.x0); x1 = Math.max(x1, e.box.x1); }
  }
  let minGap = 1e9;
  for (let a = 0; a < pics.length; a++) for (let b = a + 1; b < pics.length; b++) {
    const A = pics[a], B = pics[b];
    const dx = Math.max(0, Math.max(A.x0, B.x0) - Math.min(A.x1, B.x1)), dy = Math.max(0, Math.max(A.y0, B.y0) - Math.min(A.y1, B.y1));
    minGap = Math.min(minGap, Math.hypot(dx, dy));
  }
  const r = (v) => Math.round(v);
  return { band: band || null, strokes, tracedLen: r(tracedLen), solidShare: +(solidLen / Math.max(1, solidLen + tracedLen)).toFixed(3), minPic: r(minPic), minGap: pics.length > 1 ? r(minGap) : null, extent: { x0: r(x0), y0: r(y0), x1: r(x1), y1: r(y1) }, fill: +((y1 - y0) / H).toFixed(3), pictures: pics.length };
}

function bboxOf(lines) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const l of lines) for (const [x, y] of l.pts) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  return { x0, y0, x1, y1 };
}

module.exports = { composeScene, traceOf, bboxOf, clipHalf, clipBy };
