/* =====================================================================
   group-photo-activity.js — ACTIVITY #131 of the one-by-one rebuild:
   "Ziggy's Odd One Out" → THE GROUP PHOTO (L.1.5.a; all 11 locales).
   Model: group-photo-core.js (GroupPhotoCore).
   Design: docs/activities-rebuild/designs/131-ziggy-odd-one-out.md
   ---------------------------------------------------------------------
   The invention: a camera that only takes a SHARP group photo when
   everyone on the bench is one kind of thing. The child sends the one
   that doesn't belong to the step beside the bench and presses the red
   shutter: a flash, and the photo develops sharp with the group's name
   under it — or cloudy, with no name, because the camera sorts by KIND,
   not by look (the banana beside the bee, the bat among the birds, the
   glass among the plastic bottles). Level 5 is the seat plan: clue cards,
   X and ✓ stones, and a ✓ that pushes an X along its row and column.
   No timer, no score.
   Test seams: window.GroupPhotoActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._seat / ._snap /
   ._tag / ._cell / ._tf / .FAST / .OK_MS.
   ===================================================================== */
var GroupPhotoActivity = {
  id: 'group-photo',
  /* the drawn apparatus (the hierarchy gate): the camera, the viewfinder and its bench, the step, the photo, the seat plan */
  apparatusClasses: ['gp-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Odd One Out: The Group Photo",de:"Was passt nicht? Das Gruppenfoto",fr:"L’intrus de la photo de groupe",es:"¿Cuál no pertenece? La foto de grupo",pt:"Quem não combina? A foto do grupo",it:"L’intruso della foto di gruppo",nl:"Welke hoort er niet bij? De groepsfoto",sv:"Vilken passar inte? Gruppfotot",da:"Hvem passer ikke ind? Gruppebilledet",no:"Hvem passer ikke inn? Gruppebildet",fi:"Kuka ei kuulu joukkoon? Ryhmäkuva"},
    instruction: {en:"Put the odd one out on the step. Then take the photo.",de:"Schick das, was nicht dazugehört, auf das Podest. Dann mach das Foto.",fr:"Envoie l’intrus sur la marche. Puis prends la photo.",es:"Manda al escalón al que no pertenece. Luego toma la foto.",pt:"Mande quem não combina para o degrau. Depois tire a foto.",it:"Manda l’intruso sul gradino. Poi scatta la foto.",nl:"Stuur wat er niet bij hoort naar het opstapje. Maak dan de foto.",sv:"Skicka den som inte passar in upp på pallen. Ta sedan fotot.",da:"Send den, der ikke passer ind, hen på trinnet. Tag så billedet.",no:"Send den som ikke passer inn, til trappetrinnet. Ta så bildet.",fi:"Lähetä joukkoon kuulumaton korokkeelle. Ota sitten kuva."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Who doesn't belong in the group photo?",de:"Wer passt nicht aufs Gruppenfoto?",fr:"Qui n’a pas sa place sur la photo de groupe ?",es:"¿Quién no pertenece a la foto de grupo?",pt:"Quem não combina com a foto do grupo?",it:"Chi non c’entra nella foto di gruppo?",nl:"Wie hoort er niet bij op de groepsfoto?",sv:"Vem passar inte in på gruppfotot?",da:"Hvem passer ikke ind på gruppebilledet?",no:"Hvem passer ikke inn på gruppebildet?",fi:"Kuka ei kuulu ryhmäkuvaan?"},
    t2: {en:"Look closely: who is not the same kind?",de:"Schau genau: Was ist nicht von derselben Sorte?",fr:"Regarde bien : qui n’est pas de la même sorte ?",es:"Mira bien: ¿quién no es del mismo tipo?",pt:"Olhe bem: quem não é do mesmo tipo?",it:"Guarda bene: chi non è dello stesso tipo?",nl:"Kijk goed: wie is niet van dezelfde soort?",sv:"Titta noga: vem är inte av samma slag?",da:"Se godt efter: hvem er ikke af samme slags?",no:"Se godt etter: hvem er ikke av samme slag?",fi:"Katso tarkasti: kuka ei ole samaa lajia?"},
    t3: {en:"Which one is made of something else?",de:"Was ist aus einem anderen Material?",fr:"Lequel est fait d’une autre matière ?",es:"¿Cuál está hecho de otro material?",pt:"Qual é feito de outro material?",it:"Quale è fatto di un altro materiale?",nl:"Welke is van iets anders gemaakt?",sv:"Vilken är gjord av något annat?",da:"Hvilken er lavet af noget andet?",no:"Hvilken er laget av noe annet?",fi:"Mikä on tehty jostain muusta?"},
    t4: {en:"Which word doesn't belong with the others?",de:"Welches Wort passt nicht zu den anderen?",fr:"Quel mot ne va pas avec les autres ?",es:"¿Qué palabra no va con las demás?",pt:"Que palavra não combina com as outras?",it:"Quale parola non va con le altre?",nl:"Welk woord hoort niet bij de andere?",sv:"Vilket ord passar inte ihop med de andra?",da:"Hvilket ord passer ikke sammen med de andre?",no:"Hvilket ord passer ikke sammen med de andre?",fi:"Mikä sana ei sovi muiden joukkoon?"},
    t5: {en:"Read the clues. Give every friend one thing.",de:"Lies die Hinweise. Gib jedem Freund eine Sache.",fr:"Lis les indices. Donne une chose à chaque ami.",es:"Lee las pistas. Dale una cosa a cada amigo.",pt:"Leia as pistas. Dê uma coisa para cada amigo.",it:"Leggi gli indizi. Dai una cosa a ogni amico.",nl:"Lees de aanwijzingen. Geef elke vriend één ding.",sv:"Läs ledtrådarna. Ge varje kompis en sak.",da:"Læs sporene. Giv hver ven én ting.",no:"Les hintene. Gi hver venn én ting.",fi:"Lue vihjeet. Anna jokaiselle ystävälle yksi asia."},
    setLevel: {en:"What to do",de:"Was du tust",fr:"Que faire",es:"Qué hacer",pt:"O que fazer",it:"Che cosa fare",nl:"Wat je doet",sv:"Vad du gör",da:"Hvad du gør",no:"Hva du gjør",fi:"Mitä teet"},
    l1: {en:"Odd one out",de:"Was passt nicht?",fr:"Trouver l’intrus",es:"El que no pertenece",pt:"Quem não combina",it:"Trova l’intruso",nl:"Welke hoort er niet bij?",sv:"Vilken passar inte?",da:"Hvem passer ikke ind?",no:"Hvem passer ikke inn?",fi:"Kuka ei kuulu joukkoon?"},
    l2: {en:"Trickier groups",de:"Knifflige Gruppen",fr:"Groupes plus difficiles",es:"Grupos más difíciles",pt:"Grupos mais difíceis",it:"Gruppi più difficili",nl:"Lastigere groepen",sv:"Klurigare grupper",da:"Sværere grupper",no:"Vanskeligere grupper",fi:"Vaikeammat ryhmät"},
    l3: {en:"What is it made of?",de:"Woraus ist es?",fr:"C’est fait en quoi ?",es:"¿De qué está hecho?",pt:"Do que é feito?",it:"Di che cosa è fatto?",nl:"Waar is het van gemaakt?",sv:"Vad är det gjort av?",da:"Hvad er det lavet af?",no:"Hva er det laget av?",fi:"Mistä se on tehty?"},
    l4: {en:"Word groups",de:"Wortfelder",fr:"Familles de mots",es:"Grupos de palabras",pt:"Grupos de palavras",it:"Gruppi di parole",nl:"Woordgroepen",sv:"Ordgrupper",da:"Ordgrupper",no:"Ordgrupper",fi:"Sanaryhmät"},
    l5: {en:"Seat plan",de:"Sitzplan",fr:"Plan de table",es:"Plano de asientos",pt:"Mapa dos lugares",it:"Piano dei posti",nl:"Zitplan",sv:"Placeringskarta",da:"Bordplan",no:"Bordkart",fi:"Istumajärjestys"},
    setCap: {en:"The group's name",de:"Der Name der Gruppe",fr:"Le nom du groupe",es:"El nombre del grupo",pt:"O nome do grupo",it:"Il nome del gruppo",nl:"De naam van de groep",sv:"Gruppens namn",da:"Gruppens navn",no:"Gruppens navn",fi:"Ryhmän nimi"},
    capShow: {en:"The camera writes it",de:"Die Kamera schreibt ihn",fr:"L’appareil l’écrit",es:"La cámara lo escribe",pt:"A câmera escreve",it:"Lo scrive la macchina fotografica",nl:"De camera schrijft hem",sv:"Kameran skriver det",da:"Kameraet skriver det",no:"Kameraet skriver det",fi:"Kamera kirjoittaa sen"},
    capName: {en:"I name it",de:"Ich wähle ihn",fr:"Je le trouve",es:"Yo lo pongo",pt:"Eu escolho",it:"Lo scelgo io",nl:"Ik geef de naam",sv:"Jag väljer namnet",da:"Jeg vælger navnet",no:"Jeg gir navnet",fi:"Minä nimeän"},
    shutter: {en:"Take the photo",de:"Foto machen",fr:"Prendre la photo",es:"Tomar la foto",pt:"Tirar a foto",it:"Scatta la foto",nl:"Foto maken",sv:"Ta fotot",da:"Tag billedet",no:"Ta bildet",fi:"Ota kuva"},
    hintStep: {en:"Put the odd one out on the step first.",de:"Schick zuerst das, was nicht dazugehört, auf das Podest.",fr:"Envoie d’abord l’intrus sur la marche.",es:"Primero manda al escalón al que no pertenece.",pt:"Primeiro mande quem não combina para o degrau.",it:"Prima manda l’intruso sul gradino.",nl:"Stuur eerst wat er niet bij hoort naar het opstapje.",sv:"Skicka först den som inte passar in upp på pallen.",da:"Send først den, der ikke passer ind, hen på trinnet.",no:"Send først den som ikke passer inn, til trappetrinnet.",fi:"Lähetä ensin joukkoon kuulumaton korokkeelle."},
    miss1: {en:"The photo is cloudy: the camera can't find one name for this group. Who doesn't belong?",de:"Das Foto ist verschwommen: Die Kamera findet keinen Namen für diese Gruppe. Wer passt nicht dazu?",fr:"La photo est floue : l’appareil ne trouve pas un seul nom pour ce groupe. Qui n’a pas sa place ?",es:"La foto salió borrosa: la cámara no encuentra un solo nombre para este grupo. ¿Quién no pertenece?",pt:"A foto saiu borrada: a câmera não acha um nome só para este grupo. Quem não combina?",it:"La foto è sfocata: la macchina non trova un nome solo per questo gruppo. Chi non c’entra?",nl:"De foto is wazig: de camera vindt geen naam voor deze groep. Wie hoort er niet bij?",sv:"Fotot blev suddigt: kameran hittar inget namn för den här gruppen. Vem passar inte in?",da:"Billedet er sløret: kameraet kan ikke finde ét navn til gruppen. Hvem passer ikke ind?",no:"Bildet er uskarpt: kameraet finner ikke ett navn på gruppen. Hvem passer ikke inn?",fi:"Kuva on sumea: kamera ei löydä ryhmälle yhtä nimeä. Kuka ei kuulu joukkoon?"},
    miss2: {en:"The sharp ones share one name. Who is still blurry?",de:"Die scharfen Bilder haben einen gemeinsamen Namen. Wer ist noch verschwommen?",fr:"Ceux qui sont nets ont le même nom. Qui est encore flou ?",es:"Los que salen nítidos tienen el mismo nombre. ¿Quién sigue borroso?",pt:"Os que saíram nítidos têm o mesmo nome. Quem continua borrado?",it:"Quelli nitidi hanno lo stesso nome. Chi è ancora sfocato?",nl:"De scherpe plaatjes horen bij één naam. Wie is nog wazig?",sv:"De skarpa har samma namn. Vem är fortfarande suddig?",da:"De skarpe har samme navn. Hvem er stadig sløret?",no:"De skarpe har samme navn. Hvem er fortsatt uskarp?",fi:"Tarkoilla kuvilla on sama nimi. Kuka on vielä sumea?"},
    nameAsk: {en:"Sharp! Now give the group its name.",de:"Scharf! Jetzt gib der Gruppe ihren Namen.",fr:"C’est net ! Maintenant, donne un nom au groupe.",es:"¡Nítida! Ahora ponle nombre al grupo.",pt:"Nítida! Agora dê um nome ao grupo.",it:"È nitida! Ora dai un nome al gruppo.",nl:"Scherp! Geef de groep nu een naam.",sv:"Skarpt! Ge nu gruppen ett namn.",da:"Skarpt! Giv nu gruppen et navn.",no:"Skarpt! Gi nå gruppen et navn.",fi:"Tarkka! Anna nyt ryhmälle nimi."},
    nameWrong: {en:"That name doesn't fit all of them. Try another one.",de:"Dieser Name passt nicht zu allen. Probier einen anderen.",fr:"Ce nom ne va pas à tous. Essaie un autre nom.",es:"Ese nombre no les queda a todos. Prueba otro.",pt:"Esse nome não serve para todos. Tente outro.",it:"Questo nome non va bene per tutti. Provane un altro.",nl:"Die naam past niet bij allemaal. Probeer een andere.",sv:"Det namnet passar inte alla. Prova ett annat.",da:"Det navn passer ikke til dem alle. Prøv et andet.",no:"Det navnet passer ikke til alle. Prøv et annet.",fi:"Se nimi ei sovi kaikille. Kokeile toista."},
    hintGrid: {en:"Every friend needs one thing: a tick in every row.",de:"Jeder Freund braucht eine Sache: einen Haken in jeder Reihe.",fr:"Chaque ami a besoin d’une chose : une coche dans chaque rangée.",es:"Cada amigo necesita una cosa: una palomita en cada fila.",pt:"Cada amigo precisa de uma coisa: um certo em cada linha.",it:"Ogni amico ha bisogno di una cosa: una spunta in ogni riga.",nl:"Elke vriend heeft één ding nodig: een vinkje in elke rij.",sv:"Varje kompis behöver en sak: en bock i varje rad.",da:"Hver ven skal have én ting: et flueben i hver række.",no:"Hver venn trenger én ting: en hake i hver rad.",fi:"Jokainen ystävä tarvitsee yhden asian: väkänen jokaiselle riville."},
    gridMiss1: {en:"A tick breaks a clue. Look at the shaking cell and the clue that lights up.",de:"Ein Haken passt nicht zu einem Hinweis. Schau auf das wackelnde Feld und den leuchtenden Hinweis.",fr:"Une coche ne respecte pas un indice. Regarde la case qui tremble et l’indice qui s’allume.",es:"Una palomita no cumple una pista. Mira la casilla que tiembla y la pista que se ilumina.",pt:"Um certo não combina com uma pista. Olhe a casinha que treme e a pista que acende.",it:"Una spunta non rispetta un indizio. Guarda la casella che trema e l’indizio che si accende.",nl:"Een vinkje klopt niet met een aanwijzing. Kijk naar het vakje dat trilt en de aanwijzing die oplicht.",sv:"En bock stämmer inte med en ledtråd. Titta på rutan som skakar och ledtråden som lyser.",da:"Et flueben passer ikke med et spor. Se på feltet, der ryster, og sporet, der lyser.",no:"En hake stemmer ikke med et hint. Se på ruten som rister, og hintet som lyser.",fi:"Väkänen ei sovi vihjeeseen. Katso ruutua, joka tärisee, ja vihjettä, joka syttyy."},
    gridMiss2: {en:"Look at the glowing cell: the clues leave only that place.",de:"Schau auf das leuchtende Feld: Die Hinweise lassen nur diesen Platz übrig.",fr:"Regarde la case qui brille : les indices ne laissent que cette place.",es:"Mira la casilla que brilla: las pistas solo dejan ese lugar.",pt:"Olhe a casinha que brilha: as pistas só deixam esse lugar.",it:"Guarda la casella che brilla: gli indizi lasciano solo quel posto.",nl:"Kijk naar het vakje dat gloeit: de aanwijzingen laten alleen die plek over.",sv:"Titta på rutan som lyser: ledtrådarna lämnar bara den platsen.",da:"Se på feltet, der lyser: sporene lader kun den plads tilbage.",no:"Se på ruten som lyser: hintene lar bare den plassen stå igjen.",fi:"Katso hehkuvaa ruutua: vihjeet jättävät vain sen paikan."},
    tfAsk: {en:"Now read the two sentences: true or false?",de:"Lies jetzt die zwei Sätze: Stimmt das oder nicht?",fr:"Lis maintenant les deux phrases : vrai ou faux ?",es:"Ahora lee las dos oraciones: ¿verdadero o falso?",pt:"Agora leia as duas frases: verdadeiro ou falso?",it:"Ora leggi le due frasi: vero o falso?",nl:"Lees nu de twee zinnen: waar of niet waar?",sv:"Läs nu de två meningarna: sant eller falskt?",da:"Læs nu de to sætninger: sandt eller falsk?",no:"Les nå de to setningene: sant eller usant?",fi:"Lue nyt kaksi lausetta: totta vai ei?"},
    tfWrong: {en:"Look at the seat plan again: the blinking cell tells you.",de:"Schau noch einmal auf den Sitzplan: Das blinkende Feld verrät es dir.",fr:"Regarde encore le plan : la case qui clignote te le dit.",es:"Mira otra vez el plano: la casilla que parpadea te lo dice.",pt:"Olhe de novo o mapa: a casinha que pisca mostra a resposta.",it:"Guarda di nuovo il piano: te lo dice la casella che lampeggia.",nl:"Kijk nog eens naar het zitplan: het knipperende vakje vertelt het je.",sv:"Titta på kartan igen: rutan som blinkar visar det.",da:"Se på bordplanen igen: feltet, der blinker, viser det.",no:"Se på bordkartet igjen: ruten som blinker, viser det.",fi:"Katso istumajärjestystä uudelleen: vilkkuva ruutu kertoo sen."},
    aTrue: {en:"True",de:"Stimmt",fr:"Vrai",es:"Verdadero",pt:"Verdadeiro",it:"Vero",nl:"Waar",sv:"Sant",da:"Sandt",no:"Sant",fi:"Totta"},
    aFalse: {en:"False",de:"Stimmt nicht",fr:"Faux",es:"Falso",pt:"Falso",it:"Falso",nl:"Niet waar",sv:"Falskt",da:"Falsk",no:"Usant",fi:"Ei totta"},
    aSeat: {en:"Seat {n}: {t}",de:"Platz {n}: {t}",fr:"Place {n} : {t}",es:"Lugar {n}: {t}",pt:"Lugar {n}: {t}",it:"Posto {n}: {t}",nl:"Plek {n}: {t}",sv:"Plats {n}: {t}",da:"Plads {n}: {t}",no:"Plass {n}: {t}",fi:"Paikka {n}: {t}"},
    aStep: {en:"On the step: {t}",de:"Auf dem Podest: {t}",fr:"Sur la marche : {t}",es:"En el escalón: {t}",pt:"No degrau: {t}",it:"Sul gradino: {t}",nl:"Op het opstapje: {t}",sv:"På pallen: {t}",da:"På trinnet: {t}",no:"På trappetrinnet: {t}",fi:"Korokkeella: {t}"},
    aPhotoSharp: {en:"Sharp photo: {t}",de:"Scharfes Foto: {t}",fr:"Photo nette : {t}",es:"Foto nítida: {t}",pt:"Foto nítida: {t}",it:"Foto nitida: {t}",nl:"Scherpe foto: {t}",sv:"Skarpt foto: {t}",da:"Skarpt billede: {t}",no:"Skarpt bilde: {t}",fi:"Tarkka kuva: {t}"},
    aPhotoCloud: {en:"Cloudy photo",de:"Verschwommenes Foto",fr:"Photo floue",es:"Foto borrosa",pt:"Foto borrada",it:"Foto sfocata",nl:"Wazige foto",sv:"Suddigt foto",da:"Sløret billede",no:"Uskarpt bilde",fi:"Sumea kuva"},
    aCell: {en:"{f} and {t}: {s}",de:"{f} und {t}: {s}",fr:"{f} et {t} : {s}",es:"{f} y {t}: {s}",pt:"{f} e {t}: {s}",it:"{f} e {t}: {s}",nl:"{f} en {t}: {s}",sv:"{f} och {t}: {s}",da:"{f} og {t}: {s}",no:"{f} og {t}: {s}",fi:"{f} ja {t}: {s}"},
    sX: {en:"a cross",de:"ein Kreuz",fr:"une croix",es:"una cruz",pt:"um X",it:"una croce",nl:"een kruisje",sv:"ett kryss",da:"et kryds",no:"et kryss",fi:"risti"},
    sV: {en:"a tick",de:"ein Haken",fr:"une coche",es:"una palomita",pt:"um certo",it:"una spunta",nl:"een vinkje",sv:"en bock",da:"et flueben",no:"en hake",fi:"väkänen"},
    sE: {en:"empty",de:"leer",fr:"vide",es:"vacía",pt:"vazia",it:"vuota",nl:"leeg",sv:"tom",da:"tom",no:"tom",fi:"tyhjä"},
    aTag: {en:"Name: {t}",de:"Name: {t}",fr:"Nom : {t}",es:"Nombre: {t}",pt:"Nome: {t}",it:"Nome: {t}",nl:"Naam: {t}",sv:"Namn: {t}",da:"Navn: {t}",no:"Navn: {t}",fi:"Nimi: {t}"},
    aWall: {en:"Photo on the wall: {t}",de:"Foto an der Wand: {t}",fr:"Photo au mur : {t}",es:"Foto en la pared: {t}",pt:"Foto na parede: {t}",it:"Foto sulla parete: {t}",nl:"Foto aan de muur: {t}",sv:"Foto på väggen: {t}",da:"Billede på væggen: {t}",no:"Bilde på veggen: {t}",fi:"Kuva seinällä: {t}"},
    wallPlan: {en:"seat plan",de:"Sitzplan",fr:"plan de table",es:"plano de asientos",pt:"mapa dos lugares",it:"piano dei posti",nl:"zitplan",sv:"placeringskarta",da:"bordplan",no:"bordkart",fi:"istumajärjestys"},
    aClose: {en:"Close the photo",de:"Foto schließen",fr:"Fermer la photo",es:"Cerrar la foto",pt:"Fechar a foto",it:"Chiudi la foto",nl:"Foto sluiten",sv:"Stäng fotot",da:"Luk billedet",no:"Lukk bildet",fi:"Sulje kuva"},
    aClue: {en:"Clue: {t}",de:"Hinweis: {t}",fr:"Indice : {t}",es:"Pista: {t}",pt:"Pista: {t}",it:"Indizio: {t}",nl:"Aanwijzing: {t}",sv:"Ledtråd: {t}",da:"Spor: {t}",no:"Hint: {t}",fi:"Vihje: {t}"},
  },/*STRINGS-END*/

  defaults: { level: '1', cap: 'show' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }, { value: '5', labelKey: 'l5' }] },
    { key: 'cap', type: 'choice', labelKey: 'setCap', options: [{ value: 'show', labelKey: 'capShow' }, { value: 'name', labelKey: 'capName' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._perms = {}; this._tags = {};
    this._timers = []; this._ro = null; this._view = {}; this._wall = [];
    injectGroupPhotoCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) { if (this.st && !this.st.done) this._start(this.st.r, 0); this._paint(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return GroupPhotoCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return GroupPhotoCore.levelOf(this._setting('level')); },
  _cap: function () { return GroupPhotoCore.capOf(this._setting('cap')); },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = GroupPhotoCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._perms = {}; this._tags = {}; this._wall = []; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = GroupPhotoCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._perms = P.perms; this._tags = P.tags; this._orderForPool = pool; if (pass > this._pass) this._wall = []; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'groupphoto.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    this.st = GroupPhotoCore.newState(this._loc(), this._level(), r, this._perms && this._perms[r], this._tags && this._tags[r], this._cap());
    this._view = { note: '', ok: '', flash: false, wall: -1, used: {} };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth();
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
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'gp-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="gp-main"></div><p class="gp-note" aria-live="polite"></p><div class="gp-wall"></div><p class="gp-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
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
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () {
    var W = this._width(), B = GroupPhotoCore.band(W), five = GroupPhotoCore.seatsOf(this._level()) === 5;
    /* puzzle-grid cells and their headers follow the data-mark floor (RULINGS: ≥ 40 px at 704 / ≥ 30 at 360) */
    return { W: W, wide: B.wide, tiny: B.tiny, pic: B.wide ? 96 : B.tiny ? (five ? 72 : 80) : five ? 80 : 88, cell: B.wide ? 96 : B.tiny ? 52 : 60 };
  },
  _img: function (path, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.gp-sr'); if (el) el.textContent = s; },
  /* the tiers of a class photo: the back row takes the extra one (5 → 3 + 2, 4 → 2 + 2, 3 → 2 + 1) */
  _tiers: function (list, pairs) {
    /* word cards on a phone: two to a row */
    if (pairs) { var out = []; for (var i = 0; i < list.length; i += 2) out.push(list.slice(i, i + 2)); return out; }
    var back = Math.ceil(list.length / 2); return [list.slice(0, back), list.slice(back)];
  },
  _list: function (a) {
    var loc = this._loc(), and = { en: 'and', de: 'und', fr: 'et', es: 'y', pt: 'e', it: 'e', nl: 'en', sv: 'och', da: 'og', no: 'og', fi: 'ja' }[loc];
    try { if (typeof Intl !== 'undefined' && Intl.ListFormat) return new Intl.ListFormat(loc === 'no' ? 'nb' : loc, { style: 'long', type: 'conjunction' }).format(a); } catch (e) {}
    return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' ' + and + ' ' + a[a.length - 1];
  },

  _paint_: function () {
    var st = this.st, rd = st.rd, D = this._dims();
    this._wrap.className = 'gp-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' k-' + rd.kind + ' n-' + (rd.seats ? rd.seats.length : 0);
    var main = this._qs('.gp-main'); main.innerHTML = '';
    /* on a phone, once the seat plan is photographed the camera steps aside for the two sentences */
    /* on a phone, once the photo is taken (or the plan photographed) the camera steps aside for the result and the shell's Next */
    if (D.wide || !(rd.kind === 'grid' ? st.phase !== 'plan' : st.done)) main.appendChild(this._camera(D));
    if (rd.kind === 'grid') this._paintPlan(main, D); else this._paintBench(main, D);
    var note = this._qs('.gp-note'), v = this._view;
    if (v.ok) { note.textContent = v.ok; note.className = 'gp-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'gp-note is-hint' + (st.rd.kind === 'grid' && st.phase === 'tf' && st.last !== 'tf' ? ' is-ask' : ''); }
    else { note.textContent = ''; note.className = 'gp-note'; }
    this._paintWall(D);
  },
  /* the camera: a drawn body, a lens, the slot the photo comes out of, and the red shutter (= the check) */
  _camera: function (D) {
    var st = this.st, self = this, cam = this._el('div', 'gp-cam gp-art' + (this._view.flash ? ' is-flash' : ''));
    cam.innerHTML = '<span class="gp-band gp-art"></span><span class="gp-lens gp-art"><i></i></span><span class="gp-win gp-art"></span><span class="gp-slot gp-art"></span>';
    var off = st.done || (st.rd.kind === 'grid' ? st.phase !== 'plan' : st.phase !== 'bench');
    var sh = this._btn('gp-shutter', 'check', this._t('shutter'), '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="#FFF" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.6" fill="none" stroke="#FFF" stroke-width="2"/></svg>');
    sh.title = this._t('shutter'); sh.disabled = off; sh.addEventListener('click', function () { self._snap(); });
    cam.appendChild(sh);
    return cam;
  },

  /* ---------------- levels 1–4: the bench, the step, the photo ---------------- */
  _paintBench: function (main, D) {
    var st = this.st, rd = st.rd, self = this, v = this._view;
    var scene = this._el('div', 'gp-scene');
    var finder = this._el('div', 'gp-finder gp-art' + (v.flash ? ' is-flash' : ''));
    finder.innerHTML = '<i class="gp-br gp-br1"></i><i class="gp-br gp-br2"></i><i class="gp-br gp-br3"></i><i class="gp-br gp-br4"></i>';
    var wall = v.wall >= 0 ? this._wall[v.wall] : null;
    if (wall) finder.appendChild(this._photoCard(wall.items, [], wall.caption, 'is-sharp', D, true));
    else if (st.photo) {
      var p = st.photo, items = [], blur = [], at = [];
      for (var i = 0; i < rd.seats.length; i++) if (i !== st.step) { items.push(rd.seats[i]); at.push(i); if (p.blurred.indexOf(i) >= 0) blur.push(items.length - 1); }
      var cap = p.sharp ? (p.caption ? rd.caption : '') : p.pencil ? rd.caption : '';
      /* a cloudy photo is still the bench: tap anyone in it to send them to the step instead */
      /* a photo on a phone keeps its pictures near the phone floor, two to a row beside the step, so the hint, the result and Next stay in view */
      finder.appendChild(this._photoCard(items, blur, cap, p.sharp ? 'is-sharp' : p.pencil ? 'is-pencil' : 'is-cloudy', !D.wide ? Object.assign({}, D, { pic: st.done && D.tiny ? 64 : 72 }) : D, false, p.sharp ? null : at));
    } else {
      var bench = this._el('div', 'gp-bench'), idx = rd.seats.map(function (_, i) { return i; }), inline = !D.wide, tiers = this._tiers(idx, rd.words && !D.wide);
      tiers.forEach(function (row, ti) {
        if (!row.length) return;
        var tier = self._el('div', 'gp-tier' + (ti === 0 ? ' is-back' : ' is-front'));
        row.forEach(function (i) { tier.appendChild(self._seat(i, D)); });
        /* on a phone the step stands at the end of the front row */
        if (inline && ti === tiers.length - 1) tier.appendChild(self._stepEl(D, true));
        bench.appendChild(tier); bench.appendChild(self._el('span', 'gp-plank gp-art' + (ti === 0 ? ' is-back' : '')));
      });
      bench.className += inline ? ' has-step' : '';
      if (st.cap === 'name' && st.phase === 'bench') bench.appendChild(this._el('span', 'gp-capslot gp-art', '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 20l2-6L16 4l4 4L10 18z" fill="#F4CF62" stroke="#2F2A3B" stroke-width="1.6" stroke-linejoin="round"/></svg>'));
      finder.appendChild(bench);
    }
    scene.appendChild(finder);
    if (D.wide || st.photo || wall) scene.appendChild(this._stepEl(D, false));
    main.appendChild(scene);
  },
  /* the step: where the one that doesn't belong stands */
  _stepEl: function (D, inline) {
    var st = this.st, rd = st.rd, self = this, step = this._el('div', 'gp-step gp-art' + (inline ? ' is-inline' : '') + (st.last === 'empty' ? ' is-glow' : '') + (st.done ? ' is-ok' : ''));
    if (st.step != null) {
      var s = rd.seats[st.step], sb = this._btn('gp-seat is-on-step' + (st.done ? ' is-wave' : ''), 'step', this._t('aStep', { t: s.label }), this._face(s, D));
      sb.disabled = st.phase !== 'bench' || st.done; sb.addEventListener('click', function () { self._back(); }); step.appendChild(sb);
    } else step.appendChild(this._el('span', 'gp-stepspot', ''));
    step.appendChild(this._el('span', 'gp-plat gp-art'));
    return step;
  },
  /* "I name it": three name tags on the photo's caption line */
  _tagsEl: function () {
    var st = this.st, rd = st.rd, self = this, tags = this._el('div', 'gp-tags');
    rd.tags.forEach(function (t, j) {
      var off = st.off.indexOf(j) >= 0, b = self._btn('gp-tag' + (off ? ' is-off' : ''), 'tag-' + j, self._t('aTag', { t: t.word }), esc(t.word));
      b.disabled = off; b.addEventListener('click', function () { self._tag(j); }); tags.appendChild(b);
    });
    return tags;
  },
  _face: function (s, D) { return s.w ? '<span class="gp-word">' + esc(s.w) + '</span>' : this._img(s.pic, D.pic, 'gp-pic') + '<span class="gp-lab">' + esc(s.label) + '</span>'; },
  _seat: function (i, D) {
    var st = this.st, rd = st.rd, s = rd.seats[i], self = this, gone = st.step === i;
    var b = this._btn('gp-seat' + (gone ? ' is-gone' : '') + (s.w ? ' is-card' : ''), 'seat-' + i, this._t('aSeat', { n: i + 1, t: s.label }), gone ? '<span class="gp-ghost" style="width:' + (s.w ? (D.wide ? 110 : 92) : D.pic) + 'px;height:' + (s.w ? 52 : D.pic) + 'px"></span>' : this._face(s, D));
    b.disabled = st.phase !== 'bench' || st.done; b.setAttribute('aria-pressed', gone ? 'true' : 'false');
    b.addEventListener('click', function () { self._seat_(i); });
    return b;
  },
  /* the photo: a white-bordered card with the pictures in their tiers (never shrunk) and the caption line */
  _photoCard: function (items, blur, caption, mode, D, pinned, seats) {
    var self = this, card = this._el('div', 'gp-photo gp-art ' + mode + (pinned ? ' is-pinned' : '') + (this._view.flash ? ' is-new' : ''));
    var idx = items.map(function (_, i) { return i; });
    this._tiers(idx).forEach(function (row) {
      if (!row.length) return;
      var tier = self._el('div', 'gp-ptier');
      row.forEach(function (i) {
        var s = items[i], cls = 'gp-pseat' + (blur.indexOf(i) >= 0 ? ' is-blur' : '') + (s.w ? ' is-card' : '');
        if (!seats) { tier.appendChild(self._el('span', cls, self._face(s, D))); return; }
        var k = seats[i], b = self._btn(cls + ' is-tap', 'seat-' + k, self._t('aSeat', { n: k + 1, t: s.label }), self._face(s, D));
        b.addEventListener('click', function () { self._seat_(k); }); tier.appendChild(b);
      });
      card.appendChild(tier);
    });
    if (!pinned && this.st.phase === 'name') { card.appendChild(this._tagsEl()); return card; }
    var cl = this._el('div', 'gp-capline' + (caption ? '' : ' is-empty') + (mode === 'is-pencil' ? ' is-pencil' : ''));
    cl.innerHTML = caption ? esc(caption) : '<svg class="gp-pencil" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 20l2-6L16 4l4 4L10 18z" fill="#F4CF62" stroke="#2F2A3B" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    card.appendChild(cl);
    if (pinned) { var x = this._btn('gp-close', 'wall-close', this._t('aClose'), '×'); x.addEventListener('click', function () { self._wallShow(-1); }); card.appendChild(x); }
    return card;
  },

  /* ---------------- level 5: the seat plan ---------------- */
  _paintPlan: function (main, D) {
    var st = this.st, rd = st.rd, self = this, v = this._view;
    var plan = this._el('div', 'gp-planrow');
    /* a photographed plan on a phone is a record (its cells take no taps): it shrinks to the puzzle-grid floor so the two sentences stay in view */
    if (st.phase !== 'plan' && !D.wide) D = Object.assign({}, D, { cell: 40 });
    var grid = this._el('div', 'gp-grid gp-art' + (st.phase !== 'plan' ? ' is-photo' : '') + (v.flash ? ' is-new' : ''));
    grid.style.gridTemplateColumns = 'auto repeat(3,' + D.cell + 'px)';
    grid.appendChild(this._el('span', 'gp-corner'));
    rd.things.forEach(function (t) { grid.appendChild(self._el('span', 'gp-head', self._img(t.pic, D.cell, 'gp-pic') + '<span class="gp-lab">' + esc(t.label) + '</span>')); });
    var pulse = st.tfMiss != null ? rd.tf[st.tfMiss] : null;
    rd.friends.forEach(function (f, fi) {
      grid.appendChild(self._el('span', 'gp-head is-row', self._img(f.pic, D.cell, 'gp-pic') + '<span class="gp-lab">' + esc(f.label) + '</span>'));
      rd.things.forEach(function (t, ti) {
        var c = st.cells[fi][ti], wrong = st.wrong.some(function (w) { return w[0] === fi && w[1] === ti; }), glow = st.glow && st.glow[0] === fi && st.glow[1] === ti;
        var pul = pulse && pulse.f === fi && pulse.t === ti;
        var b = self._btn('gp-cell gp-art' + (c === 'x' ? ' is-x' : c === 'v' ? ' is-v' : '') + (wrong ? ' is-wrong' : '') + (glow ? ' is-glow' : '') + (pul ? ' is-pulse' : ''), 'cell-' + fi + '-' + ti,
          self._t('aCell', { f: f.label, t: t.label, s: self._t(c === 'x' ? 'sX' : c === 'v' ? 'sV' : 'sE') }),
          c === 'x' ? '<span class="gp-stone is-x"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="#FFF" stroke-width="3.4" stroke-linecap="round"/></svg></span>'
            : c === 'v' ? '<span class="gp-stone is-v"><svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' : '');
        b.style.width = b.style.height = D.cell + 'px';
        b.disabled = st.phase !== 'plan'; b.addEventListener('click', function () { self._cell(fi, ti); });
        grid.appendChild(b);
      });
    });
    plan.appendChild(grid);
    var clues = this._el('div', 'gp-clues');
    rd.clues.forEach(function (c, i) {
      var b = self._btn('gp-clue' + (st.lit.indexOf(i) >= 0 ? ' is-lit' : '') + (v.used[i] ? ' is-used' : ''), 'clue-' + i, self._t('aClue', { t: c.text }), esc(c.text));
      b.setAttribute('aria-pressed', v.used[i] ? 'true' : 'false'); b.addEventListener('click', function () { self._clue(i); }); clues.appendChild(b);
    });
    /* once the plan is photographed the clues are spent: the two sentences take their place (beside the plan on a wide screen) */
    if (st.phase === 'plan') plan.appendChild(clues);
    main.appendChild(plan);
    if (st.phase !== 'plan') {
      var tf = this._el('div', 'gp-tf');
      rd.tf.forEach(function (s, i) {
        var row = self._el('div', 'gp-st' + (st.tf[i] === true ? ' is-right' : st.tfMiss === i ? ' is-miss' : ''));
        row.appendChild(self._el('span', 'gp-sttext', esc(s.text)));
        [true, false].forEach(function (val) {
          var on = st.tf[i] === true && val === s.truth, b = self._btn('gp-lamp' + (val ? ' is-true' : ' is-false') + (on ? ' is-on' : ''), 'tf-' + i + '-' + (val ? 1 : 0), self._t(val ? 'aTrue' : 'aFalse'),
            val ? '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
              : '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>');
          b.disabled = st.done || st.tf[i] === true; b.addEventListener('click', function () { self._tf(i, val); }); row.appendChild(b);
        });
        tf.appendChild(row);
      });
      (D.wide ? plan : main).appendChild(tf);
    }
  },

  /* ---------------- the photo wall ---------------- */
  _paintWall: function (D) {
    var w = this._qs('.gp-wall'), self = this; w.innerHTML = '';
    this._wall.forEach(function (p, i) {
      var inner = '<i class="gp-pinhead" style="background:' + ['#E0663A', '#146B5E', '#F4CF62', '#7A5BC7'][i % 4] + '"></i><span>' + esc(p.caption) + '</span>';
      /* a pinned seat plan is a record only; a pinned group photo opens again, big */
      if (p.plan) { w.appendChild(self._el('span', 'gp-pin gp-art is-plan', inner)); return; }
      var b = self._btn('gp-pin gp-art' + (self._view.wall === i ? ' is-open' : ''), 'wall-' + i, self._t('aWall', { t: p.caption }), inner);
      b.addEventListener('click', function () { self._wallShow(i); }); w.appendChild(b);
    });
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.flash = false; this._view.wall = -1; },
  _seat_: function (i) { var r = GroupPhotoCore.send(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(r === 'send' ? 620 : 380); this._paint(); this._sr(this._t(r === 'send' ? 'aStep' : 'aSeat', { n: i + 1, t: this.st.rd.seats[i].label })); },
  _back: function () { var r = GroupPhotoCore.back(this.st); if (r === 'no') return; this._moved(); this.api.sound(380); this._paint(); },
  _wallShow: function (i) { if (this.st.rd.kind === 'grid' || (this.st.phase !== 'bench' && !this.st.done)) return; this._view.wall = this._view.wall === i ? -1 : i; this._paint(); },
  _clue: function (i) { this._view.used[i] = !this._view.used[i]; this._paint(); },
  _snap: function () {
    var C = GroupPhotoCore, st = this.st, v = this._view, self = this; if (st.done) return;
    this._clearTimers(); v.wall = -1;
    if (st.rd.kind === 'grid') { this._checkPlan(); return; }
    var res = C.snap(st); if (res.result === 'no') return;
    if (res.result === 'empty') { v.ok = ''; v.note = this._t(C.hint(st)); v.flash = false; this.api.sound(400); this._paint(); this.api.announce(v.note); return; }
    v.flash = true; this.api.sound(res.result === 'miss' ? 240 : 880);
    if (res.result === 'ok') { this._success(); return; }
    v.ok = ''; v.note = this._t(C.hint(st)); this._paint(); this.api.announce(v.note);
    if (res.result === 'miss') this._sr(this._t('aPhotoCloud'));
    this._later(function () { self._view.flash = false; }, 900);
  },
  _tag: function (j) {
    var C = GroupPhotoCore, st = this.st, v = this._view, res = C.tag(st, j); if (res.result === 'no') return;
    v.flash = false;
    if (res.result === 'ok') { this._success(); return; }
    v.ok = ''; v.note = this._t(C.hint(st)); this.api.sound(260); this._paint(); this.api.announce(v.note);
  },
  _cell: function (f, t) { var r = GroupPhotoCore.cell(this.st, f, t); if (r === 'no') return; this._moved(); this.api.sound(r === 'v' ? 700 : r === 'x' ? 480 : 340); this._paint(); },
  _checkPlan: function () {
    var C = GroupPhotoCore, st = this.st, v = this._view, res = C.checkPlan(st); if (res.result === 'no') return;
    if (res.result === 'empty') { v.ok = ''; v.note = this._t(C.hint(st)); this.api.sound(400); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'plan') {
      v.flash = true; v.ok = ''; v.note = this._t('tfAsk'); this.api.sound(880);
      this._wall.push({ caption: this._t('wallPlan'), plan: true });
      this._paint(); this.api.announce(st.rd.solved + ' ' + v.note); return;
    }
    v.ok = ''; v.note = this._t(C.hint(st)); this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _tf: function (i, val) {
    var C = GroupPhotoCore, st = this.st, v = this._view, res = C.answer(st, i, val); if (res.result === 'no') return;
    v.flash = false;
    if (res.result === 'ok') { this._success(); return; }
    if (res.result === 'right') { v.note = this._t('tfAsk'); this.api.sound(700); this._paint(); return; }
    v.ok = ''; v.note = this._t(C.hint(st)); this.api.sound(260); this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = GroupPhotoCore, st = this.st, v = this._view, self = this, msg = C.okLine(st, function (a) { return self._list(a); });
    v.note = ''; v.ok = msg; if (this._pa) this._pa.msg = msg;
    if (st.rd.kind !== 'grid') this._wall.push({ caption: st.rd.caption, items: st.rd.seats.filter(function (_, i) { return i !== st.rd.odd; }) });
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._sr(this._t('aPhotoSharp', { t: st.rd.kind === 'grid' ? this._t('wallPlan') : st.rd.caption }));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectGroupPhotoCSS() {
  if (typeof document === 'undefined' || document.getElementById('gp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.gp-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .gp-wrap:focus{outline:none;}'
  + '.gp-main{display:flex;flex-direction:column;align-items:center;gap:14px;}'
  /* the camera */
  + '.gp-cam{position:relative;width:100%;max-width:440px;height:96px;margin-top:14px;border-radius:22px;background:#2A2A35;box-shadow:inset 0 -6px 0 rgba(0,0,0,.25),0 4px 0 #15151C;}'
  + '.gp-band{position:absolute;left:0;right:0;top:34px;height:22px;background:#146B5E;box-shadow:inset 0 2px 0 #1F8A79,inset 0 -2px 0 #0E4A41;}'
  + '.gp-lens{position:absolute;left:50%;top:50%;width:78px;height:78px;margin:-39px 0 0 -39px;border-radius:50%;background:radial-gradient(circle,#4A6B8C 0 18%,#1B2533 19% 36%,#5E6670 37% 46%,#2A2A35 47% 60%,#9AA3AE 61% 70%,#3B3B48 71%);box-shadow:0 0 0 4px #15151C;}'
  + '.gp-lens i{position:absolute;left:26%;top:22%;width:14px;height:9px;border-radius:50%;background:rgba(255,255,255,.75);transform:rotate(-30deg);}'
  + '.gp-win{position:absolute;left:22px;top:14px;width:46px;height:22px;border-radius:6px;background:#DDF1EC;box-shadow:inset 0 0 0 3px #15151C;}'
  + '.gp-slot{position:absolute;left:22%;right:22%;bottom:8px;height:7px;border-radius:4px;background:#0D0D12;}'
  + '.gp-cam.is-flash .gp-win{animation:gpWin .5s ease-out;} @keyframes gpWin{0%{background:#FFF;box-shadow:0 0 30px 12px #FFF;}100%{}}'
  + '.gp-shutter{position:absolute;right:26px;top:-16px;width:64px;height:64px;padding:0;border:0;border-radius:50%;background:#E0453A;box-shadow:inset 0 -5px 0 #A82A22,0 0 0 5px #15151C,0 6px 0 #15151C;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.gp-shutter:active{transform:translateY(3px);} .gp-shutter:disabled{background:#9AA3AE;box-shadow:inset 0 -5px 0 #6E7680,0 0 0 5px #15151C;cursor:default;}'
  /* the viewfinder and the step */
  + '.gp-scene{display:flex;align-items:stretch;justify-content:center;gap:12px;width:100%;}'
  + '.gp-finder{position:relative;flex:0 1 auto;min-width:300px;min-height:250px;display:flex;align-items:center;justify-content:center;padding:18px 18px 14px;border-radius:12px;background:#FFFDF4;box-shadow:0 0 0 2px #E7DCC3;}'
  + '.gp-br{position:absolute;width:26px;height:26px;border:0 solid #2F2A3B;} .gp-br1{left:6px;top:6px;border-width:4px 0 0 4px;} .gp-br2{right:6px;top:6px;border-width:4px 4px 0 0;} .gp-br3{left:6px;bottom:6px;border-width:0 0 4px 4px;} .gp-br4{right:6px;bottom:6px;border-width:0 4px 4px 0;}'
  + '.gp-bench{display:flex;flex-direction:column;align-items:center;gap:0;}'
  + '.gp-tier{display:flex;justify-content:center;align-items:flex-end;gap:12px;position:relative;z-index:1;} .gp-tier.is-front{margin-top:6px;}'
  + '.gp-plank{display:block;width:100%;min-width:220px;height:12px;border-radius:4px;background:#B98A55;box-shadow:inset 0 -3px 0 #8C6239,0 3px 0 rgba(0,0,0,.08);margin-top:-2px;} .gp-plank.is-back{width:92%;}'
  + '.gp-seat{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;min-width:96px;max-width:130px;padding:4px 4px 2px;border:0;border-radius:12px;background:transparent;cursor:pointer;font:inherit;color:' + INK + ';}'
  + '.gp-seat:hover:not(:disabled){background:rgba(244,207,98,.25);} .gp-seat:disabled{cursor:default;}'
  + '.gp-pic{display:block;object-fit:contain;}'
  + '.gp-lab{display:block;max-width:124px;font-family:' + B + ';font-weight:800;font-size:17px;line-height:1.15;text-align:center;overflow-wrap:anywhere;hyphens:auto;}'
  + '.gp-seat.is-card,.gp-pseat.is-card{min-width:0;}'
  + '.gp-word{display:flex;align-items:center;justify-content:center;min-width:110px;min-height:56px;max-width:170px;padding:6px 12px;box-sizing:border-box;border-radius:10px;background:#FFF;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #C9B48E;font-family:' + B + ';font-weight:800;font-size:22px;line-height:1.15;text-align:center;color:' + INK + ';overflow-wrap:break-word;hyphens:manual;}'
  + '.gp-ghost{display:block;border-radius:12px;border:3px dashed #C9B48E;box-sizing:border-box;}'
  + '.gp-capslot{display:flex;align-items:center;justify-content:center;width:70%;height:30px;margin-top:8px;border-bottom:3px dashed #B98A55;}'
  + '.gp-step{position:relative;flex:0 0 130px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;padding:10px 6px 8px;border-radius:12px;background:#F6EBD3;box-shadow:inset 0 0 0 2px #E7DCC3;}'
  + '.gp-step.is-glow{box-shadow:inset 0 0 0 3px #F2784B,0 0 16px rgba(242,120,75,.55);}'
  + '.gp-stepspot{display:block;width:88px;height:88px;border-radius:50%;border:3px dashed #C9B48E;box-sizing:border-box;}'
  + '.gp-plat{display:block;width:112px;height:16px;border-radius:5px;background:#7A5BC7;box-shadow:inset 0 -4px 0 #57409A,0 4px 0 rgba(0,0,0,.1);}'
  + '.gp-seat.is-on-step{animation:gpHop .26s ease-out;} @keyframes gpHop{0%{transform:translate(-30px,-24px) scale(.9);}60%{transform:translate(0,-10px);}100%{transform:none;}}'
  + '.gp-seat.is-wave{animation:gpWave .6s ease-in-out 1;} @keyframes gpWave{25%{transform:rotate(-6deg);}75%{transform:rotate(6deg);}}'
  /* the photo */
  + '.gp-photo{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 14px 8px;background:#FFF;border-radius:4px;box-shadow:0 0 0 1px #DDD,0 6px 14px rgba(47,42,59,.18);transform:rotate(-1.2deg);}'
  + '.gp-photo.is-new{animation:gpOut .5s ease-out,gpDev .8s ease-out;} @keyframes gpOut{0%{transform:translateY(-60px) rotate(0);opacity:.4;}100%{transform:rotate(-1.2deg);opacity:1;}} @keyframes gpDev{0%{filter:grayscale(1) brightness(1.4);}100%{filter:none;}}'
  + '.gp-ptier{display:flex;justify-content:center;gap:10px;} .gp-pseat{display:flex;flex-direction:column;align-items:center;gap:2px;} button.gp-pseat{padding:2px;border:0;border-radius:10px;background:transparent;font:inherit;color:' + INK + ';cursor:pointer;} button.gp-pseat:hover{background:rgba(244,207,98,.25);}'
  + '.gp-pseat.is-blur .gp-pic,.gp-pseat.is-blur .gp-word,.gp-pseat.is-blur .gp-lab{filter:blur(3px);opacity:.75;}'
  + '.gp-photo.is-cloudy .gp-pic,.gp-photo.is-cloudy .gp-word,.gp-photo.is-cloudy .gp-lab{filter:blur(3px);opacity:.75;}'
  + '.gp-photo.is-cloudy{background:linear-gradient(#FFF,#F1F3F5);}'
  + '.gp-capline{min-width:200px;min-height:36px;padding:2px 10px;border-bottom:2px solid #D9CFBC;font-family:' + H + ';font-weight:800;font-size:26px;line-height:1.2;text-align:center;color:#E0663A;}'
  + '.gp-capline.is-pencil{color:#8A8F98;font-weight:700;} .gp-capline.is-empty{display:flex;align-items:center;justify-content:center;}'
  + '.gp-pencil{animation:gpWob 1.2s ease-in-out infinite;} @keyframes gpWob{50%{transform:translateX(8px) rotate(8deg);}}'
  + '.gp-close{position:absolute;right:-12px;top:-12px;width:44px;height:44px;border:0;border-radius:50%;background:#2F2A3B;color:#FFF;font-size:26px;line-height:1;cursor:pointer;}'
  + '.gp-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;max-width:320px;padding:6px 0 2px;}'
  + '.gp-tag{min-height:48px;padding:6px 18px;border:0;border-radius:24px 6px 6px 24px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #E0A15E,0 4px 0 #E0A15E;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;}'
  + '.gp-tag.is-off{opacity:.4;text-decoration:line-through;transform:translateY(6px) rotate(-4deg);cursor:default;}'
  /* the seat plan */
  + '.gp-planrow{display:flex;align-items:flex-start;justify-content:center;gap:14px;width:100%;}'
  + '.gp-grid{display:grid;gap:4px;padding:10px;border-radius:12px;background:#FFFDF4;box-shadow:0 0 0 2px #E7DCC3;}'
  + '.gp-grid.is-photo{background:#FFF;box-shadow:0 0 0 1px #DDD,0 6px 14px rgba(47,42,59,.18);transform:rotate(-.8deg);} .gp-grid.is-new{animation:gpDev .8s ease-out;}'
  + '.gp-corner{display:block;} .gp-head{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;} .gp-head.is-row{padding-right:4px;}'
  + '.gp-cell{display:flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:10px;background:#F6EBD3;box-shadow:inset 0 0 0 3px #D9C29A;cursor:pointer;} .gp-cell:disabled{cursor:default;}'
  + '.gp-stone{display:flex;align-items:center;justify-content:center;width:62%;height:62%;border-radius:50%;} .gp-stone.is-x{background:#8A8F98;box-shadow:0 3px 0 #5E6670;} .gp-stone.is-v{background:#146B5E;box-shadow:0 3px 0 #0E4A41;}'
  + '.gp-cell.is-wrong{animation:gpShake .45s ease-in-out 2;box-shadow:inset 0 0 0 3px #E0663A;} @keyframes gpShake{25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.gp-cell.is-glow{box-shadow:inset 0 0 0 4px #F4CF62,0 0 16px rgba(244,207,98,.9);} .gp-cell.is-pulse{animation:gpPulse .9s ease-in-out 3;} @keyframes gpPulse{50%{box-shadow:inset 0 0 0 4px #E0663A,0 0 18px rgba(224,102,58,.7);}}'
  + '.gp-clues{display:flex;flex-direction:column;gap:8px;min-width:200px;max-width:240px;}'
  + '.gp-clue{padding:10px 12px;border:0;border-radius:10px;background:#FFF;box-shadow:inset 0 0 0 2px #C9B48E,0 3px 0 #C9B48E;font-family:' + B + ';font-weight:800;font-size:18px;line-height:1.25;text-align:left;color:' + INK + ';cursor:pointer;min-height:44px;}'
  + '.gp-clue.is-lit{box-shadow:inset 0 0 0 3px #E0663A,0 0 14px rgba(224,102,58,.5);} .gp-clue.is-used{opacity:.5;}'
  + '.gp-tf{display:flex;flex-direction:column;gap:8px;width:100%;max-width:560px;} .gp-planrow .gp-tf{width:250px;flex:0 0 250px;} .gp-planrow .gp-st{flex-wrap:wrap;justify-content:flex-end;} .gp-planrow .gp-sttext{flex:1 1 100%;}'
  + '.gp-st{display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:10px;background:#FFF8E8;} .gp-sttext{flex:1 1 auto;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.25;color:' + INK + ';}'
  + '.gp-lamp{flex:0 0 auto;width:52px;height:48px;padding:0;border:0;border-radius:12px;background:#FFF;box-shadow:inset 0 0 0 3px #C9B48E;cursor:pointer;display:flex;align-items:center;justify-content:center;} .gp-lamp.is-true{color:#146B5E;} .gp-lamp.is-false{color:#A8431F;}'
  + '.gp-lamp.is-on{background:#DDF1EC;box-shadow:inset 0 0 0 3px #2E8C7E;} .gp-st.is-miss{background:#FBE9D2;} .gp-lamp:disabled{cursor:default;}'
  /* the note, the wall */
  + '.gp-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .gp-note.is-hint{color:#9A3D1C;} .gp-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.gp-wall{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;} .gp-wall:empty{display:none;}'
  + '.gp-pin{position:relative;display:flex;align-items:flex-end;justify-content:center;min-width:88px;height:62px;padding:0 8px 6px;border:0;border-radius:3px;background:#FFF;box-shadow:0 0 0 1px #DDD,0 3px 6px rgba(0,0,0,.12),inset 0 -22px 0 #FFF8E8;font-family:' + H + ';font-weight:800;font-size:15px;line-height:1.1;color:#E0663A;cursor:pointer;}'
  + '.gp-pin:nth-child(odd){transform:rotate(-3deg);} .gp-pin:nth-child(even){transform:rotate(2deg);} .gp-pin.is-open{box-shadow:0 0 0 3px #F4CF62;} .gp-pin:disabled{cursor:default;} .gp-pin.is-plan{color:#146B5E;}'
  + '.gp-pinhead{position:absolute;left:50%;top:-5px;width:12px;height:12px;margin-left:-6px;border-radius:50%;box-shadow:0 2px 0 rgba(0,0,0,.25);}'
  + '.gp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.gp-wrap.is-narrow .gp-cam{height:72px;max-width:330px;} .gp-wrap.is-narrow .gp-band{top:25px;height:16px;} .gp-wrap.is-narrow .gp-lens{width:58px;height:58px;margin:-29px 0 0 -29px;} .gp-wrap.is-narrow .gp-win{width:34px;height:16px;top:10px;left:16px;}'
  + '.gp-wrap.is-narrow .gp-shutter{width:56px;height:56px;right:18px;top:-12px;}'
  + '.gp-wrap.is-narrow .gp-scene{gap:6px;} .gp-wrap.is-narrow .gp-finder{flex:1 1 auto;min-width:0;box-sizing:border-box;min-height:0;padding:14px 6px 10px;} .gp-wrap.is-narrow .gp-br{width:18px;height:18px;}'
  + '.gp-wrap.is-narrow .gp-step{flex:0 0 84px;box-sizing:border-box;padding:6px 2px;} .gp-wrap.is-narrow .gp-stepspot{width:60px;height:60px;} .gp-wrap.is-narrow .gp-plat{width:72px;height:12px;} .gp-step.is-inline{flex:0 0 auto;align-self:stretch;justify-content:flex-end;margin-left:4px;padding:4px 2px 0;background:#F6EBD3;border-radius:10px 10px 0 0;} .gp-wrap.is-narrow .gp-wall{display:none;} .gp-wrap.is-narrow .gp-cam{height:64px;} .gp-wrap.is-narrow .gp-band{top:22px;height:14px;} .gp-wrap.is-narrow .gp-lens{width:52px;height:52px;margin:-26px 0 0 -26px;} .gp-wrap.is-narrow .gp-tags{gap:6px;padding:4px 0 2px;} .gp-wrap.is-narrow .gp-tag{font-size:18px;min-height:44px;padding:4px 12px;}'
  + '.gp-wrap.is-narrow .gp-tier{gap:6px;} .gp-wrap.is-narrow .gp-seat{min-width:0;max-width:104px;padding:2px;} .gp-wrap.is-narrow .gp-lab{font-size:15px;max-width:100px;} .gp-wrap.is-narrow .gp-plank{min-width:0;}'
  + '.gp-wrap.is-narrow .gp-word{min-width:92px;min-height:52px;font-size:18px;padding:4px 8px;} .gp-wrap.is-narrow .gp-photo .gp-word{min-width:56px;max-width:96px;font-size:15px;padding:4px 6px;min-height:44px;} .gp-wrap.is-narrow .gp-ptier{gap:6px;} .gp-wrap.is-narrow.k-words .gp-ptier{flex-wrap:wrap;} .gp-wrap.is-narrow .gp-photo{min-width:0;max-width:100%;box-sizing:border-box;} .gp-wrap.is-narrow .gp-finder{overflow:hidden;} .gp-wrap.is-narrow .gp-photo{padding:10px 8px 6px;} .gp-wrap.is-narrow .gp-capline{font-size:22px;min-width:160px;}'
  + '.gp-wrap.is-narrow .gp-planrow{flex-direction:column;align-items:center;gap:10px;} .gp-wrap.is-narrow .gp-grid{padding:6px;gap:4px;} .gp-wrap.is-narrow .gp-clues{max-width:none;width:100%;} .gp-wrap.is-narrow .gp-clue{font-size:17px;padding:8px 10px;}'
  + '.gp-wrap.is-narrow .gp-head .gp-lab{font-size:13px;}'
  + '.gp-wrap.is-narrow .gp-sttext{font-size:17px;} .gp-wrap.is-narrow .gp-note{font-size:17px;} .gp-wrap.is-narrow .gp-tag{font-size:19px;min-height:46px;padding:4px 14px;}'
  /* on a phone the hint and the success line sit right under the camera, where the eye is after the shutter */
  + '.gp-wrap.is-narrow .gp-main{display:contents;} .gp-wrap.is-narrow .gp-cam{order:0;align-self:center;} .gp-wrap.is-narrow .gp-note{order:1;} .gp-wrap.is-narrow .gp-scene,.gp-wrap.is-narrow .gp-planrow,.gp-wrap.is-narrow .gp-tf{order:2;align-self:center;} .gp-wrap.is-narrow .gp-wall,.gp-wrap.is-narrow .gp-sr{order:3;} .gp-wrap.is-narrow .gp-note:empty{min-height:0;margin-top:-6px;} .gp-wrap.is-narrow.k-grid .gp-note.is-ask{display:none;} .gp-wrap.is-done .gp-wall{display:none;} .gp-wrap.is-narrow.k-grid.is-done .gp-tf{display:none;}'
  + '.gp-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.gp-wrap *{animation:none !important;transition:none !important;}}'
  + '.gp-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'gp-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.GroupPhotoActivity = GroupPhotoActivity;
