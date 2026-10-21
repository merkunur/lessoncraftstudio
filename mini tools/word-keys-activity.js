/* =====================================================================
   word-keys-activity.js — ACTIVITY #61 of the one-by-one rebuild:
   "Tell the Words Apart" → THE WORD KEYS (RF.K.3.c, 11 locales).
   Design sheet: docs/activities-rebuild/designs/061-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: each little word is a key whose letters are its teeth.
   A sentence has a brass padlock in its gap; slide a key in and turn it.
   Only the key with exactly the right letters in exactly the right order
   turns: the shackle pops, the lock swings off and the word drops into the
   sentence. A wrong key jams and shows which teeth differ, which tooth
   sticks out and which notch stays empty; after two jams the lock turns to
   glass and shows how many pins it has. Key ring: three sentences and
   three keys, each key opens one lock. Cut the key: cut the word tooth by
   tooth from a tray of letters.

   ACTIVITY LAYER ONLY: the model is word-keys-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.WordKeysActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var WordKeysActivity = {
  id: 'word-keys',
  apparatusClasses: ['wky-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'The Word Keys',de:'Die Wortschlüssel',nl:'De woordsleutels',da:'Ordnøglerne',sv:'Ordnycklarna',no:'Ordnøklene',es:'Las llaves de palabras',it:'Le chiavi delle parole',pt:'As chaves de palavras',fr:'Les clés des mots',fi:'Sana-avaimet'},
    instruction:  {en:'Read the sentence. Find the key that opens its lock.',de:'Lies den Satz. Finde den Schlüssel, der sein Schloss öffnet.',nl:'Lees de zin. Zoek de sleutel die het slot opent.',da:'Læs sætningen. Find den nøgle, der åbner låsen.',sv:'Läs meningen. Hitta nyckeln som öppnar låset.',no:'Les setningen. Finn nøkkelen som åpner låsen.',es:'Lee la oración. Busca la llave que abre su candado.',it:'Leggi la frase. Trova la chiave che apre il lucchetto.',pt:'Leia a frase. Encontre a chave que abre o cadeado.',fr:'Lis la phrase. Trouve la clé qui ouvre son cadenas.',fi:'Lue lause. Etsi avain, joka avaa sen lukon.'},
    check:        {en:'Turn',de:'Drehen',nl:'Draaien',da:'Drej',sv:'Vrid',no:'Vri',es:'Girar',it:'Gira',pt:'Girar',fr:'Tourner',fi:'Käännä'},
    pThree:       {en:'Which key opens this sentence?',de:'Welcher Schlüssel öffnet diesen Satz?',nl:'Welke sleutel opent deze zin?',da:'Hvilken nøgle åbner denne sætning?',sv:'Vilken nyckel öppnar den här meningen?',no:'Hvilken nøkkel åpner denne setningen?',es:'¿Qué llave abre esta oración?',it:'Quale chiave apre questa frase?',pt:'Qual chave abre esta frase?',fr:'Quelle clé ouvre cette phrase ?',fi:'Mikä avain avaa tämän lauseen?'},
    pRing:        {en:'Each key opens one lock. Which one?',de:'Jeder Schlüssel öffnet ein Schloss. Welches?',nl:'Elke sleutel opent één slot. Welk slot?',da:'Hver nøgle åbner én lås. Hvilken?',sv:'Varje nyckel öppnar ett lås. Vilket?',no:'Hver nøkkel åpner én lås. Hvilken?',es:'Cada llave abre un candado. ¿Cuál?',it:'Ogni chiave apre un lucchetto. Quale?',pt:'Cada chave abre um cadeado. Qual?',fr:'Chaque clé ouvre un cadenas. Lequel ?',fi:'Jokainen avain avaa yhden lukon. Minkä?'},
    pCut:         {en:'Cut a key for this sentence, then turn it.',de:'Schneide einen Schlüssel für diesen Satz und dreh ihn dann.',nl:'Snijd een sleutel voor deze zin en draai hem dan om.',da:'Skær en nøgle til denne sætning, og drej den så.',sv:'Skär en nyckel till den här meningen och vrid sedan om den.',no:'Skjær en nøkkel til denne setningen, og vri den så om.',es:'Corta una llave para esta oración y luego gírala.',it:'Taglia una chiave per questa frase, poi girala.',pt:'Corte uma chave para esta frase e depois gire.',fr:'Taille une clé pour cette phrase, puis tourne-la.',fi:'Leikkaa avain tähän lauseeseen ja käännä sitä sitten.'},
    hintEmpty:    {en:'Choose a key and slide it into the lock.',de:'Nimm einen Schlüssel und steck ihn ins Schloss.',nl:'Kies een sleutel en steek hem in het slot.',da:'Vælg en nøgle, og stik den i låsen.',sv:'Välj en nyckel och stick in den i låset.',no:'Velg en nøkkel og stikk den inn i låsen.',es:'Elige una llave y métela en el candado.',it:'Scegli una chiave e infilala nel lucchetto.',pt:'Escolha uma chave e coloque no cadeado.',fr:'Choisis une clé et glisse-la dans le cadenas.',fi:'Valitse avain ja työnnä se lukkoon.'},
    hintEmptyCut: {en:'Tap the letters to cut the key, then turn it.',de:'Tippe die Buchstaben an, um den Schlüssel zu schneiden, und dreh ihn dann.',nl:'Tik op de letters om de sleutel te snijden en draai hem dan om.',da:'Tryk på bogstaverne for at skære nøglen, og drej den så.',sv:'Tryck på bokstäverna för att skära nyckeln och vrid sedan om den.',no:'Trykk på bokstavene for å skjære nøkkelen, og vri den så om.',es:'Toca las letras para cortar la llave y luego gírala.',it:'Tocca le lettere per tagliare la chiave, poi girala.',pt:'Toque nas letras para cortar a chave e depois gire.',fr:'Touche les lettres pour tailler la clé, puis tourne-la.',fi:'Leikkaa avain koskettamalla kirjaimia ja käännä sitä sitten.'},
    hintJam:      {en:'This key won’t turn. Read every letter on it – and read the sentence again.',de:'Dieser Schlüssel dreht sich nicht. Lies jeden Buchstaben darauf – und lies den Satz noch einmal.',nl:'Deze sleutel draait niet. Lees elke letter erop – en lees de zin nog eens.',da:'Denne nøgle vil ikke dreje. Læs hvert bogstav på den – og læs sætningen igen.',sv:'Den här nyckeln går inte att vrida. Läs varje bokstav på den – och läs meningen igen.',no:'Denne nøkkelen vil ikke vri seg. Les hver bokstav på den – og les setningen igjen.',es:'Esta llave no gira. Lee cada letra – y vuelve a leer la oración.',it:'Questa chiave non gira. Leggi ogni lettera – e rileggi la frase.',pt:'Esta chave não gira. Leia cada letra – e leia a frase de novo.',fr:'Cette clé ne tourne pas. Lis chaque lettre – et relis la phrase.',fi:'Tämä avain ei käänny. Lue sen jokainen kirjain – ja lue lause uudelleen.'},
    hintGlass:    {en:'Look inside the lock. How many letters does it need? Which key has them in the right order?',de:'Schau ins Schloss. Wie viele Buchstaben braucht es? Welcher Schlüssel hat sie in der richtigen Reihenfolge?',nl:'Kijk in het slot. Hoeveel letters heeft het nodig? Welke sleutel heeft ze in de goede volgorde?',da:'Kig ind i låsen. Hvor mange bogstaver skal den have? Hvilken nøgle har dem i den rigtige rækkefølge?',sv:'Titta in i låset. Hur många bokstäver behöver det? Vilken nyckel har dem i rätt ordning?',no:'Se inn i låsen. Hvor mange bokstaver trenger den? Hvilken nøkkel har dem i riktig rekkefølge?',es:'Mira dentro del candado. ¿Cuántas letras necesita? ¿Qué llave las tiene en el orden correcto?',it:'Guarda dentro il lucchetto. Quante lettere servono? Quale chiave le ha nell’ordine giusto?',pt:'Olhe dentro do cadeado. Quantas letras ele precisa? Qual chave tem as letras na ordem certa?',fr:'Regarde dans le cadenas. Combien de lettres lui faut-il ? Quelle clé les a dans le bon ordre ?',fi:'Katso lukon sisään. Montako kirjainta se tarvitsee? Missä avaimessa ne ovat oikeassa järjestyksessä?'},
    hintGlassCut: {en:'Look inside the lock. How many letters does it need? Cut them in the right order.',de:'Schau ins Schloss. Wie viele Buchstaben braucht es? Schneide sie in der richtigen Reihenfolge.',nl:'Kijk in het slot. Hoeveel letters heeft het nodig? Snijd ze in de goede volgorde.',da:'Kig ind i låsen. Hvor mange bogstaver skal den have? Skær dem i den rigtige rækkefølge.',sv:'Titta in i låset. Hur många bokstäver behöver det? Skär dem i rätt ordning.',no:'Se inn i låsen. Hvor mange bokstaver trenger den? Skjær dem i riktig rekkefølge.',es:'Mira dentro del candado. ¿Cuántas letras necesita? Córtalas en el orden correcto.',it:'Guarda dentro il lucchetto. Quante lettere servono? Tagliale nell’ordine giusto.',pt:'Olhe dentro do cadeado. Quantas letras ele precisa? Corte as letras na ordem certa.',fr:'Regarde dans le cadenas. Combien de lettres lui faut-il ? Taille-les dans le bon ordre.',fi:'Katso lukon sisään. Montako kirjainta se tarvitsee? Leikkaa ne oikeassa järjestyksessä.'},
    hintOpen:     {en:'That lock is open. Now the next one!',de:'Das Schloss ist offen. Jetzt das nächste!',nl:'Dat slot is open. Nu de volgende!',da:'Den lås er åben. Nu den næste!',sv:'Det låset är öppet. Nu nästa!',no:'Den låsen er åpen. Nå den neste!',es:'Ese candado está abierto. ¡Ahora el siguiente!',it:'Quel lucchetto è aperto. Ora il prossimo!',pt:'Esse cadeado está aberto. Agora o próximo!',fr:'Ce cadenas est ouvert. Au suivant !',fi:'Se lukko on auki. Nyt seuraava!'},
    okThree:      {en:'{s} – {w} opened the lock!',de:'{s} – {w} hat das Schloss geöffnet!',nl:'{s} – {w} opende het slot!',da:'{s} – {w} åbnede låsen!',sv:'{s} – {w} öppnade låset!',no:'{s} – {w} åpnet låsen!',es:'{s} – ¡{w} abrió el candado!',it:'{s} – {w} ha aperto il lucchetto!',pt:'{s} – {w} abriu o cadeado!',fr:'{s} – {w} a ouvert le cadenas !',fi:'{s} – {w} avasi lukon!'},
    okRing:       {en:'Every key found its lock: {list}.',de:'Jeder Schlüssel hat sein Schloss gefunden: {list}.',nl:'Elke sleutel vond zijn slot: {list}.',da:'Hver nøgle fandt sin lås: {list}.',sv:'Varje nyckel hittade sitt lås: {list}.',no:'Hver nøkkel fant låsen sin: {list}.',es:'Cada llave encontró su candado: {list}.',it:'Ogni chiave ha trovato il suo lucchetto: {list}.',pt:'Cada chave encontrou seu cadeado: {list}.',fr:'Chaque clé a trouvé son cadenas : {list}.',fi:'Jokainen avain löysi lukkonsa: {list}.'},
    setGame:      {en:'Game',de:'Spiel',nl:'Spel',da:'Spil',sv:'Spel',no:'Spill',es:'Juego',it:'Gioco',pt:'Jogo',fr:'Jeu',fi:'Peli'},
    gThree:       {en:'Three keys',de:'Drei Schlüssel',nl:'Drie sleutels',da:'Tre nøgler',sv:'Tre nycklar',no:'Tre nøkler',es:'Tres llaves',it:'Tre chiavi',pt:'Três chaves',fr:'Trois clés',fi:'Kolme avainta'},
    gRing:        {en:'Key ring',de:'Schlüsselbund',nl:'Sleutelbos',da:'Nøgleknippe',sv:'Nyckelknippa',no:'Nøkkelknippe',es:'Llavero',it:'Mazzo di chiavi',pt:'Chaveiro',fr:'Trousseau de clés',fi:'Avainnippu'},
    gCut:         {en:'Cut the key',de:'Schlüssel schneiden',nl:'Sleutel snijden',da:'Skær nøglen',sv:'Skär nyckeln',no:'Skjær nøkkelen',es:'Corta la llave',it:'Taglia la chiave',pt:'Corte a chave',fr:'Taille la clé',fi:'Leikkaa avain'},
    setPic:       {en:'Help in the sentence',de:'Hilfe im Satz',nl:'Hulp in de zin',da:'Hjælp i sætningen',sv:'Hjälp i meningen',no:'Hjelp i setningen',es:'Ayuda en la oración',it:'Aiuto nella frase',pt:'Ajuda na frase',fr:'Aide dans la phrase',fi:'Apu lauseessa'},
    picOn:        {en:'Picture on',de:'Mit Bild',nl:'Met plaatje',da:'Med billede',sv:'Med bild',no:'Med bilde',es:'Con dibujo',it:'Con disegno',pt:'Com figura',fr:'Avec image',fi:'Kuvan kanssa'},
    picOff:       {en:'Picture off',de:'Ohne Bild',nl:'Zonder plaatje',da:'Uden billede',sv:'Utan bild',no:'Uten bilde',es:'Sin dibujo',it:'Senza disegno',pt:'Sem figura',fr:'Sans image',fi:'Ilman kuvaa'},
    ariaKey:      {en:'Key: {w}',de:'Schlüssel: {w}',nl:'Sleutel: {w}',da:'Nøgle: {w}',sv:'Nyckel: {w}',no:'Nøkkel: {w}',es:'Llave: {w}',it:'Chiave: {w}',pt:'Chave: {w}',fr:'Clé : {w}',fi:'Avain: {w}'},
    ariaLock:     {en:'Lock in: {s}',de:'Schloss in: {s}',nl:'Slot in: {s}',da:'Lås i: {s}',sv:'Lås i: {s}',no:'Lås i: {s}',es:'Candado en: {s}',it:'Lucchetto in: {s}',pt:'Cadeado em: {s}',fr:'Cadenas dans : {s}',fi:'Lukko lauseessa: {s}'},
    ariaLockKey:  {en:'Key {w} in the lock: {s}',de:'Schlüssel {w} im Schloss: {s}',nl:'Sleutel {w} in het slot: {s}',da:'Nøglen {w} i låsen: {s}',sv:'Nyckeln {w} i låset: {s}',no:'Nøkkelen {w} i låsen: {s}',es:'La llave {w} en el candado: {s}',it:'La chiave {w} nel lucchetto: {s}',pt:'A chave {w} no cadeado: {s}',fr:'La clé {w} dans le cadenas : {s}',fi:'Avain {w} lukossa: {s}'},
    ariaTile:     {en:'Letter {l}',de:'Buchstabe {l}',nl:'Letter {l}',da:'Bogstav {l}',sv:'Bokstav {l}',no:'Bokstav {l}',es:'Letra {l}',it:'Lettera {l}',pt:'Letra {l}',fr:'Lettre {l}',fi:'Kirjain {l}'},
    ariaUncut:    {en:'Take back the last tooth',de:'Den letzten Zahn zurücknehmen',nl:'De laatste tand terugnemen',da:'Tag den sidste tand væk',sv:'Ta bort den sista tanden',no:'Ta bort den siste tannen',es:'Quitar el último diente',it:'Togli l’ultimo dente',pt:'Tirar o último dente',fr:'Enlever la dernière dent',fi:'Poista viimeinen hammas'},
    ariaRing:     {en:'Key ring',de:'Schlüsselring',nl:'Sleutelring',da:'Nøglering',sv:'Nyckelring',no:'Nøkkelring',es:'Aro de llaves',it:'Anello delle chiavi',pt:'Argola de chaves',fr:'Anneau de clés',fi:'Avainrengas'},
    ariaPage:     {en:'Sentence {n}',de:'Satz {n}',nl:'Zin {n}',da:'Sætning {n}',sv:'Mening {n}',no:'Setning {n}',es:'Oración {n}',it:'Frase {n}',pt:'Frase {n}',fr:'Phrase {n}',fi:'Lause {n}'}
    /*STRINGS-END*/
  },

  defaults: { game: 'three', pic: 'on' },
  settings: [
    { key: 'game', type: 'choice', labelKey: 'setGame', options: [{ value: 'three', labelKey: 'gThree' }, { value: 'ring', labelKey: 'gRing' }, { value: 'cut', labelKey: 'gCut' }] },
    { key: 'pic', type: 'choice', labelKey: 'setPic', options: [{ value: 'on', labelKey: 'picOn' }, { value: 'off', labelKey: 'picOff' }] }
  ],

  OK_MS: 3000, FAST: false,
  QUOTES: { en: ['“', '”'], de: ['„', '“'], nl: ['‘', '’'], da: ['»', '«'], sv: ['”', '”'], no: ['«', '»'], es: ['«', '»'], it: ['«', '»'], pt: ['“', '”'], fr: ['« ', ' »'], fi: ['”', '”'] },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._deals = null; this._dealKey = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._ring = []; this._focus = -1; this._page = 0; this._drag = null;
    injectKeysCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; this._ring = []; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return WordKeysCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _game: function () { return WordKeysCore.game(this._loc(), this._set('game')); },
  _key: function () { return this._loc() + '/' + this._game(); },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },
  _q: function (s) { var Q = this.QUOTES[this._loc()] || this.QUOTES.en; return Q[0] + s + Q[1]; },
  /* a key's face: with one lock at the start of its sentence every key shows a capital, so case never tells */
  _face: function (w) { var r = this.st.r; return r.game !== 'ring' && r.locks[0].initial ? WordKeysCore.cap(w) : w; },
  _gap: function (lk) { return lk.before + '…' + lk.after; },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = WordKeysCore.rounds(this._loc(), this._game()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = WordKeysCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); this._deals = null; this._ring = []; }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); this._deals = null; this._ring = []; }
    if (!this._deals || this._dealKey !== this._poolKey || this._deals.length !== n) {
      var g = pool[0].game;
      this._deals = g === 'three' ? C.dealThree(pool, Math.random, pass) : g === 'ring' ? C.dealRing(pool, Math.random) : pool.map(function (r) { return C.tray(r, Math.random); });
      this._dealKey = this._poolKey;
    }
    var r = pool[this._order[index % n]], deal = this._deals[this._order[index % n]];
    var pk = r.game === 'three' ? 'pThree' : r.game === 'ring' ? 'pRing' : 'pCut';
    /* the shell interpolates the celebration with promptArgs */
    var pa = r.game === 'ring' ? { list: r.keys.map(function (w) { return self._q(w); }).join(', ') } : { s: this._q(C.filled(r.locks[0], r.target)), w: this._q(r.target) };
    return {
      id: 'word-keys.' + r.loc + '.' + r.id, promptKey: pk, promptArgs: pa, celebrateKey: r.game === 'ring' ? 'okRing' : 'okThree', answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._view = {}; tool._focus = -1; tool._page = 0; tool._drag = null;
        tool.st = C.newState(r, r.game === 'cut' ? { tiles: deal, keys: [] } : { keys: deal });
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = WordKeysCore, r0 = C.rounds(this._loc(), 'three')[0]; this.st = C.newState(r0, {}); }
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
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var L = this._L = WordKeysCore.layout(this._width());
    var wrap = api.el('div', 'wky-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 340 ? ' is-tiny' : '')); this._wrap = wrap; wrap.tabIndex = -1;
    [['pic', L.pic], ['rpic', L.rpic], ['font', L.font], ['rfont', L.rfont], ['tooth', L.tooth], ['letter', L.letter], ['keyh', L.keyH], ['bow', L.bow], ['lockw', L.lockW], ['lockh', L.lockH], ['tile', L.tile]].forEach(function (p) { wrap.style.setProperty('--wky-' + p[0], p[1] + 'px'); });
    this._ringEl = api.el('div', 'wky-ring'); if (L.mode === 'wide') wrap.appendChild(this._ringEl);
    this._boards = api.el('div', 'wky-boards'); wrap.appendChild(this._boards);
    this._rail = api.el('div', 'wky-rail'); wrap.appendChild(this._rail);
    var ask = api.el('div', 'wky-ask'); wrap.appendChild(ask);
    if (L.mode !== 'wide') ask.appendChild(this._ringEl);
    var note = api.el('p', 'wky-note'); note.setAttribute('aria-live', 'polite'); this._note = note; ask.appendChild(note);
    var chk = api.el('button', 'wky-check'); chk.type = 'button'; chk.setAttribute('data-k', 'turn');
    chk.innerHTML = '<span class="wky-twist" aria-hidden="true"></span><span class="wky-checkword"></span>';
    chk.addEventListener('click', function () { self._turn(); }); this._checkBtn = chk; ask.appendChild(chk);
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
    if (!this._boards) return;
    var st = this.st, C = WordKeysCore, r = st.r, v = this._view;
    this._wrap.className = this._wrap.className.replace(/ is-g-\w+| is-nopic/g, '') + ' is-g-' + r.game + (this._set('pic') === 'off' ? ' is-nopic' : '');
    this._wrap.classList.toggle('is-fast', !!this.FAST);
    this._paintRing(); this._paintBoards(); this._paintRail();
    var h = C.hint(st);
    this._note.textContent = st.done ? '' : (h && !this._busy ? this._t(h) : '');
    this._note.classList.toggle('is-wrong', !!(!st.done && st.show && st.last && st.last.result === 'jam'));
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    this._checkBtn.classList.toggle('is-turning', !!v.turning);
    this._checkBtn.querySelector('.wky-checkword').textContent = this._t('check');
  },
  /* the key ring: the keys opened this pass */
  _paintRing: function () {
    var el = this._ringEl, self = this; el.innerHTML = '';
    var b = this.api.el('button', 'wky-ringbtn' + (this._view.jingle ? ' is-jingle' : '')); b.type = 'button'; b.setAttribute('data-k', 'ring'); b.setAttribute('aria-label', this._t('ariaRing') + (this._ring.length ? ': ' + this._ring.join(', ') : ''));
    b.innerHTML = '<span class="wky-hoop" aria-hidden="true"></span>';
    this._ring.slice(-8).forEach(function (w, i) { var k = self.api.el('span', 'wky-mini'); k.style.setProperty('--i', i); k.setAttribute('aria-hidden', 'true'); b.appendChild(k); });
    b.addEventListener('click', function () { self.api.sound(1200); self._view = { jingle: true }; self._paint(); self._later(function () { self._view = {}; self._paint(); }, 500); });
    el.appendChild(b);
  },
  _paintBoards: function () {
    var el = this._boards, st = this.st, r = st.r, self = this, L = this._L; el.innerHTML = '';
    var pager = r.game === 'ring' && L.mode !== 'wide';
    if (pager) {
      var tabs = this.api.el('div', 'wky-tabs'); el.appendChild(tabs);
      r.locks.forEach(function (lk, i) {
        var t = self.api.el('button', 'wky-tab' + (self._page === i ? ' is-on' : '') + (st.opened[i] ? ' is-open' : '') + (st.inLock[i] ? ' is-keyed' : '')); t.type = 'button'; t.setAttribute('data-k', 'page' + i);
        t.setAttribute('aria-label', self._t('ariaPage', { n: i + 1 })); t.setAttribute('aria-pressed', String(self._page === i)); t.textContent = String(i + 1);
        t.addEventListener('click', function () { self._page = i; self._focus = i; self._paint(); }); tabs.appendChild(t);
      });
    }
    r.locks.forEach(function (lk, i) {
      if (pager && self._page !== i) return;
      var b = self.api.el('div', 'wky-board' + (r.game === 'ring' ? ' is-small' : '') + (st.opened[i] ? ' is-open' : '')); b.setAttribute('data-board', i);
      if (lk.pic) { var im = self.api.el('img', 'wky-pic'); im.alt = ''; im.draggable = false; im.src = self._pic(lk.pic); b.appendChild(im); }
      var p = self.api.el('p', 'wky-sent');
      p.appendChild(document.createTextNode(lk.before));
      if (st.opened[i]) { var w = self.api.el('b', 'wky-word' + (self._view.just && self._view.just.indexOf(i) >= 0 ? ' is-drop' : '')); w.textContent = lk.initial ? WordKeysCore.cap(lk.answer) : lk.answer; p.appendChild(w); }
      else p.appendChild(self._lockEl(lk, i));
      p.appendChild(document.createTextNode(lk.after));
      b.appendChild(p); el.appendChild(b);
    });
  },
  /* the padlock: a brass body with a shackle; a key in it shows its teeth; a jammed key shows what differs */
  _lockEl: function (lk, i) {
    var st = this.st, C = WordKeysCore, self = this, key = st.r.game === 'cut' ? (st.cut || null) : st.inLock[i], help = C.lockHelp(st, i), v = this._view;
    var b = this.api.el('button', 'wky-lock' + (key ? ' has-key' : '') + (this._focus === i && st.r.game === 'ring' ? ' is-focus' : '') + (help ? ' is-jam' : '') + (help && help.glass ? ' is-glass' : '') + (v.shake && v.shake.indexOf(i) >= 0 ? ' is-shake' : '') + (v.glint ? ' is-glint' : ''));
    b.type = 'button'; b.setAttribute('data-k', 'lock' + i); b.setAttribute('data-lock', i);
    b.setAttribute('aria-label', key ? this._t('ariaLockKey', { w: key, s: this._gap(lk) }) : this._t('ariaLock', { s: this._gap(lk) }));
    var sh = this.api.el('span', 'wky-shackle'); sh.setAttribute('aria-hidden', 'true'); b.appendChild(sh);
    var body = this.api.el('span', 'wky-body'); b.appendChild(body);
    if (!key) { var kh = this.api.el('span', 'wky-hole'); kh.setAttribute('aria-hidden', 'true'); body.appendChild(kh); }
    else {
      var face = st.r.game === 'cut' ? (lk.initial ? C.cap(key) : key) : this._face(key);
      var teeth = this.api.el('span', 'wky-lteeth'); teeth.style.setProperty('--n', Math.max(3, Array.from(face).length + (help ? help.diff.missing : 0)));
      Array.from(face).forEach(function (ch, k) {
        var t = self.api.el('span', 'wky-lt'); t.textContent = ch;
        if (help && help.diff.glow.indexOf(k) >= 0) t.classList.add('is-diff');
        if (help && help.diff.extra.indexOf(k) >= 0) t.classList.add('is-extra');
        teeth.appendChild(t);
      });
      if (help) for (var m = 0; m < help.diff.missing; m++) { var e = self.api.el('span', 'wky-lt is-empty'); e.textContent = ' '; teeth.appendChild(e); }
      body.appendChild(teeth);
    }
    if (help && help.glass) {
      var pins = this.api.el('span', 'wky-pins'); pins.setAttribute('aria-hidden', 'true');
      var ans = Array.from(lk.initial ? C.cap(lk.answer) : lk.answer);
      for (var q = 0; q < help.pins; q++) { var pn = self.api.el('span', 'wky-pin' + (help.diff.glow.indexOf(q) >= 0 ? ' is-diff' : '')); if (help.ghost) pn.textContent = ans[q]; pins.appendChild(pn); }
      body.appendChild(pins);
    }
    b.addEventListener('click', function () { self._lockTap(i); });
    b.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { ev.preventDefault(); self._out(i); } });
    return b;
  },
  _keyEl: function (w, cls) {
    var self = this, b = this.api.el('button', 'wky-key' + (cls || '')); b.type = 'button'; b.setAttribute('data-k', 'key-' + w); b.setAttribute('data-key', w);
    b.setAttribute('aria-label', this._t('ariaKey', { w: this._face(w) }));
    b.innerHTML = '<span class="wky-bow" aria-hidden="true"></span>';
    var blade = this.api.el('span', 'wky-blade');
    Array.from(this._face(w)).forEach(function (ch) { var t = self.api.el('span', 'wky-tooth'); t.textContent = ch; blade.appendChild(t); });
    b.appendChild(blade);
    return b;
  },
  _paintRail: function () {
    var el = this._rail, st = this.st, r = st.r, self = this; el.innerHTML = '';
    if (r.game === 'cut') return this._paintCutter();
    st.keys.forEach(function (w) {
      var inAt = st.inLock.indexOf(w);
      if (inAt >= 0) { var peg = self.api.el('span', 'wky-peg'); peg.setAttribute('aria-hidden', 'true'); el.appendChild(peg); return; }
      var k = self._keyEl(w); self._bindKey(k, w); el.appendChild(k);
    });
  },
  /* the cutting machine: a blank key cut tooth by tooth from the tray */
  _paintCutter: function () {
    var el = this._rail, st = this.st, self = this; el.innerHTML = '';
    var m = this.api.el('div', 'wky-cutter'); el.appendChild(m);
    var blank = this.api.el('div', 'wky-key is-blank'); blank.setAttribute('aria-hidden', 'true'); blank.innerHTML = '<span class="wky-bow"></span>';
    var blade = this.api.el('span', 'wky-blade'), lk = st.r.locks[0], face = st.cut ? (lk.initial ? WordKeysCore.cap(st.cut) : st.cut) : '';
    Array.from(face).forEach(function (ch, i) { var t = self.api.el('span', 'wky-tooth' + (self._view.cutAt === i ? ' is-cut' : '')); t.textContent = ch; blade.appendChild(t); });
    var next = this.api.el('span', 'wky-tooth is-next'); next.textContent = ' '; blade.appendChild(next);
    blank.appendChild(blade); m.appendChild(blank);
    var row = this.api.el('div', 'wky-tray'); m.appendChild(row);
    st.tiles.forEach(function (ch) {
      var t = self.api.el('button', 'wky-tile'); t.type = 'button'; t.setAttribute('data-k', 'tile-' + ch); t.textContent = lk.initial && !st.cut ? ch.toLocaleUpperCase() : ch; t.setAttribute('aria-label', self._t('ariaTile', { l: ch }));
      t.addEventListener('click', function () { self._cut(ch); }); row.appendChild(t);
    });
    var u = this.api.el('button', 'wky-uncut'); u.type = 'button'; u.setAttribute('data-k', 'uncut'); u.setAttribute('aria-label', this._t('ariaUncut'));
    u.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5h11v14H9l-6-7z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 9l6 6M18 9l-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
    u.disabled = !st.cut; u.addEventListener('click', function () { self._uncut(); }); row.appendChild(u);
  },

  /* ---------------- the hand ---------------- */
  _targetLock: function () {
    var st = this.st;
    if (st.r.game !== 'ring') return 0;
    if (this._focus >= 0 && !st.opened[this._focus]) return this._focus;
    if (this._L.mode !== 'wide' && !st.opened[this._page]) return this._page;
    for (var i = 0; i < st.inLock.length; i++) if (!st.opened[i] && !st.inLock[i]) return i;
    for (var j = 0; j < st.inLock.length; j++) if (!st.opened[j]) return j;
    return -1;
  },
  _in: function (w, li) {
    if (this._busy || this.st.done) return;
    if (li === undefined) li = this._targetLock();
    if (WordKeysCore.insert(this.st, w, li)) { this._view = {}; this._focus = -1; this.api.sound(700); this._paint(); }
  },
  _out: function (li) { if (this._busy) return; if (WordKeysCore.remove(this.st, li)) { this._view = {}; this.api.sound(380); this._paint(); } },
  _lockTap: function (li) {
    var st = this.st; if (this._busy || st.done) return;
    if (st.r.game !== 'cut' && st.inLock[li]) return this._out(li);
    if (st.r.game === 'ring') { this._focus = this._focus === li ? -1 : li; this.api.sound(520); this._paint(); }
  },
  _cut: function (ch) { if (this._busy) return; if (WordKeysCore.cutLetter(this.st, ch)) { this._view = { cutAt: Array.from(this.st.cut).length - 1 }; this.api.sound(900); this._paint(); } },
  _uncut: function () { if (this._busy) return; if (WordKeysCore.uncut(this.st)) { this._view = {}; this.api.sound(330); this._paint(); } },
  _bindKey: function (b, w) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.button !== undefined && ev.button !== 0)) return;
      var sx = ev.clientX, sy = ev.clientY, moved = false, ghost = null;
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
      var hitAt = function (x, y) { var ls = self._wrap.querySelectorAll('.wky-lock'); for (var z = 0; z < ls.length; z++) { var rc = ls[z].getBoundingClientRect(); if (x >= rc.left - 16 && x <= rc.right + 16 && y >= rc.top - 16 && y <= rc.bottom + 16) return +ls[z].getAttribute('data-lock'); } return -1; };
      var move = function (e) {
        if (!moved && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!moved) { moved = true; self._drag = {}; ghost = b.cloneNode(true); ghost.className = 'wky-key wky-ghost'; document.body.appendChild(ghost); b.classList.add('is-lifted'); self.api.sound(1100); }
        ghost.style.left = (e.clientX - 20) + 'px'; ghost.style.top = (e.clientY - 26) + 'px';
        var h = hitAt(e.clientX, e.clientY);
        [].forEach.call(self._wrap.querySelectorAll('.wky-lock'), function (s) { s.classList.toggle('is-over', +s.getAttribute('data-lock') === h); });
      };
      var up = function (e) {
        b.removeEventListener('pointermove', move); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up);
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        b.classList.remove('is-lifted'); self._drag = null;
        if (!moved) { if (e.type === 'pointerup') self._in(w); return; }
        var h = hitAt(e.clientX, e.clientY);
        if (h >= 0) self._in(w, h); else self._paint();
      };
      b.addEventListener('pointermove', move); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
      ev.preventDefault();
    });
    b.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); self._in(w); } });
  },
  _onKey: function (ev) {
    var st = this.st, k = ev.key;
    if (st.r.game === 'cut' && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
      if (k === 'Backspace') { ev.preventDefault(); this._uncut(); return; }
      if (k.length === 1 && st.tiles.indexOf(k.toLocaleLowerCase()) >= 0) { ev.preventDefault(); this._cut(k.toLocaleLowerCase()); return; }
    }
    if (k === 'Enter' && ev.target === this._wrap) { ev.preventDefault(); this._turn(); }
  },

  _turn: function () {
    if (this._busy || this.st.done) return;
    var self = this, st = this.st, C = WordKeysCore;
    var res = C.turn(st);
    if (res.kase === 'empty') { this.api.sound(460); this._view = { glint: true }; this._paint(); this._later(function () { if (self._view.glint) { self._view = {}; self._paint(); } }, 1200); return; }
    var opened = res.opened || [];
    opened.forEach(function (i) { var w = st.r.locks[i].answer; if (self._ring.indexOf(w) < 0) self._ring.push(w); });
    /* the key turns a quarter-turn: clunk, the shackle pops, the word drops in; a wrong key rattles and will not turn */
    this._busy = true; this._view = { turning: true, just: opened, shake: (res.jammed || []).map(function (j) { return j.lock; }), jingle: !!opened.length };
    if (opened.length) this.api.sound(196);
    if (res.jammed && res.jammed.length) this._later(function () { self.api.sound(150); }, this._ms(120));
    this._paint();
    if (opened.length) opened.forEach(function (i) { self._say(C.filled(st.r.locks[i], st.r.locks[i].answer)); });
    if (res.ok) return this._win();
    this._later(function () { self._busy = false; self._view = { just: opened }; if (self._L.mode !== 'wide' && st.r.game === 'ring' && st.opened[self._page]) { var nx = st.opened.indexOf(false); if (nx >= 0) self._page = nx; } self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(650));
  },
  _win: function () {
    var self = this;
    this._later(function () {
      self._busy = false; self._view = { just: self.st.r.locks.map(function (_, i) { return i; }), won: true };
      self.api.sound(659); self._later(function () { self.api.sound(784); }, 110); self._later(function () { self.api.sound(1046); }, 220);
      self._paint(); self.api.announce(self._note.textContent || '');
    }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.FAST ? this.OK_MS : this.OK_MS + 500);
  }
};

var wkyCssDone = false;
function injectKeysCSS() {
  if (wkyCssDone || typeof document === 'undefined') return;
  wkyCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var brass = 'linear-gradient(180deg,#E8BC5A,#D9A441 55%,#C08A2E)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.wky-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:14px;--wky-ink:#2A2A35;--wky-teal:#146B5E;--wky-coral:#F2784B;--wky-cream:#FFF8EC;--wky-brass:#D9A441;user-select:none;-webkit-user-select:none;}'
  + '.wky-wrap:focus{outline:none;}'
  /* the key ring */
  + '.wky-ring{display:flex;justify-content:flex-start;width:100%;max-width:640px;}'
  + '.wky-ringbtn{position:relative;display:flex;align-items:center;gap:0;min-width:44px;min-height:44px;padding:0 10px 0 4px;border:0;background:transparent;cursor:pointer;}'
  + '.wky-hoop{display:block;width:30px;height:30px;border-radius:50%;box-shadow:inset 0 0 0 4px #8E8676;}'
  + '.wky-mini{display:block;width:14px;height:30px;margin-left:-4px;border-radius:7px 7px 3px 3px;background:' + brass + ';box-shadow:inset 0 0 0 2px #8A6420;transform:rotate(calc(var(--i) * 6deg - 12deg));transform-origin:50% 0;}'
  + '.wky-ringbtn.is-jingle .wky-mini{animation:wky-jingle .45s ease-in-out;} @keyframes wky-jingle{30%{transform:rotate(-18deg);}70%{transform:rotate(14deg);}}'
  /* the sentence boards */
  + '.wky-boards{display:flex;flex-direction:column;gap:10px;width:100%;max-width:640px;}'
  + '.wky-board{display:flex;align-items:center;gap:16px;padding:12px 16px;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 2px #E2D6BE;box-sizing:border-box;}'
  + '.wky-pic{width:var(--wky-pic);height:var(--wky-pic);object-fit:contain;flex:none;}'
  + '.wky-board.is-small .wky-pic{width:var(--wky-rpic);height:var(--wky-rpic);}'
  + '.wky-wrap.is-nopic .wky-pic{display:none;} .wky-wrap.is-nopic .wky-board{justify-content:center;}'
  + '.wky-sent{margin:0;font-family:' + B + ';font-weight:700;font-size:var(--wky-font);line-height:1.5;color:var(--wky-ink);}'
  + '.wky-board.is-small .wky-sent{font-size:var(--wky-rfont);}'
  + '.wky-word{color:var(--wky-teal);} .wky-word.is-drop{animation:wky-drop .3s ease-out;} @keyframes wky-drop{0%{transform:translateY(-14px);opacity:0;}}'
  + '.wky-board.is-open{box-shadow:inset 0 0 0 2px rgba(20,107,94,.4);}'
  /* the padlock — the same size for every word, so its size never tells the length */
  + '.wky-lock{position:relative;display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;width:var(--wky-lockw);height:calc(var(--wky-lockh) + 18px);margin:0 4px;padding:18px 0 0;border:0;background:transparent;cursor:pointer;}'
  + '.wky-shackle{position:absolute;top:0;left:50%;width:46%;height:30px;margin-left:-23%;border:6px solid #8E8676;border-bottom:0;border-radius:24px 24px 0 0;box-sizing:border-box;transition:transform .12s;}'
  + '.wky-body{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;height:var(--wky-lockh);border-radius:12px;background:' + brass + ';box-shadow:inset 0 0 0 3px var(--wky-ink),0 3px 0 #8A6420;box-sizing:border-box;padding:4px;}'
  + '.wky-hole{display:block;width:12px;height:22px;border-radius:6px 6px 3px 3px;background:var(--wky-ink);}'
  + '.wky-lock.is-glint .wky-hole{animation:wky-glint .4s ease-in-out 3;} @keyframes wky-glint{50%{box-shadow:0 0 0 5px rgba(255,255,255,.8);}}'
  + '.wky-lock.is-focus .wky-body{box-shadow:inset 0 0 0 3px var(--wky-coral),0 0 0 4px rgba(242,120,75,.35),0 3px 0 #8A6420;}'
  + '.wky-lock.is-over .wky-body{box-shadow:inset 0 0 0 3px var(--wky-teal),0 0 0 5px rgba(20,107,94,.3);}'
  + '.wky-lteeth{display:flex;align-items:center;justify-content:center;gap:1px;font-family:' + D + ';font-weight:800;line-height:1;color:var(--wky-ink);font-size:min(calc(var(--wky-letter) * .82),calc((var(--wky-lockw) - 14px) / (var(--n) * .62)));white-space:nowrap;}'
  + '.wky-lt{display:inline-block;padding:1px 2px;border-radius:4px;background:rgba(255,248,236,.85);}'
  + '.wky-lt.is-diff{background:#FFD9C7;color:#B23E14;box-shadow:0 0 0 2px var(--wky-coral);}'
  + '.wky-lt.is-extra{background:#FFD9C7;color:#B23E14;box-shadow:0 0 0 2px var(--wky-coral);transform:translateX(10px);}'
  + '.wky-lt.is-empty{min-width:.5em;background:transparent;box-shadow:0 0 0 2px var(--wky-coral) inset;border:2px dashed var(--wky-coral);}'
  + '.wky-lock.is-glass .wky-body{background:linear-gradient(180deg,rgba(214,236,240,.95),rgba(180,214,222,.95));}'
  + '.wky-pins{display:flex;gap:4px;justify-content:center;}'
  + '.wky-pin{display:inline-flex;align-items:center;justify-content:center;min-width:14px;height:14px;border-radius:3px;background:#5F6B78;color:rgba(42,42,53,.35);font-family:' + D + ';font-weight:800;font-size:12px;line-height:1;}'
  + '.wky-pin.is-diff{background:var(--wky-coral);}'
  + '.wky-lock.is-shake .wky-body{animation:wky-rattle .1s ease-in-out 4;} @keyframes wky-rattle{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}}'
  /* the keys */
  + '.wky-rail{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px 18px;width:100%;max-width:640px;padding:12px 8px 6px;box-sizing:border-box;border-top:6px solid #B9905B;border-radius:4px;}'
  + '.wky-key{position:relative;display:inline-flex;align-items:center;height:var(--wky-keyh);padding:0 10px 0 0;border:0;background:transparent;cursor:pointer;touch-action:none;}'
  + '.wky-bow{display:block;width:var(--wky-bow);height:var(--wky-bow);flex:none;border-radius:50%;background:' + brass + ';box-shadow:inset 0 0 0 3px var(--wky-ink),inset 0 0 0 calc(var(--wky-bow) * .3) #E8BC5A,inset 0 0 0 calc(var(--wky-bow) * .3 + 3px) var(--wky-ink);}'
  + '.wky-blade{display:flex;align-items:flex-start;height:calc(var(--wky-keyh) * .62);margin-left:-3px;padding:0 6px 0 4px;border-radius:0 8px 8px 0;background:' + brass + ';box-shadow:inset 0 0 0 3px var(--wky-ink);}'
  + '.wky-tooth{position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--wky-tooth);height:100%;font-family:' + D + ';font-weight:800;font-size:var(--wky-letter);line-height:1;color:var(--wky-ink);}'
  + '.wky-tooth::after{content:"";position:absolute;left:22%;right:22%;bottom:-9px;height:9px;background:#C08A2E;box-shadow:inset 0 -3px 0 var(--wky-ink),inset 3px 0 0 var(--wky-ink),inset -3px 0 0 var(--wky-ink);clip-path:polygon(0 0,100% 0,70% 100%,30% 100%);}'
  + '.wky-key:focus-visible{outline:3px solid var(--wky-coral);outline-offset:3px;border-radius:12px;}'
  + '.wky-key.is-lifted{opacity:.35;} .wky-ghost{position:fixed;z-index:9999;pointer-events:none;transform:rotate(-8deg);filter:drop-shadow(0 8px 10px rgba(0,0,0,.25));}'
  + '.wky-peg{display:block;width:12px;height:24px;border-radius:6px;background:#B9905B;}'
  /* the key-ring pager (phones) */
  + '.wky-tabs{display:flex;justify-content:center;gap:10px;}'
  + '.wky-tab{min-width:44px;height:44px;border:0;border-radius:22px;background:#F3EAD8;font-family:' + D + ';font-weight:800;font-size:18px;color:var(--wky-ink);cursor:pointer;}'
  + '.wky-tab.is-on{background:var(--wky-teal);color:#fff;} .wky-tab.is-open{box-shadow:inset 0 0 0 3px var(--wky-teal);} .wky-tab.is-keyed:not(.is-open){box-shadow:inset 0 0 0 3px var(--wky-brass);}'
  /* the cutting machine */
  + '.wky-cutter{display:flex;flex-direction:column;align-items:center;gap:12px;}'
  + '.wky-key.is-blank{cursor:default;} .wky-tooth.is-next{background:rgba(255,255,255,.5);border-radius:4px;animation:wky-blink 1s step-end infinite;} @keyframes wky-blink{50%{background:transparent;}}'
  + '.wky-tooth.is-cut{animation:wky-zzt .2s ease-out;} @keyframes wky-zzt{0%{transform:translateY(-6px);color:#fff;}}'
  + '.wky-tray{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:600px;}'
  + '.wky-tile{width:var(--wky-tile);height:52px;border:0;border-radius:12px;background:var(--wky-cream);box-shadow:inset 0 0 0 3px var(--wky-ink),0 3px 0 #C9B999;font-family:' + D + ';font-weight:800;font-size:28px;color:var(--wky-ink);cursor:pointer;}'
  + '.wky-tile:active{transform:translateY(2px);}'
  + '.wky-uncut{width:52px;height:52px;border:0;border-radius:12px;background:#F3EAD8;color:var(--wky-ink);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;} .wky-uncut:disabled{opacity:.4;}'
  /* the ask strip */
  + '.wky-ask{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;max-width:640px;}'
  + '.wky-note{flex:1;min-height:28px;margin:0;font-weight:700;font-size:clamp(15px,2.3vw,18px);line-height:1.3;font-family:' + B + ';color:var(--wky-teal);text-align:center;} .wky-note:empty{visibility:hidden;} .wky-note.is-wrong{color:#A6461F;}'
  + '.wky-check{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 20px 0 12px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;font-family:' + D + ';cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .wky-check[hidden]{display:none;} .wky-check:disabled{opacity:.6;}'
  + '.wky-twist{display:block;width:20px;height:20px;border-radius:50%;border:3px solid #fff;border-right-color:transparent;transition:transform .3s;} .wky-check.is-turning .wky-twist{transform:rotate(90deg);}'
  + '.wky-wrap.is-narrow{gap:10px;} .wky-wrap.is-narrow .wky-board{flex-direction:row;gap:10px;padding:8px 10px;} .wky-wrap.is-narrow .wky-note{text-align:left;} .wky-wrap.is-narrow .wky-ask{align-items:flex-start;} .wky-wrap.is-tiny{gap:7px;} .wky-wrap.is-tiny .wky-rail{padding-top:6px;gap:8px 10px;} .wky-wrap.is-tiny .wky-board{padding:6px 8px;}'
  + '.wky-wrap.is-narrow .wky-rail{gap:10px 12px;padding-top:10px;} .wky-wrap.is-narrow .wky-ask .wky-ring{width:auto;flex:none;}'
  + '.wky-wrap.is-fast *,.wky-wrap.is-fast *::before,.wky-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.wky-wrap *{animation-duration:.2s !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'wky-css'; s.textContent = css; document.head.appendChild(s);
}
