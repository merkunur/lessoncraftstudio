/* =====================================================================
   chimney-roof-activity.js — ACTIVITY #137 of the one-by-one rebuild:
   "Even or Odd?" → THE CHIMNEY ROOF (2.OA.C.3; all 11 locales).
   Model: chimney-roof-core.js (ChimneyRoofCore).
   Design: docs/activities-rebuild/designs/137-choice-board.md
   ---------------------------------------------------------------------
   The invention: every brick poured from the bag rolls into the LOWER
   column of a tower two bricks wide, so a number becomes a two-wide
   tower. Only an even number ends flat and takes the flat roof; an odd
   number leaves one brick sticking up that only the chimney roof covers.
   The wrong roof tips and slides off. Then the two columns are written as
   the two equal parts (n = a + a, + 1 with the chimney). To 99: the tens
   arrive as finished slabs — always flat — so only the ones decide.
   No timer, no score.
   Test seams: window.ChimneyRoofActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._pour / ._unpour /
   ._roof / ._seat / ._select / ._type / ._del / ._check / .FAST / .OK_MS.
   ===================================================================== */
var ChimneyRoofActivity = {
  id: 'chimney-roof',
  /* the drawn apparatus (the hierarchy gate): the tower, the roofs, the bag, the street */
  apparatusClasses: ['cr-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Even or Odd?","de":"Gerade oder ungerade?","fr":"Pair ou impair ?","es":"¿Par o impar?","pt":"Par ou ímpar?","it":"Pari o dispari?","nl":"Even of oneven?","sv":"Jämnt eller udda?","da":"Lige eller ulige?","no":"Partall eller oddetall?","fi":"Parillinen vai pariton?"},
    instruction: {"en":"Pour the bricks into the tower and find the roof that fits.","de":"Schütte die Steine in den Turm und finde das Dach, das passt.","fr":"Verse les briques dans la tour et trouve le toit qui va dessus.","es":"Vacía los bloques en la torre y encuentra el techo que le queda.","pt":"Despeje os tijolos na torre e encontre o telhado que encaixa.","it":"Versa i mattoncini nella torre e trova il tetto giusto.","nl":"Schud de blokjes in de toren en zoek het dak dat past.","sv":"Häll klossarna i tornet och hitta taket som passar.","da":"Hæld klodserne i tårnet, og find det tag, der passer.","no":"Hell klossene i tårnet, og finn taket som passer.","fi":"Kaada palikat torniin ja etsi katto, joka sopii."},
    tBuild: {"en":"Pour {n} bricks. Which roof fits?","de":"Schütte {n} Steine hinein. Welches Dach passt?","fr":"Verse {n} briques. Quel toit va dessus ?","es":"Vacía {n} bloques. ¿Qué techo le queda?","pt":"Despeje {n} tijolos. Qual telhado encaixa?","it":"Versa {n} mattoncini. Quale tetto va bene?","nl":"Schud er {n} blokjes in. Welk dak past?","sv":"Häll i {n} klossar. Vilket tak passar?","da":"Hæld {n} klodser i. Hvilket tag passer?","no":"Hell i {n} klosser. Hvilket tak passer?","fi":"Kaada {n} palikkaa. Mikä katto sopii?"},
    tBefore: {"en":"Choose the roof first, then pour {n} bricks.","de":"Wähle zuerst das Dach und schütte dann {n} Steine hinein.","fr":"Choisis d’abord le toit, puis verse {n} briques.","es":"Primero elige el techo y luego vacía {n} bloques.","pt":"Primeiro escolha o telhado e depois despeje {n} tijolos.","it":"Prima scegli il tetto, poi versa {n} mattoncini.","nl":"Kies eerst het dak en schud er dan {n} blokjes in.","sv":"Välj taket först och häll sedan i {n} klossar.","da":"Vælg taget først, og hæld så {n} klodser i.","no":"Velg taket først, og hell så i {n} klosser.","fi":"Valitse ensin katto ja kaada sitten {n} palikkaa."},
    t99: {"en":"The tens are already built. Choose the roofs, then pour the ones.","de":"Die Zehner sind schon gebaut. Wähle die Dächer und schütte dann die Einer hinein.","fr":"Les dizaines sont déjà construites. Choisis les toits, puis verse les unités.","es":"Las decenas ya están construidas. Elige los techos y luego vacía las unidades.","pt":"As dezenas já estão construídas. Escolha os telhados e depois despeje as unidades.","it":"Le decine sono già costruite. Scegli i tetti, poi versa le unità.","nl":"De tientallen staan er al. Kies de daken en schud er dan de eenheden in.","sv":"Tiotalen är redan byggda. Välj taken och häll sedan i entalen.","da":"Tierne er allerede bygget. Vælg tagene, og hæld så enerne i.","no":"Tierne er allerede bygget. Velg takene, og hell så i enerne.","fi":"Kymmenet on jo rakennettu. Valitse katot ja kaada sitten ykköset."},
    tEq: {"en":"Write the two equal parts.","de":"Schreib die zwei gleichen Teile auf.","fr":"Écris les deux parts égales.","es":"Escribe las dos partes iguales.","pt":"Escreva as duas partes iguais.","it":"Scrivi le due parti uguali.","nl":"Schrijf de twee gelijke delen op.","sv":"Skriv de två lika stora delarna.","da":"Skriv de to lige store dele.","no":"Skriv de to like store delene.","fi":"Kirjoita kaksi yhtä suurta osaa."},
    even: {"en":"Even","de":"Gerade","fr":"Pair","es":"Par","pt":"Par","it":"Pari","nl":"Even","sv":"Jämnt","da":"Lige","no":"Partall","fi":"Parillinen"},
    odd: {"en":"Odd","de":"Ungerade","fr":"Impair","es":"Impar","pt":"Ímpar","it":"Dispari","nl":"Oneven","sv":"Udda","da":"Ulige","no":"Oddetall","fi":"Pariton"},
    pourBtn: {"en":"Pour","de":"Schütten","fr":"Verser","es":"Vaciar","pt":"Despejar","it":"Versa","nl":"Schudden","sv":"Häll","da":"Hæld","no":"Hell","fi":"Kaada"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setNum: {"en":"Numbers","de":"Zahlen","fr":"Nombres","es":"Números","pt":"Números","it":"Numeri","nl":"Getallen","sv":"Tal","da":"Tal","no":"Tall","fi":"Luvut"},
    n10: {"en":"To 10","de":"Bis 10","fr":"Jusqu’à 10","es":"Hasta 10","pt":"Até 10","it":"Fino a 10","nl":"Tot 10","sv":"Upp till 10","da":"Op til 10","no":"Opp til 10","fi":"10:een asti"},
    n20: {"en":"To 20","de":"Bis 20","fr":"Jusqu’à 20","es":"Hasta 20","pt":"Até 20","it":"Fino a 20","nl":"Tot 20","sv":"Upp till 20","da":"Op til 20","no":"Opp til 20","fi":"20:een asti"},
    n99: {"en":"To 99","de":"Bis 99","fr":"Jusqu’à 99","es":"Hasta 99","pt":"Até 99","it":"Fino a 99","nl":"Tot 99","sv":"Upp till 99","da":"Op til 99","no":"Opp til 99","fi":"99:ään asti"},
    setRoof: {"en":"Roof","de":"Dach","fr":"Toit","es":"Techo","pt":"Telhado","it":"Tetto","nl":"Dak","sv":"Tak","da":"Tag","no":"Tak","fi":"Katto"},
    rAfter: {"en":"After the tower","de":"Nach dem Turm","fr":"Après la tour","es":"Después de la torre","pt":"Depois da torre","it":"Dopo la torre","nl":"Na de toren","sv":"Efter tornet","da":"Efter tårnet","no":"Etter tårnet","fi":"Tornin jälkeen"},
    rBefore: {"en":"Before the tower","de":"Vor dem Turm","fr":"Avant la tour","es":"Antes de la torre","pt":"Antes da torre","it":"Prima della torre","nl":"Voor de toren","sv":"Före tornet","da":"Før tårnet","no":"Før tårnet","fi":"Ennen tornia"},
    hPour: {"en":"Pour the bricks first.","de":"Schütte zuerst die Steine hinein.","fr":"Verse d’abord les briques.","es":"Primero vacía los bloques.","pt":"Primeiro despeje os tijolos.","it":"Prima versa i mattoncini.","nl":"Schud eerst de blokjes erin.","sv":"Häll i klossarna först.","da":"Hæld klodserne i først.","no":"Hell i klossene først.","fi":"Kaada ensin palikat."},
    hRoofs: {"en":"Put a roof on every bag.","de":"Setz auf jeden Beutel ein Dach.","fr":"Pose un toit sur chaque sac.","es":"Pon un techo en cada bolsa.","pt":"Coloque um telhado em cada saco.","it":"Metti un tetto su ogni sacchetto.","nl":"Zet op elke zak een dak.","sv":"Sätt ett tak på varje påse.","da":"Sæt et tag på hver pose.","no":"Sett et tak på hver pose.","fi":"Laita jokaisen pussin päälle katto."},
    hEq: {"en":"Write the two equal parts.","de":"Schreib die zwei gleichen Teile auf.","fr":"Écris les deux parts égales.","es":"Escribe las dos partes iguales.","pt":"Escreva as duas partes iguais.","it":"Scrivi le due parti uguali.","nl":"Schrijf de twee gelijke delen op.","sv":"Skriv de två lika stora delarna.","da":"Skriv de to lige store dele.","no":"Skriv de to like store delene.","fi":"Kirjoita kaksi yhtä suurta osaa."},
    miss1: {"en":"Look at the top: is every brick paired, or is one alone?","de":"Schau ganz oben: Hat jeder Stein einen Partner, oder ist einer allein?","fr":"Regarde le haut : chaque brique a-t-elle sa paire, ou y en a-t-il une toute seule ?","es":"Mira arriba: ¿cada bloque tiene pareja o hay uno solo?","pt":"Olhe em cima: cada tijolo tem par ou tem um sozinho?","it":"Guarda in cima: ogni mattoncino ha un compagno o ce n’è uno da solo?","nl":"Kijk bovenaan: heeft elk blokje een maatje, of staat er een alleen?","sv":"Titta högst upp: har varje kloss en kompis, eller står en ensam?","da":"Se øverst: har hver klods en makker, eller står en alene?","no":"Se øverst: har hver kloss en makker, eller står en alene?","fi":"Katso tornin huippua: onko jokaisella palikalla pari, vai onko yksi yksin?"},
    miss99: {"en":"The slabs are always flat — look at the ones.","de":"Die Platten sind immer flach – schau auf die Einer.","fr":"Les plaques sont toujours plates : regarde les unités.","es":"Las placas siempre quedan parejas: mira las unidades.","pt":"As placas são sempre retas: olhe as unidades.","it":"Le lastre sono sempre piatte: guarda le unità.","nl":"De platen zijn bovenaan altijd plat: kijk naar de eenheden.","sv":"Plattorna är alltid platta upptill – titta på entalen.","da":"Pladerne er altid flade foroven – se på enerne.","no":"Platene er alltid flate oppe – se på enerne.","fi":"Laatat ovat aina tasaisia – katso ykkösiä."},
    miss2: {"en":"Pairs stay together. Is one brick left over?","de":"Jedes Paar hält zusammen. Bleibt einer übrig?","fr":"Les paires restent ensemble. Est-ce qu’il en reste une ?","es":"Cada pareja está junta. ¿Sobra alguno?","pt":"Cada par está junto. Sobra algum?","it":"Ogni coppia sta insieme. Ne avanza uno?","nl":"Elk paar hoort bij elkaar. Blijft er een over?","sv":"Varje par hör ihop. Blir det någon kloss över?","da":"Hvert par hører sammen. Er der en tilovers?","no":"Hvert par hører sammen. Blir det noen kloss til overs?","fi":"Jokainen pari kuuluu yhteen. Jääkö yksi palikka yli?"},
    eqUnequal: {"en":"The two parts must be the same number.","de":"Die zwei Teile müssen dieselbe Zahl sein.","fr":"Les deux parts doivent être le même nombre.","es":"Las dos partes deben ser el mismo número.","pt":"As duas partes precisam ser o mesmo número.","it":"Le due parti devono essere lo stesso numero.","nl":"De twee delen moeten hetzelfde getal zijn.","sv":"De två delarna måste vara samma tal.","da":"De to dele skal være det samme tal.","no":"De to delene må være det samme tallet.","fi":"Kahden osan täytyy olla sama luku."},
    eqMiss1: {"en":"Count only the bricks in one column that have a partner.","de":"Zähl in einer Säule nur die Steine, die einen Partner haben.","fr":"Dans une colonne, compte seulement les briques qui ont leur paire.","es":"En una columna, cuenta solo los bloques que tienen pareja.","pt":"Em uma coluna, conte só os tijolos que têm par.","it":"In una colonna, conta solo i mattoncini che hanno un compagno.","nl":"Tel in één kolom alleen de blokjes die een maatje hebben.","sv":"Räkna bara de klossar i en stapel som har en kompis.","da":"Tæl kun de klodser i én søjle, der har en makker.","no":"Tell bare de klossene i én søyle som har en makker.","fi":"Laske yhdestä pinosta vain ne palikat, joilla on pari."},
    eqMiss2: {"en":"Count the bricks with a partner in the column under this box again.","de":"Zähl die Steine mit Partner in der Säule unter diesem Kästchen noch einmal.","fr":"Recompte les briques qui ont leur paire dans la colonne sous cette case.","es":"Vuelve a contar los bloques con pareja en la columna debajo de esta casilla.","pt":"Conte de novo os tijolos com par na coluna embaixo deste quadrinho.","it":"Riconta i mattoncini con un compagno nella colonna sotto questa casella.","nl":"Tel de blokjes met een maatje in de kolom onder dit vakje nog eens.","sv":"Räkna klossarna med kompis i stapeln under den här rutan igen.","da":"Tæl klodserne med en makker i søjlen under denne boks igen.","no":"Tell klossene med makker i søylen under denne ruten igjen.","fi":"Laske uudelleen ne palikat, joilla on pari, tämän ruudun alla olevasta pinosta."},
    roofFlat: {"en":"Flat top: every brick has a partner.","de":"Oben flach: Jeder Stein hat einen Partner.","fr":"Le haut est plat : chaque brique a sa paire.","es":"Arriba queda parejo: cada bloque tiene pareja.","pt":"Em cima ficou reto: cada tijolo tem par.","it":"In cima è piatto: ogni mattoncino ha un compagno.","nl":"Boven is het plat: elk blokje heeft een maatje.","sv":"Platt överst: varje kloss har en kompis.","da":"Fladt øverst: hver klods har en makker.","no":"Flatt øverst: hver kloss har en makker.","fi":"Yläpää on tasainen: jokaisella palikalla on pari."},
    roofChim: {"en":"One brick sticks up: the chimney covers it.","de":"Ein Stein ragt oben heraus: Der Schornstein deckt ihn ab.","fr":"Une brique dépasse : la cheminée la recouvre.","es":"Un bloque sobresale: la chimenea lo cubre.","pt":"Um tijolo sobra em cima: a chaminé cobre esse tijolo.","it":"Un mattoncino sporge: il camino lo copre.","nl":"Eén blokje steekt uit: de schoorsteen dekt het af.","sv":"En kloss sticker upp: skorstenen täcker den.","da":"En klods stikker op: skorstenen dækker den.","no":"En kloss stikker opp: pipa dekker den.","fi":"Yksi palikka jää koholle: savupiippu peittää sen."},
    okEven: {"en":"{n} = {a} + {a}: every brick has a partner. {n} is even.","de":"{n} = {a} + {a}: Jeder Stein hat einen Partner. {n} ist gerade.","fr":"{n} = {a} + {a} : chaque brique a sa paire. {n} est pair.","es":"{n} = {a} + {a}: cada bloque tiene pareja. {n} es par.","pt":"{n} = {a} + {a}: cada tijolo tem par. {n} é par.","it":"{n} = {a} + {a}: ogni mattoncino ha un compagno. {n} è pari.","nl":"{n} = {a} + {a}: elk blokje heeft een maatje. {n} is even.","sv":"{n} = {a} + {a}: varje kloss har en kompis. {n} är ett jämnt tal.","da":"{n} = {a} + {a}: hver klods har en makker. {n} er et lige tal.","no":"{n} = {a} + {a}: hver kloss har en makker. {n} er et partall.","fi":"{n} = {a} + {a}: jokaisella palikalla on pari. {n} on parillinen."},
    okOdd: {"en":"{n} = {a} + {a} + 1: one brick is left over. {n} is odd.","de":"{n} = {a} + {a} + 1: Ein Stein bleibt übrig. {n} ist ungerade.","fr":"{n} = {a} + {a} + 1 : il reste une brique. {n} est impair.","es":"{n} = {a} + {a} + 1: sobra un bloque. {n} es impar.","pt":"{n} = {a} + {a} + 1: sobra um tijolo. {n} é ímpar.","it":"{n} = {a} + {a} + 1: avanza un mattoncino. {n} è dispari.","nl":"{n} = {a} + {a} + 1: er blijft één blokje over. {n} is oneven.","sv":"{n} = {a} + {a} + 1: en kloss blir över. {n} är ett udda tal.","da":"{n} = {a} + {a} + 1: en klods er tilovers. {n} er et ulige tal.","no":"{n} = {a} + {a} + 1: en kloss blir til overs. {n} er et oddetall.","fi":"{n} = {a} + {a} + 1: yksi palikka jää yli. {n} on pariton."},
    ok99: {"en":"Every roof fits: the tens are made of pairs, so only the ones decide.","de":"Jedes Dach passt: Die Zehner sind lauter Paare, also entscheiden nur die Einer.","fr":"Tous les toits vont bien : les dizaines sont faites de paires, donc seules les unités décident.","es":"Todos los techos quedan: las decenas están hechas solo de parejas, así que solo deciden las unidades.","pt":"Todos os telhados encaixam: as dezenas são feitas só de pares, então só as unidades decidem.","it":"Ogni tetto va bene: le decine sono tutte coppie, quindi decidono solo le unità.","nl":"Elk dak past: de tientallen zijn allemaal paren, dus alleen de eenheden beslissen.","sv":"Varje tak passar: tiotalen är bara par, så det är entalen som avgör.","da":"Hvert tag passer: tierne er lutter par, så det er enerne, der afgør det.","no":"Hvert tak passer: tierne er bare par, så det er enerne som avgjør.","fi":"Jokainen katto sopii: kymmenet ovat pelkkiä pareja, joten vain ykköset ratkaisevat."},
    aBag: {"en":"Pour one brick: {k} left","de":"Einen Stein schütten: noch {k}","fr":"Verser une brique : il en reste {k}","es":"Vaciar un bloque: quedan {k}","pt":"Despejar um tijolo: restam {k}","it":"Versa un mattoncino: ne restano {k}","nl":"Eén blokje schudden: nog {k}","sv":"Häll en kloss: {k} kvar","da":"Hæld en klods: {k} tilbage","no":"Hell en kloss: {k} igjen","fi":"Kaada yksi palikka: {k} jäljellä"},
    aBag99: {"en":"Bag {n}: {roof}","de":"Beutel {n}: {roof}","fr":"Sac {n} : {roof}","es":"Bolsa {n}: {roof}","pt":"Saco {n}: {roof}","it":"Sacchetto {n}: {roof}","nl":"Zak {n}: {roof}","sv":"Påse {n}: {roof}","da":"Pose {n}: {roof}","no":"Pose {n}: {roof}","fi":"Pussi {n}: {roof}"},
    aNoRoof: {"en":"no roof yet","de":"noch kein Dach","fr":"pas encore de toit","es":"todavía sin techo","pt":"ainda sem telhado","it":"ancora senza tetto","nl":"nog geen dak","sv":"inget tak än","da":"intet tag endnu","no":"ikke noe tak ennå","fi":"ei vielä kattoa"},
    aFlat: {"en":"Flat roof: {w}","de":"Flaches Dach: {w}","fr":"Toit plat : {w}","es":"Techo plano: {w}","pt":"Telhado plano: {w}","it":"Tetto piatto: {w}","nl":"Plat dak: {w}","sv":"Platt tak: {w}","da":"Fladt tag: {w}","no":"Flatt tak: {w}","fi":"Tasakatto: {w}"},
    aChim: {"en":"Chimney roof: {w}","de":"Dach mit Schornstein: {w}","fr":"Toit à cheminée : {w}","es":"Techo con chimenea: {w}","pt":"Telhado com chaminé: {w}","it":"Tetto con camino: {w}","nl":"Dak met schoorsteen: {w}","sv":"Tak med skorsten: {w}","da":"Tag med skorsten: {w}","no":"Tak med pipe: {w}","fi":"Savupiippukatto: {w}"},
    aTower: {"en":"Bricks in the tower: {k}. Tap to send one back.","de":"Steine im Turm: {k}. Tippe, um einen zurückzuschicken.","fr":"Briques dans la tour : {k}. Touche pour en renvoyer une.","es":"Bloques en la torre: {k}. Toca para regresar uno.","pt":"Tijolos na torre: {k}. Toque para devolver um.","it":"Mattoncini nella torre: {k}. Tocca per rimandarne indietro uno.","nl":"Blokjes in de toren: {k}. Tik om er een terug te sturen.","sv":"Klossar i tornet: {k}. Tryck för att skicka tillbaka en.","da":"Klodser i tårnet: {k}. Tryk for at sende en tilbage.","no":"Klosser i tårnet: {k}. Trykk for å sende en tilbake.","fi":"Palikoita tornissa: {k}. Napauta lähettääksesi yhden takaisin."},
    aBox1: {"en":"First part","de":"Erster Teil","fr":"Première part","es":"Primera parte","pt":"Primeira parte","it":"Prima parte","nl":"Eerste deel","sv":"Första delen","da":"Første del","no":"Første del","fi":"Ensimmäinen osa"},
    aBox2: {"en":"Second part","de":"Zweiter Teil","fr":"Deuxième part","es":"Segunda parte","pt":"Segunda parte","it":"Seconda parte","nl":"Tweede deel","sv":"Andra delen","da":"Anden del","no":"Andre del","fi":"Toinen osa"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Sudda","da":"Slet","no":"Slett","fi":"Poista"},
  },/*STRINGS-END*/

  defaults: { num: '20', roof: 'after' },
  settings: [
    { key: 'num', type: 'choice', labelKey: 'setNum', options: [{ value: '10', labelKey: 'n10' }, { value: '20', labelKey: 'n20' }, { value: '99', labelKey: 'n99' }] },
    { key: 'roof', type: 'choice', labelKey: 'setRoof', options: [{ value: 'after', labelKey: 'rAfter' }, { value: 'before', labelKey: 'rBefore' }] }
  ],
  OK_MS: 500, FAST: false, FALL_MS: 700,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null;
    this._timers = []; this._ro = null; this._view = {}; this._hold = null;
    injectChimneyCSS();
  },
  destroy: function () { this._clearTimers(); this._stopHold(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _num: function () { return ChimneyRoofCore.numOf(this._setting('num')); },
  _mode: function () { return ChimneyRoofCore.roofModeOf(this._setting('roof'), this._num()); },
  _key: function () { return this._num() + '/' + this._mode(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = ChimneyRoofCore.rounds(this._num()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._plan = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = ChimneyRoofCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._num(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._plan = P; this._orderForPool = pool; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'chimney.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st; if (!st) return '';
    if (st.num === '99') return this._t('t99');
    if (st.phase === 'eq' && !st.done) return this._t('tEq');
    return this._t(st.mode === 'before' ? 'tBefore' : 'tBuild', { n: st.n });
  },
  _setPrompt: function () { var line = this._taskLine(); if (this._pa && !(this.st && this.st.done)) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe && !(this.st && this.st.done)) pe.textContent = line; },
  _start: function (r) {
    this._clearTimers(); this._stopHold();
    /* never a round without a plan: an unplanned rack would stand the flat roof on one side */
    if (!this._plan || this._plan.order.indexOf(r) < 0) this._plan = ChimneyRoofCore.plan(this._num(), Math.random, null);
    this.st = ChimneyRoofCore.newState(this._num(), this._mode(), r, { side: this._plan.side[r] });
    this._view = { note: '', ok: '', fell: null, fellBags: null, landed: false, poured99: false };
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
  _dims: function () { var W = this._width(), B = ChimneyRoofCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'cr-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="cr-main"></div><p class="cr-note" aria-live="polite"></p><p class="cr-sr" aria-live="polite"></p>';
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
  _sr: function (s) { var el = this._qs('.cr-sr'); if (el) el.textContent = s; },
  _paint_: function () {
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'cr-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.num !== '99' && (st.phase === 'eq' || st.done) ? ' is-eq' : '') + (this.FAST ? ' is-fast' : '') + ' n-' + st.num;
    var main = this._qs('.cr-main'); main.innerHTML = '';
    if (st.num === '99') this._paint99(main, D); else this._paintOne(main, D);
    var note = this._qs('.cr-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'cr-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'cr-note is-hint'; }
    else { note.textContent = ''; note.className = 'cr-note'; }
    this._setPrompt();
  },

  /* ---------- one tower (to 10 / to 20) ---------- */
  _paintOne: function (main, D) {
    var st = this.st, v = this._view, self = this;
    var left = this.api.el('div', 'cr-left'), right = this.api.el('div', 'cr-right');
    /* the tower */
    var tower = this._btn('cr-tower cr-art', 'tower', this._t('aTower', { k: st.poured }), this._towerSvg(D));
    tower.disabled = !!st.roof || st.poured === 0 || st.done;
    tower.addEventListener('click', function () { self._unpour(); });
    left.appendChild(tower);
    /* the bag: tap pours one, hold pours on */
    var bag = this._btn('cr-bag cr-art', 'bag', this._t('aBag', { k: st.n - st.poured }), this._bagSvg(st.n, st.n - st.poured));
    bag.disabled = st.poured >= st.n || !!st.roof || st.done;
    bag.addEventListener('pointerdown', function (e) { if (bag.disabled) return; self._startHold(); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { bag.addEventListener(ev, function () { self._stopHold(); }); });
    bag.addEventListener('click', function () { if (self._held) { self._held = false; return; } self._pour(); });
    /* the roof rack, its order per round */
    var rack = this.api.el('div', 'cr-rack');
    var kinds = st.side === 'flatLeft' ? ['flat', 'chimney'] : ['chimney', 'flat'];
    kinds.forEach(function (k) {
      var word = self._t(k === 'flat' ? 'even' : 'odd');
      var b = self._btn('cr-roofbtn cr-art' + (st.hover === k ? ' is-hover' : '') + (v.fell === k ? ' is-fell' : ''), 'roof-' + k, self._t(k === 'flat' ? 'aFlat' : 'aChim', { w: word }), self._roofIcon(k) + '<span class="cr-word">' + esc(word) + '</span>');
      b.disabled = !!st.roof || st.done;
      b.setAttribute('aria-pressed', st.hover === k ? 'true' : 'false');
      b.addEventListener('click', function () { self._roof(k); });
      rack.appendChild(b);
    });
    var top = this.api.el('div', 'cr-top'); top.appendChild(bag); top.appendChild(rack);
    right.appendChild(top);
    /* the equation */
    if (st.phase === 'eq' || st.done) right.appendChild(this._eqEl(D));
    var row = this.api.el('div', 'cr-row'); row.appendChild(left); row.appendChild(right);
    main.appendChild(row);
  },
  _eqEl: function (D) {
    var st = this.st, v = this._view, self = this, h = Math.floor(st.n / 2), odd = st.n % 2 === 1;
    var box = this.api.el('div', 'cr-eqbox');
    var line = this.api.el('div', 'cr-eq');
    line.innerHTML = '<span class="cr-eqn">' + st.n + '</span><span class="cr-op">=</span>';
    [0, 1].forEach(function (i) {
      var b = self._btn('cr-slot' + (st.focus === i && !st.done ? ' is-focus' : '') + (st.eqHelp && st.last && st.last.bad === i ? ' is-shake' : '') + (st.done ? ' is-ok' : ''), 'box-' + i, self._t(i ? 'aBox2' : 'aBox1'), esc(st.eq[i] || ''));
      b.disabled = st.done;
      b.addEventListener('click', function () { ChimneyRoofCore.focus(st, i); self._paint(); });
      line.appendChild(b);
      if (i === 0) line.insertAdjacentHTML('beforeend', '<span class="cr-op">+</span>');
    });
    if (odd) line.insertAdjacentHTML('beforeend', '<span class="cr-op">+</span><span class="cr-one">1</span>');
    box.appendChild(line);
    if (!st.done) {
      var keys = this.api.el('div', 'cr-keys');
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
        var b = self._btn('cr-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
        b.addEventListener('click', function () { if (k === 'del') self._del(); else self._type(k); });
        keys.appendChild(b);
      });
      box.appendChild(keys);
      /* phones: Check is the twelfth key of the 6 × 2 pad (a ✓ with its word as the label) */
      var chk = D.wide ? this._btn('cr-check', 'check', null, esc(this._t('checkBtn'))) : this._btn('cr-key cr-checkkey', 'check', this._t('checkBtn'), '✓');
      chk.addEventListener('click', function () { self._check(); });
      (D.wide ? box : keys).appendChild(chk);
    }
    return box;
  },
  /* the tower drawing: two columns, the V floor, the roof (fitted, hovering or falling) */
  _towerSvg: function (D) {
    var st = this.st, v = this._view, cap = st.num === '10' ? 5 : 10;
    var eqNarrow = !D.wide && (st.phase === 'eq' || st.done);
    /* phones: once the roof is on, the tower shrinks so the equation and Check stay in view */
    var bw = D.wide ? 64 : D.cramp ? 46 : 52, bh = D.wide ? 34 : eqNarrow && cap === 10 ? 19 : D.cramp ? 21 : 23, pad = 14, roofH = D.wide ? 54 : eqNarrow ? 34 : 40;
    var W = bw * 2 + pad * 2, base = roofH + 12 + cap * bh, H = base + (D.wide ? 44 : 38), x0 = pad;
    var c = ChimneyRoofCore.columns(st.poured), h = '', T = st.roof || v.fell || null;
    /* the glass shaft and its V floor */
    h += '<rect class="cr-glass" x="' + (x0 - 5) + '" y="' + (roofH + 6) + '" width="' + (bw * 2 + 10) + '" height="' + (base - roofH - 6 + 4) + '" rx="6"/>';
    h += '<path class="cr-floor" d="M' + (x0 - 5) + ' ' + (base + 4) + ' L' + (x0 + bw) + ' ' + (base + 12) + ' L' + (x0 + bw * 2 + 5) + ' ' + (base + 4) + '"/>';
    var helpPairs = st.help && st.last && st.last.result === 'fell', glowTop = st.last && st.last.result === 'fell' && !st.roof && !st.done;
    var lone = c.L > c.R;
    for (var k = 0; k < st.poured; k++) {
      var col = k % 2 === 0 ? 0 : 1, layer = Math.floor(k / 2), y = base - (layer + 1) * bh, x = x0 + col * bw;
      var isTop = (lone && k === st.poured - 1) || (!lone && layer === c.R - 1), isLone = lone && k === st.poured - 1;
      var cls = 'cr-brick ' + (col ? 'cr-r' : 'cr-l') + (k === st.poured - 1 && v.justPoured ? ' is-new' : '') + (glowTop && isTop ? ' is-glow' : '') + (st.done && isLone ? ' is-plus' : '');
      h += '<rect class="' + cls + '" x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (bw - 4) + '" height="' + (bh - 4) + '" rx="5"/>';
      h += '<line class="cr-stud" x1="' + (x + 8) + '" y1="' + (y + 7) + '" x2="' + (x + bw - 8) + '" y2="' + (y + 7) + '"/>';
    }
    /* miss 2: a bracket joins each layer's pair; the lone brick is ringed */
    if (helpPairs) {
      for (var p = 0; p < c.R; p++) { var yy = base - (p + 0.5) * bh; h += '<path class="cr-pair" d="M' + (x0 + bw * 0.5) + ' ' + yy + ' h' + bw + '"/>'; }
      if (lone) h += '<rect class="cr-ring" x="' + (x0 - 2) + '" y="' + (base - c.L * bh - 2) + '" width="' + (bw + 4) + '" height="' + (bh + 4) + '" rx="8"/>';
    }
    /* the equation help and the success: each column counts its paired bricks */
    var counted = st.done || (st.eqHelp || (st.last && (st.last.result === 'eqWrong' || st.last.result === 'eqUnequal')));
    if (counted && st.roof) { var hh = Math.floor(st.n / 2), ty = base + (D.wide ? 38 : 33); h += '<text class="cr-count" x="' + (x0 + bw / 2) + '" y="' + ty + '" text-anchor="middle">' + hh + '</text><text class="cr-count" x="' + (x0 + bw * 1.5) + '" y="' + ty + '" text-anchor="middle">' + hh + '</text>'; }
    /* the roof */
    if (T) {
      var topY = base - Math.max(c.L, c.R) * bh, flatY = base - c.R * bh;
      var g = '';
      if (T === 'flat') {
        var ry = (v.fell ? topY : flatY) - 14;
        g = '<rect class="cr-roof" x="' + (x0 - 8) + '" y="' + ry + '" width="' + (bw * 2 + 16) + '" height="14" rx="4"/><line class="cr-pole" x1="' + (x0 + bw * 2 - 4) + '" y1="' + ry + '" x2="' + (x0 + bw * 2 - 4) + '" y2="' + (ry - 22) + '"/><path class="cr-flag" d="M' + (x0 + bw * 2 - 4) + ' ' + (ry - 22) + ' l16 5 l-16 5 z"/>';
      } else {
        /* the plank rests on the right column; the chimney box rises over the left one */
        var py = (v.fell ? topY : flatY) - 14, cy = py + 14 - bh - 6;
        g = '<rect class="cr-roof" x="' + (x0 + bw - 4) + '" y="' + py + '" width="' + (bw + 12) + '" height="14" rx="4"/><rect class="cr-chim" x="' + (x0 - 5) + '" y="' + cy + '" width="' + (bw + 6) + '" height="' + (py + 14 - cy) + '" rx="3"/><rect class="cr-cap" x="' + (x0 - 9) + '" y="' + (cy - 8) + '" width="' + (bw + 14) + '" height="10" rx="3"/>';
        if (st.roof && !v.fell) g += '<g class="cr-smoke"><circle cx="' + (x0 + bw / 2) + '" cy="' + (cy - 34) + '" r="7"/><circle cx="' + (x0 + bw / 2 + 12) + '" cy="' + (cy - 50) + '" r="9"/></g>';
      }
      h += '<g class="cr-roofg' + (v.fell ? ' is-falling' : ' is-on') + '">' + g + '</g>';
    } else if (st.hover) {
      h += '<g class="cr-roofg is-hovering">' + this._roofShape(st.hover, x0, 6, bw) + '</g>';
    }
    return '<svg class="cr-svg cr-art" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>';
  },
  _roofShape: function (k, x0, y, bw) {
    if (k === 'flat') return '<rect class="cr-roof" x="' + (x0 - 8) + '" y="' + (y + 20) + '" width="' + (bw * 2 + 16) + '" height="14" rx="4"/>';
    return '<rect class="cr-roof" x="' + (x0 - 8) + '" y="' + (y + 20) + '" width="' + (bw * 2 + 16) + '" height="14" rx="4"/><rect class="cr-chim" x="' + (x0 - 2) + '" y="' + y + '" width="' + (bw + 4) + '" height="22" rx="3"/>';
  },
  _roofIcon: function (k) {
    var s = k === 'flat'
      ? '<rect class="cr-roof" x="6" y="26" width="88" height="14" rx="4"/><line class="cr-pole" x1="82" y1="26" x2="82" y2="6"/><path class="cr-flag" d="M82 6 l14 5 l-14 5 z"/><rect class="cr-bri" x="12" y="40" width="36" height="12" rx="3"/><rect class="cr-bri" x="52" y="40" width="36" height="12" rx="3"/>'
      : '<rect class="cr-roof" x="6" y="30" width="88" height="14" rx="4"/><rect class="cr-chim" x="10" y="10" width="40" height="22" rx="3"/><rect class="cr-cap" x="6" y="4" width="48" height="8" rx="3"/><rect class="cr-bri" x="52" y="44" width="36" height="10" rx="3"/>';
    return '<svg class="cr-ricon cr-art" viewBox="0 0 100 56" aria-hidden="true">' + s + '</svg>';
  },
  _bagSvg: function (n, left) {
    return '<svg class="cr-bagsvg cr-art" viewBox="0 0 120 84" aria-hidden="true"><path class="cr-sack" d="M30 18 Q60 4 90 18 L104 70 Q60 86 16 70 Z"/><path class="cr-tie" d="M38 18 Q60 26 82 18"/><rect class="cr-tag" x="34" y="34" width="52" height="34" rx="8"/><text class="cr-tagn" x="60" y="60" text-anchor="middle">' + n + '</text></svg>'
      + '<span class="cr-remain">' + left + '</span>';
  },

  /* ---------- to 99: a shelf of four bags over a street of four houses ---------- */
  _paint99: function (main, D) {
    var st = this.st, v = this._view, self = this;
    var street = this.api.el('div', 'cr-street');
    st.bags.forEach(function (b, i) {
      var col = self.api.el('div', 'cr-lot');
      var roofTxt = b.roof ? self._t(b.roof === 'flat' ? 'aFlat' : 'aChim', { w: self._t(b.roof === 'flat' ? 'even' : 'odd') }) : self._t('aNoRoof');
      var bag = self._btn('cr-bag99 cr-art' + (b.roof ? ' has-roof' : '') + (v.fellBags && v.fellBags.indexOf(i) >= 0 ? ' is-fell' : ''), 'bag-' + i, self._t('aBag99', { n: b.n, roof: roofTxt }),
        (b.roof ? '<span class="cr-seat">' + self._roofIcon(b.roof) + '</span>' : '<span class="cr-seat is-empty"></span>') + '<svg class="cr-bagsvg cr-art" viewBox="0 0 120 84" aria-hidden="true"><path class="cr-sack" d="M30 18 Q60 4 90 18 L104 70 Q60 86 16 70 Z"/><rect class="cr-tag" x="30" y="32" width="60" height="36" rx="8"/><text class="cr-tagn" x="60" y="60" text-anchor="middle">' + b.n + '</text></svg>');
      bag.disabled = b.landed || st.done;
      bag.addEventListener('click', function () { self._seat(i); });
      col.appendChild(bag);
      col.insertAdjacentHTML('beforeend', self._houseSvg(b, i, D));
      street.appendChild(col);
    });
    main.appendChild(street);
    var bar = this.api.el('div', 'cr-bar99');
    var kinds = st.side === 'flatLeft' ? ['flat', 'chimney'] : ['chimney', 'flat'];
    kinds.forEach(function (k) {
      var word = self._t(k === 'flat' ? 'even' : 'odd');
      var b = self._btn('cr-roofbtn cr-art' + (st.sel === k ? ' is-hover' : ''), 'roof-' + k, self._t(k === 'flat' ? 'aFlat' : 'aChim', { w: word }), self._roofIcon(k) + '<span class="cr-word">' + esc(word) + '</span>');
      b.disabled = st.done; b.setAttribute('aria-pressed', st.sel === k ? 'true' : 'false');
      b.addEventListener('click', function () { self._select(k); });
      bar.appendChild(b);
    });
    var pour = this._btn('cr-check cr-pour', 'pour', null, esc(this._t('pourBtn')));
    pour.disabled = st.done;
    pour.addEventListener('click', function () { self._check(); });
    bar.appendChild(pour);
    main.appendChild(bar);
  },
  /* a house: the tens as slabs (2 × 5, always flat), then the ones once poured, then its roof */
  _houseSvg: function (b, i, D) {
    var st = this.st, v = this._view, s = ChimneyRoofCore.split(b.n), poured = b.poured || st.done;
    var bw = D.wide ? 30 : D.cramp ? 22 : 26, sh = D.wide ? 11 : 8, bh = D.wide ? 18 : 13, roofH = D.wide ? 34 : 26;
    var W = bw * 2 + 12, base = roofH + 9 * sh + 5 * bh + 6, H = base + 8, x0 = 6, h = '';
    h += '<path class="cr-floor" d="M' + (x0 - 3) + ' ' + (base + 2) + ' L' + (x0 + bw) + ' ' + (base + 7) + ' L' + (x0 + bw * 2 + 3) + ' ' + (base + 2) + '"/>';
    for (var t = 0; t < s.slabs; t++) { var y = base - (t + 1) * sh; h += '<rect class="cr-slab" x="' + (x0 + 1) + '" y="' + (y + 1) + '" width="' + (bw * 2 - 2) + '" height="' + (sh - 2) + '" rx="2"/><line class="cr-slabmid" x1="' + (x0 + bw) + '" y1="' + (y + 1) + '" x2="' + (x0 + bw) + '" y2="' + (y + sh - 1) + '"/>'; }
    var top = base - s.slabs * sh, c = ChimneyRoofCore.columns(poured ? s.ones : 0), lone = c.L > c.R;
    var help = st.help && st.last && st.last.result === 'fell' && st.last.wrong.indexOf(i) >= 0;
    for (var k = 0; k < (poured ? s.ones : 0); k++) {
      var col = k % 2, layer = Math.floor(k / 2), yy = top - (layer + 1) * bh, x = x0 + col * bw;
      h += '<rect class="cr-brick ' + (col ? 'cr-r' : 'cr-l') + (help && lone && k === s.ones - 1 ? ' is-glow' : '') + '" x="' + (x + 1) + '" y="' + (yy + 1) + '" width="' + (bw - 2) + '" height="' + (bh - 2) + '" rx="3"/>';
    }
    if (help) { for (var p = 0; p < c.R; p++) h += '<path class="cr-pair" d="M' + (x0 + bw * 0.5) + ' ' + (top - (p + 0.5) * bh) + ' h' + bw + '"/>'; if (lone) h += '<rect class="cr-ring" x="' + (x0 - 1) + '" y="' + (top - c.L * bh - 1) + '" width="' + (bw + 2) + '" height="' + (bh + 2) + '" rx="5"/>'; }
    if (b.landed) {
      var flatY = top - c.R * bh;
      if (b.roof === 'flat') h += '<rect class="cr-roof" x="' + (x0 - 4) + '" y="' + (flatY - 9) + '" width="' + (bw * 2 + 8) + '" height="9" rx="3"/>';
      else h += '<rect class="cr-roof" x="' + (x0 - 4) + '" y="' + (flatY - 9) + '" width="' + (bw * 2 + 8) + '" height="9" rx="3"/><rect class="cr-chim" x="' + (x0 - 1) + '" y="' + (flatY - bh - 9) + '" width="' + (bw + 2) + '" height="' + (bh + 2) + '" rx="2"/><g class="cr-smoke"><circle cx="' + (x0 + bw / 2) + '" cy="' + (flatY - bh - 18) + '" r="5"/></g>';
    }
    return '<svg class="cr-house cr-art" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>';
  },

  /* ---------------- the hand ---------------- */
  _startHold: function () {
    var self = this; this._stopHold(); this._held = false;
    this._hold = setTimeout(function step() { self._held = true; if (self._pour() === 'stop') { self._stopHold(); return; } self._hold = setTimeout(step, 150); }, 350);
  },
  _stopHold: function () { if (this._hold) { clearTimeout(this._hold); this._hold = null; } },
  _pour: function () {
    var C = ChimneyRoofCore, st = this.st, v = this._view; if (st.num === '99') return 'stop';
    var res = C.pour(st); if (res === 'no' || res === 'full') return 'stop';
    v.note = ''; v.justPoured = true; this.api.sound(st.poured % 2 ? 520 : 600);
    if (res && res.result) { this._afterRoof(res); return 'stop'; }
    this._paint(); this._sr(this._t('aTower', { k: st.poured }));
    return st.poured >= st.n ? 'stop' : 'go';
  },
  _unpour: function () { var st = this.st; if (ChimneyRoofCore.unpour(st) === 'no') return; this._view.note = ''; this._view.justPoured = false; this.api.sound(380); this._paint(); },
  _roof: function (k) {
    var C = ChimneyRoofCore, st = this.st, v = this._view;
    var res = C.roof(st, k); if (res.result === 'no') return;
    v.justPoured = false;
    if (res.result === 'hover') { v.note = ''; this.api.sound(520); this._paint(); return; }
    if (res.result === 'notPoured') { v.note = this._t(C.hint(st)); this._paint(); this.api.announce(v.note); return; }
    this._afterRoof(res);
  },
  /* the roof landed: it settles (fits) or tips and slides back to the rack (a miss) */
  _afterRoof: function (res) {
    var C = ChimneyRoofCore, st = this.st, v = this._view, self = this;
    this._clearTimers();
    if (res.result === 'fits') {
      v.fell = null; v.note = this._t(res.kind === 'flat' ? 'roofFlat' : 'roofChim');
      this.api.sound(330); this._paint(); this.api.announce(v.note); return;
    }
    v.fell = res.kind; v.note = this._t(C.hint(st));
    this.api.sound(200); this._paint(); this.api.announce(v.note);
    var clear = function () { v.fell = null; self._paint(); };
    if (this.FAST) clear(); else this._later(clear, this.FALL_MS);
  },
  _focus: function (i) { ChimneyRoofCore.focus(this.st, i); this._paint(); },
  _type: function (d) { if (ChimneyRoofCore.typeEq(this.st, d) === 'no') return; this._view.note = ''; this.api.sound(520); this._paint(); },
  _del: function () { if (ChimneyRoofCore.delEq(this.st) === 'no') return; this._view.note = ''; this.api.sound(380); this._paint(); },
  _select: function (k) { if (ChimneyRoofCore.select(this.st, k) === 'no') return; this.api.sound(520); this._paint(); },
  /* tapping a bag seats the chosen roof; with none chosen it tries the other roof */
  _seat: function (i) {
    var st = this.st, b = st.bags[i]; if (!b || b.landed || st.done) return;
    var k = st.sel || (b.roof === 'flat' ? 'chimney' : 'flat');
    if (ChimneyRoofCore.seat(st, i, k) === 'no') return;
    this._view.note = ''; this._view.fellBags = null; this.api.sound(560); this._paint();
  },
  _check: function () {
    var C = ChimneyRoofCore, st = this.st, v = this._view, self = this;
    var res = C.check(st); if (res.result === 'done') return;
    v.justPoured = false;
    if (res.result === 'ok') { this._success(); return; }
    var key = C.hint(st);
    v.note = this._t(key);
    if (st.num === '99' && res.result === 'fell') { v.fellBags = res.wrong.slice(); this.api.sound(200); }
    else if (res.result === 'eqWrong' || res.result === 'eqUnequal') this.api.sound(240);
    this._paint(); this.api.announce(v.note);
  },
  _key_: function (e) {
    var st = this.st;
    if (st.num !== '99' && st.phase === 'eq' && !st.done) {
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._type(e.key); return; }
      if (e.key === 'Backspace') { e.preventDefault(); this._del(); return; }
    }
  },
  _success: function () {
    var st = this.st, v = this._view, msg;
    if (st.num === '99') msg = this._t('ok99');
    else msg = this._t(st.n % 2 ? 'okOdd' : 'okEven', { n: st.n, a: Math.floor(st.n / 2) });
    v.note = ''; v.ok = msg;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectChimneyCSS() {
  if (typeof document === 'undefined' || document.getElementById('cr-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.cr-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .cr-wrap:focus{outline:none;}'
  + '.cr-row{display:flex;gap:16px;align-items:flex-start;justify-content:center;}'
  + '.cr-left{flex:0 0 auto;display:flex;justify-content:center;} .cr-right{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:12px;}'
  + '.cr-top{display:flex;gap:10px;align-items:stretch;}'
  + '.cr-tower{border:0;padding:6px;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D5BC;cursor:pointer;} .cr-tower:disabled{cursor:default;} .cr-svg{display:block;overflow:visible;}'
  + '.cr-glass{fill:#EEF6F7;stroke:#9CC3C8;stroke-width:2;} .cr-floor{fill:none;stroke:' + INK + ';stroke-width:3;stroke-linejoin:round;}'
  + '.cr-brick{stroke:' + INK + ';stroke-width:2;} .cr-l{fill:#2E9C88;} .cr-r{fill:#F4CF62;} .cr-stud{stroke:rgba(255,255,255,.55);stroke-width:2;stroke-linecap:round;}'
  + '.cr-brick.is-new{transform-box:fill-box;animation:crDrop .22s ease-in;} @keyframes crDrop{from{transform:translateY(-40px);opacity:.3;}}'
  + '.cr-brick.is-glow{stroke:#E0663A;stroke-width:4;filter:drop-shadow(0 0 4px #F2784B);} .cr-brick.is-plus{stroke:#E0663A;stroke-width:4;}'
  + '.cr-pair{fill:none;stroke:#146B5E;stroke-width:3;stroke-dasharray:4 3;stroke-linecap:round;} .cr-ring{fill:none;stroke:#E0663A;stroke-width:3;stroke-dasharray:5 3;}'
  + '.cr-count{font-family:' + H + ';font-weight:800;font-size:22px;fill:#146B5E;paint-order:stroke;stroke:#FFFDF6;stroke-width:4px;}'
  + '.cr-roof{fill:#B5523A;stroke:' + INK + ';stroke-width:2;} .cr-chim{fill:#C9705A;fill-opacity:.45;stroke:' + INK + ';stroke-width:2;} .cr-cap{fill:#8E3B28;stroke:' + INK + ';stroke-width:2;} .cr-pole{stroke:' + INK + ';stroke-width:2;} .cr-flag{fill:#2E9C88;} .cr-bri{fill:#EADDC4;stroke:#B9A88A;stroke-width:1.5;}'
  + '.cr-roofg.is-on{animation:crTock .3s ease-out;} @keyframes crTock{0%{transform:translateY(-16px);}70%{transform:translateY(2px);}}'
  + '.cr-roofg.is-falling{transform-box:fill-box;transform-origin:center bottom;animation:crFall .7s ease-in forwards;} @keyframes crFall{0%{transform:translateY(-16px);}35%{transform:rotate(-20deg);}100%{transform:translate(70px,10px) rotate(-28deg);opacity:0;}}'
  + '.cr-roofg.is-hovering{opacity:.85;animation:crHover 1.2s ease-in-out infinite alternate;} @keyframes crHover{to{transform:translateY(-5px);}}'
  + '.cr-smoke circle{fill:#E8E4DC;stroke:#B7B0A4;stroke-width:1.5;animation:crPuff 1.6s ease-out infinite;} @keyframes crPuff{0%{opacity:0;transform:translateY(6px);}40%{opacity:1;}100%{opacity:0;transform:translateY(-10px);}}'
  + '.cr-bag{flex:0 0 120px;min-height:100px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D5BC,0 3px 0 #E2D5BC;cursor:pointer;position:relative;padding:4px;display:flex;align-items:center;justify-content:center;} .cr-bag:disabled{cursor:default;opacity:.6;}'
  + '.cr-bagsvg{display:block;width:100%;max-width:120px;height:auto;} .cr-sack{fill:#D9B98A;stroke:' + INK + ';stroke-width:2.5;} .cr-tie{fill:none;stroke:' + INK + ';stroke-width:2.5;} .cr-tag{fill:#FFFDF6;stroke:' + INK + ';stroke-width:2;} .cr-tagn{font-family:' + H + ';font-weight:800;font-size:28px;fill:' + INK + ';}'
  + '.cr-remain{position:absolute;right:6px;top:4px;min-width:22px;padding:0 5px;border-radius:10px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:14px;line-height:20px;text-align:center;}'
  + '.cr-rack{flex:1 1 auto;display:flex;gap:10px;} .cr-roofbtn{flex:1 1 0;min-width:0;min-height:100px;border:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:6px;font:inherit;color:' + INK + ';}'
  + '.cr-roofbtn:disabled{cursor:default;opacity:.55;} .cr-roofbtn.is-hover{box-shadow:inset 0 0 0 3px #F2784B,0 0 0 4px rgba(242,120,75,.25),0 3px 0 #CDBFA4;background:#FFF6EA;} .cr-roofbtn.is-fell{animation:crShake .4s;}'
  + '.cr-ricon{display:block;width:100%;max-width:110px;height:auto;} .cr-word{font-family:' + H + ';font-weight:800;font-size:22px;line-height:1.1;text-align:center;overflow-wrap:anywhere;}'
  + '@keyframes crShake{25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.cr-eqbox{display:flex;flex-direction:column;gap:10px;align-items:stretch;padding:10px;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D5BC;}'
  + '.cr-eq{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font-family:' + H + ';font-weight:800;font-size:32px;color:' + INK + ';}'
  + '.cr-slot{width:64px;height:56px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:32px;color:' + INK + ';cursor:pointer;} .cr-slot.is-focus{box-shadow:inset 0 0 0 3px #F2784B;} .cr-slot.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#EAF6F2;} .cr-slot.is-shake{animation:crShake .4s 2;box-shadow:inset 0 0 0 3px #E0663A;}'
  + '.cr-one{display:inline-flex;align-items:center;justify-content:center;width:44px;height:52px;border-radius:10px;background:#FBD3C2;box-shadow:inset 0 0 0 3px #E0663A;}'
  + '.cr-keys{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;} .cr-key{height:48px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .cr-key.is-del{background:#FFF1EA;} .cr-key.cr-checkkey{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4E44;font-size:26px;}'
  + '.cr-check{min-height:50px;border:0;border-radius:12px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:21px;cursor:pointer;box-shadow:0 4px 0 #0E4E44;padding:0 18px;} .cr-check:disabled{opacity:.55;cursor:default;}'
  + '.cr-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .cr-note:empty{display:none;} .cr-note.is-hint{color:#9A3D1C;} .cr-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.cr-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* to 99 */
  + '.cr-street{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-items:end;} .cr-lot{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0;}'
  + '.cr-bag99{width:100%;max-width:130px;min-height:120px;border:0;border-radius:14px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #E2D5BC,0 3px 0 #E2D5BC;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;} .cr-bag99:disabled{cursor:default;} .cr-bag99.is-fell{animation:crShake .4s;box-shadow:inset 0 0 0 3px #E0663A;}'
  + '.cr-seat{display:block;width:76%;height:34px;} .cr-seat .cr-ricon{max-width:none;width:100%;height:100%;} .cr-seat.is-empty{border:2px dashed #CDBFA4;border-radius:8px;}'
  + '.cr-house{display:block;max-width:100%;height:auto;} .cr-slab{fill:#7FC9B9;stroke:' + INK + ';stroke-width:1.5;} .cr-slabmid{stroke:' + INK + ';stroke-width:1;opacity:.5;}'
  + '.cr-bar99{display:flex;gap:10px;align-items:stretch;} .cr-bar99 .cr-roofbtn{min-height:90px;} .cr-pour{flex:0 0 auto;min-width:120px;}'
  /* phones */
  + '.cr-wrap.is-narrow{gap:8px;} .cr-wrap.is-narrow .cr-row{flex-direction:column;align-items:stretch;gap:8px;} .cr-wrap.is-narrow .cr-left{order:2;} .cr-wrap.is-narrow .cr-right{display:contents;}'
  + '.cr-wrap.is-narrow .cr-top{order:1;} .cr-wrap.is-narrow.is-eq .cr-top{display:none;} .cr-wrap.is-narrow.is-done .cr-row{flex-direction:row;align-items:center;justify-content:center;} .cr-wrap.is-narrow.is-done .cr-right{display:flex;flex:1 1 auto;min-width:0;} .cr-wrap.is-narrow.is-done .cr-eq{font-size:24px;gap:4px;} .cr-wrap.is-narrow.is-done .cr-slot{width:46px;height:44px;font-size:24px;} .cr-wrap.is-narrow.is-done .cr-one{width:34px;height:42px;} .cr-wrap.is-narrow .cr-eqbox{order:3;padding:8px;gap:8px;}'
  + '.cr-wrap.is-narrow .cr-bag{flex:0 0 96px;min-height:76px;} .cr-wrap.is-narrow .cr-roofbtn{min-height:76px;padding:4px;} .cr-wrap.is-narrow .cr-ricon{max-width:76px;} .cr-wrap.is-narrow .cr-word{font-size:18px;}'
  + '.cr-wrap.is-narrow .cr-eq{font-size:26px;gap:6px;} .cr-wrap.is-narrow .cr-slot{width:54px;height:48px;font-size:28px;} .cr-wrap.is-narrow .cr-one{height:46px;width:40px;} .cr-wrap.is-narrow .cr-key{height:44px;font-size:20px;} .cr-wrap.is-narrow .cr-note{font-size:16px;}'
  + '.cr-wrap.is-narrow .cr-street{gap:5px;} .cr-wrap.is-narrow .cr-bag99{min-height:96px;} .cr-wrap.is-narrow .cr-tagn{font-size:30px;} .cr-wrap.is-narrow .cr-bar99 .cr-roofbtn{min-height:70px;} .cr-wrap.is-narrow .cr-pour{min-width:88px;}'
  + '.cr-wrap.is-cramp .cr-bag{flex:0 0 84px;} .cr-wrap.is-cramp .cr-word{font-size:16px;} .cr-wrap.is-cramp .cr-keys{gap:3px;} .cr-wrap.is-cramp .cr-eqbox{padding:6px 3px;}'
  + '.cr-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.cr-wrap *{animation:none !important;transition:none !important;}}'
  + '.cr-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'cr-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.ChimneyRoofActivity = ChimneyRoofActivity;
