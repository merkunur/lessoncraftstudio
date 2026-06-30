/* =====================================================================
   CLUNK'S LOST LUNCH — ACTIVITY  (clunks-lost-lunch-activity.js)
   ---------------------------------------------------------------------
   CCSS K.OA.A.3 (decompose a number more than one way) + 1.OA.D.8 (the unknown
   completer). Clunk the dented snack-robot feels his hunger ("I need exactly 10
   crunch-units!") but his adding chip cracked — so the child is his helper: tap
   snacks (each a hunger-NUMBER) off the wall into a lunchbox, plan a combination
   making exactly T, then FEED Clunk (the lever — the ONLY evaluator).

   THE ANTI-CHEAT: the lunchbox shows the snacks, NEVER a running total — the
   child must add it up themselves; the feed is the only evaluator; a wrong feed
   returns the snacks to the wall (non-directional). The default loop asks for a
   second DIFFERENT way (multiset-distinct) — K.OA.A.3 literal.

   Decompose cognition + the no-aggregate SOLVERS live in mini tools/
   make-total-core.js (pure). answerType:'state'. Clunk + snacks = SVG STUBS for
   CA5 (NO image-library → no 404). No timer/score/streak; a wrong feed is a warm
   "let's pack a fresh one". 0 lines to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MakeTotalCore;
  var LANG = 'en';
  var C = { T: '#146B5E', T2: '#0e4f45', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', GOLD: '#E8A53A', INK: '#2A2A35' };
  var WORDS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty' };
  var WORDS_DE = { 0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf', 6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn', 11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn', 15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn', 20: 'zwanzig' };
  function numWord(c) { var w = (LANG === 'de' ? WORDS_DE : WORDS)[c]; return (w != null) ? w : c; }
  var SNACKCOL = ['#F2A65A', '#7FB069', '#8FB8DE', '#E8A53A', '#C98BB9', '#6FC3B8'];

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'de' ? 'de-DE' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function clunkSVG(mood) {
    var happy = mood === 'happy';
    return '<svg viewBox="0 0 100 100" role="img" aria-label="Clunk">'
      + '<rect x="20" y="30" width="60" height="50" rx="12" fill="#9aa3ab"/><rect x="20" y="30" width="60" height="50" rx="12" fill="none" stroke="#6e767e" stroke-width="3"/>'
      + '<rect x="30" y="44" width="40" height="22" rx="6" fill="' + (happy ? '#FFE9A8' : '#cfe9f6') + '"/>'                       // tummy window
      + '<circle cx="36" cy="22" r="7" fill="#cfd4da"/><rect x="34" y="14" width="4" height="10" fill="#6e767e"/>'
      + '<circle cx="64" cy="22" r="7" fill="#cfd4da"/><rect x="62" y="14" width="4" height="10" fill="#6e767e"/>'
      + '<circle cx="38" cy="40" r="3.4" fill="#2A2A35"/><circle cx="62" cy="40" r="3.4" fill="#2A2A35"/>'
      + (happy ? '<path d="M44 56 q6 6 12 0" stroke="#D9842F" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<path d="M45 56 q5 2 10 0" stroke="#6e767e" stroke-width="2.4" fill="none" stroke-linecap="round"/>')
      + '</svg>';
  }
  function snackSVG(cost) {
    var col = SNACKCOL[(cost | 0) % SNACKCOL.length];
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="18" y="22" width="64" height="58" rx="14" fill="' + col + '"/><rect x="18" y="22" width="64" height="58" rx="14" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="3"/>'
      + '<circle cx="38" cy="44" r="4" fill="#2A2A35"/><circle cx="62" cy="44" r="4" fill="#2A2A35"/><path d="M40 58 q10 7 20 0" stroke="#2A2A35" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
  }

  global.ClunksLostLunchActivity = {
    id: 'clunks-lost-lunch-activity',
    reward: { id: 'lunchbox', label: "Clunk's Lunchbox", emoji: '🍱' },

    strings: {
      title: { en: "Clunk's Lost Lunch", de: 'Clunks verlorenes Mittagessen' },
      instruction: { en: 'Make Clunk’s number with snacks, then feed him.', de: 'Bilde Clunks Zahl mit Snacks und füttere ihn dann!' },
      prompt: { en: 'Make his number!', de: 'Bilde seine Zahl!' },
      needs: { en: 'Clunk needs', de: 'Clunk braucht' },
      crunch: { en: 'crunch-units', de: 'Knusper' },
      qFree: { en: 'Pick snacks that make {n} — any way you like!', de: 'Wähle Snacks, die zusammen {n} ergeben – ganz wie du magst!' },
      qTwoWays: { en: 'Make {n} — then a WHOLE new way!', de: 'Mach {n} – und dann auf eine GANZ neue Weise!' },
      qNewWay: { en: 'Yum! Now make {n} a different way!', de: 'Lecker! Jetzt mach {n} auf eine andere Weise!' },
      qMissing: { en: 'Clunk already holds {g}. Add the snack that makes {n}!', de: 'Clunk hat schon {g}. Lege den Snack dazu, der {n} ergibt!' },
      qMulti: { en: 'Clunk holds {g}. Finish to {n} with exactly TWO snacks!', de: 'Clunk hat {g}. Ergänze auf {n} – mit genau ZWEI Snacks!' },
      qExactN: { en: 'Make {n} using exactly {k} snacks!', de: 'Bilde {n} mit genau {k} Snacks!' },
      qConstrained: { en: 'Make {n} — only these snacks today!', de: 'Bilde {n} – heute gibt es nur diese Snacks!' },
      qReduce: { en: 'Too full! Take snacks back until it makes {n}.', de: 'Zu voll! Nimm Snacks heraus, bis es {n} ergibt.' },
      hintFeed: { en: 'Tap snacks into the lunchbox, then feed Clunk!', de: 'Tippe Snacks in die Lunchbox und füttere dann Clunk!' },
      hintReduce: { en: 'Tap a lunchbox snack to put it back.', de: 'Tippe einen Snack in der Lunchbox an, um ihn zurückzulegen.' },
      lever: { en: 'Feed Clunk! 🍴', de: 'Clunk füttern! 🍴' },
      lunchboxLab: { en: 'Lunchbox', de: 'Lunchbox' },
      emptyBox: { en: 'tap snacks to add them', de: 'Tippe Snacks an, um sie hinzuzufügen' },
      wrong: { en: "Hmm — not quite my size! Let's pack a fresh one.", de: 'Hmm – das ist nicht ganz meine Größe! Pack eine frische Lunchbox.' },
      repeat: { en: "That's the same way — try a different one!", de: 'Das ist der gleiche Weg – probier einen anderen!' },
      nextWay: { en: 'Yum! Now make it a WHOLE new way!', de: 'Lecker! Jetzt mach es auf eine GANZ neue Weise!' },
      win: { en: '{combo} makes {n} — yum! 🍱', de: '{combo} macht {n} – lecker! 🍱' },
      winTwo: { en: 'Two ways to make {n} — Clunk is full! 🍱', de: 'Zwei Wege zu {n} – Clunk ist satt! 🍱' },
      tapCheck: { en: 'Tap Check! ✓', de: 'Tippe auf Prüfen! ✓' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.solved = false; this.solvedCount = 0; this.msg = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round); this.solved = false; this.msg = null; this.schema = round.schema; this.winCombo = null;
    },
    announce: function (s) { if (this.api.announce) this.api.announce(s); },
    _T: function () { return this.round.target | 0; },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'cl-wrap'); var root = api.el('div', 'cl-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }

      var head = api.el('div', 'cl-head' + (this.solved ? ' cl-head-win' : ''));
      var clunk = api.el('span', 'cl-clunk'); clunk.innerHTML = clunkSVG(this.solved ? 'happy' : 'idle');
      var say = api.el('span', 'cl-say'); say.textContent = this.msg || this._question();
      head.appendChild(clunk); head.appendChild(say); root.appendChild(head);

      if (this.solved) { this._renderDone(root); wrap.appendChild(root); stage.appendChild(wrap); return; }

      root.appendChild(this._targetCard());
      root.appendChild(this._wall());
      root.appendChild(this._tray());
      root.appendChild(this._lever());

      wrap.appendChild(root); stage.appendChild(wrap);
    },
    _question: function () {
      var api = this.api, n = this._T(), g = (this.round.given || [])[0];
      switch (this.schema) {
        case 'two-ways': return api.t(this.cstate.wayCount >= 1 ? 'qNewWay' : 'qTwoWays').replace(/\{n\}/g, n);
        case 'missing-addend': return api.t('qMissing').replace('{g}', g).replace('{n}', n);
        case 'multi-completer': return api.t('qMulti').replace('{g}', g).replace('{n}', n);
        case 'exact-n': return api.t('qExactN').replace('{n}', n).replace('{k}', this.round.exactN);
        case 'constrained-wall': return api.t('qConstrained').replace('{n}', n);
        case 'reduce': return api.t('qReduce').replace('{n}', n);
        default: return api.t('qFree').replace('{n}', n);
      }
    },

    /* ----- the target card: Clunk's hunger T (NO tray sum, ever) ----- */
    _targetCard: function () {
      var api = this.api, card = api.el('div', 'cl-target');
      var lab = api.el('span', 'cl-tlab'); lab.textContent = api.t('needs'); card.appendChild(lab);
      var n = api.el('span', 'cl-tnum'); n.textContent = this._T(); card.appendChild(n);
      var u = api.el('span', 'cl-tunit'); u.textContent = api.t('crunch'); card.appendChild(u);
      return card;
    },

    /* ----- the wall: a grid of snack cubbies (the palette; tap to add; clone-on-tap) ----- */
    _wall: function () {
      var self = this, api = this.api, costs = (this.schema === 'constrained-wall' ? this.round.allow : this.round.wall) || [];
      var wall = api.el('div', 'cl-wall');
      costs.forEach(function (cost) {
        var b = api.el('button', 'cl-cubby'); b.type = 'button'; b.innerHTML = snackSVG(cost);
        var flag = api.el('span', 'cl-flag'); flag.textContent = cost; b.appendChild(flag);
        b.setAttribute('aria-label', LANG === 'de' ? ('Snack mit dem Wert ' + cost + ' – zum Hinzufügen antippen') : ('a ' + cost + ' snack — tap to add'));
        b.addEventListener('click', function () { Core.addChip(self.cstate, cost); self.api.sound && self.api.sound(520 + cost * 18); self.msg = null; self.render(); });
        wall.appendChild(b);
      });
      return wall;
    },

    /* ----- the lunchbox tray: the chips (NO sum); tap to remove (locked reject) ----- */
    _tray: function () {
      var self = this, api = this.api, s = this.cstate, box = api.el('div', 'cl-box');
      var lab = api.el('div', 'cl-boxlab'); lab.textContent = api.t('lunchboxLab'); box.appendChild(lab);
      var chips = api.el('div', 'cl-chips');
      if (!s.tray.length) { var e = api.el('span', 'cl-emptybox'); e.textContent = api.t('emptyBox'); chips.appendChild(e); }
      s.tray.forEach(function (c) {
        var chip = api.el('button', 'cl-chip' + (c.locked ? ' cl-locked' : '')); chip.type = 'button'; chip.innerHTML = snackSVG(c.cost);
        var f = api.el('span', 'cl-chipnum'); f.textContent = c.cost; chip.appendChild(f);
        if (c.locked) { var lk = api.el('span', 'cl-lock'); lk.textContent = '🔒'; chip.appendChild(lk); }
        else { var x = api.el('span', 'cl-x'); x.textContent = '×'; chip.appendChild(x); }
        chip.setAttribute('aria-label', LANG === 'de'
          ? (c.locked ? ('Clunk hat einen Snack mit dem Wert ' + c.cost) : ('Snack mit dem Wert ' + c.cost + ' – zum Zurücklegen antippen'))
          : ((c.locked ? 'Clunk holds a ' : 'a ') + c.cost + ' snack' + (c.locked ? '' : ' — tap to take it back')));
        chip.addEventListener('click', function () { if (c.locked) { chip.classList.add('cl-shake'); return; } Core.removeChip(s, c.id); self.api.sound && self.api.sound(360); self.msg = null; self.render(); });
        chips.appendChild(chip);
      });
      box.appendChild(chips); return box;
    },

    _lever: function () {
      var self = this, api = this.api, wrap = api.el('div', 'cl-leverwrap');
      var lever = api.el('button', 'cl-lever'); lever.type = 'button'; lever.textContent = api.t('lever');
      lever.addEventListener('click', function () { self._feed(); });
      wrap.appendChild(lever); return wrap;
    },

    _feed: function () {
      var api = this.api, costs = Core.trayCosts(this.cstate).slice();
      var r = Core.commit(this.cstate);
      if (r === 'sealed') { this.winCombo = costs; this._win(); }
      else if (r === 'next-way') { this.api.sound && this.api.sound(760); this.msg = api.t('nextWay'); speak(LANG === 'de' ? 'Jetzt ein neuer Weg!' : 'now a new way'); this.render(); }
      else if (r === 'repeat') { this.api.sound && this.api.sound(440); this.msg = api.t('repeat'); this.render(); }
      else { this.api.sound && this.api.sound(330); this.msg = api.t('wrong'); speak(LANG === 'de' ? 'Nicht ganz meine Größe!' : 'not quite my size'); this.render(); }   // wrong — non-directional, snacks returned
    },
    _win: function () {
      var api = this.api, n = this._T();
      this.solved = true; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 9);
      var combo = (this.winCombo || []).map(numWord).join(LANG === 'de' ? ' und ' : ' and ');
      this.msg = (this.schema === 'two-ways') ? api.t('winTwo').replace('{n}', n) : api.t('win').replace('{combo}', combo).replace('{n}', n);
      this.api.sound && this.api.sound(940); this.render(); this.announce(this.msg);
      speak((this.winCombo || []).map(numWord).join(', ') + (LANG === 'de' ? ' macht ' : ' makes ') + numWord(n));
    },
    _renderDone: function (root) {
      var api = this.api, n = (this._pool && this._pool.length) || 9, gallery = api.el('div', 'cl-gallery');
      for (var i = 0; i < n; i++) { var sp = api.el('span', 'cl-meal' + (i < this.solvedCount ? ' cl-meal-on' : '')); sp.textContent = '🍱'; gallery.appendChild(sp); }
      root.appendChild(gallery);
      // replay the winning combo as snack chips (the cascade)
      if (this.winCombo && this.winCombo.length) {
        var cz = api.el('div', 'cl-chips cl-cascade');
        this.winCombo.forEach(function (cost) { var chip = api.el('span', 'cl-chip cl-chip-static'); chip.innerHTML = snackSVG(cost); var f = api.el('span', 'cl-chipnum'); f.textContent = cost; chip.appendChild(f); cz.appendChild(chip); });
        root.appendChild(cz);
      }
      var nudge = api.el('div', 'cl-nextnudge'); nudge.textContent = api.t('tapCheck'); root.appendChild(nudge);
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
      fetch('/mini-tools/clunks-lost-lunch-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[clunks-lost-lunch] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.cl-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,540px);margin:0 auto;}'
        + '.cl-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(4px,1.2vw,8px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(7px,1.6vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.cl-head{display:flex;align-items:center;gap:7px;justify-content:center;width:100%;}'
        + '.cl-clunk{width:clamp(30px,7vw,42px);flex:0 0 auto;}.cl-clunk svg{width:100%;height:auto;display:block;}'
        + '.cl-say{font:700 clamp(11.5px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.T + ';text-align:center;}.cl-head-win .cl-say{color:' + C.CORAL2 + ';}'
        /* target card */
        + '.cl-target{display:inline-flex;align-items:center;gap:6px;background:#fff;border:2px solid rgba(20,107,94,.2);border-radius:14px;padding:3px 14px;}'
        + '.cl-tlab{font:700 clamp(11px,2.8vw,13px)/1 "Nunito",sans-serif;color:' + C.T + ';}.cl-tnum{font:800 clamp(26px,7vw,34px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}.cl-tunit{font:700 clamp(10px,2.5vw,12px)/1 "Nunito",sans-serif;color:#9a8f78;}'
        /* the wall (palette grid) */
        + '.cl-wall{display:grid;grid-template-columns:repeat(3,minmax(48px,1fr));gap:clamp(4px,1.4vw,8px);justify-content:center;width:100%;max-width:300px;}'
        + '@media (min-width:420px){.cl-wall{grid-template-columns:repeat(auto-fit,minmax(56px,64px));max-width:480px;}}'
        + '.cl-cubby{position:relative;min-height:50px;border-radius:12px;border:2px solid rgba(20,107,94,.18);background:#fff;cursor:pointer;touch-action:manipulation;display:flex;align-items:center;justify-content:center;padding:3px;box-shadow:0 2px 0 rgba(20,107,94,.12);}.cl-cubby:active{transform:translateY(1px);}'
        + '.cl-cubby svg{width:clamp(28px,6.5vw,36px);height:clamp(28px,6.5vw,36px);display:block;}'
        + '.cl-flag{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:' + C.T + ';color:#fff;font:800 13px/20px "Baloo 2",sans-serif;text-align:center;padding:0 4px;box-shadow:0 1px 0 rgba(0,0,0,.15);}'
        /* the lunchbox tray */
        + '.cl-box{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;max-width:330px;background:#EAF2EE;border:2px solid rgba(20,107,94,.16);border-radius:14px;padding:4px 8px;min-height:54px;}'
        + '.cl-boxlab{font:700 clamp(10px,2.5vw,12px)/1 "Nunito",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;opacity:.8;}'
        + '.cl-chips{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;min-height:44px;}'
        + '.cl-emptybox{font:700 clamp(11px,2.8vw,12.5px)/1 "Nunito",sans-serif;color:#b9b0a0;font-style:italic;}'
        + '.cl-chip{position:relative;min-width:44px;min-height:44px;border:0;background:transparent;cursor:pointer;border-radius:10px;touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;padding:0;}'
        + '.cl-chip svg{width:clamp(30px,7vw,38px);height:clamp(30px,7vw,38px);display:block;}'
        + '.cl-chipnum{position:absolute;top:-3px;right:-3px;min-width:18px;height:18px;border-radius:9px;background:' + C.T + ';color:#fff;font:800 12px/18px "Baloo 2",sans-serif;text-align:center;padding:0 3px;}'
        + '.cl-x{position:absolute;bottom:-3px;right:-3px;width:16px;height:16px;border-radius:50%;background:' + C.CORAL + ';color:#fff;font:800 12px/16px "Baloo 2",sans-serif;text-align:center;}.cl-locked .cl-chip svg,.cl-locked svg{opacity:.85;}.cl-lock{position:absolute;bottom:-3px;right:-3px;font-size:12px;}.cl-chip-static{cursor:default;}'
        + '.cl-shake{animation:clShake .3s;}@keyframes clShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}'
        + '.cl-cascade .cl-chip{animation:clCascade .5s ease both;}@keyframes clCascade{0%{opacity:0;transform:translateY(-16px);}100%{opacity:1;transform:translateY(0);}}@media (prefers-reduced-motion:reduce){.cl-cascade .cl-chip{animation:none;}}'
        /* lever */
        + '.cl-leverwrap{width:100%;max-width:330px;display:flex;justify-content:center;}'
        + '.cl-lever{width:100%;min-height:56px;border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.cl-lever:active{transform:translateY(3px);box-shadow:0 1px 0 ' + C.CORAL2 + ';}'
        + '.cl-cubby:focus-visible,.cl-chip:focus-visible,.cl-lever:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* done */
        + '.cl-gallery{display:flex;gap:1px;flex-wrap:wrap;justify-content:center;}.cl-meal{font-size:clamp(15px,3.6vw,19px);filter:grayscale(1) opacity(.4);}.cl-meal-on{filter:none;}'
        + '.cl-nextnudge{font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF3E9;border-radius:11px;padding:5px 12px;}'
        /* desktop two-column (wall left, tray+lever right) */
        + '@media (min-width:720px){.cl-root{}}'
        /* short-height compaction */
        + '@media (max-height:720px){.cl-clunk{width:30px;}.cl-tnum{font-size:26px;}}'
        + '@media (max-height:640px){.cl-root{gap:1px;padding:4px;}.cl-clunk{width:28px;}.cl-head{gap:5px;}.cl-cubby{min-height:44px;}.cl-cubby svg{width:26px;height:26px;}.cl-target{padding:1px 10px;}.cl-tnum{font-size:20px;}.cl-tlab,.cl-tunit{font-size:10px;}.cl-box{min-height:44px;padding:2px 7px;}.cl-boxlab{font-size:10px;}.cl-chips{min-height:40px;}.cl-chip{min-width:44px;min-height:40px;}.cl-chip svg{width:30px;height:30px;}.cl-lever{min-height:48px;}.cl-wall{gap:3px;}}'
        + '@media (max-width:340px){.cl-root{padding:4px;}.cl-wall{gap:3px;}.cl-chips{gap:3px;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-clunks-lost-lunch', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'clunks-lost-lunch.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintFeed'; }
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
