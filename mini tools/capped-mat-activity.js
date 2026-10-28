/* =====================================================================
   capped-mat-activity.js — ACTIVITY #149 of the one-by-one rebuild:
   "Hundreds, Tens, and Ones" → THE CAPPED MAT (2.NBT.A.1 a/b; G2-222,
   G2-224, G2-227; all 11 locales). Model: capped-mat-core.js
   (CappedMatCore). Design: docs/activities-rebuild/designs/149-place-value.md
   ---------------------------------------------------------------------
   The invention: the place-value mat only closes when every column wears
   a numeral cap. A cap holds one digit, so a column takes at most nine
   blocks (the tenth is refused). An EMPTY column still needs its 0 cap —
   leave it bare and it folds shut, the neighbours' caps slide together
   and 307 reads 37. Jobs: build (+ / −; the caps read the build at
   Check) · read (cap each column; blocks tidy in their columns or jumbled
   in a delivery) · match (drag the ticket onto the tray that shows it).
   No timer, no score, no words on the apparatus: numerals and blocks.
   Test seams: window.CappedMatActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._geo / ._render2 / ._add / ._remove /
   ._send / ._back / ._capTo / ._uncap / ._pick / ._seat / ._check /
   .FAST / .OK_MS.
   ===================================================================== */
var CappedMatActivity = {
  id: 'capped-mat',
  /* the drawn apparatus (the hierarchy gate): the mat, its blocks, the caps, the trays, the delivery */
  apparatusClasses: ['cm-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Hundreds, Tens, and Ones","de":"Hunderter, Zehner und Einer","fr":"Centaines, dizaines et unités","es":"Centenas, decenas y unidades","pt":"Centenas, dezenas e unidades","it":"Centinaia, decine e unità","nl":"Honderdtallen, tientallen en eenheden","sv":"Hundratal, tiotal och ental","da":"Hundreder, tiere og enere","no":"Hundrere, tiere og enere","fi":"Sadat, kymmenet ja ykköset"},
    instruction: {"en":"Every column needs a cap — even an empty one.","de":"Jede Spalte braucht einen Deckel – auch eine leere.","fr":"Chaque colonne a besoin d’un bouchon, même une colonne vide.","es":"Cada columna necesita una tapa, incluso una vacía.","pt":"Cada coluna precisa de uma tampa — até uma vazia.","it":"Ogni colonna ha bisogno di un tappo, anche una vuota.","nl":"Elke kolom heeft een dop nodig – ook een lege.","sv":"Varje kolumn behöver ett lock – även en tom.","da":"Hver kolonne skal have et låg – også en tom.","no":"Hver kolonne trenger en kork – også en tom.","fi":"Jokainen sarake tarvitsee korkin – myös tyhjä."},
    taskBuild: {"en":"Build {n}","de":"Baue {n}","fr":"Construis {n}","es":"Construye {n}","pt":"Construa {n}","it":"Costruisci {n}","nl":"Bouw {n}","sv":"Bygg {n}","da":"Byg {n}","no":"Bygg {n}","fi":"Rakenna {n}"},
    qRead: {"en":"Cap each column with how many it holds.","de":"Gib jeder Spalte den Deckel mit ihrer Anzahl.","fr":"Mets sur chaque colonne le bouchon qui dit combien elle contient.","es":"Pon en cada columna la tapa que dice cuántos hay.","pt":"Coloque em cada coluna a tampa que diz quantos há nela.","it":"Metti su ogni colonna il tappo che dice quanti ce ne sono.","nl":"Zet op elke kolom de dop die zegt hoeveel erin ligt.","sv":"Sätt på varje kolumn locket som visar hur många som ligger där.","da":"Sæt på hver kolonne det låg, der viser, hvor mange der ligger i den.","no":"Sett på hver kolonne korken som viser hvor mange som ligger i den.","fi":"Laita jokaiseen sarakkeeseen korkki, joka kertoo, montako siinä on."},
    qMatch: {"en":"Which tray shows {n}? Drag the ticket onto it.","de":"Welches Tablett zeigt {n}? Zieh das Kärtchen darauf.","fr":"Quel plateau montre {n} ? Fais glisser l’étiquette dessus.","es":"¿Qué bandeja muestra {n}? Arrastra la etiqueta hasta ella.","pt":"Qual bandeja mostra {n}? Arraste a etiqueta até ela.","it":"Quale vassoio mostra {n}? Trascina il cartellino sopra.","nl":"Welk dienblad laat {n} zien? Sleep het kaartje erop.","sv":"Vilken bricka visar {n}? Dra lappen dit.","da":"Hvilken bakke viser {n}? Træk sedlen derhen.","no":"Hvilket brett viser {n}? Dra lappen dit.","fi":"Mikä tarjotin näyttää luvun {n}? Vedä lappu sen päälle."},
    hintBuildEmpty: {"en":"Tap + to add blocks.","de":"Tipp auf +, um Blöcke dazuzulegen.","fr":"Touche + pour ajouter des blocs.","es":"Toca + para agregar bloques.","pt":"Toque em + para colocar blocos.","it":"Tocca + per aggiungere blocchi.","nl":"Tik op + om blokken toe te voegen.","sv":"Tryck på + för att lägga till block.","da":"Tryk på + for at lægge klodser til.","no":"Trykk på + for å legge til klosser.","fi":"Lisää palikoita napauttamalla +."},
    hintCapAll: {"en":"Put a cap on every column.","de":"Setz auf jede Spalte einen Deckel.","fr":"Mets un bouchon sur chaque colonne.","es":"Pon una tapa en cada columna.","pt":"Coloque uma tampa em cada coluna.","it":"Metti un tappo su ogni colonna.","nl":"Zet een dop op elke kolom.","sv":"Sätt ett lock på varje kolumn.","da":"Sæt et låg på hver kolonne.","no":"Sett en kork på hver kolonne.","fi":"Laita korkki jokaiseen sarakkeeseen."},
    hintPickTray: {"en":"Drag the ticket onto a tray.","de":"Zieh das Kärtchen auf ein Tablett.","fr":"Fais glisser l’étiquette sur un plateau.","es":"Arrastra la etiqueta hasta una bandeja.","pt":"Arraste a etiqueta até uma bandeja.","it":"Trascina il cartellino su un vassoio.","nl":"Sleep het kaartje op een dienblad.","sv":"Dra lappen till en bricka.","da":"Træk sedlen hen på en bakke.","no":"Dra lappen til et brett.","fi":"Vedä lappu jonkin tarjottimen päälle."},
    hintDelivery: {"en":"Put every block on the mat first.","de":"Leg zuerst alle Blöcke auf die Tafel.","fr":"Pose d’abord tous les blocs sur le tableau.","es":"Primero pon todos los bloques en el tablero.","pt":"Primeiro coloque todos os blocos no tabuleiro.","it":"Prima metti tutti i blocchi sulla tabella.","nl":"Leg eerst alle blokken op de mat.","sv":"Lägg först alla block på brädan.","da":"Læg først alle klodserne på brættet.","no":"Legg først alle klossene på matta.","fi":"Laita ensin kaikki palikat taululle."},
    hintCapMissing: {"en":"This column needs its cap.","de":"Diese Spalte braucht ihren Deckel.","fr":"Cette colonne a besoin de son bouchon.","es":"Esta columna necesita su tapa.","pt":"Esta coluna precisa da sua tampa.","it":"Questa colonna ha bisogno del suo tappo.","nl":"Deze kolom heeft zijn dop nodig.","sv":"Den här kolumnen behöver sitt lock.","da":"Den her kolonne skal have sit låg.","no":"Denne kolonnen trenger korken sin.","fi":"Tämä sarake tarvitsee korkkinsa."},
    hintZeroFold: {"en":"Without a cap the empty column folds away and the caps read {fold}. Which cap says “none here”?","de":"Ohne Deckel klappt die leere Spalte zu, und die Deckel zeigen {fold}. Welcher Deckel sagt „hier ist nichts“?","fr":"Sans bouchon, la colonne vide se replie et les bouchons affichent {fold}. Quel bouchon veut dire « rien ici » ?","es":"Sin tapa, la columna vacía se cierra y las tapas dicen {fold}. ¿Qué tapa dice «aquí no hay nada»?","pt":"Sem tampa, a coluna vazia se fecha e as tampas mostram {fold}. Que tampa diz “aqui não tem nada”?","it":"Senza tappo la colonna vuota si chiude e i tappi mostrano {fold}. Quale tappo dice «qui non c’è niente»?","nl":"Zonder dop klapt de lege kolom dicht en laten de doppen {fold} zien. Welke dop zegt ‘hier zit niets’?","sv":"Utan lock viks den tomma kolumnen ihop och locken visar {fold}. Vilket lock säger ”här finns inget”?","da":"Uden låg klapper den tomme kolonne sammen, og lågene viser {fold}. Hvilket låg siger ”her er ingenting”?","no":"Uten kork klapper den tomme kolonnen sammen, og korkene viser {fold}. Hvilken kork sier «her er ingenting»?","fi":"Ilman korkkia tyhjä sarake taittuu kiinni, ja korkit näyttävät luvun {fold}. Mikä korkki kertoo, että täällä ei ole mitään?"},
    hintZeroCap: {"en":"The empty column needs the 0 cap.","de":"Die leere Spalte braucht den Deckel mit der 0.","fr":"La colonne vide a besoin du bouchon 0.","es":"La columna vacía necesita la tapa del 0.","pt":"A coluna vazia precisa da tampa do 0.","it":"La colonna vuota ha bisogno del tappo dello 0.","nl":"De lege kolom heeft de dop met de 0 nodig.","sv":"Den tomma kolumnen behöver locket med 0.","da":"Den tomme kolonne skal have låget med 0.","no":"Den tomme kolonnen trenger korken med 0.","fi":"Tyhjä sarake tarvitsee 0-korkin."},
    hintCount: {"en":"Count the blocks under this cap again.","de":"Zähl die Blöcke unter diesem Deckel noch einmal.","fr":"Recompte les blocs sous ce bouchon.","es":"Vuelve a contar los bloques debajo de esta tapa.","pt":"Conte de novo os blocos debaixo desta tampa.","it":"Riconta i blocchi sotto questo tappo.","nl":"Tel de blokken onder deze dop nog eens.","sv":"Räkna blocken under det här locket en gång till.","da":"Tæl klodserne under det her låg en gang til.","no":"Tell klossene under denne korken en gang til.","fi":"Laske tämän korkin alla olevat palikat uudelleen."},
    hintCountNum: {"en":"Count with the numbers.","de":"Zähl mit den Zahlen.","fr":"Compte avec les nombres.","es":"Cuenta con los números.","pt":"Conte com os números.","it":"Conta con i numeri.","nl":"Tel met de getallen.","sv":"Räkna med siffrorna.","da":"Tæl med tallene.","no":"Tell med tallene.","fi":"Laske numeroiden avulla."},
    hintBuildLook: {"en":"The caps say {built}. Look at the column that glows.","de":"Die Deckel zeigen {built}. Schau dir die leuchtende Spalte an.","fr":"Les bouchons disent {built}. Regarde la colonne qui brille.","es":"Las tapas dicen {built}. Mira la columna que brilla.","pt":"As tampas dizem {built}. Olhe a coluna que brilha.","it":"I tappi dicono {built}. Guarda la colonna che si illumina.","nl":"De doppen zeggen {built}. Kijk naar de kolom die oplicht.","sv":"Locken visar {built}. Titta på kolumnen som lyser.","da":"Lågene viser {built}. Se på kolonnen, der lyser.","no":"Korkene viser {built}. Se på kolonnen som lyser.","fi":"Korkit näyttävät {built}. Katso saraketta, joka hehkuu."},
    hintBuildFill: {"en":"Fill the outlines with blocks.","de":"Füll die Umrisse mit Blöcken.","fr":"Remplis les contours avec des blocs.","es":"Llena los contornos con bloques.","pt":"Preencha os contornos com blocos.","it":"Riempi le sagome con i blocchi.","nl":"Vul de omtrekken met blokken.","sv":"Fyll konturerna med block.","da":"Fyld omridsene med klodser.","no":"Fyll omrisset med klosser.","fi":"Täytä ääriviivat palikoilla."},
    hintBuildTake: {"en":"Take away the crossed-out blocks.","de":"Nimm die durchgestrichenen Blöcke weg.","fr":"Enlève les blocs barrés.","es":"Quita los bloques tachados.","pt":"Tire os blocos riscados.","it":"Togli i blocchi barrati.","nl":"Haal de doorgestreepte blokken weg.","sv":"Ta bort de överkryssade blocken.","da":"Tag de overstregede klodser væk.","no":"Ta bort klossene som er krysset over.","fi":"Poista yliviivatut palikat."},
    hintBuildBoth: {"en":"Fill the outlines and take away the crossed-out blocks.","de":"Füll die Umrisse und nimm die durchgestrichenen Blöcke weg.","fr":"Remplis les contours et enlève les blocs barrés.","es":"Llena los contornos y quita los bloques tachados.","pt":"Preencha os contornos e tire os blocos riscados.","it":"Riempi le sagome e togli i blocchi barrati.","nl":"Vul de omtrekken en haal de doorgestreepte blokken weg.","sv":"Fyll konturerna och ta bort de överkryssade blocken.","da":"Fyld omridsene, og tag de overstregede klodser væk.","no":"Fyll omrisset og ta bort klossene som er krysset over.","fi":"Täytä ääriviivat ja poista yliviivatut palikat."},
    hintTray: {"en":"This tray shows {shown}. Look at the blocks that glow.","de":"Dieses Tablett zeigt {shown}. Schau dir die leuchtenden Blöcke an.","fr":"Ce plateau montre {shown}. Regarde les blocs qui brillent.","es":"Esta bandeja muestra {shown}. Mira los bloques que brillan.","pt":"Esta bandeja mostra {shown}. Olhe os blocos que brilham.","it":"Questo vassoio mostra {shown}. Guarda i blocchi che si illuminano.","nl":"Dit dienblad laat {shown} zien. Kijk naar de blokken die oplichten.","sv":"Den här brickan visar {shown}. Titta på blocken som lyser.","da":"Den her bakke viser {shown}. Se på klodserne, der lyser.","no":"Dette brettet viser {shown}. Se på klossene som lyser.","fi":"Tämä tarjotin näyttää luvun {shown}. Katso palikoita, jotka hehkuvat."},
    hintTrayAll: {"en":"Find the tray whose caps match the ticket.","de":"Such das Tablett, dessen Deckel zum Kärtchen passen.","fr":"Trouve le plateau dont les bouchons correspondent à l’étiquette.","es":"Busca la bandeja cuyas tapas coinciden con la etiqueta.","pt":"Encontre a bandeja cujas tampas combinam com a etiqueta.","it":"Trova il vassoio i cui tappi corrispondono al cartellino.","nl":"Zoek het dienblad waarvan de doppen bij het kaartje passen.","sv":"Hitta brickan vars lock stämmer med lappen.","da":"Find den bakke, hvis låg passer til sedlen.","no":"Finn brettet der korkene passer med lappen.","fi":"Etsi tarjotin, jonka korkit vastaavat lappua."},
    hintTenthO: {"en":"A cap holds only one digit — ten ones make one ten.","de":"Auf einen Deckel passt nur eine Ziffer – zehn Einer sind ein Zehner.","fr":"Un bouchon ne porte qu’un seul chiffre : dix unités font une dizaine.","es":"Una tapa solo lleva una cifra: diez unidades forman una decena.","pt":"Uma tampa só tem um algarismo — dez unidades formam uma dezena.","it":"Un tappo porta una sola cifra: dieci unità fanno una decina.","nl":"Op een dop past maar één cijfer – tien eenheden zijn één tiental.","sv":"Ett lock rymmer bara en siffra – tio ental är ett tiotal.","da":"Der er kun plads til ét ciffer på et låg – ti enere er én tier.","no":"En kork har plass til bare ett siffer – ti enere er én tier.","fi":"Korkkiin mahtuu vain yksi numero – kymmenen ykköstä on yksi kymmen."},
    hintTenthT: {"en":"A cap holds only one digit — ten tens make one hundred.","de":"Auf einen Deckel passt nur eine Ziffer – zehn Zehner sind ein Hunderter.","fr":"Un bouchon ne porte qu’un seul chiffre : dix dizaines font une centaine.","es":"Una tapa solo lleva una cifra: diez decenas forman una centena.","pt":"Uma tampa só tem um algarismo — dez dezenas formam uma centena.","it":"Un tappo porta una sola cifra: dieci decine fanno un centinaio.","nl":"Op een dop past maar één cijfer – tien tientallen zijn één honderdtal.","sv":"Ett lock rymmer bara en siffra – tio tiotal är ett hundratal.","da":"Der er kun plads til ét ciffer på et låg – ti tiere er ét hundrede.","no":"En kork har plass til bare ett siffer – ti tiere er én hundrer.","fi":"Korkkiin mahtuu vain yksi numero – kymmenen kymmentä on yksi sata."},
    hintTenthH: {"en":"A cap holds only one digit — this mat goes up to 9 hundreds.","de":"Auf einen Deckel passt nur eine Ziffer – diese Tafel reicht bis 9 Hunderter.","fr":"Un bouchon ne porte qu’un seul chiffre : ce tableau va jusqu’à 9 centaines.","es":"Una tapa solo lleva una cifra: este tablero llega hasta 9 centenas.","pt":"Uma tampa só tem um algarismo — este tabuleiro vai até 9 centenas.","it":"Un tappo porta una sola cifra: questa tabella arriva a 9 centinaia.","nl":"Op een dop past maar één cijfer – deze mat gaat tot 9 honderdtallen.","sv":"Ett lock rymmer bara en siffra – den här brädan räcker till 9 hundratal.","da":"Der er kun plads til ét ciffer på et låg – dette bræt går op til 9 hundreder.","no":"En kork har plass til bare ett siffer – denne matta går opp til 9 hundrere.","fi":"Korkkiin mahtuu vain yksi numero – tälle taululle mahtuu enintään 9 sataa."},
    okLine: {"en":"{h}, {t} and {o}: {n}.","de":"{h}, {t} und {o}: {n}.","fr":"{h}, {t} et {o} : {n}.","es":"{h}, {t} y {o}: {n}.","pt":"{h}, {t} e {o}: {n}.","it":"{h}, {t} e {o}: {n}.","nl":"{h}, {t} en {o}: {n}.","sv":"{h}, {t} och {o}: {n}.","da":"{h}, {t} og {o}: {n}.","no":"{h}, {t} og {o}: {n}.","fi":"{h}, {t} ja {o}: {n}."},
    wH0: {"en":"hundreds","de":"Hunderter","fr":"centaine","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sataa"},
    wH1: {"en":"hundred","de":"Hunderter","fr":"centaine","es":"centena","pt":"centena","it":"centinaio","nl":"honderdtal","sv":"hundratal","da":"hundrede","no":"hundrer","fi":"sata"},
    wHn: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sataa"},
    wT0: {"en":"tens","de":"Zehner","fr":"dizaine","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmentä"},
    wT1: {"en":"ten","de":"Zehner","fr":"dizaine","es":"decena","pt":"dezena","it":"decina","nl":"tiental","sv":"tiotal","da":"tier","no":"tier","fi":"kymmen"},
    wTn: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmentä"},
    wO0: {"en":"ones","de":"Einer","fr":"unité","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköstä"},
    wO1: {"en":"one","de":"Einer","fr":"unité","es":"unidad","pt":"unidade","it":"unità","nl":"eenheid","sv":"ental","da":"ener","no":"ener","fi":"ykkönen"},
    wOn: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköstä"},
    pH: {"en":"hundreds","de":"Hunderter","fr":"centaines","es":"centenas","pt":"centenas","it":"centinaia","nl":"honderdtallen","sv":"hundratal","da":"hundreder","no":"hundrere","fi":"sadat"},
    pT: {"en":"tens","de":"Zehner","fr":"dizaines","es":"decenas","pt":"dezenas","it":"decine","nl":"tientallen","sv":"tiotal","da":"tiere","no":"tiere","fi":"kymmenet"},
    pO: {"en":"ones","de":"Einer","fr":"unités","es":"unidades","pt":"unidades","it":"unità","nl":"eenheden","sv":"ental","da":"enere","no":"enere","fi":"ykköset"},
    aCol: {"en":"Column of the {place}: {k} blocks. Cap: {d}.","de":"Spalte der {place}: {k} Blöcke. Deckel: {d}.","fr":"Colonne des {place} : {k} blocs. Bouchon : {d}.","es":"Columna de las {place}: {k} bloques. Tapa: {d}.","pt":"Coluna das {place}: {k} blocos. Tampa: {d}.","it":"Colonna delle {place}: {k} blocchi. Tappo: {d}.","nl":"Kolom van de {place}: {k} blokken. Dop: {d}.","sv":"Kolumnen för {place}: {k} block. Lock: {d}.","da":"Kolonnen med {place}: {k} klodser. Låg: {d}.","no":"Kolonnen med {place}: {k} klosser. Kork: {d}.","fi":"Sarake: {place}. Palikoita {k}. Korkki: {d}."},
    aNone: {"en":"none","de":"keiner","fr":"aucun","es":"ninguna","pt":"nenhuma","it":"nessuno","nl":"geen","sv":"inget","da":"intet","no":"ingen","fi":"ei korkkia"},
    aAdd: {"en":"Add a block to the {place}","de":"Einen Block zu den {place} legen","fr":"Ajouter un bloc aux {place}","es":"Agregar un bloque a las {place}","pt":"Colocar um bloco nas {place}","it":"Aggiungere un blocco alle {place}","nl":"Een blok bij de {place} leggen","sv":"Lägg till ett block i kolumnen för {place}","da":"Læg en klods til {place}","no":"Legg en kloss til {place}","fi":"Lisää palikka: {place}"},
    aRemove: {"en":"Take a block away from the {place}","de":"Einen Block von den {place} wegnehmen","fr":"Enlever un bloc des {place}","es":"Quitar un bloque de las {place}","pt":"Tirar um bloco das {place}","it":"Togliere un blocco dalle {place}","nl":"Een blok van de {place} weghalen","sv":"Ta bort ett block från {place}","da":"Tag en klods væk fra {place}","no":"Ta bort en kloss fra {place}","fi":"Poista palikka: {place}"},
    aSeat: {"en":"Cap seat of the {place}","de":"Deckelplatz der {place}","fr":"Place du bouchon des {place}","es":"Lugar de la tapa de las {place}","pt":"Lugar da tampa das {place}","it":"Posto del tappo delle {place}","nl":"Plek voor de dop van de {place}","sv":"Lockets plats för {place}","da":"Lågets plads for {place}","no":"Korkens plass for {place}","fi":"Korkin paikka: {place}"},
    aCap: {"en":"Cap {d}","de":"Deckel {d}","fr":"Bouchon {d}","es":"Tapa {d}","pt":"Tampa {d}","it":"Tappo {d}","nl":"Dop {d}","sv":"Lock {d}","da":"Låg {d}","no":"Kork {d}","fi":"Korkki {d}"},
    aTray: {"en":"Tray {i}","de":"Tablett {i}","fr":"Plateau {i}","es":"Bandeja {i}","pt":"Bandeja {i}","it":"Vassoio {i}","nl":"Dienblad {i}","sv":"Bricka {i}","da":"Bakke {i}","no":"Brett {i}","fi":"Tarjotin {i}"},
    aTicket: {"en":"Ticket: {n}","de":"Kärtchen: {n}","fr":"Étiquette : {n}","es":"Etiqueta: {n}","pt":"Etiqueta: {n}","it":"Cartellino: {n}","nl":"Kaartje: {n}","sv":"Lapp: {n}","da":"Seddel: {n}","no":"Lapp: {n}","fi":"Lappu: {n}"},
    aPile: {"en":"Pile of {place}. Tap to put one block on the mat.","de":"Haufen {place}. Tipp, um einen Block auf die Tafel zu legen.","fr":"Tas de {place}. Touche pour poser un bloc sur le tableau.","es":"Montón de {place}. Toca para poner un bloque en el tablero.","pt":"Monte de {place}. Toque para colocar um bloco no tabuleiro.","it":"Mucchio di {place}. Tocca per mettere un blocco sulla tabella.","nl":"Hoopje {place}. Tik om één blok op de mat te leggen.","sv":"Hög med {place}. Tryck för att lägga ett block på brädan.","da":"Bunke med {place}. Tryk for at lægge en klods på brættet.","no":"Haug med {place}. Trykk for å legge en kloss på matta.","fi":"Kasa: {place}. Napauta, niin yksi palikka siirtyy taululle."},
    aBack: {"en":"Put one block from the {place} back","de":"Einen Block von den {place} zurücklegen","fr":"Remettre un bloc des {place} à sa place","es":"Devolver un bloque de las {place}","pt":"Devolver um bloco das {place}","it":"Rimettere a posto un blocco delle {place}","nl":"Eén blok van de {place} terugleggen","sv":"Lägg tillbaka ett block från {place}","da":"Læg en klods fra {place} tilbage","no":"Legg en kloss fra {place} tilbake","fi":"Palauta yksi palikka: {place}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setJob: {"en":"Job","de":"Aufgabe","fr":"Tâche","es":"Tarea","pt":"Tarefa","it":"Compito","nl":"Opdracht","sv":"Uppgift","da":"Opgave","no":"Oppgave","fi":"Tehtävä"},
    jBuild: {"en":"build","de":"bauen","fr":"construire","es":"construir","pt":"construir","it":"costruire","nl":"bouwen","sv":"bygga","da":"bygge","no":"bygge","fi":"rakenna"},
    jRead: {"en":"read","de":"ablesen","fr":"lire","es":"leer","pt":"ler","it":"leggere","nl":"aflezen","sv":"läsa av","da":"aflæse","no":"lese av","fi":"lue"},
    jMatch: {"en":"match","de":"zuordnen","fr":"associer","es":"emparejar","pt":"combinar","it":"abbinare","nl":"koppelen","sv":"para ihop","da":"parre","no":"pare","fi":"yhdistä"},
    setBlocks: {"en":"Blocks","de":"Blöcke","fr":"Blocs","es":"Bloques","pt":"Blocos","it":"Blocchi","nl":"Blokken","sv":"Block","da":"Klodser","no":"Klosser","fi":"Palikat"},
    bTidy: {"en":"tidy","de":"ordentlich","fr":"rangés","es":"ordenados","pt":"organizados","it":"in ordine","nl":"netjes","sv":"i ordning","da":"ryddelige","no":"ryddige","fi":"järjestyksessä"},
    bJumbled: {"en":"jumbled","de":"durcheinander","fr":"mélangés","es":"revueltos","pt":"misturados","it":"alla rinfusa","nl":"door elkaar","sv":"huller om buller","da":"hulter til bulter","no":"hulter til bulter","fi":"sekaisin"},
  },/*STRINGS-END*/
  defaults: { job: 'build', blocks: 'tidy' },
  settings: [
    { key: 'job', type: 'choice', labelKey: 'setJob', options: [{ value: 'build', labelKey: 'jBuild' }, { value: 'read', labelKey: 'jRead' }, { value: 'match', labelKey: 'jMatch' }] },
    { key: 'blocks', type: 'choice', labelKey: 'setBlocks', options: [{ value: 'tidy', labelKey: 'bTidy' }, { value: 'jumbled', labelKey: 'bJumbled' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null;
    injectCappedMatCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } this._endDrag(); },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this._start(this.st.k); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _job: function () { return CappedMatCore.jobOf(this._setting('job')); },
  _jumbled: function () { return this._setting('blocks') === 'jumbled'; },
  _key: function () { return this._job() + (this._job() === 'build' ? '' : '.' + (this._jumbled() ? 'j' : 't')); },
  _place: function (p) { return this._t(p === 'h' ? 'pH' : p === 't' ? 'pT' : 'pO'); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = CappedMatCore.rounds(this._job()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = CappedMatCore, pool = this._ensurePool(), job = this._job(), n = C.passSize(job), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { var P = C.plan(job, pass, Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'capped-mat.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st; if (!st) return '';
    if (st.job === 'build') return this._t('taskBuild', { n: st.round.n });
    if (st.job === 'read') return this._t('qRead');
    return this._t('qMatch', { n: st.round.n });
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = CappedMatCore.newState(this._job(), this._jumbled(), k);
    this._view = { note: '', ok: '', soft: false, fold: false, success: false, seat: null, sent: null, refusedAt: null, shake: null };
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
  _dims: function () { var W = this._width(), B = CappedMatCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'cm-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="cm-work"><div class="cm-side"></div><div class="cm-main"></div></div>'
      + '<div class="cm-rack"></div><p class="cm-note" aria-live="polite"></p><div class="cm-bar"></div><p class="cm-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) { self._keyboard(e); });
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

  /* every size in one place, from the stage width.
     u = the side of one unit cube; a rod is 1 × 10 cubes, a flat 10 × 10 (true scale). */
  _geo: function (D) {
    var st = this.st, wide = D.wide, cramp = D.cramp;
    var side = st.job === 'build' || st.job === 'match' || (st.job === 'read' && st.jumbled);
    var sideW = wide && side ? 168 : 0, gapS = sideW ? 16 : 0;
    var M = D.W - sideW - gapS;
    var seat = wide ? 64 : cramp ? 46 : 52, colPad = 8, colGap = wide ? 8 : 5;
    /* column widths in units of u: hundreds = a flat + an 8-step fan; tens = 9 rods; ones = a 3 × 3 nest */
    var FAN = 0.8, RP = 1.45, CP = 1.4;
    /* the ones column is the narrowest: it must still hold its cap seat and its − / + pair
       (side by side on a wide stage, one above the other on a narrow one) */
    var pmW = st.job === 'build' ? (wide ? 2 * 48 + 6 : 48) : 0;
    var onesW = function (u) { return Math.max(u + 2 * CP * u, seat, pmW) + 2 * colPad; };
    /* the biggest unit cube for which the whole mat fits the room (cube ≥ 5 px; never a tap target) */
    var u = 5;
    for (var cand = 13; cand >= 5; cand--) {
      var w = (10 + 8 * FAN) * cand + 2 * colPad + (cand + 8 * RP * cand) + 2 * colPad + onesW(cand) + 2 * colGap + 8;
      if (w <= M) { u = cand; break; }
    }
    var hW = Math.round((10 + 8 * FAN) * u) + 2 * colPad, tW = Math.round(u + 8 * RP * u) + 2 * colPad, oW = Math.round(onesW(u));
    var blocksH = Math.round((10 + 8 * FAN) * u);
    return { W: D.W, wide: wide, cramp: cramp, side: side, sideW: sideW, M: M, u: u, FAN: FAN, RP: RP, CP: CP, seat: seat, colPad: colPad, colGap: colGap,
      hW: hW, tW: tW, oW: oW, matW: hW + tW + oW + 2 * colGap + 8, blocksH: blocksH, pm: cramp ? 44 : wide ? 44 : 44,
      du: Math.max(5, Math.round(u * (wide ? 0.82 : 0.7))), tu: Math.max(5, Math.round(u * (wide ? 0.72 : 0.66))), cap: wide ? 44 : cramp ? 44 : 48 };
  },
  _paint_: function () {
    var st = this.st, D = this._dims(), G = this._geo(D), v = this._view;
    this._wrap.className = 'cm-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.help ? ' is-help' : '')
      + (this.FAST ? ' is-fast' : '') + ' is-' + st.job + (G.side ? ' has-side' : ' no-side') + (st.jumbled ? ' is-jumbled' : '');
    this._paintSide(G);
    if (st.job === 'match') this._paintTrays(G); else this._paintMat(G);
    this._paintRack(G); this._paintBar(G);
    var note = this._qs('.cm-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'cm-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'cm-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'cm-note'; }
    this._setPrompt();
    /* one-shot marks: they play on the paint that shows them, never on a later one */
    v.fold = false; v.sent = null; v.refusedAt = null; v.shake = null;
  },

  /* ---------- blocks (drawn to true scale) ---------- */
  _cross: function (x, y, w, h) { return '<path class="cm-cross" d="M' + x + ' ' + y + 'L' + (x + w) + ' ' + (y + h) + 'M' + (x + w) + ' ' + y + 'L' + x + ' ' + (y + h) + '"/>'; },
  _flat: function (x, y, s, cls, num) {
    var h = '<g class="cm-flat' + (cls ? ' ' + cls : '') + '"><rect class="cm-flatbg" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="1.5"/>';
    if (cls === 'is-extra') h += this._cross(x, y, s, s);
    if (s >= 40 && cls !== 'is-ghost') { var d = ''; for (var i = 1; i < 10; i++) d += 'M' + (x + i * s / 10) + ' ' + y + 'V' + (y + s) + 'M' + x + ' ' + (y + i * s / 10) + 'H' + (x + s); h += '<path class="cm-grid" d="' + d + '"/>'; }
    if (num) h += this._numMark(x + s * 0.18, y + s * 0.18, num, Math.max(10, s * 0.14));
    return h + '</g>';
  },
  _rod: function (x, y, u, cls, num) {
    var h = '<g class="cm-rod' + (cls ? ' ' + cls : '') + '"><rect class="cm-rodbg" x="' + x + '" y="' + y + '" width="' + u + '" height="' + 10 * u + '" rx="1.5"/>';
    if (cls === 'is-extra') h += this._cross(x - u * 0.6, y + 3 * u, u * 2.2, u * 2.2);
    if (u >= 6 && cls !== 'is-ghost') { var d = ''; for (var i = 1; i < 10; i++) d += 'M' + x + ' ' + (y + i * u) + 'H' + (x + u); h += '<path class="cm-grid" d="' + d + '"/>'; }
    if (num) h += this._numMark(x + u / 2, y - Math.max(9, u * 0.9), num, Math.max(10, u * 1.2));
    return h + '</g>';
  },
  _cube: function (x, y, u, cls, num) {
    var h = '<g class="cm-cube' + (cls ? ' ' + cls : '') + '"><rect class="cm-cubebg" x="' + x + '" y="' + y + '" width="' + u + '" height="' + u + '" rx="1.5"/>';
    if (cls === 'is-extra') h += this._cross(x - 1, y - 1, u + 2, u + 2);
    if (num) h += this._numMark(x + u / 2, y + u / 2, num, Math.max(10, u * 1.1));
    return h + '</g>';
  },
  /* a numbered dot for "count with the numbers" (help 2) */
  _numMark: function (x, y, n, s) { var r = s * 0.62; return '<circle class="cm-numdot" cx="' + x + '" cy="' + y + '" r="' + r + '"/><text class="cm-numtxt" x="' + x + '" y="' + (y + s * 0.36) + '" text-anchor="middle" style="font-size:' + s + 'px">' + n + '</text>'; },
  /* the blocks of one column: flats fan down-right, rods stand side by side, cubes nest 3 × 3 from the bottom */
  _colBlocks: function (p, k, G, opt) {
    opt = opt || {}; var u = G.u, s = 10 * u, fo = Math.round(G.FAN * u), H = G.blocksH, out = '', i, ghost = opt.ghost || 0, nums = opt.nums, extraFrom = opt.extraFrom == null ? 99 : opt.extraFrom;
    var n = Math.max(k, ghost);
    for (i = 0; i < n; i++) {
      var cls = i >= k ? 'is-ghost' : i >= extraFrom ? 'is-extra' : '', num = nums && i < k ? i + 1 : 0;
      if (p === 'h') out += this._flat(i * fo, i * fo, s, cls, num);
      else if (p === 't') out += this._rod(Math.round(i * G.RP * u), H - s, u, cls, num);
      else { var c = i % 3, r = Math.floor(i / 3); out += this._cube(Math.round(c * G.CP * u), Math.round(H - u - r * G.CP * u), u, cls, num); }
    }
    return out;
  },
  _colInnerW: function (p, G) { return (p === 'h' ? G.hW : p === 't' ? G.tW : G.oW) - 2 * G.colPad; },

  /* ---------- the cap (a ribbed bottle cap with one numeral) ---------- */
  _capHtml: function (d, size, cls) { return '<span class="cm-cap cm-art' + (cls ? ' ' + cls : '') + '" style="width:' + size + 'px;height:' + size + 'px;font-size:' + Math.round(size * 0.56) + 'px"><span class="cm-capd">' + d + '</span></span>'; },

  /* ---------- the mat ---------- */
  _paintMat: function (G) {
    var st = this.st, v = this._view, self = this, el = this._qs('.cm-main'), C = CappedMatCore;
    el.innerHTML = '';
    var mat = document.createElement('div'); mat.className = 'cm-mat cm-art'; mat.style.width = G.matW + 'px';
    var verdict = st.verdict, glow = verdict && verdict.places ? verdict.places : [];
    C.PLACES.forEach(function (p) {
      var col = document.createElement('div'), k = st.mat[p], capd = st.caps[p];
      var bare = verdict && verdict.kind === 'zeroFold' && verdict.bare.indexOf(p) >= 0;
      col.className = 'cm-col cm-col-' + p + (glow.indexOf(p) >= 0 ? ' is-glow' : '') + (bare ? ' is-bare' : '') + (bare && v.fold ? ' is-folding' : '')
        + (verdict && verdict.kind === 'wrongCap' && glow.indexOf(p) >= 0 && !st.help ? ' is-bob' : '') + (v.shake === p ? ' is-shake' : '');
      col.style.width = (p === 'h' ? G.hW : p === 't' ? G.tW : G.oW) + 'px';
      col.setAttribute('role', 'group');
      col.setAttribute('aria-label', self._t('aCol', { place: self._place(p), k: k, d: capd == null ? self._t('aNone') : capd }));
      /* the column glyph: a little flat / rod / cube (no words) */
      var g = '<svg class="cm-glyph cm-art" width="26" height="18" viewBox="0 0 26 18" aria-hidden="true">' + (p === 'h' ? '<rect x="5" y="1" width="16" height="16" rx="1.5" class="cm-flatbg"/>' : p === 't' ? '<rect x="10" y="1" width="5" height="16" rx="1" class="cm-rodbg"/>' : '<rect x="9" y="5" width="8" height="8" rx="1" class="cm-cubebg"/>') + '</svg>';
      /* the cap seat */
      var seatCls = 'cm-seat' + (capd != null ? ' is-capped' : '') + (st.job === 'read' && !st.done && v.seat === p ? ' is-active' : '');
      var seatInner = capd != null ? self._capHtml(capd, G.seat - 4, (st.done ? 'is-lit' : '') + (st.job === 'build' && !st.done ? ' is-drop' : '')) : (bare && st.help ? '<span class="cm-ghostcap" style="font-size:' + Math.round(G.seat * 0.5) + 'px">0</span>' : '');
      var seat = st.job === 'read' && !st.done ? self._btn(seatCls, 'seat-' + p, self._t('aSeat', { place: self._place(p) }), seatInner) : (function () { var s = document.createElement('span'); s.className = seatCls; s.innerHTML = seatInner; return s; })();
      seat.style.width = G.seat + 'px'; seat.style.height = G.seat + 'px'; seat.setAttribute('data-place', p);
      if (st.job === 'read' && !st.done) seat.addEventListener('click', function () { self._seat(p); });
      /* the blocks */
      var helpBuild = verdict && verdict.kind === 'wrongBuild' && st.help;
      var ghost = helpBuild && verdict.under.indexOf(p) >= 0 ? C.digits(st.round.n)[p] : 0;
      var extraFrom = helpBuild && verdict.over.indexOf(p) >= 0 ? C.digits(st.round.n)[p] : null;
      var nums = verdict && verdict.kind === 'wrongCap' && st.help && glow.indexOf(p) >= 0;
      var iw = self._colInnerW(p, G), svg = '<svg class="cm-blocks cm-art" width="' + iw + '" height="' + G.blocksH + '" viewBox="0 0 ' + iw + ' ' + G.blocksH + '" aria-hidden="true">' + self._colBlocks(p, k, G, { ghost: ghost, nums: nums, extraFrom: extraFrom }) + '</svg>';
      var area;
      if (st.job === 'read' && st.jumbled && !st.done) { area = self._btn('cm-area is-back', 'back-' + p, self._t('aBack', { place: self._place(p) }), svg); area.disabled = !k; area.addEventListener('click', function () { self._back(p); }); }
      else { area = document.createElement('div'); area.className = 'cm-area'; area.innerHTML = svg; }
      if (v.sent === p) area.className += ' is-landed';
      col.innerHTML = g; col.appendChild(seat); col.appendChild(area);
      if (st.job === 'build' && !st.done) {
        var pm = document.createElement('div'); pm.className = 'cm-pm';
        var plus = self._btn('cm-plus', 'add-' + p, self._t('aAdd', { place: self._place(p) }), '+'), minus = self._btn('cm-minus', 'rem-' + p, self._t('aRemove', { place: self._place(p) }), '−');
        minus.disabled = !k;
        plus.addEventListener('click', function () { self._add(p); }); minus.addEventListener('click', function () { self._remove(p); });
        pm.appendChild(minus); pm.appendChild(plus); col.appendChild(pm);
      }
      /* a refused tenth: the next place's block appears as an outline over the next column for a moment */
      mat.appendChild(col);
    });
    if (v.refusedAt) {
      var nextP = v.refusedAt === 'o' ? 't' : v.refusedAt === 't' ? 'h' : null;
      if (nextP) { var nc = mat.querySelector('.cm-col-' + nextP + ' .cm-area'); if (nc) { var gl = document.createElement('div'); gl.className = 'cm-tenghost'; gl.innerHTML = '<svg class="cm-art" width="' + (nextP === 'h' ? 10 * G.u : G.u) + '" height="' + 10 * G.u + '" aria-hidden="true">' + (nextP === 'h' ? this._flat(0, 0, 10 * G.u, 'is-ghost') : this._rod(0, 0, G.u, 'is-ghost')) + '</svg>'; nc.appendChild(gl); } }
    }
    /* the lid: closes over the blocks on success (the caps stay in sight above it) */
    if (st.done) { var lid = document.createElement('div'); lid.className = 'cm-lid'; mat.appendChild(lid); }
    if (v.fold && verdict && verdict.kind === 'zeroFold') mat.className += ' is-shut';
    el.appendChild(mat);
  },

  /* ---------- the side: ticket (build, match) or the delivery (read, jumbled) ---------- */
  _paintSide: function (G) {
    var st = this.st, self = this, el = this._qs('.cm-side'); el.innerHTML = '';
    el.style.display = G.side ? '' : 'none';
    if (!G.side) return;
    if (G.wide) el.style.width = G.sideW + 'px'; else el.style.width = '';
    if (st.job === 'read') { this._paintDelivery(el, G); return; }
    var t = st.job === 'match' && !st.done ? this._btn('cm-ticket cm-art is-drag', 'ticket', this._t('aTicket', { n: st.round.n }), '<span>' + st.round.n + '</span>') : document.createElement('div');
    if (!(st.job === 'match' && !st.done)) { t.className = 'cm-ticket cm-art' + (st.done ? ' is-out' : ''); t.setAttribute('role', 'img'); t.setAttribute('aria-label', this._t('aTicket', { n: st.round.n })); t.innerHTML = '<span>' + st.round.n + '</span>'; }
    if (st.job === 'match' && !st.done) t.addEventListener('pointerdown', function (e) { self._dragStart(e, 'ticket', null, t); });
    el.appendChild(t);
  },
  _paintDelivery: function (el, G) {
    var st = this.st, self = this, tray = document.createElement('div'); tray.className = 'cm-delivery cm-art';
    if (!st.delivery.length) { tray.className += ' is-empty'; el.appendChild(tray); return; }
    /* the groups in the order the kinds lie in the delivery (never a reading order) */
    var groups = []; st.delivery.forEach(function (p) { var g = groups[groups.length - 1]; if (g && g.p === p) g.k++; else groups.push({ p: p, k: 1 }); });
    var du = G.du, fo = Math.round(G.FAN * du);
    groups.forEach(function (gr) {
      var w, h, inner = '', i;
      /* on a narrow stage the flats fan sideways only: the delivery stays one flat tall, so Check stays above the fold */
      if (gr.p === 'h') { var fy = G.wide ? fo : 0; w = 10 * du + (gr.k - 1) * fo; h = 10 * du + (gr.k - 1) * fy; for (i = 0; i < gr.k; i++) inner += self._flat(i * fo, i * fy, 10 * du); }
      else if (gr.p === 't') { w = Math.round(du + (gr.k - 1) * G.RP * du); h = 10 * du; for (i = 0; i < gr.k; i++) inner += self._rod(Math.round(i * G.RP * du), 0, du); }
      else { var cols = Math.min(3, gr.k), rows = Math.ceil(gr.k / 3); w = Math.round(du + (cols - 1) * G.CP * du); h = Math.round(du + (rows - 1) * G.CP * du); for (i = 0; i < gr.k; i++) inner += self._cube(Math.round((i % 3) * G.CP * du), Math.round(Math.floor(i / 3) * G.CP * du), du); }
      var b = self._btn('cm-pile', 'pile-' + gr.p, self._t('aPile', { place: self._place(gr.p) }), '<svg class="cm-art" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + inner + '</svg>');
      b.addEventListener('click', function () { self._send(gr.p); });
      tray.appendChild(b);
    });
    el.appendChild(tray);
  },

  /* ---------- the three trays (match) ---------- */
  _paintTrays: function (G) {
    var st = this.st, r = st.round, self = this, el = this._qs('.cm-main'), C = CappedMatCore, v = st.verdict;
    el.innerHTML = '';
    var box = document.createElement('div'); box.className = 'cm-trays'; box.style.width = G.M + 'px';
    var tu = G.tu, fo = Math.round(G.FAN * tu);
    r.trays.forEach(function (n, i) {
      var d = C.digits(n), order = C.trayOrder(r.k, i, st.jumbled), x = 0, inner = '', H = 10 * tu + 5 * fo;
      var wrongHere = v && v.kind === 'wrongTray' && st.tray === i;
      order.split('').forEach(function (p) {
        var k = d[p], j, glowP = wrongHere && v.places.indexOf(p) >= 0 ? ' is-glow' : '';
        if (!k) return;
        inner += '<g class="cm-group' + glowP + '">';
        if (p === 'h') { for (j = 0; j < k; j++) inner += self._flat(x + j * fo, j * fo, 10 * tu); x += 10 * tu + (k - 1) * fo; }
        else if (p === 't') { for (j = 0; j < k; j++) inner += self._rod(x + Math.round(j * G.RP * tu), H - 10 * tu, tu); x += Math.round(tu + (k - 1) * G.RP * tu); }
        else { for (j = 0; j < k; j++) inner += self._cube(x + Math.round((j % 3) * G.CP * tu), Math.round(H - tu - Math.floor(j / 3) * G.CP * tu), tu); x += Math.round(tu + (Math.min(3, k) - 1) * G.CP * tu); }
        inner += '</g>'; x += Math.round(2.2 * tu);
      });
      var showCaps = (st.help && v) || wrongHere || (st.done && i === r.right);
      var caps = showCaps ? '<span class="cm-traycaps">' + C.PLACES.map(function (p) { return self._capHtml(d[p], G.wide ? 34 : 28, wrongHere && v.places.indexOf(p) >= 0 ? 'is-diff' : ''); }).join('') + '</span>' : '';
      var cls = 'cm-tray' + (st.tray === i ? ' is-chosen' : '') + (wrongHere ? ' is-wrong' : '') + (st.done && i === r.right ? ' is-right' : '');
      var b = self._btn(cls, 'tray-' + i, self._t('aTray', { i: i + 1 }), '<svg class="cm-art" width="' + x + '" height="' + H + '" viewBox="0 0 ' + x + ' ' + H + '" aria-hidden="true">' + inner + '</svg>' + caps + (st.tray === i && !st.done ? '<span class="cm-trayticket">' + r.n + '</span>' : ''));
      b.setAttribute('data-tray', i);
      b.disabled = st.done;
      b.addEventListener('click', function () { self._pick(i); });
      box.appendChild(b);
    });
    el.appendChild(box);
  },

  /* ---------- the cap rack (read) ---------- */
  _paintRack: function (G) {
    var st = this.st, self = this, el = this._qs('.cm-rack'); el.innerHTML = '';
    if (st.job !== 'read' || st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    for (var d = 0; d <= 9; d++) (function (d) {
      var b = self._btn('cm-rackbtn', 'cap-' + d, self._t('aCap', { d: d }), self._capHtml(d, G.wide ? 40 : 38, 'is-rack'));
      b.addEventListener('pointerdown', function (e) { self._dragStart(e, 'cap', d, b); });
      b.addEventListener('click', function (e) { if (self._dragged) { self._dragged = false; return; } self._capTo(self._activeSeat(), d); });
      el.appendChild(b);
    })(d);
  },
  _paintBar: function () {
    var st = this.st, self = this, el = this._qs('.cm-bar'); el.innerHTML = '';
    if (st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var c = this._btn('cm-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._t('checkBtn') + '</span>');
    c.addEventListener('click', function () { self._check(); });
    el.appendChild(c);
  },

  /* ---------------- the hand ---------------- */
  _clearMarks: function () { var v = this._view; v.note = ''; v.ok = ''; },
  _say: function (k, a) { var sr = this._qs && this._qs('.cm-sr'); if (sr) sr.textContent = this._t(k, a); },
  _add: function (p) {
    var r = CappedMatCore.add(this.st, p);
    if (r.refused) { var v = this._view; v.note = this._t(CappedMatCore.refusedKey(p)); v.soft = true; v.ok = ''; v.refusedAt = p; v.shake = p; this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    if (r.ok) { this._clearMarks(); this.api.sound(p === 'h' ? 330 : p === 't' ? 520 : 760); this._paint(); }
  },
  _remove: function (p) { if (CappedMatCore.remove(this.st, p)) { this._clearMarks(); this.api.sound(300); this._paint(); } },
  _send: function (p) {
    var st = this.st, i = st.delivery.indexOf(p);
    if (i < 0) return;
    var got = CappedMatCore.sendBlock(st, i);
    if (got) { this._clearMarks(); this._view.sent = got; this.api.sound(got === 'h' ? 330 : got === 't' ? 520 : 760); this._paint(); }
  },
  _back: function (p) { if (CappedMatCore.backBlock(this.st, p)) { this._clearMarks(); this.api.sound(300); this._paint(); } },
  /* the seat a tapped cap goes to: the chosen one, else the first bare column (hundreds → ones) */
  _activeSeat: function () {
    var st = this.st, v = this._view;
    if (v.seat && st.caps[v.seat] == null) return v.seat;
    var bare = CappedMatCore.PLACES.filter(function (p) { return st.caps[p] == null; });
    return v.seat || bare[0] || 'h';
  },
  _seat: function (p) {
    var st = this.st;
    if (st.caps[p] != null) { this._uncap(p); return; }
    this._view.seat = p; this.api.sound(520); this._paint();
  },
  _capTo: function (p, d) {
    var st = this.st;
    if (!CappedMatCore.cap(st, p, d)) return;
    this._clearMarks(); this.api.sound(880);
    var next = CappedMatCore.PLACES.filter(function (q) { return st.caps[q] == null; });
    this._view.seat = next[0] || null;
    this._paint();
  },
  _uncap: function (p) { if (CappedMatCore.uncap(this.st, p)) { this._clearMarks(); this._view.seat = p; this.api.sound(300); this._paint(); } },
  _pick: function (i) { if (CappedMatCore.pickTray(this.st, i)) { this._clearMarks(); this.api.sound(520); this._paint(); } },

  /* drag a cap onto a seat, or the ticket onto a tray (a tap stays a tap) */
  _dragStart: function (e, kind, val, srcEl) {
    if (e.button != null && e.button !== 0) return;
    var self = this, sx = e.clientX, sy = e.clientY, moved = false, ghost = null;
    this._dragged = false;
    var mv = function (ev) {
      if (!moved && Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) < 8) return;
      if (!moved) { moved = true; ghost = srcEl.cloneNode(true); ghost.className += ' cm-ghost'; ghost.removeAttribute('data-k'); document.body.appendChild(ghost); srcEl.classList.add('is-lifted'); }
      ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
      ev.preventDefault();
    };
    var up = function (ev) {
      self._endDrag();
      if (!moved) return;
      self._dragged = true;
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), target;
      if (kind === 'cap' && hit && (target = hit.closest('.cm-seat'))) self._capTo(target.getAttribute('data-place'), val);
      else if (kind === 'ticket' && hit && (target = hit.closest('.cm-tray'))) { self._dragged = false; self._pick(+target.getAttribute('data-tray')); }
      else if (kind === 'ticket') self._dragged = false;
    };
    this._drag = { mv: mv, up: up, ghost: function () { return ghost; }, src: srcEl };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d) return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    var g = d.ghost(); if (g && g.parentNode) g.parentNode.removeChild(g);
    if (d.src) d.src.classList.remove('is-lifted');
    this._drag = null;
  },
  _keyboard: function (e) {
    if (!this.st) return;
    if (this.st.job === 'read' && /^[0-9]$/.test(e.key)) { e.preventDefault(); this._capTo(this._activeSeat(), +e.key); }
    else if (e.key === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view; if (st.done) return;
    var r = CappedMatCore.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; v.ok = ''; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (r.result === 'ok') { this._success(); return; }
    var key = CappedMatCore.hint(st), V = st.verdict;
    v.ok = ''; v.soft = false;
    v.note = this._t(key, { n: st.round.n, fold: V.fold || '', built: V.built || '', shown: V.shown || '' });
    if (V.kind === 'zeroFold' && !st.help) v.fold = true;
    if (V.kind === 'zeroFold' || V.kind === 'wrongCap') v.seat = null;
    this.api.sound(240); this._paint(); this.api.announce(v.note);
  },
  _word: function (place, n) { var P = place === 'h' ? 'wH' : place === 't' ? 'wT' : 'wO'; return n + ' ' + this._t(P + (n === 0 ? '0' : n === 1 ? '1' : 'n')); },
  _okLine: function () { var c = CappedMatCore.counts(this.st); return this._t('okLine', { h: this._word('h', c.h), t: this._word('t', c.t), o: this._word('o', c.o), n: this.st.round.n }); },
  _success: function () {
    var v = this._view, msg = this._okLine();
    v.note = ''; v.ok = msg; v.success = true;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectCappedMatCSS() {
  if (typeof document === 'undefined' || document.getElementById('cm-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.cm-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .cm-wrap:focus{outline:none;}'
  + '.cm-work{display:flex;gap:16px;align-items:flex-start;justify-content:center;} .cm-wrap.is-narrow .cm-work{flex-direction:column;align-items:center;gap:8px;}'
  + '.cm-side{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:8px;flex:0 0 auto;} .cm-wrap.is-narrow .cm-side{width:100%;}'
  + '.cm-main{display:flex;justify-content:center;flex:0 1 auto;min-width:0;}'
  /* the mat */
  + '.cm-mat{position:relative;display:flex;gap:8px;padding:4px;border-radius:16px;background:#FBF3E4;box-shadow:inset 0 0 0 3px #146B5E;box-sizing:border-box;justify-content:center;overflow:hidden;} .cm-wrap.is-narrow .cm-mat{gap:5px;}'
  + '.cm-col{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px 8px 8px;box-sizing:border-box;border-radius:12px;transition:background .2s;}'
  + '/* the divider: a straight line in the middle of the gap, drawn apart from the column so a glow never hides it */ .cm-col + .cm-col::before{content:"";position:absolute;left:-5px;top:12px;bottom:12px;width:2px;border-radius:1px;background:#146B5E;opacity:.55;pointer-events:none;} .cm-wrap.is-narrow .cm-col + .cm-col::before{left:-3.5px;}'
  + '.cm-col.is-glow{background:rgba(242,120,75,.16);box-shadow:inset 0 0 0 3px #F2784B;}'
  + '.cm-col.is-bare{background:rgba(46,156,136,.14);box-shadow:inset 0 0 0 3px #2E9C88;}'
  + '.cm-col.is-folding{animation:cmFold 1.5s ease-in-out 1;overflow:hidden;} .cm-wrap.is-fast .cm-col.is-folding{animation:none;}'
  + '@keyframes cmFold{0%{max-width:400px;}30%{max-width:0;padding-left:0;padding-right:0;opacity:.2;}66%{max-width:0;padding-left:0;padding-right:0;opacity:.2;}100%{max-width:400px;}}'
  + '.cm-mat.is-shut{animation:cmShudder .5s ease-in-out .45s 1;} .cm-wrap.is-fast .cm-mat.is-shut{animation:none;} @keyframes cmShudder{20%{transform:translateX(-4px);}40%{transform:translateX(4px);}60%{transform:translateX(-3px);}80%{transform:translateX(3px);}}'
  + '.cm-col.is-shake{animation:cmShake .45s 1;} @keyframes cmShake{20%{transform:translateX(-5px);}40%{transform:translateX(5px);}60%{transform:translateX(-3px);}80%{transform:translateX(3px);}}'
  + '.cm-col.is-bob .cm-blocks g{animation:cmBob .9s ease-in-out 2;} .cm-wrap.is-fast .cm-col.is-bob .cm-blocks g{animation:none;} @keyframes cmBob{40%{transform:translateY(-5px);}}'
  + '.cm-glyph{display:block;}'
  + '.cm-seat{position:relative;display:flex;align-items:center;justify-content:center;flex:0 0 auto;border:0;padding:0;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 2.5px #146B5E;box-sizing:border-box;background-image:radial-gradient(circle,transparent 55%,rgba(20,107,94,.06) 56%);}'
  + '.cm-seat:not(.is-capped){box-shadow:none;border:3px dashed #7FA8A0;background:#FFFDF6;} button.cm-seat{cursor:pointer;} .cm-seat.is-active{border-color:#F2784B;box-shadow:0 0 0 4px rgba(242,120,75,.25);}'
  + '.cm-col.is-bare .cm-seat{animation:cmPulse 1s ease-in-out 2;} .cm-wrap.is-fast .cm-col.is-bare .cm-seat{animation:none;} @keyframes cmPulse{50%{transform:scale(1.08);}}'
  + '.cm-ghostcap{font-family:' + H + ';font-weight:800;color:#2E9C88;opacity:.55;}'
  + '.cm-cap{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:radial-gradient(circle at 38% 32%,#FF9C72,#F2784B 55%,#D9603A);box-shadow:0 0 0 3px #fff,0 0 0 5px #C4522F,0 3px 4px rgba(47,42,59,.3);font-family:' + H + ';font-weight:800;color:#fff;line-height:1;}'
  + '.cm-cap::before{content:"";position:absolute;inset:-5px;border-radius:50%;background:repeating-conic-gradient(#C4522F 0 6deg,transparent 6deg 12deg);-webkit-mask:radial-gradient(circle,transparent 68%,#000 69%);mask:radial-gradient(circle,transparent 68%,#000 69%);}'
  + '.cm-capd{position:relative;text-shadow:0 1px 0 rgba(0,0,0,.25);}'
  + '.cm-cap.is-drop{animation:cmDrop .32s ease-out 1;} .cm-wrap.is-fast .cm-cap.is-drop{animation:none;} @keyframes cmDrop{0%{transform:translateY(-22px) rotate(-90deg);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.cm-cap.is-lit{animation:cmLit .5s ease-out 1;} .cm-col-t .cm-cap.is-lit{animation-delay:.15s;} .cm-col-o .cm-cap.is-lit{animation-delay:.3s;} .cm-wrap.is-fast .cm-cap.is-lit{animation:none;} @keyframes cmLit{40%{transform:scale(1.15);filter:brightness(1.25);}}'
  + '.cm-cap.is-diff{box-shadow:0 0 0 3px #fff,0 0 0 6px #2E9C88;}'
  + '.cm-area{position:relative;display:flex;align-items:flex-end;justify-content:center;border:0;padding:0;background:transparent;border-radius:8px;} button.cm-area{cursor:pointer;} button.cm-area:disabled{cursor:default;}'
  + '.cm-area.is-landed .cm-blocks{animation:cmLand .26s ease-out 1;} .cm-wrap.is-fast .cm-area.is-landed .cm-blocks{animation:none;} @keyframes cmLand{0%{transform:translateY(-6px);}}'
  + '.cm-blocks{display:block;overflow:visible;}'
  + '.cm-flatbg{fill:#2E9C88;stroke:#2F2A3B;stroke-width:1.5;} .cm-rodbg{fill:#F2784B;stroke:#2F2A3B;stroke-width:1.2;} .cm-cubebg{fill:#F2B33D;stroke:#2F2A3B;stroke-width:1.2;}'
  + '.cm-grid{stroke:rgba(255,255,255,.45);stroke-width:.8;fill:none;}'
  + '.is-ghost .cm-flatbg,.is-ghost .cm-rodbg,.is-ghost .cm-cubebg{fill:rgba(255,255,255,.4);stroke:#F2784B;stroke-width:2;stroke-dasharray:4 3;}'
  + '.is-extra .cm-flatbg,.is-extra .cm-rodbg,.is-extra .cm-cubebg{opacity:.45;} .cm-cross{stroke:#C4522F;stroke-width:3;stroke-linecap:round;fill:none;}'
  + '.cm-numdot{fill:#fff;stroke:#2F2A3B;stroke-width:1.2;} .cm-numtxt{font-family:' + H + ';font-weight:800;fill:' + INK + ';}'
  + '.cm-tenghost{position:absolute;left:50%;bottom:0;transform:translateX(-50%);animation:cmGhost 1.3s ease-out 1 forwards;pointer-events:none;} .cm-wrap.is-fast .cm-tenghost{animation:none;opacity:0;} @keyframes cmGhost{0%{opacity:0;}25%{opacity:1;}75%{opacity:1;}100%{opacity:0;}}'
  + '.cm-pm{display:flex;gap:6px;} .cm-plus,.cm-minus{width:48px;height:44px;border:0;border-radius:12px;font-family:' + H + ';font-weight:800;font-size:28px;line-height:1;cursor:pointer;padding:0;}'
  + '.cm-plus{background:#F2784B;color:#fff;box-shadow:0 3px 0 #C4522F;} .cm-minus{background:#FFFDF6;color:' + INK + ';box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;} .cm-minus:disabled{opacity:.4;cursor:default;}'
  + '.cm-wrap.is-cramp .cm-plus,.cm-wrap.is-cramp .cm-minus{width:44px;}'
  + '.cm-col-o .cm-pm{flex-direction:column;} .cm-wrap.is-wide .cm-col-o .cm-pm{flex-direction:row;}'
  + '.cm-lid{position:absolute;left:4px;right:4px;bottom:4px;height:62%;border-radius:12px;background:linear-gradient(180deg,#146B5E,#0E544A);box-shadow:0 -3px 0 #0E4D44 inset,0 4px 10px rgba(47,42,59,.25);animation:cmLid .32s ease-out 1;transform-origin:top;} .cm-wrap.is-fast .cm-lid{animation:none;} @keyframes cmLid{0%{transform:scaleY(0);}100%{transform:none;}}'
  /* the side */
  + '.cm-ticket{display:flex;align-items:center;justify-content:center;min-width:132px;height:84px;padding:0 14px;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:46px;line-height:1;color:' + INK + ';box-sizing:border-box;}'
  + '.cm-ticket::before,.cm-ticket::after{content:"";position:absolute;}'
  + '.cm-ticket.is-drag{cursor:grab;touch-action:none;} .cm-ticket.is-lifted{opacity:.35;} .cm-ticket.is-out{background:#E6F3EE;box-shadow:inset 0 0 0 3px #2E9C88;animation:cmOut .45s ease-out 1;} .cm-wrap.is-fast .cm-ticket.is-out{animation:none;} @keyframes cmOut{0%{transform:translateX(-30px);opacity:0;}}'
  + '.cm-wrap.is-narrow .cm-ticket{height:64px;font-size:38px;min-width:110px;}'
  + '.cm-delivery{display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px;border-radius:14px;background:#F3EBDD;box-shadow:inset 0 0 0 2px #CDBFA4;min-width:120px;min-height:80px;box-sizing:border-box;}'
  + '.cm-wrap.is-narrow .cm-delivery{flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:flex-end;width:100%;min-height:60px;}'
  + '.cm-delivery.is-empty{opacity:.55;}'
  + '.cm-pile{display:flex;align-items:center;justify-content:center;min-width:48px;min-height:48px;padding:6px;border:0;border-radius:10px;background:rgba(255,255,255,.7);box-shadow:0 2px 0 #CDBFA4;cursor:pointer;} .cm-pile svg{display:block;overflow:visible;}'
  /* the trays */
  + '.cm-trays{display:flex;flex-direction:column;gap:10px;max-width:100%;}'
  + '.cm-tray{position:relative;display:flex;align-items:center;justify-content:flex-start;gap:12px;width:100%;min-height:64px;padding:10px 14px;border:0;border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #CDBFA4;cursor:pointer;box-sizing:border-box;transition:transform .15s;}'
  + '.cm-tray svg{display:block;overflow:visible;flex:0 0 auto;} .cm-tray.is-chosen{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #146B5E,0 6px 0 rgba(20,107,94,.18);} .cm-tray.is-wrong{box-shadow:inset 0 0 0 3px #F2784B;} .cm-tray.is-right{background:#E6F3EE;box-shadow:inset 0 0 0 3px #2E9C88;} .cm-tray:disabled{cursor:default;}'
  + '.cm-group.is-glow .cm-flatbg,.cm-group.is-glow .cm-rodbg,.cm-group.is-glow .cm-cubebg{stroke:#2E9C88;stroke-width:3;}'
  + '.cm-traycaps{display:flex;gap:10px;margin-left:auto;padding-right:4px;}'
  + '.cm-trayticket{position:absolute;right:10px;top:-14px;padding:2px 10px;border-radius:8px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;}'
  + '.cm-ghost{position:fixed;z-index:50;pointer-events:none;opacity:.92;transform:scale(1.08);}'
  /* the rack */
  + '.cm-rack{display:grid;grid-template-columns:repeat(10,minmax(44px,1fr));gap:6px;max-width:640px;width:100%;margin:0 auto;} .cm-wrap.is-narrow .cm-rack{grid-template-columns:repeat(5,minmax(44px,1fr));}'
  + '.cm-rackbtn{display:flex;align-items:center;justify-content:center;height:52px;border:0;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:grab;padding:0;touch-action:none;} .cm-wrap.is-narrow .cm-rackbtn{height:48px;} .cm-rackbtn.is-lifted{opacity:.4;}'
  + '.cm-cap.is-rack{box-shadow:0 0 0 2px #fff,0 0 0 4px #C4522F;}'
  /* the bar */
  + '.cm-bar{display:flex;justify-content:center;} .cm-go{display:flex;align-items:center;justify-content:center;gap:8px;min-width:180px;height:48px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .cm-go svg{width:22px;height:22px;display:block;}'
  + '.cm-wrap.is-narrow .cm-go{height:44px;font-size:20px;}'
  + '.cm-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .cm-wrap.is-narrow .cm-note{font-size:16px;line-height:1.25;} .cm-note:empty{display:none;} .cm-note.is-hint{color:#9A3D1C;}'
  + '.cm-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.cm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.cm-wrap.is-cramp{gap:6px;} .cm-wrap.is-cramp .cm-work{gap:6px;} .cm-wrap.is-cramp .cm-col{padding:4px 4px 6px;gap:4px;} .cm-wrap.is-cramp .cm-rack{gap:4px;} .cm-wrap.is-cramp .cm-note{line-height:1.18;} .cm-wrap.is-cramp .cm-delivery{padding:4px;gap:4px;min-height:52px;} .cm-wrap.is-cramp .cm-pile{padding:2px;}';
  var st = document.createElement('style'); st.id = 'cm-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.CappedMatActivity = CappedMatActivity;
