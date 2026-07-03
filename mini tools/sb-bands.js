/* ============================================================================
   sb-bands.js — the grade-band INTERACTION profile (tolerances, tap-target
   sizes, a11y knobs) that the storybook player + the pre-school modules consume.

   UMD: attaches `window.SB_BANDS` in the browser AND `module.exports` in Node
   (validate-story.js / gate-story.js). This is the SINGLE SOURCE OF TRUTH for the
   runtime/spatial tolerance NUMBERS. It is DISJOINT from gate-story.js GRADE_ENV
   (which owns the author-time NARRATIVE numbers: pages/words/lines/numberCeil) —
   no number lives in both, so the two can't drift.

   All spatial values are DESIGN UNITS (du) in the 1600×1000 design space. At the
   0.35 minimum-stage scale, 44 real px = 126du, so PK targets (≥200du = 70px) clear
   the 44px floor unaided (they never depend on the CSS min-width:44px clamp).

   How it reaches a module: the player resolves the story's grade
   (story.alignment.grade) → SB_BANDS[grade] || SB_BANDS.defaults, and freezes it
   onto ctx.band. Legacy / K-3 modules simply never read ctx.band → zero change.
   New pre-school modules read ctx.band.<knob>; validateTask enforces the FATAL
   minimums (band.fatal) via v.band in validate-story.js.
   ========================================================================= */
(function (root, factory) {
  'use strict';
  var B = factory();
  if (typeof module !== 'undefined' && module.exports) { module.exports = B; }
  if (typeof window !== 'undefined') { window.SB_BANDS = B; }
}(this, function () {
  'use strict';

  /* K-3 default profile (today's behavior). Only NEW pre-school modules read a band
     at all; existing modules ignore it, so these defaults are conservative and only
     matter if a new module is authored at a K-3 grade. */
  var defaults = {
    grade: null,
    minTapTarget: 112,          // du — smallest tappable hit area
    minDragHandle: 140,         // du — smallest draggable grab area
    dragCaptureRadius: 80,      // du — off-center press still grabs the nearest draggable
    nearFitSnapRadius: 120,     // du — release-to-home snap for a shape/piece
    pathBandHalfWidth: 70,      // du — trace corridor half-width (full = ×2)
    offPathGraceDu: 100,        // du — past the band edge before a guide-back nudge
    offPathGraceMs: 600,        // ms — dwell off-band before a guide-back nudge
    mazeCorridorWidth: 220,     // du — clear walkable width along the solution path
    wallPenetrationBeforeBounce: 30, // du — soft overlap before the bounce fires
    jigsawPieceSnapRadius: 140, // du — big-piece assembly snap
    maxTaps: 8,                 // max tappable targets per task
    maxDrags: 5,                // max draggables per task
    idleNudgeMs: 20000,         // ms — idle before an audio nudge
    ghostDemoAfterMisses: 3,    // misses before the ghost-hand / hint fires
    coverageCompletionThreshold: 0.85, // fraction of a form "filled" = done
    missEquity: 3,              // misses before the audio-equity visual tell auto-fires
    muteEquity: true,          // reveal the text/visual equity immediately when muted
    minLegendSwatch: 112,       // du — color-code legend chip
    minGoalRegion: 160,         // du — a drop / fill region
    rmFallback: 'tap-along'     // reduced-motion fallback style for continuous gestures
  };

  /* Pre-school (ages 3–5) profile — ~2× the adult floors; wide, forgiving tolerances,
     gentle failure, audio-first. Values from the early-childhood tolerance design. */
  var PK = {
    grade: 'PK',
    minTapTarget: 200, minDragHandle: 240, dragCaptureRadius: 150,
    nearFitSnapRadius: 220, pathBandHalfWidth: 130, offPathGraceDu: 170, offPathGraceMs: 900,
    mazeCorridorWidth: 340, wallPenetrationBeforeBounce: 60, jigsawPieceSnapRadius: 260,
    maxTaps: 4, maxDrags: 3, idleNudgeMs: 30000, ghostDemoAfterMisses: 2,
    coverageCompletionThreshold: 0.70, missEquity: 2, muteEquity: true,
    minLegendSwatch: 200, minGoalRegion: 260, rmFallback: 'tap-along',
    stickySpring: 0.15,        // maze/trace centerline assist strength (0..1 fraction/frame)
    cornerBandFactor: 1.6,     // widen the trace band near vertices (toddlers round corners)
    /* FATAL publish minimums for a PK page (a page below any of these fails validate-story). */
    fatal: {
      minTapTarget: 200, minDragHandle: 240, nearFitSnapRadius: 180, pathBandHalfWidth: 110,
      mazeCorridorWidth: 300, maxTaps: 4, maxDrags: 3, coverageCompletionThreshold: 0.75,
      minLegendSwatch: 180
    }
  };

  /* K/1/2/3 all run the K-3 default interaction profile (only PK needs the wide band). */
  return { PK: PK, defaults: defaults, K: defaults, '1': defaults, '2': defaults, '3': defaults };
}));
