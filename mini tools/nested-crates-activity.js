/* =====================================================================
   nested-crates-activity.js — ACTIVITY #146 of the one-by-one rebuild:
   "Tuck Breaks a Hundred" → THE NESTED CRATES (2.NBT.B.7; G2-205,
   G3-357/360/362/363; all 11 locales). Model: nested-crates-core.js
   (NestedCratesCore). Design: docs/activities-rebuild/designs/146-place-value-regroup.md
   ---------------------------------------------------------------------
   The invention: in Tuck's stock room a hundred is a crate packed with
   ten boxes, and every box is packed with ten cubes. Only what lies on a
   shelf can be opened, so when the tens shelf is empty the cubes a
   customer's order needs are inside a box that is inside a crate: the
   crate opens into ten boxes (never into cubes), then a box opens into
   ten cubes. The order slip has exactly the take-away number of empty
   cells; when it is full the child types what is left on the shelves.
   Ten loose pieces pack back into one package (free play and undo).
   No timer, no score, no words on the apparatus.
   Test seams: window.NestedCratesActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._geo / ._shelf /
   ._slip / ._back / ._pack / ._check / ._tap / .FAST / .OK_MS.
   ===================================================================== */
var NestedCratesActivity = {
  id: 'nested-crates',
  /* the drawn apparatus (the hierarchy gate): the shelves and their packages, the order slip, the digit boxes, the written subtraction */
  apparatusClasses: ['nc-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Tuck Breaks a Hundred","de":"Tuck entbündelt einen Hunderter","fr":"Tuck casse une centaine","es":"Tuck desagrupa una centena","pt":"Tuck desagrupa uma centena","it":"Tuck cambia un centinaio","nl":"Tuck wisselt een honderdtal in","sv":"Tuck växlar ett hundratal","da":"Tuck veksler en hundreder","no":"Tuck veksler en hundrer","fi":"Tuck vaihtaa satasen"},
    instruction: {"en":"Fill Tuck's order slip. Not enough? Open a crate or a box. Then type what is left.","de":"Füll Tucks Bestellzettel. Zu wenig da? Mach eine Kiste oder eine Schachtel auf. Dann tipp ein, was übrig ist.","fr":"Remplis le bon de commande de Tuck. Pas assez ? Ouvre une caisse ou une boîte. Puis tape ce qui reste.","es":"Llena el pedido de Tuck. ¿No alcanza? Abre una caja grande o una cajita. Luego escribe lo que queda.","pt":"Complete o pedido do Tuck. Faltou? Abra um caixote ou uma caixinha. Depois digite o que sobrou.","it":"Riempi l’ordine di Tuck. Non basta? Apri una cassa o una scatola. Poi scrivi quello che resta.","nl":"Vul Tucks bestelbriefje. Te weinig? Maak een krat of een doosje open. Typ dan wat er over is.","sv":"Fyll Tucks beställningslapp. Räcker det inte? Öppna en låda eller en ask. Skriv sedan hur mycket som är kvar.","da":"Fyld Tucks bestillingsseddel. Ikke nok? Åbn en kasse eller en æske. Skriv så, hvad der er tilbage.","no":"Fyll Tucks bestillingslapp. Ikke nok? Åpne en kasse eller en eske. Skriv så hva som er igjen.","fi":"Täytä Tuckin tilauslappu. Eikö riitä? Avaa laatikko tai rasia. Kirjoita sitten, paljonko jäi."},
    hintSlip: {"en":"Fill the order slip first.","de":"Füll zuerst den Bestellzettel.","fr":"Remplis d’abord le bon de commande.","es":"Primero llena el pedido.","pt":"Primeiro complete o pedido.","it":"Prima riempi l’ordine.","nl":"Vul eerst het bestelbriefje.","sv":"Fyll beställningslappen först.","da":"Fyld bestillingssedlen først.","no":"Fyll bestillingslappen først.","fi":"Täytä ensin tilauslappu."},
    hintType: {"en":"Type what is left on the shelves.","de":"Tipp ein, was auf den Regalen übrig ist.","fr":"Tape ce qui reste sur les étagères.","es":"Escribe lo que queda en los estantes.","pt":"Digite o que sobrou nas prateleiras.","it":"Scrivi quello che resta sugli scaffali.","nl":"Typ wat er nog op de planken ligt.","sv":"Skriv hur mycket som är kvar på hyllorna.","da":"Skriv, hvad der er tilbage på hylderne.","no":"Skriv hva som er igjen på hyllene.","fi":"Kirjoita, paljonko hyllyille jäi."},
    hintTooMany: {"en":"One shelf holds ten or more — pack ten back up first.","de":"Auf einem Regal liegen zehn oder mehr – pack zuerst zehn wieder ein.","fr":"Une étagère en a dix ou plus — remballe-en d’abord dix.","es":"En un estante hay diez o más: primero vuelve a guardar diez.","pt":"Uma prateleira tem dez ou mais — guarde dez de volta primeiro.","it":"Su uno scaffale ce ne sono dieci o più: prima rimettine dieci insieme in una scatola o in una cassa.","nl":"Op een plank liggen er tien of meer — pak er eerst tien weer in.","sv":"På en hylla ligger tio eller fler – packa ihop tio först.","da":"På en hylde ligger der ti eller flere – pak ti sammen igen først.","no":"På en hylle ligger det ti eller flere – pakk ti sammen igjen først.","fi":"Yhdellä hyllyllä on kymmenen tai enemmän – pakkaa ensin kymmenen takaisin."},
    hintCount: {"en":"Count what is left on each shelf.","de":"Zähl, was auf jedem Regal übrig ist.","fr":"Compte ce qui reste sur chaque étagère.","es":"Cuenta lo que queda en cada estante.","pt":"Conte o que sobrou em cada prateleira.","it":"Conta quello che resta su ogni scaffale.","nl":"Tel wat er op elke plank over is.","sv":"Räkna det som är kvar på varje hylla.","da":"Tæl, hvad der er tilbage på hver hylde.","no":"Tell det som er igjen på hver hylle.","fi":"Laske, paljonko kullekin hyllylle jäi."},
    hintNest: {"en":"A crate opens into tens. A box opens into ones.","de":"In einer Kiste sind zehn Zehner, in einer Schachtel zehn Einer.","fr":"Une caisse contient dix dizaines, une boîte dix unités.","es":"Una caja grande trae diez decenas; una cajita, diez unidades.","pt":"Um caixote tem dez dezenas; uma caixinha, dez unidades.","it":"In una cassa ci sono dieci decine, in una scatola dieci unità.","nl":"In een krat zitten tien tientallen, in een doosje tien eenheden.","sv":"I en låda ligger tio tiotal, i en ask tio ental.","da":"I en kasse ligger der ti tiere, i en æske ti enere.","no":"I en kasse ligger det ti tiere, i en eske ti enere.","fi":"Laatikossa on kymmenen kymppiä, rasiassa kymmenen ykköstä."},
    hintEmpty: {"en":"This shelf is empty — what could you open?","de":"Dieses Regal ist leer – was könntest du aufmachen?","fr":"Cette étagère est vide — que pourrais-tu ouvrir ?","es":"Este estante está vacío: ¿qué podrías abrir?","pt":"Esta prateleira está vazia — o que você pode abrir?","it":"Questo scaffale è vuoto: che cosa potresti aprire?","nl":"Deze plank is leeg — wat kun je openmaken?","sv":"Hyllan är tom – vad kan du öppna?","da":"Hylden er tom – hvad kan du åbne?","no":"Hylla er tom – hva kan du åpne?","fi":"Hylly on tyhjä – mitä voisit avata?"},
    okOnes: {"en":"{a} take away {b} leaves {c} — a crate opened into tens, and a box opened into ones!","de":"{a} minus {b} ist {c} – eine Kiste in Zehner entbündelt und eine Schachtel in Einer!","fr":"{a} moins {b}, il reste {c} — une caisse ouverte en dizaines, puis une boîte en unités !","es":"¡{a} menos {b} es {c}: una caja grande se abrió en decenas y una cajita en unidades!","pt":"{a} menos {b} dá {c} — um caixote virou dezenas, e uma caixinha virou unidades!","it":"{a} meno {b} fa {c}: una cassa aperta in decine e una scatola in unità!","nl":"{a} min {b} is {c} — een krat ingewisseld voor tientallen en een doosje voor eenheden!","sv":"{a} minus {b} blir {c} – en låda växlades till tiotal och en ask till ental!","da":"{a} minus {b} giver {c} – en kasse blev vekslet til tiere og en æske til enere!","no":"{a} minus {b} blir {c} – en kasse ble vekslet til tiere og en eske til enere!","fi":"{a} miinus {b} on {c} – laatikko vaihdettiin kympeiksi ja rasia ykkösiksi!"},
    okBig: {"en":"{a} take away {b} leaves {c}.","de":"{a} minus {b} ist {c}.","fr":"{a} moins {b}, il reste {c}.","es":"{a} menos {b} es {c}.","pt":"{a} menos {b} dá {c}.","it":"{a} meno {b} fa {c}.","nl":"{a} min {b} is {c}.","sv":"{a} minus {b} blir {c}.","da":"{a} minus {b} giver {c}.","no":"{a} minus {b} blir {c}.","fi":"{a} miinus {b} on {c}."},
    colH: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sadat"},
    colT: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmenet"},
    colO: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköset"},
    aShelfH: {"en":"Crates: {n}. Tap to open one — ten boxes come out.","de":"Kisten: {n}. Tippen, um eine aufzumachen – zehn Schachteln kommen heraus.","fr":"Caisses : {n}. Touche pour en ouvrir une — dix boîtes en sortent.","es":"Cajas grandes: {n}. Toca para abrir una: salen diez cajitas.","pt":"Caixotes: {n}. Toque para abrir um — saem dez caixinhas.","it":"Casse: {n}. Tocca per aprirne una: escono dieci scatole.","nl":"Kratten: {n}. Tik om er een open te maken — er komen tien doosjes uit.","sv":"Lådor: {n}. Tryck för att öppna en – tio askar kommer ut.","da":"Kasser: {n}. Tryk for at åbne en – ti æsker kommer ud.","no":"Kasser: {n}. Trykk for å åpne en – ti esker kommer ut.","fi":"Laatikoita: {n}. Napauta, niin yksi aukeaa – siitä tulee kymmenen rasiaa."},
    aShelfT: {"en":"Boxes: {n}. Tap to open one — ten cubes come out.","de":"Schachteln: {n}. Tippen, um eine aufzumachen – zehn Würfel kommen heraus.","fr":"Boîtes : {n}. Touche pour en ouvrir une — dix cubes en sortent.","es":"Cajitas: {n}. Toca para abrir una: salen diez cubitos.","pt":"Caixinhas: {n}. Toque para abrir uma — saem dez cubinhos.","it":"Scatole: {n}. Tocca per aprirne una: escono dieci cubetti.","nl":"Doosjes: {n}. Tik om er een open te maken — er komen tien blokjes uit.","sv":"Askar: {n}. Tryck för att öppna en – tio kuber kommer ut.","da":"Æsker: {n}. Tryk for at åbne en – ti klodser kommer ud.","no":"Esker: {n}. Trykk for å åpne en – ti klosser kommer ut.","fi":"Rasioita: {n}. Napauta, niin yksi aukeaa – siitä tulee kymmenen kuutiota."},
    aShelfO: {"en":"Cubes: {n}. Tap to put one on the order slip.","de":"Würfel: {n}. Tippen, um einen auf den Bestellzettel zu legen.","fr":"Cubes : {n}. Touche pour en mettre un sur le bon de commande.","es":"Cubitos: {n}. Toca para poner uno en el pedido.","pt":"Cubinhos: {n}. Toque para pôr um no pedido.","it":"Cubetti: {n}. Tocca per metterne uno sull’ordine.","nl":"Blokjes: {n}. Tik om er een op het bestelbriefje te leggen.","sv":"Kuber: {n}. Tryck för att lägga en på beställningslappen.","da":"Klodser: {n}. Tryk for at lægge en på bestillingssedlen.","no":"Klosser: {n}. Trykk for å legge en på bestillingslappen.","fi":"Kuutioita: {n}. Napauta, niin yksi siirtyy tilauslapulle."},
    aSlip: {"en":"Order slip, {col}: {have} of {need}. Tap to add one.","de":"Bestellzettel, {col}: {have} von {need}. Tippen, um eins dazuzulegen.","fr":"Bon de commande, {col} : {have} sur {need}. Touche pour en ajouter un.","es":"Pedido, {col}: {have} de {need}. Toca para agregar una pieza.","pt":"Pedido, {col}: {have} de {need}. Toque para pôr mais uma peça.","it":"Ordine, {col}: {have} su {need}. Tocca per aggiungere un pezzo.","nl":"Bestelbriefje, {col}: {have} van {need}. Tik om er een bij te leggen.","sv":"Beställningslapp, {col}: {have} av {need}. Tryck för att lägga dit en till.","da":"Bestillingsseddel, {col}: {have} af {need}. Tryk for at lægge en til.","no":"Bestillingslapp, {col}: {have} av {need}. Trykk for å legge til en.","fi":"Tilauslappu, {col}: {have} paikkaa {need}:stä täytetty. Napauta, niin lisäät yhden."},
    aBack: {"en":"Put the last piece back on its shelf","de":"Das letzte Teil zurück aufs Regal legen","fr":"Remettre la dernière pièce sur son étagère","es":"Regresar la última pieza a su estante","pt":"Devolver a última peça à prateleira","it":"Rimettere l’ultimo pezzo sul suo scaffale","nl":"Het laatste stuk terug op zijn plank leggen","sv":"Lägg tillbaka den sista biten på hyllan","da":"Læg den sidste brik tilbage på hylden","no":"Legg den siste brikken tilbake på hylla","fi":"Palauta viimeinen pala hyllylle"},
    aPackT: {"en":"Pack ten boxes back into a crate","de":"Zehn Schachteln wieder in eine Kiste packen","fr":"Remettre dix boîtes dans une caisse","es":"Guardar diez cajitas en una caja grande","pt":"Guardar dez caixinhas num caixote","it":"Rimettere dieci scatole in una cassa","nl":"Tien doosjes terug in een krat doen","sv":"Packa tio askar i en låda igen","da":"Pak ti æsker i en kasse igen","no":"Pakk ti esker i en kasse igjen","fi":"Pakkaa kymmenen rasiaa takaisin laatikkoon"},
    aPackO: {"en":"Pack ten cubes back into a box","de":"Zehn Würfel wieder in eine Schachtel packen","fr":"Remettre dix cubes dans une boîte","es":"Guardar diez cubitos en una cajita","pt":"Guardar dez cubinhos numa caixinha","it":"Rimettere dieci cubetti in una scatola","nl":"Tien blokjes terug in een doosje doen","sv":"Packa tio kuber i en ask igen","da":"Pak ti klodser i en æske igen","no":"Pakk ti klosser i en eske igjen","fi":"Pakkaa kymmenen kuutiota takaisin rasiaan"},
    aState: {"en":"Crates {h}, boxes {t}, cubes {o}","de":"Kisten {h}, Schachteln {t}, Würfel {o}","fr":"Caisses {h}, boîtes {t}, cubes {o}","es":"Cajas grandes {h}, cajitas {t}, cubitos {o}","pt":"Caixotes {h}, caixinhas {t}, cubinhos {o}","it":"Casse {h}, scatole {t}, cubetti {o}","nl":"Kratten {h}, doosjes {t}, blokjes {o}","sv":"Lådor {h}, askar {t}, kuber {o}","da":"Kasser {h}, æsker {t}, klodser {o}","no":"Kasser {h}, esker {t}, klosser {o}","fi":"Laatikoita {h}, rasioita {t}, kuutioita {o}"},
    aTyped: {"en":"What is left: {v}","de":"Übrig: {v}","fr":"Il reste : {v}","es":"Queda: {v}","pt":"Sobrou: {v}","it":"Resta: {v}","nl":"Over: {v}","sv":"Kvar: {v}","da":"Tilbage: {v}","no":"Igjen: {v}","fi":"Jäljellä: {v}"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setTake: {"en":"Take away","de":"Abziehen","fr":"Enlever","es":"Quitar","pt":"Tirar","it":"Togliere","nl":"Weghalen","sv":"Ta bort","da":"Tag væk","no":"Ta bort","fi":"Vähennä"},
    tOnes: {"en":"a few ones","de":"ein paar Einer","fr":"quelques unités","es":"unas unidades","pt":"algumas unidades","it":"qualche unità","nl":"een paar eenheden","sv":"några ental","da":"nogle enere","no":"noen enere","fi":"muutama ykkönen"},
    tBig: {"en":"a three-digit number","de":"eine dreistellige Zahl","fr":"un nombre à trois chiffres","es":"un número de tres cifras","pt":"um número de três algarismos","it":"un numero di tre cifre","nl":"een getal van drie cijfers","sv":"ett tresiffrigt tal","da":"et trecifret tal","no":"et tresifret tall","fi":"kolminumeroinen luku"},
    setWritten: {"en":"Written subtraction","de":"Schriftliche Subtraktion","fr":"Opération posée","es":"Resta escrita","pt":"Conta armada","it":"Calcolo in colonna","nl":"Cijferend aftrekken","sv":"Uppställning","da":"Opstilling","no":"Oppstilling","fi":"Allekkain"},
    wHidden: {"en":"hidden","de":"aus","fr":"non","es":"no","pt":"não","it":"no","nl":"uit","sv":"dold","da":"skjult","no":"skjult","fi":"piilossa"},
    wShown: {"en":"shown","de":"an","fr":"oui","es":"sí","pt":"sim","it":"sì","nl":"aan","sv":"visad","da":"vist","no":"vist","fi":"näkyvissä"},
  },/*STRINGS-END*/
  defaults: { take: 'ones', written: 'hidden' },
  settings: [
    { key: 'take', type: 'choice', labelKey: 'setTake', options: [{ value: 'ones', labelKey: 'tOnes' }, { value: 'big', labelKey: 'tBig' }] },
    { key: 'written', type: 'choice', labelKey: 'setWritten', options: [{ value: 'hidden', labelKey: 'wHidden' }, { value: 'shown', labelKey: 'wShown' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._hold = null; this._drag = null; this._swallow = null;
    injectNestedCratesCSS();
  },
  destroy: function () { this._clearTimers(); this._holdStop(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this._start(this.st.k); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _face: function () { return NestedCratesCore.faceOf(this._setting('take')); },
  _written: function () { return this._setting('written') === 'shown'; },
  _key: function () { return this._face(); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _colName: function (c) { return this._t(c === 'H' ? 'colH' : c === 'T' ? 'colT' : 'colO'); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = NestedCratesCore.rounds(this._face()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = NestedCratesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._face(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'nested-crates.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the task line is the subtraction itself: numerals only (U+2212) */
  _taskLine: function () { var st = this.st; return st ? st.a + ' − ' + st.b + ' = ?' : ''; },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._holdStop();
    this.st = NestedCratesCore.newState(this._face(), k);
    this._view = { note: '', ok: '', soft: false, fresh: null, pulse: null, wob: null, slipPulse: false, success: false };
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
  _dims: function () { var W = this._width(), B = NestedCratesCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'nc-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="nc-work"><div class="nc-order"><div class="nc-hatch"></div><div class="nc-slip"></div></div>'
      + '<div class="nc-room"><div class="nc-shelves"></div><div class="nc-boxes nc-art"></div></div></div>'
      + '<p class="nc-note" aria-live="polite"></p><div class="nc-written nc-art"></div><div class="nc-pad"></div><p class="nc-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
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

  /* every size in one place, from the stage width */
  _geo: function (D) {
    var wide = D.wide, cramp = D.cramp;
    var orderW = wide ? 200 : 0, roomW = wide ? D.W - orderW - 14 : D.W, gap = wide ? 10 : 6;
    var shelfW = Math.floor((roomW - 2 * gap) / 3), inner = shelfW - (wide ? 16 : 8);
    return {
      W: D.W, wide: wide, cramp: cramp, orderW: orderW, roomW: roomW, gap: gap, shelfW: shelfW,
      crate: Math.min(wide ? 58 : cramp ? 36 : 42, Math.floor((inner - 4) / 2)),
      boxL: Math.min(inner, wide ? 124 : 96), boxT: wide ? 13 : cramp ? 9 : 10,
      cube: wide ? 15 : cramp ? 10 : 11, cubeP: wide ? 18 : cramp ? 13 : 14,
      boxH: wide ? 60 : cramp ? 36 : 46,
      tuck: wide ? 96 : 64,
      cell: wide ? 22 : cramp ? 15 : 18, cellP: wide ? 26 : cramp ? 18 : 21,
      bcellL: wide ? 56 : cramp ? 38 : 44, bcellT: wide ? 11 : cramp ? 8 : 9, ccell: wide ? 28 : cramp ? 20 : 24
    };
  },
  _paint_: function () {
    var st = this.st, D = this._dims(), G = this._geo(D), v = this._view;
    this._wrap.className = 'nc-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.face;
    this._paintHatch(G); this._paintSlip(G); this._paintShelves(G); this._paintBoxes(G); this._paintWritten(G); this._paintPad(G);
    var note = this._qs('.nc-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'nc-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'nc-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'nc-note'; }
    this._setPrompt();
    /* one-shot marks: they play on the paint that shows them, never on a later one */
    v.fresh = null; v.pulse = null; v.wob = null; v.slipPulse = false;
  },

  /* ---------- the packages, drawn ---------- */
  _crate: function (x, y, s, cls) {
    var lid = Math.round(s * 0.2), wp = Math.round(s * 0.58), wx = x + (s - wp) / 2, wy = y + lid + (s - lid - wp) / 2;
    var o = '<g class="nc-piece nc-crate' + (cls ? ' ' + cls : '') + '"><rect class="nc-body" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="3"/>'
      + '<rect class="nc-lid" x="' + x + '" y="' + y + '" width="' + s + '" height="' + lid + '" rx="3"/>'
      + '<rect class="nc-pane" x="' + wx + '" y="' + wy + '" width="' + wp + '" height="' + wp + '" rx="2"/>';
    /* through the window: the ten boxes packed inside */
    for (var i = 1; i < 10; i++) o += '<path class="nc-inside" d="M' + (wx + 2) + ' ' + (wy + wp * i / 10).toFixed(1) + ' H' + (wx + wp - 2) + '"/>';
    return o + '</g>';
  },
  _box: function (x, y, L, t, cls) {
    var o = '<g class="nc-piece nc-box' + (cls ? ' ' + cls : '') + '"><rect class="nc-body" x="' + x + '" y="' + y + '" width="' + L + '" height="' + t + '" rx="2"/>';
    /* the ten cube outlines on the lid */
    for (var i = 1; i < 10; i++) o += '<path class="nc-seam" d="M' + (x + L * i / 10).toFixed(1) + ' ' + (y + 1.5) + ' V' + (y + t - 1.5) + '"/>';
    return o + '</g>';
  },
  _cube: function (x, y, c, cls) { return '<rect class="nc-piece nc-cube nc-body' + (cls ? ' ' + cls : '') + '" x="' + x + '" y="' + y + '" width="' + c + '" height="' + c + '" rx="2"/>'; },
  _lab: function (x, y, txt, small) { var w = small ? 24 : 32; return '<rect class="nc-lab" x="' + (x - w / 2) + '" y="' + (y - 9) + '" width="' + w + '" height="18" rx="9"/><text class="nc-labt" x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle">' + txt + '</text>'; },
  _icon: function (c) {
    if (c === 'H') return '<svg class="nc-ico nc-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="2" class="nc-ico-p"/><rect x="2" y="2" width="16" height="4" rx="2" class="nc-ico-l"/><rect x="6.5" y="8" width="7" height="7" class="nc-ico-w"/></svg>';
    if (c === 'T') return '<svg class="nc-ico nc-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="1" y="7" width="18" height="6" rx="1.5" class="nc-ico-p"/><path d="M5.5 7v6M10 7v6M14.5 7v6" class="nc-ico-s"/></svg>';
    return '<svg class="nc-ico nc-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="6" y="6" width="8" height="8" rx="1.5" class="nc-ico-p"/></svg>';
  },

  /* ---------- the shelves: what each one holds, and its drawing height ---------- */
  _shelfArt: function (G, c, n, lab) {
    var s = '', h = 0, fresh = this._view.fresh === c, step = NestedCratesCore.VAL[c], self = this;
    var nw = function (i) { return fresh ? 'is-new" style="animation-delay:' + (i * 40) + 'ms' : ''; };
    if (c === 'H') {
      var cs = G.crate, cp = cs + 4, fx = (G.shelfW - (2 * cs + 4)) / 2, dy = G.wide ? cp : Math.round(cs * 0.62);
      for (var i = 0; i < n; i++) {
        var x = fx + (i % 2) * cp, y = 4 + Math.floor(i / 2) * dy;
        s += this._crate(x, y, cs, '');
      }
      if (lab) for (var j = 0; j < n; j++) { var lx = fx + (j % 2) * cp + cs / 2, ly = 4 + Math.floor(j / 2) * dy + (j + 2 < n && !G.wide ? dy / 2 : cs / 2); s += this._lab(lx, ly, (j + 1) * step); }
      h = n ? 4 + (Math.ceil(n / 2) - 1) * dy + cs : 0;
    } else if (c === 'T') {
      var bx = (G.shelfW - G.boxL) / 2, bp = n > 10 ? G.boxT + 1 : G.boxT + (G.wide ? 4 : 3);
      for (var k = 0; k < n; k++) { var by = 4 + k * bp; s += this._box(bx, by, G.boxL, G.boxT, fresh && k >= n - 10 ? nw(k - (n - 10)) : ''); if (lab) s += self._lab(bx + G.boxL / 2, by + G.boxT / 2, (k + 1) * step, true); }
      h = n ? 4 + (n - 1) * bp + G.boxT : 0;
    } else {
      var cx = (G.shelfW - (5 * G.cubeP - 3)) / 2;
      for (var m = 0; m < n; m++) {
        var qx = cx + (m % 5) * G.cubeP, qy = 4 + Math.floor(m / 5) * G.cubeP;
        s += this._cube(qx, qy, G.cube, fresh && m >= n - 10 ? nw(m - (n - 10)) : '');
      }
      if (lab) for (var r = 0; r * 5 < n; r++) { var last = Math.min(n, r * 5 + 5); s += this._lab(G.shelfW / 2, 4 + r * G.cubeP + G.cube / 2, last, true); }
      h = n ? 4 + Math.ceil(n / 5) * G.cubeP : 0;
    }
    return { s: s, h: h + 4 };
  },
  _paintShelves: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.nc-shelves'); el.innerHTML = '';
    el.style.gap = G.gap + 'px';
    var labels = st.verdict ? st.verdict.wrongs : [];
    var arts = {}, H = G.wide ? 150 : G.cramp ? 70 : 84;
    NestedCratesCore.COLS.forEach(function (c) { arts[c] = self._shelfArt(G, c, st.shelves[c], labels.indexOf(c) >= 0); H = Math.max(H, arts[c].h); });
    NestedCratesCore.COLS.forEach(function (c) {
      var n = st.shelves[c], col = self.api.el('div', 'nc-shelfcol'); col.style.width = G.shelfW + 'px';
      var lab = labels.indexOf(c) >= 0, pulse = v.pulse && v.pulse.indexOf(c) >= 0;
      var key = c === 'H' ? 'aShelfH' : c === 'T' ? 'aShelfT' : 'aShelfO';
      var b = self._btn('nc-shelf is-' + c + (pulse ? ' is-pulse' : '') + (lab ? ' is-counted' : '') + (v.wob === c ? ' is-wob' : ''), 'shelf-' + c, self._t(key, { n: n }),
        '<span class="nc-shelfhead">' + self._icon(c) + '<span class="nc-colname">' + esc(self._colName(c)) + '</span></span>'
        + '<svg class="nc-shelfsvg nc-art" width="' + G.shelfW + '" height="' + H + '" viewBox="0 0 ' + G.shelfW + ' ' + H + '" aria-hidden="true">'
        + '<path class="nc-plank" d="M3 ' + (H - 1) + ' H' + (G.shelfW - 3) + '"/>' + arts[c].s + '</svg><span class="nc-chip" aria-hidden="true"></span>');
      b.style.width = G.shelfW + 'px';
      b.disabled = st.done;
      b.addEventListener('pointerdown', function (e) { self._dragStart(c, b, e); });
      b.addEventListener('pointermove', function (e) { self._dragMove(e); });
      b.addEventListener('pointerup', function (e) { self._dragEnd(c, e); });
      b.addEventListener('pointercancel', function () { self._holdStop(); self._drag = null; });
      b.addEventListener('keydown', function (e) { if (e.key === ' ' && e.shiftKey && c === 'O') { e.preventDefault(); self._slip('O', 5); } });
      b.addEventListener('click', function () {
        if (self._swallowed(b)) return;
        var h0 = self._hold, k = h0 && h0.col === c ? h0.n : 1; self._holdStop();
        self._shelf(c, k);
      });
      col.appendChild(b);
      /* ten loose pieces show the outline of the package they pack back into */
      var packCol = c === 'H' && st.shelves.T >= 10 ? 'T' : c === 'T' && st.shelves.O >= 10 ? 'O' : null;
      if (packCol && !st.done) {
        var ph = packCol === 'T' ? '<svg class="nc-art" viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="6" width="28" height="28" rx="3" class="nc-ghost"/><path d="M20 26 V14 M15 19 L20 14 L25 19" class="nc-ghostarrow"/></svg>'
          : '<svg class="nc-art" viewBox="0 0 60 30" aria-hidden="true"><rect x="4" y="10" width="52" height="10" rx="2" class="nc-ghost"/><path d="M30 28 V2 M25 7 L30 2 L35 7" class="nc-ghostarrow"/></svg>';
        var pk = self._btn('nc-pack', 'pack-' + packCol, self._t(packCol === 'T' ? 'aPackT' : 'aPackO'), ph);
        pk.addEventListener('click', function () { self._pack(packCol); });
        col.appendChild(pk);
      }
      el.appendChild(col);
    });
  },

  /* ---------- Tuck at the hatch ---------- */
  _paintHatch: function (G) {
    var el = this._qs('.nc-hatch'), s = G.tuck;
    el.className = 'nc-hatch' + (this._view.success ? ' is-hop' : '');
    el.innerHTML = '<svg class="nc-door nc-art" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M8 100 V40 Q8 6 50 6 Q92 6 92 40 V100 Z"/></svg>'
      + '<img class="nc-tuckimg" src="' + this._pic(NestedCratesCore.TUCK) + '" alt="" draggable="false" style="width:' + s + 'px;height:' + s + 'px">';
    el.style.width = (s + 16) + 'px'; el.style.height = (s + 8) + 'px';
  },

  /* ---------- the order slip ---------- */
  _paintSlip: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.nc-slip'), C = NestedCratesCore, full = C.slipFull(st);
    el.className = 'nc-slip' + (full ? ' is-full' : '') + (st.done ? ' is-sent' : '') + (v.slipPulse ? ' is-pulse' : '');
    el.innerHTML = '';
    var head = this.api.el('div', 'nc-sliphead');
    head.innerHTML = '<span class="nc-slipnum">' + st.b + '</span>';
    var back = this._btn('nc-back', 'slip-back', this._t('aBack'), '<svg class="nc-art" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6 L3 12 L9 18 M3 12 H15 Q21 12 21 18"/></svg>');
    back.disabled = st.done || !st.slip.log.length;
    back.addEventListener('click', function () { self._back(); });
    head.appendChild(back);
    el.appendChild(head);
    var rows = this.api.el('div', 'nc-sliprows'), kinds = C.COLS.filter(function (c) { return st.slip.need[c] > 0; }).length;
    C.COLS.forEach(function (c) {
      var need = st.slip.need[c], have = st.slip.have[c]; if (!need) return;
      var s = '', w = 0, h = 0;
      if (c === 'O') {
        var per = G.wide && kinds > 1 ? 3 : 5, cols = Math.min(per, need); w = cols * G.cellP - (G.cellP - G.cell); h = Math.ceil(need / per) * G.cellP - (G.cellP - G.cell);
        for (var i = 0; i < need; i++) { var x = (i % per) * G.cellP, y = Math.floor(i / per) * G.cellP; s += '<rect class="nc-cell' + (i < have ? ' is-on' : '') + '" x="' + x + '" y="' + y + '" width="' + G.cell + '" height="' + G.cell + '" rx="3"/>'; }
      } else if (c === 'T') {
        var bp = G.bcellT + 4; w = G.bcellL; h = need * bp - 4;
        for (var j = 0; j < need; j++) s += '<rect class="nc-cell' + (j < have ? ' is-on' : '') + '" x="0" y="' + (j * bp) + '" width="' + G.bcellL + '" height="' + G.bcellT + '" rx="2"/>';
      } else {
        var cp = G.ccell + 4; w = G.ccell; h = need * cp - 4;
        for (var k = 0; k < need; k++) s += '<rect class="nc-cell' + (k < have ? ' is-on' : '') + '" x="0" y="' + (k * cp) + '" width="' + G.ccell + '" height="' + G.ccell + '" rx="3"/>';
      }
      var b = self._btn('nc-sliprow is-' + c, 'slip-' + c, self._t('aSlip', { col: self._colName(c), have: have, need: need }),
        '<svg class="nc-slipsvg nc-art" width="' + (w + 4) + '" height="' + (h + 4) + '" viewBox="-2 -2 ' + (w + 4) + ' ' + (h + 4) + '" aria-hidden="true">' + s + '</svg><span class="nc-chip" aria-hidden="true"></span>');
      b.disabled = st.done;
      if (c === 'O') {
        b.addEventListener('pointerdown', function (e) { self._holdStart('O', b, e, 'slip'); });
        b.addEventListener('pointerleave', function () { if (self._hold && !self._hold.cap) self._holdStop(); });
        b.addEventListener('pointercancel', function () { self._holdStop(); });
      }
      b.addEventListener('click', function () { var h0 = self._hold, n = h0 && h0.col === c ? h0.n : 1; self._holdStop(); self._slip(c, n); });
      rows.appendChild(b);
    });
    el.appendChild(rows);
    if (full) { var stamp = this.api.el('span', 'nc-stamp'); stamp.innerHTML = '<svg class="nc-art" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16"/><path d="M12 21 L18 27 L29 14"/></svg>'; el.appendChild(stamp); }
  },

  /* ---------- the digit boxes, under the shelves ---------- */
  _paintBoxes: function (G) {
    var st = this.st, el = this._qs('.nc-boxes'), C = NestedCratesCore; el.innerHTML = '';
    el.style.gap = G.gap + 'px';
    el.setAttribute('aria-label', this._t('aTyped', { v: st.typed || '–' }));
    el.setAttribute('role', 'group');
    var left = String(C.value(st));
    C.COLS.forEach(function (c) {
      var d = C.boxDigit(st.typed, c), wrong = st.verdict && st.verdict.wrongs.indexOf(c) >= 0;
      var box = document.createElement('span');
      box.className = 'nc-box' + (wrong ? ' is-wrong' : '') + (st.done ? ' is-ok' : '');
      box.style.width = Math.min(G.wide ? 64 : 52, G.shelfW) + 'px'; box.style.height = G.boxH + 'px';
      box.textContent = d;
      if (wrong && st.help) { var p = document.createElement('span'); p.className = 'nc-pencil'; p.textContent = C.boxDigit(left, c) || '0'; box.appendChild(p); }
      var cell = document.createElement('span'); cell.className = 'nc-boxcell'; cell.style.width = G.shelfW + 'px'; cell.appendChild(box);
      el.appendChild(cell);
    });
  },

  /* ---------- the written subtraction (setting, or miss 2): strike-and-rewrite as the packages open ---------- */
  _paintWritten: function (G) {
    var st = this.st, el = this._qs('.nc-written'), C = NestedCratesCore;
    var help = !!(st.verdict && st.help), show = this._written() || help;
    el.style.display = show ? '' : 'none'; el.innerHTML = '';
    if (!show) return;
    var M = help ? C.truthMarks(st.a, st.b) : C.marks(st);
    var cell = function (x, cls) { return '<span class="nc-wcell' + (cls ? ' ' + cls : '') + '">' + x + '</span>'; };
    var row = function (cls, sign, cells) { return '<div class="nc-wrow ' + cls + '"><span class="nc-wsign">' + sign + '</span>' + cells.join('') + '</div>'; };
    var digits = function (n) { var s = String(n); return C.COLS.map(function (c) { return C.boxDigit(s, c); }); };
    /* mark rows: the second rewrite above the first; every mark but the last of its column is struck */
    var markRow = function (lvl) {
      return row('is-mark', '', C.COLS.map(function (c) {
        var ch = M[c], x = ch.length > lvl ? ch[lvl] : '';
        return cell(x === '' ? '' : String(x), x === '' ? '' : (lvl < ch.length - 1 ? 'is-struck is-new' : 'is-new'));
      }));
    };
    var top = digits(st.a);
    var h = markRow(2) + markRow(1)
      + row('', '', C.COLS.map(function (c, i) { return cell(top[i], M[c].length > 1 ? 'is-struck' : ''); }))
      + row('', '−', digits(st.b).map(function (d) { return cell(d); }))
      + '<div class="nc-wrule"></div>'
      + row('is-ans', '', C.COLS.map(function (c) { return cell(C.boxDigit(st.typed, c)); }));
    el.innerHTML = h;
  },

  /* ---------- the keypad + Check ---------- */
  _paintPad: function () {
    var st = this.st, self = this, pad = this._qs('.nc-pad'); pad.innerHTML = '';
    if (st.done) { pad.style.display = 'none'; return; }
    pad.style.display = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('nc-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.addEventListener('click', function () { self._tap(k); });
      pad.appendChild(b);
    });
    var c = this._btn('nc-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg>');
    c.addEventListener('click', function () { self._check(); });
    pad.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _clearMarks: function () { var v = this._view; v.note = ''; v.ok = ''; },
  _sayState: function () { var sr = this._qs && this._qs('.nc-sr'), s = this.st.shelves; if (sr) sr.textContent = this._t('aState', { h: s.H, t: s.T, o: s.O }); },
  /* a tap on a shelf: crates and boxes open, cubes go to the slip */
  _shelf: function (c, n) {
    if (c === 'O') { this._slip('O', n); return; }
    var st = this.st, v = this._view, r = NestedCratesCore.open(st, c);
    if (r.result === 'open') { this._clearMarks(); v.fresh = r.to; this.api.sound(c === 'H' ? 330 : 440); this._paint(); this._sayState(); return; }
    if (r.result === 'empty') { v.note = this._t('hintEmpty'); v.soft = true; }
    v.wob = c; this.api.sound(200); this._paint();
  },
  _slip: function (c, n) {
    var st = this.st, v = this._view, r = NestedCratesCore.toSlip(st, c, n);
    if (r.result === 'moved') { this._clearMarks(); this.api.sound(520 + Math.min(st.slip.log.length, 12) * 15); this._paint(); return; }
    if (r.result === 'air') { v.note = this._t('hintEmpty'); v.soft = true; v.wob = c; this.api.sound(180); this._paint(); return; }
    if (r.result === 'full') { v.slipPulse = true; this.api.sound(220); this._paint(); }
  },
  _back: function () { if (NestedCratesCore.fromSlip(this.st)) { this._clearMarks(); this.api.sound(300); this._paint(); } },
  _pack: function (c) { if (NestedCratesCore.pack(this.st, c)) { this._clearMarks(); this._view.fresh = null; this.api.sound(260); this._paint(); this._sayState(); } },
  _tap: function (k) { if (NestedCratesCore.type(this.st, k)) { this._clearMarks(); this.api.sound(660); this._paint(); } },
  _keyboard: function (e) {
    if (!this.st) return;
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._tap(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); this._tap('del'); }
    else if (e.key === 'Delete') { e.preventDefault(); this._back(); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view; if (st.done) return;
    var r = NestedCratesCore.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') {
      v.note = this._t(r.key); v.soft = r.key === 'hintType'; v.ok = '';
      if (r.key === 'hintTooMany') v.pulse = r.cols;
      if (r.key === 'hintSlip') v.slipPulse = true;
      this.api.sound(300); this._paint(); this.api.announce(v.note); return;
    }
    if (r.result === 'ok') { this._success(this._okLine()); return; }
    v.ok = ''; v.note = this._t(NestedCratesCore.hint(st)); v.soft = false;
    this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _okLine: function () { var st = this.st; return this._t(st.face === 'big' ? 'okBig' : 'okOnes', { a: st.a, b: st.b, c: NestedCratesCore.answer(st) }); },
  _success: function (msg) {
    var v = this._view;
    v.note = ''; v.ok = msg; v.success = true;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },

  /* ---------- press and hold: a handful of cubes, one more every 250 ms ---------- */
  _holdStart: function (c, b, e) {
    var self = this; this._holdStop();
    var h = { col: c, n: 1, chip: b.querySelector('.nc-chip'), cap: false };
    try { b.setPointerCapture(e.pointerId); h.cap = true; } catch (x) {}
    var max = Math.max(1, Math.min(this.st.shelves[c], this.st.slip.need[c] - this.st.slip.have[c]));
    var grow = function () { if (self._hold !== h || h.n >= max) return; h.n++; if (h.chip) { h.chip.textContent = h.n; h.chip.classList.add('is-on'); } h.t = setTimeout(grow, 250); };
    h.t = setTimeout(grow, 300);
    this._hold = h;
  },
  _holdStop: function () { var h = this._hold; if (h) { clearTimeout(h.t); if (h.chip) { h.chip.textContent = ''; h.chip.classList.remove('is-on'); } } this._hold = null; },
  /* ---------- a drag from a shelf: onto the slip fills it, onto the next shelf down opens the package ---------- */
  _dragStart: function (c, b, e) {
    this._drag = { col: c, x: e.clientX, y: e.clientY, moved: false, btn: b };
    if (c === 'O') this._holdStart('O', b, e); else { try { b.setPointerCapture(e.pointerId); } catch (x) {} }
  },
  _dragMove: function (e) {
    var d = this._drag; if (!d || d.moved) return;
    if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 14) { d.moved = true; this._holdStop(); }
  },
  _dragEnd: function (c, e) {
    var d = this._drag; this._drag = null;
    if (!d || !d.moved || d.col !== c) return;
    this._swallow = { btn: d.btn, until: Date.now() + 400 };
    var el = document.elementFromPoint(e.clientX, e.clientY), slip = el && el.closest && el.closest('.nc-slip'), shelf = el && el.closest && el.closest('.nc-shelf');
    var to = shelf ? shelf.getAttribute('data-k').slice(6) : null;
    if (slip) this._slip(c, 1);
    else if (to && to === (c === 'H' ? 'T' : c === 'T' ? 'O' : '')) this._shelf(c, 1);
    else if (to && to !== c) { this._view.wob = c; this.api.sound(160); this._paint(); }
  },
  _swallowed: function (b) { var s = this._swallow; this._swallow = null; return !!(s && s.btn === b && Date.now() < s.until); }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectNestedCratesCSS() {
  if (typeof document === 'undefined' || document.getElementById('nc-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WOOD = '#B9814B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.nc-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .nc-wrap:focus{outline:none;}'
  + '.nc-work{display:flex;gap:14px;align-items:flex-start;} .nc-wrap.is-wide .nc-work{flex-direction:row-reverse;} .nc-wrap.is-narrow .nc-work{flex-direction:column;gap:6px;}'
  + '.nc-order{display:flex;flex-direction:column;align-items:center;gap:8px;flex:0 0 auto;} .nc-wrap.is-wide .nc-order{width:200px;} .nc-wrap.is-narrow .nc-order{flex-direction:row;align-items:flex-end;justify-content:center;width:100%;gap:8px;}'
  + '.nc-room{display:flex;flex-direction:column;gap:6px;min-width:0;flex:1 1 auto;}'
  + '.nc-shelves{display:flex;justify-content:center;align-items:flex-start;} .nc-boxes{display:flex;justify-content:center;align-items:stretch;}'
  + '.nc-shelfcol{display:flex;flex-direction:column;align-items:center;gap:4px;}'
  + '.nc-shelf{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2.5px ' + WOOD + ';padding:6px 0 4px;cursor:pointer;touch-action:none;min-height:44px;}'
  + '.nc-shelf:disabled{cursor:default;} .nc-shelf:focus-visible,.nc-sliprow:focus-visible,.nc-back:focus-visible,.nc-pack:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.nc-shelfhead{display:flex;flex-direction:column;align-items:center;gap:1px;font-family:' + H + ';font-weight:800;font-size:16px;line-height:1.05;color:' + INK + ';} .nc-wrap.is-narrow .nc-shelfhead{font-size:13px;} .nc-wrap.is-cramp .nc-shelfhead{font-size:12px;}'
  + '.nc-colname{display:block;max-width:100%;overflow-wrap:anywhere;text-align:center;padding:0 2px;} .nc-ico{width:20px;height:20px;display:block;} .nc-wrap.is-narrow .nc-ico{width:15px;height:15px;} .nc-wrap.is-cramp .nc-ico{display:none;}'
  + '.nc-ico-p{fill:#F7A27E;stroke:' + INK + ';stroke-width:1.5;} .nc-ico-l{fill:#E58A63;stroke:' + INK + ';stroke-width:1.2;} .nc-ico-w{fill:#FFF4E8;stroke:' + INK + ';stroke-width:1;} .nc-ico-s{stroke:' + INK + ';stroke-width:1;opacity:.5;}'
  + '.nc-shelfsvg{display:block;overflow:visible;} .nc-plank{stroke:' + WOOD + ';stroke-width:3;stroke-linecap:round;}'
  + '.nc-shelf.is-pulse{animation:ncPulse .5s 3;} .nc-slip.is-pulse{animation:ncPulse .5s 3;} @keyframes ncPulse{50%{box-shadow:inset 0 0 0 4px #E0663A;}}'
  + '.nc-shelf.is-wob{animation:ncWob .4s 1;} .nc-wrap.is-fast .nc-shelf.is-wob{animation:none;}'
  + '.nc-shelf.is-counted{box-shadow:inset 0 0 0 3px #146B5E;}'
  + '.nc-chip{position:absolute;right:4px;top:4px;min-width:26px;height:26px;border-radius:13px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:16px;line-height:26px;text-align:center;display:none;} .nc-chip.is-on{display:block;}'
  + '.nc-body{fill:#F7A27E;stroke:#B9512A;stroke-width:1.6;} .nc-lid{fill:#E58A63;stroke:#B9512A;stroke-width:1.6;} .nc-pane{fill:#FFF4E8;stroke:#B9512A;stroke-width:1.2;} .nc-inside{stroke:#E58A63;stroke-width:1.2;}'
  + '.nc-seam{stroke:rgba(47,42,59,.35);stroke-width:1;fill:none;}'
  + '.nc-piece.is-new{animation:ncIn .4s ease-out both;} .nc-wrap.is-fast .nc-piece.is-new{animation:none;} @keyframes ncIn{0%{transform:translateY(-22px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.nc-lab{fill:#146B5E;} .nc-labt{font-family:' + H + ';font-weight:800;font-size:12px;fill:#fff;}'
  + '.nc-pack{width:100%;max-width:88px;height:44px;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4;padding:4px;cursor:pointer;} .nc-pack svg{width:100%;height:100%;display:block;} .nc-ghost{fill:none;stroke:#B9512A;stroke-width:2;stroke-dasharray:4 3;} .nc-ghostarrow{fill:none;stroke:#146B5E;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;}'
  + '.nc-hatch{position:relative;flex:0 0 auto;display:flex;align-items:flex-end;justify-content:center;} .nc-door{position:absolute;inset:0;width:100%;height:100%;fill:#E8DCC4;stroke:' + WOOD + ';stroke-width:3;} .nc-tuckimg{position:relative;display:block;object-fit:contain;}'
  + '.nc-hatch.is-hop .nc-tuckimg{animation:ncHop .5s ease-out 2;} .nc-wrap.is-fast .nc-hatch.is-hop .nc-tuckimg{animation:none;} @keyframes ncHop{40%{transform:translateY(-12px);}}'
  + '.nc-slip{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 8px 8px;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #E6DCC8;min-width:150px;} .nc-wrap.is-narrow .nc-slip{flex:1 1 auto;min-width:0;}'
  + '.nc-slip.is-full{box-shadow:inset 0 0 0 2.5px #2E9C88,0 3px 0 #E6DCC8;} .nc-slip.is-sent{animation:ncSent .6s ease-in forwards;} .nc-wrap.is-fast .nc-slip.is-sent{animation:none;} @keyframes ncSent{100%{transform:translateY(-8px);opacity:.55;}}'
  + '.nc-sliphead{display:flex;align-items:center;justify-content:center;width:100%;position:relative;min-height:44px;} .nc-slipnum{font-family:' + H + ';font-weight:800;font-size:36px;line-height:1;color:' + INK + ';} .nc-wrap.is-narrow .nc-slipnum{font-size:28px;}'
  + '.nc-back{position:absolute;right:-4px;top:0;width:44px;height:44px;border:0;border-radius:10px;background:transparent;padding:10px;cursor:pointer;} .nc-back svg{width:100%;height:100%;display:block;fill:none;stroke:#146B5E;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;} .nc-back:disabled{opacity:.3;cursor:default;}'
  + '.nc-sliprows{display:flex;align-items:flex-start;justify-content:center;gap:6px;}'
  + '.nc-sliprow{position:relative;display:flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;border:0;border-radius:8px;background:transparent;padding:4px;cursor:pointer;touch-action:none;} .nc-sliprow:disabled{cursor:default;}'
  + '.nc-cell{fill:#fff;stroke:#B9A88A;stroke-width:1.5;stroke-dasharray:3 2;} .nc-cell.is-on{fill:#F7A27E;stroke:#B9512A;stroke-dasharray:none;}'
  + '.nc-stamp{position:absolute;left:4px;top:4px;width:34px;height:34px;transform:rotate(-12deg);} .nc-stamp svg{width:100%;height:100%;display:block;} .nc-stamp circle{fill:none;stroke:#2E9C88;stroke-width:3;} .nc-stamp path{fill:none;stroke:#2E9C88;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;}'
  + '.nc-boxcell{display:flex;justify-content:center;}'
  + '.nc-box{position:relative;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #146B5E;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;color:' + INK + ';} .nc-wrap.is-narrow .nc-box{font-size:32px;}'
  + '.nc-box.is-wrong{box-shadow:inset 0 0 0 4px #E0663A;animation:ncWob .45s 1;} .nc-box.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#E6F3EE;} @keyframes ncWob{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.nc-pencil{position:absolute;right:-8px;top:-12px;font-size:18px;color:#8E8A98;background:#FFFDF6;border-radius:8px;padding:0 5px;box-shadow:0 0 0 1px #CDBFA4;line-height:1.3;}'
  + '.nc-written{align-self:center;display:flex;flex-direction:column;align-items:flex-end;padding:6px 14px;border-radius:10px;background:#fff;background-image:linear-gradient(#E8EEF3 1px,transparent 1px),linear-gradient(90deg,#E8EEF3 1px,transparent 1px);background-size:20px 20px;box-shadow:inset 0 0 0 2px #CDBFA4;font-family:' + H + ';font-weight:800;color:' + INK + ';}'
  + '.nc-wrow{display:flex;align-items:center;} .nc-wsign,.nc-wcell{display:inline-block;width:34px;height:36px;text-align:center;font-size:30px;line-height:36px;} .nc-wrap.is-narrow .nc-wsign,.nc-wrap.is-narrow .nc-wcell{width:28px;height:30px;font-size:24px;line-height:30px;}'
  + '.nc-wrow.is-mark .nc-wcell{height:22px;line-height:22px;font-size:17px;color:#146B5E;} .nc-wrap.is-narrow .nc-wrow.is-mark .nc-wcell{height:18px;line-height:18px;font-size:15px;}'
  + '.nc-wcell.is-struck{text-decoration:line-through;text-decoration-thickness:2.5px;text-decoration-color:#E0663A;} .nc-wrow.is-mark .nc-wcell.is-struck{color:#8E8A98;}'
  + '.nc-wrule{align-self:stretch;height:0;border-top:3px solid ' + INK + ';margin:2px 0;}'
  + '.nc-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .nc-wrap.is-narrow .nc-note{font-size:16px;line-height:1.25;} .nc-note:empty{display:none;} .nc-note.is-hint{color:#9A3D1C;}'
  + '.nc-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.nc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.nc-pad{display:grid;grid-template-columns:repeat(12,minmax(44px,1fr));gap:6px;} .nc-wrap.is-narrow .nc-pad{grid-template-columns:repeat(6,minmax(44px,1fr));} .nc-wrap.is-cramp .nc-pad{gap:4px;}'
  + '.nc-key,.nc-go{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;padding:0;} .nc-wrap.is-narrow .nc-key,.nc-wrap.is-narrow .nc-go{height:44px;}'
  + '.nc-go{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;} .nc-go svg{width:24px;height:24px;display:block;margin:0 auto;}'
  /* phones: the written subtraction under the keypad, so Check stays above the fold */
  + '.nc-wrap.is-narrow .nc-written{order:5;} .nc-wrap.is-cramp{gap:4px;} .nc-wrap.is-cramp .nc-work{gap:4px;} .nc-wrap.is-cramp .nc-room{gap:4px;} .nc-wrap.is-cramp .nc-shelf{padding:4px 0 2px;}';
  var st = document.createElement('style'); st.id = 'nc-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.NestedCratesActivity = NestedCratesActivity;
