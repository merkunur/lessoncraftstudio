/* =====================================================================
   overflow-trays-activity.js — ACTIVITY #30 of the one-by-one rebuild:
   "Teen Numbers" (K.NBT.A.1) — THE OVERFLOW TRAYS.
   Design sheet: docs/activities-rebuild/designs/030-ten-frame.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: hold the spout and counters pour into the top tray, one
   cell after another; nothing reaches the bottom tray until the top one is
   full — the tray shivers, its rim flashes and the chute opens — so 14 is
   literally a full ten that overflowed plus four, and on success the 1 of
   the numeral lands on the full tray and the 4 on the four below. "Number
   of the day": a full tray seals onto the tens shelf, a tray stack adds a
   whole sealed ten per tap, and the day card fills step by step — ten more,
   ten less, one more / one less (30 − 1 breaks a ten). No count is shown
   during a task. "Just pour" is open play.

   ACTIVITY LAYER ONLY: the model is overflow-trays-core.js and the number
   words are overflow-trays-words.js (generated from the worksheets' tables);
   lcs-shell.js is untouched (its Check is hidden and pressed by this
   activity when the round is complete). Test seams:
   window.OverflowTraysActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var OverflowTraysActivity = {
  id: 'overflow-trays',
  apparatusClasses: ['ot-'],

  strings: {
    title:        {en:'The Overflow Trays',de:'Die Überlauf-Schalen',fr:'Les bacs qui débordent',it:'I vassoi che traboccano',es:'Las charolas que se desbordan',pt:'As bandejas que transbordam',nl:'De overloopbakjes',sv:'Lådorna som svämmar över',da:'Bakkerne, der løber over',no:'Brettene som renner over',fi:'Tulvivat tarjottimet'},
    instruction:  {en:'Pour counters from the spout until you have the number. A tray has to be full before any counter goes past it.',de:'Gieß Plättchen aus dem Ausguss, bis du die Zahl hast. Eine Schale muss voll sein, bevor ein Plättchen weiterrollt.',fr:'Verse des jetons avec le bec verseur jusqu’à avoir le nombre. Un bac doit être plein avant qu’un jeton aille plus loin.',it:'Versa i gettoni dal beccuccio finché hai il numero. Un vassoio deve essere pieno prima che un gettone vada oltre.',es:'Vierte fichas con el pico hasta tener el número. Una charola tiene que estar llena antes de que una ficha pase más allá.',pt:'Despeje fichas pelo bico até ter o número. Uma bandeja precisa estar cheia antes que uma ficha passe adiante.',nl:'Giet fiches uit de tuit tot je het getal hebt. Een bakje moet vol zijn voordat er een fiche verder rolt.',sv:'Häll brickor ur pipen tills du har talet. En låda måste vara full innan någon bricka kan rulla vidare.',da:'Hæld brikker ud af tuden, til du har tallet. En bakke skal være fuld, før en brik kan trille videre.',no:'Hell brikker ut av tuten til du har tallet. Et brett må være fullt før en brikke kan trille videre.',fi:'Kaada nappuloita nokasta, kunnes sinulla on luku. Tarjottimen pitää olla täynnä, ennen kuin yksikään nappula pääsee ohi.'},
    promptMake:   {en:'Make {n}.',de:'Leg {n}.',fr:'Fais {n}.',it:'Forma {n}.',es:'Forma {n}.',pt:'Forme {n}.',nl:'Maak {n}.',sv:'Gör {n}.',da:'Lav {n}.',no:'Lag {n}.',fi:'Tee {n}.'},
    promptDay:    {en:'Number of the day: {n}.',de:'Zahl des Tages: {n}.',fr:'Nombre du jour : {n}.',it:'Numero del giorno: {n}.',es:'Número del día: {n}.',pt:'Número do dia: {n}.',nl:'Getal van de dag: {n}.',sv:'Dagens tal: {n}.',da:'Dagens tal: {n}.',no:'Dagens tall: {n}.',fi:'Päivän luku: {n}.'},
    stepMore:     {en:'Now add ten more.',de:'Leg jetzt zehn mehr dazu.',fr:'Ajoute maintenant dix de plus.',it:'Ora aggiungi dieci in più.',es:'Ahora agrega diez más.',pt:'Agora coloque mais dez.',nl:'Doe er nu tien bij.',sv:'Lägg nu till tio.',da:'Læg nu ti mere til.',no:'Legg nå til ti.',fi:'Lisää nyt kymmenen.'},
    stepLess:     {en:'Now take ten away from {n}.',de:'Nimm jetzt zehn von {n} weg.',fr:'Enlève maintenant dix à {n}.',it:'Ora togli dieci da {n}.',es:'Ahora quita diez a {n}.',pt:'Agora tire dez de {n}.',nl:'Haal nu tien weg van {n}.',sv:'Ta nu bort tio från {n}.',da:'Tag nu ti væk fra {n}.',no:'Ta nå bort ti fra {n}.',fi:'Ota nyt kymmenen pois luvusta {n}.'},
    stepOneMore:  {en:'Now put one more on {n}.',de:'Leg jetzt eins zu {n} dazu.',fr:'Ajoute maintenant un de plus à {n}.',it:'Ora aggiungi uno in più a {n}.',es:'Ahora agrega uno más a {n}.',pt:'Agora coloque mais um em {n}.',nl:'Doe nu één bij {n}.',sv:'Lägg nu en till på {n}.',da:'Læg nu en mere til {n}.',no:'Legg nå én til på {n}.',fi:'Lisää nyt yksi lukuun {n}.'},
    stepOneLess:  {en:'Now take one away from {n}.',de:'Nimm jetzt eins von {n} weg.',fr:'Enlève maintenant un à {n}.',it:'Ora togli uno da {n}.',es:'Ahora quita uno a {n}.',pt:'Agora tire um de {n}.',nl:'Haal nu één weg van {n}.',sv:'Ta nu bort en från {n}.',da:'Tag nu en væk fra {n}.',no:'Ta nå bort én fra {n}.',fi:'Ota nyt yksi pois luvusta {n}.'},
    hintPour:     {en:'Hold the spout to pour. Stop at {n}.',de:'Halte den Ausguss gedrückt, um zu gießen. Hör bei {n} auf.',fr:'Appuie longtemps sur le bec verseur pour verser. Arrête-toi à {n}.',it:'Tieni premuto il beccuccio per versare. Fermati a {n}.',es:'Mantén presionado el pico para verter. Detente en {n}.',pt:'Segure o bico para despejar. Pare em {n}.',nl:'Houd de tuit ingedrukt om te gieten. Stop bij {n}.',sv:'Håll in pipen för att hälla. Sluta vid {n}.',da:'Hold tuden nede for at hælde. Stop ved {n}.',no:'Hold tuten inne for å helle. Stopp ved {n}.',fi:'Pidä nokkaa painettuna, niin nappulat valuvat. Lopeta, kun nappuloita on {n}.'},
    hintFew:      {en:'Look at the dotted places. Fill them all.',de:'Schau auf die gepunkteten Plätze. Füll sie alle.',fr:'Regarde les places en pointillés. Remplis-les toutes.',it:'Guarda i posti tratteggiati. Riempili tutti.',es:'Mira los lugares punteados. Llénalos todos.',pt:'Olhe os lugares pontilhados. Preencha todos.',nl:'Kijk naar de gestippelde plekjes. Vul ze allemaal.',sv:'Titta på de prickade platserna. Fyll dem alla.',da:'Se på de prikkede pladser. Fyld dem alle.',no:'Se på de prikkete plassene. Fyll alle sammen.',fi:'Katso pisteillä merkittyjä paikkoja. Täytä ne kaikki.'},
    hintMany:     {en:'Some counters are outside the dotted places. Take them back.',de:'Einige Plättchen liegen außerhalb der gepunkteten Plätze. Nimm sie zurück.',fr:'Des jetons sont en dehors des places en pointillés. Reprends-les.',it:'Alcuni gettoni sono fuori dai posti tratteggiati. Riprendili.',es:'Hay fichas fuera de los lugares punteados. Regrésalas.',pt:'Algumas fichas estão fora dos lugares pontilhados. Tire-as de volta.',nl:'Er liggen fiches buiten de gestippelde plekjes. Haal ze terug.',sv:'Några brickor ligger utanför de prickade platserna. Ta tillbaka dem.',da:'Nogle brikker ligger uden for de prikkede pladser. Tag dem tilbage.',no:'Noen brikker ligger utenfor de prikkete plassene. Ta dem tilbake.',fi:'Osa nappuloista on pisteillä merkittyjen paikkojen ulkopuolella. Ota ne takaisin.'},
    hintShape:    {en:'{n} needs a full ten on top, then {ones} more.',de:'{n} braucht oben einen vollen Zehner und dann {ones} mehr.',fr:'Pour {n}, il faut une dizaine pleine en haut, puis encore {ones}.',it:'{n} ha bisogno di una decina piena sopra, poi ancora {ones}.',es:'{n} necesita una decena completa arriba y luego {ones} más.',pt:'{n} precisa de uma dezena cheia em cima e depois mais {ones}.',nl:'{n} heeft bovenin een volle tien nodig en dan nog {ones}.',sv:'{n} behöver ett fullt tiotal överst och sedan {ones} till.',da:'{n} skal have en fuld tier øverst og så {ones} til.',no:'{n} trenger en full tier øverst og så {ones} til.',fi:'Luku {n} tarvitsee ylös täyden kympin ja sitten {ones} lisää.'},
    hintShapeTen: {en:'{n} needs one full ten on the shelf, then {ones} more.',de:'{n} braucht einen vollen Zehner im Regal und dann {ones} mehr.',fr:'Pour {n}, il faut une dizaine pleine sur l’étagère, puis encore {ones}.',it:'{n} ha bisogno di una decina piena sulla mensola, poi ancora {ones}.',es:'{n} necesita una decena completa en la repisa y luego {ones} más.',pt:'{n} precisa de uma dezena cheia na prateleira e depois mais {ones}.',nl:'{n} heeft één volle tien op de plank nodig en dan nog {ones}.',sv:'{n} behöver ett fullt tiotal på hyllan och sedan {ones} till.',da:'{n} skal have en fuld tier på hylden og så {ones} til.',no:'{n} trenger en full tier på hylla og så {ones} til.',fi:'Luku {n} tarvitsee hyllylle yhden täyden kympin ja sitten {ones} lisää.'},
    hintShapeDay: {en:'{n} needs {tens} full tens, then {ones} more.',de:'{n} braucht {tens} volle Zehner und dann {ones} mehr.',fr:'Pour {n}, il faut {tens} dizaines pleines, puis encore {ones}.',it:'{n} ha bisogno di {tens} decine piene, poi ancora {ones}.',es:'{n} necesita {tens} decenas completas y luego {ones} más.',pt:'{n} precisa de {tens} dezenas cheias e depois mais {ones}.',nl:'{n} heeft {tens} volle tientallen nodig en dan nog {ones}.',sv:'{n} behöver {tens} fulla tiotal och sedan {ones} till.',da:'{n} skal have {tens} fulde tiere og så {ones} til.',no:'{n} trenger {tens} fulle tiere og så {ones} til.',fi:'Luku {n} tarvitsee {tens} täyttä kymppiä ja sitten {ones} lisää.'},
    hintShapeDayNone:{en:'{n} needs {tens} full tens and nothing more.',de:'{n} braucht {tens} volle Zehner und sonst nichts.',fr:'Pour {n}, il faut {tens} dizaines pleines, et rien de plus.',it:'{n} ha bisogno di {tens} decine piene e nient’altro.',es:'{n} necesita {tens} decenas completas y nada más.',pt:'{n} precisa de {tens} dezenas cheias e nada mais.',nl:'{n} heeft {tens} volle tientallen nodig en verder niets.',sv:'{n} behöver {tens} fulla tiotal och inget mer.',da:'{n} skal have {tens} fulde tiere og ikke mere.',no:'{n} trenger {tens} fulle tiere og ikke noe mer.',fi:'Luku {n} tarvitsee {tens} täyttä kymppiä eikä mitään muuta.'},
    hintShapeSmall:{en:'{n} needs no full ten, just {ones} in the open tray.',de:'{n} braucht keinen vollen Zehner, nur {ones} in der offenen Schale.',fr:'Pour {n}, pas besoin de dizaine pleine, juste {ones} dans le bac ouvert.',it:'{n} non ha bisogno di una decina piena, solo {ones} nel vassoio aperto.',es:'{n} no necesita una decena completa, solo {ones} en la charola abierta.',pt:'{n} não precisa de dezena cheia, só {ones} na bandeja aberta.',nl:'{n} heeft geen volle tien nodig, alleen {ones} in het open bakje.',sv:'{n} behöver inget fullt tiotal, bara {ones} i den öppna lådan.',da:'{n} skal ikke have en fuld tier, kun {ones} i den åbne bakke.',no:'{n} trenger ingen full tier, bare {ones} på det åpne brettet.',fi:'Luku {n} ei tarvitse täyttä kymppiä, vain {ones} avoimelle tarjottimelle.'},
    hintFull:     {en:'This tray is full. Take from the bottom tray.',de:'Diese Schale ist voll. Nimm aus der unteren Schale.',fr:'Ce bac est plein. Reprends dans le bac du bas.',it:'Questo vassoio è pieno. Prendi da quello di sotto.',es:'Esta charola está llena. Toma de la charola de abajo.',pt:'Esta bandeja está cheia. Tire da bandeja de baixo.',nl:'Dit bakje is vol. Pak uit het onderste bakje.',sv:'Den här lådan är full. Ta från den nedre lådan.',da:'Denne bakke er fuld. Tag fra den nederste bakke.',no:'Dette brettet er fullt. Ta fra det nederste brettet.',fi:'Tämä tarjotin on täynnä. Ota alemmalta tarjottimelta.'},
    hintBreak:    {en:'The open tray is empty. Tap it to take one away: a full tray will open.',de:'Die offene Schale ist leer. Tipp darauf, um eins wegzunehmen: Eine volle Schale geht auf.',fr:'Le bac ouvert est vide. Touche-le pour en enlever un : un bac plein va s’ouvrir.',it:'Il vassoio aperto è vuoto. Toccalo per toglierne uno: si aprirà un vassoio pieno.',es:'La charola abierta está vacía. Tócala para quitar uno: se abrirá una charola llena.',pt:'A bandeja aberta está vazia. Toque nela para tirar um: uma bandeja cheia vai abrir.',nl:'Het open bakje is leeg. Tik erop om er één weg te halen: dan gaat een vol bakje open.',sv:'Den öppna lådan är tom. Tryck på den för att ta bort en: en full låda öppnas.',da:'Den åbne bakke er tom. Tryk på den for at tage en væk: en fuld bakke åbner sig.',no:'Det åpne brettet er tomt. Trykk på det for å ta bort én: et fullt brett åpner seg.',fi:'Avoin tarjotin on tyhjä. Napauta sitä ja ota yksi: täysi tarjotin aukeaa.'},
    hintSealed:   {en:'Take the counters from the open tray first.',de:'Nimm zuerst die Plättchen aus der offenen Schale.',fr:'Reprends d’abord les jetons du bac ouvert.',it:'Togli prima i gettoni dal vassoio aperto.',es:'Primero quita las fichas de la charola abierta.',pt:'Tire primeiro as fichas da bandeja aberta.',nl:'Haal eerst de fiches uit het open bakje.',sv:'Ta först brickorna från den öppna lådan.',da:'Tag først brikkerne fra den åbne bakke.',no:'Ta først brikkene fra det åpne brettet.',fi:'Ota ensin nappulat avoimelta tarjottimelta.'},
    okTeen:       {en:'{n} is a full ten and {ones} more.',de:'{n} ist ein voller Zehner und {ones} mehr.',fr:'{n}, c’est une dizaine pleine et encore {ones}.',it:'{n} è una decina piena e ancora {ones}.',es:'{n} es una decena completa y {ones} más.',pt:'{n} é uma dezena cheia e mais {ones}.',nl:'{n} is een volle tien en nog {ones}.',sv:'{n} är ett fullt tiotal och {ones} till.',da:'{n} er en fuld tier og {ones} til.',no:'{n} er en full tier og {ones} til.',fi:'{n} on täysi kymppi ja {ones} lisää.'},
    okTens:       {en:'{n} is {tens} full tens and {ones} more.',de:'{n} sind {tens} volle Zehner und {ones} mehr.',fr:'{n}, c’est {tens} dizaines pleines et encore {ones}.',it:'{n} sono {tens} decine piene e ancora {ones}.',es:'{n} son {tens} decenas completas y {ones} más.',pt:'{n} são {tens} dezenas cheias e mais {ones}.',nl:'{n} is {tens} volle tientallen en nog {ones}.',sv:'{n} är {tens} fulla tiotal och {ones} till.',da:'{n} er {tens} fulde tiere og {ones} til.',no:'{n} er {tens} fulle tiere og {ones} til.',fi:'{n} on {tens} täyttä kymppiä ja {ones} lisää.'},
    okTensNone:   {en:'{n} is {tens} full tens and no more.',de:'{n} sind {tens} volle Zehner und sonst nichts.',fr:'{n}, c’est {tens} dizaines pleines, et rien de plus.',it:'{n} sono {tens} decine piene e nient’altro.',es:'{n} son {tens} decenas completas y nada más.',pt:'{n} são {tens} dezenas cheias e nada mais.',nl:'{n} is {tens} volle tientallen en verder niets.',sv:'{n} är {tens} fulla tiotal och inget mer.',da:'{n} er {tens} fulde tiere og ikke mere.',no:'{n} er {tens} fulle tiere og ikke noe mer.',fi:'{n} on {tens} täyttä kymppiä eikä mitään muuta.'},
    okMore:       {en:'Ten more: {m}. The ones stayed {ones}.',de:'Zehn mehr: {m}. Die Einer sind {ones} geblieben.',fr:'Dix de plus : {m}. Les unités sont restées {ones}.',it:'Dieci in più: {m}. Le unità sono rimaste {ones}.',es:'Diez más: {m}. Las unidades siguen siendo {ones}.',pt:'Dez a mais: {m}. As unidades continuam sendo {ones}.',nl:'Tien meer: {m}. De eenheden bleven {ones}.',sv:'Tio mer: {m}. Entalen är fortfarande {ones}.',da:'Ti mere: {m}. Enerne er stadig {ones}.',no:'Ti mer: {m}. Enerne er fortsatt {ones}.',fi:'Kymmenen enemmän: {m}. Ykkösiä on yhä {ones}.'},
    okMoreNone:   {en:'Ten more: {m}. The open tray stayed empty.',de:'Zehn mehr: {m}. Die offene Schale ist leer geblieben.',fr:'Dix de plus : {m}. Le bac ouvert est resté vide.',it:'Dieci in più: {m}. Il vassoio aperto è rimasto vuoto.',es:'Diez más: {m}. La charola abierta sigue vacía.',pt:'Dez a mais: {m}. A bandeja aberta continuou vazia.',nl:'Tien meer: {m}. Het open bakje bleef leeg.',sv:'Tio mer: {m}. Den öppna lådan är fortfarande tom.',da:'Ti mere: {m}. Den åbne bakke er stadig tom.',no:'Ti mer: {m}. Det åpne brettet er fortsatt tomt.',fi:'Kymmenen enemmän: {m}. Avoin tarjotin pysyi tyhjänä.'},
    okLess:       {en:'Ten less: {m}. Only the tens changed.',de:'Zehn weniger: {m}. Nur die Zehner haben sich verändert.',fr:'Dix de moins : {m}. Seules les dizaines ont changé.',it:'Dieci in meno: {m}. Sono cambiate solo le decine.',es:'Diez menos: {m}. Solo cambiaron las decenas.',pt:'Dez a menos: {m}. Só as dezenas mudaram.',nl:'Tien minder: {m}. Alleen de tientallen zijn veranderd.',sv:'Tio mindre: {m}. Bara tiotalen ändrades.',da:'Ti mindre: {m}. Kun tierne ændrede sig.',no:'Ti mindre: {m}. Bare tierne endret seg.',fi:'Kymmenen vähemmän: {m}. Vain kympit muuttuivat.'},
    okOneMore:    {en:'One more: {m}.',de:'Eins mehr: {m}.',fr:'Un de plus : {m}.',it:'Uno in più: {m}.',es:'Uno más: {m}.',pt:'Um a mais: {m}.',nl:'Eén meer: {m}.',sv:'En mer: {m}.',da:'En mere: {m}.',no:'Én mer: {m}.',fi:'Yksi enemmän: {m}.'},
    okOneMoreTen: {en:'One more: {m}. Ten ones made a new ten!',de:'Eins mehr: {m}. Zehn Einer sind ein neuer Zehner!',fr:'Un de plus : {m}. Dix unités font une nouvelle dizaine !',it:'Uno in più: {m}. Dieci unità fanno una nuova decina!',es:'Uno más: {m}. ¡Diez unidades forman una decena nueva!',pt:'Um a mais: {m}. Dez unidades formaram uma nova dezena!',nl:'Eén meer: {m}. Tien eenheden maken een nieuwe tien!',sv:'En mer: {m}. Tio ental blev ett nytt tiotal!',da:'En mere: {m}. Ti enere blev til en ny tier!',no:'Én mer: {m}. Ti enere ble en ny tier!',fi:'Yksi enemmän: {m}. Kymmenestä ykkösestä tuli uusi kymppi!'},
    okOneLess:    {en:'One less: {m}.',de:'Eins weniger: {m}.',fr:'Un de moins : {m}.',it:'Uno in meno: {m}.',es:'Uno menos: {m}.',pt:'Um a menos: {m}.',nl:'Eén minder: {m}.',sv:'En mindre: {m}.',da:'En mindre: {m}.',no:'Én mindre: {m}.',fi:'Yksi vähemmän: {m}.'},
    okOneLessBroke:{en:'One less: {m}. You opened a ten.',de:'Eins weniger: {m}. Du hast einen Zehner geöffnet.',fr:'Un de moins : {m}. Tu as ouvert une dizaine.',it:'Uno in meno: {m}. Hai aperto una decina.',es:'Uno menos: {m}. Abriste una decena.',pt:'Um a menos: {m}. Você abriu uma dezena.',nl:'Eén minder: {m}. Je hebt een tien opengemaakt.',sv:'En mindre: {m}. Du öppnade ett tiotal.',da:'En mindre: {m}. Du åbnede en tier.',no:'Én mindre: {m}. Du åpnet en tier.',fi:'Yksi vähemmän: {m}. Avasit kympin.'},
    celebrateDay: {en:'The day card for {n} is full!',de:'Die Tageskarte für {n} ist voll!',fr:'La carte du jour de {n} est complète !',it:'La scheda del giorno per {n} è completa!',es:'¡La tarjeta del día del {n} está completa!',pt:'O cartão do dia do {n} está completo!',nl:'De dagkaart van {n} is vol!',sv:'Dagens kort för {n} är fullt!',da:'Dagens kort for {n} er fyldt ud!',no:'Dagens kort for {n} er fylt ut!',fi:'Luvun {n} päiväkortti on valmis!'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Controlla',es:'Revisar',pt:'Conferir',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    spout:        {en:'Pour one counter',de:'Ein Plättchen gießen',fr:'Verser un jeton',it:'Versa un gettone',es:'Verter una ficha',pt:'Despejar uma ficha',nl:'Eén fiche gieten',sv:'Häll en bricka',da:'Hæld én brik',no:'Hell én brikke',fi:'Kaada yksi nappula'},
    stack:        {en:'Add a full ten',de:'Einen vollen Zehner dazulegen',fr:'Ajouter une dizaine pleine',it:'Aggiungi una decina piena',es:'Agregar una decena completa',pt:'Colocar uma dezena cheia',nl:'Een volle tien erbij doen',sv:'Lägg till ett fullt tiotal',da:'Læg en fuld tier til',no:'Legg til en full tier',fi:'Lisää täysi kymppi'},
    undo:         {en:'Empty the trays',de:'Schalen leeren',fr:'Vider les bacs',it:'Svuota i vassoi',es:'Vaciar las charolas',pt:'Esvaziar as bandejas',nl:'De bakjes leegmaken',sv:'Töm lådorna',da:'Tøm bakkerne',no:'Tøm brettene',fi:'Tyhjennä tarjottimet'},
    takeOne:      {en:'Take one back',de:'Eins zurücknehmen',fr:'En reprendre un',it:'Riprendine uno',es:'Regresar una',pt:'Tirar uma de volta',nl:'Eén terugnemen',sv:'Ta tillbaka en',da:'Tag én tilbage',no:'Ta én tilbake',fi:'Ota yksi takaisin'},
    sealedBar:    {en:'A full ten — tap to take it back',de:'Ein voller Zehner – tippen, um ihn zurückzunehmen',fr:'Une dizaine pleine — touche pour la reprendre',it:'Una decina piena: tocca per riprenderla',es:'Una decena completa: tócala para regresarla',pt:'Uma dezena cheia: toque para tirá-la de volta',nl:'Een volle tien – tik om hem terug te nemen',sv:'Ett fullt tiotal – tryck för att ta tillbaka det',da:'En fuld tier – tryk for at tage den tilbage',no:'En full tier – trykk for å ta den tilbake',fi:'Täysi kymppi – napauta, niin se palaa'},
    topTray:      {en:'Top tray',de:'Obere Schale',fr:'Bac du haut',it:'Vassoio di sopra',es:'Charola de arriba',pt:'Bandeja de cima',nl:'Bovenste bakje',sv:'Övre lådan',da:'Øverste bakke',no:'Øverste brett',fi:'Ylempi tarjotin'},
    bottomTray:   {en:'Bottom tray',de:'Untere Schale',fr:'Bac du bas',it:'Vassoio di sotto',es:'Charola de abajo',pt:'Bandeja de baixo',nl:'Onderste bakje',sv:'Nedre lådan',da:'Nederste bakke',no:'Nederste brett',fi:'Alempi tarjotin'},
    openTray:     {en:'Open tray',de:'Offene Schale',fr:'Bac ouvert',it:'Vassoio aperto',es:'Charola abierta',pt:'Bandeja aberta',nl:'Open bakje',sv:'Den öppna lådan',da:'Den åbne bakke',no:'Det åpne brettet',fi:'Avoin tarjotin'},
    shelf:        {en:'Tens shelf',de:'Zehner-Regal',fr:'Étagère des dizaines',it:'Mensola delle decine',es:'Repisa de las decenas',pt:'Prateleira das dezenas',nl:'Plank met tientallen',sv:'Tiotalshyllan',da:'Tierhylden',no:'Tierhylla',fi:'Kymppihylly'},
    cardTens:     {en:'tens',de:'Zehner',fr:'dizaines',it:'decine',es:'decenas',pt:'dezenas',nl:'tientallen',sv:'tiotal',da:'tiere',no:'tiere',fi:'kymppejä'},
    cardOnes:     {en:'ones',de:'Einer',fr:'unités',it:'unità',es:'unidades',pt:'unidades',nl:'eenheden',sv:'ental',da:'enere',no:'enere',fi:'ykkösiä'},
    cardMore:     {en:'ten more',de:'zehn mehr',fr:'dix de plus',it:'dieci in più',es:'diez más',pt:'dez a mais',nl:'tien meer',sv:'tio mer',da:'ti mere',no:'ti mer',fi:'kymmenen enemmän'},
    cardLess:     {en:'ten less',de:'zehn weniger',fr:'dix de moins',it:'dieci in meno',es:'diez menos',pt:'dez a menos',nl:'tien minder',sv:'tio mindre',da:'ti mindre',no:'ti mindre',fi:'kymmenen vähemmän'},
    cardOneMore:  {en:'one more',de:'eins mehr',fr:'un de plus',it:'uno in più',es:'uno más',pt:'um a mais',nl:'één meer',sv:'en mer',da:'en mere',no:'én mer',fi:'yksi enemmän'},
    cardOneLess:  {en:'one less',de:'eins weniger',fr:'un de moins',it:'uno in meno',es:'uno menos',pt:'um a menos',nl:'één minder',sv:'en mindre',da:'en mindre',no:'én mindre',fi:'yksi vähemmän'},
    cardLabel:    {en:'Day card',de:'Tageskarte',fr:'Carte du jour',it:'Scheda del giorno',es:'Tarjeta del día',pt:'Cartão do dia',nl:'Dagkaart',sv:'Dagens kort',da:'Dagens kort',no:'Dagens kort',fi:'Päiväkortti'},
    play:         {en:'Just pour',de:'Einfach gießen',fr:'Verser librement',it:'Versa e basta',es:'Solo verter',pt:'Só despejar',nl:'Gewoon gieten',sv:'Bara hälla',da:'Bare hælde',no:'Bare helle',fi:'Kaada vain'},
    playBack:     {en:'Back to the numbers',de:'Zurück zu den Zahlen',fr:'Retour aux nombres',it:'Torna ai numeri',es:'Volver a los números',pt:'Voltar aos números',nl:'Terug naar de getallen',sv:'Tillbaka till talen',da:'Tilbage til tallene',no:'Tilbake til tallene',fi:'Takaisin lukuihin'},
    playNote:     {en:'Pour and take back as you like. The day card counts for you.',de:'Gieß und nimm zurück, wie du willst. Die Tageskarte zählt für dich.',fr:'Verse et reprends comme tu veux. La carte du jour compte pour toi.',it:'Versa e riprendi come vuoi. La scheda del giorno conta per te.',es:'Vierte y regresa fichas como quieras. La tarjeta del día cuenta por ti.',pt:'Despeje e tire de volta como quiser. O cartão do dia conta para você.',nl:'Giet en neem terug zoveel je wilt. De dagkaart telt voor je.',sv:'Häll och ta tillbaka som du vill. Dagens kort räknar åt dig.',da:'Hæld og tag tilbage, som du vil. Dagens kort tæller for dig.',no:'Hell og ta tilbake som du vil. Dagens kort teller for deg.',fi:'Kaada ja ota takaisin miten haluat. Päiväkortti laskee puolestasi.'},
    setLevel:     {en:'Level',de:'Stufe',fr:'Niveau',it:'Livello',es:'Nivel',pt:'Nível',nl:'Niveau',sv:'Nivå',da:'Niveau',no:'Nivå',fi:'Taso'},
    teen:         {en:'Teen numbers',de:'Zahlen von 11 bis 19',fr:'Nombres de 11 à 19',it:'Numeri da 11 a 19',es:'Números del 11 al 19',pt:'Números de 11 a 19',nl:'Getallen van 11 tot en met 19',sv:'Talen 11–19',da:'Tallene 11-19',no:'Tallene 11–19',fi:'Luvut 11–19'},
    day:          {en:'Number of the day',de:'Zahl des Tages',fr:'Nombre du jour',it:'Numero del giorno',es:'Número del día',pt:'Número do dia',nl:'Getal van de dag',sv:'Dagens tal',da:'Dagens tal',no:'Dagens tall',fi:'Päivän luku'},
    setHelp:      {en:'Help',de:'Hilfe',fr:'Aide',it:'Aiuto',es:'Ayuda',pt:'Ajuda',nl:'Hulp',sv:'Hjälp',da:'Hjælp',no:'Hjelp',fi:'Apu'},
    helpMiss:     {en:'After a miss',de:'Nach einem Fehler',fr:'Après une erreur',it:'Dopo un errore',es:'Después de un error',pt:'Depois de um erro',nl:'Na een fout',sv:'Efter ett fel',da:'Efter en fejl',no:'Etter en feil',fi:'Virheen jälkeen'},
    helpAlways:   {en:'Always',de:'Immer',fr:'Toujours',it:'Sempre',es:'Siempre',pt:'Sempre',nl:'Altijd',sv:'Alltid',da:'Altid',no:'Alltid',fi:'Aina'}
  },

  defaults: { level: 'teen', help: 'miss' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'teen', labelKey: 'teen' }, { value: 'day', labelKey: 'day' }] },
    { key: 'help', type: 'choice', labelKey: 'setHelp', options: [{ value: 'miss', labelKey: 'helpMiss' }, { value: 'always', labelKey: 'helpAlways' }] }
  ],

  OK_MS: 1400, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._timers = []; this._ro = null; this._pourT = null; this._fx = {}; this._ok = null; this._note2 = null;
    injectOverflowTraysCSS();
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      if (ev.key === ' ' && document.activeElement === self._spout) { self._pourOne(); ev.preventDefault(); }
      else if (ev.key === 'Backspace') { self._takeBack(false); ev.preventDefault(); }
      else if ((ev.key === 's' || ev.key === 'S') && self._cur() && self._cur().level === 'day') { self._unseal(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._stopPour(); this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    var key = this._level();
    if (this._poolKey !== key) { this._pool = null; this._order = null; this._playing = false; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },

  /* ---------------- rounds ---------------- */
  _level: function () { return OverflowTraysCore.level(this.api && this.api.settings && this.api.settings.level); },
  _always: function () { return !!(this.api && this.api.settings && this.api.settings.help === 'always'); },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = OverflowTraysCore.rounds(key); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = OverflowTraysCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = OverflowTraysCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'overflow-trays.' + r.id,
      promptKey: r.level === 'teen' ? 'promptMake' : 'promptDay',
      promptArgs: { n: r.n, tens: Math.floor(r.n / 10), ones: r.n % 10 },
      celebrateKey: r.level === 'teen' ? 'okTeen' : 'celebrateDay',
      answerType: 'state',
      setup: function (tool) {
        tool._stopPour(); tool._clearTimers(); tool.st = OverflowTraysCore.newState(r); tool._round = r; tool._playing = false;
        tool._busy = false; tool._fx = {}; tool._ok = null; tool._note2 = null;
      },
      /* this activity presses Check itself when the round is complete */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },
  _word: function (n) { var W = typeof OverflowTraysWords !== 'undefined' ? OverflowTraysWords : null, l = (this.api && this.api.lang) || 'en'; l = String(l).slice(0, 2); return W && W[l] ? W[l][n] : (W ? W.en[n] : ''); },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    if (!this.st) { this._round = OverflowTraysCore.rounds('teen')[0]; this.st = OverflowTraysCore.newState(this._round); }
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'ot-wrap'); this._wrap = wrap;
    var stepLine = api.el('div', 'ot-step'); stepLine.setAttribute('aria-live', 'polite'); this._stepLine = stepLine; wrap.appendChild(stepLine);
    var body = api.el('div', 'ot-body'); this._body = body;
    var main = api.el('div', 'ot-main');

    /* the numeral card (teen) */
    var topRow = api.el('div', 'ot-toprow'); this._topRow = topRow; main.appendChild(topRow);
    var num = api.el('div', 'ot-num'); num.innerHTML = '<span class="ot-digits"><b class="ot-d1"></b><b class="ot-d2"></b></span><i class="ot-word"></i>'; this._num = num; topRow.appendChild(num);
    /* the tens shelf + the tray stack (day) */
    var shelfRow = api.el('div', 'ot-shelfrow'); this._shelfRow = shelfRow;
    /* the shelf is one tap target: a tap takes a sealed ten back */
    var shelf = api.el('button', 'ot-shelf'); shelf.type = 'button'; shelf.addEventListener('click', function () { self._unseal(shelf); }); this._shelf = shelf; shelfRow.appendChild(shelf);
    var tools = api.el('div', 'ot-tools'); this._tools = tools;
    var stack = api.el('button', 'ot-stack'); stack.type = 'button'; stack.innerHTML = '<i></i><i></i><i></i><b>+10</b>'; stack.addEventListener('click', function () { self._addTen(); }); this._stack = stack; tools.appendChild(stack);
    shelfRow.appendChild(tools);
    main.appendChild(shelfRow);
    /* the spout and the trays */
    var rig = api.el('div', 'ot-rig'); this._rig = rig;
    var spout = api.el('button', 'ot-spout'); spout.type = 'button';
    spout.innerHTML = '<svg viewBox="0 0 84 64" aria-hidden="true"><path d="M8 10 h48 a10 10 0 0 1 10 10 v8 l14 18 h-12 l-12 -12 h-48 z" fill="#F2784B" stroke="#2B3A36" stroke-width="3" stroke-linejoin="round"/><circle cx="22" cy="24" r="6" fill="#FFD3BF"/></svg>';
    this._bindSpout(spout); this._spout = spout; rig.appendChild(spout);
    var trays = api.el('div', 'ot-trays'); this._trays = trays;
    var t1 = this._makeTray('top'), chute = api.el('div', 'ot-chute'), t2 = this._makeTray('bottom');
    chute.setAttribute('aria-hidden', 'true'); this._t1 = t1; this._t2 = t2; this._chute = chute;
    var b1 = api.el('b', 'ot-badge ot-badge1'), b2 = api.el('b', 'ot-badge ot-badge2'); t1.appendChild(b1); t2.appendChild(b2); this._b1 = b1; this._b2 = b2;
    trays.appendChild(t1); trays.appendChild(chute); trays.appendChild(t2);
    rig.appendChild(trays);
    main.appendChild(rig);

    /* the day card */
    var side = api.el('div', 'ot-side'); this._side = side;
    var card = api.el('div', 'ot-card'); card.setAttribute('role', 'group'); this._card = card; side.appendChild(card);
    body.appendChild(main); body.appendChild(side);
    wrap.appendChild(body);
    var note = api.el('div', 'ot-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'ot-actions'); this._actions = row;
    var undo = api.el('button', 'ot-tool ot-undo'); undo.type = 'button'; undo.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9a8 8 0 1 1 1 9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M4 3v6h6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'; undo.addEventListener('click', function () { self._clear(); }); this._undo = undo; row.appendChild(undo);
    var chk = api.el('button', 'ot-check'); chk.type = 'button'; chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var playBtn = api.el('button', 'ot-tool ot-playbtn'); playBtn.type = 'button'; playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; row.appendChild(playBtn);
    wrap.appendChild(row);
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _makeTray: function (which) {
    var self = this, t = this.api.el('div', 'ot-tray ot-tray-' + which); t.setAttribute('role', 'group');
    var grid = this.api.el('div', 'ot-grid');
    for (var i = 0; i < 10; i++) (function (ci) {
      var c = self.api.el('button', 'ot-cell'); c.type = 'button'; c.setAttribute('data-i', String(ci));
      c.innerHTML = '<i class="ot-ctr"></i><b class="ot-num1"></b>';
      c.addEventListener('click', function () { self._tapCell(which, ci); });
      grid.appendChild(c);
    }(i));
    t.appendChild(grid);
    return t;
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var L = this._L = OverflowTraysCore.layout(this._width()), w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide'); w.classList.toggle('is-narrow', L.mode === 'narrow');
    /* on phones the day card (a record) goes under the actions, so Check stays on screen */
    if (this._side) { var cHost = L.mode === 'wide' ? this._body : this._wrap; if (this._side.parentNode !== cHost) cHost.appendChild(this._side); }
    w.style.setProperty('--ot-cell', L.cell + 'px'); w.style.setProperty('--ot-ctr', L.counter + 'px'); w.style.setProperty('--ot-side', L.side + 'px');
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this, C = OverflowTraysCore;
    if (!st || !this._wrap) return;
    var w = this._wrap, day = st.level === 'day', s = C.step(st);
    w.classList.toggle('is-day', day); w.classList.toggle('is-teen', !day);
    w.classList.toggle('is-play', !!st.explore); w.classList.toggle('is-done', !!st.done);
    /* where the spout sits: left of the trays (wide); on phones beside the numeral card (teen) or in the shelf row (day) */
    var sHost = this._L.mode === 'wide' ? this._rig : day ? this._tools : this._topRow;
    if (this._spout.parentNode !== sHost) { if (sHost === this._topRow) sHost.appendChild(this._spout); else sHost.insertBefore(this._spout, sHost.firstChild); }

    /* the step line (day): what to do with the number now */
    var sk = !st.explore && day ? C.stepKey(st) : null;
    var stepText = sk ? interp(t(sk), { n: st.n }) : '';
    if (this._stepLine.textContent !== stepText) this._stepLine.textContent = stepText;
    this._stepLine.hidden = !stepText;

    /* the numeral card (teen): numeral + its word; on success the digits part */
    this._num.hidden = day || !!st.explore;
    if (!day && st.n) {
      var sp = C.split(st.n);
      this._num.querySelector('.ot-d1').textContent = sp.tens; this._num.querySelector('.ot-d2').textContent = sp.ones;
      this._num.querySelector('.ot-word').textContent = this._word(st.n);
      this._num.classList.toggle('is-split', !!st.done);
    }

    var shape = C.dotted(st, this._always()), numbered = C.numbered(st);
    var tgt = s ? s.target : 0;
    /* the trays */
    if (!day) {
      this._t1.hidden = false; this._t2.hidden = false; this._chute.hidden = false;
      var tp = C.top(st), bt = C.bottom(st);
      this._paintTray(this._t1, tp, 'a', shape ? shape.top : 0, numbered ? 0 : -1, Math.min(tgt, 10), false);
      this._paintTray(this._t2, bt, 'b', shape ? shape.bottom : 0, numbered ? 10 : -1, Math.max(0, tgt - 10), false);
      this._t1.classList.toggle('is-full', tp === 10);
      this._chute.classList.toggle('is-open', tp === 10);
      this._t1.setAttribute('aria-label', t('topTray')); this._t2.setAttribute('aria-label', t('bottomTray'));
      this._b1.textContent = st.done ? C.split(st.n).tens : ''; this._b1.hidden = !st.done;
      this._b2.textContent = st.done ? C.split(st.n).ones : ''; this._b2.hidden = !st.done;
    } else {
      this._t2.hidden = true; this._chute.hidden = true; this._b1.hidden = true; this._b2.hidden = true;
      this._paintTray(this._t1, st.open, 'a', shape ? shape.open : 0, numbered && shape ? shape.sealed * 10 : -1, tgt % 10, true);
      this._t1.classList.remove('is-full');
      this._t1.setAttribute('aria-label', t('openTray'));
    }
    this._t1.classList.toggle('is-flash', !!this._fx.flash);
    /* the tens shelf (day): sealed bars, and dotted outlines for the bars the target still needs */
    this._shelfRow.hidden = !day;
    if (day) {
      var need = shape ? shape.sealed : 0, bars = Math.max(st.sealed, need), sh = '';
      for (var b = 0; b < bars; b++) {
        var isBar = b < st.sealed, extra = isBar && shape && b >= need;
        sh += isBar ? '<span class="ot-bar' + (extra ? ' is-extra' : '') + (this._fx.newBar && b === st.sealed - 1 ? ' is-new' : '') + '" data-b="' + b + '"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>'
          : '<span class="ot-bar is-dotted"></span>';
      }
      if (this._shelf.getAttribute('data-h') !== sh) { this._shelf.innerHTML = sh; this._shelf.setAttribute('data-h', sh); }
      this._shelf.disabled = st.done || this._busy || st.sealed < 1;
      this._shelf.setAttribute('aria-label', t('shelf') + ': ' + t('sealedBar'));
      this._stack.disabled = st.done || this._busy || st.sealed >= 9 || C.total(st) + 10 > C.MAX;
      this._stack.setAttribute('aria-label', t('stack')); this._stack.title = t('stack');
    }
    /* the spout */
    this._spout.disabled = !!st.done || this._busy;
    this._spout.setAttribute('aria-label', t('spout')); this._spout.title = t('spout');

    /* the day card: faces fill only after a Check proves them (free play: live) */
    var c = C.card(st, function (n) { return self._word(n); }), html = '';
    var box = function (v) { return '<b class="ot-box' + (v == null ? ' is-empty' : '') + '">' + (v == null ? '' : v) + '</b>'; };
    if (day || st.done || st.explore) {
      html += '<div class="ot-chead">' + (c.n == null ? (st.explore ? '' : '?') : c.n) + '</div>';
      html += '<div class="ot-crow"><span>' + esc(t('cardTens')) + '</span>' + box(c.n == null ? null : c.tens) + '<span>' + esc(t('cardOnes')) + '</span>' + box(c.n == null ? null : c.ones) + '</div>';
      html += '<div class="ot-cword' + (c.word ? '' : ' is-empty') + '">' + (c.word ? esc(c.word) : '') + '</div>';
      if (day) {
        html += '<div class="ot-crow"><span>' + esc(t('cardMore')) + '</span>' + box(c.more) + '</div>';
        html += '<div class="ot-crow"><span>' + esc(t('cardLess')) + '</span>' + box(c.less) + '</div>';
        if (!st.explore && this._round && this._round.steps.length > 3) {
          var k4 = this._round.steps[3].kind;
          html += '<div class="ot-crow"><span>' + esc(t(k4 === 'oneMore' ? 'cardOneMore' : 'cardOneLess')) + '</span>' + box(k4 === 'oneMore' ? c.oneMore : c.oneLess) + '</div>';
        }
      }
      if (c.tally) html += '<div class="ot-tally" aria-hidden="true">' + tally(c.tally) + '</div>';
    }
    if (this._card.getAttribute('data-h') !== html) { this._card.innerHTML = html; this._card.setAttribute('data-h', html); }
    this._card.setAttribute('aria-label', t('cardLabel'));
    this._side.hidden = !html;
    w.classList.toggle('is-noside', !html);

    /* the note */
    var h = st.explore ? { key: 'playNote' } : (this._note2 || C.hint(st)), text = '';
    if (this._ok) text = interp(t(this._ok.key), this._ok.args);
    else if (h) text = interp(t(h.key), h);
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !this._ok && !!(h && h.wrong));
    this._note.classList.toggle('is-good', !!this._ok);

    this._checkBtn.textContent = t('check'); this._checkBtn.hidden = !!st.explore || !!st.done; this._checkBtn.disabled = this._busy;
    this._undo.setAttribute('aria-label', t('undo')); this._undo.title = t('undo'); this._undo.disabled = this._busy || !!st.done || C.total(st) === 0;
    this._playBtn.textContent = t(st.explore ? 'playBack' : 'play'); this._playBtn.disabled = this._busy;
  },
  /* one tray: `n` counters in pour order; `need` dotted cells; numbered from `base` + 1 at miss 2 */
  _paintTray: function (tray, n, cls, need, base, tgtCells, day) {
    var t = this.api.t, st = this._cur(), shown = !!OverflowTraysCore.dotted(st, this._always());
    [].forEach.call(tray.querySelectorAll('.ot-cell'), function (c, i) {
      var full = i < n;
      c.classList.toggle('is-full', full); c.classList.toggle('is-a', full && cls === 'a'); c.classList.toggle('is-b', full && cls === 'b');
      c.classList.toggle('is-dotted', i < need);
      c.classList.toggle('is-extra', full && !!shown && i >= tgtCells);
      var lab = base >= 0 && i < need ? String(base + i + 1) : '';
      var nl = c.querySelector('.ot-num1'); nl.textContent = lab; nl.hidden = !lab;
      c.disabled = st.done;
      c.setAttribute('aria-label', full ? t('takeOne') : (day && n === 0 && st.sealed > 0 ? t('takeOne') : t(day ? 'openTray' : 'spout')));
    });
  },

  /* ---------------- the hand ---------------- */
  _bindSpout: function (b) {
    var self = this;
    b.addEventListener('pointerdown', function (ev) {
      if (b.disabled) return; ev.preventDefault();
      try { b.setPointerCapture(ev.pointerId); } catch (e) { /* older browsers */ }
      b.classList.add('is-tilt'); self._pourOne();
      self._stopPour();
      self._pourT = setInterval(function () { if (!self._pourOne()) self._stopPour(); }, OverflowTraysCore.POUR_MS);
    });
    var stop = function () { b.classList.remove('is-tilt'); self._stopPour(); };
    b.addEventListener('pointerup', stop); b.addEventListener('pointercancel', stop); b.addEventListener('lostpointercapture', stop);
    b.addEventListener('click', function (ev) { if (ev.detail === 0) self._pourOne(); }); /* keyboard Enter */
  },
  _stopPour: function () { if (this._pourT) { clearInterval(this._pourT); this._pourT = null; } },
  _pourOne: function () {
    var st = this._cur(), self = this;
    if (!st || st.done || this._busy) return false;
    var r = OverflowTraysCore.pour(st);
    if (!r) { this.api.sound(180); return false; }
    this._ok = null; this._note2 = null;
    var tot = OverflowTraysCore.total(st);
    this.api.sound(330 * Math.pow(2, ((tot - 1) % 10) / 12));
    if (r.filledTop || r.sealed) {
      this._fx.flash = true; this.api.sound(520);
      if (r.sealed) this._fx.newBar = true;
      this._later(function () { self._fx.flash = false; self._fx.newBar = false; self._paint(); }, this._ms(450));
    }
    this._paint();
    return true;
  },
  _tapCell: function (which, ci) {
    var st = this._cur(), C = OverflowTraysCore;
    if (!st || st.done || this._busy) return;
    if (st.level === 'day') {
      /* a counter: take the last one back · the empty open tray with tens on the shelf: break a ten · else pour */
      if (ci < st.open || (st.open === 0 && st.sealed > 0)) this._takeBack(false); else this._pourOne();
      return;
    }
    var full = which === 'top' ? ci < C.top(st) : ci < C.bottom(st);
    if (!full) { this._pourOne(); return; }
    this._takeBack(which === 'top');
  },
  _takeBack: function (fromTop) {
    var st = this._cur(), self = this;
    if (!st || st.done || this._busy) return;
    var r = OverflowTraysCore.takeBack(st, fromTop);
    if (!r) return;
    this._ok = null;
    if (r.refused) { this._note2 = { key: 'hintFull' }; bounce(this._t1, 'ot-shake'); this.api.sound(200); this._paint(); return; }
    this._note2 = null;
    if (r.broke) { this._note2 = null; bounce(this._t1, 'ot-crack'); this.api.sound(260); }
    else this.api.sound(300);
    this._paint();
    void self;
  },
  _addTen: function () {
    var st = this._cur(), self = this;
    if (!st || this._busy || !OverflowTraysCore.addTen(st)) { this.api.sound(180); bounce(this._stack, 'ot-wiggle'); return; }
    this._ok = null; this._note2 = null; this._fx.newBar = true; this.api.sound(196);
    this._later(function () { self._fx.newBar = false; self._paint(); }, this._ms(400));
    this._paint();
  },
  _unseal: function (el) {
    var st = this._cur();
    if (!st || this._busy) return;
    if (!OverflowTraysCore.unseal(st)) {
      if (el) bounce(el, 'ot-wiggle');
      this.api.sound(180);
      if (st.open > 0) { this._note2 = { key: 'hintSealed' }; this._paint(); }
      return;
    }
    this._ok = null; this._note2 = null; this.api.sound(250); this._paint();
  },
  _clear: function () { var st = this._cur(); if (!st || this._busy || !OverflowTraysCore.clear(st)) return; this._ok = null; this._note2 = null; this.api.sound(240); this._paint(); },
  _check: function () {
    var st = this.st, self = this, C = OverflowTraysCore;
    if (!st || this._busy || this._playing || st.done) return;
    this._stopPour();
    var res = C.check(st);
    if (!res) return;
    this._note2 = null;
    this.api.track('check', { id: st.id, result: res.result, step: st.step });
    if (res.result === 'empty') { this.api.sound(240); bounce(this._spout, 'ot-bob'); this._ok = null; this._paint(); return; }
    if (res.result !== 'ok') { this.api.sound(220); this._ok = null; this._paint(); return; }
    this._ok = C.success(st);
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    /* the step's sentence stays until the child's next move; the round's end hands over to the shell */
    this._paint();
    if (st.done) { this._busy = true; this._later(function () { self._busy = false; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS)); }
  },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy) return;
    this._stopPour(); this._ok = null; this._note2 = null;
    if (this._playing) { this._playing = false; this._paint(); return; }
    this._playing = true; this._play = OverflowTraysCore.newPlay();
    this._paint();
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }
/* the five-bar gate: four strokes and a diagonal per five */
function tally(n) {
  var h = '';
  for (var g = 0; g < Math.ceil(n / 5); g++) {
    var k = Math.min(5, n - g * 5), s = '<svg class="ot-gate" viewBox="0 0 40 36">';
    for (var i = 0; i < Math.min(4, k); i++) s += '<line x1="' + (6 + i * 8) + '" y1="4" x2="' + (6 + i * 8) + '" y2="32"/>';
    if (k === 5) s += '<line x1="2" y1="28" x2="36" y2="8"/>';
    h += s + '</svg>';
  }
  return h;
}

var otCssDone = false;
function injectOverflowTraysCSS() {
  if (otCssDone || typeof document === 'undefined') return;
  otCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.ot-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--ot-ink:#2B3A36;--ot-coral:#F2784B;--ot-teal:#2E9C88;--ot-cell:56px;--ot-ctr:46px;--ot-side:196px;}'
  + '.ot-step{align-self:center;font:800 22px/1.25 var(--lcs-font-display);color:var(--lcs-structure,#146B5E);text-align:center;} .ot-step[hidden]{display:none;}'
  + '.ot-body{display:flex;flex-direction:column;align-items:stretch;gap:10px;}'
  + '.ot-wrap.is-wide .ot-body{flex-direction:row;align-items:flex-start;justify-content:center;gap:16px;}'
  + '.ot-main{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:10px;}'
  /* the numeral card */
  + '.ot-num{display:flex;flex-direction:column;align-items:center;padding:6px 18px;border-radius:14px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--ot-ink),0 3px 0 #C9BFA8;} .ot-num[hidden]{display:none;}'
  + '.ot-digits{display:flex;gap:0;font:800 64px/1 var(--lcs-font-display);color:#146B5E;transition:gap .5s;} .ot-num.is-split .ot-digits{gap:28px;} .ot-num.is-split .ot-d1{color:#B58A2E;} .ot-num.is-split .ot-d2{color:var(--ot-teal);}'
  + '.ot-word{font:700 18px/1.2 var(--lcs-font-body);font-style:normal;color:var(--ot-ink);}'
  /* the spout + trays */
  + '.ot-rig{display:flex;align-items:flex-start;gap:6px;}'
  + '.ot-spout{flex:none;width:84px;height:64px;padding:0;border:0;background:none;cursor:pointer;touch-action:none;transform-origin:20% 60%;transition:transform .12s;} .ot-spout svg{width:100%;height:100%;display:block;} .ot-spout.is-tilt{transform:rotate(18deg);} .ot-spout:disabled{opacity:.45;cursor:default;}'
  + '.ot-spout.ot-bob{animation:ot-bobk .5s ease-in-out 2;} @keyframes ot-bobk{50%{transform:translateY(-6px);}}'
  + '.ot-trays{display:flex;flex-direction:column;align-items:flex-start;gap:0;}'
  + '.ot-tray{position:relative;padding:6px;border-radius:10px;background:#E3F1EC;box-shadow:inset 0 0 0 3px #146B5E;transition:box-shadow .2s;} .ot-tray[hidden]{display:none;}'
  + '.ot-tray.is-full{box-shadow:inset 0 0 0 3px #B58A2E;} .ot-tray.is-flash{animation:ot-shiver .2s linear 2;box-shadow:inset 0 0 0 4px #F2C14E,0 0 0 4px #FFE7A3;} @keyframes ot-shiver{25%{transform:translateX(-1.5px);}75%{transform:translateX(1.5px);}}'
  + '.ot-tray.ot-shake{animation:ot-shiver .2s linear 3;} .ot-tray.ot-crack{animation:ot-crackk .4s ease-out 1;} @keyframes ot-crackk{30%{transform:scale(1.03) rotate(-1deg);}}'
  + '.ot-grid{display:grid;grid-template-columns:repeat(5,var(--ot-cell));gap:6px;}'
  + '.ot-cell{position:relative;width:var(--ot-cell);height:var(--ot-cell);padding:0;border:0;border-radius:8px;background:#FFFBF2;box-shadow:inset 0 0 0 2px #C9BFA8;display:grid;place-items:center;cursor:pointer;}'
  + '.ot-cell:disabled{cursor:default;}'
  + '.ot-ctr{width:var(--ot-ctr);height:var(--ot-ctr);border-radius:50%;opacity:0;transform:scale(.4);transition:opacity .15s,transform .18s;}'
  + '.ot-cell.is-full .ot-ctr{opacity:1;transform:none;} .ot-cell.is-a .ot-ctr{background:var(--ot-coral);box-shadow:inset 0 0 0 3px #C95A31;} .ot-cell.is-b .ot-ctr{background:var(--ot-teal);box-shadow:inset 0 0 0 3px #1F7A69;}'
  + '.ot-cell.is-dotted{box-shadow:inset 0 0 0 2px #C9BFA8,0 0 0 2px #fff,0 0 0 4px #146B5E;outline:2px dashed #146B5E;outline-offset:-8px;}'
  + '.ot-cell.is-dotted.is-full{outline-color:transparent;}'
  + '.ot-cell.is-extra .ot-ctr{box-shadow:inset 0 0 0 3px #C95A31,0 0 0 4px rgba(242,120,75,.45),0 0 10px 4px rgba(242,120,75,.5);}'
  + '.ot-num1{position:absolute;z-index:2;font:800 14px/1 var(--lcs-font-display);color:var(--ot-ink);background:rgba(255,255,255,.85);border-radius:6px;padding:1px 3px;} .ot-num1[hidden]{display:none;}'
  + '.ot-chute{align-self:flex-end;width:18px;height:22px;margin:2px 22px 2px 0;border-radius:3px;background:#C9BFA8;transform:skewX(-18deg);transition:background .2s;} .ot-chute[hidden]{display:none;} .ot-chute.is-open{background:#F2C14E;box-shadow:0 0 0 2px #B58A2E;}'
  + '.ot-badge{position:absolute;right:-14px;top:-14px;z-index:3;min-width:34px;height:34px;border-radius:17px;display:grid;place-items:center;background:#F2C14E;color:var(--ot-ink);font:800 22px/1 var(--lcs-font-display);box-shadow:0 0 0 3px #fff;animation:ot-pop .5s ease-out both;} .ot-badge[hidden]{display:none;} .ot-badge2{background:#BDEDE3;}'
  + '@keyframes ot-pop{0%{transform:translateY(-30px) scale(.5);opacity:0;}70%{transform:translateY(3px) scale(1.08);opacity:1;}100%{transform:none;}}'
  /* the shelf + stack */
  + '.ot-shelfrow{display:flex;align-items:flex-end;gap:10px;} .ot-shelfrow[hidden]{display:none;}'
  + '.ot-shelf{flex:1;min-width:0;display:flex;flex-wrap:wrap;gap:4px;align-items:flex-end;min-height:84px;padding:4px 6px;border:0;border-bottom:5px solid #7A6A58;border-radius:8px 8px 0 0;background:transparent;cursor:pointer;} .ot-shelf:disabled{cursor:default;}'
  + '.ot-tools{display:flex;flex-direction:column;align-items:center;gap:6px;flex:none;}'
  + '.ot-wrap.is-wide .ot-shelfrow{align-self:stretch;}'
  + '.ot-bar{width:30px;height:76px;padding:4px 3px;box-sizing:border-box;border:0;border-radius:6px;background:#E3F1EC;box-shadow:inset 0 0 0 3px #146B5E;display:grid;grid-template-columns:repeat(2,1fr);gap:2px;cursor:pointer;}'
  + '.ot-bar i{width:9px;height:9px;border-radius:50%;background:var(--ot-coral);justify-self:center;align-self:center;}'
  + '.ot-bar.is-dotted{background:transparent;box-shadow:none;outline:2px dashed #146B5E;outline-offset:-3px;}'
  + '.ot-bar.is-extra{box-shadow:inset 0 0 0 3px #146B5E,0 0 0 3px rgba(242,120,75,.6);} .ot-bar.is-new{animation:ot-pop .4s ease-out both;}'
  + '.ot-bar.ot-wiggle,.ot-stack.ot-wiggle{animation:ot-shiver .2s linear 3;} .ot-bar:disabled{cursor:default;}'
  + '.ot-stack{position:relative;flex:none;width:64px;height:76px;padding:0;border:0;border-radius:10px;background:#F4EEE2;box-shadow:inset 0 0 0 2px var(--ot-ink);cursor:pointer;}'
  + '.ot-stack i{position:absolute;left:12px;right:12px;height:12px;border-radius:3px;background:#E3F1EC;box-shadow:inset 0 0 0 2px #146B5E;} .ot-stack i:nth-child(1){bottom:8px;} .ot-stack i:nth-child(2){bottom:22px;} .ot-stack i:nth-child(3){bottom:36px;}'
  + '.ot-stack b{position:absolute;left:0;right:0;top:4px;font:800 15px/1 var(--lcs-font-display);color:#146B5E;} .ot-stack:disabled{opacity:.45;cursor:default;}'
  /* the day card */
  + '.ot-side{display:flex;flex-direction:column;align-items:center;} .ot-side[hidden]{display:none;}'
  + '.ot-wrap.is-wide .ot-side{width:var(--ot-side);flex:none;}'
  + '.ot-card{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:14px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--ot-ink);display:flex;flex-direction:column;gap:6px;align-items:stretch;}'
  + '.ot-chead{text-align:center;font:800 48px/1 var(--lcs-font-display);color:#146B5E;}'
  + '.ot-crow{display:flex;align-items:center;justify-content:space-between;gap:6px;font:700 14px/1.1 var(--lcs-font-body);color:var(--ot-ink);}'
  + '.ot-box{min-width:44px;height:38px;padding:0 6px;box-sizing:border-box;border-radius:8px;display:grid;place-items:center;background:#fff;box-shadow:inset 0 0 0 2px var(--ot-ink);font:800 26px/1 var(--lcs-font-display);color:var(--ot-ink);}'
  + '.ot-box.is-empty{box-shadow:none;outline:2px dashed #8C9894;outline-offset:-2px;}'
  + '.ot-cword{min-height:22px;text-align:center;font:700 18px/1.2 var(--lcs-font-body);color:var(--ot-ink);} .ot-cword.is-empty{outline:2px dashed #C9BFA8;border-radius:6px;}'
  + '.ot-tally{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;} .ot-gate{width:40px;height:36px;} .ot-gate line{stroke:var(--ot-ink);stroke-width:3;stroke-linecap:round;}'
  + '.ot-wrap.is-narrow .ot-card{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:6px 12px;padding:6px 10px;}'
  + '.ot-wrap.is-narrow .ot-card{gap:4px 10px;padding:5px 8px;} .ot-wrap.is-narrow .ot-chead{font-size:28px;width:auto;} .ot-wrap.is-narrow .ot-crow{gap:4px;font-size:14px;} .ot-wrap.is-narrow .ot-box{min-width:36px;height:30px;font-size:20px;} .ot-wrap.is-narrow.is-teen .ot-chead,.ot-wrap.is-narrow.is-teen .ot-cword{display:none;}'
  + '.ot-wrap.is-narrow .ot-bar{width:19px;height:56px;padding:3px 1px;} .ot-wrap.is-narrow .ot-shelf{gap:3px;padding:4px 2px;} .ot-wrap.is-narrow .ot-bar i{width:6px;height:6px;} .ot-wrap.is-narrow .ot-shelf{min-height:64px;} .ot-wrap.is-narrow .ot-stack{height:56px;} .ot-wrap.is-narrow .ot-stack i:nth-child(3){display:none;}'
  + '.ot-wrap.is-narrow .ot-gate{width:30px;height:28px;} .ot-wrap.is-narrow .ot-crow{justify-content:flex-start;} .ot-wrap.is-narrow .ot-cword{width:100%;font-size:16px;}'
  + '.ot-wrap.is-narrow .ot-box{min-width:40px;height:32px;font-size:22px;}'
  /* the note + actions */
  + '.ot-note{box-sizing:border-box;align-self:center;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--ot-ink);text-align:center;} .ot-note[hidden]{display:none;}'
  + '.ot-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .ot-note.is-good{border-color:#C9A24A;background:#FFF6DA;font-family:var(--lcs-font-display);font-size:21px;font-weight:800;}'
  + '.ot-actions{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;}'
  + '.ot-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font:800 18px/1 var(--lcs-font-display);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .ot-check[hidden]{display:none;} .ot-check:disabled{opacity:.5;cursor:default;}'
  + '.ot-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .ot-tool:disabled{opacity:.45;cursor:default;}'
  + '.ot-undo{width:48px;padding:10px;} .ot-undo svg{width:100%;height:100%;display:block;}'
  + '.ot-spout:focus-visible,.ot-cell:focus-visible,.ot-bar:focus-visible,.ot-stack:focus-visible,.ot-check:focus-visible,.ot-tool:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.ot-wrap.is-narrow{gap:8px;} .ot-wrap.is-narrow .ot-note{font-size:15px;padding:6px 10px;} .ot-wrap.is-narrow .ot-step{font-size:19px;}'
  + '.ot-toprow{display:flex;align-items:center;justify-content:center;gap:14px;} .ot-wrap.is-narrow .ot-digits{font-size:52px;} .ot-wrap.is-narrow .ot-spout{width:64px;height:50px;align-self:flex-start;} .ot-wrap.is-narrow .ot-rig{flex-direction:column;align-items:center;gap:0;} .ot-wrap.is-narrow .ot-num{padding:2px 14px;}'
  + '@media (prefers-reduced-motion:reduce){.ot-ctr,.ot-tray,.ot-spout,.ot-badge,.ot-bar,.ot-digits{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'ot-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = OverflowTraysActivity;
if (typeof window !== 'undefined') window.OverflowTraysActivity = OverflowTraysActivity;
