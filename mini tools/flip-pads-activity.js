/* =====================================================================
   flip-pads-activity.js — ACTIVITY #141 of the one-by-one rebuild:
   "Hopper's Lily Hops" → THE FLIP PADS (2.NBT.A.2; all 11 locales).
   Model: flip-pads-core.js (FlipPadsCore).
   Design: docs/activities-rebuild/designs/141-skipcount.md
   ---------------------------------------------------------------------
   The invention: every lily pad shows its number on split-flaps. The
   empty pad arrives as a copy of the pad before it, and the child flips
   it forward by one hop — a hop of ten flips only the tens flap — and
   the flaps never carry: past 9 the child flips the next flap. A wrong
   pad stretches the leap meter ("+1" beside Hopper's "+5"); a second
   miss lines the pad before up over the board with the hop under its
   place. Chains that start at their own step lie on a number line from
   a printed 0 tick, each pad carrying its equal group. Find-the-hop
   rounds set Hopper's sign. No timer, no score.
   Test seams: window.FlipPadsActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._flip / ._check /
   .FAST / .OK_MS.
   ===================================================================== */
var FlipPadsActivity = {
  id: 'flip-pads',
  /* the drawn apparatus (the hierarchy gate): the pond, the pads, the flap board, the sign */
  apparatusClasses: ['fp-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Hopper's Lily Hops","de":"Hoppers Seerosen-Sprünge","fr":"Les bonds de Hopper sur les nénuphars","es":"Los brincos de Hopper","pt":"Os pulos do Hopper","it":"I salti di Hopper","nl":"Hoppers waterlelie-sprongen","sv":"Hoppers näckroshopp","da":"Hoppers åkandehop","no":"Hoppers vannliljehopp","fi":"Hopperin lumpeenloikat"},
    instruction: {"en":"Flip the empty lily pad by one hop. The flaps never carry: if a flap goes all the way round, flip the next flap yourself.","de":"Klapp das leere Seerosenblatt um einen Sprung weiter. Die Klappen denken nicht mit: Geht eine Klappe einmal ganz herum, klappst du die nächste Klappe selbst um.","fr":"Fais tourner les volets du nénuphar vide d’un bond. Les volets ne retiennent rien : si un volet fait le tour, tourne toi-même le volet suivant.","es":"Gira las paletas de la hoja vacía un brinco. Las paletas no llevan solas: si una paleta da la vuelta completa, gira tú la paleta siguiente.","pt":"Vire as plaquinhas da folha vazia até completar um pulo. Elas não fazem o “vai um” sozinhas: se uma plaquinha der a volta inteira, vire você a próxima plaquinha.","it":"Gira le palette della foglia vuota di un salto. Le palette non fanno il riporto da sole: se una paletta fa il giro completo, gira tu la paletta successiva.","nl":"Klap de klepjes van het lege blad één sprong verder. De klepjes onthouden niets: gaat een klepje helemaal rond, klap dan zelf het volgende klepje om.","sv":"Vänd luckorna på det tomma näckrosbladet ett hopp. Luckorna minns ingenting: när en lucka går ett helt varv vänder du själv nästa lucka.","da":"Vend klapperne på det tomme åkandeblad ét hop. Klapperne husker ingenting: når en klap går hele vejen rundt, vender du selv den næste klap.","no":"Snu klaffene på det tomme vannliljebladet ett hopp. Klaffene husker ingenting: når en klaff går hele veien rundt, snur du selv neste klaff.","fi":"Käännä tyhjän lumpeenlehden läppiä yhden loikan verran. Läpät eivät muista mitään: kun läppä pyörähtää kokonaan ympäri, käännä itse seuraava läppä."},
    pUp: {"en":"Count by {s}s. Flip the empty pad to the next number.","de":"Zähle in {s}er-Schritten weiter. Klapp das leere Blatt auf die nächste Zahl.","fr":"Compte de {s} en {s}. Tourne les volets du nénuphar vide jusqu’au nombre suivant.","es":"Cuenta de {s} en {s}. Gira la hoja vacía al número que sigue.","pt":"Conte de {s} em {s}. Vire a folha vazia até o próximo número.","it":"Conta di {s} in {s}. Gira la foglia vuota fino al numero successivo.","nl":"Tel verder in sprongen van {s}. Klap het lege blad naar het volgende getal.","sv":"Räkna {s} i taget. Vänd det tomma bladet till nästa tal.","da":"Tæl {s} ad gangen. Vend det tomme blad til det næste tal.","no":"Tell {s} om gangen. Snu det tomme bladet til neste tall.","fi":"Laske {s}:n välein. Käännä tyhjä lehti seuraavaan lukuun."},
    pDown: {"en":"Count back by {s}s. Flip the empty pad.","de":"Zähle rückwärts in {s}er-Schritten. Klapp das leere Blatt zurück.","fr":"Compte de {s} en {s} en reculant. Tourne les volets du nénuphar vide.","es":"Cuenta de {s} en {s} hacia atrás. Gira la hoja vacía.","pt":"Conte de {s} em {s} para trás. Vire a folha vazia.","it":"Conta di {s} in {s} all’indietro. Gira la foglia vuota.","nl":"Tel terug in sprongen van {s}. Klap het lege blad terug.","sv":"Räkna baklänges {s} i taget. Vänd det tomma bladet.","da":"Tæl baglæns {s} ad gangen. Vend det tomme blad.","no":"Tell baklengs {s} om gangen. Snu det tomme bladet.","fi":"Laske taaksepäin {s}:n välein. Käännä tyhjä lehti."},
    pHop: {"en":"How big is each hop? Flip Hopper's sign.","de":"Wie groß ist jeder Sprung? Stell Hoppers Schild ein.","fr":"De combien est chaque bond ? Règle le panneau de Hopper.","es":"¿De cuánto es cada brinco? Gira el letrero de Hopper.","pt":"De quanto é cada pulo? Vire a placa do Hopper.","it":"Di quanto è ogni salto? Gira il cartello di Hopper.","nl":"Hoe groot is elke sprong? Klap Hoppers bordje om.","sv":"Hur stort är varje hopp? Vänd Hoppers skylt.","da":"Hvor stort er hvert hop? Vend Hoppers skilt.","no":"Hvor stort er hvert hopp? Snu skiltet til Hopper.","fi":"Kuinka suuri jokainen loikka on? Käännä Hopperin kyltti."},
    hSame: {"en":"Flip it forward by one hop of {s}.","de":"Klapp es um einen Sprung von {s} weiter.","fr":"Avance-le d’un bond de {s}.","es":"Gírala hacia adelante un brinco de {s}.","pt":"Vire para a frente um pulo de {s}.","it":"Girala in avanti di un salto di {s}.","nl":"Klap het één sprong van {s} verder.","sv":"Vänd det framåt ett hopp på {s}.","da":"Vend det et hop på {s} frem.","no":"Snu det ett hopp på {s} fram.","fi":"Käännä sitä eteenpäin yhden {s}:n loikan verran."},
    hSameBack: {"en":"Flip it back by one hop of {s}.","de":"Klapp es um einen Sprung von {s} zurück.","fr":"Recule-le d’un bond de {s}.","es":"Gírala hacia atrás un brinco de {s}.","pt":"Vire para trás um pulo de {s}.","it":"Girala indietro di un salto di {s}.","nl":"Klap het één sprong van {s} terug.","sv":"Vänd det bakåt ett hopp på {s}.","da":"Vend det et hop på {s} tilbage.","no":"Snu det ett hopp på {s} tilbake.","fi":"Käännä sitä taaksepäin yhden {s}:n loikan verran."},
    hSign: {"en":"Flip Hopper's sign to the size of each hop.","de":"Stell Hoppers Schild auf die Größe eines Sprungs.","fr":"Règle le panneau de Hopper sur la taille d’un bond.","es":"Gira el letrero de Hopper al tamaño de cada brinco.","pt":"Vire a placa do Hopper até o tamanho de cada pulo.","it":"Gira il cartello di Hopper sulla misura di ogni salto.","nl":"Zet Hoppers bordje op de grootte van één sprong.","sv":"Vänd Hoppers skylt till storleken på ett hopp.","da":"Vend Hoppers skilt til størrelsen på ét hop.","no":"Snu skiltet til Hopper til størrelsen på ett hopp.","fi":"Käännä Hopperin kyltti yhden loikan kokoiseksi."},
    missMeter: {"en":"Hopper hops {hop}. Your hop is {made}.","de":"Hopper springt {hop}. Dein Sprung ist {made}.","fr":"Hopper fait des bonds de {hop}. Ton bond fait {made}.","es":"Hopper brinca {hop}. Tu brinco es de {made}.","pt":"O Hopper pula {hop}. O seu pulo foi de {made}.","it":"Hopper salta {hop}. Il tuo salto è {made}.","nl":"Hopper springt {hop}. Jouw sprong is {made}.","sv":"Hopper hoppar {hop}. Ditt hopp är {made}.","da":"Hopper hopper {hop}. Dit hop er {made}.","no":"Hopper hopper {hop}. Hoppet ditt er {made}.","fi":"Hopper loikkaa {hop}. Sinun loikkasi on {made}."},
    miss2Up: {"en":"Look at them lined up: {prev} and {s} more.","de":"Schau sie dir untereinander an: {prev} und {s} dazu.","fr":"Regarde-les l’un sous l’autre : {prev} et encore {s}.","es":"Míralos uno debajo del otro: {prev} y {s} más.","pt":"Veja um embaixo do outro: {prev} e mais {s}.","it":"Guardali in colonna: {prev} e ancora {s}.","nl":"Bekijk ze onder elkaar: {prev} en {s} erbij.","sv":"Titta på dem under varandra: {prev} och {s} till.","da":"Se dem under hinanden: {prev} og {s} mere.","no":"Se på dem under hverandre: {prev} og {s} til.","fi":"Katso niitä allekkain: {prev} ja vielä {s}."},
    miss2Down: {"en":"Look at them lined up: {prev} take away {s}.","de":"Schau sie dir untereinander an: {prev} und {s} weg.","fr":"Regarde-les l’un sous l’autre : {prev} moins {s}.","es":"Míralos uno debajo del otro: {prev} menos {s}.","pt":"Veja um embaixo do outro: {prev} menos {s}.","it":"Guardali in colonna: {prev} meno {s}.","nl":"Bekijk ze onder elkaar: {prev} en {s} eraf.","sv":"Titta på dem under varandra: {prev} minus {s}.","da":"Se dem under hinanden: {prev} minus {s}.","no":"Se på dem under hverandre: {prev} minus {s}.","fi":"Katso niitä allekkain: {prev} miinus {s}."},
    missHop: {"en":"From one pad to the next, how much does the number change?","de":"Von einem Blatt zum nächsten: Um wie viel ändert sich die Zahl?","fr":"D’un nénuphar au suivant, de combien le nombre change-t-il ?","es":"De una hoja a la siguiente, ¿cuánto cambia el número?","pt":"De uma folha para a próxima, quanto o número muda?","it":"Da una foglia alla successiva, di quanto cambia il numero?","nl":"Van het ene blad naar het volgende: hoeveel verandert het getal?","sv":"Från ett blad till nästa: hur mycket ändras talet?","da":"Fra ét blad til det næste: hvor meget ændrer tallet sig?","no":"Fra ett blad til det neste: hvor mye endrer tallet seg?","fi":"Lehdeltä seuraavalle: kuinka paljon luku muuttuu?"},
    missHopSign: {"en":"Right size! But look which way the numbers go and flip the sign.","de":"Die Größe stimmt! Aber schau, in welche Richtung die Zahlen gehen, und dreh das Zeichen um.","fr":"La taille est juste ! Mais regarde dans quel sens vont les nombres et change le signe.","es":"¡El tamaño está bien! Pero mira hacia dónde van los números y cambia el signo.","pt":"O tamanho está certo! Mas veja para onde os números vão e troque o sinal.","it":"La misura è giusta! Ma guarda in che direzione vanno i numeri e cambia il segno.","nl":"De grootte klopt! Maar kijk welke kant de getallen op gaan en draai het teken om.","sv":"Rätt storlek! Men se åt vilket håll talen går och vänd tecknet.","da":"Størrelsen passer! Men se, hvilken vej tallene går, og vend tegnet.","no":"Størrelsen stemmer! Men se hvilken vei tallene går, og snu tegnet.","fi":"Koko on oikein! Mutta katso, mihin suuntaan luvut menevät, ja käännä merkki."},
    miss2Hop: {"en":"Look at them lined up: from {a} to {b}.","de":"Schau sie dir untereinander an: von {a} nach {b}.","fr":"Regarde-les l’un sous l’autre : de {a} à {b}.","es":"Míralos uno debajo del otro: de {a} a {b}.","pt":"Veja um embaixo do outro: de {a} até {b}.","it":"Guardali in colonna: da {a} a {b}.","nl":"Bekijk ze onder elkaar: van {a} naar {b}.","sv":"Titta på dem under varandra: från {a} till {b}.","da":"Se dem under hinanden: fra {a} til {b}.","no":"Se på dem under hverandre: fra {a} til {b}.","fi":"Katso niitä allekkain: luvusta {a} lukuun {b}."},
    okHop: {"en":"{prev}, {next} — that's one hop of {s}!","de":"{prev}, {next} – das ist ein Sprung von {s}!","fr":"{prev}, {next} : c’est un bond de {s} !","es":"¡{prev}, {next}: es un brinco de {s}!","pt":"{prev}, {next}: é um pulo de {s}!","it":"{prev}, {next}: è un salto di {s}!","nl":"{prev}, {next}: dat is één sprong van {s}!","sv":"{prev}, {next} – det är ett hopp på {s}!","da":"{prev}, {next} – det er ét hop på {s}!","no":"{prev}, {next} – det er ett hopp på {s}!","fi":"{prev}, {next} – se on yksi {s}:n loikka!"},
    okList: {"en":"{list} … counting by {s}s!","de":"{list} … in {s}er-Schritten!","fr":"{list} … de {s} en {s} !","es":"¡{list} … de {s} en {s}!","pt":"{list} … de {s} em {s}!","it":"{list} … di {s} in {s}!","nl":"{list} … in sprongen van {s}!","sv":"{list} … {s} i taget!","da":"{list} … {s} ad gangen!","no":"{list} … {s} om gangen!","fi":"{list} … {s}:n välein!"},
    okListBack: {"en":"{list} … counting back by {s}s!","de":"{list} … rückwärts in {s}er-Schritten!","fr":"{list} … de {s} en {s} en reculant !","es":"¡{list} … de {s} en {s} hacia atrás!","pt":"{list} … de {s} em {s} para trás!","it":"{list} … di {s} in {s} all’indietro!","nl":"{list} … terug in sprongen van {s}!","sv":"{list} … baklänges {s} i taget!","da":"{list} … baglæns {s} ad gangen!","no":"{list} … baklengs {s} om gangen!","fi":"{list} … taaksepäin {s}:n välein!"},
    okSign: {"en":"Every hop is {sign}{s}!","de":"Jeder Sprung ist {sign}{s}!","fr":"Chaque bond fait {sign}{s} !","es":"¡Cada brinco es de {sign}{s}!","pt":"Cada pulo é de {sign}{s}!","it":"Ogni salto è {sign}{s}!","nl":"Elke sprong is {sign}{s}!","sv":"Varje hopp är {sign}{s}!","da":"Hvert hop er {sign}{s}!","no":"Hvert hopp er {sign}{s}!","fi":"Jokainen loikka on {sign}{s}!"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setBy: {"en":"Count by","de":"Schrittweite","fr":"Compter de","es":"Contar de","pt":"Contar de","it":"Contare di","nl":"Tellen met","sv":"Räkna","da":"Tæl","no":"Tell","fi":"Laske"},
    by5: {"en":"5, 10, 100","de":"5, 10, 100","fr":"5, 10, 100","es":"5, 10, 100","pt":"5, 10, 100","it":"5, 10, 100","nl":"5, 10, 100","sv":"5, 10, 100","da":"5, 10, 100","no":"5, 10, 100","fi":"5, 10, 100"},
    by2: {"en":"2, 3, 4","de":"2, 3, 4","fr":"2, 3, 4","es":"2, 3, 4","pt":"2, 3, 4","it":"2, 3, 4","nl":"2, 3, 4","sv":"2, 3, 4","da":"2, 3, 4","no":"2, 3, 4","fi":"2, 3, 4"},
    by25: {"en":"25, 50, 100","de":"25, 50, 100","fr":"25, 50, 100","es":"25, 50, 100","pt":"25, 50, 100","it":"25, 50, 100","nl":"25, 50, 100","sv":"25, 50, 100","da":"25, 50, 100","no":"25, 50, 100","fi":"25, 50, 100"},
    setDir: {"en":"Direction","de":"Richtung","fr":"Sens","es":"Dirección","pt":"Direção","it":"Direzione","nl":"Richting","sv":"Riktning","da":"Retning","no":"Retning","fi":"Suunta"},
    dBoth: {"en":"Up and down","de":"Vorwärts und rückwärts","fr":"En avançant et en reculant","es":"Hacia adelante y hacia atrás","pt":"Para a frente e para trás","it":"In avanti e all’indietro","nl":"Vooruit en achteruit","sv":"Framåt och bakåt","da":"Frem og tilbage","no":"Fram og tilbake","fi":"Eteen ja taakse"},
    dUp: {"en":"Up only","de":"Nur vorwärts","fr":"Seulement en avançant","es":"Solo hacia adelante","pt":"Só para a frente","it":"Solo in avanti","nl":"Alleen vooruit","sv":"Bara framåt","da":"Kun frem","no":"Bare fram","fi":"Vain eteenpäin"},
    aFwd: {"en":"Flip the {place} flap forward","de":"{place}-Klappe vorwärts klappen","fr":"Avancer le volet des {place}","es":"Girar hacia adelante la paleta de las {place}","pt":"Virar para a frente a plaquinha das {place}","it":"Gira in avanti la paletta delle {place}","nl":"Klap het klepje van de {place} vooruit","sv":"Vänd luckan för {place} framåt","da":"Vend klappen for {place} frem","no":"Snu klaffen for {place} fram","fi":"Käännä {place} eteenpäin"},
    aBack: {"en":"Flip the {place} flap back","de":"{place}-Klappe zurückklappen","fr":"Reculer le volet des {place}","es":"Girar hacia atrás la paleta de las {place}","pt":"Virar para trás a plaquinha das {place}","it":"Gira indietro la paletta delle {place}","nl":"Klap het klepje van de {place} terug","sv":"Vänd luckan för {place} bakåt","da":"Vend klappen for {place} tilbage","no":"Snu klaffen for {place} tilbake","fi":"Käännä {place} taaksepäin"},
    aSign: {"en":"Turn the sign","de":"Zeichen umdrehen","fr":"Changer le signe","es":"Cambiar el signo","pt":"Trocar o sinal","it":"Cambia il segno","nl":"Draai het teken om","sv":"Vänd tecknet","da":"Vend tegnet","no":"Snu tegnet","fi":"Käännä merkki"},
    pOnes: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykkösten läppä"},
    pTens: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmenten läppä"},
    pHundreds: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"satojen läppä"},
    pThousands: {"en":"thousands","de":"Tausender","fr":"milliers","es":"unidades de millar","pt":"unidades de milhar","it":"migliaia","nl":"duizendtallen","sv":"tusental","da":"tusinder","no":"tusener","fi":"tuhansien läppä"},
  },/*STRINGS-END*/
  defaults: { by: '5', dir: 'both' },
  settings: [
    { key: 'by', type: 'choice', labelKey: 'setBy', options: [{ value: '5', labelKey: 'by5' }, { value: '2', labelKey: 'by2' }, { value: '25', labelKey: 'by25' }] },
    { key: 'dir', type: 'choice', labelKey: 'setDir', options: [{ value: 'both', labelKey: 'dBoth' }, { value: 'up', labelKey: 'dUp' }] }
  ],
  OK_MS: 500, FAST: false, NEXT_BUD_MS: 650,
  FROG: 'pets/frog',
  MINUS: '−',

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {};
    injectFlipPadsCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _by: function () { return FlipPadsCore.setOf(this._setting('by')); },
  _dir: function () { return FlipPadsCore.dirOf(this._setting('dir')); },
  _key: function () { return this._by() + '|' + this._dir(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = FlipPadsCore.rounds(this._by(), this._dir()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = FlipPadsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._by(), this._dir(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'flip-pads.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* a signed number with a true minus sign */
  _signed: function (n) { return (n < 0 ? this.MINUS : '+') + Math.abs(n); },
  _taskLine: function () {
    var st = this.st; if (!st) return '';
    var s = Math.abs(FlipPadsCore.stepOf(st.rd));
    if (st.hop) return this._t('pHop');
    return this._t(FlipPadsCore.isDown(st.rd) ? 'pDown' : 'pUp', { s: s });
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = FlipPadsCore.newState(this._by(), this._dir(), k);
    this._view = { note: '', ok: '', opened: null };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth();
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _dims: function () { var W = this._width(), B = FlipPadsCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'fp-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="fp-pond fp-art"></div><div class="fp-show"></div><div class="fp-ladder"></div><div class="fp-deck"><div class="fp-board fp-art"></div><div class="fp-tally" aria-hidden="true"></div></div><p class="fp-note" aria-live="polite"></p><div class="fp-pad"></div><p class="fp-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _help: function () { var st = this.st; return st.last && st.misses > 0 && !st.done ? st.last.result : null; },
  _paint_: function () {
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'fp-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._paintPond(D); this._paintShow(D); this._paintLadder(D); this._paintBoard(D); this._paintCheck(D);
    var note = this._qs('.fp-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'fp-note is-ok' + (st.done ? '' : ' is-step'); }
    else if (v.note) { note.textContent = v.note; note.className = 'fp-note is-hint'; }
    else { note.textContent = ''; note.className = 'fp-note'; }
    this._setPrompt();
  },

  /* ---------- the pond: the chain of pads ---------- */
  _layout: function (D) {
    var st = this.st, rd = st.rd, n = rd.seq.length, C = FlipPadsCore, bank = C.fromBank(rd);
    var rows = D.wide ? [n] : [Math.ceil(n / 2), n - Math.ceil(n / 2)];
    var perRow = rows[0], gap = D.wide ? 14 : 8, Wp = D.W - (D.wide ? 24 : 22);
    var pw = Math.min(D.wide ? 122 : 108, Math.floor((Wp - (bank ? 26 : 0) - gap * (perRow - 1)) / perRow)), ph = Math.round(pw * (D.wide ? 0.6 : 0.56));
    /* the row Hopper sits in reserves room above its pads for him (his feet a third of the way down his pad);
       the other row only for the leap meter's label */
    var hop = D.wide ? 96 : 64, frogTop = Math.max(0, Math.round(hop - ph * 0.35)) + 4, wave = bank || !D.wide ? 0 : 18, groupH = bank ? (D.wide ? 26 : 10) : 0;
    var at = st.hop ? 0 : (st.done ? rd.buds[rd.buds.length - 1] : rd.buds[st.bi] - 1), frogRow = at < perRow ? 0 : 1;
    var tops = rows.map(function (cnt, r) { return r === frogRow ? frogTop : 30; }), rowHs = tops.map(function (tp) { return tp + ph + wave + groupH + (bank ? (D.wide ? 16 : 12) : 8); });
    var pos = [], shape = st.k % 3;
    for (var i = 0; i < n; i++) {
      var r = i < perRow ? 0 : 1, c = r ? i - perRow : i, cnt = rows[r], y0 = r ? rowHs[0] : 0;
      var x0 = (D.W - (cnt * pw + (cnt - 1) * gap)) / 2 + (bank ? 13 : 0), x = x0 + c * (pw + gap) + pw / 2;
      var t = cnt > 1 ? c / (cnt - 1) : 0, wy = shape === 1 ? wave * (1 - Math.sin(t * Math.PI)) : shape === 2 ? wave * (0.5 + 0.5 * Math.sin(t * Math.PI * 2)) : 0;
      pos.push({ x: x, y: y0 + tops[r] + wy + ph / 2, r: r });
    }
    return { pw: pw, ph: ph, hop: hop, H: rowHs.reduce(function (a, b) { return a + b; }, 0), pos: pos, bank: bank, groupH: groupH };
  },
  _flapRow: function (digits, cx, cy, fw, fh, cls) {
    var h = '', n = digits.length, x0 = cx - (n * fw + (n - 1) * 2) / 2;
    for (var i = 0; i < n; i++) {
      var x = x0 + i * (fw + 2);
      h += '<rect class="fp-sflap ' + (cls || '') + '" x="' + x + '" y="' + (cy - fh / 2) + '" width="' + fw + '" height="' + fh + '" rx="2.5"/><line class="fp-hinge" x1="' + x + '" y1="' + cy + '" x2="' + (x + fw) + '" y2="' + cy + '"/>';
      if (digits[i] != null) h += '<text class="fp-sdig" x="' + (x + fw / 2) + '" y="' + (cy + fh * 0.33) + '" text-anchor="middle" style="font-size:' + Math.round(fh * 0.78) + 'px">' + digits[i] + '</text>';
    }
    return h;
  },
  /* an equal group: the hop drawn as dots (2–10), ten-rods and dots (25), or rods (50) */
  _group: function (step, cx, y, u, faint) {
    var h = '', cls = 'fp-gdot' + (faint ? ' is-faint' : ''), rods = step >= 25 ? Math.floor(step / 10) : 0, dots = step >= 25 ? step % 10 : step, w = rods * (u * 0.8) + (rods && dots ? u * 0.4 : 0) + Math.ceil(dots / (dots > 5 ? 2 : 1)) * u, x = cx - w / 2;
    for (var r = 0; r < rods; r++) { h += '<rect class="' + cls + ' is-rod" x="' + (x + r * u * 0.8) + '" y="' + (y - u * 0.9) + '" width="' + (u * 0.55) + '" height="' + (u * 1.8) + '" rx="2"/>'; }
    x += rods * u * 0.8 + (rods && dots ? u * 0.4 : 0);
    var perCol = dots > 5 ? 2 : 1;
    for (var d = 0; d < dots; d++) { var col = Math.floor(d / perCol), row = d % perCol; h += '<circle class="' + cls + '" cx="' + (x + col * u + u / 2) + '" cy="' + (perCol === 2 ? y - u * 0.45 + row * u * 0.9 : y) + '" r="' + (u * 0.36) + '"/>'; }
    return h;
  },
  _paintPond: function (D) {
    var st = this.st, rd = st.rd, C = FlipPadsCore, L = this._layout(D), self = this, help = this._help(), h = '';
    var pond = this._qs('.fp-pond'), W = D.W, H = L.H;
    pond.style.display = st.done && !st.hop && !D.wide ? 'none' : '';
    var fw = Math.round(L.pw * (st.places === 4 ? 0.17 : 0.2)), fh = Math.round(fw * 1.45), step = C.stepOf(rd);
    var activeBud = st.done ? null : C.budIndex(st);
    /* the number line under a chain from the bank: a printed 0 tick, one tick per hop */
    if (L.bank) {
      for (var r = 0; r < (D.wide ? 1 : 2); r++) {
        var rowPads = L.pos.filter(function (p) { return p.r === r; }); if (!rowPads.length) continue;
        var ly = rowPads[0].y + L.ph / 2 + 6, xa = (r === 0 ? rowPads[0].x - L.pw / 2 - 18 : rowPads[0].x - L.pw / 2), xb = rowPads[rowPads.length - 1].x + L.pw / 2 + 6;
        h += '<line class="fp-line" x1="' + xa + '" y1="' + ly + '" x2="' + xb + '" y2="' + ly + '"/>';
        if (r === 0) h += '<line class="fp-tick" x1="' + (xa + 4) + '" y1="' + (ly - 7) + '" x2="' + (xa + 4) + '" y2="' + (ly + 7) + '"/><text class="fp-zero" x="' + (xa + 4) + '" y="' + (ly - 11) + '" text-anchor="middle">0</text>';
        rowPads.forEach(function (p) { h += '<line class="fp-tick" x1="' + p.x + '" y1="' + (ly - 6) + '" x2="' + p.x + '" y2="' + (ly + 6) + '"/>'; });
      }
    }
    /* the pads */
    rd.seq.forEach(function (n, i) {
      var p = L.pos[i], isBud = !st.hop && rd.buds.indexOf(i) >= 0, filled = st.filled.indexOf(i) >= 0, active = i === activeBud;
      var cls = 'fp-padleaf' + (isBud && !filled ? ' is-bud' : '') + (active ? ' is-active' : '') + (filled ? ' is-open' : '');
      h += '<ellipse class="' + cls + '" cx="' + p.x + '" cy="' + p.y + '" rx="' + (L.pw / 2) + '" ry="' + (L.ph / 2) + '"/><path class="fp-notch" d="M' + p.x + ' ' + p.y + ' L' + (p.x + L.pw * 0.28) + ' ' + (p.y - L.ph * 0.5) + ' L' + (p.x + L.pw * 0.42) + ' ' + (p.y - L.ph * 0.38) + ' Z"/>';
      if (filled) h += '<g class="fp-lily">' + [0, 72, 144, 216, 288].map(function (a) { return '<ellipse class="fp-petal" cx="' + (p.x - L.pw * 0.36) + '" cy="' + (p.y - L.ph * 0.36) + '" rx="' + (L.pw * 0.07) + '" ry="' + (L.pw * 0.13) + '" transform="rotate(' + a + ' ' + (p.x - L.pw * 0.36) + ' ' + (p.y - L.ph * 0.28) + ')"/>'; }).join('') + '</g>';
      var digits = isBud && !filled ? (active ? st.board : C.flaps(rd.seq[i - 1] == null ? n : rd.seq[i - 1], st.places).map(function () { return null; })) : C.flaps(n, st.places);
      h += self._flapRow(digits, p.x, p.y + 2, fw, fh, isBud && !filled ? 'is-copy' : '');
      if (L.bank) h += self._group(Math.abs(step), p.x, p.y + L.ph / 2 + 6 + L.groupH * 0.55, D.wide ? 9 : 6, isBud && !filled);
    });
    /* the leap meter (miss 1): the jump the child made, beside Hopper's own */
    if (help === 'meter' && !st.help) {
      var pa = L.pos[activeBud - 1], pb = L.pos[activeBud], mid = (pa.x + pb.x) / 2, peak = Math.min(pa.y, pb.y) - L.ph / 2 - 10;
      h += '<path class="fp-meter" d="M' + pa.x + ' ' + (pa.y - L.ph / 2) + ' Q' + mid + ' ' + (peak - 18) + ' ' + pb.x + ' ' + (pb.y - L.ph / 2) + '"/>';
      h += '<rect class="fp-meterbox" x="' + (mid - 30) + '" y="' + (peak - 34) + '" width="60" height="26" rx="8"/><text class="fp-metertxt" x="' + mid + '" y="' + (peak - 15) + '" text-anchor="middle">' + this._signed(st.last.made) + '</text>';
    }
    /* Hopper's own hop, by Hopper */
    var at = st.hop ? 0 : (st.done ? rd.buds[rd.buds.length - 1] : activeBud - 1), hp = L.pos[at];
    /* Hopper sits on the left of his pad (the leap meter rises to his right); his own hop sign stands beside him, further left */
    var fx = hp.x - L.pw * 0.15, bw = D.wide ? 54 : 46, bx = Math.max(3, fx - L.hop / 2 - bw - 2), by = hp.y - L.ph / 2 - 26;
    if (!st.hop && !st.done) h += '<rect class="fp-hopbox" x="' + bx + '" y="' + by + '" width="' + bw + '" height="22" rx="7"/><text class="fp-hoptxt" x="' + (bx + bw / 2) + '" y="' + (by + 16) + '" text-anchor="middle">' + this._signed(step) + '</text>';
    pond.innerHTML = '<svg class="fp-svg fp-art" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>'
      + '<img class="fp-frog' + (st.done ? ' is-leap' : '') + '" src="/image-library-webp/themes/' + this.FROG.split('/').map(encodeURIComponent).join('/') + '@2x.webp" alt="" draggable="false" style="width:' + L.hop + 'px;height:' + L.hop + 'px;left:' + (fx - L.hop / 2) + 'px;top:' + (hp.y - L.ph / 2 + L.ph * 0.35 - L.hop) + 'px">';
    pond.style.height = H + 'px';
    var sr = rd.seq.map(function (n, i) { return !st.hop && rd.buds.indexOf(i) >= 0 && st.filled.indexOf(i) < 0 ? '?' : n; }).join(', ');
    pond.setAttribute('role', 'group'); pond.setAttribute('aria-label', sr);
  },

  /* the end-of-round show: the chain as a column, the place that changes every hop striped */
  _paintShow: function (D) {
    var st = this.st, box = this._qs('.fp-show'), C = FlipPadsCore; box.innerHTML = '';
    if (!st.done || st.hop) { box.style.display = 'none'; return; }
    box.style.display = '';
    var stripe = C.stripe(st.rd), h = '<div class="fp-col fp-art">';
    st.rd.seq.forEach(function (n) { h += '<div class="fp-colrow">' + C.flaps(n, st.places).map(function (d, i) { return '<span class="fp-cell' + (d == null ? ' is-blank' : stripe.indexOf(i) >= 0 ? ' is-stripe' : '') + '">' + (d == null ? '' : d) + '</span>'; }).join('') + '</div>'; });
    box.innerHTML = h + '</div>';
  },
  /* miss 2: the pad before lined up over the board, the hop under its place */
  _paintLadder: function (D) {
    var st = this.st, box = this._qs('.fp-ladder'), C = FlipPadsCore; box.innerHTML = '';
    if (!st.help || st.done) { box.style.display = 'none'; return; }
    box.style.display = '';
    var a = st.hop ? st.rd.seq[0] : C.prevValue(st), b = st.hop ? st.rd.seq[1] : null, s = Math.abs(C.stepOf(st.rd)), n = st.places, cells = function (arr) { return arr.map(function (d) { return '<span class="fp-cell' + (d == null ? ' is-blank' : '') + '">' + (d == null ? '' : d) + '</span>'; }).join(''); };
    var row2 = st.hop ? C.flaps(b, n) : C.flaps(s, n), sign = st.hop ? '' : (C.isDown(st.rd) ? this.MINUS : '+');
    box.innerHTML = '<div class="fp-col fp-art' + (st.hop ? ' is-hop' : '') + '"><div class="fp-colrow"><span class="fp-cell is-sign"></span>' + cells(C.flaps(a, n)) + '</div><div class="fp-colrow"><span class="fp-cell is-sign">' + sign + '</span>' + cells(row2) + '</div></div>';
  },

  /* ---------- the flap board ---------- */
  _placeName: function (i) { var p = this.st.places - 1 - i; return this._t(['pOnes', 'pTens', 'pHundreds', 'pThousands'][p]); },
  _paintBoard: function (D) {
    var st = this.st, self = this, board = this._qs('.fp-board'), C = FlipPadsCore; board.innerHTML = '';
    var ring = st.help && !st.done ? C.changing(st) : [];
    var flap = function (k, digit, labelFwd, labelBack, fwd, back, cls) {
      var f = self.api.el('div', 'fp-flap' + (cls || ''));
      f.innerHTML = '<span class="fp-digit">' + (digit == null ? '' : digit) + '</span><span class="fp-mid"></span><span class="fp-nub is-up">▲</span><span class="fp-nub is-down">▼</span>';
      var up = self._btn('fp-half is-up', k + '-up', labelFwd), dn = self._btn('fp-half is-down', k + '-down', labelBack);
      up.disabled = dn.disabled = st.done;
      up.addEventListener('click', fwd); dn.addEventListener('click', back);
      f.appendChild(up); f.appendChild(dn); return f;
    };
    if (st.hop) board.appendChild(flap('sign', st.sign < 0 ? this.MINUS : '+', this._t('aSign'), this._t('aSign'), function () { self._flip(-1, 1); }, function () { self._flip(-1, -1); }, ' is-sign'));
    st.board.forEach(function (d, i) {
      board.appendChild(flap('flap-' + i, d, self._t('aFwd', { place: self._placeName(i) }), self._t('aBack', { place: self._placeName(i) }), function () { self._flip(i, 1); }, function () { self._flip(i, -1); }, ring.indexOf(i) >= 0 ? ' is-ring' : ''));
    });
    var tally = this._qs('.fp-tally'), n = Math.min(20, Math.abs(st.tally)), t = '';
    for (var q = 0; q < n; q++) t += '<i class="' + (st.tally < 0 ? 'is-back' : '') + '"></i>';
    tally.innerHTML = st.hop || st.help ? '' : t;
    this._qs('.fp-deck').style.display = st.done ? 'none' : '';
  },
  _paintCheck: function (D) {
    var st = this.st, self = this, pad = this._qs('.fp-pad'); pad.innerHTML = '';
    if (st.done) return;
    var chk = this._btn('fp-check', 'check', null, esc(this._t('checkBtn')));
    chk.addEventListener('click', function () { self._check(); });
    pad.appendChild(chk);
  },

  /* ---------------- the hand ---------------- */
  _flip: function (i, d) {
    var r = FlipPadsCore.flip(this.st, i, d); if (r === 'no') return;
    this._view.note = ''; if (!this._busy) this._view.ok = '';
    this.api.sound(d > 0 ? 620 : 470); this._paint();
  },
  _check: function () {
    var C = FlipPadsCore, st = this.st, v = this._view;
    if (this._busy) return;
    var prev = st.hop ? null : C.prevValue(st), bud = st.hop ? null : C.budIndex(st);
    var res = C.check(st); if (res.result === 'done') return;
    var s = Math.abs(C.stepOf(st.rd));
    if (res.result === 'ok') {
      if (!res.round) {
        var line = this._t('okHop', { prev: prev, next: st.rd.seq[bud], s: s });
        v.note = ''; v.ok = line; this.api.sound(880); this._paint(); this.api.announce(line);
        return;
      }
      this._success(prev, bud); return;
    }
    v.ok = '';
    v.note = this._t(C.hint(st), { s: s, hop: this._signed(C.stepOf(st.rd)), made: res.made != null ? this._signed(res.made) : '', prev: prev, a: st.rd.seq[0], b: st.rd.seq[1] });
    if (st.misses) this.api.sound(240);
    this._paint(); this.api.announce(v.note);
  },
  _key_: function (e) {
    var st = this.st; if (!st || st.done) return;
    var n = st.board.length, f = this._focusFlap == null ? n - 1 : this._focusFlap;
    if (e.key === 'ArrowLeft') { e.preventDefault(); this._focusFlap = Math.max(st.hop ? -1 : 0, f - 1); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); this._focusFlap = Math.min(n - 1, f + 1); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); this._flip(f, 1); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); this._flip(f, -1); return; }
    if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _success: function (prev, bud) {
    var st = this.st, v = this._view, C = FlipPadsCore, step = C.stepOf(st.rd), s = Math.abs(step), msg;
    if (st.hop) msg = this._t('okSign', { sign: step < 0 ? this.MINUS : '+', s: s });
    else msg = this._t(step < 0 ? 'okListBack' : 'okList', { list: st.rd.seq.join(', '), s: s });
    v.note = ''; v.ok = msg;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectFlipPadsCSS() {
  if (typeof document === 'undefined' || document.getElementById('fp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.fp-wrap{position:relative;width:100%;max-width:720px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .fp-wrap:focus{outline:none;}'
  + '.fp-pond{position:relative;border-radius:18px;background:linear-gradient(#CFE9F2,#A9D6E6);box-shadow:inset 0 0 0 3px #86BCD0;overflow:hidden;} .fp-svg{display:block;}'
  + '.fp-padleaf{fill:#6DBF73;stroke:' + INK + ';stroke-width:2;} .fp-padleaf.is-bud{fill:#BFE3B4;stroke-dasharray:6 4;} .fp-padleaf.is-active{stroke:#F2784B;stroke-width:3;} .fp-padleaf.is-open{fill:#7FCB84;} .fp-notch{fill:#A9D6E6;}'
  + '.fp-petal{fill:#fff;stroke:#E8B4C8;stroke-width:1;} .fp-lily{animation:fpOpen .3s ease-out;} @keyframes fpOpen{from{opacity:0;}}'
  + '.fp-sflap{fill:#1F5A55;stroke:' + INK + ';stroke-width:1;} .fp-sflap.is-copy{fill:#2F7C74;opacity:.85;} .fp-hinge{stroke:#0F3A36;stroke-width:1;} .fp-sdig{font-family:' + H + ';font-weight:800;fill:#FFF8E8;}'
  + '.fp-line{stroke:' + INK + ';stroke-width:2;} .fp-tick{stroke:' + INK + ';stroke-width:2;} .fp-zero{font-family:' + H + ';font-weight:800;font-size:15px;fill:' + INK + ';}'
  + '.fp-gdot{fill:#F2784B;stroke:' + INK + ';stroke-width:.8;} .fp-gdot.is-rod{fill:#6C8EDB;} .fp-gdot.is-faint{opacity:.3;}'
  + '.fp-meter{fill:none;stroke:#E0663A;stroke-width:3;stroke-dasharray:7 5;} .fp-meterbox{fill:#FFF1EA;stroke:#E0663A;stroke-width:2;} .fp-metertxt{font-family:' + H + ';font-weight:800;font-size:17px;fill:#B9471E;}'
  + '.fp-hopbox{fill:#EAF6F2;stroke:#146B5E;stroke-width:2;} .fp-hoptxt{font-family:' + H + ';font-weight:800;font-size:15px;fill:#146B5E;}'
  + '.fp-frog{position:absolute;object-fit:contain;transform:scaleX(-1);pointer-events:none;filter:drop-shadow(0 3px 2px rgba(0,0,0,.2));} .fp-frog.is-leap{animation:fpLeap .6s ease-out;} @keyframes fpLeap{40%{transform:scaleX(-1) translateY(-22px);}}'
  /* the column show and the ladder */
  + '.fp-show,.fp-ladder{display:flex;justify-content:center;} .fp-col{display:inline-flex;flex-direction:column;gap:3px;padding:8px 12px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D5BC;} .fp-colrow{display:flex;gap:4px;}'
  + '.fp-cell{width:30px;height:34px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;background:#1F5A55;color:#FFF8E8;font-family:' + H + ';font-weight:800;font-size:22px;} .fp-cell.is-stripe{background:#F2784B;} .fp-cell.is-blank{background:transparent;} .fp-cell.is-sign{background:transparent;color:#146B5E;}'
  + '.fp-ladder .fp-cell{width:var(--fpw,72px);height:24px;font-size:17px;} .fp-ladder .fp-col{padding:3px 10px;gap:2px;} .fp-wrap.is-narrow .fp-ladder .fp-cell{height:20px;font-size:15px;} .fp-wrap.is-narrow .fp-ladder .fp-col{padding:2px 6px;} .fp-ladder .fp-colrow{position:relative;gap:var(--fpg,8px);} .fp-ladder .fp-cell.is-sign{position:absolute;left:-30px;width:24px;} .fp-ladder .fp-col.is-hop .fp-colrow{padding-left:calc(var(--fpw,72px) + var(--fpg,8px));}'
  /* the board */
  + '.fp-deck{display:flex;flex-direction:column;align-items:center;gap:4px;} .fp-board{display:flex;justify-content:center;gap:8px;}'
  + '.fp-flap{position:relative;width:72px;height:96px;border-radius:10px;background:#1F5A55;box-shadow:inset 0 0 0 3px #0F3A36,0 4px 0 #0F3A36;} .fp-flap.is-sign{background:#C9A06A;box-shadow:inset 0 0 0 3px #7A5230,0 4px 0 #7A5230;}'
  + '.fp-digit{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:56px;color:#FFF8E8;pointer-events:none;} .fp-flap.is-sign .fp-digit{color:#2F2A3B;}'
  + '.fp-mid{position:absolute;left:4px;right:4px;top:50%;height:2px;background:#0F3A36;pointer-events:none;} .fp-nub{position:absolute;left:50%;transform:translateX(-50%);font-size:10px;color:#9FD3C8;pointer-events:none;} .fp-nub.is-up{top:2px;} .fp-nub.is-down{bottom:2px;}'
  + '.fp-half{position:absolute;left:0;right:0;height:50%;border:0;background:transparent;cursor:pointer;padding:0;border-radius:10px;} .fp-half.is-up{top:0;} .fp-half.is-down{bottom:0;} .fp-half:hover:not(:disabled){background:rgba(255,255,255,.08);} .fp-half:disabled{cursor:default;}'
  + '.fp-flap.is-ring{box-shadow:inset 0 0 0 3px #0F3A36,0 0 0 4px #F4CF62,0 4px 0 #0F3A36;} .fp-flap{transition:transform .12s;}'
  + '.fp-tally{min-height:10px;display:flex;flex-wrap:wrap;justify-content:center;gap:4px;max-width:320px;} .fp-tally i{width:8px;height:8px;border-radius:50%;background:#146B5E;opacity:.55;} .fp-tally i.is-back{background:transparent;box-shadow:inset 0 0 0 2px #146B5E;}'
  + '.fp-pad{display:flex;justify-content:center;} .fp-pad:empty{display:none;} .fp-check{min-width:200px;min-height:52px;border:0;border-radius:12px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:21px;cursor:pointer;box-shadow:0 4px 0 #0E4E44;padding:0 28px;}'
  + '.fp-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .fp-note:empty{display:none;} .fp-note.is-hint{color:#9A3D1C;} .fp-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;} .fp-note.is-ok.is-step{position:static;width:auto;height:auto;clip:auto;}'
  + '.fp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.fp-wrap.is-narrow{gap:5px;} .fp-wrap.is-narrow .fp-show .fp-cell{width:24px;height:24px;font-size:17px;} .fp-wrap.is-narrow .fp-show .fp-col{padding:4px 8px;gap:2px;} .fp-wrap.is-narrow .fp-check{min-height:50px;} .fp-wrap.is-narrow .fp-flap{width:60px;height:88px;} .fp-wrap.is-narrow .fp-digit{font-size:48px;} .fp-wrap.is-narrow .fp-board{gap:6px;} .fp-wrap.is-narrow .fp-note{font-size:16px;} .fp-wrap.is-narrow .fp-check{width:100%;}'
  + '.fp-wrap.is-narrow .fp-ladder{--fpw:60px;--fpg:6px;} .fp-wrap.is-cramp .fp-flap{width:56px;height:88px;} .fp-wrap.is-cramp .fp-ladder{--fpw:56px;}'
  + '.fp-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.fp-wrap *{animation:none !important;transition:none !important;}}'
  + '.fp-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'fp-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.FlipPadsActivity = FlipPadsActivity;
