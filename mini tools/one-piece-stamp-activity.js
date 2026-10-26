/* =====================================================================
   one-piece-stamp-activity.js — ACTIVITY #108 of the one-by-one rebuild:
   "Make Equal Parts" → THE ONE-PIECE STAMP (1.G.A.3, 11 locales).
   Design: docs/activities-rebuild/designs/108-fractions.md
   ---------------------------------------------------------------------
   THE INVENTION: cut the shape yourself, then lift a glass copy of one
   piece and stamp it on the others. Equal parts are COPIES of one piece:
   a copy clicks down and gets the next number; a piece that is not a copy
   shows the stamp hanging over it (coral) and the part it cannot cover
   (stripes). The cut menu is proved (gate) so that "equal" and "copy"
   never disagree. Level 1: halves and fourths of eight shapes. Level 2:
   thirds (spokes from a centre pin on the circle, triangle, hexagon) and
   "now make fourths from your halves". Level 3: shade a fraction by
   stamping copies, name a shaded fraction on two number wheels, and one
   trap: "are these fourths?" — they are not.
   Miss 1: the stamp tests every piece from the biggest; the hint names
   the cause. Miss 2: gold dots mark one fair cut. Success: every piece
   numbered, 1/n on each, the shape goes to the shelf; free play: halve
   again (a proved doubling).
   ACTIVITY LAYER ONLY: the model is one-piece-stamp-core.js; everything
   is drawn geometry; lcs-shell.js untouched (the shell's Check is hidden
   and pressed by this activity when right).
   Test seams: window.OnePieceStampActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._view / ._dims / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var OnePieceStampActivity = {
  id: 'one-piece-stamp',
  apparatusClasses: ['ops-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'The One-Piece Stamp',de:'Der Teile-Stempel',nl:'De stempel van één stuk',da:'Stykkestemplet',sv:'Bitstämpeln',no:'Bitstempelet',es:'El sello de una pieza',it:'Il timbro di un pezzo',pt:'O carimbo de uma peça',fr:'Le tampon des parts égales',fi:'Palaleimasin'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tCut2:        {en:'Cut the shape into 2 equal parts, then stamp to check.',de:'Schneide die Form in 2 gleich große Teile und prüfe mit dem Stempel.',nl:'Knip de vorm in 2 gelijke delen en controleer met de stempel.',da:'Klip figuren i 2 lige store dele, og tjek med stemplet.',sv:'Klipp figuren i 2 lika stora delar och kontrollera med stämpeln.',no:'Klipp figuren i 2 like store deler, og sjekk med stempelet.',es:'Corta la figura en 2 partes iguales y comprueba con el sello.',it:'Taglia la figura in 2 parti uguali e controlla con il timbro.',pt:'Corte a figura em 2 partes iguais e confira com o carimbo.',fr:'Coupe la figure en 2 parts égales, puis vérifie avec le tampon.',fi:'Leikkaa kuvio kahteen yhtä suureen osaan ja tarkista leimasimella.'},
    tCut3:        {en:'Cut the shape into 3 equal parts, then stamp to check.',de:'Schneide die Form in 3 gleich große Teile und prüfe mit dem Stempel.',nl:'Knip de vorm in 3 gelijke delen en controleer met de stempel.',da:'Klip figuren i 3 lige store dele, og tjek med stemplet.',sv:'Klipp figuren i 3 lika stora delar och kontrollera med stämpeln.',no:'Klipp figuren i 3 like store deler, og sjekk med stempelet.',es:'Corta la figura en 3 partes iguales y comprueba con el sello.',it:'Taglia la figura in 3 parti uguali e controlla con il timbro.',pt:'Corte a figura em 3 partes iguais e confira com o carimbo.',fr:'Coupe la figure en 3 parts égales, puis vérifie avec le tampon.',fi:'Leikkaa kuvio kolmeen yhtä suureen osaan ja tarkista leimasimella.'},
    tCut4:        {en:'Cut the shape into 4 equal parts, then stamp to check.',de:'Schneide die Form in 4 gleich große Teile und prüfe mit dem Stempel.',nl:'Knip de vorm in 4 gelijke delen en controleer met de stempel.',da:'Klip figuren i 4 lige store dele, og tjek med stemplet.',sv:'Klipp figuren i 4 lika stora delar och kontrollera med stämpeln.',no:'Klipp figuren i 4 like store deler, og sjekk med stempelet.',es:'Corta la figura en 4 partes iguales y comprueba con el sello.',it:'Taglia la figura in 4 parti uguali e controlla con il timbro.',pt:'Corte a figura em 4 partes iguais e confira com o carimbo.',fr:'Coupe la figure en 4 parts égales, puis vérifie avec le tampon.',fi:'Leikkaa kuvio neljään yhtä suureen osaan ja tarkista leimasimella.'},
    tStep2:       {en:'Now make fourths from your halves.',de:'Mach jetzt aus deinen Hälften Viertel.',nl:'Maak nu kwarten van je helften.',da:'Lav nu fjerdedele af dine halvdele.',sv:'Gör nu fjärdedelar av dina halvor.',no:'Lag nå fjerdedeler av halvdelene dine.',es:'Ahora haz cuartos con tus medios.',it:'Ora fai dei quarti con le tue metà.',pt:'Agora faça quartos com as suas metades.',fr:'Maintenant, fais des quarts avec tes moitiés.',fi:'Tee nyt puolikkaistasi neljäsosia.'},
    tShade:       {en:'Color the fraction on the card: stamp equal pieces.',de:'Färbe den Bruch auf der Karte: Stemple gleich große Teile.',nl:'Kleur de breuk op de kaart: stempel gelijke delen.',da:'Farv brøken på kortet: Stempl lige store dele.',sv:'Färglägg bråket på kortet: stämpla lika stora delar.',no:'Fargelegg brøken på kortet: Stemple like store deler.',es:'Colorea la fracción de la tarjeta: sella partes iguales.',it:'Colora la frazione sul cartoncino: timbra parti uguali.',pt:'Pinte a fração do cartão: carimbe partes iguais.',fr:'Colorie la fraction de la carte : tamponne des parts égales.',fi:'Väritä kortin murtoluku: leimaa yhtä suuria osia.'},
    tName:        {en:'What fraction is colored? Set the two numbers.',de:'Welcher Bruch ist gefärbt? Stell die zwei Zahlen ein.',nl:'Welke breuk is gekleurd? Stel de twee getallen in.',da:'Hvilken brøk er farvet? Indstil de to tal.',sv:'Vilket bråk är färgat? Ställ in de två talen.',no:'Hvilken brøk er farget? Still inn de to tallene.',es:'¿Qué fracción está coloreada? Pon los dos números.',it:'Quale frazione è colorata? Imposta i due numeri.',pt:'Que fração está pintada? Escolha os dois números.',fr:'Quelle fraction est coloriée ? Règle les deux nombres.',fi:'Mikä murtoluku on väritetty? Aseta kaksi lukua.'},
    tTrap:        {en:'Are these fourths? Stamp to find out.',de:'Sind das Viertel? Finde es mit dem Stempel heraus.',nl:'Zijn dit kwarten? Zoek het uit met de stempel.',da:'Er det fjerdedele? Find ud af det med stemplet.',sv:'Är det fjärdedelar? Ta reda på det med stämpeln.',no:'Er dette fjerdedeler? Finn det ut med stempelet.',es:'¿Son cuartos? Averígualo con el sello.',it:'Sono quarti? Scoprilo con il timbro.',pt:'Estas peças são quartos? Descubra com o carimbo.',fr:'Est-ce que ce sont des quarts ? Découvre-le avec le tampon.',fi:'Ovatko nämä neljäsosia? Selvitä se leimasimella.'},
    hintEmpty:    {en:'Drag a cut across the shape first, from one dot to another.',de:'Zieh zuerst einen Schnitt durch die Form, von einem Punkt zu einem anderen.',nl:'Trek eerst een knip door de vorm, van de ene stip naar een andere.',da:'Træk først et klip hen over figuren, fra én prik til en anden.',sv:'Dra först ett klipp över figuren, från en prick till en annan.',no:'Dra først et klipp over figuren, fra én prikk til en annen.',es:'Primero arrastra un corte por la figura, de un punto a otro.',it:'Prima trascina un taglio attraverso la figura, da un puntino a un altro.',pt:'Primeiro arraste um corte pela figura, de um ponto a outro.',fr:'Fais d’abord glisser une coupe à travers la figure, d’un point à un autre.',fi:'Vedä ensin leikkaus kuvion poikki pisteestä toiseen.'},
    hintLimit:    {en:'That is all the cuts you need. Tap a cut to take it away.',de:'Mehr Schnitte brauchst du nicht. Tippe einen Schnitt an, um ihn wegzunehmen.',nl:'Meer knippen heb je niet nodig. Tik op een knip om hem weg te halen.',da:'Du behøver ikke flere klip. Tryk på et klip for at fjerne det.',sv:'Fler klipp behöver du inte. Tryck på ett klipp för att ta bort det.',no:'Du trenger ikke flere klipp. Trykk på et klipp for å fjerne det.',es:'Ya no necesitas más cortes. Toca un corte para quitarlo.',it:'Non ti servono altri tagli. Tocca un taglio per toglierlo.',pt:'Você não precisa de mais cortes. Toque num corte para tirá-lo.',fr:'Tu n’as pas besoin de plus de coupes. Touche une coupe pour l’enlever.',fi:'Enempää leikkauksia et tarvitse. Napauta leikkausta poistaaksesi sen.'},
    hintUneq:     {en:'The stamp does not fit every piece, so they are not all the same size.',de:'Der Stempel passt nicht auf jedes Teil – sie sind nicht alle gleich groß.',nl:'De stempel past niet op elk deel, dus ze zijn niet allemaal even groot.',da:'Stemplet passer ikke på alle stykker, så de er ikke lige store.',sv:'Stämpeln passar inte på alla bitar, så de är inte lika stora.',no:'Stempelet passer ikke på alle bitene, så de er ikke like store.',es:'El sello no cabe en todas las piezas: no todas son del mismo tamaño.',it:'Il timbro non va bene su tutti i pezzi: non sono tutti della stessa grandezza.',pt:'O carimbo não encaixa em todas as peças: elas não são todas do mesmo tamanho.',fr:'Le tampon ne va pas sur tous les morceaux : ils n’ont pas tous la même taille.',fi:'Leimasin ei sovi jokaiseen palaan, joten ne eivät ole kaikki samankokoisia.'},
    hintCount:    {en:'Count your pieces. Make as many equal pieces as the task asks.',de:'Zähl deine Teile. Mach so viele gleich große Teile, wie die Aufgabe sagt.',nl:'Tel je stukken. Maak zoveel gelijke delen als de opdracht vraagt.',da:'Tæl dine stykker. Lav lige så mange lige store dele, som opgaven siger.',sv:'Räkna dina bitar. Gör lika många lika stora delar som uppgiften säger.',no:'Tell bitene dine. Lag like mange like store deler som oppgaven sier.',es:'Cuenta tus piezas. Haz tantas partes iguales como pide la tarea.',it:'Conta i tuoi pezzi. Fai tante parti uguali quante ne chiede il compito.',pt:'Conte as suas peças. Faça tantas partes iguais quanto a tarefa pede.',fr:'Compte tes morceaux. Fais autant de parts égales que la consigne le demande.',fi:'Laske palasi. Tee niin monta yhtä suurta osaa kuin tehtävä pyytää.'},
    hintShade0:   {en:'Tap a piece to lift the stamp, then stamp the other pieces.',de:'Tippe ein Teil an, um den Stempel abzuheben, und stemple dann die anderen Teile.',nl:'Tik op een deel om de stempel op te pakken en stempel dan de andere delen.',da:'Tryk på et stykke for at løfte stemplet, og stempl så de andre stykker.',sv:'Tryck på en bit för att lyfta stämpeln och stämpla sedan de andra bitarna.',no:'Trykk på en bit for å løfte stempelet, og stemple så de andre bitene.',es:'Toca una pieza para levantar el sello y luego sella las otras piezas.',it:'Tocca un pezzo per sollevare il timbro, poi timbra gli altri pezzi.',pt:'Toque numa peça para levantar o carimbo e depois carimbe as outras peças.',fr:'Touche un morceau pour soulever le tampon, puis tamponne les autres morceaux.',fi:'Nosta leimasin napauttamalla palaa ja leimaa sitten muut palat.'},
    hintShade:    {en:'Count your colored pieces and look at the top number on the card.',de:'Zähl deine gefärbten Teile und schau auf die obere Zahl auf der Karte.',nl:'Tel je gekleurde delen en kijk naar het bovenste getal op de kaart.',da:'Tæl dine farvede stykker, og se på det øverste tal på kortet.',sv:'Räkna dina färgade bitar och titta på det översta talet på kortet.',no:'Tell de fargede bitene dine, og se på det øverste tallet på kortet.',es:'Cuenta tus piezas coloreadas y mira el número de arriba de la tarjeta.',it:'Conta i tuoi pezzi colorati e guarda il numero in alto sul cartoncino.',pt:'Conte as suas peças pintadas e olhe o número de cima do cartão.',fr:'Compte tes morceaux coloriés et regarde le nombre du haut sur la carte.',fi:'Laske väritetyt palasi ja katso kortin ylempää lukua.'},
    hintShade2:   {en:'The top number says how many pieces to color. The bottom number says how many pieces there are in all.',de:'Die obere Zahl sagt, wie viele Teile du färbst. Die untere Zahl sagt, wie viele Teile es insgesamt sind.',nl:'Het bovenste getal zegt hoeveel delen je kleurt. Het onderste getal zegt hoeveel delen er in totaal zijn.',da:'Det øverste tal siger, hvor mange stykker du skal farve. Det nederste tal siger, hvor mange stykker der er i alt.',sv:'Det översta talet säger hur många bitar du ska färglägga. Det nedersta talet säger hur många bitar det finns sammanlagt.',no:'Det øverste tallet sier hvor mange biter du skal fargelegge. Det nederste tallet sier hvor mange biter det er i alt.',es:'El número de arriba dice cuántas piezas colorear. El número de abajo dice cuántas piezas hay en total.',it:'Il numero in alto dice quanti pezzi colorare. Il numero in basso dice quanti pezzi ci sono in tutto.',pt:'O número de cima diz quantas peças pintar. O número de baixo diz quantas peças há no total.',fr:'Le nombre du haut dit combien de morceaux colorier. Le nombre du bas dit combien il y a de morceaux en tout.',fi:'Ylempi luku kertoo, montako palaa väritetään. Alempi luku kertoo, montako palaa on kaikkiaan.'},
    hintName:     {en:'How many equal pieces are there in all? How many are colored?',de:'Wie viele gleich große Teile sind es insgesamt? Wie viele sind gefärbt?',nl:'Hoeveel gelijke delen zijn er in totaal? Hoeveel zijn er gekleurd?',da:'Hvor mange lige store dele er der i alt? Hvor mange er farvet?',sv:'Hur många lika stora delar finns det sammanlagt? Hur många är färgade?',no:'Hvor mange like store deler er det i alt? Hvor mange er farget?',es:'¿Cuántas partes iguales hay en total? ¿Cuántas están coloreadas?',it:'Quante parti uguali ci sono in tutto? Quante sono colorate?',pt:'Quantas partes iguais há no total? Quantas estão pintadas?',fr:'Combien y a-t-il de parts égales en tout ? Combien sont coloriées ?',fi:'Montako yhtä suurta osaa on kaikkiaan? Montako on väritetty?'},
    hintName2:    {en:'Count the numbered pieces: the colored ones give the top number, all of them give the bottom number.',de:'Zähl die nummerierten Teile: Die gefärbten ergeben die obere Zahl, alle zusammen die untere.',nl:'Tel de genummerde delen: de gekleurde geven het bovenste getal, alle delen samen het onderste.',da:'Tæl de nummererede stykker: De farvede giver det øverste tal, alle sammen det nederste.',sv:'Räkna de numrerade bitarna: de färgade ger det översta talet, alla tillsammans det nedersta.',no:'Tell de nummererte bitene: De fargede gir det øverste tallet, alle sammen det nederste.',es:'Cuenta las piezas numeradas: las coloreadas dan el número de arriba, todas juntas el de abajo.',it:'Conta i pezzi numerati: quelli colorati danno il numero in alto, tutti insieme quello in basso.',pt:'Conte as peças numeradas: as pintadas dão o número de cima, todas juntas o de baixo.',fr:'Compte les morceaux numérotés : les coloriés donnent le nombre du haut, tous ensemble celui du bas.',fi:'Laske numeroidut palat: väritetyt antavat ylemmän luvun, kaikki yhdessä alemman.'},
    hintTrap:     {en:'Stamp them first. Are they equal?',de:'Stemple sie zuerst. Sind sie gleich groß?',nl:'Stempel ze eerst. Zijn ze gelijk?',da:'Stempl dem først. Er de lige store?',sv:'Stämpla dem först. Är de lika stora?',no:'Stemple dem først. Er de like store?',es:'Primero séllalas. ¿Son iguales?',it:'Prima timbrali. Sono uguali?',pt:'Primeiro carimbe as peças. Elas são iguais?',fr:'Tamponne-les d’abord. Sont-ils égaux ?',fi:'Leimaa ne ensin. Ovatko ne yhtä suuret?'},
    hintGhost:    {en:'Try the gold dots: they cut the shape fairly.',de:'Probier die goldenen Punkte: Sie teilen die Form gerecht.',nl:'Probeer de gouden stippen: die verdelen de vorm eerlijk.',da:'Prøv de gyldne prikker: De deler figuren i lige store dele.',sv:'Prova de gyllene prickarna: de delar figuren rättvist.',no:'Prøv de gylne prikkene: De deler figuren rettferdig.',es:'Prueba los puntos dorados: cortan la figura de forma justa.',it:'Prova i puntini dorati: tagliano la figura in modo giusto.',pt:'Experimente os pontos dourados: eles cortam a figura de forma justa.',fr:'Essaie les points dorés : ils coupent la figure de façon équitable.',fi:'Kokeile kultaisia pisteitä: ne jakavat kuvion reilusti.'},
    ok2:          {en:'2 equal parts! Each one is one half: 2 halves make the whole shape.',de:'2 gleich große Teile! Jedes ist eine Hälfte: 2 Hälften ergeben die ganze Form.',nl:'2 gelijke delen! Elk deel is een helft: 2 helften zijn samen de hele vorm.',da:'2 lige store dele! Hver er en halvdel: 2 halvdele giver hele figuren.',sv:'2 lika stora delar! Varje del är en halva: 2 halvor blir hela figuren.',no:'2 like store deler! Hver er en halvdel: 2 halvdeler blir hele figuren.',es:'¡2 partes iguales! Cada una es un medio: 2 medios forman la figura entera.',it:'2 parti uguali! Ognuna è una metà: 2 metà fanno la figura intera.',pt:'2 partes iguais! Cada uma é uma metade: 2 metades formam a figura inteira.',fr:'2 parts égales ! Chacune est une moitié : 2 moitiés font la figure entière.',fi:'2 yhtä suurta osaa! Jokainen on puolikas: 2 puolikasta muodostavat koko kuvion.'},
    ok3:          {en:'3 equal parts! Each one is one third: 3 thirds make the whole shape.',de:'3 gleich große Teile! Jedes ist ein Drittel: 3 Drittel ergeben die ganze Form.',nl:'3 gelijke delen! Elk deel is een derde: 3 derden zijn samen de hele vorm.',da:'3 lige store dele! Hver er en tredjedel: 3 tredjedele giver hele figuren.',sv:'3 lika stora delar! Varje del är en tredjedel: 3 tredjedelar blir hela figuren.',no:'3 like store deler! Hver er en tredjedel: 3 tredjedeler blir hele figuren.',es:'¡3 partes iguales! Cada una es un tercio: 3 tercios forman la figura entera.',it:'3 parti uguali! Ognuna è un terzo: 3 terzi fanno la figura intera.',pt:'3 partes iguais! Cada uma é um terço: 3 terços formam a figura inteira.',fr:'3 parts égales ! Chacune est un tiers : 3 tiers font la figure entière.',fi:'3 yhtä suurta osaa! Jokainen on kolmasosa: 3 kolmasosaa muodostavat koko kuvion.'},
    ok4:          {en:'4 equal parts! Each one is one fourth: 4 fourths make the whole shape.',de:'4 gleich große Teile! Jedes ist ein Viertel: 4 Viertel ergeben die ganze Form.',nl:'4 gelijke delen! Elk deel is een kwart: 4 kwarten zijn samen de hele vorm.',da:'4 lige store dele! Hver er en fjerdedel: 4 fjerdedele giver hele figuren.',sv:'4 lika stora delar! Varje del är en fjärdedel: 4 fjärdedelar blir hela figuren.',no:'4 like store deler! Hver er en fjerdedel: 4 fjerdedeler blir hele figuren.',es:'¡4 partes iguales! Cada una es un cuarto: 4 cuartos forman la figura entera.',it:'4 parti uguali! Ognuna è un quarto: 4 quarti fanno la figura intera.',pt:'4 partes iguais! Cada uma é um quarto: 4 quartos formam a figura inteira.',fr:'4 parts égales ! Chacune est un quart : 4 quarts font la figure entière.',fi:'4 yhtä suurta osaa! Jokainen on neljäsosa: 4 neljäsosaa muodostavat koko kuvion.'},
    okStep:       {en:'2 equal halves! Now make fourths from your halves.',de:'2 gleich große Hälften! Mach jetzt aus deinen Hälften Viertel.',nl:'2 gelijke helften! Maak nu kwarten van je helften.',da:'2 lige store halvdele! Lav nu fjerdedele af dine halvdele.',sv:'2 lika stora halvor! Gör nu fjärdedelar av dina halvor.',no:'2 like store halvdeler! Lag nå fjerdedeler av halvdelene dine.',es:'¡2 medios iguales! Ahora haz cuartos con tus medios.',it:'2 metà uguali! Ora fai dei quarti con le tue metà.',pt:'2 metades iguais! Agora faça quartos com as suas metades.',fr:'2 moitiés égales ! Maintenant, fais des quarts avec tes moitiés.',fi:'2 yhtä suurta puolikasta! Tee nyt puolikkaistasi neljäsosia.'},
    ok8:          {en:'2 halves, then 4 fourths: more parts, smaller parts!',de:'2 Hälften, dann 4 Viertel: mehr Teile, kleinere Teile!',nl:'2 helften, dan 4 kwarten: meer delen, kleinere delen!',da:'2 halvdele, så 4 fjerdedele: flere dele, mindre dele!',sv:'2 halvor, sedan 4 fjärdedelar: fler delar, mindre delar!',no:'2 halvdeler, så 4 fjerdedeler: flere deler, mindre deler!',es:'2 medios y luego 4 cuartos: ¡más partes, partes más pequeñas!',it:'2 metà, poi 4 quarti: più parti, parti più piccole!',pt:'2 metades e depois 4 quartos: mais partes, partes menores!',fr:'2 moitiés, puis 4 quarts : plus de parts, des parts plus petites !',fi:'2 puolikasta, sitten 4 neljäsosaa: enemmän osia, pienempiä osia!'},
    okShade:      {en:'{a}/{n}: {a} copies of the 1/{n} piece.',de:'{a}/{n}: {a} Kopien des 1/{n}-Teils.',nl:'{a}/{n}: {a} kopieën van het deel 1/{n}.',da:'{a}/{n}: {a} kopier af stykket 1/{n}.',sv:'{a}/{n}: {a} kopior av biten 1/{n}.',no:'{a}/{n}: {a} kopier av biten 1/{n}.',es:'{a}/{n}: {a} copias de la pieza de 1/{n}.',it:'{a}/{n}: {a} copie del pezzo da 1/{n}.',pt:'{a}/{n}: {a} cópias da peça de 1/{n}.',fr:'{a}/{n} : {a} copies du morceau de 1/{n}.',fi:'{a}/{n}: {a} kopiota 1/{n}-palasta.'},
    okShade1:     {en:'1/{n}: one copy of the 1/{n} piece.',de:'1/{n}: eine Kopie des 1/{n}-Teils.',nl:'1/{n}: één kopie van het deel 1/{n}.',da:'1/{n}: én kopi af stykket 1/{n}.',sv:'1/{n}: en kopia av biten 1/{n}.',no:'1/{n}: én kopi av biten 1/{n}.',es:'1/{n}: una copia de la pieza de 1/{n}.',it:'1/{n}: una copia del pezzo da 1/{n}.',pt:'1/{n}: uma cópia da peça de 1/{n}.',fr:'1/{n} : une copie du morceau de 1/{n}.',fi:'1/{n}: yksi kopio 1/{n}-palasta.'},
    okName1:      {en:'Yes: 1 of {n} equal parts is 1/{n}.',de:'Ja: 1 von {n} gleich großen Teilen ist 1/{n}.',nl:'Ja: 1 van de {n} gelijke delen is 1/{n}.',da:'Ja: 1 af {n} lige store dele er 1/{n}.',sv:'Ja: 1 av {n} lika stora delar är 1/{n}.',no:'Ja: 1 av {n} like store deler er 1/{n}.',es:'Sí: 1 de {n} partes iguales es 1/{n}.',it:'Sì: 1 su {n} parti uguali è 1/{n}.',pt:'Sim: 1 de {n} partes iguais é 1/{n}.',fr:'Oui : 1 part égale sur {n}, c’est 1/{n}.',fi:'Kyllä: 1 osa {n} yhtä suuresta osasta on 1/{n}.'},
    okName:       {en:'Yes: {a} of {n} equal parts is {a}/{n}.',de:'Ja: {a} von {n} gleich großen Teilen sind {a}/{n}.',nl:'Ja: {a} van de {n} gelijke delen is {a}/{n}.',da:'Ja: {a} af {n} lige store dele er {a}/{n}.',sv:'Ja: {a} av {n} lika stora delar är {a}/{n}.',no:'Ja: {a} av {n} like store deler er {a}/{n}.',es:'Sí: {a} de {n} partes iguales es {a}/{n}.',it:'Sì: {a} su {n} parti uguali è {a}/{n}.',pt:'Sim: {a} de {n} partes iguais é {a}/{n}.',fr:'Oui : {a} parts égales sur {n}, c’est {a}/{n}.',fi:'Kyllä: {a} osaa {n} yhtä suuresta osasta on {a}/{n}.'},
    okName8:      {en:'Yes: 2/4, and that is the same as 1/2!',de:'Ja: 2/4 – das ist dasselbe wie 1/2!',nl:'Ja: 2/4, en dat is hetzelfde als 1/2!',da:'Ja: 2/4, og det er det samme som 1/2!',sv:'Ja: 2/4, och det är samma sak som 1/2!',no:'Ja: 2/4, og det er det samme som 1/2!',es:'Sí: 2/4, ¡y eso es lo mismo que 1/2!',it:'Sì: 2/4, ed è lo stesso di 1/2!',pt:'Sim: 2/4, e isso é o mesmo que 1/2!',fr:'Oui : 2/4, et c’est la même chose que 1/2 !',fi:'Kyllä: 2/4, ja se on sama kuin 1/2!'},
    okTrap:       {en:'Not equal, well spotted! Here are real fourths. Now color the fraction on the card.',de:'Nicht gleich groß – gut erkannt! Hier sind echte Viertel. Färbe jetzt den Bruch auf der Karte.',nl:'Niet gelijk, goed gezien! Hier zijn echte kwarten. Kleur nu de breuk op de kaart.',da:'Ikke lige store, godt set! Her er rigtige fjerdedele. Farv nu brøken på kortet.',sv:'Inte lika stora, bra sett! Här är riktiga fjärdedelar. Färglägg nu bråket på kortet.',no:'Ikke like store, godt sett! Her er ekte fjerdedeler. Fargelegg nå brøken på kortet.',es:'¡No son iguales, bien visto! Aquí hay cuartos de verdad. Ahora colorea la fracción de la tarjeta.',it:'Non sono uguali, ben visto! Ecco dei veri quarti. Ora colora la frazione sul cartoncino.',pt:'Não são iguais, bem visto! Aqui estão quartos de verdade. Agora pinte a fração do cartão.',fr:'Pas égales, bien vu ! Voici de vrais quarts. Colorie maintenant la fraction de la carte.',fi:'Eivät ole yhtä suuret, hyvin huomattu! Tässä ovat oikeat neljäsosat. Väritä nyt kortin murtoluku.'},
    notEqual:     {en:'Not equal!',de:'Nicht gleich!',nl:'Niet gelijk!',da:'Ikke lige store!',sv:'Inte lika stora!',no:'Ikke like store!',es:'¡No son iguales!',it:'Non uguali!',pt:'Não são iguais!',fr:'Pas égales !',fi:'Eivät ole yhtä suuret!'},
    aNotEqual:    {en:'These pieces are not equal',de:'Diese Teile sind nicht gleich groß',nl:'Deze delen zijn niet gelijk',da:'Disse stykker er ikke lige store',sv:'De här bitarna är inte lika stora',no:'Disse bitene er ikke like store',es:'Estas piezas no son iguales',it:'Questi pezzi non sono uguali',pt:'Estas peças não são iguais',fr:'Ces morceaux ne sont pas égaux',fi:'Nämä palat eivät ole yhtä suuret'},
    aHalve:       {en:'Halve every piece again',de:'Jedes Teil noch einmal halbieren',nl:'Elk deel nog een keer halveren',da:'Halver hvert stykke igen',sv:'Halvera varje bit igen',no:'Halver hver bit igjen',es:'Partir cada pieza otra vez por la mitad',it:'Dividere ancora a metà ogni pezzo',pt:'Dividir cada peça ao meio de novo',fr:'Couper encore chaque morceau en deux',fi:'Puolita jokainen pala uudelleen'},
    aPad:         {en:'The stamp pad: tap to put the stamp back',de:'Das Stempelkissen: tippen, um den Stempel zurückzulegen',nl:'Het stempelkussen: tik om de stempel terug te leggen',da:'Stempelpuden: tryk for at lægge stemplet tilbage',sv:'Stämpeldynan: tryck för att lägga tillbaka stämpeln',no:'Stempelputen: trykk for å legge stempelet tilbake',es:'El cojín del sello: toca para dejar el sello',it:'Il tampone: tocca per rimettere giù il timbro',pt:'A almofada do carimbo: toque para guardar o carimbo',fr:'Le tampon encreur : touche pour reposer le tampon',fi:'Leimasintyyny: napauta laskeaksesi leimasimen'},
    aMat:         {en:'the shape, in {k} pieces',de:'die Form, in {k} Teilen',nl:'de vorm, in {k} delen',da:'figuren, i {k} stykker',sv:'figuren, i {k} bitar',no:'figuren, i {k} biter',es:'la figura, en {k} piezas',it:'la figura, in {k} pezzi',pt:'a figura, em {k} peças',fr:'la figure, en {k} morceaux',fi:'kuvio, {k} palana'},
    aPiece:       {en:'piece {i}',de:'Teil {i}',nl:'deel {i}',da:'stykke {i}',sv:'bit {i}',no:'bit {i}',es:'pieza {i}',it:'pezzo {i}',pt:'peça {i}',fr:'morceau {i}',fi:'pala {i}'},
    aCopy:        {en:'piece {i} is a copy',de:'Teil {i} ist eine Kopie',nl:'deel {i} is een kopie',da:'stykke {i} er en kopi',sv:'bit {i} är en kopia',no:'bit {i} er en kopi',es:'la pieza {i} es una copia',it:'il pezzo {i} è una copia',pt:'a peça {i} é uma cópia',fr:'le morceau {i} est une copie',fi:'pala {i} on kopio'},
    aBigger:      {en:'the stamp hangs over piece {i}: it is smaller',de:'der Stempel ragt über Teil {i} hinaus: es ist kleiner',nl:'de stempel steekt uit over deel {i}: het is kleiner',da:'stemplet stikker ud over stykke {i}: det er mindre',sv:'stämpeln sticker ut över bit {i}: den är mindre',no:'stempelet stikker ut over bit {i}: den er mindre',es:'el sello sobresale de la pieza {i}: es más pequeña',it:'il timbro sporge dal pezzo {i}: è più piccolo',pt:'o carimbo passa da peça {i}: ela é menor',fr:'le tampon dépasse du morceau {i} : il est plus petit',fi:'leimasin menee palan {i} yli: pala on pienempi'},
    aSmaller:     {en:'the stamp leaves a gap on piece {i}: it is bigger',de:'der Stempel lässt auf Teil {i} eine Lücke: es ist größer',nl:'de stempel laat een gat op deel {i}: het is groter',da:'stemplet efterlader et hul på stykke {i}: det er større',sv:'stämpeln lämnar en lucka på bit {i}: den är större',no:'stempelet etterlater et hull på bit {i}: den er større',es:'el sello deja un hueco en la pieza {i}: es más grande',it:'il timbro lascia un vuoto sul pezzo {i}: è più grande',pt:'o carimbo deixa um vão na peça {i}: ela é maior',fr:'le tampon laisse un vide sur le morceau {i} : il est plus grand',fi:'leimasin jättää palaan {i} aukon: pala on suurempi'},
    aUp:          {en:'{which}: one more',de:'{which}: eins mehr',nl:'{which}: één meer',da:'{which}: én mere',sv:'{which}: ett till',no:'{which}: én til',es:'{which}: uno más',it:'{which}: uno in più',pt:'{which}: um a mais',fr:'{which} : un de plus',fi:'{which}: yksi lisää'},
    aDown:        {en:'{which}: one less',de:'{which}: eins weniger',nl:'{which}: één minder',da:'{which}: én mindre',sv:'{which}: ett mindre',no:'{which}: én mindre',es:'{which}: uno menos',it:'{which}: uno in meno',pt:'{which}: um a menos',fr:'{which} : un de moins',fi:'{which}: yksi vähemmän'},
    aNum:         {en:'top number',de:'obere Zahl',nl:'bovenste getal',da:'øverste tal',sv:'översta talet',no:'øverste tall',es:'número de arriba',it:'numero in alto',pt:'número de cima',fr:'nombre du haut',fi:'ylempi luku'},
    aDen:         {en:'bottom number',de:'untere Zahl',nl:'onderste getal',da:'nederste tal',sv:'nedersta talet',no:'nederste tall',es:'número de abajo',it:'numero in basso',pt:'número de baixo',fr:'nombre du bas',fi:'alempi luku'},
    setLevel:     {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvHF:         {en:'Halves and fourths',de:'Hälften und Viertel',nl:'Helften en kwarten',da:'Halvdele og fjerdedele',sv:'Halvor och fjärdedelar',no:'Halvdeler og fjerdedeler',es:'Medios y cuartos',it:'Metà e quarti',pt:'Metades e quartos',fr:'Moitiés et quarts',fi:'Puolikkaat ja neljäsosat'},
    lvThirds:     {en:'Thirds',de:'Drittel',nl:'Derden',da:'Tredjedele',sv:'Tredjedelar',no:'Tredjedeler',es:'Tercios',it:'Terzi',pt:'Terços',fr:'Tiers',fi:'Kolmasosat'},
    lvName:       {en:'Shade and name',de:'Färben und benennen',nl:'Kleuren en benoemen',da:'Farv og navngiv',sv:'Färglägg och namnge',no:'Fargelegg og navngi',es:'Colorea y nombra',it:'Colora e dai un nome',pt:'Pinte e dê nome',fr:'Colorier et nommer',fi:'Väritä ja nimeä'},
    setMarks:     {en:'Ruler marks',de:'Linealmarken',nl:'Liniaalstreepjes',da:'Linealmærker',sv:'Linjalmärken',no:'Linjalmerker',es:'Marcas de regla',it:'Tacche del righello',pt:'Marcas de régua',fr:'Repères de règle',fi:'Viivainmerkit'},
    mOff:         {en:'Off',de:'Aus',nl:'Uit',da:'Fra',sv:'Av',no:'Av',es:'Apagadas',it:'No',pt:'Desligadas',fr:'Non',fi:'Pois päältä'},
    mOn:          {en:'On',de:'An',nl:'Aan',da:'Til',sv:'På',no:'På',es:'Encendidas',it:'Sì',pt:'Ligadas',fr:'Oui',fi:'Päällä'},
    setStamp:     {en:'The stamp',de:'Der Stempel',nl:'De stempel',da:'Stemplet',sv:'Stämpeln',no:'Stempelet',es:'El sello',it:'Il timbro',pt:'O carimbo',fr:'Le tampon',fi:'Leimasin'},
    sHand:        {en:'I test',de:'Ich prüfe',nl:'Ik controleer',da:'Jeg tjekker',sv:'Jag kontrollerar',no:'Jeg sjekker',es:'Yo compruebo',it:'Controllo io',pt:'Eu confiro',fr:'Je vérifie',fi:'Minä tarkistan'},
    sAuto:        {en:'It tests at Check',de:'Er prüft bei „Prüfen“',nl:'Hij controleert bij Controleer',da:'Det tjekker ved Tjek',sv:'Den kontrollerar vid Kontrollera',no:'Det sjekker ved Sjekk',es:'Comprueba al pulsar Comprobar',it:'Controlla da solo con Controlla',pt:'Ele confere ao tocar em Verificar',fr:'Il vérifie avec Vérifier',fi:'Se tarkistaa, kun painat Tarkista'}
  },/*STRINGS-END*/

  defaults: { level: 'hf', marks: 'off', stamp: 'hand' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'hf', labelKey: 'lvHF' }, { value: 'thirds', labelKey: 'lvThirds' }, { value: 'name', labelKey: 'lvName' }] },
    { key: 'marks', type: 'choice', labelKey: 'setMarks', options: [{ value: 'off', labelKey: 'mOff' }, { value: 'on', labelKey: 'mOn' }] },
    { key: 'stamp', type: 'choice', labelKey: 'setStamp', options: [{ value: 'hand', labelKey: 'sHand' }, { value: 'auto', labelKey: 'sAuto' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._shelf = [];
    injectOnePieceStampCSS();
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
  _loc: function () { return OnePieceStampCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return OnePieceStampCore.levelOf(this._setting('level')); },
  _key: function () { return this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = OnePieceStampCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = OnePieceStampCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      var P = C.plan(this._level(), Math.random, prevIds);
      this._order = P.order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var r = pool[this._order[at]], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'onepiecestamp.' + this._loc() + '.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function () {
    var st = this.st; if (!st) return '';
    if (st.kind === 'name') return this._t('tName');
    if (st.kind === 'trap') return this._t('tTrap');
    if (st.kind === 'shade') return this._t('tShade');
    if (st.step === 2) return this._t('tStep2');
    return this._t({ 2: 'tCut2', 3: 'tCut3', 4: 'tCut4' }[st.n]);
  },
  _setPrompt: function () { var line = this._promptText(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._endDrag(); this._at = at || 0;
    this.st = OnePieceStampCore.newState(this._level(), r);
    this._resetView(); this._setPrompt();
  },
  _resetView: function () { this._view = { note: '', ok: '', test: null, stampRes: null, ghost: false, pulse: false, sel: null, labels: false, countShow: false, walk: -1, kb: null }; },
  /* a new move takes the help away until the next Check */
  _clearHelp: function () { var v = this._view; v.note = ''; v.test = null; v.stampRes = null; v.ghost = false; v.pulse = false; v.countShow = false; },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._pool[0], 0); this._render2(); this._watchWidth(); },
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
    var wrap = api.el('div', 'ops-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ops-shelf" aria-hidden="true"></div><div class="ops-work"><div class="ops-matbox"></div><div class="ops-dock"></div></div><div class="ops-foot"></div><p class="ops-note" aria-live="polite"></p><p class="ops-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
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
  /* the mat beside the dock from 560 px; on a phone the dock is a strip under the mat */
  _dims: function () {
    var C = OnePieceStampCore, w = Math.min(this._width(), 700), B = C.band(this._width());
    var mat = B.wide ? Math.min(430, w - 214) : Math.min(w, 380) - (B.tiny && this.st ? (this.st.kind === 'name' ? 20 : this.st.kind === 'trap' ? 36 : 0) : 0);   /* the wheels, or the Not-equal button, need the room on a 320 phone */
    return { w: w, wide: B.wide, tiny: B.tiny, mat: mat, s: mat / 100 };
  },

  /* ---- drawing helpers ---- */
  _path: function (poly, dx, dy) { dx = dx || 0; dy = dy || 0; return 'M' + poly.map(function (p) { return f2(p[0] + dx) + ' ' + f2(p[1] + dy); }).join('L') + 'Z'; },
  _frac: function (x, y, a, n, sz, cls) { var h = sz * 0.62; return '<g class="' + (cls || 'ops-frac') + '" transform="translate(' + f2(x) + ' ' + f2(y) + ')"><text y="' + f2(-h * 0.18) + '" text-anchor="middle" font-size="' + f2(sz) + '">' + a + '</text><line x1="' + f2(-h * 0.55) + '" y1="' + f2(h * 0.12) + '" x2="' + f2(h * 0.55) + '" y2="' + f2(h * 0.12) + '" stroke-width="' + f2(sz * 0.09) + '"/><text y="' + f2(h * 1.12) + '" text-anchor="middle" font-size="' + f2(sz) + '">' + n + '</text></g>'; },
  /* each piece drifts a hair away from the middle, so a cut reads as a split */
  _drift: function (p) { var st = this.st; if (st.pieces.length < 2) return [0, 0]; var c = OnePieceStampCore.centroid(OnePieceStampCore.DATA.SHAPES[st.shape]), dx = p.cx - c[0], dy = p.cy - c[1], l = Math.hypot(dx, dy) || 1; return [dx / l * 0.7, dy / l * 0.7]; },
  /* the snap points the child can start a cut from (with the ruler marks: the half / third / fourth points) */
  _anchors: function () {
    var C = OnePieceStampCore, st = this.st, M = C.menu(st.shape, st.mode), map = {}, out = [];
    M.forEach(function (c) { [c.a, c.b].forEach(function (p) { if (st.mode === 'spoke' && p === c.a) return; var k = Math.round(p[0] * 100) + ',' + Math.round(p[1] * 100); if (!map[k]) { map[k] = { p: p, cuts: [] }; out.push(map[k]); } map[k].cuts.push(c); }); });
    if (st.mode === 'spoke') { var c0 = C.DATA.CENTRE[st.shape]; out.push({ p: c0, cuts: M, pin: true }); }
    return out;
  },
  _marked: function (p) {
    /* a ruler mark: a point at 1/2, 1/3 or 1/4 (or 2/3, 3/4) of its edge, a corner, or a circle peg every 30° */
    var C = OnePieceStampCore, st = this.st, P = C.DATA.SHAPES[st.shape];
    if (st.shape === 'circle' || st.shape === 'ellipse') { var a = Math.round(Math.atan2((p[1] - 50) / (st.shape === 'ellipse' ? 30 : 46), (p[0] - 50) / 46) * 180 / Math.PI); if (st.shape === 'circle') return ((a % 30) + 30) % 30 === 0; }
    var pts = [];
    if (st.shape === 'ellipse') { [6, 8, 12, 16, 18].forEach(function (k) { pts.push(4 + 92 * k / 24); pts.push(20 + 60 * k / 24); }); return pts.some(function (v) { return Math.abs(p[0] - v) < 0.05 || Math.abs(p[1] - v) < 0.05; }); }
    for (var i = 0; i < P.length; i++) { var A = P[i], B = P[(i + 1) % P.length]; [0, 6, 8, 12, 16, 18].forEach(function (k) { pts.push([A[0] + (B[0] - A[0]) * k / 24, A[1] + (B[1] - A[1]) * k / 24]); }); }
    return pts.some(function (q) { return Math.abs(q[0] - p[0]) < 0.05 && Math.abs(q[1] - p[1]) < 0.05; });
  },
  _matSvg: function (D) {
    var C = OnePieceStampCore, st = this.st, v = this._view, self = this, s = D.s, out = '';
    var dot = Math.max(0.9, 3.2 / s), sw = Math.max(0.55, 2.4 / s);
    out += '<defs><pattern id="ops-stripe" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2.4" height="2.4" fill="#FFF3E6"/><line x1="0" y1="0" x2="0" y2="2.4" stroke="#E0503C" stroke-width="1"/></pattern></defs>';
    out += '<rect class="ops-matbg" x="0" y="0" width="100" height="100" rx="3" fill="#3E8E6A"/>';
    for (var g = 10; g < 100; g += 10) out += '<line x1="' + g + '" y1="1" x2="' + g + '" y2="99" stroke="#57A784" stroke-width="0.25"/><line x1="1" y1="' + g + '" x2="99" y2="' + g + '" stroke="#57A784" stroke-width="0.25"/>';
    var test = v.test, sr = v.stampRes, labels = st.done && v.labels;
    st.pieces.forEach(function (p, i) {
      var d = self._drift(p), tok = st.tokens[i], shaded = st.kind === 'name' && st.shaded.indexOf(i) >= 0, coloured = st.kind === 'shade' ? tok != null : (tok != null && i !== st.held && !st.done);
      var fill = shaded ? '#2BA392' : (st.done && st.kind !== 'name' && st.kind !== 'shade') ? '#9FD9CC' : coloured ? '#9FD9CC' : '#FBE7C6';
      var mark = (test && test.cur === i) || (sr && sr.j === i && sr.result !== 'copy');
      out += '<path class="ops-piece' + (i === st.held ? ' is-src' : '') + (mark ? ' is-gap' : '') + '" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(self._t('aPiece', { i: i + 1 })) + '" d="' + self._path(p.poly, d[0], d[1]) + '" fill="' + (mark ? 'url(#ops-stripe)' : fill) + '" stroke="#3A2E1F" stroke-width="' + f2(sw) + '" stroke-linejoin="round"' + (i === st.held ? ' stroke-dasharray="' + f2(sw * 2.4) + ' ' + f2(sw * 1.6) + '"' : '') + '/>';
    });
    /* the stamp lying where it does not fit: the overhang coral, the part that does fit glass */
    var showFit = function (j, f) { var d = self._drift(st.pieces[j]); out += '<path class="ops-over" d="' + self._path(f.poly, d[0], d[1]) + '" fill="#E0503C" fill-opacity="0.75" stroke="#B5371F" stroke-width="' + f2(sw * 0.8) + '"/>'; if (f.inter && f.inter.length > 2) out += '<path d="' + self._path(f.inter, d[0], d[1]) + '" fill="#E6F4F1" fill-opacity="0.9" stroke="#146B5E" stroke-width="' + f2(sw * 0.6) + '"/>'; };
    /* the test stamp visits one piece at a time (miss 1 cycles through the pieces it does not fit); the biggest piece, its source, dashed */
    if (test && test.cur != null && test.res[test.cur].fit) showFit(test.cur, test.res[test.cur].fit);
    if (test && test.source != null) { var sp = st.pieces[test.source], dd = self._drift(sp); out += '<path class="ops-srcline" d="' + self._path(sp.poly, dd[0], dd[1]) + '" fill="none" stroke="#146B5E" stroke-width="' + f2(sw * 1.4) + '" stroke-dasharray="' + f2(sw * 2.4) + ' ' + f2(sw * 1.6) + '"/>'; }
    if (sr && sr.result !== 'copy' && sr.fit) showFit(sr.j, sr.fit);
    /* cuts: ink lines; a lone spoke is dashed (it splits nothing yet) */
    var cuts = st.halved || st.cuts, spokes = cuts.filter(function (c) { return c.kind === 'spoke'; }).length;
    cuts.forEach(function (c, i) { out += '<line class="ops-cut' + (i < st.locked ? ' is-locked' : '') + '" x1="' + f2(c.a[0]) + '" y1="' + f2(c.a[1]) + '" x2="' + f2(c.b[0]) + '" y2="' + f2(c.b[1]) + '" stroke="#1F1A12" stroke-width="' + f2(sw * 1.1) + '" stroke-linecap="round"' + (c.kind === 'spoke' && spokes < 2 ? ' stroke-dasharray="' + f2(sw * 2.5) + ' ' + f2(sw * 1.5) + '"' : '') + '/>'; });
    /* snap points (and the ruler marks), the centre pin, the selected anchor's partners, the gold dots of miss 2 */
    if (!st.preset && !st.done && !st.halved) {
      var marks = this._setting('marks') === 'on', sel = v.sel;
      this._anchors().forEach(function (A) {
        if (A.pin) { out += '<circle class="ops-pin" cx="' + f2(A.p[0]) + '" cy="' + f2(A.p[1]) + '" r="' + f2(Math.max(2.4, 9 / s)) + '" fill="#C9A54E" stroke="#3A2E1F" stroke-width="' + f2(sw * 0.7) + '"/>'; return; }
        var m = marks && self._marked(A.p);
        out += '<circle class="ops-snap' + (m ? ' is-mark' : '') + (v.pulse ? ' is-pulse' : '') + '" cx="' + f2(A.p[0]) + '" cy="' + f2(A.p[1]) + '" r="' + f2(m ? dot * 1.6 : dot * 0.75) + '"/>';
      });
      if (sel) sel.cuts.forEach(function (c) { var q = (Math.abs(c.a[0] - sel.p[0]) < 1e-6 && Math.abs(c.a[1] - sel.p[1]) < 1e-6) ? c.b : c.a; out += '<circle class="ops-partner" cx="' + f2(q[0]) + '" cy="' + f2(q[1]) + '" r="' + f2(dot * 1.4) + '"/>'; });
      if (sel) out += '<circle class="ops-selanchor" cx="' + f2(sel.p[0]) + '" cy="' + f2(sel.p[1]) + '" r="' + f2(dot * 2) + '"/>';
      if (v.ghost) C.ghost(st).forEach(function (p) { out += '<circle class="ops-ghost" cx="' + f2(p[0]) + '" cy="' + f2(p[1]) + '" r="' + f2(dot * 2.2) + '"/>'; });
      if (v.preview) out += '<line class="ops-preview" x1="' + f2(v.preview.a[0]) + '" y1="' + f2(v.preview.a[1]) + '" x2="' + f2(v.preview.b[0]) + '" y2="' + f2(v.preview.b[1]) + '" stroke-width="' + f2(sw) + '"/>';
    }
    /* tokens (the copy count), or after success the fraction on every piece */
    st.pieces.forEach(function (p, i) {
      var d = self._drift(p), x = p.cx + d[0], y = p.cy + d[1], r = Math.max(3.4, 13 / s);
      if (labels) { var dn = st.pieces.length, nm = 1; out += self._frac(x, y - r * 0.2, nm, dn, Math.max(4.6, 15 / s), 'ops-frac ops-plabel'); return; }
      var t = st.tokens[i];
      if (st.kind === 'name' && st.show >= 2) { var sh = st.shaded.indexOf(i) >= 0, order = sh ? st.shaded.indexOf(i) + 1 : st.a + st.pieces.map(function (_, z) { return z; }).filter(function (z) { return st.shaded.indexOf(z) < 0; }).indexOf(i) + 1; out += '<g class="ops-token' + (sh ? '' : ' is-grey') + '"><circle cx="' + f2(x) + '" cy="' + f2(y) + '" r="' + f2(r) + '"/><text x="' + f2(x) + '" y="' + f2(y + r * 0.38) + '" text-anchor="middle" font-size="' + f2(r * 1.15) + '">' + order + '</text></g>'; return; }
      if (t != null) out += '<g class="ops-token"><circle cx="' + f2(x) + '" cy="' + f2(y) + '" r="' + f2(r) + '"/><text x="' + f2(x) + '" y="' + f2(y + r * 0.38) + '" text-anchor="middle" font-size="' + f2(r * 1.15) + '">' + t + '</text></g>';
    });
    /* the glass stamp in the hand */
    if (this._drag && this._drag.stamp && this._drag.at && st.held != null) { var H = st.pieces[st.held], dx = this._drag.at[0] - H.cx, dy = this._drag.at[1] - H.cy; out += '<path class="ops-glass" d="' + this._path(H.poly, dx, dy) + '"/>'; }
    return out;
  },
  _dockHtml: function (D) {
    var st = this.st, v = this._view, self = this, n = st.pieces.length && st.kind !== 'cut' ? st.n : st.n, out = '';
    var made = Object.keys(st.tokens).length;
    /* the copy counter: one slot per asked part (a name round has none: its numbers are on the wheels) */
    if (st.kind === 'name') return '<div class="ops-tokens" aria-hidden="true"></div>';
    out += '<div class="ops-tokens" aria-hidden="true">';
    var slots = st.kind === 'name' ? st.n : (st.halved ? st.pieces.length : st.n);
    for (var i = 1; i <= slots; i++) out += '<span class="ops-tok' + (i <= made ? ' is-on' : '') + '">' + (i <= made ? i : '') + '</span>';
    out += '</div>';
    return out;
  },
  _paint_: function () {
    var C = OnePieceStampCore, st = this.st, D = this._dims(), v = this._view, self = this;
    this._wrap.className = 'ops-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + st.level;
    /* the shelf of finished shapes */
    var shelf = this._qs('.ops-shelf'), sh = '';
    this._shelf.slice(-8).forEach(function (m) { sh += '<svg class="ops-mini" viewBox="0 0 100 100" width="34" height="34">' + C.piecesOf(m.shape, m.cuts).map(function (p) { return '<path d="' + self._path(p.poly) + '" fill="#9FD9CC" stroke="#3A2E1F" stroke-width="3"/>'; }).join('') + '</svg>'; });
    shelf.innerHTML = sh;
    /* the mat */
    var mb = this._qs('.ops-matbox'); mb.style.width = D.mat + 'px';
    mb.innerHTML = '<svg class="ops-mat" data-k="mat" viewBox="0 0 100 100" width="' + D.mat + '" height="' + D.mat + '" role="group" aria-label="' + esc(this._t('aMat', { k: st.pieces.length })) + '">' + this._matSvg(D) + '</svg>';
    this._wireMat(mb.querySelector('svg'));
    /* the dock: the ink pad, the copy counter, the fraction card / wheels, the trap button, halve again */
    var dock = this._qs('.ops-dock'); dock.innerHTML = '';
    var pad = this._btn('ops-pad' + (st.held != null ? ' is-held' : ''), 'pad', this._t('aPad'), this._padSvg());
    pad.addEventListener('click', function () { if (st.held != null) { OnePieceStampCore.putBack(st); self._afterMove(); } });
    dock.appendChild(pad);
    var tk = document.createElement('div'); tk.innerHTML = this._dockHtml(D); dock.appendChild(tk.firstChild);
    var card = document.createElement('div'); card.className = 'ops-card'; dock.appendChild(card);
    if (st.kind === 'name') {
      card.className += ' is-wheels';
      [0, 1].forEach(function (w) {
        var col = document.createElement('div'); col.className = 'ops-wheel';
        var up = self._btn('ops-wbtn', 'up-' + w, self._t('aUp', { which: self._t(w ? 'aDen' : 'aNum') }), '▲'), dn = self._btn('ops-wbtn', 'down-' + w, self._t('aDown', { which: self._t(w ? 'aDen' : 'aNum') }), '▼');
        up.disabled = st.done || st.wheels[w] >= 8; dn.disabled = st.done || st.wheels[w] <= 1;
        up.addEventListener('click', function () { OnePieceStampCore.setWheel(st, w, 1); self._clearHelp(); self._paint(); });
        dn.addEventListener('click', function () { OnePieceStampCore.setWheel(st, w, -1); self._clearHelp(); self._paint(); });
        var num = document.createElement('span'); num.className = 'ops-wnum'; num.textContent = st.wheels[w];
        col.appendChild(dn); col.appendChild(num); col.appendChild(up); card.appendChild(col);
        if (!w) { var bar = document.createElement('span'); bar.className = 'ops-wbar'; card.appendChild(bar); }
      });
    } else {
      var a = null, nn = null;
      if (st.kind === 'shade' || st.kind === 'trap') { a = st.a; nn = st.n; }
      else if (st.done) { a = 1; nn = st.pieces.length; }
      var sv = '<svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">';
      if (a != null) sv += this._frac(30, 26, a, nn, 22, 'ops-frac ops-cardfrac');
      else if (v.countShow) sv += '<text x="17" y="38" text-anchor="middle" class="ops-countk">' + st.pieces.length + '</text><text x="43" y="38" text-anchor="middle" class="ops-countn">' + st.n + '</text>';
      card.innerHTML = sv + '</svg>';
    }
    if (st.kind === 'trap') { var ne = this._btn('ops-noteq', 'noteq', this._t('aNotEqual'), '<svg viewBox="0 0 40 24" width="40" height="24" aria-hidden="true"><line x1="6" y1="8" x2="34" y2="8"/><line x1="6" y1="16" x2="34" y2="16"/><line x1="12" y1="22" x2="28" y2="2"/></svg><span>' + esc(this._t('notEqual')) + '</span>'); ne.addEventListener('click', function () { self._notEqual(); }); dock.appendChild(ne); }
    if (st.done && C.doubling(st)) { var hv = this._btn('ops-halve' + (st.halved ? ' is-on' : ''), 'halve', this._t('aHalve'), '<svg viewBox="0 0 40 24" width="40" height="24" aria-hidden="true"><circle cx="8" cy="7" r="4"/><circle cx="8" cy="17" r="4"/><line x1="11" y1="9" x2="22" y2="16"/><line x1="11" y1="15" x2="22" y2="8"/><text x="31" y="17" text-anchor="middle">×2</text></svg>'); hv.addEventListener('click', function () { OnePieceStampCore.halve(st); self._view.labels = true; self._paint(); }); dock.appendChild(hv); }
    var foot = this._qs('.ops-foot'); foot.innerHTML = '';
    var chk = this._btn('ops-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.ops-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'ops-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ops-note is-hint'; }
    else { note.textContent = ''; note.className = 'ops-note'; }
  },
  _padSvg: function () {
    var st = this.st, out = '<svg viewBox="0 0 60 44" width="60" height="44" aria-hidden="true"><rect x="4" y="22" width="52" height="18" rx="5" fill="#4A3B68"/><rect x="8" y="24" width="44" height="10" rx="3" fill="#6D5A96"/>';
    if (st.held != null) { var P = st.pieces[st.held], b = bbox(P.poly), k = 24 / Math.max(b[2] - b[0], b[3] - b[1]); out += '<path d="M' + P.poly.map(function (p) { return f2(30 + (p[0] - (b[0] + b[2]) / 2) * k) + ' ' + f2(12 + (p[1] - (b[1] + b[3]) / 2) * k); }).join('L') + 'Z" fill="#E6F4F1" fill-opacity="0.8" stroke="#146B5E" stroke-width="1.4"/>'; }
    else if (this._setting('stamp') === 'auto') out += '<path class="ops-play" d="M24 4 L38 12 L24 20 Z" fill="#146B5E"/>';
    else out += '<circle cx="30" cy="12" r="6" fill="none" stroke="#8C7A5B" stroke-width="1.6" stroke-dasharray="2 2"/>';
    return out + '</svg>';
  },

  /* ---------------- the hand ---------------- */
  _svgPt: function (svg, e) { var r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 100, (e.clientY - r.top) / r.height * 100]; },
  _nearAnchor: function (p, R) { var best = null, bd = R; this._anchors().forEach(function (A) { var d = Math.hypot(A.p[0] - p[0], A.p[1] - p[1]); if (d < bd) { bd = d; best = A; } }); return best; },
  _partnerOf: function (A, p) { var best = null, bd = Infinity; A.cuts.forEach(function (c) { var q = (Math.abs(c.a[0] - A.p[0]) < 1e-6 && Math.abs(c.a[1] - A.p[1]) < 1e-6) ? c.b : c.a, d = Math.hypot(q[0] - p[0], q[1] - p[1]); if (d < bd) { bd = d; best = { cut: c, q: q, d: d }; } }); return best; },
  _pieceAt: function (p) { var st = this.st; for (var i = 0; i < st.pieces.length; i++) if (inPoly(p, st.pieces[i].poly)) return i; return -1; },
  _cutAt: function (p, R) { var st = this.st, cuts = st.cuts, best = null, bd = R; cuts.forEach(function (c) { var d = segDist(p, c.a, c.b); if (d < bd) { bd = d; best = c; } }); return best; },
  _wireMat: function (svg) {
    var self = this;
    svg.addEventListener('pointerdown', function (e) { self._down(e, svg); });
    svg.querySelectorAll('.ops-piece').forEach(function (el) { el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self._tapPiece(+el.getAttribute('data-i')); } }); });
    svg.setAttribute('tabindex', '0');
    svg.addEventListener('keydown', function (e) { if (e.target === svg) self._onKey(e); });
  },
  _down: function (e, svg) {
    if (e.button != null && e.button !== 0) return;
    var self = this, st = this.st, v = this._view, D = this._dims(), p0 = this._svgPt(svg, e), R = 24 / D.s, x0 = e.clientX, y0 = e.clientY;
    var canCut = !st.preset && !st.done && !st.halved;
    var A = canCut ? this._nearAnchor(p0, R) : null, cutHit = canCut && !A ? this._cutAt(p0, 9 / D.s) : null, piece = (!A && !cutHit) ? this._pieceAt(p0) : -1;
    /* a tap on a partner of the chosen anchor finishes a tap-tap cut */
    if (canCut && v.sel) { var pt = this._partnerOf(v.sel, p0); if (pt && pt.d < R) { e.preventDefault(); var sel = v.sel; v.sel = null; this._commitCut(pt.cut); return; } }
    if (!A && !cutHit && piece < 0) { if (v.sel) { v.sel = null; this._paint(); } return; }
    e.preventDefault();
    var drag = { moved: false, stamp: false, at: null };
    var move = function (ev) {
      if (!drag.moved && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 8) return;
      drag.moved = true; self._drag = drag;
      var q = self._svgPt(svg, ev);
      if (A) { var pt = self._partnerOf(A, q); v.sel = A; v.preview = pt ? { a: A.p, b: pt.q, cut: pt.cut } : null; }
      else if (piece >= 0) { if (!drag.stamp) { drag.stamp = true; /* dragging a piece that is already a copy carries the stamp in hand; any other piece gives a new stamp */
          if (st.held !== piece && !(st.held != null && st.tokens[piece] != null)) OnePieceStampCore.lift(st, piece); self._clearHelp(); } drag.at = q; }
      self._repaintMat();
    };
    var up = function (ev) {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      var q = self._svgPt(svg, ev); self._drag = null;
      if (!drag.moved) {
        if (A) { v.sel = (v.sel === A) ? null : A; v.preview = null; self._paint(); return; }
        if (cutHit) { self._removeCut(cutHit.id); return; }
        if (piece >= 0) self._tapPiece(piece);
        return;
      }
      if (A) { var pv = v.preview; v.preview = null; v.sel = null; if (pv) self._commitCut(pv.cut); else self._paint(); return; }
      if (drag.stamp) { var j = self._pieceAt(q); if (j >= 0 && j !== st.held) self._stampOn(j); else self._paint(); }
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  },
  _repaintMat: function () { var D = this._dims(), mb = this._qs('.ops-matbox'), svg = mb && mb.querySelector('svg'); if (svg) svg.innerHTML = this._matSvg(D); },
  _endDrag: function () { this._drag = null; },
  _commitCut: function (cut) {
    var st = this.st, r = OnePieceStampCore.addCut(st, cut);
    this._clearHelp();
    if (r === 'limit') { this._view.note = this._t('hintLimit'); this.api.sound(200); }
    else if (r === 'added') { this.api.sound(520); this._sr(this._t('aMat', { k: st.pieces.length })); }
    this._paint();
  },
  _removeCut: function (id) { var r = OnePieceStampCore.removeCut(this.st, id); this._clearHelp(); if (r === 'removed') this.api.sound(300); this._paint(); },
  _tapPiece: function (i) {
    var C = OnePieceStampCore, st = this.st; if (st.pieces.length < 2) { this._clearHelp(); this._view.note = this._t('hintEmpty'); this._paint(); return; }
    this._clearHelp();
    if (st.kind === 'shade' && st.tokens[i] != null && i !== st.held) { C.uncolour(st, i); this.api.sound(300); this._paint(); return; }
    if (st.held == null) { C.lift(st, i); this.api.sound(440); this._paint(); return; }
    if (st.held === i) { C.putBack(st); this._paint(); return; }
    this._stampOn(i);
  },
  _stampOn: function (j) {
    var C = OnePieceStampCore, st = this.st, self = this, r = C.stampOn(st, j);
    this._clearHelp();
    if (r.result === 'copy') { this.api.sound(760); this._sr(this._t('aCopy', { i: j + 1 })); }
    else if (r.result !== 'no') {
      this.api.sound(220); this._sr(this._t(r.result === 'bigger' ? 'aBigger' : 'aSmaller', { i: j + 1 }));
      this._view.stampRes = { j: j, result: r.result, fit: r.fit };
      if (!this.FAST) this._later(function () { if (self._view.stampRes && self._view.stampRes.j === j) { self._view.stampRes = null; self._paint(); } }, 1200);
    }
    this._paint();
  },
  _afterMove: function () { this._clearHelp(); this._paint(); },
  _notEqual: function () {
    var r = OnePieceStampCore.notEqual(this.st);
    this._clearHelp();
    if (r === 'revealed') { this.api.sound(660); this._view.note = this._t('okTrap'); this._setPrompt(); }
    this._paint();
  },
  /* the keyboard: arrows walk the snap points (then the chosen point's partners), Enter cuts, Delete takes the last cut away */
  _onKey: function (e) {
    var st = this.st, v = this._view; if (st.preset || st.done || st.halved) return;
    var A = this._anchors(), k = e.key;
    if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); if (st.cuts.length > st.locked) this._removeCut(st.cuts[st.cuts.length - 1].id); return; }
    if (k === 'Escape') { v.kb = null; v.sel = null; v.preview = null; this._paint(); return; }
    if (k !== 'ArrowRight' && k !== 'ArrowLeft' && k !== 'Enter') return;
    e.preventDefault();
    var kb = v.kb || (v.kb = { stage: 0, i: -1, j: -1 }), d = k === 'ArrowRight' ? 1 : k === 'ArrowLeft' ? -1 : 0;
    if (kb.stage === 0) {
      if (d) { kb.i = (kb.i + d + A.length) % A.length; v.sel = A[kb.i]; }
      else if (v.sel) { kb.stage = 1; kb.j = 0; }
    } else {
      var cuts = v.sel.cuts;
      if (d) kb.j = (kb.j + d + cuts.length) % cuts.length;
      else { var c = cuts[kb.j]; v.kb = null; v.sel = null; v.preview = null; this._commitCut(c); return; }
    }
    if (kb.stage === 1) { var cc = v.sel.cuts[kb.j], q = (Math.abs(cc.a[0] - v.sel.p[0]) < 1e-6 && Math.abs(cc.a[1] - v.sel.p[1]) < 1e-6) ? cc.b : cc.a; v.preview = { a: v.sel.p, b: q, cut: cc }; }
    this._paint();
  },

  /* ---------------- Check ---------------- */
  _sr: function (s) { var el = this._qs('.ops-sr'); if (el) el.textContent = s; },
  _check: function () {
    var C = OnePieceStampCore, st = this.st, v = this._view, self = this;
    if (st.done) return;
    v.sel = null; v.preview = null;
    var a = C.check(st);
    if (a.result === 'tray') { this.api.sound(200); this._clearHelp(); v.note = this._t(C.hint(st).key); v.pulse = true; this._paint(); this.api.announce(v.note); return; }
    if (a.result === 'step') { this.api.sound(780); this._clearHelp(); v.note = this._t('okStep'); this._setPrompt(); this._paint(); this.api.announce(v.note); return; }
    var walk = this._setting('stamp') === 'auto' && !this.FAST && st.kind === 'cut' && st.pieces.length > 1;
    var finish = function () {
      if (a.result === 'ok') { self._success(); return; }
      self.api.sound(220);
      self._clearHelp();
      v.note = self._t(C.hint(st).key);
      if (st.kind === 'cut' && st.pieces.length > 1) self._showTest(C.autoTest(st));
      if (a.kind === 'count') v.countShow = true;
      if (st.show >= 2) v.ghost = true;
      self._paint(); self.api.announce(v.note);
    };
    if (walk) { var T2 = C.autoTest(st), i = 0, order = T2.res.map(function (_, z) { return z; }).filter(function (z) { return z !== T2.source; }); var step = function () { if (i >= order.length) { finish(); return; } v.test = { source: T2.source, res: T2.res, cur: order[i] }; self._paint(); i++; self._later(step, 400); }; step(); }
    else finish();
  },
  /* the miss-1 test: the stamp from the biggest piece visits, one after another, every piece it does not fit */
  _showTest: function (T) {
    var v = this._view, self = this, list = T.res.map(function (r, i) { return r.fit && !r.fit.copy ? i : -1; }).filter(function (i) { return i >= 0; });
    v.test = { source: T.source, res: T.res, list: list, cur: list.length ? list[0] : null };
    if (this.FAST || list.length < 2) return;
    var k = 0, test = v.test, tick = function () { if (v.test !== test) return; k = (k + 1) % list.length; test.cur = list[k]; self._repaintMat(); self._later(tick, 1400); };
    this._later(tick, 1400);
  },
  _success: function () {
    var st = this.st, v = this._view, n = st.kind === 'cut' ? st.pieces.length : st.n;
    this._clearHelp();
    if (st.kind === 'name') v.ok = this._t(st.r === 7 ? 'okName8' : (st.a === 1 ? 'okName1' : 'okName'), { a: st.a, n: st.n });
    else if (st.kind === 'shade') v.ok = this._t(st.a === 1 ? 'okShade1' : 'okShade', { a: st.a, n: st.n });
    else if (st.level === 'thirds' && st.r === OnePieceStampCore.DATA.STEP_ROUND) v.ok = this._t('ok8');
    else v.ok = this._t({ 2: 'ok2', 3: 'ok3', 4: 'ok4' }[n]);
    v.labels = st.kind === 'cut';
    this._shelf.push({ shape: st.shape, cuts: st.cuts.slice() });
    this.api.sound(880); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3600);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function f2(x) { return Math.round(x * 100) / 100; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function bbox(p) { var b = [Infinity, Infinity, -Infinity, -Infinity]; p.forEach(function (q) { b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[0]); b[3] = Math.max(b[3], q[1]); }); return b; }
function inPoly(pt, poly) { var x = pt[0], y = pt[1], c = false; for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) { var a = poly[i], b = poly[j]; if (((a[1] > y) !== (b[1] > y)) && (x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0])) c = !c; } return c; }
function segDist(p, a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy, t = l ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l)) : 0; return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); }
function injectOnePieceStampCSS() {
  if (typeof document === 'undefined' || document.getElementById('ops-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ops-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .ops-wrap:focus{outline:none;}'
  + '.ops-shelf{display:flex;gap:4px;min-height:34px;justify-content:center;flex-wrap:wrap;} .ops-mini{display:block;}'
  + '.ops-wrap.is-tiny{gap:6px;} .ops-wrap.is-tiny .ops-shelf{display:none;} .ops-wrap.is-tiny .ops-work{gap:6px;} .ops-wrap.is-tiny .ops-dock{gap:6px;}'
  + '.ops-wrap.is-tiny .ops-card.is-wheels{padding:3px 6px;gap:2px;} .ops-wrap.is-tiny .ops-wbtn{min-width:44px;} .ops-wrap.is-tiny .ops-wnum{font-size:24px;}'
  + '.ops-work{display:flex;gap:14px;align-items:flex-start;justify-content:center;width:100%;} .ops-wrap.is-narrow .ops-work{flex-direction:column;align-items:center;gap:8px;}'
  + '.ops-matbox{line-height:0;flex:0 0 auto;} .ops-mat{display:block;touch-action:none;border-radius:12px;box-shadow:0 3px 0 #2E6B50;} .ops-mat:focus-visible{outline:3px solid #F4CF62;outline-offset:3px;}'
  + '.ops-piece{cursor:pointer;} .ops-piece:focus-visible{outline:none;stroke:#F4CF62;} .ops-piece.is-src{fill-opacity:.55;}'
  + '.ops-snap{fill:#F2E6C8;fill-opacity:.85;} .ops-snap.is-mark{fill:#F4CF62;fill-opacity:1;stroke:#7A5B14;stroke-width:.3;} .ops-snap.is-pulse{animation:opsPulse .5s ease-in-out 3;} @keyframes opsPulse{50%{fill:#F4CF62;}}'
  + '.ops-partner{fill:#F4CF62;stroke:#7A5B14;stroke-width:.35;} .ops-selanchor{fill:none;stroke:#F4CF62;stroke-width:.8;} .ops-ghost{fill:#F4CF62;stroke:#7A5B14;stroke-width:.5;animation:opsPulse 1.2s ease-in-out infinite;}'
  + '.ops-preview{stroke:#F4CF62;stroke-dasharray:2 1.4;stroke-linecap:round;} .ops-cut.is-locked{stroke:#5A4630;}'
  + '.ops-glass{fill:#FFFFFF;fill-opacity:.6;stroke:#146B5E;stroke-width:.8;pointer-events:none;}'
  + '.ops-token circle{fill:#146B5E;} .ops-token text{fill:#FFF;font-family:' + H + ';font-weight:800;} .ops-token.is-grey circle{fill:#8C7A5B;}'
  + '.ops-frac text{font-family:' + H + ';font-weight:800;fill:#0E3B34;} .ops-frac line{stroke:#0E3B34;}'
  + '.ops-dock{display:flex;flex-direction:column;align-items:center;gap:10px;width:200px;} .ops-wrap.is-narrow .ops-dock{flex-direction:row;flex-wrap:wrap;justify-content:center;width:100%;gap:8px;}'
  + '.ops-pad{min-width:76px;min-height:58px;padding:4px;border:2px solid #E2CFAE;border-radius:14px;background:#FFF8EC;cursor:pointer;line-height:0;} .ops-pad.is-held{border-color:#1F8A78;}'
  + '.ops-tokens{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:190px;} .ops-tok{width:26px;height:26px;border-radius:50%;border:2px dashed #C9B48F;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:15px;color:#FFF;} .ops-tok.is-on{background:#146B5E;border:2px solid #146B5E;}'
  + '.ops-card{min-width:76px;min-height:66px;border-radius:12px;background:#FFFDF6;border:2px solid #E2CFAE;display:flex;align-items:center;justify-content:center;gap:6px;padding:2px 6px;} .ops-countk{font-family:' + H + ';font-weight:800;font-size:24px;fill:#C2410C;} .ops-countn{font-family:' + H + ';font-weight:800;font-size:24px;fill:#146B5E;}'
  + '.ops-card.is-wheels{flex-direction:column;padding:6px 8px;gap:4px;} .ops-wheel{display:flex;flex-direction:row;align-items:center;gap:8px;} .ops-wnum{min-width:30px;text-align:center;font-family:' + H + ';font-weight:800;font-size:30px;color:#0E3B34;line-height:1.1;} .ops-wbar{width:44px;height:4px;background:#0E3B34;border-radius:2px;}'
  + '.ops-wbtn{min-width:48px;min-height:44px;border:0;border-radius:10px;background:#E3F2EF;color:#146B5E;font-size:18px;cursor:pointer;} .ops-wbtn:disabled{opacity:.4;cursor:default;}'
  + '.ops-noteq,.ops-halve{display:flex;align-items:center;gap:6px;min-height:48px;padding:4px 12px;border:2px solid #E2CFAE;border-radius:14px;background:#FFF8EC;color:#8A3B1F;font-family:' + H + ';font-weight:800;font-size:17px;cursor:pointer;} .ops-noteq svg line{stroke:#8A3B1F;stroke-width:3;stroke-linecap:round;} .ops-halve svg circle{fill:none;stroke:#146B5E;stroke-width:2;} .ops-halve svg line{stroke:#146B5E;stroke-width:2.4;} .ops-halve svg text{font-family:' + H + ';font-weight:800;font-size:12px;fill:#146B5E;} .ops-halve.is-on{border-color:#1F8A78;}'
  + '.ops-foot{display:flex;justify-content:center;width:100%;}'
  + '.ops-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .ops-check:disabled{opacity:.5;cursor:default;}'
  + '.ops-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ops-note.is-hint{color:#8A3B1F;} .ops-wrap.is-narrow .ops-note{font-size:17px;}'
  + '.ops-wrap.is-done .ops-mat{box-shadow:0 0 0 4px #9FD9CC,0 3px 0 #2E6B50;}'
  + '.ops-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.ops-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'ops-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.OnePieceStampActivity = OnePieceStampActivity;
