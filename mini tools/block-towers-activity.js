/* =====================================================================
   block-towers-activity.js — ACTIVITY #20 of the one-by-one rebuild:
   THE BLOCK TOWERS ("Which number is smaller?", K.CC.C.7).
   ---------------------------------------------------------------------
   Two big number cards, an empty tower base above each, an optional
   counting row 1…10 underneath. Tap the smaller number, Check. Right →
   both towers grow TOGETHER, one block per beat, the counting row lighting
   1, 2, 3 …; the smaller number's tower stops first and raises a flag, the
   other climbs on to its number. Miss 1 → "count from 1: which do you say
   first?"; miss 2 → the towers grow for that look (until a new choice).
   Model: block-towers-core.js. 0 lines to lcs-shell.* or any shared core.
   Test seams: window.BlockTowersActivity.st / ._order / ._pool / .GROW_MS.
   ===================================================================== */
'use strict';

var BlockTowersActivity = {
  id: 'block-towers',
  apparatusClasses: ['bt-'],

  strings: {
    title:        {en:'The Block Towers',de:'Die Klötzchentürme',fr:'Les tours de cubes',es:'Las torres de cubos',pt:'As torres de cubos',it:'Le torri di cubetti',nl:'De blokkentorens',sv:'Klosstornen',da:'Klodstårnene',no:'Klosstårnene',fi:'Palikkatornit'},
    instruction:  {en:'Two numbers, two towers. Which number is smaller? Tap it and press Check — then both towers grow together, one block at a time, and the smaller number’s tower stops first.',de:'Zwei Zahlen, zwei Türme. Welche Zahl ist kleiner? Tippe sie an und drücke auf Prüfen – dann wachsen beide Türme zusammen, Klötzchen für Klötzchen, und der Turm der kleineren Zahl hört zuerst auf.',fr:'Deux nombres, deux tours. Quel nombre est le plus petit ? Touche-le et appuie sur Vérifier — puis les deux tours grandissent ensemble, un cube à la fois, et la tour du plus petit nombre s’arrête la première.',es:'Dos números, dos torres. ¿Qué número es menor? Tócalo y oprime Comprobar; luego las dos torres crecen juntas, un cubo a la vez, y la torre del número menor se detiene primero.',pt:'Dois números, duas torres. Qual número é menor? Toque nele e aperte Verificar — depois as duas torres crescem juntas, um cubo de cada vez, e a torre do número menor para primeiro.',it:'Due numeri, due torri. Quale numero è più piccolo? Toccalo e premi Verifica: poi le due torri crescono insieme, un cubetto alla volta, e la torre del numero più piccolo si ferma per prima.',nl:'Twee getallen, twee torens. Welk getal is kleiner? Tik erop en druk op Controleer – dan groeien beide torens samen, blokje voor blokje, en de toren van het kleinere getal stopt het eerst.',sv:'Två tal, två torn. Vilket tal är mindre? Tryck på det och tryck på Kontrollera – sedan växer båda tornen samtidigt, en kloss i taget, och tornet för det mindre talet stannar först.',da:'To tal, to tårne. Hvilket tal er mindst? Tryk på det, og tryk på Tjek – så vokser begge tårne samtidig, én klods ad gangen, og tårnet for det mindste tal stopper først.',no:'To tall, to tårn. Hvilket tall er minst? Trykk på det og trykk på Sjekk – så vokser begge tårnene samtidig, én kloss om gangen, og tårnet til det minste tallet stopper først.',fi:'Kaksi lukua, kaksi tornia. Kumpi luku on pienempi? Napauta sitä ja paina Tarkista – sitten molemmat tornit kasvavat yhtä aikaa palikka kerrallaan, ja pienemmän luvun torni pysähtyy ensin.'},
    prompt:       {en:'Which number is smaller? Tap it, then press Check.',de:'Welche Zahl ist kleiner? Tippe sie an und drücke dann auf Prüfen.',fr:'Quel nombre est le plus petit ? Touche-le, puis appuie sur Vérifier.',es:'¿Qué número es menor? Tócalo y luego oprime Comprobar.',pt:'Qual número é menor? Toque nele e depois aperte Verificar.',it:'Quale numero è più piccolo? Toccalo, poi premi Verifica.',nl:'Welk getal is kleiner? Tik erop en druk dan op Controleer.',sv:'Vilket tal är mindre? Tryck på det och tryck sedan på Kontrollera.',da:'Hvilket tal er mindst? Tryk på det, og tryk så på Tjek.',no:'Hvilket tall er minst? Trykk på det, og trykk så på Sjekk.',fi:'Kumpi luku on pienempi? Napauta sitä ja paina sitten Tarkista.'},
    cardAria:     {en:'The number {n}',de:'Die Zahl {n}',fr:'Le nombre {n}',es:'El número {n}',pt:'O número {n}',it:'Il numero {n}',nl:'Het getal {n}',sv:'Talet {n}',da:'Tallet {n}',no:'Tallet {n}',fi:'Luku {n}'},
    hintStart:    {en:'Tap the smaller number.',de:'Tippe die kleinere Zahl an.',fr:'Touche le plus petit nombre.',es:'Toca el número menor.',pt:'Toque no número menor.',it:'Tocca il numero più piccolo.',nl:'Tik op het kleinere getal.',sv:'Tryck på det mindre talet.',da:'Tryk på det mindste tal.',no:'Trykk på det minste tallet.',fi:'Napauta pienempää lukua.'},
    hintCount:    {en:'Count from 1: one, two, three… Which of the two numbers do you say first?',de:'Zähle ab 1: eins, zwei, drei … Welche der beiden Zahlen sagst du zuerst?',fr:'Compte à partir de 1 : un, deux, trois… Lequel des deux nombres dis-tu en premier ?',es:'Cuenta desde el 1: uno, dos, tres… ¿Cuál de los dos números dices primero?',pt:'Conte a partir do 1: um, dois, três… Qual dos dois números você fala primeiro?',it:'Conta da 1: uno, due, tre… Quale dei due numeri dici per primo?',nl:'Tel vanaf 1: een, twee, drie … Welk van de twee getallen zeg je het eerst?',sv:'Räkna från 1: ett, två, tre … Vilket av de två talen säger du först?',da:'Tæl fra 1: en, to, tre … Hvilket af de to tal siger du først?',no:'Tell fra 1: én, to, tre … Hvilket av de to tallene sier du først?',fi:'Laske ykkösestä: yksi, kaksi, kolme… Kumman luvun sanot ensin?'},
    hintBuilt:    {en:'Watch the towers: the one that stops first is the smaller number.',de:'Schau auf die Türme: Der Turm, der zuerst aufhört, gehört zur kleineren Zahl.',fr:'Regarde les tours : celle qui s’arrête la première, c’est le plus petit nombre.',es:'Mira las torres: la que se detiene primero es la del número menor.',pt:'Olhe as torres: a que para primeiro é a do número menor.',it:'Guarda le torri: quella che si ferma per prima è quella del numero più piccolo.',nl:'Kijk naar de torens: de toren die het eerst stopt, hoort bij het kleinere getal.',sv:'Titta på tornen: det som stannar först hör till det mindre talet.',da:'Se på tårnene: det, der stopper først, hører til det mindste tal.',no:'Se på tårnene: det som stopper først, hører til det minste tallet.',fi:'Katso torneja: ensin pysähtyvä torni kuuluu pienemmälle luvulle.'},
    celebrate:    {en:'Yes — {s} is smaller than {b}!',de:'Ja – {s} ist kleiner als {b}!',fr:'Oui — {s} est plus petit que {b} !',es:'¡Sí: {s} es menor que {b}!',pt:'Isso: {s} é menor que {b}!',it:'Sì: {s} è più piccolo di {b}!',nl:'Ja – {s} is kleiner dan {b}!',sv:'Ja – {s} är mindre än {b}!',da:'Ja – {s} er mindre end {b}!',no:'Ja – {s} er mindre enn {b}!',fi:'Kyllä – {s} on pienempi kuin {b}!'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:     {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',es:'Hasta 5',pt:'Até 5',it:'Fino a 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:    {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setStrip:     {en:'Counting row',de:'Zählreihe',fr:'Bande numérique',es:'Tira numérica',pt:'Faixa numérica',it:'Striscia dei numeri',nl:'Getallenrij',sv:'Talrad',da:'Talrække',no:'Tallrekke',fi:'Lukujono'},
    stripShown:   {en:'Shown',de:'Sichtbar',fr:'Affichée',es:'Visible',pt:'Visível',it:'Visibile',nl:'Zichtbaar',sv:'Synlig',da:'Synlig',no:'Synlig',fi:'Näkyvissä'},
    stripHidden:  {en:'Hidden',de:'Versteckt',fr:'Cachée',es:'Oculta',pt:'Escondida',it:'Nascosta',nl:'Verborgen',sv:'Dold',da:'Skjult',no:'Skjult',fi:'Piilossa'}
  },

  defaults: { range: 'to10', strip: 'shown' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'strip', type: 'choice', labelKey: 'setStrip', options: [{ value: 'shown', labelKey: 'stripShown' }, { value: 'hidden', labelKey: 'stripHidden' }] }
  ],

  GROW_MS: 320,   /* per block */

  init: function (api) {
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._growTimer = null; this._beat = null;
    injectBlockTowersCSS();
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } clearTimeout(this._growTimer); },
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return BlockTowersCore.POOLS[r] ? r : 'to10'; },
  _strip: function () { var s = this.api && this.api.settings && this.api.settings.strip; return s === 'hidden' ? 'hidden' : 'shown'; },
  _ensurePool: function () { var key = this._range() + ':' + this._strip(); if (!this._pool || this._poolKey !== key) { this._pool = BlockTowersCore.rounds(this._range(), 'bt', this._strip()); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'block-towers.' + r.id,
      promptKey: 'prompt',
      promptArgs: { s: Math.min(r.left, r.right), b: Math.max(r.left, r.right) },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = BlockTowersCore.newState(r); clearTimeout(tool._growTimer); tool._beat = null; },
      check: function (tool) { var res = BlockTowersCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return BlockTowersCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  _t: function (key, args) { return String(this.api.t(key)).replace(/\{(\w+)\}/g, function (m, k) { return args && k in args ? args[k] : m; }); },
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this, C = BlockTowersCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'bt')[0]);
    var wrap = api.el('div', 'bt-wrap'); this._wrap = wrap;
    var field = api.el('div', 'bt-field');
    this._cols = {};
    ['left', 'right'].forEach(function (side) {
      var col = api.el('div', 'bt-col bt-col-' + side);
      var tower = api.el('div', 'bt-tower'); tower.setAttribute('aria-hidden', 'true');
      var cubes = '';
      for (var k = 10; k >= 1; k--) cubes += '<span class="bt-slot" data-k="' + k + '"><span class="bt-cube"></span></span>';
      tower.innerHTML = '<span class="bt-flag"><span class="bt-flag-n"></span></span>' + cubes;
      var card = api.el('button', 'bt-card bt-card-' + side); card.type = 'button';
      card.innerHTML = '<span class="bt-num"></span>';
      card.addEventListener('click', function () { self._choose(side); });
      col.appendChild(tower); col.appendChild(card);
      field.appendChild(col);
      self._cols[side] = { col: col, tower: tower, card: card };
    });
    wrap.appendChild(field);
    var strip = api.el('div', 'bt-strip'); strip.setAttribute('aria-hidden', 'true');
    var chips = '';
    for (var c = 1; c <= 10; c++) chips += '<span class="bt-chip" data-c="' + c + '">' + c + '</span>';
    strip.innerHTML = chips;
    wrap.appendChild(strip);
    this._stripEl = strip;
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = BlockTowersCore.layout(this._width(), st ? st.max : 10), w = this._wrap;
    ['wide', 'stack'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--bt-cube', L.cube + 'px');
    w.style.setProperty('--bt-card', L.card + 'px');
    w.style.setProperty('--bt-gap', L.gap + 'px');
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

  _paint: function () {
    var st = this.st, C = BlockTowersCore, self = this;
    if (this._layoutFor !== st.max) this._layout();
    var w = this._wrap, beat = this._beat;
    var standing = beat !== null || C.built(st);
    var h = beat !== null ? C.towersAt(st, beat) : (C.built(st) ? [st.left, st.right] : [0, 0]);
    var low = C.smaller(st), first = C.stopsFirst(st);
    var flagUp = beat !== null ? beat >= low : C.built(st);
    w.classList.toggle('is-done', st.done);
    w.classList.toggle('strip-hidden', st.strip === 'hidden');
    ['left', 'right'].forEach(function (side, i) {
      var o = self._cols[side], n = st[side];
      o.tower.querySelectorAll('.bt-slot').forEach(function (s) {
        var k = +s.getAttribute('data-k');
        s.hidden = k > st.max;
        s.classList.toggle('is-on', k <= h[i]);
      });
      var flag = o.tower.querySelector('.bt-flag');
      var showFlag = standing && flagUp && side === first;
      flag.classList.toggle('is-on', showFlag);
      flag.style.setProperty('--bt-at', h[i]);
      o.tower.querySelector('.bt-flag-n').textContent = showFlag ? String(n) : '';
      o.card.querySelector('.bt-num').textContent = String(n);
      o.card.setAttribute('aria-label', self._t('cardAria', { n: n }));
      o.card.setAttribute('aria-pressed', String(st.choice === side));
      o.card.classList.toggle('is-on', st.choice === side);
      o.card.disabled = st.done;
      o.col.classList.toggle('stops-first', showFlag);
    });
    /* the counting row: 1 … max; lit up to the count while the towers grow (and to the bigger number once they stand) */
    var lit = beat !== null ? beat : (C.built(st) ? C.bigger(st) : 0);
    this._stripEl.querySelectorAll('.bt-chip').forEach(function (ch) {
      var c = +ch.getAttribute('data-c');
      ch.hidden = c > st.max;
      ch.classList.toggle('is-lit', c <= lit);
      ch.classList.toggle('is-now', beat !== null && c === beat);
      ch.classList.toggle('is-stop', standing && flagUp && c === low);
    });
  },

  /* ---------------- the hand ---------------- */
  _choose: function (side) {
    if (!BlockTowersCore.choose(this.st, side)) return;
    clearTimeout(this._growTimer); this._beat = null;
    this.api.sound(500);
    this._paint();
    this.api.track('choose', { choice: side });
  },
  /* both towers grow together, one block per beat; the smaller one stops first */
  _grow: function () {
    var st = this.st, self = this, C = BlockTowersCore, end = C.beats(st), low = C.smaller(st);
    clearTimeout(this._growTimer);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { this._beat = null; this._paint(); return; }
    var step = function (k) {
      if (!self._wrap || !self._wrap.isConnected || self.st !== st) return;
      if (k > end) { self._beat = null; self._paint(); return; }
      self._beat = k; self._paint();
      self.api.sound(420 + 28 * k);
      if (k === low) { var f = self._cols[C.stopsFirst(st)].tower.querySelector('.bt-flag'); bounce(f, 'bt-pop'); }
      self._growTimer = setTimeout(function () { step(k + 1); }, self.GROW_MS);
    };
    step(1);
  },
  _afterCheck: function (res) {
    var st = this.st;
    if (res.slip === 'none') { this._paint(); return; }
    if (res.ok) {
      this.api.sound(660);
      this._grow();
      if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'number', text: String(BlockTowersCore.smaller(st)), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ } }
    } else {
      this.api.sound(280);
      if (BlockTowersCore.built(st)) this._grow(); else { this._beat = null; this._paint(); }
    }
    this.api.track('check', { id: st.id, ok: res.ok, choice: res.choice, misses: st.misses });
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var btCssDone = false;
function injectBlockTowersCSS() {
  if (btCssDone || typeof document === 'undefined') return;
  btCssDone = true;
  var css = ''
  + '.bt-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:14px;--bt-cube:34px;--bt-card:130px;--bt-gap:90px;}'
  + '.bt-field{display:flex;justify-content:center;align-items:flex-end;gap:var(--bt-gap);padding:0 8px;}'
  + '.bt-col{display:flex;flex-direction:column;align-items:center;width:var(--bt-card);}'
  /* the tower: a column of block slots on a base, a flag that rides on the top block */
  + '.bt-tower{position:relative;display:flex;flex-direction:column;align-items:center;padding-top:34px;}'
  + '.bt-slot{display:block;width:calc(var(--bt-cube) * 1.6);height:var(--bt-cube);box-sizing:border-box;position:relative;} .bt-slot[hidden]{display:none;}'
  + '.bt-cube{position:absolute;inset:1px;border-radius:5px;opacity:0;transform:translateY(-14px) scale(.9);transition:opacity .16s,transform .2s var(--lcs-ease);}'
  + '.bt-slot.is-on .bt-cube{opacity:1;transform:none;}'
  /* the empty slots: the same faint outline on both towers (they say nothing about the answer) */
  + '.bt-slot::before{content:"";position:absolute;inset:2px;border-radius:5px;border:2px dashed rgba(122,90,42,.22);background:rgba(255,255,255,.35);} .bt-slot.is-on::before{display:none;}'
  + '.bt-col-left .bt-cube{background:linear-gradient(180deg,#F07A55,#E4572E);box-shadow:inset 0 -4px 0 rgba(0,0,0,.14),inset 0 2px 0 rgba(255,255,255,.35);}'
  + '.bt-col-right .bt-cube{background:linear-gradient(180deg,#4FA3C7,#2E86AB);box-shadow:inset 0 -4px 0 rgba(0,0,0,.14),inset 0 2px 0 rgba(255,255,255,.35);}'
  + '.bt-cube::after{content:"";position:absolute;left:30%;right:30%;top:-5px;height:6px;border-radius:3px 3px 0 0;background:inherit;filter:brightness(1.08);}'
  + '.bt-tower::after{content:"";display:block;width:calc(var(--bt-cube) * 2.1);height:8px;border-radius:4px;background:#C9B38F;box-shadow:0 2px 0 rgba(0,0,0,.1);margin-top:2px;}'
  + '.bt-flag{position:absolute;left:50%;bottom:calc(var(--bt-at, 0) * var(--bt-cube) + 10px);transform:translateX(-2px);display:none;align-items:flex-start;gap:0;pointer-events:none;z-index:3;transition:bottom .2s var(--lcs-ease);}'
  + '.bt-flag::before{content:"";width:3px;height:30px;background:#5B4A32;border-radius:2px;display:block;}'
  + '.bt-flag-n{display:block;min-width:26px;padding:3px 7px;margin-left:-1px;border-radius:0 6px 6px 0;background:#F6C945;color:#5B3A0A;font-family:var(--lcs-font-display);font-weight:800;font-size:15px;line-height:16px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,.18);}'
  + '.bt-flag.is-on{display:flex;} .bt-flag.bt-pop{animation:bt-pop .35s var(--lcs-ease) 1;} @keyframes bt-pop{0%{transform:translateX(-2px) scale(.2);}70%{transform:translateX(-2px) scale(1.15);}100%{transform:translateX(-2px) scale(1);}}'
  /* the cards: the numbers themselves are the buttons */
  + '.bt-card{margin-top:12px;width:var(--bt-card);height:calc(var(--bt-card) * .82);border-radius:20px;border:3px solid transparent;background:#fff;cursor:pointer;touch-action:manipulation;box-shadow:0 4px 12px rgba(40,40,30,.13);display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;}'
  + '.bt-num{font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--bt-card) * .5);line-height:1;}'
  + '.bt-card-left .bt-num{color:#D2461F;} .bt-card-right .bt-num{color:#1F6F92;}'
  + '.bt-card:hover:not(:disabled){box-shadow:0 6px 16px rgba(20,107,94,.22);} .bt-card.is-on{border-color:var(--lcs-structure);box-shadow:0 0 0 4px rgba(20,107,94,.18),0 6px 16px rgba(20,107,94,.22);} .bt-card:disabled{cursor:default;}'
  + '.bt-card:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  /* the counting row */
  + '.bt-strip{display:flex;gap:6px;justify-content:center;flex-wrap:nowrap;} .bt-wrap.strip-hidden .bt-strip{display:none;}'
  + '.bt-chip{min-width:32px;height:32px;padding:0 4px;box-sizing:border-box;border-radius:8px;background:#F3E9D8;color:#7A5A2A;font-family:var(--lcs-font-display);font-weight:800;font-size:17px;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s;} .bt-chip[hidden]{display:none;}'
  + '.bt-chip.is-lit{background:#FFE58A;color:#5B3A0A;} .bt-chip.is-now{box-shadow:0 0 0 3px var(--lcs-structure);} .bt-chip.is-stop{background:#F6C945;box-shadow:inset 0 -3px 0 rgba(0,0,0,.15);}'
  + '.bt-wrap.is-stack{gap:10px;} .bt-wrap.is-stack .bt-tower{padding-top:30px;} .bt-wrap.is-stack .bt-card{border-radius:16px;margin-top:8px;}'
  + '.bt-wrap.is-stack .bt-strip{gap:3px;} .bt-wrap.is-stack .bt-chip{min-width:22px;height:26px;font-size:14px;border-radius:6px;padding:0 2px;}'
  + '@media (prefers-reduced-motion:reduce){.bt-cube,.bt-flag{transition:none!important;}.bt-flag{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'bt-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = BlockTowersActivity;
if (typeof window !== 'undefined') window.BlockTowersActivity = BlockTowersActivity;
