/* =====================================================================
   flip-card-activity.js — ACTIVITY #56 of the one-by-one rebuild:
   "Pepper's Sound Swap" → PEPPER'S FLIP CARD (RF.K.2.e, 11 locales).
   Design sheet: docs/activities-rebuild/designs/056-pepper-sound-swap.md
   ---------------------------------------------------------------------
   THE INVENTION: the word sits on a flip card, its sounds on tiles along
   the bottom. Swap one tile and the old one pops out while the card flips
   over to the word the tiles now really make — the goal, a different real
   word, or a calm grey card with just its letters when the library has no
   picture for it (it never says "not a word").
     first / other / add — Pepper (the library parrot) brings a tile; the
       child predicts the new picture, then Check plays the swap.
     swap / chain — the child swaps from a tray of four tiles to reach the
       goal; in a chain the goal moves on after every step.

   ACTIVITY LAYER ONLY: the model is flip-card-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.FlipCardActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var FlipCardActivity = {
  id: 'flip-card',
  apparatusClasses: ['fcd-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'Pepper’s Flip Card',de:'Peppers Wendekarte',nl:'De draaikaart van Pepper',da:'Peppers vendekort',sv:'Peppers vändkort',no:'Peppers vendekort',es:'La tarjeta que se voltea',it:'La carta che si gira di Pepper',pt:'O cartão-surpresa da Pepper',fr:'La carte qui tourne de Pepper',fi:'Pepperin kääntökortti'},
    instruction:  {en:'Pepper changes one sound. What will the card turn into?',de:'Pepper ändert einen Laut. Was zeigt die Karte dann?',nl:'Pepper verandert één klank. Wat laat de kaart dan zien?',da:'Pepper skifter en lyd. Hvad viser kortet så?',sv:'Pepper byter ett ljud. Vad visar kortet då?',no:'Pepper bytter én lyd. Hva viser kortet da?',es:'Pepper cambia un sonido. ¿Qué mostrará la tarjeta?',it:'Pepper cambia un suono. Che cosa mostrerà la carta?',pt:'A Pepper troca um som. O que o cartão vai mostrar?',fr:'Pepper change un son. Que va montrer la carte ?',fi:'Pepper vaihtaa yhden äänteen. Mitä kortti näyttää?'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    pFirst:       {en:'{start}: change the first sound to {tile}. What is the new word?',de:'{start}: Tausche den ersten Laut gegen {tile}. Welches Wort entsteht?',nl:'{start}: verander de eerste klank in {tile}. Welk woord wordt het?',da:'{start}: skift den første lyd ud med {tile}. Hvilket ord bliver det?',sv:'{start}: byt det första ljudet mot {tile}. Vilket ord blir det?',no:'{start}: bytt den første lyden med {tile}. Hvilket ord blir det?',es:'{start}: cambia el primer sonido por {tile}. ¿Qué palabra se forma?',it:'{start}: cambia il primo suono con {tile}. Che parola diventa?',pt:'{start}: troque o primeiro som por {tile}. Que palavra vai ser?',fr:'{start} : remplace le premier son par {tile}. Quel mot obtiens-tu ?',fi:'Sana {start}: ensimmäisen äänteen tilalle tulee {tile}. Mikä sana syntyy?'},
    pMiddle:      {en:'{start}: change the middle sound to {tile}. What is the new word?',de:'{start}: Tausche den Laut in der Mitte gegen {tile}. Welches Wort entsteht?',nl:'{start}: verander de middelste klank in {tile}. Welk woord wordt het?',da:'{start}: skift lyden i midten ud med {tile}. Hvilket ord bliver det?',sv:'{start}: byt ljudet i mitten mot {tile}. Vilket ord blir det?',no:'{start}: bytt lyden i midten med {tile}. Hvilket ord blir det?',es:'{start}: cambia el sonido de en medio por {tile}. ¿Qué palabra se forma?',it:'{start}: cambia il suono in mezzo con {tile}. Che parola diventa?',pt:'{start}: troque o som do meio por {tile}. Que palavra vai ser?',fr:'{start} : remplace le son du milieu par {tile}. Quel mot obtiens-tu ?',fi:'Sana {start}: keskimmäisen äänteen tilalle tulee {tile}. Mikä sana syntyy?'},
    pLast:        {en:'{start}: change the last sound to {tile}. What is the new word?',de:'{start}: Tausche den letzten Laut gegen {tile}. Welches Wort entsteht?',nl:'{start}: verander de laatste klank in {tile}. Welk woord wordt het?',da:'{start}: skift den sidste lyd ud med {tile}. Hvilket ord bliver det?',sv:'{start}: byt det sista ljudet mot {tile}. Vilket ord blir det?',no:'{start}: bytt den siste lyden med {tile}. Hvilket ord blir det?',es:'{start}: cambia el último sonido por {tile}. ¿Qué palabra se forma?',it:'{start}: cambia l’ultimo suono con {tile}. Che parola diventa?',pt:'{start}: troque o último som por {tile}. Que palavra vai ser?',fr:'{start} : remplace le dernier son par {tile}. Quel mot obtiens-tu ?',fi:'Sana {start}: viimeisen äänteen tilalle tulee {tile}. Mikä sana syntyy?'},
    pAddStart:    {en:'Add {tile} to the start of {start}. What is the new word?',de:'Setz {tile} vor {start}. Welches Wort entsteht?',nl:'Zet {tile} vóór {start}. Welk woord wordt het?',da:'Sæt {tile} foran {start}. Hvilket ord bliver det?',sv:'Sätt {tile} före {start}. Vilket ord blir det?',no:'Sett {tile} foran {start}. Hvilket ord blir det?',es:'Pon {tile} antes de {start}. ¿Qué palabra se forma?',it:'Metti {tile} prima di {start}. Che parola diventa?',pt:'Coloque {tile} antes de {start}. Que palavra vai ser?',fr:'Mets {tile} devant {start}. Quel mot obtiens-tu ?',fi:'Sanan {start} alkuun tulee {tile}. Mikä sana syntyy?'},
    pAddEnd:      {en:'Add {tile} to the end of {start}. What is the new word?',de:'Häng {tile} an {start} an. Welches Wort entsteht?',nl:'Zet {tile} achter {start}. Welk woord wordt het?',da:'Sæt {tile} efter {start}. Hvilket ord bliver det?',sv:'Sätt {tile} efter {start}. Vilket ord blir det?',no:'Sett {tile} bak {start}. Hvilket ord blir det?',es:'Pon {tile} después de {start}. ¿Qué palabra se forma?',it:'Metti {tile} dopo {start}. Che parola diventa?',pt:'Coloque {tile} depois de {start}. Que palavra vai ser?',fr:'Mets {tile} après {start}. Quel mot obtiens-tu ?',fi:'Sanan {start} loppuun tulee {tile}. Mikä sana syntyy?'},
    pSwap:        {en:'Swap one tile to make {goal}.',de:'Tausche ein Plättchen, damit {goal} entsteht.',nl:'Wissel één tegel om {goal} te maken.',da:'Skift én brik, så det bliver {goal}.',sv:'Byt en bricka så att det blir {goal}.',no:'Bytt én brikke så det blir {goal}.',es:'Cambia una ficha para formar {goal}.',it:'Cambia una tessera per fare {goal}.',pt:'Troque uma peça para formar {goal}.',fr:'Change une tuile pour faire {goal}.',fi:'Vaihda yksi laatta, niin saat sanan {goal}.'},
    pChain:       {en:'Swap one tile at a time to reach {goal}.',de:'Tausche immer nur ein Plättchen, bis {goal} entsteht.',nl:'Wissel steeds één tegel tot je {goal} hebt.',da:'Skift én brik ad gangen, til det bliver {goal}.',sv:'Byt en bricka i taget tills det blir {goal}.',no:'Bytt én brikke om gangen til det blir {goal}.',es:'Cambia una ficha a la vez hasta formar {goal}.',it:'Cambia una tessera alla volta fino ad arrivare a {goal}.',pt:'Troque uma peça de cada vez até formar {goal}.',fr:'Change une tuile à la fois jusqu’à {goal}.',fi:'Vaihda yksi laatta kerrallaan, kunnes saat sanan {goal}.'},
    hintPick:     {en:'Which picture will the card turn into? Tap one.',de:'Was zeigt die Karte gleich? Tipp auf ein Bild.',nl:'Wat laat de kaart zo zien? Tik op een plaatje.',da:'Hvad kommer kortet til at vise? Tryk på et billede.',sv:'Vad kommer kortet att visa? Tryck på en bild.',no:'Hva kommer kortet til å vise? Trykk på et bilde.',es:'¿Qué va a mostrar la tarjeta? Toca un dibujo.',it:'Che cosa mostrerà la carta? Tocca un disegno.',pt:'O que o cartão vai mostrar? Toque em uma figura.',fr:'Que va montrer la carte ? Touche une image.',fi:'Mitä kortti kohta näyttää? Napauta kuvaa.'},
    hintSwapOne:  {en:'Swap a tile to change the word.',de:'Tausche ein Plättchen, damit sich das Wort ändert.',nl:'Wissel een tegel om het woord te veranderen.',da:'Skift en brik, så ordet ændrer sig.',sv:'Byt en bricka så att ordet ändras.',no:'Bytt en brikke så ordet endrer seg.',es:'Cambia una ficha para que cambie la palabra.',it:'Cambia una tessera per cambiare la parola.',pt:'Troque uma peça para mudar a palavra.',fr:'Change une tuile pour changer le mot.',fi:'Vaihda laatta, niin sana muuttuu.'},
    hintTurned:   {en:'The card turned into {result}, not {guess}.',de:'Die Karte zeigt {result}, nicht {guess}.',nl:'De kaart werd {result}, niet {guess}.',da:'Kortet blev til {result}, ikke {guess}.',sv:'Kortet blev {result}, inte {guess}.',no:'Kortet ble {result}, ikke {guess}.',es:'La tarjeta se convirtió en {result}, no en {guess}.',it:'La carta è diventata {result}, non {guess}.',pt:'O cartão virou {result}, não {guess}.',fr:'La carte montre {result}, pas {guess}.',fi:'Kortista tuli sana {result}, ei {guess}.'},
    hintHelp:     {en:'Say {start}. Now say it with {tile} in the marked place.',de:'Sprich {start}. Sprich es jetzt mit {tile} an der markierten Stelle.',nl:'Zeg {start}. Zeg het nu met {tile} op de gemarkeerde plek.',da:'Sig {start}. Sig det nu med {tile} på den markerede plads.',sv:'Säg {start}. Säg det nu med {tile} på den markerade platsen.',no:'Si {start}. Si det nå med {tile} på den markerte plassen.',es:'Di {start}. Ahora dilo con {tile} en el lugar marcado.',it:'Di’ {start}. Ora dillo con {tile} nel posto segnato.',pt:'Diga {start}. Agora diga com {tile} no lugar marcado.',fr:'Dis {start}. Redis-le avec {tile} à la place marquée.',fi:'Sano {start}. Sano se nyt niin, että merkityllä paikalla on {tile}.'},
    hintHelpAdd:  {en:'Say {start}. Now add {tile}.',de:'Sprich {start}. Setz jetzt {tile} dazu.',nl:'Zeg {start}. Zet er nu {tile} bij.',da:'Sig {start}. Sæt nu {tile} på.',sv:'Säg {start}. Lägg nu till {tile}.',no:'Si {start}. Sett nå {tile} på.',es:'Di {start}. Ahora agrégale {tile}.',it:'Di’ {start}. Ora aggiungi {tile}.',pt:'Diga {start}. Agora coloque {tile}.',fr:'Dis {start}. Ajoute maintenant {tile}.',fi:'Sano {start}. Lisää nyt {tile}.'},
    hintGoal:     {en:'Your card says {current}. Which tile has to change to make {goal}?',de:'Deine Karte zeigt {current}. Welches Plättchen muss sich ändern, damit {goal} entsteht?',nl:'Je kaart zegt {current}. Welke tegel moet veranderen om {goal} te maken?',da:'Dit kort siger {current}. Hvilken brik skal skiftes, så det bliver {goal}?',sv:'Ditt kort säger {current}. Vilken bricka måste bytas för att det ska bli {goal}?',no:'Kortet ditt sier {current}. Hvilken brikke må byttes for at det skal bli {goal}?',es:'Tu tarjeta dice {current}. ¿Qué ficha tiene que cambiar para formar {goal}?',it:'La tua carta dice {current}. Quale tessera deve cambiare per fare {goal}?',pt:'Seu cartão diz {current}. Que peça precisa mudar para formar {goal}?',fr:'Ta carte dit {current}. Quelle tuile faut-il changer pour faire {goal} ?',fi:'Kortissasi lukee {current}. Mikä laatta pitää vaihtaa, jotta saat sanan {goal}?'},
    hintHelpSwap: {en:'Change only the glowing tile.',de:'Tausche nur das leuchtende Plättchen.',nl:'Wissel alleen de tegel die oplicht.',da:'Skift kun den brik, der lyser.',sv:'Byt bara brickan som lyser.',no:'Bytt bare brikken som lyser.',es:'Cambia solo la ficha que brilla.',it:'Cambia solo la tessera che brilla.',pt:'Troque só a peça que brilha.',fr:'Change seulement la tuile qui brille.',fi:'Vaihda vain hehkuva laatta.'},
    okSwap:       {en:'{start} → {result}: one new sound, one new word!',de:'{start} → {result}: ein neuer Laut, ein neues Wort!',nl:'{start} → {result}: één nieuwe klank, één nieuw woord!',da:'{start} → {result}: én ny lyd, ét nyt ord!',sv:'{start} → {result}: ett nytt ljud, ett nytt ord!',no:'{start} → {result}: én ny lyd, ett nytt ord!',es:'{start} → {result}: ¡un sonido nuevo, una palabra nueva!',it:'{start} → {result}: un suono nuovo, una parola nuova!',pt:'{start} → {result}: um som novo, uma palavra nova!',fr:'{start} → {result} : un nouveau son, un nouveau mot !',fi:'{start} → {result}: uusi äänne, uusi sana!'},
    okAdd:        {en:'{start} + {tile} = {result}!',de:'{start} + {tile} = {result}!',nl:'{start} + {tile} = {result}!',da:'{start} + {tile} = {result}!',sv:'{start} + {tile} = {result}!',no:'{start} + {tile} = {result}!',es:'¡{start} + {tile} = {result}!',it:'{start} + {tile} = {result}!',pt:'{start} + {tile} = {result}!',fr:'{start} + {tile} = {result} !',fi:'{start} + {tile} = {result}!'},
    okStep:       {en:'{result}! Now make {goal}.',de:'{result}! Jetzt mach daraus {goal}.',nl:'{result}! Maak nu {goal}.',da:'{result}! Lav nu {goal}.',sv:'{result}! Gör nu {goal}.',no:'{result}! Lag nå {goal}.',es:'¡{result}! Ahora forma {goal}.',it:'{result}! Ora fai {goal}.',pt:'{result}! Agora forme {goal}.',fr:'{result} ! Fais maintenant {goal}.',fi:'{result}! Tee nyt sana {goal}.'},
    okChain:      {en:'{list}: every swap, one new sound!',de:'{list}: jedes Mal ein neuer Laut!',nl:'{list}: elke keer één nieuwe klank!',da:'{list}: én ny lyd hver gang!',sv:'{list}: ett nytt ljud varje gång!',no:'{list}: én ny lyd hver gang!',es:'{list}: ¡cada vez un sonido nuevo!',it:'{list}: ogni volta un suono nuovo!',pt:'{list}: um som novo de cada vez!',fr:'{list} : un nouveau son à chaque fois !',fi:'{list}: joka kerta uusi äänne!'},
    setLevel:     {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvFirst:      {en:'First sound',de:'Erster Laut',nl:'Eerste klank',da:'Første lyd',sv:'Första ljudet',no:'Første lyd',es:'Primer sonido',it:'Primo suono',pt:'Primeiro som',fr:'Premier son',fi:'Ensimmäinen äänne'},
    lvOther:      {en:'Middle or last sound',de:'Laut in der Mitte oder am Ende',nl:'Middelste of laatste klank',da:'Lyd i midten eller til sidst',sv:'Ljudet i mitten eller sist',no:'Lyd i midten eller til slutt',es:'Sonido de en medio o final',it:'Suono in mezzo o finale',pt:'Som do meio ou do final',fr:'Son du milieu ou de la fin',fi:'Keskimmäinen tai viimeinen äänne'},
    lvSwap:       {en:'Swap it yourself',de:'Selbst tauschen',nl:'Zelf wisselen',da:'Skift selv',sv:'Byt själv',no:'Bytt selv',es:'Cambia tú',it:'Cambia tu',pt:'Você troca',fr:'À toi de changer',fi:'Vaihda itse'},
    lvChain:      {en:'Word chains',de:'Wortketten',nl:'Woordketens',da:'Ordkæder',sv:'Ordkedjor',no:'Ordkjeder',es:'Cadenas de palabras',it:'Catene di parole',pt:'Correntes de palavras',fr:'Chaînes de mots',fi:'Sanaketjut'},
    lvAdd:        {en:'Add a sound',de:'Einen Laut dazusetzen',nl:'Een klank erbij',da:'Sæt en lyd på',sv:'Lägg till ett ljud',no:'Legg til en lyd',es:'Agrega un sonido',it:'Aggiungi un suono',pt:'Acrescente um som',fr:'Ajouter un son',fi:'Lisää äänne'},
    ariaCard:     {en:'Card: {word}.',de:'Karte: {word}.',nl:'Kaart: {word}.',da:'Kort: {word}.',sv:'Kort: {word}.',no:'Kort: {word}.',es:'Tarjeta: {word}.',it:'Carta: {word}.',pt:'Cartão: {word}.',fr:'Carte : {word}.',fi:'Kortti: {word}.'},
    ariaBlank:    {en:'The card has no picture: {letters}.',de:'Die Karte hat kein Bild: {letters}.',nl:'De kaart heeft geen plaatje: {letters}.',da:'Kortet har intet billede: {letters}.',sv:'Kortet har ingen bild: {letters}.',no:'Kortet har ikke noe bilde: {letters}.',es:'La tarjeta no tiene dibujo: {letters}.',it:'La carta non ha disegno: {letters}.',pt:'O cartão não tem figura: {letters}.',fr:'La carte n’a pas d’image : {letters}.',fi:'Kortissa ei ole kuvaa: {letters}.'},
    ariaTile:     {en:'Tile {letters}',de:'Plättchen {letters}',nl:'Tegel {letters}',da:'Brik {letters}',sv:'Bricka {letters}',no:'Brikke {letters}',es:'Ficha {letters}',it:'Tessera {letters}',pt:'Peça {letters}',fr:'Tuile {letters}',fi:'Laatta {letters}'},
    ariaSlot:     {en:'Place {n}: {letters}',de:'Stelle {n}: {letters}',nl:'Plek {n}: {letters}',da:'Plads {n}: {letters}',sv:'Plats {n}: {letters}',no:'Plass {n}: {letters}',es:'Lugar {n}: {letters}',it:'Posto {n}: {letters}',pt:'Lugar {n}: {letters}',fr:'Place {n} : {letters}',fi:'Paikka {n}: {letters}'},
    ariaGoal:     {en:'Goal: {goal}',de:'Ziel: {goal}',nl:'Doel: {goal}',da:'Mål: {goal}',sv:'Mål: {goal}',no:'Mål: {goal}',es:'Meta: {goal}',it:'Obiettivo: {goal}',pt:'Objetivo: {goal}',fr:'But : {goal}',fi:'Tavoite: {goal}'},
    ariaTickets:  {en:'Words made: {list}',de:'Deine Wörter: {list}',nl:'Gemaakte woorden: {list}',da:'Ord du har lavet: {list}',sv:'Ord du har gjort: {list}',no:'Ord du har laget: {list}',es:'Palabras formadas: {list}',it:'Parole fatte: {list}',pt:'Palavras formadas: {list}',fr:'Mots formés : {list}',fi:'Tehdyt sanat: {list}'}
    /*STRINGS-END*/
  },

  defaults: { level: 'first' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'first', labelKey: 'lvFirst' }, { value: 'other', labelKey: 'lvOther' }, { value: 'swap', labelKey: 'lvSwap' }, { value: 'chain', labelKey: 'lvChain' }, { value: 'add', labelKey: 'lvAdd' }] }
  ],

  OK_MS: 3000, FAST: false,
  QUOTES: { en: ['“', '”'], de: ['„', '“'], nl: ['‘', '’'], da: ['»', '«'], sv: ['”', '”'], no: ['«', '»'], es: ['«', '»'], it: ['«', '»'], pt: ['“', '”'], fr: ['« ', ' »'], fi: ['”', '”'] },
  LV_KEY: { first: 'lvFirst', other: 'lvOther', swap: 'lvSwap', chain: 'lvChain', add: 'lvAdd' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._lay = null; this._trays = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._drag = null; this._view = {};
    /* the levels this locale offers (each needs ≥ 7 honest rounds) */
    var ls = FlipCardCore.levels(this._loc()), self = this;
    this.settings = [{ key: 'level', type: 'choice', labelKey: 'setLevel', options: ls.map(function (v) { return { value: v, labelKey: self.LV_KEY[v] }; }) }];
    injectFlipCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return FlipCardCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _lv: function () { return FlipCardCore.level(this._loc(), this._set('level')); },
  _key: function () { return this._loc() + '/' + this._lv(); },
  _q: function (s) { var Q = this.QUOTES[this._loc()] || this.QUOTES.en; return Q[0] + s + Q[1]; },
  _say: function (text, rate) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'word', text: text, lang: this._loc(), rate: rate || 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = FlipCardCore.rounds(this._loc(), this._lv()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = FlipCardCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._lay = C.deal(n, Math.random); this._trays = C.dealTray(n, Math.random); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._lay = C.deal(n, Math.random); this._trays = C.dealTray(n, Math.random); }
    var r = pool[this._order[index % n]], lay = this._lay[index % n], tro = this._trays[index % n];
    var args = this._args(r, null);
    var pk = r.level === 'swap' ? 'pSwap' : r.level === 'chain' ? 'pChain' : r.level === 'add' ? (r.slot === 'start' ? 'pAddStart' : 'pAddEnd') : 'p' + r.pos.charAt(0).toUpperCase() + r.pos.slice(1);
    return {
      id: 'flip-card.' + r.loc + '.' + r.id, promptKey: pk, promptArgs: args, celebrateKey: r.level === 'add' ? 'okAdd' : r.level === 'chain' ? 'okChain' : 'okSwap', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._view = {}; tool._drag = null; tool._picked = -1;
        tool.st = C.newState(r, { layout: lay, trayOrder: tro }); tool._a = args;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _args: function (r, st) {
    var a = { start: r.start.word };
    if (r.choices) { a.tile = this._q(r.tile.g); a.result = r.answer.word; }
    else { a.goal = (st ? st.goal : (r.level === 'chain' ? r.words[1] : r.goal)).word; a.result = r.goal.word; }
    if (r.level === 'chain') { a.goal = r.goal.word; a.list = r.words.map(function (w) { return w.word; }).join(', '); }
    return a;
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = FlipCardCore.rounds(this._loc(), FlipCardCore.levels(this._loc())[0])[0]; this.st = FlipCardCore.newState(r0, {}); this._a = this._args(r0, null); }
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, st = this.st, self = this;
    api.stage.innerHTML = '';
    var L = this._L = FlipCardCore.layout(this._width());
    var wrap = api.el('div', 'fcd-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + st.r.level); this._wrap = wrap; wrap.tabIndex = -1;
    /* the tile size: the longest card this round can show must fit the card */
    var maxN = 3; [st.r.start].concat(st.r.choices || [], st.r.words || [], st.r.goal ? [st.r.goal] : [], st.r.answer ? [st.r.answer] : []).forEach(function (w) { maxN = Math.max(maxN, w.tiles.length); });
    var tile = Math.min(L.tile, Math.floor((L.card - 24 - (maxN - 1) * 6) / maxN));
    [['card', L.card], ['pic', L.pic], ['tile', tile], ['choice', L.choice], ['parrot', L.parrot]].forEach(function (p) { wrap.style.setProperty('--fcd-' + p[0], p[1] + 'px'); });
    this._perch = api.el('div', 'fcd-perch'); wrap.appendChild(this._perch);
    var stage = api.el('div', 'fcd-stage'); wrap.appendChild(stage);
    this._cardCol = api.el('div', 'fcd-cardcol'); stage.appendChild(this._cardCol);
    this._side = api.el('div', 'fcd-side'); stage.appendChild(this._side);
    this._strip = api.el('div', 'fcd-strip'); wrap.appendChild(this._strip);
    var ask = api.el('div', 'fcd-ask'); wrap.appendChild(ask);
    var note = api.el('p', 'fcd-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'fcd-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.addEventListener('keydown', function (ev) { self._onKey(ev); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._perch) return;
    var st = this.st, C = FlipCardCore, r = st.r;
    this._wrap.classList.toggle('is-fast', !!this.FAST);
    this._paintPerch(); this._paintCard(); this._paintSide(); this._paintStrip();
    var h = C.hint(st), msg = '', a = this._noteArgs();
    if (st.done) msg = this._afterOk ? '' : (this._view.won ? this._t(r.level === 'add' ? 'okAdd' : r.level === 'chain' ? 'okChain' : 'okSwap', a) : '');
    else if (this._view.step) msg = this._t('okStep', a);
    else if (h && !this._busy) msg = this._t(h, a);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!(st.done || this._view.step));
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && st.last.result === 'wrong'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
  },
  _noteArgs: function () {
    var st = this.st, r = st.r, C = FlipCardCore, a = Object.assign({}, this._a);
    if (r.choices && st.last && st.last.guess) a.guess = st.last.guess;
    if (!r.choices) {
      a.goal = st.goal.word;
      var f = C.face(r.loc, st.card); a.current = f ? f.word : this._q(st.card.tiles.join(''));
      if (r.level === 'chain') { a.result = st.reached[st.reached.length - 1]; a.list = st.reached.join(', '); }
      if (r.level === 'swap') a.result = r.goal.word;
    }
    return a;
  },

  _tileEl: function (g, cls, k) {
    var b = this.api.el('button', 'fcd-tile ' + (cls || '') + (g.length >= 3 ? ' is-l3' : g.length === 2 ? ' is-l2' : '')); b.type = 'button'; if (k) b.setAttribute('data-k', k);
    b.textContent = g; b.setAttribute('aria-label', this._t('ariaTile', { letters: g }));
    return b;
  },
  _tiny: function () { return !!(this.st.r.choices && this._L && this._L.W < 340); },
  _paintPerch: function () {
    var el = this._perch, st = this.st, r = st.r, self = this; el.innerHTML = '';
    el.hidden = this._tiny(); if (el.hidden) return;
    var p = this.api.el('div', 'fcd-parrot' + (this._view.won ? ' is-bob' : ''));
    p.innerHTML = '<img alt="" draggable="false" src="' + this._pic('pets/parrot') + '">'; p.setAttribute('aria-hidden', 'true');
    el.appendChild(p);
    if (r.choices) {
      var hang = this.api.el('div', 'fcd-hang' + (st.done || this._view.reveal ? ' is-used' : ''));
      hang.innerHTML = '<span class="fcd-string"></span>';
      var t = this._tileEl(r.tile.g, 'is-new', 'newtile'); t.addEventListener('click', function () { self._say(r.tile.g); });
      hang.appendChild(t); el.appendChild(hang);
      return;
    }
    var tray = this.api.el('div', 'fcd-tray'); this._trayEl = tray;
    C_tray(this).forEach(function (t, i) {
      var b = self._tileEl(t.g, 'is-tray' + (self._picked === i ? ' is-picked' : ''), 'tray' + i); b.setAttribute('data-i', i);
      self._bindDrag(b, i);
      tray.appendChild(b);
    });
    el.appendChild(tray);
    function C_tray(tool) { return FlipCardCore.trayOf(tool.st); }
  },
  /* the flip card: the face the tiles make, the tiles along the bottom */
  _paintCard: function () {
    var el = this._cardCol, st = this.st, r = st.r, C = FlipCardCore, self = this, v = this._view; el.innerHTML = '';
    var card = st.done ? st.card : (v.reveal && st.last && st.last.card ? st.last.card : st.card);
    if (r.choices && st.done && r.level !== 'add') card = C.apply(r.start, r.slot, r.tile);
    if (r.choices && st.done && r.level === 'add') card = C.apply(r.start, r.slot, r.tile);
    var f = C.face(r.loc, card), key = card.keys.join(' ');
    var c = this.api.el('div', 'fcd-card' + (f ? '' : ' is-blank') + (this._lastFace !== undefined && this._lastFace !== key ? ' is-flip' : '') + (st.done ? ' is-win' : ''));
    this._lastFace = key;
    var faceEl = this.api.el('div', 'fcd-face');
    if (f) { faceEl.innerHTML = '<img alt="" draggable="false" src="' + this._pic(f.pic) + '">'; c.setAttribute('aria-label', this._t('ariaCard', { word: f.word })); faceEl.addEventListener('click', function () { self._say(f.word); }); }
    else { faceEl.innerHTML = '<span class="fcd-letters">' + card.tiles.join('') + '</span>'; c.setAttribute('aria-label', this._t('ariaBlank', { letters: card.tiles.join('') })); }
    c.setAttribute('role', 'img');
    c.appendChild(faceEl);
    var row = this.api.el('div', 'fcd-slots'), need = C.helpOn(st) ? C.needSlot(st) : -1, diff = (st.show && st.last && st.last.diff) || [];
    var shown = card;
    /* predict levels: before Check the card holds the start word; an add level shows a ghost slot where the new sound goes */
    if (r.level === 'add' && !st.done && !v.reveal && r.slot === 'start') row.appendChild(this._ghost());
    shown.tiles.forEach(function (g, i) {
      var target = r.choices && !st.done && !v.reveal && r.level !== 'add' && i === r.slot;
      var b = self._tileEl(g, 'is-slot' + (target ? ' is-target' : '') + (i === need ? ' is-need' : '') + (!r.choices && diff.indexOf(i) >= 0 ? ' is-diff' : ''), 'slot' + i);
      b.setAttribute('data-slot', i); b.setAttribute('aria-label', self._t('ariaSlot', { n: i + 1, letters: g }));
      b.addEventListener('click', function () { if (r.choices) self._say(g); else self._slotTap(i); });
      row.appendChild(b);
    });
    if (r.level === 'add' && !st.done && !v.reveal && r.slot === 'end') row.appendChild(this._ghost());
    if (f && f.tail) { var tl = this.api.el('span', 'fcd-tail'); tl.textContent = f.tail; tl.setAttribute('aria-hidden', 'true'); row.appendChild(tl); }
    c.appendChild(row);
    if (this._tiny()) {
      var cp = this.api.el('div', 'fcd-parrot is-corner-l' + (v.won ? ' is-bob' : '')); cp.innerHTML = '<img alt="" draggable="false" src="' + this._pic('pets/parrot') + '">'; cp.setAttribute('aria-hidden', 'true'); el.appendChild(cp);
      var ct = this._tileEl(r.tile.g, 'is-new is-corner-r' + (st.done || v.reveal ? ' is-used' : ''), 'newtile'); ct.addEventListener('click', function () { self._say(r.tile.g); }); el.appendChild(ct);
    }
    if (v.popped) { var pp = this.api.el('span', 'fcd-popped'); pp.textContent = v.popped; pp.setAttribute('aria-hidden', 'true'); c.appendChild(pp); }
    el.appendChild(c);
  },
  _ghost: function () { var g = this.api.el('span', 'fcd-tile is-ghost'); g.setAttribute('aria-hidden', 'true'); return g; },
  _paintSide: function () {
    var el = this._side, st = this.st, r = st.r, C = FlipCardCore, self = this, v = this._view; el.innerHTML = '';
    if (r.choices) {
      var wrong = st.show && st.last && st.last.result === 'wrong';
      for (var s = 0; s < 3; s++) (function (s) {
        var w = C.choiceAt(st, s), cell = self.api.el('div', 'fcd-cell');
        var b = self.api.el('button', 'fcd-choice' + (st.guess === s ? ' is-guess' : '') + (wrong && st.guess === s && v.shake ? ' is-shake' : '') + (st.done && w === r.answer ? ' is-win' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'choice' + s); b.setAttribute('data-i', s); b.setAttribute('aria-label', w.word); b.setAttribute('aria-pressed', String(st.guess === s));
        b.innerHTML = '<img alt="" draggable="false" src="' + self._pic(w.pic) + '">';
        b.addEventListener('click', function () { self._guess(s); });
        cell.appendChild(b);
        /* a wrong guess shows its own tiles; the tile that differs from the card glows */
        if (wrong && st.guess === s) {
          var tr = self.api.el('div', 'fcd-mini'), res = st.last.card;
          var off = w.keys.length < res.keys.length && r.slot === 'start' ? res.keys.length - w.keys.length : 0;
          w.tiles.forEach(function (g, i) { var m = self.api.el('span', 'fcd-mtile' + (res.keys[i + off] !== w.keys[i] ? ' is-diff' : '')); m.textContent = g; tr.appendChild(m); });
          /* a picture one sound short: a coral "+" where the missing sound goes */
          if (w.keys.length < res.keys.length) { var plus = self.api.el('span', 'fcd-mtile is-diff is-plus'); plus.textContent = '+'; plus.setAttribute('aria-hidden', 'true'); if (r.slot === 'start' || (r.slot !== 'end' && off)) tr.insertBefore(plus, tr.firstChild); else tr.appendChild(plus); }
          cell.appendChild(tr);
        }
        el.appendChild(cell);
      })(s);
      return;
    }
    /* swap levels: the goal picture; at a miss its tiles line up under it */
    var gf = this.api.el('div', 'fcd-goal' + (st.done ? ' is-win' : ''));
    gf.setAttribute('aria-label', this._t('ariaGoal', { goal: st.goal.word }));
    gf.innerHTML = '<span class="fcd-star" aria-hidden="true"></span><img alt="" draggable="false" src="' + this._pic(st.goal.pic) + '">';
    if (this._L.mode === 'narrow') { gf.classList.add('is-corner'); var cardEl = this._cardCol.querySelector('.fcd-card'); if (cardEl) { cardEl.appendChild(gf); return; } }
    el.appendChild(gf);
    if (st.show && st.last && st.last.result === 'wrong') {
      var gt = this.api.el('div', 'fcd-mini');
      st.goal.tiles.forEach(function (g, i) { var m = self.api.el('span', 'fcd-mtile' + (st.last.diff.indexOf(i) >= 0 ? ' is-diff' : '')); m.textContent = g; gt.appendChild(m); });
      el.appendChild(gt);
    }
  },
  _paintStrip: function () {
    var el = this._strip, st = this.st, r = st.r, self = this; el.innerHTML = '';
    el.hidden = r.level !== 'chain';
    if (r.level !== 'chain') return;
    st.reached.forEach(function (w, i) {
      var W = r.words.filter(function (x) { return x.word === w; })[0] || FlipCardCore.word(r.loc, w);
      if (i) { var ar = self.api.el('span', 'fcd-arrow'); ar.textContent = '→'; ar.setAttribute('aria-hidden', 'true'); el.appendChild(ar); }
      var t = self.api.el('span', 'fcd-ticket' + (st.done && self._view.won ? ' is-lit' : ''));
      W.tiles.forEach(function (g) { var m = self.api.el('span', 'fcd-mtile'); m.textContent = g; t.appendChild(m); });
      el.appendChild(t);
    });
    el.setAttribute('aria-label', this._t('ariaTickets', { list: st.reached.join(', ') }));
  },

  /* ---------------- the hand ---------------- */
  _guess: function (s) { if (this._busy || this.st.done) return; if (FlipCardCore.guess(this.st, s)) { this.api.sound(560); this._say(FlipCardCore.choiceAt(this.st, s).word); this._view = {}; this._paint(); } },
  _slotTap: function (i) { if (this._picked >= 0) this._put(i, this._picked); },
  _put: function (slot, ti) {
    var st = this.st; if (this._busy || st.done) return;
    var old = st.card.tiles[slot];
    if (FlipCardCore.put(st, slot, ti)) {
      this._picked = -1; this._view = { popped: old };
      this.api.sound(330); var self = this; this._later(function () { self.api.sound(523); }, this._ms(120));
      var f = FlipCardCore.face(st.r.loc, st.card);
      this.api.announce(f ? this._t('ariaCard', { word: f.word }) : this._t('ariaBlank', { letters: st.card.tiles.join('') }));
      if (f) this._say(f.word);
      this._paint();
      this._later(function () { if (self._view.popped) { self._view.popped = null; var p = self._wrap && self._wrap.querySelector('.fcd-popped'); if (p) p.parentNode.removeChild(p); } }, this._ms(700));
    }
  },
  _bindDrag: function (b, ti) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
      var hitAt = function (x, y) { var sl = self._wrap.querySelectorAll('.fcd-tile.is-slot'); for (var z = 0; z < sl.length; z++) { var r = sl[z].getBoundingClientRect(); if (x >= r.left - 6 && x <= r.right + 6 && y >= r.top - 6 && y <= r.bottom + 6) return +sl[z].getAttribute('data-slot'); } return -1; };
      var move = function (e) {
        if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!moved) { moved = true; self._drag = {}; ghost = self.api.el('div', 'fcd-ghost'); ghost.textContent = b.textContent; document.body.appendChild(ghost); b.classList.add('is-lifted'); }
        ghost.style.left = (e.clientX - 32) + 'px'; ghost.style.top = (e.clientY - 32) + 'px';
        var h = hitAt(e.clientX, e.clientY);
        [].forEach.call(self._wrap.querySelectorAll('.fcd-tile.is-slot'), function (s) { s.classList.toggle('is-over', +s.getAttribute('data-slot') === h); });
      };
      var up = function (e) {
        b.removeEventListener('pointermove', move); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        b.classList.remove('is-lifted');
        if (!moved) { self._drag = null; if (e.type === 'pointerup') { self._picked = self._picked === ti ? -1 : ti; self.api.sound(500); self._paint(); } return; }
        var h = hitAt(e.clientX, e.clientY); self._drag = null;
        if (h >= 0) self._put(h, ti); else self._paint();
      };
      b.addEventListener('pointermove', move); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
    b.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); self._picked = self._picked === ti ? -1 : ti; self._paint(); } });
  },
  _onKey: function (ev) {
    var st = this.st, r = st.r;
    if (r.choices && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) { ev.preventDefault(); var g = st.guess < 0 ? 0 : (st.guess + (ev.key === 'ArrowRight' ? 1 : 2)) % 3; this._guess(g); return; }
    if (!r.choices && this._picked >= 0 && /^[1-9]$/.test(ev.key)) { ev.preventDefault(); this._put(+ev.key - 1, this._picked); }
  },

  _check: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = FlipCardCore, r = st.r;
    var res = C.check(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    if (res.kase === 'step') {
      this.api.sound(784); this._view = { step: true }; this._picked = -1; this._a = Object.assign({}, this._a, { goal: st.goal.word });
      this._paint(); this._later(function () { if (self._view.step) { self._view = {}; self._paint(); } }, this._ms(1800));
      return;
    }
    if (r.choices) {
      /* Pepper's tile drops in, the old one pops out, the card flips to the true new word */
      this._busy = true; this._view = { reveal: true, popped: r.level === 'add' ? null : r.start.tiles[r.slot], shake: !res.ok };
      this.api.sound(330); this._paint();
      if (res.face) this._say(res.face.word);
      if (res.ok) return this._win();
      this._later(function () {
        self._busy = false; self._view = { shake: false }; self.api.sound(196);
        if (st.help >= 2) self._say(r.start.word, 0.7);
        self._paint();
      }, this._ms(1800));
      return;
    }
    if (res.ok) return this._win();
    this._busy = true; this._view = {}; this.api.sound(196); this._paint();
    if (st.help >= 2) this._say(st.goal.word, 0.7);
    this._later(function () { self._busy = false; self._paint(); }, this._ms(400));
  },
  _win: function () {
    var self = this, st = this.st, r = st.r;
    this._later(function () {
      self._view = { won: true };
      self.api.sound(659); self._later(function () { self.api.sound(784); }, 110); self._later(function () { self.api.sound(1046); }, 220);
      self._busy = false; self._paint();
    }, this._ms(650));
    this._later(function () { self._afterOk = true; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS));
  }
};

var fcdCssDone = false;
function injectFlipCSS() {
  if (fcdCssDone || typeof document === 'undefined') return;
  fcdCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.fcd-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--fcd-ink:#2A2A35;--fcd-teal:#146B5E;--fcd-coral:#F2784B;--fcd-cream:#FFF8EC;user-select:none;-webkit-user-select:none;}'
  + '.fcd-wrap:focus{outline:none;}'
  /* the perch: Pepper and her tile / the tray */
  + '.fcd-perch{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:16px;width:100%;padding-bottom:10px;border-bottom:6px solid #2E7D6F;border-radius:0 0 4px 4px;max-width:calc(var(--fcd-card) * 2);}'
  + '.fcd-parrot{flex:none;} .fcd-parrot img{display:block;width:var(--fcd-parrot);height:var(--fcd-parrot);object-fit:contain;} .fcd-parrot.is-bob img{animation:fcd-bob .5s ease-out 2;} @keyframes fcd-bob{50%{transform:translateY(-12px);}}'
  + '.fcd-hang{display:flex;flex-direction:column;align-items:center;} .fcd-string{display:block;width:2px;height:16px;background:#7A6A55;} .fcd-hang.is-used{opacity:.35;}'
  + '.fcd-tray{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}'
  + '.fcd-tile{display:inline-flex;align-items:center;justify-content:center;flex:none;width:var(--fcd-tile);height:var(--fcd-tile);padding:0;border:0;border-radius:12px;background:var(--fcd-cream);box-shadow:inset 0 0 0 3px var(--fcd-ink),0 4px 0 #CDBFA6;font-weight:800;font-size:calc(var(--fcd-tile) * .56);line-height:1;color:var(--fcd-ink);font-family:' + D + ';cursor:pointer;touch-action:none;}'
  + '.fcd-tile.is-l2{font-size:calc(var(--fcd-tile) * .46);} .fcd-tile.is-l3{font-size:calc(var(--fcd-tile) * .34);}'
  + '.fcd-wrap.is-narrow{gap:10px;} .fcd-wrap.is-narrow .fcd-card{padding:8px;gap:8px;} .fcd-wrap.is-narrow .fcd-stage{gap:10px;}'
  + '.fcd-wrap.is-narrow .fcd-tray .fcd-tile{width:52px;height:52px;font-size:28px;} .fcd-wrap.is-narrow .fcd-tray{gap:6px;flex-wrap:nowrap;} .fcd-wrap.is-narrow .fcd-perch{gap:10px;}'
  + '.fcd-tile.is-new{background:var(--fcd-coral);color:#fff;box-shadow:inset 0 0 0 3px #B2512C,0 4px 0 #B2512C;}'
  + '.fcd-tile.is-tray{background:#FDE2D4;} .fcd-tile.is-picked{transform:translateY(-8px);box-shadow:inset 0 0 0 3px var(--fcd-coral),0 0 0 4px rgba(242,120,75,.35),0 6px 0 #CDBFA6;} .fcd-tile.is-lifted{opacity:.35;}'
  + '.fcd-ghost{position:fixed;z-index:9999;pointer-events:none;width:64px;height:64px;border-radius:12px;background:#FDE2D4;box-shadow:inset 0 0 0 3px var(--fcd-ink),0 8px 16px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:34px;font-family:' + D + ';color:var(--fcd-ink);}'
  /* the stage: the card and its side column */
  + '.fcd-stage{display:flex;align-items:center;justify-content:center;gap:22px;width:100%;}'
  + '.fcd-wrap.is-narrow .fcd-stage{flex-direction:column;gap:12px;}'
  + '.fcd-card{position:relative;width:var(--fcd-card);box-sizing:border-box;padding:12px;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 3px var(--fcd-ink),0 6px 0 #9E8F78,0 10px 18px rgba(0,0,0,.12);display:flex;flex-direction:column;align-items:center;gap:12px;transform-style:preserve-3d;}'
  + '.fcd-card.is-flip{animation:fcd-flip .6s ease-out;} @keyframes fcd-flip{0%{transform:perspective(900px) rotateY(90deg);}100%{transform:perspective(900px) rotateY(0);}}'
  + '.fcd-card.is-blank{background:#ECEAE6;} .fcd-card.is-win{box-shadow:inset 0 0 0 4px var(--fcd-teal),0 0 0 6px rgba(20,107,94,.25),0 6px 0 #9E8F78;}'
  + '.fcd-face{width:var(--fcd-pic);height:var(--fcd-pic);display:flex;align-items:center;justify-content:center;cursor:pointer;} .fcd-face img{width:100%;height:100%;object-fit:contain;}'
  + '.fcd-letters{font-weight:800;font-size:calc(var(--fcd-pic) * .28);color:#8A847A;font-family:' + D + ';letter-spacing:.04em;}'
  + '.fcd-slots{display:flex;gap:6px;justify-content:center;align-items:center;}'
  + '.fcd-tile.is-slot.is-target{box-shadow:inset 0 0 0 3px var(--fcd-coral),0 0 0 4px rgba(242,120,75,.35),0 4px 0 #CDBFA6;}'
  + '.fcd-tile.is-slot.is-over{box-shadow:inset 0 0 0 4px var(--fcd-coral),0 4px 0 #CDBFA6;background:#FFF1E8;}'
  + '.fcd-tile.is-need{animation:fcd-pulse 1s ease-in-out infinite;} @keyframes fcd-pulse{50%{box-shadow:inset 0 0 0 4px var(--fcd-coral),0 0 0 8px rgba(242,120,75,.3),0 4px 0 #CDBFA6;}}'
  + '.fcd-tile.is-diff{background:#FFE3D6;box-shadow:inset 0 0 0 3px var(--fcd-coral),0 4px 0 #CDBFA6;}'
  + '.fcd-tile.is-ghost{background:transparent;box-shadow:inset 0 0 0 3px rgba(242,120,75,.6);border:0;cursor:default;}'
  + '.fcd-tail{font-weight:800;font-size:calc(var(--fcd-tile) * .48);color:#A8A29A;font-family:' + D + ';}'
  + '.fcd-popped{position:absolute;right:-10px;bottom:-10px;display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:10px;background:var(--fcd-cream);box-shadow:inset 0 0 0 3px var(--fcd-ink);font-weight:800;font-size:26px;font-family:' + D + ';color:var(--fcd-ink);animation:fcd-tumble .7s ease-in forwards;pointer-events:none;}'
  + '@keyframes fcd-tumble{0%{transform:translate(0,0) rotate(0);opacity:1;}100%{transform:translate(40px,60px) rotate(140deg);opacity:0;}}'
  /* the side: choices or the goal */
  + '.fcd-side{display:flex;flex-direction:column;align-items:center;gap:10px;}'
  + '.fcd-wrap.is-narrow .fcd-side{flex-direction:row;justify-content:center;flex-wrap:wrap;}'
  + '.fcd-wrap.is-narrow.is-swap .fcd-side,.fcd-wrap.is-narrow.is-chain .fcd-side{flex-direction:column;}'
  + '.fcd-cell{display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.fcd-choice{display:inline-flex;padding:6px;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 2px var(--fcd-ink),0 3px 0 rgba(42,42,53,.15);cursor:pointer;}'
  + '.fcd-choice img{display:block;width:var(--fcd-choice);height:var(--fcd-choice);object-fit:contain;pointer-events:none;}'
  + '.fcd-choice.is-guess{transform:translateY(-4px);box-shadow:inset 0 0 0 3px var(--fcd-coral),0 0 0 4px rgba(242,120,75,.3),0 5px 0 rgba(42,42,53,.15);}'
  + '.fcd-choice.is-win{box-shadow:inset 0 0 0 3px var(--fcd-teal),0 0 0 6px rgba(20,107,94,.25);}'
  + '.fcd-choice.is-shake{animation:fcd-shake .3s ease-in-out 2;} @keyframes fcd-shake{25%{transform:rotate(-4deg);}75%{transform:rotate(4deg);}}'
  + '.fcd-mini{display:flex;gap:3px;} .fcd-mtile{display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:30px;padding:0 3px;border-radius:6px;background:var(--fcd-cream);box-shadow:inset 0 0 0 2px var(--fcd-ink);font-weight:800;font-size:18px;line-height:1;font-family:' + D + ';color:var(--fcd-ink);} .fcd-mtile.is-diff{background:#FFE3D6;box-shadow:inset 0 0 0 2px var(--fcd-coral);color:#A6461F;}'
  + '.fcd-goal{position:relative;padding:8px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 3px #E2B23A,0 3px 0 rgba(42,42,53,.15);} .fcd-goal img{display:block;width:var(--fcd-choice);height:var(--fcd-choice);object-fit:contain;} .fcd-goal.is-win{box-shadow:inset 0 0 0 4px var(--fcd-teal),0 0 0 6px rgba(20,107,94,.25);}'
  + '.fcd-cardcol{position:relative;} .fcd-perch[hidden]{display:none;} .fcd-parrot.is-corner-l{position:absolute;left:4px;top:4px;z-index:2;} .fcd-parrot.is-corner-l img{width:64px;height:64px;} .fcd-tile.is-corner-r{position:absolute;right:8px;top:8px;width:52px;height:52px;font-size:28px;z-index:2;} .fcd-tile.is-corner-r.is-used{opacity:.35;}'
  + '.fcd-wrap.is-narrow .fcd-cell{position:relative;} .fcd-wrap.is-narrow .fcd-cell .fcd-mini{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);z-index:2;} .fcd-wrap.is-narrow .fcd-cell .fcd-mini{gap:0;padding:2px 7px;border-radius:9px;background:#fff;box-shadow:inset 0 0 0 2px var(--fcd-ink);} .fcd-wrap.is-narrow .fcd-cell .fcd-mtile{min-width:0;height:22px;padding:0 1px;background:transparent;box-shadow:none;font-size:17px;} .fcd-wrap.is-narrow .fcd-cell .fcd-mtile.is-diff{background:transparent;box-shadow:none;color:#D4541F;text-decoration:underline;text-decoration-thickness:3px;}'
  + '.fcd-goal.is-corner{position:absolute;right:-8px;top:-8px;padding:4px;z-index:2;} .fcd-goal.is-corner img{width:64px;height:64px;}'
  + '.fcd-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '.fcd-wrap.is-narrow .fcd-string{height:8px;}'
  + '.fcd-star{position:absolute;right:-10px;top:-10px;width:26px;height:26px;background:#E2B23A;clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);}'
  /* the chain strip */
  + '.fcd-strip{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;} .fcd-strip[hidden]{display:none;}'
  + '.fcd-ticket{display:inline-flex;gap:2px;padding:5px 7px;border-radius:8px;background:#F3E6CF;box-shadow:inset 0 0 0 2px #B9905B;} .fcd-ticket.is-lit{background:#DDF2EC;box-shadow:inset 0 0 0 2px var(--fcd-teal);} .fcd-ticket .fcd-mtile{min-width:22px;height:24px;font-size:16px;}'
  + '.fcd-arrow{font-weight:800;color:#8A847A;font-size:18px;}'
  /* the ask strip */
  + '.fcd-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;}'
  + '.fcd-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--fcd-teal);text-align:center;} .fcd-note:empty{display:none;} .fcd-note.is-ok{font-weight:800;} .fcd-note.is-wrong{color:#A6461F;}'
  + '.fcd-check{min-height:48px;padding:0 22px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .fcd-check[hidden]{display:none;} .fcd-check:disabled{opacity:.6;}'
  + '.fcd-wrap.is-narrow .fcd-note{text-align:left;}'
  + '@media (prefers-reduced-motion: reduce){.fcd-wrap *{animation-duration:.2s !important;transition:none !important;} .fcd-card.is-flip{animation:fcd-fade .2s ease-out;} @keyframes fcd-fade{0%{opacity:.2;}100%{opacity:1;}}}';
  var s = document.createElement('style'); s.id = 'fcd-css'; s.textContent = css; document.head.appendChild(s);
}
