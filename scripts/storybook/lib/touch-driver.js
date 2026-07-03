'use strict';
/* =====================================================================
   touch-driver.js — drives a REAL, imprecise pointer gesture over the
   storybook player, so the QA harness can prove a pre-school module both
   (a) COMPLETES under a wobbly-but-correct finger and (b) does NOT falsely
   complete under an off-target finger — while never dead-ending.

   The imprecision is modeled as a JITTERED PATH (not touch-vs-mouse): the
   module is pointer-driven, and page.mouse.{move,down,up} emit the exact
   pointerdown/move/up events the module listens for. A 3-5yo finger =
   a noisy path around the intended geometry, plus an occasional mid-drag
   lift (which a correct module must survive without resetting progress).

   gesture  = { kind:'path', pointsDu:[{x,y}], tol:<du>, zone:{w,h} }
   zoneRect = { left, top, width, height }  (screen px of .sb-zone)
   opts     = { mode:'pass'|'fail', seed?, lift?:bool }
     pass → perpendicular jitter amplitude 0.55*tol  (stays inside the band → advances)
     fail → constant perpendicular offset 1.6*tol     (stays outside the band → no progress)
   ===================================================================== */

/* deterministic LCG so a run is reproducible (no Math.random) */
function lcg(seed) { let s = (seed >>> 0) || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

/* densify a polyline so successive samples are <= stepDu apart (feeds the
   module's contiguous forward-arc gate — big jumps would be rejected) */
function densify(pts, stepDu) {
  const out = [pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1], d = dist(a, b);
    const n = Math.max(1, Math.ceil(d / Math.max(1, stepDu)));
    for (let k = 1; k <= n; k++) { const t = k / n; out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }); }
  }
  return out;
}

/* per-point unit normal (perpendicular to the local tangent) */
function withNormals(pts) {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    let tx = b.x - a.x, ty = b.y - a.y; const L = Math.hypot(tx, ty) || 1; tx /= L; ty /= L;
    return { x: p.x, y: p.y, nx: -ty, ny: tx };
  });
}

async function drivePath(page, gesture, zoneRect, opts) {
  opts = opts || {};
  const { pointsDu, tol, zone } = gesture;
  const sx = zoneRect.width / zone.w, sy = zoneRect.height / zone.h;
  const tolPx = tol * sx;
  const toPx = (p) => ({ x: zoneRect.left + p.x * sx, y: zoneRect.top + p.y * sy });
  const dense = withNormals(densify(pointsDu, tol * 0.7));   /* ~0.7 tol spacing */
  const rng = lcg(opts.seed || 7);
  const fail = opts.mode === 'fail';
  const amp = fail ? 1.6 * tolPx : 0.55 * tolPx;

  const screen = dense.map((pt) => {
    const base = toPx(pt);
    const off = fail ? amp : (rng() * 2 - 1) * amp;         /* perpendicular */
    const jx = (rng() * 2 - 1) * Math.min(4, tolPx * 0.1);  /* small tremor, both axes */
    const jy = (rng() * 2 - 1) * Math.min(4, tolPx * 0.1);
    return { x: base.x + pt.nx * off + jx, y: base.y + pt.ny * off + jy };
  });

  await page.mouse.move(screen[0].x, screen[0].y);
  await page.mouse.down();
  const mid = Math.floor(screen.length / 2);
  for (let i = 1; i < screen.length; i++) {
    await page.mouse.move(screen[i].x, screen[i].y, { steps: 2 });
    if (opts.lift && i === mid) {
      /* a mid-drag finger LIFT — a correct module must NOT reset progress */
      await page.mouse.up();
      await new Promise(r => setTimeout(r, 70));
      await page.mouse.down();
    }
  }
  await page.mouse.up();
}

/* centroid of a point list (in du) — fail-misses are pushed radially OUTWARD from
   it so they land in the empty margin, never on a neighbouring target/slot */
function centroid(pts) {
  let x = 0, y = 0; for (const p of pts) { x += p.x; y += p.y; } return { x: x / pts.length, y: y / pts.length };
}
function outwardUnit(p, c) { let dx = p.x - c.x, dy = p.y - c.y; const L = Math.hypot(dx, dy) || 1; return { x: dx / L, y: dy / L }; }
/* a robust "miss" direction (du): primarily AWAY from the zone centre (works even
   for a single target, where away-from-centroid degenerates), then away from the
   targets' centroid, then an arbitrary diagonal — always non-zero. */
function failDir(p, zone, c) {
  let v = outwardUnit(p, { x: zone.w / 2, y: zone.h / 2 });
  if (Math.abs(v.x) + Math.abs(v.y) > 0.15) return v;
  v = outwardUnit(p, c);
  if (Math.abs(v.x) + Math.abs(v.y) > 0.15) return v;
  return { x: 0.6, y: -0.8 };
}

/* gesture.kind==='taps' — tap each target in order with a scattered finger.
   pass → scatter within 0.5*tol (lands on-target); fail → 1.6*tol OUTWARD (clean miss). */
async function driveTaps(page, gesture, zoneRect, opts) {
  const { pointsDu, tol, zone } = gesture;
  const sx = zoneRect.width / zone.w, sy = zoneRect.height / zone.h, tolPx = tol * sx;
  const rng = lcg(opts.seed || 7); const fail = opts.mode === 'fail';
  const c = centroid(pointsDu);
  for (const p of pointsDu) {
    const bx = zoneRect.left + p.x * sx, by = zoneRect.top + p.y * sy;
    let x, y;
    if (fail) { const u = failDir(p, zone, c); x = bx + u.x * 1.6 * tolPx; y = by + u.y * 1.6 * tolPx; }
    else { const ang = rng() * Math.PI * 2, rad = rng() * 0.5 * tolPx; x = bx + Math.cos(ang) * rad; y = by + Math.sin(ang) * rad; }
    await page.mouse.move(x, y);
    await page.mouse.down();
    await new Promise(r => setTimeout(r, 60));               /* dwell — a slow finger */
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 120));
  }
}

/* gesture.kind==='drops' — drag each piece from→to with a wobbly path.
   pass → released within 0.5*tol of the goal; fail → released 1.6*tol away (won't snap). */
async function driveDrops(page, gesture, zoneRect, opts) {
  const { pairs, tol, zone } = gesture;
  const sx = zoneRect.width / zone.w, sy = zoneRect.height / zone.h, tolPx = tol * sx;
  const rng = lcg(opts.seed || 7); const fail = opts.mode === 'fail';
  const c = centroid(pairs.map(pr => pr.to));
  for (const pr of pairs) {
    const fx = zoneRect.left + pr.from.x * sx, fy = zoneRect.top + pr.from.y * sy;
    const gx = zoneRect.left + pr.to.x * sx, gy = zoneRect.top + pr.to.y * sy;
    let tx, ty;
    if (fail) { const u = failDir(pr.to, zone, c); tx = gx + u.x * 1.6 * tolPx; ty = gy + u.y * 1.6 * tolPx; }
    else { const ang = rng() * Math.PI * 2, rad = rng() * 0.5 * tolPx; tx = gx + Math.cos(ang) * rad; ty = gy + Math.sin(ang) * rad; }
    await page.mouse.move(fx, fy);
    await page.mouse.down();
    const N = 12;
    for (let i = 1; i <= N; i++) {
      const t = i / N;
      const jx = (rng() * 2 - 1) * Math.min(4, tolPx * 0.1);
      const jy = (rng() * 2 - 1) * Math.min(4, tolPx * 0.1);
      await page.mouse.move(fx + (tx - fx) * t + jx, fy + (ty - fy) * t + jy, { steps: 2 });
    }
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 160));
  }
}

/* generic dispatch — the QA harness calls this; each module's qaGesture() names its kind */
async function driveGesture(page, gesture, zoneRect, opts) {
  if (!gesture) return;
  if (gesture.kind === 'path') return drivePath(page, gesture, zoneRect, opts);
  if (gesture.kind === 'taps') return driveTaps(page, gesture, zoneRect, opts);
  if (gesture.kind === 'drops') return driveDrops(page, gesture, zoneRect, opts);
  throw new Error('touch-driver: unknown gesture kind ' + gesture.kind);
}

module.exports = { drivePath, driveTaps, driveDrops, driveGesture };
