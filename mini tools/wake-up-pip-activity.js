/* =====================================================================
   WAKE UP, PIP! — ACTIVITY  (wake-up-pip-activity.js)
   ---------------------------------------------------------------------
   CCSS RL.K.2 — retell a familiar story INCLUDING KEY DETAILS, told to a
   friend (SL.K.4). The child is the EYEWITNESS: Pip the sleepy friend naps
   through every story, then wakes desperate to know what happened. (0) WATCH
   the story play (narrated panels); (1) the film is GONE — REBUILD it on a
   ladder in causal order with the key details, then "Tell it!". Pip reacts
   to the WHOLE retell — delight, or a DIFFUSE causal symptom (the KIND of
   break, never the slot) that the child must locate by re-reading.

   Validity DERIVED by mini tools/retell-story-core.js (the requires-DAG +
   key map; the 3-symbol breakKind). The skin consumes ONLY childView /
   watchFilm — never the order/key. answerType:'state'. Two STAGES via
   internal state (watch→retell→done); the watch panels are GONE at retell
   (the no-copy invariant). Characters + panels = SVG/emoji PLACEHOLDERS for
   later CA5 art. No timer/score/streak. 0 lines to the protected cores +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.RetellStoryCore;
  var LANG = 'en';   // content locale; set in init from api.lang (de fan-out §A.13.54)

  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  // panel emoji = STUB art (CA5 hand-illustrated dioramas replace these later)
  var EMOJI = {
    'sun-1': '😴', 'sun-2': '🌅', 'sun-3': '☀️', 'sun-4': '🌼',
    'kite-1': '🪁', 'kite-2': '🌳', 'kite-3': '🍃', 'kite-4': '🙌',
    'crow-1': '🐦', 'crow-2': '🪨', 'crow-3': '💧', 'crow-4': '😌',
    'puppy-1': '🐶', 'puppy-2': '🛁', 'puppy-3': '🫧', 'puppy-4': '✨', 'puppy-tw': '🎵', 'puppy-fw': '❄️', 'puppy-fwo': '🦊',
    'mitten-1': '🧤', 'mitten-2': '👣', 'mitten-3': '🔴', 'mitten-4': '🙂', 'mitten-tw': '⛄', 'mitten-fw': '🌇', 'mitten-fwo': '🦌',
    'cake-1': '🎂', 'cake-2': '🥣', 'cake-3': '🔥', 'cake-4': '😍', 'cake-tw': '🐱', 'cake-fw': '⛵', 'cake-fwo': '🤖',
    'seed-1': '🌱', 'seed-2': '💦', 'seed-3': '🌿', 'seed-4': '🌸',
    'paint-1': '🎨', 'paint-2': '🧽', 'paint-3': '🌈', 'paint-4': '😊', 'paint-fw1': '🚂', 'paint-fw2': '🌧️'
  };
  var TINTS = ['#FDEEDD', '#E9F3EF', '#EEF0FB', '#FBF0F4', '#F0F5E8'];
  function tintFor(panel) { var h = 0; for (var i = 0; i < panel.length; i++) h = (h * 31 + panel.charCodeAt(i)) >>> 0; return TINTS[h % TINTS.length]; }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text) {
    try { if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'pt' ? 'pt-BR' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .95; u.lang = (LANG === 'fr' ? 'fr-FR' : LANG === 'de' ? 'de-DE' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'nl' ? 'nl-NL' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); } } catch (e) {}
  }

  function pipSVG(mood) {
    var asleep = mood === 'asleep', happy = mood === 'happy' || mood === 'delighted', hmm = mood === 'hmm';
    var eyes = asleep ? '<path d="M38 46 q5 4 10 0 M52 46 q5 4 10 0" stroke="#2A2A35" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : happy ? '<path d="M37 45 q5 -5 10 0 M53 45 q5 -5 10 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
        : '<circle cx="42" cy="46" r="3.3" fill="#2A2A35"/><circle cx="58" cy="46" r="3.3" fill="#2A2A35"/>';
    var mouth = happy ? '<path d="M40 58 q10 11 20 0" stroke="#2A2A35" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : hmm ? '<path d="M43 60 q7 -3 14 1" stroke="#2A2A35" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
        : '<path d="M44 59 q6 4 12 0" stroke="#2A2A35" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    var z = asleep ? '<text x="74" y="30" font-family="Baloo 2,sans-serif" font-size="15" fill="#9AA6B2">z</text><text x="83" y="22" font-family="Baloo 2,sans-serif" font-size="11" fill="#B7C0CA">z</text>' : '';
    return '<svg class="rt-pip-svg" viewBox="0 0 100 100" role="img" aria-label="Pip"><ellipse cx="50" cy="54" rx="30" ry="28" fill="#C9B8E8"/><ellipse cx="33" cy="34" rx="8" ry="11" fill="#C9B8E8"/><ellipse cx="67" cy="34" rx="8" ry="11" fill="#C9B8E8"/>' + eyes + mouth + z + '</svg>';
  }

  function panelCardHTML(panel, caption) {
    return '<span class="rt-emoji" aria-hidden="true">' + (EMOJI[panel] || '❓') + '</span><span class="rt-cap">' + esc(caption) + '</span>';
  }

  global.WakeUpPipActivity = {
    id: 'wake-up-pip-activity',

    strings: {
      title: { en: 'Wake Up, Pip!', de: 'Wach auf, Pip!', fr: 'Réveille-toi, Pip !', es: '¡Despierta, Pip!', pt: 'Acorda, Pip!', it: 'Svegliati, Pip!', nl: 'Word wakker, Pip!' },
      instruction: { en: 'Watch the story, then retell it to Pip.', de: 'Schau die Geschichte an und erzähl sie Pip nach.', fr: 'Regarde l’histoire, puis raconte-la à Pip.', es: 'Mira la historia y luego cuéntasela a Pip.', pt: 'Assista à história e depois reconte para o Pip.', it: 'Guarda la storia, poi raccontala a Pip.', nl: 'Kijk naar het verhaal en vertel het daarna aan Pip.' },
      prompt: { en: 'Tell Pip the story!', de: 'Erzähl Pip die Geschichte!', fr: 'Raconte l’histoire à Pip !', es: '¡Cuéntale la historia a Pip!', pt: 'Conte a história para o Pip!', it: 'Racconta la storia a Pip!', nl: 'Vertel Pip het verhaal!' },
      watchHint: { en: 'Watch the story. Then tell it to Pip!', de: 'Schau dir die Geschichte an. Dann erzähl sie Pip!', fr: 'Regarde bien l’histoire. Puis raconte-la à Pip !', es: 'Mira la historia. ¡Luego cuéntasela a Pip!', pt: 'Assista à história. Depois conte para o Pip!', it: 'Guarda la storia. Poi raccontala a Pip!', nl: 'Kijk naar het verhaal. Vertel het daarna aan Pip!' },
      play: { en: '🔊 Play the story', de: '🔊 Geschichte abspielen', fr: '🔊 Écouter l’histoire', es: '🔊 Escucha la historia', pt: '🔊 Tocar a história', it: '🔊 Ascolta la storia', nl: '🔊 Speel het verhaal af' },
      replay: { en: '🔊 Watch again', de: '🔊 Nochmal ansehen', fr: '🔊 Regarder encore', es: '🔊 Míralo otra vez', pt: '🔊 Assistir de novo', it: '🔊 Guarda di nuovo', nl: '🔊 Kijk nog eens' },
      toRetell: { en: 'Tell my friend! →', de: 'Erzähl es Pip! →', fr: 'Raconte à mon ami ! →', es: '¡Cuéntasela a mi amigo! →', pt: 'Conte para meu amigo! →', it: 'Racconta al tuo amico! →', nl: 'Vertel het aan mijn vriend! →' },
      retellHint: { en: 'Put it back in order, then tell it!', de: 'Bring alles in die richtige Reihenfolge, dann erzähl es!', fr: 'Remets l’histoire dans l’ordre, puis raconte-la !', es: '¡Ponla en orden y luego cuéntala!', pt: 'Coloque em ordem e depois conte!', it: 'Rimetti tutto in ordine, poi racconta!', nl: 'Zet het in de juiste volgorde en vertel het!' },
      tellIt: { en: 'Tell it!', de: 'Erzähl es!', fr: 'Raconte !', es: '¡Cuéntala!', pt: 'Conte!', it: 'Racconta!', nl: 'Vertel het!' },
      pipAsleep: { en: 'Zzz… what did I miss? You saw it — tell me!', de: 'Zzz… was habe ich verpasst? Du hast alles gesehen – erzähl es mir!', fr: 'Zzz… qu’est-ce que j’ai raté ? Tu as vu, toi — raconte-moi !', es: 'Zzz… ¿qué me perdí? Tú lo viste, ¡cuéntame!', pt: 'Zzz… o que eu perdi? Você viu — me conta!', it: 'Zzz… cosa mi è sfuggito? Tu hai visto tutto — raccontamelo!', nl: 'Zzz… wat heb ik gemist? Jij zag het — vertel het mij!' },
      pipListen: { en: 'I am listening! Tell me the whole story…', de: 'Ich höre zu! Erzähl mir die ganze Geschichte…', fr: 'J’écoute ! Raconte-moi toute l’histoire…', es: '¡Te escucho! Cuéntame toda la historia…', pt: 'Estou ouvindo! Me conte a história toda…', it: 'Sto ascoltando! Raccontami tutta la storia…', nl: 'Ik luister! Vertel me het hele verhaal…' },
      pipWin: { en: 'Yes! I feel like I was THERE — you told it so I could see it!', de: 'Ja! Ich fühle mich, als wäre ich DABEI gewesen – so gut hast du es erzählt!', fr: 'Ouiii ! J’ai l’impression d’y être ! Tu racontes tellement bien !', es: '¡Sí! ¡Siento que estuve AHÍ! Lo contaste tan bien que lo pude ver.', pt: 'Isso! Parece que eu estava LÁ — você contou tão bem que dá pra ver!', it: 'Sì! Mi sembra di essere lì con te — lo hai raccontato così bene che lo vedo!', nl: 'Ja! Het lijkt of ik erbij was — jij vertelde het zo goed dat ik het zag!' },
      breakEBC: { en: 'Hmm — a part came before what caused it. Can you find it?', de: 'Hmm – ein Teil kommt vor dem, was ihn auslöst. Findest du ihn?', fr: 'Hmm… une partie arrive avant ce qui la fait arriver. Tu la trouves ?', es: 'Mmm… una parte va antes de lo que la causa. ¿La encuentras?', pt: 'Hmm — uma parte veio antes do que a causou. Você consegue achar?', it: 'Ehm — un pezzo è arrivato prima di ciò che lo causa. Lo trovi?', nl: 'Hmm — een deel komt vóór wat het liet gebeuren. Kun jij het vinden?' },
      breakMP: { en: 'Wait — a piece is missing. What did I miss?', de: 'Moment – ein Teil fehlt. Was habe ich verpasst?', fr: 'Attends… il manque un morceau. Qu’est-ce que j’ai raté ?', es: 'Espera… falta una parte. ¿Qué me perdí?', pt: 'Espera — está faltando uma parte. O que eu perdi?', it: 'Aspetta — manca un pezzo. Cosa mi è sfuggito?', nl: 'Wacht — er ontbreekt een stukje. Wat heb ik gemist?' },
      breakFDF: { en: "Hmm — something doesn't belong here. Can you spot it?", de: 'Hmm – etwas gehört hier nicht dazu. Entdeckst du es?', fr: 'Hmm… une image n’est pas dans l’histoire. Tu la vois ?', es: 'Mmm… algo no va aquí. ¿Lo encuentras?', pt: 'Hmm — tem algo que não é dessa história. Você consegue achar?', it: 'Ehm — qui qualcosa non va bene. Lo vedi?', nl: 'Hmm — er hoort iets niet bij. Kun jij het ontdekken?' },
      reteach: { en: 'Remember — a story starts with the problem, and each part makes the next one happen.', de: 'Denk dran: Eine Geschichte beginnt mit dem Problem, und jeder Teil bringt den nächsten in Gang.', fr: 'Souviens-toi : une histoire commence par le problème, et chaque partie fait arriver la suivante.', es: 'Recuerda: la historia empieza con el problema, y cada parte hace que pase la siguiente.', pt: 'Lembre — a história começa com o problema, e cada parte faz a próxima acontecer.', it: 'Ricorda — la storia parte dal problema, e ogni pezzo fa succedere quello dopo.', nl: 'Denk eraan — een verhaal begint met het probleem, en elk deel laat het volgende gebeuren.' },
      coStart: { en: "Let's put this part where it belongs — see how it makes the next part happen?", de: 'Legen wir diesen Teil an die richtige Stelle – siehst du, wie er den nächsten in Gang bringt?', fr: 'Mettons cette partie à sa place… tu vois comme elle fait arriver la suivante ?', es: 'Vamos a poner esta parte en su lugar. ¿Ves cómo hace que pase la siguiente?', pt: 'Vamos colocar esta parte no lugar certo — viu como ela faz a próxima acontecer?', it: 'Mettiamo questo pezzo al suo posto — vedi come fa succedere quello dopo?', nl: 'Laten we dit deel op de juiste plek zetten — zie je hoe het het volgende deel laat gebeuren?' },
      hintCheck: { en: 'Fill every spot, then tap Tell it!', de: 'Füll jeden Platz aus, dann tippe auf „Erzähl es!“', fr: 'Remplis toutes les places, puis appuie sur Raconte !', es: 'Llena todos los espacios y luego toca ¡Cuéntala!', pt: 'Preencha todos os espaços e toque em Conte!', it: 'Riempi ogni spazio, poi tocca Racconta!', nl: 'Vul elke plek in en tik op Vertel het!' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.view = null; this.film = null; this.stage = 'watch';
      this.placed = []; this.tray = []; this.lockedSet = {}; this.sel = null;
      this.solved = false; this.attempts = 0; this.broke = null; this.solvedCount = 0; this._watchToken = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.view = Core.childView(round); this.film = Core.watchFilm(round);
      this.stage = 'watch'; this.sel = null; this.solved = false; this.attempts = 0; this.broke = null; this._watchToken++;
      var n = this.view.slots, i;
      this.placed = []; for (i = 0; i < n; i++) this.placed.push(null);
      this.lockedSet = {};
      if (round.type === 'supply-key') { this.view.locked.forEach(function (l) { this.placed[l.slot] = l.panel; this.lockedSet[l.slot] = 1; }, this); this.tray = this.view.tray.map(function (t) { return t.panel; }); }
      else if (round.type === 'fix-memory') { this.view.prefill.forEach(function (p, k) { this.placed[k] = p ? p.panel : null; }, this); this.tray = this.view.tray.map(function (t) { return t.panel; }); }
      else { this.tray = this.view.tray.map(function (t) { return t.panel; }); }
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'rt-wrap'); var root = api.el('div', 'rt-root'); root.setAttribute('data-stage', this.stage); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      if (this.stage === 'done') this._renderDone(root);
      else if (this.stage === 'retell') this._renderRetell(root);
      else this._renderWatch(root);
      wrap.appendChild(root); stage.appendChild(wrap);
    },

    _pipRow: function (parent, mood, line) {
      var api = this.api, row = api.el('div', 'rt-piprow');
      var pip = api.el('div', 'rt-pip'); pip.setAttribute('data-mood', mood); pip.innerHTML = pipSVG(mood); row.appendChild(pip);
      if (line) { var b = api.el('div', 'rt-say'); b.textContent = line; row.appendChild(b); }
      parent.appendChild(row); return row;
    },

    /* ----- stage 0: WATCH (the film; GONE at retell) ----- */
    _renderWatch: function (root) {
      var self = this, api = this.api;
      this._pipRow(root, 'asleep', api.t('pipAsleep'));
      var hint = api.el('div', 'rt-hint'); hint.textContent = api.t('watchHint'); root.appendChild(hint);
      var strip = api.el('div', 'rt-film'); this._filmEl = strip;
      this.film.forEach(function (f, i) {
        var row = api.el('div', 'rt-filmrow'); row.setAttribute('data-i', i);
        var num = api.el('span', 'rt-snum'); num.textContent = (i + 1); row.appendChild(num);
        var body = api.el('span', 'rt-sbody'); body.style.background = tintFor(f.panel); body.innerHTML = panelCardHTML(f.panel, f.caption); row.appendChild(body);
        strip.appendChild(row);
      });
      root.appendChild(strip);
      var btns = api.el('div', 'rt-watchbtns');
      var play = api.el('button', 'rt-play'); play.type = 'button'; play.textContent = api.t(this._playedOnce ? 'replay' : 'play');
      play.addEventListener('click', function () { self._playStory(); });
      var go = api.el('button', 'rt-go'); go.type = 'button'; go.textContent = api.t('toRetell');
      go.addEventListener('click', function () { self._watchToken++; self.stage = 'retell'; self.api.sound && self.api.sound(700); self.render(); });
      btns.appendChild(play); btns.appendChild(go); root.appendChild(btns);
      if (!this._playedOnce) setTimeout(function () { self._playStory(); }, 300);
    },
    _playStory: function () {
      var self = this; this._playedOnce = true; var token = ++this._watchToken; var cards = this._filmEl ? this._filmEl.querySelectorAll('.rt-filmrow') : [];
      function step(i) {
        if (token !== self._watchToken || self.stage !== 'watch') return;
        for (var k = 0; k < cards.length; k++) cards[k].classList.toggle('rt-on', k === i);
        if (i >= self.film.length) { for (var m = 0; m < cards.length; m++) cards[m].classList.remove('rt-on'); return; }
        speak(self.film[i].caption);
        setTimeout(function () { step(i + 1); }, 1700);
      }
      step(0);
    },

    /* ----- stage 1: RETELL (the film is GONE) ----- */
    _renderRetell: function (root) {
      var self = this, api = this.api;
      var mood = this.broke ? 'hmm' : 'open';
      this._pipRow(root, mood, this.broke ? api.t(this.broke === Core.BREAK_KINDS.EFFECT_BEFORE_CAUSE ? 'breakEBC' : this.broke === Core.BREAK_KINDS.MISSING_PIECE ? 'breakMP' : 'breakFDF') : api.t('pipListen'));
      // stub-mirror bubble: n pips reflecting the WHOLE retell (no per-slot leak)
      var mir = api.el('div', 'rt-mirror' + (this._mirrorState || '')); this._mirEl = mir;
      for (var p = 0; p < this.view.slots; p++) { var dot = api.el('span', 'rt-mpip'); mir.appendChild(dot); }
      root.appendChild(mir);
      // .rt-main holds the ladder + tray — a single column on phone, two columns (ladder | tray) on desktop
      // so the tray costs NO vertical height where it is tightest (1024×900 / 1366×900). "Tell it!" sits below.
      var main = api.el('div', 'rt-main'); this._mainEl = main;
      // the ladder
      var ladder = api.el('div', 'rt-ladder');
      this.placed.forEach(function (panel, i) {
        var slot = api.el('div', 'rt-slot' + (panel ? ' rt-filled' : '') + (self.lockedSet[i] ? ' rt-locked' : '') + (self.sel && self.sel.src === 'slot' && self.sel.idx === i ? ' rt-sel' : ''));
        slot.setAttribute('data-i', i);
        var num = api.el('span', 'rt-snum'); num.textContent = (i + 1); slot.appendChild(num);
        var body = api.el('span', 'rt-sbody');
        if (panel) { body.style.background = tintFor(panel); body.innerHTML = panelCardHTML(panel, self._cap(panel)); }
        else { body.className = 'rt-sbody rt-empty'; body.textContent = '?'; }
        slot.appendChild(body);
        if (self.lockedSet[i]) { var lk = api.el('span', 'rt-lock'); lk.textContent = '🔒'; lk.setAttribute('aria-hidden', 'true'); slot.appendChild(lk); }
        else slot.addEventListener('click', function () { self._tapSlot(i); });
        ladder.appendChild(slot);
      });
      main.appendChild(ladder);
      // the tray
      if (this.tray.length) {
        var trayWrap = api.el('div', 'rt-tray');
        this.tray.forEach(function (panel) {
          var t = api.el('button', 'rt-tile' + (self.sel && self.sel.src === 'tray' && self.sel.panel === panel ? ' rt-sel' : '')); t.type = 'button'; t.style.background = tintFor(panel);
          t.innerHTML = '<span class="rt-emoji" aria-hidden="true">' + (EMOJI[panel] || '❓') + '</span>'; // emoji-only (compact); caption is spoken on select + shown once placed
          t.setAttribute('aria-label', self._cap(panel)); t.title = self._cap(panel);
          t.addEventListener('click', function () { self._tapTray(panel); });
          trayWrap.appendChild(t);
        });
        main.appendChild(trayWrap);
      }
      root.appendChild(main);
      // Tell it!
      var ready = this.placed.every(function (x) { return !!x; });
      var tell = api.el('button', 'rt-tell' + (ready ? '' : ' rt-off')); tell.type = 'button'; tell.textContent = api.t('tellIt'); tell.disabled = !ready;
      if (ready) tell.addEventListener('click', function () { self._tellIt(); });
      root.appendChild(tell);
    },
    _cap: function (panel) { return Core.panelCaption(this.round, panel); },

    _tapTray: function (panel) {
      if (this.sel && this.sel.src === 'tray' && this.sel.panel === panel) { this.sel = null; this.render(); return; }
      this.sel = { src: 'tray', panel: panel }; this.broke = null; this._mirrorState = ''; this.api.sound && this.api.sound(520); speak(this._cap(panel)); this.render();
    },
    _tapSlot: function (i) {
      if (this.lockedSet[i]) { this.api.sound && this.api.sound(300); return; }
      var self = this; this.broke = null; this._mirrorState = '';
      var sel = this.sel, cur = this.placed[i];
      if (!sel) { if (cur) { this.sel = { src: 'slot', idx: i }; this.api.sound && this.api.sound(520); } this.render(); return; }
      if (sel.src === 'tray') {
        if (cur) { this.tray.push(cur); } // displaced tile returns to tray
        this.placed[i] = sel.panel; this._removeFromTray(sel.panel); this.sel = null; this.api.sound && this.api.sound(600);
      } else { // slot -> slot (move or swap)
        if (sel.idx === i) { this.sel = null; }
        else { var tmp = this.placed[i]; this.placed[i] = this.placed[sel.idx]; this.placed[sel.idx] = tmp; this.sel = null; this.api.sound && this.api.sound(600); }
      }
      this.render();
    },
    _removeFromTray: function (panel) { var k = this.tray.indexOf(panel); if (k >= 0) this.tray.splice(k, 1); },

    _tellIt: function () {
      var self = this, api = this.api;
      var res = Core.validateRetell(this.round, this.placed);
      // voice the assembled retell top-to-bottom (the child's production)
      var line = this.placed.map(function (p) { return self._cap(p); }).join(' ');
      speak(line);
      if (res.ok) {
        this._mirrorState = ' rt-complete';
        this.solved = true; this.stage = 'done'; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 8);
        this.api.sound && this.api.sound(880); this.render();
        api.announce && api.announce(api.t('pipWin')); speak(api.t('pipWin'));
      } else {
        this.attempts++; this.broke = res.breakKind; this._mirrorState = ' rt-tangle';
        this.api.sound && this.api.sound(330); this.render();
        var diffuse = api.t(this.broke === Core.BREAK_KINDS.EFFECT_BEFORE_CAUSE ? 'breakEBC' : this.broke === Core.BREAK_KINDS.MISSING_PIECE ? 'breakMP' : 'breakFDF');
        api.announce && api.announce(diffuse); speak(diffuse);
        if (this.attempts === 2) setTimeout(function () { speak(api.t('reteach')); }, 1400);
        if (this.attempts >= 3) setTimeout(function () { self._coConstruct(); }, 1400);
      }
    },
    // with-prompting-and-support: warmly fix ONE part (never the whole answer; never sticks)
    _coConstruct: function () {
      var canon = Core.canonicalPlacement(this.round);
      var fixed = -1;
      for (var i = 0; i < canon.length; i++) { if (this.lockedSet[i]) continue; if (this.placed[i] !== canon[i]) { fixed = i; break; } }
      if (fixed < 0) return;
      // put the correct tile at `fixed`; send whatever is displaced back to the tray; pull the correct tile from wherever it is
      var want = canon[fixed], here = this.placed[fixed];
      var at = this.placed.indexOf(want);
      if (at >= 0 && !this.lockedSet[at]) { this.placed[at] = here; } else { if (here) this.tray.push(here); this._removeFromTray(want); }
      this.placed[fixed] = want; this.lockedSet[fixed] = 1; // hold the modeled part
      this.broke = null; this._mirrorState = ''; this.api.sound && this.api.sound(640);
      this.api.announce && this.api.announce(this.api.t('coStart')); speak(this.api.t('coStart')); this.render();
    },

    _renderDone: function (root) {
      var api = this.api;
      this._pipRow(root, 'delighted', api.t('pipWin'));
      var book = api.el('div', 'rt-book'); book.textContent = '📖✨'; root.appendChild(book);
      var pages = api.el('div', 'rt-pages');
      for (var i = 0; i < ((this._pool && this._pool.length) || 8); i++) { var pg = api.el('span', 'rt-page' + (i < this.solvedCount ? ' rt-page-on' : '')); pages.appendChild(pg); }
      root.appendChild(pages);
    },

    isCorrect: function () { return this.stage === 'done'; },
    reset: function () { this.setupTask(this.round); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks([]); var n = pool.length, i = (opts && opts.index) || 0;
      if (!n) return null;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = Math.floor(i / n); if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      this._playedOnce = false;
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/wake-up-pip-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; var pool = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds; self._pool = makeTasks(pool.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[wake-up-pip] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.rt-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,580px);margin:0 auto;}'
        + '.rt-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:clamp(4px,1vw,7px);background:linear-gradient(180deg,#FBF3E4,#F4E7CF);border-radius:20px;padding:clamp(6px,1.5vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        /* pip row */
        + '.rt-piprow{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;}'
        + '.rt-pip{width:clamp(42px,10vw,52px);flex:0 0 auto;}.rt-pip-svg{width:100%;height:auto;display:block;}'
        + '.rt-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:6px 11px;font:700 clamp(12px,3.2vw,15px)/1.3 "Baloo 2",sans-serif;color:' + C.T + ';max-width:78%;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.rt-hint{text-align:center;font:700 clamp(12px,3vw,14px)/1.25 "Nunito",sans-serif;color:' + C.T + ';opacity:.85;}'
        /* watch film — a 2-column grid of legible rows (fills the width on desktop, only 2 rows tall) */
        + '.rt-film{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(5px,1.5vw,9px);}'
        + '.rt-filmrow{display:flex;align-items:center;gap:7px;padding:5px 8px;border-radius:13px;background:#FFF;border:2px solid rgba(20,107,94,.12);transition:box-shadow .15s,transform .15s;}'
        + '.rt-filmrow.rt-on{transform:translateX(2px);box-shadow:0 0 0 3px ' + C.GOLD + ';border-color:transparent;}'
        + '.rt-emoji{font-size:clamp(24px,6vw,30px);line-height:1;}'
        + '.rt-cap{font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';text-align:left;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}'
        + '.rt-watchbtns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:2px;}'
        + '.rt-play{min-height:42px;padding:0 16px;border-radius:12px;border:0;background:#EAF2EE;color:' + C.T + ';font:800 clamp(13px,3.2vw,15px)/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;}'
        + '.rt-go{min-height:46px;padding:0 clamp(16px,5vw,26px);border-radius:14px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.rt-go:active,.rt-tell:active{transform:translateY(2px);}'
        /* stub-mirror bubble */
        + '.rt-mirror{display:flex;gap:6px;justify-content:center;align-items:center;min-height:11px;}'
        + '.rt-mpip{width:12px;height:12px;border-radius:50%;background:rgba(20,107,94,.18);transition:background .2s,transform .2s;}'
        + '.rt-mirror.rt-complete .rt-mpip{background:' + C.GOLD + ';transform:scale(1.15);}'
        + '.rt-mirror.rt-tangle .rt-mpip{background:#E6B8A6;animation:rtTangle .5s ease;}'
        + '@keyframes rtTangle{0%,100%{transform:translateY(0)}30%{transform:translateY(-3px) rotate(-8deg)}70%{transform:translateY(2px) rotate(8deg)}}'
        /* main = ladder + tray (single column on phone; two columns on desktop) */
        + '.rt-main{display:flex;flex-direction:column;gap:clamp(5px,1.5vw,9px);}'
        + '@media (min-width:768px){.rt-main{flex-direction:row;align-items:flex-start;gap:14px;}.rt-main .rt-ladder{flex:1;min-width:0;}.rt-main .rt-tray{flex:0 0 auto;max-width:154px;align-content:flex-start;justify-content:center;}.rt-main .rt-slot{min-height:38px;}.rt-main .rt-sbody{min-height:30px;padding:2px 8px;}.rt-main .rt-sbody .rt-emoji{font-size:22px;}.rt-tell{min-height:44px;}}'
        /* ladder */
        + '.rt-ladder{display:flex;flex-direction:column;gap:clamp(4px,1.2vw,7px);}'
        + '.rt-slot{display:flex;align-items:center;gap:8px;padding:3px 8px;border-radius:13px;border:2px dashed rgba(20,107,94,.3);background:#FFF;min-height:44px;cursor:pointer;}'
        + '.rt-slot.rt-filled{border-style:solid;border-color:rgba(20,107,94,.3);}'
        + '.rt-slot.rt-sel{box-shadow:0 0 0 3px rgba(242,120,75,.35);border-color:' + C.CORAL + ';}'
        + '.rt-slot.rt-locked{cursor:default;background:#F4F8F6;border-style:solid;border-color:rgba(20,107,94,.2);}'
        + '.rt-snum{width:22px;height:22px;flex:0 0 auto;border-radius:11px;background:' + C.T + ';color:#fff;font:800 12px/22px "Baloo 2",sans-serif;text-align:center;}'
        + '.rt-sbody{flex:1;display:flex;align-items:center;gap:8px;padding:3px 8px;border-radius:9px;min-height:34px;}'
        + '.rt-sbody.rt-empty{justify-content:center;color:rgba(20,107,94,.4);font:800 20px/1 "Baloo 2",sans-serif;background:transparent;}'
        + '.rt-sbody .rt-emoji{font-size:clamp(22px,6vw,28px);}.rt-sbody .rt-cap{text-align:left;flex:1;}'
        + '.rt-lock{font-size:14px;flex:0 0 auto;opacity:.6;}'
        /* tray */
        + '.rt-tray{display:flex;flex-wrap:wrap;gap:clamp(6px,2vw,10px);justify-content:center;align-items:center;padding:2px;}'
        + '.rt-tile{display:inline-flex;align-items:center;justify-content:center;width:clamp(50px,14vw,62px);height:clamp(50px,14vw,62px);padding:0;border-radius:14px;border:2px solid rgba(20,107,94,.18);box-shadow:0 2px 0 rgba(160,120,60,.2);cursor:pointer;touch-action:manipulation;}'
        + '.rt-tile.rt-sel{box-shadow:0 0 0 3px rgba(242,120,75,.4);border-color:' + C.CORAL + ';transform:translateY(-2px);}'
        + '.rt-tile .rt-emoji{font-size:clamp(24px,6.5vw,30px);}'
        + '.rt-tile:active{transform:translateY(2px);}'
        + '.rt-tell{align-self:center;min-height:46px;padding:0 clamp(20px,6vw,32px);border-radius:14px;border:0;background:' + C.GOOD + ';color:#fff;font:800 clamp(15px,4vw,19px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #1f7a4d;touch-action:manipulation;margin-top:0;}'
        + '.rt-tell.rt-off{opacity:.45;box-shadow:0 3px 0 rgba(20,107,94,.25);}'
        /* done */
        + '.rt-book{text-align:center;font-size:clamp(30px,8vw,42px);}'
        + '.rt-pages{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;}'
        + '.rt-page{width:clamp(11px,3vw,16px);height:8px;border-radius:3px;background:rgba(20,107,94,.16);transition:background .3s;}'
        + '.rt-page-on{background:' + C.GOLD + ';}'
        + '.rt-play:focus-visible,.rt-go:focus-visible,.rt-tell:focus-visible,.rt-tile:focus-visible,.rt-slot:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* narrow */
        + '@media (max-width:412px){.rt-root{padding:6px;gap:4px;}}'
        /* phones: the 2-col film gives each caption only ~half the width, so longer beats (en + es
           alike) wrap past line-clamp:2 and clip — go single-column so every caption gets full width
           and fits in 1–2 lines (§A.13.62: fix the layout, not the gate). Desktop keeps 2 columns. */
        + '@media (max-width:640px){.rt-film{grid-template-columns:1fr;}}'
        /* short viewports (320×640 etc.): the ~250px shell header leaves little room — compact the
           watch storyboard to a horizontal-card 2×2 + drop the redundant hint, and tighten retell. */
        + '@media (max-height:780px){'
        +   '.rt-root{gap:3px;padding:6px;}.rt-pip{width:clamp(36px,9vw,42px);}.rt-say{font-size:11.5px;padding:3px 7px;}.rt-hint{display:none;}'
        +   '.rt-film{gap:4px;}.rt-filmrow{padding:3px 7px;}.rt-filmrow .rt-emoji{font-size:20px;}.rt-filmrow .rt-cap{font-size:10px;line-height:1.15;-webkit-line-clamp:2;line-clamp:2;}'
        +   '.rt-play{min-height:36px;}.rt-go{min-height:42px;}.rt-tell{min-height:40px;margin-top:0;}'
        +   '.rt-slot{min-height:34px;padding:2px 6px;}.rt-sbody{min-height:28px;}.rt-sbody .rt-emoji{font-size:19px;}.rt-sbody .rt-cap{font-size:11px;-webkit-line-clamp:1;line-clamp:1;}.rt-ladder{gap:3px;}.rt-main{gap:5px;}'
        +   '.rt-tile{width:42px;height:42px;}.rt-tile .rt-emoji{font-size:22px;}.rt-tray{gap:6px;padding:0;}'
        +   '.rt-mirror{display:none;}' // the decorative stub-mirror is dropped at the tightest viewports (the diffuse feedback lives in Pip's bubble)
        + '}'
        /* ALL phones (≤480): the retell stack (4 rows + tray + Tell it + the shell Check) must clear the
           fold at 320×640 / 360×740 — compact the retell rows + tray + chrome (single column). */
        + '@media (max-width:480px){'
        +   '.rt-pip{width:clamp(38px,9vw,44px);}.rt-mirror{min-height:9px;}.rt-mpip{width:9px;height:9px;}'
        +   '.rt-slot{min-height:38px;padding:2px 7px;}.rt-sbody{min-height:30px;}.rt-sbody .rt-emoji{font-size:20px;}.rt-ladder{gap:4px;}.rt-main{gap:6px;}'
        +   '.rt-tile{width:44px;height:44px;}.rt-tile .rt-emoji{font-size:23px;}.rt-tray{gap:7px;padding:0;}'
        +   '.rt-tell{min-height:42px;margin-top:0;}'
        + '}'
        /* short viewports (320×640 / 360×740): defined AFTER the ≤480 block so it wins the tie — show
           the FULL ladder-slot caption (no "…" clip) by shrinking to 10px + allowing 2 lines, and pull
           slot heights/gaps in so 4 slots + Tell-it + the shell Check still clear the fold (§A.13.62). */
        + '@media (max-height:780px){'
        +   '.rt-slot{min-height:29px;padding:2px 6px;}.rt-sbody{min-height:25px;}.rt-sbody .rt-emoji{font-size:18px;}'
        +   '.rt-sbody .rt-cap{font-size:9.5px;line-height:1.12;-webkit-line-clamp:2;line-clamp:2;}.rt-ladder{gap:2px;}'
        + '}'
        + '@media (prefers-reduced-motion: reduce){.rt-mirror.rt-tangle .rt-mpip{animation:none!important;}.rt-filmrow{transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-wake-up-pip', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'wake-up-pip.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
        setup: function (tool) { tool.setupTask(round); },
        check: function (tool) { var ok = tool.isCorrect(); return ok; },
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
