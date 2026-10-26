/* =====================================================================
   parking-tower-activity.js — ACTIVITY #36 of the one-by-one rebuild:
   "Bramble's Parking Tower" (K.G.A.1; Grade 2 grid codes + compass).
   Design sheet: docs/activities-rebuild/designs/036-parking-tower.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: a vehicle can only ride the lift up and down and drive
   along a floor, so every position word becomes a route the child sees.
   The dotted route stays after parking; a miss grows a teal arrow for the
   ASKED position and a coral one to where the vehicle is.

   ACTIVITY LAYER ONLY: the model is parking-tower-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.ParkingTowerActivity.st / ._order / ._pool / .FAST.
   Words never sit on the apparatus: the plan's letters and numbers are
   its coordinates; the vehicle words in the task line are underlined in
   the colour of the ring round that vehicle (teal = the mover, coral =
   the landmark).
   ===================================================================== */
'use strict';

var ParkingTowerActivity = {
  id: 'parking-tower',
  apparatusClasses: ['pt-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:          {en:'Bramble’s Parking Tower',de:'Bennos Parkturm',fr:'Le parking à étages de Bramble',es:'El estacionamiento de Beto',pt:'O estacionamento do Beto',it:'La torre-parcheggio di Bruno',nl:'De parkeertoren van Bram',sv:'Bosses parkeringshus',da:'Bents parkeringshus',no:'Bjarnes parkeringshus',fi:'Paavon pysäköintitalo'},
    instruction:    {en:'Help Bramble park each vehicle in the right space, then press Check.',de:'Hilf Benno, jedes Fahrzeug am richtigen Platz zu parken, und tippe dann auf Prüfen.',fr:'Aide Bramble à garer chaque véhicule au bon endroit, puis touche Vérifier.',es:'Ayuda a Beto a estacionar cada vehículo en su lugar y luego toca Revisar.',pt:'Ajude o Beto a estacionar cada veículo no lugar certo e depois toque em Conferir.',it:'Aiuta Bruno a parcheggiare ogni veicolo al posto giusto, poi tocca Controlla.',nl:'Help Bram elk voertuig op de goede plek te parkeren en tik dan op Controleren.',sv:'Hjälp Bosse att parkera varje fordon på rätt plats och tryck sedan på Kontrollera.',da:'Hjælp Bent med at parkere hvert køretøj på den rigtige plads, og tryk så på Tjek.',no:'Hjelp Bjarne å parkere hvert kjøretøy på riktig plass, og trykk så på Sjekk.',fi:'Auta Paavoa pysäköimään jokainen kulkuneuvo oikeaan paikkaan ja paina sitten Tarkista.'},
    check:          {en:'Check',de:'Prüfen',fr:'Vérifier',es:'Revisar',pt:'Conferir',it:'Controlla',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    hintTapFree:    {en:'Tap an empty space to park.',de:'Tippe auf einen leeren Platz zum Parken.',fr:'Touche une place vide pour te garer.',es:'Toca un lugar vacío para estacionar.',pt:'Toque em uma vaga vazia para estacionar.',it:'Tocca un posto vuoto per parcheggiare.',nl:'Tik op een lege plek om te parkeren.',sv:'Tryck på en tom plats för att parkera.',da:'Tryk på en tom plads for at parkere.',no:'Trykk på en tom plass for å parkere.',fi:'Napauta tyhjää paikkaa pysäköidäksesi.'},
    hintTapTruck:   {en:'Tap one of the trucks.',de:'Tippe auf einen der Lastwagen.',fr:'Touche un des camions.',es:'Toca uno de los tráileres.',pt:'Toque em um dos caminhões.',it:'Tocca uno dei camion.',nl:'Tik op een van de vrachtwagens.',sv:'Tryck på en av lastbilarna.',da:'Tryk på en af lastbilerne.',no:'Trykk på en av lastebilene.',fi:'Napauta yhtä kuorma-autoista.'},
    hintDials:      {en:'Turn the wheels to set the code.',de:'Dreh an den Rädern, um das Feld einzustellen.',fr:'Tourne les roues pour régler le code.',es:'Gira las ruedas para marcar la casilla.',pt:'Gire as rodas para marcar o código.',it:'Gira le rotelle per impostare il codice.',nl:'Draai aan de wieltjes om de code in te stellen.',sv:'Vrid på hjulen för att ställa in rutan.',da:'Drej på hjulene for at indstille feltet.',no:'Drei på hjulene for å stille inn ruten.',fi:'Pyöritä rullia ja aseta koodi.'},
    hintAbove:      {en:'Above means straight up, one floor — a ride up the lift.',de:'Über heißt: genau eine Etage höher – mit dem Aufzug gerade nach oben.',fr:'Au-dessus, c’est juste un étage plus haut, tout droit : on monte avec l’ascenseur.',es:'Arriba de quiere decir justo un piso más arriba: se sube derecho en el elevador.',pt:'Em cima quer dizer um andar acima, bem reto: é só subir de elevador.',it:'Sopra vuol dire un piano più su, dritto in alto: si sale con l’ascensore.',nl:'Boven betekent één verdieping recht omhoog – met de lift.',sv:'Ovanför betyder en våning rakt upp – åk hissen uppåt.',da:'Over betyder én etage lige op – kør op med elevatoren.',no:'Over betyr én etasje rett opp – kjør heisen oppover.',fi:'Yläpuolella tarkoittaa yhtä kerrosta suoraan ylempänä – hissillä ylös.'},
    hintBelow:      {en:'Below means straight down, one floor — a ride down the lift.',de:'Unter heißt: genau eine Etage tiefer – mit dem Aufzug gerade nach unten.',fr:'En dessous, c’est juste un étage plus bas, tout droit : on descend avec l’ascenseur.',es:'Abajo de quiere decir justo un piso más abajo: se baja derecho en el elevador.',pt:'Embaixo quer dizer um andar abaixo, bem reto: é só descer de elevador.',it:'Sotto vuol dire un piano più giù, dritto in basso: si scende con l’ascensore.',nl:'Onder betekent één verdieping recht omlaag – met de lift.',sv:'Under betyder en våning rakt ner – åk hissen nedåt.',da:'Under betyder én etage lige ned – kør ned med elevatoren.',no:'Under betyr én etasje rett ned – kjør heisen nedover.',fi:'Alapuolella tarkoittaa yhtä kerrosta suoraan alempana – hissillä alas.'},
    hintNext:       {en:'Next to means on the same floor, side by side.',de:'Neben heißt: auf derselben Etage, direkt daneben.',fr:'À côté, c’est au même étage, tout près.',es:'Junto a quiere decir en el mismo piso, uno al lado del otro.',pt:'Ao lado quer dizer no mesmo andar, um do lado do outro.',it:'Accanto vuol dire sullo stesso piano, uno vicino all’altro.',nl:'Naast betekent op dezelfde verdieping, vlak ernaast.',sv:'Bredvid betyder på samma våning, sida vid sida.',da:'Ved siden af betyder på samme etage, lige ved siden af.',no:'Ved siden av betyr i samme etasje, rett ved siden av.',fi:'Vieressä tarkoittaa samassa kerroksessa, ihan vierekkäin.'},
    hintLeft:       {en:'Left is this side — on the same floor.',de:'Links ist diese Seite – auf derselben Etage.',fr:'La gauche, c’est de ce côté, au même étage.',es:'La izquierda es de este lado, en el mismo piso.',pt:'A esquerda é deste lado, no mesmo andar.',it:'La sinistra è da questa parte, sullo stesso piano.',nl:'Links is deze kant – op dezelfde verdieping.',sv:'Vänster är den här sidan – på samma våning.',da:'Venstre er denne side – på samme etage.',no:'Venstre er denne siden – i samme etasje.',fi:'Vasen on tämä puoli – samassa kerroksessa.'},
    hintRight:      {en:'Right is this side — on the same floor.',de:'Rechts ist diese Seite – auf derselben Etage.',fr:'La droite, c’est de ce côté, au même étage.',es:'La derecha es de este lado, en el mismo piso.',pt:'A direita é deste lado, no mesmo andar.',it:'La destra è da questa parte, sullo stesso piano.',nl:'Rechts is deze kant – op dezelfde verdieping.',sv:'Höger är den här sidan – på samma våning.',da:'Højre er denne side – på samme etage.',no:'Høyre er denne siden – i samme etasje.',fi:'Oikea on tämä puoli – samassa kerroksessa.'},
    hintBetween:    {en:'Between means one on each side — or one above and one below.',de:'Zwischen heißt: auf jeder Seite einer – oder einer oben und einer unten.',fr:'Entre, c’est avec un véhicule de chaque côté – ou un au-dessus et un en dessous.',es:'Entre quiere decir con uno de cada lado, o uno arriba y uno abajo.',pt:'Entre quer dizer com um de cada lado, ou um em cima e um embaixo.',it:'Tra vuol dire con uno da ogni lato, o uno sopra e uno sotto.',nl:'Tussen betekent: aan elke kant één – of één erboven en één eronder.',sv:'Mellan betyder en på varje sida – eller en ovanför och en under.',da:'Mellem betyder én på hver side – eller én over og én under.',no:'Mellom betyr én på hver side – eller én over og én under.',fi:'Välissä tarkoittaa, että kummallakin puolella on yksi – tai yksi yllä ja yksi alla.'},
    hintTOn:        {en:'On top of the tower means up on the roof.',de:'Oben auf dem Turm heißt: ganz oben auf dem Dach.',fr:'En haut de la tour, c’est sur le toit.',es:'Encima de la torre quiere decir arriba, en el techo.',pt:'Em cima da torre quer dizer lá no telhado.',it:'In cima alla torre vuol dire sul tetto.',nl:'Boven op de toren betekent op het dak.',sv:'Uppe på tornet betyder på taket.',da:'Oven på tårnet betyder oppe på taget.',no:'Oppå tårnet betyr oppe på taket.',fi:'Tornin päällä tarkoittaa ylhäällä katolla.'},
    hintTUnder:     {en:'Under the tower means down below the ground.',de:'Unter dem Turm heißt: unten unter der Erde.',fr:'Sous la tour, c’est en bas, sous le sol.',es:'Debajo de la torre quiere decir abajo, bajo el suelo.',pt:'Embaixo da torre quer dizer lá embaixo, debaixo do chão.',it:'Sotto la torre vuol dire giù, sotto terra.',nl:'Onder de toren betekent onder de grond.',sv:'Under tornet betyder nere under marken.',da:'Under tårnet betyder nede under jorden.',no:'Under tårnet betyr nede under bakken.',fi:'Tornin alla tarkoittaa alhaalla maan alla.'},
    hintTBeside:    {en:'Beside the tower means on the street, right by it.',de:'Neben dem Turm heißt: auf der Straße, direkt daneben.',fr:'À côté de la tour, c’est dans la rue, tout près.',es:'Junto a la torre quiere decir en la calle, pegado a ella.',pt:'Ao lado da torre quer dizer na rua, bem pertinho.',it:'Accanto alla torre vuol dire in strada, lì vicino.',nl:'Naast de toren betekent op straat, er vlak naast.',sv:'Bredvid tornet betyder ute på gatan, alldeles intill.',da:'Ved siden af tårnet betyder på gaden, lige ved siden af.',no:'Ved siden av tårnet betyr på gata, rett ved siden av.',fi:'Tornin vieressä tarkoittaa kadulla, ihan vieressä.'},
    hintTInside:    {en:'Inside the tower means in one of its parking spaces.',de:'Im Turm heißt: auf einem seiner Parkplätze.',fr:'Dans la tour, c’est sur une de ses places.',es:'Dentro de la torre quiere decir en uno de sus lugares.',pt:'Dentro da torre quer dizer em uma das vagas dela.',it:'Dentro la torre vuol dire in uno dei suoi posti.',nl:'In de toren betekent op een van de plekken binnen.',sv:'Inne i tornet betyder på en av platserna där inne.',da:'Inde i tårnet betyder på en af pladserne derinde.',no:'Inne i tårnet betyr på en av plassene der inne.',fi:'Tornissa tarkoittaa jollakin sen pysäköintipaikoista.'},
    hintTOutside:   {en:'Outside the tower means out on the street.',de:'Draußen vor dem Turm heißt: draußen auf der Straße.',fr:'En dehors de la tour, c’est dehors, dans la rue.',es:'Fuera de la torre quiere decir afuera, en la calle.',pt:'Fora da torre quer dizer lá fora, na rua.',it:'Fuori dalla torre vuol dire fuori, in strada.',nl:'Buiten de toren betekent buiten op straat.',sv:'Utanför tornet betyder ute på gatan.',da:'Uden for tårnet betyder ude på gaden.',no:'Utenfor tårnet betyr ute på gata.',fi:'Tornin ulkopuolella tarkoittaa ulkona kadulla.'},
    hintTTop:       {en:'The top level is the highest floor of spaces.',de:'Die oberste Etage ist die höchste Reihe Parkplätze.',fr:'Le dernier étage, c’est la rangée de places tout en haut.',es:'El piso de arriba es la fila de lugares más alta.',pt:'O andar de cima é a fileira de vagas mais alta.',it:'Il piano più alto è la fila di posti più in alto.',nl:'De bovenste verdieping is de hoogste rij plekken.',sv:'Översta våningen är den högsta raden platser.',da:'Øverste etage er den øverste række pladser.',no:'Øverste etasje er den øverste raden med plasser.',fi:'Ylin kerros on korkein rivi paikkoja.'},
    hintTMiddle:    {en:'The middle level has one floor above it and one below it.',de:'Die mittlere Etage hat eine Etage darüber und eine darunter.',fr:'L’étage du milieu a un étage au-dessus et un en dessous.',es:'El piso de en medio tiene un piso arriba y uno abajo.',pt:'O andar do meio tem um andar em cima e um embaixo.',it:'Il piano di mezzo ha un piano sopra e uno sotto.',nl:'De middelste verdieping heeft er één boven zich en één onder zich.',sv:'Mittersta våningen har en våning ovanför och en under.',da:'Midterste etage har én etage over sig og én under sig.',no:'Midterste etasje har én etasje over seg og én under seg.',fi:'Keskimmäisen kerroksen yläpuolella on yksi kerros ja alapuolella yksi.'},
    hintTBottom:    {en:'The bottom level is the lowest floor of spaces.',de:'Die unterste Etage ist die tiefste Reihe Parkplätze.',fr:'L’étage du bas, c’est la rangée de places tout en bas.',es:'El piso de abajo es la fila de lugares más baja.',pt:'O andar de baixo é a fileira de vagas mais baixa.',it:'Il piano più basso è la fila di posti più in basso.',nl:'De onderste verdieping is de laagste rij plekken.',sv:'Nedersta våningen är den lägsta raden platser.',da:'Nederste etage er den nederste række pladser.',no:'Nederste etasje er den nederste raden med plasser.',fi:'Alin kerros on matalin rivi paikkoja.'},
    hintTLeftside:  {en:'The left side is this side of the tower.',de:'Links ist diese Seite vom Turm.',fr:'La gauche, c’est ce côté de la tour.',es:'La izquierda es este lado de la torre.',pt:'A esquerda é este lado da torre.',it:'La sinistra è questo lato della torre.',nl:'Links is deze kant van de toren.',sv:'Vänster är den här sidan av tornet.',da:'Venstre er denne side af tårnet.',no:'Venstre er denne siden av tårnet.',fi:'Vasen on tämä puoli tornia.'},
    hintCode:       {en:'Letter across the top, number down the side.',de:'Der Buchstabe steht oben, die Zahl an der Seite.',fr:'La lettre est en haut, le nombre sur le côté.',es:'La letra está arriba y el número al lado.',pt:'A letra fica em cima e o número do lado.',it:'La lettera è in alto, il numero sul lato.',nl:'De letter staat bovenaan, het getal aan de zijkant.',sv:'Bokstaven står överst, talet på sidan.',da:'Bogstavet står øverst, tallet i siden.',no:'Bokstaven står øverst, tallet på siden.',fi:'Kirjain on ylhäällä, numero sivussa.'},
    hintNorth:      {en:'Find north on the compass first.',de:'Such zuerst Norden auf dem Kompass.',fr:'Trouve d’abord le nord sur la boussole.',es:'Primero busca el norte en la brújula.',pt:'Primeiro ache o norte na bússola.',it:'Prima trova il nord sulla bussola.',nl:'Zoek eerst het noorden op het kompas.',sv:'Hitta norr på kompassen först.',da:'Find først nord på kompasset.',no:'Finn nord på kompasset først.',fi:'Etsi ensin pohjoinen kompassista.'},
    hintStrong:     {en:'Park where it is glowing.',de:'Parke dort, wo es leuchtet.',fr:'Gare-toi là où ça brille.',es:'Estaciona donde brilla.',pt:'Estacione onde está brilhando.',it:'Parcheggia dove si illumina.',nl:'Parkeer waar het oplicht.',sv:'Parkera där det lyser.',da:'Parkér der, hvor det lyser.',no:'Parker der det lyser.',fi:'Pysäköi hehkuvaan paikkaan.'},
    hintStrongTap:  {en:'Tap the truck that is glowing.',de:'Tippe auf den Lastwagen, der leuchtet.',fr:'Touche le camion qui brille.',es:'Toca el tráiler que brilla.',pt:'Toque no caminhão que está brilhando.',it:'Tocca il camion che si illumina.',nl:'Tik op de vrachtwagen die oplicht.',sv:'Tryck på lastbilen som lyser.',da:'Tryk på lastbilen, der lyser.',no:'Trykk på lastebilen som lyser.',fi:'Napauta hehkuvaa kuorma-autoa.'},
    hintStrongRead: {en:'Read the glowing letter and number.',de:'Lies den leuchtenden Buchstaben und die Zahl.',fr:'Lis la lettre et le nombre qui brillent.',es:'Lee la letra y el número que brillan.',pt:'Leia a letra e o número que estão brilhando.',it:'Leggi la lettera e il numero illuminati.',nl:'Lees de letter en het getal die oplichten.',sv:'Läs bokstaven och talet som lyser.',da:'Læs bogstavet og tallet, der lyser.',no:'Les bokstaven og tallet som lyser.',fi:'Lue hehkuva kirjain ja numero.'},
    setWords:       {en:'Words',de:'Wörter',fr:'Mots',es:'Palabras',pt:'Palavras',it:'Parole',nl:'Woorden',sv:'Ord',da:'Ord',no:'Ord',fi:'Sanat'},
    wNear:          {en:'above · below · between',de:'über · unter · zwischen',fr:'au-dessus · en dessous · entre',es:'arriba · abajo · entre',pt:'em cima · embaixo · entre',it:'sopra · sotto · tra',nl:'boven · onder · tussen',sv:'ovanför · under · mellan',da:'over · under · mellem',no:'over · under · mellom',fi:'yläpuolella · alapuolella · välissä'},
    wTower:         {en:'on top · inside · outside',de:'oben · im · draußen',fr:'en haut · dans · dehors',es:'encima · dentro · fuera',pt:'em cima · dentro · fora',it:'in cima · dentro · fuori',nl:'boven op · in · buiten',sv:'uppe på · inne i · utanför',da:'oven på · inde i · uden for',no:'oppå · inne i · utenfor',fi:'päällä · sisällä · ulkona'},
    wPlan6:         {en:'grid codes 6 × 6',de:'Felder 6 × 6',fr:'cases 6 × 6',es:'casillas 6 × 6',pt:'casas 6 × 6',it:'caselle 6 × 6',nl:'vakjes 6 × 6',sv:'rutor 6 × 6',da:'felter 6 × 6',no:'ruter 6 × 6',fi:'ruudut 6 × 6'},
    wPlan10:        {en:'grid codes 10 × 10',de:'Felder 10 × 10',fr:'cases 10 × 10',es:'casillas 10 × 10',pt:'casas 10 × 10',it:'caselle 10 × 10',nl:'vakjes 10 × 10',sv:'rutor 10 × 10',da:'felter 10 × 10',no:'ruter 10 × 10',fi:'ruudut 10 × 10'},
    roseN:          {en:'N',de:'N',fr:'N',es:'N',pt:'N',it:'N',nl:'N',sv:'N',da:'N',no:'N',fi:'P'},
    roseE:          {en:'E',de:'O',fr:'E',es:'E',pt:'L',it:'E',nl:'O',sv:'Ö',da:'Ø',no:'Ø',fi:'I'},
    roseS:          {en:'S',de:'S',fr:'S',es:'S',pt:'S',it:'S',nl:'Z',sv:'S',da:'S',no:'S',fi:'E'},
    roseW:          {en:'W',de:'W',fr:'O',es:'O',pt:'O',it:'O',nl:'W',sv:'V',da:'V',no:'V',fi:'L'},
    ariaFree:       {en:'empty space',de:'leerer Platz',fr:'place vide',es:'lugar vacío',pt:'vaga vazia',it:'posto vuoto',nl:'lege plek',sv:'tom plats',da:'tom plads',no:'tom plass',fi:'tyhjä paikka'},
    ariaTaken:      {en:'taken',de:'besetzt',fr:'occupée',es:'ocupado',pt:'ocupada',it:'occupato',nl:'bezet',sv:'upptagen',da:'optaget',no:'opptatt',fi:'varattu'},
    ariaLevel:      {en:'floor {l}, space {c}',de:'Etage {l}, Platz {c}',fr:'étage {l}, place {c}',es:'piso {l}, lugar {c}',pt:'andar {l}, vaga {c}',it:'piano {l}, posto {c}',nl:'verdieping {l}, plek {c}',sv:'våning {l}, plats {c}',da:'etage {l}, plads {c}',no:'etasje {l}, plass {c}',fi:'kerros {l}, paikka {c}'},
    ariaRoof:       {en:'the roof',de:'das Dach',fr:'le toit',es:'el techo',pt:'o telhado',it:'il tetto',nl:'het dak',sv:'taket',da:'taget',no:'taket',fi:'katto'},
    ariaBase:       {en:'the basement',de:'der Keller',fr:'le sous-sol',es:'el sótano',pt:'o subsolo',it:'il piano interrato',nl:'de kelder',sv:'källaren',da:'kælderen',no:'kjelleren',fi:'kellari'},
    ariaStreetL:    {en:'the street, left',de:'die Straße, links',fr:'la rue, à gauche',es:'la calle, a la izquierda',pt:'a rua, à esquerda',it:'la strada, a sinistra',nl:'de straat, links',sv:'gatan, till vänster',da:'gaden, til venstre',no:'gata, til venstre',fi:'katu, vasemmalla'},
    ariaStreetR:    {en:'the street, right',de:'die Straße, rechts',fr:'la rue, à droite',es:'la calle, a la derecha',pt:'a rua, à direita',it:'la strada, a destra',nl:'de straat, rechts',sv:'gatan, till höger',da:'gaden, til højre',no:'gata, til høyre',fi:'katu, oikealla'},
    ariaSquare:     {en:'square {code}',de:'Feld {code}',fr:'case {code}',es:'casilla {code}',pt:'casa {code}',it:'casella {code}',nl:'vakje {code}',sv:'ruta {code}',da:'felt {code}',no:'rute {code}',fi:'ruutu {code}'},
    ariaLetter:     {en:'letter',de:'Buchstabe',fr:'lettre',es:'letra',pt:'letra',it:'lettera',nl:'letter',sv:'bokstav',da:'bogstav',no:'bokstav',fi:'kirjain'},
    ariaNumber:     {en:'number',de:'Zahl',fr:'nombre',es:'número',pt:'número',it:'numero',nl:'getal',sv:'tal',da:'tal',no:'tall',fi:'numero'},
    ariaUp:         {en:'up',de:'hoch',fr:'monter',es:'subir',pt:'subir',it:'su',nl:'omhoog',sv:'upp',da:'op',no:'opp',fi:'ylös'},
    ariaDown:       {en:'down',de:'runter',fr:'descendre',es:'bajar',pt:'descer',it:'giù',nl:'omlaag',sv:'ner',da:'ned',no:'ned',fi:'alas'},
    ariaBooth:      {en:'Bramble the beaver in his booth',de:'Benno der Biber in seinem Häuschen',fr:'Bramble le castor dans sa cabine',es:'Beto el castor en su caseta',pt:'O castor Beto na cabine dele',it:'Bruno il castoro nel suo gabbiotto',nl:'Bram de bever in zijn hokje',sv:'Bävern Bosse i sin kur',da:'Bæveren Bent i sin billetbod',no:'Beveren Bjarne i buen sin',fi:'Majava Paavo kopissaan'},
    p_N1:           {en:'Park the truck next to the bus.',de:'Parke den Lastwagen neben dem Bus.',fr:'Gare le camion à côté du bus.',es:'Estaciona el tráiler junto al camión.',pt:'Estacione o caminhão ao lado do ônibus.',it:'Parcheggia il camion accanto all’autobus.',nl:'Parkeer de vrachtwagen naast de bus.',sv:'Parkera lastbilen bredvid bussen.',da:'Parkér lastbilen ved siden af bussen.',no:'Parker lastebilen ved siden av bussen.',fi:'Pysäköi kuorma-auto bussin viereen.'},
    ok_N1:          {en:'Yes — the truck is next to the bus!',de:'Ja – der Lastwagen steht neben dem Bus!',fr:'Oui, le camion est à côté du bus !',es:'¡Sí! El tráiler está junto al camión.',pt:'Isso! O caminhão está ao lado do ônibus!',it:'Sì! Il camion è accanto all’autobus!',nl:'Ja! De vrachtwagen staat naast de bus!',sv:'Ja – lastbilen står bredvid bussen!',da:'Ja – lastbilen holder ved siden af bussen!',no:'Ja – lastebilen står ved siden av bussen!',fi:'Kyllä – kuorma-auto on bussin vieressä!'},
    u_N1:           {en:'truck|bus',de:'Lastwagen|Bus',fr:'camion|bus',es:'tráiler|camión',pt:'caminhão|ônibus',it:'camion|autobus',nl:'vrachtwagen|bus',sv:'lastbilen|bussen',da:'lastbilen|bussen',no:'lastebilen|bussen',fi:'kuorma-auto|bussin'},
    p_N2:           {en:'Park the truck above the van.',de:'Parke den Lastwagen über dem Lieferwagen.',fr:'Gare le camion au-dessus de la camionnette.',es:'Estaciona el tráiler arriba de la camioneta.',pt:'Estacione o caminhão em cima da van.',it:'Parcheggia il camion sopra il furgone.',nl:'Parkeer de vrachtwagen boven het busje.',sv:'Parkera lastbilen ovanför skåpbilen.',da:'Parkér lastbilen over varevognen.',no:'Parker lastebilen over varebilen.',fi:'Pysäköi kuorma-auto pakettiauton yläpuolelle.'},
    ok_N2:          {en:'Yes — the truck is above the van!',de:'Ja – der Lastwagen steht über dem Lieferwagen!',fr:'Oui, le camion est au-dessus de la camionnette !',es:'¡Sí! El tráiler está arriba de la camioneta.',pt:'Isso! O caminhão está em cima da van!',it:'Sì! Il camion è sopra il furgone!',nl:'Ja! De vrachtwagen staat boven het busje!',sv:'Ja – lastbilen står ovanför skåpbilen!',da:'Ja – lastbilen holder over varevognen!',no:'Ja – lastebilen står over varebilen!',fi:'Kyllä – kuorma-auto on pakettiauton yläpuolella!'},
    u_N2:           {en:'truck|van',de:'Lastwagen|Lieferwagen',fr:'camion|camionnette',es:'tráiler|camioneta',pt:'caminhão|van',it:'camion|furgone',nl:'vrachtwagen|busje',sv:'lastbilen|skåpbilen',da:'lastbilen|varevognen',no:'lastebilen|varebilen',fi:'kuorma-auto|pakettiauton'},
    p_N3:           {en:'Park the truck below the car.',de:'Parke den Lastwagen unter dem Auto.',fr:'Gare le camion en dessous de la voiture.',es:'Estaciona el tráiler abajo del carro.',pt:'Estacione o caminhão embaixo do carro.',it:'Parcheggia il camion sotto la macchina.',nl:'Parkeer de vrachtwagen onder de auto.',sv:'Parkera lastbilen under bilen.',da:'Parkér lastbilen under bilen.',no:'Parker lastebilen under bilen.',fi:'Pysäköi kuorma-auto auton alapuolelle.'},
    ok_N3:          {en:'Yes — the truck is below the car!',de:'Ja – der Lastwagen steht unter dem Auto!',fr:'Oui, le camion est en dessous de la voiture !',es:'¡Sí! El tráiler está abajo del carro.',pt:'Isso! O caminhão está embaixo do carro!',it:'Sì! Il camion è sotto la macchina!',nl:'Ja! De vrachtwagen staat onder de auto!',sv:'Ja – lastbilen står under bilen!',da:'Ja – lastbilen holder under bilen!',no:'Ja – lastebilen står under bilen!',fi:'Kyllä – kuorma-auto on auton alapuolella!'},
    u_N3:           {en:'truck|car',de:'Lastwagen|Auto',fr:'camion|voiture',es:'tráiler|carro',pt:'caminhão|carro',it:'camion|macchina',nl:'vrachtwagen|auto',sv:'lastbilen|bilen',da:'lastbilen|bilen',no:'lastebilen|bilen',fi:'kuorma-auto|auton'},
    p_N4:           {en:'Park the truck between the bus and the van.',de:'Parke den Lastwagen zwischen dem Bus und dem Lieferwagen.',fr:'Gare le camion entre le bus et la camionnette.',es:'Estaciona el tráiler entre el camión y la camioneta.',pt:'Estacione o caminhão entre o ônibus e a van.',it:'Parcheggia il camion tra l’autobus e il furgone.',nl:'Parkeer de vrachtwagen tussen de bus en het busje.',sv:'Parkera lastbilen mellan bussen och skåpbilen.',da:'Parkér lastbilen mellem bussen og varevognen.',no:'Parker lastebilen mellom bussen og varebilen.',fi:'Pysäköi kuorma-auto bussin ja pakettiauton väliin.'},
    ok_N4:          {en:'Yes — the truck is between the bus and the van!',de:'Ja – der Lastwagen steht zwischen dem Bus und dem Lieferwagen!',fr:'Oui, le camion est entre le bus et la camionnette !',es:'¡Sí! El tráiler está entre el camión y la camioneta.',pt:'Isso! O caminhão está entre o ônibus e a van!',it:'Sì! Il camion è tra l’autobus e il furgone!',nl:'Ja! De vrachtwagen staat tussen de bus en het busje!',sv:'Ja – lastbilen står mellan bussen och skåpbilen!',da:'Ja – lastbilen holder mellem bussen og varevognen!',no:'Ja – lastebilen står mellom bussen og varebilen!',fi:'Kyllä – kuorma-auto on bussin ja pakettiauton välissä!'},
    u_N4:           {en:'truck|bus,van',de:'Lastwagen|Bus,Lieferwagen',fr:'camion|bus,camionnette',es:'tráiler|camión,camioneta',pt:'caminhão|ônibus,van',it:'camion|autobus,furgone',nl:'vrachtwagen|bus,busje',sv:'lastbilen|bussen,skåpbilen',da:'lastbilen|bussen,varevognen',no:'lastebilen|bussen,varebilen',fi:'kuorma-auto|bussin,pakettiauton'},
    p_N5:           {en:'Park the truck to the left of the bulldozer.',de:'Parke den Lastwagen links neben dem Bulldozer.',fr:'Gare le camion à gauche du bulldozer.',es:'Estaciona el tráiler a la izquierda del bulldozer.',pt:'Estacione o caminhão à esquerda do buldôzer.',it:'Parcheggia il camion a sinistra del bulldozer.',nl:'Parkeer de vrachtwagen links van de bulldozer.',sv:'Parkera lastbilen till vänster om bulldozern.',da:'Parkér lastbilen til venstre for bulldozeren.',no:'Parker lastebilen til venstre for bulldoseren.',fi:'Pysäköi kuorma-auto puskutraktorin vasemmalle puolelle.'},
    ok_N5:          {en:'Yes — the truck is to the left of the bulldozer!',de:'Ja – der Lastwagen steht links neben dem Bulldozer!',fr:'Oui, le camion est à gauche du bulldozer !',es:'¡Sí! El tráiler está a la izquierda del bulldozer.',pt:'Isso! O caminhão está à esquerda do buldôzer!',it:'Sì! Il camion è a sinistra del bulldozer!',nl:'Ja! De vrachtwagen staat links van de bulldozer!',sv:'Ja – lastbilen står till vänster om bulldozern!',da:'Ja – lastbilen holder til venstre for bulldozeren!',no:'Ja – lastebilen står til venstre for bulldoseren!',fi:'Kyllä – kuorma-auto on puskutraktorin vasemmalla puolella!'},
    u_N5:           {en:'truck|bulldozer',de:'Lastwagen|Bulldozer',fr:'camion|bulldozer',es:'tráiler|bulldozer',pt:'caminhão|buldôzer',it:'camion|bulldozer',nl:'vrachtwagen|bulldozer',sv:'lastbilen|bulldozern',da:'lastbilen|bulldozeren',no:'lastebilen|bulldoseren',fi:'kuorma-auto|puskutraktorin'},
    p_N6:           {en:'Park the truck to the right of the ambulance.',de:'Parke den Lastwagen rechts neben dem Krankenwagen.',fr:'Gare le camion à droite de l’ambulance.',es:'Estaciona el tráiler a la derecha de la ambulancia.',pt:'Estacione o caminhão à direita da ambulância.',it:'Parcheggia il camion a destra dell’ambulanza.',nl:'Parkeer de vrachtwagen rechts van de ambulance.',sv:'Parkera lastbilen till höger om ambulansen.',da:'Parkér lastbilen til højre for ambulancen.',no:'Parker lastebilen til høyre for ambulansen.',fi:'Pysäköi kuorma-auto ambulanssin oikealle puolelle.'},
    ok_N6:          {en:'Yes — the truck is to the right of the ambulance!',de:'Ja – der Lastwagen steht rechts neben dem Krankenwagen!',fr:'Oui, le camion est à droite de l’ambulance !',es:'¡Sí! El tráiler está a la derecha de la ambulancia.',pt:'Isso! O caminhão está à direita da ambulância!',it:'Sì! Il camion è a destra dell’ambulanza!',nl:'Ja! De vrachtwagen staat rechts van de ambulance!',sv:'Ja – lastbilen står till höger om ambulansen!',da:'Ja – lastbilen holder til højre for ambulancen!',no:'Ja – lastebilen står til høyre for ambulansen!',fi:'Kyllä – kuorma-auto on ambulanssin oikealla puolella!'},
    u_N6:           {en:'truck|ambulance',de:'Lastwagen|Krankenwagen',fr:'camion|ambulance',es:'tráiler|ambulancia',pt:'caminhão|ambulância',it:'camion|ambulanza',nl:'vrachtwagen|ambulance',sv:'lastbilen|ambulansen',da:'lastbilen|ambulancen',no:'lastebilen|ambulansen',fi:'kuorma-auto|ambulanssin'},
    p_N7:           {en:'Bramble parked above the bus. Tap his truck.',de:'Benno hat über dem Bus geparkt. Tippe auf seinen Lastwagen.',fr:'Bramble s’est garé au-dessus du bus. Touche son camion.',es:'Beto se estacionó arriba del camión. Toca su tráiler.',pt:'O Beto estacionou em cima do ônibus. Toque no caminhão dele.',it:'Bruno ha parcheggiato sopra l’autobus. Tocca il suo camion.',nl:'Bram heeft boven de bus geparkeerd. Tik op zijn vrachtwagen.',sv:'Bosse parkerade ovanför bussen. Tryck på hans lastbil.',da:'Bent parkerede over bussen. Tryk på hans lastbil.',no:'Bjarne parkerte over bussen. Trykk på lastebilen hans.',fi:'Paavo pysäköi bussin yläpuolelle. Napauta hänen kuorma-autoaan.'},
    ok_N7:          {en:'Yes — his truck is above the bus!',de:'Ja – sein Lastwagen steht über dem Bus!',fr:'Oui, son camion est au-dessus du bus !',es:'¡Sí! Su tráiler está arriba del camión.',pt:'Isso! O caminhão dele está em cima do ônibus!',it:'Sì! Il suo camion è sopra l’autobus!',nl:'Ja! Zijn vrachtwagen staat boven de bus!',sv:'Ja – hans lastbil står ovanför bussen!',da:'Ja – hans lastbil holder over bussen!',no:'Ja – lastebilen hans står over bussen!',fi:'Kyllä – hänen kuorma-autonsa on bussin yläpuolella!'},
    u_N7:           {en:'truck|bus',de:'Lastwagen|Bus',fr:'camion|bus',es:'tráiler|camión',pt:'caminhão|ônibus',it:'camion|autobus',nl:'vrachtwagen|bus',sv:'lastbil|bussen',da:'lastbil|bussen',no:'lastebilen|bussen',fi:'kuorma-autoaan|bussin'},
    p_N8:           {en:'Bramble parked to the left of the tractor. Tap his truck.',de:'Benno hat links neben dem Traktor geparkt. Tippe auf seinen Lastwagen.',fr:'Bramble s’est garé à gauche du tracteur. Touche son camion.',es:'Beto se estacionó a la izquierda del tractor. Toca su tráiler.',pt:'O Beto estacionou à esquerda do trator. Toque no caminhão dele.',it:'Bruno ha parcheggiato a sinistra del trattore. Tocca il suo camion.',nl:'Bram heeft links van de tractor geparkeerd. Tik op zijn vrachtwagen.',sv:'Bosse parkerade till vänster om traktorn. Tryck på hans lastbil.',da:'Bent parkerede til venstre for traktoren. Tryk på hans lastbil.',no:'Bjarne parkerte til venstre for traktoren. Trykk på lastebilen hans.',fi:'Paavo pysäköi traktorin vasemmalle puolelle. Napauta hänen kuorma-autoaan.'},
    ok_N8:          {en:'Yes — his truck is to the left of the tractor!',de:'Ja – sein Lastwagen steht links neben dem Traktor!',fr:'Oui, son camion est à gauche du tracteur !',es:'¡Sí! Su tráiler está a la izquierda del tractor.',pt:'Isso! O caminhão dele está à esquerda do trator!',it:'Sì! Il suo camion è a sinistra del trattore!',nl:'Ja! Zijn vrachtwagen staat links van de tractor!',sv:'Ja – hans lastbil står till vänster om traktorn!',da:'Ja – hans lastbil holder til venstre for traktoren!',no:'Ja – lastebilen hans står til venstre for traktoren!',fi:'Kyllä – hänen kuorma-autonsa on traktorin vasemmalla puolella!'},
    u_N8:           {en:'truck|tractor',de:'Lastwagen|Traktor',fr:'camion|tracteur',es:'tráiler|tractor',pt:'caminhão|trator',it:'camion|trattore',nl:'vrachtwagen|tractor',sv:'lastbil|traktorn',da:'lastbil|traktoren',no:'lastebilen|traktoren',fi:'kuorma-autoaan|traktorin'},
    p_N9:           {en:'Park the car between the two trucks.',de:'Parke das Auto zwischen den beiden Lastwagen.',fr:'Gare la voiture entre les deux camions.',es:'Estaciona el carro entre los dos tráileres.',pt:'Estacione o carro entre os dois caminhões.',it:'Parcheggia la macchina tra i due camion.',nl:'Parkeer de auto tussen de twee vrachtwagens.',sv:'Parkera bilen mellan de två lastbilarna.',da:'Parkér bilen mellem de to lastbiler.',no:'Parker bilen mellom de to lastebilene.',fi:'Pysäköi auto kahden kuorma-auton väliin.'},
    ok_N9:          {en:'Yes — the car is between the two trucks!',de:'Ja – das Auto steht zwischen den beiden Lastwagen!',fr:'Oui, la voiture est entre les deux camions !',es:'¡Sí! El carro está entre los dos tráileres.',pt:'Isso! O carro está entre os dois caminhões!',it:'Sì! La macchina è tra i due camion!',nl:'Ja! De auto staat tussen de twee vrachtwagens!',sv:'Ja – bilen står mellan de två lastbilarna!',da:'Ja – bilen holder mellem de to lastbiler!',no:'Ja – bilen står mellom de to lastebilene!',fi:'Kyllä – auto on kahden kuorma-auton välissä!'},
    u_N9:           {en:'car|trucks',de:'Auto|Lastwagen',fr:'voiture|camions',es:'carro|tráileres',pt:'carro|caminhões',it:'macchina|camion',nl:'auto|vrachtwagens',sv:'bilen|lastbilarna',da:'bilen|lastbiler',no:'bilen|lastebilene',fi:'auto|kuorma-auton'},
    p_T1:           {en:'Park the car on top of the tower.',de:'Parke das Auto oben auf dem Turm.',fr:'Gare la voiture en haut de la tour.',es:'Estaciona el carro encima de la torre.',pt:'Estacione o carro em cima da torre.',it:'Parcheggia la macchina in cima alla torre.',nl:'Parkeer de auto boven op de toren.',sv:'Parkera bilen uppe på tornet.',da:'Parkér bilen oven på tårnet.',no:'Parker bilen oppå tårnet.',fi:'Pysäköi auto tornin päälle.'},
    ok_T1:          {en:'Yes — the car is on top of the tower!',de:'Ja – das Auto steht oben auf dem Turm!',fr:'Oui, la voiture est en haut de la tour !',es:'¡Sí! El carro está encima de la torre.',pt:'Isso! O carro está em cima da torre!',it:'Sì! La macchina è in cima alla torre!',nl:'Ja! De auto staat boven op de toren!',sv:'Ja – bilen står uppe på tornet!',da:'Ja – bilen holder oven på tårnet!',no:'Ja – bilen står oppå tårnet!',fi:'Kyllä – auto on tornin päällä!'},
    u_T1:           {en:'car|',de:'Auto|',fr:'voiture|',es:'carro|',pt:'carro|',it:'macchina|',nl:'auto|',sv:'bilen|',da:'bilen|',no:'bilen|',fi:'auto|'},
    p_T2:           {en:'Park the van inside the tower.',de:'Parke den Lieferwagen im Turm.',fr:'Gare la camionnette dans la tour.',es:'Estaciona la camioneta dentro de la torre.',pt:'Estacione a van dentro da torre.',it:'Parcheggia il furgone dentro la torre.',nl:'Parkeer het busje in de toren.',sv:'Parkera skåpbilen inne i tornet.',da:'Parkér varevognen inde i tårnet.',no:'Parker varebilen inne i tårnet.',fi:'Pysäköi pakettiauto torniin.'},
    ok_T2:          {en:'Yes — the van is inside the tower!',de:'Ja – der Lieferwagen steht im Turm!',fr:'Oui, la camionnette est dans la tour !',es:'¡Sí! La camioneta está dentro de la torre.',pt:'Isso! A van está dentro da torre!',it:'Sì! Il furgone è dentro la torre!',nl:'Ja! Het busje staat in de toren!',sv:'Ja – skåpbilen står inne i tornet!',da:'Ja – varevognen holder inde i tårnet!',no:'Ja – varebilen står inne i tårnet!',fi:'Kyllä – pakettiauto on tornissa!'},
    u_T2:           {en:'van|',de:'Lieferwagen|',fr:'camionnette|',es:'camioneta|',pt:'van|',it:'furgone|',nl:'busje|',sv:'skåpbilen|',da:'varevognen|',no:'varebilen|',fi:'pakettiauto|'},
    p_T3:           {en:'Park the truck under the tower.',de:'Parke den Lastwagen unter dem Turm.',fr:'Gare le camion sous la tour.',es:'Estaciona el tráiler debajo de la torre.',pt:'Estacione o caminhão embaixo da torre.',it:'Parcheggia il camion sotto la torre.',nl:'Parkeer de vrachtwagen onder de toren.',sv:'Parkera lastbilen under tornet.',da:'Parkér lastbilen under tårnet.',no:'Parker lastebilen under tårnet.',fi:'Pysäköi kuorma-auto tornin alle.'},
    ok_T3:          {en:'Yes — the truck is under the tower!',de:'Ja – der Lastwagen steht unter dem Turm!',fr:'Oui, le camion est sous la tour !',es:'¡Sí! El tráiler está debajo de la torre.',pt:'Isso! O caminhão está embaixo da torre!',it:'Sì! Il camion è sotto la torre!',nl:'Ja! De vrachtwagen staat onder de toren!',sv:'Ja – lastbilen står under tornet!',da:'Ja – lastbilen holder under tårnet!',no:'Ja – lastebilen står under tårnet!',fi:'Kyllä – kuorma-auto on tornin alla!'},
    u_T3:           {en:'truck|',de:'Lastwagen|',fr:'camion|',es:'tráiler|',pt:'caminhão|',it:'camion|',nl:'vrachtwagen|',sv:'lastbilen|',da:'lastbilen|',no:'lastebilen|',fi:'kuorma-auto|'},
    p_T4:           {en:'Park the bulldozer beside the tower.',de:'Parke den Bulldozer neben dem Turm.',fr:'Gare le bulldozer à côté de la tour.',es:'Estaciona el bulldozer junto a la torre.',pt:'Estacione o buldôzer ao lado da torre.',it:'Parcheggia il bulldozer accanto alla torre.',nl:'Parkeer de bulldozer naast de toren.',sv:'Parkera bulldozern bredvid tornet.',da:'Parkér bulldozeren ved siden af tårnet.',no:'Parker bulldoseren ved siden av tårnet.',fi:'Pysäköi puskutraktori tornin viereen.'},
    ok_T4:          {en:'Yes — the bulldozer is beside the tower!',de:'Ja – der Bulldozer steht neben dem Turm!',fr:'Oui, le bulldozer est à côté de la tour !',es:'¡Sí! El bulldozer está junto a la torre.',pt:'Isso! O buldôzer está ao lado da torre!',it:'Sì! Il bulldozer è accanto alla torre!',nl:'Ja! De bulldozer staat naast de toren!',sv:'Ja – bulldozern står bredvid tornet!',da:'Ja – bulldozeren holder ved siden af tårnet!',no:'Ja – bulldoseren står ved siden av tårnet!',fi:'Kyllä – puskutraktori on tornin vieressä!'},
    u_T4:           {en:'bulldozer|',de:'Bulldozer|',fr:'bulldozer|',es:'bulldozer|',pt:'buldôzer|',it:'bulldozer|',nl:'bulldozer|',sv:'bulldozern|',da:'bulldozeren|',no:'bulldoseren|',fi:'puskutraktori|'},
    p_T5:           {en:'Park the jeep outside the tower.',de:'Parke den Jeep draußen vor dem Turm.',fr:'Gare la jeep en dehors de la tour.',es:'Estaciona el jeep fuera de la torre.',pt:'Estacione o jipe fora da torre.',it:'Parcheggia la jeep fuori dalla torre.',nl:'Parkeer de jeep buiten de toren.',sv:'Parkera jeepen utanför tornet.',da:'Parkér jeepen uden for tårnet.',no:'Parker jeepen utenfor tårnet.',fi:'Pysäköi maasturi tornin ulkopuolelle.'},
    ok_T5:          {en:'Yes — the jeep is outside the tower!',de:'Ja – der Jeep steht draußen vor dem Turm!',fr:'Oui, la jeep est en dehors de la tour !',es:'¡Sí! El jeep está fuera de la torre.',pt:'Isso! O jipe está fora da torre!',it:'Sì! La jeep è fuori dalla torre!',nl:'Ja! De jeep staat buiten de toren!',sv:'Ja – jeepen står utanför tornet!',da:'Ja – jeepen holder uden for tårnet!',no:'Ja – jeepen står utenfor tårnet!',fi:'Kyllä – maasturi on tornin ulkopuolella!'},
    u_T5:           {en:'jeep|',de:'Jeep|',fr:'jeep|',es:'jeep|',pt:'jipe|',it:'jeep|',nl:'jeep|',sv:'jeepen|',da:'jeepen|',no:'jeepen|',fi:'maasturi|'},
    p_T6:           {en:'Park the bus on the top level.',de:'Parke den Bus auf der obersten Etage.',fr:'Gare le bus au dernier étage.',es:'Estaciona el camión en el piso de arriba.',pt:'Estacione o ônibus no andar de cima.',it:'Parcheggia l’autobus al piano più alto.',nl:'Parkeer de bus op de bovenste verdieping.',sv:'Parkera bussen på översta våningen.',da:'Parkér bussen på øverste etage.',no:'Parker bussen i øverste etasje.',fi:'Pysäköi bussi ylimpään kerrokseen.'},
    ok_T6:          {en:'Yes — the bus is on the top level!',de:'Ja – der Bus steht auf der obersten Etage!',fr:'Oui, le bus est au dernier étage !',es:'¡Sí! El camión está en el piso de arriba.',pt:'Isso! O ônibus está no andar de cima!',it:'Sì! L’autobus è al piano più alto!',nl:'Ja! De bus staat op de bovenste verdieping!',sv:'Ja – bussen står på översta våningen!',da:'Ja – bussen holder på øverste etage!',no:'Ja – bussen står i øverste etasje!',fi:'Kyllä – bussi on ylimmässä kerroksessa!'},
    u_T6:           {en:'bus|',de:'Bus|',fr:'bus|',es:'camión|',pt:'ônibus|',it:'autobus|',nl:'bus|',sv:'bussen|',da:'bussen|',no:'bussen|',fi:'bussi|'},
    p_T7:           {en:'Park the ambulance on the middle level.',de:'Parke den Krankenwagen auf der mittleren Etage.',fr:'Gare l’ambulance à l’étage du milieu.',es:'Estaciona la ambulancia en el piso de en medio.',pt:'Estacione a ambulância no andar do meio.',it:'Parcheggia l’ambulanza al piano di mezzo.',nl:'Parkeer de ambulance op de middelste verdieping.',sv:'Parkera ambulansen på mittersta våningen.',da:'Parkér ambulancen på midterste etage.',no:'Parker ambulansen i midterste etasje.',fi:'Pysäköi ambulanssi keskimmäiseen kerrokseen.'},
    ok_T7:          {en:'Yes — the ambulance is on the middle level!',de:'Ja – der Krankenwagen steht auf der mittleren Etage!',fr:'Oui, l’ambulance est à l’étage du milieu !',es:'¡Sí! La ambulancia está en el piso de en medio.',pt:'Isso! A ambulância está no andar do meio!',it:'Sì! L’ambulanza è al piano di mezzo!',nl:'Ja! De ambulance staat op de middelste verdieping!',sv:'Ja – ambulansen står på mittersta våningen!',da:'Ja – ambulancen holder på midterste etage!',no:'Ja – ambulansen står i midterste etasje!',fi:'Kyllä – ambulanssi on keskimmäisessä kerroksessa!'},
    u_T7:           {en:'ambulance|',de:'Krankenwagen|',fr:'ambulance|',es:'ambulancia|',pt:'ambulância|',it:'ambulanza|',nl:'ambulance|',sv:'ambulansen|',da:'ambulancen|',no:'ambulansen|',fi:'ambulanssi|'},
    p_T8:           {en:'Park the tractor on the bottom level.',de:'Parke den Traktor auf der untersten Etage.',fr:'Gare le tracteur à l’étage du bas.',es:'Estaciona el tractor en el piso de abajo.',pt:'Estacione o trator no andar de baixo.',it:'Parcheggia il trattore al piano più basso.',nl:'Parkeer de tractor op de onderste verdieping.',sv:'Parkera traktorn på nedersta våningen.',da:'Parkér traktoren på nederste etage.',no:'Parker traktoren i nederste etasje.',fi:'Pysäköi traktori alimpaan kerrokseen.'},
    ok_T8:          {en:'Yes — the tractor is on the bottom level!',de:'Ja – der Traktor steht auf der untersten Etage!',fr:'Oui, le tracteur est à l’étage du bas !',es:'¡Sí! El tractor está en el piso de abajo.',pt:'Isso! O trator está no andar de baixo!',it:'Sì! Il trattore è al piano più basso!',nl:'Ja! De tractor staat op de onderste verdieping!',sv:'Ja – traktorn står på nedersta våningen!',da:'Ja – traktoren holder på nederste etage!',no:'Ja – traktoren står i nederste etasje!',fi:'Kyllä – traktori on alimmassa kerroksessa!'},
    u_T8:           {en:'tractor|',de:'Traktor|',fr:'tracteur|',es:'tractor|',pt:'trator|',it:'trattore|',nl:'tractor|',sv:'traktorn|',da:'traktoren|',no:'traktoren|',fi:'traktori|'},
    p_T9:           {en:'Park the car on the left side of the tower.',de:'Parke das Auto links neben dem Turm.',fr:'Gare la voiture à gauche de la tour.',es:'Estaciona el carro a la izquierda de la torre.',pt:'Estacione o carro à esquerda da torre.',it:'Parcheggia la macchina a sinistra della torre.',nl:'Parkeer de auto links van de toren.',sv:'Parkera bilen till vänster om tornet.',da:'Parkér bilen til venstre for tårnet.',no:'Parker bilen til venstre for tårnet.',fi:'Pysäköi auto tornin vasemmalle puolelle.'},
    ok_T9:          {en:'Yes — the car is on the left side of the tower!',de:'Ja – das Auto steht links neben dem Turm!',fr:'Oui, la voiture est à gauche de la tour !',es:'¡Sí! El carro está a la izquierda de la torre.',pt:'Isso! O carro está à esquerda da torre!',it:'Sì! La macchina è a sinistra della torre!',nl:'Ja! De auto staat links van de toren!',sv:'Ja – bilen står till vänster om tornet!',da:'Ja – bilen holder til venstre for tårnet!',no:'Ja – bilen står til venstre for tårnet!',fi:'Kyllä – auto on tornin vasemmalla puolella!'},
    u_T9:           {en:'car|',de:'Auto|',fr:'voiture|',es:'carro|',pt:'carro|',it:'macchina|',nl:'auto|',sv:'bilen|',da:'bilen|',no:'bilen|',fi:'auto|'},
    p_P6:           {en:'Park the car one square north of the bus.',de:'Parke das Auto ein Feld nördlich vom Bus.',fr:'Gare la voiture une case au nord du bus.',es:'Estaciona el carro una casilla al norte del camión.',pt:'Estacione o carro uma casa ao norte do ônibus.',it:'Parcheggia la macchina una casella a nord dell’autobus.',nl:'Parkeer de auto één vakje ten noorden van de bus.',sv:'Parkera bilen en ruta norr om bussen.',da:'Parkér bilen ét felt nord for bussen.',no:'Parker bilen én rute nord for bussen.',fi:'Pysäköi auto yhden ruudun päähän bussista pohjoiseen.'},
    ok_P6:          {en:'Yes — one square north!',de:'Ja – ein Feld nach Norden!',fr:'Oui, une case au nord !',es:'¡Sí! Una casilla al norte.',pt:'Isso! Uma casa ao norte!',it:'Sì! Una casella a nord!',nl:'Ja! Eén vakje naar het noorden!',sv:'Ja – en ruta norrut!',da:'Ja – ét felt mod nord!',no:'Ja – én rute mot nord!',fi:'Kyllä – yksi ruutu pohjoiseen!'},
    u_P6:           {en:'car|bus',de:'Auto|Bus',fr:'voiture|bus',es:'carro|camión',pt:'carro|ônibus',it:'macchina|autobus',nl:'auto|bus',sv:'bilen|bussen',da:'bilen|bussen',no:'bilen|bussen',fi:'auto|bussista'},
    p_P7:           {en:'Park the truck one square east of the van.',de:'Parke den Lastwagen ein Feld östlich vom Lieferwagen.',fr:'Gare le camion une case à l’est de la camionnette.',es:'Estaciona el tráiler una casilla al este de la camioneta.',pt:'Estacione o caminhão uma casa a leste da van.',it:'Parcheggia il camion una casella a est del furgone.',nl:'Parkeer de vrachtwagen één vakje ten oosten van het busje.',sv:'Parkera lastbilen en ruta öster om skåpbilen.',da:'Parkér lastbilen ét felt øst for varevognen.',no:'Parker lastebilen én rute øst for varebilen.',fi:'Pysäköi kuorma-auto yhden ruudun päähän pakettiautosta itään.'},
    ok_P7:          {en:'Yes — one square east!',de:'Ja – ein Feld nach Osten!',fr:'Oui, une case à l’est !',es:'¡Sí! Una casilla al este.',pt:'Isso! Uma casa a leste!',it:'Sì! Una casella a est!',nl:'Ja! Eén vakje naar het oosten!',sv:'Ja – en ruta österut!',da:'Ja – ét felt mod øst!',no:'Ja – én rute mot øst!',fi:'Kyllä – yksi ruutu itään!'},
    u_P7:           {en:'truck|van',de:'Lastwagen|Lieferwagen',fr:'camion|camionnette',es:'tráiler|camioneta',pt:'caminhão|van',it:'camion|furgone',nl:'vrachtwagen|busje',sv:'lastbilen|skåpbilen',da:'lastbilen|varevognen',no:'lastebilen|varebilen',fi:'kuorma-auto|pakettiautosta'},
    p_P8:           {en:'Park the bulldozer one square south of the car.',de:'Parke den Bulldozer ein Feld südlich vom Auto.',fr:'Gare le bulldozer une case au sud de la voiture.',es:'Estaciona el bulldozer una casilla al sur del carro.',pt:'Estacione o buldôzer uma casa ao sul do carro.',it:'Parcheggia il bulldozer una casella a sud della macchina.',nl:'Parkeer de bulldozer één vakje ten zuiden van de auto.',sv:'Parkera bulldozern en ruta söder om bilen.',da:'Parkér bulldozeren ét felt syd for bilen.',no:'Parker bulldoseren én rute sør for bilen.',fi:'Pysäköi puskutraktori yhden ruudun päähän autosta etelään.'},
    ok_P8:          {en:'Yes — one square south!',de:'Ja – ein Feld nach Süden!',fr:'Oui, une case au sud !',es:'¡Sí! Una casilla al sur.',pt:'Isso! Uma casa ao sul!',it:'Sì! Una casella a sud!',nl:'Ja! Eén vakje naar het zuiden!',sv:'Ja – en ruta söderut!',da:'Ja – ét felt mod syd!',no:'Ja – én rute mot sør!',fi:'Kyllä – yksi ruutu etelään!'},
    u_P8:           {en:'bulldozer|car',de:'Bulldozer|Auto',fr:'bulldozer|voiture',es:'bulldozer|carro',pt:'buldôzer|carro',it:'bulldozer|macchina',nl:'bulldozer|auto',sv:'bulldozern|bilen',da:'bulldozeren|bilen',no:'bulldoseren|bilen',fi:'puskutraktori|autosta'},
    p_P9:           {en:'Park the jeep one square west of the truck.',de:'Parke den Jeep ein Feld westlich vom Lastwagen.',fr:'Gare la jeep une case à l’ouest du camion.',es:'Estaciona el jeep una casilla al oeste del tráiler.',pt:'Estacione o jipe uma casa a oeste do caminhão.',it:'Parcheggia la jeep una casella a ovest del camion.',nl:'Parkeer de jeep één vakje ten westen van de vrachtwagen.',sv:'Parkera jeepen en ruta väster om lastbilen.',da:'Parkér jeepen ét felt vest for lastbilen.',no:'Parker jeepen én rute vest for lastebilen.',fi:'Pysäköi maasturi yhden ruudun päähän kuorma-autosta länteen.'},
    ok_P9:          {en:'Yes — one square west!',de:'Ja – ein Feld nach Westen!',fr:'Oui, une case à l’ouest !',es:'¡Sí! Una casilla al oeste.',pt:'Isso! Uma casa a oeste!',it:'Sì! Una casella a ovest!',nl:'Ja! Eén vakje naar het westen!',sv:'Ja – en ruta västerut!',da:'Ja – ét felt mod vest!',no:'Ja – én rute mot vest!',fi:'Kyllä – yksi ruutu länteen!'},
    u_P9:           {en:'jeep|truck',de:'Jeep|Lastwagen',fr:'jeep|camion',es:'jeep|tráiler',pt:'jipe|caminhão',it:'jeep|camion',nl:'jeep|vrachtwagen',sv:'jeepen|lastbilen',da:'jeepen|lastbilen',no:'jeepen|lastebilen',fi:'maasturi|kuorma-autosta'},
    pCode_bus:      {en:'Park the bus in {code}.',de:'Parke den Bus auf Feld {code}.',fr:'Gare le bus sur la case {code}.',es:'Estaciona el camión en la casilla {code}.',pt:'Estacione o ônibus na casa {code}.',it:'Parcheggia l’autobus nella casella {code}.',nl:'Parkeer de bus op vakje {code}.',sv:'Parkera bussen på ruta {code}.',da:'Parkér bussen på felt {code}.',no:'Parker bussen på rute {code}.',fi:'Pysäköi bussi ruutuun {code}.'},
    pRead_bus:      {en:'Where is the bus? Set the code.',de:'Wo steht der Bus? Stell das Feld ein.',fr:'Où est le bus ? Règle le code.',es:'¿Dónde está el camión? Marca la casilla.',pt:'Onde está o ônibus? Marque o código.',it:'Dov’è l’autobus? Imposta il codice.',nl:'Waar staat de bus? Stel de code in.',sv:'Var står bussen? Ställ in rutan.',da:'Hvor holder bussen? Indstil feltet.',no:'Hvor står bussen? Still inn ruten.',fi:'Missä bussi on? Aseta ruudun koodi.'},
    uv_bus:         {en:'bus',de:'Bus',fr:'bus',es:'camión',pt:'ônibus',it:'autobus',nl:'bus',sv:'bussen',da:'bussen',no:'bussen',fi:'bussi'},
    pCode_van:      {en:'Park the van in {code}.',de:'Parke den Lieferwagen auf Feld {code}.',fr:'Gare la camionnette sur la case {code}.',es:'Estaciona la camioneta en la casilla {code}.',pt:'Estacione a van na casa {code}.',it:'Parcheggia il furgone nella casella {code}.',nl:'Parkeer het busje op vakje {code}.',sv:'Parkera skåpbilen på ruta {code}.',da:'Parkér varevognen på felt {code}.',no:'Parker varebilen på rute {code}.',fi:'Pysäköi pakettiauto ruutuun {code}.'},
    pRead_van:      {en:'Where is the van? Set the code.',de:'Wo steht der Lieferwagen? Stell das Feld ein.',fr:'Où est la camionnette ? Règle le code.',es:'¿Dónde está la camioneta? Marca la casilla.',pt:'Onde está a van? Marque o código.',it:'Dov’è il furgone? Imposta il codice.',nl:'Waar staat het busje? Stel de code in.',sv:'Var står skåpbilen? Ställ in rutan.',da:'Hvor holder varevognen? Indstil feltet.',no:'Hvor står varebilen? Still inn ruten.',fi:'Missä pakettiauto on? Aseta ruudun koodi.'},
    uv_van:         {en:'van',de:'Lieferwagen',fr:'camionnette',es:'camioneta',pt:'van',it:'furgone',nl:'busje',sv:'skåpbilen',da:'varevognen',no:'varebilen',fi:'pakettiauto'},
    pCode_car:      {en:'Park the car in {code}.',de:'Parke das Auto auf Feld {code}.',fr:'Gare la voiture sur la case {code}.',es:'Estaciona el carro en la casilla {code}.',pt:'Estacione o carro na casa {code}.',it:'Parcheggia la macchina nella casella {code}.',nl:'Parkeer de auto op vakje {code}.',sv:'Parkera bilen på ruta {code}.',da:'Parkér bilen på felt {code}.',no:'Parker bilen på rute {code}.',fi:'Pysäköi auto ruutuun {code}.'},
    pRead_car:      {en:'Where is the car? Set the code.',de:'Wo steht das Auto? Stell das Feld ein.',fr:'Où est la voiture ? Règle le code.',es:'¿Dónde está el carro? Marca la casilla.',pt:'Onde está o carro? Marque o código.',it:'Dov’è la macchina? Imposta il codice.',nl:'Waar staat de auto? Stel de code in.',sv:'Var står bilen? Ställ in rutan.',da:'Hvor holder bilen? Indstil feltet.',no:'Hvor står bilen? Still inn ruten.',fi:'Missä auto on? Aseta ruudun koodi.'},
    uv_car:         {en:'car',de:'Auto',fr:'voiture',es:'carro',pt:'carro',it:'macchina',nl:'auto',sv:'bilen',da:'bilen',no:'bilen',fi:'auto'},
    pCode_truck:    {en:'Park the truck in {code}.',de:'Parke den Lastwagen auf Feld {code}.',fr:'Gare le camion sur la case {code}.',es:'Estaciona el tráiler en la casilla {code}.',pt:'Estacione o caminhão na casa {code}.',it:'Parcheggia il camion nella casella {code}.',nl:'Parkeer de vrachtwagen op vakje {code}.',sv:'Parkera lastbilen på ruta {code}.',da:'Parkér lastbilen på felt {code}.',no:'Parker lastebilen på rute {code}.',fi:'Pysäköi kuorma-auto ruutuun {code}.'},
    pRead_truck:    {en:'Where is the truck? Set the code.',de:'Wo steht der Lastwagen? Stell das Feld ein.',fr:'Où est le camion ? Règle le code.',es:'¿Dónde está el tráiler? Marca la casilla.',pt:'Onde está o caminhão? Marque o código.',it:'Dov’è il camion? Imposta il codice.',nl:'Waar staat de vrachtwagen? Stel de code in.',sv:'Var står lastbilen? Ställ in rutan.',da:'Hvor holder lastbilen? Indstil feltet.',no:'Hvor står lastebilen? Still inn ruten.',fi:'Missä kuorma-auto on? Aseta ruudun koodi.'},
    uv_truck:       {en:'truck',de:'Lastwagen',fr:'camion',es:'tráiler',pt:'caminhão',it:'camion',nl:'vrachtwagen',sv:'lastbilen',da:'lastbilen',no:'lastebilen',fi:'kuorma-auto'},
    pCode_bulldozer:{en:'Park the bulldozer in {code}.',de:'Parke den Bulldozer auf Feld {code}.',fr:'Gare le bulldozer sur la case {code}.',es:'Estaciona el bulldozer en la casilla {code}.',pt:'Estacione o buldôzer na casa {code}.',it:'Parcheggia il bulldozer nella casella {code}.',nl:'Parkeer de bulldozer op vakje {code}.',sv:'Parkera bulldozern på ruta {code}.',da:'Parkér bulldozeren på felt {code}.',no:'Parker bulldoseren på rute {code}.',fi:'Pysäköi puskutraktori ruutuun {code}.'},
    pRead_bulldozer:{en:'Where is the bulldozer? Set the code.',de:'Wo steht der Bulldozer? Stell das Feld ein.',fr:'Où est le bulldozer ? Règle le code.',es:'¿Dónde está el bulldozer? Marca la casilla.',pt:'Onde está o buldôzer? Marque o código.',it:'Dov’è il bulldozer? Imposta il codice.',nl:'Waar staat de bulldozer? Stel de code in.',sv:'Var står bulldozern? Ställ in rutan.',da:'Hvor holder bulldozeren? Indstil feltet.',no:'Hvor står bulldoseren? Still inn ruten.',fi:'Missä puskutraktori on? Aseta ruudun koodi.'},
    uv_bulldozer:   {en:'bulldozer',de:'Bulldozer',fr:'bulldozer',es:'bulldozer',pt:'buldôzer',it:'bulldozer',nl:'bulldozer',sv:'bulldozern',da:'bulldozeren',no:'bulldoseren',fi:'puskutraktori'},
    pCode_ambulance:{en:'Park the ambulance in {code}.',de:'Parke den Krankenwagen auf Feld {code}.',fr:'Gare l’ambulance sur la case {code}.',es:'Estaciona la ambulancia en la casilla {code}.',pt:'Estacione a ambulância na casa {code}.',it:'Parcheggia l’ambulanza nella casella {code}.',nl:'Parkeer de ambulance op vakje {code}.',sv:'Parkera ambulansen på ruta {code}.',da:'Parkér ambulancen på felt {code}.',no:'Parker ambulansen på rute {code}.',fi:'Pysäköi ambulanssi ruutuun {code}.'},
    pRead_ambulance:{en:'Where is the ambulance? Set the code.',de:'Wo steht der Krankenwagen? Stell das Feld ein.',fr:'Où est l’ambulance ? Règle le code.',es:'¿Dónde está la ambulancia? Marca la casilla.',pt:'Onde está a ambulância? Marque o código.',it:'Dov’è l’ambulanza? Imposta il codice.',nl:'Waar staat de ambulance? Stel de code in.',sv:'Var står ambulansen? Ställ in rutan.',da:'Hvor holder ambulancen? Indstil feltet.',no:'Hvor står ambulansen? Still inn ruten.',fi:'Missä ambulanssi on? Aseta ruudun koodi.'},
    uv_ambulance:   {en:'ambulance',de:'Krankenwagen',fr:'ambulance',es:'ambulancia',pt:'ambulância',it:'ambulanza',nl:'ambulance',sv:'ambulansen',da:'ambulancen',no:'ambulansen',fi:'ambulanssi'},
    pCode_tractor:  {en:'Park the tractor in {code}.',de:'Parke den Traktor auf Feld {code}.',fr:'Gare le tracteur sur la case {code}.',es:'Estaciona el tractor en la casilla {code}.',pt:'Estacione o trator na casa {code}.',it:'Parcheggia il trattore nella casella {code}.',nl:'Parkeer de tractor op vakje {code}.',sv:'Parkera traktorn på ruta {code}.',da:'Parkér traktoren på felt {code}.',no:'Parker traktoren på rute {code}.',fi:'Pysäköi traktori ruutuun {code}.'},
    pRead_tractor:  {en:'Where is the tractor? Set the code.',de:'Wo steht der Traktor? Stell das Feld ein.',fr:'Où est le tracteur ? Règle le code.',es:'¿Dónde está el tractor? Marca la casilla.',pt:'Onde está o trator? Marque o código.',it:'Dov’è il trattore? Imposta il codice.',nl:'Waar staat de tractor? Stel de code in.',sv:'Var står traktorn? Ställ in rutan.',da:'Hvor holder traktoren? Indstil feltet.',no:'Hvor står traktoren? Still inn ruten.',fi:'Missä traktori on? Aseta ruudun koodi.'},
    uv_tractor:     {en:'tractor',de:'Traktor',fr:'tracteur',es:'tractor',pt:'trator',it:'trattore',nl:'tractor',sv:'traktorn',da:'traktoren',no:'traktoren',fi:'traktori'},
    pCode_jeep:     {en:'Park the jeep in {code}.',de:'Parke den Jeep auf Feld {code}.',fr:'Gare la jeep sur la case {code}.',es:'Estaciona el jeep en la casilla {code}.',pt:'Estacione o jipe na casa {code}.',it:'Parcheggia la jeep nella casella {code}.',nl:'Parkeer de jeep op vakje {code}.',sv:'Parkera jeepen på ruta {code}.',da:'Parkér jeepen på felt {code}.',no:'Parker jeepen på rute {code}.',fi:'Pysäköi maasturi ruutuun {code}.'},
    pRead_jeep:     {en:'Where is the jeep? Set the code.',de:'Wo steht der Jeep? Stell das Feld ein.',fr:'Où est la jeep ? Règle le code.',es:'¿Dónde está el jeep? Marca la casilla.',pt:'Onde está o jipe? Marque o código.',it:'Dov’è la jeep? Imposta il codice.',nl:'Waar staat de jeep? Stel de code in.',sv:'Var står jeepen? Ställ in rutan.',da:'Hvor holder jeepen? Indstil feltet.',no:'Hvor står jeepen? Still inn ruten.',fi:'Missä maasturi on? Aseta ruudun koodi.'},
    uv_jeep:        {en:'jeep',de:'Jeep',fr:'jeep',es:'jeep',pt:'jipe',it:'jeep',nl:'jeep',sv:'jeepen',da:'jeepen',no:'jeepen',fi:'maasturi'},
    okCode:         {en:'Yes — {code}!',de:'Ja – Feld {code}!',fr:'Oui, {code} !',es:'¡Sí! {code}.',pt:'Isso! {code}!',it:'Sì! {code}!',nl:'Ja! {code}!',sv:'Ja – {code}!',da:'Ja – {code}!',no:'Ja – {code}!',fi:'Kyllä – {code}!'}
    /*STRINGS-END*/
  },
  defaults: { words: 'near' },
  settings: [
    { key: 'words', type: 'choice', labelKey: 'setWords', options: [{ value: 'near', labelKey: 'wNear' }, { value: 'tower', labelKey: 'wTower' }, { value: 'plan6', labelKey: 'wPlan6' }, { value: 'plan10', labelKey: 'wPlan10' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._route = null; this._anim = null;
    injectParkingTowerCSS();
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
  },
  onSettings: function () {
    if (this._poolKey !== this._mode()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (n) { return '/image-library-webp/themes/' + encodeURIComponent(ParkingTowerCore.dirOf(n)) + '/' + n + '@2x.webp'; },

  /* ---------------- rounds ---------------- */
  _mode: function () { return ParkingTowerCore.mode(this.api && this.api.settings ? this.api.settings.words : 'near'); },
  _ensurePool: function () { var m = this._mode(); if (!this._pool || this._poolKey !== m) { this._pool = ParkingTowerCore.rounds(m); this._poolKey = m; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = ParkingTowerCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]], narrow = this._narrow(r), read = C.isRead(r, narrow);
    var code = r.mode.indexOf('plan') === 0 ? C.planAnswer(r) : '';
    return {
      id: 'parking-tower.' + r.id,
      promptKey: C.prompt(r, read),
      promptArgs: { code: code },
      celebrateKey: C.success(r),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._route = null; tool._anim = null;
        /* the read/park decision nextTask made: at setup time the shell has the
           stage detached, so a fresh measure would fall back and decide wrong */
        tool.st = C.newState(r, narrow);
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  /* a 10 × 10 plan is read on the dials when the card cannot hold 44 px squares */
  _narrow: function (r) { return r.mode === 'plan10' && !ParkingTowerCore.layout('plan10', this._width()).tap; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = ParkingTowerCore.rounds('near')[0]; this.st = ParkingTowerCore.newState(r0, false); }
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
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w;
      /* crossing the 10 × 10 tap threshold turns park rounds into read rounds */
      var st = self.st, C = ParkingTowerCore;
      if (st && st.r.mode === 'plan10' && !st.done) { var rd = C.isRead(st.r, self._narrow(st.r)); if (rd !== st.read) { self.st = C.newState(st.r, self._narrow(st.r)); } }
      self._render2();
    });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st, C = ParkingTowerCore;
    api.stage.innerHTML = '';
    this._clearAnim();
    var plan = st.r.mode.indexOf('plan') === 0;
    var L = this._L = C.layout(plan ? st.r.mode : st.r.mode, this._width());
    var wrap = api.el('div', 'pt-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.n === 10 ? ' is-n10' : '') + (L.tight ? ' is-tight' : '')); this._wrap = wrap;
    var stage = api.el('div', 'pt-stage'); this._stage = stage; wrap.appendChild(stage);
    /* on a 320 px phone the hint shares the Check row (the fold) */
    var note = api.el('div', 'pt-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'pt-ask'); this._ask = ask;
    if (L.tight) ask.appendChild(note); else wrap.appendChild(note);
    var chk = api.el('button', 'pt-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    api.stage.appendChild(wrap);
    if (plan) this._buildPlan(); else this._buildSide();
    this._paint();
  },

  /* ================= the side view ================= */
  _geo: function () {
    var C = ParkingTowerCore, st = this.st, r = st.r, L = this._L, tower = r.mode === 'tower';
    var roofSpace = C.hasRoofSpot(r) ? L.bayH + 6 : L.roofH, base = C.hasBase(r);
    var towerW = L.cols * L.bayW + (L.cols + 1) * L.wall;
    var total = (tower ? 2 * L.street : 0) + L.lift + towerW;
    var x0 = Math.max(0, Math.floor((L.W - total) / 2));
    var g = { x0: x0, liftX: x0 + (tower ? L.street : 0), towerX: x0 + (tower ? L.street : 0) + L.lift, towerW: towerW, top: 4, roofSpace: roofSpace };
    /* the street (the entrance level) runs under the parking floors; the
       basement, when there is one, lies under the street */
    g.groundY = g.top + roofSpace + 3 * (L.bayH + L.slab);
    g.driveY = g.groundY;
    g.baseY = g.driveY + L.drive + L.slab;
    g.H = base ? g.baseY + L.bayH + 6 : g.driveY + L.drive + 4;
    g.SLx = x0; g.SRx = g.towerX + towerW;
    return g;
  },
  /* a spot's box (stage px) */
  _box: function (s) {
    var L = this._L, g = this._g;
    if (s === 'ROOF') return { x: g.towerX + L.wall, y: g.top + 2, w: g.towerW - 2 * L.wall, h: L.bayH };
    if (s === 'BASE') return { x: g.towerX + L.wall, y: g.baseY, w: g.towerW - 2 * L.wall, h: L.bayH };
    if (s === 'SL') return { x: g.SLx + 4, y: g.driveY + 4, w: L.street - 8, h: L.drive - 8 };
    if (s === 'SR') return { x: g.SRx + 4, y: g.driveY + 4, w: L.street - 8, h: L.drive - 8 };
    return { x: g.towerX + L.wall + (s.c - 1) * (L.bayW + L.wall), y: g.top + g.roofSpace + (3 - s.l) * (L.bayH + L.slab), w: L.bayW, h: L.bayH };
  },
  _levelY: function (s) { var b = this._box(s); return b.y + b.h; },
  _buildSide: function () {
    var api = this.api, self = this, st = this.st, C = ParkingTowerCore, L = this._L, r = st.r, stage = this._stage;
    var g = this._g = this._geo();
    stage.style.height = g.H + 'px';
    /* the structure: a single SVG under everything */
    var s = '<svg class="pt-struct" viewBox="0 0 ' + L.W + ' ' + g.H + '" width="' + L.W + '" height="' + g.H + '" aria-hidden="true">';
    var tx = g.towerX, tw = g.towerW, gy = g.groundY;
    /* sky behind the tower, the walls, the slabs */
    s += '<rect class="pt-hall" x="' + tx + '" y="' + (g.top + g.roofSpace) + '" width="' + tw + '" height="' + (gy - g.top - g.roofSpace) + '"/>';
    if (C.hasRoofSpot(r)) s += '<path class="pt-rail" d="M' + (tx + 4) + ' ' + (g.top + 18) + ' H' + (tx + tw - 4) + ' M' + (tx + 4) + ' ' + (g.top + 18) + ' V' + (g.top + g.roofSpace) + ' M' + (tx + tw - 4) + ' ' + (g.top + 18) + ' V' + (g.top + g.roofSpace) + '"/>';
    else s += '<rect class="pt-parapet" x="' + tx + '" y="' + (g.top + g.roofSpace - 14) + '" width="' + tw + '" height="14" rx="3"/>';
    for (var l = 3; l >= 1; l--) {
      var yb = g.top + g.roofSpace + (3 - l) * (L.bayH + L.slab) + L.bayH;
      s += '<rect class="pt-slab' + (l === 1 ? ' is-ground' : '') + '" data-slab="' + l + '" x="' + (tx - (l === 1 ? 0 : 0)) + '" y="' + yb + '" width="' + tw + '" height="' + L.slab + '"/>';
    }
    s += '<rect class="pt-slab is-top" x="' + tx + '" y="' + (g.top + g.roofSpace - 2) + '" width="' + tw + '" height="' + Math.max(6, L.slab - 4) + '"/>';
    for (var c = 0; c <= L.cols; c++) s += '<rect class="pt-wall" x="' + (tx + c * (L.bayW + L.wall)) + '" y="' + (g.top + g.roofSpace) + '" width="' + L.wall + '" height="' + (gy - g.top - g.roofSpace) + '"/>';
    /* the street (entrance level), the soil and the basement under it */
    var sx0 = r.mode === 'tower' ? g.SLx : g.liftX, sx1 = r.mode === 'tower' ? g.SRx + L.street : tx + tw;
    s += '<rect class="pt-drive" x="' + sx0 + '" y="' + g.driveY + '" width="' + (sx1 - sx0) + '" height="' + L.drive + '" rx="8"/><path class="pt-lane" d="M' + (sx0 + 8) + ' ' + (g.driveY + L.drive - 8) + ' H' + (sx1 - 8) + '"/>';
    if (C.hasBase(r)) { s += '<rect class="pt-ground" x="' + sx0 + '" y="' + (g.driveY + L.drive) + '" width="' + (sx1 - sx0) + '" height="' + (g.H - g.driveY - L.drive) + '" rx="6"/>'; s += '<rect class="pt-basement" x="' + tx + '" y="' + g.baseY + '" width="' + tw + '" height="' + L.bayH + '" rx="6"/>'; }
    /* the lift shaft (glass) from the street (or the basement) to the top floor (or the roof) */
    var shaftTop = g.top + (C.hasRoofSpot(r) ? 0 : g.roofSpace), shaftBot = C.hasBase(r) ? g.baseY + L.bayH : g.driveY + L.drive;
    s += '<rect class="pt-shaft" x="' + g.liftX + '" y="' + shaftTop + '" width="' + L.lift + '" height="' + (shaftBot - shaftTop) + '" rx="4"/>';
    s += '</svg>';
    stage.insertAdjacentHTML('beforeend', s);
    /* the lift's level lights */
    var lights = api.el('div', 'pt-lights'); lights.setAttribute('aria-hidden', 'true'); this._lights = lights;
    for (var k = 0; k < 3; k++) lights.appendChild(api.el('span', 'pt-light'));
    lights.style.cssText = 'left:' + (g.liftX + L.lift / 2 - 6) + 'px;top:' + (g.top + g.roofSpace + 6) + 'px;';
    stage.appendChild(lights);
    var plat = api.el('div', 'pt-platform'); plat.setAttribute('aria-hidden', 'true'); this._plat = plat; stage.appendChild(plat);
    /* the spots: a button each (free or taken) */
    this._spots = {};
    var parked = C.parkedAt(r);
    C.sideSpots(r).forEach(function (sp) {
      var k = C.key(sp), b = self._box(sp), p = parked[k];
      var el = api.el('button', 'pt-spot' + (typeof sp === 'string' ? ' is-' + sp.toLowerCase() : ''));
      el.type = 'button'; el.setAttribute('data-k', k);
      if (typeof sp !== 'string') { el.setAttribute('data-c', sp.c); el.setAttribute('data-l', sp.l); }
      el.style.cssText = 'left:' + b.x + 'px;top:' + b.y + 'px;width:' + b.w + 'px;height:' + b.h + 'px;';
      if (p) {
        var im = document.createElement('img'); im.className = 'pt-veh' + (p.role === 'filler' ? ' is-filler' : '') + (C.FACES_RIGHT[p.v] ? ' is-flip' : ''); im.alt = ''; im.draggable = false; im.src = self._pic(p.v);
        im.style.height = L.veh + 'px'; el.appendChild(im);
        if (p.role === 'landmark') el.classList.add('is-landmark');
        if (p.role === 'cand') el.classList.add('is-truck');
      } else el.classList.add('is-free');
      el.addEventListener('click', function () { self._tapSpot(sp); });
      el.addEventListener('keydown', function (ev) { self._arrowKey(ev, sp); });
      stage.appendChild(el); self._spots[k] = el;
    });
    /* Bramble's booth (right end of the drive) and the waiting mover */
    var booth = api.el('div', 'pt-booth'); booth.setAttribute('role', 'img'); booth.setAttribute('aria-label', this._t('ariaBooth'));
    var bw = L.mode === 'wide' ? Math.round(L.beaver * 0.86) + 16 : L.beaver + 4, bh = L.beaver + 4;
    booth.style.cssText = 'left:' + (g.towerX + g.towerW - bw - 4) + 'px;top:' + (g.driveY + L.drive - bh - 2) + 'px;width:' + bw + 'px;height:' + bh + 'px;';
    booth.innerHTML = '<span class="pt-boothframe"></span><img class="pt-beaver" alt="" draggable="false" src="' + this._pic('beaver') + '" style="height:' + L.beaver + 'px"><span class="pt-barrier"></span><span class="pt-ticket"></span>';
    this._booth = booth; stage.appendChild(booth);
    this._boothW = bw;
    var mv = document.createElement('img'); mv.className = 'pt-mover' + (C.FACES_RIGHT[r.mover] ? ' is-flip' : ''); mv.alt = ''; mv.draggable = false; mv.src = this._pic(r.mover);
    mv.style.height = L.veh + 'px'; this._mover = mv;
    if (r.kind === 'tap') mv.hidden = true;
    stage.appendChild(mv);
    var ghost = document.createElement('img'); ghost.className = 'pt-ghost' + (C.FACES_RIGHT[r.mover] ? ' is-flip' : ''); ghost.alt = ''; ghost.draggable = false; ghost.src = this._pic(r.mover); ghost.style.height = L.veh + 'px'; ghost.hidden = true; this._ghost = ghost; stage.appendChild(ghost);
    var over = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); over.setAttribute('class', 'pt-over'); over.setAttribute('aria-hidden', 'true'); over.setAttribute('viewBox', '0 0 ' + L.W + ' ' + g.H); this._over = over; stage.appendChild(over);
  },
  /* where the mover waits: on the drive, right of the lift */
  _waitBox: function () { var L = this._L, g = this._g; return { x: g.liftX + L.lift + (L.mode === 'wide' ? 8 : 4), y: g.driveY + Math.round((L.drive - L.veh) / 2) }; },
  /* the library pictures are square canvases (the vehicle's ink is ~95 % of the width) */
  _vehW: function () { return this._L.veh; },
  /* the mover's resting box inside a spot */
  _inBox: function (s) { var b = this._box(s), L = this._L, w = this._vehW(); return { x: b.x + (b.w - w) / 2, y: b.y + b.h - L.veh - 2 }; },
  /* the route: waiting place → lift foot → lift at the spot's floor → the spot */
  _routeOf: function (s) {
    var L = this._L, g = this._g, w = this._waitBox(), lx = g.liftX + L.lift / 2, vy = this._levelY(s) - L.veh / 2 - 2, wy = w.y + L.veh / 2;
    var b = this._box(s), tx = b.x + b.w / 2;
    return [[w.x + this._vehW() / 2, wy], [lx, wy], [lx, vy], [tx, vy]];
  },
  _paintSide: function () {
    var C = ParkingTowerCore, st = this.st, r = st.r, L = this._L, g = this._g, self = this;
    var hp = st.help, last = st.last, right = C.rightOf(r);
    /* the mover: waiting, riding, or parked */
    if (r.kind !== 'tap' && !this._anim) {
      var at = st.parked ? this._inBox(st.parked) : this._waitBox();
      this._mover.style.left = at.x + 'px'; this._mover.style.top = at.y + 'px'; this._mover.style.width = this._vehW() + 'px';
      this._mover.classList.toggle('is-parked', !!st.parked);
    }
    this._mover.classList.toggle('is-flash', !!st.done && !this._afterOk);
    /* spots: free / chosen / selected; rings */
    for (var k in this._spots) {
      var el = this._spots[k], sp = el.hasAttribute('data-c') ? { c: +el.getAttribute('data-c'), l: +el.getAttribute('data-l') } : k;
      var free = el.classList.contains('is-free'), mine = st.parked && C.same(st.parked, sp);
      el.classList.toggle('is-mine', !!mine);
      el.classList.toggle('is-sel', !!(st.sel && C.same(st.sel, sp)));
      el.classList.toggle('is-gold', !!(st.done && ((st.sel && C.same(st.sel, sp)) || mine)));
      el.classList.toggle('is-right', hp >= 2 && C.same(right, sp));
      el.classList.toggle('is-wrongspot', !!(hp >= 1 && last && last.result === 'wrong' && C.same(last.did, sp)));
      el.disabled = (r.kind === 'tap' ? !el.classList.contains('is-truck') : !free) || (st.done && r.kind === 'tap');
      el.setAttribute('aria-label', this._spotName(sp) + ': ' + (el.classList.contains('is-truck') ? this._t('uv_truck') : free ? (mine ? this._t('uv_' + r.mover) : this._t('ariaFree')) : this._t('ariaTaken')));
    }
    /* the ghost (miss 2) */
    if (hp >= 2 && r.kind !== 'tap') { var gb = this._inBox(right); this._ghost.hidden = false; this._ghost.style.left = gb.x + 'px'; this._ghost.style.top = gb.y + 'px'; this._ghost.style.width = this._vehW() + 'px'; }
    else this._ghost.hidden = true;
    /* the lift: platform at the mover's floor, lights */
    var platY = st.parked ? this._levelY(st.parked) : g.driveY + L.drive - 2;
    if (!this._anim) this._plat.style.cssText = 'left:' + (g.liftX + 2) + 'px;top:' + (platY - 4) + 'px;width:' + (L.lift - 4) + 'px;';
    var lv = st.parked && typeof st.parked !== 'string' ? st.parked.l : 0;
    Array.prototype.forEach.call(this._lights.children, function (d, i) { d.classList.toggle('is-on', 3 - i <= lv); });
    /* the slab above / below the landmark pulses on an above/below miss */
    Array.prototype.forEach.call(this._stage.querySelectorAll('.pt-slab'), function (sl) { sl.classList.remove('is-pulse'); });
    if (hp === 1 && r.mode === 'near' && (r.rel === 'above' || r.rel === 'below')) {
      var lm = r.lms[0], sl = this._stage.querySelector('.pt-slab[data-slab="' + (r.rel === 'above' ? lm.l + 1 : lm.l) + '"]');
      if (sl) sl.classList.add('is-pulse');
    }
    /* the booth */
    this._booth.classList.toggle('is-open', !!st.done);
    /* overlay: route, rings, arrows */
    var svg = '';
    if (this._route) svg += '<polyline class="pt-route" points="' + this._route.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>';
    (r.lms || []).forEach(function (m) { var b = self._box({ c: m.c, l: m.l }); svg += '<rect class="pt-ring is-lm" x="' + (b.x + 3) + '" y="' + (b.y + 3) + '" width="' + (b.w - 6) + '" height="' + (b.h - 6) + '" rx="10"/>'; });
    if (r.kind === 'tap') r.cands.forEach(function (sp) { var b = self._box(sp); svg += '<rect class="pt-ring is-mv" x="' + (b.x + 3) + '" y="' + (b.y + 3) + '" width="' + (b.w - 6) + '" height="' + (b.h - 6) + '" rx="10"/>'; });
    if (hp === 1 && last && last.result === 'wrong') svg += this._missArrows(last.did);
    this._over.innerHTML = svg;
    this._stage.querySelectorAll('.pt-zone').forEach(function (z) { z.remove(); });
    if (hp === 1 && r.mode === 'tower') this._zone(r.trel);
  },
  _spotName: function (sp) {
    if (sp === 'ROOF') return this._t('ariaRoof'); if (sp === 'BASE') return this._t('ariaBase');
    if (sp === 'SL') return this._t('ariaStreetL'); if (sp === 'SR') return this._t('ariaStreetR');
    return this._t('ariaLevel', { l: sp.l, c: sp.c });
  },
  _ctr: function (s) { var b = this._box(s); return [b.x + b.w / 2, b.y + b.h / 2]; },
  _arrow: function (cls, a, b) {
    var dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d, h = 12;
    var ex = b[0] - ux * 4, ey = b[1] - uy * 4;
    return '<line class="pt-arrow ' + cls + '" x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + (ex - ux * h * 0.6).toFixed(1) + '" y2="' + (ey - uy * h * 0.6).toFixed(1) + '"/>'
      + '<path class="pt-head ' + cls + '" d="M' + ex.toFixed(1) + ' ' + ey.toFixed(1) + ' L' + (ex - ux * h - uy * h * 0.6).toFixed(1) + ' ' + (ey - uy * h + ux * h * 0.6).toFixed(1) + ' L' + (ex - ux * h + uy * h * 0.6).toFixed(1) + ' ' + (ey - uy * h - ux * h * 0.6).toFixed(1) + ' Z"/>';
  },
  /* miss 1 (side view): teal = the asked position from the landmark;
     coral = from the landmark to where the vehicle actually is */
  _missArrows: function (did) {
    var r = this.st.r, L = this._L, out = '';
    if (r.mode !== 'near') { return this._arrow('is-did', [this._ctr(did)[0], this._box(did).y - 18], [this._ctr(did)[0], this._box(did).y + 6]); }
    var lm = r.lms[0], c0 = this._ctr({ c: lm.c, l: lm.l }), step = L.bayW * 0.55, up = (L.bayH + L.slab) * 0.62;
    if (r.rel === 'between') {
      var a = this._ctr({ c: r.lms[0].c, l: r.lms[0].l }), b = this._ctr({ c: r.lms[1].c, l: r.lms[1].l }), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      out += this._arrow('is-ask', a, [a[0] + (m[0] - a[0]) * 0.8, a[1] + (m[1] - a[1]) * 0.8]) + this._arrow('is-ask', b, [b[0] + (m[0] - b[0]) * 0.8, b[1] + (m[1] - b[1]) * 0.8]);
      out += this._arrow('is-did', a, this._ctr(did));
      return out;
    }
    if (r.rel === 'above') out += this._arrow('is-ask', c0, [c0[0], c0[1] - up]);
    if (r.rel === 'below') out += this._arrow('is-ask', c0, [c0[0], c0[1] + up]);
    if (r.rel === 'left' || r.rel === 'next') out += this._arrow('is-ask', c0, [c0[0] - step, c0[1]]);
    if (r.rel === 'right' || r.rel === 'next') out += this._arrow('is-ask', c0, [c0[0] + step, c0[1]]);
    out += this._arrow('is-did', c0, this._ctr(did));
    return out;
  },
  /* miss 1 (tower): the asked area glows */
  _zone: function (trel) {
    var C = ParkingTowerCore, g = this._g, L = this._L, st = this.st, self = this, boxes = [];
    if (trel === 'on' || trel === 'under' || trel === 'leftside') boxes.push(this._box(trel === 'on' ? 'ROOF' : trel === 'under' ? 'BASE' : 'SL'));
    else if (trel === 'beside' || trel === 'outside') { boxes.push(this._box('SL')); boxes.push(this._box('SR')); }
    else if (trel === 'inside') boxes.push({ x: g.towerX, y: g.top + g.roofSpace, w: g.towerW, h: g.groundY - g.top - g.roofSpace });
    else { var l = trel === 'top' ? 3 : trel === 'middle' ? 2 : 1, a = this._box({ c: 1, l: l }); boxes.push({ x: g.towerX, y: a.y, w: g.towerW, h: a.h }); }
    boxes.forEach(function (b) { var z = self.api.el('div', 'pt-zone'); z.setAttribute('aria-hidden', 'true'); z.style.cssText = 'left:' + (b.x - 3) + 'px;top:' + (b.y - 3) + 'px;width:' + (b.w + 6) + 'px;height:' + (b.h + 6) + 'px;'; self._stage.appendChild(z); });
    void C; void L; void st;
  },
  _clearAnim: function () { this._anim = null; },
  /* the hand: tap a spot */
  _tapSpot: function (sp) {
    var C = ParkingTowerCore, st = this.st, self = this;
    if (this._busy) return;
    if (st.r.kind === 'tap') { if (C.select(st, sp)) { this.api.sound(660); this._paint(); } return; }
    if (st.parked && C.same(st.parked, sp)) return;
    var was = st.done;
    if (!C.park(st, sp)) { this.api.sound(220); return; }
    this.api.sound(520);
    this._route = this._routeOf(sp);
    this._drive(this._route, function () { self._paint(); });
    if (was) this._afterOk = true;
    this._paint();
  },
  /* drive the mover along the route (CSS transitions, one leg at a time) */
  _drive: function (pts, done) {
    var self = this, mv = this._mover, w = this._vehW(), L = this._L, legs = pts.slice(1), i = 0, token = {};
    this._anim = token;
    var at = function (p) { return { x: p[0] - w / 2, y: p[1] - L.veh / 2 }; };
    var s0 = at(pts[0]); mv.style.transition = 'none'; mv.style.left = s0.x + 'px'; mv.style.top = s0.y + 'px'; void mv.offsetWidth;
    var step = function () {
      if (self._anim !== token) return;
      if (i >= legs.length) { mv.style.transition = ''; self._anim = null; mv.classList.add('is-bounce'); self._later(function () { mv.classList.remove('is-bounce'); }, self._ms(160)); done(); return; }
      var a = i === 0 ? pts[0] : legs[i - 1], b = legs[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]), vert = Math.abs(b[1] - a[1]) > Math.abs(b[0] - a[0]);
      var ms = self._ms(vert ? Math.max(120, d / (L.bayH + L.slab) * 300) : Math.max(80, d / 180 * 1000));
      var p = at(b); mv.style.transition = 'left ' + ms + 'ms linear, top ' + ms + 'ms linear'; mv.style.left = p.x + 'px'; mv.style.top = p.y + 'px';
      if (vert) { self._plat.style.transition = 'top ' + ms + 'ms linear'; self._plat.style.top = (b[1] + L.veh / 2 - 2) + 'px'; }
      i++; if (ms === 0) step(); else self._later(step, ms + 20);
    };
    step();
  },
  _arrowKey: function (ev, sp) {
    var map = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }, d = map[ev.key];
    if (!d || typeof sp === 'string') return;
    /* the next free bay that way (taken bays are disabled, so not focusable) */
    for (var i = 1; i <= 3; i++) { var t = this._spots[(sp.c + d[0] * i) + ',' + (sp.l + d[1] * i)]; if (!t) break; if (!t.disabled) { ev.preventDefault(); t.focus(); return; } }
  },

  /* ================= the roof plan ================= */
  _pgeo: function () {
    var L = this._L, st = this.st, n = L.n, gridW = L.strip + n * L.sq, wide = L.mode === 'wide';
    var g = { gridX: 0, gridY: 0, gridW: gridW, gridH: L.strip + n * L.sq };
    /* below the grid: (narrow) the dials, then the row where a miss shows the
       asked code beside the done one — never on top of the squares */
    if (wide) { var side = L.side; var tot = gridW + L.gap + side; g.gridX = Math.max(0, Math.floor((L.W - tot) / 2)); g.gridY = 4; g.sideX = g.gridX + gridW + L.gap; g.sideW = side; g.cmpY = g.gridY + g.gridH + 6; g.H = Math.max(st.read ? g.gridY + g.gridH : g.cmpY + 40, 4 + L.key * (st.r.kind === 'compass' ? 2 : 1) + 24 + L.rose + 12 + (st.read ? 210 : 0)) + 4; }
    else { var tg = L.tight, topH = Math.max(L.key + (tg ? 6 : 10), L.rose + 4); g.gridX = Math.max(0, Math.floor((L.W - gridW) / 2)); g.gridY = topH + (tg ? 4 : 8); g.dialY = g.gridY + g.gridH + (tg ? 4 : 8); g.H = st.read ? g.dialY + (tg ? 50 : 56) : g.gridY + g.gridH + 4; }
    return g;
  },
  _sqBox: function (code) { var L = this._L, g = this._pg, q = ParkingTowerCore.squareOf(code); return { x: g.gridX + L.strip + (q.c - 1) * L.sq, y: g.gridY + L.strip + (q.r - 1) * L.sq, w: L.sq, h: L.sq }; },
  _buildPlan: function () {
    var api = this.api, self = this, st = this.st, C = ParkingTowerCore, L = this._L, r = st.r, stage = this._stage;
    var g = this._pg = this._pgeo(), n = L.n, wide = L.mode === 'wide';
    stage.style.height = g.H + 'px';
    /* the grid strips and squares */
    var grid = api.el('div', 'pt-grid'); grid.style.cssText = 'left:' + g.gridX + 'px;top:' + g.gridY + 'px;width:' + g.gridW + 'px;height:' + g.gridH + 'px;--pt-sq:' + L.sq + 'px;--pt-strip:' + L.strip + 'px;';
    this._colLab = []; this._rowLab = [];
    for (var c = 1; c <= n; c++) { var cl = api.el('span', 'pt-collab'); cl.textContent = C.LETTERS.charAt(c - 1); cl.style.cssText = 'left:' + (L.strip + (c - 1) * L.sq) + 'px;width:' + L.sq + 'px;height:' + L.strip + 'px;line-height:' + L.strip + 'px;'; grid.appendChild(cl); this._colLab.push(cl); }
    for (var rw = 1; rw <= n; rw++) { var rl = api.el('span', 'pt-rowlab'); rl.textContent = String(rw); rl.style.cssText = 'top:' + (L.strip + (rw - 1) * L.sq) + 'px;height:' + L.sq + 'px;width:' + L.strip + 'px;line-height:' + L.sq + 'px;'; grid.appendChild(rl); this._rowLab.push(rl); }
    stage.appendChild(grid);
    var beams = api.el('div', 'pt-beams'); beams.setAttribute('aria-hidden', 'true'); this._beams = beams; stage.appendChild(beams);
    this._sq = {};
    var tokens = C.planTokens(r, st.read), tapOK = !st.read && L.tap;
    for (var y = 1; y <= n; y++) for (var x = 1; x <= n; x++) (function (code, x, y) {
      var b = self._sqBox(code), el = api.el(tapOK ? 'button' : 'div', 'pt-sq');
      if (tapOK) { el.type = 'button'; el.addEventListener('click', function () { self._tapSquare(code); }); el.addEventListener('keydown', function (ev) { self._sqKey(ev, x, y); }); }
      el.setAttribute('data-code', code); el.setAttribute('data-x', x); el.setAttribute('data-y', y);
      el.style.cssText = 'left:' + b.x + 'px;top:' + b.y + 'px;width:' + b.w + 'px;height:' + b.h + 'px;';
      var tk = tokens[code];
      if (tk) el.appendChild(self._token(tk.role === 'grey' ? C.GREY : C.TOKEN[tk.v], tk.role));
      stage.appendChild(el); self._sq[code] = el;
    })(C.codeOf(x, y), x, y);
    /* the parked mover's token (moves) and the ghost */
    var mt = this._token(C.TOKEN[r.mover], 'mover'); mt.classList.add('pt-movetok'); mt.hidden = true; this._moveTok = mt; stage.appendChild(mt);
    var gt = this._token(C.GREY, 'ghost'); gt.classList.add('pt-movetok', 'is-ghost'); gt.hidden = true; this._ghostTok = gt; stage.appendChild(gt);
    /* the key: library pictures with their token swatches */
    var key = api.el('div', 'pt-key'); this._key = key;
    var items = [{ v: r.mover, role: 'mover' }]; if (r.kind === 'compass') items.push({ v: r.lm.v, role: 'landmark' });
    items.forEach(function (it) {
      var row = api.el('div', 'pt-keyrow is-' + it.role);
      var im = document.createElement('img'); im.alt = ''; im.draggable = false; im.src = self._pic(it.v); im.className = 'pt-keypic' + (C.FACES_RIGHT[it.v] ? ' is-flip' : ''); im.style.height = L.key + 'px';
      row.appendChild(im); row.appendChild(self._token(C.TOKEN[it.v], it.role)); key.appendChild(row);
    });
    /* the compass rose */
    var rose = api.el('div', 'pt-rose'); rose.setAttribute('aria-hidden', 'true'); this._rose = rose;
    rose.innerHTML = this._roseSVG(r.kind === 'compass' ? r.rose : 0);
    /* the dials */
    var dials = null;
    if (st.read) {
      dials = api.el('div', 'pt-dials'); this._dialEls = {};
      ['l', 'n'].forEach(function (w) {
        var d = api.el('div', 'pt-dial'); d.setAttribute('role', 'group'); d.setAttribute('aria-label', self._t(w === 'l' ? 'ariaLetter' : 'ariaNumber'));
        var up = api.el('button', 'pt-dialbtn'); up.type = 'button'; up.innerHTML = '<svg viewBox="0 0 20 12" aria-hidden="true"><path d="M2 10 L10 2 L18 10"/></svg>'; up.setAttribute('aria-label', self._t(w === 'l' ? 'ariaLetter' : 'ariaNumber') + ' ' + self._t('ariaUp'));
        var val = api.el('span', 'pt-dialval'); val.setAttribute('aria-live', 'polite');
        var dn = api.el('button', 'pt-dialbtn'); dn.type = 'button'; dn.innerHTML = '<svg viewBox="0 0 20 12" aria-hidden="true"><path d="M2 2 L10 10 L18 2"/></svg>'; dn.setAttribute('aria-label', self._t(w === 'l' ? 'ariaLetter' : 'ariaNumber') + ' ' + self._t('ariaDown'));
        /* ▲ goes back along the strip (towards A / 1), ▼ forward — like the wheel's own face */
        up.addEventListener('click', function () { self._turn(w, -1); });
        dn.addEventListener('click', function () { self._turn(w, 1); });
        d.appendChild(up); d.appendChild(val); d.appendChild(dn); dials.appendChild(d); self._dialEls[w] = val;
      });
      var tk2 = api.el('span', 'pt-ticketcode'); this._tick = tk2; dials.appendChild(tk2);
    }
    if (wide) {
      var side = api.el('div', 'pt-side'); side.style.cssText = 'left:' + g.sideX + 'px;top:' + g.gridY + 'px;width:' + g.sideW + 'px;';
      side.appendChild(key); side.appendChild(rose); if (dials) side.appendChild(dials); stage.appendChild(side);
    } else {
      var top = api.el('div', 'pt-planbar'); top.style.cssText = 'left:' + g.gridX + 'px;top:0;width:' + g.gridW + 'px;';
      top.appendChild(key); top.appendChild(rose); stage.appendChild(top);
      if (dials) { dials.classList.add('is-under'); dials.style.cssText = 'left:0;right:0;top:' + g.dialY + 'px;'; stage.appendChild(dials); }
    }
    var over = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); over.setAttribute('class', 'pt-over'); over.setAttribute('aria-hidden', 'true'); over.setAttribute('viewBox', '0 0 ' + L.W + ' ' + g.H); this._over = over; stage.appendChild(over);
    var cmp = api.el('div', 'pt-compare'); cmp.hidden = true; this._cmp = cmp;
    if (wide) stage.appendChild(cmp); else { cmp.classList.add('is-bar'); top.insertBefore(cmp, rose); }
  },
  _token: function (col, role) { var t = this.api.el('span', 'pt-token is-' + role); t.style.background = col; return t; },
  _roseSVG: function (deg) {
    var self = this, pts = [['N', 0], ['E', 90], ['S', 180], ['W', 270]], s = '<svg viewBox="-60 -60 120 120" class="pt-rosesvg"><circle r="40" class="pt-rosering"/>';
    s += '<g transform="rotate(' + deg + ')">';
    pts.forEach(function (p) { s += '<path class="pt-petal' + (p[0] === 'N' ? ' is-n' : '') + '" transform="rotate(' + p[1] + ')" d="M0 -38 L8 -6 L0 0 L-8 -6 Z"/>'; });
    s += '</g>';
    pts.forEach(function (p) { var a = (p[1] + deg) * Math.PI / 180, x = Math.sin(a) * 51, y = -Math.cos(a) * 51; s += '<text class="pt-roselet' + (p[0] === 'N' ? ' is-n' : '') + '" x="' + x.toFixed(1) + '" y="' + (y + 6).toFixed(1) + '" text-anchor="middle">' + self._t('rose' + p[0]) + '</text>'; });
    return s + '</svg>';
  },
  _paintPlan: function () {
    var C = ParkingTowerCore, st = this.st, r = st.r, L = this._L, self = this, hp = st.help, last = st.last, ans = C.planAnswer(r);
    /* the mover token where it is parked */
    if (st.parked) { var b = this._sqBox(st.parked), ts = L.token; this._moveTok.hidden = false; this._moveTok.style.cssText = 'left:' + (b.x + (b.w - ts) / 2) + 'px;top:' + (b.y + (b.h - ts) / 2) + 'px;width:' + ts + 'px;height:' + ts + 'px;background:' + C.TOKEN[r.mover] + ';'; }
    else this._moveTok.hidden = true;
    this._moveTok.classList.toggle('is-flash', !!st.done && !this._afterOk);
    /* the beams under the letter and along the number of the parked square
       (code rounds), the asked ones on miss 2 */
    var beam = null;
    if (hp >= 2) beam = st.read ? r.code : ans; else if (st.parked && r.kind === 'code') beam = st.parked; else if (hp === 1 && last && last.result === 'wrong' && r.kind === 'code') beam = last.did;
    var bh = '';
    if (beam) { var bb = this._sqBox(beam), g = this._pg; bh = '<span class="pt-beam is-col" style="left:' + bb.x + 'px;top:' + g.gridY + 'px;width:' + bb.w + 'px;height:' + (bb.y + bb.h - g.gridY) + 'px"></span><span class="pt-beam is-row" style="left:' + g.gridX + 'px;top:' + bb.y + 'px;width:' + (bb.x + bb.w - g.gridX) + 'px;height:' + bb.h + 'px"></span>'; }
    this._beams.innerHTML = bh;
    var q = beam ? C.squareOf(beam) : null;
    this._colLab.forEach(function (e, i) { e.classList.toggle('is-lit', !!q && q.c === i + 1); });
    this._rowLab.forEach(function (e, i) { e.classList.toggle('is-lit', !!q && q.r === i + 1); });
    /* squares */
    for (var code in this._sq) {
      var el = this._sq[code], tk = el.querySelector('.pt-token');
      el.classList.toggle('is-right', hp >= 2 && !st.read && code === ans);
      el.classList.toggle('is-taken', !!tk);
      if (el.tagName === 'BUTTON') { el.disabled = !!tk || (st.done && false); el.setAttribute('aria-label', this._t('ariaSquare', { code: code }) + (tk ? ': ' + this._t('ariaTaken') : st.parked === code ? ': ' + this._t('uv_' + r.mover) : '')); }
      if (tk && tk.classList.contains('is-mover')) tk.classList.toggle('is-pulse', hp >= 1);
    }
    /* the ghost token: miss 1 of a read round drives to the square the dials name; miss 2 of a park round sits in the right square */
    var gcode = null;
    if (hp === 1 && st.read && last && last.did) gcode = last.did;
    if (hp >= 2 && !st.read) gcode = ans;
    if (gcode && C.squareOf(gcode) && C.squareOf(gcode).c <= L.n && C.squareOf(gcode).r <= L.n) { var gb = this._sqBox(gcode), ts2 = L.token; this._ghostTok.hidden = false; this._ghostTok.style.cssText = 'left:' + (gb.x + (gb.w - ts2) / 2) + 'px;top:' + (gb.y + (gb.h - ts2) / 2) + 'px;width:' + ts2 + 'px;height:' + ts2 + 'px;background:' + (hp >= 2 ? C.TOKEN[r.mover] : C.GREY) + ';'; }
    else this._ghostTok.hidden = true;
    /* dials */
    if (st.read) {
      this._dialEls.l.textContent = st.dials.l == null ? '–' : C.LETTERS.charAt(st.dials.l - 1);
      this._dialEls.n.textContent = st.dials.n == null ? '–' : String(st.dials.n);
      var dc = C.dialCode(st); this._tick.textContent = dc || '';
      this._tick.classList.toggle('is-gold', !!st.done);
      this._stage.querySelectorAll('.pt-dialbtn').forEach(function (bt) { bt.disabled = !!st.done; });
    }
    /* the comparison ticket: what was asked beside what was done */
    var cmp = '';
    if (hp === 1 && last && last.result === 'wrong' && r.kind !== 'compass' && !st.read) cmp = '<span class="pt-tk is-did">' + last.did + '</span><span class="pt-tk is-ask">' + ans + '</span>';
    this._cmp.hidden = !cmp; this._cmp.innerHTML = cmp;
    if (cmp && L.mode === 'wide') { var g2 = this._pg; this._cmp.style.cssText = 'left:' + g2.gridX + 'px;width:' + g2.gridW + 'px;top:' + g2.cmpY + 'px;'; }
    /* the compass: north glows and an arrow from the landmark to the parked square */
    this._rose.classList.toggle('is-hint', hp >= 1 && r.kind === 'compass');
    var svg = '';
    if (r.kind === 'compass') { var lb = this._sqBox(r.lm.code); svg += '<rect class="pt-ring is-lm" x="' + (lb.x + 2) + '" y="' + (lb.y + 2) + '" width="' + (lb.w - 4) + '" height="' + (lb.h - 4) + '" rx="8"/>'; }
    if (r.kind === 'compass' && hp === 1 && last && last.did) { var a = this._sqBox(r.lm.code), d = this._sqBox(last.did); svg += this._arrow('is-did', [a.x + a.w / 2, a.y + a.h / 2], [d.x + d.w / 2, d.y + d.h / 2]); }
    if (st.read) { var mb = this._sqBox(r.code); svg += '<rect class="pt-ring is-mv" x="' + (mb.x + 1) + '" y="' + (mb.y + 1) + '" width="' + (mb.w - 2) + '" height="' + (mb.h - 2) + '" rx="6"/>'; }
    this._over.innerHTML = svg;
  },
  _tapSquare: function (code) {
    var C = ParkingTowerCore, st = this.st;
    if (this._busy || st.parked === code) return;
    var was = st.done;
    if (!C.park(st, code)) { this.api.sound(220); return; }
    this.api.sound(520);
    if (was) this._afterOk = true;
    this._paint();
  },
  _sqKey: function (ev, x, y) {
    var map = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }, d = map[ev.key];
    if (!d) return;
    var t = this._sq[ParkingTowerCore.codeOf(x + d[0], y + d[1])];
    if (t && t.tagName === 'BUTTON') { ev.preventDefault(); t.focus(); }
  },
  _turn: function (w, d) { if (this._busy) return; if (ParkingTowerCore.turn(this.st, w, d)) { this.api.sound(w === 'l' ? 700 : 760); this._paint(); } },

  /* ================= both ================= */
  _paint: function () {
    if (!this._stage) return;
    var C = ParkingTowerCore, st = this.st;
    if (st.r.mode.indexOf('plan') === 0) this._paintPlan(); else this._paintSide();
    this._checkBtn.hidden = !!st.done;
    this._checkBtn.disabled = !!this._busy;
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t(C.success(st.r), { code: C.planAnswer(st.r) });
    else if (h) msg = this._t(h);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(st.help && !st.done));
    this._underline();
  },
  /* the task line: the live prompt, its vehicle words underlined in the
     colour of their rings (teal mover, coral landmark) */
  _underline: function () {
    var C = ParkingTowerCore, st = this.st, r = st.r;
    var span = document.querySelector('.lcs-activity-prompt-text'); if (!span) return;
    var promo = document.querySelector('.lcs-activity-prompt');
    if (promo && promo.classList.contains('celebrate')) return;
    var text = this._t(C.prompt(r, st.read), { code: r.mode.indexOf('plan') === 0 ? C.planAnswer(r) : '' });
    var u = (r.mode === 'near' || r.mode === 'tower' || (r.kind === 'compass' && !st.read)) ? this._t('u_' + r.id) : this._t('uv_' + r.mover);
    var parts = String(u).split('|'), marks = [];
    if (parts[0]) marks.push([parts[0], 'is-mv']);
    (parts[1] || '').split(',').filter(Boolean).forEach(function (w) { marks.push([w, 'is-lm']); });
    var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    var ranges = [], used = [];
    marks.forEach(function (m) {
      var re = new RegExp('(?<!\\p{L})' + m[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'giu'), x;
      while ((x = re.exec(text))) { var a = x.index, b = a + x[0].length; if (!used.some(function (q) { return a < q[1] && b > q[0]; })) { ranges.push([a, b, m[1]]); used.push([a, b]); break; } }
    });
    ranges.sort(function (p, q) { return p[0] - q[0]; });
    var html = '', at = 0;
    ranges.forEach(function (g) { html += esc(text.slice(at, g[0])) + '<span class="pt-u ' + g[2] + '">' + esc(text.slice(g[0], g[1])) + '</span>'; at = g[1]; });
    html += esc(text.slice(at));
    if (span.innerHTML !== html) span.innerHTML = html;
  },
  _check: function () {
    var C = ParkingTowerCore, st = this.st;
    if (this._busy || st.done || this._anim) return;
    var res = C.check(st);
    if (res.result === 'ok') { this._win(); return; }
    if (res.result === 'wrong') this.api.sound(196);
    this._paint();
  },
  _win: function () {
    var self = this;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._paint();
    this._busy = true;
    this._later(function () {
      self._busy = false; self._afterOk = true; self._paint();
      var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click();
    }, this._ms(this.OK_MS));
  }
};

var ptCssDone = false;
function injectParkingTowerCSS() {
  if (ptCssDone || typeof document === 'undefined') return;
  ptCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.pt-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--pt-ink:#0F4A40;--pt-teal:#146B5E;--pt-coral:#F2784B;--pt-gold:#E0A400;}'
  + '.pt-u{text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:5px;} .pt-u.is-mv{text-decoration-color:#146B5E;} .pt-u.is-lm{text-decoration-color:#F2784B;}'
  + '.pt-stage{position:relative;width:100%;user-select:none;-webkit-user-select:none;}'
  + '.pt-struct{position:absolute;left:0;top:0;}'
  + '.pt-hall{fill:#EAF3F1;} .pt-slab{fill:#9FB0AE;stroke:#6F8381;stroke-width:1;} .pt-slab.is-ground{fill:#7E908E;} .pt-slab.is-pulse{animation:pt-pulse .45s ease-in-out 3;} @keyframes pt-pulse{50%{fill:#F2784B;}}'
  + '.pt-wall{fill:#B9C7C4;} .pt-parapet{fill:#9FB0AE;} .pt-rail{fill:none;stroke:#6F8381;stroke-width:3;stroke-linecap:round;}'
  + '.pt-ground{fill:#C9B48A;} .pt-basement{fill:#DCD3BF;stroke:#9C8A64;stroke-width:2;} .pt-drive{fill:#5E6866;} .pt-lane{stroke:#F4E9C8;stroke-width:3;stroke-dasharray:14 12;} .pt-kerb{stroke:#7E908E;stroke-width:4;}'
  + '.pt-shaft{fill:rgba(207,230,240,.55);stroke:#5C8FA8;stroke-width:2;}'
  + '.pt-lights{position:absolute;display:flex;flex-direction:column;gap:5px;pointer-events:none;z-index:1;} .pt-light{width:12px;height:12px;border-radius:50%;background:#C7D3D1;box-shadow:inset 0 0 0 2px #8FA19F;} .pt-light.is-on{background:#FFD24A;box-shadow:0 0 6px #FFD24A,inset 0 0 0 2px #C99B00;}'
  + '.pt-platform{position:absolute;height:6px;border-radius:3px;background:#3F5B6B;z-index:3;pointer-events:none;}'
  + '.pt-spot{position:absolute;padding:0;border:0;background:transparent;display:flex;align-items:flex-end;justify-content:center;cursor:default;z-index:2;}'
  + '.pt-spot.is-free{cursor:pointer;} .pt-spot.is-free::after{content:"";position:absolute;inset:8px 10px 6px;border:2.5px dashed rgba(255,255,255,.95);border-radius:10px;background:rgba(255,255,255,.35);box-shadow:0 0 0 1px rgba(15,74,64,.18);}'
  /* a free space: a dashed outline with two downward chevrons (park here) — never a tick */
  + '.pt-spot.is-free::before{content:"";position:absolute;left:50%;top:40%;width:14px;height:14px;border-right:3px solid rgba(15,74,64,.28);border-bottom:3px solid rgba(15,74,64,.28);transform:translate(-50%,-50%) rotate(45deg);box-shadow:5px 5px 0 -0px rgba(255,255,255,0),6px 6px 0 -3px rgba(15,74,64,0);}'
  + '.pt-spot.is-truck{cursor:pointer;} .pt-spot:disabled{cursor:default;}'
  + '.pt-veh{display:block;width:auto;max-width:calc(100% + 16px);object-fit:contain;pointer-events:none;margin-bottom:2px;} .pt-veh.is-filler{filter:saturate(.6) opacity(.85);} .is-flip{transform:scaleX(-1);}'
  + '.pt-spot.is-sel{box-shadow:0 0 0 4px var(--pt-teal);border-radius:10px;} .pt-spot.is-sel .pt-veh{transform:translateY(-4px);} .pt-spot.is-sel .pt-veh.is-flip{transform:scaleX(-1) translateY(-4px);}'
  + '.pt-spot.is-gold{box-shadow:0 0 0 4px var(--pt-gold);border-radius:10px;}'
  + '.pt-spot.is-right{animation:pt-glow .6s ease-in-out 2;box-shadow:0 0 0 4px rgba(20,107,94,.6);border-radius:10px;} @keyframes pt-glow{50%{box-shadow:0 0 0 8px rgba(20,107,94,.35);}}'
  + '.pt-spot.is-wrongspot{box-shadow:0 0 0 4px var(--pt-coral);border-radius:10px;}'
  + '.pt-mover,.pt-ghost{position:absolute;object-fit:contain;pointer-events:none;z-index:4;} .pt-mover{outline:3.5px solid var(--pt-teal);outline-offset:3px;border-radius:10px;} .pt-ghost{opacity:.4;filter:grayscale(.2);} .pt-ghost[hidden],.pt-mover[hidden]{display:none;}'
  + '.pt-mover.is-bounce{animation:pt-bounce .16s ease-out;} @keyframes pt-bounce{50%{margin-top:-5px;}}'
  + '.pt-mover.is-flash,.pt-movetok.is-flash{animation:pt-flash .35s ease-in-out 4;} @keyframes pt-flash{50%{filter:brightness(1.35) drop-shadow(0 0 8px #FFD24A);}}'
  + '.pt-booth{position:absolute;z-index:3;display:flex;align-items:flex-end;justify-content:center;}'
  + '.pt-boothframe{position:absolute;inset:0;border-radius:12px 12px 4px 4px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #C9A25F;} .pt-beaver{position:relative;width:auto;object-fit:contain;}'
  + '.pt-barrier{position:absolute;left:-46px;bottom:30px;width:48px;height:7px;border-radius:4px;background:repeating-linear-gradient(90deg,#D9572F 0 10px,#fff 10px 20px);transform-origin:right center;transition:transform .4s ease;} .pt-booth.is-open .pt-barrier{transform:rotate(70deg);}'
  + '.pt-ticket{position:absolute;right:6px;top:8px;width:0;height:22px;border-radius:3px;background:#fff;box-shadow:0 0 0 2px #C9A25F;transition:width .4s ease .2s;} .pt-booth.is-open .pt-ticket{width:28px;}'
  + '.pt-over{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:5;overflow:visible;}'
  + '.pt-route{fill:none;stroke:var(--pt-teal);stroke-width:3;stroke-dasharray:2 7;stroke-linecap:round;stroke-linejoin:round;}'
  + '.pt-ring{fill:none;stroke-width:3.5;} .pt-ring.is-lm{stroke:var(--pt-coral);} .pt-ring.is-mv{stroke:var(--pt-teal);}'
  + '.pt-arrow{stroke-width:5;stroke-linecap:round;} .pt-arrow.is-ask{stroke:var(--pt-teal);} .pt-arrow.is-did{stroke:var(--pt-coral);} .pt-head.is-ask{fill:var(--pt-teal);} .pt-head.is-did{fill:var(--pt-coral);}'
  + '.pt-zone{position:absolute;border-radius:12px;box-shadow:0 0 0 4px var(--pt-teal);background:rgba(20,107,94,.12);pointer-events:none;z-index:4;animation:pt-glow .6s ease-in-out 2;}'
  /* the roof plan */
  + '.pt-grid{position:absolute;border-radius:6px;} .pt-collab,.pt-rowlab{position:absolute;text-align:center;font-weight:800;font-size:16px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);color:#4B6A63;} .pt-collab{top:0;} .pt-rowlab{left:0;} .is-narrow .pt-collab,.is-narrow .pt-rowlab{font-size:13px;}'
  + '.pt-collab.is-lit,.pt-rowlab.is-lit{color:#fff;background:var(--pt-teal);border-radius:6px;}'
  + '.pt-sq{position:absolute;padding:0;border:0;background:#D9E4E2;box-shadow:inset 0 0 0 1px #A9BAB7;display:flex;align-items:center;justify-content:center;} button.pt-sq{cursor:pointer;} .pt-sq.is-taken{cursor:default;} .pt-sq.is-right{animation:pt-sqglow .6s ease-in-out 3;background:#BFE3D9;} @keyframes pt-sqglow{50%{background:#8FD0BE;}}'
  + '.pt-beams{position:absolute;inset:0;pointer-events:none;z-index:1;} .pt-beam{position:absolute;background:rgba(255,210,74,.28);}'
  + '.pt-token{display:block;width:var(--pt-tok,44px);height:var(--pt-tok,44px);border-radius:9px;box-shadow:inset 0 0 0 3px rgba(15,30,28,.75);position:relative;} .pt-token::after{content:"";position:absolute;left:50%;top:50%;width:28%;height:28%;border-radius:50%;background:#fff;transform:translate(-50%,-50%);}'
  + '.pt-sq .pt-token{width:72%;height:72%;max-width:44px;max-height:44px;} .is-narrow .pt-sq .pt-token{width:70%;height:70%;} .pt-token.is-grey{box-shadow:inset 0 0 0 2px #8A9694;} .pt-token.is-grey::after{background:#E6ECEB;}'
  + '.pt-token.is-pulse{animation:pt-flash .4s ease-in-out 3;}'
  + '.pt-movetok{position:absolute;z-index:3;pointer-events:none;transition:left .25s ease,top .25s ease;} .pt-movetok[hidden]{display:none;} .pt-movetok.is-ghost{opacity:.55;}'
  + '.pt-side{position:absolute;display:flex;flex-direction:column;align-items:center;gap:12px;} .pt-planbar{position:absolute;display:flex;align-items:center;justify-content:space-between;gap:8px;}'
  + '.pt-key{display:flex;flex-direction:column;gap:6px;padding:6px 10px;border-radius:12px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #C9B897;} .pt-planbar .pt-key{flex-direction:row;}'
  + '.pt-keyrow{display:flex;align-items:center;gap:8px;} .is-wide.is-n10 .pt-keyrow{flex-direction:column;gap:4px;} .is-wide.is-n10 .pt-rose{width:104px;height:104px;} .pt-keypic{width:auto;max-width:136px;object-fit:contain;} .is-narrow .pt-keypic{max-width:92px;} .pt-keyrow .pt-token{--pt-tok:28px;} .is-narrow .pt-keyrow .pt-token{--pt-tok:22px;}'
  + '.pt-keyrow.is-mover .pt-keypic{filter:drop-shadow(0 0 0 #146B5E);} .pt-keyrow.is-mover{box-shadow:0 3px 0 -1px var(--pt-teal);} .pt-keyrow.is-landmark{box-shadow:0 3px 0 -1px var(--pt-coral);}'
  + '.pt-rose{width:120px;height:120px;} .is-narrow .pt-rose{width:72px;height:72px;} .pt-rosesvg{width:100%;height:100%;overflow:visible;} .pt-rosering{fill:#FBF3E4;stroke:#C9B897;stroke-width:2;}'
  + '.pt-petal{fill:#7E908E;stroke:#4B6A63;stroke-width:1.2;} .pt-petal.is-n{fill:#F2784B;} .pt-roselet{font-weight:800;font-size:15px;fill:#4B6A63;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);} .pt-roselet.is-n{fill:#D9572F;}'
  + '.pt-rose.is-hint .pt-petal.is-n{animation:pt-pulse .45s ease-in-out 3;}'
  + '.pt-dials{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;} .pt-side .pt-ticketcode{flex-basis:100%;max-width:80px;} .pt-dials.is-under{position:absolute;flex-wrap:nowrap;} .pt-dials.is-under .pt-dial{flex-direction:row;padding:3px;} .pt-dials.is-under .pt-dialval{min-width:36px;} .pt-dials.is-under .pt-dialbtn{width:44px;} .pt-dials.is-under .pt-ticketcode{display:none;}'
  + '.pt-dial{display:flex;flex-direction:column;align-items:center;gap:4px;padding:4px;border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #C9B897;}'
  + '.pt-dialbtn{width:56px;height:44px;border:0;border-radius:10px;background:#E3F1EC;cursor:pointer;display:flex;align-items:center;justify-content:center;} .is-wide .pt-dialbtn{width:64px;} .pt-dialbtn svg{width:22px;height:14px;} .pt-dialbtn path{fill:none;stroke:var(--pt-teal);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;} .pt-dialbtn:disabled{opacity:.5;cursor:default;}'
  + '.pt-dialval{min-width:44px;text-align:center;font-weight:800;font-size:26px;line-height:34px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);color:var(--pt-ink);}'
  + '.pt-ticketcode{min-width:56px;height:40px;padding:0 10px;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 2px #C9B897;font-weight:800;font-size:22px;line-height:40px;text-align:center;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);color:var(--pt-ink);} .pt-ticketcode:empty{opacity:.5;} .pt-ticketcode.is-gold{box-shadow:inset 0 0 0 3px var(--pt-gold);background:#FFF6DA;}'
  + '.pt-compare{position:absolute;display:flex;justify-content:center;gap:8px;z-index:6;pointer-events:none;} .pt-compare.is-bar{position:static;gap:4px;} .pt-compare.is-bar .pt-tk{font-size:17px;padding:2px 6px;} .pt-compare[hidden]{display:none;} .pt-tk{padding:2px 10px;border-radius:6px;background:#fff;font-weight:800;font-size:20px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);} .pt-tk.is-did{box-shadow:inset 0 0 0 3px var(--pt-coral);color:#A6461F;} .pt-tk.is-ask{box-shadow:inset 0 0 0 3px var(--pt-teal);color:var(--pt-teal);}'
  /* words + Check */
  + '.pt-note:empty{display:none;} .pt-note{min-height:28px;align-self:center;font:700 20px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--pt-ink);text-align:center;max-width:620px;} .pt-note.is-ok{color:var(--pt-teal);font-weight:800;} .pt-note.is-wrong{color:#A6461F;} .is-narrow .pt-note{font-size:17px;} .is-tight.pt-wrap{gap:6px;} .is-tight .pt-ask{align-items:center;gap:8px;} .is-tight .pt-note{font-size:15px;line-height:1.25;text-align:left;flex:1;min-height:0;} .is-tight .pt-key{padding:3px 8px;} .is-tight .pt-dial{padding:2px;} .is-tight .pt-check{min-height:46px;padding:0 18px;}'
  + '.pt-ask{display:flex;justify-content:center;} .pt-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .pt-check[hidden]{display:none;} .pt-check:disabled{opacity:.5;}'
  + '.pt-spot:focus-visible,.pt-sq:focus-visible,.pt-dialbtn:focus-visible,.pt-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.pt-mover,.pt-movetok{transition:none !important;} .pt-slab.is-pulse,.pt-spot.is-right,.pt-zone,.pt-mover.is-flash,.pt-movetok.is-flash,.pt-token.is-pulse,.pt-sq.is-right,.pt-rose.is-hint .pt-petal.is-n{animation:none;}}';
  var el = document.createElement('style'); el.id = 'pt-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.ParkingTowerActivity = ParkingTowerActivity;
