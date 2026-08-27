/* =====================================================================
   COMPARISON CREEK — ACTIVITY  (comparison-creek-activity.js)
   ---------------------------------------------------------------------
   CCSS K.CC.C.7 — compare two written numerals 1–10. A creek forks into
   two channels carrying number BUOYS; Captain Quill asks the child to
   steer to the bigger / smaller number (also: more-dots, bigger-sum,
   equal, read-value-not-size, name-the-relation, between). Tapping a
   channel COMMITS (a wind-vane reads back the chosen number — you can't
   preview both by ear). A wrong steer = a soft no-penalty bonk + the
   buoys SWAP sides (position-flip) so the child must RE-READ.

   COGNITION reused from mini tools/river-steer-core.js (window.RiverSteerCore:
   deriveCorrect / isCorrect — DERIVED, never stored). Full lcs-shell tool.
   answerType:'state'. No timer/score/streak — the journey is the reward.
   Captain Quill = SVG PLACEHOLDER via _setPose. Words ALWAYS DOM. 0 lines
   to the protected cores + lcs-shell.{js,css}.
   ===================================================================== */
(function (global) {
  'use strict';

  var Core = global.RiverSteerCore;

  var C = {
    T: '#146B5E', T2: '#1B7E6E', CORAL: '#F2784B', CORAL2: '#D9572F',
    CREAM: '#FBF3E4', INK: '#2A2A35', RIM: '#FFFFFF', GOOD: '#2FA56A',
    WATER: '#8FCFE0', WATER2: '#5FB3CC', BANK: '#9CCB8E', WOOD: '#C7956A', DUCK: '#F6C743'
  };

  var LANG = 'en';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function interp(t, args) { return String(t || '').replace(/\{(\w+)\}/g, function (m, k) { return (k in args) ? args[k] : m; }); }
  function speak(text) {
    try {
      if (global.LCSAudio && global.LCSAudio.speak) { global.LCSAudio.speak({ type: 'word', text: text, lang: LANG, rate: 0.95 }); return; }
      if (global.speechSynthesis && global.SpeechSynthesisUtterance) { var u = new global.SpeechSynthesisUtterance(text); u.rate = .95; u.lang = LANG === 'de' ? 'de-DE' : LANG === 'fr' ? 'fr-FR' : LANG === 'es' ? 'es-MX' : LANG === 'pt' ? 'pt-BR' : LANG === 'it' ? 'it-IT' : LANG === 'nl' ? 'nl-NL' : 'en-US'; global.speechSynthesis.cancel(); global.speechSynthesis.speak(u); }
    } catch (e) {}
  }
  function shuffledOrder(n, prev) {
    var idx = [], i, j, t; for (i = 0; i < n; i++) idx.push(i); if (n < 2) return idx;
    function same(a, b) { if (!b) return false; for (var k = 0; k < a.length; k++) if (a[k] !== b[k]) return false; return true; }
    do { for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = idx[i]; idx[i] = idx[j]; idx[j] = t; } } while (same(idx, prev));
    return idx;
  }

  /* Captain Quill — duckling in a captain's cap (SVG PLACEHOLDER). */
  function quillSVG(api) {
    return '<svg class="cc-quill-svg" viewBox="0 0 100 100" role="img" aria-label="' + esc(api && api.t ? api.t('quillName') : 'Captain Quill') + '">' +
      '<ellipse cx="50" cy="90" rx="26" ry="6" fill="rgba(0,0,0,.08)"/>' +
      '<ellipse cx="50" cy="62" rx="26" ry="24" fill="' + C.DUCK + '"/>' +   /* body */
      '<circle cx="50" cy="36" r="19" fill="' + C.DUCK + '"/>' +              /* head */
      '<path d="M30 34 Q14 36 22 44 Q31 44 34 38 Z" fill="' + C.CORAL + '"/>' + /* beak */
      '<path d="M30 22 L70 22 L70 28 Q50 24 30 28 Z" fill="' + C.T + '"/><rect x="44" y="14" width="12" height="9" rx="2" fill="' + C.T + '"/><circle cx="50" cy="14" r="3" fill="' + C.CORAL + '"/>' + /* cap */
      '<g class="cc-q-eyes-open"><circle cx="44" cy="34" r="3" fill="' + C.INK + '"/><circle cx="56" cy="34" r="3" fill="' + C.INK + '"/><circle cx="45" cy="33" r="1" fill="#fff"/><circle cx="57" cy="33" r="1" fill="#fff"/></g>' +
      '<g class="cc-q-eyes-happy"><path d="M40 34 Q44 30 48 34" stroke="' + C.INK + '" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M52 34 Q56 30 60 34" stroke="' + C.INK + '" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>' +
      '<ellipse cx="50" cy="78" rx="10" ry="5" fill="' + C.CORAL + '" opacity=".5"/>' +
      '</svg>';
  }

  /* the filled water Y: a trunk current at the bottom that forks into two
     diverging arms reaching up to the two buoy mouths (banks = grass around). */
  function bedSVG() {
    var d = 'M50 103 L50 63 M50 63 L23 22 M50 63 L77 22';
    return '<svg class="cc-bed" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="' + d + '" fill="none" stroke="#4FA6C2" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + C.WATER2 + '" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + C.WATER + '" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M50 100 L50 63 M50 63 L24 24 M50 63 L76 24" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 8"/>' +
      '</svg>';
  }

  function dotsHTML(n) { var s = ''; for (var i = 0; i < n; i++) s += '<span class="cc-dot"></span>'; return '<span class="cc-dots" data-n="' + n + '">' + s + '</span>'; }
  function buoyInner(chn) {
    if (chn.render === 'dots') return dotsHTML(chn.value);
    if (chn.render === 'sum') return '<span class="cc-sum">' + chn.addends[0] + '<span class="cc-plus">+</span>' + chn.addends[1] + '</span>';
    var scale = chn.printScale && chn.printScale !== 1 ? (' style="font-size:calc(var(--cc-num) * ' + chn.printScale + ')"') : '';
    return '<span class="cc-num"' + scale + '>' + esc(chn.value) + '</span>';
  }

  global.ComparisonCreekActivity = {
    id: 'comparison-creek-activity',

    /* it — native ensemble (linguista + pedagoga di 1ª). classe PRIMA (K-cluster precedent: confronto di
       NUMERI SCRITTI con «più grande/più piccolo/=» = nucleo Numeri, classe prima; l'infanzia resta orale/
       concreta). Vocab: «più grande di»/«più piccolo di» (❌ NON «maggiore/minore» = livello notazionale
       formale); pulsanti «DI PIÙ»/«DI MENO» (❌ NON «PIÙ»/«MENO» = operatori + / −); «il ramo del fiume» /
       «il bivio» / «la zattera» / «la boa» / «guidare»; trap valore-non-grandezza. ⚠ articolo+cifra: si
       inserisce «numero» → «il numero {n}» (l'articolo concorda col nome, non con la cifra: «il numero 8»/
       «il numero 1», mai «il 8»). Warm tu; lode invariabile. il capitano Quill (anatroccolo). */
    strings: {
      /* nl — native ensemble (linguïst + pedagoog groep 3). Getallen 1-10 vergelijken (formeel
         symbolisch = Groep 3, GEEN kleuters). Termen: het grotere/kleinere getal; groter/kleiner
         dan; gelijk (twee getallen) vs evenveel (stippen); MEER/MINDER knoppen (NOOIT plus/min-
         operatoren); "=" = het gelijkteken (cf. #10); rivierarm (geen kanaal). Waarde-niet-grootte
         valstrik: "Kijk naar het GETAL, niet naar hoe groot het staat!". Kapitein Kwek (eend;
         hernoemd van "Quill"; kwek = eendengeluid, parallel aan Kukel). */
      title:         { en: 'Comparison Creek', de: 'Käpt’n Quills Flussfahrt', fr: 'La descente de rivière du capitaine Quill', es: 'El río del capitán Quill', pt: 'O rio do capitão Quill', it: 'Il fiume del capitano Quill', nl: 'Kapitein Kweks rivierreis' },
      instruction:   { en: 'Steer Captain Quill down the right channel at each bend. Tap a channel, then tap Check.', de: 'Steuere Käpt’n Quill an jeder Gabelung in den richtigen Flussarm. Tippe einen Flussarm an und dann auf Prüfen.', fr: 'Dirige le capitaine Quill dans le bon bras de la rivière à chaque bifurcation. Touche un bras de la rivière, puis touche Vérifier.', es: 'Guía al capitán Quill por el brazo correcto cada vez que el río se divide. Toca un brazo del río y luego toca Comprobar.', pt: 'Guie o capitão Quill pelo braço certo em cada bifurcação. Toque num braço e depois em Verificar.', it: 'Guida il capitano Quill nel ramo giusto a ogni bivio. Tocca un ramo, poi tocca Verifica.', nl: 'Stuur kapitein Kwek bij elke bocht door de juiste rivierarm. Tik op een rivierarm en tik dan op Controleer.' },
      promptBigger:  { en: 'Steer to the BIGGER number!', de: 'Steuere zur GRÖSSEREN Zahl!', fr: 'Dirige-toi vers le plus GRAND nombre !', es: '¡Guía hacia el número MÁS GRANDE!', pt: 'Vá para o número MAIOR!', it: 'Guida verso il numero PIÙ GRANDE!', nl: 'Stuur naar het GROTERE getal!' },
      promptSmaller: { en: 'Steer to the SMALLER number!', de: 'Steuere zur KLEINEREN Zahl!', fr: 'Dirige-toi vers le plus PETIT nombre !', es: '¡Guía hacia el número MÁS CHICO!', pt: 'Vá para o número MENOR!', it: 'Guida verso il numero PIÙ PICCOLO!', nl: 'Stuur naar het KLEINERE getal!' },
      promptMoreDots:{ en: 'Steer to the side with MORE!', de: 'Steuere zur Seite mit MEHR!', fr: 'Va du côté où il y en a le PLUS !', es: '¡Guía hacia el lado que tiene MÁS!', pt: 'Vá para o lado com MAIS!', it: 'Guida verso il lato che ne ha DI PIÙ!', nl: 'Stuur naar de kant met MEER!' },
      promptBiggerOne:{ en: 'Steer to the BIGGER one!', de: 'Steuere zur GRÖSSEREN!', fr: 'Dirige-toi vers le plus GRAND !', es: '¡Guía hacia el MÁS GRANDE!', pt: 'Vá para o MAIOR!', it: 'Guida verso il PIÙ GRANDE!', nl: 'Stuur naar de GROTERE!' },
      promptSum:     { en: 'Add them up — steer to the BIGGER sum!', de: 'Zähl zusammen — steuere zur GRÖSSEREN Summe!', fr: 'Additionne — puis dirige-toi vers la plus GRANDE somme !', es: 'Súmalos… ¡guía hacia la suma MÁS GRANDE!', pt: 'Some os dois — vá para a soma MAIOR!', it: 'Somma i due numeri — guida verso la somma PIÙ GRANDE!', nl: 'Tel ze bij elkaar op — stuur naar de GROTERE som!' },
      promptSize:    { en: 'Bigger NUMBER, not bigger size!', de: 'Die größere ZAHL zählt — nicht die größere Schrift!', fr: 'C’est le plus grand NOMBRE qui gagne, pas la plus grande écriture !', es: '¡El NÚMERO más grande, no el tamaño más grande!', pt: 'O número MAIOR vence, não o tamanho!', it: 'Vince il NUMERO più grande, non la scritta più grande!', nl: 'Kijk naar het GETAL, niet naar hoe groot het staat!' },
      promptTie:     { en: 'Same number? Steer to the = sign!', de: 'Gleiche Zahl? Steuere zum Gleichheitszeichen =!', fr: 'Le même nombre ? Dirige-toi vers le signe égal = !', es: '¿El mismo número? ¡Guía hacia el signo =!', pt: 'Números iguais? Vá para o sinal de = !', it: 'Numeri uguali? Guida verso il segno uguale!', nl: 'Hetzelfde getal? Stuur naar het gelijkteken!' },
      promptName:    { en: 'Is {a} more or less than {b}?', de: 'Ist {a} mehr oder weniger als {b}?', fr: '{a}, c’est plus ou moins que {b} ?', es: '¿{a} es más o menos que {b}?', pt: '{a} é MAIS ou MENOS que {b}?', it: '{a} è DI PIÙ o DI MENO di {b}?', nl: 'Is {a} meer of minder dan {b}?' },
      promptBetween: { en: 'Which number is BETWEEN {lo} and {hi}?', de: 'Welche Zahl liegt ZWISCHEN {lo} und {hi}?', fr: 'Quel nombre est ENTRE {lo} et {hi} ?', es: '¿Qué número está ENTRE {lo} y {hi}?', pt: 'Qual número está ENTRE {lo} e {hi}?', it: 'Quale numero sta IN MEZZO tra {lo} e {hi}?', nl: 'Welk getal ligt TUSSEN {lo} en {hi}?' },
      readback:      { en: 'You picked {n}.', de: 'Du hast {n} gewählt.', fr: 'Tu as choisi {n}.', es: 'Elegiste {n}.', pt: 'Você escolheu o {n}.', it: 'Hai scelto il numero {n}.', nl: 'Je koos {n}.' },
      reBig:         { en: '{a} is more than {b}. Look again — which channel has {a} now?', de: '{a} ist mehr als {b}. Schau noch mal — in welchem Flussarm ist jetzt {a}?', fr: '{a} est plus grand que {b}. Regarde encore : quel bras de la rivière montre {a} ?', es: '{a} es más que {b}. Mira otra vez: ¿qué brazo tiene el {a}?', pt: '{a} é mais que {b}. Olhe de novo — qual braço tem o {a} agora?', it: '{a} è più grande di {b}. Guarda di nuovo — quale ramo ha ora il numero {a}?', nl: '{a} is groter dan {b}. Kijk nog eens — welke rivierarm heeft nu {a}?' },
      reSmall:       { en: '{a} is less than {b}. Look again — which channel has {a} now?', de: '{a} ist weniger als {b}. Schau noch mal — in welchem Flussarm ist jetzt {a}?', fr: '{a} est plus petit que {b}. Regarde encore : quel bras de la rivière montre {a} ?', es: '{a} es menos que {b}. Mira otra vez: ¿qué brazo tiene el {a}?', pt: '{a} é menos que {b}. Olhe de novo — qual braço tem o {a} agora?', it: '{a} è più piccolo di {b}. Guarda di nuovo — quale ramo ha ora il numero {a}?', nl: '{a} is kleiner dan {b}. Kijk nog eens — welke rivierarm heeft nu {a}?' },
      reEqual:       { en: "They're the same — tap the equal sign!", de: 'Sie sind gleich — tippe auf das Gleichheitszeichen!', fr: 'Ils sont pareils — touche le signe égal !', es: 'Son iguales… ¡toca el signo igual!', pt: 'São iguais — toque no sinal de igual!', it: 'Sono uguali — tocca il segno uguale!', nl: 'Ze zijn gelijk — tik op het gelijkteken!' },
      win:           { en: 'Smooth sailing!', de: 'Super gesteuert!', fr: 'Bien dirigé !', es: '¡Navegaste muy bien!', pt: 'Navegou lisinho!', it: 'Che bella navigata!', nl: 'Goed gevaren!' },
      hintCheck:     { en: 'Steer down a channel, then tap Check.', de: 'Steuere in einen Flussarm und tippe dann auf Prüfen.', fr: 'Entre dans un bras de la rivière, puis touche Vérifier.', es: 'Guía por un brazo del río y luego toca Comprobar.', pt: 'Guie por um braço e depois toque em Verificar.', it: 'Guida in un ramo, poi tocca Verifica.', nl: 'Stuur door een rivierarm en tik dan op Controleer.' },
      relMore:       { en: 'MORE', de: 'MEHR', fr: 'PLUS', es: 'MÁS', pt: 'MAIS', it: 'DI PIÙ', nl: 'MEER' },
      relLess:       { en: 'LESS', de: 'WENIGER', fr: 'MOINS', es: 'MENOS', pt: 'MENOS', it: 'DI MENO', nl: 'MINDER' },
      ariaSteerLeft: { en: 'steer left', de: 'nach links steuern', fr: 'diriger à gauche', es: 'guiar a la izquierda', pt: 'guiar para a esquerda', it: 'guida a sinistra', nl: 'naar links sturen' },
      ariaSteerRight:{ en: 'steer right', de: 'nach rechts steuern', fr: 'diriger à droite', es: 'guiar a la derecha', pt: 'guiar para a direita', it: 'guida a destra', nl: 'naar rechts sturen' },
      ariaEqual:     { en: 'they are equal', de: 'sie sind gleich', fr: 'ils sont égaux', es: 'son iguales', pt: 'são iguais', it: 'sono uguali', nl: 'ze zijn gelijk' },
      quillName:     { en: 'Captain Quill', de: 'Käpt’n Quill', fr: 'le capitaine Quill', es: 'el capitán Quill', pt: 'o capitão Quill', it: 'Il capitano Quill', nl: 'kapitein Kwek' }
    },

    defaults: {},

    init: function (api) {
      this.api = api;
      LANG = (api && api.lang) || 'en';
      this._pool = makeTasks(Core.buildRounds()); this._order = null; this._curPass = 0; this._orderForPool = null;
      this.fork = null; this.phase = 'steer'; this.committed = null; this.swap = false; this.misses = 0; this.readOnly = false; this.solved = 0;
      var params = (global.location) ? new URLSearchParams(global.location.search) : null;
      this._activityId = params ? params.get('activity') : null;
      if (this._activityId) { this._loadActivity(); }
    },

    setupTask: function (fork) {
      this.fork = fork; this.phase = 'steer'; this.committed = null; this.swap = false; this.misses = 0; this.readOnly = false; this.solvedNow = false;
    },

    /* which channel (L/R) currently sits in a given SLOT (left/right) — flips on a wrong steer */
    slotChannel: function (slot) { return this.swap ? (slot === 'left' ? 'R' : 'L') : (slot === 'left' ? 'L' : 'R'); },
    chan: function (side) { return this.fork.channels.filter(function (c) { return c.side === side; })[0]; },

    render: function () {
      this.injectCSS();
      var api = this.api, stage = api.stage; stage.innerHTML = '';
      var wrap = api.el('div', 'cc-wrap');
      var scene = api.el('div', 'cc-scene');

      /* progress: a little creek-map that inks forward */
      var map = api.el('div', 'cc-map');
      for (var i = 0; i < ((this._pool && this._pool.length) || 7); i++) { var seg = api.el('span', 'cc-map-seg'); map.appendChild(seg); }
      this._mapEl = map;

      var river = api.el('div', 'cc-river'); this._riverEl = river;
      scene.append(map, river);
      wrap.appendChild(scene);
      stage.appendChild(wrap);
      this._renderRiver();
      this._paintMap();
      this._setPose('idle');
    },

    _renderRiver: function () {
      var self = this, api = this.api, river = this._riverEl; river.innerHTML = '';
      if (!this.fork) return;
      var mode = this.fork.responseMode;
      var bank = api.el('div', 'cc-bank'); river.appendChild(bank);

      if (mode === 'relation') {
        /* name-it: show the two numerals + a MORE/LESS choice (productive) */
        var rel = api.el('div', 'cc-rel');
        var a = this.chan('L').value, b = this.chan('R').value;
        rel.innerHTML = '<span class="cc-num cc-rel-a">' + esc(a) + '</span><span class="cc-rel-q">?</span><span class="cc-num cc-rel-b">' + esc(b) + '</span>';
        river.appendChild(rel);
        var btns = api.el('div', 'cc-relbtns');
        ['more', 'less'].forEach(function (w) {
          var btn = api.el('button', 'cc-relbtn'); btn.type = 'button'; btn.textContent = self.api.t(w === 'more' ? 'relMore' : 'relLess');
          if (self.readOnly) btn.disabled = true; else btn.addEventListener('click', function () { self._answer(w); });
          if (self.readOnly && Core.isCorrect(self.fork, w)) btn.classList.add('cc-win');
          btns.appendChild(btn);
        });
        river.appendChild(btns);
      } else {
        /* a filled water Y: a trunk current at the bottom forks into two
           diverging arms reaching the two buoy mouths; grass banks + a reed
           island fill the wedge between them. */
        var bed = api.el('div', 'cc-bed-wrap'); bed.innerHTML = bedSVG(); river.appendChild(bed);
        var island = api.el('div', 'cc-island'); island.innerHTML = '<span class="cc-reed"></span><span class="cc-reed"></span><span class="cc-reed"></span>'; river.appendChild(island);
        var forkEl = api.el('div', 'cc-fork');
        ['left', 'right'].forEach(function (slot) {
          var side = self.slotChannel(slot);
          var chn = self.chan(side);
          var lane = api.el('button', 'cc-channel cc-' + slot); lane.type = 'button'; lane.setAttribute('data-side', side);
          lane.setAttribute('aria-label', self.api.t(slot === 'left' ? 'ariaSteerLeft' : 'ariaSteerRight'));
          lane.innerHTML = '<span class="cc-buoy">' + buoyInner(chn) + '</span>';
          if (self.readOnly) lane.disabled = true; else lane.addEventListener('click', function () { self._answer(side); });
          if (self.readOnly && self.committed === side && mode !== 'equal') lane.classList.add('cc-win');
          forkEl.appendChild(lane);
        });
        river.appendChild(forkEl);
        if (mode === 'equal') {
          var beacon = api.el('button', 'cc-beacon'); beacon.type = 'button'; beacon.textContent = '='; beacon.setAttribute('aria-label', self.api.t('ariaEqual'));
          if (self.readOnly) { beacon.disabled = true; beacon.classList.add('cc-win'); } else beacon.addEventListener('click', function () { self._answer('equal'); });
          river.appendChild(beacon);
        }
      }

      /* the raft + Captain Quill at the trunk mouth (bottom-centre, clear of controls) */
      var boat = api.el('div', 'cc-boat' + (mode === 'relation' ? ' cc-boat--rel' : '') + (this.readOnly ? ' cc-glide' : ''));
      var quill = api.el('div', 'cc-quill'); quill.setAttribute('data-pose', 'idle'); quill.innerHTML = quillSVG(this.api); this._quillEl = quill;
      boat.innerHTML = '<span class="cc-raft"></span>'; boat.appendChild(quill);
      river.appendChild(boat);
    },

    _answer: function (response) {
      if (this.readOnly) return;
      this.committed = response;
      // commit-locked read-back (the chosen buoy speaks AFTER the choice)
      if (response === 'L' || response === 'R') { var v = this.chan(response).value; if (this.api.announce) this.api.announce(interp(this.api.t('readback'), { n: v })); speak(String(v)); }
      if (Core.isCorrect(this.fork, response)) { this._win(); }
      else { this.misses++; this._bonk(); }
    },

    _win: function () {
      this.readOnly = true; this.phase = 'done'; this.solvedNow = true;
      this.solved = Math.min(this.solved + 1, (this._pool && this._pool.length) || 7);
      this._setPose('happy'); this.api.sound && this.api.sound(880);
      this._renderRiver(); this._paintMap(); this._sparkle();
      if (this.api.announce) this.api.announce(this.api.t('win'));
    },

    _bonk: function () {
      this._setPose('idle'); this.api.sound && this.api.sound(300);
      var f = this.fork, L = Core.forkVal(f, 'L'), R = Core.forkVal(f, 'R'), msg;
      if (f.responseMode === 'equal') msg = this.api.t('reEqual');
      else if (f.responseMode === 'relation') msg = interp(this.api.t(L > R ? 'reBig' : 'reSmall'), { a: L, b: R });
      else {
        var hi = Math.max(L, R), lo = Math.min(L, R);
        msg = interp(this.api.t(f.promptKey === 'smaller' ? 'reSmall' : 'reBig'), { a: f.promptKey === 'smaller' ? lo : hi, b: f.promptKey === 'smaller' ? hi : lo });
      }
      if (this.api.announce) this.api.announce(msg); speak(msg);
      // POSITION-FLIP: swap the buoys so the child must re-read (only for side rounds)
      if (f.responseMode === 'side') this.swap = !this.swap;
      this.committed = null;
      var river = this._riverEl; if (river) { river.classList.add('cc-bonk'); var self = this; setTimeout(function () { river.classList.remove('cc-bonk'); }, 480); }
      this._renderRiver();
    },

    _paintMap: function () { if (!this._mapEl) return; var n = (this._pool && this._pool.length) || 7; var segs = this._mapEl.children; for (var i = 0; i < segs.length; i++) segs[i].classList.toggle('inked', i < this.solved); },
    _setPose: function (name) { if (this._quillEl) this._quillEl.setAttribute('data-pose', name === 'happy' ? 'happy' : 'idle'); },
    _sparkle: function () {
      if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var r = this._riverEl; if (!r) return; var s = document.createElement('span'); s.className = 'cc-sparkle'; s.textContent = '✦';
      r.appendChild(s); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 700);
    },

    isCorrect: function () { return this.phase === 'done'; },
    reset: function () { this.setupTask(this.fork); this.render(); },

    nextTask: function (opts) {
      var pool = (this._pool && this._pool.length) ? this._pool : makeTasks(Core.buildRounds());
      var n = pool.length, i = (opts && opts.index) || 0;
      if (!this._order || this._orderForPool !== pool || this._order.length !== n) { this._order = bandOrder(pool, null); this._orderForPool = pool; this._curPass = 0; }
      var pass = (n > 0) ? Math.floor(i / n) : 0;
      if (pass > this._curPass) { this._order = bandOrder(pool, this._order); this._curPass = pass; }
      return pool[this._order[i % n]];
    },

    _loadActivity: function () {
      var self = this;
      fetch('/mini-tools/comparison-creek-activities.json').then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .then(function (rows) { var row = rows.find(function (r) { return r.id === self._activityId; }); if (!row) return; self._activityRow = row; self._pool = self._buildTasksFromRow(row); self._order = null; if (typeof global.LCS_reloadFirstTask === 'function') global.LCS_reloadFirstTask(); })
        .catch(function (e) { if (global.console && console.warn) console.warn('[comparison-creek] manifest load failed; fallback:', e.message); });
    },
    _buildTasksFromRow: function (row) { if (row.params && Array.isArray(row.params.rounds)) return makeTasks(row.params.rounds.map(function (r) { return JSON.parse(JSON.stringify(r)); })); return makeTasks(Core.buildRounds()); },

    injectCSS: function () {
      if (this._cssInjected) return; this._cssInjected = true;
      var css = ''
        + '.cc-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,11px);width:100%;max-width:min(96vw,560px);margin:0 auto;--cc-num:clamp(34px,12vw,60px);}'
        + '.cc-scene{position:relative;display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.6vw,10px);width:fit-content;max-width:min(94vw,500px);margin:0 auto;'
        +   'background:linear-gradient(180deg,#FBF3E4,#F4E7CF);border:2.5px solid rgba(20,107,94,.18);border-radius:22px;padding:clamp(8px,2vw,14px) clamp(10px,2.4vw,18px) clamp(10px,2.4vw,16px);box-shadow:0 6px 0 rgba(20,107,94,.10),inset 0 2px 0 rgba(255,255,255,.5);}'
        /* creek-map progress */
        + '.cc-map{display:flex;gap:4px;align-items:center;}'
        + '.cc-map-seg{width:clamp(10px,3vw,18px);height:6px;border-radius:3px;background:rgba(20,107,94,.14);transition:background .3s;}'
        + '.cc-map-seg.inked{background:' + C.WATER2 + ';}'
        /* the creek stage = grassy ground; ONE soft card frame (no double bezel),
           the filled water Y bleeds across it */
        + '.cc-river{position:relative;width:clamp(224px,74vw,372px);height:clamp(196px,52vw,250px);border-radius:20px;overflow:hidden;'
        +   'background:radial-gradient(130% 92% at 50% 100%,#BBE3AB 0%,#9FD18D 50%,#86BE74 100%);box-shadow:inset 0 0 0 1px rgba(20,107,94,.08);}'
        /* soft far grass mound at the top (no titlebar ridge) */
        + '.cc-bank{position:absolute;top:0;left:-6%;right:-6%;height:14%;background:linear-gradient(180deg,#82BC70,#97CB85);border-radius:0 0 50% 50%/0 0 22px 22px;}'
        + '.cc-river.cc-bonk{animation:ccBonk .48s ease;}'
        + '@keyframes ccBonk{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
        /* the filled water Y (SVG), behind everything */
        + '.cc-bed-wrap{position:absolute;inset:0;z-index:0;pointer-events:none;}'
        + '.cc-bed{width:100%;height:100%;display:block;filter:drop-shadow(0 2px 1px rgba(31,90,110,.18));}'
        /* the reed island in the grass wedge between the two arms (decoration) */
        + '.cc-island{position:absolute;left:50%;top:26%;transform:translateX(-50%);width:clamp(26px,8vw,42px);height:22%;z-index:1;pointer-events:none;}'
        + '.cc-reed{position:absolute;bottom:0;width:3px;background:#5C9B4C;border-radius:2px 2px 0 0;}'
        + '.cc-reed:nth-child(1){left:30%;height:74%;} .cc-reed:nth-child(2){left:50%;height:96%;} .cc-reed:nth-child(3){left:70%;height:60%;}'
        /* the two channel buttons = transparent tap-overlays over the arm mouths */
        + '.cc-fork{position:absolute;inset:0;z-index:2;}'
        + '.cc-channel{position:absolute;top:7%;width:42%;height:60%;border:0;background:transparent;cursor:pointer;'
        +   'display:flex;align-items:flex-start;justify-content:center;padding-top:clamp(6px,1.8vw,12px);-webkit-tap-highlight-color:transparent;touch-action:manipulation;transition:transform .1s;}'
        + '.cc-left{left:3%;} .cc-right{right:3%;}'
        + '.cc-channel:active{transform:scale(.97);}'
        + '.cc-channel:focus-visible,.cc-beacon:focus-visible,.cc-relbtn:focus-visible{outline:3px solid var(--lcs-focus,#1E8FD4);outline-offset:2px;}'
        + '.cc-channel.cc-win .cc-buoy{border-color:' + C.GOOD + ';box-shadow:0 0 0 4px rgba(47,165,106,.35),0 3px 0 rgba(122,74,44,.3);}'
        /* buoy carrying the DOM number/dots/sum */
        + '.cc-buoy{position:relative;z-index:2;display:inline-flex;align-items:center;justify-content:center;min-width:clamp(50px,14vw,76px);min-height:clamp(50px,14vw,76px);border-radius:50%;background:#FCF6EA;border:4px solid ' + C.WOOD + ';box-shadow:0 3px 0 rgba(122,74,44,.3);}'
        + '.cc-num{font-family:"Baloo 2",var(--lcs-font-display,sans-serif);font-weight:800;color:' + C.T + ';font-size:var(--cc-num);line-height:1;}'
        + '.cc-sum{font-family:"Baloo 2",sans-serif;font-weight:800;color:' + C.T + ';font-size:calc(var(--cc-num) * .62);}.cc-plus{color:' + C.CORAL + ';margin:0 .08em;}'
        + '.cc-dots{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;padding:6px;}'
        + '.cc-dots[data-n="1"],.cc-dots[data-n="2"],.cc-dots[data-n="4"]{grid-template-columns:repeat(2,1fr);}'
        + '.cc-dot{width:clamp(9px,2.6vw,13px);height:clamp(9px,2.6vw,13px);border-radius:50%;background:' + C.CORAL + ';}'
        /* = beacon (tie) */
        + '.cc-beacon{position:absolute;left:50%;top:31%;transform:translate(-50%,-50%);width:clamp(46px,12vw,62px);height:clamp(46px,12vw,62px);border-radius:50%;border:3px solid #fff;background:' + C.CORAL + ';color:#fff;font-family:"Baloo 2",sans-serif;font-weight:800;font-size:clamp(25px,7vw,36px);cursor:pointer;box-shadow:0 4px 0 ' + C.CORAL2 + ';z-index:3;-webkit-tap-highlight-color:transparent;}'
        + '.cc-beacon.cc-win{background:' + C.GOOD + ';box-shadow:0 4px 0 #1f7a4d;}'
        /* name-it (relation) */
        + '.cc-rel{position:absolute;top:18%;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:clamp(8px,3vw,18px);z-index:3;}'
        + '.cc-rel-q{font-family:"Baloo 2",sans-serif;font-weight:800;font-size:calc(var(--cc-num) * .7);color:' + C.CORAL + ';}'
        + '.cc-relbtns{position:absolute;top:50%;left:0;right:0;display:flex;justify-content:center;gap:clamp(8px,3vw,16px);z-index:3;}'
        + '.cc-relbtn{font-family:"Baloo 2",sans-serif;font-weight:800;font-size:clamp(15px,4vw,20px);color:#fff;background:' + C.T + ';border:0;border-radius:12px;padding:clamp(9px,2.4vw,12px) clamp(14px,4vw,22px);min-height:44px;cursor:pointer;box-shadow:0 3px 0 rgba(20,107,94,.4);-webkit-tap-highlight-color:transparent;}'
        + '.cc-relbtn.cc-win{background:' + C.GOOD + ';}'
        /* raft + Captain Quill riding the trunk current at the bottom mouth */
        + '.cc-boat{position:absolute;left:50%;bottom:-2px;transform:translateX(-50%);width:clamp(78px,23vw,118px);z-index:2;transition:transform .4s var(--lcs-ease,ease);}'
        + '.cc-boat--rel{width:clamp(62px,18vw,90px);}'
        + '.cc-boat.cc-glide{transform:translateX(-50%) translateY(-14px);}'
        + '.cc-raft{display:block;height:clamp(12px,3.4vw,18px);background:linear-gradient(' + C.WOOD + ',#A6794F);border-radius:4px 4px 13px 13px;box-shadow:0 2px 0 rgba(0,0,0,.15),inset 0 2px 0 rgba(255,255,255,.25);position:relative;top:58%;}'
        + '.cc-quill{position:absolute;left:50%;bottom:34%;transform:translateX(-50%);width:80%;}'
        + '.cc-quill-svg{width:100%;height:auto;display:block;overflow:visible;}'
        + '.cc-q-eyes-happy{display:none;} .cc-quill[data-pose="happy"] .cc-q-eyes-open{display:none;} .cc-quill[data-pose="happy"] .cc-q-eyes-happy{display:inline;}'
        + '.cc-sparkle{position:absolute;left:50%;top:4px;transform:translateX(-50%);color:#fff;font-size:20px;animation:ccSpark .7s ease forwards;pointer-events:none;z-index:4;}'
        + '@keyframes ccSpark{0%{opacity:0;transform:translate(-50%,8px) scale(.5);}30%{opacity:1;}100%{opacity:0;transform:translate(-50%,-18px) scale(1.1);}}'
        + '@media (max-width:360px){.cc-scene{padding:7px 9px;}}'
        + '@media (prefers-reduced-motion: reduce){.cc-river.cc-bonk,.cc-boat,.cc-sparkle{animation:none;transition:none;}}';
      var tag = document.createElement('style'); tag.setAttribute('data-comparison-creek', ''); tag.textContent = css;
      document.head.appendChild(tag);
    }
  };

  function promptFor(fork) {
    var L = fork.channels.filter(function (c) { return c.side === 'L'; })[0], R = fork.channels.filter(function (c) { return c.side === 'R'; })[0];
    var renders = fork.channels.map(function (c) { return c.render; });
    var scaled = fork.channels.some(function (c) { return c.printScale && c.printScale !== 1; });
    switch (fork.promptKey) {
      case 'bigger':
        if (scaled) return { key: 'promptSize', args: {} };
        if (renders.every(function (r) { return r === 'dots'; })) return { key: 'promptMoreDots', args: {} };
        if (new Set(renders).size > 1) return { key: 'promptBiggerOne', args: {} };
        return { key: 'promptBigger', args: {} };
      case 'smaller': return { key: 'promptSmaller', args: {} };
      case 'sum': return { key: 'promptSum', args: {} };
      case 'tie': return { key: 'promptTie', args: {} };
      case 'nameMore': return { key: 'promptName', args: { a: L.value, b: R.value } };
      case 'between': return { key: 'promptBetween', args: { lo: fork.between.lo, hi: fork.between.hi } };
      default: return { key: 'promptBigger', args: {} };
    }
  }

  function makeTasks(forks) {
    return forks.map(function (fork) {
      var p = promptFor(fork);
      return {
        id: 'comparison-creek.' + fork.id, band: fork.band,
        promptKey: p.key, promptArgs: p.args, answerType: 'state',
        setup: function (tool) { tool.setupTask(fork); },
        check: function (tool) { var ok = tool.isCorrect(); if (ok) tool.readOnly = true; return ok; },
        hintKey: function () { return 'hintCheck'; }
      };
    });
  }

  function bandOrder(pool, prev) {
    var byBand = {}; pool.forEach(function (t, i) { (byBand[t.band] = byBand[t.band] || []).push(i); });
    var bands = Object.keys(byBand).sort(function (a, b) { return a - b; });
    var out, attempts = 0;
    do { out = []; bands.forEach(function (b) { var g = byBand[b].slice(); for (var i = g.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = g[i]; g[i] = g[j]; g[j] = t; } out = out.concat(g); }); attempts++; } while (prev && out.join(',') === prev.join(',') && attempts < 12 && pool.length > 1);
    return out;
  }

}(typeof window !== 'undefined' ? window : this));
