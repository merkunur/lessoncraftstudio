/* =====================================================================
   light-leak-activity.js — ACTIVITY #106 of the one-by-one rebuild:
   "Mim's Glow Workshop" → THE LIGHT-LEAK LANTERN (1.G.A.2, 11 locales).
   Design: docs/activities-rebuild/designs/106-shapeforge.md
   ---------------------------------------------------------------------
   THE INVENTION: a lantern only glows when it is sealed. Behind every
   frame a lamp burns: every gap between the glass pieces leaks gold
   light, and every bit of glass that sticks out of the frame throws a
   dark shadow on the workshop wall. Level 1 builds lanterns from pattern
   blocks (the same shape a new way is checked against the remembered
   seams), level 2 picks the one spare that fills a hole exactly (shape
   AND size), level 3 builds tangram figures and slides rigid panes into
   a shadow frame (a turned or flipped pane leaks and overhangs).
   Miss 1: the lamp blazes every leak, every overhang darkens; the hint
   names the cause (never the answer). Miss 2: a ghost piece from an exact
   cover of what is still open (level 1 / tangram build), the right spare
   or pane glows (levels 2 / shadow), or a remembered seam blinks.
   Success: the glass glows, the seams etch silver, the lantern rises to
   the garland; then every piece may be taken out and rebuilt.
   ACTIVITY LAYER ONLY: the model is light-leak-core.js; every piece,
   frame, wall and lamp is drawn geometry; lcs-shell.js untouched (the
   shell's Check is hidden and pressed by this activity when right).
   Test seams: window.LightLeakActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / ._dims / ._toModel / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var LightLeakActivity = {
  id: 'light-leak',
  apparatusClasses: ['ll-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'Mim\'s Glow Workshop',de:'Mims Glühwerkstatt',nl:'Mims lichtwerkplaats',da:'Mims lysværksted',sv:'Mims ljussmedja',no:'Mims lysverksted',es:'Taller de luz de Mim',it:'La bottega luminosa di Mim',pt:'Oficina de luz de Mim',fr:'L’atelier de Mim',fi:'Mimin valopaja'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tFill:        {en:'Fill the lantern with glass: no light may leak through, and nothing may stick out.',de:'Füll die Laterne mit Glas: Kein Licht darf durchscheinen, und nichts darf herausragen.',nl:'Vul de lantaarn met glas: er mag geen licht doorheen schijnen en er mag niets uitsteken.',da:'Fyld lygten med glas: Intet lys må slippe igennem, og intet må stikke ud.',sv:'Fyll lyktan med glas: inget ljus får lysa igenom och inget får sticka ut.',no:'Fyll lykten med glass: Ikke noe lys får skinne gjennom, og ingenting får stikke ut.',es:'Llena el farol con vidrio: no debe pasar nada de luz y nada debe sobresalir.',it:'Riempi la lanterna di vetro: non deve passare luce e niente deve sporgere.',pt:'Preencha a lanterna com vidro: nenhuma luz pode passar e nada pode ficar para fora.',fr:'Remplis la lanterne de verre : aucune lumière ne doit passer, et rien ne doit dépasser.',fi:'Täytä lyhty lasilla: valoa ei saa päästä läpi, eikä mikään saa törröttää ulos.'},
    tExact:       {en:'Use just these pieces to fill the lantern.',de:'Füll die Laterne nur mit diesen Teilen.',nl:'Vul de lantaarn met alleen deze stukjes.',da:'Fyld lygten med kun disse stykker.',sv:'Fyll lyktan med bara de här bitarna.',no:'Fyll lykten med bare disse bitene.',es:'Llena el farol solo con estas piezas.',it:'Riempi la lanterna solo con questi pezzi.',pt:'Preencha a lanterna só com estas peças.',fr:'Remplis la lanterne avec seulement ces pièces.',fi:'Täytä lyhty vain näillä paloilla.'},
    tNew:         {en:'Fill the same lantern a new way, not along the dotted lines.',de:'Füll dieselbe Laterne auf eine neue Art, nicht wie die gestrichelten Linien.',nl:'Vul dezelfde lantaarn op een nieuwe manier, niet zoals de stippellijnen.',da:'Fyld den samme lygte på en ny måde, ikke som de stiplede linjer.',sv:'Fyll samma lykta på ett nytt sätt, inte som de streckade linjerna.',no:'Fyll den samme lykten på en ny måte, ikke som de stiplede linjene.',es:'Llena el mismo farol de otra manera, no como marcan las líneas punteadas.',it:'Riempi la stessa lanterna in un modo nuovo, non come le linee tratteggiate.',pt:'Preencha a mesma lanterna de um jeito novo, não como as linhas tracejadas.',fr:'Remplis la même lanterne d’une nouvelle façon, pas comme les pointillés.',fi:'Täytä sama lyhty uudella tavalla, ei katkoviivojen mukaan.'},
    tTri:         {en:'Fill the lantern using only triangles.',de:'Füll die Laterne nur mit Dreiecken.',nl:'Vul de lantaarn met alleen driehoeken.',da:'Fyld lygten med kun trekanter.',sv:'Fyll lyktan med bara trianglar.',no:'Fyll lykten med bare trekanter.',es:'Llena el farol solo con triángulos.',it:'Riempi la lanterna solo con triangoli.',pt:'Preencha a lanterna só com triângulos.',fr:'Remplis la lanterne seulement avec des triangles.',fi:'Täytä lyhty pelkillä kolmioilla.'},
    tGrow:        {en:'One piece is already in. Fill the rest of the hexagon.',de:'Ein Teil ist schon drin. Füll den Rest des Sechsecks.',nl:'Eén stukje zit er al in. Vul de rest van de zeshoek.',da:'Ét stykke er der allerede. Fyld resten af sekskanten.',sv:'En bit sitter redan där. Fyll resten av sexhörningen.',no:'Én bit er allerede på plass. Fyll resten av sekskanten.',es:'Ya hay una pieza puesta. Llena el resto del hexágono.',it:'Un pezzo c’è già. Riempi il resto dell’esagono.',pt:'Uma peça já está no lugar. Preencha o resto do hexágono.',fr:'Une pièce est déjà en place. Remplis le reste de l’hexagone.',fi:'Yksi pala on jo paikallaan. Täytä loput kuusikulmiosta.'},
    tBar:         {en:'Fill the long bar with glass.',de:'Füll den langen Balken mit Glas.',nl:'Vul de lange balk met glas.',da:'Fyld den lange bjælke med glas.',sv:'Fyll den långa stången med glas.',no:'Fyll den lange stangen med glass.',es:'Llena la barra larga con vidrio.',it:'Riempi la barra lunga di vetro.',pt:'Preencha a barra comprida com vidro.',fr:'Remplis la longue barre de verre.',fi:'Täytä pitkä palkki lasilla.'},
    tHole:        {en:'Which piece fills the hole exactly? Drag it in, and turn or flip it if you need to.',de:'Welches Teil füllt das Loch genau? Zieh es hinein und dreh oder spiegle es, wenn nötig.',nl:'Welk stukje vult het gat precies? Sleep het erin en draai of spiegel het als het nodig is.',da:'Hvilket stykke fylder hullet præcis? Træk det ind, og drej eller spejlvend det, hvis det er nødvendigt.',sv:'Vilken bit fyller hålet precis? Dra in den och vrid eller spegelvänd den om det behövs.',no:'Hvilken bit fyller hullet nøyaktig? Dra den inn, og vri eller speilvend den hvis det trengs.',es:'¿Qué pieza llena el hueco exactamente? Arrástrala y gírala o voltéala si hace falta.',it:'Quale pezzo riempie esattamente il buco? Trascinalo dentro e giralo o capovolgilo, se serve.',pt:'Qual peça preenche o buraco certinho? Arraste para dentro e gire ou vire, se precisar.',fr:'Quelle pièce remplit exactement le trou ? Fais-la glisser, et tourne-la ou retourne-la si besoin.',fi:'Mikä pala täyttää reiän täsmälleen? Vedä se paikalleen ja käännä tai peilaa sitä tarvittaessa.'},
    tBuild:       {en:'Build the shape with the tangram pieces and fill it exactly.',de:'Bau die Form mit den Tangram-Teilen und füll sie genau aus.',nl:'Bouw de vorm met de tangramstukjes en vul hem precies op.',da:'Byg figuren med tangrambrikkerne, og fyld den helt ud.',sv:'Bygg formen med tangrambitarna och fyll den precis.',no:'Bygg formen med tangrambitene, og fyll den helt ut.',es:'Arma la figura con las piezas del tangram y llénala exactamente.',it:'Costruisci la figura con i pezzi del tangram e riempila esattamente.',pt:'Monte a figura com as peças do tangram e preencha certinho.',fr:'Construis la forme avec les pièces du tangram et remplis-la exactement.',fi:'Rakenna kuvio tangrampaloista ja täytä se täsmälleen.'},
    tShadow:      {en:'Which pane matches the shadow exactly? Slide one into the frame.',de:'Welche Scheibe passt genau zum Schatten? Schieb eine in den Rahmen.',nl:'Welk ruitje past precies bij de schaduw? Schuif er een in het lijstje.',da:'Hvilken rude passer præcis til skyggen? Skub en ind i rammen.',sv:'Vilken ruta passar precis till skuggan? Skjut in en i ramen.',no:'Hvilken rute passer nøyaktig til skyggen? Skyv en inn i rammen.',es:'¿Qué vidrio coincide exactamente con la sombra? Mete uno en el marco.',it:'Quale vetro corrisponde esattamente all’ombra? Fanne scivolare uno nella cornice.',pt:'Qual vidro combina certinho com a sombra? Deslize um para dentro da moldura.',fr:'Quel vitrail correspond exactement à l’ombre ? Fais-en glisser un dans le cadre.',fi:'Mikä ruutu vastaa varjoa täsmälleen? Liu\'uta yksi kehykseen.'},
    hintEmpty:    {en:'Drag a glass piece into the lantern.',de:'Zieh ein Glasteil in die Laterne.',nl:'Sleep een glazen stukje in de lantaarn.',da:'Træk et glasstykke ind i lygten.',sv:'Dra en glasbit in i lyktan.',no:'Dra en glassbit inn i lykten.',es:'Arrastra una pieza de vidrio al farol.',it:'Trascina un pezzo di vetro nella lanterna.',pt:'Arraste uma peça de vidro para a lanterna.',fr:'Fais glisser une pièce de verre dans la lanterne.',fi:'Vedä lasipala lyhtyyn.'},
    hintHole:     {en:'Drag a spare piece into the hole.',de:'Zieh eins der losen Teile in das Loch.',nl:'Sleep een los stukje in het gat.',da:'Træk et af de løse stykker ind i hullet.',sv:'Dra en av de lösa bitarna in i hålet.',no:'Dra en av de løse bitene inn i hullet.',es:'Arrastra una de las piezas sueltas al hueco.',it:'Trascina uno dei pezzi sciolti nel buco.',pt:'Arraste uma das peças soltas para o buraco.',fr:'Fais glisser une des pièces libres dans le trou.',fi:'Vedä yksi irtopaloista reikään.'},
    hintPane:     {en:'Slide a pane into the shadow frame.',de:'Schieb eine Scheibe in den Schattenrahmen.',nl:'Schuif een ruitje in het schaduwlijstje.',da:'Skub en rude ind i skyggerammen.',sv:'Skjut in en ruta i skuggramen.',no:'Skyv en rute inn i skyggerammen.',es:'Mete un vidrio en el marco de la sombra.',it:'Fai scivolare un vetro nella cornice dell’ombra.',pt:'Deslize um vidro para dentro da moldura da sombra.',fr:'Fais glisser un vitrail dans le cadre de l’ombre.',fi:'Liu\'uta ruutu varjokehykseen.'},
    hintLeak:     {en:'Light is still shining through. Can you fill every gap?',de:'Es scheint noch Licht durch. Kannst du jede Lücke füllen?',nl:'Er schijnt nog licht doorheen. Kun je elk gaatje vullen?',da:'Der skinner stadig lys igennem. Kan du fylde alle huller?',sv:'Det lyser fortfarande igenom. Kan du fylla varje glipa?',no:'Det skinner fortsatt lys gjennom. Klarer du å fylle alle hullene?',es:'Todavía pasa luz. ¿Puedes tapar cada hueco?',it:'Passa ancora luce. Riesci a riempire ogni spazio?',pt:'Ainda passa luz. Você consegue tapar cada vão?',fr:'La lumière passe encore. Peux-tu boucher chaque trou ?',fi:'Valoa pääsee yhä läpi. Saatko jokaisen raon täytettyä?'},
    hintOver:     {en:'A piece is sticking out. Do you see its shadow on the wall?',de:'Ein Teil ragt heraus. Siehst du seinen Schatten an der Wand?',nl:'Er steekt een stukje uit. Zie je de schaduw op de muur?',da:'Et stykke stikker ud. Kan du se dets skygge på væggen?',sv:'En bit sticker ut. Ser du dess skugga på väggen?',no:'En bit stikker ut. Ser du skyggen av den på veggen?',es:'Una pieza sobresale. ¿Ves su sombra en la pared?',it:'Un pezzo sporge. Vedi la sua ombra sul muro?',pt:'Uma peça está para fora. Você vê a sombra dela na parede?',fr:'Une pièce dépasse. Vois-tu son ombre sur le mur ?',fi:'Yksi pala törröttää ulos. Näetkö sen varjon seinällä?'},
    hintBoth:     {en:'Light is shining through, and a piece sticks out.',de:'Es scheint Licht durch, und ein Teil ragt heraus.',nl:'Er schijnt licht doorheen, en er steekt een stukje uit.',da:'Der skinner lys igennem, og et stykke stikker ud.',sv:'Det lyser igenom, och en bit sticker ut.',no:'Det skinner lys gjennom, og en bit stikker ut.',es:'Pasa luz y además una pieza sobresale.',it:'Passa luce e un pezzo sporge.',pt:'Passa luz e uma peça está para fora.',fr:'La lumière passe, et une pièce dépasse.',fi:'Valoa pääsee läpi, ja yksi pala törröttää ulos.'},
    hintSame:     {en:'That is the same way as before: the old lines match. Can you use other pieces?',de:'Das hast du genauso gelegt wie vorher: Die alten Linien passen genau. Kannst du andere Teile nehmen?',nl:'Dat is dezelfde manier als eerst: de oude lijnen passen precies. Kun je andere stukjes gebruiken?',da:'Det er samme måde som før: De gamle linjer passer. Kan du bruge andre stykker?',sv:'Det är samma sätt som förut: de gamla linjerna stämmer. Kan du använda andra bitar?',no:'Det er samme måte som før: De gamle linjene stemmer. Kan du bruke andre biter?',es:'Es la misma manera que antes: las líneas viejas coinciden. ¿Puedes usar otras piezas?',it:'È lo stesso modo di prima: le linee vecchie coincidono. Puoi usare altri pezzi?',pt:'É o mesmo jeito de antes: as linhas antigas batem. Você pode usar outras peças?',fr:'C’est la même façon qu’avant : les anciennes lignes correspondent. Peux-tu prendre d’autres pièces ?',fi:'Tämä on sama tapa kuin äsken: vanhat viivat osuvat kohdalleen. Voisitko käyttää muita paloja?'},
    hintSpare:    {en:'That piece does not fill the hole exactly. Look at its shape and its size, or try turning it.',de:'Dieses Teil füllt das Loch nicht genau. Schau auf seine Form und seine Größe – oder dreh es.',nl:'Dat stukje vult het gat niet precies. Kijk naar de vorm en de grootte – of draai het.',da:'Det stykke fylder ikke hullet præcis. Se på formen og størrelsen – eller drej det.',sv:'Den biten fyller inte hålet precis. Titta på formen och storleken – eller vrid den.',no:'Den biten fyller ikke hullet nøyaktig. Se på formen og størrelsen – eller vri den.',es:'Esa pieza no llena el hueco exactamente. Fíjate en su forma y en su tamaño, o gírala.',it:'Quel pezzo non riempie esattamente il buco. Guarda la sua forma e la sua grandezza, oppure giralo.',pt:'Essa peça não preenche o buraco certinho. Observe o formato e o tamanho dela, ou gire.',fr:'Cette pièce ne remplit pas exactement le trou. Regarde sa forme et sa taille, ou tourne-la.',fi:'Tuo pala ei täytä reikää täsmälleen. Katso sen muotoa ja kokoa – tai käännä sitä.'},
    hintShadow:   {en:'Light gets through and a corner sticks out. Is this pane turned or flipped?',de:'Licht kommt durch, und eine Ecke ragt heraus. Ist diese Scheibe gedreht oder gespiegelt?',nl:'Er komt licht door en een hoek steekt uit. Is dit ruitje gedraaid of gespiegeld?',da:'Lyset slipper igennem, og et hjørne stikker ud. Er ruden drejet eller spejlvendt?',sv:'Ljuset kommer igenom och ett hörn sticker ut. Är rutan vriden eller spegelvänd?',no:'Lyset slipper gjennom, og et hjørne stikker ut. Er ruten vridd eller speilvendt?',es:'Pasa luz y una esquina sobresale. ¿Este vidrio está girado o volteado?',it:'Passa luce e un angolo sporge. Questo vetro è girato o capovolto?',pt:'Passa luz e uma ponta fica para fora. Esse vidro está girado ou virado ao contrário?',fr:'La lumière passe et un coin dépasse. Ce vitrail est-il tourné ou retourné ?',fi:'Valoa pääsee läpi ja yksi kulma törröttää. Onko ruutu käännetty tai peilattu?'},
    hintGhost:    {en:'Try a piece like the dotted one.',de:'Probier ein Teil wie das gestrichelte.',nl:'Probeer een stukje zoals het gestippelde.',da:'Prøv et stykke som det stiplede.',sv:'Prova en bit som den streckade.',no:'Prøv en bit som den stiplede.',es:'Prueba una pieza como la punteada.',it:'Prova un pezzo come quello tratteggiato.',pt:'Experimente uma peça como a tracejada.',fr:'Essaie une pièce comme celle en pointillés.',fi:'Kokeile samanlaista palaa kuin katkoviivoilla piirretty.'},
    hintSame2:    {en:'Look at the blinking line: build that part another way.',de:'Schau auf die blinkende Linie: Bau diesen Teil anders.',nl:'Kijk naar de knipperende lijn: bouw dat deel op een andere manier.',da:'Se på den blinkende linje: Byg den del på en anden måde.',sv:'Titta på den blinkande linjen: bygg den delen på ett annat sätt.',no:'Se på den blinkende linjen: Bygg den delen på en annen måte.',es:'Mira la línea que parpadea: arma esa parte de otra manera.',it:'Guarda la linea che lampeggia: costruisci quella parte in un altro modo.',pt:'Olhe a linha que pisca: monte essa parte de outro jeito.',fr:'Regarde la ligne qui clignote : construis cette partie autrement.',fi:'Katso vilkkuvaa viivaa: rakenna se kohta toisella tavalla.'},
    hintSpare2:   {en:'Try the glowing piece, and turn or flip it until it fits the hole.',de:'Probier das leuchtende Teil und dreh oder spiegle es, bis es ins Loch passt.',nl:'Probeer het oplichtende stukje en draai of spiegel het tot het in het gat past.',da:'Prøv det lysende stykke, og drej eller spejlvend det, til det passer i hullet.',sv:'Prova den lysande biten och vrid eller spegelvänd den tills den passar i hålet.',no:'Prøv den lysende biten, og vri eller speilvend den til den passer i hullet.',es:'Prueba la pieza que brilla y gírala o voltéala hasta que quepa en el hueco.',it:'Prova il pezzo che si illumina e giralo o capovolgilo finché entra nel buco.',pt:'Experimente a peça que brilha e gire ou vire até ela encaixar no buraco.',fr:'Essaie la pièce qui brille, et tourne-la ou retourne-la jusqu’à ce qu’elle entre dans le trou.',fi:'Kokeile hehkuvaa palaa ja käännä tai peilaa sitä, kunnes se sopii reikään.'},
    hintShadow2:  {en:'Try the pane that lifts up in the rack.',de:'Probier die Scheibe, die sich im Ständer hebt.',nl:'Probeer het ruitje dat in het rek omhoogkomt.',da:'Prøv ruden, der løfter sig i stativet.',sv:'Prova rutan som lyfts upp i hållaren.',no:'Prøv ruten som løfter seg i stativet.',es:'Prueba el vidrio que se levanta en el estante.',it:'Prova il vetro che si solleva nella rastrelliera.',pt:'Experimente o vidro que sobe no suporte.',fr:'Essaie le vitrail qui se soulève sur le présentoir.',fi:'Kokeile ruutua, joka nousee telineessä.'},
    okRhombus:    {en:'Sealed! The rhombus glows.',de:'Dicht! Die Raute leuchtet.',nl:'Dicht! De ruit straalt.',da:'Tæt! Romben lyser.',sv:'Tät! Romben lyser.',no:'Tett! Romben lyser.',es:'¡Sellado! El rombo brilla.',it:'Sigillata! Il rombo si illumina.',pt:'Vedada! O losango brilha.',fr:'Scellée ! Le losange brille.',fi:'Tiivis! Neljäkäs hehkuu.'},
    okTrapezoid:  {en:'Sealed! The trapezoid glows.',de:'Dicht! Das Trapez leuchtet.',nl:'Dicht! Het trapezium straalt.',da:'Tæt! Trapezet lyser.',sv:'Tät! Parallelltrapetsen lyser.',no:'Tett! Trapeset lyser.',es:'¡Sellado! El trapecio brilla.',it:'Sigillata! Il trapezio si illumina.',pt:'Vedada! O trapézio brilha.',fr:'Scellée ! Le trapèze brille.',fi:'Tiivis! Puolisuunnikas hehkuu.'},
    okTriangle:   {en:'Sealed! The triangle glows.',de:'Dicht! Das Dreieck leuchtet.',nl:'Dicht! De driehoek straalt.',da:'Tæt! Trekanten lyser.',sv:'Tät! Triangeln lyser.',no:'Tett! Trekanten lyser.',es:'¡Sellado! El triángulo brilla.',it:'Sigillata! Il triangolo si illumina.',pt:'Vedada! O triângulo brilha.',fr:'Scellée ! Le triangle brille.',fi:'Tiivis! Kolmio hehkuu.'},
    okPara:       {en:'Sealed! The parallelogram glows.',de:'Dicht! Das Parallelogramm leuchtet.',nl:'Dicht! Het parallellogram straalt.',da:'Tæt! Parallelogrammet lyser.',sv:'Tät! Parallellogrammen lyser.',no:'Tett! Parallellogrammet lyser.',es:'¡Sellado! El paralelogramo brilla.',it:'Sigillata! Il parallelogramma si illumina.',pt:'Vedada! O paralelogramo brilha.',fr:'Scellée ! Le parallélogramme brille.',fi:'Tiivis! Suunnikas hehkuu.'},
    okHexagon:    {en:'Sealed! The hexagon glows.',de:'Dicht! Das Sechseck leuchtet.',nl:'Dicht! De zeshoek straalt.',da:'Tæt! Sekskanten lyser.',sv:'Tät! Sexhörningen lyser.',no:'Tett! Sekskanten lyser.',es:'¡Sellado! El hexágono brilla.',it:'Sigillata! L’esagono si illumina.',pt:'Vedada! O hexágono brilha.',fr:'Scellée ! L’hexagone brille.',fi:'Tiivis! Kuusikulmio hehkuu.'},
    okBar:        {en:'Sealed! The long bar glows.',de:'Dicht! Der lange Balken leuchtet.',nl:'Dicht! De lange balk straalt.',da:'Tæt! Den lange bjælke lyser.',sv:'Tät! Den långa stången lyser.',no:'Tett! Den lange stangen lyser.',es:'¡Sellado! La barra larga brilla.',it:'Sigillata! La barra lunga si illumina.',pt:'Vedada! A barra comprida brilha.',fr:'Scellée ! La longue barre brille.',fi:'Tiivis! Pitkä palkki hehkuu.'},
    okSquare:     {en:'Sealed! The square glows.',de:'Dicht! Das Quadrat leuchtet.',nl:'Dicht! Het vierkant straalt.',da:'Tæt! Kvadratet lyser.',sv:'Tät! Kvadraten lyser.',no:'Tett! Kvadratet lyser.',es:'¡Sellado! El cuadrado brilla.',it:'Sigillata! Il quadrato si illumina.',pt:'Vedada! O quadrado brilha.',fr:'Scellée ! Le carré brille.',fi:'Tiivis! Neliö hehkuu.'},
    okRectangle:  {en:'Sealed! The rectangle glows.',de:'Dicht! Das Rechteck leuchtet.',nl:'Dicht! De rechthoek straalt.',da:'Tæt! Rektanglet lyser.',sv:'Tät! Rektangeln lyser.',no:'Tett! Rektangelet lyser.',es:'¡Sellado! El rectángulo brilla.',it:'Sigillata! Il rettangolo si illumina.',pt:'Vedada! O retângulo brilha.',fr:'Scellée ! Le rectangle brille.',fi:'Tiivis! Suorakulmio hehkuu.'},
    okNewHexagon: {en:'A new way to make the same hexagon!',de:'Ein neuer Weg zum selben Sechseck!',nl:'Een nieuwe manier voor dezelfde zeshoek!',da:'En ny måde at lave den samme sekskant på!',sv:'Ett nytt sätt att göra samma sexhörning!',no:'En ny måte å lage den samme sekskanten på!',es:'¡Una nueva manera de formar el mismo hexágono!',it:'Un modo nuovo per fare lo stesso esagono!',pt:'Um jeito novo de montar o mesmo hexágono!',fr:'Une nouvelle façon de faire le même hexagone !',fi:'Uusi tapa tehdä sama kuusikulmio!'},
    okNewPara:    {en:'A new way to make the same parallelogram!',de:'Ein neuer Weg zum selben Parallelogramm!',nl:'Een nieuwe manier voor hetzelfde parallellogram!',da:'En ny måde at lave det samme parallelogram på!',sv:'Ett nytt sätt att göra samma parallellogram!',no:'En ny måte å lage det samme parallellogrammet på!',es:'¡Una nueva manera de formar el mismo paralelogramo!',it:'Un modo nuovo per fare lo stesso parallelogramma!',pt:'Um jeito novo de montar o mesmo paralelogramo!',fr:'Une nouvelle façon de faire le même parallélogramme !',fi:'Uusi tapa tehdä sama suunnikas!'},
    usedList:     {en:'Your pieces: {list}.',de:'Deine Teile: {list}.',nl:'Jouw stukjes: {list}.',da:'Dine stykker: {list}.',sv:'Dina bitar: {list}.',no:'Bitene dine: {list}.',es:'Tus piezas: {list}.',it:'I tuoi pezzi: {list}.',pt:'Suas peças: {list}.',fr:'Tes pièces : {list}.',fi:'Käytit: {list}.'},
    okHole:       {en:'That piece fills the hole exactly. The lantern is sealed!',de:'Dieses Teil füllt das Loch genau. Die Laterne ist dicht!',nl:'Dat stukje vult het gat precies. De lantaarn is dicht!',da:'Det stykke fylder hullet præcis. Lygten er tæt!',sv:'Den biten fyller hålet precis. Lyktan är tät!',no:'Den biten fyller hullet nøyaktig. Lykten er tett!',es:'Esa pieza llena el hueco exactamente. ¡El farol quedó sellado!',it:'Quel pezzo riempie esattamente il buco. La lanterna è sigillata!',pt:'Essa peça preenche o buraco certinho. A lanterna está vedada!',fr:'Cette pièce remplit exactement le trou. La lanterne est scellée !',fi:'Tuo pala täyttää reiän täsmälleen. Lyhty on tiivis!'},
    okShadow:     {en:'That pane matches the shadow exactly: not turned, not flipped.',de:'Diese Scheibe passt genau zum Schatten: nicht gedreht, nicht gespiegelt.',nl:'Dat ruitje past precies bij de schaduw: niet gedraaid, niet gespiegeld.',da:'Den rude passer præcis til skyggen: ikke drejet, ikke spejlvendt.',sv:'Den rutan passar precis till skuggan: inte vriden, inte spegelvänd.',no:'Den ruten passer nøyaktig til skyggen: ikke vridd, ikke speilvendt.',es:'Ese vidrio coincide exactamente con la sombra: ni girado ni volteado.',it:'Quel vetro corrisponde esattamente all’ombra: né girato né capovolto.',pt:'Esse vidro combina certinho com a sombra: nem girado nem virado.',fr:'Ce vitrail correspond exactement à l’ombre : ni tourné, ni retourné.',fi:'Tuo ruutu vastaa varjoa täsmälleen: ei käännetty, ei peilattu.'},
    pcTriangle:   {en:'1 triangle|{n} triangles',de:'1 Dreieck|{n} Dreiecke',nl:'1 driehoek|{n} driehoeken',da:'1 trekant|{n} trekanter',sv:'1 triangel|{n} trianglar',no:'1 trekant|{n} trekanter',es:'1 triángulo|{n} triángulos',it:'1 triangolo|{n} triangoli',pt:'1 triângulo|{n} triângulos',fr:'1 triangle|{n} triangles',fi:'1 kolmio|{n} kolmiota'},
    pcRhombus:    {en:'1 rhombus|{n} rhombuses',de:'1 Raute|{n} Rauten',nl:'1 ruit|{n} ruiten',da:'1 rombe|{n} romber',sv:'1 romb|{n} romber',no:'1 rombe|{n} romber',es:'1 rombo|{n} rombos',it:'1 rombo|{n} rombi',pt:'1 losango|{n} losangos',fr:'1 losange|{n} losanges',fi:'1 neljäkäs|{n} neljäkästä'},
    pcTrapezoid:  {en:'1 trapezoid|{n} trapezoids',de:'1 Trapez|{n} Trapeze',nl:'1 trapezium|{n} trapeziums',da:'1 trapez|{n} trapezer',sv:'1 parallelltrapets|{n} parallelltrapetser',no:'1 trapes|{n} trapeser',es:'1 trapecio|{n} trapecios',it:'1 trapezio|{n} trapezi',pt:'1 trapézio|{n} trapézios',fr:'1 trapèze|{n} trapèzes',fi:'1 puolisuunnikas|{n} puolisuunnikasta'},
    pcHexagon:    {en:'1 hexagon|{n} hexagons',de:'1 Sechseck|{n} Sechsecke',nl:'1 zeshoek|{n} zeshoeken',da:'1 sekskant|{n} sekskanter',sv:'1 sexhörning|{n} sexhörningar',no:'1 sekskant|{n} sekskanter',es:'1 hexágono|{n} hexágonos',it:'1 esagono|{n} esagoni',pt:'1 hexágono|{n} hexágonos',fr:'1 hexagone|{n} hexagones',fi:'1 kuusikulmio|{n} kuusikulmiota'},
    pcSmall:      {en:'1 small triangle|{n} small triangles',de:'1 kleines Dreieck|{n} kleine Dreiecke',nl:'1 kleine driehoek|{n} kleine driehoeken',da:'1 lille trekant|{n} små trekanter',sv:'1 liten triangel|{n} små trianglar',no:'1 liten trekant|{n} små trekanter',es:'1 triángulo pequeño|{n} triángulos pequeños',it:'1 triangolo piccolo|{n} triangoli piccoli',pt:'1 triângulo pequeno|{n} triângulos pequenos',fr:'1 petit triangle|{n} petits triangles',fi:'1 pieni kolmio|{n} pientä kolmiota'},
    pcMedium:     {en:'1 medium triangle|{n} medium triangles',de:'1 mittleres Dreieck|{n} mittlere Dreiecke',nl:'1 middelgrote driehoek|{n} middelgrote driehoeken',da:'1 mellemstor trekant|{n} mellemstore trekanter',sv:'1 mellanstor triangel|{n} mellanstora trianglar',no:'1 mellomstor trekant|{n} mellomstore trekanter',es:'1 triángulo mediano|{n} triángulos medianos',it:'1 triangolo medio|{n} triangoli medi',pt:'1 triângulo médio|{n} triângulos médios',fr:'1 triangle moyen|{n} triangles moyens',fi:'1 keskikokoinen kolmio|{n} keskikokoista kolmiota'},
    pcLarge:      {en:'1 large triangle|{n} large triangles',de:'1 großes Dreieck|{n} große Dreiecke',nl:'1 grote driehoek|{n} grote driehoeken',da:'1 stor trekant|{n} store trekanter',sv:'1 stor triangel|{n} stora trianglar',no:'1 stor trekant|{n} store trekanter',es:'1 triángulo grande|{n} triángulos grandes',it:'1 triangolo grande|{n} triangoli grandi',pt:'1 triângulo grande|{n} triângulos grandes',fr:'1 grand triangle|{n} grands triangles',fi:'1 iso kolmio|{n} isoa kolmiota'},
    pcSquare:     {en:'1 square|{n} squares',de:'1 Quadrat|{n} Quadrate',nl:'1 vierkant|{n} vierkanten',da:'1 kvadrat|{n} kvadrater',sv:'1 kvadrat|{n} kvadrater',no:'1 kvadrat|{n} kvadrater',es:'1 cuadrado|{n} cuadrados',it:'1 quadrato|{n} quadrati',pt:'1 quadrado|{n} quadrados',fr:'1 carré|{n} carrés',fi:'1 neliö|{n} neliötä'},
    pcPara:       {en:'1 parallelogram|{n} parallelograms',de:'1 Parallelogramm|{n} Parallelogramme',nl:'1 parallellogram|{n} parallellogrammen',da:'1 parallelogram|{n} parallelogrammer',sv:'1 parallellogram|{n} parallellogrammer',no:'1 parallellogram|{n} parallellogrammer',es:'1 paralelogramo|{n} paralelogramos',it:'1 parallelogramma|{n} parallelogrammi',pt:'1 paralelogramo|{n} paralelogramos',fr:'1 parallélogramme|{n} parallélogrammes',fi:'1 suunnikas|{n} suunnikasta'},
    aBench:       {en:'Lantern frame: the arrow keys move, Enter drops the chosen piece, R turns, F flips, Delete takes the last piece out',de:'Laternenrahmen: Pfeiltasten bewegen, Enter setzt das gewählte Teil ein, R dreht, F spiegelt, Entf nimmt das letzte Teil heraus',nl:'Lantaarnlijst: pijltjestoetsen verplaatsen, Enter zet het gekozen stukje erin, R draait, F spiegelt, Delete haalt het laatste stukje eruit',da:'Lygtens ramme: piletasterne flytter, Enter sætter det valgte stykke i, R drejer, F spejlvender, Delete tager det sidste stykke ud',sv:'Lyktans ram: piltangenterna flyttar, Enter sätter i den valda biten, R vrider, F spegelvänder, Delete tar ut den sista biten',no:'Lyktens ramme: piltastene flytter, Enter setter inn den valgte biten, R vrir, F speilvender, Delete tar ut den siste biten',es:'Marco del farol: las flechas mueven, Enter pone la pieza elegida, R la gira, F la voltea, Supr quita la última pieza',it:'Cornice della lanterna: le frecce spostano, Invio mette il pezzo scelto, R gira, F capovolge, Canc toglie l’ultimo pezzo',pt:'Moldura da lanterna: as setas movem, Enter coloca a peça escolhida, R gira, F vira, Delete tira a última peça',fr:'Cadre de la lanterne : les flèches déplacent, Entrée pose la pièce choisie, R tourne, F retourne, Suppr enlève la dernière pièce',fi:'Lyhdyn kehys: nuolinäppäimet liikuttavat, Enter laittaa valitun palan, R kääntää, F peilaa, Delete ottaa viimeisen palan pois'},
    aTray:        {en:'Glass pieces: tap one to choose it, tap again to turn it',de:'Glasteile: einmal tippen wählt, noch einmal tippen dreht',nl:'Glazen stukjes: tik om te kiezen, tik nog eens om te draaien',da:'Glasstykker: tryk for at vælge, tryk igen for at dreje',sv:'Glasbitar: tryck för att välja, tryck igen för att vrida',no:'Glassbiter: trykk for å velge, trykk igjen for å vri',es:'Piezas de vidrio: toca una para elegirla y otra vez para girarla',it:'Pezzi di vetro: tocca per scegliere, tocca di nuovo per girare',pt:'Peças de vidro: toque para escolher e toque de novo para girar',fr:'Pièces de verre : touche pour choisir, touche encore pour tourner',fi:'Lasipalat: napauta valitaksesi, napauta uudelleen kääntääksesi'},
    aLeft:        {en:'{pieces} left',de:'noch {pieces}',nl:'nog {pieces}',da:'{pieces} tilbage',sv:'{pieces} kvar',no:'{pieces} igjen',es:'quedan {pieces}',it:'restano {pieces}',pt:'restam {pieces}',fr:'reste : {pieces}',fi:'jäljellä {pieces}'},
    aSpare:       {en:'Spare piece {n}',de:'Loses Teil {n}',nl:'Los stukje {n}',da:'Løst stykke {n}',sv:'Lös bit {n}',no:'Løs bit {n}',es:'Pieza suelta {n}',it:'Pezzo sciolto {n}',pt:'Peça solta {n}',fr:'Pièce libre {n}',fi:'Irtopala {n}'},
    aPane:        {en:'Pane {n}',de:'Scheibe {n}',nl:'Ruitje {n}',da:'Rude {n}',sv:'Ruta {n}',no:'Rute {n}',es:'Vidrio {n}',it:'Vetro {n}',pt:'Vidro {n}',fr:'Vitrail {n}',fi:'Ruutu {n}'},
    aFlip:        {en:'Flip the parallelogram',de:'Das Parallelogramm spiegeln',nl:'Het parallellogram spiegelen',da:'Spejlvend parallelogrammet',sv:'Spegelvänd parallellogrammen',no:'Speilvend parallellogrammet',es:'Voltear el paralelogramo',it:'Capovolgi il parallelogramma',pt:'Virar o paralelogramo',fr:'Retourner le parallélogramme',fi:'Peilaa suunnikas'},
    aLive:        {en:'Light gaps: {k}. Sticking out: {m}.',de:'Lichtlücken: {k}. Ragt heraus: {m}.',nl:'Lichtgaten: {k}. Steekt uit: {m}.',da:'Lyshuller: {k}. Stikker ud: {m}.',sv:'Ljusglipor: {k}. Sticker ut: {m}.',no:'Lyshull: {k}. Stikker ut: {m}.',es:'Huecos de luz: {k}. Sobresale: {m}.',it:'Spazi di luce: {k}. Sporge: {m}.',pt:'Vãos de luz: {k}. Para fora: {m}.',fr:'Trous de lumière : {k}. Dépasse : {m}.',fi:'Valorakoja: {k}. Törröttää: {m}.'},
    aSealed:      {en:'The lantern is sealed.',de:'Die Laterne ist dicht.',nl:'De lantaarn is dicht.',da:'Lygten er tæt.',sv:'Lyktan är tät.',no:'Lykten er tett.',es:'El farol quedó sellado.',it:'La lanterna è sigillata.',pt:'A lanterna está vedada.',fr:'La lanterne est scellée.',fi:'Lyhty on tiivis.'},
    setLevel:     {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvGlass:      {en:'Glass pieces',de:'Glasteile',nl:'Glazen stukjes',da:'Glasstykker',sv:'Glasbitar',no:'Glassbiter',es:'Piezas de vidrio',it:'Pezzi di vetro',pt:'Peças de vidro',fr:'Pièces de verre',fi:'Lasipalat'},
    lvMissing:    {en:'The missing piece',de:'Das fehlende Teil',nl:'Het ontbrekende stukje',da:'Det manglende stykke',sv:'Biten som fattas',no:'Biten som mangler',es:'La pieza que falta',it:'Il pezzo mancante',pt:'A peça que falta',fr:'La pièce manquante',fi:'Puuttuva pala'},
    lvTangram:    {en:'Tangram',de:'Tangram',nl:'Tangram',da:'Tangram',sv:'Tangram',no:'Tangram',es:'Tangram',it:'Tangram',pt:'Tangram',fr:'Tangram',fi:'Tangram'},
    setGlass:     {en:'Glass',de:'Glas',nl:'Glas',da:'Glas',sv:'Glas',no:'Glass',es:'Vidrio',it:'Vetro',pt:'Vidro',fr:'Verre',fi:'Lasi'},
    glColour:     {en:'Coloured',de:'Farbig',nl:'Gekleurd',da:'Farvet',sv:'Färgat',no:'Farget',es:'De colores',it:'Colorato',pt:'Colorido',fr:'Coloré',fi:'Värillinen'},
    glClear:      {en:'Clear',de:'Durchsichtig',nl:'Doorzichtig',da:'Klart',sv:'Klart',no:'Klart',es:'Transparente',it:'Trasparente',pt:'Transparente',fr:'Transparent',fi:'Kirkas'},
    setTurn:      {en:'Turning',de:'Drehen',nl:'Draaien',da:'Drejning',sv:'Vridning',no:'Vridning',es:'Girar',it:'Girare',pt:'Girar',fr:'Rotation',fi:'Kääntäminen'},
    tuTap:        {en:'By tap',de:'Durch Tippen',nl:'Met een tik',da:'Med et tryk',sv:'Med ett tryck',no:'Med et trykk',es:'Al tocar',it:'Con un tocco',pt:'Com um toque',fr:'D’une touche',fi:'Napauttamalla'},
    tuAuto:       {en:'Turns itself to fit',de:'Dreht sich selbst passend',nl:'Draait vanzelf passend',da:'Drejer selv på plads',sv:'Vrider sig själv rätt',no:'Vrir seg selv på plass',es:'Gira sola hasta encajar',it:'Si gira da solo per entrare',pt:'Gira sozinha para encaixar',fr:'Tourne toute seule pour entrer',fi:'Kääntyy itse sopivaksi'}
  },/*STRINGS-END*/

  defaults: { level: 'glass', glass: 'colour', turning: 'tap' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'glass', labelKey: 'lvGlass' }, { value: 'missing', labelKey: 'lvMissing' }, { value: 'tangram', labelKey: 'lvTangram' }] },
    { key: 'glass', type: 'choice', labelKey: 'setGlass', options: [{ value: 'colour', labelKey: 'glColour' }, { value: 'clear', labelKey: 'glClear' }] },
    { key: 'turning', type: 'choice', labelKey: 'setTurn', options: [{ value: 'tap', labelKey: 'tuTap' }, { value: 'auto', labelKey: 'tuAuto' }] }
  ],
  OK_MS: 500, FAST: false,
  COL: { triangle: '#4CAF50', rhombus: '#3F7FD9', trapezoid: '#E0503C', hexagon: '#F2C230', large: '#1F9A86', large2: '#8E5BB5', medium: '#5C6BC0', small: '#F2784B', small2: '#6DB653', square: '#4A9BE0', para: '#E85D75' },
  PC: { triangle: 'pcTriangle', rhombus: 'pcRhombus', trapezoid: 'pcTrapezoid', hexagon: 'pcHexagon', small: 'pcSmall', medium: 'pcMedium', large: 'pcLarge', square: 'pcSquare', para: 'pcPara' },
  OKT: { rhombus: 'okRhombus', trapezoid: 'okTrapezoid', triangle: 'okTriangle', para: 'okPara', hexagon: 'okHexagon', bar: 'okBar', square: 'okSquare', rectangle: 'okRectangle' },
  TASK: { build: 'tFill', exact: 'tExact', 'new': 'tNew', tri: 'tTri', grow: 'tGrow', bar: 'tBar' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pos = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._memory = {}; this._garland = []; this._cursor = null;
    injectLightLeakCSS();
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
  _loc: function () { return LightLeakCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return LightLeakCore.levelOf(this._setting('level')); },
  _clear: function () { return this._setting('glass') === 'clear'; },
  _auto: function () { return this._setting('turning') === 'auto'; },
  _key: function () { return this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = LightLeakCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = LightLeakCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      var P = C.plan(this._level(), Math.random, prevIds);
      this._order = P.order.map(function (id) { return pool.indexOf(id); }); this._pos = P.pos; this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[at]], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'lightleak.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function () {
    var st = this.st; if (!st) return ''; var R = st.R;
    if (R.spares) return this._t('tHole');
    if (R.kind === 'shadow') return this._t('tShadow');
    if (R.kind === 'build') return this._t('tBuild');
    return this._t(this.TASK[R.cog] || 'tFill');
  },
  _setPrompt: function () { var line = this._promptText(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (id, at) {
    this._clearTimers(); this._endDrag(); this._at = at || 0;
    var pos = this._pos ? this._pos[this._at] : null;
    this.st = LightLeakCore.newState(this._level(), id, { pos: pos, memory: this._memory });
    this._cursor = null; this._resetView(); this._setPrompt();
  },
  _resetView: function () { this._view = { showing: false, blaze: false, ghost: null, note: '', ok: '', rise: false, preview: null, glowSlot: null, blink: null }; },
  _clearShowing: function () { var v = this._view; v.showing = false; v.blaze = false; v.ghost = null; v.note = ''; v.glowSlot = null; v.blink = null; },

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
    var wrap = api.el('div', 'll-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ll-garland"></div><div class="ll-work"><div class="ll-benchbox"></div><div class="ll-tray"></div></div><div class="ll-foot"></div><p class="ll-note" aria-live="polite"></p><p class="ll-sr" aria-live="polite"></p>';
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

  /* ---- geometry: model → px ---- */
  _mapRaw: function (p) {   /* model point → screen units (before scale) */
    var st = this.st;
    if (st.grid === 'tri') return [p[0], p[1] * 0.8660254];
    return st.R.frame === 'A' ? [(p[0] - p[1]) * 0.7071068, (p[0] + p[1]) * 0.7071068] : [p[0], p[1]];
  },
  _targetPts: function () {
    var st = this.st, C = LightLeakCore, pts = [];
    if (st.grid === 'tri') st.R.cells.forEach(function (rc) { C.triPts(rc[0], rc[1]).forEach(function (q) { pts.push(C.ax2xy(q)); }); });
    else pts = st.R.poly.slice();
    return pts;
  },
  _dims: function () {
    var C = LightLeakCore, st = this.st, W = this._width(), B = C.band(W), self = this;
    var trayW = B.wide ? 196 : 0, gap = B.wide ? 14 : 0, benchW = Math.min(B.wide ? W - trayW - gap : W, B.wide ? 470 : 420);
    var benchH = B.wide ? 300 : B.tiny ? 188 : 236;
    /* a shadow round's bench holds every pane in the frame (a turned pane is taller or wider than the shadow) */
    var tp = this._targetPts(); if (st.panes) st.panes.forEach(function (pn, i) { var keep = st.pane; st.pane = i; C.paneInFrame(st).forEach(function (p) { tp = tp.concat(p.poly); }); st.pane = keep; });
    var raw = tp.map(function (p) { return self._mapRaw(p); });
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity; raw.forEach(function (q) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); });
    var M = st.spares ? 1.25 : st.grid === 'tri' ? 0.75 : 0.6, sMax = st.grid === 'tri' ? (B.wide ? 92 : 76) : (B.wide ? 110 : 92);
    var s = Math.min(sMax, (benchW - 8) / (x1 - x0 + 2 * M), (benchH - 8) / (y1 - y0 + 2 * M));
    var bh = Math.round(Math.min(benchH, (y1 - y0 + 2 * M) * s + 8));
    var ox = (benchW - (x1 - x0) * s) / 2 - x0 * s, oy = (bh - (y1 - y0) * s) / 2 - y0 * s;
    return { W: W, wide: B.wide, tiny: B.tiny, trayW: trayW, gap: gap, benchW: benchW, benchH: bh, s: s, ox: ox, oy: oy, gar: B.wide ? 52 : 40, tile: B.wide ? 72 : B.tiny ? 58 : 64 };
  },
  /* every corner of a piece stays on the bench (an overhang must be seen whole, with its shadow) */
  _within: function (D) {
    var self = this, C = LightLeakCore;
    return function (cells, poly) {
      var pts = cells ? [].concat.apply([], cells.map(function (rc) { return C.triPts(rc[0], rc[1]).map(C.ax2xy); })) : poly;
      return pts.every(function (p) { var q = self._px(D, p); return q[0] >= 3 && q[0] <= D.benchW - 3 && q[1] >= 3 && q[1] <= D.benchH - 3; });
    };
  },
  _px: function (D, p) { var q = this._mapRaw(p); return [D.ox + q[0] * D.s, D.oy + q[1] * D.s]; },
  /* a bench pixel → model coordinates (sides/rows for TRI, lattice for TAN) */
  _toModel: function (D, px, py) {
    var u = (px - D.ox) / D.s, v = (py - D.oy) / D.s, st = this.st;
    if (st.grid === 'tri') return [u, v / 0.8660254];
    if (st.R.frame === 'A') { u /= 0.7071068; v /= 0.7071068; return [(u + v) / 2, (v - u) / 2]; }
    return [u, v];
  },
  _path: function (D, poly) { var self = this; return 'M' + poly.map(function (p) { var q = self._px(D, p); return f1(q[0]) + ' ' + f1(q[1]); }).join('L') + 'Z'; },
  _cellPoly: function (key) {
    var C = LightLeakCore;
    if (this.st.grid === 'tri') { var rc = key.split(',').map(Number); return C.triPts(rc[0], rc[1]).map(C.ax2xy); }
    return C.quarterPoly(key);
  },
  /* the outline edges of a set of cells (edges used once) */
  _outline: function (keys) {
    var self = this, cnt = {}, seg = {};
    keys.forEach(function (k) { var p = self._cellPoly(k); for (var i = 0; i < p.length; i++) { var a = p[i], b = p[(i + 1) % p.length], e = [a, b].map(function (q) { return f3(q[0]) + ':' + f3(q[1]); }).sort().join('|'); cnt[e] = (cnt[e] || 0) + 1; seg[e] = [a, b]; } });
    return Object.keys(cnt).filter(function (e) { return cnt[e] === 1; }).map(function (e) { return seg[e]; });
  },
  _segPath: function (D, segs) { var self = this; return segs.map(function (s) { var a = self._px(D, s[0]), b = self._px(D, s[1]); return 'M' + f1(a[0]) + ' ' + f1(a[1]) + 'L' + f1(b[0]) + ' ' + f1(b[1]); }).join(''); },
  _colourOf: function (p, idx) {
    if (this._clear()) return '#EEF4F6';
    var k = p.kind; if ((k === 'large' || k === 'small') && idx % 2 === 1) k = k + '2';
    return this.COL[k];
  },
  /* one piece (placed / locked / a ghost) on the bench */
  _pieceSvg: function (D, p, opts) {
    opts = opts || {}; var C = LightLeakCore, self = this, keys = p.set || (p.cells ? p.cells.map(C.cellKey) : C.quarters(p.poly));
    var fill = keys.map(function (k) { return self._path(D, self._cellPoly(k)); }).join('');
    var edge = this._segPath(D, this._outline(keys)), out = '';
    if (opts.ghost) return '<g class="ll-ghost"><path d="' + edge + '" fill="none" stroke="' + (opts.colour || '#146B5E') + '" stroke-width="3.5" stroke-dasharray="7 5" stroke-linecap="round"/></g>';
    out += '<g class="ll-piece' + (p.locked ? ' is-locked' : '') + (opts.over ? ' is-over' : '') + '"' + (p.id && !p.locked ? ' data-pid="' + p.id + '"' : '') + '>';
    out += '<path d="' + fill + '" fill="' + opts.colour + '" stroke="' + opts.colour + '" stroke-width="1.4" stroke-linejoin="round"/>';
    out += '<path class="ll-pedge" d="' + edge + '" fill="none" stroke="' + (opts.over ? '#C2410C' : '#2A3B47') + '" stroke-width="' + (opts.over ? 3.5 : 2.2) + '" stroke-linejoin="round"/>';
    var c = p.cells ? C.triCentre(p.cells) : p.poly ? C.polyCentre(p.poly) : (function () { var x = 0, y = 0, n = 0; keys.forEach(function (k) { self._cellPoly(k).forEach(function (pt) { x += pt[0]; y += pt[1]; n++; }); }); return [x / n, y / n]; })(), q = this._px(D, c);
    out += '<path d="M' + f1(q[0] - D.s * 0.18) + ' ' + f1(q[1] - D.s * 0.08) + 'l' + f1(D.s * 0.16) + ' ' + f1(-D.s * 0.12) + '" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" stroke-linecap="round"/>';
    if (p.locked) out += '<circle cx="' + f1(q[0]) + '" cy="' + f1(q[1]) + '" r="5" fill="#C9A54E" stroke="#3A2E1F" stroke-width="1.5"/>';
    return out + '</g>';
  },
  _benchSvg: function (D) {
    var C = LightLeakCore, st = this.st, v = this._view, self = this, cov = C.coverage(st), out = '', tkeys = C.targetSet(st.R);
    var W = D.benchW, H = D.benchH;
    out += '<svg class="ll-bench" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true" focusable="false">';
    /* the workshop wall with faint bricks */
    out += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="12" fill="#E8DCCB"/>';
    for (var y = 18; y < H; y += 22) out += '<line x1="0" y1="' + y + '" x2="' + W + '" y2="' + y + '" stroke="#DCCDB8" stroke-width="1.5"/>';
    /* shadows on the wall from every overhang */
    if (cov.overhang.length) out += '<path class="ll-shadow' + (v.blaze ? ' is-dark' : '') + '" transform="translate(7 8)" d="' + cov.overhang.map(function (k) { return self._path(D, self._cellPoly(k)); }).join('') + '"/>';
    /* the lit frame: uncovered target cells glow */
    var unc = {}; cov.uncovered.forEach(function (k) { unc[k] = 1; });
    out += '<path class="ll-glass-back" d="' + tkeys.map(function (k) { return self._path(D, self._cellPoly(k)); }).join('') + '" fill="#2A3B47" fill-opacity=".12"/>';
    if (cov.uncovered.length) out += '<path class="ll-glow' + (v.blaze ? ' is-blaze' : '') + '" d="' + cov.uncovered.map(function (k) { return self._path(D, self._cellPoly(k)); }).join('') + '"/>';
    if (v.blaze && cov.uncovered.length) out += '<path d="' + cov.uncovered.map(function (k) { return self._path(D, self._cellPoly(k)); }).join('') + '" fill="none" stroke="#fff" stroke-width="2"/>';
    /* the remembered seams of a "new way" round */
    if (st.remembered && !st.done) out += '<path class="ll-oldseam' + (v.blink ? ' is-blink' : '') + '" d="' + st.remembered.map(function (e) { var ab = e.split('|').map(function (s) { var t = s.split(':').map(Number); return C.ax2xy(t); }); var a = self._px(D, ab[0]), b = self._px(D, ab[1]); return 'M' + f1(a[0]) + ' ' + f1(a[1]) + 'L' + f1(b[0]) + ' ' + f1(b[1]); }).join('') + '"/>';
    /* the pieces */
    var nk = {}, overIds = {};
    if (v.showing || v.blaze) st.placed.forEach(function (p) { var ps = C.pieceSet(st, p), T = {}; tkeys.forEach(function (k) { T[k] = 1; }); if (ps.some(function (k) { return !T[k]; })) overIds[p.id] = 1; });
    st.placed.forEach(function (p) { nk[p.kind] = (nk[p.kind] || 0); out += self._pieceSvg(D, p, { colour: self._colourOf(p, nk[p.kind]++), over: !!overIds[p.id] || (C.pieceSet(st, p).some(function (k) { return tkeys.indexOf(k) < 0; })) }); });
    if (st.pane != null) C.paneInFrame(st).forEach(function (p, i) { out += self._pieceSvg(D, p, { colour: self._colourOf(p, i) }); });
    /* the iron frame and its rivets */
    var frame = this._outline(tkeys);
    out += '<path class="ll-frame" d="' + this._segPath(D, frame) + '"/>';
    /* the etched seams of a sealed lantern */
    if (st.done) { var seams = []; st.placed.forEach(function (p) { seams = seams.concat(self._outline(C.pieceSet(st, p))); }); if (st.pane != null) C.paneInFrame(st).forEach(function (p) { seams = seams.concat(self._outline(C.quarters(p.poly))); }); out += '<path class="ll-seam" d="' + this._segPath(D, seams) + '"/>'; }
    if (v.ghost) out += this._pieceSvg(D, v.ghost, { ghost: true, colour: this._clear() ? '#2A3B47' : this.COL[v.ghost.kind] });
    if (v.preview) out += this._pieceSvg(D, v.preview, { ghost: true, colour: '#2A3B47' });
    if (this._cursor && !st.done) { var cq = this._px(D, this._cursor); out += '<circle class="ll-cursor" cx="' + f1(cq[0]) + '" cy="' + f1(cq[1]) + '" r="9"/>'; }
    /* the lamp flame under the frame */
    var lb = 0, lx = 0; this._targetPts().forEach(function (p) { var q = self._px(D, p); lb = Math.max(lb, q[1]); lx += q[0]; }); lx /= this._targetPts().length;
    out += '<path class="ll-flame' + (st.done ? ' is-on' : '') + '" d="M' + f1(lx) + ' ' + f1(Math.min(H - 4, lb + 18)) + ' q-7 -8 0 -16 q7 8 0 16Z"/>';
    return out + '</svg>';
  },
  /* a small picture of a piece in its tray turn (and flip) */
  _trayPic: function (kind, rot, flip, size, idx) {
    var C = LightLeakCore, st = this.st, pts, keys;
    if (st.grid === 'tri') { var cells = C.triOrient(kind, rot); keys = cells.map(C.cellKey); pts = []; cells.forEach(function (rc) { C.triPts(rc[0], rc[1]).forEach(function (q) { pts.push(C.ax2xy(q)); }); }); }
    else { var poly = C.tanOrient(kind, rot, flip); keys = C.quarters(poly); pts = poly; }
    var self = this, raw = pts.map(function (p) { return self._mapRaw(p); }), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    raw.forEach(function (q) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); });
    var sc = Math.min((size - 10) / Math.max(x1 - x0, 0.6), (size - 10) / Math.max(y1 - y0, 0.6), this._dims().s), D = { ox: (size - (x1 - x0) * sc) / 2 - x0 * sc, oy: (size - (y1 - y0) * sc) / 2 - y0 * sc, s: sc };
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true">' + this._pieceSvg(D, { kind: kind, set: keys }, { colour: this._colourOf({ kind: kind }, idx || 0) }) + '</svg>';
  },
  _paneSvg: function (pane, size) {
    var C = LightLeakCore, self = this, pts = []; pane.pieces.forEach(function (p) { pts = pts.concat(p.poly); });
    var raw = pts.map(function (p) { return self._mapRaw(p); }), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    raw.forEach(function (q) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); });
    var sc = Math.min((size - 12) / (x1 - x0), (size - 12) / (y1 - y0), this._dims().s), D = { ox: (size - (x1 - x0) * sc) / 2 - x0 * sc, oy: (size - (y1 - y0) * sc) / 2 - y0 * sc, s: sc };
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true">' + pane.pieces.map(function (p, i) { return self._pieceSvg(D, { kind: p.kind, set: C.quarters(p.poly), poly: p.poly }, { colour: self._colourOf(p, i) }); }).join('') + '</svg>';
  },
  _garlandSvg: function (D) {
    var n = this._garland.length, W = D.W, H = D.gar, out = '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><path d="M4 8 Q' + f1(W / 2) + ' 22 ' + (W - 4) + ' 8" fill="none" stroke="#8C6A45" stroke-width="2"/>';
    var max = Math.max(1, Math.floor((W - 20) / (H - 6))), list = this._garland.slice(-max);
    list.forEach(function (g, i) {
      var x = 14 + i * (H - 4), t = (x / W), yy = 8 + 4 * 14 * t * (1 - t) * 1.0;
      out += '<line x1="' + f1(x + (H - 14) / 2) + '" y1="' + f1(yy) + '" x2="' + f1(x + (H - 14) / 2) + '" y2="' + f1(yy + 6) + '" stroke="#8C6A45" stroke-width="1.5"/>';
      out += '<g transform="translate(' + f1(x) + ' ' + f1(yy + 6) + ')">' + g.svg(H - 14) + '</g>';
    });
    void n; return out + '</svg>';
  },
  _paint_: function () {
    var C = LightLeakCore, st = this.st, D = this._dims(), v = this._view, self = this, R = st.R;
    this._wrap.className = 'll-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (this._clear() ? ' is-clear' : '');
    this._qs('.ll-garland').innerHTML = this._garlandSvg(D);
    var box = this._qs('.ll-benchbox'); box.innerHTML = this._benchSvg(D);
    box.style.width = D.benchW + 'px'; box.setAttribute('data-k', 'bench'); box.setAttribute('role', 'group'); box.setAttribute('aria-label', this._t('aBench')); box.tabIndex = 0;
    var svg = box.querySelector('.ll-bench');
    svg.addEventListener('pointerdown', function (e) { self._benchDown(e); });
    box.onkeydown = function (e) { self._benchKey(e); };
    /* the tray (or the spares, or the pane rack) */
    var tray = this._qs('.ll-tray'); tray.innerHTML = ''; tray.setAttribute('role', 'group'); tray.setAttribute('aria-label', this._t('aTray'));
    tray.style.width = D.wide ? D.trayW + 'px' : '100%';
    if (R.kind === 'shadow') {
      st.panes.forEach(function (pane, i) {
        var b = self._btn('ll-pane' + (st.pane === i ? ' is-in' : '') + (v.glowSlot === i ? ' is-glow' : ''), 'pane-' + i, self._t('aPane', { n: i + 1 }), self._paneSvg(pane, D.wide ? 92 : D.tile + 8));
        b.addEventListener('click', function () { self._pane(i); });
        tray.appendChild(b);
      });
    } else if (st.spares) {
      st.spares.forEach(function (s, i) {
        var b = self._btn('ll-tile' + (s.used ? ' is-used' : '') + (st.sel === 'spare' + i ? ' is-sel' : '') + (v.glowSlot === i ? ' is-glow' : ''), 'spare-' + i, self._t('aSpare', { n: i + 1 }), self._trayPic(s.kind, s.rot, s.flip, D.tile, 0));
        b.disabled = s.used && !st.done;
        self._wireTray(b, { slot: i }); tray.appendChild(b);
        if (st.grid === 'tan' && s.kind === 'para' && !s.used) { var fl = self._btn('ll-flip', 'flip-' + i, self._t('aFlip'), flipIcon()); fl.addEventListener('click', function () { C.flipSpare(st, i); self._moved(); }); tray.appendChild(fl); }
      });
    } else {
      Object.keys(st.tray).forEach(function (k) {
        var n = st.tray[k], label = self._t('aLeft', { pieces: self._count(k, n) });
        var b = self._btn('ll-tile' + (n ? '' : ' is-empty') + (st.sel === k ? ' is-sel' : '') + (self._auto() ? ' is-auto' : ''), 'tray-' + k, label, self._trayPic(k, st.rot[k] || 0, st.flip[k] || 0, D.tile, 0) + '<span class="ll-badge">' + n + '</span>' + (self._auto() ? '<span class="ll-autob">' + autoIcon() + '</span>' : ''));
        b.disabled = !n && !st.free;
        self._wireTray(b, { kind: k }); tray.appendChild(b);
        if (st.grid === 'tan' && k === 'para' && n) { var fl = self._btn('ll-flip', 'flip-para', self._t('aFlip'), flipIcon()); fl.addEventListener('click', function () { C.flipTray(st, 'para'); self._moved(); }); tray.appendChild(fl); }
      });
    }
    /* Check */
    var foot = this._qs('.ll-foot'); foot.innerHTML = '';
    var chk = this._btn('ll-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.ll-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'll-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'll-note is-hint'; }
    else { note.textContent = ''; note.className = 'll-note'; }
  },
  /* "2 triangles" etc. — the locale's own count forms */
  _count: function (kind, n) { var f = this._t(this.PC[kind]).split('|'); return (n === 1 ? f[0] : f[1]).replace('{n}', n); },
  _list: function (counts) {
    var self = this, parts = Object.keys(counts).filter(function (k) { return counts[k]; }).map(function (k) { return self._count(k, counts[k]); });
    try { return new Intl.ListFormat(this._loc(), { style: 'long', type: 'conjunction' }).format(parts); } catch (e) { return parts.join(', '); }
  },
  _live: function () {
    var c = LightLeakCore.coverage(this.st), el = this._qs('.ll-sr'); if (!el) return;
    var unit = this.st.grid === 'tri' ? 1 : 2;
    el.textContent = LightLeakCore.isSealed(this.st) ? this._t('aSealed') : this._t('aLive', { k: Math.ceil(c.uncovered.length / unit), m: Math.ceil(c.overhang.length / unit) });
  },

  /* ---------------- the hand ---------------- */
  _wireTray: function (b, src) {
    var self = this;
    b.addEventListener('click', function () {
      if (self._swallowEl === b && Date.now() - self._swallow < 400) return;
      var st = self.st, key = src.slot != null ? 'spare' + src.slot : src.kind;
      if (st.sel === key) { if (src.slot != null) LightLeakCore.turnSpare(st, src.slot); else LightLeakCore.turnTray(st, src.kind); self.api.sound(520); }
      else st.sel = key;
      self._paint();
    });
    b.addEventListener('pointerdown', function (e) { self._trayDown(e, src, b); });
  },
  _srcOf: function (src) {
    var st = this.st;
    if (src.slot != null) { var s = st.spares[src.slot]; return { kind: s.kind, rot: s.rot, flip: s.flip, slot: src.slot }; }
    return { kind: src.kind, rot: st.rot[src.kind] || 0, flip: st.flip[src.kind] || 0 };
  },
  _benchPt: function (e) { var r = this._qs('.ll-bench').getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom }; },
  _place: function (src, px, py, moving) {
    var C = LightLeakCore, st = this.st, D = this._dims(), m = this._toModel(D, px, py);
    var r = C.drop(st, src, m[0], m[1], this._auto(), moving, this._within(D));
    /* a piece dropped on the wall beside the frame stays there and throws its shadow (dragged off the bench, it goes back) */
    if (r === 'placed' || r === 'moved') this.api.sound(940);
    return r;
  },
  _trayDown: function (e, src, el) {
    if ((e.button != null && e.button !== 0)) return;
    var self = this, st = this.st, x0 = e.clientX, y0 = e.clientY, s = this._srcOf(src);
    if (!LightLeakCore.canDrop(st, s.kind) || (s.slot != null && st.spares[s.slot].used)) return;
    var drag = { moved: false, ghost: null };
    var move = function (ev) {
      if (!drag.moved && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 8) return;
      if (!drag.moved) { drag.moved = true; self._drag = drag; var g = document.createElement('div'); g.className = 'll-ghostdrag'; g.innerHTML = el.querySelector('svg').outerHTML; document.body.appendChild(g); drag.ghost = g; }
      ev.preventDefault();
      drag.ghost.style.left = (ev.clientX - 36) + 'px'; drag.ghost.style.top = (ev.clientY - 36) + 'px';
      var b = self._benchPt(ev), v = self._view;
      if (b.inside) { var D = self._dims(), m = self._toModel(D, b.x, b.y);
        var cells = st.grid === 'tri' ? self._snapPreviewTri(s, m) : self._snapPreviewTan(s, m); v.preview = cells; }
      else v.preview = null;
      self._repaintBench();
    };
    var up = function (ev) {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      if (!drag.moved) return;
      self._swallow = Date.now(); self._swallowEl = el;
      var b = self._benchPt(ev); self._endDrag(); self._view.preview = null;
      if (b.inside) { var r = self._place(s, b.x, b.y); if (r === 'placed') { st.sel = null; self._moved(); return; } }
      self._paint();
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  },
  _snapPreviewTri: function (s, m) { var C = LightLeakCore, o = C.triOrient(s.kind, s.rot), c0 = C.triCentre(o), dr = Math.round(m[1] - c0[1]), dc = Math.round(2 * (m[0] - c0[0])); if ((dr + dc) % 2) dc += 1; var cells = o.map(function (q) { return [q[0] + dr, q[1] + dc]; }); return { kind: s.kind, set: cells.map(C.cellKey) }; },
  _snapPreviewTan: function (s, m) { var C = LightLeakCore, o = C.tanOrient(s.kind, s.rot, s.flip), c0 = C.polyCentre(o), poly = C.shift(o, Math.round(m[0] - c0[0]), Math.round(m[1] - c0[1])); return { kind: s.kind, set: C.quarters(poly), poly: poly }; },
  _repaintBench: function () { var box = this._qs('.ll-benchbox'), self = this; box.innerHTML = this._benchSvg(this._dims()); box.querySelector('.ll-bench').addEventListener('pointerdown', function (e) { self._benchDown(e); }); },
  /* a press on the bench: on a placed piece → turn (tap) or move (drag); on the frame with a tray piece chosen → drop it there */
  _benchDown: function (e) {
    if ((e.button != null && e.button !== 0)) return;
    var self = this, st = this.st, C = LightLeakCore, g = e.target.closest ? e.target.closest('[data-pid]') : null, pid = g ? g.getAttribute('data-pid') : null;
    var x0 = e.clientX, y0 = e.clientY, p0 = this._benchPt(e);
    if (!pid) {
      if (st.sel && !st.done) {
        var src = st.sel.indexOf('spare') === 0 ? { slot: +st.sel.slice(5) } : { kind: st.sel }, s = this._srcOf(src);
        if (C.canDrop(st, s.kind) && !(s.slot != null && st.spares[s.slot].used)) { var r = this._place(s, p0.x, p0.y); if (r === 'placed') { if (!(st.tray[s.kind] > 0) || s.slot != null) st.sel = null; this._moved(); } }
      }
      return;
    }
    if (st.done && !st.free) return;
    var piece = (function () { for (var i = 0; i < st.placed.length; i++) if (st.placed[i].id === pid) return st.placed[i]; return null; })();
    if (!piece || piece.locked) return;
    e.preventDefault();
    var drag = { moved: false };
    var move = function (ev) {
      if (!drag.moved && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 8) return;
      drag.moved = true; self._drag = drag;
      var b = self._benchPt(ev), m = self._toModel(self._dims(), b.x, b.y), s = { kind: piece.kind, rot: piece.rot || 0, flip: piece.flip || 0 };
      self._view.preview = b.inside ? (st.grid === 'tri' ? self._snapPreviewTri(s, m) : self._snapPreviewTan(s, m)) : null;
      self._repaintBench();
    };
    var up = function (ev) {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      self._drag = null; self._view.preview = null;
      if (!drag.moved) { if (C.turnPiece(st, pid, self._within(self._dims())) === 'turned') self.api.sound(620); self._moved(); return; }
      var b = self._benchPt(ev);
      if (b.inside) { var r = self._place({ kind: piece.kind, rot: piece.rot || 0, flip: piece.flip || 0 }, b.x, b.y, piece); if (r === 'out') { self._moved(); return; } }
      else { C.takeOut(st, pid); self.api.sound(300); }
      self._moved();
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  },
  /* the keyboard on the bench: arrows move a cursor, Enter drops the chosen piece, R turns, F flips, Delete takes the last piece back */
  _benchKey: function (e) {
    var st = this.st, C = LightLeakCore, k = e.key, D = this._dims();
    if (!this._cursor) { var c = st.grid === 'tri' ? C.triCentre(st.R.cells) : C.polyCentre(st.R.poly); this._cursor = c.slice(); }
    var step = st.grid === 'tri' ? 0.5 : 0.5;
    if (k === 'ArrowLeft') this._cursor[0] -= step; else if (k === 'ArrowRight') this._cursor[0] += step;
    else if (k === 'ArrowUp') this._cursor[1] -= step; else if (k === 'ArrowDown') this._cursor[1] += step;
    else if (k === 'Enter' || k === ' ') {
      if (st.sel) { var src = st.sel.indexOf('spare') === 0 ? { slot: +st.sel.slice(5) } : { kind: st.sel }, s = this._srcOf(src), q = this._px(D, this._cursor); if (C.canDrop(st, s.kind)) { if (this._place(s, q[0], q[1]) === 'placed') this._moved(); } }
      e.preventDefault(); return;
    } else if (k === 'r' || k === 'R') { if (st.sel) { if (st.sel.indexOf('spare') === 0) C.turnSpare(st, +st.sel.slice(5)); else C.turnTray(st, st.sel); } }
    else if (k === 'f' || k === 'F') { if (st.sel) { if (st.sel.indexOf('spare') === 0) C.flipSpare(st, +st.sel.slice(5)); else C.flipTray(st, st.sel); } }
    else if (k === 'Delete' || k === 'Backspace') { var own = C.own(st); if (own.length && !st.done) { C.takeOut(st, own[own.length - 1].id); this._moved(); } e.preventDefault(); return; }
    else return;
    e.preventDefault(); this._paint();
  },
  _pane: function (i) { var st = this.st; if (st.done) return; LightLeakCore.setPane(st, st.pane === i ? null : i); this.api.sound(st.pane == null ? 300 : 760); this._moved(); },
  /* any move: the help is taken away until the next Check; the live region reads the light */
  _moved: function () { if (!this.st.done) this._clearShowing(); this._paint(); this._live(); },
  _endDrag: function () { var d = this._drag; if (!d) return; if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost); this._drag = null; },

  /* ---------------- Check ---------------- */
  _check: function () {
    var C = LightLeakCore, st = this.st, v = this._view, self = this, R = st.R;
    if (st.done) return;
    var a = C.check(st);
    if (a.result === 'tray') { this.api.sound(200); v.note = this._t(C.hint(st).key); v.blaze = false; this._paint(); this.api.announce(v.note); return; }
    if (a.result === 'ok') {
      v.showing = false; v.blaze = false; v.ghost = null; v.note = '';
      if (R.cog === 'build' || R.cog === 'exact' || R.cog === 'new' || R.cog === 'tri' || R.cog === 'grow' || R.cog === 'bar' || R.kind === 'build') this._memory[R.id] = st.placed.map(function (p) { return { kind: p.kind, cells: p.cells }; });
      if (R.spares) v.ok = this._t('okHole');
      else if (R.kind === 'shadow') v.ok = this._t('okShadow');
      else {
        var counts = {}; st.placed.forEach(function (p) { if (!p.locked) counts[p.kind] = (counts[p.kind] || 0) + 1; });
        var lead = R.cog === 'new' ? this._t(R.target === 'hexagon' ? 'okNewHexagon' : 'okNewPara') : this._t(this.OKT[R.target]);
        v.ok = lead + ' ' + this._t('usedList', { list: this._list(counts) });
      }
      st.free = true;
      this._garland.push({ svg: this._miniLantern() });
      this.api.sound(880); this._paint(); this._live(); this.api.announce(v.ok);
      this._advance(v.ok.length * 60 + 3600);
      return;
    }
    this.api.sound(220);
    var hk = C.hint(st);
    v.showing = true; v.blaze = true; v.note = this._t(hk.key);
    v.ghost = st.show >= 2 ? C.ghost(st) : null;
    v.glowSlot = st.show >= 2 && (R.spares || R.kind === 'shadow') ? st.right : null;
    if (st.show >= 2 && a.kind === 'same') v.blink = true;
    this._paint(); this._live(); this.api.announce(v.note);
  },
  /* a miniature of the sealed lantern for the garland (drawn in its own little box) */
  _miniLantern: function () {
    var C = LightLeakCore, st = this.st, self = this, pieces = st.placed.slice();
    if (st.pane != null) pieces = pieces.concat(C.paneInFrame(st));
    var pts = this._targetPts().map(function (p) { return self._mapRaw(p); }), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    pts.forEach(function (q) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); });
    var grid = st.grid, frame = st.R.frame, clear = this._clear();
    var snap = pieces.map(function (p, i) { return { kind: p.kind, set: C.pieceSet(st, p), colour: self._colourOf(p, i) }; });
    return function (size) {
      var sc = Math.min(size / (x1 - x0), size / (y1 - y0)), D = { ox: (size - (x1 - x0) * sc) / 2 - x0 * sc, oy: (size - (y1 - y0) * sc) / 2 - y0 * sc, s: sc };
      var keep = self.st, fake = { grid: grid, R: { frame: frame } }; self.st = fake;
      var out = snap.map(function (p) { return '<path d="' + p.set.map(function (k) { return self._path(D, self._cellPoly(k)); }).join('') + '" fill="' + p.colour + '" stroke="#2A3B47" stroke-width=".6"/>'; }).join('');
      self.st = keep; void clear;
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' + out + '</svg>';
    };
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function f1(x) { return Math.round(x * 10) / 10; }
function f3(x) { return Math.round(x * 1000) / 1000; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function flipIcon() { return '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><line x1="13" y1="3" x2="13" y2="23" stroke="#2A3B47" stroke-width="2" stroke-dasharray="3 3"/><path d="M10 7 L3 13 L10 19Z" fill="#146B5E"/><path d="M16 7 L23 13 L16 19Z" fill="none" stroke="#146B5E" stroke-width="2"/></svg>'; }
function autoIcon() { return '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8a5 5 0 1 1-2-4" fill="none" stroke="#146B5E" stroke-width="2"/><path d="M12 1v4h-4" fill="none" stroke="#146B5E" stroke-width="2"/></svg>'; }
function injectLightLeakCSS() {
  if (typeof document === 'undefined' || document.getElementById('ll-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ll-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .ll-wrap:focus{outline:none;} .ll-wrap.is-narrow{gap:8px;} .ll-wrap.is-tiny{gap:6px;}'
  + '.ll-garland{width:100%;line-height:0;}'
  + '.ll-work{display:flex;gap:14px;align-items:flex-start;justify-content:center;width:100%;} .ll-wrap.is-narrow .ll-work{flex-direction:column;align-items:center;gap:8px;}'
  + '.ll-benchbox{flex:0 0 auto;line-height:0;border-radius:12px;} .ll-benchbox:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}'
  + '.ll-bench{display:block;touch-action:none;cursor:pointer;}'
  + '.ll-glow{fill:#FFF6CC;filter:drop-shadow(0 0 6px #FFD54A);} .ll-glow.is-blaze{fill:#FFFBE6;animation:llBlaze .75s ease-in-out 2;} @keyframes llBlaze{0%,100%{fill:#FFF6CC;}50%{fill:#FFFFFF;}}'
  + '.ll-shadow{fill:#2A3B47;fill-opacity:.28;} .ll-shadow.is-dark{fill-opacity:.5;}'
  + '.ll-frame{fill:none;stroke:#2A3B47;stroke-width:5;stroke-linejoin:round;stroke-linecap:round;}'
  + '.ll-seam{fill:none;stroke:#EEF3F6;stroke-width:2.2;stroke-linecap:round;animation:llEtch .5s ease-out;} @keyframes llEtch{0%{stroke-opacity:0;}100%{stroke-opacity:1;}}'
  + '.ll-oldseam{fill:none;stroke:#FFFFFF;stroke-width:2.4;stroke-opacity:.75;stroke-dasharray:4 4;stroke-linecap:round;} .ll-oldseam.is-blink{stroke:#146B5E;stroke-opacity:1;animation:llBlink .8s ease-in-out 3;} @keyframes llBlink{50%{stroke-opacity:.15;}}'
  + '.ll-glow,.ll-shadow,.ll-frame,.ll-seam,.ll-oldseam,.ll-cursor,.ll-flame,.ll-glass-back{pointer-events:none;}'
  + '.ll-ghost{pointer-events:none;} .ll-piece{cursor:grab;} .ll-piece.is-locked{cursor:default;}'
  + '.ll-cursor{fill:none;stroke:#146B5E;stroke-width:3;}'
  + '.ll-flame{fill:#F2C230;stroke:#C2410C;stroke-width:1.5;opacity:.8;} .ll-flame.is-on{fill:#FFE58A;filter:drop-shadow(0 0 6px #FFD54A);}'
  + '.ll-wrap.is-done .ll-bench{animation:llGlowUp .6s ease-out;} @keyframes llGlowUp{0%{filter:brightness(1);}50%{filter:brightness(1.18);}100%{filter:brightness(1);}}'
  + '.ll-wrap.is-fast .ll-glow,.ll-wrap.is-fast .ll-seam,.ll-wrap.is-fast .ll-oldseam,.ll-wrap.is-fast .ll-bench,.ll-wrap.is-fast .ll-tile,.ll-wrap.is-fast .ll-pane{animation:none !important;}'
  + '.ll-tray{display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;} .ll-wrap.is-narrow .ll-tray{flex-direction:row;flex-wrap:wrap;gap:8px;}'
  + '.ll-tile,.ll-pane{position:relative;display:flex;align-items:center;justify-content:center;padding:2px;min-width:52px;min-height:52px;border:2px solid #C9B48E;border-radius:14px;background:#FFF8EC;cursor:pointer;touch-action:none;}'
  + '.ll-tile.is-sel,.ll-pane.is-in{border-color:#F4CF62;box-shadow:0 0 0 3px #F4CF62;} .ll-tile.is-empty,.ll-tile.is-used{opacity:.4;} .ll-tile.is-glow,.ll-pane.is-glow{box-shadow:0 0 0 4px #146B5E;animation:llLift .9s ease-in-out 2;} @keyframes llLift{50%{transform:translateY(-6px);}}'
  + '.ll-badge{position:absolute;right:-6px;top:-6px;min-width:24px;height:24px;border-radius:12px;background:#2A3B47;color:#FFF;font-family:' + H + ';font-weight:800;font-size:15px;line-height:24px;text-align:center;}'
  + '.ll-autob{position:absolute;left:-5px;top:-5px;width:20px;height:20px;border-radius:10px;background:#FFF;border:1.5px solid #146B5E;display:flex;align-items:center;justify-content:center;}'
  + '.ll-flip{min-width:48px;min-height:48px;border-radius:12px;border:2px solid #146B5E;background:#FFF;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.ll-ghostdrag{position:fixed;z-index:50;pointer-events:none;width:72px;height:72px;filter:drop-shadow(0 6px 6px rgba(42,59,71,.35));transform:scale(1.08);} .ll-ghostdrag svg{width:72px;height:72px;}'
  + '.ll-foot{display:flex;justify-content:center;width:100%;}'
  + '.ll-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .ll-check:disabled{opacity:.5;cursor:default;}'
  + '.ll-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ll-note.is-hint{color:#8A3B1F;} .ll-wrap.is-narrow .ll-note{font-size:17px;}'
  + '.ll-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.ll-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'll-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.LightLeakActivity = LightLeakActivity;
