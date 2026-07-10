/* =====================================================================
   rainbow-geometry.js — the ONE source of truth for story #7's rainbow:
   the trace-page path polylines and the scene band arcs are sampled from
   the SAME circles, so the child's finger always runs down the middle of
   the painted band (the paint-at-data-coords pattern, sky-scale).

   Circle center (CX, CY) sits below the horizon; each band is an annulus
   [rIn, rOut] with centerline r. Trace pages span [x0, x1].
   ===================================================================== */
'use strict';

const CX = 800, CY = 980;
/* x0/x1 = the VISUAL band span (scene paint); tx0/tx1 = the TRACE span — the
   flatter TOP portion of the arc only (a full sweep's steep ends failed the
   wobbly-finger QA pass; a 3-5yo traces the crown of the rainbow). */
const BANDS = {
  red:    { r: 725, rIn: 690, rOut: 760, x0: 250, x1: 1350, tx0: 420, tx1: 1180 },
  yellow: { r: 650, rIn: 610, rOut: 690, x0: 300, x1: 1300, tx0: 450, tx1: 1150 },
  blue:   { r: 570, rIn: 530, rOut: 610, x0: 350, x1: 1250, tx0: 520, tx1: 1080 },
};

/* sample the centerline TRACE arc of a band, left→right, n points (ABSOLUTE du) */
function sampleArc(band, n) {
  const b = BANDS[band];
  const pts = [];
  const a0 = Math.acos((b.tx0 - CX) / b.r);
  const a1 = Math.acos((b.tx1 - CX) / b.r);
  for (let i = 0; i < n; i++) {
    const a = a0 + (a1 - a0) * (i / (n - 1));
    pts.push({ x: Math.round(CX + b.r * Math.cos(a)), y: Math.round(CY - b.r * Math.sin(a)) });
  }
  return pts;
}

/* the per-band trace ZONE (absolute) — contains the arc with margin */
const TRACE_ZONES = {
  red:    { x: 180, y: 200, w: 1240, h: 380 },
  yellow: { x: 240, y: 270, w: 1120, h: 380 },
  blue:   { x: 290, y: 350, w: 1020, h: 360 },
};

/* an SVG arc path string for a band edge radius (for the scene painter) */
function bandArcPath(r, x0, x1) {
  const a0 = Math.acos((x0 - CX) / r);
  const a1 = Math.acos((x1 - CX) / r);
  const p0 = { x: CX + r * Math.cos(a0), y: CY - r * Math.sin(a0) };
  const p1 = { x: CX + r * Math.cos(a1), y: CY - r * Math.sin(a1) };
  return `M ${p0.x.toFixed(0)} ${p0.y.toFixed(0)} A ${r} ${r} 0 0 1 ${p1.x.toFixed(0)} ${p1.y.toFixed(0)}`;
}

module.exports = { CX, CY, BANDS, sampleArc, TRACE_ZONES, bandArcPath };
