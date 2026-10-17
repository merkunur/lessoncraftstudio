/* =====================================================================
   number-lift-activity.js — ACTIVITY #19 of the one-by-one rebuild:
   "Which number is bigger?" (K.CC.C.7) — THE NUMBER ELEVATOR.
   Design sheet: docs/activities-rebuild/019-number-lift.md
   ---------------------------------------------------------------------
   A building of ten floors (five up to five), its numbers on the wall in
   counting order — a number line stood upright, with an elevator shaft.
   Two library animals wait as passengers, each holding a ticket to a
   floor. "Who goes higher?" The child can look for both numbers on the
   building, taps the passenger going higher (the bigger number) and
   presses Check. Right → the elevator car carries both tickets up, drops
   one at the lower floor and takes the other higher. Miss 1 → a hint (find
   both numbers / count the floors); miss 2 → both floors light up. The car
   carries the tickets, never the pictures (library pictures stay big).
   No mascot is drawn.

   ACTIVITY LAYER ONLY: the model is number-lift-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.NumberLiftActivity.st / ._order / ._pool / .RIDE_MS.
   ===================================================================== */
'use strict';

var NumberLiftActivity = {
  id: 'number-lift',
  apparatusClasses: ['nl-'],

  strings: {
    title:        {en:'The Number Elevator',de:'Der Zahlenaufzug',fr:'L’ascenseur des nombres',es:'El elevador de números',pt:'O elevador dos números',it:'L’ascensore dei numeri',nl:'De getallenlift',sv:'Talhissen',da:'Tal-elevatoren',no:'Tallheisen',fi:'Lukuhissi'},
    instruction:  {en:'Two passengers take the elevator. Which number is bigger? Find both numbers on the building — the bigger number is higher up — and tap the passenger going higher.',de:'Zwei Fahrgäste fahren mit dem Aufzug. Welche Zahl ist größer? Suche beide Zahlen am Haus – die größere Zahl ist weiter oben – und tippe auf den Fahrgast, der höher fährt.',fr:'Deux passagers prennent l’ascenseur. Quel nombre est le plus grand ? Cherche les deux nombres sur l’immeuble — le plus grand est plus haut — et touche le passager qui monte le plus haut.',es:'Dos pasajeros suben al elevador. ¿Qué número es mayor? Busca los dos números en el edificio —el mayor está más arriba— y toca al pasajero que sube más alto.',pt:'Dois passageiros pegam o elevador. Qual número é maior? Procure os dois números no prédio — o maior fica mais alto — e toque no passageiro que sobe mais alto.',it:'Due passeggeri prendono l’ascensore. Quale numero è più grande? Cerca i due numeri sul palazzo — il più grande è più in alto — e tocca il passeggero che sale più in alto.',nl:'Twee passagiers nemen de lift. Welk getal is groter? Zoek beide getallen op het gebouw – het grotere getal staat hoger – en tik op de passagier die hoger gaat.',sv:'Två passagerare åker hiss. Vilket tal är större? Leta upp båda talen på huset – det större talet sitter högre upp – och tryck på passageraren som åker högre.',da:'To passagerer tager elevatoren. Hvilket tal er størst? Find begge tal på huset – det største tal sidder højest oppe – og tryk på den passager, der kører højest op.',no:'To passasjerer tar heisen. Hvilket tall er størst? Finn begge tallene på huset – det største tallet sitter høyest oppe – og trykk på passasjeren som skal høyest.',fi:'Kaksi matkustajaa menee hissiin. Kumpi luku on suurempi? Etsi molemmat luvut talon seinästä – suurempi luku on ylempänä – ja napauta matkustajaa, joka menee ylemmäs.'},
    prompt:       {en:'Who goes higher? Tap the passenger with the bigger number, then press Check.',de:'Wer fährt höher? Tippe auf den Fahrgast mit der größeren Zahl und drücke dann auf Prüfen.',fr:'Qui monte le plus haut ? Touche le passager qui a le plus grand nombre, puis appuie sur Vérifier.',es:'¿Quién sube más alto? Toca al pasajero con el número mayor y luego oprime Comprobar.',pt:'Quem sobe mais alto? Toque no passageiro com o número maior e depois aperte Verificar.',it:'Chi sale più in alto? Tocca il passeggero con il numero più grande, poi premi Verifica.',nl:'Wie gaat hoger? Tik op de passagier met het grotere getal en druk dan op Controleer.',sv:'Vem åker högre? Tryck på passageraren med det större talet och tryck sedan på Kontrollera.',da:'Hvem kører højest op? Tryk på passageren med det største tal, og tryk så på Tjek.',no:'Hvem skal høyest? Trykk på passasjeren med det største tallet, og trykk så på Sjekk.',fi:'Kumpi menee ylemmäs? Napauta matkustajaa, jolla on suurempi luku, ja paina sitten Tarkista.'},
    passengerAria:{en:'Going to floor {n}',de:'Fährt in Stockwerk {n}',fr:'Va à l’étage {n}',es:'Va al piso {n}',pt:'Vai para o andar {n}',it:'Va al piano {n}',nl:'Gaat naar verdieping {n}',sv:'Ska till våning {n}',da:'Skal til etage {n}',no:'Skal til etasje {n}',fi:'Menee kerrokseen {n}'},
    buildingLabel:{en:'The building: floors 1 to {f}',de:'Das Haus: Stockwerke 1 bis {f}',fr:'L’immeuble : étages 1 à {f}',es:'El edificio: pisos del 1 al {f}',pt:'O prédio: andares de 1 a {f}',it:'Il palazzo: piani da 1 a {f}',nl:'Het gebouw: verdiepingen 1 tot en met {f}',sv:'Huset: våning 1 till {f}',da:'Huset: etage 1 til {f}',no:'Huset: etasje 1 til {f}',fi:'Talo: kerrokset 1–{f}'},
    hintStart:    {en:'Tap the passenger going higher.',de:'Tippe auf den Fahrgast, der höher fährt.',fr:'Touche le passager qui monte le plus haut.',es:'Toca al pasajero que sube más alto.',pt:'Toque no passageiro que sobe mais alto.',it:'Tocca il passeggero che sale più in alto.',nl:'Tik op de passagier die hoger gaat.',sv:'Tryck på passageraren som åker högre.',da:'Tryk på den passager, der kører højest op.',no:'Trykk på passasjeren som skal høyest.',fi:'Napauta matkustajaa, joka menee ylemmäs.'},
    hintFind:     {en:'Find both numbers on the building. Which one is higher up?',de:'Suche beide Zahlen am Haus. Welche ist weiter oben?',fr:'Cherche les deux nombres sur l’immeuble. Lequel est le plus haut ?',es:'Busca los dos números en el edificio. ¿Cuál está más arriba?',pt:'Procure os dois números no prédio. Qual fica mais alto?',it:'Cerca i due numeri sul palazzo. Qual è più in alto?',nl:'Zoek beide getallen op het gebouw. Welk getal staat hoger?',sv:'Leta upp båda talen på huset. Vilket sitter högre upp?',da:'Find begge tal på huset. Hvilket sidder højest oppe?',no:'Finn begge tallene på huset. Hvilket sitter høyest oppe?',fi:'Etsi molemmat luvut talon seinästä. Kumpi on ylempänä?'},
    hintCount:    {en:'Count the floors from the bottom to find both numbers. Which one is higher up?',de:'Zähle die Stockwerke von unten, um beide Zahlen zu finden. Welche ist weiter oben?',fr:'Compte les étages depuis le bas pour trouver les deux nombres. Lequel est le plus haut ?',es:'Cuenta los pisos desde abajo para encontrar los dos números. ¿Cuál está más arriba?',pt:'Conte os andares de baixo para cima para achar os dois números. Qual fica mais alto?',it:'Conta i piani dal basso per trovare i due numeri. Qual è più in alto?',nl:'Tel de verdiepingen van onderaf om beide getallen te vinden. Welk getal staat hoger?',sv:'Räkna våningarna nerifrån för att hitta båda talen. Vilket sitter högre upp?',da:'Tæl etagerne nedefra for at finde begge tal. Hvilket sidder højest oppe?',no:'Tell etasjene nedenfra for å finne begge tallene. Hvilket sitter høyest oppe?',fi:'Laske kerrokset alhaalta löytääksesi molemmat luvut. Kumpi on ylempänä?'},
    hintLit:      {en:'Look at the two lit floors. The one higher up is the bigger number.',de:'Schau dir die beiden leuchtenden Stockwerke an. Das obere ist die größere Zahl.',fr:'Regarde les deux étages allumés. Le plus haut, c’est le plus grand nombre.',es:'Mira los dos pisos iluminados. El de más arriba es el número mayor.',pt:'Olhe os dois andares acesos. O mais alto é o número maior.',it:'Guarda i due piani illuminati. Quello più in alto è il numero più grande.',nl:'Kijk naar de twee verlichte verdiepingen. De hoogste is het grotere getal.',sv:'Titta på de två tända våningarna. Den högre är det större talet.',da:'Se på de to oplyste etager. Den øverste er det største tal.',no:'Se på de to opplyste etasjene. Den øverste er det største tallet.',fi:'Katso kahta valaistua kerrosta. Ylempi on suurempi luku.'},
    celebrate:    {en:'Yes — {b} is bigger than {s}!',de:'Ja – {b} ist größer als {s}!',fr:'Oui — {b} est plus grand que {s} !',es:'¡Sí: {b} es mayor que {s}!',pt:'Isso: {b} é maior que {s}!',it:'Sì: {b} è più grande di {s}!',nl:'Ja – {b} is groter dan {s}!',sv:'Ja – {b} är större än {s}!',da:'Ja – {b} er større end {s}!',no:'Ja – {b} er større enn {s}!',fi:'Kyllä – {b} on suurempi kuin {s}!'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:     {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',es:'Hasta 5',pt:'Até 5',it:'Fino a 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:    {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setLabels:    {en:'Floor numbers',de:'Stockwerkszahlen',fr:'Numéros des étages',es:'Números de los pisos',pt:'Números dos andares',it:'Numeri dei piani',nl:'Verdiepingsnummers',sv:'Våningsnummer',da:'Etagenumre',no:'Etasjenumre',fi:'Kerrosnumerot'},
    labelsShown:  {en:'On the wall',de:'An der Wand',fr:'Sur le mur',es:'En la pared',pt:'Na parede',it:'Sul muro',nl:'Op de muur',sv:'På väggen',da:'På væggen',no:'På veggen',fi:'Seinässä'},
    labelsHidden: {en:'Hidden — count the floors',de:'Versteckt – Stockwerke zählen',fr:'Cachés — compter les étages',es:'Escondidos: contar los pisos',pt:'Escondidos: contar os andares',it:'Nascosti: contare i piani',nl:'Verborgen – verdiepingen tellen',sv:'Dolda – räkna våningarna',da:'Skjulte – tæl etagerne',no:'Skjult – tell etasjene',fi:'Piilossa – laske kerrokset'}
  },

  defaults: { range: 'to10', labels: 'shown' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'labels', type: 'choice', labelKey: 'setLabels', options: [{ value: 'shown', labelKey: 'labelsShown' }, { value: 'hidden', labelKey: 'labelsHidden' }] }
  ],

  RIDE_MS: 260,   /* per floor */

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null; this._rideTimer = null;
    injectNumberLiftCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(NumberLiftCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the passengers stay bare */ });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } clearTimeout(this._rideTimer); },
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return NumberLiftCore.POOLS[r] ? r : 'to10'; },
  _labels: function () { var l = this.api && this.api.settings && this.api.settings.labels; return l === 'hidden' ? 'hidden' : 'shown'; },
  _ensurePool: function () { var key = this._range() + ':' + this._labels(); if (!this._pool || this._poolKey !== key) { this._pool = NumberLiftCore.rounds(this._range(), 'nl', this._labels()); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'number-lift.' + r.id,
      promptKey: 'prompt',
      promptArgs: { b: Math.max(r.left, r.right), s: Math.min(r.left, r.right) },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = NumberLiftCore.newState(r); clearTimeout(tool._rideTimer); tool._riding = null; },
      check: function (tool) { var res = NumberLiftCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return NumberLiftCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  _t: function (key, args) { return String(this.api.t(key)).replace(/\{(\w+)\}/g, function (m, k) { return args && k in args ? args[k] : m; }); },
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this, C = NumberLiftCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'nl')[0]);
    var wrap = api.el('div', 'nl-wrap'); this._wrap = wrap;
    /* the building: floors from the top down, a shaft with the car */
    var bld = api.el('div', 'nl-building'); bld.setAttribute('role', 'img');
    bld.innerHTML = '<span class="nl-roof" aria-hidden="true"></span>';
    var floorsEl = api.el('div', 'nl-floors'); floorsEl.setAttribute('aria-hidden', 'true');
    this._floorEls = [];
    for (var f = 10; f >= 1; f--) {
      var row = api.el('div', 'nl-floor'); row.setAttribute('data-f', String(f));
      row.innerHTML = '<span class="nl-fnum">' + f + '</span><span class="nl-win"></span><span class="nl-win"></span><span class="nl-drop"></span>';
      floorsEl.appendChild(row); this._floorEls[f] = row;
    }
    bld.appendChild(floorsEl);
    var shaft = api.el('div', 'nl-shaft'); shaft.setAttribute('aria-hidden', 'true');
    var car = api.el('div', 'nl-car'); car.innerHTML = '<span class="nl-car-t nl-ta"></span><span class="nl-car-t nl-tb"></span>';
    shaft.appendChild(car); bld.appendChild(shaft);
    this._bld = bld; this._shaft = shaft; this._car = car;
    wrap.appendChild(bld);
    /* the passengers */
    var pax = api.el('div', 'nl-pax');
    this._pax = {};
    ['left', 'right'].forEach(function (side) {
      var b = api.el('button', 'nl-p nl-p-' + side); b.type = 'button';
      b.addEventListener('click', function () { self._choose(side); });
      b.innerHTML = '<span class="nl-pic-box"></span><span class="nl-ticket"><span class="nl-tnum"></span></span>';
      pax.appendChild(b); self._pax[side] = b;
    });
    wrap.appendChild(pax);
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = NumberLiftCore.layout(this._width(), st ? st.floors : 10), w = this._wrap;
    ['wide', 'stack'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--nl-fh', L.floorH + 'px');
    w.style.setProperty('--nl-bw', L.buildW + 'px');
    w.style.setProperty('--nl-pic', L.pic + 'px');
    this._layoutFor = st ? st.floors : 10;
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
  _carTo: function (floor) {
    /* the car's bottom sits on that floor's line (floor 1 = the bottom of the building) */
    this._car.style.transform = 'translateY(' + (-(floor - 1) * this._L.floorH) + 'px)';
  },

  _paint: function () {
    var st = this.st, C = NumberLiftCore, L = this._L, self = this;
    if (this._layoutFor !== st.floors) this._layout();
    var w = this._wrap;
    w.classList.toggle('is-done', st.done);
    w.classList.toggle('labels-hidden', st.labels === 'hidden');
    this._bld.setAttribute('aria-label', this._t('buildingLabel', { f: st.floors }));
    var lit = C.litFloors(st), riding = this._riding;
    for (var f = 1; f <= 10; f++) {
      var row = this._floorEls[f];
      row.hidden = f > st.floors;
      row.classList.toggle('is-lit', lit.indexOf(f) >= 0);
      row.classList.toggle('lit-a', lit.length && f === st.left);
      row.classList.toggle('lit-b', lit.length && f === st.right);
      var drop = row.querySelector('.nl-drop');
      var dropped = riding ? riding.dropped : (st.done ? [st.left, st.right] : []);
      drop.textContent = (dropped.indexOf(f) >= 0) ? String(f) : '';
      drop.className = 'nl-drop' + (dropped.indexOf(f) >= 0 ? (f === st.left ? ' is-a' : ' is-b') : '');
    }
    /* the passengers */
    ['left', 'right'].forEach(function (side, k) {
      var b = self._pax[side], n = st[side], noun = st.animals[k];
      var box = b.querySelector('.nl-pic-box'), img = box.querySelector('img');
      if (img && img.getAttribute('data-noun') !== noun) { img.remove(); img = null; }
      if (!img && self._theme && self._theme.nouns[noun]) { img = LCSPictures.img(self._theme, noun, self.api.lang, { plural: false }); img.className = 'nl-pic'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.setAttribute('data-noun', noun); box.appendChild(img); }
      b.querySelector('.nl-tnum').textContent = String(n);
      b.setAttribute('aria-label', self._t('passengerAria', { n: n }));
      b.setAttribute('aria-pressed', String(st.choice === side));
      b.classList.toggle('is-on', st.choice === side);
      b.disabled = st.done;
    });
    this._car.querySelector('.nl-ta').textContent = (riding && riding.dropped.indexOf(st.left) < 0) ? String(st.left) : '';
    this._car.querySelector('.nl-tb').textContent = (riding && riding.dropped.indexOf(st.right) < 0) ? String(st.right) : '';
    if (!riding) this._carTo(st.done ? C.bigger(st) : 1);
  },

  /* ---------------- the hand ---------------- */
  _choose: function (side) {
    if (!NumberLiftCore.choose(this.st, side)) return;
    this.api.sound(500);
    this._paint();
    this.api.track('choose', { choice: side });
  },
  /* the ride: up to the lower floor (one ticket gets off), on to the higher one (the other) */
  _ride: function () {
    var st = this.st, self = this, stops = NumberLiftCore.ride(st);
    if (!stops.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { this._riding = null; this._paint(); return; }
    this._riding = { dropped: [] };
    this._car.style.transition = 'none'; this._carTo(1); void this._car.offsetHeight;
    this._paint();
    var go = function (k, from) {
      if (k >= stops.length || !self._riding) { self._riding = null; if (self._wrap && self._wrap.isConnected) self._paint(); return; }
      var to = stops[k], dur = Math.max(1, to - from) * self.RIDE_MS;
      self._car.style.transition = 'transform ' + dur + 'ms ease-in-out';
      self._carTo(to);
      self._rideTimer = setTimeout(function () {
        if (!self._riding) return;
        self._riding.dropped.push(to); self.api.sound(560 + 30 * to); self._paint();
        bounce(self._floorEls[to].querySelector('.nl-drop'), 'nl-pop');
        self._rideTimer = setTimeout(function () { go(k + 1, to); }, 260);
      }, dur + 30);
    };
    go(0, 1);
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._paint();
    if (res.slip === 'none') return;
    if (res.ok) {
      this.api.sound(660);
      this._ride();
      if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'number', text: String(NumberLiftCore.bigger(st)), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ } }
    } else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, choice: res.choice, misses: st.misses });
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var nlCssDone = false;
function injectNumberLiftCSS() {
  if (nlCssDone || typeof document === 'undefined') return;
  nlCssDone = true;
  var css = ''
  + '.nl-wrap{width:100%;display:flex;align-items:flex-end;justify-content:center;gap:28px;--nl-fh:40px;--nl-bw:168px;--nl-pic:110px;}'
  /* the building: brick front, a roof, the floors from the top down, the shaft on the right */
  + '.nl-building{position:relative;width:var(--nl-bw);flex:none;padding-top:22px;}'
  + '.nl-roof{position:absolute;left:-8px;right:-8px;top:0;height:24px;border-radius:8px 8px 2px 2px;background:linear-gradient(180deg,#B85C38,#9A4A2C);box-shadow:0 3px 0 rgba(0,0,0,.12);}'
  + '.nl-floors{position:relative;border-radius:0 0 6px 6px;background:#F3DEC2;box-shadow:inset 0 0 0 3px #D9B98F,0 8px 16px rgba(80,50,20,.16);padding-right:calc(var(--nl-bw) * .3);}'
  + '.nl-floor{position:relative;height:var(--nl-fh);box-sizing:border-box;border-bottom:2px solid #E2C59C;display:flex;align-items:center;gap:6px;padding-left:6px;transition:background .2s;} .nl-floor[hidden]{display:none;}'
  + '.nl-floor:last-child{border-bottom:0;}'
  + '.nl-fnum{min-width:30px;font-family:var(--lcs-font-display);font-weight:800;font-size:clamp(15px,calc(var(--nl-fh) * .5),26px);color:#7A4E0E;text-align:center;line-height:1;}'
  + '.nl-wrap.labels-hidden .nl-fnum{color:transparent;}'
  + '.nl-win{width:calc(var(--nl-fh) * .55);height:calc(var(--nl-fh) * .55);border-radius:4px;background:linear-gradient(180deg,#CFE6EE,#A9D0DD);box-shadow:inset 0 0 0 2px #fff;flex:none;}'
  + '.nl-floor.is-lit{background:#FFF1B8;} .nl-floor.is-lit .nl-win{background:linear-gradient(180deg,#FFE58A,#F6C945);}'
  + '.nl-floor.lit-a{box-shadow:inset 6px 0 0 #E4572E;} .nl-floor.lit-b{box-shadow:inset 6px 0 0 #2E86AB;}'
  /* the ticket a passenger leaves on a floor */
  + '.nl-drop{position:absolute;right:calc(var(--nl-bw) * -.02);top:50%;transform:translate(0,-50%);min-width:30px;height:calc(var(--nl-fh) * .7);max-height:30px;padding:0 6px;box-sizing:border-box;border-radius:6px;font-family:var(--lcs-font-display);font-weight:800;font-size:15px;line-height:1;display:none;align-items:center;justify-content:center;color:#fff;z-index:2;}'
  + '.nl-drop.is-a,.nl-drop.is-b{display:flex;} .nl-drop.is-a{background:#E4572E;} .nl-drop.is-b{background:#2E86AB;}'
  + '.nl-drop.nl-pop{animation:nl-pop .3s var(--lcs-ease) 1;} @keyframes nl-pop{0%{transform:translate(0,-50%) scale(0);}70%{transform:translate(0,-50%) scale(1.2);}100%{transform:translate(0,-50%) scale(1);}}'
  /* the shaft and the car */
  + '.nl-shaft{position:absolute;right:4px;bottom:0;top:22px;width:calc(var(--nl-bw) * .26);border-radius:4px;background:repeating-linear-gradient(180deg,#8E8A84 0 2px,#B9B4AC 2px var(--nl-fh));box-shadow:inset 0 0 0 2px #6E6A64;}'
  + '.nl-car{position:absolute;left:3px;right:3px;bottom:2px;height:calc(var(--nl-fh) - 4px);border-radius:5px;background:linear-gradient(180deg,#F7F2E8,#DCD3C2);box-shadow:inset 0 0 0 2px #7A6F5E,0 2px 4px rgba(0,0,0,.25);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;transition:transform .4s ease-in-out;}'
  + '.nl-car-t{min-width:18px;padding:0 3px;border-radius:4px;color:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:12px;line-height:14px;text-align:center;} .nl-car-t:empty{display:none;} .nl-ta{background:#E4572E;} .nl-tb{background:#2E86AB;}'
  /* the passengers: a library animal holding a ticket */
  + '.nl-pax{display:flex;gap:18px;align-items:flex-end;}'
  + '.nl-p{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 12px 10px;border-radius:22px;border:3px solid transparent;background:#fff;cursor:pointer;touch-action:manipulation;box-shadow:0 4px 12px rgba(40,40,30,.12);-webkit-tap-highlight-color:transparent;}'
  + '.nl-p:hover:not(:disabled){box-shadow:0 6px 16px rgba(20,107,94,.22);} .nl-p.is-on{border-color:var(--lcs-structure);box-shadow:0 0 0 4px rgba(20,107,94,.18),0 6px 16px rgba(20,107,94,.22);} .nl-p:disabled{cursor:default;}'
  + '.nl-p:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.nl-pic-box{width:var(--nl-pic);height:var(--nl-pic);display:block;} .nl-pic{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 3px 2px rgba(40,30,10,.2));}'
  + '.nl-ticket{position:relative;min-width:72px;padding:6px 16px;border-radius:8px;color:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:34px;line-height:1;box-shadow:0 3px 6px rgba(0,0,0,.18);background-image:radial-gradient(circle at 0 50%,#fff 0 6px,transparent 7px),radial-gradient(circle at 100% 50%,#fff 0 6px,transparent 7px);}'
  + '.nl-p-left .nl-ticket{background-color:#E4572E;} .nl-p-right .nl-ticket{background-color:#2E86AB;}'
  /* phones: the two passengers side by side beside the building, at the same height (on screen, height only ever means floors) */
  + '.nl-wrap.is-stack{gap:10px;} .nl-wrap.is-stack .nl-pax{gap:8px;} .nl-wrap.is-stack .nl-p{padding:8px;gap:6px;border-radius:16px;} .nl-wrap.is-stack .nl-ticket{font-size:26px;min-width:0;padding:4px 12px;}'
  + '.nl-wrap.is-stack .nl-fnum{min-width:22px;} .nl-wrap.is-stack .nl-win:nth-of-type(3){display:none;}'
  + '@media (prefers-reduced-motion:reduce){.nl-car{transition:none!important;}.nl-drop{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'nl-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = NumberLiftActivity;
if (typeof window !== 'undefined') window.NumberLiftActivity = NumberLiftActivity;
