/* =====================================================================
   BUNDLE BOT — ACTIVITY  (bundle-bot-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.NBT.B.2.a (10 = a bundle of ten ones, a "ten") + 1.NBT.B.2.c (decades).
   The transform-machine FAMILY HEAD. Bolt is an eager apprentice robot who LOVES
   tidying loose ones into neat tens — but is FORBIDDEN to bundle without you. The
   child feeds subitizable clumps into a loose SCATTER-tray, counts to ten, and
   pulls the BUNDLE LEVER (never glows) — the child's judged trigger; Bolt
   executes. Builds a multi-ten number (20-49) in CANONICAL form.

   THE ANTI-CHEATS: the tray is a loose SCATTER (not a clean ten-frame — the
   child holds "ten" as a count, not "full" as a gestalt); NO auto-bundle (only
   the lever bundles); a sub-ten / impostor (looks-~10-but-9) pull REFUSES; the
   solve requires the canonical tens grouping. The composite-unit logic + the
   SOLVER gauntlet live in mini tools/bundle-machine-core.js (pure).
   answerType:'state'. Bolt + cubes + bars = SVG/CSS STUBS for CA5 (NO image-
   library → no 404). No timer/score/streak; a refuse is a warm sheepish "not
   ten yet." 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.BundleMachineCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35', CUBE: '#5FB3A3' };
  var ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var TENSW = ['', '', 'twenty', 'thirty', 'forty'];
  function enWord(n) { n = n | 0; if (n < 20) return ONES[n] || String(n); var t = Math.floor(n / 10), o = n % 10; return o ? TENSW[t] + '-' + ONES[o] : TENSW[t]; }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }

  function boltSVG(mood) {
    var happy = mood === 'happy', sheepish = mood === 'sheepish';
    var mouth = happy ? '<path d="M40 60 q10 8 20 0" stroke="#3A6B63" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : sheepish ? '<path d="M42 60 q8 -3 16 0" stroke="#3A6B63" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
        : '<path d="M43 60 q7 4 14 0" stroke="#3A6B63" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Bundle Bot">'
      + '<rect x="22" y="28" width="56" height="52" rx="13" fill="#9FD3C8"/><rect x="22" y="28" width="56" height="52" rx="13" fill="none" stroke="' + C.T + '" stroke-width="3"/>'
      + '<circle cx="50" cy="18" r="4" fill="' + C.GOLD + '"/><rect x="48.5" y="18" width="3" height="10" fill="#6e8f88"/>'   // antenna
      + '<rect x="33" y="42" width="34" height="16" rx="5" fill="#EAF7F3"/>'                                                  // face panel
      + '<circle cx="42" cy="50" r="3.6" fill="' + C.INK + '"/><circle cx="58" cy="50" r="3.6" fill="' + C.INK + '"/>'
      + mouth + '</svg>';
  }
  function cubeSVG() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="' + C.CUBE + '"/><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="' + C.T + '" stroke-width="1.6"/><rect x="6" y="6" width="6" height="6" rx="1.5" fill="#fff" opacity=".35"/></svg>'; }
  /* a banded ten-bar — reads "one ten" at a glance (NOT a countable 10-cube stack). */
  function barSVG() {
    var b = '<svg viewBox="0 0 26 92" class="bb-bar-svg" aria-hidden="true"><rect x="3" y="3" width="20" height="86" rx="5" fill="' + C.T + '"/>';
    for (var i = 0; i < 10; i++) b += '<line x1="3" y1="' + (11 + i * 8) + '" x2="23" y2="' + (11 + i * 8) + '" stroke="#0e4f45" stroke-width="1.4"/>';
    b += '<rect x="3" y="3" width="20" height="86" rx="5" fill="none" stroke="#0a3b34" stroke-width="2"/></svg>';
    return b;
  }
  function pips(n) { var s = ''; for (var i = 0; i < n; i++) s += '<span class="bb-pip"></span>'; return s; }

  global.BundleBotActivity = {
    id: 'bundle-bot-activity',
    reward: { id: 'tidy-shelf', label: "Bolt's Tidy Shelf", emoji: '🧰' },

    strings: {
      title: { en: 'Bundle Bot' },
      instruction: { en: 'Drop ones one at a time (tap a one to take it back). Count ten, then pull the lever to bundle a ten.' },
      prompt: { en: 'Bundle the tens!' },
      make: { en: 'Make {n}!' },
      tensLab: { en: 'Tens' },
      trayLab: { en: 'Loose ones' },
      feed: { en: 'Drop a one' },
      bundle: { en: 'Bundle ten! 🔧' },
      tidy: { en: 'Tidy ⊞' },
      untidy: { en: 'Scatter' },
      qBuild: { en: 'Count ten ones, then bundle!' },
      qUnbundle: { en: 'Show {n} as {t} tens and {o} ones — tap a ten to un-bundle!' },
      qImpostor: { en: 'Is that ten? Count carefully!' },
      qDecade: { en: 'Make {n} — all tens, no loose ones!' },
      qReadState: { en: 'Bolt has {v} already — add ones to make {n}!' },
      qOverfill: { en: 'Drop ones and bundle each ten!' },
      refuse: { en: "Not ten yet — keep counting!" },
      overfill: { en: "Whoa, more than ten — bundle a ten first!" },
      unbundled: { en: 'Un-bundled! Ten ones again.' },
      bundled: { en: 'Ten ones make one ten! 🔧' },
      win: { en: '{w} — all bundled! 🧰' },
      tapCheck: { en: 'Tap Check! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.cstate = null; this.solved = false; this.solvedCount = 0; this.msg = null; this._tidy = false; this._mood = 'idle';
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this._tidy = false; this._mood = 'idle'; this._newBar = false;
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'bb-wrap'); var root = api.el('div', 'bb-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'bb-head' + (this.solved ? ' bb-head-win' : ''));
      var bolt = api.el('span', 'bb-bolt'); bolt.innerHTML = boltSVG(this.solved ? 'happy' : this._mood);
      var say = api.el('span', 'bb-say'); say.textContent = this.msg || this._question();
      head.appendChild(bolt); head.appendChild(say); root.appendChild(head);

      if (this.solved) { this._renderDone(root); wrap.appendChild(root); stage.appendChild(wrap); return; }

      root.appendChild(this._targetCard());
      root.appendChild(this._workshop());
      root.appendChild(this._controls());

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _question: function () {
      var api = this.api, r = this.round, n = r.target | 0;
      switch (r.cog) {
        case 'unbundle': return api.t('qUnbundle').replace('{n}', n).replace('{t}', Core.solveTens(r)).replace('{o}', Core.solveOnes(r));
        case 'impostor': return api.t('qImpostor');
        case 'decade': return api.t('qDecade').replace('{n}', n);
        case 'read-state': return api.t('qReadState').replace('{v}', (r.start.tens * 10 + r.start.ones)).replace('{n}', n);
        case 'overfill': return api.t('qOverfill');
        default: return api.t('qBuild');
      }
    },

    _targetCard: function () {
      var api = this.api, card = api.el('div', 'bb-target');
      var lab = api.el('span', 'bb-tlab'); lab.textContent = api.t('make').replace(/\s*\{n\}!?/, '').trim() || 'Make'; card.appendChild(lab);
      var n = api.el('span', 'bb-tnum'); n.textContent = (this.round.target | 0); card.appendChild(n);
      return card;
    },

    /* ----- the workshop: the tens column (banded BARS) + the scatter-tray ----- */
    _workshop: function () {
      var self = this, api = this.api, shop = api.el('div', 'bb-shop');

      // TENS COLUMN — banded bars (tap a bar to un-bundle)
      var col = api.el('div', 'bb-tenscol');
      var cl = api.el('div', 'bb-collab'); cl.textContent = api.t('tensLab'); col.appendChild(cl);
      var bars = api.el('div', 'bb-bars');
      for (var i = 0; i < this.cstate.tens; i++) {
        var bar = api.el('button', 'bb-bar' + (this._newBar && i === this.cstate.tens - 1 ? ' bb-bar-new' : '')); bar.type = 'button'; bar.innerHTML = barSVG();
        bar.setAttribute('aria-label', 'a ten — tap to un-bundle into ten ones');
        bar.addEventListener('click', function () { self._unbundle(); });
        bars.appendChild(bar);
      }
      if (!this.cstate.tens) { var ph = api.el('span', 'bb-colempty'); ph.textContent = '—'; bars.appendChild(ph); }
      col.appendChild(bars); shop.appendChild(col);

      // SCATTER TRAY — loose ones (the child counts; optional tidy)
      var tray = api.el('div', 'bb-tray' + (this._tidy ? ' bb-tidy' : '') + (this.cstate.ones > 10 ? ' bb-over' : ''));
      var trl = api.el('div', 'bb-traylab'); trl.textContent = api.t('trayLab'); tray.appendChild(trl);
      var scat = api.el('div', 'bb-scatter');
      for (var j = 0; j < this.cstate.ones; j++) {
        var cu = api.el('button', 'bb-cube'); cu.type = 'button'; cu.innerHTML = cubeSVG();
        cu.setAttribute('aria-label', 'a loose one — tap to take it back');
        cu.addEventListener('click', function () { self._removeOne(); });
        if (!this._tidy) { cu.style.setProperty('--jx', (((j * 37) % 11) - 5) + 'px'); cu.style.setProperty('--jy', (((j * 53) % 9) - 4) + 'px'); }
        scat.appendChild(cu);
      }
      tray.appendChild(scat);
      shop.appendChild(tray);
      return shop;
    },

    _controls: function () {
      var self = this, api = this.api, bar = api.el('div', 'bb-controls');
      // one-by-one feeder — adds EXACTLY one loose cube per tap (shows a single
      // cube so the child reads "one"). Full control: tap a loose cube to remove.
      var feeder = api.el('button', 'bb-feeder'); feeder.type = 'button';
      feeder.innerHTML = '<span class="bb-feedlab">' + api.t('feed') + '</span><span class="bb-die">' + pips(1) + '</span>';
      feeder.setAttribute('aria-label', api.t('feed'));
      feeder.addEventListener('click', function () { self._feed(); });
      bar.appendChild(feeder);
      // tidy toggle (the optional strategy tool)
      var tidy = api.el('button', 'bb-tidybtn'); tidy.type = 'button'; tidy.textContent = this._tidy ? api.t('untidy') : api.t('tidy');
      tidy.addEventListener('click', function () { self._tidy = !self._tidy; self.msg = null; self.render(); });
      bar.appendChild(tidy);
      // the bundle lever (always present, NEVER glows)
      var lever = api.el('button', 'bb-lever'); lever.type = 'button'; lever.textContent = api.t('bundle');
      lever.addEventListener('click', function () { self._pull(); });
      bar.appendChild(lever);
      return bar;
    },
    _peekClump: function () { var sizes = this.round.clumpSizes || [1, 2, 3]; return sizes[(this.cstate._feedIdx) % sizes.length] | 0; },

    _feed: function () {
      Core.feed(this.cstate, 1);                                               // one-by-one — exactly one loose cube
      this.api.sound && this.api.sound(520 + this.cstate.ones * 8); this._newBar = false;
      this.msg = (this.cstate.ones > 10) ? this.api.t('overfill') : null; this._mood = 'idle';
      if (Core.isSolved(this.cstate)) { this._win(); return; }
      this.render();
    },
    _removeOne: function () {
      if (Core.removeOne(this.cstate) === 'none') return;                       // floor at 0 — no-op
      this.api.sound && this.api.sound(440); this._newBar = false; this._mood = 'idle';
      this.msg = (this.cstate.ones > 10) ? this.api.t('overfill') : null;
      if (Core.isSolved(this.cstate)) { this._win(); return; }                 // removing an over-shoot can land the target (e.g. 24→23)
      this.render();
    },
    _pull: function () {
      var r = Core.pullLever(this.cstate);
      if (r === 'refused') { this._mood = 'sheepish'; this.msg = this.api.t('refuse'); this.api.sound && this.api.sound(330); speak('not ten yet'); this.render(); return; }
      // bundled (or overfill-bundled)
      this._newBar = true; this._mood = 'happy'; this.api.sound && this.api.sound(300); this.api.sound && setTimeout(this.api.sound.bind(null, 760), 90);
      this.msg = this.api.t('bundled'); speak('Ten ones make one ten');
      if (Core.isSolved(this.cstate)) { this._win(); return; }
      this.render();
    },
    _unbundle: function () {
      if (Core.unbundle(this.cstate) === 'none') return;
      this._newBar = false; this._mood = 'idle'; this.msg = this.api.t('unbundled'); this.api.sound && this.api.sound(420);
      if (Core.isSolved(this.cstate)) { this._win(); return; }
      this.render();
    },

    _win: function () {
      var api = this.api, whole = Core.value(this.cstate);
      this.solved = true;
      if (Core.firstAttemptCorrect(this.cstate)) this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      this.msg = api.t('win').replace('{w}', enWord(whole));
      this.api.sound && this.api.sound(940); this.render(); this.announce(this.msg);
      speak(enWord(whole) + ' — all bundled');
    },
    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9;
      // the finished number as bars + loose
      var fin = api.el('div', 'bb-finrow');
      for (var b = 0; b < this.cstate.tens; b++) { var bar = api.el('span', 'bb-bar bb-bar-static'); bar.innerHTML = barSVG(); fin.appendChild(bar); }
      for (var o = 0; o < this.cstate.ones; o++) { var cu = api.el('span', 'bb-cube'); cu.innerHTML = cubeSVG(); fin.appendChild(cu); }
      root.appendChild(fin);
      var cap = api.el('div', 'bb-wholecap'); cap.textContent = Core.value(this.cstate); root.appendChild(cap);
      var shelf = api.el('div', 'bb-shelf');
      for (var i = 0; i < n; i++) { var s = api.el('span', 'bb-crate' + (i < this.solvedCount ? ' bb-crate-on' : '')); s.textContent = '🧰'; shelf.appendChild(s); }
      root.appendChild(shelf);
      var nudge = api.el('div', 'bb-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
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
      fetch('/mini-tools/bundle-bot-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[bundle-bot] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.bb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.bb-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.4vw,9px);background:linear-gradient(180deg,#F0F4F2,#FBF3E4);border-radius:20px;padding:clamp(7px,1.7vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.bb-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.bb-bolt{width:clamp(30px,7vw,42px);flex:0 0 auto;}.bb-bolt svg{width:100%;height:auto;display:block;}'
        + '.bb-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.bb-head-win .bb-say{color:' + C.CORAL2 + ';}'
        /* target */
        + '.bb-target{display:inline-flex;align-items:baseline;gap:6px;background:#fff;border:2px solid rgba(20,107,94,.2);border-radius:14px;padding:2px 16px;}'
        + '.bb-tlab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';}.bb-tnum{font:800 clamp(26px,7vw,34px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* workshop: tens column + scatter tray */
        /* shop: stacked at narrow (each section full-width, bars in one row), side-by-side at ≥480px */
        + '.bb-shop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(5px,1.6vw,9px);width:100%;}'
        + '@media (min-width:480px){.bb-shop{flex-direction:row;align-items:stretch;}}'
        + '.bb-tenscol{display:flex;flex-direction:column;align-items:center;gap:2px;background:#EAF2EE;border:2px solid rgba(20,107,94,.16);border-radius:13px;padding:4px 6px;width:100%;box-sizing:border-box;}'
        + '@media (min-width:480px){.bb-tenscol{width:auto;flex:0 0 auto;min-width:clamp(180px,40vw,210px);}}'
        + '.bb-collab,.bb-traylab{font:700 clamp(9px,2.3vw,11px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;opacity:.75;}'
        + '.bb-bars{display:flex;flex-wrap:nowrap;gap:3px;justify-content:center;align-items:flex-end;min-height:50px;}'
        + '.bb-bar{border:0;background:transparent;padding:0 3px;cursor:pointer;touch-action:manipulation;min-width:44px;min-height:48px;display:flex;align-items:flex-end;justify-content:center;}.bb-bar-svg{height:48px;width:auto;display:block;}.bb-bar-static{cursor:default;min-width:0;min-height:0;padding:0;}.bb-finrow .bb-bar-static .bb-bar-svg{height:40px;}'
        + '.bb-bar-new{animation:bbPop .42s ease both;}@keyframes bbPop{0%{transform:scale(.5) translateY(14px);opacity:0;}100%{transform:scale(1) translateY(0);opacity:1;}}'
        + '.bb-colempty{font:700 18px/1 "Baloo 2",sans-serif;color:#b9c6c1;}'
        + '.bb-tray{flex:1 1 auto;max-width:clamp(150px,52vw,300px);display:flex;flex-direction:column;align-items:center;gap:2px;background:#FBF7EF;border:2px dashed rgba(20,107,94,.3);border-radius:13px;padding:4px 6px;min-height:clamp(64px,17vw,92px);}'
        + '.bb-over{border-color:' + C.CORAL + ';background:#FFF6EF;}'
        + '.bb-scatter{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-items:center;flex:1 1 auto;width:100%;}'
        + '.bb-cube{width:clamp(22px,5vw,28px);height:clamp(22px,5vw,28px);flex:0 0 auto;border:0;background:transparent;padding:0;-webkit-tap-highlight-color:transparent;}.bb-cube svg{width:100%;height:100%;display:block;}'
        /* scatter cubes are tap-to-remove (take one back) — interactive cues + a
           hover/focus × badge so the "removable" affordance is visible; done-row
           cubes (.bb-finrow) are static spans, unaffected. */
        + '.bb-scatter .bb-cube{position:relative;cursor:pointer;touch-action:manipulation;transition:filter .1s;}'
        + '.bb-scatter .bb-cube:hover{filter:brightness(1.07);}.bb-scatter .bb-cube:active{filter:brightness(.78);}'
        + '.bb-scatter .bb-cube:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:1px;border-radius:6px;}'
        + '.bb-scatter .bb-cube::after{content:"\\00d7";position:absolute;top:-5px;right:-5px;width:14px;height:14px;line-height:13px;font:800 11px/13px "Nunito",sans-serif;color:#fff;background:' + C.CORAL2 + ';border-radius:50%;text-align:center;opacity:0;transition:opacity .1s;pointer-events:none;}'
        + '.bb-scatter .bb-cube:hover::after,.bb-scatter .bb-cube:focus-visible::after{opacity:1;}'
        + '.bb-tray:not(.bb-tidy) .bb-cube{transform:translate(var(--jx,0),var(--jy,0));}'
        + '.bb-tidy .bb-scatter{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;max-width:clamp(110px,30vw,150px);}'
        /* controls */
        + '.bb-controls{display:flex;align-items:stretch;justify-content:center;gap:6px;width:100%;max-width:340px;flex-wrap:wrap;}'
        + '.bb-feeder{flex:1 1 40%;min-height:54px;border-radius:13px;border:2px solid rgba(20,107,94,.25);background:#fff;color:' + C.T + ';cursor:pointer;touch-action:manipulation;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px;}.bb-feeder:active{transform:translateY(1px);}'
        + '.bb-feedlab{font:800 clamp(11px,2.8vw,13px)/1 "Baloo 2",sans-serif;}.bb-die{display:flex;gap:2px;}.bb-pip{width:6px;height:6px;border-radius:50%;background:' + C.T + ';}'
        + '.bb-tidybtn{flex:0 0 auto;min-height:54px;min-width:54px;border-radius:13px;border:2px solid rgba(20,107,94,.2);background:#EAF2EE;color:' + C.T + ';font:700 clamp(10px,2.6vw,12px)/1.1 "Nunito",sans-serif;cursor:pointer;touch-action:manipulation;padding:0 8px;}'
        + '.bb-lever{flex:1 1 100%;min-height:56px;border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.bb-lever:active{transform:translateY(3px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}'
        + '.bb-bar:focus-visible,.bb-feeder:focus-visible,.bb-tidybtn:focus-visible,.bb-lever:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* done */
        + '.bb-finrow{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-items:flex-end;max-width:90%;}.bb-finrow .bb-bar{width:clamp(15px,4vw,20px);}'
        + '.bb-wholecap{font:800 clamp(28px,7vw,38px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#fff;border:3px solid ' + C.CORAL + ';border-radius:14px;padding:2px 18px;}'
        + '.bb-shelf{display:flex;gap:1px;flex-wrap:wrap;justify-content:center;}.bb-crate{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.bb-crate-on{filter:none;}'
        + '.bb-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* desktop-height compaction */
        + '@media (max-height:940px){.bb-root{gap:4px;}.bb-target{padding:1px 14px;}.bb-controls{gap:5px;}}'
        + '@media (max-height:720px){.bb-bolt{width:30px;}.bb-tnum{font-size:26px;}}'
        + '@media (max-height:640px){.bb-root{gap:1px;padding:4px;}.bb-bolt{width:24px;}.bb-head{gap:4px;}.bb-say{font-size:10.5px;}.bb-target{padding:0 10px;}.bb-tnum{font-size:19px;}.bb-tlab{font-size:10px;}.bb-shop{gap:2px;}.bb-collab,.bb-traylab{font-size:8.5px;}.bb-bars{min-height:38px;}.bb-bar{min-height:38px;}.bb-bar-svg{height:38px;}.bb-tray{min-height:44px;}.bb-cube{width:13px;height:13px;}.bb-controls{gap:4px;}.bb-feeder,.bb-tidybtn{min-height:42px;}.bb-lever{min-height:42px;}.bb-die{display:none;}}'
        + '@media (max-width:340px){.bb-root{padding:5px;}.bb-shop{gap:5px;}}'
        + '@media (prefers-reduced-motion:reduce){.bb-bar-new{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-bundle-bot', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'bundle-bot.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'qBuild'; }
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
