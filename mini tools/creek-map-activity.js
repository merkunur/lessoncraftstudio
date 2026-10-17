/* =====================================================================
   creek-map-activity.js — ACTIVITY #21 of the one-by-one rebuild:
   THE CREEK MAP ("Comparison Creek", K.CC.C.7).
   ---------------------------------------------------------------------
   A creek down the stage: at the source a sign with the round's rule
   (follow the BIGGER numbers / the SMALLER ones) and a library sailboat;
   two forks, each with a number buoy in either channel; a pond at the
   bottom where a library friend waits. The child taps one buoy at each
   fork (the planned route lights up), Check — the boat sails it. A wrong
   fork stops the boat in the reeds there (the fork ringed); a second miss
   puts dots under that fork's two numbers. Right → the boat reaches the
   friend. The rule changes from round to round (setting: mixed / always
   bigger / always smaller). Model: creek-map-core.js. 0 lines to
   lcs-shell.* or any shared core.
   Test seams: window.CreekMapActivity.st / ._order / ._pool / .SAIL_MS.
   ===================================================================== */
'use strict';

var CreekMapActivity = {
  id: 'creek-map',
  apparatusClasses: ['cm-'],

  strings: {
    title:        {en:'Comparison Creek',de:'Der Zahlenbach',fr:'Le ruisseau des nombres',es:'El arroyo de los números',pt:'O riacho dos números',it:'Il ruscello dei numeri',nl:'De getallenbeek',sv:'Talbäcken',da:'Talbækken',no:'Tallbekken',fi:'Lukupuro'},
    instruction:  {en:'The creek forks twice on the way to the pond, where a friend is waiting. The sign at the top shows the rule: follow the bigger numbers, or the smaller ones. Tap one number at each fork, press Check — and the boat sails your route.',de:'Der Bach teilt sich zweimal auf dem Weg zum Teich, wo ein Freund wartet. Das Schild oben zeigt die Regel: den größeren Zahlen folgen oder den kleineren. Tippe an jeder Gabelung eine Zahl an und drücke auf Prüfen – dann segelt das Boot deinen Weg.',fr:'Le ruisseau se divise deux fois sur le chemin de la mare, où un ami attend. Le panneau en haut donne la règle : suivre les plus grands nombres, ou les plus petits. Touche un nombre à chaque embranchement, appuie sur Vérifier — et le bateau suit ton chemin.',es:'El arroyo se divide dos veces de camino al estanque, donde espera un amigo. El letrero de arriba dice la regla: seguir los números mayores o los menores. Toca un número en cada bifurcación, oprime Comprobar y el barco navegará por tu camino.',pt:'O riacho se divide duas vezes no caminho até a lagoa, onde um amigo espera. A placa lá em cima mostra a regra: seguir os números maiores ou os menores. Toque em um número em cada bifurcação, aperte Verificar — e o barco navega pelo seu caminho.',it:'Il ruscello si divide due volte sulla strada per lo stagno, dove aspetta un amico. Il cartello in alto dà la regola: seguire i numeri più grandi oppure i più piccoli. Tocca un numero a ogni bivio, premi Verifica e la barca seguirà la tua strada.',nl:'De beek splitst zich twee keer op weg naar de vijver, waar een vriendje wacht. Het bord bovenaan geeft de regel: volg de grotere getallen, of de kleinere. Tik bij elke splitsing op een getal, druk op Controleer – en de boot vaart jouw route.',sv:'Bäcken delar sig två gånger på vägen till dammen, där en kompis väntar. Skylten högst upp visar regeln: följ de större talen eller de mindre. Tryck på ett tal vid varje förgrening, tryck på Kontrollera – så seglar båten din väg.',da:'Bækken deler sig to gange på vejen til dammen, hvor en ven venter. Skiltet øverst viser reglen: følg de største tal eller de mindste. Tryk på et tal ved hver forgrening, tryk på Tjek – så sejler båden din vej.',no:'Bekken deler seg to ganger på veien til dammen, der en venn venter. Skiltet øverst viser regelen: følg de største tallene eller de minste. Trykk på et tall ved hver forgrening, trykk på Sjekk – så seiler båten din vei.',fi:'Puro haarautuu kahdesti matkalla lammelle, jossa ystävä odottaa. Ylhäällä oleva kyltti kertoo säännön: seuraa suurempia lukuja tai pienempiä. Napauta yhtä lukua jokaisessa haaraumassa, paina Tarkista – ja vene purjehtii valitsemaasi reittiä.'},
    promptBig:    {en:'Follow the bigger numbers! Tap one at each fork, then press Check.',de:'Folge den größeren Zahlen! Tippe an jeder Gabelung eine an und drücke dann auf Prüfen.',fr:'Suis les plus grands nombres ! Touche-en un à chaque embranchement, puis appuie sur Vérifier.',es:'¡Sigue los números mayores! Toca uno en cada bifurcación y luego oprime Comprobar.',pt:'Siga os números maiores! Toque em um em cada bifurcação e depois aperte Verificar.',it:'Segui i numeri più grandi! Toccane uno a ogni bivio, poi premi Verifica.',nl:'Volg de grotere getallen! Tik er bij elke splitsing een aan en druk dan op Controleer.',sv:'Följ de större talen! Tryck på ett vid varje förgrening och tryck sedan på Kontrollera.',da:'Følg de største tal! Tryk på ét ved hver forgrening, og tryk så på Tjek.',no:'Følg de største tallene! Trykk på ett ved hver forgrening, og trykk så på Sjekk.',fi:'Seuraa suurempia lukuja! Napauta yhtä jokaisessa haaraumassa ja paina sitten Tarkista.'},
    promptSmall:  {en:'Follow the smaller numbers! Tap one at each fork, then press Check.',de:'Folge den kleineren Zahlen! Tippe an jeder Gabelung eine an und drücke dann auf Prüfen.',fr:'Suis les plus petits nombres ! Touche-en un à chaque embranchement, puis appuie sur Vérifier.',es:'¡Sigue los números menores! Toca uno en cada bifurcación y luego oprime Comprobar.',pt:'Siga os números menores! Toque em um em cada bifurcação e depois aperte Verificar.',it:'Segui i numeri più piccoli! Toccane uno a ogni bivio, poi premi Verifica.',nl:'Volg de kleinere getallen! Tik er bij elke splitsing een aan en druk dan op Controleer.',sv:'Följ de mindre talen! Tryck på ett vid varje förgrening och tryck sedan på Kontrollera.',da:'Følg de mindste tal! Tryk på ét ved hver forgrening, og tryk så på Tjek.',no:'Følg de minste tallene! Trykk på ett ved hver forgrening, og trykk så på Sjekk.',fi:'Seuraa pienempiä lukuja! Napauta yhtä jokaisessa haaraumassa ja paina sitten Tarkista.'},
    buoyAria:     {en:'Fork {f}: the number {n}',de:'Gabelung {f}: die Zahl {n}',fr:'Embranchement {f} : le nombre {n}',es:'Bifurcación {f}: el número {n}',pt:'Bifurcação {f}: o número {n}',it:'Bivio {f}: il numero {n}',nl:'Splitsing {f}: het getal {n}',sv:'Förgrening {f}: talet {n}',da:'Forgrening {f}: tallet {n}',no:'Forgrening {f}: tallet {n}',fi:'Haarauma {f}: luku {n}'},
    signBig:      {en:'The rule: follow the bigger numbers',de:'Die Regel: den größeren Zahlen folgen',fr:'La règle : suivre les plus grands nombres',es:'La regla: seguir los números mayores',pt:'A regra: seguir os números maiores',it:'La regola: seguire i numeri più grandi',nl:'De regel: volg de grotere getallen',sv:'Regeln: följ de större talen',da:'Reglen: følg de største tal',no:'Regelen: følg de største tallene',fi:'Sääntö: seuraa suurempia lukuja'},
    signSmall:    {en:'The rule: follow the smaller numbers',de:'Die Regel: den kleineren Zahlen folgen',fr:'La règle : suivre les plus petits nombres',es:'La regla: seguir los números menores',pt:'A regra: seguir os números menores',it:'La regola: seguire i numeri più piccoli',nl:'De regel: volg de kleinere getallen',sv:'Regeln: följ de mindre talen',da:'Reglen: følg de mindste tal',no:'Regelen: følg de minste tallene',fi:'Sääntö: seuraa pienempiä lukuja'},
    hintStart:    {en:'Tap one number at each fork.',de:'Tippe an jeder Gabelung eine Zahl an.',fr:'Touche un nombre à chaque embranchement.',es:'Toca un número en cada bifurcación.',pt:'Toque em um número em cada bifurcação.',it:'Tocca un numero a ogni bivio.',nl:'Tik bij elke splitsing op een getal.',sv:'Tryck på ett tal vid varje förgrening.',da:'Tryk på et tal ved hver forgrening.',no:'Trykk på et tall ved hver forgrening.',fi:'Napauta yhtä lukua jokaisessa haaraumassa.'},
    hintEvery:    {en:'Choose a number at both forks, then press Check.',de:'Wähle an beiden Gabelungen eine Zahl und drücke dann auf Prüfen.',fr:'Choisis un nombre aux deux embranchements, puis appuie sur Vérifier.',es:'Elige un número en las dos bifurcaciones y luego oprime Comprobar.',pt:'Escolha um número nas duas bifurcações e depois aperte Verificar.',it:'Scegli un numero a tutti e due i bivi, poi premi Verifica.',nl:'Kies bij allebei de splitsingen een getal en druk dan op Controleer.',sv:'Välj ett tal vid båda förgreningarna och tryck sedan på Kontrollera.',da:'Vælg et tal ved begge forgreninger, og tryk så på Tjek.',no:'Velg et tall ved begge forgreningene, og trykk så på Sjekk.',fi:'Valitse luku kummastakin haaraumasta ja paina sitten Tarkista.'},
    hintForkBig:  {en:'The boat is stuck at the ringed fork. Which number there is bigger?',de:'Das Boot hängt an der markierten Gabelung fest. Welche Zahl dort ist größer?',fr:'Le bateau est coincé à l’embranchement entouré. Quel nombre y est le plus grand ?',es:'El barco se atoró en la bifurcación marcada. ¿Qué número de ahí es mayor?',pt:'O barco ficou preso na bifurcação marcada. Qual número de lá é maior?',it:'La barca è bloccata al bivio cerchiato. Quale numero lì è più grande?',nl:'De boot zit vast bij de omcirkelde splitsing. Welk getal daar is groter?',sv:'Båten har fastnat vid den inringade förgreningen. Vilket tal där är större?',da:'Båden sidder fast ved den markerede forgrening. Hvilket tal dér er størst?',no:'Båten sitter fast ved den markerte forgreningen. Hvilket tall der er størst?',fi:'Vene on jumissa merkityssä haaraumassa. Kumpi luku siellä on suurempi?'},
    hintForkSmall:{en:'The boat is stuck at the ringed fork. Which number there is smaller?',de:'Das Boot hängt an der markierten Gabelung fest. Welche Zahl dort ist kleiner?',fr:'Le bateau est coincé à l’embranchement entouré. Quel nombre y est le plus petit ?',es:'El barco se atoró en la bifurcación marcada. ¿Qué número de ahí es menor?',pt:'O barco ficou preso na bifurcação marcada. Qual número de lá é menor?',it:'La barca è bloccata al bivio cerchiato. Quale numero lì è più piccolo?',nl:'De boot zit vast bij de omcirkelde splitsing. Welk getal daar is kleiner?',sv:'Båten har fastnat vid den inringade förgreningen. Vilket tal där är mindre?',da:'Båden sidder fast ved den markerede forgrening. Hvilket tal dér er mindst?',no:'Båten sitter fast ved den markerte forgreningen. Hvilket tall der er minst?',fi:'Vene on jumissa merkityssä haaraumassa. Kumpi luku siellä on pienempi?'},
    hintDotsBig:  {en:'Count the dots under the two numbers at the ringed fork. The number with more dots is bigger.',de:'Zähle die Punkte unter den beiden Zahlen an der markierten Gabelung. Die Zahl mit mehr Punkten ist größer.',fr:'Compte les points sous les deux nombres de l’embranchement entouré. Le nombre qui a le plus de points est le plus grand.',es:'Cuenta los puntos debajo de los dos números de la bifurcación marcada. El número con más puntos es el mayor.',pt:'Conte as bolinhas embaixo dos dois números da bifurcação marcada. O número com mais bolinhas é o maior.',it:'Conta i pallini sotto i due numeri del bivio cerchiato. Il numero con più pallini è il più grande.',nl:'Tel de stippen onder de twee getallen bij de omcirkelde splitsing. Het getal met meer stippen is groter.',sv:'Räkna prickarna under de två talen vid den inringade förgreningen. Talet med flest prickar är störst.',da:'Tæl prikkerne under de to tal ved den markerede forgrening. Tallet med flest prikker er størst.',no:'Tell prikkene under de to tallene ved den markerte forgreningen. Tallet med flest prikker er størst.',fi:'Laske pisteet merkityn haarauman kahden luvun alta. Luku, jonka alla on enemmän pisteitä, on suurempi.'},
    hintDotsSmall:{en:'Count the dots under the two numbers at the ringed fork. The number with fewer dots is smaller.',de:'Zähle die Punkte unter den beiden Zahlen an der markierten Gabelung. Die Zahl mit weniger Punkten ist kleiner.',fr:'Compte les points sous les deux nombres de l’embranchement entouré. Le nombre qui a le moins de points est le plus petit.',es:'Cuenta los puntos debajo de los dos números de la bifurcación marcada. El número con menos puntos es el menor.',pt:'Conte as bolinhas embaixo dos dois números da bifurcação marcada. O número com menos bolinhas é o menor.',it:'Conta i pallini sotto i due numeri del bivio cerchiato. Il numero con meno pallini è il più piccolo.',nl:'Tel de stippen onder de twee getallen bij de omcirkelde splitsing. Het getal met minder stippen is kleiner.',sv:'Räkna prickarna under de två talen vid den inringade förgreningen. Talet med färst prickar är minst.',da:'Tæl prikkerne under de to tal ved den markerede forgrening. Tallet med færrest prikker er mindst.',no:'Tell prikkene under de to tallene ved den markerte forgreningen. Tallet med færrest prikker er minst.',fi:'Laske pisteet merkityn haarauman kahden luvun alta. Luku, jonka alla on vähemmän pisteitä, on pienempi.'},
    celebrateBig: {en:'Yes — you followed the bigger numbers, {a} and {b}, all the way to the pond!',de:'Ja – du bist den größeren Zahlen gefolgt, {a} und {b}, bis zum Teich!',fr:'Oui — tu as suivi les plus grands nombres, {a} et {b}, jusqu’à la mare !',es:'¡Sí: seguiste los números mayores, {a} y {b}, hasta el estanque!',pt:'Isso: você seguiu os números maiores, {a} e {b}, até a lagoa!',it:'Sì: hai seguito i numeri più grandi, {a} e {b}, fino allo stagno!',nl:'Ja – je volgde de grotere getallen, {a} en {b}, helemaal tot de vijver!',sv:'Ja – du följde de större talen, {a} och {b}, ända fram till dammen!',da:'Ja – du fulgte de største tal, {a} og {b}, helt hen til dammen!',no:'Ja – du fulgte de største tallene, {a} og {b}, helt fram til dammen!',fi:'Kyllä – seurasit suurempia lukuja, {a} ja {b}, lammelle asti!'},
    celebrateSmall:{en:'Yes — you followed the smaller numbers, {a} and {b}, all the way to the pond!',de:'Ja – du bist den kleineren Zahlen gefolgt, {a} und {b}, bis zum Teich!',fr:'Oui — tu as suivi les plus petits nombres, {a} et {b}, jusqu’à la mare !',es:'¡Sí: seguiste los números menores, {a} y {b}, hasta el estanque!',pt:'Isso: você seguiu os números menores, {a} e {b}, até a lagoa!',it:'Sì: hai seguito i numeri più piccoli, {a} e {b}, fino allo stagno!',nl:'Ja – je volgde de kleinere getallen, {a} en {b}, helemaal tot de vijver!',sv:'Ja – du följde de mindre talen, {a} och {b}, ända fram till dammen!',da:'Ja – du fulgte de mindste tal, {a} og {b}, helt hen til dammen!',no:'Ja – du fulgte de minste tallene, {a} og {b}, helt fram til dammen!',fi:'Kyllä – seurasit pienempiä lukuja, {a} ja {b}, lammelle asti!'},
    setRange:     {en:'Numbers',de:'Zahlen',fr:'Nombres',es:'Números',pt:'Números',it:'Numeri',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    rangeTo5:     {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',es:'Hasta 5',pt:'Até 5',it:'Fino a 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opptil 5',fi:'5:een asti'},
    rangeTo10:    {en:'Up to 10',de:'Bis 10',fr:'Jusqu’à 10',es:'Hasta 10',pt:'Até 10',it:'Fino a 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opptil 10',fi:'10:een asti'},
    setRule:      {en:'Rule',de:'Regel',fr:'Règle',es:'Regla',pt:'Regra',it:'Regola',nl:'Regel',sv:'Regel',da:'Regel',no:'Regel',fi:'Sääntö'},
    ruleMixed:    {en:'Bigger and smaller',de:'Größer und kleiner',fr:'Plus grand et plus petit',es:'Mayor y menor',pt:'Maior e menor',it:'Più grande e più piccolo',nl:'Groter en kleiner',sv:'Större och mindre',da:'Større og mindre',no:'Større og mindre',fi:'Suurempi ja pienempi'},
    ruleBig:      {en:'Always bigger',de:'Immer größer',fr:'Toujours plus grand',es:'Siempre mayor',pt:'Sempre maior',it:'Sempre più grande',nl:'Altijd groter',sv:'Alltid större',da:'Altid større',no:'Alltid større',fi:'Aina suurempi'},
    ruleSmall:    {en:'Always smaller',de:'Immer kleiner',fr:'Toujours plus petit',es:'Siempre menor',pt:'Sempre menor',it:'Sempre più piccolo',nl:'Altijd kleiner',sv:'Alltid mindre',da:'Altid mindre',no:'Alltid mindre',fi:'Aina pienempi'}
  },

  defaults: { range: 'to10', rule: 'mixed' },
  settings: [
    { key: 'range', type: 'choice', labelKey: 'setRange', options: [{ value: 'to5', labelKey: 'rangeTo5' }, { value: 'to10', labelKey: 'rangeTo10' }] },
    { key: 'rule', type: 'choice', labelKey: 'setRule', options: [{ value: 'mixed', labelKey: 'ruleMixed' }, { value: 'bigger', labelKey: 'ruleBig' }, { value: 'smaller', labelKey: 'ruleSmall' }] }
  ],

  SAIL_MS: 420,   /* per leg */

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._ro = null; this._sailTimer = null; this._sailing = false; this._boatAt = null;
    this._themes = {};
    injectCreekMapCSS();
    if (typeof LCSPictures !== 'undefined') {
      [CreekMapCore.BOAT.theme, CreekMapCore.FRIEND_THEME].forEach(function (th) {
        LCSPictures.load(th).then(function (theme) { self._themes[th] = theme; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* stays bare */ });
      });
    }
  },
  destroy: function () { if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } clearTimeout(this._sailTimer); },
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
  _range: function () { var r = this.api && this.api.settings && this.api.settings.range; return CreekMapCore.POOLS[r] ? r : 'to10'; },
  _rule: function () { var r = this.api && this.api.settings && this.api.settings.rule; return CreekMapCore.RULES.indexOf(r) >= 0 ? r : 'mixed'; },
  _ensurePool: function () { var key = this._range() + ':' + this._rule(); if (!this._pool || this._poolKey !== key) { this._pool = CreekMapCore.rounds(this._range(), 'cm', this._rule()); this._poolKey = key; this._order = null; } return this._pool; },
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
    var r = pool[this._order[index % n]], big = r.rule === 'bigger';
    var st0 = CreekMapCore.newState(r), f = CreekMapCore.followed(st0);
    return {
      id: 'creek-map.' + r.id,
      promptKey: big ? 'promptBig' : 'promptSmall',
      promptArgs: { a: f[0], b: f[1] },
      celebrateKey: big ? 'celebrateBig' : 'celebrateSmall',
      answerType: 'state',
      setup: function (tool) { tool.st = CreekMapCore.newState(r); clearTimeout(tool._sailTimer); tool._sailing = false; tool._boatAt = null; },
      check: function (tool) { var res = CreekMapCore.check(tool.st); tool._afterCheck(res); return res.ok; },
      hintKey: function (tool) { return CreekMapCore.hintKey(tool.st); }
    };
  },

  /* ---------------- render ---------------- */
  _t: function (key, args) { return String(this.api.t(key)).replace(/\{(\w+)\}/g, function (m, k) { return args && k in args ? args[k] : m; }); },
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this, C = CreekMapCore;
    var stage = api.stage;
    stage.innerHTML = '';
    if (!this.st) this.st = C.newState(C.rounds('to10', 'cm')[0]);
    var wrap = api.el('div', 'cm-wrap'); this._wrap = wrap;
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'cm-water'); svg.setAttribute('aria-hidden', 'true');
    wrap.appendChild(svg); this._svg = svg;
    var sign = api.el('div', 'cm-sign'); sign.setAttribute('role', 'img');
    sign.innerHTML = '<span class="cm-bar cm-bar-s"></span><span class="cm-bar cm-bar-t"></span>';
    wrap.appendChild(sign); this._sign = sign;
    this._buoys = []; this._dots = []; this._reeds = [];
    for (var k = 0; k < 2; k++) {
      var row = {}, drow = {}, rrow = {};
      ['left', 'right'].forEach(function (side) {
        var b = api.el('button', 'cm-buoy cm-buoy-' + side); b.type = 'button';
        b.innerHTML = '<span class="cm-n"></span>';
        (function (fk, sd) { b.addEventListener('click', function () { self._choose(fk, sd); }); })(k, side);
        wrap.appendChild(b); row[side] = b;
        var d = api.el('div', 'cm-dots'); d.setAttribute('aria-hidden', 'true'); wrap.appendChild(d); drow[side] = d;
        var r = api.el('div', 'cm-reeds'); r.setAttribute('aria-hidden', 'true');
        r.innerHTML = '<i></i><i></i><i></i><i></i><i></i>';
        wrap.appendChild(r); rrow[side] = r;
      });
      this._buoys.push(row); this._dots.push(drow); this._reeds.push(rrow);
    }
    var boat = api.el('div', 'cm-boat'); boat.setAttribute('aria-hidden', 'true'); wrap.appendChild(boat); this._boat = boat;
    var friend = api.el('div', 'cm-friend'); friend.setAttribute('aria-hidden', 'true'); wrap.appendChild(friend); this._friend = friend;
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _layout: function () {
    var L = this._L = CreekMapCore.layout(this._width()), w = this._wrap;
    ['wide', 'stack'].forEach(function (m) { w.classList.toggle('is-' + m, L.mode === m); });
    w.style.height = L.H + 'px';
    w.style.setProperty('--cm-boat', L.boat + 'px');
    w.style.setProperty('--cm-buoy', L.buoy + 'px');
    this._drawWater();
  },
  _chanPath: function (k, side) {
    var L = this._L, t = L.forkTop[k], F = L.F, x = L.chanX[side];
    return 'M' + L.cx + ',' + t + ' C' + L.cx + ',' + (t + F * 0.18) + ' ' + x + ',' + (t + F * 0.08) + ' ' + x + ',' + (t + F * 0.28) +
      ' L' + x + ',' + (t + F * 0.72) + ' C' + x + ',' + (t + F * 0.92) + ' ' + L.cx + ',' + (t + F * 0.82) + ' ' + L.cx + ',' + (t + F);
  },
  _drawWater: function () {
    var L = this._L, svg = this._svg, chanW = L.chanW, streamW = L.chanW;
    svg.setAttribute('viewBox', '0 0 ' + L.W + ' ' + L.H); svg.setAttribute('width', L.W); svg.setAttribute('height', L.H);
    var h = '';
    h += '<rect x="0" y="0" width="' + L.W + '" height="' + L.H + '" rx="18" fill="#DCEFC8"/>';
    var water = function (d, w, cls) { return '<path class="' + cls + '" d="' + d + '" fill="none" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>'; };
    h += water('M' + L.cx + ',0 L' + L.cx + ',' + L.S, streamW, 'cm-w');
    for (var k = 0; k < 2; k++) { h += water(this._chanPath(k, 'left'), chanW, 'cm-w'); h += water(this._chanPath(k, 'right'), chanW, 'cm-w'); }
    var pondTop = L.S + 2 * L.F;
    h += '<ellipse class="cm-pond" cx="' + L.cx + '" cy="' + (pondTop + L.P / 2) + '" rx="' + Math.round(L.W * 0.3) + '" ry="' + Math.round(L.P * 0.44) + '"/>';
    /* the islands between the two channels of each fork */
    var iw = Math.max(20, 2 * L.d - L.chanW);
    for (var i = 0; i < 2; i++) {
      var ty = L.forkTop[i] + L.F * 0.22, ih = L.F * 0.56;
      h += '<rect class="cm-island" x="' + (L.cx - iw / 2) + '" y="' + ty + '" width="' + iw + '" height="' + ih + '" rx="' + Math.min(iw / 2, 36) + '"/>';
    }
    /* the planned route (filled in by _paint) */
    h += '<g class="cm-route"></g>';
    svg.innerHTML = h;
    this._routeG = svg.querySelector('.cm-route');
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
  _pic: function (theme, noun) {
    var th = this._themes[theme];
    if (!th || !th.nouns[noun]) return null;
    var img = LCSPictures.img(th, noun, this.api.lang, { plural: false });
    img.alt = ''; img.setAttribute('aria-hidden', 'true'); img.setAttribute('data-noun', noun);
    return img;
  },
  _place: function (el, x, y, size) { el.style.left = Math.round(x - size / 2) + 'px'; el.style.top = Math.round(y - size / 2) + 'px'; },
  _boatTo: function (x, y) { var s = this._L.boat; this._boat.style.transform = 'translate(' + Math.round(x - s / 2) + 'px,' + Math.round(y - s / 2) + 'px)'; this._boatAt = [x, y]; },
  _restPos: function () {
    var st = this.st, L = this._L, C = CreekMapCore, k = C.stuckAt(st);
    if (st.done) return [L.cx - Math.round(L.W * 0.08), L.pondY];
    if (k >= 0) return [L.boatX[st.route[k]], L.stuckY[k]];
    return [L.cx, L.startY];
  },

  _paint: function () {
    var st = this.st, C = CreekMapCore, L = this._L, self = this;
    var w = this._wrap, stuck = C.stuckAt(st), dots = C.dotsAt(st);
    w.classList.toggle('is-done', st.done);
    /* the sign: two bars, the tall one lit for "bigger", the short one for "smaller" */
    this._sign.classList.toggle('rule-big', st.rule === 'bigger');
    this._sign.classList.toggle('rule-small', st.rule === 'smaller');
    this._sign.setAttribute('aria-label', this._t(st.rule === 'bigger' ? 'signBig' : 'signSmall'));
    for (var k = 0; k < 2; k++) {
      ['left', 'right'].forEach(function (side) {
        var b = self._buoys[k][side], n = st.forks[k][side === 'left' ? 0 : 1];
        self._place(b, L.buoyX[side], L.buoyY[k], L.buoy);
        b.querySelector('.cm-n').textContent = String(n);
        b.setAttribute('aria-label', self._t('buoyAria', { f: k + 1, n: n }));
        b.setAttribute('aria-pressed', String(st.route[k] === side));
        b.classList.toggle('is-on', st.route[k] === side);
        b.classList.toggle('is-stuck', stuck === k);
        b.disabled = st.done;
        var d = self._dots[k][side], showDots = dots === k;
        d.hidden = !showDots;
        if (showDots) {
          var s = '';
          for (var i = 0; i < n; i++) s += '<i></i>';
          d.innerHTML = s;
          d.style.left = Math.round(L.buoyX[side] - (L.mode === 'wide' ? 33 : 21)) + 'px';
          d.style.top = Math.round(L.buoyY[k] + L.buoy / 2 + 6) + 'px';
        }
        var r = self._reeds[k][side];
        r.classList.toggle('is-on', stuck === k && st.route[k] === side && !self._sailing);
        r.style.left = Math.round(L.boatX[side] - L.boat * 0.55) + 'px';
        r.style.top = Math.round(L.forkTop[k] + L.F * 0.82) + 'px';
        r.style.width = Math.round(L.boat * 1.1) + 'px';
      });
    }
    /* the planned route: a dashed line along each chosen channel */
    var route = '';
    for (var j = 0; j < 2; j++) if (st.route[j]) route += '<path d="' + this._chanPath(j, st.route[j]) + '" class="cm-rt"/>';
    this._routeG.innerHTML = route;
    /* the boat and the friend */
    var bimg = this._boat.querySelector('img');
    if (!bimg) { bimg = this._pic(C.BOAT.theme, C.BOAT.noun); if (bimg) this._boat.appendChild(bimg); }
    var fimg = this._friend.querySelector('img');
    if (fimg && fimg.getAttribute('data-noun') !== st.friend) { fimg.remove(); fimg = null; }
    if (!fimg) { fimg = this._pic(C.FRIEND_THEME, st.friend); if (fimg) this._friend.appendChild(fimg); }
    this._place(this._friend, L.cx + Math.round(L.W * 0.3) + Math.round(L.friend / 2) - 6, L.pondY - 4, L.friend);
    this._friend.classList.toggle('is-happy', st.done && !this._sailing);
    if (!this._sailing) { var p = this._restPos(); this._boat.style.transition = 'none'; this._boatTo(p[0], p[1]); }
  },

  /* ---------------- the hand ---------------- */
  _choose: function (fork, side) {
    if (this._sailing) return;
    if (!CreekMapCore.choose(this.st, fork, side)) return;
    this.api.sound(480 + 60 * fork);
    this._paint();
    this.api.track('choose', { fork: fork, side: side });
  },
  /* the voyage: from the source down the chosen channels; into the reeds at a wrong fork, or on to the pond */
  _sail: function () {
    var st = this.st, L = this._L, C = CreekMapCore, self = this, plan = C.sail(st), legs = [];
    var k;
    for (k = 0; k < plan.forks; k++) {
      var x = L.boatX[st.route[k]], t = L.forkTop[k];
      legs.push([x, t + L.F * 0.3]);
      if (C.stuckAt(st) === k) { legs.push([x, L.stuckY[k]]); break; }
      legs.push([x, t + L.F * 0.72]); legs.push([L.cx, t + L.F]);
    }
    if (plan.pond) legs.push([L.cx - Math.round(L.W * 0.08), L.pondY]);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    clearTimeout(this._sailTimer);
    if (reduce || !legs.length) { this._sailing = false; this._paint(); return; }
    this._sailing = true;
    this._boat.style.transition = 'none'; this._boatTo(L.cx, L.startY); void this._boat.offsetHeight;
    this._paint();
    var go = function (i) {
      if (!self._wrap || !self._wrap.isConnected || self.st !== st) return;
      if (i >= legs.length) {
        self._sailing = false; self._paint();
        if (!st.done) { bounce(self._boat, 'cm-bump'); self.api.sound(220); } else { bounce(self._friend, 'cm-hop'); self.api.sound(720); }
        return;
      }
      self._boat.style.transition = 'transform ' + self.SAIL_MS + 'ms ease-in-out';
      self._boatTo(legs[i][0], legs[i][1]);
      self._sailTimer = setTimeout(function () { go(i + 1); }, self.SAIL_MS + 20);
    };
    go(0);
  },
  _afterCheck: function (res) {
    var st = this.st;
    if (res.slip === 'none' || res.slip === 'incomplete') { this._paint(); return; }
    if (res.ok) this.api.sound(660); else this.api.sound(300);
    this._sail();
    this.api.track('check', { id: st.id, ok: res.ok, stuck: res.stuck, misses: st.misses });
  }
};

function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var cmCssDone = false;
function injectCreekMapCSS() {
  if (cmCssDone || typeof document === 'undefined') return;
  cmCssDone = true;
  var css = ''
  + '.cm-wrap{position:relative;width:100%;--cm-boat:96px;--cm-buoy:64px;}'
  + '.cm-water{position:absolute;left:0;top:0;display:block;}'
  + '.cm-w{stroke:#8FD0E3;} .cm-pond{fill:#8FD0E3;stroke:#6DBBD3;stroke-width:3;} .cm-island{fill:#DCEFC8;stroke:#B5D69A;stroke-width:3;}'
  + '.cm-rt{fill:none;stroke:#fff;stroke-width:5;stroke-dasharray:2 12;stroke-linecap:round;opacity:.95;}'
  /* the sign: a little board with a short bar and a tall bar; the bar for the rule is lit */
  + '.cm-sign{position:absolute;left:10px;top:10px;display:flex;align-items:flex-end;gap:6px;padding:8px 10px 6px;border-radius:10px;background:#FFF6E2;box-shadow:inset 0 0 0 3px #C9A46A,0 3px 6px rgba(0,0,0,.12);}'
  + '.cm-sign::after{content:"";position:absolute;left:50%;bottom:-14px;width:5px;height:14px;margin-left:-2px;background:#9C7A44;border-radius:2px;}'
  + '.cm-bar{display:block;width:16px;border-radius:4px;background:#D8CDB8;} .cm-bar-s{height:16px;} .cm-bar-t{height:40px;}'
  + '.cm-sign.rule-big .cm-bar-t,.cm-sign.rule-small .cm-bar-s{background:#F2B21C;box-shadow:0 0 0 3px rgba(242,178,28,.35);}'
  + '.cm-wrap.is-stack .cm-sign{left:6px;top:6px;padding:6px 7px 4px;gap:4px;} .cm-wrap.is-stack .cm-bar{width:11px;} .cm-wrap.is-stack .cm-bar-s{height:11px;} .cm-wrap.is-stack .cm-bar-t{height:28px;}'
  /* the buoys: the numbers are the buttons */
  + '.cm-buoy{position:absolute;width:var(--cm-buoy);height:var(--cm-buoy);border-radius:50%;border:0;padding:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;background:radial-gradient(circle at 35% 30%,#fff 0 55%,#F4EEE2 56%);box-shadow:inset 0 0 0 5px #E4572E,0 4px 8px rgba(30,60,80,.25);display:flex;align-items:center;justify-content:center;z-index:2;transition:box-shadow .15s;}'
  + '.cm-n{font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--cm-buoy) * .5);line-height:1;color:#2A2A35;}'
  + '.cm-buoy.is-on{box-shadow:inset 0 0 0 5px #146B5E,0 0 0 5px rgba(20,107,94,.35),0 4px 10px rgba(30,60,80,.3);}'
  + '.cm-buoy.is-stuck::after{content:"";position:absolute;inset:-9px;border-radius:50%;border:3px dashed #E4572E;}'
  + '.cm-buoy:disabled{cursor:default;} .cm-buoy:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:4px;}'
  /* the dots under a buoy at miss 2 */
  + '.cm-dots{position:absolute;display:grid;grid-template-columns:repeat(5,11px);gap:3px;width:66px;z-index:2;} .cm-dots[hidden]{display:none;}'
  + '.cm-dots i{display:block;width:11px;height:11px;border-radius:50%;background:#2A2A35;}'
  + '.cm-wrap.is-stack .cm-dots{grid-template-columns:repeat(5,7px);gap:2px;width:43px;} .cm-wrap.is-stack .cm-dots i{width:7px;height:7px;}'
  /* the reeds that stop the boat at a wrong fork */
  + '.cm-reeds{position:absolute;height:26px;display:none;justify-content:space-around;align-items:flex-end;z-index:1;}'
  + '.cm-reeds.is-on{display:flex;} .cm-reeds i{display:block;width:6px;height:24px;border-radius:3px 3px 1px 1px;background:#5E8C3A;} .cm-reeds i:nth-child(even){height:18px;background:#7AA84E;}'
  /* the boat and the friend: library pictures */
  + '.cm-boat{position:absolute;left:0;top:0;width:var(--cm-boat);height:var(--cm-boat);z-index:3;pointer-events:none;will-change:transform;}'
  + '.cm-boat img,.cm-friend img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 3px 2px rgba(20,40,40,.22));}'
  + '.cm-friend{position:absolute;width:var(--cm-boat);height:var(--cm-boat);z-index:2;pointer-events:none;}'
  + '.cm-boat.cm-bump img{animation:cm-bump .45s ease 1;} @keyframes cm-bump{0%,100%{transform:none;}25%{transform:translateX(-6px) rotate(-6deg);}60%{transform:translateX(5px) rotate(4deg);}}'
  + '.cm-friend.cm-hop img{animation:cm-hop .6s var(--lcs-ease) 2;} @keyframes cm-hop{0%,100%{transform:none;}40%{transform:translateY(-14px);}}'
  + '@media (prefers-reduced-motion:reduce){.cm-boat{transition:none!important;}.cm-boat img,.cm-friend img{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'cm-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = CreekMapActivity;
if (typeof window !== 'undefined') window.CreekMapActivity = CreekMapActivity;
