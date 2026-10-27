/* =====================================================================
   climbing-tree-activity.js — ACTIVITY #132 of the one-by-one rebuild:
   "Olive's Kind-Of Tree" → THE CLIMBING TREE (L.1.5.b; all 11 locales).
   Model: climbing-tree-core.js (ClimbingTreeCore).
   Design: docs/activities-rebuild/designs/132-olive-kind-of.md
   ---------------------------------------------------------------------
   The invention: a tree whose branches are kinds and whose twigs are
   kinds of that kind. The child climbs the picture from the nest at the
   roots up to a branch (tap it, or drag the picture there); in level 3 the
   branch opens its three twigs. A leaf on the trunk reads out the climb:
   "A duck is a bird that swims." Check: a wrong place cannot hold the
   picture and it slides back to the roots. No timer, no score.
   Test seams: window.ClimbingTreeActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._climb / ._twig /
   ._down / ._item / ._put / ._check / .FAST / .OK_MS.
   ===================================================================== */
var ClimbingTreeActivity = {
  id: 'climbing-tree',
  /* the drawn apparatus (the hierarchy gate): the tree, its perches, twigs, trunk, leaf and nest */
  apparatusClasses: ['ct-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"The Climbing Tree",de:"Der Kletterbaum",fr:"L’arbre à grimper",es:"El árbol para trepar",pt:"A árvore de escalar",it:"L’albero da arrampicare",nl:"De klimboom",sv:"Klätterträdet",da:"Klatretræet",no:"Klatretreet",fi:"Kiipeilypuu"},
    instruction: {en:"Read the clue. Climb the picture up to the branch where its kind lives.",de:"Lies den Hinweis. Bring das Bild auf den Ast, auf dem seine Sorte wohnt.",fr:"Lis l’indice. Fais grimper l’image jusqu’à la branche de sa catégorie.",es:"Lee la pista. Sube el dibujo a la rama donde vive su tipo.",pt:"Leia a pista. Leve a figura até o galho onde mora o tipo dela.",it:"Leggi l’indizio. Porta l’immagine sul ramo del suo gruppo.",nl:"Lees de aanwijzing. Laat het plaatje klimmen naar de tak van zijn soort.",sv:"Läs ledtråden. Klättra upp med bilden till grenen där dess sort bor.",da:"Læs ledetråden. Klatr op med billedet til grenen, hvor dets slags bor.",no:"Les hintet. Klatre opp med bildet til greinen der sorten bor.",fi:"Lue vihje. Kiipeä kuvan kanssa oksalle, jolla sen laji asuu."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Read the clue: what kind of thing is it?",de:"Lies den Hinweis: Was für ein Ding ist das?",fr:"Lis l’indice : quelle sorte de chose est-ce ?",es:"Lee la pista: ¿qué tipo de cosa es?",pt:"Leia a pista: que tipo de coisa é?",it:"Leggi l’indizio: che tipo di cosa è?",nl:"Lees de aanwijzing: wat voor ding is het?",sv:"Läs ledtråden: vad är det för sorts sak?",da:"Læs ledetråden: hvad slags ting er det?",no:"Les hintet: hva slags ting er det?",fi:"Lue vihje: millainen asia se on?"},
    t2: {en:"Put each picture on the branch of its kind.",de:"Bring jedes Bild auf den Ast seiner Sorte.",fr:"Mets chaque image sur la branche de sa catégorie.",es:"Pon cada dibujo en la rama de su tipo.",pt:"Coloque cada figura no galho do seu tipo.",it:"Metti ogni immagine sul ramo del suo tipo.",nl:"Zet elk plaatje op de tak van zijn soort.",sv:"Sätt varje bild på grenen för dess sort.",da:"Sæt hvert billede på grenen for dets slags.",no:"Sett hvert bilde på greinen for sin sort.",fi:"Vie jokainen kuva oman lajinsa oksalle."},
    t3: {en:"Climb to its kind, then to the twig that tells it apart.",de:"Klettere zu seiner Sorte, dann zu dem Zweig, der es genauer beschreibt.",fr:"Grimpe jusqu’à sa catégorie, puis jusqu’à la brindille qui la décrit le mieux.",es:"Sube a su tipo y luego a la ramita que lo distingue.",pt:"Suba até o tipo dela e depois até o raminho que a diferencia.",it:"Sali fino al suo tipo, poi fino al rametto che lo distingue.",nl:"Klim naar zijn soort en dan naar het takje dat zegt wat hem anders maakt.",sv:"Klättra till dess sort och sedan till kvisten som skiljer den från de andra.",da:"Klatr op til dets slags og så til kvisten, der skiller det fra de andre.",no:"Klatre opp til riktig sort og så til kvisten som skiller det fra de andre.",fi:"Kiipeä sen lajin oksalle ja sitten oksanhaaraan, joka erottaa sen muista."},
    setLevel: {en:"What to do",de:"Was du tust",fr:"Que faire",es:"Qué hacer",pt:"O que fazer",it:"Che cosa fare",nl:"Wat je doet",sv:"Vad du gör",da:"Hvad du gør",no:"Hva du gjør",fi:"Mitä teet"},
    l1: {en:"What kind is it?",de:"Welche Sorte ist es?",fr:"Quelle catégorie ?",es:"¿Qué tipo es?",pt:"Que tipo é?",it:"Che tipo è?",nl:"Welke soort is het?",sv:"Vilken sort är det?",da:"Hvilken slags er det?",no:"Hvilken sort er det?",fi:"Mikä laji se on?"},
    l2: {en:"Three groups",de:"Drei Gruppen",fr:"Trois catégories",es:"Tres grupos",pt:"Três grupos",it:"Tre gruppi",nl:"Drie groepen",sv:"Tre grupper",da:"Tre grupper",no:"Tre grupper",fi:"Kolme ryhmää"},
    l3: {en:"Climb to the definition",de:"Bis zur Erklärung klettern",fr:"Grimper jusqu’à la définition",es:"Sube hasta la definición",pt:"Suba até a definição",it:"Sali fino alla definizione",nl:"Klim naar de omschrijving",sv:"Klättra till förklaringen",da:"Klatr op til forklaringen",no:"Klatre opp til forklaringen",fi:"Kiipeä määritelmään"},
    setClue: {en:"The picture",de:"Das Bild",fr:"L’image",es:"El dibujo",pt:"A figura",it:"L’immagine",nl:"Het plaatje",sv:"Bilden",da:"Billedet",no:"Bildet",fi:"Kuva"},
    cluePic: {en:"Picture and clue",de:"Bild und Hinweis",fr:"Image et indice",es:"Dibujo y pista",pt:"Figura e pista",it:"Immagine e indizio",nl:"Plaatje en aanwijzing",sv:"Bild och ledtråd",da:"Billede og ledetråd",no:"Bilde og hint",fi:"Kuva ja vihje"},
    clueText: {en:"Clue only",de:"Nur der Hinweis",fr:"Seulement l’indice",es:"Solo la pista",pt:"Só a pista",it:"Solo l’indizio",nl:"Alleen de aanwijzing",sv:"Bara ledtråden",da:"Kun ledetråden",no:"Bare hintet",fi:"Vain vihje"},
    setBranches: {en:"Branches",de:"Äste",fr:"Branches",es:"Ramas",pt:"Galhos",it:"Rami",nl:"Takken",sv:"Grenar",da:"Grene",no:"Greiner",fi:"Oksat"},
    br3: {en:"Three",de:"Drei",fr:"Trois",es:"Tres",pt:"Três",it:"Tre",nl:"Drie",sv:"Tre",da:"Tre",no:"Tre",fi:"Kolme"},
    br4: {en:"Four",de:"Vier",fr:"Quatre",es:"Cuatro",pt:"Quatro",it:"Quattro",nl:"Vier",sv:"Fyra",da:"Fire",no:"Fire",fi:"Neljä"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Verifica",nl:"Controleren",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    hintClimb: {en:"Climb the picture up to the branch where it belongs.",de:"Bring das Bild auf den Ast, auf den es gehört.",fr:"Fais grimper l’image sur la branche où elle va.",es:"Sube el dibujo a la rama donde va.",pt:"Leve a figura até o galho onde ela fica.",it:"Porta l’immagine sul ramo dove va.",nl:"Laat het plaatje naar de tak klimmen waar het hoort.",sv:"Klättra upp med bilden till grenen där den hör hemma.",da:"Klatr op med billedet til grenen, hvor det hører til.",no:"Klatre opp med bildet til greinen der det hører hjemme.",fi:"Kiipeä kuvan kanssa oksalle, jolle se kuuluu."},
    hintAll: {en:"Put every picture on a branch first.",de:"Bring zuerst jedes Bild auf einen Ast.",fr:"Mets d’abord chaque image sur une branche.",es:"Primero pon cada dibujo en una rama.",pt:"Primeiro coloque cada figura num galho.",it:"Prima metti ogni immagine su un ramo.",nl:"Zet eerst elk plaatje op een tak.",sv:"Sätt först varje bild på en gren.",da:"Sæt først hvert billede på en gren.",no:"Sett først hvert bilde på en grein.",fi:"Vie ensin jokainen kuva oksalle."},
    hintTwig: {en:"Now pick the twig that tells it apart.",de:"Wähle jetzt den Zweig, der es genauer beschreibt.",fr:"Choisis maintenant la brindille qui la décrit le mieux.",es:"Ahora elige la ramita que lo distingue.",pt:"Agora escolha o raminho que a diferencia.",it:"Ora scegli il rametto che lo distingue.",nl:"Kies nu het takje dat zegt wat hem anders maakt.",sv:"Välj nu kvisten som skiljer den från de andra.",da:"Vælg nu kvisten, der skiller det fra de andre.",no:"Velg nå kvisten som skiller det fra de andre.",fi:"Valitse nyt oksanhaara, joka erottaa sen muista."},
    missBranch: {en:"That branch can't hold it. Read the clue again.",de:"Dieser Ast kann es nicht halten. Lies den Hinweis noch einmal.",fr:"Cette branche ne peut pas la porter. Relis l’indice.",es:"Esa rama no lo puede sostener. Vuelve a leer la pista.",pt:"Esse galho não consegue segurá-la. Leia a pista de novo.",it:"Quel ramo non lo regge. Rileggi l’indizio.",nl:"Die tak kan het niet dragen. Lees de aanwijzing nog eens.",sv:"Den grenen kan inte hålla den. Läs ledtråden igen.",da:"Den gren kan ikke holde det. Læs ledetråden igen.",no:"Den greinen kan ikke holde det. Les hintet igjen.",fi:"Se oksa ei kestä sitä. Lue vihje uudelleen."},
    missKind: {en:"That branch can't hold it. What kind of thing is it?",de:"Dieser Ast kann es nicht halten. Was für ein Ding ist das?",fr:"Cette branche ne peut pas la porter. Quelle sorte de chose est-ce ?",es:"Esa rama no lo puede sostener. ¿Qué tipo de cosa es?",pt:"Esse galho não consegue segurá-la. Que tipo de coisa é?",it:"Quel ramo non lo regge. Che tipo di cosa è?",nl:"Die tak kan het niet dragen. Wat voor ding is het?",sv:"Den grenen kan inte hålla den. Vad är det för sorts sak?",da:"Den gren kan ikke holde det. Hvad slags ting er det?",no:"Den greinen kan ikke holde det. Hva slags ting er det?",fi:"Se oksa ei kestä sitä. Millainen asia se on?"},
    missTwig: {en:"The right kind! But that twig is not the one that tells it apart.",de:"Die richtige Sorte! Aber dieser Zweig beschreibt es nicht.",fr:"La bonne catégorie ! Mais cette brindille ne la décrit pas.",es:"¡El tipo correcto! Pero esa ramita no es la que lo distingue.",pt:"O tipo certo! Mas esse raminho não é o que a diferencia.",it:"Il tipo giusto! Ma quel rametto non è quello che lo distingue.",nl:"De goede soort! Maar dat takje past niet bij hem.",sv:"Rätt sort! Men den kvisten är inte den som skiljer den från de andra.",da:"Den rigtige slags! Men den kvist er ikke den, der skiller det fra de andre.",no:"Riktig sort! Men den kvisten er ikke den som skiller det fra de andre.",fi:"Oikea laji! Mutta tuo oksanhaara ei erota sitä muista."},
    missGroup: {en:"Some pictures slid back down. What kind is each one?",de:"Einige Bilder sind heruntergerutscht. Zu welcher Sorte gehört jedes Bild?",fr:"Des images ont glissé en bas. De quelle catégorie est chacune ?",es:"Algunos dibujos se resbalaron. ¿De qué tipo es cada uno?",pt:"Algumas figuras escorregaram. De que tipo é cada uma?",it:"Alcune immagini sono scivolate giù. Di che tipo è ognuna?",nl:"Een paar plaatjes zijn naar beneden gegleden. Bij welke soort hoort elk plaatje?",sv:"Några bilder gled ner. Vilken sort hör varje bild till?",da:"Nogle billeder gled ned. Hvilken slags hører hvert billede til?",no:"Noen bilder skled ned. Hvilken sort hører hvert bilde til?",fi:"Muutama kuva liukui alas. Mitä lajia kukin on?"},
    missGlow: {en:"Look at what glows: that is where it belongs.",de:"Schau, was leuchtet: Dort gehört es hin.",fr:"Regarde ce qui brille : c’est là qu’elle va.",es:"Mira lo que brilla: ahí es donde va.",pt:"Olhe o que brilha: é ali que fica.",it:"Guarda che cosa brilla: è lì che va.",nl:"Kijk wat er gloeit: daar hoort het.",sv:"Titta på det som lyser: där hör den hemma.",da:"Se, hvad der lyser: Der hører det til.",no:"Se på det som lyser: der hører det hjemme.",fi:"Katso, mikä hehkuu: sinne se kuuluu."},
    aBranch: {en:"Branch: {k}",de:"Ast: {k}",fr:"Branche : {k}",es:"Rama: {k}",pt:"Galho: {k}",it:"Ramo: {k}",nl:"Tak: {k}",sv:"Gren: {k}",da:"Gren: {k}",no:"Grein: {k}",fi:"Oksa: {k}"},
    aTwig: {en:"Twig: {t}",de:"Zweig: {t}",fr:"Brindille : {t}",es:"Ramita: {t}",pt:"Raminho: {t}",it:"Rametto: {t}",nl:"Takje: {t}",sv:"Kvist: {t}",da:"Kvist: {t}",no:"Kvist: {t}",fi:"Oksanhaara: {t}"},
    aItem: {en:"Picture: {t}",de:"Bild: {t}",fr:"Image : {t}",es:"Dibujo: {t}",pt:"Figura: {t}",it:"Immagine: {t}",nl:"Plaatje: {t}",sv:"Bild: {t}",da:"Billede: {t}",no:"Bilde: {t}",fi:"Kuva: {t}"},
    aNew: {en:"The picture to climb: {t}",de:"Das Bild zum Klettern: {t}",fr:"L’image qui grimpe : {t}",es:"El dibujo que sube: {t}",pt:"A figura que sobe: {t}",it:"L’immagine da far salire: {t}",nl:"Het plaatje dat klimt: {t}",sv:"Bilden som klättrar: {t}",da:"Billedet, der klatrer: {t}",no:"Bildet som klatrer: {t}",fi:"Kiipeävä kuva: {t}"},
    aDown: {en:"Back down to the roots",de:"Zurück zu den Wurzeln",fr:"Redescendre aux racines",es:"Bajar a las raíces",pt:"Descer até as raízes",it:"Torna giù alle radici",nl:"Terug naar de wortels",sv:"Ner till rötterna igen",da:"Ned til rødderne igen",no:"Ned til røttene igjen",fi:"Takaisin juurille"},
  },/*STRINGS-END*/

  defaults: { level: '1', clue: 'pic', branches: '3' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }] },
    { key: 'clue', type: 'choice', labelKey: 'setClue', options: [{ value: 'pic', labelKey: 'cluePic' }, { value: 'text', labelKey: 'clueText' }] },
    { key: 'branches', type: 'choice', labelKey: 'setBranches', options: [{ value: '3', labelKey: 'br3' }, { value: '4', labelKey: 'br4' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null;
    injectClimbingTreeCSS();
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
  _loc: function () { return ClimbingTreeCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return ClimbingTreeCore.levelOf(this._setting('level')); },
  _nb: function () { return this._level() === '2' ? 3 : ClimbingTreeCore.branchesOf(this._setting('branches')); },
  _clue: function () { return ClimbingTreeCore.clueOf(this._setting('clue')); },
  _key: function () { return this._loc() + '/' + this._level() + '/' + this._nb(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = ClimbingTreeCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = ClimbingTreeCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev, this._nb()); this._prev = P.order; this._order = P.order.slice(); this._plan = P; this._orderForPool = pool; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'climbingtree.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    /* never a round without a plan: an unplanned round would stand its right branch first */
    if (!this._plan || !this._plan.orders || !this._plan.orders[r]) this._plan = ClimbingTreeCore.plan(this._loc(), this._level(), Math.random, null, this._nb());
    var P = this._plan;
    this.st = ClimbingTreeCore.newState(this._loc(), this._level(), r, { branches: this._nb(), order: P.orders && P.orders[r], twigs: P.twigs && P.twigs[r], items: P.items && P.items[r] });
    this._view = { note: '', ok: '', slide: false, shake: null };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth();
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
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ct-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ct-main"></div><div class="ct-foot"></div><p class="ct-note" aria-live="polite"></p><p class="ct-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('pointerdown', function (e) { self._pdown(e); });
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
  _dims: function () {
    var W = this._width(), B = ClimbingTreeCore.band(W), four = this._nb() === 4;
    return { W: W, wide: B.wide, tiny: B.tiny, pic: B.wide ? 96 : (B.tiny || four) ? 64 : 72, nest: B.wide ? 110 : B.tiny ? 80 : 96, item: B.wide ? 96 : 64 };
  },
  _img: function (path, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.ct-sr'); if (el) el.textContent = s; },
  _list: function (a) {
    var loc = this._loc(), and = { en: 'and', de: 'und', fr: 'et', es: 'y', pt: 'e', it: 'e', nl: 'en', sv: 'och', da: 'og', no: 'og', fi: 'ja' }[loc];
    try { if (typeof Intl !== 'undefined' && Intl.ListFormat) return new Intl.ListFormat(loc === 'no' ? 'nb' : loc, { style: 'long', type: 'conjunction' }).format(a); } catch (e) {}
    return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + and + ' ' + a[a.length - 1];
  },
  /* the newcomer's face: its picture, or (clue only, not yet perched right) a leaf that hides it */
  _newFace: function (size, hide) {
    var n = this.st.rd.newcomer;
    if (hide) return '<span class="ct-hidden" style="width:' + size + 'px;height:' + size + 'px"><svg viewBox="0 0 40 40" width="' + Math.round(size * 0.6) + '" height="' + Math.round(size * 0.6) + '" aria-hidden="true"><path d="M20 4C9 12 7 26 20 36C33 26 31 12 20 4Z" fill="#7FB23A" stroke="#4E7A1E" stroke-width="2"/><path d="M20 8V34" stroke="#4E7A1E" stroke-width="2"/></svg></span>';
    return this._img(n.pic, size, 'ct-pic');
  },
  _hide: function () { return this._clue() === 'text' && !this.st.done; },

  _paint_: function () {
    var st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, zoom = rd.lvl === '3' && st.at != null;
    this._wrap.className = 'ct-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + rd.lvl + ' nb-' + rd.branches.length + (zoom ? ' is-zoom' : '');
    var main = this._qs('.ct-main'); main.innerHTML = '';
    var tree = this._el('div', 'ct-tree ct-art'), crown = this._el('div', 'ct-crown');
    if (zoom) crown.appendChild(this._zoom(D)); else rd.branches.forEach(function (b, i) { crown.appendChild(self._perch(b, i, D)); });
    tree.appendChild(crown);
    /* the limbs: from each perch (or the opened branch) down to the trunk */
    var n = zoom ? 1 : rd.branches.length, svg = '<svg class="ct-limbs ct-art" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">';
    for (var i = 0; i < n; i++) { var x = n === 1 ? 50 : (i + 0.5) / n * 100; svg += '<path d="M' + x + ' 0 C' + x + ' 16 50 12 50 30" fill="none" stroke="#8C5A2B" stroke-width="7" stroke-linecap="round" vector-effect="non-scaling-stroke"/>'; }
    tree.insertAdjacentHTML('beforeend', svg + '</svg>');
    /* the trunk and the leaf it carries */
    var trunk = this._el('div', 'ct-trunk ct-art' + (st.last === 'empty' && rd.lvl !== '2' ? ' is-glow' : ''));
    var lf = ClimbingTreeCore.leaf(st);
    if (lf) trunk.appendChild(this._el('div', 'ct-leaf ct-art' + (st.done ? ' is-gold' : ''), '<span>' + esc(lf) + '</span>'));
    tree.appendChild(trunk);
    tree.appendChild(this._nest(D));
    main.appendChild(tree);
    var foot = this._qs('.ct-foot'); foot.innerHTML = '';
    var cb = this._btn('ct-check', 'check', this._t('check'), '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    cb.disabled = st.done; cb.addEventListener('click', function () { self._check(); }); foot.appendChild(cb);
    var note = this._qs('.ct-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'ct-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ct-note is-hint'; }
    else { note.textContent = ''; note.className = 'ct-note'; }
  },
  /* a branch's perch: the sign and the shelf with its family */
  _perch: function (b, i, D) {
    var st = this.st, rd = st.rd, self = this, g = st.glow && st.glow.branch === i;
    /* a div with the button role: level 2's placed pictures are buttons of their own and cannot sit inside a button */
    var p = this._el('div', 'ct-perch ct-art' + (g ? ' is-glow' : '') + (this._view.shake === i ? ' is-shake' : ''));
    p.setAttribute('role', 'button'); p.tabIndex = 0; p.setAttribute('data-k', 'branch-' + i); p.setAttribute('aria-label', this._t('aBranch', { k: b.sign }));
    p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); p.click(); } });
    p.appendChild(this._el('span', 'ct-sign ct-art', esc(b.sign)));
    var shelf = this._el('span', 'ct-shelf');
    if (rd.lvl === '1') {
      shelf.insertAdjacentHTML('beforeend', '<span class="ct-member' + (g ? ' is-bob' : '') + '">' + this._img(b.member.pic, D.pic, 'ct-pic') + '<span class="ct-lab">' + esc(b.member.label) + '</span></span>');
      if (st.at === i) shelf.className += ' has-new';
      if (st.at === i) shelf.insertAdjacentHTML('beforeend', '<span class="ct-member is-new' + (this._nb() === 4 || !D.wide ? ' is-over' : '') + '">' + this._newFace(D.pic, this._hide()) + '<span class="ct-lab">' + esc(this._hide() ? '?' : rd.newcomer.label) + '</span></span>');
    } else if (rd.lvl === '3') {
      shelf.insertAdjacentHTML('beforeend', '<span class="ct-twiglets ct-art"><i></i><i></i><i></i></span>');
    } else {
      /* a fanned stack that always fits its perch: each card shows a slice, the top one shows its label */
      var cnt = st.at.filter(function (x) { return x === i; }).length, pw = (D.W - 24 - (rd.branches.length - 1) * (D.wide ? 12 : 4)) / rd.branches.length - 8;
      var k = 0, ov = Math.round(Math.max(D.item * 0.62, cnt > 1 ? D.item - (pw - D.item) / (cnt - 1) : 0));
      rd.items.forEach(function (it, j) {
        if (st.at[j] !== i) return;
        var cls = 'ct-item is-placed' + (st.locked[j] ? ' is-locked' : '') + (k ? ' is-fan' : '');
        var el = st.locked[j] ? self._el('span', cls) : self._btn(cls, 'item-' + j, self._t('aItem', { t: it.label }), '');
        el.innerHTML = self._img(it.pic, D.item, 'ct-pic') + '<span class="ct-lab">' + esc(it.label) + '</span>';
        if (k) el.style.marginLeft = (-ov) + 'px';
        if (!st.locked[j]) el.addEventListener('click', function (e) { e.stopPropagation(); self._item(j); });
        shelf.appendChild(el); k++;
      });
    }
    p.appendChild(shelf);
    p.addEventListener('click', function () { if (rd.lvl === '2') self._put(i); else self._climb(i); });
    return p;
  },
  /* level 3: the opened branch — its sign, the way back down, and its three twigs */
  _zoom: function (D) {
    var st = this.st, rd = st.rd, b = rd.branches[st.at], self = this, z = this._el('div', 'ct-zoom');
    var head = this._el('div', 'ct-zhead');
    var dn = this._btn('ct-down', 'down', this._t('aDown'), '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="#FFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    dn.addEventListener('click', function () { self._down(); }); head.appendChild(dn);
    head.appendChild(this._el('span', 'ct-sign ct-art is-big', esc(b.sign)));
    if (st.twig == null) head.appendChild(this._el('span', 'ct-member is-new is-waiting', this._newFace(D.pic, this._hide())));
    z.appendChild(head);
    var row = this._el('div', 'ct-twigs');
    b.twigs.forEach(function (t, j) {
      var g = st.glow && st.glow.twig === j && st.glow.branch === st.at;
      var tb = self._btn('ct-twig ct-art' + (g ? ' is-glow' : '') + (st.twig === j ? ' is-on' : ''), 'twig-' + j, self._t('aTwig', { t: t.sign }), '');
      tb.appendChild(self._el('span', 'ct-tsign ct-art', esc(t.sign)));
      var shelf = self._el('span', 'ct-shelf');
      shelf.insertAdjacentHTML('beforeend', '<span class="ct-member' + (g ? ' is-bob' : '') + '">' + self._img(t.resident.pic, D.pic, 'ct-pic') + '<span class="ct-lab">' + esc(t.resident.label) + '</span></span>');
      if (st.twig === j) shelf.className += ' has-new';
      if (st.twig === j) shelf.insertAdjacentHTML('beforeend', '<span class="ct-member is-new is-over">' + self._newFace(D.pic, self._hide()) + '<span class="ct-lab">' + esc(self._hide() ? '?' : rd.newcomer.label) + '</span></span>');
      tb.appendChild(shelf);
      tb.addEventListener('click', function () { self._twig(j); });
      row.appendChild(tb);
    });
    z.appendChild(row);
    return z;
  },
  /* the nest at the roots: the newcomer and its clue (levels 1 and 3), or the nine waiting pictures (level 2) */
  _nest: function (D) {
    var st = this.st, rd = st.rd, self = this, nest = this._el('div', 'ct-nest ct-art' + (this._view.slide ? ' is-slide' : ''));
    if (rd.lvl === '2') {
      var grid = this._el('div', 'ct-grid');
      rd.items.forEach(function (it, j) {
        if (st.at[j] >= 0) return;
        var g = st.glow && st.glow.item === j, b = self._btn('ct-item' + (st.sel === j ? ' is-sel' : '') + (g ? ' is-glow' : ''), 'item-' + j, self._t('aItem', { t: it.label }), self._img(it.pic, D.item, 'ct-pic') + '<span class="ct-lab">' + esc(it.label) + '</span>');
        b.setAttribute('aria-pressed', st.sel === j ? 'true' : 'false'); b.addEventListener('click', function () { self._item(j); }); grid.appendChild(b);
      });
      if (!grid.children.length) grid.appendChild(this._el('span', 'ct-empty', ''));
      nest.appendChild(grid);
      return nest;
    }
    var box = this._el('div', 'ct-box');
    if (st.at == null) {
      var nb = this._btn('ct-newcomer', 'newcomer', this._t('aNew', { t: this._hide() ? '?' : rd.newcomer.label }), this._newFace(D.nest, this._hide()) + '<span class="ct-lab">' + esc(this._hide() ? '?' : rd.newcomer.label) + '</span>');
      nb.addEventListener('click', function () { self.api.sound(520); self._sr(self._t('hintClimb')); });
      box.appendChild(nb);
    } else {
      var back = this._btn('ct-roots', 'nest', this._t('aDown'), '<span class="ct-hole" style="width:' + D.nest + 'px;height:' + Math.round(D.nest * 0.5) + 'px"></span>');
      back.disabled = st.done; back.addEventListener('click', function () { self._down(); }); box.appendChild(back);
    }
    nest.appendChild(box);
    if (rd.clue) nest.appendChild(this._el('p', 'ct-clue ct-art', esc(rd.clue)));
    return nest;
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.slide = false; this._view.shake = null; },
  _climb: function (i) { var r = ClimbingTreeCore.climb(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(r === 'up' ? 640 : 520); this._paint(); var lf = ClimbingTreeCore.leaf(this.st); if (lf) this._sr(lf); },
  _twig: function (j) { var r = ClimbingTreeCore.perch(this.st, j); if (r === 'no') return; this._moved(); this.api.sound(720); this._paint(); this._sr(ClimbingTreeCore.leaf(this.st)); },
  _down: function () { var r = ClimbingTreeCore.down(this.st); if (r === 'no') return; this._moved(); this.api.sound(380); this._paint(); },
  _item: function (j) { var r = ClimbingTreeCore.select(this.st, j); if (r === 'no') return; this._moved(); this.api.sound(r === 'home' ? 380 : 560); this._paint(); },
  _put: function (b, j) { var r = ClimbingTreeCore.put(this.st, b, j); if (r === 'no') return; this._moved(); this.api.sound(640); this._paint(); },
  /* drag: the newcomer (or a waiting picture) follows the finger; let go over a branch or a twig */
  _pdown: function (e) {
    var st = this.st; if (!st || st.done || (e.button != null && e.button !== 0)) return;
    var src = e.target.closest && e.target.closest('[data-k="newcomer"],[data-k^="item-"]'); if (!src || src.disabled || (src.classList && src.classList.contains('is-locked'))) return;
    var self = this, k = src.getAttribute('data-k'), sx = e.clientX, sy = e.clientY, ghost = null, img = src.querySelector('img,.ct-hidden');
    var move = function (ev) {
      if (!ghost) { if (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 10) return; ghost = img ? img.cloneNode(true) : document.createElement('span'); ghost.className = 'ct-ghost'; document.body.appendChild(ghost); src.classList.add('is-dragging'); }
      ghost.style.left = (ev.clientX - 40) + 'px'; ghost.style.top = (ev.clientY - 40) + 'px';
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!ghost) return;
      ghost.remove(); src.classList.remove('is-dragging');
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), t = hit && hit.closest && hit.closest('[data-k^="branch-"],[data-k^="twig-"]');
      if (!t) return;
      var d = t.getAttribute('data-k'), n = +d.split('-')[1];
      if (/^twig/.test(d)) self._twig(n);
      else if (k === 'newcomer') self._climb(n);
      else self._put(n, +k.split('-')[1]);
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _check: function () {
    var C = ClimbingTreeCore, st = this.st, v = this._view, self = this; if (st.done) return;
    this._clearTimers();
    var res = C.check(st); if (res.result === 'done') return;
    if (res.result === 'ok') { this._success(); return; }
    v.ok = '';
    if (res.result === 'empty' || res.result === 'twig') { v.note = this._t(C.hint(st)); this.api.sound(400); this._paint(); this.api.announce(v.note); return; }
    v.note = this._t(C.hint(st), { t: st.rd.newcomer ? st.rd.newcomer.label : '' });
    v.slide = true; v.shake = res.was ? res.was.at : null;
    this.api.sound(240); this._paint(); this.api.announce(v.note);
    if (res.was && res.was.leaf) this._sr(res.was.leaf);
    this._later(function () { self._view.slide = false; self._view.shake = null; }, 900);
  },
  _success: function () {
    var C = ClimbingTreeCore, st = this.st, v = this._view, self = this, msg = C.okLine(st, function (a) { return self._list(a); });
    v.note = ''; v.ok = msg; if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectClimbingTreeCSS() {
  if (typeof document === 'undefined' || document.getElementById('ct-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WOOD = '#8C5A2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ct-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .ct-wrap:focus{outline:none;}'
  + '.ct-main{display:flex;flex-direction:column;align-items:stretch;}'
  /* the tree */
  + '.ct-tree{position:relative;display:flex;flex-direction:column;align-items:center;padding:12px 10px 10px;border-radius:18px;background:radial-gradient(ellipse at 50% 18%,rgba(127,178,58,.22),rgba(127,178,58,0) 62%),#FFFDF4;box-shadow:0 0 0 2px #E7DCC3;}'
  + '.ct-crown{display:flex;justify-content:center;align-items:flex-end;gap:12px;width:100%;}'
  + '.ct-perch{position:relative;flex:1 1 0;min-width:0;max-width:220px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px 4px 0;border:0;border-radius:14px;background:transparent;cursor:pointer;font:inherit;color:' + INK + ';}'
  + '.ct-perch:hover{background:rgba(127,178,58,.14);} .ct-perch.is-glow{background:rgba(244,207,98,.35);box-shadow:0 0 0 3px #F4CF62;}'
  + '.ct-perch.is-shake{animation:ctDip .45s ease-in-out;} @keyframes ctDip{30%{transform:translateY(10px) rotate(-2deg);}70%{transform:translateY(4px);}}'
  + '.ct-sign{display:inline-flex;align-items:center;justify-content:center;min-height:34px;max-width:100%;padding:2px 12px;box-sizing:border-box;border-radius:6px;background:#E7C48F;box-shadow:inset 0 0 0 3px ' + WOOD + ',0 3px 0 #6B4320;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.1;text-align:center;color:#3B2A14;overflow-wrap:break-word;hyphens:auto;}'
  + '.ct-sign.is-big{font-size:24px;min-height:44px;padding:4px 18px;}'
  + '.ct-shelf{position:relative;display:flex;overflow:visible;justify-content:center;align-items:flex-end;min-height:60px;width:100%;padding:0 4px 8px;box-sizing:border-box;border-bottom:12px solid ' + WOOD + ';border-radius:0 0 6px 6px;}'
  + '.ct-member{display:flex;flex-direction:column;align-items:center;gap:2px;} .ct-member.is-new{animation:ctHop .3s ease-out;} .ct-member.is-over{margin-left:-28px;} .ct-member.is-waiting{margin-left:8px;}'
  + '@keyframes ctHop{0%{transform:translateY(40px);opacity:.3;}100%{transform:none;opacity:1;}}'
  + '.ct-member.is-bob{animation:ctBob .8s ease-in-out 2;} @keyframes ctBob{50%{transform:translateY(-6px);}}'
  + '.ct-pic{display:block;object-fit:contain;} .ct-shelf.has-new .ct-member:not(.is-new) .ct-lab{visibility:hidden;}'
  + '.ct-lab{display:block;max-width:120px;font-family:' + B + ';font-weight:800;font-size:16px;line-height:1.15;text-align:center;overflow-wrap:break-word;hyphens:auto;}'
  + '.ct-twiglets{display:flex;gap:10px;align-items:flex-end;height:44px;} .ct-twiglets i{display:block;width:6px;height:30px;border-radius:3px;background:' + WOOD + ';transform:rotate(-18deg);} .ct-twiglets i:nth-child(2){height:38px;transform:none;} .ct-twiglets i:nth-child(3){transform:rotate(18deg);}'
  + '.ct-limbs{display:block;width:100%;height:30px;margin-top:-2px;}'
  /* the trunk is a full-width row with the bark drawn down its middle, so the leaf it carries keeps its own width */
  + '.ct-trunk{position:relative;display:flex;justify-content:center;align-items:center;align-self:stretch;min-height:40px;background:linear-gradient(to right,transparent calc(50% - 23px),#6B4320 calc(50% - 23px),#6B4320 calc(50% - 20px),' + WOOD + ' calc(50% - 20px),' + WOOD + ' calc(50% + 20px),#6B4320 calc(50% + 20px),#6B4320 calc(50% + 23px),transparent calc(50% + 23px));}'
  + '.ct-trunk.is-glow{filter:drop-shadow(0 0 8px rgba(244,207,98,.95));}'
  + '.ct-leaf{position:relative;z-index:1;min-width:200px;max-width:min(560px,92vw);margin:6px 0;padding:8px 22px;border-radius:50% 6px 50% 6px / 60% 10px 60% 10px;background:#D9EFC1;box-shadow:inset 0 0 0 3px #7FB23A,0 3px 0 #4E7A1E;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.25;text-align:center;color:#24400C;}'
  + '.ct-leaf.is-gold{background:#FBE7A6;box-shadow:inset 0 0 0 3px #E0A15E,0 3px 0 #B9781F,0 0 18px rgba(244,207,98,.8);color:#5A3A08;}'
  + '.ct-nest{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;margin-top:-2px;padding:10px 6px 4px;border-radius:0 0 16px 16px;background:linear-gradient(#EBDDBF,#F6EBD3);box-shadow:inset 0 3px 0 #C9B48E;}'
  + '.ct-nest.is-slide .ct-newcomer{animation:ctSlide .6s ease-out;} @keyframes ctSlide{0%{transform:translateY(-120px);opacity:.4;}100%{transform:none;opacity:1;}}'
  + '.ct-box{display:flex;justify-content:center;}'
  + '.ct-newcomer{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border:0;border-radius:14px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #C9B48E;cursor:grab;font:inherit;color:' + INK + ';touch-action:none;}'
  + '.ct-newcomer.is-dragging,.ct-item.is-dragging{opacity:.35;}'
  + '.ct-hidden{display:flex;align-items:center;justify-content:center;border-radius:12px;background:#EEF6E3;}'
  + '.ct-roots{display:flex;align-items:center;justify-content:center;min-width:110px;min-height:56px;padding:4px;border:0;border-radius:14px;background:transparent;cursor:pointer;} .ct-roots:disabled{cursor:default;}'
  + '.ct-hole{display:block;border-radius:50%;border:3px dashed #B98A55;box-sizing:border-box;}'
  + '.ct-clue{margin:0;max-width:480px;padding:8px 14px;border-radius:10px;background:#FFF;box-shadow:inset 0 0 0 2px #C9B48E;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.3;text-align:center;color:' + INK + ';}'
  + '.ct-ghost{position:fixed;z-index:9999;width:80px;height:80px;pointer-events:none;opacity:.9;}'
  /* level 2 */
  + '.ct-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:560px;}'
  + '.ct-item{display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;border:0;border-radius:12px;background:#FFFDF4;box-shadow:inset 0 0 0 2px #C9B48E;cursor:pointer;font:inherit;color:' + INK + ';touch-action:none;position:relative;}'
  + '.ct-item.is-sel{background:#FBE9D2;box-shadow:inset 0 0 0 3px #E0A15E,0 0 12px rgba(224,161,94,.6);} .ct-item.is-glow{box-shadow:inset 0 0 0 3px #F4CF62,0 0 14px rgba(244,207,98,.9);}'
  + '.ct-item.is-placed{background:#FFFDF4;} .ct-item.is-locked{cursor:default;box-shadow:inset 0 0 0 3px #7FB23A;} .ct-item.is-fan{box-shadow:inset 0 0 0 2px #C9B48E,-4px 0 6px rgba(0,0,0,.12);} .ct-item.is-locked.is-fan{box-shadow:inset 0 0 0 3px #7FB23A,-4px 0 6px rgba(0,0,0,.12);}'
  + '.ct-empty{display:block;height:20px;} .ct-perch .ct-item .ct-lab{visibility:hidden;} .ct-perch .ct-item:last-child .ct-lab{visibility:visible;}'
  /* level 3 */
  + '.ct-zoom{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.ct-zhead{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.ct-down{width:48px;height:48px;padding:0;border:0;border-radius:50%;background:' + WOOD + ';box-shadow:0 3px 0 #6B4320;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.ct-twigs{display:flex;justify-content:center;align-items:flex-end;gap:10px;width:100%;}'
  + '.ct-twig{flex:1 1 0;min-width:0;max-width:210px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px 4px 0;border:0;border-radius:14px;background:transparent;cursor:pointer;font:inherit;color:' + INK + ';}'
  + '.ct-twig:hover{background:rgba(127,178,58,.14);} .ct-twig.is-glow{background:rgba(244,207,98,.35);box-shadow:0 0 0 3px #F4CF62;} .ct-twig .ct-shelf{border-bottom-width:8px;}'
  + '.ct-tsign{display:inline-flex;align-items:center;justify-content:center;min-height:40px;max-width:100%;padding:2px 10px;box-sizing:border-box;border-radius:20px 6px 20px 6px;background:#D9EFC1;box-shadow:inset 0 0 0 2px #7FB23A;font-family:' + B + ';font-weight:800;font-size:17px;line-height:1.15;text-align:center;color:#24400C;}'
  /* the check, the note */
  + '.ct-foot{display:flex;justify-content:center;} .ct-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:56px;padding:8px 26px;border:0;border-radius:28px;background:#146B5E;box-shadow:0 5px 0 #0E4A41;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .ct-check:disabled{opacity:.5;cursor:default;}'
  + '.ct-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ct-note.is-hint{color:#9A3D1C;} .ct-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.ct-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.ct-wrap.is-narrow{gap:8px;} .ct-wrap.is-narrow .ct-tree{padding:8px 4px 6px;} .ct-wrap.is-narrow .ct-crown,.ct-wrap.is-narrow .ct-twigs{gap:4px;}'
  + '.ct-wrap.is-narrow .ct-sign{font-size:14px;min-height:30px;padding:2px 4px;} .ct-wrap.is-narrow .ct-sign.is-big{font-size:19px;min-height:44px;} .ct-wrap.is-narrow .ct-lab{font-size:14px;max-width:84px;}'
  + '.ct-wrap.is-narrow .ct-member.is-over{margin-left:-34px;} .ct-wrap.is-narrow .ct-shelf{min-height:48px;padding:0 2px 6px;border-bottom-width:9px;}'
  + '.ct-wrap.is-narrow .ct-tsign{font-size:14px;min-height:36px;padding:2px 6px;}'
  + '.ct-wrap.is-narrow .ct-leaf{font-size:16px;padding:6px 14px;min-width:0;} .ct-wrap.is-narrow .ct-clue{font-size:17px;padding:6px 10px;} .ct-wrap.is-narrow .ct-limbs{height:22px;} .ct-wrap.is-narrow .ct-trunk{min-height:26px;}'
  + '.ct-wrap.is-narrow .ct-grid{gap:5px;} .ct-wrap.is-narrow .ct-item{padding:2px;} .ct-wrap.is-narrow.lv-2 .ct-shelf{min-height:34px;} .ct-wrap.is-narrow.lv-2 .ct-limbs{height:14px;} .ct-wrap.is-narrow.lv-2 .ct-trunk{min-height:14px;}'
  + '.ct-wrap.is-narrow .ct-check{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .ct-wrap.is-narrow .ct-note{font-size:17px;}'
  /* on a phone the hint sits at the top of the stage, so Check and the tree keep their place in the fold */
  + '.ct-wrap.is-narrow .ct-note{order:-1;} .ct-wrap.is-narrow .ct-note:empty{display:none;}'
  /* phones: the clue beside the picture in the nest; a solved round gives the nest and Check to the shell's Next */
  + '.ct-wrap.is-narrow:not(.lv-2) .ct-nest{flex-direction:row;justify-content:center;align-items:center;gap:8px;} .ct-wrap.is-narrow .ct-clue{flex:1 1 auto;min-width:0;max-width:220px;text-align:left;}'
  + '.ct-wrap.is-narrow.is-done .ct-nest,.ct-wrap.is-narrow.is-done .ct-foot{display:none;}'
  + '.ct-wrap.is-narrow.nb-4 .ct-perch{padding:4px 1px 0;} .ct-wrap.is-tiny.nb-4 .ct-sign{font-size:13px;padding:2px 2px;}'
  + '.ct-wrap.is-tiny.lv-2 .ct-nest{padding:4px 2px 2px;gap:4px;} .ct-wrap.is-tiny.lv-2 .ct-grid{gap:3px;} .ct-wrap.is-tiny.lv-2 .ct-sign{min-height:26px;} .ct-wrap.is-tiny.lv-2 .ct-crown .ct-perch{gap:3px;} .ct-wrap.is-tiny.lv-2 .ct-lab{font-size:13px;line-height:1.1;}'
  + '.ct-wrap.is-tiny .ct-tree{padding-top:4px;} .ct-wrap.is-tiny .ct-limbs{height:16px;} .ct-wrap.is-tiny .ct-nest{padding-top:6px;}'
  + '.ct-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.ct-wrap *{animation:none !important;transition:none !important;}}'
  + '.ct-wrap button:focus-visible,.ct-perch:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'ct-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.ClimbingTreeActivity = ClimbingTreeActivity;
