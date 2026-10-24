/* =====================================================================
   one-hop-activity.js — ACTIVITY #100 of the one-by-one rebuild:
   "Inchie's Garden Path" → THE ONE-HOP HELPERS (1.MD.A.2, 11 locales).
   Design: docs/activities-rebuild/designs/100-lay-units.md
   ---------------------------------------------------------------------
   THE INVENTION: Inchie can only hop exactly ONE helper long. The child
   lays identical helpers end to end under the object, from the start
   stone at its tip, then taps them to count — each tap is one hop. A gap,
   an overlap, a helper of another size, a crooked start or a helper past
   the end makes her land in the wrong place (in the soil, on a bump,
   mid-helper), where everyone can see it. Only a clean row lets her reach
   the end; then the child writes how many hops it took.
   ACTIVITY LAYER ONLY: the model is one-hop-core.js; the bed, path, stone,
   helpers, pots, label, keypad and footprints are drawn apparatus; the
   objects and Inchie (spring/worm) are library pictures via
   lcs-pictures.js, scaled so each object's INK is exactly its length in
   units (no picture is rotated); lcs-shell.js untouched (the shell's Check
   is hidden and pressed by this activity when the round is right).
   Test seams: window.OneHopActivity.st / ._pool / ._order / ._ensurePool /
   ._start / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var OneHopActivity = {
  id: 'one-hop',
  apparatusClasses: ['oh-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:      {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:         {en:'Inchie\'s Garden Path',de:'Inchies Gartenweg',nl:'Inchie\'s tuinpad',da:'Inchies havesti',sv:'Mätis trädgårdsstig',no:'Inchies hagesti',es:'El sendero de Inchie',it:'Il sentiero del giardino di Inchie',pt:'O caminho do jardim de Inchie',fr:'Le chemin du jardin d’Inchie',fi:'Inchien puutarhapolku'},
    name:          {en:'Inchie',de:'Inchie',nl:'Inchie',da:'Inchie',sv:'Mätis',no:'Inchie',es:'Inchie',it:'Inchie',pt:'Inchie',fr:'Inchie',fi:'Inchie'},
    tLay:          {en:'Lay helpers from the stone to the end. Then tap them to count.',de:'Leg Helfer vom Stein bis zum Ende. Tippe sie dann an und zähle.',nl:'Leg helpertjes van de steen tot het einde. Tik ze dan aan om te tellen.',da:'Læg hjælpere fra stenen til enden. Tryk så på dem for at tælle.',sv:'Lägg hjälpare från stenen till slutet. Tryck sedan på dem för att räkna.',no:'Legg hjelpere fra steinen til enden. Trykk så på dem for å telle.',es:'Pon ayudantes desde la piedra hasta el final. Luego tócalos para contar.',it:'Metti gli aiutanti dal sasso fino alla fine. Poi toccali per contarli.',pt:'Coloque ajudantes da pedra até o fim. Depois toque neles para contar.',fr:'Pose des bâtonnets de la pierre jusqu’au bout. Puis touche-les pour compter.',fi:'Laita apureita kivestä loppuun asti. Napauta niitä sitten ja laske.'},
    tFix:          {en:'Something is wrong with these helpers. Fix them, then tap to count.',de:'Mit diesen Helfern stimmt etwas nicht. Bring sie in Ordnung und tippe sie dann zum Zählen an.',nl:'Er klopt iets niet met deze helpertjes. Maak het goed en tik ze dan aan om te tellen.',da:'Der er noget galt med de her hjælpere. Ret dem, og tryk så på dem for at tælle.',sv:'Något är fel med de här hjälparna. Rätta till dem och tryck sedan på dem för att räkna.',no:'Noe er galt med disse hjelperne. Rett dem opp, og trykk så på dem for å telle.',es:'Algo está mal con estos ayudantes. Arréglalos y luego tócalos para contar.',it:'C’è qualcosa che non va in questi aiutanti. Sistemali, poi toccali per contarli.',pt:'Tem algo errado com estes ajudantes. Arrume-os e depois toque neles para contar.',fr:'Quelque chose ne va pas avec ces bâtonnets. Répare-les, puis touche-les pour compter.',fi:'Näissä apureissa on jotain vikaa. Korjaa ne ja napauta niitä sitten laskeaksesi.'},
    tJudge:        {en:'Tap each stone to send {name} along a row. Then tap the right row.',de:'Tippe auf jeden Stein, dann hüpft {name} eine Reihe entlang. Tippe dann auf die richtige Reihe.',nl:'Tik op elke steen, dan hupt {name} langs een rij. Tik dan op de goede rij.',da:'Tryk på hver sten, så hopper {name} hen ad en række. Tryk så på den rigtige række.',sv:'Tryck på varje sten så hoppar {name} längs en rad. Tryck sedan på rätt rad.',no:'Trykk på hver stein, så hopper {name} langs en rad. Trykk så på riktig rad.',es:'Toca cada piedra y {name} brincará por una fila. Luego toca la fila correcta.',it:'Tocca ogni sasso e {name} salterà lungo una fila. Poi tocca la fila giusta.',pt:'Toque em cada pedra e {name} pula ao longo de uma fileira. Depois toque na fileira certa.',fr:'Touche chaque pierre : {name} saute le long d’une rangée. Puis touche la bonne rangée.',fi:'Napauta jokaista kiveä, niin {name} hyppii riviä pitkin. Napauta sitten oikeaa riviä.'},
    tOrder:        {en:'Measure all three, one at a time.',de:'Miss alle drei, einen nach dem anderen.',nl:'Meet ze alle drie, één voor één.',da:'Mål alle tre, én ad gangen.',sv:'Mät alla tre, en i taget.',no:'Mål alle tre, én om gangen.',es:'Mide los tres, uno por uno.',it:'Misura tutti e tre, uno alla volta.',pt:'Meça os três, um de cada vez.',fr:'Mesure les trois, l’un après l’autre.',fi:'Mittaa kaikki kolme yksi kerrallaan.'},
    tOrder2:       {en:'Now put them in order, shortest first.',de:'Ordne sie jetzt: das Kürzeste zuerst.',nl:'Zet ze nu op volgorde, de kortste eerst.',da:'Sæt dem nu i rækkefølge, den korteste først.',sv:'Sätt dem nu i ordning, den kortaste först.',no:'Sett dem nå i rekkefølge, den korteste først.',es:'Ahora ordénalos, primero el más corto.',it:'Ora mettili in ordine, prima il più corto.',pt:'Agora coloque-os em ordem, o mais curto primeiro.',fr:'Maintenant, range-les, le plus court d’abord.',fi:'Laita ne nyt järjestykseen, lyhin ensin.'},
    tBig:          {en:'Measure with big helpers first.',de:'Miss zuerst mit großen Helfern.',nl:'Meet eerst met grote helpertjes.',da:'Mål først med store hjælpere.',sv:'Mät först med stora hjälpare.',no:'Mål først med store hjelpere.',es:'Primero mide con ayudantes grandes.',it:'Prima misura con gli aiutanti grandi.',pt:'Primeiro meça com ajudantes grandes.',fr:'Mesure d’abord avec de grands bâtonnets.',fi:'Mittaa ensin isoilla apureilla.'},
    tBig2:         {en:'Now measure with small helpers.',de:'Miss jetzt mit kleinen Helfern.',nl:'Meet nu met kleine helpertjes.',da:'Mål nu med små hjælpere.',sv:'Mät nu med små hjälpare.',no:'Mål nå med små hjelpere.',es:'Ahora mide con ayudantes chicos.',it:'Ora misura con gli aiutanti piccoli.',pt:'Agora meça com ajudantes pequenos.',fr:'Mesure maintenant avec de petits bâtonnets.',fi:'Mittaa nyt pienillä apureilla.'},
    hintHop:       {en:'Tap the helpers so {name} can hop to the end.',de:'Tippe die Helfer an, damit {name} bis zum Ende hüpfen kann.',nl:'Tik op de helpertjes, dan kan {name} tot het einde huppen.',da:'Tryk på hjælperne, så {name} kan hoppe hen til enden.',sv:'Tryck på hjälparna så att {name} kan hoppa till slutet.',no:'Trykk på hjelperne, så {name} kan hoppe til enden.',es:'Toca los ayudantes para que {name} brinque hasta el final.',it:'Tocca gli aiutanti così {name} può saltare fino alla fine.',pt:'Toque nos ajudantes para {name} pular até o fim.',fr:'Touche les bâtonnets pour que {name} saute jusqu’au bout.',fi:'Napauta apureita, niin {name} voi hypätä loppuun asti.'},
    hintWrite:     {en:'Write how many hops it took.',de:'Schreib auf, wie viele Hüpfer es waren.',nl:'Schrijf op hoeveel hupjes het waren.',da:'Skriv, hvor mange hop det tog.',sv:'Skriv hur många hopp det blev.',no:'Skriv hvor mange hopp det tok.',es:'Escribe cuántos brincos fueron.',it:'Scrivi quanti salti ci sono voluti.',pt:'Escreva quantos pulos foram.',fr:'Écris combien de sauts il a fallu.',fi:'Kirjoita, montako hyppyä siihen tarvittiin.'},
    hintCount1:    {en:'Count {name}\'s hops again — one hop for each helper.',de:'Zähl {name}s Hüpfer noch einmal – ein Hüpfer für jeden Helfer.',nl:'Tel de hupjes van {name} nog eens: één hupje voor elk helpertje.',da:'Tæl {name}s hop igen – ét hop for hver hjælper.',sv:'Räkna hoppen igen – ett hopp för varje hjälpare.',no:'Tell hoppene igjen – ett hopp for hver hjelper.',es:'Cuenta otra vez los brincos de {name}: un brinco por cada ayudante.',it:'Conta di nuovo i salti di {name}: un salto per ogni aiutante.',pt:'Conte de novo os pulos de {name}: um pulo para cada ajudante.',fr:'Compte encore les sauts de {name} : un saut pour chaque bâtonnet.',fi:'Laske hypyt uudelleen: yksi hyppy jokaista apuria kohti.'},
    hintCount2:    {en:'Touch each helper and say its number out loud.',de:'Tippe jeden Helfer an und sag laut seine Zahl.',nl:'Tik elk helpertje aan en zeg hardop het getal.',da:'Tryk på hver hjælper, og sig tallet højt.',sv:'Tryck på varje hjälpare och säg talet högt.',no:'Trykk på hver hjelper og si tallet høyt.',es:'Toca cada ayudante y di su número en voz alta.',it:'Tocca ogni aiutante e di’ il suo numero ad alta voce.',pt:'Toque em cada ajudante e diga o número dele em voz alta.',fr:'Touche chaque bâtonnet et dis son nombre à voix haute.',fi:'Kosketa jokaista apuria ja sano sen numero ääneen.'},
    hintPickTrack: {en:'Tap the row you choose.',de:'Tippe auf die Reihe, die du wählst.',nl:'Tik op de rij die je kiest.',da:'Tryk på den række, du vælger.',sv:'Tryck på raden du väljer.',no:'Trykk på raden du velger.',es:'Toca la fila que eliges.',it:'Tocca la fila che scegli.',pt:'Toque na fileira que você escolher.',fr:'Touche la rangée que tu choisis.',fi:'Napauta riviä, jonka valitset.'},
    hintJudge1:    {en:'Send {name} along each row and watch where {name} lands.',de:'Schick {name} jede Reihe entlang und schau, wo {name} landet.',nl:'Stuur {name} langs elke rij en kijk waar {name} landt.',da:'Send {name} hen ad hver række, og se, hvor {name} lander.',sv:'Skicka {name} längs varje rad och titta var {name} landar.',no:'Send {name} langs hver rad og se hvor {name} lander.',es:'Manda a {name} por cada fila y mira dónde cae.',it:'Manda {name} lungo ogni fila e guarda dove atterra.',pt:'Mande {name} por cada fileira e veja onde cai.',fr:'Envoie {name} le long de chaque rangée et regarde où {name} atterrit.',fi:'Lähetä {name} jokaista riviä pitkin ja katso, mihin hyppy osuu.'},
    hintJudge2:    {en:'Only one row lets {name} reach the end.',de:'Nur in einer Reihe kommt {name} bis zum Ende.',nl:'Maar in één rij komt {name} tot het einde.',da:'Kun i én række når {name} helt hen til enden.',sv:'Bara en rad låter {name} komma ända till slutet.',no:'Bare én rad lar {name} komme helt til enden.',es:'Solo en una fila {name} llega hasta el final.',it:'Solo in una fila {name} arriva fino alla fine.',pt:'Só em uma fileira {name} chega até o fim.',fr:'Une seule rangée permet à {name} d’arriver au bout.',fi:'Vain yhdellä rivillä {name} pääsee loppuun asti.'},
    hintFill:      {en:'Put all three on the shelf.',de:'Stell alle drei auf das Regal.',nl:'Zet ze alle drie op de plank.',da:'Sæt alle tre på hylden.',sv:'Sätt alla tre på hyllan.',no:'Sett alle tre på hylla.',es:'Pon los tres en el estante.',it:'Metti tutti e tre sullo scaffale.',pt:'Coloque os três na prateleira.',fr:'Mets les trois sur l’étagère.',fi:'Laita kaikki kolme hyllylle.'},
    hintOrder1:    {en:'Look at the numbers on the cards.',de:'Schau auf die Zahlen auf den Karten.',nl:'Kijk naar de getallen op de kaartjes.',da:'Se på tallene på kortene.',sv:'Titta på talen på korten.',no:'Se på tallene på kortene.',es:'Mira los números de las tarjetas.',it:'Guarda i numeri sulle carte.',pt:'Olhe os números nos cartões.',fr:'Regarde les nombres sur les cartes.',fi:'Katso korttien lukuja.'},
    hintOrder2:    {en:'The smallest number goes first.',de:'Die kleinste Zahl kommt zuerst.',nl:'Het kleinste getal komt eerst.',da:'Det mindste tal kommer først.',sv:'Det minsta talet kommer först.',no:'Det minste tallet kommer først.',es:'El número más chico va primero.',it:'Il numero più piccolo va per primo.',pt:'O número menor vem primeiro.',fr:'Le plus petit nombre va en premier.',fi:'Pienin luku tulee ensin.'},
    fGap:          {en:'Oops — a gap! Push the helpers together so they touch.',de:'Hoppla – eine Lücke! Schieb die Helfer zusammen, bis sie sich berühren.',nl:'Oei, een gat! Schuif de helpertjes tegen elkaar.',da:'Ups – et hul! Skub hjælperne sammen, så de rører hinanden.',sv:'Hoppsan – en glipa! Skjut ihop hjälparna så att de nuddar varandra.',no:'Oi – et hull! Skyv hjelperne sammen så de rører hverandre.',es:'¡Ups, un hueco! Junta los ayudantes para que se toquen.',it:'Ops, un buco! Avvicina gli aiutanti finché si toccano.',pt:'Opa, um buraco! Junte os ajudantes até eles se tocarem.',fr:'Oups, un trou ! Rapproche les bâtonnets pour qu’ils se touchent.',fi:'Hups, rako! Työnnä apurit yhteen niin, että ne koskettavat toisiaan.'},
    fOverlap:      {en:'Two helpers are on top of each other. Give them room.',de:'Zwei Helfer liegen übereinander. Gib ihnen Platz.',nl:'Twee helpertjes liggen over elkaar. Geef ze ruimte.',da:'To hjælpere ligger oven på hinanden. Giv dem plads.',sv:'Två hjälpare ligger omlott. Ge dem plats.',no:'To hjelpere ligger oppå hverandre. Gi dem plass.',es:'Dos ayudantes están encimados. Dales espacio.',it:'Due aiutanti sono uno sopra l’altro. Lascia loro spazio.',pt:'Dois ajudantes estão um em cima do outro. Dê espaço a eles.',fr:'Deux bâtonnets se chevauchent. Laisse-leur de la place.',fi:'Kaksi apuria on päällekkäin. Anna niille tilaa.'},
    fSize:         {en:'That helper is a different size. Use only the same helpers.',de:'Dieser Helfer ist anders groß. Nimm nur gleiche Helfer.',nl:'Dat helpertje is anders groot. Gebruik alleen dezelfde helpertjes.',da:'Den hjælper har en anden størrelse. Brug kun ens hjælpere.',sv:'Den hjälparen har en annan storlek. Använd bara likadana hjälpare.',no:'Den hjelperen har en annen størrelse. Bruk bare like hjelpere.',es:'Ese ayudante es de otro tamaño. Usa solo ayudantes iguales.',it:'Quell’aiutante è di un’altra misura. Usa solo aiutanti uguali.',pt:'Esse ajudante tem outro tamanho. Use só ajudantes iguais.',fr:'Ce bâtonnet n’a pas la même taille. Utilise seulement des bâtonnets pareils.',fi:'Tuo apuri on erikokoinen. Käytä vain samanlaisia apureita.'},
    fStart:        {en:'Start the first helper right at the stone.',de:'Leg den ersten Helfer genau an den Stein.',nl:'Leg het eerste helpertje precies bij de steen.',da:'Læg den første hjælper lige ved stenen.',sv:'Lägg den första hjälparen precis vid stenen.',no:'Legg den første hjelperen helt inntil steinen.',es:'Pon el primer ayudante justo en la piedra.',it:'Metti il primo aiutante proprio attaccato al sasso.',pt:'Coloque o primeiro ajudante bem encostado na pedra.',fr:'Pose le premier bâtonnet juste contre la pierre.',fi:'Laita ensimmäinen apuri aivan kiven viereen.'},
    fPast:         {en:'That helper is past the end. Take it away.',de:'Dieser Helfer liegt hinter dem Ende. Nimm ihn weg.',nl:'Dat helpertje ligt voorbij het einde. Haal het weg.',da:'Den hjælper stikker ud over enden. Tag den væk.',sv:'Den hjälparen sticker ut förbi slutet. Ta bort den.',no:'Den hjelperen stikker ut forbi enden. Ta den bort.',es:'Ese ayudante se pasa del final. Quítalo.',it:'Quell’aiutante va oltre la fine. Toglilo.',pt:'Esse ajudante passou do fim. Tire-o.',fr:'Ce bâtonnet dépasse le bout. Enlève-le.',fi:'Tuo apuri menee lopun yli. Ota se pois.'},
    fShort:        {en:'Lay more helpers, all the way to the end.',de:'Leg mehr Helfer, bis ganz zum Ende.',nl:'Leg meer helpertjes, helemaal tot het einde.',da:'Læg flere hjælpere, helt hen til enden.',sv:'Lägg fler hjälpare, ända till slutet.',no:'Legg flere hjelpere, helt til enden.',es:'Pon más ayudantes, hasta el final.',it:'Metti altri aiutanti, fino alla fine.',pt:'Coloque mais ajudantes, até o fim.',fr:'Pose d’autres bâtonnets, jusqu’au bout.',fi:'Laita lisää apureita loppuun asti.'},
    fNone:         {en:'Lay helpers on the path first.',de:'Leg zuerst Helfer auf den Weg.',nl:'Leg eerst helpertjes op het pad.',da:'Læg først hjælpere på stien.',sv:'Lägg först hjälpare på stigen.',no:'Legg først hjelpere på stien.',es:'Primero pon ayudantes en el sendero.',it:'Prima metti gli aiutanti sul sentiero.',pt:'Primeiro coloque ajudantes no caminho.',fr:'Pose d’abord des bâtonnets sur le chemin.',fi:'Laita ensin apureita polulle.'},
    fHome:         {en:'Fix the helpers, then tap {name} to go back to the stone.',de:'Bring die Helfer in Ordnung und tippe dann auf {name}, um zum Stein zurückzugehen.',nl:'Maak de helpertjes goed en tik dan op {name} om terug naar de steen te gaan.',da:'Ret hjælperne, og tryk så på {name} for at gå tilbage til stenen.',sv:'Rätta till hjälparna och tryck sedan på {name} för att gå tillbaka till stenen.',no:'Rett opp hjelperne, og trykk så på {name} for å gå tilbake til steinen.',es:'Arregla los ayudantes y luego toca a {name} para volver a la piedra.',it:'Sistema gli aiutanti, poi tocca {name} per tornare al sasso.',pt:'Arrume os ajudantes e depois toque em {name} para voltar à pedra.',fr:'Répare les bâtonnets, puis touche {name} pour revenir à la pierre.',fi:'Korjaa apurit ja napauta sitten matoa, niin {name} palaa kivelle.'},
    hEnd:          {en:'This row takes {name} all the way to the end.',de:'In dieser Reihe kommt {name} bis ganz zum Ende.',nl:'In deze rij komt {name} helemaal tot het einde.',da:'I den her række når {name} helt hen til enden.',sv:'På den här raden kommer {name} ända till slutet.',no:'På denne raden kommer {name} helt til enden.',es:'En esta fila {name} llega hasta el final.',it:'In questa fila {name} arriva fino alla fine.',pt:'Nesta fileira {name} chega até o fim.',fr:'Sur cette rangée, {name} arrive jusqu’au bout.',fi:'Tällä rivillä {name} pääsee loppuun asti.'},
    okLen:         {en:'{Obj} is {n} long!',de:'{Obj} ist {n} lang!',nl:'{Obj} is {n} lang!',da:'{Obj} er {n} {long}!',sv:'{Obj} är {n} {long}!',no:'{Obj} er {n} {long}!',es:'¡{Obj} mide {n}!',it:'{Obj} misura {n}!',pt:'{Obj} mede {n}!',fr:'{Obj} mesure {n} !',fi:'{Obj} on {n} pitkä!'},
    nHelpers:      {en:'{n} helpers',de:'{n} Helfer',nl:'{n} helpertjes',da:'{n} hjælpere',sv:'{n} hjälpare',no:'{n} hjelpere',es:'{n} ayudantes',it:'{n} aiutanti',pt:'{n} ajudantes',fr:'{n} bâtonnets',fi:'{n} apuria'},
    okBig:         {en:'Big helpers: {B}. Small helpers: {S}. Smaller helpers — you need more of them!',de:'Große Helfer: {B}. Kleine Helfer: {S}. Kleinere Helfer – davon brauchst du mehr!',nl:'Grote helpertjes: {B}. Kleine helpertjes: {S}. Kleinere helpertjes: daar heb je er meer van nodig!',da:'Store hjælpere: {B}. Små hjælpere: {S}. Mindre hjælpere – dem skal du bruge flere af!',sv:'Stora hjälpare: {B}. Små hjälpare: {S}. Mindre hjälpare – då behöver du fler!',no:'Store hjelpere: {B}. Små hjelpere: {S}. Mindre hjelpere – da trenger du flere!',es:'Ayudantes grandes: {B}. Ayudantes chicos: {S}. Con ayudantes más chicos, ¡necesitas más!',it:'Aiutanti grandi: {B}. Aiutanti piccoli: {S}. Con aiutanti più piccoli ne servono di più!',pt:'Ajudantes grandes: {B}. Ajudantes pequenos: {S}. Com ajudantes menores, você precisa de mais!',fr:'Grands bâtonnets : {B}. Petits bâtonnets : {S}. Avec des bâtonnets plus petits, il en faut plus !',fi:'Isot apurit: {B}. Pienet apurit: {S}. Pienempiä apureita tarvitaan enemmän!'},
    okBigStep:     {en:'Now the small helpers.',de:'Jetzt die kleinen Helfer.',nl:'Nu de kleine helpertjes.',da:'Nu de små hjælpere.',sv:'Nu de små hjälparna.',no:'Nå de små hjelperne.',es:'Ahora los ayudantes chicos.',it:'Ora gli aiutanti piccoli.',pt:'Agora os ajudantes pequenos.',fr:'Maintenant, les petits bâtonnets.',fi:'Nyt pienet apurit.'},
    okCard:        {en:'Measured! Now the next one.',de:'Gemessen! Jetzt das nächste.',nl:'Gemeten! Nu de volgende.',da:'Målt! Nu den næste.',sv:'Uppmätt! Nu nästa.',no:'Målt! Nå den neste.',es:'¡Medido! Ahora el siguiente.',it:'Misurato! Ora il prossimo.',pt:'Medido! Agora o próximo.',fr:'Mesuré ! Maintenant le suivant.',fi:'Mitattu! Nyt seuraava.'},
    okOrder:       {en:'{o1}, {o2}, {o3} — from shortest to longest!',de:'{o1}, {o2}, {o3} – vom Kürzesten zum Längsten!',nl:'{o1}, {o2}, {o3}: van kort naar lang!',da:'{o1}, {o2}, {o3} – fra den korteste til den længste!',sv:'{o1}, {o2}, {o3} – från den kortaste till den längsta!',no:'{o1}, {o2}, {o3} – fra den korteste til den lengste!',es:'{o1}, {o2}, {o3}: ¡del más corto al más largo!',it:'{o1}, {o2}, {o3}: dal più corto al più lungo!',pt:'{o1}, {o2}, {o3}: do mais curto ao mais comprido!',fr:'{o1}, {o2}, {o3} : du plus court au plus long !',fi:'{o1}, {o2}, {o3} – lyhimmästä pisimpään!'},
    okJudge:       {en:'Yes! On this row {name} hops all the way to the end.',de:'Ja! In dieser Reihe hüpft {name} bis ganz zum Ende.',nl:'Ja! In deze rij hupt {name} helemaal tot het einde.',da:'Ja! I den her række hopper {name} helt hen til enden.',sv:'Ja! På den här raden hoppar {name} ända till slutet.',no:'Ja! På denne raden hopper {name} helt til enden.',es:'¡Sí! En esta fila {name} brinca hasta el final.',it:'Sì! In questa fila {name} salta fino alla fine.',pt:'Isso! Nesta fileira {name} pula até o fim.',fr:'Oui ! Sur cette rangée, {name} saute jusqu’au bout.',fi:'Kyllä! Tällä rivillä {name} hyppii loppuun asti.'},
    aHelper:       {en:'Helper {k}: tap to hop, drag to move',de:'Helfer {k}: tippen zum Hüpfen, ziehen zum Verschieben',nl:'Helpertje {k}: tik om te huppen, sleep om te verschuiven',da:'Hjælper {k}: tryk for at hoppe, træk for at flytte',sv:'Hjälpare {k}: tryck för att hoppa, dra för att flytta',no:'Hjelper {k}: trykk for å hoppe, dra for å flytte',es:'Ayudante {k}: toca para brincar, arrastra para mover',it:'Aiutante {k}: tocca per saltare, trascina per spostare',pt:'Ajudante {k}: toque para pular, arraste para mover',fr:'Bâtonnet {k} : touche pour sauter, fais glisser pour déplacer',fi:'Apuri {k}: napauta, niin {name} hyppää; vedä siirtääksesi'},
    aWorm:         {en:'{name}: tap to go back to the stone',de:'{name}: tippen, um zum Stein zurückzugehen',nl:'{name}: tik om terug naar de steen te gaan',da:'{name}: tryk for at gå tilbage til stenen',sv:'{name}: tryck för att gå tillbaka till stenen',no:'{name}: trykk for å gå tilbake til steinen',es:'{name}: toca para volver a la piedra',it:'{name}: tocca per tornare al sasso',pt:'{name}: toque para voltar à pedra',fr:'{name} : touche pour revenir à la pierre',fi:'{name}: napauta palataksesi kivelle'},
    aTrack:        {en:'Row {i}',de:'Reihe {i}',nl:'Rij {i}',da:'Række {i}',sv:'Rad {i}',no:'Rad {i}',es:'Fila {i}',it:'Fila {i}',pt:'Fileira {i}',fr:'Rangée {i}',fi:'Rivi {i}'},
    aRun:          {en:'Send {name} along row {i}',de:'{name} Reihe {i} entlangschicken',nl:'Stuur {name} langs rij {i}',da:'Send {name} hen ad række {i}',sv:'Skicka {name} längs rad {i}',no:'Send {name} langs rad {i}',es:'Mandar a {name} por la fila {i}',it:'Manda {name} lungo la fila {i}',pt:'Mandar {name} pela fileira {i}',fr:'Envoyer {name} le long de la rangée {i}',fi:'Lähetä {name} riviä {i} pitkin'},
    aSlot1:        {en:'Shelf, first step',de:'Regal, erste Stufe',nl:'Plank, eerste trede',da:'Hylde, første trin',sv:'Hylla, första steget',no:'Hylle, første trinn',es:'Estante, primer escalón',it:'Scaffale, primo gradino',pt:'Prateleira, primeiro degrau',fr:'Étagère, première marche',fi:'Hylly, ensimmäinen askelma'},
    aSlot2:        {en:'Shelf, second step',de:'Regal, zweite Stufe',nl:'Plank, tweede trede',da:'Hylde, andet trin',sv:'Hylla, andra steget',no:'Hylle, andre trinn',es:'Estante, segundo escalón',it:'Scaffale, secondo gradino',pt:'Prateleira, segundo degrau',fr:'Étagère, deuxième marche',fi:'Hylly, toinen askelma'},
    aSlot3:        {en:'Shelf, third step',de:'Regal, dritte Stufe',nl:'Plank, derde trede',da:'Hylde, tredje trin',sv:'Hylla, tredje steget',no:'Hylle, tredje trinn',es:'Estante, tercer escalón',it:'Scaffale, terzo gradino',pt:'Prateleira, terceiro degrau',fr:'Étagère, troisième marche',fi:'Hylly, kolmas askelma'},
    aPot:          {en:'Helpers: tap to lay one at the end of the row, or drag one to the path',de:'Helfer: tippen, um einen ans Ende der Reihe zu legen, oder einen auf den Weg ziehen',nl:'Helpertjes: tik om er een aan het einde van de rij te leggen, of sleep er een naar het pad',da:'Hjælpere: tryk for at lægge en for enden af rækken, eller træk en hen på stien',sv:'Hjälpare: tryck för att lägga en i slutet av raden, eller dra en till stigen',no:'Hjelpere: trykk for å legge en på slutten av raden, eller dra en til stien',es:'Ayudantes: toca para poner uno al final de la fila, o arrastra uno al sendero',it:'Aiutanti: tocca per metterne uno in fondo alla fila, o trascinane uno sul sentiero',pt:'Ajudantes: toque para colocar um no fim da fileira, ou arraste um para o caminho',fr:'Bâtonnets : touche pour en poser un au bout de la rangée, ou fais-en glisser un sur le chemin',fi:'Apurit: napauta laittaaksesi yhden rivin loppuun, tai vedä yksi polulle'},
    aBigPot:       {en:'Big helpers: tap to lay one at the end of the row, or drag one to the path',de:'Große Helfer: tippen, um einen ans Ende der Reihe zu legen, oder einen auf den Weg ziehen',nl:'Grote helpertjes: tik om er een aan het einde van de rij te leggen, of sleep er een naar het pad',da:'Store hjælpere: tryk for at lægge en for enden af rækken, eller træk en hen på stien',sv:'Stora hjälpare: tryck för att lägga en i slutet av raden, eller dra en till stigen',no:'Store hjelpere: trykk for å legge en på slutten av raden, eller dra en til stien',es:'Ayudantes grandes: toca para poner uno al final de la fila, o arrastra uno al sendero',it:'Aiutanti grandi: tocca per metterne uno in fondo alla fila, o trascinane uno sul sentiero',pt:'Ajudantes grandes: toque para colocar um no fim da fileira, ou arraste um para o caminho',fr:'Grands bâtonnets : touche pour en poser un au bout de la rangée, ou fais-en glisser un sur le chemin',fi:'Isot apurit: napauta laittaaksesi yhden rivin loppuun, tai vedä yksi polulle'},
    aDecoy:        {en:'Other helpers, a different size',de:'Andere Helfer, anders groß',nl:'Andere helpertjes, anders groot',da:'Andre hjælpere i en anden størrelse',sv:'Andra hjälpare, en annan storlek',no:'Andre hjelpere, en annen størrelse',es:'Otros ayudantes, de otro tamaño',it:'Altri aiutanti, di un’altra misura',pt:'Outros ajudantes, de outro tamanho',fr:'D’autres bâtonnets, d’une autre taille',fi:'Muut apurit, eri kokoa'},
    aLabel:        {en:'Label: how many helpers long',de:'Schild: wie viele Helfer lang',nl:'Kaartje: hoeveel helpertjes lang',da:'Skilt: hvor mange hjælpere lang',sv:'Lapp: hur många hjälpare lång',no:'Lapp: hvor mange hjelpere lang',es:'Letrero: cuántos ayudantes mide',it:'Cartellino: quanti aiutanti è lungo',pt:'Etiqueta: quantos ajudantes mede',fr:'Étiquette : combien de bâtonnets de long',fi:'Lappu: montako apuria pitkä'},
    aDel:          {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    aHopOk:        {en:'Hop {k}: right on the join',de:'Hüpfer {k}: genau am Übergang',nl:'Hupje {k}: precies op de naad',da:'Hop {k}: lige på samlingen',sv:'Hopp {k}: precis i skarven',no:'Hopp {k}: akkurat i skjøten',es:'Brinco {k}: justo en la unión',it:'Salto {k}: proprio sulla giunzione',pt:'Pulo {k}: bem na emenda',fr:'Saut {k} : pile à la jointure',fi:'Hyppy {k}: juuri saumassa'},
    aHopBad:       {en:'Hop {k}: something is wrong',de:'Hüpfer {k}: etwas stimmt nicht',nl:'Hupje {k}: er klopt iets niet',da:'Hop {k}: noget er galt',sv:'Hopp {k}: något är fel',no:'Hopp {k}: noe er galt',es:'Brinco {k}: algo está mal',it:'Salto {k}: c’è qualcosa che non va',pt:'Pulo {k}: algo está errado',fr:'Saut {k} : quelque chose ne va pas',fi:'Hyppy {k}: jotain on vialla'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setJob:        {en:'Job',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Tarea',it:'Compito',pt:'Tarefa',fr:'Tâche',fi:'Tehtävä'},
    jLay:          {en:'Lay and count',de:'Legen und zählen',nl:'Leggen en tellen',da:'Læg og tæl',sv:'Lägg och räkna',no:'Legg og tell',es:'Poner y contar',it:'Metti e conta',pt:'Colocar e contar',fr:'Poser et compter',fi:'Laita ja laske'},
    jFix:          {en:'Fix it',de:'Reparieren',nl:'Repareren',da:'Ret fejlen',sv:'Rätta till',no:'Rett opp',es:'Arreglar',it:'Sistema',pt:'Arrumar',fr:'Réparer',fi:'Korjaa'},
    jOrder:        {en:'Line up three',de:'Drei ordnen',nl:'Drie op volgorde',da:'Ordn tre',sv:'Ordna tre',no:'Ordne tre',es:'Ordenar tres',it:'Metti in ordine i tre',pt:'Ordenar três',fr:'Ranger les trois',fi:'Järjestä kolme'},
    setSizes:      {en:'Helpers',de:'Helfer',nl:'Helpertjes',da:'Hjælpere',sv:'Hjälpare',no:'Hjelpere',es:'Ayudantes',it:'Aiutanti',pt:'Ajudantes',fr:'Bâtonnets',fi:'Apurit'},
    sOne:          {en:'One size',de:'Eine Größe',nl:'Eén maat',da:'Én størrelse',sv:'En storlek',no:'Én størrelse',es:'Un tamaño',it:'Una misura',pt:'Um tamanho',fr:'Une taille',fi:'Yksi koko'},
    sBig:          {en:'Big and small',de:'Groß und klein',nl:'Groot en klein',da:'Store og små',sv:'Stora och små',no:'Store og små',es:'Grandes y chicos',it:'Grandi e piccoli',pt:'Grandes e pequenos',fr:'Grands et petits',fi:'Isot ja pienet'}
  },/*STRINGS-END*/

  /* each object as the subject of a sentence ("the car"), and for sv/da/no the agreeing form of "long" after it: "phrase|long" */
  /*OBJECTS-BEGIN*/OBJECTS: {
    en: {car:'the car',train:'the train',truck:'the truck',skateboard:'the skateboard',fish:'the fish',shoe:'the shoe',snail:'the snail',alligator:'the alligator',caterpillar:'the caterpillar',ferry:'the ferry',submarine:'the submarine',baguette:'the baguette'},
    de: {car:'das Auto',train:'die Lok',truck:'der Lastwagen',skateboard:'das Skateboard',fish:'der Fisch',shoe:'der Schuh',snail:'die Schnecke',alligator:'der Alligator',caterpillar:'die Raupe',ferry:'die Fähre',submarine:'das U-Boot',baguette:'das Baguette'},
    nl: {car:'de auto',train:'de trein',truck:'de vrachtwagen',skateboard:'het skateboard',fish:'de vis',shoe:'de schoen',snail:'de slak',alligator:'de alligator',caterpillar:'de rups',ferry:'de veerboot',submarine:'de duikboot',baguette:'het stokbrood'},
    da: {car:'bilen|lang',train:'toget|langt',truck:'lastbilen|lang',skateboard:'skateboardet|langt',fish:'fisken|lang',shoe:'skoen|lang',snail:'sneglen|lang',alligator:'alligatoren|lang',caterpillar:'larven|lang',ferry:'færgen|lang',submarine:'ubåden|lang',baguette:'baguetten|lang'},
    sv: {car:'bilen|lång',train:'tåget|långt',truck:'lastbilen|lång',skateboard:'skateboarden|lång',fish:'fisken|lång',shoe:'skon|lång',snail:'snigeln|lång',alligator:'alligatorn|lång',caterpillar:'larven|lång',ferry:'färjan|lång',submarine:'ubåten|lång',baguette:'baguetten|lång'},
    no: {car:'bilen|lang',train:'toget|langt',truck:'lastebilen|lang',skateboard:'skateboardet|langt',fish:'fisken|lang',shoe:'skoen|lang',snail:'sneglen|lang',alligator:'alligatoren|lang',caterpillar:'larven|lang',ferry:'ferja|lang',submarine:'ubåten|lang',baguette:'baguetten|lang'},
    es: {car:'el carro',train:'el tren',truck:'el camión',skateboard:'la patineta',fish:'el pez',shoe:'el zapato',snail:'el caracol',alligator:'el caimán',caterpillar:'la oruga',ferry:'el ferri',submarine:'el submarino',baguette:'la baguette'},
    it: {car:'la macchinina',train:'il trenino',truck:'il camion',skateboard:'lo skateboard',fish:'il pesce',shoe:'la scarpa',snail:'la lumaca',alligator:'l’alligatore',caterpillar:'il bruco',ferry:'il traghetto',submarine:'il sottomarino',baguette:'la baguette'},
    pt: {car:'o carrinho',train:'o trenzinho',truck:'o caminhão',skateboard:'o skate',fish:'o peixe',shoe:'o sapato',snail:'o caracol',alligator:'o jacaré',caterpillar:'a lagarta',ferry:'a balsa',submarine:'o submarino',baguette:'a baguete'},
    fr: {car:'la voiture',train:'le train',truck:'le camion',skateboard:'le skateboard',fish:'le poisson',shoe:'la chaussure',snail:'l’escargot',alligator:'l’alligator',caterpillar:'la chenille',ferry:'le ferry',submarine:'le sous-marin',baguette:'la baguette'},
    fi: {car:'auto',train:'juna',truck:'kuorma-auto',skateboard:'rullalauta',fish:'kala',shoe:'kenkä',snail:'etana',alligator:'alligaattori',caterpillar:'toukka',ferry:'lautta',submarine:'sukellusvene',baguette:'patonki'}
  },/*OBJECTS-END*/

  defaults: { job: 'lay', sizes: 'one' },
  settings: [
    { key: 'job', type: 'choice', labelKey: 'setJob', options: [{ value: 'lay', labelKey: 'jLay' }, { value: 'fix', labelKey: 'jFix' }, { value: 'order', labelKey: 'jOrder' }] },
    { key: 'sizes', type: 'choice', labelKey: 'setSizes', options: [{ value: 'one', labelKey: 'sOne' }, { value: 'big', labelKey: 'sBig' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._dragUntil = 0; this._pics = {};
    injectHopCSS();
    var self = this, themes = {}; Object.keys(OneHopCore.DATA.OBJ).forEach(function (k) { themes[OneHopCore.DATA.OBJ[k][0]] = 1; }); themes.spring = 1;
    if (typeof LCSPictures !== 'undefined') Object.keys(themes).forEach(function (th) { LCSPictures.load(th).then(function (t) { self._pics[th] = t; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; if (!('name' in a)) a.name = this.api && this.api.t ? this.api.t('name') : 'Inchie'; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return OneHopCore.locale(((this.api && this.api.lang) || 'en')); },
  _job: function () { return OneHopCore.jobOf(this._setting('job')); },
  _sizes: function () { return this._job() === 'lay' ? OneHopCore.sizesOf(this._setting('sizes')) : 'one'; },
  _key: function () { return this._job() + '.' + this._sizes(); },
  _cap: function (s) { s = String(s); return s.charAt(0).toUpperCase() + s.slice(1); },
  _objPhrase: function (o) { var t = this.OBJECTS[this._loc()] || this.OBJECTS.en; return String(t[o] || o).split('|')[0]; },
  _objLong: function (o) { var t = this.OBJECTS[this._loc()] || this.OBJECTS.en, p = String(t[o] || '').split('|'); return p[1] || ''; },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = OneHopCore.ids(this._job(), this._sizes()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = OneHopCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      this._order = C.plan(this._job(), this._sizes(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._promptText(C.round(id)) }; this._pa = pa;
    return {
      id: 'onehop.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r, st) {
    if (r.kind === 'fix') return this._t('tFix');
    if (r.kind === 'judge') return this._t('tJudge');
    if (r.kind === 'order') return this._t(st && st.cur >= 3 ? 'tOrder2' : 'tOrder');
    if (r.kind === 'big') return this._t(st && st.phase === 1 ? 'tBig2' : 'tBig');
    return this._t('tLay');
  },
  _setPrompt: function () { var line = this._promptText(this.st.r, this.st); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (id, pos) {
    var C = OneHopCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._busy = false; this._dragUntil = 0;
    var r = C.round(id);
    this.st = C.newState(r, C.perm(Math.random));
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(this._pool[0], 0);
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
    var wrap = api.el('div', 'oh-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="oh-queue"></div><div class="oh-bed"></div><div class="oh-row"></div><div class="oh-pad" role="group"></div><div class="oh-foot"></div><p class="oh-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) { self._keydown(e); });
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
  /* sizes in px: one unit u, the same in every round (the bed is drawn for six units) */
  _dims: function () {
    var C = OneHopCore, w = this._width(), B = C.band(w), bedW = Math.min(w, 660), u = Math.min(86, bedW / (C.LMAX + 1.25));
    return { w: w, bedW: bedW, u: u, x0: u * 0.62, worm: B.wide ? 96 : 64, pathH: B.wide ? 54 : 46, capH: B.wide ? 34 : 28, wide: B.wide, tiny: B.tiny };
  },
  _picFor: function (key) { var C = OneHopCore, th = this._pics[C.DATA.OBJ[key][0]]; if (!th || typeof LCSPictures === 'undefined') return null; return LCSPictures.img(th, C.DATA.OBJ[key][1], this._loc(), {}); },
  _objH: function (key, L, u) { var k = OneHopCore.DATA.INK[key]; return L * u / k[0] * k[2]; },
  _paint_: function () {
    if (!this._wrap) return;
    var C = OneHopCore, st = this.st, r = st.r, D = this._dims(), v = this._view;
    this._wrap.className = 'oh-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.kind;
    this._paintQueue(D);
    if (r.kind === 'judge') this._paintJudge(D); else if (r.kind === 'order' && st.cur >= 3) { var bd = this._qs('.oh-bed'); bd.innerHTML = ''; bd.style.display = 'none'; } else this._paintBed(D);
    this._paintRow(D);
    this._paintPad(D);
    var self = this, foot = this._qs('.oh-foot'); foot.innerHTML = '';
    var ck = this._btn('oh-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || !!this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
    var note = this._qs('.oh-note'), h = C.hint(st);
    if (v.msg) { note.textContent = v.msg; note.className = 'oh-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'oh-note is-hint'; }
    else if (h && v.checked) { note.textContent = this._t(h.key); note.className = 'oh-note is-hint'; }
    else { note.textContent = ''; note.className = 'oh-note'; }
  },

  /* ---- the bed: the object, Inchie's lane, the path with its stone and helpers ---- */
  _paintBed: function (D) {
    var C = OneHopCore, st = this.st, r = st.r, bed = this._qs('.oh-bed'), self = this, u = D.u, x0 = D.x0;
    bed.innerHTML = ''; bed.style.display = '';
    var o = C.objOf(st);
    var objs = r.kind === 'order' ? r.objs : [r], hMax = 0;
    objs.forEach(function (x) { hMax = Math.max(hMax, self._objH(x.obj, x.L, u)); });
    var objBottom = hMax + 4, laneTop = objBottom - 8, pathTop = laneTop + D.worm, pathBot = pathTop + D.pathH, U = C.unit(st), E = o.L;
    bed.style.width = D.bedW + 'px'; bed.style.height = (pathBot + 6) + 'px';
    /* the object, its ink exactly L units from the tip */
    var im = r.kind === 'order' && st.cur >= 3 ? null : this._picFor(o.obj);
    if (im) {
      var k = C.DATA.INK[o.obj], S = E * u / k[0];
      im.className = 'oh-obj'; im.alt = this._objPhrase(o.obj); im.style.width = im.style.height = S + 'px';
      im.style.left = (x0 - k[1] * S) + 'px'; im.style.top = (objBottom - (k[3] + k[2]) * S) + 'px';
      bed.appendChild(im);
    }
    var el = function (cls, css) { var d = document.createElement('i'); d.className = cls; Object.keys(css).forEach(function (p) { d.style[p] = css[p]; }); bed.appendChild(d); return d; };
    /* dashed guides from the tip and the end down to the path */
    if (im) { el('oh-guide', { left: x0 + 'px', top: (objBottom - 6) + 'px', height: (pathBot - objBottom + 6) + 'px' }); el('oh-guide', { left: (x0 + E * u) + 'px', top: (objBottom - 6) + 'px', height: (pathBot - objBottom + 6) + 'px' }); }
    /* the path (soil), the start stone */
    el('oh-path', { left: '0px', top: pathTop + 'px', width: D.bedW + 'px', height: D.pathH + 'px' });
    el('oh-stone', { left: (x0 - 26) + 'px', top: (pathTop + D.pathH / 2 - 12) + 'px' });
    /* a gap Inchie fell into */
    if (st.status === 'gap' && st.hops > 0) {
      var at = st.hops * U / C.E8, next = Infinity; st.helpers.forEach(function (h) { var s0 = h.p / C.E8; if (s0 > at - 1e-9 && s0 < next) next = s0; });
      var gw = (isFinite(next) ? next - at : 0.5) * u; el('oh-gap', { left: (x0 + at * u - 2) + 'px', top: pathTop + 'px', width: Math.max(10, gw + 4) + 'px', height: D.pathH + 'px' });
    }
    /* the helpers (tap = hop; drag = move; drag away = remove) */
    var order = st.helpers.map(function (h, i) { return i; }).sort(function (a, b) { return st.helpers[a].p - st.helpers[b].p || a - b; });
    var lifted = {}; order.forEach(function (i, n) { if (n > 0) { var pv = st.helpers[order[n - 1]]; if (st.helpers[i].p < pv.p + pv.w) lifted[i] = 1; } });
    order.forEach(function (i, n) {
      var h = st.helpers[i], left = x0 + h.p / C.E8 * u, wpx = h.w / C.E8 * u, bad = st.bad.indexOf(i) >= 0;
      var b = self._btn('oh-helper' + (h.w !== U ? ' is-odd' : '') + (h.w === 2 * C.E8 ? ' is-big' : '') + (bad ? ' is-bad' : '') + (lifted[i] ? ' is-up' : ''), 'helper-' + n, self._t('aHelper', { k: n + 1 }));
      var hitW = Math.max(wpx, 44); b.style.left = (left - (hitW - wpx) / 2) + 'px'; b.style.width = hitW + 'px'; b.style.top = (pathTop + 1) + 'px'; b.style.height = Math.max(44, D.pathH - 2) + 'px';
      b.innerHTML = '<span class="oh-cap" style="width:' + (wpx - 2) + 'px;height:' + D.capH + 'px"></span>';
      b.disabled = st.done;
      b.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._hop(); });
      b.addEventListener('pointerdown', function (e) { self._dragHelper(e, i, b); });
      b.addEventListener('keydown', function (e) { self._helperKey(e, i); });
      bed.appendChild(b);
    });
    /* footprints */
    for (var f = 1; f <= st.hops; f++) el('oh-print' + (f === st.hops && st.status && st.status !== 'seam' && st.status !== 'end' ? ' is-bad' : ''), { left: (x0 + f * U / C.E8 * u - 5) + 'px', top: (pathTop + D.pathH - 12) + 'px' });
    /* Inchie, her base point on the path at her hop */
    var wb = this._pics.spring;
    var ib = this._btn('oh-worm is-' + (st.status || 'rest'), 'worm', this._t('aWorm'));
    var wx = x0 + st.hops * U / C.E8 * u;
    ib.style.left = (wx - D.worm / 2) + 'px'; ib.style.top = (pathTop - D.worm + 8) + 'px'; ib.style.width = ib.style.height = D.worm + 'px';
    if (wb && typeof LCSPictures !== 'undefined') { var wi = LCSPictures.img(wb, C.DATA.WORM[1], this._loc(), {}); wi.alt = ''; wi.className = 'oh-wormpic'; ib.appendChild(wi); }
    ib.disabled = st.done;
    ib.addEventListener('click', function () { self._home(); });
    bed.appendChild(ib);
    /* the success picture sum: N capsules under the object */
    if (st.done && r.kind !== 'order') { for (var c = 0; c < st.r.L; c++) el('oh-sum', { left: (x0 + c * u + 2) + 'px', top: (objBottom - 2) + 'px', width: (u - 4) + 'px', animationDelay: (this.FAST ? 0 : c * 120) + 'ms' }); }
  },

  /* ---- judge: one object, three helper rows, each with its own stone ---- */
  _paintJudge: function (D) {
    var C = OneHopCore, st = this.st, r = st.r, bed = this._qs('.oh-bed'), self = this, u = D.u, x0 = D.x0;
    bed.innerHTML = ''; bed.style.display = '';
    var hO = this._objH(r.obj, r.L, u), objBottom = hO + 4, rowH = Math.max(50, D.pathH), top0 = objBottom + 10, E = r.L;
    bed.style.width = D.bedW + 'px'; bed.style.height = (top0 + 3 * (rowH + 8) + 4) + 'px';
    var im = this._picFor(r.obj);
    if (im) { var k = C.DATA.INK[r.obj], S = E * u / k[0]; im.className = 'oh-obj'; im.alt = this._objPhrase(r.obj); im.style.width = im.style.height = S + 'px'; im.style.left = (x0 - k[1] * S) + 'px'; im.style.top = (objBottom - (k[3] + k[2]) * S) + 'px'; bed.appendChild(im); }
    var el = function (cls, css, host) { var d = document.createElement('i'); d.className = cls; Object.keys(css).forEach(function (p) { d.style[p] = css[p]; }); (host || bed).appendChild(d); return d; };
    el('oh-guide', { left: x0 + 'px', top: (objBottom - 6) + 'px', height: (top0 + 3 * (rowH + 8) - objBottom) + 'px' }); el('oh-guide', { left: (x0 + E * u) + 'px', top: (objBottom - 6) + 'px', height: (top0 + 3 * (rowH + 8) - objBottom) + 'px' });
    [0, 1, 2].forEach(function (t) {
      var tr = r.tracks[st.perm[t]], y = top0 + t * (rowH + 8), run = st.runs[t], stop = run ? run[run.length - 1] : null;
      var row = self._btn('oh-track' + (st.track === t ? ' is-picked' : '') + (st.done && t === C.rightTrack(st) ? ' is-right' : ''), 'track-' + t, self._t('aTrack', { i: t + 1 }));
      row.style.left = (x0 - 4) + 'px'; row.style.top = y + 'px'; row.style.width = (D.bedW - x0) + 'px'; row.style.height = rowH + 'px'; row.disabled = st.done;
      row.addEventListener('click', function () { self._pickTrack(t); });
      bed.appendChild(row);
      tr.forEach(function (h, n) { var bad = stop && stop.bad && stop.bad.indexOf(n) >= 0; el('oh-cap is-track' + (h.w !== C.E8 ? ' is-odd' : '') + (bad ? ' is-bad' : ''), { left: (x0 + h.p / C.E8 * u + 1) + 'px', top: (y + (rowH - D.capH) / 2) + 'px', width: (h.w / C.E8 * u - 2) + 'px', height: D.capH + 'px' }); });
      if (run) for (var f = 1; f <= run.length; f++) { var landed = run[f - 1].status; el('oh-print' + (f === run.length && landed !== 'end' ? ' is-bad' : ''), { left: (x0 + f * u - 5) + 'px', top: (y + rowH - 12) + 'px' }); }
      var sb = self._btn('oh-run' + (run ? ' is-ran' : ''), 'run-' + t, self._t('aRun', { i: t + 1 })); sb.style.left = (x0 - 50) + 'px'; sb.style.top = (y + (rowH - 44) / 2) + 'px'; sb.disabled = st.done;
      sb.addEventListener('click', function () { self._run(t); }); bed.appendChild(sb);
    });
    /* Inchie stands where the last run stopped */
    var lt = this._view.ran, wb = this._pics.spring;
    if (wb && typeof LCSPictures !== 'undefined' && lt != null && st.runs[lt]) {
      var run2 = st.runs[lt], hx = x0 + run2.length * u, wi = LCSPictures.img(wb, C.DATA.WORM[1], this._loc(), {}); wi.alt = ''; wi.className = 'oh-wormpic oh-wormj is-' + run2[run2.length - 1].status;
      var ws = D.worm; wi.style.width = wi.style.height = ws + 'px'; wi.style.left = (hx - ws / 2) + 'px'; wi.style.top = (top0 + lt * (rowH + 8) + rowH / 2 - ws + 6) + 'px'; bed.appendChild(wi);
    }
  },

  /* ---- order: the three cards (queue) and, once measured, the shelf ---- */
  _paintQueue: function (D) {
    var C = OneHopCore, st = this.st, r = st.r, q = this._qs('.oh-queue'), self = this;
    q.innerHTML = ''; q.style.display = r.kind === 'order' ? '' : 'none';
    if (r.kind !== 'order') return;
    var cs = D.wide ? 96 : 64;
    var cards = this.api.el('div', 'oh-cards');
    [0, 1, 2].forEach(function (i) {
      var x = r.objs[st.perm[i]], placed = st.slots.indexOf(i) >= 0, cur = st.cur === i;
      var b = self._btn('oh-card' + (cur ? ' is-cur' : '') + (st.chosen === i ? ' is-chosen' : '') + (placed ? ' is-placed' : ''), 'card-' + i, self._cap(self._objPhrase(x.obj)) + (st.labels[i] != null ? ': ' + self._t('nHelpers', { n: st.labels[i] }) : ''));
      var im = self._picFor(x.obj); if (im) { im.alt = ''; im.style.width = im.style.height = cs + 'px'; b.appendChild(im); }
      if (st.labels[i] != null) { var lab = self.api.el('span', 'oh-cardlab'); lab.textContent = String(st.labels[i]); b.appendChild(lab); }
      b.disabled = st.done || st.cur < 3;
      b.addEventListener('click', function () { if (OneHopCore.chooseCard(st, i) === 'chosen') { self.api.sound(440); self._edit(); } });
      cards.appendChild(b);
    });
    q.appendChild(cards);
    if (st.cur >= 3) {
      var shelf = this.api.el('div', 'oh-shelf'); shelf.setAttribute('role', 'group');
      /* the three steps rise, and each holds its card's picture FULL size (the picture floor) */
      shelf.style.setProperty('--oh-cs', cs + 'px');
      [0, 1, 2].forEach(function (s) {
        var i = st.slots[s], x = i != null ? r.objs[st.perm[i]] : null;
        var b = self._btn('oh-slot is-' + s + (x ? ' is-full' : '') + (st.done ? ' is-right' : ''), 'slot-' + s, self._t('aSlot' + (s + 1)) + (x ? ': ' + self._cap(self._objPhrase(x.obj)) : ''));
        if (x) { var im = self._picFor(x.obj); if (im) { im.alt = ''; im.style.width = im.style.height = cs + 'px'; b.appendChild(im); } var lab = self.api.el('span', 'oh-cardlab'); lab.textContent = String(st.labels[i]); b.appendChild(lab); }
        b.disabled = st.done;
        b.addEventListener('click', function () { if (st.chosen != null && OneHopCore.place(st, st.chosen, s) === 'placed') { self.api.sound(560); self._edit(); } });
        shelf.appendChild(b);
      });
      q.appendChild(shelf);
    }
  },

  /* ---- the row under the bed: the pot(s) and the label ---- */
  _paintRow: function (D) {
    var C = OneHopCore, st = this.st, r = st.r, row = this._qs('.oh-row'), self = this;
    row.innerHTML = ''; row.style.display = r.kind === 'judge' || (r.kind === 'order' && st.cur >= 3) ? 'none' : '';
    if (row.style.display === 'none') return;
    var U = C.unit(st);
    var pot = function (k, w, label, big) {
      var b = self._btn('oh-pot' + (big ? ' is-big' : '') + (w !== C.E8 && !big ? ' is-decoy' : ''), k, label, '<svg viewBox="0 0 64 56" aria-hidden="true"><path d="M10 22 h44 l-5 30 h-34z" fill="#C8693F" stroke="#8E4426" stroke-width="2"/><rect x="7" y="17" width="50" height="8" rx="3" fill="#D97B4E" stroke="#8E4426" stroke-width="2"/>' +
        '<rect x="' + (32 - w / 1.6) + '" y="6" width="' + (w / 0.8) + '" height="11" rx="5.5" fill="#6DBB5E" stroke="#0F4A40" stroke-width="2"/></svg>');
      b.disabled = st.done;
      b.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._append(w); });
      b.addEventListener('pointerdown', function (e) { self._dragPot(e, w, b); });
      row.appendChild(b);
    };
    pot('pot', U, this._t(U === 2 * C.E8 ? 'aBigPot' : 'aPot'), U === 2 * C.E8);
    if (r.kind === 'lay' && r.decoy) pot('decoy', r.decoy, this._t('aDecoy'), false);
    /* the label: [object] = [ ] [helper] (big and small: two boxes) */
    var o = C.objOf(st); if (!o) return;
    var lab = this.api.el('div', 'oh-label'); lab.setAttribute('aria-label', this._t('aLabel'));
    /* no picture copy on the label: the object itself stands full size right above it (a shrunken copy breaks the picture floor) */
    var eq = function () { var s = self.api.el('span', 'oh-eq'); s.textContent = '='; lab.appendChild(s); };
    var box = function (val, live) { var s = self.api.el('span', 'oh-box' + (live ? ' is-live' : '')); s.textContent = val == null ? '' : String(val); lab.appendChild(s); };
    var cap = function (big) { var s = self.api.el('span', 'oh-icon' + (big ? ' is-big' : '')); lab.appendChild(s); };
    if (r.kind === 'big') { box(st.phase === 1 ? st.bigN : st.typed, st.phase === 0); cap(true); eq(); box(st.phase === 1 ? st.typed : '', st.phase === 1); cap(false); }
    else { box(st.typed, true); cap(false); }
    row.appendChild(lab);
  },
  /* ---- the keypad: 1–10 and delete; shown once Inchie has reached the end ---- */
  _paintPad: function (D) {
    var C = OneHopCore, st = this.st, r = st.r, pad = this._qs('.oh-pad'), self = this;
    /* the keypad OPENS when Inchie reaches the end (design §5) — until then it takes no room */
    var on = C.canType(st);
    pad.innerHTML = ''; pad.style.display = on ? '' : 'none';
    if (!on) return;
    for (var d = 1; d <= 10; d++) (function (d) { var b = self._btn('oh-key', 'key-' + d, String(d)); b.textContent = String(d); b.disabled = !on; b.addEventListener('click', function () { self._type(d); }); pad.appendChild(b); })(d);
    var del = this._btn('oh-key is-del', 'key-del', this._t('aDel'), '⌫'); del.disabled = !on; del.addEventListener('click', function () { self._type('del'); }); pad.appendChild(del);
  },

  /* ---------------- actions ---------------- */
  _edit: function (extra) { this._clearTimers(); this._busy = false; this._view = extra || {}; this._paint(); },
  _append: function (w) { if (this._busy || this.st.done) return; if (OneHopCore.append(this.st, w) >= 0) { this.api.sound(1400); this._edit(); } },
  _hop: function () {
    var C = OneHopCore, st = this.st; if (this._busy || st.done) return;
    if (st.status && st.status !== 'seam') { this.api.sound(180); this._edit({ note: this._t(st.status === 'end' ? 'hintWrite' : 'fHome') }); return; }
    var res = C.hop(st); if (!res) return;
    if (res.status === 'none') { this._edit({ note: this._t('fNone') }); return; }
    var ok = res.status === 'seam' || res.status === 'end';
    this.api.sound(ok ? 520 + st.hops * 40 : 160);
    var fk = C.faultKey(res.status);
    this._edit({ note: res.status === 'end' ? this._t('hintWrite') : fk ? this._t(fk) : '' });
    this.api.announce(this._t(ok ? 'aHopOk' : 'aHopBad', { k: st.hops }));
  },
  _home: function () { if (this._busy || this.st.done) return; OneHopCore.home(this.st); this.api.sound(300); this._edit(); },
  _type: function (d) { if (OneHopCore.type(this.st, d) === 'typed') { this.api.sound(500); this._edit(); } },
  _run: function (t) { var st = this.st; if (this._busy || st.done) return; var run = OneHopCore.runTrack(st, t); if (!run) return; var last = run[run.length - 1].status; this.api.sound(last === 'end' ? 880 : 180); var fk = OneHopCore.faultKey(last); this._edit({ ran: t, note: last === 'end' ? this._t('hEnd') : fk ? this._t(fk) : '' }); },
  _pickTrack: function (t) { if (this._busy || this.st.done) return; if (OneHopCore.pickTrack(this.st, t) === 'picked') { this.api.sound(440); this._edit({ ran: this._view.ran }); } },
  /* x on the path (units from the stone) under a client x */
  _xAt: function (cx) { var D = this._dims(), R = this._qs('.oh-bed').getBoundingClientRect(); return (cx - R.left - D.x0) / D.u; },
  _onPath: function (cy) { var R = this._qs('.oh-path') && this._qs('.oh-path').getBoundingClientRect(); return !!R && cy > R.top - 48 && cy < R.bottom + 48; },
  _dragPot: function (e, w, el) {
    var self = this; if (this._busy || this.st.done || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, y0 = e.clientY, ghost = null, moved = false, D = this._dims();
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
      if (!moved) { moved = true; ghost = document.createElement('span'); ghost.className = 'oh-ghost'; ghost.style.width = (w / OneHopCore.E8 * D.u) + 'px'; ghost.style.height = D.capH + 'px'; document.body.appendChild(ghost); }
      ghost.style.left = (ev.clientX - w / OneHopCore.E8 * D.u / 2) + 'px'; ghost.style.top = (ev.clientY - D.capH / 2) + 'px';
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!moved) return;
      self._dragUntil = Date.now() + 300; if (ghost) ghost.remove();
      if (!self._onPath(ev.clientY)) return;
      var x = self._xAt(ev.clientX) - w / OneHopCore.E8 / 2;
      if (OneHopCore.lay(self.st, x, w) >= 0) { var h = self.st.helpers[self.st.helpers.length - 1], flush = self.st.helpers.some(function (o) { return o !== h && o.p + o.w === h.p; }) || h.p === 0; self.api.sound(flush ? 1400 : 700); self._edit(); }
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _dragHelper: function (e, i, el) {
    var self = this; if (this._busy || this.st.done || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, y0 = e.clientY, moved = false, startP = this.st.helpers[i].p / OneHopCore.E8, D = this._dims();
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
      moved = true; el.style.transform = 'translate(' + (ev.clientX - x0) + 'px,' + (ev.clientY - y0) + 'px)'; el.classList.add('is-drag');
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!moved) return;
      self._dragUntil = Date.now() + 300;
      if (!self._onPath(ev.clientY)) { OneHopCore.remove(self.st, i); self.api.sound(250); self._edit(); return; }
      OneHopCore.move(self.st, i, startP + (ev.clientX - x0) / D.u); self.api.sound(700); self._edit();
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _helperKey: function (e, i) {
    var C = OneHopCore, k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') { C.nudge(this.st, i, k === 'ArrowLeft' ? -1 : 1); this._edit(); e.preventDefault(); e.stopPropagation(); }
    else if (k === 'Delete' || k === 'Backspace') { C.remove(this.st, i); this._edit(); e.preventDefault(); e.stopPropagation(); }
  },
  _keydown: function (e) {
    var k = e.key, st = this.st; if (this._busy || st.done) return;
    if (/^[0-9]$/.test(k) && OneHopCore.canType(st)) { this._type(k === '0' ? 10 : +k); e.preventDefault(); }
  },
  _check: function () {
    var C = OneHopCore, st = this.st;
    if (this._busy || st.done) return;
    var a = C.check(st);
    this._view = { checked: true, ran: this._view.ran };
    if (a.result === 'none') { this.api.sound(200); this._paint(); this.api.announce(this._qs('.oh-note').textContent || ''); return; }
    if (a.result === 'step') { this.api.sound(760); this._view = { note: this._t(st.r.kind === 'big' ? 'okBigStep' : 'okCard') }; this._setPrompt(); this._paint(); return; }
    if (a.result === 'ok') {
      var msg = this._okText(); this._view.msg = msg; this.api.sound(880); this._paint(); this.api.announce(msg);
      this._advance(msg.length * 60 + 2800);
    } else { this.api.sound(220); this._paint(); this.api.announce(this._qs('.oh-note').textContent || ''); }
  },
  _okText: function () {
    var ok = OneHopCore.okOf(this.st), self = this;
    if (ok.key === 'okLen') return this._t('okLen', { Obj: this._cap(this._objPhrase(ok.obj)), n: this._t('nHelpers', { n: ok.n }), long: this._objLong(ok.obj) });
    if (ok.key === 'okBig') return this._t('okBig', { B: ok.B, S: ok.S });
    if (ok.key === 'okOrder') return this._cap(this._t('okOrder', { o1: self._objPhrase(ok.objs[0]), o2: self._objPhrase(ok.objs[1]), o3: self._objPhrase(ok.objs[2]) }));
    return this._t(ok.key);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

var ohCssDone = false;
function injectHopCSS() {
  if (ohCssDone || typeof document === 'undefined') return;
  ohCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.oh-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .oh-wrap:focus{outline:none;} .oh-wrap.is-narrow{gap:6px;}'
  + '.oh-bed{position:relative;border-radius:14px;background:#F6EEDC;box-shadow:inset 0 0 0 2px #E2D2B4;overflow:visible;}'
  + '.oh-obj{position:absolute;display:block;pointer-events:none;}'
  + '.oh-guide{position:absolute;width:0;border-left:2px dashed #B59A70;opacity:.7;pointer-events:none;}'
  + '.oh-path{position:absolute;background:#E9D9BE;border-top:2px solid #CDB58C;border-bottom:2px solid #CDB58C;box-sizing:border-box;}'
  + '.oh-stone{position:absolute;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#C7C2BA,#8F8A82);box-shadow:0 2px 0 #6F6A62;}'
  + '.oh-gap{position:absolute;background:rgba(242,120,75,.28);box-shadow:inset 0 0 0 2px #F2784B;border-radius:4px;pointer-events:none;}'
  + '.oh-helper{position:absolute;border:0;background:transparent;padding:0;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;z-index:2;}'
  + '.oh-cap{display:block;border-radius:999px;background:#6DBB5E;box-shadow:inset 0 0 0 3px #0F4A40,inset 0 6px 0 rgba(255,255,255,.28);box-sizing:border-box;}'
  + '.oh-cap.is-track{position:absolute;pointer-events:none;}'
  + '.oh-helper.is-big .oh-cap{background:#4FA544;} .oh-helper.is-odd .oh-cap,.oh-cap.is-odd{background:#A6D18F;} .oh-helper.is-up{z-index:3;} .oh-helper.is-up .oh-cap{transform:translateY(-6px) rotate(-3deg);}'
  + '.oh-helper.is-bad .oh-cap,.oh-cap.is-bad{box-shadow:inset 0 0 0 3px #0F4A40,0 0 0 3px #F2784B;}'
  + '.oh-helper.is-drag{opacity:.85;z-index:5;transition:none;} .oh-helper:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}'
  + '.oh-print{position:absolute;width:10px;height:10px;border-radius:50%;background:#8C6A45;opacity:.75;pointer-events:none;} .oh-print.is-bad{background:#F2784B;opacity:1;}'
  + '.oh-worm{position:absolute;border:0;background:transparent;padding:0;cursor:pointer;z-index:4;transition:left .26s ease-out;} .oh-wormpic{display:block;width:100%;height:100%;pointer-events:none;}'
  + '.oh-worm.is-gap .oh-wormpic{transform:translateY(16px);} .oh-worm.is-overlap .oh-wormpic{animation:ohWobble .3s ease-in-out 3;} .oh-worm.is-inside .oh-wormpic,.oh-worm.is-start .oh-wormpic,.oh-worm.is-past .oh-wormpic,.oh-worm.is-short .oh-wormpic{transform:rotate(-15deg);} .oh-worm.is-end .oh-wormpic{filter:drop-shadow(0 0 7px #F4CF62) drop-shadow(0 0 2px #F4CF62);}'
  + '@keyframes ohWobble{25%{transform:rotate(8deg);}75%{transform:rotate(-8deg);}}'
  + '.oh-wormj{position:absolute;pointer-events:none;} .oh-wormj.is-gap{transform:translateY(10px);} .oh-wormj.is-overlap,.oh-wormj.is-inside,.oh-wormj.is-start,.oh-wormj.is-past{transform:rotate(-15deg);}'
  + '.oh-sum{position:absolute;height:12px;border-radius:999px;background:#6DBB5E;box-shadow:inset 0 0 0 2px #0F4A40;animation:ohPop .3s ease-out both;pointer-events:none;} @keyframes ohPop{from{transform:scale(.3);opacity:0;}to{transform:none;opacity:1;}}'
  + '.oh-wrap.is-fast .oh-worm,.oh-wrap.is-fast .oh-wormpic,.oh-wrap.is-fast .oh-sum{animation:none !important;transition:none !important;}'
  + '.oh-track{position:absolute;border:0;background:#E9D9BE;border-radius:10px;box-shadow:inset 0 0 0 2px #CDB58C;cursor:pointer;padding:0;} .oh-track.is-picked{box-shadow:inset 0 0 0 4px #146B5E;background:#DFF0EA;} .oh-track.is-right{box-shadow:inset 0 0 0 4px #F4CF62;}'
  + '.oh-run{position:absolute;width:44px;height:44px;border:0;border-radius:50%;background:radial-gradient(circle at 35% 35%,#C7C2BA,#8F8A82);box-shadow:0 3px 0 #6F6A62;cursor:pointer;z-index:3;} .oh-run.is-ran{box-shadow:0 3px 0 #6F6A62,0 0 0 3px #146B5E;}'
  + '.oh-queue{display:flex;flex-direction:column;align-items:center;gap:8px;} .oh-cards{display:flex;gap:10px;justify-content:center;}'
  + '.oh-card{position:relative;border:0;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #E2D2B4;padding:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;} .oh-card img{display:block;} .oh-card.is-cur{box-shadow:inset 0 0 0 3px #146B5E;} .oh-card.is-chosen{box-shadow:inset 0 0 0 4px #146B5E;background:#DFF0EA;} .oh-card.is-placed{opacity:.45;} .oh-card:disabled{cursor:default;}'
  + '.oh-cardlab{position:absolute;right:-6px;bottom:-6px;min-width:30px;height:30px;border-radius:8px;background:#FFF6D8;box-shadow:inset 0 0 0 2px #C9A54E;font-family:' + H + ';font-weight:800;font-size:20px;line-height:30px;color:#3A2E1F;text-align:center;}'
  + '.oh-shelf{display:flex;align-items:flex-end;gap:10px;} .oh-slot{position:relative;width:calc(var(--oh-cs,64px) + 14px);border:0;border-radius:10px;background:#F4ECDD;box-shadow:inset 0 0 0 2px #E2D5BF;cursor:pointer;display:flex;align-items:center;justify-content:center;} .oh-slot.is-0{height:calc(var(--oh-cs,64px) + 14px);} .oh-slot.is-1{height:calc(var(--oh-cs,64px) + 28px);} .oh-slot.is-2{height:calc(var(--oh-cs,64px) + 42px);} .oh-slot.is-full{box-shadow:inset 0 0 0 3px #146B5E;} .oh-slot.is-right{box-shadow:inset 0 0 0 3px #F4CF62;} .oh-slot img{display:block;}'
  + '.oh-row{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}'
  + '.oh-pot{width:72px;height:62px;border:0;border-radius:14px;background:#F1E7D6;box-shadow:0 3px 0 #C9B79A;cursor:grab;padding:3px;touch-action:none;} .oh-pot svg{width:100%;height:100%;display:block;} .oh-pot.is-decoy{background:#ECE4F2;box-shadow:0 3px 0 #B9A9C9;} .oh-pot:disabled{opacity:.5;cursor:default;}'
  + '.oh-ghost{position:fixed;z-index:60;border-radius:999px;background:#6DBB5E;box-shadow:inset 0 0 0 3px #0F4A40;pointer-events:none;opacity:.9;}'
  + '.oh-label{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #B98A55,0 3px 0 #8C6A45;} .oh-labpic{display:block;width:40px;height:40px;} .oh-eq{font-family:' + H + ';font-weight:800;font-size:24px;color:#3A2E1F;}'
  + '.oh-box{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 2px #C9B79A;font-family:' + H + ';font-weight:800;font-size:26px;color:#146B5E;} .oh-box.is-live{box-shadow:inset 0 0 0 3px #146B5E;}'
  + '.oh-icon{display:inline-block;width:30px;height:14px;border-radius:999px;background:#6DBB5E;box-shadow:inset 0 0 0 2px #0F4A40;} .oh-icon.is-big{width:52px;background:#4FA544;}'
  + '.oh-wrap.is-narrow .oh-row{gap:8px;} .oh-wrap.is-narrow .oh-pot{width:60px;height:52px;} .oh-wrap.is-narrow .oh-label{gap:4px;padding:5px 8px;} .oh-wrap.is-narrow .oh-labpic{width:32px;height:32px;} .oh-wrap.is-narrow .oh-box{width:40px;height:40px;font-size:24px;} .oh-wrap.is-narrow .oh-eq{font-size:20px;} .oh-wrap.is-narrow .oh-icon{width:24px;} .oh-wrap.is-narrow .oh-icon.is-big{width:40px;}'
  + '.oh-pad{display:grid;grid-template-columns:repeat(11,48px);gap:6px;justify-content:center;} .oh-wrap.is-narrow .oh-pad{grid-template-columns:repeat(6,44px);gap:5px;}'
  + '.oh-key{height:48px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #C9B79A,0 2px 0 #C9B79A;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2E1F;cursor:pointer;} .oh-wrap.is-narrow .oh-key{height:44px;font-size:20px;} .oh-key:disabled{opacity:.35;cursor:default;}'
  + '.oh-foot{display:flex;justify-content:center;} .oh-check{min-width:150px;min-height:54px;padding:0 26px;border:0;border-radius:16px;background:#1E8C78;color:#fff;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0E5E50;} .oh-check:disabled{opacity:.5;cursor:default;}'
  + '.oh-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .oh-note.is-hint{color:#8A3B1F;} .oh-wrap.is-narrow .oh-note{font-size:17px;}'
  + '.oh-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var s = document.createElement('style'); s.id = 'oh-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.OneHopActivity = OneHopActivity;
