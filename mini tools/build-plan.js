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

    W: 1000, H: 1000,
    /* the blueprint block */
    PX: 60, PY: 92, PCELL: 128,
    /* the two direction panels */
    VX: 60, VY: 596, VCELL: 62,
    /* the building */
    BU: 74, BOX: 726, BOY: 556,

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

  function injectBuildPlanCSS() {
    if (typeof document === 'undefined' || document.getElementById('bpl-style')) return;
    var s = document.createElement('style');
    s.id = 'bpl-style';
    s.textContent = ''; /* filled by the render half, appended below */
    document.head.appendChild(s);
  }
}());
