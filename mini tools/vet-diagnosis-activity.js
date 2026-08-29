/* =====================================================================
   VET'S DIAGNOSIS WINDOW — ACTIVITY  (vet-diagnosis-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.OA.A.1 — model a word problem within 20 (adding to / taking from /
   putting together / comparing) with the unknown in ANY position. A shy
   animal patient arrives; the x-ray ENACTS the situation (the unknown fogged
   so the answer can't be counted off the scene); the story is read; the child
   MODELS it — tap a quantity tile, tap an iconic role-slot to place it, tap an
   empty slot to mark the "?", and LEAVE the magnitude-decoy in the tray; then
   a 0-20 dial appears, the child dials the DERIVED number, and "Diagnose"
   commits. Correct → the frosted x-ray CLEARS + the patient heals. Wrong →
   the x-ray stays gently cloudy (no red), the tiles reshuffle (anti-brute-
   force), re-diagnose freely. All grading from vet-diagnosis-core.js (the
   number is DERIVED — no `answer` field). 0 lines to any protected core +
   lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.VetDiagnosisCore;
  var C = { T: '#146B5E', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A' };
  var DIAG_ICON = { change: '🐾', bracket: '🧺', compare: '🐈' };
  var LANG = 'en';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: (LANG === 'es' ? 'es-MX' : (LANG === 'pt' ? 'pt-BR' : (LANG === 'it' ? 'it-IT' : LANG))), rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; u.lang = (LANG === 'es' ? 'es-MX' : (LANG === 'de' ? 'de-DE' : (LANG === 'fr' ? 'fr-FR' : (LANG === 'pt' ? 'pt-BR' : (LANG === 'it' ? 'it-IT' : (LANG === 'nl' ? 'nl-NL' : 'en-US')))))); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  global.VetDiagnosisActivity = {
    id: 'vet-diagnosis-activity',

    strings: {
      title: { en: "Vet's Diagnosis Window", de: 'Beim Tierarzt', fr: 'Chez le vétérinaire', es: 'En el veterinario', pt: 'No veterinário', it: 'Dal veterinario', nl: 'Bij de dierenarts' },
      instruction: { en: '', de: '', fr: '', es: '', pt: '', it: '', nl: '' },
      prompt: { en: 'Solve the story.', de: 'Rechne die Geschichte aus.', fr: 'Résous l’histoire.', es: 'Resuelve la historia.', pt: 'Resolva a história.', it: 'Risolvi la storia.', nl: 'Los het verhaal op.' },
      diagnose: { en: 'Diagnose 🩺', de: 'Diagnose 🩺', fr: 'Diagnostiquer 🩺', es: '¡Diagnostica! 🩺', pt: 'Diagnosticar 🩺', it: 'Diagnosi 🩺', nl: 'Diagnose 🩺' },
      replay: { en: '🔊 Read again', de: '🔊 Nochmal hören', fr: '🔊 Réécouter', es: '🔊 Escúchalo otra vez', pt: '🔊 Ouvir de novo', it: '🔊 Leggi ancora', nl: '🔊 Opnieuw luisteren' },
      sayWelcome: { en: 'A patient needs you! Show me what happened.', de: 'Ein Patient braucht dich! Zeig mir, was passiert ist.', fr: 'Un patient a besoin de toi ! Montre-moi ce qui s’est passé.', es: '¡Un paciente te necesita! Muéstrame qué pasó.', pt: 'Um paciente precisa de você! Me mostra o que aconteceu.', it: 'Un paziente ha bisogno di te! Mostrami cosa è successo.', nl: 'Er is een patiënt! Laat me zien wat er is gebeurd.' },
      sayModel: { en: 'Put each number where it belongs. One spot is the mystery — mark it.', de: 'Leg jede Zahl an ihren Platz. Ein Platz ist das Rätsel – markier ihn.', fr: 'Mets chaque nombre à sa place. Une place est le mystère — marque-la.', es: 'Pon cada número en su lugar. Un lugar es el misterio: márcalo.', pt: 'Coloque cada número no seu lugar. Um lugar é o mistério — marque!', it: 'Metti ogni numero al suo posto. Un posto è il mistero: segnalo!', nl: 'Leg elk getal op de goede plek. Eén plek is het raadsel — markeer die.' },
      sayDial: { en: 'Now — how many? Dial it in!', de: 'Und jetzt – wie viele? Tipp es ein!', fr: 'Et maintenant — combien ? Compose le nombre !', es: 'Y ahora, ¿cuántos son? ¡Escríbelo!', pt: 'E agora — quantos são? Escreva!', it: 'E ora: quanti sono? Componi il numero!', nl: 'En nu — hoeveel? Tik het in!' },
      sayWin: { en: 'All better! Thank you! 💚', de: 'Alles wieder gut! Danke! 💚', fr: 'Tout va mieux ! Merci ! 💚', es: '¡Ya está sano! ¡Gracias! 💚', pt: 'Tudo curado! Obrigada! 💚', it: 'Tutto sistemato! Grazie! 💚', nl: 'Weer helemaal beter! Dank je wel! 💚' },
      sayWait: { en: "Hmm, let's look again.", de: 'Hmm, schauen wir nochmal.', fr: 'Hmm, regardons encore.', es: 'Mmm, miremos otra vez.', pt: 'Hmm, vamos olhar de novo.', it: 'Mmm, guardiamo di nuovo.', nl: 'Hmm, laten we nog eens kijken.' },
      pickTile: { en: 'Now tap the spot where it belongs.', de: 'Jetzt tipp den Platz an, wo sie hingehört.', fr: 'Maintenant, touche la place où il va.', es: 'Ahora toca el lugar donde va.', pt: 'Agora toque no lugar certo.', it: 'Ora tocca il posto giusto.', nl: 'Tik nu de plek aan waar het hoort.' },
      hintCheck: { en: 'Place the numbers, mark the mystery, dial the answer.', de: 'Leg die Zahlen, markier das Rätsel, tipp die Antwort ein.', fr: 'Place les nombres, marque le mystère, compose la réponse.', es: 'Coloca los números, marca el misterio y escribe la respuesta.', pt: 'Coloque os números, marque o mistério e escreva a resposta.', it: 'Metti i numeri, segna il mistero, componi la risposta.', nl: 'Leg de getallen, markeer het raadsel, tik het antwoord in.' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.binding = {}; this.dialed = null; this._selected = null; this.msg = null;
      this._tray = null; this.healedCount = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.binding = {}; this.dialed = null; this._selected = null;
      this.msg = null; this._spoke = false;
      this._tray = shuffle(this.snap.tiles.map(function (t) { return t.id; }));
    },

    /* ---------- helpers ---------- */
    _tileById: function (id) { for (var i = 0; i < this.snap.tiles.length; i++) { if (this.snap.tiles[i].id === id) return this.snap.tiles[i]; } return null; },
    _boundTiles: function () { var s = this, out = {}; this.snap.roles.forEach(function (role) { var b = s.binding[role]; if (b && b !== '?') out[b] = role; }); return out; },
    _isFullyBound: function () { var s = this; return this.snap.roles.every(function (role) { return s.binding[role] != null; }); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'vd-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this;

      /* vet say-line */
      var say = api.el('div', 'vd-saytop');
      say.innerHTML = '<span class="vd-vet' + (this.solved ? ' vd-bounce' : '') + '">🦊</span><span class="vd-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      /* phase: model (place tiles) → dial (keypad) → solved. The x-ray + story
         span full width (the story stays ~2 lines, not 4); only the diagram +
         the tray/dial sit in the 2-col band. The x-ray is hidden in the DIAL
         phase to keep the activity inside the desktop stage budget. */
      var phase = this.solved ? 'solved' : (this._isFullyBound() ? 'dial' : 'model');

      if (phase === 'model' || phase === 'solved') this._renderXray(root);
      if (phase === 'model') {                                      /* full story only while modelling */
        var story = api.el('div', 'vd-story');
        var stext = api.el('p', 'vd-storytext'); stext.textContent = this.round.story; story.appendChild(stext);
        var replay = api.el('button', 'vd-replay'); replay.type = 'button'; replay.textContent = api.t('replay');
        replay.addEventListener('click', function () { speak(self.round.story); });
        story.appendChild(replay);
        root.appendChild(story);
      }

      if (phase === 'model') {
        /* the binding surface: iconic diagram (left) + the tile tray (right) */
        var cols = api.el('div', 'vd-cols');
        var left = api.el('div', 'vd-left'); var right = api.el('div', 'vd-right');
        this._renderDiagram(left); this._renderTray(right);
        cols.appendChild(left); cols.appendChild(right); root.appendChild(cols);
      } else if (phase === 'dial') {
        /* a compact one-line equation recap of the model + the dial */
        this._renderRecap(root, false);
        this._renderDial(root);
      } else {                                                      /* solved */
        this._renderRecap(root, true);
        var done = api.el('div', 'vd-done'); done.innerHTML = '<span class="vd-sticker">🌟</span><span class="vd-donetext">' + esc(api.t('sayWin')) + '</span>'; root.appendChild(done);
      }
      stage.appendChild(root);

      /* read the story once on first paint of a fresh round */
      if (!this._spoke && !this.solved) { this._spoke = true; setTimeout(function () { speak(self.round.story); }, 260); }
    },

    _renderXray: function (parent) {
      var api = this.api, r = this.round;
      var xray = api.el('div', 'vd-xray' + (this.solved ? ' vd-clear' : ''));
      xray.setAttribute('aria-hidden', 'true');
      /* the enacted situation band — emoji actors; the unknown is FOGGED */
      var scene = api.el('div', 'vd-scene');
      scene.innerHTML = this._sceneHTML(r);
      xray.appendChild(scene);
      /* the patient */
      var pat = api.el('div', 'vd-patient'); pat.textContent = this.solved ? '🐰' : '🐾';
      xray.appendChild(pat);
      if (!this.solved) { var frost = api.el('div', 'vd-frost'); frost.textContent = '❄'; xray.appendChild(frost); }
      else { var heart = api.el('div', 'vd-heal'); heart.textContent = '💚'; xray.appendChild(heart); }
      parent.appendChild(xray);
    },
    _sceneHTML: function (r) {
      /* a light, contained depiction; the unknown shown as a fog cloud (no count). */
      var icon = DIAG_ICON[r.diagram] || '🐾';
      var fog = '<span class="vd-fog">？</span>';
      if (r.diagram === 'compare') return '<span class="vd-row">' + icon + icon + icon + '</span><span class="vd-row vd-row2">' + icon + ' ' + fog + '</span>';
      if (r.diagram === 'bracket') return '<span class="vd-bag">' + icon + '</span><span class="vd-split">' + icon + icon + ' ' + fog + '</span>';
      /* change: actors + an action arrow + fog */
      var arrow = (r.op === 'sub') ? '➜💨' : '➜';
      return '<span class="vd-actors">' + icon + icon + '</span><span class="vd-act">' + arrow + '</span><span class="vd-fog">？</span>';
    },

    _renderDiagram: function (parent) {
      var api = this.api, self = this, r = this.round, d = this.snap.diagram;
      var wrap = api.el('div', 'vd-diagram vd-' + d);
      var roles = this.snap.roles;
      function slotEl(role, opGlyph) {
        var cell = api.el('div', 'vd-cell');
        var b = self.binding[role];
        var slot = api.el('button', 'vd-slot' + (b === '?' ? ' vd-unknown' : (b ? ' vd-filled' : ' vd-empty')));
        slot.type = 'button'; slot.setAttribute('data-role', role);
        if (b === '?') slot.textContent = '?';
        else if (b) { var t = self._tileById(b); slot.textContent = t ? t.value : ''; }
        else slot.textContent = '';
        slot.setAttribute('aria-label', b === '?' ? (LANG === 'es' ? 'lugar misterioso' : (LANG === 'de' ? 'Rätselplatz' : (LANG === 'fr' ? 'place mystère' : (LANG === 'pt' ? 'lugar misterioso' : (LANG === 'it' ? 'posto misterioso' : (LANG === 'nl' ? 'raadselplek' : 'mystery spot')))))) : (b ? (LANG === 'es' ? 'contiene ' : (LANG === 'de' ? 'enthält ' : (LANG === 'fr' ? 'contient ' : (LANG === 'pt' ? 'contém ' : (LANG === 'it' ? 'contiene ' : (LANG === 'nl' ? 'bevat ' : 'holds ')))))) + (self._tileById(b) || {}).value : (LANG === 'es' ? 'lugar vacío: toca para colocar un número o marcar el misterio' : (LANG === 'de' ? 'leerer Platz – tippe, um eine Zahl zu legen oder das Rätsel zu markieren' : (LANG === 'fr' ? 'place vide — touche pour poser un nombre ou marquer le mystère' : (LANG === 'pt' ? 'lugar vazio: toque para colocar um número ou marcar o mistério' : (LANG === 'it' ? 'posto vuoto: tocca per mettere un numero o segnare il mistero' : (LANG === 'nl' ? 'lege plek — tik om een getal te plaatsen of het raadsel te markeren' : 'empty spot — tap to place a number or mark the mystery'))))))));
        if (!self.solved) slot.addEventListener('click', function () { self._tapSlot(role); });
        cell.appendChild(slot);
        if (opGlyph) { var g = api.el('span', 'vd-op'); g.textContent = opGlyph; g.setAttribute('aria-hidden', 'true'); cell.insertBefore(g, cell.firstChild); }
        return cell;
      }
      if (d === 'change') {
        var opSign = (r.op === 'sub') ? '−' : '+';
        wrap.appendChild(slotEl('start'));
        wrap.appendChild(slotEl('change', opSign));
        wrap.appendChild(slotEl('result', '='));
      } else if (d === 'bracket') {
        var top = api.el('div', 'vd-brk-top'); top.appendChild(slotEl('whole')); wrap.appendChild(top);
        var brace = api.el('div', 'vd-brk-brace'); brace.setAttribute('aria-hidden', 'true'); wrap.appendChild(brace);
        var bot = api.el('div', 'vd-brk-bot'); bot.appendChild(slotEl('partA')); bot.appendChild(slotEl('partB')); wrap.appendChild(bot);
      } else if (d === 'compare') {
        var rowsW = api.el('div', 'vd-bars');
        rowsW.appendChild(this._bar('bigger')); rowsW.appendChild(this._bar('smaller'));
        wrap.appendChild(rowsW);
        var diff = api.el('div', 'vd-diffwrap'); var lab = api.el('span', 'vd-difflab'); lab.textContent = '?↔'; lab.setAttribute('aria-hidden', 'true');
        diff.appendChild(lab); diff.appendChild(slotEl('difference')); wrap.appendChild(diff);
      }
      parent.appendChild(wrap);
    },
    _bar: function (role) {
      var api = this.api, self = this;
      var row = api.el('div', 'vd-bar');
      var b = this.binding[role];
      var v = (b && b !== '?') ? (this._tileById(b) || {}).value : 0;
      /* a visible horizontal bar TRACK (present even when empty → reads as a
         bar chart, distinct from the bracket's vertical bond); the coral fill
         length grows with the placed value. */
      var track = api.el('div', 'vd-bartrack'); track.setAttribute('aria-hidden', 'true');
      var fill = api.el('div', 'vd-barfill'); fill.style.width = Math.max(0, Math.min(100, (Number(v) || 0) / 20 * 100)) + '%';
      track.appendChild(fill);
      var slot = api.el('button', 'vd-slot vd-barslot' + (b === '?' ? ' vd-unknown' : (b ? ' vd-filled' : ' vd-empty')));
      slot.type = 'button'; slot.setAttribute('data-role', role);
      slot.textContent = b === '?' ? '?' : (b ? ((this._tileById(b) || {}).value) : '');
      slot.setAttribute('aria-label', b === '?' ? (LANG === 'es' ? 'lugar misterioso' : (LANG === 'de' ? 'Rätselplatz' : (LANG === 'fr' ? 'place mystère' : (LANG === 'pt' ? 'lugar misterioso' : (LANG === 'it' ? 'posto misterioso' : (LANG === 'nl' ? 'raadselplek' : 'mystery spot')))))) : (b ? (LANG === 'es' ? 'contiene ' : (LANG === 'de' ? 'enthält ' : (LANG === 'fr' ? 'contient ' : (LANG === 'pt' ? 'contém ' : (LANG === 'it' ? 'contiene ' : (LANG === 'nl' ? 'bevat ' : 'holds ')))))) + ((this._tileById(b) || {}).value) : (LANG === 'es' ? 'lugar vacío' : (LANG === 'de' ? 'leerer Platz' : (LANG === 'fr' ? 'place vide' : (LANG === 'pt' ? 'lugar vazio' : (LANG === 'it' ? 'posto vuoto' : (LANG === 'nl' ? 'lege plek' : 'empty spot'))))))));
      if (!this.solved) slot.addEventListener('click', function () { self._tapSlot(role); });
      row.appendChild(track); row.appendChild(slot);
      return row;
    },

    _renderTray: function (parent) {
      var api = this.api, self = this;
      var hint = api.el('div', 'vd-trayhint'); hint.textContent = this._selected != null ? api.t('pickTile') : api.t('sayModel');
      parent.appendChild(hint);
      var tray = api.el('div', 'vd-tray');
      var bound = this._boundTiles();
      this._tray.forEach(function (id) {
        if (id in bound) return;   /* placed tiles leave the tray */
        var t = self._tileById(id); if (!t) return;
        var sel = (self._selected === id);
        var b = api.el('button', 'vd-tile' + (sel ? ' vd-sel' : '')); b.type = 'button'; b.setAttribute('data-id', id);
        b.textContent = t.value;
        b.setAttribute('aria-label', (LANG === 'es' ? 'número ' : (LANG === 'de' ? 'Zahl ' : (LANG === 'fr' ? 'nombre ' : (LANG === 'pt' ? 'número ' : (LANG === 'it' ? 'numero ' : (LANG === 'nl' ? 'getal ' : 'number ')))))) + t.value);
        b.addEventListener('click', function () { self._tapTile(id); });
        tray.appendChild(b);
      });
      parent.appendChild(tray);
    },

    _renderRecap: function (parent, withAnswer) {
      var api = this.api, self = this, r = this.round;
      var val = function (role) {
        if (role === r.unknownRole) return (withAnswer && self.dialed != null) ? self.dialed : '?';
        var b = self.binding[role];
        if (b && b !== '?') { var t = self._tileById(b); return t ? t.value : '?'; }
        return '?';
      };
      var eq;
      if (r.diagram === 'change') eq = val('start') + ' ' + (r.op === 'sub' ? '−' : '+') + ' ' + val('change') + ' = ' + val('result');
      else if (r.diagram === 'bracket') eq = val('partA') + ' + ' + val('partB') + ' = ' + val('whole');
      else eq = val('smaller') + ' + ' + val('difference') + ' = ' + val('bigger');   /* compare: smaller + difference = bigger */
      var box = api.el('div', 'vd-recap'); box.textContent = eq; box.setAttribute('aria-label', (LANG === 'es' ? 'tu modelo: ' : (LANG === 'de' ? 'dein Modell: ' : (LANG === 'fr' ? 'ton modèle : ' : (LANG === 'pt' ? 'seu modelo: ' : (LANG === 'it' ? 'il tuo schema: ' : (LANG === 'nl' ? 'jouw model: ' : 'your model: ')))))) + eq);
      parent.appendChild(box);
    },

    _renderDial: function (parent) {
      var api = this.api, self = this;
      var row = api.el('div', 'vd-disprow');
      var disp = api.el('div', 'vd-disp'); disp.textContent = this.dialed == null ? '?' : this.dialed; row.appendChild(disp);
      var rep = api.el('button', 'vd-replay vd-replaymini'); rep.type = 'button'; rep.textContent = '🔊'; rep.setAttribute('aria-label', api.t('replay'));
      rep.addEventListener('click', function () { speak(self.round.story); });
      row.appendChild(rep);
      parent.appendChild(row);
      /* a compact 0-9 digit pad (builds 0-20) — short even in a narrow column */
      var pad = api.el('div', 'vd-keypad');
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach(function (n) {
        var key = api.el('button', 'vd-key'); key.type = 'button'; key.textContent = n;
        key.setAttribute('aria-label', String(n));
        key.addEventListener('click', function () { self._pushDigit(n); });
        pad.appendChild(key);
      });
      parent.appendChild(pad);
      var diag = api.el('button', 'vd-diagnose'); diag.type = 'button'; diag.textContent = api.t('diagnose');
      diag.disabled = (this.dialed == null);
      diag.addEventListener('click', function () { self._diagnose(); });
      parent.appendChild(diag);
    },

    /* ---------- interaction ---------- */
    _tapTile: function (id) {
      this._selected = (this._selected === id) ? null : id;
      this.api.sound && this.api.sound(this._selected ? 560 : 400);
      this.msg = null;
      this.render();
    },
    _tapSlot: function (role) {
      var prev = this.binding[role];
      if (this._selected != null) {
        /* if the slot held a tile, that tile returns to the tray automatically
           (it is simply no longer bound). place the selected tile here. */
        this.binding[role] = this._selected;
        this._selected = null;
        this.api.sound && this.api.sound(640);
      } else if (prev && prev !== '?') {
        /* pick the tile back up → return to tray */
        this.binding[role] = undefined;
        this.api.sound && this.api.sound(400);
      } else {
        /* toggle the "?" mystery mark on an empty / '?' slot */
        this.binding[role] = (prev === '?') ? undefined : '?';
        this.api.sound && this.api.sound(prev === '?' ? 400 : 520);
      }
      /* if a tile got displaced from another slot by being placed here, drop the
         duplicate binding (a tile can only live in one slot). */
      this._dedupeTile(role);
      this.msg = null;
      this.render();
    },
    _dedupeTile: function (keepRole) {
      var s = this, id = this.binding[keepRole];
      if (!id || id === '?') return;
      this.snap.roles.forEach(function (role) { if (role !== keepRole && s.binding[role] === id) s.binding[role] = undefined; });
    },
    _pushDigit: function (d) {
      var next = (this.dialed == null) ? d : (this.dialed * 10 + d);
      if (next > 20) next = d;          /* keep within 0-20 (restart with this digit) */
      this.dialed = next;
      this.api.sound && this.api.sound(600);
      this.render();
    },
    _clearDial: function () {
      this.dialed = null;
      this.api.sound && this.api.sound(400);
      this.render();
    },
    /* test/probe seam: set the dial directly to a value (clamped 0-20). */
    _dial: function (n) {
      this.dialed = (n == null) ? null : Math.max(0, Math.min(20, n));
      this.render();
    },

    _diagnose: function () {
      var api = this.api;
      if (this.dialed == null) return;
      if (Core.gradeAttempt(this.round, this.binding, this.dialed)) { this._correct(); return; }
      /* WRONG — the x-ray stays cloudy (no red); reshuffle the tiles + clear the
         binding + dial (anti-brute-force); re-diagnose freely. */
      this.msg = api.t('sayWait');
      this.binding = {}; this.dialed = null; this._selected = null;
      this._tray = shuffle(this.snap.tiles.map(function (t) { return t.id; }));
      api.sound && api.sound(360);
      this.render();
      api.announce && api.announce(api.t('sayWait'));
    },
    _correct: function () {
      var api = this.api;
      this.solved = true;
      this.healedCount = Math.min(this.healedCount + 1, (this._pool && this._pool.length) || 14);
      this.msg = api.t('sayWin');
      api.sound && api.sound(880);
      this.render();
      api.announce && api.announce(api.t('sayWin'));
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
      fetch('/mini-tools/vet-diagnosis-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          var rs = (row.params.roundsL10n && row.params.roundsL10n[LANG]) || row.params.rounds;
          self._pool = makeTasks(rs.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[vet-diagnosis] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.vd-root{position:relative;width:100%;max-width:min(96vw,720px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,7px);background:linear-gradient(180deg,#FBF3E4,#EBF2EE);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.vd-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.vd-saytext{min-width:0;overflow-wrap:break-word;}'
        + '.vd-vet{font-size:clamp(19px,4.6vw,26px);flex:0 0 auto;}.vd-bounce{animation:vdBounce .5s ease;}'
        + '@keyframes vdBounce{0%{transform:scale(.8)}60%{transform:scale(1.12)}100%{transform:none}}'
        /* two columns; stacks on phones */
        + '.vd-cols{display:flex;flex-direction:row;gap:clamp(8px,2vw,14px);align-items:center;justify-content:center;min-width:0;}'
        + '.vd-left{flex:0 1 auto;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}'
        + '.vd-right{flex:1 1 52%;min-width:0;display:flex;flex-direction:column;gap:clamp(5px,1.2vw,8px);align-items:stretch;}'
        + '@media (max-width:540px){.vd-cols{flex-direction:column;align-items:stretch;}.vd-left,.vd-right{flex:1 1 auto;width:100%;}}'
        /* x-ray window */
        + '.vd-xray{position:relative;border-radius:11px;background:radial-gradient(circle at 50% 40%,#2B6E63,#15433C);overflow:hidden;min-height:clamp(30px,7.5vw,40px);display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 3px rgba(255,255,255,.12);}'
        + '.vd-scene{display:flex;align-items:center;gap:5px;font-size:clamp(14px,3.6vw,19px);color:#EAF7F2;filter:drop-shadow(0 1px 1px rgba(0,0,0,.3));z-index:1;flex-wrap:wrap;justify-content:center;padding:5px;}'
        + '.vd-scene .vd-row{display:inline-flex;gap:2px;}.vd-row2{opacity:.95;}'
        + '.vd-fog{display:inline-flex;align-items:center;justify-content:center;min-width:1.4em;height:1.3em;padding:0 .3em;border-radius:7px;background:rgba(255,255,255,.32);color:#0E433B;font:800 .8em/1 "Baloo 2",sans-serif;}'
        + '.vd-patient{position:absolute;right:7px;bottom:3px;font-size:clamp(16px,4vw,22px);z-index:2;}'
        + '.vd-frost{position:absolute;inset:0;background:linear-gradient(135deg,rgba(220,236,245,.78),rgba(190,216,228,.66));backdrop-filter:blur(1px);display:flex;align-items:flex-start;justify-content:flex-end;color:rgba(255,255,255,.85);font-size:18px;padding:4px 6px;z-index:3;}'
        + '.vd-xray.vd-clear .vd-frost{display:none;}'
        + '.vd-heal{position:absolute;left:8px;top:6px;font-size:clamp(18px,4.4vw,24px);z-index:3;animation:vdHeal .6s ease;}'
        + '@keyframes vdHeal{0%{transform:scale(0)}70%{transform:scale(1.3)}100%{transform:none}}'
        /* story */
        + '.vd-story{background:#fff;border-radius:11px;padding:clamp(5px,1.4vw,8px) clamp(7px,1.8vw,10px);box-shadow:inset 0 0 0 2px rgba(20,107,94,.1);min-width:0;display:flex;align-items:flex-start;gap:6px;}'
        + '.vd-storytext{margin:0;font:600 clamp(11.5px,2.9vw,14px)/1.28 "Nunito",sans-serif;color:' + C.INK + ';min-width:0;overflow-wrap:break-word;word-break:break-word;flex:1 1 auto;}'
        + '.vd-replay{border:0;background:rgba(20,107,94,.1);color:' + C.T + ';border-radius:12px;padding:4px 8px;min-height:34px;font:700 clamp(10px,2.4vw,12px)/1 "Baloo 2",sans-serif;cursor:pointer;flex:0 0 auto;white-space:nowrap;}'
        + '.vd-replay:active{transform:translateY(1px);}'
        /* diagram + iconic slots */
        + '.vd-diagram{background:rgba(20,107,94,.06);border-radius:12px;padding:clamp(6px,1.6vw,10px);display:flex;align-items:center;justify-content:center;gap:clamp(4px,1.4vw,9px);min-width:0;flex-wrap:wrap;}'
        + '.vd-cell{display:flex;align-items:center;gap:clamp(3px,1.1vw,7px);}'
        + '.vd-op{font:800 clamp(15px,4vw,21px)/1 "Baloo 2",sans-serif;color:' + C.T + ';flex:0 0 auto;}'
        + '.vd-slot{min-width:clamp(44px,11vw,54px);height:clamp(44px,11vw,54px);border-radius:12px;border:2.5px dashed rgba(20,107,94,.45);background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font:800 clamp(16px,4.4vw,22px)/1 "Baloo 2",sans-serif;color:' + C.T + ';padding:0 4px;box-sizing:border-box;touch-action:manipulation;}'
        + '.vd-slot.vd-filled{border-style:solid;border-color:' + C.CORAL + ';background:#FFF1EA;color:' + C.CORAL2 + ';box-shadow:0 2px 0 rgba(217,87,47,.18);}'
        + '.vd-slot.vd-unknown{border-style:solid;border-color:' + C.T + ';background:#E7F1EE;color:' + C.T + ';}'
        + '.vd-slot:active{transform:translateY(1px);}'
        + '.vd-slot:focus-visible,.vd-tile:focus-visible,.vd-key:focus-visible,.vd-diagnose:focus-visible,.vd-replay:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* bracket layout */
        /* bracket = a part-part-whole BOND: whole on top, a drawn brace down to two parts */
        + '.vd-bracket{flex-direction:column;gap:0;align-items:center;}'
        + '.vd-brk-top,.vd-brk-bot{display:flex;justify-content:center;}'
        + '.vd-brk-bot{gap:clamp(26px,9vw,48px);}'
        + '.vd-brk-brace{position:relative;width:clamp(64px,38%,116px);height:9px;border:2.5px solid ' + C.T + ';border-top:0;border-radius:0 0 9px 9px;margin:5px 0 3px;}'
        + '.vd-brk-brace::before{content:"";position:absolute;left:50%;top:-6px;width:2.5px;height:6px;background:' + C.T + ';transform:translateX(-50%);}'
        /* compare = two horizontal length BARS (visibly different lengths) + a difference slot */
        + '.vd-compare{flex-direction:row;gap:clamp(6px,2vw,12px);align-items:center;}'
        + '.vd-bars{display:flex;flex-direction:column;gap:6px;flex:1 1 auto;min-width:0;}'
        + '.vd-bar{position:relative;display:flex;align-items:center;gap:7px;min-width:0;}'
        + '.vd-bartrack{flex:1 1 auto;min-width:22px;height:18px;border-radius:9px;background:rgba(20,107,94,.12);box-shadow:inset 0 0 0 1.5px rgba(20,107,94,.18);overflow:hidden;}'
        + '.vd-barfill{height:100%;border-radius:9px;background:' + C.CORAL + ';transition:width .25s;}'
        + '.vd-barslot{flex:0 0 auto;}'
        + '.vd-diffwrap{display:flex;flex-direction:column;align-items:center;gap:2px;flex:0 0 auto;border-left:2.5px dashed rgba(20,107,94,.4);padding-left:clamp(5px,1.6vw,9px);}.vd-difflab{font:800 12px/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* tray + hint */
        + '.vd-trayhint{text-align:center;font:700 clamp(11px,2.9vw,13px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;overflow-wrap:break-word;}'
        + '.vd-tray{display:flex;flex-wrap:wrap;gap:clamp(7px,2vw,11px);justify-content:center;}'
        + '.vd-tile{min-width:clamp(48px,12vw,60px);height:clamp(48px,12vw,60px);border-radius:13px;border:2px solid rgba(242,120,75,.5);background:#fff;box-shadow:0 2px 0 rgba(160,120,60,.16);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0 6px;box-sizing:border-box;touch-action:manipulation;color:' + C.CORAL2 + ';font:800 clamp(18px,4.6vw,22px)/1 "Baloo 2",sans-serif;}'
        + '.vd-tile.vd-sel{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.32);transform:translateY(-2px);}'
        + '.vd-tile:active{transform:translateY(1px);}'
        /* dial */
        + '.vd-recap{align-self:stretch;text-align:center;font:800 clamp(20px,5.4vw,28px)/1.1 "Baloo 2",sans-serif;color:' + C.T + ';padding:clamp(4px,1.2vw,7px);background:rgba(20,107,94,.07);border-radius:11px;letter-spacing:.02em;}'
        + '.vd-disprow{display:flex;align-items:center;justify-content:center;gap:8px;}'
        + '.vd-replaymini{min-height:34px;min-width:38px;padding:4px 8px;font-size:15px;}'
        + '.vd-disp{min-width:54px;height:clamp(30px,6.5vw,36px);padding:0 14px;border-radius:11px;background:#fff;box-shadow:inset 0 0 0 2px ' + C.T + ';display:inline-flex;align-items:center;justify-content:center;font:800 clamp(16px,4.2vw,21px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.vd-keypad{display:grid;grid-template-columns:repeat(5,clamp(44px,9.5vw,48px));gap:clamp(4px,1.1vw,6px);justify-content:center;}'
        + '.vd-key{width:100%;aspect-ratio:1;border-radius:9px;border:0;background:#fff;box-shadow:0 2px 0 rgba(20,107,94,.16);cursor:pointer;font:800 clamp(13px,3.4vw,17px)/1 "Baloo 2",sans-serif;color:' + C.T + ';touch-action:manipulation;display:inline-flex;align-items:center;justify-content:center;}'
        + '.vd-key:active{transform:translateY(1px);}'
        + '.vd-diagnose{align-self:center;min-height:46px;padding:0 clamp(16px,4.6vw,26px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.vd-diagnose:disabled{opacity:.45;cursor:default;box-shadow:none;}.vd-diagnose:active:not(:disabled){transform:translateY(2px);}'
        + '.vd-done{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:6px;}.vd-sticker{font-size:clamp(34px,9vw,52px);animation:vdHeal .6s ease;}.vd-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        /* desktop breathing room */
        + '@media (min-width:760px){.vd-root{padding:14px 16px;}}'
        /* phones + short viewports — compact the MODEL stack (x-ray + story +
           diagram + tray) so it clears the fold at 320×640. */
        + '@media (max-width:480px){.vd-root{gap:5px;padding:8px;}.vd-slot{min-width:46px;height:46px;}.vd-tile{min-height:46px;}.vd-story{padding:5px 8px;}.vd-storytext{font-size:12px;line-height:1.22;}}'
        + '@media (max-width:380px){.vd-root{gap:3px;padding:5px;}.vd-cols{gap:4px;}.vd-xray{min-height:18px;}.vd-scene{font-size:11px;padding:1px;gap:3px;}.vd-patient{font-size:13px;}.vd-story{padding:2px 7px;}.vd-storytext{font-size:11px;line-height:1.15;}.vd-replay{min-height:30px;padding:3px 6px;}.vd-diagram{padding:1px;gap:4px;}.vd-bars{gap:4px;}.vd-brk-brace{height:4px;margin:1px 0 1px;}.vd-bartrack{height:15px;}.vd-trayhint{font-size:10px;line-height:1.05;}.vd-tray{gap:7px;}.vd-recap{font-size:20px;padding:3px;}.vd-tile{min-width:46px;height:46px;}}'
        + '@media (max-width:340px) and (max-height:660px){.vd-xray{min-height:20px;}.vd-slot{min-width:44px;height:44px;}.vd-tile{min-width:44px;height:44px;}.vd-key{font-size:14px;}.vd-storytext{font-size:10.5px;}}'
        + '@media (prefers-reduced-motion: reduce){.vd-bounce,.vd-heal,.vd-sticker,.vd-barfill{animation:none!important;transition:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-vet-diagnosis', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'vet-diagnosis.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
