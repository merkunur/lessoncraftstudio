/* =====================================================================
   root-stencil-activity.js — ACTIVITY #114 of the one-by-one rebuild:
   "Build Words with Endings" → THE ROOT STENCIL (RF.1.3.f; en de nl fr
   es pt sv da no fi — it refused, see the core).
   Design: docs/activities-rebuild/designs/114-syllable-builder.md
   ---------------------------------------------------------------------
   THE INVENTION: the root word is a stencil with its letters cut out as
   windows. Lay a word card in the frame and press Check: the stencil
   drops onto it. On a word built from the root every window frames its
   own letter, the stencil lies flat and the leftover slides into a gold
   ending sleeve; on a look-alike a window shows a wrong letter (it
   flashes coral and the stencil rocks); on a trap (catch under cat) the
   windows all fit but the leftover finds no sleeve and droops. Every
   word made hangs on its ending's hook at the top. Clues: Find the root
   (four cards) · Peel the ending (tap where the root ends) · Add the
   ending (a sentence decides the sleeve).
   ACTIVITY LAYER ONLY: the model is root-stencil-core.js; pictures are
   the library's; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity when right).
   Test seams: window.RootStencilActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var RootStencilActivity = {
  id: 'root-stencil',
  apparatusClasses: ['rs-'],

  /*STRINGS-BEGIN*/strings: {
    title: {en:"Build Words with Endings",de:"Wörter mit Endungen",nl:"Woorden met uitgangen",fr:"Le mot et sa terminaison",es:"Palabras con -s y -es",pt:"Palavras com -s e -es",sv:"Ord med ändelser",da:"Ord med endelser",no:"Ord med endinger",fi:"Sanat ja päätteet"},
    instruction: {en:"Find the root word inside a longer word, then the ending: -s, -ed or -ing.",de:"Finde den Wortstamm im längeren Wort, dann die Endung.",nl:"Zoek het grondwoord in het langere woord, en dan de uitgang.",fr:"Trouve le mot de départ dans un mot plus long, puis la terminaison.",es:"Encuentra la palabra de base dentro de una palabra más larga y luego su final.",pt:"Encontre a palavra de base dentro de uma palavra mais longa e depois o final.",sv:"Hitta grundordet i ett längre ord, och sedan ändelsen.",da:"Find grundordet i et længere ord, og så endelsen.",no:"Finn grunnordet i et lengre ord, og så endingen.",fi:"Etsi perussana pidemmän sanan sisältä ja sitten pääte."},
    instrBubble: {en:"{msg}",de:"{msg}",nl:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",nl:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    check: {en:"Check",de:"Prüfen",nl:"Controleer",fr:"Vérifier",es:"Comprobar",pt:"Verificar",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    tFind: {en:"Which word is built from the picture's word? Lay it in the frame.",de:"Welches Wort ist aus dem Bildwort gebaut? Leg es in den Rahmen.",nl:"Welk woord is gemaakt van het woord bij het plaatje? Leg het in het kader.",fr:"Quel mot est construit avec le mot de l’image ? Pose-le dans le cadre.",es:"¿Qué palabra está hecha con la palabra del dibujo? Ponla en el marco.",pt:"Qual palavra é feita com a palavra da figura? Coloque-a na moldura.",sv:"Vilket ord är byggt av bildens ord? Lägg det i ramen.",da:"Hvilket ord er bygget af billedets ord? Læg det i rammen.",no:"Hvilket ord er bygd av bildets ord? Legg det i rammen.",fi:"Mikä sana on tehty kuvan sanasta? Laita se kehykseen."},
    tPeel: {en:"Tap between the letters where the picture's word ends.",de:"Tipp zwischen die Buchstaben, wo das Bildwort aufhört.",nl:"Tik tussen de letters waar het woord bij het plaatje ophoudt.",fr:"Touche entre les lettres, là où finit le mot de l’image.",es:"Toca entre las letras donde termina la palabra del dibujo.",pt:"Toque entre as letras onde termina a palavra da figura.",sv:"Tryck mellan bokstäverna där bildens ord slutar.",da:"Tryk mellem bogstaverne, hvor billedets ord slutter.",no:"Trykk mellom bokstavene der bildets ord slutter.",fi:"Napauta kirjainten väliin siihen, mihin kuvan sana loppuu."},
    tAdd: {en:"Read the sentence. Which ending does the word need?",de:"Lies den Satz. Welche Endung braucht das Wort?",nl:"Lees de zin. Welke uitgang heeft het woord nodig?",fr:"Lis la phrase. De quelle terminaison le mot a-t-il besoin ?",es:"Lee la oración. ¿Qué final necesita la palabra?",pt:"Leia a frase. De qual final a palavra precisa?",sv:"Läs meningen. Vilken ändelse behöver ordet?",da:"Læs sætningen. Hvilken endelse skal ordet have?",no:"Les setningen. Hvilken ending trenger ordet?",fi:"Lue lause. Minkä päätteen sana tarvitsee?"},
    nudge: {en:"Tap a word card to lay it in the frame, then press Check.",de:"Tipp eine Wortkarte an, dann liegt sie im Rahmen. Drück danach auf Prüfen.",nl:"Tik een woordkaart aan om hem in het kader te leggen. Druk dan op Controleer.",fr:"Touche une carte pour la poser dans le cadre, puis appuie sur Vérifier.",es:"Toca una tarjeta para ponerla en el marco y luego pulsa Comprobar.",pt:"Toque em um cartão para colocá-lo na moldura e depois em Verificar.",sv:"Tryck på ett ordkort så hamnar det i ramen. Tryck sedan på Kontrollera.",da:"Tryk på et ordkort, så lægges det i rammen. Tryk så på Tjek.",no:"Trykk på et ordkort, så legges det i rammen. Trykk så på Sjekk.",fi:"Napauta sanakorttia, niin se menee kehykseen. Paina sitten Tarkista."},
    hintEmptyFind: {en:"Lay a word in the frame first.",de:"Leg zuerst ein Wort in den Rahmen.",nl:"Leg eerst een woord in het kader.",fr:"Pose d’abord un mot dans le cadre.",es:"Primero pon una palabra en el marco.",pt:"Primeiro coloque uma palavra na moldura.",sv:"Lägg först ett ord i ramen.",da:"Læg først et ord i rammen.",no:"Legg først et ord i rammen.",fi:"Laita ensin sana kehykseen."},
    hintEmptyPeel: {en:"Tap between two letters to place the line.",de:"Tipp zwischen zwei Buchstaben, um den Strich zu setzen.",nl:"Tik tussen twee letters om de streep te zetten.",fr:"Touche entre deux lettres pour placer le trait.",es:"Toca entre dos letras para poner la raya.",pt:"Toque entre duas letras para colocar o traço.",sv:"Tryck mellan två bokstäver för att sätta strecket.",da:"Tryk mellem to bogstaver for at sætte stregen.",no:"Trykk mellom to bokstaver for å sette streken.",fi:"Napauta kahden kirjaimen väliin, niin viiva tulee siihen."},
    hintEmptyAdd: {en:"Pick an ending for the word.",de:"Wähl eine Endung für das Wort.",nl:"Kies een uitgang voor het woord.",fr:"Choisis une terminaison pour le mot.",es:"Elige un final para la palabra.",pt:"Escolha um final para a palavra.",sv:"Välj en ändelse till ordet.",da:"Vælg en endelse til ordet.",no:"Velg en ending til ordet.",fi:"Valitse sanalle pääte."},
    hintLetter: {en:"Look through the windows. Is every letter from the picture's word?",de:"Schau durch die Fenster. Steht in jedem Fenster ein Buchstabe vom Bildwort?",nl:"Kijk door de raampjes. Staat in elk raampje een letter van het woord bij het plaatje?",fr:"Regarde par les fenêtres. Chaque lettre est-elle celle du mot de l’image ?",es:"Mira por las ventanas. ¿Cada letra es de la palabra del dibujo?",pt:"Olhe pelas janelas. Cada letra é da palavra da figura?",sv:"Titta genom fönstren. Är varje bokstav från bildens ord?",da:"Kig gennem vinduerne. Er hvert bogstav fra billedets ord?",no:"Se gjennom vinduene. Er hver bokstav fra bildets ord?",fi:"Katso ikkunoista. Onko jokainen kirjain kuvan sanasta?"},
    hintTrap: {en:"The picture's word is inside — but is the rest a real ending?",de:"Das Bildwort steckt drin – aber ist der Rest eine echte Endung?",nl:"Het woord bij het plaatje zit erin, maar is de rest een echte uitgang?",fr:"Le mot de l’image est dedans, mais le reste est-il une vraie terminaison ?",es:"La palabra del dibujo está dentro, pero ¿el resto es un final de verdad?",pt:"A palavra da figura está dentro, mas o resto é um final de verdade?",sv:"Bildens ord finns där, men är resten en riktig ändelse?",da:"Billedets ord er der, men er resten en rigtig endelse?",no:"Bildets ord er der, men er resten en ekte ending?",fi:"Kuvan sana on sisällä, mutta onko loppu oikea pääte?"},
    hintPeel: {en:"Find where the picture's word ends.",de:"Such, wo das Bildwort aufhört.",nl:"Zoek waar het woord bij het plaatje ophoudt.",fr:"Cherche où finit le mot de l’image.",es:"Busca dónde termina la palabra del dibujo.",pt:"Procure onde termina a palavra da figura.",sv:"Leta efter var bildens ord slutar.",da:"Find ud af, hvor billedets ord slutter.",no:"Finn ut hvor bildets ord slutter.",fi:"Etsi, mihin kuvan sana loppuu."},
    hintFind2: {en:"Now the stencil shows its letters. Compare them one by one.",de:"Jetzt zeigt die Schablone ihre Buchstaben. Vergleiche sie einzeln.",nl:"Nu laat de mal zijn letters zien. Vergelijk ze één voor één.",fr:"Maintenant le pochoir montre ses lettres. Compare-les une par une.",es:"Ahora la plantilla muestra sus letras. Compáralas una por una.",pt:"Agora o molde mostra suas letras. Compare uma por uma.",sv:"Nu visar schablonen sina bokstäver. Jämför dem en i taget.",da:"Nu viser skabelonen sine bogstaver. Sammenlign dem ét ad gangen.",no:"Nå viser sjablongen bokstavene sine. Sammenlign dem én og én.",fi:"Nyt kaava näyttää kirjaimensa. Vertaa niitä yksi kerrallaan."},
    hintPeel2: {en:"The stencil shows the picture's word. Put the line where it ends.",de:"Die Schablone zeigt das Bildwort. Setz den Strich, wo es aufhört.",nl:"De mal laat het woord bij het plaatje zien. Zet de streep waar het ophoudt.",fr:"Le pochoir montre le mot de l’image. Place le trait là où il finit.",es:"La plantilla muestra la palabra del dibujo. Pon la raya donde termina.",pt:"O molde mostra a palavra da figura. Coloque o traço onde ela termina.",sv:"Schablonen visar bildens ord. Sätt strecket där det slutar.",da:"Skabelonen viser billedets ord. Sæt stregen, hvor det slutter.",no:"Sjablongen viser bildets ord. Sett streken der det slutter.",fi:"Kaava näyttää kuvan sanan. Laita viiva siihen, mihin se loppuu."},
    hintAdd: {en:"Read the whole sentence again. Which word tells you which ending fits?",de:"Lies den ganzen Satz noch einmal. Welches Wort sagt dir, welche Endung passt?",nl:"Lees de hele zin nog eens. Welk woord vertelt je welke uitgang past?",fr:"Relis toute la phrase. Quel mot t’indique la bonne terminaison ?",es:"Mira la última letra de la palabra: ¿es vocal o consonante?",pt:"Olhe a última letra da palavra: é vogal ou consoante?",sv:"Läs hela meningen igen. Vilket ord visar vilken ändelse som passar?",da:"Læs hele sætningen igen. Hvilket ord viser, hvilken endelse der passer?",no:"Les hele setningen igjen. Hvilket ord viser hvilken ending som passer?",fi:"Lue lause uudestaan. Kysytäänkö, montako niitä on, vai missä jokin on? Katso myös sanan vokaaleja."},
    hintAdd2: {en:"{why}",de:"{why}",nl:"{why}",fr:"{why}",es:"{why}",pt:"{why}",sv:"{why}",da:"{why}",no:"{why}",fi:"{why}"},
    okFind: {en:"{built} is built from {root}: {root} + {end}!",de:"{built} ist aus {root} gebaut: {root} + {end}!",nl:"{built} is gemaakt van {root}: {root} + {end}!",fr:"{built} est construit avec {root} : {root} + {end} !",es:"¡{built} está hecha con {root}: {root} + {end}!",pt:"{built} é feita com {root}: {root} + {end}!",sv:"{built} är byggt av {root}: {root} + {end}!",da:"{built} er bygget af {root}: {root} + {end}!",no:"{built} er bygd av {root}: {root} + {end}!",fi:"{built} on tehty sanasta {root}: {root} + {end}!"},
    okPeel: {en:"{root} + {end} = {built}!",de:"{root} + {end} = {built}!",nl:"{root} + {end} = {built}!",fr:"{root} + {end} = {built} !",es:"¡{root} + {end} = {built}!",pt:"{root} + {end} = {built}!",sv:"{root} + {end} = {built}!",da:"{root} + {end} = {built}!",no:"{root} + {end} = {built}!",fi:"{root} + {end} = {built}!"},
    okSay: {en:"The -ed says /{s}/.",de:"",nl:"",fr:"",es:"",pt:"",sv:"",da:"",no:"",fi:""},
    okAdd: {en:"{line} {mean}",de:"{line} {mean}",nl:"{line} {mean}",fr:"{line} {mean}",es:"{line} {mean}",pt:"{line} {mean}",sv:"{line} {mean}",da:"{line} {mean}",no:"{line} {mean}",fi:"{line} {mean}"},
    aHooks: {en:"Ending hooks: the words you made",de:"Endungshaken: deine Wörter",nl:"Haakjes per uitgang: jouw woorden",fr:"Crochets des terminaisons : tes mots",es:"Ganchos de los finales: tus palabras",pt:"Ganchos dos finais: suas palavras",sv:"Ändelsekrokar: dina ord",da:"Endelseskroge: dine ord",no:"Endingskroker: ordene dine",fi:"Päätekoukut: sinun sanasi"},
    aPic: {en:"Picture: {name}",de:"Bild: {name}",nl:"Plaatje: {name}",fr:"Image : {name}",es:"Dibujo: {name}",pt:"Figura: {name}",sv:"Bild: {name}",da:"Billede: {name}",no:"Bilde: {name}",fi:"Kuva: {name}"},
    aCard: {en:"Word card: {w}",de:"Wortkarte: {w}",nl:"Woordkaart: {w}",fr:"Carte : {w}",es:"Tarjeta: {w}",pt:"Cartão: {w}",sv:"Ordkort: {w}",da:"Ordkort: {w}",no:"Ordkort: {w}",fi:"Sanakortti: {w}"},
    aFrame: {en:"Frame: {w}",de:"Rahmen: {w}",nl:"Kader: {w}",fr:"Cadre : {w}",es:"Marco: {w}",pt:"Moldura: {w}",sv:"Ram: {w}",da:"Ramme: {w}",no:"Ramme: {w}",fi:"Kehys: {w}"},
    aFrameEmpty: {en:"Frame: empty",de:"Rahmen: leer",nl:"Kader: leeg",fr:"Cadre : vide",es:"Marco: vacío",pt:"Moldura: vazia",sv:"Ram: tom",da:"Ramme: tom",no:"Ramme: tom",fi:"Kehys: tyhjä"},
    aGap: {en:"Line after letter {n}",de:"Strich nach Buchstabe {n}",nl:"Streep na letter {n}",fr:"Trait après la lettre {n}",es:"Raya después de la letra {n}",pt:"Traço depois da letra {n}",sv:"Streck efter bokstav {n}",da:"Streg efter bogstav {n}",no:"Strek etter bokstav {n}",fi:"Viiva kirjaimen {n} jälkeen"},
    aSleeve: {en:"Ending {e}",de:"Endung {e}",nl:"Uitgang {e}",fr:"Terminaison {e}",es:"Final {e}",pt:"Final {e}",sv:"Ändelse {e}",da:"Endelse {e}",no:"Ending {e}",fi:"Pääte {e}"},
    aWin: {en:"Window {n} shows {a}; the picture's word needs {b}.",de:"Fenster {n} zeigt {a}; das Bildwort braucht {b}.",nl:"Raampje {n} laat {a} zien; het woord bij het plaatje heeft {b} nodig.",fr:"La fenêtre {n} montre {a} ; le mot de l’image a besoin de {b}.",es:"La ventana {n} muestra {a}; la palabra del dibujo necesita {b}.",pt:"A janela {n} mostra {a}; a palavra da figura precisa de {b}.",sv:"Fönster {n} visar {a}; bildens ord behöver {b}.",da:"Vindue {n} viser {a}; billedets ord skal have {b}.",no:"Vindu {n} viser {a}; bildets ord trenger {b}.",fi:"Ikkunassa {n} näkyy {a}; kuvan sana tarvitsee {b}."},
    aNoEnd: {en:"No ending fits {s}.",de:"Keine Endung passt zu {s}.",nl:"Geen uitgang past bij {s}.",fr:"Aucune terminaison ne va avec {s}.",es:"Ningún final sirve para {s}.",pt:"Nenhum final serve para {s}.",sv:"Ingen ändelse passar till {s}.",da:"Ingen endelse passer til {s}.",no:"Ingen ending passer til {s}.",fi:"Mikään pääte ei sovi kohtaan {s}."},
    setClue: {en:"Clue",de:"Aufgabe",nl:"Opdracht",fr:"Consigne",es:"Actividad",pt:"Atividade",sv:"Uppgift",da:"Opgave",no:"Oppgave",fi:"Tehtävä"},
    cFind: {en:"Find the root",de:"Stamm finden",nl:"Grondwoord zoeken",fr:"Trouve le mot de départ",es:"Busca la palabra de base",pt:"Ache a palavra de base",sv:"Hitta grundordet",da:"Find grundordet",no:"Finn grunnordet",fi:"Etsi perussana"},
    cPeel: {en:"Peel the ending",de:"Endung abtrennen",nl:"Uitgang afsplitsen",fr:"Sépare la terminaison",es:"Separa el final",pt:"Separe o final",sv:"Dela av ändelsen",da:"Del endelsen af",no:"Del av endingen",fi:"Erota pääte"},
    cAdd: {en:"Add the ending",de:"Endung anhängen",nl:"Uitgang toevoegen",fr:"Ajoute la terminaison",es:"Añade el final",pt:"Coloque o final",sv:"Lägg till ändelsen",da:"Sæt endelsen på",no:"Legg til endingen",fi:"Lisää pääte"},
    setLook: {en:"Look-alikes",de:"Ähnliche Wörter",nl:"Woorden die erop lijken",fr:"Mots qui se ressemblent",es:"Palabras parecidas",pt:"Palavras parecidas",sv:"Liknande ord",da:"Lignende ord",no:"Ord som ligner",fi:"Samannäköiset sanat"},
    lPlain: {en:"Plain",de:"Einfach",nl:"Gewoon",fr:"Simples",es:"Sencillas",pt:"Simples",sv:"Enkla",da:"Enkle",no:"Enkle",fi:"Helpot"},
    lTricky: {en:"Tricky",de:"Knifflig",nl:"Lastig",fr:"Difficiles",es:"Difíciles",pt:"Difíceis",sv:"Kluriga",da:"Svære",no:"Vanskelige",fi:"Hankalat"},
  },/*STRINGS-END*/

  defaults: { clue: 'find', look: 'plain' },
  settings: [
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'find', labelKey: 'cFind' }, { value: 'peel', labelKey: 'cPeel' }, { value: 'add', labelKey: 'cAdd' }] },
    { key: 'look', type: 'choice', labelKey: 'setLook', options: [{ value: 'plain', labelKey: 'lPlain' }, { value: 'tricky', labelKey: 'lTricky' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._hooks = {}; this._nudged = false;
    /* the look-alikes setting only where the locale has a tricky set (en) */
    var lang = RootStencilCore.locale((api && api.lang) || 'en');
    this.settings = [this.settings[0]].concat(RootStencilCore.hasTricky(lang) ? [this.settings[1]] : []);
    injectRootStencilCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return RootStencilCore.locale(((this.api && this.api.lang) || 'en')); },
  _clue: function () { return RootStencilCore.clueOf(this._setting('clue')); },
  _look: function () { return this._clue() === 'find' ? RootStencilCore.lookOf(this._loc(), this._setting('look')) : 'plain'; },
  _key: function () { return this._loc() + '/' + this._clue() + '/' + this._look(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RootStencilCore.rounds(this._loc(), this._clue(), this._look()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RootStencilCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._clue(), this._look(), Math.random, fresh ? null : this._prev);
      this._prev = P.order; this._order = P.order.slice(); this._pos = P.pos; this._orderForPool = pool; this._pass = pass;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'rootstencil.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t({ find: 'tFind', peel: 'tPeel', add: 'tAdd' }[this.st.clue]); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._at = at || 0;
    var i = this._at;
    this.st = RootStencilCore.newState(this._loc(), this._clue(), this._look(), r, { rnd: Math.random, pos: this._pos ? this._pos[i] : null });
    this._view = { note: '', ok: '', drop: false };
    if (!this._nudged && this.st.clue === 'find') { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; this._view.drop = false; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rs-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="rs-hooks" role="list"></div><div class="rs-bench"></div><div class="rs-tray"></div><div class="rs-foot"></div><p class="rs-note" aria-live="polite"></p><p class="rs-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _dims: function () {
    var W = this._width(), w = Math.min(W, 700), B = RootStencilCore.band(W);
    var pic = B.wide ? 150 : B.tiny ? 96 : 112;
    return { W: W, w: w, wide: B.wide, tiny: B.tiny, pic: pic };
  },
  /* the letter cell for a word in the frame: as big as the frame allows */
  _cell: function (D, n) { var room = Math.min(D.w, 520) - 24 - 8 - 8 - 14; /* frame, button and letter padding, the 6 px shift of the ending */ return Math.max(22, Math.min(D.wide ? 46 : 38, Math.floor(room / Math.max(n, 4)))); },
  _img: function (pic) { return '/image-library-webp/themes/' + pic + '@2x.webp'; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: 0.85 }); } catch (e) {} },
  _sr: function (s) { var el = this._qs('.rs-sr'); if (el) el.textContent = s; },
  _hookList: function (clue) { var k = this._loc() + '/' + clue; if (!this._hooks[k]) this._hooks[k] = {}; return this._hooks[k]; },

  _paint_: function () {
    var C = RootStencilCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'rs-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' clue-' + st.clue;
    this._wrap.style.setProperty('--rs-pic', D.pic + 'px');
    /* the ending hooks: a sleeve per ending, the words made under it */
    var hooks = this._qs('.rs-hooks'), H = this._hookList(st.clue); hooks.setAttribute('aria-label', this._t('aHooks')); hooks.innerHTML = '';
    C.sleevesFor(st.loc, st.clue).forEach(function (e) {
      var row = document.createElement('div'); row.className = 'rs-hook'; row.setAttribute('role', 'listitem');
      row.innerHTML = '<span class="rs-tube">-' + esc(e) + '</span>' + (H[e] || []).slice(-3).map(function (w) { return '<span class="rs-tag">' + esc(w) + '</span>'; }).join('');
      hooks.appendChild(row);
    });
    /* the bench: the picture and the frame */
    var bench = this._qs('.rs-bench'); bench.innerHTML = '';
    var pic = st.R.pic, copies = st.R.n || 1;
    if (pic) {
      /* Add: as many copies as the sentence says (two cats), each as big as the bench allows */
      var size = copies > 1 ? Math.min(D.pic, Math.max(D.wide ? 96 : 64, Math.floor((D.w - 40) / copies) - 14)) : D.pic;
      var pics = document.createElement('div'); pics.className = 'rs-pics'; pics.setAttribute('role', 'img'); pics.setAttribute('aria-label', this._t('aPic', { name: st.R.root }));
      for (var c = 0; c < copies; c++) {
        var pc = document.createElement('div'); pc.className = 'rs-pic' + (st.done ? ' is-nod' : '');
        pc.innerHTML = '<img src="' + this._img(pic) + '" alt="" width="' + size + '" height="' + size + '" draggable="false">';
        pc.style.width = pc.style.height = (size + 12) + 'px';
        pics.appendChild(pc);
      }
      bench.appendChild(pics);
    }
    if (st.clue === 'add') bench.appendChild(this._sentence(D)); else bench.appendChild(this._frame(D));
    /* the tray: Find cards / Add sleeves */
    var tray = this._qs('.rs-tray'); tray.innerHTML = '';
    if (st.clue === 'find') st.cards.forEach(function (w, i) {
      var b = self._btn('rs-card' + (st.frame === i ? ' is-out' : ''), 'card-' + i, self._t('aCard', { w: w }), '<span>' + esc(w) + '</span>');
      b.disabled = st.done; b.addEventListener('click', function () { self._lay(i); }); tray.appendChild(b);
    });
    else if (st.clue === 'add') st.sleeves.forEach(function (e, i) {
      var b = self._btn('rs-sleeve' + (st.sleeve === e ? ' is-on' : '') + (st.marks && st.marks.sleeve === e ? ' is-pop' : ''), 'sleeve-' + i, self._t('aSleeve', { e: '-' + e }), '<span>-' + esc(e) + '</span>');
      b.disabled = st.done; b.addEventListener('click', function () { self._fit(e); }); tray.appendChild(b);
    });
    tray.classList.toggle('is-empty', st.clue === 'peel');
    var foot = this._qs('.rs-foot'); foot.innerHTML = '';
    var chk = this._btn('rs-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.rs-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'rs-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'rs-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'rs-note'; }
  },
  /* the frame: Find — the laid word's letters (tap to take it back); Peel — the word with its line (tap where the root
     ends). The stencil sits over the letters after Check (and hovers with its letters showing from miss 2). */
  _frame: function (D) {
    var C = RootStencilCore, st = this.st, self = this, R = st.R, word = st.clue === 'find' ? (st.frame == null ? null : st.cards[st.frame]) : R.built;
    var fr = document.createElement('div'); fr.className = 'rs-frame' + (C.reveal(st) ? ' is-reveal' : '');
    if (word == null) {
      var e = this._btn('rs-slot', 'frame', this._t('aFrameEmpty'), '<span class="rs-edge" aria-hidden="true"></span>');
      e.disabled = true; fr.appendChild(e); return fr;
    }
    var n = word.length, cell = this._cell(D, Math.max(n, R.root.length)), fs = Math.round(cell * 0.8), rowH = Math.round(cell * 1.35);
    if (C.reveal(st)) fr.style.paddingTop = (rowH + 30) + 'px';
    var showStencil = st.done || (st.last && st.last !== 'tray' && st.misses > 0) || C.reveal(st);
    var s = C.stencil(word, R.root), marks = st.marks || {};
    var line = st.clue === 'peel' ? st.gap : (st.done ? R.root.length : null);
    var cells = '';
    for (var i = 0; i < n; i++) {
      var cls = 'rs-l';
      if (st.done && i >= R.root.length) cls += ' is-sleeved';
      if (!st.done && st.last === 'fakeEnding' && i >= R.root.length) cls += ' is-droop';
      if (!st.done && st.last === 'wrongSplit' && !marks.inside && i >= R.root.length && i < marks.at) cls += ' is-droop';
      if (line != null && i >= line) cls += ' is-right';
      cells += '<span class="' + cls + '" style="width:' + cell + 'px">' + esc(word.charAt(i)) + '</span>';
    }
    var stencilHtml = '';
    if (showStencil) {
      var rock = !st.done && (st.last === 'wrongLetter' || st.last === 'wrongSplit' && marks.inside);
      stencilHtml = '<span class="rs-stencil' + (rock ? ' is-rock' : '') + (st.done ? ' is-flat' : '') + (C.reveal(st) ? ' is-reveal' : '') + '" aria-hidden="true" style="width:' + (R.root.length * cell + 8) + 'px' + (C.reveal(st) ? ';top:' + (-rowH - 26) + 'px;height:' + (rowH + 4) + 'px;bottom:auto;font-size:' + fs + 'px' : '') + '">' +
        s.windows.map(function (w, k) {
          var bad = !w.ok || (st.clue === 'peel' && marks.inside && !st.done && k >= marks.at);
          return '<i class="rs-win' + (bad && !st.done && st.last !== 'tray' ? ' is-bad' : (st.last === 'tray' ? '' : ' is-good')) + '" style="width:' + (cell - 4) + 'px"><b>' + (C.reveal(st) ? esc(w.needs) : '') + '</b></i>';
        }).join('') + '</span>';
    }
    var sleeve = st.done ? '<span class="rs-zip" aria-hidden="true" style="left:' + (R.root.length * cell + 6) + 'px;width:' + ((n - R.root.length) * cell + 4) + 'px"></span>' : '';
    var divider = line != null && st.clue === 'peel' ? '<span class="rs-line" aria-hidden="true" style="left:' + (line * cell + 4) + 'px"></span>' : '';
    var inner = '<span class="rs-letters" style="font-size:' + fs + 'px;height:' + rowH + 'px;min-width:' + (Math.max(n, R.root.length) * cell + 8) + 'px">' + cells + sleeve + divider + stencilHtml + '</span>';
    var label;
    if (st.clue === 'find') label = this._t('aFrame', { w: word });
    else label = st.gap == null ? this._t('aFrame', { w: word }) : this._t('aGap', { n: st.gap });
    var b = this._btn('rs-word' + (st.clue === 'peel' ? ' is-peel' : ''), 'frame', label, inner);
    b.disabled = st.done;
    if (st.clue === 'find') b.addEventListener('click', function () { self._lay(st.frame); });
    else {
      b.addEventListener('click', function (ev) { self._tapGap(b, ev); });
      b.addEventListener('keydown', function (ev) { if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') { ev.preventDefault(); if (RootStencilCore.moveGap(st, ev.key === 'ArrowLeft' ? -1 : 1) === 'set') { self.api.sound(500); self._clearHelp(); self._paint(); } } });
    }
    fr.appendChild(b);
    return fr;
  },
  /* Add: the sentence strip — the root sits in the gap; the chosen sleeve hangs on its end */
  _sentence: function (D) {
    var C = RootStencilCore, st = this.st, R = st.R, P = C.sentenceParts(st), lit = !st.done && st.last === 'wrongEnding';
    var mark = function (txt) { var i = txt.indexOf(R.sig); if (i < 0) return esc(txt); return esc(txt.slice(0, i)) + '<span class="rs-sig' + (lit ? ' is-lit' : '') + (st.show >= 2 && lit ? ' is-thread' : '') + '">' + esc(R.sig) + '</span>' + esc(txt.slice(i + R.sig.length)); };
    var gap = '<span class="rs-gapword' + (st.done ? ' is-done' : '') + '"><span class="rs-rootw">' + esc(R.root) + '</span>' + (st.sleeve ? '<span class="rs-on">' + esc(st.sleeve) + '</span>' : '<span class="rs-hole" aria-hidden="true"></span>') + '</span>';
    var p = document.createElement('p'); p.className = 'rs-sentence';
    p.innerHTML = mark(P.before) + gap + mark(P.after);
    return p;
  },

  /* ---------------- the hand ---------------- */
  _lay: function (i) {
    var r = RootStencilCore.lay(this.st, i);
    if (r === 'no') return;
    this.api.sound(r === 'laid' ? 440 : 300); this._clearHelp(); this._paint();
    if (r === 'laid') this._speak(this.st.cards[i]);
  },
  _fit: function (e) { var r = RootStencilCore.fit(this.st, e); if (r === 'no') return; this.api.sound(r === 'fitted' ? 520 : 300); this._clearHelp(); this._paint(); },
  _tapGap: function (b, ev) {
    var st = this.st, ls = b.querySelectorAll('.rs-l'); if (!ls.length) return;
    var x = ev.clientX, best = null, bd = 1e9;
    if (!x && ev.detail === 0) { if (RootStencilCore.moveGap(st, 1) === 'set') { this.api.sound(500); this._clearHelp(); this._paint(); } return; }
    for (var g = 1; g < ls.length; g++) { var gx = (ls[g - 1].getBoundingClientRect().right + ls[g].getBoundingClientRect().left) / 2, d = Math.abs(gx - x); if (d < bd) { bd = d; best = g; } }
    if (best != null && RootStencilCore.setGap(st, best) === 'set') { this.api.sound(500); this._clearHelp(); this._paint(); }
  },

  /* ---------------- Check: the stencil drops ---------------- */
  _check: function () {
    var C = RootStencilCore, st = this.st, v = this._view;
    if (st.done) return;
    this._nudged = true;
    var a = C.check(st);
    if (a.result === 'ok') { this._success(); return; }
    var h = C.hint(st); v.nudge = false; v.note = this._t(h.key, h.args);
    if (a.result === 'tray') { this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    this.api.sound(180);
    var m = st.marks || {}, self = this;
    if (a.kind === 'wrongLetter') { var w = m.windows.map(function (x, i) { return x.ok ? null : self._t('aWin', { n: i + 1, a: x.shows || '—', b: x.needs }); }).filter(Boolean); this._sr(w.join(' ')); }
    else if (a.kind === 'fakeEnding') this._sr(this._t('aNoEnd', { s: m.leftover }));
    this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = RootStencilCore, st = this.st, v = this._view, R = st.R, H = this._hookList(st.clue);
    if (st.clue === 'find') v.ok = this._t('okFind', { built: R.built, root: R.root, end: R.end });
    else if (st.clue === 'peel') { v.ok = this._t('okPeel', { root: R.root, end: R.end, built: R.built }); var sd = C.sound(st.loc, R.built); if (sd) v.ok += ' ' + this._t('okSay', { s: sd }); }
    else { var P = C.sentenceParts(st); v.ok = this._t('okAdd', { line: (P.before + R.root + R.end + P.after).trim(), mean: C.meaning(st.loc, R.end) }); }
    (H[R.end] = H[R.end] || []).push(st.clue === 'add' ? R.root + R.end : R.built);
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._speak(st.clue === 'add' ? R.root + R.end : R.built);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectRootStencilCSS() {
  if (typeof document === 'undefined' || document.getElementById('rs-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#3B2A1A';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rs-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .rs-wrap:focus{outline:none;} .rs-wrap.is-narrow{gap:9px;}'
  /* hooks */
  + '.rs-hooks{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:100%;} .rs-hook{display:flex;align-items:center;gap:4px;min-height:30px;padding:3px 8px 3px 4px;border-radius:10px;background:#F6EBD6;box-shadow:inset 0 -3px 0 #E3CFA8;}'
  + '.rs-tube{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:24px;padding:0 7px;border-radius:12px;background:#E8A53A;box-shadow:inset 0 -3px 0 #C1832A,0 0 0 2px ' + INK + ';font-family:' + H + ';font-weight:800;font-size:16px;color:' + INK + ';}'
  + '.rs-tag{padding:0 5px;border-radius:5px;background:#FFFDF7;box-shadow:0 0 0 1px #D9C39A;font-family:' + H + ';font-weight:700;font-size:13px;line-height:1.35;color:' + INK + ';} .rs-wrap.is-tiny .rs-tag{display:none;}'
  /* bench */
  + '.rs-bench{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;padding:12px 8px 14px;box-sizing:border-box;border-radius:18px;background:linear-gradient(#FBF3E4,#F3E3C6);box-shadow:inset 0 -5px 0 #E3CFA8;}'
  + '.rs-pics{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;} .rs-pic{display:flex;align-items:center;justify-content:center;border:3px solid ' + INK + ';border-radius:18px;background:#FFF8EC;box-sizing:border-box;flex:none;} .rs-pic img{display:block;object-fit:contain;pointer-events:none;} .rs-pic.is-nod{animation:rsNod .7s ease-in-out;} .rs-wrap.is-fast .rs-pic.is-nod{animation:none;}'
  + '@keyframes rsNod{0%,100%{transform:none;}40%{transform:rotate(-4deg) translateY(-4px);}70%{transform:rotate(3deg);}}'
  + '.rs-frame{display:flex;justify-content:center;width:100%;max-width:520px;padding:10px 12px;box-sizing:border-box;border-radius:14px;background:#B98552;box-shadow:inset 0 0 0 4px #8C5E33,inset 0 3px 8px rgba(0,0,0,.25);}'
  + '.rs-slot{position:relative;display:block;width:100%;min-height:64px;border:3px dashed #F3E3C6;border-radius:10px;background:rgba(255,248,236,.18);} .rs-edge{position:absolute;left:12px;right:12px;top:-6px;height:6px;border-radius:3px 3px 0 0;background:#FFF8EC;box-shadow:0 0 0 2px ' + INK + ';}'
  + '.rs-word{position:relative;display:flex;justify-content:center;align-items:center;min-height:64px;width:100%;padding:8px 4px;border:0;border-radius:10px;background:#FFF8EC;box-shadow:0 3px 0 #E3CFA8;cursor:pointer;} .rs-word:disabled{cursor:default;} .rs-word.is-peel{cursor:col-resize;touch-action:manipulation;}'
  + '.rs-letters{position:relative;display:inline-flex;align-items:center;padding:0 4px;font-family:' + H + ';font-weight:800;line-height:1;color:' + INK + ';}'
  + '.rs-l{display:inline-flex;align-items:center;justify-content:center;flex:none;transition:transform .2s;} .rs-l.is-right{transform:translateX(6px);} .rs-l.is-droop{transform:translateY(10px) rotate(8deg);color:#9A5B3B;} .rs-l.is-sleeved{color:' + INK + ';transform:translateX(6px);} .rs-wrap.is-fast .rs-l{transition:none;}'
  + '.rs-zip{position:absolute;top:8%;bottom:8%;border-radius:12px;background:rgba(232,165,58,.55);box-shadow:0 0 0 3px #E8A53A,inset 0 -4px 0 rgba(193,131,42,.6);pointer-events:none;transform:translateX(6px);}'
  + '.rs-line{position:absolute;z-index:2;top:-10px;bottom:-10px;width:5px;margin-left:-2px;border-radius:3px;background:#1F7A99;box-shadow:0 0 0 2px #FFF8EC;pointer-events:none;}'
  + '.rs-stencil{position:absolute;left:0;top:-8px;bottom:-8px;display:flex;align-items:stretch;gap:4px;padding:0 4px;box-sizing:border-box;border-radius:8px;background:rgba(255,248,236,.0);box-shadow:0 0 0 4px #F4E2BE,0 0 0 6px ' + INK + ';pointer-events:none;transform-origin:50% 100%;}'
  + '.rs-win{position:relative;display:block;margin:6px 0;border-radius:5px;box-shadow:0 0 0 3px #F4E2BE;} .rs-win.is-good{box-shadow:0 0 0 3px #F4E2BE,inset 0 0 0 3px #F4CF62;} .rs-win.is-bad{box-shadow:0 0 0 3px #F4E2BE,inset 0 0 0 4px #E0503C;background:rgba(224,80,60,.16);}'
  + '.rs-win b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;line-height:1;color:#1F7A99;}'
  + '.rs-stencil.is-reveal{background:#FFF8EC;} .rs-stencil.is-reveal .rs-win{background:#EAF6F3;} .rs-stencil.is-rock{animation:rsRock .7s ease-in-out;} .rs-stencil.is-flat{animation:rsDrop .25s ease-out;} .rs-wrap.is-fast .rs-stencil{animation:none;}'
  + '@keyframes rsRock{0%{transform:translateY(-16px);}30%{transform:rotate(-5deg);}55%{transform:rotate(4deg);}80%{transform:rotate(-2deg);}100%{transform:none;}} @keyframes rsDrop{0%{transform:translateY(-18px);opacity:.4;}100%{transform:none;opacity:1;}}'
  /* sentence */
  + '.rs-sentence{margin:0;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:24px;line-height:1.9;color:' + INK + ';} .rs-wrap.is-narrow .rs-sentence{font-size:21px;} .rs-wrap.is-tiny .rs-sentence{font-size:19px;}'
  + '.rs-gapword{display:inline-flex;align-items:center;margin:0 4px;padding:0 6px;border-radius:10px;background:#FFF8EC;box-shadow:0 0 0 3px #B98552;font-family:' + H + ';font-weight:800;line-height:1.4;vertical-align:middle;} .rs-gapword.is-done{box-shadow:0 0 0 3px #E8A53A;}'
  + '.rs-hole{display:inline-block;width:36px;height:24px;margin-left:3px;border-radius:12px;border:2px dashed #C1832A;} .rs-on{margin-left:2px;padding:0 6px;border-radius:12px;background:#E8A53A;box-shadow:inset 0 -3px 0 #C1832A;}'
  + '.rs-sig{border-radius:6px;padding:0 2px;transition:background .2s;} .rs-sig.is-lit{background:#F4CF62;} .rs-sig.is-thread{box-shadow:0 0 0 3px #E8A53A;}'
  /* tray */
  + '.rs-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%;} .rs-tray.is-empty{display:none;}'
  + '.rs-card{flex:1 1 0;min-width:0;max-width:170px;min-height:64px;padding:4px 8px;border:3px solid ' + INK + ';border-radius:14px;background:#FFF8EC;box-shadow:0 4px 0 #D9C39A;font-family:' + H + ';font-weight:800;font-size:25px;line-height:1.1;color:' + INK + ';cursor:pointer;overflow-wrap:anywhere;}'
  + '.rs-card.is-out{opacity:.35;box-shadow:none;border-style:dashed;} .rs-card:disabled{cursor:default;}'
  + '.rs-wrap.is-narrow .rs-tray{display:grid;grid-template-columns:1fr 1fr;gap:8px;} .rs-wrap.is-narrow .rs-card{max-width:none;min-height:56px;font-size:22px;} .rs-wrap.is-tiny .rs-card{min-height:52px;font-size:19px;padding:4px 4px;}'
  + '.rs-wrap.clue-add .rs-tray{display:flex;} .rs-sleeve{min-width:88px;min-height:56px;padding:0 16px;border:0;border-radius:28px;background:#E8A53A;box-shadow:inset 0 -5px 0 #C1832A,0 0 0 3px ' + INK + ';font-family:' + H + ';font-weight:800;font-size:26px;color:' + INK + ';cursor:pointer;}'
  + '.rs-sleeve.is-on{box-shadow:inset 0 -5px 0 #C1832A,0 0 0 3px ' + INK + ',0 0 0 7px #F4CF62;} .rs-sleeve.is-pop{animation:rsPop .45s ease-out;} .rs-wrap.is-fast .rs-sleeve{animation:none;} .rs-wrap.is-tiny .rs-sleeve{min-width:72px;min-height:52px;font-size:22px;}'
  + '@keyframes rsPop{0%{transform:translateY(-18px) rotate(-8deg);}100%{transform:none;}}'
  + '.rs-foot{display:flex;justify-content:center;width:100%;}'
  + '.rs-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .rs-check:disabled{opacity:.5;cursor:default;}'
  + '.rs-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .rs-note.is-hint{color:#8A3B1F;} .rs-note.is-nudge{color:#5E6770;} .rs-wrap.is-narrow .rs-note{font-size:17px;}'
  + '.rs-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.rs-wrap.is-tiny{gap:6px;} .rs-wrap.is-tiny .rs-bench{gap:7px;padding:8px 4px 10px;} .rs-wrap.is-tiny .rs-frame{padding:7px 8px;} .rs-wrap.is-tiny .rs-hook{min-height:26px;} .rs-wrap.is-tiny .rs-word{min-height:56px;}'
  + '.rs-wrap.is-tiny .rs-check{min-width:112px;padding:8px 14px;font-size:20px;}'
  + '.rs-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'rs-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.RootStencilActivity = RootStencilActivity;
