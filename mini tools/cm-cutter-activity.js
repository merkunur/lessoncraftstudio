/* =====================================================================
   cm-cutter-activity.js — ACTIVITY #153 of the one-by-one rebuild:
   "Tildy's Tailor Shop" → THE CM CUTTER AND THE PIECE JAR (2.MD.A.1;
   G2-235; all 11 locales). Model: cm-cutter-core.js (CmCutterCore).
   Design: docs/activities-rebuild/designs/153-tildy.md
   ---------------------------------------------------------------------
   The invention: Tildy's cutter rides the ruler from its 0 and snips the
   strip at every centimetre. The pieces drop into the jar, and whatever
   the ruler missed stays on the table: a stub before the 0, a tail past
   a short ruler, or snips in thin air before the strip began. The cat
   bumps the ruler off 0 at the start; the child slides it back and taps
   the number at the end. Tricky rulers: a broken ruler (stitch each
   centimetre space), Tildy's mistakes to fix, a rack with one ruler long
   enough. No alignment lamp: nothing shows "close" before Check.
   No timer, no score, no words on the apparatus: numerals only.
   Test seams: window.CmCutterActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._render2 / ._slide / ._read / ._stitch /
   ._pick / ._check / ._orders / .FAST / .OK_MS.
   ===================================================================== */
var CmCutterActivity = {
  id: 'cm-cutter',
  /* the drawn apparatus (the hierarchy gate): the table, strips, rulers, the cutter, the jar, the order tags */
  apparatusClasses: ['cc-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Tildy's Tailor Shop","de":"Tildys Schneiderei","fr":"L’atelier de couture","es":"El taller de costura de Tildy","pt":"O ateliê de costura da Tildy","it":"La sartoria di Tildy","nl":"Het naaiatelier van Fien","sv":"Tildas syateljé","da":"Tildes systue","no":"Tildes syverksted","fi":"Tiinan ompelimo"},
    instruction: {"en":"Put the ruler's 0 at the start of the strip, then tap the number at the end. Then press Check and watch Tildy's cutter fill the jar.","de":"Leg die 0 des Lineals an den Anfang des Streifens und tipp dann auf die Zahl am Ende. Tipp dann auf Prüfen und schau zu, wie Tildys Rollschneider das Glas füllt.","fr":"Place le 0 de la règle au début de la bande, puis touche le nombre au bout. Touche ensuite Vérifier et regarde la roulette de coupe de la couturière remplir le bocal.","es":"Pon el 0 de la regla al inicio de la tira y luego toca el número del final. Después toca Revisar y mira cómo la cortadora de Tildy llena el frasco.","pt":"Coloque o 0 da régua no começo da tira e depois toque no número do fim. Depois toque em Conferir e veja o cortador da Tildy encher o pote.","it":"Metti lo 0 del righello all’inizio della striscia, poi tocca il numero alla fine. Poi tocca Controlla e guarda la taglierina di Tildy riempire il barattolo.","nl":"Leg de 0 van de liniaal aan het begin van de strook en tik dan op het getal aan het eind. Tik daarna op Controleer en kijk hoe het rolmesje van Fien de pot vult.","sv":"Lägg linjalens 0 vid början av remsan och tryck sedan på talet vid slutet. Tryck sedan på Kontrollera och se hur Tildas rullkniv fyller burken.","da":"Læg linealens 0 ved begyndelsen af strimlen, og tryk så på tallet ved enden. Tryk så på Tjek, og se Tildes rullekniv fylde glasset.","no":"Legg linjalens 0 ved starten av remsen, og trykk så på tallet ved enden. Trykk så på Sjekk, og se Tildes rullekniv fylle glasset.","fi":"Laita viivaimen 0 suikaleen alkuun ja napauta sitten lopussa olevaa lukua. Paina sitten Tarkista ja katso, miten Tiinan leikkuri täyttää purkin."},
    setLevel: {"en":"Rounds","de":"Runden","fr":"Manches","es":"Rondas","pt":"Rodadas","it":"Turni","nl":"Rondes","sv":"Omgångar","da":"Runder","no":"Runder","fi":"Kierrokset"},
    lAlign: {"en":"line up the 0","de":"die 0 anlegen","fr":"aligner le 0","es":"alinear el 0","pt":"alinhar o 0","it":"allineare lo 0","nl":"de 0 aanleggen","sv":"lägg 0 rätt","da":"læg 0 rigtigt","no":"legg 0 riktig","fi":"0 kohdalleen"},
    lTricky: {"en":"tricky rulers","de":"knifflige Lineale","fr":"règles piégées","es":"reglas engañosas","pt":"réguas complicadas","it":"righelli difficili","nl":"lastige linialen","sv":"kluriga linjaler","da":"drilske linealer","no":"lure linjaler","fi":"hankalat viivaimet"},
    setNumbers: {"en":"Ruler numbers","de":"Zahlen am Lineal","fr":"Nombres sur la règle","es":"Números de la regla","pt":"Números da régua","it":"Numeri sul righello","nl":"Getallen op de liniaal","sv":"Tal på linjalen","da":"Tal på linealen","no":"Tall på linjalen","fi":"Viivaimen luvut"},
    nEvery: {"en":"every centimeter","de":"jeder Zentimeter","fr":"chaque centimètre","es":"cada centímetro","pt":"cada centímetro","it":"ogni centimetro","nl":"elke centimeter","sv":"varje centimeter","da":"hver centimeter","no":"hver centimeter","fi":"joka senttimetri"},
    nFives: {"en":"only 0, 5, 10 …","de":"nur 0, 5, 10 …","fr":"seulement 0, 5, 10…","es":"solo 0, 5, 10…","pt":"só 0, 5, 10…","it":"solo 0, 5, 10…","nl":"alleen 0, 5, 10 …","sv":"bara 0, 5, 10 …","da":"kun 0, 5, 10 …","no":"bare 0, 5, 10 …","fi":"vain 0, 5, 10 …"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    tBroken: {"en":"This ruler is broken. Tap each centimeter space the strip covers.","de":"Dieses Lineal ist abgebrochen. Tipp jeden Zentimeterabstand an, den der Streifen bedeckt.","fr":"Cette règle est cassée. Touche chaque intervalle d’un centimètre que la bande recouvre.","es":"Esta regla está rota. Toca cada espacio de un centímetro que cubre la tira.","pt":"Esta régua está quebrada. Toque em cada espaço de um centímetro que a tira cobre.","it":"Questo righello è rotto. Tocca ogni spazio di un centimetro coperto dalla striscia.","nl":"Deze liniaal is gebroken. Tik elk hokje van een centimeter aan dat de strook bedekt.","sv":"Den här linjalen är trasig. Tryck på varje centimetermellanrum som remsan täcker.","da":"Den her lineal er knækket. Tryk på hvert centimetermellemrum, som strimlen dækker.","no":"Denne linjalen er knekt. Trykk på hvert centimetermellomrom som remsen dekker.","fi":"Tämä viivain on katkennut. Napauta jokaista senttimetrin väliä, jonka suikale peittää."},
    tFix: {"en":"Tildy says {m} cm. Find her mistake and measure again.","de":"Tildy sagt {m} cm. Finde ihren Fehler und miss noch einmal.","fr":"La couturière dit {m} cm. Trouve son erreur et mesure à nouveau.","es":"Tildy dice {m} cm. Encuentra su error y mide otra vez.","pt":"A Tildy diz {m} cm. Descubra o erro dela e meça de novo.","it":"Tildy dice {m} cm. Trova il suo errore e misura di nuovo.","nl":"Fien zegt {m} cm. Zoek haar fout en meet opnieuw.","sv":"Tilda säger {m} cm. Hitta hennes fel och mät igen.","da":"Tilde siger {m} cm. Find hendes fejl, og mål igen.","no":"Tilde sier {m} cm. Finn feilen hennes, og mål på nytt.","fi":"Tiina sanoo {m} cm. Etsi hänen virheensä ja mittaa uudelleen."},
    tPick: {"en":"Pick a ruler that is long enough, then measure the strip.","de":"Such dir ein Lineal aus, das lang genug ist, und miss dann den Streifen.","fr":"Choisis une règle assez longue, puis mesure la bande.","es":"Elige una regla que sea lo suficientemente larga y luego mide la tira.","pt":"Escolha uma régua comprida o bastante e depois meça a tira.","it":"Scegli un righello abbastanza lungo, poi misura la striscia.","nl":"Kies een liniaal die lang genoeg is en meet dan de strook.","sv":"Välj en linjal som är tillräckligt lång och mät sedan remsan.","da":"Vælg en lineal, der er lang nok, og mål så strimlen.","no":"Velg en linjal som er lang nok, og mål så remsen.","fi":"Valitse tarpeeksi pitkä viivain ja mittaa sitten suikale."},
    okBroken: {"en":"{n} spaces from start to end: {n} cm, even with a broken ruler.","de":"{n} Abstände vom Anfang bis zum Ende: {n} cm, sogar mit einem abgebrochenen Lineal.","fr":"{n} intervalles du début à la fin : {n} cm, même avec une règle cassée.","es":"{n} espacios del inicio al final: {n} cm, aun con una regla rota.","pt":"{n} espaços do começo ao fim: {n} cm, mesmo com uma régua quebrada.","it":"{n} spazi dall’inizio alla fine: {n} cm, anche con un righello rotto.","nl":"{n} hokjes van begin tot eind: {n} cm, zelfs met een gebroken liniaal.","sv":"{n} mellanrum från början till slutet: {n} cm, även med en trasig linjal.","da":"{n} mellemrum fra begyndelsen til enden: {n} cm, selv med en knækket lineal.","no":"{n} mellomrom fra starten til enden: {n} cm, selv med en knekt linjal.","fi":"{n} väliä alusta loppuun: {n} cm, vaikka viivain on katkennut."},
    hintRead: {"en":"Tap the number on the ruler at the end of the strip.","de":"Tipp auf die Zahl am Lineal, wo der Streifen endet.","fr":"Touche le nombre de la règle au bout de la bande.","es":"Toca el número de la regla donde termina la tira.","pt":"Toque no número da régua onde a tira termina.","it":"Tocca il numero del righello dove finisce la striscia.","nl":"Tik op het getal op de liniaal waar de strook eindigt.","sv":"Tryck på talet på linjalen där remsan slutar.","da":"Tryk på tallet på linealen, hvor strimlen slutter.","no":"Trykk på tallet på linjalen der remsen slutter.","fi":"Napauta viivaimen lukua kohdassa, jossa suikale loppuu."},
    hintStitch: {"en":"Tap each centimeter space the strip covers.","de":"Tipp jeden Zentimeterabstand an, den der Streifen bedeckt.","fr":"Touche chaque intervalle d’un centimètre que la bande recouvre.","es":"Toca cada espacio de un centímetro que cubre la tira.","pt":"Toque em cada espaço de um centímetro que a tira cobre.","it":"Tocca ogni spazio di un centimetro coperto dalla striscia.","nl":"Tik elk hokje van een centimeter aan dat de strook bedekt.","sv":"Tryck på varje centimetermellanrum som remsan täcker.","da":"Tryk på hvert centimetermellemrum, som strimlen dækker.","no":"Trykk på hvert centimetermellomrom som remsen dekker.","fi":"Napauta jokaista senttimetrin väliä, jonka suikale peittää."},
    hintPick: {"en":"First pick a ruler from the shelf.","de":"Nimm zuerst ein Lineal vom Regal.","fr":"Prends d’abord une règle sur le présentoir.","es":"Primero toma una regla del estante.","pt":"Primeiro pegue uma régua da prateleira.","it":"Prima prendi un righello dal ripiano.","nl":"Pak eerst een liniaal uit het rek.","sv":"Ta först en linjal från hyllan.","da":"Tag først en lineal fra hylden.","no":"Ta først en linjal fra hylla.","fi":"Ota ensin viivain hyllyltä."},
    hintStub: {"en":"A piece was left on the table: the 0 was not at the start.","de":"Ein Stück ist auf dem Tisch liegen geblieben: Die 0 war nicht am Anfang.","fr":"Un morceau est resté sur la table : le 0 n’était pas au début.","es":"Un pedazo se quedó en la mesa: el 0 no estaba al inicio.","pt":"Um pedaço ficou na mesa: o 0 não estava no começo.","it":"Un pezzo è rimasto sul tavolo: lo 0 non era all’inizio.","nl":"Er bleef een stuk op tafel liggen: de 0 lag niet aan het begin.","sv":"En bit blev kvar på bordet: 0 var inte vid början.","da":"Et stykke blev liggende på bordet: 0 var ikke ved begyndelsen.","no":"En bit ble liggende igjen på bordet: 0 var ikke ved starten.","fi":"Pöydälle jäi pala: 0 ei ollut alussa."},
    hintAir: {"en":"The cutter snipped air before the strip began.","de":"Der Rollschneider hat Luft geschnitten, bevor der Streifen anfing.","fr":"La roulette a coupé dans le vide avant le début de la bande.","es":"La cortadora cortó aire antes de que empezara la tira.","pt":"O cortador cortou o ar antes de a tira começar.","it":"La taglierina ha tagliato l’aria prima che iniziasse la striscia.","nl":"Het rolmesje sneed in de lucht voordat de strook begon.","sv":"Rullkniven skar i luften innan remsan började.","da":"Rullekniven skar i luften, før strimlen begyndte.","no":"Rullekniven skar i lufta før remsen begynte.","fi":"Leikkuri leikkasi ilmaa ennen kuin suikale alkoi."},
    hintJar: {"en":"The jar has {n} pieces. Look again at the end.","de":"Im Glas liegen {n} Stücke. Schau noch einmal auf das Ende.","fr":"Le bocal contient {n} morceaux. Regarde encore le bout.","es":"En el frasco hay {n} pedazos. Mira otra vez el final.","pt":"O pote tem {n} pedaços. Olhe de novo para o fim.","it":"Nel barattolo ci sono {n} pezzi. Guarda di nuovo la fine.","nl":"In de pot zitten {n} stukjes. Kijk nog eens naar het eind.","sv":"I burken ligger {n} bitar. Titta igen på slutet.","da":"I glasset ligger der {n} stykker. Se igen på enden.","no":"I glasset ligger det {n} biter. Se på enden igjen.","fi":"Purkissa on {n} palaa. Katso loppua uudelleen."},
    hintShort: {"en":"The ruler did not reach the end.","de":"Das Lineal hat nicht bis zum Ende gereicht.","fr":"La règle n’arrivait pas jusqu’au bout.","es":"La regla no llegó hasta el final.","pt":"A régua não chegou até o fim.","it":"Il righello non arrivava fino alla fine.","nl":"De liniaal kwam niet tot het eind.","sv":"Linjalen räckte inte ända till slutet.","da":"Linealen nåede ikke helt til enden.","no":"Linjalen rakk ikke helt til enden.","fi":"Viivain ei ulottunut loppuun asti."},
    hintStitchPast: {"en":"Some stitches are not on the strip.","de":"Einige Stiche liegen nicht auf dem Streifen.","fr":"Certains points ne sont pas sur la bande.","es":"Algunas puntadas no están sobre la tira.","pt":"Alguns pontos não estão em cima da tira.","it":"Alcuni punti non sono sulla striscia.","nl":"Sommige steken liggen niet op de strook.","sv":"Några stygn ligger inte på remsan.","da":"Nogle sting ligger ikke på strimlen.","no":"Noen sting ligger ikke på remsen.","fi":"Osa pistoista ei ole suikaleen päällä."},
    hintStitchMissing: {"en":"Some spaces of the strip have no stitch yet.","de":"Einige Abstände auf dem Streifen haben noch keinen Stich.","fr":"Certains intervalles de la bande n’ont pas encore de point.","es":"Algunos espacios de la tira todavía no tienen puntada.","pt":"Alguns espaços da tira ainda não têm ponto.","it":"Alcuni spazi della striscia non hanno ancora un punto.","nl":"Sommige hokjes van de strook hebben nog geen steek.","sv":"Några mellanrum på remsan har inget stygn än.","da":"Nogle mellemrum på strimlen har ikke fået et sting endnu.","no":"Noen mellomrom på remsen har ikke fått noe sting ennå.","fi":"Joissakin suikaleen väleissä ei ole vielä pistoa."},
    hintPin: {"en":"Slide the ruler until its 0 touches the pin.","de":"Schieb das Lineal, bis seine 0 die Nadel berührt.","fr":"Fais glisser la règle jusqu’à ce que son 0 touche l’épingle.","es":"Desliza la regla hasta que su 0 toque el alfiler.","pt":"Deslize a régua até o 0 dela encostar no alfinete.","it":"Fai scorrere il righello finché il suo 0 tocca lo spillo.","nl":"Schuif de liniaal tot de 0 de speld raakt.","sv":"Dra linjalen tills dess 0 nuddar nålen.","da":"Skub linealen, til dens 0 rører nålen.","no":"Skyv linjalen til 0 rører nåla.","fi":"Liu’uta viivainta, kunnes sen 0 koskettaa neulaa."},
    hintEnd: {"en":"Read the number right under the end of the strip.","de":"Lies die Zahl genau unter dem Ende des Streifens ab.","fr":"Lis le nombre juste sous le bout de la bande.","es":"Lee el número que está justo debajo del final de la tira.","pt":"Leia o número bem embaixo do fim da tira.","it":"Leggi il numero proprio sotto la fine della striscia.","nl":"Lees het getal precies onder het eind van de strook.","sv":"Läs av talet precis under remsans slut.","da":"Aflæs tallet lige under enden af strimlen.","no":"Les av tallet rett under enden av remsen.","fi":"Lue luku, joka on juuri suikaleen lopun alla."},
    hintLonger: {"en":"This ruler is too short. Pick a longer one.","de":"Dieses Lineal ist zu kurz. Nimm ein längeres.","fr":"Cette règle est trop courte. Choisis-en une plus longue.","es":"Esta regla es demasiado corta. Elige una más larga.","pt":"Esta régua é curta demais. Escolha uma mais comprida.","it":"Questo righello è troppo corto. Scegline uno più lungo.","nl":"Deze liniaal is te kort. Kies een langere.","sv":"Den här linjalen är för kort. Välj en längre.","da":"Den her lineal er for kort. Vælg en længere.","no":"Denne linjalen er for kort. Velg en lengre.","fi":"Tämä viivain on liian lyhyt. Valitse pidempi."},
    hintCount: {"en":"Count the spaces from the start of the strip to its end.","de":"Zähl die Abstände vom Anfang des Streifens bis zu seinem Ende.","fr":"Compte les intervalles du début de la bande jusqu’à son bout.","es":"Cuenta los espacios desde el inicio de la tira hasta su final.","pt":"Conte os espaços do começo da tira até o fim dela.","it":"Conta gli spazi dall’inizio della striscia fino alla sua fine.","nl":"Tel de hokjes van het begin van de strook tot het eind.","sv":"Räkna mellanrummen från remsans början till dess slut.","da":"Tæl mellemrummene fra strimlens begyndelse til dens ende.","no":"Tell mellomrommene fra starten av remsen til enden.","fi":"Laske välit suikaleen alusta sen loppuun."},
    unit: {"en":"cm","de":"cm","fr":"cm","es":"cm","pt":"cm","it":"cm","nl":"cm","sv":"cm","da":"cm","no":"cm","fi":"cm"},
    aRuler: {"en":"Ruler, its 0 at {k} centimeters on the table. Drag it, or tap a number.","de":"Lineal, seine 0 liegt bei {k} Zentimetern auf dem Tisch. Zieh es oder tipp auf eine Zahl.","fr":"Règle, son 0 est à {k} centimètres sur la table. Fais-la glisser ou touche un nombre.","es":"Regla, su 0 está a {k} centímetros en la mesa. Arrástrala o toca un número.","pt":"Régua, o 0 dela está a {k} centímetros na mesa. Arraste-a ou toque em um número.","it":"Righello, il suo 0 è a {k} centimetri sul tavolo. Trascinalo o tocca un numero.","nl":"Liniaal, de 0 ligt bij {k} centimeter op de tafel. Sleep hem of tik op een getal.","sv":"Linjal, dess 0 ligger vid {k} centimeter på bordet. Dra den eller tryck på ett tal.","da":"Lineal, dens 0 ligger ved {k} centimeter på bordet. Træk den, eller tryk på et tal.","no":"Linjal, 0 ligger ved {k} centimeter på bordet. Dra den, eller trykk på et tall.","fi":"Viivain, sen 0 on pöydällä {k} senttimetrin kohdalla. Vedä sitä tai napauta lukua."},
    aJar: {"en":"Jar: {n} pieces","de":"Glas: {n} Stücke","fr":"Bocal : {n} morceaux","es":"Frasco: {n} pedazos","pt":"Pote: {n} pedaços","it":"Barattolo: {n} pezzi","nl":"Pot: {n} stukjes","sv":"Burk: {n} bitar","da":"Glas: {n} stykker","no":"Glass: {n} biter","fi":"Purkki: {n} palaa"},
    aRack: {"en":"Ruler {n} centimeters long","de":"Lineal, {n} Zentimeter lang","fr":"Règle de {n} centimètres","es":"Regla de {n} centímetros","pt":"Régua de {n} centímetros","it":"Righello lungo {n} centimetri","nl":"Liniaal van {n} centimeter","sv":"Linjal, {n} centimeter lång","da":"Lineal, {n} centimeter lang","no":"Linjal, {n} centimeter lang","fi":"Viivain, {n} senttimetriä pitkä"},
    oP_ribbon: {"en":"Put the ruler's 0 at the start of the ribbon. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang des Bandes. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début du ruban. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio del listón. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo da fita. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio del nastro. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van het lint. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av bandet. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af båndet. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av båndet. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 nauhan alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_leather: {"en":"Put the ruler's 0 at the start of the leather strip. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang des Lederstreifens. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début de la bande de cuir. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio de la tira de piel. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo da tira de couro. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio della striscia di cuoio. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van het leren reepje. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av läderremsan. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af læderstrimlen. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av lærremsen. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 nahkasuikaleen alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_yarn: {"en":"Put the ruler's 0 at the start of the yarn. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang des Wollfadens. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début du fil de laine. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio del estambre. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo do fio de lã. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio del filo di lana. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van de wollen draad. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av garnet. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af garnet. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av garnet. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 langan alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_cord: {"en":"Put the ruler's 0 at the start of the cord. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang der Kordel. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début du cordon. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio del cordón. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo do cordão. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio del cordoncino. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van het koord. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av snöret. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af snoren. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av snora. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 narun alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_denim: {"en":"Put the ruler's 0 at the start of the denim strip. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang des Jeansstreifens. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début de la bande de jean. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio de la tira de mezclilla. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo da tira de jeans. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio della striscia di jeans. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van het reepje spijkerstof. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av jeansremsan. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af denimstrimlen. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av dongeriremsen. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 farkkusuikaleen alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_felt: {"en":"Put the ruler's 0 at the start of the felt strip. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang des Filzstreifens. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début de la bande de feutre. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio de la tira de fieltro. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo da tira de feltro. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio della striscia di feltro. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van het vilten reepje. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av filtremsan. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af filtstrimlen. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av filtremsen. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 huopasuikaleen alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_lace: {"en":"Put the ruler's 0 at the start of the lace. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang des Spitzenbands. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début de la dentelle. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio del encaje. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo da renda. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio del pizzo. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van het kantlint. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av spetsen. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af blonden. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av blonden. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 pitsin alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_braid: {"en":"Put the ruler's 0 at the start of the braid. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang der Borte. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début du galon. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio de la trencilla. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo da trancinha. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio della treccia. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van de vlecht. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av flätan. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af fletningen. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av fletta. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 punoksen alkuun. Napauta sitten lopussa olevaa lukua."},
    oP_elastic: {"en":"Put the ruler's 0 at the start of the elastic. Then tap the number at the end.","de":"Leg die 0 des Lineals an den Anfang des Gummibands. Tipp dann auf die Zahl am Ende.","fr":"Place le 0 de la règle au début de l’élastique. Puis touche le nombre au bout.","es":"Pon el 0 de la regla al inicio del elástico. Luego toca el número del final.","pt":"Coloque o 0 da régua no começo do elástico. Depois toque no número do fim.","it":"Metti lo 0 del righello all’inizio dell’elastico. Poi tocca il numero alla fine.","nl":"Leg de 0 van de liniaal aan het begin van het elastiek. Tik dan op het getal aan het eind.","sv":"Lägg linjalens 0 vid början av resårbandet. Tryck sedan på talet vid slutet.","da":"Læg linealens 0 ved begyndelsen af elastikken. Tryk så på tallet ved enden.","no":"Legg linjalens 0 ved starten av strikken. Trykk så på tallet ved enden.","fi":"Laita viivaimen 0 kuminauhan alkuun. Napauta sitten lopussa olevaa lukua."},
    ok_ribbon: {"en":"0 at the start, {n} at the end: the ribbon is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Das Band ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : le ruban mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: el listón mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: a fita mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: il nastro misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: het lint is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: bandet är {n} cm långt, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Båndet er {n} cm langt, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Båndet er {n} cm langt, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: nauha on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_leather: {"en":"0 at the start, {n} at the end: the leather strip is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Der Lederstreifen ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : la bande de cuir mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: la tira de piel mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: a tira de couro mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: la striscia di cuoio misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: het leren reepje is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: läderremsan är {n} cm lång, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Læderstrimlen er {n} cm lang, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Lærremsen er {n} cm lang, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: nahkasuikale on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_yarn: {"en":"0 at the start, {n} at the end: the yarn is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Der Wollfaden ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : le fil de laine mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: el estambre mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: o fio de lã mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: il filo di lana misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: de wollen draad is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: garnet är {n} cm långt, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Garnet er {n} cm langt, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Garnet er {n} cm langt, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: lanka on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_cord: {"en":"0 at the start, {n} at the end: the cord is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Die Kordel ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : le cordon mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: el cordón mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: o cordão mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: il cordoncino misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: het koord is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: snöret är {n} cm långt, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Snoren er {n} cm lang, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Snora er {n} cm lang, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: naru on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_denim: {"en":"0 at the start, {n} at the end: the denim strip is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Der Jeansstreifen ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : la bande de jean mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: la tira de mezclilla mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: a tira de jeans mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: la striscia di jeans misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: het reepje spijkerstof is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: jeansremsan är {n} cm lång, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Denimstrimlen er {n} cm lang, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Dongeriremsen er {n} cm lang, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: farkkusuikale on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_felt: {"en":"0 at the start, {n} at the end: the felt strip is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Der Filzstreifen ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : la bande de feutre mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: la tira de fieltro mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: a tira de feltro mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: la striscia di feltro misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: het vilten reepje is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: filtremsan är {n} cm lång, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Filtstrimlen er {n} cm lang, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Filtremsen er {n} cm lang, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: huopasuikale on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_lace: {"en":"0 at the start, {n} at the end: the lace is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Das Spitzenband ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : la dentelle mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: el encaje mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: a renda mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: il pizzo misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: het kantlint is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: spetsen är {n} cm lång, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Blonden er {n} cm lang, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Blonden er {n} cm lang, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: pitsi on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_braid: {"en":"0 at the start, {n} at the end: the braid is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Die Borte ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : le galon mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: la trencilla mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: a trancinha mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: la treccia misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: de vlecht is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: flätan är {n} cm lång, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Fletningen er {n} cm lang, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Fletta er {n} cm lang, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: punos on {n} cm pitkä, ja purkissa on {n} palaa."},
    ok_elastic: {"en":"0 at the start, {n} at the end: the elastic is {n} cm long, and the jar has {n} pieces.","de":"0 am Anfang, {n} am Ende: Das Gummiband ist {n} cm lang, und im Glas liegen {n} Stücke.","fr":"0 au début, {n} au bout : l’élastique mesure {n} cm, et le bocal contient {n} morceaux.","es":"0 al inicio, {n} al final: el elástico mide {n} cm, y en el frasco hay {n} pedazos.","pt":"0 no começo, {n} no fim: o elástico mede {n} cm, e o pote tem {n} pedaços.","it":"0 all’inizio, {n} alla fine: l’elastico misura {n} cm, e nel barattolo ci sono {n} pezzi.","nl":"0 aan het begin, {n} aan het eind: het elastiek is {n} cm lang, en in de pot zitten {n} stukjes.","sv":"0 vid början, {n} vid slutet: resårbandet är {n} cm långt, och i burken ligger {n} bitar.","da":"0 ved begyndelsen, {n} ved enden: Elastikken er {n} cm lang, og i glasset ligger der {n} stykker.","no":"0 ved starten, {n} ved enden: Strikken er {n} cm lang, og i glasset ligger det {n} biter.","fi":"0 alussa, {n} lopussa: kuminauha on {n} cm pitkä, ja purkissa on {n} palaa."}
  },/*STRINGS-END*/
  defaults: { level: 'align', numbers: 'every' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'align', labelKey: 'lAlign' }, { value: 'tricky', labelKey: 'lTricky' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'every', labelKey: 'nEvery' }, { value: 'fives', labelKey: 'nFives' }] }
  ],
  OK_MS: 500, FAST: false, SNIP_MS: 90,
  THEMES: ['occupations', 'pets'],
  STRIP_FILL: { ribbon: '#E0524A', leather: '#9A5B34', yarn: '#8C6BB1', cord: '#3E7CB1', denim: '#4A6FA5', felt: '#5FA85C', lace: '#FFFDF6', braid: '#E0A92E', elastic: '#4B4658' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._racks = {};
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._orders = []; this._themes = {}; this._picsReady = false; this._digits = '';
    injectCmCutterCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function (e) { if (typeof console !== 'undefined') console.error(e); });
    }
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } this._endDrag(); },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return CmCutterCore.levelOf(this._setting('level')); },
  _every: function () { return this._setting('numbers') !== 'fives'; },
  _key: function () { return this._level(); },
  _loc: function () { return String((this.api && this.api.lang) || 'en').slice(0, 2); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = CmCutterCore.rounds(k); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._racks = {}; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = CmCutterCore, pool = this._ensurePool(), lv = this._level(), n = C.passSize(lv), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { var P = C.plan(lv, pass, Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._racks = P.racks; this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'cm-cutter.' + lv + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () { var r = this.st.round; return this._t(CmCutterCore.taskKey(r), { m: r.says }); },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = CmCutterCore.newState(this._level(), k, this._racks && this._racks[k]);
    this._view = { note: '', soft: false, win: false, cat: !this.FAST && (this.st.round.kind === 'align' || (this.st.round.kind === 'fix' && this.st.round.z !== this.st.round.s)) };
    this._digits = '';
    this._setPrompt();
    if (this._wrap) this._paint();
    var self = this; if (this._view.cat) this._later(function () { self._view.cat = false; if (self._wrap) self._paint(); }, 1300);
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
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'cc-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="cc-head"></div><div class="cc-table"></div><div class="cc-rack"></div><p class="cc-note" data-qa="note" aria-live="polite"></p><div class="cc-bar"></div><div class="cc-orders"></div>';
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
  _geo: function () {
    var W = this._width(), g = CmCutterCore.geo(W), st = this.st;
    g.W = W; g.cut = g.wide ? 34 : 28; g.sh = g.wide ? 22 : 16; g.RH = g.wide ? 52 : 44; g.tag = g.wide ? 46 : 42;
    g.yS = g.cut; g.yR = g.cut + g.sh; g.yT = g.yR + g.RH; g.H = g.yT + g.tag;
    g.x = function (t) { return g.pad + (t - st.w0) * g.ppc; };
    g.num = g.wide ? 20 : g.cramp ? 14 : 16;
    return g;
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._geo();
    this._g = g;
    this._wrap.className = 'cc-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.help ? ' is-help' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.round.kind;
    this._paintHead(g);
    this._paintTable(g);
    this._paintRack(g);
    this._paintBar();
    this._paintOrders(g);
    var note = this._qs('.cc-note');
    if (v.note) { note.textContent = v.note; note.className = 'cc-note' + (v.soft ? '' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'cc-note'; }
    this._setPrompt();
  },

  /* ---------- the head: the jar and Tildy at her sewing machine ---------- */
  _paintHead: function (g) {
    var st = this.st, r = st.round, v = this._view, head = this._qs('.cc-head'); head.innerHTML = '';
    var n = st.cut ? st.cut.pieces : 0, jw = g.wide ? 96 : 60, jh = g.wide ? 120 : 72, pieceH = Math.max(4, Math.min(8, Math.floor((jh - 28) / 15))), o = '';
    o += '<rect class="cc-jar" x="6" y="14" width="' + (jw - 12) + '" height="' + (jh - 18) + '" rx="12"/><rect class="cc-lid" x="10" y="6" width="' + (jw - 20) + '" height="10" rx="3"/>';
    for (var i = 0; i < n; i++) o += '<rect class="cc-piece" data-piece="' + i + '" x="14" y="' + (jh - 10 - (i + 1) * pieceH) + '" width="' + (jw - 28) + '" height="' + (pieceH - 1) + '" rx="1.5" fill="' + this.STRIP_FILL[r.strip] + '" style="animation-delay:' + (this.FAST ? 0 : i * this.SNIP_MS) + 'ms"/>';
    if (st.cut) o += '<text class="cc-jarn" x="' + (jw / 2) + '" y="' + (g.wide ? 44 : 36) + '">' + n + '</text>';
    var jar = '<svg class="cc-art cc-jarsvg' + (st.done && v.win ? ' is-glint' : '') + '" width="' + jw + '" height="' + jh + '" viewBox="0 0 ' + jw + ' ' + jh + '" role="presentation" aria-label="' + this._t('aJar', { n: n }) + '">' + o + '</svg>';
    head.insertAdjacentHTML('beforeend', jar);
    if (r.kind === 'fix' && !st.done) head.insertAdjacentHTML('beforeend', '<span class="cc-says cc-art">' + r.says + ' ' + this._t('unit') + '</span>');
    var th = this._themes.occupations;
    if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, 'tailor', this._loc(), { size: g.wide ? 104 : 72 }); im.className = 'cc-tildy' + (st.done && v.win ? ' is-happy' : ''); head.appendChild(im); }
  },

  /* ---------- the table: the strip, the ruler, the cutter, the reading ---------- */
  _paintTable: function (g) {
    var st = this.st, r = st.round, v = this._view, self = this, x = g.x, ppc = g.ppc, C = CmCutterCore, o = '';
    var table = this._qs('.cc-table'); table.innerHTML = ''; table.style.width = g.W + 'px'; table.style.height = g.H + 'px';
    var cut = st.cut, V = st.verdict, help = st.help && !st.done;
    /* the wooden table and its plain front edge: one dot per centimetre, no numbers (the table is not a ruler) */
    o += '<rect class="cc-wood" x="' + (g.pad - 6) + '" y="' + (g.yS - 10) + '" width="' + (C.WIN * ppc + 12) + '" height="' + (g.yT - g.yS + 18) + '" rx="10"/>';
    for (var d = 0; d <= C.WIN; d++) o += '<circle class="cc-dot" cx="' + (g.pad + d * ppc).toFixed(1) + '" cy="' + (g.yT + 3) + '" r="1.6"/>';
    /* the strip: cut into pieces after a snip; the stub and the tail stay whole, outlined */
    var lo = r.s, hi = r.e;
    if (cut && r.kind !== 'broken') { lo = Math.max(r.s, st.zero); hi = Math.min(r.e, st.zero + st.len); }
    o += this._strip(g, r.s, r.e, cut ? { lo: lo, hi: hi, only: r.kind === 'broken' ? st.stitches : null } : null);
    if (cut && r.kind === 'broken') { for (var gk = r.s; gk < r.e; gk++) if (st.stitches.indexOf(gk) < 0) o += '<rect class="cc-left" data-left="gap" x="' + (x(gk) - 1).toFixed(1) + '" y="' + (g.yS - 3) + '" width="' + (ppc + 2).toFixed(1) + '" height="' + (g.sh + 6) + '" rx="3"/>'; st.stitches.forEach(function (k) { if (k < r.s || k >= r.e) o += '<g class="cc-puff" data-air="' + k + '"><circle cx="' + ((x(k) + x(k + 1)) / 2).toFixed(1) + '" cy="' + (g.yS + g.sh / 2) + '" r="' + (g.wide ? 7 : 5) + '"/></g>'; }); }
    if (cut && cut.stub) o += '<rect class="cc-left" data-left="stub" x="' + (x(r.s) - 2).toFixed(1) + '" y="' + (g.yS - 3) + '" width="' + ((st.zero - r.s) * ppc + 4).toFixed(1) + '" height="' + (g.sh + 6) + '" rx="4"/>';
    if (cut && cut.tail) o += '<rect class="cc-left" data-left="tail" x="' + (x(st.zero + st.len) - 2).toFixed(1) + '" y="' + (g.yS - 3) + '" width="' + ((r.e - st.zero - st.len) * ppc + 4).toFixed(1) + '" height="' + (g.sh + 6) + '" rx="4"/>';
    /* snips in thin air before the strip began: a puff in each empty space */
    if (cut && cut.air && r.kind !== 'broken') for (var a = st.zero; a < r.s; a++) o += '<g class="cc-puff" data-air="' + a + '"><circle cx="' + ((x(a) + x(a + 1)) / 2).toFixed(1) + '" cy="' + (g.yS + g.sh / 2) + '" r="' + (g.wide ? 7 : 5) + '"/><circle cx="' + ((x(a) + x(a + 1)) / 2 + 5).toFixed(1) + '" cy="' + (g.yS + g.sh / 2 - 4) + '" r="' + (g.wide ? 4 : 3) + '"/></g>';
    /* the ruler */
    if (st.len != null) o += this._ruler(g, cut);
    /* the stitches on a broken ruler round, and their count */
    if (r.kind === 'broken') {
      st.stitches.forEach(function (k) { var cx = (x(k) + x(k + 1)) / 2, cy = g.yS + g.sh / 2, s = g.wide ? 6 : 4.5; o += '<path class="cc-stitch" data-stitch="' + k + '" d="M' + (cx - s) + ' ' + (cy - s) + 'L' + (cx + s) + ' ' + (cy + s) + 'M' + (cx + s) + ' ' + (cy - s) + 'L' + (cx - s) + ' ' + (cy + s) + '"/>'; });
      if (help) for (var hk = r.s; hk < r.e; hk++) o += '<text class="cc-faint" x="' + ((x(hk) + x(hk + 1)) / 2).toFixed(1) + '" y="' + (g.yS - 6) + '">' + (hk - r.s + 1) + '</text>';
      if (st.stitches.length) o += this._tag(g, (x(r.s) + x(r.e)) / 2, st.stitches.length, 'count');
    }
    /* the reading tag hangs from the numeral the child tapped */
    if (r.kind !== 'broken' && st.reading != null && st.len != null) o += this._tag(g, x(st.zero + st.reading), st.reading, 'reading', V && V.kind === 'misread');
    /* miss 2: the pin at the strip's start and a dashed line down to the ruler */
    if (help && r.kind !== 'broken' && V && (V.kind === 'inside' || V.kind === 'before')) o += '<g class="cc-pin" data-pin="' + r.s + '"><path class="cc-pinline" d="M' + x(r.s).toFixed(1) + ' ' + (g.yS - 16) + 'V' + (g.yT) + '"/><circle cx="' + x(r.s).toFixed(1) + '" cy="' + (g.yS - 18) + '" r="6"/></g>';
    if (help && V && V.kind === 'misread') o += '<path class="cc-pinline" data-endline="' + r.e + '" d="M' + x(r.e).toFixed(1) + ' ' + (g.yS) + 'V' + (g.yT) + '"/>';
    /* the cutter carriage: parked at the ruler's 0 (or the broken end), at the last snip after Check */
    var cz = r.kind === 'broken' ? r.b : st.zero;
    if (st.len != null) { var cx2 = cut ? x(r.kind === 'broken' ? r.e : hi) : x(cz); o += '<g class="cc-cutter" data-at="' + (cut ? (r.kind === 'broken' ? r.e : hi) : cz) + '" transform="translate(' + cx2.toFixed(1) + ' ' + (g.yS - 2) + ')"><path class="cc-blade" d="M0 0 L-7 -14 H7 Z"/><rect class="cc-carriage" x="-11" y="-' + (g.cut - 8) + '" width="22" height="' + (g.cut - 22) + '" rx="4"/></g>'; }
    var svg = '<svg class="cc-art cc-tablesvg" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + ' ' + g.H + '" role="presentation" aria-hidden="true">' + o + '</svg>';
    table.insertAdjacentHTML('beforeend', svg);
    /* the band: drag to slide the ruler, tap to read (or stitch on a broken ruler) */
    var band = document.createElement('div'); band.className = 'cc-band'; band.setAttribute('data-k', 'ruler');
    band.setAttribute('role', 'slider'); band.setAttribute('aria-label', this._t('aRuler', { k: st.zero == null ? 0 : st.zero })); band.setAttribute('aria-valuenow', st.zero == null ? 0 : st.zero);
    band.style.cssText = 'top:' + (g.yS - 4) + 'px;height:' + (g.yT - g.yS + g.tag) + 'px;';
    band.addEventListener('pointerdown', function (e) { self._dragStart(e); });
    table.appendChild(band);
    /* the cat bumps the ruler off 0 at the start of the round */
    var cat = this._themes.pets;
    if (v.cat && cat && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(cat, 'cat', this._loc(), { size: g.wide ? 96 : 72 }); im.className = 'cc-cat'; im.style.left = Math.max(0, x(st.zero) - (g.wide ? 96 : 72)).toFixed(0) + 'px'; im.style.top = (g.yR + g.RH - (g.wide ? 96 : 72)) + 'px'; table.appendChild(im); }
  },
  _strip: function (g, s, e, cut) {
    var r = this.st.round, x = g.x, y = g.yS, h = g.sh, fill = this.STRIP_FILL[r.strip], o = '', kind = r.strip, self = this;
    /* the pieces: [s, e] split at every cut tick between lo and hi */
    var edges = [s];
    if (cut && cut.only) { for (var t2 = s + 1; t2 < e; t2++) if (cut.only.indexOf(t2 - 1) >= 0 || cut.only.indexOf(t2) >= 0) edges.push(t2); }
    else if (cut) { for (var t = Math.ceil(cut.lo); t <= Math.floor(cut.hi); t++) if (t > s && t < e) edges.push(t); }
    edges.push(e);
    for (var i = 0; i + 1 < edges.length; i++) {
      var a = edges[i], b = edges[i + 1], gap = cut ? 1.5 : 0, x0 = x(a) + (i ? gap : 0), x1 = x(b) - (i + 2 < edges.length ? gap : 0), inCut = cut && (cut.only ? b - a === 1 && cut.only.indexOf(a) >= 0 : a >= cut.lo && b <= cut.hi);
      o += '<rect class="cc-strip' + (inCut ? ' is-cut' : '') + '" data-seg="' + a + '-' + b + '" x="' + x0.toFixed(1) + '" y="' + y + '" width="' + Math.max(1, x1 - x0).toFixed(1) + '" height="' + h + '" rx="2" fill="' + fill + '"' + (kind === 'lace' ? ' stroke="#B9A98A" stroke-width="1.5"' : '') + ' style="animation-delay:' + (self.FAST ? 0 : (a - (cut ? cut.lo : 0)) * self.SNIP_MS) + 'ms"/>';
    }
    /* the material: a stripe, a stitched edge, a twist, speckles, ribs */
    var L = x(s), R = x(e), mid = y + h / 2;
    if (kind === 'ribbon') o += '<path class="cc-deco" d="M' + L + ' ' + mid + 'H' + R + '" stroke="#F6A39C" stroke-width="' + (h * 0.22).toFixed(1) + '"/>';
    if (kind === 'leather' || kind === 'denim') o += '<path class="cc-deco" d="M' + (L + 3) + ' ' + (y + 4) + 'H' + (R - 3) + 'M' + (L + 3) + ' ' + (y + h - 4) + 'H' + (R - 3) + '" stroke="' + (kind === 'denim' ? '#F2B33D' : '#F3E2C4') + '" stroke-width="1.6" stroke-dasharray="4 3"/>';
    if (kind === 'yarn' || kind === 'cord' || kind === 'braid') { var p = ''; for (var q = L + 3; q < R - 2; q += h * 0.55) p += 'M' + q.toFixed(1) + ' ' + (y + 2) + 'l' + (h * 0.4).toFixed(1) + ' ' + (h - 4); o += '<path class="cc-deco" d="' + p + '" stroke="rgba(255,255,255,.45)" stroke-width="' + (kind === 'braid' ? 2.4 : 1.8) + '"/>'; }
    if (kind === 'felt') { var f = ''; for (var u = L + 5; u < R - 3; u += 9) f += '<circle cx="' + u.toFixed(1) + '" cy="' + (y + 4 + ((u * 7) % (h - 8))).toFixed(1) + '" r="1.2"/>'; o += '<g class="cc-deco" fill="rgba(255,255,255,.55)">' + f + '</g>'; }
    if (kind === 'lace') o += '<path class="cc-deco" d="M' + L + ' ' + (y + h - 3) + 'H' + R + 'M' + L + ' ' + (y + 3) + 'H' + R + '" stroke="#B9A98A" stroke-width="2" stroke-dasharray="1.5 4" stroke-linecap="round"/>';
    if (kind === 'elastic') { var e2 = ''; for (var w = L + 3; w < R - 2; w += 5) e2 += 'M' + w.toFixed(1) + ' ' + (y + 3) + 'V' + (y + h - 3); o += '<path class="cc-deco" d="' + e2 + '" stroke="rgba(255,255,255,.3)" stroke-width="1.4"/>'; }
    return o;
  },
  _ruler: function (g, cut) {
    var st = this.st, r = st.round, x = g.x, ppc = g.ppc, C = CmCutterCore, o = '', y = g.yR, H = g.RH, every = this._every();
    var broken = r.kind === 'broken', from = broken ? r.b : 0, Z = broken ? 0 : st.zero, mg = 0.45, L = broken ? x(r.b) : Math.max(1, x(Z - mg)), R = x(Z + st.len + mg);
    if (broken) { var jag = ''; for (var j = 0; j <= 4; j++) jag += (j ? 'L' : 'M') + (L - (j % 2 ? 5 : 0)) + ' ' + (y + j * H / 4); o += '<path class="cc-ruler" d="' + jag + 'L' + R + ' ' + (y + H) + 'L' + R + ' ' + y + 'Z"/>'; }
    else o += '<rect class="cc-ruler" data-zero="' + Z + '" x="' + L.toFixed(1) + '" y="' + y + '" width="' + (R - L).toFixed(1) + '" height="' + H + '" rx="4"/>';
    var V = st.verdict, help = st.help && !st.done;
    /* air snips light the empty spaces on the ruler */
    if (cut && cut.air && !broken) for (var a = 0; a < cut.air; a++) o += '<rect class="cc-airspace" x="' + (x(Z + a) + 1).toFixed(1) + '" y="' + (y + 2) + '" width="' + (ppc - 2).toFixed(1) + '" height="' + (H * 0.45).toFixed(1) + '"/>';
    var tight = ppc < 24;
    for (var i = from; i <= st.len; i++) {
      var tx = x(Z + i), long = i % 5 === 0, tl = g.wide ? (long ? 20 : 13) : (long ? 16 : 10), glow = help && i === 0 && V && (V.kind === 'inside' || V.kind === 'before');
      o += '<path class="cc-tick' + (glow ? ' is-glow' : '') + '" data-tick="' + i + '" d="M' + tx.toFixed(1) + ' ' + y + 'v' + tl + '"/>';
      if (every || i % 5 === 0) o += '<text class="cc-num' + (glow ? ' is-glow' : '') + '" data-num="' + i + '" x="' + tx.toFixed(1) + '" y="' + (y + H - (g.wide ? 10 : 8)) + '" font-size="' + g.num + '"' + (tight && i >= 10 ? ' textLength="' + (ppc - 3).toFixed(1) + '" lengthAdjust="spacingAndGlyphs"' : '') + '>' + i + '</text>';
    }
    return o;
  },
  _tag: function (g, cx, n, kind, wrong) {
    var w = n >= 10 ? 40 : 32, h = g.wide ? 32 : 28, y = g.yT + 6;
    return '<g class="cc-tag is-' + kind + (wrong ? ' is-wrong' : '') + '" data-tag="' + kind + '"><path d="M' + cx.toFixed(1) + ' ' + (y - 6) + 'l-5 6h10z"/><rect x="' + (cx - w / 2).toFixed(1) + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8"/><text x="' + cx.toFixed(1) + '" y="' + (y + h * 0.72).toFixed(1) + '">' + n + '</text></g>';
  },

  /* ---------- the rack of rulers (pick rounds) ---------- */
  _paintRack: function (g) {
    var st = this.st, self = this, el = this._qs('.cc-rack'); el.innerHTML = '';
    if (!st.rack || st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    st.rack.forEach(function (len, i) {
      var m = 0.45 * g.ppc, w = Math.round(len * g.ppc + 2 * m + 6), h = g.wide ? 40 : 30, o = '<rect class="cc-ruler" x="3" y="3" width="' + (len * g.ppc + 2 * m).toFixed(1) + '" height="' + (h - 6) + '" rx="3"/>';
      for (var t = 0; t <= len; t++) o += '<path class="cc-tick" d="M' + (3 + m + t * g.ppc).toFixed(1) + ' 3v' + (t % 5 ? 7 : 11) + '"/>';
      o += '<text class="cc-num" x="' + (3 + m + len * g.ppc - 4).toFixed(1) + '" y="' + (h - 7) + '" font-size="' + (g.wide ? 16 : 14) + '" text-anchor="end">' + len + '</text>';
      var b = self._btn('cc-rackbtn' + (st.picked === i ? ' is-on' : ''), 'rack-' + i, self._t('aRack', { n: len }), '<svg class="cc-art" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + o + '</svg>');
      b.addEventListener('click', function () { self._pick(i); });
      el.appendChild(b);
    });
  },
  _paintBar: function () {
    var st = this.st, self = this, el = this._qs('.cc-bar'); el.innerHTML = '';
    if (st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var c = this._btn('cc-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._t('checkBtn') + '</span>');
    c.addEventListener('click', function () { self._check(); });
    el.appendChild(c);
  },
  /* ---------- the order rack: every finished strip with its length tag ---------- */
  _paintOrders: function (g) {
    var el = this._qs('.cc-orders'), self = this; el.innerHTML = '';
    if (!this._orders.length) { el.style.display = 'none'; return; }
    el.style.display = '';
    var cur = this.st && this.st.done ? this.st.level + '.' + this.st.k : null, u = g.wide ? 5 : 3;
    var o = '', x = 6, h = g.wide ? 44 : 38;
    this._orders.forEach(function (it) {
      var w = Math.max(30, it.n * u) + 6;
      o += '<g class="cc-order' + (it.id === cur ? ' is-new' : '') + '" transform="translate(' + x + ' 0)"><path class="cc-hook" d="M' + (w / 2) + ' 2v6"/><rect x="0" y="8" width="' + w + '" height="10" rx="2" fill="' + self.STRIP_FILL[it.strip] + '"' + (it.strip === 'lace' ? ' stroke="#B9A98A"' : '') + '/><text x="' + (w / 2) + '" y="' + (h - 4) + '">' + it.n + '</text></g>';
      x += w + 6;
    });
    el.innerHTML = '<svg class="cc-art" width="' + x + '" height="' + h + '" viewBox="0 0 ' + x + ' ' + h + '" aria-hidden="true"><path class="cc-rail" d="M0 2H' + x + '"/>' + o + '</svg><span class="cc-ordersu">' + this._t('unit') + '</span>';
  },

  /* ---------------- the hand ---------------- */
  _clear: function () { this._view.note = ''; },
  _slide: function (z) { if (CmCutterCore.slide(this.st, z)) { this._clear(); this.api.sound(420); this._paint(); return true; } return false; },
  _read: function (n) { if (CmCutterCore.read(this.st, n)) { this._clear(); this.api.sound(700); this._paint(); return true; } return false; },
  _stitch: function (k) { if (CmCutterCore.stitch(this.st, k)) { this._clear(); this.api.sound(620); this._paint(); return true; } return false; },
  _pick: function (i) { if (CmCutterCore.pick(this.st, i)) { this._clear(); this.api.sound(520); this._paint(); return true; } return false; },
  _keyboard: function (e) {
    var st = this.st; if (!st) return;
    var k = e.key;
    if ((k === 'ArrowLeft' || k === 'ArrowRight') && st.zero != null && st.round.kind !== 'broken') { e.preventDefault(); this._slide(st.zero + (k === 'ArrowRight' ? 1 : -1)); }
    else if (/^[0-9]$/.test(k) && st.round.kind !== 'broken') { e.preventDefault(); this._digits = (this._digits + k).slice(-2); var n = +this._digits; if (st.len != null && n > st.len) { this._digits = k; n = +k; } this._read(n); var self = this; this._later(function () { self._digits = ''; }, 900); }
    else if (k === 'Enter' && e.target === this._wrap) { e.preventDefault(); this._check(); }
  },
  _check: function () {
    var st = this.st, v = this._view, C = CmCutterCore; if (st.done) return;
    var r = C.check(st);
    if (r.result === 'no') return;
    if (r.result === 'note') { v.note = this._t(r.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    this._snips(st.cut);
    if (r.result === 'ok') { this._success(); return; }
    var key = C.hint(st);
    v.soft = false; v.note = this._t(key, { n: st.cut.pieces });
    this._paint();
    this.api.announce(this._t('aJar', { n: st.cut.pieces }) + '. ' + v.note);
    this.api.sound(240);
  },
  /* a crisp snip per centimetre, a plink per piece */
  _snips: function (c) {
    if (this.FAST || !c) return;
    var self = this, n = c.pieces + c.air;
    for (var i = 0; i < n; i++) (function (i) { self._later(function () { self.api.sound(i < c.air ? 1400 : 2200); }, i * self.SNIP_MS); })(i);
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, n = CmCutterCore.length(r), msg = this._t(CmCutterCore.okKey(r), { n: n }), id = st.level + '.' + st.k;
    v.note = ''; v.win = true;
    if (!this._orders.some(function (x) { return x.id === id; })) this._orders.push({ id: id, strip: r.strip, n: n });
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg);
    var self = this;
    this._later(function () { self.api.sound(988); }, this.FAST ? 0 : n * this.SNIP_MS);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  },

  /* the band: a drag slides the ruler by whole centimetres; a tap reads the nearest numeral (or stitches a space) */
  _dragStart: function (e) {
    if (e.button != null && e.button !== 0) return;
    var self = this, st = this.st, sx = e.clientX, z0 = st.zero, moved = false;
    e.preventDefault();
    var bandLeft = function () { var b = self._qs('.cc-tablesvg'); return b ? b.getBoundingClientRect().left : 0; };
    var mv = function (ev) {
      if (st.round.kind === 'broken' || st.len == null) return;
      var dx = ev.clientX - sx;
      if (!moved && Math.abs(dx) < 6) return;
      moved = true; ev.preventDefault();
      self._slide(z0 + Math.round(dx / self._g.ppc));
    };
    var up = function (ev) {
      self._endDrag();
      if (moved) return;
      var g = self._g, t = st.w0 + (ev.clientX - bandLeft() - g.pad) / g.ppc;
      if (st.round.kind === 'broken') { self._stitch(Math.floor(t)); return; }
      if (st.len == null) return;
      var n = Math.round(t - st.zero);
      if (n >= 0 && n <= st.len) self._read(n);
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d) return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  }
};

function injectCmCutterCSS() {
  if (typeof document === 'undefined' || document.getElementById('cc-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.cc-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .cc-wrap:focus{outline:none;}'
  + '.cc-head{display:flex;align-items:flex-end;justify-content:flex-end;gap:10px;align-self:stretch;padding-right:4px;}'
  + '.cc-tildy{display:block;width:104px;height:104px;object-fit:contain;} .cc-wrap.is-narrow .cc-tildy{width:72px;height:72px;} .cc-tildy.is-happy{animation:ccShake .5s ease-in-out 2;}'
  + '.cc-says{align-self:center;padding:4px 10px;border-radius:12px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';} .cc-wrap.is-narrow .cc-says{font-size:18px;}'
  + '.cc-jar{fill:rgba(220,240,240,.55);stroke:#7FA9A8;stroke-width:3;} .cc-lid{fill:#9AB8B1;} .cc-piece{animation:ccDrop .25s ease-out both;} .cc-jarn{font-family:' + H + ';font-weight:800;font-size:26px;fill:' + INK + ';text-anchor:middle;paint-order:stroke;stroke:#fff;stroke-width:4px;} .cc-jarsvg.is-glint .cc-jar{stroke:#2E9C88;stroke-width:4;}'
  + '.cc-table{position:relative;}'
  + '.cc-tablesvg{position:absolute;left:0;top:0;overflow:hidden;}'
  + '.cc-wood{fill:#E9D6B4;stroke:#C9A877;stroke-width:2;} .cc-dot{fill:#B8925C;}'
  + '.cc-strip.is-cut{animation:ccFill .2s ease-out both;} .is-fast .cc-strip,.is-fast .cc-piece{animation:none !important;}'
  + '.cc-deco{fill:none;pointer-events:none;}'
  + '.cc-left{fill:none;stroke:#F2784B;stroke-width:3;stroke-dasharray:6 4;}'
  + '.cc-puff circle{fill:#F7D9CB;stroke:#F2784B;stroke-width:1.5;}'
  + '.cc-ruler{fill:#F6E7C8;stroke:#B08550;stroke-width:2;}'
  + '.cc-tick{stroke:#6B4E2E;stroke-width:2;fill:none;} .cc-tick.is-glow{stroke:#2E9C88;stroke-width:4;}'
  + '.cc-num{font-family:' + B + ';font-weight:800;fill:' + INK + ';text-anchor:middle;} .cc-num.is-glow{fill:#146B5E;}'
  + '.cc-airspace{fill:#F2784B;opacity:.55;}'
  + '.cc-stitch{stroke:#C4522F;stroke-width:3;stroke-linecap:round;fill:none;} .cc-faint{font-family:' + B + ';font-weight:800;font-size:14px;fill:#146B5E;opacity:.75;text-anchor:middle;}'
  + '.cc-tag path,.cc-tag rect{fill:#F2784B;} .cc-tag text{font-family:' + H + ';font-weight:800;font-size:20px;fill:#fff;text-anchor:middle;} .cc-tag.is-count path,.cc-tag.is-count rect{fill:#146B5E;} .cc-tag.is-wrong rect{fill:#C4522F;}'
  + '.cc-pin circle{fill:#2E9C88;stroke:#fff;stroke-width:2;} .cc-pinline{stroke:#2E9C88;stroke-width:2.5;stroke-dasharray:5 4;fill:none;}'
  + '.cc-blade{fill:#9AA4AE;stroke:#5C6670;stroke-width:1.2;} .cc-carriage{fill:#F2784B;stroke:#C4522F;stroke-width:1.5;}'
  + '.cc-band{position:absolute;left:0;right:0;cursor:grab;touch-action:none;}'
  + '.cc-cat{position:absolute;width:96px;height:96px;object-fit:contain;pointer-events:none;animation:ccCat 1.2s ease-in-out both;} .cc-wrap.is-narrow .cc-cat{width:72px;height:72px;}'
  + '.cc-rack{display:flex;flex-direction:column;align-items:flex-start;gap:6px;align-self:stretch;padding-left:4px;}'
  + '.cc-rackbtn{display:flex;align-items:center;min-height:48px;padding:3px 6px;border:0;border-radius:10px;background:#FFFDF6;box-shadow:inset 0 0 0 2px #CDBFA4,0 3px 0 #CDBFA4;cursor:pointer;} .cc-rackbtn.is-on{box-shadow:inset 0 0 0 3px #146B5E,0 3px 0 #146B5E;background:#EAF6F2;} .cc-rackbtn svg{display:block;}'
  + '.cc-wrap.is-narrow .cc-rackbtn{min-height:44px;padding:2px 4px;} .cc-wrap.is-narrow{gap:6px;} .cc-wrap.is-narrow .cc-rack{gap:4px;}'
  + '.cc-bar{display:flex;justify-content:center;} .cc-go{display:flex;align-items:center;justify-content:center;gap:8px;min-width:180px;height:48px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;box-shadow:0 3px 0 #0E4D44;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .cc-go svg{width:22px;height:22px;display:block;}'
  + '.cc-wrap.is-narrow .cc-go{height:44px;font-size:20px;}'
  + '.cc-note{margin:0;max-width:640px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .cc-wrap.is-narrow .cc-note{font-size:16px;line-height:1.25;} .cc-note:empty{display:none;} .cc-note.is-hint{color:#9A3D1C;}'
  + '.cc-orders{position:relative;display:flex;align-items:flex-start;max-width:100%;overflow:hidden;padding:4px 8px 2px 34px;border-radius:12px;background:#F3EBDD;box-shadow:inset 0 0 0 2px #CDBFA4;box-sizing:border-box;}'
  + '.cc-rail{stroke:#8B6A45;stroke-width:3;} .cc-hook{stroke:#8B6A45;stroke-width:1.5;} .cc-order text{font-family:' + H + ';font-weight:800;font-size:16px;fill:' + INK + ';text-anchor:middle;} .cc-order.is-new text{fill:#C4522F;}'
  + '.cc-ordersu{position:absolute;left:8px;top:16px;font-family:' + B + ';font-weight:800;font-size:14px;color:#146B5E;}'
  + '.cc-rackbtn:focus-visible,.cc-go:focus-visible{outline:3px solid #2E5BD6;outline-offset:2px;}'
  + '@keyframes ccDrop{0%{opacity:0;transform:translateY(-10px)}100%{opacity:1;transform:none}}'
  + '@keyframes ccFill{0%{opacity:.4}100%{opacity:1}}'
  + '@keyframes ccShake{0%,100%{transform:none}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}'
  + '@keyframes ccCat{0%{opacity:0;transform:translateX(-20px)}25%{opacity:1;transform:none}45%{transform:translateX(10px)}70%{opacity:1;transform:none}100%{opacity:0;transform:translateX(-20px)}}'
  + '@media (prefers-reduced-motion:reduce){.cc-cat,.cc-piece,.cc-strip,.cc-tildy{animation:none !important;}}';
  var st = document.createElement('style'); st.id = 'cc-css'; st.textContent = css; document.head.appendChild(st);
}
if (typeof window !== 'undefined') window.CmCutterActivity = CmCutterActivity;
