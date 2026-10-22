/**
 * data/ptx/cl.js — DRAWN spiral and loop pictures for the K-424 Level Set copies (ptl), page px, the library's line style:
 * one even outline, round ends, objects a child can name. A picture is drawn in a box { cx, cy, w, h }; s = min(w, h).
 * TRACED lines are motifs: a spiral is a FIXED line that starts at its OUTER end (ptl-levels §K-424 L1: the start dot sits
 * outside), loops are plain lines. Everything else (a stick, a saucer, a leaf, a rib) is solid DECOR.
 * Spacing law: neighbouring turns of a spiral and neighbouring strands of a loop stay ≥ the level's gap apart
 * (L1 ≥ 30 px, L2 ≥ 18, L3 ≥ 12) — the turn count follows from the size, never the other way.
 */
'use strict';
const M = require('../../lib/pt-motifs.js');
const f1 = (v) => v.toFixed(1);
const dOf = (pts, closed) => 'M' + pts.map((p) => f1(p[0]) + ' ' + f1(p[1])).join('L') + (closed ? 'Z' : '');
const T = (pts, closed = false) => ({ m: 'line', a: [pts, closed] });                  // traced
const TF = (pts, closed = false) => ({ m: 'lineFixed', a: [pts, closed] });            // traced, its own direction
const SOL = (pts, closed = false, w = 2.6) => ({ d: dOf(pts, closed), w });            // solid detail
const FILL = (pts) => ({ d: dOf(pts, true), w: 2, fill: '#1a1a1a' });
const DOT = (x, y, r) => ({ m: 'circle', a: [x, y, r], fill: '#1a1a1a', stroke: false });
const circ = (cx, cy, rx, ry = rx, a0 = 0, a1 = 2 * Math.PI) => M.arc(cx, cy, rx, ry, a0, a1, 3);
const smooth = (ctrl, closed = false) => M.catmull(ctrl, closed, 3);
let MAXT = 4.5, MINT = 1.5, GAP = 20;
/** turns of a spiral whose radius falls by `span` px: ≥ GAP between turns, inside the level's range */
const turnsOf = (span) => Math.max(MINT, Math.min(MAXT, Math.floor((span / GAP) * 2) / 2));
/** a spiral from the OUTER end (radius R at screen angle a0) inward to radius r1; dir +1 = clockwise on the page */
function spiralIn(cx, cy, R, r1, turns, a0 = -Math.PI / 2, dir = 1, sy = 1) {
  const n = Math.max(30, Math.round(turns * 64)), pts = [];
  for (let k = 0; k <= n; k++) { const t = k / n, a = a0 + dir * t * turns * 2 * Math.PI, r = R - (R - r1) * t; pts.push([cx + r * Math.cos(a), cy + r * sy * Math.sin(a)]); }
  return pts;
}
/** arc-length table of a polyline */
function along(path) { const L = [0]; for (let i = 1; i < path.length; i++) L.push(L[i - 1] + Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1])); return L; }
function at(path, L, u) {
  let i = 1; while (i < L.length - 1 && L[i] < u) i++;
  const t = (u - L[i - 1]) / ((L[i] - L[i - 1]) || 1), a = path[i - 1], b = path[i];
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
  return [a[0] + dx * t, a[1] + dy * t, dx / d, dy / d];
}
/** n loops (a cursive ℓ chain) along a path, loop size a; side +1 loops to the path's left, -1 to its right */
function loopsAlong(path, n, a, side = 1, maxA = Infinity) {
  const L = along(path), len = L[L.length - 1], pts = [], steps = n * 64, adv = len / n;
  // a loop must be a loop: as tall as ~0.8 of its advance (never a 10 px tick) and running back past its own start
  const A = Math.min(maxA, Math.max(a, adv * 0.42)), B = Math.max(A * 0.9, adv / (2 * Math.PI) * 1.9);
  for (let k = 0; k <= steps; k++) {
    const t = k / steps, th = t * n * 2 * Math.PI, [x, y, tx, ty] = at(path, L, t * len);
    const back = B * Math.sin(th), off = side * A * (1 - Math.cos(th));   // the top of each turn runs BACK: a cursive ℓ, crossing on the line
    pts.push([x + tx * back - ty * off, y + ty * back + tx * off]);
  }
  return pts;
}
/** a picture's coordinate frame */
function frame(b) {
  const s = Math.min(b.w, b.h), X = (u) => b.cx + u * s, Y = (v) => b.cy + v * s, Pt = (u, v) => [X(u), Y(v)], K = (u) => u * s;
  return { s, X, Y, Pt, K, H: b.h / s, W: b.w / s };
}
const P = {
  // ── spirals ─────────────────────────────────────────────────────────────────────────────────────────────────────────
  cinnamonRoll(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0), R = K(0.4);
    const tail = smooth([[cx, cy - R], [cx + K(0.16), cy - K(0.43)], [cx + K(0.3), cy - K(0.36)]]);
    return { motifs: [TF([...tail.slice().reverse(), ...spiralIn(cx, cy, R, K(0.05), turnsOf(R * 0.95), -Math.PI / 2, -1)])],
      decor: [SOL(circ(cx, cy + K(0.02), K(0.47), K(0.47)))] };
  },
  swissRoll(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0.12, 0), R = K(0.33);
    return { motifs: [TF(spiralIn(cx, cy, R, K(0.04), turnsOf(R * 0.95), -Math.PI / 2, 1)), T(circ(cx, cy, R + K(0.04)), true)],
      decor: [SOL([[cx, cy - R - K(0.04)], [cx - K(0.5), cy - R - K(0.04)]]), SOL([[cx, cy + R + K(0.04)], [cx - K(0.5), cy + R + K(0.04)]]), SOL(circ(cx - K(0.5), cy, K(0.08), R + K(0.04), Math.PI / 2, 1.5 * Math.PI))] };
  },
  galaxy(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0), R = K(0.44), n = turnsOf(R * 0.45);   // two arms: half the turn gap each
    const one = MAXT <= 2, arms = [TF(spiralIn(cx, cy, R, K(0.07), one ? turnsOf(R * 0.9) : n, -Math.PI / 2, 1))];
    if (!one) arms.push(TF(spiralIn(cx, cy, R, K(0.07), n, Math.PI / 2, 1)));
    return { motifs: arms,
      decor: [DOT(cx, cy, K(0.05)), ...[[-0.42, -0.4, 0.05], [0.4, 0.38, 0.04], [0.42, -0.36, 0.035], [-0.4, 0.38, 0.03]].map(([u, v, r]) => ({ m: 'star', a: [cx + K(u), cy + K(v), K(r)], fill: '#1a1a1a', stroke: false }))] };
  },
  whirlpool(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0), R = K(0.46), sy = 0.6;
    return { motifs: [TF(spiralIn(cx, cy, R, K(0.04), turnsOf(R * sy), -Math.PI / 2, 1, sy))],
      decor: [SOL(smooth([[cx - K(0.5), cy + K(0.38)], [cx - K(0.38), cy + K(0.34)], [cx - K(0.26), cy + K(0.38)]])), SOL(smooth([[cx + K(0.22), cy + K(0.4)], [cx + K(0.34), cy + K(0.36)], [cx + K(0.46), cy + K(0.4)]]))] };
  },
  nautilus(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(-0.06, 0.04), R = K(0.42), n = turnsOf(R * 0.9);
    const sp = spiralIn(cx, cy, R, K(0.06), n, Math.PI, 1);
    const lip = smooth([sp[0], [cx - R - K(0.06), cy - K(0.1)], [cx - R + K(0.02), cy - K(0.34)], [cx - K(0.12), cy - R + K(0.02)]]);
    const ribs = []; const step = R / n;
    for (let k = 1; k <= 6; k++) { const a = Math.PI + k * (Math.PI / 3.5), r = R - (R - K(0.06)) * (k / 7) / n; ribs.push(SOL([[cx + (r - step * 0.15) * Math.cos(a), cy + (r - step * 0.15) * Math.sin(a)], [cx + (r - step * 0.8) * Math.cos(a), cy + (r - step * 0.8) * Math.sin(a)]], false, 2)); }
    return { motifs: [TF(sp), T(lip)], decor: ribs };
  },
  // a garden snail: the spiral shell (traced from its outer lip) sitting on a soft body with two feelers (the body traced too)
  snail(b) {
    // the shell a tall oval (the frame is a portrait), the whole snail inside the frame's width: shell 0.68 + head 0.18
    const { Pt, K } = frame(b), sy = 1.3, [cx, cy] = Pt(0.06, -0.1), R = K(0.33), n = turnsOf(R * 0.92), sp = spiralIn(cx, cy, R, K(0.05), n, Math.PI / 2, -1, sy);
    const foot = cy + R * sy + K(0.02), x0 = cx - R - K(0.17), x1 = cx + R + K(0.07);
    const body = smooth([[x1, foot], [x0 + K(0.1), foot], [x0, foot - K(0.1)], [x0 + K(0.02), foot - K(0.24)], [x0 + K(0.12), foot - K(0.28)], [x0 + K(0.18), foot - K(0.14)], [cx - R * 0.8, foot - K(0.06)]]);
    return { motifs: [TF(sp), T(body), T(smooth([[x0 + K(0.04), foot - K(0.25)], [x0 - K(0.01), foot - K(0.4)], [x0 - K(0.02), foot - K(0.44)]])), T(smooth([[x0 + K(0.12), foot - K(0.28)], [x0 + K(0.13), foot - K(0.44)], [x0 + K(0.11), foot - K(0.48)]]))],
      decor: [DOT(x0 + K(0.08), foot - K(0.18), K(0.022))] };
  },
  ammonite(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0), R = K(0.44), n = turnsOf(R * 0.9), sp = spiralIn(cx, cy, R, K(0.05), n, -Math.PI / 2, 1);
    const step = (R - K(0.05)) / n, ribs = [];
    for (let k = 0; k < 14; k++) { const a = -Math.PI / 2 + k * (2 * Math.PI / 14), r = R - (R - K(0.05)) * (k / 14) / n; ribs.push(SOL([[cx + (r - step * 0.2) * Math.cos(a), cy + (r - step * 0.2) * Math.sin(a)], [cx + (r - step * 0.8) * Math.cos(a), cy + (r - step * 0.8) * Math.sin(a)]], false, 2)); }
    return { motifs: [TF(sp)], decor: ribs };
  },
  rose(b) {
    const { Pt, K, H } = frame(b), hy = H > 1.6 ? -0.34 : -Math.min(0.2, H * 0.5 - 0.3), [cx, cy] = Pt(0, hy), R = K(H > 1.6 ? 0.38 : 0.3);   // a tall L3 frame holds a bigger flower
    const out = []; for (let k = 0; k <= 96; k++) { const a = k / 96 * 2 * Math.PI, w = 1 + 0.07 * Math.sin(a * 5); out.push([cx + R * 1.12 * w * Math.cos(a), cy + R * 1.12 * w * Math.sin(a)]); }
    const by = Math.min(cy + K(H > 1.6 ? 1.12 : 0.85), b.cy + b.h / 2 - 16);
    return { motifs: [TF(spiralIn(cx, cy, R * 0.92, K(0.03), turnsOf(R * 0.9), -Math.PI / 2, 1)), T(out, true)],
      decor: [SOL(smooth([[cx, cy + R * 1.18], [cx + K(0.03), (cy + by) / 2], [cx, by]])), SOL(smooth([[cx + K(0.02), (cy + by) / 2 + K(0.02)], [cx + K(0.18), (cy + by) / 2 - K(0.06)], [cx + K(0.24), (cy + by) / 2 - K(0.02)], [cx + K(0.12), (cy + by) / 2 + K(0.06)], [cx + K(0.02), (cy + by) / 2 + K(0.02)]], true))] };
  },
  candy(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0), R = K(0.26);
    const bow = (dir) => T([[cx + dir * R * 0.96, cy - K(0.04)], [cx + dir * K(0.5), cy - K(0.17)], [cx + dir * K(0.46), cy], [cx + dir * K(0.5), cy + K(0.17)], [cx + dir * R * 0.96, cy + K(0.04)]]);
    return { motifs: [T(circ(cx, cy, R), true), TF(spiralIn(cx, cy, R * 0.82, K(0.025), turnsOf(R * 0.8), -Math.PI / 2, 1)), bow(-1), bow(1)], decor: [] };
  },
  cabbage(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0), R = K(0.44);
    const out = []; for (let k = 0; k <= 120; k++) { const a = k / 120 * 2 * Math.PI, w = 1 + 0.04 * Math.sin(a * 7); out.push([cx + R * w * Math.cos(a), cy + R * w * Math.sin(a)]); }
    return { motifs: [T(out, true), TF(spiralIn(cx, cy, R * 0.8, K(0.04), turnsOf(R * 0.8), -Math.PI / 2, 1))],
      decor: [0.6, 2.2, 4.0].map((a) => SOL([[cx + R * 0.82 * Math.cos(a), cy + R * 0.82 * Math.sin(a)], [cx + R * 0.95 * Math.cos(a + 0.12), cy + R * 0.95 * Math.sin(a + 0.12)]], false, 2)) };
  },
  sunflower(b) {
    const { Pt, K, H } = frame(b), [cx, cy] = Pt(0, -Math.min(0.12, H * 0.5 - 0.42)), R = K(0.22), petals = [];
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, c = Math.cos(a), sn = Math.sin(a), px = cx + c * K(0.33), py = cy + sn * K(0.33); const pts = []; for (let j = 0; j <= 24; j++) { const t = j / 24 * 2 * Math.PI, ex = K(0.1) * Math.cos(t), ey = K(0.045) * Math.sin(t); pts.push([px + ex * c - ey * sn, py + ex * sn + ey * c]); } petals.push(SOL(pts, true, 2.2)); }
    const by = b.cy + b.h / 2 - 14;
    return { motifs: [T(circ(cx, cy, R), true), TF(spiralIn(cx, cy, R * 0.8, K(0.025), turnsOf(R * 0.8), -Math.PI / 2, 1))],
      decor: [...petals, ...(by - cy > K(0.6) ? [SOL([[cx, cy + K(0.44)], [cx, by]])] : [])] };
  },
  spiralRug(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0), R = K(0.42), sy = 0.62;
    const fr = []; for (let k = -3; k <= 3; k++) { const y = cy + k * K(0.06); fr.push(SOL([[cx - R * 1.12, y], [cx - R * 1.24, y]], false, 2), SOL([[cx + R * 1.12, y], [cx + R * 1.24, y]], false, 2)); }
    return { motifs: [T(circ(cx, cy, R * 1.1, R * 1.1 * sy), true), TF(spiralIn(cx, cy, R * 0.94, K(0.03), turnsOf(R * 0.94 * sy), -Math.PI / 2, 1, sy))], decor: fr };
  },
  spiderWeb(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0.02), R = K(0.44), spokes = [];
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.2; spokes.push(SOL([[cx, cy], [cx + R * 1.06 * Math.cos(a), cy + R * 1.06 * Math.sin(a)]], false, 1.8)); }
    const sx = cx + R * 0.72 * Math.cos(-1.2), sy0 = cy + R * 0.72 * Math.sin(-1.2);
    const legs = [-0.6, -0.2, 0.2, 0.6].flatMap((d) => [SOL([[sx, sy0], [sx - K(0.07), sy0 + d * K(0.08)]], false, 1.8), SOL([[sx, sy0], [sx + K(0.07), sy0 + d * K(0.08)]], false, 1.8)]);
    return { motifs: [TF(spiralIn(cx, cy, R, K(0.04), turnsOf(R * 0.96), -Math.PI / 2, 1))], decor: [...spokes, ...legs, DOT(sx, sy0, K(0.03)), SOL([[sx, sy0], [sx, cy - R * 1.1]], false, 1.5)] };
  },
  yarnBall(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(-0.1, -0.04), R = K(0.3);
    const thread = loopsAlong([[cx + R * 0.72, cy + R * 0.72], [cx + K(0.5), cy + K(0.48)]], 2, Math.max(GAP * 0.6, K(0.05)), 1, Math.max(GAP, K(0.07)));
    return { motifs: [T(circ(cx, cy, R), true), TF(spiralIn(cx, cy, R * 0.82, K(0.03), turnsOf(R * 0.8), -Math.PI / 2, 1)), T(thread)],
      decor: [] };
  },
  coiledSnake(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0, 0.06), R = K(0.36), sp = spiralIn(cx, cy, R, K(0.04), turnsOf(R * 0.95), -Math.PI / 2, 1);
    const hx = cx - K(0.04), hy = cy - R - K(0.06);
    const head = []; for (let k = 0; k <= 48; k++) { const a = k / 48 * 2 * Math.PI; head.push([hx - K(0.13) + K(0.1) * Math.cos(a), hy + K(0.065) * Math.sin(a)]); }
    return { motifs: [TF([[hx - K(0.04), hy + K(0.04)], ...sp]), T(head, true)],
      decor: [DOT(hx - K(0.16), hy - K(0.015), K(0.016)), SOL([[hx - K(0.23), hy + K(0.01)], [hx - K(0.3), hy + K(0.01)], [hx - K(0.33), hy - K(0.02)]], false, 2), SOL([[hx - K(0.3), hy + K(0.01)], [hx - K(0.33), hy + K(0.04)]], false, 2)] };
  },
  ropeCoil(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(-0.06, -0.06), R = K(0.36), sp = spiralIn(cx, cy, R, K(0.06), turnsOf(R * 0.9), 0, 1);
    const tail = smooth([[cx + R, cy], [cx + R + K(0.06), cy + K(0.24)], [cx + K(0.3), cy + K(0.46)], [cx + K(0.48), cy + K(0.46)]]);
    return { motifs: [TF([...tail.slice().reverse(), ...sp])], decor: [SOL(circ(cx + K(0.48), cy + K(0.46), K(0.03)), true)] };
  },
  hoseReel(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(-0.08, -0.08), R = K(0.33), sp = spiralIn(cx, cy, R, K(0.07), turnsOf(R * 0.85), 0, 1);
    const hose = smooth([[cx + R, cy], [cx + R + K(0.1), cy + K(0.2)], [cx + K(0.24), cy + K(0.44)], [cx + K(0.44), cy + K(0.42)]]);
    const nozzle = [[cx + K(0.44), cy + K(0.38)], [cx + K(0.54), cy + K(0.36)], [cx + K(0.54), cy + K(0.48)], [cx + K(0.44), cy + K(0.46)]];
    return { motifs: [TF([...hose.slice().reverse(), ...sp])], decor: [SOL(nozzle, true), ...[-0.4, -0.2, 0.0, 0.2].map((u) => SOL([[cx + K(u), cy + K(0.56)], [cx + K(u + 0.03), cy + K(0.5)], [cx + K(u + 0.06), cy + K(0.56)]], false, 2))] };
  },
  // ── spirals out of a line (a sweep that rolls into a curl) ───────────────────────────────────────────────────────────
  windSwirl(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0.12, -0.08), R = K(0.3);
    const sweep = smooth([Pt(-0.5, 0.3), Pt(-0.2, 0.26), [cx - K(0.05), cy + R + K(0.02)], [cx, cy + R]]);
    const sp = spiralIn(cx, cy, R, K(0.04), turnsOf(R * 0.95), Math.PI / 2, -1);
    const gust = smooth([Pt(-0.48, 0.44), Pt(-0.1, 0.42), Pt(0.2, 0.44), Pt(0.46, 0.36)]);
    return { motifs: [TF([...sweep, ...sp.slice(1)]), T(gust)], decor: [] };
  },
  wave(b) {
    const { Pt, K } = frame(b), [cx, cy] = Pt(0.1, -0.06), R = K(0.3);
    const sp = spiralIn(cx, cy, R, K(0.04), turnsOf(R * 0.95), -Math.PI / 2, 1);
    const back = smooth([Pt(-0.5, 0.36), Pt(-0.3, 0.3), Pt(-0.14, 0.12), Pt(-0.08, -0.16), [cx - K(0.12), cy - R + K(0.015)], [cx, cy - R]]);
    return { motifs: [TF([...back, ...sp.slice(1)]), T(smooth([Pt(-0.5, 0.46), Pt(-0.2, 0.43), Pt(0.1, 0.46), Pt(0.5, 0.43)]))], decor: [] };
  },
  fiddlehead(b) {
    const { Pt, K, H } = frame(b), top = -Math.min(0.62, H * 0.5 - 0.2), [cx, cy] = Pt(0.05, top + 0.22), R = K(0.2);
    const by = b.cy + b.h / 2 - 16;
    const stem = smooth([[b.cx - K(0.05), by], [b.cx - K(0.1), (by + cy) / 2 + K(0.1)], [cx + R + K(0.05), cy + K(0.2)], [cx + R, cy]]);
    const sp = spiralIn(cx, cy, R, K(0.03), turnsOf(R * 0.95), 0, -1);
    const leaf = (y, d) => SOL(smooth([[b.cx - K(0.08), y], [b.cx - K(0.08) + d * K(0.16), y - K(0.06)], [b.cx - K(0.08) + d * K(0.24), y - K(0.02)], [b.cx - K(0.08) + d * K(0.14), y + K(0.03)], [b.cx - K(0.08), y]], true), true, 2);
    return { motifs: [TF([...stem, ...sp.slice(1)])], decor: [leaf(by - K(0.18), -1), leaf(by - K(0.32), 1)] };
  },
  kelp(b) {
    const { K } = frame(b), by = b.cy + b.h / 2 - 16, ty = b.cy - b.h / 2 + 22, out = [];
    [[-0.2, -1, 0.11], [0.18, 1, 0.12]].forEach(([u, dir, r], i) => {
      const x = b.cx + K(u), R = K(r), cy = ty + R + (i ? K(0.12) : 0), cx = x + dir * R;
      const stem = smooth([[x, by], [x + dir * K(0.06), (by + cy) * 0.5 + K(0.08)], [x - dir * K(0.04), cy + K(0.16)], [x, cy]]);
      out.push(TF([...stem, ...spiralIn(cx, cy, R, K(0.025), turnsOf(R * 0.95), Math.PI, dir).slice(1)]));
    });
    return { motifs: out, decor: [SOL(smooth([[b.cx - K(0.42), by], [b.cx - K(0.3), by - K(0.07)], [b.cx - K(0.18), by]]), false), SOL(smooth([[b.cx + K(0.24), by], [b.cx + K(0.36), by - K(0.08)], [b.cx + K(0.46), by]]), false), SOL([[b.cx - K(0.48), by], [b.cx + K(0.48), by]])] };
  },
  vine(b) {
    const { K } = frame(b), x0 = b.cx - b.w / 2 + 18, x1 = b.cx + b.w / 2 - 18, y0 = b.cy + b.h / 2 - 18, y1 = b.cy - b.h / 2 + 18;
    const stem = smooth([[x0, y0], [x0 + (x1 - x0) * 0.3, y0 + (y1 - y0) * 0.38], [x0 + (x1 - x0) * 0.62, y0 + (y1 - y0) * 0.58], [x1, y1]]);
    const L = along(stem), len = L[L.length - 1], motifs = [T(stem)], decor = [], R = K(0.11);
    [0.25, 0.52, 0.8].forEach((t, i) => {
      const [x, y, tx, ty] = at(stem, L, t * len), side = i % 2 ? 1 : -1, nx = -ty * side, ny = tx * side;
      const cx = x + nx * K(0.2), cy = y + ny * K(0.2);
      const a0 = Math.atan2(y - cy, x - cx);
      motifs.push(TF(spiralIn(cx, cy, Math.hypot(x - cx, y - cy), K(0.02), turnsOf(R * 0.95) + 0.5, a0, side)));
      const lx = x - nx * K(0.04), ly = y - ny * K(0.04), mx = lx - nx * K(0.16) + tx * K(0.05), my = ly - ny * K(0.16) + ty * K(0.05);
      decor.push(SOL(smooth([[lx, ly], [mx - tx * K(0.08), my - ty * K(0.08)], [mx - nx * K(0.04), my - ny * K(0.04)], [mx + tx * K(0.06), my + ty * K(0.06)], [lx, ly]], true), true, 2));
    });
    return { motifs, decor };
  },
  // ── loops (the cursive ℓ chain) ─────────────────────────────────────────────────────────────────────────────────────
  spring(b) {
    const { K } = frame(b), top = b.cy - b.h / 2 + 28, bot = b.cy + b.h / 2 - 28, a = Math.max(GAP * 0.7, K(0.16)), n = Math.max(3, Math.min(6, Math.floor((bot - top) / Math.max(GAP * 1.6, a * 1.3))));
    return { motifs: [T(loopsAlong([[b.cx - a, top], [b.cx - a, bot]], n, a, -1))], decor: [SOL(circ(b.cx, top - 6, a * 1.15, K(0.04)), true), SOL(circ(b.cx, bot + 8, a * 1.15, K(0.04)), true)] };
  },
  slinky(b) {
    const { K } = frame(b), r = Math.min(b.w * 0.4, b.h * 0.62), cy = b.cy + r * 0.4, base = [];
    for (let k = 0; k <= 60; k++) { const a = Math.PI + k / 60 * Math.PI; base.push([b.cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    const a = Math.max(GAP * 0.8, K(0.09)), n = Math.max(4, Math.min(8, Math.floor((Math.PI * r) / Math.max(GAP * 1.8, a * 1.6))));
    return { motifs: [T(loopsAlong(base, n, a, 1))], decor: [SOL([[b.cx - r - K(0.12), cy + K(0.04)], [b.cx + r + K(0.12), cy + K(0.04)]])] };
  },
  ribbonStick(b) {
    const { Pt, K } = frame(b), a = Math.max(GAP * 0.75, K(0.1));
    const path = [Pt(-0.2, -0.36), Pt(0.44, 0.36)];
    return { motifs: [T(loopsAlong(path, 4, a, -1, Math.max(GAP, K(0.085))))], decor: [SOL([Pt(-0.46, 0.46), Pt(-0.2, -0.36)], false, 3.4), FILL(circ(...Pt(-0.46, 0.46), K(0.03)))] };
  },
  kiteLoops(b) {
    const { Pt, K } = frame(b), [kx, ky] = Pt(-0.22, -0.1), s = K(0.3);
    const kite = [[kx, ky - s], [kx + s * 0.75, ky - s * 0.1], [kx, ky + s * 0.95], [kx - s * 0.75, ky - s * 0.1], [kx, ky - s]];
    const tail = loopsAlong([[kx, ky + s * 0.95], Pt(0.46, 0.4)], 4, Math.max(GAP * 0.6, K(0.06)), 1, Math.max(GAP * 0.8, K(0.065)));
    return { motifs: [T(kite, true), T(tail)], decor: [SOL([[kx - s * 0.75, ky - s * 0.1], [kx + s * 0.75, ky - s * 0.1]]), SOL([[kx, ky - s], [kx, ky + s * 0.95]]), SOL([[kx + s * 0.3, ky + s * 0.2], Pt(0.48, -0.48)], false, 1.6)] };
  },
  streamer(b) {
    const { Pt, K } = frame(b), a = Math.max(GAP * 0.7, K(0.09));
    return { motifs: [T(loopsAlong(smooth([Pt(-0.42, -0.34), Pt(-0.1, -0.1), Pt(0.12, 0.2), Pt(0.4, 0.38)]), 4, a, 1))], decor: [SOL(circ(...Pt(-0.44, -0.38), K(0.05)), true)] };
  },
  bubbleLoops(b) {
    const { Pt, K } = frame(b), [rx, ry] = Pt(-0.28, 0.12), R = K(0.12);
    const trail = loopsAlong([[rx + R * 0.7, ry - R * 0.7], Pt(0.42, -0.44)], 2, Math.max(GAP * 0.8, K(0.08)), -1, Math.max(GAP, K(0.1)));
    return { motifs: [T(circ(rx, ry, R), true), T(trail)], decor: [SOL([[rx - R * 0.7, ry + R * 0.7], Pt(-0.48, 0.48)], false, 3.2), ...[[0.34, 0.12, 0.06], [0.2, 0.34, 0.045], [0.42, -0.08, 0.035]].map(([u, v, r]) => SOL(circ(...Pt(u, v), K(r)), true, 2.2))] };
  },
  jellyCurls(b) {
    const { K } = frame(b), top = b.cy - b.h / 2 + 22, cx = b.cx, R = Math.min(b.w * 0.4, K(0.4)), dome = [];
    for (let k = 0; k <= 48; k++) { const a = Math.PI + k / 48 * Math.PI; dome.push([cx + R * Math.cos(a), top + R * 0.75 + R * 0.75 * Math.sin(a)]); }
    const rim = top + R * 0.75, bot = b.cy + b.h / 2 - 18, a = Math.max(GAP * 0.55, K(0.05));
    const ten = [-0.55, 0, 0.55].map((u) => T(loopsAlong([[cx + u * R - R * 0.12, rim + 4], [cx + u * R - R * 0.12, bot]], Math.max(2, Math.round((bot - rim) / Math.max(GAP * 2.6, R * 0.5))), a, 1, R * 0.2)));
    const scallop = []; for (let k = 0; k <= 6; k++) scallop.push([cx - R + k * R / 3, rim + (k % 2 ? 10 : 0)]);
    return { motifs: [T(dome), ...ten], decor: [SOL(smooth(scallop)), DOT(cx - R * 0.3, top + R * 0.45, K(0.02)), DOT(cx + R * 0.3, top + R * 0.45, K(0.02))] };
  },
  yoyo(b) {
    const { K } = frame(b), R = Math.min(b.w * 0.3, K(0.26)), cy = b.cy + b.h / 2 - R - 20, top = b.cy - b.h / 2 + 28, a = Math.max(GAP * 0.55, K(0.05));
    const n = Math.max(2, Math.min(4, Math.floor((cy - R - top) / Math.max(GAP * 1.8, a * 2.2))));
    return { motifs: [T(circ(b.cx, cy, R), true), T(loopsAlong([[b.cx, top], [b.cx, cy - R]], n, a, 1))], decor: [SOL(circ(b.cx, cy, R * 0.55), true, 2.2), DOT(b.cx, cy, R * 0.12), SOL(circ(b.cx, top - 8, K(0.05)), true)] };
  },
  balloonCurl(b) {
    const { K } = frame(b), R = Math.min(b.w * 0.3, K(0.24)), top = b.cy - b.h / 2 + 18, cy = top + R * 1.2, bot = b.cy + b.h / 2 - 18, a = Math.max(GAP * 0.55, K(0.045));
    const knot = cy + R * 1.2, n = Math.max(2, Math.min(4, Math.floor((bot - knot) / Math.max(GAP * 1.8, a * 2.2))));
    return { motifs: [T(circ(b.cx, cy, R, R * 1.2), true), T(loopsAlong([[b.cx, knot + 10], [b.cx, bot]], n, a, 1))], decor: [SOL([[b.cx - 8, knot + 10], [b.cx, knot], [b.cx + 8, knot + 10], [b.cx - 8, knot + 10]], true), SOL(circ(b.cx - R * 0.45, cy - R * 0.55, R * 0.16, R * 0.24, Math.PI, 1.7 * Math.PI), false, 2.2)] };
  },
  curlyStraw(b) {
    const { K } = frame(b), gw = Math.min(b.w * 0.6, K(0.5)), bot = b.cy + b.h / 2 - 18, gt = bot - Math.min(b.h * 0.5, K(0.6)), x = b.cx - K(0.04);
    const glass = [[x - gw / 2, gt], [x - gw * 0.4, bot], [x + gw * 0.4, bot], [x + gw / 2, gt]];
    const a = Math.max(GAP * 0.55, K(0.05)), straw = loopsAlong(smooth([[x + gw * 0.1, gt + (bot - gt) * 0.55], [x + gw * 0.15, gt], [x + gw * 0.32, (gt + b.cy - b.h / 2) / 2], [x + gw * 0.5, b.cy - b.h / 2 + 22]]), 3, a, 1);
    return { motifs: [T(glass), T(straw)], decor: [SOL([[x - gw * 0.46, gt + (bot - gt) * 0.22], [x + gw * 0.46, gt + (bot - gt) * 0.22]], false, 2)] };
  },
  creamMug(b) {
    const { K } = frame(b), mw = Math.min(b.w * 0.66, K(0.66)), bot = b.cy + b.h / 2 - 18, mt = bot - mw * 0.86, x = b.cx - K(0.06);
    const cream = [], H = Math.min(mt - (b.cy - b.h / 2 + 20), mw * 0.8), n = 3;
    for (let k = 0; k <= 160; k++) { const t = k / 160, th = t * n * 2 * Math.PI, rx = mw * 0.46 * (1 - 0.82 * t); cream.push([x + rx * Math.cos(th + Math.PI), mt - t * H + rx * 0.22 * Math.sin(th + Math.PI)]); }
    return { motifs: [T([[x - mw / 2, mt], [x - mw / 2, bot - 10], [x - mw / 2 + 10, bot], [x + mw / 2 - 10, bot], [x + mw / 2, bot - 10], [x + mw / 2, mt]]), T(cream)],
      decor: [SOL(smooth([[x + mw / 2, mt + mw * 0.18], [x + mw / 2 + K(0.15), mt + mw * 0.22], [x + mw / 2 + K(0.15), mt + mw * 0.56], [x + mw / 2, mt + mw * 0.6]]))] };
  },
  frostingCupcake(b) {
    const { K } = frame(b), cw = Math.min(b.w * 0.66, K(0.62)), bot = b.cy + b.h / 2 - 18, lt = bot - cw * 0.55, x = b.cx;
    const liner = [[x - cw / 2, lt], [x - cw * 0.36, bot], [x + cw * 0.36, bot], [x + cw / 2, lt], [x - cw / 2, lt]];
    const H = Math.min(lt - (b.cy - b.h / 2 + 34), cw * 0.75), n = 3, fr = [];
    for (let k = 0; k <= 180; k++) { const t = k / 180, th = t * n * 2 * Math.PI, rx = cw * 0.52 * (1 - 0.85 * t); fr.push([x + rx * Math.cos(th + Math.PI), lt - 4 - t * H + rx * 0.24 * Math.sin(th + Math.PI)]); }
    return { motifs: [T(liner, true), T(fr)], decor: [...[-0.3, -0.1, 0.1, 0.3].map((u) => SOL([[x + u * cw, lt + 6], [x + u * cw * 0.8, bot - 6]], false, 2)), SOL(circ(x, lt - H - 12, K(0.04)), true)] };
  },
  steamCup(b) {
    const { K } = frame(b), cw = Math.min(b.w * 0.56, K(0.5)), bot = b.cy + b.h / 2 - 26, ct = bot - cw * 0.7, x = b.cx - K(0.06);
    const cup = [[x - cw / 2, ct], ...smooth([[x - cw / 2, ct], [x - cw * 0.44, bot - cw * 0.16], [x - cw * 0.2, bot], [x + cw * 0.2, bot], [x + cw * 0.44, bot - cw * 0.16], [x + cw / 2, ct]]).slice(1), [x - cw / 2, ct]];
    const a = Math.max(GAP * 0.55, K(0.05)), top = b.cy - b.h / 2 + 20;
    const steam = [-0.18, 0.18].map((u, i) => T(loopsAlong(smooth([[x + u * cw, ct - 12], [x + u * cw + (i ? 10 : -10), (ct + top) / 2], [x + u * cw, top]]), 2, a, i ? 1 : -1)));
    return { motifs: [T(cup, true), ...steam], decor: [SOL(smooth([[x + cw * 0.47, ct + cw * 0.1], [x + cw * 0.72, ct + cw * 0.14], [x + cw * 0.7, ct + cw * 0.4], [x + cw * 0.4, ct + cw * 0.48]])), SOL(circ(x, bot + 8, cw * 0.72, 9), true)] };
  },
  teapot(b) {
    const { K } = frame(b), tw = Math.min(b.w * 0.6, K(0.62)), bot = b.cy + b.h / 2 - 18, cy = bot - tw * 0.42, x = b.cx + tw * 0.12;
    const body = circ(x, cy, tw / 2, tw * 0.42);
    const spoutTip = [x - tw * 0.82, cy - tw * 0.36], top = b.cy - b.h / 2 + 18, a = Math.max(GAP * 0.55, K(0.045));
    const steam = loopsAlong(smooth([[spoutTip[0], spoutTip[1] - 10], [spoutTip[0] + 12, (spoutTip[1] + top) / 2], [spoutTip[0] + 4, top]]), 2, a, 1);
    return { motifs: [T(body, true), T(steam)],
      decor: [SOL(smooth([[x - tw * 0.44, cy + tw * 0.06], [x - tw * 0.66, cy - tw * 0.1], spoutTip])), SOL(smooth([[x - tw * 0.4, cy - tw * 0.16], [x - tw * 0.68, cy - tw * 0.28], spoutTip])), SOL(smooth([[x + tw * 0.46, cy - tw * 0.16], [x + tw * 0.72, cy - tw * 0.1], [x + tw * 0.66, cy + tw * 0.2], [x + tw * 0.44, cy + tw * 0.2]])), SOL(circ(x, cy - tw * 0.42, tw * 0.2, tw * 0.07, Math.PI, 2 * Math.PI)), SOL(circ(x, cy - tw * 0.55, K(0.035)), true)] };
  },
  worm(b) {
    const { Pt, K } = frame(b), a = Math.max(GAP * 0.65, K(0.08));
    const body = loopsAlong([Pt(-0.46, 0.2), Pt(0.26, 0.2)], 3, a, -1, Math.max(GAP, K(0.1)));
    const [hx, hy] = body[body.length - 1];
    return { motifs: [T(body), T(circ(hx + K(0.1), hy - K(0.04), K(0.1)), true)], decor: [DOT(hx + K(0.13), hy - K(0.08), K(0.016)), SOL(circ(hx + K(0.12), hy - K(0.03), K(0.045), K(0.03), 0.2, Math.PI - 0.2), false, 2), SOL([Pt(-0.48, 0.24), Pt(0.48, 0.24)])] };
  },
  smokeHouse(b) {
    const { K } = frame(b), hw = Math.min(b.w * 0.86, K(0.8)), bot = b.cy + b.h / 2 - 18, wt = bot - hw * 0.55, rt = wt - hw * 0.42, x = b.cx - K(0.06);
    const house = [[x - hw / 2, bot], [x - hw / 2, wt], [x, rt], [x + hw / 2, wt], [x + hw / 2, bot], [x - hw / 2, bot]];
    const chx = x + hw * 0.26, cht = rt + hw * 0.06, top = b.cy - b.h / 2 + 16, a = Math.max(GAP * 0.55, K(0.05));
    const smoke = loopsAlong(smooth([[chx, cht - 10], [chx + 14, (cht + top) / 2], [chx + 30, top]]), 2, a, 1);
    return { motifs: [T(house, true), T(smoke)], decor: [SOL([[chx - hw * 0.07, wt - hw * 0.12], [chx - hw * 0.07, cht], [chx + hw * 0.07, cht], [chx + hw * 0.07, wt - hw * 0.2]]), SOL([[x - hw * 0.1, bot], [x - hw * 0.1, bot - hw * 0.28], [x + hw * 0.1, bot - hw * 0.28], [x + hw * 0.1, bot]]), SOL([[x - hw * 0.38, wt + hw * 0.1], [x - hw * 0.2, wt + hw * 0.1], [x - hw * 0.2, wt + hw * 0.26], [x - hw * 0.38, wt + hw * 0.26], [x - hw * 0.38, wt + hw * 0.1]], true, 2)] };
  },
  helterSkelter(b) {
    const { K } = frame(b), top = b.cy - b.h / 2 + 50, bot = b.cy + b.h / 2 - 18, x = b.cx, n = 3, pts = [];
    for (let k = 0; k <= n * 64; k++) { const t = k / (n * 64), a = t * n * 2 * Math.PI, y = top + 20 + t * (bot - top - 40), w = Math.min(b.w * 0.42, K(0.42)) * (0.4 + 0.6 * t); pts.push([x + w * Math.sin(a), y + w * 0.28 * Math.cos(a)]); }
    return { motifs: [T(pts)], decor: [SOL([[x - K(0.07), top], [x - K(0.07), bot]]), SOL([[x + K(0.07), top], [x + K(0.07), bot]]), SOL([[x - K(0.12), top], [x, top - 34], [x + K(0.12), top], [x - K(0.12), top]], true), SOL([[x, top - 34], [x, top - 46], [x + 16, top - 40], [x, top - 34]], true, 2)] };
  },
  coaster(b) {
    const { K } = frame(b), base = K(0.3) + b.cy, loopA = K(0.25);
    const track = loopsAlong([[b.cx - b.w / 2 + 16, base], [b.cx + b.w / 2 - 16, base]], 1, loopA, -1);
    const posts = [-0.42, -0.3, 0.3, 0.42].map((u) => SOL([[b.cx + K(u), base + 4], [b.cx + K(u), b.cy + b.h / 2 - 16]], false, 2.2));
    return { motifs: [T(track)], decor: [...posts, SOL([[b.cx - b.w / 2 + 12, b.cy + b.h / 2 - 16], [b.cx + b.w / 2 - 12, b.cy + b.h / 2 - 16]])] };
  },
  candyFloss(b) {
    const { K } = frame(b), R = Math.min(b.w * 0.42, K(0.36)), top = b.cy - b.h / 2 + 18, cy = top + R * 0.95, out = [];
    for (let k = 0; k <= 120; k++) { const a = k / 120 * 2 * Math.PI, w = 1 + 0.07 * Math.cos(a * 9); out.push([b.cx + R * w * Math.cos(a), cy + R * 0.9 * w * Math.sin(a)]); }
    const by = b.cy + b.h / 2 - 16;
    return { motifs: [T(out, true), TF(spiralIn(b.cx, cy, R * 0.78, K(0.03), turnsOf(R * 0.7 * 0.9), -Math.PI / 2, 1, 0.9))], decor: [SOL([[b.cx - R * 0.3, cy + R * 0.82], [b.cx, by], [b.cx + R * 0.3, cy + R * 0.82]])] };
  },
  ufo(b) {
    const { Pt, K } = frame(b), [ux, uy] = Pt(0.22, -0.26), r = K(0.2);
    const saucer = circ(ux, uy, r, r * 0.34), dome = circ(ux, uy - r * 0.14, r * 0.48, r * 0.46, Math.PI, 2 * Math.PI);
    const trail = loopsAlong([Pt(-0.46, 0.44), [ux - r * 0.7, uy + r * 0.4]], 3, Math.max(GAP * 0.6, K(0.07)), 1, Math.max(GAP * 0.9, K(0.08)));
    return { motifs: [T(saucer, true), T(dome), T(trail)], decor: [DOT(ux - r * 0.5, uy + r * 0.02, K(0.016)), DOT(ux, uy + r * 0.08, K(0.016)), DOT(ux + r * 0.5, uy + r * 0.02, K(0.016))] };
  },
  shootingStar(b) {
    const { Pt, K } = frame(b), [sx, sy] = Pt(0.26, -0.24), r = K(0.2);
    const trail = loopsAlong([Pt(-0.46, 0.44), [sx - r * 0.55, sy + r * 0.55]], 3, Math.max(GAP * 0.6, K(0.07)), 1, Math.max(GAP * 0.9, K(0.08)));
    return { motifs: [{ m: 'star', a: [sx, sy, r] }, T(trail)], decor: [] };
  },
};
/** a picture into motifs/decor in the box (cx, cy, w, h), level gap and turn range */
function pic(name, box, gap, turns = [1.5, 4.5]) { const f = P[name]; if (!f) throw new Error('K-424: no drawn picture ' + name); [MINT, MAXT] = turns; GAP = gap; const r = f(box); return { motifs: r.motifs || [], decor: r.decor || [] }; }
module.exports = { pic, P, spiralIn, loopsAlong };
