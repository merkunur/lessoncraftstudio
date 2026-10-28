/* =====================================================================
   square-vice-activity.js — ACTIVITY #145 of the one-by-one rebuild:
   "Tuck Makes a Hundred" → THE SQUARE VICE (2.NBT.B.7; G2-203,
   G3-357/359/361/363; all 11 locales). Model: square-vice-core.js
   (SquareViceCore). Design: docs/activities-rebuild/designs/145-place-value-regroup.md
   ---------------------------------------------------------------------
   The invention: Tuck's vice only locks shut on a square. Behind its bed
   stands a gauge plate, a square ruled into ten stripes; a rod lying on
   the bed is exactly as long as the square is wide and one stripe thick.
   The child taps a bay to lay its pieces on the bed and cranks the jaw
   down: it stops on top of the stack, and the catch drops into the notch
   only when the stack is exactly ten high — the square covered, a
   hundred. Nine leave a bare stripe; eleven stick out over the top. Ten
   cubes lock into a rod the same way (the gauge turns into a rod's
   upright face). Cranking UP splits one rod or flat back into ten. The
   child types the total under the bays; Check refuses a bay too full for
   one digit. No timer, no score, no words on the apparatus.
   Test seams: window.SquareViceActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._geo / ._bay /
   ._bed / ._crank / ._crankUp / ._check / ._tap / .FAST / .OK_MS.
   ===================================================================== */
var SquareViceActivity = {
  id: 'square-vice',
  /* the drawn apparatus (the hierarchy gate): the vice, the bays and their blocks, the digit boxes, the written sum */
  apparatusClasses: ['sv-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Tuck Makes a Hundred","de":"Tuck bündelt einen Hunderter","fr":"Tuck fait une centaine","es":"Tuck forma una centena","pt":"Tuck forma uma centena","it":"Tuck forma un centinaio","nl":"Tuck maakt een honderdtal","sv":"Tuck gör ett hundratal","da":"Tuck laver en hundreder","no":"Tuck lager en hundrer","fi":"Tuck kokoaa satasen"},
    instruction: {"en":"Stack ten of a kind in the vice and crank it shut to make the next block. Then type the total.","de":"Leg zehn gleiche Teile in den Schraubstock und dreh ihn zu – so bündelst du sie zum nächsten Block. Dann tipp das Ergebnis ein.","fr":"Empile dix pièces pareilles dans l’étau et serre-le pour faire le bloc suivant. Puis tape le total.","es":"Apila diez piezas iguales en la prensa y ciérrala para formar el bloque siguiente. Luego escribe el total.","pt":"Empilhe dez peças iguais na morsa e feche a morsa para formar a peça seguinte. Depois digite o total.","it":"Impila dieci pezzi uguali nella morsa e stringila per formare il blocco successivo. Poi scrivi il totale.","nl":"Stapel tien gelijke blokjes in de bankschroef en draai hem dicht om ze in te wisselen voor het volgende blok. Typ dan de uitkomst.","sv":"Stapla tio likadana bitar i skruvstycket och skruva ihop det, så växlar du dem till nästa block. Skriv sedan summan.","da":"Stabl ti ens brikker i skruestikken, og skru den i, så veksler du dem til næste blok. Skriv så resultatet.","no":"Stable ti like brikker i skrustikka og skru den igjen, så veksler du dem til neste blokk. Skriv så summen.","fi":"Pinoa kymmenen samanlaista palaa ruuvipenkkiin ja kierrä se kiinni, niin vaihdat ne yhdeksi isommaksi palaksi. Kirjoita sitten summa."},
    hintType: {"en":"Type the total in the boxes.","de":"Tipp das Ergebnis in die Kästchen.","fr":"Tape le total dans les cases.","es":"Escribe el total en las casillas.","pt":"Digite o total nas casinhas.","it":"Scrivi il totale nelle caselle.","nl":"Typ de uitkomst in de vakjes.","sv":"Skriv summan i rutorna.","da":"Skriv resultatet i felterne.","no":"Skriv summen i rutene.","fi":"Kirjoita summa ruutuihin."},
    hintTooMany: {"en":"That column has too many to write with one digit — make the next block in the vice first.","de":"In dieser Spalte sind zu viele für eine Ziffer – bündle sie zuerst im Schraubstock.","fr":"Il y en a trop dans cette colonne pour un seul chiffre — fais d’abord l’échange dans l’étau.","es":"En esa columna hay demasiadas piezas para una sola cifra: primero reagrúpalas en la prensa.","pt":"Nessa coluna há peças demais para um só algarismo — primeiro agrupe-as na morsa.","it":"In quella colonna ci sono troppi pezzi per una sola cifra: prima fai il cambio nella morsa.","nl":"In die kolom liggen te veel blokjes voor één cijfer — wissel ze eerst in met de bankschroef.","sv":"I den kolumnen finns för många för en enda siffra – växla dem i skruvstycket först.","da":"Der er for mange i den kolonne til ét ciffer – veksl dem i skruestikken først.","no":"Det er for mange i den kolonnen til ett siffer – veksle dem i skrustikka først.","fi":"Siinä sarakkeessa on liian monta palaa yhdellä numerolla kirjoitettavaksi – vaihda ne ensin ruuvipenkissä."},
    hintCount: {"en":"Each box tells how many pieces lie above it.","de":"Jedes Kästchen sagt, wie viele Teile darüber liegen.","fr":"Chaque case dit combien de pièces sont au-dessus.","es":"Cada casilla dice cuántas piezas hay arriba de ella.","pt":"Cada casinha diz quantas peças há acima dela.","it":"Ogni casella dice quanti pezzi ci sono sopra.","nl":"Elk vakje zegt hoeveel blokjes erboven liggen.","sv":"Varje ruta säger hur många bitar som ligger ovanför den.","da":"Hvert felt fortæller, hvor mange brikker der ligger over det.","no":"Hver rute forteller hvor mange brikker som ligger over den.","fi":"Jokainen ruutu kertoo, montako palaa sen yläpuolella on."},
    hintShow: {"en":"Hundreds: {h} · Tens: {t} · Ones: {o}","de":"Hunderter: {h} · Zehner: {t} · Einer: {o}","fr":"Centaines : {h} · Dizaines : {t} · Unités : {o}","es":"Centenas: {h} · Decenas: {t} · Unidades: {o}","pt":"Centenas: {h} · Dezenas: {t} · Unidades: {o}","it":"Centinaia: {h} · Decine: {t} · Unità: {o}","nl":"Honderdtallen: {h} · Tientallen: {t} · Eenheden: {o}","sv":"Hundratal: {h} · Tiotal: {t} · Ental: {o}","da":"Hundreder: {h} · Tiere: {t} · Enere: {o}","no":"Hundrere: {h} · Tiere: {t} · Enere: {o}","fi":"Sadat: {h} · Kymmenet: {t} · Ykköset: {o}"},
    hintShort: {"en":"The stack doesn't reach the notch yet — the vice can't lock.","de":"Der Stapel reicht noch nicht bis zur Kerbe – der Schraubstock rastet nicht ein.","fr":"La pile n’atteint pas encore l’encoche : l’étau ne se bloque pas.","es":"La pila todavía no llega a la muesca: la prensa no se traba.","pt":"A pilha ainda não chega ao encaixe — a morsa não trava.","it":"La pila non arriva ancora alla tacca: la morsa non si blocca.","nl":"De stapel komt nog niet tot de inkeping — de bankschroef klikt niet vast.","sv":"Högen når inte upp till skåran än – skruvstycket låser sig inte.","da":"Stakken når ikke op til mærket endnu – skruestikken går ikke i hak.","no":"Stabelen når ikke opp til merket ennå – skrustikka går ikke i lås.","fi":"Pino ei vielä ylety loveen – ruuvipenkki ei lukitu."},
    hintTall: {"en":"The stack sticks out above the notch — take one off.","de":"Der Stapel ragt über die Kerbe hinaus – nimm eins weg.","fr":"La pile dépasse l’encoche : enlève une pièce.","es":"La pila sobresale de la muesca: quita una pieza.","pt":"A pilha passa do encaixe — tire uma peça.","it":"La pila supera la tacca: togli un pezzo.","nl":"De stapel steekt boven de inkeping uit — haal er een af.","sv":"Högen sticker upp över skåran – ta bort en bit.","da":"Stakken stikker op over mærket – tag en brik af.","no":"Stabelen stikker opp over merket – ta av en brikke.","fi":"Pino nousee loven yli – ota yksi pois."},
    okHundred: {"en":"{a} plus {b} makes {c} — ten tens locked into one hundred!","de":"{a} plus {b} ergibt {c} – zehn Zehner zu einem Hunderter gebündelt!","fr":"{a} plus {b}, ça fait {c} — dix dizaines serrées en une centaine !","es":"¡{a} más {b} son {c}: diez decenas forman una centena!","pt":"{a} mais {b} dá {c} — dez dezenas viraram uma centena!","it":"{a} più {b} fa {c}: dieci decine sono diventate un centinaio!","nl":"{a} plus {b} is {c} — tien tientallen ingewisseld voor één honderdtal!","sv":"{a} plus {b} blir {c} – tio tiotal växlade till ett hundratal!","da":"{a} plus {b} giver {c} – ti tiere vekslet til én hundreder!","no":"{a} pluss {b} blir {c} – ti tiere vekslet til én hundrer!","fi":"{a} plus {b} on {c} – kymmenestä kympistä tuli yksi satanen!"},
    okBoth: {"en":"{a} plus {b} makes {c} — ten ones locked into a ten, ten tens into a hundred!","de":"{a} plus {b} ergibt {c} – zehn Einer zu einem Zehner gebündelt, zehn Zehner zu einem Hunderter!","fr":"{a} plus {b}, ça fait {c} — dix unités serrées en une dizaine, dix dizaines en une centaine !","es":"¡{a} más {b} son {c}: diez unidades forman una decena y diez decenas, una centena!","pt":"{a} mais {b} dá {c} — dez unidades viraram uma dezena, e dez dezenas, uma centena!","it":"{a} più {b} fa {c}: dieci unità sono diventate una decina e dieci decine un centinaio!","nl":"{a} plus {b} is {c} — tien eenheden ingewisseld voor een tiental, tien tientallen voor een honderdtal!","sv":"{a} plus {b} blir {c} – tio ental växlade till ett tiotal, tio tiotal till ett hundratal!","da":"{a} plus {b} giver {c} – ti enere vekslet til én tier, ti tiere til én hundreder!","no":"{a} pluss {b} blir {c} – ti enere vekslet til én tier, ti tiere til én hundrer!","fi":"{a} plus {b} on {c} – kymmenestä ykkösestä tuli kymppi ja kymmenestä kympistä satanen!"},
    okNone: {"en":"{a} plus {b} makes {c} — nothing reached ten this time.","de":"{a} plus {b} ergibt {c} – diesmal musste nichts gebündelt werden.","fr":"{a} plus {b}, ça fait {c} — cette fois, pas besoin d’échange.","es":"¡{a} más {b} son {c}! Esta vez nada llegó a diez.","pt":"{a} mais {b} dá {c} — desta vez nada chegou a dez.","it":"{a} più {b} fa {c}: questa volta niente è arrivato a dieci.","nl":"{a} plus {b} is {c} — deze keer hoefde er niets ingewisseld te worden.","sv":"{a} plus {b} blir {c} – den här gången behövdes ingen växling.","da":"{a} plus {b} giver {c} – denne gang skulle der ikke veksles.","no":"{a} pluss {b} blir {c} – denne gangen kom ingenting opp i ti.","fi":"{a} plus {b} on {c} – tällä kertaa mikään ei yltänyt kymmeneen."},
    colH: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sadat"},
    colT: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmenet"},
    colO: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköset"},
    aBay: {"en":"{col}: {n}. Tap to put one in the vice.","de":"{col}: {n}. Tippen, um eins in den Schraubstock zu legen.","fr":"{col} : {n}. Touche pour en mettre une dans l’étau.","es":"{col}: {n}. Toca para poner una en la prensa.","pt":"{col}: {n}. Toque para pôr uma na morsa.","it":"{col}: {n}. Tocca per metterne uno nella morsa.","nl":"{col}: {n}. Tik om er een in de bankschroef te leggen.","sv":"{col}: {n}. Tryck för att lägga en i skruvstycket.","da":"{col}: {n}. Tryk for at lægge en i skruestikken.","no":"{col}: {n}. Trykk for å legge en i skrustikka.","fi":"{col}: {n}. Napauta, niin yksi siirtyy ruuvipenkkiin."},
    aBed: {"en":"In the vice: {n}. Tap to take the top one off.","de":"Im Schraubstock: {n}. Tippen, um das oberste wegzunehmen.","fr":"Dans l’étau : {n}. Touche pour enlever celle du dessus.","es":"En la prensa: {n}. Toca para quitar la de arriba.","pt":"Na morsa: {n}. Toque para tirar a de cima.","it":"Nella morsa: {n}. Tocca per togliere quello in cima.","nl":"In de bankschroef: {n}. Tik om de bovenste eraf te halen.","sv":"I skruvstycket: {n}. Tryck för att ta bort den översta.","da":"I skruestikken: {n}. Tryk for at tage den øverste af.","no":"I skrustikka: {n}. Trykk for å ta av den øverste.","fi":"Ruuvipenkissä: {n}. Napauta, niin ylin pala palaa takaisin."},
    aBedEmpty: {"en":"The vice is empty.","de":"Der Schraubstock ist leer.","fr":"L’étau est vide.","es":"La prensa está vacía.","pt":"A morsa está vazia.","it":"La morsa è vuota.","nl":"De bankschroef is leeg.","sv":"Skruvstycket är tomt.","da":"Skruestikken er tom.","no":"Skrustikka er tom.","fi":"Ruuvipenkki on tyhjä."},
    aCrank: {"en":"Crank the vice shut","de":"Schraubstock zudrehen","fr":"Serrer l’étau","es":"Cerrar la prensa","pt":"Fechar a morsa","it":"Stringere la morsa","nl":"De bankschroef dichtdraaien","sv":"Skruva ihop skruvstycket","da":"Skru skruestikken i","no":"Skru igjen skrustikka","fi":"Kierrä ruuvipenkki kiinni"},
    aCrankUp: {"en":"Crank the vice open: the piece splits into ten","de":"Schraubstock aufdrehen: Das Teil zerfällt in zehn","fr":"Desserrer l’étau : la pièce se défait en dix","es":"Abrir la prensa: la pieza se separa en diez","pt":"Abrir a morsa: a peça se separa em dez","it":"Allentare la morsa: il pezzo si divide in dieci","nl":"De bankschroef opendraaien: het blok valt uiteen in tien","sv":"Skruva upp skruvstycket: biten delas i tio","da":"Skru skruestikken op: brikken deles i ti","no":"Skru opp skrustikka: brikken deles i ti","fi":"Avaa ruuvipenkki: pala hajoaa kymmeneksi"},
    aLockT: {"en":"Locked: ten tens made one hundred.","de":"Eingerastet: Zehn Zehner sind ein Hunderter.","fr":"Bloqué : dix dizaines font une centaine.","es":"Trabada: diez decenas forman una centena.","pt":"Travou: dez dezenas formaram uma centena.","it":"Bloccata: dieci decine fanno un centinaio.","nl":"Vast: tien tientallen zijn één honderdtal.","sv":"Låst: tio tiotal blev ett hundratal.","da":"Låst: ti tiere blev til én hundreder.","no":"Låst: ti tiere ble til én hundrer.","fi":"Lukossa: kymmenestä kympistä tuli satanen."},
    aLockO: {"en":"Locked: ten ones made one ten.","de":"Eingerastet: Zehn Einer sind ein Zehner.","fr":"Bloqué : dix unités font une dizaine.","es":"Trabada: diez unidades forman una decena.","pt":"Travou: dez unidades formaram uma dezena.","it":"Bloccata: dieci unità fanno una decina.","nl":"Vast: tien eenheden zijn één tiental.","sv":"Låst: tio ental blev ett tiotal.","da":"Låst: ti enere blev til én tier.","no":"Låst: ti enere ble til én tier.","fi":"Lukossa: kymmenestä ykkösestä tuli kymppi."},
    aSplit: {"en":"Split back into ten.","de":"Wieder in zehn zerlegt.","fr":"Séparée de nouveau en dix.","es":"Separada otra vez en diez.","pt":"Separada de novo em dez.","it":"Di nuovo diviso in dieci.","nl":"Weer in tien uit elkaar gehaald.","sv":"Delad i tio igen.","da":"Delt i ti igen.","no":"Delt i ti igjen.","fi":"Hajosi taas kymmeneksi."},
    aTyped: {"en":"Total: {v}","de":"Ergebnis: {v}","fr":"Total : {v}","es":"Total: {v}","pt":"Total: {v}","it":"Totale: {v}","nl":"Uitkomst: {v}","sv":"Summa: {v}","da":"Resultat: {v}","no":"Sum: {v}","fi":"Summa: {v}"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setNumbers: {"en":"Numbers","de":"Zahlen","fr":"Nombres","es":"Números","pt":"Números","it":"Numeri","nl":"Getallen","sv":"Tal","da":"Tal","no":"Tall","fi":"Luvut"},
    nNone: {"en":"no trade needed","de":"ohne Bündeln","fr":"sans échange","es":"sin reagrupar","pt":"sem agrupar","it":"senza cambio","nl":"zonder inwisselen","sv":"utan växling","da":"uden veksling","no":"uten veksling","fi":"ilman vaihtoa"},
    nHundred: {"en":"tens make a hundred","de":"Zehner zum Hunderter","fr":"des dizaines à la centaine","es":"decenas a centena","pt":"dezenas viram centena","it":"dalle decine al centinaio","nl":"tientallen naar honderdtal","sv":"tiotal blir hundratal","da":"tiere bliver til hundreder","no":"tiere blir til hundrer","fi":"kympeistä satanen"},
    nBoth: {"en":"ones and tens both trade","de":"Einer und Zehner bündeln","fr":"échange des unités et des dizaines","es":"reagrupar unidades y decenas","pt":"agrupar unidades e dezenas","it":"cambio di unità e decine","nl":"eenheden én tientallen inwisselen","sv":"växla både ental och tiotal","da":"veksle både enere og tiere","no":"veksle både enere og tiere","fi":"sekä ykkösten että kymppien vaihto"},
    setWritten: {"en":"Written sum","de":"Schriftliche Rechnung","fr":"Opération posée","es":"Suma escrita","pt":"Conta armada","it":"Calcolo in colonna","nl":"Cijferend optellen","sv":"Uppställning","da":"Opstilling","no":"Oppstilling","fi":"Allekkain"},
    wHidden: {"en":"hidden","de":"aus","fr":"non","es":"no","pt":"não","it":"no","nl":"uit","sv":"dold","da":"skjult","no":"skjult","fi":"piilossa"},
    wShown: {"en":"shown","de":"an","fr":"oui","es":"sí","pt":"sim","it":"sì","nl":"aan","sv":"visas","da":"vist","no":"vist","fi":"näkyvissä"},
  },/*STRINGS-END*/
  defaults: { numbers: 'hundred', written: 'hidden' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'none', labelKey: 'nNone' }, { value: 'hundred', labelKey: 'nHundred' }, { value: 'both', labelKey: 'nBoth' }] },
    { key: 'written', type: 'choice', labelKey: 'setWritten', options: [{ value: 'hidden', labelKey: 'wHidden' }, { value: 'shown', labelKey: 'wShown' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._hold = null; this._h = null;
    injectSquareViceCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this._start(this.st.k); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _face: function () { return SquareViceCore.faceOf(this._setting('numbers')); },
  _written: function () { return this._setting('written') === 'shown'; },
  _key: function () { return this._face(); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _colName: function (c) { return this._t(c === 'H' ? 'colH' : c === 'T' ? 'colT' : 'colO'); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SquareViceCore.rounds(this._face()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SquareViceCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._face(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'square-vice.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the task line is the sum itself: numerals only */
  _taskLine: function () { var st = this.st; return st ? st.a + ' + ' + st.b + ' = ?' : ''; },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = SquareViceCore.newState(this._face(), k);
    this._view = { note: '', ok: '', soft: false, crank: null, press: null, fresh: null, pulse: null, wobble: false, success: false, split: null };
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
  _dims: function () { var W = this._width(), B = SquareViceCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sv-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="sv-work"><div class="sv-vicecol"><div class="sv-vice"></div><div class="sv-tuck"></div></div>'
      + '<div class="sv-mat"><div class="sv-bays"></div><div class="sv-boxes sv-art"></div></div></div>'
      + '<p class="sv-note" aria-live="polite"></p><div class="sv-written sv-art"></div><div class="sv-pad"></div><p class="sv-sr" aria-live="polite"></p>';
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
    var viceColW = wide ? 216 : 0, matW = wide ? D.W - viceColW - 14 : D.W, bayGap = wide ? 10 : 6;
    var bayW = Math.floor((matW - 2 * bayGap) / 3);
    var u = wide ? 14 : cramp ? 7 : 9, S = u * 10, pad = Math.round(u * 0.9), bedW = S + 2 * pad;
    var jawH = Math.round(u * 1.1) + 4, cross = cramp ? 34 : 40, jawTop0 = cross + 18, jawBot0 = jawTop0 + jawH, bedTop = jawBot0 + 12 * u + 4;
    var rodT = wide ? 14 : cramp ? 8 : 9, rodGap = cramp ? 2 : 3, inner = bayW - (wide ? 18 : 10);
    return {
      W: D.W, wide: wide, cramp: cramp, matW: matW, bayGap: bayGap, bayW: bayW,
      u: u, S: S, pad: pad, bedW: bedW, bx: 8, jawH: jawH, cross: cross, jawTop0: jawTop0, jawBot0: jawBot0, bedTop: bedTop,
      viceW: 8 + bedW + 6 + 12 + 8, viceH: bedTop + u + 4 + (cramp ? 6 : 10), screwX: 8 + bedW / 2, postX: 8 + bedW + 6,
      rodT: rodT, rodP: rodT + rodGap, rodL: Math.min(inner, 124), cube: wide ? 14 : cramp ? 10 : 11, cubeP: wide ? 17 : cramp ? 13 : 14,
      flatS: Math.min(wide ? 58 : cramp ? 34 : 46, Math.floor((inner - 4) / 2)), boxH: wide ? 60 : cramp ? 36 : 46,
      tuck: wide ? 96 : 64
    };
  },
  _paint_: function () {
    var st = this.st, D = this._dims(), G = this._geo(D), v = this._view;
    this._wrap.className = 'sv-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.face;
    this._paintVice(G); this._paintTuck(G); this._paintBays(G); this._paintBoxes(G); this._paintWritten(G); this._paintPad(G);
    var note = this._qs('.sv-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'sv-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'sv-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'sv-note'; }
    this._setPrompt();
    /* one-shot marks: they play on the paint that shows them, never on a later one */
    v.crank = null; v.press = null; v.fresh = null; v.split = null; v.wobble = false; v.pulse = null;
  },

  /* ---------- the pieces, drawn ---------- */
  _fill: function (src) { return src === 'made' ? 'is-made' : src === 'b' ? 'is-b' : 'is-a'; },
  _rod: function (x, y, L, t, src, cls) {
    var s = '<g class="sv-piece sv-rod ' + this._fill(src) + (cls ? ' ' + cls : '') + '"><rect x="' + x + '" y="' + y + '" width="' + L + '" height="' + t + '" rx="2"/>';
    for (var i = 1; i < 10; i++) s += '<path class="sv-seam" d="M' + (x + L * i / 10).toFixed(1) + ' ' + (y + 1.5) + ' V' + (y + t - 1.5) + '"/>';
    return s + '</g>';
  },
  _cube: function (x, y, c, src, cls) { return '<rect class="sv-piece sv-cube ' + this._fill(src) + (cls ? ' ' + cls : '') + '" x="' + x + '" y="' + y + '" width="' + c + '" height="' + c + '" rx="2"/>'; },
  _flat: function (x, y, s, src, cls) {
    var o = '<g class="sv-piece sv-flat ' + this._fill(src) + (cls ? ' ' + cls : '') + '"><rect x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="2"/>';
    for (var i = 1; i < 10; i++) { var p = (s * i / 10).toFixed(1); o += '<path class="sv-seam" d="M' + (x + +p) + ' ' + (y + 1.5) + ' V' + (y + s - 1.5) + ' M' + (x + 1.5) + ' ' + (y + +p) + ' H' + (x + s - 1.5) + '"/>'; }
    return o + '</g>';
  },
  _lab: function (x, y, txt, small) { var w = small ? 22 : 30; return '<rect class="sv-lab" x="' + (x - w / 2) + '" y="' + (y - 9) + '" width="' + w + '" height="18" rx="9"/><text class="sv-labt" x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle">' + txt + '</text>'; },

  /* ---------- Tuck's vice ---------- */
  _paintVice: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.sv-vice'), bed = st.bed, n = bed.pieces.length, s = '';
    var x0 = G.bx + G.pad, S = G.S, u = G.u, bt = G.bedTop, kindO = bed.kind === 'O' || (v.press && v.press.kind === 'O');
    /* the bench, the bed, the rail down to the bays */
    s += '<path class="sv-rail" d="M' + G.bx + ' ' + (bt + u + 4) + ' L0 ' + (bt + u + 16) + '"/>';
    s += '<rect class="sv-bench" x="2" y="' + (bt + u + 4) + '" width="' + (G.viceW - 4) + '" height="8" rx="3"/>';
    s += '<rect class="sv-post" x="' + G.postX + '" y="' + G.cross + '" width="12" height="' + (bt + u + 4 - G.cross) + '" rx="3"/>';
    /* the gauge plate: a square of ten stripes (or, for cubes, a rod's upright face of ten cells) */
    var gx = kindO ? x0 + S / 2 - u / 2 : x0, gw = kindO ? u : S, covered = v.crank ? v.crank.stop : n;
    s += '<rect class="sv-gauge" x="' + gx + '" y="' + (bt - S) + '" width="' + gw + '" height="' + S + '"/>';
    for (var i = 1; i < 10; i++) s += '<path class="sv-grid" d="M' + gx + ' ' + (bt - u * i) + ' H' + (gx + gw) + '"/>';
    if (!kindO) for (var j = 1; j < 10; j++) s += '<path class="sv-grid is-faint" d="M' + (gx + u * j) + ' ' + (bt - S) + ' V' + bt + '"/>';
    /* a short crank flashes the bare stripes: the gap is the missing pieces */
    if (v.crank && v.crank.result === 'short') s += '<rect class="sv-bare" x="' + gx + '" y="' + (bt - S) + '" width="' + gw + '" height="' + (S - covered * u) + '"/>';
    s += '<rect class="sv-bed" x="' + G.bx + '" y="' + bt + '" width="' + G.bedW + '" height="' + (u + 4) + '" rx="3"/>';
    /* the stack on the bed, bottom up */
    var over = v.crank && v.crank.result === 'tall';
    if (bed.kind === 'H') s += this._flat(x0, bt - S, S, bed.pieces[0], 'is-onbed');
    else bed.pieces.forEach(function (src, k) {
      var y = bt - (k + 1) * u, cls = over && k >= 10 ? 'is-over' : '';
      s += bed.kind === 'O' ? self._cube(gx, y, u, src, cls) : self._rod(x0, y, S, u, src, cls);
    });
    /* a lock: the ten pieces press into one cream-gold block, which slides off down the rail */
    if (v.press) {
      var ps = '<g class="sv-press">';
      v.press.srcs.forEach(function (src, k) { var y = bt - (k + 1) * u; ps += v.press.kind === 'O' ? self._cube(gx, y, u, src, '') : self._rod(x0, y, S, u, src, ''); });
      ps += '</g><g class="sv-made">' + (v.press.kind === 'O' ? '<rect class="sv-piece is-made" x="' + gx + '" y="' + (bt - S) + '" width="' + u + '" height="' + S + '" rx="2"/>' : this._flat(x0, bt - S, S, 'made', '')) + '</g>';
      s += ps;
    }
    /* the notch: one tick on the post, exactly at the top of the square */
    s += '<path class="sv-notch" d="M' + (G.postX - 1) + ' ' + (bt - S) + ' h7"/>';
    /* the jaw, its screw and its catch, at rest open; a crank plays the stroke once */
    var stop = v.crank ? v.crank.stop : 0, dy = v.crank ? Math.max(0, bt - stop * u - G.jawBot0) : 0, locked = v.crank && v.crank.result === 'lock';
    var catchY = G.jawBot0 - 4, sh = G.jawTop0 - (G.cross - 28);
    s += '<rect class="sv-screw' + (v.crank ? ' is-crank is-' + v.crank.result : '') + '" style="--sv-sc:' + ((sh + dy) / sh).toFixed(3) + '" x="' + (G.screwX - 4) + '" y="' + (G.cross - 28) + '" width="8" height="' + sh + '"/>';
    s += '<g class="sv-jaw' + (v.crank ? ' is-crank is-' + v.crank.result : '') + '" style="--sv-stop:' + dy + 'px">'
            + '<rect class="sv-jawbar" x="' + G.bx + '" y="' + G.jawTop0 + '" width="' + (G.bedW + 6) + '" height="' + G.jawH + '" rx="3"/>'
      + '<path class="sv-catch' + (locked ? ' is-in' : '') + '" d="M' + (G.postX - 2) + ' ' + (catchY - 5) + ' l9 5 l-9 5 z"/></g>';
    /* the crossbar and the T-handle stay on top */
    s += '<rect class="sv-cross" x="' + (G.screwX - 22) + '" y="' + G.cross + '" width="' + (G.postX + 12 - G.screwX + 22) + '" height="12" rx="3"/>';
    s += '<g class="sv-handle' + (v.crank ? ' is-turn' : '') + '"><rect x="' + (G.screwX - 30) + '" y="6" width="60" height="12" rx="6"/><rect x="' + (G.screwX - 6) + '" y="6" width="12" height="' + (G.cross - 4) + '" rx="4"/></g>';
    el.style.width = G.viceW + 'px'; el.style.height = G.viceH + 'px';
    el.innerHTML = '<svg class="sv-svg sv-art" width="' + G.viceW + '" height="' + G.viceH + '" viewBox="0 0 ' + G.viceW + ' ' + G.viceH + '" aria-hidden="true">' + s + '</svg>';
    /* the controls over the drawing: the handle, the crank-up arrow, the bed */
    var cr = this._btn('sv-crank', 'crank', this._t('aCrank'), '');
    cr.style.left = (G.screwX - 32) + 'px'; cr.style.top = '2px';
    cr.disabled = st.done || !n || bed.kind === 'H';
    cr.addEventListener('pointerdown', function (e) { self._crankDown_(e); });
    cr.addEventListener('pointermove', function (e) { self._crankMove(e); });
    cr.addEventListener('click', function () { if (self._h && self._h.moved) { self._h = null; return; } self._h = null; self._crank(); });
    el.appendChild(cr);
    var up = this._btn('sv-up', 'crank-up', this._t('aCrankUp'), '<svg class="sv-art" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 L19 12 H14.5 V20 H9.5 V12 H5 Z"/></svg>');
    up.style.left = (G.screwX + 34) + 'px'; up.style.top = '0px';
    up.disabled = st.done || n !== 1 || !SquareViceCore.DOWN[bed.kind];
    up.addEventListener('click', function () { self._crankUp(); });
    el.appendChild(up);
    var bb = this._btn('sv-bedbtn', 'bed', n ? this._t('aBed', { n: n }) : this._t('aBedEmpty'), '');
    bb.style.left = G.bx + 'px'; bb.style.top = (G.jawBot0 + 2) + 'px'; bb.style.width = G.bedW + 'px'; bb.style.height = (bt + u + 4 - G.jawBot0 - 2) + 'px';
    bb.disabled = st.done || !n;
    bb.addEventListener('click', function () { self._bed(); });
    el.appendChild(bb);
  },
  _paintTuck: function (G) {
    var el = this._qs('.sv-tuck'), s = G.tuck;
    el.className = 'sv-tuck' + (this._view.success ? ' is-hop' : '');
    el.innerHTML = '<img class="sv-tuckimg" src="' + this._pic(SquareViceCore.TUCK) + '" alt="" draggable="false" style="width:' + s + 'px;height:' + s + 'px">';
  },

  /* ---------- the mat: three bays ---------- */
  _icon: function (c) {
    if (c === 'H') return '<svg class="sv-ico sv-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="2" class="sv-ico-p"/><path d="M7.3 2v16M12.7 2v16M2 7.3h16M2 12.7h16" class="sv-ico-l"/></svg>';
    if (c === 'T') return '<svg class="sv-ico sv-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="1" y="7" width="18" height="6" rx="1.5" class="sv-ico-p"/><path d="M5.5 7v6M10 7v6M14.5 7v6" class="sv-ico-l"/></svg>';
    return '<svg class="sv-ico sv-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="6" y="6" width="8" height="8" rx="1.5" class="sv-ico-p"/></svg>';
  },
  _paintBays: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.sv-bays'); el.innerHTML = '';
    el.style.gap = G.bayGap + 'px';
    var labels = st.verdict ? st.verdict.wrongs : [];
    SquareViceCore.COLS.forEach(function (c) {
      var list = st.bays[c], n = list.length, inner = G.bayW - (G.wide ? 18 : 10), s = '', h = 0;
      var lab = labels.indexOf(c) >= 0, fresh = v.fresh === c, step = SquareViceCore.VAL[c];
      if (c === 'H') {
        /* two piles of flats; on a phone each flat overlaps the one before it, like a real stack */
        var fs = G.flatS, fp = fs + 4, fx = (G.bayW - (2 * fs + 4)) / 2, dy = G.wide ? fp : Math.round(fs * 0.42), labs = '';
        list.forEach(function (src, i) {
          var x = fx + (i % 2) * fp, lv = Math.floor(i / 2), y = 4 + lv * dy, top = i + 2 < n;
          s += self._flat(x, y, fs, src, fresh && i === n - 1 ? 'is-new' : '');
          if (lab) labs += self._lab(x + fs / 2, top && !G.wide ? y + dy / 2 : y + fs / 2, (i + 1) * step);
        });
        s += labs;
        h = n ? 4 + (Math.ceil(n / 2) - 1) * dy + fs + (G.wide ? 4 : 0) : 4;
      } else if (c === 'T') {
        var rx = (G.bayW - G.rodL) / 2, rp = G.wide || n <= 11 ? G.rodP : G.cramp ? G.rodT + 0.5 : G.rodP - 1; /* a full column packs a little tighter on a phone */
        list.forEach(function (src, i) { var y = 4 + i * rp; s += self._rod(rx, y, G.rodL, G.rodT, src, fresh && i === n - 1 ? 'is-new' : ''); if (lab) s += self._lab(rx + G.rodL / 2, y + G.rodT / 2, (i + 1) * step, true); });
        h = 4 + n * rp;
      } else {
        var cx = (G.bayW - (5 * G.cubeP - 3)) / 2;
        list.forEach(function (src, i) { var x = cx + (i % 5) * G.cubeP, y = 4 + Math.floor(i / 5) * G.cubeP; s += self._cube(x, y, G.cube, src, fresh && i === n - 1 ? 'is-new' : ''); if (lab && (i % 5 === 4 || i === n - 1)) s += self._lab(cx + 5 * G.cubeP + 10, y + G.cube / 2, i + 1, true); });
        h = 4 + Math.ceil(n / 5) * G.cubeP;
      }
      h = Math.max(h + 4, G.wide ? 60 : 44);
      var pulse = v.pulse && v.pulse.indexOf(c) >= 0;
      var b = self._btn('sv-bay is-' + c + (pulse ? ' is-pulse' : '') + (lab ? ' is-counted' : ''), 'bay-' + c, self._t('aBay', { col: self._colName(c), n: n }),
        '<span class="sv-bayhead">' + self._icon(c) + '<span class="sv-colname">' + esc(self._colName(c)) + '</span></span>'
        + '<svg class="sv-baysvg sv-art" width="' + G.bayW + '" height="' + h + '" viewBox="0 0 ' + G.bayW + ' ' + h + '" aria-hidden="true">' + s + '</svg><span class="sv-chip" aria-hidden="true"></span>');
      b.style.width = G.bayW + 'px';
      b.disabled = st.done || !n || (st.bed.kind && st.bed.kind !== c) || (c === 'H' && st.bed.pieces.length > 0);
      b.addEventListener('pointerdown', function (e) { self._holdStart(c, b, e); });
      b.addEventListener('pointerleave', function () { if (self._hold && self._hold.col === c && !self._hold.cap) self._holdStop(); });
      b.addEventListener('pointercancel', function () { self._holdStop(); });
      b.addEventListener('keydown', function (e) { if (e.key === ' ' && e.shiftKey) { e.preventDefault(); self._bay(c, 5); } });
      b.addEventListener('click', function () { var h0 = self._hold, k = h0 && h0.col === c ? h0.n : 1; self._holdStop(); self._bay(c, k); });
      el.appendChild(b);
    });
  },
  /* press and hold a bay: a handful counter grows, one more every 250 ms */
  _holdStart: function (c, b, e) {
    var self = this; this._holdStop();
    var h = { col: c, n: 1, chip: b.querySelector('.sv-chip'), cap: false };
    try { b.setPointerCapture(e.pointerId); h.cap = true; } catch (x) {}
    var max = Math.max(1, Math.min(this.st.bays[c].length, c === 'H' ? 1 : SquareViceCore.BED_MAX - this.st.bed.pieces.length));
    var grow = function () { if (self._hold !== h || h.n >= max) return; h.n++; if (h.chip) { h.chip.textContent = h.n; h.chip.classList.add('is-on'); } h.t = setTimeout(grow, 250); };
    h.t = setTimeout(grow, 300);
    this._hold = h;
  },
  _holdStop: function () { var h = this._hold; if (h) { clearTimeout(h.t); if (h.chip) { h.chip.textContent = ''; h.chip.classList.remove('is-on'); } } this._hold = null; },

  /* ---------- the digit boxes, under the bays ---------- */
  _paintBoxes: function (G) {
    var st = this.st, el = this._qs('.sv-boxes'), v = this._view; el.innerHTML = '';
    el.style.gap = G.bayGap + 'px';
    el.setAttribute('aria-label', this._t('aTyped', { v: st.typed || '–' }));
    el.setAttribute('role', 'group');
    var lying = String(SquareViceCore.value(st));
    SquareViceCore.COLS.forEach(function (c) {
      var d = SquareViceCore.boxDigit(st.typed, c), wrong = st.verdict && st.verdict.wrongs.indexOf(c) >= 0;
      var box = document.createElement('span');
      box.className = 'sv-box' + (wrong ? ' is-wrong' : '') + (st.done ? ' is-ok' : '');
      box.style.width = Math.min(G.wide ? 64 : 52, G.bayW) + 'px'; box.style.height = G.boxH + 'px';
      box.textContent = d;
      if (wrong && st.help) { var p = document.createElement('span'); p.className = 'sv-pencil'; p.textContent = SquareViceCore.boxDigit(lying, c) || '0'; box.appendChild(p); }
      var cell = document.createElement('span'); cell.className = 'sv-boxcell'; cell.style.width = G.bayW + 'px'; cell.appendChild(box);
      el.appendChild(cell);
    });
  },

  /* ---------- the written sum (setting, or miss 2) ---------- */
  _paintWritten: function (G) {
    var st = this.st, el = this._qs('.sv-written'), loc = (this.api && this.api.locale) || (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
    var show = this._written() || (st.verdict && st.help);
    el.style.display = show ? '' : 'none'; el.innerHTML = '';
    if (!show) return;
    var C = SquareViceCore, need = C.needs(st.a, st.b), help = st.verdict && st.help;
    var mark = function (c) { return C.carry(st, c) || (help && ((c === 'T' && need.O) || (c === 'H' && need.T))) ? '1' : ''; };
    var row = function (cls, sign, cells) { return '<div class="sv-wrow ' + cls + '"><span class="sv-wsign">' + sign + '</span>' + cells.map(function (x) { return '<span class="sv-wcell">' + x + '</span>'; }).join('') + '</div>'; };
    var digits = function (n) { var s = String(n); return C.COLS.map(function (c) { return C.boxDigit(s, c); }); };
    var carryRow = '<div class="sv-wrow is-carry"><span class="sv-wsign"></span>' + C.COLS.map(function (c) { return '<span class="sv-wcell">' + (c === 'O' ? '' : '<span class="sv-carry' + (mark(c) ? ' is-on' : '') + '">' + mark(c) + '</span>') + '</span>'; }).join('') + '</div>';
    var de = String(loc).slice(0, 2) === 'de';
    var h = (de ? '' : carryRow) + row('', '', digits(st.a)) + row('', '+', digits(st.b)) + (de ? carryRow : '') + '<div class="sv-wrule"></div>' + row('is-ans', '', C.COLS.map(function (c) { return C.boxDigit(st.typed, c); }));
    el.innerHTML = h; el.className = 'sv-written sv-art' + (de ? ' is-de' : '');
  },

  /* ---------- the keypad + Check ---------- */
  _paintPad: function (G) {
    var st = this.st, self = this, pad = this._qs('.sv-pad'); pad.innerHTML = '';
    if (st.done) { pad.style.display = 'none'; return; }
    pad.style.display = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('sv-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.addEventListener('click', function () { self._tap(k); });
      pad.appendChild(b);
    });
    var c = this._btn('sv-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg><span class="sv-golab">' + esc(this._t('checkBtn')) + '</span>');
    c.addEventListener('click', function () { self._check(); });
    pad.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _clearMarks: function () { var v = this._view; v.note = ''; v.ok = ''; },
  _say: function (k) { var sr = this._qs && this._qs('.sv-sr'); if (sr) sr.textContent = this._t(k); },
  _bay: function (c, n) {
    var st = this.st, k = SquareViceCore.load(st, c, n);
    if (!k) { this.api.sound(220); return; }
    this._clearMarks(); this.api.sound(380 + Math.min(st.bed.pieces.length, 12) * 20); this._paint();
  },
  _bed: function () { if (SquareViceCore.unload(this.st)) { this._clearMarks(); this.api.sound(300); this._paint(); } },
  _crank: function () {
    var st = this.st, v = this._view, srcs = st.bed.pieces.slice(), kind = st.bed.kind, r = SquareViceCore.crankDown(st);
    if (r.result === 'none') { this.api.sound(220); return; }
    this._clearMarks();
    v.crank = { result: r.result, stop: r.stop };
    if (r.result === 'lock') {
      v.press = { kind: kind, srcs: srcs }; v.fresh = r.to;
      this.api.sound(180); this._later(function () {}, 0);
      this._say(kind === 'O' ? 'aLockO' : 'aLockT');
    } else {
      v.note = this._t(r.result === 'short' ? 'hintShort' : 'hintTall'); v.soft = true;
      this.api.sound(r.result === 'short' ? 260 : 320);
    }
    this._paint();
  },
  _crankUp: function () {
    var r = SquareViceCore.crankUp(this.st);
    if (r.result !== 'split') { this.api.sound(220); return; }
    this._clearMarks(); this._view.fresh = r.to; this.api.sound(500); this._say('aSplit'); this._paint();
  },
  _tap: function (k) { if (SquareViceCore.type(this.st, k)) { this._clearMarks(); this.api.sound(660); this._paint(); } },
  _keyboard: function (e) {
    if (!this.st) return;
    var onCrank = e.target && e.target.getAttribute && e.target.getAttribute('data-k') === 'crank';
    if (onCrank && e.key === 'Enter' && e.shiftKey) { e.preventDefault(); this._crankUp(); return; }
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._tap(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); this._tap('del'); }
    else if (e.key === 'Delete') { e.preventDefault(); this._bed(); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view; if (st.done) return;
    var r = SquareViceCore.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') {
      v.note = this._t(r.key); v.soft = r.key === 'hintType'; v.ok = '';
      if (r.key === 'hintTooMany') v.pulse = r.cols;
      this.api.sound(300); this._paint(); this.api.announce(v.note); return;
    }
    if (r.result === 'ok') { this._success(this._okLine()); return; }
    v.ok = '';
    var k = SquareViceCore.hint(st), lying = String(SquareViceCore.value(st)), D = function (c) { return SquareViceCore.boxDigit(lying, c) || '0'; };
    v.note = k === 'hintShow' ? this._t(k, { h: D('H'), t: D('T'), o: D('O') }) : this._t(k); v.soft = false;
    this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _okLine: function () {
    var st = this.st, k = st.face === 'both' ? 'okBoth' : st.face === 'none' ? 'okNone' : 'okHundred';
    return this._t(k, { a: st.a, b: st.b, c: SquareViceCore.total(st) });
  },
  _success: function (msg) {
    var v = this._view;
    v.note = ''; v.ok = msg; v.success = true;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },
  /* the handle: a drag of 40 px down cranks shut, 40 px up cranks open; a tap is one crank shut */
  _crankDown_: function (e) { this._h = { y: e.clientY, moved: false }; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) {} },
  _crankMove: function (e) {
    var h = this._h; if (!h || h.moved) return;
    var dy = e.clientY - h.y;
    if (dy >= 40) { h.moved = true; this._crank(); }
    else if (dy <= -40) { h.moved = true; this._crankUp(); }
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectSquareViceCSS() {
  if (typeof document === 'undefined' || document.getElementById('sv-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', STEEL = '#7C8794', STEELD = '#4E5864', WOOD = '#B9814B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sv-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .sv-wrap:focus{outline:none;}'
  + '.sv-work{display:flex;gap:14px;align-items:flex-start;} .sv-wrap.is-wide .sv-work{flex-direction:row-reverse;} .sv-wrap.is-narrow .sv-work{flex-direction:column;gap:6px;}'
  + '.sv-vicecol{display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto;} .sv-wrap.is-wide .sv-vicecol{width:216px;} .sv-wrap.is-narrow .sv-vicecol{flex-direction:row;align-items:flex-end;justify-content:center;width:100%;gap:10px;}'
  + '.sv-vice{position:relative;flex:0 0 auto;} .sv-svg{position:absolute;left:0;top:0;display:block;overflow:visible;}'
  + '.sv-mat{display:flex;flex-direction:column;gap:6px;min-width:0;flex:1 1 auto;}'
  + '.sv-bays,.sv-boxes{display:flex;justify-content:center;align-items:stretch;}'
  + '.sv-bay{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2.5px #CDBFA4;padding:6px 0 4px;cursor:pointer;touch-action:none;min-height:44px;}'
  + '.sv-bay:disabled{cursor:default;} .sv-bay:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.sv-bayhead{display:flex;flex-direction:column;align-items:center;gap:1px;font-family:' + H + ';font-weight:800;font-size:16px;line-height:1.05;color:' + INK + ';} .sv-wrap.is-narrow .sv-bayhead{font-size:13px;} .sv-wrap.is-cramp .sv-bayhead{font-size:12px;}'
  + '.sv-colname{display:block;max-width:100%;overflow-wrap:anywhere;text-align:center;padding:0 2px;} .sv-ico{width:20px;height:20px;display:block;} .sv-wrap.is-narrow .sv-ico{width:15px;height:15px;} .sv-ico-p{fill:#F7D6C6;stroke:' + INK + ';stroke-width:1.5;} .sv-ico-l{stroke:' + INK + ';stroke-width:1;opacity:.5;}'
  + '.sv-baysvg{display:block;overflow:visible;}'
  + '.sv-bay.is-pulse{animation:svPulse .5s 3;} @keyframes svPulse{50%{box-shadow:inset 0 0 0 4px #E0663A;}}'
  + '.sv-bay.is-counted{box-shadow:inset 0 0 0 3px #146B5E;}'
  + '.sv-chip{position:absolute;right:4px;top:4px;min-width:26px;height:26px;border-radius:13px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:16px;line-height:26px;text-align:center;display:none;} .sv-chip.is-on{display:block;}'
  + '.sv-piece rect,.sv-piece.sv-cube,.sv-piece > rect{stroke-width:1.6;} .sv-piece.is-a rect,.sv-cube.is-a{fill:#F7A27E;stroke:#B9512A;} .sv-piece.is-b rect,.sv-cube.is-b{fill:#7CC9B8;stroke:#1E6E60;} .sv-piece.is-made rect,.sv-cube.is-made,rect.is-made{fill:#F3D27A;stroke:#A87A1E;}'
  + '.sv-seam{stroke:rgba(47,42,59,.35);stroke-width:1;fill:none;} .sv-made .sv-seam{opacity:.25;}'
  + '.sv-piece.is-new{animation:svIn .45s ease-out .85s both;} .sv-wrap.is-fast .sv-piece.is-new{animation:none;} @keyframes svIn{0%{transform:translateY(-26px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.sv-lab{fill:#146B5E;} .sv-labt{font-family:' + H + ';font-weight:800;font-size:12px;fill:#fff;}'
  + '.sv-bench{fill:' + WOOD + ';stroke:' + INK + ';stroke-width:2;} .sv-rail{stroke:' + STEELD + ';stroke-width:4;stroke-linecap:round;fill:none;}'
  + '.sv-post,.sv-cross{fill:' + STEEL + ';stroke:' + INK + ';stroke-width:2;} .sv-bed{fill:' + STEELD + ';stroke:' + INK + ';stroke-width:2;}'
  + '.sv-gauge{fill:#FFF8E8;stroke:#C9B48E;stroke-width:1.6;} .sv-grid{stroke:#D9C9A6;stroke-width:1.2;} .sv-grid.is-faint{stroke:#EBDFC6;stroke-width:1;}'
  + '.sv-bare{fill:#F2784B;opacity:.25;animation:svBare 1s ease-out;} .sv-wrap.is-fast .sv-bare{animation:none;opacity:.45;} @keyframes svBare{20%,70%{opacity:.55;}100%{opacity:.25;}}'
  + '.sv-piece.is-over rect,.sv-cube.is-over{fill:#F2784B;stroke:#9A3D1C;}'
  + '.sv-notch{stroke:' + INK + ';stroke-width:3;stroke-linecap:round;}'
  + '.sv-jawbar{fill:' + STEEL + ';stroke:' + INK + ';stroke-width:2;} .sv-screw{fill:#B7BEC6;stroke:' + INK + ';stroke-width:1.5;} .sv-catch{fill:#E9B92E;stroke:' + INK + ';stroke-width:1.5;}'
  + '.sv-handle rect{fill:#146B5E;stroke:#0E4D44;stroke-width:2;}'
  + '.sv-jaw.is-crank{animation:svStroke 1s ease-in-out;} .sv-jaw.is-lock{animation:svLock 1.2s ease-in-out;} .sv-wrap.is-fast .sv-jaw,.sv-wrap.is-fast .sv-screw{animation:none !important;}'
  + '.sv-screw{transform-box:fill-box;transform-origin:50% 0;} .sv-screw.is-crank{animation:svScrew 1s ease-in-out;} .sv-screw.is-lock{animation:svScrewL 1.2s ease-in-out;}'
  + '@keyframes svScrew{0%{transform:scaleY(1);}40%,62%{transform:scaleY(var(--sv-sc));}100%{transform:scaleY(1);}} @keyframes svScrewL{0%{transform:scaleY(1);}35%,70%{transform:scaleY(var(--sv-sc));}100%{transform:scaleY(1);}}'
  + '@keyframes svStroke{0%{transform:translateY(0);}40%,62%{transform:translateY(var(--sv-stop));}100%{transform:translateY(0);}}'
  + '@keyframes svLock{0%{transform:translateY(0);}35%,70%{transform:translateY(var(--sv-stop));}100%{transform:translateY(0);}}'
  + '.sv-catch.is-in{fill:#2E9C88;}'
  + '.sv-press{animation:svGone 1.2s linear both;} @keyframes svGone{0%,45%{opacity:1;}55%,100%{opacity:0;}}'
  + '.sv-made{opacity:0;animation:svMade 1.2s ease-in both;} @keyframes svMade{0%,45%{opacity:0;transform:none;}55%,72%{opacity:1;transform:none;}100%{opacity:0;transform:translate(-40px,30px);}}'
  + '.sv-wrap.is-fast .sv-press,.sv-wrap.is-fast .sv-made{animation:none;opacity:0;}'
  + '.sv-handle.is-turn{animation:svTurn .5s ease-in-out 2;transform-box:fill-box;transform-origin:50% 50%;} @keyframes svTurn{50%{transform:scaleX(.35);}} .sv-wrap.is-fast .sv-handle{animation:none;}'
  + '.sv-crank{position:absolute;width:64px;height:44px;border:0;background:transparent;border-radius:12px;cursor:ns-resize;touch-action:none;padding:0;} .sv-crank:focus-visible,.sv-bedbtn:focus-visible,.sv-up:focus-visible{outline:3px solid #146B5E;}'
  + '.sv-crank:disabled{cursor:default;}'
  + '.sv-up{position:absolute;width:44px;height:44px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4;padding:9px;cursor:pointer;} .sv-up svg{width:100%;height:100%;display:block;fill:#146B5E;} .sv-up:disabled{opacity:.35;cursor:default;}'
  + '.sv-bedbtn{position:absolute;border:0;background:transparent;border-radius:8px;padding:0;cursor:pointer;} .sv-bedbtn:disabled{cursor:default;}'
  + '.sv-tuck{flex:0 0 auto;} .sv-tuckimg{display:block;object-fit:contain;} .sv-tuck.is-hop .sv-tuckimg{animation:svHop .5s ease-out 2;} .sv-wrap.is-fast .sv-tuck.is-hop .sv-tuckimg{animation:none;} @keyframes svHop{40%{transform:translateY(-12px);}}'
  + '.sv-boxcell{display:flex;justify-content:center;}'
  + '.sv-box{position:relative;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #146B5E;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;color:' + INK + ';} .sv-wrap.is-narrow .sv-box{font-size:32px;}'
  + '.sv-box.is-wrong{box-shadow:inset 0 0 0 4px #E0663A;animation:svWob .45s 1;} .sv-box.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#E6F3EE;} @keyframes svWob{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.sv-pencil{position:absolute;right:-8px;top:-12px;font-size:18px;color:#8E8A98;background:#FFFDF6;border-radius:8px;padding:0 5px;box-shadow:0 0 0 1px #CDBFA4;line-height:1.3;}'
  + '.sv-written{align-self:center;display:flex;flex-direction:column;align-items:flex-end;padding:6px 14px;border-radius:10px;background:#fff;background-image:linear-gradient(#E8EEF3 1px,transparent 1px),linear-gradient(90deg,#E8EEF3 1px,transparent 1px);background-size:20px 20px;box-shadow:inset 0 0 0 2px #CDBFA4;font-family:' + H + ';font-weight:800;color:' + INK + ';}'
  + '.sv-wrow{display:flex;align-items:center;} .sv-wsign,.sv-wcell{display:inline-block;width:30px;height:36px;text-align:center;font-size:30px;line-height:36px;} .sv-wrap.is-narrow .sv-wsign,.sv-wrap.is-narrow .sv-wcell{width:24px;height:30px;font-size:24px;line-height:30px;}'
  + '.sv-wrow.is-carry .sv-wcell{line-height:22px;height:24px;} .sv-carry{display:inline-block;width:20px;height:20px;border:1.5px dashed #8E8A98;border-radius:4px;font-size:15px;line-height:18px;color:#146B5E;vertical-align:middle;} .sv-carry.is-on{border-style:solid;border-color:#146B5E;}'
  + '.sv-wrule{align-self:stretch;height:0;border-top:3px solid ' + INK + ';margin:2px 0;}'
  + '.sv-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .sv-wrap.is-narrow .sv-note{font-size:16px;line-height:1.25;} .sv-note:empty{display:none;} .sv-note.is-hint{color:#9A3D1C;}'
  + '.sv-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.sv-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.sv-pad{display:grid;grid-template-columns:repeat(12,minmax(44px,1fr));gap:6px;} .sv-wrap.is-narrow .sv-pad{grid-template-columns:repeat(6,minmax(44px,1fr));} .sv-wrap.is-cramp .sv-pad{gap:4px;}'
  + '.sv-key,.sv-go{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;padding:0;} .sv-wrap.is-narrow .sv-key,.sv-wrap.is-narrow .sv-go{height:44px;}'
  + '.sv-go{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-size:16px;padding:0 4px;line-height:1.1;} .sv-go svg{width:24px;height:24px;display:block;margin:0 auto;} .sv-golab{display:none;}'
  /* the smallest phones (320 × 640) */
  + '.sv-wrap.is-cramp{gap:4px;} .sv-wrap.is-narrow .sv-written{order:5;} .sv-wrap.is-cramp .sv-work{gap:2px;} .sv-wrap.is-cramp .sv-mat{gap:4px;} .sv-wrap.is-cramp .sv-ico{display:none;} .sv-wrap.is-cramp .sv-bay{padding:4px 0 2px;}';
  var st = document.createElement('style'); st.id = 'sv-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.SquareViceActivity = SquareViceActivity;
