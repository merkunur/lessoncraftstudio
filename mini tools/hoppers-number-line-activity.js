/* =====================================================================
   HOPPER'S NUMBER LINE — ACTIVITY  (hoppers-number-line-activity.js)
   ---------------------------------------------------------------------
   CCSS 2.MD.B.6 — represent a SUM or DIFFERENCE within 100 on a number line.
   Hopper the frog hops along a lily-pad number line. The story gives a start
   + a hop; the child MODELS it: tap the START tick, point the hop FORWARD
   (add) or BACK (take away), pick the right HOP SIZE (chips incl. a decoy) —
   the hop span draws on the line — then DIAL the landing (compute start ±
   size; the landing shows "?" until dialed) and "Hop!". Correct → Hopper
   lands on the lily. Wrong → gentle, the size chips reshuffle, retry.

   Validity DERIVED by numberline-jump-core.js (landing = start ± size; no
   stored answer). answerType:'state' + in-stage controls + the activity's own
   "Hop!" commit; the shell Check returns isCorrect(). 0 lines to any
   protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.NumberlineJumpCore;
  var LANG = 'en';
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A', POND: '#2E8C7E' };
  var PAD = 7;   /* % padding at each end of the line */

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : 'en-US'; u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  global.HoppersNumberLineActivity = {
    id: 'hoppers-number-line-activity',

    strings: {
      title: { en: "Hopper's Number Line", de: 'Hopper am Zahlenstrahl', fr: 'Hopper sur la droite graduée', es: 'La recta numérica de Hopper', pt: 'A Reta Numérica do Saltão' },
      prompt: { en: 'Hop to the answer.', de: 'Hüpf zur Lösung.', fr: 'Saute jusqu’à la réponse.', es: 'Brinca hasta la respuesta.', pt: 'Pule até a resposta.' },
      hop: { en: 'Hop! 🐸', de: 'Hüpf! 🐸', fr: 'Saute ! 🐸', es: '¡Brinca! 🐸', pt: 'Pula! 🐸' },
      replay: { en: '🔊 Read again', de: '🔊 Nochmal vorlesen', fr: '🔊 Réécouter', es: '🔊 Escuchar otra vez', pt: '🔊 Ouvir de novo' },
      fwd: { en: '▶ Forward', de: '▶ Nach vorne', fr: '▶ En avant', es: '▶ Hacia adelante', pt: '▶ Para frente' },
      back: { en: '◀ Back', de: '◀ Zurück', fr: '◀ En arrière', es: '◀ Hacia atrás', pt: '◀ Para trás' },
      sizeHint: { en: 'How big is the hop?', de: 'Wie weit geht der Sprung?', fr: 'De combien est le saut ?', es: '¿De qué tamaño es el brinco?', pt: 'De quanto é o pulo?' },
      sayWelcome: { en: 'Read the hop, then show me on the line!', de: 'Lies den Sprung und zeig ihn mir am Zahlenstrahl!', fr: 'Lis le saut et montre-le-moi sur la droite graduée !', es: 'Lee el brinco y muéstramelo en la recta.', pt: 'Ouça o pulo e mostre na reta!' },
      sayDial: { en: 'Where does Hopper land? Dial it!', de: 'Wo landet Hopper? Tipp die Zahl ein!', fr: 'Où arrive Hopper ? Tape le nombre !', es: '¿Dónde cae Hopper? ¡Márcalo!', pt: 'Onde o Saltão vai cair? Digite o número!' },
      sayWin: { en: 'Splash! Right on the lily. 🪷', de: 'Platsch! Genau auf der Seerose. 🪷', fr: 'Plouf ! Pile sur le nénuphar. 🪷', es: '¡Plaf! Justo en la flor de loto. 🪷', pt: 'Tchibum! Bem na vitória-régia. 🪷' },
      sayWait: { en: "Hmm, let's hop again.", de: 'Hmm, lass uns nochmal hüpfen.', fr: 'Hmm, on refait un saut.', es: 'Mmm, vamos a brincar otra vez.', pt: 'Hmm, vamos pular de novo.' },
      hintCheck: { en: 'Set the start, the way, and the hop size — then dial the landing.', de: 'Stell den Start, die Richtung und die Sprungweite ein – dann tipp die Landung ein.', fr: 'Choisis le départ, la direction et la longueur du saut, puis tape le nombre d’arrivée.', es: 'Elige el inicio, la dirección y el tamaño del brinco; luego marca dónde cae.', pt: 'Escolha o início, a direção e o tamanho do pulo — depois digite onde ele cai.' },
      ariaStart: { en: 'start at {v}', de: 'Start bei {v}', fr: 'départ sur {v}', es: 'empieza en {v}', pt: 'começar em {v}' },
      ariaHop: { en: 'hop {sz}', de: 'Sprung {sz}', fr: 'saut de {sz}', es: 'brinca {sz}', pt: 'pular {sz}' },
      ariaEdit: { en: 'change the hop', de: 'Sprung ändern', fr: 'changer le saut', es: 'cambiar el brinco', pt: 'mudar o pulo' },
      ariaClear: { en: 'clear', de: 'löschen', fr: 'effacer', es: 'borrar', pt: 'limpar' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.startV = null; this.dir = null; this.sizeV = null; this.dialed = null; this.msg = null; this._chips = null; this.landedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.startV = null; this.dir = null; this.sizeV = null; this.dialed = null; this.msg = null; this._spoke = false;
      this._chips = shuffle(this.snap.sizeChips.slice());
    },

    _landing: function () {
      if (this.startV == null || this.sizeV == null || this.dir == null) return null;
      return this.startV + (this.dir === 'back' ? -1 : 1) * this.sizeV;
    },
    _pct: function (v) { return PAD + (v / this.snap.max) * (100 - 2 * PAD); },
    _modelReady: function () { return this.startV != null && this.dir != null && this.sizeV != null; },
    _story: function () { return (this.round.storyL10n && this.round.storyL10n[LANG]) || this.round.story; },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'hnl-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this;

      var say = api.el('div', 'hnl-saytop');
      say.innerHTML = '<span class="hnl-frog' + (this.solved ? ' hnl-bounce' : '') + '">🐸</span><span class="hnl-saytext">' + esc(this.msg || api.t(this.solved ? 'sayWin' : this._modelReady() ? 'sayDial' : 'sayWelcome')) + '</span>';
      root.appendChild(say);

      var ready = !this.solved && this._modelReady();

      // story shows only while MODELLING (in the dial phase the hop is on the line)
      if (!this.solved && !ready) {
        var story = api.el('div', 'hnl-story');
        var stext = api.el('p', 'hnl-storytext'); stext.textContent = this._story(); story.appendChild(stext);
        var rep = api.el('button', 'hnl-replay'); rep.type = 'button'; rep.textContent = api.t('replay');
        rep.addEventListener('click', function () { speak(self._story()); }); story.appendChild(rep);
        root.appendChild(story);
      }

      this._renderLine(root);

      if (this.solved) {
        var done = api.el('div', 'hnl-done'); done.innerHTML = '<span class="hnl-sticker">🪷</span><span class="hnl-donetext">' + esc(api.t('sayWin')) + '</span>'; root.appendChild(done);
      } else if (!ready) {
        // MODEL phase: direction + size controls
        var ctrls = api.el('div', 'hnl-ctrls');
        var dirs = api.el('div', 'hnl-dirs');
        [['fwd', 'fwd'], ['back', 'back']].forEach(function (d) {
          var b = api.el('button', 'hnl-dir' + (self.dir === d[0] ? ' hnl-on' : '')); b.type = 'button'; b.textContent = api.t(d[1]);
          b.addEventListener('click', function () { self._setDir(d[0]); }); dirs.appendChild(b);
        });
        ctrls.appendChild(dirs);
        var sizes = api.el('div', 'hnl-sizes');
        this._chips.forEach(function (sz) {
          var b = api.el('button', 'hnl-size' + (self.sizeV === sz ? ' hnl-on' : '')); b.type = 'button'; b.textContent = sz;
          b.setAttribute('aria-label', api.t('ariaHop').replace('{sz}', sz)); b.addEventListener('click', function () { self._setSize(sz); }); sizes.appendChild(b);
        });
        ctrls.appendChild(sizes);
        root.appendChild(ctrls);
        var hint = api.el('div', 'hnl-hint'); hint.textContent = api.t('sizeHint'); root.appendChild(hint);
      } else {
        // DIAL phase: a compact recap of the hop + the dial (story + controls collapsed → clears the fold)
        var recap = api.el('div', 'hnl-recap');
        recap.textContent = this.startV + ' ' + (this.dir === 'back' ? '−' : '+') + ' ' + this.sizeV + ' = ?';
        var edit = api.el('button', 'hnl-edit'); edit.type = 'button'; edit.textContent = '↺'; edit.setAttribute('aria-label', api.t('ariaEdit'));
        edit.addEventListener('click', function () { self.sizeV = null; self.dialed = null; self.render(); });   /* back to model phase to re-pick */
        recap.appendChild(edit);
        root.appendChild(recap);
        var disprow = api.el('div', 'hnl-disprow');
        var disp = api.el('div', 'hnl-disp'); disp.textContent = this.dialed == null ? '?' : this.dialed; disprow.appendChild(disp);
        root.appendChild(disprow);
        var pad = api.el('div', 'hnl-keypad');
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(function (n) { var k = api.el('button', 'hnl-key'); k.type = 'button'; k.textContent = n; k.setAttribute('aria-label', String(n)); k.addEventListener('click', function () { self._pushDigit(n); }); pad.appendChild(k); });
        var clr = api.el('button', 'hnl-key hnl-keyclear'); clr.type = 'button'; clr.textContent = '⌫'; clr.setAttribute('aria-label', api.t('ariaClear')); clr.addEventListener('click', function () { self._clearDial(); }); pad.appendChild(clr);
        root.appendChild(pad);
        var hop = api.el('button', 'hnl-hop'); hop.type = 'button'; hop.textContent = api.t('hop'); hop.disabled = (this.dialed == null);
        hop.addEventListener('click', function () { self._commit(); }); root.appendChild(hop);
      }

      stage.appendChild(root);
      if (!this._spoke && !this.solved) { this._spoke = true; setTimeout(function () { speak(self._story()); }, 260); }
    },

    _renderLine: function (parent) {
      var api = this.api, self = this, max = this.snap.max;
      var wrap = api.el('div', 'hnl-line');
      // the axis + ticks
      var axis = api.el('div', 'hnl-axis'); axis.setAttribute('aria-hidden', 'true'); wrap.appendChild(axis);
      this.snap.ticks.forEach(function (v) {
        var x = self._pct(v);
        var tk = api.el('span', 'hnl-tick'); tk.style.left = x + '%'; wrap.appendChild(tk);
        var lab = api.el('span', 'hnl-ticklab'); lab.style.left = x + '%'; lab.textContent = v; wrap.appendChild(lab);
        if (!self.solved) { var hit = api.el('button', 'hnl-tickhit'); hit.type = 'button'; hit.style.left = x + '%'; hit.setAttribute('aria-label', api.t('ariaStart').replace('{v}', v)); hit.addEventListener('click', function () { self._setStart(v); }); wrap.appendChild(hit); }
      });
      // the hop span (start → landing) once the model is set
      var land = this._landing();
      if (this.startV != null && this.sizeV != null && this.dir != null && land != null && land >= 0 && land <= max) {
        var a = Math.min(this.startV, land), b = Math.max(this.startV, land);
        var span = api.el('div', 'hnl-span'); span.style.left = self._pct(a) + '%'; span.style.width = (self._pct(b) - self._pct(a)) + '%';
        var arrow = api.el('span', 'hnl-arrow'); arrow.textContent = this.dir === 'back' ? '◀' : '▶'; span.appendChild(arrow);
        wrap.appendChild(span);
        // landing lily with ?/value
        var lily = api.el('div', 'hnl-lily'); lily.style.left = self._pct(land) + '%';
        lily.innerHTML = '<span class="hnl-lilypad">🪷</span><span class="hnl-landlab">' + (this.solved ? land : '?') + '</span>';
        wrap.appendChild(lily);
      }
      // Hopper at the start
      if (this.startV != null) {
        var frog = api.el('div', 'hnl-frogmark'); frog.style.left = self._pct(this.startV) + '%'; frog.textContent = '🐸';
        wrap.appendChild(frog);
      }
      parent.appendChild(wrap);
    },

    /* ---------- interaction ---------- */
    _setStart: function (v) { this.startV = (this.startV === v) ? null : v; this.dialed = null; this.api.sound && this.api.sound(560); this.msg = null; this.render(); },
    _setDir: function (d) { this.dir = (this.dir === d) ? null : d; this.dialed = null; this.api.sound && this.api.sound(520); this.msg = null; this.render(); },
    _setSize: function (s) { this.sizeV = (this.sizeV === s) ? null : s; this.dialed = null; this.api.sound && this.api.sound(600); this.msg = null; this.render(); },
    _pushDigit: function (d) { var next = (this.dialed == null) ? d : (this.dialed * 10 + d); if (next > 100) next = d; this.dialed = next; this.api.sound && this.api.sound(600); this.render(); },
    _clearDial: function () { this.dialed = null; this.api.sound && this.api.sound(400); this.render(); },
    _dial: function (n) { this.dialed = (n == null) ? null : Math.max(0, Math.min(100, n)); this.render(); },   /* test seam */

    _commit: function () {
      var api = this.api;
      if (this.dialed == null) return;
      if (Core.gradeAttempt(this.round, { start: this.startV, dir: this.dir, size: this.sizeV }, this.dialed)) { this._correct(); return; }
      this.msg = api.t('sayWait');
      this.sizeV = null; this.dialed = null; this._chips = shuffle(this.snap.sizeChips.slice());
      api.sound && api.sound(360); this.render(); api.announce && api.announce(api.t('sayWait'));
    },
    _correct: function () {
      var api = this.api; this.solved = true; this.landedCount = Math.min(this.landedCount + 1, (this._pool && this._pool.length) || 9);
      this.msg = api.t('sayWin'); api.sound && api.sound(880); this.render(); api.announce && api.announce(api.t('sayWin'));
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
      fetch('/mini-tools/hoppers-number-line-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[hoppers-number-line] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.hnl-root{position:relative;width:100%;max-width:min(96vw,620px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(5px,1.2vw,9px);background:linear-gradient(180deg,#FBF3E4,#E7F2EC);border-radius:16px;padding:clamp(7px,1.6vw,12px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.hnl-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.hnl-saytext{min-width:0;overflow-wrap:break-word;}.hnl-frog{font-size:clamp(19px,4.6vw,26px);flex:0 0 auto;}.hnl-bounce{animation:hnlBounce .5s ease;}'
        + '@keyframes hnlBounce{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        + '.hnl-story{background:#fff;border-radius:11px;padding:clamp(5px,1.4vw,8px) clamp(7px,1.8vw,10px);box-shadow:inset 0 0 0 2px rgba(20,107,94,.1);display:flex;align-items:flex-start;gap:6px;}'
        + '.hnl-storytext{margin:0;font:600 clamp(11.5px,2.9vw,14px)/1.28 "Nunito",sans-serif;color:' + C.INK + ';flex:1 1 auto;min-width:0;overflow-wrap:break-word;}'
        + '.hnl-replay{border:0;background:rgba(20,107,94,.1);color:' + C.T + ';border-radius:12px;padding:4px 8px;min-height:34px;font:700 clamp(10px,2.4vw,12px)/1 "Baloo 2",sans-serif;cursor:pointer;flex:0 0 auto;white-space:nowrap;}.hnl-replay:active{transform:translateY(1px);}'
        /* the number line */
        + '.hnl-line{position:relative;height:clamp(64px,15vw,82px);margin:1px 0 0;}'
        + '.hnl-axis{position:absolute;left:' + PAD + '%;right:' + PAD + '%;top:54%;height:4px;border-radius:2px;background:' + C.POND + ';}'
        + '.hnl-tick{position:absolute;top:54%;width:2px;height:11px;background:rgba(20,107,94,.6);transform:translate(-50%,-3px);}'
        + '.hnl-ticklab{position:absolute;top:calc(54% + 12px);transform:translateX(-50%);font:700 clamp(9px,2.3vw,11px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.hnl-tickhit{position:absolute;top:54%;width:clamp(26px,7vw,34px);height:34px;transform:translate(-50%,-17px);background:transparent;border:0;border-radius:8px;cursor:pointer;touch-action:manipulation;padding:0;}'
        + '.hnl-tickhit:active{background:rgba(242,120,75,.12);}'
        + '.hnl-span{position:absolute;top:calc(54% - 9px);height:11px;background:rgba(242,120,75,.4);border:2px solid ' + C.CORAL + ';border-radius:7px;display:flex;align-items:center;justify-content:center;pointer-events:none;}'
        + '.hnl-arrow{font-size:11px;color:' + C.CORAL2 + ';line-height:1;}'
        + '.hnl-frogmark{position:absolute;top:calc(54% - 34px);transform:translateX(-50%);font-size:clamp(20px,5vw,26px);pointer-events:none;}'
        + '.hnl-lily{position:absolute;top:calc(54% - 30px);transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;pointer-events:none;}'
        + '.hnl-lilypad{font-size:clamp(17px,4.4vw,22px);line-height:1;}.hnl-landlab{font:800 clamp(11px,2.8vw,13px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#fff;border-radius:6px;padding:1px 4px;box-shadow:0 1px 0 rgba(0,0,0,.1);}'
        /* controls */
        + '.hnl-ctrls{display:flex;flex-wrap:wrap;gap:clamp(5px,1.4vw,9px);justify-content:center;align-items:center;}'
        + '.hnl-dirs{display:flex;gap:5px;}'
        + '.hnl-dir{min-height:42px;padding:0 clamp(9px,2.6vw,14px);border-radius:11px;border:2px solid rgba(20,107,94,.3);background:#fff;color:' + C.T + ';font:800 clamp(12px,3vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.hnl-dir.hnl-on{border-color:' + C.T + ';background:#DCEFE8;box-shadow:0 0 0 2px rgba(20,107,94,.25);}'
        + '.hnl-sizes{display:flex;gap:clamp(5px,1.5vw,8px);}'
        + '.hnl-size{min-width:46px;height:46px;border-radius:12px;border:2px solid rgba(242,120,75,.5);background:#fff;color:' + C.CORAL2 + ';font:800 clamp(16px,4.2vw,20px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.hnl-size.hnl-on{border-color:' + C.CORAL + ';background:#FFF1EA;box-shadow:0 0 0 3px rgba(242,120,75,.32);transform:translateY(-2px);}.hnl-size:active{transform:translateY(1px);}'
        + '.hnl-hint{text-align:center;font:700 clamp(11px,2.8vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.hnl-recap{display:flex;align-items:center;justify-content:center;gap:8px;font:800 clamp(18px,4.8vw,24px)/1 "Baloo 2",sans-serif;color:' + C.T + ';background:rgba(20,107,94,.07);border-radius:11px;padding:clamp(4px,1.2vw,7px);}'
        + '.hnl-edit{flex:0 0 auto;width:32px;height:32px;border-radius:8px;border:0;background:#fff;box-shadow:0 1px 0 rgba(0,0,0,.12);font-size:15px;cursor:pointer;color:' + C.T + ';touch-action:manipulation;}.hnl-edit:active{transform:translateY(1px);}'
        /* dial */
        + '.hnl-disprow{display:flex;align-items:center;justify-content:center;}'
        + '.hnl-disp{min-width:60px;height:clamp(30px,6.5vw,36px);padding:0 16px;border-radius:11px;background:#fff;box-shadow:inset 0 0 0 2px ' + C.T + ';display:inline-flex;align-items:center;justify-content:center;font:800 clamp(16px,4.2vw,21px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.hnl-keypad{display:grid;grid-template-columns:repeat(6,clamp(40px,8vw,46px));gap:clamp(3px,1vw,5px);justify-content:center;}'
        + '.hnl-key{width:100%;aspect-ratio:1;border-radius:9px;border:0;background:#fff;box-shadow:0 2px 0 rgba(20,107,94,.16);cursor:pointer;font:800 clamp(13px,3.4vw,17px)/1 "Baloo 2",sans-serif;color:' + C.T + ';touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;}.hnl-key:active{transform:translateY(1px);}'
        + '.hnl-hop{align-self:center;min-height:46px;padding:0 clamp(18px,5vw,28px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.hnl-hop:disabled{opacity:.45;cursor:default;box-shadow:none;}.hnl-hop:active:not(:disabled){transform:translateY(2px);}'
        + '.hnl-dir:focus-visible,.hnl-size:focus-visible,.hnl-key:focus-visible,.hnl-hop:focus-visible,.hnl-tickhit:focus-visible,.hnl-replay:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.hnl-done{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px;}.hnl-sticker{font-size:clamp(32px,8vw,48px);animation:hnlBounce .6s ease;}.hnl-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '@media (min-width:760px){.hnl-root{padding:14px 16px;}}'
        + '@media (max-height:680px){.hnl-root{gap:3px;}.hnl-frog{font-size:20px;}.hnl-story{padding:4px 8px;}.hnl-storytext{font-size:11.5px;line-height:1.16;}.hnl-line{height:66px;}.hnl-dir{min-height:40px;}.hnl-size{min-width:44px;height:44px;}.hnl-hop{min-height:44px;}}'
        + '@media (max-height:640px){.hnl-root{gap:2px;padding:5px;}.hnl-saytop{font-size:10.5px;}.hnl-frog{font-size:18px;}.hnl-story{padding:3px 7px;}.hnl-storytext{font-size:11px;line-height:1.1;}.hnl-line{height:52px;}.hnl-frogmark{font-size:17px;}.hnl-size{min-width:44px;height:44px;}.hnl-keypad{gap:3px;}.hnl-recap{font-size:17px;padding:3px;}.hnl-disp{height:28px;}.hnl-hop{min-height:44px;}}'
        + '@media (max-width:380px){.hnl-root{gap:3px;padding:6px;}.hnl-storytext{font-size:11px;}.hnl-ticklab{font-size:8.5px;}.hnl-size{min-width:44px;height:44px;}}'
        + '@media (prefers-reduced-motion: reduce){.hnl-bounce,.hnl-sticker{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-hoppers-number-line', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'hoppers-number-line.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { return tool.isCorrect(); },
        hintKey: function () { return 'hintCheck'; }
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
