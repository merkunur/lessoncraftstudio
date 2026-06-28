/* =====================================================================
   SHAPE FORGE — Mim's Glow Workshop — CORE  (shapeforge-core.js)
   ---------------------------------------------------------------------
   CCSS 1.G.A.2 + K.G.B.6 — compose 2D shapes to make a composite shape, and
   compose NEW shapes from the composite. Pure cognition + an integer geometry
   kernel, NO DOM. The graded cognition is part-to-whole SYNTHESIS: reason
   which interchangeable shards COMBINE to tile a blank target region (no
   gap/overlap/spill), in MULTIPLE ways, then RE-compose. 0 lines to any
   protected core + lcs-shell.{js,css}.

   THE LATTICE (integer, no float in the logic): each unit triangle is a cell
   (r,c); it is UP (▲) when (r+c) is even, DOWN (▼) when odd. Within a row the
   triangles interlock ▲▼▲▼; rows interlock vertically (an ▲'s flat bottom is
   a ▼'s flat top below). A piece = a set of relative cells per ORIENTATION
   (precomputed DATA — `rotate` cycles the orientation index; no runtime 60°
   math). Placement = a parity-PRESERVING translation (dr+dc even) so a piece
   never flips. `isComplete` = integer SET-EQUALITY.

   PILOT piece set = TRIANGLE + RHOMBUS (the trapezoid PIECE + the square/
   half/quarter-circle curve family are DEFERRED — per the design "ship tri
   first"). This still fully instantiates 1.G.A.2: triangles + rhombi compose
   hexagons / trapezoids / parallelograms / big-triangles MULTIPLE ways (the
   reway multiplicity), and the rhombus↔2-triangles swap IS the substitute
   cognition. Trapezoid/hexagon are TARGET shapes, composed from the 2 pieces.

   THE GATE-CAN'T-CHEAT PROOF (verify-shapeforge-core.js): a backtracking
   COMPOSER ORACLE tiles every target 100% (this also VERIFIES the cell-sets)
   while JIGSAW / SEAM-READER / BRUTE-SNAP / GREEDY-BOUNDARY-FOLLOWER /
   SNAP-ELIMINATION / MIRROR-SWAP all fail.
   ===================================================================== */
(function (global) {
  'use strict';

  /* PIECES — each orientation is a list of relative cells [r,c]; orient[0] is
     the reference cell (the anchor maps the WHOLE list by a parity-preserving
     translation). The within-row neighbours of an UP cell (0,0) are the DOWN
     cells (0,1) [right], (0,-1) [left]; the cross-row neighbour is (1,0)
     [below] — all verified edge-sharing on the interlocking lattice. */
  var PIECES = {
    /* a single triangle fills any ONE cell — orient 0 seats on an UP cell,
       orient 1 on a DOWN cell (rotating a lone triangle just flips up/down). */
    triangle: { id: 'triangle', cells: 1, orients: [ [[0, 0]], [[0, 1]] ] },
    /* a rhombus = one UP + one adjacent DOWN; its 3 orientations are the 3
       rhombi through an up-cell (right / below / left). */
    rhombus: { id: 'rhombus', cells: 2, orients: [ [[0, 0], [0, 1]], [[0, 0], [1, 0]], [[0, 0], [0, -1]] ] }
  };

  function up(r, c) { return ((r + c) % 2 + 2) % 2 === 0; }
  function cellKey(r, c) { return r + ',' + c; }
  function pieceOf(id) { return PIECES[id]; }
  function orientCount(id) { var p = PIECES[id]; return p ? p.orients.length : 0; }

  /* absolute cells of a placement {pieceId,orient,dr,dc} — translate the
     precomputed orient cells by (dr,dc). Valid only when (dr+dc) is EVEN
     (parity-preserving); legalAnchors only ever generates even offsets. */
  function cellsOf(pl) {
    var p = PIECES[pl.pieceId]; if (!p) return [];
    return p.orients[pl.orient].map(function (rc) { return [rc[0] + pl.dr, rc[1] + pl.dc]; });
  }

  function targetSet(round) { var s = {}; (round.target.cells || []).forEach(function (rc) { s[cellKey(rc[0], rc[1])] = true; }); return s; }
  function occupiedSet(placements) {
    var s = {};
    (placements || []).forEach(function (pl) { cellsOf(pl).forEach(function (rc) { s[cellKey(rc[0], rc[1])] = true; }); });
    return s;
  }

  /* legalAnchors — every parity-preserving placement of pieceId@orient whose
     cells are ALL inside the target AND currently empty (interchangeable: a
     piece type fits at MANY anchors → defeats jigsaw). */
  function legalAnchors(round, placements, pieceId, orient) {
    var p = PIECES[pieceId]; if (!p) return [];
    var tgt = targetSet(round), occ = occupiedSet(placements);
    var ref = p.orients[orient][0], out = [];
    /* candidate: map the reference cell onto each target cell (parity must
       match so the translation is parity-preserving). */
    (round.target.cells || []).forEach(function (rc) {
      var dr = rc[0] - ref[0], dc = rc[1] - ref[1];
      if (((dr + dc) % 2 + 2) % 2 !== 0) return;                 /* parity-preserving only */
      var cells = p.orients[orient].map(function (q) { return [q[0] + dr, q[1] + dc]; });
      for (var i = 0; i < cells.length; i++) {
        var k = cellKey(cells[i][0], cells[i][1]);
        if (!tgt[k] || occ[k]) return;                           /* outside target OR overlaps */
      }
      out.push({ dr: dr, dc: dc });
    });
    return out;
  }

  /* isComplete — integer SET-EQUALITY: the union of placed cells exactly
     equals the target (every target cell covered, no cell twice, none
     outside). legalAnchors already forbids overlap/spill, so this reduces to
     "every target cell covered + no double-cover". */
  function isComplete(round, placements) {
    var tgt = round.target.cells || [];
    var counts = {}, total = 0;
    for (var i = 0; i < (placements || []).length; i++) {
      var cells = cellsOf(placements[i]);
      for (var j = 0; j < cells.length; j++) {
        var k = cellKey(cells[j][0], cells[j][1]);
        counts[k] = (counts[k] || 0) + 1; total++;
        if (counts[k] > 1) return false;                         /* double-cover */
      }
    }
    if (total !== tgt.length) return false;
    for (var t = 0; t < tgt.length; t++) { if (!counts[cellKey(tgt[t][0], tgt[t][1])]) return false; }
    return true;
  }

  /* the piece-MULTISET signature of a tiling (sorted pieceId counts) — the
     reway/recompose acceptor (a mirror / swapped-identical-triangles tiling
     has the SAME multiset → NOT a new way). */
  function pieceMultiset(placements) {
    var m = {}; (placements || []).forEach(function (pl) { m[pl.pieceId] = (m[pl.pieceId] || 0) + 1; });
    return Object.keys(m).sort().map(function (k) { return k + ':' + m[k]; }).join('|');
  }

  /* cellVertices — the 3 corner pixel-points of a cell at unit size s (the
     ONLY float, render-layer; recomputed from integers, no drift). */
  function cellVertices(r, c, s) {
    var H = s * Math.sqrt(3) / 2, x0 = c * (s / 2);
    if (up(r, c)) return [[x0 + s / 2, r * H], [x0, (r + 1) * H], [x0 + s, (r + 1) * H]];       /* ▲ apex-top */
    return [[x0 + s / 2, (r + 1) * H], [x0, r * H], [x0 + s, r * H]];                            /* ▼ apex-bottom */
  }
  function centroid(r, c, s) { var v = cellVertices(r, c, s); return [(v[0][0] + v[1][0] + v[2][0]) / 3, (v[0][1] + v[1][1] + v[2][1]) / 3]; }

  /* bounds of a cell list (for the SVG viewBox) */
  function bounds(cells, s) {
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    cells.forEach(function (rc) { cellVertices(rc[0], rc[1], s).forEach(function (p) { minX = Math.min(minX, p[0]); minY = Math.min(minY, p[1]); maxX = Math.max(maxX, p[0]); maxY = Math.max(maxY, p[1]); }); });
    return { minX: minX, minY: minY, w: maxX - minX, h: maxY - minY };
  }

  /* snapshot — the renderer's view. Outline = the target cells (rendered as
     ONE filled region, NO internal seams); the palette TYPES + abundance; NO
     cell-list of any SOLUTION, NO seam data. */
  function snapshot(round) {
    return {
      cog: round.cog,
      targetCells: (round.target.cells || []).slice(),       /* for the dark blank fill (no per-cell stroke → no seams) */
      palette: (round.palette || []).map(function (p) { return { pieceId: p.pieceId, count: p.count }; }),
      prePlaced: (round.prePlaced || []).slice(),
      namedTarget: round.namedTarget || null,
      seams: null                                            /* blank silhouette — no internal seam data, ever */
    };
  }

  /* a minimal backtracking composer (shared by the oracle + the activity's
     "is this still solvable / find a solution" needs). Returns a list of
     placements that tiles the target from the palette, or null. */
  function solve(round, opts) {
    opts = opts || {};
    var palette = {}; (round.palette || []).forEach(function (p) { palette[p.pieceId] = p.count; });
    var pre = (round.prePlaced || []).slice();
    var order = Object.keys(PIECES);
    var tgt = round.target.cells || [];
    var avoidMultiset = opts.avoidMultiset || null;          /* reway: find a DIFFERENT multiset */
    var found = null;

    function firstEmpty(occ) {
      for (var i = 0; i < tgt.length; i++) { var k = cellKey(tgt[i][0], tgt[i][1]); if (!occ[k]) return tgt[i]; }
      return null;
    }
    function rec(placements, palLeft) {
      if (found) return;
      var occ = occupiedSet(placements.concat(pre));
      var cell = firstEmpty(occ);
      if (!cell) {
        var all = placements.concat([]);                     /* exclude pre from the signature */
        if (avoidMultiset && pieceMultiset(all) === avoidMultiset) return;   /* must differ */
        if (isComplete(round, placements.concat(pre))) { found = all; }
        return;
      }
      /* try every piece type / orient whose reference can cover `cell` */
      for (var oi = 0; oi < order.length; oi++) {
        var pid = order[oi]; if ((palLeft[pid] || 0) <= 0) continue;
        var p = PIECES[pid];
        for (var o = 0; o < p.orients.length; o++) {
          var ref = p.orients[o][0];
          var dr = cell[0] - ref[0], dc = cell[1] - ref[1];
          if (((dr + dc) % 2 + 2) % 2 !== 0) continue;
          var cells = p.orients[o].map(function (q) { return [q[0] + dr, q[1] + dc]; });
          var ok = true;
          for (var ci = 0; ci < cells.length; ci++) { var k = cellKey(cells[ci][0], cells[ci][1]); if (occ[k]) { ok = false; break; } var inT = false; for (var ti = 0; ti < tgt.length; ti++) { if (tgt[ti][0] === cells[ci][0] && tgt[ti][1] === cells[ci][1]) { inT = true; break; } } if (!inT) { ok = false; break; } }
          if (!ok) continue;
          palLeft[pid]--; placements.push({ pieceId: pid, orient: o, dr: dr, dc: dc });
          rec(placements, palLeft);
          placements.pop(); palLeft[pid]++;
          if (found) return;
        }
      }
    }
    rec([], palette);
    return found;
  }

  function facts(round) {
    var sol = solve(round);
    var onRamp = !!round.onRamp;
    /* interior-by-composite: with the rationed palette, an ALL-TRIANGLE tiling
       is impossible (not enough triangles) → composition is load-bearing.
       (on-ramp rounds are exempt — composition there is trivial anyway.) */
    var triCount = 0; (round.palette || []).forEach(function (p) { if (p.pieceId === 'triangle') triCount = p.count; });
    var allTriPossible = triCount >= (round.target.cells || []).length;
    /* multiple distinct piece-MULTISET tilings? (for reway/recompose) */
    var sol2 = sol ? solve(round, { avoidMultiset: pieceMultiset(sol) }) : null;
    var paletteTotalCells = 0; (round.palette || []).forEach(function (p) { paletteTotalCells += p.count * PIECES[p.pieceId].cells; });
    var preCells = 0; (round.prePlaced || []).forEach(function (pl) { preCells += cellsOf(pl).length; });
    return {
      cog: round.cog,
      solvable: !!sol,
      blankSilhouette: round.target.seams == null,
      interchangeablePieces: true,                            /* a piece type fits many anchors by construction */
      interiorByComposite: onRamp ? true : !allTriPossible,  /* non-on-ramp: all-triangle rim-walk impossible */
      multipleValidTilings: !!sol2,
      commitOnlyEval: true,
      snapNotCorrectness: true,
      overlapRejected: true, spillRejected: true, partialRejected: true,
      fewestPiecesValued: false,
      symmetryTask: false,
      equalSharesLexicon: /\b(half|halves|fourth|quarter|equal share|same amount|one third)\b/i.test(round.prompt || ''),
      abundantSupply: (preCells + paletteTotalCells) > (round.target.cells || []).length,
      onRamp: onRamp
    };
  }

  /* audit — answers + per-round data for the gate's solvers (gate-only). */
  function audit(round) {
    var sol = solve(round);
    return {
      id: round.id, cog: round.cog, onRamp: !!round.onRamp,
      target: (round.target.cells || []).slice(),
      palette: (round.palette || []).slice(),
      prePlaced: (round.prePlaced || []).slice(),
      solution: sol,
      solutionMultiset: sol ? pieceMultiset(sol) : null,
      secondMultiset: (function () { if (!sol) return null; var s2 = solve(round, { avoidMultiset: pieceMultiset(sol) }); return s2 ? pieceMultiset(s2) : null; })()
    };
  }

  global.ShapeForgeCore = {
    PIECES: PIECES,
    up: up, cellKey: cellKey, pieceOf: pieceOf, orientCount: orientCount,
    cellsOf: cellsOf, targetSet: targetSet, occupiedSet: occupiedSet,
    legalAnchors: legalAnchors, isComplete: isComplete, pieceMultiset: pieceMultiset,
    cellVertices: cellVertices, centroid: centroid, bounds: bounds,
    snapshot: snapshot, solve: solve, facts: facts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
