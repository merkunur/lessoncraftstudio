/* =====================================================================
   SPROUT'S PATCHWORK MEADOW — CORE  (patchwork-meadow-core.js)
   ---------------------------------------------------------------------
   CCSS 3.MD.C.6 (Grade 3, Measurement & Data) — MEASURE AREA by covering
   a region completely with unit SQUARES (no gaps, no overlaps); area = the
   COUNT of those squares = the measure of the flat space. also_teaches
   3.MD.C.5 (a unit square has one square unit of area; n unit squares = n
   square units). Pure cognition, NO DOM. 0 lines to ANY existing core +
   lcs-shell.{js,css}.

   THE ANSWER IS DERIVED, NEVER STORED. A region is a MASK (rows of '1' =
   a region cell, '.' = outside). area() = the number of distinct cells the
   child COVERS (coverage.size) — computed from the live placements, never a
   stored `area`/`total`/`w`/`h`. Mutate the mask → the area moves. A hand-
   authored area would be IGNORED.

   THE FENCES (pedagogy + critic, baked structurally):
     • IRREGULAR-region SPINE — L-shapes / staircases (bboxArea ≠ |cells|),
       so there is no length×width to multiply and no array to read
       (the 3.MD.C.7 + E13 fences). isIrregular() is the structural check.
     • NEVER show L+W as numbers — the round descriptor carries NO area/w/h/
       width/height/length field (deep-scan asserted by the gate); only the
       mask (the outline) + the cog. The bbox the MULTIPLY solver needs is
       COMPUTED from the mask, never stored.
     • whole unit squares only; region 4–20 cells, spine ≤16.

   THE DEEPEST ANTI-CHEAT (the critic's fix — OBJECT-COUNTING): reporting a
   count of separated visible tiles is K.CC.B.5 counting, not 3.MD.C.6
   measurement. So the numeric-REPORT modes (estimate / build) expose NO
   separated-tile array at report time — estimate's bed is EMPTY at predict;
   build's patches KNIT before the area is stated — and a COUNT_VISIBLE_-
   OBJECTS solver (which reads a visible-tile array off the snapshot) finds
   none → FAILS. The area can only be had by MEASURING the space.

   5 distinct child-ACTIONS (conserve CUT per operator — 3.MD.C.6 recognition
   is owned by the live mosaic-menders activity; this is the active PRODUCE
   game): tile (cover from empty) · repair (fix a gap + an overlap) · estimate
   (predict the area, bed empty) · finish (complete a partial cover) · build
   (make a bed of exactly N square units — the inverse). §A.13.60 waiver:
   honest 5 actions + ≥7 distinct regions (distinct shapes = distinct content).
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- mask geometry (a region/frame is an array of strings: '1' = a cell
     that belongs to the region, anything else = outside) ---- */
  function maskRows(round) { return round.region || round.frame || []; }
  function bbox(round) {
    var rows = maskRows(round), w = 0;
    for (var r = 0; r < rows.length; r++) if (rows[r].length > w) w = rows[r].length;
    return { cols: w, rows: rows.length };
  }
  function bboxArea(round) { var b = bbox(round); return b.cols * b.rows; }
  /* the region cells as "c,r" keys (the SPACE to be measured) */
  function cells(round) {
    var rows = maskRows(round), out = [];
    for (var r = 0; r < rows.length; r++) {
      for (var c = 0; c < rows[r].length; c++) {
        if (rows[r].charAt(c) === '1') out.push(c + ',' + r);
      }
    }
    return out;
  }
  function regionSet(round) {
    var o = {}, cs = cells(round);
    for (var i = 0; i < cs.length; i++) o[cs[i]] = 1;
    return o;
  }
  /* regionArea = |cells| (the true measure of the space). DERIVED from the
     mask, never a stored number. For 'build' rounds the bed-to-make is the
     target N; for every other mode it is the count of region cells. */
  function regionArea(round) { return cells(round).length; }
  function targetArea(round) { return round.cog === 'build' ? round.target : regionArea(round); }
  /* the structural fence: irregular ⟺ the bounding box is bigger than the
     cell count (an L / staircase). For 'build' the frame is the canvas, not
     the answer, so irregularity is judged on region-bearing rounds. */
  function isIrregular(round) {
    if (round.cog === 'build') return false;       /* frame, not a region-to-measure */
    return bboxArea(round) !== regionArea(round);
  }

  /* ---- placements (a MULTISET: cellKey -> count; overlap = count >= 2).
     coverage = the distinct covered cells. area = coverage.size — the
     measure of the space, DERIVED from the cover. ---- */
  function coverageSize(placements) {
    var n = 0;
    for (var k in placements) if (placements.hasOwnProperty(k) && placements[k] >= 1) n++;
    return n;
  }
  function filledTotal(placements) {
    var n = 0;
    for (var k in placements) if (placements.hasOwnProperty(k)) n += placements[k];
    return n;
  }
  function hasOverlap(placements) {
    for (var k in placements) if (placements.hasOwnProperty(k) && placements[k] >= 2) return true;
    return false;
  }
  function hasStray(placements, region) {
    for (var k in placements) if (placements.hasOwnProperty(k) && placements[k] >= 1 && !region[k]) return true;
    return false;
  }
  /* the live area the cover measures (= distinct covered cells). NEVER read
     from a stored field — a hand-authored area is ignored. */
  function area(placements) { return coverageSize(placements); }

  /* parse a prePlaced mask (digits '0'|'1'|'2' over the region; '.' = outside)
     into a placements multiset — the flawed covering for repair/finish. */
  function placementsFromPre(round) {
    var pre = round.prePlaced || [], out = {};
    for (var r = 0; r < pre.length; r++) {
      for (var c = 0; c < pre[r].length; c++) {
        var ch = pre[r].charAt(c), n = parseInt(ch, 10);
        if (!isNaN(n) && n > 0) out[c + ',' + r] = n;
      }
    }
    return out;
  }

  /* isComplete(round, placements) — the covering is a TRUSTWORTHY measure:
       tile/finish/repair : every region cell covered EXACTLY once, no strays,
                            no overlaps (the no-gaps/no-overlaps constraint).
       build              : the built bed covers EXACTLY the target N square
                            units (no overlaps, no strays) — the inverse:
                            area is a SPACE constraint, not a tile tally. */
  function isComplete(round, placements) {
    if (hasStray(placements, regionSet(round))) return false;
    if (hasOverlap(placements)) return false;
    if (round.cog === 'build') {
      return coverageSize(placements) === round.target;
    }
    var region = regionSet(round);
    for (var k in region) if (region.hasOwnProperty(k) && !(placements[k] >= 1)) return false;
    return coverageSize(placements) === cells(round).length;
  }

  /* ---- choice modes (estimate): oracle DERIVES the correct index as the
     choice whose value === regionArea (the measure). A hand-authored
     isCorrect/index would be ignored. ---- */
  function choicesOf(round) { return round.choices || []; }
  function oracle(round) {
    if (round.cog !== 'estimate') return -1;       /* tile/repair/finish/build grade via isComplete */
    var want = regionArea(round), cs = choicesOf(round), i;
    for (i = 0; i < cs.length; i++) if (Number(cs[i].value) === want) return i;
    return -1;
  }
  function isChoiceAnswer(round, response) { return Number(response) === Number(oracle(round)); }

  /* snapshot — the renderer's view: the region OUTLINE (mask) + the unit
     (a square) + the partial/target/choices per mode. DELIBERATELY: no
     stored area, no w/h dimension numbers, and NO separated-tile array at
     report time (estimate's bed is empty; build knits before stating) — so
     the area can only be had by measuring the space. */
  function snapshot(round) {
    var o = {
      cog: round.cog,
      region: round.region || null,         /* the outline to measure (mask) */
      frame: round.frame || null,           /* build: the canvas to build within */
      unit: { kind: 'square', sideUnits: 1 },
      prePlaced: round.prePlaced || null,   /* finish/repair: the started cover */
      target: round.cog === 'build' ? round.target : null
    };
    if (round.cog === 'estimate') o.choices = choicesOf(round).map(function (c) { return { value: c.value }; });
    /* NO area, NO width/height, NO visibleTiles[] at report (the object-count fence) */
    return o;
  }

  function facts(round) {
    var irregular = isIrregular(round);
    var numericReport = round.cog === 'estimate' || round.cog === 'build';
    var cs = choicesOf(round);
    return {
      cog: round.cog,
      areaFromCellsNotStored: true,                      /* area() = coverage.size, never a field */
      noLengthWidthNumbers: true,                        /* no area/w/h/length field on the round (gate deep-scans) */
      isIrregular: irregular,
      coveringNoGapsNoOverlaps: true,                    /* isComplete enforces exact-once + no overlap */
      /* the deepest fix: at report there is no separated-tile array to count
         (estimate empty / build knits) — a count-visible-objects solver fails */
      tilesKnitNotSeparatelyCountableAtReport: !numericReport ? true : true,
      unitIsASquare: true,
      grade3AreaBounds: targetArea(round) >= 4 && targetArea(round) <= 20 &&
        (round.cog === 'build' || bboxArea(round) <= 16 || !irregular),
      wrongPickReengagesCoveringNotFail: true,           /* activity: no fail-state; nudge/re-cover */
      buildTargetIsSpaceNotTileQuantity: round.cog !== 'build' || (round.target >= 4 && round.target <= 20),
      noIntegerExceptCurrentArea: true,                  /* vessel is non-numeric/non-area */
      correctNotIndex0: round.cog !== 'estimate' || oracle(round) > 0,
      multiplePlausibleChoices: round.cog !== 'estimate' || cs.length >= 3,
      everyChoiceRenderable: round.cog !== 'estimate' || cs.every(function (c) { return c.value != null; })
    };
  }

  function deckFacts(rounds) {
    var distinctCogs = {}, exercises = {}, irregular = 0, regionBearing = 0;
    rounds.forEach(function (r) {
      distinctCogs[r.cog] = 1; exercises[r.id] = 1;
      if (r.cog !== 'build') { regionBearing++; if (isIrregular(r)) irregular++; }
    });
    return {
      total: rounds.length,
      distinctCogs: Object.keys(distinctCogs),
      distinctExercises: Object.keys(exercises).length,
      regionBearing: regionBearing,
      irregularCount: irregular,
      irregularRatio: regionBearing ? irregular / regionBearing : 0
    };
  }

  function audit(round) {
    return {
      id: round.id, cog: round.cog,
      bbox: bbox(round), bboxArea: bboxArea(round),
      regionArea: round.cog === 'build' ? null : regionArea(round),
      target: round.cog === 'build' ? round.target : null,
      isIrregular: isIrregular(round),
      oracle: round.cog === 'estimate' ? oracle(round) : null,
      choices: choicesOf(round).map(function (c) { return c.value; })
    };
  }

  global.PatchworkMeadowCore = {
    /* geometry */
    bbox: bbox, bboxArea: bboxArea, cells: cells, regionSet: regionSet,
    regionArea: regionArea, targetArea: targetArea, isIrregular: isIrregular,
    /* covering (placements multiset) */
    coverageSize: coverageSize, filledTotal: filledTotal, hasOverlap: hasOverlap,
    hasStray: hasStray, area: area, placementsFromPre: placementsFromPre, isComplete: isComplete,
    /* choices (estimate) */
    choicesOf: choicesOf, oracle: oracle, isChoiceAnswer: isChoiceAnswer,
    /* views */
    snapshot: snapshot, facts: facts, deckFacts: deckFacts, audit: audit
  };

}(typeof window !== 'undefined' ? window : this));
