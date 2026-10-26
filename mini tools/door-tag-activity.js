/* =====================================================================
   door-tag-activity.js — ACTIVITY #93 of the one-by-one rebuild:
   "Bo's Berry Pantry — Tens and Ones the Smart Way" → THE STRETCHING DOOR
   TAG (1.NBT.B.2, 11 locales). Design: docs/activities-rebuild/designs/093-bos-berry-pantry.md
   ---------------------------------------------------------------------
   THE INVENTION: Bo's door tag stretches apart into tens and ones — the
   hidden 0 rolls out behind the ones — and each part hangs over the crates
   or the berries it counts, while the crates crack open by tens. The child
   slings sealed crates (ten each) and berries onto the shelf (STOCK),
   writes the number of a stocked shelf on two wheels (LABEL, OVERFLOW) or
   hangs a tens plaque and a ones plaque (STRETCH).
   ACTIVITY LAYER ONLY: the model is door-tag-core.js; Bo (a rabbit) and the
   berries are library pictures via lcs-pictures.js; everything counted on
   the shelf (crates, berry beads) is drawn apparatus; lcs-shell.js
   untouched (the shell's Check is hidden and pressed by this activity when
   the shelf and the tag agree). Test seams: window.DoorTagActivity.st /
   ._pool / ._order / ._ensurePool / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var DoorTagActivity = {
  id: 'door-tag',
  apparatusClasses: ['sdt-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Bo’s Berry Pantry',de:'Bos Beerenkammer',nl:'Bo’s bessenkast',da:'Bos bærspisekammer',sv:'Bos bärskafferi',no:'Bos bærspiskammer',es:'La despensa de Bo',it:'La dispensa di Bo',pt:'A despensa do Bo',fr:'Le garde-manger de Bo',fi:'Bon marjakomero'},
    pStock:      {en:'Sling crates and berries to make {n}.',de:'Schieß Kisten und Beeren auf das Regal, bis es {n} sind.',nl:'Schiet kratten en bessen op de plank tot je {n} hebt.',da:'Skyd kasser og bær op på hylden, så det bliver {n}.',sv:'Skjut lådor och bär upp på hyllan så att det blir {n}.',no:'Skyt kasser og bær opp på hylla så det blir {n}.',es:'Lanza cajas y frutas al estante hasta tener {n}.',it:'Lancia cassette e frutti di bosco sullo scaffale fino a fare {n}.',pt:'Lance caixotes e frutinhas na prateleira até dar {n}.',fr:'Lance des caisses et des baies sur l’étagère pour faire {n}.',fi:'Linkoa laatikoita ja marjoja hyllylle, niin että niitä on {n}.'},
    pStockWords: {en:'Sling crates and berries to make the number on the card.',de:'Schieß Kisten und Beeren auf das Regal, bis es so viele sind, wie auf der Karte steht.',nl:'Schiet kratten en bessen op de plank tot je het getal op het kaartje hebt.',da:'Skyd kasser og bær op på hylden, så det bliver tallet på kortet.',sv:'Skjut lådor och bär upp på hyllan så att det blir talet på lappen.',no:'Skyt kasser og bær opp på hylla så det blir tallet på lappen.',es:'Lanza cajas y frutas al estante hasta tener el número de la tarjeta.',it:'Lancia cassette e frutti di bosco sullo scaffale fino a fare il numero del biglietto.',pt:'Lance caixotes e frutinhas na prateleira até dar o número do cartão.',fr:'Lance des caisses et des baies sur l’étagère pour faire le nombre de la carte.',fi:'Linkoa laatikoita ja marjoja hyllylle, niin että niitä on kortin luvun verran.'},
    pLabel:      {en:'How many berries are on the shelf? Write the number.',de:'Wie viele Beeren sind auf dem Regal? Schreib die Zahl.',nl:'Hoeveel bessen liggen er op de plank? Schrijf het getal.',da:'Hvor mange bær er der på hylden? Skriv tallet.',sv:'Hur många bär finns på hyllan? Skriv talet.',no:'Hvor mange bær er det på hylla? Skriv tallet.',es:'¿Cuántas frutas hay en el estante? Escribe el número.',it:'Quanti frutti di bosco ci sono sullo scaffale? Scrivi il numero.',pt:'Quantas frutinhas há na prateleira? Escreva o número.',fr:'Combien de baies y a-t-il sur l’étagère ? Écris le nombre.',fi:'Montako marjaa hyllyllä on? Kirjoita luku.'},
    pStretch:    {en:'Hang the plaques: how much is in the crates, how much in the bowl?',de:'Häng die Schilder auf: Wie viel ist in den Kisten, wie viel in der Schale?',nl:'Hang de bordjes op: hoeveel zit er in de kratten, hoeveel in de schaal?',da:'Hæng skiltene op: Hvor mange er der i kasserne, og hvor mange i skålen?',sv:'Häng upp skyltarna: hur många finns i lådorna och hur många i skålen?',no:'Heng opp skiltene: Hvor mange er det i kassene, og hvor mange i bollen?',es:'Cuelga los letreros: ¿cuántas hay en las cajas y cuántas en el tazón?',it:'Appendi le targhette: quanti sono nelle cassette e quanti nella ciotola?',pt:'Pendure as plaquinhas: quantas há nos caixotes e quantas na tigela?',fr:'Accroche les plaques : combien y en a-t-il dans les caisses, combien dans le bol ?',fi:'Ripusta kyltit: montako on laatikoissa ja montako kulhossa?'},
    pOverflow:   {en:'Some berries spilled. How many berries in all? Write the number.',de:'Ein paar Beeren sind herausgefallen. Wie viele Beeren sind es zusammen? Schreib die Zahl.',nl:'Er zijn bessen uit de schaal gerold. Hoeveel bessen zijn er samen? Schrijf het getal.',da:'Nogle bær er trillet ud. Hvor mange bær er der i alt? Skriv tallet.',sv:'Några bär har trillat ut. Hur många bär är det sammanlagt? Skriv talet.',no:'Noen bær har trillet ut. Hvor mange bær er det til sammen? Skriv tallet.',es:'Se salieron algunas frutas. ¿Cuántas frutas hay en total? Escribe el número.',it:'Alcuni frutti sono caduti fuori. Quanti frutti di bosco ci sono in tutto? Scrivi il numero.',pt:'Algumas frutinhas caíram para fora. Quantas frutinhas há ao todo? Escreva o número.',fr:'Des baies sont tombées. Combien y a-t-il de baies en tout ? Écris le nombre.',fi:'Osa marjoista on vierinyt pois kulhosta. Montako marjaa on yhteensä? Kirjoita luku.'},
    hintEmpty:   {en:'Sling crates and berries onto the shelf.',de:'Schieß Kisten und Beeren auf das Regal.',nl:'Schiet kratten en bessen op de plank.',da:'Skyd kasser og bær op på hylden.',sv:'Skjut lådor och bär upp på hyllan.',no:'Skyt kasser og bær opp på hylla.',es:'Lanza cajas y frutas al estante.',it:'Lancia cassette e frutti di bosco sullo scaffale.',pt:'Lance caixotes e frutinhas na prateleira.',fr:'Lance des caisses et des baies sur l’étagère.',fi:'Linkoa laatikoita ja marjoja hyllylle.'},
    hintWheels:  {en:'Turn the wheels to write the number.',de:'Dreh an den Rädern, um die Zahl zu schreiben.',nl:'Draai aan de wieltjes om het getal te schrijven.',da:'Drej på hjulene for at skrive tallet.',sv:'Vrid på hjulen för att skriva talet.',no:'Vri på hjulene for å skrive tallet.',es:'Gira las ruedas para escribir el número.',it:'Gira le rotelle per scrivere il numero.',pt:'Gire as rodinhas para escrever o número.',fr:'Tourne les roues pour écrire le nombre.',fi:'Pyöritä rullia ja kirjoita luku.'},
    hintHooks:   {en:'Hang a plaque on each hook.',de:'Häng an jeden Haken ein Schild.',nl:'Hang aan elk haakje een bordje.',da:'Hæng et skilt på hver krog.',sv:'Häng en skylt på varje krok.',no:'Heng et skilt på hver krok.',es:'Cuelga un letrero en cada gancho.',it:'Appendi una targhetta a ogni gancio.',pt:'Pendure uma plaquinha em cada gancho.',fr:'Accroche une plaque à chaque crochet.',fi:'Ripusta kyltti jokaiseen koukkuun.'},
    hintReverse: {en:'The left number is the crates — each crate is ten.',de:'Die linke Ziffer sind die Kisten – jede Kiste ist ein Zehner.',nl:'Het linkercijfer zijn de kratten — elk krat is tien.',da:'Det venstre ciffer er kasserne – hver kasse er ti.',sv:'Den vänstra siffran är lådorna – varje låda är tio.',no:'Det venstre sifferet er kassene – hver kasse er ti.',es:'La cifra de la izquierda son las cajas: cada caja vale diez.',it:'La cifra a sinistra sono le cassette: ogni cassetta vale dieci.',pt:'O algarismo da esquerda são os caixotes: cada caixote vale dez.',fr:'Le chiffre de gauche, ce sont les caisses : chaque caisse vaut dix.',fi:'Vasemmanpuoleinen numero kertoo laatikot – jokainen laatikko on kymmenen.'},
    hintFace:    {en:'The {t} in {n} means {t0} — {t} crates.',de:'Die {t} in {n} bedeutet {t0} – {t} Kisten.',nl:'De {t} in {n} betekent {t0} — {t} kratten.',da:'{t}-tallet i {n} betyder {t0} – {t} kasser.',sv:'{t}:an i {n} betyder {t0} – {t} lådor.',no:'{t}-tallet i {n} betyr {t0} – {t} kasser.',es:'El {t} de {n} vale {t0}: {t} cajas.',it:'La cifra {t} di {n} vale {t0}: {t} cassette.',pt:'O {t} de {n} vale {t0}: {t} caixotes.',fr:'Le {t} de {n} veut dire {t0} : {t} caisses.',fi:'Luvussa {n} numero {t} tarkoittaa lukua {t0} – {t} laatikkoa.'},
    hintFace1:   {en:'The 1 in {n} means 10 — one crate.',de:'Die 1 in {n} bedeutet 10 – eine Kiste.',nl:'De 1 in {n} betekent 10 — één krat.',da:'1-tallet i {n} betyder 10 – én kasse.',sv:'Ettan i {n} betyder 10 – en låda.',no:'1-tallet i {n} betyr 10 – én kasse.',es:'El 1 de {n} vale 10: una caja.',it:'La cifra 1 di {n} vale 10: una cassetta.',pt:'O 1 de {n} vale 10: um caixote.',fr:'Le 1 de {n} veut dire 10 : une caisse.',fi:'Luvussa {n} numero 1 tarkoittaa lukua 10 – yksi laatikko.'},
    hintCrateTen:{en:'Each crate holds ten berries. Count the crates by tens.',de:'In jeder Kiste sind zehn Beeren. Zähl die Kisten in Zehnerschritten.',nl:'In elk krat zitten tien bessen. Tel de kratten met sprongen van tien.',da:'Der er ti bær i hver kasse. Tæl kasserne i tiere.',sv:'Det är tio bär i varje låda. Räkna lådorna tio i taget.',no:'Det er ti bær i hver kasse. Tell kassene ti om gangen.',es:'En cada caja caben diez frutas. Cuenta las cajas de diez en diez.',it:'In ogni cassetta ci sono dieci frutti. Conta le cassette di dieci in dieci.',pt:'Cada caixote tem dez frutinhas. Conte os caixotes de dez em dez.',fr:'Chaque caisse contient dix baies. Compte les caisses de dix en dix.',fi:'Jokaisessa laatikossa on kymmenen marjaa. Laske laatikot kymmenen kerrallaan.'},
    hintOverflow:{en:'Ten loose berries make a crate.',de:'Zehn lose Beeren ergeben eine Kiste.',nl:'Tien losse bessen vullen een krat.',da:'Ti løse bær bliver til en kasse.',sv:'Tio lösa bär blir en låda.',no:'Ti løse bær blir en kasse.',es:'Diez frutas sueltas llenan una caja.',it:'Dieci frutti sfusi riempiono una cassetta.',pt:'Dez frutinhas soltas enchem um caixote.',fr:'Dix baies en vrac font une caisse.',fi:'Kymmenen irtomarjaa täyttää laatikon.'},
    hintStrong:  {en:'Count the crates by tens, then the berries by ones.',de:'Zähl die Kisten in Zehnerschritten, dann die Beeren einzeln.',nl:'Tel de kratten met sprongen van tien, en dan de bessen één voor één.',da:'Tæl kasserne i tiere og så bærrene ét ad gangen.',sv:'Räkna lådorna tio i taget och sedan bären ett i taget.',no:'Tell kassene ti om gangen og så bærene ett om gangen.',es:'Cuenta las cajas de diez en diez y luego las frutas de una en una.',it:'Conta le cassette di dieci in dieci, poi i frutti uno alla volta.',pt:'Conte os caixotes de dez em dez e depois as frutinhas de uma em uma.',fr:'Compte les caisses de dix en dix, puis les baies une par une.',fi:'Laske laatikot kymmenen kerrallaan ja sitten marjat yksi kerrallaan.'},
    okBuild:     {en:'{t} crates and {o} berries: {t0} + {o} = {n}!',de:'{t} Kisten und {o} Beeren: {t0} + {o} = {n}!',nl:'{t} kratten en {o} bessen: {t0} + {o} = {n}!',da:'{t} kasser og {o} bær: {t0} + {o} = {n}!',sv:'{t} lådor och {o} bär: {t0} + {o} = {n}!',no:'{t} kasser og {o} bær: {t0} + {o} = {n}!',es:'{t} cajas y {o} frutas: {t0} + {o} = {n}.',it:'{t} cassette e {o} frutti: {t0} + {o} = {n}!',pt:'{t} caixotes e {o} frutinhas: {t0} + {o} = {n}!',fr:'{t} caisses et {o} baies : {t0} + {o} = {n} !',fi:'{t} laatikkoa ja {o} marjaa: {t0} + {o} = {n}!'},
    okBuild1:    {en:'1 crate and {o} berries: 10 + {o} = {n}!',de:'1 Kiste und {o} Beeren: 10 + {o} = {n}!',nl:'1 krat en {o} bessen: 10 + {o} = {n}!',da:'1 kasse og {o} bær: 10 + {o} = {n}!',sv:'1 låda och {o} bär: 10 + {o} = {n}!',no:'1 kasse og {o} bær: 10 + {o} = {n}!',es:'1 caja y {o} frutas: 10 + {o} = {n}.',it:'1 cassetta e {o} frutti: 10 + {o} = {n}!',pt:'1 caixote e {o} frutinhas: 10 + {o} = {n}!',fr:'1 caisse et {o} baies : 10 + {o} = {n} !',fi:'1 laatikko ja {o} marjaa: 10 + {o} = {n}!'},
    okDecade:    {en:'{t} crates and no loose berries: {n}!',de:'{t} Kisten und keine einzelnen Beeren: {n}!',nl:'{t} kratten en geen losse bessen: {n}!',da:'{t} kasser og ingen løse bær: {n}!',sv:'{t} lådor och inga lösa bär: {n}!',no:'{t} kasser og ingen løse bær: {n}!',es:'{t} cajas y ninguna fruta suelta: {n}.',it:'{t} cassette e nessun frutto sfuso: {n}!',pt:'{t} caixotes e nenhuma frutinha solta: {n}!',fr:'{t} caisses et aucune baie en vrac : {n} !',fi:'{t} laatikkoa eikä yhtään irtomarjaa: {n}!'},
    okPack:      {en:'Bo packed ten berries into a crate: {n}!',de:'Bo hat zehn Beeren in eine Kiste gepackt: {n}!',nl:'Bo heeft tien bessen in een krat gedaan: {n}!',da:'Bo har pakket ti bær i en kasse: {n}!',sv:'Bo packade tio bär i en låda: {n}!',no:'Bo pakket ti bær i en kasse: {n}!',es:'Bo guardó diez frutas en una caja: {n}.',it:'Bo ha messo dieci frutti in una cassetta: {n}!',pt:'Bo guardou dez frutinhas num caixote: {n}!',fr:'Bo a rangé dix baies dans une caisse : {n} !',fi:'Bo pakkasi kymmenen marjaa laatikkoon: {n}!'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setCard:     {en:'Order card',de:'Bestellkarte',nl:'Bestelkaartje',da:'Bestillingskort',sv:'Beställningslapp',no:'Bestillingslapp',es:'Tarjeta del pedido',it:'Biglietto dell’ordine',pt:'Cartão do pedido',fr:'Carte de commande',fi:'Tilauskortti'},
    cNum:        {en:'Numerals',de:'Ziffern',nl:'Cijfers',da:'Cifre',sv:'Siffror',no:'Sifre',es:'Con cifras',it:'In cifre',pt:'Com algarismos',fr:'En chiffres',fi:'Numeroina'},
    cWords:      {en:'Number words',de:'Zahlwörter',nl:'Getallen in woorden',da:'Talord',sv:'Räkneord',no:'Tallord',es:'Con letras',it:'In lettere',pt:'Por extenso',fr:'En lettres',fi:'Lukusanoina'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    r50:         {en:'To 50',de:'Bis 50',nl:'Tot 50',da:'Op til 50',sv:'Upp till 50',no:'Til 50',es:'Hasta 50',it:'Fino a 50',pt:'Até 50',fr:'Jusqu’à 50',fi:'50 asti'},
    r99:         {en:'To 99',de:'Bis 99',nl:'Tot 99',da:'Op til 99',sv:'Upp till 99',no:'Til 99',es:'Hasta 99',it:'Fino a 99',pt:'Até 99',fr:'Jusqu’à 99',fi:'99 asti'},
    ariaDeck:    {en:'Crate deck: {k} crates',de:'Kistenregal: {k} Kisten',nl:'Kratplank: {k} kratten',da:'Kassehylde: {k} kasser',sv:'Lådhylla: {k} lådor',no:'Kassehylle: {k} kasser',es:'Repisa de cajas: {k} cajas',it:'Ripiano delle cassette: {k} cassette',pt:'Prateleira dos caixotes: {k} caixotes',fr:'Étagère des caisses : {k} caisses',fi:'Laatikkohylly: {k} laatikkoa'},
    ariaBowl:    {en:'Berry bowl: {k} berries, {s} spilled',de:'Beerenschale: {k} Beeren, {s} herausgefallen',nl:'Bessenschaal: {k} bessen, {s} eruit gerold',da:'Bærskål: {k} bær, {s} trillet ud',sv:'Bärskål: {k} bär, {s} har trillat ut',no:'Bærbolle: {k} bær, {s} trillet ut',es:'Tazón de frutas: {k} frutas, {s} se salieron',it:'Ciotola dei frutti: {k} frutti, {s} caduti fuori',pt:'Tigela das frutinhas: {k} frutinhas, {s} caíram para fora',fr:'Bol des baies : {k} baies, {s} tombées',fi:'Marjakulho: {k} marjaa, {s} vierinyt pois'},
    ariaTag:     {en:'Door tag {n}',de:'Türschild {n}',nl:'Deurbordje {n}',da:'Dørskilt {n}',sv:'Dörrskylt {n}',no:'Dørskilt {n}',es:'Letrero de la puerta {n}',it:'Targhetta della porta {n}',pt:'Plaquinha da porta {n}',fr:'Plaque de la porte {n}',fi:'Ovikyltti {n}'},
    ariaWheelT:  {en:'Tens wheel: {d}',de:'Zehnerrad: {d}',nl:'Tientallenwiel: {d}',da:'Tierhjul: {d}',sv:'Tiotalshjul: {d}',no:'Tierhjul: {d}',es:'Rueda de las decenas: {d}',it:'Rotella delle decine: {d}',pt:'Rodinha das dezenas: {d}',fr:'Roue des dizaines : {d}',fi:'Kymmenten rulla: {d}'},
    ariaWheelO:  {en:'Ones wheel: {d}',de:'Einerrad: {d}',nl:'Eenhedenwiel: {d}',da:'Enerhjul: {d}',sv:'Entalshjul: {d}',no:'Enerhjul: {d}',es:'Rueda de las unidades: {d}',it:'Rotella delle unità: {d}',pt:'Rodinha das unidades: {d}',fr:'Roue des unités : {d}',fi:'Ykkösten rulla: {d}'},
    ariaUp:      {en:'Up',de:'Hoch',nl:'Omhoog',da:'Op',sv:'Upp',no:'Opp',es:'Subir',it:'Su',pt:'Para cima',fr:'Monter',fi:'Ylös'},
    ariaDown:    {en:'Down',de:'Runter',nl:'Omlaag',da:'Ned',sv:'Ner',no:'Ned',es:'Bajar',it:'Giù',pt:'Para baixo',fr:'Descendre',fi:'Alas'},
    ariaCrates:  {en:'Crates: tap to load',de:'Kisten: tippen zum Laden',nl:'Kratten: tik om te laden',da:'Kasser: tryk for at lade',sv:'Lådor: tryck för att ladda',no:'Kasser: trykk for å lade',es:'Cajas: toca para cargar',it:'Cassette: tocca per caricare',pt:'Caixotes: toque para carregar',fr:'Caisses : touche pour charger',fi:'Laatikot: lataa napauttamalla'},
    ariaBasket:  {en:'Berries: tap to load',de:'Beeren: tippen zum Laden',nl:'Bessen: tik om te laden',da:'Bær: tryk for at lade',sv:'Bär: tryck för att ladda',no:'Bær: trykk for å lade',es:'Frutas: toca para cargar',it:'Frutti di bosco: tocca per caricare',pt:'Frutinhas: toque para carregar',fr:'Baies : touche pour charger',fi:'Marjat: lataa napauttamalla'},
    ariaPouch:   {en:'Sling: pull back or tap to let go',de:'Schleuder: zurückziehen oder antippen zum Loslassen',nl:'Katapult: trek terug of tik om los te laten',da:'Slangebøsse: træk tilbage eller tryk for at slippe',sv:'Slangbella: dra bakåt eller tryck för att släppa',no:'Sprettert: dra bakover eller trykk for å slippe',es:'Resortera: jala hacia atrás o toca para soltar',it:'Fionda: tira indietro o tocca per lanciare',pt:'Estilingue: puxe para trás ou toque para soltar',fr:'Lance-pierre : tire en arrière ou touche pour lâcher',fi:'Ritsa: vedä taakse tai napauta ja päästä irti'},
    ariaTakeCrate:{en:'Take back a crate',de:'Eine Kiste zurücknehmen',nl:'Een krat terugnemen',da:'Tag en kasse tilbage',sv:'Ta tillbaka en låda',no:'Ta tilbake en kasse',es:'Quitar una caja',it:'Riprendi una cassetta',pt:'Tirar um caixote',fr:'Reprendre une caisse',fi:'Ota laatikko takaisin'},
    ariaTakeBerry:{en:'Take back a berry',de:'Eine Beere zurücknehmen',nl:'Een bes terugnemen',da:'Tag et bær tilbage',sv:'Ta tillbaka ett bär',no:'Ta tilbake et bær',es:'Quitar una fruta',it:'Riprendi un frutto',pt:'Tirar uma frutinha',fr:'Reprendre une baie',fi:'Ota marja takaisin'},
    ariaHookL:   {en:'Crate hook',de:'Kistenhaken',nl:'Krathaakje',da:'Kassekrog',sv:'Lådkrok',no:'Kassekrok',es:'Gancho de las cajas',it:'Gancio delle cassette',pt:'Gancho dos caixotes',fr:'Crochet des caisses',fi:'Laatikkokoukku'},
    ariaHookR:   {en:'Bowl hook',de:'Schalenhaken',nl:'Schaalhaakje',da:'Skålkrog',sv:'Skålkrok',no:'Bollekrok',es:'Gancho del tazón',it:'Gancio della ciotola',pt:'Gancho da tigela',fr:'Crochet du bol',fi:'Kulhokoukku'},
    ariaPlaque:  {en:'Plaque {v}',de:'Schild {v}',nl:'Bordje {v}',da:'Skilt {v}',sv:'Skylt {v}',no:'Skilt {v}',es:'Letrero {v}',it:'Targhetta {v}',pt:'Plaquinha {v}',fr:'Plaque {v}',fi:'Kyltti {v}'}
  },/*STRINGS-END*/

  /*WORDS-BEGIN*/WORDS: {   /* GENERATED by the build from scripts/worksheet-gen/lib/number-words.js — do not hand-edit */
    13: {en:'thirteen',de:'dreizehn',nl:'dertien',da:'tretten',sv:'tretton',no:'tretten',es:'trece',it:'tredici',pt:'treze',fr:'treize',fi:'kolmetoista'},
    28: {en:'twenty-eight',de:'achtundzwanzig',nl:'achtentwintig',da:'otteogtyve',sv:'tjugoåtta',no:'tjueåtte',es:'veintiocho',it:'ventotto',pt:'vinte e oito',fr:'vingt-huit',fi:'kaksikymmentäkahdeksan'},
    34: {en:'thirty-four',de:'vierunddreißig',nl:'vierendertig',da:'fireogtredive',sv:'trettiofyra',no:'trettifire',es:'treinta y cuatro',it:'trentaquattro',pt:'trinta e quatro',fr:'trente-quatre',fi:'kolmekymmentäneljä'},
    40: {en:'forty',de:'vierzig',nl:'veertig',da:'fyrre',sv:'fyrtio',no:'førti',es:'cuarenta',it:'quaranta',pt:'quarenta',fr:'quarante',fi:'neljäkymmentä'}
  },/*WORDS-END*/

  defaults: { card: 'num', numbers: '99' },
  settings: [
    { key: 'card', type: 'choice', labelKey: 'setCard', options: [{ value: 'num', labelKey: 'cNum' }, { value: 'words', labelKey: 'cWords' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '50', labelKey: 'r50' }, { value: '99', labelKey: 'r99' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._ammo = null; this._sel = null; this._rack = [];
    injectTagCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') ['forest creatures', 'fruits'].forEach(function (dir) { LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) { if (this.st) this._setPrompt(); this._paint(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return DoorTagCore.locale(((this.api && this.api.lang) || 'en')); },
  _range: function () { return DoorTagCore.rangeOf(this._setting('numbers')); },
  _card: function () { return DoorTagCore.cardOf(this._setting('card')); },
  _key: function () { return this._range(); },
  _word: function (n) { var w = this.WORDS[n]; return w ? (w[this._loc()] || w.en) : String(n); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = DoorTagCore.ids(this._range()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = DoorTagCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(this._range(), Math.random, prev).order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._promptText(C.round(this._range(), idx)) }; this._pa = pa;
    return {
      id: 'doortag.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    if (r.type === 'stock') return this._card() === 'words' ? this._t('pStockWords') : this._t('pStock', { n: r.n });
    return this._t(r.type === 'label' ? 'pLabel' : r.type === 'stretch' ? 'pStretch' : 'pOverflow');
  },
  _setPrompt: function () {
    var line = this._promptText(this.st.r); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },
  _start: function (idx, pos) {
    var C = DoorTagCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._ammo = null; this._sel = null; this._busy = false;
    this.st = C.newState(C.round(this._range(), idx));
    this._rack = this.st.r.rack ? C.rackOrder(this.st.r, Math.random) : [];
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(0, 0);
    this._render2();
    this._watchWidth();
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
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sdt-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="sdt-pantry"><div class="sdt-tagrow"></div><div class="sdt-countrow"></div><div class="sdt-shelf"><div class="sdt-deck"></div><div class="sdt-bowlcol"><div class="sdt-bowl"></div></div><div class="sdt-lip"></div></div></div><div class="sdt-rack" role="group"></div><div class="sdt-yard"></div><div class="sdt-foot"></div><p class="sdt-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) { self._keydown(e); });
    this._q = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _pic: function (dir, key, size, cls) {
    var th = this._pics[dir]; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = cls; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  _btn: function (cls, k, label, text) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (text != null) b.textContent = text; return b; },
  _bead: function (cls) { var d = document.createElement('span'); d.className = 'sdt-bead' + (cls ? ' ' + cls : ''); d.style.background = DoorTagCore.DATA.BEAD[this.st.r.berry]; return d; },
  _paint_: function () {
    if (!this._wrap) return;
    var C = DoorTagCore, st = this.st, r = st.r, sh = st.shelf, W = this._width(), L = C.layout(W), v = this._view, self = this, i;
    var shown = !!(v.checked && (st.show > 0 || st.done)), strong = st.show >= 2 && !st.done, cmp = shown && r.type === 'stock' && !st.done ? C.compare(st) : null;
    this._wrap.className = 'sdt-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.berry;
    /* ---- the tag row: the door tag (stock) / two wheels (label, overflow) / two hooks (stretch) ---- */
    var row = this._q('.sdt-tagrow'); row.innerHTML = '';
    var stretched = shown || !!v.hold, tagN = C.tagOf(st), counted = shown && v.step != null ? Math.min(v.step, 999) : null;
    if (r.type === 'stock') {
      var words = this._card() === 'words';
      var hideNum = words && !(st.show >= 2 || st.done);   /* in words mode the numeral stays hidden until the second miss — the child must read the word */
      var tag = this.api.el('div', 'sdt-tag' + (stretched ? ' is-stretched' : '') + (hideNum ? ' is-blank' : '') + (strong ? ' is-strong' : ''));
      tag.setAttribute('role', 'img'); tag.setAttribute('aria-label', this._t('ariaTag', { n: hideNum ? '' : r.n }));
      tag.innerHTML = '<span class="sdt-tpart is-tens"><b>' + r.t + '</b><i class="sdt-zero">0</i></span><span class="sdt-tpart is-ones"><b>' + r.o + '</b></span>';
      if (!st.done) tag.addEventListener('pointerdown', function (e) { if (self._busy) return; self._view.hold = true; self._paint(); var up = function () { document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); self._view.hold = false; self._paint(); }; document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up); e.preventDefault(); });
      row.appendChild(tag);
      if (words) { var card = this.api.el('div', 'sdt-card'); card.textContent = this._word(r.n); row.appendChild(card); }
    } else if (r.type === 'stretch') {
      ['left', 'right'].forEach(function (h) {
        var val = st.hooks[h], hk = self._btn('sdt-hook is-' + h + (val != null ? ' is-full' : '') + (self._sel != null ? ' is-open' : '') + (shown && !st.done && (h === 'left' ? val !== 10 * r.t : val !== r.o) ? ' is-wrong' : '') + (strong ? ' is-strong' : ''), 'hook-' + h, self._t(h === 'left' ? 'ariaHookL' : 'ariaHookR') + (val != null ? ': ' + val : ''));
        hk.innerHTML = '<span class="sdt-hookpin"></span>' + (val != null ? '<span class="sdt-plaque is-hung">' + val + '</span>' : '');
        hk.disabled = st.done; hk.addEventListener('click', function () { self._hookTap(h); });
        row.appendChild(hk);
      });
    } else {
      ['t', 'o'].forEach(function (w) {
        var off = shown && !st.done && (w === 't' ? st.wheels.t !== r.t : st.wheels.o !== r.o);
        var col = self.api.el('div', 'sdt-wheel is-' + w + (strong ? ' is-strong' : '') + (off ? ' is-off' : ''));
        var up = self._btn('sdt-wbtn', w + '-up', self._t('ariaUp'), '▲'), dn = self._btn('sdt-wbtn', w + '-down', self._t('ariaDown'), '▼');
        up.disabled = st.done || st.wheels[w] >= 9; dn.disabled = st.done || st.wheels[w] <= 0;
        up.addEventListener('click', function () { self._turn(w, 1); }); dn.addEventListener('click', function () { self._turn(w, -1); });
        var face = self.api.el('div', 'sdt-wface'); face.textContent = String(st.wheels[w]); face.setAttribute('role', 'img'); face.setAttribute('aria-label', self._t(w === 't' ? 'ariaWheelT' : 'ariaWheelO', { d: st.wheels[w] }));
        col.appendChild(up); col.appendChild(face); col.appendChild(dn); row.appendChild(col);
      });
      /* no grey total under the wheels: it would write the answer after one miss — the crate and berry counts below carry the push-back */
    }
    /* the stretched parts' counts land under them: the crate count over the deck, the berry count over the bowl */
    /* in LABEL and STRETCH rounds the shelf is given, so its counts ARE the answer: they appear only from the second miss (or when solved) */
    var countsOk = shown && (r.type === 'stock' || r.type === 'overflow' || st.show >= 2 || st.done);
    var crow = this._q('.sdt-countrow'); crow.innerHTML = ''; crow.style.display = countsOk ? '' : 'none';
    if (countsOk) {
      var crateN = 10 * sh.deck, berryN = C.loose(sh);
      var tens = r.type === 'stretch' ? st.hooks.left : r.type === 'stock' ? 10 * r.t : 10 * st.wheels.t, ones = r.type === 'stretch' ? st.hooks.right : r.type === 'stock' ? r.o : st.wheels.o;
      var cc = this.api.el('div', 'sdt-count is-tens' + (crateN === tens ? ' is-ok' : ' is-off')); cc.textContent = String(crateN); crow.appendChild(cc);
      var bc = this.api.el('div', 'sdt-count is-ones' + (berryN === ones ? ' is-ok' : ' is-off')); bc.textContent = String(berryN); crow.appendChild(bc);
    }
    /* ---- the crate deck ---- */
    var deck = this._q('.sdt-deck'); deck.innerHTML = ''; deck.setAttribute('role', 'img'); deck.setAttribute('aria-label', this._t('ariaDeck', { k: sh.deck }));
    var places = Math.max(r.deckMax, sh.deck);
    for (i = 0; i < places; i++) {
      var has = i < sh.deck, extra = cmp && has && i >= r.t, missing = cmp && !has && i < r.t;
      var last = has && i === sh.deck - 1 && r.type === 'stock' && !st.done;
      var cr = last ? this._btn('sdt-crate is-last', 'crate-last', this._t('ariaTakeCrate')) : this.api.el('div', 'sdt-crate');
      cr.className += has ? ' is-full' : ' is-place' + (missing ? ' is-missing' : '');
      if (extra) cr.className += ' is-extra';
      if (has && (strong || (shown && v.open))) { cr.className += ' is-open'; var fan = document.createElement('span'); fan.className = 'sdt-fan'; for (var b = 0; b < 10; b++) fan.appendChild(this._bead('is-mini')); cr.appendChild(fan); var ten = document.createElement('span'); ten.className = 'sdt-ten'; ten.textContent = '10'; cr.appendChild(ten); }
      else if (has) { var em = this._bead('is-emblem'); cr.appendChild(em); }
      if (last) { var hit = document.createElement('span'); hit.className = 'sdt-hit'; cr.appendChild(hit); cr.addEventListener('click', function () { self._takeBack('crate'); }); }
      deck.appendChild(cr);
    }
    /* ---- the bowl and the lip ---- */
    var bowl = this._q('.sdt-bowl'); bowl.innerHTML = ''; bowl.setAttribute('role', 'img'); bowl.setAttribute('aria-label', this._t('ariaBowl', { k: C.loose(sh), s: sh.lip }));
    var lastBerry = sh.lip ? null : sh.bowl - 1, nOnes = 0;
    for (i = 0; i < C.DIMPLES; i++) {
      var hasB = i < sh.bowl, extraB = cmp && hasB && i >= r.o, missB = cmp && !hasB && i < r.o;
      var isLastB = hasB && i === lastBerry && r.type === 'stock' && !st.done;
      var dm = isLastB ? this._btn('sdt-dimple is-last', 'berry-last', this._t('ariaTakeBerry')) : this.api.el('div', 'sdt-dimple');
      if (missB) dm.className += ' is-missing';
      if (hasB) { var bd = this._bead(extraB ? 'is-extra' : ''); dm.appendChild(bd); if (strong) { var nb = document.createElement('i'); nb.className = 'sdt-bnum'; nb.textContent = String(++nOnes); dm.appendChild(nb); } }
      if (isLastB) { var hitB = document.createElement('span'); hitB.className = 'sdt-hit'; dm.appendChild(hitB); dm.addEventListener('click', function () { self._takeBack('berry'); }); }
      bowl.appendChild(dm);
    }
    var lip = this._q('.sdt-lip'); lip.innerHTML = '';
    for (i = 0; i < sh.lip; i++) {
      var isLastL = i === sh.lip - 1 && r.type === 'stock' && !st.done;
      var lb = isLastL ? this._btn('sdt-spill is-last', 'berry-last', this._t('ariaTakeBerry')) : this.api.el('span', 'sdt-spill');
      var bl = this._bead((cmp && sh.bowl + i >= r.o) ? 'is-extra' : ''); lb.appendChild(bl);
      if (strong) { var nl = document.createElement('i'); nl.className = 'sdt-bnum'; nl.textContent = String(++nOnes); lb.appendChild(nl); }
      if (isLastL) lb.addEventListener('click', function () { self._takeBack('berry'); });
      lip.appendChild(lb);
    }
    lip.style.display = sh.lip ? '' : 'none';
    this._q('.sdt-pantry').className = 'sdt-pantry' + (st.done ? ' is-lit' : '');
    /* ---- the plaque rack (stretch) ---- */
    var rack = this._q('.sdt-rack'); rack.innerHTML = ''; rack.style.display = r.type === 'stretch' && !st.done ? '' : 'none';
    if (r.type === 'stretch') this._rack.forEach(function (val) {
      if (st.hooks.left === val || st.hooks.right === val) return;
      var pb = self._btn('sdt-plaque' + (self._sel === val ? ' is-sel' : ''), 'plaque-' + val, self._t('ariaPlaque', { v: val }), String(val));
      pb.setAttribute('aria-pressed', self._sel === val ? 'true' : 'false'); pb.disabled = st.done;
      pb.addEventListener('click', function () { self._sel = self._sel === val ? null : val; self._paint(); }); rack.appendChild(pb);
    });
    /* ---- the yard: Bo, the sling, the ammo ---- */
    var yard = this._q('.sdt-yard'); yard.innerHTML = '';
    var boSize = L.wide ? 120 : 72, berrySize = L.wide ? 96 : 64;
    var bo = this.api.el('span', 'sdt-bo'); var bp = this._pic(C.DATA.BO[0], C.DATA.BO[1], boSize, 'sdt-bopic'); if (bp) bo.appendChild(bp); bo.style.width = bo.style.height = boSize + 'px'; yard.appendChild(bo);
    if (r.type === 'stock') {
      var sling = this.api.el('div', 'sdt-sling');
      sling.innerHTML = '<svg viewBox="0 0 90 110" aria-hidden="true"><path d="M45 108 V62 M45 62 L18 18 M45 62 L72 18" class="sdt-fork"/><path d="M18 18 Q45 ' + (this._ammo ? 70 : 52) + ' 72 18" class="sdt-band"/></svg>';
      var pouch = this._btn('sdt-pouch' + (this._ammo ? ' is-loaded' : ''), 'pouch', this._t('ariaPouch'));
      if (this._ammo === 'crate') { var pc = this.api.el('span', 'sdt-crate is-full is-mini'); pc.appendChild(this._bead('is-emblem')); pouch.appendChild(pc); }
      else if (this._ammo === 'berry') { var pbb = this._pic('fruits', r.berry, L.wide ? 64 : 44, 'sdt-pouchpic'); if (pbb) pouch.appendChild(pbb); }
      pouch.disabled = st.done || !this._ammo || !!this._busy;
      pouch.addEventListener('pointerdown', function (e) { self._pull(e); });
      pouch.addEventListener('click', function () { if (self._pulled) return; self._fling(); });
      sling.appendChild(pouch); yard.appendChild(sling);
      var crates = this._btn('sdt-ammo is-crates' + (this._ammo === 'crate' ? ' is-sel' : ''), 'crates', this._t('ariaCrates'));
      for (i = 0; i < 3; i++) { var sc = this.api.el('span', 'sdt-crate is-full is-stack'); sc.appendChild(this._bead('is-emblem')); crates.appendChild(sc); }
      crates.disabled = st.done || !!this._busy; crates.addEventListener('click', function () { self._load('crate'); }); yard.appendChild(crates);
      var basket = this._btn('sdt-ammo is-basket' + (this._ammo === 'berry' ? ' is-sel' : ''), 'basket', this._t('ariaBasket'));
      var bpic = this._pic('fruits', r.berry, berrySize, 'sdt-basketpic'); if (bpic) basket.appendChild(bpic);
      var weave = this.api.el('span', 'sdt-weave'); basket.appendChild(weave);
      basket.disabled = st.done || !!this._busy; basket.addEventListener('click', function () { self._load('berry'); }); yard.appendChild(basket);
    } else {
      /* no sling in this round: Check stands between Bo and the basket (one row, so the round fits a phone) */
      if (!st.done) { var ck0 = this._btn('sdt-check', 'check', null, this._t('check')); ck0.disabled = !!this._busy; ck0.addEventListener('click', function () { self._check(); }); yard.appendChild(ck0); }
      if (!L.tiny) { var bk = this.api.el('span', 'sdt-ammo is-basket is-still'); var bkp = this._pic('fruits', r.berry, berrySize, 'sdt-basketpic'); if (bkp) bk.appendChild(bkp); var wv = this.api.el('span', 'sdt-weave'); bk.appendChild(wv); yard.appendChild(bk); }
    }
    /* ---- Check ---- */
    var foot = this._q('.sdt-foot'); foot.innerHTML = '';
    if (!st.done && r.type === 'stock') { var ck = this._btn('sdt-check', 'check', null, this._t('check')); ck.disabled = !!this._busy; ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck); }
    /* ---- the note ---- */
    var note = this._q('.sdt-note'), h = !this._busy ? C.hint(st) : null, t = '', cls = 'sdt-note';
    if (v.msg) { t = v.msg; cls += ' is-ok'; }
    else if (h) { var hk2 = h.key === 'hintFace' && r.t === 1 ? 'hintFace1' : h.key; t = this._t(hk2, h.args); cls += ' is-hint'; }
    note.className = cls; note.textContent = t;
  },

  /* ---------------- actions ---------------- */
  _edit: function () { this._clearTimers(); this._busy = false; this._view = {}; this._paint(); },
  _load: function (kind) {
    if (this._busy || this.st.done) return;
    if (this._ammo === kind) { this._fling(); return; }   /* a second tap on the same ammo lets it fly (the quick path) */
    this._ammo = kind; this.api.sound(kind === 'crate' ? 300 : 520); this._paint();
  },
  _fling: function () {
    var C = DoorTagCore, st = this.st, kind = this._ammo, self = this; if (!kind || this._busy || st.done) return;
    var res = C.fling(st, kind); if (!res) { this.api.sound(160); return; }
    this.api.sound(kind === 'crate' ? 240 : 620);
    if (this.FAST) { this._edit(); return; }
    /* the flight: the piece arcs from the pouch to its place on the shelf */
    var pouch = this._q('[data-k="pouch"]'), fromR = pouch && pouch.getBoundingClientRect();
    this._edit();
    var target = kind === 'crate' ? this._q('.sdt-deck').children[res.at] : res.to === 'bowl' ? this._q('.sdt-bowl').children[res.at] : this._q('.sdt-lip').children[res.at];
    if (!fromR || !target) return;
    var toR = target.getBoundingClientRect(), fly = document.createElement('div'); fly.className = 'sdt-fly' + (kind === 'crate' ? ' is-crate' : '');
    fly.appendChild(this._bead()); fly.style.left = (fromR.left + fromR.width / 2) + 'px'; fly.style.top = (fromR.top + fromR.height / 2) + 'px'; document.body.appendChild(fly);
    target.style.visibility = 'hidden';
    requestAnimationFrame(function () { fly.style.transform = 'translate(' + (toR.left + toR.width / 2 - fromR.left - fromR.width / 2) + 'px,' + (toR.top + toR.height / 2 - fromR.top - fromR.height / 2) + 'px)'; });
    this._later(function () { fly.remove(); target.style.visibility = ''; }, 460);
  },
  /* pull the pouch back (down-left) and let go: the loaded piece flies */
  _pull: function (e) {
    if (this._busy || this.st.done || !this._ammo) return;
    var self = this, sx = e.clientX, sy = e.clientY, pouch = e.currentTarget, far = false;
    this._pulled = false;
    var move = function (ev) { var dx = ev.clientX - sx, dy = ev.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 10) far = true; pouch.style.transform = 'translate(' + Math.max(-40, Math.min(10, dx)) + 'px,' + Math.max(-10, Math.min(40, dy)) + 'px)'; ev.preventDefault(); };
    var up = function () { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up); pouch.style.transform = ''; if (far) { self._pulled = true; setTimeout(function () { self._pulled = false; }, 60); self._fling(); } };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _takeBack: function (kind) { if (this._busy) return; if (DoorTagCore.takeBack(this.st, kind)) { this.api.sound(380); this._edit(); } },
  _turn: function (w, d) { if (this._busy) return; if (DoorTagCore.turn(this.st, w, d)) { this.api.sound(500 + this.st.wheels[w] * 30); this._edit(); } },
  _hookTap: function (h) {
    var C = DoorTagCore, st = this.st; if (this._busy || st.done) return;
    if (this._sel != null) { var v = this._sel; this._sel = null; if (C.hang(st, h, v)) { this.api.sound(560); this._edit(); } else this._paint(); return; }
    if (st.hooks[h] != null) { var back = st.hooks[h]; if (C.hang(st, h, null)) { this._sel = back; this._edit(); } }
  },
  _keydown: function (e) {
    var k = e.key, st = this.st; if (st.r.type !== 'stock' || st.done) return;
    if (k === 'c' || k === 'C') { this._ammo = 'crate'; this._fling(); e.preventDefault(); }
    else if (k === 'b' || k === 'B') { this._ammo = 'berry'; this._fling(); e.preventDefault(); }
    else if (k === 'Backspace') { this._takeBack(); e.preventDefault(); }
  },
  _check: function () {
    var C = DoorTagCore, st = this.st, r = st.r, self = this;
    if (this._busy || st.done) return;
    this._sel = null;
    var a = C.check(st); if (!a) return;
    if (a.result === 'none') { this._view = {}; this.api.sound(200); this._paint(); this.api.announce(this._q('.sdt-note').textContent || ''); return; }
    this._view = { checked: true, step: 0 };
    var finish = function () {
      self._view.step = 999; self._view.open = false; self._busy = false;
      if (a.result === 'ok') {
        var msg = self._okText(r); self._view.msg = msg; self.api.sound(880); self._paint(); self.api.announce(msg);
        self._advance(msg.length * 60 + 2400);
      } else { self.api.sound(220); self._paint(); self.api.announce(self._q('.sdt-note').textContent || ''); }
    };
    if (this.FAST) { finish(); return; }
    /* the crack-count: crates open one by one (ten each), then the berries hop */
    this._busy = true; this._view.open = true; this._paint();
    var n = a.run.length, k = 0;
    var tick = function () { k++; self._view.step = k; self.api.sound(380 + Math.min(k, 30) * 18); self._paint(); if (k >= n) self._later(finish, 500); else self._later(tick, k < st.shelf.deck ? 260 : 150); };
    this._later(n ? tick : finish, 450);
  },
  _okText: function (r) {
    var st = this.st;
    if (st.packed) return this._t('okPack', { n: r.n });
    if (r.o === 0) return this._t('okDecade', { t: r.t, n: r.n });
    if (r.t === 1) return this._t('okBuild1', { o: r.o, n: r.n });
    return this._t('okBuild', { t: r.t, o: r.o, t0: 10 * r.t, n: r.n });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var sdtCssDone = false;
function injectTagCSS() {
  if (sdtCssDone || typeof document === 'undefined') return;
  sdtCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sdt-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .sdt-wrap:focus{outline:none;}'
  /* the pantry: a wooden cupboard front; the tag row and the shelf share two columns (deck | bowl) so the tag's parts hang over what they count */
  + '.sdt-pantry{width:100%;max-width:660px;box-sizing:border-box;padding:12px 14px 14px;border-radius:16px;background:#C98F55;box-shadow:inset 0 0 0 3px #3A2E1F,inset 0 0 0 7px #146B5E;transition:box-shadow .4s;} .sdt-pantry.is-lit{box-shadow:inset 0 0 0 3px #3A2E1F,inset 0 0 0 7px #146B5E,0 0 0 6px #FFE38A;}'
  + '.sdt-tagrow,.sdt-countrow,.sdt-shelf{display:grid;grid-template-columns:62% 38%;align-items:end;} .sdt-tagrow{position:relative;min-height:84px;}'
  + '.sdt-tag{grid-column:1 / span 2;justify-self:center;position:relative;display:flex;align-items:center;justify-content:center;width:180px;height:72px;border-radius:12px;background:linear-gradient(#F3D77C,#D8B24A);box-shadow:inset 0 0 0 3px #7A5A10,0 4px 0 #8A6A1E;font-family:' + H + ';font-weight:800;font-size:52px;color:#3A2E1F;cursor:grab;touch-action:none;transition:width .45s;}'
  + '.sdt-tpart{display:inline-flex;align-items:center;transition:transform .45s;} .sdt-tpart b{font-weight:800;} .sdt-zero{font-style:normal;max-width:0;overflow:hidden;opacity:0;transition:max-width .45s,opacity .45s;}'
  + '.sdt-tag.is-stretched{width:100%;background:transparent;box-shadow:none;justify-content:space-between;} .sdt-tag.is-stretched .sdt-zero{max-width:1em;opacity:1;}'
  + '.sdt-tag.is-stretched{display:grid;grid-template-columns:62% 38%;} .sdt-tag.is-stretched .sdt-tpart{justify-self:center;padding:0 14px;border-radius:12px;background:linear-gradient(#F3D77C,#D8B24A);box-shadow:inset 0 0 0 3px #7A5A10,0 4px 0 #8A6A1E;}'
  + '.sdt-tag.is-blank .sdt-tpart{visibility:hidden;} .sdt-tag.is-strong .is-tens{box-shadow:inset 0 0 0 4px #146B5E;} .sdt-tag.is-strong .is-ones{box-shadow:inset 0 0 0 4px #E0603A;}'
  + '.sdt-card{position:absolute;right:0;top:-6px;padding:4px 10px;border-radius:6px;background:#FFFDF7;box-shadow:0 2px 6px rgba(0,0,0,.25);transform:rotate(3deg);font-family:' + B + ';font-weight:800;font-size:20px;color:#3A2E1F;max-width:46%;text-align:center;line-height:1.15;}'
  + '.sdt-countrow{margin-top:6px;} .sdt-count{justify-self:center;padding:0 10px;border-radius:9px;font-family:' + H + ';font-weight:800;font-size:22px;line-height:28px;} .sdt-count.is-ones{grid-column:2;} .sdt-count.is-ok{background:#E4F4EF;color:#146B5E;box-shadow:inset 0 0 0 2px #1E8A78;} .sdt-count.is-off{background:#FDE3D8;color:#B5461F;box-shadow:inset 0 0 0 2px #E0603A;}'
   + '.sdt-wheel{display:flex;flex-direction:column;align-items:center;gap:4px;justify-self:center;} .sdt-wheel.is-o{grid-column:2;} .sdt-wheel.is-t{grid-column:1;}'
  + '.sdt-wbtn{width:48px;height:44px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42;font-size:18px;color:#3A2E1F;cursor:pointer;} .sdt-wbtn:disabled{opacity:.4;cursor:default;}'
  + '.sdt-wface{width:72px;height:72px;border-radius:12px;background:linear-gradient(#F3D77C,#D8B24A);box-shadow:inset 0 0 0 3px #7A5A10;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:46px;color:#3A2E1F;}'
  + '.sdt-wheel.is-off .sdt-wface{box-shadow:inset 0 0 0 4px #E0603A;background:#FDE3D8;}'
 + '.sdt-wheel.is-strong.is-t .sdt-wface{box-shadow:inset 0 0 0 4px #146B5E;} .sdt-wheel.is-strong.is-o .sdt-wface{box-shadow:inset 0 0 0 4px #E0603A;}'
   + '.sdt-hook{position:relative;justify-self:center;min-width:120px;height:72px;border:0;border-radius:12px;background:rgba(255,253,247,.35);box-shadow:inset 0 0 0 2px #7A5A10;cursor:pointer;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;} .sdt-hook.is-right{grid-column:2;} .sdt-hook.is-left{grid-column:1;}'
  + '.sdt-hook.is-open{box-shadow:inset 0 0 0 3px #146B5E;} .sdt-hook.is-wrong .sdt-plaque{box-shadow:inset 0 0 0 3px #E0603A;background:#FDE3D8;} .sdt-hookpin{position:absolute;top:6px;left:50%;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#7A5A10;}'
  + '.sdt-plaque{min-width:100px;height:48px;padding:0 10px;border:0;border-radius:10px;background:linear-gradient(#F3D77C,#D8B24A);box-shadow:inset 0 0 0 3px #7A5A10,0 3px 0 #8A6A1E;font-family:' + H + ';font-weight:800;font-size:30px;color:#3A2E1F;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;} .sdt-plaque.is-sel{transform:translateY(-5px);box-shadow:inset 0 0 0 3px #146B5E,0 6px 0 #8FC9BC;}'
  + '.sdt-rack{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;}'
  + '.sdt-shelf{margin-top:10px;padding:8px 6px 10px;border-radius:10px;background:#B07A44;box-shadow:inset 0 -6px 0 #7A5230;}'
  + '.sdt-deck{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-content:flex-end;min-height:96px;}'
  + '.sdt-crate{position:relative;width:38px;height:92px;box-sizing:border-box;border-radius:5px;display:flex;align-items:center;justify-content:center;padding:0;border:0;} .sdt-crate.is-place{background:transparent;box-shadow:inset 0 0 0 2px rgba(58,46,31,.25);}'
  + '.sdt-crate.is-full{background:repeating-linear-gradient(0deg,#D9A465 0 14px,#B9824A 14px 16px);box-shadow:inset 0 0 0 3px #3A2E1F;} .sdt-crate.is-last{cursor:pointer;}'
  + '.sdt-crate.is-missing{box-shadow:inset 0 0 0 3px #3A2E1F;border:3px dashed #FFFDF7;background:rgba(255,253,247,.25);} .sdt-crate.is-extra{box-shadow:inset 0 0 0 3px #E0603A,0 0 10px #E0603A;}'
  + '.sdt-crate.is-open{background:#FFF1D6;} .sdt-fan{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;} .sdt-ten{position:absolute;bottom:2px;left:50%;transform:translateX(-50%);font-family:' + H + ';font-weight:800;font-size:13px;line-height:14px;color:#146B5E;} .sdt-crate.is-open{align-items:flex-start;padding-top:4px;} .sdt-wrap.is-narrow .sdt-bead.is-mini{width:7px;height:7px;} .sdt-wrap.is-narrow .sdt-ten{font-size:11px;line-height:12px;bottom:1px;}'
  + '.sdt-bead{display:block;width:30px;height:30px;border-radius:50%;box-shadow:inset 0 0 0 2px #3A2E1F,inset 6px 6px 0 -3px rgba(255,255,255,.55);} .sdt-bead.is-mini{width:12px;height:12px;box-shadow:inset 0 0 0 1.5px #3A2E1F;} .sdt-bead.is-emblem{width:28px;height:28px;} .sdt-bead.is-extra{box-shadow:inset 0 0 0 3px #E0603A,0 0 8px #E0603A;}'
  + '.sdt-bowlcol{display:flex;flex-direction:column;align-items:center;gap:4px;} .sdt-bowl{display:grid;grid-template-columns:repeat(3,44px);gap:3px;padding:6px;border-radius:0 0 40px 40px;background:#E9D9BE;box-shadow:inset 0 0 0 3px #3A2E1F;}'
  + '.sdt-dimple{position:relative;width:44px;height:44px;border:0;padding:0;border-radius:50%;background:#D6C2A0;box-shadow:inset 0 3px 0 rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;} .sdt-dimple .sdt-bead{width:36px;height:36px;} .sdt-dimple.is-last{cursor:pointer;} .sdt-dimple.is-missing{box-shadow:inset 0 0 0 3px #FFFDF7;background:#E9D9BE;}'
  + '.sdt-bnum{position:absolute;font-style:normal;font-family:' + H + ';font-weight:800;font-size:16px;color:#FFFDF7;text-shadow:0 0 3px #000;}'
  + '.sdt-lip{grid-column:1 / span 2;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:2px;margin-top:4px;padding:2px 6px;border-top:3px solid #7A5230;} .sdt-spill{position:relative;width:30px;height:30px;border:0;padding:0;background:transparent;display:flex;align-items:center;justify-content:center;} .sdt-spill .sdt-bead{width:26px;height:26px;} .sdt-wrap.is-narrow .sdt-spill{width:22px;height:22px;} .sdt-wrap.is-narrow .sdt-spill .sdt-bead{width:20px;height:20px;} .sdt-wrap.is-narrow .sdt-spill.is-last{width:44px;height:44px;} .sdt-spill.is-last{width:44px;height:44px;cursor:pointer;}'
  + '.sdt-yard{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:nowrap;} .sdt-bo{display:block;flex:none;} .sdt-bopic{display:block;transform:scaleX(-1);}'
  + '.sdt-sling{position:relative;width:96px;height:112px;flex:none;} .sdt-sling svg{position:absolute;inset:0;width:100%;height:100%;} .sdt-fork{fill:none;stroke:#7A5230;stroke-width:8;stroke-linecap:round;} .sdt-band{fill:none;stroke:#8C3B2E;stroke-width:3;}'
  + '.sdt-pouch{position:absolute;left:50%;top:44px;width:72px;height:56px;margin-left:-36px;border:0;border-radius:14px;background:rgba(122,82,48,.25);box-shadow:inset 0 0 0 3px #7A5230;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;} .sdt-pouch.is-loaded{background:#E9D9BE;} .sdt-pouch:disabled{cursor:default;}'
  + '.sdt-crate.is-mini{width:24px;height:44px;} .sdt-crate.is-mini .sdt-bead{width:16px;height:16px;} .sdt-crate.is-stack{width:22px;height:52px;} .sdt-crate.is-stack .sdt-bead{width:14px;height:14px;}'
  + '.sdt-ammo{position:relative;min-width:72px;min-height:72px;border:0;border-radius:14px;background:rgba(255,253,247,.6);box-shadow:inset 0 0 0 2px #C9B79A;display:flex;align-items:flex-end;justify-content:center;gap:2px;padding:6px;cursor:pointer;} .sdt-ammo.is-sel{box-shadow:inset 0 0 0 3px #1E8A78;background:#E4F4EF;} .sdt-ammo:disabled{cursor:default;opacity:.7;}'
  + '.sdt-ammo.is-basket{flex-direction:column;align-items:center;gap:0;} .sdt-basketpic{display:block;position:relative;z-index:1;} .sdt-weave{display:block;width:84px;height:26px;margin-top:-14px;border-radius:0 0 22px 22px;background:repeating-linear-gradient(90deg,#C99B5E 0 8px,#A8783F 8px 10px);box-shadow:inset 0 0 0 2px #6B4A26;} .sdt-ammo.is-still{cursor:default;}'
  + '.sdt-fly{position:fixed;z-index:60;width:36px;height:36px;margin:-18px 0 0 -18px;transition:transform .42s cubic-bezier(.3,-.4,.5,1);pointer-events:none;} .sdt-fly .sdt-bead{width:36px;height:36px;} .sdt-fly.is-crate{border-radius:5px;background:#D9A465;box-shadow:inset 0 0 0 3px #3A2E1F;display:flex;align-items:center;justify-content:center;} .sdt-fly.is-crate .sdt-bead{width:22px;height:22px;}'
  + '.sdt-check{min-height:52px;padding:6px 28px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;} .sdt-check:disabled{opacity:.5;cursor:default;}'
  + '.sdt-hit{position:absolute;left:50%;top:50%;width:44px;height:max(44px,100%);transform:translate(-50%,-50%);}'   /* the take-back target: never smaller than 44 px, whatever the crate or dimple measures */
 + '.sdt-wrap button:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.sdt-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .sdt-note:empty{display:none;} .sdt-note.is-hint{color:#B5461F;} .sdt-note.is-ok{color:#146B5E;}'
  /* phones: crates in two rows of five, smaller tag and wheels */
  + '.sdt-wrap.is-narrow .sdt-deck{max-width:200px;margin:0 auto;} .sdt-wrap.is-narrow .sdt-crate:not(.is-mini):not(.is-stack){width:32px;height:54px;} .sdt-wrap.is-tiny .sdt-crate:not(.is-mini):not(.is-stack){width:29px;height:50px;} .sdt-wrap.is-tiny .sdt-deck{gap:2px;} .sdt-wrap.is-narrow .sdt-crate .sdt-bead.is-emblem{width:22px;height:22px;}'
  + '.sdt-wrap.is-narrow .sdt-bowl{grid-template-columns:repeat(3,34px);gap:2px;padding:4px;} .sdt-wrap.is-narrow .sdt-dimple{width:34px;height:34px;} .sdt-wrap.is-narrow .sdt-dimple .sdt-bead{width:28px;height:28px;} .sdt-wrap.is-narrow .sdt-dimple.is-last{width:34px;height:34px;}'
  + '.sdt-wrap.is-narrow .sdt-tag{width:140px;height:58px;font-size:40px;} .sdt-wrap.is-narrow .sdt-wface{width:58px;height:56px;font-size:36px;} .sdt-wrap.is-narrow .sdt-tagrow{min-height:66px;} .sdt-wrap.is-narrow .sdt-card{font-size:16px;}'
  + '.sdt-wrap.is-narrow .sdt-hook{min-width:96px;height:58px;} .sdt-wrap.is-narrow .sdt-plaque{min-width:72px;height:44px;font-size:24px;} .sdt-wrap.is-narrow .sdt-note{font-size:17px;} .sdt-wrap.is-narrow .sdt-pantry{padding:10px 8px 12px;}'
  + '.sdt-wrap.is-narrow .sdt-tag.is-stretched{width:100%;} .sdt-wrap.is-narrow .sdt-tag.is-stretched .sdt-tpart{padding:0 8px;}'
  + '.sdt-wrap.is-narrow .sdt-sling{width:80px;height:96px;} .sdt-wrap.is-narrow .sdt-pouch{top:36px;width:64px;height:52px;margin-left:-32px;} .sdt-wrap.is-narrow .sdt-yard{gap:8px;} .sdt-wrap.is-narrow .sdt-weave{width:66px;}'
  + '.sdt-wrap.is-tiny .sdt-tagrow,.sdt-wrap.is-tiny .sdt-countrow,.sdt-wrap.is-tiny .sdt-shelf,.sdt-wrap.is-tiny .sdt-tag.is-stretched{grid-template-columns:58% 42%;}'   /* the smallest phones: the bowl needs its column */
 + '.sdt-wrap.is-tiny .sdt-crate:not(.is-mini):not(.is-stack){width:28px;} .sdt-wrap.is-tiny .sdt-bowl{grid-template-columns:repeat(3,30px);} .sdt-wrap.is-tiny .sdt-dimple{width:30px;height:30px;} .sdt-wrap.is-tiny .sdt-dimple .sdt-bead{width:25px;height:25px;} .sdt-wrap.is-tiny .sdt-dimple.is-last{width:30px;height:30px;}'
 + '.sdt-wrap.is-tiny .sdt-yard{gap:4px;} .sdt-wrap.is-tiny .sdt-sling{width:70px;} .sdt-wrap.is-tiny .sdt-ammo{min-width:64px;padding:4px;} .sdt-wrap.is-tiny .sdt-crate.is-stack{width:16px;} .sdt-wrap.is-tiny .sdt-weave{width:58px;}'
 + '.sdt-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.sdt-note,.sdt-foot,.sdt-yard{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.sdt-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'sdt-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.DoorTagActivity = DoorTagActivity;
