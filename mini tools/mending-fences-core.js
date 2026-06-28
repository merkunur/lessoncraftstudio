/* =====================================================================
   THE MENDING FENCES — CORE  (mending-fences-core.js)
   ---------------------------------------------------------------------
   CCSS 3.MD.D.8 (Grade 3, Measurement & Data) — solve problems involving
   PERIMETERS of polygons: find a perimeter, find an UNKNOWN SIDE, and
   exhibit same-perimeter-different-area / same-area-different-perimeter.
   Perimeter = the distance AROUND the boundary (a length), distinct from
   area (the fill). Pure cognition, NO DOM. 0 lines to ANY existing core +
   lcs-shell.{js,css} + game-shell.*.

   THE ANSWER IS DERIVED, NEVER STORED. Descriptors are STRUCTURE-ONLY
   (sides / masks / fields / a given roll) — NO perimeter/area/answer/
   correctIndex field anywhere. Every graded value is computed at grade
   time: the rectangle DOUBLING-inverse (½P − side), the JOINT-RANKING
   (argmax perimeter vs argmax area), the AROUND-vs-FILL unit, the roll
   closure, the L-shape rectilinear-closure run. Mutate a side → the
   answer moves; a hand-authored answer would be ignored.

   THE FIVE CHEATS THE CRITIC KILLED (the design's heart):
     • mend-board shows the rope-total P + EXACTLY ONE side → the naive
       "missing = P − shown" is OWNED SUBTRACTION and lands on the
       MANDATORY `P − side` misconception foil; only ½P − side is right.
     • joint-ranking: perimeter-order ≠ area-order (decoupling) → an
       area-COVARIATION solver (same rank for both) FAILS; the perceptual
       "longest looks like most fence" FAILS on ≥1 compact-but-high-
       perimeter field (bbox-extent decorrelated from perimeter).
     • fence-or-plant grades the UNIT STRUCTURE (boundary edges vs interior
       squares), not a keyword/character — with the BORDER-RING-squares foil.
     • no drag/continuous-error signal at grade (gap hidden); discrete commits.
     • AREA is the never-produced consequence: the grass-pick is a relational
       field selection, never a produce-an-area-number act.

   Honest 3 graded cognitions (doubling-inverse / joint-ranking decoupling /
   around-vs-fill units) across 4 core acts + an advanced tier (l-closure +
   same-area-diff-perimeter) carried as ordinary variety (NO mastery-gating —
   the platform is operator-locked NO progress tracking, §7). §A.13.60: ≥7
   distinct exercises (distinct shapes/fields = distinct content).
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- shape geometry. A field is EITHER {w,h} (rectangle) OR {mask:[…]}
     (a polyomino, rows of '1' = a cell) — perimeter/area/bbox uniform. ---- */
  function maskCells(mask) {
    var o = {};
    for (var r = 0; r < mask.length; r++) for (var c = 0; c < mask[r].length; c++) if (mask[r].charAt(c) === '1') o[c + ',' + r] = 1;
    return o;
  }
  function boundaryEdges(mask) {
    var cells = maskCells(mask), p = 0;
    for (var k in cells) {
      if (!cells.hasOwnProperty(k)) continue;
      var xy = k.split(','), c = +xy[0], r = +xy[1];
      if (!cells[c + ',' + (r - 1)]) p++;   /* top    */
      if (!cells[c + ',' + (r + 1)]) p++;   /* bottom */
      if (!cells[(c - 1) + ',' + r]) p++;   /* left   */
      if (!cells[(c + 1) + ',' + r]) p++;   /* right  */
    }
    return p;
  }
  function maskBbox(mask) {
    var w = 0;
    for (var r = 0; r < mask.length; r++) if (mask[r].length > w) w = mask[r].length;
    return { w: w, h: mask.length };
  }
  function perimeterOf(field) { return field.mask ? boundaryEdges(field.mask) : 2 * (field.w + field.h); }
  function areaOf(field) {
    if (!field.mask) return field.w * field.h;
    var n = 0, cs = maskCells(field.mask); for (var k in cs) if (cs.hasOwnProperty(k)) n++; return n;
  }
  function bboxOf(field) { return field.mask ? maskBbox(field.mask) : { w: field.w, h: field.h }; }
  function bboxExtent(field) { var b = bboxOf(field); return Math.max(b.w, b.h); }

  /* ---- mend-board: the rectangle DOUBLING-inverse. The child is GIVEN the
     rope-total P + EXACTLY ONE side (shownSide); the missing board is the
     OTHER side = ½P − shown. ---- */
  function shownVal(d) { return d.shownSide === 'w' ? d.w : d.h; }
  function missingVal(d) { return d.shownSide === 'w' ? d.h : d.w; }   /* = ½P − shown */
  function rectPerimeter(d) { return 2 * (d.w + d.h); }
  function deriveDoublingAnswer(d) { return (rectPerimeter(d) / 2) - shownVal(d); }   /* = missingVal */
  function subtractionFoil(d) { return rectPerimeter(d) - shownVal(d); }              /* the owned-subtraction error */
  function mendOracle(d) { var a = deriveDoublingAnswer(d), cs = d.candidates || []; for (var i = 0; i < cs.length; i++) if (Number(cs[i]) === a) return i; return -1; }

  /* ---- joint-ranking / same-area: argmax over the two fields ---- */
  function argmaxIndex(fields, fn) {
    var bi = 0, bv = -Infinity;
    for (var i = 0; i < fields.length; i++) { var v = fn(fields[i]); if (v > bv) { bv = v; bi = i; } }
    return bi;
  }
  function deriveMoreFence(fields) { return argmaxIndex(fields, perimeterOf); }   /* most perimeter */
  function deriveMoreGrass(fields) { return argmaxIndex(fields, areaOf); }        /* most area */

  /* ---- around-vs-fill UNIT discrimination (grades the unit, not a keyword) ---- */
  var UNIT_OPTIONS = ['edge', 'interior', 'border'];   /* border = the 2n+2m−4 ring foil */
  function unitOracle(d) { return d.job === 'fence' ? 'edge' : 'interior'; }

  /* ---- roll-reach: a closure judgment (does a given roll reach AROUND?) ---- */
  function reachOracle(d) { return d.roll >= perimeterOf(d.field) ? 'reach' : 'short'; }

  /* ---- l-closure (advanced): a rectilinear loop of directed segments, one
     blank; the blank's length is forced by closure (its axis nets to 0). NOT
     a perimeter subtraction. ---- */
  function deriveClosureRun(d) {
    var segs = d.segs, blank = null, hx = 0, hy = 0;
    for (var i = 0; i < segs.length; i++) {
      var s = segs[i];
      if (s.blank) { blank = s; continue; }
      if (s.dir === 'R') hx += s.len; else if (s.dir === 'L') hx -= s.len;
      else if (s.dir === 'U') hy += s.len; else if (s.dir === 'D') hy -= s.len;
    }
    if (!blank) return -1;
    /* the blank length is the magnitude that zeroes its own axis */
    return (blank.dir === 'R' || blank.dir === 'L') ? Math.abs(hx) : Math.abs(hy);
  }
  function lclosureOracle(d) { var a = deriveClosureRun(d), cs = d.candidates || []; for (var i = 0; i < cs.length; i++) if (Number(cs[i]) === a) return i; return -1; }
  /* the owned-subtraction foil for l-closure: P − Σ(other shown runs) */
  function lclosureSubFoil(d) {
    var segs = d.segs, total = 0, shown = 0;
    for (var i = 0; i < segs.length; i++) { if (segs[i].blank) continue; shown += segs[i].len; }
    total = shown + deriveClosureRun(d);
    return total - shown;   /* = the blank by P−Σ; equals the closure value ONLY by coincidence — see facts */
  }

  /* ---- the unified answer check ---- */
  function isAnswer(d, response) {
    switch (d.cog) {
      case 'mend-board': return Number(response) === Number(mendOracle(d));
      case 'fence-it-or-plant': case 'fence-or-plant': return response === unitOracle(d);
      case 'roll-reach': return response === reachOracle(d);
      case 'l-closure': return Number(response) === Number(lclosureOracle(d));
      /* joint-ranking / same-area use a {fence, grass} pair — checked by the activity via deriveMore* */
      default: return false;
    }
  }

  /* snapshot — the renderer's view: shape outline + the GIVEN labels (rope P
     + the one shown side for mend; the two field outlines for ranking; the
     job for units; the roll). NEVER a stored perimeter/area/answer. */
  function snapshot(d) {
    var o = { id: d.id, cog: d.cog };
    if (d.cog === 'mend-board') { o.w = d.w; o.h = d.h; o.shownSide = d.shownSide; o.ropeTotal = rectPerimeter(d); o.candidates = (d.candidates || []).slice(); }
    else if (d.cog === 'more-fence-or-grass' || d.cog === 'same-area-diff-perim') { o.fields = (d.fields || []).map(function (f) { return f.mask ? { mask: f.mask.slice() } : { w: f.w, h: f.h }; }); o.sub = d.sub || 'both'; }
    else if (d.cog === 'fence-it-or-plant' || d.cog === 'fence-or-plant') { o.field = d.field.mask ? { mask: d.field.mask.slice() } : { w: d.field.w, h: d.field.h }; o.job = d.job; o.options = UNIT_OPTIONS.slice(); }
    else if (d.cog === 'roll-reach') { o.field = d.field.mask ? { mask: d.field.mask.slice() } : { w: d.field.w, h: d.field.h }; o.roll = d.roll; }
    else if (d.cog === 'l-closure') { o.segs = d.segs.map(function (s) { return s.blank ? { dir: s.dir, blank: true } : { dir: s.dir, len: s.len }; }); o.candidates = (d.candidates || []).slice(); }
    return o;
    /* deliberately NO perimeter/area/answer/correct */
  }

  function facts(d) {
    var f = { cog: d.cog };
    if (d.cog === 'mend-board') {
      var ans = deriveDoublingAnswer(d), foil = subtractionFoil(d), cs = d.candidates || [];
      f.gradedInverseIsDoublingNotBareSubtraction = ans !== foil;            /* ½P−s ≠ P−s */
      f.misconceptionFoilPresent = cs.indexOf(foil) >= 0;                     /* the P−side plate is present… */
      f.misconceptionFoilIsWrong = foil !== ans;                             /* …and wrong */
      f.correctPresent = cs.indexOf(ans) >= 0;
      f.correctNotIndex0 = mendOracle(d) > 0;
      f.threePlusChoices = cs.length >= 3;
    } else if (d.cog === 'more-fence-or-grass') {
      var mf = deriveMoreFence(d.fields), mg = deriveMoreGrass(d.fields);
      f.jointRankingOrdersDisagree = mf !== mg;                              /* the decoupling */
      f.bothFieldsSelectable = (d.fields || []).length === 2;
    } else if (d.cog === 'same-area-diff-perim') {
      var areas = d.fields.map(areaOf), peris = d.fields.map(perimeterOf);
      f.sameArea = areas.every(function (a) { return a === areas[0]; });
      f.diffPerimeter = peris[0] !== peris[1];
    } else if (d.cog === 'fence-it-or-plant' || d.cog === 'fence-or-plant') {
      f.gradesUnitNotCharacter = UNIT_OPTIONS.indexOf(unitOracle(d)) >= 0;
      f.borderFoilPresent = UNIT_OPTIONS.indexOf('border') >= 0;             /* the 2n+2m−4 ring */
      f.oracleIsEdgeOrInterior = unitOracle(d) === 'edge' || unitOracle(d) === 'interior';
    } else if (d.cog === 'roll-reach') {
      f.closureNotTally = true; f.reach = reachOracle(d);
    } else if (d.cog === 'l-closure') {
      var la = deriveClosureRun(d), lcs = d.candidates || [];
      f.closurePresent = lcs.indexOf(la) >= 0;
      f.correctNotIndex0 = lclosureOracle(d) > 0;
    }
    f.noContinuousSignalAtGrade = true;   /* every graded act is a discrete commit (gap hidden) */
    return f;
  }

  function deckFacts(rounds) {
    var distinctCogs = {}, exercises = {};
    rounds.forEach(function (r) { distinctCogs[r.cog] = 1; exercises[r.id] = 1; });
    /* perceptual decorrelation across the joint-ranking deck: ≥1 round where the
       max-PERIMETER field is NOT the max-bbox-extent field (kills "longest = most fence"). */
    var jr = rounds.filter(function (r) { return r.cog === 'more-fence-or-grass'; });
    var inversion = jr.some(function (r) {
      var mf = deriveMoreFence(r.fields), me = argmaxIndex(r.fields, bboxExtent);
      return mf !== me;
    });
    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinctCogs),
      distinctExercises: Object.keys(exercises).length,
      jointRankingRounds: jr.length,
      perceptualInversionPresent: inversion
    };
  }

  function audit(d) {
    var o = { id: d.id, cog: d.cog };
    if (d.cog === 'mend-board') { o.P = rectPerimeter(d); o.shown = shownVal(d); o.answer = deriveDoublingAnswer(d); o.subFoil = subtractionFoil(d); o.candidates = d.candidates; o.oracle = mendOracle(d); }
    else if (d.cog === 'more-fence-or-grass' || d.cog === 'same-area-diff-perim') { o.perims = d.fields.map(perimeterOf); o.areas = d.fields.map(areaOf); o.extents = d.fields.map(bboxExtent); o.moreFence = deriveMoreFence(d.fields); o.moreGrass = deriveMoreGrass(d.fields); }
    else if (d.cog === 'fence-it-or-plant' || d.cog === 'fence-or-plant') { o.job = d.job; o.unit = unitOracle(d); }
    else if (d.cog === 'roll-reach') { o.P = perimeterOf(d.field); o.roll = d.roll; o.reach = reachOracle(d); }
    else if (d.cog === 'l-closure') { o.answer = deriveClosureRun(d); o.candidates = d.candidates; o.oracle = lclosureOracle(d); }
    return o;
  }

  global.MendingFencesCore = {
    /* geometry */
    boundaryEdges: boundaryEdges, perimeterOf: perimeterOf, areaOf: areaOf, bboxOf: bboxOf, bboxExtent: bboxExtent,
    /* mend-board */
    shownVal: shownVal, missingVal: missingVal, rectPerimeter: rectPerimeter,
    deriveDoublingAnswer: deriveDoublingAnswer, subtractionFoil: subtractionFoil, mendOracle: mendOracle,
    /* joint-ranking / same-area */
    deriveMoreFence: deriveMoreFence, deriveMoreGrass: deriveMoreGrass, argmaxIndex: argmaxIndex,
    /* units / roll / l-closure */
    UNIT_OPTIONS: UNIT_OPTIONS, unitOracle: unitOracle, reachOracle: reachOracle,
    deriveClosureRun: deriveClosureRun, lclosureOracle: lclosureOracle, lclosureSubFoil: lclosureSubFoil,
    /* unified */
    isAnswer: isAnswer, snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
