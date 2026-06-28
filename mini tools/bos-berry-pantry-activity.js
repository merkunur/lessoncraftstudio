/* =====================================================================
   BO'S BERRY PANTRY — ACTIVITY  (bos-berry-pantry-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.NBT.B.2 (two-digit numbers are amounts of TENS and ONES — UNITIZING)
   + a touch of 1.NBT.B.3 (the value-compare lane). Bo the bunny stocks his
   winter pantry: a CRATE holds exactly ten — sealed, un-countable, "a crate
   just IS a ten." The child READS a prompt (a loose PILE / a value-question /
   a numeral), LOCKS the matching pantry shelf, then SLINGS Bo's berries to the
   LOCKED shelf (commit-then-deliver — the launch reads only the lock, never aim).

   THE ANTI-CHEATS: NO numerals on hoard shelves (digit-match dies); the crate is
   ONE sealed composite ten, not a countable grid (count-match dies on the VALUE-
   rounds); the launch always lands on the LOCKED shelf (aim is never graded); a
   wrong lock floats back with a NON-LEAKING re-decode cue (names the wrong
   shelf's crate-count, never the prompt's value). The unitize logic + the SOLVER
   gauntlet live in mini tools/slingshot-tens-core.js (pure). answerType:'state'.

   Bo + crates + berries = SVG STUBS for CA5 (NO image-library → no 404). No
   timer/score/streak; a miss is a warm "count again." First-attempt-correct
   stocks the pantry. 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.SlingshotTensCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35', LEAF: '#7FB069' };
  var ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function enWord(n) { n = n | 0; if (n < 20) return ONES[n] || String(n); var t = Math.floor(n / 10), o = n % 10; return o ? TENS[t] + '-' + ONES[o] : TENS[t]; }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  var REDUCED = (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function boSVG(mood) {
    var happy = mood === 'happy';
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Bo the bunny">'
      + '<ellipse cx="38" cy="20" rx="6" ry="15" fill="#E9D9C6"/><ellipse cx="62" cy="20" rx="6" ry="15" fill="#E9D9C6"/>'   // ears
      + '<ellipse cx="38" cy="20" rx="3" ry="10" fill="#F4C9C0"/><ellipse cx="62" cy="20" rx="3" ry="10" fill="#F4C9C0"/>'
      + '<circle cx="50" cy="52" r="30" fill="#EFE2D2"/>'                                                                     // head
      + '<circle cx="40" cy="48" r="3.6" fill="#2A2A35"/><circle cx="60" cy="48" r="3.6" fill="#2A2A35"/>'
      + '<ellipse cx="50" cy="58" rx="4" ry="3" fill="#F4A7A0"/>'                                                             // nose
      + (happy ? '<path d="M42 64 q8 7 16 0" stroke="#B06A57" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<path d="M44 64 q6 3 12 0" stroke="#B06A57" stroke-width="2.4" fill="none" stroke-linecap="round"/>')
      + '</svg>';
  }
  /* the SEALED un-countable ten-crate — ONE composite icon worth ten (a ten-leaf
     stamp, NOT a countable berry-grid). The §9 count-match-killer, art-enforced. */
  function crateSVG() {
    return '<svg viewBox="0 0 100 100" class="bp-crate-svg" aria-hidden="true">'
      + '<rect x="12" y="26" width="76" height="58" rx="7" fill="#C68B4E"/><rect x="12" y="26" width="76" height="58" rx="7" fill="none" stroke="#8A5A2B" stroke-width="4"/>'
      + '<rect x="12" y="48" width="76" height="6" fill="#8A5A2B" opacity=".55"/><rect x="46" y="26" width="8" height="58" fill="#8A5A2B" opacity=".5"/>'   // slats
      + '<circle cx="50" cy="40" r="11" fill="#2E7D4F"/><path d="M50 33 q7 5 0 13 q-7 -8 0 -13Z" fill="#7FB069"/>'             // ten-leaf stamp
      + '<text x="50" y="44" font-family="Baloo 2,sans-serif" font-weight="800" font-size="11" fill="#fff" text-anchor="middle">10</text>'
      + '</svg>';
  }

  global.BosBerryPantryActivity = {
    id: 'bos-berry-pantry-activity',
    reward: { id: 'pantry', label: "Bo's Winter Pantry", emoji: '🧺' },

    strings: {
      title: { en: "Bo's Berry Pantry" },
      instruction: { en: 'Read Bo’s berries, then sling them to the matching shelf.' },
      prompt: { en: 'Pack Bo’s berries!' },
      qPile: { en: 'Pack Bo’s berries — crates and loose!' },
      qDecade: { en: 'Send Bo’s {w} — all crates, no loose!' },
      qUnitize: { en: 'Pack {w} — use the MOST crates you can!' },
      qCompare: { en: 'Which shelf has MORE?' },
      qNumeral: { en: 'Send {w} home — match the shelf!' },
      qEncode: { en: 'Which number is Bo’s hoard?' },
      crateWord: { en: 'a crate is TEN' },
      shelvesLab: { en: 'Pantry shelves' },
      sling: { en: 'Sling it! 🪃' },
      slingHint: { en: 'Tap a shelf, then sling Bo’s berries!' },
      lockedHint: { en: 'Now sling it to that shelf!' },
      wrongCrates: { en: 'That shelf holds {k} crates — count again for Bo!' },
      wrongOne: { en: 'That shelf holds 1 crate — count again for Bo!' },
      wrongNum: { en: 'That number isn’t Bo’s hoard — count again!' },
      win: { en: '{w} — packed into tens! 🧺' },
      tapCheck: { en: 'Tap Check! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.cstate = null; this.solved = false; this.solvedCount = 0; this.msg = null; this._flying = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this._flying = false; this.winHoard = null;
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },
    _word: function () { return enWord(this.round.prompt.value | 0); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'bp-wrap'); var root = api.el('div', 'bp-root'); this._rootEl = root; this._shelfEls = {};
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'bp-head' + (this.solved ? ' bp-head-win' : ''));
      var bo = api.el('span', 'bp-bo'); bo.innerHTML = boSVG(this.solved ? 'happy' : 'idle');
      var say = api.el('span', 'bp-say'); say.textContent = this.msg || this._question();
      head.appendChild(bo); head.appendChild(say); root.appendChild(head);

      if (this.solved) { this._renderDone(root); wrap.appendChild(root); stage.appendChild(wrap); return; }

      root.appendChild(this._promptCard());
      root.appendChild(this._shelvesGrid());
      root.appendChild(this._slingBar());

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _question: function () {
      var api = this.api, p = this.round.prompt, w = this._word();
      if (this.round.compare === 'more') return api.t('qCompare');
      if (this.round.lane === 'encode') return api.t('qEncode');
      if (this.round.lane === 'decade') return api.t('qDecade').replace('{w}', w);
      if (this.round.lane === 'unitize-count') return api.t('qUnitize').replace('{w}', w);
      if (p.kind === 'numeral') return api.t('qNumeral').replace('{w}', w);
      return api.t('qPile');
    },

    /* ----- the prompt card: a PILE (no digits) / a value-question / a numeral
       pebble / a hoard (encode). NEVER a tray sum. ----- */
    _promptCard: function () {
      var api = this.api, p = this.round.prompt, card = api.el('div', 'bp-prompt');
      if (p.kind === 'numeral') {
        var peb = api.el('span', 'bp-pebble'); peb.textContent = (p.value | 0); card.appendChild(peb);
      } else if (this.round.lane === 'encode' && p.hoard) {
        card.appendChild(this._hoard(p.hoard.tens | 0, p.hoard.ones | 0, 'bp-prompt-hoard'));
      } else if (p.kind === 'pile') {
        card.appendChild(this._pile(p.value | 0));
      } else {
        /* value-q (decade / unitize-count / compare): a word cue, NO numeral */
        var q = api.el('span', 'bp-qword');
        q.textContent = (this.round.compare === 'more') ? '⚖' : this._word();
        card.appendChild(q);
        var sub = api.el('span', 'bp-qsub'); sub.textContent = api.t('crateWord'); card.appendChild(sub);
      }
      return card;
    },
    /* a loose pile of `n` berries, grouped in 5-frames (subitizable, NO digits). */
    _pile: function (n) {
      var api = this.api, pile = api.el('div', 'bp-pile');
      for (var i = 0; i < n; i++) { var b = api.el('span', 'bp-berry' + ((i + 1) % 5 === 0 ? ' bp-berry-gap' : '')); pile.appendChild(b); }
      return pile;
    },
    /* a hoard = sealed un-countable crates + a 5-framed loose row (NO numerals). */
    _hoard: function (tens, ones, cls) {
      var api = this.api, h = api.el('div', 'bp-hoard' + (cls ? ' ' + cls : ''));
      var cr = api.el('div', 'bp-crates');
      for (var i = 0; i < tens; i++) { var c = api.el('span', 'bp-crate'); c.innerHTML = crateSVG(); cr.appendChild(c); }
      if (tens) h.appendChild(cr);
      if (ones) { var lo = api.el('div', 'bp-loose'); for (var j = 0; j < ones; j++) { var b = api.el('span', 'bp-berry' + ((j + 1) % 5 === 0 ? ' bp-berry-gap' : '')); lo.appendChild(b); } h.appendChild(lo); }
      return h;
    },

    _shelvesGrid: function () {
      var self = this, api = this.api, grid = api.el('div', 'bp-shelves');
      var lab = api.el('div', 'bp-shelveslab'); lab.textContent = api.t('shelvesLab'); grid.appendChild(lab);
      var row = api.el('div', 'bp-shelfrow');
      this.cstate.positions.forEach(function (key) {
        var sh = self.round.shelves[key], locked = (self.cstate.lockedKey === key);
        var btn = api.el('button', 'bp-shelf' + (locked ? ' bp-locked' : '')); btn.type = 'button'; btn.setAttribute('data-key', key);
        if (sh.numeral != null) { var num = api.el('span', 'bp-shnum'); num.textContent = sh.numeral; btn.appendChild(num); btn.setAttribute('aria-label', 'the number ' + sh.numeral); }
        else { btn.appendChild(self._hoard(sh.tens | 0, sh.ones | 0)); btn.setAttribute('aria-label', (sh.tens | 0) + ' crates and ' + (sh.ones | 0) + ' loose berries'); }
        btn.addEventListener('click', function () { self._lockShelf(key); });
        self._shelfEls[key] = btn; row.appendChild(btn);
      });
      grid.appendChild(row);
      return grid;
    },
    _lockShelf: function (key) {
      if (this._flying || this.solved) return;
      Core.lock(this.cstate, key); this.msg = null; this.api.sound && this.api.sound(560);
      this.render();
    },

    _slingBar: function () {
      var self = this, api = this.api, bar = api.el('div', 'bp-slingbar');
      var sling = api.el('span', 'bp-slingstub'); sling.innerHTML = '<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M22 56 L22 30 M38 56 L38 30" stroke="#8A5A2B" stroke-width="6" stroke-linecap="round"/><path d="M22 30 Q30 24 38 30" stroke="' + C.CORAL + '" stroke-width="4" fill="none"/><circle cx="30" cy="30" r="6" fill="' + C.CORAL + '"/></svg>';
      this._slingOrigin = sling; bar.appendChild(sling);
      var btn = api.el('button', 'bp-sling'); btn.type = 'button'; btn.textContent = api.t('sling');
      btn.disabled = (this.cstate.lockedKey == null);
      btn.addEventListener('click', function () { self._launch(); });
      bar.appendChild(btn);
      var hint = api.el('div', 'bp-slinghint'); hint.textContent = (this.cstate.lockedKey == null) ? api.t('slingHint') : api.t('lockedHint'); bar.appendChild(hint);
      return bar;
    },

    /* THE LAUNCH — commit-then-deliver. The pellet arcs to the LOCKED shelf, then
       fire() (which reads ONLY the lock) resolves. No aim, no motor grading. */
    _launch: function () {
      if (this._flying || this.solved || this.cstate.lockedKey == null) return;
      var self = this, root = this._rootEl, shelfEl = this._shelfEls[this.cstate.lockedKey], slingEl = this._slingOrigin;
      this.api.sound && this.api.sound(720);
      if (REDUCED || !root || !shelfEl || !slingEl) { this._resolveFire(); return; }
      var rr = root.getBoundingClientRect(), sr = slingEl.getBoundingClientRect(), tr = shelfEl.getBoundingClientRect();
      var ox = sr.left + sr.width / 2 - rr.left, oy = sr.top + sr.height / 2 - rr.top;
      var dx = (tr.left + tr.width / 2 - rr.left) - ox, dy = (tr.top + tr.height / 2 - rr.top) - oy;
      var pellet = this.api.el('div', 'bp-pellet');
      pellet.style.left = ox + 'px'; pellet.style.top = oy + 'px'; pellet.style.setProperty('--dx', dx + 'px'); pellet.style.setProperty('--dy', dy + 'px');
      this._flying = true;
      pellet.addEventListener('animationend', function () { pellet.remove(); self._resolveFire(); });
      root.appendChild(pellet);
    },
    _resolveFire: function () {
      this._flying = false;
      var shelf = this.round.shelves[this.cstate.lockedKey];   // capture BEFORE fire (wrong clears the lock)
      var r = Core.fire(this.cstate);
      if (r === 'sealed') { this._win(); return; }
      if (r === 'wrong') {
        if (shelf.numeral != null) this.msg = this.api.t('wrongNum');
        else { var k = shelf.tens | 0; this.msg = (k === 1) ? this.api.t('wrongOne') : this.api.t('wrongCrates').replace('{k}', k); }
        this.api.sound && this.api.sound(330); speak('count again'); this.render();
      } else { this.render(); }
    },
    _win: function () {
      var api = this.api, shelf = this.round.shelves[this.cstate.lockedKey];
      this.solved = true;
      if (Core.firstAttemptCorrect(this.cstate)) this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      this.winHoard = (shelf.numeral != null) ? (this.round.prompt.hoard || { tens: Math.floor(shelf.numeral / 10), ones: shelf.numeral % 10 }) : { tens: shelf.tens | 0, ones: shelf.ones | 0 };
      var whole = (this.winHoard.tens | 0) * 10 + (this.winHoard.ones | 0);
      this.msg = api.t('win').replace('{w}', enWord(whole));
      this.api.sound && this.api.sound(940); this.render(); this.announce(this.msg);
      this._countByTens(whole);
    },
    /* per-locale payoff (EN pilot): count by TENS (universal, no ordering
       conflict), then speak the whole word. de/nl/da/no ones-first = fast-follow. */
    _countByTens: function (whole) {
      var t = this.winHoard.tens | 0, parts = [];
      for (var i = 1; i <= t; i++) parts.push(enWord(i * 10));
      var line = parts.join(', ') + (parts.length ? ' — ' : '') + enWord(whole);
      speak(line);
    },

    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9;
      if (this.winHoard) { var opened = this._hoard(this.winHoard.tens | 0, this.winHoard.ones | 0, 'bp-opened'); root.appendChild(opened); }
      var cap = api.el('div', 'bp-wholecap'); cap.textContent = ((this.winHoard.tens | 0) * 10 + (this.winHoard.ones | 0)); root.appendChild(cap);
      var pantry = api.el('div', 'bp-pantry');
      for (var i = 0; i < n; i++) { var s = api.el('span', 'bp-cubby' + (i < this.solvedCount ? ' bp-cubby-on' : '')); s.textContent = '🧺'; pantry.appendChild(s); }
      root.appendChild(pantry);
      var nudge = api.el('div', 'bp-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
    },

    isCorrect: function () { return this.solved; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/bos-berry-pantry-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[bos-berry-pantry] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.bp-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.bp-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#F3ECFB,#FBF3E4);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.bp-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.bp-bo{width:clamp(30px,7vw,42px);flex:0 0 auto;}.bp-bo svg{width:100%;height:auto;display:block;}'
        + '.bp-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.bp-head-win .bp-say{color:' + C.CORAL2 + ';}'
        /* prompt card */
        + '.bp-prompt{display:flex;flex-direction:column;align-items:center;gap:3px;background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:14px;padding:5px 14px;min-height:46px;justify-content:center;max-width:96%;}'
        + '.bp-pebble{font:800 clamp(30px,8vw,42px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.bp-qword{font:800 clamp(24px,6.5vw,34px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}.bp-qsub{font:700 clamp(9.5px,2.4vw,11px)/1 "Nunito",sans-serif;color:' + C.GOLD + ';text-transform:uppercase;letter-spacing:.04em;}'
        + '.bp-pile{display:flex;flex-wrap:wrap;gap:2.5px;justify-content:center;align-items:center;max-width:clamp(150px,52vw,220px);}'
        + '.bp-berry{width:clamp(8px,2.1vw,11px);height:clamp(8px,2.1vw,11px);border-radius:50%;background:' + C.CORAL + ';box-shadow:inset -1px -1px 0 rgba(0,0,0,.12);}.bp-berry-gap{margin-right:6px;}'
        /* hoard = crates + loose */
        + '.bp-hoard{display:flex;flex-direction:column;align-items:center;gap:3px;}'
        + '.bp-crates{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:100%;}'
        + '.bp-crate{width:clamp(18px,4.6vw,24px);height:clamp(18px,4.6vw,24px);flex:0 0 auto;}.bp-crate-svg{width:100%;height:100%;display:block;}'
        + '.bp-loose{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;max-width:clamp(70px,24vw,110px);}'
        + '.bp-prompt-hoard .bp-crate{width:clamp(20px,5.2vw,26px);height:clamp(20px,5.2vw,26px);}'
        /* shelves */
        + '.bp-shelves{display:flex;flex-direction:column;align-items:center;gap:3px;width:100%;}'
        + '.bp-shelveslab{font:700 clamp(9.5px,2.4vw,11px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;opacity:.7;}'
        + '.bp-shelfrow{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(5px,1.5vw,9px);width:100%;max-width:340px;}'
        + '@media (min-width:560px){.bp-shelfrow{grid-template-columns:repeat(4,1fr);max-width:540px;}}'
        + '.bp-shelf{position:relative;min-height:56px;border-radius:13px;border:2px solid rgba(20,107,94,.18);background:#FBF7EF;cursor:pointer;touch-action:manipulation;display:flex;align-items:center;justify-content:center;padding:6px 4px;box-shadow:0 2px 0 rgba(20,107,94,.1);}.bp-shelf:active{transform:translateY(1px);}'
        + '.bp-locked{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.22),0 2px 0 ' + C.CORAL2 + ';background:#FFF6EF;}'
        + '.bp-shnum{font:800 clamp(24px,6.4vw,32px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* sling bar */
        + '.bp-slingbar{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;max-width:340px;}'
        + '.bp-slingstub{width:clamp(28px,7vw,36px);}.bp-slingstub svg{width:100%;height:auto;display:block;}'
        + '.bp-sling{width:100%;min-height:56px;border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.bp-sling:active{transform:translateY(3px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}.bp-sling:disabled{opacity:.45;box-shadow:0 4px 0 rgba(217,87,47,.4);cursor:default;}'
        + '.bp-slinghint{font:700 clamp(10.5px,2.7vw,12.5px)/1.1 "Nunito",sans-serif;color:#9a8f78;text-align:center;}'
        + '.bp-shelf:focus-visible,.bp-sling:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* the launch pellet (transient; pointer-events none — never affects layout) */
        + '.bp-pellet{position:absolute;width:16px;height:16px;border-radius:50%;background:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.3);pointer-events:none;z-index:6;animation:bpArc .5s ease-in forwards;}'
        + '@keyframes bpArc{0%{transform:translate(0,0);}50%{transform:translate(calc(var(--dx)/2),calc(var(--dy) - 46px)) scale(1.1);}100%{transform:translate(var(--dx),var(--dy)) scale(.7);}}'
        /* done */
        + '.bp-opened .bp-crate{animation:bpPop .4s ease both;}@keyframes bpPop{0%{transform:scale(.6);opacity:0;}100%{transform:scale(1);opacity:1;}}'
        + '.bp-wholecap{font:800 clamp(28px,7vw,38px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#fff;border:3px solid ' + C.CORAL + ';border-radius:14px;padding:2px 18px;}'
        + '.bp-pantry{display:flex;gap:1px;flex-wrap:wrap;justify-content:center;}.bp-cubby{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.bp-cubby-on{filter:none;}'
        + '.bp-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* short-height compaction */
        + '@media (max-height:940px){.bp-root{gap:4px;}.bp-slingstub{width:clamp(22px,5.5vw,28px);}.bp-slingbar{gap:1px;}.bp-slinghint{font-size:10.5px;}.bp-prompt{min-height:40px;padding:4px 12px;}.bp-shelves{gap:2px;}}'
        + '@media (max-height:720px){.bp-bo{width:30px;}.bp-pebble{font-size:30px;}.bp-qword{font-size:24px;}}'
        + '@media (max-height:640px){.bp-root{gap:1px;padding:4px;}.bp-bo{width:26px;}.bp-head{gap:4px;}.bp-say{font-size:11px;}.bp-prompt{min-height:34px;padding:2px 9px;}.bp-pebble{font-size:22px;}.bp-qword{font-size:18px;}.bp-qsub{font-size:9px;}.bp-shelveslab{display:none;}.bp-shelfrow{gap:4px;}.bp-shelf{min-height:44px;padding:3px 2px;}.bp-crate{width:16px;height:16px;}.bp-shnum{font-size:20px;}.bp-slingstub{display:none;}.bp-slingbar{gap:0;}.bp-sling{min-height:46px;}.bp-slinghint{font-size:9.5px;}.bp-berry{width:7px;height:7px;}}'
        + '@media (max-width:340px){.bp-root{padding:5px;}.bp-shelfrow{gap:4px;}}'
        + '@media (prefers-reduced-motion:reduce){.bp-opened .bp-crate,.bp-pellet{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-bos-berry-pantry', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'bos-berry-pantry.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'slingHint'; }
      };
    });
  }
  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; }); var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
