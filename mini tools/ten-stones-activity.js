/* =====================================================================
   LILY'S TEN STONES — ACTIVITY  (ten-stones-activity.js)
   ---------------------------------------------------------------------
   CCSS 1.OA.C.6 — Lily the frog crosses a 0–20 number line by the MAKE-TEN
   strategy. The child DECLARES the to-ten bond ("8 + ⬚ = 10") on a spinner —
   the declared part DRIVES the hop to the golden Ten Stone — then the remainder.
   The answer numeral is hidden until Lily LANDS. No per-hop signal. All grading
   from ten-stones-core.js. 0 lines to any existing core (incl. E18 number-bond)
   + lcs-shell.{js,css} + track-repair-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.TenStonesCore;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { T: '#146B5E', T2: '#0E5247', CREAM: '#FBF3E4', CORAL: '#F2784B', CORAL2: '#D9572F', INK: '#2A2A35', GOOD: '#2FA56A', GOLD: '#E8A53A', GOLD2: '#C9881F', WATER: '#BfE0E0' };
  var MARGIN = 12, LINE_W = 186;   /* the 0..20 line spans [MARGIN, MARGIN+LINE_W] in viewBox units */

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  /* German number-words for the aria-labels (note the non-native traps: 16=sechzehn, 17=siebzehn, 1=eins not ein). */
  var WORDS_DE = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn', 'zwanzig'];
  var WORDS_FR = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt'];
  /* es-MX — número-palabras 0-20 (dieciséis con tilde; diecisiete/dieciocho/diecinueve sin tilde). */
  var WORDS_ES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'];
  /* pt-BR — número-palavras 0-20 (BR: dezesseis/dezessete/dezenove com -e-, NÃO dezasseis; quatorze). */
  var WORDS_PT = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte'];
  /* it — numeri 0-20 (standard: sedici, diciassette, diciotto, diciannove; nessun accento entro il 20). */
  var WORDS_IT = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove', 'venti'];
  /* nl — getalwoorden 0-20 voor de aria-labels/TTS (1='één' met accenten forceert de telwoordlezing i.p.v. lidwoord "een"; let op veertien/zestien/achttien). */
  var WORDS_NL = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien', 'twintig'];
  var LANG = 'en';
  function numWord(n) { return (LANG === 'de' ? WORDS_DE : LANG === 'fr' ? WORDS_FR : LANG === 'es' ? WORDS_ES : LANG === 'pt' ? WORDS_PT : LANG === 'it' ? WORDS_IT : LANG === 'nl' ? WORDS_NL : WORDS)[n]; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function speak(text, rate) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: rate || 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = rate || 0.95; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffle(arr) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function svg(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }
  function lineX(v) { return MARGIN + (v / Core.LINE_MAX) * LINE_W; }

  global.TenStonesActivity = {
    id: 'ten-stones-activity',

    strings: {
      /* es-MX — native ensemble (lingüista + pedagoga de 2º, planes y programas SEP).
         "la piedra dorada del diez" (NO "nenúfar", libresco para niños); verbo "brincar"
         (la rana brinca); "formar el diez". Lily = FEMENINO ("la rana"). Tono cálido, sin
         marcador; "Vamos a mirar otra vez", nunca "mal". */
      /* it — native ensemble (linguista + pedagoga di 2ª). Metafora = «il sasso (dorato) del dieci»
         (sasso, NON ninfea: la rana ci si appoggia e riparte); «gli amici del 10»; «fare tappa sul
         dieci» / «il passaggio della decina». ⚠ MAI «saltare il dieci» (= saltarlo/ometterlo):
         verbo «saltare» sempre con destinazione («fino al sasso del dieci»). Lily = FEMMINILE. */
      /* nl — native ensemble (linguïst + pedagoog groep 3). Strategie-termen (nooit door
         elkaar): wisselsom (anchor) ≠ omkeersom (relation); bijna-dubbel (equiv); "het tiental
         vol maken"; "vriendjes van tien"; de (gouden) tiensteen. Kikker = Ties (hernoemd van
         "Lily" = lelie/waterlelie, botst met #3 Hoppers). Kikkersprong = "hup". */
      title: { en: "Lily's Ten Stones", de: 'Lilys Zehner-Steine', fr: 'Les nénuphars de Lily', es: 'Las piedras del diez de Lily', pt: 'As pedras do dez da Lily', it: 'I sassi del dieci di Lily', nl: "Ties' tienstenen" },
      instruction: { en: '', de: '', pt: '', it: '', nl: '' },
      prompt: { en: 'Help Lily cross.', de: 'Hilf Lily hinüber!', fr: 'Aide Lily à traverser.', es: 'Ayuda a Lily a cruzar.', pt: 'Ajude a Lily a atravessar.', it: 'Aiuta Lily ad attraversare.', nl: 'Help Ties oversteken.' },
      hop: { en: 'Hop! 🐸', de: 'Hüpf! 🐸', fr: 'Saute ! 🐸', es: '¡Brinca! 🐸', pt: 'Pula! 🐸', it: 'Salta! 🐸', nl: 'Hup! 🐸' },
      yes: { en: 'Yes — rest on the stone', de: 'Ja – auf dem Stein rasten', fr: 'Oui — se poser sur le nénuphar', es: 'Sí, descansa en la piedra', pt: 'Sim — descanse na pedra', it: 'Sì — riposa sul sasso', nl: 'Ja – rust op de steen' }, no: { en: 'No — hop straight there', de: 'Nein – direkt hinüber', fr: 'Non — sauter tout droit', es: 'No, brinca directo', pt: 'Não — pule direto', it: 'No — salta dritto fin lì', nl: 'Nee – hup er meteen heen' },
      stand: { en: 'Stand on', de: 'Stell dich auf', fr: 'Place-toi sur', es: 'Párate en el', pt: 'Fique no', it: 'Mettiti sul', nl: 'Ga op' },
      sayWelcome: { en: 'Help me cross the pond — make a ten on the golden stone!', de: 'Hilf mir über den Teich – mach auf dem goldenen Stein den Zehner voll!', fr: 'Aide-moi à traverser la mare — passe par le nénuphar du dix !', es: '¡Ayúdame a cruzar el estanque: forma un diez en la piedra dorada!', pt: 'Me ajuda a atravessar a lagoa — faça um dez na pedra dourada!', it: 'Aiutami ad attraversare lo stagno — fai un dieci sul sasso dorato!', nl: 'Help me de vijver over – maak het tiental vol op de gouden steen!' },
      sayWin: { en: 'We made it across! 🌸', de: 'Wir sind drüben! 🌸', fr: 'On est de l\'autre côté ! 🌸', es: '¡Llegamos al otro lado! 🌸', pt: 'Conseguimos atravessar! 🌸', it: 'Ce l\'abbiamo fatta ad attraversare! 🌸', nl: 'We zijn aan de overkant! 🌸' },
      sayOnStone: { en: 'On the Ten Stone! Now hop the rest.', de: 'Auf dem Zehner-Stein! Jetzt hüpf den Rest.', fr: 'Sur le nénuphar du dix ! Maintenant, saute le reste.', es: '¡En la piedra del diez! Ahora brinca lo que falta.', pt: 'Na pedra do dez! Agora pule o resto.', it: 'Sul sasso del dieci! Ora salta il resto.', nl: 'Op de tiensteen! Hup nu de rest.' },
      sayWrongTen: { en: 'That misses the golden stone — how many to make ten?', de: 'Das verfehlt den goldenen Stein – wie viele bis zum Zehner?', fr: 'Ça rate le nénuphar doré — combien pour arriver à 10 ?', es: 'Así te saltas la piedra dorada. ¿Cuánto falta para formar diez?', pt: 'Assim não chega na pedra dourada — quantos faltam para o dez?', it: 'Così non arrivi al sasso dorato — quanti ne mancano per fare dieci?', nl: 'Zo mis je de gouden steen – hoeveel erbij om het tiental vol te maken?' },
      sayWrongRest: { en: 'Not quite the rest — how many more to land?', de: 'Noch nicht ganz der Rest – wie viele noch bis ans Ziel?', fr: 'Pas tout à fait le reste — combien encore pour arriver ?', es: 'Todavía no es lo que falta. ¿Cuántos más para llegar?', pt: 'Ainda falta um pouco — quantos faltam para chegar?', it: 'Non è ancora il resto giusto — quanti ne mancano per arrivare?', nl: 'Net niet de rest – hoeveel erbij om te landen?' },
      sayAgain: { en: "Let's look again.", de: 'Schauen wir noch mal.', fr: 'Regardons encore.', es: 'Vamos a mirar otra vez.', pt: 'Vamos olhar de novo.', it: 'Guardiamo di nuovo.', nl: 'We kijken nog eens.' },
      sayRelation: { en: 'The same stones, backward! 🌸', de: 'Die gleichen Steine, rückwärts! 🌸', fr: 'Les mêmes nénuphars, à l\'envers ! 🌸', es: '¡Las mismas piedras, al revés! 🌸', pt: 'As mesmas pedras, ao contrário! 🌸', it: 'Gli stessi sassi, all\'indietro! 🌸', nl: 'Dezelfde stenen, terug! 🌸' },
      relYes: { en: 'Yes — same stones! 🌸', de: 'Ja – die gleichen Steine! 🌸', fr: 'Oui — les mêmes nénuphars ! 🌸', es: '¡Sí, las mismas piedras! 🌸', pt: 'Sim — as mesmas pedras! 🌸', it: 'Sì — gli stessi sassi! 🌸', nl: 'Ja – dezelfde stenen! 🌸' },
      hintCheck: { en: 'Make a ten on the golden stone first, then hop the rest.', de: 'Mach erst auf dem goldenen Stein den Zehner voll, dann hüpf den Rest.', fr: 'Passe d\'abord par le nénuphar doré du dix, puis saute le reste.', es: 'Primero forma un diez en la piedra dorada y luego brinca lo que falta.', pt: 'Primeiro faça um dez na pedra dourada, depois pule o resto.', it: 'Prima fai un dieci sul sasso dorato, poi salta il resto.', nl: 'Maak eerst het tiental vol op de gouden steen, hup dan de rest.' },
      sayWinSpoken: { en: 'We made it!', de: 'Geschafft!', fr: 'On a réussi !', es: '¡Lo logramos!', pt: 'Conseguimos!', it: 'Ce l\'abbiamo fatta!', nl: 'Gelukt!' }
    },
    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks([]); this._order = null; this._orderForPool = null; this._curPass = 0;
      this.round = null; this.snap = null; this.solved = false;
      this.declared = []; this.pos = 0; this.phase = 'toten'; this.spin = 0; this.msg = null; this.crossed = 0; this._arcs = [];
      this._opts = null;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) this._loadActivity();
    },

    setupTask: function (round) {
      this.round = round; this.snap = Core.snapshot(round);
      this.solved = false; this.msg = null; this._spoke = false;
      this.declared = []; this.pos = round.start != null ? round.start : 0; this.phase = 'toten'; this._arcs = [];
      var bp = Core.BRIDGE_COGS[round.cog] ? Core.bridgeParts(round) : null;
      this.spin = bp ? Math.max(0, Math.min(9, 1)) : 0;     /* spinner starts at 1 for bridge */
      this._opts = this.snap.options ? shuffle(this.snap.options.slice()) : null;
    },

    /* ---------- render ---------- */
    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var root = api.el('div', 'ts-root'); root.setAttribute('data-solved', this.solved ? '1' : '0'); this._rootEl = root;
      if (!this.round) { stage.appendChild(root); return; }
      var self = this, r = this.round, s = this.snap;

      var say = api.el('div', 'ts-saytop');
      say.innerHTML = '<span class="ts-lily' + (this.solved ? ' ts-bounce' : '') + '">🐸</span><span class="ts-saytext">' + esc(this.msg || api.t('sayWelcome')) + '</span>';
      root.appendChild(say);

      this._renderPond(root);

      var pr = (r.promptL10n && r.promptL10n[LANG]) || r.prompt || api.t('prompt');
      var head = api.el('div', 'ts-head');
      head.appendChild(this._eqChip());
      var p = api.el('p', 'ts-prompt'); p.textContent = pr; head.appendChild(p);
      root.appendChild(head);

      if (this.solved) { this._renderDone(root); stage.appendChild(root); return; }

      this._renderLine(root);

      if (s.isChoose) this._renderChoose(root);
      else if (s.isNonscored) this._renderRelation(root);
      else this._renderBridge(root);

      stage.appendChild(root);
      if (!this._spoke) { this._spoke = true; setTimeout(function () { speak(pr || ''); }, 280); }
    },

    _renderPond: function (root) {
      var api = this.api, total = (this._pool && this._pool.length) || 11;
      var b = api.el('div', 'ts-pond'); b.setAttribute('aria-hidden', 'true');
      var fill = Math.min(1, this.crossed / total);
      b.style.background = 'linear-gradient(90deg, #BfE0C8 ' + Math.round(fill * 100) + '%, #DCEBE6 ' + Math.round(fill * 100) + '%)';
      var k = api.el('span', 'ts-dragon'); k.textContent = fill >= 1 ? '🌸🌸' : '🪷'; b.appendChild(k);
      root.appendChild(b);
    },

    /* the equation chip: "8 + 6 = ?" (answer hidden until Lily lands). */
    _eqChip: function () {
      var api = this.api, r = this.round, chip = api.el('span', 'ts-eq');
      var ans = this.solved ? r.target : '?';
      var eqWord = LANG === 'fr' ? ' égale ' : LANG === 'de' ? ' ist ' : LANG === 'es' ? ' es ' : LANG === 'pt' ? ' é igual a ' : LANG === 'it' ? ' fa ' : LANG === 'nl' ? ' is ' : ' equals ';
      chip.setAttribute('aria-label', numWord(r.a) + ' ' + (r.op === '-' ? (LANG === 'it' ? 'meno' : LANG === 'nl' ? 'min' : 'minus') : (LANG === 'it' ? 'più' : 'plus')) + ' ' + numWord(r.b) + (this.solved ? (eqWord + numWord(r.target)) : ''));
      chip.innerHTML = '<b>' + r.a + '</b> ' + (r.op === '-' ? '−' : '+') + ' <b>' + r.b + '</b> = <b class="ts-ans">' + ans + '</b>';
      return chip;
    },

    /* ----- the 0..20 number line SVG ----- */
    _renderLine: function (root) {
      var self = this, api = this.api, r = this.round;
      var wrap = api.el('div', 'ts-linewrap');
      var VW = MARGIN * 2 + LINE_W, VH = 42;
      var sv = svg('svg', { viewBox: '0 0 ' + VW + ' ' + VH, class: 'ts-svg', 'aria-label': 'a number line from 0 to 20' });
      sv.style.aspectRatio = (VW / VH).toFixed(2);
      /* the line */
      sv.appendChild(svg('line', { x1: lineX(0), y1: 28, x2: lineX(20), y2: 28, stroke: 'rgba(20,107,94,.5)', 'stroke-width': 1 }));
      /* ticks + labels at 0,5,10,15,20 + the golden Ten Stone */
      [0, 5, 10, 15, 20].forEach(function (v) {
        var gold = v === 10;
        sv.appendChild(svg('line', { x1: lineX(v), y1: 25, x2: lineX(v), y2: 31, stroke: gold ? C.GOLD2 : 'rgba(20,107,94,.5)', 'stroke-width': gold ? 1.2 : 0.8 }));
        if (gold) sv.appendChild(svg('circle', { cx: lineX(10), cy: 28, r: 4.4, fill: C.GOLD, stroke: C.GOLD2, 'stroke-width': 1 }));
        var t = svg('text', { x: lineX(v), y: 39, 'text-anchor': 'middle', 'font-size': 5, 'font-weight': 800, fill: gold ? C.GOLD2 : 'rgba(42,42,53,.7)' }); t.textContent = v; sv.appendChild(t);
      });
      /* committed hop arcs */
      this._arcs.forEach(function (h) {
        var x0 = lineX(h.from), x1 = lineX(h.to), mid = (x0 + x1) / 2, rad = Math.abs(x1 - x0) / 2;
        sv.appendChild(svg('path', { d: 'M' + x0 + ',28 A' + rad + ',' + Math.min(rad, 13) + ' 0 0 ' + (x1 > x0 ? 1 : 1) + ' ' + x1 + ',28', fill: 'none', stroke: C.CORAL, 'stroke-width': 1.4, 'stroke-linecap': 'round' }));
        var lt = svg('text', { x: mid, y: 28 - Math.min(rad, 13) - 1.5, 'text-anchor': 'middle', 'font-size': 4.6, 'font-weight': 800, fill: C.CORAL2 }); lt.textContent = (h.to > h.from ? '+' : '−') + Math.abs(h.to - h.from); sv.appendChild(lt);
      });
      /* Lily at her current position */
      var lt2 = svg('text', { x: lineX(this.pos), y: 20, 'text-anchor': 'middle', 'font-size': 9 }); lt2.textContent = '🐸'; sv.appendChild(lt2);
      wrap.appendChild(sv); root.appendChild(wrap);
    },

    /* ----- BRIDGE: the bond frame + spinner + HOP ----- */
    _renderBridge: function (root) {
      var self = this, api = this.api, r = this.round;
      var fromN = this.phase === 'toten' ? r.start : 10;
      var rhs = this.phase === 'toten' ? '10' : '?';
      var bond = api.el('div', 'ts-bond');
      var lead = api.el('span', 'ts-bondtxt'); lead.textContent = fromN + ' ' + (r.op === '-' ? '−' : '+'); bond.appendChild(lead);
      /* the spinner [−] (n) [+] */
      var spin = api.el('div', 'ts-spin');
      var minus = api.el('button', 'ts-spinbtn'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', 'less'); minus.addEventListener('click', function () { self._setSpin(self.spin - 1); }); spin.appendChild(minus);
      var box = api.el('span', 'ts-spinval'); box.setAttribute('aria-live', 'polite'); box.textContent = this.spin; spin.appendChild(box);
      var plus = api.el('button', 'ts-spinbtn'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', 'more'); plus.addEventListener('click', function () { self._setSpin(self.spin + 1); }); spin.appendChild(plus);
      bond.appendChild(spin);
      var tail = api.el('span', 'ts-bondtxt'); tail.textContent = '= ' + rhs; bond.appendChild(tail);
      root.appendChild(bond);

      var hop = api.el('button', 'ts-hop'); hop.type = 'button'; hop.textContent = api.t('hop');
      hop.addEventListener('click', function () { self._hop(); });
      root.appendChild(hop);
    },

    /* ----- CHOOSE: anchor / findten / equiv ----- */
    _renderChoose: function (root) {
      var self = this, api = this.api, r = this.round;
      var opts = api.el('div', 'ts-options');
      (this._opts || []).forEach(function (o) {
        var b = api.el('button', 'ts-opt'); b.type = 'button';
        if (r.cog === 'findten') { b.textContent = o === 'yes' ? api.t('yes') : api.t('no'); b.className = 'ts-opt ts-optword'; }
        else if (r.cog === 'equiv') { b.innerHTML = '<b>' + o + ' + ' + o + '</b>'; }
        else { b.innerHTML = '<b>' + o + '</b>'; b.setAttribute('aria-label', api.t('stand') + (LANG === 'de' ? ' die ' + cap(numWord(o)) : LANG === 'nl' ? ' de ' + numWord(o) : ' ' + numWord(o))); }   /* anchor */
        b.addEventListener('click', function () { self._choose(o); });
        opts.appendChild(b);
      });
      root.appendChild(opts);
    },

    /* ----- relation (non-scored): the fact family + affirm ----- */
    _renderRelation: function (root) {
      var self = this, api = this.api, r = this.round;
      var fam = api.el('div', 'ts-fam');
      fam.innerHTML = '<span class="ts-famline">' + r.a + ' + ' + r.b + ' = ' + r.target + '</span><span class="ts-famline">' + r.target + ' − ' + r.b + ' = ' + r.a + '</span>';
      root.appendChild(fam);
      var aff = api.el('button', 'ts-hop'); aff.type = 'button'; aff.textContent = api.t('relYes');
      aff.addEventListener('click', function () { self._affirm(); });
      root.appendChild(aff);
    },

    _renderDone: function (root) {
      var api = this.api;
      this._renderLine(root);   /* the finished crossing, arcs + Lily on target */
      var d = api.el('div', 'ts-done');
      d.innerHTML = '<span class="ts-flare">🌸</span><span class="ts-donetext">' + esc(this.msg || api.t('sayWin')) + '</span>';
      root.appendChild(d);
    },

    /* ---------- interaction ---------- */
    _setSpin: function (v) { this.spin = Math.max(0, Math.min(9, v)); this.api.sound && this.api.sound(500 + this.spin * 12); this.msg = null; this.render(); },

    _hop: function () {
      var api = this.api, r = this.round;
      this.declared.push(this.spin);
      var ev = Core.evaluate(r, this.declared, true);
      if (ev.status === 'correct') {
        this._arcs.push({ from: this.pos, to: r.target }); this.pos = r.target;
        this._correct(); return;
      }
      if (ev.status === 'awaiting-remainder') {
        this._arcs.push({ from: this.pos, to: 10 }); this.pos = 10; this.phase = 'remainder'; this.spin = 1;
        this.msg = api.t('sayOnStone'); api.sound && api.sound(740);
        api.announce && api.announce(api.t('sayOnStone')); this.render(); return;
      }
      /* wrong — roll the declared hop back; warm, no move, no red */
      this.declared.pop();
      this.msg = api.t(ev.status === 'wrong-remainder' ? 'sayWrongRest' : 'sayWrongTen');
      api.sound && api.sound(360); this.render();
      api.announce && api.announce(this.msg);
    },

    _choose: function (choice) {
      var api = this.api;
      if (Core.gradeChoose(this.round, choice)) { this._correct(); return; }
      this.msg = api.t('sayAgain'); this._opts = this.snap.options ? shuffle(this.snap.options.slice()) : this._opts;
      api.sound && api.sound(360); this.render(); api.announce && api.announce(this.msg);
    },

    _affirm: function () {
      this.msg = this.api.t('sayRelation');
      this.solved = true; this.crossed = Math.min(this.crossed + 1, (this._pool && this._pool.length) || 11);
      this.api.sound && this.api.sound(820); this.render(); this.api.announce && this.api.announce(this.msg);
    },

    _correct: function () {
      var api = this.api;
      this.solved = true; this.crossed = Math.min(this.crossed + 1, (this._pool && this._pool.length) || 11);
      this.msg = api.t('sayWin');
      api.sound && api.sound(880);
      var winWord = api.t('sayWinSpoken');
      setTimeout(function () { speak(winWord); }, 160);
      this.render(); api.announce && api.announce(this.msg);
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
      fetch('/mini-tools/ten-stones-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) {
          var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return;
          self._activityRow = row;
          self._pool = makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); }));
          self._order = null;
          if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask();
        })
        .catch(function (e) { if (global.console && console.warn) console.warn('[ten-stones] manifest load failed:', e.message); });
    },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.ts-root{position:relative;width:100%;max-width:min(96vw,680px);margin:0 auto;display:flex;flex-direction:column;gap:clamp(4px,1vw,8px);background:linear-gradient(180deg,#FBF3E4,#E6F1EC);border-radius:16px;padding:clamp(6px,1.4vw,11px);box-shadow:inset 0 2px 0 rgba(255,255,255,.5),0 5px 0 rgba(20,107,94,.07);box-sizing:border-box;}'
        + '.ts-saytop{display:flex;align-items:center;gap:7px;justify-content:center;font:700 clamp(11px,2.7vw,13px)/1.2 "Baloo 2",sans-serif;color:' + C.T + ';min-width:0;}'
        + '.ts-saytext{min-width:0;overflow-wrap:break-word;}.ts-lily{font-size:clamp(18px,4.4vw,24px);flex:0 0 auto;}.ts-bounce{animation:tsBounce .5s ease;}'
        + '@keyframes tsBounce{0%{transform:translateY(0)}40%{transform:translateY(-7px)}100%{transform:none}}'
        + '.ts-pond{position:relative;height:11px;border-radius:6px;overflow:hidden;}.ts-dragon{position:absolute;right:5px;top:-3px;font-size:13px;}'
        + '.ts-head{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;min-width:0;}'
        + '.ts-eq{flex:0 0 auto;font:800 clamp(15px,3.8vw,19px)/1 "Baloo 2",sans-serif;color:' + C.T + ';white-space:nowrap;}.ts-eq b{color:' + C.INK + ';}.ts-eq .ts-ans{color:' + C.CORAL2 + ';}'
        + '.ts-prompt{margin:0;text-align:center;font:700 clamp(11.5px,2.9vw,14px)/1.2 "Nunito",sans-serif;color:' + C.INK + ';min-width:0;overflow-wrap:break-word;flex:1 1 auto;}'
        /* number line */
        + '.ts-linewrap{display:flex;justify-content:center;background:rgba(20,107,94,.05);border-radius:12px;padding:clamp(4px,1.2vw,8px);}'
        + '.ts-svg{width:100%;max-width:100%;max-height:clamp(74px,15vh,104px);height:auto;display:block;}'
        /* bond frame + spinner */
        + '.ts-bond{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font:800 clamp(16px,4vw,21px)/1 "Baloo 2",sans-serif;color:' + C.T + ';}'
        + '.ts-bondtxt{flex:0 0 auto;}'
        + '.ts-spin{display:inline-flex;align-items:center;gap:6px;}'
        + '.ts-spinbtn{min-width:46px;min-height:46px;border:2px solid rgba(20,107,94,.4);border-radius:12px;background:#fff;color:' + C.T + ';font:800 22px/1 "Baloo 2",sans-serif;cursor:pointer;touch-action:manipulation;box-shadow:0 2px 0 rgba(20,107,94,.14);}'
        + '.ts-spinbtn:active{transform:translateY(1px);}.ts-spinbtn:focus-visible,.ts-hop:focus-visible,.ts-opt:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.ts-spinval{min-width:34px;text-align:center;font:800 clamp(20px,5vw,26px)/1 "Baloo 2",sans-serif;color:' + C.CORAL2 + ';background:#FFF6EE;border-radius:9px;padding:2px 6px;}'
        /* hop / affirm */
        + '.ts-hop{align-self:center;min-height:48px;padding:0 clamp(20px,5.5vw,30px);border-radius:24px;border:0;background:' + C.CORAL + ';color:#fff;font:800 clamp(14px,3.8vw,18px)/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 ' + C.CORAL2 + ';touch-action:manipulation;}'
        + '.ts-hop:active{transform:translateY(2px);}'
        /* options */
        + '.ts-options{display:flex;gap:clamp(6px,1.8vw,12px);justify-content:center;flex-wrap:wrap;}'
        + '.ts-opt{min-width:56px;min-height:50px;border:2px solid rgba(20,107,94,.4);border-radius:13px;background:#fff;padding:4px 16px;cursor:pointer;touch-action:manipulation;color:' + C.T + ';font:800 clamp(17px,4.4vw,22px)/1 "Baloo 2",sans-serif;box-shadow:0 2px 0 rgba(20,107,94,.14);}'
        + '.ts-optword{font-size:clamp(12px,3vw,15px);}.ts-opt:active{transform:translateY(1px);}'
        /* relation */
        + '.ts-fam{display:flex;flex-direction:column;align-items:center;gap:3px;font:800 clamp(15px,3.8vw,19px)/1.25 "Baloo 2",sans-serif;color:' + C.T + ';}'
        /* done */
        + '.ts-done{display:flex;flex-direction:column;align-items:center;gap:4px;padding:4px;}.ts-flare{font-size:clamp(26px,7vw,38px);animation:tsFlare .6s ease;}.ts-donetext{font:800 clamp(13px,3.2vw,16px)/1.2 "Baloo 2",sans-serif;color:' + C.GOOD + ';text-align:center;}'
        + '@keyframes tsFlare{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:none}}'
        /* desktop: hold the line SHORT (a taller SVG pushes the shell Check past the fold) */
        + '@media (min-width:760px){.ts-root{padding:11px 14px;}.ts-svg{max-height:clamp(72px,12vh,98px);}}'
        + '@media (max-width:480px){.ts-root{gap:4px;padding:8px;}}'
        + '@media (max-width:380px){.ts-root{gap:3px;padding:6px;}.ts-prompt{font-size:11px;line-height:1.15;}.ts-svg{max-height:clamp(66px,16vh,92px);}.ts-pond{height:8px;}.ts-bond{gap:6px;font-size:15px;}.ts-saytop{font-size:10.5px;}.ts-hop{min-height:44px;}.ts-spinbtn{min-width:44px;min-height:44px;}}'
        + '@media (prefers-reduced-motion: reduce){.ts-bounce,.ts-flare{animation:none!important;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-ten-stones', ''); tag.textContent = css; document.head.appendChild(tag);
    }
  };

  function makeTasks(rounds) {
    return (rounds || []).map(function (round) {
      return {
        id: 'ten-stones.' + round.id, band: round.band || 1, promptKey: 'prompt', promptArgs: {}, answerType: 'state',
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
