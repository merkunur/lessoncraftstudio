/* =====================================================================
   skewer-plate-activity.js — ACTIVITY #138 of the one-by-one rebuild:
   "Build an Array" → THE SKEWER PLATE (2.OA.C.4; big arrays 3.OA.A.1 /
   3.OA.C.7; all 11 locales). Model: skewer-plate-core.js (SkewerPlateCore).
   Design: docs/activities-rebuild/designs/138-array.md
   ---------------------------------------------------------------------
   The invention: every row of the array is threaded on one skewer, so a
   row can only be lifted whole. Each lifted skewer lies in the rack with
   its box, and the rack reads "4 + 4 + 4" — the repeated addition made
   of kebabs. The skewer pot turns the sticks the other way (rows ↔
   columns) while no picture moves. Build: grow the plate for a sum.
   Find: pick the plate that is r rows of c. Big arrays: tiles to 10 × 10.
   No timer, no score.
   Test seams: window.SkewerPlateActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._lift / ._back /
   ._pot / ._focus / ._type / ._del / ._step / ._pick / ._check / .FAST / .OK_MS.
   ===================================================================== */
var SkewerPlateActivity = {
  id: 'skewer-plate',
  /* the drawn apparatus (the hierarchy gate): the plate, its skewers, the rack, the find plates */
  apparatusClasses: ['sp-art'],
  /*STRINGS-BEGIN*/strings: {
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    title: {"en":"Build an Array","de":"Ein Punktefeld legen","fr":"Construis une disposition rectangulaire","es":"Arma un arreglo rectangular","pt":"Monte uma disposição retangular","it":"Costruisci uno schieramento","nl":"Bouw een rooster","sv":"Bygg en rektangel","da":"Byg et rektangel","no":"Bygg et rektangel","fi":"Rakenna suorakulmio"},
    instruction: {"en":"Every row is on one skewer. Lift them out — every skewer holds the same number.","de":"Jede Reihe steckt auf einem Spieß. Zieh sie heraus – auf jedem Spieß stecken gleich viele.","fr":"Chaque rangée est sur une brochette. Retire-les : il y a autant de morceaux sur chaque brochette.","es":"Cada fila está en una brocheta. Sácalas: cada brocheta tiene la misma cantidad.","pt":"Cada fileira está num espetinho. Tire os espetinhos: cada um tem a mesma quantidade.","it":"Ogni riga è su uno spiedino. Toglili: ogni spiedino ne porta lo stesso numero.","nl":"Elke rij zit aan één spies. Haal ze eraf: aan elke spies zitten er evenveel.","sv":"Varje rad sitter på ett grillspett. Lyft av dem – på varje spett sitter lika många.","da":"Hver række sidder på ét grillspyd. Løft dem af – på hvert spyd sidder der lige mange.","no":"Hver rad sitter på ett grillspyd. Løft dem av – på hvert spyd sitter det like mange.","fi":"Jokainen rivi on omassa vartaassaan. Nosta vartaat pois – jokaisessa vartaassa on yhtä monta."},
    tCount: {"en":"Lift out the skewers. Write the addition.","de":"Zieh die Spieße heraus. Schreib die Plusaufgabe auf.","fr":"Retire les brochettes. Écris l’addition.","es":"Saca las brochetas. Escribe la suma.","pt":"Tire os espetinhos. Escreva a adição.","it":"Togli gli spiedini. Scrivi l’addizione.","nl":"Haal de spiesen eraf. Schrijf de plussom op.","sv":"Lyft av spetten. Skriv additionen.","da":"Løft spydene af. Skriv plusstykket.","no":"Løft av spydene. Skriv addisjonen.","fi":"Nosta vartaat pois. Kirjoita yhteenlasku."},
    tBuild: {"en":"Make the plate for {sum}.","de":"Leg den Teller für {sum}.","fr":"Prépare l’assiette pour {sum}.","es":"Arma el plato para {sum}.","pt":"Monte o prato para {sum}.","it":"Prepara il piatto per {sum}.","nl":"Maak het bord voor {sum}.","sv":"Gör tallriken för {sum}.","da":"Lav tallerkenen til {sum}.","no":"Lag tallerkenen for {sum}.","fi":"Tee lautanen, joka sopii laskuun {sum}."},
    tFind: {"en":"Which plate is {r} rows of {c}?","de":"Welcher Teller hat {r} Reihen mit je {c}?","fr":"Quelle assiette a {r} rangées de {c} ?","es":"¿Qué plato tiene {r} filas de {c}?","pt":"Qual prato tem {r} fileiras de {c}?","it":"Quale piatto ha {r} righe da {c}?","nl":"Welk bord heeft {r} rijen van {c}?","sv":"Vilken tallrik har {r} rader med {c} i varje?","da":"Hvilken tallerken har {r} rækker med {c} i hver?","no":"Hvilken tallerken har {r} rader med {c} i hver?","fi":"Millä lautasella on {r} riviä, joissa kussakin on {c}?"},
    tBig: {"en":"How many in all? Lift the skewers to check.","de":"Wie viele sind es insgesamt? Zieh die Spieße heraus, um nachzuprüfen.","fr":"Combien en tout ? Retire les brochettes pour vérifier.","es":"¿Cuántos hay en total? Saca las brochetas para comprobar.","pt":"Quantos há no total? Tire os espetinhos para conferir.","it":"Quanti in tutto? Togli gli spiedini per controllare.","nl":"Hoeveel zijn het samen? Haal de spiesen eraf om te controleren.","sv":"Hur många är det sammanlagt? Lyft av spetten för att kolla.","da":"Hvor mange er der i alt? Løft spydene af for at tjekke.","no":"Hvor mange er det til sammen? Løft av spydene for å sjekke.","fi":"Kuinka monta on yhteensä? Nosta vartaat pois ja tarkista."},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setJob: {"en":"Job","de":"Aufgabe","fr":"Tâche","es":"Tarea","pt":"Tarefa","it":"Compito","nl":"Opdracht","sv":"Uppgift","da":"Opgave","no":"Oppgave","fi":"Tehtävä"},
    jCount: {"en":"Count","de":"Zählen","fr":"Compter","es":"Contar","pt":"Contar","it":"Contare","nl":"Tellen","sv":"Räkna","da":"Tælle","no":"Telle","fi":"Laske"},
    jBuild: {"en":"Build","de":"Legen","fr":"Construire","es":"Armar","pt":"Montar","it":"Costruire","nl":"Bouwen","sv":"Bygga","da":"Bygge","no":"Bygge","fi":"Rakenna"},
    jFind: {"en":"Find","de":"Finden","fr":"Trouver","es":"Encontrar","pt":"Encontrar","it":"Trovare","nl":"Zoeken","sv":"Hitta","da":"Finde","no":"Finne","fi":"Etsi"},
    setSize: {"en":"Size","de":"Größe","fr":"Taille","es":"Tamaño","pt":"Tamanho","it":"Grandezza","nl":"Grootte","sv":"Storlek","da":"Størrelse","no":"Størrelse","fi":"Koko"},
    zPics: {"en":"Up to 5 × 5","de":"Bis 5 · 5","fr":"Jusqu’à 5 × 5","es":"Hasta 5 × 5","pt":"Até 5 × 5","it":"Fino a 5 × 5","nl":"Tot 5 × 5","sv":"Upp till 5 · 5","da":"Op til 5 · 5","no":"Opp til 5 · 5","fi":"Enintään 5 · 5"},
    zBig: {"en":"Big arrays","de":"Große Punktefelder","fr":"Grands quadrillages","es":"Arreglos grandes","pt":"Disposições retangulares grandes","it":"Schieramenti grandi","nl":"Grote roosters","sv":"Stora rektanglar","da":"Store rektangler","no":"Store rektangler","fi":"Isot suorakulmiot"},
    hLift: {"en":"Lift out the skewers first.","de":"Zieh zuerst die Spieße heraus.","fr":"Retire d’abord les brochettes.","es":"Primero saca las brochetas.","pt":"Primeiro tire os espetinhos.","it":"Prima togli gli spiedini.","nl":"Haal eerst de spiesen eraf.","sv":"Lyft av spetten först.","da":"Løft spydene af først.","no":"Løft av spydene først.","fi":"Nosta ensin vartaat pois."},
    hPartly: {"en":"Keep going — every skewer comes out.","de":"Weiter so – jeder Spieß kommt heraus.","fr":"Continue : toutes les brochettes sortent.","es":"Sigue: todas las brochetas salen.","pt":"Continue: todos os espetinhos saem.","it":"Continua: tutti gli spiedini vanno tolti.","nl":"Ga door: elke spies gaat eraf.","sv":"Fortsätt – alla spett ska lyftas av.","da":"Bliv ved – alle spyd skal løftes af.","no":"Fortsett – alle spydene skal løftes av.","fi":"Jatka – kaikki vartaat nostetaan pois."},
    hBoxes: {"en":"Fill every box.","de":"Füll jedes Kästchen aus.","fr":"Remplis chaque case.","es":"Llena cada casilla.","pt":"Preencha todos os quadrinhos.","it":"Riempi ogni casella.","nl":"Vul elk vakje in.","sv":"Fyll i varje ruta.","da":"Udfyld hver boks.","no":"Fyll ut hver rute.","fi":"Täytä jokainen ruutu."},
    hBuild: {"en":"Use the buttons to add rows and columns.","de":"Leg mit den Knöpfen Reihen und Spalten dazu.","fr":"Utilise les boutons pour ajouter des rangées et des colonnes.","es":"Usa los botones para agregar filas y columnas.","pt":"Use os botões para pôr fileiras e colunas.","it":"Usa i pulsanti per aggiungere righe e colonne.","nl":"Gebruik de knoppen om rijen en kolommen toe te voegen.","sv":"Använd knapparna för att lägga till rader och kolumner.","da":"Brug knapperne til at tilføje rækker og kolonner.","no":"Bruk knappene for å legge til rader og kolonner.","fi":"Lisää rivejä ja sarakkeita napeilla."},
    hPick: {"en":"Tap a plate.","de":"Tippe einen Teller an.","fr":"Touche une assiette.","es":"Toca un plato.","pt":"Toque em um prato.","it":"Tocca un piatto.","nl":"Tik op een bord.","sv":"Tryck på en tallrik.","da":"Tryk på en tallerken.","no":"Trykk på en tallerken.","fi":"Napauta lautasta."},
    missUnequal: {"en":"Every skewer holds the same number. Count this one again.","de":"Auf jedem Spieß stecken gleich viele. Zähl diesen noch einmal.","fr":"Il y a autant de morceaux sur chaque brochette. Recompte celle-ci.","es":"Cada brocheta tiene la misma cantidad. Vuelve a contar esta.","pt":"Cada espetinho tem a mesma quantidade. Conte este de novo.","it":"Ogni spiedino ne porta lo stesso numero. Riconta questo.","nl":"Aan elke spies zitten er evenveel. Tel deze nog eens.","sv":"På varje spett sitter lika många. Räkna det här igen.","da":"På hvert spyd sidder der lige mange. Tæl dette igen.","no":"På hvert spyd sitter det like mange. Tell dette igjen.","fi":"Jokaisessa vartaassa on yhtä monta. Laske tämä uudelleen."},
    missUnequal2: {"en":"Each piece on this skewer shows its number now.","de":"Jedes Stück auf diesem Spieß zeigt jetzt seine Zahl.","fr":"Chaque morceau de cette brochette montre maintenant son numéro.","es":"Cada pieza de esta brocheta muestra ahora su número.","pt":"Cada pedaço deste espetinho mostra agora o seu número.","it":"Ogni pezzo di questo spiedino ora mostra il suo numero.","nl":"Elk stukje aan deze spies laat nu zijn nummer zien.","sv":"Varje bit på det här spettet visar nu sitt nummer.","da":"Hvert stykke på dette spyd viser nu sit nummer.","no":"Hver bit på dette spydet viser nå nummeret sitt.","fi":"Jokainen tämän vartaan pala näyttää nyt numeronsa."},
    missEdges: {"en":"You added the rows and the columns. Count every piece — the middle ones too.","de":"Du hast Reihen und Spalten addiert. Jedes Stück zählt – auch die in der Mitte.","fr":"Tu as additionné les rangées et les colonnes. Chaque morceau compte, aussi ceux du milieu.","es":"Sumaste las filas y las columnas. Cuenta cada pieza, también las del centro.","pt":"Você somou as fileiras e as colunas. Conte cada pedaço, também os do meio.","it":"Hai sommato le righe e le colonne. Conta ogni pezzo, anche quelli in mezzo.","nl":"Je hebt de rijen en de kolommen opgeteld. Tel elk stukje, ook die in het midden.","sv":"Du lade ihop raderna och kolumnerna. Räkna varje bit – även de i mitten.","da":"Du lagde rækkerne og kolonnerne sammen. Tæl hvert stykke – også dem i midten.","no":"Du la sammen radene og kolonnene. Tell hver bit – også de i midten.","fi":"Laskit rivit ja sarakkeet yhteen. Laske jokainen pala – myös keskellä olevat."},
    missTotal: {"en":"Add one skewer at a time.","de":"Rechne einen Spieß nach dem anderen dazu.","fr":"Ajoute une brochette à la fois.","es":"Suma una brocheta a la vez.","pt":"Some um espetinho de cada vez.","it":"Aggiungi uno spiedino alla volta.","nl":"Tel er één spies tegelijk bij.","sv":"Lägg till ett spett i taget.","da":"Læg ét spyd til ad gangen.","no":"Legg til ett spyd om gangen.","fi":"Lisää yksi varras kerrallaan."},
    missTotal2: {"en":"Count on skewer by skewer.","de":"Zähl Spieß für Spieß weiter.","fr":"Continue à compter brochette par brochette.","es":"Sigue contando brocheta por brocheta.","pt":"Continue contando espetinho por espetinho.","it":"Continua a contare spiedino per spiedino.","nl":"Tel verder, spies voor spies.","sv":"Räkna vidare spett för spett.","da":"Tæl videre spyd for spyd.","no":"Tell videre spyd for spyd.","fi":"Laske eteenpäin varras kerrallaan."},
    missShape: {"en":"Your skewers hold {k} each. The sum wants skewers of {c}.","de":"Auf deinen Spießen stecken je {k}. Die Aufgabe will Spieße mit je {c}.","fr":"Tes brochettes portent {k} chacune. Le calcul veut des brochettes de {c}.","es":"Tus brochetas tienen {k} cada una. La suma pide brochetas de {c}.","pt":"Seus espetinhos têm {k} cada um. A conta pede espetinhos de {c}.","it":"I tuoi spiedini ne portano {k} ciascuno. Il calcolo vuole spiedini da {c}.","nl":"Aan jouw spiesen zitten er elk {k}. De som vraagt spiesen van {c}.","sv":"Dina spett har {k} var. Additionen vill ha spett med {c}.","da":"Dine spyd har {k} hver. Regnestykket vil have spyd med {c}.","no":"Spydene dine har {k} hver. Regnestykket vil ha spyd med {c}.","fi":"Vartaissasi on kussakin {k}. Laskuun tarvitaan vartaita, joissa on {c}."},
    missTurned: {"en":"Same total, but the skewers go the wrong way. Each skewer must hold {c}.","de":"Gleich viele, aber die Spieße liegen falsch herum. Auf jedem Spieß müssen {c} stecken.","fr":"Le même total, mais les brochettes sont dans l’autre sens. Chaque brochette doit porter {c}.","es":"El mismo total, pero las brochetas van al revés. Cada brocheta debe tener {c}.","pt":"O mesmo total, mas os espetinhos estão ao contrário. Cada espetinho precisa ter {c}.","it":"Lo stesso totale, ma gli spiedini vanno dall’altra parte. Ogni spiedino deve portarne {c}.","nl":"Evenveel, maar de spiesen liggen de verkeerde kant op. Aan elke spies moeten er {c} zitten.","sv":"Lika många, men spetten ligger åt fel håll. Varje spett ska ha {c}.","da":"Lige mange, men spydene ligger den forkerte vej. Hvert spyd skal have {c}.","no":"Like mange, men spydene ligger feil vei. Hvert spyd skal ha {c}.","fi":"Yhtä monta, mutta vartaat ovat väärin päin. Jokaisessa vartaassa pitää olla {c}."},
    missShape2: {"en":"The outline shows the plate for this sum.","de":"Der Umriss zeigt den Teller für diese Aufgabe.","fr":"Le contour montre l’assiette pour ce calcul.","es":"El contorno muestra el plato para esta suma.","pt":"O contorno mostra o prato para esta conta.","it":"Il contorno mostra il piatto per questo calcolo.","nl":"De omtrek laat het bord voor deze som zien.","sv":"Konturen visar tallriken för den här additionen.","da":"Omridset viser tallerkenen til dette regnestykke.","no":"Omrisset viser tallerkenen for dette regnestykket.","fi":"Ääriviiva näyttää tämän laskun lautasen."},
    missFind: {"en":"This plate has {r} rows of {c}.","de":"Dieser Teller hat {r} Reihen mit je {c}.","fr":"Cette assiette a {r} rangées de {c}.","es":"Este plato tiene {r} filas de {c}.","pt":"Este prato tem {r} fileiras de {c}.","it":"Questo piatto ha {r} righe da {c}.","nl":"Dit bord heeft {r} rijen van {c}.","sv":"Den här tallriken har {r} rader med {c} i varje.","da":"Denne tallerken har {r} rækker med {c} i hver.","no":"Denne tallerkenen har {r} rader med {c} i hver.","fi":"Tällä lautasella on {r} riviä, joissa kussakin {c}."},
    missFind2: {"en":"Every plate shows its rows and columns now.","de":"Jeder Teller zeigt jetzt seine Reihen und Spalten.","fr":"Chaque assiette montre maintenant ses rangées et ses colonnes.","es":"Cada plato muestra ahora sus filas y columnas.","pt":"Cada prato mostra agora as fileiras e as colunas.","it":"Ogni piatto ora mostra le sue righe e colonne.","nl":"Elk bord laat nu zijn rijen en kolommen zien.","sv":"Varje tallrik visar nu sina rader och kolumner.","da":"Hver tallerken viser nu sine rækker og kolonner.","no":"Hver tallerken viser nå radene og kolonnene sine.","fi":"Jokainen lautanen näyttää nyt rivinsä ja sarakkeensa."},
    missBig: {"en":"{r} rows of {c}. Count the skewers of {c}.","de":"{r} Reihen mit je {c}. Zähl die Spieße mit je {c}.","fr":"{r} rangées de {c}. Compte les brochettes de {c}.","es":"{r} filas de {c}. Cuenta las brochetas de {c}.","pt":"{r} fileiras de {c}. Conte os espetinhos de {c}.","it":"{r} righe da {c}. Conta gli spiedini da {c}.","nl":"{r} rijen van {c}. Tel de spiesen van {c}.","sv":"{r} rader med {c} i varje. Räkna spetten med {c}.","da":"{r} rækker med {c} i hver. Tæl spydene med {c}.","no":"{r} rader med {c} i hver. Tell spydene med {c}.","fi":"{r} riviä, joissa kussakin {c}. Laske vartaat, joissa on {c}."},
    ok: {"en":"{r} rows of {c}: {sum} = {t}. {r} × {c} = {t}.","de":"{r} Reihen mit je {c}: {sum} = {t}. {r} · {c} = {t}.","fr":"{r} rangées de {c} : {sum} = {t}. {r} × {c} = {t}.","es":"{r} filas de {c}: {sum} = {t}. {r} × {c} = {t}.","pt":"{r} fileiras de {c}: {sum} = {t}. {r} × {c} = {t}.","it":"{r} righe da {c}: {sum} = {t}. {r} × {c} = {t}.","nl":"{r} rijen van {c}: {sum} = {t}. {r} × {c} = {t}.","sv":"{r} rader med {c} i varje: {sum} = {t}. {r} · {c} = {t}.","da":"{r} rækker med {c} i hver: {sum} = {t}. {r} · {c} = {t}.","no":"{r} rader med {c} i hver: {sum} = {t}. {r} · {c} = {t}.","fi":"{r} riviä, joissa kussakin {c}: {sum} = {t}. {r} · {c} = {t}."},
    okCols: {"en":"{c} columns of {r}: {sum} = {t}. {c} × {r} = {t}.","de":"{c} Spalten mit je {r}: {sum} = {t}. {c} · {r} = {t}.","fr":"{c} colonnes de {r} : {sum} = {t}. {c} × {r} = {t}.","es":"{c} columnas de {r}: {sum} = {t}. {c} × {r} = {t}.","pt":"{c} colunas de {r}: {sum} = {t}. {c} × {r} = {t}.","it":"{c} colonne da {r}: {sum} = {t}. {c} × {r} = {t}.","nl":"{c} kolommen van {r}: {sum} = {t}. {c} × {r} = {t}.","sv":"{c} kolumner med {r} i varje: {sum} = {t}. {c} · {r} = {t}.","da":"{c} kolonner med {r} i hver: {sum} = {t}. {c} · {r} = {t}.","no":"{c} kolonner med {r} i hver: {sum} = {t}. {c} · {r} = {t}.","fi":"{c} saraketta, joissa kussakin {r}: {sum} = {t}. {c} · {r} = {t}."},
    okBig: {"en":"{r} × {c} = {t}.","de":"{r} · {c} = {t}.","fr":"{r} × {c} = {t}.","es":"{r} × {c} = {t}.","pt":"{r} × {c} = {t}.","it":"{r} × {c} = {t}.","nl":"{r} × {c} = {t}.","sv":"{r} · {c} = {t}.","da":"{r} · {c} = {t}.","no":"{r} · {c} = {t}.","fi":"{r} · {c} = {t}."},
    aLift: {"en":"Skewer {i}: lift out","de":"Spieß {i}: herausziehen","fr":"Brochette {i} : retirer","es":"Brocheta {i}: sacar","pt":"Espetinho {i}: tirar","it":"Spiedino {i}: togliere","nl":"Spies {i}: eraf halen","sv":"Spett {i}: lyft av","da":"Spyd {i}: løft af","no":"Spyd {i}: løft av","fi":"Varras {i}: nosta pois"},
    aBack: {"en":"Skewer {i}: put back","de":"Spieß {i}: zurückstecken","fr":"Brochette {i} : remettre","es":"Brocheta {i}: regresar","pt":"Espetinho {i}: pôr de volta","it":"Spiedino {i}: rimettere","nl":"Spies {i}: terugleggen","sv":"Spett {i}: lägg tillbaka","da":"Spyd {i}: læg tilbage","no":"Spyd {i}: legg tilbake","fi":"Varras {i}: laita takaisin"},
    aPot: {"en":"Skewer the other way","de":"Andersherum aufspießen","fr":"Embrocher dans l’autre sens","es":"Ensartar al revés","pt":"Espetar ao contrário","it":"Infilzare dall’altra parte","nl":"Andersom aan de spies rijgen","sv":"Träda på spetten åt andra hållet","da":"Sæt stykkerne på spyd den anden vej","no":"Tre bitene på spyd andre veien","fi":"Pujota vartaat toisin päin"},
    aBox: {"en":"Skewer {i}","de":"Spieß {i}","fr":"Brochette {i}","es":"Brocheta {i}","pt":"Espetinho {i}","it":"Spiedino {i}","nl":"Spies {i}","sv":"Spett {i}","da":"Spyd {i}","no":"Spyd {i}","fi":"Varras {i}"},
    aTotal: {"en":"How many in all","de":"Wie viele insgesamt","fr":"Combien en tout","es":"Cuántos en total","pt":"Quantos no total","it":"Quanti in tutto","nl":"Hoeveel samen","sv":"Hur många sammanlagt","da":"Hvor mange i alt","no":"Hvor mange til sammen","fi":"Kuinka monta yhteensä"},
    aPlate: {"en":"Plate {i}","de":"Teller {i}","fr":"Assiette {i}","es":"Plato {i}","pt":"Prato {i}","it":"Piatto {i}","nl":"Bord {i}","sv":"Tallrik {i}","da":"Tallerken {i}","no":"Tallerken {i}","fi":"Lautanen {i}"},
    aRowUp: {"en":"One more row","de":"Eine Reihe mehr","fr":"Une rangée de plus","es":"Una fila más","pt":"Mais uma fileira","it":"Una riga in più","nl":"Eén rij meer","sv":"En rad till","da":"En række mere","no":"En rad til","fi":"Yksi rivi lisää"},
    aRowDown: {"en":"One row fewer","de":"Eine Reihe weniger","fr":"Une rangée de moins","es":"Una fila menos","pt":"Uma fileira a menos","it":"Una riga in meno","nl":"Eén rij minder","sv":"En rad färre","da":"En række færre","no":"En rad færre","fi":"Yksi rivi vähemmän"},
    aColUp: {"en":"One more column","de":"Eine Spalte mehr","fr":"Une colonne de plus","es":"Una columna más","pt":"Mais uma coluna","it":"Una colonna in più","nl":"Eén kolom meer","sv":"En kolumn till","da":"En kolonne mere","no":"En kolonne til","fi":"Yksi sarake lisää"},
    aColDown: {"en":"One column fewer","de":"Eine Spalte weniger","fr":"Une colonne de moins","es":"Una columna menos","pt":"Uma coluna a menos","it":"Una colonna in meno","nl":"Eén kolom minder","sv":"En kolumn färre","da":"En kolonne færre","no":"En kolonne færre","fi":"Yksi sarake vähemmän"},
    aDel: {"en":"Delete","de":"Löschen","fr":"Effacer","es":"Borrar","pt":"Apagar","it":"Cancella","nl":"Wissen","sv":"Sudda","da":"Slet","no":"Slett","fi":"Poista"},
  },/*STRINGS-END*/

  defaults: { job: 'count', size: 'pics' },
  settings: [
    { key: 'job', type: 'choice', labelKey: 'setJob', options: [{ value: 'count', labelKey: 'jCount' }, { value: 'build', labelKey: 'jBuild' }, { value: 'find', labelKey: 'jFind' }] },
    { key: 'size', type: 'choice', labelKey: 'setSize', options: [{ value: 'pics', labelKey: 'zPics' }, { value: 'big', labelKey: 'zBig' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {};
    injectSkewerCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._mode()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _mode: function () { return SkewerPlateCore.modeOf(this._setting('job'), this._setting('size')); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },
  _times: function () { return /^(de|sv|da|no|fi)$/.test(this._loc()) ? '·' : '×'; },
  _ensurePool: function () {
    var k = this._mode();
    if (!this._pool || this._poolKey !== k) { this._pool = SkewerPlateCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SkewerPlateCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._mode(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'skewer.' + this._mode() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st; if (!st) return '';
    if (st.mode === 'build') return this._t('tBuild', { sum: SkewerPlateCore.sumText(st.r, st.c) });
    if (st.mode === 'find') return this._t('tFind', { r: st.f.t[0], c: st.f.t[1] });
    if (st.mode === 'big') return this._t('tBig');
    return this._t('tCount');
  },
  _setPrompt: function () { if (this.st && this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers();
    this.st = SkewerPlateCore.newState(this._mode(), k);
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
  _dims: function () { var W = this._width(), B = SkewerPlateCore.band(W); return { W: W, wide: B.wide, cramp: B.cramp }; },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sp-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="sp-main"></div><p class="sp-note" aria-live="polite"></p><div class="sp-pad"></div><p class="sp-sr" aria-live="polite"></p>';
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
  _paint_: function () {
    var st = this.st, D = this._dims(), v = this._view, main = this._qs('.sp-main'), pad = this._qs('.sp-pad');
    this._wrap.className = 'sp-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' m-' + st.mode;
    main.innerHTML = ''; pad.innerHTML = '';
    if (st.mode === 'find') this._paintFind(main, D); else if (st.mode === 'build') this._paintBuild(main, D); else this._paintCount(main, D);
    this._paintPad(pad, D);
    var note = this._qs('.sp-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'sp-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'sp-note is-hint'; }
    else { note.textContent = ''; note.className = 'sp-note'; }
    this._setPrompt();
  },
  /* the cell size: full-size library pictures; the rack beside the plate on wide screens */
  /* the rack goes under the plate on wide screens when, beside it, the pictures would fall under the floor */
  _stacked: function (D, st) { return D.wide && st && (st.mode === 'count') && Math.floor((D.W - 198) / st.c) < 102; },
  _cell: function (D, r, c, big, stacked) {
    /* wide: the rack (150) and the plate's own rim beside it (or under it); phones: the full width */
    var avail = D.wide ? (stacked ? D.W - 34 : D.W - 150 - 14 - 34) : D.W - 6;
    /* phones: the plate's height is capped so the keys and Check stay above the fold */
    var availH = D.wide ? 9999 : D.cramp ? 236 : 330;
    if (big) return Math.max(20, Math.min(D.wide ? 44 : 30, Math.floor(avail / c), Math.floor((D.cramp ? 200 : availH) / r)));
    return Math.max(40, Math.min(D.wide ? 104 : 74, Math.floor(avail / c), Math.floor(availH / r)));
  },

  /* ---------- the plate: count and big arrays ---------- */
  _plateEl: function (D, r, c, opt) {
    var st = this.st, self = this, big = opt.big, cell = opt.cellOverride || this._cell(D, r, c, big, this._stacked(D, st)), gap = big ? 2 : (D.wide ? 6 : 0);
    /* phones: once every skewer is in the rack the plate holds only outlines, so it shrinks */
    if (!D.wide && opt.lifted && opt.lifted.length && opt.lifted.length === (opt.dir === 'cols' ? c : r) && !opt.glow) cell = Math.min(cell, big ? 16 : D.cramp ? 24 : 34);
    var pic = cell - gap;
    var plate = this.api.el('div', 'sp-plate sp-art' + (opt.glow ? ' is-glow' : '') + (opt.dir === 'cols' ? ' by-cols' : ' by-rows'));
    plate.style.width = (c * cell) + 'px'; plate.style.height = (r * cell) + 'px';
    var lifted = opt.lifted || [], dir = opt.dir || 'rows', skew = dir === 'rows' ? r : c;
    var edges = opt.edges, ghost = opt.ghost;
    var html = '';
    /* the skewers behind the pictures (only those still on the plate) */
    for (var s = 0; s < skew; s++) {
      if (lifted.indexOf(s) >= 0) continue;
      if (dir === 'rows') html += '<span class="sp-stick" style="left:-12px;width:' + (c * cell + 20) + 'px;top:' + (s * cell + cell / 2 - 3) + 'px;height:6px"></span>';
      else html += '<span class="sp-stick" style="top:-12px;height:' + (r * cell + 20) + 'px;left:' + (s * cell + cell / 2 - 3) + 'px;width:6px"></span>';
    }
    for (var i = 0; i < r; i++) for (var j = 0; j < c; j++) {
      var sk = dir === 'rows' ? i : j, gone = lifted.indexOf(sk) >= 0, x = j * cell + gap / 2, y = i * cell + gap / 2;
      var edge = edges && (dir === 'rows' ? (i === 0 || j === c - 1) : (j === 0 || i === r - 1));
      var cls = (gone ? ' is-gone' : '') + (edges ? (edge ? ' is-edge' : ' is-middle') : '');
      if (big || !opt.pic) html += '<span class="sp-tile' + cls + '" style="left:' + x + 'px;top:' + y + 'px;width:' + pic + 'px;height:' + pic + 'px"></span>';
      else if (gone) html += '<span class="sp-hole' + cls + '" style="left:' + x + 'px;top:' + y + 'px;width:' + pic + 'px;height:' + pic + 'px"></span>';
      else html += '<img class="sp-pic' + cls + '" data-pic="1" src="/image-library-webp/themes/' + opt.pic.split('/').map(encodeURIComponent).join('/') + '@2x.webp" alt="" draggable="false" style="left:' + x + 'px;top:' + y + 'px;width:' + pic + 'px;height:' + pic + 'px">';
    }
    if (ghost) html += '<span class="sp-ghost" style="left:0;top:0;width:' + (ghost[1] * cell) + 'px;height:' + (ghost[0] * cell) + 'px"></span>';
    plate.innerHTML = html;
    /* each skewer still on the plate is one tap target: the whole row (or column), its bead at the end */
    if (opt.tap && !(big && !D.wide)) for (var k = 0; k < skew; k++) {
      if (lifted.indexOf(k) >= 0) continue;
      var b = this._btn('sp-skew', 'skew-' + k, this._t('aLift', { i: k + 1 }), '<span class="sp-bead" aria-hidden="true"></span>');
      if (dir === 'rows') b.style.cssText = 'left:-14px;top:' + (k * cell) + 'px;width:' + (c * cell + 14) + 'px;height:' + cell + 'px';
      else b.style.cssText = 'top:-14px;left:' + (k * cell) + 'px;height:' + (r * cell + 14) + 'px;width:' + cell + 'px';
      b.disabled = st.done;
      (function (n) { b.addEventListener('click', function () { self._lift(n); }); })(k);
      plate.appendChild(b);
    }
    return plate;
  },
  _paintCount: function (main, D) {
    var st = this.st, v = this._view, self = this, C = SkewerPlateCore, big = st.mode === 'big';
    var help = st.last && st.misses > 0 && !st.done ? st.last.result : null;
    var box = this.api.el('div', 'sp-platebox');
    var pot = this._btn('sp-pot sp-art', 'pot', this._t('aPot'), '<svg viewBox="0 0 56 56" aria-hidden="true"><rect class="sp-jar" x="12" y="20" width="32" height="30" rx="6"/><line class="sp-pin" x1="20" y1="22" x2="16" y2="4"/><line class="sp-pin" x1="28" y1="22" x2="28" y2="2"/><line class="sp-pin" x1="36" y1="22" x2="40" y2="4"/><path class="sp-turn" d="M8 40 a20 20 0 0 1 8 -14"/></svg>');
    pot.disabled = st.done;
    pot.addEventListener('click', function () { self._pot(); });
    if (D.wide) box.appendChild(pot);
    box.appendChild(this._plateEl(D, st.r, st.c, { big: big, pic: st.pic, lifted: st.lifted, dir: st.dir, tap: true, glow: st.done, edges: help === 'edges' }));
    main.appendChild(box);
    var rack = this._rackEl(D, help);
    /* phones: the pot sits in the rack row while the rack is empty (turning the sticks puts every skewer back anyway) */
    if (!D.wide && !st.lifted.length) rack.insertBefore(pot, rack.firstChild);
    main.classList.toggle('is-stacked', this._stacked(D, st));
    main.appendChild(rack);
  },
  /* the rack: every lifted skewer as a stick with tokens, its box, + between, = and the total */
  _rackEl: function (D, help) {
    var st = this.st, self = this, C = SkewerPlateCore, big = st.mode === 'big', hold = C.holds(st);
    var rack = this.api.el('div', 'sp-rack sp-art' + (big ? ' is-big' : '') + (help === 'total' || help === 'big' ? ' is-line' : ''));
    var running = 0;
    st.lifted.forEach(function (s, q) {
      running += hold;
      var slot = self.api.el('div', 'sp-slot');
      var bad = help === 'unequal' && st.last.bad === s;
      var tok = ''; for (var t = 0; t < hold; t++) tok += '<span class="sp-tok">' + (bad && st.help ? (t + 1) : '') + '</span>';
      var stick;
      if (big) { stick = self.api.el('span', 'sp-rstick is-slim'); stick.setAttribute('aria-hidden', 'true'); stick.innerHTML = '<span class="sp-rline"></span>' + tok; }
      else {
        stick = self._btn('sp-rstick' + (bad ? ' is-bad' : ''), 'back-' + s, self._t('aBack', { i: s + 1 }), '<span class="sp-rline"></span>' + tok);
        stick.disabled = st.done;
        stick.addEventListener('click', function () { self._back(s); });
      }
      slot.appendChild(stick);
      if (!big) {
        if (q) slot.insertAdjacentHTML('afterbegin', '<span class="sp-plus" aria-hidden="true">+</span>');
        var bx = self._btn('sp-box' + (st.focus === 'k' + s && !st.done ? ' is-focus' : '') + (st.done ? ' is-ok' : ''), 'box-' + s, self._t('aBox', { i: s + 1 }), esc(st.boxes[s] || ''));
        bx.disabled = st.done;
        bx.addEventListener('click', function () { self._focus('k' + s); });
        slot.appendChild(bx);
      }
      if (st.help && (help === 'total' || help === 'big')) slot.insertAdjacentHTML('beforeend', '<span class="sp-run">' + running + '</span>');
      rack.appendChild(slot);
    });
    var tot = this.api.el('div', 'sp-totalrow');
    tot.innerHTML = big ? '<span class="sp-fact">' + st.r + ' ' + this._times() + ' ' + st.c + ' =</span>' : '<span class="sp-eqs">=</span>';
    var tb = this._btn('sp-box sp-total' + ((st.focus === 'total' || big) && !st.done ? ' is-focus' : '') + (st.done ? ' is-ok' : ''), 'total', this._t('aTotal'), esc(st.totalBox || ''));
    tb.disabled = st.done;
    tb.addEventListener('click', function () { self._focus('total'); });
    tot.appendChild(tb);
    rack.appendChild(tot);
    return rack;
  },

  /* ---------- build ---------- */
  _paintBuild: function (main, D) {
    var st = this.st, self = this, C = SkewerPlateCore, help = st.last && st.misses > 0 && !st.done ? st.last.result : null;
    var card = this.api.el('div', 'sp-order sp-art');
    card.innerHTML = '<span class="sp-ordsum">' + C.sumText(st.r, st.c) + '</span>' + (help === 'shape' || help === 'turned' ? '<span class="sp-ordyou">' + (st.b.r ? C.sumText(st.b.r, st.b.c) : '') + '</span>' : '');
    var area = this.api.el('div', 'sp-buildarea');
    var steps = this.api.el('div', 'sp-steps');
    [['r', 1, 'aRowUp', '▼'], ['r', -1, 'aRowDown', '▲'], ['c', 1, 'aColUp', '▶'], ['c', -1, 'aColDown', '◀']].forEach(function (s) {
      var dots = s[0] === 'r' ? '<circle cx="10" cy="14" r="5"/><circle cx="22" cy="14" r="5"/><circle cx="34" cy="14" r="5"/><line x1="4" y1="14" x2="40" y2="14"/>' : '<circle cx="14" cy="8" r="5"/><circle cx="14" cy="20" r="5"/><circle cx="14" cy="32" r="5"/><line x1="14" y1="2" x2="14" y2="38"/>';
      var sign = s[1] > 0 ? '<path class="sp-sign" d="M38 30 h12 M44 24 v12"/>' : '<path class="sp-sign" d="M38 30 h12"/>';
      var b = self._btn('sp-step sp-art', 'step-' + s[0] + (s[1] > 0 ? 'up' : 'down'), self._t(s[2]), '<svg class="sp-stepsvg sp-art" viewBox="0 0 54 40" aria-hidden="true"><g class="sp-stepdots">' + dots + '</g>' + sign + '</svg>');
      var v2 = st.b[s[0]] + s[1]; b.disabled = st.done || v2 < 0 || v2 > 5;
      b.addEventListener('click', function () { self._step(s[0], s[1]); });
      steps.appendChild(b);
    });
    var holder = this.api.el('div', 'sp-buildplate');
    var cell = Math.min(D.wide ? 84 : 64, this._cell(D, 5, 5, false));
    holder.style.width = (5 * cell) + 'px'; holder.style.height = (5 * cell) + 'px';
    if (st.b.r && st.b.c) holder.appendChild(this._plateEl(D, st.b.r, st.b.c, { pic: st.pic, lifted: [], dir: 'rows', tap: false, glow: st.done, ghost: st.help && help ? [st.r, st.c] : null, cellOverride: cell }));
    else holder.insertAdjacentHTML('beforeend', '<span class="sp-emptyplate"></span>');
    if (st.help && help && !(st.b.r && st.b.c)) holder.insertAdjacentHTML('beforeend', '<span class="sp-ghost" style="left:0;top:0;width:' + (st.c * cell) + 'px;height:' + (st.r * cell) + 'px"></span>');
    area.appendChild(holder); area.appendChild(steps);
    main.appendChild(card); main.appendChild(area);
  },

  /* ---------- find ---------- */
  _paintFind: function (main, D) {
    var st = this.st, self = this, C = SkewerPlateCore, help = st.last && st.misses > 0 && !st.done ? st.last.result : null;
    var row = this.api.el('div', 'sp-trays');
    st.f.plates.forEach(function (p, i) {
      var show = (help === 'tray' && (st.help || st.chosen === i)) || (st.done && i === st.chosen);
      var b = self._btn('sp-tray sp-art' + (st.chosen === i ? ' is-chosen' : '') + (st.done && st.chosen === i ? ' is-ok' : ''), 'tray-' + i, self._t('aPlate', { i: i + 1 }), self._traySvg(p[0], p[1], show, D));
      b.disabled = st.done;
      b.addEventListener('click', function () { self._pick(i); });
      row.appendChild(b);
    });
    main.appendChild(row);
  },
  _traySvg: function (r, c, show, D) {
    var u = 30, W = 5 * u + 40, H = 5 * u + 36, x0 = 26 + (5 - c) * u / 2, y0 = 24 + (5 - r) * u / 2, h = '';
    h += '<rect class="sp-trayboard" x="6" y="6" width="' + (W - 12) + '" height="' + (H - 12) + '" rx="18"/>';
    for (var i = 0; i < r; i++) h += '<line class="sp-tstick" x1="' + (x0 - 8) + '" y1="' + (y0 + i * u + u / 2) + '" x2="' + (x0 + c * u + 4) + '" y2="' + (y0 + i * u + u / 2) + '"/>';
    for (var a = 0; a < r; a++) for (var b = 0; b < c; b++) h += '<circle class="sp-dot" cx="' + (x0 + b * u + u / 2) + '" cy="' + (y0 + a * u + u / 2) + '" r="11"/>';
    if (show) { h += '<text class="sp-edge" x="' + (x0 - 14) + '" y="' + (y0 + r * u / 2 + 6) + '" text-anchor="end">' + r + '</text><text class="sp-edge" x="' + (x0 + c * u / 2) + '" y="' + (y0 - 6) + '" text-anchor="middle">' + c + '</text>'; }
    return '<svg class="sp-tsvg sp-art" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + h + '</svg>';
  },

  /* ---------- the pad: keys + Check ---------- */
  _paintPad: function (pad, D) {
    var st = this.st, self = this;
    if (st.done) return;
    var keys = this.api.el('div', 'sp-keys');
    if (st.mode === 'count' || st.mode === 'big') ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'].forEach(function (k) {
      var b = self._btn('sp-key' + (k === 'del' ? ' is-del' : ''), 'key-' + k, k === 'del' ? self._t('aDel') : null, k === 'del' ? '⌫' : k);
      b.addEventListener('click', function () { if (k === 'del') self._del(); else self._type(k); });
      keys.appendChild(b);
    });
    var chk = this._btn('sp-check', 'check', null, esc(this._t('checkBtn')));
    chk.addEventListener('click', function () { self._check(); });
    if (keys.children.length) {
      if (D.wide) { pad.appendChild(keys); pad.appendChild(chk); }
      else { chk.className = 'sp-key sp-checkkey'; chk.setAttribute('aria-label', this._t('checkBtn')); chk.textContent = '✓'; keys.appendChild(chk); pad.appendChild(keys); }
    } else pad.appendChild(chk);
  },

  /* ---------------- the hand ---------------- */
  _say: function (s) { var el = this._qs('.sp-sr'); if (el) el.textContent = s; },
  _clearHelp: function () { this._view.note = ''; },
  _lift: function (i) { if (SkewerPlateCore.lift(this.st, i) === 'no') return; this._clearHelp(); this.api.sound(560); this._paint(); },
  _back: function (i) { if (SkewerPlateCore.putBack(this.st, i) === 'no') return; this._clearHelp(); this.api.sound(380); this._paint(); },
  _pot: function () { if (SkewerPlateCore.reskewer(this.st) === 'no') return; this._clearHelp(); this.api.sound(440); this._paint(); },
  _focus: function (k) { if (SkewerPlateCore.focus(this.st, k) === 'no') return; this._paint(); },
  _type: function (d) { if (SkewerPlateCore.type(this.st, d) === 'no') return; this._clearHelp(); this.api.sound(520); this._paint(); },
  _del: function () { if (SkewerPlateCore.del(this.st) === 'no') return; this._clearHelp(); this.api.sound(380); this._paint(); },
  _step: function (a, d) { if (SkewerPlateCore.step(this.st, a, d) === 'no') return; this._clearHelp(); this.api.sound(d > 0 ? 560 : 380); this._paint(); },
  _pick: function (i) { if (SkewerPlateCore.pick(this.st, i) === 'no') return; this._clearHelp(); this.api.sound(560); this._paint(); },
  _check: function () {
    var C = SkewerPlateCore, st = this.st, v = this._view;
    var res = C.check(st); if (res.result === 'done') return;
    if (res.result === 'ok') { this._success(); return; }
    /* a big-array miss lifts every skewer into the rack */
    if (st.mode === 'big' && res.result === 'big') for (var s = 0; s < C.skewers(st); s++) if (!C.isLifted(st, s)) st.lifted.push(s);
    var a = { k: res.k, r: res.r, c: res.c };
    if (st.mode === 'build') { a.c = st.c; }
    if (st.mode === 'big') { a.r = st.r; a.c = st.c; }
    v.note = this._t(C.hint(st), a);
    if (st.misses) this.api.sound(240);
    this._paint(); this.api.announce(v.note);
  },
  _key_: function (e) {
    var st = this.st;
    if (st.mode === 'count' || st.mode === 'big') {
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); this._type(e.key); return; }
      if (e.key === 'Backspace') { e.preventDefault(); this._del(); return; }
    }
  },
  _success: function () {
    var st = this.st, v = this._view, C = SkewerPlateCore, msg, t;
    if (st.mode === 'find') { var p = st.f.t; msg = this._t('ok', { r: p[0], c: p[1], sum: C.sumText(p[0], p[1]), t: p[0] * p[1] }); }
    else if (st.mode === 'big') msg = this._t('okBig', { r: st.r, c: st.c, t: st.r * st.c });
    else if (st.mode === 'count' && st.dir === 'cols') msg = this._t('okCols', { r: st.r, c: st.c, sum: C.sumText(st.c, st.r), t: st.r * st.c });
    else msg = this._t('ok', { r: st.r, c: st.c, sum: C.sumText(st.r, st.c), t: st.r * st.c });
    if (st.mode === 'count' || st.mode === 'big') { st.lifted = []; }
    v.note = ''; v.ok = msg;
    if (this._pa) this._pa.msg = msg;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectSkewerCSS() {
  if (typeof document === 'undefined' || document.getElementById('sp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sp-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .sp-wrap:focus{outline:none;}'
  + '.sp-main{display:flex;gap:14px;align-items:flex-start;justify-content:center;}'
  + '.sp-platebox{position:relative;padding:18px 8px 8px 22px;border-radius:24px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #2E9C88;}'
  + '.sp-plate{position:relative;} .sp-plate.is-glow{filter:drop-shadow(0 0 10px rgba(244,207,98,.9));}'
  + '.sp-stick{position:absolute;background:#D9B98A;border:2px solid ' + INK + ';border-radius:4px;box-sizing:border-box;}'
  + '.sp-pic{position:absolute;object-fit:contain;pointer-events:none;} .sp-pic.is-edge{filter:drop-shadow(0 0 6px #F2784B);} .sp-pic.is-middle{animation:spPulse 1s ease-in-out infinite;}'
  + '.sp-hole{position:absolute;border:2px dashed #D3BF95;border-radius:50%;box-sizing:border-box;} .sp-hole.is-edge{border-color:#F2784B;border-style:solid;box-shadow:0 0 8px #F2784B;} .sp-hole.is-middle{border-color:#2E9C88;animation:spPulse 1s ease-in-out infinite;}'
  + '.sp-tile{position:absolute;background:#FFF6E0;border:2px solid ' + INK + ';border-radius:4px;box-shadow:inset 0 0 0 2px #7FC9B9;box-sizing:border-box;} .sp-tile.is-gone{background:transparent;border:2px dashed #D3BF95;box-shadow:none;} .sp-tile.is-edge{box-shadow:0 0 6px #F2784B;border-color:#E0663A;} .sp-tile.is-middle{animation:spPulse 1s ease-in-out infinite;}'
  + '@keyframes spPulse{50%{opacity:.4;}}'
  + '.sp-ghost{position:absolute;border:3px dashed #146B5E;border-radius:10px;background:rgba(46,156,136,.08);pointer-events:none;box-sizing:border-box;}'
  + '.sp-skew{position:absolute;border:0;background:transparent;padding:0;cursor:pointer;border-radius:12px;} .sp-skew:hover,.sp-skew:focus-visible{background:rgba(242,120,75,.10);} .sp-skew:disabled{cursor:default;}'
  + '.sp-bead{position:absolute;left:0;top:50%;width:24px;height:24px;margin-top:-12px;border-radius:50%;background:#F2784B;border:3px solid ' + INK + ';box-sizing:border-box;}'
  + '.by-cols .sp-bead{left:50%;top:0;margin-top:0;margin-left:-12px;}'
  + '.sp-pot{position:absolute;left:-6px;top:-10px;width:56px;height:56px;border:0;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:pointer;padding:4px;z-index:3;} .sp-pot svg{display:block;width:100%;height:100%;} .sp-pot:disabled{opacity:.5;cursor:default;}'
  + '.sp-jar{fill:#BFE3DA;stroke:' + INK + ';stroke-width:2.5;} .sp-pin{stroke:#B08850;stroke-width:3;stroke-linecap:round;} .sp-turn{fill:none;stroke:#F2784B;stroke-width:3;stroke-linecap:round;}'
  /* the rack */
  + '.sp-rack{flex:0 0 150px;display:flex;flex-direction:column;gap:6px;align-items:stretch;padding:8px;border-radius:16px;background:#EFE4CF;box-shadow:inset 0 0 0 2px #D9C29A;min-height:120px;}'
  + '.sp-slot{display:flex;align-items:center;gap:4px;position:relative;} .sp-plus{font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';width:14px;text-align:center;}'
  + '.sp-rstick{position:relative;flex:1 1 auto;min-width:0;height:44px;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #D9C29A;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:2px;padding:0 6px;} .sp-rstick:disabled{cursor:default;}'
  + '.sp-rline{position:absolute;left:4px;right:4px;top:50%;height:5px;margin-top:-2.5px;background:#D9B98A;border:1.5px solid ' + INK + ';border-radius:3px;box-sizing:border-box;}'
  + '.sp-tok{position:relative;width:14px;height:14px;border-radius:50%;background:#F2784B;border:2px solid ' + INK + ';box-sizing:border-box;font-family:' + H + ';font-weight:800;font-size:10px;line-height:10px;color:#fff;display:flex;align-items:center;justify-content:center;}'
  + '.sp-rack.is-big{flex-basis:150px;display:grid;grid-template-columns:1fr 1fr;align-content:start;} .sp-rack.is-big .sp-tok{width:8px;height:8px;border-width:1.5px;font-size:0;} .sp-rack.is-big .sp-rstick{height:24px;cursor:default;padding:0 2px;gap:1px;} .sp-rack.is-big .sp-totalrow{grid-column:1 / -1;} .sp-rack.is-big .sp-run{top:-7px;right:-4px;font-size:11px;line-height:15px;} .sp-fact{white-space:nowrap;}'
  + '.sp-rstick.is-bad{box-shadow:inset 0 0 0 3px #E0663A;animation:spWob .4s 2;} @keyframes spWob{25%{transform:rotate(-3deg);}75%{transform:rotate(3deg);}}'
  + '.sp-rack.is-line .sp-slot{margin-bottom:4px;} .sp-run{position:absolute;right:-6px;top:-8px;min-width:22px;padding:0 4px;border-radius:9px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:13px;line-height:18px;text-align:center;}'
  + '.sp-box{flex:0 0 48px;height:48px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 3px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:26px;color:' + INK + ';cursor:pointer;padding:0;} .sp-box.is-focus{box-shadow:inset 0 0 0 3px #F2784B;} .sp-box.is-ok{box-shadow:inset 0 0 0 3px #2E9C88;background:#EAF6F2;}'
  + '.sp-totalrow{display:flex;align-items:center;justify-content:flex-end;gap:6px;margin-top:4px;} .sp-eqs,.sp-fact{font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';} .sp-total{flex:0 0 64px;}'
  /* build */
  + '.sp-order{align-self:center;padding:6px 18px;border-radius:12px;background:#FFF4CC;box-shadow:inset 0 0 0 2px #E9B92E;display:flex;flex-direction:column;align-items:center;} .sp-ordsum{font-family:' + H + ';font-weight:800;font-size:30px;color:' + INK + ';} .sp-ordyou{font-family:' + H + ';font-weight:800;font-size:22px;color:#B8471F;text-decoration:line-through;}'
  + '.m-build .sp-main{flex-direction:column;align-items:center;} .sp-buildarea{display:flex;gap:14px;align-items:center;} .sp-buildplate{position:relative;border-radius:18px;background:#FFFDF6;box-shadow:inset 0 0 0 3px #2E9C88;padding:0;}'
  + '.sp-buildplate .sp-plate{position:absolute;left:0;top:0;} .sp-emptyplate{position:absolute;inset:8px;border:2px dashed #E2D5BC;border-radius:14px;}'
  + '.sp-steps{display:grid;grid-template-columns:repeat(2,56px);gap:8px;} .sp-step{height:56px;border:0;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:pointer;font-family:' + H + ';font-weight:800;font-size:18px;color:' + INK + ';display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1;} .sp-step:disabled{opacity:.4;cursor:default;} .sp-stepsvg{width:46px;height:34px;} .sp-stepdots circle{fill:#F2784B;stroke:' + INK + ';stroke-width:1.5;} .sp-stepdots line{stroke:#B08850;stroke-width:3;} .sp-sign{stroke:#146B5E;stroke-width:4;stroke-linecap:round;}'
  /* find */
  + '.sp-trays{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%;} .sp-tray{border:0;padding:4px;border-radius:18px;background:transparent;cursor:pointer;transition:transform .12s;} .sp-tray.is-chosen{transform:translateY(-6px);} .sp-tray.is-chosen .sp-trayboard{stroke:#146B5E;stroke-width:5;} .sp-tray:disabled{cursor:default;}'
  + '.sp-tsvg{display:block;width:100%;height:auto;} .sp-trayboard{fill:#FFFDF6;stroke:#CDBFA4;stroke-width:3;} .sp-tstick{stroke:#B08850;stroke-width:3;stroke-linecap:round;} .sp-dot{fill:#F2784B;stroke:' + INK + ';stroke-width:2;} .sp-edge{font-family:' + H + ';font-weight:800;font-size:20px;fill:#146B5E;}'
  /* pad */
  + '.sp-pad{display:flex;flex-direction:column;gap:8px;align-items:stretch;} .sp-pad:empty{display:none;} .sp-keys{display:flex;justify-content:center;gap:6px;} .sp-key{flex:0 0 52px;height:50px;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .sp-key.is-del{background:#FFF1EA;}'
  + '.sp-check{min-height:50px;border:0;border-radius:12px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:21px;cursor:pointer;box-shadow:0 4px 0 #0E4E44;padding:0 18px;} .sp-checkkey{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4E44;font-size:26px;}'
  + '.sp-note{margin:0;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .sp-note:empty{display:none;} .sp-note.is-hint{color:#9A3D1C;} .sp-note.is-ok{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.sp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones: the rack becomes a row under the plate; the keys a 6 × 2 pad with ✓ */
  + '.sp-wrap.is-narrow{gap:8px;} .sp-wrap.is-narrow .sp-main{flex-direction:column;align-items:center;gap:8px;} .sp-wrap.is-narrow .sp-platebox{padding:14px 3px 3px 3px;} .sp-main.is-stacked{flex-direction:column;align-items:center;} .sp-main.is-stacked .sp-rack{flex:0 0 auto;align-self:stretch;flex-direction:row;flex-wrap:wrap;align-items:flex-end;min-height:0;} .sp-main.is-stacked .sp-slot{flex:1 1 0;min-width:110px;} .sp-main.is-stacked .sp-totalrow{flex:0 0 auto;}'
  + '.sp-wrap.is-narrow .sp-pot{position:static;flex:0 0 48px;width:48px;height:48px;padding:3px;} .sp-wrap.is-narrow .sp-rack{flex:0 0 auto;align-self:stretch;flex-direction:row;flex-wrap:wrap;align-items:flex-end;min-height:0;padding:6px;gap:4px;}'
  + '.sp-wrap.is-narrow .sp-slot{flex-direction:column;flex:1 1 0;min-width:44px;gap:3px;} .sp-wrap.is-narrow .sp-plus{display:none;} .sp-wrap.is-narrow .sp-rstick{width:100%;height:44px;flex:0 0 auto;padding:0 2px;} .sp-wrap.is-narrow .sp-tok{width:8px;height:8px;border-width:1.5px;font-size:0;}'
  + '.sp-wrap.is-narrow .sp-box{flex:0 0 auto;width:100%;min-width:44px;height:44px;font-size:22px;} .sp-wrap.is-narrow .sp-totalrow{flex:0 0 auto;margin:0;align-self:flex-end;} .sp-wrap.is-narrow .sp-total{width:48px;} .sp-wrap.is-cramp .sp-rack{padding:4px;gap:3px;} .sp-wrap.is-cramp .sp-eqs{font-size:20px;}'
  + '.sp-wrap.is-narrow .sp-keys{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;} .sp-wrap.is-narrow .sp-key{height:44px;font-size:20px;} .sp-wrap.is-narrow .sp-note{font-size:16px;}'
  + '.sp-wrap.is-narrow .sp-trays{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;} .sp-wrap.is-narrow .sp-steps{grid-template-columns:repeat(2,48px);} .sp-wrap.is-narrow .sp-step{height:48px;} .sp-wrap.is-narrow .sp-ordsum{font-size:24px;}'
  + '.sp-wrap.is-narrow.m-build .sp-buildarea{flex-direction:column;} .sp-wrap.is-narrow.m-build .sp-steps{grid-template-columns:repeat(4,56px);}'
  + '.sp-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.sp-wrap *{animation:none !important;transition:none !important;}}'
  + '.sp-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'sp-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.SkewerPlateActivity = SkewerPlateActivity;
