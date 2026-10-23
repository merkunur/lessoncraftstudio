/* =====================================================================
   turning-domino-activity.js — ACTIVITY #84 of the one-by-one rebuild:
   "Find the Missing Part" → THE TURNING DOMINO (1.OA.B.4, 11 locales).
   Design sheet: docs/activities-rebuild/designs/084-numberbond.md
   ---------------------------------------------------------------------
   THE INVENTION: one domino is a whole fact family. Its brass plate is
   the whole, its two halves are the parts. The round opens the domino in
   the stance of one equation — a face-down half is the missing part (or a
   felt lid hides the plate when the whole is unknown). The child dials the
   unknown; Check marches every pip into the plate's sockets: too few →
   empty places glow, too many → pips hang off the end. Then the child
   TURNS the domino (the addition swaps) and BREAKS a half off (the
   subtraction is what is left) until the fact house holds all four facts.
   ACTIVITY LAYER ONLY: the model is turning-domino-core.js; no pictures
   (the domino is apparatus); lcs-shell.js untouched (the shell's Check is
   hidden and pressed by this activity when the round is complete). Test
   seams: window.TurningDominoActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var TurningDominoActivity = {
  id: 'turning-domino',
  apparatusClasses: ['td-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'The Turning Domino',de:'Der drehende Dominostein',nl:'De draaiende dominosteen',da:'Den drejende dominobrik',sv:'Den snurrande dominobrickan',no:'Den snurrende dominobrikken',es:'El dominó que gira',it:'La tessera del domino che gira',pt:'O dominó que gira',fr:'Le domino qui tourne',fi:'Kääntyvä dominopala'},
    tLine:       {en:'Find the ? and press Check. Then make all four facts.',de:'Finde das ? und drück auf Prüfen. Dann bilde alle vier Aufgaben.',nl:'Zoek het ? en druk op Controleer. Maak dan alle vier de sommen.',da:'Find ? og tryk på Tjek. Lav så alle fire regnestykker.',sv:'Hitta ? och tryck på Kontrollera. Gör sedan alla fyra uträkningarna.',no:'Finn ? og trykk på Sjekk. Lag så alle fire regnestykkene.',es:'Encuentra el ? y toca Comprobar. Luego forma las cuatro operaciones.',it:'Trova il ? e tocca Verifica. Poi forma tutte e quattro le operazioni.',pt:'Encontre o ? e toque em Verificar. Depois forme as quatro contas.',fr:'Trouve le ? et appuie sur Vérifier. Puis forme les quatre calculs.',fi:'Etsi ? ja paina Tarkista. Tee sitten kaikki neljä laskua.'},
    tLineOff:    {en:'Find the ? and press Check.',de:'Finde das ? und drück auf Prüfen.',nl:'Zoek het ? en druk op Controleer.',da:'Find ? og tryk på Tjek.',sv:'Hitta ? och tryck på Kontrollera.',no:'Finn ? og trykk på Sjekk.',es:'Encuentra el ? y toca Comprobar.',it:'Trova il ? e tocca Verifica.',pt:'Encontre o ? e toque em Verificar.',fr:'Trouve le ? et appuie sur Vérifier.',fi:'Etsi ? ja paina Tarkista.'},
    hDial:       {en:'How many dots are hiding? Set the number with + and −.',de:'Wie viele Punkte sind versteckt? Stell die Zahl mit + und − ein.',nl:'Hoeveel stippen zijn er verstopt? Stel het getal in met + en −.',da:'Hvor mange prikker gemmer sig? Indstil tallet med + og −.',sv:'Hur många prickar gömmer sig? Ställ in talet med + och −.',no:'Hvor mange prikker gjemmer seg? Still inn tallet med + og −.',es:'¿Cuántos puntos se esconden? Elige el número con + y −.',it:'Quanti puntini sono nascosti? Scegli il numero con + e −.',pt:'Quantos pontos estão escondidos? Escolha o número com + e −.',fr:'Combien de points sont cachés ? Règle le nombre avec + et −.',fi:'Montako pistettä on piilossa? Valitse luku napeilla + ja −.'},
    hDialLid:    {en:'How many places does the plate need? Set the number with + and −.',de:'Wie viele Plätze braucht das Schild? Stell die Zahl mit + und − ein.',nl:'Hoeveel plekken heeft het bordje nodig? Stel het getal in met + en −.',da:'Hvor mange pladser skal skiltet have? Indstil tallet med + og −.',sv:'Hur många platser behöver skylten? Ställ in talet med + och −.',no:'Hvor mange plasser trenger skiltet? Still inn tallet med + og −.',es:'¿Cuántos lugares necesita la placa? Elige el número con + y −.',it:'Quanti posti servono sulla targhetta? Scegli il numero con + e −.',pt:'Quantos lugares a placa precisa ter? Escolha o número com + e −.',fr:'Combien de places faut-il sur la plaque ? Règle le nombre avec + et −.',fi:'Montako paikkaa kyltti tarvitsee? Valitse luku napeilla + ja −.'},
    hLid:        {en:'Your plate has room for {d}. Does every dot have a place, and every place a dot?',de:'Dein Schild hat Platz für {d}. Hat jeder Punkt einen Platz und jeder Platz einen Punkt?',nl:'Jouw bordje heeft plek voor {d}. Heeft elke stip een plek, en elke plek een stip?',da:'Dit skilt har plads til {d}. Har hver prik en plads, og hver plads en prik?',sv:'Din skylt har plats för {d}. Har varje prick en plats och varje plats en prick?',no:'Skiltet ditt har plass til {d}. Har hver prikk en plass, og hver plass en prikk?',es:'Tu placa tiene lugar para {d}. ¿Cada punto tiene su lugar y cada lugar su punto?',it:'La tua targhetta ha posto per {d}. Ogni puntino ha il suo posto e ogni posto il suo puntino?',pt:'A sua placa tem lugar para {d}. Cada ponto tem um lugar e cada lugar tem um ponto?',fr:'Ta plaque a de la place pour {d}. Est-ce que chaque point a sa place, et chaque place son point ?',fi:'Kyltissäsi on tilaa {d} pisteelle. Onko jokaisella pisteellä paikka ja jokaisessa paikassa piste?'},
    hCountLid:   {en:'Count all the dots on both halves.',de:'Zähl alle Punkte auf beiden Hälften.',nl:'Tel alle stippen op beide helften.',da:'Tæl alle prikkerne på begge halvdele.',sv:'Räkna alla prickar på båda halvorna.',no:'Tell alle prikkene på begge halvdelene.',es:'Cuenta todos los puntos de las dos mitades.',it:'Conta tutti i puntini delle due metà.',pt:'Conte todos os pontos das duas metades.',fr:'Compte tous les points des deux moitiés.',fi:'Laske molempien puolikkaiden kaikki pisteet.'},
    hGap:        {en:'The plate has room for {whole}. Look at the gap.',de:'Das Schild hat Platz für {whole}. Schau auf die Lücke.',nl:'Het bordje heeft plek voor {whole}. Kijk naar het gat.',da:'Skiltet har plads til {whole}. Se på hullet.',sv:'Skylten har plats för {whole}. Titta på luckan.',no:'Skiltet har plass til {whole}. Se på hullet.',es:'La placa tiene lugar para {whole}. Mira el hueco.',it:'La targhetta ha posto per {whole}. Guarda lo spazio vuoto.',pt:'A placa tem lugar para {whole}. Olhe o espaço vazio.',fr:'La plaque a de la place pour {whole}. Regarde le trou.',fi:'Kyltissä on tilaa {whole} pisteelle. Katso tyhjää kohtaa.'},
    hOver:       {en:'The plate has room for {whole}. Some dots don’t fit!',de:'Das Schild hat Platz für {whole}. Einige Punkte passen nicht drauf!',nl:'Het bordje heeft plek voor {whole}. Sommige stippen passen er niet op!',da:'Skiltet har plads til {whole}. Der er ikke plads til alle prikkerne!',sv:'Skylten har plats för {whole}. Några prickar får inte plats!',no:'Skiltet har plass til {whole}. Noen prikker får ikke plass!',es:'La placa tiene lugar para {whole}. ¡Algunos puntos no caben!',it:'La targhetta ha posto per {whole}. Alcuni puntini non ci stanno!',pt:'A placa tem lugar para {whole}. Alguns pontos não cabem!',fr:'La plaque a de la place pour {whole}. Certains points ne tiennent pas !',fi:'Kyltissä on tilaa {whole} pisteelle. Kaikki pisteet eivät mahdu!'},
    hCount:      {en:'Count the empty places on the plate.',de:'Zähl die leeren Plätze auf dem Schild.',nl:'Tel de lege plekken op het bordje.',da:'Tæl de tomme pladser på skiltet.',sv:'Räkna de tomma platserna på skylten.',no:'Tell de tomme plassene på skiltet.',es:'Cuenta los lugares vacíos de la placa.',it:'Conta i posti vuoti sulla targhetta.',pt:'Conte os lugares vazios da placa.',fr:'Compte les places vides sur la plaque.',fi:'Laske kyltin tyhjät paikat.'},
    okPart:      {en:'{a} and {b} make {whole}!',de:'{a} und {b} sind zusammen {whole}!',nl:'{a} en {b} is samen {whole}!',da:'{a} og {b} er tilsammen {whole}!',sv:'{a} och {b} är tillsammans {whole}!',no:'{a} og {b} er til sammen {whole}!',es:'¡{a} y {b} son {whole}!',it:'{a} e {b} fanno {whole}!',pt:'{a} e {b} formam {whole}!',fr:'{a} et {b} font {whole} !',fi:'{a} ja {b} on yhteensä {whole}!'},
    hStage2:     {en:'Now turn the domino, or tap a half to break it off.',de:'Dreh jetzt den Dominostein oder tipp auf eine Hälfte, um sie abzubrechen.',nl:'Draai nu de dominosteen, of tik op een helft om hem eraf te breken.',da:'Drej nu dominobrikken, eller tryk på en halvdel for at brække den af.',sv:'Snurra nu dominobrickan, eller tryck på en halva för att bryta loss den.',no:'Drei nå dominobrikken, eller trykk på en halvdel for å brekke den av.',es:'Ahora gira el dominó o toca una mitad para separarla.',it:'Ora gira la tessera o tocca una metà per staccarla.',pt:'Agora gire o dominó ou toque numa metade para separá-la.',fr:'Maintenant, tourne le domino ou touche une moitié pour la détacher.',fi:'Pyöräytä nyt dominopalaa tai napauta puolikasta, niin se irtoaa.'},
    hBack:       {en:'Tap the half in the tray to put it back.',de:'Tipp auf die Hälfte in der Schale, um sie wieder anzusetzen.',nl:'Tik op de helft in het bakje om hem terug te zetten.',da:'Tryk på halvdelen i bakken for at sætte den på igen.',sv:'Tryck på halvan i facket för att sätta tillbaka den.',no:'Trykk på halvdelen i brettet for å sette den på igjen.',es:'Toca la mitad de la bandeja para volver a ponerla.',it:'Tocca la metà nel vassoio per rimetterla a posto.',pt:'Toque na metade da bandeja para colocá-la de volta.',fr:'Touche la moitié dans le plateau pour la remettre.',fi:'Napauta tarjottimella olevaa puolikasta, niin se palaa paikalleen.'},
    okFour:      {en:'One domino, four facts: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',de:'Ein Dominostein, vier Aufgaben: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',nl:'Eén dominosteen, vier sommen: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',da:'Én dominobrik, fire regnestykker: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',sv:'En dominobricka, fyra uträkningar: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',no:'Én dominobrikke, fire regnestykker: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',es:'Un dominó, cuatro operaciones: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',it:'Una tessera, quattro operazioni: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',pt:'Um dominó, quatro contas: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',fr:'Un domino, quatre calculs : {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.',fi:'Yksi dominopala, neljä laskua: {a} + {b} = {w}, {b} + {a} = {w}, {w} − {a} = {b}, {w} − {b} = {a}.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Verifica',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    w10:         {en:'Within 10',de:'bis 10',nl:'tot 10',da:'op til 10',sv:'upp till 10',no:'opp til 10',es:'hasta 10',it:'fino a 10',pt:'até 10',fr:'jusqu’à 10',fi:'10:een asti'},
    w20:         {en:'Within 20',de:'bis 20',nl:'tot 20',da:'op til 20',sv:'upp till 20',no:'opp til 20',es:'hasta 20',it:'fino a 20',pt:'até 20',fr:'jusqu’à 20',fi:'20:een asti'},
    setHouse:    {en:'Fact house',de:'Rechenhaus',nl:'Rekenhuisje',da:'Talfamilie',sv:'Talfamilj',no:'Tallfamilie',es:'Familia de operaciones',it:'Famiglia di operazioni',pt:'Família de fatos',fr:'Famille d’opérations',fi:'Laskuperhe'},
    hOn:         {en:'On',de:'An',nl:'Aan',da:'Til',sv:'På',no:'På',es:'Sí',it:'Sì',pt:'Sim',fr:'Oui',fi:'Päällä'},
    hOff:        {en:'Off',de:'Aus',nl:'Uit',da:'Fra',sv:'Av',no:'Av',es:'No',it:'No',pt:'Não',fr:'Non',fi:'Pois'},
    ariaHalf:    {en:'{n} dots',de:'{n} Punkte',nl:'{n} stippen',da:'{n} prikker',sv:'{n} prickar',no:'{n} prikker',es:'{n} puntos',it:'{n} puntini',pt:'{n} pontos',fr:'{n} points',fi:'{n} pistettä'},
    ariaHalf1:   {en:'1 dot',de:'1 Punkt',nl:'1 stip',da:'1 prik',sv:'1 prick',no:'1 prikk',es:'1 punto',it:'1 puntino',pt:'1 ponto',fr:'1 point',fi:'1 piste'},
    ariaDown:    {en:'Face down',de:'Verdeckt',nl:'Omgedraaid',da:'Vendt om',sv:'Med baksidan upp',no:'Med baksiden opp',es:'Boca abajo',it:'Coperta',pt:'Virada para baixo',fr:'Face cachée',fi:'Nurinpäin'},
    ariaPlate:   {en:'Plate: {n}',de:'Schild: {n}',nl:'Bordje: {n}',da:'Skilt: {n}',sv:'Skylt: {n}',no:'Skilt: {n}',es:'Placa: {n}',it:'Targhetta: {n}',pt:'Placa: {n}',fr:'Plaque : {n}',fi:'Kyltti: {n}'},
    ariaLid:     {en:'The plate is covered',de:'Das Schild ist zugedeckt',nl:'Het bordje is bedekt',da:'Skiltet er dækket til',sv:'Skylten är täckt',no:'Skiltet er dekket til',es:'La placa está tapada',it:'La targhetta è coperta',pt:'A placa está coberta',fr:'La plaque est couverte',fi:'Kyltti on peitetty'},
    ariaTurn:    {en:'Turn the domino',de:'Dominostein drehen',nl:'Dominosteen draaien',da:'Drej dominobrikken',sv:'Snurra dominobrickan',no:'Drei dominobrikken',es:'Girar el dominó',it:'Gira la tessera',pt:'Girar o dominó',fr:'Tourner le domino',fi:'Pyöräytä dominopalaa'},
    ariaLess:    {en:'One less',de:'Eins weniger',nl:'Eén minder',da:'Én mindre',sv:'En mindre',no:'Én mindre',es:'Uno menos',it:'Uno in meno',pt:'Um a menos',fr:'Un de moins',fi:'Yksi vähemmän'},
    ariaMore:    {en:'One more',de:'Eins mehr',nl:'Eén meer',da:'Én mere',sv:'En till',no:'Én til',es:'Uno más',it:'Uno in più',pt:'Um a mais',fr:'Un de plus',fi:'Yksi lisää'},
    ariaTray:    {en:'Tray',de:'Schale',nl:'Bakje',da:'Bakke',sv:'Fack',no:'Brett',es:'Bandeja',it:'Vassoio',pt:'Bandeja',fr:'Plateau',fi:'Tarjotin'}
  },/*STRINGS-END*/

  defaults: { numbers: 'w20', house: 'on' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'w10', labelKey: 'w10' }, { value: 'w20', labelKey: 'w20' }] },
    { key: 'house', type: 'choice', labelKey: 'setHouse', options: [{ value: 'on', labelKey: 'hOn' }, { value: 'off', labelKey: 'hOff' }] }
  ],
  OK_MS: 3800, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._shelf = [];
    injectDominoCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; this._shelf = []; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.stage === 1) { this.st.house = this._house(); var line = this._t(this.st.house ? 'tLine' : 'tLineOff'); if (this._pa) this._pa.msg = line; var pe = document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; if (this._wrap) this._paint(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return TurningDominoCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return TurningDominoCore.levelOf(this._setting('numbers')); },
  _house: function () { return this._setting('house') !== 'off'; },
  _key: function () { return this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TurningDominoCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TurningDominoCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; if (pass > this._pass) this._shelf = []; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._t(this._house() ? 'tLine' : 'tLineOff') }; this._pa = pa;
    return {
      id: 'domino.' + this._loc() + '.' + this._level() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx) {
    var C = TurningDominoCore;
    this._clearTimers(); this._busy = false; this._view = {};
    this.st = C.newState(C.round(this._level(), idx), this._house());
    var line = this._t(this._house() ? 'tLine' : 'tLineOff');
    if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this._start(0);
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'td-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="td-main"><div class="td-col"><div class="td-board"></div><div class="td-eq" aria-live="polite"></div>'
      + '<div class="td-ctrl"><button type="button" class="td-dbtn" data-k="minus">−</button><span class="td-drum" aria-live="polite"></span><button type="button" class="td-dbtn" data-k="plus">+</button><button type="button" class="td-go" data-k="go"></button></div></div>'
      + '<div class="td-house"></div></div><p class="td-note" aria-live="polite"></p><div class="td-shelf" aria-hidden="true"></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    var mn = this._q('[data-k="minus"]'), pl = this._q('[data-k="plus"]'), go = this._q('[data-k="go"]');
    mn.setAttribute('aria-label', this._t('ariaLess')); pl.setAttribute('aria-label', this._t('ariaMore'));
    go.textContent = this._t('check');
    mn.addEventListener('click', function () { self._dial(-1); });
    pl.addEventListener('click', function () { self._dial(1); });
    go.addEventListener('click', function () { self._check(); });
    wrap.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowUp') { self._dial(1); e.preventDefault(); }
      else if (k === 'ArrowDown') { self._dial(-1); e.preventDefault(); }
      else if (k === 'Enter' && self.st.stage === 1) { self._check(); e.preventDefault(); }
      else if (k === 't' || k === 'T') { self._turn(); e.preventDefault(); }
      else if (k === 'ArrowLeft') { self._break('left'); e.preventDefault(); }
      else if (k === 'ArrowRight') { self._break('right'); e.preventDefault(); }
      else if (k === 'b' || k === 'B') { self._back(); e.preventDefault(); }
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled && !nx.hidden ? nx : this._wrap).focus(); }
  },
  /* the board's geometry for a column width */
  _geom: function (ZW, narrow) {
    var r = this.st.r, p = narrow ? Math.max(12, Math.min(16, Math.floor((ZW - 24) / 12))) : 20;
    var plateW = narrow ? 96 : 120, plateH = narrow ? 44 : 52;
    var rows = r.level === 'w20' ? 2 : 1, sockH = rows * p + 8;
    var hw = Math.floor(Math.min(narrow ? 150 : 200, (ZW - 16) / 2)), cs = (hw - 18) / 5, hh = Math.round(2 * cs + 20);
    return { ZW: ZW, narrow: narrow, p: p, plateW: plateW, plateH: plateH, rows: rows, sockH: sockH, hw: hw, cs: cs, hh: hh, cx: ZW / 2 };
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = TurningDominoCore, st = this.st, r = st.r, L = C.layout(this._width()), narrow = L.mode !== 'wide', self = this;
    var house = st.house;
    this._wrap.className = 'td-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (house ? '' : ' no-house');
    var ZW = narrow || !house ? Math.min(L.W, 560) : Math.min(L.W - 216, 460);
    var G = this._geom(ZW, narrow), v = this._view;
    /* ---- the board ---- */
    var board = this._q('.td-board'); board.innerHTML = ''; board.style.width = ZW + 'px';
    var y = 0;
    /* the brass plate (or its felt lid) */
    var plate = this.api.el('div', 'td-plate' + (st.hidden === 'lid' ? ' is-lid' : ''));
    plate.style.cssText = 'left:' + (G.cx - G.plateW / 2) + 'px;top:0;width:' + G.plateW + 'px;height:' + G.plateH + 'px;';
    plate.textContent = st.hidden === 'lid' ? '?' : String(r.w);
    plate.setAttribute('role', 'img'); plate.setAttribute('aria-label', st.hidden === 'lid' ? this._t('ariaLid') : this._t('ariaPlate', { n: r.w }));
    board.appendChild(plate);
    y = G.plateH + 6;
    /* the socket strip under the plate: the march test */
    var ms = this._marchSVG(G, y), sk = this.api.el('div', 'td-socks'); sk.style.cssText = 'left:0;top:' + y + 'px;width:' + ZW + 'px;height:' + ms.h + 'px;'; sk.innerHTML = ms.svg; board.appendChild(sk);
    y += ms.h + 8;
    /* the domino on its holder */
    var dw = 2 * G.hw + 8, dx = G.cx - dw / 2;
    var dom = this.api.el('div', 'td-dom'); dom.style.cssText = 'left:' + dx + 'px;top:' + y + 'px;width:' + dw + 'px;height:' + G.hh + 'px;'; board.appendChild(dom);
    ['left', 'right'].forEach(function (side) {
      var x = side === 'left' ? 0 : G.hw + 8;
      if (st.removed === side) { var gap = self.api.el('span', 'td-gap'); gap.style.cssText = 'left:' + x + 'px;top:0;width:' + G.hw + 'px;height:' + G.hh + 'px;'; dom.appendChild(gap); return; }
      dom.appendChild(self._half(side, G, x, 0, 1));
    });
    if (!st.removed) { var gr = this.api.el('span', 'td-groove'); gr.style.cssText = 'left:' + (G.hw + 1) + 'px;top:6px;height:' + (G.hh - 12) + 'px;'; dom.appendChild(gr); }
    y += G.hh + 4;
    var hold = this.api.el('span', 'td-holder'); hold.style.cssText = 'left:' + (dx - 8) + 'px;top:' + y + 'px;width:' + (dw + 16) + 'px;'; board.appendChild(hold);
    y += 14 + 10;
    /* the turn chip and the tray */
    var tk = 0.78, tw = Math.round(G.hw * tk), th = Math.round(G.hh * tk);
    var turnB = this.api.el('button', 'td-turn'); turnB.type = 'button'; turnB.setAttribute('data-k', 'turn'); turnB.setAttribute('aria-label', this._t('ariaTurn'));
    turnB.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M25 12a10 10 0 1 0 1 8" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round"/><path d="M26 5v8h-8" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    turnB.style.cssText = 'left:' + dx + 'px;top:' + (y + Math.max(0, (th + 8 - 56) / 2)) + 'px;';
    turnB.disabled = st.stage !== 2 || st.done || !!st.removed || this._busy;
    turnB.addEventListener('click', function () { self._turn(); });
    board.appendChild(turnB);
    var tray = this.api.el('div', 'td-tray'); tray.style.cssText = 'left:' + (dx + dw - tw - 8) + 'px;top:' + y + 'px;width:' + (tw + 8) + 'px;height:' + (th + 8) + 'px;';
    tray.setAttribute('aria-label', this._t('ariaTray')); tray.setAttribute('role', 'group');
    if (st.removed) { var th2 = this._half(st.removed, G, 4, 4, tk); th2.classList.add('in-tray'); tray.appendChild(th2); }
    board.appendChild(tray);
    y += Math.max(56, th + 8);
    board.style.height = y + 'px';
    /* the equation strip */
    var e = C.equation(st), q = function (n) { return n == null ? '<b class="td-q">?</b>' : String(n); };
    this._q('.td-eq').innerHTML = e.op === '+' ? q(e.x) + ' + ' + q(e.y) + ' = ' + q(e.z) : q(e.x) + ' − ' + q(e.y) + ' = ' + q(e.z);
    /* the dial and Check (stage 1 only) */
    var ctrl = this._q('.td-ctrl'); ctrl.hidden = st.stage !== 1;
    this._q('.td-drum').textContent = st.dial == null ? '?' : String(st.dial);
    this._q('[data-k="minus"]').disabled = st.stage !== 1 || (st.dial != null && st.dial <= r.dialMin);
    this._q('[data-k="plus"]').disabled = st.stage !== 1 || (st.dial != null && st.dial >= r.dialMax);
    this._q('[data-k="go"]').disabled = st.stage !== 1;
    /* the fact house */
    var hs = this._q('.td-house'); hs.hidden = !house; hs.innerHTML = '';
    if (house) this._paintHouse(hs, narrow);
    /* the note */
    var note = this._q('.td-note'), hk = C.hint(st), txt = '', cls = 'td-note';
    if (st.done && v.msg) { txt = v.msg; cls += ' is-ok'; }
    else if (st.stage === 2) { txt = (v.part ? v.part + ' ' : '') + this._t(st.removed ? 'hBack' : 'hStage2'); cls += v.part ? ' is-ok' : ''; }
    else if (hk) { txt = this._t(hk, { d: st.dial, whole: r.w }); cls += ' is-hint'; }
    note.className = cls; note.textContent = txt;
    /* the shelf */
    var sh = this._q('.td-shelf'); sh.innerHTML = '';
    this._shelf.forEach(function (s) { var m = self.api.el('span', 'td-mini'); m.innerHTML = '<span>' + s.L + '</span><span>' + s.R + '</span><i>' + s.w + '</i>'; sh.appendChild(m); });
    sh.hidden = !this._shelf.length;
  },
  /* one half of the domino: face up with its pips, or face down with the dialled ghost rings */
  _half: function (side, G, x, y, k) {
    var st = this.st, self = this, n = side === 'left' ? st.left : st.right, down = st.hidden === side;
    var w = Math.round(G.hw * k), h = Math.round(G.hh * k), cs = G.cs * k, pr = cs * 0.36;
    var b = this.api.el('button', 'td-half' + (down ? ' is-down' : '')); b.type = 'button'; b.setAttribute('data-k', 'half-' + side);
    b.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;';
    var s = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">';
    s += '<rect x="1.5" y="1.5" width="' + (w - 3) + '" height="' + (h - 3) + '" rx="' + Math.round(14 * k) + '" fill="' + (down ? '#146B5E' : '#FBF6EA') + '" stroke="#0F2E29" stroke-width="3"/>';
    var gx = (w - 5 * cs) / 2, gy = (h - 2 * cs) / 2, i;
    if (down) {
      for (var c = -h; c < w; c += 16 * k) s += '<line x1="' + c + '" y1="' + h + '" x2="' + (c + h) + '" y2="0" stroke="#FBF3E4" stroke-opacity=".28" stroke-width="2"/><line x1="' + c + '" y1="0" x2="' + (c + h) + '" y2="' + h + '" stroke="#FBF3E4" stroke-opacity=".28" stroke-width="2"/>';
      var gh = st.stage === 1 && st.dial ? st.dial : 0;
      for (i = 0; i < gh; i++) s += '<circle class="td-ghost" cx="' + (gx + (i % 5) * cs + cs / 2).toFixed(1) + '" cy="' + (gy + Math.floor(i / 5) * cs + cs / 2).toFixed(1) + '" r="' + pr.toFixed(1) + '" fill="#E8F4F1" fill-opacity=".25" stroke="#FFFFFF" stroke-width="2.5"/>';
      b.setAttribute('aria-label', this._t('ariaDown'));
    } else {
      for (i = 0; i < n; i++) s += '<circle class="td-pip" cx="' + (gx + (i % 5) * cs + cs / 2).toFixed(1) + '" cy="' + (gy + Math.floor(i / 5) * cs + cs / 2).toFixed(1) + '" r="' + pr.toFixed(1) + '" fill="#1C2A2A"/>';
      b.setAttribute('aria-label', n === 1 ? this._t('ariaHalf1') : this._t('ariaHalf', { n: n }));
    }
    s += '</svg>'; b.innerHTML = s;
    b.disabled = st.stage !== 2 || st.done || this._busy;
    b.addEventListener('click', function () { if (b._noClick) { b._noClick = false; return; } if (st.removed === side) self._back(); else self._break(side); });
    /* a drag of 24 px does the same as a tap: break off from the holder, or put back from the tray */
    b.addEventListener('pointerdown', function (ev) { if (b.disabled) return; b._d = { x: ev.clientX, y: ev.clientY, on: false }; try { b.setPointerCapture(ev.pointerId); } catch (er) {} });
    b.addEventListener('pointermove', function (ev) { var d = b._d; if (!d) return; var dx = ev.clientX - d.x, dy = ev.clientY - d.y; if (!d.on && Math.abs(dx) + Math.abs(dy) > 8) { d.on = true; b.classList.add('is-dragging'); } if (d.on) b.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; });
    b.addEventListener('pointerup', function (ev) { var d = b._d; b._d = null; if (!d || !d.on) return; b.classList.remove('is-dragging'); b.style.transform = ''; b._noClick = true; if (Math.abs(ev.clientX - d.x) + Math.abs(ev.clientY - d.y) >= 24) { if (st.removed === side) self._back(); else self._break(side); } });
    return b;
  },
  /* the march test drawn under the plate */
  _marchSVG: function (G, y0) {
    var st = this.st, r = st.r, p = G.p, rad = p * 0.36, C = TurningDominoCore, last = st.last;
    var stripW = 10 * p, x0 = G.cx - stripW / 2, s = '', H = G.sockH, i;
    var sock = function (i) { return { x: x0 + (i % 10) * p + p / 2, y: 4 + Math.floor(i / 10) * p + p / 2 }; };
    var dot = function (pt, cls, fill, stroke, dash) { return '<circle class="' + cls + '" cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="' + rad.toFixed(1) + '" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="2"' : '') + (dash ? ' stroke-dasharray="3 2"' : '') + '/>'; };
    var label = function (pt, n) { return '<text x="' + pt.x.toFixed(1) + '" y="' + (pt.y + rad * 0.42).toFixed(1) + '" class="td-snum" font-size="' + (rad * 1.15).toFixed(1) + '">' + n + '</text>'; };
    s += '<rect class="td-rail" x="' + (x0 - 6) + '" y="0" width="' + (stripW + 12) + '" height="' + (G.rows * p + 8) + '" rx="' + (p / 2) + '"/>';
    var lid = r.lid, m = null, show = st.show;
    if (last && (last.reason === 'ok' || last.reason === 'few' || last.reason === 'many' || last.reason === 'lid')) m = last.m;
    var overflow = 0, ovRows = 0;
    if (!m) {
      /* at rest: a lid stance shows the dialled places as faint rings */
      if (lid && st.stage === 1 && st.dial) for (i = 0; i < st.dial; i++) s += dot(sock(i), 'td-sock is-faint', 'none', '#B98E33', true);
    } else if (last.reason === 'ok') {
      for (i = 0; i < r.w; i++) s += dot(sock(i), 'td-sp', '#1C2A2A');
    } else if (lid) {
      if (show >= 2) { for (i = 0; i < r.w; i++) s += dot(sock(i), 'td-sp', '#1C2A2A'); }   /* every pip in rows of ten, unnumbered: the child counts */
      else {
        for (i = 0; i < m.sockets; i++) s += i < m.pips ? dot(sock(i), 'td-sp', '#1C2A2A') : dot(sock(i), 'td-sock is-empty', '#FFE3B8', '#D9822B', true);
        overflow = m.overflow;
      }
    } else if (show >= 2) {
      for (i = 0; i < r.w; i++) { var pt = sock(i); s += i < m.visible ? dot(pt, 'td-sp', '#1C2A2A') : dot(pt, 'td-sock is-empty', '#FFE3B8', '#D9822B', true); s += i < m.visible ? '' : label(pt, i + 1); }
    } else {
      for (i = 0; i < r.w; i++) {
        var q = sock(i);
        if (i < m.visible) s += dot(q, 'td-sp', '#1C2A2A');
        else if (i < m.visible + m.ghosts) s += dot(q, 'td-sg', '#CFE7E1', '#146B5E');
        else s += dot(q, 'td-sock is-empty', '#FFE3B8', '#D9822B', true);
      }
      overflow = m.overflow;
    }
    if (overflow) {
      ovRows = Math.ceil(overflow / 10);
      for (i = 0; i < overflow; i++) { var o = { x: x0 + p + (i % 10) * p + p / 2, y: 4 + G.rows * p + 6 + Math.floor(i / 10) * p + p / 2 }; s += dot(o, 'td-over', '#F2A65A', '#B5461F'); }
      H += ovRows * p + 6;
    }
    var wAll = G.ZW;
    return { svg: '<svg width="' + wAll + '" height="' + H + '" viewBox="0 0 ' + wAll + ' ' + H + '" aria-hidden="true">' + s + '</svg>', h: H };
  },
  /* the fact house: the trio on the roof, four windows with the handling that writes each fact */
  _paintHouse: function (hs, narrow) {
    var C = TurningDominoCore, st = this.st, r = st.r, ws = C.windows(r), self = this, v = this._view;
    /* the roof never tells the unknown: until stage 1 is solved the hidden number is a ? (the hidden half is named by where it STARTED) */
    var roofN = function (where, n) { return st.stage === 1 && r.hidden === where ? '?' : String(n); };
    var roof = '<svg class="td-roof" viewBox="0 0 200 92" aria-hidden="true"><path d="M8 86 100 8 192 86z" fill="#F2784B" fill-opacity=".14" stroke="#B5461F" stroke-width="3" stroke-linejoin="round"/>'
      + '<text x="100" y="46" class="td-rn">' + roofN('lid', r.w) + '</text><text x="58" y="78" class="td-rn">' + roofN('left', r.L) + '</text><text x="142" y="78" class="td-rn">' + roofN('right', r.R) + '</text></svg>';
    var body = '';
    ws.forEach(function (e, i) {
      var have = st.facts.indexOf(i) >= 0, nextEmpty = st.stage === 2 && !st.done && !have && st.facts.length && ws.findIndex(function (x, j) { return st.facts.indexOf(j) < 0; }) === i;
      var txt = e.op === '+' ? e.x + ' + ' + e.y + ' = ' + e.z : e.x + ' − ' + e.y + ' = ' + e.z;
      body += '<div class="td-win' + (have ? ' is-on' : '') + (v.stamp === i ? ' is-stamp' : '') + (v.flash === i ? ' is-flash' : '') + (nextEmpty ? ' is-next' : '') + '">' + (have ? txt : winIcon(i)) + '</div>';
    });
    hs.innerHTML = roof + '<div class="td-wins">' + body + '</div>';
    hs.classList.toggle('is-full', st.facts.length === 4);
  },
  /* ---------------- actions ---------------- */
  _dial: function (k) {
    var st = this.st; if (st.stage !== 1 || st.done) return;
    if (TurningDominoCore.step(st, k)) { this._view = {}; this.api.sound(420 + (st.dial || 0) * 18); this._paint(); }
  },
  _check: function () {
    var C = TurningDominoCore, st = this.st, self = this, r = st.r;
    if (st.stage !== 1 || st.done) return;
    var res = C.check(st);
    if (!res.ok) { this.api.sound(res.reason === 'empty' ? 460 : 220); this._view = {}; this._paint(); this.api.announce(this._q('.td-note').textContent || ''); return; }
    var part = this._t('okPart', { a: r.L, b: r.R, whole: r.w });
    this._view = { stamp: res.win, part: part };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140));
    if (st.done) { this._finish(part); return; }
    this._paint(); this.api.announce(part);
  },
  _after: function (res) {
    var st = this.st, self = this;
    if (!res) return;
    this._view = { part: this._view.part };
    if (res.isNew) { this._view.stamp = res.win; this.api.sound(880); } else if (res.win >= 0) this._view.flash = res.win;
    if (st.done) { var r = st.r; this._finish(this._t('okFour', { a: r.L, b: r.R, w: r.w })); return; }
    this._paint();
  },
  _turn: function () {
    var st = this.st, self = this, C = TurningDominoCore;
    if (st.stage !== 2 || st.done || st.removed || this._busy) return;
    if (this.FAST) { this._after(C.turn(st)); return; }
    this._busy = true; var dm = this._q('.td-dom'); if (dm) { void dm.offsetWidth; dm.classList.add('is-turning'); }   /* spin the domino that is on screen, then swap its halves */
    this.api.sound(330);
    this._later(function () { self._busy = false; self._after(C.turn(st)); }, 450);
  },
  _break: function (side) {
    var st = this.st; if (st.stage !== 2 || st.done || st.removed || this._busy) return;
    this.api.sound(260); this._after(TurningDominoCore.breakOff(st, side));
  },
  _back: function () {
    var st = this.st; if (st.stage !== 2 || st.done || !st.removed || this._busy) return;
    this.api.sound(200); this._after(TurningDominoCore.putBack(st));
  },
  _finish: function (msg) {
    var st = this.st, r = st.r, self = this;
    this._shelf.push({ L: r.L, R: r.R, w: r.w });
    if (this._pa) this._pa.msg = msg;
    this._view.msg = msg;
    this._paint(); this.api.announce(msg);
    this._later(function () { var n = self._q('.td-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);
    this._advance(msg.length * 60 + 1800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 3800 ? ms : 0));
  }
};

/* the window icons: the handling that writes each fact (no words) */
function winIcon(i) {
  var d = '<rect x="4" y="8" width="20" height="16" rx="3" fill="#FBF6EA" stroke="#0F2E29" stroke-width="2"/><rect x="26" y="8" width="20" height="16" rx="3" fill="#FBF6EA" stroke="#0F2E29" stroke-width="2"/>';
  var inner = i === 0 ? d
    : i === 1 ? d + '<path d="M14 4a12 6 0 0 1 22 0" fill="none" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round"/><path d="M33 1l3 3-4 2" fill="none" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round"/>'
    : i === 2 ? '<rect x="4" y="16" width="20" height="16" rx="3" fill="#FBF6EA" stroke="#0F2E29" stroke-width="2" stroke-dasharray="3 2"/><rect x="26" y="8" width="20" height="16" rx="3" fill="#FBF6EA" stroke="#0F2E29" stroke-width="2"/><path d="M14 4v8" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round"/>'
    : '<rect x="4" y="8" width="20" height="16" rx="3" fill="#FBF6EA" stroke="#0F2E29" stroke-width="2"/><rect x="26" y="16" width="20" height="16" rx="3" fill="#FBF6EA" stroke="#0F2E29" stroke-width="2" stroke-dasharray="3 2"/><path d="M36 4v8" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round"/>';
  return '<svg class="td-icon" viewBox="0 0 50 34" aria-hidden="true">' + inner + '</svg>';
}

var tdCssDone = false;
function injectDominoCSS() {
  if (tdCssDone || typeof document === 'undefined') return;
  tdCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.td-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.td-main{display:flex;gap:16px;align-items:flex-start;justify-content:center;width:100%;} .td-wrap.is-narrow .td-main{flex-direction:column;align-items:center;gap:10px;}'
  + '.td-col{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.td-board{position:relative;max-width:100%;} .td-board>*{position:absolute;}'
  + '.td-plate{box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-radius:12px;background:linear-gradient(#E8C26A,#C79A3E);box-shadow:inset 0 0 0 2.5px #8A6500,0 3px 0 rgba(0,0,0,.18);font-family:' + H + ';font-weight:800;font-size:36px;color:#3A2A00;}'
  + '.td-plate.is-lid{background:#2E7D5B;box-shadow:inset 0 0 0 2.5px #1D5A40,0 3px 0 rgba(0,0,0,.18);color:#E8F4F1;}'
  + '.td-socks svg{display:block;} .td-rail{fill:#FFF6D6;stroke:#D4B25C;stroke-width:2;} .td-snum{fill:#8A4A10;font-family:' + H + ';font-weight:800;text-anchor:middle;}'
  + '.td-sock.is-empty{animation:tdGlow 1s ease-in-out 2;} @keyframes tdGlow{50%{fill:#FFC98A;}} .td-over{animation:tdHang .5s ease-out both;} @keyframes tdHang{from{transform:translateY(-6px);opacity:0;}}'
  + '.td-dom{transition:transform .45s cubic-bezier(.3,1.25,.5,1);} .td-dom.is-turning{transform:rotate(180deg);} .td-dom>*{position:absolute;}'
  + '.td-half{padding:0;border:0;background:none;cursor:pointer;touch-action:none;border-radius:14px;} .td-half svg{display:block;} .td-half:disabled{cursor:default;}'
  + '.td-half:not(:disabled):hover{filter:drop-shadow(0 0 5px #F2784B);} .td-half.is-dragging{z-index:6;filter:drop-shadow(0 6px 8px rgba(0,0,0,.25));} .td-half.in-tray{animation:tdDrop .3s ease-out both;} @keyframes tdDrop{from{transform:translateY(-18px);opacity:.3;}}'
  + '.td-half:focus-visible,.td-turn:focus-visible,.td-dbtn:focus-visible,.td-go:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.td-groove{width:6px;background:#0F2E29;border-radius:3px;opacity:.85;} .td-gap{box-sizing:border-box;border:2.5px dashed #9CC9BE;border-radius:14px;}'
  + '.td-holder{height:14px;border-radius:7px;background:#3C8F6E;box-shadow:inset 0 -3px 0 #2A6B52;}'
  + '.td-tray{box-sizing:border-box;border:2.5px dashed #C9B48A;border-radius:16px;background:#FFFBF0;} .td-tray>.td-half{position:absolute;}'
  + '.td-turn{width:56px;height:56px;padding:0;border:0;border-radius:28px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #146B5E,0 3px 0 #9CC9BE;cursor:pointer;display:flex;align-items:center;justify-content:center;} .td-turn svg{width:30px;height:30px;} .td-turn:disabled{opacity:.35;cursor:default;}'
  + '.td-eq{font-family:' + H + ';font-weight:800;font-size:34px;line-height:1.1;color:#0F4A40;letter-spacing:.02em;} .td-q{display:inline-block;min-width:.9em;padding:0 .12em;border-radius:8px;background:#FDE6D8;color:#B5461F;text-align:center;}'
  + '.td-ctrl{display:flex;gap:10px;align-items:center;justify-content:center;} .td-ctrl[hidden]{display:none;}'
  + '.td-dbtn{width:52px;height:52px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40,0 4px 0 #9CC9BE;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1;color:#0F4A40;cursor:pointer;} .td-dbtn:disabled{opacity:.4;cursor:default;}'
  + '.td-drum{min-width:72px;height:56px;padding:0 8px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-radius:14px;background:#FFFFFF;box-shadow:inset 0 0 0 3px #0F4A40;font-family:' + H + ';font-weight:800;font-size:34px;color:#0F4A40;}'
  + '.td-go{height:52px;padding:0 20px;border:0;border-radius:26px;background:#146B5E;box-shadow:0 4px 0 #0F4A40;font-family:' + H + ';font-weight:800;font-size:20px;color:#FFFFFF;cursor:pointer;} .td-go:disabled{opacity:.5;cursor:default;}'
  + '.td-house{width:200px;display:flex;flex-direction:column;align-items:center;gap:6px;} .td-house[hidden]{display:none;} .td-roof{width:200px;height:92px;display:block;}'
  + '.td-rn{font-family:' + H + ';font-weight:800;font-size:26px;fill:#0F4A40;text-anchor:middle;}'
  + '.td-wins{display:flex;flex-direction:column;gap:8px;width:184px;padding:10px 8px;box-sizing:border-box;border-radius:0 0 14px 14px;background:#FBEBD9;box-shadow:inset 0 0 0 3px #B5461F;}'
  + '.td-win{height:52px;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #E2C9A8;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:22px;color:#0F4A40;white-space:nowrap;}'
  + '.td-icon{width:46px;height:32px;opacity:.55;} .td-win.is-next .td-icon{opacity:1;animation:tdWig 1.2s ease-in-out 2;} @keyframes tdWig{25%{transform:rotate(-8deg);}75%{transform:rotate(8deg);}}'
  + '.td-win.is-on{background:#FFF6D6;box-shadow:inset 0 0 0 2.5px #D4A21E;} .td-win.is-stamp{animation:tdStamp .35s ease-out both;} @keyframes tdStamp{from{transform:scale(1.25);}} .td-win.is-flash{animation:tdFlash .5s ease-in-out 2;} @keyframes tdFlash{50%{background:#FFE7A8;}}'
  + '.td-house.is-full .td-wins{box-shadow:inset 0 0 0 3px #D4A21E,0 0 0 6px #FFF0C2;} .td-house.is-full .td-roof path{fill:#FFE7A8;fill-opacity:1;}'
  + '.td-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .td-note:empty{display:none;} .td-note.is-hint{color:#B5461F;} .td-note.is-ok{color:#146B5E;}'
  + '.td-shelf{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;max-width:100%;} .td-shelf[hidden]{display:none;}'
  + '.td-mini{position:relative;display:flex;border-radius:6px;background:#FBF6EA;box-shadow:inset 0 0 0 2px #0F2E29;font-family:' + H + ';font-weight:800;font-size:15px;color:#0F2E29;} .td-mini span{width:24px;text-align:center;line-height:26px;} .td-mini span+span{box-shadow:-2px 0 0 #0F2E29;}'
  + '.td-mini i{position:absolute;top:-10px;left:50%;transform:translateX(-50%);font-style:normal;font-size:12px;line-height:14px;padding:0 4px;border-radius:5px;background:#E8C26A;}'
  + '.td-wrap.is-narrow .td-plate{font-size:30px;} .td-wrap.is-narrow .td-eq{font-size:28px;} .td-wrap.is-narrow .td-note{font-size:17px;}'
  + '.td-wrap.is-narrow .td-house{width:100%;max-width:340px;flex-direction:row;align-items:stretch;gap:8px;} .td-wrap.is-narrow .td-roof{width:110px;height:auto;flex:none;align-self:center;} .td-wrap.is-narrow .td-rn{font-size:32px;}'
  + '.td-wrap.is-narrow .td-wins{display:grid;grid-template-columns:1fr 1fr;gap:6px;flex:1;width:auto;border-radius:12px;padding:8px;} .td-wrap.is-narrow .td-win{height:44px;font-size:16px;}'
  + '.td-wrap.is-narrow .td-ctrl{gap:8px;} .td-wrap.is-narrow .td-dbtn{width:48px;height:48px;} .td-wrap.is-narrow .td-drum{min-width:60px;height:50px;font-size:30px;} .td-wrap.is-narrow .td-go{height:48px;padding:0 16px;font-size:18px;}'
  + '.td-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.td-ctrl,.td-turn,.td-note{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.td-wrap *{animation-duration:.15s !important;animation-iteration-count:1 !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'td-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.TurningDominoActivity = TurningDominoActivity;
