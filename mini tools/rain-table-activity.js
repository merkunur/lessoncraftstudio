/* =====================================================================
   rain-table-activity.js — ACTIVITY #172 of the one-by-one rebuild:
   "Make Thirds" (2.G.A.3) → THE RAIN TABLE.
   Model: rain-table-core.js. Design:
   docs/activities-rebuild/designs/172-fractions.md
   ---------------------------------------------------------------------
   The shape is a little rain table. Tap a notch on its edge and a wall
   drops straight across; tap a peg on its rim and a wall swings in from
   the centre pin. Check makes it rain: every part drains into its own
   glass tube, so the water in a tube is the part's area. Equal parts fill
   their tubes to the same gold line; a bigger part overflows, a smaller
   one stops short, a part with no tube spills into the puddle tray.
   Optional color step: color k of the n equal parts. Next appears
   .OK_MS after success.
   ===================================================================== */
var RainTableActivity = {
  id: 'rain-table-activity',
  /* the drawn apparatus (table, walls, marks, cloud, tubes, tray): declared for the hierarchy audit */
  apparatusClasses: ['rt-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"The Rain Table","de":"Der Regentisch","fr":"La table à pluie","es":"La mesa de lluvia","pt":"A mesa da chuva","it":"Il tavolo della pioggia","nl":"De regentafel","sv":"Regnbordet","da":"Regnbordet","no":"Regnbordet","fi":"Sadepöytä"},
    instruction: {"en":"Put up walls to make equal parts. Then let it rain: equal parts fill their tubes to the same line.","de":"Stell Wände auf und mach gleich große Teile. Dann lass es regnen: Gleich große Teile füllen ihre Röhrchen gleich hoch.","fr":"Pose des cloisons pour faire des parts égales. Puis fais pleuvoir : des parts égales remplissent leurs tubes à la même hauteur.","es":"Pon paredes para hacer partes iguales. Luego haz llover: las partes iguales llenan sus tubos a la misma altura.","pt":"Coloque divisórias para fazer partes iguais. Depois faça chover: partes iguais enchem seus tubos até a mesma altura.","it":"Metti delle paretine per fare parti uguali. Poi fai piovere: parti uguali riempiono le loro provette alla stessa altezza.","nl":"Zet schotjes neer om gelijke delen te maken. Laat het dan regenen: gelijke delen vullen hun buisjes even hoog.","sv":"Sätt upp väggar så att du får lika stora delar. Låt det sedan regna: lika stora delar fyller sina rör lika högt.","da":"Sæt vægge op, så du får lige store dele. Lad det så regne: lige store dele fylder deres rør lige højt.","no":"Sett opp vegger så du får like store deler. La det så regne: like store deler fyller rørene sine like høyt.","fi":"Rakenna väliseiniä, niin saat yhtä suuria osia. Anna sitten sataa: yhtä suuret osat täyttävät putkensa yhtä korkealle."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setParts: {"en":"Parts","de":"Teile","fr":"Parts","es":"Partes","pt":"Partes","it":"Parti","nl":"Delen","sv":"Delar","da":"Dele","no":"Deler","fi":"Osat"},
    pHalves: {"en":"Halves","de":"Hälften","fr":"Moitiés","es":"Mitades","pt":"Metades","it":"Metà","nl":"Helften","sv":"Halvor","da":"Halvdele","no":"Halvdeler","fi":"Puolikkaat"},
    pThirds: {"en":"Thirds","de":"Drittel","fr":"Tiers","es":"Tercios","pt":"Terços","it":"Terzi","nl":"Derde delen","sv":"Tredjedelar","da":"Tredjedele","no":"Tredeler","fi":"Kolmasosat"},
    pFourths: {"en":"Fourths","de":"Viertel","fr":"Quarts","es":"Cuartos","pt":"Quartos","it":"Quarti","nl":"Kwarten","sv":"Fjärdedelar","da":"Fjerdedele","no":"Firedeler","fi":"Neljäsosat"},
    setColour: {"en":"Color after","de":"Danach anmalen","fr":"Colorier ensuite","es":"Colorear después","pt":"Colorir depois","it":"Colorare dopo","nl":"Daarna kleuren","sv":"Färglägg efteråt","da":"Farvelæg bagefter","no":"Fargelegg etterpå","fi":"Väritä lopuksi"},
    cOff: {"en":"Off","de":"Aus","fr":"Non","es":"No","pt":"Não","it":"No","nl":"Uit","sv":"Av","da":"Fra","no":"Av","fi":"Pois"},
    cOn: {"en":"On","de":"An","fr":"Oui","es":"Sí","pt":"Sim","it":"Sì","nl":"Aan","sv":"På","da":"Til","no":"På","fi":"Päällä"},
    qMake: {"en":"Make {n} equal parts — {fp}.","de":"Teile die Form in {n} gleich große Teile – {fp}.","fr":"Partage la forme en {n} parts égales : des {fp}.","es":"Divide la figura en {n} partes iguales: {fp}.","pt":"Divida a figura em {n} partes iguais: {fp}.","it":"Dividi la figura in {n} parti uguali: {fp}.","nl":"Verdeel de vorm in {n} gelijke delen: {fp}.","sv":"Dela formen i {n} lika stora delar – {fp}.","da":"Del figuren i {n} lige store dele – {fp}.","no":"Del figuren i {n} like store deler – {fp}.","fi":"Jaa kuvio {n} yhtä suureen osaan – {fp}."},
    qColour: {"en":"Now color {k} of the {n} parts.","de":"Mal jetzt {k} von den {n} Teilen an.","fr":"Colorie maintenant {k} des {n} parts.","es":"Ahora colorea {k} de las {n} partes.","pt":"Agora pinte {k} das {n} partes.","it":"Ora colora {k} delle {n} parti.","nl":"Kleur nu {k} van de {n} delen.","sv":"Färglägg nu {k} av de {n} delarna.","da":"Farvelæg nu {k} af de {n} dele.","no":"Fargelegg nå {k} av de {n} delene.","fi":"Väritä nyt {k} osaa kaikista {n} osasta."},
    qColour1: {"en":"Now color 1 of the {n} parts.","de":"Mal jetzt einen von den {n} Teilen an.","fr":"Colorie maintenant une des {n} parts.","es":"Ahora colorea una de las {n} partes.","pt":"Agora pinte uma das {n} partes.","it":"Ora colora una delle {n} parti.","nl":"Kleur nu één van de {n} delen.","sv":"Färglägg nu en av de {n} delarna.","da":"Farvelæg nu en af de {n} dele.","no":"Fargelegg nå én av de {n} delene.","fi":"Väritä nyt yksi osa kaikista {n} osasta."},
    hintStart: {"en":"Tap a notch by the edge or a peg on the rim to put up a wall.","de":"Tipp auf eine Kerbe am Rand oder auf einen Stift, um eine Wand aufzustellen.","fr":"Touche une encoche du bord ou une cheville pour poser une cloison.","es":"Toca una muesca del borde o una clavija para poner una pared.","pt":"Toque num entalhe da borda ou num pino para colocar uma divisória.","it":"Tocca una tacca del bordo o un piolo per mettere una paretina.","nl":"Tik op een inkeping in de rand of op een pinnetje om een schotje neer te zetten.","sv":"Tryck på en skåra i kanten eller på en pinne för att sätta upp en vägg.","da":"Tryk på et hak i kanten eller på en pind for at sætte en væg op.","no":"Trykk på et hakk i kanten eller på en pinne for å sette opp en vegg.","fi":"Napauta reunan lovea tai nastaa, niin saat väliseinän."},
    hintTooMany: {"en":"Four walls are the most you need.","de":"Mehr als vier Wände brauchst du nie.","fr":"Quatre cloisons suffisent toujours.","es":"Nunca necesitas más de cuatro paredes.","pt":"Você nunca precisa de mais de quatro divisórias.","it":"Non ti servono mai più di quattro paretine.","nl":"Meer dan vier schotjes heb je nooit nodig.","sv":"Du behöver aldrig fler än fyra väggar.","da":"Du får aldrig brug for mere end fire vægge.","no":"Du trenger aldri mer enn fire vegger.","fi":"Et koskaan tarvitse yli neljää väliseinää."},
    hintUnequal: {"en":"Lift a wall and put it up somewhere else, so the parts are equal.","de":"Nimm eine Wand weg und stell sie woanders auf, bis alle Teile gleich groß sind.","fr":"Enlève une cloison et pose-la ailleurs pour que les parts soient égales.","es":"Quita una pared y ponla en otro lugar para que las partes sean iguales.","pt":"Tire uma divisória e coloque em outro lugar para que as partes fiquem iguais.","it":"Togli una paretina e mettila da un’altra parte, così le parti diventano uguali.","nl":"Haal een schotje weg en zet het ergens anders neer, zodat de delen gelijk worden.","sv":"Ta bort en vägg och sätt upp den någon annanstans, så att delarna blir lika stora.","da":"Fjern en væg og sæt den op et andet sted, så delene bliver lige store.","no":"Ta bort en vegg og sett den opp et annet sted, så delene blir like store.","fi":"Poista yksi väliseinä ja rakenna se toiseen kohtaan, niin että osista tulee yhtä suuria."},
    hintCount: {"en":"There are {n} tubes. Make {n} parts.","de":"Es gibt {n} Röhrchen. Mach {n} Teile.","fr":"Il y a {n} tubes. Fais {n} parts.","es":"Hay {n} tubos. Haz {n} partes.","pt":"Há {n} tubos. Faça {n} partes.","it":"Ci sono {n} provette. Fai {n} parti.","nl":"Er zijn {n} buisjes. Maak {n} delen.","sv":"Det finns {n} rör. Gör {n} delar.","da":"Der er {n} rør. Lav {n} dele.","no":"Det er {n} rør. Lag {n} deler.","fi":"Putkia on {n}. Tee {n} osaa."},
    hintGhost: {"en":"Try the dotted walls.","de":"Probier die gepunkteten Wände.","fr":"Essaie les cloisons en pointillés.","es":"Prueba las paredes punteadas.","pt":"Experimente as divisórias pontilhadas.","it":"Prova le paretine tratteggiate.","nl":"Probeer de gestippelde schotjes.","sv":"Prova de prickade väggarna.","da":"Prøv de prikkede vægge.","no":"Prøv de prikkete veggene.","fi":"Kokeile pisteviivoilla merkittyjä väliseiniä."},
    hintColour: {"en":"Color {k} parts.","de":"Mal {k} Teile an.","fr":"Colorie {k} parts.","es":"Colorea {k} partes.","pt":"Pinte {k} partes.","it":"Colora {k} parti.","nl":"Kleur {k} delen.","sv":"Färglägg {k} delar.","da":"Farvelæg {k} dele.","no":"Fargelegg {k} deler.","fi":"Väritä {k} osaa."},
    hintColour1: {"en":"Color 1 part.","de":"Mal einen Teil an.","fr":"Colorie une part.","es":"Colorea una parte.","pt":"Pinte uma parte.","it":"Colora una parte.","nl":"Kleur één deel.","sv":"Färglägg en del.","da":"Farvelæg en del.","no":"Fargelegg én del.","fi":"Väritä yksi osa."},
    okHalves: {"en":"Two equal parts — halves! Each part is one half. Two halves make one whole.","de":"Zwei gleich große Teile – Hälften! Jeder Teil ist eine Hälfte. Zwei Hälften sind ein Ganzes.","fr":"Deux parts égales : des moitiés ! Chaque part est une moitié. Les deux moitiés forment la forme entière.","es":"¡Dos partes iguales: mitades! Cada parte es un medio. Dos medios forman un entero.","pt":"Duas partes iguais: metades! Cada parte é um meio. Duas metades formam a figura inteira.","it":"Due parti uguali: metà! Ogni parte è un mezzo. Due metà fanno l’intero.","nl":"Twee gelijke delen: helften! Elk deel is een helft. Twee helften vormen samen het geheel.","sv":"Två lika stora delar – halvor! Varje del är en halva. Två halvor blir en hel.","da":"To lige store dele – halvdele! Hver del er en halvdel. To halvdele er en hel.","no":"To like store deler – halvdeler! Hver del er en halvdel. To halvdeler blir en hel.","fi":"Kaksi yhtä suurta osaa – puolikkaat! Jokainen osa on puolikas. Kaksi puolikasta on yksi kokonainen."},
    okThirds: {"en":"Three equal parts — thirds! Each part is one third. Three thirds make one whole.","de":"Drei gleich große Teile – Drittel! Jeder Teil ist ein Drittel. Drei Drittel sind ein Ganzes.","fr":"Trois parts égales : des tiers ! Chaque part est un tiers. Les trois tiers forment la forme entière.","es":"¡Tres partes iguales: tercios! Cada parte es un tercio. Tres tercios forman un entero.","pt":"Três partes iguais: terços! Cada parte é um terço. Três terços formam a figura inteira.","it":"Tre parti uguali: terzi! Ogni parte è un terzo. Tre terzi fanno l’intero.","nl":"Drie gelijke delen: derde delen! Elk deel is een derde. Drie derde delen vormen samen het geheel.","sv":"Tre lika stora delar – tredjedelar! Varje del är en tredjedel. Tre tredjedelar blir en hel.","da":"Tre lige store dele – tredjedele! Hver del er en tredjedel. Tre tredjedele er en hel.","no":"Tre like store deler – tredeler! Hver del er en tredel. Tre tredeler blir en hel.","fi":"Kolme yhtä suurta osaa – kolmasosat! Jokainen osa on kolmasosa. Kolme kolmasosaa on yksi kokonainen."},
    okFourths: {"en":"Four equal parts — fourths! Each part is one fourth. Four fourths make one whole.","de":"Vier gleich große Teile – Viertel! Jeder Teil ist ein Viertel. Vier Viertel sind ein Ganzes.","fr":"Quatre parts égales : des quarts ! Chaque part est un quart. Les quatre quarts forment la forme entière.","es":"¡Cuatro partes iguales: cuartos! Cada parte es un cuarto. Cuatro cuartos forman un entero.","pt":"Quatro partes iguais: quartos! Cada parte é um quarto. Quatro quartos formam a figura inteira.","it":"Quattro parti uguali: quarti! Ogni parte è un quarto. Quattro quarti fanno l’intero.","nl":"Vier gelijke delen: kwarten! Elk deel is een kwart. Vier kwarten vormen samen het geheel.","sv":"Fyra lika stora delar – fjärdedelar! Varje del är en fjärdedel. Fyra fjärdedelar blir en hel.","da":"Fire lige store dele – fjerdedele! Hver del er en fjerdedel. Fire fjerdedele er en hel.","no":"Fire like store deler – firedeler! Hver del er en firedel. Fire firedeler blir en hel.","fi":"Neljä yhtä suurta osaa – neljäsosat! Jokainen osa on neljäsosa. Neljä neljäsosaa on yksi kokonainen."},
    okSurprise: {"en":"They don’t look the same, but each is one third.","de":"Sie sehen verschieden aus, aber jeder ist ein Drittel.","fr":"Elles n’ont pas la même forme, mais chacune est un tiers.","es":"No se ven iguales, pero cada una es un tercio.","pt":"Elas não parecem iguais, mas cada uma é um terço.","it":"Non sembrano uguali, ma ognuna è un terzo.","nl":"Ze zien er niet hetzelfde uit, maar elk is een derde.","sv":"De ser olika ut, men varje del är en tredjedel.","da":"De ser forskellige ud, men hver er en tredjedel.","no":"De ser ulike ut, men hver er en tredel.","fi":"Ne näyttävät erilaisilta, mutta jokainen on kolmasosa."},
    okColour: {"en":"Yes — {k} of {n} equal parts: {frac}.","de":"Ja – {k} von {n} gleich großen Teilen: {frac}.","fr":"Oui : {frac}, {k} sur {n} parts égales.","es":"¡Sí! {k} de {n} partes iguales: {frac}.","pt":"Isso! {k} de {n} partes iguais: {frac}.","it":"Sì! {k} su {n} parti uguali: {frac}.","nl":"Ja, {k} van de {n} gelijke delen: {frac}.","sv":"Ja – {k} av {n} lika stora delar: {frac}.","da":"Ja – {k} af {n} lige store dele: {frac}.","no":"Ja – {k} av {n} like store deler: {frac}.","fi":"Kyllä! Väritettyjä osia on {k}, ja kaikkia osia on {n} – se on {frac}."},
    aNotch: {"en":"Edge notch {i}","de":"Kerbe am Rand {i}","fr":"Encoche du bord {i}","es":"Muesca del borde {i}","pt":"Entalhe da borda {i}","it":"Tacca del bordo {i}","nl":"Inkeping in de rand {i}","sv":"Skåra i kanten {i}","da":"Hak i kanten {i}","no":"Hakk i kanten {i}","fi":"Reunan lovi {i}"},
    aPeg: {"en":"Rim peg {i}","de":"Stift am Rand {i}","fr":"Cheville du bord {i}","es":"Clavija del borde {i}","pt":"Pino da borda {i}","it":"Piolo del bordo {i}","nl":"Pinnetje op de rand {i}","sv":"Pinne på kanten {i}","da":"Pind på kanten {i}","no":"Pinne på kanten {i}","fi":"Reunan nasta {i}"},
    aPart: {"en":"Part {i} of {m}","de":"Teil {i} von {m}","fr":"Part {i} sur {m}","es":"Parte {i} de {m}","pt":"Parte {i} de {m}","it":"Parte {i} di {m}","nl":"Deel {i} van {m}","sv":"Del {i} av {m}","da":"Del {i} af {m}","no":"Del {i} av {m}","fi":"Osa {i}/{m}"},
    aRack: {"en":"The tubes","de":"Die Röhrchen","fr":"Les tubes","es":"Los tubos","pt":"Os tubos","it":"Le provette","nl":"De buisjes","sv":"Rören","da":"Rørene","no":"Rørene","fi":"Putket"},
    aTube: {"en":"Tube {i}: {s}","de":"Röhrchen {i}: {s}","fr":"Tube {i} : {s}","es":"Tubo {i}: {s}","pt":"Tubo {i}: {s}","it":"Provetta {i}: {s}","nl":"Buisje {i}: {s}","sv":"Rör {i}: {s}","da":"Rør {i}: {s}","no":"Rør {i}: {s}","fi":"Putki {i}: {s}"},
    sOver: {"en":"over the line","de":"über der Linie","fr":"au-dessus de la ligne","es":"por encima de la línea","pt":"acima da linha","it":"sopra la linea","nl":"boven de lijn","sv":"över linjen","da":"over stregen","no":"over streken","fi":"viivan yläpuolella"},
    sAt: {"en":"at the line","de":"genau an der Linie","fr":"pile sur la ligne","es":"justo en la línea","pt":"bem na linha","it":"proprio sulla linea","nl":"precies op de lijn","sv":"precis vid linjen","da":"lige ved stregen","no":"akkurat ved streken","fi":"täsmälleen viivalla"},
    sUnder: {"en":"under the line","de":"unter der Linie","fr":"sous la ligne","es":"por debajo de la línea","pt":"abaixo da linha","it":"sotto la linea","nl":"onder de lijn","sv":"under linjen","da":"under stregen","no":"under streken","fi":"viivan alapuolella"},
    sDry: {"en":"empty","de":"leer","fr":"vide","es":"vacío","pt":"vazio","it":"vuota","nl":"leeg","sv":"tomt","da":"tomt","no":"tomt","fi":"tyhjä"},
    aPuddle: {"en":"Puddle tray: rain from a part with no tube","de":"Pfützenschale: Regen von einem Teil ohne Röhrchen","fr":"Bac à flaque : la pluie d’une part sans tube","es":"Bandeja del charco: lluvia de una parte sin tubo","pt":"Bandeja da poça: chuva de uma parte sem tubo","it":"Vaschetta della pozzanghera: pioggia di una parte senza provetta","nl":"Plassenbak: regen van een deel zonder buisje","sv":"Pölbricka: regn från en del utan rör","da":"Pølbakke: regn fra en del uden rør","no":"Pyttbrett: regn fra en del uten rør","fi":"Lätäkköalusta: sade osasta, jolla ei ole putkea"}
  },/*STRINGS-END*/
  /* the fraction words per locale: plural nouns (task line) and the amounts (color step) */
  /*FRAC-BEGIN*/FRAC: {
    en: {"plural":{"2":"halves","3":"thirds","4":"fourths"},"amount":{"1/2":"one half","1/3":"one third","2/3":"two thirds","1/4":"one fourth","2/4":"two fourths","3/4":"three fourths"}},
    de: {"plural":{"2":"Hälften","3":"Drittel","4":"Viertel"},"amount":{"1/2":"eine Hälfte","1/3":"ein Drittel","2/3":"zwei Drittel","1/4":"ein Viertel","2/4":"zwei Viertel","3/4":"drei Viertel"}},
    fr: {"plural":{"2":"moitiés","3":"tiers","4":"quarts"},"amount":{"1/2":"une moitié","1/3":"un tiers","2/3":"deux tiers","1/4":"un quart","2/4":"deux quarts","3/4":"trois quarts"}},
    es: {"plural":{"2":"mitades","3":"tercios","4":"cuartos"},"amount":{"1/2":"un medio","1/3":"un tercio","2/3":"dos tercios","1/4":"un cuarto","2/4":"dos cuartos","3/4":"tres cuartos"}},
    pt: {"plural":{"2":"metades","3":"terços","4":"quartos"},"amount":{"1/2":"um meio","1/3":"um terço","2/3":"dois terços","1/4":"um quarto","2/4":"dois quartos","3/4":"três quartos"}},
    it: {"plural":{"2":"metà","3":"terzi","4":"quarti"},"amount":{"1/2":"un mezzo","1/3":"un terzo","2/3":"due terzi","1/4":"un quarto","2/4":"due quarti","3/4":"tre quarti"}},
    nl: {"plural":{"2":"helften","3":"derde delen","4":"kwarten"},"amount":{"1/2":"een half","1/3":"een derde","2/3":"twee derde","1/4":"een kwart","2/4":"twee kwart","3/4":"drie kwart"}},
    sv: {"plural":{"2":"halvor","3":"tredjedelar","4":"fjärdedelar"},"amount":{"1/2":"en halv","1/3":"en tredjedel","2/3":"två tredjedelar","1/4":"en fjärdedel","2/4":"två fjärdedelar","3/4":"tre fjärdedelar"}},
    da: {"plural":{"2":"halvdele","3":"tredjedele","4":"fjerdedele"},"amount":{"1/2":"en halv","1/3":"en tredjedel","2/3":"to tredjedele","1/4":"en fjerdedel","2/4":"to fjerdedele","3/4":"tre fjerdedele"}},
    no: {"plural":{"2":"halvdeler","3":"tredeler","4":"firedeler"},"amount":{"1/2":"en halv","1/3":"en tredel","2/3":"to tredeler","1/4":"en firedel","2/4":"to firedeler","3/4":"tre firedeler"}},
    fi: {"plural":{"2":"puolikkaat","3":"kolmasosat","4":"neljäsosat"},"amount":{"1/2":"yksi puolikas","1/3":"yksi kolmasosa","2/3":"kaksi kolmasosaa","1/4":"yksi neljäsosa","2/4":"kaksi neljäsosaa","3/4":"kolme neljäsosaa"}}
  },/*FRAC-END*/
  defaults: { parts: '3', colour: 'off' },
  settings: [
    { key: 'parts', type: 'choice', labelKey: 'setParts', options: [{ value: '2', labelKey: 'pHalves' }, { value: '3', labelKey: 'pThirds' }, { value: '4', labelKey: 'pFourths' }] },
    { key: 'colour', type: 'choice', labelKey: 'setColour', options: [{ value: 'off', labelKey: 'cOff' }, { value: 'on', labelKey: 'cOn' }] }
  ],
  OK_MS: 500, FAST: false, RAIN_MS: 1700, HIT: 24,
  TEAL: '#146B5E', CORAL: '#F2784B', INK: '#2B2B2B', SURF: '#CFE7E2', WOOD: '#B98A55', BRASS: '#C9A04A', GOLD: '#E2B23C', WATER: '#6BB6E0',

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {};
    injectRainTableCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.colourOn !== this._colourOn()) this._start(this.st.k, this._pass);
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _n: function () { return RainTableCore.partsOf(this._setting('parts')); },
  _colourOn: function () { return this._setting('colour') === 'on'; },
  _loc: function () { return RainTableCore.locOf(this.api && this.api.lang); },
  _key: function () { return String(this._n()); },
  _frac: function () { return this.FRAC[this._loc()] || this.FRAC.en; },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RainTableCore.rounds(this._n()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RainTableCore, pool = this._ensurePool(), n = C.passSize(this._n()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._n(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'rain-table.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k, pass); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st, n = st.n;
    if (st.step === 'colour') { var k = st.round.colour; return this._t(k === 1 ? 'qColour1' : 'qColour', { k: k, n: n }); }
    return this._t('qMake', { n: n, fp: this._frac().plural[n] });
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k, pass) {
    this._clearTimers();
    this.st = RainTableCore.newState(this._n(), k, this._colourOn());
    this._view = { note: '', soft: false, rain: false, hover: null, rainbow: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0, 0); this._render2(); this._watchWidth(); },
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
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rt-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="rt-main"><div class="rt-tablebox" data-qa="table"></div><p class="rt-note" data-qa="note" aria-live="polite"></p><div class="rt-side"><div class="rt-rackcol"><div class="rt-rack" data-qa="rack"></div><div class="rt-puddle" data-qa="puddle"></div></div><div class="rt-ctrl"></div></div></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  /* the table's view box: the shape's box plus room for the marks */
  _vb: function () { var b = RainTableCore.SHAPES[this.st.round.shape].box, m = 10; return [b[0] - m, b[1] - m, b[2] - b[0] + 2 * m, b[3] - b[1] + 2 * m]; },
  _geometry: function (W) {
    var wide = W >= 600, cramp = W < 300, vb = this._vb(), n = this.st.n;
    var T = wide ? Math.min(380, W - 230 - 20) : Math.min(W, cramp ? 250 : 320);
    /* solved, on a phone: the table steps back to two thirds (walls, rainbow and tubes still show) so the success line and Next fit */
    if (!wide && this.st.done) T = Math.round(T * (String(this._pa && this._pa.msg || '').length > 120 ? 0.5 : 0.64));
    var s = T / Math.max(vb[2], vb[3]);
    var tw = wide ? 40 : cramp ? 28 : 32, th = wide ? 190 : cramp ? 74 : 92, tgap = wide ? 16 : cramp ? 10 : 12;
    /* a phone: the rack shares its row with Check (its width estimated from its label: padding + icon + text, generously) and a 14 px
       gap; the tubes narrow until rack + pot fit beside it, so Check never wraps under the rack (es/nl/sv labels are long) */
    var pot = this.st.colourOn ? 26 : 0, text = (cramp ? 28 : 44) + String(this._t('checkBtn')).length * (cramp ? 10.5 : 11.5), chkW = text + 36, noIcon = false;
    /* when even the narrowest rack would not fit beside it, Check drops its cloud icon (text only) */
    if (!wide && W - chkW - 14 - pot < n * 22 + (n + 1) * 7) { noIcon = true; chkW = text; }
    if (!wide) { var room = W - chkW - 14 - pot; while (tw > 22 && n * tw + (n + 1) * tgap > room) { tw -= 2; if (tgap > 7) tgap -= 1; } }
    return { W: W, wide: wide, cramp: cramp, noIcon: noIcon, vb: vb, s: s, tw: Math.round(vb[2] * s), th0: Math.round(vb[3] * s), tube: { w: tw, h: th, gap: tgap, n: n } };
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._g = this._geometry(this._width());
    this._wrap.setAttribute('lang', this._loc());
    this._wrap.className = 'rt-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.step === 'colour' ? ' is-colour' : '') + (v.rain ? ' is-raining' : '');
    this._paintTable(); this._paintRack(); this._paintCtrl();
    var note = this._qs('.rt-note');
    note.textContent = v.note || ''; note.className = 'rt-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); },
  _pts: function (poly) { return poly.map(function (p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }).join(' '); },
  _f: function (x) { return (+x).toFixed(2); },

  /* ---- the table ---- */
  _paintTable: function () {
    var st = this.st, v = this._view, g = this._g, C = RainTableCore, self = this, box = this._qs('.rt-tablebox');
    var sh = C.SHAPES[st.round.shape], vb = g.vb, u = 1 / g.s; /* one screen px in units */
    var parts = C.partsNow(st), verd = st.verdict && !v.rain ? st.verdict : null, kinds = [];
    if (verd && verd.kind !== 'colour') verd.tubes.forEach(function (t) { if (t.part != null) kinds[t.part] = C.lineState(t.level); });
    if (verd) (verd.puddle || []).forEach(function (p) { kinds[p.part] = 'over'; });
    var o = '<svg class="rt-table" data-k="table" width="' + g.tw + '" height="' + g.th0 + '" viewBox="' + vb.join(' ') + '" role="group" aria-label="' + this._esc(this._t('title')) + '">';
    /* the rainbow (success) arcs behind the table */
    if (v.rainbow) o += this._rainbowSvg(sh.box, u);
    /* the tray rim and the surface (each part's cells in one fill, so only walls show seams) */
    o += '<polygon points="' + this._pts(sh.outline) + '" fill="#E9D3A8" stroke="#E9D3A8" stroke-width="' + this._f(7 * u) + '" stroke-linejoin="round"/>';
    var pulse = this._pulseParts();
    parts.forEach(function (p, i) {
      var col = st.coloured.indexOf(i) >= 0 ? self.CORAL : !verd || verd.kind === 'ok' || verd.kind === 'built' || verd.kind === 'colour' ? self.SURF : kinds[i] === 'over' ? '#F8C9B5' : kinds[i] === 'under' ? '#F6E3A6' : self.SURF;
      var colourStep = st.step === 'colour' && !st.done;
      o += '<g class="rt-part' + (pulse.indexOf(i) >= 0 ? ' is-pulse' : '') + '"' + (colourStep ? ' data-k="part-' + i + '" role="switch" tabindex="0" aria-checked="' + (st.coloured.indexOf(i) >= 0) + '" aria-label="' + self._esc(self._t('aPart', { i: i + 1, m: parts.length })) + '"' : '') + '>';
      p.cells.forEach(function (c) { o += '<polygon points="' + self._pts(c) + '" fill="' + col + '" stroke="' + col + '" stroke-width="' + self._f(0.8 * u) + '" stroke-linejoin="round"/>'; });
      o += '</g>';
    });
    o += '<polygon points="' + this._pts(sh.outline) + '" fill="none" stroke="' + this.INK + '" stroke-width="' + this._f(3 * u) + '" stroke-linejoin="round"/>';
    /* the ghost (miss 2): one right wall set, dotted */
    var ghost = st.help && st.step === 'build' && !st.done ? st.round.ghost : [];
    ghost.forEach(function (id) { var w = C.wallById(st, id); if (w && w.seg) o += '<line class="rt-ghost" x1="' + self._f(w.seg[0][0]) + '" y1="' + self._f(w.seg[0][1]) + '" x2="' + self._f(w.seg[1][0]) + '" y2="' + self._f(w.seg[1][1]) + '" stroke="' + self.TEAL + '" stroke-width="' + self._f(3 * u) + '" stroke-dasharray="' + self._f(5 * u) + ' ' + self._f(5 * u) + '" stroke-linecap="round"/>'; });
    /* the walls */
    C.wallObjs(st).forEach(function (w) {
      if (!w.seg) return;
      var L = 'x1="' + self._f(w.seg[0][0]) + '" y1="' + self._f(w.seg[0][1]) + '" x2="' + self._f(w.seg[1][0]) + '" y2="' + self._f(w.seg[1][1]) + '"';
      o += '<line class="rt-wall" ' + L + ' stroke="' + self.INK + '" stroke-width="' + self._f(7 * u) + '" stroke-linecap="round"/><line ' + L + ' stroke="' + self.WOOD + '" stroke-width="' + self._f(4 * u) + '" stroke-linecap="round"/>';
    });
    /* the centre pin */
    if (sh.pin && st.round.fams.indexOf('pegs') >= 0) o += '<circle cx="' + sh.pin[0] + '" cy="' + sh.pin[1] + '" r="' + this._f(5 * u) + '" fill="' + this.BRASS + '" stroke="' + this.INK + '" stroke-width="' + this._f(1.5 * u) + '"/>';
    /* the marks: notches (small brass ticks outside the edge) and pegs (brass studs on the rim) */
    var ghostSet = {}; ghost.forEach(function (id) { ghostSet[id] = 1; });
    var building = st.step === 'build' && !st.done;
    st.offered.forEach(function (w) {
      var up = st.walls.indexOf(w.id) >= 0, x = w.mark[0], y = w.mark[1], r = (w.kind === 'peg' ? 6 : 5) * u;
      o += '<g class="rt-mark' + (up ? ' is-up' : '') + (ghostSet[w.id] ? ' is-ghost' : '') + '" data-k="w-' + w.id + '"' + (building ? ' role="switch" tabindex="0" aria-checked="' + up + '" aria-label="' + self._esc(self._t(w.kind === 'peg' ? 'aPeg' : 'aNotch', { i: w.kind === 'peg' ? w.i + 1 : w.i })) + '"' : ' aria-hidden="true"') + '>';
      if (ghostSet[w.id]) o += '<circle cx="' + self._f(x) + '" cy="' + self._f(y) + '" r="' + self._f(r + 5 * u) + '" fill="none" stroke="' + self.TEAL + '" stroke-width="' + self._f(2.5 * u) + '" class="rt-glow"/>';
      if (w.kind === 'peg') o += '<circle cx="' + self._f(x) + '" cy="' + self._f(y) + '" r="' + self._f(r) + '" fill="' + (up ? self.WOOD : self.BRASS) + '" stroke="' + self.INK + '" stroke-width="' + self._f(1.5 * u) + '"/>';
      else {
        /* a tick pointing at the shape: a small triangle whose tip sits on the wall's line */
        var tip = [(w.seg[0][0] + w.seg[1][0]) / 2, (w.seg[0][1] + w.seg[1][1]) / 2], dx = tip[0] - x, dy = tip[1] - y, L = Math.hypot(dx, dy) || 1, nx = dx / L, ny = dy / L, px = -ny, py = nx, h = r * 1.3, b = r * 0.9;
        var P = [[x + nx * h, y + ny * h], [x - nx * h * 0.3 + px * b, y - ny * h * 0.3 + py * b], [x - nx * h * 0.3 - px * b, y - ny * h * 0.3 - py * b]];
        o += '<polygon points="' + self._pts(P) + '" fill="' + (up ? self.WOOD : self.BRASS) + '" stroke="' + self.INK + '" stroke-width="' + self._f(1.3 * u) + '" stroke-linejoin="round"/>';
      }
      o += '</g>';
    });
    /* the press-and-slide highlight */
    o += '<circle class="rt-hover" style="display:none" r="' + this._f(13 * u) + '" cx="50" cy="50" fill="rgba(20,107,94,.16)" stroke="' + this.TEAL + '" stroke-width="' + this._f(2 * u) + '"/>';
    /* the rain: a cloud drifting over and drops spaced evenly over the table */
    if (v.rain) o += this._rainSvg(vb, u);
    o += '</svg>';
    box.innerHTML = o;
    box.style.width = g.tw + 'px'; box.style.height = g.th0 + 'px';
    this._wireTable(box.firstChild);
  },
  _rainSvg: function (vb, u) {
    var o = '<g class="rt-rain" aria-hidden="true">', cx = vb[0] + vb[2] * 0.5, cy = vb[1] + 6 * u + 8;
    var step = Math.max(vb[2], vb[3]) / 9;
    for (var i = 0; i < 9; i++) for (var j = 0; j < 9; j++) {
      var x = vb[0] + step * (i + 0.5), y = vb[1] + step * (j + 0.5), d = ((i * 7 + j * 3) % 9) * 0.12;
      o += '<line class="rt-drop" style="animation-delay:' + d.toFixed(2) + 's" x1="' + this._f(x) + '" y1="' + this._f(y - 3) + '" x2="' + this._f(x) + '" y2="' + this._f(y + 1) + '" stroke="' + this.WATER + '" stroke-width="' + this._f(2.4 * u) + '" stroke-linecap="round"/>';
    }
    var c = '<g class="rt-cloud"><ellipse cx="' + this._f(cx) + '" cy="' + this._f(cy) + '" rx="14" ry="6" fill="#fff" stroke="#9FB7C6" stroke-width="' + this._f(1.5 * u) + '"/><circle cx="' + this._f(cx - 6) + '" cy="' + this._f(cy - 4) + '" r="6" fill="#fff"/><circle cx="' + this._f(cx + 4) + '" cy="' + this._f(cy - 6) + '" r="7" fill="#fff"/></g>';
    return o + c + '</g>';
  },
  _rainbowSvg: function (b, u) {
    var cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2, R = Math.max(b[2] - b[0], b[3] - b[1]) / 2 + 9, cols = ['#E8604C', '#F2A341', '#F3D34A', '#6CC17E', '#5AA9E6'], o = '<g class="rt-rainbow" aria-hidden="true" opacity=".8">';
    cols.forEach(function (c, i) { var r = R - i * 2.2; o += '<path d="M' + (cx - r).toFixed(2) + ' ' + cy.toFixed(2) + ' A' + r.toFixed(2) + ' ' + r.toFixed(2) + ' 0 0 1 ' + (cx + r).toFixed(2) + ' ' + cy.toFixed(2) + '" fill="none" stroke="' + c + '" stroke-width="2.3"/>'; });
    return o + '</g>';
  },
  /* the parts to pulse at the second color miss: as many as are still needed (or too many) */
  _pulseParts: function () {
    var st = this.st; if (!(st.step === 'colour' && st.help && !st.done)) return [];
    var m = RainTableCore.partsNow(st).length, k = st.round.colour, c = st.coloured, o = [];
    for (var i = 0; i < m && o.length < Math.abs(k - c.length); i++) if ((c.length < k) === (c.indexOf(i) < 0)) o.push(i);
    return o;
  },
  /* ---- the hand on the table: the nearest mark within reach wins; a press-and-slide shows which before release ---- */
  _wireTable: function (svg) {
    var self = this;
    var toUnits = function (e) { var m = svg.getScreenCTM(); if (!m) return null; var p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; var q = p.matrixTransform(m.inverse()); return [q.x, q.y]; };
    var nearest = function (q) {
      var st = self.st, best = null, bd = Infinity;
      st.offered.forEach(function (w) { var d = Math.hypot(w.mark[0] - q[0], w.mark[1] - q[1]) * self._g.s; if (d < bd) { bd = d; best = w; } });
      return bd <= self.HIT ? best : null;
    };
    var hover = function (w) { var h = svg.querySelector('.rt-hover'); if (!h) return; h.style.display = w ? '' : 'none'; if (w) { h.setAttribute('cx', w.mark[0]); h.setAttribute('cy', w.mark[1]); } };
    var down = false;
    svg.addEventListener('pointerdown', function (e) {
      if (self._view.rain || self.st.done) return;
      var q = toUnits(e); if (!q) return; down = true;
      if (self.st.step === 'build') { var w = nearest(q); self._hover = w; hover(w); }
      try { svg.setPointerCapture(e.pointerId); } catch (x) {}
    });
    svg.addEventListener('pointermove', function (e) { if (!down || self.st.step !== 'build') return; var q = toUnits(e); if (!q) return; var w = nearest(q); self._hover = w; hover(w); });
    svg.addEventListener('pointerup', function (e) {
      if (!down) return; down = false;
      var q = toUnits(e);
      if (self.st.step === 'build') { self._tapId = self._hover ? self._hover.id : ''; hover(null); }
      else self._tapPart = q ? self._partAt(q) : -1;
      self._hover = null;
    });
    svg.addEventListener('pointercancel', function () { down = false; self._hover = null; hover(null); });
    svg.addEventListener('click', function (e) {
      var st = self.st; if (self._view.rain || st.done) return;
      if (st.step === 'build') {
        var id = self._tapId; self._tapId = null;
        if (id == null) { var g = e.target && e.target.closest && e.target.closest('[data-k^="w-"]'); id = g ? g.getAttribute('data-k').slice(2) : ''; }
        if (id) self._toggle(id);
      } else {
        var i = self._tapPart; self._tapPart = null;
        if (i == null) { var pg = e.target && e.target.closest && e.target.closest('[data-k^="part-"]'); i = pg ? +pg.getAttribute('data-k').slice(5) : -1; }
        if (i >= 0) self._colour(i);
      }
    });
    svg.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') { if (self.st.step === 'colour' && /^Arrow/.test(e.key)) self._partKey(e); return; }
      var t = e.target && e.target.getAttribute && e.target.getAttribute('data-k'); if (!t) return;
      e.preventDefault();
      if (t.indexOf('w-') === 0) self._toggle(t.slice(2)); else if (t.indexOf('part-') === 0) self._colour(+t.slice(5));
    });
  },
  _partAt: function (q) {
    var parts = RainTableCore.partsNow(this.st);
    var inside = function (poly) { var c = false; for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) { var a = poly[i], b = poly[j]; if ((a[1] > q[1]) !== (b[1] > q[1]) && q[0] < (b[0] - a[0]) * (q[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
    for (var i = 0; i < parts.length; i++) if (parts[i].cells.some(inside)) return i;
    return -1;
  },
  _partKey: function (e) {
    var t = e.target && e.target.getAttribute && e.target.getAttribute('data-k'); if (!t || t.indexOf('part-') !== 0) return;
    var m = RainTableCore.partsNow(this.st).length, i = +t.slice(5), j = /Right|Down/.test(e.key) ? (i + 1) % m : (i + m - 1) % m;
    e.preventDefault(); var nx = this._qs('[data-k="part-' + j + '"]'); if (nx) nx.focus();
  },

  /* ---- the tube rack and the puddle tray ---- */
  _paintRack: function () {
    var st = this.st, v = this._view, g = this._g, T = g.tube, C = RainTableCore, self = this, rack = this._qs('.rt-rack'), pud = this._qs('.rt-puddle');
    var verd = st.verdict, parts = verd ? verd.parts : [], top = 16, W = T.n * T.w + (T.n + 1) * T.gap + (st.colourOn ? 26 : 0), H = T.h + top + 10;
    var gy = top + T.h * (1 - 1 / C.CAP);
    var o = '<svg class="rt-racksvg" width="' + W + '" height="' + H + '" aria-hidden="true">';
    o += '<rect x="2" y="' + (H - 9) + '" width="' + (W - 4 - (st.colourOn ? 26 : 0)) + '" height="7" rx="3" fill="' + this.WOOD + '" stroke="' + this.INK + '" stroke-width="1.5"/>';
    var labels = [];
    for (var i = 0; i < T.n; i++) {
      var x = T.gap + i * (T.w + T.gap), tube = verd ? verd.tubes[i] : null, lv = tube ? tube.level : 0, state = tube && tube.part != null ? C.lineState(lv) : 'dry';
      var coralW = verd && verd.coloured && tube && tube.part != null && verd.coloured.indexOf(tube.part) >= 0;
      var wh = T.h * Math.min(lv, C.CAP) / C.CAP;
      o += '<g class="rt-tube" data-qa="tube-' + i + '" data-state="' + (verd ? state : 'rest') + '">';
      o += '<rect x="' + x + '" y="' + top + '" width="' + T.w + '" height="' + T.h + '" rx="' + (T.w / 2.6).toFixed(1) + '" fill="rgba(255,255,255,.75)" stroke="#8FB2AC" stroke-width="2"/>';
      if (wh > 0) o += '<rect class="rt-water' + (v.rain ? ' is-filling' : '') + '" x="' + (x + 3) + '" y="' + (top + T.h - wh).toFixed(1) + '" width="' + (T.w - 6) + '" height="' + wh.toFixed(1) + '" rx="' + ((T.w - 6) / 2.8).toFixed(1) + '" fill="' + (coralW ? this.CORAL : this.WATER) + '"/>';
      o += '<line x1="' + (x - 3) + '" y1="' + gy.toFixed(1) + '" x2="' + (x + T.w + 3) + '" y2="' + gy.toFixed(1) + '" stroke="' + this.GOLD + '" stroke-width="3" stroke-linecap="round"/>';
      if (verd && !v.rain && verd.kind !== 'colour' && verd.kind !== 'ok' && verd.kind !== 'built') {
        if (state === 'over') { var lip = top + 2; o += '<path class="rt-spill" d="M' + (x + T.w - 2) + ' ' + lip + ' q8 6 4 ' + (T.h * 0.45).toFixed(0) + '" fill="none" stroke="' + this.CORAL + '" stroke-width="3" stroke-linecap="round"/><circle cx="' + (x + T.w + 3) + '" cy="' + (lip + T.h * 0.55).toFixed(0) + '" r="3" fill="' + this.CORAL + '"/>'; }
        if (state === 'under' || state === 'dry') o += '<rect class="rt-gap" x="' + (x + 3) + '" y="' + gy.toFixed(1) + '" width="' + (T.w - 6) + '" height="' + Math.max(0, top + T.h - wh - gy).toFixed(1) + '" fill="none" stroke="' + this.GOLD + '" stroke-width="2" stroke-dasharray="4 3"/>';
      }
      if (verd && !v.rain && state === 'at') o += '<path class="rt-at" d="M' + (x + T.w / 2 - 6) + ' ' + (gy - 9).toFixed(1) + ' l4 4 l8 -8" fill="none" stroke="' + this.TEAL + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
      o += '</g>';
      labels.push(this._t('aTube', { i: i + 1, s: this._t(!verd ? 'sDry' : state === 'over' ? 'sOver' : state === 'at' ? 'sAt' : state === 'under' ? 'sUnder' : 'sDry') }));
    }
    /* the color step's paint pot */
    if (st.colourOn) { var px = W - 24; o += '<g class="rt-pot" aria-hidden="true"><rect x="' + px + '" y="' + (H - 34) + '" width="20" height="22" rx="4" fill="' + this.CORAL + '" stroke="' + this.INK + '" stroke-width="1.5"/><path d="M' + (px + 2) + ' ' + (H - 34) + ' q8 -8 16 0" fill="none" stroke="' + this.INK + '" stroke-width="1.5"/></g>'; }
    o += '</svg>';
    rack.innerHTML = o;
    rack.setAttribute('role', 'group'); rack.setAttribute('aria-label', this._t('aRack') + ': ' + labels.join(' · '));
    /* the puddle tray: rain from the parts with no tube */
    var pd = verd && !v.rain ? (verd.puddle || []) : [], amt = pd.reduce(function (s, p) { return s + p.level; }, 0), PW = Math.max(96, W - 8);
    pud.setAttribute('role', 'group'); pud.setAttribute('aria-label', this._t('aPuddle'));
    pud.innerHTML = '<svg class="rt-puddlesvg" width="' + PW + '" height="16" aria-hidden="true"><rect x="1" y="3" width="' + (PW - 2) + '" height="11" rx="5" fill="#EFE6D2" stroke="#C9B48A" stroke-width="1.5"/>' + (amt > 0 ? '<ellipse class="rt-pool" cx="' + (PW / 2) + '" cy="8.5" rx="' + Math.min(PW / 2 - 4, 10 + amt * PW * 0.22).toFixed(1) + '" ry="3.5" fill="' + this.WATER + '"/>' : '') + '</svg>';
  },
  _paintCtrl: function () {
    var st = this.st, el = this._qs('.rt-ctrl'), self = this;
    el.innerHTML = '';
    var go = document.createElement('button'); go.type = 'button'; go.className = 'rt-go'; go.setAttribute('data-k', 'check');
    go.innerHTML = (this._g.noIcon ? '' : '<svg viewBox="0 0 28 24" aria-hidden="true"><ellipse cx="14" cy="9" rx="10" ry="5" fill="#fff"/><circle cx="9" cy="7" r="4" fill="#fff"/><circle cx="16" cy="5" r="5" fill="#fff"/><path d="M8 16 l-2 5 M14 16 l-2 5 M20 16 l-2 5" stroke="#BFE3F5" stroke-width="2.4" stroke-linecap="round"/></svg>') + '<span>' + this._esc(this._t('checkBtn')) + '</span>';
    go.disabled = st.done || !!this._view.rain; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _toggle: function (id) {
    var st = this.st, v = this._view, C = RainTableCore; if (v.rain || st.done) return;
    var r = C.toggle(st, id);
    if (!r.ok) { if (r.key) { v.note = this._t(r.key); v.soft = true; this.api.sound(260); this._paint(); this._wobble(); this.api.announce(v.note); } return; }
    v.note = ''; v.rainbow = false;
    this.api.sound(r.up ? 520 : 380);
    this._paint();
  },
  _wobble: function () { var ws = this._wrap.querySelectorAll('.rt-wall'), w = ws[ws.length - 1]; if (w) { w.classList.remove('is-wob'); void w.getBoundingClientRect(); w.classList.add('is-wob'); } },
  _colour: function (i) {
    var st = this.st, v = this._view; if (v.rain || st.done) return;
    if (!RainTableCore.colour(st, i)) return;
    v.note = ''; this.api.sound(st.coloured.indexOf(i) >= 0 ? 660 : 440);
    this._paint();
  },

  /* ---------------- Check = rain ---------------- */
  _check: function () {
    var st = this.st, v = this._view, C = RainTableCore, self = this; if (st.done || v.rain) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    v.note = '';
    var after = function () {
      v.rain = false;
      if (res.result === 'ok') { self._success(); return; }
      if (res.result === 'built') { v.note = self._okLine(); v.soft = true; v.rainbow = true; self._chord(); self._paint(); self.api.announce(v.note + ' ' + self._taskLine()); return; }
      var key = C.hint(st, res), k = st.round.colour;
      v.soft = false; v.note = self._t(key === 'hintColour' && k === 1 ? 'hintColour1' : key, { n: st.n, k: k });
      self.api.sound(240); self._paint(); self.api.announce(v.note);
    };
    if (this.FAST) { after(); return; }
    v.rain = true; this._paint();
    for (var i = 0; i < 6; i++) this._later((function (j) { return function () { self.api.sound(900 + 60 * (j % 3)); }; })(i), 150 + i * 190);
    this._later(after, this.RAIN_MS);
  },
  _chord: function () { var self = this; [523, 659, 784].forEach(function (f, i) { self._later(function () { self.api.sound(f); }, i * 150); }); },
  _okLine: function () {
    var st = this.st, n = st.n;
    var line = this._t(n === 2 ? 'okHalves' : n === 3 ? 'okThirds' : 'okFourths');
    return st.round.surprise ? line + ' ' + this._t('okSurprise') : line;
  },
  _success: function () {
    var st = this.st, v = this._view, k = st.round.colour, msg = st.step === 'colour' ? this._t('okColour', { k: k, n: st.n, frac: this._frac().amount[k + '/' + st.n] }) : this._okLine();
    v.note = ''; v.rainbow = true;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this._chord();
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectRainTableCSS() {
  if (typeof document === 'undefined' || document.getElementById('rt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rt-wrap{position:relative;width:100%;max-width:900px;margin:0 auto;user-select:none;-webkit-user-select:none;} .rt-wrap:focus{outline:none;}'
  + '.rt-main{display:grid;justify-content:center;align-items:center;gap:10px 18px;grid-template-areas:"table side" "note note";} .rt-wrap.is-narrow .rt-main{grid-template-areas:"table" "note" "side";gap:8px;}'
  + '.rt-tablebox{grid-area:table;justify-self:center;touch-action:none;} .rt-table{display:block;overflow:visible;cursor:pointer;touch-action:none;}'
  + '.rt-side{grid-area:side;display:flex;flex-direction:column;align-items:center;gap:12px;} .rt-wrap.is-narrow .rt-side{flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px 14px;}'
  + '.rt-rackcol{display:flex;flex-direction:column;align-items:center;gap:4px;} .rt-rack,.rt-puddle{display:flex;justify-content:center;} .rt-racksvg,.rt-puddlesvg{display:block;overflow:visible;}'
  + '.rt-mark{cursor:pointer;} .rt-mark:focus{outline:none;} .rt-mark:focus-visible circle,.rt-mark:focus-visible polygon{stroke:#146B5E;stroke-width:1.6;} .rt-part:focus{outline:none;} .rt-part:focus-visible polygon{stroke:#146B5E !important;}'
  + '.rt-glow{animation:rtGlow 1.2s ease-in-out infinite;} @keyframes rtGlow{50%{opacity:.35}}'
  + '.rt-part.is-pulse polygon{animation:rtGlow 1s ease-in-out infinite;}'
  + '.rt-wall.is-wob{animation:rtWob .5s ease 1;transform-box:fill-box;transform-origin:center;} @keyframes rtWob{25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}}'
  + '.rt-drop{animation:rtDrop .55s linear infinite;opacity:0;} @keyframes rtDrop{0%{transform:translateY(-14px);opacity:0}20%{opacity:.9}100%{transform:translateY(6px);opacity:0}}'
  + '.rt-cloud{animation:rtCloud 1.6s ease-in-out 1 both;} @keyframes rtCloud{0%{transform:translateX(-30px)}100%{transform:translateX(30px)}}'
  + '.rt-water.is-filling{transform-box:fill-box;transform-origin:50% 100%;animation:rtFill 1.4s ease-out 1 both;} @keyframes rtFill{from{transform:scaleY(0)}to{transform:scaleY(1)}}'
  + '.rt-note{grid-area:note;margin:0;min-height:1.3em;max-width:600px;justify-self:center;font-family:' + B + ';font-weight:700;font-size:17px;color:#146B5E;text-align:center;} .rt-note.is-hint{color:#A3401F;} .rt-note:empty{display:none;} .rt-wrap.is-narrow .rt-note{font-size:15px;line-height:1.25;} .rt-wrap.is-cramp .rt-note{font-size:14px;}'
  + '.rt-wrap.is-done .rt-ctrl{display:none;} .rt-wrap.is-narrow.is-done .rt-puddle{display:none;} .rt-ctrl{display:flex;justify-content:center;} .rt-go{display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font:800 20px ' + H + ';box-shadow:0 4px 0 #0E4C43;cursor:pointer;} .rt-go svg{width:28px;height:24px;} .rt-go:disabled{opacity:.45;cursor:default;} .rt-go:focus-visible{outline:3px solid #F2784B;outline-offset:3px;}'
  + '.rt-wrap.is-cramp .rt-go{padding:0 14px;font-size:18px;} .rt-wrap.is-cramp .rt-main{gap:6px;}'
  + '@media (prefers-reduced-motion:reduce){.rt-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'rt-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.RainTableActivity = RainTableActivity;
