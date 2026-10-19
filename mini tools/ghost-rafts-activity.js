/* =====================================================================
   ghost-rafts-activity.js — ACTIVITY #31 of the one-by-one rebuild:
   "Dewey's Ten-Tank" (K.NBT.A.1) — THE GHOST RAFTS.
   Design sheet: docs/activities-rebuild/designs/031-ten-tank.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: the bubbles drift too much to count in place, so you
   catch ten on Dewey's raft — the tenth seals them into ONE raft and every
   bubble still loose hooks onto its tow-line in a row. Then any number card
   you drop on the record builds its GHOST in the bay beside the tank: 31 is
   three ghost rafts and one bubble, 3 is three bubbles and no raft at all.
   Five round kinds: catch, dock (a ready raft from the reeds), fix, pop
   (the number stays the same), two tanks. "Ghost bay" is open play.

   ACTIVITY LAYER ONLY: the model is ghost-rafts-core.js and the number words
   are ghost-rafts-words.js (generated from the worksheets' tables);
   lcs-shell.js is untouched (its Check is hidden and pressed by this
   activity when the round is complete). Test seams:
   window.GhostRaftsActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var GhostRaftsActivity = {
  id: 'ghost-rafts',
  apparatusClasses: ['gr-'],

  strings: {
    title:        {en:'Dewey’s Ten-Tank',de:'Deweys Zehner-Tank',fr:'Le réservoir de Dewey',it:'La vasca di Dewey',es:'El tanque de decenas de Dewey',pt:'O tanque do Dudu',nl:'De tank van Dobber',sv:'Kvacks tiotalstank',da:'Rappes tiertank',no:'Kvakks tiertank',fi:'Kvaakin kymppiallas'},
    instruction:  {en:'Catch ten bubbles on Dewey’s raft. Ten bubbles seal into one ten-raft; the rest are the “and some more”.',de:'Fang zehn Blasen auf Deweys Floß. Zehn Blasen werden zu einem Zehner-Floß, die übrigen sind die Einer dazu.',fr:'Attrape dix bulles sur le radeau de Dewey. Dix bulles se soudent en un radeau-dizaine ; les autres sont les unités en plus.',it:'Prendi dieci bolle sulla zattera di Dewey. Dieci bolle si uniscono in una zattera-decina; le altre sono le unità in più.',es:'Atrapa diez burbujas en la balsa de Dewey. Diez burbujas se juntan en una balsa-decena; las demás son las unidades de más.',pt:'Pegue dez bolhas na jangada do Dudu. Dez bolhas se juntam numa jangada-dezena; as outras são as unidades a mais.',nl:'Vang tien belletjes op het vlot van Dobber. Tien belletjes worden samen één tientalvlot; de rest zijn de enen erbij.',sv:'Fånga tio bubblor på Kvacks flotte. Tio bubblor blir en tiotalsflotte; resten är entalen som blir över.',da:'Fang ti bobler på Rappes flåde. Ti bobler bliver til én tierflåde; resten er enerne oveni.',no:'Fang ti bobler på flåten til Kvakk. Ti bobler blir til én tierflåte; resten er enerne i tillegg.',fi:'Ota kymmenen kuplaa Kvaakin lautalle. Kymmenestä kuplasta tulee yksi kymppilautta; loput ovat ylimääräisiä ykkösiä.'},
    promptCatch:  {en:'How many bubbles? Catch ten first.',de:'Wie viele Blasen? Fang zuerst zehn.',fr:'Combien de bulles ? Attrape d’abord dix bulles.',it:'Quante bolle? Prima prendine dieci.',es:'¿Cuántas burbujas? Primero atrapa diez.',pt:'Quantas bolhas? Pegue dez primeiro.',nl:'Hoeveel belletjes? Vang er eerst tien.',sv:'Hur många bubblor? Fånga tio först.',da:'Hvor mange bobler? Fang ti først.',no:'Hvor mange bobler? Fang ti først.',fi:'Montako kuplaa? Ota ensin kymmenen.'},
    promptDock:   {en:'Make {n} in the tank.',de:'Leg {n} in den Tank.',fr:'Fais {n} dans le réservoir.',it:'Forma {n} nella vasca.',es:'Forma {n} en el tanque.',pt:'Forme {n} no tanque.',nl:'Maak {n} in de tank.',sv:'Gör {n} i tanken.',da:'Lav {n} i tanken.',no:'Lag {n} i tanken.',fi:'Tee altaaseen {n}.'},
    promptFix:    {en:'Fix the tank so it shows {n}.',de:'Ändere den Tank, bis er {n} zeigt.',fr:'Arrange le réservoir pour qu’il montre {n}.',it:'Sistema la vasca perché mostri {n}.',es:'Arregla el tanque para que muestre {n}.',pt:'Arrume o tanque para ele mostrar {n}.',nl:'Maak de tank in orde zodat hij {n} laat zien.',sv:'Ändra i tanken så att den visar {n}.',da:'Ret tanken, så den viser {n}.',no:'Rett på tanken så den viser {n}.',fi:'Korjaa allas niin, että siinä on {n}.'},
    promptPop:    {en:'Pop the raft. How many bubbles now?',de:'Lass das Floß platzen. Wie viele Blasen sind es jetzt?',fr:'Fais éclater le radeau. Combien de bulles maintenant ?',it:'Fai scoppiare la zattera. Quante bolle ci sono adesso?',es:'Revienta la balsa. ¿Cuántas burbujas hay ahora?',pt:'Estoure a jangada. Quantas bolhas tem agora?',nl:'Laat het vlot knappen. Hoeveel belletjes zijn het nu?',sv:'Spräck flotten. Hur många bubblor är det nu?',da:'Få flåden til at springe. Hvor mange bobler er der nu?',no:'Få flåten til å sprekke. Hvor mange bobler er det nå?',fi:'Puhkaise lautta. Montako kuplaa nyt on?'},
    promptTwo:    {en:'Which tank has more?',de:'Welcher Tank hat mehr?',fr:'Quel réservoir en a le plus ?',it:'Quale vasca ne ha di più?',es:'¿Qué tanque tiene más?',pt:'Qual tanque tem mais?',nl:'Welke tank heeft er meer?',sv:'Vilken tank har flest?',da:'Hvilken tank har flest?',no:'Hvilken tank har flest?',fi:'Kummassa altaassa on enemmän?'},
    hintCatch:    {en:'Catch the bubbles on Dewey’s raft. Ten seats make a ten.',de:'Fang die Blasen auf Deweys Floß. Zehn Plätze sind ein Zehner.',fr:'Attrape les bulles sur le radeau de Dewey. Dix places font une dizaine.',it:'Prendi le bolle sulla zattera di Dewey. Dieci posti fanno una decina.',es:'Atrapa las burbujas en la balsa de Dewey. Diez lugares forman una decena.',pt:'Pegue as bolhas na jangada do Dudu. Dez lugares formam uma dezena.',nl:'Vang de belletjes op het vlot van Dobber. Tien plekjes maken een tiental.',sv:'Fånga bubblorna på Kvacks flotte. Tio platser blir ett tiotal.',da:'Fang boblerne på Rappes flåde. Ti pladser bliver til en tier.',no:'Fang boblene på flåten til Kvakk. Ti plasser blir en tier.',fi:'Ota kuplat Kvaakin lautalle. Kymmenen paikkaa tekee kympin.'},
    hintPop:      {en:'Press and hold the raft to pop it.',de:'Halte das Floß gedrückt, dann platzt es.',fr:'Appuie longtemps sur le radeau pour le faire éclater.',it:'Tieni premuta la zattera per farla scoppiare.',es:'Mantén presionada la balsa para reventarla.',pt:'Segure a jangada para estourá-la.',nl:'Houd het vlot ingedrukt om het te laten knappen.',sv:'Håll in flotten så spricker den.',da:'Hold fingeren på flåden, så springer den.',no:'Hold fingeren på flåten, så sprekker den.',fi:'Pidä lauttaa painettuna, niin se puhkeaa.'},
    hintDock:     {en:'Bring the raft from the reeds first.',de:'Hol zuerst das Floß aus dem Schilf.',fr:'Amène d’abord le radeau qui est dans les roseaux.',it:'Prima porta la zattera dalle canne.',es:'Primero trae la balsa de los juncos.',pt:'Primeiro traga a jangada dos juncos.',nl:'Haal eerst het vlot uit het riet.',sv:'Hämta flotten från vassen först.',da:'Hent først flåden i sivene.',no:'Hent flåten fra sivet først.',fi:'Tuo ensin lautta kaislikosta.'},
    hintGhost:    {en:'That card means {m}: look at its ghost. Does it match the tank?',de:'Diese Karte bedeutet {m}: Schau dir ihren Geist an. Passt er zum Tank?',fr:'Cette carte veut dire {m} : regarde son fantôme. Est-ce qu’il ressemble au réservoir ?',it:'Questo cartellino vuol dire {m}: guarda il suo fantasma. È uguale alla vasca?',es:'Esa tarjeta quiere decir {m}: mira su fantasma. ¿Se parece al tanque?',pt:'Esse cartão quer dizer {m}: olhe o fantasma dele. Ele é igual ao tanque?',nl:'Die kaart betekent {m}: kijk naar het spook ervan. Lijkt het op de tank?',sv:'Det kortet betyder {m}: titta på dess spöke. Ser det ut som tanken?',da:'Det kort betyder {m}: se på dets spøgelse. Ligner det tanken?',no:'Det kortet betyr {m}: se på spøkelset. Ligner det på tanken?',fi:'Tuo kortti tarkoittaa lukua {m}: katso sen haamua. Onko se samanlainen kuin allas?'},
    hintOneTen:   {en:'One ten and {k} more.',de:'Ein Zehner und {k} mehr.',fr:'Une dizaine et encore {k}.',it:'Una decina e ancora {k}.',es:'Una decena y {k} más.',pt:'Uma dezena e mais {k}.',nl:'Eén tiental en nog {k}.',sv:'Ett tiotal och {k} till.',da:'En tier og {k} til.',no:'En tier og {k} til.',fi:'Yksi kymppi ja {k} lisää.'},
    hintTenLoose: {en:'Ten loose bubbles and {k} more.',de:'Zehn lose Blasen und {k} mehr.',fr:'Dix bulles libres et encore {k}.',it:'Dieci bolle sciolte e ancora {k}.',es:'Diez burbujas sueltas y {k} más.',pt:'Dez bolhas soltas e mais {k}.',nl:'Tien losse belletjes en nog {k}.',sv:'Tio lösa bubblor och {k} till.',da:'Ti løse bobler og {k} til.',no:'Ti løse bobler og {k} til.',fi:'Kymmenen irtokuplaa ja {k} lisää.'},
    hintGhostMake:{en:'Make your tank look like the ghost.',de:'Mach deinen Tank so wie den Geist.',fr:'Fais que ton réservoir ressemble au fantôme.',it:'Fai in modo che la tua vasca sia come il fantasma.',es:'Haz que tu tanque se parezca al fantasma.',pt:'Deixe o seu tanque igual ao fantasma.',nl:'Maak je tank net zoals het spook.',sv:'Gör tanken likadan som spöket.',da:'Gør din tank ligesom spøgelset.',no:'Gjør tanken din lik spøkelset.',fi:'Tee altaastasi samanlainen kuin haamu.'},
    hintNeed:     {en:'You need {k} bubbles behind the raft.',de:'Du brauchst {k} Blasen hinter dem Floß.',fr:'Il te faut {k} bulles derrière le radeau.',it:'Ti servono {k} bolle dietro la zattera.',es:'Necesitas {k} burbujas detrás de la balsa.',pt:'Você precisa de {k} bolhas atrás da jangada.',nl:'Je hebt {k} belletjes achter het vlot nodig.',sv:'Du behöver {k} bubblor bakom flotten.',da:'Du skal bruge {k} bobler bag flåden.',no:'Du trenger {k} bobler bak flåten.',fi:'Tarvitset lautan perään {k} kuplaa.'},
    hintNeed1:    {en:'You need 1 bubble behind the raft.',de:'Du brauchst 1 Blase hinter dem Floß.',fr:'Il te faut 1 bulle derrière le radeau.',it:'Ti serve 1 bolla dietro la zattera.',es:'Necesitas 1 burbuja detrás de la balsa.',pt:'Você precisa de 1 bolha atrás da jangada.',nl:'Je hebt 1 belletje achter het vlot nodig.',sv:'Du behöver 1 bubbla bakom flotten.',da:'Du skal bruge 1 boble bag flåden.',no:'Du trenger 1 boble bak flåten.',fi:'Tarvitset lautan perään 1 kuplan.'},
    hintSameTen:  {en:'Both have one ten. Which has more bubbles left over?',de:'Beide haben einen Zehner. Wo sind mehr Blasen übrig?',fr:'Les deux ont une dizaine. Lequel a le plus de bulles à côté de la dizaine ?',it:'Tutte e due hanno una decina. Quale ha più bolle oltre la decina?',es:'Los dos tienen una decena. ¿Cuál tiene más burbujas además de la decena?',pt:'Os dois têm uma dezena. Qual tem mais bolhas sobrando?',nl:'Allebei hebben ze één tiental. Waar blijven meer belletjes over?',sv:'Båda har ett tiotal. Vilken har flest bubblor över?',da:'Begge har en tier. Hvilken har flest bobler til overs?',no:'Begge har en tier. Hvilken har flest bobler til overs?',fi:'Kummassakin on yksi kymppi. Kummassa on enemmän ylimääräisiä kuplia?'},
    hintOneTenOnly:{en:'One ten is enough for these numbers.',de:'Für diese Zahlen reicht ein Zehner.',fr:'Pour ces nombres, une dizaine suffit.',it:'Per questi numeri basta una decina.',es:'Para estos números basta con una decena.',pt:'Para esses números, uma dezena basta.',nl:'Voor deze getallen is één tiental genoeg.',sv:'Ett tiotal räcker för de här talen.',da:'En tier er nok til de her tal.',no:'En tier er nok for disse tallene.',fi:'Näihin lukuihin riittää yksi kymppi.'},
    hintRoom:     {en:'There is no more room behind the raft.',de:'Hinter dem Floß ist kein Platz mehr.',fr:'Il n’y a plus de place derrière le radeau.',it:'Non c’è più posto dietro la zattera.',es:'Ya no hay lugar detrás de la balsa.',pt:'Não tem mais lugar atrás da jangada.',nl:'Er is geen plek meer achter het vlot.',sv:'Det finns ingen plats kvar bakom flotten.',da:'Der er ikke mere plads bag flåden.',no:'Det er ikke mer plass bak flåten.',fi:'Lautan perässä ei ole enää tilaa.'},
    okMake:       {en:'Ten and {k} more make {n}!',de:'Zehn und {k} mehr sind {n}!',fr:'Dix et encore {k}, ça fait {n} !',it:'Dieci e ancora {k} fanno {n}!',es:'¡Diez y {k} más son {n}!',pt:'Dez e mais {k} dão {n}!',nl:'Tien en nog {k} is {n}!',sv:'Tio och {k} till blir {n}!',da:'Ti og {k} til giver {n}!',no:'Ti og {k} til blir {n}!',fi:'Kymmenen ja {k} lisää on {n}!'},
    okPop:        {en:'Still {n}: ten loose bubbles and {k} more.',de:'Immer noch {n}: zehn lose Blasen und {k} mehr.',fr:'Toujours {n} : dix bulles libres et encore {k}.',it:'Sempre {n}: dieci bolle sciolte e ancora {k}.',es:'Siguen siendo {n}: diez burbujas sueltas y {k} más.',pt:'Continua sendo {n}: dez bolhas soltas e mais {k}.',nl:'Nog steeds {n}: tien losse belletjes en nog {k}.',sv:'Fortfarande {n}: tio lösa bubblor och {k} till.',da:'Stadig {n}: ti løse bobler og {k} til.',no:'Fortsatt {n}: ti løse bobler og {k} til.',fi:'Yhä {n}: kymmenen irtokuplaa ja {k} lisää.'},
    okTwo:        {en:'{a} is more than {b}: the same ten, but {ka} more instead of {kb}.',de:'{a} ist mehr als {b}: derselbe Zehner, aber {ka} mehr statt {kb}.',fr:'{a}, c’est plus que {b} : la même dizaine, mais {ka} en plus au lieu de {kb}.',it:'{a} è più di {b}: la stessa decina, ma {ka} in più invece di {kb}.',es:'{a} es más que {b}: la misma decena, pero {ka} más en lugar de {kb}.',pt:'{a} é mais que {b}: a mesma dezena, mas {ka} a mais em vez de {kb}.',nl:'{a} is meer dan {b}: hetzelfde tiental, maar nog {ka} in plaats van {kb}.',sv:'{a} är mer än {b}: samma tiotal, men {ka} till i stället för {kb}.',da:'{a} er mere end {b}: den samme tier, men {ka} til i stedet for {kb}.',no:'{a} er mer enn {b}: den samme tieren, men {ka} til i stedet for {kb}.',fi:'{a} on enemmän kuin {b}: sama kymppi, mutta {ka} lisää eikä {kb}.'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Controlla',es:'Revisar',pt:'Conferir',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    tank:         {en:'Dewey’s tank',de:'Deweys Tank',fr:'Le réservoir de Dewey',it:'La vasca di Dewey',es:'El tanque de Dewey',pt:'O tanque do Dudu',nl:'De tank van Dobber',sv:'Kvacks tank',da:'Rappes tank',no:'Tanken til Kvakk',fi:'Kvaakin allas'},
    raftFrame:    {en:'The raft’s ten seats: tap to let the last bubble go',de:'Die zehn Plätze auf dem Floß: tippen, dann schwimmt die letzte Blase weg',fr:'Les dix places du radeau : touche pour laisser partir la dernière bulle',it:'I dieci posti della zattera: tocca per lasciar andare l’ultima bolla',es:'Los diez lugares de la balsa: toca para soltar la última burbuja',pt:'Os dez lugares da jangada: toque para soltar a última bolha',nl:'De tien plekjes op het vlot: tik om het laatste belletje los te laten',sv:'Flottens tio platser: tryck för att släppa den sista bubblan',da:'Flådens ti pladser: tryk for at slippe den sidste boble',no:'De ti plassene på flåten: trykk for å slippe den siste boblen',fi:'Lautan kymmenen paikkaa: napauta, niin viimeinen kupla lähtee'},
    tow:          {en:'The bubbles behind the raft',de:'Die Blasen hinter dem Floß',fr:'Les bulles derrière le radeau',it:'Le bolle dietro la zattera',es:'Las burbujas detrás de la balsa',pt:'As bolhas atrás da jangada',nl:'De belletjes achter het vlot',sv:'Bubblorna bakom flotten',da:'Boblerne bag flåden',no:'Boblene bak flåten',fi:'Kuplat lautan perässä'},
    towBack:      {en:'The bubbles behind the raft: tap to put the last one back in the reeds',de:'Die Blasen hinter dem Floß: tippen, um die letzte ins Schilf zurückzulegen',fr:'Les bulles derrière le radeau : touche pour remettre la dernière dans les roseaux',it:'Le bolle dietro la zattera: tocca per rimettere l’ultima tra le canne',es:'Las burbujas detrás de la balsa: toca para regresar la última a los juncos',pt:'As bolhas atrás da jangada: toque para devolver a última aos juncos',nl:'De belletjes achter het vlot: tik om het laatste terug in het riet te leggen',sv:'Bubblorna bakom flotten: tryck för att lägga tillbaka den sista i vassen',da:'Boblerne bag flåden: tryk for at lægge den sidste tilbage i sivene',no:'Boblene bak flåten: trykk for å legge den siste tilbake i sivet',fi:'Kuplat lautan perässä: napauta, niin viimeinen palaa kaislikkoon'},
    bubble:       {en:'A bubble: tap to catch it',de:'Eine Blase: tippen, um sie zu fangen',fr:'Une bulle : touche pour l’attraper',it:'Una bolla: tocca per prenderla',es:'Una burbuja: tócala para atraparla',pt:'Uma bolha: toque para pegá-la',nl:'Een belletje: tik om het te vangen',sv:'En bubbla: tryck för att fånga den',da:'En boble: tryk for at fange den',no:'En boble: trykk for å fange den',fi:'Kupla: napauta, niin otat sen'},
    bubbleBack:   {en:'A bubble: tap to put it back in the reeds',de:'Eine Blase: tippen, um sie ins Schilf zurückzulegen',fr:'Une bulle : touche pour la remettre dans les roseaux',it:'Una bolla: tocca per rimetterla tra le canne',es:'Una burbuja: tócala para regresarla a los juncos',pt:'Uma bolha: toque para devolvê-la aos juncos',nl:'Een belletje: tik om het terug in het riet te leggen',sv:'En bubbla: tryck för att lägga tillbaka den i vassen',da:'En boble: tryk for at lægge den tilbage i sivene',no:'En boble: trykk for å legge den tilbake i sivet',fi:'Kupla: napauta, niin se palaa kaislikkoon'},
    raft:         {en:'The ten-raft',de:'Das Zehner-Floß',fr:'Le radeau-dizaine',it:'La zattera-decina',es:'La balsa-decena',pt:'A jangada-dezena',nl:'Het tientalvlot',sv:'Tiotalsflotten',da:'Tierflåden',no:'Tierflåten',fi:'Kymppilautta'},
    raftPop:      {en:'The ten-raft: press and hold to pop it',de:'Das Zehner-Floß: gedrückt halten, dann platzt es',fr:'Le radeau-dizaine : appuie longtemps pour le faire éclater',it:'La zattera-decina: tieni premuto per farla scoppiare',es:'La balsa-decena: mantenla presionada para reventarla',pt:'A jangada-dezena: segure para estourá-la',nl:'Het tientalvlot: houd ingedrukt om het te laten knappen',sv:'Tiotalsflotten: håll in så spricker den',da:'Tierflåden: hold fingeren på, så springer den',no:'Tierflåten: hold fingeren på, så sprekker den',fi:'Kymppilautta: pidä painettuna, niin se puhkeaa'},
    readyRaft:    {en:'A ready ten-raft: tap to bring it into the tank',de:'Ein fertiges Zehner-Floß: tippen, um es in den Tank zu holen',fr:'Un radeau-dizaine tout prêt : touche pour l’amener dans le réservoir',it:'Una zattera-decina pronta: tocca per portarla nella vasca',es:'Una balsa-decena lista: tócala para traerla al tanque',pt:'Uma jangada-dezena pronta: toque para trazê-la ao tanque',nl:'Een kant-en-klaar tientalvlot: tik om het in de tank te halen',sv:'En färdig tiotalsflotte: tryck för att hämta den till tanken',da:'En færdig tierflåde: tryk for at hente den ind i tanken',no:'En ferdig tierflåte: trykk for å hente den inn i tanken',fi:'Valmis kymppilautta: napauta, niin se tulee altaaseen'},
    spare:        {en:'A spare bubble: tap to put it in the tank',de:'Eine Blase im Schilf: tippen, um sie in den Tank zu legen',fr:'Une bulle dans les roseaux : touche pour la mettre dans le réservoir',it:'Una bolla tra le canne: tocca per metterla nella vasca',es:'Una burbuja en los juncos: tócala para ponerla en el tanque',pt:'Uma bolha nos juncos: toque para colocá-la no tanque',nl:'Een belletje in het riet: tik om het in de tank te doen',sv:'En bubbla i vassen: tryck för att lägga den i tanken',da:'En boble i sivene: tryk for at lægge den i tanken',no:'En boble i sivet: trykk for å legge den i tanken',fi:'Kupla kaislikossa: napauta, niin se menee altaaseen'},
    reeds:        {en:'The reeds',de:'Das Schilf',fr:'Les roseaux',it:'Le canne',es:'Los juncos',pt:'Os juncos',nl:'Het riet',sv:'Vassen',da:'Sivene',no:'Sivet',fi:'Kaislikko'},
    bay:          {en:'Ghost bay',de:'Geisterbucht',fr:'Baie des fantômes',it:'Baia dei fantasmi',es:'Bahía de los fantasmas',pt:'Baía dos fantasmas',nl:'Spookbaai',sv:'Spökviken',da:'Spøgelsesbugten',no:'Spøkelsesbukta',fi:'Haamulahti'},
    ghostOf:      {en:'The ghost of {m}',de:'Der Geist von {m}',fr:'Le fantôme de {m}',it:'Il fantasma di {m}',es:'El fantasma de {m}',pt:'O fantasma de {m}',nl:'Het spook van {m}',sv:'Spöket för {m}',da:'Spøgelset for {m}',no:'Spøkelset for {m}',fi:'Luvun {m} haamu'},
    record:       {en:'The record',de:'Die Rechnung',fr:'L’écriture',it:'L’addizione',es:'El registro',pt:'O registro',nl:'De som',sv:'Uträkningen',da:'Regnestykket',no:'Regnestykket',fi:'Merkintä'},
    cards:        {en:'Number cards',de:'Zahlenkarten',fr:'Cartes-nombres',it:'Cartellini dei numeri',es:'Tarjetas de números',pt:'Cartões de números',nl:'Getalkaarten',sv:'Talkort',da:'Talkort',no:'Tallkort',fi:'Lukukortit'},
    tankLeft:     {en:'The left tank',de:'Der linke Tank',fr:'Le réservoir de gauche',it:'La vasca a sinistra',es:'El tanque de la izquierda',pt:'O tanque da esquerda',nl:'De linker tank',sv:'Den vänstra tanken',da:'Den venstre tank',no:'Den venstre tanken',fi:'Vasen allas'},
    tankRight:    {en:'The right tank',de:'Der rechte Tank',fr:'Le réservoir de droite',it:'La vasca a destra',es:'El tanque de la derecha',pt:'O tanque da direita',nl:'De rechter tank',sv:'Den högra tanken',da:'Den højre tank',no:'Den høyre tanken',fi:'Oikea allas'},
    play:         {en:'Ghost bay',de:'Geisterbucht',fr:'Baie des fantômes',it:'Baia dei fantasmi',es:'Bahía de los fantasmas',pt:'Baía dos fantasmas',nl:'Spookbaai',sv:'Spökviken',da:'Spøgelsesbugten',no:'Spøkelsesbukta',fi:'Haamulahti'},
    playBack:     {en:'Back to the rounds',de:'Zurück zu den Runden',fr:'Retour aux manches',it:'Torna ai turni',es:'Volver a las rondas',pt:'Voltar às rodadas',nl:'Terug naar de rondes',sv:'Tillbaka till omgångarna',da:'Tilbage til runderne',no:'Tilbake til rundene',fi:'Takaisin tehtäviin'},
    playNote:     {en:'Catch, pop and add bubbles as you like. Tap a card to see its ghost.',de:'Fang Blasen, lass Flöße platzen und leg Blasen dazu, wie du willst. Tipp auf eine Karte, dann siehst du ihren Geist.',fr:'Attrape, fais éclater et ajoute des bulles comme tu veux. Touche une carte pour voir son fantôme.',it:'Prendi, fai scoppiare e aggiungi bolle come vuoi. Tocca un cartellino per vedere il suo fantasma.',es:'Atrapa, revienta y agrega burbujas como quieras. Toca una tarjeta para ver su fantasma.',pt:'Pegue, estoure e coloque bolhas como quiser. Toque num cartão para ver o fantasma dele.',nl:'Vang, laat knappen en doe belletjes erbij zoals je wilt. Tik op een kaart om het spook te zien.',sv:'Fånga, spräck och lägg till bubblor som du vill. Tryck på ett kort för att se dess spöke.',da:'Fang bobler, få flåder til at springe, og læg bobler til, som du vil. Tryk på et kort for at se dets spøgelse.',no:'Fang bobler, la flåter sprekke og legg til bobler som du vil. Trykk på et kort for å se spøkelset.',fi:'Ota, puhkaise ja lisää kuplia miten haluat. Napauta korttia, niin näet sen haamun.'},
    newCards:     {en:'New cards',de:'Neue Karten',fr:'Nouvelles cartes',it:'Nuovi cartellini',es:'Tarjetas nuevas',pt:'Cartões novos',nl:'Nieuwe kaarten',sv:'Nya kort',da:'Nye kort',no:'Nye kort',fi:'Uudet kortit'},
    addBubble:    {en:'Add a bubble',de:'Eine Blase dazulegen',fr:'Ajouter une bulle',it:'Aggiungi una bolla',es:'Agregar una burbuja',pt:'Colocar uma bolha',nl:'Een belletje erbij doen',sv:'Lägg till en bubbla',da:'Læg en boble til',no:'Legg til en boble',fi:'Lisää kupla'},
    setNumbers:   {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    up15:         {en:'Up to 15',de:'Bis 15',fr:'Jusqu’à 15',it:'Fino a 15',es:'Hasta el 15',pt:'Até 15',nl:'Tot 15',sv:'Upp till 15',da:'Op til 15',no:'Opp til 15',fi:'15:een asti'},
    up19:         {en:'Up to 19',de:'Bis 19',fr:'Jusqu’à 19',it:'Fino a 19',es:'Hasta el 19',pt:'Até 19',nl:'Tot 19',sv:'Upp till 19',da:'Op til 19',no:'Opp til 19',fi:'19:ään asti'},
    setCards:     {en:'Number cards',de:'Zahlenkarten',fr:'Cartes-nombres',it:'Cartellini',es:'Tarjetas',pt:'Cartões',nl:'Getalkaarten',sv:'Talkort',da:'Talkort',no:'Tallkort',fi:'Lukukortit'},
    digits:       {en:'Digits',de:'Ziffern',fr:'En chiffres',it:'In cifre',es:'Con cifras',pt:'Com algarismos',nl:'Cijfers',sv:'Siffror',da:'Cifre',no:'Sifre',fi:'Numeroina'},
    words:        {en:'Words',de:'Zahlwörter',fr:'En lettres',it:'In lettere',es:'Con letra',pt:'Por extenso',nl:'Woorden',sv:'Ord',da:'Ord',no:'Ord',fi:'Sanoina'}
  },

  defaults: { numbers: '19', cards: 'digits' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '15', labelKey: 'up15' }, { value: '19', labelKey: 'up19' }] },
    { key: 'cards', type: 'choice', labelKey: 'setCards', options: [{ value: 'digits', labelKey: 'digits' }, { value: 'words', labelKey: 'words' }] }
  ],

  OK_MS: 1700, FAST: false,
  NAMES: { en: 'Dewey', de: 'Dewey', fr: 'Dewey', it: 'Dewey', es: 'Dewey', pt: 'Dudu', nl: 'Dobber', sv: 'Kvack', da: 'Rappe', no: 'Kvakk', fi: 'Kvaak' },
  DUCK: '/image-library-webp/themes/farm%20animals/duckling@2x.webp',

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._deal = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._raf = null; this._bubs = []; this._fx = {}; this._note2 = null; this._flash = null; this._hold = null; this._playCards = null;
    injectGhostRaftsCSS();
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur(); if (!st) return;
      if (ev.key === ' ' && document.activeElement === self._tank) { self._catchOne(); ev.preventDefault(); }
      else if ((ev.key === 'Delete' || ev.key === 'Backspace') && document.activeElement === self._tank) { self._release(); ev.preventDefault(); }
      else if ((ev.key === 'p' || ev.key === 'P') && st.tank.raft) { self._pop(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers(); this._stopDrift(); this._cancelHold();
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
  _name: function () { return this.NAMES[this._lang()] || 'Dewey'; },
  _lang: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  _words: function () { return !!(this.api && this.api.settings && this.api.settings.cards === 'words'); },
  _word: function (n) { var W = typeof GhostRaftsWords !== 'undefined' ? GhostRaftsWords : null, l = this._lang(); return W && W[l] ? W[l][n] : (W ? W.en[n] : String(n)); },
  _label: function (n) { return this._words() ? this._word(n) : String(n); },
  /* soft hyphens at the joints of the long number words, so a word card wraps at a joint, never mid-morpheme */
  _cardText: function (n) {
    if (!this._words()) return String(n);
    var w = this._word(n), l = this._lang(), S = '\u00ad';
    if (l === 'fi') w = w.replace(/(kymmentä|toista)/g, S + '$1' + S);
    else if (l === 'de') w = w.replace(/und/g, 'und' + S);
    else if (l === 'nl') w = w.replace(/(twintig|dertig|veertig|vijftig|zestig|zeventig|tachtig|negentig)$/, S + '$1');
    else if (l === 'sv') w = w.replace(/(tio|tjugo)(?=\p{L})/u, '$1' + S);
    else if (l === 'da') w = w.replace(/og(?=\p{L})/u, 'og' + S);
    return w.replace(new RegExp('^' + S + '|' + S + '$', 'g'), '');
  },

  /* ---------------- rounds ---------------- */
  _level: function () { return GhostRaftsCore.level(this.api && this.api.settings && this.api.settings.numbers); },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = GhostRaftsCore.rounds(key); this._poolKey = key; this._order = null; this._deal = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = GhostRaftsCore;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = C.order(pool, Math.random, null); this._deal = C.deal(pool, this._order, Math.random); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = C.order(pool, Math.random, this._order); this._deal = C.deal(pool, this._order, Math.random); this._curPass = pass; }
    if (!this._deal) this._deal = C.deal(pool, this._order, Math.random);
    var ri = this._order[index % n], r = pool[ri], dl = this._deal, self = this;
    var promptKey = { catch: 'promptCatch', dock: 'promptDock', fix: 'promptFix', pop: 'promptPop', two: 'promptTwo' }[r.kind];
    var big = r.kind === 'two' ? Math.max(r.a, r.b) : r.n, small = r.kind === 'two' ? Math.min(r.a, r.b) : r.n;
    return {
      id: 'ghost-rafts.' + r.id,
      promptKey: promptKey,
      promptArgs: { n: (r.kind === 'dock' || r.kind === 'fix') ? this._label(r.n) : r.n, k: r.n - 10, a: big, b: small, ka: big - 10, kb: small - 10 },
      celebrateKey: r.kind === 'two' ? 'okTwo' : r.kind === 'pop' ? 'okPop' : 'okMake',
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._cancelHold(); tool._round = r; tool._playing = false;
        tool.st = C.newState(r, { slots: dl.slots[ri], swap: dl.swap });
        tool._fx = {}; tool._note2 = null; tool._flash = null; tool._bubs = [];
        void self;
      },
      /* this activity presses Check itself when the round is complete */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    if (!this.st) { var r0 = GhostRaftsCore.rounds('19')[0]; this._round = r0; this.st = GhostRaftsCore.newState(r0); }
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'gr-wrap'); this._wrap = wrap;
    /* the scene: the tank (+ the reeds) and the ghost bay */
    var scene = api.el('div', 'gr-scene'); this._scene = scene;
    var col = api.el('div', 'gr-col');
    var tank = api.el('div', 'gr-tank'); tank.setAttribute('role', 'group'); tank.tabIndex = 0; this._tank = tank;
    tank.innerHTML = '<div class="gr-water"><i></i><i></i></div><div class="gr-bank"></div>';
    var duck = document.createElement('img'); duck.className = 'gr-duck'; duck.alt = ''; duck.setAttribute('aria-hidden', 'true'); duck.draggable = false; duck.src = this.DUCK; this._duck = duck; tank.appendChild(duck);
    var frame = api.el('button', 'gr-frame'); frame.type = 'button'; this._frame = frame;
    for (var i = 0; i < 10; i++) { var s = api.el('span', 'gr-seat'); s.innerHTML = '<i></i>'; frame.appendChild(s); }
    frame.addEventListener('click', function () { self._release(); });
    tank.appendChild(frame);
    var bar = api.el('button', 'gr-bar'); bar.type = 'button'; bar.innerHTML = '<span class="gr-dots">' + new Array(11).join('<i></i>') + '</span><b class="gr-badge"></b><svg class="gr-ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16"/></svg>'; this._bindHold(bar); this._bar = bar; tank.appendChild(bar);
    var tow = api.el('button', 'gr-tow'); tow.type = 'button'; tow.addEventListener('click', function () { self._takeBubble(); }); this._tow = tow; tank.appendChild(tow);
    var loose = api.el('div', 'gr-loose'); this._loose = loose; tank.appendChild(loose);
    col.appendChild(tank);
    var reeds = api.el('div', 'gr-reeds'); reeds.setAttribute('role', 'group'); this._reeds = reeds; col.appendChild(reeds);
    scene.appendChild(col);
    var bay = api.el('div', 'gr-bay'); bay.setAttribute('role', 'img'); bay.innerHTML = '<span class="gr-baylab"></span><div class="gr-ghost"></div>'; this._bay = bay; scene.appendChild(bay);
    wrap.appendChild(scene);
    /* two tanks */
    var two = api.el('div', 'gr-two'); this._two = two;
    for (var q = 0; q < 2; q++) (function (side) { var m = api.el('button', 'gr-mini'); m.type = 'button'; m.setAttribute('data-side', String(side)); m.innerHTML = '<span class="gr-mbar"><span class="gr-dots">' + new Array(11).join('<i></i>') + '</span></span><span class="gr-mtow"></span><span class="gr-mrec"></span>'; m.addEventListener('click', function () { self._pickTank(side); }); two.appendChild(m); }(q));
    var pair = api.el('div', 'gr-pair'); pair.setAttribute('aria-hidden', 'true'); this._pair = pair;
    var twoWrap = api.el('div', 'gr-twowrap'); twoWrap.appendChild(two); twoWrap.appendChild(pair); this._twoWrap = twoWrap;
    wrap.appendChild(twoWrap);
    /* the record strip + the number cards */
    var rec = api.el('div', 'gr-recrow'); this._recRow = rec;
    var strip = api.el('div', 'gr-record'); strip.setAttribute('role', 'group'); strip.innerHTML = '<b class="gr-ten">10</b><span>+</span><b class="gr-box gr-bk"></b><span>=</span><b class="gr-box gr-bn"></b>'; this._strip = strip; rec.appendChild(strip);
    var cards = api.el('div', 'gr-cards'); cards.setAttribute('role', 'group'); this._cards = cards; rec.appendChild(cards);
    wrap.appendChild(rec);
    var note = api.el('div', 'gr-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'gr-actions');
    var chk = api.el('button', 'gr-check'); chk.type = 'button'; chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var nc = api.el('button', 'gr-tool gr-newcards'); nc.type = 'button'; nc.addEventListener('click', function () { self._dealPlayCards(); self._paint(); }); this._newCards = nc; row.appendChild(nc);
    var playBtn = api.el('button', 'gr-tool gr-playbtn'); playBtn.type = 'button'; playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; row.appendChild(playBtn);
    wrap.appendChild(row);
    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
    this._startDrift();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var L = this._L = GhostRaftsCore.layout(this._width()), w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide'); w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.style.setProperty('--gr-seat', L.seat + 'px'); w.style.setProperty('--gr-bub', L.bubble + 'px'); w.style.setProperty('--gr-tw', L.tow + 'px');
    w.style.setProperty('--gr-duck', L.duck + 'px'); w.style.setProperty('--gr-tankh', L.tankH + 'px'); w.style.setProperty('--gr-bay', L.bay + 'px');
    /* the geometry the drift and the tow row use */
    var pad = L.mode === 'wide' ? 40 : 22, gap = L.mode === 'wide' ? 6 : 4; /* pad = --gr-top: room above the raft for Dewey aboard */
    L.frameW = 5 * L.seat + 4 * gap + 12; L.frameH = 2 * L.seat + gap + 12;
    L.barH = L.mode === 'wide' ? 54 : 46;
    L.towY = pad + L.frameH + 8; L.waterY = L.towY + L.tow + 12; L.frameY = pad + L.frameH + 8;
    w.style.setProperty('--gr-deck', (L.mode === 'wide' ? 104 : 72) + 'px'); w.style.setProperty('--gr-aboard', (L.mode === 'wide' ? 96 : 64) + 'px'); w.style.setProperty('--gr-top', (L.mode === 'wide' ? 40 : 22) + 'px');
    w.style.setProperty('--gr-towy', L.towY + 'px'); w.style.setProperty('--gr-barh', L.barH + 'px'); w.style.setProperty('--gr-gap', gap + 'px');
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._bubs = []; self._paint();
    });
    this._ro.observe(this.api.stage);
  },
  /* the box a loose bubble's top-left corner wanders in */
  _box: function () {
    var L = this._L, tw = this._tank ? this._tank.clientWidth : 300, st = this._cur(), y0 = L.waterY;
    if (st && st.frame && !st.tank.raft) y0 = L.frameY;
    else if (this._tow && !this._tow.hidden && this._tank) y0 = Math.max(L.frameY, Math.ceil(this._tow.offsetTop + this._tow.offsetHeight + 10));
    return { x0: 8, y0: y0, x1: Math.max(8, tw - L.bubble - 8), y1: Math.max(y0, L.tankH - L.bubble - 8) };
  },

  /* ---------------- the drift ---------------- */
  _reduced: function () { try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } },
  _startDrift: function () {
    var self = this, last = 0;
    this._stopDrift();
    if (typeof requestAnimationFrame === 'undefined') return;
    var tick = function (ts) {
      if (!self._wrap || !self._wrap.isConnected) { self._raf = null; return; }
      var dt = last ? Math.min(0.1, (ts - last) / 1000) : 0; last = ts;
      if (!self._reduced() && !self.FAST) self._moveBubbles(dt);
      self._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  },
  _stopDrift: function () { if (this._raf && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(this._raf); this._raf = null; },
  _moveBubbles: function (dt) {
    var box = this._box(), els = this._loose ? this._loose.children : [];
    for (var i = 0; i < this._bubs.length && i < els.length; i++) {
      var b = this._bubs[i]; if (b.held || b.still) continue;
      var p = GhostRaftsCore.driftStep(b, dt, box);
      els[i].style.transform = 'translate(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px)';
    }
  },
  /* keep one drift record per loose bubble (new bubbles appear at a random spot in the water) */
  _syncBubbles: function (n) {
    var box = this._box();
    while (this._bubs.length > n) this._bubs.pop();
    while (this._bubs.length < n) this._bubs.push(GhostRaftsCore.newBubble(Math.random, box));
    for (var i = 0; i < this._bubs.length; i++) { var b = this._bubs[i]; b.x = Math.min(Math.max(b.x, box.x0), box.x1); b.y = Math.min(Math.max(b.y, box.y0), box.y1); }
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this, C = GhostRaftsCore, L = this._L;
    if (!st || !this._wrap) return;
    var w = this._wrap, two = st.kind === 'two';
    w.classList.toggle('is-two', two); w.classList.toggle('is-play', !!st.explore); w.classList.toggle('is-done', !!st.done);
    w.classList.toggle('is-words', this._words());
    this._scene.hidden = two; this._twoWrap.hidden = !two;
    if (two) this._paintTwo(st);
    else this._paintTank(st);

    /* the record strip */
    var rc = C.record(st);
    this._recRow.hidden = !rc && !st.explore;
    this._strip.hidden = !rc || !!st.explore;
    if (rc) {
      var bk = this._strip.querySelector('.gr-bk'), bn = this._strip.querySelector('.gr-bn');
      bk.textContent = rc.k != null ? String(rc.k) : ''; bk.classList.toggle('is-empty', rc.k == null);
      var nTxt = this._flash != null ? String(this._flash) : rc.n != null ? String(rc.n) : '';
      bn.textContent = nTxt; bn.classList.toggle('is-empty', !nTxt); bn.classList.toggle('is-wrong', this._flash != null);
      bn.classList.toggle('is-ok', !!st.done);
      this._strip.setAttribute('aria-label', t('record'));
    }
    /* the number cards */
    var vals = st.explore ? (this._playCards || this._dealPlayCards()) : (st.cards || []), ch = '';
    vals.forEach(function (v) { ch += '<button type="button" class="gr-card" data-v="' + v + '" lang="' + self._lang() + '">' + esc(self._cardText(v)) + '</button>'; });
    if (this._cards.getAttribute('data-h') !== ch) {
      this._cards.innerHTML = ch; this._cards.setAttribute('data-h', ch);
      [].forEach.call(this._cards.querySelectorAll('.gr-card'), function (b) { b.addEventListener('click', function () { self._pickCard(parseInt(b.getAttribute('data-v'), 10), b); }); });
    }
    this._cards.hidden = !vals.length || !!st.done;
    this._cards.setAttribute('aria-label', t('cards'));
    [].forEach.call(this._cards.querySelectorAll('.gr-card'), function (b) {
      var v = parseInt(b.getAttribute('data-v'), 10);
      b.disabled = !!st.done || !!self._busy;
      b.classList.toggle('is-out', self._flash === v);
      b.classList.toggle('is-wait', !st.explore && !C.ready(st));
      b.setAttribute('aria-label', self._words() ? self._word(v) : String(v));
    });

    /* the note */
    var h = st.explore ? { key: 'playNote' } : (this._note2 || C.hint(st)), ok = C.success(st), text = '';
    if (ok) text = interp(t(ok.key), ok.args);
    else if (h) { var key = h.key === 'hintNeed' && h.k === 1 ? 'hintNeed1' : h.key; text = interp(t(key), h); }
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !ok && !!(h && h.wrong));
    this._note.classList.toggle('is-good', !!ok);

    var dockish = st.kind === 'dock' || st.kind === 'fix';
    this._checkBtn.textContent = t('check'); this._checkBtn.hidden = !dockish || !!st.explore || !!st.done; this._checkBtn.disabled = !!this._busy;
    this._newCards.textContent = t('newCards'); this._newCards.hidden = !st.explore;
    this._playBtn.textContent = t(st.explore ? 'playBack' : 'play'); this._playBtn.disabled = !!this._busy;
    void L;
  },
  _paintTank: function (st) {
    var t = this.api.t, self = this, C = GhostRaftsCore, L = this._L, w = this._wrap, tk = st.tank;
    var sealed = !!tk.raft, numbered = C.numbered(st), bl = C.blink(st);
    w.classList.toggle('is-sealed', sealed); w.classList.toggle('is-framed', st.frame && !sealed);
    this._tank.setAttribute('aria-label', t('tank'));
    /* Dewey: on the bank, or aboard the sealed raft */
    this._duck.classList.toggle('is-aboard', sealed);
    /* the seats */
    this._frame.hidden = !(st.frame && !sealed);
    [].forEach.call(this._frame.querySelectorAll('.gr-seat'), function (s, i) { s.classList.toggle('is-full', i < tk.seats); });
    this._frame.disabled = !!st.done || tk.seats < 1;
    this._frame.setAttribute('aria-label', t('raftFrame'));
    /* the sealed raft */
    this._bar.hidden = !sealed;
    var popable = sealed && (st.kind === 'pop' || st.explore) && !st.done;
    this._bar.disabled = !popable; this._bar.classList.toggle('is-popable', popable);
    this._bar.classList.toggle('is-new', !!this._fx.sealed);
    this._bar.classList.toggle('is-badge', numbered && st.kind === 'catch');
    this._bar.querySelector('.gr-badge').textContent = numbered && st.kind === 'catch' ? '10' : '';
    this._bar.classList.toggle('is-lap', !!st.done && sealed);
    this._bar.setAttribute('aria-label', t(popable ? 'raftPop' : 'raft'));
    /* the tow-line: a row behind the raft (also after a pop: the row stays put) */
    var nTow = tk.tow, ghost = st.ghost, th = '';
    var takeable = !st.done && (st.kind === 'dock' || st.kind === 'fix' || st.explore);
    var unmatched = ghost && !st.explore && (st.kind === 'catch' || st.kind === 'pop') && ghost.rafts === (sealed ? 1 : 0) ? ghost.ones : -1;
    var ghostSlots = bl && bl.missing ? bl.missing : 0;
    for (var i = 0; i < nTow + ghostSlots; i++) {
      var isGhost = i >= nTow, num = numbered ? String(10 + i + 1) : '';
      var cls = 'gr-tb' + (isGhost ? ' is-slot' : '') + (!isGhost && unmatched >= 0 && i >= unmatched ? ' is-unmatched' : '') + (!isGhost && bl && bl.extra && i >= nTow - bl.extra ? ' is-extra' : '') + (this._fx.towIn && i >= this._fx.towFrom && !isGhost ? ' is-in' : '');
      var delay = this._fx.towIn && i >= this._fx.towFrom ? ' style="animation-delay:' + ((i - this._fx.towFrom) * 60) + 'ms"' : '';
      th += '<span class="' + cls + '"' + delay + '>' + (num && !isGhost ? '<b>' + num + '</b>' : '') + '</span>';
    }
    if (this._tow.getAttribute('data-h') !== th) { this._tow.innerHTML = th; this._tow.setAttribute('data-h', th); }
    this._tow.disabled = !takeable || nTow < 1; this._tow.classList.toggle('is-takeable', takeable && nTow > 0);
    this._tow.setAttribute('aria-label', t(takeable ? 'towBack' : 'tow'));
    this._tow.classList.toggle('is-lap', !!st.done && sealed);
    this._tow.hidden = nTow + ghostSlots === 0;
    /* the loose bubbles: drifting (POP miss 2: they gather in a numbered row) */
    this._syncBubbles(tk.loose);
    var lh = '';
    for (var j = 0; j < tk.loose; j++) lh += '<button type="button" class="gr-bub" data-b="' + j + '"><b></b></button>';
    if (this._loose.getAttribute('data-h') !== lh) {
      this._loose.innerHTML = lh; this._loose.setAttribute('data-h', lh);
      [].forEach.call(this._loose.querySelectorAll('.gr-bub'), function (b, bi) { self._bindBubble(b, bi); });
    }
    var gather = numbered && st.kind === 'pop', box = this._box();
    [].forEach.call(this._loose.querySelectorAll('.gr-bub'), function (b, bi) {
      var rec = self._bubs[bi];
      if (gather) { rec.still = true; var step = Math.min(L.bubble * 0.8, (box.x1 - box.x0) / 9), gx = box.x0 + bi * step, gy = box.y0 + 4; b.style.transform = 'translate(' + gx + 'px,' + gy + 'px)'; b.querySelector('b').textContent = String(bi + 1); }
      else { rec.still = self._reduced() || self.FAST; b.querySelector('b').textContent = ''; if (rec.still || !b.style.transform) b.style.transform = 'translate(' + rec.x.toFixed(1) + 'px,' + rec.y.toFixed(1) + 'px)'; }
      b.disabled = !!st.done;
      var canCatch = st.frame && !tk.raft;
      b.setAttribute('aria-label', t(canCatch ? 'bubble' : 'bubbleBack'));
    });
    /* the reeds (DOCK, FIX, free play) */
    var reedsOn = st.kind === 'dock' || st.kind === 'fix' || st.explore;
    this._reeds.hidden = !reedsOn;
    if (reedsOn) {
      var rh = '';
      if (st.reeds.raft) rh += '<button type="button" class="gr-ready' + (bl && bl.raft ? ' is-blink' : '') + (this._fx.pulseRaft ? ' is-pulse' : '') + '"><span class="gr-dots">' + new Array(11).join('<i></i>') + '</span></button>';
      if (st.explore) rh += '<button type="button" class="gr-add">+<i></i></button>';
      else if (st.reeds.spare > 0) { rh += '<button type="button" class="gr-pile">'; for (var s = 0; s < st.reeds.spare; s++) rh += '<i></i>'; rh += '</button>'; }
      if (this._reeds.getAttribute('data-h') !== rh) {
        this._reeds.innerHTML = rh; this._reeds.setAttribute('data-h', rh);
        var rb = this._reeds.querySelector('.gr-ready'); if (rb) rb.addEventListener('click', function () { self._dock(); });
        [].forEach.call(this._reeds.querySelectorAll('.gr-pile, .gr-add'), function (b) { b.addEventListener('click', function () { self._addSpare(); }); });
      }
      var rr = this._reeds.querySelector('.gr-ready'); if (rr) { rr.setAttribute('aria-label', t('readyRaft')); rr.disabled = !!st.done; }
      var pl = this._reeds.querySelector('.gr-pile'); if (pl) { pl.setAttribute('aria-label', t('spare')); pl.disabled = !!st.done; }
      var ad = this._reeds.querySelector('.gr-add'); if (ad) { ad.setAttribute('aria-label', t('addBubble')); ad.title = t('addBubble'); }
      this._reeds.setAttribute('aria-label', t('reeds'));
    }
    /* the ghost bay */
    var gh = '', g = st.ghost;
    if (g) {
      var p = 0;
      for (var r = 0; r < g.rafts; r++) gh += '<i class="gr-graft" style="animation-delay:' + (p++ * 80) + 'ms"></i>';
      for (var o = 0; o < g.ones; o++) gh += '<i class="gr-gbub" style="animation-delay:' + (p++ * 80) + 'ms"></i>';
    }
    var gEl = this._bay.querySelector('.gr-ghost');
    if (gEl.getAttribute('data-h') !== gh) { gEl.innerHTML = gh; gEl.setAttribute('data-h', gh); }
    this._bay.querySelector('.gr-baylab').textContent = g ? (this._words() ? this._word(st.pick || st.n) : String(st.pick != null ? st.pick : st.n)) : '';
    this._bay.classList.toggle('is-on', !!g);
    this._bay.setAttribute('aria-label', g ? interp(t('ghostOf'), { m: st.pick != null ? st.pick : st.n }) : t('bay'));
  },
  _paintTwo: function (st) {
    var t = this.api.t, C = GhostRaftsCore, pr = C.pairing(st), self = this;
    [].forEach.call(this._two.querySelectorAll('.gr-mini'), function (m, side) {
      var v = st.two[side], k = v - 10, th = '';
      for (var i = 0; i < k; i++) th += '<i></i>';
      var tw = m.querySelector('.gr-mtow'); if (tw.getAttribute('data-h') !== th) { tw.innerHTML = th; tw.setAttribute('data-h', th); }
      m.querySelector('.gr-mrec').textContent = st.done ? '10 + ' + k + ' = ' + v : '';
      m.classList.toggle('is-picked', st.pick === side); m.classList.toggle('is-right', !!st.done && st.pick === side);
      m.classList.toggle('is-wrongpick', !st.done && st.pick === side && st.help > 0);
      m.classList.toggle('is-flashten', !!(pr && self._fx.tenFlash));
      m.disabled = !!st.done;
      m.setAttribute('aria-label', t(side ? 'tankRight' : 'tankLeft'));
    });
    var ph = '';
    if (pr) {
      var mx = Math.max(pr.rows[0], pr.rows[1]), mn = Math.min(pr.rows[0], pr.rows[1]);
      for (var r = 0; r < 2; r++) { ph += '<div class="gr-prow">'; for (var i = 0; i < pr.rows[r]; i++) ph += '<i class="' + (pr.glow && i >= mn && pr.rows[r] === mx ? 'is-glow' : '') + '"></i>'; ph += '</div>'; }
    }
    if (this._pair.getAttribute('data-h') !== ph) { this._pair.innerHTML = ph; this._pair.setAttribute('data-h', ph); }
    this._pair.hidden = !pr;
  },

  /* ---------------- the hand ---------------- */
  _bindBubble: function (el, idx) {
    var self = this, start = null;
    el.addEventListener('pointerdown', function (ev) {
      if (el.disabled) return; ev.preventDefault();
      try { el.setPointerCapture(ev.pointerId); } catch (e) { /* older browsers */ }
      var rec = self._bubs[idx]; if (rec) rec.held = true;
      start = { x: ev.clientX, y: ev.clientY, moved: false };
      el.classList.add('is-held');
    });
    el.addEventListener('pointermove', function (ev) {
      if (!start) return;
      var dx = ev.clientX - start.x, dy = ev.clientY - start.y;
      if (!start.moved && Math.abs(dx) + Math.abs(dy) < 8) return;
      start.moved = true;
      var tr = self._tank.getBoundingClientRect(), half = self._L.bubble / 2;
      el.style.transform = 'translate(' + (ev.clientX - tr.left - half).toFixed(1) + 'px,' + (ev.clientY - tr.top - half).toFixed(1) + 'px) scale(1.08,.94)';
    });
    var end = function (ev, cancel) {
      if (!start) return;
      var s = start; start = null; el.classList.remove('is-held');
      var rec = self._bubs[idx];
      if (!s.moved && !cancel) { if (rec) rec.held = false; self._tapBubble(); return; }
      var st = self._cur(), fr = self._frame.getBoundingClientRect(), tr = self._tank.getBoundingClientRect();
      var onFrame = !self._frame.hidden && ev.clientX >= fr.left && ev.clientX <= fr.right && ev.clientY >= fr.top && ev.clientY <= fr.bottom;
      if (!cancel && onFrame && st && st.frame && !st.tank.raft) { if (rec) rec.held = false; self._catchOne(idx); return; }
      if (rec) {
        var box = self._box(), half = self._L.bubble / 2;
        if (!cancel && ev.clientX >= tr.left && ev.clientX <= tr.right && ev.clientY >= tr.top && ev.clientY <= tr.bottom) {
          rec.x = Math.min(Math.max(ev.clientX - tr.left - half, box.x0), box.x1); rec.y = Math.min(Math.max(ev.clientY - tr.top - half, box.y0), box.y1);
        }
        rec.held = false; el.style.transform = 'translate(' + rec.x.toFixed(1) + 'px,' + rec.y.toFixed(1) + 'px)';
      }
    };
    el.addEventListener('pointerup', function (ev) { end(ev, false); });
    el.addEventListener('pointercancel', function (ev) { end(ev, true); });
    el.addEventListener('click', function (ev) { if (ev.detail === 0) self._tapBubble(); }); /* keyboard Enter */
  },
  /* a tap on a loose bubble: it hops onto the next free seat (CATCH, free play) — or, with no frame to catch on, back to the reeds */
  _tapBubble: function () {
    var st = this._cur(); if (!st || st.done) return;
    if (st.frame && !st.tank.raft) this._catchOne(); else this._takeBubble();
  },
  _catchOne: function (idx) {
    var st = this._cur(), self = this, C = GhostRaftsCore;
    if (!st || st.done) return;
    var r = C.catchBubble(st);
    if (!r) { this.api.sound(180); return; }
    if (idx != null && this._bubs.length > idx) this._bubs.splice(idx, 1); else this._bubs.pop();
    this._note2 = null; this._flash = null;
    if (r.sealed) {
      this.api.sound(523); this._later(function () { self.api.sound(659); }, 90); this._later(function () { self.api.sound(784); }, 180);
      this._fx.sealed = true; this._fx.towIn = true; this._fx.towFrom = 0; this._bubs = [];
      this._later(function () { self._fx.sealed = false; self._fx.towIn = false; self._paint(); }, this._ms(1200));
    } else this.api.sound(330 * Math.pow(2, (st.tank.seats - 1) / 12));
    this._paint();
  },
  _release: function () {
    var st = this._cur(); if (!st || st.done) return;
    if (!GhostRaftsCore.release(st)) return;
    this._note2 = null; this._flash = null; this.api.sound(300); this._paint();
  },
  /* press and hold the sealed raft to pop it (a ring fills round the finger) */
  _bindHold: function (bar) {
    var self = this;
    bar.addEventListener('pointerdown', function (ev) {
      if (bar.disabled) return; ev.preventDefault();
      try { bar.setPointerCapture(ev.pointerId); } catch (e) { /* older browsers */ }
      self._cancelHold(); bar.classList.add('is-holding');
      self._hold = setTimeout(function () { self._hold = null; bar.classList.remove('is-holding'); self._pop(); }, self.FAST ? 0 : GhostRaftsCore.HOLD_MS);
    });
    var stop = function () { bar.classList.remove('is-holding'); self._cancelHold(); };
    bar.addEventListener('pointerup', stop); bar.addEventListener('pointercancel', stop); bar.addEventListener('lostpointercapture', stop);
    bar.addEventListener('click', function (ev) {
      if (ev.detail === 0) { self._pop(); return; } /* keyboard Enter */
      var st = self._cur(); if (st && !bar.disabled && !self._hold && st.tank.raft) { self._note2 = { key: 'hintPop' }; self._paint(); }
    });
  },
  _cancelHold: function () { if (this._hold) { clearTimeout(this._hold); this._hold = null; } },
  _pop: function () {
    var st = this._cur(); if (!st) return;
    if (!GhostRaftsCore.pop(st)) return;
    this._note2 = null; this._flash = null; this._bubs = []; this.api.sound(196);
    this._paint();
  },
  _dock: function () {
    var st = this._cur(), self = this; if (!st || st.done) return;
    var r = GhostRaftsCore.dock(st);
    if (!r) return;
    if (r.refused) { this._note2 = { key: 'hintOneTenOnly' }; bounce(this._reeds.querySelector('.gr-ready'), 'gr-wiggle'); this.api.sound(180); this._paint(); return; }
    this._note2 = null; this._fx.sealed = true; this._fx.towIn = true; this._fx.towFrom = 0; this._bubs = [];
    this.api.sound(392); this._later(function () { self._fx.sealed = false; self._fx.towIn = false; self._paint(); }, this._ms(900));
    this._paint();
  },
  _addSpare: function () {
    var st = this._cur(); if (!st || st.done) return;
    var r = GhostRaftsCore.addSpare(st);
    if (!r) { this._note2 = { key: 'hintRoom' }; this.api.sound(180); this._paint(); return; }
    this._note2 = null; this._flash = null; this.api.sound(440 * Math.pow(2, (st.tank.tow + st.tank.loose - 1) / 12)); this._paint();
  },
  _takeBubble: function () {
    var st = this._cur(); if (!st || st.done) return;
    if (!GhostRaftsCore.takeBubble(st)) return;
    if (!st.tank.raft) this._bubs.pop();
    this._note2 = null; this._flash = null; this.api.sound(300); this._paint();
  },
  _pickCard: function (m, el) {
    var st = this._cur(), self = this, C = GhostRaftsCore;
    if (!st || st.done || this._busy) return;
    if (st.explore) { C.playCard(st, m); this.api.sound(330); this._paint(); return; }
    var res = C.pickCard(st, m);
    if (!res) return;
    this._note2 = null;
    this.api.track('check', { id: st.id, result: res.result, card: m });
    if (res.result === 'notyet') {
      this.api.sound(240);
      if (st.kind === 'catch') bounce(this._frame, 'gr-pulse'); else bounce(this._bar, 'gr-pulse');
      this._paint(); return;
    }
    if (res.result === 'wrong') {
      this.api.sound(220); this._flash = m;
      this._later(function () { if (self._flash === m) { self._flash = null; self._paint(); } }, this._ms(1500));
      this._paint(); return;
    }
    this._win();
  },
  _check: function () {
    var st = this.st, self = this, C = GhostRaftsCore;
    if (!st || this._busy || this._playing || st.done) return;
    var res = C.check(st);
    if (!res) return;
    this._note2 = null;
    this.api.track('check', { id: st.id, result: res.result });
    if (res.result === 'empty') { this.api.sound(240); this._fx.pulseRaft = true; this._later(function () { self._fx.pulseRaft = false; self._paint(); }, this._ms(1200)); this._paint(); return; }
    if (res.result !== 'ok') { this.api.sound(220); this._paint(); return; }
    this._win();
  },
  _pickTank: function (side) {
    var st = this.st, self = this; if (!st || st.done || this._busy) return;
    var res = GhostRaftsCore.pickTank(st, side); if (!res) return;
    this.api.track('check', { id: st.id, result: res.result });
    if (res.result !== 'ok') { this.api.sound(220); this._fx.tenFlash = true; this._later(function () { self._fx.tenFlash = false; self._paint(); }, this._ms(700)); this._paint(); return; }
    this._win();
  },
  /* success: the record fills, Dewey paddles a lap with the row behind; then the shell carries on */
  _win: function () {
    var self = this, st = this.st;
    this._flash = null;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._paint();
    if (st && st.done) { this._busy = true; this._later(function () { self._busy = false; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this._ms(this.OK_MS)); }
  },

  /* ---------------- free play ---------------- */
  _dealPlayCards: function () {
    var out = [];
    while (out.length < 3) { var v = 11 + Math.floor(Math.random() * 89); if (v % 10 && out.indexOf(v) < 0) out.push(v); }
    this._playCards = out; return out;
  },
  _togglePlay: function () {
    if (this._busy) return;
    this._note2 = null; this._flash = null; this._cancelHold();
    if (this._playing) { this._playing = false; this._bubs = []; this._paint(); return; }
    this._playing = true; this._play = GhostRaftsCore.newPlay(); this._bubs = []; this._dealPlayCards();
    this._paint();
  }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var grCssDone = false;
function injectGhostRaftsCSS() {
  if (grCssDone || typeof document === 'undefined') return;
  grCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.gr-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--gr-ink:#2B3A36;--gr-coral:#F2784B;--gr-teal:#146B5E;--gr-gold:#E2B54A;--gr-seat:48px;--gr-bub:42px;--gr-tw:40px;--gr-duck:96px;--gr-tankh:330px;--gr-bay:150px;--gr-towy:132px;--gr-barh:54px;--gr-gap:6px;--gr-top:22px;}'
  + '.gr-scene{display:flex;flex-direction:column;gap:8px;} .gr-wrap.is-wide .gr-scene{flex-direction:row;align-items:stretch;gap:12px;} .gr-scene[hidden]{display:none;}'
  + '.gr-col{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;}'
  /* the tank */
  + '.gr-tank{position:relative;height:var(--gr-tankh);border-radius:18px;background:#DDF1EE;box-shadow:inset 0 0 0 3px var(--gr-teal);overflow:hidden;outline:none;}'
  + '.gr-tank:focus-visible{box-shadow:inset 0 0 0 3px var(--gr-teal),0 0 0 3px #F2C14E;}'
  + '.gr-water i{position:absolute;left:6%;right:6%;height:0;border-top:2px solid rgba(20,107,94,.16);border-radius:50%;} .gr-water i:nth-child(1){top:58%;} .gr-water i:nth-child(2){top:80%;}'
  + '.gr-bank{position:absolute;left:0;top:0;width:calc(var(--gr-duck) + 14px);height:calc(var(--gr-duck) * .72);border-radius:0 0 18px 0;background:#F4EBD6;box-shadow:inset -3px -3px 0 #E0D2B2;}'
  + '.gr-duck{position:absolute;left:6px;top:4px;width:var(--gr-duck);height:var(--gr-duck);object-fit:contain;pointer-events:none;z-index:4;transition:left .5s cubic-bezier(.3,1.4,.6,1),top .5s cubic-bezier(.3,1.4,.6,1),width .5s,height .5s;}'
  + '.gr-duck.is-aboard{left:16px;top:calc(var(--gr-top) + var(--gr-barh) - var(--gr-aboard) + 6px);width:var(--gr-aboard);height:var(--gr-aboard);}'
  + '.gr-frame{position:absolute;left:calc(var(--gr-duck) + 22px);top:var(--gr-top);display:grid;grid-template-columns:repeat(5,var(--gr-seat));gap:var(--gr-gap);padding:6px;border-radius:12px;background:#C79A5B;border:0;box-shadow:inset 0 0 0 3px #8A6232;z-index:2;cursor:pointer;} .gr-frame[hidden]{display:none;} .gr-frame:disabled{cursor:default;}'
  + '.gr-frame.gr-pulse{animation:gr-pulsek .35s ease-in-out 2;} @keyframes gr-pulsek{50%{transform:scale(1.04);}}'
  + '.gr-seat{width:var(--gr-seat);height:var(--gr-seat);border-radius:50%;background:#F7E9CF;box-shadow:inset 0 0 0 2px #8A6232;display:grid;place-items:center;}'
  + '.gr-seat i{width:84%;height:84%;border-radius:50%;opacity:0;transform:scale(.3);transition:opacity .12s,transform .18s cubic-bezier(.3,1.5,.6,1);}'
  + '.gr-seat.is-full i,.gr-tb,.gr-bub,.gr-pile i,.gr-gbub,.gr-pair i,.gr-mtow i{background:radial-gradient(circle at 34% 30%,#fff 0 14%,transparent 15%),radial-gradient(circle at 50% 50%,#F79A73,#F2784B 62%,#D95E33);}'
  + '.gr-seat.is-full i{opacity:1;transform:none;box-shadow:0 0 8px rgba(242,120,75,.5);}'
  + '.gr-bar{position:absolute;left:12px;top:var(--gr-top);width:calc(5 * var(--gr-seat) + 4 * var(--gr-gap) + 12px + var(--gr-deck));height:var(--gr-barh);padding:0 10px 0 calc(var(--gr-deck) + 4px);box-sizing:border-box;border:0;border-radius:12px;background:linear-gradient(#F2CF6E,#E2B54A);box-shadow:inset 0 0 0 3px #A9812A,0 3px 0 #A9812A;display:flex;align-items:center;justify-content:center;z-index:3;cursor:default;touch-action:none;}'
  + '.gr-bar[hidden]{display:none;} .gr-bar.is-popable{cursor:pointer;} .gr-bar.is-new{animation:gr-seal .6s ease-out both;} @keyframes gr-seal{0%{filter:brightness(1.6);transform:scale(.92);}60%{filter:brightness(1.25);transform:scale(1.04);}100%{filter:none;transform:none;}}'
  + '.gr-dots{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;width:100%;} .gr-dots i{display:block;aspect-ratio:1;border-radius:50%;background:#FFF5D8;box-shadow:inset 0 0 0 2px #A9812A;}'
  + '.gr-dots i:nth-child(5){margin-right:4px;}'
  + '.gr-badge{display:none;position:absolute;right:-8px;top:-12px;min-width:34px;height:30px;border-radius:15px;background:#fff;color:var(--gr-ink);font:800 20px/30px var(--lcs-font-display);text-align:center;box-shadow:0 0 0 3px #A9812A;} .gr-bar.is-badge .gr-badge{display:block;}'
  + '.gr-ring{display:none;position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;transform:rotate(-90deg);pointer-events:none;} .gr-ring circle{fill:none;stroke:#fff;stroke-width:5;stroke-dasharray:101;stroke-dashoffset:101;}'
  + '.gr-bar.is-holding .gr-ring{display:block;} .gr-bar.is-holding .gr-ring circle{animation:gr-ringk .6s linear forwards;} @keyframes gr-ringk{to{stroke-dashoffset:0;}}'
  + '.gr-bar.gr-pulse{animation:gr-pulsek .35s ease-in-out 2;}'
  + '.gr-bar.is-lap,.gr-tow.is-lap{animation:gr-lap 1.6s ease-in-out 1;} @keyframes gr-lap{25%{transform:translateX(24px);}50%{transform:translate(24px,10px);}75%{transform:translateY(10px);}}'
  /* the tow-line row */
  + '.gr-tow{position:absolute;left:26px;right:8px;top:calc(var(--gr-top) + var(--gr-barh) + 10px);display:flex;flex-wrap:wrap;gap:6px;z-index:2;min-height:44px;margin:0;padding:0;border:0;background:none;align-content:flex-start;cursor:default;} .gr-tow.is-takeable{cursor:pointer;} .gr-tow[hidden]{display:none;}'
  + '.gr-wrap.is-framed .gr-tow{top:var(--gr-towy);left:12px;}'
  + '.gr-tow::before{content:"";position:absolute;left:-14px;top:calc(var(--gr-tw) / 2 - 1px);width:14px;border-top:2px solid #8A6232;}'
  + '.gr-tb{position:relative;width:var(--gr-tw);height:var(--gr-tw);padding:0;border:0;border-radius:50%;flex:none;display:grid;place-items:center;}'
  + '.gr-tb.is-in{animation:gr-hook .35s ease-out both;} @keyframes gr-hook{0%{transform:translateY(40px) scale(.6);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.gr-tb b,.gr-bub b{font:800 16px/1 var(--lcs-font-display);color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.35);}'
  + '.gr-tb.is-slot{background:transparent;outline:3px dashed var(--gr-teal);outline-offset:-3px;animation:gr-blink .8s ease-in-out infinite;}'
  + '.gr-tb.is-unmatched,.gr-tb.is-extra{box-shadow:0 0 0 4px #fff,0 0 0 7px var(--gr-coral),0 0 14px 6px rgba(242,120,75,.55);}'
  + '@keyframes gr-blink{50%{opacity:.35;}}'
  /* loose bubbles */
  + '.gr-loose{position:absolute;inset:0;z-index:3;pointer-events:none;}'
  + '.gr-bub{position:absolute;left:0;top:0;width:var(--gr-bub);height:var(--gr-bub);padding:0;border:0;border-radius:50%;cursor:grab;pointer-events:auto;touch-action:none;box-shadow:0 0 10px rgba(242,120,75,.45);display:grid;place-items:center;}'
  + '.gr-bub::after{content:"";position:absolute;inset:-4px;border-radius:50%;} .gr-bub.is-held{cursor:grabbing;z-index:5;transition:none;} .gr-bub:disabled{cursor:default;}'
  /* the reeds */
  + '.gr-reeds{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-height:56px;padding:6px 10px;border-radius:14px;background:repeating-linear-gradient(90deg,#BFD8A6 0 4px,#D7E8C3 4px 14px);box-shadow:inset 0 0 0 2px #7FA35E;} .gr-reeds[hidden]{display:none;}'
  + '.gr-ready{width:min(220px,46%);height:44px;padding:0 8px;border:0;border-radius:10px;background:linear-gradient(#F2CF6E,#E2B54A);box-shadow:inset 0 0 0 3px #A9812A,0 3px 0 #A9812A;cursor:pointer;display:flex;align-items:center;}'
  + '.gr-ready.is-pulse,.gr-ready.is-blink{animation:gr-pulsek .5s ease-in-out 3;} .gr-ready.gr-wiggle{animation:gr-wig .2s linear 3;} @keyframes gr-wig{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}}'
  + '.gr-pile{display:grid;grid-template-columns:repeat(5,24px);gap:4px;align-content:center;min-height:52px;padding:4px 8px;border:0;border-radius:14px;background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 2px #7FA35E;cursor:pointer;} .gr-pile i{width:24px;height:24px;border-radius:50%;} .gr-pile:disabled{cursor:default;}'
  + '.gr-add{position:relative;width:52px;height:52px;padding:0;border:0;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 3px var(--gr-coral);color:var(--gr-coral);font:800 30px/1 var(--lcs-font-display);cursor:pointer;}'
  /* the ghost bay */
  + '.gr-bay{position:relative;box-sizing:border-box;min-height:64px;padding:26px 10px 10px;border-radius:16px;background:repeating-linear-gradient(135deg,#F1F4F6 0 10px,#E8EDF0 10px 20px);outline:2px dashed #9FB0B8;outline-offset:-2px;display:flex;flex-direction:column;}'
  + '.gr-wrap.is-wide .gr-bay{width:var(--gr-bay);flex:none;}'
  + '.gr-baylab{position:absolute;left:10px;top:4px;font:800 18px/1.1 var(--lcs-font-display);color:#5E7480;}'
  + '.gr-ghost{display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start;opacity:.72;}'
  + '.gr-graft{display:block;width:100%;height:20px;border-radius:6px;background:linear-gradient(#F2CF6E,#E2B54A);box-shadow:inset 0 0 0 2px #A9812A;animation:gr-gin .3s ease-out both;}'
  + '.gr-gbub{display:block;width:24px;height:24px;border-radius:50%;animation:gr-gin .3s ease-out both;}'
  + '@keyframes gr-gin{0%{opacity:0;transform:scale(.4);}100%{opacity:1;transform:none;}}'
  + '.gr-wrap.is-narrow .gr-bay{padding:5px 10px 5px 64px;min-height:48px;} .gr-wrap.is-narrow .gr-baylab{top:50%;transform:translateY(-50%);width:50px;font-size:16px;} .gr-wrap.is-narrow .gr-ghost{flex-direction:row;align-items:center;} .gr-wrap.is-narrow .gr-graft{width:52px;height:18px;} .gr-wrap.is-narrow .gr-gbub{width:22px;height:22px;}'
  + '.gr-wrap.is-narrow.is-words .gr-bay{padding-left:10px;padding-top:24px;} .gr-wrap.is-narrow.is-words .gr-baylab{top:4px;transform:none;width:auto;}'
  /* two tanks */
  + '.gr-twowrap{display:flex;flex-direction:column;gap:10px;} .gr-twowrap[hidden]{display:none;}'
  + '.gr-two{display:grid;grid-template-columns:1fr 1fr;gap:12px;}'
  + '.gr-mini{display:flex;flex-direction:column;align-items:flex-start;gap:10px;min-height:170px;padding:14px;border:0;border-radius:18px;background:#DDF1EE;box-shadow:inset 0 0 0 3px var(--gr-teal);cursor:pointer;text-align:left;}'
  + '.gr-mini.is-right{box-shadow:inset 0 0 0 4px #A9812A,0 0 0 4px #F7E3A6;} .gr-mini.is-wrongpick{box-shadow:inset 0 0 0 3px var(--gr-teal),0 0 0 4px rgba(242,120,75,.5);} .gr-mini:disabled{cursor:default;}'
  + '.gr-mbar{width:100%;max-width:240px;height:40px;padding:0 8px;box-sizing:border-box;border-radius:10px;background:linear-gradient(#F2CF6E,#E2B54A);box-shadow:inset 0 0 0 3px #A9812A;display:flex;align-items:center;}'
  + '.gr-mini.is-flashten .gr-mbar{animation:gr-seal .6s ease-out 1;}'
  + '.gr-mtow{display:flex;flex-wrap:wrap;gap:5px;} .gr-mtow i{width:30px;height:30px;border-radius:50%;}'
  + '.gr-mrec{font:800 22px/1 var(--lcs-font-display);color:var(--gr-ink);} .gr-mrec:empty{display:none;}'
  + '.gr-pair{display:flex;flex-direction:column;gap:6px;padding:8px 12px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 2px #DDE6E3;} .gr-pair[hidden]{display:none;}'
  + '.gr-prow{display:flex;gap:8px;} .gr-pair i{width:30px;height:30px;border-radius:50%;flex:none;} .gr-pair i.is-glow{box-shadow:0 0 0 3px #fff,0 0 0 6px var(--gr-coral),0 0 12px 5px rgba(242,120,75,.55);}'
  /* the record + cards */
  + '.gr-recrow{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px;} .gr-recrow[hidden]{display:none;}'
  + '.gr-record{display:flex;align-items:center;gap:8px;font:800 30px/1 var(--lcs-font-display);color:var(--gr-ink);} .gr-record[hidden]{display:none;}'
  + '.gr-ten{color:#A9812A;}'
  + '.gr-box{min-width:52px;height:50px;padding:0 6px;box-sizing:border-box;border-radius:10px;display:grid;place-items:center;background:#fff;box-shadow:inset 0 0 0 3px var(--gr-ink);}'
  + '.gr-box.is-empty{box-shadow:none;outline:3px dashed #8C9894;outline-offset:-3px;} .gr-box.is-wrong{color:#C95A31;box-shadow:inset 0 0 0 3px var(--gr-coral);} .gr-box.is-ok{animation:gr-gin .4s ease-out both;}'
  + '.gr-cards{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;} .gr-cards[hidden]{display:none;}'
  + '.gr-card{min-width:88px;min-height:64px;padding:6px 12px;border:0;border-radius:12px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--gr-ink),0 3px 0 #C9BFA8;font:800 36px/1 var(--lcs-font-display);color:var(--gr-teal);cursor:pointer;}'
  + '.gr-card.is-out{opacity:.35;transform:translateY(-6px);} .gr-card.is-wait{box-shadow:inset 0 0 0 3px #B9C4C0,0 3px 0 #DDE6E3;color:#7E9690;} .gr-card:disabled{cursor:default;}'
  + '.gr-wrap.is-words .gr-card{font:800 19px/1.15 var(--lcs-font-body);min-width:120px;max-width:220px;overflow-wrap:anywhere;}'
  /* the note + actions */
  + '.gr-note{box-sizing:border-box;align-self:center;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--gr-ink);text-align:center;} .gr-note[hidden]{display:none;}'
  + '.gr-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .gr-note.is-good{border-color:#C9A24A;background:#FFF6DA;font-family:var(--lcs-font-display);font-size:21px;font-weight:800;}'
  + '.gr-actions{display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;}'
  + '.gr-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font:800 18px/1 var(--lcs-font-display);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .gr-check[hidden]{display:none;} .gr-check:disabled{opacity:.5;cursor:default;}'
  + '.gr-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .gr-tool[hidden]{display:none;} .gr-tool:disabled{opacity:.45;cursor:default;}'
  + '.gr-seat:focus-visible,.gr-bar:focus-visible,.gr-bub:focus-visible,.gr-tb:focus-visible,.gr-ready:focus-visible,.gr-pile:focus-visible,.gr-add:focus-visible,.gr-card:focus-visible,.gr-mini:focus-visible,.gr-check:focus-visible,.gr-tool:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.gr-wrap.is-narrow{gap:8px;} .gr-wrap.is-narrow .gr-note{font-size:15px;padding:6px 10px;} .gr-wrap.is-narrow .gr-record{font-size:24px;gap:6px;} .gr-wrap.is-narrow .gr-box{min-width:44px;height:44px;} .gr-wrap.is-narrow .gr-card{min-width:72px;min-height:56px;font-size:30px;}'
  + '.gr-wrap.is-narrow.is-words .gr-cards{flex-wrap:nowrap;width:100%;gap:6px;} .gr-wrap.is-narrow.is-words .gr-card{flex:1 1 0;min-width:0;max-width:none;min-height:52px;padding:4px 6px;font-size:15px;line-height:1.12;hyphens:manual;overflow-wrap:normal;}'
  + '.gr-wrap.is-wide .gr-mini{min-height:230px;padding:20px;gap:14px;} .gr-wrap.is-wide .gr-mbar{height:52px;max-width:300px;} .gr-wrap.is-wide .gr-mtow{gap:7px;} .gr-wrap.is-wide .gr-mtow i,.gr-wrap.is-wide .gr-pair i{width:38px;height:38px;} .gr-wrap.is-wide .gr-mrec{font-size:28px;}'
  + '.gr-wrap.is-narrow .gr-reeds{flex-wrap:nowrap;padding:5px 8px;gap:6px;} .gr-wrap.is-narrow .gr-ready{width:120px;flex:none;padding:0 6px;} .gr-wrap.is-narrow .gr-ready .gr-dots{gap:2px;} .gr-wrap.is-narrow .gr-pile{grid-template-columns:repeat(5,22px);gap:3px;padding:4px 6px;flex:none;} .gr-wrap.is-narrow .gr-pile i{width:22px;height:22px;}'
  + '.gr-wrap.is-narrow .gr-mini{min-height:140px;padding:10px;} .gr-wrap.is-narrow .gr-mtow i,.gr-wrap.is-narrow .gr-pair i{width:22px;height:22px;} .gr-wrap.is-narrow .gr-mrec{font-size:18px;}'
  + '@media (prefers-reduced-motion:reduce){.gr-wrap *{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'gr-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = GhostRaftsActivity;
if (typeof window !== 'undefined') window.GhostRaftsActivity = GhostRaftsActivity;
