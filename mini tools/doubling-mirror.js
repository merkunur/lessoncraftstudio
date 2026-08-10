/* =====================================================================
   TOOL #54 — THE DOUBLING MIRROR
   =====================================================================
   ⚠⚠ IT IS NOT A MIRROR, AND THAT IS THE WHOLE RULING. A hinged tray
   with two leaves. Counters sit on the near leaf; the class says what
   the double will be; the hinge closes and the far leaf receives the
   SAME NUMBER OF REAL COUNTERS. Nothing is reflected, nothing is an
   image, and every object on the tray can be touched and counted once.

   ⚖️ THREE PANELS AND A FOUR-SURFACE FENCE ALL RULED AGAINST THE
   CATALOG'S VERSION, AND EVERY REASON IS RECORDED HERE RATHER THAN
   ANSWERED. #47's rule binds — redefining the deliverable is the
   operator's call, not a panel's — so the tool is built, around what
   the objections actually showed.

   ⭐⭐ THE RULING THAT CHANGED THE APPARATUS: A MIRROR DOUBLES AN
   APPEARANCE, NOT A QUANTITY.
   - It institutionalises the double-count. A child who counts twelve in
     front of a mirror has counted six objects and six appearances — and
     the catalog's OWN A3 entry already bans exactly this: "do not build
     virtual counting … a finger can double-count, and that
     1:1-correspondence failure IS the diagnostic." The pitch made the
     diagnostic failure the intended behaviour.
   - A reflection is CHIRAL. 6+6 is two identical addends; a mirror
     gives 6 and its enantiomorph. The model is only honest while the
     material is chosen to conceal the mirror's defining property — put
     an arrow or a numeral in front of it and it visibly stops copying.
   - The catalog's own 3→6→12→24 chain needs the reflections to become
     real, manipulable objects — at which point it is a duplicator
     wearing glass, and by the v5 anatomy's own rule a skin over a
     mechanism is a STICKER.
   - ⭐ And this platform already tried it: `folding-sheet.js` (#35) was
     "renamed from Mirror Bench by the operator once the design moved to
     the fold", it carries ZERO numerals, and it computes a cell count
     for its gate that it DELIBERATELY NEVER RENDERS. That refusal is
     correct design, and it is the same refusal made here.
   So the glass is gone and a HINGE is in its place — the dissenting
   teacher's own words, "a duplicator or a hinge as its apparatus, never
   glass" — and the fence measured `hinge` FREE in ten of eleven locales
   while `mirror`, `double`, `half`, `fold` and `line` are each taken in
   all eleven. THE PARTS: THE TRAY · THE LEAVES · THE HINGE · THE ODD
   ONE. "Mirror" survives in the product NAME only, which is the
   operator's.

   ⚠⚠ AND "FOR 9 THE LINE CANNOT REST" IS FALSE, WHICH IS WHY THE ODD
   CASE IS A CHOICE RATHER THAN A STALEMATE. Nine counters in a row are
   perfectly symmetric about the centre of the fifth: the line RESTS, it
   simply does not PARTITION. Getting the advertised behaviour would
   need a smuggled rule ("no counter may straddle") that has nothing to
   do with mirrors — and the gate would then have to encode the smuggled
   rule as its own ground truth, which is the gate marking its own
   homework.
   ⭐ So opening an odd tray does not refuse. One counter has no partner,
   and THE CLASS CHOOSES WHICH LEAF IT GOES ON: nine opens to five and
   four. That is true, it is the near-double read backwards, and it is a
   decision instead of a third stalemate — because "the apparatus
   refuses at the boundary" already shipped twice this week, in
   `rounding-hill` (#52) and `pair-gate` (#53), and a third would be a
   tic rather than an invention.

   ⚠ THE HEADLINE CLAIM WAS INVERTED, and the landing copy must not
   repeat it. CCSS 1.OA.C.6 names five strategies; "doubles" is not one
   of them, two of the five are ten-bridging, and the text reads "the
   KNOWN equivalent 6 + 6" — doubles are the INPUT a strategy consumes,
   not the strategy. Make-ten holds the place the pitch gave to doubles.
   ⚠ And "digitally nothing but flashcards" is false: Topmarks' Hit the
   Button ships Doubles and Halves as two of its six top-level
   categories. It is a timed drill, so a no-timer apparatus is still
   differentiated — but the whitespace is not what the pitch claimed.

   ⚠ NO WORDS ON THE APPARATUS (§23.2). Counters and numerals only.
   ⚠ NO SPIEGELBUCH. The hinged multi-mirror was already ruled an
   upgrade mode for its owner at `premium-tools-v5-ideas.md:279`, and
   entry 10 quietly took it back. It belongs to `folding-sheet`.

   FREE   the whole apparatus: every count, the closing, the opening,
          and the odd one's side.
   PAID   the paper tray to cut out and hinge.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* ⚠⚠ CAP = 9, AND IT IS DERIVED RATHER THAN CHOSEN. The art panel
       measured every input: the widest real viewport is 704px (the tool
       page pins the iframe at max-w-3xl less padding, at 1440/1920/2560
       alike); the narrowest usable is 296px; the minimum honest disc
       with no interior feature is 12px, certified by counting-cups' own
       minimum-feature law; and the gap is 0.22d, eleven times the
       house's certified separation. A row of 2a discs then measures
       d*(2.44a + 0.03), so nine fits 296px with 10.8% margin and TEN
       FITS WITH 1.0% — rejected on margin, not on arithmetic, because
       3px of slack at the worst viewport is not a shippable number.
       ⭐ And nine is PRINCIPLED, not merely fitted: it gives doubles
       1+1 through 9+9, near-doubles to 9+10, and every odd count for the
       no-halving case — the complete within-20 doubles family except
       10+10, which `folding-wall.js:134` already retired by its own
       argument: x10 is the place-value system, not a fact. Nobody needs
       a mirror for it. */
    CAP: 9,
    /* a leaf lays its counters out in rows of five, because five is the
       grouping every other tool on this shelf already uses */
    ROW: 5,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips. */
    T_CLOSE: 520,
    T_OPEN: 520,
    T_PLACE: 240,
    T_REFUSE: 200,
    /* ⚠⚠ THE BEAT does NOT pass through _dur(): the class must have
       said the double BEFORE the far leaf fills, and a wait is not
       movement. */
    T_BEAT: 700,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_PLACE: 520,
    SND_CLOSE: 780,
    SND_OPEN: 620,
    SND_SIDE: 880,
    SND_REFUSE: 300,
    /* ⚠ T_, NOT SND_. Every other SND_* here is a FREQUENCY and this
       one is MILLISECONDS — two units under one prefix, distinguishable
       only at the call site. `pair-gate.js:121` and `rounding-hill.js:194`
       both ship that defect and are filed; this tool does not repeat it. */
    T_SND_DEBOUNCE: 160
  };

  var DoublingMirror = {

    id: 'doubling-mirror',

    strings: {
      title: { en: 'The Doubling Mirror' },
      instruction: { en: 'Put counters on the near leaf and say what the double will be. Then close the hinge — the far leaf gets the same number again, and you can count every one of them.' },

      ariaTray: { en: 'A tray with two leaves and a hinge between them.' },
      ariaNear: { en: 'the near leaf, {n}' },
      ariaFar: { en: 'the far leaf, {n}' },
      ariaOdd: { en: 'one counter with no partner, waiting for a side' },

      setStart: { en: 'What the tray starts with' },
      startSmall: { en: 'a few counters' },
      startTen: { en: 'up to ten' },

      addOne: { en: 'Put another counter on the near leaf' },
      takeOne: { en: 'Take a counter off the near leaf' },
      close: { en: 'Close the hinge' },
      open: { en: 'Open the hinge' },
      sideLow: { en: 'Give the odd one to the near leaf' },
      sideHigh: { en: 'Give the odd one to the far leaf' },
      again: { en: 'Clear the tray' },

      saidPlace: { en: '{n} on the near leaf.' },
      saidClosed: { en: '{n} and {n} on the tray. {d} altogether.' },
      saidOpened: { en: '{t} opens into {a} and {a}.' },
      saidOddWaiting: { en: '{t} will not open into two equal leaves. One counter has no partner — which leaf should this class give it to?' },
      saidOddPlaced: { en: '{t} opens into {a} and {b}. The odd one went to the {s} leaf, so this is a double and one more.' },
      saidEmpty: { en: 'There is nothing on the tray yet.' },
      saidFull: { en: 'The near leaf holds {n}, and that is as many as it takes.' },
      saidAlreadyClosed: { en: 'The hinge is already closed. Open it to take the tray apart again.' },
      saidAlreadyOpen: { en: 'The hinge is already open.' },

      gateTitle: { en: 'The paper tray' },
      gateBody: { en: 'The whole apparatus is free — every count, the closing, the opening and the odd one\'s side. A Teacher plan adds the paper tray to cut out and hinge, so a child can lay real counters on both leaves and bend it shut themselves.' },
      gateCta: { en: 'See the Teacher plan' },
      gateClose: { en: 'Not now' },

      printBtn: { en: 'Print the paper tray' },
      sheetTitle: { en: 'Paper tray to cut out and hinge' },
      sheetNote: { en: 'Cut out the tray and score along the middle so it bends. Lay counters on one leaf, say what the double will be, then bend the other leaf over and lay the same number again. Count them all — the tray never makes a counter, you do.' }
    },

    settings: [
      { key: 'start', type: 'choice', labelKey: 'setStart', options: [
        { value: 'few', labelKey: 'startSmall' },
        { value: 'ten', labelKey: 'startTen' }
      ] }
    ],
    defaults: { start: 'few' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM. The tray holds ONE integer while the hinge is open (`near`)
       and derives everything else, so "seven on one leaf and six on the
       other after a clean close" cannot be produced by any sequence.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. */

    newState: function (start) {
      return {
        near: String(start) === 'ten' ? 7 : 3,
        closed: false,
        /* the odd one, only ever after an odd tray is opened:
           null when there is none, -1 near leaf, +1 far leaf, 0 waiting */
        odd: null,
        /* the total the tray was carrying when it was opened, so the
           odd case can describe itself honestly */
        opened: null
      };
    },

    _st: function (st) { return st || this.st; },

    /* ⭐ THE FAR LEAF IS REAL, AND IT IS DERIVED, so it can never
       disagree with the near one. */
    far: function (st) {
      var s = this._st(st);
      if (!s.closed) return 0;
      if (s.odd === null) return s.near;
      return s.near + (s.odd > 0 ? 1 : 0);
    },
    nearShown: function (st) {
      var s = this._st(st);
      return s.near + (s.closed && s.odd !== null && s.odd < 0 ? 1 : 0);
    },
    total: function (st) {
      var s = this._st(st);
      if (!s.closed) return s.near;
      return this.nearShown(s) + this.far(s);
    },
    /* is there an odd counter still waiting for a side? */
    waiting: function (st) { return this._st(st).odd === 0; },

    /* ---- the moves ------------------------------------------------ */

    place: function (st, d) {
      var s = this._st(st);
      if (s.closed) return null;
      var n = s.near + d;
      if (n < 0 || n > GEO.CAP) return null;
      return { near: n, closed: false, odd: null, opened: null };
    },

    /* close the hinge: the far leaf receives the SAME number of real
       counters. Nothing is reflected and nothing is an image. */
    close: function (st) {
      var s = this._st(st);
      if (s.closed) return null;
      if (s.near === 0) return null;
      return { near: s.near, closed: true, odd: null, opened: null };
    },

    /* ⭐⭐ OPEN. An even tray splits cleanly. An ODD tray does NOT refuse
       — one counter has no partner and the class chooses its leaf. */
    open: function (st, total) {
      var s = this._st(st);
      var t = total == null ? this.total(s) : total;
      if (!s.closed && total == null) return null;
      if (t < 2 || t > GEO.CAP * 2) return null;
      var half = Math.floor(t / 2);
      if (t % 2 === 0) return { near: half, closed: true, odd: null, opened: t };
      return { near: half, closed: true, odd: 0, opened: t };
    },

    /* ⭐⭐ THE ODD ONE GETS A LEAF, AND ONLY EVER ONE OF THEM. dir -1
       near, +1 far.
       ⚠ THE APPARATUS CAN EXPRESS n+n AND n+(n+1) AND NOTHING ELSE, and
       that is the art panel's best finding: it came out of the
       constraint rather than out of taste. A second outsider is REFUSED,
       so the material itself forbids the off-family sums — which is
       §23.2's "the material pushes back" stated as a fact about the
       furniture rather than as a rule about the child. */
    giveSide: function (st, dir) {
      var s = this._st(st);
      if (s.odd !== 0) return null;
      if (dir !== -1 && dir !== 1) return null;
      return { near: s.near, closed: true, odd: dir, opened: s.opened };
    },

    /* how many counters are standing outside the pair-up. NEVER more
       than one, by construction: `odd` is a single token, so "two left
       over" is not a state this model can hold. */
    outside: function (st) { return this._st(st).odd === null ? 0 : 1; },

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('dbm-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. ⚠ `html,body.x{}` is a selector LIST whose
         html half applies unconditionally, which makes the class
         decorative and its mutation unkillable — two adds, one rule. */
      document.documentElement.classList.add('dbm-scroll');
      document.body.classList.add('dbm-scroll');
      this._lastSound = 0;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.start);
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () { this.st = this.newState(this.api.settings.start); this.render(); },
    onSettings: function () { this.reset(); },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (f, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.T_SND_DEBOUNCE) return;
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

      var wrap = api.el('div', 'dbm-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'dbm-card');
      var tray = api.el('div', 'dbm-tray');
      tray.setAttribute('role', 'img');
      this._tray = tray;

      this._nearEl = api.el('div', 'dbm-leaf dbm-near');
      this._hinge = api.el('div', 'dbm-hinge');
      this._farEl = api.el('div', 'dbm-leaf dbm-far');
      this._oddEl = api.el('div', 'dbm-odd');
      tray.appendChild(this._nearEl);
      tray.appendChild(this._hinge);
      tray.appendChild(this._farEl);
      card.appendChild(tray);
      card.appendChild(this._oddEl);

      var bar = api.el('div', 'dbm-ctl');
      this._btn = {};
      this._btn.less = this._mk(bar, 'dbm-b-less', '−', 'takeOne');
      this._btn.more = this._mk(bar, 'dbm-b-more', '+', 'addOne');
      this._btn.close = this._mk(bar, 'dbm-b-close', '⇥', 'close');
      this._btn.open = this._mk(bar, 'dbm-b-open', '⇤', 'open');
      this._btn.low = this._mk(bar, 'dbm-b-low', '◧', 'sideLow');
      this._btn.high = this._mk(bar, 'dbm-b-high', '◨', 'sideHigh');
      this._btn.again = this._mk(bar, 'dbm-b-again', '↻', 'again');
      this._btn.print = this._mk(bar, 'dbm-b-print', '⎙', 'printBtn');

      this._btn.less.addEventListener('click', function () { self._place(-1); });
      this._btn.more.addEventListener('click', function () { self._place(1); });
      this._btn.close.addEventListener('click', function () { self._close(); });
      this._btn.open.addEventListener('click', function () { self._open(); });
      this._btn.low.addEventListener('click', function () { self._side(-1); });
      this._btn.high.addEventListener('click', function () { self._side(1); });
      this._btn.again.addEventListener('click', function () { self.reset(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);
      this._sheet = api.el('div', 'dbm-sheet');
      wrap.appendChild(this._sheet);
      api.stage.appendChild(wrap);
    },

    _mk: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'dbm-btn ' + cls);
      b.type = 'button';
      b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    _place: function (d) {
      var next = this.place(null, d);
      if (!next) { this._refuse(this.st.closed ? 'closed' : (d < 0 ? 'empty' : 'full')); return; }
      this.st = next;
      this._paint(GEO.T_PLACE);
      this._snd(GEO.SND_PLACE);
      this.api.announce(this._fmt(this.api.t('saidPlace'), { n: next.near }));
    },

    _close: function () {
      var api = this.api, self = this;
      var next = this.close(null);
      if (!next) { this._refuse(this.st.closed ? 'closed' : 'empty'); return; }
      var n = next.near;
      this.st = next;
      this._paint(GEO.T_CLOSE);
      this._snd(GEO.SND_CLOSE);
      /* ⭐ THE BEAT. The class must have said the double BEFORE the far
         leaf is countable, or the tray answered its own question.
         ⚠ Not through _dur(): a wait is not movement. */
      window.setTimeout(function () {
        api.announce(self._fmt(api.t('saidClosed'), { n: n, d: n * 2 }));
      }, GEO.T_BEAT);
    },

    _open: function () {
      var api = this.api;
      var next = this.open(null);
      if (!next) { this._refuse('open'); return; }
      var t = next.opened;
      this.st = next;
      this._paint(GEO.T_OPEN);
      this._snd(GEO.SND_OPEN);
      api.announce(this.waiting(next)
        ? this._fmt(api.t('saidOddWaiting'), { t: t })
        : this._fmt(api.t('saidOpened'), { t: t, a: next.near }));
    },

    _side: function (dir) {
      var api = this.api;
      var next = this.giveSide(null, dir);
      if (!next) { this._refuse('side'); return; }
      this.st = next;
      this._paint(GEO.T_PLACE);
      this._snd(GEO.SND_SIDE);
      api.announce(this._fmt(api.t('saidOddPlaced'), {
        t: next.opened, a: this.nearShown(next), b: this.far(next),
        s: dir < 0 ? '1' : '2'
      }));
    },

    _refuse: function (why) {
      var api = this.api, self = this, t = this._tray, s = this.st;
      this._snd(GEO.SND_REFUSE);
      if (t) {
        t.classList.add('is-refuse');
        window.setTimeout(function () { t.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (why === 'full') { api.announce(this._fmt(api.t('saidFull'), { n: GEO.CAP })); return; }
      if (why === 'empty') { api.announce(api.t('saidEmpty')); return; }
      if (why === 'closed') { api.announce(api.t('saidAlreadyClosed')); return; }
      if (why === 'open') { api.announce(api.t(s.closed ? 'saidEmpty' : 'saidAlreadyOpen')); return; }
      api.announce(api.t('saidAlreadyOpen'));
    },

    /* ---- painting -------------------------------------------------- */

    _fill: function (host, n) {
      var api = this.api, i, row = null;
      while (host.firstChild) host.removeChild(host.firstChild);
      for (i = 0; i < n; i++) {
        if (i % GEO.ROW === 0) { row = api.el('div', 'dbm-row'); host.appendChild(row); }
        row.appendChild(api.el('span', 'dbm-c'));
      }
    },

    _paint: function (dur) {
      var api = this.api, s = this.st;
      this._tray.style.setProperty('--dbm-t', this._dur(dur || GEO.T_PLACE) + 'ms');
      this._tray.setAttribute('aria-label', api.t('ariaTray'));
      this._tray.classList.toggle('is-closed', s.closed);

      var nn = this.nearShown(s), nf = this.far(s);
      this._fill(this._nearEl, nn);
      this._fill(this._farEl, nf);
      this._nearEl.setAttribute('aria-label', this._fmt(api.t('ariaNear'), { n: nn }));
      this._farEl.setAttribute('aria-label', this._fmt(api.t('ariaFar'), { n: nf }));
      this._farEl.style.visibility = s.closed ? '' : 'hidden';

      /* ⭐ THE ODD ONE waits BETWEEN the leaves — not marked, not
         coloured, just unpartnered, because there is no red and no
         green in this palette and being odd is not being wrong. */
      var wait = this.waiting(s);
      this._oddEl.style.visibility = wait ? '' : 'hidden';
      this._fill(this._oddEl, wait ? 1 : 0);
      if (wait) this._oddEl.setAttribute('aria-label', api.t('ariaOdd'));

      this._btn.less.classList.toggle('is-off', !this.place(null, -1));
      this._btn.more.classList.toggle('is-off', !this.place(null, 1));
      this._btn.close.classList.toggle('is-off', !this.close(null));
      this._btn.open.classList.toggle('is-off', !this.open(null));
      this._btn.low.classList.toggle('is-off', !wait);
      this._btn.high.classList.toggle('is-off', !wait);
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
      var g = api.el('div', 'dbm-gate is-on');
      var box = api.el('div', 'dbm-gate-box');
      var h = api.el('h2', 'dbm-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'dbm-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'dbm-gate-cta'); a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'dbm-gate-x'); c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
    },

    /* ================= the paper tray =============================== */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('dbm-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('dbm-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('dbm-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'dbm-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'dbm-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      for (i = 0; i < 2; i++) s.appendChild(api.el('div', 'dbm-p-tray'));
    }
  };

  function injectCSS() {
    var css = ''
      + 'html.dbm-scroll{overflow-y:auto;}'
      + 'body.dbm-scroll{overflow-y:auto;}'

      + '.dbm-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.dbm-card{container-type:inline-size;width:100%;max-width:880px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(12px,2.6cqw,26px);--dbm-c:clamp(16px,3.6cqw,36px);--dbm-t:240ms;}'

      + '.dbm-tray{display:flex;align-items:center;justify-content:center;'
      + 'gap:calc(var(--dbm-c) * .3);min-height:calc(var(--dbm-c) * 4.6);}'
      + '.dbm-tray.is-refuse .dbm-leaf{border-color:#A34122;}'
      /* the two leaves are drawn IDENTICALLY, because the far one holds
         real counters and not an image of the near one */
      + '.dbm-leaf{display:flex;flex-direction:column;align-items:center;justify-content:center;'
      + 'gap:calc(var(--dbm-c) * .22);min-width:calc(var(--dbm-c) * 5.9);'
      + 'min-height:calc(var(--dbm-c) * 4.2);padding:calc(var(--dbm-c) * .3);'
      + 'border:2px solid #146B5E;border-radius:10px;background-color:#FBF3E4;}'
      + '.dbm-row{display:flex;gap:calc(var(--dbm-c) * .22);}'
      + '.dbm-c{width:var(--dbm-c);height:var(--dbm-c);border-radius:50%;'
      + 'background-color:#146B5E;flex:none;}'

      /* the hinge: shut when the tray is closed */
      + '.dbm-hinge{width:calc(var(--dbm-c) * .34);align-self:stretch;border-radius:4px;'
      + 'background-color:#E7DCC8;'
      + 'transition-property:background-color,width;transition-duration:var(--dbm-t);}'
      + '.dbm-tray.is-closed .dbm-hinge{background-color:#0D4E44;width:calc(var(--dbm-c) * .22);}'

      /* ⭐ the odd one sits under the hinge, unpartnered and unmarked */
      + '.dbm-odd{display:flex;justify-content:center;margin-top:calc(var(--dbm-c) * .4);'
      + 'min-height:var(--dbm-c);}'
      + '.dbm-odd .dbm-c{box-shadow:0 0 0 3px #F6EAD3, 0 0 0 5px #7A6A55;}'

      + '.dbm-ctl{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.dbm-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;font-weight:600;line-height:1;}'
      /* ⚠ the focus ring is DOUBLED: a panel measured #1E8FD4 on the
         working surface at 2.97:1, under the 3:1 non-text floor. */
      /* ⚠ THE PLATFORM FOCUS COLOUR FAILS ITS OWN FLOOR. Two panels now
         measure #1E8FD4 on the working surface at 2.97:1, under the 3:1
         non-text minimum, and it is almost certainly repo-wide across
         fifty tools. Deep teal carries the contrast at 8.05:1 and the
         cream offset is what separates it from the teal furniture. A
         focus ring nobody can see is not a focus ring. */
      + '.dbm-btn:focus-visible{outline:3px solid #0D4E44;outline-offset:2px;'
      + 'box-shadow:0 0 0 5px #FBF3E4;}'
      + '.dbm-btn.is-off{opacity:.42;}'
      + '.dbm-b-print{border-style:dashed;margin-left:10px;}'
      + '.dbm-b-print.is-paid{border-style:solid;}'

      + '.dbm-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.dbm-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.dbm-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.dbm-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.dbm-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.dbm-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.dbm-sheet{display:none;}'
      + '@media print{'
      + 'body.dbm-printing *{visibility:hidden;}'
      + 'body.dbm-printing .dbm-sheet,body.dbm-printing .dbm-sheet *{visibility:visible;}'
      + 'body.dbm-printing .dbm-wrap>.dbm-card,body.dbm-printing .dbm-ctl{display:none !important;}'
      + 'body.dbm-printing .dbm-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.dbm-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.dbm-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.dbm-p-tray{width:170mm;height:46mm;margin:0 0 12mm;border:1pt solid #000;'
      + 'border-left-width:1pt;position:relative;}'
      + '.dbm-p-tray::after{content:"";position:absolute;left:50%;top:0;bottom:0;'
      + 'border-left:1pt dashed #000;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-dbm', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.DoublingMirror = DoublingMirror;
  if (typeof module !== 'undefined' && module.exports) module.exports = DoublingMirror;
}());
