/* =====================================================================
   CORE — Curate Wing  (curate-wing-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "NAME A SHAPE regardless of orientation or size"
   cognition (the spec's `engine-curate-wing.js`). First skin: "Professor Pip's
   Museum" — CCSS K.G.A.2 (correctly name circle / triangle / square /
   rectangle / hexagon under rotation + scale + atypical exemplars; van Hiele
   0→1, breaking the over-narrow concept image — the "diamond" misconception).
   Head of the collect-trade family. NO image-library dependency — pure
   parametric SVG geometry (no 404 surface, no alt-text).

   THE SPINE: every exhibit is seeded parametric geometry (rotation + scale +
   within-class proportion), so the canonical pose is the EXCEPTION; only the
   ROTATION+SCALE-INVARIANT identity (side count, normalized side-equality,
   interior-angle set, constant radius) bridges to the correct NAME.

   LOCKED ANTI-CHEATS (all gate-proven against this REAL core):
     • NAMING, NOT MATCHING — pedestals carry NO single canonical icon
       (`hasCanonicalIcon===false`); a silhouette-match solver must FAIL.
     • THE TRANSFORM IS THE ASSESSMENT — assessed items are non-canonical
       (rot ≥~25° off canonical / scale off-unity); a canonical-pose (bbox)
       matcher must FAIL.
     • NO SIDE-COUNTING — square/rectangle/rhombus are all 4-sided; a
       side-count router can't separate them → must FAIL.
     • RE-SEED-ON-RETURN — a mis-routed exhibit re-enters with a NEW seed
       (transform delta above threshold); only the invariant NAME carries.

   `classifyInvariant` (the passing solver) reads ONLY rotation+scale-invariant
   features → it is the truth the game grades against. Pure functions, no DOM.
   Mirrors count-twin / estimate-jar / ten-frame-tank cores.
   ===================================================================== */
(function (global) {
  'use strict';

  var CX = 50, CY = 50, R = 42;
  // the five NAMED shapes + the impostors (→ 'mystery'). `kind`: 'poly'|'ellipse'.
  var SHAPES = {
    circle:        { kind: 'ellipse', name: 'circle' },
    triangle:      { kind: 'poly', ang: [90, 210, 330], name: 'triangle', period: 120 },
    square:        { kind: 'poly', ang: [45, 135, 225, 315], name: 'square', period: 90 },
    rectangle:     { kind: 'rect', name: 'rectangle', period: 180 },
    hexagon:       { kind: 'poly', ang: [90, 150, 210, 270, 330, 30], name: 'hexagon', period: 60 },
    // impostors — geometry that classifies to 'mystery'
    oval:          { kind: 'ellipse', name: 'mystery', impostor: 'circle' },
    rhombus:       { kind: 'verts', verts: [[50, 32], [88, 50], [50, 68], [12, 50]], name: 'mystery', impostor: 'square', period: 180 },
    parallelogram: { kind: 'verts', verts: [[28, 34], [86, 34], [72, 66], [14, 66]], name: 'mystery', impostor: 'rectangle', period: 180 },
    pentagon:      { kind: 'poly', ang: [90, 162, 234, 306, 18], name: 'mystery', impostor: 'hexagon', period: 72 }
  };

  function mulberry32(seed) { var a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function regVerts(ang, r) { return ang.map(function (d) { var a = d * Math.PI / 180; return { x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) }; }); }
  function rectVerts(aspect, r) { /* aspect = w/h; circumscribed radius r */ var h = 2 * r / Math.sqrt(aspect * aspect + 1), w = aspect * h; return [{ x: CX - w / 2, y: CY - h / 2 }, { x: CX + w / 2, y: CY - h / 2 }, { x: CX + w / 2, y: CY + h / 2 }, { x: CX - w / 2, y: CY + h / 2 }]; }
  function applyTransform(verts, rot, scale) {
    var r = rot * Math.PI / 180, co = Math.cos(r), si = Math.sin(r);
    return verts.map(function (v) { var dx = (v.x - CX) * scale, dy = (v.y - CY) * scale; return { x: CX + dx * co - dy * si, y: CY + dx * si + dy * co }; });
  }

  /* the canonical orientations of a shape (where it looks prototypical); assessed
     items keep `rot` ≥ ASSESS_OFF° from all of them (mod the symmetry period). */
  var ASSESS_OFF = 22;
  function nearestCanonDist(type, rot) { var p = SHAPES[type].period || 360; var m = ((rot % p) + p) % p; return Math.min(m, p - m); }
  function assessedRot(type, rng) {
    var p = SHAPES[type].period || 360, tries = 0, rot;
    if (p >= 360) return 0;                                  // circle/oval: rotation invisible — scale carries it
    do { rot = Math.floor(rng() * p); tries++; } while (nearestCanonDist(type, rot) < ASSESS_OFF && tries < 40);
    return rot;
  }
  function assessedScale(type, rng) { var opts = (type === 'circle' || type === 'oval') ? [0.55, 0.62, 1.32, 1.5] : [0.7, 0.82, 1.12, 1.28]; return opts[Math.floor(rng() * opts.length)]; }

  /* genGeometry — derive the on-screen geometry from (type, seed, assessed).
     `rotOnly` keeps scale≈1 (card-filling) for multi-choice grids where a
     shrunk shape would look sparse; the dramatic size variety lives in the
     single-exhibit bay. Rotation (the orientation assessment) is unchanged. */
  function genGeometry(type, seed, assessed, rotOnly) {
    var S = SHAPES[type] || SHAPES.triangle, rng = mulberry32((seed >>> 0) || 1);
    var rot = assessed ? assessedRot(type, rng) : 0;
    var scale = (assessed && !rotOnly) ? assessedScale(type, rng) : 1;
    if (S.kind === 'ellipse') {
      var base = (type === 'oval') ? { rx: R, ry: R * 0.6 } : { rx: R, ry: R };
      // a tilted oval still classifies by rx/ry; rot only affects the drawn ellipse.
      // baseRx/baseRy are the canonical (pre-scale) radii — the skin renders these
      // + applies `scale` via CSS so the spin-to-upright can animate scale→1.
      return { type: type, kind: 'ellipse', rx: base.rx * scale, ry: base.ry * scale, baseRx: base.rx, baseRy: base.ry, rot: rot, scale: scale, name: S.name, assessed: !!assessed };
    }
    var verts;
    if (S.kind === 'rect') {
      var aspect = assessed ? [3.0, 0.34, 2.4, 0.42][Math.floor(rng() * 4)] : 1.9;
      verts = rectVerts(aspect, R); rot = assessed ? assessedRot('rectangle', rng) : 0;
    } else if (S.kind === 'verts') {
      verts = S.verts.map(function (p) { return { x: p[0], y: p[1] }; });
    } else {
      verts = regVerts(S.ang, R);
    }
    // `verts` = the on-truth transformed geometry (the classifier reads this);
    // `baseVerts` = the canonical pre-transform geometry (the skin renders this +
    // applies rot/scale via CSS so the spin-to-upright animates transform→identity).
    return { type: type, kind: 'polygon', verts: applyTransform(verts, rot, scale), baseVerts: verts, rot: rot, scale: scale, name: S.name, assessed: !!assessed };
  }

  /* a near-square rectangle for the fine-discriminate hall (aspect ≥1.25, K-fair) */
  function genRectFineSquare(seed, assessed) { var rng = mulberry32((seed >>> 0) || 1); var aspect = [1.32, 1.45, 0.7][Math.floor(rng() * 3)]; var rot = assessed ? assessedRot('rectangle', rng) : 0; var scale = assessed ? assessedScale('rectangle', rng) : 1; var base = rectVerts(aspect, R); return { type: 'rectangle', kind: 'polygon', verts: applyTransform(base, rot, scale), baseVerts: base, rot: rot, scale: scale, name: 'rectangle', assessed: !!assessed }; }

  /* dispatch a manifest belt-item type → geometry (handles the `rectangle_fine`
     near-square variant used in the fine-discriminate hall). */
  function genGeometryFor(type, seed, assessed, rotOnly) { return (type === 'rectangle_fine') ? genRectFineSquare(seed, assessed) : genGeometry(type, seed, assessed, rotOnly); }

  /* ---- geometry helpers ---- */
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function interiorAngleDeg(prev, p, next) {
    var ux = prev.x - p.x, uy = prev.y - p.y, wx = next.x - p.x, wy = next.y - p.y;
    var c = (ux * wx + uy * wy) / (Math.hypot(ux, uy) * Math.hypot(wx, wy) || 1);
    return Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI;
  }

  /* THE INVARIANT NAMER — reads ONLY rotation+scale-invariant features. */
  function classifyInvariant(geom) {
    if (geom.kind === 'ellipse') { var r = geom.rx / geom.ry; return (r > 0.84 && r < 1.19) ? 'circle' : 'mystery'; }
    var v = geom.verts, n = v.length;
    if (n === 3) return 'triangle';
    if (n === 5) return 'mystery';
    if (n === 6) return 'hexagon';
    if (n === 4) {
      var sides = [], angs = [];
      for (var i = 0; i < 4; i++) sides.push(dist(v[i], v[(i + 1) % 4]));
      for (var j = 0; j < 4; j++) angs.push(interiorAngleDeg(v[(j + 3) % 4], v[j], v[(j + 1) % 4]));
      var ratio = Math.max.apply(null, sides) / Math.min.apply(null, sides);
      var allEq = ratio < 1.13, allRight = angs.every(function (a) { return Math.abs(a - 90) < 10; });
      if (allRight) return allEq ? 'square' : 'rectangle';
      return 'mystery';   // rhombus / parallelogram → the Mystery Gallery
    }
    return 'mystery';
  }

  function isCanonicalPose(geom) { if (geom.kind === 'ellipse') return Math.abs(geom.scale - 1) < 0.12; return nearestCanonDist(geom.type, geom.rot) < ASSESS_OFF && Math.abs(geom.scale - 1) < 0.12; }
  function validate(geom, pedestalType) { return classifyInvariant(geom) === pedestalType; }
  function reseed(seed) { return (((seed >>> 0) + 0x9E3779B1) ^ 0x5bd1e995) >>> 0; }     // a deterministic NEW seed (different transform on return)

  /* ---- the cheating SOLVERS (the gate proves these LOSE) ---- */
  // routes by axis-aligned bounding-box aspect + side count, IGNORING rotation +
  // angles → mis-names the rotated long-thin rect (→'square'), the rhombus
  // (→'square', should be mystery), the tilted oval (→'circle', should be mystery).
  function canonicalPoseMatcher(geom) {
    if (geom.kind === 'ellipse') { var xs = [geom.rx], ys = [geom.ry]; return (Math.abs(geom.rx - geom.ry) < 6) ? 'circle' : 'mystery'; }
    var v = geom.verts, n = v.length;
    if (n === 3) return 'triangle';
    if (n === 6) return 'hexagon';
    if (n === 5) return 'mystery';
    if (n === 4) {
      var minx = Math.min.apply(null, v.map(function (p) { return p.x; })), maxx = Math.max.apply(null, v.map(function (p) { return p.x; }));
      var miny = Math.min.apply(null, v.map(function (p) { return p.y; })), maxy = Math.max.apply(null, v.map(function (p) { return p.y; }));
      var aspect = (maxx - minx) / Math.max(1e-6, (maxy - miny));
      return (aspect > 0.82 && aspect < 1.22) ? 'square' : 'rectangle';   // bbox-only: no angle check → can't exclude the rhombus
    }
    return 'mystery';
  }
  // routes by nearest-outline to a pedestal's canonical icon — but NO pedestal
  // exposes one (hasCanonicalIcon=false) → it has nothing to match → fails.
  function silhouetteMatcher(geom, pedestals) { var anyIcon = (pedestals || []).some(function (p) { return p.hasCanonicalIcon; }); return anyIcon ? classifyInvariant(geom) : null; }
  // routes by vertex count alone → cannot separate square / rectangle / rhombus.
  function sideCountRouter(geom) { if (geom.kind === 'ellipse') return 'circle'; var n = geom.verts.length; if (n === 3) return 'triangle'; if (n === 6) return 'hexagon'; if (n === 4) return 'square'; return 'mystery'; }

  global.CurateWingCore = {
    CX: CX, CY: CY, R: R, ASSESS_OFF: ASSESS_OFF, SHAPES: SHAPES,
    genGeometry: genGeometry, genRectFineSquare: genRectFineSquare, genGeometryFor: genGeometryFor,
    classifyInvariant: classifyInvariant, validate: validate, isCanonicalPose: isCanonicalPose,
    nearestCanonDist: nearestCanonDist, reseed: reseed,
    SOLVERS: { invariantNamer: classifyInvariant, canonicalPoseMatcher: canonicalPoseMatcher, silhouetteMatcher: silhouetteMatcher, sideCountRouter: sideCountRouter }
  };

}(typeof window !== 'undefined' ? window : this));
