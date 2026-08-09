/* =====================================================================
   THE BAKING TRAY — premium tool #46            (PREV = exchange-machine)
   ---------------------------------------------------------------------
   THE TOPIC is the one every Grade-3 teacher dreads: multiplication
   arrives as chanting and the meaning never lands. The target is
   CCSS 3.OA.B.5 — apply properties of operations as strategies — whose
   own worked example is literally 8 x 7 = 8 x (5 + 2) = (8x5) + (8x2).
   In Germany this is the Kernaufgaben / Ableiten tradition (Wittmann &
   Mueller). MEASURED, not assumed: 3.OA.B.5 is claimed by ZERO
   activities and ZERO printables on this platform.

   THE OBJECT is a tray of tear-and-share buns baked TOUCHING each other
   in R rows of C. The seam where two buns meet is a gridline. There are
   exactly three moves and there will never be a fourth:

       ROTATE  a quarter turn      — the same buns, read the other way
       CRACK   along one seam      — 7 rows of 6 -> 5 rows of 6 + 2 of 6
       PUSH    the pieces together — the exact inverse of the crack

   THE COUNT NEVER CHANGES. That is the invariant, and it is Wittmann's
   operative principle: perform an operation on an object and ask what
   changed and what did not.

   ⭐ THE THESIS IS NOT "ROTATION DEMONSTRATES COMMUTATIVITY", and the
   difference is load-bearing. The platform already ships echo-grove
   (3.OA.A.1), which teaches that 3 groups of 4 and 4 groups of 3 are
   DIFFERENT SITUATIONS — and it is right. So this tool never claims
   they are the same. It claims something narrower and more useful:
   ROTATING CHANGES WHICH SEAMS ARE AVAILABLE TO CRACK. A 7x6 offers
   row-seams at 1..6; turn it and it offers seams at 1..5 across a 6.
   Rotate is a subordinate, strategic move in service of the crack, so
   it never has to take a position on a x b = b x a at all.

   ⭐⭐ THE INVENTION — WORDLESS DISTRIBUTIVITY.
   Numerals live ONLY on the assembly's edges: the row count on the
   LEFT, the in-a-row count on the TOP. POSITION CARRIES THE MEANING,
   because "3 x 4" does not mean the same thing in all eleven markets —
   the German reading is *3 mal 4*, three fours — so no operator may be
   printed and none is needed. On a crack the left-edge 7 SPLITS into a
   5 and a 2, each riding its own piece, and the 6 DUPLICATES onto every
   piece. Push them back and they fuse. That is the distributive law
   written entirely in numerals, in no language, and it is the one thing
   this apparatus can do that no physical tray can.

   ---------------------------------------------------------------------
   THE FENCE, run fresh across all four surfaces before a line was
   written — AND IT CHANGED THE TOOL. The idea as filed was
   groups -> array -> rotate -> crack. THREE OF THOSE FOUR ARE BUILT:

     · array-core.js `build-array` + `equal-groups` (2.OA.C.4, live in 11
       locales) own tapping cells to CONSTRUCT an R x C array with a
       repeated-addition strip and a keypad total. 3x4 AND 4x3 are
       already two of its eight rounds.
     · draw-partition-core.js `winter-piles` owns DRAWING a cut line
       across a given array — but it cuts on row boundaries only and
       REQUIRES EVERY PIECE TO BE EQUAL.
     · 18 printable types own arrays/equal-groups/multiplication,
       including G3-314 which draws an array AND ITS TRANSPOSE SIDE BY
       SIDE, and G2-212 which uses the transpose as a wrong-answer decoy.

   So, per §23.3, the overlap is SUBTRACTED rather than negotiated. What
   is empty repo-wide, and all this tool is:

     🟢 ROTATE — nothing anywhere rotates an array. The printables must
        draw the transpose as a SECOND, SEPARATE array; this is ONE
        object that turns.
     🟢 THE UNEQUAL CRACK — 7x6 -> 5x6 + 2x6. Zero implementations on
        any surface, print included. `distributive` appears in no engine
        anywhere. draw-partition-core actively grades it WRONG.

   ⚠ CROSS-PRODUCT NOTE, measured not assumed: winter-piles tells the
   child "Those piles aren't equal yet — make them all the same."
   A child who has done it arrives here already trained that an unequal
   cut is an ERROR, which is the single most important move in this
   tool. Mitigated in the teacher copy (crack UNEQUALLY first), and the
   pieces are never banded or coloured the way winter-piles bands its
   piles.

   ---------------------------------------------------------------------
   THE REFUSE-LIST. Every one of these will be requested by someone
   reasonable, and each one is fatal.

    1. NEVER the product as a number. Not on the tray, not on a piece,
       not on hover, not on release, not at the end, not behind a
       setting, NOT EVEN IN AN ARIA-LABEL. The labels say "7 rows of 6".
       They never say "42". The material is the evidence, not the
       arithmetic — and note the trap: 30 + 12 = 42 is HARDER than the
       fact it was meant to help with.
    2. NEVER a x symbol, and never + or =. See the thesis: no reading of
       "3 x 4" is correct in all eleven languages. Position replaces it.
    3. NEVER check, grade, approve or celebrate. This is the whole
       remainder over winter-piles; if the tray evaluates, there is no
       new tool.
    4. NEVER suggest a seam. The 5-groove is a groove IN THE MATERIAL,
       not a hint — a recommended seam is a covert grade, and
       disagreement between two children is the content.
    5. NEVER a cut that is not on a seam. No free-draw, no diagonal.
    6. NEVER a perpendicular second crack. Four quadrants is
       (a+b)(c+d), needs notation to be read, and this tool has none.
    7. NEVER add or remove a bun. Not even "eat one".
    8. NEVER subtraction/compensation: 9x7 = 10x7 - 7 is a real strategy
       and is STRUCTURALLY OUTSIDE this tool. Do not bolt it on.
    9. NEVER colour-code the pieces. Colour implies a first and a
       second, and order is a claim.
   10. NEVER a numeral anywhere but an assembly edge. A numeral in a
       fixed HUD is a readout, and a readout is an answer machine.
   11. NEVER two trays side by side. That converts identity-of-one-
       object into equality-of-two-objects, which is a weaker argument.
   12. NEVER remember anything across reloads. The teacher opening this
       cold in front of 25 children must get the same first screen.
   13. NEVER sound that carries meaning. Six of eleven locales have no
       reliable voice; the tool is fully legible muted.

   ---------------------------------------------------------------------
   THE FIVE LAWS THE GATE PROVES, EXHAUSTIVELY, WITH ITS OWN ORACLE:

     L1 CONSERVATION   sum of piece areas === rows * cols, at EVERY
                       reachable state. The whole thesis.
     L2 THE NUMERAL    the split spans sum to the original edge numeral,
                       and the duplicated numeral is identical on every
                       piece.
     L3 ISOMETRY       rotate maps (r,c) -> (c,r), count fixed, is its
                       own inverse four times over, and is REFUSED on a
                       cracked tray.
     L4 REFUSALS       perpendicular cut, third cut, resize-while-
                       cracked, rotate-while-cracked, duplicate cut,
                       out-of-range seam — each returns null, never a
                       clamp.
     L5 REVERSIBILITY  push(crack(s,k),k) deep-equals s, for every
                       reachable s and every legal k.

   ⭐ THE GEOMETRY IS THE CONSERVATION GUARANTEE, not a layout
   convenience. pitch = trayBox / (max(R,C) + SLACK) on a SQUARE tray
   box. max(R,C) is SYMMETRIC IN R AND C, so a quarter turn CANNOT
   change the bun diameter and the rotation needs no rescale term at
   all. The crack gaps are likewise pre-reserved whether or not the tray
   is cracked. So neither of the two moves that must conserve quantity
   can alter a bun by one pixel — the invariant is structural rather
   than animated well.

   ⭐ AND THE COMB IS FORCED BY ARITHMETIC, NOT CHOSEN BY TASTE. A
   10-row tray has 9 interior seams; 9 x 34px = 306px and a 320px
   viewport offers a 296px stage, so ONE LANE OF SEAM TARGETS IS
   IMPOSSIBLE. Worse, row-seam targets need an x-band and column-seam
   targets need a y-band, AND A BAND ALWAYS INTERSECTS A BAND — so both
   combs must live outside the tray. Hence staggered lanes in the left
   and top gutters, verified non-overlapping across all 100 trays.
   ===================================================================== */

(function () {
  'use strict';

  /* ---- geometry, in viewBox units (the arena is 1000 x 1000) --------
     ⚠ THE CAP IS ON THE WIDTH of the aspect-ratio:1/1 arena. Capping the
     HEIGHT letterboxes the SVG inside its box while the %-positioned
     HTML buttons stay positioned against the box — which is exactly the
     #43 defect where every mark rendered as TWO CIRCLES and eleven green
     gates never saw it. */
  var VB = 1000;
  /* ⭐⭐ THERE IS NO COMB, AND REMOVING IT WAS THE BIGGEST FIX IN THE
     BUILD. The first version put one 118u tab per seam in staggered
     lanes outside the tray, because 9 seams x 34px cannot fit along a
     10-row tray at 320px and I read that as "the targets must move
     outboard". The 10x10 render settled it: 18 tabs in six lanes had
     MORE VISUAL WEIGHT THAN THE MATERIAL, and they contradicted the one
     line of the art ruling that matters most — *this tool has no
     implement at any point in any state; you touch the seam and the
     material gives.* An instrument that grows a rack of handles is a
     machine with buttons, not a tray of bread.
     The arithmetic never demanded tabs. It demanded that a child not be
     asked to hit a 6px strip: so THE POINTER TARGET IS THE WHOLE TRAY
     and a press resolves to the NEAREST seam. The aim is forgiving, the
     grooves are already the highest-contrast thing on the stage, and
     nothing stands between the hand and the bread. The keyboard and
     assistive tech get a real <button> per seam, laid over its own seam
     band and invisible until focused — because a drag-only or
     pointer-only affordance is dead to both (#41).
     Deleting the comb also gave the tray back its gutters: a 10x10 bun
     went from 10.0px to 17.5px at a 320px viewport. */
  var NUM = 92;               /* the numeral lane — the only gutter left */
  var EDGE = 16;              /* breathing room outside the numeral lane */
  /* A press within this much of a seam belongs to that seam.
     ⚠ NOT 0.5. At exactly half a bun EVERY point on the tray belongs to
     some seam, because a bun's centre is 0.5 from both its neighbours —
     so the middle of a bun would break the seam beside it and the tray
     becomes one large button that always does something. 0.40 leaves the
     middle fifth of each bun dead, which is what makes pointing AT a
     seam the act of choosing where to break, rather than a press
     anywhere producing a break somewhere. */
  var NEAR = 0.40;
  /* 2.00 reserves a numeral's width outside the tray on every side (the
     duplicated count rides there); 0.56 pre-reserves the two crack gaps
     so that cracking is pitch-invariant. */
  var SLACK = 2.56;
  var GAP_F = 0.28;           /* crack gap, as a fraction of pitch.
                                 ⚠ MUST stay < 1/3: a numeral is ~0.55
                                 pitch and can NEVER live in the gap. */
  var DOME_R = 0.49;          /* dome radius: neighbours overlap at 0.98
                                 pitch so the sheen is continuous across
                                 a seam and the dough never shows a bun
                                 boundary. There is no bun element. */
  var NUM_F = 0.95;           /* numeral cap size, as a fraction of pitch */
  var NUM_MIN_U = 62;         /* ...but a numeral never goes below this   */

  /* the scalloped silhouette, in bun units */
  var K = 0.085;              /* how far each outer bun bulges           */
  var RR = 1.513;             /* one arc radius for the whole outline    */
  var QQ = 0.34;              /* corner cut-back along each edge         */
  var CR = 0.42;              /* corner arc radius                       */

  /* ---- motion, in ms. Named so nobody "tightens" them. -------------- */
  var T_PREVIEW = 90;         /* pointerdown parts the seam 25%          */
  var T_CRACK = 460;
  var T_SNAP = 0.30;          /* the one-frame cut, as a fraction of it.
                                 ⚠ NEVER a cross-fade: a dissolve reads
                                 as LOSS, which is the one thing the
                                 instrument must not say. */
  var T_PUSH = 330;           /* things come apart with effort and fall
                                 together easily — that pair of numbers
                                 IS the character. */
  var T_ROT = 480;

  var MAX_CUTS = 2;           /* three pieces. A fourth is a partitioning
                                 exercise, and past three the eye stops
                                 reading one tray and starts reading
                                 several — the invariant is carried by
                                 perception, and perception has a limit. */

  function ease(t) {          /* the one easing; no overshoot anywhere
                                 except the crack's 1.5% recoil */
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }

  var BakingTray = {
    id: 'baking-tray',

    /* ⚠ THE GEOMETRY CONSTANTS ARE EXPOSED SO THE GATE READS THEM RATHER
       THAN RE-DECLARING THEM. A gate that carries its own copy of the
       number it is checking is testing a copy — #44 shipped a hint
       dispatch duplicated inside its own test and three mutations of the
       REAL dispatch sailed through. */
    GEO: { VB: VB, NUM: NUM, EDGE: EDGE, NEAR: NEAR, SLACK: SLACK, GAP_F: GAP_F, MAX_CUTS: MAX_CUTS },

    /* ================= THE MODEL — pure, DOM-free ==================== */

    MIN: 1,
    MAX: 10,                  /* the kleines Einmaleins, and CCSS
                                 3.OA.C.7 fluency within 100, exactly.
                                 11 and 12 are a UK/IE convention and are
                                 outside the curriculum in ten of our
                                 eleven languages — a setting, never a
                                 default. */
    MAX12: 12,

    newState: function (rows, cols, max) {
      return this._st({ rows: rows, cols: cols }, max);
    },

    /* TOTAL. Every field type-checked and clamped HERE AND NOWHERE
       ELSE, so there is exactly one clamp rule. `s || {}` is not enough:
       null, 0, NaN and a string all have to survive this. */
    _st: function (s, max) {
      var o = (s && typeof s === 'object') ? s : {};
      /* ⭐⭐ THE CEILING TRAVELS ON THE STATE, and this is the fix for the
         worst defect in the build. `rotate`, `crack` and `push` all
         rebuilt the state through `_st` WITHOUT passing `max`, so the
         ceiling fell back to 10 and `_dim` silently clamped the
         dimension away: with the 11-and-12 setting on, a 12 x 7 tray of
         EIGHTY-FOUR buns became 7 x 10 = SEVENTY on a turn, and 10 x 7
         on a break. "The count never changes" — the tool's only claim —
         was false in exactly the configuration its second setting sells.
         And the census GATE CERTIFIED IT, because it enumerated 1..10
         and never built a tray the bug could reach. Carrying `hi` on the
         state means no mutator can drop it by forgetting an argument. */
      var hi = (max === this.MAX12 || max === this.MAX) ? max
        : (o.hi === this.MAX12 ? this.MAX12 : this.MAX);
      var out = {
        hi: hi,
        rows: this._dim(o.rows, hi, 7),
        cols: this._dim(o.cols, hi, 6),
        q: this._q(o.q),
        axis: (o.axis === 'row' || o.axis === 'col') ? o.axis : null,
        cuts: []
      };
      var raw = (o.cuts && o.cuts.length) ? o.cuts : [];
      var lim = (out.axis === 'col') ? out.cols : out.rows;
      var i, v, seen = {};
      for (i = 0; i < raw.length; i++) {
        v = raw[i];
        if (typeof v !== 'number' || !isFinite(v) || v !== Math.round(v)) continue;
        if (v < 1 || v > lim - 1) continue;
        if (seen[v]) continue;
        seen[v] = 1;
        out.cuts.push(v);
        if (out.cuts.length >= MAX_CUTS) break;
      }
      out.cuts.sort(function (a, b) { return a - b; });
      /* the axis exists IF AND ONLY IF there is a cut. Two fields that
         can disagree are two sources of truth. */
      if (!out.cuts.length) out.axis = null;
      return out;
    },

    _dim: function (v, hi, dflt) {
      if (typeof v !== 'number' || !isFinite(v)) return dflt;
      v = Math.round(v);
      if (v < this.MIN) return this.MIN;
      if (v > hi) return hi;
      return v;
    },
    _q: function (v) {
      if (typeof v !== 'number' || !isFinite(v)) return 0;
      v = Math.round(v) % 4;
      return v < 0 ? v + 4 : v;
    },

    /* ---- what the tray is made of, derived and never stored --------- */

    /* the spans along the cut axis: [5,2] for a 7-row tray cut at 5 */
    spans: function (st) {
      if (!st) return [];
      var lim = (st.axis === 'col') ? st.cols : st.rows;
      var out = [], prev = 0, i;
      for (i = 0; i < st.cuts.length; i++) { out.push(st.cuts[i] - prev); prev = st.cuts[i]; }
      out.push(lim - prev);
      return out;
    },

    /* every piece as {r0,c0,r1,c1} in bun-grid coordinates, half-open */
    pieces: function (st) {
      if (!st) return [];
      var sp = this.spans(st), out = [], at = 0, i;
      for (i = 0; i < sp.length; i++) {
        if (st.axis === 'col') out.push({ r0: 0, r1: st.rows, c0: at, c1: at + sp[i] });
        else out.push({ r0: at, r1: at + sp[i], c0: 0, c1: st.cols });
        at += sp[i];
      }
      return out;
    },

    count: function (st) { return st ? st.rows * st.cols : 0; },

    /* L1, computed the long way round so the gate can compare it with
       its own independent oracle */
    area: function (st) {
      var p = this.pieces(st), t = 0, i;
      for (i = 0; i < p.length; i++) t += (p[i].r1 - p[i].r0) * (p[i].c1 - p[i].c0);
      return t;
    },

    /* ---- the three moves, and their refusals ------------------------ */

    canRotate: function (st) { return !!st && st.cuts.length === 0; },

    rotate: function (st) {
      if (!this.canRotate(st)) return null;
      return this._st({ hi: st.hi, rows: st.cols, cols: st.rows, q: st.q + 1, axis: null, cuts: [] });
    },

    seamCount: function (st, axis) {
      if (!st) return 0;
      return ((axis === 'col') ? st.cols : st.rows) - 1;
    },

    canCrack: function (st, axis, k) {
      if (!st) return false;
      if (axis !== 'row' && axis !== 'col') return false;
      if (typeof k !== 'number' || !isFinite(k) || k !== Math.round(k)) return false;
      if (st.cuts.length >= MAX_CUTS) return false;
      /* THE FIRST CRACK CHOOSES THE AXIS. Perpendicular is refused by
         not being offered — see the refuse-list, item 6. */
      if (st.axis && axis !== st.axis) return false;
      if (k < 1 || k > this.seamCount(st, axis) ) return false;
      var i;
      for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] === k) return false;
      return true;
    },

    crack: function (st, axis, k) {
      if (!this.canCrack(st, axis, k)) return null;
      var cuts = st.cuts.slice();
      cuts.push(k);
      return this._st({ hi: st.hi, rows: st.rows, cols: st.cols, q: st.q, axis: axis, cuts: cuts });
    },

    canPush: function (st, k) {
      if (!st || !st.cuts.length) return false;
      var i;
      for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] === k) return true;
      return false;
    },

    push: function (st, k) {
      if (!this.canPush(st, k)) return null;
      var cuts = [], i;
      for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] !== k) cuts.push(st.cuts[i]);
      return this._st({ hi: st.hi, rows: st.rows, cols: st.cols, q: st.q, axis: cuts.length ? st.axis : null, cuts: cuts });
    },

    /* ⭐ THE STEPPERS ARE DEAD WHILE CRACKED, and this is a ruling, not
       an oversight. Silently destroying two pieces to build a bigger
       tray is precisely the conservation failure the instrument exists
       to prevent — and the way back is one press on a push pad, which
       is the move the routine wanted anyway. */
    canResize: function (st) { return !!st && st.cuts.length === 0; },

    resize: function (st, rows, cols, max) {
      if (!this.canResize(st)) return null;
      var hi = (max === this.MAX12) ? this.MAX12 : this.MAX;
      var r = this._dim(rows, hi, st.rows), c = this._dim(cols, hi, st.cols);
      if (r === st.rows && c === st.cols) return null;   /* a no-op is a refusal */
      return this._st({ hi: st.hi, rows: r, cols: c, q: 0, axis: null, cuts: [] }, max);
    },

    /* ---- layout, derived from the model alone ----------------------- */

    /* the gutter is one numeral lane on the left and top; the SLACK term
       reserves the matching room on the right and bottom, where the
       DUPLICATED numeral rides after a crack */
    gutter: function () { return NUM + EDGE; },
    trayBox: function () { return VB - NUM - EDGE * 2; },
    /* ⚠ SYMMETRIC IN R AND C. This one line is why the rotation needs no
       rescale, and therefore why the buns cannot change size mid-turn. */
    pitch: function (st) {
      return this.trayBox(st) / (Math.max(st.rows, st.cols) + SLACK);
    },
    gap: function (st) { return this.pitch(st) * GAP_F; },

    /* how many gaps sit before grid line `i` along the cut axis */
    gapsBefore: function (st, i) {
      var n = 0, j;
      for (j = 0; j < st.cuts.length; j++) if (st.cuts[j] <= i) n++;
      return n;
    },

    /* ================= strings ======================================= */
    /* ⚠ THIS ENGLISH IS A SOURCE TO AUDIT, NOT A TARGET TO TRANSLATE.
       On the last four builds the eleven native panels found defects in
       my English that no gate could see — a false verdict, an off-by-
       one, three nouns for one object, a paywall selling a free feature,
       and twice a mathematical inversion. It is the one locale nobody
       reviews and every other one inherits.
       ⚠ NO "x", NO "+", NO "=", NO TOTAL — including in an aria-label.
       "7 rows of 6", never "42". */
    strings: {
      title:        { en: 'The Baking Tray', de: 'Das Brötchenblech' },
      instruction:  { en: 'Break the tray where both pieces are facts the class already knows.', de: 'Die Brötchen dort auseinanderbrechen, wo beide Teile Aufgaben sind, die die Klasse schon kann.' },

      hintWhole:    { en: 'Where can you break it so that both pieces are facts you already know?', de: 'An welcher Rille brecht ihr auseinander, damit beide Teile Aufgaben sind, die ihr schon könnt?' },
      hintCut:      { en: 'Same buns as before, in two pieces. Read each piece, then break it again or push them back together and break it somewhere else.', de: 'Dieselben Brötchen wie vorher, jetzt in zwei Teilen. Lest beide Teile vor, brecht noch einmal auseinander oder schiebt sie wieder zusammen und brecht an einer anderen Rille.' },
      hintCut3:     { en: 'Same buns as before, in three pieces. Read each one.', de: 'Dieselben Brötchen wie vorher, jetzt in drei Teilen. Lest jedes Teil vor.' },
      /* ⚠ THIS REPLACES hintWhole, so it must still carry the task. It
         used to say "turn it and watch what happens" — which on a square
         tray promises an event that CANNOT occur, and left the one tray
         with the best derivation in the set (six rows of six into five
         and one) as the only tray with no question on it. */
      hintSquare:   { en: 'The same number of rows as there are in each row. Turn it, then say where you would break it.', de: 'Gleich viele Reihen wie Brötchen in jeder Reihe. Dreht das Blech — und sagt dann, wo ihr auseinanderbrecht.' },

      /* ⚠ ONE CONSTRUCTION, BEFORE AND AFTER THE BREAK. The whole tray
         used to be "{r} rows, {c} in each row" while the pieces were
         "{a} rows of {c}" — so a screen-reader user heard the identity
         claim in two different grammars at the exact moment it was
         supposed to land, and had to translate between them. That is the
         three-nouns-for-one-object defect wearing grammar. */
      sceneWhole:   { en: 'A tray of buns: {r} [r|row|rows] of {c}.', de: 'Ein Blech Brötchen: {r} [r|Reihe mit|Reihen zu je] {c}.' },
      sceneCut2:    { en: 'A tray of buns in two pieces: {a} [a|row|rows] of {c}, and {b} [b|row|rows] of {c}.', de: 'Ein Blech Brötchen in zwei Teilen: {a} [a|Reihe mit|Reihen zu je] {c} und {b} [b|Reihe mit|Reihen zu je] {c}.' },
      sceneCut3:    { en: 'A tray of buns in three pieces: {a} [a|row|rows] of {c}, {b} [b|row|rows] of {c}, and {d} [d|row|rows] of {c}.', de: 'Ein Blech Brötchen in drei Teilen: {a} [a|Reihe mit|Reihen zu je] {c}, {b} [b|Reihe mit|Reihen zu je] {c} und {d} [d|Reihe mit|Reihen zu je] {c}.' },
      sceneCol2:    { en: 'A tray of buns in two pieces: {r} [r|row|rows] of {a}, and {r} [r|row|rows] of {b}.', de: 'Ein Blech Brötchen in zwei Teilen: {r} [r|Reihe mit|Reihen zu je] {a} und {r} [r|Reihe mit|Reihen zu je] {b}.' },
      sceneCol3:    { en: 'A tray of buns in three pieces: {r} [r|row|rows] of {a}, {r} [r|row|rows] of {b}, and {r} [r|row|rows] of {d}.', de: 'Ein Blech Brötchen in drei Teilen: {r} [r|Reihe mit|Reihen zu je] {a}, {r} [r|Reihe mit|Reihen zu je] {b} und {r} [r|Reihe mit|Reihen zu je] {d}.' },

      turnBtn:      { en: 'Turn the tray', de: 'Blech drehen' },
      turnAria:     { en: 'Turn the tray a quarter turn.', de: 'Das Blech um eine Vierteldrehung drehen.' },
      rowsDown:     { en: 'One row fewer.', de: 'Eine Reihe weniger.' },
      rowsUp:       { en: 'One row more.', de: 'Eine Reihe mehr.' },
      colsDown:     { en: 'One fewer in each row.', de: 'Eins weniger in jeder Reihe.' },
      colsUp:       { en: 'One more in each row.', de: 'Eins mehr in jeder Reihe.' },

      rowCombAria:  { en: 'Where to break the tray across.', de: 'Wo zwischen den Reihen auseinanderbrechen.' },
      colCombAria:  { en: 'Where to break the tray down.', de: 'Wo zwischen den Spalten auseinanderbrechen.' },
      /* ⭐ the pad STATES ITS OWN CONSEQUENCE before it is pressed —
         that is how the distributive law reaches a screen-reader user,
         who never sees the numerals split. */
      breakRow:     { en: 'Break after row {k}: {a} [a|row|rows] above, {b} [b|row|rows] below.', de: 'Nach Reihe {k} auseinanderbrechen: oben {a} [a|Reihe|Reihen], unten {b} [b|Reihe|Reihen].' },
      /* ⚠ AND THE UNIT STAYS ON. This said "{a} to the left, {b} to the
         right" — four WHAT? This is the one label class that exists
         solely for the user who cannot see the numerals split, and it
         was the one that dropped the noun. */
      breakCol:     { en: 'Break after column {k}: {a} in each row on the left, {b} in each row on the right.', de: 'Nach Spalte {k} auseinanderbrechen: links {a} in jeder Reihe, rechts {b} in jeder Reihe.' },
      /* ⚠ THE SEAM NUMBER IS LOAD-BEARING. Both push labels were the
         same fixed sentence, so with two breaks a keyboard user tabbed
         across TWO IDENTICAL PADS and could not tell which one they were
         closing. Identical row/column wording is fine; a missing {k} is
         not — so these now go through _fmt, never api.t. */
      pushRow:      { en: 'Push the two pieces at row {k} back together.', de: 'Die beiden Teile nach Reihe {k} wieder zusammenschieben.' },
      pushCol:      { en: 'Push the two pieces at column {k} back together.', de: 'Die beiden Teile nach Spalte {k} wieder zusammenschieben.' },

      saidTurned:   { en: 'Turned. {r} [r|row|rows] of {c}.', de: 'Gedreht. {r} [r|Reihe mit|Reihen zu je] {c}.' },

      printBtn:     { en: 'Print this tray', de: 'Dieses Blech drucken' },
      gateTitle:    { en: 'The sheets to print', de: 'Die Blätter zum Ausdrucken' },
      /* ⚠ IT SAID "broken six ways" AND "the two facts it makes" — and
         the sheet leads with the WHOLE tray, which makes no two facts,
         then carries five breaks at most and fewer on a small tray. A
         paywall must not promise what the page does not contain. */
      gateBody:     { en: 'A page to break on paper: the whole tray first, then the same tray again broken at each different line, with a rule under every one to write on.', de: 'Ein Blatt zum Brechen auf Papier: zuerst das ganze Blech, dann dasselbe Blech noch einmal, jedes an einer anderen Rille auseinandergebrochen, mit einer Zeile zum Aufschreiben unter jedem.' },
      gateCta:      { en: 'See the Teacher plan', de: 'Zum Lehrkraft-Abo' },

      setGroove:    { en: 'Deeper groove every fifth seam', de: 'Jede fünfte Rille tiefer' },
      setRange:     { en: 'Allow 11 and 12', de: 'Auch 11 und 12' }
    },

    settings: [
      { key: 'fiveGroove', type: 'toggle', labelKey: 'setGroove' },
      { key: 'range12', type: 'toggle', labelKey: 'setRange' }
    ],
    /* the 5-groove is ON because five is a Kernaufgabe in both
       traditions; it is a SETTING because a teacher running a doubling
       lesson needs the tray to stop shouting "five". */
    defaults: { fiveGroove: true, range12: false },

    /* ================= lifecycle ===================================== */

    premium: false,

    init: function (api) {
      this.api = api;
      document.body.classList.add('btr-wide');
      injectBakingTrayCSS();
      this._busy = false;
      this._anim = null;
      this._preview = null;
      this._lockUntil = 0;
      /* ⚠ ALWAYS THE SAME FIRST SCREEN. A remembered 9x9 is a different
         tool with the same URL, and the teacher opening this cold in
         front of 25 children must get 7 x 6 every time. It is also the
         shape of the standard's own worked example. */
      this.st = this.newState(7, 6);
      this._fetchEntitlement();
    },

    /* ⚠ the shell calls render() with NO ARGUMENTS and re-calls it on
       resize; taking an `api` parameter wipes this.api on the second
       call (#43 shipped that once). */
    render: function () {
      if (!this.api) return;
      this._build();
      this._paint();
    },

    /* ⚠ the shell always draws a Reset button and calls this if it
       exists; omit it and the button is dead on every path (#43). */
    reset: function () {
      this._anim = null;
      this._busy = false;
      this._preview = null;
      this.st = this.newState(7, 6);
      if (this._wrap) this._paint();
    },

    _max: function () {
      return (this.api && this.api.settings && this.api.settings.range12) ? this.MAX12 : this.MAX;
    },
    _groove: function () {
      return !(this.api && this.api.settings && this.api.settings.fiveGroove === false);
    },

    /* ================= DOM =========================================== */

    _svgEl: function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k;
      if (attrs) for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, String(attrs[k]));
      return e;
    },

    _build: function () {
      var api = this.api, self = this;
      var wrap = api.el('div', 'btr-wrap');
      this._wrap = wrap;

      var arena = api.el('div', 'btr-arena');
      this._arena = arena;
      var svg = this._svgEl('svg', {
        'class': 'btr-svg', viewBox: '0 0 ' + VB + ' ' + VB,
        preserveAspectRatio: 'xMidYMid meet', role: 'img'
      });
      this._svg = svg;
      arena.appendChild(svg);

      var hits = api.el('div', 'btr-hits');
      this._hits = hits;
      arena.appendChild(hits);
      wrap.appendChild(arena);

      var hint = api.el('p', 'btr-hint');
      this._hint = hint;
      wrap.appendChild(hint);

      var foot = api.el('div', 'btr-foot');

      this._stepRows = this._stepper(foot, 'rows');
      this._chipTurn = this._chip(foot, 'btr-chip btr-turn', function () { self._doRotate(); });
      this._stepCols = this._stepper(foot, 'cols');
      wrap.appendChild(foot);

      var foot2 = api.el('div', 'btr-foot btr-foot2');
      this._chipPrint = this._chip(foot2, 'btr-chip btr-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._print();
      });
      wrap.appendChild(foot2);

      this._gate = null;
      api.stage.appendChild(wrap);
    },

    _chip: function (parent, cls, fn) {
      var b = this.api.el('button', cls);
      b.type = 'button';
      b.addEventListener('click', fn);
      parent.appendChild(b);
      return b;
    },

    /* ⚠ THE MIDDLE CELL IS AN <output>, NOT A BUTTON. A control whose
       only effect is its own appearance is furniture — #39 shipped a
       numeral strip that scored 84/84 on the liveness gate and did
       nothing in 1067 lines. */
    _stepper: function (parent, which) {
      var self = this, api = this.api;
      var box = api.el('div', 'btr-step btr-step-' + which);
      /* ⭐⭐ CHEVRONS, NOT `+` AND `−`. The steppers rendered a literal
         PLUS SIGN, permanently, in all eleven locales — in the one tool
         whose absolute rule is that no operator may appear on the
         apparatus. It sat in the footer between the two numerals of the
         array, and NO STRING AUDIT COULD EVER HAVE REACHED IT: it is
         drawn by the code, not authored, so it survived every ban, every
         poison case and eleven native reviews of the strings. A French
         panel reading the SOURCE found it.
         A chevron says fewer/more without saying an operation. */
      var chev = function (up) {
        return '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"'
          + ' stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
          + (up ? '<path d="M6 15l6-6 6 6"/>' : '<path d="M6 9l6 6 6-6"/>') + '</svg>';
      };
      var minus = api.el('button', 'btr-sbtn'); minus.type = 'button'; minus.innerHTML = chev(false);
      var out = api.el('output', 'btr-sval');
      var plus = api.el('button', 'btr-sbtn'); plus.type = 'button'; plus.innerHTML = chev(true);
      minus.addEventListener('click', function () { self._step(which, -1); });
      plus.addEventListener('click', function () { self._step(which, 1); });
      /* ⚠ THE FIDGET'S MAIN VECTOR IS A HELD KEY, NOT TWENTY TAPS. */
      minus.addEventListener('keydown', function (ev) { if (ev.repeat) ev.preventDefault(); });
      plus.addEventListener('keydown', function (ev) { if (ev.repeat) ev.preventDefault(); });
      box.appendChild(minus); box.appendChild(out); box.appendChild(plus);
      parent.appendChild(box);
      return { box: box, minus: minus, out: out, plus: plus };
    },

    /* ================= the three moves, driven ======================= */

    _now: function () { return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now(); },

    _step: function (which, d) {
      if (this._busy) return;
      if (this._now() < this._lockUntil) return;
      var n = this.resize(this.st,
        which === 'rows' ? this.st.rows + d : this.st.rows,
        which === 'cols' ? this.st.cols + d : this.st.cols,
        this._max());
      if (!n) return;
      this.st = n;
      this._lockUntil = this._now() + 300;
      this.api.sound(d > 0 ? 520 : 430);
      /* ⚠ A RESIZE USED TO ANNOUNCE NOTHING. Every other move calls
         announce; this one repainted silently, so a screen-reader user
         who changed the tray was never told what the tray had become —
         and the stepper labels are static, so nothing else said it. */
      this.api.announce(this._sceneText());
      this._paint();
      var self = this;
      setTimeout(function () { self._paint(); }, 310);
    },

    _doRotate: function () {
      if (this._busy || !this.canRotate(this.st)) return;
      var self = this, from = this.st, to = this.rotate(this.st);
      if (!to) return;
      this.api.sound(430);
      this._run('rotate', T_ROT, from, to, null, function () {
        self.api.announce(self._fmt('saidTurned', { r: self.st.rows, c: self.st.cols }));
      });
    },

    _doCrack: function (axis, k) {
      if (this._busy) return;
      var to = this.crack(this.st, axis, k);
      if (!to) return;
      var self = this;
      this._preview = null;
      this._run('crack', T_CRACK, this.st, to, k, function () {
        self.api.announce(self._sceneText());
      });
      /* the snap and the body, 90ms apart: "kh-thump". Constants, so
         nothing about the numbers ever reaches the oscillator. */
      setTimeout(function () { self.api.sound(210); }, Math.round(T_CRACK * T_SNAP));
      setTimeout(function () { self.api.sound(140); }, Math.round(T_CRACK * T_SNAP) + 90);
    },

    _doPush: function (k) {
      if (this._busy) return;
      var to = this.push(this.st, k);
      if (!to) return;
      var self = this;
      this._preview = null;
      this._run('push', T_PUSH, this.st, to, k, function () {
        self.api.announce(self._sceneText());
      });
      setTimeout(function () { self.api.sound(320); }, Math.round(T_PUSH * 0.6));
    },

    /* ⭐ ONE INTERPOLATOR. Every animated quantity — the tray angle, both
       numerals' positions, their counter-rotations, the seam contrast —
       reads the same `t` from this one loop. If the mark were a
       completion callback on the material's animation, the child would
       see cause and effect between TWO objects instead of one object
       (exchange-machine.js:138). */
    _run: function (kind, ms, from, to, k, done) {
      var self = this;
      this._busy = true;
      this._anim = { kind: kind, t: 0, from: from, to: to, k: k, ms: ms, start: this._now() };
      /* the model advances IMMEDIATELY; the animation is how it is
         shown, never where it is stored. */
      this.st = to;
      function frame() {
        var a = self._anim;
        if (!a) { self._busy = false; return; }
        a.t = clamp01((self._now() - a.start) / a.ms);
        self._paint();
        if (a.t >= 1) {
          self._anim = null;
          self._busy = false;
          self._paint();
          if (done) done();
          return;
        }
        (window.requestAnimationFrame || window.setTimeout)(frame, 16);
      }
      (window.requestAnimationFrame || window.setTimeout)(frame, 16);
    },

    /* ================= paint ========================================= */

    /* ⭐ `{k}` interpolates a numeral; `[k|one|many]` picks the form that
       numeral governs. Added because the English shipped "1 rows above"
       — and it shipped it on THE TOOL'S HEADLINE MOVE, since seam 1 is
       the 7-into-6-and-1 derivation the whole turn exists to reach. In
       English that reads as sloppiness; in German it is unspeakable, and
       an inflected locale cannot be made grammatical without it.
       The bracket resolves BEFORE the numerals, so a form may itself
       contain no placeholder and no locale has to escape anything. */
    _fmt: function (key, vals) {
      var s = String(this.api.t(key)), k;
      s = s.replace(/\[([a-z])\|([^|\]]*)\|([^\]]*)\]/g, function (all, name, one, many) {
        var v = vals ? vals[name] : undefined;
        return (Number(v) === 1) ? one : many;
      });
      for (k in vals) if (vals.hasOwnProperty(k)) s = s.split('{' + k + '}').join(String(vals[k]));
      return s;
    },

    _sceneText: function () {
      var st = this.st, sp = this.spans(st);
      if (!st.cuts.length) return this._fmt('sceneWhole', { r: st.rows, c: st.cols });
      if (st.axis === 'col') {
        return (sp.length === 2)
          ? this._fmt('sceneCol2', { r: st.rows, a: sp[0], b: sp[1] })
          : this._fmt('sceneCol3', { r: st.rows, a: sp[0], b: sp[1], d: sp[2] });
      }
      return (sp.length === 2)
        ? this._fmt('sceneCut2', { a: sp[0], b: sp[1], c: st.cols })
        : this._fmt('sceneCut3', { a: sp[0], b: sp[1], d: sp[2], c: st.cols });
    },

    /* the scalloped silhouette of a block, in bun units, as a path */
    _silhouette: function (c0, r0, c1, r1, P, ox, oy) {
      var nc = c1 - c0, nr = r1 - r0, i;
      var X = function (u) { return (ox + (c0 + u) * P).toFixed(2); };
      var Y = function (v) { return (oy + (r0 + v) * P).toFixed(2); };
      var A = function (rad, x, y) {
        return ' A' + (rad * P).toFixed(2) + ' ' + (rad * P).toFixed(2) + ' 0 0 1 ' + x + ' ' + y;
      };
      var d = 'M' + X(QQ) + ' ' + Y(0);
      for (i = 1; i < nc; i++) d += A(RR, X(i), Y(0));
      d += A(RR, X(nc - QQ), Y(0));
      d += A(CR, X(nc), Y(QQ));
      for (i = 1; i < nr; i++) d += A(RR, X(nc), Y(i));
      d += A(RR, X(nc), Y(nr - QQ));
      d += A(CR, X(nc - QQ), Y(nr));
      for (i = nc - 1; i >= 1; i--) d += A(RR, X(i), Y(nr));
      d += A(RR, X(QQ), Y(nr));
      d += A(CR, X(0), Y(nr - QQ));
      for (i = nr - 1; i >= 1; i--) d += A(RR, X(0), Y(i));
      d += A(RR, X(0), Y(QQ));
      d += A(CR, X(QQ), Y(0));
      return d + ' Z';
    },

    /* the live gap for cut k, honouring the animation and the preview */
    _liveGap: function (k) {
      var st = this.st, g = this.gap(st), a = this._anim;
      var open = 1;
      if (a && a.k === k) {
        if (a.kind === 'crack') {
          open = (a.t < T_SNAP) ? 0 : easeOut((a.t - T_SNAP) / (1 - T_SNAP));
          /* the single 1.5% recoil, and the only overshoot in the tool */
          if (a.t > 0.62 && a.t < 0.78) open = open * 1.015;
        } else if (a.kind === 'push') {
          open = 1 - ease(a.t);
        }
      }
      if (this._preview && this._preview.k === k && !this._anim) open = 0.25;
      return g * open;
    },

    _paint: function () {
      if (!this._svg) return;
      var st = this.st, api = this.api, self = this;
      var svg = this._svg, i;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      /* ⭐⭐ THE HIT LAYER IS REBUILT ONLY WHEN ITS STRUCTURE CHANGES,
         AND THAT IS A FIX FOR TWO SHIPPED-QUALITY DEFECTS, NOT AN
         OPTIMISATION. Rebuilding it on every paint destroyed the very
         element the user was interacting with:
           · a real press previewed the crack on pointerdown, the repaint
             replaced the node under the finger, and the release then
             landed on nothing — THE TRAY COULD NOT BE BROKEN BY POINTER
             AT ALL, while the model was perfect and every model-level
             assertion passed;
           · focusing a seam fired a repaint that deleted the focused
             button, so `document.activeElement` fell back to the body
             and the keyboard path died on the first Tab.
         Both were caught by driving the browser, and neither was
         visible to the census. */
      var hitSig = st.rows + 'x' + st.cols + '|' + st.axis + '|' + st.cuts.join(',')
        + '|' + (this._busy ? 1 : 0) + '|' + this._max();
      var rebuildHits = (hitSig !== this._hitSig);
      if (rebuildHits) {
        this._hitSig = hitSig;
        while (this._hits.firstChild) this._hits.removeChild(this._hits.firstChild);
      }

      var P = this.pitch(st), GUT = this.gutter(st), BOX = this.trayBox(st);
      var pieces = this.pieces(st), sp = this.spans(st);
      /* ⭐⭐ THE TURN RUNS FROM MINUS NINETY TO ZERO, AND THE FIRST BUILD
         RAN IT BACKWARDS. `_run` advances the model IMMEDIATELY, so by
         the first frame the grid is already the TURNED one; interpolating
         0 -> +90 then snapped the tray into its post-turn layout, spun it
         a quarter turn AWAY from that, and snapped back. Starting at -90
         means frame one draws the turned grid in the ORIENTATION IT HAD
         BEFORE — pixel-identical to what the class was looking at — and
         the animation carries it to where it now is.
         Invisible to every gate I had written, because they all measured
         the END state; an Italian panel found it by reading the model. */
      var rot = (this._anim && this._anim.kind === 'rotate') ? (ease(this._anim.t) - 1) : 0;

      /* total drawn size, gaps included */
      var gapsTotal = 0;
      for (i = 0; i < st.cuts.length; i++) gapsTotal += this._liveGap(st.cuts[i]);
      var trayW = st.cols * P + (st.axis === 'col' ? gapsTotal : 0);
      var trayH = st.rows * P + (st.axis === 'row' ? gapsTotal : 0);
      /* Centred in its square box. This was briefly anchored top-left,
         to keep the comb beside the seams it drove; with the comb gone
         the anchor only left a third of the sheet empty on two sides.
         ⚠ Centring is SAFE here rather than merely tidy: SLACK reserves
         2.56 buns beyond the longest dimension, so half of it — never
         less than 1.28 buns — always lands on the right and bottom,
         which is where the DUPLICATED numeral rides after a crack. */
      var OX = GUT + (BOX - trayW) / 2;
      var OY = GUT + (BOX - trayH) / 2;
      var CX = GUT + BOX / 2, CY = GUT + BOX / 2;

      svg.setAttribute('aria-label', this._sceneText());

      /* ---- defs: the two gradients that model every bun ------------- */
      var defs = this._svgEl('defs');
      defs.appendChild(this._grad('btr-dome', '#FFFFFF', ['0:.55', '.46:.16', '1:0'], '.38', '.32', '.68'));
      defs.appendChild(this._grad('btr-occ', '#8A5A2B', ['0:.10', '.55:.05', '1:0'], '.66', '.74', '.60'));
      svg.appendChild(defs);

      /* the parchment. ⭐ THE ONLY TOOL ON THE PLATFORM WHOSE SURFACE HAS
         NO GRID — every sibling draws on 22px squared paper, and a
         second grid under this one would kill the seam grid, which must
         be the highest-contrast structure on screen. */
      /* ⚠ THE SHEET FILLS THE WHOLE ARENA, and that is a fix rather than
         a default. Cut to the tray's own gutters it left a floating
         cluster of tabs on bare card, with a third of the stage empty
         where the perpendicular comb had been removed — the controls
         read as detached UI rather than as tabs on a page. */
      svg.appendChild(this._svgEl('rect', {
        x: 6, y: 6, width: VB - 12, height: VB - 12, rx: 20, 'class': 'btr-paper'
      }));

      var g = this._svgEl('g', { 'class': 'btr-tray' });
      if (rot) g.setAttribute('transform', 'rotate(' + (90 * rot).toFixed(3) + ' ' + CX.toFixed(2) + ' ' + CY.toFixed(2) + ')');
      svg.appendChild(g);

      /* the bake-shadow: the memory of the whole. It NEVER splits, and
         after a crack it bridges the gap — the anti-loss device, and it
         costs one path. */
      g.appendChild(this._svgEl('path', {
        d: this._silhouette(0, 0, st.cols, st.rows, P, OX, OY + P * 0.06),
        'class': 'btr-shadow'
      }));

      /* ---- the pieces ---------------------------------------------- */
      for (i = 0; i < pieces.length; i++) this._paintPiece(g, pieces[i], i, P, OX, OY);

      /* ---- the numerals -------------------------------------------- */
      this._paintNumerals(g, pieces, sp, P, OX, OY, GUT, trayW, trayH, rot, CX, CY);

      /* ---- the hit layer ------------------------------------------- */
      if (rebuildHits) this._paintCombs(P, OX, OY, GUT, trayW, trayH);

      /* ---- chrome --------------------------------------------------- */
      this._chipTurn.textContent = api.t('turnBtn');
      this._chipTurn.setAttribute('aria-label', api.t('turnAria'));
      this._chipTurn.disabled = !this.canRotate(st) || this._busy;
      this._chipPrint.textContent = api.t('printBtn');
      this._chipPrint.className = 'btr-chip btr-lock' + (this.premium ? ' is-open' : '');

      var hi = this._max(), resiz = this.canResize(st) && !this._busy;
      this._stepRows.out.value = String(st.rows);
      this._stepRows.out.textContent = String(st.rows);
      this._stepCols.out.value = String(st.cols);
      this._stepCols.out.textContent = String(st.cols);
      this._stepRows.minus.disabled = !resiz || st.rows <= this.MIN;
      this._stepRows.plus.disabled = !resiz || st.rows >= hi;
      this._stepCols.minus.disabled = !resiz || st.cols <= this.MIN;
      this._stepCols.plus.disabled = !resiz || st.cols >= hi;
      this._stepRows.minus.setAttribute('aria-label', api.t('rowsDown'));
      this._stepRows.plus.setAttribute('aria-label', api.t('rowsUp'));
      this._stepCols.minus.setAttribute('aria-label', api.t('colsDown'));
      this._stepCols.plus.setAttribute('aria-label', api.t('colsUp'));

      this._hint.textContent = api.t(this._hintKey());
      this._wrap.className = 'btr-wrap' + (this.premium ? ' btr-paid' : '');
    },

    _hintKey: function () {
      var st = this.st;
      if (st.cuts.length >= 2) return 'hintCut3';
      if (st.cuts.length === 1) return 'hintCut';
      if (st.rows === st.cols) return 'hintSquare';
      return 'hintWhole';
    },

    _grad: function (id, col, stops, cx, cy, r) {
      var gr = this._svgEl('radialGradient', { id: id, cx: cx, cy: cy, r: r }), i, p;
      for (i = 0; i < stops.length; i++) {
        p = stops[i].split(':');
        gr.appendChild(this._svgEl('stop', { offset: p[0], 'stop-color': col, 'stop-opacity': p[1] }));
      }
      return gr;
    },

    /* offset of a piece from its uncracked position */
    _pieceShift: function (idx) {
      var st = this.st, n = 0, i;
      for (i = 0; i < idx && i < st.cuts.length; i++) n += this._liveGap(st.cuts[i]);
      return n;
    },

    _paintPiece: function (parent, pc, idx, P, OX, OY) {
      var st = this.st, shift = this._pieceShift(idx);
      var dx = (st.axis === 'col') ? shift : 0;
      var dy = (st.axis === 'row') ? shift : 0;
      var gp = this._svgEl('g', { 'class': 'btr-piece' });
      if (dx || dy) gp.setAttribute('transform', 'translate(' + dx.toFixed(2) + ' ' + dy.toFixed(2) + ')');
      parent.appendChild(gp);

      var pieceD = this._silhouette(pc.c0, pc.r0, pc.c1, pc.r1, P, OX, OY);
      var wholeD = this._silhouette(0, 0, st.cols, st.rows, P, OX, OY);
      var cid = 'btr-clip-' + idx + '-' + (this._clipSalt = (this._clipSalt || 0) + 1);

      var cp = this._svgEl('clipPath', { id: cid });
      cp.appendChild(this._svgEl('path', { d: pieceD }));
      gp.appendChild(cp);

      /* 1. the slab. ONE dough hex in the whole file, applied ONCE — so
            a colour-coded piece is not merely forbidden, it is not
            expressible. */
      gp.appendChild(this._svgEl('path', { d: pieceD, 'class': 'btr-slab' }));

      /* 2. the domes. THERE IS NO BUN ELEMENT: a bun is a place where
            the slab bulges, and neighbouring sheens overlap at 0.98
            pitch so the dough never shows a bun boundary. */
      var r, c, cx, cy;
      for (r = pc.r0; r < pc.r1; r++) {
        for (c = pc.c0; c < pc.c1; c++) {
          cx = OX + (c + 0.5) * P; cy = OY + (r + 0.5) * P;
          /* ⚠ THE BUN CARRIES A CLASS, and that is load-bearing rather
             than tidy. Unclassed, it was invisible to the shared
             wide-viewport gate, which finds "the instrument's unit" as
             the most-repeated inked child — so it settled on the two
             STEPPER BUTTONS and reported hollow widening on a tool whose
             material grows perfectly well. Naming the material makes the
             gate measure the material. */
          gp.appendChild(this._svgEl('circle', { cx: cx.toFixed(2), cy: cy.toFixed(2), r: (P * DOME_R).toFixed(2), 'class': 'btr-bun', fill: 'url(#btr-dome)' }));
          gp.appendChild(this._svgEl('circle', { cx: cx.toFixed(2), cy: cy.toFixed(2), r: (P * DOME_R).toFixed(2), 'class': 'btr-bun-shade', fill: 'url(#btr-occ)' }));
        }
      }

      /* 3. the seams inside this piece */
      this._paintSeams(gp, pc, P, OX, OY);

      /* 4. the crumb band — every edge of the piece */
      gp.appendChild(this._svgEl('path', {
        d: pieceD, 'class': 'btr-crumb', 'clip-path': 'url(#' + cid + ')',
        'stroke-width': (P * 0.20).toFixed(2)
      }));

      /* 5. ⭐ THE CRUST IS THE **WHOLE TRAY'S** SILHOUETTE, STROKED AND
            THEN CLIPPED TO THIS PIECE. Because the whole tray's boundary
            does not pass through any seam, CRUST CANNOT BE DRAWN AT A
            TORN EDGE. It is geometrically impossible, not a discipline
            somebody has to remember — which is what makes "one fused
            object" survive future maintenance. It also overpaints the
            crumb everywhere the original boundary ran, so crumb survives
            only on torn edges with no mask and no per-edge branching. */
      gp.appendChild(this._svgEl('path', {
        d: wholeD, 'class': 'btr-crust', 'clip-path': 'url(#' + cid + ')',
        'stroke-width': (P * 0.28).toFixed(2)
      }));
      gp.appendChild(this._svgEl('path', {
        d: wholeD, 'class': 'btr-keyline', 'clip-path': 'url(#' + cid + ')',
        'stroke-width': (P * 0.06).toFixed(2)
      }));
    },

    /* ⭐ THE GROOVE DEEPENS UNDER THE FINGER, and that is the whole
       affordance now that there are no tabs. It is a RELATIVE
       multiplier, so a touched ordinary seam never reaches the width of
       an untouched 5-groove — an absolute hover width would have made
       the two states ambiguous, which is worse than no feedback. */
    _isHot: function (axis, i) {
      var h = this._preview || this._hover;
      return !!h && h.axis === axis && h.k === i;
    },

    _paintSeams: function (gp, pc, P, OX, OY) {
      var st = this.st, i, x, y, isG;
      var five = this._groove();
      /* horizontal seams (between rows) inside this piece */
      for (i = pc.r0 + 1; i < pc.r1; i++) {
        y = OY + i * P;
        isG = five && (i % 5 === 0);
        this._seam(gp, OX + pc.c0 * P, y, OX + pc.c1 * P, y, isG, P, false, this._isHot('row', i));
      }
      for (i = pc.c0 + 1; i < pc.c1; i++) {
        x = OX + i * P;
        isG = five && (i % 5 === 0);
        this._seam(gp, x, OY + pc.r0 * P, x, OY + pc.r1 * P, isG, P, true, this._isHot('col', i));
      }
    },

    /* a seam is a chord between two cusps of the scalloped outline, so
       the seam and the silhouette are one geometric system. Light side
       first, dark on top: at small sizes a single line is a smudge, and
       a chiselled valley still reads. */
    _seam: function (gp, x1, y1, x2, y2, groove, P, vertical, hot) {
      var HOT = hot ? 1.36 : 1;
      var off = P * (groove ? 0.060 : 0.045);
      var lit = { x1: x1, y1: y1, x2: x2, y2: y2 };
      if (vertical) { lit.x1 += off; lit.x2 += off; } else { lit.y1 += off; lit.y2 += off; }
      if (groove) {
        gp.appendChild(this._svgEl('line', {
          x1: x1, y1: y1, x2: x2, y2: y2, 'class': 'btr-seam-pen',
          'stroke-width': (P * 0.130).toFixed(2)
        }));
      }
      gp.appendChild(this._svgEl('line', {
        x1: lit.x1.toFixed(2), y1: lit.y1.toFixed(2), x2: lit.x2.toFixed(2), y2: lit.y2.toFixed(2),
        'class': 'btr-seam-lit', 'stroke-width': (P * (groove ? 0.060 : 0.045)).toFixed(2)
      }));
      gp.appendChild(this._svgEl('line', {
        x1: x1.toFixed(2), y1: y1.toFixed(2), x2: x2.toFixed(2), y2: y2.toFixed(2),
        'class': 'btr-seam' + (groove ? ' is-groove' : '') + (hot ? ' is-hot' : ''),
        'stroke-width': (P * (groove ? 0.085 : 0.055) * HOT).toFixed(2)
      }));
    },

    /* ⭐ THE NUMERALS. The split dimension's count stays on its own rail
       and SPLITS; the constant dimension's count travels to the
       perpendicular outer edge and DUPLICATES, one per piece. Every
       numeral is therefore always on an outer edge of the assembly,
       never in the gap (a numeral is ~0.55 pitch and the gap is capped
       at 0.28 — it could not fit even if it were allowed).
       ⚠ AND THE GLYPH IS NEVER ROTATED BY ONE DEGREE. Each sits in an
       inner group counter-rotating about its own anchor, so net glyph
       rotation is identically 0 at every frame while its position
       sweeps the quarter turn. A numeral rotated 90 degrees is
       unreadable to a seven-year-old. */
    _paintNumerals: function (parent, pieces, sp, P, OX, OY, GUT, trayW, trayH, rot, CX, CY) {
      var st = this.st, i, pc, shift, size = Math.max(P * NUM_F, NUM_MIN_U);
      /* ⚠ THE RAIL IS THE TRAY'S OWN EDGE, NOT A FIXED COLUMN. Pinned to
         the gutter, the numerals stayed put while the centred tray moved
         away from them — on a 7 x 6 the "7" sat a quarter of the sheet
         from the rows it counts, and a numeral that far from its edge
         reads as a caption rather than as part of the material. They now
         ride 0.78 of a bun outside the tray, the same offset the
         DUPLICATED numeral uses, so all four sit at one distance. */
      var railL = OX - P * 0.78, railT = OY - P * 0.78;
      var self = this;
      var put = function (x, y, val) {
        var gg = self._svgEl('g');
        if (rot) gg.setAttribute('transform', 'rotate(' + (-90 * rot).toFixed(3) + ' ' + x.toFixed(2) + ' ' + y.toFixed(2) + ')');
        var t = self._svgEl('text', {
          x: x.toFixed(2), y: y.toFixed(2), dy: '0.35em',
          'class': 'btr-num', 'font-size': size.toFixed(1),
          'text-anchor': 'middle'
        });
        t.textContent = String(val);
        gg.appendChild(t);
        parent.appendChild(gg);
      };

      if (!st.cuts.length) {
        put(railL, OY + trayH / 2, st.rows);
        put(OX + trayW / 2, railT, st.cols);
        return;
      }

      for (i = 0; i < pieces.length; i++) {
        pc = pieces[i];
        shift = this._pieceShift(i);
        if (st.axis === 'row') {
          /* the split count stays on the LEFT rail */
          put(railL, OY + ((pc.r0 + pc.r1) / 2) * P + shift, sp[i]);
          /* the duplicated count rides each piece's RIGHT outer edge */
          put(OX + st.cols * P + P * 0.78, OY + ((pc.r0 + pc.r1) / 2) * P + shift, st.cols);
        } else {
          put(OX + ((pc.c0 + pc.c1) / 2) * P + shift, railT, sp[i]);
          put(OX + ((pc.c0 + pc.c1) / 2) * P + shift, OY + st.rows * P + P * 0.78, st.rows);
        }
      }
    },

    /* ⭐ THE COMB. One real <button> per interior seam, staggered across
       L lanes outboard of the numeral gutter — row seams on the LEFT,
       column seams on the TOP, i.e. WHERE THE CONSEQUENCE IS: the finger
       lands beside the 7 that becomes a 5 and a 2.
       ⚠ A DRAG-ONLY HANDLE IS DEAD to a keyboard, to assistive tech and
       to the liveness gate — a synthetic .click() never fires
       pointerdown (#41 scored DEAD on all nine paths). Every pad is a
       real button that acts on click AND on Enter/Space. */
    _paintCombs: function (P, OX, OY, GUT, trayW, trayH) {
      var st = this.st, self = this;
      this._padRow = [];
      this._padCol = [];

      /* ---- THE POINTER PATH: the tray itself ------------------------
         One forgiving target over the whole tray. A press resolves to
         the nearest seam within half a bun, so a child never has to hit
         a 6px strip — which is the real constraint the comb was built
         to dodge, and the reason the comb was never needed. */
      var hot = this.api.el('div', 'btr-hot');
      hot.style.left = ((OX - P * 0.5) / VB * 100) + '%';
      hot.style.top = ((OY - P * 0.5) / VB * 100) + '%';
      hot.style.width = ((trayW + P) / VB * 100) + '%';
      hot.style.height = ((trayH + P) / VB * 100) + '%';
      this._hits.appendChild(hot);
      this._hot = hot;

      var pick = function (ev) {
        var r = hot.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        var ux = OX - P * 0.5 + (ev.clientX - r.left) / r.width * (trayW + P);
        var uy = OY - P * 0.5 + (ev.clientY - r.top) / r.height * (trayH + P);
        return self._nearestSeam(ux, uy, P, OX, OY);
      };
      /* ⚠ THE COMMIT LIVES ON WINDOW, NOT ON THE TARGET. The preview
         repaint can replace the node under the finger, and a `click`
         bound to that node would then never fire — which is exactly how
         the tray became unbreakable by pointer in the first build. A
         window-level pointerup survives any repaint, and it also lets
         the child slide off and cancel. */
      hot.addEventListener('pointerdown', function (ev) {
        if (self._busy) return;
        var s = pick(ev);
        if (!s) return;
        self._pending = s;
        self._preview = s.cracked ? null : s;
        self._paint();
        var up = function (uev) {
          window.removeEventListener('pointerup', up);
          window.removeEventListener('pointercancel', up);
          var pend = self._pending;
          self._pending = null;
          self._preview = null;
          if (!pend || self._busy) { self._paint(); return; }
          self._pointerAt = self._now();
          if (pend.cracked) self._doPush(pend.k); else self._doCrack(pend.axis, pend.k);
        };
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
      });
      hot.addEventListener('pointerleave', function () {
        if (self._preview) { self._preview = null; self._paint(); }
      });
      hot.addEventListener('pointermove', function (ev) {
        if (self._busy || self._preview) return;
        var s = pick(ev), key = s ? s.axis + s.k : '';
        if (key !== self._hoverKey) { self._hoverKey = key; self._hover = s; self._paint(); }
      });
      /* the click path exists for SYNTHETIC clicks — a scripted
         `.click()` never fires pointerdown, and the shared liveness gate
         drives controls that way. ⚠ Guarded against the real pointer,
         which would otherwise commit twice: once on pointerup and again
         on the click that follows it. */
      hot.addEventListener('click', function (ev) {
        if (self._busy) return;
        if (self._pointerAt && self._now() - self._pointerAt < 500) return;
        var s = pick(ev);
        if (!s) return;
        if (s.cracked) self._doPush(s.k); else self._doCrack(s.axis, s.k);
      });

      /* ---- THE KEYBOARD / AT PATH: a real button per seam -----------
         Laid over its own seam band, invisible until focused. It is not
         decoration and it is not a duplicate control: a pointer-only
         affordance is DEAD to a keyboard, to assistive tech and to the
         shared liveness gate, which drives controls with a synthetic
         click that never fires pointerdown (#41 scored DEAD on all nine
         paths in all three entitlement states before its handle also
         acted on click and Enter/Space). */
      if (!st.axis || st.axis === 'row') this._seamKeys('row', P, OX, OY, trayW, trayH);
      if (!st.axis || st.axis === 'col') this._seamKeys('col', P, OX, OY, trayW, trayH);
    },

    /* which seam does a point in tray coordinates belong to? */
    _nearestSeam: function (ux, uy, P, OX, OY) {
      var st = this.st, best = null, i, at, d;
      /* ⚠ NO AXIS CHECK IN HERE. The first draft had one, and the
         mutation harness proved it was DEAD CODE — the two loops below
         are already guarded, so `consider` can never be reached with the
         wrong axis. A line no mutation can kill is a line that is doing
         nothing, and leaving it in would have made the axis lock look
         doubly enforced when it is enforced exactly once, below. */
      var consider = function (axis, k, pos, v) {
        d = Math.abs(v - pos);
        if (d > P * NEAR) return;
        if (!best || d < best.d) best = { axis: axis, k: k, d: d, cracked: false };
      };
      if (!st.axis || st.axis === 'row') {
        for (i = 1; i <= this.seamCount(st, 'row'); i++) {
          consider('row', i, OY + i * P + this._gapCentreShift(i), uy);
        }
      }
      if (!st.axis || st.axis === 'col') {
        for (i = 1; i <= this.seamCount(st, 'col'); i++) {
          consider('col', i, OX + i * P + this._gapCentreShift(i), ux);
        }
      }
      if (!best) return null;
      if (this.canPush(st, best.k) && st.axis === best.axis) { best.cracked = true; return best; }
      if (!this.canCrack(st, best.axis, best.k)) return null;
      return best;
    },

    _seamKeys: function (axis, P, OX, OY, trayW, trayH) {
      var st = this.st, self = this, n = this.seamCount(st, axis), k, b;
      var list = (axis === 'row') ? this._padRow : this._padCol;
      var host = this.api.el('div', 'btr-comb btr-comb-' + axis);
      host.setAttribute('role', 'group');
      host.setAttribute('aria-label', this.api.t(axis === 'row' ? 'rowCombAria' : 'colCombAria'));
      this._hits.appendChild(host);

      for (k = 1; k <= n; k++) {
        b = this._seamKey(axis, k, P, OX, OY, trayW, trayH);
        host.appendChild(b);
        list.push(b);
      }
      this._rove(list, axis);
    },

    _seamKey: function (axis, k, P, OX, OY, trayW, trayH) {
      var st = this.st, self = this;
      var b = this.api.el('button', 'btr-pad');
      b.type = 'button';
      b.setAttribute('data-k', String(k));
      b.setAttribute('data-axis', axis);
      var along = ((axis === 'row') ? OY : OX) + k * P + this._gapCentreShift(k);
      var band = P * 0.7;
      if (axis === 'row') {
        b.style.left = (OX / VB * 100) + '%';
        b.style.top = ((along - band / 2) / VB * 100) + '%';
        b.style.width = (trayW / VB * 100) + '%';
        b.style.height = (band / VB * 100) + '%';
      } else {
        b.style.top = (OY / VB * 100) + '%';
        b.style.left = ((along - band / 2) / VB * 100) + '%';
        b.style.height = (trayH / VB * 100) + '%';
        b.style.width = (band / VB * 100) + '%';
      }

      var cracked = this.canPush(st, k) && st.axis === axis;
      var sp = this._wouldSpans(axis, k);
      if (cracked) {
        b.className = 'btr-pad is-open';
        b.setAttribute('aria-label', this._fmt(axis === 'row' ? 'pushRow' : 'pushCol', { k: k }));
        b.addEventListener('click', function () { self._doPush(k); });
      } else if (this.canCrack(st, axis, k)) {
        b.setAttribute('aria-label', this._fmt(axis === 'row' ? 'breakRow' : 'breakCol',
          { k: k, a: sp[0], b: sp[1] }));
        b.addEventListener('click', function () { self._doCrack(axis, k); });
      } else {
        /* ⚠ DISABLED, VISIBLY — never a silent no-op, and never merely
           pointer-events:none, which does not stop a keyboard. */
        b.className = 'btr-pad is-dead';
        b.disabled = true;
        b.setAttribute('aria-label', this._fmt(axis === 'row' ? 'breakRow' : 'breakCol',
          { k: k, a: sp[0], b: sp[1] }));
      }
      if (this._busy) b.disabled = true;
      /* focus deepens the groove, the same as hover — and it is safe to
         repaint now that the hit layer is only rebuilt on a structural
         change; before that, this very listener deleted its own button. */
      b.addEventListener('focus', function () { self._hover = { axis: axis, k: k }; self._hoverKey = axis + k; self._paint(); });
      b.addEventListener('blur', function () { self._hover = null; self._hoverKey = ''; self._paint(); });
      return b;
    },

    /* how far the seam at k has already been pushed along by earlier gaps */
    _gapCentreShift: function (k) {
      var st = this.st, n = 0, i;
      for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] < k) n += this._liveGap(st.cuts[i]);
      /* a cracked seam's own pad sits in the middle of its own gap */
      for (i = 0; i < st.cuts.length; i++) if (st.cuts[i] === k) n += this._liveGap(k) / 2;
      return n;
    },

    /* what the two neighbouring pieces would be — used for the label,
       which STATES ITS CONSEQUENCE BEFORE IT IS PRESSED */
    _wouldSpans: function (axis, k) {
      var st = this.st;
      var lim = (axis === 'col') ? st.cols : st.rows;
      var lo = 0, hi = lim, i;
      for (i = 0; i < st.cuts.length; i++) {
        if (st.cuts[i] < k && st.cuts[i] > lo) lo = st.cuts[i];
        if (st.cuts[i] > k && st.cuts[i] < hi) hi = st.cuts[i];
      }
      return [k - lo, hi - k];
    },

    _rove: function (list, axis) {
      var self = this, i;
      var live = [];
      for (i = 0; i < list.length; i++) if (!list[i].disabled) live.push(list[i]);
      for (i = 0; i < list.length; i++) list[i].tabIndex = -1;
      if (live.length) live[0].tabIndex = 0;
      var prevK = (axis === 'row') ? this._focusRow : this._focusCol;
      if (prevK != null) {
        for (i = 0; i < live.length; i++) {
          if (Number(live[i].getAttribute('data-k')) === prevK) { live[0].tabIndex = -1; live[i].tabIndex = 0; }
        }
      }
      var prevKey = (axis === 'row') ? 'ArrowUp' : 'ArrowLeft';
      var nextKey = (axis === 'row') ? 'ArrowDown' : 'ArrowRight';
      for (i = 0; i < list.length; i++) {
        (function (b) {
          b.addEventListener('focus', function () {
            if (axis === 'row') self._focusRow = Number(b.getAttribute('data-k'));
            else self._focusCol = Number(b.getAttribute('data-k'));
          });
          b.addEventListener('keydown', function (ev) {
            var idx = live.indexOf(b), to = -1;
            if (ev.key === prevKey) to = idx - 1;
            else if (ev.key === nextKey) to = idx + 1;
            else if (ev.key === 'Home') to = 0;
            else if (ev.key === 'End') to = live.length - 1;
            else return;
            ev.preventDefault();
            if (to < 0 || to >= live.length) return;
            for (var j = 0; j < live.length; j++) live[j].tabIndex = -1;
            live[to].tabIndex = 0;
            live[to].focus();
          });
        }(list[i]));
      }
    },

    /* ================= the gate + print =============================== */

    _showGate: function () {
      var api = this.api;
      if (this._gate) { this._gate.parentNode.removeChild(this._gate); this._gate = null; }
      var box = api.el('div', 'btr-gate');
      var h = api.el('h3'); h.textContent = api.t('gateTitle');
      var p = api.el('p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'btr-gate-cta');
      a.textContent = api.t('gateCta');
      a.setAttribute('href', '/pricing');
      box.appendChild(h); box.appendChild(p); box.appendChild(a);
      this._wrap.appendChild(box);
      this._gate = box;
    },

    /* ⭐ THE SHEET IS SIX TRAYS, BROKEN SIX WAYS, WITH THE FACT LEFT
       BLANK. The instrument teaches; the paper practises — which is what
       makes this a real artefact rather than a screenshot, and it is the
       only thing behind the paywall.
       ⚠ Black and white, no fill, INK-LIGHT: a hundred solid buns would
       eat a cartridge and grey out the seams, destroying the one thing
       print must preserve. The SCALLOPS carry the breadness; the crust
       is a double line; the whole-tray outline survives as a dotted
       bridge across the gap, so the whole is still there on paper. */
    /* ⚠ NO PADDING WITH DUPLICATES. This used to top the list up to six
       with copies of the WHOLE tray, so a 3 x 3 printed one break per
       axis and four identical uncut trays — while the paywall copy sold
       "the same tray broken six ways". A sheet may be short; it may not
       be padded and mis-sold. The whole tray leads (it is the thing being
       derived from) and every other cell is a DIFFERENT break. */
    /* ⭐⭐ AND THE FIVE-LINE COMES FIRST, because the sheet used to walk
       k = 1, 2, 3 upward — so a SEVEN-row tray printed breaks after rows
       1, 2 and 3 and NEVER after row 5. The paper omitted the lesson:
       five-and-two is the derivation the entire product is built around
       and the one the fifth line is drawn deeper to support. A page of
       breaks that cannot show the break the tool exists for is worse
       than no page.
       So each axis offers its fifth line first, then its tenth, then the
       middle, then the rest — every one a real break, none repeated. */
    _printCuts: function () {
      var st = this.st, out = [{ axis: null, k: 0 }];
      var pick = function (axis, lim, room) {
        var order = [5, 10, Math.round(lim / 2), 2, 3, 1, 4, 6, 7, 8, 9], seen = {}, i, k;
        for (i = 0; i < order.length && room > 0; i++) {
          k = order[i];
          if (k < 1 || k > lim - 1 || seen[k]) continue;
          seen[k] = 1; room--;
          out.push({ axis: axis, k: k });
        }
      };
      pick('row', st.rows, 3);
      pick('col', st.cols, 2);
      return out;
    },

    _buildSheet: function () {
      var st = this.st, i, list = this._printCuts();
      if (this._printSheet && this._printSheet.parentNode) this._printSheet.parentNode.removeChild(this._printSheet);
      var sheet = this.api.el('div', 'btr-printsheet');
      for (i = 0; i < list.length; i++) {
        var cell = this.api.el('div', 'btr-p-svg');
        cell.innerHTML = this._sheetSvg(list[i]);
        var rule = this.api.el('div', 'btr-p-rule');
        cell.appendChild(rule);
        sheet.appendChild(cell);
      }
      /* ⚠ A SIBLING OF THE APPARATUS, NEVER A CHILD OF IT. The print
         block sets `.btr-wrap{display:none}`, and a display:none parent
         removes its entire subtree — so a sheet built inside the wrap
         had 156 real nodes and 127 painted shapes and still measured
         0px tall on paper. `visibility` would have survived that;
         `display` never does. */
      this.api.stage.appendChild(sheet);
      this._printSheet = sheet;
    },

    _sheetSvg: function (cut) {
      var st = this.st;
      /* ⚠ THE CEILING TRAVELS ONTO THE PAPER TOO. This rebuilt the tray
         with no ceiling, so with the 11-and-12 setting on the PAID sheet
         printed ten buns beside a numeral reading twelve — the same
         dropped-argument defect as the mutators, in the one artefact a
         teacher pays for. */
      var hi = st.hi;
      var s = cut.axis ? this.crack(this.newState(st.rows, st.cols, hi), cut.axis, cut.k) : this.newState(st.rows, st.cols, hi);
      if (!s) s = this.newState(st.rows, st.cols, hi);
      var P = 40, G = P * GAP_F, pieces = this.pieces(s), sp = this.spans(s), i, pc, shift;
      /* ⚠ THE SHEET OBEYS THE SETTING TOO. The five-groove was hardcoded
         here, so the teacher who switched it OFF for a doubling lesson —
         the exact reason the setting exists — printed a page that still
         shouted five. A setting the paper ignores is not a setting. */
      var five = this._groove();
      var W = st.cols * P + (s.axis === 'col' ? G * s.cuts.length : 0);
      var H = st.rows * P + (s.axis === 'row' ? G * s.cuts.length : 0);
      var M = P * 1.5;
      var out = '<svg viewBox="0 0 ' + (W + M * 2) + ' ' + (H + M * 2) + '" width="100%" role="img" aria-hidden="true">';
      /* the whole, dotted, bridging the gap */
      out += '<path d="' + this._silhouette(0, 0, st.cols, st.rows, P, M, M) + '" fill="none" stroke="#000" stroke-width="0.8" stroke-dasharray="2 3"/>';
      for (i = 0; i < pieces.length; i++) {
        pc = pieces[i];
        shift = 0;
        var j;
        for (j = 0; j < i; j++) shift += G;
        var dx = (s.axis === 'col') ? shift : 0, dy = (s.axis === 'row') ? shift : 0;
        out += '<g transform="translate(' + dx + ' ' + dy + ')">';
        out += '<path d="' + this._silhouette(pc.c0, pc.r0, pc.c1, pc.r1, P, M, M) + '" fill="none" stroke="#000" stroke-width="1.6"/>';
        var r, c;
        for (r = pc.r0 + 1; r < pc.r1; r++) {
          out += '<line x1="' + (M + pc.c0 * P) + '" y1="' + (M + r * P) + '" x2="' + (M + pc.c1 * P) + '" y2="' + (M + r * P) + '" stroke="#000" stroke-width="' + (five && r % 5 === 0 ? 1.8 : 0.9) + '"/>';
        }
        for (c = pc.c0 + 1; c < pc.c1; c++) {
          out += '<line x1="' + (M + c * P) + '" y1="' + (M + pc.r0 * P) + '" x2="' + (M + c * P) + '" y2="' + (M + pc.r1 * P) + '" stroke="#000" stroke-width="' + (five && c % 5 === 0 ? 1.8 : 0.9) + '"/>';
        }
        out += '</g>';
      }
      /* the edge numerals — the material is printed; the FACT is not */
      if (!s.cuts.length) {
        out += this._pText(M * 0.45, M + H / 2, st.rows, P);
        out += this._pText(M + W / 2, M * 0.55, st.cols, P);
      } else {
        for (i = 0; i < pieces.length; i++) {
          pc = pieces[i];
          var sh = G * i;
          if (s.axis === 'row') {
            out += this._pText(M * 0.45, M + ((pc.r0 + pc.r1) / 2) * P + sh, sp[i], P);
            out += this._pText(M + st.cols * P + M * 0.5, M + ((pc.r0 + pc.r1) / 2) * P + sh, st.cols, P);
          } else {
            out += this._pText(M + ((pc.c0 + pc.c1) / 2) * P + sh, M * 0.55, sp[i], P);
            out += this._pText(M + ((pc.c0 + pc.c1) / 2) * P + sh, M + st.rows * P + M * 0.5, st.rows, P);
          }
        }
      }
      return out + '</svg>';
    },

    _pText: function (x, y, v, P) {
      return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" dy="0.35em" text-anchor="middle" '
        + 'font-family="Baloo 2, Trebuchet MS, sans-serif" font-weight="700" font-size="' + (P * 0.95).toFixed(1) + '" fill="#000">' + v + '</text>';
    },

    _print: function () {
      this._buildSheet();
      window.print();
    },

    /* ================= entitlement =================================== */

    /* ⚠ UNKNOWN ENTITLEMENT MUST BE PESSIMISTIC. An unresolved tier is
       free-tier-locked, never optimistically unlocked. */
    _fetchEntitlement: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      try {
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) {}
    }
  };

  /* ================= CSS =========================================== */
  /* ⚠ NO `vh` ANYWHERE INSIDE A MANIPULATIVE (it is iframe-relative and
     the iframe is not the viewport). NO `font:` shorthand with an
     unquoted "Baloo 2" — the whole declaration is dropped and a clamp()
     floor silently never applies. NO inline `background` shorthand. */
  var CSS_DONE = false;
  function injectBakingTrayCSS() {
    if (CSS_DONE) return;
    CSS_DONE = true;
    var css = ''
      + '.btr-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
      + '.btr-arena{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;margin:0 auto;}'
      + '.btr-svg{display:block;width:100%;height:100%;}'
      + '.btr-hits{position:absolute;inset:0;}'
      /* ⚠⚠ THE KEYBOARD LAYER MUST NOT EAT THE POINTER. Each comb is an
         inset:0 container and they are painted AFTER the tray's press
         target, so they covered it completely: pointerdown never reached
         the tray, no preview ever ran, and the crack only happened at
         all because a later `click` fell through to a pad. The pads keep
         their keyboard focus, their aria-labels and their synthetic
         `.click()` — `pointer-events:none` removes none of those — while
         a real finger goes to the bread, which is the whole division of
         labour: POINTER TOUCHES THE TRAY, KEYBOARD DRIVES THE PADS. */
      + '.btr-comb{position:absolute;inset:0;pointer-events:none;}'

      /* the material. NINE hex values, no tenth. No coral: that is the
         platform's COUNTER colour and a coral bun would read as a
         counter, undoing the fusion the whole tool depends on. */
      + '.btr-paper{fill:#F2EDE1;stroke:#DED4C0;stroke-width:1.5;}'
      + '.btr-shadow{fill:#E3CDA8;opacity:.62;}'
      + '.btr-slab{fill:#F3DDB4;}'
      + '.btr-crumb{fill:none;stroke:#FBF0DC;stroke-linejoin:round;}'
      + '.btr-crust{fill:none;stroke:#BE6E33;stroke-linejoin:round;}'
      + '.btr-keyline{fill:none;stroke:#9E5526;stroke-linejoin:round;}'
      /* ⭐ THE SEAM IS THE HIGHEST-CONTRAST ELEMENT ON THE STAGE, not the
         bun. At 100 buns in a bright classroom, round low-contrast
         shapes read as texture and the grid must survive that. 7.6:1 on
         the dough, and nothing on the material is darker. */
      + '.btr-seam{stroke:#0F4A40;stroke-linecap:butt;}'
      + '.btr-seam.is-hot{stroke:#0A2F29;}'
      + '.btr-seam-lit{stroke:#FFF3DC;opacity:.55;stroke-linecap:butt;}'
      + '.btr-seam-pen{stroke:#0F4A40;opacity:.22;stroke-linecap:butt;}'
      + '.btr-num{fill:#2A2A35;font-family:\'Baloo 2\',\'Trebuchet MS\',system-ui,sans-serif;font-weight:700;}'

      /* ⭐ THE TRAY IS THE CONTROL. `.btr-hot` is one forgiving target
         over the whole tray; a press resolves to the nearest seam. The
         per-seam buttons under it exist for the keyboard, for assistive
         tech and for the liveness gate, and are invisible until focused
         — a control nobody can see is still a control somebody uses. */
      + '.btr-hot{position:absolute;cursor:pointer;touch-action:manipulation;}'
      + '.btr-pad{position:absolute;padding:0;border:0;background-color:transparent;'
      + 'cursor:pointer;-webkit-appearance:none;appearance:none;opacity:0;pointer-events:none;}'
      + '.btr-pad:focus-visible{opacity:1;outline:3px solid #146B5E;outline-offset:-2px;'
      + 'border-radius:6px;background-color:rgba(20,107,94,.10);}'
      + '.btr-pad.is-open:focus-visible{outline-color:#BE6E33;background-color:rgba(190,110,51,.12);}'
      + '.btr-pad.is-dead{cursor:default;}'

      + '.btr-hint{margin:2px 0 0;text-align:center;color:#6B6B78;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:16px;line-height:1.4;max-width:520px;}'
      + '.btr-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;}'
      + '.btr-foot2{margin-top:2px;}'
      + '.btr-chip{min-height:44px;padding:0 18px;border-radius:999px;border:2px solid #146B5E;'
      + 'background-color:#FFFFFF;color:#146B5E;font-family:Nunito,system-ui,sans-serif;'
      + 'font-weight:700;font-size:16px;cursor:pointer;}'
      + '.btr-chip.btr-turn{background-color:#F2784B;border-color:#F2784B;color:#FFFFFF;}'
      + '.btr-chip:disabled{opacity:.45;cursor:default;}'
      + '.btr-wrap:not(.btr-paid) .btr-lock{opacity:.75;}'

      + '.btr-step{display:flex;align-items:center;gap:6px;}'
      + '.btr-sbtn{min-width:44px;min-height:44px;border-radius:12px;border:2px solid #146B5E;'
      + 'background-color:#FFFFFF;color:#146B5E;font-size:20px;font-weight:700;cursor:pointer;'
      + 'font-family:Nunito,system-ui,sans-serif;}'
      + '.btr-sbtn:disabled{opacity:.35;cursor:default;}'
      + '.btr-sval{min-width:34px;text-align:center;font-family:\'Baloo 2\',\'Trebuchet MS\',system-ui,sans-serif;'
      + 'font-weight:700;font-size:22px;color:#2A2A35;}'

      + '.btr-gate{margin-top:8px;max-width:520px;padding:14px 16px;border-radius:16px;'
      + 'background-color:#FBF3E4;border:2px solid #E3CDA8;text-align:center;}'
      + '.btr-gate h3{margin:0 0 6px;font-family:\'Baloo 2\',system-ui,sans-serif;color:#146B5E;font-size:18px;}'
      + '.btr-gate p{margin:0 0 10px;font-family:Nunito,system-ui,sans-serif;color:#6B6B78;font-size:15px;line-height:1.45;}'
      + '.btr-gate-cta{display:inline-block;padding:10px 18px;border-radius:999px;'
      + 'background-color:#146B5E;color:#FFFFFF;text-decoration:none;font-weight:700;'
      + 'font-family:Nunito,system-ui,sans-serif;min-height:44px;line-height:24px;}'

      /* self-widening tiers, WIDTH ONLY, and every step carries a
         min-height floor: cold-line.js:933 records a bench that grew,
         pushed the tool past the card and was silently clipped by
         .lcs-app{overflow:hidden} in es/pt/it/nl only. */
      + '@media (min-width:1367px) and (min-height:880px){'
      + '  body.btr-wide .btr-arena{max-width:620px;}'
      + '  body.btr-wide .btr-hint{max-width:640px;font-size:18px;}'
      + '}'
      + '@media (min-width:1800px) and (min-height:1080px){'
      + '  body.btr-wide .btr-arena{max-width:800px;}'
      + '  body.btr-wide .btr-chip{min-height:52px;font-size:18px;padding:0 22px;}'
      + '  body.btr-wide .btr-sbtn{min-width:52px;min-height:52px;font-size:23px;}'
      + '  body.btr-wide .btr-sval{font-size:26px;}'
      + '}'
      + '@media (min-width:2400px) and (min-height:1300px){'
      + '  body.btr-wide .btr-arena{max-width:1000px;}'
      + '  body.btr-wide .btr-chip{min-height:60px;font-size:21px;padding:0 26px;}'
      + '  body.btr-wide .btr-sbtn{min-width:60px;min-height:60px;font-size:27px;}'
      + '  body.btr-wide .btr-sval{font-size:30px;}'
      + '}'
      + '@media (prefers-reduced-motion: reduce){'
      + '  .btr-pad{transition:none;}'
      + '}'

      /* ⚠ A PRINT CHIP THAT CALLS window.print() WITH NO @media print
         BLOCK PRINTS THE WHOLE WEB PAGE, and the shared liveness gate
         scores it green because window.print fired. #40 and #41 both
         shipped exactly that. */
      + '@media print{'
      + '  body *{visibility:hidden !important;}'
      + '  .btr-printsheet,.btr-printsheet *{visibility:visible !important;}'
      + '  .btr-printsheet{display:block !important;position:static;width:100%;}'
      + '  .btr-wrap{display:none !important;}'
      + '  .btr-p-svg{width:46%;margin:2%;display:inline-block;vertical-align:top;}'
      + '  .btr-p-rule{border-bottom:1.2px solid #000;height:26px;margin:2px 6% 10px;}'
      + '}'
      + '.btr-printsheet{display:none;}';
    var s = document.createElement('style');
    s.setAttribute('data-btr', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }

  if (typeof window !== 'undefined') window.BakingTray = BakingTray;
  if (typeof module !== 'undefined' && module.exports) module.exports = BakingTray;
}());
