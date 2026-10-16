/* =====================================================================
   roll-book-activity.js — ACTIVITY #13 of the one-by-one rebuild:
   "Mama's Roll Call" (K.CC.B.5) — THE ROLL BOOK.
   Design sheet: docs/activities-rebuild/013-roll-book.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: THE COUNT BECOMES WRITING. Mama's call is a DOT CARD (not
   a numeral). A tap on the raft sends one duckling paddling to the next
   spot on the bank; a tap on a duckling on the bank sends it back. Then the
   child signs the roll: presses the number stamp for how many came and
   traces it in the mud (the same handwriting shapes as the Fading Line —
   barred seven where schools write one). Check reads the bank first, then
   the signature; a wrong Check numbers the bank's ducklings, a second one
   Mama's dots too. The help never moves a duckling. No mascot is drawn:
   a card, a raft, a bank, library ducklings, a mud slate.

   ACTIVITY LAYER ONLY: the model is roll-book-core.js (which loads
   number-trace-core.js + stroke-trace-core.js unchanged); pictures through
   lcs-pictures.js; lcs-shell.js is untouched.
   Test seams: window.RollBookActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var RollBookActivity = {
  id: 'roll-book',
  apparatusClasses: ['rb-'],

  strings: {
    title:          {en:'Mama’s Roll Call',de:'Der Appell von Mama Ente',fr:'L’appel de Maman Cane',es:'El pase de lista de Mamá Pata',pt:'A chamada da Mamãe Pata',it:'L’appello di Mamma Papera',nl:'Het appèl van Mama Eend',sv:'Mamma Ankas upprop',da:'Mor Ands navneopråb',no:'Mamma Ands opprop',fi:'Äiti Ankan nimenhuuto'},
    instruction:    {en:'Send as many ducklings as Mama’s card shows. Then sign the roll: press the number and trace it in the mud.',de:'Schicke so viele Küken, wie Mamas Karte zeigt. Dann unterschreibe den Appell: Drücke die Zahl und spure sie im Schlamm nach.',fr:'Envoie autant de canetons que la carte de Maman en montre. Puis signe l’appel : appuie sur le nombre et repasse-le dans la boue.',es:'Manda tantos patitos como muestra la tarjeta de Mamá. Luego firma la lista: oprime el número y trázalo en el lodo.',pt:'Mande tantos patinhos quanto mostra o cartão da Mamãe. Depois assine a chamada: aperte o número e cubra o pontilhado no barro.',it:'Manda tanti anatroccoli quanti ne mostra la carta di Mamma. Poi firma l’appello: premi il numero e ripassalo nel fango.',nl:'Stuur zoveel eendjes als Mama’s kaart laat zien. Teken dan de lijst af: druk op het getal en trek het over in de modder.',sv:'Skicka lika många ankungar som Mammas kort visar. Skriv sedan under uppropet: tryck på talet och spåra det i leran.',da:'Send lige så mange ællinger, som Mors kort viser. Skriv så under på navneopråbet: tryk på tallet, og tegn det efter i mudderet.',no:'Send like mange andunger som Mammas kort viser. Skriv så under på oppropet: trykk på tallet, og spor det i gjørma.',fi:'Lähetä yhtä monta ankanpoikasta kuin Äidin kortissa näkyy. Allekirjoita sitten nimenhuuto: paina lukua ja piirrä sen päälle mudassa.'},
    promptDots:     {en:'Count Mama’s dots. Send that many ducklings, sign with the number, then press Check.',de:'Zähle Mamas Punkte. Schicke so viele Küken, unterschreibe mit der Zahl und drücke dann auf Prüfen.',fr:'Compte les points de Maman. Envoie autant de canetons, signe avec le nombre, puis appuie sur Vérifier.',es:'Cuenta los puntos de Mamá. Manda esa cantidad de patitos, firma con el número y luego oprime Comprobar.',pt:'Conte os pontos da Mamãe. Mande essa quantidade de patinhos, assine com o número e depois aperte Verificar.',it:'Conta i puntini di Mamma. Manda quel numero di anatroccoli, firma con il numero, poi premi Verifica.',nl:'Tel de stippen van Mama. Stuur zoveel eendjes, teken af met het getal en druk dan op Controleer.',sv:'Räkna Mammas prickar. Skicka så många ankungar, skriv under med talet och tryck sedan på Kontrollera.',da:'Tæl Mors prikker. Send så mange ællinger, skriv under med tallet, og tryk så på Tjek.',no:'Tell Mammas prikker. Send så mange andunger, skriv under med tallet, og trykk så på Sjekk.',fi:'Laske Äidin pisteet. Lähetä niin monta ankanpoikasta, allekirjoita luvulla ja paina sitten Tarkista.'},
    promptNumeral:  {en:'Read Mama’s number. Send that many ducklings, sign with the number, then press Check.',de:'Lies Mamas Zahl. Schicke so viele Küken, unterschreibe mit der Zahl und drücke dann auf Prüfen.',fr:'Lis le nombre de Maman. Envoie autant de canetons, signe avec le nombre, puis appuie sur Vérifier.',es:'Lee el número de Mamá. Manda esa cantidad de patitos, firma con el número y luego oprime Comprobar.',pt:'Leia o número da Mamãe. Mande essa quantidade de patinhos, assine com o número e depois aperte Verificar.',it:'Leggi il numero di Mamma. Manda quel numero di anatroccoli, firma con il numero, poi premi Verifica.',nl:'Lees het getal van Mama. Stuur zoveel eendjes, teken af met het getal en druk dan op Controleer.',sv:'Läs Mammas tal. Skicka så många ankungar, skriv under med talet och tryck sedan på Kontrollera.',da:'Læs Mors tal. Send så mange ællinger, skriv under med tallet, og tryk så på Tjek.',no:'Les Mammas tall. Send så mange andunger, skriv under med tallet, og trykk så på Sjekk.',fi:'Lue Äidin luku. Lähetä niin monta ankanpoikasta, allekirjoita luvulla ja paina sitten Tarkista.'},
    cardLabel:      {en:'Mama’s card',de:'Mamas Karte',fr:'La carte de Maman',es:'La tarjeta de Mamá',pt:'O cartão da Mamãe',it:'La carta di Mamma',nl:'Mama’s kaart',sv:'Mammas kort',da:'Mors kort',no:'Mammas kort',fi:'Äidin kortti'},
    raftLabel:      {en:'The raft — send a duckling to the bank',de:'Das Floß – schicke ein Küken ans Ufer',fr:'Le radeau — envoie un caneton sur la rive',es:'La balsa: manda un patito a la orilla',pt:'A balsa: mande um patinho para a margem',it:'La zattera: manda un anatroccolo sulla riva',nl:'Het vlot – stuur een eendje naar de kant',sv:'Flotten – skicka en ankunge till stranden',da:'Flåden – send en ælling ind til bredden',no:'Flåten – send en andunge til land',fi:'Lautta – lähetä ankanpoikanen rantaan'},
    bankLabel:      {en:'Mama’s bank',de:'Mamas Ufer',fr:'La rive de Maman',es:'La orilla de Mamá',pt:'A margem da Mamãe',it:'La riva di Mamma',nl:'Mama’s oever',sv:'Mammas strand',da:'Mors bred',no:'Mammas strand',fi:'Äidin ranta'},
    duckBack:       {en:'Send this duckling back to the raft',de:'Dieses Küken zurück aufs Floß schicken',fr:'Renvoyer ce caneton sur le radeau',es:'Regresar este patito a la balsa',pt:'Mandar este patinho de volta para a balsa',it:'Rimandare questo anatroccolo sulla zattera',nl:'Dit eendje terugsturen naar het vlot',sv:'Skicka tillbaka ankungen till flotten',da:'Send ællingen tilbage til flåden',no:'Send andungen tilbake til flåten',fi:'Lähetä ankanpoikanen takaisin lautalle'},
    stampsLabel:    {en:'Number stamps',de:'Zahlenstempel',fr:'Tampons des nombres',es:'Sellos de números',pt:'Carimbos de números',it:'Timbri dei numeri',nl:'Cijferstempels',sv:'Sifferstämplar',da:'Talstempler',no:'Tallstempler',fi:'Numeroleimasimet'},
    mudLabel:       {en:'The mud: trace the number with your finger',de:'Der Schlamm: Spure die Zahl mit dem Finger nach',fr:'La boue : repasse le nombre avec ton doigt',es:'El lodo: traza el número con el dedo',pt:'O barro: cubra o número com o dedo',it:'Il fango: ripassa il numero con il dito',nl:'De modder: trek het getal over met je vinger',sv:'Leran: spåra talet med fingret',da:'Mudderet: tegn tallet efter med fingeren',no:'Gjørma: spor tallet med fingeren',fi:'Muta: piirrä luvun päälle sormella'},
    rubOut:         {en:'Rub out',de:'Wegwischen',fr:'Effacer',es:'Borrar',pt:'Apagar',it:'Cancella',nl:'Uitvegen',sv:'Sudda',da:'Visk ud',no:'Visk ut',fi:'Pyyhi'},
    hintSend:       {en:'Tap the raft to send ducklings to Mama.',de:'Tippe aufs Floß, um Küken zu Mama zu schicken.',fr:'Touche le radeau pour envoyer des canetons à Maman.',es:'Toca la balsa para mandarle patitos a Mamá.',pt:'Toque na balsa para mandar patinhos para a Mamãe.',it:'Tocca la zattera per mandare anatroccoli a Mamma.',nl:'Tik op het vlot om eendjes naar Mama te sturen.',sv:'Tryck på flotten för att skicka ankungar till Mamma.',da:'Tryk på flåden for at sende ællinger til Mor.',no:'Trykk på flåten for å sende andunger til Mamma.',fi:'Napauta lauttaa, niin ankanpoikasia lähtee Äidin luo.'},
    hintMore:       {en:'Too many on the bank. Tap a duckling to send it back.',de:'Zu viele am Ufer. Tippe auf ein Küken, um es zurückzuschicken.',fr:'Trop de canetons sur la rive. Touche un caneton pour le renvoyer.',es:'Hay demasiados en la orilla. Toca un patito para regresarlo.',pt:'Tem patinhos demais na margem. Toque em um patinho para mandá-lo de volta.',it:'Troppi sulla riva. Tocca un anatroccolo per rimandarlo indietro.',nl:'Te veel aan de kant. Tik op een eendje om het terug te sturen.',sv:'För många på stranden. Tryck på en ankunge för att skicka tillbaka den.',da:'For mange ved bredden. Tryk på en ælling for at sende den tilbage.',no:'For mange på land. Trykk på en andunge for å sende den tilbake.',fi:'Rannalla on liikaa. Napauta ankanpoikasta, niin se palaa lautalle.'},
    hintFewer:      {en:'Too few on the bank. Tap the raft to send more.',de:'Zu wenige am Ufer. Tippe aufs Floß, um mehr zu schicken.',fr:'Pas assez sur la rive. Touche le radeau pour en envoyer d’autres.',es:'Faltan en la orilla. Toca la balsa para mandar más.',pt:'Faltam patinhos na margem. Toque na balsa para mandar mais.',it:'Troppo pochi sulla riva. Tocca la zattera per mandarne altri.',nl:'Te weinig aan de kant. Tik op het vlot om er meer te sturen.',sv:'För få på stranden. Tryck på flotten för att skicka fler.',da:'For få ved bredden. Tryk på flåden for at sende flere.',no:'For få på land. Trykk på flåten for å sende flere.',fi:'Rannalla on liian vähän. Napauta lauttaa, niin lisää lähtee.'},
    hintSign:       {en:'The ducklings are there. Now sign the roll: press the number that tells how many came.',de:'Die Küken sind da. Jetzt unterschreibe den Appell: Drücke die Zahl, die sagt, wie viele gekommen sind.',fr:'Les canetons sont là. Signe maintenant l’appel : appuie sur le nombre qui dit combien sont venus.',es:'Los patitos ya llegaron. Ahora firma la lista: oprime el número que dice cuántos llegaron.',pt:'Os patinhos chegaram. Agora assine a chamada: aperte o número que diz quantos vieram.',it:'Gli anatroccoli sono arrivati. Ora firma l’appello: premi il numero che dice quanti sono venuti.',nl:'De eendjes zijn er. Teken nu de lijst af: druk op het getal dat zegt hoeveel er gekomen zijn.',sv:'Ankungarna är där. Skriv nu under uppropet: tryck på talet som säger hur många som kom.',da:'Ællingerne er der. Skriv nu under på navneopråbet: tryk på det tal, der siger, hvor mange der kom.',no:'Andungene er der. Skriv nå under på oppropet: trykk på tallet som sier hvor mange som kom.',fi:'Ankanpoikaset ovat paikalla. Allekirjoita nyt nimenhuuto: paina lukua, joka kertoo, montako tuli.'},
    hintTrace:      {en:'Now trace the number in the mud, from the green dot.',de:'Spure jetzt die Zahl im Schlamm nach, vom grünen Punkt aus.',fr:'Repasse maintenant le nombre dans la boue, en partant du point vert.',es:'Ahora traza el número en el lodo, empezando en el punto verde.',pt:'Agora cubra o número no barro, começando no ponto verde.',it:'Ora ripassa il numero nel fango, partendo dal puntino verde.',nl:'Trek nu het getal over in de modder, vanaf de groene stip.',sv:'Spåra nu talet i leran, från den gröna pricken.',da:'Tegn nu tallet efter i mudderet, fra den grønne prik.',no:'Spor nå tallet i gjørma, fra den grønne prikken.',fi:'Piirrä nyt luvun päälle mudassa vihreästä pisteestä alkaen.'},
    hintDigit:      {en:'That number is not how many came. Count the ducklings on the bank, then press the number for how many there are.',de:'Diese Zahl sagt nicht, wie viele gekommen sind. Zähle die Küken am Ufer und drücke dann die Zahl, die sagt, wie viele es sind.',fr:'Ce nombre ne dit pas combien sont venus. Compte les canetons sur la rive, puis appuie sur le nombre qui dit combien il y en a.',es:'Ese número no dice cuántos llegaron. Cuenta los patitos de la orilla y oprime el número que dice cuántos hay.',pt:'Esse número não diz quantos vieram. Conte os patinhos na margem e aperte o número que diz quantos são.',it:'Quel numero non dice quanti sono venuti. Conta gli anatroccoli sulla riva, poi premi il numero che dice quanti sono.',nl:'Dat getal zegt niet hoeveel er gekomen zijn. Tel de eendjes aan de kant en druk dan op het getal dat zegt hoeveel het er zijn.',sv:'Det talet säger inte hur många som kom. Räkna ankungarna på stranden och tryck sedan på talet som säger hur många det är.',da:'Det tal siger ikke, hvor mange der kom. Tæl ællingerne ved bredden, og tryk så på det tal, der siger, hvor mange der er.',no:'Det tallet sier ikke hvor mange som kom. Tell andungene på land, og trykk så på tallet som sier hvor mange det er.',fi:'Tuo luku ei kerro, montako tuli. Laske rannan ankanpoikaset ja paina sitten lukua, joka kertoo, montako niitä on.'},
    celebrate:      {en:'Roll call done — {n}!',de:'Appell geschafft – {n}!',fr:'L’appel est fait — {n} !',es:'¡Lista completa: {n}!',pt:'Chamada feita: {n}!',it:'Appello fatto: {n}!',nl:'Appèl klaar – {n}!',sv:'Uppropet är klart – {n}!',da:'Navneopråbet er klaret – {n}!',no:'Oppropet er klart – {n}!',fi:'Nimenhuuto valmis – {n}!'},
    setRange:       {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:       {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo9:       {en:'Up to 9',de:'Bis 9',fr:'Jusqu’à 9',it:'Fino a 9',es:'Hasta 9',pt:'Até 9',nl:'Tot en met 9',sv:'Upp till 9',da:'Op til 9',no:'Opptil 9',fi:'9:ään asti'},
    setCall:        {en:'Mama’s card shows',de:'Mamas Karte zeigt',fr:'La carte de Maman montre',es:'La tarjeta de Mamá muestra',pt:'O cartão da Mamãe mostra',it:'La carta di Mamma mostra',nl:'Mama’s kaart laat zien',sv:'Mammas kort visar',da:'Mors kort viser',no:'Mammas kort viser',fi:'Äidin kortissa on'},
    callDots:       {en:'Dots',de:'Punkte',fr:'Des points',es:'Puntos',pt:'Pontos',it:'Puntini',nl:'Stippen',sv:'Prickar',da:'Prikker',no:'Prikker',fi:'Pisteitä'},
    callNumeral:    {en:'The number',de:'Die Zahl',fr:'Le nombre',es:'El número',pt:'O número',it:'Il numero',nl:'Het getal',sv:'Talet',da:'Tallet',no:'Tallet',fi:'Luku'}
  },

  defaults: { range: 'to9', call: 'dots' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to9', labelKey: 'rangeTo9' }] },
    { key: 'call', type: 'choice', labelKey: 'setCall', options: [{ value: 'dots', labelKey: 'callDots' }, { value: 'numeral', labelKey: 'callNumeral' }] }
  ],

  SWIM_MS: 360,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._theme = null; this._drag = false;
    injectRollBookCSS();
    if (typeof LCSPictures !== 'undefined') {
      LCSPictures.load(RollBookCore.THEME).then(function (theme) { self._theme = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the ducklings stay away */ });
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return RollBookCore.POOLS[r] ? r : 'to9'; },
  _call: function () { var c = this.api && this.api.settings && this.api.settings.call; return c === 'numeral' ? 'numeral' : 'dots'; },
  _ensurePool: function () { var key = this._range(); if (!this._pool || this._poolKey !== key) { this._pool = RollBookCore.rounds(key, 'rb'); this._poolKey = key; this._order = null; } return this._pool; },
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
      id: 'roll-book.' + r.id,
      promptKey: this._call() === 'numeral' ? 'promptNumeral' : 'promptDots',
      promptArgs: { n: r.n },
      celebrateKey: 'celebrate',
      answerType: 'state',
      setup: function (tool) { tool.st = RollBookCore.newState(r, tool.api.lang); tool._drag = false; },
      check: function (tool) { var res = RollBookCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return RollBookCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this, C = RollBookCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to9', 'rb')[1], api.lang);
    var wrap = api.el('div', 'rb-wrap'); this._wrap = wrap;

    /* the pond: Mama's card, the raft, the landing spots */
    var pond = api.el('div', 'rb-pond'); pond.setAttribute('role', 'group'); pond.setAttribute('aria-label', t('bankLabel'));
    var card = api.el('div', 'rb-card'); card.setAttribute('role', 'img'); card.setAttribute('aria-label', t('cardLabel'));
    this._card = card; pond.appendChild(card);
    var raft = api.el('button', 'rb-raft'); raft.type = 'button'; raft.setAttribute('aria-label', t('raftLabel'));
    raft.addEventListener('click', function () { self._send(); });
    this._raft = raft; pond.appendChild(raft);
    this._pond = pond; this._ducks = [];
    for (var k = 0; k < 13; k++) {
      (function (spot) {
        var b = api.el('button', 'rb-duck'); b.type = 'button'; b.hidden = true; b.setAttribute('aria-label', t('duckBack'));
        b.addEventListener('click', function () { self._recall(spot); });
        var nb = api.el('span', 'rb-num'); nb.setAttribute('aria-hidden', 'true'); b.appendChild(nb);
        pond.appendChild(b); self._ducks.push(b);
      }(k));
    }
    wrap.appendChild(pond);

    /* the roll book: the mud slate and the number stamps */
    var book = api.el('div', 'rb-book');
    var mud = api.el('div', 'rb-mud'); mud.setAttribute('role', 'img'); mud.setAttribute('aria-label', t('mudLabel'));
    var NS = 'http://www.w3.org/2000/svg';
    var sv = document.createElementNS(NS, 'svg'); sv.setAttribute('viewBox', '0 0 100 100'); sv.setAttribute('class', 'rb-mud-svg');
    mud.appendChild(sv); this._mudSvg = sv; this._wirePointer(sv);
    var rub = api.el('button', 'rb-rub'); rub.type = 'button'; rub.textContent = t('rubOut');
    rub.addEventListener('click', function () { if (RollBookCore.rubOut(self.st)) { self.api.sound(340); self._paint(); } });
    this._rub = rub; mud.appendChild(rub);
    book.appendChild(mud);
    var stamps = api.el('div', 'rb-stamps'); stamps.setAttribute('role', 'group'); stamps.setAttribute('aria-label', t('stampsLabel'));
    this._stamps = [];
    for (var d = 1; d <= 9; d++) {
      (function (dig) { var b = api.el('button', 'rb-stamp'); b.type = 'button'; b.textContent = String(dig); b.addEventListener('click', function () { self._stamp(dig); }); stamps.appendChild(b); self._stamps.push(b); }(d));
    }
    book.appendChild(stamps);
    this._book = book; wrap.appendChild(book);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var st = this.st, L = this._L = RollBookCore.layout(this._width(), st ? st.max : 9);
    var w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide');
    w.classList.toggle('is-stack', L.mode !== 'wide');
    w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.style.setProperty('--rb-cell', L.cell + 'px');
    w.style.setProperty('--rb-pic', L.pic + 'px');
    w.style.setProperty('--rb-pad', L.pad + 'px');
    w.style.setProperty('--rb-cols', String(L.cols));
    w.style.setProperty('--rb-rows', String(L.rows));
    w.style.setProperty('--rb-mud', L.mud + 'px');
    w.style.setProperty('--rb-stamp', L.stamp + 'px');
    w.style.setProperty('--rb-stamp-cols', String(L.stampCols));
    this._cells = RollBookCore.spotCells(st, L);
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
    var img = holder.querySelector('img');
    if (!this._theme || !this._theme.nouns[RollBookCore.NOUN]) return null;
    if (!img) { img = LCSPictures.img(this._theme, RollBookCore.NOUN, this.api.lang, { plural: false }); img.className = 'rb-pic'; img.alt = ''; img.setAttribute('aria-hidden', 'true'); holder.insertBefore(img, holder.firstChild); }
    return img;
  },

  _paint: function () {
    var st = this.st, C = RollBookCore, L = this._L;
    if (this._cellsFor !== st.id + ':' + L.mode) { this._cells = C.spotCells(st, L); this._cellsFor = st.id + ':' + L.mode; }
    this._wrap.classList.toggle('is-done', st.done);
    /* Mama's card */
    var card = this._card, numeral = this._call() === 'numeral';
    card.innerHTML = '';
    if (numeral) { var nm = document.createElement('span'); nm.className = 'rb-card-num'; nm.textContent = String(st.n); card.appendChild(nm); }
    else {
      var NS = 'http://www.w3.org/2000/svg', sv = document.createElementNS(NS, 'svg'); sv.setAttribute('viewBox', '0 0 50 20'); sv.setAttribute('class', 'rb-card-svg');
      var dots = C.dots(st.card, st.n) || [], dn = C.dotNums(st);
      for (var i = 0; i < dots.length; i++) {
        var c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', dots[i][0] * 10); c.setAttribute('cy', dots[i][1] * 10); c.setAttribute('r', 3.6); c.setAttribute('class', 'rb-dot'); sv.appendChild(c);
        if (dn[i]) { var tx = document.createElementNS(NS, 'text'); tx.setAttribute('x', dots[i][0] * 10); tx.setAttribute('y', dots[i][1] * 10 + 1.6); tx.setAttribute('class', 'rb-dot-num'); tx.textContent = dn[i]; sv.appendChild(tx); }
      }
      card.appendChild(sv);
    }
    /* the raft */
    var left = C.aboard(st);
    this._raft.classList.toggle('is-empty', left === 0);
    this._raft.disabled = st.done || left === 0;
    var rimg = this._pic(this._raft);
    if (rimg) rimg.style.visibility = left > 0 ? 'visible' : 'hidden';
    /* the bank */
    var nums = C.bankNums(st), at = {};
    for (var b = 0; b < st.bank.length; b++) at[st.bank[b]] = b;
    for (var k = 0; k < this._ducks.length; k++) {
      var d = this._ducks[k], here = (k in at) && k < this._cells.length;
      d.hidden = !here;
      if (k < this._cells.length) { var cell = this._cells[k]; d.style.left = (L.pad + cell[0] * L.cell + (L.cell - L.pic) / 2) + 'px'; d.style.top = (L.pad + cell[1] * L.cell + (L.cell - L.pic) / 2) + 'px'; }
      if (here) this._pic(d);
      d.disabled = st.done;
      var nb = d.querySelector('.rb-num'), v = here ? nums[at[k]] : '';
      nb.textContent = v; nb.classList.toggle('is-on', !!v); nb.classList.toggle('is-gold', st.done && here && at[k] === st.bank.length - 1);
    }
    /* the stamps and the mud */
    for (var s = 0; s < this._stamps.length; s++) {
      var sb = this._stamps[s], val = s + 1;
      sb.hidden = val > st.max;
      sb.classList.toggle('is-on', st.digit === val);
      sb.classList.toggle('is-wrong', !!(st.digit === val && st.checked && st.checked.slip === 'digit'));
      sb.setAttribute('aria-pressed', String(st.digit === val));
      sb.disabled = st.done;
    }
    this._rub.hidden = st.digit === null || st.done;
    this._paintMud();
  },
  _paintMud: function () {
    var st = this.st, sv = this._mudSvg, ST = RollBookCore._ST();
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    sv.appendChild(svgEl('line', { x1: 6, y1: 84, x2: 94, y2: 84, class: 'rb-base' }));
    var g = RollBookCore.glyph(st);
    if (!g) return;
    var tr = st.trace;
    for (var i = 0; i < g.length; i++) {
      var pts = ST.flatten(g[i], 1.2);
      sv.appendChild(svgEl('path', { d: pathOf(pts), class: 'rb-guide' }));
    }
    for (var j = 0; j < tr.lanes.length; j++) {
      var L = tr.lanes[j], upto = j < tr.idx ? L.pts.length : (j === tr.idx ? tr.i + 1 : 0);
      if (upto > 1) sv.appendChild(svgEl('path', { d: pathOf(L.pts.slice(0, upto)), class: 'rb-ink' }));
    }
    if (!tr.formed && !st.done) { var sp = ST.startPoint(tr); if (sp) sv.appendChild(svgEl('circle', { cx: sp.x, cy: sp.y, r: 3.6, class: 'rb-start' })); }
    this._mudSvg.parentNode.classList.toggle('is-signed', !!tr.formed);
  },

  /* ---------------- the hand ---------------- */
  /* a duckling glides from where it was to where it lands */
  _fly: function (fromRect, el) {
    var img = el && el.querySelector('img');
    if (!img || !fromRect || !img.animate) return;
    var to = img.getBoundingClientRect(); if (!to.width) return;
    var dx = fromRect.left + fromRect.width / 2 - (to.left + to.width / 2), dy = fromRect.top + fromRect.height / 2 - (to.top + to.height / 2);
    img.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + (fromRect.width / to.width) + ')' }, { transform: 'none' }], { duration: this.SWIM_MS, easing: 'cubic-bezier(.3,.7,.2,1)' });
  },
  _send: function () {
    var st = this.st, ri = this._raft.querySelector('img'), from = ri ? ri.getBoundingClientRect() : null;
    var spot = RollBookCore.send(st);
    if (spot < 0) return;
    this.api.sound(470 + 20 * st.bank.length);
    this._paint();
    this._fly(from, this._ducks[spot]);
    this.api.track('send', { n: st.n, bank: st.bank.length });
  },
  _recall: function (spot) {
    var st = this.st, k = st.bank.indexOf(spot);
    if (k < 0) return;
    var im = this._ducks[spot].querySelector('img'), from = im ? im.getBoundingClientRect() : null;
    if (RollBookCore.recall(st, k) < 0) return;
    this.api.sound(330);
    this._paint();
    this._fly(from, this._raft);
    this.api.track('recall', { n: st.n, bank: st.bank.length });
  },
  _stamp: function (d) {
    var st = this.st;
    if (!RollBookCore.stamp(st, d)) return;
    this.api.sound(300 + 40 * d);
    this._paint();
    bounce(this._mudSvg.parentNode, 'rb-thud');
    this.api.track('stamp', { n: st.n, digit: d });
  },
  _wirePointer: function (sv) {
    var self = this;
    var toVB = function (ev) { var r = sv.getBoundingClientRect(); return { x: ((ev.clientX - r.left) / r.width) * 100, y: ((ev.clientY - r.top) / r.height) * 100 }; };
    sv.addEventListener('pointerdown', function (ev) {
      if (!self.st || self.st.done || !self.st.trace) return;
      ev.preventDefault(); self._drag = true;
      try { sv.setPointerCapture(ev.pointerId); } catch (e) {}
      self._sample(toVB(ev));
    });
    sv.addEventListener('pointermove', function (ev) {
      if (!self._drag) return;
      var pts = ev.getCoalescedEvents ? ev.getCoalescedEvents() : [ev]; if (!pts.length) pts = [ev];
      for (var i = 0; i < pts.length; i++) self._sample(toVB(pts[i]));
    });
    var end = function (ev) { if (!self._drag) return; self._drag = false; try { sv.releasePointerCapture(ev.pointerId); } catch (e) {} self._endStroke(); };
    sv.addEventListener('pointerup', end);
    sv.addEventListener('pointercancel', end);
  },
  _sample: function (pt) { var r = RollBookCore.sample(this.st, pt); if (r) this._paintMud(); if (r && r.done) { this._drag = false; this._endStroke(); } },
  _endStroke: function () {
    var r = RollBookCore.endStroke(this.st);
    if (r === 'formed') { this.api.sound(660); this._paint(); this.api.track('signed', { n: this.st.n, digit: this.st.digit }); }
    else if (r === 'stroke-ok') { this.api.sound(560); this._paintMud(); }
    else this._paintMud();
  },
  _afterCheck: function (res) {
    var st = this.st;
    this._paint();
    if (res.slip === 'none' || res.slip === 'unsigned' || res.slip === 'trace') return;
    if (res.ok) { this.api.sound(660); this._speakNumber(st.n); for (var i = 0; i < this._ducks.length; i++) { var nb = this._ducks[i].querySelector('.rb-num'); if (nb.classList.contains('is-on')) bounce(nb, 'rb-pop'); } }
    else this.api.sound(280);
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, a: res.a, misses: st.misses });
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 1 }); } catch (e) { /* silent */ }
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }
function svgEl(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
function pathOf(pts) { var d = ''; for (var i = 0; i < pts.length; i++) d += (i ? ' L ' : 'M ') + pts[i].x.toFixed(1) + ' ' + pts[i].y.toFixed(1); return d; }

var rbCssDone = false;
function injectRollBookCSS() {
  if (rbCssDone || typeof document === 'undefined') return;
  rbCssDone = true;
  var css = ''
  + '.rb-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:center;gap:12px;--rb-cell:100px;--rb-pic:88px;--rb-pad:8px;--rb-cols:5;--rb-rows:3;--rb-mud:160px;--rb-stamp:52px;--rb-stamp-cols:5;}'
  /* the pond: grass bank, water corner where the raft floats */
  + '.rb-pond{position:relative;width:calc(var(--rb-cols) * var(--rb-cell) + 2 * var(--rb-pad));height:calc(var(--rb-rows) * var(--rb-cell) + 2 * var(--rb-pad));box-sizing:border-box;border-radius:20px;background:radial-gradient(circle at calc(100% - var(--rb-cell) / 2 - var(--rb-pad)) calc(var(--rb-cell) / 2 + var(--rb-pad)),#9BD3E8 0 calc(var(--rb-cell) * .7),#7EC4DE calc(var(--rb-cell) * .7) calc(var(--rb-cell) * .78),transparent calc(var(--rb-cell) * .8)),linear-gradient(180deg,#CFE8B4,#B6DA95);box-shadow:inset 0 0 0 3px #8DBF6A,0 6px 14px rgba(40,70,25,.16);}'
  + '.rb-card{position:absolute;left:var(--rb-pad);top:var(--rb-pad);width:calc(2 * var(--rb-cell) - 8px);height:calc(var(--rb-cell) - 8px);margin:4px;box-sizing:border-box;border-radius:12px;background:#FFFDF6;border:3px solid #C9A24A;box-shadow:0 4px 8px rgba(60,35,10,.16);display:grid;place-items:center;padding:6px;}'
  + '.rb-card-svg{width:100%;height:100%;display:block;} .rb-dot{fill:#E0603A;stroke:#9C3A1C;stroke-width:.8;} .rb-dot-num{font-family:var(--lcs-font-display);font-weight:800;font-size:4px;fill:#fff;text-anchor:middle;}'
  + '.rb-card-num{font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--rb-cell) * .62);line-height:1;color:#7A4E0E;}'
  + '.rb-raft{position:absolute;right:var(--rb-pad);top:var(--rb-pad);width:var(--rb-cell);height:var(--rb-cell);padding:0;border:0;background:transparent;cursor:pointer;touch-action:manipulation;display:grid;place-items:center;-webkit-tap-highlight-color:transparent;}'
  + '.rb-raft::before{content:"";position:absolute;left:10%;right:10%;bottom:14%;height:26%;border-radius:8px;background:repeating-linear-gradient(90deg,#C9965A 0 14%,#A8743C 14% 16%);box-shadow:0 3px 0 #7C5226;}'
  + '.rb-raft .rb-pic{position:relative;width:var(--rb-pic);height:var(--rb-pic);margin-bottom:8%;}'   /* full size: the picture floor holds on the raft too */
  + '.rb-raft:hover:not(:disabled)::before{filter:brightness(1.08);} .rb-raft:disabled{cursor:default;} .rb-raft:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:-4px;border-radius:12px;}'
  + '.rb-duck{position:absolute;width:var(--rb-pic);height:var(--rb-pic);padding:0;border:0;background:transparent;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;} .rb-duck[hidden]{display:none;}'
  + '.rb-duck:disabled{cursor:default;} .rb-duck:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;border-radius:12px;}'
  + '.rb-pic{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(40,25,10,.2));}'
  + '.rb-num{position:absolute;right:-2px;top:-2px;min-width:28px;height:28px;padding:0 5px;box-sizing:border-box;border-radius:14px;background:var(--lcs-structure);color:#fff;border:2px solid #fff;font-family:var(--lcs-font-display);font-weight:800;font-size:16px;line-height:24px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.28);pointer-events:none;z-index:2;}'
  + '.rb-num:not(.is-on){display:none;} .rb-num.is-gold{background:#F6D98A;color:#5B4312;border-color:#C9A24A;min-width:36px;height:36px;line-height:32px;font-size:21px;border-radius:18px;}'
  + '.rb-num.rb-pop{animation:rb-pop .3s var(--lcs-ease) 1;} @keyframes rb-pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}'
  /* the roll book */
  + '.rb-book{display:flex;align-items:center;justify-content:center;gap:16px;width:100%;}'
  + '.rb-mud{position:relative;width:var(--rb-mud);height:var(--rb-mud);flex:0 0 auto;border-radius:16px;background:radial-gradient(circle at 40% 35%,#A88565,#8B6A4C 70%,#6E5139);box-shadow:inset 0 4px 10px rgba(30,15,5,.45),0 4px 10px rgba(60,35,10,.18);}'
  + '.rb-mud.is-signed{box-shadow:inset 0 4px 10px rgba(30,15,5,.45),0 0 0 4px #F6D98A;}'
  + '.rb-mud-svg{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;}'
  + '.rb-base{stroke:rgba(255,240,220,.35);stroke-width:1.2;} .rb-guide{fill:none;stroke:rgba(255,240,220,.6);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:.1 6;}'
  + '.rb-ink{fill:none;stroke:#FFF4DA;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;} .rb-start{fill:#3DBE6E;stroke:#fff;stroke-width:1.2;}'
  + '.rb-rub{position:absolute;right:-6px;bottom:-6px;min-height:44px;padding:0 12px;border-radius:22px;border:2px solid var(--lcs-structure-soft);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-body);font-weight:800;font-size:14px;cursor:pointer;touch-action:manipulation;} .rb-rub[hidden]{display:none;}'
  + '.rb-mud.rb-thud{animation:rb-thud .3s ease 1;} @keyframes rb-thud{0%,100%{transform:none;}40%{transform:scale(.96);}}'
  + '.rb-stamps{display:grid;grid-template-columns:repeat(var(--rb-stamp-cols),var(--rb-stamp));gap:6px;}'
  + '.rb-stamp{width:var(--rb-stamp);height:var(--rb-stamp);border-radius:12px;border:2px solid #8B6A4C;background:#F3E6D3;font-family:var(--lcs-font-display);font-weight:800;font-size:22px;color:#5B3A1A;cursor:pointer;touch-action:manipulation;padding:0;box-shadow:0 3px 0 #C9A983;} .rb-stamp[hidden]{display:none;}'
  + '.rb-stamp:hover:not(:disabled){background:#EAD7BC;} .rb-stamp:disabled{cursor:default;} .rb-stamp:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.rb-stamp.is-on{background:#5B3A1A;color:#FFF4DA;border-color:#5B3A1A;}'
  + '.rb-stamp.is-wrong{background:#FFF0EA;color:#B3512A;border-color:var(--lcs-accent);box-shadow:0 3px 0 #F6C3AE;}'
  + '.rb-wrap.is-stack .rb-book{gap:10px;}'
  + '@media (prefers-reduced-motion:reduce){.rb-num,.rb-mud{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'rb-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = RollBookActivity;
if (typeof window !== 'undefined') window.RollBookActivity = RollBookActivity;
