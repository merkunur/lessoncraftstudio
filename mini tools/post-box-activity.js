/* =====================================================================
   post-box-activity.js — ACTIVITY #40 of the one-by-one rebuild:
   "Count the Sides" → THE NUMBER POST BOX (K.G.B.4).
   Design sheet: docs/activities-rebuild/designs/040-choice-board.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: a shape-sorter post box whose doors are numbers (or shape
   names). Offer a shape to a door and its sticks lie down, one on each
   side: the shape is posted only when they fit. Too many sticks leaves one
   tumbling; too few leaves a bare side glowing; an open figure falls apart;
   a straight stick slides off a curved side; on the square and rectangle
   doors the stick lengths and the square-corner marks must fit as well.
   Four modes: count the sides · sort by sides · real or not · name the doors.

   ACTIVITY LAYER ONLY: the model is post-box-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.PostBoxActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var PostBoxActivity = {
  id: 'post-box',
  apparatusClasses: ['pb-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:        {en:'The Number Post Box',de:'Der Zahlen-Briefkasten',fr:'La boîte aux lettres à nombres',es:'El buzón de los números',pt:'A caixa de correio dos números',it:'La cassetta delle lettere dei numeri',nl:'De getallenbrievenbus',sv:'Sifferbrevlådan',da:'Talpostkassen',no:'Tallpostkassen',fi:'Numeropostilaatikko'},
    instruction:  {en:'Count the sides of the shape, then post it through the door with that number.',de:'Zähl die Seiten der Form und steck sie dann durch die Tür mit dieser Zahl.',fr:'Compte les côtés de la forme, puis glisse-la par la porte qui porte ce nombre.',es:'Cuenta los lados de la figura y luego échala por la puerta con ese número.',pt:'Conte os lados da forma e depois coloque-a pela porta com esse número.',it:'Conta i lati della forma, poi imbucala nella porta con quel numero.',nl:'Tel de zijden van de vorm en stop hem dan door de deur met dat getal.',sv:'Räkna sidorna på formen och posta den sedan genom dörren med det talet.',da:'Tæl siderne på formen, og put den så ind ad døren med det tal.',no:'Tell sidene på formen, og post den så gjennom døra med det tallet.',fi:'Laske muodon sivut ja postita se sitten luukusta, jossa on sama luku.'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',es:'Revisar',pt:'Conferir',it:'Controlla',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    pCount:       {en:'How many sides? Post the shape through its door.',de:'Wie viele Seiten? Steck die Form durch ihre Tür.',fr:'Combien de côtés ? Glisse la forme par sa porte.',es:'¿Cuántos lados? Echa la figura por su puerta.',pt:'Quantos lados? Coloque a forma pela porta dela.',it:'Quanti lati? Imbuca la forma nella sua porta.',nl:'Hoeveel zijden? Stop de vorm door zijn deur.',sv:'Hur många sidor? Posta formen genom dess dörr.',da:'Hvor mange sider? Put formen ind ad dens dør.',no:'Hvor mange sider? Post formen gjennom døra dens.',fi:'Montako sivua? Postita muoto sen luukusta.'},
    pSort:        {en:'Post each shape through the door with its number of sides.',de:'Steck jede Form durch die Tür mit ihrer Anzahl Seiten.',fr:'Glisse chaque forme par la porte de son nombre de côtés.',es:'Echa cada figura por la puerta con su número de lados.',pt:'Coloque cada forma pela porta com o número de lados dela.',it:'Imbuca ogni forma nella porta con il suo numero di lati.',nl:'Stop elke vorm door de deur met zijn aantal zijden.',sv:'Posta varje form genom dörren med dess antal sidor.',da:'Put hver form ind ad døren med dens antal sider.',no:'Post hver form gjennom døra med antallet sider den har.',fi:'Postita jokainen muoto luukusta, jossa on sen sivujen määrä.'},
    pReal_tri:    {en:'Post every real triangle.',de:'Steck jedes echte Dreieck durch die Tür.',fr:'Glisse par la porte chaque vrai triangle.',es:'Echa por la puerta cada triángulo de verdad.',pt:'Coloque pela porta cada triângulo de verdade.',it:'Imbuca ogni vero triangolo.',nl:'Stop elke echte driehoek door de deur.',sv:'Posta varje riktig triangel.',da:'Put hver rigtig trekant ind ad døren.',no:'Post hver ekte trekant.',fi:'Postita jokainen oikea kolmio.'},
    pReal_sq:     {en:'Post every real square.',de:'Steck jedes echte Quadrat durch die Tür.',fr:'Glisse par la porte chaque vrai carré.',es:'Echa por la puerta cada cuadrado de verdad.',pt:'Coloque pela porta cada quadrado de verdade.',it:'Imbuca ogni vero quadrato.',nl:'Stop elk echt vierkant door de deur.',sv:'Posta varje riktig kvadrat.',da:'Put hvert rigtigt kvadrat ind ad døren.',no:'Post hvert ekte kvadrat.',fi:'Postita jokainen oikea neliö.'},
    pReal_rect:   {en:'Post every real rectangle.',de:'Steck jedes echte Rechteck durch die Tür.',fr:'Glisse par la porte chaque vrai rectangle.',es:'Echa por la puerta cada rectángulo de verdad.',pt:'Coloque pela porta cada retângulo de verdade.',it:'Imbuca ogni vero rettangolo.',nl:'Stop elke echte rechthoek door de deur.',sv:'Posta varje riktig rektangel.',da:'Put hvert rigtigt rektangel ind ad døren.',no:'Post hvert ekte rektangel.',fi:'Postita jokainen oikea suorakulmio.'},
    pRiddle_tri:  {en:'Post every closed shape with 3 straight sides and 3 corners.',de:'Steck jede geschlossene Form mit 3 geraden Seiten und 3 Ecken durch die Tür.',fr:'Glisse par la porte chaque forme fermée qui a 3 côtés droits et 3 sommets.',es:'Echa por la puerta cada figura cerrada con 3 lados rectos y 3 esquinas.',pt:'Coloque pela porta cada forma fechada com 3 lados retos e 3 cantos.',it:'Imbuca ogni forma chiusa con 3 lati dritti e 3 angoli.',nl:'Stop elke gesloten vorm met 3 rechte zijden en 3 hoeken door de deur.',sv:'Posta varje sluten form med 3 raka sidor och 3 hörn.',da:'Put hver lukket form med 3 lige sider og 3 hjørner ind ad døren.',no:'Post hver lukket form med 3 rette sider og 3 hjørner.',fi:'Postita jokainen suljettu muoto, jossa on 3 suoraa sivua ja 3 kulmaa.'},
    pRiddle_sq:   {en:'Post every shape with 4 sides all the same length and 4 square corners.',de:'Steck jede Form mit 4 gleich langen Seiten und 4 rechten Ecken durch die Tür.',fr:'Glisse par la porte chaque forme qui a 4 côtés de même longueur et 4 angles droits.',es:'Echa por la puerta cada figura con 4 lados del mismo largo y 4 esquinas rectas.',pt:'Coloque pela porta cada forma com 4 lados do mesmo tamanho e 4 cantos retos.',it:'Imbuca ogni forma con 4 lati della stessa lunghezza e 4 angoli retti.',nl:'Stop elke vorm met 4 even lange zijden en 4 rechte hoeken door de deur.',sv:'Posta varje form med 4 lika långa sidor och 4 räta hörn.',da:'Put hver form med 4 lige lange sider og 4 rette vinkler ind ad døren.',no:'Post hver form med 4 like lange sider og 4 rette vinkler.',fi:'Postita jokainen muoto, jossa on 4 yhtä pitkää sivua ja 4 suoraa kulmaa.'},
    pRiddle_rect: {en:'Post every shape with 4 straight sides and 4 square corners.',de:'Steck jede Form mit 4 geraden Seiten und 4 rechten Ecken durch die Tür.',fr:'Glisse par la porte chaque forme qui a 4 côtés droits et 4 angles droits.',es:'Echa por la puerta cada figura con 4 lados rectos y 4 esquinas rectas.',pt:'Coloque pela porta cada forma com 4 lados retos e 4 cantos retos.',it:'Imbuca ogni forma con 4 lati dritti e 4 angoli retti.',nl:'Stop elke vorm met 4 rechte zijden en 4 rechte hoeken door de deur.',sv:'Posta varje form med 4 raka sidor och 4 räta hörn.',da:'Put hver form med 4 lige sider og 4 rette vinkler ind ad døren.',no:'Post hver form med 4 rette sider og 4 rette vinkler.',fi:'Postita jokainen muoto, jossa on 4 suoraa sivua ja 4 suoraa kulmaa.'},
    pName:        {en:'Read each door. Post every shape through the door with its name.',de:'Lies jede Tür. Steck jede Form durch die Tür mit ihrem Namen.',fr:'Lis chaque porte. Glisse chaque forme par la porte qui porte son nom.',es:'Lee cada puerta. Echa cada figura por la puerta con su nombre.',pt:'Leia cada porta. Coloque cada forma pela porta com o nome dela.',it:'Leggi ogni porta. Imbuca ogni forma nella porta con il suo nome.',nl:'Lees elke deur. Stop elke vorm door de deur met zijn naam.',sv:'Läs varje dörr. Posta varje form genom dörren med dess namn.',da:'Læs hver dør. Put hver form ind ad døren med dens navn.',no:'Les hver dør. Post hver form gjennom døra med navnet dens.',fi:'Lue jokainen luukku. Postita jokainen muoto luukusta, jossa on sen nimi.'},
    hintStart:    {en:'Pick up the shape and try a door.',de:'Nimm die Form und probier eine Tür.',fr:'Prends la forme et essaie une porte.',es:'Toma la figura y prueba una puerta.',pt:'Pegue a forma e experimente uma porta.',it:'Prendi la forma e prova una porta.',nl:'Pak de vorm en probeer een deur.',sv:'Ta formen och prova en dörr.',da:'Tag formen, og prøv en dør.',no:'Ta formen og prøv en dør.',fi:'Ota muoto ja kokeile jotakin luukkua.'},
    hintStartTray:{en:'Pick up a shape and try a door.',de:'Nimm eine Form und probier eine Tür.',fr:'Prends une forme et essaie une porte.',es:'Toma una figura y prueba una puerta.',pt:'Pegue uma forma e experimente uma porta.',it:'Prendi una forma e prova una porta.',nl:'Pak een vorm en probeer een deur.',sv:'Ta en form och prova en dörr.',da:'Tag en form, og prøv en dør.',no:'Ta en form og prøv en dør.',fi:'Ota jokin muoto ja kokeile jotakin luukkua.'},
    hintCount1:   {en:'Count each side once. The pegs can help.',de:'Zähl jede Seite einmal. Die Fähnchen helfen dir.',fr:'Compte chaque côté une seule fois. Les fanions peuvent t’aider.',es:'Cuenta cada lado una sola vez. Las banderitas te pueden ayudar.',pt:'Conte cada lado uma vez só. As bandeirinhas podem ajudar.',it:'Conta ogni lato una volta sola. Le bandierine ti possono aiutare.',nl:'Tel elke zijde één keer. De vlaggetjes kunnen helpen.',sv:'Räkna varje sida en gång. Flaggorna kan hjälpa dig.',da:'Tæl hver side én gang. Flagene kan hjælpe dig.',no:'Tell hver side én gang. Flaggene kan hjelpe deg.',fi:'Laske jokainen sivu kerran. Liput voivat auttaa.'},
    hintCount2:   {en:'The last peg tells how many sides.',de:'Das letzte Fähnchen zeigt, wie viele Seiten es sind.',fr:'Le dernier fanion dit combien il y a de côtés.',es:'La última banderita dice cuántos lados hay.',pt:'A última bandeirinha mostra quantos lados há.',it:'L’ultima bandierina dice quanti lati ci sono.',nl:'Het laatste vlaggetje zegt hoeveel zijden het zijn.',sv:'Den sista flaggan visar hur många sidor det är.',da:'Det sidste flag viser, hvor mange sider der er.',no:'Det siste flagget viser hvor mange sider det er.',fi:'Viimeinen lippu kertoo, montako sivua on.'},
    hintTray1:    {en:'Some shapes still fit through a door.',de:'Ein paar Formen passen noch durch eine Tür.',fr:'Certaines formes passent encore par une porte.',es:'Algunas figuras todavía caben por una puerta.',pt:'Algumas formas ainda passam por uma porta.',it:'Alcune forme passano ancora da una porta.',nl:'Sommige vormen passen nog door een deur.',sv:'Några former passar fortfarande genom en dörr.',da:'Nogle former kan stadig komme ind ad en dør.',no:'Noen former passer fortsatt gjennom en dør.',fi:'Muutama muoto mahtuu vielä luukusta.'},
    hintTray2:    {en:'Count the sides of the shapes that wobble.',de:'Zähl die Seiten der Formen, die wackeln.',fr:'Compte les côtés des formes qui bougent.',es:'Cuenta los lados de las figuras que se mueven.',pt:'Conte os lados das formas que balançam.',it:'Conta i lati delle forme che dondolano.',nl:'Tel de zijden van de vormen die wiebelen.',sv:'Räkna sidorna på formerna som vickar.',da:'Tæl siderne på de former, der vipper.',no:'Tell sidene på formene som vipper.',fi:'Laske heiluvien muotojen sivut.'},
    resTooMany:   {en:'{a} sticks for {b} sides: there are sticks left over.',de:'{a} Stäbe für {b} Seiten: Es bleiben Stäbe übrig.',fr:'{a} bâtons pour {b} côtés : il reste des bâtons.',es:'{a} palitos para {b} lados: sobran palitos.',pt:'{a} palitos para {b} lados: sobram palitos.',it:'{a} bastoncini per {b} lati: avanzano dei bastoncini.',nl:'{a} stokjes voor {b} zijden: er blijven stokjes over.',sv:'{a} pinnar för {b} sidor: det blir pinnar över.',da:'{a} pinde til {b} sider: der er pinde til overs.',no:'{a} pinner til {b} sider: det blir pinner til overs.',fi:'{a} tikkua {b} sivulle: tikkuja jää yli.'},
    resTooFew:    {en:'{a} sticks for {b} sides: a side has no stick.',de:'{a} Stäbe für {b} Seiten: Eine Seite hat keinen Stab.',fr:'{a} bâtons pour {b} côtés : un côté n’a pas de bâton.',es:'{a} palitos para {b} lados: un lado se queda sin palito.',pt:'{a} palitos para {b} lados: um lado fica sem palito.',it:'{a} bastoncini per {b} lati: un lato resta senza bastoncino.',nl:'{a} stokjes voor {b} zijden: een zijde heeft geen stokje.',sv:'{a} pinnar för {b} sidor: en sida får ingen pinne.',da:'{a} pinde til {b} sider: en side får ingen pind.',no:'{a} pinner til {b} sider: en side får ingen pinne.',fi:'{a} tikkua {b} sivulle: yksi sivu jää ilman tikkua.'},
    resOpen:      {en:'The sides fall apart: this shape is not closed.',de:'Die Seiten fallen auseinander: Diese Form ist nicht geschlossen.',fr:'Les côtés se défont : cette forme n’est pas fermée.',es:'Los lados se separan: esta figura no está cerrada.',pt:'Os lados se soltam: esta forma não é fechada.',it:'I lati si staccano: questa forma non è chiusa.',nl:'De zijden vallen uit elkaar: deze vorm is niet gesloten.',sv:'Sidorna faller isär: formen är inte sluten.',da:'Siderne falder fra hinanden: formen er ikke lukket.',no:'Sidene faller fra hverandre: formen er ikke lukket.',fi:'Sivut hajoavat: muoto ei ole suljettu.'},
    resCurve:     {en:'A straight stick slides off the curved side.',de:'Ein gerader Stab rutscht von der gebogenen Seite ab.',fr:'Un bâton droit glisse sur le côté courbe.',es:'Un palito recto se resbala del lado curvo.',pt:'Um palito reto escorrega do lado curvo.',it:'Un bastoncino dritto scivola via dal lato curvo.',nl:'Een recht stokje glijdt van de gebogen zijde af.',sv:'En rak pinne glider av den böjda sidan.',da:'En lige pind glider af den buede side.',no:'En rett pinne glir av den buede siden.',fi:'Suora tikku liukuu pois kaarevalta sivulta.'},
    resLengths:   {en:'The sticks do not match the lengths of the sides.',de:'Die Stäbe passen nicht zu den Längen der Seiten.',fr:'Les bâtons n’ont pas la longueur des côtés.',es:'Los palitos no tienen el largo de los lados.',pt:'Os palitos não têm o comprimento dos lados.',it:'I bastoncini non hanno la lunghezza dei lati.',nl:'De stokjes passen niet bij de lengtes van de zijden.',sv:'Pinnarna passar inte sidornas längder.',da:'Pindene passer ikke til sidernes længder.',no:'Pinnene passer ikke til lengdene på sidene.',fi:'Tikut eivät sovi sivujen pituuksiin.'},
    resCorners:   {en:'The square-corner marks do not fit these corners.',de:'Die Zeichen für rechte Ecken passen nicht in diese Ecken.',fr:'Les marques d’angle droit ne vont pas dans ces angles.',es:'Las marcas de esquina recta no caben en estas esquinas.',pt:'As marcas de canto reto não cabem nestes cantos.',it:'I segni di angolo retto non stanno in questi angoli.',nl:'De tekens voor rechte hoeken passen niet in deze hoeken.',sv:'Märkena för räta hörn passar inte i de här hörnen.',da:'Mærkerne for rette vinkler passer ikke i disse hjørner.',no:'Merkene for rette vinkler passer ikke i disse hjørnene.',fi:'Suoran kulman merkit eivät sovi näihin kulmiin.'},
    ok_tri:       {en:'Yes! 3 sides — it’s a triangle.',de:'Ja! 3 Seiten – es ist ein Dreieck.',fr:'Oui ! 3 côtés : c’est un triangle.',es:'¡Sí! 3 lados: es un triángulo.',pt:'Isso! 3 lados: é um triângulo.',it:'Sì! 3 lati: è un triangolo.',nl:'Ja! 3 zijden: het is een driehoek.',sv:'Ja – 3 sidor: det är en triangel!',da:'Ja – 3 sider: det er en trekant!',no:'Ja – 3 sider: det er en trekant!',fi:'Oikein! 3 sivua: se on kolmio.'},
    ok_sq:        {en:'Yes! 4 sides — it’s a square.',de:'Ja! 4 Seiten – es ist ein Quadrat.',fr:'Oui ! 4 côtés : c’est un carré.',es:'¡Sí! 4 lados: es un cuadrado.',pt:'Isso! 4 lados: é um quadrado.',it:'Sì! 4 lati: è un quadrato.',nl:'Ja! 4 zijden: het is een vierkant.',sv:'Ja – 4 sidor: det är en kvadrat!',da:'Ja – 4 sider: det er et kvadrat!',no:'Ja – 4 sider: det er et kvadrat!',fi:'Oikein! 4 sivua: se on neliö.'},
    ok_rect:      {en:'Yes! 4 sides — it’s a rectangle.',de:'Ja! 4 Seiten – es ist ein Rechteck.',fr:'Oui ! 4 côtés : c’est un rectangle.',es:'¡Sí! 4 lados: es un rectángulo.',pt:'Isso! 4 lados: é um retângulo.',it:'Sì! 4 lati: è un rettangolo.',nl:'Ja! 4 zijden: het is een rechthoek.',sv:'Ja – 4 sidor: det är en rektangel!',da:'Ja – 4 sider: det er et rektangel!',no:'Ja – 4 sider: det er et rektangel!',fi:'Oikein! 4 sivua: se on suorakulmio.'},
    ok_trap:      {en:'Yes! 4 sides — it’s a trapezoid.',de:'Ja! 4 Seiten – es ist ein Trapez.',fr:'Oui ! 4 côtés : c’est un trapèze.',es:'¡Sí! 4 lados: es un trapecio.',pt:'Isso! 4 lados: é um trapézio.',it:'Sì! 4 lati: è un trapezio.',nl:'Ja! 4 zijden: het is een trapezium.',sv:'Ja – 4 sidor: det är en parallelltrapets!',da:'Ja – 4 sider: det er et trapez!',no:'Ja – 4 sider: det er et trapes!',fi:'Oikein! 4 sivua: se on puolisuunnikas.'},
    ok_rhom:      {en:'Yes! 4 sides — it’s a rhombus.',de:'Ja! 4 Seiten – es ist eine Raute.',fr:'Oui ! 4 côtés : c’est un losange.',es:'¡Sí! 4 lados: es un rombo.',pt:'Isso! 4 lados: é um losango.',it:'Sì! 4 lati: è un rombo.',nl:'Ja! 4 zijden: het is een ruit.',sv:'Ja – 4 sidor: det är en romb!',da:'Ja – 4 sider: det er en rombe!',no:'Ja – 4 sider: det er en rombe!',fi:'Oikein! 4 sivua: se on neljäkäs.'},
    ok_quad:      {en:'Yes! 4 sides.',de:'Ja! 4 Seiten.',fr:'Oui ! 4 côtés.',es:'¡Sí! 4 lados.',pt:'Isso! 4 lados.',it:'Sì! 4 lati.',nl:'Ja! 4 zijden.',sv:'Ja – 4 sidor!',da:'Ja – 4 sider!',no:'Ja – 4 sider!',fi:'Oikein! 4 sivua.'},
    ok_pent:      {en:'Yes! 5 sides — it’s a pentagon.',de:'Ja! 5 Seiten – es ist ein Fünfeck.',fr:'Oui ! 5 côtés : c’est un pentagone.',es:'¡Sí! 5 lados: es un pentágono.',pt:'Isso! 5 lados: é um pentágono.',it:'Sì! 5 lati: è un pentagono.',nl:'Ja! 5 zijden: het is een vijfhoek.',sv:'Ja – 5 sidor: det är en femhörning!',da:'Ja – 5 sider: det er en femkant!',no:'Ja – 5 sider: det er en femkant!',fi:'Oikein! 5 sivua: se on viisikulmio.'},
    ok_hex:       {en:'Yes! 6 sides — it’s a hexagon.',de:'Ja! 6 Seiten – es ist ein Sechseck.',fr:'Oui ! 6 côtés : c’est un hexagone.',es:'¡Sí! 6 lados: es un hexágono.',pt:'Isso! 6 lados: é um hexágono.',it:'Sì! 6 lati: è un esagono.',nl:'Ja! 6 zijden: het is een zeshoek.',sv:'Ja – 6 sidor: det är en sexhörning!',da:'Ja – 6 sider: det er en sekskant!',no:'Ja – 6 sider: det er en sekskant!',fi:'Oikein! 6 sivua: se on kuusikulmio.'},
    ok_hept:      {en:'Yes! 7 sides — it’s a heptagon.',de:'Ja! 7 Seiten – es ist ein Siebeneck.',fr:'Oui ! 7 côtés : c’est un heptagone.',es:'¡Sí! 7 lados: es un heptágono.',pt:'Isso! 7 lados: é um heptágono.',it:'Sì! 7 lati: è un ettagono.',nl:'Ja! 7 zijden: het is een zevenhoek.',sv:'Ja – 7 sidor: det är en sjuhörning!',da:'Ja – 7 sider: det er en syvkant!',no:'Ja – 7 sider: det er en sjukant!',fi:'Oikein! 7 sivua: se on seitsenkulmio.'},
    ok_oct:       {en:'Yes! 8 sides — it’s an octagon.',de:'Ja! 8 Seiten – es ist ein Achteck.',fr:'Oui ! 8 côtés : c’est un octogone.',es:'¡Sí! 8 lados: es un octágono.',pt:'Isso! 8 lados: é um octógono.',it:'Sì! 8 lati: è un ottagono.',nl:'Ja! 8 zijden: het is een achthoek.',sv:'Ja – 8 sidor: det är en åttahörning!',da:'Ja – 8 sider: det er en ottekant!',no:'Ja – 8 sider: det er en åttekant!',fi:'Oikein! 8 sivua: se on kahdeksankulmio.'},
    okSort:       {en:'Every shape found its door.',de:'Jede Form hat ihre Tür gefunden.',fr:'Chaque forme a trouvé sa porte.',es:'Cada figura encontró su puerta.',pt:'Cada forma achou a sua porta.',it:'Ogni forma ha trovato la sua porta.',nl:'Elke vorm heeft zijn deur gevonden.',sv:'Varje form hittade sin dörr.',da:'Hver form fandt sin dør.',no:'Hver form fant døra si.',fi:'Jokainen muoto löysi luukkunsa.'},
    okName:       {en:'Every shape went through the door with its name.',de:'Jede Form ist durch die Tür mit ihrem Namen gegangen.',fr:'Chaque forme est passée par la porte qui porte son nom.',es:'Cada figura pasó por la puerta con su nombre.',pt:'Cada forma passou pela porta com o nome dela.',it:'Ogni forma è passata dalla porta con il suo nome.',nl:'Elke vorm ging door de deur met zijn naam.',sv:'Varje form gick genom dörren med sitt namn.',da:'Hver form gik ind ad døren med sit navn.',no:'Hver form gikk gjennom døra med navnet sitt.',fi:'Jokainen muoto meni luukusta, jossa on sen nimi.'},
    okReal_tri:   {en:'All the real triangles: closed, 3 straight sides, 3 corners.',de:'Alle echten Dreiecke: geschlossen, 3 gerade Seiten, 3 Ecken.',fr:'Tous les vrais triangles : fermés, 3 côtés droits, 3 sommets.',es:'Todos los triángulos de verdad: cerrados, 3 lados rectos, 3 esquinas.',pt:'Todos os triângulos de verdade: fechados, 3 lados retos, 3 cantos.',it:'Tutti i veri triangoli: chiusi, 3 lati dritti, 3 angoli.',nl:'Alle echte driehoeken: gesloten, 3 rechte zijden, 3 hoeken.',sv:'Alla riktiga trianglar: slutna, 3 raka sidor, 3 hörn.',da:'Alle de rigtige trekanter: lukkede, 3 lige sider, 3 hjørner.',no:'Alle de ekte trekantene: lukket, 3 rette sider, 3 hjørner.',fi:'Kaikki oikeat kolmiot: suljettuja, 3 suoraa sivua, 3 kulmaa.'},
    okReal_sq:    {en:'All the real squares: closed, 4 equal sides, 4 square corners.',de:'Alle echten Quadrate: geschlossen, 4 gleich lange Seiten, 4 rechte Ecken.',fr:'Tous les vrais carrés : fermés, 4 côtés égaux, 4 angles droits.',es:'Todos los cuadrados de verdad: cerrados, 4 lados iguales, 4 esquinas rectas.',pt:'Todos os quadrados de verdade: fechados, 4 lados iguais, 4 cantos retos.',it:'Tutti i veri quadrati: chiusi, 4 lati uguali, 4 angoli retti.',nl:'Alle echte vierkanten: gesloten, 4 even lange zijden, 4 rechte hoeken.',sv:'Alla riktiga kvadrater: slutna, 4 lika långa sidor, 4 räta hörn.',da:'Alle de rigtige kvadrater: lukkede, 4 lige lange sider, 4 rette vinkler.',no:'Alle de ekte kvadratene: lukket, 4 like lange sider, 4 rette vinkler.',fi:'Kaikki oikeat neliöt: suljettuja, 4 yhtä pitkää sivua, 4 suoraa kulmaa.'},
    okReal_rect:  {en:'All the real rectangles: closed, 4 straight sides, 4 square corners.',de:'Alle echten Rechtecke: geschlossen, 4 gerade Seiten, 4 rechte Ecken.',fr:'Tous les vrais rectangles : fermés, 4 côtés droits, 4 angles droits.',es:'Todos los rectángulos de verdad: cerrados, 4 lados rectos, 4 esquinas rectas.',pt:'Todos os retângulos de verdade: fechados, 4 lados retos, 4 cantos retos.',it:'Tutti i veri rettangoli: chiusi, 4 lati dritti, 4 angoli retti.',nl:'Alle echte rechthoeken: gesloten, 4 rechte zijden, 4 rechte hoeken.',sv:'Alla riktiga rektanglar: slutna, 4 raka sidor, 4 räta hörn.',da:'Alle de rigtige rektangler: lukkede, 4 lige sider, 4 rette vinkler.',no:'Alle de ekte rektanglene: lukket, 4 rette sider, 4 rette vinkler.',fi:'Kaikki oikeat suorakulmiot: suljettuja, 4 suoraa sivua, 4 suoraa kulmaa.'},
    n_tri:        {en:'triangle',de:'Dreieck',fr:'triangle',es:'triángulo',pt:'triângulo',it:'triangolo',nl:'driehoek',sv:'triangel',da:'trekant',no:'trekant',fi:'kolmio'},
    n_sq:         {en:'square',de:'Quadrat',fr:'carré',es:'cuadrado',pt:'quadrado',it:'quadrato',nl:'vierkant',sv:'kvadrat',da:'kvadrat',no:'kvadrat',fi:'neliö'},
    n_rect:       {en:'rectangle',de:'Rechteck',fr:'rectangle',es:'rectán­gulo',pt:'retângulo',it:'rettan­golo',nl:'recht­hoek',sv:'rektangel',da:'rektangel',no:'rektangel',fi:'suora­kulmio'},
    n_rhom:       {en:'rhombus',de:'Raute',fr:'losange',es:'rombo',pt:'losango',it:'rombo',nl:'ruit',sv:'romb',da:'rombe',no:'rombe',fi:'neljäkäs'},
    n_trap:       {en:'trapezoid',de:'Trapez',fr:'trapèze',es:'trapecio',pt:'trapézio',it:'trapezio',nl:'trapezium',sv:'parallell­trapets',da:'trapez',no:'trapes',fi:'puoli­suunnikas'},
    n_quad:       {en:'4 sides',de:'4 Seiten',fr:'4 côtés',es:'4 lados',pt:'4 lados',it:'4 lati',nl:'4 zijden',sv:'4 sidor',da:'4 sider',no:'4 sider',fi:'4 sivua'},
    n_pent:       {en:'pentagon',de:'Fünf­eck',fr:'pentagone',es:'pentágono',pt:'pentágono',it:'pentagono',nl:'vijfhoek',sv:'fem­hörning',da:'femkant',no:'femkant',fi:'viisi­kulmio'},
    n_hex:        {en:'hexagon',de:'Sechs­eck',fr:'hexagone',es:'hexágono',pt:'hexágono',it:'esagono',nl:'zeshoek',sv:'sex­hörning',da:'sekskant',no:'sekskant',fi:'kuusi­kulmio'},
    n_hept:       {en:'heptagon',de:'Sieben­eck',fr:'heptagone',es:'heptágono',pt:'heptágono',it:'ettagono',nl:'zeven­hoek',sv:'sju­hörning',da:'syvkant',no:'sjukant',fi:'seitsen­kulmio'},
    n_oct:        {en:'octagon',de:'Acht­eck',fr:'octogone',es:'octágono',pt:'octógono',it:'ottagono',nl:'achthoek',sv:'åtta­hörning',da:'ottekant',no:'åttekant',fi:'kahdeksan­kulmio'},
    setMode:      {en:'Mode',de:'Spiel',fr:'Mode',es:'Modo',pt:'Modo',it:'Modalità',nl:'Spel',sv:'Läge',da:'Tilstand',no:'Modus',fi:'Tila'},
    mCount:       {en:'count the sides',de:'Seiten zählen',fr:'compter les côtés',es:'contar los lados',pt:'contar os lados',it:'contare i lati',nl:'zijden tellen',sv:'räkna sidorna',da:'tæl siderne',no:'tell sidene',fi:'laske sivut'},
    mSort:        {en:'sort by sides',de:'nach Seiten sortieren',fr:'trier par côtés',es:'clasificar por lados',pt:'separar por lados',it:'smistare per lati',nl:'sorteren op zijden',sv:'sortera efter sidor',da:'sortér efter sider',no:'sorter etter sider',fi:'lajittele sivujen mukaan'},
    mReal:        {en:'real or not',de:'echt oder nicht',fr:'vrai ou pas',es:'de verdad o no',pt:'de verdade ou não',it:'vero o no',nl:'echt of niet',sv:'riktig eller inte',da:'rigtig eller ej',no:'ekte eller ikke',fi:'oikea vai ei'},
    mName:        {en:'doors with names',de:'Türen mit Namen',fr:'les portes à noms',es:'puertas con nombre',pt:'portas com nome',it:'porte con il nome',nl:'deuren met namen',sv:'dörrar med namn',da:'døre med navne',no:'dører med navn',fi:'nimiluukut'},
    setShapes:    {en:'Shapes',de:'Formen',fr:'Formes',es:'Figuras',pt:'Formas',it:'Forme',nl:'Vormen',sv:'Former',da:'Former',no:'Former',fi:'Muodot'},
    sFirst:       {en:'first shapes',de:'erste Formen',fr:'premières formes',es:'primeras figuras',pt:'primeiras formas',it:'prime forme',nl:'eerste vormen',sv:'första formerna',da:'første former',no:'første former',fi:'ensimmäiset muodot'},
    sMore:        {en:'more shapes',de:'mehr Formen',fr:'plus de formes',es:'más figuras',pt:'mais formas',it:'altre forme',nl:'meer vormen',sv:'fler former',da:'flere former',no:'flere former',fi:'lisää muotoja'},
    ariaDoor:     {en:'door {n}: {n} sides',de:'Tür {n}: {n} Seiten',fr:'porte {n} : {n} côtés',es:'puerta {n}: {n} lados',pt:'porta {n}: {n} lados',it:'porta {n}: {n} lati',nl:'deur {n}: {n} zijden',sv:'dörr {n}: {n} sidor',da:'dør {n}: {n} sider',no:'dør {n}: {n} sider',fi:'luukku {n}: {n} sivua'},
    ariaNameDoor: {en:'door: {name}',de:'Tür: {name}',fr:'porte : {name}',es:'puerta: {name}',pt:'porta: {name}',it:'porta: {name}',nl:'deur: {name}',sv:'dörr: {name}',da:'dør: {name}',no:'dør: {name}',fi:'luukku: {name}'},
    ariaTile:     {en:'shape {i} of {total}',de:'Form {i} von {total}',fr:'forme {i} sur {total}',es:'figura {i} de {total}',pt:'forma {i} de {total}',it:'forma {i} di {total}',nl:'vorm {i} van {total}',sv:'form {i} av {total}',da:'form {i} af {total}',no:'form {i} av {total}',fi:'muoto {i}/{total}'},
    ariaSide:     {en:'side {i}',de:'Seite {i}',fr:'côté {i}',es:'lado {i}',pt:'lado {i}',it:'lato {i}',nl:'zijde {i}',sv:'sida {i}',da:'side {i}',no:'side {i}',fi:'sivu {i}'},
    ariaDrawer:   {en:'drawer',de:'Schublade',fr:'tiroir',es:'cajón',pt:'gaveta',it:'cassetto',nl:'la',sv:'låda',da:'skuffe',no:'skuff',fi:'vetolaatikko'}
    /*STRINGS-END*/
  },
  defaults: { mode: 'count', shapes: 'first' },
  settings: [
    { key: 'mode', type: 'choice', labelKey: 'setMode', options: [{ value: 'count', labelKey: 'mCount' }, { value: 'sort', labelKey: 'mSort' }, { value: 'real', labelKey: 'mReal' }, { value: 'name', labelKey: 'mName' }] },
    { key: 'shapes', type: 'choice', labelKey: 'setShapes', options: [{ value: 'first', labelKey: 'sFirst' }, { value: 'more', labelKey: 'sMore' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._sel = null; this._fx = null; this._focusSide = 0;
    injectPostBoxCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _mode: function () { return PostBoxCore.mode(this._set('mode')); },
  _level: function () { return PostBoxCore.level(this._set('shapes')); },
  _key: function () { return this._mode() + '/' + this._level(); },
  _ensurePool: function () { var k = this._key(); if (!this._pool || this._poolKey !== k) { this._pool = PostBoxCore.rounds(this._mode(), this._level()); this._poolKey = k; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = PostBoxCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]];
    var pk = r.mode === 'count' ? 'pCount' : r.mode === 'sort' ? 'pSort' : r.mode === 'name' ? 'pName' : (r.level === 'more' ? 'pRiddle_' : 'pReal_') + r.target;
    var ck = r.mode === 'count' ? 'ok_' + C.kindOf(C.shapeOf(r.tiles[0].key)) : r.mode === 'sort' ? 'okSort' : r.mode === 'name' ? 'okName' : 'okReal_' + r.target;
    return {
      id: 'post-box.' + r.id, promptKey: pk, promptArgs: {}, celebrateKey: ck, answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._sel = null; tool._fx = null; tool._focusSide = 0; tool.st = C.newState(r, tool.FAST ? null : Math.random); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this.st = PostBoxCore.newState(PostBoxCore.rounds('count', 'first')[0], null);
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st, r = st.r, C = PostBoxCore;
    api.stage.innerHTML = '';
    var L = this._L = C.layout(this._width(), r);
    var wrap = api.el('div', 'pb-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + r.mode); this._wrap = wrap;
    wrap.style.setProperty('--pb-tile', L.tile + 'px'); wrap.style.setProperty('--pb-big', L.big + 'px'); wrap.style.setProperty('--pb-doorw', L.doorW + 'px'); wrap.style.setProperty('--pb-doorh', L.doorH + 'px'); wrap.style.setProperty('--pb-cols', L.cols); wrap.style.setProperty('--pb-dcols', L.doorCols);
    var stage = api.el('div', 'pb-stage'); this._stage = stage; wrap.appendChild(stage);
    var mat = api.el('div', 'pb-mat'); this._mat = mat; stage.appendChild(mat);
    var box = api.el('div', 'pb-box'); stage.appendChild(box);
    var doors = api.el('div', 'pb-doors'); box.appendChild(doors); this._doors = {};
    st.doors.forEach(function (d) {
      var b = api.el('button', 'pb-door' + (r.mode === 'real' ? ' is-big' : '') + (typeof d === 'number' ? ' is-num' : ' is-name')); b.type = 'button'; b.setAttribute('data-door', d);
      b.setAttribute('aria-label', typeof d === 'number' ? self._t('ariaDoor', { n: d }) : self._t('ariaNameDoor', { name: self._t('n_' + d) }));
      b.innerHTML = self._doorHTML(d);
      b.addEventListener('click', function () { self._tapDoor(d); });
      doors.appendChild(b); self._doors[d] = b;
    });
    var drawer = api.el('div', 'pb-drawer'); drawer.setAttribute('aria-label', this._t('ariaDrawer')); this._drawer = drawer; box.appendChild(drawer);
    var note = api.el('div', 'pb-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'pb-ask'); ask.appendChild(note);
    var chk = api.el('button', 'pb-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    api.stage.appendChild(wrap);
    this._paint();
  },
  /* a door: the numeral (or the name) on its flap, its sticks, its corner dots */
  _doorHTML: function (d) {
    var r = this.st.r, n = PostBoxCore.sticksOf(d), sticks = '', dots = '';
    for (var i = 0; i < n; i++) { sticks += '<i class="pb-stick"></i>'; dots += '<i class="pb-dot"></i>'; }
    if (r.mode === 'real') return '<span class="pb-flap is-real">' + this._realFlap(d) + '</span>';
    var face = typeof d === 'number' ? '<b class="pb-num">' + d + '</b>' : '<b class="pb-name">' + this._t('n_' + d) + '</b>';
    return '<span class="pb-flap">' + face + '</span><span class="pb-sticks">' + sticks + '</span><span class="pb-dots">' + dots + '</span>';
  },
  /* the real-or-not door shows the target's defining parts */
  _realFlap: function (d) {
    var s = '<svg viewBox="0 0 120 90" aria-hidden="true">';
    if (d === 'tri') s += '<line class="pb-fs" x1="12" y1="20" x2="70" y2="20"/><line class="pb-fs" x1="12" y1="42" x2="104" y2="42"/><line class="pb-fs" x1="12" y1="64" x2="52" y2="64"/><circle class="pb-fd" cx="84" cy="64" r="5"/><circle class="pb-fd" cx="98" cy="64" r="5"/><circle class="pb-fd" cx="112" cy="64" r="5"/>';
    else {
      var A = d === 'sq' ? [52, 52, 52, 52] : [66, 66, 34, 34], cls = d === 'sq' ? ['', '', '', ''] : [' is-p1', ' is-p1', ' is-p2', ' is-p2'];
      A.forEach(function (len, i) { s += '<line class="pb-fs' + cls[i] + '" x1="10" y1="' + (12 + i * 17) + '" x2="' + (10 + len) + '" y2="' + (12 + i * 17) + '"/>'; });
      for (var k = 0; k < 4; k++) { var cx = 90 + (k % 2) * 18, cy = 14 + Math.floor(k / 2) * 34; s += '<path class="pb-fc" d="M' + cx + ' ' + cy + ' v20 h20"/><rect class="pb-fsq" x="' + cx + '" y="' + (cy + 13) + '" width="7" height="7"/>'; }
    }
    return s + '</svg>';
  },

  _paint: function () {
    if (!this._stage) return;
    var st = this.st, r = st.r, C = PostBoxCore;
    if (r.mode === 'count') this._paintCount(); else this._paintTray();
    /* doors: the one to breathe (count, help 2) */
    var breathe = r.mode === 'count' && st.help >= 2 && !st.done ? C.sidesOf(C.tileShape(st.tiles[0])) : null;
    for (var d in this._doors) { var b = this._doors[d]; b.classList.toggle('is-breathe', String(breathe) === d); b.classList.toggle('is-target', !!this._sel); b.disabled = !!st.done; }
    /* the drawer */
    var self = this, html = '';
    st.posted.forEach(function (id) { var t = C.tileById(st, id), s = C.tileShape(t), k = C.kindOf(s); html += '<span class="pb-mini">' + self._shapeSVG(s, t.turn, 'pb-msvg') + (st.done ? '<em class="pb-plate">' + self._t('n_' + k) + '</em>' : '') + '</span>'; });
    this._drawer.innerHTML = html; this._drawer.classList.toggle('is-open', !!st.done);
    /* the note */
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._celebrate();
    else if (h) msg = this._t(h);
    else if (st.last && st.last.res && st.last.res.result !== 'fit') { var rk = C.resultKey(st.last.res); msg = this._t(rk, { a: st.last.res.sticks, b: st.last.res.sides }); }
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._checkBtn.hidden = !!st.done || r.mode === 'count'; this._checkBtn.disabled = !!this._busy;
  },
  _celebrate: function () { var r = this.st.r, C = PostBoxCore; if (r.mode === 'count') return this._t('ok_' + C.kindOf(C.shapeOf(r.tiles[0].key))); if (r.mode === 'sort') return this._t('okSort'); if (r.mode === 'name') return this._t('okName'); return this._t('okReal_' + r.target); },

  /* ---- drawing a shape ---- */
  _pathOf: function (s, P) {
    var f = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }, n = P.length, d = '';
    if (s.open != null) {
      var k = s.open, a = P[k], b = P[(k + 1) % n], z = P[(k - 1 + n) % n], g = 0.12;
      var start = [a[0] + (b[0] - a[0]) * g, a[1] + (b[1] - a[1]) * g], end = [a[0] + (z[0] - a[0]) * g, a[1] + (z[1] - a[1]) * g];
      d = 'M' + f(start); for (var i = 1; i < n; i++) d += ' L' + f(P[(k + i) % n]); d += ' L' + f(end);
      return { d: d, open: true };
    }
    d = 'M' + f(P[0]);
    for (var j = 1; j <= n; j++) {
      var p0 = P[j - 1], p1 = P[j % n];
      if (s.curve === j - 1) { var mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, cx = P.reduce(function (q, p) { return q + p[0]; }, 0) / n, cy = P.reduce(function (q, p) { return q + p[1]; }, 0) / n, ox = mx - cx, oy = my - cy, ol = Math.hypot(ox, oy) || 1, len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]); d += ' Q' + (mx + ox / ol * len * 0.42).toFixed(1) + ' ' + (my + oy / ol * len * 0.42).toFixed(1) + ' ' + f(p1); }
      else d += ' L' + f(p1);
    }
    return { d: d + ' Z', open: false };
  },
  _fill: function (key) { var F = ['#F6C9B5', '#CFE6DF', '#F3D9A8', '#D8D3F0', '#CDE7C8', '#F9D3E0', '#FBE7A1', '#BFE0F0']; var h = 0; for (var i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0; return F[h % F.length]; },
  _shapeSVG: function (s, turn, cls, size) {
    var P = PostBoxCore.fitted(s, turn, size || 80), p = this._pathOf(s, P);
    return '<svg class="' + cls + '" viewBox="-50 -50 100 100" aria-hidden="true"><path class="pb-shape' + (p.open ? ' is-open' : '') + '" style="fill:' + (p.open ? 'none' : this._fill(s.key)) + '" d="' + p.d + '"/></svg>';
  },
  /* the result of the last offer, drawn on the shape */
  _fxHTML: function (s, P, res, door) {
    var out = '', n = P.length, C = PostBoxCore, line = function (a, b, cls) { return '<line class="' + cls + '" x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '"/>'; };
    var shrink = function (a, b, k) { return [[a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k], [b[0] + (a[0] - b[0]) * k, b[1] + (a[1] - b[1]) * k]]; };
    if (res.result === 'open') { for (var i = 0; i < n - 1; i++) { var a = P[(s.open + i) % n], b = P[(s.open + i + 1) % n], dx = ((i * 37) % 23) - 11, dy = 18 + ((i * 53) % 17); out += '<g class="pb-heap" style="transform:translate(' + dx + 'px,' + dy + 'px) rotate(' + (i % 2 ? 24 : -18) + 'deg)">' + line(a, b, 'pb-fxstick') + '</g>'; } return out; }
    if (res.result === 'curve') { var c0 = P[s.curve], c1 = P[(s.curve + 1) % n]; return '<g class="pb-rock">' + line(c0, c1, 'pb-fxstick') + '</g>'; }
    var C4 = C.corners(s.verts).length === n ? P : P;
    if (res.result === 'lengths') {
      var Ls = C.lengths(C4), avg = door === 'sq' ? [0, 1, 2, 3].map(function () { return Ls.reduce(function (q, x) { return q + x; }, 0) / 4; }) : [0, 1, 2, 3].map(function (i) { return (Ls[i % 2] + Ls[i % 2 + 2]) / 2; });
      for (var j = 0; j < 4; j++) { var p0 = C4[j], p1 = C4[(j + 1) % 4], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, ux = (p1[0] - p0[0]) / Ls[j], uy = (p1[1] - p0[1]) / Ls[j], h = avg[j] / 2 * 0.98; out += line([mx - ux * h, my - uy * h], [mx + ux * h, my + uy * h], 'pb-fxstick' + (Math.abs(avg[j] - Ls[j]) > 0.02 * Ls[j] ? ' is-bad' : '')); }
      return out;
    }
    if (res.result === 'corners') {
      for (var k = 0; k < 4; k++) { var q = C4[k], nx = C4[(k + 1) % 4], ul = Math.hypot(nx[0] - q[0], nx[1] - q[1]), ux2 = (nx[0] - q[0]) / ul, uy2 = (nx[1] - q[1]) / ul, s1 = [q[0] + ux2 * 10, q[1] + uy2 * 10], s2 = [s1[0] - uy2 * 10, s1[1] + ux2 * 10], s3 = [q[0] - uy2 * 10, q[1] + ux2 * 10]; out += '<path class="pb-fxcorner" d="M' + s1[0].toFixed(1) + ' ' + s1[1].toFixed(1) + ' L' + s2[0].toFixed(1) + ' ' + s2[1].toFixed(1) + ' L' + s3[0].toFixed(1) + ' ' + s3[1].toFixed(1) + '"/>'; }
      for (var m = 0; m < 4; m++) out += line.apply(null, shrink(C4[m], C4[(m + 1) % 4], 0.08).concat(['pb-fxstick']));
      return out;
    }
    var sticks = Math.min(C.sticksOf(door), n);
    for (var e = 0; e < n; e++) { var ab = shrink(P[e], P[(e + 1) % n], 0.08); out += e < sticks ? line(ab[0], ab[1], 'pb-fxstick') : line(ab[0], ab[1], 'pb-bare'); }
    if (res.result === 'tooMany') for (var x = 0; x < res.diff; x++) out += '<g class="pb-extra" style="animation-delay:' + (x * 120) + 'ms">' + line([-22 + x * 8, 44], [22 + x * 8, 44], 'pb-fxstick') + '</g>';
    return out;
  },

  /* ---- count: one big shape, its sides, its pegs ---- */
  _paintCount: function () {
    var self = this, st = this.st, C = PostBoxCore, t = st.tiles[0], s = C.tileShape(t), P = C.fitted(s, t.turn, 80), n = P.length, L = this._L;
    var mat = this._mat; mat.innerHTML = '';
    if (t.posted) return;
    var b = this.api.el('button', 'pb-tile is-big' + (this._sel === t.id ? ' is-sel' : '')); b.type = 'button'; b.setAttribute('data-id', t.id); b.setAttribute('aria-label', this._t('ariaTile', { i: 1, total: 1 }));
    b.style.width = L.big + 'px'; b.style.height = L.big + 'px';
    var p = this._pathOf(s, P), html = '<svg class="pb-svg" viewBox="-50 -50 100 100" aria-hidden="true"><path class="pb-shape" style="fill:' + this._fill(s.key) + '" d="' + p.d + '"/>';
    if (st.help >= 1) P.forEach(function (q, i) { var a = q, c = P[(i + 1) % n], mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2, ux = c[0] - a[0], uy = c[1] - a[1], l = Math.hypot(ux, uy) || 1; html += '<line class="pb-tick" x1="' + (mx - uy / l * 4).toFixed(1) + '" y1="' + (my + ux / l * 4).toFixed(1) + '" x2="' + (mx + uy / l * 4).toFixed(1) + '" y2="' + (my - ux / l * 4).toFixed(1) + '"/><circle class="pb-cdot" cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="2.4"/>'; });
    if (st.last && st.last.res && st.last.res.result !== 'fit' && st.last.tile === t.id) html += '<g class="pb-fx">' + this._fxHTML(s, P, st.last.res, st.last.door) + '</g>';
    P.forEach(function (q, i) { var c = P[(i + 1) % n]; html += '<line class="pb-side' + (self._focusSide === i && self._kbd ? ' is-focus' : '') + '" data-side="' + i + '" x1="' + q[0].toFixed(1) + '" y1="' + q[1].toFixed(1) + '" x2="' + c[0].toFixed(1) + '" y2="' + c[1].toFixed(1) + '"><title>' + self._t('ariaSide', { i: i + 1 }) + '</title></line>'; });
    st.pegs.forEach(function (side, k) { var q = P[side], c = P[(side + 1) % n], mx = (q[0] + c[0]) / 2, my = (q[1] + c[1]) / 2; html += '<g class="pb-peg"><circle cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="6.5"/><text x="' + mx.toFixed(1) + '" y="' + (my + 3.4).toFixed(1) + '" text-anchor="middle">' + (k + 1) + '</text></g>'; });
    b.innerHTML = html + '</svg>';
    this._bindTile(b, t.id);
    b.querySelectorAll('.pb-side').forEach(function (ln) { ln.addEventListener('click', function (ev) { ev.stopPropagation(); self._peg(+ln.getAttribute('data-side')); }); });
    b.addEventListener('keydown', function (ev) { self._countKey(ev); });
    mat.appendChild(b);
  },
  _peg: function (side) {
    if (this._busy) return;
    var res = PostBoxCore.plantPeg(this.st, side); if (!res) return;
    this.st.last = null;
    this.api.sound(res === 'plant' ? 700 + this.st.pegs.length * 40 : res === 'lift' ? 420 : 300);
    this._paint();
    if (res === 'wiggle' && !this.FAST) { var self = this; var g = this._mat.querySelectorAll('.pb-peg')[this.st.pegs.indexOf(side)]; if (g && g.animate) g.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(12deg)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(0)' }], { duration: 360 }); void self; }
  },
  _countKey: function (ev) {
    var st = this.st, n = PostBoxCore.sidesOf(PostBoxCore.tileShape(st.tiles[0])) || 3;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') { ev.preventDefault(); this._kbd = true; this._focusSide = (this._focusSide + 1) % n; this._paint(); this._refocus(); }
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') { ev.preventDefault(); this._kbd = true; this._focusSide = (this._focusSide - 1 + n) % n; this._paint(); this._refocus(); }
    else if (ev.key === ' ') { ev.preventDefault(); this._kbd = true; this._peg(this._focusSide); this._refocus(); }
    else if (ev.key === 'Backspace') { ev.preventDefault(); if (PostBoxCore.liftPeg(st)) { this.api.sound(420); this._paint(); this._refocus(); } }
    else if (ev.key === 'r' || ev.key === 'R') { ev.preventDefault(); this._spin(st.tiles[0].id); this._refocus(); }
  },
  _refocus: function () { var b = this._mat.querySelector('.pb-tile'); if (b) b.focus(); },

  /* ---- trays: the tiles, each a button; drag or tap-tap to a door ---- */
  _paintTray: function () {
    var self = this, st = this.st, C = PostBoxCore, r = st.r, mat = this._mat;
    mat.innerHTML = '';
    var tray = this.api.el('div', 'pb-tray'); mat.appendChild(tray);
    st.slots.forEach(function (id, k) {
      var t = C.tileById(st, id), cell = self.api.el('div', 'pb-cell'); tray.appendChild(cell);
      if (t.posted) return;
      var s = C.tileShape(t), P = C.fitted(s, t.turn, 80), left = st.show && st.last && st.last.left && st.last.left.indexOf(id) >= 0;
      var b = self.api.el('button', 'pb-tile' + (self._sel === id ? ' is-sel' : '') + (left && st.help >= 1 ? ' is-wobble' : '')); b.type = 'button'; b.setAttribute('data-id', id);
      b.setAttribute('aria-label', self._t('ariaTile', { i: k + 1, total: st.slots.length }));
      var p = self._pathOf(s, P), html = '<svg class="pb-svg" viewBox="-50 -50 100 100" aria-hidden="true"><path class="pb-shape' + (p.open ? ' is-open' : '') + '" style="fill:' + (p.open ? 'none' : self._fill(s.key)) + '" d="' + p.d + '"/>';
      if (left && st.help >= 2 && s.open == null && s.curve == null) P.forEach(function (q, i) { var c = P[(i + 1) % P.length], mx = (q[0] + c[0]) / 2, my = (q[1] + c[1]) / 2, ux = c[0] - q[0], uy = c[1] - q[1], l = Math.hypot(ux, uy) || 1; html += '<line class="pb-tick" x1="' + (mx - uy / l * 4).toFixed(1) + '" y1="' + (my + ux / l * 4).toFixed(1) + '" x2="' + (mx + uy / l * 4).toFixed(1) + '" y2="' + (my - ux / l * 4).toFixed(1) + '"/><circle class="pb-cdot" cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="2.4"/>'; });
      if (st.last && st.last.res && st.last.res.result !== 'fit' && st.last.tile === id) html += '<g class="pb-fx">' + self._fxHTML(s, P, st.last.res, st.last.door) + '</g>';
      html += '</svg>';
      if (left && st.help >= 2) { var dd = C.rightDoor(r, t), m = C.sticksOf(dd), sk = ''; for (var i = 0; i < m; i++) sk += '<i class="pb-stick"></i>'; html += '<span class="pb-hover" aria-hidden="true">' + sk + '</span>'; }
      b.innerHTML = html;
      self._bindTile(b, id);
      cell.appendChild(b);
    });
  },
  _bindTile: function (el, id) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || (ev.target.closest && ev.target.closest('.pb-side'))) return;
      ev.preventDefault();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        if (!moved) { moved = true; self._sel = id; ghost = el.cloneNode(true); ghost.className = 'pb-tile pb-dragging'; ghost.style.width = ghost.style.height = '72px'; document.body.appendChild(ghost); }
        ghost.style.left = (e.clientX - 36) + 'px'; ghost.style.top = (e.clientY - 36) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (ghost) ghost.remove();
        if (!moved) { var now = Date.now(), lt = self._lastTap; if (lt && lt.id === id && now - lt.t < 360) { self._lastTap = null; self._spin(id); return; } self._lastTap = { id: id, t: now }; self._sel = self._sel === id ? null : id; self.api.sound(660); self._paint(); return; }
        var d = self._doorAt(e.clientX, e.clientY); self._sel = null;
        if (d != null) self._offer(id, d); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    el.addEventListener('click', function (ev) { if (ev.detail !== 0) return; ev.stopPropagation(); self._sel = self._sel === id ? null : id; self._paint(); var nx = self._mat.querySelector('.pb-tile[data-id="' + id + '"]'); if (nx) nx.focus(); });
    el.addEventListener('keydown', function (ev) { if ((ev.key === 'r' || ev.key === 'R') && self.st.r.mode !== 'count') { ev.preventDefault(); self._spin(id); var nx = self._mat.querySelector('.pb-tile[data-id="' + id + '"]'); if (nx) nx.focus(); } });
  },
  _spin: function (id) { if (this._busy) return; if (PostBoxCore.spin(this.st, id)) { this.api.sound(520); this._paint(); } },
  _doorAt: function (x, y) { for (var d in this._doors) { var r = this._doors[d].getBoundingClientRect(); if (x >= r.left - 4 && x <= r.right + 4 && y >= r.top - 4 && y <= r.bottom + 4) return this.st.doors.filter(function (q) { return String(q) === d; })[0]; } return null; },
  _tapDoor: function (d) {
    this._lastTap = null;
    if (this._busy || this.st.done) return;
    var st = this.st;
    if (st.r.mode === 'count') { this._sel = null; this._offer(st.tiles[0].id, d); return; }
    if (!this._sel) { var b = this._doors[d]; if (b && b.animate && !this.FAST) b.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 260 }); this.api.sound(460); return; }
    var id = this._sel; this._sel = null; this._offer(id, d);
  },
  _offer: function (id, d) {
    var self = this, C = PostBoxCore, st = this.st, from = this._mat.querySelector('.pb-tile[data-id="' + id + '"]'), r0 = from ? from.getBoundingClientRect() : null;
    var res = C.post(st, id, d); if (!res) { this._paint(); return; }
    if (res.result !== 'fit') {
      this.api.sound({ tooMany: 200, tooFew: 230, open: 170, curve: 260, lengths: 240, corners: 250 }[res.result] || 200);
      if (st.r.mode === 'count' && st.help >= 2) st.pegs = Array.from({ length: C.sidesOf(C.tileShape(st.tiles[0])) }, function (_, i) { return i; });
      this._paint();
      var nx = this._mat.querySelector('.pb-tile[data-id="' + id + '"]'); if (nx && document.activeElement && document.activeElement.closest && document.activeElement.closest('.pb-door')) { /* keep the focus on the door */ } void nx;
      return;
    }
    this.api.sound(140);
    var door = this._doors[d];
    if (!this.FAST && r0 && door && document.body.animate) {
      var b = door.getBoundingClientRect(), fl = document.createElement('div'); fl.className = 'pb-flyer'; fl.innerHTML = from.innerHTML; fl.style.left = r0.left + 'px'; fl.style.top = r0.top + 'px'; fl.style.width = r0.width + 'px'; fl.style.height = r0.height + 'px'; document.body.appendChild(fl);
      fl.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + (b.left + b.width / 2 - r0.left - r0.width / 2) + 'px,' + (b.top + b.height / 2 - r0.top - r0.height / 2) + 'px) scale(.2)', opacity: 0.2 }], { duration: 420, easing: 'ease-in' }).onfinish = function () { fl.remove(); };
      door.classList.add('is-thunk'); this._later(function () { door.classList.remove('is-thunk'); }, 500);
    }
    if (st.done) { this._win(); return; }
    this._paint();
  },
  _check: function () {
    this._lastTap = null;
    if (this._busy || this.st.done) return;
    var res = PostBoxCore.check(this.st);
    if (res && res.check === 'ok') { this._win(); return; }
    if (res && res.check === 'left') this.api.sound(196);
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

var pbCssDone = false;
function injectPostBoxCSS() {
  if (pbCssDone || typeof document === 'undefined') return;
  pbCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.pb-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--pb-ink:#0F4A40;--pb-teal:#146B5E;--pb-coral:#F2784B;}'
  + '.pb-stage{display:flex;flex-direction:column;align-items:stretch;gap:10px;user-select:none;-webkit-user-select:none;width:100%;}'
  + '.pb-mat{display:flex;align-items:center;justify-content:center;padding:12px;border-radius:16px;background-color:#FBF3E4;background-image:radial-gradient(#E3D3B3 1.2px,transparent 1.3px);background-size:16px 16px;box-shadow:inset 0 0 0 2px #E3D3B3;}'
  + '.is-count .pb-mat{min-height:calc(var(--pb-big) + 24px);} .is-narrow .pb-mat{padding:8px;} .is-narrow .pb-box{padding:8px 8px 6px;} .is-narrow .pb-drawer{margin-top:6px;min-height:24px;} .is-narrow .pb-mini .pb-msvg{width:22px;height:22px;}'
  + '.pb-tray{display:grid;grid-template-columns:repeat(var(--pb-cols),var(--pb-tile));gap:8px;justify-content:center;}'
  + '.pb-cell{width:var(--pb-tile);height:var(--pb-tile);border-radius:12px;box-shadow:inset 0 0 0 2px rgba(227,211,179,.7);}'
  + '.pb-tile{position:relative;width:100%;height:100%;padding:0;border:0;border-radius:12px;background:transparent;cursor:grab;touch-action:none;transition:transform .15s ease;} .pb-tile.is-big{border-radius:16px;}'
  + '.pb-tile.is-sel{transform:translateY(-6px);filter:drop-shadow(0 6px 6px rgba(0,0,0,.2));} .pb-tile.is-sel .pb-shape{stroke:var(--pb-teal);}'
  + '.pb-tile.is-wobble{animation:pb-wob .4s ease-in-out 2;} @keyframes pb-wob{25%{transform:translateY(-4px) rotate(-4deg);}75%{transform:translateY(-4px) rotate(4deg);}}'
  + '.pb-svg,.pb-msvg{width:100%;height:100%;display:block;overflow:visible;}'
  + '.pb-shape{stroke:#2A2A35;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke;} .pb-shape.is-open{stroke-width:4;}'
  + '.pb-side{stroke:transparent;stroke-width:40;stroke-linecap:round;vector-effect:non-scaling-stroke;cursor:pointer;pointer-events:stroke;} .pb-side.is-focus{stroke:rgba(20,107,94,.25);}'
  + '.pb-tick{stroke:#5B4BA0;stroke-width:2.5;vector-effect:non-scaling-stroke;opacity:.85;} .pb-cdot{fill:#5B4BA0;opacity:.85;}'
  + '.pb-peg circle{fill:#F2C14B;stroke:#2A2A35;stroke-width:1.5;vector-effect:non-scaling-stroke;} .pb-peg text{font-size:8px;font-weight:800;fill:#2A2A35;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);pointer-events:none;} .pb-peg{pointer-events:none;transform-box:fill-box;transform-origin:center;}'
  + '.pb-fxstick{stroke:#C79A3B;stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke;} .pb-fxstick.is-bad{stroke:#E06A3A;} .pb-bare{stroke:#F2784B;stroke-width:6;stroke-linecap:round;stroke-dasharray:2 7;vector-effect:non-scaling-stroke;animation:pb-glow .7s ease-in-out 3;} @keyframes pb-glow{50%{opacity:.25;}}'
  + '.pb-extra{transform-box:fill-box;transform-origin:center;animation:pb-tumble .8s ease-in forwards;} @keyframes pb-tumble{0%{transform:translate(0,-40px) rotate(0);}60%{transform:translate(6px,0) rotate(30deg);}100%{transform:translate(12px,0) rotate(18deg);}}'
  + '.pb-heap{transform-box:fill-box;transform-origin:center;} .pb-rock{transform-box:fill-box;transform-origin:center;animation:pb-rock .5s ease-in-out 2;} @keyframes pb-rock{25%{transform:rotate(-10deg);}75%{transform:rotate(10deg);}}'
  + '.pb-fxcorner{fill:none;stroke:#E06A3A;stroke-width:3;vector-effect:non-scaling-stroke;}'
  + '.pb-hover{position:absolute;left:4px;right:4px;top:-10px;display:flex;flex-wrap:wrap;justify-content:center;gap:2px;padding:3px;border-radius:8px;background:#fff;box-shadow:0 0 0 2px var(--pb-teal);pointer-events:none;} .pb-hover .pb-stick{width:9px;height:4px;}'
  + '.pb-box{position:relative;padding:12px 10px 8px;border-radius:30px 30px 14px 14px;background:#D9473C;box-shadow:inset 0 0 0 3px #2A2A35,inset 0 -6px 0 rgba(0,0,0,.15);}'
  + '.pb-doors{display:grid;grid-template-columns:repeat(var(--pb-dcols),var(--pb-doorw));gap:8px;justify-content:center;}'
  + '.pb-door{width:var(--pb-doorw);height:var(--pb-doorh);padding:6px 4px;border:0;border-radius:10px;background:#B9362D;box-shadow:inset 0 0 0 3px #2A2A35,inset 0 6px 0 #F2C14B;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:3px;cursor:pointer;color:#fff;}'
  + '.pb-door.is-target{box-shadow:inset 0 0 0 3px #FFE7A6,inset 0 6px 0 #F2C14B;} .pb-door:disabled{cursor:default;}'
  + '.pb-door.is-breathe{animation:pb-breathe 1.2s ease-in-out infinite;} @keyframes pb-breathe{50%{transform:scale(1.06);box-shadow:inset 0 0 0 3px #FFE7A6,0 0 14px #FFE7A6;}}'
  + '.pb-door.is-thunk{animation:pb-thunk .45s ease-out;} @keyframes pb-thunk{40%{transform:translateY(3px) scaleY(.96);}}'
  + '.pb-flap{flex:1;width:100%;display:flex;align-items:center;justify-content:center;border-radius:6px;background:var(--pb-teal);padding:2px;} .pb-flap.is-real{background:#FFFDF6;} .pb-flap.is-real svg{width:100%;height:100%;}'
  + '.pb-num{font-weight:800;font-size:36px;line-height:1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);} .is-narrow .pb-num{font-size:30px;}'
  + '.pb-name{font-weight:800;font-size:18px;line-height:1.05;text-align:center;font-family:var(--lcs-font-body,Nunito,sans-serif);hyphens:manual;-webkit-hyphens:manual;} .is-narrow .pb-name{font-size:15px;}'
  + '.pb-sticks,.pb-dots{display:flex;flex-wrap:wrap;justify-content:center;gap:3px;} .pb-stick{display:block;width:18px;height:5px;border-radius:3px;background:#F2C14B;box-shadow:0 0 0 1px #8C6A21;} .is-narrow .pb-stick{width:12px;height:4px;} .pb-dot{display:block;width:5px;height:5px;border-radius:50%;background:#FFE7A6;}'
  + '.pb-fs{stroke:#C79A3B;stroke-width:6;stroke-linecap:round;} .pb-fs.is-p1{stroke:#146B5E;} .pb-fs.is-p2{stroke:#8A5CC9;} .pb-fd{fill:#2A2A35;} .pb-fc{fill:none;stroke:#2A2A35;stroke-width:3;} .pb-fsq{fill:none;stroke:#2A2A35;stroke-width:2;}'
  + '.pb-drawer{margin-top:8px;min-height:30px;display:flex;flex-wrap:wrap;gap:6px;align-items:flex-start;justify-content:center;padding:4px;border-radius:8px;background:rgba(255,255,255,.35);box-shadow:inset 0 0 0 2px rgba(42,42,53,.5);} .pb-drawer.is-open{background:rgba(255,253,246,.92);}'
  + '.pb-mini{display:flex;flex-direction:column;align-items:center;gap:2px;} .pb-mini .pb-msvg{width:28px;height:28px;} .pb-plate{font-style:normal;font-size:12px;font-weight:700;color:#2A2A35;background:#FFE7A6;border-radius:4px;padding:0 4px;}'
  + '.pb-dragging{position:fixed;z-index:50;pointer-events:none;opacity:.92;} .pb-flyer{position:fixed;z-index:40;pointer-events:none;}'
  + '.pb-note{min-height:28px;font:700 18px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--pb-ink);text-align:center;flex:1;} .pb-note:empty{display:none;} .pb-note.is-ok{color:var(--pb-teal);font-weight:800;} .is-narrow .pb-note{font-size:15px;text-align:left;}'
  + '.pb-ask{display:flex;align-items:center;justify-content:center;gap:10px;}'
  + '.pb-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .pb-check[hidden]{display:none;} .pb-check:disabled{opacity:.5;}'
  + '.pb-tile:focus-visible,.pb-door:focus-visible,.pb-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.pb-wrap *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'pb-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.PostBoxActivity = PostBoxActivity;
