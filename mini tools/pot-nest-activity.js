/* =====================================================================
   pot-nest-activity.js — ACTIVITY #22 of the one-by-one rebuild:
   THE NESTING POTS ("Grandpa Pip's Nesting Pots", K.CC.C.7).
   ---------------------------------------------------------------------
   A row of pots that all look the same — only the painted numbers differ —
   above the nest. Tap a pot: it drops into the nest and grows to its
   number. Smaller than the innermost pot → it settles inside; not smaller →
   it sticks out over the rim, wobbles and goes back to the row (a bounce).
   Tap the inside pot to lift it back out. Check when the row is empty.
   From two bounces (or the "always" setting) dots show on the waiting pots.
   Model: pot-nest-core.js. Tool-grade drawn pots, no pictures, no mascot.
   0 lines to lcs-shell.* or any shared core.
   Test seams: window.PotNestActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var PotNestActivity = {
  id: 'pot-nest',
  apparatusClasses: ['pn-'],

  strings: {
    title:        {en:'The Nesting Pots',de:'Die Blumentöpfe',fr:'Les pots gigognes',es:'Las macetas encajables',pt:'Os vasinhos de encaixe',it:'I vasetti a incastro',nl:'De bloempotjes',sv:'Blomkrukorna',da:'Urtepotterne',no:'Blomsterpottene',fi:'Kukkaruukut'},
    instruction:  {en:'Every pot in the row looks the same — only its number is different. Tap a pot: it drops into the others and grows to its number. A pot only fits inside a pot with a bigger number, so start with the biggest and go down to the smallest. Press Check when all the pots are in.',de:'Alle Töpfe in der Reihe sehen gleich aus – nur die Zahl ist anders. Tippe einen Topf an: Er rutscht in die anderen hinein und wächst auf seine Zahl. Ein Topf passt nur in einen Topf mit einer größeren Zahl, also fang mit der größten an und mach weiter bis zur kleinsten. Drücke auf Prüfen, wenn alle Töpfe drin sind.',fr:'Tous les pots de la rangée se ressemblent — seul leur nombre change. Touche un pot : il tombe dans les autres et prend la taille de son nombre. Un pot ne rentre que dans un pot au nombre plus grand : commence par le plus grand et descends jusqu’au plus petit. Appuie sur Vérifier quand tous les pots sont rangés.',es:'Todas las macetas de la fila se ven iguales; solo cambia su número. Toca una maceta: cae dentro de las otras y crece hasta su número. Una maceta solo cabe dentro de una maceta con un número mayor, así que empieza por el mayor y baja hasta el menor. Oprime Comprobar cuando estén todas adentro.',pt:'Todos os vasinhos da fileira parecem iguais — só o número muda. Toque em um vasinho: ele cai dentro dos outros e cresce até o seu número. Um vasinho só cabe dentro de um vasinho com um número maior, então comece pelo maior e vá até o menor. Aperte Verificar quando todos estiverem dentro.',it:'Tutti i vasetti nella fila sembrano uguali: cambia solo il numero. Tocca un vasetto: scende negli altri e cresce fino al suo numero. Un vasetto entra solo in un vasetto con un numero più grande, quindi comincia dal più grande e scendi fino al più piccolo. Premi Verifica quando sono tutti dentro.',nl:'Alle potjes in de rij zien er hetzelfde uit – alleen het getal is anders. Tik op een potje: het zakt in de andere en groeit tot zijn getal. Een potje past alleen in een potje met een groter getal, dus begin met het grootste en ga door tot het kleinste. Druk op Controleer als alle potjes erin zitten.',sv:'Alla krukor i raden ser likadana ut – bara talet är olika. Tryck på en kruka: den sjunker ner i de andra och växer till sitt tal. En kruka får bara plats i en kruka med ett större tal, så börja med det största och fortsätt ner till det minsta. Tryck på Kontrollera när alla krukor är på plats.',da:'Alle potter i rækken ser ens ud – kun tallet er forskelligt. Tryk på en potte: den falder ned i de andre og vokser til sit tal. En potte kan kun være i en potte med et større tal, så begynd med det største, og fortsæt ned til det mindste. Tryk på Tjek, når alle potterne er på plads.',no:'Alle pottene i raden ser like ut – bare tallet er forskjellig. Trykk på en potte: den synker ned i de andre og vokser til tallet sitt. En potte får bare plass i en potte med et større tall, så begynn med det største og fortsett ned til det minste. Trykk på Sjekk når alle pottene er oppi.',fi:'Kaikki rivin ruukut näyttävät samanlaisilta – vain luku on eri. Napauta ruukkua: se putoaa muiden sisään ja kasvaa lukunsa kokoiseksi. Ruukku mahtuu vain sellaisen ruukun sisään, jossa on suurempi luku, joten aloita suurimmasta ja jatka pienimpään asti. Paina Tarkista, kun kaikki ruukut ovat sisällä.'},
    prompt:       {en:'Biggest number first: tap the pots in order, then press Check.',de:'Größte Zahl zuerst: Tippe die Töpfe der Reihe nach an und drücke dann auf Prüfen.',fr:'Le plus grand nombre d’abord : touche les pots dans l’ordre, puis appuie sur Vérifier.',es:'Primero el número mayor: toca las macetas en orden y luego oprime Comprobar.',pt:'Primeiro o número maior: toque nos vasinhos em ordem e depois aperte Verificar.',it:'Prima il numero più grande: tocca i vasetti in ordine, poi premi Verifica.',nl:'Grootste getal eerst: tik de potjes op volgorde aan en druk dan op Controleer.',sv:'Största talet först: tryck på krukorna i ordning och tryck sedan på Kontrollera.',da:'Største tal først: tryk på potterne i rækkefølge, og tryk så på Tjek.',no:'Største tall først: trykk på pottene i rekkefølge, og trykk så på Sjekk.',fi:'Suurin luku ensin: napauta ruukkuja järjestyksessä ja paina sitten Tarkista.'},
    potAria:      {en:'The pot with the number {n}',de:'Der Topf mit der Zahl {n}',fr:'Le pot avec le nombre {n}',es:'La maceta con el número {n}',pt:'O vasinho com o número {n}',it:'Il vasetto con il numero {n}',nl:'Het potje met het getal {n}',sv:'Krukan med talet {n}',da:'Potten med tallet {n}',no:'Potten med tallet {n}',fi:'Ruukku, jossa on luku {n}'},
    liftAria:     {en:'Take out the pot with the number {n}',de:'Den Topf mit der Zahl {n} herausnehmen',fr:'Sortir le pot avec le nombre {n}',es:'Sacar la maceta con el número {n}',pt:'Tirar o vasinho com o número {n}',it:'Togliere il vasetto con il numero {n}',nl:'Het potje met het getal {n} eruit halen',sv:'Ta ut krukan med talet {n}',da:'Tag potten med tallet {n} ud',no:'Ta ut potten med tallet {n}',fi:'Ota pois ruukku, jossa on luku {n}'},
    hintStart:    {en:'Find the biggest number — it is the outside pot.',de:'Such die größte Zahl – das ist der äußerste Topf.',fr:'Cherche le plus grand nombre : c’est le pot extérieur.',es:'Busca el número mayor: es la maceta de afuera.',pt:'Procure o número maior: é o vasinho de fora.',it:'Cerca il numero più grande: è il vasetto più esterno.',nl:'Zoek het grootste getal – dat is het buitenste potje.',sv:'Leta upp det största talet – det är den yttersta krukan.',da:'Find det største tal – det er den yderste potte.',no:'Finn det største tallet – det er den ytterste potten.',fi:'Etsi suurin luku – se on uloin ruukku.'},
    hintMore:     {en:'Some pots are still waiting. Each one fits inside a pot with a bigger number.',de:'Ein paar Töpfe warten noch. Jeder passt in einen Topf mit einer größeren Zahl.',fr:'Des pots attendent encore. Chacun rentre dans un pot au nombre plus grand.',es:'Todavía esperan algunas macetas. Cada una cabe dentro de una maceta con un número mayor.',pt:'Ainda há vasinhos esperando. Cada um cabe dentro de um vasinho com um número maior.',it:'Alcuni vasetti aspettano ancora. Ognuno entra in un vasetto con un numero più grande.',nl:'Er wachten nog potjes. Elk potje past in een potje met een groter getal.',sv:'Några krukor väntar fortfarande. Varje kruka får plats i en kruka med ett större tal.',da:'Nogle potter venter stadig. Hver potte kan være i en potte med et større tal.',no:'Noen potter venter fortsatt. Hver potte får plass i en potte med et større tall.',fi:'Osa ruukuista odottaa vielä. Jokainen mahtuu ruukkuun, jossa on suurempi luku.'},
    hintStuck:    {en:'No waiting pot fits inside the last one. Tap the inside pot to take it out — and look for a bigger number first.',de:'Kein wartender Topf passt in den letzten. Tippe den inneren Topf an, um ihn herauszunehmen – und such zuerst eine größere Zahl.',fr:'Aucun pot qui attend ne rentre dans le dernier. Touche le pot intérieur pour le sortir — et cherche d’abord un plus grand nombre.',es:'Ninguna maceta que espera cabe en la última. Toca la maceta de adentro para sacarla y busca primero un número mayor.',pt:'Nenhum vasinho que espera cabe no último. Toque no vasinho de dentro para tirá-lo — e procure antes um número maior.',it:'Nessun vasetto che aspetta entra nell’ultimo. Tocca il vasetto più interno per toglierlo e cerca prima un numero più grande.',nl:'Geen wachtend potje past in het laatste. Tik op het binnenste potje om het eruit te halen – en zoek eerst een groter getal.',sv:'Ingen väntande kruka får plats i den sista. Tryck på den innersta krukan för att ta ut den – och leta först efter ett större tal.',da:'Ingen ventende potte kan være i den sidste. Tryk på den inderste potte for at tage den ud – og find først et større tal.',no:'Ingen ventende potte får plass i den siste. Trykk på den innerste potten for å ta den ut – og finn først et større tall.',fi:'Mikään odottava ruukku ei mahdu viimeisen sisään. Ota sisin ruukku pois napauttamalla sitä – ja etsi ensin suurempi luku.'},
    hintDots:     {en:'Count the dots on the waiting pots: the most dots is the biggest number.',de:'Zähle die Punkte auf den wartenden Töpfen: Die meisten Punkte hat die größte Zahl.',fr:'Compte les points sur les pots qui attendent : le plus de points, c’est le plus grand nombre.',es:'Cuenta los puntos de las macetas que esperan: la que tiene más puntos es el número mayor.',pt:'Conte as bolinhas nos vasinhos que esperam: o que tem mais bolinhas é o número maior.',it:'Conta i pallini sui vasetti che aspettano: quello con più pallini è il numero più grande.',nl:'Tel de stippen op de wachtende potjes: de meeste stippen heeft het grootste getal.',sv:'Räkna prickarna på de väntande krukorna: flest prickar har det största talet.',da:'Tæl prikkerne på de ventende potter: flest prikker har det største tal.',no:'Tell prikkene på de ventende pottene: flest prikker har det største tallet.',fi:'Laske pisteet odottavista ruukuista: eniten pisteitä on suurimmalla luvulla.'},
    celebrate:    {en:'Yes — {list}: from the biggest number to the smallest!',de:'Ja – {list}: von der größten Zahl bis zur kleinsten!',fr:'Oui — {list} : du plus grand nombre au plus petit !',es:'¡Sí: {list}, del número mayor al menor!',pt:'Isso: {list}, do número maior ao menor!',it:'Sì: {list}, dal numero più grande al più piccolo!',nl:'Ja – {list}: van het grootste getal tot het kleinste!',sv:'Ja – {list}: från det största talet till det minsta!',da:'Ja – {list}: fra det største tal til det mindste!',no:'Ja – {list}: fra det største tallet til det minste!',fi:'Kyllä – {list}: suurimmasta luvusta pienimpään!'},
    setRange:     {en:'Pots',de:'Töpfe',fr:'Pots',es:'Macetas',pt:'Vasinhos',it:'Vasetti',nl:'Potjes',sv:'Krukor',da:'Potter',no:'Potter',fi:'Ruukut'},
    rangeTo5:     {en:'Three, up to 5',de:'Drei, bis 5',fr:'Trois, jusqu’à 5',es:'Tres, hasta 5',pt:'Três, até 5',it:'Tre, fino a 5',nl:'Drie, tot en met 5',sv:'Tre, upp till 5',da:'Tre, op til 5',no:'Tre, opptil 5',fi:'Kolme, 5:een asti'},
    rangeTo10:    {en:'Four, up to 10',de:'Vier, bis 10',fr:'Quatre, jusqu’à 10',es:'Cuatro, hasta 10',pt:'Quatro, até 10',it:'Quattro, fino a 10',nl:'Vier, tot en met 10',sv:'Fyra, upp till 10',da:'Fire, op til 10',no:'Fire, opptil 10',fi:'Neljä, 10:een asti'},
    setDots:      {en:'Dots on the pots',de:'Punkte auf den Töpfen',fr:'Points sur les pots',es:'Puntos en las macetas',pt:'Bolinhas nos vasinhos',it:'Pallini sui vasetti',nl:'Stippen op de potjes',sv:'Prickar på krukorna',da:'Prikker på potterne',no:'Prikker på pottene',fi:'Pisteet ruukuissa'},
    dotsHelp:     {en:'Only as a help',de:'Nur als Hilfe',fr:'Seulement en aide',es:'Solo como ayuda',pt:'Só como ajuda',it:'Solo come aiuto',nl:'Alleen als hulp',sv:'Bara som hjälp',da:'Kun som hjælp',no:'Bare som hjelp',fi:'Vain apuna'},
    dotsAlways:   {en:'Always',de:'Immer',fr:'Toujours',es:'Siempre',pt:'Sempre',it:'Sempre',nl:'Altijd',sv:'Alltid',da:'Altid',no:'Alltid',fi:'Aina'}
  },

  defaults: { range: 'to10', dots: 'help' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'dots', type: 'choice', labelKey: 'setDots', options: [{ value: 'help', labelKey: 'dotsHelp' }, { value: 'always', labelKey: 'dotsAlways' }] }
  ],

  /* the pot colours go by place in the row, never by number (a colour must not tell the size) */
  COLOURS: ['#D9733F', '#2E86AB', '#E0A526', '#8E5BA8'],

  init: function (api) {
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._justDropped = null;
    injectPotNestCSS();
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return PotNestCore.POOLS[r] ? r : 'to10'; },
  _dots: function () { var d = this.api && this.api.settings && this.api.settings.dots; return d === 'always' ? 'always' : 'help'; },
  _ensurePool: function () { var key = this._range() + ':' + this._dots(); if (!this._pool || this._poolKey !== key) { this._pool = PotNestCore.rounds(this._range(), 'pn', this._dots()); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'pot-nest.' + r.id,
      promptKey: 'prompt',
      promptArgs: { list: PotNestCore.order(r.pots).join(', ') },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = PotNestCore.newState(r); tool._justDropped = null; },
      check: function (tool) { var res = PotNestCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return PotNestCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  _t: function (key, args) { return String(this.api.t(key)).replace(/\{(\w+)\}/g, function (m, k) { return args && k in args ? args[k] : m; }); },
  render: function () {
    if (!this.api) return;
    var api = this.api, C = PotNestCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'pn')[0]);
    var wrap = api.el('div', 'pn-wrap'); this._wrap = wrap;
    var tray = api.el('div', 'pn-tray'); this._tray = tray;
    var nest = api.el('div', 'pn-nest'); this._nest = nest;
    nest.innerHTML = '<span class="pn-floor" aria-hidden="true"></span>';
    wrap.appendChild(tray); wrap.appendChild(nest);
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = PotNestCore.layout(this._width(), st ? st.max : 10), w = this._wrap;
    ['wide', 'stack'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--pn-tray', L.tray + 'px');
    w.style.setProperty('--pn-band', L.band + 'px');
    this._nest.style.height = L.nestH + 'px';
    this._layoutFor = st ? st.max : 10;
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
  _colour: function (v) { return this.COLOURS[this.st.pots.indexOf(v) % this.COLOURS.length]; },
  _dotsHtml: function (n) { var s = ''; for (var i = 0; i < n; i++) s += '<i></i>'; return s; },

  _paint: function () {
    var st = this.st, C = PotNestCore, L = this._L, self = this, api = this.api;
    if (this._layoutFor !== st.max) this._layout();
    var w = this._wrap, dots = C.dotsOn(st);
    w.classList.toggle('is-done', st.done);
    /* the row: one button per pot of the round, in its place; a used pot leaves an empty place */
    this._tray.innerHTML = '';
    st.pots.forEach(function (v) {
      var waiting = st.tray.indexOf(v) >= 0;
      var b = api.el('button', 'pn-tp' + (waiting ? '' : ' is-used')); b.type = 'button';
      b.style.setProperty('--pn-c', self._colour(v));
      b.setAttribute('data-v', String(v));
      b.innerHTML = '<span class="pn-tp-pot"><span class="pn-tp-n">' + v + '</span>' + (dots && waiting ? '<span class="pn-tp-dots">' + self._dotsHtml(v) + '</span>' : '') + '</span>';
      b.setAttribute('aria-label', self._t('potAria', { n: v }));
      b.disabled = !waiting || st.done;
      if (waiting && !st.done) b.addEventListener('click', function () { self._drop(v, b); });
      self._tray.appendChild(b);
    });
    /* the nest: each pot at its true size, all on the floor, inner pots in front */
    [].slice.call(this._nest.querySelectorAll('.pn-pot')).forEach(function (el) { if (!el.classList.contains('is-bounce')) el.remove(); });
    var cue = C.liftCue(st);
    st.nest.forEach(function (v, i) {
      var isInner = i === st.nest.length - 1;
      var el = document.createElement(isInner && !st.done ? 'button' : 'div');
      el.className = 'pn-pot' + (isInner ? ' is-inner' : '') + (isInner && cue ? ' is-cue' : '') + (self._justDropped === v ? ' pn-drop' : '');
      if (el.tagName === 'BUTTON') { el.type = 'button'; el.setAttribute('aria-label', self._t('liftAria', { n: v })); el.addEventListener('click', function () { self._lift(); }); }
      else el.setAttribute('aria-hidden', 'true');
      el.setAttribute('data-v', String(v));
      el.style.width = L.potW(v) + 'px'; el.style.height = L.potH(v) + 'px'; el.style.zIndex = String(10 + i);
      el.style.setProperty('--pn-c', self._colour(v));
      el.innerHTML = '<span class="pn-rim"><span class="pn-n">' + v + '</span></span><span class="pn-body"></span>';
      self._nest.appendChild(el);
    });
    this._justDropped = null;
  },

  /* ---------------- the hand ---------------- */
  _drop: function (v, btn) {
    var st = this.st, C = PotNestCore, L = this._L, self = this;
    var inner = C.inner(st), res = C.drop(st, v);
    if (res === 'fit') { this._justDropped = v; this.api.sound(380 + 30 * v); this._paint(); }
    else if (res === 'bounce') {
      /* it grows to its size on top of the inside pot, sticks out over the rim, wobbles, and goes back */
      this.api.sound(240);
      var el = document.createElement('div');
      el.className = 'pn-pot is-bounce'; el.setAttribute('aria-hidden', 'true');
      el.style.width = L.potW(v) + 'px'; el.style.height = L.potH(v) + 'px'; el.style.zIndex = '60';
      el.style.bottom = Math.round(10 + L.potH(inner) * 0.55) + 'px';
      el.style.setProperty('--pn-c', this._colour(v));
      el.innerHTML = '<span class="pn-rim"><span class="pn-n">' + v + '</span></span><span class="pn-body"></span>';
      this._nest.appendChild(el);
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 900);
      bounce(btn, 'pn-shake');
      this._paint();
    }
    this.api.track('drop', { v: v, res: res });
  },
  _lift: function () {
    var v = PotNestCore.lift(this.st);
    if (v === null) return;
    this.api.sound(520);
    this._paint();
    this.api.track('lift', { v: v });
  },
  _afterCheck: function (res) {
    this._paint();
    if (res.ok) this.api.sound(660);
    this.api.track('check', { id: this.st.id, ok: res.ok, slip: res.slip, bounces: this.st.bounces });
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var pnCssDone = false;
function injectPotNestCSS() {
  if (pnCssDone || typeof document === 'undefined') return;
  pnCssDone = true;
  var css = ''
  + '.pn-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:18px;--pn-tray:84px;--pn-band:22px;}'
  /* the row of waiting pots: all one size */
  + '.pn-tray{display:flex;gap:12px;justify-content:center;flex-wrap:nowrap;}'
  + '.pn-tp{position:relative;width:var(--pn-tray);height:calc(var(--pn-tray) * 1.05);border:0;padding:0;background:none;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}'
  + '.pn-tp-pot{position:absolute;inset:0;isolation:isolate;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:calc(var(--pn-tray) * .14);}'
  + '.pn-tp-pot::before{content:"";position:absolute;left:0;right:0;top:0;height:30%;border-radius:6px;background:linear-gradient(rgba(0,0,0,.14),rgba(0,0,0,.14)),var(--pn-c);box-shadow:inset 0 -3px 0 rgba(0,0,0,.15);}'
  + '.pn-tp-pot::after{content:"";position:absolute;left:8%;right:8%;top:28%;bottom:0;background:var(--pn-c);clip-path:polygon(0 0,100% 0,84% 100%,16% 100%);border-radius:0 0 8px 8px;z-index:-1;}'
  + '.pn-tp-n{position:relative;z-index:1;font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--pn-tray) * .38);line-height:1;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.25);margin-top:calc(var(--pn-tray) * .14);}'
  + '.pn-tp-dots{position:relative;z-index:1;display:grid;grid-template-columns:repeat(5,7px);gap:2px;margin-top:5px;} .pn-tp-dots i{display:block;width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.18);}'
  + '.pn-tp.is-used .pn-tp-pot{visibility:hidden;} .pn-tp.is-used{cursor:default;border-radius:10px;box-shadow:inset 0 0 0 2px rgba(122,90,42,.25);}'
  + '.pn-tp:not(.is-used):hover .pn-tp-pot{transform:translateY(-3px);} .pn-tp-pot{transition:transform .15s;}'
  + '.pn-tp:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;border-radius:10px;}'
  + '.pn-tp.pn-shake .pn-tp-pot{animation:pn-shake .45s ease 1;} @keyframes pn-shake{0%,100%{transform:none;}25%{transform:translateX(-6px);}60%{transform:translateX(5px);}}'
  /* the nest: pots at their true size on one floor */
  + '.pn-nest{position:relative;width:100%;}'
  + '.pn-floor{position:absolute;left:10%;right:10%;bottom:4px;height:8px;border-radius:4px;background:#C9B38F;}'
  + '.pn-pot{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);border:0;padding:0;background:none;display:block;}'
  + 'button.pn-pot{cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}'
  + '.pn-rim{position:absolute;left:0;right:0;top:0;height:var(--pn-band);border-radius:5px;background:linear-gradient(rgba(0,0,0,.16),rgba(0,0,0,.16)),var(--pn-c);box-shadow:inset 0 -3px 0 rgba(0,0,0,.16),0 2px 3px rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;z-index:2;}'
  + '.pn-n{font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--pn-band) * .8);line-height:1;color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.45),0 0 2px rgba(0,0,0,.35);}'
  + '.pn-body{position:absolute;left:6%;right:6%;top:calc(var(--pn-band) - 2px);bottom:0;background:var(--pn-c);clip-path:polygon(0 0,100% 0,85% 100%,15% 100%);}'
  + '.pn-body::after{content:"";position:absolute;left:30%;width:12%;top:10%;bottom:20%;background:rgba(255,255,255,.18);border-radius:6px;}'
  + '.pn-pot.is-cue .pn-rim{animation:pn-cue 1.1s ease-in-out infinite;} @keyframes pn-cue{0%,100%{box-shadow:inset 0 -3px 0 rgba(0,0,0,.16),0 0 0 0 rgba(242,178,28,.0);}50%{box-shadow:inset 0 -3px 0 rgba(0,0,0,.16),0 0 0 6px rgba(242,178,28,.7);}}'
  + 'button.pn-pot:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.pn-pot.pn-drop{animation:pn-drop .35s var(--lcs-ease) 1;} @keyframes pn-drop{0%{transform:translateX(-50%) translateY(-70px) scale(.7);opacity:.4;}100%{transform:translateX(-50%) translateY(0) scale(1);opacity:1;}}'
  + '.pn-pot.is-bounce{pointer-events:none;animation:pn-bounce .85s ease 1 forwards;} @keyframes pn-bounce{0%{transform:translateX(-50%) translateY(-60px) scale(.6);opacity:.5;}30%{transform:translateX(-50%) translateY(0) scale(1);opacity:1;}45%{transform:translateX(-50%) rotate(-5deg);}60%{transform:translateX(-50%) rotate(5deg);}80%{transform:translateX(-50%) translateY(0);opacity:1;}100%{transform:translateX(-50%) translateY(-90px) scale(.5);opacity:0;}}'
  + '.pn-wrap.is-stack{gap:12px;} .pn-wrap.is-stack .pn-tray{gap:10px;}'
  + '@media (prefers-reduced-motion:reduce){.pn-pot,.pn-tp-pot{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'pn-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = PotNestActivity;
if (typeof window !== 'undefined') window.PotNestActivity = PotNestActivity;
