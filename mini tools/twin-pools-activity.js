/* =====================================================================
   twin-pools-activity.js — ACTIVITY #15 of the one-by-one rebuild:
   "Twinsies — count how many & count out that many" (K.CC.B.5) —
   THE TWIN POOLS. Design sheet: docs/activities-rebuild/015-twin-pools.md
   ---------------------------------------------------------------------
   Two rock pools, one above the other. The first holds library sea
   creatures in a line, a ring, an array or a scatter (K.CC.B.5's four
   arrangements); a tap on one marks it as counted (the child's own mark,
   never a number). The twin pool below is empty: always more places than
   the round needs (12, or 8 up to five), so its size never tells. A tap on
   an empty place puts in a creature of a DIFFERENT kind; a tap on it takes
   it out again. Only the number can match.

   THE INVENTION: THE STRINGS. On a right Check a string ties every creature
   in the first pool to one in the twin pool — nothing is left over on
   either side, which is what "the same many" means. Miss 1 numbers the
   twin pool; miss 2 lets the strings tie as many pairs as they can and
   rings the creatures left without a twin. The help never moves a creature.
   No mascot is drawn.

   ACTIVITY LAYER ONLY: the model is twin-pools-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.TwinPoolsActivity.st / ._order / ._pool / .STRING_MS.
   ===================================================================== */
'use strict';

var TwinPoolsActivity = {
  id: 'twin-pools',
  apparatusClasses: ['tw-'],

  strings: {
    title:        {en:'The Twin Pools',de:'Die Zwillingsbecken',fr:'Les flaques jumelles',es:'Las pozas gemelas',pt:'As poças gêmeas',it:'Le pozze gemelle',nl:'De tweelingpoelen',sv:'Tvillingpölarna',da:'Tvillingepølerne',no:'Tvillingpyttene',fi:'Kaksoislammikot'},
    instruction:  {en:'Count the sea creatures in the first pool (tap each one to mark it). Then fill the twin pool with just as many.',de:'Zähle die Meerestiere im ersten Becken (tippe jedes an, um es abzuhaken). Fülle dann das Zwillingsbecken mit genauso vielen.',fr:'Compte les animaux marins de la première flaque (touche chacun pour le cocher). Puis remplis la flaque jumelle avec autant d’animaux.',es:'Cuenta los animales marinos de la primera poza (toca cada uno para marcarlo). Luego llena la poza gemela con la misma cantidad.',pt:'Conte os animais marinhos da primeira poça (toque em cada um para marcá-lo). Depois encha a poça gêmea com a mesma quantidade.',it:'Conta gli animali marini della prima pozza (tocca ognuno per segnarlo). Poi riempi la pozza gemella con altrettanti animali.',nl:'Tel de zeedieren in de eerste poel (tik elk dier aan om het af te vinken). Vul daarna de tweelingpoel met evenveel dieren.',sv:'Räkna havsdjuren i den första pölen (tryck på vart och ett för att bocka av det). Fyll sedan tvillingpölen med lika många.',da:'Tæl havdyrene i den første pøl (tryk på hvert dyr for at sætte flueben ved det). Fyld så tvillingepølen med lige så mange.',no:'Tell sjødyrene i den første pytten (trykk på hvert dyr for å krysse det av). Fyll så tvillingpytten med like mange.',fi:'Laske ensimmäisen lammikon merieläimet (napauta jokaista merkitäksesi sen). Täytä sitten kaksoislammikko yhtä monella.'},
    prompt:       {en:'Put as many in the twin pool as there are in the first pool, then press Check.',de:'Setze so viele ins Zwillingsbecken, wie im ersten Becken sind, und drücke dann auf Prüfen.',fr:'Mets dans la flaque jumelle autant d’animaux qu’il y en a dans la première flaque, puis appuie sur Vérifier.',es:'Pon en la poza gemela tantos como hay en la primera poza y luego oprime Comprobar.',pt:'Coloque na poça gêmea tantos quantos há na primeira poça e depois aperte Verificar.',it:'Metti nella pozza gemella tanti animali quanti ce ne sono nella prima pozza, poi premi Verifica.',nl:'Zet evenveel dieren in de tweelingpoel als er in de eerste poel zijn en druk dan op Controleer.',sv:'Sätt lika många i tvillingpölen som det finns i den första pölen och tryck sedan på Kontrollera.',da:'Sæt lige så mange i tvillingepølen, som der er i den første pøl, og tryk så på Tjek.',no:'Sett like mange i tvillingpytten som det er i den første pytten, og trykk så på Sjekk.',fi:'Laita kaksoislammikkoon yhtä monta kuin ensimmäisessä lammikossa on ja paina sitten Tarkista.'},
    firstLabel:   {en:'The first pool',de:'Das erste Becken',fr:'La première flaque',es:'La primera poza',pt:'A primeira poça',it:'La prima pozza',nl:'De eerste poel',sv:'Den första pölen',da:'Den første pøl',no:'Den første pytten',fi:'Ensimmäinen lammikko'},
    twinLabel:    {en:'The twin pool',de:'Das Zwillingsbecken',fr:'La flaque jumelle',es:'La poza gemela',pt:'A poça gêmea',it:'La pozza gemella',nl:'De tweelingpoel',sv:'Tvillingpölen',da:'Tvillingepølen',no:'Tvillingpytten',fi:'Kaksoislammikko'},
    markLabel:    {en:'Mark this one as counted',de:'Dieses Tier als gezählt abhaken',fr:'Cocher cet animal comme compté',es:'Marcar este como contado',pt:'Marcar este como contado',it:'Segna questo come contato',nl:'Dit dier afvinken als geteld',sv:'Bocka av djuret som räknat',da:'Sæt flueben ved dyret som talt',no:'Kryss av dyret som telt',fi:'Merkitse tämä lasketuksi'},
    placeLabel:   {en:'Put a sea creature here',de:'Hier ein Meerestier hineinsetzen',fr:'Mettre un animal marin ici',es:'Poner un animal marino aquí',pt:'Colocar um animal marinho aqui',it:'Metti qui un animale marino',nl:'Hier een zeedier neerzetten',sv:'Sätt ett havsdjur här',da:'Sæt et havdyr her',no:'Sett et sjødyr her',fi:'Laita merieläin tähän'},
    backLabel:    {en:'Take this one out',de:'Dieses Tier herausnehmen',fr:'Enlever cet animal',es:'Sacar este',pt:'Tirar este',it:'Togli questo',nl:'Dit dier eruit halen',sv:'Ta upp djuret',da:'Tag dyret op',no:'Ta opp dyret',fi:'Ota tämä pois'},
    emptyPool:    {en:'Empty the twin pool',de:'Zwillingsbecken leeren',fr:'Vider la flaque jumelle',es:'Vaciar la poza gemela',pt:'Esvaziar a poça gêmea',it:'Svuota la pozza gemella',nl:'Tweelingpoel leegmaken',sv:'Töm tvillingpölen',da:'Tøm tvillingepølen',no:'Tøm tvillingpytten',fi:'Tyhjennä kaksoislammikko'},
    hintStart:    {en:'Tap an empty place in the twin pool to put in a sea creature.',de:'Tippe auf einen freien Platz im Zwillingsbecken, um ein Meerestier hineinzusetzen.',fr:'Touche une place libre dans la flaque jumelle pour y mettre un animal marin.',es:'Toca un lugar vacío de la poza gemela para poner un animal marino.',pt:'Toque em um lugar vazio da poça gêmea para colocar um animal marinho.',it:'Tocca un posto libero nella pozza gemella per metterci un animale marino.',nl:'Tik op een lege plek in de tweelingpoel om er een zeedier in te zetten.',sv:'Tryck på en tom plats i tvillingpölen för att sätta dit ett havsdjur.',da:'Tryk på en tom plads i tvillingepølen for at sætte et havdyr der.',no:'Trykk på en tom plass i tvillingpytten for å sette et sjødyr der.',fi:'Napauta kaksoislammikon tyhjää paikkaa laittaaksesi siihen merieläimen.'},
    hintMore:     {en:'Too many in the twin pool. Tap one to take it out.',de:'Zu viele im Zwillingsbecken. Tippe auf eins, um es herauszunehmen.',fr:'Trop d’animaux dans la flaque jumelle. Touches-en un pour l’enlever.',es:'Hay demasiados en la poza gemela. Toca uno para sacarlo.',pt:'Tem animais demais na poça gêmea. Toque em um para tirá-lo.',it:'Troppi animali nella pozza gemella. Toccane uno per toglierlo.',nl:'Te veel in de tweelingpoel. Tik op een dier om het eruit te halen.',sv:'För många i tvillingpölen. Tryck på ett djur för att ta upp det.',da:'For mange i tvillingepølen. Tryk på et dyr for at tage det op.',no:'For mange i tvillingpytten. Trykk på et dyr for å ta det opp.',fi:'Kaksoislammikossa on liian monta. Napauta yhtä ottaaksesi sen pois.'},
    hintFewer:    {en:'Too few in the twin pool. Tap an empty place to put in one more.',de:'Zu wenige im Zwillingsbecken. Tippe auf einen freien Platz, um noch eins hineinzusetzen.',fr:'Pas assez d’animaux dans la flaque jumelle. Touche une place libre pour en ajouter un.',es:'Faltan en la poza gemela. Toca un lugar vacío para poner uno más.',pt:'Faltam animais na poça gêmea. Toque em um lugar vazio para colocar mais um.',it:'Mancano animali nella pozza gemella. Tocca un posto libero per metterne un altro.',nl:'Te weinig in de tweelingpoel. Tik op een lege plek om er nog een bij te zetten.',sv:'För få i tvillingpölen. Tryck på en tom plats för att sätta dit ett till.',da:'For få i tvillingepølen. Tryk på en tom plads for at sætte et dyr til.',no:'For få i tvillingpytten. Trykk på en tom plass for å sette ett til.',fi:'Kaksoislammikossa on liian vähän. Napauta tyhjää paikkaa laittaaksesi vielä yhden.'},
    hintMoreTied: {en:'Each string ties a pair. Take out the ones with no string.',de:'Jede Schnur verbindet ein Paar. Nimm die Tiere ohne Schnur heraus.',fr:'Chaque ficelle relie une paire. Enlève les animaux sans ficelle.',es:'Cada hilo une una pareja. Saca los que no tienen hilo.',pt:'Cada barbante liga um par. Tire os que estão sem barbante.',it:'Ogni filo lega una coppia. Togli gli animali senza filo.',nl:'Elk touwtje verbindt een paar. Haal de dieren zonder touwtje eruit.',sv:'Varje snöre binder ihop ett par. Ta upp djuren utan snöre.',da:'Hver snor binder et par sammen. Tag dyrene uden snor op.',no:'Hver snor binder sammen et par. Ta opp dyrene uten snor.',fi:'Jokainen naru yhdistää parin. Ota pois ne, joilla ei ole narua.'},
    hintFewerTied:{en:'Each string ties a pair. Every one with no string needs a twin.',de:'Jede Schnur verbindet ein Paar. Jedes Tier ohne Schnur braucht einen Zwilling.',fr:'Chaque ficelle relie une paire. Chaque animal sans ficelle a besoin d’un jumeau.',es:'Cada hilo une una pareja. Cada uno sin hilo necesita un gemelo.',pt:'Cada barbante liga um par. Cada um sem barbante precisa de um gêmeo.',it:'Ogni filo lega una coppia. Ogni animale senza filo ha bisogno di un gemello.',nl:'Elk touwtje verbindt een paar. Elk dier zonder touwtje heeft een tweeling nodig.',sv:'Varje snöre binder ihop ett par. Varje djur utan snöre behöver en tvilling.',da:'Hver snor binder et par sammen. Hvert dyr uden snor skal have en tvilling.',no:'Hver snor binder sammen et par. Hvert dyr uten snor trenger en tvilling.',fi:'Jokainen naru yhdistää parin. Jokainen, jolla ei ole narua, tarvitsee kaksosen.'},
    celebrate:    {en:'Twins — {n} and {n}!',de:'Zwillinge – {n} und {n}!',fr:'Jumeaux — {n} et {n} !',es:'¡Gemelos: {n} y {n}!',pt:'Gêmeos: {n} e {n}!',it:'Gemelli: {n} e {n}!',nl:'Tweelingen – {n} en {n}!',sv:'Tvillingar – {n} och {n}!',da:'Tvillinger – {n} og {n}!',no:'Tvillinger – {n} og {n}!',fi:'Kaksoset – {n} ja {n}!'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:     {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',es:'Hasta 5',pt:'Até 5',it:'Fino a 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:    {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setTwin:      {en:'In the twin pool',de:'Im Zwillingsbecken',fr:'Dans la flaque jumelle',es:'En la poza gemela',pt:'Na poça gêmea',it:'Nella pozza gemella',nl:'In de tweelingpoel',sv:'I tvillingpölen',da:'I tvillingepølen',no:'I tvillingpytten',fi:'Kaksoislammikossa'},
    twinOther:    {en:'Different sea creatures',de:'Andere Meerestiere',fr:'D’autres animaux marins',es:'Otros animales marinos',pt:'Outros animais marinhos',it:'Altri animali marini',nl:'Andere zeedieren',sv:'Andra havsdjur',da:'Andre havdyr',no:'Andre sjødyr',fi:'Eri merieläimet'},
    twinSame:     {en:'The same sea creatures',de:'Dieselben Meerestiere',fr:'Les mêmes animaux marins',es:'Los mismos animales marinos',pt:'Os mesmos animais marinhos',it:'Gli stessi animali marini',nl:'Dezelfde zeedieren',sv:'Samma havsdjur',da:'De samme havdyr',no:'De samme sjødyrene',fi:'Samat merieläimet'}
  },

  defaults: { range: 'to10', twin: 'other' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'twin', type: 'choice', labelKey: 'setTwin', options: [{ value: 'other', labelKey: 'twinOther' }, { value: 'same', labelKey: 'twinSame' }] }
  ],

  STRING_MS: 420,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null; this._stringsShown = null;
    injectTwinPoolsCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(TwinPoolsCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the pools stay bare */ });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 640;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return TwinPoolsCore.POOLS[r] ? r : 'to10'; },
  _twin: function () { var t = this.api && this.api.settings && this.api.settings.twin; return t === 'same' ? 'same' : 'other'; },
  _ensurePool: function () { var key = this._range() + ':' + this._twin(); if (!this._pool || this._poolKey !== key) { this._pool = TwinPoolsCore.rounds(this._range(), 'tw', this._twin()); this._poolKey = key; this._order = null; } return this._pool; },
  _shuffled: function (n, prev) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (var g = 0; g < 10; g++) {
      for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!prev || n < 2 || a.join(',') !== prev.join(',')) break;
    }
    return a;
  },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = this._shuffled(n, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = this._shuffled(n, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'twin-pools.' + r.id,
      promptKey: 'prompt',
      promptArgs: { n: r.n },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = TwinPoolsCore.newState(r); tool._stringsShown = null; },
      check: function (tool) { var res = TwinPoolsCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return TwinPoolsCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = TwinPoolsCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'tw')[0]);
    var wrap = api.el('div', 'tw-wrap'); this._wrap = wrap;

    /* the first pool: the creatures to count, each one a mark-as-counted button */
    var first = api.el('div', 'tw-pool tw-first'); first.setAttribute('role', 'group'); first.setAttribute('aria-label', t('firstLabel'));
    this._first = first; this._models = [];
    var NS0 = 'http://www.w3.org/2000/svg';
    var loop = document.createElementNS(NS0, 'svg'); loop.setAttribute('class', 'tw-loop'); loop.setAttribute('aria-hidden', 'true');
    var ell = document.createElementNS(NS0, 'ellipse'); loop.appendChild(ell); first.appendChild(loop); this._loop = loop; this._ell = ell;
    for (var k = 0; k < 10; k++) {
      (function (i) {
        var b = api.el('button', 'tw-m'); b.type = 'button'; b.hidden = true; b.setAttribute('aria-label', t('markLabel')); b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () { self._mark(i); });
        var tick = api.el('span', 'tw-tick'); tick.setAttribute('aria-hidden', 'true'); b.appendChild(tick);
        var nb = api.el('span', 'tw-num'); nb.setAttribute('aria-hidden', 'true'); b.appendChild(nb);
        first.appendChild(b); self._models.push(b);
      }(k));
    }
    wrap.appendChild(first);

    /* the seam between the pools: Empty the twin pool */
    var mid = api.el('div', 'tw-mid');
    var clear = api.el('button', 'tw-empty'); clear.type = 'button'; clear.textContent = t('emptyPool');
    clear.addEventListener('click', function () { self._empty(); });
    this._clear = clear; mid.appendChild(clear);
    wrap.appendChild(mid);

    /* the twin pool: places, each one a button (empty → put one in; full → take it out) */
    var twin = api.el('div', 'tw-pool tw-twin'); twin.setAttribute('role', 'group'); twin.setAttribute('aria-label', t('twinLabel'));
    this._twinEl = twin; this._places = [];
    for (var p = 0; p < 12; p++) {
      (function (q) {
        var b = api.el('button', 'tw-place'); b.type = 'button'; b.hidden = true;
        b.addEventListener('click', function () { self._tapPlace(q); });
        var nb = api.el('span', 'tw-num'); nb.setAttribute('aria-hidden', 'true'); b.appendChild(nb);
        twin.appendChild(b); self._places.push(b);
      }(p));
    }
    wrap.appendChild(twin);

    /* the strings: one SVG over both pools */
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'tw-strings'); svg.setAttribute('aria-hidden', 'true');
    this._svg = svg; wrap.appendChild(svg);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = TwinPoolsCore.layout(this._width(), st ? st.places : 12);
    var w = this._wrap;
    ['wide', 'stack', 'narrow'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--tw-cell', L.cell + 'px');
    w.style.setProperty('--tw-pic', L.pic + 'px');
    w.style.setProperty('--tw-pw', L.poolW + 'px');
    w.style.setProperty('--tw-ph', L.poolH + 'px');
    w.style.setProperty('--tw-gap', L.gap + 'px');
    this._layoutFor = st ? st.places : 12;
    this._spotsFor = null;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },
  _pic: function (holder, noun) {
    var img = holder.querySelector('img');
    if (!this._theme || !this._theme.nouns[noun]) { if (img) img.remove(); return null; }
    if (img && img.getAttribute('data-noun') !== noun) { img.remove(); img = null; }
    if (!img) { img = LCSPictures.img(this._theme, noun, this.api.lang, { plural: false }); img.className = 'tw-pic'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.setAttribute('data-noun', noun); holder.insertBefore(img, holder.firstChild); }
    return img;
  },

  _paint: function () {
    var st = this.st, C = TwinPoolsCore, t = this.api.t;
    if (this._layoutFor !== st.places) this._layout();
    var L = this._L;
    if (this._spotsFor !== st.id + ':' + L.mode) { this._spots = C.modelSpots(st, L); this._spotsFor = st.id + ':' + L.mode; this._wrap.style.setProperty('--tw-mpic', C.modelPic(st, L) + 'px'); }
    this._wrap.classList.toggle('is-done', st.done);
    /* a ring sits on a loop of pebbles, so it reads as a ring even in a flat pool */
    var E = C.ringEllipse(st, L);
    this._loop.style.display = E ? '' : 'none';
    if (E) { this._loop.setAttribute('viewBox', '0 0 ' + L.poolW + ' ' + L.poolH); this._ell.setAttribute('cx', E.cx); this._ell.setAttribute('cy', E.cy); this._ell.setAttribute('rx', E.rx); this._ell.setAttribute('ry', E.ry); }
    /* the first pool (its numbers, when done, come from the strings: each one takes its twin's number) */
    for (var k = 0; k < 10; k++) {
      var b = this._models[k], on = k < st.n;
      b.hidden = !on;
      if (!on) continue;
      var s = this._spots[k];
      b.style.left = s.x + 'px'; b.style.top = s.y + 'px'; b.style.setProperty('--tw-tilt', s.tilt + 'deg');
      this._pic(b, st.model);
      b.classList.toggle('is-marked', !!st.marks[k]);
      b.setAttribute('aria-pressed', String(!!st.marks[k]));
      b.disabled = st.done;
      var nb = b.querySelector('.tw-num'); nb.textContent = ''; nb.classList.remove('is-on', 'is-gold');
    }
    /* the twin pool */
    var tNums = C.twinNums(st);
    for (var p = 0; p < 12; p++) {
      var pb = this._places[p], here = p < st.places, full = C.isFilled(st, p);
      pb.hidden = !here;
      if (!here) continue;
      var sp = C.placeSpot(p, L);
      pb.style.left = sp.x + 'px'; pb.style.top = sp.y + 'px';
      pb.classList.toggle('is-full', full);
      pb.setAttribute('aria-label', full ? t('backLabel') : t('placeLabel'));
      if (full) this._pic(pb, st.twin); else { var im = pb.querySelector('img'); if (im) im.remove(); }
      pb.disabled = st.done;
      var i = st.filled.indexOf(p), tb = pb.querySelector('.tw-num'), tv = i >= 0 ? tNums[i] : '';
      tb.textContent = tv; tb.classList.toggle('is-on', !!tv); tb.classList.toggle('is-gold', st.done && i === st.filled.length - 1);
    }
    this._clear.hidden = st.done || st.filled.length === 0;
    this._drawStrings();
  },

  /* ---------------- the strings ---------------- */
  /* where a string is tied: the edge of the creature that faces the other pool (never across its face) */
  _anchor: function (el, base, side) {
    var r = el.getBoundingClientRect(), k = r.height * 0.36, across = this._L && this._L.side;   /* side by side: the facing edges are left / right */
    return { x: r.left + r.width / 2 + (across ? side * k : 0) - base.left, y: r.top + r.height / 2 + (across ? 0 : side * k) - base.top };
  },
  _drawStrings: function () {
    var st = this.st, C = TwinPoolsCore, svg = this._svg, self = this, k, p, i;
    var show = C.showStrings(st) && st.filled.length > 0;
    for (k = 0; k < 10; k++) this._models[k].classList.remove('is-lone');
    for (p = 0; p < 12; p++) this._places[p].classList.remove('is-lone');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!show) { this._stringsShown = null; return; }
    var base = this._wrap.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + base.width.toFixed(1) + ' ' + base.height.toFixed(1));
    var mPts = [], tPts = [];
    for (i = 0; i < st.n; i++) mPts.push(this._anchor(this._models[i], base, 1));
    for (i = 0; i < st.filled.length; i++) tPts.push(this._anchor(this._places[st.filled[i]], base, -1));
    var pu = C.pairUp(mPts, tPts);
    var key = st.id + '|' + st.filled.join(',') + '|' + (st.done ? 'd' : st.misses);
    var animate = this._stringsShown !== key && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this._stringsShown = key;
    var NS = 'http://www.w3.org/2000/svg', r = Math.max(3.5, this._L.pic * 0.055);
    pu.pairs.forEach(function (pr, n) {
      var a = mPts[pr[0]], b = tPts[pr[1]];
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 + Math.min(24, Math.hypot(b.x - a.x, b.y - a.y) * 0.08);   /* a little slack */
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', 'M' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1));
      path.setAttribute('class', 'tw-string');
      svg.appendChild(path);
      [a, b].forEach(function (pt) { var c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); c.setAttribute('r', r.toFixed(1)); c.setAttribute('class', 'tw-knot'); svg.appendChild(c); });
      if (animate && path.getTotalLength && path.animate) {
        var len = path.getTotalLength();
        path.style.strokeDasharray = len + ' ' + len;
        path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: self.STRING_MS, delay: n * 90, easing: 'ease-out', fill: 'backwards' });
      }
    });
    if (st.done) {   /* both pools read 1..n, and each string joins a number to the same number */
      var byTwin = pu.pairs.slice().sort(function (x, y) { return x[1] - y[1]; }).map(function (pr) { return pr[0]; });
      var nums = C.modelNums(st, byTwin);
      byTwin.forEach(function (mi, q) { var nb = self._models[mi].querySelector('.tw-num'); nb.textContent = nums[q]; nb.classList.toggle('is-on', !!nums[q]); nb.classList.toggle('is-gold', nums[q] === String(st.n)); });
    }
    pu.loneModel.forEach(function (i2) { self._models[i2].classList.add('is-lone'); });
    pu.loneTwin.forEach(function (j) { self._places[st.filled[j]].classList.add('is-lone'); });
  },

  /* ---------------- the hand ---------------- */
  _mark: function (k) {
    if (!TwinPoolsCore.mark(this.st, k)) return;
    this.api.sound(this.st.marks[k] ? 520 : 360);
    this._paint();
    this.api.track('mark', { n: this.st.n, k: k, on: this.st.marks[k] });
  },
  _tapPlace: function (p) {
    var st = this.st, C = TwinPoolsCore;
    if (C.isFilled(st, p)) {
      if (!C.remove(st, p)) return;
      this.api.sound(330);
      this._paint();
      this.api.track('remove', { n: st.n, inPool: st.filled.length });
    } else {
      if (!C.place(st, p)) return;
      this.api.sound(440 + 18 * st.filled.length);
      this._paint();
      bounce(this._places[p], 'tw-splash');
      this.api.track('place', { n: st.n, inPool: st.filled.length });
    }
  },
  _empty: function () {
    if (!TwinPoolsCore.empty(this.st)) return;
    this.api.sound(300);
    this._paint();
    this.api.track('empty', { n: this.st.n });
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._paint();
    if (res.slip === 'none') return;
    if (res.ok) { this.api.sound(660); this._speakNumber(st.n); }
    else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, a: res.a, misses: st.misses, marks: st.marks.filter(Boolean).length });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var twCssDone = false;
function injectTwinPoolsCSS() {
  if (twCssDone || typeof document === 'undefined') return;
  twCssDone = true;
  var css = ''
  + '.tw-wrap{position:relative;width:100%;display:grid;grid-template-columns:var(--tw-pw);justify-content:center;align-items:start;row-gap:6px;--tw-cell:100px;--tw-pic:94px;--tw-pw:616px;--tw-ph:216px;--tw-gap:40px;}'
  /* side by side: the first pool, the gap the strings cross, the twin pool; Empty under the twin pool */
  + '.tw-wrap.is-wide{grid-template-columns:var(--tw-pw) var(--tw-gap) var(--tw-pw);row-gap:8px;}'
  + '.tw-wrap.is-wide .tw-first{grid-column:1;grid-row:1;} .tw-wrap.is-wide .tw-twin{grid-column:3;grid-row:1;} .tw-wrap.is-wide .tw-mid{grid-column:3;grid-row:2;}'
  /* a rock pool: sea water in a sandstone rim */
  + '.tw-pool{position:relative;width:var(--tw-pw);height:var(--tw-ph);box-sizing:border-box;border-radius:28px;background:radial-gradient(120% 90% at 30% 25%,#D9F1F5 0,#AEDDE6 55%,#8FCBD7 100%);box-shadow:inset 0 0 0 5px #D8C7A4,inset 0 0 0 8px #BFA97E,inset 0 10px 22px rgba(20,80,100,.22),0 6px 14px rgba(60,50,30,.16);}'
  + '.tw-pool::before{content:"";position:absolute;inset:8px;border-radius:22px;pointer-events:none;background:radial-gradient(40% 18% at 70% 80%,rgba(255,255,255,.35),transparent 70%),radial-gradient(30% 14% at 22% 30%,rgba(255,255,255,.28),transparent 70%);}'
  + '.tw-twin{background:radial-gradient(120% 90% at 70% 25%,#DDF3F2 0,#B4E0E3 55%,#93CDD3 100%);}'
  /* the first pool's creatures: tap = the child's own counted-mark */
  + '.tw-m{position:absolute;width:var(--tw-mpic,var(--tw-pic));height:var(--tw-mpic,var(--tw-pic));padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;touch-action:manipulation;transform:rotate(var(--tw-tilt,0deg));-webkit-tap-highlight-color:transparent;z-index:1;} .tw-m[hidden]{display:none;}'
  + '.tw-m::before{content:"";position:absolute;inset:4%;border-radius:50%;background:transparent;transition:background .15s,box-shadow .15s;}'
  + '.tw-m.is-marked::before{background:rgba(255,255,255,.55);box-shadow:0 0 0 3px var(--lcs-structure);}'
  + '.tw-tick{position:absolute;left:2%;bottom:2%;width:max(18px,calc(var(--tw-mpic,var(--tw-pic)) * .26));height:max(18px,calc(var(--tw-mpic,var(--tw-pic)) * .26));border-radius:50%;background:var(--lcs-structure);border:2px solid #fff;box-sizing:border-box;display:none;z-index:2;box-shadow:0 1px 3px rgba(0,0,0,.25);}'
  + '.tw-tick::after{content:"";position:absolute;left:30%;top:16%;width:26%;height:44%;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg);}'
  + '.tw-m.is-marked .tw-tick{display:block;}'
  + '.tw-m:disabled{cursor:default;} .tw-m:focus-visible,.tw-place:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.tw-pic{position:relative;width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 3px 2px rgba(10,50,70,.25));transition:transform .15s;}'
  + '.tw-m:hover:not(:disabled) .tw-pic,.tw-place:hover:not(:disabled) .tw-pic{transform:scale(1.05);}'
  /* the twin pool's places: a sandy hollow until a creature sits in it */
  + '.tw-place{position:absolute;width:var(--tw-pic);height:var(--tw-pic);padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;z-index:1;} .tw-place[hidden]{display:none;}'
  + '.tw-place::before{content:"";position:absolute;inset:12%;border-radius:50%;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.55) 0 40%,rgba(255,255,255,.18) 41% 100%);box-shadow:inset 0 2px 5px rgba(20,80,100,.22);transition:opacity .15s;}'
  + '.tw-place.is-full::before{opacity:0;}'
  + '.tw-place:disabled{cursor:default;}'
  + '.tw-place.tw-splash .tw-pic{animation:tw-splash .34s var(--lcs-ease) 1;} @keyframes tw-splash{0%{transform:scale(.55) translateY(-8%);opacity:.3;}70%{transform:scale(1.08);opacity:1;}100%{transform:none;}}'
  /* the lone ones at help 2: no twin — dashed teal round a first-pool creature, coral round an extra in the twin pool */
  + '.tw-m.is-lone::after,.tw-place.is-lone::after{content:"";position:absolute;inset:-2%;border-radius:50%;border:4px dashed var(--lcs-structure);pointer-events:none;}'
  + '.tw-place.is-lone::after{border:4px solid var(--lcs-accent);}'
  /* the seam */
  + '.tw-loop{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:visible;} .tw-loop ellipse{fill:none;stroke:#F3E6C8;stroke-width:7;stroke-linecap:round;stroke-dasharray:1 14;opacity:.95;}'
  + '.tw-mid{position:relative;z-index:5;width:var(--tw-pw);min-height:44px;display:flex;align-items:center;justify-content:flex-end;pointer-events:none;} .tw-mid .tw-empty{pointer-events:auto;}'   /* the button sits over the strings */
  + '.tw-empty{min-height:44px;padding:0 16px;border-radius:22px;border:2px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-body);font-weight:800;font-size:15px;cursor:pointer;touch-action:manipulation;} .tw-empty[hidden]{display:block;visibility:hidden;}'
  /* the strings */
  + '.tw-strings{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:3;overflow:visible;}'
  + '.tw-string{fill:none;stroke:#C2562E;stroke-width:4;stroke-linecap:round;filter:drop-shadow(0 1px 1px rgba(0,0,0,.25));}'
  + '.tw-knot{fill:#C2562E;stroke:#fff;stroke-width:2;}'
  + '.tw-wrap.is-done .tw-string{stroke:var(--lcs-structure);} .tw-wrap.is-done .tw-knot{fill:var(--lcs-structure);}'
  /* numbers */
  + '.tw-num{position:absolute;right:-2px;top:-2px;min-width:28px;height:28px;padding:0 5px;box-sizing:border-box;border-radius:14px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:16px;line-height:24px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);pointer-events:none;z-index:4;transform:rotate(calc(-1 * var(--tw-tilt,0deg)));}'
  + '.tw-num:not(.is-on){display:none;} .tw-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:36px;height:36px;line-height:32px;font-size:21px;border-radius:18px;}'
  + '.tw-wrap.is-narrow .tw-num{min-width:20px;height:20px;padding:0 3px;font-size:12px;line-height:16px;right:-4px;top:-4px;} .tw-wrap.is-narrow .tw-num.is-gold{min-width:26px;height:26px;line-height:22px;font-size:15px;}'
  + '.tw-wrap.is-narrow .tw-tick{width:14px;height:14px;border-width:1.5px;} .tw-wrap.is-narrow .tw-tick::after{border-width:0 2px 2px 0;}'
  + '.tw-wrap.is-stack,.tw-wrap.is-narrow{row-gap:2px;}'
  + '.tw-wrap.is-stack .tw-pool,.tw-wrap.is-narrow .tw-pool{border-radius:20px;} .tw-wrap.is-stack .tw-pool::before,.tw-wrap.is-narrow .tw-pool::before{inset:6px;border-radius:16px;}'
  + '@media (prefers-reduced-motion:reduce){.tw-place .tw-pic{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'tw-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = TwinPoolsActivity;
if (typeof window !== 'undefined') window.TwinPoolsActivity = TwinPoolsActivity;
