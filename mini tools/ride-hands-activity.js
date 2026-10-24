/* =====================================================================
   ride-hands-activity.js — ACTIVITY #102 of the one-by-one rebuild:
   "Sprocket's Clock" (to the hour) → THE DIGITS THAT RIDE THE HANDS
   (1.MD.B.3, 11 locales). Design: docs/activities-rebuild/designs/102-clock-digital.md
   ---------------------------------------------------------------------
   THE INVENTION: a digital time is the two hands written down. The cards
   are little flip-clocks whose HOUR digits are the short hand's colour
   and whose MINUTE digits are the long hand's. On Check the chosen card
   docks under the clock and its two parts ride out: the hour along the
   short hand to the number that hand has reached (at half past: to the
   rim between two numbers, then back to the one it has passed), the
   minutes along the long hand to the minutes collar it points at (00 at
   the 12, 30 at the 6). A part merges only into its own number; a 12:00
   card on a 3 o'clock clock sends a 12 to the 3, where it stays outside.
   On success an hour passes: one lap of the long hand, one step of the
   short hand, the docked display flips its hour. After that, tapping the
   long hand makes another hour pass.
   ACTIVITY LAYER ONLY: the model is ride-hands-core.js; the clock, the
   base display, the cards and the riding digits are drawn apparatus;
   Sprocket is the library picture farm animals/rooster; lcs-shell.js
   untouched (the shell's Check is hidden and pressed by this activity
   when the round is right).
   Test seams: window.RideHandsActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var RideHandsActivity = {
  id: 'ride-hands',
  apparatusClasses: ['rh-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Sprocket\'s Clock',de:'Sprockets Uhr',nl:'De klok van Kukel',da:'Sprockets ur',sv:'Tores klocka',no:'Sprockets klokke',es:'El reloj de Sprocket',it:'L’orologio di Sprocket',pt:'O relógio do Sprocket',fr:'L’horloge de Sprocket',fi:'Sprocketin kello'},
    name:        {en:'Sprocket',de:'Sprocket',nl:'Kukel',da:'Sprocket',sv:'Tore',no:'Sprocket',es:'Sprocket',it:'Sprocket',pt:'Sprocket',fr:'Sprocket',fi:'Sprocket'},
    tTask:       {en:'Read both hands. Tap the matching digital time.',de:'Lies beide Zeiger ab. Tippe auf die passende digitale Uhrzeit.',nl:'Kijk naar beide wijzers. Tik op de digitale tijd die erbij past.',da:'Aflæs begge visere. Tryk på det digitale klokkeslæt, der passer.',sv:'Läs av båda visarna. Tryck på den digitala tid som passar.',no:'Les av begge viserne. Trykk på det digitale klokkeslettet som passer.',es:'Lee las dos manecillas. Toca la hora digital que corresponde.',it:'Leggi le due lancette. Tocca l’ora digitale giusta.',pt:'Leia os dois ponteiros. Toque na hora digital que combina.',fr:'Lis les deux aiguilles. Touche l’heure numérique qui correspond.',fi:'Katso molempia viisareita. Napauta sopivaa digitaalista aikaa.'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    hintNone:    {en:'Look where the long hand points, and where the short hand points. Then tap a card.',de:'Schau, wohin der große Zeiger zeigt und wohin der kleine Zeiger zeigt. Tippe dann auf eine Karte.',nl:'Kijk waar de grote wijzer naar wijst en waar de kleine wijzer naar wijst. Tik dan op een kaartje.',da:'Se, hvor den store viser peger, og hvor den lille viser peger. Tryk så på et kort.',sv:'Titta vart den långa visaren pekar och vart den korta visaren pekar. Tryck sedan på ett kort.',no:'Se hvor den store viseren peker, og hvor den lille viseren peker. Trykk så på et kort.',es:'Mira hacia dónde apunta la manecilla larga y hacia dónde apunta la corta. Luego toca una tarjeta.',it:'Guarda dove punta la lancetta lunga e dove punta quella corta. Poi tocca una carta.',pt:'Veja para onde aponta o ponteiro grande e para onde aponta o pequeno. Depois toque em um cartão.',fr:'Regarde où pointe la grande aiguille et où pointe la petite. Puis touche une carte.',fi:'Katso, mihin pitkä viisari osoittaa ja mihin lyhyt viisari osoittaa. Napauta sitten korttia.'},
    okTime:      {en:'{d} — {p}!',de:'{d} – {p}!',nl:'{d} – {p}!',da:'{d} – {p}!',sv:'{d} – {p}!',no:'{d} – {p}!',es:'¡{d}, {p}!',it:'{d} – {p}!',pt:'{d} – {p}!',fr:'{d} – {p} !',fi:'{d} – {p}!'},
    aClock00:    {en:'Clock: the long hand is on the 12, the short hand is on the {h}.',de:'Uhr: Der große Zeiger steht auf der 12, der kleine Zeiger auf der {h}.',nl:'Klok: de grote wijzer staat op de 12, de kleine wijzer op de {h}.',da:'Ur: Den store viser står på 12, den lille viser på {h}.',sv:'Klocka: den långa visaren står på 12, den korta visaren på {h}.',no:'Klokke: Den store viseren står på 12, den lille viseren på {h}.',es:'Reloj: la manecilla larga está en el 12 y la corta en el {h}.',it:'Orologio: la lancetta lunga è sul numero 12, quella corta sul numero {h}.',pt:'Relógio: o ponteiro grande está no 12 e o pequeno está no {h}.',fr:'Horloge : la grande aiguille est sur le 12, la petite sur le {h}.',fi:'Kello: pitkä viisari on 12:n kohdalla, lyhyt viisari {h}:n kohdalla.'},
    aClock30:    {en:'Clock: the long hand is on the 6, the short hand is halfway between the {h} and the {h2}.',de:'Uhr: Der große Zeiger steht auf der 6, der kleine Zeiger genau zwischen der {h} und der {h2}.',nl:'Klok: de grote wijzer staat op de 6, de kleine wijzer precies tussen de {h} en de {h2}.',da:'Ur: Den store viser står på 6, den lille viser midt mellem {h} og {h2}.',sv:'Klocka: den långa visaren står på 6, den korta visaren mitt emellan {h} och {h2}.',no:'Klokke: Den store viseren står på 6, den lille viseren midt mellom {h} og {h2}.',es:'Reloj: la manecilla larga está en el 6 y la corta, a la mitad entre el {h} y el {h2}.',it:'Orologio: la lancetta lunga è sul numero 6, quella corta a metà tra il numero {h} e il numero {h2}.',pt:'Relógio: o ponteiro grande está no 6 e o pequeno está no meio, entre o {h} e o {h2}.',fr:'Horloge : la grande aiguille est sur le 6, la petite à mi-chemin entre le {h} et le {h2}.',fi:'Kello: pitkä viisari on 6:n kohdalla, lyhyt viisari puolivälissä {h}:n ja {h2}:n välissä.'},
    setTimes:    {en:'Times',de:'Uhrzeiten',nl:'Tijden',da:'Klokkeslæt',sv:'Tider',no:'Klokkeslett',es:'Horas',it:'Orari',pt:'Horários',fr:'Heures',fi:'Ajat'},
    tBoth:       {en:'O\'clock and half past',de:'Volle und halbe Stunden',nl:'Hele en halve uren',da:'Hele og halve timer',sv:'Hela och halva timmar',no:'Hele og halve timer',es:'Horas en punto y medias horas',it:'Ore esatte e mezz’ore',pt:'Horas exatas e meias horas',fr:'Heures pile et demies',fi:'Tasa- ja puolitunnit'},
    hintHourC:   {en:'Follow the short orange hand to its number. That number is the hour.',de:'Folge dem kleinen orangefarbenen Zeiger bis zu seiner Zahl. Diese Zahl ist die Stunde.',nl:'Volg de kleine oranje wijzer naar zijn getal. Dat getal is het uur.',da:'Følg den lille orange viser hen til dens tal. Det tal er timen.',sv:'Följ den korta orange visaren till talet den pekar på. Det talet är timmen.',no:'Følg den lille oransje viseren til tallet sitt. Det tallet er timen.',es:'Sigue la manecilla corta naranja hasta su número. Ese número es la hora.',it:'Segui la lancetta corta arancione fino al suo numero. Quel numero è l’ora.',pt:'Siga o ponteiro pequeno laranja até o número dele. Esse número é a hora.',fr:'Suis la petite aiguille orange jusqu’à son nombre. Ce nombre, c’est l’heure.',fi:'Seuraa lyhyttä oranssia viisaria sen numeroon asti. Se numero kertoo tunnin.'},
    hintHour:    {en:'Follow the short hand to its number. That number is the hour.',de:'Folge dem kleinen Zeiger bis zu seiner Zahl. Diese Zahl ist die Stunde.',nl:'Volg de kleine wijzer naar zijn getal. Dat getal is het uur.',da:'Følg den lille viser hen til dens tal. Det tal er timen.',sv:'Följ den korta visaren till talet den pekar på. Det talet är timmen.',no:'Følg den lille viseren til tallet sitt. Det tallet er timen.',es:'Sigue la manecilla corta hasta su número. Ese número es la hora.',it:'Segui la lancetta corta fino al suo numero. Quel numero è l’ora.',pt:'Siga o ponteiro pequeno até o número dele. Esse número é a hora.',fr:'Suis la petite aiguille jusqu’à son nombre. Ce nombre, c’est l’heure.',fi:'Seuraa lyhyttä viisaria sen numeroon asti. Se numero kertoo tunnin.'},
    hintMinC:    {en:'Look at the long green hand: on the 12 it is :00, on the 6 it is :30.',de:'Schau auf den großen grünen Zeiger: Auf der 12 heißt es :00, auf der 6 heißt es :30.',nl:'Kijk naar de grote groene wijzer: op de 12 is het :00, op de 6 is het :30.',da:'Se på den store grønne viser: På 12 er det :00, på 6 er det :30.',sv:'Titta på den långa gröna visaren: på 12 är det :00, på 6 är det :30.',no:'Se på den store grønne viseren: På 12 er det :00, på 6 er det :30.',es:'Mira la manecilla larga verde: en el 12 es :00, en el 6 es :30.',it:'Guarda la lancetta lunga verde: sul 12 è :00, sul 6 è :30.',pt:'Veja o ponteiro grande verde: no 12 é :00, no 6 é :30.',fr:'Regarde la grande aiguille verte : sur le 12, c’est :00 ; sur le 6, c’est :30.',fi:'Katso pitkää vihreää viisaria: kun se on 12:n kohdalla, aika on :00, ja kun se on 6:n kohdalla, :30.'},
    hintMin:     {en:'Look at the long hand: on the 12 it is :00, on the 6 it is :30.',de:'Schau auf den großen Zeiger: Auf der 12 heißt es :00, auf der 6 heißt es :30.',nl:'Kijk naar de grote wijzer: op de 12 is het :00, op de 6 is het :30.',da:'Se på den store viser: På 12 er det :00, på 6 er det :30.',sv:'Titta på den långa visaren: på 12 är det :00, på 6 är det :30.',no:'Se på den store viseren: På 12 er det :00, på 6 er det :30.',es:'Mira la manecilla larga: en el 12 es :00, en el 6 es :30.',it:'Guarda la lancetta lunga: sul 12 è :00, sul 6 è :30.',pt:'Veja o ponteiro grande: no 12 é :00, no 6 é :30.',fr:'Regarde la grande aiguille : sur le 12, c’est :00 ; sur le 6, c’est :30.',fi:'Katso pitkää viisaria: kun se on 12:n kohdalla, aika on :00, ja kun se on 6:n kohdalla, :30.'},
    hintWatch:   {en:'Watch: each hand lights up the number it points to. Then find that time on a card.',de:'Schau: Jeder Zeiger lässt die Zahl leuchten, auf die er zeigt. Such diese Uhrzeit dann auf einer Karte.',nl:'Kijk: elke wijzer laat het getal oplichten waar hij naar wijst. Zoek die tijd dan op een kaartje.',da:'Se: Hver viser får det tal, den peger på, til at lyse. Find så det klokkeslæt på et kort.',sv:'Titta: varje visare får talet den pekar på att lysa. Leta sedan upp den tiden på ett kort.',no:'Se: Hver viser får tallet den peker på, til å lyse. Finn så det klokkeslettet på et kort.',es:'Mira: cada manecilla ilumina el número al que apunta. Luego busca esa hora en una tarjeta.',it:'Guarda: ogni lancetta fa illuminare il numero a cui punta. Poi cerca quell’ora su una carta.',pt:'Veja: cada ponteiro acende o número para onde aponta. Depois procure essa hora em um cartão.',fr:'Regarde : chaque aiguille fait briller le nombre qu’elle montre. Cherche ensuite cette heure sur une carte.',fi:'Katso: kumpikin viisari sytyttää numeron, johon se osoittaa. Etsi sitten se aika kortilta.'},
    aLong:       {en:'Long hand: tap and an hour passes',de:'Großer Zeiger: tippen, dann vergeht eine Stunde',nl:'Grote wijzer: tik, dan gaat er een uur voorbij',da:'Den store viser: tryk, så går der en time',sv:'Långa visaren: tryck så går det en timme',no:'Den store viseren: trykk, så går det en time',es:'Manecilla larga: toca y pasa una hora',it:'Lancetta lunga: tocca e passa un’ora',pt:'Ponteiro grande: toque e passa uma hora',fr:'Grande aiguille : touche, et une heure passe',fi:'Pitkä viisari: napauta, niin kuluu tunti'},
    tHour:       {en:'O\'clock',de:'Volle Stunden',nl:'Hele uren',da:'Hele timer',sv:'Hela timmar',no:'Hele timer',es:'En punto',it:'Ore esatte',pt:'Horas exatas',fr:'Heures pile',fi:'Tasatunnit'},
    setColours:  {en:'Hand colours',de:'Zeigerfarben',nl:'Kleur van de wijzers',da:'Viserfarver',sv:'Visarnas färger',no:'Viserfarger',es:'Colores de las manecillas',it:'Colori delle lancette',pt:'Cores dos ponteiros',fr:'Couleurs des aiguilles',fi:'Viisarien värit'},
    cOn:         {en:'On',de:'An',nl:'Aan',da:'Til',sv:'På',no:'På',es:'Sí',it:'Sì',pt:'Ligado',fr:'Oui',fi:'Päällä'},
    cOff:        {en:'Off',de:'Aus',nl:'Uit',da:'Fra',sv:'Av',no:'Av',es:'No',it:'No',pt:'Desligado',fr:'Non',fi:'Pois'},
    hintHourHalfC:{en:'At half past, the short orange hand is between two numbers. The hour on the card is the number it has just passed.',de:'Bei halben Stunden steht der kleine orangefarbene Zeiger zwischen zwei Zahlen. Die Stunde auf der Karte ist die Zahl, an der er gerade vorbei ist.',nl:'Bij een half uur staat de kleine oranje wijzer tussen twee getallen. Het uur op het kaartje is het getal waar hij net voorbij is.',da:'Ved halve timer står den lille orange viser mellem to tal. Timen på kortet er det tal, den lige er gået forbi.',sv:'Vid halv står den korta orange visaren mellan två tal. Timmen på kortet är talet den just har passerat.',no:'Ved halv står den lille oransje viseren mellom to tall. Timen på kortet er tallet den akkurat har passert.',es:'En la media hora, la manecilla corta naranja está entre dos números. La hora de la tarjeta es el número que acaba de pasar.',it:'Alla mezz’ora la lancetta corta arancione è tra due numeri. L’ora sulla carta è il numero che ha appena superato.',pt:'Na meia hora, o ponteiro pequeno laranja fica entre dois números. A hora do cartão é o número que ele acabou de passar.',fr:'À la demie, la petite aiguille orange est entre deux nombres. L’heure de la carte, c’est le nombre qu’elle vient de dépasser.',fi:'Puolitunnilla lyhyt oranssi viisari on kahden numeron välissä. Kortin tunti on se numero, jonka ohi viisari on juuri mennyt.'},
    hintHourHalf:{en:'At half past, the short hand is between two numbers. The hour on the card is the number it has just passed.',de:'Bei halben Stunden steht der kleine Zeiger zwischen zwei Zahlen. Die Stunde auf der Karte ist die Zahl, an der er gerade vorbei ist.',nl:'Bij een half uur staat de kleine wijzer tussen twee getallen. Het uur op het kaartje is het getal waar hij net voorbij is.',da:'Ved halve timer står den lille viser mellem to tal. Timen på kortet er det tal, den lige er gået forbi.',sv:'Vid halv står den korta visaren mellan två tal. Timmen på kortet är talet den just har passerat.',no:'Ved halv står den lille viseren mellom to tall. Timen på kortet er tallet den akkurat har passert.',es:'En la media hora, la manecilla corta está entre dos números. La hora de la tarjeta es el número que acaba de pasar.',it:'Alla mezz’ora la lancetta corta è tra due numeri. L’ora sulla carta è il numero che ha appena superato.',pt:'Na meia hora, o ponteiro pequeno fica entre dois números. A hora do cartão é o número que ele acabou de passar.',fr:'À la demie, la petite aiguille est entre deux nombres. L’heure de la carte, c’est le nombre qu’elle vient de dépasser.',fi:'Puolitunnilla lyhyt viisari on kahden numeron välissä. Kortin tunti on se numero, jonka ohi viisari on juuri mennyt.'}
  },/*STRINGS-END*/

  /*TIMES-BEGIN*/TIMES: {
    en: { sep:':', o:['one o\'clock','two o\'clock','three o\'clock','four o\'clock','five o\'clock','six o\'clock','seven o\'clock','eight o\'clock','nine o\'clock','ten o\'clock','eleven o\'clock','twelve o\'clock'], h:['half past one','half past two','half past three','half past four','half past five','half past six','half past seven','half past eight','half past nine','half past ten','half past eleven','half past twelve'] },
    de: { sep:':', o:['ein Uhr','zwei Uhr','drei Uhr','vier Uhr','fünf Uhr','sechs Uhr','sieben Uhr','acht Uhr','neun Uhr','zehn Uhr','elf Uhr','zwölf Uhr'], h:['halb zwei','halb drei','halb vier','halb fünf','halb sechs','halb sieben','halb acht','halb neun','halb zehn','halb elf','halb zwölf','halb eins'] },
    nl: { sep:':', o:['één uur','twee uur','drie uur','vier uur','vijf uur','zes uur','zeven uur','acht uur','negen uur','tien uur','elf uur','twaalf uur'], h:['half twee','half drie','half vier','half vijf','half zes','half zeven','half acht','half negen','half tien','half elf','half twaalf','half één'] },
    da: { sep:':', o:['klokken et','klokken to','klokken tre','klokken fire','klokken fem','klokken seks','klokken syv','klokken otte','klokken ni','klokken ti','klokken elleve','klokken tolv'], h:['halv to','halv tre','halv fire','halv fem','halv seks','halv syv','halv otte','halv ni','halv ti','halv elleve','halv tolv','halv et'] },
    sv: { sep:':', o:['klockan ett','klockan två','klockan tre','klockan fyra','klockan fem','klockan sex','klockan sju','klockan åtta','klockan nio','klockan tio','klockan elva','klockan tolv'], h:['halv två','halv tre','halv fyra','halv fem','halv sex','halv sju','halv åtta','halv nio','halv tio','halv elva','halv tolv','halv ett'] },
    no: { sep:':', o:['klokka ett','klokka to','klokka tre','klokka fire','klokka fem','klokka seks','klokka sju','klokka åtte','klokka ni','klokka ti','klokka elleve','klokka tolv'], h:['halv to','halv tre','halv fire','halv fem','halv seks','halv sju','halv åtte','halv ni','halv ti','halv elleve','halv tolv','halv ett'] },
    es: { sep:':', o:['la una en punto','las dos en punto','las tres en punto','las cuatro en punto','las cinco en punto','las seis en punto','las siete en punto','las ocho en punto','las nueve en punto','las diez en punto','las once en punto','las doce en punto'], h:['la una y media','las dos y media','las tres y media','las cuatro y media','las cinco y media','las seis y media','las siete y media','las ocho y media','las nueve y media','las diez y media','las once y media','las doce y media'] },
    it: { sep:':', o:['l’una in punto','le due in punto','le tre in punto','le quattro in punto','le cinque in punto','le sei in punto','le sette in punto','le otto in punto','le nove in punto','le dieci in punto','le undici in punto','le dodici in punto'], h:['l’una e mezza','le due e mezza','le tre e mezza','le quattro e mezza','le cinque e mezza','le sei e mezza','le sette e mezza','le otto e mezza','le nove e mezza','le dieci e mezza','le undici e mezza','le dodici e mezza'] },
    pt: { sep:':', o:['uma hora','duas horas','três horas','quatro horas','cinco horas','seis horas','sete horas','oito horas','nove horas','dez horas','onze horas','doze horas'], h:['uma e meia','duas e meia','três e meia','quatro e meia','cinco e meia','seis e meia','sete e meia','oito e meia','nove e meia','dez e meia','onze e meia','doze e meia'] },
    fr: { sep:':', o:['une heure','deux heures','trois heures','quatre heures','cinq heures','six heures','sept heures','huit heures','neuf heures','dix heures','onze heures','douze heures'], h:['une heure et demie','deux heures et demie','trois heures et demie','quatre heures et demie','cinq heures et demie','six heures et demie','sept heures et demie','huit heures et demie','neuf heures et demie','dix heures et demie','onze heures et demie','douze heures et demie'] },
    fi: { sep:':', o:['kello yksi','kello kaksi','kello kolme','kello neljä','kello viisi','kello kuusi','kello seitsemän','kello kahdeksan','kello yhdeksän','kello kymmenen','kello yksitoista','kello kaksitoista'], h:['puoli kaksi','puoli kolme','puoli neljä','puoli viisi','puoli kuusi','puoli seitsemän','puoli kahdeksan','puoli yhdeksän','puoli kymmenen','puoli yksitoista','puoli kaksitoista','puoli yksi'] }
  },/*TIMES-END*/

  defaults: { times: 'hour', colours: 'on' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: 'hour', labelKey: 'tHour' }, { value: 'both', labelKey: 'tBoth' }] },
    { key: 'colours', type: 'choice', labelKey: 'setColours', options: [{ value: 'on', labelKey: 'cOn' }, { value: 'off', labelKey: 'cOff' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._places = []; this._raf = 0; this._busy = false;
    injectRideCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('farm animals').then(function (t) { self._pics.farm = t; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
  },
  destroy: function () { this._stopAnim(); this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; if (!('name' in a)) a.name = this.api && this.api.t ? this.api.t('name') : 'Sprocket'; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return RideHandsCore.locale(((this.api && this.api.lang) || 'en')); },
  _times: function () { return RideHandsCore.timesOf(this._setting('times')); },
  _colours: function () { return RideHandsCore.coloursOf(this._setting('colours')); },
  _key: function () { return this._times(); },
  /* the celebration writes the time exactly as the cards do (h:mm), then the locale's spoken idiom */
  _digital: function (t) { var T = this.TIMES[this._loc()] || this.TIMES.en; return t.h + T.sep + (t.m < 10 ? '0' + t.m : String(t.m)); },
  _phrase: function (t) { var T = this.TIMES[this._loc()] || this.TIMES.en; return (t.m ? T.h : T.o)[t.h - 1]; },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RideHandsCore.ids(this._times()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RideHandsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      this._order = C.plan(this._times(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._t('tTask') }; this._pa = pa;
    return {
      id: 'ridehands.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (id, pos) {
    var C = RideHandsCore;
    this._stopAnim(); this._clearTimers(); this._pos = pos || 0; this._busy = false;
    this.st = C.newState(C.round(id), C.cardOrder(Math.random, this._places));
    this._places.push(C.rightPlace(this.st)); if (this._places.length > 5) this._places.splice(0, 3);   /* trim in threes: the bag position survives */
    this._resetView();
  },
  _resetView: function () { var t = this.st.r.target; this._view = { disp: { h: t.h, m: t.m }, lap: 0, base: null, chips: [], glowShort: false, glowLong: false, litNum: 0, litCollar: null, flash: 0, hop: false, note: '', ok: '', free: false }; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._pool[0], 0); this._render2(); this._watchWidth(); },
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
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rh-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="rh-stage"></div><div class="rh-cards" role="group"></div><div class="rh-foot"></div><p class="rh-note" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* the geometry in px (row 101's proportions: the long hand stops short of the numerals, which stay clear of the ticks) */
  _dims: function () {
    var C = RideHandsCore, w = this._width(), B = C.band(w), S = Math.min(w, 660), wide = B.wide;
    var rD = wide ? 145 : Math.max(96, Math.min(118, S * (B.tiny ? 0.355 : 0.37))), rs = wide ? 96 : 64;
    var cx = S / 2, cy = Math.max(rD + 26, rs + 0.574 * rD + 6);   /* Sprocket's feet on the rim at 55° from the 12 */
    var half = this._times() === 'both', chh = wide ? 20 : 17, chipH = wide ? 42 : 32;
    /* with half past a part can rest beside the 30 collar under the dial: the display sits below that resting place */
    var baseTop = cy + rD + (half ? 4 + chh / 2 + chipH / 2 + 6 : 12), bw = wide ? 176 : 132, bh = wide ? 62 : 50;
    var chipF = wide ? 30 : 22;
    return { w: w, S: S, wide: wide, tiny: B.tiny, rD: rD, rs: rs, cx: cx, cy: cy, tip: 0.46 * rD, longR: 0.62 * rD, numR: 0.76 * rD, numF: wide ? 26 : Math.round(rD * 0.18), tickL: wide ? 12 : B.tiny ? 7 : 9,
      cw: wide ? 34 : 28, chh: chh, baseTop: baseTop, bw: bw, bh: bh, bx: cx - bw / 2, chipF: chipF, chipW: wide ? 48 : 36, chipH: chipH, H: baseTop + bh + 6, half: half };
  },
  _pol: function (D, r, deg) { var a = deg * Math.PI / 180; return { x: D.cx + r * Math.sin(a), y: D.cy - r * Math.cos(a) }; },
  /* where things are: the base display's two cells; a numeral; a collar; a part resting outside its number */
  _baseCell: function (D, which) { return { x: D.cx + (which === 'h' ? -1 : 1) * D.bw * 0.24, y: D.baseTop + D.bh / 2 }; },
  _collarPt: function (D, m) { return m === 30 ? { x: D.cx, y: D.cy + D.rD + 4 + D.chh / 2 } : { x: D.cx, y: D.cy - D.rD - 4 - D.chh / 2 }; },
  _restPt: function (D, part, at) {
    if (part === 'h') return this._pol(D, Math.max(D.chipW * 0.62, D.tip * 0.72), 30 * at);   /* back on the short hand, short of its number: it rode there but does not fit, and the number stays readable */
    var c = this._collarPt(D, at); return { x: c.x - D.cw / 2 - D.chipW / 2 - 6, y: c.y };                    /* beside its collar (left: Sprocket stands at the right) */
  },
  _paint_: function () {
    if (!this._wrap) return;
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'rh-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + this._times() + ' is-col-' + this._colours();
    this._paintStage(D);
    this._paintCards(D);
    var self = this, foot = this._qs('.rh-foot'); foot.innerHTML = '';
    var ck = this._btn('rh-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
    var note = this._qs('.rh-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'rh-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'rh-note is-hint'; }
    else { note.textContent = ''; note.className = 'rh-note'; }
  },
  _paintStage: function (D) {
    var C = RideHandsCore, st = this.st, v = this._view, stage = this._qs('.rh-stage'), self = this, f = function (x) { return Math.round(x * 10) / 10; };
    var col = this._colours() === 'on', SHORT = col ? '#F2784B' : '#3A2E1F', LONG = col ? '#146B5E' : '#3A2E1F';
    stage.style.width = D.S + 'px'; stage.style.height = D.H + 'px';
    var svg = '', rim = D.wide ? 6 : 4.5;
    svg += '<circle cx="' + f(D.cx) + '" cy="' + f(D.cy) + '" r="' + f(D.rD) + '" fill="#FFF8E7" stroke="#146B5E" stroke-width="' + rim + '"/>';
    for (var m = 0; m < 60; m++) { var a1 = this._pol(D, D.rD - rim / 2 - 2, m * 6), a2 = this._pol(D, D.rD - rim / 2 - (m % 5 ? 5 : D.tickL), m * 6); svg += '<line x1="' + f(a1.x) + '" y1="' + f(a1.y) + '" x2="' + f(a2.x) + '" y2="' + f(a2.y) + '" stroke="#3A2E1F" stroke-width="' + (m % 5 ? 1.2 : 2.6) + '" stroke-linecap="round"/>'; }
    for (var h = 1; h <= 12; h++) { var q = this._pol(D, D.numR, h * 30); svg += '<text class="rh-num' + (v.litNum === h ? ' is-lit' : '') + (v.flash === h ? ' is-flash' : '') + '" x="' + f(q.x) + '" y="' + f(q.y) + '" font-size="' + D.numF + '" text-anchor="middle" dominant-baseline="central">' + h + '</text>'; }
    /* the minutes collars: 00 at the 12, and (with half past) 30 at the 6 */
    var cf = D.wide ? 13 : 11.5, collars = D.half ? [0, 30] : [0];
    collars.forEach(function (mm) { var c = self._collarPt(D, mm), on = v.litCollar === mm || v.flashCollar === mm; svg += '<rect class="rh-collar' + (on ? ' is-on' : '') + '" x="' + f(c.x - D.cw / 2) + '" y="' + f(c.y - D.chh / 2) + '" width="' + D.cw + '" height="' + D.chh + '" rx="' + D.chh / 2 + '"/><text class="rh-ctext" x="' + f(c.x) + '" y="' + f(c.y) + '" font-size="' + cf + '" text-anchor="middle" dominant-baseline="central">' + (mm ? '30' : '00') + '</text>'; });
    /* the hands: an hour passing turns the long hand a lap and the short hand one number */
    var A = C.handAngles(v.disp), sa = A.short + 30 * v.lap, la = A.long + 360 * v.lap, sp = this._pol(D, D.tip, sa), lp = this._pol(D, D.longR, la);
    svg += '<line class="rh-long' + (v.glowLong ? ' is-glow' : '') + '" x1="' + f(D.cx) + '" y1="' + f(D.cy) + '" x2="' + f(lp.x) + '" y2="' + f(lp.y) + '" stroke="' + LONG + '" stroke-width="' + (D.wide ? 6 : 4.5) + '" stroke-linecap="round"/>';
    svg += '<line class="rh-short' + (v.glowShort ? ' is-glow' : '') + '" x1="' + f(D.cx) + '" y1="' + f(D.cy) + '" x2="' + f(sp.x) + '" y2="' + f(sp.y) + '" stroke="' + SHORT + '" stroke-width="' + (D.wide ? 12 : 9) + '" stroke-linecap="round"/>';
    svg += '<circle cx="' + f(D.cx) + '" cy="' + f(D.cy) + '" r="' + (D.wide ? 8 : 6) + '" fill="#C9A54E" stroke="#8C6A45" stroke-width="2"/>';
    /* the base under the clock: a plinth with the docked display */
    svg += '<rect x="' + f(D.bx - 10) + '" y="' + f(D.baseTop + D.bh - 8) + '" width="' + f(D.bw + 20) + '" height="10" rx="5" fill="#8C6A45"/>';
    svg += '<rect class="rh-base" x="' + f(D.bx) + '" y="' + f(D.baseTop) + '" width="' + f(D.bw) + '" height="' + f(D.bh) + '" rx="10"/>';
    stage.innerHTML = '<svg class="rh-svg" width="' + f(D.S) + '" height="' + f(D.H) + '" viewBox="0 0 ' + f(D.S) + ' ' + f(D.H) + '" aria-hidden="true" focusable="false">' + svg + '</svg>';
    /* the docked display's two cells (empty until a card docks) */
    var bd = this.api.el('div', 'rh-baseface'); bd.style.left = D.bx + 'px'; bd.style.top = D.baseTop + 'px'; bd.style.width = D.bw + 'px'; bd.style.height = D.bh + 'px';
    bd.innerHTML = '<span class="rh-hh">' + (v.base ? v.base.h : '') + '</span><span class="rh-col">:</span><span class="rh-mm">' + (v.base ? (v.base.m < 10 ? '0' + v.base.m : v.base.m) : '') + '</span>';
    stage.appendChild(bd);
    /* the riding parts */
    /* a part at rest is placed from what it rests at, so a resize (a phone turned) moves it with the clock */
    v.chips.forEach(function (c) { if (c.gone) return; if (c.rest != null) { var rp = self._restPt(D, c.part, c.rest); c.x = rp.x; c.y = rp.y; } var e = self.api.el('span', 'rh-chip is-' + c.part); e.textContent = c.text; e.style.left = c.x + 'px'; e.style.top = c.y + 'px'; e.style.transform = 'translate(-50%,-50%) scale(' + (c.s == null ? 1 : c.s) + ')'; stage.appendChild(e); });
    /* what the clock says, for a screen reader */
    var tg = v.disp, sr = this.api.el('p', 'rh-sr'); sr.textContent = tg.m ? this._t('aClock30', { h: tg.h, h2: tg.h % 12 + 1 }) : this._t('aClock00', { h: tg.h }); stage.appendChild(sr);
    /* Sprocket, perched on the clock's right shoulder */
    var th = this._pics.farm;
    if (th && typeof LCSPictures !== 'undefined') {
      var im = LCSPictures.img(th, 'rooster', this._loc(), {}); im.alt = ''; im.className = 'rh-rooster' + (v.hop ? ' is-hop' : '');
      var fx = D.cx + 0.819 * D.rD, fy = D.cy - 0.574 * D.rD;
      im.style.width = im.style.height = D.rs + 'px'; im.style.left = (fx - D.rs * 0.45) + 'px'; im.style.top = (fy - D.rs) + 'px';
      stage.appendChild(im);
    }
    /* free play after success: the long hand is a button — an hour passes */
    if (v.free) {
      var lb = this._btn('rh-longhit', 'long', this._t('aLong'));
      lb.style.left = (D.cx - 22) + 'px'; lb.style.top = (D.cy - D.longR - 4) + 'px'; lb.style.height = (D.longR + 4) + 'px';
      lb.style.transform = 'rotate(' + la + 'deg)'; lb.style.transformOrigin = '50% 100%';
      lb.disabled = this._busy;
      lb.addEventListener('click', function () { self._hourPasses(); });
      stage.appendChild(lb);
    }
  },
  _paintCards: function (D) {
    var C = RideHandsCore, st = this.st, box = this._qs('.rh-cards'), self = this;
    box.innerHTML = '';
    [0, 1, 2].forEach(function (i) {
      var t = C.cardAt(st, i), right = st.done && i === C.rightPlace(st);
      var b = self._btn('rh-card' + (st.chosen === i ? ' is-chosen' : '') + (right ? ' is-right' : ''), 'card-' + i, C.fmt(t));
      b.innerHTML = '<span class="rh-hh">' + t.h + '</span><span class="rh-col">:</span><span class="rh-mm">' + (t.m < 10 ? '0' + t.m : t.m) + '</span>';
      b.disabled = st.done || self._busy;
      b.addEventListener('click', function () { self._choose(i); });
      box.appendChild(b);
    });
  },

  /* ---------------- motion ---------------- */
  _stopAnim: function () { if (this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; } },
  _reduced: function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } },
  _run: function (steps, done) {
    var self = this; this._stopAnim();
    if (this.FAST || this._reduced() || typeof requestAnimationFrame === 'undefined') { steps.forEach(function (s) { s.fn(1); }); this._paint(); if (done) done(); return; }
    var i = 0, t0 = 0;
    var tick = function (now) {
      if (!t0) t0 = now;
      var s = steps[i], p = s.ms ? Math.min(1, (now - t0) / s.ms) : 1;
      s.fn(p); self._paint_();
      if (p >= 1) { i++; t0 = 0; if (i >= steps.length) { self._raf = 0; if (done) done(); return; } }
      self._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  },
  _ease: function (p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; },
  /* a part's ride: from its base cell to the centre, out along its hand, to its number (the hour at half past: on to the rim
     between two numbers, then back to the one passed) — as a list of waypoints */
  _path: function (D, part, target) {
    var A = RideHandsCore.handAngles(target), start = this._baseCell(D, part), c = { x: D.cx, y: D.cy };
    if (part === 'h') {
      var pts = [start, c, this._pol(D, D.tip, A.short), this._pol(D, D.numR, A.short)];
      if (target.m === 30) pts.push(this._pol(D, D.numR, A.short - 15));
      return pts;
    }
    var end = this._collarPt(D, RideHandsCore.collar(A.long));
    return [start, c, this._pol(D, D.longR, A.long), end];
  },
  _along: function (pts, p) {
    var L = [0]; for (var i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    var d = L[L.length - 1] * p; for (var k = 1; k < pts.length; k++) if (d <= L[k] + 1e-9) { var e = (d - L[k - 1]) / Math.max(1e-9, L[k] - L[k - 1]); return { x: pts[k - 1].x + (pts[k].x - pts[k - 1].x) * e, y: pts[k - 1].y + (pts[k].y - pts[k - 1].y) * e }; }
    return pts[pts.length - 1];
  },

  /* ---------------- actions ---------------- */
  _choose: function (i) {
    if (this._busy || this.st.done) return;
    if (RideHandsCore.choose(this.st, i) !== 'chosen') return;
    this._stopAnim(); this._resetView(); this.api.sound(440); this._paint();
  },
  _check: function () {
    var C = RideHandsCore, st = this.st, self = this, v;
    if (this._busy || st.done) return;
    this._stopAnim(); this._resetView(); v = this._view;
    var a = C.check(st);
    if (a.result === 'none') { this.api.sound(200); v.note = this._t('hintNone'); v.glowShort = true; v.glowLong = true; this._paint(); this.api.announce(v.note); return; }
    var D = this._dims(), card = st.rode.card, tg = st.r.target, R = a.ride, E = this._ease;
    var ph = this._path(D, 'h', tg), pm = this._path(D, 'm', tg), restH = this._restPt(D, 'h', R.hour.at), restM = this._restPt(D, 'm', R.minutes.at);
    var ch = { part: 'h', text: String(card.h), x: ph[0].x, y: ph[0].y }, cm = { part: 'm', text: card.m < 10 ? '0' + card.m : String(card.m), x: pm[0].x, y: pm[0].y };
    this._busy = true;
    var steps = [
      { ms: 240, fn: function () { v.base = card; } },
      { ms: 0, fn: function () { v.base = null; v.chips = [ch, cm]; } },
      { ms: 1100, fn: function (p) { var e = E(p), P = self._along(ph, e), Q = self._along(pm, e); ch.x = P.x; ch.y = P.y; cm.x = Q.x; cm.y = Q.y; } },
      { ms: 260, fn: function (p) {
        if (R.hour.merges) { ch.s = 1 - p; if (p >= 1) { ch.gone = true; v.flash = R.hour.at; } } else { var P = { x: ph[ph.length - 1].x + (restH.x - ph[ph.length - 1].x) * p, y: ph[ph.length - 1].y + (restH.y - ph[ph.length - 1].y) * p }; ch.x = P.x; ch.y = P.y; if (p >= 1) ch.rest = R.hour.at; }
        if (R.minutes.merges) { cm.s = 1 - p; if (p >= 1) { cm.gone = true; v.flashCollar = R.minutes.at; } } else { cm.x = pm[pm.length - 1].x + (restM.x - pm[pm.length - 1].x) * p; cm.y = pm[pm.length - 1].y + (restM.y - pm[pm.length - 1].y) * p; if (p >= 1) cm.rest = R.minutes.at; }
      } }
    ];
    if (a.result === 'ok') {
      steps.push({ ms: 200, fn: function () { v.hop = true; v.base = { h: tg.h, m: tg.m }; } });
      steps.push({ ms: 1200, fn: function (p) { v.lap = E(p); } });
      steps.push({ ms: 0, fn: function () { v.lap = 0; v.disp = C.hourLater(tg); v.base = C.hourLater(tg); } });
      steps.push({ ms: 700, fn: function () {} });
      steps.push({ ms: 0, fn: function () { v.disp = { h: tg.h, m: tg.m }; v.base = { h: tg.h, m: tg.m }; v.hop = false; v.flash = 0; v.flashCollar = null; } });
      this._run(steps, function () {
        self._busy = false; v.free = true; v.ok = self._okText(); self.api.sound(880); self._paint(); self.api.announce(v.ok);
        self._advance(v.ok.length * 60 + 2800);
      });
      return;
    }
    this.api.sound(220);
    var miss2 = st.show >= 2, key = C.hint(st, this._colours()).key;
    this._run(steps, function () {
      /* the hand the wrong part rode glows, and the number it really points to lights up; at miss 2 both hands and both numbers */
      var A = C.handAngles(tg);
      if (!R.hour.merges || miss2) { v.glowShort = true; v.litNum = R.hour.at; }
      if (!R.minutes.merges || miss2) { v.glowLong = true; v.litCollar = C.collar(A.long); }
      v.note = self._t(key); self._busy = false; self._paint(); self.api.announce(v.note);
    });
  },
  /* free play: an hour passes (the clock and the docked display only — never the round's target) */
  _hourPasses: function () {
    var self = this, v = this._view, C = RideHandsCore, E = this._ease;
    if (this._busy || !v.free) return;
    this._busy = true; this._clearTimers();
    this._run([{ ms: 1200, fn: function (p) { v.lap = E(p); } }, { ms: 0, fn: function () { v.lap = 0; v.disp = C.hourLater(v.disp); v.base = { h: v.disp.h, m: v.disp.m }; v.flashCollar = C.collar(C.handAngles(v.disp).long); } }],
      function () { v.ok = self._okText(v.disp); self._busy = false; self.api.sound(660); self._paint(); self.api.announce(v.ok); self._advance(3500); });   /* the line names the time the clock now shows */
  },
  _okText: function (t) { t = t || this.st.r.target; return this._t('okTime', { d: this._digital(t), p: this._phrase(t) }); },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

var rhCssDone = false;
function injectRideCSS() {
  if (rhCssDone || typeof document === 'undefined') return;
  rhCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rh-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .rh-wrap:focus{outline:none;} .rh-wrap.is-narrow{gap:8px;} .rh-wrap.is-tiny{gap:6px;}'
  + '.rh-stage{position:relative;} .rh-svg{display:block;overflow:visible;}'
  + '.rh-num{font-family:' + H + ';font-weight:700;fill:#3A2E1F;} .rh-num.is-lit{fill:#D9472B;} .rh-wrap.is-col-on .rh-num.is-lit{fill:#E35E2C;} .rh-num.is-flash{fill:#F2784B;}'
  + '.rh-ctext{font-family:' + H + ';font-weight:800;fill:#146B5E;} .rh-collar{fill:#FFF8E7;stroke:#B98A55;stroke-width:2;} .rh-collar.is-on{fill:#DFF0EA;stroke:#146B5E;stroke-width:3;}'
  + '.rh-short.is-glow,.rh-long.is-glow{filter:drop-shadow(0 0 5px #F4CF62);}'
  + '.rh-base{fill:#0E3B34;stroke:#3A2E1F;stroke-width:3;}'
  + '.rh-baseface{position:absolute;display:flex;align-items:center;justify-content:center;gap:2px;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1;pointer-events:none;} .rh-wrap.is-narrow .rh-baseface{font-size:23px;}'
  + '.rh-chip{position:absolute;display:inline-flex;align-items:center;justify-content:center;min-width:1.4em;height:1.35em;padding:0 .14em;border-radius:9px;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1;pointer-events:none;z-index:3;box-shadow:0 2px 0 rgba(0,0,0,.25);} .rh-wrap.is-narrow .rh-chip{font-size:22px;border-radius:7px;}'
  + '.rh-hh,.rh-mm{display:inline-flex;align-items:center;justify-content:center;min-width:1.25em;height:1.35em;padding:0 .12em;border-radius:8px;}'
  + '.rh-hh,.rh-chip.is-h{background:#FBE3D6;color:#B4441C;} .rh-mm,.rh-chip.is-m{background:#DFF0EA;color:#0F4A40;} .rh-col{color:#FFF8E7;}'
  + '.rh-wrap.is-col-off .rh-hh,.rh-wrap.is-col-off .rh-mm,.rh-wrap.is-col-off .rh-chip{background:#FFF8E7;color:#3A2E1F;}'
  + '.rh-baseface .rh-hh:empty,.rh-baseface .rh-mm:empty{background:rgba(255,248,231,.14);}'
  + '.rh-rooster{position:absolute;display:block;pointer-events:none;transform-origin:50% 100%;} .rh-rooster.is-hop{animation:rhHop .45s ease-out 2;} @keyframes rhHop{40%{transform:translateY(-14px) rotate(-4deg);}}'
  + '.rh-wrap.is-fast .rh-rooster{animation:none !important;}'
  + '.rh-longhit{position:absolute;width:44px;border:0;border-radius:22px;background:transparent;padding:0;cursor:pointer;z-index:4;} .rh-longhit:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.rh-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;margin:0;}'
  + '.rh-cards{display:flex;gap:12px;justify-content:center;width:100%;max-width:600px;} .rh-wrap.is-narrow .rh-cards{gap:8px;} .rh-wrap.is-tiny .rh-cards{gap:6px;}'
  + '.rh-card{flex:1 1 0;max-width:180px;height:84px;border:0;border-radius:14px;background:#0E3B34;box-shadow:0 4px 0 #062420;padding:6px;display:flex;align-items:center;justify-content:center;gap:2px;cursor:pointer;transition:transform .08s;font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;}'
  + '.rh-wrap.is-narrow .rh-card{height:62px;font-size:28px;border-radius:12px;padding:4px;} .rh-wrap.is-tiny .rh-card{height:56px;font-size:24px;padding:3px;gap:1px;} .rh-wrap.is-tiny .rh-card .rh-hh,.rh-wrap.is-tiny .rh-card .rh-mm{min-width:1.15em;padding:0 .06em;border-radius:6px;}'
  + '.rh-card.is-chosen{transform:translateY(-4px);box-shadow:0 0 0 4px #FFF8E7,0 0 0 7px #146B5E,0 6px 0 #062420;} .rh-card.is-right{box-shadow:0 0 0 4px #F4CF62,0 4px 0 #062420;} .rh-card:disabled{cursor:default;} .rh-card:focus-visible{outline:3px solid #F4CF62;outline-offset:3px;}'
  + '.rh-foot{display:flex;align-items:center;justify-content:center;gap:12px;} .rh-check{min-width:150px;min-height:54px;padding:0 26px;border:0;border-radius:16px;background:#1E8C78;color:#fff;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0E5E50;} .rh-check:disabled{opacity:.5;cursor:default;}'
  + '.rh-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .rh-note.is-hint{color:#8A3B1F;} .rh-wrap.is-narrow .rh-note{font-size:17px;}'
  + '.rh-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var s = document.createElement('style'); s.id = 'rh-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.RideHandsActivity = RideHandsActivity;
