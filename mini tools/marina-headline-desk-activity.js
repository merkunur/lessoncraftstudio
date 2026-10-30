/* =====================================================================
   marina-headline-desk-activity.js — ACTIVITY #173 of the one-by-one
   rebuild: "Marina's Headline Desk" (RI.2.2) → THE STAPLER THAT ONLY
   BINDS WHAT THE HEADLINE IS ABOUT.
   Model: headline-desk-core.js; texts: headline-desk-data.js. Design:
   docs/activities-rebuild/designs/173-marina-headline-desk.md
   ---------------------------------------------------------------------
   The article lies on Marina's desk as loose paper strips. The child puts
   a headline card on top and presses the stapler (or Check): it staples
   down only the strips the headline is really about; the others blow off
   in the desk fan's breeze onto the floor band. The main topic binds every
   strip into a front page; a detail keeps one strip; a neighbouring topic
   keeps none. Level 2: two paragraphs. Level 3: the yellow paragraph only.
   Miss 2: the words that run through every strip are underlined. Next
   appears .OK_MS after success.
   ===================================================================== */
var MarinaHeadlineDeskActivity = {
  id: 'marina-headline-desk-activity',
  /* the drawn apparatus (desk, strips, slot, cards, floor band, front page, newsstand): declared for the hierarchy audit */
  apparatusClasses: ['hd-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Marina’s Headline Desk","de":"Marinas Schlagzeilen-Tisch","fr":"Le bureau des titres de Marina","es":"El escritorio de titulares de Marina","pt":"A mesa de manchetes da Marina","it":"Il banco dei titoli di Marina","nl":"De krantenkoppen van Marina","sv":"Marinas rubrikbord","da":"Marinas overskriftsbord","no":"Marinas overskriftsbord","fi":"Marinan otsikkopöytä"},
    instruction: {"en":"Read the strips. Put the headline on top and press the stapler.","de":"Lies die Streifen. Leg die Schlagzeile obendrauf und drück auf den Hefter.","fr":"Lis les bandes de papier. Pose le titre dessus et appuie sur l’agrafeuse.","es":"Lee las tiras. Pon el titular arriba y aprieta la engrapadora.","pt":"Leia as tiras. Coloque a manchete em cima e aperte o grampeador.","it":"Leggi le strisce. Metti il titolo sopra e premi la spillatrice.","nl":"Lees de stroken. Leg de kop erbovenop en druk op de nietmachine.","sv":"Läs remsorna. Lägg rubriken överst och tryck på häftapparaten.","da":"Læs strimlerne. Læg overskriften øverst, og tryk på hæftemaskinen.","no":"Les strimlene. Legg overskriften øverst og trykk på stiftemaskinen.","fi":"Lue paperisuikaleet. Laita otsikko päälle ja paina nitojaa."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    lStory: {"en":"Short article","de":"Kurzer Text","fr":"Texte court","es":"Texto corto","pt":"Texto curto","it":"Testo breve","nl":"Kort stukje","sv":"Kort text","da":"Kort tekst","no":"Kort tekst","fi":"Lyhyt teksti"},
    lTwo: {"en":"Two paragraphs","de":"Zwei Absätze","fr":"Deux paragraphes","es":"Dos párrafos","pt":"Dois parágrafos","it":"Due paragrafi","nl":"Twee alinea’s","sv":"Två stycken","da":"To afsnit","no":"To avsnitt","fi":"Kaksi kappaletta"},
    lOne: {"en":"One paragraph","de":"Ein Absatz","fr":"Un paragraphe","es":"Un párrafo","pt":"Um parágrafo","it":"Un paragrafo","nl":"Eén alinea","sv":"Ett stycke","da":"Ét afsnit","no":"Ett avsnitt","fi":"Yksi kappale"},
    setCards: {"en":"Cards","de":"Karten","fr":"Cartes","es":"Tarjetas","pt":"Cartões","it":"Carte","nl":"Kaarten","sv":"Kort","da":"Kort","no":"Kort","fi":"Kortit"},
    qWhole: {"en":"What is the whole article mostly about?","de":"Worum geht es im ganzen Artikel vor allem?","fr":"De quoi parle surtout l’article entier ?","es":"¿De qué trata principalmente todo el artículo?","pt":"Do que trata principalmente o texto todo?","it":"Di che cosa parla soprattutto l’intero articolo?","nl":"Waar gaat het hele artikel vooral over?","sv":"Vad handlar hela artikeln mest om?","da":"Hvad handler hele artiklen mest om?","no":"Hva handler hele artikkelen mest om?","fi":"Mistä koko jutussa on pääasiassa kyse?"},
    qYellow: {"en":"Which headline fits the yellow paragraph?","de":"Welche Schlagzeile passt zum gelben Absatz?","fr":"Quel titre va avec le paragraphe jaune ?","es":"¿Qué titular va con el párrafo amarillo?","pt":"Qual manchete combina com o parágrafo amarelo?","it":"Quale titolo va bene per il paragrafo giallo?","nl":"Welke kop past bij de gele alinea?","sv":"Vilken rubrik passar till det gula stycket?","da":"Hvilken overskrift passer til det gule afsnit?","no":"Hvilken overskrift passer til det gule avsnittet?","fi":"Mikä otsikko sopii keltaiseen kappaleeseen?"},
    hintEmpty: {"en":"Put a headline on top of the article first.","de":"Leg zuerst eine Schlagzeile auf den Artikel.","fr":"Pose d’abord un titre sur l’article.","es":"Primero pon un titular sobre el artículo.","pt":"Primeiro coloque uma manchete em cima do texto.","it":"Prima metti un titolo sopra l’articolo.","nl":"Leg eerst een kop op het artikel.","sv":"Lägg först en rubrik överst på artikeln.","da":"Læg først en overskrift oven på artiklen.","no":"Legg først en overskrift oppå artikkelen.","fi":"Laita ensin otsikko jutun päälle."},
    hintDetail: {"en":"That headline only holds one strip. What are ALL the strips about?","de":"Diese Schlagzeile hält nur einen Streifen fest. Worum geht es in ALLEN Streifen?","fr":"Ce titre n’attache qu’une seule bande. De quoi parlent TOUTES les bandes ?","es":"Ese titular solo sujeta una tira. ¿De qué tratan TODAS las tiras?","pt":"Essa manchete só segura uma tira. Do que falam TODAS as tiras?","it":"Quel titolo tiene solo una striscia. Di che cosa parlano TUTTE le strisce?","nl":"Die kop houdt maar één strook vast. Waar gaan ALLE stroken over?","sv":"Den rubriken håller bara fast en remsa. Vad handlar ALLA remsorna om?","da":"Den overskrift holder kun én strimmel fast. Hvad handler ALLE strimlerne om?","no":"Den overskriften holder bare fast én strimmel. Hva handler ALLE strimlene om?","fi":"Se otsikko pitää kiinni vain yhdestä suikaleesta. Mistä KAIKKI suikaleet kertovat?"},
    hintNeighbour: {"en":"None of the strips talks about that. Read the strips again.","de":"Davon steht in keinem Streifen etwas. Lies die Streifen noch einmal.","fr":"Aucune bande ne parle de ça. Relis les bandes.","es":"Ninguna tira habla de eso. Vuelve a leer las tiras.","pt":"Nenhuma tira fala disso. Leia as tiras de novo.","it":"Nessuna striscia parla di questo. Rileggi le strisce.","nl":"Geen enkele strook gaat daarover. Lees de stroken nog eens.","sv":"Ingen av remsorna handlar om det. Läs remsorna igen.","da":"Ingen af strimlerne handler om det. Læs strimlerne igen.","no":"Ingen av strimlene handler om det. Les strimlene igjen.","fi":"Mikään suikale ei kerro siitä. Lue suikaleet uudelleen."},
    hintPara: {"en":"That fits only one paragraph. Find the headline for both.","de":"Das passt nur zu einem Absatz. Such die Schlagzeile für beide.","fr":"Ça ne va qu’avec un seul paragraphe. Trouve le titre des deux.","es":"Eso solo va con un párrafo. Busca el titular de los dos.","pt":"Isso só combina com um parágrafo. Procure a manchete dos dois.","it":"Questo va bene solo per un paragrafo. Trova il titolo per tutti e due.","nl":"Dat past maar bij één alinea. Zoek de kop voor allebei.","sv":"Den passar bara till ett stycke. Hitta rubriken för båda.","da":"Den passer kun til ét afsnit. Find overskriften til dem begge.","no":"Den passer bare til ett avsnitt. Finn overskriften for begge.","fi":"Se sopii vain yhteen kappaleeseen. Etsi otsikko molemmille."},
    hintL3detail: {"en":"That is one small part. What is the whole yellow paragraph about?","de":"Das ist nur ein kleiner Teil. Worum geht es im ganzen gelben Absatz?","fr":"Ce n’est qu’un petit morceau. De quoi parle tout le paragraphe jaune ?","es":"Esa es solo una parte pequeña. ¿De qué trata todo el párrafo amarillo?","pt":"Isso é só um pedacinho. Do que trata o parágrafo amarelo inteiro?","it":"È solo una piccola parte. Di che cosa parla tutto il paragrafo giallo?","nl":"Dat is maar een klein stukje. Waar gaat de hele gele alinea over?","sv":"Det är bara en liten del. Vad handlar hela det gula stycket om?","da":"Det er kun en lille del. Hvad handler hele det gule afsnit om?","no":"Det er bare en liten del. Hva handler hele det gule avsnittet om?","fi":"Se on vain pieni osa. Mistä koko keltainen kappale kertoo?"},
    hintL3other: {"en":"That fits the other paragraph. Look at the yellow one.","de":"Das passt zum anderen Absatz. Schau dir den gelben an.","fr":"Ça va avec l’autre paragraphe. Regarde le jaune.","es":"Eso va con el otro párrafo. Mira el amarillo.","pt":"Isso combina com o outro parágrafo. Olhe o amarelo.","it":"Questo va bene per l’altro paragrafo. Guarda quello giallo.","nl":"Dat past bij de andere alinea. Kijk naar de gele.","sv":"Den passar till det andra stycket. Titta på det gula.","da":"Den passer til det andet afsnit. Se på det gule.","no":"Den passer til det andre avsnittet. Se på det gule.","fi":"Se sopii toiseen kappaleeseen. Katso keltaista."},
    hintL3whole: {"en":"That is the whole article. What is just the yellow paragraph about?","de":"Das ist der ganze Artikel. Worum geht es nur im gelben Absatz?","fr":"Ça, c’est tout l’article. De quoi parle seulement le paragraphe jaune ?","es":"Eso es todo el artículo. ¿De qué trata solo el párrafo amarillo?","pt":"Isso é o texto todo. Do que trata só o parágrafo amarelo?","it":"Questo è tutto l’articolo. Di che cosa parla solo il paragrafo giallo?","nl":"Dat is het hele artikel. Waar gaat alleen de gele alinea over?","sv":"Det är hela artikeln. Vad handlar bara det gula stycket om?","da":"Det er hele artiklen. Hvad handler kun det gule afsnit om?","no":"Det er hele artikkelen. Hva handler bare det gule avsnittet om?","fi":"Se on koko juttu. Mistä pelkkä keltainen kappale kertoo?"},
    hintMiss2: {"en":"Look at the underlined words in every strip. Which headline says that?","de":"Schau dir die unterstrichenen Wörter in jedem Streifen an. Welche Schlagzeile sagt das?","fr":"Regarde les mots soulignés dans chaque bande. Quel titre dit ça ?","es":"Mira las palabras subrayadas en cada tira. ¿Qué titular dice eso?","pt":"Olhe as palavras sublinhadas em cada tira. Qual manchete diz isso?","it":"Guarda le parole sottolineate in ogni striscia. Quale titolo dice questo?","nl":"Kijk naar de onderstreepte woorden in elke strook. Welke kop zegt dat?","sv":"Titta på de understrukna orden i varje remsa. Vilken rubrik säger det?","da":"Se på de understregede ord i hver strimmel. Hvilken overskrift siger det?","no":"Se på de understrekede ordene i hver strimmel. Hvilken overskrift sier det?","fi":"Katso alleviivattuja sanoja jokaisessa suikaleessa. Mikä otsikko kertoo saman?"},
    hintMiss2Y: {"en":"Look at the underlined words in the yellow paragraph. Which headline says that?","de":"Schau dir die unterstrichenen Wörter im gelben Absatz an. Welche Schlagzeile sagt das?","fr":"Regarde les mots soulignés dans le paragraphe jaune. Quel titre dit ça ?","es":"Mira las palabras subrayadas en el párrafo amarillo. ¿Qué titular dice eso?","pt":"Olhe as palavras sublinhadas no parágrafo amarelo. Qual manchete diz isso?","it":"Guarda le parole sottolineate nel paragrafo giallo. Quale titolo dice questo?","nl":"Kijk naar de onderstreepte woorden in de gele alinea. Welke kop zegt dat?","sv":"Titta på de understrukna orden i det gula stycket. Vilken rubrik säger det?","da":"Se på de understregede ord i det gule afsnit. Hvilken overskrift siger det?","no":"Se på de understrekede ordene i det gule avsnittet. Hvilken overskrift sier det?","fi":"Katso alleviivattuja sanoja keltaisessa kappaleessa. Mikä otsikko kertoo saman?"},
    okWhole: {"en":"Front page! “{h}” — every strip is about that.","de":"Titelseite! „{h}“ – darum geht es in jedem Streifen.","fr":"En une ! « {h} » : toutes les bandes parlent de ça.","es":"¡Primera plana! “{h}”: de eso tratan todas las tiras.","pt":"Primeira página! “{h}”: todas as tiras falam disso.","it":"In prima pagina! «{h}»: ogni striscia parla di questo.","nl":"Voorpagina! ‘{h}’: daar gaan alle stroken over.","sv":"Förstasidan! ”{h}” – det handlar alla remsor om.","da":"Forsiden! »{h}« – det handler alle strimlerne om.","no":"Forsiden! «{h}» – det handler alle strimlene om.","fi":"Etusivu! ”{h}” – siitä kaikki suikaleet kertovat."},
    okYellow: {"en":"Stapled! “{h}” — the whole yellow paragraph is about that.","de":"Festgeheftet! „{h}“ – darum geht es im ganzen gelben Absatz.","fr":"Agrafé ! « {h} » : tout le paragraphe jaune parle de ça.","es":"¡Engrapado! “{h}”: de eso trata todo el párrafo amarillo.","pt":"Grampeado! “{h}”: o parágrafo amarelo inteiro fala disso.","it":"Spillato! «{h}»: tutto il paragrafo giallo parla di questo.","nl":"Vastgeniet! ‘{h}’: daar gaat de hele gele alinea over.","sv":"Häftat! ”{h}” – det handlar hela det gula stycket om.","da":"Hæftet! »{h}« – det handler hele det gule afsnit om.","no":"Stiftet! «{h}» – det handler hele det gule avsnittet om.","fi":"Nidottu! ”{h}” – siitä koko keltainen kappale kertoo."},
    aStrip: {"en":"Strip {i}: {t}","de":"Streifen {i}: {t}","fr":"Bande {i} : {t}","es":"Tira {i}: {t}","pt":"Tira {i}: {t}","it":"Striscia {i}: {t}","nl":"Strook {i}: {t}","sv":"Remsa {i}: {t}","da":"Strimmel {i}: {t}","no":"Strimmel {i}: {t}","fi":"Suikale {i}: {t}"},
    aStripY: {"en":"Strip {i}, yellow paragraph: {t}","de":"Streifen {i}, gelber Absatz: {t}","fr":"Bande {i}, paragraphe jaune : {t}","es":"Tira {i}, párrafo amarillo: {t}","pt":"Tira {i}, parágrafo amarelo: {t}","it":"Striscia {i}, paragrafo giallo: {t}","nl":"Strook {i}, gele alinea: {t}","sv":"Remsa {i}, det gula stycket: {t}","da":"Strimmel {i}, det gule afsnit: {t}","no":"Strimmel {i}, det gule avsnittet: {t}","fi":"Suikale {i}, keltainen kappale: {t}"},
    aSlot: {"en":"Headline: {t}","de":"Schlagzeile: {t}","fr":"Titre : {t}","es":"Titular: {t}","pt":"Manchete: {t}","it":"Titolo: {t}","nl":"Kop: {t}","sv":"Rubrik: {t}","da":"Overskrift: {t}","no":"Overskrift: {t}","fi":"Otsikko: {t}"},
    aSlotEmpty: {"en":"Headline slot: empty","de":"Platz für die Schlagzeile: leer","fr":"Place du titre : vide","es":"Lugar del titular: vacío","pt":"Lugar da manchete: vazio","it":"Posto del titolo: vuoto","nl":"Plek voor de kop: leeg","sv":"Plats för rubriken: tom","da":"Plads til overskriften: tom","no":"Plass til overskriften: tom","fi":"Otsikon paikka: tyhjä"},
    aStapler: {"en":"Stapler — press to check","de":"Hefter – zum Prüfen drücken","fr":"Agrafeuse : appuie pour vérifier","es":"Engrapadora: aprieta para comprobar","pt":"Grampeador: aperte para verificar","it":"Spillatrice: premi per verificare","nl":"Nietmachine: druk om te controleren","sv":"Häftapparat – tryck för att kontrollera","da":"Hæftemaskine – tryk for at tjekke","no":"Stiftemaskin – trykk for å sjekke","fi":"Nitoja – paina tarkistaaksesi"},
    aFan: {"en":"Desk fan","de":"Tischventilator","fr":"Ventilateur de bureau","es":"Ventilador de escritorio","pt":"Ventilador de mesa","it":"Ventilatore da tavolo","nl":"Tafelventilator","sv":"Bordsfläkt","da":"Bordventilator","no":"Bordvifte","fi":"Pöytätuuletin"},
    aCard: {"en":"Headline card: {t}","de":"Schlagzeilenkarte: {t}","fr":"Carte titre : {t}","es":"Tarjeta de titular: {t}","pt":"Cartão de manchete: {t}","it":"Carta del titolo: {t}","nl":"Kopkaart: {t}","sv":"Rubrikkort: {t}","da":"Overskriftskort: {t}","no":"Overskriftskort: {t}","fi":"Otsikkokortti: {t}"},
    aStapled: {"en":"Stapled {s} of {n} strips.","de":"Festgeheftet: {s} von {n} Streifen.","fr":"Bandes agrafées : {s} sur {n}.","es":"Tiras engrapadas: {s} de {n}.","pt":"Tiras grampeadas: {s} de {n}.","it":"Strisce spillate: {s} su {n}.","nl":"Vastgeniet: {s} van de {n} stroken.","sv":"Häftade remsor: {s} av {n}.","da":"Hæftede strimler: {s} af {n}.","no":"Stiftede strimler: {s} av {n}.","fi":"Nidottuja suikaleita: {s}/{n}."},
    aMarina: {"en":"Marina the otter","de":"Marina, der Otter","fr":"Marina la loutre","es":"Marina la nutria","pt":"Marina, a lontra","it":"Marina la lontra","nl":"Marina de otter","sv":"Uttern Marina","da":"Odderen Marina","no":"Oteren Marina","fi":"Saukko Marina"}
  },/*STRINGS-END*/
  defaults: { level: 'story', cards: '3' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'story', labelKey: 'lStory' }, { value: 'two', labelKey: 'lTwo' }, { value: 'one', labelKey: 'lOne' }] },
    { key: 'cards', type: 'choice', labelKey: 'setCards', options: [{ value: '3', label: '3' }, { value: '4', label: '4' }] }
  ],
  OK_MS: 500, FAST: false,
  TEAL: '#146B5E', CORAL: '#F2784B', INK: '#2B2B2B',
  PICS: { otter: 'zoo animals/otter', stapler: 'classroom/stapler', fan: 'around the house/fan' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this.stand = 0;
    injectHeadlineDeskCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.ncards !== this._ncards()) this._start(this.st.k, this._pass);
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return HeadlineDeskCore.levelOf(this._setting('level')); },
  _ncards: function () { return HeadlineDeskCore.cardsOf(this._setting('cards')); },
  _loc: function () { return HeadlineDeskCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level(); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = HeadlineDeskCore.rounds(this._loc(), this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = HeadlineDeskCore, pool = this._ensurePool(), n = C.passSize(this._level()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._level(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'headline-desk.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k, pass); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () { return this._t(this.st.level === 'one' ? 'qYellow' : 'qWhole'); },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k, pass) {
    this._clearTimers(); this._pass = pass || 0;
    this.st = HeadlineDeskCore.newState(this._loc(), this._level(), k, this._ncards(), pass || 0);
    this._view = { note: '', soft: false, anim: false, breeze: false, front: false, jam: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0, 0); this._render2(); this._watchWidth(); },
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
    var wrap = api.el('div', 'hd-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="hd-main"><div class="hd-desk" data-qa="desk"></div><div class="hd-side" data-qa="side"></div></div><p class="hd-note" data-qa="note" aria-live="polite"></p><div class="hd-ctrl"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    var self = this;
    wrap.addEventListener('keydown', function (e) {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.key === 's' || e.key === 'S') { e.preventDefault(); self._check(); }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); self._fan(); }
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width(), wide = W >= 600, cramp = W < 300;
    this._g = { W: W, wide: wide, cramp: cramp };
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'hd-wrap is-' + st.level + (wide ? ' is-wide' : ' is-narrow') + (cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (v.breeze ? ' is-breeze' : '') + (st.help ? ' is-help' : '');
    this._paintDesk(); this._paintSide(); this._paintCtrl();
    var note = this._qs('.hd-note');
    note.textContent = v.note || ''; note.className = 'hd-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); },
  _btn: function (cls, k, label, html) { var b = document.createElement('button'); b.type = 'button'; b.className = cls; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* a strip's text with the miss-2 thread words underlined (whole words, the data's own list — never computed) */
  _stripHtml: function (i) {
    var st = this.st, r = st.round, t = this._esc(r.strips[i]), words = st.help ? (r.hl[i] || []) : [];
    if (st.level === 'one' && r.target.indexOf(i) < 0) words = [];
    words.forEach(function (w) {
      var re = new RegExp('(^|[^\\p{L}])(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\p{L}])', 'u');
      t = t.replace(re, '$1<u class="hd-ul">$2</u>');
    });
    return t;
  },

  /* ---- the desk: Marina, the headline slot, the stapler, the strips, the fan, the floor band ---- */
  _paintDesk: function () {
    var st = this.st, r = st.round, v = this._view, g = this._g, el = this._qs('.hd-desk'), self = this, ver = st.help ? null : st.verdict;
    el.innerHTML = '';
    /* the top row: Marina (phones), the slot, the stapler */
    var top = document.createElement('div'); top.className = 'hd-top';
    if (!g.wide) top.insertAdjacentHTML('beforeend', '<img class="hd-otter" src="' + this._pic(this.PICS.otter) + '" alt="' + this._esc(this._t('aMarina')) + '" draggable="false">');
    var card = st.slot != null ? st.cards[st.slot] : null;
    var slot = this._btn('hd-slot' + (card ? ' is-full' : '') + (v.front && st.done ? ' is-front' : ''), 'slot', card ? this._t('aSlot', { t: card.text }) : this._t('aSlotEmpty'), card ? '<span>' + this._esc(card.text) + '</span>' + (v.front && st.done ? '<span class="hd-paw" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 36 36"><g fill="' + this.CORAL + '" opacity=".85"><ellipse cx="18" cy="23" rx="8" ry="7"/><circle cx="9" cy="13" r="3.5"/><circle cx="15" cy="8" r="3.5"/><circle cx="22" cy="8" r="3.5"/><circle cx="28" cy="13" r="3.5"/></g></svg></span>' : '') : '');
    slot.disabled = !card || st.done;
    slot.addEventListener('click', function () { if (st.slot != null) self._choose(st.slot); });
    top.appendChild(slot);
    var stp = this._btn('hd-stapler' + (ver && ver.jam ? ' is-jam' : '') + (v.anim ? ' is-down' : ''), 'stapler', this._t('aStapler'), '<img src="' + this._pic(this.PICS.stapler) + '" alt="" draggable="false">');
    stp.disabled = st.done;
    stp.addEventListener('click', function () { self._check(); });
    top.appendChild(stp);
    el.appendChild(top);
    if (v.front && st.done) el.insertAdjacentHTML('beforeend', '<div class="hd-mast" aria-hidden="true"><svg width="44" height="16" viewBox="0 0 44 16"><path d="M2 10 q5 -8 10 0 t10 0 t10 0 t10 0" fill="none" stroke="' + this.TEAL + '" stroke-width="3" stroke-linecap="round"/></svg></div>');
    /* the strips, in reading order; blown ones leave the desk for the floor band */
    var list = document.createElement('div'); list.className = 'hd-strips';
    var blown = ver ? ver.blown : [], stapled = ver ? ver.stapled : [], reach = ver ? ver.reach : [];
    r.strips.forEach(function (s, i) {
      if (r.breakAt === i) list.insertAdjacentHTML('beforeend', '<div class="hd-rule" aria-hidden="true"></div>');
      var yellow = r.lit != null && r.target.indexOf(i) >= 0, gone = blown.indexOf(i) >= 0;
      var d = document.createElement('div');
      d.className = 'hd-strip' + (yellow ? ' is-yellow' : '') + (stapled.indexOf(i) >= 0 ? ' is-stapled' : '') + (gone ? ' is-gone' : '') + (reach.indexOf(i) >= 0 ? ' is-reach' : '') + (i % 2 ? ' is-tilt2' : ' is-tilt1');
      d.setAttribute('data-qa', 'strip-' + i);
      d.setAttribute('aria-label', self._t(yellow ? 'aStripY' : 'aStrip', { i: i + 1, t: s }));
      d.innerHTML = (stapled.indexOf(i) >= 0 ? '<span class="hd-staple" aria-hidden="true"></span>' : '') + '<span class="hd-text">' + self._stripHtml(i) + '</span>';
      list.appendChild(d);
    });
    el.appendChild(list);
    /* the floor band: the fan at its left; blown strips lie here, crumpled flat */
    var floor = document.createElement('div'); floor.className = 'hd-floor'; floor.setAttribute('data-qa', 'floor');
    var fan = this._btn('hd-fan', 'fan', this._t('aFan'), '<img src="' + this._pic(this.PICS.fan) + '" alt="" draggable="false">');
    fan.addEventListener('click', function () { self._fan(); });
    floor.appendChild(fan);
    var pile = document.createElement('div'); pile.className = 'hd-pile';
    blown.forEach(function (i, n) { pile.insertAdjacentHTML('beforeend', '<span class="hd-crumple" data-qa="blown-' + i + '" style="--rot:' + ((n % 2 ? 1 : -1) * (4 + 3 * n)) + 'deg">' + self._esc(r.strips[i]) + '</span>'); });
    floor.appendChild(pile);
    /* on a phone Check sits at the floor band's right end (a row saved; the stapler is the same press) */
    if (!g.wide && !st.done) floor.appendChild(this._goBtn());
    el.appendChild(floor);
  },
  /* ---- the side: Marina (wide), the newsstand, the headline cards ---- */
  _paintSide: function () {
    var st = this.st, g = this._g, el = this._qs('.hd-side'), self = this;
    el.innerHTML = '';
    if (g.wide) {
      var head = document.createElement('div'); head.className = 'hd-head';
      head.innerHTML = '<img class="hd-otter" src="' + this._pic(this.PICS.otter) + '" alt="' + this._esc(this._t('aMarina')) + '" draggable="false"><div class="hd-stand" aria-hidden="true">' + new Array(Math.min(this.stand, 8) + 1).join('<i></i>') + '</div>';
      el.appendChild(head);
    }
    var col = document.createElement('div'); col.className = 'hd-cards';
    st.cards.forEach(function (c, i) {
      if (i === st.slot) { col.insertAdjacentHTML('beforeend', '<div class="hd-gap" aria-hidden="true"></div>'); return; }
      var b = self._btn('hd-card', 'card-' + i, self._t('aCard', { t: c.text }), '<span>' + self._esc(c.text) + '</span>');
      b.disabled = st.done;
      b.addEventListener('click', function () { self._choose(i); });
      col.appendChild(b);
    });
    el.appendChild(col);
  },
  _goBtn: function () {
    var self = this, go = this._btn('hd-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = this.st.done; go.addEventListener('click', function () { self._check(); });
    return go;
  },
  _paintCtrl: function () {
    var el = this._qs('.hd-ctrl'); el.innerHTML = '';
    if (this._g.wide) el.appendChild(this._goBtn());
  },

  /* ---------------- the hand ---------------- */
  _choose: function (i) {
    var st = this.st, v = this._view; if (st.done) return;
    if (!HeadlineDeskCore.choose(st, i)) return;
    v.note = ''; v.jam = false;
    this.api.sound(st.slot === i ? 620 : 420);
    this._paint();
  },
  _fan: function () {
    var v = this._view, self = this; v.breeze = true; this.api.sound(300); this._paint();
    this._later(function () { v.breeze = false; if (self._wrap) self._paint(); }, 900);
  },

  /* ---------------- Check = the stapler ---------------- */
  _check: function () {
    var st = this.st, v = this._view, C = HeadlineDeskCore, self = this; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    this.api.sound(180);
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this._paint(); this.api.announce(v.note); var s = this._qs('.hd-slot'); if (s) { s.classList.remove('is-glow'); void s.offsetWidth; s.classList.add('is-glow'); } return; }
    var p = res.press, n = st.round.target.length;
    v.anim = !this.FAST;
    var after = function () {
      v.anim = false;
      if (res.result === 'ok') { self._success(); return; }
      var key = C.hint(st, res); v.soft = false; v.note = self._t(key);
      self._paint(); self.api.announce(self._t('aStapled', { s: p.stapled.length, n: n }) + ' ' + v.note);
    };
    p.stapled.forEach(function (_, i) { self._later(function () { self.api.sound(880); }, 120 * (i + 1)); });
    if (this.FAST) { after(); return; }
    this._paint(); this._later(after, 600);
  },
  _success: function () {
    var st = this.st, v = this._view, card = st.cards[st.slot];
    var msg = this._t(st.level === 'one' ? 'okYellow' : 'okWhole', { h: card.text });
    v.note = ''; v.front = true; this.stand++;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(660); var self = this; this._later(function () { self.api.sound(990); }, 160);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectHeadlineDeskCSS() {
  if (typeof document === 'undefined' || document.getElementById('hd-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", SERIF = "Georgia, 'Times New Roman', serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.hd-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;} .hd-wrap:focus{outline:none;}'
  + '.hd-main{display:flex;gap:16px;justify-content:center;align-items:flex-start;width:100%;} .hd-wrap.is-narrow .hd-main{flex-direction:column;align-items:stretch;gap:10px;}'
  + '.hd-desk{position:relative;flex:1 1 440px;max-width:460px;display:flex;flex-direction:column;gap:8px;padding:12px 12px 0;border-radius:16px;background:linear-gradient(#E6C79A,#D9B37E);box-shadow:inset 0 0 0 3px #A97E45,0 4px 0 #A97E45;overflow:hidden;} .hd-wrap.is-narrow .hd-desk{flex:0 0 auto;max-width:none;padding:8px 8px 0;gap:6px;}'
  + '.hd-top{display:flex;align-items:center;gap:8px;} .hd-otter{display:block;width:96px;height:96px;object-fit:contain;} .hd-wrap.is-narrow .hd-top .hd-otter{width:64px;height:64px;flex:0 0 64px;} .hd-wrap.is-cramp .hd-top .hd-otter{width:44px;height:44px;flex:0 0 44px;}'
  + '.hd-slot{flex:1 1 auto;min-height:52px;display:flex;align-items:center;justify-content:center;padding:6px 10px;border:2px dashed #8A6A3E;border-radius:10px;background:rgba(255,253,246,.55);font:800 18px/1.15 ' + H + ';color:#2B2B2B;text-align:center;} .hd-slot.is-full{border:2px solid #2B2B2B;background:#FFFDF6;box-shadow:0 3px 0 #C9B48A;cursor:pointer;} .hd-slot:disabled{cursor:default;opacity:1;} .hd-slot.is-front{font-size:24px;border-width:3px;} .hd-slot.is-glow{animation:hdGlow .7s ease 2;} @keyframes hdGlow{50%{box-shadow:0 0 0 5px rgba(242,120,75,.45)}}'
  + '.hd-stapler{flex:0 0 auto;width:112px;height:96px;padding:0;border:0;border-radius:12px;background:rgba(255,253,246,.35);cursor:pointer;} .hd-stapler img{width:100%;height:100%;object-fit:contain;display:block;transition:transform .15s ease;transform-origin:85% 70%;} .hd-stapler.is-down img{transform:rotate(-5deg) translateY(4px);} .hd-stapler.is-jam img{transform:rotate(9deg);} .hd-stapler:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .hd-stapler:disabled{cursor:default;} .hd-wrap.is-narrow .hd-stapler{width:64px;height:64px;} .hd-wrap.is-cramp .hd-stapler{width:58px;height:46px;} .hd-wrap.is-narrow .hd-slot{min-height:48px;font-size:16px;padding:4px 8px;} .hd-wrap.is-narrow .hd-slot.is-front{font-size:18px;} .hd-wrap.is-cramp .hd-slot{font-size:15px;min-height:44px;} .hd-wrap.is-cramp .hd-desk{gap:5px;} .hd-wrap.is-cramp .hd-floor{padding:3px 8px 4px;min-height:44px;} .hd-wrap.is-cramp .hd-floor .hd-go{min-height:44px;padding:0 14px;font-size:17px;}'
  + '.hd-strips{display:flex;flex-direction:column;gap:6px;}'
  + '.hd-strip{position:relative;display:flex;align-items:center;gap:6px;min-height:44px;padding:6px 12px;background:#FFFDF6;border-radius:3px;box-shadow:0 2px 3px rgba(0,0,0,.18);font:400 18px/1.35 ' + SERIF + ';color:#2B2B2B;} .hd-strip.is-tilt1{transform:rotate(-.6deg);} .hd-strip.is-tilt2{transform:rotate(.7deg);} .hd-wrap.is-narrow .hd-strip{font-size:16px;padding:5px 9px;} .hd-wrap.is-cramp .hd-strip{font-size:14px;line-height:1.22;padding:3px 7px;min-height:0;} .hd-wrap.is-cramp .hd-strips{gap:3px;} .hd-wrap.is-cramp .hd-rule{margin:1px 8px;} .hd-wrap.is-cramp .hd-card{min-height:44px;font-size:14.5px;padding:4px 6px;} .hd-wrap.is-cramp .hd-gap{min-height:44px;} .hd-wrap.is-narrow.is-done .hd-strip{font-size:13px;line-height:1.2;padding:2px 6px;min-height:0;} .hd-wrap.is-narrow.is-done .hd-strips{gap:2px;} .hd-wrap.is-narrow .hd-strips{gap:5px;}'
  + '.hd-strip.is-yellow{background:linear-gradient(transparent 8%,#FFE680 8%,#FFE680 92%,transparent 92%),#FFFDF6;} .hd-strip.is-stapled{transform:none;box-shadow:inset 0 0 0 2px #146B5E,0 2px 3px rgba(0,0,0,.18);} .hd-strip.is-gone{display:none;} .hd-strip.is-reach{box-shadow:inset 0 0 0 2px #F2784B;outline:2px dashed #F2784B;outline-offset:2px;}'
  + '.hd-staple{flex:0 0 auto;width:16px;height:5px;border:2px solid #6B7480;border-bottom:0;border-radius:2px 2px 0 0;align-self:flex-start;margin-top:4px;}'
  + '.hd-ul{text-decoration:none;background:linear-gradient(transparent 62%,rgba(242,120,75,.45) 62%);border-bottom:2px solid #F2784B;}'
  + '.hd-rule{height:0;border-top:2px solid rgba(138,106,62,.55);margin:2px 8px;}'
  + '.hd-floor{display:flex;align-items:center;gap:8px;min-height:52px;margin:2px -12px 0;padding:4px 12px;background:#B98A55;box-shadow:inset 0 3px 0 rgba(0,0,0,.12);} .hd-wrap.is-narrow .hd-floor{margin:2px -8px 0;padding:5px 8px 7px;min-height:46px;} .hd-wrap.is-narrow .hd-fan{width:64px;height:64px;} .hd-wrap.is-cramp .hd-fan{width:44px;height:44px;}'
  + '.hd-fan{flex:0 0 auto;width:96px;height:96px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;} .hd-fan img{width:100%;height:100%;object-fit:contain;display:block;} .hd-wrap.is-breeze .hd-fan img{animation:hdTurn .3s ease-in-out 3;} @keyframes hdTurn{50%{transform:rotate(-8deg)}}'
  + '.hd-wrap.is-breeze .hd-strip{animation:hdFlutter .45s ease-in-out 2;} @keyframes hdFlutter{50%{transform:rotate(-1.5deg) translateY(-2px)}}'
  + '.hd-floor .hd-go{margin-left:auto;flex:0 0 auto;min-height:48px;padding:0 16px;font-size:18px;box-shadow:0 3px 0 #0E4C43;} .hd-pile{flex:1 1 auto;display:flex;flex-wrap:wrap;gap:4px 6px;align-items:center;min-width:0;} .hd-crumple{display:inline-block;max-width:120px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:2px 6px;background:#EFE7D6;border-radius:2px;font:400 12px/1.3 ' + SERIF + ';color:#6B5A44;transform:rotate(var(--rot));box-shadow:0 1px 2px rgba(0,0,0,.25);animation:hdBlow .5s ease-out 1;} @keyframes hdBlow{from{transform:translate(-30px,-60px) rotate(40deg);opacity:0}}'
  + '.hd-mast{display:flex;justify-content:center;margin:-2px 0 -4px;} .hd-slot{position:relative;} .hd-paw{position:absolute;right:-6px;top:-10px;transform:rotate(-12deg);animation:hdStamp .35s ease-out 1;} @keyframes hdStamp{from{transform:scale(1.8) rotate(-12deg);opacity:0}}'
  + '.hd-wrap.is-narrow .hd-side{flex:0 0 auto;} .hd-side{flex:0 0 220px;display:flex;flex-direction:column;align-items:stretch;gap:10px;} .hd-head{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;} .hd-stand{display:flex;flex-wrap:wrap;gap:3px;max-width:110px;} .hd-stand i{display:block;width:14px;height:18px;background:#FFFDF6;border:1.5px solid #8A6A3E;box-shadow:inset 0 3px 0 #146B5E;}'
  + '.hd-cards{display:flex;flex-direction:column;gap:8px;} .hd-wrap.is-narrow .hd-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px;}'
  + '.hd-card{min-height:56px;display:flex;align-items:center;justify-content:center;padding:6px 10px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D4B4,0 3px 0 #E2D4B4;font:800 18px/1.15 ' + H + ';color:#2B2B2B;text-align:center;cursor:pointer;} .hd-card:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .hd-card:disabled{cursor:default;opacity:.55;} .hd-wrap.is-narrow .hd-card{min-height:52px;font-size:16px;padding:5px 7px;} .hd-wrap.is-cramp .hd-card{min-height:48px;font-size:15px;}'
  + '.hd-gap{min-height:56px;border:2px dashed #E2D4B4;border-radius:12px;} .hd-wrap.is-narrow .hd-gap{min-height:52px;}'
  + '.hd-note{margin:0;min-height:1.3em;max-width:600px;font-family:' + B + ';font-weight:700;font-size:17px;color:#146B5E;text-align:center;} .hd-note.is-hint{color:#A3401F;} .hd-note:empty{display:none;} .hd-wrap.is-narrow .hd-note{font-size:15px;line-height:1.25;} .hd-wrap.is-cramp .hd-note{font-size:14px;}'
  + '.hd-wrap.is-done .hd-ctrl{display:none;} .hd-wrap.is-narrow.is-done .hd-side,.hd-wrap.is-narrow.is-done .hd-floor{display:none;} .hd-wrap.is-narrow.is-done .hd-desk{padding-bottom:8px;} .hd-ctrl{display:flex;justify-content:center;} .hd-go{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 26px;border:0;border-radius:14px;background:#146B5E;color:#fff;font:800 20px ' + H + ';box-shadow:0 4px 0 #0E4C43;cursor:pointer;} .hd-go svg{width:22px;height:22px;} .hd-go:disabled{opacity:.45;cursor:default;} .hd-go:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '.hd-wrap.is-cramp .hd-main{gap:8px;} .hd-wrap.is-cramp .hd-go{padding:0 18px;font-size:18px;}'
  + '@media (prefers-reduced-motion:reduce){.hd-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'hd-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.MarinaHeadlineDeskActivity = MarinaHeadlineDeskActivity;
