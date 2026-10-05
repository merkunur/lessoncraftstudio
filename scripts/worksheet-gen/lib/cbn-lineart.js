/**
 * cbn-lineart.js — turn the image library's B&W line drawings (the operator's reference style, 2026-10-05) into a
 * Color by Number Art: every closed part of the drawing becomes a numbered region, the drawing's own ink sits on top.
 *
 *   segment(rgba, W, H, opts) → { regions: [{ d, area, cx, cy, bbox, outside }], ink: d }
 *     rgba   raw RGBA pixels of the composite (ink dark on light/transparent paper), W×H pixels
 *     opts.unit   pixels per picture unit (the Art is W/unit × H/unit)
 *     opts.close  gap-closing radius in pixels (outlines with hairline breaks would leak one part into the next)
 *   Regions are traced at the pixel boundary with marching squares, simplified, and grown by `grow` pixels so the fills
 *   meet UNDER the ink (no white seam between a fill and its outline). The ink is traced the same way and drawn last.
 *
 *   toArt(seg, colours, W, H) → an Art (primitives/cbn-art/core.js shape) the existing renderer, labeller, gates,
 *   tap-paint runtime and verify-interactive all understand: regions kind 'r' (outline width 0), ink kind 'k'.
 */
'use strict';
const { Art } = require('../primitives/cbn-art/core.js');

/** ink = dark and opaque */
function inkMask(rgba, W, H, { dark = 140, alpha = 110 } = {}) {
  const m = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const a = rgba[i * 4 + 3];
    if (a < alpha) continue;
    const l = 0.3 * rgba[i * 4] + 0.59 * rgba[i * 4 + 1] + 0.11 * rgba[i * 4 + 2];
    if (l < dark) m[i] = 1;
  }
  return m;
}

/** square dilation by r (separable) */
function dilate(m, W, H, r) {
  if (r <= 0) return m.slice();
  const t = new Uint8Array(W * H), o = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    let run = -1e9;
    for (let x = 0; x < W; x++) { if (m[y * W + x]) run = x; if (x - run <= r) t[y * W + x] = 1; }
    run = 1e9;
    for (let x = W - 1; x >= 0; x--) { if (m[y * W + x]) run = x; if (run - x <= r) t[y * W + x] = 1; }
  }
  for (let x = 0; x < W; x++) {
    let run = -1e9;
    for (let y = 0; y < H; y++) { if (t[y * W + x]) run = y; if (y - run <= r) o[y * W + x] = 1; }
    run = 1e9;
    for (let y = H - 1; y >= 0; y--) { if (t[y * W + x]) run = y; if (run - y <= r) o[y * W + x] = 1; }
  }
  return o;
}

/** 4-connected components of the non-blocked pixels; label 0 = blocked */
function components(block, W, H) {
  const lab = new Int32Array(W * H);
  const comps = [];
  const stack = new Int32Array(W * H);
  let n = 0;
  for (let s = 0; s < W * H; s++) {
    if (block[s] || lab[s]) continue;
    n++;
    let sp = 0; stack[sp++] = s; lab[s] = n;
    let area = 0, sx = 0, sy = 0, x0 = W, y0 = H, x1 = 0, y1 = 0, edge = false;
    while (sp) {
      const p = stack[--sp], x = p % W, y = (p / W) | 0;
      area++; sx += x; sy += y;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true;
      if (x > 0 && !block[p - 1] && !lab[p - 1]) { lab[p - 1] = n; stack[sp++] = p - 1; }
      if (x < W - 1 && !block[p + 1] && !lab[p + 1]) { lab[p + 1] = n; stack[sp++] = p + 1; }
      if (y > 0 && !block[p - W] && !lab[p - W]) { lab[p - W] = n; stack[sp++] = p - W; }
      if (y < H - 1 && !block[p + W] && !lab[p + W]) { lab[p + W] = n; stack[sp++] = p + W; }
    }
    comps.push({ label: n, area, cx: sx / area, cy: sy / area, bbox: [x0, y0, x1, y1], edge });
  }
  return { lab, comps };
}

/** Ramer–Douglas–Peucker on a closed ring */
function rdp(pts, eps) {
  if (pts.length < 5) return pts;
  const keep = new Uint8Array(pts.length);
  // split the ring at its two farthest-apart points
  let a = 0, b = 0, best = -1;
  for (let i = 0; i < pts.length; i += Math.max(1, pts.length >> 6)) {
    const dx = pts[i][0] - pts[0][0], dy = pts[i][1] - pts[0][1], d = dx * dx + dy * dy;
    if (d > best) { best = d; b = i; }
  }
  keep[a] = keep[b] = 1;
  const seg = (i, j) => {
    const st = [[i, j]];
    while (st.length) {
      const [s, e] = st.pop();
      if (e - s < 2) continue;
      const [ax, ay] = pts[s], [bx, by] = pts[e % pts.length];
      const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1;
      let mi = -1, md = -1;
      for (let k = s + 1; k < e; k++) {
        const [px, py] = pts[k];
        const d = Math.abs(dy * (px - ax) - dx * (py - ay)) / L;
        if (d > md) { md = d; mi = k; }
      }
      if (md > eps) { keep[mi] = 1; st.push([s, mi], [mi, e]); }
    }
  };
  seg(a, b); seg(b, pts.length);
  return pts.filter((_, i) => keep[i]);
}

/** marching squares over mask(x,y) inside a bbox → closed rings (pixel corner coordinates) */
function contours(inside, x0, y0, x1, y1) {
  // grid of corner points; cell (x,y) has corners at pixel centres (x,y)..(x+1,y+1); pad by 1
  const segs = new Map();
  const key = (x, y) => x * 4 + ',' + y * 4;
  const add = (ax, ay, bx, by) => { segs.set(key(ax, ay), [ax, ay, bx, by]); };
  for (let y = y0 - 1; y <= y1; y++) {
    for (let x = x0 - 1; x <= x1; x++) {
      const tl = inside(x, y), tr = inside(x + 1, y), br = inside(x + 1, y + 1), bl = inside(x, y + 1);
      const c = (tl ? 8 : 0) | (tr ? 4 : 0) | (br ? 2 : 0) | (bl ? 1 : 0);
      if (c === 0 || c === 15) continue;
      // edge midpoints (in pixel-centre space +0.5): top, right, bottom, left
      const T = [x + 0.5, y], Rr = [x + 1, y + 0.5], B = [x + 0.5, y + 1], Lf = [x, y + 0.5];
      // segments oriented so the inside is on the left (consistent winding)
      const S = {
        1: [[Lf, B]], 2: [[B, Rr]], 3: [[Lf, Rr]], 4: [[Rr, T]], 5: [[Lf, T], [Rr, B]], 6: [[B, T]], 7: [[Lf, T]],
        8: [[T, Lf]], 9: [[T, B]], 10: [[T, Rr], [B, Lf]], 11: [[T, Rr]], 12: [[Rr, Lf]], 13: [[Rr, B]], 14: [[B, Lf]],
      }[c];
      for (const [p, q] of S) add(p[0], p[1], q[0], q[1]);
    }
  }
  const rings = [];
  while (segs.size) {
    const [k0, s0] = segs.entries().next().value;
    segs.delete(k0);
    const ring = [[s0[0], s0[1]]];
    let cx = s0[2], cy = s0[3];
    for (let guard = 0; guard < 1e7; guard++) {
      const k = key(cx, cy);
      const s = segs.get(k);
      if (!s) break;
      segs.delete(k);
      ring.push([cx, cy]);
      cx = s[2]; cy = s[3];
    }
    if (ring.length > 3) rings.push(ring);
  }
  return rings;
}

/** a mask (boolean fn over pixels) → evenodd path in picture units */
function maskPath(inside, bbox, unit, eps) {
  const [x0, y0, x1, y1] = bbox;
  const rings = contours(inside, x0, y0, x1, y1).map((r) => rdp(r, eps)).filter((r) => r.length >= 3);
  // smoothed: every corner is rounded over at most CUT px on each side (a quadratic curve with the vertex as its
  // control point) — no pixel stair-steps at print size, yet a long straight edge (the frame) keeps its corners
  const CUT = 5;
  const P = (x, y) => (x / unit).toFixed(2) + ' ' + (y / unit).toFixed(2);
  return rings.map((r) => {
    const n = r.length;
    const toward = (a, b, d) => { const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, t = Math.min(0.5, d / L); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; };
    let d = '';
    for (let i = 0; i < n; i++) {
      const v = r[i], prev = r[(i - 1 + n) % n], next = r[(i + 1) % n];
      const a = toward(v, prev, CUT), b = toward(v, next, CUT);
      d += (i ? 'L' : 'M') + P(...a) + 'Q' + P(...v) + ' ' + P(...b);
    }
    return d + 'Z';
  }).join('');
}

/**
 * opts: unit (px per picture unit), close (px), grow (px), eps (px), minArea (px²: smaller parts stay white, unnumbered)
 */
function segment(rgba, W, H, opts = {}) { return segmentInk(inkMask(rgba, W, H, opts), W, H, opts); }
/** the same from a ready ink mask (Uint8Array W×H, 1 = ink) */
function segmentInk(ink, W, H, opts = {}) {
  const unit = opts.unit || 2, close = opts.close == null ? 2 : opts.close, eps = opts.eps || 0.8;
  const block = dilate(ink, W, H, close);           // closes hairline gaps for the labelling only
  const { lab, comps } = components(block, W, H);
  const grow = opts.grow == null ? close + 3 : opts.grow;
  // chamfer (3-4) distance to the nearest ink / frame edge: a part's inscribed radius = room for its number
  const dt = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) dt[i] = block[i] ? 0 : 1e9;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!dt[i]) continue; let v = dt[i];
    if (x === 0 || y === 0) v = Math.min(v, 3);
    if (x > 0) v = Math.min(v, dt[i - 1] + 3); if (y > 0) { v = Math.min(v, dt[i - W] + 3); if (x > 0) v = Math.min(v, dt[i - W - 1] + 4); if (x < W - 1) v = Math.min(v, dt[i - W + 1] + 4); } dt[i] = v; }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!dt[i]) continue; let v = dt[i];
    if (x === W - 1 || y === H - 1) v = Math.min(v, 3);
    if (x < W - 1) v = Math.min(v, dt[i + 1] + 3); if (y < H - 1) { v = Math.min(v, dt[i + W] + 3); if (x < W - 1) v = Math.min(v, dt[i + W + 1] + 4); if (x > 0) v = Math.min(v, dt[i + W - 1] + 4); } dt[i] = v; }
  const rmax = new Float32Array(comps.length + 1), rat = new Int32Array(comps.length + 1);
  for (let i = 0; i < W * H; i++) { const l = lab[i]; if (l && dt[i] > rmax[l]) { rmax[l] = dt[i]; rat[l] = i; } }
  const regions = [];
  for (const c of comps) {
    // the part grown back over the closing ring and a little under the ink, never into another part's pixels
    const [bx0, by0, bx1, by1] = c.bbox;
    const g = grow, X0 = Math.max(0, bx0 - g), Y0 = Math.max(0, by0 - g), X1 = Math.min(W - 1, bx1 + g), Y1 = Math.min(H - 1, by1 + g);
    const bw = X1 - X0 + 1, bh = Y1 - Y0 + 1;
    const own = new Uint8Array(bw * bh);
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (lab[y * W + x] === c.label) own[(y - Y0) * bw + (x - X0)] = 1;
    const grown = dilate(own, bw, bh, g);
    for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
      const l = lab[y * W + x];
      if (l && l !== c.label) grown[(y - Y0) * bw + (x - X0)] = 0;    // another part's pixel
    }
    const inside = (x, y) => x >= X0 && y >= Y0 && x <= X1 && y <= Y1 && grown[(y - Y0) * bw + (x - X0)] === 1;
    regions.push({ d: maskPath(inside, [X0, Y0, X1, Y1], unit, eps), area: c.area / (unit * unit), cx: c.cx / unit, cy: c.cy / unit,
      bbox: c.bbox.map((v) => v / unit), outside: c.edge, label: c.label, r: (rmax[c.label] / 3 + close) / unit, px: (rat[c.label] % W) / unit, py: ((rat[c.label] / W) | 0) / unit });
  }
  const inkD = maskPath((x, y) => x >= 0 && y >= 0 && x < W && y < H && ink[y * W + x] === 1, [0, 0, W - 1, H - 1], unit, Math.min(eps, 0.6));
  return { regions, ink: inkD, W: W / unit, H: H / unit, lab, PW: W };
}

/** colours: one entry per segment region (null = paper: not drawn, not numbered; 'none' = white part, unnumbered) */
function toArt(seg, colours) {
  const a = new Art(Math.round(seg.W), Math.round(seg.H));
  seg.regions.forEach((r, i) => {
    const c = colours[i];
    if (c == null) return;
    a.items.push({ kind: 'r', d: r.d, colour: c, tf: '', ow: 0, name: 'part ' + i, group: null });
  });
  a.items.push({ kind: 'k', d: seg.ink, tf: '' });
  return a;
}

module.exports = { segment, segmentInk, toArt, inkMask, dilate, components };

/* ---------------------------------------------------------------- composing a design from library drawings */
const CW = 1200, CH = 1120, UNIT = 2;            // canvas pixels; the Art is 600 × 560 picture units
const LIB = require('path').join(__dirname, '..', 'cache', 'themes');

/** stroke width estimate of an ink mask: 2·area / boundary */
function strokeWidth(ink, W, H) {
  let a = 0, per = 0;
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (!ink[i]) continue; a++; if (!ink[i - 1] || !ink[i + 1] || !ink[i - W] || !ink[i + W]) per++; }
  return per ? 2 * a / per : 0;
}

/** everything NOT reachable from the image border through paper (closing hairline gaps first) = the drawing's body */
function silhouette(ink, W, H, close = 2) {
  const block = dilate(ink, W, H, close);
  const out = new Uint8Array(W * H), st = [];
  for (let x = 0; x < W; x++) { st.push(x, (H - 1) * W + x); }
  for (let y = 0; y < H; y++) { st.push(y * W, y * W + W - 1); }
  for (const s of st) if (!block[s]) out[s] = 1;
  const q = st.filter((s) => out[s]);
  while (q.length) {
    const p = q.pop(), x = p % W, y = (p / W) | 0;
    for (const j of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1]) if (j >= 0 && !out[j] && !block[j]) { out[j] = 1; q.push(j); }
  }
  // grow the outside back by the closing radius so the body ends at its own outline
  const back = dilate(out, W, H, close);
  const body = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) body[i] = ink[i] || !back[i] ? 1 : 0;
  return body;
}

/**
 * compose(spec) → ink mask CW×CH. spec.items: [{ src: 'theme/noun', x, y, h, w?, flip?, anchor? }] back to front,
 * positions in picture units (600 × 560); (x, y) = bottom-centre of the drawing's ink box (anchor 'c' = centre); h = the
 * ink box height. spec.lines: ink curves in picture units ({ d }), drawn first (horizon, pond edge). spec.stroke: target
 * line width in px (thinner pieces are thickened to it; pictures leave the artist's own line).
 */
async function compose(spec) {
  const sharp = require('sharp');
  const ink = new Uint8Array(CW * CH);
  const T = spec.stroke || 0;
  if (spec.lines && spec.lines.length) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CW}" height="${CH}" viewBox="0 0 600 560">${spec.lines.map((l) => `<path d="${l.d}" fill="none" stroke="#000" stroke-width="${((l.w || T || 8) / UNIT).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}</svg>`;
    const { data } = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < CW * CH; i++) if (data[i * 4 + 3] > 110) ink[i] = 1;
  }
  for (let it of spec.items || []) {
    const file = require('path').join(LIB, it.src + '@3x.webp');
    // trim to the ink box, then size it
    const trimmed = await sharp(file).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
    const tw = trimmed.info.width, th = trimmed.info.height;
    // fit: the ink box fills a box (w × h picture units), centred on (x, y) (default the picture's centre)
    if (it.fit) { const fw = it.fit[0], fh = it.fit[1], h = Math.min(fh, fw * th / tw); it = { ...it, h, x: it.x || 300, y: it.bottom != null ? it.bottom : (it.y || 280) + h / 2 }; }   // bottom: stands on that line
    const hp = Math.round(it.h * UNIT), wp = Math.max(1, Math.round(hp * tw / th));
    let img = sharp(trimmed.data).resize(wp, hp, { fit: 'fill' });
    if (it.flip) img = img.flop();
    const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let pin = inkMask(data, info.width, info.height);
    if (T) { const w = strokeWidth(pin, info.width, info.height); const k = Math.round((T - w) / 2); if (k > 0) pin = dilate(pin, info.width, info.height, k); }
    const body = it.noOcclude ? pin : silhouette(pin, info.width, info.height);
    const cx = Math.round(it.x * UNIT - info.width / 2);
    const cy = it.anchor === 'c' ? Math.round(it.y * UNIT - info.height / 2) : Math.round(it.y * UNIT - info.height);
    for (let y = 0; y < info.height; y++) {
      const Y = cy + y; if (Y < 0 || Y >= CH) continue;
      for (let x = 0; x < info.width; x++) {
        const X = cx + x; if (X < 0 || X >= CW) continue;
        const s = y * info.width + x;
        if (body[s]) ink[Y * CW + X] = pin[s];
      }
    }
  }
  return ink;
}

module.exports.compose = compose;
module.exports.strokeWidth = strokeWidth;
module.exports.silhouette = silhouette;
module.exports.CW = CW; module.exports.CH = CH; module.exports.UNIT = UNIT;
