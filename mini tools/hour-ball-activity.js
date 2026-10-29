/* =====================================================================
   hour-ball-activity.js — ACTIVITY #162 of the one-by-one rebuild:
   "Sprocket's Clock — Read the Clock to the Quarter-Hour" → THE HOUR BALL
   (2.MD.C.7; all 11 locales). Model: hour-ball-core.js (HourBallCore).
   Design: docs/activities-rebuild/designs/162-clock-digital.md
   ---------------------------------------------------------------------
   A marble run on a clock: a numbered ball drops down the chute into the
   cup every time the long hand reaches the 12, so the cup holds the hour
   that has begun. Four flip-clock cards (hour right/neighbour × minutes
   right/mirror). Tapping a card posts its hour as a marble over the cup's
   closed lid and its minutes as a feather pin in the rim; Check opens the
   lid. A wrong hour bounces off the cup ball (the later ball is visibly
   still waiting at the top, the earlier one is in the tray); a wrong
   minute leaves the pin standing apart from the long hand. Miss 2 runs the
   clock on to the 12 so the next ball drops only then, and back. Solved →
   the long hand can be dragged round and balls drop at every 12.
   No timer, no score.
   Test seams: window.HourBallActivity.st / ._pool / ._order / ._ensurePool
   / ._start / ._render2 / ._post / ._check / ._turn / ._g / .FAST / .OK_MS.
   ===================================================================== */
var HourBallActivity = {
  id: 'hour-ball',
  /* the drawn apparatus (the hierarchy gate): the clock and its ball run, the cards */
  apparatusClasses: ['hb-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Sprocket's Clock","de":"Sprockets Uhr","fr":"L’horloge de Sprocket","es":"El reloj de Sprocket","pt":"O relógio do Sprocket","it":"L’orologio di Sprocket","nl":"De klok van Kukel","sv":"Tores klocka","da":"Sprockets ur","no":"Sprockets klokke","fi":"Sprocketin kello"},
    instruction: {"en":"Read the clock. Tap the card that shows the same time: its hour goes up as a ball over the cup, its minutes as a pin in the rim. Press Check and the cup opens. The ball in the cup is the hour that has begun: a new ball drops only when the long hand reaches the 12.","de":"Lies die Uhrzeit ab. Tippe auf die Karte mit derselben Uhrzeit: Die Stunde der Karte schwebt als Kugel über dem Becher, ihre Minuten stecken als Fähnchen am Rand. Drück auf Prüfen, dann öffnet sich der Becher. Die Kugel im Becher ist die Stunde, die schon begonnen hat: Eine neue Kugel fällt erst, wenn der große Zeiger bei der 12 ankommt.","fr":"Lis l’heure. Touche la carte qui montre la même heure : son heure monte en bille au-dessus du gobelet, ses minutes se plantent en petit drapeau sur le bord. Appuie sur Vérifier et le gobelet s’ouvre. La bille dans le gobelet, c’est l’heure qui a commencé : une nouvelle bille ne tombe que quand la grande aiguille arrive au 12.","es":"Lee el reloj. Toca la tarjeta que marca la misma hora: su hora sube como una canica sobre el vaso, y sus minutos se clavan como una banderita en el borde. Presiona Revisar y el vaso se abre. La canica del vaso es la hora que ya empezó: una canica nueva solo cae cuando la manecilla larga llega al 12.","pt":"Leia o relógio. Toque no cartão que mostra a mesma hora: a hora dele sobe como uma bolinha acima do copinho, e os minutos viram uma bandeirinha na borda. Aperte Conferir e o copinho se abre. A bolinha no copinho é a hora que já começou: uma bolinha nova só cai quando o ponteiro grande chega ao 12.","it":"Leggi l’orologio. Tocca il cartellino che segna la stessa ora: la sua ora sale come una pallina sopra la coppa, i suoi minuti si piantano come una bandierina sul bordo. Premi Controlla e la coppa si apre. La pallina nella coppa è l’ora che è già cominciata: una pallina nuova cade solo quando la lancetta lunga arriva sul 12.","nl":"Lees de klok. Tik op de kaart met dezelfde tijd: het uur gaat als bal boven het bakje hangen, de minuten komen als vlaggetje op de rand. Druk op Controleer en het bakje gaat open. De bal in het bakje is het uur dat al begonnen is: een nieuwe bal valt pas als de grote wijzer bij de 12 komt.","sv":"Läs klockan. Tryck på kortet som visar samma tid: timmen hamnar som en kula ovanför koppen och minuterna som en flagga på kanten. Tryck på Kolla så öppnas koppen. Kulan i koppen är timmen som redan har börjat: en ny kula trillar ner först när stora visaren kommer till 12:an.","da":"Læs uret. Tryk på det kort, der viser det samme klokkeslæt: timen kommer op som en kugle over bægeret, og minutterne sættes som et lille flag på kanten. Tryk på Tjek, så åbner bægeret sig. Kuglen i bægeret er den time, der er begyndt: en ny kugle falder først, når den store viser når 12-tallet.","no":"Les klokka. Trykk på kortet som viser det samme klokkeslettet: timen kommer opp som en kule over koppen, og minuttene settes som et lite flagg på kanten. Trykk på Sjekk, så åpner koppen seg. Kula i koppen er timen som har begynt: en ny kule faller først når den store viseren kommer til 12-tallet.","fi":"Lue kello. Napauta korttia, joka näyttää saman ajan: sen tunti nousee pallona kupin yläpuolelle ja minuutit pieneksi lipuksi reunaan. Paina Tarkista, niin kuppi aukeaa. Kupissa oleva pallo on tunti, joka on jo alkanut: uusi pallo putoaa vasta, kun pitkä viisari tulee numeron 12 kohdalle."},
    taskLine: {"en":"Read the clock. Tap the card that shows the same time.","de":"Lies die Uhrzeit ab. Tippe auf die Karte mit derselben Uhrzeit.","fr":"Lis l’heure. Touche la carte qui montre la même heure.","es":"Lee el reloj. Toca la tarjeta que marca la misma hora.","pt":"Leia o relógio. Toque no cartão que mostra a mesma hora.","it":"Leggi l’orologio. Tocca il cartellino che segna la stessa ora.","nl":"Lees de klok. Tik op de kaart met dezelfde tijd.","sv":"Läs klockan. Tryck på kortet som visar samma tid.","da":"Læs uret. Tryk på det kort, der viser det samme klokkeslæt.","no":"Les klokka. Trykk på kortet som viser det samme klokkeslettet.","fi":"Lue kello. Napauta korttia, joka näyttää saman ajan."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    hintEmpty: {"en":"Look at both hands first. Then tap a card.","de":"Schau zuerst auf beide Zeiger. Dann tippe auf eine Karte.","fr":"Regarde d’abord les deux aiguilles. Puis touche une carte.","es":"Primero mira las dos manecillas. Luego toca una tarjeta.","pt":"Primeiro olhe os dois ponteiros. Depois toque em um cartão.","it":"Prima guarda tutte e due le lancette. Poi tocca un cartellino.","nl":"Kijk eerst naar beide wijzers. Tik dan op een kaart.","sv":"Titta först på båda visarna. Tryck sedan på ett kort.","da":"Se først på begge visere. Tryk så på et kort.","no":"Se først på begge viserne. Trykk så på et kort.","fi":"Katso ensin molempia viisareita. Napauta sitten korttia."},
    hintChange: {"en":"Tap another card first, then press Check.","de":"Tippe zuerst auf eine andere Karte, dann drück auf Prüfen.","fr":"Touche d’abord une autre carte, puis appuie sur Vérifier.","es":"Primero toca otra tarjeta y luego presiona Revisar.","pt":"Primeiro toque em outro cartão e depois aperte Conferir.","it":"Prima tocca un altro cartellino, poi premi Controlla.","nl":"Tik eerst op een andere kaart en druk dan op Controleer.","sv":"Tryck först på ett annat kort och sedan på Kolla.","da":"Tryk først på et andet kort, og tryk så på Tjek.","no":"Trykk først på et annet kort, og trykk så på Sjekk.","fi":"Napauta ensin toista korttia ja paina sitten Tarkista."},
    hintLater: {"en":"The cup holds ball {h}. Ball {h1} has not dropped yet: it drops when the long hand gets back to the 12.","de":"Im Becher liegt die Kugel mit der {h}. Die Kugel mit der {h1} ist noch nicht gefallen: Sie fällt erst, wenn der große Zeiger wieder bei der 12 ist.","fr":"Le gobelet contient la bille {h}. La bille {h1} n’est pas encore tombée : elle tombe quand la grande aiguille revient au 12.","es":"El vaso tiene la canica {h}. La canica {h1} todavía no cae: cae cuando la manecilla larga vuelve al 12.","pt":"No copinho está a bolinha {h}. A bolinha {h1} ainda não caiu: ela cai quando o ponteiro grande volta ao 12.","it":"Nella coppa c’è la pallina {h}. La pallina {h1} non è ancora caduta: cade quando la lancetta lunga torna sul 12.","nl":"In het bakje ligt bal {h}. Bal {h1} is nog niet gevallen: die valt pas als de grote wijzer weer bij de 12 is.","sv":"I koppen ligger kula nummer {h}. Kula nummer {h1} har inte trillat ner än: den trillar ner när stora visaren kommer tillbaka till 12:an.","da":"I bægeret ligger kugle nummer {h}. Kugle nummer {h1} er ikke faldet ned endnu: den falder, når den store viser når tilbage til 12-tallet.","no":"I koppen ligger kule nummer {h}. Kule nummer {h1} har ikke falt ned ennå: den faller når den store viseren kommer tilbake til 12-tallet.","fi":"Kupissa on pallo numero {h}. Pallo numero {h1} ei ole vielä pudonnut: se putoaa, kun pitkä viisari palaa numeron 12 kohdalle."},
    hintEarlier: {"en":"Ball {g} dropped before ball {h}. The cup holds ball {h}.","de":"Die Kugel mit der {g} ist schon vor der Kugel mit der {h} gefallen. Im Becher liegt die Kugel mit der {h}.","fr":"La bille {g} est tombée avant la bille {h}. Le gobelet contient la bille {h}.","es":"La canica {g} cayó antes que la canica {h}. El vaso tiene la canica {h}.","pt":"A bolinha {g} caiu antes da bolinha {h}. No copinho está a bolinha {h}.","it":"La pallina {g} è caduta prima della pallina {h}. Nella coppa c’è la pallina {h}.","nl":"Bal {g} is al vóór bal {h} gevallen. In het bakje ligt bal {h}.","sv":"Kula nummer {g} trillade ner före kula nummer {h}. I koppen ligger kula nummer {h}.","da":"Kugle nummer {g} faldt ned før kugle nummer {h}. I bægeret ligger kugle nummer {h}.","no":"Kule nummer {g} falt ned før kule nummer {h}. I koppen ligger kule nummer {h}.","fi":"Pallo numero {g} putosi ennen palloa numero {h}. Kupissa on pallo numero {h}."},
    hintMinutes: {"en":"The long hand is on the {n}. Your pin is at the {p}. How many minutes does the {n} stand for?","de":"Der große Zeiger steht auf der {n}. Dein Fähnchen steckt bei der {p}. Wie viele Minuten sind es bei der {n}?","fr":"La grande aiguille est sur le {n}. Ton drapeau est au {p}. Le {n}, ça fait combien de minutes ?","es":"La manecilla larga está en el {n}. Tu banderita está en el {p}. ¿Cuántos minutos marca el {n}?","pt":"O ponteiro grande está no {n}. A sua bandeirinha está no {p}. Quantos minutos o {n} marca?","it":"La lancetta lunga è sul numero {n}. La tua bandierina è sul numero {p}. Quanti minuti sono sul numero {n}?","nl":"De grote wijzer staat op de {n}. Jouw vlaggetje staat bij de {p}. Hoeveel minuten is het bij de {n}?","sv":"Stora visaren står på {n}:an. Din flagga sitter vid {p}:an. Hur många minuter är det vid {n}:an?","da":"Den store viser står på {n}-tallet. Dit flag sidder ved {p}-tallet. Hvor mange minutter er der ved {n}-tallet?","no":"Den store viseren står på {n}-tallet. Flagget ditt står ved {p}-tallet. Hvor mange minutter er det ved {n}-tallet?","fi":"Pitkä viisari on numeron {n} kohdalla. Lippusi on numeron {p} kohdalla. Montako minuuttia numeron {n} kohdalla on?"},
    hintBoth: {"en":"Look at the long hand first: it is on the {n}. Then find the last number the short hand has passed.","de":"Schau zuerst auf den großen Zeiger: Er steht auf der {n}. Dann such die letzte Zahl, an der der kleine Zeiger schon vorbei ist.","fr":"Regarde d’abord la grande aiguille : elle est sur le {n}. Puis cherche le dernier nombre que la petite aiguille a dépassé.","es":"Primero mira la manecilla larga: está en el {n}. Luego busca el último número que ya pasó la manecilla corta.","pt":"Primeiro olhe o ponteiro grande: ele está no {n}. Depois procure o último número pelo qual o ponteiro pequeno já passou.","it":"Prima guarda la lancetta lunga: è sul numero {n}. Poi cerca l’ultimo numero che la lancetta corta ha superato.","nl":"Kijk eerst naar de grote wijzer: die staat op de {n}. Zoek dan het laatste getal waar de kleine wijzer al voorbij is.","sv":"Titta först på stora visaren: den står på {n}:an. Leta sedan upp det sista talet som lilla visaren har passerat.","da":"Se først på den store viser: den står på {n}-tallet. Find så det sidste tal, den lille viser er gået forbi.","no":"Se først på den store viseren: den står på {n}-tallet. Finn så det siste tallet den lille viseren har passert.","fi":"Katso ensin pitkää viisaria: se on numeron {n} kohdalla. Etsi sitten viimeinen numero, jonka lyhyt viisari on ohittanut."},
    hintHelp: {"en":"Watch: ball {h1} drops only when the long hand reaches the 12. The cup still holds ball {h}.","de":"Schau: Die Kugel mit der {h1} fällt erst, wenn der große Zeiger bei der 12 ankommt. Im Becher liegt noch die Kugel mit der {h}.","fr":"Regarde : la bille {h1} ne tombe que quand la grande aiguille arrive au 12. Le gobelet contient encore la bille {h}.","es":"Mira: la canica {h1} solo cae cuando la manecilla larga llega al 12. El vaso todavía tiene la canica {h}.","pt":"Veja: a bolinha {h1} só cai quando o ponteiro grande chega ao 12. No copinho ainda está a bolinha {h}.","it":"Guarda: la pallina {h1} cade solo quando la lancetta lunga arriva sul 12. Nella coppa c’è ancora la pallina {h}.","nl":"Kijk: bal {h1} valt pas als de grote wijzer bij de 12 komt. In het bakje ligt nog bal {h}.","sv":"Titta: kula nummer {h1} trillar ner först när stora visaren kommer till 12:an. I koppen ligger fortfarande kula nummer {h}.","da":"Se: kugle nummer {h1} falder først, når den store viser når 12-tallet. I bægeret ligger stadig kugle nummer {h}.","no":"Se: kule nummer {h1} faller først når den store viseren kommer til 12-tallet. I koppen ligger fortsatt kule nummer {h}.","fi":"Katso: pallo numero {h1} putoaa vasta, kun pitkä viisari tulee numeron 12 kohdalle. Kupissa on vielä pallo numero {h}."},
    hintHelpTo: {"en":"On the clock: {phrase}. Ball {h1} is still waiting at the top; the cup holds ball {h}.","de":"Auf der Uhr: {phrase}. Die Kugel mit der {h1} wartet noch oben; im Becher liegt die Kugel mit der {h}.","fr":"Sur l’horloge : {phrase}. La bille {h1} attend encore en haut ; le gobelet contient la bille {h}.","es":"En el reloj: {phrase}. La canica {h1} todavía espera arriba; el vaso tiene la canica {h}.","pt":"No relógio: {phrase}. A bolinha {h1} ainda espera lá em cima; no copinho está a bolinha {h}.","it":"Sull’orologio: {phrase}. La pallina {h1} aspetta ancora in alto; nella coppa c’è la pallina {h}.","nl":"Op de klok: {phrase}. Bal {h1} wacht nog bovenaan; in het bakje ligt bal {h}.","sv":"På klockan: {phrase}. Kula nummer {h1} väntar fortfarande högst upp; i koppen ligger kula nummer {h}.","da":"På uret: {phrase}. Kugle nummer {h1} venter stadig øverst; i bægeret ligger kugle nummer {h}.","no":"På klokka: {phrase}. Kule nummer {h1} venter fortsatt øverst; i koppen ligger kule nummer {h}.","fi":"Kellossa: {phrase}. Pallo numero {h1} odottaa vielä ylhäällä; kupissa on pallo numero {h}."},
    okPast: {"en":"{time} — {phrase}. The long hand has gone one quarter round.","de":"{time} — {phrase}. Der große Zeiger hat eine Viertelrunde gemacht.","fr":"{time} — {phrase}. La grande aiguille a fait un quart de tour.","es":"{time} — {phrase}. La manecilla larga dio un cuarto de vuelta.","pt":"{time} — {phrase}. O ponteiro grande deu um quarto de volta.","it":"{time} — {phrase}. La lancetta lunga ha fatto un quarto di giro.","nl":"{time} — {phrase}. De grote wijzer heeft een kwartslag gedraaid.","sv":"{time} — {phrase}. Stora visaren har gått ett kvarts varv.","da":"{time} — {phrase}. Den store viser er gået en kvart omgang.","no":"{time} — {phrase}. Den store viseren har gått en kvart runde.","fi":"{time} — {phrase}. Pitkä viisari on kiertänyt neljänneskierroksen."},
    okTo: {"en":"{time} — {phrase}. One more quarter and ball {h1} drops!","de":"{time} — {phrase}. Noch eine Viertelstunde, dann fällt die Kugel mit der {h1}!","fr":"{time} — {phrase}. Encore un quart d’heure et la bille {h1} tombe !","es":"{time} — {phrase}. Un cuarto de hora más y cae la canica {h1}.","pt":"{time} — {phrase}. Mais um quarto de hora e cai a bolinha {h1}!","it":"{time} — {phrase}. Ancora un quarto d’ora e cade la pallina {h1}!","nl":"{time} — {phrase}. Nog een kwartier en bal {h1} valt!","sv":"{time} — {phrase}. En kvart till, så trillar kula nummer {h1} ner!","da":"{time} — {phrase}. Et kvarter mere, så falder kugle nummer {h1}!","no":"{time} — {phrase}. Ett kvarter til, så faller kule nummer {h1}!","fi":"{time} — {phrase}. Vielä vartti, niin pallo numero {h1} putoaa!"},
    okFive: {"en":"{time} — {phrase}.","de":"{time} — {phrase}.","fr":"{time} — {phrase}.","es":"{time} — {phrase}.","pt":"{time} — {phrase}.","it":"{time} — {phrase}.","nl":"{time} — {phrase}.","sv":"{time} — {phrase}.","da":"{time} — {phrase}.","no":"{time} — {phrase}.","fi":"{time} — {phrase}."},
    aCard: {"en":"Card {time}","de":"Karte {time}","fr":"Carte {time}","es":"Tarjeta {time}","pt":"Cartão {time}","it":"Cartellino {time}","nl":"Kaart {time}","sv":"Kort {time}","da":"Kort {time}","no":"Kort {time}","fi":"Kortti {time}"},
    aCards: {"en":"Four cards","de":"Vier Karten","fr":"Quatre cartes","es":"Cuatro tarjetas","pt":"Quatro cartões","it":"Quattro cartellini","nl":"Vier kaarten","sv":"Fyra kort","da":"Fire kort","no":"Fire kort","fi":"Neljä korttia"},
    aClock: {"en":"A clock. The short hand is between the {a} and the {b}. The long hand points at the {n}.","de":"Eine Uhr. Der kleine Zeiger steht zwischen der {a} und der {b}. Der große Zeiger zeigt auf die {n}.","fr":"Une horloge. La petite aiguille est entre le {a} et le {b}. La grande aiguille montre le {n}.","es":"Un reloj. La manecilla corta está entre el {a} y el {b}. La manecilla larga señala el {n}.","pt":"Um relógio. O ponteiro pequeno está entre o {a} e o {b}. O ponteiro grande aponta para o {n}.","it":"Un orologio. La lancetta corta è tra i numeri {a} e {b}. La lancetta lunga indica il numero {n}.","nl":"Een klok. De kleine wijzer staat tussen de {a} en de {b}. De grote wijzer wijst naar de {n}.","sv":"En klocka. Lilla visaren står mellan {a}:an och {b}:an. Stora visaren pekar på {n}:an.","da":"Et ur. Den lille viser står mellem {a}-tallet og {b}-tallet. Den store viser peger på {n}-tallet.","no":"En klokke. Den lille viseren står mellom {a}-tallet og {b}-tallet. Den store viseren peker på {n}-tallet.","fi":"Kello. Lyhyt viisari on numeroiden {a} ja {b} välissä. Pitkä viisari osoittaa numeroa {n}."},
    aCup: {"en":"The cup holds ball {h}.","de":"Im Becher liegt die Kugel mit der {h}.","fr":"Le gobelet contient la bille {h}.","es":"El vaso tiene la canica {h}.","pt":"No copinho está a bolinha {h}.","it":"Nella coppa c’è la pallina {h}.","nl":"In het bakje ligt bal {h}.","sv":"I koppen ligger kula nummer {h}.","da":"I bægeret ligger kugle nummer {h}.","no":"I koppen ligger kule nummer {h}.","fi":"Kupissa on pallo numero {h}."},
    aClockDone: {"en":"The clock shows {time}.","de":"Die Uhr zeigt {time}.","fr":"L’horloge indique {time}.","es":"El reloj marca {time}.","pt":"O relógio mostra {time}.","it":"L’orologio segna {time}.","nl":"De klok wijst {time} aan.","sv":"Klockan visar {time}.","da":"Uret viser {time}.","no":"Klokka viser {time}.","fi":"Kello näyttää {time}."},
    aFree: {"en":"Turn the long hand: drag it round, or use the arrow keys.","de":"Dreh den großen Zeiger: Zieh ihn herum oder nimm die Pfeiltasten.","fr":"Fais tourner la grande aiguille : fais-la glisser ou utilise les flèches.","es":"Gira la manecilla larga: arrástrala o usa las flechas.","pt":"Gire o ponteiro grande: arraste-o ou use as setas.","it":"Gira la lancetta lunga: trascinala o usa le frecce.","nl":"Draai de grote wijzer: sleep hem rond of gebruik de pijltjestoetsen.","sv":"Vrid stora visaren: dra den runt eller använd piltangenterna.","da":"Drej den store viser: træk den rundt, eller brug piletasterne.","no":"Drei den store viseren: dra den rundt, eller bruk piltastene.","fi":"Käännä pitkää viisaria: vedä sitä tai käytä nuolinäppäimiä."},
    setTimes: {"en":"Times","de":"Uhrzeiten","fr":"Heures","es":"Horas","pt":"Horas","it":"Orari","nl":"Tijden","sv":"Tider","da":"Klokkeslæt","no":"Klokkeslett","fi":"Ajat"},
    tL1: {"en":"Quarter hours","de":"Viertelstunden","fr":"Quarts d’heure","es":"Cuartos de hora","pt":"Quartos de hora","it":"Quarti d’ora","nl":"Kwartieren","sv":"Kvartar","da":"Kvarterer","no":"Kvarter","fi":"Vartit"},
    tL2: {"en":"Five minutes","de":"5-Minuten-Schritte","fr":"Minutes de 5 en 5","es":"De 5 en 5 minutos","pt":"De 5 em 5 minutos","it":"Minuti di 5 in 5","nl":"Per 5 minuten","sv":"Var femte minut","da":"Hvert femte minut","no":"Hvert femte minutt","fi":"Viiden minuutin ajat"},
    setTray: {"en":"Past hours","de":"Vergangene Stunden","fr":"Heures passées","es":"Horas pasadas","pt":"Horas passadas","it":"Ore passate","nl":"Voorbije uren","sv":"Timmar som gått","da":"Timer, der er gået","no":"Timer som har gått","fi":"Menneet tunnit"},
    trShow: {"en":"Show the tray","de":"Ablage zeigen","fr":"Montrer le plateau","es":"Mostrar la charola","pt":"Mostrar a bandeja","it":"Mostra il vassoio","nl":"Plankje tonen","sv":"Visa brickan","da":"Vis bakken","no":"Vis brettet","fi":"Näytä tarjotin"},
    trHide: {"en":"Hide the tray","de":"Ablage verstecken","fr":"Cacher le plateau","es":"Ocultar la charola","pt":"Esconder a bandeja","it":"Nascondi il vassoio","nl":"Plankje verbergen","sv":"Dölj brickan","da":"Skjul bakken","no":"Skjul brettet","fi":"Piilota tarjotin"}
  },/*STRINGS-END*/
  defaults: { times: '1', tray: 'show' },
  settings: [
    { key: 'times', type: 'choice', labelKey: 'setTimes', options: [{ value: '1', labelKey: 'tL1' }, { value: '2', labelKey: 'tL2' }] },
    { key: 'tray', type: 'choice', labelKey: 'setTray', options: [{ value: 'show', labelKey: 'trShow' }, { value: 'hide', labelKey: 'trHide' }] }
  ],
  OK_MS: 500, FAST: false,
  THEMES: ['farm-animals'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false; this._posHist = []; this._drag = null;
    injectHourBallCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return HourBallCore.levelOf(this._setting('times')); },
  _trayOn: function () { return this._setting('tray') !== 'hide'; },
  _loc: function () { return HourBallCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level(); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = HourBallCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = HourBallCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'hour-ball.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._t('taskLine'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = HourBallCore.newState(this._level(), k);
    /* the cards' screen positions: a fresh shuffle every showing, never the right card in one place three showings running */
    var o = HourBallCore.cardOrder(Math.random, this._posHist.slice(-2));
    this._cardOrder = o; this._posHist.push(o.indexOf(0)); if (this._posHist.length > 6) this._posHist.shift();
    this._view = { note: '', soft: false, win: false, run: null, drop: false, hop: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'hb-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="hb-main"><div class="hb-run" data-qa="run"></div><div class="hb-side"><div class="hb-cards" role="group"></div><div class="hb-goline"></div></div></div><p class="hb-note" data-qa="note" aria-live="polite"></p>';
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
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _geometry: function (W, done) {
    var wide = W >= 600, cramp = W < 330;
    var S = wide ? Math.min(340, W - 300) : cramp ? Math.min(185, W - 30) : Math.min(300, W - 30);
    /* the smallest phones, once solved: the run closes up so the success line and Next stay above the fold */
    if (!wide && done) S = Math.min(S, cramp ? 145 : 230);
    return { W: W, wide: wide, cramp: cramp, S: S, rooster: wide ? 96 : 64 };
  },
  _paint_: function () {
    var st = this.st, v = this._view, W = this._width();
    var g = this._g = this._geometry(W, st.done);
    this._wrap.className = 'hb-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    this._paintRun();
    this._paintCards();
    this._paintGo();
    var note = this._qs('.hb-note');
    if (v.note) { note.textContent = v.note; note.className = 'hb-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'hb-note'; }
    this._setPrompt();
  },
  /* the time the clock shows now: a run-on step, the free-play clock, or the round's own */
  _shown: function () {
    var st = this.st, v = this._view, r = st.round, C = HourBallCore;
    if (v.run) return v.run.steps[v.run.i];
    if (st.done) return C.freeClock(st);
    return { h: r.h, m: r.m, cup: r.h };
  },
  _ball: function (x, y, n, cls, extra) {
    return '<g class="hb-ball' + cls + '"' + (extra || '') + '><circle cx="' + x + '" cy="' + y + '" r="18"/>' + (n !== null ? '<text x="' + x + '" y="' + (y + 7) + '" text-anchor="middle">' + n + '</text>' : '') + '</g>';
  },
  _paintRun: function () {
    var st = this.st, r = st.round, g = this._g, C = HourBallCore, v = this._view, el = this._qs('.hb-run'), self = this, loc = this._loc();
    var CX = 165, CY = 205, P = function (a, rad) { var t = (a - 90) * Math.PI / 180; return [CX + rad * Math.cos(t), CY + rad * Math.sin(t)]; };
    var vr = st.verdict, help = st.help && !!vr, now = this._shown();
    var lidOpen = !!vr || !!v.run || st.done, posted = st.posted !== null && !st.done && !vr ? r.cards[st.posted] : null;
    el.innerHTML = ''; el.style.width = g.S + 'px'; el.style.height = Math.round(g.S * 460 / 340) + 'px';
    var o = '';
    /* the hopper: the balls still to drop, their numbers behind a frosted band (the waiting ball shows its number only when a miss points at it) */
    o += '<rect class="hb-hopper" x="96" y="6" width="150" height="46" rx="20"/>';
    var showWait = (vr && vr.hourSide === 'later') || !!v.run || help;
    for (var b = 0; b < 5; b++) o += this._ball(116 + b * 28, 30, b === 4 && showWait ? C.waiting(r.h) : null, b === 4 ? ' is-waiting' + (showWait ? ' is-shown' : '') : ' is-hidden', b === 4 ? ' data-waiting="' + (showWait ? C.waiting(r.h) : '') + '"' : '');
    o += '<rect class="hb-frost" x="100" y="22" width="112" height="16" rx="6"/>';
    /* the chute: a brass spiral down the right side of the case to the cup */
    o += '<path class="hb-chute" d="M246 30 C 320 40, 330 90, 300 120 S 330 200, 305 240 S 330 340, 295 370 S 225 384, 205 390"/>';
    /* the clock face */
    o += '<circle class="hb-face" cx="' + CX + '" cy="' + CY + '" r="125"/>';
    var L1 = r.level === '1';
    for (var i = 0; i < 60; i++) {
      var quarter = i % 15 === 0, five = i % 5 === 0, bold = L1 ? quarter : five;
      var t1 = P(i * 6, 121), t2 = P(i * 6, bold ? 104 : five ? 112 : 116);
      o += '<path class="hb-tick' + (bold ? ' is-bold' : five ? ' is-five' : '') + '" d="M' + t1[0].toFixed(1) + ' ' + t1[1].toFixed(1) + 'L' + t2[0].toFixed(1) + ' ' + t2[1].toFixed(1) + '"/>';
    }
    o += '<circle class="hb-rim" cx="' + CX + '" cy="' + CY + '" r="125"/>';
    /* the posted card's feather pin in the rim at ITS minutes; a wrong minute: a dotted coral line along the rim from the long hand's tip to the pin */
    var pinM = posted ? posted.m : vr ? vr.card.m : null;
    if (pinM !== null && !v.run) {
      var pa = C.minuteAngle(pinM), p1 = P(pa, 128), p2 = P(pa, 156), pf = P(pa + 7, 150);
      o += '<g class="hb-pin' + (vr && !vr.minOk ? ' is-shake' : vr && vr.minOk ? ' is-good' : '') + '" data-pin="' + pinM + '"><path class="hb-pinstem" d="M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + 'L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + '"/><path class="hb-flag" d="M' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + 'L' + pf[0].toFixed(1) + ' ' + pf[1].toFixed(1) + 'L' + P(pa, 144)[0].toFixed(1) + ' ' + P(pa, 144)[1].toFixed(1) + 'Z"/></g>';
      if (vr && !vr.minOk) {
        var a0 = C.minuteAngle(r.m), a1 = pa, d = ((a1 - a0) % 360 + 360) % 360, sweep = d <= 180 ? 1 : 0, s0 = P(a0, 132), s1 = P(a1, 132);
        o += '<path class="hb-gap" data-gap="1" d="M' + s0[0].toFixed(1) + ' ' + s0[1].toFixed(1) + 'A132 132 0 0 ' + sweep + ' ' + s1[0].toFixed(1) + ' ' + s1[1].toFixed(1) + '"/>';
      }
    }
    /* the hands */
    var ma = C.minuteAngle(now.m), ha = C.hourAngle(now.h, now.m);
    var hand = function (ang, len, cls, extra) { var e = P(ang, len); return '<path class="' + cls + '"' + (extra || '') + ' d="M' + CX + ' ' + CY + 'L' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '"/>'; };
    o += hand(ha, 66, 'hb-hhand', ' data-hour="' + ha + '"') + hand(ma, 108, 'hb-mhand', ' data-minute="' + ma + '"');
    if (st.done) { var tip = P(ma, 108); o += '<circle class="hb-grip" data-grip="1" cx="' + tip[0].toFixed(1) + '" cy="' + tip[1].toFixed(1) + '" r="13"/>'; }
    o += '<circle class="hb-cap" cx="' + CX + '" cy="' + CY + '" r="8"/>';
    /* the numerals sit above the hands (a halo keeps the one under the long hand readable) */
    for (var h = 1; h <= 12; h++) { var q = P(h * 30, 90); o += '<text class="hb-num" x="' + q[0].toFixed(1) + '" y="' + (q[1] + 9).toFixed(1) + '" text-anchor="middle">' + h + '</text>'; }
    /* the cup under the face, its lid, the ball that is in it (only once the lid is open) */
    o += '<path class="hb-cup" d="M133 392 L197 392 L189 432 Q165 440 141 432 Z"/>';
    if (lidOpen) o += this._ball(CX, 406, now.cup, ' is-cup' + (st.done || (vr && vr.hourOk) ? ' is-good' : '') + (v.drop ? ' is-drop' : ''), ' data-cup="' + now.cup + '"');
    else o += '<rect class="hb-lid" data-lid="shut" x="129" y="382" width="72" height="12" rx="5"/>';
    /* the posted card's hour marble hovers over the lid; after a wrong-hour Check it has bounced off and rests beside the cup */
    var mh = posted ? posted.h : vr && !vr.hourOk && !v.run ? vr.card.h : null;
    if (mh !== null) o += this._ball(vr && !vr.hourOk ? 102 : CX, vr && !vr.hourOk ? 422 : 360, mh, ' is-marble' + (vr && !vr.hourOk ? ' is-bounce' : ''), ' data-marble="' + mh + '"');
    /* the tray of past hours: face-down during a round (they would give the hour away), turned up once the lid opens */
    if (this._trayOn()) {
      var tr = C.tray(now.cup), up = lidOpen, mark = vr && vr.hourSide === 'earlier' ? vr.card.h : null;
      o += '<path class="hb-rail" data-tray="1" d="M222 434 L320 434"/>';
      tr.forEach(function (n, j) { o += self._ball(250 + j * 40, 416, up ? n : null, up ? (mark === n ? ' is-marked' : '') : ' is-hidden', ' data-tray-ball="' + (up ? n : '') + '"'); });
    }
    el.insertAdjacentHTML('beforeend', '<svg class="hb-art hb-svg" viewBox="0 0 340 460" width="' + g.S + '" height="' + Math.round(g.S * 460 / 340) + '" aria-hidden="true">' + o + '</svg>');
    /* Sprocket stands on the hopper */
    var ro = this._themes['farm-animals'];
    if (ro && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(ro, 'rooster', loc, { size: g.rooster }); im.className = 'hb-rooster hb-art' + (v.hop ? ' is-hop' : ''); im.alt = ''; im.setAttribute('data-rooster', '1'); im.style.width = g.rooster + 'px'; im.style.height = g.rooster + 'px'; el.appendChild(im); }
    /* the clock read aloud: its hands, never its time (until it is solved) */
    var sr = document.createElement('span'); sr.className = 'hb-srtext';
    sr.textContent = st.done ? this._t('aClockDone', { time: C.fmt(loc, now.h, now.m) }) : this._t('aClock', { a: r.h, b: C.wrap(r.h + 1), n: r.m / 5 || 12 }) + (lidOpen ? ' ' + this._t('aCup', { h: now.cup }) : '');
    el.appendChild(sr);
    /* free play: the long hand can be dragged (and stepped with the arrow keys) once the round is solved */
    el.onpointerdown = st.done ? function (e) { self._dragHand(e); } : null;
    if (st.done) { el.tabIndex = 0; el.setAttribute('role', 'slider'); el.setAttribute('aria-label', this._t('aFree')); el.setAttribute('aria-valuetext', C.fmt(loc, now.h, now.m)); el.setAttribute('data-k', 'free'); }
    else { el.removeAttribute('tabindex'); el.removeAttribute('role'); el.removeAttribute('aria-label'); el.removeAttribute('data-k'); }
  },
  _paintCards: function () {
    var st = this.st, r = st.round, self = this, el = this._qs('.hb-cards'), C = HourBallCore, loc = this._loc();
    el.innerHTML = ''; el.setAttribute('aria-label', this._t('aCards'));
    this._cardOrder.forEach(function (ci, pos) {
      var c = r.cards[ci], txt = C.fmt(loc, c.h, c.m), sep = loc === 'fr' ? ' h ' : txt.charAt(String(c.h).length), mm = (c.m < 10 ? '0' : '') + c.m;
      var on = st.posted === ci, good = st.done && ci === 0;
      var b = self._btn('hb-card' + (on ? ' is-on' : '') + (good ? ' is-good' : ''), 'card-' + pos, self._t('aCard', { time: txt }),
        '<span class="hb-hh">' + c.h + '</span><span class="hb-sep">' + self._esc(sep) + '</span><span class="hb-mm">' + mm + '</span>');
      b.setAttribute('data-card', String(ci)); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.disabled = st.done;
      b.addEventListener('click', function () { self._post(ci); });
      el.appendChild(b);
    });
  },
  _paintGo: function () {
    var st = this.st, self = this, el = this._qs('.hb-goline'); el.innerHTML = '';
    var c = this._btn('hb-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    c.disabled = st.done || !!this._view.run; c.addEventListener('click', function () { self._check(); }); el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _post: function (i) {
    if (this._view.run || !HourBallCore.post(this.st, i)) return false;
    var c = this.st.round.cards[i];
    this._view.note = ''; this.api.sound(420); this._paint();
    this.api.announce(this._t('aCard', { time: HourBallCore.fmt(this._loc(), c.h, c.m) }));
    return true;
  },
  _keyboard: function (e) {
    var st = this.st, k = e.key;
    if (st.done && (k === 'ArrowRight' || k === 'ArrowUp' || k === '+' || k === 'ArrowLeft' || k === 'ArrowDown' || k === '-')) {
      e.preventDefault(); var s = st.level === '1' ? 15 : 5; this._turn(k === 'ArrowRight' || k === 'ArrowUp' || k === '+' ? s : -s); return;
    }
    var cards = [].slice.call(this._wrap.querySelectorAll('.hb-card')), at = cards.indexOf(document.activeElement);
    if (at >= 0 && /^Arrow/.test(k)) { e.preventDefault(); var nx = k === 'ArrowRight' ? at + 1 : k === 'ArrowLeft' ? at - 1 : k === 'ArrowDown' ? at + 2 : at - 2; nx = (nx + 4) % 4; cards[nx].focus(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = HourBallCore, self = this; if (st.done || v.run) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { this._success(); return; }
    var key = C.hint(st), args = C.hintArgs(st); args.phrase = C.phrase(this._loc(), st.round.h, st.round.m);
    v.soft = false; v.note = this._t(key, args);
    this.api.sound(240);
    if (st.help) { this._runOn(); return; }
    this._paint(); this.api.announce(v.note);
  },
  /* miss 2: the clock runs on to the 12 — the next ball drops only there — then back to the round's time */
  _runOn: function () {
    var st = this.st, v = this._view, C = HourBallCore, self = this, steps = C.runOn(st.round);
    var back = function () { v.run = null; v.drop = false; self._paint(); self.api.announce(v.note); };
    if (this.FAST) { back(); return; }
    v.run = { steps: steps, i: 0 }; this._paint();
    var tick = function () {
      if (!v.run) return;
      if (v.run.i < steps.length - 1) { v.run.i++; v.drop = v.run.i === steps.length - 1; self.api.sound(v.drop ? 700 : 500); self._paint(); self._later(tick, v.drop ? 1200 : 400); }
      else back();
    };
    this._later(tick, 400);
  },
  /* free play: drag the long hand; crossing the 12 drops the next ball (forward) or rolls it back up (backward) */
  _turn: function (d) {
    var res = HourBallCore.turn(this.st, d); if (!this.st.done) return 0;
    this._view.drop = res.drops > 0; if (res.drops) this.api.sound(res.drops > 0 ? 700 : 380);
    this._paintRun(); return res.drops;
  },
  _dragHand: function (e) {
    if (e.button) return;
    var self = this, el = this._qs('.hb-run'), C = HourBallCore;
    var angleAt = function (ev) { var r = el.getBoundingClientRect(), k = r.width / 340, x = ev.clientX - r.left - 165 * k, y = ev.clientY - r.top - 205 * k; return (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360; };
    var last = angleAt(e); e.preventDefault(); this._endDrag();
    var mv = function (ev) { ev.preventDefault(); var a = angleAt(ev), d = ((a - last + 540) % 360) - 180; last = a; self._turn(d / 6); };
    var up = function () { self._endDrag(); C.snap(self.st); self._paintRun(); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = HourBallCore, loc = this._loc(), self = this;
    var a = C.okArgs(r, loc), msg = this._t(C.okKey(r), a);
    v.note = ''; v.win = true; v.hop = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    /* the clock runs one more quarter (or on to the next quarter): on a quarter-to round that is the 12, and the next ball drops */
    var to = Math.ceil((r.m + 1) / 15) * 15, d = to - r.m;
    this._later(function () { self._turn(d); }, this.FAST ? 0 : 450);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectHourBallCSS() {
  if (typeof document === 'undefined' || document.getElementById('hb-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.hb-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .hb-wrap:focus{outline:none;}'
  + '.hb-main{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;} .hb-wrap.is-wide .hb-main{flex-direction:row;align-items:center;justify-content:center;gap:20px;}'
  + '.hb-side{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;} .hb-wrap.is-wide .hb-side{width:300px;flex:none;}'
  + '.hb-run{position:relative;flex:none;touch-action:none;} .hb-run:focus-visible{outline:3px solid #F2784B;outline-offset:4px;border-radius:12px;} .hb-wrap.is-done .hb-run{cursor:grab;} .hb-svg{display:block;overflow:visible;} .hb-srtext{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;}'
  + '.hb-hopper{fill:#EAF4F7;stroke:#7FA6B3;stroke-width:2.5;} .hb-frost{fill:#F4F8FA;opacity:.85;}'
  + '.hb-ball circle{fill:#FFF8E7;stroke:' + INK + ';stroke-width:2;} .hb-ball text{font-family:' + H + ';font-weight:800;font-size:21px;fill:' + INK + ';} .hb-ball.is-hidden circle{fill:#F1E6CC;}'
  + '.hb-ball.is-waiting.is-shown circle{fill:#FFE8A3;stroke:#B98B00;stroke-width:3;} .hb-ball.is-cup.is-good circle{fill:#CDEBE4;stroke:#146B5E;stroke-width:3;} .hb-ball.is-marble circle{fill:#FDE3D6;stroke:#C4522F;stroke-width:3;} .hb-ball.is-marked circle{fill:#FFE8A3;stroke:#B98B00;stroke-width:3;}'
  + '.hb-chute{fill:none;stroke:#C9A23A;stroke-width:12;stroke-linecap:round;opacity:.85;}'
  + '.hb-face{fill:#FFF8E7;} .hb-rim{fill:none;stroke:#146B5E;stroke-width:6;} .hb-tick{stroke:#9A9284;stroke-width:1.4;} .hb-tick.is-five{stroke:' + INK + ';stroke-width:2.2;} .hb-tick.is-bold{stroke:#146B5E;stroke-width:4;}'
  + '.hb-num{font-family:' + H + ';font-weight:800;font-size:25px;fill:' + INK + ';stroke:#FFF8E7;stroke-width:5;paint-order:stroke;stroke-linejoin:round;}'
  + '.hb-hhand{stroke:#F2784B;stroke-width:11;stroke-linecap:round;} .hb-mhand{stroke:#146B5E;stroke-width:6;stroke-linecap:round;} .hb-cap{fill:#C9A23A;stroke:' + INK + ';stroke-width:1.5;} .hb-grip{fill:rgba(20,107,94,.18);stroke:#146B5E;stroke-width:2;}'
  + '.hb-pinstem{stroke:#146B5E;stroke-width:4;stroke-linecap:round;} .hb-flag{fill:#F2784B;stroke:' + INK + ';stroke-width:1.2;} .hb-pin.is-good .hb-pinstem{stroke:#2E9C88;} .hb-gap{fill:none;stroke:#E0603A;stroke-width:3.5;stroke-dasharray:3 6;stroke-linecap:round;}'
  + '.hb-cup{fill:#C9A23A;stroke:#7A5E14;stroke-width:2.5;} .hb-lid{fill:#A88420;stroke:#7A5E14;stroke-width:2;} .hb-rail{stroke:#8C6A3E;stroke-width:6;stroke-linecap:round;}'
  + '.hb-rooster{position:absolute;left:0;top:0;object-fit:contain;pointer-events:none;} .hb-wrap:not(.is-fast) .hb-rooster.is-hop{animation:hbHop .6s ease-out 1;}'
  + '.hb-wrap:not(.is-fast) .hb-pin.is-shake{animation:hbShake .25s ease-in-out 2;transform-box:fill-box;transform-origin:50% 100%;} .hb-wrap:not(.is-fast) .hb-ball.is-bounce{animation:hbBounce .5s ease-out 1;transform-box:fill-box;} .hb-wrap:not(.is-fast) .hb-ball.is-drop{animation:hbDrop .6s ease-out 1;transform-box:fill-box;}'
  + '.hb-cards{display:grid;grid-template-columns:repeat(2,140px);gap:14px;} .hb-wrap.is-narrow .hb-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;width:100%;max-width:340px;}'
  + '.hb-card{height:96px;border:0;border-radius:12px;background:#2F3640;box-shadow:inset 0 0 0 3px ' + INK + ',0 3px 0 #14181D;display:flex;align-items:center;justify-content:center;gap:2px;font-family:' + H + ';font-weight:800;font-size:40px;cursor:pointer;padding:0 6px;}'
  + '.hb-card .hb-hh{background:#FDE3D6;color:#C4522F;border-radius:8px;padding:0 6px;min-width:1.2em;} .hb-card .hb-mm{background:#DDF1EC;color:#146B5E;border-radius:8px;padding:0 6px;} .hb-card .hb-sep{color:#FFF8E7;}'
  + '.hb-card.is-on{box-shadow:inset 0 0 0 3px ' + INK + ',0 0 0 4px #2E9C88;transform:translateY(-4px);} .hb-card.is-good{box-shadow:inset 0 0 0 3px ' + INK + ',0 0 0 4px #FFD449;} .hb-card:disabled{cursor:default;} .hb-card:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '.hb-wrap.is-narrow .hb-card{height:64px;font-size:30px;} .hb-wrap.is-cramp .hb-card{height:56px;font-size:26px;}'
  + '.hb-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0E4F45;} .hb-go svg{width:22px;height:22px;} .hb-go:disabled{opacity:.45;cursor:default;} .hb-wrap.is-narrow .hb-go{height:48px;}'
  + '.hb-note{margin:0;max-width:640px;min-height:1.3em;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .hb-wrap.is-narrow .hb-note{font-size:16px;line-height:1.25;} .hb-note.is-hint{color:#9A3412;} .hb-wrap.is-narrow .hb-note:empty{display:none;}'
  + '.hb-wrap.is-done .hb-goline{display:none;} .hb-wrap.is-narrow.is-done .hb-card:not(.is-good){display:none;} .hb-wrap.is-narrow.is-done .hb-cards{grid-template-columns:minmax(0,170px);justify-content:center;} .hb-wrap.is-done .hb-note:empty{display:none;}'
  + '@keyframes hbHop{0%,100%{translate:0 0;}40%{translate:0 -10px;}} @keyframes hbShake{0%,100%{rotate:0deg;}50%{rotate:12deg;}} @keyframes hbBounce{0%{translate:63px -62px;}60%{translate:0 -10px;}100%{translate:0 0;}} @keyframes hbDrop{from{translate:0 -60px;opacity:.4;}to{translate:0 0;opacity:1;}}'
  + '.hb-wrap.is-fast *{animation:none !important;transition:none !important;}';
  var s = document.createElement('style'); s.id = 'hb-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.HourBallActivity = HourBallActivity;
