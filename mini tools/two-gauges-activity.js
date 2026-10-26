/* =====================================================================
   two-gauges-activity.js — ACTIVITY #89 of the one-by-one rebuild:
   "Fixit's Fix-It Corner" → THE TWO GAUGES (1.OA.D.8, 11 locales).
   Design sheet: docs/activities-rebuild/designs/089-fix-it-corner.md
   ---------------------------------------------------------------------
   THE INVENTION: every broken gadget has two gauges, one for each side of
   the equals sign. The child puts one number in the socket and pulls the
   lever: each needle sweeps its side term by term (coral, then teal; a
   take-away runs the needle BACK), and the gadget runs only when both
   needles stop on the same number — then they turn gold, the "=" plate
   lights and the grey gadget floods into colour. Too much bonks the stop
   pin; a mismatch lights the gap between where each needle stands and
   where the other side reads. Nothing shows what the socket does before
   the lever; no hint prints the answer.
   ACTIVITY LAYER ONLY: the model is two-gauges-core.js; the gadgets are
   library pictures via lcs-pictures.js; lcs-shell.js untouched (the shell's
   Check is hidden and pressed by this activity when the gadget runs).
   Test seams: window.TwoGaugesActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var TwoGaugesActivity = {
  id: 'two-gauges',
  apparatusClasses: ['tg-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Fixit’s Fix-It Corner',de:'Fixits Reparatur-Ecke',nl:'Fixits Reparatiehoekje',da:'Fixits reparationshjørne',sv:'Fixits reparationshörna',no:'Fixits reparasjonshjørne',es:'El rincón de arreglos de Fixit',it:'Il banco delle riparazioni di Fixit',pt:'O cantinho de conserto do Fixit',fr:'Le coin réparation de Fixit',fi:'Fixitin korjausnurkka'},
    pSum:        {en:'{a} and {b} — how many in all?',de:'{a} und {b} – wie viele sind das zusammen?',nl:'{a} en {b} — hoeveel samen?',da:'{a} og {b} – hvor mange er det i alt?',sv:'{a} och {b} – hur många blir det tillsammans?',no:'{a} og {b} – hvor mange er det til sammen?',es:'{a} y {b}, ¿cuántos son en total?',it:'{a} e {b} — quanti in tutto?',pt:'{a} e {b}, quantos são no total?',fr:'{a} et {b} — combien ça fait en tout ?',fi:'{a} ja {b} – kuinka monta yhteensä?'},
    pAdd2:       {en:'{a} and how many more make {c}?',de:'{a} und wie viele mehr ergeben {c}?',nl:'{a} plus hoeveel is {c}?',da:'{a} og hvor mange mere giver {c}?',sv:'{a} och hur många till blir {c}?',no:'{a} og hvor mange til blir {c}?',es:'¿{a} y cuántos más hacen {c}?',it:'{a} e quanti ancora per fare {c}?',pt:'{a} e mais quantos dão {c}?',fr:'{a} et combien de plus pour faire {c} ?',fi:'{a} ja kuinka monta lisää on {c}?'},
    pMake10:     {en:'Make the right side exactly 10!',de:'Mach die rechte Seite genau 10!',nl:'Maak de rechterkant precies 10!',da:'Gør højre side præcis 10!',sv:'Gör högra sidan till exakt 10!',no:'Gjør høyre side til nøyaktig 10!',es:'¡Haz que el lado derecho sea justo 10!',it:'Fai arrivare il lato destro esattamente a 10!',pt:'Faça o lado direito dar exatamente 10!',fr:'Fais que le côté droit fasse exactement 10 !',fi:'Tee oikeasta puolesta tasan 10!'},
    pAdd1:       {en:'What plus {b} makes {c}?',de:'Was plus {b} ergibt {c}?',nl:'Wat plus {b} is {c}?',da:'Hvad plus {b} giver {c}?',sv:'Vad plus {b} blir {c}?',no:'Hva pluss {b} blir {c}?',es:'¿Qué número más {b} es {c}?',it:'Quanto più {b} fa {c}?',pt:'Que número mais {b} dá {c}?',fr:'Combien plus {b} font {c} ?',fi:'Mikä plus {b} on {c}?'},
    pSub:        {en:'{a} take away how many leaves {c}?',de:'Wie viele nimmst du von {a} weg, damit {c} übrig bleiben?',nl:'{a}, hoeveel haal je eraf zodat er {c} overblijven?',da:'Tag hvor mange væk fra {a}, så der er {c} tilbage?',sv:'Ta bort hur många från {a} så att {c} blir kvar?',no:'Ta bort hvor mange fra {a}, så det blir {c} igjen?',es:'De {a}, ¿cuántos quitas para que queden {c}?',it:'Parti da {a}: quanti ne togli per arrivare a {c}?',pt:'De {a}, tirando quantos sobram {c}?',fr:'{a}, on en enlève combien pour qu’il reste {c} ?',fi:'Montako otetaan pois luvusta {a}, jotta jää {c}?'},
    pMin:        {en:'What number, take away {b}, leaves {c}?',de:'Nimm {b} weg, dann bleibt {c} – womit hast du angefangen?',nl:'Haal {b} eraf, dan blijven er {c} over — waarmee begon je?',da:'Tag {b} væk, så er der {c} tilbage – hvad startede du med?',sv:'Ta bort {b}, kvar blir {c} – vad började du med?',no:'Ta bort {b}, så er det {c} igjen – hva begynte du med?',es:'Quitas {b}, quedan {c}: ¿con cuántos empezaste?',it:'Togli {b}, rimane {c} — da quale numero parti?',pt:'Tirando {b}, sobram {c} — começou com quantos?',fr:'Enlève {b}, il reste {c} — on part de combien ?',fi:'Otetaan pois {b}, jää {c} – mistä aloitit?'},
    pDiff:       {en:'{a} take away {b} — how many are left?',de:'{a}, nimm {b} weg – wie viele bleiben übrig?',nl:'{a}, haal {b} eraf — hoeveel blijven er over?',da:'{a}, tag {b} væk – hvor mange er der tilbage?',sv:'{a}, ta bort {b} – hur många blir kvar?',no:'{a}, ta bort {b} – hvor mange er igjen?',es:'{a}, quitas {b}: ¿cuántos quedan?',it:'{a}, togli {b} — quanti ne restano?',pt:'{a}, tirando {b}, quantos sobram?',fr:'{a}, on enlève {b} — combien en reste-t-il ?',fi:'{a}, otetaan pois {b} – montako jää?'},
    pBal:        {en:'Make both sides match.',de:'Mach beide Seiten gleich.',nl:'Maak beide kanten gelijk.',da:'Gør begge sider lige store.',sv:'Gör båda sidorna lika.',no:'Gjør begge sidene like.',es:'Equilibra los dos lados.',it:'Fai combaciare i due lati.',pt:'Deixe os dois lados iguais.',fr:'Rends les deux côtés égaux.',fi:'Tee molemmista puolista yhtä suuret.'},
    pChain:      {en:'What makes the whole row {c}?',de:'Welche Zahl fehlt, damit die ganze Reihe {c} ergibt?',nl:'Welk getal maakt de hele rij samen {c}?',da:'Hvilket tal gør, at hele rækken giver {c}?',sv:'Vilket tal gör att hela raden blir {c}?',no:'Hvilket tall gjør at hele rekka blir {c}?',es:'¿Qué número hace que toda la fila dé {c}?',it:'Quale numero fa arrivare tutta la fila a {c}?',pt:'Que número faz a fila toda dar {c}?',fr:'Quel nombre fait que toute la rangée donne {c} ?',fi:'Mikä luku puuttuu, jotta koko rivin summa on {c}?'},
    hEmpty:      {en:'Pop a number in the empty socket first.',de:'Setz zuerst eine Zahl in das leere Feld.',nl:'Zet eerst een getal in het lege vakje.',da:'Sæt først et tal i det tomme felt.',sv:'Sätt först ett tal i den tomma rutan.',no:'Sett først et tall i den tomme ruta.',es:'Primero pon un número en la casilla vacía.',it:'Prima metti un numero nella casella vuota.',pt:'Primeiro coloque um número no quadradinho vazio.',fr:'Mets d’abord un nombre dans la case vide.',fi:'Laita ensin luku tyhjään ruutuun.'},
    hGap:        {en:'The needles don’t agree. Look at the gap.',de:'Die Zeiger zeigen nicht auf dieselbe Zahl. Schau dir den Abstand an.',nl:'De wijzers wijzen niet naar hetzelfde getal. Kijk naar het verschil.',da:'Viserne peger ikke på det samme tal. Se på afstanden.',sv:'Visarna pekar inte på samma tal. Titta på mellanrummet.',no:'Viserne peker ikke på samme tall. Se på mellomrommet.',es:'Las agujas no marcan lo mismo. Mira el espacio entre ellas.',it:'Le lancette non segnano lo stesso numero. Guarda lo spazio in mezzo.',pt:'Os ponteiros não marcam o mesmo número. Veja a distância entre eles.',fr:'Les aiguilles n’indiquent pas le même nombre. Regarde l’écart.',fi:'Osoittimet eivät näytä samaa lukua. Katso väliä.'},
    hPin:        {en:'Whoa — that went right off the dial!',de:'Hoppla – das ging über die Skala hinaus!',nl:'Oei — die ging helemaal van de schaal af!',da:'Hov – den røg helt ud over skalaen!',sv:'Oj – den åkte rakt ut från skalan!',no:'Oi – den gikk rett ut av skalaen!',es:'¡Uy, eso se salió de la escala!',it:'Ops, è uscita dalla scala!',pt:'Opa, isso passou da escala!',fr:'Oh là là, ça sort du cadran !',fi:'Hups – se meni yli asteikon!'},
    hSteps:      {en:'Count the steps from {k} to {target}.',de:'Zähl die Schritte von {k} bis {target}.',nl:'Tel de stapjes van {k} tot {target}.',da:'Tæl skridtene fra {k} til {target}.',sv:'Räkna stegen från {k} till {target}.',no:'Tell stegene fra {k} til {target}.',es:'Cuenta los pasos de {k} a {target}.',it:'Conta i passi da {k} a {target}.',pt:'Conte os passos de {k} até {target}.',fr:'Compte les pas de {k} à {target}.',fi:'Laske askeleet luvusta {k} lukuun {target}.'},
    hOn:         {en:'Start at {a} and count on {b}.',de:'Fang bei {a} an und zähl {b} weiter.',nl:'Begin bij {a} en tel {b} verder.',da:'Start ved {a} og tæl {b} videre.',sv:'Börja på {a} och räkna vidare {b} steg.',no:'Start på {a} og tell {b} videre.',es:'Empieza en {a} y cuenta {b} más.',it:'Parti da {a} e conta avanti di {b}.',pt:'Comece no {a} e conte mais {b}.',fr:'Pars de {a} et compte {b} de plus.',fi:'Aloita luvusta {a} ja laske {b} eteenpäin.'},
    hBoth:       {en:'Both gauges must read {n}.',de:'Beide Anzeigen müssen {n} zeigen.',nl:'Beide meters moeten {n} aanwijzen.',da:'Begge målere skal vise {n}.',sv:'Båda mätarna ska visa {n}.',no:'Begge målerne må vise {n}.',es:'Los dos medidores tienen que marcar {n}.',it:'Tutti e due i quadranti devono segnare {n}.',pt:'Os dois mostradores têm que marcar {n}.',fr:'Les deux cadrans doivent indiquer {n}.',fi:'Molempien mittarien pitää näyttää {n}.'},
    okRun:       {en:'{eq} — it works!',de:'{eq} – es läuft!',nl:'{eq} — hij doet het!',da:'{eq} – den virker!',sv:'{eq} – den fungerar!',no:'{eq} – den virker!',es:'{eq}: ¡funciona!',it:'{eq}: funziona!',pt:'{eq}: funcionou!',fr:'{eq} — ça marche !',fi:'{eq} – se toimii!'},
    okBal:       {en:'{eq} — both sides make {s}!',de:'{eq} – beide Seiten ergeben {s}!',nl:'{eq} — beide kanten maken {s}!',da:'{eq} – begge sider giver {s}!',sv:'{eq} – båda sidorna blir {s}!',no:'{eq} – begge sidene blir {s}!',es:'{eq}: ¡los dos lados valen {s}!',it:'{eq}: tutti e due i lati fanno {s}!',pt:'{eq}: os dois lados dão {s}!',fr:'{eq} — les deux côtés font {s} !',fi:'{eq} – kummallakin puolella on {s}!'},
    okAll:       {en:'Every gadget is fixed!',de:'Alle Geräte sind repariert!',nl:'Alle apparaten zijn gerepareerd!',da:'Alle apparater er repareret!',sv:'Alla apparater är lagade!',no:'Alle apparatene er reparert!',es:'¡Todos los aparatos están arreglados!',it:'Tutti gli apparecchi sono aggiustati!',pt:'Todos os aparelhos estão consertados!',fr:'Tous les appareils sont réparés !',fi:'Kaikki laitteet on korjattu!'},
    lever:       {en:'Pull the lever',de:'Hebel ziehen',nl:'Trek aan de hendel',da:'Træk i håndtaget',sv:'Dra i spaken',no:'Trekk i spaken',es:'Jala la palanca',it:'Tira la leva',pt:'Puxe a alavanca',fr:'Tire le levier',fi:'Vedä vivusta'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    n10:         {en:'To 10',de:'Bis 10',nl:'Tot 10',da:'Op til 10',sv:'Upp till 10',no:'Til 10',es:'Hasta 10',it:'Fino a 10',pt:'Até 10',fr:'Jusqu’à 10',fi:'10 asti'},
    n20:         {en:'To 20',de:'Bis 20',nl:'Tot 20',da:'Op til 20',sv:'Upp till 20',no:'Til 20',es:'Hasta 20',it:'Fino a 20',pt:'Até 20',fr:'Jusqu’à 20',fi:'20 asti'},
    nBig:        {en:'To 100',de:'Bis 100',nl:'Tot 100',da:'Op til 100',sv:'Upp till 100',no:'Til 100',es:'Hasta 100',it:'Fino a 100',pt:'Até 100',fr:'Jusqu’à 100',fi:'100 asti'},
    setPath:     {en:'Counting path',de:'Zählweg',nl:'Telpad',da:'Tællesti',sv:'Räknestig',no:'Tellesti',es:'Camino para contar',it:'Percorso per contare',pt:'Caminho de contagem',fr:'Chemin de comptage',fi:'Laskupolku'},
    pathHelp:    {en:'Only as a help',de:'Nur als Hilfe',nl:'Alleen als hulp',da:'Kun som hjælp',sv:'Bara som hjälp',no:'Bare som hjelp',es:'Solo como ayuda',it:'Solo come aiuto',pt:'Só como ajuda',fr:'Seulement comme aide',fi:'Vain apuna'},
    pathAlways:  {en:'Always',de:'Immer',nl:'Altijd',da:'Altid',sv:'Alltid',no:'Alltid',es:'Siempre',it:'Sempre',pt:'Sempre',fr:'Toujours',fi:'Aina'},
    ariaSocket:  {en:'Missing number: {v}',de:'Fehlende Zahl: {v}',nl:'Ontbrekend getal: {v}',da:'Manglende tal: {v}',sv:'Talet som fattas: {v}',no:'Tallet som mangler: {v}',es:'Número que falta: {v}',it:'Numero mancante: {v}',pt:'Número que falta: {v}',fr:'Nombre manquant : {v}',fi:'Puuttuva luku: {v}'},
    ariaSocketEmpty:{en:'Missing number, empty',de:'Fehlende Zahl, leer',nl:'Ontbrekend getal, leeg',da:'Manglende tal, tomt',sv:'Talet som fattas, tomt',no:'Tallet som mangler, tomt',es:'Número que falta, vacío',it:'Numero mancante, vuoto',pt:'Número que falta, vazio',fr:'Nombre manquant, vide',fi:'Puuttuva luku, tyhjä'},
    ariaTensUp:  {en:'Tens up',de:'Zehner mehr',nl:'Tiental meer',da:'Tiere op',sv:'Tiotal upp',no:'Tiere opp',es:'Decenas arriba',it:'Decine su',pt:'Dezenas para cima',fr:'Dizaines plus',fi:'Kymmeniä ylös'},
    ariaTensDown:{en:'Tens down',de:'Zehner weniger',nl:'Tiental minder',da:'Tiere ned',sv:'Tiotal ner',no:'Tiere ned',es:'Decenas abajo',it:'Decine giù',pt:'Dezenas para baixo',fr:'Dizaines moins',fi:'Kymmeniä alas'},
    ariaOnesUp:  {en:'Ones up',de:'Einer mehr',nl:'Eenheid meer',da:'Enere op',sv:'Ental upp',no:'Enere opp',es:'Unidades arriba',it:'Unità su',pt:'Unidades para cima',fr:'Unités plus',fi:'Ykkösiä ylös'},
    ariaOnesDown:{en:'Ones down',de:'Einer weniger',nl:'Eenheid minder',da:'Enere ned',sv:'Ental ner',no:'Enere ned',es:'Unidades abajo',it:'Unità giù',pt:'Unidades para baixo',fr:'Unités moins',fi:'Ykkösiä alas'},
    ariaLeft:    {en:'Left gauge',de:'Linke Anzeige',nl:'Linkermeter',da:'Venstre måler',sv:'Vänster mätare',no:'Venstre måler',es:'Medidor izquierdo',it:'Quadrante sinistro',pt:'Mostrador esquerdo',fr:'Cadran gauche',fi:'Vasen mittari'},
    ariaRight:   {en:'Right gauge',de:'Rechte Anzeige',nl:'Rechtermeter',da:'Højre måler',sv:'Höger mätare',no:'Høyre måler',es:'Medidor derecho',it:'Quadrante destro',pt:'Mostrador direito',fr:'Cadran droit',fi:'Oikea mittari'},
    ariaGauge:   {en:'{side}: {n}. Tap to watch it again.',de:'{side}: {n}. Tippen, um es noch einmal zu sehen.',nl:'{side}: {n}. Tik om het nog eens te zien.',da:'{side}: {n}. Tryk for at se det igen.',sv:'{side}: {n}. Tryck för att se det igen.',no:'{side}: {n}. Trykk for å se det igjen.',es:'{side}: {n}. Toca para verlo otra vez.',it:'{side}: {n}. Tocca per rivederlo.',pt:'{side}: {n}. Toque para ver de novo.',fr:'{side} : {n}. Touche pour revoir.',fi:'{side}: {n}. Napauta, niin näet uudelleen.'},
    ariaRead:    {en:'Left side {l}, right side {r}.',de:'Linke Seite {l}, rechte Seite {r}.',nl:'Linkerkant {l}, rechterkant {r}.',da:'Venstre side {l}, højre side {r}.',sv:'Vänster sida {l}, höger sida {r}.',no:'Venstre side {l}, høyre side {r}.',es:'Lado izquierdo {l}, lado derecho {r}.',it:'Lato sinistro {l}, lato destro {r}.',pt:'Lado esquerdo {l}, lado direito {r}.',fr:'Côté gauche {l}, côté droit {r}.',fi:'Vasen puoli {l}, oikea puoli {r}.'}
  },/*STRINGS-END*/

  defaults: { numbers: '20', path: 'help' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '10', labelKey: 'n10' }, { value: '20', labelKey: 'n20' }, { value: 'big', labelKey: 'nBig' }] },
    { key: 'path', type: 'choice', labelKey: 'setPath', options: [{ value: 'help', labelKey: 'pathHelp' }, { value: 'always', labelKey: 'pathAlways' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._gadgets = null; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._anim = null; this._pad = false; this._typed = ''; this._typedAt = 0;
    injectGaugeCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') ['kitchen tools', 'toys', 'around the house'].forEach(function (dir) { LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected && !self._anim) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._stopAnim(); this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return TwoGaugesCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return TwoGaugesCore.levelOf(this._setting('numbers')); },
  _key: function () { return this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TwoGaugesCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TwoGaugesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._gadgets = p.gadgets; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], g = this._gadgets[pos], self = this, pa = { msg: '' }; this._pa = pa;
    pa.msg = this._promptText(C.round(this._level(), idx));
    return {
      id: 'gauges.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, g, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) { var p = TwoGaugesCore.prompt(r); return this._t(p.key, p.args); },
  _start: function (idx, g, pos) {
    var C = TwoGaugesCore;
    this._stopAnim(); this._clearTimers(); this._view = {}; this._busy = false; this._pad = false; this._typed = '';
    this.st = C.newState(C.round(this._level(), idx));
    this._gadget = (g == null ? idx : g) % C.DATA.GADGETS.length; this._pos = pos || 0;
    var line = this._promptText(this.st.r); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(0, 0, 0);
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
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._anim) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'tg-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="tg-top"><span class="tg-gadget"></span><p class="tg-note" aria-live="polite"></p></div>'
      + '<div class="tg-panel"><div class="tg-gauges"></div><div class="tg-strip"></div><div class="tg-input"></div></div><div class="tg-foot"></div><div class="tg-shelf" aria-hidden="true"></div>';
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
    this._q = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _pic: function (dir, key, size, cls) {
    var th = this._pics[dir]; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = cls; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  /* the trail segments a side's needle runs: one per term, coral / teal / gold (a single number: grey) */
  _segs: function (terms, top) {
    var C = TwoGaugesCore, sw = C.sweep(terms, top), out = [];
    for (var i = 1; i < sw.stops.length; i++) out.push({ from: sw.stops[i - 1], to: sw.stops[i], c: terms.length === 1 ? 'g' : ['c', 't', 'y'][Math.min(2, i - 1)] });
    return { segs: out, reading: sw.reading, pin: sw.pin };
  },
  /* what each gauge shows now: { reading, segs, pin } per side, or the animation's frame */
  _gaugeState: function () {
    var C = TwoGaugesCore, st = this.st, r = st.r;
    if (this._anim) return this._anim.now;
    if (st.run) { var s = C.sides(r, st.value); return { L: this._segs(s.L, r.top), R: this._segs(s.R, r.top) }; }
    var rest = C.rest(r), out = {};
    ['L', 'R'].forEach(function (k) { out[k] = rest[k] == null ? { segs: [], reading: 0, pin: null } : this._segs(k === 'L' ? r.L : r.R, r.top); }, this);
    return out;
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = TwoGaugesCore, st = this.st, r = st.r, W = this._width(), L = C.layout(W), v = this._view, self = this;
    this._L = L;
    this._wrap.className = 'tg-wrap ' + (L.narrow ? 'is-narrow' : 'is-wide') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.panel;
    /* ---- the gadget on the bench ---- */
    var gp = this._q('.tg-gadget'), gd = C.DATA.GADGETS[this._gadget], size = L.narrow ? 72 : 120;
    gp.innerHTML = ''; gp.style.width = gp.style.height = size + 'px';
    var im = this._pic(gd[0], gd[1], size, 'tg-gimg' + (st.done ? ' is-fixed' : '') + (v.sputter ? ' is-sputter' : '')); if (im) gp.appendChild(im);
    if (st.done && !this.FAST) gp.insertAdjacentHTML('beforeend', '<span class="tg-steam" aria-hidden="true"><i></i><i></i><i></i></span>');
    /* ---- the gauges ---- */
    this._paintGauges(L);
    /* ---- the strip ---- */
    this._paintStrip(L);
    /* ---- the socket input (pad or drums) + the lever ---- */
    this._paintInput(L);
    /* ---- the shelf ---- */
    var shelf = this._q('.tg-shelf'), n = this._pool ? this._pool.length : C.ids(this._level()).length, have = this._pos + (st.done ? 1 : 0), h = '';
    for (var i = 0; i < n; i++) h += '<svg class="tg-gear' + (i < have ? ' is-on' : '') + '" viewBox="0 0 24 24"><path d="' + GEAR + '"/></svg>';
    shelf.innerHTML = h;
    /* ---- the note ---- */
    var note = this._q('.tg-note'), hk = this._anim ? null : C.hint(st), t = '', cls = 'tg-note';
    if (v.msg) { t = v.msg; cls += ' is-ok'; }
    else if (hk) { t = this._t(hk.key, hk.args); cls += ' is-hint'; }
    note.className = cls; note.textContent = t;
  },
  _paintGauges: function (L) {
    var C = TwoGaugesCore, st = this.st, r = st.r, box = this._q('.tg-gauges'), gs = this._gaugeState(), self = this, D = L.gauge;
    var judged = !!st.run && !this._anim, matched = judged && st.run.ok;
    var always = this._setting('path') === 'always' && !st.run && (r.kind === 'addend' || r.kind === 'subtrahend' || r.kind === 'balance');
    var help = judged && !st.done && st.show >= 2, path = (help || always) ? C.countPath(r) : null;
    box.innerHTML = '';
    ['L', 'R'].forEach(function (side, k) {
      var g = gs[side], other = gs[side === 'L' ? 'R' : 'L'];
      var b = self.api.el('button', 'tg-gauge' + (matched ? ' is-match' : '')); b.type = 'button'; b.setAttribute('data-k', 'gauge-' + side);
      b.setAttribute('aria-label', self._t('ariaGauge', { side: self._t(side === 'L' ? 'ariaLeft' : 'ariaRight'), n: g.reading }));
      b.disabled = !judged || !!self._busy;
      b.innerHTML = gaugeSVG({ D: D, top: r.top, g: g, gap: judged && !st.done ? other.reading : null, gold: matched, path: path && path.side === side ? { from: path.from, to: path.to, numbered: help } : null, tremble: judged && !st.done && g.reading > other.reading, big: r.level === 'big' });
      b.addEventListener('click', function () { self._replay(side); });
      box.appendChild(b);
      if (k === 0) { var pl = self.api.el('span', 'tg-plate' + (matched ? ' is-gold' : '')); pl.textContent = '='; pl.style.width = pl.style.height = L.plate + 'px'; box.appendChild(pl); }
    });
  },
  _paintStrip: function (L) {
    var C = TwoGaugesCore, st = this.st, r = st.r, box = this._q('.tg-strip'), self = this;
    box.innerHTML = '';
    var group = function (terms, side) {
      var g = self.api.el('div', 'tg-side'); if (!L.narrow) g.style.minWidth = L.gauge + 'px';   /* (on a phone the sides size to their chips: the chain is five wide) */
      terms.forEach(function (t, i) {
        if (i) { var op = self.api.el('span', 'tg-op' + (r.panel === 'chain' ? ' is-arrow' : '')); op.textContent = t.op === '-' ? '−' : '+'; g.appendChild(op); }
        if (r.socket.side === side && r.socket.index === i) {
          var s = self.api.el('button', 'tg-socket' + (st.value == null ? ' is-empty' : '') + (self._view.pulse ? ' is-pulse' : '') + (self._pad ? ' is-open' : '')); s.type = 'button'; s.setAttribute('data-k', 'socket');
          s.textContent = st.value == null ? '?' : String(st.value);
          s.setAttribute('aria-label', st.value == null ? self._t('ariaSocketEmpty') : self._t('ariaSocket', { v: st.value }));
          s.setAttribute('aria-expanded', self._pad ? 'true' : 'false');
          s.disabled = st.done || !!self._busy;
          s.addEventListener('click', function () { self._togglePad(); });
          g.appendChild(s);
        } else { var c = self.api.el('span', 'tg-chip'); c.textContent = String(t.n); g.appendChild(c); }
      });
      return g;
    };
    box.appendChild(group(r.L, 'L'));
    var eq = this.api.el('span', 'tg-eq'); eq.textContent = '='; eq.style.width = L.plate + 'px'; box.appendChild(eq);
    box.appendChild(group(r.R, 'R'));
  },
  _paintInput: function (L) {
    var C = TwoGaugesCore, st = this.st, r = st.r, box = this._q('.tg-input'), foot = this._q('.tg-foot'), self = this;
    box.innerHTML = ''; foot.innerHTML = '';
    var big = r.level === 'big';
    if (!st.done && (this._pad || big)) {
      if (big) {
        var tens = st.value == null ? 0 : Math.floor(st.value / 10), ones = st.value == null ? 0 : st.value % 10;
        var drum = function (label, val, up, down, kUp, kDown) {
          var d = self.api.el('div', 'tg-drum');
          var bu = self.api.el('button', 'tg-roll'); bu.type = 'button'; bu.setAttribute('data-k', kUp); bu.textContent = '▲'; bu.setAttribute('aria-label', self._t(up)); bu.disabled = !!self._busy; bu.addEventListener('click', function () { self._roll(kUp); });
          var face = self.api.el('span', 'tg-digit'); face.textContent = String(val);
          var bd = self.api.el('button', 'tg-roll'); bd.type = 'button'; bd.setAttribute('data-k', kDown); bd.textContent = '▼'; bd.setAttribute('aria-label', self._t(down)); bd.disabled = !!self._busy; bd.addEventListener('click', function () { self._roll(kDown); });
          if (L.narrow) { d.appendChild(bd); d.appendChild(face); d.appendChild(bu); } else { d.appendChild(bu); d.appendChild(face); d.appendChild(bd); } return d;   /* a phone lays each drum flat: ▼ digit ▲ */
        };
        var drums = this.api.el('div', 'tg-drums');
        drums.appendChild(drum('t', tens, 'ariaTensUp', 'ariaTensDown', 'tens-up', 'tens-down'));
        drums.appendChild(drum('o', ones, 'ariaOnesUp', 'ariaOnesDown', 'ones-up', 'ones-down'));
        box.appendChild(drums);
      } else {
        var pad = this.api.el('div', 'tg-pad');
        for (var n = 1; n <= r.vmax; n++) (function (n) {
          var k = self.api.el('button', 'tg-key' + (st.value === n ? ' is-on' : '')); k.type = 'button'; k.setAttribute('data-k', 'key-' + n); k.textContent = String(n);
          k.disabled = !!self._busy; k.addEventListener('click', function () { self._set(n, true); }); pad.appendChild(k);
        })(n);
        box.appendChild(pad);
      }
    }
    if (!st.done) {
      var lv = this.api.el('button', 'tg-lever' + (this._view.pulled ? ' is-pulled' : '')); lv.type = 'button'; lv.setAttribute('data-k', 'lever');
      lv.innerHTML = '<span class="tg-knob" aria-hidden="true"></span><span>' + this._t('lever') + '</span>';
      lv.disabled = !!this._busy; lv.addEventListener('click', function () { self._pull(); });
      foot.appendChild(lv);
    }
  },

  /* ---------------- actions ---------------- */
  _togglePad: function () {
    if (this._busy || this.st.done || this.st.r.level === 'big') return;
    this._pad = !this._pad; this.api.sound(this._pad ? 600 : 420); this._paint();
    var k = this._pad && this._q('.tg-key'); if (k && k.focus) k.focus();
  },
  _set: function (n, close) {
    if (this._busy || !TwoGaugesCore.setValue(this.st, n)) { if (close) { this._pad = false; this._paint(); } return; }
    if (close) this._pad = false;
    this._view = {}; this.api.sound(520); this._paint();
    if (close) { var s = this._q('[data-k="socket"]'); if (s && s.focus) s.focus(); }
  },
  _roll: function (k) {
    if (this._busy || this.st.done) return;
    var v = this.st.value == null ? 0 : this.st.value, t = Math.floor(v / 10), o = v % 10;
    if (k === 'tens-up') t = (t + 1) % 10; else if (k === 'tens-down') t = (t + 9) % 10; else if (k === 'ones-up') o = (o + 1) % 10; else o = (o + 9) % 10;
    var nv = t * 10 + o;
    this.api.sound(560);
    if (nv === 0) { this.st.value = null; this.st.show = 0; this.st.last = null; this.st.run = null; this._view = {}; this._paint(); return; }   /* 00 = an empty socket (no answer is 0) */
    TwoGaugesCore.setValue(this.st, nv); this._view = {}; this._paint();
  },
  _key_: function (e) {
    var k = e.key, st = this.st;
    if (/^[0-9]$/.test(k) && !st.done && st.r.level !== 'big') {
      var now = Date.now(); this._typed = (now - this._typedAt < 900 ? this._typed : '') + k; this._typedAt = now;
      var n = +this._typed; if (n > st.r.vmax || this._typed.length > 2) { this._typed = k; n = +k; }
      if (n >= 1) this._set(n, false);
      e.preventDefault(); return;
    }
    if (k === 'Enter' && e.target && e.target.getAttribute && e.target.getAttribute('data-k') === 'socket' && st.value != null && !this._pad) { e.preventDefault(); this._pull(); return; }
    if ((k === 'g' || k === 'G')) { e.preventDefault(); this._replay('L'); }
    else if ((k === 'h' || k === 'H')) { e.preventDefault(); this._replay('R'); }
    else if (st.r.level === 'big' && (k === 'ArrowUp' || k === 'ArrowDown')) { e.preventDefault(); this._roll(k === 'ArrowUp' ? 'ones-up' : 'ones-down'); }
  },
  _pull: function () {
    var C = TwoGaugesCore, st = this.st, self = this, r = st.r;
    if (this._busy || st.done) return;
    this._pad = false;
    var res = C.pull(st); if (!res) return;
    if (res.reason === 'empty') { this._view = { pulse: true }; this.api.sound(200); this._paint(); this.api.announce(this._q('.tg-note').textContent || ''); return; }
    this._view = { pulled: true }; this.api.sound(300);
    var s = C.sides(r, st.value), plan = { L: this._segs(s.L, r.top), R: this._segs(s.R, r.top) };
    this._animate(plan, r.level === 'big' ? 12 : 70, function () {
      var ok = res.ok;
      if (ok) {
        var eq = C.text(r, st.value), last = self._pos === (self._pool ? self._pool.length : 9) - 1;
        self._view = { msg: r.kind === 'balance' ? self._t('okBal', { eq: eq, s: res.L.reading }) : self._t('okRun', { eq: eq }) };
        if (last) self._view.msg += ' ' + self._t('okAll');
        self.api.sound(880);
      } else { self._view = { sputter: true }; self.api.sound(res.pin ? 160 : 220); }
      self._paint();
      self.api.announce((self._q('.tg-note').textContent || '') + ' ' + self._t('ariaRead', { l: res.L.reading, r: res.R.reading }));
      if (ok) self._advance(self._view.msg.length * 60 + 2400);
    });
  },
  /* the sweep: both needles at once, term by term; FAST jumps to the end */
  _stopAnim: function () { if (this._anim && this._anim.raf && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(this._anim.raf); this._anim = null; this._busy = false; },
  _animate: function (plan, msPer, done, only) {
    var self = this;
    if (this.FAST || typeof requestAnimationFrame === 'undefined' || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)) { done(); return; }
    var timeline = {}, total = 0;
    ['L', 'R'].forEach(function (k) {
      var t = 0, segs = plan[k].segs.map(function (s, i) { var d = Math.abs(s.to - s.from) * msPer, o = { s: s, t0: t + (i ? 150 : 0), dur: d }; t = o.t0 + d; return o; });
      timeline[k] = segs; total = Math.max(total, t);
    });
    var scale = total > 2200 && msPer < 300 ? 2200 / total : 1, t0 = null;
    this._busy = true;
    this._anim = { now: { L: { segs: [], reading: 0, pin: null }, R: { segs: [], reading: 0, pin: null } } };
    if (only) this._anim.now[only === 'L' ? 'R' : 'L'] = plan[only === 'L' ? 'R' : 'L'];
    var step = function (ts) {
      if (!self._anim) return;
      if (t0 == null) t0 = ts;
      var el = (ts - t0) / scale, fin = true;
      ['L', 'R'].forEach(function (k) {
        if (only && k !== only) return;
        var segs = [], reading = 0;
        timeline[k].forEach(function (o) {
          if (el <= o.t0) { fin = false; return; }
          var f = o.dur ? Math.min(1, (el - o.t0) / o.dur) : 1; if (f < 1) fin = false;
          var at = o.s.from + (o.s.to - o.s.from) * f; segs.push({ from: o.s.from, to: at, c: o.s.c }); reading = at;
        });
        self._anim.now[k] = { segs: segs, reading: segs.length ? reading : 0, pin: null };
      });
      self._paintGauges(self._L || TwoGaugesCore.layout(self._width()));
      if (fin) { self._anim = null; self._busy = false; done(); }
      else self._anim.raf = requestAnimationFrame(step);
    };
    this._paintInput(this._L || TwoGaugesCore.layout(this._width()));
    this._anim.raf = requestAnimationFrame(step);
  },
  /* tap a gauge after a run: its needle sweeps again, slowly */
  _replay: function (side) {
    var C = TwoGaugesCore, st = this.st, self = this;
    if (this._busy || !st.run) return;
    var s = C.sides(st.r, st.value), plan = { L: this._segs(s.L, st.r.top), R: this._segs(s.R, st.r.top) };
    this.api.sound(500);
    this._animate(plan, 300, function () { self._paint(); }, side);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var GEAR = 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm9 4.6v-2.2l-2.4-.5a6.9 6.9 0 0 0-.8-1.9l1.4-2-1.6-1.6-2 1.4a6.9 6.9 0 0 0-1.9-.8L13.1 3h-2.2l-.5 2.4a6.9 6.9 0 0 0-1.9.8l-2-1.4-1.6 1.6 1.4 2a6.9 6.9 0 0 0-.8 1.9L3 10.9v2.2l2.4.5c.2.7.4 1.3.8 1.9l-1.4 2 1.6 1.6 2-1.4c.6.4 1.2.6 1.9.8l.5 2.4h2.2l.5-2.4c.7-.2 1.3-.4 1.9-.8l2 1.4 1.6-1.6-1.4-2c.4-.6.6-1.2.8-1.9z';
/* one gauge: the face, the ticks and numerals, the two pins, the trail, the counting path, the gap, the needle */
function gaugeSVG(o) {
  var D = o.D, c = D / 2, R = c - 5, top = o.top, ang = function (v) { return (135 + 270 * v / top) * Math.PI / 180; };
  var pt = function (v, rr) { var a = ang(v); return [c + rr * Math.cos(a), c + rr * Math.sin(a)]; };
  var f = function (x) { return x.toFixed(1); };
  var arc = function (v1, v2, rr) { if (Math.abs(v2 - v1) < 1e-6) return ''; var a = pt(v1, rr), b = pt(v2, rr), large = Math.abs(v2 - v1) / top * 270 > 180 ? 1 : 0, sw = v2 > v1 ? 1 : 0; return 'M' + f(a[0]) + ' ' + f(a[1]) + 'A' + f(rr) + ' ' + f(rr) + ' 0 ' + large + ' ' + sw + ' ' + f(b[0]) + ' ' + f(b[1]); };
  var s = '<svg class="tg-svg" width="' + D + '" height="' + D + '" viewBox="0 0 ' + D + ' ' + D + '" aria-hidden="true"><circle cx="' + c + '" cy="' + c + '" r="' + R + '" class="tg-face"/>';
  var fs = Math.max(11, Math.round(D * 0.085)), every = top === 10 ? 1 : top === 20 ? 5 : 10;
  for (var v = 0; v <= top; v++) {
    var major = v % every === 0, mid = !major && top === 100 && v % 5 === 0;
    if (top === 100 && !major && !mid && D < 150) continue;
    var a1 = pt(v, R - 3), a2 = pt(v, R - (major ? 13 : mid ? 9 : 6));
    s += '<line x1="' + f(a1[0]) + '" y1="' + f(a1[1]) + '" x2="' + f(a2[0]) + '" y2="' + f(a2[1]) + '" class="tg-tick' + (major ? ' is-major' : '') + '"/>';
    if (major) { var p = pt(v, R - 13 - fs * 0.62); s += '<text x="' + f(p[0]) + '" y="' + f(p[1] + fs * 0.36) + '" class="tg-num" font-size="' + fs + '">' + v + '</text>'; }
  }
  /* the pins: the zero pin just below 0, the stop pin just past the top */
  [[-7, 'zero'], [top, 'stop']].forEach(function (q) { var aa = (135 + (q[1] === 'zero' ? -7 : 277)) * Math.PI / 180, x = c + (R - 8) * Math.cos(aa), y = c + (R - 8) * Math.sin(aa); s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + Math.max(3, D * 0.022) + '" class="tg-pin' + (o.g.pin === q[1] ? ' is-hit' : '') + '"/>'; });
  /* the counting path: dots (numbered at miss 2) on the ticks AFTER the start */
  if (o.path) {
    /* the steps sit ON the tick ring; numbered inside their dots where the ticks are wide enough apart, else every k-th and the last */
    var dir = o.path.to >= o.path.from ? 1 : -1, n = Math.abs(o.path.to - o.path.from), rr = R - 8, pitch = rr * (270 / top) * Math.PI / 180;
    var every = pitch >= 13 ? 1 : Math.ceil(13 / pitch) <= 5 ? (Math.ceil(13 / pitch) <= 2 ? 2 : 5) : 10, dot = Math.max(2.5, Math.min(7.5, pitch * 0.46));
    for (var i = 1; i <= n; i++) {
      var vv = o.path.from + dir * i, q1 = pt(vv, rr), lab = o.path.numbered && (i % every === 0 || i === n);
      var lr = Math.min(7.5, Math.max(dot, pitch * every * 0.46));   /* a labelled dot never wider than the gap to the next label */
      s += '<circle cx="' + f(q1[0]) + '" cy="' + f(q1[1]) + '" r="' + f(lab ? lr : dot) + '" class="tg-step' + (o.path.numbered ? ' is-num' : '') + '"/>';
      if (lab) s += '<text x="' + f(q1[0]) + '" y="' + f(q1[1] + lr * 0.45) + '" class="tg-stepnum" font-size="' + f(Math.min(10, lr * (i >= 10 ? 1.15 : 1.35))) + '">' + i + '</text>';
    }
  }
  /* the trail: one coloured arc per term (a take-away runs back on an inner ring) */
  o.g.segs.forEach(function (sg) { var back = sg.to < sg.from; s += '<path d="' + arc(sg.from, sg.to, back ? R * 0.36 : R * 0.46) + '" class="tg-trail is-' + sg.c + '"/>'; });
  /* the gap: where the other side reads, and the arc between */
  if (o.gap != null && o.gap !== o.g.reading) {
    var gr = Math.max(0, Math.min(top, o.gap)), g1 = pt(gr, R - 2), g2 = pt(gr, R * 0.3);
    s += '<path d="' + arc(Math.min(gr, o.g.reading), Math.max(gr, o.g.reading), R * 0.56) + '" class="tg-gap"/>';
    s += '<line x1="' + f(g1[0]) + '" y1="' + f(g1[1]) + '" x2="' + f(g2[0]) + '" y2="' + f(g2[1]) + '" class="tg-ghost"/>';
  }
  /* the needle */
  var nd = (135 + 270 * Math.max(0, Math.min(top, o.g.reading)) / top);
  if (o.g.pin === 'zero') nd = 135 - 5; if (o.g.pin === 'stop') nd = 405 + 5;
  s += '<g class="tg-needle' + (o.gold ? ' is-gold' : '') + (o.tremble ? ' is-tremble' : '') + '" data-deg="' + nd.toFixed(1) + '" style="transform-origin:' + c + 'px ' + c + 'px;transform:rotate(' + nd.toFixed(2) + 'deg)"><line x1="' + c + '" y1="' + c + '" x2="' + f(c + R - 16) + '" y2="' + c + '"/><circle cx="' + c + '" cy="' + c + '" r="' + Math.max(5, D * 0.045) + '"/></g>';
  return s + '</svg>';
}

var tgCssDone = false;
function injectGaugeCSS() {
  if (tgCssDone || typeof document === 'undefined') return;
  tgCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tg-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.tg-top{display:flex;align-items:center;gap:14px;width:100%;max-width:640px;} .tg-gadget{position:relative;flex:none;display:block;}'
  + '.tg-gimg{display:block;filter:grayscale(1);opacity:.7;transition:filter .4s,opacity .4s;} .tg-gimg.is-fixed{filter:none;opacity:1;animation:tgWiggle .6s ease-out;} .tg-gimg.is-sputter{animation:tgShake .3s ease-in-out 1;}'
  + '@keyframes tgWiggle{25%{rotate:-6deg;}50%{rotate:5deg;}75%{rotate:-3deg;}} @keyframes tgShake{25%{translate:-3px 0;}75%{translate:3px 0;}}'
  + '.tg-steam{position:absolute;left:50%;top:-6px;} .tg-steam i{position:absolute;width:12px;height:12px;border-radius:50%;background:#E8E2D4;animation:tgPuff .9s ease-out forwards;} .tg-steam i:nth-child(2){left:12px;animation-delay:.15s;} .tg-steam i:nth-child(3){left:-12px;animation-delay:.3s;} @keyframes tgPuff{from{opacity:.9;transform:translateY(0) scale(.6);}to{opacity:0;transform:translateY(-26px) scale(1.4);}}'
  + '.tg-note{flex:1;min-height:1.4em;margin:0;padding:10px 14px;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #EADBC0;text-align:left;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;} .tg-note:empty{visibility:hidden;} .tg-note.is-hint{color:#B5461F;} .tg-note.is-ok{color:#146B5E;}'
  + '.tg-panel{display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px 10px;border-radius:18px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #3A2E1F22,inset 0 0 0 1px #3A2E1F;}'
  + '.tg-gauges{display:flex;align-items:center;justify-content:center;gap:6px;} .tg-gauge{padding:0;border:0;background:none;border-radius:50%;cursor:pointer;display:block;} .tg-gauge:disabled{cursor:default;} .tg-svg{display:block;}'
  + '.tg-face{fill:#FFFDF7;stroke:#3A2E1F;stroke-width:3;} .tg-tick{stroke:#8C7B63;stroke-width:1;} .tg-tick.is-major{stroke:#3A2E1F;stroke-width:2;} .tg-num{fill:#3A2E1F;text-anchor:middle;font-family:' + H + ';font-weight:800;}'
  + '.tg-pin{fill:#6E5A3A;} .tg-pin.is-hit{fill:#E0603A;}'
  + '.tg-trail{fill:none;stroke-width:6;stroke-linecap:round;} .tg-trail.is-c{stroke:#F2784B;} .tg-trail.is-t{stroke:#1E8A78;} .tg-trail.is-y{stroke:#D4A21E;} .tg-trail.is-g{stroke:#A79C8A;}'
  + '.tg-gap{fill:none;stroke:#F2784B;stroke-width:7;stroke-linecap:round;opacity:.55;} .tg-ghost{stroke:#B5461F;stroke-width:2;stroke-dasharray:4 3;}'
  + '.tg-step{fill:#FFFDF7;stroke:#7A5A33;stroke-width:1.2;stroke-dasharray:2 1.5;} .tg-step.is-num{fill:#FFE3B8;stroke:#D9822B;stroke-dasharray:none;} .tg-stepnum{fill:#B5461F;text-anchor:middle;font-family:' + H + ';font-weight:800;}'
  + '.tg-needle line{stroke:#1E8A78;stroke-width:4;stroke-linecap:round;} .tg-needle circle{fill:#0F5C4F;} .tg-needle.is-gold line{stroke:#D4A21E;} .tg-needle.is-gold circle{fill:#8A5A00;}'
  + '.tg-needle.is-tremble{animation:tgTremble .25s ease-in-out 2;} @keyframes tgTremble{50%{rotate:2deg;}}'
  + '.tg-plate{display:flex;align-items:center;justify-content:center;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F;font-family:' + H + ';font-weight:800;font-size:26px;color:#3A2E1F;flex:none;} .tg-plate.is-gold{background:#F4CF62;box-shadow:inset 0 0 0 3px #8A5A00;}'
  + '.tg-strip{display:flex;align-items:center;justify-content:center;gap:6px;} .tg-side{display:flex;align-items:center;justify-content:center;gap:4px;}'
  + '.tg-chip,.tg-socket{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:30px;color:#0F4A40;flex:none;} .tg-chip{background:#FFFDF7;box-shadow:inset 0 0 0 3px #1E8A78;}'
  + '.tg-socket{width:64px;height:64px;padding:0;border:0;cursor:pointer;background:#FFF6D6;box-shadow:inset 0 0 0 4px #D4A21E,inset 0 4px 0 6px #E8D6A0;color:#5A3D00;} .tg-socket.is-empty{color:#B08A2E;} .tg-socket.is-open{box-shadow:inset 0 0 0 4px #F2784B;} .tg-socket.is-pulse{animation:tgPulse .45s ease-in-out 2;} @keyframes tgPulse{50%{transform:scale(1.12);}}'
  + '.tg-op{font-family:' + H + ';font-weight:800;font-size:26px;color:#3A2E1F;min-width:14px;text-align:center;} .tg-op.is-arrow{display:flex;align-items:center;gap:1px;} .tg-op.is-arrow::before{content:"→";font-size:18px;color:#8C7B63;}'
  + '.tg-eq{display:flex;justify-content:center;font-family:' + H + ';font-weight:800;font-size:30px;color:#3A2E1F;flex:none;}'
  + '.tg-wrap.is-wall .tg-chip,.tg-wrap.is-wall .tg-socket{border-radius:4px;} .tg-wrap.is-wall .tg-chip{background:#F6E1C8;box-shadow:inset 0 0 0 3px #B5703A;} .tg-wrap.is-wall .tg-strip .tg-side:last-child{transform:translateY(-10px);}'
  + '.tg-input{display:flex;justify-content:center;} .tg-pad{display:grid;grid-template-columns:repeat(5,48px);gap:6px;} .tg-wrap.is-wide .tg-pad{grid-template-columns:repeat(10,48px);} .tg-wrap:focus{outline:none;} .tg-key{width:48px;height:48px;border:0;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #1E8A78,0 3px 0 #9CC9BE;font-family:' + H + ';font-weight:800;font-size:22px;color:#0F4A40;cursor:pointer;} .tg-key.is-on{background:#FFF6D6;box-shadow:inset 0 0 0 3px #D4A21E;}'
  + '.tg-drums{display:flex;gap:14px;} .tg-drum{display:flex;flex-direction:column;align-items:center;gap:4px;} .tg-roll{width:48px;height:44px;border:0;border-radius:10px;background:#1E8A78;color:#fff;font-size:18px;cursor:pointer;} .tg-digit{width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#FFF6D6;box-shadow:inset 0 0 0 3px #D4A21E;font-family:' + H + ';font-weight:800;font-size:30px;color:#5A3D00;}'
  + '.tg-foot{display:flex;justify-content:center;} .tg-lever{min-height:56px;padding:6px 20px 6px 10px;border:0;border-radius:16px;background:#FFF6D6;box-shadow:inset 0 0 0 3px #D4A21E,0 4px 0 #C79A3E;display:flex;align-items:center;gap:10px;font-family:' + H + ';font-weight:800;font-size:19px;color:#5A3D00;cursor:pointer;}'
  + '.tg-knob{width:34px;height:34px;border-radius:50%;background:#F2784B;box-shadow:0 3px 0 #9C3A1C;transition:transform .15s;} .tg-lever.is-pulled .tg-knob{transform:translateY(6px);}'
  + '.tg-shelf{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;} .tg-gear{width:28px;height:28px;fill:none;stroke:#C9B48A;stroke-width:1.4;} .tg-gear.is-on{fill:#E8B53A;stroke:#8A5A00;}'
  + '.tg-wrap.is-done .tg-gear.is-on:last-of-type{animation:tgSpin 1s ease-out;} @keyframes tgSpin{to{rotate:360deg;}}'
  + '.tg-gauge:focus-visible,.tg-socket:focus-visible,.tg-key:focus-visible,.tg-roll:focus-visible,.tg-lever:focus-visible{outline:3px solid #146B5E;outline-offset:3px;} button:disabled{cursor:default;}'
  + '.tg-wrap.is-narrow .tg-top{gap:8px;} .tg-wrap.is-narrow .tg-note{font-size:16px;padding:8px 10px;} .tg-wrap.is-narrow .tg-panel{padding:8px 6px;}'
  + '.tg-wrap.is-narrow .tg-chip{width:44px;height:44px;font-size:24px;} .tg-wrap.is-narrow .tg-socket{width:52px;height:52px;font-size:26px;} .tg-wrap.is-narrow .tg-op,.tg-wrap.is-narrow .tg-eq{font-size:22px;} .tg-wrap.is-narrow .tg-plate{font-size:20px;}'
  + '.tg-wrap.is-tiny .tg-chip{width:36px;height:44px;font-size:20px;} .tg-wrap.is-tiny .tg-socket{width:46px;height:48px;font-size:22px;} .tg-wrap.is-tiny .tg-side{gap:2px;} .tg-wrap.is-tiny .tg-pad{grid-template-columns:repeat(5,44px);} .tg-wrap.is-tiny .tg-key{width:44px;height:44px;}'
  + '.tg-wrap.is-narrow .tg-drum{flex-direction:row;} .tg-wrap.is-narrow .tg-drums{gap:10px;} .tg-wrap.is-narrow .tg-op.is-arrow::before{content:none;} .tg-wrap.is-tiny .tg-roll{width:44px;} .tg-wrap.is-tiny .tg-digit{width:40px;}'
  + '.tg-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.tg-note,.tg-input,.tg-foot,.tg-shelf{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.tg-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'tg-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.TwoGaugesActivity = TwoGaugesActivity;
