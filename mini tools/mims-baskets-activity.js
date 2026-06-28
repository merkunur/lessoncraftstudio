/* =====================================================================
   MIM'S MEMORY BASKETS — ACTIVITY  (mims-baskets-activity.js)
   ---------------------------------------------------------------------
   CCSS L.K.5.A (Vocabulary Acquisition & Use): sort common objects into
   superordinate CATEGORY baskets to gain a sense of the CONCEPTS. Mim is a
   sleepy, forgetful cloud-creature whose treasures spilled; the child puts each
   thing back in the basket where it BELONGS. Correct → Mim brightens + speaks
   the concept ("Dog is an ANIMAL!"). The FIRST game in the run with real
   image-library pictures.

   INTERACTION: tap-to-pick → tap-to-place (keyboard-accessible). Tap an object
   (it lifts), tap the basket of its category. Correct → the object nestles in +
   the concept is spoken; wrong → the object floats back to the spill with a
   NON-LEAKING "hmm" (the right basket is NEVER revealed). 3+ baskets → no coin-
   flip; concept-knowledge is the only path. The object→category map + the SOLVER
   gauntlet live in mini tools/category-sort-core.js (pure). answerType:'state'.
   NO COUNTING. Mim = an SVG STUB for CA5; objects are real image-library webp.
   0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.CategorySortCore;
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35' };

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: 'en', rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function imgURL(noun) { var b = Core.info(noun); return b ? ('/image-library-webp/themes/' + b.theme + '/' + noun + '@2x.webp') : ''; }

  function mimSVG(mood) {
    var happy = mood === 'happy', hmm = mood === 'hmm';
    var eye = '<circle cx="40" cy="50" r="3.4" fill="#2A2A35"/><circle cx="60" cy="50" r="3.4" fill="#2A2A35"/>';
    if (happy) eye = '<path d="M36 50 q4 -5 8 0" stroke="#2A2A35" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M56 50 q4 -5 8 0" stroke="#2A2A35" stroke-width="3" fill="none" stroke-linecap="round"/>';
    var mouth = happy ? '<path d="M43 60 q7 7 14 0" stroke="#B06A57" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : hmm ? '<path d="M44 61 q6 -2 12 0" stroke="#B06A57" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
        : '<path d="M45 60 q5 3 10 0" stroke="#B06A57" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Mim">'
      + '<path d="M28 64 q-14 0 -12 -14 q-10 -8 2 -16 q0 -16 18 -12 q10 -12 24 -2 q18 -6 18 12 q12 6 2 18 q6 14 -10 14 Z" fill="' + (happy ? '#FBE3B0' : '#E7E0F0') + '"/>'
      + eye + mouth + '</svg>';
  }

  global.MimsBasketsActivity = {
    id: 'mims-baskets-activity',
    reward: { id: 'memory-garden', label: "Mim's Memory Garden", emoji: '🌸' },

    strings: {
      title: { en: "Mim's Memory Baskets" },
      instruction: { en: 'Tap a thing, then tap the basket where it belongs.' },
      prompt: { en: 'Help Mim sort!' },
      qSort: { en: 'Tap a thing, then its basket!' },
      qOdd: { en: 'One doesn\'t belong — sort it home!' },
      spillLab: { en: 'Mim\'s things' },
      pickHint: { en: 'Tap a thing to pick it up.' },
      placeHint: { en: 'Now tap the right basket!' },
      wrong: { en: 'Hmm — that doesn\'t belong there.' },
      remember: { en: '{label} is {concept}! 🌸' },
      win: { en: 'All sorted — Mim remembers! 🌸' },
      tapCheck: { en: 'Tap Check! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.cstate = null; this.solved = false; this.solvedCount = 0; this.msg = null; this._sel = null; this._mood = 'idle';
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this._sel = null; this._mood = 'idle';
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'mb-wrap'); var root = api.el('div', 'mb-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'mb-head' + (this.solved ? ' mb-head-win' : ''));
      var mim = api.el('span', 'mb-mim'); mim.innerHTML = mimSVG(this.solved ? 'happy' : this._mood);
      var say = api.el('span', 'mb-say'); say.textContent = this.msg || this._question();
      head.appendChild(mim); head.appendChild(say); root.appendChild(head);

      if (this.solved) { this._renderDone(root); wrap.appendChild(root); stage.appendChild(wrap); return; }

      root.appendChild(this._spill());
      root.appendChild(this._baskets());

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _question: function () { return this.api.t(this.round.cog === 'odd' ? 'qOdd' : 'qSort'); },

    /* ----- the spill tray: the UNPLACED objects (real pictures); tap to pick ----- */
    _spill: function () {
      var self = this, api = this.api, tray = api.el('div', 'mb-spill');
      var lab = api.el('div', 'mb-spilllab'); lab.textContent = api.t('spillLab'); tray.appendChild(lab);
      var row = api.el('div', 'mb-things');
      var unplaced = this.round.spill.filter(function (n) { return self.cstate.placed[n] === undefined; });
      if (!unplaced.length) { var e = api.el('span', 'mb-allgone'); e.textContent = '✓'; row.appendChild(e); }
      unplaced.forEach(function (noun) {
        var b = Core.info(noun), btn = api.el('button', 'mb-thing' + (self._sel === noun ? ' mb-sel' : '')); btn.type = 'button';
        btn.setAttribute('aria-label', b.label + ' — tap to pick up');
        var im = api.el('img', 'mb-thingimg'); im.src = imgURL(noun); im.alt = b.label; im.draggable = false; btn.appendChild(im);
        var cap = api.el('span', 'mb-thingcap'); cap.textContent = b.label; btn.appendChild(cap);
        btn.addEventListener('click', function () { self._pick(noun); });
        row.appendChild(btn);
      });
      tray.appendChild(row); return tray;
    },
    _pick: function (noun) { if (this.solved) return; this._sel = (this._sel === noun) ? null : noun; this.msg = this._sel ? this.api.t('placeHint') : null; this._mood = 'idle'; this.api.sound && this.api.sound(560); this.render(); },

    /* ----- the category baskets: concept-icon + TEXT label (never bare color) +
       the nestled placed objects; tap a basket to drop the picked object ----- */
    _baskets: function () {
      var self = this, api = this.api, wrap = api.el('div', 'mb-baskets');
      this.round.baskets.forEach(function (cid) {
        var cat = Core.CATEGORY[cid], basket = api.el('button', 'mb-basket'); basket.type = 'button';
        basket.setAttribute('aria-label', cat.label + ' basket');
        var bhead = api.el('span', 'mb-bhead');
        var icon = api.el('span', 'mb-bicon'); icon.textContent = cat.icon; bhead.appendChild(icon);
        var lab = api.el('span', 'mb-blab'); lab.textContent = cat.label; bhead.appendChild(lab);
        basket.appendChild(bhead);
        var nest = api.el('span', 'mb-nest');
        Object.keys(self.cstate.placed).forEach(function (n) { if (self.cstate.placed[n] === cid) { var im = api.el('img', 'mb-nestimg'); im.src = imgURL(n); im.alt = Core.info(n).label; im.draggable = false; nest.appendChild(im); } });
        basket.appendChild(nest);
        basket.addEventListener('click', function () { self._place(cid, basket); });
        wrap.appendChild(basket);
      });
      return wrap;
    },
    _place: function (cid, basketEl) {
      if (this.solved || !this._sel) { if (!this._sel) { this.msg = this.api.t('pickHint'); this.render(); } return; }
      var noun = this._sel, r = Core.drop(this.cstate, noun, cid);
      if (r.correct) {
        this._sel = null; this._mood = 'happy'; this.msg = this.api.t('remember').replace('{label}', r.label).replace('{concept}', r.concept);
        this.api.sound && this.api.sound(820); speak(r.label + ' is ' + r.concept.replace(/\b([a-z])/i, function (m) { return m; }));
        if (Core.isSolved(this.round, this.cstate)) { this._win(); return; }
        this.render();
      } else {
        this._sel = null; this._mood = 'hmm'; this.msg = this.api.t('wrong');
        if (basketEl) { basketEl.classList.remove('mb-nope'); void basketEl.offsetWidth; basketEl.classList.add('mb-nope'); }
        this.api.sound && this.api.sound(330); speak("hmm, that doesn't belong"); this.render();
      }
    },
    _win: function () {
      var api = this.api; this.solved = true;
      if (Core.firstAttemptCorrect(this.round, this.cstate)) this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      this.msg = api.t('win'); this.api.sound && this.api.sound(940); this.render(); this.announce(this.msg);
      speak('All sorted — Mim remembers');
    },

    _renderDone: function (root) {
      var self = this, api = this.api, n = (this._pool && this._pool.length) || 9;
      // the sorted things drift into the Memory Garden
      var garden = api.el('div', 'mb-garden');
      this.round.spill.forEach(function (noun) { var im = api.el('img', 'mb-gardenimg'); im.src = imgURL(noun); im.alt = Core.info(noun).label; im.draggable = false; garden.appendChild(im); });
      root.appendChild(garden);
      var vase = api.el('div', 'mb-vase');
      for (var i = 0; i < n; i++) { var s = api.el('span', 'mb-bloom' + (i < this.solvedCount ? ' mb-bloom-on' : '')); s.textContent = '🌸'; vase.appendChild(s); }
      root.appendChild(vase);
      var nudge = api.el('div', 'mb-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
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
      fetch('/mini-tools/mims-baskets-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[mims-baskets] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.mb-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.mb-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,10px);background:linear-gradient(180deg,#F3EFFA,#FBF3E4);border-radius:20px;padding:clamp(8px,1.8vw,13px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.mb-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.mb-mim{width:clamp(32px,7.5vw,46px);flex:0 0 auto;}.mb-mim svg{width:100%;height:auto;display:block;}'
        + '.mb-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.mb-head-win .mb-say{color:' + C.CORAL2 + ';}'
        /* spill tray */
        + '.mb-spill{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;background:#fff;border:2px dashed rgba(20,107,94,.22);border-radius:14px;padding:4px 8px;min-height:56px;}'
        + '.mb-spilllab{font:700 clamp(9px,2.3vw,11px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;opacity:.7;}'
        + '.mb-things{display:flex;flex-wrap:wrap;gap:clamp(5px,1.5vw,9px);justify-content:center;align-items:flex-start;min-height:44px;}'
        + '.mb-allgone{font:800 22px/1 "Baloo 2",sans-serif;color:' + C.T + ';opacity:.5;}'
        + '.mb-thing{display:flex;flex-direction:column;align-items:center;gap:0;min-width:52px;min-height:56px;border:2px solid transparent;border-radius:12px;background:#FBF7EF;cursor:pointer;touch-action:manipulation;padding:2px 4px;box-shadow:0 2px 0 rgba(20,107,94,.08);}.mb-thing:active{transform:translateY(1px);}'
        + '.mb-thingimg{width:clamp(38px,9vw,48px);height:clamp(38px,9vw,48px);object-fit:contain;display:block;}'
        + '.mb-thingcap{font:700 clamp(10px,2.5vw,12px)/1 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.mb-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.22),0 2px 0 ' + C.CORAL2 + ';background:#FFF6EF;transform:translateY(-3px);}'
        /* baskets */
        + '.mb-baskets{display:flex;flex-wrap:wrap;gap:clamp(5px,1.6vw,9px);justify-content:center;width:100%;}'
        + '.mb-basket{flex:1 1 28%;min-width:clamp(86px,28vw,130px);min-height:58px;display:flex;flex-direction:column;align-items:center;gap:2px;border:2px solid rgba(20,107,94,.22);border-radius:14px;background:#EAF2EE;cursor:pointer;touch-action:manipulation;padding:4px;box-shadow:0 2px 0 rgba(20,107,94,.1);}.mb-basket:active{transform:translateY(1px);}'
        + '.mb-bhead{display:flex;align-items:center;justify-content:center;gap:4px;}'
        + '.mb-bicon{font-size:clamp(17px,4.2vw,22px);line-height:1;}'
        + '.mb-blab{font:800 clamp(12px,3vw,15px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.mb-nest{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;min-height:22px;}.mb-nestimg{width:clamp(20px,5vw,28px);height:clamp(20px,5vw,28px);object-fit:contain;animation:mbNestle .4s ease both;}@keyframes mbNestle{0%{transform:scale(.4);opacity:0;}100%{transform:scale(1);opacity:1;}}'
        + '.mb-nope{animation:mbNope .34s;}@keyframes mbNope{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}'
        + '.mb-thing:focus-visible,.mb-basket:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* done — the Memory Garden */
        + '.mb-garden{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:14px;padding:7px 10px;max-width:92%;}.mb-gardenimg{width:clamp(34px,8vw,46px);height:clamp(34px,8vw,46px);object-fit:contain;}'
        + '.mb-vase{display:flex;gap:1px;flex-wrap:wrap;justify-content:center;}.mb-bloom{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.mb-bloom-on{filter:none;}'
        + '.mb-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* short-height compaction */
        + '@media (max-height:940px){.mb-root{gap:4px;}.mb-spill{min-height:50px;}.mb-basket{min-height:54px;}.mb-thingimg{width:clamp(38px,9vw,44px);height:clamp(38px,9vw,44px);}}'
        + '@media (max-height:720px){.mb-mim{width:32px;}.mb-thingimg{width:42px;height:42px;}}'
        + '@media (max-height:640px){.mb-root{gap:2px;padding:6px;}.mb-mim{width:26px;}.mb-head{gap:4px;}.mb-say{font-size:10.5px;}.mb-spill{min-height:42px;padding:3px 7px;gap:1px;}.mb-thing{min-width:48px;min-height:50px;padding:1px 3px;}.mb-thingimg{width:36px;height:36px;}.mb-thingcap{font-size:10px;}.mb-baskets{gap:4px;}.mb-basket{min-height:48px;padding:3px;}.mb-bicon{font-size:16px;}.mb-blab{font-size:12px;}.mb-nest{min-height:18px;}.mb-nestimg{width:20px;height:20px;}}'
        + '@media (max-width:340px){.mb-root{padding:6px;}.mb-baskets{gap:4px;}}'
        + '@media (prefers-reduced-motion:reduce){.mb-nestimg,.mb-nope{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-mims-baskets', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'mims-baskets.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'instruction'; }
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
