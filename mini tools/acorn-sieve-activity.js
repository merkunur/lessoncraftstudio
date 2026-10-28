/* =====================================================================
   acorn-sieve-activity.js — ACTIVITY #144 of the one-by-one rebuild:
   "Tally's Acorn Baskets" → THE ACORN SIEVE (2.NBT.B.6; G1-112, G2-313;
   all 11 locales). Model: acorn-sieve-core.js (AcornSieveCore).
   Design: docs/activities-rebuild/designs/144-tally-squirrel.md
   ---------------------------------------------------------------------
   The invention: a sieve whose holes let single acorns through but hold
   back cups of ten. The child tips every basket onto Tally's sieve and
   shakes it: all the cups of all the baskets stay on top, all the loose
   acorns land in the tray's grooves of ten — the tens together and the
   ones together, by themselves. Three windows take the cups (printed
   [ ]0), the loose acorns and the total; Check compares each with what
   lies there. A full groove rolls into a cup. With the cloth on the
   sieve is covered: the child works it out from the numbers, and Check
   whips the cloth away. Faces: three small baskets · two or three · up
   to four · a number wall. No timer, no score.
   Test seams: window.AcornSieveActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._geo / ._tip /
   ._shake / ._roll / ._check / ._tap / ._win / .FAST / .OK_MS.
   ===================================================================== */
var AcornSieveActivity = {
  id: 'acorn-sieve',
  /* the drawn apparatus (the hierarchy gate): baskets, sieve, tray, wall, windows */
  apparatusClasses: ['as-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Tally's Acorn Baskets","de":"Tallys Eichelkörbe","fr":"Les paniers de glands de Tally","es":"Las canastas de bellotas de Tally","pt":"As cestas de bolotas do Tally","it":"I cestini di ghiande di Tally","nl":"Tally’s eikelmandjes","sv":"Kurres ekollonkorgar","da":"Tallys agernkurve","no":"Tallys eikenøttkurver","fi":"Tallyn tammenterhokorit"},
    instruction: {"en":"Tip every basket onto the sieve. How many cups of ten, how many loose acorns — and how many in all?","de":"Kipp jeden Korb auf das Sieb. Wie viele Zehnerbecher, wie viele lose Eicheln – und wie viele sind es zusammen?","fr":"Renverse chaque panier sur le tamis. Combien de godets de dix, combien de glands seuls — et combien en tout ?","es":"Voltea cada canasta sobre el colador. ¿Cuántos vasitos de diez, cuántas bellotas sueltas y cuántas en total?","pt":"Vire cada cesta na peneira. Quantos copinhos de dez, quantas bolotas soltas — e quantas ao todo?","it":"Rovescia ogni cestino sul setaccio. Quanti bicchierini da dieci, quante ghiande sciolte — e quante in tutto?","nl":"Kiep elk mandje om op de zeef. Hoeveel bekertjes van tien, hoeveel losse eikels — en hoeveel samen?","sv":"Töm varje korg på sållet. Hur många tiomuggar, hur många lösa ekollon – och hur många är det sammanlagt?","da":"Vælt hver kurv ud på sien. Hvor mange bægre med ti, hvor mange løse agern – og hvor mange i alt?","no":"Tøm hver kurv på silen. Hvor mange begre med ti, hvor mange løse eikenøtter – og hvor mange til sammen?","fi":"Kaada jokainen kori seulalle. Montako kymppikuppia, montako irtonaista tammenterhoa – ja montako yhteensä?"},
    pFour: {"en":"Tip every basket onto the sieve, then fill the three windows.","de":"Kipp jeden Korb auf das Sieb und füll dann die drei Kästchen aus.","fr":"Renverse chaque panier sur le tamis, puis remplis les trois cases.","es":"Voltea cada canasta sobre el colador y luego llena las tres ventanitas.","pt":"Vire cada cesta na peneira e depois preencha as três janelinhas.","it":"Rovescia ogni cestino sul setaccio, poi riempi le tre caselle.","nl":"Kiep elk mandje om op de zeef en vul dan de drie vakjes in.","sv":"Töm varje korg på sållet och fyll sedan i de tre rutorna.","da":"Vælt hver kurv ud på sien, og udfyld så de tre felter.","no":"Tøm hver kurv på silen, og fyll så ut de tre rutene.","fi":"Kaada jokainen kori seulalle ja täytä sitten kolme ruutua."},
    pSmall: {"en":"Tip all three baskets onto the sieve. How many acorns are there in all?","de":"Kipp alle drei Körbe auf das Sieb. Wie viele Eicheln sind es zusammen?","fr":"Renverse les trois paniers sur le tamis. Combien de glands y a-t-il en tout ?","es":"Voltea las tres canastas sobre el colador. ¿Cuántas bellotas hay en total?","pt":"Vire as três cestas na peneira. Quantas bolotas há ao todo?","it":"Rovescia i tre cestini sul setaccio. Quante ghiande ci sono in tutto?","nl":"Kiep alle drie de mandjes om op de zeef. Hoeveel eikels zijn het samen?","sv":"Töm alla tre korgarna på sållet. Hur många ekollon är det sammanlagt?","da":"Vælt alle tre kurve ud på sien. Hvor mange agern er der i alt?","no":"Tøm alle tre kurvene på silen. Hvor mange eikenøtter er det til sammen?","fi":"Kaada kaikki kolme koria seulalle. Montako tammenterhoa on yhteensä?"},
    pWall: {"en":"Each brick is the two bricks under it added together.","de":"Jeder Stein ist die Summe der beiden Steine darunter.","fr":"Chaque brique est la somme des deux briques en dessous.","es":"Cada ladrillo es la suma de los dos ladrillos de abajo.","pt":"Cada tijolo é a soma dos dois tijolos de baixo.","it":"Ogni mattone è la somma dei due mattoni sotto.","nl":"Elke steen is de twee stenen eronder bij elkaar opgeteld.","sv":"Varje sten är de två stenarna under den tillsammans.","da":"Hver sten er de to sten under den lagt sammen.","no":"Hver stein er de to steinene under den lagt sammen.","fi":"Jokainen kivi on sen alla olevien kahden kiven summa."},
    hintTip: {"en":"Tip every basket onto the sieve.","de":"Kipp jeden Korb auf das Sieb.","fr":"Renverse chaque panier sur le tamis.","es":"Voltea cada canasta sobre el colador.","pt":"Vire cada cesta na peneira.","it":"Rovescia ogni cestino sul setaccio.","nl":"Kiep elk mandje om op de zeef.","sv":"Töm varje korg på sållet.","da":"Vælt hver kurv ud på sien.","no":"Tøm hver kurv på silen.","fi":"Kaada jokainen kori seulalle."},
    hintPour: {"en":"Tap the empty brick: the two bricks under it pour their acorns onto the sieve.","de":"Tippe auf den leeren Stein: Die beiden Steine darunter schütten ihre Eicheln auf das Sieb.","fr":"Touche la brique vide : les deux briques en dessous versent leurs glands sur le tamis.","es":"Toca el ladrillo vacío: los dos ladrillos de abajo echan sus bellotas en el colador.","pt":"Toque no tijolo vazio: os dois tijolos de baixo despejam suas bolotas na peneira.","it":"Tocca il mattone vuoto: i due mattoni sotto versano le loro ghiande sul setaccio.","nl":"Tik op de lege steen: de twee stenen eronder storten hun eikels op de zeef.","sv":"Tryck på den tomma stenen, så häller de två stenarna under den sina ekollon på sållet.","da":"Tryk på den tomme sten, så hælder de to sten under den deres agern på sien.","no":"Trykk på den tomme steinen, så heller de to steinene under den eikenøttene sine på silen.","fi":"Napauta tyhjää kiveä, niin sen alla olevat kaksi kiveä kaatavat tammenterhonsa seulalle."},
    hintFill: {"en":"Fill all three windows.","de":"Füll alle drei Kästchen aus.","fr":"Remplis les trois cases.","es":"Llena las tres ventanitas.","pt":"Preencha as três janelinhas.","it":"Riempi tutte e tre le caselle.","nl":"Vul alle drie de vakjes in.","sv":"Fyll i alla tre rutorna.","da":"Udfyld alle tre felter.","no":"Fyll ut alle tre rutene.","fi":"Täytä kaikki kolme ruutua."},
    hintTotal: {"en":"Write how many acorns there are in all.","de":"Schreib, wie viele Eicheln es zusammen sind.","fr":"Écris combien il y a de glands en tout.","es":"Escribe cuántas bellotas hay en total.","pt":"Escreva quantas bolotas há ao todo.","it":"Scrivi quante ghiande ci sono in tutto.","nl":"Schrijf op hoeveel eikels het samen zijn.","sv":"Skriv hur många ekollon det är sammanlagt.","da":"Skriv, hvor mange agern der er i alt.","no":"Skriv hvor mange eikenøtter det er til sammen.","fi":"Kirjoita, montako tammenterhoa on yhteensä."},
    hintBrick: {"en":"Write the number for the new brick.","de":"Schreib die Zahl für den neuen Stein.","fr":"Écris le nombre de la nouvelle brique.","es":"Escribe el número del ladrillo nuevo.","pt":"Escreva o número do tijolo novo.","it":"Scrivi il numero del nuovo mattone.","nl":"Schrijf het getal voor de nieuwe steen.","sv":"Skriv talet för den nya stenen.","da":"Skriv tallet til den nye sten.","no":"Skriv tallet til den nye steinen.","fi":"Kirjoita uuden kiven luku."},
    hintCount: {"en":"Count the cups by tens and the loose acorns by ones.","de":"Zähl die Becher in Zehnerschritten und die losen Eicheln in Einerschritten.","fr":"Compte les godets de dix en dix et les glands seuls un par un.","es":"Cuenta los vasitos de diez en diez y las bellotas sueltas de una en una.","pt":"Conte os copinhos de dez em dez e as bolotas soltas de uma em uma.","it":"Conta i bicchierini di dieci in dieci e le ghiande sciolte una alla volta.","nl":"Tel de bekertjes met sprongen van tien en de losse eikels één voor één.","sv":"Räkna muggarna i tiotal och de lösa ekollonen i ental.","da":"Tæl bægrene i tiere og de løse agern i enere.","no":"Tell begrene i tiere og de løse eikenøttene i enere.","fi":"Laske kupit kymmeninä ja irtonaiset tammenterhot ykkösinä."},
    hintSplit: {"en":"Tens with tens, ones with ones — then put them together.","de":"Zehner zu Zehnern, Einer zu Einern – dann alles zusammen.","fr":"Les dizaines avec les dizaines, les unités avec les unités — puis on réunit tout.","es":"Decenas con decenas, unidades con unidades, y luego júntalo todo.","pt":"Dezenas com dezenas, unidades com unidades — depois junte tudo.","it":"Decine con decine, unità con unità — poi metti tutto insieme.","nl":"Tientallen bij tientallen, eenheden bij eenheden — en dan alles samen.","sv":"Tiotal med tiotal, ental med ental – och sedan allt tillsammans.","da":"Tiere med tiere, enere med enere – og så det hele sammen.","no":"Tiere med tiere, enere med enere – og så alt sammen.","fi":"Kymmenet kymmenten kanssa, ykköset ykkösten kanssa – ja sitten kaikki yhteen."},
    okFour: {"en":"{list} = {total}: {t} tens and {o} ones make {total}!","de":"{list} = {total}: {t} Zehner und {o} Einer ergeben {total}!","fr":"{list} = {total} : {t} dizaines et {o} unités, ça fait {total} !","es":"{list} = {total}: ¡{t} decenas y {o} unidades son {total}!","pt":"{list} = {total}: {t} dezenas e {o} unidades dão {total}!","it":"{list} = {total}: {t} decine e {o} unità fanno {total}!","nl":"{list} = {total}: {t} tientallen en {o} eenheden zijn samen {total}!","sv":"{list} = {total}: {t} tiotal och {o} ental blir {total}!","da":"{list} = {total}: {t} tiere og {o} enere giver {total}!","no":"{list} = {total}: {t} tiere og {o} enere blir {total}!","fi":"{list} = {total}: {t} kymmentä ja {o} ykköstä on yhteensä {total}!"},
    okSmall: {"en":"{list} = {total} acorns in all!","de":"{list} = {total} Eicheln zusammen!","fr":"{list} = {total} glands en tout !","es":"¡{list} = {total} bellotas en total!","pt":"{list} = {total} bolotas ao todo!","it":"{list} = {total} ghiande in tutto!","nl":"{list} = {total} eikels samen!","sv":"{list} = {total} ekollon sammanlagt!","da":"{list} = {total} agern i alt!","no":"{list} = {total} eikenøtter til sammen!","fi":"{list} = {total} tammenterhoa yhteensä!"},
    okBrick: {"en":"{a} + {b} = {c}. On to the next brick!","de":"{a} + {b} = {c}. Weiter zum nächsten Stein!","fr":"{a} + {b} = {c}. Passons à la brique suivante !","es":"{a} + {b} = {c}. ¡Vamos al siguiente ladrillo!","pt":"{a} + {b} = {c}. Vamos para o próximo tijolo!","it":"{a} + {b} = {c}. Avanti con il prossimo mattone!","nl":"{a} + {b} = {c}. Op naar de volgende steen!","sv":"{a} + {b} = {c}. Vidare till nästa sten!","da":"{a} + {b} = {c}. Videre til næste sten!","no":"{a} + {b} = {c}. Videre til neste stein!","fi":"{a} + {b} = {c}. Seuraavaan kiveen!"},
    okWall: {"en":"The top brick is {top} — every brick is the two under it added together.","de":"Der oberste Stein ist {top} – jeder Stein ist die Summe der beiden darunter.","fr":"La brique du haut vaut {top} — chaque brique est la somme des deux en dessous.","es":"El ladrillo de arriba es {top}: cada ladrillo es la suma de los dos de abajo.","pt":"O tijolo de cima é {top} — cada tijolo é a soma dos dois de baixo.","it":"Il mattone in cima vale {top}: ogni mattone è la somma dei due sotto.","nl":"De bovenste steen is {top} — elke steen is de twee eronder samen.","sv":"Den översta stenen är {top} – varje sten är de två under den tillsammans.","da":"Den øverste sten er {top} – hver sten er de to under den lagt sammen.","no":"Den øverste steinen er {top} – hver stein er de to under den lagt sammen.","fi":"Ylin kivi on {top} – jokainen kivi on sen alla olevien kahden summa."},
    aCups: {"en":"cups of ten","de":"Zehnerbecher","fr":"godets de dix","es":"vasitos de diez","pt":"copinhos de dez","it":"bicchierini da dieci","nl":"bekertjes van tien","sv":"tiomuggar","da":"bægre med ti","no":"begre med ti","fi":"kymppikupit"},
    aLoose: {"en":"loose acorns","de":"lose Eicheln","fr":"glands seuls","es":"bellotas sueltas","pt":"bolotas soltas","it":"ghiande sciolte","nl":"losse eikels","sv":"lösa ekollon","da":"løse agern","no":"løse eikenøtter","fi":"irtonaiset tammenterhot"},
    aAll: {"en":"acorns in all","de":"Eicheln zusammen","fr":"glands en tout","es":"bellotas en total","pt":"bolotas ao todo","it":"ghiande in tutto","nl":"eikels samen","sv":"ekollon sammanlagt","da":"agern i alt","no":"eikenøtter til sammen","fi":"tammenterhot yhteensä"},
    aBrick: {"en":"brick {n}","de":"Stein {n}","fr":"brique {n}","es":"ladrillo {n}","pt":"tijolo {n}","it":"mattone {n}","nl":"steen {n}","sv":"sten {n}","da":"sten {n}","no":"stein {n}","fi":"kivi {n}"},
    aBrickEmpty: {"en":"empty brick — tap so the two bricks under it pour their acorns onto the sieve","de":"leerer Stein – tippen, um die beiden Steine darunter auszuschütten","fr":"brique vide — touche pour verser les deux briques en dessous","es":"ladrillo vacío: toca para echar los dos ladrillos de abajo","pt":"tijolo vazio — toque para despejar os dois tijolos de baixo","it":"mattone vuoto — tocca per versare i due mattoni sotto","nl":"lege steen — tik om de twee stenen eronder te storten","sv":"tom sten – tryck för att hälla ut de två stenarna under","da":"tom sten – tryk for at hælde de to sten under den ud","no":"tom stein – trykk for å helle ut de to steinene under","fi":"tyhjä kivi – kaada alla olevat kaksi kiveä napauttamalla"},
    aBrickType: {"en":"new brick","de":"neuer Stein","fr":"nouvelle brique","es":"ladrillo nuevo","pt":"tijolo novo","it":"nuovo mattone","nl":"nieuwe steen","sv":"ny sten","da":"ny sten","no":"ny stein","fi":"uusi kivi"},
    aTub: {"en":"basket with {n} acorns","de":"Korb mit {n} Eicheln","fr":"panier de {n} glands","es":"canasta con {n} bellotas","pt":"cesta com {n} bolotas","it":"cestino con {n} ghiande","nl":"mandje met {n} eikels","sv":"korg med {n} ekollon","da":"kurv med {n} agern","no":"kurv med {n} eikenøtter","fi":"kori, jossa on {n} tammenterhoa"},
    aTubDone: {"en":"basket with {n} acorns, tipped","de":"Korb mit {n} Eicheln, ausgekippt","fr":"panier de {n} glands, renversé","es":"canasta con {n} bellotas, volteada","pt":"cesta com {n} bolotas, virada","it":"cestino con {n} ghiande, rovesciato","nl":"mandje met {n} eikels, omgekiept","sv":"korg med {n} ekollon, tömd","da":"kurv med {n} agern, væltet","no":"kurv med {n} eikenøtter, tømt","fi":"kori, jossa oli {n} tammenterhoa, kaadettu"},
    aGrip: {"en":"shake the sieve","de":"Sieb schütteln","fr":"secouer le tamis","es":"sacudir el colador","pt":"sacudir a peneira","it":"scuoti il setaccio","nl":"de zeef schudden","sv":"skaka sållet","da":"ryst sien","no":"rist silen","fi":"ravista seulaa"},
    aShook: {"en":"{c} cups on the sieve, {l} acorns in the tray.","de":"{c} Becher auf dem Sieb, {l} Eicheln in der Schale.","fr":"{c} godets sur le tamis, {l} glands dans le bac.","es":"{c} vasitos en el colador, {l} bellotas en la charola.","pt":"{c} copinhos na peneira, {l} bolotas na bandeja.","it":"{c} bicchierini sul setaccio, {l} ghiande nel vassoio.","nl":"{c} bekertjes op de zeef, {l} eikels in de bak.","sv":"{c} muggar på sållet, {l} ekollon i lådan.","da":"{c} bægre på sien, {l} agern i bakken.","no":"{c} begre på silen, {l} eikenøtter på brettet.","fi":"{c} kuppia seulalla, {l} tammenterhoa alustalla."},
    aShookLoose: {"en":"{l} acorns in the tray.","de":"{l} Eicheln in der Schale.","fr":"{l} glands dans le bac.","es":"{l} bellotas en la charola.","pt":"{l} bolotas na bandeja.","it":"{l} ghiande nel vassoio.","nl":"{l} eikels in de bak.","sv":"{l} ekollon i lådan.","da":"{l} agern i bakken.","no":"{l} eikenøtter på brettet.","fi":"{l} tammenterhoa alustalla."},
    aGroove: {"en":"full groove — tap to roll it into a cup","de":"volle Rinne – tippen, um sie zu einem Becher zu rollen","fr":"rigole pleine — touche pour la rouler en un godet","es":"canal lleno: toca para convertirlo en un vasito","pt":"canaleta cheia — toque para transformá-la num copinho","it":"canalina piena — tocca per farne un bicchierino","nl":"volle goot — tik om er een bekertje van te maken","sv":"full ränna – tryck för att rulla den till en mugg","da":"fuld rende – tryk for at rulle den til et bæger","no":"full renne – trykk for å rulle den til et beger","fi":"täysi kouru – rullaa se kupiksi napauttamalla"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setBaskets: {"en":"Baskets","de":"Körbe","fr":"Paniers","es":"Canastas","pt":"Cestas","it":"Cestini","nl":"Mandjes","sv":"Korgar","da":"Kurve","no":"Kurver","fi":"Korit"},
    bSmall: {"en":"three small","de":"drei kleine","fr":"trois petits","es":"tres pequeñas","pt":"três pequenas","it":"tre piccoli","nl":"drie kleine","sv":"tre små","da":"tre små","no":"tre små","fi":"kolme pientä"},
    bFew: {"en":"two or three","de":"zwei oder drei","fr":"deux ou trois","es":"dos o tres","pt":"duas ou três","it":"due o tre","nl":"twee of drie","sv":"två eller tre","da":"to eller tre","no":"to eller tre","fi":"kaksi tai kolme"},
    bFour: {"en":"up to four","de":"bis zu vier","fr":"jusqu’à quatre","es":"hasta cuatro","pt":"até quatro","it":"fino a quattro","nl":"tot vier","sv":"upp till fyra","da":"op til fire","no":"opptil fire","fi":"enintään neljä"},
    bWall: {"en":"number wall","de":"Zahlenmauer","fr":"mur de nombres","es":"pirámide de números","pt":"pirâmide de números","it":"piramide di numeri","nl":"rekenmuur","sv":"talmur","da":"talmur","no":"tallmur","fi":"lukumuuri"},
    setCloth: {"en":"Cloth","de":"Tuch","fr":"Tissu","es":"Tela","pt":"Pano","it":"Telo","nl":"Doek","sv":"Duk","da":"Klæde","no":"Klede","fi":"Liina"},
    cOn: {"en":"on","de":"an","fr":"oui","es":"sí","pt":"sim","it":"sì","nl":"aan","sv":"på","da":"til","no":"på","fi":"päällä"},
    cOff: {"en":"off","de":"aus","fr":"non","es":"no","pt":"não","it":"no","nl":"uit","sv":"av","da":"fra","no":"av","fi":"pois"},
  },/*STRINGS-END*/
  defaults: { baskets: 'four', cloth: 'on' },
  settings: [
    { key: 'baskets', type: 'choice', labelKey: 'setBaskets', options: [{ value: 'small', labelKey: 'bSmall' }, { value: 'few', labelKey: 'bFew' }, { value: 'four', labelKey: 'bFour' }, { value: 'wall', labelKey: 'bWall' }] },
    { key: 'cloth', type: 'choice', labelKey: 'setCloth', options: [{ value: 'on', labelKey: 'cOn' }, { value: 'off', labelKey: 'cOff' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._fed = 0;
    injectAcornSieveCSS();
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
  _face: function () { return AcornSieveCore.faceOf(this._setting('baskets')); },
  _cloth: function () { return this._setting('cloth') !== 'off'; },
  _key: function () { return this._face(); },
  _pic: function (p) { var i = p.lastIndexOf('/'); return '/image-library-webp/themes/' + encodeURIComponent(p.slice(0, i)) + '/' + p.slice(i + 1) + '@2x.webp'; },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = AcornSieveCore.rounds(this._face()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = AcornSieveCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._face(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'acorn-sieve.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () { var f = this.st ? this.st.face : this._face(); return this._t(f === 'wall' ? 'pWall' : f === 'small' ? 'pSmall' : 'pFour'); },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = AcornSieveCore.newState(this._face(), k, this._cloth());
    this._view = { note: '', ok: '', soft: false, drop: null, shaking: false, tipping: -1, success: false, wobble: null };
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
  _dims: function () { var W = this._width(), B = AcornSieveCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'as-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="as-app"><div class="as-top as-art"></div><div class="as-bench as-art"><div class="as-sieve"></div><div class="as-tray"></div><div class="as-cloth" aria-hidden="true"></div></div><div class="as-splits"><p class="as-split as-tensline"></p><p class="as-split as-onesline"></p></div></div>'
      + '<div class="as-read"><div class="as-tallybox"></div><div class="as-wins as-art"></div><div class="as-pad"></div></div><p class="as-note" aria-live="polite"></p><p class="as-sr" aria-live="polite"></p>';
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
    var st = this.st, wide = D.wide, cramp = D.cramp;
    var readW = wide ? 232 : 0, A = wide ? D.W - readW - 16 : D.W;
    var tallyInTop = !wide && st.face !== 'wall';
    var n = st.face === 'wall' ? 3 : st.tubs.length;
    var topRoom = A - (tallyInTop ? 96 : 0);
    var tubW = Math.max(44, Math.min(wide ? 96 : 64, Math.floor((topRoom - (n - 1) * 8) / n)));
    var sieveH = wide ? 150 : cramp ? 84 : 92, grip = 44, cupW = wide ? 26 : 20, cupP = cupW + 4;
    var seatP = Math.max(11, Math.min(wide ? 19 : 16, Math.floor((A - 44) / 20))), grooveH = wide ? 44 : cramp ? 26 : 34;
    return {
      W: D.W, A: A, wide: wide, cramp: cramp, readW: readW, tallyInTop: tallyInTop, n: n,
      tubW: tubW, tubH: Math.round(tubW * 0.72), tagF: wide ? 28 : cramp ? 19 : 21,
      sieveH: sieveH, grip: grip, cupW: cupW, cupP: cupP, cupH: sieveH - 22,
      seatP: seatP, grooveH: grooveH, trayH: grooveH * 2 + 6 + 12,
      brickW: wide ? Math.min(116, Math.floor((A - 16) / 3)) : Math.max(76, Math.min(96, Math.floor((A - 12) / 3))), brickH: wide ? 52 : 44, wallGap: wide ? 6 : 4,
      tally: wide ? 96 : 64
    };
  },
  _paint_: function () {
    var st = this.st, D = this._dims(), G = this._geo(D), v = this._view;
    this._wrap.className = 'as-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.face;
    this._paintTop(G); this._paintSieve(G); this._paintTray(G); this._paintCloth(G); this._paintSplit(G); this._paintTally(G); this._paintWins(G); this._paintPad(G);
    var note = this._qs('.as-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'as-note is-ok' + (st.done ? '' : ' is-step'); }
    else if (v.note) { note.textContent = v.note; note.className = 'as-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'as-note'; }
    this._setPrompt();
  },

  /* ---------- the baskets (or the wall) ---------- */
  _tubSVG: function (w, h) {
    return '<svg class="as-tubsvg as-art" viewBox="0 0 96 72" width="' + w + '" height="' + h + '" aria-hidden="true">'
      + '<path class="as-tubbody" d="M8 10 H88 L78 66 Q77 70 72 70 H24 Q19 70 18 66 Z"/>'
      + '<path class="as-tubrim" d="M5 6 H91 V13 H5 Z"/><path class="as-tubband" d="M12 34 H84 M15 50 H81"/>'
      + '<circle class="as-pin" cx="5" cy="9.5" r="3.5"/><circle class="as-pin" cx="91" cy="9.5" r="3.5"/></svg>';
  },
  _paintTop: function (G) {
    var st = this.st, self = this, el = this._qs('.as-top'), v = this._view;
    el.innerHTML = ''; el.style.minHeight = '';
    if (st.face === 'wall') { this._paintWall(G, el); return; }
    var row = this.api.el('div', 'as-tubs');
    st.tubs.forEach(function (t, i) {
      var b = self._btn('as-tub' + (t.tipped ? ' is-tipped' : '') + (v.tipping === i ? ' is-tipping' : '') + (v.wobble === 'tubs' && !t.tipped ? ' is-wobble' : ''), 'tub-' + i, self._t(t.tipped ? 'aTubDone' : 'aTub', { n: t.n }), '<span class="as-tubhang">' + self._tubSVG(G.tubW, G.tubH) + '</span><span class="as-tag" style="font-size:' + G.tagF + 'px">' + t.n + '</span>');
      b.style.width = G.tubW + 'px';
      b.addEventListener('click', function () { self._tip(i); });
      row.appendChild(b);
    });
    el.appendChild(row);
    if (G.tallyInTop) el.appendChild(this._tallyNode(G));
  },
  _paintWall: function (G, el) {
    var st = this.st, self = this, v = this._view, wall = this.api.el('div', 'as-wall'), rows = [[5], [3, 4], [0, 1, 2]];
    rows.forEach(function (r) {
      var line = self.api.el('div', 'as-wallrow');
      r.forEach(function (i) {
        var filled = st.filled[i], active = !st.done && i === st.active, poured = active && AcornSieveCore.allTipped(st);
        var support = !st.done && AcornSieveCore.SUPPORTS[st.active] && AcornSieveCore.SUPPORTS[st.active].indexOf(i) >= 0;
        var txt = filled ? String(st.bricks[i]) : active ? esc(st.win.all) : '';
        var lab = filled ? self._t('aBrick', { n: st.bricks[i] }) : active ? (poured ? self._t('aBrickType') + (st.win.all ? ': ' + st.win.all : '') : self._t('aBrickEmpty')) : '';
        var b = self._btn('as-brick' + (filled ? ' is-filled' : ' is-empty') + (active ? ' is-active' : '') + (poured ? ' is-poured' : '') + (poured && st.focus === 'all' ? ' is-focus' : '') + (support ? ' is-support' : '') + (v.wobble === 'tubs' && active ? ' is-wobble' : '') + (active && st.verdict && st.verdict.wrongs.indexOf('all') >= 0 ? ' is-wrong' : ''), 'brick-' + i, lab || null, txt);
        b.style.width = G.brickW + 'px'; b.style.height = G.brickH + 'px';
        if (!active) { b.disabled = true; b.tabIndex = -1; if (!filled) b.setAttribute('aria-hidden', 'true'); }
        b.addEventListener('click', function () { self._brick(i); });
        line.appendChild(b);
      });
      if (r.length === 1 && !G.wide) { line.classList.add('has-tally'); line.appendChild(self._tallyNode(G)); }
      wall.appendChild(line);
    });
    el.appendChild(wall);
  },
  _tallyNode: function (G) {
    var box = this.api.el('div', 'as-tally' + (this._view.success ? ' is-hop' : '')), s = G.tally;
    var jarH = Math.round(s * 0.92), jarW = Math.round(s * 0.32), notch = 9, fed = this._fed % (notch + 1), nh = (jarH - 10) / notch, j = '';
    for (var i = 0; i < notch; i++) { var y = jarH - 5 - (i + 1) * nh; j += '<rect class="as-notch' + (i < fed ? ' is-full' : '') + '" x="4" y="' + (y + 1.5) + '" width="' + (jarW - 8) + '" height="' + (nh - 3) + '" rx="2"/>'; }
    box.innerHTML = '<img class="as-tallyimg" src="' + this._pic(AcornSieveCore.TALLY) + '" alt="" draggable="false" style="width:' + s + 'px;height:' + s + 'px">'
      + '<svg class="as-jar as-art" width="' + jarW + '" height="' + jarH + '" viewBox="0 0 ' + jarW + ' ' + jarH + '" aria-hidden="true"><rect class="as-jarbody" x="1.5" y="1.5" width="' + (jarW - 3) + '" height="' + (jarH - 3) + '" rx="6"/>' + j + '</svg>';
    return box;
  },
  _paintTally: function (G) {
    var box = this._qs('.as-tallybox'); box.innerHTML = '';
    if (G.wide) box.appendChild(this._tallyNode(G));
  },

  /* ---------- the sieve: cups on top, loose acorns waiting ---------- */
  _acorn: function (x, y, r, cls) {
    return '<g class="as-acorn ' + (cls || '') + '"><ellipse class="as-nut" cx="' + x + '" cy="' + (y + r * 0.18) + '" rx="' + (r * 0.78) + '" ry="' + (r * 0.92) + '"/><path class="as-capd" d="M' + (x - r * 0.95) + ' ' + (y - r * 0.15) + ' Q' + x + ' ' + (y - r * 1.25) + ' ' + (x + r * 0.95) + ' ' + (y - r * 0.15) + ' Z"/></g>';
  },
  _cup: function (x, y, w, h, label) {
    var s = '<rect class="as-cup" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (w / 2) + '"/>', p = (h - w * 0.6) / 10, r = Math.min(w * 0.3, p * 0.42);
    for (var i = 0; i < 10; i++) s += '<circle class="as-cupdot" cx="' + (x + w / 2) + '" cy="' + (y + w * 0.3 + p * (i + 0.5)) + '" r="' + r + '"/>';
    if (label) s += '<rect class="as-lab" x="' + (x + w / 2 - 15) + '" y="' + (y - 2) + '" width="30" height="20" rx="10"/><text class="as-labt" x="' + (x + w / 2) + '" y="' + (y + 13) + '" text-anchor="middle">' + label + '</text>';
    return s;
  },
  _shownCounts: function () {
    /* on success the full grooves have rolled up into cups beside the leftover acorns */
    var st = this.st;
    if (this._view.success) return { cups: st.cups + Math.floor(st.tray / 10), sieve: st.sieve, tray: st.tray % 10 };
    return { cups: st.cups, sieve: st.sieve, tray: st.tray };
  },
  _paintSieve: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.as-sieve'), W = G.A, H = G.sieveH, fx = G.grip + 6, fw = W - fx - 2, c = this._shownCounts(), s = '';
    /* the frame and its mesh of round holes */
    s += '<rect class="as-frame" x="' + fx + '" y="2" width="' + fw + '" height="' + (H - 4) + '" rx="12"/>';
    var hp = G.wide ? 30 : 22, hr = G.wide ? 9 : 6.5;
    for (var hy = 18; hy < H - 10; hy += hp) for (var hx = fx + 16; hx < fx + fw - 10; hx += hp) s += '<circle class="as-hole" cx="' + hx + '" cy="' + hy + '" r="' + hr + '"/>';
    /* the cups of ten, side by side */
    var labels = st.verdict && !st.help, cx0 = fx + 12, cy = 11;
    for (var i = 0; i < c.cups; i++) s += this._cup(cx0 + i * G.cupP, cy, G.cupW, G.cupH, labels ? String((i + 1) * 10) : '');
    /* the loose acorns still on the sieve (before a shake) */
    if (c.sieve) {
      var ax0 = cx0 + Math.max(c.cups, 1) * G.cupP + 10, ap = G.wide ? 18 : 15, ar = G.wide ? 7 : 6, cols = Math.max(1, Math.floor((fx + fw - ax0 - 6) / ap));
      for (var k = 0; k < c.sieve; k++) s += this._acorn(ax0 + (k % cols) * ap + ap / 2, 18 + Math.floor(k / cols) * ap + ap / 2, ar, '');
    }
    el.style.height = H + 'px';
    el.innerHTML = '<svg class="as-svg as-art" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + s + '</svg>';
    var g = this._btn('as-grip', 'grip', this._t('aGrip'), '<svg class="as-art" viewBox="0 0 44 60" aria-hidden="true"><rect x="3" y="3" width="38" height="54" rx="14" class="as-gripbody"/><path d="M15 18 V42 M22 16 V44 M29 18 V42" class="as-ridge"/></svg>');
    g.style.height = Math.min(60, H - 8) + 'px'; g.style.top = Math.round((H - Math.min(60, H - 8)) / 2) + 'px';
    if (st.covered || st.done) g.disabled = true;
    g.addEventListener('pointerdown', function (e) { self._gripDown(e); });
    g.addEventListener('pointermove', function (e) { self._gripMove(e); });
    g.addEventListener('pointerup', function () { self._g = self._g ? Object.assign(self._g, { up: true }) : null; });
    g.addEventListener('click', function () { if (self._g && self._g.shook) { self._g = null; return; } self._g = null; self._shake(); });
    el.appendChild(g);
  },
  /* ---------- the tray: two by two grooves of ten seats ---------- */
  _paintTray: function (G) {
    var st = this.st, self = this, v = this._view, el = this._qs('.as-tray'), W = G.A, H = G.trayH, c = this._shownCounts(), s = '';
    var colW = (W - 18) / 2, labels = st.verdict && !st.help, left = c.tray, n0 = v.drop ? v.drop.from : c.tray, idx = 0;
    var r = Math.max(4.5, G.seatP * 0.4);
    var btns = [];
    for (var g = 0; g < 4; g++) {
      var gx = 6 + (g % 2) * (colW + 6), gy = 6 + Math.floor(g / 2) * (G.grooveH + 6), here = Math.max(0, Math.min(10, left)); left -= 10;
      s += '<rect class="as-groove' + (here === 10 ? ' is-full' : '') + '" x="' + gx + '" y="' + gy + '" width="' + colW + '" height="' + G.grooveH + '" rx="' + (G.grooveH / 2) + '"/>';
      var sx = gx + (colW - 10 * G.seatP) / 2 + G.seatP / 2, sy = gy + G.grooveH / 2;
      for (var k = 0; k < 10; k++) {
        var x = sx + k * G.seatP;
        if (k < here) { var nw = idx >= n0 && !this.FAST, d = nw ? (idx - n0) * 40 : 0; s += '<g class="as-seated' + (nw ? ' is-new' : '') + '" style="animation-delay:' + d + 'ms">' + this._acorn(x, sy, r, '') + '</g>'; }
        else s += '<circle class="as-seat" cx="' + x + '" cy="' + sy + '" r="' + (r * 0.75) + '"/>';
        if (k < here) idx++;
      }
      if (labels && here > 0) s += '<rect class="as-lab" x="' + (gx + colW - 34) + '" y="' + (gy - 4) + '" width="30" height="20" rx="10"/><text class="as-labt" x="' + (gx + colW - 19) + '" y="' + (gy + 11) + '" text-anchor="middle">' + (here === 10 ? (g + 1) * 10 : (Math.floor(c.tray / 10) * 10 + here)) + '</text>';
      if (here === 10 && !st.covered && !st.done) btns.push({ g: g, x: gx, y: gy, w: colW });
    }
    el.style.height = H + 'px';
    el.innerHTML = '<svg class="as-svg as-art" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + s + '</svg>';
    /* a full groove is a button: tap it and it rolls into a cup (only the LAST full groove rolls) */
    if (btns.length) {
      var last = btns[btns.length - 1];
      var b = this._btn('as-groovebtn', 'groove', this._t('aGroove'), '');
      b.style.left = last.x + 'px'; b.style.top = (last.y - (44 - G.grooveH) / 2) + 'px'; b.style.width = last.w + 'px'; b.style.height = '44px';
      b.addEventListener('click', function () { self._roll(); });
      el.appendChild(b);
    }
  },
  _paintCloth: function (G) {
    var el = this._qs('.as-cloth'), st = this.st;
    el.style.display = st.covered ? '' : 'none';
    var under = st.cups + st.sieve;
    el.className = 'as-cloth' + (under ? ' is-bulge' : '');
  },
  /* miss 2: the tens of every basket over the sieve, the ones over the tray */
  _paintSplit: function (G) {
    var st = this.st, t = this._qs('.as-tensline'), o = this._qs('.as-onesline');
    if (!(st.verdict && st.help)) { t.textContent = ''; o.textContent = ''; return; }
    var S = AcornSieveCore.split(st);
    var j = G.wide ? ' + ' : '+', e = G.wide ? ' = ' : '=';
    t.textContent = S.tens.length ? S.tens.join(j) + e + S.tensSum : '';
    o.textContent = S.ones.join(j) + e + S.onesSum;
  },

  /* ---------- the windows ---------- */
  _icon: function (kind) {
    var cap = '<rect x="4" y="2" width="9" height="24" rx="4.5" class="as-ico-cup"/>', nut = '<ellipse cx="9" cy="17" rx="5.4" ry="6.6" class="as-ico-nut"/><path d="M2.6 12 Q9 3.5 15.4 12 Z" class="as-ico-cap"/>';
    if (kind === 'cups') return '<svg class="as-ico" viewBox="0 0 17 28" aria-hidden="true">' + cap + '</svg>';
    if (kind === 'loose') return '<svg class="as-ico" viewBox="0 0 18 28" aria-hidden="true">' + nut + '</svg>';
    return '<svg class="as-ico is-both" viewBox="0 0 40 28" aria-hidden="true">' + cap + '<path d="M18 14 h6 M21 11 v6" class="as-ico-plus"/><g transform="translate(22 0)">' + nut + '</g></svg>';
  },
  _paintWins: function (G) {
    var st = this.st, self = this, el = this._qs('.as-wins'); el.innerHTML = '';
    /* a narrow wall keeps only its brick: the cups and loose windows are optional working space */
    el.style.display = !G.wide && st.face === 'wall' ? 'none' : '';
    var list = AcornSieveCore.shownWindows(st.face).filter(function (w) { return !(st.face === 'wall' && w === 'all'); });
    list.forEach(function (w) {
      var val = st.win[w], wrong = st.verdict && st.verdict.wrongs.indexOf(w) >= 0, cells;
      if (w === 'cups') cells = '<span class="as-cell">' + esc(val) + '</span><span class="as-zero">0</span>';
      else { var d = val.length === 2 ? val.split('') : ['', val]; cells = '<span class="as-cell">' + esc(d[0]) + '</span><span class="as-cell">' + esc(d[1]) + '</span>'; }
      var pencil = w === 'cups' && wrong && st.help ? '<span class="as-pencil">' + st.verdict.truth.cups + '</span>' : '';
      var lab = self._t(w === 'cups' ? 'aCups' : w === 'loose' ? 'aLoose' : 'aAll') + (val ? ': ' + (w === 'cups' ? val + '0' : val) : '');
      var b = self._btn('as-win is-' + w + (st.focus === w && !st.done ? ' is-focus' : '') + (wrong ? ' is-wrong' : ''), 'win-' + w, lab, self._icon(w) + '<span class="as-cells">' + cells + '</span>' + pencil);
      if (st.done) b.disabled = true;
      b.addEventListener('click', function () { self._win(w); });
      el.appendChild(b);
    });
  },

  /* ---------- the keypad + Check ---------- */
  _paintPad: function (G) {
    var st = this.st, self = this, pad = this._qs('.as-pad'); pad.innerHTML = '';
    if (st.done) { pad.style.display = 'none'; return; }
    pad.style.display = '';
    var shut = !st.focus;
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('as-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.disabled = shut;
      b.addEventListener('click', function () { self._tap(k); });
      pad.appendChild(b);
    });
    var c = this._btn('as-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg><span class="as-golab">' + esc(this._t('checkBtn')) + '</span>');
    c.addEventListener('click', function () { self._check(); });
    pad.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _clearMarks: function () { var v = this._view; v.note = ''; v.ok = ''; v.wobble = null; },
  _tip: function (i) {
    var st = this.st, self = this, v = this._view;
    if (!AcornSieveCore.tip(st, i)) { if (st.tubs[i] && st.tubs[i].tipped) this.api.sound(220); return; }
    /* the swing plays once, on the paint that shows it: no delayed repaint can swallow a tap */
    this._clearMarks(); v.drop = null; v.tipping = this.FAST ? -1 : i;
    this.api.sound(st.covered ? 300 : 420); this._paint(); v.tipping = -1;
  },
  _brick: function (i) {
    var st = this.st;
    if (st.done || i !== st.active) return;
    if (!AcornSieveCore.allTipped(st)) { if (AcornSieveCore.pour(st)) { this._clearMarks(); this._view.drop = null; this.api.sound(420); this._paint(); } return; }
    if (AcornSieveCore.setFocus(st, 'all')) { this._view.note = ''; this._paint(); }
  },
  _shake: function () {
    var st = this.st, v = this._view, self = this;
    if (st.done || st.covered) return;
    var before = st.tray, moved = AcornSieveCore.shake(st);
    if (moved) {
      this._clearMarks(); v.drop = { from: before };
      for (var i = 0; i < Math.min(moved, 12); i++) this._later((function (k) { return function () { self.api.sound(520 + Math.floor((before + k) / 10) * 60); }; })(i), this.FAST ? 0 : i * 40);
      var sr = this._qs('.as-sr'); if (sr) sr.textContent = st.face === 'small' ? this._t('aShookLoose', { l: st.tray }) : this._t('aShook', { c: st.cups, l: st.tray });
    } else this.api.sound(260);
    this._paint(); v.drop = null;
    /* the rattle is a class on the sieve, never a repaint */
    var sv = this._qs('.as-sieve');
    if (sv && !this.FAST) { sv.classList.remove('is-shaking'); void sv.offsetWidth; sv.classList.add('is-shaking'); this._later(function () { sv.classList.remove('is-shaking'); }, 620); }
  },
  _roll: function () {
    var st = this.st;
    if (!AcornSieveCore.grooveToCup(st)) return;
    this._clearMarks(); this._view.drop = null; this.api.sound(600); this._paint();
  },
  _win: function (w) { if (AcornSieveCore.setFocus(this.st, w)) { this._view.note = ''; this._paint(); } },
  _tap: function (k) { if (AcornSieveCore.type(this.st, k)) { this._clearMarks(); this._view.drop = null; this.api.sound(660); this._paint(); } },
  _keyboard: function (e) {
    if (!this.st) return;
    if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._tap(e.key); }
    else if (e.key === 'Backspace') { e.preventDefault(); this._tap('del'); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, self = this; if (st.done) return;
    var r = AcornSieveCore.check(st);
    v.drop = null;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; v.ok = ''; v.wobble = r.key === 'hintTip' || r.key === 'hintPour' ? 'tubs' : null; this.api.sound(300); this._paint(); v.wobble = null; return; }
    if (r.result === 'no') return;
    if (r.shook) v.drop = { from: st.tray - r.shook };
    if (r.result === 'brick') {
      var sup = AcornSieveCore.SUPPORTS[r.brick];
      v.note = ''; v.ok = this._t('okBrick', { a: st.bricks[sup[0]], b: st.bricks[sup[1]], c: r.value }); v.drop = null;
      this.api.sound(880); this._paint(); this.api.announce(v.ok);
      return;
    }
    if (r.result === 'ok') { this._success(this._okLine()); v.drop = null; return; }
    v.ok = ''; v.note = this._t(AcornSieveCore.hint(st)); v.soft = false;
    this.api.sound(240); this._paint(); v.drop = null; this.api.announce(v.note);
  },
  _okLine: function () {
    var st = this.st;
    if (st.face === 'wall') return this._t('okWall', { top: st.bricks[5] });
    var nums = st.rd.nums, total = AcornSieveCore.target(st), list = nums.join(' + ');
    if (st.face === 'small') return this._t('okSmall', { list: list, total: total });
    var t = nums.reduce(function (a, n) { return a + AcornSieveCore.tens(n); }, 0), o = nums.reduce(function (a, n) { return a + AcornSieveCore.ones(n); }, 0);
    return this._t('okFour', { list: list, total: total, t: t, o: o });
  },
  _success: function (msg) {
    var v = this._view;
    v.note = ''; v.ok = msg; v.success = true; this._fed++;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },
  /* the grip: a drag back and forth of 30 px shakes the sieve; a tap is one shake */
  _gripDown: function (e) { this._g = { x: e.clientX, travel: 0, shook: false }; },
  _gripMove: function (e) {
    var g = this._g; if (!g || g.up || g.shook) return;
    g.travel += Math.abs(e.clientX - g.x); g.x = e.clientX;
    if (g.travel >= 30) { g.shook = true; this._shake(); }
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectAcornSieveCSS() {
  if (typeof document === 'undefined' || document.getElementById('as-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WOOD = '#B9814B', WOODD = '#7E5228';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.as-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:grid;grid-template-columns:1fr;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .as-wrap:focus{outline:none;}'
  + '.as-wrap.is-wide{grid-template-columns:1fr 232px;column-gap:16px;align-items:start;} .as-wrap.is-wide .as-note{grid-column:1 / -1;} .as-wrap.is-narrow .as-app{order:1;} .as-wrap.is-narrow .as-note{order:2;} .as-wrap.is-narrow .as-read{order:3;}'
  + '.as-app{display:flex;flex-direction:column;gap:8px;min-width:0;} .as-wrap.is-narrow{gap:6px;} .as-wrap.is-narrow .as-app,.as-wrap.is-narrow .as-read{gap:6px;}'
  + '.as-top{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;}'
  + '.as-tubs{display:flex;gap:8px;justify-content:center;flex:1 1 auto;align-items:flex-start;}'
  + '.as-tub{position:relative;border:0;background:none;padding:0;margin:0;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:0;min-height:44px;}'
  + '.as-tag{position:absolute;left:50%;top:56%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;min-width:36px;height:1.4em;padding:0 5px;border-radius:9px;background:#FFFDF6;box-shadow:inset 0 0 0 2.5px ' + INK + ';font-family:' + H + ';font-weight:800;color:' + INK + ';line-height:1;}'
  + ''
  + '.as-tubhang{display:block;transform-origin:50% 50%;transition:transform .38s ease-out,opacity .38s;} .as-wrap.is-fast .as-tubhang{transition:none;}'
  + '.as-tub.is-tipped .as-tubhang{transform:rotate(180deg);opacity:.6;} .as-tub.is-tipping .as-tubhang{animation:asTip .38s ease-out;} @keyframes asTip{from{transform:none;opacity:1;}to{transform:rotate(180deg);opacity:.6;}} .as-tub.is-tipped{cursor:default;}'
  + '.as-tubsvg{display:block;} .as-tubbody{fill:' + WOOD + ';stroke:' + INK + ';stroke-width:2.5;stroke-linejoin:round;} .as-tubrim{fill:' + WOODD + ';stroke:' + INK + ';stroke-width:2.5;} .as-tubband{fill:none;stroke:' + WOODD + ';stroke-width:2.5;opacity:.6;} .as-pin{fill:' + INK + ';}'
  + '.is-wobble{animation:asWob .45s 2;} @keyframes asWob{25%{transform:translateX(-4px);}75%{transform:translateX(4px);}}'
  + '.as-wall{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1 1 auto;} .as-wallrow{display:flex;gap:6px;justify-content:center;} .as-wrap.is-narrow .as-wall,.as-wrap.is-narrow .as-wallrow{gap:4px;} .as-wallrow.has-tally{position:relative;width:100%;} .as-wallrow.has-tally .as-tally{position:absolute;right:0;top:0;}'
  + '.as-brick{border:0;border-radius:10px;background:#FFF2DC;box-shadow:inset 0 0 0 2.5px #C98E57,0 3px 0 #C98E57;font-family:' + H + ';font-weight:800;font-size:28px;color:' + INK + ';padding:0;line-height:1;cursor:default;}'
  + '.as-wrap.is-narrow .as-brick{font-size:24px;} .as-brick.is-empty{background:#FFFDF6;box-shadow:inset 0 0 0 2.5px #C98E57;background-image:repeating-linear-gradient(90deg,transparent 0 8px,transparent 8px 12px);outline:2.5px dashed #C98E57;outline-offset:-5px;}'
  + '.as-brick.is-active{cursor:pointer;outline-color:#F2784B;} .as-brick.is-poured{outline:0;box-shadow:inset 0 0 0 3px #CDBFA4;background:#fff;} .as-brick.is-focus{box-shadow:inset 0 0 0 4px #146B5E;} .as-brick.is-support{box-shadow:inset 0 0 0 3px #2E9C88,0 3px 0 #2E9C88;} .as-brick.is-wrong{box-shadow:inset 0 0 0 4px #E0663A;}'
  + '.as-brick:disabled{opacity:1;}'
  + '.as-tally{display:flex;align-items:flex-end;gap:4px;flex:0 0 auto;} .as-tallyimg{display:block;object-fit:contain;} .as-tally.is-hop .as-tallyimg{animation:asHop .5s ease-out 2;} .as-wrap.is-fast .as-tally.is-hop .as-tallyimg{animation:none;} @keyframes asHop{40%{transform:translateY(-10px);}}'
  + '.as-jarbody{fill:#FFFDF6;stroke:' + INK + ';stroke-width:2.5;} .as-notch{fill:#F1E6D2;} .as-notch.is-full{fill:' + WOOD + ';}'
  + '.as-bench{position:relative;display:flex;flex-direction:column;gap:6px;margin-top:8px;} .as-wrap.is-cramp .as-bench{margin-top:6px;}'
  + '.as-sieve,.as-tray{position:relative;width:100%;} .as-svg{position:absolute;left:0;top:0;display:block;overflow:visible;}'
  + '.as-frame{fill:#E9DCC4;stroke:' + INK + ';stroke-width:2.5;} .as-hole{fill:#C9B48E;}'
  + '.as-cup{fill:#FFF6E2;stroke:#146B5E;stroke-width:2.5;} .as-cupdot{fill:' + WOOD + ';}'
  + '.as-nut{fill:' + WOOD + ';stroke:' + WOODD + ';stroke-width:1;} .as-capd{fill:' + WOODD + ';}'
  + '.as-lab{fill:#146B5E;} .as-labt{font-family:' + H + ';font-weight:800;font-size:14px;fill:#fff;}'
  + '.as-sieve.is-shaking .as-svg{animation:asShake .6s ease-in-out;} @keyframes asShake{20%{transform:translateX(-5px);}40%{transform:translateX(5px);}60%{transform:translateX(-4px);}80%{transform:translateX(3px);}}'
  + '.as-grip{position:absolute;left:0;width:44px;border:0;background:none;padding:0;cursor:grab;touch-action:none;} .as-grip svg{width:44px;height:100%;display:block;} .as-gripbody{fill:#146B5E;} .as-ridge{stroke:#fff;stroke-width:2.6;stroke-linecap:round;opacity:.8;} .as-grip:disabled{cursor:default;} .as-grip:disabled .as-gripbody{fill:#9DB9B2;}'
  + '.as-groove{fill:#F4ECDD;stroke:#C9B48E;stroke-width:2;} .as-groove.is-full{fill:#E6F3EE;stroke:#2E9C88;} .as-seat{fill:#E3D6BC;}'
  + '.as-seated.is-new{animation:asDrop .32s ease-out both;} @keyframes asDrop{0%{transform:translateY(-34px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.as-groovebtn{position:absolute;border:0;background:transparent;border-radius:22px;cursor:pointer;padding:0;} .as-groovebtn:focus-visible{outline:3px solid #146B5E;}'
  + '.as-cloth{position:absolute;inset:-3px;border-radius:16px;background:#FBF3E4 repeating-linear-gradient(45deg,rgba(201,180,142,.18) 0 6px,transparent 6px 14px);box-shadow:inset 0 0 0 3px #E2D6BF,inset 0 0 0 7px #FBF3E4,inset 0 0 0 8.5px #C9B48E,0 3px 0 #E2D6BF;} .as-cloth.is-bulge{background-color:#F7EAD2;}'
  + '.as-cloth:before,.as-cloth:after{content:"";position:absolute;top:-6px;width:28px;height:16px;border-radius:6px;background:#E9B92E;} .as-cloth:before{left:18px;} .as-cloth:after{right:18px;}'
  + '.as-splits{display:flex;flex-direction:column;gap:2px;} .as-splits:has(.as-split:empty){display:none;} .as-wrap.is-narrow .as-splits{flex-direction:row;justify-content:center;gap:18px;flex-wrap:wrap;} .as-split{margin:0;text-align:center;font-family:' + H + ';font-weight:800;font-size:20px;color:#146B5E;line-height:1.2;} .as-split:empty{display:none;} .as-onesline{color:' + WOODD + ';} .as-wrap.is-narrow .as-split{font-size:15px;line-height:1.15;}'
  + '.as-read{display:flex;flex-direction:column;gap:8px;min-width:0;} .as-tallybox:empty{display:none;} .as-tallybox{display:flex;justify-content:center;}'
  + '.as-wins{display:flex;flex-direction:column;gap:8px;} .as-wrap.is-narrow .as-wins{flex-direction:row;justify-content:center;align-items:center;gap:6px;}'
  + '.as-win{position:relative;display:flex;align-items:center;justify-content:center;gap:8px;height:56px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 3px #CDBFA4;cursor:pointer;padding:0 10px;font-family:' + H + ';font-weight:800;font-size:32px;color:' + INK + ';}'
  + '.as-wrap.is-narrow .as-win{height:52px;flex:1 1 0;min-width:0;max-width:120px;padding:0 6px;gap:4px;font-size:26px;}'
  + '.as-win.is-focus{box-shadow:inset 0 0 0 4px #146B5E;} .as-win.is-wrong{box-shadow:inset 0 0 0 4px #E0663A;animation:asWob .45s 1;} .as-win:disabled{cursor:default;}'
  + '.as-cells{display:inline-flex;gap:2px;} .as-cell{display:inline-block;min-width:22px;height:38px;line-height:40px;border-bottom:3px solid #CDBFA4;text-align:center;} .as-wrap.is-narrow .as-cell{min-width:17px;height:32px;line-height:34px;} .as-zero{display:inline-block;min-width:20px;line-height:40px;color:' + INK + ';} .as-wrap.is-narrow .as-zero{min-width:16px;line-height:34px;}'
  + '.as-ico{width:17px;height:28px;flex:0 0 auto;} .as-ico.is-both{width:34px;} .as-wrap.is-cramp .as-ico.is-both{width:28px;} .as-ico-cup{fill:#FFF6E2;stroke:#146B5E;stroke-width:2.2;} .as-ico-nut{fill:' + WOOD + ';} .as-ico-cap{fill:' + WOODD + ';} .as-ico-plus{stroke:' + INK + ';stroke-width:2.4;stroke-linecap:round;}'
  + '.as-pencil{position:absolute;right:-6px;top:-14px;font-size:18px;color:#8E8A98;background:#FFFDF6;border-radius:8px;padding:0 5px;box-shadow:0 0 0 1px #CDBFA4;line-height:1.3;}'
  + '.as-pad{display:grid;grid-template-columns:repeat(4,minmax(44px,1fr));gap:6px;} .as-wrap.is-narrow .as-pad{grid-template-columns:repeat(6,minmax(44px,1fr));} .as-wrap.is-cramp .as-pad{gap:4px;}'
  + '.as-key,.as-go{height:48px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';cursor:pointer;padding:0;} .as-wrap.is-narrow .as-key,.as-wrap.is-narrow .as-go{height:44px;} .as-key:disabled{opacity:.4;cursor:default;}'
  + '.as-go{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-size:16px;padding:0 4px;line-height:1.1;} .as-go svg{width:18px;height:18px;vertical-align:-3px;margin-right:3px;} .as-wrap.is-narrow .as-golab{display:none;} .as-wrap.is-narrow .as-go svg{width:24px;height:24px;margin:0;}'
  + '.as-wrap.is-wide .as-golab{display:none;} .as-wrap.is-wide .as-go svg{width:24px;height:24px;margin:0;}'
  + '.as-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .as-wrap.is-narrow .as-note{font-size:16px;line-height:1.25;} .as-note:empty{display:none;} .as-note.is-hint{color:#9A3D1C;}'
  + '.as-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;} .as-note.is-ok.is-step{position:static;width:auto;height:auto;clip:auto;}'
  + '.as-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* the smallest phones (320 × 640): every gap and window a little tighter */
  + '.as-wrap.is-cramp .as-win{height:46px;} .as-wrap.is-cramp .as-app,.as-wrap.is-cramp .as-read,.as-wrap.is-cramp{gap:4px;}';
  var st = document.createElement('style'); st.id = 'as-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.AcornSieveActivity = AcornSieveActivity;
