/* =====================================================================
   takeaway-scoop-activity.js — ACTIVITY #147 of the one-by-one rebuild:
   "Tuck Breaks a Ten" → THE TAKE-AWAY SCOOP (2.NBT.B.7; G2-205,
   G2-251/256/257/259, G3-357/360/363; all 11 locales).
   Model: takeaway-scoop-core.js (TakeawayScoopCore).
   Design: docs/activities-rebuild/designs/147-place-value-regroup.md
   ---------------------------------------------------------------------
   The invention: the number you take away is a scoop with exactly that
   many cups (rod-slots for tens, flat-slots for hundreds), and it only
   lifts when every cup has a block under it. Held over the mat its cups
   light up where they find a block; with an empty cup it presses, the
   empty cups blink, and it springs back — nothing moves, no miss. So
   when the ones are short the child snaps a rod (tap) into ten cubes, or
   a flat into ten rods, and the scoop lifts its number away into Tuck's
   bowl. Then the child types what is left under the shelves.
   No timer, no score, no words on the apparatus.
   Test seams: window.TakeawayScoopActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._geo / ._snap / ._lift /
   ._pour / ._pack / ._check / ._tap / .FAST / .OK_MS.
   ===================================================================== */
var TakeawayScoopActivity = {
  id: 'takeaway-scoop',
  /* the drawn apparatus (the hierarchy gate): the shelves and their blocks, the scoop, the bowl, the digit boxes, the written subtraction */
  apparatusClasses: ['tk-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Tuck Breaks a Ten","de":"Tuck entbündelt einen Zehner","fr":"Tuck casse une dizaine","es":"Tuck desagrupa una decena","pt":"Tuck desagrupa uma dezena","it":"Tuck cambia una decina","nl":"Tuck wisselt een tiental in","sv":"Tuck växlar ett tiotal","da":"Tuck veksler en tier","no":"Tuck veksler en tier","fi":"Tuck vaihtaa kympin"},
    instruction: {"en":"Scoop the number away. The scoop only lifts when every cup is full — snap a ten or a hundred if a cup stays empty. Then type what is left.","de":"Schaufle die Zahl weg. Die Schaufel hebt nur ab, wenn jede Mulde voll ist – brich einen Zehner oder einen Hunderter ab, wenn eine Mulde leer bleibt. Dann tipp ein, was übrig ist.","fr":"Enlève le nombre avec la pelle. Elle ne se soulève que si chaque creux est rempli — casse une dizaine ou une centaine si un creux reste vide. Puis tape ce qui reste.","es":"Quita el número con la cuchara grande. Solo se levanta si cada hueco está lleno: parte una decena o una centena si un hueco queda vacío. Luego escribe lo que queda.","pt":"Tire o número com a concha. Ela só sobe quando todos os buracos estão cheios — parta uma dezena ou uma centena se um buraco ficar vazio. Depois digite o que sobrou.","it":"Togli il numero con la paletta. Si solleva solo se ogni incavo è pieno: spezza una decina o un centinaio se un incavo resta vuoto. Poi scrivi quello che resta.","nl":"Schep het getal weg. De schep gaat pas omhoog als elk kuiltje vol is — breek een tiental of een honderdtal af als er een kuiltje leeg blijft. Typ dan wat er over is.","sv":"Ta bort talet med skopan. Den lyfter bara när varje grop är full – bryt ett tiotal eller ett hundratal om en grop förblir tom. Skriv sedan hur mycket som är kvar.","da":"Tag tallet væk med skovlen. Den løfter sig kun, når hvert hul er fyldt – bræk en tier eller en hundreder af, hvis et hul forbliver tomt. Skriv så, hvad der er tilbage.","no":"Ta bort tallet med spaden. Den løfter seg bare når hvert hull er fullt – brekk av en tier eller en hundrer hvis et hull blir stående tomt. Skriv så hva som er igjen.","fi":"Vie luku pois kauhalla. Kauha nousee vain, kun jokainen kolo on täynnä – katkaise kymppi tai sata, jos jokin kolo jää tyhjäksi. Kirjoita sitten, paljonko jäi."},
    hintScoop: {"en":"Take the scoop's number away first.","de":"Schaufle zuerst die Zahl weg.","fr":"Enlève d’abord le nombre avec la pelle.","es":"Primero quita el número con la cuchara grande.","pt":"Primeiro tire o número com a concha.","it":"Prima togli il numero con la paletta.","nl":"Schep eerst het getal weg.","sv":"Ta först bort talet med skopan.","da":"Tag først tallet væk med skovlen.","no":"Ta først bort tallet med spaden.","fi":"Vie ensin luku pois kauhalla."},
    hintType: {"en":"Type what is left on the shelves.","de":"Tipp ein, was auf den Regalen übrig ist.","fr":"Tape ce qui reste sur les étagères.","es":"Escribe lo que queda en los estantes.","pt":"Digite o que sobrou nas prateleiras.","it":"Scrivi quello che resta sugli scaffali.","nl":"Typ wat er nog op de planken ligt.","sv":"Skriv hur mycket som är kvar på hyllorna.","da":"Skriv, hvad der er tilbage på hylderne.","no":"Skriv hva som er igjen på hyllene.","fi":"Kirjoita, paljonko hyllyille jäi."},
    hintCount: {"en":"Count what is left on each shelf.","de":"Zähl, was auf jedem Regal übrig ist.","fr":"Compte ce qui reste sur chaque étagère.","es":"Cuenta lo que queda en cada estante.","pt":"Conte o que sobrou em cada prateleira.","it":"Conta quello che resta su ogni scaffale.","nl":"Tel wat er op elke plank over is.","sv":"Räkna det som är kvar på varje hylla.","da":"Tæl, hvad der er tilbage på hver hylde.","no":"Tell det som er igjen på hver hylle.","fi":"Laske, paljonko kullekin hyllylle jäi."},
    hintCountOn: {"en":"Count on from the biggest pieces to the very last one.","de":"Zähl weiter: von den größten Teilen bis zum allerletzten.","fr":"Compte en avançant, des plus grosses pièces jusqu’à la toute dernière.","es":"Sigue contando desde las piezas más grandes hasta la última.","pt":"Continue contando das peças maiores até a última.","it":"Conta in avanti dai pezzi più grandi fino all’ultimo.","nl":"Tel door van de grootste stukken tot het allerlaatste.","sv":"Räkna vidare från de största bitarna till den allra sista.","da":"Tæl videre fra de største brikker til den allersidste.","no":"Tell videre fra de største brikkene til den aller siste.","fi":"Laske eteenpäin suurimmista paloista aivan viimeiseen asti."},
    hintShort: {"en":"Some cups are empty. What could you snap to fill them?","de":"Einige Mulden sind leer. Was könntest du abbrechen, um sie zu füllen?","fr":"Des creux sont vides. Que pourrais-tu casser pour les remplir ?","es":"Hay huecos vacíos. ¿Qué podrías partir para llenarlos?","pt":"Há buracos vazios. O que você pode partir para enchê-los?","it":"Alcuni incavi sono vuoti. Che cosa potresti spezzare per riempirli?","nl":"Er zijn lege kuiltjes. Wat kun je afbreken om ze te vullen?","sv":"Några gropar är tomma. Vad kan du bryta för att fylla dem?","da":"Nogle huller er tomme. Hvad kan du brække af for at fylde dem?","no":"Noen hull er tomme. Hva kan du brekke av for å fylle dem?","fi":"Osa koloista on tyhjiä. Minkä voisit katkaista, jotta ne täyttyvät?"},
    hintEnough: {"en":"There are already enough here.","de":"Hier liegen schon genug.","fr":"Il y en a déjà assez ici.","es":"Aquí ya hay suficientes.","pt":"Aqui já tem o suficiente.","it":"Qui ce ne sono già abbastanza.","nl":"Hier liggen er al genoeg.","sv":"Här finns redan tillräckligt många.","da":"Her er der allerede nok.","no":"Her er det allerede nok.","fi":"Täällä on jo tarpeeksi."},
    okTen: {"en":"{a} take away {b} leaves {c} — you snapped a ten into ten ones!","de":"{a} minus {b} ist {c} – du hast einen Zehner in zehn Einer entbündelt!","fr":"{a} moins {b}, il reste {c} — tu as cassé une dizaine en dix unités !","es":"¡{a} menos {b} es {c}: desagrupaste una decena en diez unidades!","pt":"{a} menos {b} dá {c} — você desagrupou uma dezena em dez unidades!","it":"{a} meno {b} fa {c}: hai cambiato una decina in dieci unità!","nl":"{a} min {b} is {c} — je hebt een tiental ingewisseld voor tien eenheden!","sv":"{a} minus {b} blir {c} – du växlade ett tiotal till tio ental!","da":"{a} minus {b} giver {c} – du vekslede en tier til ti enere!","no":"{a} minus {b} blir {c} – du vekslet en tier til ti enere!","fi":"{a} miinus {b} on {c} – vaihdoit kympin kymmeneksi ykköseksi!"},
    okHundred: {"en":"{a} take away {b} leaves {c} — you snapped a hundred into ten tens!","de":"{a} minus {b} ist {c} – du hast einen Hunderter in zehn Zehner entbündelt!","fr":"{a} moins {b}, il reste {c} — tu as cassé une centaine en dix dizaines !","es":"¡{a} menos {b} es {c}: desagrupaste una centena en diez decenas!","pt":"{a} menos {b} dá {c} — você desagrupou uma centena em dez dezenas!","it":"{a} meno {b} fa {c}: hai cambiato un centinaio in dieci decine!","nl":"{a} min {b} is {c} — je hebt een honderdtal ingewisseld voor tien tientallen!","sv":"{a} minus {b} blir {c} – du växlade ett hundratal till tio tiotal!","da":"{a} minus {b} giver {c} – du vekslede en hundreder til ti tiere!","no":"{a} minus {b} blir {c} – du vekslet en hundrer til ti tiere!","fi":"{a} miinus {b} on {c} – vaihdoit sadan kymmeneksi kympiksi!"},
    okNone: {"en":"{a} take away {b} leaves {c} — every cup found a block, nothing to snap.","de":"{a} minus {b} ist {c} – jede Mulde war voll, nichts musste entbündelt werden.","fr":"{a} moins {b}, il reste {c} — chaque creux était rempli, rien à casser.","es":"¡{a} menos {b} es {c}! Cada hueco se llenó: no hubo que partir nada.","pt":"{a} menos {b} dá {c} — todos os buracos se encheram, nada precisou ser partido.","it":"{a} meno {b} fa {c}: ogni incavo era pieno, niente da spezzare.","nl":"{a} min {b} is {c} — elk kuiltje was vol, er hoefde niets afgebroken te worden.","sv":"{a} minus {b} blir {c} – varje grop blev full, inget behövde brytas.","da":"{a} minus {b} giver {c} – hvert hul blev fyldt, intet skulle brækkes.","no":"{a} minus {b} blir {c} – hvert hull ble fylt, ingenting måtte brekkes.","fi":"{a} miinus {b} on {c} – jokainen kolo täyttyi, mitään ei tarvinnut katkaista."},
    colH: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sadat"},
    colT: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmenet"},
    colO: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköset"},
    aShelfH: {"en":"Hundreds: {n}. Tap to snap one into ten tens.","de":"Hunderter: {n}. Tippen, um einen in zehn Zehner zu zerbrechen.","fr":"Centaines : {n}. Touche pour en casser une en dix dizaines.","es":"Centenas: {n}. Toca para partir una en diez decenas.","pt":"Centenas: {n}. Toque para partir uma em dez dezenas.","it":"Centinaia: {n}. Tocca per spezzarne uno in dieci decine.","nl":"Honderdtallen: {n}. Tik om er een in tien tientallen op te breken.","sv":"Hundratal: {n}. Tryck för att bryta ett till tio tiotal.","da":"Hundreder: {n}. Tryk for at brække en i ti tiere.","no":"Hundrere: {n}. Trykk for å brekke en i ti tiere.","fi":"Sadat: {n}. Napauta, niin yksi katkeaa kymmeneksi kympiksi."},
    aShelfT: {"en":"Tens: {n}. Tap to snap one into ten ones.","de":"Zehner: {n}. Tippen, um einen in zehn Einer zu zerbrechen.","fr":"Dizaines : {n}. Touche pour en casser une en dix unités.","es":"Decenas: {n}. Toca para partir una en diez unidades.","pt":"Dezenas: {n}. Toque para partir uma em dez unidades.","it":"Decine: {n}. Tocca per spezzarne una in dieci unità.","nl":"Tientallen: {n}. Tik om er een in tien eenheden op te breken.","sv":"Tiotal: {n}. Tryck för att bryta ett till tio ental.","da":"Tiere: {n}. Tryk for at brække en i ti enere.","no":"Tiere: {n}. Trykk for å brekke en i ti enere.","fi":"Kymmenet: {n}. Napauta, niin yksi katkeaa kymmeneksi ykköseksi."},
    aShelfO: {"en":"Ones: {n}","de":"Einer: {n}","fr":"Unités : {n}","es":"Unidades: {n}","pt":"Unidades: {n}","it":"Unità: {n}","nl":"Eenheden: {n}","sv":"Ental: {n}","da":"Enere: {n}","no":"Enere: {n}","fi":"Ykköset: {n}"},
    aScoop: {"en":"Scoop that takes {b}. Full cups: {full}. Empty cups: {empty}. Tap to lift it.","de":"Schaufel, die {b} wegnimmt. Volle Mulden: {full}. Leere Mulden: {empty}. Tippen zum Anheben.","fr":"Pelle qui enlève {b}. Creux remplis : {full}. Creux vides : {empty}. Touche pour la soulever.","es":"Cuchara grande que quita {b}. Huecos llenos: {full}. Huecos vacíos: {empty}. Toca para levantarla.","pt":"Concha que tira {b}. Buracos cheios: {full}. Buracos vazios: {empty}. Toque para levantá-la.","it":"Paletta che toglie {b}. Incavi pieni: {full}. Incavi vuoti: {empty}. Tocca per sollevarla.","nl":"Schep die {b} wegneemt. Volle kuiltjes: {full}. Lege kuiltjes: {empty}. Tik om hem op te tillen.","sv":"Skopa som tar bort {b}. Fulla gropar: {full}. Tomma gropar: {empty}. Tryck för att lyfta den.","da":"Skovl, der tager {b} væk. Fyldte huller: {full}. Tomme huller: {empty}. Tryk for at løfte den.","no":"Spade som tar bort {b}. Fulle hull: {full}. Tomme hull: {empty}. Trykk for å løfte den.","fi":"Kauha, joka vie pois {b}. Täysiä koloja: {full}. Tyhjiä koloja: {empty}. Napauta, niin kauha nousee."},
    aScoopUsed: {"en":"The scoop has taken {b} away.","de":"Die Schaufel hat {b} weggenommen.","fr":"La pelle a enlevé {b}.","es":"La cuchara grande ya quitó {b}.","pt":"A concha já tirou {b}.","it":"La paletta ha tolto {b}.","nl":"De schep heeft {b} weggenomen.","sv":"Skopan har tagit bort {b}.","da":"Skovlen har taget {b} væk.","no":"Spaden har tatt bort {b}.","fi":"Kauha on vienyt pois {b}."},
    aBowl: {"en":"Tuck's bowl: tap to pour the blocks back onto the shelves","de":"Tucks Schüssel: Tippen, um die Teile zurück auf die Regale zu schütten","fr":"Le bol de Tuck : touche pour remettre les pièces sur les étagères","es":"El tazón de Tuck: toca para regresar las piezas a los estantes","pt":"A tigela do Tuck: toque para devolver as peças às prateleiras","it":"La ciotola di Tuck: tocca per rimettere i pezzi sugli scaffali","nl":"Tucks bakje: tik om de blokjes terug op de planken te leggen","sv":"Tucks skål: tryck för att hälla tillbaka bitarna på hyllorna","da":"Tucks skål: tryk for at hælde brikkerne tilbage på hylderne","no":"Tucks bolle: trykk for å helle brikkene tilbake på hyllene","fi":"Tuckin kulho: napauta, niin palat palaavat hyllyille"},
    aPackT: {"en":"Put ten tens back together into a hundred","de":"Zehn Zehner wieder zu einem Hunderter zusammensetzen","fr":"Remettre dix dizaines ensemble en une centaine","es":"Volver a juntar diez decenas en una centena","pt":"Juntar de novo dez dezenas numa centena","it":"Rimettere insieme dieci decine in un centinaio","nl":"Tien tientallen weer samenvoegen tot een honderdtal","sv":"Sätt ihop tio tiotal till ett hundratal igen","da":"Sæt ti tiere sammen til en hundreder igen","no":"Sett sammen ti tiere til en hundrer igjen","fi":"Kokoa kymmenen kymppiä takaisin sadaksi"},
    aPackO: {"en":"Put ten ones back together into a ten","de":"Zehn Einer wieder zu einem Zehner zusammensetzen","fr":"Remettre dix unités ensemble en une dizaine","es":"Volver a juntar diez unidades en una decena","pt":"Juntar de novo dez unidades numa dezena","it":"Rimettere insieme dieci unità in una decina","nl":"Tien eenheden weer samenvoegen tot een tiental","sv":"Sätt ihop tio ental till ett tiotal igen","da":"Sæt ti enere sammen til en tier igen","no":"Sett sammen ti enere til en tier igjen","fi":"Kokoa kymmenen ykköstä takaisin kympiksi"},
    aState: {"en":"Hundreds {h}, tens {t}, ones {o}","de":"Hunderter {h}, Zehner {t}, Einer {o}","fr":"Centaines {h}, dizaines {t}, unités {o}","es":"Centenas {h}, decenas {t}, unidades {o}","pt":"Centenas {h}, dezenas {t}, unidades {o}","it":"Centinaia {h}, decine {t}, unità {o}","nl":"Honderdtallen {h}, tientallen {t}, eenheden {o}","sv":"Hundratal {h}, tiotal {t}, ental {o}","da":"Hundreder {h}, tiere {t}, enere {o}","no":"Hundrere {h}, tiere {t}, enere {o}","fi":"Sadat {h}, kympit {t}, ykköset {o}"},
    aLift: {"en":"The scoop lifted {b} away.","de":"Die Schaufel hat {b} weggehoben.","fr":"La pelle a soulevé {b}.","es":"La cuchara grande levantó {b}.","pt":"A concha levantou {b}.","it":"La paletta ha sollevato {b}.","nl":"De schep heeft {b} weggetild.","sv":"Skopan lyfte bort {b}.","da":"Skovlen løftede {b} væk.","no":"Spaden løftet bort {b}.","fi":"Kauha nosti pois {b}."},
    aTyped: {"en":"What is left: {v}","de":"Übrig: {v}","fr":"Il reste : {v}","es":"Queda: {v}","pt":"Sobrou: {v}","it":"Resta: {v}","nl":"Over: {v}","sv":"Kvar: {v}","da":"Tilbage: {v}","no":"Igjen: {v}","fi":"Jäljellä: {v}"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setTake: {"en":"Take away","de":"Abziehen","fr":"Enlever","es":"Quitar","pt":"Tirar","it":"Togliere","nl":"Weghalen","sv":"Ta bort","da":"Tag væk","no":"Ta bort","fi":"Vähennä"},
    tNone: {"en":"nothing to snap","de":"ohne Entbündeln","fr":"rien à casser","es":"nada que partir","pt":"nada para partir","it":"niente da spezzare","nl":"niets afbreken","sv":"inget att bryta","da":"intet at brække","no":"ingenting å brekke","fi":"ei katkaistavaa"},
    tOnes: {"en":"ones only","de":"nur Einer","fr":"seulement des unités","es":"solo unidades","pt":"só unidades","it":"solo unità","nl":"alleen eenheden","sv":"bara ental","da":"kun enere","no":"bare enere","fi":"vain ykkösiä"},
    tTens: {"en":"bigger numbers","de":"größere Zahlen","fr":"nombres plus grands","es":"números más grandes","pt":"números maiores","it":"numeri più grandi","nl":"grotere getallen","sv":"större tal","da":"større tal","no":"større tall","fi":"isompia lukuja"},
    setWritten: {"en":"Written subtraction","de":"Schriftliche Subtraktion","fr":"Opération posée","es":"Resta escrita","pt":"Conta armada","it":"Calcolo in colonna","nl":"Cijferend aftrekken","sv":"Uppställning","da":"Opstilling","no":"Oppstilling","fi":"Allekkain"},
    wHidden: {"en":"hidden","de":"aus","fr":"non","es":"no","pt":"não","it":"no","nl":"uit","sv":"dold","da":"skjult","no":"skjult","fi":"piilossa"},
    wShown: {"en":"shown","de":"an","fr":"oui","es":"sí","pt":"sim","it":"sì","nl":"aan","sv":"visad","da":"vist","no":"vist","fi":"näkyvissä"},
  },/*STRINGS-END*/
  defaults: { take: 'ones', written: 'hidden' },
  settings: [
    { key: 'take', type: 'choice', labelKey: 'setTake', options: [{ value: 'none', labelKey: 'tNone' }, { value: 'ones', labelKey: 'tOnes' }, { value: 'tens', labelKey: 'tTens' }] },
    { key: 'written', type: 'choice', labelKey: 'setWritten', options: [{ value: 'hidden', labelKey: 'wHidden' }, { value: 'shown', labelKey: 'wShown' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._swallow = null;
    injectTakeawayScoopCSS();
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
  _face: function () { return TakeawayScoopCore.faceOf(this._setting('take')); },
  _written: function () { return this._setting('written') === 'shown'; },
  _key: function () { return this._face(); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },
  _colName: function (c) { return this._t(c === 'H' ? 'colH' : c === 'T' ? 'colT' : 'colO'); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TakeawayScoopCore.rounds(this._face()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TakeawayScoopCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._face(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'takeaway-scoop.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* the task line is the subtraction itself: numerals only (U+2212) */
  _taskLine: function () { var st = this.st; return st ? st.a + ' − ' + st.b + ' = ?' : ''; },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = TakeawayScoopCore.newState(this._face(), k);
    this._view = { note: '', ok: '', soft: false, fresh: null, pulse: null, wob: null, short: false, lifted: false, success: false };
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
  _dims: function () { var W = this._width(), B = TakeawayScoopCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'tk-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="tk-work"><div class="tk-side"><div class="tk-scoopbox"></div><div class="tk-tuckrow"><div class="tk-tuck"></div><div class="tk-bowlbox"></div></div></div>'
      + '<div class="tk-room"><div class="tk-shelves"></div><div class="tk-boxes tk-art"></div></div></div>'
      + '<p class="tk-note" aria-live="polite"></p><div class="tk-written tk-art"></div><div class="tk-pad"></div><p class="tk-sr" aria-live="polite"></p>';
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
    var sideW = wide ? 230 : 0, roomW = wide ? D.W - sideW - 14 : D.W, gap = wide ? 10 : 6;
    var shelfW = Math.floor((roomW - 2 * gap) / 3), inner = shelfW - (wide ? 16 : 8);
    return {
      W: D.W, wide: wide, cramp: cramp, sideW: sideW, roomW: roomW, gap: gap, shelfW: shelfW, inner: inner,
      flat: Math.min(wide ? 58 : cramp ? 36 : 42, Math.floor((inner - 4) / 2)),
      rodW: wide ? 13 : cramp ? 8 : 9, rodL: wide ? 104 : cramp ? 64 : 76, rodGap: wide ? 5 : 3,
      cube: wide ? 15 : cramp ? 10 : 11, cubeP: wide ? 18 : cramp ? 13 : 14,
      boxH: wide ? 60 : cramp ? 36 : 46,
      tuck: wide ? 96 : 64,
      /* the scoop's own parts, before it is scaled to fit its box */
      sFlat: wide ? 38 : 24, sRodW: wide ? 13 : 9, sRodL: wide ? 60 : 38, sCup: wide ? 32 : 20, sGap: wide ? 7 : 5, sHandle: wide ? 60 : 48,
      scoopMax: wide ? 230 : D.W - 64 - 8 - 70
    };
  },
  _paint_: function () {
    var st = this.st, D = this._dims(), G = this._geo(D), v = this._view;
    this._wrap.className = 'tk-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.face;
    this._paintScoop(G); this._paintTuck(G); this._paintBowl(G); this._paintShelves(G); this._paintBoxes(G); this._paintWritten(G); this._paintPad(G);
    var note = this._qs('.tk-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'tk-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'tk-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'tk-note'; }
    this._setPrompt();
    /* one-shot marks: they play on the paint that shows them, never on a later one */
    v.fresh = null; v.pulse = null; v.wob = null; v.short = false; v.lifted = false;
  },

  /* ---------- the blocks, drawn ---------- */
  _flat: function (x, y, s, cls) {
    var o = '<g class="tk-piece tk-flat' + (cls ? ' ' + cls : '') + '"><rect class="tk-body" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="2"/>';
    /* the score lines between its ten rods are darker: a flat visibly snaps into rods */
    for (var i = 1; i < 10; i++) { var p = (s * i / 10).toFixed(1); o += '<path class="tk-score" d="M' + (x + +p) + ' ' + (y + 1.5) + ' V' + (y + s - 1.5) + '"/><path class="tk-seam" d="M' + (x + 1.5) + ' ' + (y + +p) + ' H' + (x + s - 1.5) + '"/>'; }
    return o + '</g>';
  },
  _rod: function (x, y, w, L, cls) {
    var o = '<g class="tk-piece tk-rod' + (cls ? ' ' + cls : '') + '"><rect class="tk-body" x="' + x + '" y="' + y + '" width="' + w + '" height="' + L + '" rx="2"/>';
    /* scored like a chocolate bar into ten cells */
    for (var i = 1; i < 10; i++) o += '<path class="tk-score" d="M' + (x + 1.5) + ' ' + (y + L * i / 10).toFixed(1) + ' H' + (x + w - 1.5) + '"/>';
    return o + '</g>';
  },
  _cube: function (x, y, c, cls) { return '<rect class="tk-piece tk-cube tk-body' + (cls ? ' ' + cls : '') + '" x="' + x + '" y="' + y + '" width="' + c + '" height="' + c + '" rx="2"/>'; },
  _lab: function (x, y, txt, small) { var w = String(txt).length > 2 ? 34 : small ? 24 : 30; return '<rect class="tk-lab" x="' + (x - w / 2) + '" y="' + (y - 9) + '" width="' + w + '" height="18" rx="9"/><text class="tk-labt" x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle">' + txt + '</text>'; },
  _icon: function (c) {
    if (c === 'H') return '<svg class="tk-ico tk-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="2" class="tk-ico-p"/><path d="M7.3 2v16M12.7 2v16" class="tk-ico-l"/></svg>';
    if (c === 'T') return '<svg class="tk-ico tk-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="1" width="6" height="18" rx="1.5" class="tk-ico-p"/><path d="M7 5.5h6M7 10h6M7 14.5h6" class="tk-ico-l"/></svg>';
    return '<svg class="tk-ico tk-art" viewBox="0 0 20 20" aria-hidden="true"><rect x="6" y="6" width="8" height="8" rx="1.5" class="tk-ico-p"/></svg>';
  },

  /* ---------- the mat: what each shelf holds, and its counting labels ---------- */
  /* labels: null, 'step' (miss 1 — place-value steps on this shelf) or {from, last} (miss 2 — one run across the mat) */
  _shelfArt: function (G, c, n, lab) {
    var s = '', h = 0, fresh = this._view.fresh === c, step = TakeawayScoopCore.VAL[c];
    var nw = function (i, from) { return fresh && i >= from ? 'is-new" style="animation-delay:' + ((i - from) * 30) + 'ms' : ''; };
    var txt = function (i) { if (!lab) return null; if (lab === 'step') return (i + 1) * step; var val = lab.from + (i + 1) * step; return lab.last && i === n - 1 ? '?' : val; };
    if (c === 'H') {
      var fs = G.flat, fp = fs + 4, fx = (G.shelfW - (2 * fs + 4)) / 2, dy = G.wide ? fp : Math.round(fs * 0.62);
      for (var i = 0; i < n; i++) s += this._flat(fx + (i % 2) * fp, 4 + Math.floor(i / 2) * dy, fs, '');
      for (var j = 0; j < n && lab; j++) s += this._lab(fx + (j % 2) * fp + fs / 2, 4 + Math.floor(j / 2) * dy + (j + 2 < n && !G.wide ? dy / 2 : fs / 2), txt(j));
      h = n ? 4 + (Math.ceil(n / 2) - 1) * dy + fs : 0;
    } else if (c === 'T') {
      var p = G.rodW + G.rodGap, per = Math.max(1, Math.floor((G.inner + G.rodGap) / p)), rows = Math.ceil(n / per), rowH = G.rodL + 6;
      for (var k = 0; k < n; k++) {
        var r = Math.floor(k / per), inRow = Math.min(per, n - r * per), rx = (G.shelfW - (inRow * p - G.rodGap)) / 2 + (k % per) * p, ry = 4 + r * rowH;
        s += this._rod(rx, ry, G.rodW, G.rodL, nw(k, n - 10));
        if (lab) s += this._lab(rx + G.rodW / 2, ry + 12 + (k % 2) * 22, txt(k), true);
      }
      h = n ? 4 + rows * rowH - 6 : 0;
    } else {
      var cx = (G.shelfW - (5 * G.cubeP - 3)) / 2;
      for (var m = 0; m < n; m++) s += this._cube(cx + (m % 5) * G.cubeP, 4 + Math.floor(m / 5) * G.cubeP, G.cube, nw(m, n - 10));
      if (lab) {
        if (lab === 'step') { for (var q = 0; q * 5 < n; q++) s += this._lab(G.shelfW / 2, 4 + q * G.cubeP + G.cube / 2, Math.min(n, q * 5 + 5), true); }
        else { for (var z = 0; z < n; z++) if (z === n - 1 || z % 5 === 4) s += this._lab(cx + (z % 5) * G.cubeP + G.cube / 2, 4 + Math.floor(z / 5) * G.cubeP + G.cube / 2, txt(z), true); }
      }
      h = n ? 4 + Math.ceil(n / 5) * G.cubeP : 0;
    }
    return { s: s, h: h + 4 };
  },
  _labels: function () {
    var st = this.st, out = { H: null, T: null, O: null };
    if (!st.verdict) return out;
    if (!st.help) { st.verdict.wrongs.forEach(function (c) { out[c] = 'step'; }); return out; }
    /* miss 2: one run from the biggest blocks to the smallest, stopping one short of the end */
    var m = st.mat, lastCol = m.O ? 'O' : m.T ? 'T' : 'H';
    out.H = { from: 0, last: lastCol === 'H' }; out.T = { from: m.H * 100, last: lastCol === 'T' }; out.O = { from: m.H * 100 + m.T * 10, last: lastCol === 'O' };
    return out;
  },
  _paintShelves: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.tk-shelves'); el.innerHTML = '';
    el.style.gap = G.gap + 'px';
    var L = this._labels(), arts = {}, H = G.wide ? 150 : G.cramp ? 74 : 88;
    TakeawayScoopCore.COLS.forEach(function (c) { arts[c] = self._shelfArt(G, c, st.mat[c], L[c]); H = Math.max(H, arts[c].h); });
    TakeawayScoopCore.COLS.forEach(function (c) {
      var n = st.mat[c], col = self.api.el('div', 'tk-shelfcol'); col.style.width = G.shelfW + 'px';
      var cls = 'tk-shelf is-' + c + (v.pulse && v.pulse.indexOf(c) >= 0 ? ' is-pulse' : '') + (L[c] ? ' is-counted' : '') + (v.wob === c ? ' is-wob' : '');
      var inner = '<span class="tk-shelfhead">' + self._icon(c) + '<span class="tk-colname">' + esc(self._colName(c)) + '</span></span>'
        + '<svg class="tk-shelfsvg tk-art" width="' + G.shelfW + '" height="' + H + '" viewBox="0 0 ' + G.shelfW + ' ' + H + '" aria-hidden="true">'
        + '<path class="tk-plank" d="M3 ' + (H - 1) + ' H' + (G.shelfW - 3) + '"/>' + arts[c].s + '</svg>';
      var sh;
      if (c === 'O') {
        /* cubes cannot be snapped: the ones shelf is a shelf, not a control */
        sh = self.api.el('div', cls); sh.setAttribute('role', 'group'); sh.setAttribute('aria-label', self._t('aShelfO', { n: n })); sh.innerHTML = inner;
      } else {
        sh = self._btn(cls, 'shelf-' + c, self._t(c === 'H' ? 'aShelfH' : 'aShelfT', { n: n }), inner);
        sh.disabled = st.done;
        sh.addEventListener('click', function () { self._snap(c); });
      }
      sh.style.width = G.shelfW + 'px';
      col.appendChild(sh);
      /* ten loose pieces show the outline of what they click back into */
      var packCol = c === 'H' && st.mat.T >= 10 ? 'T' : c === 'T' && st.mat.O >= 10 ? 'O' : null;
      if (packCol && !st.done) {
        var ph = packCol === 'T' ? '<svg class="tk-art" viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="6" width="28" height="28" rx="3" class="tk-ghost"/><path d="M20 26 V14 M15 19 L20 14 L25 19" class="tk-ghostarrow"/></svg>'
          : '<svg class="tk-art" viewBox="0 0 40 40" aria-hidden="true"><rect x="16" y="3" width="8" height="34" rx="2" class="tk-ghost"/><path d="M8 26 V14 M4 18 L8 14 L12 18" class="tk-ghostarrow"/></svg>';
        var pk = self._btn('tk-pack', 'pack-' + packCol, self._t(packCol === 'T' ? 'aPackT' : 'aPackO'), ph);
        pk.addEventListener('click', function () { self._pack(packCol); });
        col.appendChild(pk);
      }
      el.appendChild(col);
    });
  },

  /* ---------- the scoop: the number taken away, as a tray of cups ---------- */
  _scoopSvg: function (G, need, filled, used, shortCls) {
    var x = G.sHandle + 10, s = '', partsH = 0, gap = G.sGap;
    var cupH = need.O ? (need.O > 5 ? 2 : 1) * (G.sCup + 4) - 4 : 0;
    partsH = Math.max(need.H ? G.sFlat : 0, need.T ? G.sRodL : 0, cupH);
    var y0 = 10, cls = function (lit, empty) { return 'tk-well' + (used ? ' is-used' : lit ? ' is-lit' : '') + (!used && empty && shortCls ? ' is-blink' : ''); };
    for (var i = 0; i < need.H; i++) { s += '<rect class="' + cls(i < filled.H, i >= filled.H) + '" x="' + x + '" y="' + (y0 + (partsH - G.sFlat) / 2) + '" width="' + G.sFlat + '" height="' + G.sFlat + '" rx="3"/>'; x += G.sFlat + gap; }
    if (need.H) x += gap;
    for (var j = 0; j < need.T; j++) { s += '<rect class="' + cls(j < filled.T, j >= filled.T) + '" x="' + x + '" y="' + (y0 + (partsH - G.sRodL) / 2) + '" width="' + G.sRodW + '" height="' + G.sRodL + '" rx="3"/>'; x += G.sRodW + gap; }
    if (need.T) x += gap;
    var per = need.O > 5 ? Math.ceil(need.O / 2) : need.O, cy0 = y0 + (partsH - cupH) / 2;
    for (var k = 0; k < need.O; k++) { var cx = x + (k % per) * (G.sCup + 4) + G.sCup / 2, cy = cy0 + Math.floor(k / per) * (G.sCup + 4) + G.sCup / 2; s += '<circle class="' + cls(k < filled.O, k >= filled.O) + '" cx="' + cx + '" cy="' + cy + '" r="' + (G.sCup / 2) + '"/>'; }
    if (need.O) x += per * (G.sCup + 4) - 4;
    var W = x + 12, Hh = partsH + 20;
    /* the tray and its handle tab with the number on it */
    var tray = '<rect class="tk-tray" x="' + (G.sHandle + 2) + '" y="2" width="' + (W - G.sHandle - 4) + '" height="' + (Hh - 4) + '" rx="10"/>'
      + '<rect class="tk-handle" x="2" y="' + (Hh / 2 - 22) + '" width="' + G.sHandle + '" height="44" rx="10"/>'
      + '<text class="tk-handlet" x="' + (2 + G.sHandle / 2) + '" y="' + (Hh / 2 + 10) + '" text-anchor="middle">' + this.st.b + '</text>';
    return { svg: tray + s, W: W, H: Hh };
  },
  _paintScoop: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.tk-scoopbox'), C = TakeawayScoopCore, f = C.cupsFilled(st);
    var S = this._scoopSvg(G, st.scoop.need, f, st.scoop.used, v.short);
    var scale = Math.min(1, G.scoopMax / S.W), w = Math.round(S.W * scale), h = Math.round(S.H * scale);
    var full = 0, total = 0; C.COLS.forEach(function (c) { full += f[c]; total += st.scoop.need[c]; });
    var label = st.scoop.used ? this._t('aScoopUsed', { b: st.b }) : this._t('aScoop', { b: st.b, full: full, empty: total - full });
    var b = this._btn('tk-scoop' + (st.scoop.used ? ' is-used' : '') + (v.short ? ' is-short' : '') + (v.lifted ? ' is-lifted' : ''), 'scoop', label,
      '<svg class="tk-scoopsvg tk-art" width="' + w + '" height="' + h + '" viewBox="0 0 ' + S.W + ' ' + S.H + '" aria-hidden="true">' + S.svg + '</svg>');
    b.disabled = st.done || st.scoop.used;
    b.addEventListener('pointerdown', function (e) { self._dragStart(b, e); });
    b.addEventListener('pointermove', function (e) { self._dragMove(b, e); });
    b.addEventListener('pointerup', function (e) { self._dragEnd(b, e); });
    b.addEventListener('pointercancel', function () { self._dragReset(b); });
    b.addEventListener('click', function () { if (self._swallowed(b)) return; self._lift(); });
    el.innerHTML = ''; el.appendChild(b);
  },
  _paintTuck: function (G) {
    var el = this._qs('.tk-tuck'), s = G.tuck;
    el.className = 'tk-tuck' + (this._view.success ? ' is-hop' : '');
    el.innerHTML = '<img class="tk-tuckimg" src="' + this._pic(TakeawayScoopCore.TUCK) + '" alt="" draggable="false" style="width:' + s + 'px;height:' + s + 'px">';
  },
  /* Tuck's bowl: what the scoop took sits here; tap it to pour the blocks back */
  _paintBowl: function (G) {
    var st = this.st, self = this, el = this._qs('.tk-bowlbox'), need = st.scoop.need, s = '', W = G.wide ? 110 : 84, Hb = G.wide ? 54 : 46;
    if (st.scoop.used) {
      var x = 14, y = 10, u = G.wide ? 7 : 6;
      for (var i = 0; i < need.H; i++) { s += '<rect class="tk-body" x="' + x + '" y="' + y + '" width="' + (u * 2) + '" height="' + (u * 2) + '" rx="1"/>'; x += u * 2 + 2; }
      for (var j = 0; j < need.T; j++) { s += '<rect class="tk-body" x="' + x + '" y="' + (y - 2) + '" width="' + (u * 0.7) + '" height="' + (u * 2.6) + '" rx="1"/>'; x += u * 0.7 + 2; }
      for (var k = 0; k < need.O; k++) { s += '<rect class="tk-body" x="' + (x + (k % 5) * (u + 1)) + '" y="' + (y + Math.floor(k / 5) * (u + 1)) + '" width="' + u + '" height="' + u + '" rx="1"/>'; }
    }
    var svg = '<svg class="tk-bowlsvg tk-art" width="' + W + '" height="' + Hb + '" viewBox="0 0 ' + W + ' ' + Hb + '" aria-hidden="true">' + s + '<path class="tk-bowl" d="M4 ' + (Hb * 0.42) + ' H' + (W - 4) + ' Q' + (W - 10) + ' ' + (Hb - 3) + ' ' + (W / 2) + ' ' + (Hb - 3) + ' Q10 ' + (Hb - 3) + ' 4 ' + (Hb * 0.42) + ' Z"/></svg>';
    el.innerHTML = '';
    if (st.scoop.used && !st.done) {
      var b = this._btn('tk-bowlbtn', 'bowl', this._t('aBowl'), svg);
      b.addEventListener('click', function () { self._pour(); });
      el.appendChild(b);
    } else { var d = document.createElement('span'); d.className = 'tk-bowlstill'; d.innerHTML = svg; el.appendChild(d); }
  },

  /* ---------- the digit boxes, under the shelves ---------- */
  _paintBoxes: function (G) {
    var st = this.st, el = this._qs('.tk-boxes'), C = TakeawayScoopCore; el.innerHTML = '';
    el.style.gap = G.gap + 'px';
    el.setAttribute('aria-label', this._t('aTyped', { v: st.typed || '–' }));
    el.setAttribute('role', 'group');
    C.COLS.forEach(function (c) {
      var d = C.boxDigit(st.typed, c), wrong = st.verdict && st.verdict.wrongs.indexOf(c) >= 0;
      var box = document.createElement('span');
      box.className = 'tk-box' + (wrong ? ' is-wrong' : '') + (st.done ? ' is-ok' : '');
      box.style.width = Math.min(G.wide ? 64 : 52, G.shelfW) + 'px'; box.style.height = G.boxH + 'px';
      box.textContent = d;
      var cell = document.createElement('span'); cell.className = 'tk-boxcell'; cell.style.width = G.shelfW + 'px'; cell.appendChild(box);
      el.appendChild(cell);
    });
  },

  /* ---------- the written subtraction (setting, or miss 2): strike-and-rewrite at the snap ---------- */
  _paintWritten: function () {
    var st = this.st, el = this._qs('.tk-written'), C = TakeawayScoopCore;
    var help = !!(st.verdict && st.help), show = this._written() || help;
    el.style.display = show ? '' : 'none'; el.innerHTML = '';
    if (!show) return;
    var M = help ? C.truthMarks(st.a, st.b) : C.marks(st);
    var cell = function (x, cls) { return '<span class="tk-wcell' + (cls ? ' ' + cls : '') + '">' + x + '</span>'; };
    var row = function (cls, sign, cells) { return '<div class="tk-wrow ' + cls + '"><span class="tk-wsign">' + sign + '</span>' + cells.join('') + '</div>'; };
    var digits = function (n) { var s = String(n); return C.COLS.map(function (c) { return C.boxDigit(s, c); }); };
    var top = digits(st.a);
    el.innerHTML = row('is-mark', '', C.COLS.map(function (c) { var ch = M[c]; return ch.length > 1 ? cell(String(ch[1]), 'is-new') : cell(''); }))
      + row('', '', C.COLS.map(function (c, i) { return cell(top[i], M[c].length > 1 ? 'is-struck' : ''); }))
      + row('', '−', digits(st.b).map(function (d) { return cell(d); }))
      + '<div class="tk-wrule"></div>'
      + row('is-ans', '', C.COLS.map(function (c) { return cell(C.boxDigit(st.typed, c)); }));
  },

  /* ---------- the keypad + Check ---------- */
  _paintPad: function () {
    var st = this.st, self = this, pad = this._qs('.tk-pad'); pad.innerHTML = '';
    if (st.done) { pad.style.display = 'none'; return; }
    pad.style.display = '';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('tk-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.addEventListener('click', function () { self._tap(k); });
      pad.appendChild(b);
    });
    var c = this._btn('tk-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg>');
    c.addEventListener('click', function () { self._check(); });
    pad.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _clearMarks: function () { var v = this._view; v.note = ''; v.ok = ''; },
  _sayState: function () { var sr = this._qs && this._qs('.tk-sr'), m = this.st.mat; if (sr) sr.textContent = this._t('aState', { h: m.H, t: m.T, o: m.O }); },
  _snap: function (c) {
    var st = this.st, v = this._view, r = TakeawayScoopCore.snap(st, c);
    if (r.result === 'snap') { this._clearMarks(); v.fresh = r.to; this.api.sound(c === 'H' ? 330 : 440); this._paint(); this._sayState(); return; }
    if (r.result === 'enough') { v.note = this._t('hintEnough'); v.soft = true; v.pulse = [TakeawayScoopCore.DOWN[c]]; }
    v.wob = c; this.api.sound(200); this._paint();
  },
  _lift: function () {
    var st = this.st, v = this._view, r = TakeawayScoopCore.lift(st);
    if (r.result === 'lift') { this._clearMarks(); v.lifted = true; this.api.sound(620); this._paint(); var sr = this._qs('.tk-sr'); if (sr) sr.textContent = this._t('aLift', { b: st.b }); return; }
    if (r.result === 'short') { v.note = this._t('hintShort'); v.soft = true; v.short = true; this.api.sound(180); this._paint(); }
  },
  _pour: function () { if (TakeawayScoopCore.pour(this.st)) { this._clearMarks(); this.api.sound(300); this._paint(); this._sayState(); } },
  _pack: function (c) { if (TakeawayScoopCore.rebuild(this.st, c)) { this._clearMarks(); this.api.sound(260); this._paint(); this._sayState(); } },
  _tap: function (k) { if (TakeawayScoopCore.type(this.st, k)) { this._clearMarks(); this.api.sound(660); this._paint(); } },
  _keyboard: function (e) {
    if (!this.st) return;
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._tap(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); this._tap('del'); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view; if (st.done) return;
    var r = TakeawayScoopCore.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') {
      v.note = this._t(r.key); v.soft = r.key === 'hintType'; v.ok = '';
      if (r.key === 'hintScoop') v.short = false;
      this.api.sound(300); this._paint(); this.api.announce(v.note); return;
    }
    if (r.result === 'ok') { this._success(this._okLine()); return; }
    v.ok = ''; v.note = this._t(TakeawayScoopCore.hint(st)); v.soft = false;
    this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _okLine: function () {
    var st = this.st, k = st.snaps.H > 0 ? 'okHundred' : st.snaps.T > 0 ? 'okTen' : 'okNone';
    return this._t(k, { a: st.a, b: st.b, c: TakeawayScoopCore.answer(st) });
  },
  _success: function (msg) {
    var v = this._view;
    v.note = ''; v.ok = msg; v.success = true;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },

  /* ---------- dragging the scoop: it follows the finger; let go over the mat and it tries to lift ---------- */
  _dragStart: function (b, e) {
    if (b.disabled) return;
    this._drag = { x: e.clientX, y: e.clientY, moved: false };
    try { b.setPointerCapture(e.pointerId); } catch (x) {}
  },
  _dragMove: function (b, e) {
    var d = this._drag; if (!d) return;
    var dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) > 12) d.moved = true;
    if (d.moved) { b.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; b.classList.add('is-drag'); }
  },
  _dragReset: function (b) { this._drag = null; b.style.transform = ''; b.classList.remove('is-drag'); },
  _dragEnd: function (b, e) {
    var d = this._drag; this._dragReset(b);
    if (!d || !d.moved) return;
    this._swallow = { btn: b, until: Date.now() + 400 };
    b.style.visibility = 'hidden';
    var el = document.elementFromPoint(e.clientX, e.clientY); b.style.visibility = '';
    if (el && el.closest && el.closest('.tk-room')) this._lift();
  },
  _swallowed: function (b) { var s = this._swallow; this._swallow = null; return !!(s && s.btn === b && Date.now() < s.until); }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectTakeawayScoopCSS() {
  if (typeof document === 'undefined' || document.getElementById('tk-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WOOD = '#B9814B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tk-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .tk-wrap:focus{outline:none;}'
  + '.tk-work{display:flex;gap:14px;align-items:flex-start;} .tk-wrap.is-wide .tk-work{flex-direction:row-reverse;} .tk-wrap.is-narrow .tk-work{flex-direction:column;gap:6px;}'
  + '.tk-side{display:flex;flex-direction:column;align-items:center;gap:8px;flex:0 0 auto;} .tk-wrap.is-wide .tk-side{width:230px;} .tk-wrap.is-narrow .tk-side{flex-direction:row-reverse;align-items:center;justify-content:center;width:100%;gap:8px;}'
  + '.tk-tuckrow{display:flex;align-items:flex-end;gap:4px;} .tk-wrap.is-narrow .tk-tuckrow{flex-direction:column;align-items:center;gap:0;}'
  + '.tk-room{display:flex;flex-direction:column;gap:6px;min-width:0;flex:1 1 auto;}'
  + '.tk-shelves{display:flex;justify-content:center;align-items:flex-start;} .tk-boxes{display:flex;justify-content:center;align-items:stretch;}'
  + '.tk-shelfcol{display:flex;flex-direction:column;align-items:center;gap:4px;}'
  + '.tk-shelf{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2.5px ' + WOOD + ';padding:6px 0 4px;min-height:44px;font:inherit;color:inherit;}'
  + 'button.tk-shelf{cursor:pointer;} button.tk-shelf:disabled{cursor:default;} .tk-shelf:focus-visible,.tk-scoop:focus-visible,.tk-bowlbtn:focus-visible,.tk-pack:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.tk-shelfhead{display:flex;flex-direction:column;align-items:center;gap:1px;font-family:' + H + ';font-weight:800;font-size:16px;line-height:1.05;color:' + INK + ';} .tk-wrap.is-narrow .tk-shelfhead{font-size:13px;} .tk-wrap.is-cramp .tk-shelfhead{font-size:12px;}'
  + '.tk-colname{display:block;max-width:100%;overflow-wrap:anywhere;text-align:center;padding:0 2px;} .tk-ico{width:20px;height:20px;display:block;} .tk-wrap.is-narrow .tk-ico{width:15px;height:15px;} .tk-wrap.is-cramp .tk-ico{display:none;}'
  + '.tk-ico-p{fill:#F7A27E;stroke:' + INK + ';stroke-width:1.5;} .tk-ico-l{stroke:' + INK + ';stroke-width:1;opacity:.5;}'
  + '.tk-shelfsvg{display:block;overflow:visible;} .tk-plank{stroke:' + WOOD + ';stroke-width:3;stroke-linecap:round;}'
  + '.tk-shelf.is-pulse{animation:tkPulse .5s 3;} @keyframes tkPulse{50%{box-shadow:inset 0 0 0 4px #E0663A;}}'
  + '.tk-shelf.is-wob{animation:tkWob .4s 1;} .tk-wrap.is-fast .tk-shelf.is-wob{animation:none;}'
  + '.tk-shelf.is-counted{box-shadow:inset 0 0 0 3px #146B5E;}'
  + '.tk-body{fill:#F7A27E;stroke:#B9512A;stroke-width:1.6;} .tk-score{stroke:#B9512A;stroke-width:1.4;opacity:.75;} .tk-seam{stroke:rgba(47,42,59,.22);stroke-width:1;}'
  + '.tk-piece.is-new{animation:tkIn .4s ease-out both;} .tk-wrap.is-fast .tk-piece.is-new{animation:none;} @keyframes tkIn{0%{transform:translateY(-22px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.tk-lab{fill:#146B5E;} .tk-labt{font-family:' + H + ';font-weight:800;font-size:12px;fill:#fff;}'
  + '.tk-pack{width:100%;max-width:88px;height:44px;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4;padding:4px;cursor:pointer;} .tk-pack svg{width:100%;height:100%;display:block;} .tk-ghost{fill:none;stroke:#B9512A;stroke-width:2;stroke-dasharray:4 3;} .tk-ghostarrow{fill:none;stroke:#146B5E;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;}'
  + '.tk-scoopbox{display:flex;justify-content:center;min-width:0;} .tk-wrap.is-narrow .tk-scoopbox{flex:1 1 auto;}'
  + '.tk-scoop{position:relative;border:0;background:transparent;padding:0;cursor:grab;touch-action:none;border-radius:12px;min-height:44px;transition:transform .12s;} .tk-scoop.is-drag{cursor:grabbing;transition:none;z-index:5;filter:drop-shadow(0 6px 8px rgba(47,42,59,.25));} .tk-scoop:disabled{cursor:default;}'
  + '.tk-scoopsvg{display:block;overflow:visible;}'
  + '.tk-tray{fill:#E8DCC4;stroke:' + WOOD + ';stroke-width:2.5;} .tk-handle{fill:#146B5E;stroke:#0E4D44;stroke-width:2;} .tk-handlet{font-family:' + H + ';font-weight:800;font-size:30px;fill:#fff;}'
  + '.tk-well{fill:#4A4458;stroke:#2F2A3B;stroke-width:1.5;} .tk-well.is-lit{fill:#2E9C88;stroke:#146B5E;} .tk-well.is-used{fill:#D9CFBF;stroke:#B9A88A;}'
  + '.tk-well.is-blink{animation:tkBlink .3s 3;} .tk-wrap.is-fast .tk-well.is-blink{animation:none;fill:#F2784B;} @keyframes tkBlink{50%{fill:#F2784B;}}'
  + '.tk-scoop.is-short{animation:tkPress .5s 1;} .tk-wrap.is-fast .tk-scoop.is-short{animation:none;} @keyframes tkPress{30%{transform:translateY(8px);}60%{transform:translateY(-4px);}}'
  + '.tk-scoop.is-used .tk-tray,.tk-scoop.is-used .tk-handle{opacity:.55;}'
  + '.tk-scoop.is-lifted{animation:tkLift .5s ease-out 1;} .tk-wrap.is-fast .tk-scoop.is-lifted{animation:none;} @keyframes tkLift{40%{transform:translateY(-14px);}}'
  + '.tk-tuck{flex:0 0 auto;} .tk-tuckimg{display:block;object-fit:contain;} .tk-tuck.is-hop .tk-tuckimg{animation:tkHop .5s ease-out 2;} .tk-wrap.is-fast .tk-tuck.is-hop .tk-tuckimg{animation:none;} @keyframes tkHop{40%{transform:translateY(-12px);}}'
  + '.tk-bowlbox{display:flex;} .tk-bowlbtn{border:0;background:transparent;padding:0;cursor:pointer;min-width:44px;min-height:44px;border-radius:10px;} .tk-bowlbtn svg,.tk-bowlstill svg{display:block;} .tk-bowl{fill:#F1E4CB;stroke:' + WOOD + ';stroke-width:2.5;fill-opacity:.85;}'
  + '.tk-boxcell{display:flex;justify-content:center;}'
  + '.tk-box{position:relative;display:flex;align-items:center;justify-content:center;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #146B5E;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;color:' + INK + ';} .tk-wrap.is-narrow .tk-box{font-size:32px;}'
  + '.tk-box.is-wrong{box-shadow:inset 0 0 0 4px #E0663A;animation:tkWob .45s 1;} .tk-box.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#E6F3EE;} @keyframes tkWob{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.tk-written{align-self:center;display:flex;flex-direction:column;align-items:flex-end;padding:6px 14px;border-radius:10px;background:#fff;background-image:linear-gradient(#E8EEF3 1px,transparent 1px),linear-gradient(90deg,#E8EEF3 1px,transparent 1px);background-size:20px 20px;box-shadow:inset 0 0 0 2px #CDBFA4;font-family:' + H + ';font-weight:800;color:' + INK + ';}'
  + '.tk-wrow{display:flex;align-items:center;} .tk-wsign,.tk-wcell{display:inline-block;width:34px;height:36px;text-align:center;font-size:30px;line-height:36px;} .tk-wrap.is-narrow .tk-wsign,.tk-wrap.is-narrow .tk-wcell{width:28px;height:30px;font-size:24px;line-height:30px;}'
  + '.tk-wrow.is-mark .tk-wcell{height:22px;line-height:22px;font-size:17px;color:#146B5E;} .tk-wrap.is-narrow .tk-wrow.is-mark .tk-wcell{height:18px;line-height:18px;font-size:15px;}'
  + '.tk-wcell.is-struck{text-decoration:line-through;text-decoration-thickness:2.5px;text-decoration-color:#E0663A;}'
  + '.tk-wrule{align-self:stretch;height:0;border-top:3px solid ' + INK + ';margin:2px 0;}'
  + '.tk-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .tk-wrap.is-narrow .tk-note{font-size:16px;line-height:1.25;} .tk-note:empty{display:none;} .tk-note.is-hint{color:#9A3D1C;}'
  + '.tk-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.tk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.tk-pad{display:grid;grid-template-columns:repeat(12,minmax(44px,1fr));gap:6px;} .tk-wrap.is-narrow .tk-pad{grid-template-columns:repeat(6,minmax(44px,1fr));} .tk-wrap.is-cramp .tk-pad{gap:4px;}'
  + '.tk-key,.tk-go{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;padding:0;} .tk-wrap.is-narrow .tk-key,.tk-wrap.is-narrow .tk-go{height:44px;}'
  + '.tk-go{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;} .tk-go svg{width:24px;height:24px;display:block;margin:0 auto;}'
  /* phones: the written subtraction under the keypad, so Check stays above the fold */
  + '.tk-wrap.is-narrow .tk-written{order:5;} .tk-wrap.is-cramp{gap:4px;} .tk-wrap.is-cramp .tk-work{gap:4px;} .tk-wrap.is-cramp .tk-room{gap:4px;} .tk-wrap.is-cramp .tk-shelf{padding:4px 0 2px;}';
  var st = document.createElement('style'); st.id = 'tk-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.TakeawayScoopActivity = TakeawayScoopActivity;
