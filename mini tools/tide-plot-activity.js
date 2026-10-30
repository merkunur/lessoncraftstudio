/* =====================================================================
   tide-plot-activity.js — ACTIVITY #167 of the one-by-one rebuild:
   "Shelly's Tide-Line — Measurement Line Plots" (2.MD.D.9)
   → THE TIDE YOU PUSH. Model: tide-plot-core.js. Design:
   docs/activities-rebuild/designs/167-line-plot.md
   ---------------------------------------------------------------------
   A line plot drawn on a beach. Two wave handles push the sea in from
   the left and right (they stop only in the gaps between numbers) and a
   buoy raises the sea level row by row; covered shells turn blue but stay
   visible. The child keeps only the shells the question is about dry,
   then answers on a pebble (or, for the most common length, on the sand).
   In the measure rounds a real shell is slid along a ruler (it does not
   always arrive at 0) and dropped on its length as an X. Next appears
   .OK_MS after success.
   ===================================================================== */
var TidePlotActivity = {
  id: 'tide-plot-activity',
  THEMES: ['beach'],
  /* the drawn apparatus (beach, water, handles, X's, board, ruler): declared for the hierarchy audit */
  apparatusClasses: ['tp-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Shelly's Tide-Line","de":"Shellys Gezeitenlinie","fr":"Shelly et la ligne de marée","es":"Shelly y la línea de marea","pt":"Shelly e a linha da maré","it":"Shelly e la linea di marea","nl":"Shelly’s getijdenlijn","sv":"Snäckis strandlinje","da":"Shellys tidevandslinje","no":"Shellys tidevannslinje","fi":"Shellyn rantaviiva"},
    instruction: {"en":"Push the sea in from the sides, or raise the sea level, until only the shells the question is about stay dry. Then answer. In the measuring rounds, slide each shell to the 0 of the ruler, read where it ends, and drop it on its length.","de":"Schieb das Meer von den Seiten herein oder lass es steigen, bis nur noch die Muscheln trocken sind, um die es in der Frage geht. Dann antworte. Beim Messen schiebst du jede Muschel an die 0 des Lineals, liest ab, wo sie endet, und legst sie auf ihre Länge.","fr":"Pousse la mer depuis les côtés, ou fais monter son niveau, jusqu’à ce que seuls les coquillages de la question restent au sec. Puis réponds. Pour mesurer, fais glisser chaque coquillage jusqu’au 0 de la règle, lis où il se termine et pose-le sur sa longueur.","es":"Empuja el mar desde los lados o sube su nivel hasta que solo queden secas las conchas de la pregunta. Luego contesta. Para medir, desliza cada concha hasta el 0 de la regla, lee dónde termina y suéltala sobre su longitud.","pt":"Empurre o mar pelos lados ou suba o nível dele até que só fiquem secas as conchas da pergunta. Depois responda. Para medir, deslize cada concha até o 0 da régua, veja onde ela termina e solte-a sobre o comprimento dela.","it":"Spingi il mare dai lati o alza il suo livello finché restano all’asciutto solo le conchiglie della domanda. Poi rispondi. Per misurare, fai scorrere ogni conchiglia fino allo 0 del righello, leggi dove finisce e lasciala sulla sua lunghezza.","nl":"Duw de zee van opzij naar binnen of laat het water stijgen, tot alleen de schelpen uit de vraag nog droog liggen. Geef dan antwoord. Bij het meten schuif je elke schelp naar de 0 van de liniaal, lees je af waar hij eindigt en leg je hem op zijn lengte.","sv":"Skjut in havet från sidorna eller höj vattnet tills bara snäckorna som frågan gäller ligger torrt. Svara sedan. När du mäter skjuter du varje snäcka till linjalens 0, läser av var den slutar och släpper den på sin längd.","da":"Skub havet ind fra siderne, eller hæv vandet, til kun de skaller, spørgsmålet handler om, ligger tørt. Svar så. Når du måler, skubber du hver skal hen til linealens 0, aflæser, hvor den slutter, og slipper den på sin længde.","no":"Skyv havet inn fra sidene, eller hev vannet, til bare skjellene spørsmålet handler om, ligger tørt. Svar så. Når du måler, skyver du hvert skjell til 0 på linjalen, leser av hvor det slutter, og slipper det på lengden sin.","fi":"Työnnä merta sisään sivuilta tai nosta vettä, kunnes vain kysymyksen simpukat jäävät kuiville. Vastaa sitten. Mitatessa liu’uta jokainen simpukka viivaimen nollaan, katso, mihin se päättyy, ja pudota se pituutensa kohdalle."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    lRead: {"en":"Read the tide-line","de":"Die Gezeitenlinie lesen","fr":"Lire la ligne de marée","es":"Leer la línea de marea","pt":"Ler a linha da maré","it":"Leggere la linea di marea","nl":"De getijdenlijn aflezen","sv":"Läs av strandlinjen","da":"Aflæs tidevandslinjen","no":"Les av tidevannslinja","fi":"Lue rantaviiva"},
    lMeasure: {"en":"Measure and plot","de":"Messen und eintragen","fr":"Mesurer et placer","es":"Medir y anotar","pt":"Medir e marcar","it":"Misurare e segnare","nl":"Meten en uitzetten","sv":"Mät och sätt ut","da":"Mål og sæt ind","no":"Mål og sett inn","fi":"Mittaa ja merkitse"},
    lHalves: {"en":"Halves","de":"Halbe Zentimeter","fr":"Demi-centimètres","es":"Medios centímetros","pt":"Meios centímetros","it":"Mezzi centimetri","nl":"Halve centimeters","sv":"Halva centimeter","da":"Halve centimeter","no":"Halve centimeter","fi":"Puolikkaat senttimetrit"},
    setFeet: {"en":"Footprints","de":"Fußspuren","fr":"Empreintes","es":"Huellas","pt":"Pegadas","it":"Impronte","nl":"Voetstappen","sv":"Fotspår","da":"Fodspor","no":"Fotspor","fi":"Jalanjäljet"},
    fOn: {"en":"On","de":"An","fr":"Oui","es":"Sí","pt":"Sim","it":"Sì","nl":"Aan","sv":"På","da":"Til","no":"På","fi":"Päällä"},
    fOff: {"en":"Off","de":"Aus","fr":"Non","es":"No","pt":"Não","it":"No","nl":"Uit","sv":"Av","da":"Fra","no":"Av","fi":"Pois"},
    qAt: {"en":"How many shells are {n} cm long?","de":"Wie viele Muscheln sind {n} cm lang?","fr":"Combien de coquillages mesurent {n} cm ?","es":"¿Cuántas conchas miden {n} cm?","pt":"Quantas conchas medem {n} cm?","it":"Quante conchiglie sono lunghe {n} cm?","nl":"Hoeveel schelpen zijn {n} cm lang?","sv":"Hur många snäckor är {n} cm långa?","da":"Hvor mange skaller er {n} cm lange?","no":"Hvor mange skjell er {n} cm lange?","fi":"Montako simpukkaa on {n} cm pitkiä?"},
    qLonger: {"en":"How many shells are longer than {n} cm?","de":"Wie viele Muscheln sind länger als {n} cm?","fr":"Combien de coquillages mesurent plus de {n} cm ?","es":"¿Cuántas conchas miden más de {n} cm?","pt":"Quantas conchas medem mais de {n} cm?","it":"Quante conchiglie sono più lunghe di {n} cm?","nl":"Hoeveel schelpen zijn langer dan {n} cm?","sv":"Hur många snäckor är längre än {n} cm?","da":"Hvor mange skaller er længere end {n} cm?","no":"Hvor mange skjell er lengre enn {n} cm?","fi":"Montako simpukkaa on pidempiä kuin {n} cm?"},
    qShorter: {"en":"How many shells are shorter than {n} cm?","de":"Wie viele Muscheln sind kürzer als {n} cm?","fr":"Combien de coquillages mesurent moins de {n} cm ?","es":"¿Cuántas conchas miden menos de {n} cm?","pt":"Quantas conchas medem menos de {n} cm?","it":"Quante conchiglie sono più corte di {n} cm?","nl":"Hoeveel schelpen zijn korter dan {n} cm?","sv":"Hur många snäckor är kortare än {n} cm?","da":"Hvor mange skaller er kortere end {n} cm?","no":"Hvor mange skjell er kortere enn {n} cm?","fi":"Montako simpukkaa on lyhyempiä kuin {n} cm?"},
    qMode: {"en":"Which length is the most common? Tap it on a pebble.","de":"Welche Länge kommt am häufigsten vor? Tippe sie auf einem Kieselstein an.","fr":"Quelle longueur revient le plus souvent ? Touche-la sur un galet.","es":"¿Qué longitud se repite más? Tócala en una piedrita.","pt":"Qual comprimento aparece mais vezes? Toque nele numa pedrinha.","it":"Quale lunghezza compare più spesso? Toccala su un sassolino.","nl":"Welke lengte komt het vaakst voor? Tik hem aan op een kiezelsteen.","sv":"Vilken längd är vanligast? Tryck på den på en sten.","da":"Hvilken længde er der flest af? Tryk på den på en sten.","no":"Hvilken lengde er det flest av? Trykk på den på en stein.","fi":"Mikä pituus on yleisin? Napauta sen kiveä."},
    qRange: {"en":"How much longer is the longest shell than the shortest? Answer in cm.","de":"Wie viel länger ist die längste Muschel als die kürzeste? Antworte in cm.","fr":"De combien le plus long coquillage est-il plus long que le plus court ? Réponds en cm.","es":"¿Cuánto más larga es la concha más larga que la más corta? Contesta en cm.","pt":"Quantos centímetros a concha mais comprida tem a mais que a mais curta? Responda em cm.","it":"Di quanto la conchiglia più lunga è più lunga della più corta? Rispondi in cm.","nl":"Hoeveel langer is de langste schelp dan de kortste? Antwoord in cm.","sv":"Hur mycket längre är den längsta snäckan än den kortaste? Svara i cm.","da":"Hvor meget længere er den længste skal end den korteste? Svar i cm.","no":"Hvor mye lengre er det lengste skjellet enn det korteste? Svar i cm.","fi":"Kuinka paljon pidempi pisin simpukka on kuin lyhyin? Vastaa senttimetreinä."},
    qMore: {"en":"How many more shells are {a} cm long than {b} cm long?","de":"Wie viele Muscheln mehr gibt es mit {a} cm als mit {b} cm?","fr":"Combien y a-t-il de coquillages de {a} cm de plus que de coquillages de {b} cm ?","es":"¿Cuántas conchas más miden {a} cm que {b} cm?","pt":"Há quantas conchas de {a} cm a mais do que de {b} cm?","it":"Quante conchiglie lunghe {a} cm ci sono in più rispetto a quelle lunghe {b} cm?","nl":"Hoeveel schelpen van {a} cm zijn er meer dan van {b} cm?","sv":"Hur många fler snäckor är {a} cm långa än {b} cm långa?","da":"Hvor mange flere skaller er {a} cm lange end {b} cm lange?","no":"Hvor mange flere skjell er {a} cm lange enn {b} cm lange?","fi":"Montako {a} cm:n simpukkaa on enemmän kuin {b} cm:n simpukoita?"},
    qMeasure2: {"en":"Measure each shell from the 0 of the ruler. Then drop it on its length on the tide-line.","de":"Miss jede Muschel ab der 0 des Lineals. Dann leg sie auf ihre Länge auf der Gezeitenlinie.","fr":"Mesure chaque coquillage à partir du 0 de la règle. Puis pose-le sur sa longueur sur la ligne de marée.","es":"Mide cada concha desde el 0 de la regla. Luego suéltala sobre su longitud en la línea de marea.","pt":"Meça cada concha a partir do 0 da régua. Depois solte-a sobre o comprimento dela na linha da maré.","it":"Misura ogni conchiglia dallo 0 del righello. Poi lasciala sulla sua lunghezza sulla linea di marea.","nl":"Meet elke schelp vanaf de 0 van de liniaal. Leg hem dan op zijn lengte op de getijdenlijn.","sv":"Mät varje snäcka från linjalens 0. Släpp den sedan på sin längd på strandlinjen.","da":"Mål hver skal fra linealens 0. Slip den så på sin længde på tidevandslinjen.","no":"Mål hvert skjell fra 0 på linjalen. Slipp det så på lengden sin på tidevannslinja.","fi":"Mittaa jokainen simpukka viivaimen nollasta. Pudota se sitten pituutensa kohdalle rantaviivalle."},
    qMeasure1: {"en":"Measure the shell from the 0 of the ruler. Then drop it on its length on the tide-line.","de":"Miss die Muschel ab der 0 des Lineals. Dann leg sie auf ihre Länge auf der Gezeitenlinie.","fr":"Mesure le coquillage à partir du 0 de la règle. Puis pose-le sur sa longueur sur la ligne de marée.","es":"Mide la concha desde el 0 de la regla. Luego suéltala sobre su longitud en la línea de marea.","pt":"Meça a concha a partir do 0 da régua. Depois solte-a sobre o comprimento dela na linha da maré.","it":"Misura la conchiglia dallo 0 del righello. Poi lasciala sulla sua lunghezza sulla linea di marea.","nl":"Meet de schelp vanaf de 0 van de liniaal. Leg hem dan op zijn lengte op de getijdenlijn.","sv":"Mät snäckan från linjalens 0. Släpp den sedan på sin längd på strandlinjen.","da":"Mål skallen fra linealens 0. Slip den så på sin længde på tidevandslinjen.","no":"Mål skjellet fra 0 på linjalen. Slipp det så på lengden sin på tidevannslinja.","fi":"Mittaa simpukka viivaimen nollasta. Pudota se sitten pituutensa kohdalle rantaviivalle."},
    hintStart: {"en":"Push the sea in, or raise it, so only the shells you need stay dry.","de":"Schieb das Meer herein oder lass es steigen, sodass nur die Muscheln trocken bleiben, die du brauchst.","fr":"Pousse la mer ou fais-la monter pour que seuls les coquillages utiles restent au sec.","es":"Empuja el mar o súbelo para que solo queden secas las conchas que necesitas.","pt":"Empurre o mar ou suba o nível para que só fiquem secas as conchas de que você precisa.","it":"Spingi il mare o alzalo, così restano all’asciutto solo le conchiglie che ti servono.","nl":"Duw de zee naar binnen of laat het water stijgen, zodat alleen de schelpen die je nodig hebt droog blijven.","sv":"Skjut in havet eller höj det, så att bara snäckorna du behöver ligger torrt.","da":"Skub havet ind, eller hæv det, så kun de skaller, du skal bruge, ligger tørt.","no":"Skyv havet inn, eller hev det, så bare skjellene du trenger, ligger tørt.","fi":"Työnnä merta sisään tai nosta sitä niin, että vain tarvitsemasi simpukat jäävät kuiville."},
    hintAnswer: {"en":"The tide is right. Now tap the answer.","de":"Das Wasser steht richtig. Tippe jetzt die Antwort an.","fr":"La mer est bien placée. Touche maintenant la réponse.","es":"El mar está bien. Ahora toca la respuesta.","pt":"O mar está certo. Agora toque na resposta.","it":"Il mare è al punto giusto. Ora tocca la risposta.","nl":"Het water staat goed. Tik nu het antwoord aan.","sv":"Vattnet står rätt. Tryck nu på svaret.","da":"Vandet står rigtigt. Tryk nu på svaret.","no":"Vannet står riktig. Trykk nå på svaret.","fi":"Vesi on oikeassa kohdassa. Napauta nyt vastausta."},
    hintAgain: {"en":"Change something first, then press Check.","de":"Ändere zuerst etwas, dann tippe auf Prüfen.","fr":"Change d’abord quelque chose, puis appuie sur Vérifier.","es":"Primero cambia algo y luego toca Comprobar.","pt":"Primeiro mude alguma coisa e depois toque em Verificar.","it":"Prima cambia qualcosa, poi premi Verifica.","nl":"Verander eerst iets en tik dan op Controleer.","sv":"Ändra något först och tryck sedan på Kontrollera.","da":"Lav først noget om, og tryk så på Tjek.","no":"Endre noe først, og trykk så på Sjekk.","fi":"Muuta ensin jotakin ja paina sitten Tarkista."},
    hintMeasureFirst: {"en":"Measure the shell, then drop it on the tide-line.","de":"Miss die Muschel und leg sie dann auf die Gezeitenlinie.","fr":"Mesure le coquillage, puis pose-le sur la ligne de marée.","es":"Mide la concha y luego suéltala en la línea de marea.","pt":"Meça a concha e depois solte-a na linha da maré.","it":"Misura la conchiglia, poi lasciala sulla linea di marea.","nl":"Meet de schelp en leg hem dan op de getijdenlijn.","sv":"Mät snäckan och släpp den sedan på strandlinjen.","da":"Mål skallen, og slip den så på tidevandslinjen.","no":"Mål skjellet, og slipp det så på tidevannslinja.","fi":"Mittaa simpukka ja pudota se sitten rantaviivalle."},
    hintNextShell: {"en":"Now measure the next shell and drop it too.","de":"Miss jetzt die nächste Muschel und leg sie auch hin.","fr":"Mesure maintenant le coquillage suivant et pose-le aussi.","es":"Ahora mide la siguiente concha y suéltala también.","pt":"Agora meça a próxima concha e solte-a também.","it":"Ora misura la conchiglia successiva e lascia anche questa.","nl":"Meet nu de volgende schelp en leg die ook neer.","sv":"Mät nu nästa snäcka och släpp den också.","da":"Mål nu den næste skal, og slip også den.","no":"Mål nå det neste skjellet, og slipp også det.","fi":"Mittaa nyt seuraava simpukka ja pudota sekin."},
    tideAt: {"en":"Keep only the {n} cm shells dry: bring both shores up to them.","de":"Lass nur die {n}-cm-Muscheln trocken: Schieb beide Ufer bis an sie heran.","fr":"Garde au sec seulement les coquillages de {n} cm : amène les deux rivages jusqu’à eux.","es":"Deja secas solo las conchas de {n} cm: acerca las dos orillas hasta ellas.","pt":"Deixe secas só as conchas de {n} cm: traga as duas margens até elas.","it":"Lascia all’asciutto solo le conchiglie di {n} cm: porta le due rive fino a loro.","nl":"Houd alleen de schelpen van {n} cm droog: schuif beide oevers tot aan die schelpen.","sv":"Låt bara snäckorna på {n} cm ligga torrt: skjut in båda stränderna fram till dem.","da":"Lad kun skallerne på {n} cm ligge tørt: skub begge kyster helt hen til dem.","no":"La bare skjellene på {n} cm ligge tørt: skyv begge strendene helt bort til dem.","fi":"Jätä kuiville vain {n} cm:n simpukat: tuo molemmat rannat niiden viereen."},
    tideLonger: {"en":"Longer than {n} cm means after the {n}: push the sea over the {n} too.","de":"Länger als {n} cm heißt nach der {n}: Schieb das Meer auch über die {n}.","fr":"Plus de {n} cm, c’est après le {n} : pousse la mer aussi sur le {n}.","es":"Más de {n} cm quiere decir después del {n}: empuja el mar también sobre el {n}.","pt":"Mais de {n} cm quer dizer depois do {n}: empurre o mar também sobre o {n}.","it":"Più lunghe di {n} cm vuol dire dopo il {n}: spingi il mare anche sopra il {n}.","nl":"Langer dan {n} cm betekent na de {n}: duw de zee ook over de {n}.","sv":"Längre än {n} cm betyder efter {n}: skjut havet över {n} också.","da":"Længere end {n} cm betyder efter {n}: skub også havet ind over {n}.","no":"Lengre enn {n} cm betyr etter {n}: skyv havet inn over {n} også.","fi":"Pidempi kuin {n} cm tarkoittaa luvun {n} jälkeen: työnnä meri myös luvun {n} päälle."},
    tideShorter: {"en":"Shorter than {n} cm means before the {n}: push the sea over the {n} too.","de":"Kürzer als {n} cm heißt vor der {n}: Schieb das Meer auch über die {n}.","fr":"Moins de {n} cm, c’est avant le {n} : pousse la mer aussi sur le {n}.","es":"Menos de {n} cm quiere decir antes del {n}: empuja el mar también sobre el {n}.","pt":"Menos de {n} cm quer dizer antes do {n}: empurre o mar também sobre o {n}.","it":"Più corte di {n} cm vuol dire prima del {n}: spingi il mare anche sopra il {n}.","nl":"Korter dan {n} cm betekent voor de {n}: duw de zee ook over de {n}.","sv":"Kortare än {n} cm betyder före {n}: skjut havet över {n} också.","da":"Kortere end {n} cm betyder før {n}: skub også havet ind over {n}.","no":"Kortere enn {n} cm betyr før {n}: skyv havet inn over {n} også.","fi":"Lyhyempi kuin {n} cm tarkoittaa ennen lukua {n}: työnnä meri myös luvun {n} päälle."},
    tideMode: {"en":"Raise the sea until just one stack sticks out.","de":"Lass das Meer steigen, bis nur noch ein Stapel herausschaut.","fr":"Fais monter la mer jusqu’à ce qu’une seule pile dépasse.","es":"Sube el mar hasta que solo sobresalga una pila.","pt":"Suba o mar até que só uma pilha fique de fora.","it":"Alza il mare finché spunta fuori una sola pila.","nl":"Laat de zee stijgen tot er nog maar één stapel boven uitsteekt.","sv":"Höj havet tills bara en stapel sticker upp.","da":"Hæv havet, til kun én stak stikker op.","no":"Hev havet til bare én stabel stikker opp.","fi":"Nosta merta, kunnes vain yksi pino jää näkyviin."},
    tideRange: {"en":"Bring both shores in until they touch the first and the last shell.","de":"Schieb beide Ufer herein, bis sie die erste und die letzte Muschel berühren.","fr":"Rapproche les deux rivages jusqu’à ce qu’ils touchent le premier et le dernier coquillage.","es":"Acerca las dos orillas hasta que toquen la primera y la última concha.","pt":"Traga as duas margens até elas tocarem a primeira e a última concha.","it":"Avvicina le due rive finché toccano la prima e l’ultima conchiglia.","nl":"Schuif beide oevers naar binnen tot ze de eerste en de laatste schelp raken.","sv":"Skjut in båda stränderna tills de når den första och den sista snäckan.","da":"Skub begge kyster ind, til de rører den første og den sidste skal.","no":"Skyv begge strendene inn til de rører det første og det siste skjellet.","fi":"Tuo molemmat rannat sisään, kunnes ne koskettavat ensimmäistä ja viimeistä simpukkaa."},
    tideMore: {"en":"Keep only the {a} cm shells dry, and raise the sea to the top of the {b} cm stack.","de":"Lass nur die {a}-cm-Muscheln trocken und lass das Meer bis oben an den {b}-cm-Stapel steigen.","fr":"Garde au sec seulement les coquillages de {a} cm et fais monter la mer jusqu’en haut de la pile de {b} cm.","es":"Deja secas solo las conchas de {a} cm y sube el mar hasta arriba de la pila de {b} cm.","pt":"Deixe secas só as conchas de {a} cm e suba o mar até o alto da pilha de {b} cm.","it":"Lascia all’asciutto solo le conchiglie di {a} cm e alza il mare fino in cima alla pila di {b} cm.","nl":"Houd alleen de schelpen van {a} cm droog en laat de zee stijgen tot boven aan de stapel van {b} cm.","sv":"Låt bara snäckorna på {a} cm ligga torrt och höj havet upp till toppen av stapeln på {b} cm.","da":"Lad kun skallerne på {a} cm ligge tørt, og hæv havet op til toppen af stakken på {b} cm.","no":"La bare skjellene på {a} cm ligge tørt, og hev havet opp til toppen av stabelen på {b} cm.","fi":"Jätä kuiville vain {a} cm:n simpukat ja nosta meri {b} cm:n pinon yläreunaan."},
    hintCountDry: {"en":"The tide is right. Count the dry shells.","de":"Das Wasser steht richtig. Zähle die trockenen Muscheln.","fr":"La mer est bien placée. Compte les coquillages au sec.","es":"El mar está bien. Cuenta las conchas secas.","pt":"O mar está certo. Conte as conchas secas.","it":"Il mare è al punto giusto. Conta le conchiglie all’asciutto.","nl":"Het water staat goed. Tel de droge schelpen.","sv":"Vattnet står rätt. Räkna de torra snäckorna.","da":"Vandet står rigtigt. Tæl de tørre skaller.","no":"Vannet står riktig. Tell de tørre skjellene.","fi":"Vesi on oikeassa kohdassa. Laske kuivat simpukat."},
    hintCountSteps: {"en":"The tide is right. Count the steps on the dry sand, from one number to the next.","de":"Das Wasser steht richtig. Zähle die Schritte im trockenen Sand, von einer Zahl zur nächsten.","fr":"La mer est bien placée. Compte les pas sur le sable sec, d’un nombre au suivant.","es":"El mar está bien. Cuenta los pasos en la arena seca, de un número al siguiente.","pt":"O mar está certo. Conte os passos na areia seca, de um número ao seguinte.","it":"Il mare è al punto giusto. Conta i passi sulla sabbia asciutta, da un numero al successivo.","nl":"Het water staat goed. Tel de stappen in het droge zand, van het ene getal naar het volgende.","sv":"Vattnet står rätt. Räkna stegen i den torra sanden, från ett tal till nästa.","da":"Vandet står rigtigt. Tæl skridtene i det tørre sand, fra et tal til det næste.","no":"Vannet står riktig. Tell stegene i den tørre sanden, fra ett tall til det neste.","fi":"Vesi on oikeassa kohdassa. Laske askeleet kuivalla hiekalla luvusta seuraavaan."},
    hintModeNumber: {"en":"The tide is right. The answer is the length under the dry stack, not how many shells it has.","de":"Das Wasser steht richtig. Die Antwort ist die Länge unter dem trockenen Stapel, nicht wie viele Muscheln er hat.","fr":"La mer est bien placée. La réponse, c’est la longueur sous la pile au sec, pas le nombre de coquillages.","es":"El mar está bien. La respuesta es la longitud debajo de la pila seca, no cuántas conchas tiene.","pt":"O mar está certo. A resposta é o comprimento embaixo da pilha seca, não quantas conchas ela tem.","it":"Il mare è al punto giusto. La risposta è la lunghezza sotto la pila all’asciutto, non quante conchiglie ha.","nl":"Het water staat goed. Het antwoord is de lengte onder de droge stapel, niet hoeveel schelpen erin zitten.","sv":"Vattnet står rätt. Svaret är längden under den torra stapeln, inte hur många snäckor den har.","da":"Vandet står rigtigt. Svaret er længden under den tørre stak, ikke hvor mange skaller den har.","no":"Vannet står riktig. Svaret er lengden under den tørre stabelen, ikke hvor mange skjell den har.","fi":"Vesi on oikeassa kohdassa. Vastaus on kuivan pinon alla oleva pituus, ei sen simpukoiden määrä."},
    helpAt: {"en":"Watch: only the {n} cm shells are dry now. Count them.","de":"Schau: Jetzt sind nur die {n}-cm-Muscheln trocken. Zähle sie.","fr":"Regarde : seuls les coquillages de {n} cm sont au sec maintenant. Compte-les.","es":"Mira: ahora solo están secas las conchas de {n} cm. Cuéntalas.","pt":"Veja: agora só as conchas de {n} cm estão secas. Conte-as.","it":"Guarda: ora sono all’asciutto solo le conchiglie di {n} cm. Contale.","nl":"Kijk: nu liggen alleen de schelpen van {n} cm droog. Tel ze.","sv":"Titta: nu ligger bara snäckorna på {n} cm torrt. Räkna dem.","da":"Se: nu ligger kun skallerne på {n} cm tørt. Tæl dem.","no":"Se: nå ligger bare skjellene på {n} cm tørt. Tell dem.","fi":"Katso: nyt vain {n} cm:n simpukat ovat kuivilla. Laske ne."},
    helpLonger: {"en":"Watch: after the {n} the dry shells are all longer than {n} cm. Count them.","de":"Schau: Nach der {n} sind die trockenen Muscheln alle länger als {n} cm. Zähle sie.","fr":"Regarde : après le {n}, les coquillages au sec mesurent tous plus de {n} cm. Compte-les.","es":"Mira: después del {n}, las conchas secas miden todas más de {n} cm. Cuéntalas.","pt":"Veja: depois do {n}, as conchas secas medem todas mais de {n} cm. Conte-as.","it":"Guarda: dopo il {n} le conchiglie all’asciutto sono tutte più lunghe di {n} cm. Contale.","nl":"Kijk: na de {n} zijn de droge schelpen allemaal langer dan {n} cm. Tel ze.","sv":"Titta: efter {n} är de torra snäckorna alla längre än {n} cm. Räkna dem.","da":"Se: efter {n} er de tørre skaller alle længere end {n} cm. Tæl dem.","no":"Se: etter {n} er de tørre skjellene alle lengre enn {n} cm. Tell dem.","fi":"Katso: luvun {n} jälkeen kuivat simpukat ovat kaikki pidempiä kuin {n} cm. Laske ne."},
    helpShorter: {"en":"Watch: before the {n} the dry shells are all shorter than {n} cm. Count them.","de":"Schau: Vor der {n} sind die trockenen Muscheln alle kürzer als {n} cm. Zähle sie.","fr":"Regarde : avant le {n}, les coquillages au sec mesurent tous moins de {n} cm. Compte-les.","es":"Mira: antes del {n}, las conchas secas miden todas menos de {n} cm. Cuéntalas.","pt":"Veja: antes do {n}, as conchas secas medem todas menos de {n} cm. Conte-as.","it":"Guarda: prima del {n} le conchiglie all’asciutto sono tutte più corte di {n} cm. Contale.","nl":"Kijk: voor de {n} zijn de droge schelpen allemaal korter dan {n} cm. Tel ze.","sv":"Titta: före {n} är de torra snäckorna alla kortare än {n} cm. Räkna dem.","da":"Se: før {n} er de tørre skaller alle kortere end {n} cm. Tæl dem.","no":"Se: før {n} er de tørre skjellene alle kortere enn {n} cm. Tell dem.","fi":"Katso: ennen lukua {n} kuivat simpukat ovat kaikki lyhyempiä kuin {n} cm. Laske ne."},
    helpMode: {"en":"Watch: only one stack sticks out. Tap the pebble with the length under it.","de":"Schau: Nur ein Stapel schaut heraus. Tippe den Kieselstein mit der Länge darunter an.","fr":"Regarde : une seule pile dépasse. Touche le galet de la longueur en dessous.","es":"Mira: solo sobresale una pila. Toca la piedrita con la longitud que está debajo.","pt":"Veja: só uma pilha fica de fora. Toque na pedrinha com o comprimento embaixo dela.","it":"Guarda: spunta fuori una sola pila. Tocca il sassolino con la lunghezza sotto la pila.","nl":"Kijk: er steekt maar één stapel boven uit. Tik de kiezelsteen aan met de lengte eronder.","sv":"Titta: bara en stapel sticker upp. Tryck på stenen med längden under den.","da":"Se: kun én stak stikker op. Tryk på stenen med længden under den.","no":"Se: bare én stabel stikker opp. Trykk på steinen med lengden under den.","fi":"Katso: vain yksi pino on näkyvissä. Napauta kiveä, jossa on sen alla oleva pituus."},
    helpRange: {"en":"Watch: from {min} cm to {max} cm. Count the steps between the numbers.","de":"Schau: von {min} cm bis {max} cm. Zähle die Schritte zwischen den Zahlen.","fr":"Regarde : de {min} cm à {max} cm. Compte les pas entre les nombres.","es":"Mira: de {min} cm a {max} cm. Cuenta los pasos entre los números.","pt":"Veja: de {min} cm a {max} cm. Conte os passos entre os números.","it":"Guarda: da {min} cm a {max} cm. Conta i passi tra i numeri.","nl":"Kijk: van {min} cm tot {max} cm. Tel de stappen tussen de getallen.","sv":"Titta: från {min} cm till {max} cm. Räkna stegen mellan talen.","da":"Se: fra {min} cm til {max} cm. Tæl skridtene mellem tallene.","no":"Se: fra {min} cm til {max} cm. Tell stegene mellom tallene.","fi":"Katso: {min} cm:stä {max} cm:iin. Laske askeleet lukujen välillä."},
    helpMore: {"en":"Watch: the shells above the sea are the extra {a} cm shells. Count them.","de":"Schau: Die Muscheln über dem Wasser sind die zusätzlichen {a}-cm-Muscheln. Zähle sie.","fr":"Regarde : les coquillages au-dessus de la mer sont les coquillages de {a} cm en plus. Compte-les.","es":"Mira: las conchas por encima del mar son las conchas de {a} cm que sobran. Cuéntalas.","pt":"Veja: as conchas acima do mar são as conchas de {a} cm a mais. Conte-as.","it":"Guarda: le conchiglie sopra il mare sono le conchiglie di {a} cm in più. Contale.","nl":"Kijk: de schelpen boven het water zijn de extra schelpen van {a} cm. Tel ze.","sv":"Titta: snäckorna ovanför havet är de extra snäckorna på {a} cm. Räkna dem.","da":"Se: skallerne over havet er de ekstra skaller på {a} cm. Tæl dem.","no":"Se: skjellene over havet er de ekstra skjellene på {a} cm. Tell dem.","fi":"Katso: meren yläpuolella olevat simpukat ovat ylimääräiset {a} cm:n simpukat. Laske ne."},
    hintZero: {"en":"Slide the shell to the 0 first, then read where it ends.","de":"Schieb die Muschel zuerst an die 0, dann lies ab, wo sie endet.","fr":"Fais d’abord glisser le coquillage jusqu’au 0, puis lis où il se termine.","es":"Primero desliza la concha hasta el 0 y luego lee dónde termina.","pt":"Primeiro deslize a concha até o 0 e depois veja onde ela termina.","it":"Prima fai scorrere la conchiglia fino allo 0, poi leggi dove finisce.","nl":"Schuif de schelp eerst naar de 0 en lees dan af waar hij eindigt.","sv":"Skjut först snäckan till 0 och läs sedan av var den slutar.","da":"Skub først skallen hen til 0, og aflæs så, hvor den slutter.","no":"Skyv først skjellet til 0, og les så av hvor det slutter.","fi":"Liu’uta simpukka ensin nollaan ja katso sitten, mihin se päättyy."},
    hintEdge: {"en":"Look again where the shell’s edge ends on the ruler.","de":"Schau noch einmal, wo der Rand der Muschel am Lineal endet.","fr":"Regarde encore où le bord du coquillage s’arrête sur la règle.","es":"Mira otra vez dónde termina el borde de la concha en la regla.","pt":"Veja de novo onde a borda da concha termina na régua.","it":"Guarda di nuovo dove finisce il bordo della conchiglia sul righello.","nl":"Kijk nog eens waar de rand van de schelp eindigt op de liniaal.","sv":"Titta igen var snäckans kant slutar på linjalen.","da":"Se igen, hvor skallens kant slutter på linealen.","no":"Se igjen hvor kanten av skjellet slutter på linjalen.","fi":"Katso uudelleen, mihin simpukan reuna päättyy viivaimella."},
    helpMeasure: {"en":"Watch: it ends at {len} cm. Drop it on the {len}.","de":"Schau: Sie endet bei {len} cm. Leg sie auf die {len}.","fr":"Regarde : il s’arrête à {len} cm. Pose-le sur le {len}.","es":"Mira: termina en {len} cm. Suéltala sobre el {len}.","pt":"Veja: ela termina em {len} cm. Solte-a sobre o {len}.","it":"Guarda: finisce a {len} cm. Lasciala sul {len}.","nl":"Kijk: hij eindigt bij {len} cm. Leg hem op de {len}.","sv":"Titta: den slutar vid {len} cm. Släpp den på {len}.","da":"Se: den slutter ved {len} cm. Slip den på {len}.","no":"Se: det slutter ved {len} cm. Slipp det på {len}.","fi":"Katso: se päättyy kohtaan {len} cm. Pudota se luvun {len} kohdalle."},
    okAt: {"en":"{k} shells are {n} cm long.","de":"{k} Muscheln sind {n} cm lang.","fr":"{k} coquillages mesurent {n} cm.","es":"{k} conchas miden {n} cm.","pt":"{k} conchas medem {n} cm.","it":"{k} conchiglie sono lunghe {n} cm.","nl":"{k} schelpen zijn {n} cm lang.","sv":"{k} snäckor är {n} cm långa.","da":"{k} skaller er {n} cm lange.","no":"{k} skjell er {n} cm lange.","fi":"{k} simpukkaa on {n} cm pitkiä."},
    okAt1: {"en":"1 shell is {n} cm long.","de":"1 Muschel ist {n} cm lang.","fr":"1 coquillage mesure {n} cm.","es":"1 concha mide {n} cm.","pt":"1 concha mede {n} cm.","it":"1 conchiglia è lunga {n} cm.","nl":"1 schelp is {n} cm lang.","sv":"1 snäcka är {n} cm lång.","da":"1 skal er {n} cm lang.","no":"1 skjell er {n} cm langt.","fi":"1 simpukka on {n} cm pitkä."},
    okLonger: {"en":"{k} shells are longer than {n} cm.","de":"{k} Muscheln sind länger als {n} cm.","fr":"{k} coquillages mesurent plus de {n} cm.","es":"{k} conchas miden más de {n} cm.","pt":"{k} conchas medem mais de {n} cm.","it":"{k} conchiglie sono più lunghe di {n} cm.","nl":"{k} schelpen zijn langer dan {n} cm.","sv":"{k} snäckor är längre än {n} cm.","da":"{k} skaller er længere end {n} cm.","no":"{k} skjell er lengre enn {n} cm.","fi":"{k} simpukkaa on pidempiä kuin {n} cm."},
    okLonger1: {"en":"1 shell is longer than {n} cm.","de":"1 Muschel ist länger als {n} cm.","fr":"1 coquillage mesure plus de {n} cm.","es":"1 concha mide más de {n} cm.","pt":"1 concha mede mais de {n} cm.","it":"1 conchiglia è più lunga di {n} cm.","nl":"1 schelp is langer dan {n} cm.","sv":"1 snäcka är längre än {n} cm.","da":"1 skal er længere end {n} cm.","no":"1 skjell er lengre enn {n} cm.","fi":"1 simpukka on pidempi kuin {n} cm."},
    okShorter: {"en":"{k} shells are shorter than {n} cm.","de":"{k} Muscheln sind kürzer als {n} cm.","fr":"{k} coquillages mesurent moins de {n} cm.","es":"{k} conchas miden menos de {n} cm.","pt":"{k} conchas medem menos de {n} cm.","it":"{k} conchiglie sono più corte di {n} cm.","nl":"{k} schelpen zijn korter dan {n} cm.","sv":"{k} snäckor är kortare än {n} cm.","da":"{k} skaller er kortere end {n} cm.","no":"{k} skjell er kortere enn {n} cm.","fi":"{k} simpukkaa on lyhyempiä kuin {n} cm."},
    okShorter1: {"en":"1 shell is shorter than {n} cm.","de":"1 Muschel ist kürzer als {n} cm.","fr":"1 coquillage mesure moins de {n} cm.","es":"1 concha mide menos de {n} cm.","pt":"1 concha mede menos de {n} cm.","it":"1 conchiglia è più corta di {n} cm.","nl":"1 schelp is korter dan {n} cm.","sv":"1 snäcka är kortare än {n} cm.","da":"1 skal er kortere end {n} cm.","no":"1 skjell er kortere enn {n} cm.","fi":"1 simpukka on lyhyempi kuin {n} cm."},
    okMode: {"en":"{n} cm is the most common length.","de":"{n} cm ist die häufigste Länge.","fr":"La longueur la plus fréquente est {n} cm.","es":"La longitud que más se repite es {n} cm.","pt":"O comprimento que mais aparece é {n} cm.","it":"La lunghezza più frequente è {n} cm.","nl":"{n} cm is de lengte die het vaakst voorkomt.","sv":"{n} cm är den vanligaste längden.","da":"Der er flest skaller på {n} cm.","no":"Det er flest skjell på {n} cm.","fi":"{n} cm on yleisin pituus."},
    okRange: {"en":"The longest shell is {k} cm longer than the shortest.","de":"Die längste Muschel ist {k} cm länger als die kürzeste.","fr":"Le plus long coquillage mesure {k} cm de plus que le plus court.","es":"La concha más larga mide {k} cm más que la más corta.","pt":"A concha mais comprida mede {k} cm a mais que a mais curta.","it":"La conchiglia più lunga è {k} cm più lunga della più corta.","nl":"De langste schelp is {k} cm langer dan de kortste.","sv":"Den längsta snäckan är {k} cm längre än den kortaste.","da":"Den længste skal er {k} cm længere end den korteste.","no":"Det lengste skjellet er {k} cm lengre enn det korteste.","fi":"Pisin simpukka on {k} cm pidempi kuin lyhyin."},
    okMore: {"en":"There are {k} more shells that are {a} cm long than {b} cm long.","de":"Es gibt {k} Muscheln mehr mit {a} cm als mit {b} cm.","fr":"Il y a {k} coquillages de {a} cm de plus que de coquillages de {b} cm.","es":"Hay {k} conchas más de {a} cm que de {b} cm.","pt":"Há {k} conchas a mais de {a} cm do que de {b} cm.","it":"Ci sono {k} conchiglie di {a} cm in più rispetto a quelle di {b} cm.","nl":"Er zijn {k} schelpen van {a} cm meer dan van {b} cm.","sv":"Det finns {k} fler snäckor på {a} cm än på {b} cm.","da":"Der er {k} flere skaller på {a} cm end på {b} cm.","no":"Det er {k} flere skjell på {a} cm enn på {b} cm.","fi":"{a} cm:n simpukoita on {k} enemmän kuin {b} cm:n simpukoita."},
    okMore1: {"en":"There is 1 more shell that is {a} cm long than {b} cm long.","de":"Es gibt 1 Muschel mehr mit {a} cm als mit {b} cm.","fr":"Il y a 1 coquillage de {a} cm de plus que de coquillages de {b} cm.","es":"Hay 1 concha más de {a} cm que de {b} cm.","pt":"Há 1 concha a mais de {a} cm do que de {b} cm.","it":"C’è 1 conchiglia di {a} cm in più rispetto a quelle di {b} cm.","nl":"Er is 1 schelp van {a} cm meer dan van {b} cm.","sv":"Det finns 1 snäcka mer på {a} cm än på {b} cm.","da":"Der er 1 skal mere på {a} cm end på {b} cm.","no":"Det er 1 skjell mer på {a} cm enn på {b} cm.","fi":"{a} cm:n simpukoita on 1 enemmän kuin {b} cm:n simpukoita."},
    okMeasure2: {"en":"Your shells are {s1} cm and {s2} cm long. The plot has {total} shells now.","de":"Deine Muscheln sind {s1} cm und {s2} cm lang. Jetzt sind {total} Muscheln eingetragen.","fr":"Tes coquillages mesurent {s1} cm et {s2} cm. Il y a maintenant {total} coquillages sur le diagramme.","es":"Tus conchas miden {s1} cm y {s2} cm. Ahora hay {total} conchas en el diagrama.","pt":"Suas conchas medem {s1} cm e {s2} cm. Agora há {total} conchas no diagrama.","it":"Le tue conchiglie sono lunghe {s1} cm e {s2} cm. Ora sul diagramma ci sono {total} conchiglie.","nl":"Jouw schelpen zijn {s1} cm en {s2} cm lang. Nu staan er {total} schelpen in het diagram.","sv":"Dina snäckor är {s1} cm och {s2} cm långa. Nu finns det {total} snäckor på linjen.","da":"Dine skaller er {s1} cm og {s2} cm lange. Nu er der {total} skaller på linjen.","no":"Skjellene dine er {s1} cm og {s2} cm lange. Nå er det {total} skjell på linja.","fi":"Simpukkasi ovat {s1} cm ja {s2} cm pitkiä. Nyt kaaviossa on {total} simpukkaa."},
    okMeasure1: {"en":"This shell is {s1} cm long.","de":"Diese Muschel ist {s1} cm lang.","fr":"Ce coquillage mesure {s1} cm.","es":"Esta concha mide {s1} cm.","pt":"Esta concha mede {s1} cm.","it":"Questa conchiglia è lunga {s1} cm.","nl":"Deze schelp is {s1} cm lang.","sv":"Den här snäckan är {s1} cm lång.","da":"Denne skal er {s1} cm lang.","no":"Dette skjellet er {s1} cm langt.","fi":"Tämä simpukka on {s1} cm pitkä."},
    okHalf: {"en":"{h} cm = {d} cm.","de":"{h} cm = {d} cm.","fr":"{h} cm = {d} cm.","es":"{h} cm = {d} cm.","pt":"{h} cm = {d} cm.","it":"{h} cm = {d} cm.","nl":"{h} cm = {d} cm.","sv":"{h} cm = {d} cm.","da":"{h} cm = {d} cm.","no":"{h} cm = {d} cm.","fi":"{h} cm = {d} cm."},
    aCol: {"en":"{n} cm, shells: {k}","de":"{n} cm, Muscheln: {k}","fr":"{n} cm, coquillages : {k}","es":"{n} cm, conchas: {k}","pt":"{n} cm, conchas: {k}","it":"{n} cm, conchiglie: {k}","nl":"{n} cm, schelpen: {k}","sv":"{n} cm, snäckor: {k}","da":"{n} cm, skaller: {k}","no":"{n} cm, skjell: {k}","fi":"{n} cm, simpukoita: {k}"},
    aShoreL: {"en":"Sea from the left","de":"Meer von links","fr":"Mer depuis la gauche","es":"Mar desde la izquierda","pt":"Mar pela esquerda","it":"Mare da sinistra","nl":"Zee van links","sv":"Havet från vänster","da":"Havet fra venstre","no":"Havet fra venstre","fi":"Meri vasemmalta"},
    aShoreR: {"en":"Sea from the right","de":"Meer von rechts","fr":"Mer depuis la droite","es":"Mar desde la derecha","pt":"Mar pela direita","it":"Mare da destra","nl":"Zee van rechts","sv":"Havet från höger","da":"Havet fra højre","no":"Havet fra høyre","fi":"Meri oikealta"},
    aBuoy: {"en":"Sea level, rows under water: {k}","de":"Wasserstand, Reihen unter Wasser: {k}","fr":"Niveau de la mer, rangées sous l’eau : {k}","es":"Nivel del mar, filas bajo el agua: {k}","pt":"Nível do mar, fileiras debaixo da água: {k}","it":"Livello del mare, file sott’acqua: {k}","nl":"Waterstand, rijen onder water: {k}","sv":"Vattennivå, rader under vatten: {k}","da":"Vandstand, rækker under vand: {k}","no":"Vannstand, rader under vann: {k}","fi":"Vedenpinta, rivejä veden alla: {k}"},
    aShell: {"en":"A shell on the ruler, starting at {o} cm","de":"Eine Muschel am Lineal, sie beginnt bei {o} cm","fr":"Un coquillage sur la règle, qui commence à {o} cm","es":"Una concha en la regla, empieza en {o} cm","pt":"Uma concha na régua, começa em {o} cm","it":"Una conchiglia sul righello, inizia a {o} cm","nl":"Een schelp op de liniaal, hij begint bij {o} cm","sv":"En snäcka på linjalen, den börjar vid {o} cm","da":"En skal på linealen, den begynder ved {o} cm","no":"Et skjell på linjalen, det begynner ved {o} cm","fi":"Simpukka viivaimella, se alkaa kohdasta {o} cm"},
    aMine: {"en":"Your shell on {n} cm: tap to take it back","de":"Deine Muschel auf {n} cm: zum Zurücknehmen antippen","fr":"Ton coquillage sur {n} cm : touche pour le reprendre","es":"Tu concha en {n} cm: tócala para recuperarla","pt":"Sua concha em {n} cm: toque para pegá-la de volta","it":"La tua conchiglia su {n} cm: toccala per riprenderla","nl":"Jouw schelp op {n} cm: tik om hem terug te nemen","sv":"Din snäcka på {n} cm: tryck för att ta tillbaka den","da":"Din skal på {n} cm: tryk for at tage den tilbage","no":"Skjellet ditt på {n} cm: trykk for å ta det tilbake","fi":"Simpukkasi kohdassa {n} cm: napauta ottaaksesi sen takaisin"},
    aDropped: {"en":"Dropped on {n} cm.","de":"Auf {n} cm gelegt.","fr":"Posé sur {n} cm.","es":"Suelta en {n} cm.","pt":"Solta em {n} cm.","it":"Lasciata su {n} cm.","nl":"Gelegd op {n} cm.","sv":"Släppt på {n} cm.","da":"Sluppet på {n} cm.","no":"Sluppet på {n} cm.","fi":"Pudotettu kohtaan {n} cm."}
  },/*STRINGS-END*/
  defaults: { level: 'read', feet: 'on' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'read', labelKey: 'lRead' }, { value: 'measure', labelKey: 'lMeasure' }, { value: 'halves', labelKey: 'lHalves' }] },
    { key: 'feet', type: 'choice', labelKey: 'setFeet', options: [{ value: 'on', labelKey: 'fOn' }, { value: 'off', labelKey: 'fOff' }] }
  ],
  OK_MS: 500, FAST: false,
  INK: { inset: 22 / 1024, frac: 980 / 1024 },

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._themes = {}; this._picsReady = false;
    injectTidePlotCSS();
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function () { self._picsReady = true; });
    } else this._picsReady = true;
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return TidePlotCore.levelOf(this._setting('level')); },
  _feet: function () { return this._setting('feet') !== 'off'; },
  _loc: function () { return TidePlotCore.locOf(this.api && this.api.lang); },
  _key: function () { return this._level(); },
  /* a length in half-centimetres as written: «5», «4½» */
  _len: function (hu) { return Math.floor(hu / 2) + (hu % 2 ? '½' : ''); },
  /* the locale's decimal form of a half: «4,5» (en/es keep «4½» only) */
  _dec: function (hu) { var l = this._loc(); if (!(hu % 2) || l === 'en' || l === 'es') return null; return Math.floor(hu / 2) + ',5'; },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TidePlotCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TidePlotCore, pool = this._ensurePool(), n = C.passSize(this._level()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._level(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'tide-plot.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var r = this.st.round, k = r.kind;
    var key = { at: 'qAt', longer: 'qLonger', shorter: 'qShorter', mode: 'qMode', range: 'qRange', more: 'qMore', measure: r.shells && r.shells.length > 1 ? 'qMeasure2' : 'qMeasure1' }[k];
    return this._t(key, { n: this._len(r.n || 0), a: this._len(r.n || 0), b: this._len(r.b || 0) });
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    this.st = TidePlotCore.newState(this._level(), k);
    this._view = { note: '', soft: false, numbered: false, ring: null, guide: false, glow: null, wobble: false };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'tp-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="tp-board" data-qa="board"></div><div class="tp-beachbox" data-qa="beach"></div><div class="tp-pebbles" data-qa="pebbles"></div><p class="tp-note" data-qa="note" aria-live="polite"></p><div class="tp-ctrl"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  /* the beach: columns at a pitch that fits the card, room for the two wave handles and the buoy column */
  _geometry: function (W) {
    var st = this.st, n = st.cols.length, wide = W >= 560, cramp = W < 330;
    var x0 = 24, buoyW = 52, p = Math.floor(Math.min(st.level === 'read' ? 64 : 56, (W - x0 - buoyW - 8) / n));
    /* the sky holds the tallest stack the round can reach: in measuring rounds, every shell dropped on its length */
    var hs = TidePlotCore.heights(st), meas = st.round.kind === 'measure';
    if (meas) { var fin = JSON.parse(JSON.stringify(st)); fin.shells.forEach(function (s) { s.col = s.len; }); var hf = TidePlotCore.heights(fin); hs = hs.map(function (h, i) { return Math.max(h, hf[i]); }); }
    /* reading rounds keep two empty rows of sky so a wave handle riding at the top never covers a stack */
    var rows = meas ? Math.max(3, Math.max.apply(null, hs) + 1) : Math.max(4, Math.max.apply(null, hs) + 2), rowH = wide ? 30 : cramp ? 24 : 26, sand = 44;
    var ppc = st.level === 'halves' ? (wide ? 48 : cramp ? 24 : 30) : (wide ? 37 : cramp ? 24 : 30);
    return { W: W, wide: wide, cramp: cramp, n: n, x0: x0, p: p, beachW: x0 + n * p + buoyW, rowH: rowH, sand: sand, H: sand + rows * rowH + 14, xs: Math.min(26, p - 6), ppc: ppc };
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._g = this._geometry(this._width());
    this._wrap.className = 'tp-wrap is-' + st.round.kind + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '');
    this._paintBoard(); this._paintBeach(); this._paintPebbles(); this._paintCtrl();
    var note = this._qs('.tp-note');
    note.textContent = v.note || ''; note.className = 'tp-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _x: function () { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 L19 19 M19 5 L5 19" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'; },

  /* ---- the measuring board: a ruler from 0 with a stop, the shell drawn true to its length ---- */
  _paintBoard: function () {
    var st = this.st, g = this._g, el = this._qs('.tp-board'), self = this, C = TidePlotCore, v = this._view;
    el.innerHTML = '';
    if (st.round.kind !== 'measure') { el.style.display = 'none'; return; }
    el.style.display = '';
    var cmN = C.RULER[st.level] / 2, ppc = g.ppc, rx0 = 18, rw = cmN * ppc, i = C.boardShell(st), s = i == null ? null : st.shells[i];
    var tall = s ? Math.round(s.len / 2 * ppc / this.INK.frac) : Math.round(3 * ppc);
    var H = Math.max(tall, 3 * ppc) + 52;
    el.style.width = (rx0 * 2 + rw) + 'px'; el.style.height = H + 'px';
    /* the ruler: whole-cm ticks with numerals, half-cm ticks, the brass stop at 0 */
    var o = '<svg class="tp-ruler" width="' + (rx0 * 2 + rw) + '" height="44" viewBox="0 0 ' + (rx0 * 2 + rw) + ' 44" aria-hidden="true"><rect x="' + (rx0 - 6) + '" y="0" width="' + (rw + 12) + '" height="40" rx="4" class="tp-rulerbody"/>';
    for (var h = 0; h <= cmN * 2; h++) { var x = rx0 + h * ppc / 2, whole = !(h % 2); o += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + (whole ? 16 : 9) + '" class="tp-tick"/>'; if (whole) o += '<text x="' + x + '" y="34" text-anchor="middle" class="tp-rulnum">' + (h / 2) + '</text>'; }
    o += '</svg>';
    el.insertAdjacentHTML('beforeend', '<div class="tp-rulerwrap" style="left:0;bottom:0">' + o + '</div><span class="tp-stop" aria-hidden="true" style="left:' + (rx0 - 10) + 'px;bottom:40px"></span>');
    if (s) {
      var ink = s.len / 2 * ppc, box = Math.round(ink / this.INK.frac), left = rx0 + s.pos / 10 * ppc - box * this.INK.inset;
      var b = this._btn('tp-shell' + (v.wobble ? ' is-wobble' : ''), 'shell', this._t('aShell', { o: (s.pos / 10).toString().replace('.', this._loc() === 'en' ? '.' : ',') }), '');
      b.style.left = Math.round(left) + 'px'; b.style.bottom = '42px'; b.style.width = box + 'px'; b.style.height = box + 'px';
      b.setAttribute('data-len', s.len); b.setAttribute('data-pos', s.pos);
      var pic = this._pic('beach', 'seashell', box, 'tp-shellpic'); pic.alt = ''; b.appendChild(pic);
      b.addEventListener('pointerdown', function (e) { if (e.button || st.done) return; self._press(e); });
      b.addEventListener('keydown', function (e) { self._shellKey(e); });
      el.appendChild(b);
      /* miss 2: a teal line from the shell's edge down to the ruler */
      if (v.guide) el.insertAdjacentHTML('beforeend', '<span class="tp-guide" aria-hidden="true" style="left:' + Math.round(rx0 + (s.pos / 10 + s.len / 2) * ppc - 1) + 'px;bottom:14px;height:' + (box + 28) + 'px"></span>');
    }
  },
  _pic: function (theme, noun, size, cls) {
    var loc = this._loc();
    if (!this._picsReady || typeof LCSPictures === 'undefined' || !this._themes[theme]) { var d = this.api.el('div', cls + ' tp-picwait'); d.style.width = size + 'px'; d.style.height = size + 'px'; return d; }
    var im = LCSPictures.img(this._themes[theme], noun, loc, { size: size }); im.className = cls; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },

  /* ---- the beach ---- */
  _paintBeach: function () {
    var st = this.st, g = this._g, el = this._qs('.tp-beachbox'), self = this, C = TidePlotCore, v = this._view, t = st.tide, r = st.round;
    el.innerHTML = '';
    var beach = this.api.el('div', 'tp-beach'); beach.style.width = g.beachW + 'px'; beach.style.height = g.H + 'px';
    beach.insertAdjacentHTML('beforeend', '<span class="tp-sky" aria-hidden="true"></span>');
    var colX = function (i) { return g.x0 + i * g.p; }, shoreL = colX(t.L), shoreR = colX(g.n - t.R), seaH = g.sand + t.S * g.rowH;
    /* the sand with its numbers: in mode and measure rounds each number heads a column that marks the chosen length and catches a carried shell */
    beach.insertAdjacentHTML('beforeend', '<span class="tp-sand" style="left:' + g.x0 + 'px;width:' + (g.n * g.p) + 'px;height:' + g.sand + 'px"></span>');
    var tapCols = r.kind === 'mode' || r.kind === 'measure', hs = C.heights(st);
    st.cols.forEach(function (val, i) {
      var lab = self._len(val);
      if (tapCols) {
        var z = self.api.el('div', 'tp-col' + (st.answer === val && r.kind === 'mode' ? ' is-chosen' : '') + (v.ring === val ? ' is-ring' : '') + (v.glow === val ? ' is-glow' : ''));
        /* a drop target for a carried shell and the home of the chosen / ringed length; not a tap target: seven to nine columns cannot be 44 px wide on a phone, so answers go on pebbles */
        z.setAttribute('data-col', val); z.setAttribute('aria-label', self._t('aCol', { n: lab, k: hs[i] }));
        z.style.left = colX(i) + 'px'; z.style.width = g.p + 'px'; z.style.height = (g.H - 4) + 'px';
        z.innerHTML = '<span class="tp-num" style="height:' + g.sand + 'px">' + self._esc(lab) + '</span>';
        z.addEventListener('click', function () { self._colTap(val); });
        z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._colTap(val); } });
        beach.appendChild(z);
      } else beach.insertAdjacentHTML('beforeend', '<span class="tp-num" style="left:' + colX(i) + 'px;width:' + g.p + 'px;height:' + g.sand + 'px" aria-label="' + self._esc(self._t('aCol', { n: lab, k: hs[i] })) + '">' + self._esc(lab) + '</span>');
    });
    /* footprints: one pair per step between two numbers, on dry sand only */
    if (this._feet() && r.kind !== 'measure') for (var i = 0; i < g.n - 1; i++) {
      if (i < t.L || i + 1 >= g.n - t.R || t.S > 0) continue;
      beach.insertAdjacentHTML('beforeend', '<span class="tp-feet' + (v.numbered && r.kind === 'range' ? ' is-num' : '') + '" data-step="' + (i - t.L + 1) + '" style="left:' + (colX(i + 1) - 9) + 'px;bottom:4px" aria-hidden="true"><svg viewBox="0 0 18 14"><ellipse cx="5" cy="9" rx="3" ry="4.5"/><ellipse cx="13" cy="5" rx="3" ry="4.5"/></svg>' + (v.numbered && r.kind === 'range' ? '<b>' + (i - t.L + 1) + '</b>' : '') + '</span>');
    }
    /* the X's: drawn tokens stacked over their numbers; under water they turn blue but stay visible */
    var dryN = 0;
    C.xs(st).forEach(function (x) {
      var d = C.isDry(st, x); if (d) dryN++;
      var cls = 'tp-x' + (d ? '' : ' is-wet') + (x.mine ? ' is-mine' : '') + (st.done && d && r.kind !== 'measure' ? ' is-hop' : '');
      var left = colX(x.i) + (g.p - g.xs) / 2, bottom = g.sand + (x.row - 1) * g.rowH + 3;
      var tag = v.numbered && d && r.kind !== 'range' ? '<b class="tp-xnum">' + dryN + '</b>' : '';
      if (x.mine && !st.done) {
        var b = self._btn(cls, 'mine-' + x.v + '-' + x.row, self._t('aMine', { n: self._len(x.v) }), self._x() + tag);
        b.setAttribute('data-mine', x.v); b.setAttribute('data-col', x.v); b.style.left = (left - (44 - g.xs) / 2) + 'px'; b.style.bottom = (bottom - (44 - g.xs) / 2) + 'px';
        b.addEventListener('click', function () { self._undrop(x.v); });
        beach.appendChild(b);
      } else beach.insertAdjacentHTML('beforeend', '<span class="' + cls + '" data-col="' + x.v + '" data-row="' + x.row + '" style="left:' + left + 'px;bottom:' + bottom + 'px;width:' + g.xs + 'px;height:' + g.xs + 'px">' + self._x() + tag + '</span>');
    });
    /* the water: the two shores and the sea level */
    if (r.kind !== 'measure') {
      if (t.L) beach.insertAdjacentHTML('beforeend', '<span class="tp-water is-left" style="left:0;width:' + shoreL + 'px"></span>');
      if (t.R) beach.insertAdjacentHTML('beforeend', '<span class="tp-water is-right" style="left:' + shoreR + 'px;width:' + (g.x0 + g.n * g.p - shoreR) + 'px"></span>');
      if (t.S) beach.insertAdjacentHTML('beforeend', '<span class="tp-water is-sea" style="left:0;width:' + (g.x0 + g.n * g.p) + 'px;height:' + seaH + 'px"></span>');
      var wave = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 14 Q6 8 10 14 T18 14 T26 14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
      var hl = this._btn('tp-handle is-left', 'shore-L', this._t('aShoreL', { n: t.L ? this._len(st.cols[t.L - 1]) : '' }), wave);
      /* each handle rides on its own water, never over the dry gap: they cannot cover a dry shell or each other */
      hl.style.left = Math.max(0, shoreL - 44) + 'px'; hl.style.top = '4px'; hl.disabled = st.done; hl.setAttribute('data-v', t.L);
      var hr = this._btn('tp-handle is-right', 'shore-R', this._t('aShoreR', { n: t.R ? this._len(st.cols[g.n - t.R]) : '' }), wave);
      hr.style.left = Math.min(shoreR, g.x0 + g.n * g.p) - (t.R ? 0 : 44) + 'px'; hr.style.top = '4px'; hr.disabled = st.done; hr.setAttribute('data-v', t.R);
      var buoy = this._btn('tp-buoy', 'buoy', this._t('aBuoy', { k: t.S }), '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="#E8584A" stroke="#2B2B2B" stroke-width="2.5"/><path d="M5 20 H35" stroke="#fff" stroke-width="6"/><circle cx="20" cy="20" r="15" fill="none" stroke="#2B2B2B" stroke-width="2.5"/></svg>');
      buoy.style.left = (g.x0 + g.n * g.p + 4) + 'px'; buoy.style.bottom = Math.max(0, seaH - 22) + 'px'; buoy.disabled = st.done; buoy.setAttribute('data-v', t.S);
      beach.insertAdjacentHTML('beforeend', '<span class="tp-post" style="left:' + (g.x0 + g.n * g.p + 25) + 'px;height:' + (g.H - 6) + 'px" aria-hidden="true"></span>');
      [hl, hr].forEach(function (h) { var side = h === hl ? 'L' : 'R'; h.addEventListener('pointerdown', function (e) { if (e.button || st.done) return; self._pressShore(e, side); }); h.addEventListener('keydown', function (e) { self._shoreKey(e, side); }); beach.appendChild(h); });
      buoy.addEventListener('pointerdown', function (e) { if (e.button || st.done) return; self._pressBuoy(e); });
      buoy.addEventListener('keydown', function (e) { self._buoyKey(e); });
      beach.appendChild(buoy);
    }
    el.appendChild(beach);
    this._beachEl = beach;
  },
  _paintPebbles: function () {
    var st = this.st, r = st.round, el = this._qs('.tp-pebbles'), self = this, v = this._view;
    el.innerHTML = '';
    if (r.kind === 'measure') { el.style.display = 'none'; return; }
    el.style.display = '';
    /* the most common length is answered with length pebbles that carry the unit, so a count never looks like an option */
    if (r.kind === 'mode') { st.cols.forEach(function (val) {
      var lab = self._len(val), b = self._btn('tp-pebble is-len' + (st.answer === val ? ' is-chosen' : '') + (v.ring === val ? ' is-ring' : ''), 'len-' + val, lab + ' cm', self._esc(lab) + '<small> cm</small>');
      b.disabled = st.done; b.setAttribute('aria-pressed', st.answer === val ? 'true' : 'false');
      b.addEventListener('click', function () { self._colTap(val); });
      el.appendChild(b);
    }); return; }
    for (var k = 1; k <= 8; k++) (function (k) {
      var b = self._btn('tp-pebble' + (st.answer === k ? ' is-chosen' : '') + (v.ring === k ? ' is-ring' : ''), 'pebble-' + k, String(k), String(k));
      b.disabled = st.done; b.setAttribute('aria-pressed', st.answer === k ? 'true' : 'false');
      b.addEventListener('click', function () { if (TidePlotCore.choose(st, k)) { self.api.sound(560); self._moved(); } });
      el.appendChild(b);
    })(k);
  },
  _paintCtrl: function () {
    var st = this.st, el = this._qs('.tp-ctrl'), self = this;
    el.innerHTML = '';
    var go = this._btn('tp-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = st.done; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { var v = this._view; v.note = ''; v.numbered = false; v.ring = null; v.guide = false; v.glow = null; v.wobble = false; this._paint(); },
  _shore: function (side, val) { if (TidePlotCore.setShore(this.st, side, val)) { this.api.sound(330); this._moved(); return true; } return false; },
  _sea: function (val) { if (TidePlotCore.setSea(this.st, val)) { this.api.sound(300); this._moved(); return true; } return false; },
  _pressShore: function (e, side) {
    var self = this, g = this._g; e.preventDefault(); this._endDrag();
    var mv = function (ev) { ev.preventDefault(); var r = self._beachEl.getBoundingClientRect(), x = ev.clientX - r.left, gap = Math.round((x - g.x0) / g.p); self._shore(side, side === 'L' ? gap : g.n - gap); };
    var up = function () { self._endDrag(); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _pressBuoy: function (e) {
    var self = this, g = this._g; e.preventDefault(); this._endDrag();
    var mv = function (ev) { ev.preventDefault(); var r = self._beachEl.getBoundingClientRect(), fromBottom = r.bottom - ev.clientY; self._sea(Math.round((fromBottom - g.sand) / g.rowH)); };
    var up = function () { self._endDrag(); };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _shoreKey: function (e, side) { var t = this.st.tide, d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; e.preventDefault(); this._shore(side, t[side] + (side === 'L' ? d : -d)); },
  _buoyKey: function (e) { var d = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : 0; if (!d) return; e.preventDefault(); this._sea(this.st.tide.S + d); },
  _colTap: function (val) {
    var st = this.st;
    if (st.round.kind === 'mode') { if (TidePlotCore.choose(st, val)) { this.api.sound(560); this._moved(); } return; }
    this._dropAt(val);
  },
  _dropAt: function (val) {
    var st = this.st, i = TidePlotCore.drop(st, val);
    if (i == null) return;
    this.api.sound(520); this._moved(); this.api.announce(this._t('aDropped', { n: this._len(val) }));
  },
  _undrop: function (val) {
    var st = this.st, C = TidePlotCore;
    for (var j = st.shells.length - 1; j >= 0; j--) if (st.shells[j].col === val) { if (C.undrop(st, j)) { this.api.sound(420); this._moved(); } return; }
  },
  /* the shell: a drag along the ruler slides it (it clicks at the stop); released over the beach, it drops as an X */
  _press: function (e) {
    var self = this, st = this.st, g = this._g, C = TidePlotCore, x0 = e.clientX, i = C.boardShell(st), acc = st.shells[i].pos, lx = e.clientX, ly = e.clientY, moved = false, src = e.currentTarget, ghost = null;
    e.preventDefault(); this._endDrag();
    var mv = function (ev) {
      ev.preventDefault();
      var dx = ev.clientX - x0, br = self._qs('.tp-board').getBoundingClientRect();
      if (!moved && Math.abs(dx) < 4 && Math.abs(ev.clientY - e.clientY) < 4) return;
      moved = true;
      /* only a sideways step slides the shell; a step that goes more down than across lifts it, so carrying it to the beach never changes where it was read */
      var sx = ev.clientX - lx, sy = ev.clientY - ly; lx = ev.clientX; ly = ev.clientY;
      if (ev.clientY > br.bottom - 4) {
        /* off the board: the shell shrinks into an X that follows the finger */
        if (!ghost) { ghost = document.createElement('span'); ghost.className = 'tp-x tp-ghost'; ghost.innerHTML = self._x(); document.body.appendChild(ghost); src.style.opacity = '.3'; }
        ghost.style.left = (ev.clientX - 16) + 'px'; ghost.style.top = (ev.clientY - 16) + 'px';
      } else {
        if (ghost) { ghost.remove(); ghost = null; src.style.opacity = ''; }
        var before = st.shells[i].pos;
        if (Math.abs(sx) <= Math.abs(sy)) return;
        acc = Math.max(0, acc + sx / g.ppc * 10);
        var moved1 = C.slide(st, acc); if (st.shells[i].pos < acc - 3) acc = st.shells[i].pos;
        if (moved1) { var s = st.shells[i]; src.style.left = Math.round(18 + s.pos / 10 * g.ppc - src.offsetWidth * self.INK.inset) + 'px'; src.setAttribute('data-pos', s.pos); if (s.pos === 0 && before !== 0) self.api.sound(880); self._view.note = ''; }
      }
    };
    var up = function (ev) {
      self._endDrag();
      if (ghost) { ghost.remove(); src.style.opacity = ''; }
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), col = hit && hit.closest ? hit.closest('[data-col]') : null;
      if (moved && col) { self._dropAt(+col.getAttribute('data-col')); return; }
      self._paint();
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _shellKey: function (e) {
    var st = this.st, C = TidePlotCore, i = C.boardShell(st); if (i == null) return;
    var s = st.shells[i], d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (e.key === 'Home') { e.preventDefault(); if (C.slide(st, 0)) this._moved(); return; }
    /* Enter / Space: drop the shell where its edge reads on the ruler — the keyboard's version of carrying it down */
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); var at = Math.round(C.edgeAt(s)); if (st.cols.indexOf(at) >= 0) this._dropAt(at); return; }
    if (!d) return; e.preventDefault(); if (C.slide(st, s.pos + d * 5)) this._moved();
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _check: function () {
    var st = this.st, v = this._view, C = TidePlotCore; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; v.wobble = res.key === 'hintMeasureFirst'; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { this._success(); return; }
    var r = st.round;
    v.soft = false;
    if (r.kind === 'measure') { if (st.help) { var s = st.shells[st.verdict.shell]; v.guide = true; v.glow = s.len; } }
    else {
      /* tide right, answer wrong (or miss 2): the dry X's number themselves; miss 2 also rings the answer */
      v.numbered = res.why === 'answer' || st.help;
      if (st.help) v.ring = C.answerOf(r);
    }
    v.note = this._t(C.hint(st), this._args());
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  _args: function () {
    var st = this.st, r = st.round, C = TidePlotCore, self = this, a = { n: this._len(r.n || 0), a: this._len(r.n || 0), b: this._len(r.b || 0), k: C.answerOf(r) };
    if (r.kind === 'mode') a.n = this._len(C.answerOf(r));
    if (r.kind === 'range') { a.min = this._len(C.minOf(r.data)); a.max = this._len(C.maxOf(r.data)); }
    if (r.kind === 'measure') {
      var s = st.verdict ? st.shells[st.verdict.shell] : st.shells[0];
      a.len = this._len(s.len);
      a.s1 = this._len(st.shells[0].len); if (st.shells[1]) a.s2 = this._len(st.shells[1].len);
      a.total = r.data.length + st.shells.length;
    }
    return a;
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = TidePlotCore, a = this._args();
    var msg = this._t(C.okKey(st), a);
    /* a half written the textbook way too: «4½ cm = 4,5 cm» */
    if (r.kind === 'measure' && st.shells.length === 1 && this._dec(st.shells[0].len)) msg += ' ' + this._t('okHalf', { h: this._len(st.shells[0].len), d: this._dec(st.shells[0].len) });
    v.note = ''; v.numbered = false; v.ring = null; v.guide = false; v.glow = null;
    st.tide = { L: 0, R: 0, S: 0 };
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectTidePlotCSS() {
  if (typeof document === 'undefined' || document.getElementById('tp-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tp-wrap{position:relative;width:100%;max-width:680px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .tp-wrap:focus{outline:none;}'
  /* the measuring board */
  + '.tp-board{position:relative;border-radius:12px;background:#D9B98A;box-shadow:inset 0 0 0 3px ' + INK + ',0 4px 0 #A9875A;} .tp-rulerwrap{position:absolute;line-height:0;}'
  + '.tp-rulerbody{fill:#F3E2B8;stroke:' + INK + ';stroke-width:2;} .tp-tick{stroke:' + INK + ';stroke-width:2;} .tp-rulnum{font-family:' + H + ';font-weight:800;font-size:15px;fill:' + INK + ';}'
  + '.tp-stop{position:absolute;width:10px;height:44px;border-radius:3px;background:#C9A227;box-shadow:inset 0 0 0 2px #7A5E14;}'
  + '.tp-shell{position:absolute;padding:0;border:0;background:none;cursor:grab;touch-action:none;line-height:0;} .tp-shell:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .tp-shellpic{display:block;pointer-events:none;} .tp-shell.is-wobble{animation:tpWob .4s ease 2;} @keyframes tpWob{30%{transform:rotate(-6deg);}70%{transform:rotate(5deg);}}'
  + '.tp-guide{position:absolute;width:3px;background:repeating-linear-gradient(#146B5E 0 6px,transparent 6px 10px);pointer-events:none;}'
  /* the beach */
  + '.tp-beachbox{width:100%;display:flex;justify-content:center;} .tp-beach{position:relative;border-radius:12px;box-shadow:inset 0 0 0 2px #CFE3EA;overflow:hidden;} .tp-sky{position:absolute;inset:0;background:linear-gradient(#EAF6FB,#F7F3E8);pointer-events:none;}'
  + '.tp-sand{position:absolute;bottom:0;background:#EBD9B4;box-shadow:inset 0 3px 0 ' + INK + ';}'
  + '.tp-num{position:absolute;bottom:0;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';white-space:nowrap;} .tp-wrap.is-narrow .tp-num{font-size:17px;} .is-halves .tp-num{font-size:16px;} .tp-wrap.is-narrow.is-halves .tp-num{font-size:13px;}'
  + '.tp-col{position:absolute;bottom:0;cursor:pointer;border-radius:8px;} .tp-col .tp-num{position:absolute;left:0;right:0;bottom:0;} .tp-col:focus-visible{outline:3px solid #146B5E;outline-offset:-3px;} .tp-col.is-chosen{box-shadow:inset 0 0 0 3px #146B5E;background:rgba(20,107,94,.08);} .tp-col.is-ring .tp-num{text-decoration:underline 3px #F2784B;} .tp-col.is-glow{background:rgba(20,107,94,.16);}'
  + '.tp-x{position:absolute;display:flex;align-items:center;justify-content:center;color:#E8584A;line-height:0;} .tp-x svg{width:100%;height:100%;} .tp-x.is-wet{color:#4B8FB0;opacity:.75;} .tp-x.is-mine{color:#146B5E;} .tp-x.is-hop{animation:tpHop .5s ease 2;} @keyframes tpHop{50%{transform:translateY(-8px);}}'
  + 'span.tp-x{pointer-events:none;} button.tp-x{width:44px;height:44px;padding:9px;border:0;background:none;cursor:pointer;} button.tp-x:focus-visible{outline:3px solid #146B5E;}'
  + '.tp-xnum{position:absolute;right:-8px;top:-8px;min-width:16px;height:16px;padding:0 3px;border-radius:8px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:12px;line-height:16px;}'
  + '.tp-ghost{position:fixed;z-index:60;width:32px;height:32px;pointer-events:none;}'
  + '.tp-feet{position:absolute;width:18px;height:14px;line-height:0;} .tp-feet svg{width:18px;height:14px;fill:#B89A63;} .tp-feet b{position:absolute;left:3px;top:-16px;font-family:' + H + ';font-size:12px;color:#146B5E;line-height:1;}'
  + '.tp-water{position:absolute;bottom:0;top:0;background:rgba(126,200,227,.65);pointer-events:none;transition:width .1s,left .1s,height .1s;} .tp-water.is-sea{top:auto;} .tp-water.is-left{box-shadow:inset -4px 0 0 #fff;} .tp-water.is-right{box-shadow:inset 4px 0 0 #fff;} .tp-water.is-sea{box-shadow:inset 0 4px 0 #fff;}'
  + '.tp-handle,.tp-buoy{position:absolute;z-index:3;width:44px;height:44px;padding:6px;border:0;border-radius:12px;background:#2E86AB;color:#fff;cursor:ew-resize;touch-action:none;line-height:0;box-shadow:0 2px 0 #1B5F7A;} .tp-buoy{background:none;box-shadow:none;cursor:ns-resize;padding:2px;} .tp-handle:focus-visible,.tp-buoy:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .tp-handle svg,.tp-buoy svg{width:100%;height:100%;} .tp-handle:disabled,.tp-buoy:disabled{opacity:.5;}'
  + '.tp-post{position:absolute;top:2px;width:3px;background:#7A5E14;border-radius:2px;}'
  /* the pebbles */
  + '.tp-pebbles{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;} .tp-pebble{width:52px;height:46px;border:0;border-radius:50%/45%;background:#D9D4CA;box-shadow:inset 0 -3px 0 #B7B0A3;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .tp-pebble.is-chosen{background:#146B5E;color:#fff;box-shadow:none;} .tp-pebble.is-ring{box-shadow:0 0 0 3px #F2784B;} .tp-pebble:focus-visible{outline:3px solid #146B5E;} .tp-pebble.is-len{width:auto;min-width:56px;padding:0 10px;border-radius:22px;} .tp-pebble.is-len small{font-size:.6em;font-weight:700;} .tp-wrap.is-narrow .tp-pebble.is-len{width:auto;min-width:50px;padding:0 7px;} .tp-wrap.is-narrow .tp-pebble{width:44px;height:44px;font-size:19px;}'
  + '.tp-ctrl{display:flex;justify-content:center;width:100%;} .tp-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0D4A41;} .tp-go svg{width:22px;height:22px;} .tp-wrap.is-done .tp-go{display:none;}'
  + '.tp-note{margin:0;min-height:1.3em;font-family:' + B + ';font-weight:700;font-size:18px;color:#146B5E;text-align:center;} .tp-note.is-hint{color:#A3401F;} .tp-wrap.is-narrow .tp-note{font-size:16px;} .tp-note:empty,.tp-pebbles:empty{display:none;}'
  + '.tp-picwait{display:block;}'
  + '@media (prefers-reduced-motion:reduce){.tp-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'tp-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.TidePlotActivity = TidePlotActivity;
