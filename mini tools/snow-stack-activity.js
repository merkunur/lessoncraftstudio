/* =====================================================================
   snow-stack-activity.js — ACTIVITY #140 of the one-by-one rebuild:
   "Squirrel's Fair Winter Piles" → THE SNOW-LID STACK (2.OA.C.4; G2-216/
   217 in Levels 2–3; all 11 locales). Model: snow-stack-core.js.
   Design: docs/activities-rebuild/designs/140-winter-piles.md
   ---------------------------------------------------------------------
   The invention: the piles are stacked one on top of another on a tree
   stump, and the snow lays one flat lid only on a fair stack. Twigs cut
   the acorn tray between rows; a pile that is bigger than the others
   sticks out of the stack (coral) and the lid slides off. Level 1 cuts
   into fair piles; Level 2 cuts piles that fit a hole of k (how many
   holes?); Level 3 shares a heap one acorn at a time into n holes (how
   many each?). Every finished stack goes into the hollow of the trunk.
   Acorns in the tray, the heap and the holes are drawn counters; the one
   library acorn is their full-size label (the array ruling). No timer,
   no score.
   Test seams: window.SnowStackActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._cut / ._deal /
   ._undeal / ._stack / ._type / ._del / ._check / .FAST / .OK_MS.
   ===================================================================== */
var SnowStackActivity = {
  id: 'snow-stack',
  /* the drawn apparatus (the hierarchy gate): the board, the tray, the heap, the stump, the holes */
  apparatusClasses: ['ws-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Fair Winter Piles","de":"Gleich große Häufchen","fr":"Des tas égaux pour l’hiver","es":"Montoncitos iguales para el invierno","pt":"Montinhos iguais para o inverno","it":"Mucchietti uguali per l’inverno","nl":"Even grote winterhoopjes","sv":"Lika stora vinterhögar","da":"Lige store vinterbunker","no":"Like store vinterhauger","fi":"Yhtä suuret talvikasat"},
    instruction: {"en":"Cut the rows into fair piles and stack them. Only fair piles take a flat lid of snow.","de":"Teile die Reihen in gleich große Häufchen und staple sie. Nur gleich große Häufchen bekommen einen flachen Schneedeckel.","fr":"Coupe les rangées en tas égaux et empile-les. Seuls les tas égaux reçoivent un couvercle de neige bien plat.","es":"Corta las filas en montoncitos iguales y apílalos. Solo los montoncitos iguales reciben una tapa plana de nieve.","pt":"Corte as fileiras em montinhos iguais e empilhe. Só montinhos iguais ganham uma tampa de neve bem lisa.","it":"Taglia le file in mucchietti uguali e impilali. Solo i mucchietti uguali ricevono un coperchio di neve ben piatto.","nl":"Knip de rijen in even grote hoopjes en stapel ze. Alleen even grote hoopjes krijgen een plat deksel van sneeuw.","sv":"Dela raderna i lika stora högar och stapla dem. Bara lika stora högar får ett platt lock av snö.","da":"Del rækkerne i lige store bunker, og stabl dem. Kun lige store bunker får et fladt låg af sne.","no":"Del radene i like store hauger, og stable dem. Bare like store hauger får et flatt lokk av snø.","fi":"Jaa rivit yhtä suuriin kasoihin ja pinoa ne. Vain yhtä suuret kasat saavat tasaisen lumikannen."},
    pOpen: {"en":"Cut the rows into fair piles.","de":"Teile die Reihen in gleich große Häufchen.","fr":"Coupe les rangées en tas égaux.","es":"Corta las filas en montoncitos iguales.","pt":"Corte as fileiras em montinhos iguais.","it":"Taglia le file in mucchietti uguali.","nl":"Knip de rijen in even grote hoopjes.","sv":"Dela raderna i lika stora högar.","da":"Del rækkerne i lige store bunker.","no":"Del radene i like store hauger.","fi":"Jaa rivit yhtä suuriin kasoihin."},
    pN: {"en":"Cut the rows into {n} fair piles.","de":"Teile die Reihen in {n} gleich große Häufchen.","fr":"Coupe les rangées en {n} tas égaux.","es":"Corta las filas en {n} montoncitos iguales.","pt":"Corte as fileiras em {n} montinhos iguais.","it":"Taglia le file in {n} mucchietti uguali.","nl":"Knip de rijen in {n} even grote hoopjes.","sv":"Dela raderna i {n} lika stora högar.","da":"Del rækkerne i {n} lige store bunker.","no":"Del radene i {n} like store hauger.","fi":"Jaa rivit {n} yhtä suureen kasaan."},
    pMatch: {"en":"Cut the rows to make {eq}.","de":"Teile die Reihen so, dass du {eq} bekommst.","fr":"Coupe les rangées pour obtenir {eq}.","es":"Corta las filas para formar {eq}.","pt":"Corte as fileiras para formar {eq}.","it":"Taglia le file per ottenere {eq}.","nl":"Knip de rijen zo dat je {eq} krijgt.","sv":"Dela raderna så att det blir {eq}.","da":"Del rækkerne, så det giver {eq}.","no":"Del radene slik at det blir {eq}.","fi":"Jaa rivit niin, että saat {eq}."},
    pFix: {"en":"These piles are not fair. Move the twigs to make {n} fair piles.","de":"Diese Häufchen sind nicht gleich groß. Verschiebe die Zweige, bis es {n} gleich große Häufchen sind.","fr":"Ces tas ne sont pas égaux. Déplace les brindilles pour faire {n} tas égaux.","es":"Estos montoncitos no son iguales. Mueve las ramitas para hacer {n} montoncitos iguales.","pt":"Estes montinhos não são iguais. Mude os gravetos de lugar para fazer {n} montinhos iguais.","it":"Questi mucchietti non sono uguali. Sposta i rametti per fare {n} mucchietti uguali.","nl":"Deze hoopjes zijn niet even groot. Verschuif de takjes tot je {n} even grote hoopjes hebt.","sv":"De här högarna är inte lika stora. Flytta kvistarna så att det blir {n} lika stora högar.","da":"De her bunker er ikke lige store. Flyt kvistene, så der bliver {n} lige store bunker.","no":"Disse haugene er ikke like store. Flytt kvistene så det blir {n} like store hauger.","fi":"Nämä kasat eivät ole yhtä suuria. Siirrä oksia niin, että saat {n} yhtä suurta kasaa."},
    pHoles: {"en":"Each hole holds {k}. Cut piles that fit.","de":"In jedes Versteck passen {k}. Teile Häufchen ab, die genau passen.","fr":"Chaque cachette peut contenir {k} glands. Coupe des tas de la bonne taille.","es":"En cada hueco caben {k}. Corta montoncitos que quepan justo.","pt":"Em cada buraco cabem {k}. Corte montinhos do tamanho certo.","it":"In ogni nascondiglio ci stanno {k} ghiande. Taglia mucchietti della misura giusta.","nl":"In elk holletje passen {k} eikels. Knip hoopjes die precies passen.","sv":"I varje hål får det plats {k}. Dela upp högar som passar precis.","da":"Der er plads til {k} i hvert hul. Del bunker af, der passer præcis.","no":"Det er plass til {k} i hvert hull. Del av hauger som passer akkurat.","fi":"Jokaiseen koloon mahtuu {k}. Jaa sopivan kokoisia kasoja."},
    pShare: {"en":"Share the acorns fairly into {n} holes.","de":"Verteile die Eicheln gerecht auf {n} Verstecke.","fr":"Partage les glands équitablement entre {n} cachettes.","es":"Reparte las bellotas en partes iguales entre {n} huecos.","pt":"Divida as bolotas igualmente entre {n} buracos.","it":"Dividi le ghiande in parti uguali fra {n} nascondigli.","nl":"Verdeel de eikels eerlijk over {n} holletjes.","sv":"Dela ekollonen lika mellan {n} hål.","da":"Del agernene lige mellem {n} huller.","no":"Del eikenøttene likt mellom {n} hull.","fi":"Jaa tammenterhot tasan {n} koloon."},
    boxPile: {"en":"How many in each pile?","de":"Wie viele sind in jedem Häufchen?","fr":"Combien dans chaque tas ?","es":"¿Cuántas hay en cada montoncito?","pt":"Quantas há em cada montinho?","it":"Quante in ogni mucchietto?","nl":"Hoeveel in elk hoopje?","sv":"Hur många i varje hög?","da":"Hvor mange i hver bunke?","no":"Hvor mange i hver haug?","fi":"Montako kussakin kasassa?"},
    boxHoles: {"en":"How many holes?","de":"Wie viele Verstecke?","fr":"Combien de cachettes ?","es":"¿Cuántos huecos?","pt":"Quantos buracos?","it":"Quanti nascondigli?","nl":"Hoeveel holletjes?","sv":"Hur många hål?","da":"Hvor mange huller?","no":"Hvor mange hull?","fi":"Montako koloa?"},
    boxEach: {"en":"How many in each hole?","de":"Wie viele kommen in jedes Versteck?","fr":"Combien dans chaque cachette ?","es":"¿Cuántas van en cada hueco?","pt":"Quantas vão em cada buraco?","it":"Quante in ogni nascondiglio?","nl":"Hoeveel in elk holletje?","sv":"Hur många i varje hål?","da":"Hvor mange i hvert hul?","no":"Hvor mange i hvert hull?","fi":"Montako kuhunkin koloon?"},
    eqHoles: {"en":"{total} acorns, {k} in each hole: {box} holes","de":"{total} Eicheln, {k} in jedes Versteck: {box} Verstecke","fr":"{total} glands, {k} par cachette : {box} cachettes","es":"{total} bellotas, {k} en cada hueco: {box} huecos","pt":"{total} bolotas, {k} em cada buraco: {box} buracos","it":"{total} ghiande, {k} per nascondiglio: {box} nascondigli","nl":"{total} eikels, {k} in elk holletje: {box} holletjes","sv":"{total} ekollon, {k} i varje hål: {box} hål","da":"{total} agern, {k} i hvert hul: {box} huller","no":"{total} eikenøtter, {k} i hvert hull: {box} hull","fi":"{total} terhoa, {k} jokaiseen koloon: {box} koloa"},
    eqShare: {"en":"{total} acorns, {n} holes: {box} in each","de":"{total} Eicheln, {n} Verstecke: {box} in jedes","fr":"{total} glands, {n} cachettes : {box} par cachette","es":"{total} bellotas, {n} huecos: {box} en cada uno","pt":"{total} bolotas, {n} buracos: {box} em cada um","it":"{total} ghiande, {n} nascondigli: {box} in ognuno","nl":"{total} eikels, {n} holletjes: {box} in elk","sv":"{total} ekollon, {n} hål: {box} i varje","da":"{total} agern, {n} huller: {box} i hvert","no":"{total} eikenøtter, {n} hull: {box} i hvert","fi":"{total} terhoa, {n} koloa: {box} kuhunkin"},
    hCut: {"en":"Tap a gap between two rows to put in a twig.","de":"Tippe auf eine Lücke zwischen zwei Reihen, um einen Zweig hineinzulegen.","fr":"Touche l’espace entre deux rangées pour y poser une brindille.","es":"Toca el espacio entre dos filas para poner una ramita.","pt":"Toque no espaço entre duas fileiras para colocar um graveto.","it":"Tocca lo spazio fra due file per mettere un rametto.","nl":"Tik op de ruimte tussen twee rijen om er een takje in te leggen.","sv":"Tryck på mellanrummet mellan två rader för att lägga i en kvist.","da":"Tryk på mellemrummet mellem to rækker for at lægge en kvist i.","no":"Trykk på mellomrommet mellom to rader for å legge i en kvist.","fi":"Napauta kahden rivin väliä, niin siihen tulee oksa."},
    hDeal: {"en":"Tap a hole to give it an acorn.","de":"Tippe auf ein Versteck, um eine Eichel hineinzulegen.","fr":"Touche une cachette pour lui donner un gland.","es":"Toca un hueco para darle una bellota.","pt":"Toque num buraco para colocar uma bolota nele.","it":"Tocca un nascondiglio per dargli una ghianda.","nl":"Tik op een holletje om er een eikel in te leggen.","sv":"Tryck på ett hål för att ge det ett ekollon.","da":"Tryk på et hul for at give det et agern.","no":"Trykk på et hull for å gi det en eikenøtt.","fi":"Napauta koloa, niin se saa terhon."},
    unfair: {"en":"These piles are not the same size. Move the twigs so every pile matches.","de":"Diese Häufchen sind nicht gleich groß. Verschiebe die Zweige, bis alle gleich sind.","fr":"Ces tas n’ont pas la même taille. Déplace les brindilles pour que tous les tas soient pareils.","es":"Estos montoncitos no son del mismo tamaño. Mueve las ramitas hasta que todos sean iguales.","pt":"Estes montinhos não têm o mesmo tamanho. Mude os gravetos até todos ficarem iguais.","it":"Questi mucchietti non sono della stessa grandezza. Sposta i rametti finché sono tutti uguali.","nl":"Deze hoopjes zijn niet even groot. Verschuif de takjes tot alle hoopjes gelijk zijn.","sv":"De här högarna är inte lika stora. Flytta kvistarna tills alla högar är lika.","da":"De her bunker er ikke lige store. Flyt kvistene, til alle bunker er ens.","no":"Disse haugene er ikke like store. Flytt kvistene til alle haugene er like.","fi":"Nämä kasat eivät ole yhtä suuria. Siirrä oksia, kunnes kaikki kasat ovat yhtä suuret."},
    unfairDeal: {"en":"The holes do not have the same number of acorns. Give every hole the same number.","de":"In den Verstecken sind nicht gleich viele. Leg in jedes Versteck gleich viele.","fr":"Les cachettes n’ont pas le même nombre de glands. Rends-les toutes pareilles.","es":"Los huecos no tienen la misma cantidad de bellotas. Haz que todos tengan la misma cantidad.","pt":"Os buracos não têm a mesma quantidade de bolotas. Deixe todos com a mesma quantidade.","it":"I nascondigli non hanno lo stesso numero di ghiande. Metti lo stesso numero in ogni nascondiglio.","nl":"In de holletjes liggen niet evenveel eikels. Leg in elk holletje evenveel.","sv":"Det är inte lika många i alla hål. Se till att alla hål har lika många.","da":"Hullerne har ikke lige mange. Sørg for, at alle huller har lige mange.","no":"Hullene har ikke like mange. Sørg for at alle hullene har like mange.","fi":"Koloissa ei ole yhtä monta terhoa. Laita jokaiseen koloon yhtä monta."},
    wrongCount: {"en":"Fair! But the squirrel needs {n} piles.","de":"Gleich groß! Aber das Eichhörnchen braucht {n} Häufchen.","fr":"Égaux ! Mais l’écureuil a besoin de {n} tas.","es":"¡Iguales! Pero la ardilla necesita {n} montoncitos.","pt":"Iguais! Mas o esquilo precisa de {n} montinhos.","it":"Uguali! Ma lo scoiattolo ha bisogno di {n} mucchietti.","nl":"Even groot! Maar de eekhoorn heeft {n} hoopjes nodig.","sv":"Lika stora! Men ekorren behöver {n} högar.","da":"Lige store! Men egernet har brug for {n} bunker.","no":"Like store! Men ekornet trenger {n} hauger.","fi":"Yhtä suuret! Mutta orava tarvitsee {n} kasaa."},
    mould: {"en":"Each hole holds {k}. Make every pile fill the mould.","de":"In jedes Versteck passen {k}. Jedes Häufchen muss die Form genau füllen.","fr":"Chaque cachette peut contenir {k} glands. Chaque tas doit remplir le moule.","es":"En cada hueco caben {k}. Cada montoncito debe llenar el molde.","pt":"Em cada buraco cabem {k}. Cada montinho tem que encher a forma.","it":"In ogni nascondiglio ci stanno {k} ghiande. Ogni mucchietto deve riempire lo stampo.","nl":"In elk holletje passen {k} eikels. Elk hoopje moet de vorm precies vullen.","sv":"I varje hål får det plats {k}. Varje hög ska fylla formen precis.","da":"Der er plads til {k} i hvert hul. Hver bunke skal fylde formen helt.","no":"Det er plass til {k} i hvert hull. Hver haug skal fylle formen helt.","fi":"Jokaiseen koloon mahtuu {k}. Jokaisen kasan pitää täyttää muotti tarkasti."},
    heapLeft: {"en":"Fair so far! Share all the acorns.","de":"Bis jetzt gleich viele! Verteile alle Eicheln.","fr":"Pour l’instant, chaque cachette en a autant ! Partage tous les glands.","es":"¡Iguales hasta ahora! Reparte todas las bellotas.","pt":"Iguais até agora! Divida todas as bolotas.","it":"Finora uguali! Dividi tutte le ghiande.","nl":"Tot nu toe gelijk! Verdeel alle eikels.","sv":"Lika många hittills! Dela ut alla ekollon.","da":"Lige mange indtil videre! Del alle agernene ud.","no":"Like mange så langt! Del ut alle eikenøttene.","fi":"Tähän asti tasan! Jaa kaikki terhot."},
    readPile: {"en":"Count the acorns in one pile.","de":"Zähl die Eicheln in einem Häufchen.","fr":"Compte les glands d’un seul tas.","es":"Cuenta las bellotas de un montoncito.","pt":"Conte as bolotas de um montinho.","it":"Conta le ghiande di un mucchietto.","nl":"Tel de eikels in één hoopje.","sv":"Räkna ekollonen i en hög.","da":"Tæl agernene i én bunke.","no":"Tell eikenøttene i én haug.","fi":"Laske terhot yhdestä kasasta."},
    readStack: {"en":"Count the piles in the stack.","de":"Zähl die Häufchen im Stapel.","fr":"Compte les tas de la pile.","es":"Cuenta los montoncitos de la pila.","pt":"Conte os montinhos da pilha.","it":"Conta i mucchietti della pila.","nl":"Tel de hoopjes in de stapel.","sv":"Räkna högarna i stapeln.","da":"Tæl bunkerne i stablen.","no":"Tell haugene i stabelen.","fi":"Laske pinon kasat."},
    readEach: {"en":"Count the acorns in one hole.","de":"Zähl die Eicheln in einem Versteck.","fr":"Compte les glands d’une seule cachette.","es":"Cuenta las bellotas de un hueco.","pt":"Conte as bolotas de um buraco.","it":"Conta le ghiande di un nascondiglio.","nl":"Tel de eikels in één holletje.","sv":"Räkna ekollonen i ett hål.","da":"Tæl agernene i ét hul.","no":"Tell eikenøttene i ett hull.","fi":"Laske terhot yhdestä kolosta."},
    miss2Cut: {"en":"Try the dotted places.","de":"Probier es an den gepunkteten Stellen.","fr":"Essaie aux endroits en pointillés.","es":"Prueba en los lugares punteados.","pt":"Tente nos lugares pontilhados.","it":"Prova nei punti tratteggiati.","nl":"Probeer het bij de stippellijnen.","sv":"Prova på de prickade ställena.","da":"Prøv de prikkede steder.","no":"Prøv de prikkete stedene.","fi":"Kokeile laittaa oksa pisteviivan kohdalle."},
    miss2Deal: {"en":"Each hole got one acorn. Keep going round: one for each hole.","de":"Jedes Versteck hat eine Eichel bekommen. Mach reihum weiter: eine für jedes Versteck.","fr":"Chaque cachette a reçu un gland. Continue le tour : un pour chaque cachette.","es":"Cada hueco recibió una bellota. Sigue dando la vuelta: una para cada hueco.","pt":"Cada buraco ganhou uma bolota. Continue dando a volta: uma para cada buraco.","it":"Ogni nascondiglio ha avuto una ghianda. Continua il giro: una per ogni nascondiglio.","nl":"Elk holletje kreeg één eikel. Ga zo door, om de beurt: één voor elk holletje.","sv":"Varje hål fick ett ekollon. Fortsätt runt: ett till varje hål.","da":"Hvert hul fik ét agern. Fortsæt rundt: ét til hvert hul.","no":"Hvert hull fikk én eikenøtt. Fortsett rundt: én til hvert hull.","fi":"Jokainen kolo sai yhden terhon. Jatka kierrosta: yksi jokaiseen koloon."},
    okPiles: {"en":"Fair piles! {eq} = {total}.","de":"Gleich große Häufchen! {eq} = {total}.","fr":"Des tas égaux ! {eq} = {total}.","es":"¡Montoncitos iguales! {eq} = {total}.","pt":"Montinhos iguais! {eq} = {total}.","it":"Mucchietti uguali! {eq} = {total}.","nl":"Even grote hoopjes! {eq} = {total}.","sv":"Lika stora högar! {eq} = {total}.","da":"Lige store bunker! {eq} = {total}.","no":"Like store hauger! {eq} = {total}.","fi":"Yhtä suuret kasat! {eq} = {total}."},
    okHoles: {"en":"{total} acorns make {piles} holes of {k}: {eq} = {total}.","de":"{total} Eicheln füllen {piles} Verstecke mit je {k}: {eq} = {total}.","fr":"{total} glands remplissent {piles} cachettes de {k} : {eq} = {total}.","es":"{total} bellotas llenan {piles} huecos de {k}: {eq} = {total}.","pt":"{total} bolotas enchem {piles} buracos de {k}: {eq} = {total}.","it":"{total} ghiande riempiono {piles} nascondigli da {k}: {eq} = {total}.","nl":"{total} eikels vullen {piles} holletjes van {k}: {eq} = {total}.","sv":"{total} ekollon fyller {piles} hål med {k} i varje: {eq} = {total}.","da":"{total} agern fylder {piles} huller med {k} i hvert: {eq} = {total}.","no":"{total} eikenøtter fyller {piles} hull med {k} i hvert: {eq} = {total}.","fi":"{total} terhoa täyttää {piles} koloa, joissa kussakin on {k}: {eq} = {total}."},
    okShare: {"en":"Each hole gets {each}: {eq} = {total}.","de":"Jedes Versteck bekommt {each}: {eq} = {total}.","fr":"Chaque cachette reçoit {each} glands : {eq} = {total}.","es":"A cada hueco le tocan {each}: {eq} = {total}.","pt":"Cada buraco fica com {each}: {eq} = {total}.","it":"Ogni nascondiglio riceve {each} ghiande: {eq} = {total}.","nl":"Elk holletje krijgt {each}: {eq} = {total}.","sv":"Varje hål får {each}: {eq} = {total}.","da":"Hvert hul får {each}: {eq} = {total}.","no":"Hvert hull får {each}: {eq} = {total}.","fi":"Jokainen kolo saa {each}: {eq} = {total}."},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    lv1: {"en":"Fair piles","de":"Gleich große Häufchen","fr":"Tas égaux","es":"Montoncitos iguales","pt":"Montinhos iguais","it":"Mucchietti uguali","nl":"Even grote hoopjes","sv":"Lika stora högar","da":"Lige store bunker","no":"Like store hauger","fi":"Yhtä suuret kasat"},
    lv2: {"en":"How many holes?","de":"Wie viele Verstecke?","fr":"Combien de cachettes ?","es":"¿Cuántos huecos?","pt":"Quantos buracos?","it":"Quanti nascondigli?","nl":"Hoeveel holletjes?","sv":"Hur många hål?","da":"Hvor mange huller?","no":"Hvor mange hull?","fi":"Montako koloa?"},
    lv3: {"en":"Share the heap","de":"Gerecht verteilen","fr":"Partager le tas","es":"Repartir el montón","pt":"Dividir o monte","it":"Dividere il mucchio","nl":"De hoop verdelen","sv":"Dela högen","da":"Del bunken","no":"Del haugen","fi":"Jaa kasa"},
    setEq: {"en":"Equation","de":"Rechnung","fr":"Calcul","es":"Operación","pt":"Conta","it":"Operazione","nl":"Som","sv":"Uträkning","da":"Regnestykke","no":"Regnestykke","fi":"Lasku"},
    eShown: {"en":"Shown","de":"Sichtbar","fr":"Affiché","es":"Visible","pt":"Visível","it":"Visibile","nl":"Zichtbaar","sv":"Synlig","da":"Synligt","no":"Synlig","fi":"Näkyvissä"},
    eHidden: {"en":"Hidden","de":"Ausgeblendet","fr":"Caché","es":"Oculta","pt":"Escondida","it":"Nascosta","nl":"Verborgen","sv":"Dold","da":"Skjult","no":"Skjult","fi":"Piilossa"},
    aGap: {"en":"Gap after row {i}","de":"Lücke nach Reihe {i}","fr":"Espace après la rangée {i}","es":"Espacio después de la fila {i}","pt":"Espaço depois da fileira {i}","it":"Spazio dopo la fila {i}","nl":"Ruimte na rij {i}","sv":"Mellanrum efter rad {i}","da":"Mellemrum efter række {i}","no":"Mellomrom etter rad {i}","fi":"Väli rivin {i} jälkeen"},
    aPocket: {"en":"Hole {i}: {n}. Tap to add an acorn, hold to take one out.","de":"Versteck {i}: {n}. Tippe, um eine Eichel dazuzulegen, halte gedrückt, um eine herauszunehmen.","fr":"Cachette {i} : {n}. Touche pour ajouter un gland, garde le doigt appuyé pour en retirer un.","es":"Hueco {i}: {n}. Toca para poner una bellota, mantén presionado para quitar una.","pt":"Buraco {i}: {n}. Toque para pôr uma bolota, segure para tirar uma.","it":"Nascondiglio {i}: {n}. Tocca per aggiungere una ghianda, tieni premuto per toglierne una.","nl":"Holletje {i}: {n}. Tik om een eikel toe te voegen, houd vast om er een weg te halen.","sv":"Hål {i}: {n}. Tryck för att lägga i ett ekollon, håll inne för att ta ut ett.","da":"Hul {i}: {n}. Tryk for at lægge et agern i, hold nede for at tage et ud.","no":"Hull {i}: {n}. Trykk for å legge i en eikenøtt, hold inne for å ta ut en.","fi":"Kolo {i}: {n}. Napauta lisätäksesi terhon, pidä painettuna ottaaksesi yhden pois."},
    aPocketEmpty: {"en":"Hole {i}, empty. Tap to add an acorn.","de":"Versteck {i}, leer. Tippe, um eine Eichel hineinzulegen.","fr":"Cachette {i}, vide. Touche pour y mettre un gland.","es":"Hueco {i}, vacío. Toca para poner una bellota.","pt":"Buraco {i}, vazio. Toque para pôr uma bolota.","it":"Nascondiglio {i}, vuoto. Tocca per metterci una ghianda.","nl":"Holletje {i}, leeg. Tik om er een eikel in te leggen.","sv":"Hål {i}, tomt. Tryck för att lägga i ett ekollon.","da":"Hul {i}, tomt. Tryk for at lægge et agern i.","no":"Hull {i}, tomt. Trykk for å legge i en eikenøtt.","fi":"Kolo {i}, tyhjä. Napauta lisätäksesi terhon."},
    aStack: {"en":"Stack the piles","de":"Häufchen stapeln","fr":"Empiler les tas","es":"Apilar los montoncitos","pt":"Empilhar os montinhos","it":"Impila i mucchietti","nl":"Stapel de hoopjes","sv":"Stapla högarna","da":"Stabl bunkerne","no":"Stable haugene","fi":"Pinoa kasat"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Radera","da":"Slet","no":"Slett","fi":"Poista"},
    aStore: {"en":"Acorns stored for winter: {n}","de":"Eicheln für den Winter: {n}","fr":"Glands rangés pour l’hiver : {n}","es":"Bellotas guardadas para el invierno: {n}","pt":"Bolotas guardadas para o inverno: {n}","it":"Ghiande messe da parte per l’inverno: {n}","nl":"Eikels bewaard voor de winter: {n}","sv":"Ekollon sparade till vintern: {n}","da":"Agern gemt til vinteren: {n}","no":"Eikenøtter spart til vinteren: {n}","fi":"Talveksi säästetyt terhot: {n}"},
  },/*STRINGS-END*/
  defaults: { level: '1', eq: 'shown' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'lv1' }, { value: '2', labelKey: 'lv2' }, { value: '3', labelKey: 'lv3' }] },
    { key: 'eq', type: 'choice', labelKey: 'setEq', options: [{ value: 'shown', labelKey: 'eShown' }, { value: 'hidden', labelKey: 'eHidden' }] }
  ],
  OK_MS: 500, FAST: false, HOLD_MS: 450,
  BANDS: ['#F6DDB0', '#CFE8D4', '#D9DFF6', '#F6D3E2', '#FBE8BC', '#D3ECEC'],
  LAYERS: ['#E5AE62', '#7CC497', '#8DA3E6', '#E48EB2', '#EDBE4C', '#6CC2C2'],
  ACORN: 'miscellaneous/acorn', SQUIRREL: 'forest creatures/squirrel',

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._stored = 0;
    this._timers = []; this._ro = null; this._view = {};
    injectSnowStackCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._level()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return SnowStackCore.levelOf(this._setting('level')); },
  _eq: function () { return SnowStackCore.eqOf(this._setting('eq')); },
  _ensurePool: function () {
    var k = this._level();
    if (!this._pool || this._poolKey !== k) { this._pool = SnowStackCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SnowStackCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'snow-stack.' + this._level() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st, rd = st && st.rd; if (!st) return '';
    if (st.level === '2') return this._t('pHoles', { k: rd.k });
    if (st.level === '3') return this._t('pShare', { n: rd.n });
    if (rd.kind === 'open') return this._t('pOpen');
    if (rd.kind === 'fix') return this._t('pFix', { n: rd.n });
    /* the match rounds name the total and the number of equal piles, never the pile size (that is the typed answer) */
    if (rd.kind === 'match') { var a = []; for (var i = 0; i < rd.n; i++) a.push('▢'); return this._t('pMatch', { eq: a.join(' + ') + ' = ' + rd.r * rd.c }); }
    return this._t('pN', { n: rd.n });
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = SnowStackCore.newState(this._level(), k);
    this._view = { note: '', ok: '' };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth();
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
  _dims: function () { var W = this._width(), B = SnowStackCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ws-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="ws-board ws-art"><div class="ws-left"></div><div class="ws-right"></div></div><div class="ws-pockets"></div><p class="ws-note" aria-live="polite"></p><div class="ws-answer"></div><div class="ws-pad"></div><p class="ws-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._key_(e); });
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
  _help: function () { var st = this.st; return st.last && st.misses > 0 && !st.done ? st.last.result : null; },
  _pic: function (path, size, cls) {
    return '<img class="ws-pic ' + (cls || '') + '" src="/image-library-webp/themes/' + path.split('/').map(encodeURIComponent).join('/') + '@2x.webp" alt="" draggable="false" style="width:' + size + 'px;height:' + size + 'px">';
  },
  _paint_: function () {
    var st = this.st, D = this._dims(), v = this._view;
    this._wrap.className = 'ws-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + st.level;
    this._paintBoard(D); this._paintPockets(D); this._paintAnswer(D); this._paintPad(D);
    var note = this._qs('.ws-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'ws-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ws-note is-hint'; }
    else { note.textContent = ''; note.className = 'ws-note'; }
    this._qs('.ws-sr').textContent = this._stored > 0 ? this._t('aStore', { n: this._stored }) : '';
    this._setPrompt();
  },

  /* a drawn acorn counter: a brown nut with a darker cap */
  _acorn: function (cx, cy, r, cls) {
    return '<g class="ws-tok ' + (cls || '') + '"><ellipse class="ws-nut" cx="' + cx + '" cy="' + (cy + r * 0.18) + '" rx="' + (r * 0.78) + '" ry="' + (r * 0.84) + '"/><path class="ws-cap" d="M' + (cx - r * 0.86) + ' ' + (cy - r * 0.08) + ' Q' + cx + ' ' + (cy - r * 1.05) + ' ' + (cx + r * 0.86) + ' ' + (cy - r * 0.08) + ' Z"/><line class="ws-stem" x1="' + cx + '" y1="' + (cy - r * 0.62) + '" x2="' + (cx + r * 0.18) + '" y2="' + (cy - r * 0.98) + '"/></g>';
  },
  _geom: function (D) { return D.wide ? { rp: 50, cp: 46, r: 18, pad: 12 } : (D.cramp ? { rp: 36, cp: 32, r: 11, pad: 6 } : { rp: 44, cp: 34, r: 13, pad: 8 }); },

  /* ---------- the board: tray or heap on the left, the stump on the right ---------- */
  _paintBoard: function (D) {
    var st = this.st, left = this._qs('.ws-left'), right = this._qs('.ws-right');
    left.innerHTML = ''; right.innerHTML = '';
    var picL = D.wide ? 96 : 64;
    if (st.level === '3') {
      left.insertAdjacentHTML('beforeend', this._pic(this.ACORN, picL, 'ws-label'));
      left.appendChild(this._heapEl(D));
    } else {
      left.appendChild(this._trayEl(D));
      right.insertAdjacentHTML('beforeend', this._pic(this.ACORN, picL, 'ws-label'));
    }
    right.appendChild(this._stumpEl(D));
  },
  _trayEl: function (D) {
    var st = this.st, rd = st.rd, G = this._geom(D), self = this, C = SnowStackCore, help = this._help();
    var W = rd.c * G.cp + 2 * G.pad, H = rd.r * G.rp + 2 * G.pad, h = '';
    var ps = C.piles(st), row = 0;
    ps.forEach(function (p, pi) { h += '<rect class="ws-band" x="3" y="' + (G.pad + row * G.rp + 2) + '" width="' + (W - 6) + '" height="' + (p.rows * G.rp - 4) + '" rx="8" style="fill:' + self.BANDS[pi % 6] + '"/>'; row += p.rows; });
    for (var i = 0; i < rd.r; i++) for (var j = 0; j < rd.c; j++) h += this._acorn(G.pad + j * G.cp + G.cp / 2, G.pad + i * G.rp + G.rp / 2, G.r);
    var ghosts = st.help && (help === 'unfair' || help === 'mould' || help === 'wrongCount') ? C.rightCuts(st.level, rd) : [];
    ghosts.forEach(function (g) { if (st.cuts.indexOf(g) < 0) { var y = G.pad + g * G.rp; h += '<line class="ws-ghost" x1="6" y1="' + y + '" x2="' + (W - 6) + '" y2="' + y + '"/>'; } });
    st.cuts.forEach(function (g) { var y = G.pad + g * G.rp; h += '<g class="ws-twig"><rect class="ws-twigline" x="2" y="' + (y - 4.5) + '" width="' + (W - 4) + '" height="9" rx="4.5"/><path class="ws-bark" d="M' + (W * 0.22) + ' ' + y + ' h10 M' + (W * 0.55) + ' ' + y + ' h7 M' + (W * 0.8) + ' ' + y + ' h9"/><path class="ws-leaf" d="M' + (W - 10) + ' ' + y + ' q6 -9 13 -7 q-4 8 -13 7z"/><path class="ws-leaf" d="M10 ' + y + ' q-6 9 -10 9 q1 -9 10 -9z"/></g>'; });
    var box = this.api.el('div', 'ws-tray ws-art' + (help === 'empty' ? ' is-wiggle' : ''));
    box.style.width = W + 'px'; box.style.height = H + 'px';
    box.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>';
    for (var g = 1; g < rd.r; g++) (function (g) {
      var on = st.cuts.indexOf(g) >= 0, b = self._btn('ws-gap' + (on ? ' is-on' : ''), 'gap-' + g, self._t('aGap', { i: g }));
      b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.disabled = st.done;
      b.style.top = (G.pad + g * G.rp - 22) + 'px';
      b.addEventListener('click', function () { self._cut(g); });
      box.appendChild(b);
    })(g);
    return box;
  },
  _heapEl: function (D) {
    var st = this.st, rd = st.rd, W = D.wide ? 250 : D.cramp ? 128 : 150, H = D.wide ? 190 : D.cramp ? 104 : 130, r = D.wide ? 13 : 11, h = '';
    var spots = SnowStackCore.heapSpots(rd, st.k);
    h += '<ellipse class="ws-heapground" cx="' + (W / 2) + '" cy="' + (H - 12) + '" rx="' + (W * 0.46) + '" ry="10"/>';
    for (var i = 0; i < st.heap; i++) h += this._acorn(r + spots[i][0] * (W - 2 * r), r + spots[i][1] * (H - 2 * r - 8), r);
    var el = this.api.el('div', 'ws-heap ws-art' + (this._help() === 'heapLeft' ? ' is-glow' : '') + (this._help() === 'empty' ? ' is-wiggle' : ''));
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>';
    return el;
  },

  /* ---------- the stump and the stack ---------- */
  _layerFoot: function (p) { return { rows: p.rows, cols: p.cols, size: p.size }; },
  _stumpEl: function (D) {
    var st = this.st, rd = st.rd, C = SnowStackCore, self = this, help = this._help(), last = st.last || {};
    var picS = D.wide ? 96 : 64, leftW = st.level === '3' ? (D.wide ? 250 : D.cramp ? 128 : 150) : rd.c * this._geom(D).cp + 2 * this._geom(D).pad;
    var rightW = D.W - (D.wide ? 24 + 16 : 12 + 6) - leftW, sw = Math.max(90, Math.min(D.wide ? 300 : 220, D.wide ? rightW - picS - 8 : rightW));
    var ps = st.stacked || st.done ? C.piles(st).filter(function (x) { return x.size > 0; }) : [];
    var maxCols = st.level === '3' ? 5 : rd.c, p = Math.max(9, Math.min(D.wide ? 26 : D.cramp ? 12 : 14, Math.floor((sw * 0.78 - 10) / maxCols))), dr = p * 0.36;
    var maxRows = 1; ps.forEach(function (x) { maxRows = Math.max(maxRows, x.rows); });
    var mould = st.level === '2' ? { rows: rd.k / rd.c, cols: rd.c } : null;
    if (mould) maxRows = Math.max(maxRows, mould.rows);
    var off = Math.round(p * 0.7), shift = Math.round(p * 0.4);
    var stackH = maxRows * p + 8 + Math.max(0, ps.length - 1) * off + 28;
    var trunkTop = stackH + 14, H = trunkTop + (D.wide ? 70 : 54), W = sw, cx = W / 2, h = '';
    /* the trunk: a hollow with this pass's stored acorns */
    h += '<rect class="ws-trunk" x="' + (cx - W * 0.36) + '" y="' + trunkTop + '" width="' + (W * 0.72) + '" height="' + (H - trunkTop - 4) + '" rx="6"/>';
    h += '<ellipse class="ws-ring" cx="' + cx + '" cy="' + trunkTop + '" rx="' + (W * 0.36) + '" ry="9"/><ellipse class="ws-ring2" cx="' + cx + '" cy="' + trunkTop + '" rx="' + (W * 0.22) + '" ry="5"/>';
    var hw = D.wide ? 46 : 32, hy = trunkTop + 16;
    h += '<path class="ws-hollow" d="M' + (cx - hw / 2) + ' ' + (H - 6) + ' v-' + (H - hy - 22) + ' a' + (hw / 2) + ' ' + (hw / 2) + ' 0 0 1 ' + hw + ' 0 v' + (H - hy - 22) + ' z"/>';
    for (var s = 0; s < Math.min(this._stored, 6); s++) h += this._acorn(cx - hw / 4 + (s % 2) * hw / 2, H - 14 - Math.floor(s / 2) * (D.wide ? 11 : 8), D.wide ? 6 : 4.5);
    /* the mould (Level 2): the size of one hole, as dents on the stump top */
    var foot = function (rows, cols) { return { w: cols * p + 8, h: rows * p + 8 }; };
    var baseY = trunkTop - 4;
    if (mould && !ps.length) {
      var m = foot(mould.rows, mould.cols), mx = cx - m.w / 2, my = baseY - m.h;
      h += '<rect class="ws-mould" x="' + mx + '" y="' + my + '" width="' + m.w + '" height="' + m.h + '" rx="6"/>';
      for (var mr = 0; mr < mould.rows; mr++) for (var mc = 0; mc < mould.cols; mc++) h += '<circle class="ws-dent" cx="' + (mx + 4 + mc * p + p / 2) + '" cy="' + (my + 4 + mr * p + p / 2) + '" r="' + dr + '"/>';
    }
    /* the stack: each pile a slab, one on top of another; extras beyond the reference stick out coral */
    if (ps.length) {
      var ref = mould || ps.reduce(function (a, b) { return b.size < a.size ? b : a; });
      var fair = C.isFair(C.sizes(st)) && (!mould || ps.every(function (x) { return x.size === rd.k; }));
      var w0 = foot(ref.rows, ref.cols).w, x0 = cx - w0 / 2 - (ps.length - 1) * shift / 2;
      var showSizes = last.result === 'unfair' && !st.done, lit = last.result === 'read' && !st.done, numbers = lit && st.help;
      var topIdx = ps.length - 1, topRect = null, late = '', labelX = 0;
      ps.forEach(function (lp, li) { labelX = Math.max(labelX, x0 + li * shift + foot(lp.rows, lp.cols).w + 6); });
      ps.forEach(function (lp, li) {
        var f = foot(lp.rows, lp.cols), x = x0 + li * shift, yb = baseY - li * off, y = yb - f.h;
        h += '<rect class="ws-side" x="' + x + '" y="' + (y + 4) + '" width="' + f.w + '" height="' + f.h + '" rx="5" style="fill:' + self.LAYERS[li % 6] + '"/>';
        h += '<rect class="ws-slab" x="' + x + '" y="' + y + '" width="' + f.w + '" height="' + f.h + '" rx="5" style="fill:' + self.BANDS[li % 6] + '"/>';
        var nDot = 0;
        for (var r = 0; r < lp.rows; r++) for (var c = 0; c < lp.cols; c++) {
          if (st.level === '3' && r * 5 + c >= lp.size) continue;
          var out = r >= ref.rows || c >= ref.cols, dx = x + 4 + c * p + p / 2, dy = y + 4 + r * p + p / 2;
          nDot++;
          h += '<circle class="ws-dot' + (out && !fair ? ' is-out' : '') + (lit && li === topIdx && st.level !== '2' ? ' is-lit' : '') + '" cx="' + dx + '" cy="' + dy + '" r="' + dr + '"/>';
          if (numbers && li === topIdx && st.level !== '2') h += '<text class="ws-dotnum" x="' + dx + '" y="' + (dy + p * 0.26) + '" text-anchor="middle" style="font-size:' + Math.round(p * 0.7) + 'px">' + nDot + '</text>';
        }
        /* a slab smaller than the mould (Level 2): its empty dents dashed */
        if (mould && !fair) for (var mr2 = 0; mr2 < mould.rows; mr2++) for (var mc2 = 0; mc2 < mould.cols; mc2++) if (mr2 >= lp.rows || mc2 >= lp.cols) h += '<circle class="ws-dent is-missing" cx="' + (x + 4 + mc2 * p + p / 2) + '" cy="' + (y + 4 + mr2 * p + p / 2) + '" r="' + dr + '"/>';
        if (showSizes) late += '<text class="ws-size" x="' + labelX + '" y="' + (y + f.h / 2 + 5) + '">' + lp.size + '</text>';
        if (lit && st.level === '2') late += '<text class="ws-size is-tick" x="' + (x - 6) + '" y="' + (y + f.h / 2 + 5) + '" text-anchor="end">' + (numbers ? (li + 1) : '•') + '</text>';
        if (li === topIdx) topRect = { x: x, y: y, w: f.w, h: f.h };
      });
      h += late;
      /* the snow lid: flat on a fair stack, sliding off an unfair one */
      if (fair) h += '<g class="ws-lid is-flat' + (st.done ? ' is-done' : '') + '"><rect class="ws-snow" x="' + (topRect.x - 3) + '" y="' + (topRect.y - 7) + '" width="' + (topRect.w + 6) + '" height="9" rx="4.5"/></g>';
      else h += '<g class="ws-lid is-slid" style="transform-origin:' + (topRect.x + topRect.w) + 'px ' + topRect.y + 'px"><rect class="ws-snow" x="' + (topRect.x + topRect.w * 0.3) + '" y="' + (topRect.y - 14) + '" width="' + (topRect.w + 6) + '" height="9" rx="4.5" transform="rotate(18 ' + (topRect.x + topRect.w) + ' ' + topRect.y + ')"/></g><ellipse class="ws-snowheap" cx="' + (W - 12) + '" cy="' + (H - 6) + '" rx="12" ry="5"/>';
      for (var fl = 0; fl < 6; fl++) h += '<circle class="ws-flake" cx="' + (cx - w0 / 2 + (fl * 37) % (w0 + 16)) + '" cy="' + (8 + (fl * 13) % 20) + '" r="2"/>';
    }
    var wrapEl = this.api.el('div', 'ws-stumpbox');
    var b = this._btn('ws-stump ws-art' + (st.done ? ' is-done' : ''), 'stack', this._t('aStack'), '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" aria-hidden="true">' + h + '</svg>');
    b.disabled = st.done;
    b.addEventListener('click', function () { self._stack(); });
    wrapEl.appendChild(b);
    wrapEl.insertAdjacentHTML('beforeend', this._pic(this.SQUIRREL, picS, 'ws-squirrel' + (st.done ? ' is-hop' : '')));
    return wrapEl;
  },

  /* ---------- the holes (Level 3) ---------- */
  _paintPockets: function (D) {
    var st = this.st, box = this._qs('.ws-pockets'), self = this; box.innerHTML = '';
    if (st.level !== '3') { box.style.display = 'none'; return; }
    box.style.display = '';
    var n = st.pockets.length, gap = D.wide ? 10 : 6, w = Math.max(52, Math.min(D.wide ? 120 : 96, Math.floor((D.W - gap * (n - 1)) / n))), cols = 4, pp = Math.min(D.wide ? 28 : 21, Math.floor((w - 8) / cols)), r = pp * 0.5;
    var most = Math.max.apply(null, st.pockets.concat([0])), ph = Math.max(D.wide ? 70 : 52, 10 + Math.max(3, Math.ceil(most / cols)) * pp);
    st.pockets.forEach(function (cnt, i) {
      var h = '<rect class="ws-pocketbg" x="2" y="2" width="' + (w - 4) + '" height="' + (ph - 4) + '" rx="14"/>', x0 = (w - cols * pp) / 2 + pp / 2;
      for (var q = 0; q < cnt; q++) h += self._acorn(x0 + (q % cols) * pp, ph - 4 - pp / 2 - Math.floor(q / cols) * pp, r);
      var b = self._btn('ws-pocket ws-art', 'pocket-' + i, cnt ? self._t('aPocket', { i: i + 1, n: cnt }) : self._t('aPocketEmpty', { i: i + 1 }), '<svg viewBox="0 0 ' + w + ' ' + ph + '" width="' + w + '" height="' + ph + '" aria-hidden="true">' + h + '</svg>');
      b.style.width = w + 'px'; b.disabled = st.done;
      self._wireHold(b, function () { self._deal(i); }, function () { self._undeal(i); });
      box.appendChild(b);
    });
  },
  /* a tap deals one acorn in; a press held for HOLD_MS takes one back out */
  _wireHold: function (b, tap, holdFn) {
    var self = this, timer = null, held = false;
    b.addEventListener('pointerdown', function () { held = false; timer = setTimeout(function () { held = true; holdFn(); }, self.HOLD_MS); });
    var stop = function () { if (timer) { clearTimeout(timer); timer = null; } };
    b.addEventListener('pointerup', stop); b.addEventListener('pointerleave', stop); b.addEventListener('pointercancel', stop);
    b.addEventListener('click', function () { if (held) { held = false; return; } tap(); });
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  },

  /* ---------- the equation strip and the keys ---------- */
  _paintAnswer: function (D) {
    var st = this.st, rd = st.rd, self = this, ans = this._qs('.ws-answer'), C = SnowStackCore; ans.innerHTML = ''; ans.className = 'ws-answer';
    var box = function () { var b = self._btn('ws-box' + (st.done ? ' is-ok' : ' is-focus'), 'box', self._t(st.level === '1' ? 'boxPile' : st.level === '2' ? 'boxHoles' : 'boxEach'), esc(st.typed)); b.disabled = st.done; return b; };
    var txt = function (s) { if (s) ans.insertAdjacentHTML('beforeend', '<span class="ws-eqtxt">' + esc(s) + '</span>'); };
    if (this._eq() === 'shown' && st.level !== '1') {
      var parts = this._t(st.level === '2' ? 'eqHoles' : 'eqShare', { total: C.totalOf(st.level, rd), k: rd.k, n: rd.n, box: '\u0001' }).split('\u0001');
      ans.classList.add('is-eq'); txt(parts[0]); ans.appendChild(box()); txt(parts[1]);
      return;
    }
    var n = C.piles(st).length;
    if (this._eq() === 'shown' && st.level === '1') {
      /* one addend per pile; before any twig, "▢ + … = 12" (some equal piles make the total) */
      if (!st.cuts.length) { ans.appendChild(box()); ans.insertAdjacentHTML('beforeend', '<span class="ws-op">+</span><span class="ws-op ws-more">…</span>'); }
      else for (var i = 0; i < n; i++) {
        if (i) ans.insertAdjacentHTML('beforeend', '<span class="ws-op">+</span>');
        if (i === 0) ans.appendChild(box()); else ans.insertAdjacentHTML('beforeend', '<span class="ws-mirror">' + esc(st.typed) + '</span>');
      }
      ans.insertAdjacentHTML('beforeend', '<span class="ws-op">=</span><span class="ws-total">' + C.totalOf('1', rd) + '</span>');
      return;
    }
    ans.insertAdjacentHTML('beforeend', '<span class="ws-lbl">' + esc(this._t(st.level === '1' ? 'boxPile' : st.level === '2' ? 'boxHoles' : 'boxEach')) + '</span>');
    ans.appendChild(box());
  },
  _paintPad: function (D) {
    var st = this.st, self = this, pad = this._qs('.ws-pad'); pad.innerHTML = '';
    if (st.done) return;
    var keys = this.api.el('div', 'ws-keys');
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del'].forEach(function (k) {
      var b = self._btn('ws-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.addEventListener('click', function () { if (k === 'del') self._del(); else self._type(k); });
      keys.appendChild(b);
    });
    var chk = this._btn(D.wide ? 'ws-check' : 'ws-key ws-checkkey', 'check', D.wide ? null : this._t('checkBtn'), D.wide ? esc(this._t('checkBtn')) : '✓');
    chk.addEventListener('click', function () { self._check(); });
    if (D.wide) { pad.appendChild(keys); pad.appendChild(chk); } else { keys.appendChild(chk); pad.appendChild(keys); }
  },

  /* ---------------- the hand ---------------- */
  _clear: function () { this._view.note = ''; },
  _cut: function (g) { var r = SnowStackCore.toggleCut(this.st, g); if (r === 'no') return; this._clear(); this.api.sound(r === 'in' ? 300 : 240); this._paint(); },
  _deal: function (i) { if (SnowStackCore.deal(this.st, i) === 'no') return; this._clear(); this.api.sound(560); this._paint(); },
  _undeal: function (i) { if (SnowStackCore.undeal(this.st, i) === 'no') return; this._clear(); this.api.sound(380); this._paint(); },
  _stack: function () { var r = SnowStackCore.stack(this.st); if (r === 'no') return; this._clear(); this.api.sound(r === 'flat' ? 660 : 200); this._paint(); },
  _type: function (d) { if (SnowStackCore.type(this.st, d) === 'no') return; this._clear(); this.api.sound(520); this._paint(); },
  _del: function () { if (SnowStackCore.del(this.st) === 'no') return; this._clear(); this.api.sound(380); this._paint(); },
  _check: function () {
    var C = SnowStackCore, st = this.st, v = this._view;
    var res = C.check(st); if (res.result === 'done') return;
    if (res.result === 'ok') { this._success(); return; }
    v.note = this._t(C.hint(st), { n: st.rd.n, k: st.rd.k });
    if (st.misses) this.api.sound(220);
    this._paint(); this.api.announce(v.note);
  },
  _key_: function (e) {
    if (/^[1-9]$/.test(e.key)) { e.preventDefault(); this._type(e.key); return; }
    if (e.key === 'Backspace') { e.preventDefault(); this._del(); return; }
    if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _success: function () {
    var st = this.st, rd = st.rd, v = this._view, C = SnowStackCore, sz = C.sizes(st), eq = sz.join(' + '), total = C.totalOf(st.level, rd), msg;
    if (st.level === '1') msg = this._t('okPiles', { eq: eq, total: total });
    else if (st.level === '2') msg = this._t('okHoles', { total: total, piles: sz.length, k: rd.k, eq: eq });
    else msg = this._t('okShare', { each: sz[0], eq: eq, total: total });
    this._stored++;
    v.note = ''; v.ok = msg;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectSnowStackCSS() {
  if (typeof document === 'undefined' || document.getElementById('ws-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ws-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .ws-wrap:focus{outline:none;}'
  + '.ws-board{display:flex;align-items:flex-start;justify-content:center;gap:16px;padding:12px;border-radius:18px;background:linear-gradient(#E3EEF5,#F4F8FB 70%,#FFFFFF);box-shadow:inset 0 0 0 3px #BFD3E0;}'
  + '.ws-left,.ws-right{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0;} .ws-right{flex:1 1 auto;}'
  + '.ws-pic{display:block;object-fit:contain;pointer-events:none;} .ws-label{filter:drop-shadow(0 2px 2px rgba(0,0,0,.15));}'
  + '.ws-tray{position:relative;border-radius:14px;background:#C9A06A;box-shadow:inset 0 0 0 3px #8E6A3C,0 4px 0 #8E6A3C;} .ws-tray svg{display:block;} .ws-tray.is-wiggle{animation:wsWig .45s 2;}'
  + '@keyframes wsWig{25%{transform:rotate(-2deg);}75%{transform:rotate(2deg);}}'
  + '.ws-band{opacity:.9;} .ws-nut{fill:#B5733A;stroke:' + INK + ';stroke-width:1.4;} .ws-cap{fill:#6E4A2A;stroke:' + INK + ';stroke-width:1.2;} .ws-stem{stroke:' + INK + ';stroke-width:1.6;stroke-linecap:round;}'
  + '.ws-twigline{fill:#F1E8D4;stroke:#5C3A1E;stroke-width:2;} .ws-bark{stroke:#3E2A1A;stroke-width:2;stroke-linecap:round;} .ws-leaf{fill:#6FAF5B;stroke:#3F7A34;stroke-width:1;} .ws-twig{animation:wsSnap .18s ease-out;} @keyframes wsSnap{from{transform:translateY(-8px);opacity:.3;}}'
  + '.ws-ghost{stroke:#146B5E;stroke-width:5;stroke-dasharray:6 6;stroke-linecap:round;}'
  + '.ws-gap{position:absolute;left:0;right:0;height:44px;border:0;background:transparent;cursor:pointer;padding:0;border-radius:10px;} .ws-gap:hover{background:rgba(255,255,255,.18);} .ws-gap:disabled{cursor:default;background:transparent;}'
  + '.ws-heap svg{display:block;} .ws-heapground{fill:#D7C4A6;opacity:.6;} .ws-heap.is-glow .ws-nut{fill:#E0663A;} .ws-heap.is-wiggle{animation:wsWig .45s 2;}'
  + '.ws-stumpbox{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:4px;} .ws-wrap.is-narrow .ws-stumpbox{padding-right:26px;} .ws-wrap.is-narrow .ws-squirrel{position:absolute;right:-2px;bottom:0;}'
  + '.ws-stump{border:0;background:transparent;padding:0;cursor:pointer;border-radius:12px;} .ws-stump svg{display:block;} .ws-stump:disabled{cursor:default;} .ws-stump:hover:not(:disabled){background:rgba(255,255,255,.35);}'
  + '.ws-trunk{fill:#8E6239;stroke:' + INK + ';stroke-width:2;} .ws-ring{fill:#E8C894;stroke:' + INK + ';stroke-width:2;} .ws-ring2{fill:none;stroke:#B98E58;stroke-width:1.5;} .ws-hollow{fill:#4A3020;}'
  + '.ws-mould{fill:#D9B98A;stroke:#7A5230;stroke-width:2;stroke-dasharray:5 3;} .ws-dent{fill:#B8945F;} .ws-dent.is-missing{fill:none;stroke:#E0663A;stroke-width:1.6;stroke-dasharray:2 2;}'
  + '.ws-side{stroke:' + INK + ';stroke-width:1.2;} .ws-slab{stroke:' + INK + ';stroke-width:1.6;} .ws-dot{fill:#8A5A2B;} .ws-dot.is-out{fill:#F2784B;stroke:#B9471E;stroke-width:1;} .ws-dot.is-lit{fill:#F4CF62;stroke:' + INK + ';stroke-width:1;}'
  + '.ws-dotnum{font-family:' + H + ';font-weight:800;fill:' + INK + ';}'
  + '.ws-size{font-family:' + H + ';font-weight:800;font-size:20px;fill:#B9471E;} .ws-wrap.is-narrow .ws-size{font-size:15px;} .ws-size.is-tick{fill:#146B5E;}'
  + '.ws-snow{fill:#fff;stroke:#9FB8C8;stroke-width:1.5;} .ws-lid.is-flat{animation:wsFall .5s ease-out;} @keyframes wsFall{from{transform:translateY(-14px);opacity:.2;}}'
  + '.ws-lid.is-slid{animation:wsSlide .7s ease-in;} @keyframes wsSlide{from{transform:translate(-10px,-10px) rotate(-18deg);}} .ws-snowheap{fill:#fff;stroke:#9FB8C8;stroke-width:1.2;}'
  + '.ws-lid.is-done .ws-snow{filter:drop-shadow(0 0 5px #9FD8F5);} .ws-flake{fill:#fff;stroke:#B6CCDA;stroke-width:.8;animation:wsFlake 1.4s ease-in;} @keyframes wsFlake{from{transform:translateY(-12px);opacity:0;}}'
  + '.ws-squirrel{margin-bottom:2px;} .ws-squirrel.is-hop{animation:wsHop .6s ease-out 2;} @keyframes wsHop{40%{transform:translateY(-16px);}}'
  + '.ws-pockets{display:flex;justify-content:center;gap:10px;flex-wrap:nowrap;} .ws-pocket{border:0;padding:0;background:transparent;cursor:pointer;} .ws-pocket svg{display:block;} .ws-pocketbg{fill:#5A3B24;stroke:' + INK + ';stroke-width:2.5;} .ws-pocket:disabled{cursor:default;}'
  /* answer + pad */
  + '.ws-answer{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;} .ws-lbl,.ws-eqtxt{font-family:' + B + ';font-weight:800;font-size:18px;color:' + INK + ';} .ws-op{font-family:' + H + ';font-weight:800;font-size:26px;color:' + INK + ';} .ws-total{font-family:' + H + ';font-weight:800;font-size:28px;color:' + INK + ';}'
  + '.ws-box{flex:0 0 auto;width:60px;height:52px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:28px;color:' + INK + ';cursor:pointer;padding:0;} .ws-box.is-focus{box-shadow:inset 0 0 0 3px #F2784B;} .ws-box.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#EAF6F2;}'
  + '.ws-mirror{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:8px;background:rgba(255,255,255,.7);box-shadow:inset 0 0 0 2px #E2D5BC;font-family:' + H + ';font-weight:800;font-size:22px;color:#6B6478;}'
  + '.ws-pad{display:flex;flex-direction:column;gap:8px;} .ws-pad:empty{display:none;} .ws-keys{display:flex;justify-content:center;gap:6px;} .ws-key{flex:0 0 52px;height:50px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .ws-key.is-del{background:#FFF1EA;}'
  + '.ws-check{min-height:50px;border:0;border-radius:12px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:21px;cursor:pointer;box-shadow:0 4px 0 #0E4E44;} .ws-checkkey{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4E44;font-size:26px;}'
  + '.ws-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ws-note:empty{display:none;} .ws-note.is-hint{color:#9A3D1C;} .ws-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.ws-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.ws-wrap.is-narrow{gap:6px;} .ws-wrap.is-narrow .ws-board{gap:6px;padding:5px;} .ws-wrap.is-narrow .ws-pockets{gap:6px;}'
  + '.ws-wrap.is-narrow .ws-keys{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;} .ws-wrap.is-narrow .ws-key{height:44px;font-size:20px;} .ws-wrap.is-narrow .ws-note{font-size:16px;} .ws-wrap.is-narrow .ws-box{width:54px;height:46px;font-size:24px;} .ws-wrap.is-narrow .ws-lbl,.ws-wrap.is-narrow .ws-eqtxt{font-size:15px;} .ws-answer.is-eq{flex-wrap:nowrap;} .ws-answer.is-eq .ws-eqtxt{min-width:0;line-height:1.15;} .ws-answer.is-eq .ws-eqtxt:first-child{text-align:right;} .ws-wrap.is-narrow .ws-answer.is-eq{gap:5px;} .ws-wrap.is-narrow .ws-op{font-size:22px;} .ws-wrap.is-narrow .ws-total{font-size:24px;}'
  + '.ws-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.ws-wrap *{animation:none !important;transition:none !important;}}'
  + '.ws-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'ws-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.SnowStackActivity = SnowStackActivity;
