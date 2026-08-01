/* =====================================================================
   TOOL #41 — THE UNROLLING TAPE   (unroll-tape.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #6. Catalog slot B4, wave 2, the
   measurement spine.

   THE SHAPE · THE STRAND · THE RUNWAY. Three named parts, and nothing
   else in this tool gets a noun. (It is THE STRAND, never "the tape" —
   #40 owns "THE TAPES", and a colliding noun is a collision even when
   the geometry differs.)

   THE ROUTINE:
     "How far is it all the way round? Guess — plant the flag."
      ... and then the move that matters:
     "Now let it lie down."

   THE ONE THESIS — THE WAY AROUND CAN LIE DOWN STRAIGHT, AND HOW MANY OF
   THE SHAPE'S OWN WIDTHS IT MAKES DOES NOT CHANGE WHEN THE SHAPE DOES.
   Grow the plate and everything grows with it — outline, strand, ticks —
   and the strand's end stays between the same two ticks the whole way.
   Its exact relationship to its sibling, which is the reason the two
   belong side by side: IN #40 THE OBJECT HELD STILL AND THE NUMBER
   MOVED; HERE EVERYTHING MOVES AND THE NUMBER HOLDS STILL.

   THREE INVENTIONS:
     1. ⭐ THE UNROLLING. A curved length becoming a straight one is the
        one abstraction in early measurement with no static
        representation. You can do it with real string, which is exactly
        why it never gets done twice.
     2. THE SHAPE'S OWN WIDTH IS THE UNIT. No centimetre, no paperclip —
        the tick step IS the across, so a circle reads three-and-a-bit at
        every size, and a Reuleaux triangle reads the same 3.14 while
        looking nothing like a circle (Barbier's theorem, measured here
        to 2e-12).
     3. LENGTH IS CONSERVED BY CONSTRUCTION, NOT BY ANIMATION. The strand
        occupies guide-arclength [L·t, L·t+L] on one fixed guide, so its
        total is L at every frame. Nothing appears; nothing disappears.

   ⚠ THE FENCE — FOUR SURFACES, RUN FRESH, AND IT CAME BACK **NOT CLEAN**.
   Per §23.3 the overlap is SUBTRACTED, not negotiated:
     TAKEN — `mending-fences-core.js` owns CCSS 3.MD.D.8, "perimeter, the
       distance AROUND". But it is RECTILINEAR ONLY: `:66 perimeterOf` is
       `boundaryEdges(mask)` over a polyomino grid, or `2*(w+h)`. Its
       "roll of fence" is a TEXT PILL PRINTING A NUMBER (`.mf-rope`,
       `activity:417`), never a physical strand; `:98 reachOracle` owns
       the roll-reach judgment and `:95 unitOracle` owns around-vs-fill.
       Printables `g3/G3-337` + `g3/G3-339` own grid-rectangle perimeter.
       → SO THIS TOOL NEVER WRAPS A POLYGON. Curves only. Gated.
     REMAINDER, measured virgin — ZERO `getPointAtLength` in the repo;
       one `getTotalLength` (`place-value-lab.js:1809`) used as a
       dash-offset animation; NO tool sums polyline segments for display
       (the only such sum, `letter-studio.js:749`, throws its result away
       as a boolean); no unroll, no bendable strand, no circumference.
     ASSET — there is NO outline, contour or SVG path for ANY object in
       this repo; every object is a rectangular alpha box, and
       `worksheet-gen/image-cache/silhouette.js` is Node-only and yields
       a 24×24 mask. So the boundary is ANALYTIC, which removes the
       catalog's flagged authoring cost entirely AND kills a modelling
       lie: a tape round a real cup measures its circular cross-section,
       not its side-view silhouette.

   ⚠ THE CATALOG'S B4 GATE SPEC DOES NOT SURVIVE CONTACT, TWICE:
     "within 0.00px" is arithmetically impossible — an inscribed polyline
       is STRICTLY shorter than its curve (chord ≤ arc is a theorem).
       Two errors are reported separately; see verify-unroll-tape.js.
     "unchanged under all 360 integer rotations" is true of the arc
       LENGTH and FALSE of the RATIO — measured, an ellipse's ratio
       varies 100% over 360°, a stadium's 143%. `across` is bbox width.
       → THERE IS NO ROTATION CONTROL, and each shape's orientation is
       fixed in the book.

   REFUSES, FOREVER — each one gated:
     1. NEVER WRAPS A POLYGON (see the fence).
     2. NEVER PRINTS THE TOTAL. No "3.14", no count. The only numerals on
        the stage are the runway's ticks and the caliper's 1.
     3. NEVER SAYS WHICH IS LONGER. No code path reads the flag and the
        strand end, or the strand bar and the tall bar, together.
     4. THE STRAND IS NEVER A RULER — a fixed fine weave, never tiled,
        never marked in acrosses. #40 owns "how many units fit".
     5. NOTHING 3-D, NOTHING TRACED. Flat plates, analytic outlines.
     6. NO AREA, EVER. `mending-fences` owns around-vs-fill and B5 The
        Reshape owns area/perimeter decoupling.
     7. NO ROTATION CONTROL (see above).
     And standing: no verdict, no score, no timer, no streak, no speech.

   0 lines to lcs-shell.{js,css} or any protected core.
   ===================================================================== */

(function () {
  'use strict';

  var TAU = Math.PI * 2;

  var UnrollTape = {
    id: 'unroll-tape',

    /* ---------------------------------------------------------------
       STRINGS — GENERATED. EN is authored; the other ten are REBUILT (not
       translated) by a three-person NATIVE panel per locale, §A.13.48.
       ⚠ DO NOT HAND-EDIT A LOCALE HERE. The source of truth is
       scripts/_unroll-tape-strings.js; scripts/apply-unroll-tape-locales.js
       rewrites this whole block from it.

       ⚠ AND NO STRING MAY NAME A UNIT. Not centimetre, not inch, not
       paperclip. `ruler.js` owns standard units (2.MD.A.1) and the
       no-words law forbids the label anyway — the shape's own width IS
       the unit, and the only numeral that says so is the 1 on the jaw.
       --------------------------------------------------------------- */
    strings: {
      title: { en: "The Unrolling Tape" },
      instruction: { en: "A strand lies all the way round the shape. Let it lie down straight, and see how many of the shape's own widths it makes." },
      benchLabel: { en: "A shape with a strand around it, and a runway ruled in the shape's own width" },
      hintGuess: { en: "How far is it all the way round? Drag the flag to where you think the strand will reach." },
      hintUnroll: { en: "Now let the strand lie down." },
      hintLanded: { en: "The strand came off the shape. Nothing was added and nothing was taken away." },
      unrollBtn: { en: "Let it lie down" },
      rollBackBtn: { en: "Wrap it back up" },
      nextShapeBtn: { en: "Another shape" },
      printBtn: { en: "Print the bench" },
      sizeAria: { en: "Make the shape bigger or smaller" },
      strandAria: { en: "Unroll the strand" },
      flagAria: { en: "Move the flag" },
      gateTitle: { en: "More shapes" },
      gateBody: { en: "Seven more shapes, and the bench to print for paper." },
      gateCta: { en: "See the Teacher plan" }
    },

    STORE_KEY: 'lcs:unroll-tape:v1',
    ENT_TRUST_DAYS: 14,

    /* ---- the stage, in model units ----------------------------------
       ⚠ ONE LAYOUT RULE COMES STRAIGHT OUT OF THE MATHEMATICS: the laid
       strand is R times longer than the shape is wide, and R runs to 6.9.
       So the shape can only ever occupy a fraction of the bench — that is
       not a compromise, it is the thesis rendered as a layout. The stage
       is therefore SHORT and WIDE, and the vertical budget is spent on
       the shape rather than on air. */
    W: 1000,
    H: 340,
    BASE: 250,          /* the runway line — the shape stands ON it       */
    X0: 150,            /* zero: B sits here, and tick k is at X0 + k·A   */
    RIGHT: 985,         /* nothing may be drawn past this                 */
    TOP: 20,            /* the shape may not rise above this              */
    N: 512,             /* outline samples; divisible by 2,3,4 (all knots)*/
    A_MIN: 70,
    A_MAX: 260,
    A_PREF: 260,        /* open as large as the three ceilings allow      */
    FREE_SHAPES: 5,

    premium: false,
    premiumKnown: false,

    /* =================================================================
       THE SHAPE FAMILIES — analytic, closed, u ∈ [0,1).
       The polar form is used wherever a trigonometric one would have
       singular speed at the corners (superellipse, n>2), so |γ′| stays
       bounded and the arclength table stays well-conditioned.
       ================================================================= */
    FAMILY: {
      circle: function () {
        return { f: function (u) { return [Math.cos(TAU * u), Math.sin(TAU * u)]; }, knots: [] };
      },
      ellipse: function (p) {
        return { f: function (u) { return [Math.cos(TAU * u), p.q * Math.sin(TAU * u)]; }, knots: [] };
      },
      superellipse: function (p) {
        return {
          f: function (u) {
            var th = TAU * u, c = Math.abs(Math.cos(th)), s = Math.abs(Math.sin(th));
            var r = Math.pow(Math.pow(c, p.n) + Math.pow(s / p.q, p.n), -1 / p.n);
            return [r * Math.cos(th), r * Math.sin(th)];
          }, knots: []
        };
      },
      /* width normalised to 1: two runs d, two semicircles r.
         L = 2d + 2πr EXACTLY — a closed-form anchor for the gate. */
      stadium: function (p) {
        var r = p.r, d = 1 - 2 * r, Ls = 2 * d + 2 * Math.PI * r;
        return {
          f: function (u) {
            var s = u * Ls, t;
            if (s < d) return [d / 2 - s, -r];
            s -= d;
            if (s < Math.PI * r) { t = -Math.PI / 2 - s / r; return [-d / 2 + r * Math.cos(t), r * Math.sin(t)]; }
            s -= Math.PI * r;
            if (s < d) return [-d / 2 + s, r];
            s -= d;
            t = Math.PI / 2 - s / r; return [d / 2 + r * Math.cos(t), r * Math.sin(t)];
          },
          knots: [d / Ls, (d + Math.PI * r) / Ls, (2 * d + Math.PI * r) / Ls]
        };
      },
      /* Reuleaux triangle of width 1 — three 60° arcs. L = π exactly
         (Barbier), and its width is 1 in EVERY direction, so it reads the
         same 3.14 as a circle while looking nothing like one. It is NOT a
         polygon: every one of its sides is an arc. */
      reuleaux: function () {
        var C = [[0, 0], [1, 0], [0.5, Math.sqrt(3) / 2]];
        return {
          f: function (u) {
            var seg = Math.floor(u * 3), t = u * 3 - seg;
            if (seg > 2) { seg = 2; t = 1; }
            var c = C[(seg + 2) % 3], p0 = C[seg], p1 = C[(seg + 1) % 3];
            var a0 = Math.atan2(p0[1] - c[1], p0[0] - c[0]);
            var a1 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
            while (a1 < a0) a1 += TAU;
            if (a1 - a0 > Math.PI) a1 -= TAU;
            var a = a0 + (a1 - a0) * t;
            return [c[0] + Math.cos(a), c[1] + Math.sin(a)];
          }, knots: [1 / 3, 2 / 3]
        };
      },
      egg: function (p) {
        return {
          f: function (u) { var t = TAU * u; return [Math.sin(t) * (1 + p.k * Math.cos(t)) * 0.8, Math.cos(t)]; },
          knots: []
        };
      },
      /* circular lune: outer radius 1 at the origin, inner radius r
         centred at (0,d). Both arcs exact — another closed-form anchor. */
      crescent: function (p) {
        var R = 1, r = p.r, d = p.d;
        var aA = Math.acos((R * R + d * d - r * r) / (2 * d * R));
        var aB = Math.acos((R * R - d * d - r * r) / (2 * d * r));
        var Lo = 2 * R * (Math.PI - aA), Li = 2 * r * (Math.PI - aB), Lt = Lo + Li;
        return {
          f: function (u) {
            var s = u * Lt, t;
            if (s <= Lo) { t = (Math.PI / 2 + aA) + s / R; return [R * Math.cos(t), R * Math.sin(t)]; }
            s -= Lo;
            t = (Math.PI / 2 - aB) - s / r;
            return [r * Math.cos(t), d + r * Math.sin(t)];
          }, knots: [Lo / Lt]
        };
      },
      rosette: function (p) {
        return {
          f: function (u) {
            var th = TAU * u, r = 1 + p.amp * Math.cos(p.k * th);
            return [r * Math.cos(th), r * Math.sin(th)];
          }, knots: []
        };
      },
      /* the same waisted curve turned a quarter: lobes STACKED, so the
         shape is tall and non-convex. */
      peanut: function (p) {
        return {
          f: function (u) {
            var th = TAU * u, r = 1 + p.w * Math.cos(2 * th);
            return [r * Math.sin(th), r * Math.cos(th)];
          }, knots: []
        };
      }
    },

    /* =================================================================
       THE OUTLINE — sampled once per shape, in UNIT space.

       ⭐ VERTEX 0 IS B, THE LOWEST POINT, EXACTLY. The strand's guide
       starts there and the outline meets the runway C¹ there (at a
       y-extreme the tangent is horizontal), so the wrap and the lay join
       without a kink. B is FOUND, never stored: a stored B would drift
       silently from a changed parametrisation.

       ⚠ AND THE SAMPLED MINIMUM IS NOT THE MINIMUM. A true extreme
       almost never lands on an integer sample — the Reuleaux's lowest
       point sits at u = 1/6, which is not a sample at any N divisible by
       3. It is refined by ternary search and then made vertex 0.
       ================================================================= */
    _refine: function (f, coord, sign, uMid, du) {
      var lo = uMid - du, hi = uMid + du, i, a, b;
      var val = function (u) { return sign * f(((u % 1) + 1) % 1)[coord]; };
      for (i = 0; i < 80; i++) {
        a = lo + (hi - lo) / 3; b = hi - (hi - lo) / 3;
        if (val(a) < val(b)) lo = a; else hi = b;
      }
      return ((((lo + hi) / 2) % 1) + 1) % 1;
    },

    buildOutline: function (shape) {
      var mk = this.FAMILY[shape.family];
      if (!mk) return null;
      var made = mk(shape.params || {});
      var f = made.f, i, k;

      /* 1. locate B (lowest y), coarse then refined.
         ⚠ A FLAT BOTTOM HAS NO SINGLE LOWEST POINT. The stadium rests on
         a straight run, so every point on it is equally lowest and a
         ternary search — which compares equal values — walks to an
         arbitrary end of its bracket. That put B on the run's edge, which
         put a knot on top of the parametrisation seam and forced two
         COINCIDENT samples (measured: 2 segments of 1.4e-9, 2.8e-7 of the
         median). Take the MIDDLE of the flat span instead: it is stable,
         and the shape then rests balanced on its own flat. */
      var M = 2048, bi = 0, bv = Infinity, uB;
      for (i = 0; i < M; i++) { var y = f(i / M)[1]; if (y < bv) { bv = y; bi = i; } }
      var flat = [];
      for (i = 0; i < M; i++) if (f(i / M)[1] <= bv + 1e-12) flat.push(i);
      if (flat.length > 2) {
        /* a run: walk the contiguous block containing bi and take its centre */
        var lo2 = bi, hi2 = bi;
        while (f((((lo2 - 1) % M) + M) % M / M)[1] <= bv + 1e-12 && hi2 - lo2 < M - 1) lo2--;
        while (f(((hi2 + 1) % M) / M)[1] <= bv + 1e-12 && hi2 - lo2 < M - 1) hi2++;
        uB = ((((lo2 + hi2) / 2) % M) + M) % M / M;
      } else {
        uB = this._refine(f, 1, -1, bi / M, 1.5 / M);
        if (-f(uB)[1] < -bv) uB = bi / M;    /* a cusp beats its neighbourhood */
      }

      /* 2. sample from B, with every family knot forced onto the grid —
            without that a corner costs an ORDER of accuracy.

            ⚠ AND THE PARAMETRISATION'S OWN SEAM (original u = 0) IS A
            KNOT TOO. Every family that declares corners declares the ones
            it can see — the Reuleaux says [1/3, 2/3] — but a Reuleaux has
            THREE corners and the third is the seam, implicit while u=0 is
            the start and invisible once the B-shift moves it to 5/6.
            Measured with it missing: convergence collapsed from O(1/N²)
            to O(1/N) and the Reuleaux read 3.14089 instead of 3.1415911,
            a 450× deficit — on a shape whose whole job is to read π.
            Shifting the seam in explicitly fixes it for every family at
            once, and does not depend on a family remembering to say so. */
      var cuts = [0, ((-uB) % 1 + 1) % 1];
      for (k = 0; k < made.knots.length; k++) cuts.push(((made.knots[k] - uB) % 1 + 1) % 1);
      /* ⚠ MERGE CUTS THAT ARE CLOSER THAN HALF A SAMPLE STEP. A cut that
         near another cannot carry a meaningful sub-segment, but the
         `max(2, …)` floor still forces two points into it — which is how
         a degenerate 1.4e-9 segment appeared. A knot within half a step
         of the grid is already on the grid. */
      cuts.sort(function (a, b) { return a - b; });
      var eps = 0.5 / this.N;
      var uniq = [];
      for (i = 0; i < cuts.length; i++) if (i === 0 || cuts[i] > cuts[i - 1] + eps) uniq.push(cuts[i]);
      if (1 - uniq[uniq.length - 1] < eps) uniq.pop();
      uniq.push(1);

      /* ⚠ EXACTLY N VERTICES. Per-segment `round()` drifts — the stadium's
         four junctions rounded to 514 — and the vertex count is something
         the gate asserts, so it must be exact rather than approximately
         right. The remainder is spread one-per-segment over the longest
         segments, which keeps the spacing as even as an integer split
         allows without ever moving a knot. */
      var segN = [], want = [], k2;
      for (k = 0; k < uniq.length - 1; k++) want.push(this.N * (uniq[k + 1] - uniq[k]));
      for (k = 0; k < want.length; k++) segN.push(Math.max(2, Math.floor(want[k])));
      var have = 0;
      for (k = 0; k < segN.length; k++) have += segN[k];
      var order = [];
      for (k = 0; k < want.length; k++) order.push(k);
      order.sort(function (a, b) { return (want[b] - segN[b]) - (want[a] - segN[a]); });
      for (k2 = 0; have < this.N && order.length; k2++) { segN[order[k2 % order.length]]++; have++; }
      var pts = [];
      for (k = 0; k < uniq.length - 1; k++) {
        var a0 = uniq[k], b0 = uniq[k + 1], n = segN[k];
        for (i = 0; i < n; i++) pts.push(f(((a0 + (b0 - a0) * i / n) + uB) % 1));
      }

      /* 3. cumulative arclength, and the bbox OF THE POLYLINE ITSELF —
            measuring `across` off the analytic curve while the strand is
            the polyline would put one sinc factor on one and not the
            other, and the circle's readout would drift. */
      var cum = [0], L = 0, x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (i = 0; i < pts.length; i++) {
        var p = pts[i], q = pts[(i + 1) % pts.length];
        if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0];
        if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1];
        L += Math.hypot(q[0] - p[0], q[1] - p[1]);
        cum.push(L);
      }
      return {
        k: shape.k, pts: pts, cum: cum, L: L,
        across: x1 - x0, tall: y1 - y0,
        minX: x0, minY: y0,
        R: L / (x1 - x0), tallR: (y1 - y0) / (x1 - x0)
      };
    },

    /* point on the outline at arclength s ∈ [0, L] (binary search + lerp;
       never Newton — a cusp has infinite dt/ds and Newton diverges) */
    atArc: function (o, s) {
      if (s <= 0) return o.pts[0];
      if (s >= o.L) return o.pts[0];
      var lo = 0, hi = o.cum.length - 1, mid;
      while (hi - lo > 1) { mid = (lo + hi) >> 1; if (o.cum[mid] <= s) lo = mid; else hi = mid; }
      var a = o.pts[lo % o.pts.length], b = o.pts[(lo + 1) % o.pts.length];
      var seg = o.cum[lo + 1] - o.cum[lo];
      var f = seg > 0 ? (s - o.cum[lo]) / seg : 0;
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    },

    /* =================================================================
       THE STATE — total, pure, immutable.
       ================================================================= */
    newState: function () {
      return { shape: 0, A: this.A_PREF, t: 0, flag: null, committed: false };
    },

    /* ⚠ TOTAL MEANS TOTAL — `st || newState()` catches null and 0 and
       hands `{}` or `[]` straight through to a property read. */
    _st: function (st) {
      return (st && typeof st === 'object' &&
        typeof st.shape === 'number' && isFinite(st.shape) &&
        typeof st.A === 'number' && isFinite(st.A) &&
        typeof st.t === 'number' && isFinite(st.t)) ? st : this.newState();
    },
    _clone: function (st) {
      var s = this._st(st);
      return { shape: s.shape, A: s.A, t: s.t, flag: s.flag, committed: !!s.committed };
    },

    /* The size band. THREE ceilings, and all three are real:
         · legibility     — A_MAX, so the picture stays a picture
         · the RUNWAY     — the laid strand is R·A long and must not pass
                            RIGHT, which is what makes a burst (R=6.9)
                            smaller than a pebble (R=2.3)
         · the SHAPE ZONE — a tall shape (the eye is 2.3 acrosses high)
                            would otherwise grow straight out of the top
                            of the bench. Missing this was why the first
                            layout had a tiny shape and a lake of dead air:
                            the cap was set by the strand alone, so a
                            squat shape was held down by a tall one's need.
       Plus a floor, so nothing ever becomes too small to read. */
    aMax: function (o) {
      if (!o || !(o.R > 0)) return this.A_MAX;
      var byRunway = Math.floor((this.RIGHT - this.X0) / o.R);
      var byHeight = o.tallR > 0 ? Math.floor((this.BASE - this.TOP) / o.tallR) : this.A_MAX;
      return Math.max(this.A_MIN, Math.min(this.A_MAX, byRunway, byHeight));
    },
    /* what a shape opens at: as big as it can be, up to the preferred size */
    defaultA: function (o) {
      return Math.max(this.A_MIN, Math.min(this.A_PREF, this.aMax(o)));
    },

    setSize: function (st, o, v) {
      var s = this._clone(st);
      var hi = this.aMax(o), a = Math.round(v);
      if (!(a >= this.A_MIN) || !(a <= hi)) return null;
      if (a === s.A) return null;
      s.A = a;
      return s;
    },

    setPeel: function (st, v) {
      var s = this._clone(st);
      var t = Math.min(1, Math.max(0, v));
      if (t === s.t) return null;
      /* ⭐ THE COMMIT. The flag freezes BY REFUSAL at the first movement
         off the wrap — not by a `disabled` attribute, which is the hole
         draw-bag / number-sieve / measurement-bench / estimation-jar all
         share (§23.6). */
      if (t > 0 && s.flag !== null) s.committed = true;
      s.t = t;
      return s;
    },

    /* the flag is stored IN ACROSSES, so it survives a size change and a
       shape change and keeps its meaning */
    setFlag: function (st, o, acrosses) {
      var s = this._clone(st);
      if (s.committed) return null;          /* frozen by refusal */
      if (s.t > 0) return null;              /* only while wrapped */
      if (!o) return null;
      var v = Math.round(acrosses * 100) / 100;
      var hi = (this.RIGHT - this.X0) / s.A;
      if (!(v > 0) || v > hi) return null;
      if (s.flag === v) return null;
      s.flag = v;
      return s;
    },

    nextShape: function (st, shelf) {
      var s = this._clone(st);
      if (!shelf || shelf.length < 2) return null;
      s.shape = (s.shape + 1) % shelf.length;
      s.t = 0; s.flag = null; s.committed = false;
      return s;
    },

    /* the shelf the current entitlement may see */
    shelf: function () {
      var all = (this.data && this.data.shapes) || [], out = [], i;
      for (i = 0; i < all.length; i++) if (i < this.FREE_SHAPES || this.premium) out.push(all[i]);
      return out;
    },

    /* =================================================================
       THE GUIDE — the whole of invention 3 in six lines.

       Guide G = the outline from B (arclength 0→L), then straight right
       along the runway. The strand occupies guide-arclength [L·t, L·t+L],
       so its TOTAL IS L AT EVERY t BY CONSTRUCTION. Nothing appears,
       nothing disappears; every material point travels one guide at one
       speed, and the loop OPENS rather than shrinking.

       ⚠ THE LAID PART IS ONE STRAIGHT SEGMENT of exactly L·t model units,
       so the reading is exact by construction — only the PICTURE of the
       wrap is discretised. Those are two different errors and the gate
       reports them separately.
       ================================================================= */
    strandPoints: function (o, st, aOver) {
      var s = this._st(st);
      if (!o) return [];
      var A = (typeof aOver === 'number' && aOver > 0) ? aOver : s.A;
      var scale = A / o.across;
      var Lm = o.L * scale;                  /* the strand's length, in model units */
      var laid = Lm * s.t;
      var out = [], i;
      /* the wrapped part: outline vertices with arclength in [L·t, L] */
      var sFrom = o.L * s.t;
      /* B is vertex 0; place it at X0 on the runway */
      var bx = o.pts[0][0], by = o.pts[0][1];
      /* ⚠ THE Y AXIS FLIPS. B is the shape's MINIMUM y in maths space and
         its MAXIMUM y on screen, because SVG y grows downward. Mapping
         with `BASE + (p[1]-by)` put every shape UNDER the runway instead
         of standing on it. */
      var map = function (p) {
        return [UnrollTape.X0 + (p[0] - bx) * scale, UnrollTape.BASE - (p[1] - by) * scale];
      };
      if (s.t < 1) {
        out.push(map(this.atArc(o, sFrom)));
        for (i = 0; i < o.pts.length; i++) if (o.cum[i] > sFrom) out.push(map(o.pts[i]));
        out.push(map(o.pts[0]));             /* arrive back at B */
      } else {
        out.push(map(o.pts[0]));
      }
      if (laid > 0) out.push([this.X0 + laid, this.BASE]);
      return out;
    },

    /* the polyline's own total length, in model units — the quantity the
       gate compares against the analytic arc length */
    strandLength: function (o, st, aOver) {
      var p = this.strandPoints(o, st, aOver), L = 0, i;
      for (i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
      return L;
    },

    /* the outline as drawn (always the full loop — the SHAPE never moves,
       only the strand leaves it) */
    outlinePoints: function (o, st, aOver) {
      var s = this._st(st);
      if (!o) return [];
      var A = (typeof aOver === 'number' && aOver > 0) ? aOver : s.A;
      var scale = A / o.across, bx = o.pts[0][0], by = o.pts[0][1], out = [], i;
      for (i = 0; i < o.pts.length; i++) {   /* y flips — see strandPoints */
        out.push([this.X0 + (o.pts[i][0] - bx) * scale, this.BASE - (o.pts[i][1] - by) * scale]);
      }
      return out;
    },

    /* =================================================================
       THE SHAPE BOOK — family + parameters only. R, the perimeter, the
       across and the tall are DERIVED here and INDEPENDENTLY in the gate,
       never read from a file. A stored answer is an answer that can drift
       away from the picture without anyone noticing.

       ⚠ A 404 DEGRADES TO THE FREE TIER, NEVER TO NOTHING.
       ================================================================= */
    FALLBACK_SHAPES: {
      version: 1, freeCount: 5,
      shapes: [
        { k: 'pebble', family: 'ellipse', params: { q: 0.3988601222559297 } },
        { k: 'circle', family: 'circle', params: {} },
        { k: 'egg', family: 'egg', params: { k: 0.3238155563068533 } },
        { k: 'crescent', family: 'crescent', params: { r: 0.7, d: 0.3870136357809074 } },
        { k: 'eye', family: 'ellipse', params: { q: 2.3 } }
      ]
    },

    _fetchShapes: function () {
      var self = this;
      fetch('/mini-tools/unroll-tape-shapes.json', { cache: 'no-cache' })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .catch(function () { return self.FALLBACK_SHAPES; })
        .then(function (d) {
          self.data = (d && d.shapes && d.shapes.length) ? d : self.FALLBACK_SHAPES;
          self._outlines = {};
          var sh = self.shelf();
          if (sh.length) self.st.A = self.defaultA(self.outlineFor(sh[0]));
          if (self._wrap) self.render();
        });
    },

    outlineFor: function (shape) {
      if (!shape) return null;
      if (!this._outlines) this._outlines = {};
      if (!this._outlines[shape.k]) this._outlines[shape.k] = this.buildOutline(shape);
      return this._outlines[shape.k];
    },

    /* =================================================================
       STORE + ENTITLEMENT — the pattern from unit-handle.js:414-450.
       ================================================================= */
    _loadStore: function () {
      var s = null;
      try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
      if (!s || typeof s !== 'object') s = {};
      if (!s.v) s.v = 1;
      return s;
    },
    _saveStore: function () {
      try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
    },
    _fetchEntitlement: function () {
      var self = this, token = null;
      try { token = localStorage.getItem('accessToken'); } catch (_) {}
      var trustCache = function () {
        var ent = self._store.ent;
        if (ent && ent.checkedAt) {
          var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
          self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
        } else self.premium = false;
        self.premiumKnown = true;
        if (self._wrap) self.render();
      };
      if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
          var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
          self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
          self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
          self._saveStore();
          self.premiumKnown = true;
          if (self._wrap) self.render();
        })
        .catch(trustCache);
    },

    /* =================================================================
       LIFECYCLE
       ================================================================= */
    init: function (api) {
      this.api = api;
      injectUnrollTapeCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.data = this.FALLBACK_SHAPES;
      this._outlines = {};
      this.st = this.newState();
      this._timers = [];
      this._fetchShapes();
      this._fetchEntitlement();
      this.render();
    },
    reset: function () { this.st = this.newState(); this.render(); },
    destroy: function () {
      var i;
      for (i = 0; i < (this._timers || []).length; i++) clearTimeout(this._timers[i]);
      this._timers = [];
      if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
      this._wrap = null;
    },
    _after: function (ms, fn) {
      var id = setTimeout(fn, ms);
      this._timers.push(id);
      return id;
    },

    /* =================================================================
       RENDER — one SVG, model coordinates as vertices, percentage-free.
       ================================================================= */
    render: function () {
      var api = this.api;
      if (!api || !api.stage) return;
      var stage = api.stage;              /* a PROPERTY on the shell api, not a call */
      var self = this;
      var shelf = this.shelf();
      var shape = shelf[Math.min(this.st.shape, Math.max(0, shelf.length - 1))];
      var o = this.outlineFor(shape);

      stage.innerHTML = '';
      var wrap = api.el('div', 'urt-wrap');
      this._wrap = wrap;

      var bench = api.el('div', 'urt-bench');
      bench.setAttribute('role', 'group');
      bench.setAttribute('aria-label', api.t('benchLabel'));

      var svg = this._svg('svg', { viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'urt-svg' });
      bench.appendChild(svg);

      if (o) {
        /* render-local clamp: a stale A from a previous shape can never
           draw off-stage, and the clamp does NOT mutate the state */
        var A = Math.max(this.A_MIN, Math.min(this.st.A, this.aMax(o)));
        var scale = A / o.across;
        var TICK = this.BASE + 15, NUMY = this.BASE + 42, TALLY = this.BASE + 72;

        /* --- the runway line, ticks, and numerals -------------------- */
        svg.appendChild(this._svg('line', {
          x1: this.X0, y1: this.BASE, x2: this.RIGHT, y2: this.BASE, 'class': 'urt-rule'
        }));
        var k = 0, tx;
        while (this.X0 + k * A <= this.RIGHT) {
          tx = this.X0 + k * A;
          svg.appendChild(this._svg('line', { x1: tx, y1: this.BASE, x2: tx, y2: TICK, 'class': 'urt-tick' }));
          /* ⭐ THE NUMERAL SITS IN THE MIDDLE OF ITS INTERVAL, not on the
             tick. On a tick it names a POSITION; in the interval it names
             a LENGTH — and the length it names is the shape's own width,
             which is the whole unit of this tool. */
          if (this.X0 + (k + 1) * A <= this.RIGHT) {
            var num = this._svg('text', { x: tx + A / 2, y: NUMY, 'class': 'urt-num' });
            num.textContent = String(k + 1);
            svg.appendChild(num);
          }
          k++;
        }

        /* --- the tall bar: a RING where the strand is a FILL.
               End caps, so it reads as a measured bar from zero and not
               as a stray dash lying on the bench. --------------------- */
        var tallEnd = this.X0 + o.tallR * A;
        svg.appendChild(this._svg('line', {
          x1: this.X0, y1: TALLY, x2: tallEnd, y2: TALLY, 'class': 'urt-tall'
        }));
        svg.appendChild(this._svg('line', { x1: this.X0, y1: TALLY - 9, x2: this.X0, y2: TALLY + 9, 'class': 'urt-tallcap' }));
        svg.appendChild(this._svg('line', { x1: tallEnd, y1: TALLY - 9, x2: tallEnd, y2: TALLY + 9, 'class': 'urt-tallcap' }));

        /* --- the shape --------------------------------------------- */
        var op = this.outlinePoints(o, this.st, A);
        svg.appendChild(this._svg('polygon', { points: this._pts(op), 'class': 'urt-outline' }));

        /* --- the caliper: two VERTICAL serifs at the shape's own edges.
               ⚠ It was a bracket with a horizontal bar, which lay exactly
               where the laid strand lies and the two collided. Verticals
               cannot collide with a horizontal cord, and the width they
               mark is the same width the ticks step by — which is the
               whole unit of this tool. ------------------------------- */
        var left = this.X0 + (o.minX - o.pts[0][0]) * scale;
        var jawY = this.BASE;
        svg.appendChild(this._svg('line', { x1: left, y1: jawY - 17, x2: left, y2: jawY + 3, 'class': 'urt-jaw' }));
        svg.appendChild(this._svg('line', { x1: left + A, y1: jawY - 17, x2: left + A, y2: jawY + 3, 'class': 'urt-jaw' }));

        /* --- THE STRAND: one node, drawn over everything ------------- */
        var sp = this.strandPoints(o, this.st, A);
        this._strandEl = this._svg('polyline', { points: this._pts(sp), 'class': 'urt-strand' });
        svg.appendChild(this._strandEl);

        /* --- the flag STANDS UP from the runway, the only vertical --- */
        if (this.st.flag !== null) {
          var fx = this.X0 + this.st.flag * A;
          var g = this._svg('g', {});
          g.appendChild(this._svg('line', { x1: fx, y1: this.BASE, x2: fx, y2: this.BASE - 52, 'class': 'urt-flagpole' }));
          g.appendChild(this._svg('polygon', {
            points: fx + ',' + (this.BASE - 52) + ' ' + (fx + 30) + ',' + (this.BASE - 42) + ' ' + fx + ',' + (this.BASE - 32),
            'class': 'urt-flagcloth'
          }));
          svg.appendChild(g);
        }

        /* --- the three grabbable things ------------------------------ */
        this._grip(svg, 'urt-grip', left + A, jawY - 24, api.t('sizeAria'), function (dx, rect) {
          var v = self.st.A + dx * (self.W / rect.width);
          var n = self.setSize(self.st, o, v);
          if (n) { self.st = n; self.render(); }
        });

        var tipX = this.X0 + (o.L * scale) * this.st.t;
        this._grip(svg, 'urt-tip', tipX, this.BASE, api.t('strandAria'), function (dx, rect) {
          var Lm = o.L * scale;
          var v = self.st.t + dx * (self.W / rect.width) / Lm;
          var n = self.setPeel(self.st, v);
          if (n) { self.st = n; self.render(); }
        });

        /* ⭐ the flag is grabbable ONLY while there is a question to
           answer — gated in the MODEL (setFlag refuses), not by a
           `disabled` attribute (§23.6). */
        if (this.st.t === 0 && !this.st.committed) {
          var fx0 = Math.min(this.X0 + (this.st.flag === null ? 2 : this.st.flag) * A, this.RIGHT);
          /* an un-planted flag is drawn as a GHOST PENNANT, not a bare
             dot — a handle should look like the thing it moves */
          if (this.st.flag === null) {
            var gh = this._svg('g', { 'class': 'urt-ghost' });
            gh.appendChild(this._svg('line', { x1: fx0, y1: this.BASE, x2: fx0, y2: this.BASE - 52, 'class': 'urt-flagpole' }));
            gh.appendChild(this._svg('polygon', {
              points: fx0 + ',' + (this.BASE - 52) + ' ' + (fx0 + 30) + ',' + (this.BASE - 42) + ' ' + fx0 + ',' + (this.BASE - 32),
              'class': 'urt-flagcloth'
            }));
            svg.appendChild(gh);
          }
          this._grip(svg, 'urt-flag', fx0, this.BASE - 42, api.t('flagAria'),
            function (dx, rect, x) {
              var v = (x - self.X0) / A;
              var n = self.setFlag(self.st, o, v);
              if (n) { self.st = n; self.render(); }
            }, true);
        }
      }

      wrap.appendChild(bench);

      /* --- the hint ladder ------------------------------------------ */
      var hint = api.el('div', 'urt-hint');
      var line = function (key) {
        var e = api.el('span', 'urt-hline');
        e.textContent = api.t(key);
        hint.appendChild(e);
      };
      if (this.st.t >= 1) line('hintLanded');
      else if (this.st.flag === null) line('hintGuess');
      else line('hintUnroll');
      wrap.appendChild(hint);

      /* --- the foot ------------------------------------------------- */
      var foot = api.el('div', 'urt-foot');
      var chip = function (label, cls, fn, off) {
        var b = api.el('button', 'urt-chip' + (cls ? ' ' + cls : ''));
        b.type = 'button';
        b.textContent = label;
        if (off) b.disabled = true; else b.addEventListener('click', fn);
        foot.appendChild(b);
        return b;
      };
      var rolling = this.st.t >= 1;
      chip(api.t(rolling ? 'rollBackBtn' : 'unrollBtn'), 'urt-go', function () { self._animate(rolling ? 0 : 1); }, !o);
      chip(api.t('nextShapeBtn'), '', function () {
        var sh2 = self.shelf();
        var n = self.nextShape(self.st, sh2);
        if (n) {
          /* the new shape gets its OWN size — a tall shape and a squat one
             have different ceilings, and carrying a stale A across would
             either overflow the bench or shrink a shape for no reason */
          n.A = self.defaultA(self.outlineFor(sh2[n.shape]));
          self.st = n;
          self.render();
        } else if (!self.premium) self._showGate();
      }, false);
      chip(api.t('printBtn'), 'urt-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        try { window.print(); } catch (_) {}
      }, false);
      wrap.appendChild(foot);

      stage.appendChild(wrap);
    },

    _svg: function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
      return e;
    },
    _pts: function (arr) {
      var s = [], i;
      for (i = 0; i < arr.length; i++) s.push(arr[i][0].toFixed(3) + ',' + arr[i][1].toFixed(3));
      return s.join(' ');
    },

    /* a grabbable handle: a 44-model-unit transparent hit target with a
       focus ring, keyboard-steppable, and ⚠ BOUND TO WINDOW — removing a
       captured element from the document RELEASES pointer capture, and a
       repaint replaces the whole SVG, so an element-bound drag applies
       only its first move (#40 paid for this one). */
    _grip: function (svg, cls, x, y, aria, onMove, absolute) {
      var self = this;
      var g = this._svg('g', { 'class': cls, tabindex: '0', role: 'slider', 'aria-label': aria });
      g.appendChild(this._svg('circle', { cx: x, cy: y, r: 22, 'class': 'urt-hit' }));
      g.appendChild(this._svg('circle', { cx: x, cy: y, r: 15, 'class': 'urt-ring' }));
      g.appendChild(this._svg('circle', { cx: x, cy: y, r: 9, fill: '#146B5E' }));
      g.addEventListener('pointerdown', function (ev) {
        ev.preventDefault();
        var rect = svg.getBoundingClientRect();
        var startX = ev.clientX;
        var move = function (e) {
          if (!rect.width) return;
          if (absolute) onMove(0, rect, (e.clientX - rect.left) / rect.width * self.W);
          else onMove(e.clientX - startX, rect, 0);
          if (!absolute) startX = e.clientX;
        };
        var up = function () {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      });
      g.addEventListener('keydown', function (ev) {
        var d = (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') ? -1
          : (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') ? 1 : 0;
        if (!d) return;
        ev.preventDefault();
        var rect = svg.getBoundingClientRect();
        if (absolute) onMove(0, rect, x + d * 12);
        else onMove(d * 12 * (rect.width / self.W), rect, 0);
      });
      svg.appendChild(g);
      return g;
    },

    /* the peel, animated. prefers-reduced-motion → one step. */
    _animate: function (to) {
      var self = this;
      if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
      var reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) {}
      if (reduce) {
        var n0 = this.setPeel(this.st, to);
        if (n0) { this.st = n0; this.render(); }
        return;
      }
      var from = this.st.t, t0 = null, dur = 900;
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        var n = self.setPeel(self.st, from + (to - from) * e);
        if (n) { self.st = n; self.render(); }
        if (p < 1) self._raf = requestAnimationFrame(step); else self._raf = null;
      };
      this._raf = requestAnimationFrame(step);
    },

    _showGate: function () {
      var api = this.api;
      if (!this._wrap) return;
      if (this._wrap.querySelector('.urt-gate')) return;
      var g = api.el('div', 'urt-gate');
      var h = api.el('div', '');
      h.textContent = api.t('gateTitle');
      var p = api.el('div', '');
      p.textContent = api.t('gateBody');
      var a = api.el('a', '');
      a.href = '/pricing';
      a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    }
  };

  /* ===================================================================
     CSS — scoped to .urt-, injected once.
     =================================================================== */
  var cssDone = false;
  function injectUnrollTapeCSS() {
    if (cssDone) return;
    cssDone = true;
    var css = ''
      + '.urt-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
      + '.urt-bench{position:relative;width:100%;max-width:660px;border-radius:18px;'
      + 'border:2px solid rgba(20,107,94,.28);background-color:#FBF3E4;overflow:hidden;}'
      + '.urt-svg{display:block;width:100%;height:auto;}'
      /* the strand: one node, one weave, for the life of the tool */
      + '.urt-strand{fill:none;stroke:#F2784B;stroke-width:11;stroke-linecap:round;'
      + 'stroke-linejoin:round;stroke-dasharray:6 5;}'
      + '.urt-outline{fill:rgba(20,107,94,.10);stroke:rgba(20,107,94,.55);stroke-width:2.5;}'
      + '.urt-rule{stroke:rgba(20,107,94,.55);stroke-width:2.5;}'
      + '.urt-tick{stroke:rgba(20,107,94,.45);stroke-width:2;}'
      + '.urt-num{fill:#0F4A40;font:700 22px Baloo 2,Nunito,sans-serif;text-anchor:middle;}'
      + '.urt-jaw{stroke:#0F4A40;stroke-width:2;}'
      + '.urt-jawnum{fill:#0F4A40;font:800 20px Baloo 2,Nunito,sans-serif;text-anchor:middle;}'
      /* the tall bar is a RING, the strand is a FILL — differ in KIND, not
         hue, so no palette ever delivers a verdict */
      + '.urt-tall{fill:none;stroke:#146B5E;stroke-width:9;stroke-linecap:round;}'
      + '.urt-tallcap{stroke:#146B5E;stroke-width:3;}'
      + '.urt-flagpole{stroke:#8A5A3B;stroke-width:3;}'
      + '.urt-flagcloth{fill:#E8B84B;}'
      + '.urt-ghost{opacity:.30;}'
      /* controls */
      + '.urt-grip,.urt-tip,.urt-flag{cursor:grab;touch-action:none;}'
      + '.urt-grip:active,.urt-tip:active,.urt-flag:active{cursor:grabbing;}'
      + '.urt-hit{fill:transparent;stroke:transparent;stroke-width:0;}'
      + '.urt-grip:focus-visible .urt-ring,.urt-tip:focus-visible .urt-ring,'
      + '.urt-flag:focus-visible .urt-ring{stroke:#146B5E;stroke-width:3;fill:none;}'
      + '.urt-ring{fill:none;stroke:transparent;}'
      + '.urt-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:660px;}'
      + '.urt-chip{font:600 clamp(.9rem,3.2vw,1.02rem)/1.1 Nunito,sans-serif;padding:11px 18px;'
      + 'min-height:44px;border-radius:14px;border:2px solid #146B5E;background:#FBF3E4;color:#0F4A40;cursor:pointer;}'
      + '.urt-chip.urt-go{background:#F2784B;border-color:#F2784B;color:#FFF8EE;}'
      + '.urt-chip.urt-lock{border-color:#C8613A;color:#C8613A;}'
      + '.urt-chip[disabled]{opacity:.45;cursor:default;}'
      + '.urt-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
      + 'line-height:1.45;color:#3C6E63;max-width:660px;}'
      + '.urt-hline{display:block;}'
      + '.urt-gate{width:100%;max-width:660px;border-radius:16px;border:2px dashed #C8613A;'
      + 'background:#FFF6EE;padding:14px 16px;text-align:center;font-family:Nunito,sans-serif;color:#7A3B21;}'
      + '.urt-gate a{color:#C8613A;font-weight:700;}'
      + '@media (prefers-reduced-motion:reduce){.urt-strand{transition:none;}}';
    var el = document.createElement('style');
    el.setAttribute('data-urt', '1');
    el.textContent = css;
    document.head.appendChild(el);
  }

  if (typeof window !== 'undefined') window.UnrollTape = UnrollTape;
  if (typeof module !== 'undefined' && module.exports) module.exports = UnrollTape;
  if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(UnrollTape);
}());
