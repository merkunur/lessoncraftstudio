/* =====================================================================
   TOOL #53 — THE PAIR GATE
   =====================================================================
   A parade of marchers, an archway wide enough for exactly N of them,
   and a yard on the far side. The class predicts whether everybody will
   get through; only then does the bar lift. Ranks are called one at a
   time, and when fewer than N are left, THE ARCHWAY REFUSES. What is
   left standing is not marked in any way — instead the EMPTY SEAT beside
   it is drawn, which is the whole difference between "left over" and
   "wrong".

   ⭐⭐ THEN THE THEOREM. A second parade arrives from below. Both
   leftovers step onto THE SILL — a plate exactly as wide as the archway
   and as every rank plate, drawn from the first frame. A full plate is a
   rank, and a rank goes through. Odd + odd = even, and the child watched
   the reason rather than the result.

   ⚖️ THE FENCE RETURNED "NOTHING SURVIVES", AND SO DID THE v4 REJECTED
   LIST TWO YEARS EARLIER. Both are recorded here rather than answered.
   `docs/claude-md/premium-tools-v4.md:678` already refused this idea by
   name — "The Pairing Rail … odd/even is a UNIT, NOT A YEAR (gate 2),
   and the repertoire tops out around 30" — and the fence found the
   shelf-life objection was the LESSER one:
   - ⭐⭐ `lids.js` (#39) IS the N-abreast gate with a different skin.
     MIN_LIDS 2, MAX_LIDS 4, `Math.floor(s.n / k)`, and its own docblock:
     "THE REMAINDER IS HONEST… it stays on the table and is the most
     interesting thing on it." My escape from the rejection was built.
   - ⭐ Printable K-016 already ships the pairing WITH the visible loner
     in eleven languages — "two-column pairing layout makes the leftover
     visible", `data-lcs-leftover="1"`. So the pitch's claim that
     "nothing anywhere animates the pairing" is FALSE on two surfaces and
     true only of the word "animates".
   - `compare-balance-core` owns child-made 1:1 pairing whose leftover IS
     the answer; 2.OA.C.3 is choice-board's, in eleven locales.
   ⚠ #47's rule binds: redefining the deliverable is the operator's call.
   The objections are on the record and the tool is built around what
   they actually showed.

   ⚠⚠ AND THE PRODUCT NAME IS BROKEN TWICE, WHICH IS WHY NO PART IS
   NAMED FOR IT.
   - `gate` is this platform's PAYWALL WORD: fifty-one tools ship
     `gateTitle`/`gateBody`/`gateCta` string keys. A part called the gate
     would be named after the thing that sells the subscription.
   - ⭐⭐ `pair` LITERALLY MEANS "EVEN" IN FRENCH — `choice-board-
     activity.js:142` ships "Ce nombre est-il pair ou impair ?" — and es
     `par`, pt `par`, it `pari` the same. The product name is the ANSWER,
     in four of the eleven languages, in a tool whose question is
     odd-or-even. The English product name is the operator's and stays;
     every locale names the apparatus for the archway instead, and no
     part is called a pair or a gate in any language.
   Also taken: `counter` (lids, all 11), `leftover` (lids' hintLeftover
   ×11), `file` (arrow-strip's FRENCH NAME), `door` (number-hotel),
   `queue`/`rank`/`line-up` (all mean ROW in the Romance and Germanic
   banks). PARTS: THE ARCHWAY · THE PARADE · THE MARCHERS · THE SILL.

   ⚠⚠ "LONER" MEASURED FREE IN ALL ELEVEN AND IS STILL FORBIDDEN.
   Naming the part delivers the verdict the drawing exists to remove. A
   marcher left standing is byte-identical to every other marcher; what
   is drawn is THE EMPTY SEAT BESIDE IT, dashed, in muted `#7A6A55` at
   4.38:1. There is no red and no green in this palette, deliberately —
   so nothing about being left over may look like being wrong.

   ⚠ THE CUTSCENE IS KILLED STRUCTURALLY, not by adding a button.
   The bar is DOWN until the class commits a prediction, so the first
   thing that happens is a judgement rather than an animation; the child
   then calls ONE RANK AT A TIME; and nothing is ever dragged (#41's
   flag scored DEAD on all nine liveness paths, and dragging would also
   collide with `compare-balance-core`'s dragged pairing).
   ⭐ The prediction control would otherwise be #39's consequence-free
   furniture — a control whose only output is its own highlight. Its
   consequence is in ANOTHER element: the bar lifts.

   ⚠ AND THE ART PANEL FOUND TWO DEFECTS WIDER THAN THIS TOOL, recorded
   here because they are worth more than this file:
   - ⭐⭐ `#1E8FD4` on the working surface `#F6EAD3` measures 2.97:1 — the
     palette's own FOCUS colour fails the 3:1 non-text floor on the
     palette's own working surface, almost certainly repo-wide.
   - ⭐ `K-016-odd-or-even-pairs.js:63` draws its leftover in 2.5px
     dashed `#F2784B` = 2.52:1. The one mark carrying that sheet's whole
     point is the least visible thing on it.
   - `#E7DCC8` is 1.23:1 on cream and can never be a load-bearing
     boundary in any tool.

   FREE   the whole apparatus: every width, every rank, the refusal, and
          the sill.
   PAID   the paper parade to cut out and line up.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* ⚠ CAP IS ARITHMETIC, NOT TASTE. The art panel derived it: at a
       row pitch of 82 and a column pitch of 112 in a 1000x1180 field,
       twenty marchers are 18.4px across with a 5.9px row gap at a 320px
       card, and an eleventh row breaks the thumbnail's aspect. The 34px
       canvas floor is a TAP floor and does not bind here, because
       marchers are not tap targets (the #48 ruling).
       ⚠⚠ AND THE FIVE viewBox CONSTANTS THAT DERIVED IT ARE NOT KEPT.
       I declared ROW_PITCH, COL_PITCH, MARCHER, VB_W and VB_H from the
       panel's spec and then built the apparatus in CSS flex rather than
       SVG, so nothing ever read them. That is precisely the
       `exchange-machine` ceremony — five constants no call site reaches,
       made to look shipped by the named-constants convention — and the
       dead-constant law caught all five. The DERIVATION belongs in this
       comment; only the number that is used belongs in the object. */
    CAP: 20,
    MIN_N: 2,
    MAX_N: 5,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips. */
    T_RANK: 420,
    T_BAR: 380,
    T_REFUSE: 200,
    /* ⚠⚠ THE SILL BEAT does NOT pass through _dur(): a wait is not
       movement, and the class must see two leftovers standing on one
       plate BEFORE it becomes a rank, or the theorem reads as a trick. */
    T_SILL: 800,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_CALL: 620,
    SND_THROUGH: 780,
    SND_BAR: 520,
    SND_SILL: 880,
    SND_REFUSE: 300,
    SND_DEBOUNCE: 160
  };

  var PairGate = {

    id: 'pair-gate',

    strings: {
      title: { en: 'The Pair Gate' },
      instruction: { en: 'The archway takes exactly this many abreast. Say first whether everybody will get through, then call them forward a rank at a time and find out.' },

      ariaYard: { en: 'The parade waiting, the archway, and the yard beyond it.' },
      ariaWaiting: { en: '{n} still waiting' },
      ariaThrough: { en: '{n} through, in {r} ranks' },
      ariaStand: { en: '{n} left standing, with an empty place beside them' },
      ariaSill: { en: 'the sill, as wide as the archway' },

      setN: { en: 'How many abreast' },
      n2: { en: 'two' },
      n3: { en: 'three' },
      n4: { en: 'four' },
      n5: { en: 'five' },
      setSize: { en: 'How many are marching' },

      predYes: { en: 'Everybody will get through' },
      predNo: { en: 'Somebody will be left standing' },
      call: { en: 'Call the next rank forward' },
      second: { en: 'Bring the second parade' },
      sill: { en: 'Put them both on the sill' },
      again: { en: 'A new parade' },

      saidPredYes: { en: 'The class says everybody gets through. The bar is up.' },
      saidPredNo: { en: 'The class says somebody will be left standing. The bar is up.' },
      saidRank: { en: '{n} through, {w} still waiting.' },
      saidClear: { en: 'All {n} went through, in {r} ranks of {k}. Nobody was left standing.' },
      saidStand: { en: '{s} left standing, because {n} does not fill a rank of {k}. The archway will not take a part-rank.' },
      saidSecond: { en: 'A second parade of {n}. It leaves {s} standing too.' },
      saidSill: { en: 'Both of them on the sill — and the sill is a full rank, so it goes through. {a} and {b} together made a number that fills the archway exactly.' },
      /* ⭐⭐ AND SOMETIMES IT DOES NOT FILL, WHICH IS THE BETTER LESSON.
         At an archway two abreast, two leftovers ALWAYS make a rank —
         that is odd + odd = even. At three abreast, two leftovers of two
         make four, and four does not fill a rank of three. Hand-driving
         the model found saidSill claiming "fills the archway exactly"
         in a case where sillFull() is false: the model knew and the
         sentence lied. The refusal to pretend is what makes the two-case
         special rather than merely typical. */
      saidSillShort: { en: '{a} and {b} on the sill make {c} — and {c} still does not fill a rank of {k}. Two left-behinds only ever make a full rank when the archway takes two.' },
      saidBarDown: { en: 'Say first what the class thinks will happen. The bar goes up when you have.' },
      saidNoSill: { en: 'The sill only takes those left standing, and there are none.' },
      saidBusy: { en: 'The archway is in use. Start a new parade to change how many go abreast.' },

      gateTitle: { en: 'The paper parade' },
      gateBody: { en: 'The whole apparatus is free — every width, every rank, the refusal and the sill. A Teacher plan adds the paper parade to cut out and line up on a desk, so a child can walk the marchers through an archway they cut themselves.' },
      gateCta: { en: 'See the Teacher plan' },
      gateClose: { en: 'Not now' },

      printBtn: { en: 'Print the paper parade' },
      sheetTitle: { en: 'Paper parade to cut out' },
      sheetNote: { en: 'Cut out the marchers and the archway strip. Line the marchers up and send them through in ranks. When too few are left to fill the archway, leave them standing and draw the empty place beside them — that empty place is what the number is telling you.' }
    },

    settings: [
      { key: 'n', type: 'choice', labelKey: 'setN', options: [
        { value: '2', labelKey: 'n2' }, { value: '3', labelKey: 'n3' },
        { value: '4', labelKey: 'n4' }, { value: '5', labelKey: 'n5' }
      ] }
    ],
    defaults: { n: '2' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM: `through` is derived from `ranks`, never stored beside it,
       so "seven through in three ranks of two" is not a state any
       sequence of presses can produce.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. */

    newState: function (n, total) {
      var k = Math.max(GEO.MIN_N, Math.min(GEO.MAX_N, parseInt(n, 10) || 2));
      var t = Math.max(1, Math.min(GEO.CAP, total || 7));
      return {
        k: k, total: t, ranks: 0,
        pred: null,            /* null | true | false — the class's call */
        second: null,          /* the second parade's total, once brought */
        onSill: 0              /* how many leftovers are standing on the sill */
      };
    },

    _st: function (st) { return st || this.st; },

    /* everything below is DERIVED from ranks, so nothing can disagree */
    through: function (st) { var s = this._st(st); return s.ranks * s.k; },
    waiting: function (st) { var s = this._st(st); return s.total - this.through(s); },
    /* how many will be left standing when the parade can go no further */
    standing: function (st) { var s = this._st(st); return s.total % s.k; },
    done: function (st) { return this.waiting(st) < this._st(st).k; },
    fullRanks: function (st) { var s = this._st(st); return Math.floor(s.total / s.k); },

    /* ---- the moves ------------------------------------------------ */

    /* ⭐ THE PREDICTION IS THE GATE-CONDITION. The bar is down until the
       class commits, so the first thing that happens is a judgement and
       not an animation. And this control is not furniture: its
       consequence is in ANOTHER element — the bar lifts. */
    predict: function (st, yes) {
      var s = this._st(st);
      if (s.pred !== null) return null;
      if (yes !== true && yes !== false) return null;
      return { k: s.k, total: s.total, ranks: 0, pred: yes, second: s.second, onSill: s.onSill };
    },

    barUp: function (st) { return this._st(st).pred !== null; },

    /* call the next rank. ⚠ THE ARCHWAY REFUSES a part-rank — that
       refusal IS the lesson, and the child may press for ever without
       anything calling them wrong. */
    sendRank: function (st) {
      var s = this._st(st);
      if (s.pred === null) return null;
      if (this.waiting(s) < s.k) return null;
      return { k: s.k, total: s.total, ranks: s.ranks + 1, pred: s.pred, second: s.second, onSill: s.onSill };
    },

    /* the second parade, only once the first has gone as far as it can
       and has actually left somebody standing */
    bringSecond: function (st, total) {
      var s = this._st(st);
      if (!this.done(s)) return null;
      if (this.standing(s) === 0) return null;
      if (s.second !== null) return null;
      var t = Math.max(1, Math.min(GEO.CAP, total));
      if (t % s.k === 0) return null;          /* it must leave one too */
      return { k: s.k, total: s.total, ranks: s.ranks, pred: s.pred, second: t, onSill: 0 };
    },

    secondStanding: function (st) {
      var s = this._st(st);
      return s.second === null ? 0 : s.second % s.k;
    },

    /* ⭐⭐ THE SILL. Both leftovers step onto one plate, and the plate is
       exactly as wide as the archway. A full plate is a rank. */
    toSill: function (st) {
      var s = this._st(st);
      if (s.second === null) return null;
      if (s.onSill !== 0) return null;
      var a = this.standing(s), b = this.secondStanding(s);
      if (a + b === 0) return null;
      return { k: s.k, total: s.total, ranks: s.ranks, pred: s.pred, second: s.second, onSill: a + b };
    },

    /* does what is on the sill fill the archway exactly? */
    sillFull: function (st) {
      var s = this._st(st);
      return s.onSill > 0 && s.onSill % s.k === 0;
    },

    /* ⚠ THE WIDTH CANNOT CHANGE MID-PARADE. Reflowing marchers who have
       already gone through as pairs into ranks of three would be a lie
       about what happened. */
    setWidth: function (st, k) {
      var s = this._st(st);
      if (!(k >= GEO.MIN_N && k <= GEO.MAX_N)) return null;
      if (k === s.k) return null;
      if (s.ranks > 0 || s.pred !== null) return null;
      return { k: k, total: s.total, ranks: 0, pred: null, second: null, onSill: 0 };
    },

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('pgt-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. ⚠ `html,body.x{}` is a selector LIST whose
         html half applies unconditionally, which makes the class
         decorative and its mutation unkillable — two adds, one rule
         each. */
      document.documentElement.classList.add('pgt-scroll');
      document.body.classList.add('pgt-scroll');

      this._lastSound = 0;
      this._seed = 11;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.n, this._pick(api.settings.n));
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () {
      this.st = this.newState(this.api.settings.n, this._pick(this.api.settings.n));
      this.render();
    },

    onSettings: function () { this.reset(); },

    /* ⚠ not Math.random: the gate, the probe and the classroom must see
       the same parades, and a screenshot must be reproducible. */
    _rand: function (n) {
      this._seed = (this._seed * 1103515245 + 12345) & 0x7fffffff;
      return this._seed % n;
    },

    /* ⭐ TWO PARADES IN THREE LEAVE SOMEBODY STANDING. A parade that
       always came out even would teach that the archway always works;
       one that never did would teach the opposite. */
    _pick: function (n) {
      var k = Math.max(GEO.MIN_N, Math.min(GEO.MAX_N, parseInt(n, 10) || 2));
      var lo = k + 1, hi = GEO.CAP;
      var v = lo + this._rand(hi - lo + 1);
      if (this._rand(3) === 0 && v % k !== 0) v = v - (v % k);   /* an even one */
      if (v < lo) v = lo;
      return v;
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (f, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(f);
    },

    _fmt: function (s, v) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (v && v[k] != null) ? String(v[k]) : m;
      });
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'pgt-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'pgt-card');
      var arena = api.el('div', 'pgt-arena');
      this._arena = arena;
      arena.setAttribute('role', 'img');

      this._yard = api.el('div', 'pgt-yard');       /* through, beyond the arch */
      this._arch = api.el('div', 'pgt-arch');
      this._bar = api.el('div', 'pgt-bar');
      this._arch.appendChild(this._bar);
      this._wait = api.el('div', 'pgt-wait');       /* still waiting */
      this._sill = api.el('div', 'pgt-sill');
      this._sec = api.el('div', 'pgt-sec');         /* the second parade */

      arena.appendChild(this._yard);
      arena.appendChild(this._arch);
      arena.appendChild(this._wait);
      arena.appendChild(this._sill);
      arena.appendChild(this._sec);
      card.appendChild(arena);

      var bar = api.el('div', 'pgt-ctl');
      this._btn = {};
      this._btn.yes = this._mk(bar, 'pgt-b-yes', '✓', 'predYes');
      this._btn.no = this._mk(bar, 'pgt-b-no', '◦', 'predNo');
      this._btn.call = this._mk(bar, 'pgt-b-call', '▸', 'call');
      this._btn.second = this._mk(bar, 'pgt-b-second', '⇤', 'second');
      this._btn.sill = this._mk(bar, 'pgt-b-sill', '▭', 'sill');
      this._btn.again = this._mk(bar, 'pgt-b-again', '↻', 'again');
      this._btn.print = this._mk(bar, 'pgt-b-print', '⎙', 'printBtn');

      this._btn.yes.addEventListener('click', function () { self._predict(true); });
      this._btn.no.addEventListener('click', function () { self._predict(false); });
      this._btn.call.addEventListener('click', function () { self._call(); });
      this._btn.second.addEventListener('click', function () { self._second(); });
      this._btn.sill.addEventListener('click', function () { self._sillMove(); });
      this._btn.again.addEventListener('click', function () { self.reset(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);
      this._sheet = api.el('div', 'pgt-sheet');
      wrap.appendChild(this._sheet);
      api.stage.appendChild(wrap);
    },

    _mk: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'pgt-btn ' + cls);
      b.type = 'button';
      b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    _predict: function (yes) {
      var next = this.predict(null, yes);
      if (!next) { this._refuse('pred'); return; }
      this.st = next;
      this._paint(GEO.T_BAR);
      this._snd(GEO.SND_BAR);
      this.api.announce(this.api.t(yes ? 'saidPredYes' : 'saidPredNo'));
    },

    _call: function () {
      var api = this.api;
      var next = this.sendRank(null);
      if (!next) { this._refuse(this.st.pred === null ? 'bar' : 'stand'); return; }
      this.st = next;
      this._paint(GEO.T_RANK);
      this._snd(GEO.SND_THROUGH);
      if (this.done(next)) {
        var s = this.standing(next);
        api.announce(s === 0
          ? this._fmt(api.t('saidClear'), { n: next.total, r: next.ranks, k: next.k })
          : this._fmt(api.t('saidStand'), { s: s, n: next.total, k: next.k }));
      } else {
        api.announce(this._fmt(api.t('saidRank'), { n: this.through(next), w: this.waiting(next) }));
      }
    },

    _second: function () {
      var api = this.api;
      var t = this._pick(String(this.st.k));
      if (t % this.st.k === 0) t = t + 1 > GEO.CAP ? t - 1 : t + 1;
      var next = this.bringSecond(null, t);
      if (!next) { this._refuse('second'); return; }
      this.st = next;
      this._paint(GEO.T_RANK);
      this._snd(GEO.SND_CALL);
      api.announce(this._fmt(api.t('saidSecond'), { n: next.second, s: this.secondStanding(next) }));
    },

    _sillMove: function () {
      var api = this.api, self = this;
      var next = this.toSill(null);
      if (!next) { this._refuse('sill'); return; }
      var a = this.standing(this.st), b = this.secondStanding(this.st);
      this.st = next;
      this._paint(GEO.T_RANK);
      this._snd(GEO.SND_SILL);
      /* ⭐ THE BEAT. The class must see two leftovers standing on ONE
         plate before it becomes a rank, or the theorem reads as a trick.
         ⚠ Not through _dur(): a wait is not movement. */
      window.setTimeout(function () {
        self._paint(GEO.T_RANK);
        self._snd(GEO.SND_THROUGH, true);
        api.announce(self.sillFull(self.st)
          ? self._fmt(api.t('saidSill'), { a: a, b: b })
          : self._fmt(api.t('saidSillShort'), { a: a, b: b, c: a + b, k: self.st.k }));
      }, GEO.T_SILL);
    },

    _refuse: function (why) {
      var api = this.api, self = this, a = this._arena;
      this._snd(GEO.SND_REFUSE);
      if (a) {
        a.classList.add('is-refuse');
        window.setTimeout(function () { a.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (why === 'bar') { api.announce(api.t('saidBarDown')); return; }
      if (why === 'sill') { api.announce(api.t('saidNoSill')); return; }
      if (why === 'pred') { api.announce(api.t('saidBusy')); return; }
      var s = this.st;
      api.announce(this._fmt(api.t('saidStand'), { s: this.standing(s), n: s.total, k: s.k }));
    },

    /* ---- painting -------------------------------------------------- */

    _row: function (host, count, k, opts) {
      var api = this.api, i, j;
      while (host.firstChild) host.removeChild(host.firstChild);
      var rows = Math.ceil(count / k) || 0;
      for (i = 0; i < rows; i++) {
        var row = api.el('div', 'pgt-rank');
        for (j = 0; j < k; j++) {
          var idx = i * k + j;
          if (idx < count) {
            row.appendChild(api.el('span', 'pgt-m'));
          } else if (opts && opts.seats) {
            /* ⭐⭐ THE EMPTY SEAT. The marcher left standing is drawn
               byte-identically to every other marcher; what is drawn is
               the PLACE BESIDE IT that nobody filled. Differentiating
               the marcher itself would be the verdict delivered by
               shape, in a palette that deliberately has no red. */
            row.appendChild(api.el('span', 'pgt-seat'));
          }
        }
        host.appendChild(row);
      }
    },

    _paint: function (dur) {
      var api = this.api, s = this.st;
      var d = this._dur(dur || GEO.T_RANK);
      this._arena.style.setProperty('--pgt-t', d + 'ms');
      this._arena.setAttribute('aria-label', api.t('ariaYard'));
      this._arch.style.setProperty('--pgt-k', String(s.k));

      var thru = this.through(s), wait = this.waiting(s);
      this._row(this._yard, thru, s.k, null);
      /* the waiting parade shows the empty seats only on its last,
         short rank — which is exactly where the leftover lives */
      this._row(this._wait, wait, s.k, { seats: this.done(s) });
      this._yard.setAttribute('aria-label', this._fmt(api.t('ariaThrough'), { n: thru, r: s.ranks }));
      this._wait.setAttribute('aria-label', this.done(s) && this.standing(s)
        ? this._fmt(api.t('ariaStand'), { n: this.standing(s) })
        : this._fmt(api.t('ariaWaiting'), { n: wait }));

      this._sec.style.display = s.second === null ? 'none' : '';
      if (s.second !== null) this._row(this._sec, this.secondStanding(s), s.k, { seats: true });

      this._sill.style.display = s.onSill === 0 ? 'none' : '';
      if (s.onSill > 0) {
        this._row(this._sill, s.onSill, s.k, { seats: !this.sillFull(s) });
        this._sill.setAttribute('aria-label', api.t('ariaSill'));
      }
      this._sill.classList.toggle('is-full', this.sillFull(s));

      this._bar.classList.toggle('is-up', this.barUp(s));
      this._btn.yes.classList.toggle('is-off', s.pred !== null);
      this._btn.no.classList.toggle('is-off', s.pred !== null);
      this._btn.yes.setAttribute('aria-pressed', s.pred === true ? 'true' : 'false');
      this._btn.no.setAttribute('aria-pressed', s.pred === false ? 'true' : 'false');
      this._btn.call.classList.toggle('is-off', !this.sendRank(null));
      this._btn.second.classList.toggle('is-off', !this.bringSecond(null, s.k + 1));
      this._btn.sill.classList.toggle('is-off', !this.toSill(null));
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
            var t = j.tier || (j.entitlement && j.entitlement.tier);
            if (!t) return;
            self.premium = t !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) { /* ⚠ degrade to the FREE TIER, never to nothing */ }
    },

    _gate: function () {
      var api = this.api, self = this;
      if (this._gateEl && this._gateEl.parentNode) return;
      var g = api.el('div', 'pgt-gate is-on');
      var box = api.el('div', 'pgt-gate-box');
      var h = api.el('h2', 'pgt-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'pgt-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'pgt-gate-cta'); a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'pgt-gate-x'); c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
    },

    /* ================= the paper parade ============================= */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('pgt-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('pgt-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('pgt-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'pgt-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'pgt-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      for (i = 0; i < GEO.CAP; i++) s.appendChild(api.el('span', 'pgt-p-m'));
      var arch = api.el('div', 'pgt-p-arch');
      s.appendChild(arch);
    }
  };

  function injectCSS() {
    var css = ''
      + 'html.pgt-scroll{overflow-y:auto;}'
      + 'body.pgt-scroll{overflow-y:auto;}'

      + '.pgt-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.pgt-card{container-type:inline-size;width:100%;max-width:860px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(12px,2.6cqw,26px);--pgt-m:clamp(15px,3.4cqw,34px);--pgt-t:420ms;}'

      + '.pgt-arena{position:relative;display:flex;flex-direction:column;align-items:center;'
      + 'gap:calc(var(--pgt-m) * .34);}'
      + '.pgt-arena.is-refuse .pgt-arch{border-color:#A34122;}'

      + '.pgt-yard,.pgt-wait,.pgt-sec,.pgt-sill{display:flex;flex-direction:column;'
      + 'align-items:center;gap:calc(var(--pgt-m) * .26);min-height:calc(var(--pgt-m) * .3);}'
      + '.pgt-rank{display:flex;gap:calc(var(--pgt-m) * .3);}'
      + '.pgt-m{width:var(--pgt-m);height:var(--pgt-m);border-radius:50%;'
      + 'background-color:#146B5E;flex:none;}'
      /* ⭐⭐ THE EMPTY SEAT — dashed, muted, 4.38:1. NOT the marcher. */
      + '.pgt-seat{width:var(--pgt-m);height:var(--pgt-m);border-radius:50%;flex:none;'
      + 'border:2px dashed #7A6A55;box-sizing:border-box;}'

      /* the archway: its opening is exactly k marchers wide */
      + '.pgt-arch{position:relative;width:calc(var(--pgt-k) * var(--pgt-m) '
      + '+ (var(--pgt-k) - 1) * var(--pgt-m) * .3 + var(--pgt-m) * .7);'
      + 'height:calc(var(--pgt-m) * 1.15);border:3px solid #146B5E;border-bottom:0;'
      + 'border-radius:calc(var(--pgt-m) * .6) calc(var(--pgt-m) * .6) 0 0;}'
      + '.pgt-bar{position:absolute;left:-3px;right:-3px;bottom:0;height:calc(var(--pgt-m) * .22);'
      + 'background-color:#0D4E44;border-radius:3px;'
      + 'transition-property:transform,opacity;transition-duration:var(--pgt-t);'
      + 'transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.pgt-bar.is-up{transform:translateY(calc(var(--pgt-m) * -.95));opacity:.25;}'

      /* the sill: a plate exactly as wide as the archway */
      + '.pgt-sill{padding:calc(var(--pgt-m) * .16);border-radius:8px;'
      + 'border:2px solid #7A6A55;}'
      + '.pgt-sill.is-full{border-color:#146B5E;border-width:3px;}'

      + '.pgt-ctl{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.pgt-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;font-weight:600;line-height:1;}'
      /* ⚠ THE FOCUS RING IS DOUBLED. The art panel measured the palette's
         own focus colour #1E8FD4 at 2.97:1 on the working surface —
         under the 3:1 non-text floor, on the palette's own surface, and
         almost certainly repo-wide. A deep-teal outer ring carries the
         contrast while the blue stays the recognisable focus colour. */
      + '.pgt-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;'
      + 'box-shadow:0 0 0 6px #0D4E44;}'
      + '.pgt-btn.is-off{opacity:.42;}'
      + '.pgt-btn[aria-pressed="true"]{background-color:#146B5E;color:#FBF3E4;}'
      + '.pgt-b-print{border-style:dashed;margin-left:10px;}'
      + '.pgt-b-print.is-paid{border-style:solid;}'

      + '.pgt-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.pgt-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.pgt-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.pgt-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.pgt-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.pgt-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.pgt-sheet{display:none;}'
      + '@media print{'
      + 'body.pgt-printing *{visibility:hidden;}'
      + 'body.pgt-printing .pgt-sheet,body.pgt-printing .pgt-sheet *{visibility:visible;}'
      + 'body.pgt-printing .pgt-wrap>.pgt-card,body.pgt-printing .pgt-ctl{display:none !important;}'
      + 'body.pgt-printing .pgt-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.pgt-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.pgt-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.pgt-p-m{display:inline-block;width:14mm;height:14mm;border-radius:50%;'
      + 'border:1pt solid #000;margin:0 3mm 3mm 0;}'
      + '.pgt-p-arch{width:80mm;height:30mm;border:1.5pt solid #000;border-bottom:0;'
      + 'border-radius:12mm 12mm 0 0;margin:8mm 0 0;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-pgt', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.PairGate = PairGate;
  if (typeof module !== 'undefined' && module.exports) module.exports = PairGate;
}());
