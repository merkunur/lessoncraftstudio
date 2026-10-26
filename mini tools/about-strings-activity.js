/* =====================================================================
   about-strings-activity.js — ACTIVITY #79 of the one-by-one rebuild:
   "The Wobble Museum" → THE ABOUT-STRINGS (W.K.2, 11 locales).
   Design sheet: docs/activities-rebuild/designs/079-wobble-museum.md
   ---------------------------------------------------------------------
   THE INVENTION: every sentence card in Bram's museum hangs by a string,
   and the string must be hooked to what the sentence is ABOUT — the room's
   big sign or the next room's sign through the doorway. At Check the
   off-topic card is pulled out through the door into its own room, and the
   room's facts become a page on the lectern ("All about frogs"). A miss
   lights each card's about-word (and the "They" card points back to the
   card it means); miss 2 draws a dotted thread to the right sign.
   Levels: Catch the drift · Make the page (choose the facts from a cart) ·
   Name the room (three "They/It" facts — put the right picture in the
   empty frame).
   ACTIVITY LAYER ONLY: the model is about-strings-core.js; pictures through
   lcs-pictures.js; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.AboutStringsActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var AboutStringsActivity = {
  id: 'about-strings',
  apparatusClasses: ['as-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'The Wobble Museum',de:'Brams Museum',nl:'Het museum van Bram',da:'Brams museum',sv:'Brams museum',no:'Brams museum',es:'El museo de Bram',it:'Il museo di Bram',pt:'O museu do Bram',fr:'Le musée de Bram',fi:'Bramin museo'},
    tL1:         {en:'Hook each card’s string to what the card is about.',de:'Häng die Schnur jeder Karte an das, wovon die Karte erzählt.',nl:'Hang het touwtje van elke kaart aan waar die kaart over gaat.',da:'Sæt hvert korts snor fast på det, kortet handler om.',sv:'Fäst varje korts snöre vid det som kortet handlar om.',no:'Fest snora på hvert kort til det kortet handler om.',es:'Engancha el hilo de cada tarjeta en aquello de lo que habla.',it:'Aggancia il filo di ogni cartellino a ciò di cui parla.',pt:'Prenda o barbante de cada cartão naquilo de que ele fala.',fr:'Accroche le fil de chaque carte à ce dont elle parle.',fi:'Kiinnitä jokaisen kortin naru siihen, mistä kortti kertoo.'},
    tL2:         {en:'Hang the cards that belong on this page.',de:'Häng die Karten auf, die auf diese Seite gehören.',nl:'Hang de kaarten op die bij deze bladzijde horen.',da:'Hæng de kort op, der hører til på denne side.',sv:'Häng upp korten som hör till den här sidan.',no:'Heng opp kortene som hører hjemme på denne siden.',es:'Cuelga las tarjetas que van en esta página.',it:'Appendi i cartellini che vanno su questa pagina.',pt:'Pendure os cartões que combinam com esta página.',fr:'Accroche les cartes qui vont sur cette page.',fi:'Ripusta kortit, jotka kuuluvat tälle sivulle.'},
    tL3:         {en:'What are these cards about? Put a picture in the frame.',de:'Wovon erzählen diese Karten? Leg ein Bild in den Rahmen.',nl:'Waar gaan deze kaarten over? Zet een plaatje in de lijst.',da:'Hvad handler kortene om? Sæt et billede i rammen.',sv:'Vad handlar korten om? Sätt en bild i ramen.',no:'Hva handler kortene om? Sett et bilde i rammen.',es:'¿De qué hablan estas tarjetas? Pon un dibujo en el marco.',it:'Di che cosa parlano questi cartellini? Metti un’immagine nella cornice.',pt:'Sobre o que são estes cartões? Coloque uma figura na moldura.',fr:'De quoi parlent ces cartes ? Mets une image dans le cadre.',fi:'Mistä nämä kortit kertovat? Laita kuva kehykseen.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hLoose:      {en:'Every card needs its string on a picture.',de:'Jede Karte braucht ihre Schnur an einem Bild.',nl:'Elke kaart moet met het touwtje aan een plaatje hangen.',da:'Hvert kort skal have sin snor på et billede.',sv:'Varje kort behöver sitt snöre på en bild.',no:'Hvert kort trenger snora si på et bilde.',es:'Cada tarjeta necesita su hilo en un dibujo.',it:'Ogni cartellino ha bisogno del suo filo su un’immagine.',pt:'Cada cartão precisa do barbante preso em uma figura.',fr:'Chaque carte doit avoir son fil sur une image.',fi:'Jokaisen kortin narun pitää olla kiinni kuvassa.'},
    hFrame:      {en:'Put a picture in the frame.',de:'Leg ein Bild in den Rahmen.',nl:'Zet een plaatje in de lijst.',da:'Sæt et billede i rammen.',sv:'Sätt en bild i ramen.',no:'Sett et bilde i rammen.',es:'Pon un dibujo en el marco.',it:'Metti un’immagine nella cornice.',pt:'Coloque uma figura na moldura.',fr:'Mets une image dans le cadre.',fi:'Laita kuva kehykseen.'},
    hMiss1:      {en:'Look at the shining words: that is what each card is about.',de:'Schau auf die leuchtenden Wörter: Davon erzählt jede Karte.',nl:'Kijk naar de woorden die oplichten: daar gaat elke kaart over.',da:'Se på ordene, der lyser: Det er det, hvert kort handler om.',sv:'Titta på orden som lyser: det är det varje kort handlar om.',no:'Se på ordene som lyser: Det er det hvert kort handler om.',es:'Mira las palabras que brillan: de eso habla cada tarjeta.',it:'Guarda le parole che brillano: è di questo che parla ogni cartellino.',pt:'Olhe as palavras que brilham: é disso que cada cartão fala.',fr:'Regarde les mots qui brillent : c’est de ça que parle chaque carte.',fi:'Katso hehkuvia sanoja: niistä kukin kortti kertoo.'},
    hMiss2:      {en:'Follow the dotted line: this string wants to go there.',de:'Folge der gepunkteten Linie: Dorthin will diese Schnur.',nl:'Volg de stippellijn: daar wil dit touwtje heen.',da:'Følg den prikkede linje: Derhen vil snoren.',sv:'Följ den prickade linjen: dit vill snöret.',no:'Følg den prikkete linjen: Dit vil snora.',es:'Sigue la línea de puntos: el hilo quiere ir allá.',it:'Segui la linea tratteggiata: il filo vuole andare là.',pt:'Siga a linha pontilhada: o barbante quer ir para lá.',fr:'Suis la ligne pointillée : le fil veut aller là-bas.',fi:'Seuraa pisteviivaa: naru haluaa tuonne.'},
    hMissing:    {en:'A card about this room is still on the cart.',de:'Eine Karte über diesen Raum liegt noch auf dem Wagen.',nl:'Er ligt nog een kaart over deze kamer op het karretje.',da:'Et kort om dette rum ligger stadig på vognen.',sv:'Ett kort om det här rummet ligger kvar på vagnen.',no:'Et kort om dette rommet ligger fortsatt på vogna.',es:'Todavía hay una tarjeta de este cuarto en el carrito.',it:'C’è ancora un cartellino di questa stanza sul carrello.',pt:'Ainda tem um cartão desta sala no carrinho.',fr:'Une carte de cette salle est encore sur le chariot.',fi:'Kärryssä on vielä kortti, joka kertoo tästä huoneesta.'},
    hMissing2:   {en:'The glowing card belongs on this page. Hang it up.',de:'Die leuchtende Karte gehört auf diese Seite. Häng sie auf.',nl:'De kaart die oplicht, hoort op deze bladzijde. Hang hem op.',da:'Kortet, der lyser, hører til på denne side. Hæng det op.',sv:'Kortet som lyser hör till den här sidan. Häng upp det.',no:'Kortet som lyser, hører hjemme på denne siden. Heng det opp.',es:'La tarjeta que brilla va en esta página. Cuélgala.',it:'Il cartellino che brilla va su questa pagina. Appendilo.',pt:'O cartão que brilha é desta página. Pendure-o.',fr:'La carte qui brille va sur cette page. Accroche-la.',fi:'Hehkuva kortti kuuluu tälle sivulle. Ripusta se.'},
    hSign:       {en:'The strings sag where a card is not about this picture.',de:'Wo eine Karte nicht von diesem Bild erzählt, hängt die Schnur durch.',nl:'Waar een kaart niet over dit plaatje gaat, hangt het touwtje slap.',da:'Snoren hænger slapt, hvor et kort ikke handler om billedet.',sv:'Snöret hänger slakt där ett kort inte handlar om bilden.',no:'Snora henger slakt der et kort ikke handler om bildet.',es:'El hilo se afloja donde una tarjeta no habla de este dibujo.',it:'Il filo si allenta dove un cartellino non parla di questa immagine.',pt:'O barbante fica frouxo onde o cartão não fala desta figura.',fr:'Le fil se détend là où une carte ne parle pas de cette image.',fi:'Naru löystyy, jos kortti ei kerro tästä kuvasta.'},
    hSign2:      {en:'The glowing picture fits every card.',de:'Das leuchtende Bild passt zu jeder Karte.',nl:'Het plaatje dat oplicht, past bij elke kaart.',da:'Billedet, der lyser, passer til alle kortene.',sv:'Bilden som lyser passar till alla korten.',no:'Bildet som lyser, passer til alle kortene.',es:'El dibujo que brilla va con todas las tarjetas.',it:'L’immagine che brilla va bene per tutti i cartellini.',pt:'A figura que brilha combina com todos os cartões.',fr:'L’image qui brille va avec toutes les cartes.',fi:'Hehkuva kuva sopii jokaiseen korttiin.'},
    okDrift:     {en:'{title}! The card about something else went to its own room.',de:'{title}! Die Karte über etwas anderes ist in ihren eigenen Raum gegangen.',nl:'{title}! De kaart over iets anders is naar zijn eigen kamer gegaan.',da:'{title}! Kortet om noget andet er gået ind i sit eget rum.',sv:'{title}! Kortet om något annat gick till sitt eget rum.',no:'{title}! Kortet om noe annet gikk til sitt eget rom.',es:'¡{title}! La tarjeta que habla de otra cosa se fue a su propio cuarto.',it:'{title}! Il cartellino che parla d’altro è andato nella sua stanza.',pt:'{title}! O cartão que fala de outra coisa foi para a sala dele.',fr:'{title} ! La carte qui parle d’autre chose est partie dans sa salle.',fi:'{title}! Toisesta asiasta kertova kortti meni omaan huoneeseensa.'},
    okPage:      {en:'{title}! Every card on the page is about the same thing.',de:'{title}! Jede Karte auf der Seite erzählt von derselben Sache.',nl:'{title}! Elke kaart op de bladzijde gaat over hetzelfde.',da:'{title}! Alle kortene på siden handler om det samme.',sv:'{title}! Alla korten på sidan handlar om samma sak.',no:'{title}! Alle kortene på siden handler om det samme.',es:'¡{title}! Todas las tarjetas de la página hablan de lo mismo.',it:'{title}! Tutti i cartellini della pagina parlano della stessa cosa.',pt:'{title}! Todos os cartões da página falam da mesma coisa.',fr:'{title} ! Toutes les cartes de la page parlent de la même chose.',fi:'{title}! Kaikki sivun kortit kertovat samasta asiasta.'},
    setLevel:    {en:'Round types',de:'Runden',nl:'Soort rondes',da:'Slags runder',sv:'Typer av omgångar',no:'Typer runder',es:'Tipo de rondas',it:'Tipi di turno',pt:'Tipos de rodada',fr:'Types de manches',fi:'Kierrostyypit'},
    l1:          {en:'Catch the drift',de:'Die fremde Karte',nl:'De vreemde kaart',da:'Det fremmede kort',sv:'Det främmande kortet',no:'Det fremmede kortet',es:'La tarjeta intrusa',it:'Il cartellino intruso',pt:'O cartão intruso',fr:'La carte intruse',fi:'Vieras kortti'},
    l2:          {en:'Make the page',de:'Die Seite machen',nl:'Maak de bladzijde',da:'Lav siden',sv:'Gör sidan',no:'Lag siden',es:'Haz la página',it:'Fai la pagina',pt:'Faça a página',fr:'Faire la page',fi:'Tee sivu'},
    l3:          {en:'Name the room',de:'Den Raum benennen',nl:'Geef de kamer een naam',da:'Navngiv rummet',sv:'Ge rummet ett namn',no:'Gi rommet et navn',es:'Ponle nombre al cuarto',it:'Dai un nome alla stanza',pt:'Dê nome à sala',fr:'Nommer la salle',fi:'Nimeä huone'},
    setHelp:     {en:'Words that help',de:'Hilfswörter',nl:'Hulpwoorden',da:'Hjælpeord',sv:'Hjälpord',no:'Hjelpeord',es:'Palabras que ayudan',it:'Parole che aiutano',pt:'Palavras que ajudam',fr:'Mots qui aident',fi:'Apusanat'},
    hOff:        {en:'Off',de:'Aus',nl:'Uit',da:'Fra',sv:'Av',no:'Av',es:'No',it:'No',pt:'Não',fr:'Non',fi:'Pois'},
    hOn:         {en:'On',de:'An',nl:'Aan',da:'Til',sv:'På',no:'På',es:'Sí',it:'Sì',pt:'Sim',fr:'Oui',fi:'Päällä'},
    setCards:    {en:'Cards',de:'Karten',nl:'Kaarten',da:'Kort',sv:'Kort',no:'Kort',es:'Tarjetas',it:'Cartellini',pt:'Cartões',fr:'Cartes',fi:'Kortit'},
    c4:          {en:'4',de:'4',nl:'4',da:'4',sv:'4',no:'4',es:'4',it:'4',pt:'4',fr:'4',fi:'4'},
    c3:          {en:'3',de:'3',nl:'3',da:'3',sv:'3',no:'3',es:'3',it:'3',pt:'3',fr:'3',fi:'3'},
    ariaCard:    {en:'{s} String on: {w}.',de:'{s} Schnur an: {w}.',nl:'{s} Touwtje aan: {w}.',da:'{s} Snor på: {w}.',sv:'{s} Snöre på: {w}.',no:'{s} Snor på: {w}.',es:'{s} Hilo en: {w}.',it:'{s} Filo su: {w}.',pt:'{s} Barbante em: {w}.',fr:'{s} Fil sur : {w}.',fi:'{s} Naru kiinni: {w}.'},
    sNothing:    {en:'nothing',de:'nichts',nl:'niets',da:'intet',sv:'ingenting',no:'ingenting',es:'nada',it:'niente',pt:'nada',fr:'rien',fi:'ei mitään'},
    ariaSign:    {en:'{w}: the room’s sign',de:'{w}: das Schild des Raums',nl:'{w}: het bord van de kamer',da:'{w}: rummets skilt',sv:'{w}: rummets skylt',no:'{w}: rommets skilt',es:'{w}: el letrero del cuarto',it:'{w}: l’insegna della stanza',pt:'{w}: a placa da sala',fr:'{w} : le panneau de la salle',fi:'{w}: huoneen kyltti'},
    ariaDoor:    {en:'{w}: the next room',de:'{w}: der Raum nebenan',nl:'{w}: de kamer hiernaast',da:'{w}: rummet ved siden af',sv:'{w}: rummet bredvid',no:'{w}: rommet ved siden av',es:'{w}: el cuarto de al lado',it:'{w}: la stanza accanto',pt:'{w}: a sala ao lado',fr:'{w} : la salle d’à côté',fi:'{w}: viereinen huone'},
    ariaFrame:   {en:'Empty frame',de:'Leerer Rahmen',nl:'Lege lijst',da:'Tom ramme',sv:'Tom ram',no:'Tom ramme',es:'Marco vacío',it:'Cornice vuota',pt:'Moldura vazia',fr:'Cadre vide',fi:'Tyhjä kehys'},
    ariaShelf:   {en:'{w}: put it in the frame',de:'{w}: in den Rahmen legen',nl:'{w}: in de lijst zetten',da:'{w}: sæt det i rammen',sv:'{w}: sätt den i ramen',no:'{w}: sett det i rammen',es:'{w}: ponlo en el marco',it:'{w}: mettila nella cornice',pt:'{w}: coloque na moldura',fr:'{w} : mets-la dans le cadre',fi:'{w}: laita kehykseen'},
    ariaCart:    {en:'Cart: tap a card to hang it',de:'Wagen: Tippe eine Karte an, um sie aufzuhängen',nl:'Karretje: tik op een kaart om hem op te hangen',da:'Vogn: Tryk på et kort for at hænge det op',sv:'Vagn: tryck på ett kort för att hänga upp det',no:'Vogn: Trykk på et kort for å henge det opp',es:'Carrito: toca una tarjeta para colgarla',it:'Carrello: tocca un cartellino per appenderlo',pt:'Carrinho: toque em um cartão para pendurar',fr:'Chariot : touche une carte pour l’accrocher',fi:'Kärry: napauta korttia, niin se ripustetaan'},
    ariaHook:    {en:'Empty hook',de:'Leerer Haken',nl:'Leeg haakje',da:'Tom krog',sv:'Tom krok',no:'Tom krok',es:'Gancho vacío',it:'Gancio vuoto',pt:'Gancho vazio',fr:'Crochet vide',fi:'Tyhjä koukku'},
    ariaPage:    {en:'The page: {t}',de:'Die Seite: {t}',nl:'De bladzijde: {t}',da:'Siden: {t}',sv:'Sidan: {t}',no:'Siden: {t}',es:'La página: {t}',it:'La pagina: {t}',pt:'A página: {t}',fr:'La page : {t}',fi:'Sivu: {t}'}
  },/*STRINGS-END*/

  defaults: { level: 'l1', help: 'off', cards: '4' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'l1', labelKey: 'l1' }, { value: 'l2', labelKey: 'l2' }, { value: 'l3', labelKey: 'l3' }] },
    { key: 'help', type: 'choice', labelKey: 'setHelp', options: [{ value: 'off', labelKey: 'hOff' }, { value: 'on', labelKey: 'hOn' }] },
    { key: 'cards', type: 'choice', labelKey: 'setCards', options: [{ value: '4', labelKey: 'c4' }, { value: '3', labelKey: 'c3' }] }
  ],

  OK_MS: 500, FAST: false, LONG_MS: 650,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {}; this._drag = null; this._pages = 0;
    injectStringsCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return AboutStringsCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return AboutStringsCore.levelOf(this._setting('level')); },
  _cards: function () { return AboutStringsCore.cardsOf(this._setting('cards')); },
  _helpOn: function () { return AboutStringsCore.helpOf(this._setting('help')) === 'on'; },
  _key: function () { return this._level() + '.' + this._cards(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = AboutStringsCore.ids(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = AboutStringsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(Math.random, prev); this._orderForPool = pool;
      if (pass > this._pass) this._pages = 0;
      this._pass = pass;
    }
    var idx = this._order[pos], r = C.round(this._level(), idx, this._cards());
    var pa = { msg: this._taskLine(r.level) }; this._pa = pa;
    return {
      id: 'strings.' + this._loc() + '.' + r.id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function (level) { return this._t(level === 'l1' ? 'tL1' : level === 'l2' ? 'tL2' : 'tL3'); },
  _start: function (idx) {
    var C = AboutStringsCore, r = C.round(this._level(), idx, this._cards());
    this._clearTimers(); this._endDrag(); this._busy = false; this._view = {};
    this.st = C.newState(r);
    var line = this._taskLine(r.level);
    if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
    this._loadPics();
  },
  _loadPics: function () {
    var self = this, dirs = {};
    AboutStringsCore.DATA.TOPICS.forEach(function (t) { [t.pic, t.door].concat(t.others).forEach(function (p) { dirs[p.split('/')[0]] = 1; }); });
    Object.keys(dirs).forEach(function (dir) {
      if (self._pics[dir] || typeof LCSPictures === 'undefined') return;
      LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected && !self._drag) self._paint(); }).catch(function () {});
    });
  },
  _pic: function (path, size) {
    var i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)], key = path.slice(i + 1);
    if (!th || !th.nouns[key]) return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = 'as-pic'; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px';
    return im;
  },
  /* the word under a picture: the room's own plate words for its two signs; the library word for anything else */
  _picWord: function (path) {
    var C = AboutStringsCore, r = this.st.r, w = C.words(this._loc(), r.topic.id);
    if (path === r.topic.pic) return w.plate;
    if (path === r.topic.door) return w.door;
    var i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)];
    return th ? LCSPictures.label(th, path.slice(i + 1), this._loc()) : '';
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = AboutStringsCore; this.st = C.newState(C.round(this._level(), 0, this._cards())); this._loadPics(); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'as-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="as-room"><div class="as-wall"><div class="as-signs"></div><div class="as-cards"></div><div class="as-cart" role="group"></div><div class="as-shelf" role="group"></div><svg class="as-strings" aria-hidden="true"></svg></div><div class="as-lectern"></div></div><p class="as-note" aria-live="polite"></p><div class="as-row"><button type="button" class="as-check" data-k="check"></button></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    this._q('.as-check').addEventListener('click', function () { self._check(); });
    this._q('.as-cart').addEventListener('click', function (ev) { if (self._eat()) return; if (ev.target.closest('.as-card')) return; self._toCart(); });
    wrap.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && self.st.sel) { ev.preventDefault(); self.st.sel = null; self._paint(); } });
    wrap.addEventListener('pointerdown', function (ev) { self._down(ev); });
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
    if (!this._wrap) return;
    var C = AboutStringsCore, st = this.st, r = st.r, L = this._L = C.layout(this._width());
    this._wrap.className = 'as-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.level + (this._helpOn() ? ' is-help' : '') + (st.sel ? ' is-holding' : '');
    this._wrap.style.setProperty('--as-sign', L.sign + 'px');
    this._wrap.style.setProperty('--as-door', L.door + 'px');
    this._wrap.style.setProperty('--as-shelf', L.shelf + 'px');
    this._paintSigns();
    this._paintCards();
    this._paintCart();
    this._paintShelf();
    this._paintPage();
    var h = C.hint(st), msg = this._view.msg || (h ? this._t(h) : '');
    var note = this._q('.as-note'); note.textContent = msg; note.className = 'as-note' + (st.done ? ' is-ok' : h ? ' is-hint' : '');
    var chk = this._q('.as-check'); chk.textContent = this._t('check'); chk.disabled = !!this._busy || st.done;
    var self = this;
    if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(function () { self._paintStrings(); }); else this._paintStrings();
  },
  /* the room's sign (or the empty frame) and the doorway with the next room's sign */
  _paintSigns: function () {
    var C = AboutStringsCore, st = this.st, r = st.r, L = this._L, self = this, box = this._q('.as-signs'), w = C.words(this._loc(), r.topic.id);
    var th = C.threads(st), want = {}; th.forEach(function (x) { want[x.to] = 1; });
    box.innerHTML = '';
    var sign = this.api.el('button', 'as-sign' + (st.sel ? ' is-open' : '') + (want.topic ? ' is-want' : ''));
    sign.type = 'button'; sign.setAttribute('data-sign', r.level === 'l3' ? 'frame' : 'topic'); sign.setAttribute('data-k', r.level === 'l3' ? 'frame' : 'sign-topic');
    var frame = this.api.el('span', 'as-frame' + (r.level === 'l3' && !st.frame ? ' is-empty' : ''));
    var shown = r.level === 'l3' ? st.frame : r.topic.pic;
    if (shown) { var im = this._pic(shown, L.sign); if (im) frame.appendChild(im); }
    sign.appendChild(frame);
    var plate = this.api.el('span', 'as-plate'); plate.textContent = shown ? (r.level === 'l3' ? this._picWord(shown) : w.plate) : ' '; sign.appendChild(plate);
    sign.appendChild(this.api.el('span', 'as-hook'));
    sign.setAttribute('aria-label', r.level === 'l3' ? (shown ? this._t('ariaSign', { w: this._picWord(shown) }) : this._t('ariaFrame')) : this._t('ariaSign', { w: w.plate }));
    sign.disabled = st.done;
    sign.addEventListener('click', function () { if (self._eat()) return; self._tapSign(r.level === 'l3' ? 'frame' : 'topic'); });
    box.appendChild(sign);
    if (r.level !== 'l3') {
      var door = this.api.el('button', 'as-door' + (st.sel ? ' is-open' : '') + (want.door ? ' is-want' : ''));
      door.type = 'button'; door.setAttribute('data-sign', 'door'); door.setAttribute('data-k', 'sign-door');
      var arch = this.api.el('span', 'as-arch'), di = this._pic(r.topic.door, L.door); if (di) arch.appendChild(di);
      door.appendChild(arch);
      var dp = this.api.el('span', 'as-plate is-small'); dp.textContent = w.door; door.appendChild(dp);
      door.appendChild(this.api.el('span', 'as-hook'));
      if (st.done) C.leaving(st).forEach(function (id) { var v = self.api.el('span', 'as-visitor'); v.textContent = C.cardText(self._loc(), r, id).text; door.appendChild(v); });
      door.setAttribute('aria-label', this._t('ariaDoor', { w: w.door }));
      door.disabled = st.done;
      door.addEventListener('click', function () { if (self._eat()) return; self._tapSign('door'); });
      box.appendChild(door);
    }
  },
  /* a card: the sentence with its about-word, a brass ring at its corner where the string starts */
  _card: function (id, where) {
    var C = AboutStringsCore, st = this.st, r = st.r, loc = this._loc(), self = this, c = C.find(r, id), tx = C.cardText(loc, r, id);
    var lit = C.lit(st, this._helpOn()), th = C.threads(st), wantMe = th.some(function (x) { return x.card === id; });
    var wrong = st.last && st.last.reason === 'strings' && st.last.cards.indexOf(id) >= 0;
    var refused = C.refuses(st, loc).indexOf(id) >= 0;
    var b = this.api.el('button', 'as-card' + (st.sel === id ? ' is-sel' : '') + (st.hook[id] ? ' is-hooked' : '') + (wrong ? ' is-slack' : '') + (refused ? ' is-slack' : '') + (lit.indexOf(id) >= 0 ? ' is-lit' : '') + (wantMe ? ' is-want' : '') + (where === 'cart' ? ' is-cart' : ''));
    b.type = 'button'; b.setAttribute('data-k', (where === 'cart' ? 'cart-' : 'card-') + id); b.setAttribute('data-id', id);
    b.appendChild(this.api.el('span', 'as-ring'));
    var t = this.api.el('span', 'as-text'), a = tx.about;
    t.appendChild(document.createTextNode(tx.text.slice(0, a[0])));
    var ab = this.api.el('span', 'as-about'); ab.textContent = tx.text.slice(a[0], a[1]); t.appendChild(ab);
    t.appendChild(document.createTextNode(tx.text.slice(a[1])));
    b.appendChild(t);
    var on = st.hook[id] === 'topic' ? C.words(loc, r.topic.id).plate : st.hook[id] === 'door' ? C.words(loc, r.topic.id).door : st.hook[id] === 'frame' && st.frame ? this._picWord(st.frame) : this._t('sNothing');
    b.setAttribute('aria-label', this._t('ariaCard', { s: tx.text, w: on }));
    b.setAttribute('aria-pressed', st.sel === id ? 'true' : 'false');
    b.disabled = st.done;
    b.addEventListener('click', function (ev) { ev.stopPropagation(); if (self._eat()) return; self._tapCard(id, where); });
    return b;
  },
  _paintCards: function () {
    var C = AboutStringsCore, st = this.st, r = st.r, self = this, box = this._q('.as-cards'), leave = st.done ? C.leaving(st) : [];
    box.innerHTML = '';
    st.wall.forEach(function (id, k) {
      if (!id || leave.indexOf(id) >= 0) {
        var hk = self.api.el('button', 'as-slot' + (st.done && id ? ' is-left' : '')); hk.type = 'button'; hk.setAttribute('data-k', 'slot-' + k); hk.setAttribute('aria-label', self._t('ariaHook')); hk.disabled = true;
        hk.appendChild(self.api.el('span', 'as-ring')); box.appendChild(hk); return;
      }
      box.appendChild(self._card(id, 'wall'));
    });
    /* a card whose longest word does not fit its column (fi Ambulansseissa) takes the whole row — never a break inside a word */
    if (this._L.mode === 'narrow') [].forEach.call(box.querySelectorAll('.as-card'), function (c) { var t = c.querySelector('.as-text'); if (t.scrollWidth > t.clientWidth + 1) c.classList.add('is-long'); });
  },
  _paintCart: function () {
    var st = this.st, r = st.r, self = this, box = this._q('.as-cart');
    box.innerHTML = '';
    if (r.level !== 'l2' || st.done) { box.style.display = 'none'; return; }
    box.style.display = ''; box.setAttribute('aria-label', this._t('ariaCart'));
    box.className = 'as-cart' + (st.sel && st.wall.indexOf(st.sel) >= 0 && st.sel !== r.hung.id ? ' is-open' : '');
    st.cart.forEach(function (id) { box.appendChild(self._card(id, 'cart')); });
  },
  _paintShelf: function () {
    var st = this.st, r = st.r, L = this._L, self = this, box = this._q('.as-shelf'), th = AboutStringsCore.threads(st);
    box.innerHTML = '';
    if (r.level !== 'l3' || st.done) { box.style.display = 'none'; return; }
    box.style.display = '';
    st.shelf.forEach(function (p) {
      var b = self.api.el('button', 'as-shelfpic' + (st.frame === p ? ' is-used' : '') + (th.some(function (x) { return x.pic === p; }) ? ' is-want' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'shelf-' + p); b.setAttribute('data-pic', p);
      var im = self._pic(p, L.shelf); if (im) b.appendChild(im);
      b.setAttribute('aria-label', self._t('ariaShelf', { w: self._picWord(p) }));
      b.disabled = st.done;
      b.addEventListener('click', function () { if (self._eat()) return; self._place(p); });
      box.appendChild(b);
    });
  },
  /* the lectern: an open book; at success the room's facts become its page, with the room's picture and Bram's stamp */
  _paintPage: function () {
    var C = AboutStringsCore, st = this.st, r = st.r, L = this._L, loc = this._loc(), self = this, box = this._q('.as-lectern');
    box.innerHTML = '';
    var book = this.api.el('div', 'as-book' + (st.done ? ' is-full' : ''));
    if (st.done) {
      var w = C.words(loc, r.topic.id);
      book.setAttribute('role', 'img'); book.setAttribute('aria-label', this._t('ariaPage', { t: w.title }));
      var head = this.api.el('div', 'as-phead'), h = this.api.el('span', 'as-ptitle'); h.textContent = w.title; head.appendChild(h);
      var im = this._pic(r.topic.pic, L.mode === 'wide' ? 96 : 64); if (im) head.appendChild(im);
      book.appendChild(head);
      var ul = this.api.el('ul', 'as-pfacts');
      C.page(st).forEach(function (id, k) { var li = self.api.el('li', ''); li.textContent = C.cardText(loc, r, id).text; li.style.animationDelay = (self.FAST ? 0 : 300 + k * 250) + 'ms'; ul.appendChild(li); });
      book.appendChild(ul);
      book.appendChild(stampEl());
    } else {
      book.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < 6; i++) book.appendChild(this.api.el('span', 'as-line'));
    }
    if (this._pages) { var stack = this.api.el('span', 'as-stack'); stack.style.setProperty('--as-pages', String(Math.min(this._pages, 8))); book.appendChild(stack); }
    box.appendChild(book);
  },
  /* the strings: from each card's ring to the hook of the sign it is on; slack while wrong, straight when right; the pronoun's arrow; miss 2's threads */
  _paintStrings: function () {
    var svg = this._q && this._q('.as-strings'); if (!svg || !this._wrap.isConnected) return;
    var C = AboutStringsCore, st = this.st, r = st.r, wall = this._q('.as-wall'), W = wall.getBoundingClientRect(), parts = [], self = this;
    svg.setAttribute('viewBox', '0 0 ' + Math.round(W.width) + ' ' + Math.round(W.height));
    var ring = function (id) { var e = self._q('.as-card[data-id="' + id + '"] .as-ring'); if (!e) return null; var R = e.getBoundingClientRect(); return { x: R.left + R.width / 2 - W.left, y: R.top + R.height / 2 - W.top }; };
    var hook = function (s) { var e = self._q('[data-sign="' + s + '"] .as-hook'); if (!e) return null; var R = e.getBoundingClientRect(); return { x: R.left + R.width / 2 - W.left, y: R.top + R.height / 2 - W.top }; };
    var curve = function (a, b, sag, cls) { var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 + sag; parts.push('<path class="' + cls + '" d="M' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1) + '"/>'); };
    var wrongs = st.last && st.last.reason === 'strings' ? st.last.cards : [], refused = C.refuses(st, this._loc());
    st.wall.forEach(function (id) {
      if (!id || !st.hook[id] || (st.done && C.find(r, id).about === 'door')) return;
      if (st.hook[id] === 'frame' && !st.frame) return;
      if (self._drag && self._drag.moved && self._drag.id === id) return;
      var a = ring(id), b = hook(st.hook[id]); if (!a || !b) return;
      var slack = wrongs.indexOf(id) >= 0 || refused.indexOf(id) >= 0;
      curve(a, b, st.done ? 0 : slack ? 70 : 18, 'as-string' + (slack ? ' is-slack' : '') + (st.done ? ' is-taut' : ''));
    });
    if (st.last && st.last.reason === 'strings' && st.help < 2) st.wall.forEach(function (id) {   /* "They" points back to the card it means */
      var to = id && C.pointsTo(st, id); if (!to || C.lit(st, self._helpOn()).indexOf(id) < 0) return;
      var A = self._q('.as-card[data-id="' + id + '"] .as-about'), B = self._q('.as-card[data-id="' + to + '"] .as-about'); if (!A || !B) return;
      var ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
      curve({ x: ra.left + ra.width / 2 - W.left, y: ra.top - W.top }, { x: rb.left + rb.width / 2 - W.left, y: rb.bottom - W.top }, -30, 'as-arrow');
    });
    C.threads(st).forEach(function (x) {
      if (!x.card || x.to === 'wall') return;
      var a = ring(x.card), b = hook(x.to); if (a && b) curve(a, b, -40, 'as-thread');
    });
    if (this._drag && this._drag.moved && this._drag.p) { var a0 = ring(this._drag.id); if (a0) curve(a0, { x: this._drag.p.x - W.left, y: this._drag.p.y - W.top }, 24, 'as-string is-live'); }
    svg.innerHTML = parts.join('');
  },

  /* ---------------- the hand ---------------- */
  _eat: function () { if (this._noClick) { this._noClick = false; return true; } return false; },
  _tapCard: function (id, where) {
    if (this._busy || this.st.done) return;
    var C = AboutStringsCore, st = this.st;
    if (where === 'cart' && st.sel && st.wall.indexOf(st.sel) >= 0 && st.sel !== st.r.hung.id) { this._toCart(); return; }   /* a picked wall card goes back when the cart is tapped, wherever on it */
    if (where === 'cart') { if (C.hang(st, id)) { this._view = {}; this.api.sound(560); this._paint(); } else { this.api.sound(200); } return; }
    C.select(st, id); this._view = {}; this.api.sound(st.sel ? 700 : 420); this._paint();
  },
  _tapSign: function (sign) {
    if (this._busy || this.st.done) return;
    var C = AboutStringsCore, st = this.st;
    if (sign === 'frame') { if (st.frame) { C.place(st, null); this._view = {}; this.api.sound(380); this._paint(); } return; }
    if (!st.sel) return;
    if (C.hookTo(st, st.sel, sign)) { this._view = {}; this.api.sound(880); this._paint(); }
  },
  _toCart: function () {
    var C = AboutStringsCore, st = this.st;
    if (!st.sel || st.done) return;
    if (C.unhang(st, st.sel)) { this._view = {}; this.api.sound(380); this._paint(); }
  },
  _place: function (p) {
    if (this._busy || this.st.done) return;
    if (AboutStringsCore.place(this.st, this.st.frame === p ? null : p)) { this._view = {}; this.api.sound(620); this._paint(); }
  },
  /* drag a card's string: a press that moves stretches the string from the ring to the finger; let go over a sign to hook it */
  _down: function (ev) {
    var st = this.st; if (st.done || this._busy || ev.button > 0 || st.r.level === 'l3') return;
    var el = ev.target.closest('.as-card'); if (!el || el.classList.contains('is-cart') || !this._wrap.contains(el)) return;
    var self = this, id = el.getAttribute('data-id');
    this._drag = { id: id, x: ev.clientX, y: ev.clientY, moved: false, el: el };
    this._drag.long = setTimeout(function () { if (self._drag && !self._drag.moved) self._speak(id); }, this.LONG_MS);
    var move = function (e) { self._move(e); }, up = function (e) { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); self._up(e); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _move: function (ev) {
    var d = this._drag; if (!d) return;
    if (!d.moved && Math.abs(ev.clientX - d.x) + Math.abs(ev.clientY - d.y) < 10) return;
    if (!d.moved) { d.moved = true; clearTimeout(d.long); d.el.classList.add('is-pulling'); this._wrap.classList.add('is-holding'); }
    d.p = { x: ev.clientX, y: ev.clientY }; this._paintStrings();
    if (ev.cancelable) ev.preventDefault();
  },
  _up: function (ev) {
    var d = this._drag; if (!d) return;
    clearTimeout(d.long);
    if (d.moved) {
      this._noClick = true; var self = this; setTimeout(function () { self._noClick = false; }, 0);
      var under = document.elementFromPoint(ev.clientX, ev.clientY), sg = under && under.closest ? under.closest('[data-sign]') : null;
      this._drag = null;
      var s = sg && this._wrap.contains(sg) ? sg.getAttribute('data-sign') : null;
      if (AboutStringsCore.hookTo(this.st, d.id, s === 'topic' || s === 'door' ? s : null)) { this._view = {}; this.api.sound(s ? 880 : 300); }
      this._paint(); return;
    }
    if (d.named) { this._noClick = true; var s2 = this; setTimeout(function () { s2._noClick = false; }, 0); }
    this._drag = null;
  },
  _endDrag: function () { var d = this._drag; if (!d) return; clearTimeout(d.long); this._drag = null; },
  _speak: function (id) {
    if (this._drag) this._drag.named = true;
    var text = AboutStringsCore.cardText(this._loc(), this.st.r, id).text;
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: text, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
  },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = AboutStringsCore, st = this.st, res = C.check(st), self = this;
    this._view = {};
    if (!res.ok) { this.api.sound(/loose|frame/.test(res.reason) ? 460 : 220); this._paint(); this.api.announce(this._q('.as-note').textContent || ''); return; }
    var w = C.words(this._loc(), st.r.topic.id), drift = st.r.level !== 'l3' && C.leaving(st).length > 0;
    var msg = this._t(drift ? 'okDrift' : 'okPage', { title: w.title });
    this._pages++;
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140));
    this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: msg, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var n = self._q('.as-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

/* Bram's stamp: a round museum stamp with a magpie feather (geometry, no bird) */
function stampEl() { var s = document.createElement('span'); s.className = 'as-stamp'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="none" stroke="#B5461F" stroke-width="3"/><circle cx="24" cy="24" r="15" fill="none" stroke="#B5461F" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M16 33 C20 24 26 17 33 14 C31 22 26 28 18 32 Z" fill="#B5461F"/><path d="M16 33 L31 16" stroke="#FFF7EA" stroke-width="1.5"/></svg>'; return s; }

var asCssDone = false;
function injectStringsCSS() {
  if (asCssDone || typeof document === 'undefined') return;
  asCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.as-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.as-wrap:focus{outline:none;}'
  + '.as-pic{display:block;object-fit:contain;pointer-events:none;}'
  + '.as-room{display:grid;grid-template-columns:minmax(0,1fr) 200px;gap:14px;width:100%;max-width:700px;align-items:start;}'
  /* the wall */
  + '.as-wall{position:relative;display:flex;flex-direction:column;gap:12px;padding:12px;border-radius:18px;background:#F4E8D4;box-shadow:inset 0 0 0 3px #C9A57A,inset 0 -14px 0 #E2CBA8;}'
  + '.as-wall::before{content:"";position:absolute;left:10px;right:10px;top:8px;height:3px;background:#8C6A44;border-radius:2px;}'
  + '.as-signs{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}'
  + '.as-sign,.as-door{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 0 18px;border:0;background:transparent;cursor:pointer;font:inherit;color:inherit;}'
  + '.as-sign{flex:1 1 auto;} .as-sign:disabled,.as-door:disabled{cursor:default;opacity:1;}'
  + '.as-frame{display:flex;align-items:center;justify-content:center;width:calc(var(--as-sign) + 22px);height:calc(var(--as-sign) + 22px);border-radius:8px;background:#FFFDF7;box-shadow:inset 0 0 0 6px #C99A6B,inset 0 0 0 8px #7A5226,0 4px 0 #A8743A;}'
  + '.as-frame.is-empty{background:repeating-linear-gradient(135deg,#FFFDF7 0 10px,#F6EDDD 10px 20px);} .as-frame.is-empty::after{content:"";width:62%;height:62%;border:3px dashed #C9A57A;border-radius:10px;}'
  + '.as-plate{min-width:96px;min-height:1.2em;padding:2px 12px;border-radius:6px;background:linear-gradient(#F5D98A,#D9B25B);box-shadow:inset 0 0 0 2px #9C7B2E;font-family:' + H + ';font-weight:800;font-size:20px;line-height:1.2;color:#4A3610;text-align:center;}'
  + '.as-plate.is-small{min-width:72px;font-size:17px;}'
  + '.as-hook{position:absolute;bottom:0;left:50%;width:18px;height:18px;margin-left:-9px;border-radius:0 0 9px 9px;border:3px solid #9C7B2E;border-top:0;box-sizing:border-box;}'
  + '.as-door{flex:0 0 auto;align-self:stretch;justify-content:flex-start;padding:10px 8px 18px;border-radius:60px 60px 8px 8px;background:#E7D3B4;box-shadow:inset 0 0 0 4px #8C6A44;}'
  + '.as-arch{display:flex;align-items:center;justify-content:center;width:calc(var(--as-door) + 14px);height:calc(var(--as-door) + 14px);border-radius:8px;background:#FFFDF7;box-shadow:inset 0 0 0 4px #C99A6B;}'
  + '.as-sign.is-open .as-frame,.as-door.is-open{box-shadow:inset 0 0 0 6px #C99A6B,inset 0 0 0 8px #7A5226,0 0 0 4px #9CC9BE;} .as-door.is-open{box-shadow:inset 0 0 0 4px #8C6A44,0 0 0 4px #9CC9BE;}'
  + '.as-sign.is-want .as-frame,.as-door.is-want{animation:asWant .9s ease-in-out infinite;} @keyframes asWant{50%{box-shadow:0 0 0 5px rgba(47,165,106,.7),0 0 18px rgba(47,165,106,.7);}}'
  + '.as-visitor{display:block;max-width:150px;margin-top:6px;padding:4px 8px;border-radius:6px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #2A2A35;font-family:' + B + ';font-weight:700;font-size:15px;line-height:1.25;color:#2A2A35;transform:rotate(2deg);animation:asWalk .6s ease-out both;} @keyframes asWalk{from{transform:translateX(-160px);opacity:0;}}'
  /* the cards */
  + '.as-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px 12px;padding-top:8px;}'
  + '.as-card,.as-slot{position:relative;display:flex;align-items:center;min-height:68px;padding:10px 12px 10px 26px;border:0;border-radius:8px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #2A2A35,0 3px 0 rgba(0,0,0,.12);cursor:pointer;font:inherit;color:inherit;text-align:left;box-sizing:border-box;touch-action:none;transition:transform .15s;}'
  + '.as-cards > :nth-child(odd){transform:rotate(-1.2deg);} .as-cards > :nth-child(even){transform:rotate(1.4deg);}'
  + '.as-card.is-hooked{transform:none;} .as-wrap.is-done .as-card{transform:none;animation:asClick .2s ease-out;} @keyframes asClick{50%{transform:scale(1.03);}}'
  + '.as-card.is-sel{transform:translateY(-6px) rotate(0);box-shadow:inset 0 0 0 3px #146B5E,0 10px 14px rgba(0,0,0,.18);}'
  + '.as-card.is-slack{animation:asShiver .4s ease-in-out 2;} @keyframes asShiver{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}}'
  + '.as-card.is-want{box-shadow:inset 0 0 0 3px #2FA56A,0 0 14px rgba(47,165,106,.6);}'
  + '.as-card:disabled{cursor:default;opacity:1;}'
  + '.as-slot{cursor:default;background:transparent;box-shadow:inset 0 0 0 2px #C9A57A;border:2px dashed #C9A57A;} .as-slot.is-left{border-style:dotted;}'
  + '.as-ring{position:absolute;left:-6px;top:-8px;width:26px;height:26px;border-radius:50%;box-sizing:border-box;border:5px solid #C99A2E;background:transparent;box-shadow:0 2px 0 #7A5226;}'
  + '.as-card.is-hooked .as-ring{border-color:#B5461F;} .as-slot .as-ring{border-color:#C9A57A;box-shadow:none;}'
  + '.as-text{min-width:0;font-family:' + B + ';font-weight:700;font-size:20px;line-height:1.3;color:#2A2A35;}'
  + '.as-about{border-radius:4px;transition:background .3s;} .as-wrap.is-help .as-about{text-decoration:underline;text-decoration-thickness:3px;text-decoration-color:#E8B23A;text-underline-offset:4px;}'
  + '.as-card.is-lit .as-about{background:#FFE07A;box-shadow:0 0 0 3px #FFE07A;}'
  /* the strings */
  + '.as-strings{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:4;}'
  + '.as-string{fill:none;stroke:#C0392B;stroke-width:3;stroke-linecap:round;} .as-string.is-slack{stroke:#D98880;stroke-dasharray:6 5;} .as-string.is-taut{stroke-width:3.5;} .as-string.is-live{stroke:#146B5E;}'
  + '.as-arrow{fill:none;stroke:#B5461F;stroke-width:3;stroke-dasharray:2 7;stroke-linecap:round;} .as-thread{fill:none;stroke:#2FA56A;stroke-width:4;stroke-dasharray:2 9;stroke-linecap:round;}'
  /* the cart and the shelf */
  + '.as-cart{display:flex;gap:12px;overflow-x:auto;padding:14px 10px 10px;border-radius:14px;background:#C9A57A;box-shadow:inset 0 0 0 3px #8C6A44,0 6px 0 #6B4F2E;scrollbar-width:thin;}'
  + '.as-cart.is-open{box-shadow:inset 0 0 0 3px #8C6A44,0 0 0 4px #9CC9BE,0 6px 0 #6B4F2E;cursor:pointer;}'
  + '.as-card.is-cart{flex:0 0 190px;transform:none;}'
  + '.as-shelf{display:flex;justify-content:center;gap:14px;padding:12px;border-radius:12px;background:#C9A57A;box-shadow:inset 0 -6px 0 #8C6A44;}'
  + '.as-shelfpic{display:flex;align-items:center;justify-content:center;padding:6px;border:0;border-radius:12px;background:#FFFDF7;box-shadow:0 3px 0 #8C6A44;cursor:pointer;}'
  + '.as-shelfpic.is-used{opacity:.35;} .as-shelfpic.is-want{transform:translateY(-6px);box-shadow:0 0 0 4px #2FA56A,0 0 16px rgba(47,165,106,.7);}'
  /* the lectern */
  + '.as-lectern{position:relative;}'
  + '.as-book{position:relative;display:flex;flex-direction:column;gap:8px;min-height:300px;padding:14px 12px 30px;border-radius:6px 14px 14px 6px;background:#FFFDF7;box-shadow:inset 6px 0 0 #E2D6BE,0 0 0 2px #7A5226,0 8px 0 #A8743A;}'
  + '.as-line{display:block;height:2px;margin:14px 4px 0;background:#E7DCC6;}'
  + '.as-phead{display:flex;align-items:center;justify-content:space-between;gap:6px;} .as-ptitle{font-family:' + H + ';font-weight:800;font-size:20px;line-height:1.15;color:#146B5E;animation:asIn .4s ease-out both;}'
  + '.as-pfacts{margin:0;padding:0 0 0 18px;font-family:' + B + ';font-weight:700;font-size:16px;line-height:1.35;color:#2A2A35;} .as-pfacts li{margin:4px 0;animation:asIn .4s ease-out both;} @keyframes asIn{from{transform:translateX(-30px);opacity:0;}}'
  + '.as-stamp{position:absolute;right:8px;bottom:6px;width:48px;height:48px;transform:rotate(-14deg);animation:asStamp .3s .9s ease-out both;} .as-stamp svg{width:100%;height:100%;display:block;} @keyframes asStamp{from{transform:scale(1.8) rotate(-14deg);opacity:0;}}'
  + '.as-stack{position:absolute;left:4px;right:-4px;bottom:-8px;height:calc(var(--as-pages) * 2px + 2px);border-radius:0 0 12px 4px;background:repeating-linear-gradient(0deg,#FFFDF7 0 1px,#C9B48F 1px 2px);z-index:-1;}'
  + '.as-row{display:flex;justify-content:center;}'
  + '.as-check{min-height:52px;min-width:120px;padding:0 26px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:20px;box-shadow:0 4px 0 #0C4A41;cursor:pointer;} .as-check:disabled{opacity:.5;cursor:default;}'
  + '.as-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .as-note:empty{display:none;} .as-note.is-hint{color:#B5461F;} .as-note.is-ok{color:#146B5E;}'
  + '.as-card:focus-visible,.as-sign:focus-visible,.as-door:focus-visible,.as-shelfpic:focus-visible,.as-check:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.as-wrap.is-done .as-row{display:none;}'
  /* phones: one column of cards; the page comes under the wall at success */
  + '.as-wrap.is-narrow .as-room{grid-template-columns:minmax(0,1fr);gap:10px;} .as-wrap.is-narrow .as-lectern{display:none;} .as-wrap.is-narrow.is-done .as-lectern{display:block;}'
  + '.as-wrap.is-narrow .as-book{min-height:0;} .as-wrap.is-narrow .as-wall{padding:10px 8px;gap:10px;}'
  + '.as-wrap.is-narrow .as-cards{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px 8px;} .as-wrap.is-narrow .as-card,.as-wrap.is-narrow .as-slot{min-height:56px;padding:8px 6px 8px 18px;} .as-wrap.is-narrow .as-text{font-size:17px;line-height:1.25;} .as-wrap.is-narrow .as-ring{width:24px;height:24px;border-width:4px;} .as-wrap.is-narrow .as-card.is-long{grid-column:1 / -1;}'
  + '.as-wrap.is-narrow .as-plate{font-size:16px;min-width:64px;padding:1px 8px;} .as-wrap.is-narrow .as-frame{width:calc(var(--as-sign) + 14px);height:calc(var(--as-sign) + 14px);box-shadow:inset 0 0 0 4px #C99A6B,inset 0 0 0 6px #7A5226,0 3px 0 #A8743A;} .as-wrap.is-narrow .as-door{padding:6px 6px 18px;} .as-wrap.is-narrow .as-arch{width:calc(var(--as-door) + 10px);height:calc(var(--as-door) + 10px);} .as-wrap.is-narrow .as-signs{gap:8px;} .as-wrap.is-narrow .as-plate.is-small{font-size:15px;min-width:56px;}'
  + '.as-wrap.is-narrow .as-card.is-cart{flex-basis:140px;} .as-wrap.is-narrow .as-cart{padding:12px 8px 8px;gap:8px;}'
  + '.as-wrap.is-narrow .as-shelf{gap:10px;padding:8px;} .as-wrap.is-narrow .as-note{font-size:17px;} .as-wrap.is-narrow .as-check{font-size:18px;min-width:104px;}'
  + '.as-wrap.is-tiny .as-text{font-size:16px;} .as-wrap.is-tiny .as-card.is-cart{flex-basis:220px;} .as-wrap.is-tiny .as-plate{margin-top:-14px;position:relative;z-index:1;} .as-wrap.is-tiny .as-sign,.as-wrap.is-tiny .as-door{padding-bottom:14px;gap:0;} .as-wrap.is-tiny .as-hook{width:14px;height:14px;margin-left:-7px;} .as-wrap.is-tiny .as-wall{gap:6px;padding-bottom:12px;} .as-wrap.is-tiny .as-shelf{padding:4px;} .as-wrap.is-tiny .as-cards{gap:12px 6px;padding-top:4px;} .as-wrap.is-tiny .as-card,.as-wrap.is-tiny .as-slot{min-height:50px;padding:6px 5px 6px 16px;} .as-wrap.is-tiny .as-wall{padding:8px 6px;} .as-wrap.is-tiny .as-shelf{gap:6px;padding:6px;}'
  + '.as-wrap.is-fast *,.as-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media print{.as-row,.as-note,.as-strings{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.as-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'as-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.AboutStringsActivity = AboutStringsActivity;
