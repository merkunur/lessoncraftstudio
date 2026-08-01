/* =====================================================================
   TOOL #42 — THE PLANKS   (comparison-planks.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #7. Catalog slot A5, wave 2.

   THE PLANKS · THE BRACKET · THE OFFCUT. Three named parts, and nothing
   else in this tool gets a noun.
   ⚠ NOT "the tape" (#40 owns THE TAPES), NOT "the strand" (#41 owns
   THE STRAND), and NOT "the bar" — measured across all 44 tools' names
   and taglines, `bar`, `beam` (so Balkenmodell's own noun), `strip`,
   `tape` and `strand` are each another tool's identity. `plank`,
   `offcut` and `bracket` are free. A colliding noun is a collision even
   when the geometry differs.

   THE ROUTINE:
     "Make this one 8 and that one 16. Where do they stop being the same?"
      ... and then the move that matters:
     "Take the extra bit off, and put it on the short one."

   THE ONE THESIS — THE DIFFERENCE IS NOT A NUMBER YOU WORK OUT. IT IS A
   PIECE OF THE LONGER PLANK, AND IT IS EXACTLY THE PIECE THE SHORTER
   PLANK WAS MISSING. Its relation to its two siblings, which is why the
   three belong on one shelf: in #40 the object held still and the number
   moved; in #41 everything moved and the number held still; HERE THE
   CHILD SETS BOTH NUMBERS AND THE TOOL ANSWERS WITH A THIRD QUANTITY IT
   REFUSES TO NUMBER.

   THREE INVENTIONS:
     1. ⭐ THE DIFFERENCE BECOMES AN OBJECT. Nothing anywhere in this repo
        takes a sub-region of a rendered magnitude and promotes it to an
        independent, positionable thing. Zero prior art.
     2. A PLANK'S OWN LENGTH IS THE DRAGGABLE THING. Every other bar in
        this repo is width-from-data (`len/MAXLEN`, `v/20`, `flexGrow`).
        `ruler.js` drags the ENDPOINTS of a measuring span; #40 drags a
        repeated UNIT's size. Nobody grabs a quantity and makes the
        quantity itself bigger.
     3. THE PAYOFF IS EXACT BY CONSTRUCTION. Seated, the composite's
        right edge and the longer plank's right edge are not two numbers
        that agree — they are ONE EXPRESSION EVALUATED TWICE.

   ⚠ THE FENCE — FOUR SURFACES, RUN FRESH, AND IT CAME BACK **NOT CLEAN**.
   Per §23.3 the overlap is SUBTRACTED, not negotiated:
     TAKEN — CCSS 2.MD.A.4 is owned outright by `span-length-gap`
       (`length-gap-core.js:19` `answerValue = aLen − bLen`; the child
       TYPES it on a keypad; the difference is revealed as a SENTENCE).
       ⚠ AND #40 FORMALLY CEDES IT IN WRITING — `unit-handle.js:78`:
       "NO 'which is longer'. 2.MD.A.4 belongs to span-length-gap."
       Two static proportional bars already ship THREE times
       (`span-length-gap-activity.js:82`, `bram-board-shop-activity.js:166`,
       `vet-diagnosis-activity.js:187`), every width FROM DATA.
       ⭐ AND THE WRITTEN EQUATION IS ALREADY SHIPPED —
       `bram-board-shop-activity.js:208` emits
       `smaller + difference = bigger` into a recap box. THE PLATFORM CAN
       STATE THE IDENTITY AND HAS NEVER SHOWN IT. That gap is this tool.
       `part-whole-frame.js` (#27) + `number-bond-core.js` own part-whole,
       and the repo's only braces are VERTICAL bonds under a whole.
     REMAINDER, measured virgin — a plank whose length the child sets;
       two independently stretchable planks in one frame; a bracket over
       an OVERHANG; and the detach.
     ⭐ AN INVERSION WORTH NAMING: in this repo an overhang is currently
       an ERROR VERDICT — `lay-units-core.js:57` returns
       `{status:'overhang'}` when units are laid past the end. HERE THE
       OVERHANG IS THE PAYLOAD.

   ⚠ THE CATALOG'S A5 SPEC DOES NOT SURVIVE CONTACT, TWICE:
     "all ordered pairs in 1..40²" — at N=40 the scale is k=22.5, so on
       the MEASURED 296px bench at a 320px viewport one unit is 6.66px:
       a one-unit bracket would be 6.66px wide with 3px ticks at each
       end, i.e. 0.66px of rail, shorter than its own stroke. The band is
       DERIVED from a legibility floor instead — see N_MAX below.
     "the difference bar IS a real DOM copy of the overhang region" —
       a copy has to be PROVED equal to its origin. This tool RE-PARENTS
       one node, so `node === node` across the whole round trip. That is
       strictly stronger, and it is why there is no spawn frame.

   REFUSES, FOREVER — each one gated:
     1. NEVER ASKS, NEVER TAKES AN ANSWER. No question, no keypad, no
        input, no `?`. The tool SHOWS; it never ASKS.
     2. NEVER PRINTS THE THIRD NUMBER. Exactly two numerals on stage, in
        every state. The third number is the one the class says aloud.
     3. NEVER WRITES THE SENTENCE. No `+`, `=`, `−`, `↔`, `Δ` anywhere.
     4. NEVER SPLITS ONE PLANK INTO PARTS. The offcut is a DIFFERENCE.
     5. NO UNITS, NO TICKS, NO TILING. The planks are smooth magnitudes.
     6. NO VERDICT, and nothing appears because something is right.
     7. THE PLANK YOU ARE NOT TOUCHING DOES NOT FLINCH.
     8. NO COMMITTED PRIOR ESTIMATE — the offcut lands flush BY
        CONSTRUCTION, so a "guess where it reaches" marker would have
        exactly one right answer and the landing would become a reveal
        with a verdict. #41 owns the flag. The prediction here is verbal
        and the teacher's.
     And standing: no score, no timer, no streak, no speech.

   0 lines to lcs-shell.{js,css} or any protected core.
   ===================================================================== */

(function () {
  'use strict';

  var ComparisonPlanks = {
    id: 'comparison-planks',

    /* ---------------------------------------------------------------
       STRINGS — GENERATED. EN is authored; the other ten are REBUILT
       (not translated) by a three-person NATIVE panel per locale,
       §A.13.48. ⚠ DO NOT HAND-EDIT A LOCALE HERE. SoT is
       scripts/_comparison-planks-strings.js.

       ⚠ AND NO STRING MAY NAME A UNIT, nor carry a digit, nor name the
       difference. `ruler.js` owns standard units; #40 owns "how many
       units fit"; `span-length-gap` owns "how much longer".
       --------------------------------------------------------------- */
    strings: {
      title: { en: "The Planks" },
      instruction: { en: "Two planks start from the same line. Make them different lengths, then take the extra piece off the longer one and put it on the shorter one." },
      benchLabel: { en: "Two planks starting from one line, a bracket over the piece that sticks out, and that piece ready to be carried" },
      hintSet: { en: "Drag the end of each plank to make it longer or shorter." },
      hintTake: { en: "One plank sticks out. Drag the bracket downwards to take that piece off." },
      hintCarry: { en: "Now carry the piece to the end of the shorter plank." },
      hintSeated: { en: "The short plank and the piece together reach exactly as far as the long one." },
      takeBtn: { en: "Take the piece off" },
      putBackBtn: { en: "Put the piece back" },
      nextBtn: { en: "Another pair" },
      printBtn: { en: "Print the sheet" },
      plankAAria: { en: "Make the top plank longer or shorter" },
      plankBAria: { en: "Make the bottom plank longer or shorter" },
      offcutAria: { en: "Carry the piece that sticks out" },
      gateTitle: { en: "More pairs" },
      gateBody: { en: "Eleven more pairs, ordered so each one surprises after the last, and the sheet to print for paper." },
      gateCta: { en: "See the Teacher plan" }
    },

    STORE_KEY: 'lcs:comparison-planks:v1',
    ENT_TRUST_DAYS: 14,

    /* ---- the stage, in model units ----------------------------------
       ⚠ EVERY ONE OF THESE IS AN INTEGER, AND `K` IS AN INTEGER BY
       CONSTRUCTION — which is what makes the payoff exact rather than
       approximate. `K * v` for v ≤ 16 is at most 960, far inside the
       exactly-representable range, and no rendered attribute can carry a
       decimal point. That is a gated property, not a hope.

       ⚠ N_MAX IS DERIVED, NOT QUOTED. The bench MEASURES 296px at a
       320px viewport (the narrowest supported). A bracket's rail must
       clear its own ticks: 2*stroke(3) + tick(8) = 14px. At N=16,
       k=60 → one unit is 17.76px, +27% over the floor. At the catalog's
       N=40 it is 6.66px — half the floor. Neither the stroke nor the
       tick may shrink to make a bigger band fit. */
    W: 1000,
    H: 372,
    X0: 30,             /* the START LINE — both planks grow from here   */
    RIGHT: 990,         /* the far edge of the longest possible plank    */
    N_MAX: 16,
    K: 60,              /* model units per value unit; (990-30)/16       */
    BAR_H: 62,
    A_Y: 76,            /* top of plank A                                */
    B_Y: 200,           /* top of plank B                                */
    CARRY_Y: 292,       /* at or below this top-y, the offcut is FREE    */
    FLOOR_Y: 302,       /* the lowest the offcut may be carried          */
    RULE_TOP: 46,
    RULE_BOT: 292,

    premium: false,
    premiumKnown: false,

    /* =================================================================
       THE STATE — five fields, total, pure, immutable.

       ⚠ THE DIFFERENCE IS NOT STORED. `diffOf` derives it on every read.
       A stored difference is a second source of truth that drifts away
       from a,b without anyone noticing, and every mutation that tries to
       introduce one is killed by a field-set assertion.
       ⚠ NOR IS "WHICH IS LONGER" STORED. `roleOf` is THREE-VALUED and
       returns null at a === b — a boolean `aIsLonger = a >= b` silently
       elects A at equality and then hangs a zero-width offcut off B.
       ================================================================= */
    PHASES: { attached: 1, lifting: 1, free: 1, laid: 1 },

    newState: function () {
      return { a: 5, b: 9, phase: 'attached', dx: 0, dy: 0 };
    },

    _int: function (v, dflt) {
      if (typeof v !== 'number' || !isFinite(v)) return dflt;   /* isFinite FIRST — Math.round(NaN) is NaN */
      return Math.min(this.N_MAX, Math.max(1, Math.round(v)));
    },
    _num: function (v, dflt) {
      return (typeof v === 'number' && isFinite(v)) ? Math.round(v) : dflt;
    },

    /* ⚠ TOTAL MEANS TOTAL. `st || newState()` catches null and 0 and
       hands `{}` and `[]` straight through to a property read — this
       validates FIELDS, not truthiness. And an impossible phase is
       REPAIRED, not carried: {a:3,b:3,phase:'free'} describes an offcut
       of zero width. */
    _st: function (st) {
      if (st === null || typeof st !== 'object') return this.newState();
      var a = this._int(st.a, 5), b = this._int(st.b, 9);
      var phase = this.PHASES[st.phase] ? st.phase : 'attached';
      if (a === b) phase = 'attached';
      var dx = this._num(st.dx, 0), dy = this._num(st.dy, 0);
      /* canonical representations — this is what makes the round-trip
         assertable at all, rather than only assertable on 3 of 5 fields */
      if (phase === 'attached') { dx = 0; dy = 0; }
      if (phase === 'laid') { dx = this.X0 + this.K * Math.min(a, b); dy = this.shortRowY(a, b); }
      return { a: a, b: b, phase: phase, dx: dx, dy: dy };
    },

    diffOf: function (st) { var s = this._st(st); return Math.abs(s.a - s.b); },
    /* three-valued on purpose */
    roleOf: function (st) {
      var s = this._st(st);
      if (s.a === s.b) return null;
      return s.a > s.b ? 'a' : 'b';
    },
    longRowY: function (a, b) { return a > b ? this.A_Y : this.B_Y; },
    shortRowY: function (a, b) { return a > b ? this.B_Y : this.A_Y; },
    homeY: function (st) { var s = this._st(st); return this.longRowY(s.a, s.b); },

    /* ---- the reducers. null is a REFUSAL, never a fake success ------ */

    setLen: function (st, which, v) {
      var s = this._st(st);
      if (which !== 'a' && which !== 'b') return null;
      /* ⭐ frozen while the offcut is out — a detached piece must never
         become a stale lie about a difference that has since changed.
         Refusal in the MODEL, never a `disabled` attribute (§23.6). */
      if (s.phase !== 'attached') return null;
      if (typeof v !== 'number' || !isFinite(v)) return null;
      var n = Math.round(v);
      /* REFUSES out of band; it does not clamp. The drag handler clamps
         the pointer→value conversion; these are two different jobs. */
      if (n < 1 || n > this.N_MAX) return null;
      if (n === s[which]) return null;
      s[which] = n;
      if (s.a === s.b) { s.phase = 'attached'; s.dx = 0; s.dy = 0; }
      return s;
    },

    beginLift: function (st) {
      var s = this._st(st);
      if (s.phase !== 'attached') return null;
      if (s.a === s.b) return null;            /* there is no overhang */
      s.phase = 'lifting';
      s.dx = this.X0 + this.K * Math.min(s.a, s.b);
      s.dy = this.homeY(s);
      return s;
    },

    /* ⚠ Math.round lives HERE, in the reducer, not in the renderer — so
       every numeric field of every reachable state is an integer ALWAYS,
       not "integer except while dragging". One assertion then guards the
       whole exactness story downstream.
       ⚠ AND THE CLAMP IS ON THE ORIGIN, WITH THE WIDTH UNTOUCHED. The
       obvious wrong version clamps both edges, which SQUASHES the offcut
       against the right wall — and that is exactly the defect that would
       refute "the offcut's length does not depend on where you drop it". */
    moveOffcut: function (st, x, y) {
      var s = this._st(st);
      if (s.phase !== 'lifting' && s.phase !== 'free') return null;
      if (typeof x !== 'number' || !isFinite(x)) return null;
      if (typeof y !== 'number' || !isFinite(y)) return null;
      var d = Math.abs(s.a - s.b), nx, ny, ph;
      if (s.phase === 'lifting') {
        /* ⭐ dx is LOCKED while it is still attached. Letting the child
           slide it sideways before it comes off is a lie about the
           material, and it makes "downwards" the gesture rather than a
           suggestion. */
        nx = this.X0 + this.K * Math.min(s.a, s.b);
        ny = Math.round(Math.min(this.FLOOR_Y, Math.max(this.homeY(s), y)));
        ph = (ny >= this.CARRY_Y) ? 'free' : 'lifting';
      } else {
        nx = Math.round(Math.min(this.RIGHT - this.K * d, Math.max(this.X0, x)));
        ny = Math.round(Math.min(this.FLOOR_Y, Math.max(this.A_Y, y)));
        ph = 'free';
      }
      if (nx === s.dx && ny === s.dy && ph === s.phase) return null;
      s.dx = nx; s.dy = ny; s.phase = ph;
      return s;
    },

    /* the seat: the far end of the SHORTER plank, computed never dropped */
    seatX: function (st) { var s = this._st(st); return this.X0 + this.K * Math.min(s.a, s.b); },
    seatY: function (st) { var s = this._st(st); return this.shortRowY(s.a, s.b); },
    /* the drop socket, half-width one unit — and the DRAWN socket is the
       same number, so the visible affordance and the model rule are one
       object (§23.6: a control must do what its label says) */
    dockTol: function () { return this.K; },

    endDrag: function (st) {
      var s = this._st(st);
      if (s.phase !== 'lifting' && s.phase !== 'free') return null;
      if (s.phase === 'lifting') { s.phase = 'attached'; s.dx = 0; s.dy = 0; return s; }
      var sx = this.seatX(s), sy = this.seatY(s);
      if (Math.abs(s.dx - sx) <= this.dockTol() && Math.abs(s.dy - sy) <= this.dockTol()) {
        s.phase = 'laid'; s.dx = sx; s.dy = sy; return s;
      }
      return null;                              /* it stays free — nothing changed */
    },

    unseat: function (st) {
      var s = this._st(st);
      if (s.phase !== 'laid') return null;
      s.phase = 'free';
      s.dy = this.CARRY_Y;
      return s;
    },

    reattach: function (st) {
      var s = this._st(st);
      if (s.phase === 'attached') return null;
      s.phase = 'attached'; s.dx = 0; s.dy = 0;
      return s;
    },

    /* the one-tap path that performs the whole routine, so the keyboard
       and the liveness gate reach the tool's actual point */
    toggleOffcut: function (st) {
      var s = this._st(st);
      if (s.a === s.b) return null;
      if (s.phase === 'attached') { s.phase = 'laid'; s.dx = this.seatX(s); s.dy = this.seatY(s); return s; }
      s.phase = 'attached'; s.dx = 0; s.dy = 0;
      return s;
    },

    /* ---- geometry: pure functions of the state --------------------- */
    plankGeom: function (st, which) {
      var s = this._st(st), v = s[which];
      return { x: this.X0, y: which === 'a' ? this.A_Y : this.B_Y, w: this.K * v, h: this.BAR_H };
    },
    /* the matched region of the LONGER plank — what stays behind */
    matchedGeom: function (st) {
      var s = this._st(st), r = this.roleOf(s);
      if (!r) return null;
      return { x: this.X0, y: r === 'a' ? this.A_Y : this.B_Y, w: this.K * Math.min(s.a, s.b), h: this.BAR_H };
    },
    /* the offcut, wherever it currently is */
    offcutGeom: function (st) {
      var s = this._st(st), d = this.diffOf(s);
      if (!d) return null;
      if (s.phase === 'attached') {
        return { x: this.X0 + this.K * Math.min(s.a, s.b), y: this.homeY(s), w: this.K * d, h: this.BAR_H };
      }
      return { x: s.dx, y: s.dy, w: this.K * d, h: this.BAR_H };
    },
    bracketSpan: function (st) {
      var s = this._st(st);
      if (s.a === s.b) return null;
      return { x0: this.X0 + this.K * Math.min(s.a, s.b), x1: this.X0 + this.K * Math.max(s.a, s.b) };
    },
    /* ⭐ THE PAYOFF, as one expression. `min + d` and `max` are the same
       number, so the seated right edge and the longer plank's right edge
       are not two measurements that agree. */
    composedRight: function (st) {
      var s = this._st(st);
      return this.X0 + this.K * (Math.min(s.a, s.b) + this.diffOf(s));
    },
    longRight: function (st) {
      var s = this._st(st);
      return this.X0 + this.K * Math.max(s.a, s.b);
    },

    /* =================================================================
       THE PAIR BOOK — a and b only. The difference is never stored.
       ⚠ A 404 DEGRADES TO THE FREE TIER, NEVER TO NOTHING.
       ================================================================= */
    FREE_PAIRS: 5,
    FALLBACK_PAIRS: {
      version: 1, freeCount: 5,
      pairs: [
        { k: 'plain', a: 5, b: 9 },
        { k: 'twin', a: 8, b: 16 },
        { k: 'crumb', a: 15, b: 16 },
        { k: 'crumb-close', a: 2, b: 3 },
        { k: 'same', a: 12, b: 12 }
      ]
    },

    _fetchPairs: function () {
      var self = this;
      fetch('/mini-tools/comparison-planks-pairs.json', { cache: 'no-cache' })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .catch(function () { return self.FALLBACK_PAIRS; })
        .then(function (d) {
          self.data = (d && d.pairs && d.pairs.length) ? d : self.FALLBACK_PAIRS;
          if (self._wrap) self.render();
        });
    },

    book: function () {
      var all = (this.data && this.data.pairs) || [], out = [], i;
      for (i = 0; i < all.length; i++) if (i < this.FREE_PAIRS || this.premium) out.push(all[i]);
      return out;
    },

    nextPair: function (st, book, idx) {
      var s = this._st(st);
      if (!book || book.length < 2) return null;
      var p = book[((idx + 1) % book.length + book.length) % book.length];
      s.a = this._int(p.a, 5); s.b = this._int(p.b, 9);
      s.phase = 'attached'; s.dx = 0; s.dy = 0;
      return s;
    },

    /* =================================================================
       STORE + ENTITLEMENT — the pattern from unroll-tape.js.
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

    /* ================================================================= */
    init: function (api) {
      this.api = api;
      injectComparisonPlanksCSS();
      this._store = this._loadStore();
      var ent = this._store.ent;
      if (ent && ent.tier) this.premium = ent.tier !== 'free';
      this.data = this.FALLBACK_PAIRS;
      this.st = this.newState();
      this._idx = 0;
      this._sheet = 4;                 /* print density: 1 | 2 | 4 | 0 (blank) */
      this._timers = [];
      this._fetchPairs();
      this._fetchEntitlement();
      this.render();
    },
    reset: function () { this.st = this.newState(); this._idx = 0; this._svg = null; this.render(); },

    /* =================================================================
       RENDER — the skeleton is built ONCE and then repainted.

       ⭐ THIS IS NOT AN OPTIMISATION, IT IS THE DESIGN CLAIM. The offcut
       must be ONE NODE whose identity survives the whole detach → carry
       → seat → return round trip, so that `node === node` and the stage's
       node count never changes. A render that rebuilds the stage each
       frame would make the offcut a new object every time, and the
       catalog's weaker "a real DOM copy" would be the best that could be
       said. A moved node IS its origin; a copy has to be proved equal.
       ================================================================= */
    render: function () {
      var api = this.api;
      if (!api || !api.stage) return;
      if (!this._svg || !this._svg.parentNode) this._build();
      this._paint();
    },

    _svgEl: function (tag, attrs) {
      var e = document.createElementNS('http://www.w3.org/2000/svg', tag), k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
      return e;
    },

    _build: function () {
      var api = this.api, self = this, stage = api.stage;
      stage.innerHTML = '';
      var wrap = api.el('div', 'cmp-wrap');
      this._wrap = wrap;

      var bench = api.el('div', 'cmp-bench');
      bench.setAttribute('role', 'group');
      bench.setAttribute('aria-label', api.t('benchLabel'));
      this._bench = bench;

      var svg = this._svgEl('svg', { viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'cmp-svg' });
      this._svg = svg;
      bench.appendChild(svg);

      /* furniture, deliberately unnamed — present in the FIRST frame and
         in every frame after, which is why nothing ever has to light up
         green when the composite arrives */
      this._startLine = this._svgEl('line', { x1: this.X0, y1: this.RULE_TOP, x2: this.X0, y2: this.RULE_BOT, 'class': 'cmp-rule' });
      this._farLine = this._svgEl('line', { y1: this.RULE_TOP, y2: this.RULE_BOT, 'class': 'cmp-rule cmp-far' });
      svg.appendChild(this._startLine);
      svg.appendChild(this._farLine);

      /* the drop socket — DRAWN from the same number the model docks on */
      this._socket = this._svgEl('rect', { 'class': 'cmp-socket', rx: 6 });
      svg.appendChild(this._socket);

      /* the hollow the offcut leaves behind. Nothing else in this repo
         leaves a hole, and it is what makes the frozen handles legible. */
      this._hollow = this._svgEl('rect', { 'class': 'cmp-hollow', rx: 5 });
      svg.appendChild(this._hollow);

      /* the two planks. Plank A is ALWAYS the top row and B the bottom —
         they never swap, because a row that jumps when a number crosses
         is the "the thing you were not touching flinched" failure. */
      this._plankA = this._svgEl('rect', { 'class': 'cmp-plank cmp-a', rx: 5 });
      this._plankB = this._svgEl('rect', { 'class': 'cmp-plank cmp-b', rx: 5 });
      svg.appendChild(this._plankA);
      svg.appendChild(this._plankB);

      /* ⭐ ONE NODE, for the life of the tool */
      this._offcut = this._svgEl('rect', { 'class': 'cmp-offcut', rx: 5 });
      svg.appendChild(this._offcut);

      this._seam = this._svgEl('line', { 'class': 'cmp-seam' });
      svg.appendChild(this._seam);
      this._brRail = this._svgEl('line', { 'class': 'cmp-br' });
      this._brL = this._svgEl('line', { 'class': 'cmp-br' });
      this._brR = this._svgEl('line', { 'class': 'cmp-br' });
      svg.appendChild(this._brRail); svg.appendChild(this._brL); svg.appendChild(this._brR);

      this._numA = this._svgEl('text', { 'class': 'cmp-num' });
      this._numB = this._svgEl('text', { 'class': 'cmp-num' });
      svg.appendChild(this._numA); svg.appendChild(this._numB);

      /* ---- the handles: fixed-size HTML buttons OVER the svg --------
         ⚠ never circles inside it. A radius in model units cannot hold a
         floor in pixels — #41 measured 44 model units rendering at 29px
         on a 660px bench. 44px is 44px. */
      this._hA = this._handle(bench, 'cmp-h-a', api.t('plankAAria'), function (v) {
        var n = self.setLen(self.st, 'a', v); if (n) { self.st = n; self._paint(); }
      }, 'len');
      this._hB = this._handle(bench, 'cmp-h-b', api.t('plankBAria'), function (v) {
        var n = self.setLen(self.st, 'b', v); if (n) { self.st = n; self._paint(); }
      }, 'len');
      this._hO = this._handle(bench, 'cmp-h-o', api.t('offcutAria'), null, 'off');

      wrap.appendChild(bench);

      this._hint = api.el('div', 'cmp-hint');
      wrap.appendChild(this._hint);

      var foot = api.el('div', 'cmp-foot');
      this._foot = foot;
      this._chipToggle = this._chip(foot, 'cmp-go', function () {
        var n = self.toggleOffcut(self.st);
        if (n) { self.st = n; self._paint(); }
      });
      this._chipNext = this._chip(foot, '', function () {
        var bk = self.book();
        var n = self.nextPair(self.st, bk, self._idx);
        if (n) { self._idx = (self._idx + 1) % bk.length; self.st = n; self._paint(); }
        if (!self.premium) self._maybeGate();
      });
      this._chipPrint = this._chip(foot, 'cmp-lock', function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet();
        try { window.print(); } catch (_) {}
      });
      wrap.appendChild(foot);

      /* ⭐ THE SHEET. A real print surface, not a window.print() call on
         the page. #40 and #41 each ship a Print chip with NO @media print
         block at all, so they print the whole web page — chrome, hints,
         buttons and footer. That is "a control must do what its label
         says", shipped twice, and this is the fix pattern. */
      this._sheetEl = api.el('div', 'cmp-sheet');
      wrap.appendChild(this._sheetEl);

      stage.appendChild(wrap);
    },

    _chip: function (foot, cls, fn) {
      var b = this.api.el('button', 'cmp-chip' + (cls ? ' ' + cls : ''));
      b.type = 'button';
      b.addEventListener('click', fn);
      foot.appendChild(b);
      return b;
    },

    /* A grabbable handle. ⚠ Bound to WINDOW — a repaint can replace the
       captured element and pointer capture dies with it (#40 paid for
       that one). ⚠ And it acts on pointerdown, click, Enter/Space AND
       arrows: a drag-only handle is dead to a keyboard, dead to
       assistive tech, and dead to the liveness gate, which drives
       synthetic .click() and never fires pointerdown (#41's flag scored
       0 of 9 paths in all three entitlement states).
       ⚠ The drag is DELTA-based, so grabbing a 60-unit offcut by a 44px
       pad never teleports it. */
    _handle: function (host, cls, aria, onVal, kind) {
      var self = this;
      var b = this.api.el('button', 'cmp-handle ' + cls);
      b.type = 'button';
      b.setAttribute('aria-label', aria);
      b.appendChild(this.api.el('span', 'cmp-grip'));
      var rect = null, org = null;
      var toModel = function (clientX, clientY) {
        return { x: (clientX - rect.left) / rect.width * self.W, y: (clientY - rect.top) / rect.height * self.H };
      };
      b.addEventListener('pointerdown', function (ev) {
        ev.preventDefault();
        rect = self._bench.getBoundingClientRect();   /* snapshot ONCE */
        if (!rect.width) return;
        var start = toModel(ev.clientX, ev.clientY);
        if (kind === 'off') {
          var n0 = self.beginLift(self.st);
          if (n0) { self.st = n0; self._paint(); }
          org = { x: self.st.dx, y: self.st.dy };
        } else {
          org = { v: self.st[cls === 'cmp-h-a' ? 'a' : 'b'] };
        }
        var move = function (e) {
          var p = toModel(e.clientX, e.clientY);
          if (kind === 'off') {
            var n = self.moveOffcut(self.st, org.x + (p.x - start.x), org.y + (p.y - start.y));
            if (n) { self.st = n; self._paint(); }
          } else if (onVal) {
            onVal(org.v + (p.x - start.x) / self.K);
          }
        };
        var up = function () {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          window.removeEventListener('pointercancel', up);
          if (kind === 'off') { var n = self.endDrag(self.st); if (n) { self.st = n; self._paint(); } }
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
      });
      b.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (kind !== 'off') return;
        var n = self.toggleOffcut(self.st);
        if (n) { self.st = n; self._paint(); }
      });
      b.addEventListener('keydown', function (ev) {
        var k = ev.key;
        if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
          ev.preventDefault();
          var t = kind === 'off' ? self.toggleOffcut(self.st) : null;
          if (t) { self.st = t; self._paint(); }
          return;
        }
        var d = (k === 'ArrowLeft' || k === 'ArrowDown') ? -1 : (k === 'ArrowRight' || k === 'ArrowUp') ? 1 : 0;
        if (!d) return;
        ev.preventDefault();
        if (kind === 'off') {
          var lift = self.st.phase === 'attached' ? self.beginLift(self.st) : self.st;
          if (!lift) return;
          var m = self.moveOffcut(lift, lift.dx + d * self.K, lift.dy + (d > 0 ? self.K : -self.K));
          if (m) { self.st = m; self._paint(); }
        } else if (onVal) {
          onVal(self.st[cls === 'cmp-h-a' ? 'a' : 'b'] + d);
        }
      });
      host.appendChild(b);
      return b;
    },

    /* ---- the repaint: every attribute a pure function of the state -- */
    _paint: function () {
      var api = this.api, s = this._st(this.st), K = this.K;
      var d = this.diffOf(s), role = this.roleOf(s);
      var pa = this.plankGeom(s, 'a'), pb = this.plankGeom(s, 'b');
      var matched = this.matchedGeom(s), oc = this.offcutGeom(s), br = this.bracketSpan(s);
      var set = function (el, at) { var k; for (k in at) if (at.hasOwnProperty(k)) el.setAttribute(k, at[k]); };

      /* a plank draws its MATCHED region only when its own overhang is
         the offcut; otherwise it draws its whole length */
      var aw = (role === 'a') ? matched.w : pa.w;
      var bw = (role === 'b') ? matched.w : pb.w;
      set(this._plankA, { x: pa.x, y: pa.y, width: aw, height: pa.h });
      set(this._plankB, { x: pb.x, y: pb.y, width: bw, height: pb.h });

      this._farLine.setAttribute('x1', this.longRight(s));
      this._farLine.setAttribute('x2', this.longRight(s));

      if (oc) {
        set(this._offcut, { x: oc.x, y: oc.y, width: oc.w, height: oc.h });
        this._offcut.style.display = '';
      } else this._offcut.style.display = 'none';

      /* the hollow: only while the offcut is away from home */
      var away = oc && s.phase !== 'attached';
      if (away) {
        set(this._hollow, { x: this.X0 + K * Math.min(s.a, s.b), y: this.homeY(s), width: K * d, height: this.BAR_H });
        this._hollow.style.display = '';
      } else this._hollow.style.display = 'none';

      /* the seam: where the offcut meets whatever it is butted against */
      if (oc && d) {
        set(this._seam, { x1: oc.x, y1: oc.y, x2: oc.x, y2: oc.y + oc.h });
        this._seam.style.display = (s.phase === 'attached' || s.phase === 'laid') ? '' : 'none';
      } else this._seam.style.display = 'none';

      if (br) {
        var y = this.A_Y + this.BAR_H + 31;
        set(this._brRail, { x1: br.x0, y1: y, x2: br.x1, y2: y });
        set(this._brL, { x1: br.x0, y1: y, x2: br.x0, y2: y + 8 });
        set(this._brR, { x1: br.x1, y1: y, x2: br.x1, y2: y + 8 });
        this._brRail.style.display = this._brL.style.display = this._brR.style.display = '';
      } else this._brRail.style.display = this._brL.style.display = this._brR.style.display = 'none';

      /* the socket, drawn at exactly the tolerance the model docks on */
      if (s.phase === 'free') {
        set(this._socket, { x: this.seatX(s), y: this.seatY(s), width: K * d, height: this.BAR_H });
        this._socket.style.display = '';
      } else this._socket.style.display = 'none';

      /* ⭐ EXACTLY TWO NUMERALS, IN EVERY STATE. Each names its own
         plank's far end, and that x has never moved. */
      this._numA.setAttribute('x', this.X0 + K * s.a);
      this._numA.setAttribute('y', this.A_Y - 12);
      this._numA.textContent = String(s.a);
      this._numB.setAttribute('x', this.X0 + K * s.b);
      this._numB.setAttribute('y', this.B_Y + this.BAR_H + 30);
      this._numB.textContent = String(s.b);

      var pct = function (el, x, y) {
        el.style.left = (x / ComparisonPlanks.W * 100) + '%';
        el.style.top = (y / ComparisonPlanks.H * 100) + '%';
      };
      pct(this._hA, this.X0 + K * s.a, this.A_Y + this.BAR_H / 2);
      pct(this._hB, this.X0 + K * s.b, this.B_Y + this.BAR_H / 2);
      if (oc) { pct(this._hO, oc.x + oc.w / 2, s.phase === 'attached' ? this.A_Y + this.BAR_H + 35 : oc.y + oc.h / 2); }
      this._hO.style.display = oc ? '' : 'none';

      /* the hint ladder */
      var key = (s.a === s.b) ? 'hintSet'
        : s.phase === 'laid' ? 'hintSeated'
          : s.phase === 'attached' ? 'hintTake' : 'hintCarry';
      this._hint.textContent = api.t(key);

      this._chipToggle.textContent = api.t(s.phase === 'attached' ? 'takeBtn' : 'putBackBtn');
      this._chipToggle.disabled = (s.a === s.b);
      this._chipNext.textContent = api.t('nextBtn');
      this._chipPrint.textContent = api.t('printBtn');
    },

    /* ⭐ THE SHEET — outlines only, no numerals, at true scale, so the
       child writes the two numbers and draws where the piece goes. */
    _buildSheet: function () {
      var s = this._st(this.st), K = this.K, api = this.api;
      var n = this._sheet === 1 ? 1 : this._sheet === 2 ? 2 : 4;
      var blank = this._sheet === 0;
      this._sheetEl.innerHTML = '';
      this._sheetEl.className = 'cmp-sheet cmp-sheet-' + n;
      for (var i = 0; i < (blank ? 4 : n); i++) {
        var svg = this._svgEl('svg', { viewBox: '0 0 ' + this.W + ' ' + this.H, 'class': 'cmp-sheet-svg' });
        svg.appendChild(this._svgEl('line', { x1: this.X0, y1: this.RULE_TOP, x2: this.X0, y2: this.RULE_BOT, 'class': 'cmp-p-rule' }));
        if (!blank) {
          svg.appendChild(this._svgEl('line', { x1: this.longRight(s), y1: this.RULE_TOP, x2: this.longRight(s), y2: this.RULE_BOT, 'class': 'cmp-p-rule' }));
          svg.appendChild(this._svgEl('rect', { x: this.X0, y: this.A_Y, width: K * s.a, height: this.BAR_H, 'class': 'cmp-p-plank' }));
          svg.appendChild(this._svgEl('rect', { x: this.X0, y: this.B_Y, width: K * s.b, height: this.BAR_H, 'class': 'cmp-p-plank' }));
        }
        this._sheetEl.appendChild(svg);
      }
    },

    _maybeGate: function () { if (!this.premium && this._idx === 0) this._showGate(); },
    _showGate: function () {
      var api = this.api;
      if (!this._wrap || this._wrap.querySelector('.cmp-gate')) return;
      var g = api.el('div', 'cmp-gate');
      var h = api.el('div', ''); h.textContent = api.t('gateTitle');
      var p = api.el('div', ''); p.textContent = api.t('gateBody');
      var a = api.el('a', ''); a.href = '/pricing'; a.textContent = api.t('gateCta');
      g.appendChild(h); g.appendChild(p); g.appendChild(a);
      this._wrap.appendChild(g);
    },
    destroy: function () {
      var i;
      for (i = 0; i < (this._timers || []).length; i++) clearTimeout(this._timers[i]);
      this._timers = [];
      this._wrap = null;
    },
    _after: function (ms, fn) { var id = setTimeout(fn, ms); this._timers.push(id); return id; },

    CSS: ''
      + '.cmp-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
      + '.cmp-bench{position:relative;width:100%;max-width:660px;border-radius:18px;'
      + 'border:2px solid rgba(20,107,94,.28);background-color:#FBF3E4;overflow:hidden;}'
      + '.cmp-svg{display:block;width:100%;height:auto;}'
      /* the two planks: the same material, so the offcut's provenance is
         carried by the fill and never needs a label */
      + '.cmp-plank{fill:#146B5E;}'
      + '.cmp-offcut{fill:#146B5E;}'
      + '.cmp-seam{stroke:rgba(251,243,228,.85);stroke-width:2;}'
      /* ⭐ the hollow — nothing else in this repo leaves a hole */
      + '.cmp-hollow{fill:none;stroke:#146B5E;stroke-width:2;stroke-dasharray:7 6;opacity:.55;}'
      + '.cmp-socket{fill:none;stroke:#F2784B;stroke-width:2;stroke-dasharray:5 5;opacity:.6;}'
      + '.cmp-rule{stroke:rgba(20,107,94,.45);stroke-width:2;}'
      + '.cmp-far{stroke-dasharray:6 5;}'
      /* butt caps, so the drawn bracket's bbox IS its span and the gate's
         width assertion is not off by a stroke width at each end */
      + '.cmp-br{stroke:#0F4A40;stroke-width:3;stroke-linecap:butt;}'
      + '.cmp-num{fill:#0F4A40;font:800 30px Baloo 2,Nunito,sans-serif;text-anchor:middle;}'
      /* handles: 44px, fixed, in px — a radius in model units cannot hold
         a floor in pixels (#41 measured 44 model units at 29px) */
      + '.cmp-handle{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;padding:0;'
      + 'border:0;background:transparent;cursor:grab;touch-action:none;display:flex;'
      + 'align-items:center;justify-content:center;border-radius:50%;}'
      + '.cmp-handle:active{cursor:grabbing;}'
      + '.cmp-handle:focus-visible{outline:3px solid #146B5E;outline-offset:-2px;}'
      + '.cmp-grip{display:block;width:18px;height:18px;border-radius:50%;background:#0F4A40;'
      + 'box-shadow:0 0 0 3px rgba(251,243,228,.92);}'
      + '.cmp-h-o .cmp-grip{background:#C8613A;}'
      + '.cmp-num{fill:#0F4A40;}'
      + '.cmp-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;'
      + 'line-height:1.45;color:#3C6E63;max-width:660px;}'
      + '.cmp-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%;max-width:660px;}'
      + '.cmp-chip{font:600 clamp(.9rem,3.2vw,1.02rem)/1.1 Nunito,sans-serif;padding:11px 18px;'
      + 'min-height:44px;border-radius:14px;border:2px solid #146B5E;background:#FBF3E4;color:#0F4A40;cursor:pointer;}'
      + '.cmp-chip.cmp-go{background:#F2784B;border-color:#F2784B;color:#FFF8EE;}'
      + '.cmp-chip.cmp-lock{border-color:#C8613A;color:#C8613A;}'
      + '.cmp-chip[disabled]{opacity:.45;cursor:default;}'
      + '.cmp-gate{width:100%;max-width:660px;border-radius:16px;border:2px dashed #C8613A;'
      + 'background:#FFF6EE;padding:14px 16px;text-align:center;font-family:Nunito,sans-serif;color:#7A3B21;}'
      + '.cmp-gate a{color:#C8613A;font-weight:700;}'
      /* ⭐⭐ THE SHEET. #40 and #41 each ship a Print chip that calls
         window.print() with NO @media print block at all, so they print
         the whole web page — nav, hints, buttons, footer, the tool at
         screen size. This is what the label promises instead. */
      + '.cmp-sheet{display:none;}'
      + '.cmp-sheet-svg{width:100%;height:auto;break-inside:avoid;}'
      + '.cmp-p-plank{fill:none;stroke:#000;stroke-width:2.5;}'
      + '.cmp-p-rule{stroke:#000;stroke-width:1.5;stroke-dasharray:5 4;}'
      + '@media print{'
      + '  .lcs-header,.lcs-hint,.cmp-hint,.cmp-foot,.cmp-gate,.cmp-bench,.cmp-handle{display:none !important;}'
      + '  .cmp-wrap{gap:0;}'
      + '  .cmp-sheet{display:grid;gap:14mm;width:100%;}'
      + '  .cmp-sheet-1{grid-template-columns:1fr;}'
      + '  .cmp-sheet-2{grid-template-columns:1fr;}'
      + '  .cmp-sheet-4{grid-template-columns:1fr 1fr;}'
      + '  @page{margin:14mm;}'
      + '}'
      + '@media (prefers-reduced-motion:reduce){.cmp-offcut{transition:none;}}'
  };

  if (typeof window !== 'undefined') window.ComparisonPlanks = ComparisonPlanks;
  if (typeof module !== 'undefined' && module.exports) module.exports = ComparisonPlanks;
  if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(ComparisonPlanks);

  /* CSS + render live in the second half of this file, appended by the
     render block below. */
  var cssDone = false;
  function injectComparisonPlanksCSS() {
    if (cssDone) return;
    cssDone = true;
    var el = document.createElement('style');
    el.setAttribute('data-cmp', '1');
    el.textContent = ComparisonPlanks.CSS;
    document.head.appendChild(el);
  }
  ComparisonPlanks._injectCSS = injectComparisonPlanksCSS;
}());
