/**
 * htd-steps.js — How to Draw: a step-by-step drawing lesson derived from ONE image-library B&W line drawing's own
 * ink (nt2-G / b7, 2026-10-09). Nothing is redrawn: every step is a subset of the drawing's real lines, so the union
 * of the steps IS the drawing (gated pixel-exact).
 *
 *   buildSteps(src, opts)  → { src, w, h, bbox, full, steps:[{ d, share, groups, regions }], shapes:[…], stats }
 *     src     'theme dir/noun' (cache/themes/<dir>/<noun>@3x.webp), composed alone, fitted to opts.fit (default 520×480)
 *     steps   step 1 = the drawing's OUTER line (the ink along its silhouette); later steps = the inner lines, ordered
 *             by the size of the part each line DEFINES (the smallest part a line borders): head/body dividers and legs
 *             first, markings next, eyes / nose / mouth / texture last. Grouped into opts.steps (4-6) steps of roughly
 *             equal ink, never splitting the lines of one part across two steps, the last step holding the details.
 *     shapes  the "simple shapes first" guides: an ellipse (from the second moments) or a rounded box for each of the
 *             biggest parts, with its measured coverage, so a face may show the shapes the drawing is built from.
 *
 * Paths are in picture units (600 × 560, L.UNIT px per unit), the same space as fd-scene / Color by Number, so the
 * page primitives scale them like every other library drawing.
 */
'use strict';
const L = require('./cbn-lineart.js');

const W = 600, H = 560, U = L.UNIT;
const OUTER_PX = 11;     // ink within this many canvas px of the paper is the outer line (stroke ~14 px thick at 7 units)
const DETAIL_R = 4.5;    // a part narrower than this (units) is a detail (eye, nostril, shine)

/** 4-connected components of a binary mask (1 = ink) → labels + per-component pixel lists */
function inkComponents(m, PW, PH) {
  const block = new Uint8Array(m.length); for (let i = 0; i < m.length; i++) block[i] = m[i] ? 0 : 1;
  const { lab, comps } = L.components(block, PW, PH);
  return { lab, comps };
}
function dilateMask(m, PW, PH, r) { return L.dilate(m, PW, PH, r); }

function maskToPath(m, PW, PH, eps = 0.6) {
  let x0 = PW, y0 = PH, x1 = -1, y1 = -1;
  for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) if (m[y * PW + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 < 0) return '';
  return L.maskPath((x, y) => x >= 0 && y >= 0 && x < PW && y < PH && m[y * PW + x] === 1, [x0, y0, x1, y1], U, eps);
}
function bboxOf(m, PW, PH) {
  let x0 = PW, y0 = PH, x1 = -1, y1 = -1;
  for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) if (m[y * PW + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return x1 < 0 ? null : [x0 / U, y0 / U, (x1 + 1) / U, (y1 + 1) / U].map((v) => +v.toFixed(1));
}

/** ellipse of inertia of a region's pixels (scaled to the region's area) + coverage both ways */
function fitShape(lab, label, PW, PH, bbox) {
  const [bx0, by0, bx1, by1] = bbox.map((v) => Math.round(v * U));
  let n = 0, sx = 0, sy = 0;
  for (let y = by0; y <= by1; y++) for (let x = bx0; x <= bx1; x++) if (lab[y * PW + x] === label) { n++; sx += x; sy += y; }
  if (!n) return null;
  const cx = sx / n, cy = sy / n; let sxx = 0, syy = 0, sxy = 0;
  for (let y = by0; y <= by1; y++) for (let x = bx0; x <= bx1; x++) if (lab[y * PW + x] === label) { const dx = x - cx, dy = y - cy; sxx += dx * dx; syy += dy * dy; sxy += dx * dy; }
  sxx /= n; syy /= n; sxy /= n;
  const tr = sxx + syy, det = sxx * syy - sxy * sxy, disc = Math.sqrt(Math.max(0, tr * tr / 4 - det));
  const l1 = tr / 2 + disc, l2 = Math.max(1e-6, tr / 2 - disc);
  const angle = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  // an ellipse with these second moments has semi-axes 2·sqrt(l): scale so its area equals the region's
  let rx = 2 * Math.sqrt(l1), ry = 2 * Math.sqrt(l2); const k = Math.sqrt(n / (Math.PI * rx * ry)); rx *= k; ry *= k;
  const ca = Math.cos(angle), sa = Math.sin(angle);
  let inBoth = 0, inEll = 0;
  const pad = Math.ceil(Math.max(rx, ry));
  for (let y = Math.max(0, Math.round(cy - pad)); y <= Math.min(PH - 1, Math.round(cy + pad)); y++) for (let x = Math.max(0, Math.round(cx - pad)); x <= Math.min(PW - 1, Math.round(cx + pad)); x++) {
    const dx = x - cx, dy = y - cy, u = (dx * ca + dy * sa) / rx, v = (-dx * sa + dy * ca) / ry;
    if (u * u + v * v <= 1) { inEll++; if (lab[y * PW + x] === label) inBoth++; }
  }
  // the box alternative: the region's bbox (rounded) and how much of the region it holds
  const bw = (bx1 - bx0 + 1), bh = (by1 - by0 + 1);
  const boxFill = n / (bw * bh);
  const cov = inBoth / n, prec = inBoth / Math.max(1, inEll);
  // the guide: an ellipse when it covers the part well, a rounded box when the part fills its box (a truck body), else none
  const kind = cov >= 0.75 && prec >= 0.75 ? 'ellipse' : boxFill >= 0.72 ? 'box' : null;
  return { kind, cx: +(cx / U).toFixed(1), cy: +(cy / U).toFixed(1), rx: +(rx / U).toFixed(1), ry: +(ry / U).toFixed(1), angle: +(angle * 180 / Math.PI).toFixed(1),
    coverage: +cov.toFixed(3), precision: +prec.toFixed(3), area: Math.round(n / (U * U)),
    box: { x: +(bx0 / U).toFixed(1), y: +(by0 / U).toFixed(1), w: +(bw / U).toFixed(1), h: +(bh / U).toFixed(1), fill: +boxFill.toFixed(3) } };
}

async function buildSteps(src, opts = {}) {
  const fit = opts.fit || [520, 480];
  const ink = await L.compose({ stroke: opts.stroke || 7, items: [{ src, fit }] });
  const PW = L.CW, PH = L.CH;
  const seg = L.segmentInk(ink, PW, PH, { unit: U });
  const body = L.silhouette(ink, PW, PH);
  // outer line: ink close to the paper (the paper = everything outside the body, grown back by OUTER_PX)
  const paper = new Uint8Array(PW * PH); for (let i = 0; i < paper.length; i++) paper[i] = body[i] ? 0 : 1;
  const near = dilateMask(paper, PW, PH, OUTER_PX);
  const outer = new Uint8Array(PW * PH), inner = new Uint8Array(PW * PH);
  let total = 0, nOuter = 0;
  for (let i = 0; i < ink.length; i++) { if (!ink[i]) continue; total++; if (near[i]) { outer[i] = 1; nOuter++; } else inner[i] = 1; }
  // inner lines → OWNERSHIP by part: every inner ink pixel belongs to the SMALLEST part within reach of it (a leg line
  // to the leg, not the body; a pupil to its eye white), so a part's lines travel together whatever the ink connectivity
  // (a dinosaur's spikes, legs and face lines are ONE connected ink component — components cannot split them). Slivers
  // (< 0.1 % of the body: the gap an arm leaves against the body) never own a line. The segmenter labels the paper from
  // `close` px away from the ink, so the claim walks through the unlabelled paper ring as well as the ink.
  const regs = seg.regions.filter((r) => !r.outside);
  const bodyArea = regs.reduce((a, r) => a + r.area, 0);
  // an owner is a real part, not a sliver: round enough to hold a 2.5-unit disc (an eye white, a nostril) or big enough
  const owners = regs.filter((r) => r.r >= 2.5 || r.area / bodyArea >= 0.001).sort((a, b) => a.area - b.area);
  const own = new Int32Array(PW * PH);
  const mark = new Int32Array(PW * PH);
  const REACH = 14;
  let stamp = 0;
  for (const r of owners) {
    stamp++;
    const [bx0, by0, bx1, by1] = r.bbox.map((v) => Math.round(v * U));
    const X0 = Math.max(0, bx0 - REACH - 2), Y0 = Math.max(0, by0 - REACH - 2), X1 = Math.min(PW - 1, bx1 + REACH + 2), Y1 = Math.min(PH - 1, by1 + REACH + 2);
    let frontier = [];
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) { const p = y * PW + x; if (seg.lab[p] === r.label) { mark[p] = stamp; frontier.push(p); } }
    for (let d = 0; d < REACH && frontier.length; d++) {
      const next = [];
      for (const p of frontier) {
        const x = p % PW, y = (p / PW) | 0;
        for (const q of [x > X0 ? p - 1 : -1, x < X1 ? p + 1 : -1, y > Y0 ? p - PW : -1, y < Y1 ? p + PW : -1]) {
          if (q < 0 || mark[q] === stamp) continue;
          const step = inner[q] || (!ink[q] && seg.lab[q] === 0);   // ink to claim, or the unlabelled ring round it
          if (!step) continue;
          mark[q] = stamp;
          if (inner[q]) { if (!own[q]) own[q] = r.label; }
          next.push(q);
        }
      }
      frontier = next;
    }
  }
  // unclaimed inner ink (the middle of a thick blob, farther than REACH from any part) takes its neighbours' owner
  for (let it = 0; it < 40; it++) {
    let left = 0, changed = 0;
    for (let y = 1; y < PH - 1; y++) for (let x = 1; x < PW - 1; x++) {
      const i = y * PW + x; if (!inner[i] || own[i]) continue;
      const o = own[i - 1] || own[i + 1] || own[i - PW] || own[i + PW];
      if (o) { own[i] = o; changed++; } else left++;
    }
    if (!left || !changed) break;
  }
  // a speck no part reaches (an isolated dot inside the ring) is drawn with the outline, so the union stays exact
  for (let i = 0; i < PW * PH; i++) if (inner[i] && !own[i]) { inner[i] = 0; outer[i] = 1; nOuter++; }
  // ink thickness per part's lines (chamfer distance inside the ink): a pupil is a blob, a whisker a line
  const DT = new Float32Array(PW * PH);
  for (let i = 0; i < PW * PH; i++) DT[i] = ink[i] ? 1e9 : 0;
  for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) { const i = y * PW + x; if (!DT[i]) continue; DT[i] = Math.min(DT[i], x ? DT[i - 1] + 3 : 3, y ? DT[i - PW] + 3 : 3, x && y ? DT[i - PW - 1] + 4 : 4, y && x < PW - 1 ? DT[i - PW + 1] + 4 : 4); }
  for (let y = PH - 1; y >= 0; y--) for (let x = PW - 1; x >= 0; x--) { const i = y * PW + x; if (!DT[i]) continue; DT[i] = Math.min(DT[i], x < PW - 1 ? DT[i + 1] + 3 : 3, y < PH - 1 ? DT[i + PW] + 3 : 3, x < PW - 1 && y < PH - 1 ? DT[i + PW + 1] + 4 : 4, y < PH - 1 && x ? DT[i + PW - 1] + 4 : 4); }
  const thick = new Map(), pxOf = new Map();
  for (let i = 0; i < PW * PH; i++) { const c = own[i]; if (!c) continue; pxOf.set(c, (pxOf.get(c) || 0) + 1); if (DT[i] / 3 > (thick.get(c) || 0)) thick.set(c, DT[i] / 3); }
  const strokeW = L.strokeWidth(ink, PW, PH) / 2;   // half the typical line width in px
  const strokes = owners.filter((r) => pxOf.get(r.label)).map((r) => {
    const px = pxOf.get(r.label), share = r.area / bodyArea;
    const blob = (thick.get(r.label) || 0) > strokeW * 1.6;
    const texture = !blob && px / total < 0.005;   // a short thin mark (fur, feather, hatching)
    // class: 0 structure (the lines of a big part) · 1 features (medium parts: markings, paws, ears, eye rings) · 2 details-thick
    // (pupils, nostrils) · 3 details-thin (whiskers, fur, texture). A short line of a BIG part is structure however short.
    const cls = share >= 0.03 ? 0 : share >= 0.004 && !texture ? 1 : blob ? 2 : 3;
    return { label: r.label, px, def: r.label, defArea: r.area, cls, blob, cx: r.cx * U, cy: r.cy * U, band: Math.floor(r.cy / 40) };
  });
  const details = strokes.filter((s) => s.cls >= 2);
  // order: structure by the size of the part it defines (big first); then everything else TOP TO BOTTOM in 40-unit
  // bands (so the face — eyes, pupils, nose, whiskers — is drawn in one step whatever its classes), left to right
  const ordered = strokes.slice().sort((a, b) => (a.cls === 0 ? 0 : 1) - (b.cls === 0 ? 0 : 1) || (a.cls === 0 && b.cls === 0 ? b.defArea - a.defArea : 0) || a.band - b.band || a.cls - b.cls || a.cx - b.cx);
  const nSteps = Math.max(4, Math.min(6, opts.steps || 5));
  const innerPx = ordered.reduce((a, s) => a + s.px, 0);
  const want = nSteps - 1;                 // groups after the outline
  const target = innerPx / want;
  // greedy equal-ink groups in class order: a group may close at a change of defining part once it holds ~70 % of its
  // target, and always closes at a class boundary when the next class carries at least a quarter of a target (so a
  // handful of marking lines joins the structure step instead of making a step of its own)
  const groups = [];
  let cur = [], curPx = 0, last = null;
  const structPx = ordered.filter((s) => s.cls === 0).reduce((a, s) => a + s.px, 0);
  for (const s of ordered) {
    // the structure step closes when the first non-structure line arrives (if the structure carried real ink)
    const boundary = last && last.cls === 0 && s.cls !== 0 && structPx >= target * 0.25;
    // lines at one height (two eyes, two ears, a mouth under them) are never split across steps
    const paired = last && s.cls >= 1 && last.cls >= 1 && Math.abs(s.cy - last.cy) < 30 * U;
    const ripe = last && (s.def !== last.def || s.band !== last.band) && !paired && curPx >= target * 0.7 && groups.length < want - 1;
    if (cur.length && (boundary || ripe)) { groups.push(cur); cur = []; curPx = 0; }
    cur.push(s); curPx += s.px; last = s;
  }
  if (cur.length) groups.push(cur);
  // too many groups: merge the smallest adjacent pair until it fits
  while (groups.length > want) {
    // merge the smallest adjacent pair — but never fold the face/features into the structure step while another pair exists
    let bi = -1, bs = Infinity;
    for (let i = 0; i + 1 < groups.length; i++) {
      if (i === 0 && groups[0].some((x) => x.cls === 0) && groups.length > 2) continue;
      const s = groups[i].reduce((a, x) => a + x.px, 0) + groups[i + 1].reduce((a, x) => a + x.px, 0); if (s < bs) { bs = s; bi = i; }
    }
    if (bi < 0) bi = 0;
    groups.splice(bi, 2, groups[bi].concat(groups[bi + 1]));
  }
  const stepMasks = [outer];
  const stepClass = [];
  for (const g of groups) { const m = new Uint8Array(PW * PH); const set = new Set(g.map((s) => s.label)); for (let i = 0; i < m.length; i++) if (own[i] && set.has(own[i])) m[i] = 1; stepMasks.push(m); stepClass.push(Math.min(...g.map((s) => s.cls))); }
  // gate: the union is the ink, pixel-exact
  const union = new Uint8Array(PW * PH); let dup = 0;
  for (const m of stepMasks) for (let i = 0; i < m.length; i++) if (m[i]) { if (union[i]) dup++; union[i] = 1; }
  let missing = 0, extra = 0; for (let i = 0; i < ink.length; i++) { if (ink[i] && !union[i]) missing++; if (!ink[i] && union[i]) extra++; }
  const KIND = ['structure', 'features', 'details', 'details'];
  const steps = stepMasks.map((m, i) => { let px = 0; for (let j = 0; j < m.length; j++) px += m[j]; return { d: maskToPath(m, PW, PH), share: +(px / total).toFixed(3), bbox: bboxOf(m, PW, PH), kind: i === 0 ? 'outline' : KIND[stepClass[i - 1]] }; });
  const big = regs.slice().sort((a, b) => b.area - a.area).slice(0, 4).map((r) => fitShape(seg.lab, r.label, PW, PH, r.bbox));
  return {
    src, w: W, h: H, fit, bbox: bboxOf(ink, PW, PH), full: seg.ink, steps, shapes: big.filter(Boolean), ...(opts.debug ? { debug: { groups, ordered } } : {}),
    stats: { totalPx: total, outerShare: +(nOuter / total).toFixed(3), strokes: strokes.length, details: details.length, parts: regs.length, missing, extra, dup, nSteps: steps.length },
  };
}

/** one step panel: the lines drawn so far in ink, this step's lines in `highlight` (coral) */
function stepSvg(S, k, opts = {}) {
  const width = opts.width || 150, height = Math.round(width * H / W);
  const ink = opts.ink || '#3A3530', hi = opts.highlight || '#F2784B';
  // opts.outline === false: the guides alone (a "shapes first" panel); opts.upTo: draw the steps 0..k in ink with NO
  // highlight (a "finish the drawing" model); opts.hiFill / opts.inkFill override the colours (a pale trace)
  const prev = opts.outline === false ? '' : S.steps.slice(0, k).map((s) => `<path d="${s.d}" fill="${ink}"/>`).join('');
  const now = opts.outline === false ? '' : S.steps[k] ? `<path d="${S.steps[k].d}" fill="${opts.upTo || (k === S.steps.length - 1 && opts.lastInInk) ? ink : hi}"/>` : '';
  const g = opts.guide || '#8A8276';
  const guides = opts.shapes ? S.shapes.filter((sh) => sh.kind).map((sh) => sh.kind === 'ellipse'
    ? `<ellipse cx="${sh.cx}" cy="${sh.cy}" rx="${sh.rx}" ry="${sh.ry}" transform="rotate(${sh.angle} ${sh.cx} ${sh.cy})" fill="none" stroke="${g}" stroke-width="4" stroke-dasharray="14 10"/>`
    : `<rect x="${sh.box.x}" y="${sh.box.y}" width="${sh.box.w}" height="${sh.box.h}" rx="${Math.min(sh.box.w, sh.box.h) * 0.18}" fill="none" stroke="${g}" stroke-width="4" stroke-dasharray="14 10"/>`).join('') : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${width}" height="${height}" data-lcs-prim="htd-step" data-lcs-step="${k + 1}">${guides}${prev}${now}</svg>`;
}
/** the whole drawing; opts.fill = its colour (a pale `grid` fill makes a trace model); opts.without = step indices to leave out
 *  (a "finish the drawing" model: the drawing minus one or two steps) */
function fullSvg(S, opts = {}) {
  const width = opts.width || 300, height = Math.round(width * H / W);
  const fill = opts.fill || opts.ink || '#3A3530';
  const without = new Set(opts.without || []);
  const body = without.size ? S.steps.map((s, i) => (without.has(i) ? '' : `<path d="${s.d}" fill="${fill}"/>`)).join('') : `<path d="${S.full}" fill="${fill}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${width}" height="${height}" data-lcs-prim="htd-full"${without.size ? ` data-lcs-htd-without="${[...without].join(',')}"` : ''}>${body}</svg>`;
}

module.exports = { buildSteps, stepSvg, fullSvg, fitShape, W, H };
