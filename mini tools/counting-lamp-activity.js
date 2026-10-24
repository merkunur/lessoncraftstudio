/* =====================================================================
   counting-lamp-activity.js — ACTIVITY #92 of the one-by-one rebuild:
   "Whistle Valley — Number-Line Track Repair" → THE COUNTING LAMP
   (1.NBT.A.1, 11 locales). Design: docs/activities-rebuild/designs/092-track-repair.md
   ---------------------------------------------------------------------
   THE INVENTION: the engine checks the repaired track by counting on from
   the station with its headlamp, shining each tie's true number onto the
   rail as it rolls over it — and it stops wherever the lamp and the
   child's plate disagree. Hops: one puff per hop, numbered, and the
   engine brakes on the tie it really reaches. Mileposts: each jump shows
   its own size. Open rail: ghost ties counted from the station.
   ACTIVITY LAYER ONLY: the model is counting-lamp-core.js; the engine is a
   library picture (vehicles/train) via lcs-pictures.js; lcs-shell.js
   untouched (the shell's Check is hidden and pressed by this activity when
   the track is right). Test seams: window.CountingLampActivity.st /
   ._pool / ._order / ._ensurePool / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var CountingLampActivity = {
  id: 'counting-lamp',
  apparatusClasses: ['lm-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Whistle Valley',de:'Pfeiftal',nl:'Fluitdal',da:'Fløjtedalen',sv:'Visseldalen',no:'Fløytedalen',es:'El Valle del Silbato',it:'La valle del Fischio',pt:'Vale do Apito',fr:'La vallée du Sifflet',fi:'Pillilaakso'},
    pTies:       {en:'Bolt the plates onto their ties. One plate does not belong on this track.',de:'Schraub die Schilder an ihre Schwellen. Ein Schild gehört nicht zu dieser Strecke.',nl:'Schroef de bordjes op hun dwarsliggers. Eén bordje hoort niet bij dit spoor.',da:'Skru skiltene fast på deres sveller. Ét skilt hører ikke til på dette spor.',sv:'Skruva fast skyltarna på deras sliprar. En skylt hör inte till det här spåret.',no:'Skru hvert skilt fast på riktig sville. Ett skilt hører ikke til på dette sporet.',es:'Atornilla cada placa en su durmiente. Una placa no va en esta vía.',it:'Avvita le targhette sulle loro traversine. Una targhetta non va su questo binario.',pt:'Parafuse as placas nos seus dormentes. Uma placa não é deste trilho.',fr:'Visse les plaques sur leurs traverses. Une plaque ne va pas sur cette voie.',fi:'Kiinnitä kyltit oikeisiin ratapölkkyihin. Yksi kyltti ei kuulu tälle radalle.'},
    pName:       {en:'Type the number for the tie with the arrow. Then bolt the plate that belongs here.',de:'Tipp die Zahl für die Schwelle mit dem Pfeil ein. Schraub dann das Schild an, das hierher gehört.',nl:'Typ het getal voor de dwarsligger met de pijl. Schroef dan het bordje vast dat hier hoort.',da:'Skriv tallet til svellen med pilen. Skru så det skilt fast, der hører til her.',sv:'Skriv talet för slipern med pilen. Skruva sedan fast skylten som hör hit.',no:'Skriv tallet for svillen med pilen. Skru så fast skiltet som hører til her.',es:'Escribe el número del durmiente con la flecha. Luego atornilla la placa que va aquí.',it:'Scrivi il numero della traversina con la freccia. Poi avvita la targhetta che va qui.',pt:'Digite o número do dormente com a seta. Depois parafuse a placa que é daqui.',fr:'Tape le nombre de la traverse avec la flèche. Puis visse la plaque qui va ici.',fi:'Kirjoita nuolella merkityn ratapölkyn luku. Kiinnitä sitten kyltti, joka kuuluu tänne.'},
    pOpen:       {en:'Bolt each plate onto the rail where it belongs. One plate does not belong here.',de:'Schraub jedes Schild an die Stelle der Schiene, wo es hingehört. Ein Schild gehört nicht hierher.',nl:'Schroef elk bordje op de rails waar het hoort. Eén bordje hoort hier niet.',da:'Skru hvert skilt fast på skinnen, hvor det hører til. Ét skilt hører ikke til her.',sv:'Skruva fast varje skylt på rälsen där den hör hemma. En skylt hör inte hit.',no:'Skru hvert skilt fast på skinnen der det hører hjemme. Ett skilt hører ikke til her.',es:'Atornilla cada placa en el riel donde va. Una placa no va aquí.',it:'Avvita ogni targhetta sul binario dove va. Una targhetta non va qui.',pt:'Parafuse cada placa no trilho, no lugar dela. Uma placa não é daqui.',fr:'Visse chaque plaque sur le rail, à sa place. Une plaque ne va pas ici.',fi:'Kiinnitä jokainen kyltti kiskoon oikeaan kohtaan. Yksi kyltti ei kuulu tänne.'},
    pHopOn:      {en:'The train is at {a}. It goes {k} ties on. Plant the red flag where it stops.',de:'Der Zug steht bei {a}. Er fährt {k} Schwellen weiter. Steck die rote Fahne dorthin, wo er hält.',nl:'De trein staat bij {a}. Hij rijdt {k} dwarsliggers verder. Zet de rode vlag waar hij stopt.',da:'Toget holder ved {a}. Det kører {k} sveller frem. Sæt det røde flag, hvor det stopper.',sv:'Tåget står vid {a}. Det kör {k} sliprar framåt. Sätt den röda flaggan där det stannar.',no:'Toget står ved {a}. Det kjører {k} sviller fram. Sett det røde flagget der det stopper.',es:'El tren está en el {a}. Avanza {k} durmientes. Pon la bandera roja donde se detiene.',it:'Il treno è sul numero {a}. Va avanti di {k} traversine. Pianta la bandierina rossa dove si ferma.',pt:'O trem está no {a}. Ele anda {k} dormentes para a frente. Coloque a bandeira vermelha onde ele para.',fr:'Le train est à {a}. Il avance de {k} traverses. Plante le drapeau rouge là où il s’arrête.',fi:'Juna on luvun {a} kohdalla. Se ajaa {k} ratapölkkyä eteenpäin. Pane punainen lippu siihen, mihin se pysähtyy.'},
    pHopBack:    {en:'The train is at {a}. It goes {k} ties back. Plant the red flag where it stops.',de:'Der Zug steht bei {a}. Er fährt {k} Schwellen zurück. Steck die rote Fahne dorthin, wo er hält.',nl:'De trein staat bij {a}. Hij rijdt {k} dwarsliggers terug. Zet de rode vlag waar hij stopt.',da:'Toget holder ved {a}. Det kører {k} sveller tilbage. Sæt det røde flag, hvor det stopper.',sv:'Tåget står vid {a}. Det kör {k} sliprar bakåt. Sätt den röda flaggan där det stannar.',no:'Toget står ved {a}. Det kjører {k} sviller tilbake. Sett det røde flagget der det stopper.',es:'El tren está en el {a}. Retrocede {k} durmientes. Pon la bandera roja donde se detiene.',it:'Il treno è sul numero {a}. Torna indietro di {k} traversine. Pianta la bandierina rossa dove si ferma.',pt:'O trem está no {a}. Ele volta {k} dormentes. Coloque a bandeira vermelha onde ele para.',fr:'Le train est à {a}. Il recule de {k} traverses. Plante le drapeau rouge là où il s’arrête.',fi:'Juna on luvun {a} kohdalla. Se peruuttaa {k} ratapölkkyä. Pane punainen lippu siihen, mihin se pysähtyy.'},
    pPosts:      {en:'Find the jump. Bolt the missing numbers onto the posts. Two plates do not belong.',de:'Finde die Sprunggröße. Schraub die fehlenden Zahlen an die Pfosten. Zwei Schilder gehören nicht dazu.',nl:'Zoek de sprong. Schroef de ontbrekende getallen op de paaltjes. Twee bordjes horen er niet bij.',da:'Find springet. Skru de manglende tal fast på pælene. To skilte hører ikke til.',sv:'Hitta hur stort hoppet är. Skruva fast talen som fattas på stolparna. Två skyltar hör inte till.',no:'Finn hvor stort hoppet er. Skru tallene som mangler fast på stolpene. To skilt hører ikke til.',es:'Encuentra el salto. Atornilla en los postes los números que faltan. Dos placas no van.',it:'Trova il salto. Avvita sui paletti i numeri che mancano. Due targhette non vanno.',pt:'Descubra o salto. Parafuse nos postes os números que faltam. Duas placas não são daqui.',fr:'Trouve le saut. Visse sur les poteaux les nombres qui manquent. Deux plaques ne vont pas.',fi:'Etsi hypyn koko. Kiinnitä puuttuvat luvut tolppiin. Kaksi kylttiä ei kuulu tähän.'},
    hintEmpty:   {en:'Bolt the plates that belong here onto their ties.',de:'Schraub die Schilder, die hierher gehören, an ihre Schwellen.',nl:'Schroef de bordjes die hier horen op hun dwarsliggers.',da:'Skru de skilte, der hører til her, fast på deres sveller.',sv:'Skruva fast skyltarna som hör hit på deras sliprar.',no:'Skru skiltene som hører til her, fast på riktig sville.',es:'Atornilla en sus durmientes las placas que van aquí.',it:'Avvita sulle traversine le targhette che vanno qui.',pt:'Parafuse nos dormentes as placas que são daqui.',fr:'Visse sur leurs traverses les plaques qui vont ici.',fi:'Kiinnitä tänne kuuluvat kyltit oikeisiin ratapölkkyihin.'},
    hintEmptyRail:{en:'Bolt the plates that belong here onto the rail.',de:'Schraub die Schilder, die hierher gehören, an die Schiene.',nl:'Schroef de bordjes die hier horen op de rails.',da:'Skru de skilte, der hører til her, fast på skinnen.',sv:'Skruva fast skyltarna som hör hit på rälsen.',no:'Skru skiltene som hører til her, fast på skinnen.',es:'Atornilla en el riel las placas que van aquí.',it:'Avvita sul binario le targhette che vanno qui.',pt:'Parafuse no trilho as placas que são daqui.',fr:'Visse sur le rail les plaques qui vont ici.',fi:'Kiinnitä tänne kuuluvat kyltit kiskoon.'},
    hintEmptyPosts:{en:'Bolt a plate onto every empty post.',de:'Schraub an jeden leeren Pfosten ein Schild.',nl:'Schroef een bordje op elk leeg paaltje.',da:'Skru et skilt fast på hver tom pæl.',sv:'Skruva fast en skylt på varje tom stolpe.',no:'Skru et skilt fast på hver tomme stolpe.',es:'Atornilla una placa en cada poste vacío.',it:'Avvita una targhetta su ogni paletto vuoto.',pt:'Parafuse uma placa em cada poste vazio.',fr:'Visse une plaque sur chaque poteau vide.',fi:'Kiinnitä kyltti jokaiseen tyhjään tolppaan.'},
    hintFlag:    {en:'Plant the red flag first.',de:'Steck zuerst die rote Fahne auf eine Schwelle.',nl:'Zet eerst de rode vlag.',da:'Sæt det røde flag først.',sv:'Sätt den röda flaggan först.',no:'Sett det røde flagget først.',es:'Primero pon la bandera roja.',it:'Prima pianta la bandierina rossa.',pt:'Primeiro coloque a bandeira vermelha.',fr:'Plante d’abord le drapeau rouge.',fi:'Pane ensin punainen lippu paikalleen.'},
    hintType:    {en:'Type the number for the tie with the arrow.',de:'Tipp die Zahl für die Schwelle mit dem Pfeil ein.',nl:'Typ het getal voor de dwarsligger met de pijl.',da:'Skriv tallet til svellen med pilen.',sv:'Skriv talet för slipern med pilen.',no:'Skriv tallet for svillen med pilen.',es:'Escribe el número del durmiente con la flecha.',it:'Scrivi il numero della traversina con la freccia.',pt:'Digite o número do dormente com a seta.',fr:'Tape le nombre de la traverse avec la flèche.',fi:'Kirjoita nuolella merkityn ratapölkyn luku.'},
    hintCountOn: {en:'Count on from the station, one tie at a time.',de:'Zähl vom Bahnhof aus weiter, Schwelle für Schwelle.',nl:'Tel verder vanaf het station, dwarsligger voor dwarsligger.',da:'Tæl videre fra stationen, én svelle ad gangen.',sv:'Räkna vidare från stationen, en sliper i taget.',no:'Tell videre fra stasjonen, én sville om gangen.',es:'Cuenta desde la estación, un durmiente a la vez.',it:'Conta dalla stazione in avanti, una traversina alla volta.',pt:'Conte a partir da estação, um dormente de cada vez.',fr:'Compte à partir de la gare, une traverse à la fois.',fi:'Laske asemalta eteenpäin, yksi ratapölkky kerrallaan.'},
    hintHop:     {en:'One puff for each hop — the start tie doesn’t count.',de:'Ein Dampfwölkchen für jeden Sprung – die Startschwelle zählt nicht mit.',nl:'Eén rookwolkje voor elke sprong — de startdwarsligger telt niet mee.',da:'Én røgsky for hvert hop – startsvellen tæller ikke med.',sv:'Ett rökmoln för varje hopp – startslipern räknas inte.',no:'Én røyksky for hvert hopp – startsvillen teller ikke med.',es:'Una nube de humo por cada salto: el durmiente de salida no cuenta.',it:'Una nuvoletta di fumo per ogni salto: la traversina di partenza non conta.',pt:'Uma nuvem de fumaça para cada salto: o dormente de partida não conta.',fr:'Un petit nuage pour chaque saut : la traverse de départ ne compte pas.',fi:'Yksi savupilvi jokaisesta hypystä – lähtöpölkkyä ei lasketa.'},
    hintStep:    {en:'Every jump is the same size. How big is it?',de:'Jeder Sprung ist gleich groß. Wie groß ist er?',nl:'Elke sprong is even groot. Hoe groot is hij?',da:'Hvert spring er lige stort. Hvor stort er det?',sv:'Varje hopp är lika stort. Hur stort är det?',no:'Hvert hopp er like stort. Hvor stort er det?',es:'Todos los saltos son del mismo tamaño. ¿De cuánto es?',it:'Tutti i salti sono uguali. Di quanto è ogni salto?',pt:'Todos os saltos são do mesmo tamanho. De quanto é?',fr:'Chaque saut a la même taille. Il fait combien ?',fi:'Jokainen hyppy on yhtä suuri. Kuinka suuri se on?'},
    hintStepShow:{en:'Every jump is {s}. Which plate breaks it?',de:'Jeder Sprung ist {s} groß. Welches Schild passt nicht?',nl:'Elke sprong is {s}. Welk bordje klopt niet?',da:'Hvert spring er {s}. Hvilket skilt passer ikke?',sv:'Varje hopp är {s}. Vilken skylt passar inte?',no:'Hvert hopp er {s}. Hvilket skilt passer ikke?',es:'Cada salto es de {s}. ¿Qué placa no encaja?',it:'Ogni salto è di {s}. Quale targhetta non va?',pt:'Cada salto é de {s}. Qual placa não encaixa?',fr:'Chaque saut fait {s}. Quelle plaque ne va pas ?',fi:'Jokainen hyppy on {s}. Mikä kyltti ei sovi?'},
    hintFromNearest:{en:'Count on from {m} to the arrow.',de:'Zähl von {m} bis zum Pfeil weiter.',nl:'Tel verder van {m} tot de pijl.',da:'Tæl videre fra {m} hen til pilen.',sv:'Räkna vidare från {m} fram till pilen.',no:'Tell videre fra {m} bort til pilen.',es:'Cuenta desde el {m} hasta la flecha.',it:'Conta da {m} fino alla freccia.',pt:'Conte a partir do {m} até a seta.',fr:'Compte à partir de {m} jusqu’à la flèche.',fi:'Laske luvusta {m} eteenpäin nuoleen asti.'},
    hintFind:    {en:'Find the tie that says {n}.',de:'Such die Schwelle, auf der {n} steht.',nl:'Zoek de dwarsligger met {n}.',da:'Find svellen, hvor der står {n}.',sv:'Hitta slipern där det står {n}.',no:'Finn svillen der det står {n}.',es:'Busca el durmiente que tiene el {n}.',it:'Trova la traversina con il {n}.',pt:'Encontre o dormente que mostra o {n}.',fr:'Trouve la traverse où il est écrit {n}.',fi:'Etsi ratapölkky, jossa lukee {n}.'},
    hintFindRail:{en:'Count the faint ties: where is {n}?',de:'Zähl die blassen Schwellen: Wo ist {n}?',nl:'Tel de vage dwarsliggers: waar is {n}?',da:'Tæl de lyse sveller: Hvor er {n}?',sv:'Räkna de bleka sliprarna: var är {n}?',no:'Tell de svake svillene: Hvor er {n}?',es:'Cuenta los durmientes tenues: ¿dónde está el {n}?',it:'Conta le traversine chiare: dov’è il {n}?',pt:'Conte os dormentes clarinhos: onde está o {n}?',fr:'Compte les traverses pâles : où est {n} ?',fi:'Laske haaleat ratapölkyt: missä on {n}?'},
    hintNowhere: {en:'No tie here says {n}. Leave that plate on the trolley.',de:'Keine Schwelle hier ist die {n}. Lass dieses Schild auf dem Wagen.',nl:'Geen dwarsligger hier is {n}. Laat dat bordje op de kar liggen.',da:'Ingen svelle her er {n}. Lad det skilt blive på vognen.',sv:'Ingen sliper här är {n}. Låt den skylten ligga kvar på vagnen.',no:'Ingen sville her er {n}. La det skiltet ligge igjen på vogna.',es:'Ningún durmiente de aquí es el {n}. Deja esa placa en el carrito.',it:'Qui nessuna traversina è il {n}. Lascia quella targhetta sul carrello.',pt:'Nenhum dormente daqui é o {n}. Deixe essa placa no carrinho.',fr:'Aucune traverse ici n’est {n}. Laisse cette plaque sur le chariot.',fi:'Mikään ratapölkky tässä ei ole {n}. Jätä se kyltti vaunuun.'},
    okTies:      {en:'All aboard! {a} and {b} are in their places.',de:'Alle einsteigen! {a} und {b} sind an ihrem Platz.',nl:'Instappen! {a} en {b} staan op hun plek.',da:'Alle mand om bord! {a} og {b} er på plads.',sv:'Alla ombord! {a} och {b} sitter på sina platser.',no:'Alle om bord! {a} og {b} er på plass.',es:'¡Todos a bordo! El {a} y el {b} están en su lugar.',it:'Tutti in carrozza! Il {a} e il {b} sono al loro posto.',pt:'Todos a bordo! O {a} e o {b} estão no lugar certo.',fr:'En voiture ! {a} et {b} sont à leur place.',fi:'Kaikki kyytiin! {a} ja {b} ovat paikoillaan.'},
    okName:      {en:'All aboard! {a} is in its place, and the arrow tie is {n}.',de:'Alle einsteigen! {a} ist an seinem Platz, und die Pfeilschwelle ist {n}.',nl:'Instappen! {a} staat op zijn plek, en de dwarsligger met de pijl is {n}.',da:'Alle mand om bord! {a} er på plads, og svellen med pilen er {n}.',sv:'Alla ombord! {a} sitter på sin plats, och slipern med pilen är {n}.',no:'Alle om bord! {a} er på plass, og svillen med pilen er {n}.',es:'¡Todos a bordo! El {a} está en su lugar y el durmiente de la flecha es el {n}.',it:'Tutti in carrozza! Il {a} è al suo posto e la traversina con la freccia è il {n}.',pt:'Todos a bordo! O {a} está no lugar certo, e o dormente da seta é o {n}.',fr:'En voiture ! {a} est à sa place, et la traverse de la flèche, c’est {n}.',fi:'Kaikki kyytiin! {a} on paikallaan, ja nuolen ratapölkky on {n}.'},
    okOpen:      {en:'All aboard! {a} and {b} are in their places on the rail.',de:'Alle einsteigen! {a} und {b} sind an ihrem Platz auf der Schiene.',nl:'Instappen! {a} en {b} staan op hun plek op de rails.',da:'Alle mand om bord! {a} og {b} er på plads på skinnen.',sv:'Alla ombord! {a} och {b} sitter på sina platser på rälsen.',no:'Alle om bord! {a} og {b} er på plass på skinnen.',es:'¡Todos a bordo! El {a} y el {b} están en su lugar en el riel.',it:'Tutti in carrozza! Il {a} e il {b} sono al loro posto sul binario.',pt:'Todos a bordo! O {a} e o {b} estão no lugar certo do trilho.',fr:'En voiture ! {a} et {b} sont à leur place sur le rail.',fi:'Kaikki kyytiin! {a} ja {b} ovat paikoillaan kiskolla.'},
    okHop:       {en:'{eq} — all aboard!',de:'{eq} – alle einsteigen!',nl:'{eq} — instappen!',da:'{eq} – alle mand om bord!',sv:'{eq} – alla ombord!',no:'{eq} – alle om bord!',es:'{eq}: ¡todos a bordo!',it:'{eq}: tutti in carrozza!',pt:'{eq}: todos a bordo!',fr:'{eq} : en voiture !',fi:'{eq} – kaikki kyytiin!'},
    okUp:        {en:'The track goes up by {s} every time!',de:'Die Strecke steigt jedes Mal um {s}!',nl:'Het spoor gaat elke keer {s} omhoog!',da:'Sporet stiger med {s} hver gang!',sv:'Talen ökar med {s} varje gång!',no:'Tallene øker med {s} hver gang!',es:'¡La vía sube de {s} en {s}!',it:'Il binario sale di {s} ogni volta!',pt:'O trilho sobe de {s} em {s}!',fr:'La voie monte de {s} à chaque fois !',fi:'Luvut kasvavat {s} kerrallaan!'},
    okDown:      {en:'The track goes down by {s} every time!',de:'Die Strecke fällt jedes Mal um {s}!',nl:'Het spoor gaat elke keer {s} omlaag!',da:'Sporet falder med {s} hver gang!',sv:'Talen minskar med {s} varje gång!',no:'Tallene minker med {s} hver gang!',es:'¡La vía baja de {s} en {s}!',it:'Il binario scende di {s} ogni volta!',pt:'O trilho desce de {s} em {s}!',fr:'La voie descend de {s} à chaque fois !',fi:'Luvut pienenevät {s} kerrallaan!'},
    check:       {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setTrack:    {en:'Track',de:'Strecke',nl:'Spoor',da:'Spor',sv:'Spår',no:'Spor',es:'Vía',it:'Binario',pt:'Trilho',fr:'Voie',fi:'Rata'},
    tHops:       {en:'Hops',de:'Sprünge',nl:'Sprongen',da:'Hop',sv:'Hopp',no:'Hopp',es:'Saltos',it:'Salti',pt:'Saltos',fr:'Sauts',fi:'Hypyt'},
    tSpots:      {en:'Find the spot',de:'Platz finden',nl:'Vind de plek',da:'Find pladsen',sv:'Hitta platsen',no:'Finn plassen',es:'Encuentra el lugar',it:'Trova il posto',pt:'Encontre o lugar',fr:'Trouve la place',fi:'Etsi paikka'},
    tPosts:      {en:'Mileposts',de:'Pfosten',nl:'Paaltjes',da:'Pæle',sv:'Stolpar',no:'Stolper',es:'Postes',it:'Paletti',pt:'Postes',fr:'Poteaux',fi:'Tolpat'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    n50:         {en:'To 50',de:'Bis 50',nl:'Tot 50',da:'Op til 50',sv:'Upp till 50',no:'Til 50',es:'Hasta 50',it:'Fino a 50',pt:'Até 50',fr:'Jusqu’à 50',fi:'50 asti'},
    n120:        {en:'To 120',de:'Bis 120',nl:'Tot 120',da:'Op til 120',sv:'Upp till 120',no:'Til 120',es:'Hasta 120',it:'Fino a 120',pt:'Até 120',fr:'Jusqu’à 120',fi:'120 asti'},
    ariaTie:     {en:'Tie {i}: empty',de:'Schwelle {i}: leer',nl:'Dwarsligger {i}: leeg',da:'Svelle {i}: tom',sv:'Sliper {i}: tom',no:'Sville {i}: tom',es:'Durmiente {i}: vacío',it:'Traversina {i}: vuota',pt:'Dormente {i}: vazio',fr:'Traverse {i} : vide',fi:'Ratapölkky {i}: tyhjä'},
    ariaTieV:    {en:'Tie {i}: {v}',de:'Schwelle {i}: {v}',nl:'Dwarsligger {i}: {v}',da:'Svelle {i}: {v}',sv:'Sliper {i}: {v}',no:'Sville {i}: {v}',es:'Durmiente {i}: {v}',it:'Traversina {i}: {v}',pt:'Dormente {i}: {v}',fr:'Traverse {i} : {v}',fi:'Ratapölkky {i}: {v}'},
    ariaPost:    {en:'Post {i}: empty',de:'Pfosten {i}: leer',nl:'Paaltje {i}: leeg',da:'Pæl {i}: tom',sv:'Stolpe {i}: tom',no:'Stolpe {i}: tom',es:'Poste {i}: vacío',it:'Paletto {i}: vuoto',pt:'Poste {i}: vazio',fr:'Poteau {i} : vide',fi:'Tolppa {i}: tyhjä'},
    ariaPlate:   {en:'Plate {v}',de:'Schild {v}',nl:'Bordje {v}',da:'Skilt {v}',sv:'Skylt {v}',no:'Skilt {v}',es:'Placa {v}',it:'Targhetta {v}',pt:'Placa {v}',fr:'Plaque {v}',fi:'Kyltti {v}'},
    ariaFlag:    {en:'Red flag',de:'Rote Fahne',nl:'Rode vlag',da:'Rødt flag',sv:'Röd flagga',no:'Rødt flagg',es:'Bandera roja',it:'Bandierina rossa',pt:'Bandeira vermelha',fr:'Drapeau rouge',fi:'Punainen lippu'},
    ariaRail:    {en:'Rail from {a} to {b}',de:'Schiene von {a} bis {b}',nl:'Rails van {a} tot {b}',da:'Skinne fra {a} til {b}',sv:'Räls från {a} till {b}',no:'Skinne fra {a} til {b}',es:'Riel del {a} al {b}',it:'Binario da {a} a {b}',pt:'Trilho do {a} ao {b}',fr:'Rail de {a} à {b}',fi:'Kisko luvusta {a} lukuun {b}'},
    ariaArrow:   {en:'The tie with the arrow',de:'Die Schwelle mit dem Pfeil',nl:'De dwarsligger met de pijl',da:'Svellen med pilen',sv:'Slipern med pilen',no:'Svillen med pilen',es:'El durmiente con la flecha',it:'La traversina con la freccia',pt:'O dormente com a seta',fr:'La traverse avec la flèche',fi:'Nuolella merkitty ratapölkky'},
    ariaDel:     {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    ariaDone:    {en:'Done',de:'Fertig',nl:'Klaar',da:'Færdig',sv:'Klar',no:'Ferdig',es:'Listo',it:'Fatto',pt:'Pronto',fr:'Terminé',fi:'Valmis'}
  },/*STRINGS-END*/

  defaults: { track: 'spots', numbers: '120' },
  settings: [
    { key: 'track', type: 'choice', labelKey: 'setTrack', options: [{ value: 'hops', labelKey: 'tHops' }, { value: 'spots', labelKey: 'tSpots' }, { value: 'posts', labelKey: 'tPosts' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '50', labelKey: 'n50' }, { value: '120', labelKey: 'n120' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._sel = null; this._kp = false; this._tray = [];
    injectLampCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') LCSPictures.load('vehicles').then(function (th) { self._pics.vehicles = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return CountingLampCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return CountingLampCore.levelOf(this._setting('numbers')); },
  _track: function () { return CountingLampCore.trackOf(this._setting('track')); },
  _key: function () { return this._track() + '.' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = CountingLampCore.ids(this._level(), this._track()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = CountingLampCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(this._level(), this._track(), Math.random, prev).order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._promptText(C.round(this._level(), this._track(), idx)) }; this._pa = pa;
    return {
      id: 'lamp.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    if (r.track === 'hops') return this._t(r.hop.dir > 0 ? 'pHopOn' : 'pHopBack', { a: r.hop.startValue, k: r.hop.k });
    if (r.posts) return this._t('pPosts');
    if (r.open) return this._t('pOpen');
    return this._t(r.name ? 'pName' : 'pTies');
  },
  _start: function (idx, pos) {
    var C = CountingLampCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._sel = null; this._kp = false; this._busy = false;
    this.st = C.newState(C.round(this._level(), this._track(), idx));
    this._tray = C.tray(this.st.r, Math.random);
    var line = this._promptText(this.st.r); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
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
    var wrap = api.el('div', 'lm-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="lm-track"></div><div class="lm-trolley" role="group"></div><div class="lm-keypad" role="group"></div><div class="lm-foot"></div><p class="lm-note" aria-live="polite"></p>';
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
  /* the geometry of this width */
  _geo: function () {
    var C = CountingLampCore, W = this._width(), L = C.layout(W), r = this.st.r, posts = !!r.posts;
    var pad = L.wide ? 30 : L.tiny ? 19 : 22, n = posts ? 5 : C.TIES - 1, pitch = (W - 2 * pad) / n;
    var eng = L.wide ? 96 : 64, puff = 26, railY = puff + eng + 6;
    var stagger = !L.wide && !posts && !r.open;
    var seatW = r.open ? (L.tiny ? 48 : 52) : posts ? Math.min(L.wide ? 68 : 52, pitch - 6) : stagger ? Math.min(52, 2 * pitch - 6, Math.floor((pad + 2 * pitch - 2) * 2 / 3)) :   /* a station plate held inside the card never reaches tie 2 in its row */ Math.min(52, pitch - 5), seatH = 44;   /* every seat a ≥ 44 px target */
    var rowA = railY + 22, rowB = rowA + seatH + 6, H = (stagger || r.open ? rowB : rowA) + seatH + (posts ? 40 : 10);   /* the open rail keeps a second row for a plate dropped close to another */
    return { W: W, L: L, pad: pad, pitch: pitch, n: n, eng: eng, puff: puff, railY: railY, stagger: stagger, seatW: seatW, seatH: seatH, rowA: rowA, rowB: rowB, H: H,
      x: function (i) { return pad + i * pitch; }, rowY: function (i) { return stagger && i % 2 ? rowB : rowA; } };
  },
  _pic: function (size) {
    var th = this._pics.vehicles; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, 'train', this._loc(), { size: size }); im.className = 'lm-engine-pic'; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  /* where the engine stands now (a tie / post index, or a rail fraction for the open rail) */
  _enginePlace: function () {
    var st = this.st, r = st.r, v = this._view;
    if (st.done && v.crossed) return r.posts ? 5 : r.open ? 1 : (r.hop && r.hop.dir < 0 ? 0 : CountingLampCore.TIES - 1);
    if (st.run && v.step != null) {
      var c = st.run.counted;
      if (r.open) return st.run.stop != null ? st.clamps[st.run.stop] : 1;
      if (v.step === 0) return r.hop ? r.hop.start : 0;
      return c[Math.min(v.step, c.length) - 1];
    }
    return r.hop ? r.hop.start : 0;
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = CountingLampCore, st = this.st, r = st.r, g = this._geo(), v = this._view, self = this, i;
    this._wrap.className = 'lm-wrap ' + (g.L.wide ? 'is-wide' : 'is-narrow') + (g.L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    var track = this._q('.lm-track'); track.innerHTML = ''; track.style.height = g.H + 'px';
    var running = st.run && v.step != null, upto = running ? (this.FAST || v.step >= 99 ? 99 : v.step) : 0;
    var shown = running ? st.run.counted.slice(0, upto) : [];
    /* ---- the SVG: hills, rails (torn until the track is right), ties, posts, the flag, puffs, arcs, ghost ties ---- */
    var f = function (x) { return x.toFixed(1); }, s = '<svg class="lm-svg" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + ' ' + g.H + '" aria-hidden="true">';
    s += '<path d="M0 ' + f(g.railY - 10) + ' Q' + f(g.W * 0.25) + ' ' + f(g.puff + 20) + ' ' + f(g.W * 0.5) + ' ' + f(g.railY - 30) + ' T' + g.W + ' ' + f(g.railY - 18) + ' V' + f(g.railY + 4) + ' H0Z" class="lm-hill"/>';
    var x0 = g.x(0), x1 = g.x(g.n), torn = !(st.done && v.crossed);
    var gaps = r.posts ? [] : torn ? [[0.24, 0.31], [0.62, 0.69]] : [];
    [-6, 6].forEach(function (dy) {
      var y = g.railY + dy, segs = [], at = x0 - 8;
      gaps.forEach(function (gp) { var a = x0 + (x1 - x0) * gp[0], b = x0 + (x1 - x0) * gp[1]; segs.push([at, a]); at = b; });
      segs.push([at, x1 + 8]);
      segs.forEach(function (sg) { s += '<line x1="' + f(sg[0]) + '" y1="' + y + '" x2="' + f(sg[1]) + '" y2="' + y + '" class="lm-rail"/>'; });
      gaps.forEach(function (gp) { var a = x0 + (x1 - x0) * gp[0], b = x0 + (x1 - x0) * gp[1]; s += '<path d="M' + f(a) + ' ' + y + 'l4 ' + (dy < 0 ? -5 : 5) + ' M' + f(b) + ' ' + y + 'l-4 ' + (dy < 0 ? -5 : 5) + '" class="lm-rail is-bent"/>'; });
    });
    if (!r.open) for (i = 0; i <= g.n; i++) s += '<rect x="' + f(g.x(i) - (g.L.wide ? 7 : 5)) + '" y="' + (g.railY - 14) + '" width="' + (g.L.wide ? 14 : 10) + '" height="28" rx="2" class="lm-tie"/>';
    if (r.posts) for (i = 0; i <= g.n; i++) s += '<line x1="' + f(g.x(i)) + '" y1="' + (g.railY + 12) + '" x2="' + f(g.x(i)) + '" y2="' + g.rowA + '" class="lm-pole"/>';
    if (r.open) {
      s += '<rect x="' + f(x0 - 6) + '" y="' + (g.railY - 14) + '" width="12" height="28" rx="2" class="lm-tie"/><rect x="' + f(x1 - 6) + '" y="' + (g.railY - 14) + '" width="12" height="28" rx="2" class="lm-tie"/>';
      /* ghost ties the lamp lays, one per step, counted from the station */
      if (running || st.done) {
        var gs = C.ghostStep(r), span = r.open.b - r.open.a, nG = Math.round(span / gs), lim = st.done ? nG : (st.show >= 2 ? nG : Math.round(((st.run.stop != null ? st.clamps[st.run.stop] : 1)) * nG));
        var every = g.L.wide ? (nG > 20 ? 2 : 1) * 2 : 5;
        for (i = 1; i < nG && i <= lim; i++) {
          var gx = x0 + (x1 - x0) * i / nG; s += '<rect x="' + f(gx - 2) + '" y="' + (g.railY - 10) + '" width="4" height="20" class="lm-ghost"/>';
          if (st.show >= 2 && i % every === 0) s += '<text x="' + f(gx) + '" y="' + (g.railY - 16) + '" class="lm-ghostnum">' + (r.open.a + i * gs) + '</text>';
        }
      }
    }
    /* hops: the puffs, one per hop, numbered */
    if (r.hop && running) shown.forEach(function (t, k) { s += '<circle cx="' + f(g.x(t)) + '" cy="' + (g.puff / 2 + 2) + '" r="' + (g.puff / 2 - 1) + '" class="lm-puff"/><text x="' + f(g.x(t)) + '" y="' + (g.puff / 2 + 7) + '" class="lm-puffnum">' + (k + 1) + '</text>'; });
    /* hops: the STOP flag */
    if (r.hop && st.flag != null) { var fx = g.x(st.flag); s += '<g class="lm-flag' + (running && !st.run.ok && v.step >= 99 ? ' is-wobble' : '') + '"><line x1="' + f(fx) + '" y1="' + (g.railY - 12) + '" x2="' + f(fx) + '" y2="' + (g.railY - 62) + '" class="lm-flagpole"/><path d="M' + f(fx) + ' ' + (g.railY - 62) + 'h26l-7 9l7 9h-26z" class="lm-flagcloth"/></g>'; }
    /* posts: each jump's own size, as the engine jumps */
    if (r.posts && (running || st.done)) {
      var jumps = st.run.jumps || [], jn = st.done ? jumps.length : upto;
      for (i = 0; i < jumps.length && i < jn; i++) {
        var ax = g.x(i), bx = g.x(i + 1), ay = g.rowA + g.seatH + 4, wrong = st.run.stop === i + 1 || jumps[i] == null;
        s += '<path d="M' + f(ax) + ' ' + ay + ' Q' + f((ax + bx) / 2) + ' ' + (ay + 30) + ' ' + f(bx) + ' ' + ay + '" class="lm-arc' + (wrong ? ' is-wrong' : '') + '"/>';
        if (jumps[i] != null) s += '<text x="' + f((ax + bx) / 2) + '" y="' + (ay + 26) + '" class="lm-arcnum' + (wrong ? ' is-wrong' : '') + '">' + (jumps[i] > 0 ? '+' : '−') + Math.abs(jumps[i]) + '</text>';
      }
      if (st.show >= 2) for (i = 0; i < 5; i++) { var pa = r.posts.blanks.indexOf(i) < 0 && r.posts.blanks.indexOf(i + 1) < 0; if (pa && !(i < jn)) { var px = g.x(i), qx = g.x(i + 1), py = g.rowA + g.seatH + 4; s += '<path d="M' + f(px) + ' ' + py + ' Q' + f((px + qx) / 2) + ' ' + (py + 30) + ' ' + f(qx) + ' ' + py + '" class="lm-arc is-help"/><text x="' + f((px + qx) / 2) + '" y="' + (py + 26) + '" class="lm-arcnum">' + (r.posts.step > 0 ? '+' : '−') + Math.abs(r.posts.step) + '</text>'; } }
    }
    track.innerHTML = s + '</svg>';
    /* ---- the lamp's numbers on the rail ---- */
    var lampTies = running ? (st.show >= 2 && v.step >= 99 ? C.lampTies(st) : shown.filter(function (t) { return C.lampTies(st).indexOf(t) >= 0 || st.show < 2; })) : [];
    /* ---- the engine ---- */
    var place = this._enginePlace(), ex = r.open ? x0 + (x1 - x0) * place : g.x(place);
    var eng = document.createElement('span'); eng.className = 'lm-engine' + (r.hop && r.hop.dir < 0 ? ' is-back' : '');
    eng.style.width = eng.style.height = g.eng + 'px'; eng.style.left = (ex - g.eng / 2) + 'px'; eng.style.top = (g.railY - 8 - g.eng) + 'px';
    var pic = this._pic(g.eng); if (pic) eng.appendChild(pic);
    var beam = document.createElement('span'); beam.className = 'lm-beam' + (running || st.done ? ' is-on' : ''); eng.appendChild(beam);
    track.appendChild(eng);
    /* ---- the seats (ties / posts) ---- */
    var seatEl = function (i, x, y, w) { var b = document.createElement('button'); b.type = 'button'; b.style.left = Math.max(0, Math.min(g.W - w, x - w / 2)) + 'px'; b.style.top = y + 'px'; b.style.width = w + 'px'; b.style.height = g.seatH + 'px'; return b; };
    if (!r.open) for (i = 0; i <= g.n; i++) (function (i) {
      var x = g.x(i), y = g.rowY(i), printed = r.printed.indexOf(i) >= 0;
      if (r.hop) {
        var b = seatEl(i, x, y, g.seatW); b.setAttribute('data-k', 'tie-' + i); b.setAttribute('data-tie', i);
        b.className = 'lm-seat' + (printed ? ' is-printed' : '') + (lampTies.indexOf(i) >= 0 && !printed ? ' is-lit' : '');
        if (printed) b.textContent = String(C.tieValue(r, i)); else if (lampTies.indexOf(i) >= 0) b.textContent = String(C.tieValue(r, i));
        b.setAttribute('aria-label', printed ? self._t('ariaTieV', { i: i + 1, v: C.tieValue(r, i) }) : self._t('ariaTie', { i: i + 1 }));
        b.disabled = st.done || i === r.hop.start;
        b.addEventListener('click', function () { self._plant(i); });
        track.appendChild(b); return;
      }
      var isName = r.name && i === r.name.tie, blank = r.posts ? r.posts.blanks.indexOf(i) >= 0 : !printed;
      var b2 = seatEl(i, x, y, g.seatW); b2.setAttribute('data-k', 'seat-' + i); b2.setAttribute('data-seat', i);
      var plate = isName ? (st.typed ? +st.typed : null) : st.seats[i], right = running && st.run.right.indexOf(i) >= 0 && (self.FAST || v.step >= 99 || shown.indexOf(i) >= 0), wrong = running && st.run.stop === i && (self.FAST || v.step >= 99);
      var lamp = blank && !r.posts && !isName && lampTies.indexOf(i) >= 0 && plate == null;
      b2.className = 'lm-seat' + (r.posts ? ' is-post' : '') + (!blank ? ' is-printed' : '') + (plate != null ? ' is-full' : '') + (isName ? ' is-name' : '') + (right ? ' is-right' : '') + (wrong ? ' is-wrong' : '') + (lamp ? ' is-lit' : '') + (self._hot === i ? ' is-hot' : '') + (self._sel != null && blank && !isName && plate == null ? ' is-open' : '');
      b2.textContent = !blank ? String(C.tieValue(r, i)) : plate != null ? String(plate) : lamp ? String(C.tieValue(r, i)) : isName ? '?' : '';
      if (wrong && !isName && !r.posts) { var tg = document.createElement('span'); tg.className = 'lm-tag'; tg.textContent = String(C.tieValue(r, i)); b2.appendChild(tg); }
      b2.setAttribute('aria-label', isName ? self._t('ariaArrow') + (st.typed ? ': ' + st.typed : '') : !blank ? self._t('ariaTieV', { i: i + 1, v: C.tieValue(r, i) }) : plate != null ? self._t('ariaTieV', { i: i + 1, v: plate }) : self._t(r.posts ? 'ariaPost' : 'ariaTie', { i: i + 1 }));
      b2.disabled = st.done || !blank;
      if (blank && !st.done) {
        b2.addEventListener('click', function () { if (self._dragged) return; self._seatTap(i); });
        if (plate != null && !isName) b2.addEventListener('pointerdown', function (e) { self._dragStart(e, plate); });
      }
      track.appendChild(b2);
      if (isName) { var ar = document.createElement('span'); ar.className = 'lm-arrow'; ar.style.left = x + 'px'; ar.style.top = (g.railY - 40) + 'px'; track.appendChild(ar); }
    })(i);
    /* ---- the open rail: the station plates, the rail strip, the clamped plates ---- */
    if (r.open) {
      [[0, r.open.a], [g.n, r.open.b]].forEach(function (pr) { var b = seatEl(pr[0], g.x(pr[0]), g.rowA, g.seatW); b.className = 'lm-seat is-printed'; b.textContent = String(pr[1]); b.disabled = true; b.setAttribute('aria-label', String(pr[1])); track.appendChild(b); });
      var rail = document.createElement('button'); rail.type = 'button'; rail.className = 'lm-rail-zone' + (this._sel != null ? ' is-open' : '');
      rail.setAttribute('data-k', 'rail'); rail.setAttribute('aria-label', this._t('ariaRail', { a: r.open.a, b: r.open.b }));
      rail.style.left = (x0 + 4) + 'px'; rail.style.width = (x1 - x0 - 8) + 'px'; rail.style.top = (g.railY - 24) + 'px'; rail.style.height = '48px'; rail.disabled = st.done;
      rail.addEventListener('click', function (e) { if (self._dragged) return; var bb = rail.getBoundingClientRect(); self._railTap((e.clientX - bb.left + 4) / (x1 - x0)); });
      track.appendChild(rail);
      var lastRight = [x0 + g.seatW / 2, -1e9], stationL = x1 - g.seatW / 2;   /* the station plates sit in the first row */
      Object.keys(st.clamps).sort(function (a, b) { return st.clamps[a] - st.clamps[b]; }).forEach(function (k) {
        var val = +k, cx = x0 + (x1 - x0) * st.clamps[k], w = Math.min(g.seatW, 52), row = cx - w / 2 < lastRight[0] + 4 || cx + w / 2 > stationL - 4 ? 1 : 0; lastRight[row] = cx + w / 2;
        var right = running && st.run.right.indexOf(val) >= 0 && (self.FAST || v.step >= 99), wrong = running && st.run.stop === val && (self.FAST || v.step >= 99);
        var pb = seatEl(0, cx, row ? g.rowB : g.rowA, w); pb.className = 'lm-seat is-full is-clamp' + (right ? ' is-right' : '') + (wrong ? ' is-wrong' : '');
        pb.setAttribute('data-k', 'clamp-' + val); pb.setAttribute('aria-label', self._t('ariaPlate', { v: val })); pb.textContent = String(val); pb.disabled = st.done;
        if (wrong) { var tg = document.createElement('span'); tg.className = 'lm-tag'; tg.textContent = String(Math.round(st.run.stopValue)); pb.appendChild(tg); }
        pb.addEventListener('click', function () { if (self._dragged) return; self._pickUp(val); });
        pb.addEventListener('pointerdown', function (e) { self._dragStart(e, val); });
        track.appendChild(pb);
      });
    }
    /* ---- the trolley ---- */
    var trolley = this._q('.lm-trolley'); trolley.innerHTML = '';
    if (r.hop) {
      if (st.flag == null && !st.done) { var fb = this.api.el('button', 'lm-plate is-flag' + (this._sel === 'flag' ? ' is-sel' : '')); fb.type = 'button'; fb.setAttribute('data-k', 'flag'); fb.setAttribute('aria-label', this._t('ariaFlag')); fb.innerHTML = '<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><line x1="7" y1="3" x2="7" y2="28" stroke="#3A2E1F" stroke-width="3"/><path d="M7 3h18l-5 6l5 6h-18z" fill="#D9412B"/></svg>'; fb.addEventListener('click', function () { if (self._dragged) return; self._sel = self._sel === 'flag' ? null : 'flag'; self._paint(); }); fb.addEventListener('pointerdown', function (e) { self._dragStart(e, 'flag'); }); trolley.appendChild(fb); }
    } else {
      this._tray.forEach(function (val) {
        var on = r.open ? st.clamps[val] != null : C.where(st, val) != null; if (on) return;
        var pb = self.api.el('button', 'lm-plate' + (self._sel === val ? ' is-sel' : '')); pb.type = 'button'; pb.setAttribute('data-k', 'plate-' + val); pb.setAttribute('aria-label', self._t('ariaPlate', { v: val })); pb.setAttribute('aria-pressed', self._sel === val ? 'true' : 'false');
        pb.textContent = String(val); pb.disabled = st.done;
        pb.addEventListener('click', function () { if (self._dragged) return; self._sel = self._sel === val ? null : val; self._paint(); });
        pb.addEventListener('pointerdown', function (e) { self._dragStart(e, val); });
        trolley.appendChild(pb);
      });
      if (r.name && !st.done) { var qb = this.api.el('button', 'lm-plate is-blank' + (this._kp ? ' is-sel' : '')); qb.type = 'button'; qb.setAttribute('data-k', 'blank'); qb.setAttribute('aria-label', this._t('ariaArrow')); qb.textContent = st.typed || '?'; qb.addEventListener('click', function () { self._kp = !self._kp; self._paint(); }); trolley.appendChild(qb); }
    }
    trolley.style.display = trolley.children.length && !(this._kp && r.name && !st.done) ? '' : 'none';   /* the open keypad takes the trolley's place */
    /* ---- the keypad (the arrow tie) ---- */
    var kp = this._q('.lm-keypad'); kp.innerHTML = ''; kp.style.display = this._kp && r.name && !st.done ? '' : 'none';
    if (this._kp && r.name && !st.done) ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del', 'ok'].forEach(function (k) {
      var kb = self.api.el('button', 'lm-key' + (k === 'ok' ? ' is-ok' : '')); kb.type = 'button'; kb.setAttribute('data-k', 'key-' + k);
      kb.textContent = k === 'del' ? '⌫' : k === 'ok' ? '✓' : k; if (k === 'del') kb.setAttribute('aria-label', self._t('ariaDel')); if (k === 'ok') kb.setAttribute('aria-label', self._t('ariaDone'));
      kb.addEventListener('click', function () { self._keyPress(k); }); kp.appendChild(kb);
    });
    /* ---- Check ---- */
    var foot = this._q('.lm-foot'); foot.innerHTML = '';
    if (!st.done) { var ck = this.api.el('button', 'lm-check'); ck.type = 'button'; ck.setAttribute('data-k', 'check'); ck.textContent = this._t('check'); ck.disabled = !!this._busy; ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck); }
    /* ---- the note ---- */
    var note = this._q('.lm-note'), h = (!this._busy || this.FAST) ? C.hint(st) : null, t = '', cls = 'lm-note';
    if (v.msg) { t = v.msg; cls += ' is-ok'; }
    else if (h) { var hk = h.key === 'hintFind' && r.open ? 'hintFindRail' : h.key; t = this._t(hk, h.args); cls += ' is-hint'; }
    note.className = cls; note.textContent = t;
  },

  /* ---------------- actions ---------------- */
  _afterEdit: function () { this._clearTimers(); this._busy = false; this._view = {}; this.api.sound(520); this._paint(); },
  _seatTap: function (i) {
    var C = CountingLampCore, st = this.st, r = st.r;
    if (this._busy || st.done) return;
    if (r.name && i === r.name.tie) { this._kp = true; this._paint(); return; }
    if (this._sel != null && this._sel !== 'flag') { var v = this._sel; this._sel = null; if (C.place(st, v, i)) this._afterEdit(); else this._paint(); return; }
    if (st.seats[i] != null) this._pickUp(st.seats[i]);
  },
  _pickUp: function (v) { if (this._busy || this.st.done) return; if (CountingLampCore.unplace(this.st, v)) { this._sel = v; this._afterEdit(); } },
  _railTap: function (x) {
    var st = this.st; if (this._busy || st.done || this._sel == null) return;
    var v = this._sel; this._sel = null; if (CountingLampCore.placeOpen(st, v, x)) this._afterEdit(); else this._paint();
  },
  _plant: function (i) { if (this._busy || this.st.done) return; this._sel = null; if (CountingLampCore.plant(this.st, i)) this._afterEdit(); },
  _keyPress: function (k) {
    var C = CountingLampCore, st = this.st; if (this._busy || st.done) return;
    if (k === 'ok') { this._kp = false; this._paint(); return; }
    if (k === 'del' ? C.del(st) : C.type(st, k)) this._afterEdit();
  },
  _keydown: function (e) {
    var st = this.st, r = st.r, k = e.key;
    if (this._kp && /^[0-9]$/.test(k)) { this._keyPress(k); e.preventDefault(); return; }
    if (this._kp && k === 'Backspace') { this._keyPress('del'); e.preventDefault(); return; }
    if (this._kp && k === 'Escape') { this._keyPress('ok'); e.preventDefault(); return; }
    /* ← → nudge a plate clamped on the open rail by one ghost step */
    if (r.open && (k === 'ArrowLeft' || k === 'ArrowRight') && e.target && e.target.getAttribute && /^clamp-/.test(e.target.getAttribute('data-k') || '')) {
      var v = +e.target.getAttribute('data-k').slice(6), step = CountingLampCore.ghostStep(r) / (r.open.b - r.open.a);
      if (CountingLampCore.placeOpen(st, v, st.clamps[v] + (k === 'ArrowLeft' ? -step : step))) this._afterEdit();
      e.preventDefault();
    }
  },
  /* drag a plate (or the flag): it follows the finger; the nearest seat swells; release bolts it there */
  _dragStart: function (e, v) {
    if (this._busy || this.st.done || (e.button != null && e.button !== 0)) return;
    var self = this, sx = e.clientX, sy = e.clientY, ghost = null, moved = false;
    this._dragged = false;
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 8) return;
      if (!moved) { moved = true; ghost = document.createElement('div'); ghost.className = 'lm-ghostplate' + (v === 'flag' ? ' is-flag' : ''); ghost.textContent = v === 'flag' ? '' : String(v); document.body.appendChild(ghost); }
      ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px';
      var hot = self._target(ev.clientX, ev.clientY); var hk = hot && hot.seat != null ? hot.seat : null;
      if (hk !== self._hot) { self._hot = hk; self._paint(); }
      ev.preventDefault();
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
      if (ghost) ghost.remove(); self._hot = null;
      if (!moved) return;   /* a tap: leave the board alone so the click that follows lands on the button it was aimed at */
      self._dragged = true; setTimeout(function () { self._dragged = false; }, 60);
      self._drop(v, self._target(ev.clientX, ev.clientY));
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  /* what is under a point: a seat, a tie (hops) or a place on the open rail */
  _target: function (cx, cy) {
    var st = this.st, r = st.r, g = this._geo(), tr = this._q('.lm-track'); if (!tr) return null;
    var bb = tr.getBoundingClientRect(), x = cx - bb.left, y = cy - bb.top;
    if (y < g.railY - 70 || y > g.H + 10) return null;
    if (r.open) { var x0 = g.x(0), x1 = g.x(g.n); return x > x0 && x < x1 ? { rail: (x - x0) / (x1 - x0) } : null; }
    var best = null, bd = 1e9;
    for (var i = 0; i <= g.n; i++) {
      var ok = r.hop ? i !== r.hop.start : (r.posts ? r.posts.blanks.indexOf(i) >= 0 : (r.printed.indexOf(i) < 0 && !(r.name && i === r.name.tie)));
      if (!ok) continue;
      var dx = Math.abs(g.x(i) - x), dy = r.hop ? 0 : Math.abs(g.rowY(i) + g.seatH / 2 - y) * (g.stagger ? 1 : 0.2), d = dx + dy;
      if (d < bd) { bd = d; best = i; }
    }
    return best != null && Math.abs(g.x(best) - x) <= Math.max(g.pitch * (g.stagger ? 1 : 0.55), 15) ? { seat: best } : null;
  },
  _drop: function (v, tg) {
    var C = CountingLampCore, st = this.st;
    this._sel = null;
    if (v === 'flag') { if (tg && tg.seat != null && C.plant(st, tg.seat)) this._afterEdit(); else this._paint(); return; }
    if (tg && tg.rail != null) { if (C.placeOpen(st, v, tg.rail)) this._afterEdit(); else this._paint(); return; }
    if (tg && tg.seat != null) { if (C.place(st, v, tg.seat)) this._afterEdit(); else this._paint(); return; }
    if (C.unplace(st, v)) this._afterEdit(); else this._paint();   /* released away from the track: back to the trolley */
  },
  _check: function () {
    var C = CountingLampCore, st = this.st, r = st.r, self = this;
    if (this._busy || st.done) return;
    this._kp = false; this._sel = null;
    var a = C.check(st); if (!a) return;
    if (a.result === 'none') { this._view = {}; this.api.sound(200); this._paint(); this.api.announce(this._q('.lm-note').textContent || ''); return; }
    this._view = { step: 0 };
    var n = a.run.counted.length;
    var finish = function () {
      self._view.step = 99; self._busy = false;
      if (a.result === 'ok') {
        self._view.crossed = true;
        var msg = self._okText(r); self._view.msg = msg; self.api.sound(880); self._paint(); self.api.announce(msg);
        self._advance(msg.length * 60 + 2400);
      } else { self.api.sound(220); self._paint(); self.api.announce(self._q('.lm-note').textContent || ''); }
    };
    if (this.FAST || r.open) { finish(); return; }
    this._busy = true; this._paint();
    var tick = function () { self._view.step++; self.api.sound(420 + self._view.step * 30); self._paint(); if (self._view.step >= n) self._later(finish, 450); else self._later(tick, 380); };
    this._later(tick, 300);
  },
  _okText: function (r) {
    var st = this.st;
    if (r.hop) return this._t('okHop', { eq: r.hop.startValue + (r.hop.dir > 0 ? ' + ' : ' − ') + r.hop.k + ' = ' + r.hop.landValue });
    if (r.posts) return this._t(r.posts.step > 0 ? 'okUp' : 'okDown', { s: Math.abs(r.posts.step) });
    var p = r.plates.slice().sort(function (x, y) { return x - y; });
    if (r.name) return this._t('okName', { a: p[0], n: r.name.v });
    return this._t(r.open ? 'okOpen' : 'okTies', { a: p[0], b: p[1] });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

var lmCssDone = false;
function injectLampCSS() {
  if (lmCssDone || typeof document === 'undefined') return;
  lmCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lm-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .lm-wrap:focus{outline:none;}'
  + '.lm-track{position:relative;width:100%;touch-action:none;} .lm-svg{position:absolute;left:0;top:0;display:block;overflow:visible;}'
  + '.lm-hill{fill:#DCEBD2;} .lm-rail{stroke:#6E7B85;stroke-width:4;stroke-linecap:round;} .lm-rail.is-bent{fill:none;stroke-width:3;} .lm-tie{fill:#A0703C;} .lm-pole{stroke:#8A6B42;stroke-width:4;}'
  + '.lm-ghost{fill:#E8C26A;opacity:.85;} .lm-ghostnum{fill:#8A5A00;text-anchor:middle;font-family:' + H + ';font-weight:800;font-size:13px;}'
  + '.lm-puff{fill:#FFFFFF;stroke:#B9C2CA;stroke-width:1.5;} .lm-puffnum{fill:#4A5560;text-anchor:middle;font-family:' + H + ';font-weight:800;font-size:15px;}'
  + '.lm-flagpole{stroke:#3A2E1F;stroke-width:3;} .lm-flagcloth{fill:#D9412B;} .lm-flag.is-wobble{animation:lmWob .5s ease-in-out 2;transform-box:fill-box;transform-origin:bottom;} @keyframes lmWob{25%{transform:rotate(-8deg);}75%{transform:rotate(8deg);}}'
  + '.lm-arc{fill:none;stroke:#1E8A78;stroke-width:2.5;} .lm-arc.is-wrong{stroke:#E0603A;} .lm-arc.is-help{stroke-dasharray:4 3;} .lm-arcnum{fill:#146B5E;text-anchor:middle;font-family:' + H + ';font-weight:800;font-size:15px;} .lm-arcnum.is-wrong{fill:#C2461E;}'
  + '.lm-engine{position:absolute;display:block;transition:left .32s ease-in-out;pointer-events:none;} .lm-engine-pic{display:block;} .lm-engine.is-back .lm-engine-pic{transform:scaleX(-1);}'
  + '.lm-beam{position:absolute;right:-26%;bottom:12%;width:34%;height:30%;background:linear-gradient(90deg,rgba(255,214,77,.85),rgba(255,214,77,0));clip-path:polygon(0 35%,100% 0,100% 100%,0 65%);opacity:.25;} .lm-beam.is-on{opacity:1;} .lm-engine.is-back .lm-beam{right:auto;left:-26%;transform:scaleX(-1);}'
  + '.lm-lamp{position:absolute;transform:translate(-50%,-50%);padding:0 4px;border-radius:8px;background:#FFE680;box-shadow:0 0 8px #FFD24D;font-family:' + H + ';font-weight:800;font-size:16px;line-height:20px;color:#5A3D00;pointer-events:none;} .lm-wrap.is-narrow .lm-lamp{font-size:12px;line-height:15px;padding:0 2px;}'
  + '.lm-seat{position:absolute;border:0;border-radius:9px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #C9B79A;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2E1F;cursor:pointer;padding:0;line-height:1;display:flex;align-items:center;justify-content:center;transition:transform .15s;}'
  + '.lm-wrap.is-narrow .lm-seat{font-size:18px;} .lm-seat:empty{background:rgba(251,243,228,.55);box-shadow:inset 0 0 0 2px #C9B79A;border:2px dashed transparent;}'
  + '.lm-seat.is-printed{background:#FBF3E4;box-shadow:inset 0 0 0 3px #3A2E1F;cursor:default;} .lm-seat.is-full{background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42,0 3px 0 #C9A96E;} .lm-seat.is-post{border-radius:6px;}'
  + '.lm-seat.is-open{box-shadow:inset 0 0 0 2px #1E8A78;} .lm-seat.is-hot{transform:scale(1.18);box-shadow:inset 0 0 0 3px #1E8A78;z-index:2;}'
  + '.lm-seat.is-lit{background:#FFF3B0;color:#8A5A00;box-shadow:inset 0 0 0 2px #E0A800;} .lm-seat.is-right{box-shadow:inset 0 0 0 3px #1E8A78;background:#E4F4EF;} .lm-seat.is-right::after{content:"";position:absolute;right:-4px;top:-10px;width:12px;height:10px;background:#2E9B5F;clip-path:polygon(0 0,100% 50%,0 100%);}'
  + '.lm-seat.is-wrong{background:#FDE3D8;box-shadow:inset 0 0 0 3px #E0603A;animation:lmRat .35s ease-in-out 2;} @keyframes lmRat{25%{transform:translateX(-2px);}75%{transform:translateX(2px);}}'
  + '.lm-seat.is-name{background:#FFFDF7;box-shadow:inset 0 0 0 3px #146B5E;} .lm-tag{position:absolute;left:50%;top:-14px;transform:translateX(-50%);padding:0 4px;border-radius:7px;background:#FFE680;box-shadow:0 0 6px #FFD24D;font-size:13px;line-height:16px;color:#5A3D00;}'
  + '.lm-arrow{position:absolute;width:0;height:0;transform:translateX(-50%);border-left:9px solid transparent;border-right:9px solid transparent;border-top:14px solid #146B5E;}'
  + '.lm-rail-zone{position:absolute;border:0;background:transparent;cursor:pointer;border-radius:10px;} .lm-rail-zone.is-open{background:rgba(30,138,120,.10);box-shadow:inset 0 0 0 2px rgba(30,138,120,.5);}'
  + '.lm-trolley{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;padding:10px 16px;border-radius:14px;background:#E9D9BE;box-shadow:inset 0 -4px 0 #C9AE82;min-height:60px;}'
  + '.lm-plate{min-width:56px;height:48px;padding:0 8px;border:0;border-radius:9px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42,0 3px 0 #C9A96E;font-family:' + H + ';font-weight:800;font-size:24px;color:#3A2E1F;cursor:grab;touch-action:none;}'
  + '.lm-plate.is-sel{transform:translateY(-5px);box-shadow:inset 0 0 0 3px #1E8A78,0 6px 0 #8FC9BC;} .lm-plate.is-blank{color:#146B5E;} .lm-plate.is-flag{display:flex;align-items:center;justify-content:center;}'
  + '.lm-ghostplate{position:fixed;z-index:50;transform:translate(-50%,-60%);min-width:52px;height:42px;padding:0 8px;border-radius:9px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #1E8A78,0 8px 16px rgba(0,0,0,.2);font-family:' + H + ';font-weight:800;font-size:24px;line-height:42px;text-align:center;color:#3A2E1F;pointer-events:none;} .lm-ghostplate.is-flag{background:#D9412B;min-width:30px;}'
  + '.lm-keypad{display:grid;grid-template-columns:repeat(6,minmax(44px,52px));gap:4px;} .lm-key{height:48px;border:0;border-radius:10px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2E1F;cursor:pointer;} .lm-key.is-ok{background:#1E8A78;color:#fff;box-shadow:none;}'
  + '.lm-check{min-height:52px;padding:6px 28px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;} .lm-check:disabled{opacity:.5;cursor:default;}'
  + '.lm-seat:focus-visible,.lm-plate:focus-visible,.lm-key:focus-visible,.lm-check:focus-visible,.lm-rail-zone:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.lm-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .lm-note:empty{display:none;} .lm-note.is-hint{color:#B5461F;} .lm-note.is-ok{color:#146B5E;}'
  + '.lm-wrap.is-narrow .lm-note{font-size:17px;} .lm-wrap.is-narrow .lm-plate{min-width:50px;font-size:22px;} .lm-wrap.is-tiny{gap:8px;} .lm-wrap.is-tiny .lm-trolley{gap:8px;padding:8px 10px;}'
  + '.lm-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.lm-note,.lm-foot,.lm-keypad{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.lm-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'lm-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.CountingLampActivity = CountingLampActivity;
