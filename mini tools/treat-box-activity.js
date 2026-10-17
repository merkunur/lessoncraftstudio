/* =====================================================================
   treat-box-activity.js — ACTIVITY #14 of the one-by-one rebuild:
   "Feed Mochi — count out treats" (K.CC.B.5) — THE TREAT BOX.
   Design sheet: docs/activities-rebuild/014-treat-box.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE LID. The order ticket shows a number; the tray holds a
   heap of library treats (always 12, or 7 up to five — its size never tells).
   A tap on a treat sends it into a lidded bakery box, where it is gone from
   sight, so the count has to stay in the child's head and the last number
   said is how many are in. A tap on the lid lifts it for a peek (it drops
   again by itself); while the box is open, a tap on a treat inside puts it
   back on the tray. Check opens the box: a miss leaves the lid off; a second
   miss numbers the treats and marks the extra ones and the empty places
   still needed. No mascot is drawn: a ticket, a box, a lid, a tray, library
   treats.

   ACTIVITY LAYER ONLY: the model is treat-box-core.js; pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.TreatBoxActivity.st / ._order / ._pool / .PEEK_MS.
   ===================================================================== */
'use strict';

var TreatBoxActivity = {
  id: 'treat-box',
  apparatusClasses: ['tb-'],

  strings: {
    title:       {en:'Mochi’s Treat Box',de:'Mochis Naschkiste',fr:'La boîte à gourmandises de Mochi',es:'La caja de golosinas de Mochi',pt:'A caixa de guloseimas do Mochi',it:'La scatola delle golosità di Mochi',nl:'Mochi’s traktatiedoos',sv:'Mochis godsaksask',da:'Mochis kageæske',no:'Mochis kakeboks',fi:'Mochin herkkulaatikko'},
    instruction: {en:'Read the order and put that many treats in the box. With the lid on, the treats are out of sight: keep count, and tap the lid to peek.',de:'Lies die Bestellung und lege so viele Leckereien in die Schachtel. Mit Deckel sind die Leckereien nicht zu sehen: Zähle mit und tippe auf den Deckel, um hineinzuschauen.',fr:'Lis la commande et mets autant de gourmandises dans la boîte. Avec le couvercle, les gourmandises ne se voient pas : garde le compte, et touche le couvercle pour regarder.',es:'Lee el pedido y pon esa cantidad de golosinas en la caja. Con la tapa puesta, las golosinas no se ven: lleva la cuenta y toca la tapa para mirar.',pt:'Leia o pedido e coloque essa quantidade de guloseimas na caixa. Com a tampa, as guloseimas não aparecem: guarde a contagem e toque na tampa para espiar.',it:'Leggi l’ordine e metti nella scatola tante golosità quante ne chiede. Con il coperchio, le golosità non si vedono: tieni il conto e tocca il coperchio per sbirciare.',nl:'Lees de bestelling en doe zoveel lekkernijen in de doos. Met het deksel erop zie je ze niet: tel goed mee en tik op het deksel om te kijken.',sv:'Läs beställningen och lägg så många godsaker i asken. Med locket på syns de inte: håll räkningen och tryck på locket för att kika.',da:'Læs bestillingen, og læg så mange lækkerier i æsken. Med låget på kan de ikke ses: hold tællingen, og tryk på låget for at kigge.',no:'Les bestillingen og legg så mange godsaker i boksen. Med lokket på synes de ikke: hold tellingen, og trykk på lokket for å kikke.',fi:'Lue tilaus ja laita laatikkoon niin monta herkkua. Kun kansi on päällä, herkut eivät näy: pidä lasku mielessä ja napauta kantta, niin voit kurkistaa.'},
    prompt:      {en:'Put as many treats in the box as the order says, then press Check.',de:'Lege so viele Leckereien in die Schachtel, wie die Bestellung sagt, und drücke dann auf Prüfen.',fr:'Mets dans la boîte autant de gourmandises que la commande en demande, puis appuie sur Vérifier.',es:'Pon en la caja tantas golosinas como dice el pedido y luego oprime Comprobar.',pt:'Coloque na caixa tantas guloseimas quanto o pedido diz e depois aperte Verificar.',it:'Metti nella scatola tante golosità quante ne chiede l’ordine, poi premi Verifica.',nl:'Doe zoveel lekkernijen in de doos als de bestelling zegt en druk dan op Controleer.',sv:'Lägg lika många godsaker i asken som beställningen säger och tryck sedan på Kontrollera.',da:'Læg lige så mange lækkerier i æsken, som bestillingen siger, og tryk så på Tjek.',no:'Legg like mange godsaker i boksen som bestillingen sier, og trykk så på Sjekk.',fi:'Laita laatikkoon yhtä monta herkkua kuin tilauksessa lukee ja paina sitten Tarkista.'},
    ticketLabel: {en:'The order: {n}',de:'Die Bestellung: {n}',fr:'La commande : {n}',es:'El pedido: {n}',pt:'O pedido: {n}',it:'L’ordine: {n}',nl:'De bestelling: {n}',sv:'Beställningen: {n}',da:'Bestillingen: {n}',no:'Bestillingen: {n}',fi:'Tilaus: {n}'},
    trayLabel:   {en:'The tray',de:'Das Tablett',fr:'Le plateau',es:'La bandeja',pt:'A bandeja',it:'Il vassoio',nl:'Het dienblad',sv:'Brickan',da:'Bakken',no:'Brettet',fi:'Tarjotin'},
    treatPut:    {en:'Put this treat in the box',de:'Diese Leckerei in die Schachtel legen',fr:'Mettre cette gourmandise dans la boîte',es:'Poner esta golosina en la caja',pt:'Colocar esta guloseima na caixa',it:'Mettere questa golosità nella scatola',nl:'Deze lekkernij in de doos doen',sv:'Lägg godsaken i asken',da:'Læg lækkeriet i æsken',no:'Legg godsaken i boksen',fi:'Laita herkku laatikkoon'},
    boxLabel:    {en:'The box',de:'Die Schachtel',fr:'La boîte',es:'La caja',pt:'A caixa',it:'La scatola',nl:'De doos',sv:'Asken',da:'Æsken',no:'Boksen',fi:'Laatikko'},
    lidLabel:    {en:'The lid: tap to peek inside',de:'Der Deckel: Tippe, um hineinzuschauen',fr:'Le couvercle : touche pour regarder dedans',es:'La tapa: toca para mirar adentro',pt:'A tampa: toque para espiar dentro',it:'Il coperchio: tocca per sbirciare dentro',nl:'Het deksel: tik om erin te kijken',sv:'Locket: tryck för att kika in',da:'Låget: tryk for at kigge ind',no:'Lokket: trykk for å kikke inn',fi:'Kansi: napauta, niin voit kurkistaa sisään'},
    treatBack:   {en:'Put this treat back on the tray',de:'Diese Leckerei zurück aufs Tablett legen',fr:'Remettre cette gourmandise sur le plateau',es:'Regresar esta golosina a la bandeja',pt:'Devolver esta guloseima à bandeja',it:'Rimettere questa golosità sul vassoio',nl:'Deze lekkernij terugleggen op het dienblad',sv:'Lägg tillbaka godsaken på brickan',da:'Læg lækkeriet tilbage på bakken',no:'Legg godsaken tilbake på brettet',fi:'Laita herkku takaisin tarjottimelle'},
    emptyBox:    {en:'Empty the box',de:'Schachtel leeren',fr:'Vider la boîte',es:'Vaciar la caja',pt:'Esvaziar a caixa',it:'Svuota la scatola',nl:'Doos leegmaken',sv:'Töm asken',da:'Tøm æsken',no:'Tøm boksen',fi:'Tyhjennä laatikko'},
    hintStart:   {en:'Tap a treat on the tray to put it in the box.',de:'Tippe auf eine Leckerei auf dem Tablett, um sie in die Schachtel zu legen.',fr:'Touche une gourmandise sur le plateau pour la mettre dans la boîte.',es:'Toca una golosina de la bandeja para ponerla en la caja.',pt:'Toque em uma guloseima da bandeja para colocá-la na caixa.',it:'Tocca una golosità sul vassoio per metterla nella scatola.',nl:'Tik op een lekkernij op het dienblad om hem in de doos te doen.',sv:'Tryck på en godsak på brickan för att lägga den i asken.',da:'Tryk på et lækkeri på bakken for at lægge det i æsken.',no:'Trykk på en godsak på brettet for å legge den i boksen.',fi:'Napauta tarjottimella olevaa herkkua, niin se menee laatikkoon.'},
    hintMore:    {en:'Too many in the box. Tap a treat in the box to put it back.',de:'Zu viele in der Schachtel. Tippe auf eine Leckerei in der Schachtel, um sie zurückzulegen.',fr:'Trop de gourmandises dans la boîte. Touche une gourmandise dans la boîte pour la remettre.',es:'Hay demasiadas en la caja. Toca una golosina de la caja para regresarla.',pt:'Tem guloseimas demais na caixa. Toque em uma guloseima na caixa para devolvê-la.',it:'Troppe nella scatola. Tocca una golosità nella scatola per rimetterla sul vassoio.',nl:'Te veel in de doos. Tik op een lekkernij in de doos om hem terug te leggen.',sv:'För många i asken. Tryck på en godsak i asken för att lägga tillbaka den.',da:'For mange i æsken. Tryk på et lækkeri i æsken for at lægge det tilbage.',no:'For mange i boksen. Trykk på en godsak i boksen for å legge den tilbake.',fi:'Laatikossa on liikaa. Napauta laatikossa olevaa herkkua, niin se palaa tarjottimelle.'},
    hintFewer:   {en:'Too few in the box. Tap a treat on the tray to put in one more.',de:'Zu wenige in der Schachtel. Tippe auf eine Leckerei auf dem Tablett, um noch eine hineinzulegen.',fr:'Pas assez de gourmandises dans la boîte. Touche une gourmandise sur le plateau pour en ajouter une.',es:'Faltan en la caja. Toca una golosina de la bandeja para poner una más.',pt:'Faltam guloseimas na caixa. Toque em uma guloseima da bandeja para colocar mais uma.',it:'Troppo poche nella scatola. Tocca una golosità sul vassoio per metterne un’altra.',nl:'Te weinig in de doos. Tik op een lekkernij op het dienblad om er nog een in te doen.',sv:'För få i asken. Tryck på en godsak på brickan för att lägga i en till.',da:'For få i æsken. Tryk på et lækkeri på bakken for at lægge ét mere i.',no:'For få i boksen. Trykk på en godsak på brettet for å legge i en til.',fi:'Laatikossa on liian vähän. Napauta tarjottimella olevaa herkkua, niin laatikkoon tulee yksi lisää.'},
    celebrate:   {en:'Just right — {n}!',de:'Genau richtig – {n}!',fr:'C’est juste — {n} !',es:'¡Exacto: {n}!',pt:'Certinho: {n}!',it:'Giusto: {n}!',nl:'Precies goed – {n}!',sv:'Precis rätt – {n}!',da:'Lige præcis – {n}!',no:'Akkurat riktig – {n}!',fi:'Juuri oikein – {n}!'},
    setRange:    {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:    {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',es:'Hasta 5',pt:'Até 5',it:'Fino a 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:   {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setLid:      {en:'The lid',de:'Der Deckel',fr:'Le couvercle',es:'La tapa',pt:'A tampa',it:'Il coperchio',nl:'Het deksel',sv:'Locket',da:'Låget',no:'Lokket',fi:'Kansi'},
    lidOn:       {en:'On — keep count',de:'Drauf – im Kopf mitzählen',fr:'Fermé — compter dans sa tête',es:'Puesta: llevar la cuenta',pt:'Fechada: guardar a contagem',it:'Chiuso: tenere il conto',nl:'Erop – in je hoofd tellen',sv:'På – räkna i huvudet',da:'På – tæl i hovedet',no:'På – tell i hodet',fi:'Kiinni – laske mielessä'},
    lidOff:      {en:'Off — the box stays open',de:'Ab – die Schachtel bleibt offen',fr:'Enlevé — la boîte reste ouverte',es:'Quitada: la caja queda abierta',pt:'Tirada: a caixa fica aberta',it:'Tolto: la scatola resta aperta',nl:'Eraf – de doos blijft open',sv:'Av – asken står öppen',da:'Af – æsken står åben',no:'Av – boksen står åpen',fi:'Pois – laatikko on auki'}
  },

  defaults: { range: 'to10', lid: 'on' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'lid', type: 'choice', labelKey: 'setLid', options: [{ value: 'on', labelKey: 'lidOn' }, { value: 'off', labelKey: 'lidOff' }] }
  ],

  FLY_MS: 380,
  PEEK_MS: 2200,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null; this._peekUntil = 0; this._peekTimer = null;
    injectTreatBoxCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(TreatBoxCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the tray stays bare */ });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } clearTimeout(this._peekTimer); },
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return TreatBoxCore.POOLS[r] ? r : 'to10'; },
  _lid: function () { var l = this.api && this.api.settings && this.api.settings.lid; return l === 'off' ? 'off' : 'on'; },
  _ensurePool: function () { var key = this._range(); if (!this._pool || this._poolKey !== key) { this._pool = TreatBoxCore.rounds(key, 'tb'); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'treat-box.' + r.id,
      promptKey: 'prompt',
      promptArgs: { n: r.n },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = TreatBoxCore.newState(r); tool._peekUntil = 0; clearTimeout(tool._peekTimer); },
      check: function (tool) { var res = TreatBoxCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return TreatBoxCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = TreatBoxCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'tb')[0]);
    var wrap = api.el('div', 'tb-wrap'); this._wrap = wrap;

    /* the box: its places, the treats inside, the lid; above it the order ticket and Empty */
    var zone = api.el('div', 'tb-zone');
    var box = api.el('div', 'tb-box'); box.setAttribute('role', 'group'); box.setAttribute('aria-label', t('boxLabel'));
    this._box = box; this._places = []; this._inside = [];
    for (var j = 0; j < 12; j++) {
      (function (slot) {
        var p = api.el('div', 'tb-place'); box.appendChild(p); self._places.push(p);
        var b = api.el('button', 'tb-in'); b.type = 'button'; b.hidden = true; b.setAttribute('aria-label', t('treatBack'));
        b.addEventListener('click', function () { self._takeOut(slot); });
        var nb = api.el('span', 'tb-num'); nb.setAttribute('aria-hidden', 'true'); b.appendChild(nb);
        box.appendChild(b); self._inside.push(b);
      }(j));
    }
    var lid = api.el('button', 'tb-lid'); lid.type = 'button'; lid.setAttribute('aria-label', t('lidLabel'));
    lid.innerHTML = '<span class="tb-ribbon" aria-hidden="true"></span><span class="tb-slot" aria-hidden="true"></span><svg class="tb-eye" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" fill="#fff" stroke="#7A4E0E" stroke-width="1.8"/><circle cx="12" cy="12" r="3.2" fill="#7A4E0E"/></svg>';
    lid.addEventListener('click', function () { self._peek(); });
    this._lidEl = lid; box.appendChild(lid);
    var ticket = api.el('button', 'tb-ticket'); ticket.type = 'button';
    ticket.addEventListener('click', function () { self._speakNumber(self.st.n); });
    this._ticket = ticket;
    var head = api.el('div', 'tb-head'); head.appendChild(ticket);
    var clear = api.el('button', 'tb-empty'); clear.type = 'button'; clear.textContent = t('emptyBox');
    clear.addEventListener('click', function () { self._empty(); });
    this._clear = clear; head.appendChild(clear);
    zone.appendChild(head);
    zone.appendChild(box);
    wrap.appendChild(zone);

    /* the tray: the heap of treats */
    var tray = api.el('div', 'tb-tray'); tray.setAttribute('role', 'group'); tray.setAttribute('aria-label', t('trayLabel'));
    this._tray = tray; this._treats = [];
    for (var h = 0; h < 12; h++) {
      (function (k) {
        var b = api.el('button', 'tb-treat'); b.type = 'button'; b.hidden = true; b.setAttribute('aria-label', t('treatPut'));
        b.addEventListener('click', function () { self._put(k); });
        tray.appendChild(b); self._treats.push(b);
      }(h));
    }
    wrap.appendChild(tray);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = TreatBoxCore.layout(this._width(), st ? st.slots : 12);
    var w = this._wrap;
    ['wide', 'stack', 'narrow'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.setProperty('--tb-cell', L.cell + 'px');
    w.style.setProperty('--tb-pic', L.pic + 'px');
    w.style.setProperty('--tb-pad', L.pad + 'px');
    w.style.setProperty('--tb-bcols', String(L.boxCols));
    w.style.setProperty('--tb-brows', String(L.boxRows));
    w.style.setProperty('--tb-tcols', String(L.trayCols));
    w.style.setProperty('--tb-trows', String(L.trayRows));
    this._layoutFor = st ? st.slots : 12;
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
  _pic: function (holder) {
    var img = holder.querySelector('img'), noun = this.st.noun;
    if (!this._theme || !this._theme.nouns[noun]) return null;
    if (img && img.getAttribute('data-noun') !== noun) { img.remove(); img = null; }
    if (!img) { img = LCSPictures.img(this._theme, noun, this.api.lang, { plural: false }); img.className = 'tb-pic'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.setAttribute('data-noun', noun); holder.insertBefore(img, holder.firstChild); }
    return img;
  },
  _peeking: function () { return Date.now() < this._peekUntil; },

  _paint: function () {
    var st = this.st, C = TreatBoxCore, t = this.api.t;
    if (this._layoutFor !== st.slots) this._layout();
    var L = this._L;
    if (this._spotsFor !== st.id + ':' + L.mode) { this._spots = C.traySpots(st, L); this._spotsFor = st.id + ':' + L.mode; }
    var open = C.lidOpen(st, this._lid(), this._peeking());
    this._wrap.classList.toggle('is-done', st.done);
    this._wrap.classList.toggle('is-open', open);
    this._wrap.classList.toggle('lid-off', this._lid() === 'off');
    /* the ticket */
    this._ticket.textContent = String(st.n);
    this._ticket.setAttribute('aria-label', String(t('ticketLabel')).replace('{n}', String(st.n)));   /* the shell's t() does not fill placeholders */
    /* the lid */
    this._lidEl.disabled = open || st.done;
    this._lidEl.setAttribute('aria-expanded', String(open));
    /* the box's places and the treats inside */
    var nums = C.boxNums(st), marks = C.slotMarks(st);
    for (var j = 0; j < 12; j++) {
      var p = this._places[j], b = this._inside[j], here = j < st.slots;
      p.hidden = !here;
      b.hidden = !(here && j < st.box.length && open);
      if (here) {
        var cell = C.slotCell(j, L);
        var x = L.pad + cell[0] * L.cell, y = L.pad + cell[1] * L.cell;
        p.style.left = x + 'px'; p.style.top = y + 'px';
        b.style.left = (x + (L.cell - L.pic) / 2) + 'px'; b.style.top = (y + (L.cell - L.pic) / 2) + 'px';
        p.classList.toggle('is-extra', marks[j] === 'extra');
        p.classList.toggle('is-need', marks[j] === 'need');
      }
      if (!b.hidden) this._pic(b);
      b.disabled = st.done;
      var nb = b.querySelector('.tb-num'), v = (j < st.box.length) ? nums[j] : '';
      nb.textContent = v; nb.classList.toggle('is-on', !!v); nb.classList.toggle('is-gold', st.done && j === st.box.length - 1);
    }
    /* the tray */
    for (var h = 0; h < 12; h++) {
      var tr = this._treats[h], on = h < st.tray && !C.inBox(st, h);
      tr.hidden = !on;
      if (h < st.tray) { var s = this._spots[h]; tr.style.left = s.x + 'px'; tr.style.top = s.y + 'px'; tr.style.setProperty('--tb-tilt', s.tilt + 'deg'); }
      if (on) this._pic(tr);
      tr.disabled = st.done || st.box.length >= st.slots;
    }
    this._clear.hidden = st.done || st.box.length === 0;
  },

  /* ---------------- the hand ---------------- */
  /* a treat flies from where it was to where it lands (or into the closed box) */
  _fly: function (fromRect, toRect, noun) {
    if (!fromRect || !toRect || !fromRect.width || typeof document === 'undefined' || !this._theme) return;
    var img = LCSPictures.img(this._theme, noun, this.api.lang, { plural: false });
    if (!img || !img.animate) return;
    img.className = 'tb-flyer'; img.alt = ''; img.setAttribute('aria-hidden', 'true');
    img.style.left = fromRect.left + 'px'; img.style.top = fromRect.top + 'px'; img.style.width = fromRect.width + 'px'; img.style.height = fromRect.height + 'px';
    document.body.appendChild(img);
    var dx = toRect.left + toRect.width / 2 - (fromRect.left + fromRect.width / 2), dy = toRect.top + toRect.height / 2 - (fromRect.top + fromRect.height / 2);
    var s = toRect.width / fromRect.width;
    var a = img.animate([{ transform: 'none', opacity: 1 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')', opacity: toRect.vanish ? 0 : 1 }], { duration: this.FLY_MS, easing: 'cubic-bezier(.3,.7,.2,1)' });
    a.onfinish = function () { img.remove(); };
  },
  _put: function (h) {
    var st = this.st, el = this._treats[h], im = el.querySelector('img'), from = im ? im.getBoundingClientRect() : null;
    var wasOpen = TreatBoxCore.lidOpen(st, this._lid(), this._peeking());
    var j = TreatBoxCore.put(st, h);
    if (j < 0) return;
    if (this._peeking()) this._peek(true);
    this.api.sound(440 + 18 * st.box.length);
    this._paint();
    var to;
    if (wasOpen) { var r = this._inside[j].getBoundingClientRect(); to = { left: r.left, top: r.top, width: r.width, height: r.height }; var ii = this._inside[j].querySelector('img'); if (ii) { ii.style.visibility = 'hidden'; setTimeout(function () { ii.style.visibility = ''; }, this.FLY_MS); } }
    else { var sl = this._lidEl.querySelector('.tb-slot').getBoundingClientRect(); to = { left: sl.left + sl.width / 2 - 20, top: sl.top + sl.height / 2 - 20, width: 40, height: 40, vanish: true }; }   /* into the slot */
    this._fly(from, to, st.noun);
    if (!wasOpen) bounce(this._box, 'tb-thump');
    this.api.track('put', { n: st.n, inBox: st.box.length });
  },
  _takeOut: function (j) {
    var st = this.st, im = this._inside[j].querySelector('img'), from = im ? im.getBoundingClientRect() : null;
    var h = TreatBoxCore.takeOut(st, j);
    if (h < 0) return;
    if (this._peeking()) this._peek(true);
    this.api.sound(330);
    this._paint();
    var ti = this._treats[h].querySelector('img');
    if (ti && from) { var r = ti.getBoundingClientRect(); this._fly(from, { left: r.left, top: r.top, width: r.width, height: r.height }, st.noun); ti.style.visibility = 'hidden'; setTimeout(function () { ti.style.visibility = ''; }, this.FLY_MS); }
    this.api.track('takeOut', { n: st.n, inBox: st.box.length });
  },
  _empty: function () {
    if (!TreatBoxCore.empty(this.st)) return;
    this.api.sound(300);
    this._paint();
    this.api.track('empty', { n: this.st.n });
  },
  /* a peek: the lid lifts and drops again by itself; a tap inside keeps it up (keep=true) */
  _peek: function (keep) {
    var st = this.st, self = this;
    if (!st || st.done) return;
    if (!keep) { if (TreatBoxCore.lidOpen(st, this._lid(), this._peeking())) return; st.peeks++; this.api.track('peek', { n: st.n, inBox: st.box.length, peeks: st.peeks }); }
    this._peekUntil = Date.now() + this.PEEK_MS;
    clearTimeout(this._peekTimer);
    this._peekTimer = setTimeout(function () { if (self._wrap && self._wrap.isConnected) self._paint(); }, this.PEEK_MS + 30);
    this._paint();
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._peekUntil = 0; clearTimeout(this._peekTimer);
    this._paint();
    if (res.slip === 'none') return;
    if (res.ok) { this.api.sound(660); this._speakNumber(st.n); for (var i = 0; i < this._inside.length; i++) { var nb = this._inside[i].querySelector('.tb-num'); if (nb.classList.contains('is-on')) bounce(nb, 'tb-pop'); } }
    else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, a: res.a, misses: st.misses, peeks: st.peeks });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var tbCssDone = false;
function injectTreatBoxCSS() {
  if (tbCssDone || typeof document === 'undefined') return;
  tbCssDone = true;
  var css = ''
  + '.tb-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:14px;--tb-cell:100px;--tb-pic:94px;--tb-pad:8px;--tb-bcols:6;--tb-brows:2;--tb-tcols:6;--tb-trows:2;}'
  /* the box zone: a head row (the order ticket, Empty the box) over the box */
  + '.tb-zone{position:relative;display:flex;flex-direction:column;align-items:stretch;gap:8px;}'
  + '.tb-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 4px;}'
  + '.tb-box{position:relative;width:calc(var(--tb-bcols) * var(--tb-cell) + 2 * var(--tb-pad));height:calc(var(--tb-brows) * var(--tb-cell) + 2 * var(--tb-pad));box-sizing:border-box;border-radius:14px;background:linear-gradient(180deg,#F7E7CC,#EED6AE);box-shadow:inset 0 0 0 4px #C99A5B,inset 0 10px 18px rgba(120,80,30,.22),0 8px 16px rgba(80,50,15,.18);perspective:900px;}'
  + '.tb-place{position:absolute;width:var(--tb-cell);height:var(--tb-cell);box-sizing:border-box;} .tb-place[hidden]{display:none;}'
  + '.tb-place::after{content:"";position:absolute;inset:8%;border-radius:50%;background:radial-gradient(circle,#FFFBF2 0 55%,#F1DFC0 56% 100%);box-shadow:inset 0 2px 4px rgba(120,80,30,.18);}'
  + '.tb-place.is-need::after{background:transparent;border:3px dashed var(--lcs-structure);box-shadow:none;}'
  + '.tb-place.is-extra::after{box-shadow:0 0 0 4px var(--lcs-accent);}'
  + '.tb-in{position:absolute;width:var(--tb-pic);height:var(--tb-pic);padding:0;border:0;background:transparent;cursor:pointer;touch-action:manipulation;z-index:1;-webkit-tap-highlight-color:transparent;} .tb-in[hidden]{display:none;}'
  + '.tb-in:disabled{cursor:default;} .tb-in:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;border-radius:12px;}'
  + '.tb-pic{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(40,25,10,.22));transition:transform .15s;}'
  /* the lid: kraft card + a ribbon; a peek folds it back on its hinge */
  + '.tb-lid{position:absolute;inset:-6px;z-index:3;border:0;padding:0;border-radius:16px;cursor:pointer;touch-action:manipulation;background:linear-gradient(180deg,#DDB57A,#C99A5B);box-shadow:inset 0 0 0 3px #A97A3E,0 6px 12px rgba(80,50,15,.24);transform-origin:50% 0;transition:transform .32s var(--lcs-ease),opacity .32s;-webkit-tap-highlight-color:transparent;}'
  + '.tb-ribbon{position:absolute;inset:0;border-radius:16px;background:linear-gradient(90deg,transparent calc(50% - 9px),#E0603A calc(50% - 9px) calc(50% + 9px),transparent calc(50% + 9px)),linear-gradient(180deg,transparent calc(50% - 9px),#E0603A calc(50% - 9px) calc(50% + 9px),transparent calc(50% + 9px));pointer-events:none;}'
  + '.tb-ribbon::after{content:"";position:absolute;left:50%;top:50%;width:46px;height:30px;margin:-15px 0 0 -23px;border-radius:50%;background:radial-gradient(circle at 25% 50%,#F07A55 0 35%,transparent 36%),radial-gradient(circle at 75% 50%,#F07A55 0 35%,transparent 36%),radial-gradient(circle,#C24A26 0 18%,transparent 19%);}'
  + '.tb-slot{position:absolute;left:50%;top:16%;width:min(46%,220px);height:16px;transform:translateX(-50%);border-radius:8px;background:linear-gradient(180deg,#4A2E10,#7A4E1E);box-shadow:inset 0 3px 4px rgba(0,0,0,.5),0 1px 0 rgba(255,240,210,.6);pointer-events:none;}'
  + '.tb-eye{position:absolute;right:12px;bottom:10px;width:34px;height:34px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.2));pointer-events:none;}'
  + '.tb-lid:hover:not(:disabled){filter:brightness(1.05);} .tb-lid:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.tb-wrap.is-open .tb-lid{transform:rotateX(84deg);opacity:0;pointer-events:none;}'
  + '.tb-wrap.lid-off .tb-lid{display:none;}'
  + '.tb-box.tb-thump{animation:tb-thump .26s ease 1;} @keyframes tb-thump{0%,100%{transform:none;}40%{transform:translateY(3px) scaleY(.985);}}'
  /* the order ticket */
  + '.tb-ticket{position:relative;z-index:4;min-width:max(56px,calc(var(--tb-cell) * .9));height:max(48px,calc(var(--tb-cell) * .62));padding:0 12px;box-sizing:border-box;border:0;border-radius:8px;background:#FFFDF6;color:#7A4E0E;font-family:var(--lcs-font-display);font-weight:800;font-size:max(30px,calc(var(--tb-cell) * .46));line-height:1;cursor:pointer;touch-action:manipulation;transform:rotate(-3deg);box-shadow:0 0 0 2px #E3C68E,0 5px 10px rgba(80,50,15,.22);background-image:radial-gradient(circle at 50% 0,#C99A5B 0 5px,transparent 6px);}'
  + '.tb-ticket:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;}'
  + '.tb-empty{min-height:44px;padding:0 16px;border-radius:22px;border:2px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-body);font-weight:800;font-size:15px;cursor:pointer;touch-action:manipulation;} .tb-empty[hidden]{display:block;visibility:hidden;}'
  /* the tray */
  + '.tb-tray{position:relative;width:calc(var(--tb-tcols) * var(--tb-cell) + 2 * var(--tb-pad));height:calc(var(--tb-trows) * var(--tb-cell) + 2 * var(--tb-pad));box-sizing:border-box;border-radius:18px;background:linear-gradient(180deg,#E9F1F4,#D6E4EA);box-shadow:inset 0 0 0 3px #B7CBD4,0 6px 12px rgba(30,60,80,.12);}'
  + '.tb-treat{position:absolute;width:var(--tb-pic);height:var(--tb-pic);padding:0;border:0;background:transparent;cursor:pointer;touch-action:manipulation;transform:rotate(var(--tb-tilt,0deg));-webkit-tap-highlight-color:transparent;} .tb-treat[hidden]{display:none;}'
  + '.tb-treat:hover:not(:disabled) .tb-pic{transform:scale(1.05);} .tb-treat:disabled{cursor:default;} .tb-treat:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;border-radius:12px;}'
  + '.tb-flyer{position:fixed;z-index:50;pointer-events:none;object-fit:contain;}'
  + '.tb-num{position:absolute;right:-2px;top:-2px;min-width:28px;height:28px;padding:0 5px;box-sizing:border-box;border-radius:14px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:16px;line-height:24px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);pointer-events:none;z-index:2;}'
  + '.tb-num:not(.is-on){display:none;} .tb-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:36px;height:36px;line-height:32px;font-size:21px;border-radius:18px;}'
  + '.tb-num.tb-pop{animation:tb-pop .3s var(--lcs-ease) 1;} @keyframes tb-pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}'
  + '.tb-wrap.is-narrow .tb-num{min-width:20px;height:20px;padding:0 3px;font-size:12px;line-height:16px;right:-4px;top:-4px;} .tb-wrap.is-narrow .tb-num.is-gold{min-width:26px;height:26px;line-height:22px;font-size:15px;}'
  + '.tb-wrap.is-stack{gap:10px;} .tb-wrap.is-narrow{gap:8px;} .tb-wrap.is-narrow .tb-eye{width:24px;height:24px;right:6px;bottom:4px;}'
  + '@media (prefers-reduced-motion:reduce){.tb-lid{transition:none;}.tb-box,.tb-num{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'tb-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = TreatBoxActivity;
if (typeof window !== 'undefined') window.TreatBoxActivity = TreatBoxActivity;
