/* =====================================================================
   DEWEY'S TEN-TANK — ACTIVITY  (ten-tank-activity.js)
   ---------------------------------------------------------------------
   CCSS K.NBT.A.1 — compose/decompose 11–19 as a SEALED ten + N ones, recorded
   10 + N. UNITIZING: a complete ten SEALS into one wielded unit. The double
   ten-frame tank: left = the sealed ten (one unit; accepts ONLY a ten), right =
   the ones (caps at 9). Seven distinct terminal-acts: seal / place-a-ready-ten /
   decompose / regroup / repair / compose-from-audio / compare-by-structure.

   Validity DERIVED by mini tools/ten-frame-tank-core.js. answerType:'state'.
   Only ONE full 2×5 grid of 44px cells is active at a time (the sealed ten
   collapses to a compact chip) — the mobile budget. Dewey/bubbles = SVG STUB
   placeholders for CA5. No timer/score/streak; refusals are charming. 0 lines
   to the protected cores + lcs-shell.*.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TenFrameTankCore;
  var C = { T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F', CREAM: '#FBF3E4', INK: '#2A2A35', GOLD: '#E8A53A' };
  var WORDS = { 10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen' };
  var WORDS_DE = { 10: 'zehn', 11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn', 15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 19: 'neunzehn' };
  var WORDS_FR = { 10: 'dix', 11: 'onze', 12: 'douze', 13: 'treize', 14: 'quatorze', 15: 'quinze', 16: 'seize', 17: 'dix-sept', 18: 'dix-huit', 19: 'dix-neuf' };
  var WORDS_ES = { 10: 'diez', 11: 'once', 12: 'doce', 13: 'trece', 14: 'catorce', 15: 'quince', 16: 'dieciséis', 17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve' };
  var WORDS_PT = { 10: 'dez', 11: 'onze', 12: 'doze', 13: 'treze', 14: 'quatorze', 15: 'quinze', 16: 'dezesseis', 17: 'dezessete', 18: 'dezoito', 19: 'dezenove' };
  var WORDS_IT = { 10: 'dieci', 11: 'undici', 12: 'dodici', 13: 'tredici', 14: 'quattordici', 15: 'quindici', 16: 'sedici', 17: 'diciassette', 18: 'diciotto', 19: 'diciannove' };
  var LANG = 'en';
  function numWord(n) { return (LANG === 'es' ? WORDS_ES : LANG === 'de' ? WORDS_DE : LANG === 'fr' ? WORDS_FR : LANG === 'pt' ? WORDS_PT : LANG === 'it' ? WORDS_IT : WORDS)[n]; }

  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: String(text), lang: (LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG), rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(String(text)); u.rate = .95; u.lang = (LANG === 'es' ? 'es-MX' : LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : 'en-US'); global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function bubbleSVG(kind) {
    var a = kind === 'ten' ? '#2E9C88' : '#F2784B', b = kind === 'ten' ? '#146B5E' : '#D9572F';
    return '<svg viewBox="0 0 100 100" class="tt-bub-svg" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="' + b + '"/><circle cx="50" cy="50" r="32" fill="' + a + '"/><ellipse cx="40" cy="38" rx="12" ry="8" fill="#fff" opacity="0.4"/></svg>';
  }
  function deweySVG(mood) {
    var happy = mood === 'happy' || mood === 'seal', shake = mood === 'shake';
    var eyes = '<circle cx="42" cy="44" r="3.4" fill="#2A2A35"/><circle cx="58" cy="44" r="3.4" fill="#2A2A35"/>';
    var beak = '<path d="M46 52 q4 6 8 0 Z" fill="#E8A53A"/>';
    return '<svg class="tt-dewey-svg" viewBox="0 0 100 100" role="img" aria-label="Dewey"' + (shake ? ' style="animation:ttShake .4s"' : '') + '>'
      + '<ellipse cx="50" cy="56" rx="30" ry="30" fill="#FBE08A"/><ellipse cx="50" cy="34" rx="20" ry="19" fill="#FCEBA8"/>'
      + eyes + beak + (happy ? '<path d="M24 60 q-10 4 -6 14" stroke="#FBE08A" stroke-width="10" fill="none" stroke-linecap="round"/>' : '') + '</svg>';
  }

  global.TenTankActivity = {
    id: 'ten-tank-activity',
    reward: { id: 'lily-pond', label: 'Lily Pond', emoji: '🪷' },

    strings: {
      title: { en: "Dewey's Ten-Tank", de: 'Deweys Zehner-Tank', fr: 'Le réservoir de Dewey', es: 'El tanque de decenas de Dewey', pt: 'Tanque de Dez do Dudu', it: 'La vasca di Dewey' },
      prompt: { en: 'Make a ten and some ones!', de: 'Mach einen Zehner und ein paar Einer!', fr: 'Fais une dizaine et des unités !', es: '¡Forma una decena y algunas unidades!', pt: 'Monte uma dezena e algumas unidades!', it: 'Fai una decina e alcune unità!' },
      buildTenHint: { en: 'Tap the tank to drop bubbles — fill it to ten!', de: 'Tippe auf den Tank und lass Blasen hinein – füll ihn bis zehn!', fr: 'Touche le réservoir pour faire tomber des bulles — remplis-le jusqu’à dix !', es: 'Toca el tanque y deja entrar las burbujas: ¡llénalo hasta diez!', pt: 'Toque no tanque para soltar bolhas — encha até dez!', it: 'Tocca la vasca: fai cadere le bolle fino a dieci!' },
      placeTenHint: { en: 'Pop the ready-made ten into the tank!', de: 'Setz den fertigen Zehner in den Tank!', fr: 'Mets la dizaine toute prête dans le réservoir !', es: '¡Pon en el tanque la decena ya formada!', pt: 'Solte a dezena pronta no tanque!', it: 'Metti la decina già pronta nella vasca!' },
      placeOnesHint: { en: 'Now add the ones — tap to drop them in.', de: 'Jetzt die Einer dazu – tippe und lass sie hineinfallen.', fr: 'Ajoute maintenant les unités — touche pour les faire tomber.', es: 'Ahora las unidades: toca y déjalas caer.', pt: 'Agora ponha as unidades — toque para soltar.', it: 'Ora aggiungi le unità: tocca per farle cadere.' },
      regroupHint: { en: 'Drop ones — ten ones will make a ten!', de: 'Lass Einer hineinfallen – zehn Einer werden zu einem Zehner!', fr: 'Fais tomber des unités — dix unités feront une dizaine !', es: 'Deja caer unidades: ¡diez unidades forman una decena!', pt: 'Solte unidades — dez unidades viram uma dezena!', it: 'Fai cadere le unità: dieci unità formano una decina!' },
      decomposeHint: { en: 'Take it apart: the ten in one tray, the ones in the other.', de: 'Nimm die Zahl auseinander: den Zehner in das eine Fach, die Einer in das andere.', fr: 'Sépare le nombre : la dizaine dans un bac, les unités dans l’autre.', es: 'Separa el número: la decena en un espacio y las unidades en el otro.', pt: 'Separe: a dezena numa bandeja, as unidades na outra.', it: 'Scomponi: la decina in un vassoio e le unità in un altro.' },
      repairHint: { en: 'Dewey needs {n} — how many more ones?', de: 'Dewey braucht {n} – wie viele Einer fehlen noch?', fr: 'Dewey a besoin de {n} — combien d’unités en plus ?', es: 'Dewey necesita {n}: ¿cuántas unidades faltan?', pt: 'Dudu quer {n} — quantas unidades faltam?', it: 'Dewey ha bisogno di {n}: quante altre unità?' },
      audioHint: { en: '🔊 Make the number Dewey said!', de: '🔊 Mach die Zahl, die Dewey gesagt hat!', fr: '🔊 Fais le nombre que Dewey a dit !', es: '🔊 ¡Forma el número que dijo Dewey!', pt: '🔊 Monte o número que o Dudu falou!', it: '🔊 Fai il numero che ha detto Dewey!' },
      compareHint: { en: 'Peek at both, then tap which has more!', de: 'Guck bei beiden kurz und tippe dann auf die, die mehr hat!', fr: 'Regarde les deux, puis touche celui qui en a le plus !', es: '¡Observa los dos y toca el que tiene más!', pt: 'Espie os dois e toque no que tem mais!', it: 'Sbircia tutti e due, poi tocca quale ne ha di più!' },
      makeOrder: { en: 'Make {n}!', de: 'Mach {n}!', fr: 'Fais {n} !', es: '¡Forma {n}!', pt: 'Monte {n}!', it: 'Fai {n}!' },
      hearAgain: { en: '🔊 Hear it again', de: '🔊 Nochmal hören', fr: '🔊 Réécouter', es: '🔊 Escuchar otra vez', pt: '🔊 Ouvir de novo', it: '🔊 Ascolta di nuovo' },
      tensTray: { en: 'Tens', de: 'Zehner', fr: 'Dizaines', es: 'Decenas', pt: 'Dezenas', it: 'Decine' },
      onesTray: { en: 'Ones', de: 'Einer', fr: 'Unités', es: 'Unidades', pt: 'Unidades', it: 'Unità' },
      moreMore: { en: '+{k} more', de: '+{k} mehr', fr: '+{k} de plus', es: '+{k} más', pt: '+{k} mais', it: '+{k} ancora' },
      peek: { en: 'Peek', de: 'Gucken', fr: 'Regarder', es: 'Ver', pt: 'Espiar', it: 'Sbircia' },
      seal: { en: 'Ten! A ten and…', de: 'Zehn! Ein Zehner und …', fr: 'Dix ! Une dizaine et…', es: '¡Diez! Una decena y…', pt: 'Dez! Uma dezena e…', it: 'Dieci! Una decina e…' },
      refuseSingle: { en: 'That\'s a ten-spot — singles go in the pond!', de: 'Das ist ein Zehner-Platz – einzelne Blasen kommen in den Teich!', fr: 'C’est une place pour une dizaine — les bulles seules vont dans la mare !', es: 'Ese espacio es para una decena: ¡las burbujas sueltas van al estanque!', pt: 'Aí é da dezena — as unidades vão no tanque!', it: 'Qui va una decina intera: le unità vanno nello stagno!' },
      refuseTenth: { en: 'That\'d make a whole new ten — we just need a ten and some!', de: 'Das gäbe einen ganz neuen Zehner – wir brauchen nur einen Zehner und ein paar Einer!', fr: 'Ça ferait une toute nouvelle dizaine — il faut juste une dizaine et quelques unités !', es: 'Eso formaría otra decena completa: ¡solo necesitamos una decena y algunas unidades!', pt: 'Isso faria outra dezena — a gente só quer uma dezena e umas unidades!', it: 'Così si forma una nuova decina: serve una decina e alcune unità!' },
      win: { en: 'A ten and some — you made it! 🦆', de: 'Ein Zehner und ein paar Einer – geschafft! 🦆', fr: 'Une dizaine et des unités — tu as réussi ! 🦆', es: '¡Una decena y algunas unidades: lo lograste! 🦆', pt: 'Uma dezena e mais um tanto — você conseguiu! 🦆', it: 'Una decina e alcune unità: ottimo lavoro! 🦆' },
      hintCheck: { en: 'Make a ten and some ones!', de: 'Mach einen Zehner und ein paar Einer!', fr: 'Fais une dizaine et des unités !', es: '¡Forma una decena y algunas unidades!', pt: 'Monte uma dezena e algumas unidades!', it: 'Fai una decina e alcune unità!' },
      srcLabelTen: { en: 'a ten — ten ones together', de: 'ein Zehner – zehn Einer zusammen', fr: 'une dizaine — dix unités ensemble', es: 'una decena: diez unidades juntas', pt: 'uma dezena — dez unidades juntas', it: 'una decina: dieci unità insieme' },
      rejectSealFirst: { en: 'Seal a ten yourself first!', de: 'Bündle erst selbst einen Zehner!', fr: 'Fais d’abord une dizaine toi-même !', es: '¡Primero forma tú una decena!', pt: 'Feche uma dezena primeiro!', it: 'Prima forma tu una decina!' },
      snapAnnounce: { en: 'Ten ones make a ten!', de: 'Zehn Einer werden zu einem Zehner!', fr: 'Dix unités font une dizaine !', es: '¡Diez unidades forman una decena!', pt: 'Dez unidades viram uma dezena!', it: 'Dieci unità formano una decina!' },
      rejectFix: { en: "Not quite — count what's missing!", de: 'Fast – zähl, was noch fehlt!', fr: 'Presque — compte ce qui manque !', es: 'Casi: ¡cuenta lo que falta!', pt: 'Quase — conte o que falta!', it: 'Non proprio: conta quante ne mancano!' },
      rejectJudge: { en: 'Look again — count the ones!', de: 'Schau nochmal – zähl die Einer!', fr: 'Regarde encore — compte les unités !', es: 'Mira otra vez: ¡cuenta las unidades!', pt: 'Olhe de novo — conte as unidades!', it: 'Guarda di nuovo: conta le unità!' },
      isMore: { en: '{n} is more!', de: '{n} ist mehr!', fr: '{n}, c’est plus !', es: '¡{n} es más!', pt: '{n} é mais!', it: '{n} è di più!' },
      tenAria: { en: 'a ten', de: 'ein Zehner', fr: 'une dizaine', es: 'una decena', pt: 'uma dezena', it: 'una decina' },
      judgeThis: { en: 'This one!', de: 'Das hier!', fr: 'Celui-ci !', es: '¡Este!', pt: 'Este!', it: 'Questa!' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.stage = 'build-ten'; this.cstate = null; this.sessionSealed = false;
      this.solved = false; this.solvedCount = 0; this.msg = null; this._heardSpoken = false;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.cstate = Core.newState(round, this.sessionSealed); this.solved = false; this.msg = null; this._heardSpoken = false;
      this.tenPlaced = false;   // ready-ten UI sub-flag
      var t = round.type;
      if (round.mode === 'decompose') this.stage = 'separate';
      else if (t === 'repair') this.stage = 'repair';
      else if (t === 'compare') this.stage = 'compare';
      else if (t === 'ready-ten') this.stage = 'place-ten';
      else if (round.mode === 'regroup') this.stage = 'regroup-loose';
      else this.stage = 'build-ten';   // seal / audio
    },

    _onesTarget: function () { return Core.onesOf(this.round); },
    announce: function (k) { if (this.api.announce) this.api.announce(k); },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS(); var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'tt-wrap'); var root = api.el('div', 'tt-root'); this._rootEl = root;
      if (!this.round) { wrap.appendChild(root); stage.appendChild(wrap); return; }
      var head = api.el('div', 'tt-head');
      var dw = api.el('div', 'tt-dewey'); dw.innerHTML = deweySVG(this.solved ? 'happy' : this.msg ? 'shake' : 'idle'); head.appendChild(dw);
      var say = api.el('div', 'tt-say'); say.textContent = this.msg || this._hint(); head.appendChild(say);
      root.appendChild(head);

      if (this.solved || this.stage === 'done') this._renderDone(root);
      else if (this.stage === 'build-ten') this._renderBuildTen(root);
      else if (this.stage === 'place-ten') this._renderPlaceTen(root);
      else if (this.stage === 'place-ones') this._renderPlaceOnes(root);
      else if (this.stage === 'regroup-loose') this._renderRegroup(root);
      else if (this.stage === 'separate') this._renderDecompose(root);
      else if (this.stage === 'repair') this._renderRepair(root);
      else if (this.stage === 'compare') this._renderCompare(root);

      wrap.appendChild(root); stage.appendChild(wrap);
      if (this.round.type === 'audio' && !this._heardSpoken) { this._heardSpoken = true; var self = this; setTimeout(function () { speak((LANG === 'es' ? 'Forma ' : LANG === 'de' ? 'Mach ' : LANG === 'fr' ? 'Fais ' : LANG === 'pt' ? 'Monte ' : LANG === 'it' ? 'Fai ' : 'Make ') + numWord(self.round.target)); }, 250); }
    },
    _hint: function () {
      var r = this.round, api = this.api;
      if (this.stage === 'build-ten') return r.type === 'audio' ? api.t('audioHint') : api.t('buildTenHint');
      if (this.stage === 'place-ten') return api.t('placeTenHint');
      if (this.stage === 'place-ones') return api.t('placeOnesHint');
      if (this.stage === 'regroup-loose') return api.t('regroupHint');
      if (this.stage === 'separate') return api.t('decomposeHint');
      if (this.stage === 'repair') return api.t('repairHint').replace('{n}', r.target);
      if (this.stage === 'compare') return api.t('compareHint');
      return api.t('prompt');
    },

    /* a 2×5 ten-frame; first `count` cells are filled bubbles, the next is the
       glowing "ready" cell (when active), the rest empty. */
    _frame: function (count, cap, kind, onAdd, onRemove, active) {
      var self = this, api = this.api, fr = api.el('div', 'tt-frame');
      for (var i = 0; i < 10; i++) {
        var filled = i < count, ready = active && i === count && i < cap;
        var cell = api.el('button', 'tt-cell' + (filled ? ' tt-filled' : ready ? ' tt-ready' : '') + (i >= cap ? ' tt-capcell' : '')); cell.type = 'button';
        if (filled) cell.innerHTML = bubbleSVG(kind);
        (function (idx, fil, rdy) {
          cell.addEventListener('click', function () { if (fil && onRemove) onRemove(idx); else if (rdy && onAdd) onAdd(idx); else if (idx >= cap && onAdd) onAdd(idx); });
        })(i, filled, ready);
        fr.appendChild(cell);
      }
      return fr;
    },
    _tenChip: function (onTap) {
      var api = this.api, chip = api.el('button', 'tt-tenchip'); chip.type = 'button'; chip.setAttribute('aria-label', api.t('tenAria'));
      var grid = api.el('div', 'tt-chipgrid');
      for (var i = 0; i < 10; i++) { var d = api.el('span', 'tt-chipdot'); grid.appendChild(d); }
      chip.appendChild(grid); var badge = api.el('span', 'tt-chipbadge'); badge.textContent = '10'; chip.appendChild(badge);
      if (onTap) chip.addEventListener('click', onTap);
      return chip;
    },
    _equation: function () {
      var api = this.api, ones = this.cstate.ones, done = this.cstate.sealedTenPlaced && ones === this._onesTarget();
      var eq = api.el('div', 'tt-eq' + (done ? ' tt-eq-done' : ''));
      eq.innerHTML = '<span class="tt-eqn">10</span><span class="tt-eqo">+</span><span class="tt-eqn tt-eqones">' + ones + '</span><span class="tt-eqo">=</span><span class="tt-eqn tt-eqtot">' + (10 + ones) + '</span>';
      return eq;
    },

    /* ----- build-ten (seal / audio): the left frame fills to 10 then SEALS ----- */
    _renderBuildTen: function (root) {
      var self = this, api = this.api;
      var main = api.el('div', 'tt-main');
      var fr = this._frame(this.cstate.tenInProgress, 10, 'ten', function () { self._tapTen(); }, function () { self._removeTenDot(); }, true);
      main.appendChild(fr);
      var side = api.el('div', 'tt-side');
      if (this.round.type === 'audio') { var hb = api.el('button', 'tt-peekbtn'); hb.type = 'button'; hb.textContent = api.t('hearAgain'); hb.addEventListener('click', function () { speak((LANG === 'es' ? 'Forma ' : LANG === 'de' ? 'Mach ' : LANG === 'fr' ? 'Fais ' : LANG === 'pt' ? 'Monte ' : LANG === 'it' ? 'Fai ' : 'Make ') + numWord(self.round.target)); }); side.appendChild(hb); }
      else { var lbl = api.el('div', 'tt-bignum'); lbl.textContent = api.t('makeOrder').replace('{n}', this.round.target); side.appendChild(lbl); }
      main.appendChild(side); root.appendChild(main);
    },
    _tapTen: function () {
      var res = Core.addToTen(this.round, this.cstate); if (!res.changed) return;
      this.api.sound && this.api.sound(540 + this.cstate.tenInProgress * 12); this.msg = null;
      if (res.sealed) { this.sessionSealed = true; this.api.sound && this.api.sound(880); this.announce(this.api.t('seal')); speak(LANG === 'es' ? 'Diez' : LANG === 'de' ? 'Zehn' : LANG === 'fr' ? 'Dix' : LANG === 'pt' ? 'Dez' : LANG === 'it' ? 'Dieci' : 'Ten'); this._afterTen(); }
      else this.render();
    },
    _removeTenDot: function () { /* during build, tapping a bubble removes the last (correctable) */ if (this.cstate.tenInProgress > 0 && !this.cstate.sealedTenPlaced) { this.cstate.tenInProgress--; this.api.sound && this.api.sound(360); this.render(); } },
    _afterTen: function () {
      if (this._onesTarget() === 0) { this._win(); return; }   // the on-ramp (target 10)
      this.stage = 'place-ones'; this.render();
    },

    /* ----- place-ten (#2 ready-made ten): pop a visible 2×5 ten in ----- */
    _renderPlaceTen: function (root) {
      var self = this, api = this.api;
      var main = api.el('div', 'tt-main');
      var slot = api.el('div', 'tt-tenslot'); slot.textContent = '';   // empty tank slot
      main.appendChild(slot);
      var side = api.el('div', 'tt-side');
      var src = this._tenChip(function () { self._placeReadyTen(); });
      src.classList.add('tt-tensource'); side.appendChild(src);
      var hint = api.el('div', 'tt-srclabel'); hint.textContent = api.t('srcLabelTen'); side.appendChild(hint);
      main.appendChild(side); root.appendChild(main);
    },
    _placeReadyTen: function () {
      var res = Core.placeReadyTen(this.round, this.cstate);
      if (res.rejected) { this.msg = this.api.t('rejectSealFirst'); this.render(); return; }
      this.sessionSealed = true; this.api.sound && this.api.sound(820); this.announce(this.api.t('seal'));
      this.stage = 'place-ones'; this.render();
    },

    /* ----- place-ones: the ten is a compact chip; the ones frame is active ----- */
    _renderPlaceOnes: function (root) {
      var self = this, api = this.api;
      var main = api.el('div', 'tt-main');
      var tank = api.el('div', 'tt-tank');
      tank.appendChild(this._tenChip(function () { self._sendTenBack(); }));
      tank.appendChild(this._frame(this.cstate.ones, 9, 'one', function () { self._tapOne(); }, function () { self._removeOne(); }, true));
      main.appendChild(tank);
      var side = api.el('div', 'tt-side');
      side.appendChild(this._equation());
      main.appendChild(side); root.appendChild(main);
    },
    _tapOne: function () {
      var res = Core.placeOne(this.round, this.cstate);
      if (res.rejected) { this.msg = this.api.t('refuseTenth'); this.api.sound && this.api.sound(330); this.render(); return; }
      this.msg = null; this.api.sound && this.api.sound(560 + this.cstate.ones * 10); speak(this.cstate.ones);
      if (Core.validate(this.round, this.cstate)) this._win(); else this.render();
    },
    _removeOne: function () { if (Core.removeOne(this.round, this.cstate).changed) { this.msg = null; this.api.sound && this.api.sound(360); this.render(); } },
    _sendTenBack: function () { /* correctable: tap the ten chip → remove it (back to build) */ if (Core.removeTen(this.round, this.cstate).changed) { this.stage = (this.round.type === 'ready-ten') ? 'place-ten' : 'build-ten'; this.render(); } },

    /* ----- regroup (#4): loose ones; the 10th SNAPS into a ten ----- */
    _renderRegroup: function (root) {
      var self = this, api = this.api;
      var main = api.el('div', 'tt-main');
      var fr = this._frame(this.cstate.looseOnes, 10, 'one', function () { self._tapLoose(); }, function () { self._removeLoose(); }, true);
      main.appendChild(fr);
      var side = api.el('div', 'tt-side');
      var note = api.el('div', 'tt-bignum tt-small'); note.textContent = api.t('makeOrder').replace('{n}', this.round.target); side.appendChild(note);
      main.appendChild(side); root.appendChild(main);
    },
    _tapLoose: function () {
      var res = Core.placeOne(this.round, this.cstate); if (!res.changed) return;
      this.api.sound && this.api.sound(540 + this.cstate.looseOnes * 12);
      if (res.snapped) { this.sessionSealed = true; this.api.sound && this.api.sound(880); this.announce(this.api.t('snapAnnounce')); speak(LANG === 'es' ? 'Diez' : LANG === 'de' ? 'Zehn' : LANG === 'fr' ? 'Dix' : LANG === 'pt' ? 'Dez' : LANG === 'it' ? 'Dieci' : 'Ten'); if (this._onesTarget() === 0) { this._win(); return; } this.stage = 'place-ones'; this.render(); return; }
      this.render();
    },
    _removeLoose: function () { if (this.cstate.looseOnes > 0) { this.cstate.looseOnes--; this.api.sound && this.api.sound(360); this.render(); } },

    /* ----- decompose (#3): a teen → ten-tray + ones-tray ----- */
    _renderDecompose: function (root) {
      var self = this, api = this.api, n = this._onesTarget();
      var main = api.el('div', 'tt-main tt-decomp');
      // SOURCE: the teen structure (the sealed ten chip + the ones not yet moved)
      var src = api.el('div', 'tt-dsource');
      if (!this.cstate.tenInTensTray) { src.appendChild(this._tenChip(function () { self._dragTen(); })); }
      var onesLeft = n - this.cstate.onesInOnesTray;
      var orow = api.el('div', 'tt-onesrow');
      for (var i = 0; i < onesLeft; i++) { var o = api.el('button', 'tt-one'); o.type = 'button'; o.innerHTML = bubbleSVG('one'); o.addEventListener('click', function () { self._dragOne(); }); orow.appendChild(o); }
      src.appendChild(orow); main.appendChild(src);
      // TRAYS
      var trays = api.el('div', 'tt-trays');
      var tens = api.el('div', 'tt-tray'); var tl = api.el('div', 'tt-traylabel'); tl.textContent = api.t('tensTray'); tens.appendChild(tl);
      if (this.cstate.tenInTensTray) tens.appendChild(this._tenChip(null));
      trays.appendChild(tens);
      var onesT = api.el('div', 'tt-tray'); var ol = api.el('div', 'tt-traylabel'); ol.textContent = api.t('onesTray'); onesT.appendChild(ol);
      var ow = api.el('div', 'tt-onesrow');
      for (var j = 0; j < this.cstate.onesInOnesTray; j++) { var b = api.el('span', 'tt-one'); b.innerHTML = bubbleSVG('one'); ow.appendChild(b); }
      onesT.appendChild(ow); trays.appendChild(onesT);
      main.appendChild(trays); root.appendChild(main);
    },
    _dragTen: function () { if (Core.dragTenToTens(this.round, this.cstate).changed) { this.api.sound && this.api.sound(820); if (Core.validate(this.round, this.cstate)) this._win(); else this.render(); } },
    _dragOne: function () { if (Core.dragOneToOnes(this.round, this.cstate).changed) { this.api.sound && this.api.sound(560); speak(this.cstate.onesInOnesTray); if (Core.validate(this.round, this.cstate)) this._win(); else this.render(); } },

    /* ----- repair (#5): a wrong structure + pick the missing-count ----- */
    _renderRepair: function (root) {
      var self = this, api = this.api, opts = Core.repairOptions(this.round);
      var main = api.el('div', 'tt-main');
      var struct = api.el('div', 'tt-tank');
      struct.appendChild(this._tenChip(null));
      var orow = api.el('div', 'tt-onesrow');   // compact preset ones (not a full 2×5)
      for (var i = 0; i < this.cstate.presetOnes; i++) { var o = api.el('span', 'tt-one'); o.innerHTML = bubbleSVG('one'); orow.appendChild(o); }
      struct.appendChild(orow);
      main.appendChild(struct);
      var side = api.el('div', 'tt-side');
      var optwrap = api.el('div', 'tt-opts');
      opts.forEach(function (k) {
        var b = api.el('button', 'tt-opt'); b.type = 'button'; b.textContent = api.t('moreMore').replace('{k}', k);
        b.addEventListener('click', function () { self._pickFix(k); }); optwrap.appendChild(b);
      });
      side.appendChild(optwrap);
      main.appendChild(side); root.appendChild(main);
    },
    _pickFix: function (k) {
      Core.commitFix(this.round, this.cstate, k);
      if (Core.validate(this.round, this.cstate)) this._win();
      else { this.msg = this.api.t('rejectFix'); this.cstate.fixCommitted = false; this.api.sound && this.api.sound(330); this.render(); }
    },

    /* ----- compare (#7): reveal BOTH structures, then judge by the ones ----- */
    _renderCompare: function (root) {
      var self = this, api = this.api, pair = this.round.comparePair;
      var main = api.el('div', 'tt-main tt-cmpmain');
      ['A', 'B'].forEach(function (which, idx) {
        var revealed = which === 'A' ? self.cstate.revealedA : self.cstate.revealedB;
        var col = api.el('div', 'tt-cmpcol');
        var card = api.el('button', 'tt-cmpcard' + (revealed ? ' tt-revealed' : '')); card.type = 'button';
        if (revealed) {
          card.appendChild(self._tenChip(null));
          var onesN = pair[idx] % 10, ow = api.el('div', 'tt-onesrow');
          for (var i = 0; i < onesN; i++) { var b = api.el('span', 'tt-one'); b.innerHTML = bubbleSVG('one'); ow.appendChild(b); }
          card.appendChild(ow);
        } else { card.innerHTML = '<span class="tt-cmpq">?</span>'; }
        card.addEventListener('click', function () { if (!revealed) { Core.reveal(self.cstate, which); self.api.sound && self.api.sound(640); self.render(); } });
        col.appendChild(card);
        var jb = api.el('button', 'tt-judge'); jb.type = 'button'; jb.textContent = api.t('judgeThis'); jb.disabled = !Core.canJudge(self.cstate);
        if (Core.canJudge(self.cstate)) jb.addEventListener('click', function () { self._judge(which); });
        col.appendChild(jb); main.appendChild(col);
      });
      root.appendChild(main);
    },
    _judge: function (which) {
      var res = Core.judge(this.round, this.cstate, which); if (res.rejected) return;
      if (Core.validate(this.round, this.cstate)) this._win();
      else { this.msg = this.api.t('rejectJudge'); this.cstate.picked = null; this.api.sound && this.api.sound(330); this.render(); }
    },

    _win: function () {
      this.solved = true; this.stage = 'done'; this.solvedCount = Math.min(this.solvedCount + 1, (this._pool && this._pool.length) || 8);
      this.api.sound && this.api.sound(920); this.render();
      var n = this.round.type === 'compare' ? this.round.comparePair[this.cstate.picked === 'A' ? 0 : 1] : this.round.target;
      this.announce(this.api.t('win'));
      if (this.round.mode === 'compose' && this.round.type !== 'compare' && this.round.target >= 11) speak((LANG === 'es' ? 'una decena y ' : LANG === 'de' ? 'ein Zehner und ' : LANG === 'fr' ? 'une dizaine et ' : LANG === 'pt' ? 'uma dezena e ' : LANG === 'it' ? 'una decina e ' : 'a ten and ') + this._onesTarget() + ' — ' + numWord(this.round.target));
      else speak(numWord(n) || n);
    },

    _renderDone: function (root) {
      var api = this.api, r = this.round;
      if (r.type !== 'compare' && r.target >= 11) { var eq = this._equation(); eq.classList.add('tt-eq-done', 'tt-eq-big'); root.appendChild(eq); }
      else { var big = api.el('div', 'tt-bignum'); big.textContent = (r.type === 'compare') ? api.t('isMore').replace('{n}', r.comparePair[this.cstate.picked === 'A' ? 0 : 1]) : r.target; root.appendChild(big); }
      var pond = api.el('div', 'tt-pond');
      for (var i = 0; i < ((this._pool && this._pool.length) || 8); i++) { var s = api.el('span', 'tt-lily' + (i < this.solvedCount ? ' tt-lily-on' : '')); s.textContent = '🪷'; pond.appendChild(s); }
      root.appendChild(pond);
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
      fetch('/mini-tools/ten-tank-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[ten-tank] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var cell = 'clamp(40px,10vw,48px)';
      var css = ''
        + '.tt-wrap{display:flex;justify-content:center;width:100%;max-width:min(96vw,560px);margin:0 auto;}'
        + '.tt-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);background:linear-gradient(180deg,#FBF3E4,#F2E8D2);border-radius:20px;padding:clamp(8px,1.9vw,13px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);}'
        + '.tt-head{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;width:100%;}'
        + '.tt-dewey{width:clamp(40px,9vw,50px);flex:0 0 auto;}.tt-dewey-svg{width:100%;height:auto;display:block;}'
        + '@keyframes ttShake{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}'
        + '.tt-say{background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:13px 13px 13px 3px;padding:5px 10px;font:700 clamp(12px,3vw,14px)/1.2 "Nunito",sans-serif;color:' + C.T + ';max-width:80%;}'
        + '.tt-main{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vw,16px);width:100%;}'
        + '.tt-side{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
        + '@media (min-width:768px){.tt-main{flex-direction:row;align-items:center;justify-content:center;gap:26px;}.tt-side{width:auto;flex:0 0 auto;}}'
        /* the ten-frame */
        + '.tt-frame{display:grid;grid-template-columns:repeat(5,' + cell + ');grid-template-rows:repeat(2,' + cell + ');gap:4px;background:#E7D9BD;padding:6px;border-radius:14px;box-shadow:inset 0 2px 6px rgba(120,90,40,.16);}'
        + '.tt-cell{width:' + cell + ';height:' + cell + ';border:2px solid rgba(20,107,94,.16);background:#FCF6EA;border-radius:10px;cursor:pointer;padding:3px;touch-action:manipulation;}'
        + '.tt-cell.tt-filled{border-color:rgba(20,107,94,.28);}.tt-cell .tt-bub-svg{width:100%;height:100%;display:block;}'
        + '.tt-cell.tt-ready{border-color:' + C.CORAL + ';border-style:dashed;animation:ttPulse 1.1s ease-in-out infinite;}'
        + '.tt-cell.tt-capcell{opacity:.5;}'
        + '@keyframes ttPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}'
        /* the sealed ten chip (compact, wielded as ONE) */
        + '.tt-tenchip{position:relative;display:inline-flex;align-items:center;justify-content:center;width:clamp(70px,18vw,90px);height:clamp(46px,12vw,58px);background:linear-gradient(180deg,#1B7E6E,#146B5E);border:0;border-radius:13px;cursor:pointer;padding:6px 8px;box-shadow:0 3px 0 #0e4f45;touch-action:manipulation;}'
        + '.tt-chipgrid{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(2,1fr);gap:2px;width:100%;height:100%;place-items:center;}'
        + '.tt-chipdot{width:clamp(8px,2.2vw,11px);height:clamp(8px,2.2vw,11px);background:#7FE0CD;border-radius:50%;}'
        + '.tt-chipbadge{position:absolute;top:-7px;right:-7px;background:' + C.GOLD + ';color:#3a2a00;font:800 12px "Baloo 2",sans-serif;border-radius:9px;padding:1px 6px;box-shadow:0 1px 2px rgba(0,0,0,.2);}'
        + '.tt-tensource{animation:ttPulse 1.2s ease-in-out infinite;}.tt-srclabel{font:700 clamp(11px,2.8vw,13px)/1.1 "Nunito",sans-serif;color:' + C.T + ';text-align:center;max-width:140px;}'
        + '.tt-tenslot{width:clamp(70px,18vw,90px);height:clamp(46px,12vw,58px);border:2px dashed rgba(20,107,94,.3);border-radius:13px;}'
        /* tank = ten chip + ones frame side by side */
        + '.tt-tank{display:flex;align-items:center;gap:clamp(6px,2vw,12px);justify-content:center;flex-wrap:wrap;}'
        /* the live equation */
        + '.tt-eq{display:inline-flex;align-items:center;gap:6px;background:#fff;border:2px solid rgba(20,107,94,.18);border-radius:14px;padding:6px 13px;}'
        + '.tt-eqn{font:800 clamp(22px,6vw,30px)/1 "Baloo 2",sans-serif;color:' + C.T + ';min-width:20px;text-align:center;}'
        + '.tt-eqo{font:800 clamp(18px,5vw,24px)/1 "Baloo 2",sans-serif;color:#9a8f78;}'
        + '.tt-eqones{color:' + C.CORAL + ';}.tt-eq-done{border-color:' + C.CORAL + ';box-shadow:0 0 0 3px rgba(242,120,75,.18);}.tt-eq-done .tt-eqtot{color:' + C.CORAL + ';}'
        + '.tt-eq-big .tt-eqn{font-size:clamp(26px,7vw,36px);}'
        + '.tt-bignum{font:800 clamp(22px,6vw,32px)/1 "Baloo 2",sans-serif;color:' + C.T + ';background:#fff;border:3px solid ' + C.T + ';border-radius:14px;padding:4px 16px;}.tt-bignum.tt-small{font-size:clamp(15px,4vw,18px);border-width:2px;}'
        + '.tt-peekbtn{min-height:44px;padding:0 16px;border-radius:12px;border:2px solid rgba(20,107,94,.25);background:#fff;color:' + C.T + ';font:700 clamp(13px,3.2vw,15px)/1 "Nunito",sans-serif;cursor:pointer;touch-action:manipulation;}'
        /* decompose */
        + '.tt-decomp{gap:clamp(8px,2vw,14px);}.tt-dsource{display:flex;flex-direction:column;align-items:center;gap:6px;background:#FFF6E4;border-radius:14px;padding:8px;}'
        + '.tt-onesrow{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;max-width:200px;}'
        + '.tt-one{width:clamp(26px,7vw,34px);height:clamp(26px,7vw,34px);border:0;background:transparent;padding:0;cursor:pointer;touch-action:manipulation;}.tt-one .tt-bub-svg{width:100%;height:100%;}'
        + '.tt-trays{display:flex;gap:8px;}.tt-tray{min-width:clamp(82px,22vw,110px);min-height:clamp(64px,16vw,82px);background:#EAF2EE;border:2px dashed rgba(20,107,94,.3);border-radius:14px;padding:6px;display:flex;flex-direction:column;align-items:center;gap:4px;}'
        + '.tt-traylabel{font:800 clamp(11px,2.8vw,13px)/1 "Baloo 2",sans-serif;color:' + C.T + ';text-transform:uppercase;letter-spacing:.04em;}'
        /* repair options */
        + '.tt-opts{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;}'
        + '.tt-opt{min-height:46px;min-width:96px;padding:0 14px;border-radius:13px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.6vw,17px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}.tt-opt:active{transform:translateY(2px);}'
        /* compare — two cards ALWAYS side-by-side (even on phone) so they never stack tall */
        + '.tt-cmpmain{flex-direction:row!important;gap:clamp(8px,3vw,18px);align-items:stretch;justify-content:center;}.tt-cmpcol{display:flex;flex-direction:column;align-items:center;gap:6px;}'
        + '.tt-cmpcard{flex:1 1 auto;min-width:clamp(96px,26vw,130px);min-height:clamp(84px,22vw,108px);background:#FFF6E4;border:2px solid rgba(20,107,94,.2);border-radius:16px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:8px;touch-action:manipulation;}'
        + '.tt-cmpq{font:800 clamp(34px,9vw,46px)/1 "Baloo 2",sans-serif;color:' + C.GOLD + ';}.tt-revealed{border-color:' + C.T + ';}'
        + '.tt-judge{min-height:44px;padding:0 16px;border-radius:12px;border:0;background:' + C.T + ';color:#fff;font:800 clamp(13px,3.4vw,16px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #0e4f45;touch-action:manipulation;}.tt-judge:disabled{opacity:.4;box-shadow:0 3px 0 rgba(20,107,94,.25);cursor:default;}'
        /* done */
        + '.tt-pond{display:flex;gap:3px;flex-wrap:wrap;justify-content:center;}'
        + '.tt-lily{font-size:clamp(14px,3.4vw,18px);filter:grayscale(1) opacity(.4);}.tt-lily-on{filter:none;}'
        + '.tt-cell:focus-visible,.tt-tenchip:focus-visible,.tt-opt:focus-visible,.tt-judge:focus-visible,.tt-cmpcard:focus-visible,.tt-one:focus-visible,.tt-peekbtn:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        /* short viewports */
        + '@media (max-height:760px),(max-width:480px){.tt-root{gap:5px;padding:8px;}.tt-dewey{width:clamp(36px,8vw,44px);}.tt-main{gap:9px;}.tt-trays{gap:6px;}.tt-tray{min-height:62px;}}'
        + '@media (max-height:640px){.tt-root{gap:4px;}.tt-main{gap:7px;}.tt-eqn{font-size:22px;}.tt-tray{min-width:76px;min-height:58px;}.tt-cmpcard{min-height:78px;}}'
        + '@media (prefers-reduced-motion: reduce){.tt-cell.tt-ready,.tt-tensource,.tt-dewey-svg{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-tentank', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'ten-tank.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
