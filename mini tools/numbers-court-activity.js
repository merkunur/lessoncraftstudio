/* =====================================================================
   NUMBERS COURT — ACTIVITY  (numbers-court-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.OA.D.7 — the meaning of the EQUAL SIGN. Judge Tess presides;
   a witness makes a math claim; the child (addressed as "Judge") rules it
   TRUE/FALSE on a balance beam where "=" is a SEE-SAW FULCRUM (both sides
   the same amount — NEVER "the answer comes next"), then JUSTIFIES, then
   on some caught-false GOLD rounds REPAIRS it.

   3 stages within one round (internal state; the #6 two-step pattern):
     VERDICT — beam STATIC + LEVEL (the truth-motion is the REWARD, never
       the hint); tap It's fair! / Catch it!. Wrong → still beam + "are you
       sure?" (NO directional leak); 2nd wrong → both-pans re-teach.
     JUSTIFY — FALSE: tap the heavier pan. TRUE: OPERAND-BOUND deposit —
       tapping the "4" token deposits exactly 4 (no free-pour); the beam
       levels only when both pans hold their sums AND match.
     REPAIR (periodic, FALSE GOLD only) — place the tile that LEVELS the
       beam; a wrong tile REGENERATES a fresh same-form round (no grinding).

   Truth + proof DERIVED by mini tools/judge-balance-core.js (never stored).
   No timer/score/streak. Tess + witnesses + court cat = SVG PLACEHOLDERS.
   Numerals/operators ALWAYS DOM. 0 lines to the protected cores +
   lcs-shell.{js,css}. answerType:'state'.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.JudgeBalanceCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', BRASS: '#C79A3E', STEEL: '#9FB0B8', SHELL: '#8FB89C'
  };

  var LANG = 'en';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffle(a, rng) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* Judge Tess — ancient kind tortoise in an oversized powdered wig (SVG PLACEHOLDER). */
  function tessSVG(api) {
    return '<svg class="nc-tess-svg" viewBox="0 0 100 100" role="img" aria-label="' + esc(api && api.t ? api.t('judgeName') : 'Judge Tess') + '">' +
      '<ellipse cx="50" cy="92" rx="22" ry="5" fill="rgba(0,0,0,.08)"/>' +
      '<path d="M22 40 Q22 22 50 22 Q78 22 78 40 Q78 30 50 30 Q22 30 22 40 Z" fill="#EDEDF2"/>' +   /* wig */
      '<ellipse cx="30" cy="44" rx="9" ry="13" fill="#EDEDF2"/><ellipse cx="70" cy="44" rx="9" ry="13" fill="#EDEDF2"/>' +
      '<ellipse cx="50" cy="66" rx="26" ry="22" fill="' + C.SHELL + '"/>' +                          /* shell */
      '<path d="M30 60 Q50 52 70 60" stroke="#6FA37E" stroke-width="2" fill="none"/><path d="M28 70 Q50 64 72 70" stroke="#6FA37E" stroke-width="2" fill="none"/>' +
      '<circle cx="50" cy="44" r="15" fill="#A9C8B2"/>' +                                            /* head */
      '<g class="nc-eyes-open"><circle cx="44" cy="44" r="2.4" fill="' + C.INK + '"/><circle cx="56" cy="44" r="2.4" fill="' + C.INK + '"/></g>' +
      '<g class="nc-eyes-happy"><path d="M41 44 Q44 41 47 44" stroke="' + C.INK + '" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M53 44 Q56 41 59 44" stroke="' + C.INK + '" stroke-width="2" fill="none" stroke-linecap="round"/></g>' +
      '<path d="M45 50 Q50 53 55 50" stroke="' + C.INK + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }
  var WITNESS = { hopscotch: '🐰', crow: '🐦‍⬛', pip: '🐭', tilt: '🦫' };

  function dotsHTML(n, cls) { var s = ''; for (var i = 0; i < n; i++) s += '<span class="nc-dot ' + (cls || '') + '"></span>'; return s; }

  global.NumbersCourtActivity = {
    id: 'numbers-court-activity',

    /* it — native ensemble (linguista + pedagoga di 2ª). RELATIONAL-EQUALITY LOCK: «=» = «i due piatti
       hanno la stessa quantità» / «è in equilibrio» — MAI «il risultato» / «fa» / «la risposta» in copia
       affermativa (l'operativo solo dentro una negazione esplicita). Verdetto «È giusto!» / «Non è giusto!»
       («giusto» = equo AND in pari, tribunale+bilancia); NON «Vero/Falso», NON «corretto/sbagliato».
       classe seconda; STRAND «Numeri» auto (no algebra nucleus in Italy). la giudice Tess = femminile. */
    strings: {
      title: { en: 'Numbers Court', de: 'Das Zahlengericht', fr: 'Le tribunal des nombres', es: 'El tribunal de los números', pt: 'O Tribunal dos Números', it: 'Il Tribunale dei Numeri' },
      prompt: { en: 'Is it fair, Judge?', de: 'Stimmt das?', fr: 'Est-ce vrai, Madame la juge ?', es: '¿Es justo, jueza?', pt: 'É justo, juíza?', it: 'È giusto, Giudice?' },
      vTrue: { en: "It's fair!", de: 'Stimmt!', fr: 'Vrai', es: '¡Es justo!', pt: 'É justo!', it: 'È giusto!' }, vFalse: { en: 'Catch it!', de: 'Stimmt nicht!', fr: 'Faux', es: '¡Atrápalo!', pt: 'Não é justo!', it: 'Non è giusto!' },
      jFalse: { en: 'Tap the heavier side.', de: 'Tippe auf die schwerere Seite.', fr: 'Touche le plateau le plus lourd.', es: 'Toca el lado más pesado.', pt: 'Toque no lado mais pesado.', it: 'Tocca il piatto più pesante.' },
      jTrue: { en: 'Tap each number to fill both pans.', de: 'Tippe jede Zahl an, um beide Waagschalen zu füllen.', fr: 'Touche chaque nombre pour remplir les deux plateaux.', es: 'Toca cada número para llenar los dos platillos.', pt: 'Toque em cada número para encher os dois pratos.', it: 'Tocca ogni numero per riempire i due piatti.' },
      repair: { en: 'Make it fair — tap a tile for the slot.', de: 'Mach beide Seiten gleich viel — tippe ein Plättchen in die Lücke.', fr: 'Équilibre la balance — touche un jeton pour la case.', es: 'Deja los dos lados iguales: toca una ficha para el espacio.', pt: 'Deixe justo — toque numa ficha para o espaço.', it: 'Rendilo giusto: tocca una tessera per la casella vuota.' },
      sure: { en: 'Are you sure, Judge? Look again.', de: 'Bist du sicher? Schau noch mal.', fr: 'Hmm… regarde encore les deux côtés.', es: '¿Segura, jueza? Míralo otra vez.', pt: 'Tem certeza, juíza? Olhe de novo.', it: 'Ripensaci bene, Giudice. Guarda di nuovo.' },
      reteach: { en: 'This much AND this much — are they the same amount?', de: 'So viel und so viel — ist das auf beiden Seiten gleich viel?', fr: 'Autant d’un côté, autant de l’autre — est-ce la même chose des deux côtés ?', es: 'Esto de un lado y esto del otro… ¿es la misma cantidad?', pt: 'Tanto assim e tanto assim — os dois lados têm a mesma quantidade?', it: 'Tanto da una parte e tanto dall\'altra: i due piatti hanno la stessa quantità?' },
      winTrue: { en: 'Fair! Both sides are the same amount.', de: 'Stimmt! Beide Seiten sind gleich viel.', fr: 'Vrai ! Il y a la même chose des deux côtés.', es: '¡Justo! Los dos lados tienen la misma cantidad.', pt: 'Justo! Os dois lados têm a mesma quantidade.', it: 'Giusto! I due piatti hanno la stessa quantità.' },
      winFalse: { en: 'Caught it! The sides are not the same.', de: 'Erwischt! Die Seiten sind nicht gleich viel.', fr: 'Faux ! Les deux côtés ne sont pas pareils.', es: '¡Lo atrapaste! Los dos lados no son iguales.', pt: 'Pegou! Os dois lados não são iguais.', it: 'Preso! I due piatti non hanno la stessa quantità.' },
      winRepair: { en: 'Now it balances — fair, Judge!', de: 'Jetzt ist die Waage im Gleichgewicht — gleich viel!', fr: 'La balance s’équilibre — bien joué, Madame la juge !', es: '¡Ahora se equilibra… justo, jueza!', pt: 'Agora equilibra — justo, juíza!', it: 'Ora è in equilibrio: giusto, Giudice!' },
      regen: { en: 'Still not level — here is a fresh one, Judge.', de: 'Immer noch nicht im Gleichgewicht — hier ist eine neue Aufgabe.', fr: 'Toujours pas d’équilibre — voici une nouvelle affaire, Madame la juge.', es: 'Todavía no se equilibra… aquí tienes un caso nuevo, jueza.', pt: 'Ainda não equilibrou — aqui vai outro caso, juíza.', it: 'Ancora non è in equilibrio: ecco un nuovo caso, Giudice.' },
      hintCheck: { en: 'Give your verdict, then tap Check.', de: 'Fäll dein Urteil, dann tippe auf „Prüfen".', fr: 'Donne ton verdict, puis touche « Vérifier ».', es: 'Da tu veredicto y luego toca "Revisar".', pt: 'Dê o seu veredito e toque em "Verificar".', it: 'Dai il tuo verdetto, poi tocca "Verifica".' },
      judgeName: { en: 'Judge Tess', de: 'Richterin Tess', fr: 'La juge Tess', es: 'La jueza Tess', pt: 'A juíza Tess', it: 'La giudice Tess' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._rng = mulberry32((Date && false) ? 1 : ((Math.floor((global.performance && global.performance.now ? global.performance.now() : 1) * 1000) % 90000) + 1));
      this._pool = makeTasks(Core.buildPool(this._rng, 12));
      this._order = null; this._curPass = 0; this._orderForPool = null;
      this.round = null; this.stage = 'verdict'; this.verdict = null; this.wrong = 0;
      this.fill = { left: 0, right: 0 }; this.deposited = {}; this.slotVal = null; this.readOnly = false; this.solved = 0; this.tilt = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (round) {
      this.round = round; this.stage = 'verdict'; this.verdict = null; this.wrong = 0;
      this.fill = { left: 0, right: 0 }; this.deposited = {}; this.slotVal = null; this.readOnly = false; this.tilt = 0;
      this._repair = null;
    },

    sums: function () { return { left: Core.evalSide(this.round.expr.left), right: Core.evalSide(this.round.expr.right) }; },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'nc-wrap');
      var court = api.el('div', 'nc-court'); this._courtEl = court;
      if (!this.round) { wrap.appendChild(court); stage.appendChild(wrap); return; }

      /* cast row: Tess + the witness */
      var cast = api.el('div', 'nc-cast');
      var tess = api.el('div', 'nc-tess'); tess.setAttribute('data-pose', this.readOnly ? 'happy' : 'idle'); tess.innerHTML = tessSVG(api); this._tessEl = tess;
      var wit = api.el('div', 'nc-witness'); wit.textContent = WITNESS[this.round.witness] || '🐰';
      cast.append(tess, wit); court.appendChild(cast);

      /* the equation over the balance (numbers stay horizontal + readable) */
      court.appendChild(this._renderBalance());

      /* per-stage controls */
      var ctrl = api.el('div', 'nc-ctrl'); this._ctrlEl = ctrl;
      this._renderControls(ctrl);
      court.appendChild(ctrl);

      /* court-cat vessel (monotonic) */
      var shelf = api.el('div', 'nc-shelf');
      for (var i = 0; i < ((this._pool && this._pool.length) || 12); i++) { var p = api.el('span', 'nc-scroll'); shelf.appendChild(p); }
      this._shelfEl = shelf; court.appendChild(shelf);

      wrap.appendChild(court); stage.appendChild(wrap);
      this._paintShelf();
    },

    _renderBalance: function () {
      var self = this, api = this.api, r = this.round;
      var bal = api.el('div', 'nc-balance');
      // equation row
      var eq = api.el('div', 'nc-eq');
      this._sideTokens(eq, 'left');
      var eqs = api.el('span', 'nc-eqsign'); eqs.textContent = '='; eq.appendChild(eqs);
      this._sideTokens(eq, 'right');
      bal.appendChild(eq);
      // the see-saw
      var beam = api.el('div', 'nc-beam');
      var bar = api.el('div', 'nc-bar'); bar.style.transform = 'rotate(' + this.tilt + 'deg)';
      var lp = api.el('button', 'nc-pan nc-pan-l'); lp.type = 'button'; lp.setAttribute('data-side', 'left'); lp.innerHTML = '<span class="nc-pan-dots">' + dotsHTML(this.fill.left, 'l') + '</span>';
      var rp = api.el('button', 'nc-pan nc-pan-r'); rp.type = 'button'; rp.setAttribute('data-side', 'right'); rp.innerHTML = '<span class="nc-pan-dots">' + dotsHTML(this.fill.right, 'r') + '</span>';
      if (this.stage === 'justify' && this.verdict === false) {
        // FALSE-justify: tap the heavier pan
        [lp, rp].forEach(function (pan) { pan.addEventListener('click', function () { self._tapPan(pan.getAttribute('data-side')); }); });
        lp.classList.add('nc-pan-tap'); rp.classList.add('nc-pan-tap');
      } else { lp.disabled = true; rp.disabled = true; }
      bar.append(lp, rp); beam.appendChild(api.el('div', 'nc-fulcrum')); beam.appendChild(bar);
      bal.appendChild(beam);
      this._barEl = bar; this._lpEl = lp; this._rpEl = rp;
      return bal;
    },

    /* render one side's tokens; in TRUE-justify they're operand-bound deposit buttons; in repair the slot is a "?" */
    _sideTokens: function (eq, side) {
      var self = this, api = this.api, tokens = this.round.expr[side], depositMode = (this.stage === 'justify' && this.verdict === true && Core.isTrue(this.round));
      var grp = api.el('span', 'nc-side nc-side-' + side);
      tokens.forEach(function (tok, i) {
        var isSlot = self.stage === 'repair' && self._repair && self._repair.side === side && self._repair.slotIndex === i;
        if (tok.op) { var op = api.el('span', 'nc-op'); op.textContent = tok.op; grp.appendChild(op); }
        if (isSlot) {
          var slot = api.el('span', 'nc-slot'); slot.textContent = self.slotVal == null ? '?' : self.slotVal;
          if (self.slotVal != null) slot.classList.add('nc-slot-filled'); grp.appendChild(slot); return;
        }
        if (depositMode && !self.readOnly) {
          var key = side + i, used = self.deposited[key];
          var b = api.el('button', 'nc-num nc-num-tap' + (used ? ' nc-num-used' : '')); b.type = 'button'; b.textContent = tok.t;
          if (!used) b.addEventListener('click', function () { self._deposit(side, i, tok.t); });
          grp.appendChild(b);
        } else { var n = api.el('span', 'nc-num'); n.textContent = tok.t; grp.appendChild(n); }
      });
      eq.appendChild(grp);
    },

    _renderControls: function (ctrl) {
      var self = this, api = this.api;
      if (this.readOnly) return;
      if (this.stage === 'verdict') {
        var hint0 = api.el('div', 'nc-sub'); hint0.textContent = this.wrong >= 2 ? this.api.t('reteach') : ''; if (hint0.textContent) ctrl.appendChild(hint0);
        var row = api.el('div', 'nc-verdict');
        var tb = api.el('button', 'nc-vbtn nc-vtrue'); tb.type = 'button'; tb.textContent = this.api.t('vTrue'); tb.addEventListener('click', function () { self._verdict(true); });
        var fb = api.el('button', 'nc-vbtn nc-vfalse'); fb.type = 'button'; fb.textContent = this.api.t('vFalse'); fb.addEventListener('click', function () { self._verdict(false); });
        row.append(tb, fb); ctrl.appendChild(row);
      } else if (this.stage === 'justify') {
        var h = api.el('div', 'nc-sub'); h.textContent = this.api.t(this.verdict === false ? 'jFalse' : 'jTrue'); ctrl.appendChild(h);
      } else if (this.stage === 'repair') {
        var hr = api.el('div', 'nc-sub'); hr.textContent = this.api.t('repair'); ctrl.appendChild(hr);
        var tray = api.el('div', 'nc-tray');
        shuffle(this._repair.tray, this._rng).forEach(function (v) {
          var t = api.el('button', 'nc-tile'); t.type = 'button'; t.textContent = v; t.addEventListener('click', function () { self._placeTile(v, t); });
          tray.appendChild(t);
        });
        ctrl.appendChild(tray);
      }
    },

    /* ---------- stage 0: verdict ---------- */
    _verdict: function (v) {
      if (this.readOnly) return;
      var correct = (v === Core.isTrue(this.round));
      if (!correct) {
        this.wrong++; this.api.sound && this.api.sound(320);
        this.api.announce && this.api.announce(this.wrong >= 2 ? this.api.t('reteach') : this.api.t('sure'));
        speak(this.wrong >= 2 ? this.api.t('reteach') : this.api.t('sure'));
        this.tilt = 0;   // NO directional leak — beam stays level
        this.render();
        return;
      }
      this.verdict = v; this.stage = 'justify'; this.api.sound && this.api.sound(700);
      this.render();
    },

    /* ---------- stage 1: justify ---------- */
    _tapPan: function (side) {   // FALSE-justify
      if (this.readOnly || this.stage !== 'justify' || this.verdict !== false) return;
      var heavy = Core.heavier(this.round);
      if (side === heavy) {
        var s = this.sums(); this.fill.left = s.left; this.fill.right = s.right;
        this.tilt = heavy === 'left' ? -9 : 9;
        if (Core.repairTarget(this.round) && this._wantRepair()) { this._toRepair(); }
        else this._win('winFalse');
      } else { this.wrong++; this.api.sound && this.api.sound(320); this.api.announce && this.api.announce(this.api.t('sure')); this.render(); }
    },
    _deposit: function (side, i, val) {   // TRUE-justify (operand-bound)
      if (this.readOnly || this.stage !== 'justify' || this.verdict !== true) return;
      this.deposited[side + i] = true; this.fill[side] += Math.abs(val); this.api.sound && this.api.sound(560 + this.fill[side] * 12);
      var s = this.sums();
      if (this.fill.left === s.left && this.fill.right === s.right) {
        this.tilt = 0;   // settles level
        this._win('winTrue');
      } else this.render();
    },

    /* ---------- stage 3: repair ---------- */
    _wantRepair: function () { return this._forceRepair != null ? this._forceRepair : (this._rng() < 0.5); },   // ~half of repairable caught-false rounds (test hook: _forceRepair)
    _toRepair: function () {
      this._repair = Core.repairTarget(this.round); this.slotVal = null; this.stage = 'repair';
      this.api.announce && this.api.announce(this.api.t('repair')); this.render();
    },
    _placeTile: function (v, btn) {
      if (this.readOnly) return;
      this.slotVal = v;
      if (Core.repairLevels(this.round, v)) { this.fill = this.sums(); this.tilt = 0; this._win('winRepair'); }
      else {
        this.api.sound && this.api.sound(320); this.api.announce && this.api.announce(this.api.t('regen')); speak(this.api.t('regen'));
        if (btn) { btn.classList.add('nc-bonk'); }
        var self = this; setTimeout(function () { self._regenerate(); }, 700);
      }
    },
    _regenerate: function () {
      // REGENERATE a fresh FALSE round of the SAME form (new numbers) → back to verdict
      var form = this.round.form, fresh = null, n = 0;
      while (n++ < 40) { var g = Core.generateRound(form, this._rng, { truth: false }); if (Core.repairTarget(g)) { fresh = g; break; } }
      if (!fresh) { this._win('winRepair'); return; }
      fresh.id = this.round.id; fresh.band = this.round.band; fresh.witness = this.round.witness;
      this.setupTask(fresh); this.render();
    },

    _win: function (key) {
      this.readOnly = true; this.stage = 'done';
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 12);
      this.api.sound && this.api.sound(880); this._setPose('happy');
      this.render();
      var msg = this.api.t(key); this.api.announce && this.api.announce(msg); speak(msg);
    },

    _paintShelf: function () { if (!this._shelfEl) return; var p = this._shelfEl.children; for (var i = 0; i < p.length; i++) p[i].classList.toggle('nc-scroll-on', i < this.solved); },
    _setPose: function (n) { if (this._tessEl) this._tessEl.setAttribute('data-pose', n); },
    isCorrect: function () { return this.stage === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); },
    _rebuildPool: function () { this._pool = makeTasks(Core.buildPool(this._rng, 12)); this._order = null; this._orderForPool = null; return this._pool; },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks(Core.buildPool(this._rng, 12));
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null, this._rng); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n);
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order, this._rng); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/numbers-court-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (row) self._activityRow = row; })
        .catch(function (e) { if (global.console && console.warn) console.warn('[numbers-court] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.nc-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.nc-court{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);'
        +   'background:linear-gradient(180deg,#F3EAD6,#EADFC6);border-radius:20px;padding:clamp(8px,2vw,14px) clamp(8px,2vw,14px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* cast */
        + '.nc-cast{display:flex;align-items:center;justify-content:center;gap:clamp(8px,3vw,18px);}'
        + '.nc-tess{width:clamp(42px,11vw,60px);}.nc-tess-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.nc-eyes-happy{display:none;}.nc-tess[data-pose="happy"] .nc-eyes-open{display:none;}.nc-tess[data-pose="happy"] .nc-eyes-happy{display:inline;}'
        + '.nc-witness{font-size:clamp(24px,6.4vw,34px);}'
        /* equation + balance */
        + '.nc-balance{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;}'
        + '.nc-eq{display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;gap:clamp(3px,1.2vw,7px);font-family:"Baloo 2",var(--lcs-font-display,sans-serif);}'
        + '.nc-side{display:inline-flex;align-items:center;gap:clamp(2px,1vw,5px);}'
        + '.nc-num{font-size:clamp(24px,7vw,38px);font-weight:800;color:' + C.T + ';line-height:1;min-width:.7em;text-align:center;}'
        + '.nc-op{font-size:clamp(18px,5vw,28px);font-weight:800;color:' + C.CORAL + ';}'
        + '.nc-eqsign{font-size:clamp(26px,7.4vw,40px);font-weight:800;color:' + C.BRASS + ';margin:0 clamp(2px,1vw,6px);}'
        + '.nc-num-tap{background:#FFF6E6;border:2px solid rgba(20,107,94,.3);border-radius:10px;padding:1px 8px;cursor:pointer;min-height:40px;touch-action:manipulation;}'
        + '.nc-num-tap:active{transform:translateY(1px);}.nc-num-used{background:#EAF7F0;border-color:' + C.GOOD + ';color:' + C.GOOD + ';}'
        + '.nc-slot{display:inline-flex;align-items:center;justify-content:center;min-width:clamp(34px,9vw,48px);min-height:40px;border:2px dashed ' + C.CORAL + ';border-radius:9px;color:' + C.CORAL + ';font-size:clamp(22px,6vw,32px);font-weight:800;box-shadow:0 0 0 4px rgba(242,120,75,.14);}'
        + '.nc-slot-filled{border-style:solid;border-color:' + C.GOOD + ';color:' + C.GOOD + ';}'
        /* see-saw */
        + '.nc-beam{position:relative;width:min(94%,360px);height:clamp(58px,16vw,76px);}'
        + '.nc-fulcrum{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-bottom:26px solid ' + C.BRASS + ';}'
        + '.nc-bar{position:absolute;left:6%;right:6%;top:22px;height:9px;border-radius:6px;background:' + C.BRASS + ';transform-origin:50% 50%;transition:transform .4s var(--lcs-ease,cubic-bezier(.5,1.5,.5,1));}'
        + '.nc-pan{position:absolute;top:-6px;width:clamp(60px,19vw,92px);min-height:36px;border:0;background:transparent;cursor:default;padding:0;}'
        + '.nc-pan-l{left:-34px;}.nc-pan-r{right:-34px;}'
        + '.nc-pan::before{content:"";position:absolute;left:50%;top:-8px;width:2px;height:8px;background:rgba(120,120,120,.4);transform:translateX(-50%);}'
        + '.nc-pan-dots{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-items:flex-end;width:clamp(58px,18vw,88px);min-height:30px;border-radius:6px 6px 14px 14px;background:#E2F0EC;border:2px solid ' + C.BRASS + ';padding:3px;}'
        + '.nc-pan-tap{cursor:pointer;}.nc-pan-tap .nc-pan-dots{box-shadow:0 0 0 3px rgba(242,120,75,.25);}'
        + '.nc-dot{width:clamp(7px,2vw,10px);height:clamp(7px,2vw,10px);border-radius:50%;}.nc-dot.l{background:' + C.T + ';}.nc-dot.r{background:' + C.CORAL + ';}'
        /* controls */
        + '.nc-ctrl{width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1.6vw,9px);}'
        + '.nc-sub{font:700 clamp(12px,3.2vw,15px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';opacity:.9;text-align:center;}'
        + '.nc-verdict{display:flex;gap:clamp(8px,2.6vw,16px);}'
        + '.nc-vbtn{min-height:48px;padding:0 clamp(16px,5vw,28px);border-radius:14px;border:0;font:800 clamp(15px,4vw,20px)/1 "Baloo 2",sans-serif;color:#fff;cursor:pointer;touch-action:manipulation;}'
        + '.nc-vtrue{background:' + C.GOOD + ';box-shadow:0 3px 0 #1f7a4d;}.nc-vfalse{background:' + C.CORAL + ';box-shadow:0 3px 0 ' + C.CORAL2 + ';}'
        + '.nc-vbtn:active{transform:translateY(2px);}'
        + '.nc-vbtn:focus-visible,.nc-tile:focus-visible,.nc-num-tap:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.nc-tray{display:flex;flex-wrap:wrap;gap:clamp(6px,1.8vw,11px);justify-content:center;}'
        + '.nc-tile{min-width:clamp(46px,12vw,60px);min-height:46px;border-radius:12px;border:0;background:linear-gradient(180deg,#fff,#EFE6D2);font:800 clamp(18px,5vw,24px)/1 "Baloo 2",sans-serif;color:' + C.T + ';cursor:pointer;box-shadow:0 3px 0 rgba(160,120,60,.3);touch-action:manipulation;}'
        + '.nc-tile:active{transform:translateY(2px);}.nc-tile.nc-bonk{animation:ncBonk .5s ease;}@keyframes ncBonk{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}'
        /* court-cat vessel (scroll bench) */
        + '.nc-shelf{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;}'
        + '.nc-scroll{width:clamp(11px,3vw,16px);height:7px;border-radius:3px;background:rgba(20,107,94,.16);transition:background .3s;}'
        + '.nc-scroll-on{background:' + C.BRASS + ';}'
        + '@media (max-width:360px){.nc-court{padding:6px;gap:5px;}.nc-pan-l{left:-22px;}.nc-pan-r{right:-22px;}.nc-verdict{flex-direction:column;width:100%;}.nc-vbtn{width:100%;}}'
        + '@media (prefers-reduced-motion: reduce){.nc-bar,.nc-tile{transition:none!important;animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-numbers-court', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  var WITNESSES = ['hopscotch', 'crow', 'pip', 'tilt'];
  function makeTasks(rounds) {
    return rounds.map(function (round, i) {
      if (!round.witness) round.witness = WITNESSES[i % WITNESSES.length];
      return {
        id: 'numbers-court.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) tool.readOnly = true; return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }
  function bandOrder(pool, prev, rng) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
