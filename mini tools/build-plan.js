/* =====================================================================
   TOOL #44 — THE BLUEPRINT   (build-plan.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #9. Catalog slot B2, OPENING
   WAVE 3, space and structure. Wave 2 closed with #43.

   THE THESIS. A grid of numerals and a building of cubes are the same
   object written two ways, and you can edit it from either end. Then:
   turn it, and what you see changes although the thing does not — and
   two different buildings can look identical from the front and the
   side.

   ⭐ ONE NAMED PART: THE BLUEPRINT. Nothing else in this tool gets a
   noun, and that is a finding, not a style choice. The 11-locale census
   found the cube is owned four times over —
     · measurement-bench.js:48-49  unitCubeS/P in all eleven locales
     · choice-board-activity.js:550 the 3-D shape answer vocabulary
     · place-value-core.js:85       srUnitCube (`Einerwürfel`, `blokje`)
     · number-talk-easel.js:60      reprDice — and THAT is the hazard:
       de `Würfelbild`, sv `Tärningsbild`, da/no `Terning` mean DIE.
   There is no free cube word anywhere, so the cubes stay geometry, per
   `comparison-planks.js:7-8` — "three named parts, and nothing else in
   this tool gets a noun."

   ⭐⭐ AND THE VIEWS ARE NAMED BY DIRECTION, NOT BY A VIEW-NOUN.
   `class-timer.js:76` and `hush-owl.js:87` ship the shell's expand
   control as "Back to full view" in eleven locales — de `Ansicht`,
   it/es `vista`, pt `visão`, nl `weergave`, sv `vy`, da/no `visning`,
   fi `näkymä`. A panel called "the side view" would be using, in every
   locale, the shell's own word for *make the window bigger*. So: FROM
   THE FRONT and FROM THE SIDE. (nl `aanzicht` is the one clean
   architectural noun on the board — 0 hits — and the Dutch panel may
   take it.)
   ⚠ `elevation` is also unavailable in EN: `lcs-shell.css:44` uses it
   as a shadow-depth design token.

   ⚠⚠ AN OPEN RULING FOR THE GERMAN PANEL, RECORDED NOT PAPERED OVER.
   `Der Käferplan` is #40's German NAME, and `tool-content/de.json:1018`
   already writes "Bauen nach Bauplan" — in #40's own German classroom
   idea. So German already owns `-plan` as a tool-name head. The census
   found `Grundriss` and `Bauplatte` both at 0 hits. Whether a shared
   compound HEAD is a collision is a policy question the shipped rule
   does not answer (`comparison-planks.js:13-14` only settles that
   geometry does not save you). The German panel rules; the ruling is
   written here.

   THE FENCE (§23.3) — occupied on three of four surfaces, subtracted:
   · ⭐ `scripts/worksheet-gen/primitives/unit-cubes.js` IS a real
     dimetric iso renderer, and `G3-346-volume-unit-cubes` already asks
     "count all the cubes". It deliberately forces w = 1 — a single-
     depth wall — because, in its own words, "a full l×w×h box hides
     interior/back cubes in the isometric view, making 'count all the
     cubes' impossible". THAT LIMITATION IS THIS TOOL'S SUBJECT. We
     make the hidden cubes the point. So we never ask for a total.
     ⚠ Three consecutive fences missed that file, because they searched
     for primitives NESTED under the types tree, which does not exist.
     It is a SIBLING of `types/`, not a child.
     (⚠ and writing that path out literally here closes this very
     comment — a star-slash inside a block comment ends it. Bought once
     on #43 and again on the first draft of this file.)
   · `choice-board` flat-solid (K.G.A.3) + G2-242…246 own naming solids
     and counting faces/edges/vertices → THIS TOOL NAMES NO SOLID AND
     UNFOLDS NO NET. A Bauplan is a notation.
   · `patchwork-meadow` / `mosaic-menders` / `geometry-tasks.unitRect`
     own covering a grid with unit squares = AREA (3.MD.C.5/6) → we
     never count area. "How many cubes altogether" is volume, 5.MD.C,
     two bands above this platform's ceiling.
   · `graph-it` / `class-graph` / `calendar-wall` own vertical
     accumulation as 2-D columns of flat cells, and the nouns stack,
     fence, column, pile, bar with them.
   · `place-value-lab` / `base-ten.js` own the word cube while drawing
     FLAT ROUNDED SQUARES, and own the noun blocks.
   · `parking-tower-activity` is the closest visual — a side-on
     cross-section of a multi-storey structure — but it is a backdrop
     for positional language (K.G.A.1); no height is ever edited. It
     owns tower, building, skyline, floor, level.
   · `bramble-core` teaches the cousin idea — a silhouette honestly
     cannot tell you volume (K.MD.A.2) — by predict-and-pour. This is
     its spatial inversion, with zero code overlap.
   VIRGIN after subtraction: a numeral that means a HEIGHT, an elevation
   derived from a model, the plan⇄building bidirectional edit, and the
   many-buildings-one-view ambiguity. Zero hits tree-wide for bauplan,
   blueprint, elevation, front view, side view, top-down, floor plan,
   net, unfold, height map, storey, axonometric.

   ⚠ THE CURTAIN DOCTRINE, ANSWERED RATHER THAN DODGED.
   `class-graph.js:56` and `number-talk-easel` hold that "if the number
   is on screen from the start, nobody looks at the graph." This tool
   shows the numeral AND the model at once and calls that the point.
   The precedent is `place-value-lab.js:2-6`, which ships THREE
   live-linked displays with no curtain, because there the LINKAGE is
   the lesson. Same here: the numeral is not the answer to the model,
   it is the model in another notation.

   THE MOAT. Bauen nach Bauplan is a weekly K-2 staple across
   DE/NL/AT/CH and the Nordics, with printed card sets in every
   Grundschule cupboard — and CCSS codes none of it below 5.MD.C, so the
   US-built tool suites skipped it. Exactly the opening `pattern-bench`
   documents for repeating patterns.

   REFUSES, FOREVER
     1. Names no solid, unfolds no net.
     2. Never asks for a total — that is G3-346's question and 5.MD.C.
     3. Never counts area — 3.MD.C.5/6 is taken.
     4. No verdict, no score, no timer, no streak. Free-play: no
        `tasks`, therefore no educationalAlignment, therefore no code
        collision is structurally possible.
     5. No words on the apparatus (§23.2) — numerals 0-4 and the
        material. Legible with the sound off.
     6. A tap never wraps. It clamps at 0 and at HMAX.
     7. No CCSS claim. Readiness class, the `pattern-bench` precedent.

   ⭐ FIVE LAWS, MEASURED BEFORE THEY WERE GATED (and one was FALSE):
     · 5^9 = 1,953,125 buildings; full enumeration costs 9 ms, so the
       Node gate is genuinely exhaustive rather than sampled.
     · (front,side) has 5,501 distinct values: 4,792 AMBIGUOUS and 709
       DETERMINED. 99.96% of all buildings share their pair with
       another — so showing BOTH views does not collapse the teaching
       point, which was the real worry.
     · rot^4 = identity, 0 failures.
     · front(rot(h)) === REVERSE(side(h)), universally; neither-count 0.
     · ⚠ "the turn always changes what you see" is FALSE. Exactly 125
       buildings (0.0064%) are turn-invariant. The law is deleted and
       replaced by the true one; the turn stays ENABLED on those 125,
       because a turn that visibly does nothing IS the invariance idea.
       (#39: measure a law before you gate it — then fix the design or
       delete the law, never soften the threshold.)

   ⭐⭐ AND THE PAINT ORDER IS DERIVED, NOT COPIED.
   `unit-cubes.js` paints z asc / y desc / x asc, which is correct for
   the FULL BOX it ships. This building is RAGGED. Solving for the view
   direction — (dx-dy)*COS = 0 and (dx+dy)*SIN - dz = 0 with SIN = 0.5 —
   gives d = (1,1,1), so occlusion happens ONLY along that ray and
   painting in ascending (x+y+z) is provably correct for any shape.
   That is what `cubes()` returns, and the gate asserts it.
   ===================================================================== */

(function () {
  'use strict';

  /* ⭐ the projection, copied by VALUE from
     scripts/worksheet-gen/primitives/unit-cubes.js:10-14 — NOT imported
     (the recipe forbids importing across the boundary, and that module
     is CommonJS for the printable pipeline). Its `unitCubes` takes a
     SCALAR h for the whole box and cannot draw a ragged building, which
     is why only the two constants and isoPt come across. */
  var COS = 0.866, SIN = 0.5;

  var BuildPlan = {
    id: 'build-plan',

    /* ---- the model -------------------------------------------------
       State is NINE INTEGERS and nothing else. No orientation index, no
       cached projection, nothing derived is stored — so there is no
       second copy of the truth to drift. The turn rotates the heights
       themselves, which is what turning a real building does to its
       plan, and it makes rot^4 = identity a property of the state
       rather than of a counter.
       ---------------------------------------------------------------- */
    N: 3,
    HMAX: 4,

    /* ---- the arena, 1000 x 1000 --------------------------------------
       ⭐⭐ THE TWO PROFILES ARE PLACED BY GEOMETRY, NOT LABELLED.
       The design law forbids words on the apparatus, so "which one is
       the front?" has to be answered by POSITION. In this projection a
       rising row (y) travels down-LEFT and a rising column (x) travels
       down-RIGHT, so the face you meet looking from the front is the
       building's lower-left face and the side face is its lower-right.
       The front profile therefore sits at lower-LEFT and the side
       profile at lower-RIGHT, each under the face it is a shadow of.
       The first draft put them side by side in one corner and nothing
       on screen said which was which — legible only via aria-label,
       which is to say not legible at all.
       ------------------------------------------------------------------ */
    W: 1000, H: 1000,
    /* the blueprint block, top-left */
    PX: 60, PY: 100, PCELL: 148,
    /* the building, right */
    BU: 82, BOX: 740, BOY: 430,
    /* the profiles: front lower-LEFT, side lower-RIGHT, same baseline */
    VCELL: 64, VBASE: 940, FX: 140, SX: 640,

    newState: function () { return { h: [1, 1, 1, 1, 1, 1, 1, 1, 1] }; },

    /* TOTALITY. `st || newState()` is not total — it catches null and 0
       and hands [] straight through to .length (#39). */
    _st: function (st) {
      var d = this.newState(), out = [], i, v, n = this.N * this.N;
      var src = (st && typeof st === 'object' && Object.prototype.toString.call(st.h) === '[object Array]')
        ? st.h : d.h;
      for (i = 0; i < n; i++) {
        v = src[i];
        if (typeof v !== 'number' || !isFinite(v)) v = 0;
        v = Math.round(v);
        if (v < 0) v = 0;
        if (v > this.HMAX) v = this.HMAX;
        out.push(v);
      }
      return { h: out };
    },

    at: function (st, r, c) { return this._st(st).h[r * this.N + c]; },

    /* set — a REFUSAL, never a clamp, so the caller cannot mistake a
       silently-corrected value for an accepted one (#43) */
    setHeight: function (st, r, c, v) {
      var s = this._st(st), i;
      if (typeof r !== 'number' || typeof c !== 'number' || typeof v !== 'number') return null;
      if (!isFinite(r) || !isFinite(c) || !isFinite(v)) return null;
      if (r < 0 || c < 0 || r >= this.N || c >= this.N) return null;
      if (v !== Math.round(v) || v < 0 || v > this.HMAX) return null;
      i = r * this.N + c;
      if (s.h[i] === v) return null;              /* a no-op is a refusal */
      s.h[i] = v;
      return s;
    },

    /* bump is a COMPOSITION of setHeight, so there is ONE clamp rule,
       not two that must agree (#43's slideBy). It saturates at the ends
       and then refuses — it NEVER wraps (#39 shipped a +30 -> -30). */
    bump: function (st, r, c, d) {
      var s = this._st(st), v;
      if (typeof d !== 'number' || !isFinite(d)) return null;
      if (r < 0 || c < 0 || r >= this.N || c >= this.N) return null;
      v = s.h[r * this.N + c] + Math.round(d);
      if (v < 0) v = 0;
      if (v > this.HMAX) v = this.HMAX;
      return this.setHeight(s, r, c, v);
    },

    /* rotate the whole thing a quarter turn. h[r][c] -> h'[c][N-1-r] */
    rot: function (st) {
      var s = this._st(st), n = this.N, out = new Array(n * n), r, c;
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) out[c * n + (n - 1 - r)] = s.h[r * n + c];
      return { h: out };
    },

    /* the two directions. front[c] = the tallest column in that across-
       position; side[r] = the tallest in that depth-position. */
    front: function (st) {
      var s = this._st(st), n = this.N, o = [], c, r, m;
      for (c = 0; c < n; c++) { m = 0; for (r = 0; r < n; r++) if (s.h[r * n + c] > m) m = s.h[r * n + c]; o.push(m); }
      return o;
    },
    side: function (st) {
      var s = this._st(st), n = this.N, o = [], r, c, m;
      for (r = 0; r < n; r++) { m = 0; for (c = 0; c < n; c++) if (s.h[r * n + c] > m) m = s.h[r * n + c]; o.push(m); }
      return o;
    },

    /* ⭐ THE CUBES, IN PROVABLY CORRECT PAINT ORDER.
       Occlusion happens only along (1,1,1) — see the header derivation —
       so ascending (x+y+z) is correct for ANY shape, ragged included.
       The shipped primitive's z/y/x loop is correct only for a full box.
       Returns model coords; the renderer projects them. */
    cubes: function (st) {
      var s = this._st(st), n = this.N, out = [], r, c, z;
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) {
        for (z = 0; z < s.h[r * n + c]; z++) out.push({ x: c, y: r, z: z, d: c + r + z });
      }
      out.sort(function (a, b) { return a.d - b.d; });
      return out;
    },

    isoPt: function (x, y, z, u, ox, oy) {
      return { x: ox + (x - y) * COS * u, y: oy + (x + y) * SIN * u - z * u };
    },

    /* ---- the ambiguity ---------------------------------------------
       h*[r][c] = min(front[c], side[r]) is the TALLEST building with
       these two directions, and it is always a member: for any row r
       some column has front[c] >= side[r], because max(front) =
       max(side). Every other member is <= h* pointwise.

       ⭐ SO THE TEST IS EXACT AND COSTS NINE COMPARISONS:
       more than one building shares these directions  <=>  some cell of
       h* can be lowered by exactly 1 with both maxima preserved.
       (If g != h* is a member, take a cell where g < h*; lowering h*
       there by 1 stays >= g pointwise, so its maxima are still the same
       — hence such a cell exists.)
       The Node gate proves this against an exhaustive census of all
       1,953,125 buildings, using a DIFFERENT algorithm. A cheap test in
       the browser is only allowed because an expensive one checks it.
       ---------------------------------------------------------------- */
    tallest: function (f, sd) {
      var n = this.N, out = new Array(n * n), r, c;
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) out[r * n + c] = Math.min(f[c], sd[r]);
      return { h: out };
    },

    _keeps: function (st, f, sd) {
      var a = this.front(st), b = this.side(st), i;
      for (i = 0; i < this.N; i++) if (a[i] !== f[i] || b[i] !== sd[i]) return false;
      return true;
    },

    /* true when these two directions do NOT pin the building down */
    isAmbiguous: function (st) {
      var f = this.front(st), sd = this.side(st), top = this.tallest(f, sd), i, t;
      for (i = 0; i < this.N * this.N; i++) {
        if (top.h[i] === 0) continue;
        t = { h: top.h.slice() };
        t.h[i] -= 1;
        if (this._keeps(t, f, sd)) return true;
      }
      return false;
    },

    /* another building with the SAME two directions, or null when the
       directions determine it. `pick` is 0..1 and selects among the
       valid lowerings so repeated presses vary; it is a parameter and
       not Math.random so the gate can drive it. */
    another: function (st, pick) {
      var s = this._st(st), f = this.front(s), sd = this.side(s);
      var top = this.tallest(f, sd), moves = [], i, k, t, cand;
      var same = function (a, b) {
        var j; for (j = 0; j < a.h.length; j++) if (a.h[j] !== b.h[j]) return false; return true;
      };
      /* every single-cell lowering that keeps both directions */
      for (i = 0; i < this.N * this.N; i++) {
        for (k = top.h[i] - 1; k >= 0; k--) {
          t = { h: top.h.slice() };
          t.h[i] = k;
          if (this._keeps(t, f, sd)) moves.push(t);
        }
      }
      if (!moves.length) return null;                 /* determined */
      /* prefer h* itself when we are not already sitting on it — the
         tallest is the most legible contrast */
      if (!same(s, top)) return top;
      if (typeof pick !== 'number' || !isFinite(pick) || pick < 0 || pick >= 1) pick = 0;
      cand = moves[Math.floor(pick * moves.length)];
      return same(cand, s) ? moves[(Math.floor(pick * moves.length) + 1) % moves.length] : cand;
    },

    /* ---- entitlement + repertoire ---------------------------------- */
    STORE_KEY: 'lcs:build-plan:v1',
    premium: false,
    FREE_SETTINGS: 5,
    /* ⚠ an offline fallback must degrade to the FREE TIER, not to
       nothing (#38). These five are chosen by measurement, not taste:
       the baseline, the disagreement, an unmissable ambiguity, a
       DETERMINED one (where the payoff chip correctly goes dead), and a
       turn-invariant one. Every claim in this header is reachable
       without paying. */
    FALLBACK_SETS: {
      version: 1, freeCount: 5,
      sets: [
        { h: [1, 1, 1, 1, 1, 1, 1, 1, 1] },
        { h: [1, 2, 3, 1, 2, 3, 1, 2, 3] },
        { h: [0, 3, 0, 3, 3, 3, 0, 3, 0] },
        { h: [4, 4, 4, 0, 0, 0, 0, 0, 0] },
        { h: [4, 1, 4, 1, 1, 1, 4, 1, 4] }
      ]
    },

    strings: {
      title: { en: "The Blueprint" },
      instruction: { en: "Write a number in each square of the blueprint — that is how many cubes tall it is. The building follows. Turn it, and see what changes." },
      sceneLabel: { en: "A blueprint of nine squares, each with a number in it, and beside it the building those numbers make, drawn in cubes. Below the blueprint, the same building seen from the front and seen from the side." },
      hintPlan: { en: "Change a number in the blueprint and watch that part of the building rise or fall." },
      hintTurn: { en: "Turn it a quarter turn. The building is the same one — but the front becomes the side." },
      hintSame: { en: "Another building can look exactly like this from the front and from the side. Ask the class to picture one before you show it." },
      hintDetermined: { en: "This one is pinned down: no other building looks like this from both directions." },
      cellAria: { en: "blueprint square, row {r} of 3, place {c} of 3, {v} cubes tall. Drag up or down, or use the arrow keys." },
      colAria: { en: "the building, row {r} of 3, place {c} of 3, {v} cubes tall. Drag up or down, or use the arrow keys." },
      frontAria: { en: "the same building seen from the front" },
      sideAria: { en: "the same building seen from the side" },
      turnBtn: { en: "Turn a quarter" },
      sameBtn: { en: "Another one like this" },
      nextBtn: { en: "Another blueprint" },
      printBtn: { en: "Print the blueprints" },
      gateTitle: { en: "More blueprints" },
      gateBody: { en: "Eleven more, ordered so each one surprises after the last, and the sheet to print: empty blueprints with the squares ruled and no numbers, to fill in by hand." },
      gateCta: { en: "See the Teacher plan" }
    },

    /* ---- lifecycle -------------------------------------------------- */
    init: function (api) {
      this.api = api;
      injectBuildPlanCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.st = this.newState();
      this._idx = -1;
      this._book = this.FALLBACK_SETS;
      this._fetchEntitlement();
      this._loadBook();
    },

    /* ⚠ the shell calls render() with NO ARGUMENTS (lcs-shell.js:959)
       and re-calls it on resize. Taking an `api` parameter here wipes
       this.api on the second call — #43 shipped that once. */
    render: function () {
      if (!this.api) return;
      this._build();
      this._paint();
    },

    /* ⚠ the shell DRAWS a Reset button and calls tool.reset() if the
       tool provides one (lcs-shell.js:531). Omit it and the button is
       dead on every path — #43 shipped that too. */
    reset: function () {
      this.st = this.newState();
      this._idx = -1;
      if (this._wrap) this._paint();
    },

    /* =================================================================
       THE RENDER HALF
       -----------------------------------------------------------------
       ⚠ ONE SQUARE ARENA, ONE COORDINATE SYSTEM. #43 shipped a defect
       by capping one dimension of an aspect-ratio box: the SVG
       letterboxed and every HTML control drifted off the thing it
       drove, so each mark drew as TWO circles. Here the arena is
       1000x1000, `aspect-ratio:1/1` with the cap on the WIDTH, and the
       18 hit-targets are positioned in % of that square from the SAME
       expressions that draw what they sit on.
       ================================================================= */
    _svg: function (n, a) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', n), k;
      if (a) for (k in a) if (Object.prototype.hasOwnProperty.call(a, k)) e.setAttribute(k, a[k]);
      return e;
    },

    /* the centre of blueprint cell (r,c), in model units */
    cellXY: function (r, c) {
      return { x: this.PX + (c + 0.5) * this.PCELL, y: this.PY + (r + 0.5) * this.PCELL };
    },

    /* the centre of the TOP FACE of column (r,c) — where the building's
       hit-target sits, so it tracks the height it drives */
    topXY: function (st, r, c) {
      var z = this.at(st, r, c);
      var p = this.isoPt(c + 0.5, r + 0.5, z, this.BU, this.BOX, this.BOY);
      return p;
    },

    _build: function () {
      var api = this.api, self = this, r, c, i;
      var wrap = api.el('div', 'bpl-wrap');
      this._wrap = wrap;

      var bench = api.el('div', 'bpl-bench');
      this._bench = bench;
      var svg = this._svg('svg', {
        viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'bpl-svg',
        preserveAspectRatio: 'xMidYMid meet'
      });
      this._svgRoot = svg;

      /* ---- the blueprint: nine ruled squares, nine numerals -------- */
      this._numEl = [];
      var gp = this._svg('g', { 'class': 'bpl-plan' });
      for (r = 0; r < this.N; r++) for (c = 0; c < this.N; c++) {
        gp.appendChild(this._svg('rect', {
          x: this.PX + c * this.PCELL, y: this.PY + r * this.PCELL,
          width: this.PCELL, height: this.PCELL, 'class': 'bpl-cell'
        }));
        var t = this._svg('text', {
          x: this.cellXY(r, c).x, y: this.cellXY(r, c).y,
          'text-anchor': 'middle', 'dominant-baseline': 'central', 'class': 'bpl-num'
        });
        gp.appendChild(t);
        this._numEl.push(t);
      }
      svg.appendChild(gp);

      /* ---- the two directions -------------------------------------- */
      this._vFront = this._svg('g', { 'class': 'bpl-view bpl-front' });
      this._vSide = this._svg('g', { 'class': 'bpl-view bpl-side' });
      svg.appendChild(this._vFront);
      svg.appendChild(this._vSide);

      /* ---- the building -------------------------------------------- */
      this._gBuild = this._svg('g', { 'class': 'bpl-build' });
      svg.appendChild(this._gBuild);

      bench.appendChild(svg);

      /* ---- 18 hit-targets, real buttons ----------------------------
         ⚠ A DRAG-ONLY TARGET IS DEAD to a keyboard, to assistive tech
         and to the liveness gate — a synthetic .click() never fires
         pointerdown (#41). Every one of these is a real <button>: it
         drags, it clicks, and it takes ArrowUp/ArrowDown.
         ⚠ They are CANVAS cells, not chrome controls, so the floor
         that applies is 34px, not 44px — the two floors are asserted
         separately in local-test, never with an or-shaped assertion. */
      this._hPlan = []; this._hCol = [];
      for (i = 0; i < this.N * this.N; i++) {
        this._hPlan.push(this._hit(bench, 'bpl-h-plan', i));
        this._hCol.push(this._hit(bench, 'bpl-h-col', i));
      }

      wrap.appendChild(bench);

      this._hint = api.el('div', 'bpl-hint');
      wrap.appendChild(this._hint);

      var foot = api.el('div', 'bpl-foot');
      this._chipTurn = this._chip(foot, '', function () {
        self.st = self.rot(self.st); self._paint();
      });
      this._chipSame = this._chip(foot, '', function () {
        var o = self.another(self.st, Math.random());
        if (o) { self.st = o; self._paint(); }
      });
      this._chipNext = this._chip(foot, '', function () { self._next(); });
      this._chipPrint = this._chip(foot, 'bpl-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        try { window.print(); } catch (e) { /* no printer in a headless gate */ }
      });
      wrap.appendChild(foot);

      this._sheetEl = api.el('div', 'bpl-sheet');
      wrap.appendChild(this._sheetEl);

      if (!this._wired) { this._wireDrags(); this._wired = true; }
      api.stage.appendChild(wrap);
    },

    _chip: function (foot, cls, fn) {
      var b = this.api.el('button', 'bpl-chip' + (cls ? ' ' + cls : ''));
      b.type = 'button';
      b.addEventListener('click', function (ev) { ev.preventDefault(); fn(); });
      foot.appendChild(b);
      return b;
    },

    _hit: function (bench, cls, i) {
      var b = this.api.el('button', 'bpl-hit ' + cls);
      b.type = 'button';
      b.setAttribute('data-i', String(i));
      bench.appendChild(b);
      return b;
    },

    /* ---- pointer + keyboard, one code path per end ----------------
       ⚠ LCS.drag.linear is valueFromPointer(clientX, rect) — clientX
       ONLY — so a vertical drag is hand-rolled, as #42's and #43's
       were. Bind to `window`, because pointer capture is released the
       moment a repaint removes the captured element (#40).
       ---------------------------------------------------------------- */
    _wireDrags: function () {
      var self = this;
      var drag = null;

      var begin = function (btn, ev) {
        var i = Number(btn.getAttribute('data-i'));
        drag = { i: i, y0: ev.clientY, h0: self.at(self.st, Math.floor(i / self.N), i % self.N), moved: false };
        try { btn.setPointerCapture && btn.setPointerCapture(ev.pointerId); } catch (e) { /* not fatal */ }
      };
      var move = function (ev) {
        if (!drag) return;
        var bb = self._bench.getBoundingClientRect();
        if (!bb.height) return;
        /* one blueprint unit per (arena height / 9) of travel — up is
           taller, which is the only direction that reads */
        var step = bb.height / 9;
        var d = Math.round((drag.y0 - ev.clientY) / step);
        var v = drag.h0 + d;
        if (v < 0) v = 0;
        if (v > self.HMAX) v = self.HMAX;
        var r = Math.floor(drag.i / self.N), c = drag.i % self.N;
        if (v !== self.at(self.st, r, c)) {
          var n = self.setHeight(self.st, r, c, v);
          if (n) { self.st = n; drag.moved = true; self._paint(); }
        }
        ev.preventDefault();
      };
      var end = function () { drag = null; };

      var attach = function (btn) {
        btn.addEventListener('pointerdown', function (ev) { begin(btn, ev); ev.preventDefault(); });
        /* ⭐ CLICK, TOO — a tap adds one and CLAMPS at HMAX. It never
           wraps: #39 shipped a tap that went +30 -> -30, sixty units
           from one touch. A drag that moved suppresses the click. */
        btn.addEventListener('click', function (ev) {
          ev.preventDefault();
          if (drag && drag.moved) return;
          var i = Number(btn.getAttribute('data-i'));
          var r = Math.floor(i / self.N), c = i % self.N;
          var n = self.bump(self.st, r, c, 1);
          if (n) { self.st = n; self._paint(); }
        });
        btn.addEventListener('keydown', function (ev) {
          var k = ev.key, d = 0;
          if (k === 'ArrowUp' || k === 'ArrowRight' || k === '+') d = 1;
          else if (k === 'ArrowDown' || k === 'ArrowLeft' || k === '-') d = -1;
          else return;
          ev.preventDefault();
          var i = Number(btn.getAttribute('data-i'));
          var n = self.bump(self.st, Math.floor(i / self.N), i % self.N, d);
          if (n) { self.st = n; self._paint(); }
        });
      };
      var j;
      for (j = 0; j < this._hPlan.length; j++) attach(this._hPlan[j]);
      for (j = 0; j < this._hCol.length; j++) attach(this._hCol[j]);

      /* ⚠ ONE listener pair on window, added ONCE — #43 leaked a pair
         per render until it was caught. `_wired` guards re-entry. */
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    },

    _loadStore: function () {
      try {
        var raw = window.localStorage.getItem(this.STORE_KEY);
        var j = raw ? JSON.parse(raw) : null;
        return (j && typeof j === 'object') ? j : {};
      } catch (e) { return {}; }
    },
    _saveStore: function () {
      try { window.localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store || {})); } catch (e) { /* private mode */ }
    },

    /* ⚠ UNKNOWN ENTITLEMENT MUST BE PESSIMISTIC. No `&& premiumKnown`
       on a control gate — an unknown tier is a free tier until proven
       otherwise, or the paid repertoire leaks on a slow network. */
    _fetchEntitlement: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/api/quota/status', { credentials: 'include', cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j) return;
          var tier = j.tier || (j.entitlement && j.entitlement.tier);
          if (!tier) return;
          self.premium = tier !== 'free';
          self._store.ent = { tier: tier };
          self._saveStore();
          if (self._wrap) self._paint();
        })
        .catch(function () { /* stays pessimistic */ });
    },

    _loadBook: function () {
      var self = this;
      if (typeof fetch !== 'function') return;
      fetch('/mini-tools/build-plan-sets.json', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) {
          if (!j || !j.sets || !j.sets.length) return;
          self._book = j;
          if (typeof j.freeCount === 'number') self.FREE_SETTINGS = j.freeCount;
          if (self._wrap) self._paint();
        })
        .catch(function () { /* the fallback is already live */ });
    },

    _sets: function () {
      var all = (this._book && this._book.sets) || this.FALLBACK_SETS.sets;
      var out = [], i;
      for (i = 0; i < all.length; i++) if (i < this.FREE_SETTINGS || this.premium) out.push(all[i]);
      return out;
    },

    _next: function () {
      var list = this._sets();
      if (!list.length) return;
      /* ⚠ start at -1 so the FIRST press serves sets[0]; #43 shipped a
         _next() that skipped its own first setting. */
      this._idx = ((typeof this._idx === 'number' ? this._idx : -1) + 1) % list.length;
      this.st = this._st({ h: list[this._idx].h });
      this._paint();
      if (!this.premium && this._idx === 0) this._showGate();
    },

    /* =================================================================
       _paint — everything on screen is recomputed from the nine
       integers. Nothing is incrementally patched, so no partial state
       can survive a turn.
       ================================================================= */
    _paint: function () {
      var api = this.api, s = this._st(this.st), self = this;
      var n = this.N, r, c, i, k;
      if (!this._wrap) return;

      /* ---- the numerals ------------------------------------------- */
      for (i = 0; i < n * n; i++) this._numEl[i].textContent = String(s.h[i]);

      /* ---- the building, in derived paint order -------------------- */
      while (this._gBuild.firstChild) this._gBuild.removeChild(this._gBuild.firstChild);
      var list = this.cubes(s), u = this.BU;
      for (k = 0; k < list.length; k++) {
        var q = list[k];
        var P = function (a, b, cc) {
          var p = self.isoPt(a, b, cc, u, self.BOX, self.BOY);
          return p.x.toFixed(2) + ',' + p.y.toFixed(2);
        };
        /* three faces per cube, exactly as the shipped primitive draws
           them: top, then the two sides. Each carries data-cube so the
           gate can count them per column off the RENDER. */
        this._gBuild.appendChild(this._svg('polygon', {
          points: P(q.x, q.y, q.z + 1) + ' ' + P(q.x + 1, q.y, q.z + 1) + ' ' + P(q.x + 1, q.y + 1, q.z + 1) + ' ' + P(q.x, q.y + 1, q.z + 1),
          'class': 'bpl-f bpl-f-top', 'data-cube': '1', 'data-col': (q.y * n + q.x), 'data-z': q.z
        }));
        this._gBuild.appendChild(this._svg('polygon', {
          points: P(q.x, q.y + 1, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z + 1) + ' ' + P(q.x, q.y + 1, q.z + 1),
          'class': 'bpl-f bpl-f-l'
        }));
        this._gBuild.appendChild(this._svg('polygon', {
          points: P(q.x + 1, q.y, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z) + ' ' + P(q.x + 1, q.y + 1, q.z + 1) + ' ' + P(q.x + 1, q.y, q.z + 1),
          'class': 'bpl-f bpl-f-r'
        }));
      }

      /* ---- the two directions, drawn as filled profiles ------------
         Each is three columns of unit squares; the height of column i
         is the projection. The gate measures the RENDER, not the model
         (#43: a gate that reads the model asks the tool to confirm
         itself). */
      var drawView = function (g, vals, x0, y0, cls) {
        while (g.firstChild) g.removeChild(g.firstChild);
        var w = self.VCELL, j, z;
        for (j = 0; j < vals.length; j++) {
          for (z = 0; z < vals[j]; z++) {
            g.appendChild(self._svg('rect', {
              x: x0 + j * w, y: y0 - (z + 1) * w, width: w, height: w,
              'class': 'bpl-vc', 'data-view': cls, 'data-col': j
            }));
          }
          /* the baseline tick keeps an empty column visible, so a zero
             reads as a zero rather than as a missing panel */
          g.appendChild(self._svg('rect', {
            x: x0 + j * w, y: y0, width: w, height: 6, 'class': 'bpl-vbase'
          }));
        }
      };
      /* front under the building's lower-LEFT face, side under its
         lower-RIGHT — position is what says which is which */
      drawView(this._vFront, this.front(s), this.FX, this.VBASE, 'front');
      drawView(this._vSide, this.side(s), this.SX, this.VBASE, 'side');
      this._vFront.setAttribute('aria-label', api.t('frontAria'));
      this._vSide.setAttribute('aria-label', api.t('sideAria'));

      /* ---- the 18 hit-targets ------------------------------------- */
      var place = function (el, mx, my, label) {
        el.style.left = (mx / self.W * 100) + '%';
        el.style.top = (my / self.H * 100) + '%';
        el.setAttribute('aria-label', label);
      };
      var fill = function (tpl, rr, cc, vv) {
        return String(tpl).replace('{r}', rr + 1).replace('{c}', cc + 1).replace('{v}', vv);
      };
      for (r = 0; r < n; r++) for (c = 0; c < n; c++) {
        i = r * n + c;
        var p1 = this.cellXY(r, c);
        place(this._hPlan[i], p1.x, p1.y, fill(api.t('cellAria'), r, c, s.h[i]));
        var p2 = this.topXY(s, r, c);
        place(this._hCol[i], p2.x, p2.y, fill(api.t('colAria'), r, c, s.h[i]));
      }

      this._bench.setAttribute('aria-label', api.t('sceneLabel'));

      /* ---- the chips ---------------------------------------------- */
      this._chipTurn.textContent = api.t('turnBtn');
      this._chipSame.textContent = api.t('sameBtn');
      this._chipNext.textContent = api.t('nextBtn');
      this._chipPrint.textContent = api.t('printBtn');

      /* ⭐ THE PAYOFF CHIP GOES DEAD ON EXACTLY THE 709 DETERMINED
         PAIRS — disabled, never a silent no-op (#39's numeral strip
         that "acted" by highlighting itself). The nine-comparison test
         is exact; the Node gate proves it against a full census. */
      var amb = this.isAmbiguous(s);
      this._chipSame.disabled = !amb;

      /* ---- the hint ------------------------------------------------
         ⚠ IN-VIEW BEFORE EQUALITY. #43 shipped a hint that fired with
         zero handles on screen because the dispatch tested equality
         first. Here the DETERMINED case is tested before the invitation
         to look for another, or the tool invites something impossible. */
      var flat = true;
      for (i = 1; i < n * n; i++) if (s.h[i] !== s.h[0]) { flat = false; break; }
      this._hint.textContent = !amb ? api.t('hintDetermined')
        : flat ? api.t('hintPlan')
          : api.t('hintSame');

      /* keep the two-node gate line honest: the wrap always carries the
         entitlement class so CSS cannot disagree with the model */
      this._wrap.className = 'bpl-wrap' + (this.premium ? ' bpl-paid' : '');
    },

    /* ---- the print sheet -------------------------------------------
       ⚠ #40 and #41 each shipped a Print chip calling window.print()
       with NO @media print block at all, so they printed the whole web
       page — and the generic liveness gate scores that green, because
       window.print fires either way. `audit-tool-print-sheets.js` is
       the gate that catches it.
       The sheet is EMPTY blueprints: ruled squares, no numerals, for a
       child to fill in by hand. It is the paid artefact.
       ---------------------------------------------------------------- */
    _buildSheet: function () {
      var i, r, c, self = this;
      while (this._sheetEl.firstChild) this._sheetEl.removeChild(this._sheetEl.firstChild);
      for (i = 0; i < 6; i++) {
        var svg = this._svg('svg', { viewBox: '0 0 420 420', 'class': 'bpl-sheet-svg' });
        for (r = 0; r < this.N; r++) for (c = 0; c < this.N; c++) {
          svg.appendChild(this._svg('rect', {
            x: 30 + c * 120, y: 30 + r * 120, width: 120, height: 120, 'class': 'bpl-p-cell'
          }));
        }
        this._sheetEl.appendChild(svg);
      }
    },

    _showGate: function () {
      var api = this.api;
      if (!this._wrap || this._wrap.querySelector('.bpl-gate')) return;
      var g = api.el('div', 'bpl-gate');
      var h = api.el('div', ''); h.textContent = api.t('gateTitle');
      var p = api.el('div', ''); p.textContent = api.t('gateBody');
      var a = api.el('a', ''); a.href = '/pricing'; a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    }
  };

  if (typeof window !== 'undefined') window.BuildPlan = BuildPlan;
  if (typeof module !== 'undefined' && module.exports) module.exports = BuildPlan;

  /* =====================================================================
     CSS. Direction A tokens, `bpl-` prefix, injected once.
     ⚠ NO `vh` anywhere — it measures the WINDOW, not the iframe.
     ⚠ NO inline `background` shorthand.
     ⚠ NO `font:` shorthand — an unquoted `Baloo 2` inside one makes the
       whole declaration invalid and it is dropped silently, which took a
       clamp() floor with it on #42. Longhand cannot fail that way.
     ===================================================================== */
  function injectBuildPlanCSS() {
    if (typeof document === 'undefined' || document.getElementById('bpl-style')) return;
    var s = document.createElement('style');
    s.id = 'bpl-style';
    s.textContent = ''
      + '.bpl-wrap{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;width:100%;}'
      /* ⚠⚠ THE CAP IS ON THE WIDTH AND THE ARENA STAYS SQUARE. Capping
         the HEIGHT of an aspect-ratio:1/1 box yields a RECTANGLE; the
         SVG then letterboxes and every %-positioned control drifts off
         what it drives. #43 shipped exactly that, and each of its marks
         drew as two circles. The gate asserts the aspect. */
      + '.bpl-bench{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;'
      + 'margin:0 auto;border-radius:18px;background:#FBF3E4;'
      + 'border:2px solid rgba(20,107,94,.18);}'
      + '.bpl-svg{display:block;width:100%;height:100%;}'

      /* the blueprint */
      + '.bpl-cell{fill:#FFFDF7;stroke:#146B5E;stroke-width:5;}'
      + '.bpl-num{fill:#0F4A40;font-family:"Baloo 2",Nunito,sans-serif;font-weight:800;font-size:62px;}'

      /* the building */
      + '.bpl-f{stroke:#0F4A40;stroke-width:3;stroke-linejoin:round;}'
      + '.bpl-f-top{fill:#F2784B;}'
      + '.bpl-f-l{fill:#C8613A;}'
      + '.bpl-f-r{fill:#E26C42;}'

      /* the two directions — a flat profile, deliberately NOT the same
         colour family as the building, so a child reads them as a
         SHADOW of it rather than as more cubes */
      + '.bpl-vc{fill:#3C6E63;stroke:#0F4A40;stroke-width:2;}'
      + '.bpl-vbase{fill:#0F4A40;}'

      /* the 18 hit-targets. Sized as a % of the square arena so they
         scale with it; the CANVAS floor (34px) is what applies, and
         local-test measures it separately from the 44px CONTROL floor. */
      + '.bpl-hit{position:absolute;padding:0;border:0;background-color:transparent;'
      + 'cursor:ns-resize;touch-action:none;border-radius:12px;}'
      /* ⚠ SIZED AGAINST THE 34px CANVAS FLOOR AT THE NARROWEST VIEWPORT,
         not by eye. At a 320px page the arena is 296px, so 1% is 2.96px
         and a target needs >= 11.5% to clear 34px. The first draft had
         the building columns at 11% = 32.6px — UNDER the floor, and it
         would have passed any check that only measured the chips. Both
         are set from the thing they cover: the blueprint cell is 14.8%
         of the arena, a cube's top face about 14%. */
      + '.bpl-h-plan{width:14%;height:14%;margin:-7% 0 0 -7%;}'
      + '.bpl-h-col{width:13%;height:13%;margin:-6.5% 0 0 -6.5%;}'
      + '.bpl-hit:focus-visible{outline:3px solid #146B5E;outline-offset:-2px;}'

      + '.bpl-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;'
      + 'font-size:15px;line-height:1.45;color:#3C6E63;margin:2px auto 0;max-width:620px;}'
      + '.bpl-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:660px;}'
      + '.bpl-chip{font-family:Nunito,sans-serif;font-weight:600;'
      + 'font-size:clamp(.9rem,3.2vw,1.02rem);line-height:1.1;padding:11px 18px;'
      + 'min-height:44px;border-radius:999px;border:2px solid #146B5E;color:#146B5E;'
      + 'background-color:#FFFDF7;cursor:pointer;}'
      + '.bpl-chip:first-child{background-color:#F2784B;border-color:#F2784B;color:#fff;}'
      + '.bpl-chip.bpl-lock{border-color:#C8613A;color:#C8613A;background-color:transparent;}'
      + '.bpl-chip[disabled]{opacity:.45;cursor:default;}'

      + '.bpl-gate{flex-basis:100%;max-width:560px;margin:6px auto 0;padding:14px 16px;'
      + 'border-radius:16px;background-color:#FFF3EA;border:2px dashed #C8613A;'
      + 'font-family:Nunito,sans-serif;color:#8A3F1E;text-align:center;}'
      + '.bpl-gate a{display:inline-block;margin-top:8px;color:#C8613A;font-weight:700;}'

      /* the sheet is print-only */
      + '.bpl-sheet{display:none;}'
      + '.bpl-sheet-svg{width:46%;margin:2%;}'
      + '.bpl-p-cell{fill:none;stroke:#000;stroke-width:3;}'

      + '@media print{'
      + '*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
      + '.bpl-bench,.bpl-foot,.bpl-hint,.bpl-gate,.lcs-header,.lcs-bar{display:none !important;}'
      + '.bpl-sheet{display:flex !important;flex-wrap:wrap;}'
      + '}';
    document.head.appendChild(s);
  }
}());
