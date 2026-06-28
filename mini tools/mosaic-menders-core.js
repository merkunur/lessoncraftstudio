/* =====================================================================
   CORE — The Mosaic Menders  (mosaic-menders-core.js)
   ---------------------------------------------------------------------
   Cognition core for Game-80 "The Mosaic Menders of Tessella" (CCSS
   3.MD.C.5/6 — AREA as a count of unit squares: area = how many unit
   tiles cover a region). Built as the area-CONSERVATION-across-shape
   discrimination (a clean, leak-resistant slice of the design): Tessa
   needs a mosaic that uses the SAME number of tiles as a target — among
   decoys of DIFFERENT tile-count whose BOUNDING BOX is decorrelated from
   the area (a bigger-looking box has the wrong area). So "pick the
   biggest box" and "pick the one that looks largest" both MISFIRE; only
   reading area-as-tile-count (invariant under shape) discriminates.

   Answer is DERIVED, never stored: a round carries the target shape + a
   candidate set; the correct one is whichever has area === target area
   (area = the tile count, computed from the shape mask, never authored).
   ===================================================================== */
(function (global) {
  'use strict';

  /* shape library — each is a mask (rows of '1' = a tile, '.' = empty).
     area = count of '1' (the tiles that cover it); bbox = rows × cols of
     the mask. Shapes of the SAME area but DIFFERENT shape/bbox are the
     conservation pairs; bigger-bbox different-area shapes are the
     perceptual decoys. */
  var SHAPES = {
    r2x2:  ['11', '11'],                       /* a4  bbox 2×2=4  */
    bar4:  ['1111'],                           /* a4  bbox 1×4=4  */
    r2x3:  ['111', '111'],                     /* a6  bbox 2×3=6  */
    bar6:  ['111111'],                         /* a6  bbox 1×6=6  */
    col6:  ['1', '1', '1', '1', '1', '1'],     /* a6  bbox 6×1=6  */
    r3x2:  ['11', '11', '11'],                 /* a6  bbox 3×2=6  */
    r2x4:  ['1111', '1111'],                   /* a8  bbox 2×4=8  */
    L8:    ['11', '11', '11', '11'],           /* a8  bbox 4×2=8  */
    r3x3:  ['111', '111', '111'],              /* a9  bbox 3×3=9  */
    L9:    ['11', '11', '11', '11', '1.'],     /* a9  bbox 5×2=10 */
    r2x5:  ['11111', '11111'],                 /* a10 bbox 2×5=10 */
    bar10: ['1111111111'],                     /* a10 bbox 1×10=10*/
    r3x4:  ['1111', '1111', '1111'],           /* a12 bbox 3×4=12 */
    r2x6:  ['111111', '111111'],               /* a12 bbox 2×6=12 */
    r3x5:  ['11111', '11111', '11111']         /* a15 bbox 3×5=15 */
  };

  function area(name) {
    var rows = SHAPES[name], n = 0;
    for (var r = 0; r < rows.length; r++) for (var c = 0; c < rows[r].length; c++) if (rows[r][c] === '1') n++;
    return n;
  }
  function bboxArea(name) {
    var rows = SHAPES[name], w = 0;
    for (var r = 0; r < rows.length; r++) if (rows[r].length > w) w = rows[r].length;
    return rows.length * w;
  }
  function mask(name) { return SHAPES[name]; }
  function matches(targetName, candidateName) { return area(candidateName) === area(targetName); }

  /* the round pool. Each round: a target + 4 candidates (exactly ONE has
     the same area = the match; the rest differ in area). At least one
     decoy has a STRICTLY BIGGER bounding box than the match (so "biggest
     box" misfires) and at least one decoy has MORE tiles than the target
     (so "most tiles" misfires). The shell shuffles candidate order. */
  var ROUNDS = [
    { target: 'r2x3', match: 'bar6',  decoys: ['r3x3', 'r2x2'] }, /* a6  : decoy r3x3 bbox9>6 + a9>a6 */
    { target: 'r2x4', match: 'L8',    decoys: ['r3x3', 'bar4'] }, /* a8  : decoy r3x3 bbox9>8 + a9>a8 */
    { target: 'r3x4', match: 'r2x6',  decoys: ['r3x5', 'r3x3'] }, /* a12 : decoy r3x5 bbox15>12 + a15>a12 */
    { target: 'r2x5', match: 'bar10', decoys: ['r3x4', 'r2x2'] }, /* a10 : decoy r3x4 bbox12>10 + a12>a10 */
    { target: 'bar6', match: 'col6',  decoys: ['r2x4', 'r2x2'] }, /* a6  : decoy r2x4 bbox8>6 + a8>a6 */
    { target: 'r3x3', match: 'L9',    decoys: ['r2x6', 'r2x2'] }, /* a9  : decoy r2x6 bbox12>10(match) + a12>a9 */
    { target: 'r2x2', match: 'bar4',  decoys: ['r2x3', 'col6'] }, /* a4  : decoys bbox6>4 + a6>a4 */
    { target: 'L8',   match: 'r2x4',  decoys: ['r3x3', 'bar6'] }  /* a8  : decoy r3x3 bbox9>8 + a9>a8 */
  ];

  function candidates(round) {
    return [round.match].concat(round.decoys || []);  /* match first; engine shuffles position */
  }

  function buildRounds() {
    return ROUNDS.map(function (r) {
      return {
        target: r.target,
        match: r.match,
        decoys: r.decoys,
        promptKey: 'find',
        promptArgs: { n: area(r.target) }
      };
    });
  }

  global.MosaicMendersCore = {
    SHAPES: SHAPES,
    area: area,
    bboxArea: bboxArea,
    mask: mask,
    matches: matches,
    candidates: candidates,
    ROUNDS: ROUNDS,
    buildRounds: buildRounds
  };

}(typeof window !== 'undefined' ? window : this));
