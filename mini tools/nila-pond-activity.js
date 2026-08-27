/* =====================================================================
   NILA'S IDEA POND — ACTIVITY  (nila-pond-activity.js)
   ---------------------------------------------------------------------
   CCSS RI.K.2 — identify the MAIN TOPIC + retell KEY DETAILS of a text
   READ ALOUD. Nila the otter listens to a little informational story;
   the child hears it (TTS, replayable, sentence-highlighted), then:
     (1) HEAR + NET + COMMIT — tap idea-fish to hear their same-grain
         phrases (audio only, NO picture, NO printed generality), net the
         GIST fish, press "That's the big idea!" (the single deliberate
         commit; reveal fires ONLY on commit → no guess-and-check). A wrong
         commit → no gold, Nila replays + REGENERATES a different paragraph
         from the same swap-group (the target MOVES → brute-force dies).
     (2) SCHOOL — the umbrella unfurls over the gold topic; bring the true
         detail-fish home into nest-slots + send the NON-BELONGER back to
         the pond (a plausible-but-absent fact). [nest-reject]
         OR pick which of 2 new fish was a key detail. [supply-detail]
     (3) DONE — Nila names the idea in a full sentence (the RI.K.2 retell).

   Correctness comes ONLY from main-idea-core.js (isTopic / belongs) — the
   skin never derives the answer from a label/phrase/picture surface, and
   the descriptor (snapshot) carries no isTopic flag; the umbrella/gold is
   applied POST-commit only. No timer/score/streak. Pure-geometry SVG (no
   image-library 404). 0 lines to any protected core + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.MainIdeaCore;
  var LANG = 'en';  // set from api.lang in init(); drives TTS + de round-bank + strings

  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOLD: '#E8A53A', GOOD: '#2FA56A', POND: '#9FD8E6' };
  var FISH_TINTS = ['#F2784B', '#5BBE9E', '#E8A53A', '#7FA8E0', '#C58BD8'];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      var _tts = (LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG);
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: _tts, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.lang = _tts; u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---- stub SVG art (CA5 hand-art replaces these later) ---- */
  function nilaSVG(mood) {
    var happy = mood === 'happy', listen = mood === 'listen', hmm = mood === 'hmm';
    var eyes = happy ? '<path d="M40 44 q5 -5 10 0 M58 44 q5 -5 10 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<circle cx="45" cy="45" r="3.2" fill="#2A2A35"/><circle cx="63" cy="45" r="3.2" fill="#2A2A35"/>';
    var mouth = happy ? '<path d="M44 56 q10 9 20 0" stroke="#2A2A35" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : hmm ? '<path d="M48 58 q6 -3 12 1" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
        : '<path d="M48 57 q6 4 12 0" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    var ear = listen ? '<path d="M30 30 q-7 -3 -4 6" stroke="#2A2A35" stroke-width="2" fill="none"/>' : '';
    return '<svg class="np-nila-svg" viewBox="0 0 108 100" role="img" aria-label="' + (LANG === 'fr' ? 'Nila la loutre' : LANG === 'de' ? 'Nila die Otterdame' : LANG === 'es' ? 'Nila la nutria' : LANG === 'pt' ? 'Nila, a lontra' : LANG === 'it' ? 'Nila la lontra' : 'Nila the otter') + '">'
      + '<ellipse cx="54" cy="58" rx="32" ry="30" fill="#B98A5E"/>'
      + '<ellipse cx="54" cy="66" rx="20" ry="18" fill="#E9D6BE"/>'
      + '<circle cx="33" cy="34" r="9" fill="#B98A5E"/><circle cx="75" cy="34" r="9" fill="#B98A5E"/>'
      + ear + eyes + mouth
      + '<ellipse cx="54" cy="52" rx="5" ry="4" fill="#7A5536"/>'
      + '</svg>';
  }
  function fishSVG(tint, state) {
    /* same body shape for every fish — NO content-distinguishing picture.
       state: '', 'net' (held), 'gold' (the revealed topic). */
    var fill = state === 'gold' ? C.GOLD : tint;
    var glow = state === 'gold' ? '<ellipse cx="34" cy="22" rx="30" ry="20" fill="#FBE6A8" opacity="0.6"/>' : '';
    return '<svg class="np-fish-svg" viewBox="0 0 68 44" aria-hidden="true">' + glow
      + '<path d="M44 22 q-12 -16 -34 0 q22 16 34 0z" fill="' + fill + '"/>'
      + '<path d="M44 22 l18 -10 l0 20z" fill="' + fill + '"/>'
      + '<circle cx="18" cy="19" r="2.6" fill="#2A2A35"/>'
      + '</svg>';
  }
  function umbrellaSVG() {
    return '<svg class="np-umb-svg" viewBox="0 0 120 70" aria-hidden="true">'
      + '<path d="M8 40 q52 -52 104 0z" fill="' + C.T + '"/>'
      + '<path d="M8 40 q14 -10 26 0 q12 -10 26 0 q14 -10 26 0 q12 -10 26 0" fill="none" stroke="#0E5247" stroke-width="2"/>'
      + '<line x1="60" y1="40" x2="60" y2="66" stroke="' + C.INK + '" stroke-width="3" stroke-linecap="round"/>'
      + '<path d="M60 66 q-7 2 -7 -4" fill="none" stroke="' + C.INK + '" stroke-width="3" stroke-linecap="round"/>'
      + '</svg>';
  }

  global.NilaPondActivity = {
    id: 'nila-pond-activity',

    strings: {
      title: { en: "Nila's Idea Pond", de: 'Nilas Ideen-Teich', fr: 'L’étang aux idées de Nila', es: 'El estanque de ideas de Nila', pt: 'O lago de ideias da Nila', it: 'Lo stagno delle idee di Nila' },
      instruction: { en: '', de: '', fr: '', es: '', pt: '', it: '' },
      prompt: { en: "What's the big idea?", de: 'Worum geht es?', fr: 'De quoi parle ce texte ?', es: '¿De qué trata?', pt: 'Qual é a ideia principal?', it: 'Di che cosa parla?' },
      readAgain: { en: '🔊 Read again', de: '🔊 Nochmal vorlesen', fr: '🔊 Écouter encore', es: '🔊 Leer otra vez', pt: '🔊 Ouvir de novo', it: '🔊 Ascolta ancora' },
      commit: { en: "That's the big idea!", de: 'Das ist die Hauptsache!', fr: 'C’est l’idée principale !', es: '¡Esa es la idea principal!', pt: 'Essa é a ideia principal!', it: 'Questa è la cosa più importante!' },
      schoolHint: { en: 'Bring the true details home. Send back the one that was NOT in the story.', de: 'Bring die echten Details nach Hause – und schick den Fisch zurück, der nicht in der Geschichte war.', fr: 'Ramène à la maison les détails vrais. Renvoie celui qui n’était PAS dans l’histoire.', es: 'Lleva a casa los detalles verdaderos. Regresa el que NO estaba en la historia.', pt: 'Leve os detalhes verdadeiros pra casa. Devolva o que NÃO estava na história.', it: 'Porta a casa i dettagli veri. Rimanda indietro quello che non era nella storia.' },
      supplyHint: { en: 'Which one was in the story?', de: 'Welcher von diesen zwei kam in der Geschichte vor?', fr: 'Lequel était dans l’histoire ?', es: '¿Cuál de estos dos estaba en la historia?', pt: 'Qual estava na história?', it: 'Quale di questi era nella storia?' },
      pondLabel: { en: 'Back to the pond', de: 'Zurück in den Teich', fr: 'Retour à l’étang', es: 'De vuelta al estanque', pt: 'Voltar ao lago', it: 'Torna allo stagno' },
      slotLabel: { en: 'Detail', de: 'Detail', fr: 'Détail', es: 'Detalle', pt: 'Detalhe', it: 'Dettaglio' },
      nilaListen: { en: 'Listen to the little story…', de: 'Hör dir die kleine Geschichte an …', fr: 'Écoute la petite histoire…', es: 'Escucha la pequeña historia…', pt: 'Escute a historinha…', it: 'Ascolta la piccola storia…' },
      nilaPickFirst: { en: 'Tap a fish, then tell me the big idea!', de: 'Tipp einen Fisch an und sag mir, worum es geht.', fr: 'Touche un poisson, puis dis-moi l’idée principale !', es: 'Toca un pez y dime de qué trata.', pt: 'Toque num peixinho e me diga a ideia!', it: 'Tocca un pesce, poi dimmi la cosa più importante!' },
      nilaWrong: { en: "Hmm — let's listen again.", de: 'Hmm – hören wir noch einmal zu.', fr: 'Hmm… on écoute encore une fois.', es: 'Mmm… escuchemos otra vez.', pt: 'Hmm — vamos ouvir de novo.', it: 'Mmm… ascoltiamo di nuovo.' },
      nilaSchool: { en: 'Now bring the true details home!', de: 'Jetzt bring die echten Details nach Hause.', fr: 'Maintenant, ramène les détails vrais à la maison !', es: '¡Ahora lleva a casa los detalles verdaderos!', pt: 'Agora leve os detalhes verdadeiros pra casa!', it: 'Ora porta a casa i dettagli veri!' },
      nilaWin: { en: 'You found the big idea!', de: 'Du hast die Hauptsache gefunden!', fr: 'Tu as trouvé l’idée principale !', es: '¡Encontraste la idea principal!', pt: 'Achou a ideia principal!', it: 'Sì! Hai trovato la cosa più importante!' },
      hintCheck: { en: 'Find the big idea first, then tap Check!', de: 'Finde zuerst die Hauptsache, dann tippe auf „Prüfen".', fr: 'Trouve d’abord l’idée principale, puis touche Vérifier !', es: 'Encuentra primero la idea principal y luego toca Comprobar.', pt: 'Ache a ideia principal e toque em Verificar!', it: 'Prima trova la cosa più importante, poi tocca Controlla!' },
      retellPrefix: { en: 'So it was all about this. ', de: 'Es ging also die ganze Zeit um das hier: ', fr: 'C’est donc ça, l’idée principale : ', es: 'Así que de eso trataba todo: ', pt: 'Então era disso que tudo falava: ', it: 'Quindi parlava soprattutto di questo: ' }
    },
    defaults: {},

    init: function (api) {
      this.api = api; LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this._rawRounds = [];
      this.round = null; this.stage = 'hear';
      this._fishOrder = null; this._held = null; this._netted = null;
      this._slots = []; this._released = null; this._supplied = null;
      this.solved = false; this.solvedCount = 0; this._readToken = 0; this._mood = 'listen';
      this.msg = null; this._regenUsed = {};
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.stage = 'hear'; this.solved = false; this.msg = null;
      this._held = null; this._netted = null; this._released = null; this._supplied = null;
      this._mood = 'listen'; this._readToken++; this._regenUsed = {};
      var slotN = (round.cog === 'nest-reject') ? Core.slotCount(round) : (round.cog === 'supply-detail' ? 1 : 0);
      this._slots = []; for (var i = 0; i < slotN; i++) this._slots.push(null);
      /* fresh per-mount fish order; kept stable across a regenerate (same board) */
      this._fishOrder = shuffle(Core.fishStage1(round).map(function (f) { return f.id; }));
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'np-root'); root.setAttribute('data-stage', this.stage); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      if (this.stage === 'done') this._renderDone(root);
      else if (this.stage === 'school') this._renderSchool(root);
      else if (this.stage === 'supply') this._renderSupply(root);
      else this._renderHear(root);
      this._renderVessel(root);
      stage.appendChild(root);
    },

    _nilaRow: function (parent, mood, line) {
      var api = this.api, row = api.el('div', 'np-nilarow');
      var n = api.el('div', 'np-nila'); n.innerHTML = nilaSVG(mood); row.appendChild(n);
      if (line) { var b = api.el('div', 'np-say'); b.textContent = line; row.appendChild(b); }
      parent.appendChild(row); return row;
    },

    _paraCard: function (parent) {
      var self = this, api = this.api;
      var card = api.el('div', 'np-para'); this._paraEl = card;
      /* the replay button FLOATS in the card's top-right (text wraps around
         it) so it costs no dedicated row — the tightest-viewport budget. */
      var replay = api.el('button', 'np-replay'); replay.type = 'button';
      replay.innerHTML = '🔊'; replay.setAttribute('aria-label', api.t('readAgain')); replay.title = api.t('readAgain');
      replay.addEventListener('click', function () { self._readStory(); });
      card.appendChild(replay);
      (this.round.paragraph || []).forEach(function (s, i) {
        var sent = api.el('span', 'np-sent'); sent.setAttribute('data-i', i); sent.textContent = s + ' ';
        card.appendChild(sent);
      });
      parent.appendChild(card);
    },
    _readStory: function () {
      var self = this, token = ++this._readToken;
      var cards = this._paraEl ? this._paraEl.querySelectorAll('.np-sent') : [];
      var lines = this.round.paragraph || [];
      function step(i) {
        if (token !== self._readToken) return;
        for (var k = 0; k < cards.length; k++) cards[k].classList.toggle('np-on', k === i);
        if (i >= lines.length) { for (var m = 0; m < cards.length; m++) cards[m].classList.remove('np-on'); return; }
        speak(lines[i]);
        setTimeout(function () { step(i + 1); }, Math.max(1300, lines[i].length * 55));
      }
      step(0);
    },

    /* ----- STAGE 1: HEAR + NET + COMMIT ----- */
    /* desktop = 2 columns (paragraph | fish) so the block is max(), not sum(),
       of the two heights — the wake-up-pip pattern that clears 1024×900. */
    _renderHear: function (root) {
      var self = this, api = this.api;
      if (this.msg) { var say = api.el('div', 'np-saytop'); say.innerHTML = '<span class="np-nilamini">' + nilaSVG(this._mood) + '</span><span>' + esc(this.msg) + '</span>'; root.appendChild(say); }
      var main = api.el('div', 'np-main');
      var left = api.el('div', 'np-left'); this._paraCard(left); main.appendChild(left);
      var right = api.el('div', 'np-right');
      var pondwrap = api.el('div', 'np-fishpond');
      this._fishOrder.forEach(function (id, idx) {
        var f = Core.fishStage1(self.round).find(function (x) { return x.id === id; });
        var tint = FISH_TINTS[idx % FISH_TINTS.length];
        var held = (self._netted === id);
        var btn = api.el('button', 'np-fish' + (held ? ' np-held' : '')); btn.type = 'button';
        btn.setAttribute('data-id', id);
        btn.innerHTML = '<span class="np-fishart">' + fishSVG(tint, held ? 'net' : '') + '</span>'
          + '<span class="np-fishphrase">' + esc(f.phrase) + '</span>';
        btn.setAttribute('aria-label', f.phrase);
        btn.addEventListener('click', function () { self._tapFish(id); });
        pondwrap.appendChild(btn);
      });
      right.appendChild(pondwrap); main.appendChild(right);
      root.appendChild(main);
      var commit = api.el('button', 'np-commit' + (this._netted ? '' : ' np-off')); commit.type = 'button';
      commit.textContent = api.t('commit'); commit.disabled = !this._netted;
      if (this._netted) commit.addEventListener('click', function () { self._commit(); });
      root.appendChild(commit);
    },
    _tapFish: function (id) {
      var f = Core.fishStage1(this.round).find(function (x) { return x.id === id; });
      this._netted = (this._netted === id) ? null : id;
      this.msg = this._netted ? this.api.t('nilaPickFirst') : null;
      this._mood = 'listen';
      this.api.sound && this.api.sound(this._netted ? 560 : 400);
      if (this._netted && f) speak(f.phrase);
      this.render();
    },
    _commit: function () {
      var self = this, api = this.api;
      if (!this._netted) return;
      if (Core.isTopic(this.round, this._netted)) {
        /* CORRECT commit → reveal the umbrella; advance to the right stage */
        this.api.sound && this.api.sound(820);
        if (this.round.cog === 'nest-reject') { this.stage = 'school'; this._mood = 'happy'; this.msg = api.t('schoolHint'); }
        else if (this.round.cog === 'supply-detail') { this.stage = 'supply'; this._mood = 'happy'; this.msg = api.t('supplyHint'); }
        else { this._finish(); return; }
        this.render();
        api.announce && api.announce(api.t('nilaSchool'));
      } else {
        /* WRONG commit → NO gold, no leak; replay + regenerate a different
           paragraph from the swap-group (the target MOVES). */
        this.api.sound && this.api.sound(330);
        this._mood = 'hmm'; this.msg = api.t('nilaWrong');
        var moved = this._regenerate();
        this._netted = null;
        this.render();
        api.announce && api.announce(api.t('nilaWrong'));
        setTimeout(function () { self._readStory(); }, 500);
      }
    },
    _regenerate: function () {
      var sibs = Core.regenGroup(this.round, this._rawRounds).filter(function (id) { return !this._regenUsed[id]; }, this);
      if (!sibs.length) { /* exhausted → reuse the group, still non-stationary enough */ this._regenUsed = {}; sibs = Core.regenGroup(this.round, this._rawRounds); }
      if (!sibs.length) return false;
      var pick = sibs[Math.floor(Math.random() * sibs.length)];
      this._regenUsed[pick] = 1;
      var next = this._rawRounds.find(function (r) { return r.id === pick; });
      if (!next) return false;
      /* keep the SAME visual fish order (same board), swap the story + topic */
      var order = this._fishOrder.slice();
      this.round = next; this.stage = 'hear';
      this._held = null; this._released = null; this._supplied = null;
      var slotN = (next.cog === 'nest-reject') ? Core.slotCount(next) : (next.cog === 'supply-detail' ? 1 : 0);
      this._slots = []; for (var i = 0; i < slotN; i++) this._slots.push(null);
      this._fishOrder = order;   /* same board */
      return true;
    },

    /* ----- STAGE 2: SCHOOL (nest true details + release the non-belonger) ----- */
    _renderSchool: function (root) {
      var self = this, api = this.api;
      var say = api.el('div', 'np-saytop'); say.innerHTML = '<span class="np-nilamini">' + nilaSVG('happy') + '</span><span>' + esc(this.msg || api.t('nilaSchool')) + '</span>'; root.appendChild(say);
      var main = api.el('div', 'np-main');
      /* LEFT: the umbrella over the gold topic + the nest slots */
      var left = api.el('div', 'np-left');
      var umb = api.el('div', 'np-umbwrap');
      umb.innerHTML = '<span class="np-umb">' + umbrellaSVG() + '</span>';
      var goldF = Core.fishStage1(this.round).find(function (x) { return x.id === self.round.topicId; });
      var gold = api.el('div', 'np-gold');
      gold.innerHTML = '<span class="np-fishart">' + fishSVG(C.GOLD, 'gold') + '</span><span class="np-goldphrase">' + esc(goldF.phrase) + '</span>';
      umb.appendChild(gold); left.appendChild(umb);
      var slots = api.el('div', 'np-slots');
      this._slots.forEach(function (fid, i) {
        var slot = api.el('button', 'np-slot' + (fid ? ' np-filled' : '')); slot.type = 'button';
        slot.setAttribute('data-slot', i);
        if (fid) {
          var ff = Core.detailsStage2(self.round).find(function (x) { return x.id === fid; });
          slot.innerHTML = '<span class="np-fishart">' + fishSVG('#5BBE9E', '') + '</span><span class="np-slotphrase">' + esc(ff ? ff.phrase : '') + '</span>';
        } else {
          slot.innerHTML = '<span class="np-slotempty">' + esc(api.t('slotLabel')) + '</span>';
          slot.addEventListener('click', function () { self._placeHeld(i); });
        }
        slots.appendChild(slot);
      });
      left.appendChild(slots); main.appendChild(left);
      /* RIGHT: the detail-fish tray (not yet placed) + the pond release */
      var right = api.el('div', 'np-right');
      var tray = api.el('div', 'np-tray');
      Core.detailsStage2(this.round).forEach(function (f, idx) {
        var placed = (self._slots.indexOf(f.id) !== -1) || (self._released === f.id);
        if (placed) return;
        var held = (self._held === f.id);
        var b = api.el('button', 'np-detail' + (held ? ' np-held' : '')); b.type = 'button';
        b.setAttribute('data-id', f.id);
        b.innerHTML = '<span class="np-fishart">' + fishSVG(FISH_TINTS[(idx + 1) % FISH_TINTS.length], held ? 'net' : '') + '</span><span class="np-fishphrase">' + esc(f.phrase) + '</span>';
        b.setAttribute('aria-label', f.phrase);
        b.addEventListener('click', function () { self._tapDetail(f.id); });
        tray.appendChild(b);
      });
      right.appendChild(tray);
      var pond = api.el('button', 'np-pond' + (this._released ? ' np-pond-used' : '')); pond.type = 'button';
      pond.innerHTML = '<span class="np-pondwave">🌊</span><span class="np-pondtxt">' + esc(api.t('pondLabel')) + '</span>';
      pond.addEventListener('click', function () { self._releaseHeld(); });
      right.appendChild(pond); main.appendChild(right);
      root.appendChild(main);
    },
    _tapDetail: function (id) {
      this._held = (this._held === id) ? null : id;
      this.api.sound && this.api.sound(this._held ? 560 : 400);
      var f = Core.detailsStage2(this.round).find(function (x) { return x.id === id; });
      if (this._held && f) speak(f.phrase);
      this.render();
    },
    _placeHeld: function (slotIdx) {
      var self = this;
      if (!this._held) return;
      var id = this._held;
      if (Core.belongs(this.round, id)) {
        this._slots[slotIdx] = id; this._held = null; this.msg = null;
        this.api.sound && this.api.sound(640);
        this._checkSchoolDone();
        this.render();
      } else {
        this._wriggle(); /* non-belonger can't nest — wriggles free, replay */
      }
    },
    _releaseHeld: function () {
      if (!this._held) return;
      var id = this._held;
      if (!Core.belongs(this.round, id)) {
        this._released = id; this._held = null; this.msg = null;
        this.api.sound && this.api.sound(700);
        this._checkSchoolDone();
        this.render();
      } else {
        this._wriggle(); /* a true detail belongs home, not the pond */
      }
    },
    _wriggle: function () {
      var self = this;
      this._held = null; this._mood = 'hmm'; this.msg = this.api.t('nilaWrong');
      this.api.sound && this.api.sound(330);
      this.render();
      this.api.announce && this.api.announce(this.api.t('nilaWrong'));
      setTimeout(function () { self._readStory(); }, 400);
    },
    _checkSchoolDone: function () {
      var allNested = this._slots.every(function (x) { return !!x; });
      var nonBel = Core.nonBelongerId(this.round);
      if (allNested && this._released === nonBel) this._finish();
    },

    /* ----- supply-detail: pick which of 2 NEW fish was in the story ----- */
    _renderSupply: function (root) {
      var self = this, api = this.api;
      var say = api.el('div', 'np-saytop'); say.innerHTML = '<span class="np-nilamini">' + nilaSVG('happy') + '</span><span>' + esc(this.msg || api.t('supplyHint')) + '</span>'; root.appendChild(say);
      var main = api.el('div', 'np-main');
      var left = api.el('div', 'np-left');
      var umb = api.el('div', 'np-umbwrap');
      umb.innerHTML = '<span class="np-umb">' + umbrellaSVG() + '</span>';
      var goldF = Core.fishStage1(this.round).find(function (x) { return x.id === self.round.topicId; });
      var gold = api.el('div', 'np-gold');
      gold.innerHTML = '<span class="np-fishart">' + fishSVG(C.GOLD, 'gold') + '</span><span class="np-goldphrase">' + esc(goldF.phrase) + '</span>';
      umb.appendChild(gold); left.appendChild(umb); main.appendChild(left);
      var right = api.el('div', 'np-right');
      var tray = api.el('div', 'np-tray np-supplytray');
      shuffle(Core.supplyOptions(this.round)).forEach(function (f, idx) {
        var b = api.el('button', 'np-detail'); b.type = 'button'; b.setAttribute('data-id', f.id);
        b.innerHTML = '<span class="np-fishart">' + fishSVG(FISH_TINTS[(idx + 1) % FISH_TINTS.length], '') + '</span><span class="np-fishphrase">' + esc(f.phrase) + '</span>';
        b.setAttribute('aria-label', f.phrase);
        b.addEventListener('click', function () { self._pickSupply(f.id); });
        tray.appendChild(b);
      });
      right.appendChild(tray); main.appendChild(right);
      root.appendChild(main);
    },
    _pickSupply: function (id) {
      if (Core.belongs(this.round, id)) { this._supplied = id; this.api.sound && this.api.sound(640); this._finish(); }
      else { this._wriggle(); }
    },

    /* ----- DONE: Nila names the idea (the RI.K.2 retell) ----- */
    _finish: function () {
      var self = this, api = this.api;
      this.stage = 'done'; this.solved = true; this._mood = 'happy';
      this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 12);
      var topicF = Core.fishStage1(this.round).find(function (x) { return x.id === self.round.topicId; });
      this.msg = api.t('nilaWin');
      this.api.sound && this.api.sound(900);
      this.render();
      var retell = api.t('retellPrefix') + (topicF ? topicF.phrase : '');
      api.announce && api.announce(api.t('nilaWin'));
      speak(retell);
    },
    _renderDone: function (root) {
      var self = this, api = this.api;
      this._nilaRow(root, 'happy', api.t('nilaWin'));
      var topicF = Core.fishStage1(this.round).find(function (x) { return x.id === self.round.topicId; });
      var umb = api.el('div', 'np-umbwrap np-umb-done');
      umb.innerHTML = '<span class="np-umb">' + umbrellaSVG() + '</span>';
      var gold = api.el('div', 'np-gold');
      gold.innerHTML = '<span class="np-fishart">' + fishSVG(C.GOLD, 'gold') + '</span><span class="np-goldphrase">' + esc(topicF ? topicF.phrase : '') + '</span>';
      umb.appendChild(gold); root.appendChild(umb);
    },

    _renderVessel: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 12;
      var v = api.el('div', 'np-vessel');
      for (var i = 0; i < total; i++) { var pad = api.el('span', 'np-pad' + (i < this.solvedCount ? ' np-pad-on' : '')); pad.textContent = i < this.solvedCount ? '🪷' : '·'; v.appendChild(pad); }
      root.appendChild(v);
    },

    isCorrect: function () { return this.stage === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); if (this.round) { var self = this; setTimeout(function () { self._readStory(); }, 350); } },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/nila-pond-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          var rds = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds || [];
          self._rawRounds = rds.map(function (r) { return JSON.parse(JSON.stringify(r)); });
          self._pool = makeTasks(self._rawRounds);
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
          setTimeout(function () { if (self.stage === 'hear') self._readStory(); }, 450);
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[nila-pond] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.np-root{position:relative;width:100%;max-width:min(96vw,680px);margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:clamp(4px,1.2vw,8px);background:linear-gradient(180deg,#FBF3E4,#EAF4F2);border-radius:18px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* compact "Nila says" strip (replaces the tall bubble row) */
        + '.np-saytop{display:flex;align-items:center;gap:8px;justify-content:center;font:700 clamp(11px,3vw,14px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.np-nilamini{width:clamp(30px,8vw,40px);flex:0 0 auto;}.np-nilamini .np-nila-svg{width:100%;height:auto;display:block;}'
        + '.np-nilarow{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.np-nila{width:clamp(46px,11vw,58px);flex:0 0 auto;}.np-nila-svg{width:100%;height:auto;display:block;}'
        + '.np-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.2vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:80%;}'
        /* main = 2 columns on desktop (paragraph | fish), 1 on phone */
        + '.np-main{display:flex;flex-direction:column;gap:clamp(5px,1.4vw,9px);}'
        + '.np-left,.np-right{display:flex;flex-direction:column;gap:clamp(5px,1.2vw,8px);min-width:0;}'
        + '@media (min-width:720px){.np-main{flex-direction:row;align-items:flex-start;}.np-left{flex:1 1 52%;}.np-right{flex:1 1 48%;}}'
        /* paragraph card — scrolls INSIDE the card, never the page */
        + '.np-para{position:relative;background:#fff;border:2px solid rgba(20,107,94,.16);border-radius:14px;padding:clamp(8px,1.8vw,12px);font:600 clamp(13.5px,3.3vw,16px)/1.4 "Nunito",sans-serif;color:' + C.INK + ';max-height:30vh;overflow-y:auto;}'
        + '.np-sent{border-radius:5px;transition:background .2s;}'
        + '.np-sent.np-on{background:#FCE5B8;box-shadow:0 0 0 2px #FCE5B8;}'
        + '.np-replay{float:right;width:44px;height:44px;min-height:44px;padding:0;margin:0 0 4px 8px;border-radius:50%;border:0;background:#EAF2EE;color:' + C.T + ';font-size:18px;line-height:44px;text-align:center;cursor:pointer;touch-action:manipulation;}'
        /* stage 1 fish pond — 2x2 grid */
        + '.np-fishpond{display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,1.5vw,9px);}'
        + '.np-fish,.np-detail,.np-slot{display:flex;align-items:center;gap:8px;text-align:left;padding:7px 9px;border-radius:14px;border:2px solid rgba(20,107,94,.18);background:#fff;cursor:pointer;min-height:52px;box-shadow:0 2px 0 rgba(160,120,60,.14);touch-action:manipulation;}'
        + '.np-fish.np-held,.np-detail.np-held{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.35);transform:translateY(-2px);background:#FFF6F1;}'
        + '.np-fishart{flex:0 0 auto;width:clamp(34px,9vw,44px);}.np-fish-svg{width:100%;height:auto;display:block;}'
        + '.np-fishphrase{font:700 clamp(12px,3vw,14.5px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';}'
        + '.np-fish:active,.np-detail:active,.np-slot:active{transform:translateY(1px);}'
        /* commit */
        + '.np-commit{align-self:center;min-height:48px;padding:0 clamp(18px,5vw,30px);border-radius:15px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.np-commit:active{transform:translateY(2px);}'
        + '.np-commit.np-off{opacity:.45;box-shadow:0 3px 0 rgba(20,107,94,.25);cursor:default;}'
        /* umbrella + gold topic */
        + '.np-umbwrap{display:flex;flex-direction:column;align-items:center;gap:2px;}'
        + '.np-umb{width:clamp(96px,26vw,136px);}.np-umb-svg{width:100%;height:auto;display:block;}'
        + '.np-gold{display:flex;align-items:center;gap:8px;background:#FFF8E6;border:2px solid ' + C.GOLD + ';border-radius:14px;padding:6px 12px;margin-top:-6px;}'
        + '.np-gold .np-fishart{width:clamp(34px,9vw,44px);}'
        + '.np-goldphrase{font:800 clamp(12px,3.1vw,15px)/1.2 "Baloo 2",sans-serif;color:#9A6B12;}'
        + '.np-umb-done{transform:scale(1.04);}'
        /* slots */
        + '.np-slots{display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,1.6vw,10px);}'
        + '.np-slot{min-width:0;border-style:dashed;border-color:rgba(20,107,94,.3);min-height:54px;justify-content:center;}'
        + '.np-slot.np-filled{border-style:solid;background:#EFF7F3;}'
        + '.np-slotempty{font:800 clamp(12px,3vw,14px)/1 "Baloo 2",sans-serif;color:rgba(20,107,94,.5);}'
        + '.np-slotphrase{font:700 clamp(11px,2.9vw,13.5px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';}'
        /* tray */
        + '.np-tray{display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,1.6vw,10px);}'
        + '.np-detail{min-width:0;}'
        /* pond release */
        + '.np-pond{align-self:center;display:flex;align-items:center;gap:8px;min-height:46px;padding:0 clamp(14px,4vw,22px);border-radius:30px;border:2px dashed ' + C.T + ';background:#E6F5F8;color:' + C.T + ';font:800 clamp(12px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.np-pondwave{font-size:18px;}.np-pond-used{opacity:.5;}'
        + '.np-pond:active{transform:translateY(1px);}'
        + '.np-hint{text-align:center;font:700 clamp(11px,2.9vw,13px)/1.3 "Nunito",sans-serif;color:' + C.T + ';opacity:.85;}'
        /* vessel */
        + '.np-vessel{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-items:center;min-height:16px;margin-top:1px;}'
        + '.np-pad{font-size:clamp(11px,3vw,15px);line-height:1;color:rgba(20,107,94,.3);}.np-pad-on{color:inherit;}'
        + '.np-fish:focus-visible,.np-detail:focus-visible,.np-slot:focus-visible,.np-pond:focus-visible,.np-commit:focus-visible,.np-replay:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* desktop: fish phrases roomy, two columns hold */
        + '@media (min-width:760px){.np-fishphrase{font-size:14.5px;}.np-para{font-size:15.5px;}.np-root{gap:6px;}}'
        /* phones: keep the whole stack + the shell Check above the fold.
           fish stay 2x2 but compact — min-height governs so a 2-line phrase
           does NOT grow the row. */
        + '@media (max-width:480px){'
        +   '.np-root{gap:5px;padding:8px;}.np-nila{width:clamp(40px,10vw,48px);}.np-say{font-size:12px;padding:4px 8px;}'
        +   '.np-para{max-height:26vh;font-size:13.5px;line-height:1.36;padding:8px;}'
        +   '.np-fish,.np-detail{min-height:46px;padding:5px 7px;gap:6px;}.np-slot{min-height:46px;}.np-fishart{width:30px;}'
        +   '.np-fishphrase{font-size:11.5px;line-height:1.18;}.np-fishpond{gap:6px;}.np-commit{min-height:44px;}'
        +   '.np-slot,.np-detail{min-width:126px;}.np-umb{width:clamp(86px,28vw,112px);}.np-pond{min-height:44px;}'
        + '}'
        /* small phones + short viewports (incl. the 320×640 sub-floor + the
           740-tall phones): trim the paragraph window, tighten the fish so a
           2-line phrase does not grow the row, and lay the school umbrella +
           gold topic in ONE horizontal row so the school stack clears the fold. */
        + '@media (max-height:760px), (max-width:380px){'
        +   '.np-root{gap:3px;padding:6px;}.np-para{max-height:18vh;font-size:12.5px;line-height:1.3;padding:7px;}'
        +   '.np-saytop{font-size:11px;}.np-nilamini{width:26px;}.np-hint{display:none;}.np-vessel{display:none;}'
        +   '.np-fish,.np-detail,.np-slot{min-height:44px;padding:4px 6px;gap:5px;min-width:120px;}.np-fishart{width:24px;}'
        +   '.np-fishphrase{font-size:11px;line-height:1.15;}.np-fishpond{gap:5px;}.np-commit{min-height:44px;}'
        +   '.np-main{gap:5px;}.np-left,.np-right{gap:5px;}.np-slots,.np-tray{gap:5px;}'
        +   '.np-umbwrap{flex-direction:row;align-items:center;justify-content:center;gap:7px;}'
        +   '.np-umb{width:54px;}.np-gold{margin-top:0;padding:4px 9px;}.np-goldphrase{font-size:12px;}'
        +   '.np-pond{min-height:44px;padding:0 14px;}.np-slotphrase{font-size:11px;}'
        + '}'
        /* the 320×640 sub-floor ONLY (narrow AND short): the probe waives the
           44px tap minimum here, so drop controls to 42px + trim harder. */
        + '@media (max-width:340px) and (max-height:660px){'
        +   '.np-root{gap:2px;padding:5px;}.np-para{max-height:14vh;font-size:12px;padding:6px;}'
        +   '.np-fish,.np-detail,.np-slot,.np-commit,.np-pond{min-height:42px;}.np-fishart{width:22px;}'
        +   '.np-replay{width:42px;height:42px;min-height:42px;line-height:42px;font-size:15px;}'
        +   '.np-saytop{font-size:10.5px;}.np-nilamini{width:22px;}.np-umb{width:46px;}.np-gold{padding:3px 8px;}'
        + '}'
        + '@media (prefers-reduced-motion: reduce){.np-sent{transition:none!important;}.np-fish.np-held,.np-detail.np-held{transform:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-nila-pond', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'nila-pond.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
