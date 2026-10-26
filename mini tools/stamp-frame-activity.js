/* =====================================================================
   stamp-frame-activity.js — ACTIVITY #23 of the one-by-one rebuild:
   "Show the Operation" (K.OA.A.1) — THE STAMP FRAME.
   Design sheet: docs/activities-rebuild/designs/023-ten-frame.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: three rubber stamps — an orange dot for the first
   number, a green dot for the second, a big cross to take away — and the
   child PRINTS the expression on a ten-frame. Check tidies the counters
   into reading order (it only ever moves them) and every number in the
   equation reaches down with a BRACKET over its own counters: a counter
   sticking out of its bracket or an empty dashed place inside it is seen
   at once. A right printing merges the two brackets (addition) or peels
   the crossed counters off into the away dish (take-away); only then is
   "how many altogether / left?" asked, on a fixed number strip where a
   key's place is its value. "Stamp anything" is free play: all three
   stamps, two frames, and the equation writes itself from the ink.
   No mascot: a frame, stamps, counters, brackets, a dish, a strip.

   ACTIVITY LAYER ONLY: the model is stamp-frame-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by the frame when the answer
   is right). Test seams: window.StampFrameActivity.st / ._order / ._pool.
   ===================================================================== */
'use strict';

var StampFrameActivity = {
  id: 'stamp-frame',
  apparatusClasses: ['sf-'],

  strings: {
    title:        {en:'The Stamp Frame',de:'Der Stempelrahmen',fr:'Le cadre à tampons',it:'La griglia dei timbri',es:'El marco de sellos',pt:'O quadro de carimbos',nl:'Het stempelraam',sv:'Stämpelramen',da:'Stempelrammen',no:'Stempelrammen',fi:'Leimasinruudukko'},
    instruction:  {en:'Stamp the first number in orange. To add, stamp the second number in green. To take away, stamp a cross on that many orange counters.',de:'Stempel die erste Zahl in Orange. Beim Plus stempelst du die zweite Zahl in Grün. Zum Wegnehmen stempelst du auf so viele orange Plättchen ein Kreuz.',fr:'Tamponne le premier nombre en orange. Pour ajouter, tamponne le deuxième nombre en vert. Pour enlever, tamponne une croix sur autant de jetons orange que le deuxième nombre.',it:'Timbra il primo numero in arancione. Per aggiungere, timbra il secondo numero in verde. Per togliere, timbra una croce su tanti gettoni arancioni quanti ne dice il secondo numero.',es:'Sella el primer número en naranja. Para sumar, sella el segundo número en verde. Para quitar, sella una cruz sobre tantas fichas naranjas como dice el segundo número.',pt:'Carimbe o primeiro número em laranja. Para somar, carimbe o segundo número em verde. Para tirar, carimbe um X em tantas fichas laranja quanto o segundo número.',nl:'Stempel het eerste getal in het oranje. Bij erbij stempel je het tweede getal in het groen. Bij eraf stempel je een kruisje op evenveel oranje fiches als het tweede getal.',sv:'Stämpla det första talet i orange. När du lägger till stämplar du det andra talet i grönt. När du tar bort stämplar du ett kryss på lika många orange brickor som det andra talet.',da:'Stempl det første tal med orange. Når du lægger til, stempler du det andet tal med grønt. Når du tager væk, stempler du et kryds på lige så mange orange brikker som det andet tal.',no:'Stemple det første tallet med oransje. Når du legger til, stempler du det andre tallet med grønt. Når du tar bort, stempler du et kryss på like mange oransje brikker som det andre tallet.',fi:'Leimaa ensimmäinen luku oranssilla. Yhteenlaskussa leimaa toinen luku vihreällä. Kun otat pois, leimaa risti niin moneen oranssiin merkkiin kuin toinen luku sanoo.'},
    promptAdd:    {en:'Show {a} + {b} on the ten-frame.',de:'Zeige {a} + {b} im Zehnerfeld.',fr:'Montre {a} + {b} sur le cadre de dix.',it:'Mostra {a} + {b} sulla griglia del dieci.',es:'Muestra {a} + {b} en el marco de diez.',pt:'Mostre {a} + {b} no quadro de dez.',nl:'Laat {a} + {b} zien op het tienraam.',sv:'Visa {a} + {b} på tioramen.',da:'Vis {a} + {b} på tierrammen.',no:'Vis {a} + {b} på tierrammen.',fi:'Näytä {a} + {b} kymmenruudukossa.'},
    promptSub:    {en:'Show {a} − {b} on the ten-frame.',de:'Zeige {a} − {b} im Zehnerfeld.',fr:'Montre {a} − {b} sur le cadre de dix.',it:'Mostra {a} − {b} sulla griglia del dieci.',es:'Muestra {a} − {b} en el marco de diez.',pt:'Mostre {a} − {b} no quadro de dez.',nl:'Laat {a} − {b} zien op het tienraam.',sv:'Visa {a} − {b} på tioramen.',da:'Vis {a} − {b} på tierrammen.',no:'Vis {a} − {b} på tierrammen.',fi:'Näytä {a} − {b} kymmenruudukossa.'},
    askAdd:       {en:'{a} and {b}. How many altogether?',de:'{a} und {b}. Wie viele sind es zusammen?',fr:'{a} et {b}. Combien en tout ?',it:'{a} e {b}. Quanti gettoni in tutto?',es:'{a} y {b}. ¿Cuántas fichas hay en total?',pt:'{a} e {b}. Quantas fichas ao todo?',nl:'{a} en {b}. Hoeveel zijn het samen?',sv:'{a} och {b}. Hur många är det tillsammans?',da:'{a} og {b}. Hvor mange er der i alt?',no:'{a} og {b}. Hvor mange er det til sammen?',fi:'{a} ja {b}. Montako niitä on yhteensä?'},
    askSub:       {en:'{a} take away {b}. How many are left?',de:'{a}, davon nehme ich {b} weg. Wie viele bleiben übrig?',fr:'{a}, j’en enlève {b}. Combien en reste-t-il ?',it:'{a}, ne tolgo {b}. Quanti gettoni restano?',es:'{a}, quito {b}. ¿Cuántas fichas quedan?',pt:'{a}, tiro {b}. Quantas fichas sobram?',nl:'{a}, haal er {b} af. Hoeveel blijven er over?',sv:'{a}, ta bort {b}. Hur många är kvar?',da:'{a}, tag {b} væk. Hvor mange er der tilbage?',no:'{a}, ta bort {b}. Hvor mange er det igjen?',fi:'{a}, otetaan pois {b}. Montako on jäljellä?'},
    hintStart:    {en:'Lift a stamp and press it on the frame.',de:'Nimm einen Stempel und drück ihn auf das Feld.',fr:'Prends un tampon et appuie-le sur le cadre.',it:'Prendi un timbro e premilo sulla griglia.',es:'Toma un sello y presiónalo en el marco.',pt:'Pegue um carimbo e aperte no quadro.',nl:'Pak een stempel en druk hem op het raam.',sv:'Ta en stämpel och tryck den på ramen.',da:'Tag et stempel, og tryk det på rammen.',no:'Ta et stempel og trykk det på rammen.',fi:'Ota leimasin ja paina se ruudukkoon.'},
    hintOutside1: {en:'Look under the {n}: one counter is outside the bracket.',de:'Schau unter die {n}: Ein Plättchen liegt außerhalb der Klammer.',fr:'Regarde sous le {n}\u00a0: un jeton est en dehors de l’accolade.',it:'Guarda sotto il numero {n}: un gettone è fuori dalla parentesi.',es:'Mira debajo del {n}: una ficha está fuera de la llave.',pt:'Olhe embaixo do {n}: uma ficha está fora da chave.',nl:'Kijk onder de {n}: één fiche ligt buiten de boog.',sv:'Titta under {n}: en bricka ligger utanför klammern.',da:'Kig under {n}: én brik ligger uden for klammen.',no:'Se under {n}: én brikke ligger utenfor klammen.',fi:'Katso luvun {n} alle: yksi merkki on kaaren ulkopuolella.'},
    hintOutsideN: {en:'Look under the {n}: {k} counters are outside the bracket.',de:'Schau unter die {n}: {k} Plättchen liegen außerhalb der Klammer.',fr:'Regarde sous le {n}\u00a0: {k} jetons sont en dehors de l’accolade.',it:'Guarda sotto il numero {n}: {k} gettoni sono fuori dalla parentesi.',es:'Mira debajo del {n}: {k} fichas están fuera de la llave.',pt:'Olhe embaixo do {n}: {k} fichas estão fora da chave.',nl:'Kijk onder de {n}: {k} fiches liggen buiten de boog.',sv:'Titta under {n}: {k} brickor ligger utanför klammern.',da:'Kig under {n}: {k} brikker ligger uden for klammen.',no:'Se under {n}: {k} brikker ligger utenfor klammen.',fi:'Katso luvun {n} alle: {k} merkkiä on kaaren ulkopuolella.'},
    hintEmpty1:   {en:'Look under the {n}: one place is still empty.',de:'Schau unter die {n}: Ein Platz ist noch leer.',fr:'Regarde sous le {n} : une case est encore vide.',it:'Guarda sotto il numero {n}: un posto è ancora vuoto.',es:'Mira debajo del {n}: un lugar sigue vacío.',pt:'Olhe embaixo do {n}: um lugar ainda está vazio.',nl:'Kijk onder de {n}: één vakje is nog leeg.',sv:'Titta under {n}: en plats är fortfarande tom.',da:'Kig under {n}: én plads er stadig tom.',no:'Se under {n}: én plass er fortsatt tom.',fi:'Katso luvun {n} alle: yksi paikka on vielä tyhjä.'},
    hintEmptyN:   {en:'Look under the {n}: {k} places are still empty.',de:'Schau unter die {n}: {k} Plätze sind noch leer.',fr:'Regarde sous le {n} : {k} cases sont encore vides.',it:'Guarda sotto il numero {n}: {k} posti sono ancora vuoti.',es:'Mira debajo del {n}: {k} lugares siguen vacíos.',pt:'Olhe embaixo do {n}: {k} lugares ainda estão vazios.',nl:'Kijk onder de {n}: {k} vakjes zijn nog leeg.',sv:'Titta under {n}: {k} platser är fortfarande tomma.',da:'Kig under {n}: {k} pladser er stadig tomme.',no:'Se under {n}: {k} plasser er fortsatt tomme.',fi:'Katso luvun {n} alle: {k} paikkaa on vielä tyhjänä.'},
    hintCross:    {en:'Take away means cross out. Use the cross stamp.',de:'Wegnehmen heißt durchstreichen. Nimm den Kreuzstempel.',fr:'Enlever, c’est barrer. Prends le tampon croix.',it:'Togliere vuol dire barrare. Usa il timbro con la croce.',es:'Quitar es tachar. Usa el sello de cruz.',pt:'Tirar é riscar. Use o carimbo de X.',nl:'Weghalen is doorstrepen. Gebruik de kruisjesstempel.',sv:'Ta bort betyder att stryka över. Använd kryssstämpeln.',da:'At tage væk er at strege ud. Brug krydsstemplet.',no:'Å ta bort er å stryke ut. Bruk kryss-stempelet.',fi:'Pois ottaminen tarkoittaa yliviivaamista. Käytä ristileimasinta.'},
    hintCrossMore1:{en:'Look under the {n}: one more counter needs a cross.',de:'Schau unter die {n}: Ein Plättchen braucht noch ein Kreuz.',fr:'Regarde sous le {n} : il faut encore barrer un jeton.',it:'Guarda sotto il numero {n}: c’è ancora un gettone da barrare.',es:'Mira debajo del {n}: todavía hay que tachar una ficha.',pt:'Olhe embaixo do {n}: ainda falta riscar uma ficha.',nl:'Kijk onder de {n}: er moet nog één fiche een kruisje krijgen.',sv:'Titta under {n}: en bricka till behöver ett kryss.',da:'Kig under {n}: én brik mere skal have et kryds.',no:'Se under {n}: én brikke til trenger et kryss.',fi:'Katso luvun {n} alle: vielä yksi merkki tarvitsee ristin.'},
    hintCrossMoreN:{en:'Look under the {n}: {k} more counters need a cross.',de:'Schau unter die {n}: {k} Plättchen brauchen noch ein Kreuz.',fr:'Regarde sous le {n} : il faut encore barrer {k} jetons.',it:'Guarda sotto il numero {n}: ci sono ancora {k} gettoni da barrare.',es:'Mira debajo del {n}: todavía hay que tachar {k} fichas.',pt:'Olhe embaixo do {n}: ainda falta riscar {k} fichas.',nl:'Kijk onder de {n}: er moeten nog {k} fiches een kruisje krijgen.',sv:'Titta under {n}: {k} brickor till behöver ett kryss.',da:'Kig under {n}: {k} brikker mere skal have et kryds.',no:'Se under {n}: {k} brikker til trenger et kryss.',fi:'Katso luvun {n} alle: vielä {k} merkkiä tarvitsee ristin.'},
    hintCrossLess1:{en:'Look under the {n}: one cross is too many. Tap it with the cross stamp to take it off.',de:'Schau unter die {n}: Ein Kreuz ist zu viel. Tipp es mit dem Kreuzstempel an, dann geht es weg.',fr:'Regarde sous le {n} : une croix est en trop. Touche-la avec le tampon croix pour l’enlever.',it:'Guarda sotto il numero {n}: c’è una croce di troppo. Toccala con il timbro con la croce per toglierla.',es:'Mira debajo del {n}: sobra una cruz. Tócala con el sello de cruz para quitarla.',pt:'Olhe embaixo do {n}: tem um X a mais. Toque nele com o carimbo de X para tirar.',nl:'Kijk onder de {n}: er is één kruisje te veel. Tik erop met de kruisjesstempel om het weg te halen.',sv:'Titta under {n}: det finns ett kryss för mycket. Tryck på det med kryssstämpeln så försvinner det.',da:'Kig under {n}: der er ét kryds for meget. Tryk på det med krydsstemplet, så forsvinder det.',no:'Se under {n}: det er ett kryss for mye. Trykk på det med kryss-stempelet, så forsvinner det.',fi:'Katso luvun {n} alle: yksi risti on liikaa. Napauta sitä ristileimasimella, niin se lähtee pois.'},
    hintCrossLessN:{en:'Look under the {n}: {k} crosses are too many. Tap them with the cross stamp to take them off.',de:'Schau unter die {n}: {k} Kreuze sind zu viel. Tipp sie mit dem Kreuzstempel an, dann gehen sie weg.',fr:'Regarde sous le {n} : {k} croix sont en trop. Touche-les avec le tampon croix pour les enlever.',it:'Guarda sotto il numero {n}: ci sono {k} croci di troppo. Toccale con il timbro con la croce per toglierle.',es:'Mira debajo del {n}: sobran {k} cruces. Tócalas con el sello de cruz para quitarlas.',pt:'Olhe embaixo do {n}: tem {k} X a mais. Toque neles com o carimbo de X para tirar.',nl:'Kijk onder de {n}: er zijn {k} kruisjes te veel. Tik erop met de kruisjesstempel om ze weg te halen.',sv:'Titta under {n}: det finns {k} kryss för mycket. Tryck på dem med kryssstämpeln så försvinner de.',da:'Kig under {n}: der er {k} krydser for meget. Tryk på dem med krydsstemplet, så forsvinder de.',no:'Se under {n}: det er {k} kryss for mye. Trykk på dem med kryss-stempelet, så forsvinner de.',fi:'Katso luvun {n} alle: {k} ristiä on liikaa. Napauta niitä ristileimasimella, niin ne lähtevät pois.'},
    hintSlots:    {en:'Stamp one counter in each place under the {n}.',de:'Stempel ein Plättchen auf jeden Platz unter der {n}.',fr:'Tamponne un jeton dans chaque case sous le {n}.',it:'Timbra un gettone in ogni posto sotto il numero {n}.',es:'Sella una ficha en cada lugar debajo del {n}.',pt:'Carimbe uma ficha em cada lugar embaixo do {n}.',nl:'Stempel één fiche in elk vakje onder de {n}.',sv:'Stämpla en bricka på varje plats under {n}.',da:'Stempl én brik på hver plads under {n}.',no:'Stemple én brikke på hver plass under {n}.',fi:'Leimaa yksi merkki jokaiseen paikkaan luvun {n} alla.'},
    hintSlotsX:   {en:'Cross out one counter in each place under the {n}.',de:'Streich auf jedem Platz unter der {n} ein Plättchen durch.',fr:'Barre un jeton dans chaque case sous le {n}.',it:'Barra un gettone in ogni posto sotto il numero {n}.',es:'Tacha una ficha en cada lugar debajo del {n}.',pt:'Risque uma ficha em cada lugar embaixo do {n}.',nl:'Streep in elk vakje onder de {n} één fiche door.',sv:'Stryk över en bricka på varje plats under {n}.',da:'Streg én brik ud på hver plads under {n}.',no:'Stryk ut én brikke på hver plass under {n}.',fi:'Viivaa yli yksi merkki jokaisessa paikassa luvun {n} alla.'},
    hintPart:     {en:'That’s only the {n} part. Count them all.',de:'Das ist nur der Teil mit {n}. Zähl alle zusammen.',fr:'Ça, c’est seulement la partie {n}. Compte-les tous.',it:'Quella è solo una parte: {n}. Contali tutti.',es:'Esa es solo la parte del {n}. Cuéntalas todas.',pt:'Essa é só a parte do {n}. Conte todas.',nl:'Dat is alleen het deel {n}. Tel ze allemaal.',sv:'Det är bara delen {n}. Räkna alla.',da:'Det er kun delen {n}. Tæl dem alle.',no:'Det er bare delen {n}. Tell alle sammen.',fi:'Se on vain osa {n}. Laske kaikki.'},
    hintAway:     {en:'Those were taken away. Count the ones still on the frame.',de:'Die wurden weggenommen. Zähl die, die noch im Feld sind.',fr:'Ceux-là ont été enlevés. Compte ceux qui restent sur le cadre.',it:'Quelli sono stati tolti. Conta quelli che restano sulla griglia.',es:'Esas se quitaron. Cuenta las que siguen en el marco.',pt:'Essas foram tiradas. Conte as que ainda estão no quadro.',nl:'Die zijn weggehaald. Tel de fiches die nog op het raam liggen.',sv:'De togs bort. Räkna dem som ligger kvar på ramen.',da:'De blev taget væk. Tæl dem, der stadig er på rammen.',no:'De ble tatt bort. Tell dem som fortsatt er på rammen.',fi:'Ne otettiin pois. Laske ne, jotka ovat vielä ruudukossa.'},
    hintCountAll: {en:'Count every counter on the frame.',de:'Zähl jedes Plättchen im Feld.',fr:'Compte tous les jetons du cadre.',it:'Conta tutti i gettoni sulla griglia.',es:'Cuenta todas las fichas del marco.',pt:'Conte todas as fichas do quadro.',nl:'Tel alle fiches op het raam.',sv:'Räkna varje bricka på ramen.',da:'Tæl hver brik på rammen.',no:'Tell hver brikke på rammen.',fi:'Laske jokainen merkki ruudukossa.'},
    hintNumbers:  {en:'Count with the numbers. Which number goes where the question mark is?',de:'Zähl mit den Zahlen. Welche Zahl gehört zum Fragezeichen?',fr:'Compte avec les nombres. Quel nombre va à la place du point d’interrogation ?',it:'Conta con i numeri. Quale numero va al posto del punto interrogativo?',es:'Cuenta con los números. ¿Qué número va donde está el signo de interrogación?',pt:'Conte com os números. Qual número vai no lugar do ponto de interrogação?',nl:'Tel met de getallen. Welk getal hoort bij het vraagteken?',sv:'Räkna med talen. Vilket tal ska stå vid frågetecknet?',da:'Tæl med tallene. Hvilket tal hører til spørgsmålstegnet?',no:'Tell med tallene. Hvilket tall hører til spørsmålstegnet?',fi:'Laske lukujen avulla. Mikä luku kuuluu kysymysmerkin paikalle?'},
    hintFillFirst:{en:'Fill the first ten-frame first.',de:'Füll zuerst das erste Zehnerfeld.',fr:'Remplis d’abord le premier cadre de dix.',it:'Riempi prima la prima griglia del dieci.',es:'Llena primero el primer marco de diez.',pt:'Complete primeiro o primeiro quadro de dez.',nl:'Vul eerst het eerste tienraam.',sv:'Fyll den första tioramen först.',da:'Fyld den første tierramme først.',no:'Fyll den første tierrammen først.',fi:'Täytä ensin ensimmäinen kymmenruudukko.'},
    celebrateAdd: {en:'{a} + {b} = {c}. The two parts make {c}!',de:'{a} + {b} = {c}. Die zwei Teile ergeben {c}!',fr:'{a} + {b} = {c}. Les deux parties font {c} !',it:'{a} + {b} = {c}. Le due parti fanno {c}!',es:'{a} + {b} = {c}. ¡Las dos partes hacen {c}!',pt:'{a} + {b} = {c}. As duas partes fazem {c}!',nl:'{a} + {b} = {c}. De twee delen samen zijn {c}!',sv:'{a} + {b} = {c}. De två delarna blir {c}!',da:'{a} + {b} = {c}. De to dele giver {c}!',no:'{a} + {b} = {c}. De to delene blir {c}!',fi:'{a} + {b} = {c}. Kaksi osaa on yhteensä {c}!'},
    celebrateSub: {en:'{a} − {b} = {c}. {c} are left!',de:'{a} − {b} = {c}. {c} bleiben übrig!',fr:'{a} − {b} = {c}. Il en reste {c} !',it:'{a} − {b} = {c}. Ne restano {c}!',es:'{a} − {b} = {c}. ¡Quedan {c}!',pt:'{a} − {b} = {c}. Sobram {c}!',nl:'{a} − {b} = {c}. Er blijven er {c} over!',sv:'{a} − {b} = {c}. {c} är kvar!',da:'{a} − {b} = {c}. Der er {c} tilbage!',no:'{a} − {b} = {c}. Det er {c} igjen!',fi:'{a} − {b} = {c}. {c} on jäljellä!'},
    celebrateSub1:{en:'{a} − {b} = 1. 1 is left!',de:'{a} − {b} = 1. 1 bleibt übrig!',fr:'{a} − {b} = 1. Il en reste 1 !',it:'{a} − {b} = 1. Ne resta 1!',es:'{a} − {b} = 1. ¡Queda 1!',pt:'{a} − {b} = 1. Sobra 1!',nl:'{a} − {b} = 1. Er blijft er 1 over!',sv:'{a} − {b} = 1. 1 är kvar!',da:'{a} − {b} = 1. Der er 1 tilbage!',no:'{a} − {b} = 1. Det er 1 igjen!',fi:'{a} − {b} = 1. 1 on jäljellä!'},
    celebrateDots:{en:'{a} dots and {b} dots make {c}!',de:'{a} Punkte und {b} Punkte ergeben {c}!',fr:'{a} points et {b} points, ça fait {c} !',it:'{a} punti e {b} punti fanno {c}!',es:'¡{a} puntos y {b} puntos hacen {c}!',pt:'{a} pontos e {b} pontos fazem {c}!',nl:'{a} stippen en {b} stippen zijn samen {c}!',sv:'{a} prickar och {b} prickar blir {c}!',da:'{a} prikker og {b} prikker giver {c}!',no:'{a} prikker og {b} prikker blir {c}!',fi:'{a} pistettä ja {b} pistettä on yhteensä {c}!'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Verifica',es:'Comprobar',pt:'Verificar',nl:'Controleer',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    play:         {en:'Stamp anything',de:'Stempeln, wie du willst',fr:'Tamponner comme tu veux',it:'Timbra come vuoi',es:'Sella como quieras',pt:'Carimbe como quiser',nl:'Stempel wat je wilt',sv:'Stämpla som du vill',da:'Stempl som du vil',no:'Stemple som du vil',fi:'Leimaa omin päin'},
    playBack:     {en:'Back to the task',de:'Zurück zur Aufgabe',fr:'Retour à l’exercice',it:'Torna all’esercizio',es:'Volver a la tarea',pt:'Voltar à tarefa',nl:'Terug naar de opdracht',sv:'Tillbaka till uppgiften',da:'Tilbage til opgaven',no:'Tilbake til oppgaven',fi:'Takaisin tehtävään'},
    playNote:     {en:'Stamp anything. The equation writes itself.',de:'Stempel, was du willst. Die Rechnung schreibt sich von selbst.',fr:'Tamponne ce que tu veux. Le calcul s’écrit tout seul.',it:'Timbra quello che vuoi. Il calcolo si scrive da solo.',es:'Sella lo que quieras. La operación se escribe sola.',pt:'Carimbe o que quiser. A conta se escreve sozinha.',nl:'Stempel wat je wilt. De som schrijft zichzelf.',sv:'Stämpla vad du vill. Uträkningen skriver sig själv.',da:'Stempl hvad du vil. Regnestykket skriver sig selv.',no:'Stemple hva du vil. Regnestykket skriver seg selv.',fi:'Leimaa mitä haluat. Lasku kirjoittuu itsestään.'},
    clearAll:     {en:'Wipe the frame',de:'Feld leeren',fr:'Vider le cadre',it:'Svuota la griglia',es:'Vaciar el marco',pt:'Limpar o quadro',nl:'Raam leegmaken',sv:'Töm ramen',da:'Tøm rammen',no:'Tøm rammen',fi:'Tyhjennä ruudukko'},
    stampC:       {en:'Orange stamp',de:'Oranger Stempel',fr:'Tampon orange',it:'Timbro arancione',es:'Sello naranja',pt:'Carimbo laranja',nl:'Oranje stempel',sv:'Orange stämpel',da:'Orange stempel',no:'Oransje stempel',fi:'Oranssi leimasin'},
    stampT:       {en:'Green stamp',de:'Grüner Stempel',fr:'Tampon vert',it:'Timbro verde',es:'Sello verde',pt:'Carimbo verde',nl:'Groene stempel',sv:'Grön stämpel',da:'Grønt stempel',no:'Grønt stempel',fi:'Vihreä leimasin'},
    stampX:       {en:'Cross stamp',de:'Kreuzstempel',fr:'Tampon croix',it:'Timbro con la croce',es:'Sello de cruz',pt:'Carimbo de X',nl:'Kruisjesstempel',sv:'Kryssstämpel',da:'Krydsstempel',no:'Kryss-stempel',fi:'Ristileimasin'},
    cellLabel:    {en:'Row {r}, place {p}: {s}',de:'Reihe {r}, Platz {p}: {s}',fr:'Ligne {r}, case {p} : {s}',it:'Riga {r}, posto {p}: {s}',es:'Fila {r}, lugar {p}: {s}',pt:'Linha {r}, lugar {p}: {s}',nl:'Rij {r}, vakje {p}: {s}',sv:'Rad {r}, plats {p}: {s}',da:'Række {r}, plads {p}: {s}',no:'Rad {r}, plass {p}: {s}',fi:'Rivi {r}, paikka {p}: {s}'},
    sEmpty:       {en:'empty',de:'leer',fr:'vide',it:'vuoto',es:'vacío',pt:'vazio',nl:'leeg',sv:'tom',da:'tom',no:'tom',fi:'tyhjä'},
    sCoral:       {en:'orange counter',de:'oranges Plättchen',fr:'jeton orange',it:'gettone arancione',es:'ficha naranja',pt:'ficha laranja',nl:'oranje fiche',sv:'orange bricka',da:'orange brik',no:'oransje brikke',fi:'oranssi merkki'},
    sTeal:        {en:'green counter',de:'grünes Plättchen',fr:'jeton vert',it:'gettone verde',es:'ficha verde',pt:'ficha verde',nl:'groene fiche',sv:'grön bricka',da:'grøn brik',no:'grønn brikke',fi:'vihreä merkki'},
    sCrossed:     {en:'crossed-out counter',de:'durchgestrichenes Plättchen',fr:'jeton barré',it:'gettone barrato',es:'ficha tachada',pt:'ficha riscada',nl:'doorgestreepte fiche',sv:'överstruken bricka',da:'overstreget brik',no:'overstreket brikke',fi:'yliviivattu merkki'},
    dishLabel:    {en:'Taken away: {k}',de:'Weggenommen: {k}',fr:'Enlevés : {k}',it:'Tolti: {k}',es:'Quitadas: {k}',pt:'Tiradas: {k}',nl:'Weggehaald: {k}',sv:'Borttagna: {k}',da:'Taget væk: {k}',no:'Tatt bort: {k}',fi:'Pois otettu: {k}'},
    answerBox:    {en:'The answer',de:'Die Antwort',fr:'La réponse',it:'La risposta',es:'La respuesta',pt:'A resposta',nl:'Het antwoord',sv:'Svaret',da:'Svaret',no:'Svaret',fi:'Vastaus'},
    stripLabel:   {en:'Number strip',de:'Zahlenstreifen',fr:'Bande numérique',it:'Striscia dei numeri',es:'Tira de números',pt:'Faixa de números',nl:'Getallenstrook',sv:'Tallremsa',da:'Talstrimmel',no:'Tallstripe',fi:'Lukunauha'},
    setNumbers:   {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    within5:      {en:'Within 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opp til 5',fi:'5:een asti'},
    within10:     {en:'Within 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opp til 10',fi:'10:een asti'},
    within20:     {en:'Within 20',de:'Bis 20',fr:'Jusqu’à 20',it:'Fino a 20',es:'Hasta 20',pt:'Até 20',nl:'Tot en met 20',sv:'Upp till 20',da:'Op til 20',no:'Opp til 20',fi:'20:een asti'},
    setShow:      {en:'Show as',de:'Zeigen als',fr:'Afficher',it:'Mostra come',es:'Mostrar como',pt:'Mostrar como',nl:'Laten zien als',sv:'Visa som',da:'Vis som',no:'Vis som',fi:'Näytä'},
    showNumerals: {en:'Numerals',de:'Ziffern',fr:'Chiffres',it:'Cifre',es:'Cifras',pt:'Algarismos',nl:'Cijfers',sv:'Siffror',da:'Cifre',no:'Sifre',fi:'Numeroina'},
    showDots:     {en:'Dots',de:'Punkte',fr:'Points',it:'Punti',es:'Puntos',pt:'Pontos',nl:'Stippen',sv:'Prickar',da:'Prikker',no:'Prikker',fi:'Pisteinä'}
  },

  defaults: { numbers: 'within10', show: 'numerals' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'within5', labelKey: 'within5' }, { value: 'within10', labelKey: 'within10' }, { value: 'within20', labelKey: 'within20' }] },
    { key: 'show', type: 'choice', labelKey: 'setShow', options: [{ value: 'numerals', labelKey: 'showNumerals' }, { value: 'dots', labelKey: 'showDots' }] }
  ],

  /* motion timings */
  BRACKET_MS: 750, PEEL_STEP: 120, CHECK_MS: 500,
  INK: { c: '#F2784B', t: '#2E9C88' },
  BR: { a: '#C9542A', b: '#1D7A68', all: '#2B3A36', left: '#2B3A36', gold: '#B8902F' },

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._timers = []; this._ro = null;
    this._show1 = false; this._showCells = null; this._glow = null; this._flashKey = null; this._flashCell = -1; this._wave = false;
    injectStampFrameCSS();
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur();
      if (!st || (!st.explore && st.step !== 1)) return;
      var r = StampFrameCore.rack(st), k = ['1', '2', '3'].indexOf(ev.key);
      if (k >= 0 && k < r.length) { self._select(r[k]); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    this._pool = null; this._order = null; this._playing = false;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },

  /* ---------------- rounds ---------------- */
  _level: function () { return StampFrameCore.level(this.api && this.api.settings && this.api.settings.numbers); },
  _showAs: function () { var s = this.api && this.api.settings && this.api.settings.show; return StampFrameCore.SHOWS.indexOf(s) >= 0 ? s : 'numerals'; },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = StampFrameCore.rounds(key); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = StampFrameCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = StampFrameCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'stamp-frame.' + r.id,
      promptKey: r.op === '+' ? 'promptAdd' : 'promptSub',
      promptArgs: { a: r.a, b: r.b, c: StampFrameCore.result(r.a, r.b, r.op) },
      celebrateKey: StampFrameCore.celebrateKey(r, this._showAs()),
      answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool.st = StampFrameCore.newState(r); tool._playing = false; tool._busy = false; tool._show1 = false; tool._showCells = null; tool._glow = null; tool._flashKey = null; tool._wave = false; },
      /* the frame presses Check itself when the answer on the strip is right */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    if (!this.st) this.st = StampFrameCore.newState(StampFrameCore.rounds('within10')[1]);
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'sf-wrap'); this._wrap = wrap;

    var eq = api.el('div', 'sf-eq'); eq.setAttribute('aria-hidden', 'true'); this._eq = eq; wrap.appendChild(eq);

    var body = api.el('div', 'sf-body'); this._body = body;
    var framesEl = api.el('div', 'sf-frames'); this._framesEl = framesEl;
    this._frameEls = []; this._cellEls = []; this._svgs = [];
    for (var f = 0; f < 2; f++) {
      var frame = api.el('div', 'sf-frame');
      var grid = api.el('div', 'sf-grid'); grid.setAttribute('role', 'group');
      for (var j = 0; j < StampFrameCore.FRAME; j++) {
        (function (i) {
          var cell = api.el('button', 'sf-cell'); cell.type = 'button'; cell.setAttribute('data-i', String(i));
          cell.innerHTML = '<span class="sf-ink"></span><svg class="sf-x" viewBox="0 0 40 40" aria-hidden="true"><path d="M9 9L31 31"/><path d="M31 9L9 31"/></svg><span class="sf-chip" aria-hidden="true"></span>';
          cell.addEventListener('click', function () { self._press(i); });
          grid.appendChild(cell); self._cellEls[i] = cell;
        }(f * StampFrameCore.FRAME + j));
      }
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'sf-br'); svg.setAttribute('aria-hidden', 'true');
      frame.appendChild(grid); frame.appendChild(svg);
      framesEl.appendChild(frame); this._frameEls.push(frame); this._svgs.push(svg);
    }
    body.appendChild(framesEl);
    var side = api.el('div', 'sf-side'); this._side = side;
    var dish = api.el('div', 'sf-dish'); dish.innerHTML = '<svg class="sf-dish-bowl" viewBox="0 0 120 40" aria-hidden="true"><path d="M4 10 Q60 52 116 10 Z" fill="#E9DFCB" stroke="#8C7A5B" stroke-width="3" stroke-linejoin="round"/><ellipse cx="60" cy="10" rx="56" ry="7" fill="#F6EFE0" stroke="#8C7A5B" stroke-width="3"/></svg><div class="sf-dish-pile"></div>';
    this._dish = dish; this._pile = dish.querySelector('.sf-dish-pile'); side.appendChild(dish);
    body.appendChild(side);
    wrap.appendChild(body);
    var note = api.el('div', 'sf-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);

    /* the rack (step 1, free play) and the number strip (step 2) share one place */
    var tools = api.el('div', 'sf-tools');
    var rack = api.el('div', 'sf-rack'); this._rack = rack; this._stampEls = {};
    ['c', 't', 'x'].forEach(function (s) {
      var b = api.el('button', 'sf-stamp sf-stamp-' + s); b.type = 'button';
      b.innerHTML = '<span class="sf-handle"></span><span class="sf-block"><span class="sf-face"></span></span>';
      b.addEventListener('click', function () { self._select(s); });
      rack.appendChild(b); self._stampEls[s] = b;
    });
    var wipe = api.el('button', 'sf-tool sf-wipe'); wipe.type = 'button';
    wipe.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>';
    wipe.addEventListener('click', function () { self._wipe(); }); this._wipeBtn = wipe; rack.appendChild(wipe);
    var playBtn = api.el('button', 'sf-tool sf-playbtn'); playBtn.type = 'button';
    playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; rack.appendChild(playBtn);
    var go = api.el('button', 'sf-go'); go.type = 'button'; go.addEventListener('click', function () { self._check(); }); this._go = go; rack.appendChild(go);
    tools.appendChild(rack);
    var strip = api.el('div', 'sf-strip'); strip.setAttribute('role', 'group'); this._strip = strip; tools.appendChild(strip);
    this._tools = tools;
    wrap.appendChild(tools);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var st = this._cur(), L = this._L = StampFrameCore.layout(this._width(), st.frames, StampFrameCore.maxAnswer(st), !st.explore && st.op === '-');
    var w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide');
    w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.style.setProperty('--sf-cell', L.cell + 'px');
    w.style.setProperty('--sf-gap', L.gap + 'px');
    w.style.setProperty('--sf-pad', L.pad + 'px');
    w.style.setProperty('--sf-side', L.side + 'px');
    w.style.setProperty('--sf-key', L.key + 'px');
    w.style.setProperty('--sf-keyh', L.keyH + 'px');
    w.style.setProperty('--sf-per', String(L.perRow));
    w.style.setProperty('--sf-num', L.num + 'px');
    w.style.setProperty('--sf-box', L.box + 'px');
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this, L = this._L;
    if (!st || !this._wrap) return;
    var sub = !st.explore && st.op === '-';
    var step2 = !st.explore && (st.step === 2 || st.done);
    var w = this._wrap;
    w.classList.toggle('is-play', !!st.explore);
    w.classList.toggle('is-sub', sub);
    w.classList.toggle('is-step2', step2 && !this._show1);
    w.classList.toggle('is-done', !!st.done);
    w.classList.toggle('is-two', st.frames === 2);

    this._paintEq(st);

    /* the cells */
    var cells = this._showCells || st.cells;
    var marks = (!st.explore && st.step === 1 && st.showHelp && st.last1 && !st.last1.ok && st.last1.slip !== 'empty') ? StampFrameCore.marks(st) : null;
    var chips = StampFrameCore.chips(st);
    for (var f = 0; f < 2; f++) this._frameEls[f].hidden = f >= st.frames;
    for (var i = 0; i < this._cellEls.length; i++) {
      var cell = this._cellEls[i];
      if (i >= cells.length) continue;
      var v = cells[i], p = StampFrameCore.place(i);
      cell.classList.toggle('is-c', v === 'c' || v === 'cx');
      cell.classList.toggle('is-t', v === 't');
      cell.classList.toggle('is-cx', v === 'cx');
      cell.setAttribute('data-mark', marks ? marks[i] : '');
      var ch = (this._show1 ? '' : chips[i]);
      var chip = cell.querySelector('.sf-chip');
      chip.textContent = ch === '' ? '' : String(ch);
      chip.classList.toggle('is-on', ch !== '');
      chip.classList.toggle('is-q', ch === '?');
      cell.classList.toggle('is-glow', !!(this._glow && i >= this._glow.from && i < this._glow.to));
      cell.classList.toggle('is-flash', i === this._flashCell);
      cell.style.setProperty('--sf-wave', (i * 150) + 'ms');
      cell.classList.toggle('is-wave', this._wave && v !== null);
      cell.disabled = !st.explore && (st.step !== 1 || st.done);
      var sKey = v === null ? 'sEmpty' : v === 'c' ? 'sCoral' : v === 't' ? 'sTeal' : 'sCrossed';
      cell.setAttribute('aria-label', interp(t('cellLabel'), { r: p.row + 1 + p.frame * 2, p: p.col + 1, s: t(sKey) }));
    }
    this._paintBrackets(st);

    /* the side: the away dish (take-away) and the note */
    this._dish.hidden = !sub; this._side.hidden = !sub;
    if (sub) {
      var pile = this._pile, have = pile.children.length;
      while (have < st.dish) { pile.appendChild(this.api.el('span', 'sf-peeled')); have++; }
      while (have > st.dish) { pile.removeChild(pile.lastChild); have--; }
      this._dish.setAttribute('aria-label', interp(t('dishLabel'), { k: st.dish }));
      this._dish.setAttribute('role', 'img');
      this._dish.classList.toggle('is-glow', !!(this._glow && this._glow.dish));
    }
    var h = this._flashKey ? { key: this._flashKey } : (st.explore ? { key: 'playNote' } : StampFrameCore.hint(st));
    var text = h ? interp(t(h.key), h) : '';
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !!(h && !st.explore && !this._flashKey && /^hint(Outside|Empty|Cross|Slots|Part|Away|CountAll|Numbers)/.test(h.key)));
    this._note.classList.toggle('is-ask', !!(h && /^ask/.test(h.key)));

    /* the rack */
    var rack = StampFrameCore.rack(st);
    ['c', 't', 'x'].forEach(function (s) {
      var b = self._stampEls[s];
      b.hidden = rack.indexOf(s) < 0;
      b.classList.toggle('is-up', st.stamp === s);
      b.setAttribute('aria-pressed', st.stamp === s ? 'true' : 'false');
      b.setAttribute('aria-label', t(s === 'c' ? 'stampC' : s === 't' ? 'stampT' : 'stampX'));
      b.title = t(s === 'c' ? 'stampC' : s === 't' ? 'stampT' : 'stampX');
    });
    this._wipeBtn.setAttribute('aria-label', t('clearAll')); this._wipeBtn.title = t('clearAll');
    this._wipeBtn.disabled = StampFrameCore.counts(st).ink === 0 || (!st.explore && st.step !== 1);
    this._playBtn.innerHTML = st.explore
      ? '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg><span></span>'
      : '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor"><circle cx="7" cy="12" r="3.2"/><circle cx="17" cy="12" r="3.2"/></svg><span></span>';
    this._playBtn.querySelector('span').textContent = t(st.explore ? 'playBack' : 'play');
    this._playBtn.hidden = !st.explore && st.step !== 1;
    this._go.textContent = t('check');
    this._go.hidden = !!st.explore || step2;
    this._go.disabled = this._busy;
    this._rack.hidden = step2 && !this._show1;

    /* the number strip */
    var max = StampFrameCore.maxAnswer(st);
    this._strip.hidden = !(step2 && !this._show1) || !!st.explore;
    this._strip.setAttribute('aria-label', t('stripLabel'));
    if (this._strip.children.length !== max) {
      this._strip.innerHTML = '';
      for (var k = 1; k <= max; k++) {
        (function (val) { var b = self.api.el('button', 'sf-key'); b.type = 'button'; b.textContent = String(val); b.addEventListener('click', function () { self._answer(val); }); self._strip.appendChild(b); }(k));
      }
    }
    for (var q = 0; q < this._strip.children.length; q++) {
      var kb = this._strip.children[q], val = q + 1;
      kb.disabled = !!st.done || this._busy;
      kb.classList.toggle('is-picked', st.answer === val && !st.done);
      kb.classList.toggle('is-right', st.done && st.answer === val);
    }
  },

  /* the equation strip: numerals or dots; the answer box stays a numeral box */
  _paintEq: function (st) {
    var t = this.api.t, dots = this._showAs() === 'dots', html = '';
    if (st.explore) {
      var e = StampFrameCore.liveEquation(st);
      if (!e.terms.length) html = '<span class="sf-box"></span>';
      else {
        for (var i = 0; i < e.terms.length; i++) {
          var tm = e.terms[i];
          if (i > 0) html += '<span class="sf-op">' + (tm.op === '-' ? '−' : '+') + '</span>';
          html += this._termHtml(tm.v, tm.kind === 'c' ? 'a' : tm.kind === 't' ? 'b' : 'x', false);
        }
        html += '<span class="sf-op">=</span><span class="sf-box is-full">' + e.total + '</span>';
      }
    } else {
      var sub = st.op === '-';
      html += this._termHtml(st.a, 'a', dots);
      html += '<span class="sf-op">' + (sub ? '−' : '+') + '</span>';
      html += this._termHtml(st.b, sub ? 'x' : 'b', dots);
      html += '<span class="sf-op">=</span>';
      var shown = st.done ? StampFrameCore.answerOf(st) : (st.step === 2 && st.answer !== null && st.last2 && !st.last2.ok ? st.answer : '');
      var cls = 'sf-box' + (st.done ? ' is-gold' : (shown !== '' ? ' is-wrong' : '')) + (st.step === 2 && !st.done && !this._show1 ? ' is-awake' : '');
      html += '<span class="' + cls + '" aria-label="' + escAttr(t('answerBox')) + '">' + shown + '</span>';
    }
    this._eq.innerHTML = html;
    this._box = this._eq.querySelector('.sf-box');
  },
  _termHtml: function (n, kind, dots) {
    var cls = 'sf-term sf-term-' + kind;
    var d = dots ? StampFrameCore.dots(n) : null;
    if (!d) return '<span class="' + cls + '"><span class="sf-num">' + n + '</span>' + (kind === 'x' ? '<svg class="sf-xmark" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4L16 16M16 4L4 16"/></svg>' : '') + '</span>';
    var out = '<span class="' + cls + ' is-dots">';
    for (var h = 0; h < d.length; h++) {
      out += '<svg class="sf-die" viewBox="0 0 30 30" aria-hidden="true"><rect x="1.5" y="1.5" width="27" height="27" rx="6"/>';
      for (var p = 0; p < d[h].length; p++) { var g = d[h][p]; out += '<circle cx="' + (7 + (g % 3) * 8) + '" cy="' + (7 + Math.floor(g / 3) * 8) + '" r="2.7"/>'; }
      out += '</svg>';
    }
    return out + (kind === 'x' ? '<svg class="sf-xmark" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4L16 16M16 4L4 16"/></svg>' : '') + '</span>';
  },

  /* the brackets: one outline per number, hugging its run of places in reading order */
  _paintBrackets: function (st) {
    var L = this._L, cell = L.cell, gap = L.gap, self = this;
    var gridW = 5 * cell + 4 * gap, gridH = 2 * cell + gap;
    var groups = [];
    if (!st.explore) {
      if (st.step === 2 || st.done) {
        if (this._show1) groups = st.op === '+' ? [{ key: 'a', from: 0, to: st.a }, { key: 'b', from: st.a, to: st.a + st.b }] : [{ key: 'a', from: 0, to: st.a }, { key: 'b', from: st.a - st.b, to: st.a }];
        else groups = StampFrameCore.brackets(st);
      } else if (st.showHelp && st.last1 && st.last1.slip !== 'empty') groups = StampFrameCore.brackets(st);
    }
    for (var f = 0; f < this._svgs.length; f++) {
      var svg = this._svgs[f], parts = '';
      svg.setAttribute('viewBox', (-14) + ' ' + (-14) + ' ' + (gridW + 28) + ' ' + (gridH + 28));
      svg.setAttribute('width', String(gridW + 28)); svg.setAttribute('height', String(gridH + 28));
      for (var g = 0; g < groups.length; g++) {
        var gr = groups[g], lo = Math.max(gr.from, f * 10), hi = Math.min(gr.to, f * 10 + 10);
        if (hi <= lo) continue;
        var inner = (st.op === '-' && gr.key === 'b');
        var o = inner ? -3 : gap / 2 + 2;
        var colour = st.done ? this.BR.gold : this.BR[gr.key];
        var hinted = !st.explore && st.step === 1 && st.showHelp && st.last1 && st.last1.g === gr.key ? ' is-hinted' : '';
        var d = runPath(lo - f * 10, hi - 1 - f * 10, cell, gap, o);
        parts += '<path class="sf-bpath sf-b-' + gr.key + (inner ? ' is-inner' : '') + hinted + '" d="' + d + '" stroke="' + colour + '"/>';
        if (gr.from >= f * 10 && gr.from < f * 10 + 10) {
          var s = gr.from - f * 10, x = (s % 5) * (cell + gap) - o, y = Math.floor(s / 5) * (cell + gap) - o;
          var label = gr.key === 'a' ? st.a : gr.key === 'b' ? st.b : (st.done ? StampFrameCore.answerOf(st) : '?');
          var wdt = String(label).length > 1 ? 30 : 24;
          parts += '<g class="sf-tag sf-tag-' + gr.key + hinted + '"><rect x="' + (x - wdt / 2) + '" y="' + (y - 12) + '" width="' + wdt + '" height="24" rx="12" fill="' + colour + '"/><text x="' + x + '" y="' + (y + 6) + '" text-anchor="middle">' + label + '</text></g>';
        }
      }
      svg.innerHTML = parts;
      svg.classList.toggle('is-drop', !!parts && this._dropFresh);
    }
    if (this._dropFresh) { this._dropFresh = false; }
  },

  /* ---------------- the hand ---------------- */
  _select: function (s) {
    var st = this._cur();
    if (!st || this._busy) return;
    if (!StampFrameCore.select(st, s)) return;
    this.api.sound(560);
    this._paint();
    bounce(this._stampEls[s], 'sf-lift');
    this.api.track('stamp', { stamp: s });
  },
  _press: function (i) {
    var st = this._cur(), self = this;
    if (!st || this._busy) return;
    this._flashKey = null; this._flashCell = -1; this._glow = null; this._wave = false;
    var out = StampFrameCore.stamp(st, i);
    if (out === 'fillFirst') {
      this._flashKey = 'hintFillFirst'; this._flashCell = StampFrameCore.firstEmpty(st);
      this.api.sound(300);
      this._paint();
      this._later(function () { self._flashCell = -1; self._paint(); }, 1200);
      return;
    }
    if (out === 'refused' || out === 'locked') { this.api.sound(240); bounce(this._cellEls[i], 'sf-nope'); return; }
    var tone = { ink: st.stamp === 'c' ? 330 : 415, recolour: st.stamp === 'c' ? 330 : 415, wipe: 220, cross: 700, uncross: 520 }[out] || 440;
    this.api.sound(tone);
    this._paint();
    var cell = this._cellEls[i];
    bounce(cell, out === 'wipe' ? 'sf-wiped' : (out === 'cross' || out === 'uncross') ? 'sf-crossing' : 'sf-inked');
    bounce(this._stampEls[st.stamp], 'sf-thump');
    this.api.track('press', { i: i, out: out, stamp: st.stamp });
  },
  _wipe: function () {
    var st = this._cur();
    if (!st || this._busy || !StampFrameCore.clear(st)) return;
    this._flashKey = null; this._glow = null;
    this.api.sound(220);
    this._paint();
    this.api.track('wipe', {});
  },
  _togglePlay: function () {
    if (this._busy) return;
    if (!this._play) this._play = StampFrameCore.newPlay();
    this._playing = !this._playing;
    this._flashKey = null; this._glow = null; this._wave = false;
    this.render();
    this.api.track('play', { on: this._playing });
  },

  /* step 1: the equation checks the printing */
  _check: function () {
    var st = this.st, self = this;
    if (!st || this._busy || this._playing || st.step !== 1 || st.done) return;
    this._flashKey = null; this._glow = null;
    var before = st.cells.slice();
    var res = StampFrameCore.checkStep1(st);
    if (!res) return;
    this.api.track('check1', { id: st.id, ok: res.ok, slip: res.slip, misses: st.misses1 });
    if (res.slip === 'empty') { this.api.sound(300); this._paint(); bounce(this._stampEls[st.stamp], 'sf-lift'); return; }
    var moved = before.join(',') !== (res.ok && st.op === '-' ? this._prePeel(st) : st.cells).join(',');
    if (!res.ok) {
      this._dropFresh = true;
      this.api.sound(280);
      this._paint();
      if (moved) bounce(this._framesEl, 'sf-tidy');
      var ms = this._wrap.querySelectorAll('.sf-cell[data-mark="extra"],.sf-cell[data-mark="wrong"]');
      for (var m = 0; m < ms.length; m++) bounce(ms[m], 'sf-wobble');
      return;
    }
    /* right: the two brackets drop and click shut, then they merge (addition) or the crosses peel off (take-away) */
    this._busy = true; this._show1 = true; this._dropFresh = true;
    if (st.op === '-') this._showCells = this._prePeel(st);
    this.api.sound(620);
    this._paint();
    if (moved) bounce(this._framesEl, 'sf-tidy');
    this._later(function () {
      if (st.op === '+') { self._finish1(); return; }
      self._peel();
    }, this.BRACKET_MS);
  },
  /* the tidied frame just before the peel: the ones left, then the crossed ones */
  _prePeel: function (st) {
    var out = st.cells.slice(), left = st.a - st.b;
    for (var i = left; i < st.a; i++) out[i] = 'cx';
    return out;
  },
  _peel: function () {
    var st = this.st, self = this, from = [], i;
    for (i = st.a - st.b; i < st.a; i++) from.push(i);
    var dishRect = this._dish.getBoundingClientRect();
    st.dish = 0;
    from.forEach(function (ci, k) {
      self._later(function () {
        var el = self._cellEls[ci], r = el.getBoundingClientRect();
        var ghost = document.createElement('span'); ghost.className = 'sf-ghost';
        var size = Math.round(r.width * 0.8);
        ghost.style.cssText = 'left:' + (r.left + r.width / 2 - size / 2) + 'px;top:' + (r.top + r.height / 2 - size / 2) + 'px;width:' + size + 'px;height:' + size + 'px;';
        document.body.appendChild(ghost);
        self._showCells[ci] = null; st.dish = k + 1;
        self._paint();
        self.api.sound(500 - k * 25);
        var dx = dishRect.left + dishRect.width / 2 - (r.left + r.width / 2), dy = dishRect.top + dishRect.height / 3 - (r.top + r.height / 2);
        requestAnimationFrame(function () { ghost.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(.42) rotate(-20deg)'; ghost.style.opacity = '0'; });
        setTimeout(function () { if (ghost.parentNode) ghost.parentNode.removeChild(ghost); }, 520);
      }, k * self.PEEL_STEP);
    });
    this._later(function () { self._finish1(); }, from.length * this.PEEL_STEP + 380);
  },
  _finish1: function () {
    var st = this.st;
    this._show1 = false; this._showCells = null; this._busy = false;
    st.dish = st.op === '-' ? st.b : 0;
    this._paint();
    if (this._box) bounce(this._box, 'sf-wake');
    this.api.announce(interp(this.api.t(st.op === '+' ? 'askAdd' : 'askSub'), { a: st.a, b: st.b }));
  },

  /* step 2: a numeral from the strip into the answer box */
  _answer: function (v) {
    var st = this.st, self = this;
    if (!st || this._busy || this._playing || st.step !== 2 || st.done) return;
    this._glow = null; this._wave = false;
    var res = StampFrameCore.checkAnswer(st, v);
    if (!res) return;
    this.api.track('answer', { id: st.id, v: v, ok: res.ok, slip: res.slip, misses: st.misses2 });
    if (res.ok) {
      this._busy = true;
      this._paint();
      if (this._box) bounce(this._box, 'sf-stick');
      bounce(this._framesEl, 'sf-bounce');
      this.api.sound(660); this._later(function () { self.api.sound(880); }, 140);
      this._speakNumber(v);
      this._later(function () { self._busy = false; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled && self.st.done) chk.click(); }, this.CHECK_MS);
      return;
    }
    if (res.slip === 'part' && StampFrameCore.help2(st) < 2) this._glow = v === st.a ? { from: 0, to: st.a } : { from: st.a, to: st.a + st.b };
    if (res.slip === 'away' && StampFrameCore.help2(st) < 2) this._glow = { dish: true };
    if (res.slip === 'count' && StampFrameCore.help2(st) < 2) this._wave = true;
    this.api.sound(280);
    this._paint();
    if (this._box) bounce(this._box, 'sf-wobble');
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 0.95 }); } catch (e) { /* silent */ }
  }
};

/* the outline of a run of places s..e (0..9, inclusive) on one 2 × 5 frame, pushed out by o */
function runPath(s, e, cell, gap, o) {
  var step = cell + gap;
  function X(c) { return c * step; }
  function Y(r) { return r * step; }
  function rect(r, c0, c1) { var x0 = X(c0) - o, x1 = X(c1) + cell + o, y0 = Y(r) - o, y1 = Y(r) + cell + o; return 'M' + x0 + ' ' + y0 + 'H' + x1 + 'V' + y1 + 'H' + x0 + 'Z'; }
  var r0 = Math.floor(s / 5), r1 = Math.floor(e / 5);
  if (r0 === r1) return rect(r0, s % 5, e % 5);
  var c0 = s % 5, c1 = e % 5;
  if (c1 < c0) return rect(0, c0, 4) + rect(1, 0, c1);
  var mid = cell + gap / 2;
  var L = -o, R = X(4) + cell + o, T = -o, B = Y(1) + cell + o, L0 = X(c0) - o, R1 = X(c1) + cell + o;
  return 'M' + L0 + ' ' + T + 'H' + R + 'V' + mid + 'H' + R1 + 'V' + B + 'H' + L + 'V' + mid + 'H' + L0 + 'Z';
}
function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function escAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var sfCssDone = false;
function injectStampFrameCSS() {
  if (sfCssDone || typeof document === 'undefined') return;
  sfCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.sf-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:stretch;gap:12px;--sf-cell:62px;--sf-gap:6px;--sf-pad:8px;--sf-side:200px;--sf-key:56px;--sf-keyh:52px;--sf-per:10;--sf-num:48px;--sf-box:56px;--sf-c:#F2784B;--sf-t:#2E9C88;--sf-ink:#2B3A36;--sf-wood:#E9DFCB;}'
  /* the equation strip */
  + '.sf-eq{display:flex;align-items:center;justify-content:center;gap:10px;min-height:calc(var(--sf-box) + 4px);font-family:var(--lcs-font-display);font-weight:800;font-size:var(--sf-num);line-height:1;color:var(--sf-ink);}'
  + '.sf-term{display:inline-flex;align-items:center;gap:4px;} .sf-term-a{color:#D9572A;} .sf-term-b{color:#1F7A69;} .sf-term-x{color:var(--sf-ink);}'
  + '.sf-xmark{width:calc(var(--sf-num) * .42);height:calc(var(--sf-num) * .42);stroke:var(--sf-ink);stroke-width:3.4;stroke-linecap:round;fill:none;}'
  + '.sf-term.is-dots{gap:3px;} .sf-die{width:calc(var(--sf-num) * 1.05);height:calc(var(--sf-num) * 1.05);} .sf-die rect{fill:#fff;stroke-width:2.4;} .sf-term-a .sf-die rect{stroke:#D9572A;} .sf-term-a .sf-die circle{fill:#D9572A;} .sf-term-b .sf-die rect{stroke:#1F7A69;} .sf-term-b .sf-die circle{fill:#1F7A69;} .sf-term-x .sf-die rect{stroke:var(--sf-ink);} .sf-term-x .sf-die circle{fill:var(--sf-ink);}'
  + '.sf-op{color:#5C6B67;}'
  + '.sf-box{display:inline-grid;place-items:center;min-width:var(--sf-box);height:var(--sf-box);box-sizing:border-box;padding:0 6px;border:3px dashed #9AA8A3;border-radius:12px;background:#fff;color:var(--sf-ink);font-size:calc(var(--sf-num) * .78);transition:border-color .25s,background .25s;}'
  + '.sf-box.is-awake{border-color:var(--lcs-structure);box-shadow:0 0 0 4px rgba(20,107,94,.15);} .sf-box.is-full{border-style:solid;}'
  + '.sf-box.is-wrong{border-color:#C9542A;color:#9C3F1C;border-style:solid;} .sf-box.is-gold{border-style:solid;border-color:#C9A24A;background:#F6D98A;color:#5B4312;}'
  /* the body: frames + side column */
  + '.sf-body{display:flex;flex-direction:column;align-items:center;gap:10px;}'
  + '.sf-wrap.is-wide .sf-body{flex-direction:row;justify-content:center;align-items:center;gap:16px;}'
  + '.sf-wrap.is-wide .sf-chip{min-width:30px;height:30px;line-height:30px;font-size:18px;border-radius:15px;}'
  + '.sf-frames{display:flex;flex-direction:column;align-items:center;gap:14px;}'
  + '.sf-frame{position:relative;padding:var(--sf-pad);border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 3px var(--lcs-structure),0 4px 10px rgba(20,60,50,.10);} .sf-frame[hidden]{display:none;}'
  + '.sf-grid{display:grid;grid-template-columns:repeat(5,var(--sf-cell));grid-template-rows:repeat(2,var(--sf-cell));gap:var(--sf-gap);}'
  + '.sf-cell{position:relative;width:var(--sf-cell);height:var(--sf-cell);padding:0;border:0;border-radius:10px;background:#fff;box-shadow:inset 0 0 0 2px #CFE3DD;cursor:pointer;touch-action:manipulation;display:grid;place-items:center;}'
  + '.sf-cell:disabled{cursor:default;} .sf-cell:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.sf-ink{width:80%;height:80%;border-radius:50%;background:transparent;transform:scale(0);transition:transform .14s var(--lcs-ease),opacity .2s;box-sizing:border-box;}'
  + '.sf-cell.is-c .sf-ink{background:radial-gradient(circle at 35% 30%,#F79A73,var(--sf-c) 60%,#D9572A);transform:scale(1);}'
  + '.sf-cell.is-t .sf-ink{background:radial-gradient(circle at 35% 30%,#5BBBA8,var(--sf-t) 60%,#1F7A69);transform:scale(1);}'
  + '.sf-cell.is-cx .sf-ink{opacity:.45;}'
  + '.sf-x{position:absolute;inset:12%;width:76%;height:76%;fill:none;stroke:var(--sf-ink);stroke-width:5;stroke-linecap:round;opacity:0;pointer-events:none;}'
  + '.sf-cell.is-cx .sf-x{opacity:1;} .sf-cell.is-cx .sf-x path{stroke-dasharray:32;stroke-dashoffset:0;}'
  + '.sf-cell.sf-crossing.is-cx .sf-x path{animation:sf-draw .16s linear both;} .sf-cell.sf-crossing.is-cx .sf-x path+path{animation-delay:.08s;} @keyframes sf-draw{from{stroke-dashoffset:32;}to{stroke-dashoffset:0;}}'
  + '.sf-cell.sf-inked .sf-ink{animation:sf-bloom .2s var(--lcs-ease) both;} @keyframes sf-bloom{0%{transform:scale(.25);}70%{transform:scale(1.08);}100%{transform:scale(1);}}'
  + '.sf-cell.sf-wiped .sf-ink{transition:transform .12s;}'
  /* marks after a Check: an empty place pulses, ink in the wrong place wobbles */
  + '.sf-cell[data-mark="empty"]{box-shadow:inset 0 0 0 3px var(--lcs-structure);background:repeating-linear-gradient(45deg,#fff 0 6px,#EAF4F1 6px 12px);animation:sf-pulse 1.2s ease-in-out infinite;}'
  + '.sf-cell[data-mark="extra"],.sf-cell[data-mark="wrong"]{box-shadow:inset 0 0 0 3px #9C3F1C;}'
  + '@keyframes sf-pulse{0%,100%{box-shadow:inset 0 0 0 3px var(--lcs-structure);}50%{box-shadow:inset 0 0 0 5px var(--lcs-structure);}}'
  + '.sf-cell.is-glow{box-shadow:inset 0 0 0 4px #F2C14E;background:#FFF6DA;}'
  + '.sf-cell.is-flash{box-shadow:inset 0 0 0 4px var(--lcs-structure);animation:sf-pulse .6s ease-in-out 2;}'
  + '.sf-cell.is-wave .sf-ink{animation:sf-wave .5s var(--lcs-ease) var(--sf-wave,0ms) both;} @keyframes sf-wave{0%,100%{transform:scale(1);}45%{transform:scale(1.14) translateY(-4px);}}'
  + '.sf-chip{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0);min-width:26px;height:26px;padding:0 4px;box-sizing:border-box;border-radius:13px;background:rgba(255,255,255,.94);color:var(--sf-ink);font-family:var(--lcs-font-display);font-weight:800;font-size:16px;line-height:26px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .2s var(--lcs-ease);pointer-events:none;}'
  + '.sf-chip:not(.is-on){display:none;} .sf-chip.is-on{transform:translate(-50%,-50%) scale(1);} .sf-chip.is-q{background:var(--lcs-structure);color:#fff;}'
  + '.sf-wrap.is-done .sf-chip.is-on{background:#F6D98A;color:#5B4312;}'
  /* the brackets */
  + '.sf-br{position:absolute;left:calc(var(--sf-pad) - 14px);top:calc(var(--sf-pad) - 14px);overflow:visible;pointer-events:none;}'
  + '.sf-bpath{fill:none;stroke-width:4;stroke-linejoin:round;} .sf-bpath.is-inner{stroke-width:3;stroke-dasharray:7 5;}'
  + '.sf-bpath.is-hinted{stroke-width:6;} .sf-tag.is-hinted rect{stroke:#F2C14E;stroke-width:4;} .sf-tag.is-hinted{animation:sf-tagpulse 1.1s ease-in-out infinite;} @keyframes sf-tagpulse{0%,100%{opacity:1;}50%{opacity:.55;}}'
  + '.sf-tag text{fill:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:16px;}'
  + '.sf-br.is-drop .sf-bpath,.sf-br.is-drop .sf-tag{animation:sf-drop .32s var(--lcs-ease) both;} .sf-br.is-drop .sf-b-b,.sf-br.is-drop .sf-tag-b{animation-delay:.18s;} @keyframes sf-drop{0%{opacity:0;transform:translateY(-14px);}100%{opacity:1;transform:none;}}'
  /* the side: dish + note */
  + '.sf-side{display:flex;flex-direction:column;align-items:center;gap:10px;} .sf-side[hidden]{display:none;}'
  + '.sf-wrap.is-wide .sf-side{width:var(--sf-side);align-self:center;}'
  + '.sf-dish{position:relative;width:120px;height:58px;} .sf-dish[hidden]{display:none;} .sf-dish-bowl{position:absolute;left:0;bottom:0;width:120px;height:40px;}'
  + '.sf-dish.is-glow .sf-dish-bowl{filter:drop-shadow(0 0 6px #F2C14E);}'
  + '.sf-dish-pile{position:absolute;left:14px;right:14px;bottom:14px;display:flex;flex-wrap:wrap-reverse;justify-content:center;gap:2px;}'
  + '.sf-peeled{width:16px;height:16px;border-radius:50%;background:var(--sf-c);opacity:.7;box-shadow:inset 0 0 0 2px rgba(0,0,0,.12);}'
  + '.sf-ghost{position:fixed;z-index:50;border-radius:50%;background:var(--sf-c);opacity:.5;pointer-events:none;transition:transform .45s var(--lcs-ease),opacity .45s ease;}'
  + '.sf-note{box-sizing:border-box;align-self:center;width:100%;max-width:520px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--sf-ink);text-align:center;} .sf-note[hidden]{display:none;}'
  + '.sf-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .sf-note.is-ask{border-color:var(--lcs-structure);background:#EEF7F4;font-size:19px;}'
  /* the rack */
  + '.sf-tools{display:flex;flex-direction:column;align-items:center;}'
  + '.sf-rack{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:10px;} .sf-rack[hidden]{display:none;}'
  + '.sf-stamp{position:relative;width:72px;height:84px;padding:0;border:0;background:none;cursor:pointer;touch-action:manipulation;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;transition:transform .1s var(--lcs-ease);} .sf-stamp[hidden]{display:none;}'
  + '.sf-handle{width:34px;height:30px;border-radius:17px 17px 8px 8px;background:linear-gradient(180deg,#B98552,#8A5A2B);box-shadow:inset 0 -3px 0 rgba(0,0,0,.18);}'
  + '.sf-block{width:66px;height:36px;margin-top:-2px;border-radius:9px;background:linear-gradient(180deg,#E7C89D,#C9A06B);box-shadow:0 3px 6px rgba(60,35,10,.22);display:grid;place-items:center;}'
  + '.sf-face{width:26px;height:26px;border-radius:50%;} .sf-stamp-c .sf-face{background:var(--sf-c);} .sf-stamp-t .sf-face{background:var(--sf-t);}'
  + '.sf-stamp-x .sf-face{border-radius:0;background:linear-gradient(45deg,transparent 42%,var(--sf-ink) 42% 58%,transparent 58%),linear-gradient(-45deg,transparent 42%,var(--sf-ink) 42% 58%,transparent 58%);}'
  + '.sf-stamp.is-up{transform:translateY(-12px);} .sf-stamp.is-up .sf-block{box-shadow:0 14px 12px rgba(60,35,10,.22),0 0 0 3px var(--lcs-structure);}'
  + '.sf-stamp:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:3px;border-radius:12px;}'
  + '.sf-stamp.sf-thump{animation:sf-thump .2s var(--lcs-ease) 1;} @keyframes sf-thump{0%,100%{transform:translateY(-12px);}45%{transform:translateY(-2px) scaleY(.88);}}'
  + '.sf-stamp.sf-lift{animation:sf-liftk .45s var(--lcs-ease) 1;} @keyframes sf-liftk{0%,100%{transform:translateY(-12px);}50%{transform:translateY(-20px);}}'
  + '.sf-tool{min-width:48px;height:48px;padding:0 12px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:var(--lcs-font-body);font-weight:800;font-size:15px;cursor:pointer;touch-action:manipulation;} .sf-tool[hidden]{display:none;} .sf-tool:disabled{opacity:.4;cursor:default;}'
  + '.sf-tool:focus-visible,.sf-go:focus-visible,.sf-key:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.sf-go{min-width:120px;height:52px;padding:0 22px;border-radius:14px;border:0;background:var(--lcs-accent);color:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:20px;cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 #C95A31;} .sf-go[hidden]{display:none;} .sf-go:disabled{opacity:.5;cursor:default;}'
  /* the number strip: a key\'s place is its value */
  + '.sf-strip{display:grid;grid-template-columns:repeat(var(--sf-per),var(--sf-key));gap:6px;justify-content:center;} .sf-strip[hidden]{display:none;}'
  + '.sf-key{height:var(--sf-keyh);padding:0;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:22px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;}'
  + '.sf-key:hover:not(:disabled){background:#EEF7F4;} .sf-key:disabled{cursor:default;} .sf-key.is-picked{border-color:#C9542A;color:#9C3F1C;} .sf-key.is-right{background:#F6D98A;border-color:#C9A24A;color:#5B4312;}'
  /* motion */
  + '.sf-tidy{animation:sf-tidy .3s ease 1;} @keyframes sf-tidy{0%{filter:none;}40%{filter:brightness(1.06);}100%{filter:none;}}'
  + '.sf-wobble{animation:sf-wobble .45s var(--lcs-ease) 1;} @keyframes sf-wobble{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.sf-nope{animation:sf-wobble .3s var(--lcs-ease) 1;}'
  + '.sf-wake{animation:sf-wakek .5s var(--lcs-ease) 1;} @keyframes sf-wakek{0%,100%{transform:none;}40%{transform:scale(1.12);}}'
  + '.sf-stick{animation:sf-stickk .5s var(--lcs-ease) 1;} @keyframes sf-stickk{0%{transform:scale(1);}40%{transform:scale(1.18) rotate(-3deg);}100%{transform:none;}}'
  + '.sf-bounce{animation:sf-bouncek .5s var(--lcs-ease) 1;} @keyframes sf-bouncek{0%,100%{transform:none;}35%{transform:translateY(-6px);}70%{transform:translateY(2px);}}'
  /* narrow: the stamps a little smaller, the note full width */
  + '.sf-wrap.is-narrow .sf-stamp{width:60px;height:74px;} .sf-wrap.is-narrow .sf-block{width:56px;height:32px;} .sf-wrap.is-narrow .sf-handle{width:30px;height:26px;}'
  + '.sf-wrap.is-narrow.is-two .sf-strip{row-gap:3px;} .sf-wrap.is-narrow.is-two{gap:9px;}'
  + '.sf-wrap.is-narrow .sf-note{font-size:16px;padding:8px 12px;} .sf-wrap.is-narrow .sf-dish{width:100px;height:48px;} .sf-wrap.is-narrow .sf-dish-bowl{width:100px;height:34px;}'
  + '.sf-wrap.is-narrow .sf-tool{padding:0 10px;font-size:14px;} .sf-wrap.is-narrow .sf-go{min-width:100px;height:48px;font-size:18px;}'
  + '@media (prefers-reduced-motion:reduce){.sf-ink,.sf-chip,.sf-stamp,.sf-box,.sf-bpath,.sf-tag,.sf-cell,.sf-ghost{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'sf-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = StampFrameActivity;
if (typeof window !== 'undefined') window.StampFrameActivity = StampFrameActivity;
