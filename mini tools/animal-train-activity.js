/* =====================================================================
   animal-train-activity.js — ACTIVITY #10 of the one-by-one rebuild:
   "Count to 10 with Animals" (K.CC.B.4) — THE ANIMAL TRAIN.
   Design sheet: docs/activities-rebuild/010-animal-train.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE TRAIN COUNTS ITS PASSENGERS. A carriage with ten
   windows (two rows of five — a ten-frame) waits at a platform full of
   animals; a ticket shows a number. A tap on an animal sends it hopping
   into the NEXT seat (one animal, one seat, one number — B.4a); a tap on
   the train lets one off again. The child decides when to stop and
   presses Go (the last number tells how many — B.4b). The train numbers
   its passengers: right → it chugs on; at a second stop the ticket is one
   more or one fewer and the child changes the train by exactly one (B.4c).
   Wrong → it names the slip in plain words; a second wrong Go marks the
   extra passengers or the empty seats still waiting. The help never moves
   an animal. No mascot: a carriage, a ticket, a platform, library animals.

   ACTIVITY LAYER ONLY: the model is animal-train-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched (the shell Check is hidden by
   this file's CSS and pressed by the train when the last stop is right).
   Test seams: window.AnimalTrainActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var AnimalTrainActivity = {
  id: 'animal-train',
  apparatusClasses: ['tr-'],

  strings: {
    title:          {en:'The Animal Train',de:'Der Tierzug',fr:'Le train des animaux',it:'Il treno degli animali',es:'El tren de los animales',pt:'O trem dos animais',nl:'De dierentrein',sv:'Djurtåget',da:'Dyretoget',no:'Dyretoget',fi:'Eläinjuna'},
    instruction:    {en:'Put as many animals on the train as the ticket says.',de:'Setze so viele Tiere in den Zug, wie auf der Fahrkarte steht.',fr:'Fais monter dans le train autant d’animaux que l’indique le billet.',it:'Fai salire sul treno tanti animali quanti ne indica il biglietto.',es:'Sube al tren tantos animales como dice el boleto.',pt:'Coloque no trem tantos animais quanto diz a passagem.',nl:'Zet zoveel dieren in de trein als er op het kaartje staat.',sv:'Sätt lika många djur på tåget som det står på biljetten.',da:'Sæt lige så mange dyr på toget, som der står på billetten.',no:'Sett like mange dyr på toget som det står på billetten.',fi:'Laita junaan yhtä monta eläintä kuin lipussa lukee.'},
    promptTrain:    {en:'Read the ticket. Put that many animals on the train, then press Go.',de:'Lies die Fahrkarte. Setze so viele Tiere in den Zug und drücke dann auf Abfahrt.',fr:'Lis le billet. Fais monter ce nombre d’animaux, puis appuie sur En route.',it:'Leggi il biglietto. Fai salire quel numero di animali e poi premi Partenza.',es:'Lee el boleto. Sube esa cantidad de animales y luego oprime Vámonos.',pt:'Leia a passagem. Coloque essa quantidade de animais no trem e depois aperte Partida.',nl:'Lees het kaartje. Zet zoveel dieren in de trein en druk dan op Vertrek.',sv:'Läs biljetten. Sätt så många djur på tåget och tryck sedan på Avgång.',da:'Læs billetten. Sæt så mange dyr på toget, og tryk så på Afgang.',no:'Les billetten. Sett så mange dyr på toget, og trykk så på Avgang.',fi:'Lue lippu. Laita junaan niin monta eläintä ja paina sitten Lähtö.'},
    go:             {en:'Go!',de:'Abfahrt!',fr:'En route !',it:'Partenza!',es:'¡Vámonos!',pt:'Partida!',nl:'Vertrek!',sv:'Avgång!',da:'Afgang!',no:'Avgang!',fi:'Lähtö!'},
    ticketLabel:    {en:'The ticket: {t}',de:'Die Fahrkarte: {t}',fr:'Le billet : {t}',it:'Il biglietto: {t}',es:'El boleto: {t}',pt:'A passagem: {t}',nl:'Het kaartje: {t}',sv:'Biljetten: {t}',da:'Billetten: {t}',no:'Billetten: {t}',fi:'Lippu: {t}'},
    carLabel:       {en:'The train',de:'Der Zug',fr:'Le train',it:'Il treno',es:'El tren',pt:'O trem',nl:'De trein',sv:'Tåget',da:'Toget',no:'Toget',fi:'Juna'},
    platLabel:      {en:'The platform',de:'Der Bahnsteig',fr:'Le quai',it:'Il marciapiede',es:'El andén',pt:'A plataforma',nl:'Het perron',sv:'Perrongen',da:'Perronen',no:'Perrongen',fi:'Laituri'},
    boardLabel:     {en:'Put on the train: {animal}',de:'In den Zug setzen: {animal}',fr:'Faire monter : {animal}',it:'Far salire: {animal}',es:'Subir al tren: {animal}',pt:'Colocar no trem: {animal}',nl:'In de trein zetten: {animal}',sv:'Sätt på tåget: {animal}',da:'Sæt på toget: {animal}',no:'Sett på toget: {animal}',fi:'Laita junaan: {animal}'},
    offLabel:       {en:'Let an animal off the train',de:'Ein Tier aussteigen lassen',fr:'Faire descendre un animal',it:'Far scendere un animale',es:'Bajar un animal del tren',pt:'Tirar um animal do trem',nl:'Een dier laten uitstappen',sv:'Låt ett djur kliva av',da:'Lad et dyr stige af',no:'La et dyr gå av',fi:'Päästä yksi eläin pois junasta'},
    noteCompare:    {en:'On the train: {a}. On the ticket: {t}.',de:'Im Zug: {a}. Auf der Fahrkarte: {t}.',fr:'Dans le train : {a}. Sur le billet : {t}.',it:'Sul treno: {a}. Sul biglietto: {t}.',es:'En el tren: {a}. En el boleto: {t}.',pt:'No trem: {a}. Na passagem: {t}.',nl:'In de trein: {a}. Op het kaartje: {t}.',sv:'På tåget: {a}. På biljetten: {t}.',da:'I toget: {a}. På billetten: {t}.',no:'På toget: {a}. På billetten: {t}.',fi:'Junassa: {a}. Lipussa: {t}.'},
    noteTooMany:    {en:'Too many — tap the train to let one off.',de:'Zu viele – tippe auf den Zug, dann steigt eins aus.',fr:'Trop d’animaux — touche le train pour faire descendre un animal.',it:'Troppi: tocca il treno per far scendere un animale.',es:'Son demasiados: toca el tren para que se baje uno.',pt:'Tem animais demais: toque no trem para um animal descer.',nl:'Te veel – tik op de trein, dan stapt er één uit.',sv:'För många – tryck på tåget så kliver ett djur av.',da:'For mange – tryk på toget, så stiger et dyr af.',no:'For mange – trykk på toget, så går et dyr av.',fi:'Liikaa – napauta junaa, niin yksi eläin jää pois.'},
    noteTooFew:     {en:'Too few — tap an animal on the platform to put it on.',de:'Zu wenige – tippe ein Tier auf dem Bahnsteig an, dann steigt es ein.',fr:'Pas assez — touche un animal sur le quai pour le faire monter.',it:'Troppo pochi: tocca un animale sul marciapiede per farlo salire.',es:'Faltan: toca un animal del andén para que se suba.',pt:'Faltam animais: toque em um animal na plataforma para ele subir.',nl:'Te weinig – tik op een dier op het perron, dan stapt het in.',sv:'För få – tryck på ett djur på perrongen så kliver det på.',da:'For få – tryk på et dyr på perronen, så stiger det på.',no:'For få – trykk på et dyr på perrongen, så går det på.',fi:'Liian vähän – napauta laiturilla olevaa eläintä, niin se nousee junaan.'},
    noteNewTicket:  {en:'Next stop! The new ticket says {t}.',de:'Nächster Halt! Auf der neuen Fahrkarte steht {t}.',fr:'Prochain arrêt ! Le nouveau billet indique {t}.',it:'Prossima fermata! Il nuovo biglietto dice {t}.',es:'¡Siguiente parada! El boleto nuevo dice {t}.',pt:'Próxima parada! A passagem nova diz {t}.',nl:'Volgende halte! Op het nieuwe kaartje staat {t}.',sv:'Nästa station! På den nya biljetten står det {t}.',da:'Næste station! På den nye billet står der {t}.',no:'Neste stasjon! På den nye billetten står det {t}.',fi:'Seuraava asema! Uudessa lipussa lukee {t}.'},
    noteOneMore:    {en:'One more got on: {a} → {b}.',de:'Ein Tier mehr ist eingestiegen: {a} → {b}.',fr:'Un animal de plus est monté : {a} → {b}.',it:'È salito un animale in più: {a} → {b}.',es:'Se subió un animal más: {a} → {b}.',pt:'Subiu mais um animal: {a} → {b}.',nl:'Er is nog één dier ingestapt: {a} → {b}.',sv:'Ett djur till klev på: {a} → {b}.',da:'Et dyr mere steg på: {a} → {b}.',no:'Ett dyr til gikk på: {a} → {b}.',fi:'Yksi eläin lisää nousi kyytiin: {a} → {b}.'},
    noteOneFewer:   {en:'One got off: {a} → {b}.',de:'Ein Tier ist ausgestiegen: {a} → {b}.',fr:'Un animal est descendu : {a} → {b}.',it:'È sceso un animale: {a} → {b}.',es:'Se bajó un animal: {a} → {b}.',pt:'Desceu um animal: {a} → {b}.',nl:'Er is één dier uitgestapt: {a} → {b}.',sv:'Ett djur klev av: {a} → {b}.',da:'Et dyr steg af: {a} → {b}.',no:'Ett dyr gikk av: {a} → {b}.',fi:'Yksi eläin jäi pois kyydistä: {a} → {b}.'},
    celebrate:      {en:'Just right — all aboard!',de:'Genau richtig – alle eingestiegen!',fr:'Pile le bon nombre — tout le monde à bord !',it:'Giusto! Tutti a bordo!',es:'¡Exacto! ¡Todos a bordo!',pt:'Certinho! Todos a bordo!',nl:'Precies goed – iedereen aan boord!',sv:'Precis rätt – alla ombord!',da:'Helt rigtigt – alle om bord!',no:'Helt riktig – alle om bord!',fi:'Juuri oikein – kaikki kyydissä!'},
    setRange:       {en:'Tickets',de:'Fahrkarten',fr:'Billets',it:'Biglietti',es:'Boletos',pt:'Passagens',nl:'Kaartjes',sv:'Biljetter',da:'Billetter',no:'Billetter',fi:'Liput'},
    rangeTo5:       {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:      {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setNumbers:     {en:'Counting numbers',de:'Zählzahlen',fr:'Nombres du comptage',it:'Numeri del conteggio',es:'Números al contar',pt:'Números da contagem',nl:'Telgetallen',sv:'Räknetal',da:'Tælletal',no:'Telletall',fi:'Luvut laskiessa'},
    numbersShown:   {en:'Shown',de:'Anzeigen',fr:'Affichés',it:'Visibili',es:'Visibles',pt:'Visíveis',nl:'Tonen',sv:'Visas',da:'Vises',no:'Vises',fi:'Näkyvissä'},
    numbersHidden:  {en:'Said aloud',de:'Laut sagen',fr:'Dits à voix haute',it:'Detti ad alta voce',es:'En voz alta',pt:'Em voz alta',nl:'Hardop zeggen',sv:'Sägs högt',da:'Siges højt',no:'Sies høyt',fi:'Ääneen'}
  },

  defaults: { range: 'to10', numbers: 'shown' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'shown', labelKey: 'numbersShown' }, { value: 'hidden', labelKey: 'numbersHidden' }] }
  ],

  FLY_MS: 320, FLASH_MS: 1100, CHUG_MS: 1300, CHECK_MS: 500,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._timers = []; this._theme = null;
    this._busy = false; this._tally = false; this._flash = -1;
    injectAnimalTrainCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(AnimalTrainCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the platform stays empty */ });
    }
  },
  destroy: function () {
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    this._clearTimers();
  },
  onSettings: function () {
    this._pool = null; this._order = null;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* ---------------- rounds ---------------- */
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 640;
  },
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return AnimalTrainCore.POOLS[r] ? r : 'to10'; },
  _shown: function () { var v = this.api && this.api.settings && this.api.settings.numbers; return v !== 'hidden'; },
  _ensurePool: function () { var key = this._range(); if (!this._pool || this._poolKey !== key) { this._pool = AnimalTrainCore.rounds(key, 'tr'); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'animal-train.' + r.id,
      promptKey: 'promptTrain',
      promptArgs: {},
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool.st = AnimalTrainCore.newState(r); tool._busy = false; tool._tally = false; tool._flash = -1; tool._preload(); },
      /* the train presses Check itself when the last stop is right */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = AnimalTrainCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'tr')[1]);
    var wrap = api.el('div', 'tr-wrap'); this._wrap = wrap;

    /* the top row: the ticket and Go */
    var top = api.el('div', 'tr-top');
    var ticket = api.el('div', 'tr-ticket'); ticket.setAttribute('role', 'img');
    var tnum = api.el('span', 'tr-ticket-num'); ticket.appendChild(tnum);
    this._ticket = ticket; this._ticketNum = tnum; top.appendChild(ticket);
    var go = api.el('button', 'tr-go'); go.type = 'button';
    go.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15"/><path d="M13 6l6 6-6 6"/></svg><span></span>';
    go.querySelector('span').textContent = t('go');
    go.addEventListener('click', function () { self._go(); });
    this._goBtn = go; top.appendChild(go);
    wrap.appendChild(top);

    var note = api.el('div', 'tr-note'); note.setAttribute('aria-live', 'polite');
    var n1 = api.el('div', 'tr-note-1'), n2 = api.el('div', 'tr-note-2');
    note.appendChild(n1); note.appendChild(n2);
    this._note = note; this._note1 = n1; this._note2 = n2;

    /* the body: the carriage and the platform */
    var body = api.el('div', 'tr-body'); this._body = body;
    var car = api.el('div', 'tr-car'); car.setAttribute('role', 'group'); car.setAttribute('aria-label', t('carLabel'));
    var seats = api.el('div', 'tr-seats'); this._seatEls = [];
    for (var s = 0; s < C.SEATS; s++) {
      (function (si) {
        var seat = api.el('div', 'tr-seat');
        var b = api.el('button', 'tr-pass'); b.type = 'button'; b.setAttribute('aria-label', t('offLabel'));
        b.addEventListener('click', function () { self._off(); });
        seat.appendChild(b);
        var num = api.el('span', 'tr-num'); num.setAttribute('aria-hidden', 'true'); seat.appendChild(num);
        seats.appendChild(seat); self._seatEls.push(seat);
      }(s));
    }
    car.appendChild(seats);
    var wheels = api.el('div', 'tr-wheels'); wheels.setAttribute('aria-hidden', 'true');
    for (var w = 0; w < 4; w++) wheels.appendChild(api.el('span', 'tr-wheel'));
    car.appendChild(wheels);
    this._car = car; body.appendChild(car);
    var plat = api.el('div', 'tr-plat'); plat.setAttribute('role', 'group'); plat.setAttribute('aria-label', t('platLabel'));
    this._plat = plat; this._slotEls = [];
    for (var i = 0; i < this.st.wait; i++) {
      (function (pi) {
        var slot = api.el('div', 'tr-slot');
        var b = api.el('button', 'tr-animal'); b.type = 'button';
        b.addEventListener('click', function () { self._board(pi); });
        slot.appendChild(b); plat.appendChild(slot); self._slotEls.push(slot);
      }(i));
    }
    body.appendChild(plat);
    wrap.appendChild(body);
    wrap.appendChild(note);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = AnimalTrainCore.layout(this._width(), st ? st.wait : 12);
    var w = this._wrap;
    w.classList.toggle('is-row', L.mode === 'row');
    w.classList.toggle('is-stack', L.mode === 'stack');
    w.style.setProperty('--tr-seat', L.seat + 'px');
    w.style.setProperty('--tr-pic', L.pic + 'px');
    w.style.setProperty('--tr-frame', L.frame + 'px');
    w.style.setProperty('--tr-gap', L.gap + 'px');
    w.style.setProperty('--tr-plat', L.plat + 'px');
    w.style.setProperty('--tr-pcols', String(L.platCols));
    w.style.setProperty('--tr-pgap', L.platGap + 'px');
    w.style.setProperty('--tr-ppad', L.platPad + 'px');
    w.style.setProperty('--tr-ticket', L.ticket + 'px');
    w.style.setProperty('--tr-carw', L.carW + 'px');
    /* the note sits right under the train (row) or above the train and the platform (stack) */
    if (L.mode === 'row') this._body.insertBefore(this._note, this._plat); else w.insertBefore(this._note, this._body);
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

  _animalName: function (plural) {
    var st = this.st;
    if (!this._theme || !this._theme.nouns[st.noun]) return st.noun;
    try { return LCSPictures.label(this._theme, st.noun, this.api.lang, { plural: !!plural }); } catch (e) { return st.noun; }
  },
  _imgIn: function (holder) {
    var st = this.st, img = holder.querySelector('img');
    if (!this._theme || !this._theme.nouns[st.noun]) { if (img) holder.removeChild(img); return null; }
    if (!img) { img = LCSPictures.img(this._theme, st.noun, this.api.lang, { plural: false }); img.className = 'tr-pic'; img.setAttribute('aria-hidden', 'true'); img.alt = ''; holder.appendChild(img); }
    else if (img.getAttribute('data-noun') !== st.noun) img.src = LCSPictures.url(this._theme, st.noun);
    img.setAttribute('data-noun', st.noun);
    return img;
  },
  _preload: function () {
    if (!this._theme || !this.st || typeof Image === 'undefined') return;
    if (this._theme.nouns[this.st.noun]) { var im = new Image(); im.src = LCSPictures.url(this._theme, this.st.noun); }
  },

  _paint: function () {
    var st = this.st, t = this.api.t, C = AnimalTrainCore;
    var a = st.seats.length, view = C.seatView(st), name = this._animalName(false);
    this._wrap.classList.toggle('is-done', st.done);
    /* the ticket */
    this._ticketNum.textContent = String(st.ticket);
    this._ticket.setAttribute('aria-label', interp(t('ticketLabel'), { t: st.ticket }));
    this._goBtn.disabled = st.done || this._busy;
    /* the seats */
    for (var s = 0; s < C.SEATS; s++) {
      var seat = this._seatEls[s], on = s < a, v = view[s];
      var pass = seat.firstChild;
      seat.classList.toggle('has-pass', on);
      pass.hidden = !on;
      if (on) this._imgIn(pass); else { var old = pass.querySelector('img'); if (old) pass.removeChild(old); }
      pass.disabled = st.done || this._busy;
      var num = seat.querySelector('.tr-num');
      var shown = v.num !== '' ? v.num : ((this._tally && on) || (s === this._flash && on) ? s + 1 : '');
      num.textContent = shown === '' ? '' : String(shown);
      num.classList.toggle('is-on', shown !== '');
      num.classList.toggle('is-flash', shown !== '' && s === this._flash && v.num === '' && !this._tally);
      num.classList.toggle('is-gold', v.mark === 'last');
      seat.classList.toggle('is-extra', v.mark === 'extra');
      seat.classList.toggle('is-need', v.mark === 'need');
    }
    /* the platform */
    for (var i = 0; i < this._slotEls.length; i++) {
      var slot = this._slotEls[i], here = i < st.plat.length && st.plat[i];
      slot.hidden = i >= st.plat.length;
      var b = slot.firstChild;
      b.hidden = !here;
      slot.classList.toggle('is-empty', !here);
      if (here) { this._imgIn(b); b.setAttribute('aria-label', interp(t('boardLabel'), { animal: this.api.lang === 'de' ? name : name.toLocaleLowerCase(this.api.lang) })); }
      else { var o = b.querySelector('img'); if (o) b.removeChild(o); }
      b.disabled = st.done || this._busy;
    }
    /* the note */
    var nt = C.note(st), l1 = '', l2 = '';
    if (nt && (nt.key === 'noteTooMany' || nt.key === 'noteTooFew')) { l1 = interp(t('noteCompare'), nt.args); l2 = t(nt.key); }
    else if (nt) l1 = interp(t(nt.key), nt.args);
    this._note1.textContent = l1; this._note2.textContent = l2;
    this._note.hidden = !l1;
    this._note.classList.toggle('is-wrong', !!(st.checked && !st.checked.ok));
  },

  /* ---------------- the hand ---------------- */
  /* FLIP: the picture appears at its new place and glides from where it was */
  _fly: function (fromRect, holder) {
    var img = holder && holder.querySelector('img');
    if (!img || !fromRect || !img.animate) return;
    var to = img.getBoundingClientRect();
    if (!to.width) return;
    var dx = fromRect.left + fromRect.width / 2 - (to.left + to.width / 2), dy = fromRect.top + fromRect.height / 2 - (to.top + to.height / 2);
    var sc = fromRect.width / to.width;
    img.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')' }, { transform: 'translate(' + (dx * 0.4) + 'px,' + (dy * 0.4 - 26) + 'px) scale(' + ((sc + 1) / 2) + ')', offset: 0.55 }, { transform: 'none' }], { duration: this.FLY_MS, easing: 'cubic-bezier(.3,.7,.2,1)' });
  },
  _board: function (i) {
    var st = this.st, self = this;
    if (!st || this._busy) return;
    var src = this._slotEls[i] && this._slotEls[i].querySelector('img'), from = src ? src.getBoundingClientRect() : null;
    if (!AnimalTrainCore.board(st, i)) { if (st.seats.length >= AnimalTrainCore.SEATS) bounce(this._car, 'tr-wobble'); return; }
    var s = st.seats.length - 1;
    this._tally = false;
    if (this._shown() && AnimalTrainCore.helpLevel(st) === 0) {
      this._flash = s;
      this._later(function () { if (self._flash === s) { self._flash = -1; self._paint(); } }, this.FLASH_MS);
      this._speakNumber(s + 1);
    }
    this.api.sound(440 + 28 * s);
    this._paint();
    this._fly(from, this._seatEls[s].firstChild);
    this.api.track('board', { n: st.ticket, aboard: st.seats.length });
  },
  _off: function () {
    var st = this.st;
    if (!st || this._busy) return;
    var s = st.seats.length - 1, src = s >= 0 ? this._seatEls[s].querySelector('img') : null, from = src ? src.getBoundingClientRect() : null;
    var i = AnimalTrainCore.off(st);
    if (i < 0) return;
    this._tally = false; this._flash = -1;
    this.api.sound(360);
    this._paint();
    this._fly(from, this._slotEls[i].firstChild);
    this.api.track('off', { n: st.ticket, aboard: st.seats.length });
  },
  _go: function () {
    var st = this.st, self = this;
    if (!st || this._busy || st.done) return;
    var res = AnimalTrainCore.go(st);
    if (!res) return;
    this._flash = -1;
    this.api.track('go', { id: st.id, ticket: res.t, aboard: res.a, ok: res.ok, slip: res.slip, misses: st.misses });
    if (!res.ok) {
      this.api.sound(260);
      this._paint();
      bounce(this._car, 'tr-brake');
      this._popNums();
      return;
    }
    /* right: the train counts its passengers out loud and chugs */
    this._busy = true; this._tally = true;
    this._paint();
    this._popNums();
    this._speakNumber(res.a);
    this.api.sound(560); this._later(function () { self.api.sound(740); }, 160);
    bounce(this._car, 'tr-chug');
    if (res.next) {
      this._later(function () {
        self._busy = false; self._tally = false;
        self._paint();
        bounce(self._ticket, 'tr-flip');
        self.api.sound(880);
        self.api.announce(interp(self.api.t('noteNewTicket'), { t: self.st.ticket }));
      }, this.CHUG_MS);
      return;
    }
    this._later(function () { self._busy = false; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled && self.st.done) chk.click(); }, this.CHECK_MS);
  },
  /* the numbers appear on the passengers one after another, in counting order */
  _popNums: function () {
    var a = this.st.seats.length;
    for (var s = 0; s < a; s++) { var el = this._seatEls[s].querySelector('.tr-num'); if (!el) continue; el.style.setProperty('--tr-delay', (s * 90) + 'ms'); bounce(el, 'tr-pop'); }
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var trCssDone = false;
function injectAnimalTrainCSS() {
  if (trCssDone || typeof document === 'undefined') return;
  trCssDone = true;
  var css = ''
  /* the train presses the shell Check itself; the child's button is Go */
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.tr-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:center;gap:12px;--tr-seat:110px;--tr-frame:12px;--tr-gap:6px;--tr-plat:96px;--tr-pcols:6;--tr-pgap:8px;--tr-ppad:8px;--tr-ticket:100px;--tr-carw:600px;--tr-body:#1F7A6D;--tr-body2:#17645A;--tr-window:#FFF7E8;}'
  /* the top row */
  + '.tr-top{display:flex;align-items:center;justify-content:space-between;gap:12px;width:var(--tr-carw);max-width:100%;}'
  + '.tr-wrap.is-stack{gap:8px;} .tr-wrap.is-stack .tr-top{width:100%;}'
  + '.tr-ticket{position:relative;min-width:calc(var(--tr-ticket) * 1.25);height:var(--tr-ticket);box-sizing:border-box;padding:0 16px 0 26px;border-radius:12px;background:#FFF4D6;border:3px solid #C9A24A;box-shadow:0 4px 10px rgba(60,35,10,.14);display:grid;place-items:center;}'
  + '.tr-ticket::before{content:"";position:absolute;left:8px;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2px #C9A24A;}'
  + '.tr-ticket::after{content:"";position:absolute;inset:6px 6px 6px 22px;border:2px dashed rgba(201,162,74,.6);border-radius:8px;pointer-events:none;}'
  + '.tr-ticket-num{font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--tr-ticket) * .66);line-height:1;color:#7A4E0E;}'
  + '.tr-ticket.tr-flip{animation:tr-flip .55s var(--lcs-ease) 1;} @keyframes tr-flip{0%{transform:rotateX(0);}45%{transform:rotateX(88deg);}100%{transform:rotateX(0);}}'
  + '.tr-go{min-height:60px;min-width:150px;padding:0 22px;border-radius:30px;border:0;background:var(--lcs-accent);color:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:22px;display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;touch-action:manipulation;box-shadow:0 5px 0 #C9542B;}'
  + '.tr-go:hover:not(:disabled){filter:brightness(1.05);} .tr-go:disabled{opacity:.45;cursor:default;box-shadow:none;} .tr-go:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.tr-wrap.is-stack .tr-go{min-width:0;min-height:52px;font-size:19px;padding:0 16px;}'
  /* the body */
  + '.tr-body{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;}'
  + '.tr-wrap.is-stack .tr-body{flex-direction:row;align-items:flex-start;justify-content:center;gap:12px;}'
  /* the carriage */
  + '.tr-car{position:relative;box-sizing:border-box;padding:var(--tr-frame);padding-top:calc(var(--tr-frame) + 10px);border-radius:20px;background:linear-gradient(180deg,var(--tr-body),var(--tr-body2));box-shadow:inset 0 0 0 3px #12524A,0 8px 16px rgba(20,50,45,.18);margin-bottom:16px;}'
  + '.tr-car::before{content:"";position:absolute;left:14px;right:14px;top:6px;height:6px;border-radius:3px;background:rgba(255,255,255,.22);}'
  + '.tr-wrap.is-stack .tr-car{margin-bottom:0;padding-top:var(--tr-frame);}'
  + '.tr-wrap.is-stack .tr-car::before{display:none;}'
  + '.tr-seats{display:grid;grid-template-columns:repeat(5,var(--tr-seat));grid-template-rows:repeat(2,var(--tr-seat));gap:var(--tr-gap);}'
  + '.tr-wrap.is-stack .tr-seats{grid-template-columns:repeat(2,var(--tr-seat));grid-template-rows:repeat(5,var(--tr-seat));grid-auto-flow:column;}'
  + '.tr-seat{position:relative;width:var(--tr-seat);height:var(--tr-seat);box-sizing:border-box;border-radius:12px;background:var(--tr-window);box-shadow:inset 0 3px 6px rgba(20,50,45,.25);}'
  /* the first five seats (the front row / the first column) share a warmer window, so five reads as a unit */
  + '.tr-seat:nth-child(-n+5){background:#FFF0D2;}'
  + '.tr-seat.is-need{box-shadow:inset 0 0 0 3px var(--lcs-accent),inset 0 3px 6px rgba(20,50,45,.2);background-image:repeating-linear-gradient(45deg,rgba(242,120,75,.10) 0 8px,transparent 8px 16px);}'
  + '.tr-seat.is-extra{box-shadow:inset 0 0 0 4px var(--lcs-accent);}'
  + '.tr-pass{position:absolute;inset:0;padding:0;border:0;background:transparent;border-radius:12px;cursor:pointer;touch-action:manipulation;display:grid;place-items:end center;-webkit-tap-highlight-color:transparent;} .tr-pass[hidden]{display:none;}'
  + '.tr-pass:disabled{cursor:default;} .tr-pass:focus-visible{outline:3px solid #fff;outline-offset:-4px;}'
  + '.tr-pass .tr-pic{width:var(--tr-pic);height:var(--tr-pic);margin-bottom:calc((var(--tr-seat) - var(--tr-pic)) / 4);}'
  + '.tr-pic{object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(20,30,20,.2));}'
  + '.tr-num{position:absolute;right:3px;top:3px;min-width:32px;height:32px;padding:0 5px;box-sizing:border-box;border-radius:16px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:18px;line-height:28px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);pointer-events:none;z-index:2;}'
  + '.tr-num:not(.is-on){display:none;}'
  + '.tr-num.is-flash{animation:tr-flash 1.1s ease 1 both;} @keyframes tr-flash{0%{opacity:0;transform:scale(.6);}15%{opacity:1;transform:scale(1.15);}30%{transform:scale(1);}75%{opacity:1;}100%{opacity:0;}}'
  + '.tr-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:40px;height:40px;line-height:36px;font-size:23px;border-radius:20px;}'
  + '.tr-num.tr-pop{animation:tr-pop .32s var(--lcs-ease) var(--tr-delay,0ms) both;} @keyframes tr-pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}'
  + '.tr-wrap.is-stack .tr-num{min-width:24px;height:24px;font-size:14px;line-height:20px;right:1px;top:1px;} .tr-wrap.is-stack .tr-num.is-gold{min-width:30px;height:30px;line-height:26px;font-size:17px;}'
  + '.tr-seat.is-extra .tr-num{background:var(--lcs-accent);}'
  /* the wheels and the rail (row only) */
  + '.tr-wheels{position:absolute;left:0;right:0;bottom:-16px;height:28px;display:flex;justify-content:space-between;padding:0 34px;box-sizing:border-box;pointer-events:none;}'
  + '.tr-wheel{width:28px;height:28px;border-radius:50%;background:radial-gradient(circle,#9AA5A2 0 22%,#3B4442 24% 100%);box-shadow:0 0 0 3px #2A3230;}'
  + '.tr-wrap.is-stack .tr-wheels{display:none;}'
  + '.tr-car.tr-chug .tr-wheel{animation:tr-spin .5s linear 2;} @keyframes tr-spin{to{transform:rotate(360deg);}}'
  + '.tr-car.tr-chug{animation:tr-chug 1.1s ease-in-out 1;} @keyframes tr-chug{0%,100%{transform:none;}20%{transform:translateX(10px);}40%{transform:translateX(-3px) translateY(-2px);}60%{transform:translateX(7px);}80%{transform:translateX(-2px);}}'
  + '.tr-car.tr-brake{animation:tr-brake .45s ease 1;} @keyframes tr-brake{0%,100%{transform:none;}30%{transform:translateX(-7px);}60%{transform:translateX(4px);}}'
  + '.tr-car.tr-wobble{animation:tr-brake .35s ease 1;}'
  /* the platform */
  + '.tr-plat{box-sizing:border-box;display:grid;grid-template-columns:repeat(var(--tr-pcols),var(--tr-plat));gap:var(--tr-pgap);padding:var(--tr-ppad);padding-top:calc(var(--tr-ppad) + 8px);border-radius:14px;background:#EFE6D6;box-shadow:inset 0 0 0 2px #DCCFB8;position:relative;justify-content:center;}'
  + '.tr-plat::before{content:"";position:absolute;left:0;right:0;top:0;height:8px;border-radius:14px 14px 0 0;background:repeating-linear-gradient(90deg,#F4C542 0 16px,#3B4442 16px 24px);opacity:.85;}'
  + '.tr-wrap.is-stack .tr-plat::before{left:0;right:auto;top:0;bottom:0;width:8px;height:auto;border-radius:14px 0 0 14px;background:repeating-linear-gradient(180deg,#F4C542 0 16px,#3B4442 16px 24px);}'
  + '.tr-wrap.is-stack .tr-plat{padding-top:var(--tr-ppad);padding-left:calc(var(--tr-ppad) + 8px);}'
  + '.tr-slot{position:relative;width:var(--tr-plat);height:var(--tr-plat);} .tr-slot[hidden]{display:none;}'
  + '.tr-slot.is-empty::after{content:"";position:absolute;left:22%;right:22%;bottom:6%;height:14%;border-radius:50%;border:2px dashed rgba(90,70,40,.28);}'
  + '.tr-animal{position:absolute;inset:0;padding:0;border:0;background:transparent;border-radius:12px;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;} .tr-animal[hidden]{display:none;}'
  + '.tr-animal:hover:not(:disabled){background:rgba(255,255,255,.55);} .tr-animal:disabled{cursor:default;} .tr-animal:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.tr-animal .tr-pic{width:var(--tr-plat);height:var(--tr-plat);}'
  /* the note */
  + '.tr-note{text-align:center;font-family:var(--lcs-font-body);font-weight:700;font-size:clamp(15px,1vw + 11px,19px);line-height:1.35;color:var(--lcs-structure);max-width:44ch;} .tr-note[hidden]{display:none;}'
  + '.tr-note-1{font-weight:800;} .tr-note.is-wrong{color:#B3512A;} .tr-note-2:empty{display:none;}'
  + '.tr-wrap.is-stack .tr-note{order:1;}'
  + '.tr-wrap.is-stack .tr-body{order:2;}'
  + '@media (prefers-reduced-motion:reduce){.tr-car,.tr-wheel,.tr-num,.tr-ticket{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'tr-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = AnimalTrainActivity;
if (typeof window !== 'undefined') window.AnimalTrainActivity = AnimalTrainActivity;
