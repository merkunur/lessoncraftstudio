/* =====================================================================
   rod-drawers-activity.js — ACTIVITY #95 of the one-by-one rebuild:
   "Compare Two-Digit Numbers — Greater Than, Less Than, Equal" → THE
   TEN-ROD DRAWERS (1.NBT.B.3, 11 locales).
   Design: docs/activities-rebuild/designs/095-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: each number is a cabinet with a tens drawer and a ones
   drawer. The tens drawers must open first and their rods stand up as a
   column; when the tens already differ, the ones drawers lock SHUT —
   nine ones can never reach the next ten. The comparison sign is fitted
   to the two value columns: its open side must hold the taller one.
   Order rounds put three cabinets on a staircase and the columns form a
   skyline. Levels: groups to 20 (packs of ten + loose counters, the fruit
   a library picture on top), two-digit, four-digit (four drawers).
   ACTIVITY LAYER ONLY: the model is rod-drawers-core.js; the fruits are
   library pictures via lcs-pictures.js; cabinets, drawers, rods, counters
   and the sign are drawn apparatus; lcs-shell.js untouched (the shell's
   Check is hidden and pressed by this activity when the round is right).
   The drawers of one place are linked under the podium: one knob per
   place pulls both cabinets' drawers (so four-digit knobs fit a phone).
   Test seams: window.RodDrawersActivity.st / ._pool / ._order /
   ._ensurePool / ._start / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var RodDrawersActivity = {
  id: 'rod-drawers',
  apparatusClasses: ['rd-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:      {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:         {en:'The Ten-Rod Drawers',de:'Die Zehnerschubladen',nl:'De tientallaatjes',da:'Tierskufferne',sv:'Tiotalslådorna',no:'Tierskuffene',es:'Los cajones de las decenas',it:'I cassetti delle decine',pt:'As gavetas das dezenas',fr:'Les tiroirs des dizaines',fi:'Kymppilaatikot'},
    pCompare:      {en:'Which sign makes it true?',de:'Welches Zeichen stimmt?',nl:'Welk teken klopt?',da:'Hvilket tegn passer?',sv:'Vilket tecken stämmer?',no:'Hvilket tegn stemmer?',es:'¿Qué signo es el correcto?',it:'Quale simbolo è giusto?',pt:'Qual sinal está certo?',fr:'Quel signe est juste ?',fi:'Mikä merkki on oikein?'},
    pCompareGroups:{en:'Which sign makes it true for the two groups?',de:'Welches Zeichen stimmt für die zwei Gruppen?',nl:'Welk teken klopt voor de twee groepjes?',da:'Hvilket tegn passer til de to grupper?',sv:'Vilket tecken stämmer för de två grupperna?',no:'Hvilket tegn stemmer for de to gruppene?',es:'¿Qué signo es el correcto para los dos grupos?',it:'Quale simbolo è giusto per i due gruppi?',pt:'Qual sinal está certo para os dois grupos?',fr:'Quel signe est juste pour les deux groupes ?',fi:'Mikä merkki on oikein näille kahdelle ryhmälle?'},
    pOrderUp:      {en:'Put them in order: smallest first.',de:'Ordne sie: die kleinste Zahl zuerst.',nl:'Zet ze op volgorde: het kleinste eerst.',da:'Sæt dem i rækkefølge: det mindste først.',sv:'Sätt dem i ordning: det minsta först.',no:'Sett dem i rekkefølge: det minste først.',es:'Ordénalos: primero el más pequeño.',it:'Mettili in ordine: prima il più piccolo.',pt:'Coloque em ordem: primeiro o menor.',fr:'Range-les : le plus petit d’abord.',fi:'Laita ne järjestykseen: pienin ensin.'},
    pOrderDown:    {en:'Put them in order: biggest first.',de:'Ordne sie: die größte Zahl zuerst.',nl:'Zet ze op volgorde: het grootste eerst.',da:'Sæt dem i rækkefølge: det største først.',sv:'Sätt dem i ordning: det största först.',no:'Sett dem i rekkefølge: det største først.',es:'Ordénalos: primero el más grande.',it:'Mettili in ordine: prima il più grande.',pt:'Coloque em ordem: primeiro o maior.',fr:'Range-les : le plus grand d’abord.',fi:'Laita ne järjestykseen: suurin ensin.'},
    hintTensFirst: {en:'Open the tens drawers first.',de:'Mach zuerst die Zehnerschubladen auf.',nl:'Doe eerst de laatjes van de tientallen open.',da:'Åbn tierskufferne først.',sv:'Öppna tiotalslådorna först.',no:'Åpne tierskuffene først.',es:'Abre primero los cajones de las decenas.',it:'Apri prima i cassetti delle decine.',pt:'Abra primeiro as gavetas das dezenas.',fr:'Ouvre d’abord les tiroirs des dizaines.',fi:'Avaa ensin kymppien laatikot.'},
    hintOnesNow:   {en:'The tens are the same — open the ones drawers.',de:'Die Zehner sind gleich – mach die Einerschubladen auf.',nl:'De tientallen zijn gelijk — doe de laatjes van de eenheden open.',da:'Tierne er ens – åbn enerskufferne.',sv:'Tiotalen är lika – öppna entalslådorna.',no:'Tierne er like – åpne enerskuffene.',es:'Las decenas son iguales: abre los cajones de las unidades.',it:'Le decine sono uguali: apri i cassetti delle unità.',pt:'As dezenas são iguais: abra as gavetas das unidades.',fr:'Les dizaines sont pareilles : ouvre les tiroirs des unités.',fi:'Kympit ovat samat – avaa ykkösten laatikot.'},
    hintLeftFirst: {en:'Open the drawers from the left.',de:'Mach die Schubladen von links her auf.',nl:'Doe de laatjes van links af open.',da:'Åbn skufferne fra venstre.',sv:'Öppna lådorna från vänster.',no:'Åpne skuffene fra venstre.',es:'Abre los cajones empezando por la izquierda.',it:'Apri i cassetti partendo da sinistra.',pt:'Abra as gavetas a partir da esquerda.',fr:'Ouvre les tiroirs en partant de la gauche.',fi:'Avaa laatikot vasemmalta alkaen.'},
    hintNextNow:   {en:'These are the same — open the next drawers.',de:'Diese sind gleich – mach die nächsten Schubladen auf.',nl:'Die zijn gelijk — doe de volgende laatjes open.',da:'De er ens – åbn de næste skuffer.',sv:'De är lika – öppna nästa lådor.',no:'De er like – åpne de neste skuffene.',es:'Son iguales: abre los cajones siguientes.',it:'Sono uguali: apri i cassetti successivi.',pt:'São iguais: abra as próximas gavetas.',fr:'Ils sont pareils : ouvre les tiroirs suivants.',fi:'Ne ovat samat – avaa seuraavat laatikot.'},
    hintTurn:      {en:'Turn the sign until it is true.',de:'Dreh das Zeichen, bis es stimmt.',nl:'Draai het teken tot het klopt.',da:'Drej tegnet, indtil det passer.',sv:'Vrid tecknet tills det stämmer.',no:'Snu tegnet til det stemmer.',es:'Gira el signo hasta que sea correcto.',it:'Gira il simbolo finché è giusto.',pt:'Gire o sinal até ficar certo.',fr:'Tourne le signe jusqu’à ce qu’il soit juste.',fi:'Käännä merkkiä, kunnes se on oikein.'},
    hintSteps:     {en:'Put every cabinet on a step.',de:'Stell jeden Schrank auf eine Stufe.',nl:'Zet elk kastje op een trede.',da:'Sæt hvert skab på et trin.',sv:'Ställ varje skåp på ett trappsteg.',no:'Sett hvert skap på et trinn.',es:'Pon cada mueble en un escalón.',it:'Metti ogni mobiletto su un gradino.',pt:'Coloque cada armário num degrau.',fr:'Pose chaque meuble sur une marche.',fi:'Laita jokainen kaappi portaalle.'},
    hintLookTens:  {en:'Look at the tens first — the tens decide.',de:'Schau zuerst auf die Zehner – die Zehner entscheiden.',nl:'Kijk eerst naar de tientallen — de tientallen beslissen.',da:'Se først på tierne – tierne afgør det.',sv:'Titta först på tiotalen – tiotalen avgör.',no:'Se først på tierne – tierne avgjør.',es:'Mira primero las decenas: las decenas deciden.',it:'Guarda prima le decine: decidono le decine.',pt:'Olhe primeiro as dezenas: as dezenas decidem.',fr:'Regarde d’abord les dizaines : ce sont elles qui décident.',fi:'Katso ensin kymppejä – kympit ratkaisevat.'},
    hintOnesDecide:{en:'The tens are the same — the ones decide.',de:'Die Zehner sind gleich – die Einer entscheiden.',nl:'De tientallen zijn gelijk — de eenheden beslissen.',da:'Tierne er ens – enerne afgør det.',sv:'Tiotalen är lika – entalen avgör.',no:'Tierne er like – enerne avgjør.',es:'Las decenas son iguales: deciden las unidades.',it:'Le decine sono uguali: decidono le unità.',pt:'As dezenas são iguais: as unidades decidem.',fr:'Les dizaines sont pareilles : ce sont les unités qui décident.',fi:'Kympit ovat samat – ykköset ratkaisevat.'},
    hintLookLeft:  {en:'Look from the left: the first drawers that are not the same decide.',de:'Schau von links: Die ersten Schubladen, die nicht gleich sind, entscheiden.',nl:'Kijk van links: de eerste laatjes die niet gelijk zijn, beslissen.',da:'Se fra venstre: De første skuffer, der ikke er ens, afgør det.',sv:'Titta från vänster: de första lådorna som inte är lika avgör.',no:'Se fra venstre: De første skuffene som ikke er like, avgjør.',es:'Mira desde la izquierda: deciden los primeros cajones que no son iguales.',it:'Guarda da sinistra: decidono i primi cassetti che non sono uguali.',pt:'Olhe a partir da esquerda: decidem as primeiras gavetas que não são iguais.',fr:'Regarde depuis la gauche : les premiers tiroirs qui ne sont pas pareils décident.',fi:'Katso vasemmalta: ensimmäiset laatikot, jotka eivät ole samat, ratkaisevat.'},
    hintEqual:     {en:'It is equal only if both columns are the same height.',de:'Nur gleich, wenn beide Säulen gleich hoch sind.',nl:'Alleen gelijk als beide stapels even hoog zijn.',da:'Det er kun lig med, hvis begge søjler er lige høje.',sv:'Det är lika med bara om båda staplarna är lika höga.',no:'Det er bare lik hvis begge søylene er like høye.',es:'Son iguales solo si las dos columnas llegan a la misma altura.',it:'Uguale solo se le due colonne arrivano alla stessa altezza.',pt:'Só é igual se as duas colunas chegarem à mesma altura.',fr:'Égal seulement si les deux colonnes arrivent à la même hauteur.',fi:'Yhtä suuri vain, jos molemmat pylväät ovat yhtä korkeat.'},
    hintEqualFour: {en:'It is equal only if every pair of drawers holds the same amount.',de:'Nur gleich, wenn in allen Schubladenpaaren gleich viel liegt.',nl:'Alleen gelijk als in elk paar laatjes evenveel zit.',da:'Det er kun lig med, hvis hvert par skuffer har lige mange.',sv:'Det är lika med bara om varje par lådor har lika många.',no:'Det er bare lik hvis hvert par skuffer har like mange.',es:'Son iguales solo si cada par de cajones tiene la misma cantidad.',it:'Uguale solo se ogni coppia di cassetti contiene la stessa quantità.',pt:'Só é igual se cada par de gavetas tiver a mesma quantidade.',fr:'Égal seulement si chaque paire de tiroirs contient autant.',fi:'Yhtä suuri vain, jos jokaisessa laatikkoparissa on yhtä paljon.'},
    hintSame:      {en:'Look at the two columns. Are they the same height?',de:'Schau dir die beiden Säulen an. Sind sie gleich hoch?',nl:'Kijk naar de twee stapels. Zijn ze even hoog?',da:'Se på de to søjler. Er de lige høje?',sv:'Titta på de två staplarna. Är de lika höga?',no:'Se på de to søylene. Er de like høye?',es:'Mira las dos columnas. ¿Tienen la misma altura?',it:'Guarda le due colonne. Sono alte uguali?',pt:'Olhe as duas colunas. Elas têm a mesma altura?',fr:'Regarde les deux colonnes. Ont-elles la même hauteur ?',fi:'Katso kahta pylvästä. Ovatko ne yhtä korkeat?'},
    hintSameFour:  {en:'Look at each pair of drawers. Do they hold the same amount?',de:'Schau dir jedes Schubladenpaar an. Liegt darin gleich viel?',nl:'Kijk naar elk paar laatjes. Zit er evenveel in?',da:'Se på hvert par skuffer. Har de lige mange?',sv:'Titta på varje par lådor. Har de lika många?',no:'Se på hvert par skuffer. Har de like mange?',es:'Mira cada par de cajones. ¿Tienen la misma cantidad?',it:'Guarda ogni coppia di cassetti. Contengono la stessa quantità?',pt:'Olhe cada par de gavetas. Elas têm a mesma quantidade?',fr:'Regarde chaque paire de tiroirs. Contiennent-ils autant ?',fi:'Katso jokaista laatikkoparia. Onko niissä yhtä paljon?'},
    hintOpenSide:  {en:'The open side holds the bigger number.',de:'Die offene Seite zeigt zur größeren Zahl.',nl:'De open kant wijst naar het grotere getal.',da:'Den åbne side vender mod det største tal.',sv:'Den öppna sidan pekar mot det större talet.',no:'Den åpne siden vender mot det største tallet.',es:'El lado abierto mira al número mayor.',it:'Il lato aperto guarda il numero maggiore.',pt:'O lado aberto fica virado para o número maior.',fr:'Le côté ouvert est tourné vers le plus grand nombre.',fi:'Avoin puoli on suurempaa lukua kohti.'},
    hintOrder:     {en:'Compare the tens first, then the ones.',de:'Vergleiche zuerst die Zehner, dann die Einer.',nl:'Vergelijk eerst de tientallen, dan de eenheden.',da:'Sammenlign tierne først, så enerne.',sv:'Jämför tiotalen först, sedan entalen.',no:'Sammenlign tierne først, så enerne.',es:'Compara primero las decenas y luego las unidades.',it:'Confronta prima le decine, poi le unità.',pt:'Compare primeiro as dezenas, depois as unidades.',fr:'Compare d’abord les dizaines, puis les unités.',fi:'Vertaa ensin kymppejä, sitten ykkösiä.'},
    hintOrderFour: {en:'Compare from the left, drawer by drawer.',de:'Vergleiche von links, Schublade für Schublade.',nl:'Vergelijk van links, laatje voor laatje.',da:'Sammenlign fra venstre, skuffe for skuffe.',sv:'Jämför från vänster, låda för låda.',no:'Sammenlign fra venstre, skuff for skuff.',es:'Compara desde la izquierda, cajón por cajón.',it:'Confronta da sinistra, cassetto per cassetto.',pt:'Compare a partir da esquerda, gaveta por gaveta.',fr:'Compare depuis la gauche, tiroir par tiroir.',fi:'Vertaa vasemmalta, laatikko kerrallaan.'},
    hintColumns:   {en:'The taller the column, the bigger the number.',de:'Je höher die Säule, desto größer die Zahl.',nl:'Hoe hoger de stapel, hoe groter het getal.',da:'Jo højere søjlen er, jo større er tallet.',sv:'Ju högre stapel, desto större tal.',no:'Jo høyere søylen er, jo større er tallet.',es:'Cuanto más alta la columna, mayor el número.',it:'Più alta è la colonna, più grande è il numero.',pt:'Quanto mais alta a coluna, maior o número.',fr:'Plus la colonne est haute, plus le nombre est grand.',fi:'Mitä korkeampi pylväs, sitä suurempi luku.'},
    okGreater:     {en:'{a} is greater than {b}!',de:'{a} ist größer als {b}!',nl:'{a} is groter dan {b}!',da:'{a} er større end {b}!',sv:'{a} är större än {b}!',no:'{a} er større enn {b}!',es:'¡{a} es mayor que {b}!',it:'{a} è maggiore di {b}!',pt:'{a} é maior que {b}!',fr:'{a} est plus grand que {b} !',fi:'{a} on suurempi kuin {b}!'},
    okLess:        {en:'{a} is less than {b}!',de:'{a} ist kleiner als {b}!',nl:'{a} is kleiner dan {b}!',da:'{a} er mindre end {b}!',sv:'{a} är mindre än {b}!',no:'{a} er mindre enn {b}!',es:'¡{a} es menor que {b}!',it:'{a} è minore di {b}!',pt:'{a} é menor que {b}!',fr:'{a} est plus petit que {b} !',fi:'{a} on pienempi kuin {b}!'},
    okEqual:       {en:'{a} is equal to {b}!',de:'{a} ist gleich {b}!',nl:'{a} is gelijk aan {b}!',da:'{a} er lig med {b}!',sv:'{a} är lika med {b}!',no:'{a} er lik {b}!',es:'¡{a} es igual a {b}!',it:'{a} è uguale a {b}!',pt:'{a} é igual a {b}!',fr:'{a} est égal à {b} !',fi:'{a} on yhtä suuri kuin {b}!'},
    okUp:          {en:'{x}, {y}, {z} — from the smallest to the biggest!',de:'{x}, {y}, {z} – von der kleinsten zur größten Zahl!',nl:'{x}, {y}, {z} — van klein naar groot!',da:'{x}, {y}, {z} – fra det mindste til det største!',sv:'{x}, {y}, {z} – från det minsta till det största!',no:'{x}, {y}, {z} – fra det minste til det største!',es:'¡{x}, {y}, {z}: del más pequeño al más grande!',it:'{x}, {y}, {z}: dal più piccolo al più grande!',pt:'{x}, {y}, {z}: do menor para o maior!',fr:'{x}, {y}, {z} : du plus petit au plus grand !',fi:'{x}, {y}, {z} – pienimmästä suurimpaan!'},
    okDown:        {en:'{x}, {y}, {z} — from the biggest to the smallest!',de:'{x}, {y}, {z} – von der größten zur kleinsten Zahl!',nl:'{x}, {y}, {z} — van groot naar klein!',da:'{x}, {y}, {z} – fra det største til det mindste!',sv:'{x}, {y}, {z} – från det största till det minsta!',no:'{x}, {y}, {z} – fra det største til det minste!',es:'¡{x}, {y}, {z}: del más grande al más pequeño!',it:'{x}, {y}, {z}: dal più grande al più piccolo!',pt:'{x}, {y}, {z}: do maior para o menor!',fr:'{x}, {y}, {z} : du plus grand au plus petit !',fi:'{x}, {y}, {z} – suurimmasta pienimpään!'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kolla',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setNumbers:    {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    nGroups:       {en:'Groups to 20',de:'Gruppen bis 20',nl:'Groepjes tot 20',da:'Grupper op til 20',sv:'Grupper upp till 20',no:'Grupper opp til 20',es:'Grupos hasta 20',it:'Gruppi fino a 20',pt:'Grupos até 20',fr:'Groupes jusqu’à 20',fi:'Ryhmät 20:een asti'},
    nTwo:          {en:'Two-digit',de:'Zweistellig',nl:'Twee cijfers',da:'Tocifrede',sv:'Tvåsiffriga',no:'Tosifrede',es:'Dos cifras',it:'Due cifre',pt:'Dois dígitos',fr:'Deux chiffres',fi:'Kaksinumeroiset'},
    nFour:         {en:'Four-digit',de:'Vierstellig',nl:'Vier cijfers',da:'Firecifrede',sv:'Fyrsiffriga',no:'Firesifrede',es:'Cuatro cifras',it:'Quattro cifre',pt:'Quatro dígitos',fr:'Quatre chiffres',fi:'Nelinumeroiset'},
    setTask:       {en:'Task',de:'Aufgabe',nl:'Opdracht',da:'Opgave',sv:'Uppgift',no:'Oppgave',es:'Tarea',it:'Compito',pt:'Tarefa',fr:'Tâche',fi:'Tehtävä'},
    tCompare:      {en:'Compare two',de:'Zwei vergleichen',nl:'Twee vergelijken',da:'Sammenlign to',sv:'Jämför två',no:'Sammenlign to',es:'Comparar dos',it:'Confronta due',pt:'Comparar dois',fr:'Comparer deux',fi:'Vertaa kahta'},
    tOrder:        {en:'Order three',de:'Drei ordnen',nl:'Drie ordenen',da:'Ordn tre',sv:'Ordna tre',no:'Ordne tre',es:'Ordenar tres',it:'Ordina tre',pt:'Ordenar três',fr:'Ranger trois',fi:'Järjestä kolme'},
    plTh:          {en:'Thousands drawers',de:'Tausenderschubladen',nl:'Laatjes van de duizendtallen',da:'Tusindskuffer',sv:'Tusentalslådor',no:'Tusenskuffer',es:'Cajones de los millares',it:'Cassetti delle migliaia',pt:'Gavetas das unidades de milhar',fr:'Tiroirs des milliers',fi:'Tuhansien laatikot'},
    plH:           {en:'Hundreds drawers',de:'Hunderterschubladen',nl:'Laatjes van de honderdtallen',da:'Hundredeskuffer',sv:'Hundratalslådor',no:'Hundreskuffer',es:'Cajones de las centenas',it:'Cassetti delle centinaia',pt:'Gavetas das centenas',fr:'Tiroirs des centaines',fi:'Satojen laatikot'},
    plT:           {en:'Tens drawers',de:'Zehnerschubladen',nl:'Laatjes van de tientallen',da:'Tierskuffer',sv:'Tiotalslådor',no:'Tierskuffer',es:'Cajones de las decenas',it:'Cassetti delle decine',pt:'Gavetas das dezenas',fr:'Tiroirs des dizaines',fi:'Kymppien laatikot'},
    plO:           {en:'Ones drawers',de:'Einerschubladen',nl:'Laatjes van de eenheden',da:'Enerskuffer',sv:'Entalslådor',no:'Enerskuffer',es:'Cajones de las unidades',it:'Cassetti delle unità',pt:'Gavetas das unidades',fr:'Tiroirs des unités',fi:'Ykkösten laatikot'},
    stFree:        {en:'{p}: pull to open',de:'{p}: ziehen zum Öffnen',nl:'{p}: trek om open te doen',da:'{p}: træk for at åbne',sv:'{p}: dra för att öppna',no:'{p}: dra for å åpne',es:'{p}: tira para abrir',it:'{p}: tira per aprire',pt:'{p}: puxe para abrir',fr:'{p} : tire pour ouvrir',fi:'{p}: vedä auki'},
    stOpen:        {en:'{p}: open',de:'{p}: offen',nl:'{p}: open',da:'{p}: åbne',sv:'{p}: öppna',no:'{p}: åpne',es:'{p}: abiertos',it:'{p}: aperti',pt:'{p}: abertas',fr:'{p} : ouverts',fi:'{p}: auki'},
    stLocked:      {en:'{p}: locked',de:'{p}: abgeschlossen',nl:'{p}: op slot',da:'{p}: låst',sv:'{p}: låsta',no:'{p}: låst',es:'{p}: cerrados con candado',it:'{p}: chiusi con il lucchetto',pt:'{p}: trancadas',fr:'{p} : fermés à clé',fi:'{p}: lukossa'},
    stSealed:      {en:'{p}: locked, not needed',de:'{p}: abgeschlossen, nicht nötig',nl:'{p}: op slot, niet nodig',da:'{p}: låst, ikke nødvendige',sv:'{p}: låsta, behövs inte',no:'{p}: låst, ikke nødvendige',es:'{p}: cerrados, no hacen falta',it:'{p}: chiusi, non servono',pt:'{p}: trancadas, não são necessárias',fr:'{p} : fermés, inutiles ici',fi:'{p}: lukossa, ei tarvita'},
    ariaCab:       {en:'Number {n}',de:'Zahl {n}',nl:'Getal {n}',da:'Tallet {n}',sv:'Talet {n}',no:'Tallet {n}',es:'Número {n}',it:'Numero {n}',pt:'Número {n}',fr:'Nombre {n}',fi:'Luku {n}'},
    ariaGroup:     {en:'A group of {n}',de:'Eine Gruppe mit {n}',nl:'Een groepje van {n}',da:'En gruppe med {n}',sv:'En grupp med {n}',no:'En gruppe med {n}',es:'Un grupo de {n}',it:'Un gruppo di {n}',pt:'Um grupo de {n}',fr:'Un groupe de {n}',fi:'Ryhmä, jossa on {n}'},
    ariaSign:      {en:'Sign: {s}. Tap to turn it.',de:'Zeichen: {s}. Tippen zum Drehen.',nl:'Teken: {s}. Tik om te draaien.',da:'Tegn: {s}. Tryk for at dreje det.',sv:'Tecken: {s}. Tryck för att vrida det.',no:'Tegn: {s}. Trykk for å snu det.',es:'Signo: {s}. Toca para girarlo.',it:'Simbolo: {s}. Tocca per girarlo.',pt:'Sinal: {s}. Toque para girar.',fr:'Signe : {s}. Touche pour le tourner.',fi:'Merkki: {s}. Napauta kääntääksesi.'},
    sLess:         {en:'less than',de:'kleiner als',nl:'kleiner dan',da:'mindre end',sv:'mindre än',no:'mindre enn',es:'menor que',it:'minore di',pt:'menor que',fr:'plus petit que',fi:'pienempi kuin'},
    sGreater:      {en:'greater than',de:'größer als',nl:'groter dan',da:'større end',sv:'större än',no:'større enn',es:'mayor que',it:'maggiore di',pt:'maior que',fr:'plus grand que',fi:'suurempi kuin'},
    sEqual:        {en:'equal to',de:'gleich',nl:'gelijk aan',da:'lig med',sv:'lika med',no:'lik',es:'igual a',it:'uguale a',pt:'igual a',fr:'égal à',fi:'yhtä suuri kuin'},
    sFlat:         {en:'lying flat',de:'liegt flach',nl:'ligt plat',da:'ligger fladt',sv:'ligger platt',no:'ligger flatt',es:'acostado',it:'sdraiato',pt:'deitado',fr:'à plat',fi:'makaa vaakatasossa'},
    ariaStep:      {en:'Step {i}',de:'Stufe {i}',nl:'Trede {i}',da:'Trin {i}',sv:'Trappsteg {i}',no:'Trinn {i}',es:'Escalón {i}',it:'Gradino {i}',pt:'Degrau {i}',fr:'Marche {i}',fi:'Porras {i}'},
    ariaWait:      {en:'Waiting row',de:'Warteplatz',nl:'Wachtrij',da:'Ventepladsen',sv:'Väntplatsen',no:'Venteplassen',es:'Fila de espera',it:'Fila d’attesa',pt:'Fila de espera',fr:'Rangée d’attente',fi:'Odotusrivi'},
    ariaUp:        {en:'Smallest first',de:'Kleinste zuerst',nl:'Kleinste eerst',da:'Mindste først',sv:'Minsta först',no:'Minste først',es:'Primero el más pequeño',it:'Prima il più piccolo',pt:'Primeiro o menor',fr:'Le plus petit d’abord',fi:'Pienin ensin'},
    ariaDown:      {en:'Biggest first',de:'Größte zuerst',nl:'Grootste eerst',da:'Største først',sv:'Största först',no:'Største først',es:'Primero el más grande',it:'Prima il più grande',pt:'Primeiro o maior',fr:'Le plus grand d’abord',fi:'Suurin ensin'}
  },/*STRINGS-END*/

  defaults: { numbers: 'two', task: 'compare' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'groups', labelKey: 'nGroups' }, { value: 'two', labelKey: 'nTwo' }, { value: 'four', labelKey: 'nFour' }] },
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'compare', labelKey: 'tCompare' }, { value: 'order', labelKey: 'tOrder' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._sel = null; this._drag = null;
    injectRodCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') ['fruits', 'at-the-supermarket'].forEach(function (th) {
      LCSPictures.load(th).then(function (t) { self._pics[th] = t; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
    });
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
  _loc: function () { return RodDrawersCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return RodDrawersCore.levelOf(this._setting('numbers')); },
  _task: function () { return RodDrawersCore.taskOf(this._setting('task')); },
  _key: function () { return this._level() + '.' + this._task(); },
  _fmt: function (n) { return RodDrawersCore.format(n, this._loc(), this._level()); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = RodDrawersCore.ids(this._level(), this._task()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = RodDrawersCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(this._level(), this._task(), Math.random, prev).order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._promptText(C.round(this._level(), this._task(), idx)) }; this._pa = pa;
    return {
      id: 'roddrawers.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    if (r.task === 'order') return this._t(r.dir === 'up' ? 'pOrderUp' : 'pOrderDown');
    return this._t(r.level === 'groups' ? 'pCompareGroups' : 'pCompare');
  },
  _start: function (idx, pos) {
    var C = RodDrawersCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._sel = null; this._busy = false; this._drag = null;
    this.st = C.newState(C.round(this._level(), this._task(), idx));
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
    var wrap = api.el('div', 'rd-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="rd-stage"></div><div class="rd-knobs" role="group"></div><div class="rd-foot"></div><p class="rd-note" aria-live="polite"></p>';
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
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* the sizes for this width */
  _dims: function (L, r) {
    var four = r.places === 4, W = L.W, d = {};
    d.colW = four ? 0 : (L.wide ? 26 : 18);
    d.mid = L.wide ? 120 : (L.tiny ? 54 : 64);
    d.cabW = Math.max(four ? 96 : 76, Math.min(four ? 200 : 150, Math.floor((W - 2 * d.colW - d.mid - 30) / 2)));
    d.colMax = L.wide ? 260 : (L.tiny ? 150 : 190);
    d.unit = d.colMax / (r.level === 'groups' ? 20 : 99);
    d.pic = L.wide ? 96 : 64;
    d.digitPx = four ? (L.wide ? 46 : (L.tiny ? 24 : 28)) : (L.wide ? 64 : (L.tiny ? 40 : 46));
    d.counter = L.wide ? 13 : (L.tiny ? 8 : 9);
    d.block = L.wide ? 13 : (L.tiny ? 7 : 9);
    d.stepW = Math.min(180, Math.floor((W - 16) / 3));
    d.ordMax = L.wide ? 200 : (L.tiny ? 110 : 140);
    d.ordUnit = d.ordMax / (r.level === 'groups' ? 20 : 99);
    return d;
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = RodDrawersCore, st = this.st, r = st.r, L = C.layout(this._width()), v = this._view, self = this;
    this._wrap.className = 'rd-wrap ' + (L.wide ? 'is-wide' : 'is-narrow') + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (r.level === 'four' ? ' is-four' : '') + (r.task === 'order' ? ' is-order' : '');
    var d = this._dims(L, r);
    if (r.task === 'order') this._paintOrder(d, L); else this._paintCompare(d, L);
    /* the bubble */
    var note = this._q('.rd-note'), h = C.hint(st);
    if (v.msg) { note.textContent = v.msg; note.className = 'rd-note is-ok'; }
    else if (h && v.checked) { note.textContent = this._t(h.key); note.className = 'rd-note is-hint'; }
    else { note.textContent = ''; note.className = 'rd-note'; }
    /* Check */
    var foot = this._q('.rd-foot'); foot.innerHTML = '';
    var ck = this._btn('rd-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || !!this._busy;
    ck.addEventListener('click', function () { self._check(); }); foot.appendChild(ck);
  },

  /* ---- a cabinet front: the numeral over its drawers, or the group as packs and loose counters ---- */
  _face: function (n, side, d, r, small) {
    var C = RodDrawersCore, el = this.api.el('div', 'rd-face');
    if (r.level === 'groups') {
      var f = C.DATA.FRUIT[r.fruit], col = f[2], packs = Math.floor(n / 10), loose = n % 10, g = '', i, k, sz = small ? Math.max(7, d.counter - 2) : d.counter;
      for (i = 0; i < packs; i++) { g += '<span class="rd-pack" style="grid-template-columns:repeat(5,' + sz + 'px)">'; for (k = 0; k < 10; k++) g += '<i style="width:' + sz + 'px;height:' + sz + 'px;background:' + col + '"></i>'; g += '</span>'; }
      if (loose) { g += '<span class="rd-loose" style="grid-template-columns:repeat(5,' + sz + 'px)">'; for (k = 0; k < loose; k++) g += '<i style="width:' + sz + 'px;height:' + sz + 'px;background:' + col + '"></i>'; g += '</span>'; }
      el.innerHTML = g; el.className = 'rd-face is-group';
    } else {
      var txt = this._fmt(n), px = small ? Math.round(d.digitPx * 0.72) : d.digitPx;
      el.innerHTML = '<span class="rd-num ' + (side === 'L' ? 'is-l' : 'is-r') + '" style="font-size:' + px + 'px">' + txt + '</span>';
    }
    return el;
  },
  _fruitPic: function (r, size) {
    var C = RodDrawersCore, f = C.DATA.FRUIT[r.fruit], th = f && this._pics[f[0]];
    var box = this.api.el('span', 'rd-fruit'); box.style.width = box.style.height = size + 'px';
    if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, f[1], this._loc(), { size: size }); im.className = 'rd-fruitpic'; im.alt = ''; im.style.width = im.style.height = size + 'px'; box.appendChild(im); }
    return box;
  },
  _placeName: function (r, p) {
    var four = r.places === 4, names = four ? ['plTh', 'plH', 'plT', 'plO'] : ['plT', 'plO'];
    return this._t(names[p]);
  },
  _placeIcon: function (r, p) {
    /* from the right: ones = a cube, tens = a rod, hundreds = a flat, thousands = a big cube; groups: a pack of ten, a single counter */
    var fromRight = r.places - 1 - p, C = RodDrawersCore;
    if (r.level === 'groups') {
      var col = C.DATA.FRUIT[r.fruit][2];
      if (fromRight === 1) { var s = ''; for (var i = 0; i < 10; i++) s += '<circle cx="' + (9 + (i % 5) * 7) + '" cy="' + (16 + Math.floor(i / 5) * 8) + '" r="3" fill="' + col + '" stroke="#3A2E1F" stroke-width="1"/>'; return '<svg viewBox="0 0 46 40" aria-hidden="true"><rect x="3" y="9" width="40" height="22" rx="4" fill="#FFFDF7" stroke="#3A2E1F" stroke-width="2"/>' + s + '</svg>'; }
      return '<svg viewBox="0 0 46 40" aria-hidden="true"><circle cx="23" cy="20" r="8" fill="' + col + '" stroke="#3A2E1F" stroke-width="2"/></svg>';
    }
    if (fromRight === 0) return '<svg viewBox="0 0 46 40" aria-hidden="true"><rect x="16" y="13" width="14" height="14" rx="2" fill="#1E8A78" stroke="#0F4F45" stroke-width="2"/></svg>';
    if (fromRight === 1) { var t = '<svg viewBox="0 0 46 40" aria-hidden="true"><rect x="18" y="2" width="10" height="36" rx="2" fill="#1E8A78" stroke="#0F4F45" stroke-width="2"/>'; for (var j = 1; j < 10; j++) t += '<line x1="18" x2="28" y1="' + (2 + j * 3.6) + '" y2="' + (2 + j * 3.6) + '" stroke="#5FC2AF" stroke-width="1"/>'; return t + '</svg>'; }
    if (fromRight === 2) { var q = '<svg viewBox="0 0 46 40" aria-hidden="true"><rect x="7" y="4" width="32" height="32" rx="2" fill="#1E8A78" stroke="#0F4F45" stroke-width="2"/>'; for (var k = 1; k < 10; k++) q += '<line x1="' + (7 + k * 3.2) + '" x2="' + (7 + k * 3.2) + '" y1="4" y2="36" stroke="#5FC2AF" stroke-width="0.8"/><line y1="' + (4 + k * 3.2) + '" y2="' + (4 + k * 3.2) + '" x1="7" x2="39" stroke="#5FC2AF" stroke-width="0.8"/>'; return q + '</svg>'; }
    return '<svg viewBox="0 0 46 40" aria-hidden="true"><path d="M10 14 L23 7 L36 14 L36 30 L23 37 L10 30 Z" fill="#1E8A78" stroke="#0F4F45" stroke-width="2"/><path d="M10 14 L23 21 L36 14 M23 21 L23 37" fill="none" stroke="#5FC2AF" stroke-width="2"/></svg>';
  },
  _lockSvg: function (kind) {
    if (kind === 'sealed') return '<svg class="rd-lock is-sealed" viewBox="0 0 22 24" aria-hidden="true"><path d="M6 11 V7 a5 5 0 0 1 10 0 V11" fill="none" stroke="#3A2E1F" stroke-width="2.4"/><rect x="2" y="10" width="18" height="13" rx="3" fill="#E9B949" stroke="#3A2E1F" stroke-width="2"/><path d="M6.5 16.5 L9.5 19.5 L15.5 13.5" fill="none" stroke="#146B5E" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return '<svg class="rd-lock" viewBox="0 0 22 24" aria-hidden="true"><path d="M6 11 V7 a5 5 0 0 1 10 0 V11" fill="none" stroke="#3A2E1F" stroke-width="2.4"/><rect x="2" y="10" width="18" height="13" rx="3" fill="#B9AE9C" stroke="#3A2E1F" stroke-width="2"/><circle cx="11" cy="16.5" r="2" fill="#3A2E1F"/></svg>';
  },
  _signSvg: function (s) {
    var ink = '#3A2E1F';
    if (s === '<') return '<svg viewBox="0 0 60 50" aria-hidden="true"><path d="M50 8 L12 25 L50 42" fill="none" stroke="' + ink + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    if (s === '>') return '<svg viewBox="0 0 60 50" aria-hidden="true"><path d="M10 8 L48 25 L10 42" fill="none" stroke="' + ink + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    if (s === '=') return '<svg viewBox="0 0 60 50" aria-hidden="true"><path d="M10 17 H50 M10 33 H50" fill="none" stroke="' + ink + '" stroke-width="7" stroke-linecap="round"/></svg>';
    return '<svg viewBox="0 0 60 50" aria-hidden="true"><path d="M10 38 H50" fill="none" stroke="#B9AE9C" stroke-width="7" stroke-linecap="round"/><path d="M14 30 L46 30" fill="none" stroke="#D8CFBF" stroke-width="5" stroke-linecap="round"/></svg>';
  },
  /* a value column to scale: rods of ten stacked, the ones on top (a striped strip of cubes) */
  _column: function (n, showT, showO, unit, labels, cls) {
    var col = this.api.el('div', 'rd-col' + (cls ? ' ' + cls : '')), t = Math.floor(n / 10), o = n % 10, i, h = 0;
    col.setAttribute('aria-hidden', 'true');
    if (showO && o) { var on = this.api.el('span', 'rd-ones'); on.style.height = (o * unit) + 'px'; on.style.backgroundSize = '100% ' + unit + 'px'; col.appendChild(on); h += o * unit; }
    if (showT) for (i = t - 1; i >= 0; i--) {
      var rod = this.api.el('span', 'rd-rodv'); rod.style.height = (10 * unit) + 'px';
      if (labels) { var lb = document.createElement('i'); lb.className = 'rd-tlabel'; lb.textContent = String(10 * (i + 1)); rod.appendChild(lb); }
      col.appendChild(rod); h += 10 * unit;
    }
    if (labels && (showT || showO)) { var top = document.createElement('i'); top.className = 'rd-toplabel'; top.textContent = String(n); col.insertBefore(top, col.firstChild); }
    col.style.height = h + 'px';
    return col;
  },

  /* ---------------- compare ---------------- */
  _paintCompare: function (d, L) {
    var C = RodDrawersCore, st = this.st, r = st.r, v = this._view, self = this, four = r.places === 4;
    var shown = !!(v.checked && (st.show > 0 || st.done)), reveal = st.reveal || st.done, strong = st.show >= 2 && !st.done;
    var stage = this._q('.rd-stage'); stage.innerHTML = ''; stage.className = 'rd-stage is-compare';
    var nums = { L: r.a, R: r.b }, opened = function (p) { return reveal || st.open[p]; };
    var cab = function (side) {
      var n = nums[side], box = self.api.el('div', 'rd-cabwrap is-' + side.toLowerCase());
      if (r.level === 'groups') box.appendChild(self._fruitPic(r, d.pic));
      var c = self.api.el('div', 'rd-cab' + (st.done ? ' is-bow' : '')); c.style.width = d.cabW + 'px';
      c.setAttribute('role', 'group'); c.setAttribute('aria-label', self._t(r.level === 'groups' ? 'ariaGroup' : 'ariaCab', { n: self._fmt(n) }));
      c.appendChild(self._face(n, side, d, r));
      /* four-digit: each opened drawer pair raises a tower of that place's blocks over its drawer */
      if (four) {
        var tw = self.api.el('div', 'rd-towers'), dg = C.digits(n, 4);
        for (var p = 0; p < 4; p++) {
          var t = self.api.el('span', 'rd-tower' + (shown && p === r.decide ? ' is-decide' : ''));
          if (opened(p)) for (var k = 0; k < dg[p]; k++) { var b = document.createElement('i'); b.className = 'rd-blk is-p' + (3 - p); b.style.height = d.block + 'px'; t.appendChild(b); }
          tw.appendChild(t);
        }
        c.appendChild(tw);
      }
      var dr = self.api.el('div', 'rd-drawers');
      for (var q = 0; q < r.places; q++) {
        var lk = C.lockOf(st, q), isOpen = opened(q);
        var dw = self.api.el('span', 'rd-drawer' + (isOpen ? ' is-open' : '') + (shown && (q === r.decide || (r.decide < 0)) ? ' is-decide' : ''));
        if (!isOpen && (lk === 'locked' || lk === 'sealed') && q > 0) dw.innerHTML = self._lockSvg(lk);
        dr.appendChild(dw);
      }
      c.appendChild(dr); box.appendChild(c); return box;
    };
    var colFor = function (side) {
      var n = nums[side], tP = 0, oP = 1;
      return self._column(n, opened(tP), opened(oP), d.unit, strong, 'is-' + side.toLowerCase());
    };
    stage.appendChild(cab('L'));
    if (!four) stage.appendChild(colFor('L'));
    var mid = this.api.el('div', 'rd-mid'); mid.style.width = d.mid + 'px';
    var ready = C.signReady(st);
    var signLbl = this._t('ariaSign', { s: this._t({ '<': 'sLess', '>': 'sGreater', '=': 'sEqual', flat: 'sFlat' }[st.sign]) });
    var sg = this._btn('rd-sign' + (ready ? ' is-up' : '') + (shown && !st.done && four ? ' is-wobble' : '') + (st.done ? ' is-pinned' : '') + (st.done && !four ? ' is-hidden' : ''), 'sign', signLbl, this._signSvg(st.sign) + (ready && !st.done ? '<span class="rd-turn" aria-hidden="true">⟲</span>' : ''));
    sg.disabled = !ready || st.done || !!this._busy;
    sg.addEventListener('click', function () { self._turn(); });
    mid.appendChild(sg); stage.appendChild(mid);
    if (!four) stage.appendChild(colFor('R'));
    stage.appendChild(cab('R'));
    /* the grab: the sign stretched between the two columns */
    if (reveal && !four) this._grab(stage, shown, strong);
    /* the knobs: one per place, linked under the podium */
    var kn = this._q('.rd-knobs'); kn.innerHTML = ''; kn.style.display = '';
    for (var p = 0; p < r.places; p++) (function (p) {
      var lk = C.lockOf(st, p), name = self._placeName(r, p);
      var lbl = self._t(lk === 'open' ? 'stOpen' : lk === 'sealed' ? 'stSealed' : lk === 'locked' ? 'stLocked' : 'stFree', { p: name });
      var b = self._btn('rd-knob is-' + lk + (v.rattle === p ? ' is-rattle' : '') + (shown && (p === r.decide) ? ' is-decide' : ''), 'pull-' + p, lbl, self._placeIcon(r, p) + (lk === 'locked' || lk === 'sealed' ? self._lockSvg(lk) : ''));
      b.disabled = st.done || !!self._busy;
      b.addEventListener('click', function () { self._pull(p); });
      kn.appendChild(b);
    })(p);
  },
  _grab: function (stage, shown, strong) {
    var st = this.st, r = st.r, cl = stage.querySelector('.rd-col.is-l'), cr = stage.querySelector('.rd-col.is-r'); if (!cl || !cr) return;
    var S = stage.getBoundingClientRect(), A = cl.getBoundingClientRect(), B = cr.getBoundingClientRect();
    var floor = Math.max(A.bottom, B.bottom) - S.top, hL = A.height, hR = B.height, xL = A.right - S.left + 6, xR = B.left - S.left - 6;
    if (xR - xL < 20) return;
    var big = Math.max(hL, hR), ok = st.done, ink = ok ? '#146B5E' : '#E0603A', s = st.sign, path = '', w = 6;
    if (s === '<' || s === '>') {
      var pX = s === '<' ? xL : xR, oX = s === '<' ? xR : xL, pH = s === '<' ? hL : hR;
      path = '<path d="M' + oX + ' ' + (floor - big) + ' L' + pX + ' ' + (floor - pH / 2) + ' L' + oX + ' ' + floor + '" fill="none" stroke="' + ink + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>';
    } else if (s === '=') {
      path = '<path d="M' + xL + ' ' + (floor - hL) + ' L' + xR + ' ' + (floor - hR) + ' M' + xL + ' ' + (floor - hL + 14) + ' L' + xR + ' ' + (floor - hR + 14) + '" fill="none" stroke="' + ink + '" stroke-width="' + w + '" stroke-linecap="round"/>';
    }
    if (strong && hL !== hR) { var hs = Math.min(hL, hR); path += '<path class="rd-gap" d="M' + (hL < hR ? A.left - S.left : xL) + ' ' + (floor - hs) + ' L' + (hL < hR ? xR : B.right - S.left) + ' ' + (floor - hs) + '" fill="none" stroke="#3A2E1F" stroke-width="2" stroke-dasharray="3 5"/>'; }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'rd-grab' + (shown && !ok ? ' is-wobble' : '') + (ok ? ' is-pinned' : ''));
    svg.setAttribute('width', S.width); svg.setAttribute('height', S.height); svg.setAttribute('viewBox', '0 0 ' + S.width + ' ' + S.height); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = path; stage.appendChild(svg);
  },

  /* ---------------- order: three cabinets and a staircase ---------------- */
  _paintOrder: function (d, L) {
    var C = RodDrawersCore, st = this.st, r = st.r, v = this._view, self = this, four = r.places === 4;
    var shown = !!(v.checked && (st.show > 0 || st.done)), strong = st.show >= 2 && !st.done, cols = shown || st.done;
    var stage = this._q('.rd-stage'); stage.innerHTML = ''; stage.className = 'rd-stage is-order';
    this._q('.rd-knobs').style.display = 'none';
    var stair = this.api.el('div', 'rd-stair'), dirIcon = this.api.el('span', 'rd-dir is-' + r.dir);
    dirIcon.innerHTML = r.dir === 'up' ? '<i style="width:8px;height:8px"></i><i style="width:13px;height:13px"></i><i style="width:19px;height:19px"></i>' : '<i style="width:19px;height:19px"></i><i style="width:13px;height:13px"></i><i style="width:8px;height:8px"></i>';
    dirIcon.setAttribute('role', 'img'); dirIcon.setAttribute('aria-label', this._t(r.dir === 'up' ? 'ariaUp' : 'ariaDown'));
    var top = this.api.el('div', 'rd-stairtop'); top.appendChild(dirIcon);
    /* groups: the fruit names the groups once, full size, beside the direction (never shrunk onto the cards) */
    if (r.level === 'groups') top.appendChild(this._fruitPic(r, d.pic));
    stair.appendChild(top);
    var cardEl = function (i, where) {
      var n = r.cards[i], b = self._btn('rd-card' + (self._sel === i ? ' is-sel' : '') + (st.done ? ' is-bow' : '') + (st.last && st.last.culprit === i && shown ? ' is-back' : ''), 'card-' + i, self._t(r.level === 'groups' ? 'ariaGroup' : 'ariaCab', { n: self._fmt(n) }));
      b.style.width = Math.min(d.stepW - 8, L.wide ? 130 : 96) + 'px';
      b.appendChild(self._face(n, i % 2 ? 'R' : 'L', d, r, true));
      var dr = self.api.el('span', 'rd-drawers is-mini'); for (var q = 0; q < r.places; q++) dr.appendChild(self.api.el('span', 'rd-drawer' + (cols ? ' is-open' : ''))); b.appendChild(dr);
      b.disabled = st.done || !!self._busy;
      b.addEventListener('click', function () { if (self._dragged) { self._dragged = false; return; } self._tapCard(i); });
      b.addEventListener('pointerdown', function (e) { self._dragStart(e, i, b); });
      return b;
    };
    var steps = this.api.el('div', 'rd-steps');
    for (var s = 0; s < 3; s++) (function (s) {
      var lift = (r.dir === 'up' ? s : 2 - s) * (L.wide ? 34 : 22);
      var col = self.api.el('div', 'rd-stepcol'); col.style.width = d.stepW + 'px';
      var card = st.steps[s];
      if (cols && card != null) {
        var n = r.cards[card];
        /* four-digit: no skyline — place towers are not to scale, so a tall hundreds tower would out-shout a smaller thousands digit */
        if (!four) col.appendChild(self._column(n, true, true, d.ordUnit, strong, 'is-sky'));
      }
      if (card != null) col.appendChild(cardEl(card, 'step'));
      else { var eb = self._btn('rd-step', 'step-' + s, self._t('ariaStep', { i: s + 1 })); eb.disabled = st.done || self._sel == null; eb.addEventListener('click', function () { self._tapStep(s); }); eb.setAttribute('data-drop', 'step-' + s); col.appendChild(eb); }
      var block = self.api.el('span', 'rd-stepblock'); block.style.height = (12 + lift) + 'px'; col.appendChild(block);
      col.setAttribute('data-drop', 'step-' + s);
      steps.appendChild(col);
    })(s);
    stair.appendChild(steps); stage.appendChild(stair);
    /* the waiting row */
    var wait = this.api.el('div', 'rd-wait' + (st.done ? ' is-done' : '')); wait.setAttribute('role', 'group'); wait.setAttribute('aria-label', this._t('ariaWait'));
    for (var i = 0; i < 3; i++) (function (i) {
      var slot = self.api.el('div', 'rd-waitslot'); slot.style.width = d.stepW + 'px'; slot.setAttribute('data-drop', 'wait');
      if (st.steps.indexOf(i) < 0) slot.appendChild(cardEl(i, 'wait'));
      else { var wb = self._btn('rd-waitbtn', 'wait-' + i, self._t('ariaWait')); wb.disabled = st.done || self._sel == null || st.steps.indexOf(self._sel) < 0; wb.setAttribute('data-drop', 'wait'); wb.addEventListener('click', function () { self._tapWait(); }); slot.appendChild(wb); }
      wait.appendChild(slot);
    })(i);
    stage.appendChild(wait);
  },

  /* ---------------- actions ---------------- */
  _edit: function () { this._clearTimers(); this._busy = false; this._view = {}; this._paint(); },
  _pull: function (p) {
    var st = this.st, self = this; if (this._busy || st.done) return;
    var res = RodDrawersCore.openPlace(st, p); if (!res) return;
    if (res.result === 'rattle') { this._clearTimers(); this._view = { rattle: p }; this.api.sound(130); this._paint(); if (!this.FAST) this._later(function () { self._view.rattle = null; self._paint(); }, 400); return; }
    if (res.result === 'opened') { this.api.sound(res.sealed.length ? 300 : 520); this._edit(); }
  },
  _turn: function () { if (this._busy || this.st.done) return; if (RodDrawersCore.turn(this.st)) { this.api.sound(660); this._edit(); } },
  _tapCard: function (i) {
    var st = this.st, C = RodDrawersCore; if (this._busy || st.done) return;
    var at = st.steps.indexOf(i);
    if (this._sel != null && this._sel !== i && at >= 0) { C.placeCard(st, this._sel, at); this._sel = null; this.api.sound(480); this._edit(); return; }
    this._sel = this._sel === i ? null : i; this.api.sound(560); this._view = {}; this._paint();
  },
  _tapStep: function (s) {
    var st = this.st; if (this._busy || st.done || this._sel == null) return;
    if (RodDrawersCore.placeCard(st, this._sel, s)) { this._sel = null; this.api.sound(480); this._edit(); }
  },
  _tapWait: function () {
    var st = this.st; if (this._busy || st.done || this._sel == null) return;
    if (RodDrawersCore.unplace(st, this._sel)) { this._sel = null; this.api.sound(400); this._edit(); }
  },
  /* drag a cabinet: past 6 px a ghost follows the pointer; it lands on a step or back in the waiting row */
  _dragStart: function (e, i, el) {
    var self = this, st = this.st; if (this._busy || st.done || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, y0 = e.clientY, ghost = null, moved = false;
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 6) return;
      if (!moved) { moved = true; ghost = el.cloneNode(true); ghost.className += ' rd-ghost'; var R = el.getBoundingClientRect(); ghost.style.width = R.width + 'px'; document.body.appendChild(ghost); }
      ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!moved) return;
      self._dragged = true; if (ghost) ghost.remove();
      var hit = document.elementsFromPoint(ev.clientX, ev.clientY).map(function (n) { return n.closest && n.closest('[data-drop]'); }).filter(Boolean)[0];
      var where = hit && hit.getAttribute('data-drop'), C = RodDrawersCore;
      if (where && where.indexOf('step-') === 0) { if (C.placeCard(st, i, +where.slice(5))) { self._sel = null; self.api.sound(480); self._edit(); return; } }
      else if (where === 'wait') { if (C.unplace(st, i)) { self._sel = null; self.api.sound(400); self._edit(); return; } }
      self._paint();
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _check: function () {
    var C = RodDrawersCore, st = this.st, r = st.r;
    if (this._busy || st.done) return;
    this._sel = null;
    var a = C.check(st); if (!a) return;
    if (a.result === 'none') { this._view = { checked: true }; this.api.sound(200); this._paint(); this.api.announce(this._q('.rd-note').textContent || ''); return; }
    this._view = { checked: true };
    if (a.result === 'ok') {
      var msg = this._okText(r); this._view.msg = msg; this.api.sound(880); this._paint(); this.api.announce(msg);
      this._advance(msg.length * 60 + 2400);
    } else { this.api.sound(220); this._paint(); this.api.announce(this._q('.rd-note').textContent || ''); }
  },
  _okText: function (r) {
    if (r.task === 'order') { var w = RodDrawersCore.sortedCards(r), f = this._fmt.bind(this); return this._t(r.dir === 'up' ? 'okUp' : 'okDown', { x: f(w[0]), y: f(w[1]), z: f(w[2]) }); }
    return this._t(r.rel === '>' ? 'okGreater' : r.rel === '<' ? 'okLess' : 'okEqual', { a: this._fmt(r.a), b: this._fmt(r.b) });
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var rdCssDone = false;
function injectRodCSS() {
  if (rdCssDone || typeof document === 'undefined') return;
  rdCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.rd-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .rd-wrap:focus{outline:none;}'
  /* the podium */
  + '.rd-stage{position:relative;width:100%;max-width:700px;box-sizing:border-box;}'
  + '.rd-stage.is-compare{display:flex;align-items:flex-end;justify-content:center;gap:6px;padding:8px 6px 10px;border-bottom:6px solid #8A6B42;border-radius:0 0 4px 4px;background:linear-gradient(180deg,transparent 0,transparent calc(100% - 10px),#E9D9BE calc(100% - 10px));}'
  + '.rd-cabwrap{display:flex;flex-direction:column;align-items:center;gap:4px;flex:none;}'
  + '.rd-fruit{display:block;flex:none;} .rd-fruitpic{display:block;}'
  + '.rd-cab{display:flex;flex-direction:column;align-items:stretch;gap:6px;padding:8px;box-sizing:border-box;border-radius:12px 12px 6px 6px;background:#E2C99B;box-shadow:inset 0 0 0 3px #3A2E1F,0 4px 0 #8A6B42;transition:transform .2s;}'
  + '.rd-cab.is-bow{animation:rdBow .5s ease-in-out 1;} @keyframes rdBow{50%{transform:translateY(4px);}}'
  + '.rd-face{display:flex;align-items:center;justify-content:center;min-height:64px;padding:4px;border-radius:8px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42;}'
  + '.rd-num{font-family:' + H + ';font-weight:800;line-height:1;letter-spacing:.04em;white-space:nowrap;} .rd-num.is-l{color:#146B5E;} .rd-num.is-r{color:#C4532A;}'
  + '.rd-face.is-group{flex-direction:column;gap:3px;padding:5px;} .rd-pack{display:grid;gap:2px;padding:2px;border-radius:4px;background:#F6ECD6;box-shadow:inset 0 0 0 2px #3A2E1F;} .rd-loose{display:grid;gap:2px;padding:2px;} .rd-pack i,.rd-loose i{display:block;border-radius:50%;box-shadow:inset 0 0 0 1.5px #3A2E1F;}'
  + '.rd-drawers{display:flex;gap:4px;} .rd-drawer{position:relative;flex:1;height:30px;border-radius:5px;background:#C9A86E;box-shadow:inset 0 0 0 2px #3A2E1F;transition:transform .22s;} .rd-drawer::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#8A6B42;box-shadow:inset 0 0 0 2px #3A2E1F;}'
  + '.rd-drawer.is-open{transform:translateY(6px);background:#F4E2BC;} .rd-drawer.is-decide{box-shadow:inset 0 0 0 2px #3A2E1F,0 0 0 3px #F4CF62,0 0 10px #F4CF62;}'
  + '.rd-drawer .rd-lock{position:absolute;right:-4px;top:-10px;width:18px;height:20px;z-index:1;}'
  + '.rd-drawers.is-mini .rd-drawer{height:12px;} .rd-drawers.is-mini .rd-drawer::after{width:6px;height:6px;margin:-3px 0 0 -3px;}'
  + '.rd-towers{display:flex;gap:4px;align-items:flex-end;min-height:20px;} .rd-tower{flex:1;display:flex;flex-direction:column-reverse;align-items:center;gap:1px;border-radius:3px;} .rd-tower.is-decide{box-shadow:0 0 0 3px #F4CF62;}'
  + '.rd-blk{display:block;width:80%;border-radius:2px;background:#1E8A78;box-shadow:inset 0 0 0 1.5px #0F4F45;} .rd-blk.is-p3{width:96%;background:#146B5E;} .rd-blk.is-p2{width:88%;} .rd-blk.is-p1{width:60%;} .rd-blk.is-p0{width:40%;background:#5FC2AF;}'
  + '.rd-towers.is-mini{width:80%;margin:0 auto 4px;}'
  /* the value columns */
  + '.rd-col{position:relative;display:flex;flex-direction:column;justify-content:flex-end;width:26px;flex:none;align-self:flex-end;} .rd-wrap.is-narrow .rd-col{width:18px;}'
  + '.rd-rodv{position:relative;display:block;box-sizing:border-box;width:100%;border-radius:3px;background:repeating-linear-gradient(180deg,#1E8A78 0,#1E8A78 calc(10% - 1px),#5FC2AF calc(10% - 1px),#5FC2AF 10%);box-shadow:inset 0 0 0 2px #0F4F45;}'
  + '.rd-ones{display:block;width:100%;border-radius:2px;background-image:linear-gradient(180deg,#F2784B 0,#F2784B calc(100% - 1px),#FFE7D9 calc(100% - 1px));box-shadow:inset 0 0 0 1.5px #9C3F1E;}'
  + '.rd-tlabel{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:1;padding:0 3px;border-radius:4px;background:#3A2E1F;font-style:normal;font-family:' + H + ';font-weight:800;font-size:11px;line-height:14px;color:#FFFDF7;white-space:nowrap;}'
  + '.rd-toplabel{position:absolute;left:50%;bottom:calc(100% + 3px);transform:translateX(-50%);padding:0 4px;border-radius:5px;background:#146B5E;font-style:normal;font-family:' + H + ';font-weight:800;font-size:13px;line-height:17px;color:#FFFDF7;white-space:nowrap;}'
  /* the sign */
  + '.rd-mid{display:flex;align-items:center;justify-content:center;flex:none;align-self:center;}'
  + '.rd-sign{position:relative;z-index:2;width:64px;height:58px;border:0;padding:4px;border-radius:12px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #3A2E1F,0 3px 0 #C9B79A;cursor:pointer;} .rd-sign svg{width:100%;height:100%;display:block;}'
  + '.rd-sign:disabled{cursor:default;background:#F2EBDD;box-shadow:inset 0 0 0 2px #B9AE9C;} .rd-sign.is-up{background:#FFFDF7;} .rd-sign.is-hidden{visibility:hidden;}'
  + '.rd-turn{position:absolute;right:-8px;bottom:-8px;width:22px;height:22px;border-radius:50%;background:#1E8A78;color:#fff;font-size:14px;line-height:22px;text-align:center;box-shadow:0 0 0 2px #FFFDF7;}'
  + '.rd-sign.is-wobble{animation:rdWob .45s ease-in-out 1;} .rd-sign.is-pinned{box-shadow:inset 0 0 0 3px #146B5E,0 0 0 3px #F4CF62;}'
  + '.rd-grab{position:absolute;left:0;top:0;z-index:1;pointer-events:none;overflow:visible;} .rd-grab.is-wobble{animation:rdWob .45s ease-in-out 1;} @keyframes rdWob{25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  /* the knobs (one per place, linked) */
  + '.rd-knobs{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}'
  + '.rd-knob{position:relative;width:64px;height:56px;border:0;padding:4px;border-radius:14px;background:#E2C99B;box-shadow:inset 0 0 0 3px #3A2E1F,0 4px 0 #8A6B42;cursor:pointer;} .rd-knob svg{width:100%;height:100%;display:block;}'
  + '.rd-knob .rd-lock{position:absolute;right:-6px;top:-8px;width:22px;height:24px;} .rd-knob.is-open{background:#F4E2BC;transform:translateY(3px);box-shadow:inset 0 0 0 3px #3A2E1F,0 1px 0 #8A6B42;} .rd-knob.is-locked,.rd-knob.is-sealed{background:#D8CFBF;}'
  + '.rd-knob.is-rattle{animation:rdRat .2s linear 2;} @keyframes rdRat{25%{transform:rotate(-6deg);}75%{transform:rotate(6deg);}} .rd-knob.is-decide{box-shadow:inset 0 0 0 3px #3A2E1F,0 0 0 4px #F4CF62;} .rd-knob:disabled{cursor:default;}'
  /* order: the staircase and the waiting row */
  + '.rd-stair{position:relative;width:100%;padding-top:6px;} .rd-dir{display:flex;align-items:flex-end;gap:3px;padding:4px 6px;border-radius:8px;background:#FFFDF7;box-shadow:inset 0 0 0 2px #8A6B42;z-index:1;} .rd-dir i{display:block;border-radius:50%;background:#146B5E;}'
  + '.rd-steps{display:flex;justify-content:center;align-items:flex-end;gap:4px;padding-top:8px;}'
  + '.rd-stepcol{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;}'
  + '.rd-stepblock{display:block;width:100%;border-radius:6px 6px 0 0;background:#C9A86E;box-shadow:inset 0 0 0 3px #3A2E1F;}'
  + '.rd-step,.rd-waitbtn{width:86%;min-height:84px;border:3px dashed #B9AE9C;border-radius:12px;background:rgba(255,253,247,.5);cursor:pointer;} .rd-step:disabled,.rd-waitbtn:disabled{cursor:default;} .rd-wrap.is-wide .rd-step,.rd-wrap.is-wide .rd-waitbtn{min-height:110px;}'
  + '.rd-col.is-sky{width:24px;margin-bottom:-2px;}'
  + '.rd-card{display:flex;flex-direction:column;align-items:center;gap:3px;border:0;padding:5px;border-radius:10px;background:#E2C99B;box-shadow:inset 0 0 0 3px #3A2E1F,0 3px 0 #8A6B42;cursor:grab;touch-action:none;} .rd-card .rd-face{min-height:44px;width:100%;box-sizing:border-box;} .rd-card .rd-drawers{width:100%;}'
  + '.rd-card.is-sel{box-shadow:inset 0 0 0 3px #3A2E1F,0 0 0 4px #F4CF62;transform:translateY(-4px);} .rd-card.is-bow{animation:rdBow .5s ease-in-out 1;} .rd-card.is-back{animation:rdHop .45s ease-out 1;box-shadow:inset 0 0 0 3px #E0603A,0 0 0 3px #E0603A;} @keyframes rdHop{40%{transform:translateY(-14px);}}'
  + '.rd-card:disabled{cursor:default;} .rd-ghost{position:fixed;z-index:50;pointer-events:none;opacity:.9;}'
  + '.rd-wait.is-done{display:none;} .rd-stairtop{display:flex;align-items:center;gap:12px;padding:0 4px;} .rd-wait{display:flex;justify-content:center;gap:4px;margin-top:14px;padding:10px 0;border-top:2px dashed #C9B79A;width:100%;} .rd-waitslot{display:flex;justify-content:center;}'
  /* Check + the bubble */
  + '.rd-check{min-height:52px;padding:6px 28px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;cursor:pointer;} .rd-check:disabled{opacity:.5;cursor:default;}'
  + '.rd-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:3px;}'
  + '.rd-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .rd-note:empty{display:none;} .rd-note.is-hint{color:#B5461F;} .rd-note.is-ok{color:#146B5E;}'
  /* phones */
  + '.rd-wrap.is-narrow .rd-note{font-size:17px;} .rd-wrap.is-narrow{gap:10px;} .rd-wrap.is-narrow .rd-cab{padding:5px;gap:4px;} .rd-wrap.is-narrow .rd-face{min-height:48px;} .rd-wrap.is-narrow .rd-drawer{height:22px;} .rd-wrap.is-narrow .rd-knob{width:56px;height:52px;}'
  + '.rd-wrap.is-narrow .rd-sign{width:52px;height:50px;} .rd-wrap.is-narrow .rd-card{padding:4px;} .rd-wrap.is-narrow .rd-card .rd-face{min-height:36px;} .rd-wrap.is-narrow .rd-col.is-sky{width:16px;}'
  + '.rd-wrap.is-tiny{gap:8px;} .rd-wrap.is-tiny .rd-face{min-height:40px;} .rd-wrap.is-tiny .rd-knobs{gap:6px;} .rd-wrap.is-tiny .rd-knob{width:50px;height:48px;}'
  + '.rd-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.rd-note,.rd-foot,.rd-knobs{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.rd-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'rd-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.RodDrawersActivity = RodDrawersActivity;
