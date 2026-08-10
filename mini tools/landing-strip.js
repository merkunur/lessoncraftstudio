/* =====================================================================
   TOOL #51 — THE LANDING STRIP
   =====================================================================
   A bare strip with a wall at each end and three posts on it — one at
   each end and one in the middle. A number appears. The class says
   which post it is NEAREST, and only then puts it on the strip. The
   true place is shown. Then the strip RE-RULES ITSELF into the ten the
   number lives in — and the same three posts are there again.

   ⭐⭐ THE INVENTION: THE QUESTION RECURS, NOT THE AXIS. Zooming a number
   line is a rescaling, and a rescaling on its own is refuted evidence
   (Nuraydin, Stricker & Schneider 2022, RCT N=188: number-line training
   FAILED TO TRANSFER across a single axis rescaling). What survives is
   the strip re-ruling into 40-50 and ASKING THE SAME THREE-POST
   QUESTION at the new depth: nearer 40, nearer 45, or nearer 50. The
   self-similarity is a question that keeps working, which a child can
   check, rather than an axis that changed, which they cannot.

   ⚖️ THE PEDAGOGY PANEL RULED **DO NOT BUILD**, 3-0, WITH THE STRONGEST
   EVIDENCE ANY PANEL HAS PRODUCED, AND IT IS RECORDED HERE RATHER THAN
   ANSWERED:
   - ⚠⚠ THE CATALOG'S HEADLINE CLAIM IS BACKWARDS. Maximum placement
     error sits at x ~ 21.7: a child puts TEN IN THE MIDDLE of a 0-100
     line. By 90 the error has collapsed to about +7.7. The top of the
     strip is where children are MOST accurate, and the squeeze up there
     is a side effect of small numbers being shoved right. "Everyone
     crams 60-90 into the last inch" aims a class at the wrong end.
   - ⚠ "Magnitude sense is the single best predictor of later
     arithmetic" is FALSE. Geary 2011, N=177: number-line estimation
     predicts at 0.14, t < 1, NOT SIGNIFICANT — outranked by addition
     decomposition (0.67), visuospatial working memory (0.49) and IQ
     (0.38).
   - ⚠ Variance is SMALLEST at 0, 50 and 100 and GREATEST at 25 and 75.
   - ⚠ There is no unclaimed K-2 CCSS code for number-line estimation;
     it is a research instrument, not a curriculum object.
   ⚠ #47's rule binds: redefining the deliverable is the operator's
   call, not a panel's. The objection is on the record and the tool is
   built — and the panel's OWN "remainder worth having" is what it was
   built around.

   ⭐ WHAT THE PANEL HANDED OVER WHILE REFUSING: "Nearer 0, nearer 50, or
   nearer 100? — commit to a benchmark BEFORE placing." The catalog
   states its dread in BENCHMARK form ("Is 71 nearer 20 or nearer 90?")
   and then builds a PLACEMENT tool. That mismatch is the design. The
   benchmark is where accuracy actually lives, the documented
   progression stops at exactly three anchors, and the hard cases are 25
   and 75 — which is why the strip offers 25 and 75 rounds at all.

   ⚠⚠ THERE IS NO ACCURACY GHOST, AND THAT IS NOT AN OVERSIGHT.
   `verify-estimation-jar.js` P14 bans it BY NAME, gate-enforced and
   poison-tested in eleven locales: "THE SAVED RITUAL MUST NOT BE ABLE
   TO CARRY A TREND. 'We're getting closer week by week' is an accuracy
   gradient in slow motion, and it is the single most likely thing to be
   added to this feature next." The art panel's segment-ghost — a line
   joining guess to truth — is the best single idea any panel produced
   and it is precisely what that gate forbids. So the trace here records
   ONLY WHICH POST WAS CHOSEN: three columns, sign-only, no distance, no
   rank, no order, no closest and no winner. That is the shape
   `estimation-jar.spread()` already ships and its own gate already
   permits.

   ⚠ NO TICKS ON THE STRIP, and the reason is structural rather than
   pedagogical: a ticked strip would carry DIFFERENT furniture after the
   re-rule, which is the exact opposite of self-similarity. A bare strip
   is identical at every depth, and that identity IS the proof the tool
   is making.

   ⚠ NO GLIDER. The catalog says the number "flies in as a small
   glider", but the number lands where the class SAID and the truth is
   then revealed somewhere else — so the aircraft ends up in the wrong
   place, which is a crash. That is a right/wrong verdict delivered as a
   pictogram, and a funny one, which is worse than any colour could
   manage. The number arrives AS ITSELF.

   ⚠ EVERY STRUCTURAL NOUN IS OWNED. The fence returned: strip
   (`pattern-bench`, in every locale), line (`number-line` owns the head
   term in all 11 and MUST NOT be renamed), track and rail (`arrow-strip`
   in every NON-EN locale — it reads free in English only), runway (a
   NAMED PART of `unroll-tape`), ghost (`arrow-strip`'s invention 2, and
   `draw-bag` refuses it by name), trail, mark (`cold-line`'s named
   part), peg, stretch (`unit-handle`). FREE and used here: THE POSTS ·
   THE WALLS · THE PLAQUE · THE WEDGE. "Strip" survives in the product
   NAME only, which is the operator's.

   FREE   the whole apparatus: both depths, all three posts, every
          placement, the re-rule, and the post trace.
   PAID   the paper strips to rule up and use on the wall.

   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* the strip is drawn in percent of its own width, so it is the SAME
       DRAWING at every depth — which is the tool's whole argument and
       the reason there is no tick anywhere in this file. */
    POSTS: 3,                  /* nearer-low, nearer-middle, nearer-high */
    DEPTH_MAX: 2,              /* 0-100, then one ten. Deeper is Grade 3+ */
    SPAN_TOP: 100,
    DECADE: 10,

    /* placement resolution. ⚠ A 0-100 strip at ~700px is ~7px a unit,
       and a six-year-old's finger on a whiteboard is not a 7px
       instrument. The tool ROUNDS placement to STEP and never pretends
       to a precision it cannot render or a child cannot express. */
    STEP_TOP: 1,
    NUDGE_BIG: 10,
    NUDGE_SMALL: 1,

    /* the trace: which post the class chose, never how far off it was */
    TRACE_MAX: 20,             /* ⚠ P14: a long enough series IS a trend */

    /* motion, ms */
    T_ARRIVE: 380,
    T_COMMIT: 260,
    /* ⚠⚠ THE BEAT does NOT pass through _dur(). Reduced motion is about
       MOVEMENT, and a wait is not movement; a blanket wrapper would
       silently delete the pedagogy for the users least able to complain
       about it. */
    T_BEAT: 900,
    /* ⚠⚠ AND THE REVEAL MUST NOT SCALE WITH THE ERROR. If a bad guess
       took longer to resolve, the verdict would leak into the TIME
       channel, where no colour audit, no contrast audit and no shape
       audit can see it. One duration, always. */
    T_REVEAL: 640,
    T_RERULE: 760,
    T_REFUSE: 200,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_POST: 620,
    SND_PLACE: 500,
    SND_REVEAL: 780,
    SND_RERULE: 880,
    SND_REFUSE: 300,
    SND_DEBOUNCE: 160
  };

  var LandingStrip = {

    id: 'landing-strip',

    strings: {
      title: { en: 'The Landing Strip' },
      instruction: { en: 'A number appears. Say which post it is nearest to, then put it on the strip — and see where it really lives.' },

      ariaStrip: { en: 'A strip with a wall at each end and three posts on it: one at each end and one in the middle.' },
      ariaPlaque: { en: 'the number, at {n}' },
      ariaTruth: { en: 'where the number really lives' },
      ariaTrace: { en: 'how often the class has chosen each post' },

      setSpan: { en: 'How far the strip reaches' },
      span100: { en: '0 to 100' },
      span20: { en: '0 to 20' },

      postLow: { en: 'Nearest the post on the left' },
      postMid: { en: 'Nearest the post in the middle' },
      postHigh: { en: 'Nearest the post on the right' },

      less10: { en: 'Move ten to the left' },
      less1: { en: 'Move one to the left' },
      more1: { en: 'Move one to the right' },
      more10: { en: 'Move ten to the right' },
      place: { en: 'Put it here' },
      rerule: { en: 'Open up the ten it lives in' },
      back: { en: 'Go back out to the whole strip' },
      next: { en: 'Another number' },

      saidArrive: { en: '{n}. Which post is it nearest to?' },
      saidPost: { en: 'Nearest {p}. Now put it on the strip.' },
      saidMoved: { en: '{n}' },
      saidTruth: { en: 'It lives at {t}. You put it at {n}.' },
      saidRerule: { en: 'The strip now runs from {a} to {b}. The three posts are back.' },
      saidBack: { en: 'Back to the whole strip, {a} to {b}.' },
      saidEnd: { en: 'The strip does not go past {n}.' },
      saidNoRerule: { en: 'This is already one ten. It does not open up any further.' },

      gateTitle: { en: 'The paper strips' },
      gateBody: { en: 'The whole apparatus is free — both depths, all three posts, every placement and the re-rule. A Teacher plan adds the paper strips to rule up and pin along the wall, so the class can keep one running all week.' },
      gateCta: { en: 'See the Teacher plan' },
      gateClose: { en: 'Not now' },

      printBtn: { en: 'Print the paper strips' },
      sheetTitle: { en: 'Paper strips to rule up' },
      sheetNote: { en: 'Each blank strip has a wall at both ends and three posts. Write the two end numbers in, put it up along the wall, and let the class add numbers to it all week. Rule the next one up as a single ten to carry on inside it.' }
    },

    settings: [
      { key: 'span', type: 'choice', labelKey: 'setSpan', options: [
        { value: '100', labelKey: 'span100' },
        { value: '20', labelKey: 'span20' }
      ] }
    ],
    defaults: { span: '100' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       Pure, DOM-free, and small enough to enumerate.

       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM. `phase` is a single token and every mutator is guarded on
       it, so "revealed before a post was chosen" is not a state this
       tool can be put into by any sequence of presses in any order.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. A clamp
       would quietly answer a different question than the one asked. */

    newState: function (span) {
      var top = String(span) === '20' ? 20 : GEO.SPAN_TOP;
      return {
        lo: 0, hi: top, top: top,
        n: null,                 /* the number that arrived */
        phase: 'empty',          /* empty | post | place | shown */
        post: null,              /* 0 | 1 | 2 */
        guess: null,
        depth: 0,
        trace: [0, 0, 0]         /* ⚠ counts per POST. Never distances. */
      };
    },

    _st: function (st) { return st || this.st; },

    /* the three posts, at the two ends and the middle — at EVERY depth,
       which is the whole point */
    postValue: function (st, i) {
      var s = this._st(st);
      return s.lo + (s.hi - s.lo) * (i / (GEO.POSTS - 1));
    },

    /* which post a value is truly nearest to. ⚠ Ties go to the middle,
       stated rather than left to floating point. */
    nearestPost: function (st, v) {
      var s = this._st(st), i, best = 1, bd = Infinity;
      for (i = 0; i < GEO.POSTS; i++) {
        var d = Math.abs(v - this.postValue(s, i));
        if (d < bd - 1e-9) { bd = d; best = i; }
      }
      return best;
    },

    /* a value's position along the strip, 0..1 */
    frac: function (st, v) {
      var s = this._st(st);
      return (v - s.lo) / (s.hi - s.lo);
    },

    /* ---- the moves ------------------------------------------------ */

    /* a number arrives. ⚠ It is drawn from the CURRENT span, so after a
       re-rule the numbers that arrive live inside the ten. */
    arrive: function (st, v) {
      var s = this._st(st);
      if (s.phase !== 'empty' && s.phase !== 'shown') return null;
      if (v < s.lo || v > s.hi) return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: v, phase: 'post',
        post: null, guess: null, depth: s.depth, trace: s.trace.slice()
      };
    },

    /* the DECISION: which post is it nearest to. This is a
       gate-CONDITION and not a trigger — the child must judge the
       number against three fixed landmarks before the strip will let
       them place anything at all. */
    choosePost: function (st, i) {
      var s = this._st(st);
      if (s.phase !== 'post') return null;
      if (!(i >= 0 && i < GEO.POSTS)) return null;
      var tr = s.trace.slice();
      tr[i] = tr[i] + 1;
      /* ⚠ P14: the trace is capped, because a long enough series is a
         trend even when every single entry is innocent. */
      var total = tr[0] + tr[1] + tr[2];
      if (total > GEO.TRACE_MAX) {
        var over = total - GEO.TRACE_MAX, k;
        for (k = 0; k < GEO.POSTS && over > 0; k++) {
          var take = Math.min(tr[k], over);
          tr[k] -= take; over -= take;
        }
      }
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'place',
        post: i, guess: this.postValue(s, i), depth: s.depth, trace: tr
      };
    },

    /* move the plaque along the strip. Rounded to STEP_TOP at the top
       depth and to a tenth of that inside a ten, so the resolution
       always matches what the strip can actually draw. */
    step: function (st) {
      var s = this._st(st);
      return (s.hi - s.lo) <= GEO.DECADE ? GEO.STEP_TOP / GEO.DECADE : GEO.STEP_TOP;
    },

    nudge: function (st, units) {
      var s = this._st(st);
      if (s.phase !== 'place') return null;
      var v = s.guess + units * this.step(s);
      v = Math.round(v / this.step(s)) * this.step(s);
      if (v < s.lo || v > s.hi) return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'place',
        post: s.post, guess: v, depth: s.depth, trace: s.trace.slice()
      };
    },

    /* put it down anywhere on the strip, by fraction of the strip's
       width — the pointer path. Same rounding as the nudge. */
    aim: function (st, f) {
      var s = this._st(st);
      if (s.phase !== 'place') return null;
      if (!(f >= 0 && f <= 1)) return null;
      var stp = this.step(s);
      var v = Math.round((s.lo + f * (s.hi - s.lo)) / stp) * stp;
      if (v < s.lo || v > s.hi) return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'place',
        post: s.post, guess: v, depth: s.depth, trace: s.trace.slice()
      };
    },

    commit: function (st) {
      var s = this._st(st);
      if (s.phase !== 'place') return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'shown',
        post: s.post, guess: s.guess, depth: s.depth, trace: s.trace.slice()
      };
    },

    /* ⭐ THE RE-RULE. The strip becomes the ten the number lives in, and
       the same three posts come back. Only after the truth is shown, so
       the class has something to carry inward. */
    rerule: function (st) {
      var s = this._st(st);
      if (s.phase !== 'shown') return null;
      if (s.depth >= GEO.DEPTH_MAX - 1) return null;
      if ((s.hi - s.lo) <= GEO.DECADE) return null;
      var lo = Math.floor(s.n / GEO.DECADE) * GEO.DECADE;
      /* ⭐⭐ THE QUESTION RECURS. The re-rule returns to the POST phase
         with the post and the guess cleared, so the class answers the
         same three-post question at the new depth — nearer 80, nearer 85
         or nearer 90. That IS the invention; carrying the old guess
         forward would have left it OUTSIDE the new strip (measured: a
         guess of 60 inside an 80-90 strip put the plaque at -200%, off
         screen), which is how reading the render found this. */
      return {
        lo: lo, hi: lo + GEO.DECADE, top: s.top, n: s.n, phase: 'post',
        post: null, guess: null, depth: s.depth + 1, trace: s.trace.slice()
      };
    },

    back: function (st) {
      var s = this._st(st);
      if (s.depth <= 0) return null;
      return {
        lo: 0, hi: s.top, top: s.top, n: s.n, phase: 'shown',
        post: s.post, guess: s.guess, depth: 0, trace: s.trace.slice()
      };
    },

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('lds-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. The shell pins overflow:hidden on BOTH
         html and body, so standalone on a phone there is no iframe to
         grow into and a control row can end up physically unreachable.
         ⚠ `html,body.x{...}` is a selector LIST whose html half applies
         unconditionally, which makes the class decorative and its
         mutation unkillable — hence two adds and one rule per element. */
      document.documentElement.classList.add('lds-scroll');
      document.body.classList.add('lds-scroll');

      this._lastSound = 0;
      this._seed = 1;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.span);
      this._deal();
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () {
      this.st = this.newState(this.api.settings.span);
      this._deal();
      this.render();
    },

    onSettings: function () { this.reset(); },

    /* ⚠ NOT Math.random: a deterministic walk means the gate and the
       render probe see the same numbers the classroom does, and a
       screenshot is reproducible. */
    _rand: function (n) {
      this._seed = (this._seed * 1103515245 + 12345) & 0x7fffffff;
      return this._seed % n;
    },

    /* deal a number worth asking about. ⭐ The hard cases are 25 and 75
       — variance is smallest at 0, 50 and 100 and greatest at the
       quarter points — so the deal leans on the quarters rather than
       spreading flat, which would waste most rounds on the easy band. */
    _deal: function () {
      var s = this.st, span = s.hi - s.lo, v;
      if (span <= GEO.DECADE) {
        v = s.lo + 1 + this._rand(GEO.DECADE - 1);
      } else {
        var quarter = this._rand(3) < 2;
        if (quarter) {
          var mid = s.lo + span * (this._rand(2) ? 0.25 : 0.75);
          v = Math.round(mid + (this._rand(2 * span / 10 + 1) - span / 10));
        } else {
          v = s.lo + 1 + this._rand(span - 1);
        }
        v = Math.max(s.lo + 1, Math.min(s.hi - 1, v));
      }
      var next = this.arrive(s, v);
      if (next) this.st = next;
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (freq, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(freq);
    },

    _fmt: function (s, vals) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (vals && vals[k] != null) ? String(vals[k]) : m;
      });
    },

    _num: function (v) {
      return (Math.round(v * 10) / 10).toString();
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'lds-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'lds-card');

      /* the parent strip, drawn identically at a tenth the height —
         ⭐ a PICTURE of self-similarity rather than a claim about it,
         and it doubles as the way back out */
      this._mini = api.el('div', 'lds-mini');
      card.appendChild(this._mini);

      var arena = api.el('div', 'lds-arena');
      this._arena = arena;

      this._plaque = api.el('button', 'lds-plaque');
      this._plaque.type = 'button';
      arena.appendChild(this._plaque);

      var strip = api.el('div', 'lds-strip');
      strip.setAttribute('role', 'img');
      this._strip = strip;
      strip.appendChild(api.el('div', 'lds-wall lds-wall-a'));
      strip.appendChild(api.el('div', 'lds-wall lds-wall-b'));
      /* the three posts, and NOTHING else on the strip */
      this._posts = [];
      for (var i = 0; i < GEO.POSTS; i++) {
        var p = api.el('div', 'lds-post');
        p.style.left = (i / (GEO.POSTS - 1) * 100) + '%';
        strip.appendChild(p);
        this._posts.push(p);
      }
      this._wedge = api.el('div', 'lds-wedge');
      arena.appendChild(strip);
      arena.appendChild(this._wedge);

      this._ends = [api.el('div', 'lds-end lds-end-a'), api.el('div', 'lds-end lds-end-b')];
      arena.appendChild(this._ends[0]);
      arena.appendChild(this._ends[1]);

      /* tap anywhere on the strip — with real buttons under it so the
         same act is reachable by keyboard and by assistive tech */
      strip.addEventListener('pointerdown', function (e) {
        var r = strip.getBoundingClientRect();
        if (!r.width) return;
        self._move(self.aim(null, (e.clientX - r.left) / r.width), GEO.SND_PLACE);
      });

      card.appendChild(arena);

      /* the trace: three columns, one per post. Counts only. */
      this._trace = api.el('div', 'lds-trace');
      this._traceCols = [];
      for (var k = 0; k < GEO.POSTS; k++) {
        var col = api.el('div', 'lds-tcol');
        var fill = api.el('div', 'lds-tfill');
        col.appendChild(fill);
        this._trace.appendChild(col);
        this._traceCols.push(fill);
      }
      card.appendChild(this._trace);

      var bar = api.el('div', 'lds-bar');
      this._btn = {};
      this._btn.p0 = this._mk(bar, 'lds-b-p0 lds-b-post', '', 'postLow');
      this._btn.p1 = this._mk(bar, 'lds-b-p1 lds-b-post', '', 'postMid');
      this._btn.p2 = this._mk(bar, 'lds-b-p2 lds-b-post', '', 'postHigh');
      this._btn.l10 = this._mk(bar, 'lds-b-l10', '−' + GEO.NUDGE_BIG, 'less10');
      this._btn.l1 = this._mk(bar, 'lds-b-l1', '−', 'less1');
      this._btn.r1 = this._mk(bar, 'lds-b-r1', '+', 'more1');
      this._btn.r10 = this._mk(bar, 'lds-b-r10', '+' + GEO.NUDGE_BIG, 'more10');
      this._btn.place = this._mk(bar, 'lds-b-place', '▼', 'place');
      this._btn.rerule = this._mk(bar, 'lds-b-rerule', '⌗', 'rerule');
      this._btn.back = this._mk(bar, 'lds-b-back', '↰', 'back');
      this._btn.next = this._mk(bar, 'lds-b-next', '↻', 'next');
      this._btn.print = this._mk(bar, 'lds-b-print', '⎙', 'printBtn');

      /* each post button draws the strip in miniature with ITS post
         filled — no words, and the child can see which one is which */
      [0, 1, 2].forEach(function (i) {
        var b = self._btn['p' + i];
        var mini = api.el('span', 'lds-pmini');
        var dot = api.el('span', 'lds-pdot');
        dot.style.left = (i / (GEO.POSTS - 1) * 100) + '%';
        mini.appendChild(dot);
        b.appendChild(mini);
        b.addEventListener('click', function () { self._move(self.choosePost(null, i), GEO.SND_POST); });
      });
      this._btn.l10.addEventListener('click', function () { self._move(self.nudge(null, -GEO.NUDGE_BIG), GEO.SND_PLACE); });
      this._btn.l1.addEventListener('click', function () { self._move(self.nudge(null, -GEO.NUDGE_SMALL), GEO.SND_PLACE); });
      this._btn.r1.addEventListener('click', function () { self._move(self.nudge(null, GEO.NUDGE_SMALL), GEO.SND_PLACE); });
      this._btn.r10.addEventListener('click', function () { self._move(self.nudge(null, GEO.NUDGE_BIG), GEO.SND_PLACE); });
      this._btn.place.addEventListener('click', function () { self._commit(); });
      this._btn.rerule.addEventListener('click', function () { self._move(self.rerule(null), GEO.SND_RERULE, GEO.T_RERULE); });
      this._btn.back.addEventListener('click', function () { self._move(self.back(null), GEO.SND_RERULE, GEO.T_RERULE); });
      this._btn.next.addEventListener('click', function () { self._next(); });
      this._btn.print.addEventListener('click', function () { self._print(); });
      this._plaque.addEventListener('click', function () { if (self.st.phase === 'place') self._commit(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);
      this._bar = bar;
      this._sheet = api.el('div', 'lds-sheet');
      wrap.appendChild(this._sheet);
      api.stage.appendChild(wrap);
    },

    _mk: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'lds-btn ' + cls);
      b.type = 'button';
      if (glyph) b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    _move: function (next, snd, dur) {
      if (!next) { this._refuse(); return; }
      this.st = next;
      this._paint(dur);
      this._snd(snd);
      this._say();
    },

    _commit: function () {
      var api = this.api, self = this;
      var next = this.commit(null);
      if (!next) { this._refuse(); return; }
      var guess = this.st.guess;
      this.st = next;
      this._paint();
      this._snd(GEO.SND_PLACE);
      /* ⭐ THE BEAT, and it does NOT go through _dur(): the class has to
         commit out loud before the strip answers, and a wait is not
         movement. ⚠ And the reveal that follows is ONE duration for
         every guess — a reveal that took longer for a worse guess would
         put the verdict in the time channel, where no colour, shape or
         contrast audit could ever see it. */
      this._wedge.classList.remove('is-on');
      window.setTimeout(function () {
        self._wedge.classList.add('is-on');
        self._snd(GEO.SND_REVEAL, true);
        api.announce(self._fmt(api.t('saidTruth'), { t: self._num(self.st.n), n: self._num(guess) }));
      }, GEO.T_BEAT);
    },

    _next: function () {
      var s = this.st;
      this.st = {
        lo: s.lo, hi: s.hi, top: s.top, n: null, phase: 'empty',
        post: null, guess: null, depth: s.depth, trace: s.trace.slice()
      };
      this._deal();
      this._wedge.classList.remove('is-on');
      this._paint(GEO.T_ARRIVE);
      this._snd(GEO.SND_POST);
      this._say();
    },

    _refuse: function () {
      var api = this.api, self = this, a = this._arena;
      this._snd(GEO.SND_REFUSE);
      if (a) {
        a.classList.add('is-refuse');
        window.setTimeout(function () { a.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      var s = this.st;
      api.announce(s.phase === 'shown' && (s.hi - s.lo) <= GEO.DECADE
        ? api.t('saidNoRerule')
        : this._fmt(api.t('saidEnd'), { n: this._num(s.hi) }));
    },

    _say: function () {
      var api = this.api, s = this.st;
      if (s.phase === 'post') { api.announce(this._fmt(api.t('saidArrive'), { n: this._num(s.n) })); return; }
      if (s.phase === 'place' && s.guess === this.postValue(s, s.post)) {
        api.announce(this._fmt(api.t('saidPost'), { p: this._num(this.postValue(s, s.post)) }));
        return;
      }
      if (s.phase === 'place') { api.announce(this._fmt(api.t('saidMoved'), { n: this._num(s.guess) })); return; }
      if (s.depth > 0) { api.announce(this._fmt(api.t('saidRerule'), { a: this._num(s.lo), b: this._num(s.hi) })); return; }
      api.announce(this._fmt(api.t('saidBack'), { a: this._num(s.lo), b: this._num(s.hi) }));
    },

    /* ---- painting -------------------------------------------------- */

    _paint: function (dur) {
      var api = this.api, s = this.st, i;
      var d = this._dur(dur || GEO.T_COMMIT);

      this._strip.setAttribute('aria-label', api.t('ariaStrip'));
      this._ends[0].textContent = this._num(s.lo);
      this._ends[1].textContent = this._num(s.hi);

      /* the plaque: hollow while it is only a guess */
      var showPlaque = s.n != null;
      this._plaque.style.display = showPlaque ? '' : 'none';
      if (showPlaque) {
        this._plaque.textContent = this._num(s.n);
        var at = s.guess == null ? 0.5 : this.frac(s, s.guess);
        this._plaque.style.transitionDuration = d + 'ms';
        this._plaque.style.left = (at * 100) + '%';
        this._plaque.classList.toggle('is-free', s.phase === 'post');
        this._plaque.setAttribute('aria-label',
          this._fmt(api.t('ariaPlaque'), { n: this._num(s.guess == null ? s.n : s.guess) }));
      }

      /* the truth: a SOLID wedge BELOW the strip. ⚠ Side and fill carry
         the difference, never hue — `#A34122` and `#146B5E` differ by
         1.01:1 and are metamers in greyscale, so a design that told
         guess from truth by colour would be invisible in monochrome
         while passing every per-mark contrast check. */
      var shown = s.phase === 'shown';
      this._wedge.style.display = shown ? '' : 'none';
      if (shown) {
        this._wedge.style.transitionDuration = this._dur(GEO.T_REVEAL) + 'ms';
        this._wedge.style.left = (this.frac(s, s.n) * 100) + '%';
        this._wedge.setAttribute('aria-label', api.t('ariaTruth'));
      }

      /* the trace — counts per post, and nothing else */
      var total = Math.max(1, s.trace[0] + s.trace[1] + s.trace[2]);
      this._trace.setAttribute('aria-label', api.t('ariaTrace'));
      for (i = 0; i < GEO.POSTS; i++) {
        this._traceCols[i].style.height = (s.trace[i] / total * 100) + '%';
        this._traceCols[i].classList.toggle('is-some', s.trace[i] > 0);
      }

      /* the parent strip in miniature, only when we are inside a ten */
      this._mini.classList.toggle('is-on', s.depth > 0);
      if (s.depth > 0) {
        this._mini.textContent = '';
        var band = api.el('span', 'lds-mband');
        band.style.left = (s.lo / s.top * 100) + '%';
        band.style.width = ((s.hi - s.lo) / s.top * 100) + '%';
        this._mini.appendChild(band);
      }

      for (i = 0; i < GEO.POSTS; i++) {
        this._btn['p' + i].classList.toggle('is-on', s.post === i);
        this._btn['p' + i].classList.toggle('is-off', s.phase !== 'post');
        this._btn['p' + i].setAttribute('aria-pressed', s.post === i ? 'true' : 'false');
      }
      this._btn.l10.classList.toggle('is-off', !this.nudge(null, -GEO.NUDGE_BIG));
      this._btn.l1.classList.toggle('is-off', !this.nudge(null, -GEO.NUDGE_SMALL));
      this._btn.r1.classList.toggle('is-off', !this.nudge(null, GEO.NUDGE_SMALL));
      this._btn.r10.classList.toggle('is-off', !this.nudge(null, GEO.NUDGE_BIG));
      this._btn.place.classList.toggle('is-off', s.phase !== 'place');
      this._btn.rerule.classList.toggle('is-off', !this.rerule(null));
      this._btn.back.classList.toggle('is-off', !this.back(null));
      this._btn.print.classList.toggle('is-paid', !!this.premium);
    },

    /* ================= entitlement ================================== */

    _checkEntitlement: function () {
      var self = this;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) { /* ⚠ degrade to the FREE TIER, never to nothing —
                       the whole apparatus is free anyway. */ }
    },

    _gate: function () {
      var api = this.api, self = this;
      if (this._gateEl && this._gateEl.parentNode) return;
      var g = api.el('div', 'lds-gate is-on');
      var box = api.el('div', 'lds-gate-box');
      var h = api.el('h2', 'lds-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'lds-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'lds-gate-cta');
      a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'lds-gate-x');
      c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
    },

    /* ================= the paper strips ============================= */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('lds-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('lds-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('lds-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i, k;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'lds-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'lds-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      for (i = 0; i < 4; i++) {
        var row = api.el('div', 'lds-p-strip');
        for (k = 0; k < GEO.POSTS; k++) {
          var post = api.el('span', 'lds-p-post');
          post.style.left = (k / (GEO.POSTS - 1) * 100) + '%';
          row.appendChild(post);
        }
        s.appendChild(row);
      }
    }
  };

  function injectCSS() {
    var css = ''
      + 'html.lds-scroll{overflow-y:auto;}'
      + 'body.lds-scroll{overflow-y:auto;}'

      + '.lds-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.lds-card{container-type:inline-size;width:100%;max-width:860px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(14px,3cqw,30px);--lds-h:clamp(30px,7cqw,58px);}'

      /* the parent strip, drawn identically at a tenth the height */
      + '.lds-mini{position:relative;height:10px;margin:0 0 10px;border-radius:3px;'
      + 'background-color:#EFE2C9;visibility:hidden;}'
      + '.lds-mini.is-on{visibility:visible;}'
      + '.lds-mband{position:absolute;top:0;bottom:0;background-color:#146B5E;border-radius:3px;}'

      + '.lds-arena{position:relative;padding:calc(var(--lds-h) * 1.5) 0 calc(var(--lds-h) * 1.3);}'
      + '.lds-arena.is-refuse .lds-strip{border-color:#A34122;}'

      /* ⚠ NO TICKS. A ticked strip would carry different furniture after
         the re-rule, which is the opposite of self-similarity. */
      /* ⚠⚠ THE WALLS ARE CHILDREN, NOT BORDERS. A thick left/right
         border shrinks the strip's CONTENT box, so a post at `left:0%`
         lands inside the wall while the plaque and the wedge — which are
         positioned against the ARENA — do not. That is two expressions
         that were never meant to agree, and it measured as a 2.3% drift
         at 360px: #43's two-circles defect in a new dress. One
         coordinate space for every mark. */
      + '.lds-strip{position:relative;height:var(--lds-h);border-radius:6px;'
      /* ⚠ AN INSET SHADOW, NOT A BORDER. Even a 2px border shrinks the
         content box, so a post at left:0% sits 2px inside where the
         plaque at left:0% sits. Two numbers agreeing to within a
         tolerance is a coincidence waiting to end (#43); an inset
         shadow makes the content box and the border box IDENTICAL, so
         every mark on this apparatus shares one coordinate space
         exactly rather than approximately. */
      + 'box-shadow:inset 0 0 0 2px #146B5E;'
      + 'background-color:#FBF3E4;}'
      + '.lds-wall{position:absolute;top:0;bottom:0;width:7px;'
      + 'background-color:#0D4E44;border-radius:3px;}'
      + '.lds-wall-a{left:0;}'
      + '.lds-wall-b{right:0;}'
      + '.lds-post{position:absolute;top:12%;bottom:12%;width:3px;margin-left:-1.5px;'
      + 'background-color:#146B5E;border-radius:2px;}'

      /* ⚠ BELOW the wedge's row, not in it. The wedge for a number at an
         END of the strip lands exactly where that end's numeral sits, and
         the two drew on top of each other — a truth mark hidden behind a
         label. Found by reading the render; no per-box gate can see a
         COLLISION between two boxes that each pass on their own. */
      + '.lds-end{position:absolute;bottom:0;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;color:#0E5147;'
      + 'font-size:calc(var(--lds-h) * .46);line-height:1;}'
      + '.lds-end-a{left:0;}'
      + '.lds-end-b{right:0;}'

      /* the class's guess: HOLLOW plaque ABOVE the strip */
      + '.lds-plaque{position:absolute;top:calc(var(--lds-h) * .10);transform:translateX(-50%);'
      + 'min-width:calc(var(--lds-h) * 1.25);min-height:44px;padding:2px 8px;'
      + 'border:2.5px solid #146B5E;border-radius:10px;background-color:#FBF3E4;color:#0E5147;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
      + 'font-size:calc(var(--lds-h) * .52);line-height:1.1;cursor:pointer;'
      + 'transition-property:left;transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.lds-plaque::after{content:"";position:absolute;left:50%;top:100%;transform:translateX(-50%);'
      + 'border-left:7px solid transparent;border-right:7px solid transparent;'
      + 'border-top:9px solid #146B5E;}'
      + '.lds-plaque.is-free{border-style:dashed;}'
      + '.lds-plaque:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'

      /* the truth: a SOLID wedge BELOW the strip. Side + fill, never hue. */
      + '.lds-wedge{position:absolute;left:50%;bottom:calc(var(--lds-h) * .34);'
      + 'transform:translateX(-50%);width:0;height:0;opacity:0;'
      + 'border-left:11px solid transparent;border-right:11px solid transparent;'
      + 'border-bottom:15px solid #0D4E44;'
      + 'transition-property:left,opacity;transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.lds-wedge.is-on{opacity:1;}'

      /* the trace: three columns, counts only — no distance, no rank */
      + '.lds-trace{display:flex;align-items:flex-end;justify-content:space-between;'
      + 'height:34px;margin-top:10px;padding:0 2px;}'
      + '.lds-tcol{position:relative;width:22%;height:100%;display:flex;align-items:flex-end;}'
      + '.lds-tfill{width:100%;background-color:#E7DCC8;border-radius:3px 3px 0 0;}'
      /* ⚠ a zero column draws NOTHING. With a min-height and a border it
         drew three little rules under the strip that read as broken
         furniture rather than as a tally of nothing. */
      + '.lds-tfill.is-some{min-height:3px;border-bottom:2px solid #146B5E;}'

      + '.lds-bar{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.lds-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;font-weight:600;line-height:1;}'
      + '.lds-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.lds-btn.is-off{opacity:.42;}'
      + '.lds-b-post{min-width:64px;}'
      + '.lds-b-post.is-on{background-color:#146B5E;}'
      + '.lds-b-post.is-on .lds-pmini{background-color:#FBF3E4;}'
      + '.lds-pmini{position:relative;display:block;width:44px;height:9px;border-radius:3px;'
      + 'background-color:#E7DCC8;border:1px solid #146B5E;}'
      + '.lds-pdot{position:absolute;top:-3px;bottom:-3px;width:5px;margin-left:-2.5px;'
      + 'background-color:#F2784B;border:1px solid #A34122;border-radius:2px;}'
      + '.lds-b-print{border-style:dashed;margin-left:10px;}'
      + '.lds-b-print.is-paid{border-style:solid;}'

      + '.lds-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.lds-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.lds-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.lds-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.lds-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.lds-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.lds-sheet{display:none;}'
      /* ⚠ SCOPED to a class the sheet itself adds — an unscoped
         @media print block prints a BLANK PAGE for everybody who
         presses Ctrl+P. */
      + '@media print{'
      + 'body.lds-printing *{visibility:hidden;}'
      + 'body.lds-printing .lds-sheet,body.lds-printing .lds-sheet *{visibility:visible;}'
      + 'body.lds-printing .lds-wrap>.lds-card,body.lds-printing .lds-bar{display:none !important;}'
      + 'body.lds-printing .lds-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.lds-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.lds-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.lds-p-strip{position:relative;height:14mm;width:170mm;margin:0 0 10mm;'
      + 'border:1pt solid #000;border-left-width:3pt;border-right-width:3pt;}'
      + '.lds-p-post{position:absolute;top:2mm;bottom:2mm;width:1pt;margin-left:-0.5pt;background-color:#000;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-lds', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.LandingStrip = LandingStrip;
  if (typeof module !== 'undefined' && module.exports) module.exports = LandingStrip;
}());
