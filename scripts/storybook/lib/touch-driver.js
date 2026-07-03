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

module.exports = { drivePath };
