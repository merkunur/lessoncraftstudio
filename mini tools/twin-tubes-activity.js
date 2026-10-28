/* =====================================================================
   twin-tubes-activity.js — ACTIVITY #142 of the one-by-one rebuild:
   "Three Ways to Show a Number" → THE TWIN TUBES (2.NBT.A.3; G2-223/225;
   all 11 locales). Model: twin-tubes-core.js (TwinTubesCore). Number
   words: PlaceValueCore._NUMBER_WORD_HELPERS (place-value-core.js, read
   only). Design: docs/activities-rebuild/designs/142-match-pairs.md
   ---------------------------------------------------------------------
   The invention: put two cards in the twin stand and each pours its
   hundreds, tens and ones into its own three glass tubes — a numeral
   digit by digit, an expanded card part by part, a word card in the
   order its words name the places. Two cards clip together only when all
   three pairs of tubes stand level. The word card pours into FROSTED
   glass (you see the liquid arrive, not its height), so reading the
   number name stays the child's job; a clip melts the frost. A miss
   rings the uneven place; a second miss writes each part over its tube.
   No timer, no score.
   Test seams: window.TwinTubesActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._put / ._out / .FAST /
   .OK_MS.
   ===================================================================== */
var TwinTubesActivity = {
  id: 'twin-tubes',
  /* the drawn apparatus (the hierarchy gate): the deck of cards, the stand, the tubes, the shelf */
  apparatusClasses: ['tt-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Three Ways to Show a Number","de":"Drei Arten, eine Zahl zu zeigen","fr":"Trois façons d’écrire un nombre","es":"Tres formas de mostrar un número","pt":"Três jeitos de mostrar um número","it":"Tre modi per scrivere un numero","nl":"Drie manieren om een getal te laten zien","sv":"Tre sätt att visa ett tal","da":"Tre måder at vise et tal på","no":"Tre måter å vise et tall på","fi":"Kolme tapaa näyttää luku"},
    instruction: {"en":"Put two cards in the stand: each one pours its hundreds, tens and ones into tubes. Cards that show the same number fill the tubes to the same levels.","de":"Leg zwei Karten in den Ständer: Jede gießt ihre Hunderter, Zehner und Einer in Röhren. Karten mit derselben Zahl füllen die Röhren gleich hoch.","fr":"Pose deux cartes dans le support : chacune verse ses centaines, ses dizaines et ses unités dans des tubes. Les cartes qui montrent le même nombre remplissent les tubes à la même hauteur.","es":"Pon dos tarjetas en el soporte: cada una vierte sus centenas, decenas y unidades en tubos. Las tarjetas que muestran el mismo número llenan los tubos a la misma altura.","pt":"Coloque duas cartas no suporte: cada uma despeja suas centenas, dezenas e unidades em tubos. Cartas que mostram o mesmo número enchem os tubos na mesma altura.","it":"Metti due carte nel supporto: ognuna versa centinaia, decine e unità nei tubi. Le carte che mostrano lo stesso numero riempiono i tubi alla stessa altezza.","nl":"Zet twee kaarten in het rek: elke kaart giet haar honderdtallen, tientallen en eenheden in buisjes. Kaarten met hetzelfde getal vullen de buisjes even hoog.","sv":"Sätt två kort i stativet: varje kort häller sina hundratal, tiotal och ental i rör. Kort som visar samma tal fyller rören lika högt.","da":"Sæt to kort i stativet: hvert kort hælder sine hundreder, tiere og enere i rør. Kort, der viser det samme tal, fylder rørene lige højt.","no":"Sett to kort i stativet: hvert kort heller hundrerne, tierne og enerne sine i rør. Kort som viser det samme tallet, fyller rørene like høyt.","fi":"Laita kaksi korttia telineeseen: kumpikin kaataa sadat, kymmenet ja ykköset putkiin. Kortit, joissa on sama luku, täyttävät putket yhtä korkealle."},
    pThree: {"en":"Find the three cards that show the same number. Pour two at a time.","de":"Finde die drei Karten, die dieselbe Zahl zeigen. Gieß immer zwei auf einmal.","fr":"Trouve les trois cartes qui montrent le même nombre. Verse-les deux par deux.","es":"Encuentra las tres tarjetas que muestran el mismo número. Vierte dos a la vez.","pt":"Encontre as três cartas que mostram o mesmo número. Despeje duas de cada vez.","it":"Trova le tre carte che mostrano lo stesso numero. Versale due alla volta.","nl":"Zoek de drie kaarten die hetzelfde getal laten zien. Giet steeds twee kaarten tegelijk.","sv":"Hitta de tre korten som visar samma tal. Häll två i taget.","da":"Find de tre kort, der viser det samme tal. Hæld to ad gangen.","no":"Finn de tre kortene som viser det samme tallet. Hell to om gangen.","fi":"Etsi kolme korttia, joissa on sama luku. Kaada kaksi kerrallaan."},
    pDigit: {"en":"What is the colored digit worth? Pour two cards at a time.","de":"Wie viel ist die farbige Ziffer wert? Gieß immer zwei Karten auf einmal.","fr":"Combien vaut le chiffre en couleur ? Verse les cartes deux par deux.","es":"¿Cuánto vale la cifra de color? Vierte dos tarjetas a la vez.","pt":"Quanto vale o algarismo destacado? Despeje duas cartas de cada vez.","it":"Quanto vale la cifra colorata? Versa le carte due alla volta.","nl":"Hoeveel is het gekleurde cijfer waard? Giet steeds twee kaarten tegelijk.","sv":"Hur mycket är den färgade siffran värd? Häll två kort i taget.","da":"Hvor meget er det farvede ciffer værd? Hæld to kort ad gangen.","no":"Hvor mye er det fargede sifferet verdt? Hell to kort om gangen.","fi":"Paljonko värillinen numero on arvoltaan? Kaada kaksi korttia kerrallaan."},
    hSecond: {"en":"Put a second card in the stand.","de":"Leg eine zweite Karte in den Ständer.","fr":"Pose une deuxième carte dans le support.","es":"Pon una segunda tarjeta en el soporte.","pt":"Coloque uma segunda carta no suporte.","it":"Metti una seconda carta nel supporto.","nl":"Zet een tweede kaart in het rek.","sv":"Sätt ett andra kort i stativet.","da":"Sæt et kort mere i stativet.","no":"Sett ett kort til i stativet.","fi":"Laita telineeseen toinen kortti."},
    notH: {"en":"The hundreds are not the same.","de":"Die Hunderter sind nicht gleich.","fr":"Les centaines ne sont pas pareilles.","es":"Las centenas no son iguales.","pt":"As centenas não são iguais.","it":"Le centinaia non sono uguali.","nl":"De honderdtallen zijn niet gelijk.","sv":"Hundratalen är inte lika.","da":"Hundrederne er ikke ens.","no":"Hundrerne er ikke like.","fi":"Sadat eivät ole samat."},
    notT: {"en":"The tens are not the same.","de":"Die Zehner sind nicht gleich.","fr":"Les dizaines ne sont pas pareilles.","es":"Las decenas no son iguales.","pt":"As dezenas não são iguais.","it":"Le decine non sono uguali.","nl":"De tientallen zijn niet gelijk.","sv":"Tiotalen är inte lika.","da":"Tierne er ikke ens.","no":"Tierne er ikke like.","fi":"Kymmenet eivät ole samat."},
    notO: {"en":"The ones are not the same.","de":"Die Einer sind nicht gleich.","fr":"Les unités ne sont pas pareilles.","es":"Las unidades no son iguales.","pt":"As unidades não são iguais.","it":"Le unità non sono uguali.","nl":"De eenheden zijn niet gelijk.","sv":"Entalen är inte lika.","da":"Enerne er ikke ens.","no":"Enerne er ikke like.","fi":"Ykköset eivät ole samat."},
    diffH: {"en":"The hundreds are different: {a} and {b}.","de":"Die Hunderter sind verschieden: {a} und {b}.","fr":"Les centaines sont différentes : {a} et {b}.","es":"Las centenas son diferentes: {a} y {b}.","pt":"As centenas são diferentes: {a} e {b}.","it":"Le centinaia sono diverse: {a} e {b}.","nl":"De honderdtallen zijn verschillend: {a} en {b}.","sv":"Hundratalen är olika: {a} och {b}.","da":"Hundrederne er forskellige: {a} og {b}.","no":"Hundrerne er forskjellige: {a} og {b}.","fi":"Sadat ovat erilaiset: {a} ja {b}."},
    diffT: {"en":"The tens are different: {a} and {b}.","de":"Die Zehner sind verschieden: {a} und {b}.","fr":"Les dizaines sont différentes : {a} et {b}.","es":"Las decenas son diferentes: {a} y {b}.","pt":"As dezenas são diferentes: {a} e {b}.","it":"Le decine sono diverse: {a} e {b}.","nl":"De tientallen zijn verschillend: {a} en {b}.","sv":"Tiotalen är olika: {a} och {b}.","da":"Tierne er forskellige: {a} og {b}.","no":"Tierne er forskjellige: {a} og {b}.","fi":"Kymmenet ovat erilaiset: {a} ja {b}."},
    diffO: {"en":"The ones are different: {a} and {b}.","de":"Die Einer sind verschieden: {a} und {b}.","fr":"Les unités sont différentes : {a} et {b}.","es":"Las unidades son diferentes: {a} y {b}.","pt":"As unidades são diferentes: {a} e {b}.","it":"Le unità sono diverse: {a} e {b}.","nl":"De eenheden zijn verschillend: {a} en {b}.","sv":"Entalen är olika: {a} och {b}.","da":"Enerne er forskellige: {a} og {b}.","no":"Enerne er forskjellige: {a} og {b}.","fi":"Ykköset ovat erilaiset: {a} ja {b}."},
    hasCard: {"en":"The card with clear tubes has {count}.","de":"Die Karte mit den klaren Röhren hat {count}.","fr":"La carte aux tubes clairs a {count}.","es":"La tarjeta de los tubos transparentes tiene {count}.","pt":"A carta dos tubos transparentes tem {count}.","it":"La carta con i tubi trasparenti ha {count}.","nl":"De kaart met de heldere buisjes heeft {count}.","sv":"Kortet med de klara rören har {count}.","da":"Kortet med de klare rør har {count}.","no":"Kortet med de klare rørene har {count}.","fi":"Kirkkaiden putkien kortissa on {count}."},
    cH0: {"en":"no hundreds","de":"keine Hunderter","fr":"zéro centaine","es":"cero centenas","pt":"zero centena","it":"zero centinaia","nl":"geen honderdtallen","sv":"inga hundratal","da":"ingen hundreder","no":"ingen hundrere","fi":"nolla sataa"},
    cH1: {"en":"1 hundred","de":"1 Hunderter","fr":"1 centaine","es":"1 centena","pt":"1 centena","it":"1 centinaio","nl":"1 honderdtal","sv":"1 hundratal","da":"1 hundrede","no":"1 hundrer","fi":"1 sata"},
    cHn: {"en":"{k} hundreds","de":"{k} Hunderter","fr":"{k} centaines","es":"{k} centenas","pt":"{k} centenas","it":"{k} centinaia","nl":"{k} honderdtallen","sv":"{k} hundratal","da":"{k} hundreder","no":"{k} hundrere","fi":"{k} sataa"},
    cT0: {"en":"no tens","de":"keine Zehner","fr":"zéro dizaine","es":"cero decenas","pt":"zero dezena","it":"zero decine","nl":"geen tientallen","sv":"inga tiotal","da":"ingen tiere","no":"ingen tiere","fi":"nolla kymmentä"},
    cT1: {"en":"1 ten","de":"1 Zehner","fr":"1 dizaine","es":"1 decena","pt":"1 dezena","it":"1 decina","nl":"1 tiental","sv":"1 tiotal","da":"1 tier","no":"1 tier","fi":"1 kymmen"},
    cTn: {"en":"{k} tens","de":"{k} Zehner","fr":"{k} dizaines","es":"{k} decenas","pt":"{k} dezenas","it":"{k} decine","nl":"{k} tientallen","sv":"{k} tiotal","da":"{k} tiere","no":"{k} tiere","fi":"{k} kymmentä"},
    cO0: {"en":"no ones","de":"keine Einer","fr":"zéro unité","es":"cero unidades","pt":"zero unidade","it":"zero unità","nl":"geen eenheden","sv":"inga ental","da":"ingen enere","no":"ingen enere","fi":"nolla ykköstä"},
    cO1: {"en":"1 one","de":"1 Einer","fr":"1 unité","es":"1 unidad","pt":"1 unidade","it":"1 unità","nl":"1 eenheid","sv":"1 ental","da":"1 ener","no":"1 ener","fi":"1 ykkönen"},
    cOn: {"en":"{k} ones","de":"{k} Einer","fr":"{k} unités","es":"{k} unidades","pt":"{k} unidades","it":"{k} unità","nl":"{k} eenheden","sv":"{k} ental","da":"{k} enere","no":"{k} enere","fi":"{k} ykköstä"},
    miss2: {"en":"Each part goes in its own tube. Look for the card that fills the same tubes.","de":"Jeder Teil kommt in seine eigene Röhre. Such die Karte, die dieselben Röhren füllt.","fr":"Chaque partie va dans son propre tube. Cherche la carte qui remplit les mêmes tubes.","es":"Cada parte va en su propio tubo. Busca la tarjeta que llena los mismos tubos.","pt":"Cada parte vai para o seu próprio tubo. Procure a carta que enche os mesmos tubos.","it":"Ogni parte va nel suo tubo. Cerca la carta che riempie gli stessi tubi.","nl":"Elk deel gaat in een eigen buisje. Zoek de kaart die dezelfde buisjes vult.","sv":"Varje del hamnar i sitt eget rör. Leta efter kortet som fyller samma rör.","da":"Hver del kommer i sit eget rør. Find det kort, der fylder de samme rør.","no":"Hver del havner i sitt eget rør. Finn kortet som fyller de samme rørene.","fi":"Jokainen osa menee omaan putkeensa. Etsi kortti, joka täyttää samat putket."},
    okPair: {"en":"Same number! Now find its third card.","de":"Dieselbe Zahl! Jetzt finde ihre dritte Karte.","fr":"Le même nombre ! Trouve maintenant sa troisième carte.","es":"¡El mismo número! Ahora encuentra su tercera tarjeta.","pt":"O mesmo número! Agora encontre a terceira carta.","it":"Lo stesso numero! Ora trova la sua terza carta.","nl":"Hetzelfde getal! Zoek nu de derde kaart.","sv":"Samma tal! Hitta nu det tredje kortet.","da":"Det samme tal! Find nu det tredje kort.","no":"Det samme tallet! Finn nå det tredje kortet.","fi":"Sama luku! Etsi nyt sen kolmas kortti."},
    okTriple: {"en":"{numeral} — {word} — {expanded}!","de":"{numeral} – {word} – {expanded}!","fr":"{numeral} — {word} — {expanded} !","es":"¡{numeral} — {word} — {expanded}!","pt":"{numeral} — {word} — {expanded}!","it":"{numeral} — {word} — {expanded}!","nl":"{numeral} – {word} – {expanded}!","sv":"{numeral} – {word} – {expanded}!","da":"{numeral} – {word} – {expanded}!","no":"{numeral} – {word} – {expanded}!","fi":"{numeral} – {word} – {expanded}!"},
    okDigit: {"en":"The {d} in {numeral} is worth {value}!","de":"Die {d} in {numeral} ist {value} wert!","fr":"Le {d} de {numeral} vaut {value} !","es":"¡El {d} de {numeral} vale {value}!","pt":"O {d} de {numeral} vale {value}!","it":"Il {d} di {numeral} vale {value}!","nl":"De {d} in {numeral} is {value} waard!","sv":"Siffran {d} i {numeral} är värd {value}!","da":"Cifret {d} i {numeral} er {value} værd!","no":"Sifferet {d} i {numeral} er verdt {value}!","fi":"Luvussa {numeral} numeron {d} arvo on {value}!"},
    setCards: {"en":"Cards","de":"Karten","fr":"Cartes","es":"Tarjetas","pt":"Cartas","it":"Carte","nl":"Kaarten","sv":"Kort","da":"Kort","no":"Kort","fi":"Kortit"},
    cThree: {"en":"Three ways","de":"Drei Arten","fr":"Trois écritures","es":"Tres formas","pt":"Três jeitos","it":"Tre modi","nl":"Drie manieren","sv":"Tre sätt","da":"Tre måder","no":"Tre måter","fi":"Kolme tapaa"},
    cDigit: {"en":"Digit values","de":"Wert der Ziffer","fr":"Valeur du chiffre","es":"Valor de la cifra","pt":"Valor do algarismo","it":"Valore della cifra","nl":"Waarde van het cijfer","sv":"Siffrans värde","da":"Cifrets værdi","no":"Sifferets verdi","fi":"Numeron arvo"},
    setNums: {"en":"Numbers","de":"Zahlen","fr":"Nombres","es":"Números","pt":"Números","it":"Numeri","nl":"Getallen","sv":"Tal","da":"Tal","no":"Tall","fi":"Luvut"},
    nNo: {"en":"Without zeros","de":"Ohne Nullen","fr":"Sans zéro","es":"Sin ceros","pt":"Sem zeros","it":"Senza zeri","nl":"Zonder nullen","sv":"Utan nollor","da":"Uden nuller","no":"Uten nuller","fi":"Ilman nollia"},
    nZero: {"en":"With zeros","de":"Mit Nullen","fr":"Avec des zéros","es":"Con ceros","pt":"Com zeros","it":"Con gli zeri","nl":"Met nullen","sv":"Med nollor","da":"Med nuller","no":"Med nuller","fi":"Nollien kanssa"},
    aNum: {"en":"Numeral card: {t}","de":"Zahlkarte: {t}","fr":"Carte nombre : {t}","es":"Tarjeta con número: {t}","pt":"Carta com número: {t}","it":"Carta con il numero: {t}","nl":"Getalkaart: {t}","sv":"Sifferkort: {t}","da":"Talkort: {t}","no":"Tallkort: {t}","fi":"Lukukortti: {t}"},
    aWord: {"en":"Word card: {t}","de":"Wortkarte: {t}","fr":"Carte en lettres : {t}","es":"Tarjeta con palabras: {t}","pt":"Carta por extenso: {t}","it":"Carta in lettere: {t}","nl":"Woordkaart: {t}","sv":"Ordkort: {t}","da":"Ordkort: {t}","no":"Ordkort: {t}","fi":"Sanakortti: {t}"},
    aExp: {"en":"Expanded card: {t}","de":"Zerlegungskarte: {t}","fr":"Carte décomposée : {t}","es":"Tarjeta desarrollada: {t}","pt":"Carta decomposta: {t}","it":"Carta scomposta: {t}","nl":"Splitskaart: {t}","sv":"Uppdelat kort: {t}","da":"Opdelt kort: {t}","no":"Oppdelt kort: {t}","fi":"Hajotelmakortti: {t}"},
    aLit: {"en":"Numeral card {t}, colored digit {d}","de":"Zahlkarte {t}, farbige Ziffer {d}","fr":"Carte nombre {t}, chiffre en couleur {d}","es":"Tarjeta con número {t}, cifra de color {d}","pt":"Carta com número {t}, algarismo destacado {d}","it":"Carta con il numero {t}, cifra colorata {d}","nl":"Getalkaart {t}, gekleurd cijfer {d}","sv":"Sifferkort {t}, färgad siffra {d}","da":"Talkort {t}, farvet ciffer {d}","no":"Tallkort {t}, farget siffer {d}","fi":"Lukukortti {t}, värillinen numero {d}"},
    aVal: {"en":"Value card: {t}","de":"Wertkarte: {t}","fr":"Carte valeur : {t}","es":"Tarjeta de valor: {t}","pt":"Carta de valor: {t}","it":"Carta del valore: {t}","nl":"Waardekaart: {t}","sv":"Värdekort: {t}","da":"Værdikort: {t}","no":"Verdikort: {t}","fi":"Arvokortti: {t}"},
    aCradle: {"en":"Stand slot {i}: {t}","de":"Platz {i} im Ständer: {t}","fr":"Place {i} du support : {t}","es":"Lugar {i} del soporte: {t}","pt":"Lugar {i} do suporte: {t}","it":"Posto {i} del supporto: {t}","nl":"Plek {i} in het rek: {t}","sv":"Plats {i} i stativet: {t}","da":"Plads {i} i stativet: {t}","no":"Plass {i} i stativet: {t}","fi":"Telineen paikka {i}: {t}"},
    aCradleEmpty: {"en":"Stand slot {i}, empty","de":"Platz {i} im Ständer, leer","fr":"Place {i} du support, vide","es":"Lugar {i} del soporte, vacío","pt":"Lugar {i} do suporte, vazio","it":"Posto {i} del supporto, vuoto","nl":"Plek {i} in het rek, leeg","sv":"Plats {i} i stativet, tom","da":"Plads {i} i stativet, tom","no":"Plass {i} i stativet, tom","fi":"Telineen paikka {i}, tyhjä"},
    aPair: {"en":"Matched pair: {t}","de":"Gefundenes Paar: {t}","fr":"Paire trouvée : {t}","es":"Pareja encontrada: {t}","pt":"Par encontrado: {t}","it":"Coppia trovata: {t}","nl":"Gevonden paar: {t}","sv":"Funnet par: {t}","da":"Fundet par: {t}","no":"Funnet par: {t}","fi":"Löydetty pari: {t}"},
  },/*STRINGS-END*/
  defaults: { cards: 'three', nums: 'nozero' },
  settings: [
    { key: 'cards', type: 'choice', labelKey: 'setCards', options: [{ value: 'three', labelKey: 'cThree' }, { value: 'digits', labelKey: 'cDigit' }] },
    { key: 'nums', type: 'choice', labelKey: 'setNums', options: [{ value: 'nozero', labelKey: 'nNo' }, { value: 'zeros', labelKey: 'nZero' }] }
  ],
  OK_MS: 500, FAST: false,
  PLACE_COLORS: ['#2E9C88', '#F2784B', '#E9B92E'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {};
    injectTwinTubesCSS();
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
  _cards: function () { return TwinTubesCore.cardsOf(this._setting('cards')); },
  _nums: function () { return TwinTubesCore.numsOf(this._setting('nums')); },
  _key: function () { return this._cards() + '|' + (this._cards() === 'digits' ? '' : this._nums()); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  /* the number words in the page's language, from the shipped helper */
  _words: function () {
    var H = typeof window !== 'undefined' && window.PlaceValueCore && window.PlaceValueCore._NUMBER_WORD_HELPERS, f = H && (H[this._loc()] || H.en);
    return function (n) { return f ? f(n, 'cardinal') : String(n); };
  },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TwinTubesCore.rounds(this._cards(), this._nums()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TwinTubesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._cards(), this._nums(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'twin-tubes.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () { return this._t(this._cards() === 'digits' ? 'pDigit' : 'pThree'); },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = TwinTubesCore.newState(this._cards(), this._nums(), k, this._words());
    this._view = { note: '', ok: '' };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth();
  },
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
  _dims: function () { var W = this._width(), B = TwinTubesCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'tt-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="tt-deck"></div><div class="tt-shelf tt-art"></div><div class="tt-stand tt-art"></div><p class="tt-note" aria-live="polite"></p><p class="tt-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { if (e.key === 'Backspace') { e.preventDefault(); var st = self.st; if (st) self._out(st.cradles[1] != null ? 1 : 0); } });
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
  _paint_: function () {
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'tt-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._paintDeck(D); this._paintStand(D); this._paintShelf(D);
    var note = this._qs('.tt-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'tt-note is-ok' + (st.done ? '' : ' is-step'); }
    else if (v.note) { note.textContent = v.note; note.className = 'tt-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'tt-note'; }
    this._setPrompt();
  },

  /* ---------- the deck: three rows, one per kind ---------- */
  _cardHTML: function (c) {
    if (c.kind === 'lit') return String(c.value).split('').map(function (d, i) { return i === c.lit ? '<b class="tt-lit">' + d + '</b>' : '<span>' + d + '</span>'; }).join('');
    /* a soft hyphen only where two chunks meet letter to letter (never beside a space or a real hyphen) */
    if (c.kind === 'word' && c.parts) return c.parts.map(function (p, i) { var prev = i ? c.parts[i - 1].text : ''; return (i && /\p{L}$/u.test(prev) && /^\p{L}/u.test(p.text) ? '&shy;' : '') + esc(p.text); }).join('');
    return esc(c.text);
  },
  _cardLabel: function (c) {
    var k = { num: 'aNum', word: 'aWord', exp: 'aExp', lit: 'aLit', val: 'aVal', valword: 'aWord' }[c.kind];
    return this._t(k, { t: c.text, d: c.kind === 'lit' ? c.digits[c.lit] : '' });
  },
  _paintDeck: function (D) {
    var st = this.st, self = this, deck = this._qs('.tt-deck'), C = TwinTubesCore; deck.innerHTML = '';
    [0, 1, 2].forEach(function (row) {
      var r = self.api.el('div', 'tt-row tt-row' + row);
      st.order[row].forEach(function (key) {
        var c = st.deck.filter(function (x) { return x.row === row && x.key === key; })[0], gone = C.used(st, c.id), placed = st.cradles.indexOf(c.id) >= 0;
        var b = self._btn('tt-card tt-art is-' + c.kind + (gone ? ' is-gone' : '') + (placed ? ' is-placed' : ''), c.id, self._cardLabel(c), self._cardHTML(c));
        b.disabled = gone || placed || st.done;
        b.addEventListener('click', function () { self._put(c.id); });
        r.appendChild(b);
      });
      deck.appendChild(r);
    });
  },

  /* ---------- the stand: two cradles, three tubes under each ---------- */
  _itemText: function (id) { var st = this.st; if (/^pair-/.test(id)) { var c = TwinTubesCore.card(st, st.found[+id.slice(5)].ids[0]); return c.kind === 'lit' ? String(c.value) : c.text; } return TwinTubesCore.card(st, id).text; },
  _itemHTML: function (id) { var st = this.st; if (/^pair-/.test(id)) { var f = st.found[+id.slice(5)]; return f.ids.map(function (x) { return '<span class="tt-mini">' + esc(TwinTubesCore.card(st, x).text) + '</span>'; }).join(''); } return this._cardHTML(TwinTubesCore.card(st, id)); },
  _countPhrase: function (place, k) { var P = ['H', 'T', 'O'][place]; return this._t('c' + P + (k === 0 ? '0' : k === 1 ? '1' : 'n'), { k: k }); },
  _tubesSVG: function (D, pour, side, L) {
    var st = this.st, self = this, tw = D.wide ? 44 : D.cramp ? 30 : 34, th = D.wide ? 160 : D.cramp ? 74 : 108, gap = D.wide ? 12 : 8, top = D.wide ? 30 : D.cramp ? 20 : 24, step = (th - 8) / 9;
    var W = tw * 3 + gap * 2, H = top + th + 6, h = '';
    var reveal = pour && (!pour.frost || L.revealed), ring = L.ringPlace, numbers = L.numbers, split = L.split;
    for (var p = 0; p < 3; p++) {
      var x = p * (tw + gap), cy = top / 2 + 2;
      /* the place glyph: a flat (hundreds), a rod (tens), a cube (ones) */
      if (p === 0) h += '<rect class="tt-glyph" x="' + (x + tw / 2 - 9) + '" y="' + (cy - 9) + '" width="18" height="18" rx="2"/>';
      else if (p === 1) h += '<rect class="tt-glyph" x="' + (x + tw / 2 - 3) + '" y="' + (cy - 11) + '" width="6" height="22" rx="1.5"/>';
      else h += '<rect class="tt-glyph" x="' + (x + tw / 2 - 4) + '" y="' + (cy - 4) + '" width="8" height="8" rx="1.5"/>';
      h += '<rect class="tt-glass' + (ring === p ? ' is-ring' : '') + '" x="' + (x + 1) + '" y="' + top + '" width="' + (tw - 2) + '" height="' + th + '" rx="' + (tw / 2 - 2) + '"/>';
      for (var m = 1; m <= 9; m++) h += '<line class="tt-mark" x1="' + (x + 3) + '" x2="' + (x + 9) + '" y1="' + (top + th - 4 - m * step) + '" y2="' + (top + th - 4 - m * step) + '"/>';
      if (pour) {
        var amt = pour.amt[p], idx = pour.order.indexOf(p), fh = amt * step;
        if (amt > 0) {
          if (reveal) h += '<rect class="tt-fill" style="fill:' + self.PLACE_COLORS[p] + ';animation-delay:' + (self.FAST ? 0 : idx * 0.32) + 's" x="' + (x + 3) + '" y="' + (top + th - 4 - fh) + '" width="' + (tw - 6) + '" height="' + fh + '" rx="4"/>';
          else h += '<rect class="tt-wet" style="fill:' + self.PLACE_COLORS[p] + ';animation-delay:' + (self.FAST ? 0 : idx * 0.32) + 's" x="' + (x + 3) + '" y="' + (top + 4) + '" width="' + (tw - 6) + '" height="' + (th - 8) + '" rx="' + (tw / 2 - 4) + '"/>';
        }
        if (!reveal) h += '<rect class="tt-frost" x="' + (x + 2) + '" y="' + (top + 1) + '" width="' + (tw - 4) + '" height="' + (th - 2) + '" rx="' + (tw / 2 - 3) + '"/>';
        if (numbers && ring === p) h += '<text class="tt-num" x="' + (x + tw / 2) + '" y="' + (top + th - 10) + '" text-anchor="middle">' + (reveal ? (amt > 0 ? amt : '') : '?') + '</text>';
      }
    }
    var label = split ? '<div class="tt-split">' + split + '</div>' : '';
    return label + '<svg class="tt-tubes tt-art" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>';
  },
  /* miss 2: a word or expanded card writes each part over the tube it fills */
  _splitHTML: function (id, D) {
    if (!id) return '';
    var cells = ['', '', ''], units = [100, 10, 1];
    if (/^pair-/.test(id)) { var am = TwinTubesCore.pourItem(this.st, id).amt; am.forEach(function (d, i) { if (d) cells[i] = String(d * units[i]); }); return cells.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join(''); }
    var c = TwinTubesCore.card(this.st, id);
    if (c.kind === 'word' || c.kind === 'valword') c.parts.forEach(function (p) { if (p.places.length) { var at = p.places[0]; cells[at] = (cells[at] ? cells[at] + ' ' : '') + p.text.trim(); } });
    else if (c.kind === 'lit') cells[c.lit] = String(c.digits[c.lit] * units[c.lit]);
    else if (c.kind === 'num' || c.kind === 'exp' || c.kind === 'val') { var d = c.digits; [100, 10, 1].forEach(function (u, i) { if (d[i]) cells[i] = String(d[i] * u); }); }
    else return '';
    return cells.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
  },
  _paintStand: function (D) {
    var st = this.st, self = this, stand = this._qs('.tt-stand'), L = st.last || {}; stand.innerHTML = '';
    var uneven = L.result === 'uneven', clipped = L.result === 'pair' || L.result === 'triple';
    var pr = st.poured;
    [0, 1].forEach(function (side) {
      var half = self.api.el('div', 'tt-half'), id = st.cradles[side], pour = pr ? (side === 0 ? pr.a : pr.b) : null;
      var cr = self._btn('tt-cradle tt-art' + (id ? ' is-full' : ' is-empty') + (id && !/^pair-/.test(id) && /word/.test(TwinTubesCore.card(st, id).kind) ? ' is-wordy' : '') + (st.cradles.filter(Boolean).length === 1 && !id ? ' is-wait' : ''), 'cradle-' + side,
        id ? self._t('aCradle', { i: side + 1, t: self._itemText(id) }) : self._t('aCradleEmpty', { i: side + 1 }), id ? self._itemHTML(id) : '');
      cr.disabled = !id || st.done;
      cr.addEventListener('click', function () { self._out(side); });
      half.appendChild(cr);
      var opts = { revealed: clipped, ringPlace: uneven ? L.place : null, numbers: uneven, split: uneven && st.help ? self._splitHTML(id, D) : '' };
      half.insertAdjacentHTML('beforeend', '<div class="tt-tubewrap' + (uneven ? ' is-wobble' : '') + (clipped ? ' is-level' : '') + '">' + self._tubesSVG(D, pour, side, opts) + '</div>');
      stand.appendChild(half);
    });
  },
  _paintShelf: function (D) {
    var st = this.st, self = this, shelf = this._qs('.tt-shelf'), C = TwinTubesCore; shelf.innerHTML = '';
    Object.keys(st.found).forEach(function (key) {
      var f = st.found[key], texts = f.ids.map(function (x) { return C.card(st, x); }).sort(function (p, q) { return p.row - q.row; }).map(function (c) { return c.text; });
      if (f.ids.length === 2) {
        var placed = st.cradles.indexOf('pair-' + key) >= 0;
        var b = self._btn('tt-pair tt-art' + (placed ? ' is-placed' : ''), 'pair-' + key, self._t('aPair', { t: texts.join(', ') }), texts.map(function (t) { return '<span class="tt-mini">' + esc(t) + '</span>'; }).join(''));
        b.disabled = placed || st.done;
        b.addEventListener('click', function () { self._put('pair-' + key); });
        shelf.appendChild(b);
      } else {
        var fan = self.api.el('div', 'tt-fan tt-art'); fan.innerHTML = texts.map(function (t) { return '<span class="tt-mini">' + esc(t) + '</span>'; }).join('');
        shelf.appendChild(fan);
      }
    });
    shelf.style.display = Object.keys(st.found).length ? '' : 'none';
  },

  /* ---------------- the hand ---------------- */
  _put: function (id) {
    var st = this.st, C = TwinTubesCore, v = this._view, r = C.put(st, id); if (r === 'no') return;
    v.note = ''; v.ok = ''; v.soft = false;
    this.api.sound(560);
    if (r === 'one') { v.note = this._t('hSecond'); v.soft = true; this._paint(); return; }
    var res = C.pour(st);
    if (res.result === 'pair') { v.ok = this._t('okPair'); this.api.sound(880); this._paint(); this.api.announce(v.ok); return; }
    if (res.result === 'triple') { var line = this._tripleLine(res.key); if (res.round) { this._success(line); return; } v.ok = line; this.api.sound(988); this._paint(); this.api.announce(line); return; }
    /* uneven: the place is named only after this miss — never before a pour */
    var k = C.hint(st), a = res.a, b = res.b, p = res.place;
    if (k === 'miss2') v.note = this._t('miss2');
    else if (/^diff/.test(k)) v.note = this._t(k, { a: this._countPhrase(p, a.amt[p]), b: this._countPhrase(p, b.amt[p]) });
    else if (a.frost && b.frost) v.note = this._t(k);
    else { var clear = a.frost ? b : a; v.note = this._t(k) + ' ' + this._t('hasCard', { count: this._countPhrase(p, clear.amt[p]) }); }
    this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _out: function (side) { if (TwinTubesCore.takeOut(this.st, side) === 'no') return; this._view.note = ''; this._view.ok = ''; this.api.sound(380); this._paint(); },
  _tripleLine: function (key) {
    var st = this.st, C = TwinTubesCore, ids = st.found[key].ids.map(function (x) { return C.card(st, x); });
    var get = function (kind) { return ids.filter(function (c) { return c.kind === kind; })[0]; };
    if (st.cards === 'digits') { var lit = get('lit'), val = get('val'); return this._t('okDigit', { d: lit.digits[lit.lit], numeral: lit.value, value: val.value }); }
    return this._t('okTriple', { numeral: get('num').text, word: get('word').text, expanded: get('exp').text });
  },
  _success: function (msg) {
    var v = this._view;
    v.note = ''; v.ok = msg;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectTwinTubesCSS() {
  if (typeof document === 'undefined' || document.getElementById('tt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tt-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .tt-wrap:focus{outline:none;}'
  + '.tt-deck{display:flex;flex-direction:column;gap:8px;} .tt-row{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;}'
  + '.tt-card{min-height:64px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;color:' + INK + ';cursor:pointer;padding:6px 10px;line-height:1.15;}'
  + '.tt-card.is-num,.tt-card.is-lit,.tt-card.is-val{width:150px;font-size:34px;} .tt-card.is-exp{width:150px;font-size:23px;} .tt-card.is-word,.tt-card.is-valword{width:206px;min-height:72px;font-family:' + B + ';font-size:18px;hyphens:manual;overflow-wrap:normal;}'
  + '.tt-card.is-gone{visibility:hidden;} .tt-wrap.is-done .tt-deck{display:none;} .tt-wrap.is-done.is-narrow .tt-stand{display:none;} .tt-card.is-placed{opacity:.35;} .tt-card:disabled{cursor:default;} .tt-card:hover:not(:disabled){box-shadow:inset 0 0 0 2px #146B5E,0 3px 0 #CDBFA4;}'
  + '.tt-lit{color:#E0663A;font-size:1.25em;text-decoration:underline 3px #F4CF62;text-underline-offset:4px;}'
  + '.tt-stand{display:flex;justify-content:center;gap:28px;padding:12px;border-radius:18px;background:linear-gradient(#F3E6CF,#E8D3AE);box-shadow:inset 0 0 0 3px #B68E57,0 4px 0 #9C7B4C;}'
  + '.tt-half{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;}'
  + '.tt-cradle{width:220px;min-height:78px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #8E6A3C;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';padding:4px 8px;line-height:1.1;cursor:pointer;} .tt-cradle.is-empty{background:rgba(255,255,255,.45);box-shadow:inset 0 0 0 2px #8E6A3C;border:2px dashed #8E6A3C;} .tt-cradle.is-wait{animation:ttPulse 1s ease-in-out infinite;} .tt-cradle:disabled{cursor:default;}'
  + '@keyframes ttPulse{50%{box-shadow:inset 0 0 0 3px #F2784B;}}'
  + '.tt-cradle .tt-lit{font-size:1.15em;} .tt-mini{display:block;font-size:15px;line-height:1.15;}'
  + '.tt-tubewrap{display:flex;flex-direction:column;align-items:center;} .tt-tubewrap.is-wobble .tt-tubes{animation:ttWob .45s 2;} @keyframes ttWob{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}} .tt-tubewrap.is-level .tt-glass{stroke:#2E9C88;stroke-width:3;}'
  + '.tt-tubes{display:block;} .tt-glyph{fill:#FFF8E8;stroke:' + INK + ';stroke-width:1.5;} .tt-glass{fill:rgba(255,255,255,.55);stroke:' + INK + ';stroke-width:2;} .tt-glass.is-ring{stroke:#E0663A;stroke-width:4;} .tt-mark{stroke:#8E8A98;stroke-width:1.5;}'
  + '.tt-fill{transform-box:fill-box;transform-origin:bottom;animation:ttGrow .45s ease-out both;} @keyframes ttGrow{from{transform:scaleY(0);}}'
  + '.tt-wet{opacity:.35;animation:ttWet .45s ease-out both;} @keyframes ttWet{from{opacity:0;}} .tt-frost{fill:rgba(240,246,250,.82);stroke:#C7D7E2;stroke-width:1;}'
  + '.tt-num{font-family:' + H + ';font-weight:800;font-size:16px;fill:' + INK + ';}'
  + '.tt-split{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;width:100%;font-family:' + B + ';font-weight:800;font-size:13px;color:#146B5E;text-align:center;line-height:1.1;} .tt-split span{min-height:15px;}'
  + '.tt-shelf{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;padding:8px;border-radius:14px;background:#EAF6F2;box-shadow:inset 0 0 0 2px #B8DCD2;}'
  + '.tt-pair,.tt-fan{min-height:48px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #2E9C88,0 3px 0 #9CCFC2;font-family:' + B + ';font-weight:800;color:' + INK + ';padding:4px 10px;} .tt-pair{cursor:pointer;} .tt-pair.is-placed{opacity:.35;} .tt-pair:disabled{cursor:default;} .tt-fan{background:#F4FBF8;box-shadow:inset 0 0 0 2px #9CCFC2;} .tt-pair,.tt-fan{text-align:center;} .tt-fan .tt-mini:first-child{font-family:' + H + ';font-size:22px;line-height:1.1;}'
  + '.tt-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .tt-note:empty{display:none;} .tt-note.is-hint{color:#9A3D1C;} .tt-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;} .tt-note.is-ok.is-step{position:static;width:auto;height:auto;clip:auto;}'
  + '.tt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.tt-wrap.is-narrow{gap:7px;} .tt-wrap.is-narrow .tt-deck{gap:4px;} .tt-wrap.is-narrow .tt-row{gap:5px;}'
  + '.tt-wrap.is-narrow .tt-card{min-height:44px;} .tt-wrap.is-narrow .tt-card.is-num,.tt-wrap.is-narrow .tt-card.is-lit,.tt-wrap.is-narrow .tt-card.is-val{width:calc((100% - 10px) / 3);font-size:28px;} .tt-wrap.is-narrow .tt-card.is-exp{width:calc((100% - 10px) / 3);font-size:16px;padding:4px;}'
  + '.tt-wrap.is-narrow .tt-row1{flex-direction:column;} .tt-wrap.is-narrow .tt-row1 .tt-card.is-gone{display:none;} .tt-wrap.is-narrow .tt-card.is-word,.tt-wrap.is-narrow .tt-card.is-valword{width:100%;min-height:44px;font-size:16px;white-space:nowrap;}'
  + '.tt-wrap.is-narrow .tt-stand{gap:10px;padding:6px 8px;} .tt-wrap.is-narrow .tt-cradle{width:100%;min-width:0;min-height:50px;font-size:16px;overflow-wrap:anywhere;} .tt-wrap.is-narrow .tt-half{gap:4px;flex:1 1 0;} .tt-wrap.is-narrow .tt-mini{font-size:12px;}'
  + '.tt-wrap.is-narrow .tt-note{font-size:16px;line-height:1.2;} .tt-wrap.is-cramp .tt-row1{display:grid;grid-template-columns:1fr 1fr;} .tt-wrap.is-cramp .tt-row1 > :last-child{grid-column:1 / -1;} .tt-wrap.is-cramp .tt-card.is-word,.tt-wrap.is-cramp .tt-card.is-valword{font-size:15px;white-space:normal;line-height:1.1;padding:3px 6px;} .tt-wrap.is-cramp .tt-cradle{min-height:44px;font-size:15px;} .tt-wrap.is-cramp .tt-cradle.is-wordy{font-size:13px;overflow-wrap:normal;} .tt-wrap.is-cramp .tt-stand{padding:4px 6px;}'
  + '.tt-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.tt-wrap *{animation:none !important;transition:none !important;}}'
  + '.tt-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'tt-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.TwinTubesActivity = TwinTubesActivity;
