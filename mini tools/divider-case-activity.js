/* =====================================================================
   divider-case-activity.js — ACTIVITY #129 of the one-by-one rebuild:
   "Cleo's Packing List" → THE DIVIDER CASE (L.1.2.b; all 11 locales).
   Model: divider-case-core.js (DividerCaseCore).
   Design: docs/activities-rebuild/designs/129-cleo-packing-list.md
   ---------------------------------------------------------------------
   The list and the packing case are one strip: every word stands over its
   part of the case, and every gap between words is a socket over a slot
   where a wall can drop. Tap a gap: a comma appears and its wall drops
   into the case (with "only when I pack" the walls wait for Pack). Pack
   reads the list and drops each thing's library picture into its pocket:
   a missing comma squashes two things into one pocket, a comma before the
   first thing leaves an empty pocket, a comma beside und/et/y/… leaves an
   empty sliver (the conjunction is a wall there); in English "and" is a
   ribbon tied to the last thing. When every pocket holds one thing the lid
   shuts, the latches click and the case joins the shelf. No timer, no score.
   Test seams: window.DividerCaseActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._gap / ._pick /
   ._unpick / ._pack / .FAST / .OK_MS.
   ===================================================================== */
var DividerCaseActivity = {
  id: 'divider-case',
  /* the drawn apparatus (the hierarchy gate): the case, its floor, walls and lid */
  apparatusClasses: ['dc-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Cleo's Packing List",de:"Cleos Packliste",fr:"Les virgules de Cléo",es:"La lista de Cleo",pt:"A lista da Cleo",it:"La lista di Cleo",nl:"Cleo's paklijst",sv:"Rankas packlista",da:"Cleos pakkeliste",no:"Cleos pakkeliste",fi:"Cleon pakkauslista"},
    instruction: {en:"Put a comma between the things in Cleo's list. Then press Pack.",de:"Setz ein Komma zwischen die Dinge in Cleos Liste. Dann drück auf Packen.",fr:"Mets une virgule entre les choses de la liste de Cléo. Puis appuie sur Ranger.",es:"Pon una coma entre las cosas de la lista de Cleo. Luego toca Empacar.",pt:"Coloque uma vírgula entre as coisas da lista da Cleo. Depois toque em Arrumar.",it:"Metti una virgola tra le cose della lista di Cleo. Poi tocca Metti in valigia.",nl:"Zet een komma tussen de dingen in de lijst van Cleo. Tik dan op Inpakken.",sv:"Sätt kommatecken mellan sakerna i Rankas lista. Tryck sedan på Packa.",da:"Sæt komma mellem tingene på Cleos liste. Tryk så på Pak.",no:"Sett komma mellom tingene på lista til Cleo. Trykk så på Pakk.",fi:"Laita pilkku Cleon listan asioiden väliin. Paina sitten Pakkaa."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Put in the commas so every thing gets its own pocket.",de:"Setz die Kommas so, dass jedes Ding sein eigenes Fach bekommt.",fr:"Mets les virgules pour que chaque chose ait sa case.",es:"Pon las comas para que cada cosa tenga su propio hueco.",pt:"Coloque as vírgulas para cada coisa ter o seu espaço.",it:"Metti le virgole perché ogni cosa abbia il suo scomparto.",nl:"Zet de komma's zo dat elk ding een eigen vakje krijgt.",sv:"Sätt ut kommatecknen så att varje sak får ett eget fack.",da:"Sæt kommaerne, så hver ting får sit eget rum.",no:"Sett kommaene slik at hver ting får sitt eget rom.",fi:"Laita pilkut niin, että jokainen asia saa oman lokeron."},
    t2: {en:"Pick three or four things for Cleo's list. Then put in the commas.",de:"Wähl drei oder vier Dinge für Cleos Liste. Dann setz die Kommas.",fr:"Choisis trois ou quatre choses pour la liste de Cléo. Puis mets les virgules.",es:"Elige tres o cuatro cosas para la lista de Cleo. Luego pon las comas.",pt:"Escolha três ou quatro coisas para a lista da Cleo. Depois coloque as vírgulas.",it:"Scegli tre o quattro cose per la lista di Cleo. Poi metti le virgole.",nl:"Kies drie of vier dingen voor de lijst van Cleo. Zet dan de komma's.",sv:"Välj tre eller fyra saker till Rankas lista. Sätt sedan ut kommatecknen.",da:"Vælg tre eller fire ting til Cleos liste. Sæt så kommaerne.",no:"Velg tre eller fire ting til lista til Cleo. Sett så kommaene.",fi:"Valitse kolme tai neljä asiaa Cleon listaan. Laita sitten pilkut."},
    t3: {en:"Fix Cleo's list so every thing gets its own pocket.",de:"Verbessere Cleos Liste, damit jedes Ding sein eigenes Fach bekommt.",fr:"Corrige la liste de Cléo pour que chaque chose ait sa case.",es:"Corrige la lista de Cleo para que cada cosa tenga su propio hueco.",pt:"Corrija a lista da Cleo para cada coisa ter o seu espaço.",it:"Correggi la lista di Cleo perché ogni cosa abbia il suo scomparto.",nl:"Verbeter de lijst van Cleo zodat elk ding een eigen vakje krijgt.",sv:"Rätta Rankas lista så att varje sak får ett eget fack.",da:"Ret Cleos liste, så hver ting får sit eget rum.",no:"Rett lista til Cleo slik at hver ting får sitt eget rom.",fi:"Korjaa Cleon lista niin, että jokainen asia saa oman lokeron."},
    setLevel: {en:"What to do",de:"Was du tust",fr:"Que faire",es:"Qué hacer",pt:"O que fazer",it:"Che cosa fare",nl:"Wat je doet",sv:"Vad du gör",da:"Hvad du gør",no:"Hva du gjør",fi:"Mitä teet"},
    l1: {en:"Place the commas",de:"Kommas setzen",fr:"Placer les virgules",es:"Pon las comas",pt:"Coloque as vírgulas",it:"Metti le virgole",nl:"Komma's zetten",sv:"Sätt ut kommatecken",da:"Sæt kommaer",no:"Sett komma",fi:"Laita pilkut"},
    l2: {en:"Make your own list",de:"Eigene Liste",fr:"Ta propre liste",es:"Tu propia lista",pt:"Sua própria lista",it:"La tua lista",nl:"Je eigen lijst",sv:"Din egen lista",da:"Din egen liste",no:"Din egen liste",fi:"Oma lista"},
    l3: {en:"Fix the list",de:"Liste verbessern",fr:"Corriger la liste",es:"Corrige la lista",pt:"Corrija a lista",it:"Correggi la lista",nl:"Lijst verbeteren",sv:"Rätta listan",da:"Ret listen",no:"Rett lista",fi:"Korjaa lista"},
    setLists: {en:"Lists",de:"Listen",fr:"Listes",es:"Listas",pt:"Listas",it:"Liste",nl:"Lijsten",sv:"Listor",da:"Lister",no:"Lister",fi:"Listat"},
    lists3: {en:"3 things",de:"3 Dinge",fr:"3 choses",es:"3 cosas",pt:"3 coisas",it:"3 cose",nl:"3 dingen",sv:"3 saker",da:"3 ting",no:"3 ting",fi:"3 asiaa"},
    lists4: {en:"4 things",de:"4 Dinge",fr:"4 choses",es:"4 cosas",pt:"4 coisas",it:"4 cose",nl:"4 dingen",sv:"4 saker",da:"4 ting",no:"4 ting",fi:"4 asiaa"},
    lists34: {en:"3 then 4",de:"Erst 3, dann 4",fr:"3 puis 4",es:"3 y luego 4",pt:"3 e depois 4",it:"3 e poi 4",nl:"Eerst 3, dan 4",sv:"3, sedan 4",da:"3, så 4",no:"3, så 4",fi:"Ensin 3, sitten 4"},
    setWalls: {en:"Walls",de:"Wände",fr:"Cloisons",es:"Divisiones",pt:"Divisórias",it:"Divisori",nl:"Wandjes",sv:"Väggar",da:"Vægge",no:"Vegger",fi:"Väliseinät"},
    wallsGo: {en:"Drop as I go",de:"Sofort einsetzen",fr:"Tout de suite",es:"Al poner la coma",pt:"Na hora",it:"Subito",nl:"Meteen",sv:"Direkt",da:"Med det samme",no:"Med en gang",fi:"Heti"},
    wallsPack: {en:"Only when I pack",de:"Erst beim Packen",fr:"Seulement au rangement",es:"Solo al empacar",pt:"Só ao arrumar",it:"Solo quando metto in valigia",nl:"Pas bij het inpakken",sv:"Först när jag packar",da:"Først når jeg pakker",no:"Først når jeg pakker",fi:"Vasta pakatessa"},
    pack: {en:"Pack",de:"Packen",fr:"Ranger",es:"Empacar",pt:"Arrumar",it:"Metti in valigia",nl:"Inpakken",sv:"Packa",da:"Pak",no:"Pakk",fi:"Pakkaa"},
    hintEmpty: {en:"Tap the gaps between the things to put in commas, then press Pack.",de:"Tipp auf die Lücken zwischen den Dingen, um Kommas zu setzen. Dann drück auf Packen.",fr:"Touche les espaces entre les choses pour mettre des virgules, puis appuie sur Ranger.",es:"Toca los espacios entre las cosas para poner comas y luego toca Empacar.",pt:"Toque nos espaços entre as coisas para colocar vírgulas e depois toque em Arrumar.",it:"Tocca gli spazi tra le cose per mettere le virgole, poi tocca Metti in valigia.",nl:"Tik op de ruimtes tussen de dingen om komma's te zetten. Tik dan op Inpakken.",sv:"Tryck på mellanrummen mellan sakerna för att sätta ut kommatecken. Tryck sedan på Packa.",da:"Tryk på mellemrummene mellem tingene for at sætte komma. Tryk så på Pak.",no:"Trykk på mellomrommene mellom tingene for å sette komma. Trykk så på Pakk.",fi:"Napauta asioiden välejä, niin saat pilkut. Paina sitten Pakkaa."},
    hintFew: {en:"A list needs three things or more.",de:"Eine Liste braucht drei Dinge oder mehr.",fr:"Une liste a besoin de trois choses ou plus.",es:"Una lista necesita tres cosas o más.",pt:"Uma lista precisa de três coisas ou mais.",it:"Una lista ha bisogno di tre cose o più.",nl:"Een lijst heeft drie dingen of meer nodig.",sv:"En lista behöver tre saker eller fler.",da:"En liste skal have tre ting eller flere.",no:"En liste trenger tre ting eller flere.",fi:"Listaan tarvitaan kolme asiaa tai enemmän."},
    missSquash: {en:"Two things are squashed in one pocket. Which gap needs a comma?",de:"Zwei Dinge sind in ein Fach gequetscht. Welche Lücke braucht ein Komma?",fr:"Deux choses sont serrées dans une seule case. Quel espace a besoin d’une virgule ?",es:"Dos cosas quedaron apretadas en un solo hueco. ¿Qué espacio necesita una coma?",pt:"Duas coisas ficaram apertadas no mesmo espaço. Que espaço precisa de uma vírgula?",it:"Due cose sono schiacciate in uno scomparto. Quale spazio ha bisogno di una virgola?",nl:"Twee dingen zijn samen in één vakje geperst. Welke ruimte heeft een komma nodig?",sv:"Två saker trängs i samma fack. Vilket mellanrum behöver ett kommatecken?",da:"To ting er klemt sammen i ét rum. Hvilket mellemrum skal have et komma?",no:"To ting er klemt sammen i ett rom. Hvilket mellomrom trenger et komma?",fi:"Kaksi asiaa on puristettu samaan lokeroon. Mihin väliin tarvitaan pilkku?"},
    missLead: {en:"The first pocket is empty. No comma comes before the first thing.",de:"Das erste Fach ist leer. Vor dem ersten Ding steht kein Komma.",fr:"La première case est vide. Il n’y a pas de virgule avant la première chose.",es:"El primer hueco está vacío. No va coma antes de la primera cosa.",pt:"O primeiro espaço está vazio. Não vai vírgula antes da primeira coisa.",it:"Il primo scomparto è vuoto. Davanti alla prima cosa non va la virgola.",nl:"Het eerste vakje is leeg. Voor het eerste ding komt geen komma.",sv:"Det första facket är tomt. Det ska inte stå något kommatecken före den första saken.",da:"Det første rum er tomt. Der skal ikke være komma før den første ting.",no:"Det første rommet er tomt. Det skal ikke være komma før den første tingen.",fi:"Ensimmäinen lokero on tyhjä. Ensimmäisen asian eteen ei tule pilkkua."},
    missBeside: {en:"“{and}” already keeps the last two apart. The comma beside it is one too many.",de:"„{and}“ trennt die letzten zwei schon. Das Komma daneben ist eins zu viel.",fr:"« {and} » sépare déjà les deux dernières choses. La virgule à côté est en trop.",es:"«{and}» ya separa las dos últimas cosas. La coma de al lado sobra.",pt:"“{and}” já separa as duas últimas coisas. A vírgula do lado está sobrando.",it:"«{and}» separa già le ultime due cose. La virgola accanto è di troppo.",nl:"‘{and}’ houdt de laatste twee al uit elkaar. De komma ernaast is te veel.",sv:"”{and}” skiljer redan de två sista åt. Kommatecknet bredvid är ett för mycket.",da:"”{and}” holder allerede de to sidste ting adskilt. Kommaet ved siden af er ét for meget.",no:"«{and}» holder allerede de to siste tingene fra hverandre. Kommaet ved siden av er ett for mye.",fi:"”{and}” erottaa jo kaksi viimeistä. Sen vieressä oleva pilkku on liikaa."},
    missEnLast: {en:"In English, a comma goes before “and” too.",de:"Vor „und“ steht kein Komma: „und“ trennt die letzten zwei schon.",fr:"Pas de virgule devant « et » : « et » sépare déjà les deux dernières choses.",es:"Antes de «y» no va coma: «y» ya separa las dos últimas cosas.",pt:"Antes do “e” não vai vírgula: o “e” já separa as duas últimas coisas.",it:"Prima della «e» non va la virgola: la «e» separa già le ultime due cose.",nl:"Voor ‘en’ komt geen komma: ‘en’ houdt de laatste twee al uit elkaar.",sv:"Före ”och” står inget kommatecken: ”och” skiljer redan de två sista åt.",da:"Før ”og” står der intet komma: ”og” holder allerede de to sidste adskilt.",no:"Før «og» står det ikke komma: «og» holder allerede de to siste fra hverandre.",fi:"Ennen sanaa ”ja” ei tule pilkkua: ”ja” erottaa jo kaksi viimeistä."},
    missAfterConj: {en:"“{and}” and its thing stay together. No comma after “{and}”.",de:"Nach „{and}“ steht kein Komma: „{and}“ gehört zu seinem Ding.",fr:"Pas de virgule après « {and} » : « {and} » reste avec sa chose.",es:"Después de «{and}» no va coma: «{and}» va junto a su cosa.",pt:"Depois do “{and}” não vai vírgula: o “{and}” fica junto da sua coisa.",it:"Dopo «{and}» non va la virgola: «{and}» resta con la sua cosa.",nl:"Na ‘{and}’ komt geen komma: ‘{and}’ hoort bij zijn ding.",sv:"Efter ”{and}” står inget kommatecken: ”{and}” hör ihop med sin sak.",da:"Efter ”{and}” står der intet komma: ”{and}” hører sammen med sin ting.",no:"Etter «{and}» står det ikke komma: «{and}» hører sammen med tingen sin.",fi:"Sanan ”{and}” jälkeen ei tule pilkkua: ”{and}” kuuluu yhteen asiansa kanssa."},
    missGlow: {en:"Look at the glowing gaps.",de:"Schau dir die leuchtenden Lücken an.",fr:"Regarde les espaces qui brillent.",es:"Mira los espacios que brillan.",pt:"Olhe os espaços que brilham.",it:"Guarda gli spazi che brillano.",nl:"Kijk naar de ruimtes die oplichten.",sv:"Titta på mellanrummen som lyser.",da:"Se på de mellemrum, der lyser.",no:"Se på mellomrommene som lyser.",fi:"Katso hehkuvia välejä."},
    okPacked: {en:"Packed! {s}",de:"Gepackt! {s}",fr:"C’est rangé ! {s}",es:"¡Empacado! {s}",pt:"Arrumado! {s}",it:"Fatto! {s}",nl:"Ingepakt! {s}",sv:"Packat! {s}",da:"Pakket! {s}",no:"Pakket! {s}",fi:"Pakattu! {s}"},
    okOwn: {en:"Packed! {s} Your own list: every thing has its own pocket!",de:"Gepackt! {s} Deine eigene Liste: Jedes Ding hat sein eigenes Fach!",fr:"C’est rangé ! {s} Ta propre liste : chaque chose a sa case !",es:"¡Empacado! {s} Tu propia lista: ¡cada cosa tiene su hueco!",pt:"Arrumado! {s} Sua própria lista: cada coisa tem o seu espaço!",it:"Fatto! {s} La tua lista: ogni cosa ha il suo scomparto!",nl:"Ingepakt! {s} Je eigen lijst: elk ding heeft een eigen vakje!",sv:"Packat! {s} Din egen lista: varje sak har ett eget fack!",da:"Pakket! {s} Din egen liste: hver ting har sit eget rum!",no:"Pakket! {s} Din egen liste: hver ting har sitt eget rom!",fi:"Pakattu! {s} Oma listasi: jokaisella asialla on oma lokeronsa!"},
    aGap: {en:"Gap after {w}",de:"Lücke nach {w}",fr:"Espace après {w}",es:"Espacio después de {w}",pt:"Espaço depois de {w}",it:"Spazio dopo {w}",nl:"Ruimte na {w}",sv:"Mellanrum efter {w}",da:"Mellemrum efter {w}",no:"Mellomrom etter {w}",fi:"Väli sanan {w} jälkeen"},
    aBack: {en:"{w}: back to the shelf",de:"{w}: zurück ins Regal",fr:"{w} : retour sur l’étagère",es:"{w}: regresar al estante",pt:"{w}: voltar para a prateleira",it:"{w}: torna sullo scaffale",nl:"{w}: terug naar de plank",sv:"{w}: tillbaka till hyllan",da:"{w}: tilbage på hylden",no:"{w}: tilbake på hylla",fi:"{w}: takaisin hyllylle"},
    aPick: {en:"{w}: put it in the list",de:"{w}: in die Liste",fr:"{w} : dans la liste",es:"{w}: a la lista",pt:"{w}: para a lista",it:"{w}: nella lista",nl:"{w}: in de lijst",sv:"{w}: till listan",da:"{w}: på listen",no:"{w}: på lista",fi:"{w}: listaan"},
    aPack: {en:"Pack the case",de:"Den Koffer packen",fr:"Ranger la valise",es:"Empacar la maleta",pt:"Arrumar a mala",it:"Metti in valigia",nl:"De koffer inpakken",sv:"Packa väskan",da:"Pak kufferten",no:"Pakk kofferten",fi:"Pakkaa laukku"},
    srIn: {en:"Comma placed",de:"Komma gesetzt",fr:"Virgule placée",es:"Coma puesta",pt:"Vírgula colocada",it:"Virgola messa",nl:"Komma gezet",sv:"Kommatecken utsatt",da:"Komma sat",no:"Komma satt",fi:"Pilkku lisätty"},
    srOut: {en:"Comma removed",de:"Komma entfernt",fr:"Virgule enlevée",es:"Coma quitada",pt:"Vírgula tirada",it:"Virgola tolta",nl:"Komma weggehaald",sv:"Kommatecken borttaget",da:"Komma fjernet",no:"Komma fjernet",fi:"Pilkku poistettu"},
  },/*STRINGS-END*/

  defaults: { level: '1', lists: '34', walls: 'go' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }] },
    { key: 'lists', type: 'choice', labelKey: 'setLists', options: [{ value: '3', labelKey: 'lists3' }, { value: '4', labelKey: 'lists4' }, { value: '34', labelKey: 'lists34' }] },
    { key: 'walls', type: 'choice', labelKey: 'setWalls', options: [{ value: 'go', labelKey: 'wallsGo' }, { value: 'pack', labelKey: 'wallsPack' }] }
  ],
  OK_MS: 500, FAST: false, STEP: 260,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {};
    this._timers = []; this._ro = null; this._view = {}; this._cases = 0;
    injectDividerCaseCSS();
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
  _loc: function () { return DividerCaseCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return DividerCaseCore.levelOf(this._setting('level')); },
  _lists: function () { return DividerCaseCore.listsOf(this._setting('lists')); },
  _key: function () { return this._loc() + '/' + this._level() + (this._level() === '1' ? '/' + this._lists() : ''); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = DividerCaseCore.rounds(this._level(), this._lists()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {}; this._cases = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = DividerCaseCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), this._lists(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._trays = P.trays; this._orderForPool = pool; if (pass > this._pass) this._cases = 0; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'dividercase.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    this.st = DividerCaseCore.newState(this._loc(), this._level(), r, this._trays && this._trays[r]);
    this._view = { note: '', ok: '', packK: null, packed: false, shut: false, drop: null };
    this._setPrompt();
  },

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
    var wrap = api.el('div', 'dc-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="dc-main"></div><div class="dc-foot"></div><div class="dc-below"></div><p class="dc-note" aria-live="polite"></p><p class="dc-sr" aria-live="polite"></p>';
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
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () { var W = this._width(), B = DividerCaseCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? 96 : B.tiny ? 56 : 64, shelf: B.wide ? 96 : 64 }; },
  _img: function (path, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.dc-sr'); if (el) el.textContent = s; },

  /* the case as shown: walls from the commas (as I go, or once packed), the conjunction's own wall; pocket states once packed */
  _shown: function () {
    var C = DividerCaseCore, st = this.st, v = this._view, n = C.items(st).length, go = this._setting('walls') !== 'pack';
    var commas = go || v.packed ? st.commas : [];
    return { n: n, res: C.pack(st.loc, Math.max(n, 2), commas), packed: v.packed, go: go };
  },
  _paint_: function () {
    var C = DividerCaseCore, st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, it = C.items(st), n = it.length, g = C.glow(st);
    this._wrap.className = 'dc-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (v.packed ? ' is-packed' : '') + ' k-' + rd.kind + ' w-' + (this._setting('walls') === 'pack' ? 'pack' : 'go') + (C.divides(st.loc) ? ' is-div' : ' is-ribbon');
    var main = this._qs('.dc-main'); main.innerHTML = ''; var below = this._qs('.dc-below'); below.innerHTML = '';
    var S = this._shown(), res = S.res, seg = res.segments, byTok = {};
    seg.forEach(function (x) { var t = x.tok; byTok[t.s != null ? 's' + t.s : t.i != null ? 'i' + t.i : 'c'] = x; });
    var pk = function (p) { var q = res.pockets[p]; if (!S.packed || !q) return ''; return q.ok ? ' p-ok' : q.empty || q.split ? ' p-empty' : ' p-squash'; };
    var bot = function (key, inner) {
      var x = byTok[key], h = '';
      if (!x) return '<span class="dc-bot dc-art"></span>';
      if (x.wall) h = '<span class="dc-h l' + pk(x.left) + '"></span><span class="dc-h r' + pk(x.right) + '"></span><i class="dc-wall dc-art' + (x.tok.c ? ' is-conj' : '') + (v.drop === key ? ' is-drop' : '') + '"></i>';
      else h = '<span class="dc-h a' + pk(x.pocket) + '"></span>' + (S.go && x.tok.s != null && !S.packed ? '<i class="dc-guide dc-art"></i>' : '');
      return '<span class="dc-bot dc-art in' + (key === 's0' ? ' first' : '') + '">' + h + (inner || '') + '</span>';
    };
    var cas = this._el('div', 'dc-case' + (v.shut ? ' is-shut' : '') + (S.packed && !st.done ? ' is-bounce' : ''));
    var unit = function () { var u = self._el('div', 'dc-u'); cas.appendChild(u); return u; };
    var word = function (u, html, cls, key, inner, btn) {
      var col = self._el('div', 'dc-col dc-wordc' + (cls ? ' ' + cls : ''));
      var top = btn ? btn : self._el('span', 'dc-word', html);
      if (btn) top.className += ' dc-word';
      col.appendChild(top); col.insertAdjacentHTML('beforeend', key ? bot(key, inner) : '<span class="dc-bot out"></span>');
      u.appendChild(col); return col;
    };
    var sock = function (u, s, after) {
      var col = self._el('div', 'dc-col dc-sockc'), on = st.commas.indexOf(s) >= 0;
      var gl = g ? (g.missing.indexOf(s) >= 0 ? ' is-missing' : g.extra.indexOf(s) >= 0 ? ' is-extra' : g.right.indexOf(s) >= 0 ? ' is-right' : '') : '';
      var b = self._btn('dc-gap' + (on ? ' is-on' : '') + gl, 'gap-' + s, self._t('aGap', { w: after }), '<span class="dc-comma">,</span>');
      b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.disabled = st.done || n < 3 || v.packK != null;
      b.addEventListener('click', function () { self._gap(s); });
      col.appendChild(self._el('span', 'dc-sp', '')); col.appendChild(b); col.insertAdjacentHTML('beforeend', bot('s' + s)); u.appendChild(col);
    };
    var pic = function (k) { var x = it[k - 1]; if (!S.packed || (v.packK != null && k > v.packK)) return ''; var q = res.pockets[byTok['i' + k].pocket], sq = q && q.squash, at = sq ? q.items.indexOf(k) : 0; /* a squashed pocket pushes its things together */
      return '<span class="dc-thing' + (sq ? ' is-squash' + (at === 0 ? ' sq-r' : at === q.items.length - 1 ? ' sq-l' : '') : '') + '">' + self._img(x.pic, D.pic, 'dc-pic') + '</span>'; };
    var reading = v.packK;
    /* the lead and its gap */
    var u0 = unit(); word(u0, esc(rd.lead), 'is-lead', null);
    if (rd.kind === 'own' && n < 3) {
      /* level 2, still picking: the things so far and empty places */
      for (var p = 0; p < Math.max(3, n); p++) {
        var up = unit();
        if (p < n) { var ii = st.picks[p], bb = this._btn('', 'item-' + ii, this._t('aBack', { w: it[p].t }), esc(it[p].t)); bb.disabled = st.done; bb.addEventListener('click', (function (x) { return function () { self._unpick(x); }; })(ii)); word(up, '', 'is-item', null, '', bb); }
        else word(up, '', 'is-blank', null);
      }
    } else {
      sock(u0, 0, rd.lead);
      for (var k = 1; k <= n; k++) {
        var u = unit(), x = it[k - 1], inner = pic(k), rcls = 'is-item' + (reading === k ? ' is-read' : '');
        if (k === n) {
          var uc = u; word(uc, esc(C.conj(st)), 'is-conj', 'c'); sock(uc, n, C.conj(st));
          u = unit();
        }
        if (rd.kind === 'own') { var ib = this._btn('', 'item-' + st.picks[k - 1], this._t('aBack', { w: x.t }), esc(x.t)); ib.disabled = st.done || v.packK != null; ib.addEventListener('click', (function (y) { return function () { self._unpick(y); }; })(st.picks[k - 1])); word(u, '', rcls, 'i' + k, inner, ib); }
        else word(u, esc(x.t), rcls, 'i' + k, inner);
        if (k < n) sock(u, k, x.t);
        else { var end = this._el('div', 'dc-col dc-endc'); end.innerHTML = '<span class="dc-word dc-stop">.</span><span class="dc-bot dc-art in last"></span>'; u.appendChild(end); }
      }
    }
    if (this._cases) { var sh = this._el('div', 'dc-cases dc-art'); for (var m = 0; m < Math.min(10, this._cases); m++) sh.insertAdjacentHTML('beforeend', '<i></i>'); cas.appendChild(sh); }
    main.appendChild(cas);
    /* a list that needs two lines breaks before the second-to-last thing (the shared phone rule) */
    var us = cas.querySelectorAll('.dc-u');
    if (n >= 3 && us.length > n && us[us.length - 1].offsetTop > us[0].offsetTop + 4) { cas.insertBefore(this._el('div', 'dc-br', ''), us[n - 1]); us[n - 2].classList.add('line-end'); us[n - 1].classList.add('line-start'); }
    /* level 2: the shelf */
    if (rd.kind === 'own') {
      var shelf = this._el('div', 'dc-shelf');
      rd.order.forEach(function (i) {
        var q = rd.shelf[i], used = st.picks.indexOf(i) >= 0;
        var b = self._btn('dc-shelfb' + (used ? ' is-used' : ''), 'pick-' + i, self._t('aPick', { w: q.t }), self._img(q.pic, D.shelf, 'dc-shelfimg') + '<span>' + esc(q.t) + '</span>');
        b.disabled = st.done || used || st.picks.length >= 4 || v.packK != null; b.addEventListener('click', function () { self._pick(i); }); shelf.appendChild(b);
      });
      /* on the narrowest phones the shelf sits under Pack (the design's 320 rule) */
      (D.tiny ? below : main).appendChild(shelf);
    }
    var foot = this._qs('.dc-foot'); foot.innerHTML = '';
    var pb = this._btn('dc-pack', 'check', this._t('aPack'), '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z M8 9V6a4 4 0 0 1 8 0v3" fill="none" stroke="#FFF" stroke-width="2.6" stroke-linejoin="round"/></svg><span>' + esc(this._t('pack')) + '</span>');
    pb.disabled = st.done || v.packK != null; pb.addEventListener('click', function () { self._pack(); });
    foot.appendChild(pb);
    var note = this._qs('.dc-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'dc-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'dc-note is-hint'; }
    else { note.textContent = ''; note.className = 'dc-note'; }
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.packK = null; this._view.packed = false; this._view.drop = null; },
  _gap: function (s) {
    var r = DividerCaseCore.toggle(this.st, s); if (r === 'no') return;
    this._moved(); this._view.drop = r === 'in' ? 's' + s : null;
    this.api.sound(r === 'in' ? 300 : 520); this._paint();
    this._sr(this._t(r === 'in' ? 'srIn' : 'srOut'));
  },
  _pick: function (i) { var r = DividerCaseCore.pick(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(560); this._paint(); },
  _unpick: function (i) { var r = DividerCaseCore.unpick(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(340); this._paint(); },
  _pack: function () {
    var C = DividerCaseCore, st = this.st, v = this._view, self = this; if (st.done || v.packK != null) return;
    this._clearTimers(); v.drop = null;
    var res = C.check(st);
    if (res.result === 'empty' || res.result === 'few') { v.ok = ''; v.note = this._t(C.hint(st)); v.packed = false; this.api.sound(400); this._paint(); this.api.announce(v.note); return; }
    var n = C.items(st).length, ms = this.FAST ? 0 : this.STEP;
    var finish = function () {
      v.packK = null;
      if (res.result === 'ok') { self._success(); return; }
      v.ok = ''; v.note = self._t(C.hint(st), { and: C.conj(st) }); self.api.sound(200); self._paint(); self.api.announce(v.note);
    };
    v.packed = true; v.note = ''; v.ok = '';
    if (!ms) { finish(); return; }
    v.packK = 0; this._paint();
    for (var k = 1; k <= n; k++) (function (j) { self._later(function () { if (self.st !== st) return; v.packK = j; self.api.sound(420 + j * 50); self._paint(); }, j * ms); })(k);
    this._later(function () { if (self.st === st) finish(); }, (n + 1) * ms);
  },
  _success: function () {
    var C = DividerCaseCore, st = this.st, v = this._view, s = C.sentence(st), msg = this._t(C.okKey(st), { s: s });
    v.packed = true; v.shut = true; v.note = ''; v.ok = msg; this._cases++;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: s, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectDividerCaseCSS() {
  if (typeof document === 'undefined' || document.getElementById('dc-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2A2A35';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.dc-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .dc-wrap:focus{outline:none;}'
  + '.dc-main{display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the case: the words over the case, one column per word and per gap */
  + '.dc-case{position:relative;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;row-gap:12px;padding:14px 8px 10px;border-radius:14px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #E2D2AE;}'
  + '.dc-u{display:flex;align-items:stretch;}'
  + '.dc-col{position:relative;display:flex;flex-direction:column;align-items:stretch;}'
  + '.dc-word{display:flex;align-items:center;justify-content:center;height:48px;padding:0 6px;font-family:' + H + ';font-weight:800;font-size:26px;line-height:1;color:' + INK + ';white-space:nowrap;}'
  + 'button.dc-word{margin:0;border:0;border-radius:10px;background:#FFF2DC;box-shadow:inset 0 0 0 2px #E0B987;cursor:pointer;font:inherit;font-family:' + H + ';font-weight:800;font-size:26px;color:' + INK + ';min-width:44px;} button.dc-word:disabled{cursor:default;}'
  + '.dc-wordc.is-lead .dc-word{color:#4B4A57;} .dc-wordc.is-conj .dc-word{color:#8C4A1E;} .dc-wordc.is-blank .dc-word{width:72px;}'
  + '.dc-wordc.is-blank .dc-word::after{content:"";display:block;width:56px;height:30px;border-radius:8px;border:3px dashed #D8C49C;}'
  + '.dc-wrap.is-ribbon .dc-wordc.is-conj .dc-word::after{content:"";position:absolute;left:8px;right:-34px;top:40px;height:4px;border-radius:2px;background:#F2784B;}'
  + '.dc-wordc.is-read .dc-word{background:#FFE9A6;border-radius:10px;}'
  + '.dc-stop{padding:0 2px;width:14px;}'
  /* the gap: the comma socket */
  + '.dc-sockc{width:28px;} .dc-sp{display:block;height:48px;} .dc-br{flex-basis:100%;height:0;}'
  + '.dc-gap{position:absolute;z-index:3;left:50%;top:2px;width:44px;height:44px;margin-left:-22px;padding:0;border:0;border-radius:10px;background:transparent;cursor:pointer;}'
  + '.dc-gap::before{content:"";position:absolute;left:14px;right:14px;bottom:6px;border-bottom:3px dotted #C9A877;}'
  + '.dc-gap .dc-comma{display:block;text-align:left;padding-left:3px;font-family:' + H + ';font-weight:800;font-size:34px;line-height:44px;color:#E0663A;opacity:0;transform:translateY(-6px);transition:opacity .12s,transform .12s;}'
  + '.dc-gap.is-on .dc-comma{opacity:1;transform:none;} .dc-gap.is-on::before{opacity:0;} .dc-gap:disabled{cursor:default;}'
  + '.dc-gap.is-missing .dc-comma{opacity:.45;color:#2E8C7E;animation:dcGhost 1s ease-in-out infinite;} .dc-gap.is-missing{box-shadow:0 0 0 3px rgba(46,140,126,.55);}'
  + '.dc-gap.is-extra{box-shadow:0 0 0 3px rgba(242,120,75,.75);} .dc-gap.is-extra .dc-comma{animation:dcShake .35s linear 3;} .dc-gap.is-right .dc-comma{color:#2E8C7E;}'
  + '@keyframes dcGhost{50%{opacity:.95;}} @keyframes dcShake{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}}'
  /* the case below the words */
  + '.dc-bot{position:relative;display:block;height:112px;margin-top:6px;}'
  + '.dc-bot.out{background:none;}'
  + '.dc-bot.in{background:#F6E7CF;box-shadow:inset 0 3px 0 #2A2A35,inset 0 -3px 0 #2A2A35,inset 0 -10px 0 #E8D2AE;}'
  + '.dc-bot.in.first{border-radius:12px 0 0 12px;box-shadow:inset 0 3px 0 #2A2A35,inset 0 -3px 0 #2A2A35,inset 3px 0 0 #2A2A35,inset 0 -10px 0 #E8D2AE;}'
  + '.dc-bot.in.last{border-radius:0 12px 12px 0;box-shadow:inset 0 3px 0 #2A2A35,inset 0 -3px 0 #2A2A35,inset -3px 0 0 #2A2A35,inset 0 -10px 0 #E8D2AE;}'
  + '.dc-h{position:absolute;top:3px;bottom:3px;} .dc-h.a{left:0;right:0;} .dc-h.l{left:0;right:50%;} .dc-h.r{left:50%;right:0;}'
  + '.dc-h.p-ok{background:rgba(46,140,126,.16);} .dc-h.p-squash{background:rgba(242,120,75,.28);} .dc-h.p-empty{background:repeating-linear-gradient(135deg,rgba(60,45,30,.55) 0 5px,rgba(60,45,30,.25) 5px 10px);}'
  + '.dc-wall{position:absolute;z-index:2;left:50%;top:-6px;bottom:0;width:8px;margin-left:-4px;border-radius:3px;background:#8C5A2B;box-shadow:inset 0 0 0 2px #5E3A18;}'
  + '.dc-wall.is-drop{animation:dcDrop .2s ease-in;} @keyframes dcDrop{0%{transform:translateY(-40px);opacity:.3;}100%{transform:none;opacity:1;}}'
  + '.dc-wall.is-conj{background:#B07A45;}'
  + '.dc-u.line-end > .dc-col:last-child .dc-bot.in{border-radius:0 12px 12px 0;box-shadow:inset 0 3px 0 #2A2A35,inset 0 -3px 0 #2A2A35,inset -3px 0 0 #2A2A35,inset 0 -10px 0 #E8D2AE;} .dc-u.line-start > .dc-col:first-child .dc-bot.in{border-radius:12px 0 0 12px;box-shadow:inset 0 3px 0 #2A2A35,inset 0 -3px 0 #2A2A35,inset 3px 0 0 #2A2A35,inset 0 -10px 0 #E8D2AE;}'
  + '.dc-guide{position:absolute;left:50%;top:10px;bottom:12px;border-left:2px dotted rgba(140,90,43,.35);}'
  + '.dc-thing{position:absolute;z-index:1;left:50%;bottom:10px;transform:translateX(-50%);animation:dcFall .24s ease-out;} @keyframes dcFall{0%{transform:translate(-50%,-50px);opacity:0;}100%{transform:translateX(-50%);opacity:1;}}'
  + '.dc-thing.is-squash{transform:translateX(-50%) scale(.8) rotate(-6deg);animation:none;} .dc-thing.is-squash.sq-r{transform:translateX(-18%) scale(.8) rotate(8deg);} .dc-thing.is-squash.sq-l{transform:translateX(-82%) scale(.8) rotate(-8deg);} .dc-pic{display:block;object-fit:contain;}'
  + '.dc-wordc.is-item{min-width:96px;}'
  /* the lid (success) */
  + '.dc-case.is-shut .dc-bot.in::after{content:"";position:absolute;z-index:2;left:0;right:0;top:0;height:16px;background:#C98A4B;box-shadow:inset 0 0 0 2px #5E3A18;animation:dcLid .35s ease-in;} @keyframes dcLid{0%{transform:translateY(-30px);opacity:0;}}'
  + '.dc-case.is-shut .dc-bot.in.first::before,.dc-case.is-shut .dc-bot.in.last::before{content:"";position:absolute;z-index:3;top:10px;width:14px;height:16px;border-radius:3px;background:#F4CF62;box-shadow:inset 0 0 0 2px #8C6239;} .dc-case.is-shut .dc-bot.in.first::before{left:6px;} .dc-case.is-shut .dc-bot.in.last::before{right:6px;}'
  + '.dc-case.is-bounce .dc-bot.in{animation:dcThump .4s ease-out;} @keyframes dcThump{30%{transform:translateY(3px);}}'
  + '.dc-cases{position:absolute;right:10px;top:6px;display:flex;gap:3px;} .dc-cases i{display:block;width:14px;height:10px;border-radius:3px;background:#C98A4B;box-shadow:inset 0 0 0 2px #5E3A18;}'
  /* the shelf (level 2) */
  + '.dc-shelf{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:8px;border-radius:12px;background:#EFE3C8;box-shadow:inset 0 0 0 3px #D9C29A;}'
  + '.dc-shelfb{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 4px;border:0;border-radius:12px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #C9B48E;cursor:pointer;font-family:' + B + ';font-weight:800;font-size:16px;color:' + INK + ';} .dc-shelfb:disabled{cursor:default;} .dc-shelfb.is-used{opacity:.35;} .dc-shelfimg{display:block;object-fit:contain;}'
  + '.dc-shelfb span{max-width:100%;overflow-wrap:anywhere;text-align:center;line-height:1.15;}'
  + '.dc-foot{display:flex;justify-content:center;} .dc-pack{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;box-shadow:0 5px 0 #0E4A41;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .dc-pack:disabled{opacity:.5;cursor:default;}'
  + '.dc-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .dc-note.is-hint{color:#9A3D1C;}'
  + '.dc-below:empty{display:none;} .dc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.dc-wrap.is-narrow,.dc-wrap.is-narrow .dc-main{gap:9px;} .dc-wrap.is-narrow .dc-case{padding:10px 4px 8px;row-gap:8px;}'
  + '.dc-wrap.is-narrow .dc-word,.dc-wrap.is-narrow button.dc-word{height:44px;font-size:20px;padding:0 4px;} .dc-wrap.is-narrow .dc-sockc{width:22px;} .dc-wrap.is-narrow .dc-wordc.is-item{min-width:64px;}'
  + '.dc-wrap.is-narrow .dc-sp{height:44px;} .dc-wrap.is-narrow .dc-gap{top:0;} .dc-wrap.is-narrow .dc-gap .dc-comma{font-size:28px;}'
  + '.dc-wrap.is-narrow .dc-bot{height:78px;margin-top:4px;} .dc-wrap.is-narrow .dc-wrap.is-ribbon .dc-wordc.is-conj .dc-word::after{top:36px;}'
  + '.dc-wrap.is-narrow .dc-shelf{gap:6px;padding:6px;} .dc-wrap.is-narrow .dc-shelfb{font-size:14px;padding:4px 2px;}'
  + '.dc-wrap.is-narrow .dc-pack{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .dc-wrap.is-narrow .dc-note{font-size:17px;}'
  + '.dc-wrap.is-tiny .dc-word,.dc-wrap.is-tiny button.dc-word{font-size:16px;padding:0 3px;} .dc-wrap.is-tiny .dc-sockc{width:20px;} .dc-wrap.is-tiny .dc-bot{height:64px;} .dc-wrap.is-tiny .dc-wordc.is-item{min-width:56px;} .dc-wrap.is-tiny .dc-case{padding:8px 2px 6px;row-gap:6px;}'
  /* level 2: while picking, the case is a shallow outline under the words; it opens to its full depth on Pack, and the shelf steps aside */
  + '.dc-wrap.is-tiny:not(.is-packed) .dc-bot{height:30px;} .dc-wrap.k-own:not(.is-packed) .dc-bot{height:30px;} .dc-wrap.k-own.is-packed .dc-shelf{display:none;}'
  /* a solved round on a phone: the shelf and Pack give their room to the shell's Next */
  + '.dc-wrap.is-narrow.is-done .dc-shelf,.dc-wrap.is-narrow.is-done .dc-foot{display:none;}'
  + '.dc-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.dc-wrap *{animation:none !important;transition:none !important;}}'
  + '.dc-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'dc-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.DividerCaseActivity = DividerCaseActivity;
