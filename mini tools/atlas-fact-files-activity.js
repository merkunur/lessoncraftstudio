/* =====================================================================
   atlas-fact-files-activity.js — ACTIVITY #69 of the one-by-one rebuild:
   "Atlas's Fact Files" → THE HIGHLIGHTER THAT LIFTS FACTS (RI.K.1, 11 locales).
   Design sheet: docs/activities-rebuild/designs/069-atlas-fact-files.md
   ---------------------------------------------------------------------
   THE INVENTION: the child answers by FINDING the words. Swipe the
   highlighter over the fact; the caught words drop into the question's own
   sentence on Atlas's file card. Only the words that answer make the card
   read true and snap into the drawer; other words read wrong in the frame,
   for the child to see. Level 2: the five sentences of an animal's text
   go into fact-file drawers (no sentence holds its drawer's word), then
   three claims are judged against the file. Level 3: the word bank goes
   back into the text's own sentences, then the child picks three facts.

   ACTIVITY LAYER ONLY: the model is atlas-fact-files-core.js; lcs-shell.js
   and fact-detail-core.js are untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.AtlasFactFilesActivity.st / ._pool / ._order / .FAST.
   ===================================================================== */
'use strict';

var AtlasFactFilesActivity = {
  id: 'atlas-fact-files',
  apparatusClasses: ['af-'],

  strings: {
    title:       {en:'Atlas\'s Fact Files',de:'Atlas’ Fakten-Kartei',nl:'De weetjesmap van Atlas',da:'Atlas’ faktakort',sv:'Atlas faktakort',no:'Atlas sine faktakort',es:'Las fichas de Atlas',it:'Le schede di Atlas',pt:'As fichas do Atlas',fr:'Les fiches d’Atlas',fi:'Atlaksen faktakortit'},
    instrFind:   {en:'Swipe the highlighter over the words that answer.',de:'Fahr mit dem Leuchtstift über die Wörter, die die Frage beantworten.',nl:'Kleur met de markeerstift de woorden die antwoord geven.',da:'Stryg overstregningstuschen hen over de ord, der svarer.',sv:'Dra överstrykningspennan över orden som svarar.',no:'Dra merkepennen over ordene som svarer.',es:'Pasa el marcador sobre las palabras que responden.',it:'Passa l’evidenziatore sulle parole che rispondono.',pt:'Passe o marca-texto nas palavras que respondem.',fr:'Passe le surligneur sur les mots qui répondent.',fi:'Vedä korostuskynällä vastaavien sanojen yli.'},
    instrFile:   {en:'Put each fact in its drawer.',de:'Leg jeden Satz in seine Schublade.',nl:'Leg elk weetje in zijn la.',da:'Læg hver sætning i sin skuffe.',sv:'Lägg varje mening i sin låda.',no:'Legg hver setning i sin skuff.',es:'Pon cada dato en su cajón.',it:'Metti ogni frase nel suo cassetto.',pt:'Coloque cada frase na sua gaveta.',fr:'Range chaque phrase dans son tiroir.',fi:'Laita jokainen lause omaan laatikkoonsa.'},
    instrClaims: {en:'Is it in the file?',de:'Steht das in der Kartei?',nl:'Staat dat in de map?',da:'Står det på kortet?',sv:'Står det på kortet?',no:'Står det på kortet?',es:'¿Está en la ficha?',it:'C’è nella scheda?',pt:'Está na ficha?',fr:'Est-ce dans la fiche ?',fi:'Lukeeko se kortissa?'},
    instrBank:   {en:'Put each word back in its sentence.',de:'Setz jedes Wort zurück in seinen Satz.',nl:'Zet elk woord terug in zijn zin.',da:'Sæt hvert ord tilbage i sin sætning.',sv:'Sätt tillbaka varje ord i sin mening.',no:'Sett hvert ord tilbake i sin setning.',es:'Regresa cada palabra a su oración.',it:'Rimetti ogni parola nella sua frase.',pt:'Coloque cada palavra de volta na sua frase.',fr:'Remets chaque mot dans sa phrase.',fi:'Laita jokainen sana takaisin lauseeseensa.'},
    instrPick:   {en:'Tap the three facts you like best.',de:'Tippe die drei Sätze an, die dir am besten gefallen.',nl:'Tik op de drie weetjes die jij het leukst vindt.',da:'Tryk på de tre sætninger, du bedst kan lide.',sv:'Tryck på de tre meningar du gillar bäst.',no:'Trykk på de tre setningene du liker best.',es:'Toca los tres datos que más te gustan.',it:'Tocca le tre frasi che ti piacciono di più.',pt:'Toque nas três frases de que você mais gosta.',fr:'Touche les trois phrases que tu préfères.',fi:'Napauta kolmea lausetta, joista pidät eniten.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    emptyHL:     {en:'Swipe the highlighter over the words that answer.',de:'Fahr zuerst mit dem Leuchtstift über die Wörter.',nl:'Kleur eerst de woorden met de markeerstift.',da:'Stryg først tuschen hen over ordene.',sv:'Dra först pennan över orden.',no:'Dra først pennen over ordene.',es:'Primero pasa el marcador sobre las palabras.',it:'Prima passa l’evidenziatore sulle parole.',pt:'Primeiro passe o marca-texto nas palavras.',fr:'Passe d’abord le surligneur sur les mots.',fi:'Vedä ensin kynällä sanojen yli.'},
    hintRead:    {en:'Read the card. Does it answer the question?',de:'Lies die Karte. Beantwortet sie die Frage?',nl:'Lees de kaart. Geeft die antwoord op de vraag?',da:'Læs kortet. Svarer det på spørgsmålet?',sv:'Läs kortet. Svarar det på frågan?',no:'Les kortet. Svarer det på spørsmålet?',es:'Lee la tarjeta. ¿Responde la pregunta?',it:'Leggi il cartellino. Risponde alla domanda?',pt:'Leia o cartão. Ele responde à pergunta?',fr:'Lis la carte. Est-ce qu’elle répond à la question ?',fi:'Lue kortti. Vastaako se kysymykseen?'},
    hintSign:    {en:'Read the bright sentence. The answer comes right after the gold word.',de:'Lies den hellen Satz. Die Antwort steht gleich hinter dem goldenen Wort.',nl:'Lees de heldere zin. Het antwoord staat vlak na het gouden woord.',da:'Læs den lyse sætning. Svaret står lige efter det gyldne ord.',sv:'Läs den ljusa meningen. Svaret står direkt efter det gyllene ordet.',no:'Les den lyse setningen. Svaret står rett etter det gylne ordet.',es:'Lee la oración clara. La respuesta está justo después de la palabra dorada.',it:'Leggi la frase chiara. La risposta è subito dopo la parola dorata.',pt:'Leia a frase clara. A resposta vem logo depois da palavra dourada.',fr:'Lis la phrase claire. La réponse est juste après le mot doré.',fi:'Lue kirkas lause. Vastaus on heti kultaisen sanan jälkeen.'},
    hintDrawer:  {en:'Is that fact about what it eats, where it lives, how it moves, what it is covered in, or its babies?',de:'Geht es in dem Satz ums Fressen, ums Wohnen, ums Bewegen, um den Körper oder um die Jungen?',nl:'Gaat dat weetje over eten, wonen, bewegen, wat het op zijn lijf heeft of over de jongen?',da:'Handler sætningen om, hvad den spiser, hvor den bor, hvordan den bevæger sig, hvad den er dækket af, eller om ungerne?',sv:'Handlar meningen om vad den äter, var den bor, hur den rör sig, vad den har på kroppen eller om ungarna?',no:'Handler setningen om hva den spiser, hvor den bor, hvordan den beveger seg, hva den har på kroppen, eller om ungene?',es:'¿Ese dato es sobre lo que come, dónde vive, cómo se mueve, qué cubre su cuerpo o sus crías?',it:'Quella frase parla di cosa mangia, dove vive, come si muove, che cosa copre il suo corpo o dei suoi piccoli?',pt:'Essa frase fala do que ele come, onde vive, como se move, o que cobre o corpo ou dos filhotes?',fr:'Cette phrase parle-t-elle de ce qu’il mange, de là où il vit, de comment il bouge, de ce qui couvre son corps ou de ses petits ?',fi:'Kertooko lause siitä, mitä se syö, missä se asuu, miten se liikkuu, mikä peittää sen kehoa vai sen poikasista?'},
    hintDrawer2: {en:'The glowing drawer is where that fact goes.',de:'Die leuchtende Schublade ist die richtige.',nl:'De oplichtende la is de goede.',da:'Den lysende skuffe er den rigtige.',sv:'Den lysande lådan är den rätta.',no:'Den lysende skuffen er den riktige.',es:'El cajón que brilla es el correcto.',it:'Il cassetto che brilla è quello giusto.',pt:'A gaveta que brilha é a certa.',fr:'Le tiroir qui brille est le bon.',fi:'Hehkuva laatikko on oikea.'},
    hintClaim:   {en:'Look in the file. Does it say that?',de:'Schau in die Kartei. Steht das da?',nl:'Kijk in de map. Staat dat erin?',da:'Se på kortet. Står det der?',sv:'Titta på kortet. Står det där?',no:'Se på kortet. Står det der?',es:'Mira en la ficha. ¿Dice eso?',it:'Guarda nella scheda. C’è scritto?',pt:'Olhe na ficha. Ela diz isso?',fr:'Regarde dans la fiche. Est-ce qu’elle le dit ?',fi:'Katso korttia. Lukeeko siinä niin?'},
    hintClaim2:  {en:'Read the open drawer. Does it say that?',de:'Lies die offene Schublade. Steht das da?',nl:'Lees de open la. Staat dat erin?',da:'Læs den åbne skuffe. Står det der?',sv:'Läs den öppna lådan. Står det där?',no:'Les den åpne skuffen. Står det der?',es:'Lee el cajón abierto. ¿Dice eso?',it:'Leggi il cassetto aperto. C’è scritto?',pt:'Leia a gaveta aberta. Ela diz isso?',fr:'Lis le tiroir ouvert. Est-ce qu’il le dit ?',fi:'Lue avoin laatikko. Lukeeko siinä niin?'},
    hintTile:    {en:'Read the text. Which sentence has that word?',de:'Lies den Text. In welchem Satz steht das Wort?',nl:'Lees de tekst. In welke zin staat dat woord?',da:'Læs teksten. Hvilken sætning har det ord?',sv:'Läs texten. Vilken mening har det ordet?',no:'Les teksten. Hvilken setning har det ordet?',es:'Lee el texto. ¿Qué oración tiene esa palabra?',it:'Leggi il testo. Quale frase ha quella parola?',pt:'Leia o texto. Qual frase tem essa palavra?',fr:'Lis le texte. Quelle phrase a ce mot ?',fi:'Lue teksti. Missä lauseessa se sana on?'},
    hintTile2:   {en:'The glowing sentence is where that word goes.',de:'Der leuchtende Satz ist der richtige.',nl:'De oplichtende zin is de goede.',da:'Den lysende sætning er den rigtige.',sv:'Den lysande meningen är den rätta.',no:'Den lysende setningen er den riktige.',es:'La oración que brilla es la correcta.',it:'La frase che brilla è quella giusta.',pt:'A frase que brilha é a certa.',fr:'La phrase qui brille est la bonne.',fi:'Hehkuva lause on oikea.'},
    hintTrap:    {en:'That word is not in this text.',de:'Dieses Wort steht nicht in diesem Text.',nl:'Dat woord staat niet in deze tekst.',da:'Det ord står ikke i teksten.',sv:'Det ordet står inte i texten.',no:'Det ordet står ikke i teksten.',es:'Esa palabra no está en este texto.',it:'Quella parola non è in questo testo.',pt:'Essa palavra não está neste texto.',fr:'Ce mot n’est pas dans ce texte.',fi:'Sitä sanaa ei ole tässä tekstissä.'},
    okFind:      {en:'{card} You found it in the fact!',de:'{card} Du hast es im Text gefunden!',nl:'{card} Je vond het in de tekst!',da:'{card} Du fandt det i teksten!',sv:'{card} Du hittade det i texten!',no:'{card} Du fant det i teksten!',es:'{card} ¡Lo encontraste en el texto!',it:'{card} L’hai trovato nel testo!',pt:'{card} Você achou no texto!',fr:'{card} Tu l’as trouvé dans le texte !',fi:'{card} Löysit sen tekstistä!'},
    okFile:      {en:'The fact file is full!',de:'Die Kartei ist voll!',nl:'De weetjesmap is vol!',da:'Faktakortet er fyldt!',sv:'Faktakortet är fyllt!',no:'Faktakortet er fylt!',es:'¡La ficha está completa!',it:'La scheda è completa!',pt:'A ficha está completa!',fr:'La fiche est complète !',fi:'Faktakortti on täynnä!'},
    okBank:      {en:'Here are your three facts!',de:'Hier sind deine drei Sätze!',nl:'Hier zijn jouw drie weetjes!',da:'Her er dine tre sætninger!',sv:'Här är dina tre meningar!',no:'Her er dine tre setninger!',es:'¡Aquí están tus tres datos!',it:'Ecco le tue tre frasi!',pt:'Aqui estão as suas três frases!',fr:'Voici tes trois phrases !',fi:'Tässä ovat sinun kolme lausettasi!'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    setLevel:    {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lFind:       {en:'Find the answer',de:'Antwort finden',nl:'Antwoord zoeken',da:'Find svaret',sv:'Hitta svaret',no:'Finn svaret',es:'Encuentra la respuesta',it:'Trova la risposta',pt:'Ache a resposta',fr:'Trouve la réponse',fi:'Etsi vastaus'},
    lFile:       {en:'Fill the fact file',de:'Kartei füllen',nl:'Weetjesmap vullen',da:'Fyld faktakortet',sv:'Fyll faktakortet',no:'Fyll faktakortet',es:'Llena la ficha',it:'Riempi la scheda',pt:'Complete a ficha',fr:'Remplis la fiche',fi:'Täytä faktakortti'},
    lBank:       {en:'Word-bank file',de:'Wörter einsetzen',nl:'Woorden invullen',da:'Indsæt ordene',sv:'Sätt in orden',no:'Sett inn ordene',es:'Banco de palabras',it:'Banca delle parole',pt:'Banco de palavras',fr:'Banque de mots',fi:'Sanapankki'},
    setPics:     {en:'Pictures',de:'Bilder',nl:'Plaatjes',da:'Billeder',sv:'Bilder',no:'Bilder',es:'Dibujos',it:'Disegni',pt:'Figuras',fr:'Images',fi:'Kuvat'},
    pOn:         {en:'On',de:'An',nl:'Aan',da:'Til',sv:'På',no:'På',es:'Sí',it:'Sì',pt:'Sim',fr:'Oui',fi:'Päällä'},
    pOff:        {en:'Off',de:'Aus',nl:'Uit',da:'Fra',sv:'Av',no:'Av',es:'No',it:'No',pt:'Não',fr:'Non',fi:'Pois'},
    ariaAtlas:   {en:'Atlas: read the text aloud',de:'Atlas: den Text vorlesen',nl:'Atlas: lees de tekst voor',da:'Atlas: læs teksten højt',sv:'Atlas: läs texten högt',no:'Atlas: les teksten høyt',es:'Atlas: lee el texto en voz alta',it:'Atlas: leggi il testo ad alta voce',pt:'Atlas: leia o texto em voz alta',fr:'Atlas : lis le texte à voix haute',fi:'Atlas: lue teksti ääneen'},
    ariaCard:    {en:'Answer card: {c}',de:'Antwortkarte: {c}',nl:'Antwoordkaart: {c}',da:'Svarkort: {c}',sv:'Svarskort: {c}',no:'Svarkort: {c}',es:'Tarjeta de respuesta: {c}',it:'Cartellino della risposta: {c}',pt:'Cartão de resposta: {c}',fr:'Carte réponse : {c}',fi:'Vastauskortti: {c}'},
    ariaStrip:   {en:'Fact: {s}',de:'Satz: {s}',nl:'Weetje: {s}',da:'Sætning: {s}',sv:'Mening: {s}',no:'Setning: {s}',es:'Dato: {s}',it:'Frase: {s}',pt:'Frase: {s}',fr:'Phrase : {s}',fi:'Lause: {s}'},
    ariaDrawer:  {en:'Drawer: {d}',de:'Schublade: {d}',nl:'La: {d}',da:'Skuffe: {d}',sv:'Låda: {d}',no:'Skuff: {d}',es:'Cajón: {d}',it:'Cassetto: {d}',pt:'Gaveta: {d}',fr:'Tiroir : {d}',fi:'Laatikko: {d}'},
    ariaTile:    {en:'Word: {w}',de:'Wort: {w}',nl:'Woord: {w}',da:'Ord: {w}',sv:'Ord: {w}',no:'Ord: {w}',es:'Palabra: {w}',it:'Parola: {w}',pt:'Palavra: {w}',fr:'Mot : {w}',fi:'Sana: {w}'},
    ariaFrame:   {en:'Sentence {n}',de:'Satz {n}',nl:'Zin {n}',da:'Sætning {n}',sv:'Mening {n}',no:'Setning {n}',es:'Oración {n}',it:'Frase {n}',pt:'Frase {n}',fr:'Phrase {n}',fi:'Lause {n}'}
  },

  defaults: { level: 'find', pics: 'on' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'find', labelKey: 'lFind' }, { value: 'file', labelKey: 'lFile' }, { value: 'bank', labelKey: 'lBank' }] },
    { key: 'pics', type: 'choice', labelKey: 'setPics', options: [{ value: 'on', labelKey: 'pOn' }, { value: 'off', labelKey: 'pOff' }] }
  ],

  OK_MS: 500, FAST: false, MISS_MS: 1400,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._curPass = 0; this._pass = 0; this._deal = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._drag = null; this._sel = null; this._drawer = 0;
    injectAtlasCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () { if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); } else if (this._wrap) this._paint(); },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return AtlasFactFilesCore.locale(((this.api && this.api.lang) || 'en').slice(0, 2)); },
  _level: function () { var v = this._set('level'); return AtlasFactFilesCore.LEVELS.indexOf(v) >= 0 ? v : 'find'; },
  _pics: function () { return this._set('pics') !== 'off'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _T: function () { return AtlasFactFilesCore.DATA.TEXT[this._loc()]; },
  _say: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak && text) window.LCSAudio.speak({ type: 'sentence', text: text, lang: this._loc(), rate: 0.9 }); } catch (e) {} },

  /* ---------------- rounds ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = AtlasFactFilesCore.plan(this._loc(), this._level(), Math.random, 0, null); this._poolKey = k; this._order = null; this._pass = 0; this._deal = null; }
    return this._pool;
  },
  /* the round id names the FACT (or the file): the next pass asks the other question of the same nine facts — the same items, a new order */
  nextTask: function (opts) {
    var C = AtlasFactFilesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (pass > this._pass) { this._pool = C.plan(this._loc(), this._level(), Math.random, pass, pool); this._pass = pass; pool = this._pool; this._order = null; this._deal = null; this._drawer = 0; }
    if (index % n === 0) this._drawer = 0;
    /* the claim that is NOT in the file sits first, second or third 3/2/2 times a pass */
    if (!this._deal || this._deal.length !== n) this._deal = pool.map(function (r, i) { return C.deal(r, Math.random, [0, 1, 2, 0, 1, 2, 1][i % 7]); });
    var k = (this._order && this._orderForPool === pool && this._order.length === n) ? this._order[index % n] : index % n, r = pool[k], dl = this._deal[k], pa = { msg: '' }; this._pa = pa;
    var instr = r.level === 'find' ? 'instrFind' : r.level === 'file' ? 'instrFile' : 'instrBank';
    return {
      id: 'atlas.' + r.loc + '.' + r.level + '.' + r.key, promptKey: instr, promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._view = {}; tool._drag = null; tool._sel = null; tool._anchor = null; tool._cur = null; tool.st = C.newState(r, dl); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = AtlasFactFilesCore, p = C.plan(this._loc(), this._level(), C.seeded('x'), 0, null); this.st = C.newState(p[0], C.deal(p[0], C.seeded('d'), 2)); }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._drag || self._anchor !== null && self._anchor !== undefined) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'af-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    this._body = api.el('div', 'af-body'); wrap.appendChild(this._body);
    var row = api.el('div', 'af-row'); wrap.appendChild(row);
    var chk = api.el('button', 'af-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'af-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
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
  _img: function (p, cls) { var im = this.api.el('img', cls || 'af-img'); im.alt = ''; im.draggable = false; im.src = this._pic(p); return im; },
  _paint_: function () {
    if (!this._body) return;
    var st = this.st, C = AtlasFactFilesCore, v = this._view, L = this._L = C.layout(this._width());
    this._wrap.className = 'af-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 300 ? ' is-tiny' : '') + ' is-' + st.level + (st.done ? ' is-done' : '') + (this._pics() ? '' : ' is-nopics') + (this.FAST ? ' is-fast' : '');
    [['pic', L.pic], ['atlas', L.atlas], ['text', L.text], ['cover', L.cover]].forEach(function (p) { this._wrap.style.setProperty('--af-' + p[0], p[1] + 'px'); }, this);
    this._body.innerHTML = '';
    if (st.level === 'find') this._paintFind(); else if (st.level === 'file') this._paintFile(); else this._paintBank();
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg; else if (h && !this._busy) msg = this._t(h, { q: st.r.question || '' });
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!v.msg); this._note.classList.toggle('is-wrong', !!(h && !v.msg && st.last && st.last.reason === 'wrong'));
    this._checkBtn.hidden = st.level !== 'find' || !!st.done; this._checkBtn.disabled = !!this._busy; this._checkBtn.textContent = this._t('check');
  },
  _atlasBtn: function (say) {
    var self = this, b = this.api.el('button', 'af-atlas' + (this._view.roll ? ' is-roll' : ''));
    b.type = 'button'; b.setAttribute('data-k', 'atlas'); b.setAttribute('aria-label', this._t('ariaAtlas'));
    b.appendChild(this._img(AtlasFactFilesCore.ATLAS));
    b.addEventListener('click', function () { self._say(say); b.classList.remove('is-roll'); void b.offsetWidth; b.classList.add('is-roll'); });
    return b;
  },

  /* ---------------- Level 1: the fact, the highlighter, the file card ---------------- */
  _paintFind: function () {
    var api = this.api, self = this, st = this.st, r = st.r, C = AtlasFactFilesCore, v = this._view, help = C.helpOf(st) || {}, res = st.result;
    var top = api.el('div', 'af-top'); top.appendChild(this._atlasBtn(r.text));
    var tab = api.el('div', 'af-qtab'); var qi = api.el('span', 'af-qmark'); qi.textContent = '?'; tab.appendChild(qi);
    var qt = api.el('span', 'af-q'); qt.textContent = r.question; tab.appendChild(qt); top.appendChild(tab);
    this._body.appendChild(top);
    /* the fact card */
    var card = api.el('div', 'af-fact' + (st.done ? ' is-done' : ''));
    if (this._pics()) { var pw = api.el('span', 'af-factpic'); pw.appendChild(this._img(r.pic)); card.appendChild(pw); }
    var txt = api.el('p', 'af-text'); txt.setAttribute('data-k', 'text');
    var sel = this._sel || st.sel, shown = st.done ? (res && res.kind === 'echo' && st.sel ? st.sel : r.span) : sel;
    r.toks.forEach(function (t, i) {
      var w = api.el('span', 'af-w'), on = shown && i >= shown[0] && i <= shown[1];
      if (on) w.classList.add('is-hl');
      if (on && st.done && (i < r.span[0] || i > r.span[1])) w.classList.add('is-peel');
      if (shown && on && i === shown[0]) w.classList.add('is-first'); if (shown && on && i === shown[1]) w.classList.add('is-last');
      if (help.sentence !== undefined && t.s !== help.sentence) w.classList.add('is-faint');
      if (help.sign === i) w.classList.add('is-sign');
      if (v.trace && i >= v.trace[0] && i <= v.trace[1]) w.classList.add('is-trace');
      if (self._cur === i) w.classList.add('is-cur');
      w.textContent = t.w; w.setAttribute('data-i', i);
      txt.appendChild(w); if (i < r.toks.length - 1) txt.appendChild(document.createTextNode(' '));
    });
    this._bindText(txt);
    card.appendChild(txt);
    var pen = api.el('span', 'af-pen' + (sel && !st.done ? ' is-on' : '')); pen.setAttribute('aria-hidden', 'true'); pen.appendChild(api.el('span', 'af-pentip')); card.appendChild(pen);
    this._body.appendChild(card);
    /* the file card: the question's own sentence with the caught words in its gap */
    var row = api.el('div', 'af-filerow');
    var fc = api.el('button', 'af-card' + (st.done ? ' is-ok' : '') + (res && !res.ok && st.show && v.reading ? ' is-wrong' : '')); fc.type = 'button'; fc.setAttribute('data-k', 'card');
    var parts = String(r.frame).split('___'), gap = api.el('span', 'af-gap');
    var filled = st.done ? C.words(r, r.span) : (v.reading && res ? res.caught : (sel ? C.words(r, sel) : ''));
    gap.textContent = filled || ' '; if (!filled) gap.classList.add('is-empty'); if (v.reading && res && !res.ok) gap.classList.add('is-amber');
    fc.appendChild(document.createTextNode(parts[0])); fc.appendChild(gap); fc.appendChild(document.createTextNode(parts[1] || ''));
    if (st.done) fc.appendChild(api.el('span', 'af-paw'));
    fc.setAttribute('aria-label', this._t('ariaCard', { c: C.frameFill(r.frame, filled || '…') }));
    fc.addEventListener('click', function () { if (!self._free()) return; if (C.clearSel(st)) { self._sel = null; self._view = {}; self._paint(); } });
    row.appendChild(fc);
    var dr = api.el('div', 'af-drawer'); dr.setAttribute('aria-hidden', 'true');
    for (var q = 0; q < Math.min(9, this._drawer + (st.done ? 1 : 0)); q++) dr.appendChild(api.el('span', 'af-slip'));
    row.appendChild(dr);
    this._body.appendChild(row);
  },
  _paintSel: function (txt) {
    var s = this._sel, r = this.st.r;
    [].forEach.call(txt.querySelectorAll('.af-w'), function (w) { var i = +w.getAttribute('data-i'), on = s && i >= s[0] && i <= s[1]; w.classList.toggle('is-hl', !!on); w.classList.toggle('is-first', !!(on && i === s[0])); w.classList.toggle('is-last', !!(on && i === s[1])); w.classList.remove('is-trace', 'is-faint', 'is-sign'); });
    var g = this._wrap.querySelector('.af-card .af-gap'); if (g) { var t = s ? AtlasFactFilesCore.words(r, s) : ''; g.textContent = t || ' '; g.classList.toggle('is-empty', !t); g.classList.remove('is-amber'); }
    var pen = this._wrap.querySelector('.af-pen'); if (pen) pen.classList.toggle('is-on', !!s);
  },
  _wordAt: function (x, y) { var el = document.elementFromPoint(x, y); while (el && el !== this._wrap && !(el.classList && el.classList.contains('af-w'))) el = el.parentNode; return el && el.classList && el.classList.contains('af-w') ? +el.getAttribute('data-i') : null; },
  _bindText: function (txt) {
    var self = this;
    txt.addEventListener('pointerdown', function (ev) {
      if (!self._free() || (ev.button !== undefined && ev.button !== 0)) return;
      var i = self._wordAt(ev.clientX, ev.clientY); if (i === null) return;
      ev.preventDefault(); try { txt.setPointerCapture(ev.pointerId); } catch (e) {}
      self._anchor = i; self._sel = [i, i]; self._view = {}; self.api.sound(880); self._paintSel(txt);
      /* while the pen moves, only the stripe and the card gap change — the words stay the same nodes, so the pointer capture holds */
      var move = function (e) { var j = self._wordAt(e.clientX, e.clientY); if (j === null) return; var s = [Math.min(self._anchor, j), Math.max(self._anchor, j)]; if (!self._sel || s[0] !== self._sel[0] || s[1] !== self._sel[1]) { self._sel = s; self._paintSel(txt); } };
      var up = function () {
        txt.removeEventListener('pointermove', move); txt.removeEventListener('pointerup', up); txt.removeEventListener('pointercancel', up);
        var s = self._sel; self._sel = null; self._anchor = null;
        if (s) { AtlasFactFilesCore.highlight(self.st, s[0], s[1]); self.api.sound(620); }
        self._paint();
      };
      txt.addEventListener('pointermove', move); txt.addEventListener('pointerup', up); txt.addEventListener('pointercancel', up);
    });
  },

  /* ---------------- Level 2: the strips, the drawers, the claims ---------------- */
  _cover: function (r) {
    var api = this.api, c = api.el('div', 'af-top');
    c.appendChild(this._atlasBtn(r.sents.map(function (s) { return s.text; }).join(' ')));
    if (this._pics()) { var p = api.el('span', 'af-cover'); p.appendChild(this._img(r.pic)); c.appendChild(p); }
    return c;
  },
  _paintFile: function () {
    var api = this.api, self = this, st = this.st, r = st.r, C = AtlasFactFilesCore, T = this._T(), help = C.helpOf(st) || {};
    this._body.appendChild(this._cover(r));
    if (st.phase === 'sort') {
      var tray = api.el('div', 'af-tray');
      st.strips.forEach(function (i) {
        if (st.filed[i]) return;
        var b = api.el('button', 'af-strip' + (self._view.pickStrip === i ? ' is-sel' : '') + (help.strip === i && st.phase === 'sort' ? ' is-help' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'strip' + i); b.setAttribute('data-strip', i); b.textContent = r.sents[i].text; b.setAttribute('aria-label', self._t('ariaStrip', { s: r.sents[i].text }));
        b.addEventListener('click', function () { if (!self._free() || self._drag) return; self._view = { pickStrip: self._view.pickStrip === i ? null : i }; self._paint(); });
        self._bindDrag(b, function () { return 'strip:' + i; });
        tray.appendChild(b);
      });
      this._body.appendChild(tray);
    } else {
      var ci = st.claims[Math.min(st.ci, 2)], claim = r.claims[ci];
      var cl = api.el('div', 'af-claimrow');
      var cc = api.el('div', 'af-claim' + (st.done ? ' is-done' : '')); cc.textContent = st.done ? '' : claim.text; if (st.done) cc.appendChild(api.el('span', 'af-paw'));
      if (!st.done) { var cq = api.el('p', 'af-pickline'); cq.textContent = this._t('instrClaims'); this._body.appendChild(cq); }
      cl.appendChild(cc);
      if (!st.done) {
        [[true, T.file, 'in'], [false, T.tray, 'out']].forEach(function (x) {
          var b = api.el('button', 'af-judge is-' + x[2]); b.type = 'button'; b.setAttribute('data-k', 'judge-' + x[2]); b.setAttribute('data-judge', x[2]); b.textContent = x[1];
          b.addEventListener('click', function () { self._judge(x[0]); });
          cl.appendChild(b);
        });
      }
      this._body.appendChild(cl);
    }
    var drs = api.el('div', 'af-drawers');
    C.DATA.HEADINGS.forEach(function (h, k) {
      var filed = Object.keys(st.filed).filter(function (i) { return st.filed[i] === h; })[0];
      var b = api.el('button', 'af-dr' + (filed !== undefined ? ' is-full' : '') + (help.drawer === h ? ' is-help' : '') + (self._view.pickStrip !== undefined && self._view.pickStrip !== null && filed === undefined ? ' is-wait' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'drawer-' + h); b.setAttribute('data-drawer', h); b.setAttribute('aria-label', self._t('ariaDrawer', { d: T.labels[h] }));
      var lab = api.el('span', 'af-lab'); lab.textContent = T.labels[h]; b.appendChild(lab);
      var det = api.el('span', 'af-det'); det.textContent = filed !== undefined ? r.sents[filed].detail : ''; b.appendChild(det);
      b.addEventListener('click', function () { if (!self._free()) return; var i = self._view.pickStrip; if (i === undefined || i === null) return; self._file(i, h); });
      drs.appendChild(b);
    });
    this._body.appendChild(drs);
  },
  _file: function (i, h) {
    var self = this, res = AtlasFactFilesCore.file(this.st, i, h);
    if (!res) return;
    this._view = {}; this.api.sound(res.ok ? 640 : 300);
    if (this.st.done) return this._win(this._t('okFile'));
    this._paint();
    if (!res.ok) this.api.announce(this._note.textContent || '');
  },
  _judge: function (inFile) {
    if (!this._free()) return;
    var res = AtlasFactFilesCore.judge(this.st, inFile);
    if (!res) return;
    this._view = {}; this.api.sound(res.ok ? 640 : 300);
    if (this.st.done) return this._win(this._t('okFile'));
    this._paint();
  },

  /* ---------------- Level 3: the text, its sentences with a gap, the word bank ---------------- */
  _paintBank: function () {
    var api = this.api, self = this, st = this.st, r = st.r, C = AtlasFactFilesCore, help = C.helpOf(st) || {};
    this._body.appendChild(this._cover(r));
    var txt = api.el('p', 'af-ftext'); txt.textContent = r.sents.map(function (s) { return s.text; }).join(' '); this._body.appendChild(txt);
    var fr = api.el('div', 'af-frames');
    r.frames.forEach(function (f, k) {
      var placed = st.placed[k], pk = st.picks.indexOf(k);
      var b = api.el('button', 'af-frame' + (placed !== undefined ? ' is-full' : '') + (help.frame === k ? ' is-help' : '') + (pk >= 0 ? ' is-pick' : '') + (st.phase === 'pick' && !st.done ? ' is-pickable' : '') + (self._view.pickTile !== undefined && self._view.pickTile !== null && placed === undefined ? ' is-wait' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'frame' + k); b.setAttribute('data-frame', k); b.setAttribute('aria-label', self._t('ariaFrame', { n: k + 1 }));
      if (pk >= 0) { var n = api.el('span', 'af-picknum'); n.textContent = String(pk + 1); b.appendChild(n); }
      if (f.pre) b.appendChild(document.createTextNode(f.pre + ' '));
      var g = api.el('span', 'af-gap' + (placed === undefined ? ' is-empty' : '')); g.textContent = placed !== undefined ? f.answer : ' '; b.appendChild(g);
      if (f.post) b.appendChild(document.createTextNode((/^[\p{L}\p{N}]/u.test(f.post) ? ' ' : '') + f.post));
      b.addEventListener('click', function () {
        if (!self._free()) return;
        if (st.phase === 'pick') { if (C.pick(st, k)) { self._view = {}; self.api.sound(600); if (st.done) return self._win(self._t('okBank')); self._paint(); } return; }
        var t = self._view.pickTile; if (t === undefined || t === null) return; self._place(t, k);
      });
      fr.appendChild(b);
    });
    this._body.appendChild(fr);
    if (st.phase === 'fill') {
      var bank = api.el('div', 'af-bank');
      st.tiles.forEach(function (t) {
        if (Object.keys(st.placed).some(function (f) { return st.placed[f] === t; })) return;
        var b = api.el('button', 'af-tile' + (self._view.pickTile === t ? ' is-sel' : ''));
        b.type = 'button'; b.setAttribute('data-k', 'tile' + t); b.setAttribute('data-tile', t); b.textContent = C.tileText(r, t); b.setAttribute('aria-label', self._t('ariaTile', { w: C.tileText(r, t) }));
        b.addEventListener('click', function () { if (!self._free() || self._drag) return; self._view = { pickTile: self._view.pickTile === t ? null : t }; self._paint(); });
        self._bindDrag(b, function () { return 'tile:' + t; });
        bank.appendChild(b);
      });
      this._body.appendChild(bank);
    }
    if (st.phase === 'pick' || st.done) { var hp = api.el('p', 'af-pickline'); hp.textContent = st.done ? '' : this._t('instrPick'); if (!st.done) this._body.appendChild(hp); }
    if (st.done) { var sm = api.el('div', 'af-summary'); C.summary(st).forEach(function (s) { var p = api.el('p', 'af-sline'); p.textContent = s; sm.appendChild(p); }); this._body.appendChild(sm); }
  },
  _place: function (t, k) {
    var res = AtlasFactFilesCore.place(this.st, t, k);
    if (!res) return;
    this._view = {}; this.api.sound(res.ok ? 640 : 300); this._paint();
    if (!res.ok) this.api.announce(this._note.textContent || '');
  },

  /* ---------------- drag (strips and tiles) ---------------- */
  _bindDrag: function (el, idOf) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      var id = idOf(); if (!id || !self._free() || (ev.button !== undefined && ev.button !== 0)) return;
      var ghost = null, sx = ev.clientX, sy = ev.clientY; try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var targets = function () { return self._wrap.querySelectorAll(id.indexOf('strip:') === 0 ? '.af-dr' : '.af-frame'); };
      var at = function (x, y) { var ss = targets(); for (var z = 0; z < ss.length; z++) { var rc = ss[z].getBoundingClientRect(); if (x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom) return ss[z]; } return null; };
      var move = function (e) {
        if (!ghost && Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 8) return;
        if (!ghost) { self._drag = {}; ghost = el.cloneNode(true); ghost.className += ' af-ghost'; ghost.style.width = Math.min(el.offsetWidth, 280) + 'px'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - 40) + 'px'; ghost.style.top = (e.clientY - 22) + 'px';
        var h = at(e.clientX, e.clientY); [].forEach.call(targets(), function (s) { s.classList.toggle('is-over', s === h); });
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (!ghost) return;
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
        var h = at(e.clientX, e.clientY);
        setTimeout(function () { self._drag = null; }, 0);
        if (h && id.indexOf('strip:') === 0) self._file(+id.slice(6), h.getAttribute('data-drawer'));
        else if (h) self._place(+id.slice(5), +h.getAttribute('data-frame'));
        else self._paint();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  },
  _onKey: function (ev) {
    var st = this.st, k = ev.key, C = AtlasFactFilesCore;
    if (st.level !== 'find' || ev.target !== this._wrap) return;
    var n = st.r.toks.length;
    if (k === 'ArrowRight' || k === 'ArrowLeft') {
      ev.preventDefault(); var d = k === 'ArrowRight' ? 1 : -1;
      if (this._cur === null || this._cur === undefined) this._cur = st.sel ? st.sel[1] : 0; else this._cur = Math.max(0, Math.min(n - 1, this._cur + d));
      if (ev.shiftKey) { var a = st.sel ? (this._cur > st.sel[0] ? st.sel[0] : st.sel[1]) : this._cur; C.highlight(st, a, this._cur); } else C.highlight(st, this._cur, this._cur);
      this._view = {}; this._paint(); return;
    }
    if (k === 'Enter') { ev.preventDefault(); this._check(); return; }
    if (k === 'Escape') { ev.preventDefault(); if (C.clearSel(st)) { this._view = {}; this._paint(); } }
  },

  /* ---------------- check (Level 1) and win ---------------- */
  _free: function () { return !(this._busy || this.st.done); },
  _check: function () {
    if (!this._free() || this.st.level !== 'find') return;
    var self = this, st = this.st, C = AtlasFactFilesCore, res = C.check(st);
    if (res.reason === 'empty') { this.api.sound(460); this._view = {}; this._paint(); return; }
    if (res.ok) return this._win(this._t('okFind', { card: res.card }), true);
    this._busy = true; this.api.sound(300);
    var sel = st.sel; this._view = { reading: true }; this._paint();
    this._later(function () { C.clearSel(st); st.show = true; self._busy = false; self.api.sound(196); self._view = { trace: sel }; self._paint(); self.api.announce(self._note.textContent || ''); }, this._ms(this.MISS_MS));
  },
  _win: function (msg, card) {
    var self = this, pa = this._pa || {};
    pa.msg = msg; this._busy = true; this._view = { msg: msg, roll: true };
    this.api.sound(659); this._later(function () { self.api.sound(784); }, this._ms(110)); this._later(function () { self.api.sound(1046); }, this._ms(220));
    this._paint();
    this._later(function () { self._busy = false; if (card) self._drawer++; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var afCssDone = false;
function injectAtlasCSS() {
  if (afCssDone || typeof document === 'undefined') return;
  afCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', D = 'var(--lcs-font-display,\'Baloo 2\',sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.af-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;--af-ink:#2A2A35;--af-teal:#146B5E;--af-coral:#F2784B;--af-cream:#FFF8EC;--af-gold:#E8B83A;--af-hl:#FFE45C;--af-manila:#F3DDA4;user-select:none;-webkit-user-select:none;}'
  + '.af-wrap:focus{outline:none;} .af-body{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  + '.af-top{display:flex;align-items:center;gap:12px;width:100%;}'
  + '.af-atlas{flex:none;width:var(--af-atlas);height:var(--af-atlas);padding:0;border:0;background:transparent;cursor:pointer;}'
  + '.af-atlas .af-img{width:var(--af-atlas);height:var(--af-atlas);object-fit:contain;display:block;} .af-atlas.is-roll .af-img{animation:afRoll .9s ease;}'
  + '.af-qtab{flex:1;min-width:0;display:flex;align-items:center;gap:10px;min-height:52px;padding:6px 14px 6px 8px;border-radius:14px 14px 4px 4px;background:#E6F2EF;box-shadow:inset 0 0 0 3px var(--af-teal);}'
  + '.af-qmark{flex:none;width:34px;height:34px;border-radius:50%;background:var(--af-teal);color:#fff;font-family:' + D + ';font-weight:800;font-size:22px;line-height:34px;text-align:center;}'
  + '.af-q{font-family:' + B + ';font-weight:800;font-size:22px;line-height:1.25;color:var(--af-ink);}'
  /* the fact card */
  + '.af-fact{position:relative;display:flex;align-items:center;gap:16px;padding:14px 46px 14px 28px;border-radius:14px;background:var(--af-cream);box-shadow:inset 0 0 0 3px var(--af-ink),0 4px 0 #D8C9A6;}'
  + '.af-fact::before{content:"";position:absolute;left:9px;top:16px;bottom:16px;width:8px;background:radial-gradient(circle,#D8C9A6 3px,transparent 3.5px) 0 0/8px 22px repeat-y;}'
  + '.af-factpic{flex:none;width:var(--af-pic);height:var(--af-pic);} .af-factpic .af-img{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.af-text{flex:1;margin:0;font-family:' + B + ';font-weight:700;font-size:var(--af-text);line-height:max(1.75em,44px);color:var(--af-ink);touch-action:none;cursor:text;}'
  + '.af-w{position:relative;display:inline-block;padding:2px 1px;border-radius:3px;transition:background .12s;}'
  + '.af-w.is-hl{background:var(--af-hl);box-shadow:-3px 0 0 var(--af-hl),3px 0 0 var(--af-hl);} .af-w.is-hl.is-first{border-radius:8px 3px 3px 8px;} .af-w.is-hl.is-last{border-radius:3px 8px 8px 3px;}'
  + '.af-fact.is-done .af-w.is-hl{background:#CDEBDD;box-shadow:-3px 0 0 #CDEBDD,3px 0 0 #CDEBDD;} .af-w.is-peel{background:#FBE3B8 !important;box-shadow:none !important;opacity:.55;text-decoration:line-through;}'
  + '.af-w.is-trace{background:rgba(255,228,92,.28);} .af-w.is-faint{opacity:.38;} .af-w.is-sign{background:var(--af-gold);color:#fff;border-radius:6px;} .af-w.is-cur{outline:2px dashed var(--af-teal);}'
  + '.af-pen{position:absolute;right:10px;top:50%;width:22px;height:96px;margin-top:-48px;border-radius:6px;background:linear-gradient(90deg,#FFE45C,#F5CC2A);box-shadow:inset 0 0 0 2px #B79310;transform:rotate(14deg);transition:transform .2s;}'
  + '.af-pentip{position:absolute;left:3px;right:3px;top:-12px;height:14px;background:#B79310;clip-path:polygon(0 100%,100% 100%,100% 40%,0 0);} .af-pen.is-on{transform:rotate(-4deg) translateY(-6px);}'
  /* the file card and the drawer */
  + '.af-filerow{display:flex;align-items:stretch;gap:10px;}'
  + '.af-card{position:relative;flex:1;min-height:76px;padding:12px 46px 12px 16px;border:0;border-radius:6px 14px 14px 14px;background:var(--af-manila);box-shadow:inset 0 0 0 3px #B99A55,0 4px 0 #C9AC6A;font-family:' + B + ';font-weight:800;font-size:22px;line-height:1.4;color:var(--af-ink);text-align:left;cursor:pointer;}'
  + '.af-card.is-ok{box-shadow:inset 0 0 0 4px var(--af-teal),0 4px 0 #C9AC6A;} .af-card.is-wrong{animation:afShake .4s ease;}'
  + '.af-gap{display:inline;padding:0 6px;-webkit-box-decoration-break:clone;box-decoration-break:clone;border-bottom:3px solid var(--af-ink);border-radius:4px;background:rgba(255,255,255,.55);} .af-gap.is-empty{display:inline-block;min-width:90px;background:transparent;} .af-gap.is-amber{background:#FBD7A0;}'
  + '.af-paw{position:absolute;right:10px;top:10px;width:28px;height:28px;border-radius:50%;background:var(--af-gold);box-shadow:0 0 0 3px #fff;}'
  + '.af-drawer{flex:none;width:64px;display:flex;flex-direction:column-reverse;gap:3px;padding:6px;border-radius:8px;background:#C9AC6A;box-shadow:inset 0 0 0 3px #8B7134;}'
  + '.af-slip{display:block;height:5px;border-radius:2px;background:var(--af-manila);}'
  /* level 2 */
  + '.af-cover{flex:none;width:var(--af-cover);height:var(--af-cover);} .af-cover .af-img{width:100%;height:100%;object-fit:contain;display:block;}'
  + '.af-tray{display:flex;flex-direction:column;gap:8px;}'
  + '.af-strip{min-height:52px;padding:8px 14px;border:0;border-radius:10px;background:var(--af-cream);box-shadow:inset 0 0 0 3px var(--af-ink),0 3px 0 #D8C9A6;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.3;color:var(--af-ink);text-align:left;cursor:grab;touch-action:none;}'
  + '.af-strip.is-sel{box-shadow:inset 0 0 0 4px var(--af-teal),0 3px 0 #D8C9A6;background:#EAF6F3;} .af-strip.is-help{box-shadow:inset 0 0 0 4px var(--af-gold),0 0 0 4px rgba(232,184,58,.45);}'
  + '.af-drawers{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;}'
  + '.af-dr{min-height:84px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:6px;padding:8px 6px;border:0;border-radius:8px 8px 12px 12px;background:#C9AC6A;box-shadow:inset 0 0 0 3px #8B7134,0 3px 0 #8B7134;cursor:pointer;}'
  + '.af-lab{font-family:' + D + ';font-weight:700;font-size:16px;line-height:1.1;color:#fff;text-shadow:0 1px 0 #6B551F;text-align:center;}'
  + '.af-det{display:block;min-height:1.2em;width:100%;padding:3px 4px;border-radius:5px;background:var(--af-manila);font-family:' + B + ';font-weight:800;font-size:15px;line-height:1.2;color:var(--af-ink);text-align:center;}'
  + '.af-dr:not(.is-full) .af-det{background:rgba(0,0,0,.12);} .af-dr.is-full{box-shadow:inset 0 0 0 3px var(--af-teal),0 3px 0 #8B7134;}'
  + '.af-dr.is-help{box-shadow:inset 0 0 0 4px var(--af-gold),0 0 0 5px rgba(232,184,58,.55);} .af-dr.is-over,.af-frame.is-over{box-shadow:inset 0 0 0 4px var(--af-gold);} .af-dr.is-wait,.af-frame.is-wait{animation:afWait 1.2s ease-in-out infinite;}'
  + '.af-claimrow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;}'
  + '.af-claim{position:relative;flex:1 1 100%;padding-right:46px !important;min-height:56px;display:flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px var(--af-ink);font-family:' + B + ';font-weight:800;font-size:21px;color:var(--af-ink);text-align:center;}'
  + '.af-judge{min-height:52px;padding:0 18px;border:0;border-radius:12px;font-family:' + D + ';font-weight:700;font-size:19px;cursor:pointer;}'
  + '.af-judge.is-in{background:var(--af-manila);box-shadow:inset 0 0 0 3px #8B7134,0 3px 0 #8B7134;color:var(--af-ink);} .af-judge.is-out{background:#EDEDF2;box-shadow:inset 0 0 0 3px #8E8E9C,0 3px 0 #8E8E9C;color:var(--af-ink);}'
  /* level 3 */
  + '.af-ftext{margin:0;padding:10px 14px;border-radius:12px;background:var(--af-cream);box-shadow:inset 0 0 0 2px #D8C9A6;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.5;color:var(--af-ink);}'
  + '.af-frames{display:flex;flex-direction:column;gap:7px;}'
  + '.af-frame{position:relative;min-height:48px;padding:6px 42px 6px 12px;border:0;border-radius:10px;background:var(--af-manila);box-shadow:inset 0 0 0 3px #B99A55;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.35;color:var(--af-ink);text-align:left;cursor:pointer;}'
  + '.af-frame.is-full{box-shadow:inset 0 0 0 3px var(--af-teal);} .af-frame.is-help{box-shadow:inset 0 0 0 4px var(--af-gold),0 0 0 5px rgba(232,184,58,.5);} .af-frame.is-pickable{box-shadow:inset 0 0 0 3px var(--af-teal),0 3px 0 #C9AC6A;} .af-frame.is-pick{background:#CDEBDD;}'
  + '.af-picknum{position:absolute;right:8px;top:50%;width:26px;height:26px;margin-top:-13px;border-radius:50%;background:var(--af-teal);color:#fff;font-size:15px;line-height:26px;text-align:center;}'
  + '.af-bank{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
  + '.af-tile{min-height:48px;padding:0 14px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px var(--af-ink),0 3px 0 #C9B999;font-family:' + B + ';font-weight:800;font-size:18px;color:var(--af-ink);cursor:grab;touch-action:none;}'
  + '.af-tile.is-sel{box-shadow:inset 0 0 0 4px var(--af-teal),0 3px 0 #C9B999;background:#EAF6F3;}'
  + '.af-pickline{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:18px;color:var(--af-teal);}'
  + '.af-summary{padding:10px 16px;border-radius:12px;background:var(--af-manila);box-shadow:inset 0 0 0 3px var(--af-teal);} .af-sline{margin:4px 0;font-family:' + B + ';font-weight:800;font-size:19px;color:var(--af-ink);}'
  + '.af-ghost{position:fixed;z-index:50;pointer-events:none;opacity:.92;transform:rotate(-2deg);}'
  /* the row, the note */
  + '.af-row{display:flex;justify-content:flex-end;width:100%;}'
  + '.af-check{min-height:52px;min-width:136px;padding:0 26px;border:0;border-radius:14px;background:var(--af-coral);box-shadow:0 4px 0 #C55A30;color:#fff;font-family:' + D + ';font-weight:700;font-size:21px;cursor:pointer;} .af-check:disabled{opacity:.6;cursor:default;}'
  + '.af-note{min-height:1.3em;margin:0;font-family:' + B + ';font-weight:700;font-size:20px;line-height:1.35;color:#9A4A1C;text-align:center;} .af-note.is-ok{color:var(--af-teal);font-size:22px;}'
  /* narrow */
  + '.af-wrap.is-narrow{gap:8px;} .af-wrap.is-narrow .af-body{gap:8px;} .af-wrap.is-narrow .af-q{font-size:18px;} .af-wrap.is-narrow .af-qmark{width:28px;height:28px;line-height:28px;font-size:18px;}'
  + '.af-wrap.is-narrow .af-fact{flex-direction:column;align-items:flex-start;gap:6px;padding:10px 38px 10px 22px;} .af-wrap.is-narrow .af-factpic{align-self:center;} .af-wrap.is-narrow .af-pen{width:16px;height:72px;margin-top:-36px;right:8px;}'
  + '.af-wrap.is-narrow .af-card{font-size:19px;min-height:60px;padding:8px 40px 8px 12px;} .af-wrap.is-narrow .af-drawer{width:44px;} .af-wrap.is-narrow .af-gap.is-empty{min-width:60px;}'
  + '.af-wrap.is-narrow .af-strip{font-size:17px;padding:6px 10px;} .af-wrap.is-narrow .af-drawers{grid-template-columns:repeat(2,minmax(0,1fr));} .af-wrap.is-narrow .af-dr{min-height:62px;padding:6px 4px;}'
  + '.af-wrap.is-narrow .af-claim{font-size:18px;} .af-wrap.is-narrow .af-judge{font-size:17px;padding:0 12px;} .af-wrap.is-narrow .af-ftext{font-size:16px;} .af-wrap.is-narrow .af-frame{font-size:17px;} .af-wrap.is-narrow .af-tile{font-size:16px;}'
  + '.af-wrap.is-narrow .af-check{min-height:48px;min-width:118px;font-size:19px;} .af-wrap.is-narrow .af-note{font-size:17px;} .af-wrap.is-narrow .af-note.is-ok{font-size:18px;}'
  + '.af-wrap.is-tiny,.af-wrap.is-tiny .af-body{gap:6px;} .af-wrap.is-tiny .af-fact{padding:6px 34px 6px 20px;gap:2px;} .af-wrap.is-tiny .af-card{padding:6px 38px 6px 10px;min-height:52px;} .af-wrap.is-tiny .af-qtab{min-height:46px;padding:4px 10px 4px 6px;}'
  + '@keyframes afRoll{0%{transform:rotate(0)}50%{transform:translateX(18px) rotate(200deg)}100%{transform:rotate(360deg)}}'
  + '@keyframes afShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}'
  + '@keyframes afWait{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}'
  + '.af-wrap.is-fast *,.af-wrap.is-fast *::before,.af-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.af-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'af-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.AtlasFactFilesActivity = AtlasFactFilesActivity;
