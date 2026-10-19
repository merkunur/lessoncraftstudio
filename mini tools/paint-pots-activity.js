/* =====================================================================
   paint-pots-activity.js — ACTIVITY #37 of the one-by-one rebuild:
   "Identify the Shape" (K.G.A.2) → THE PAINT POTS.
   Design sheet: docs/activities-rebuild/designs/037-choice-board.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: dip the brush in a tin and tap a piece — the brush runs
   round its edge leaving a bead on every corner and ticks on equal sides;
   the paint stays WET (nothing is judged at the tap). On Check the paint
   sets: it only stays in a piece that truly is the tin's shape, however
   turned or small; a wrong piece sheds its paint into the puddle, an
   open one leaks through its gap.

   ACTIVITY LAYER ONLY: the model is paint-pots-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.PaintPotsActivity.st / ._order / ._pool / .FAST.
   No library pictures: pieces, tins, beads and ticks are drawn apparatus.
   ===================================================================== */
'use strict';

var PaintPotsActivity = {
  id: 'paint-pots',
  apparatusClasses: ['pp-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:             {en:'Paint the Shapes',de:'Formen anmalen',fr:'Peins les formes',es:'Pinta las figuras',pt:'Pinte as formas',it:'Colora le forme',nl:'Schilder de vormen',sv:'Måla formerna',da:'Mal formerne',no:'Mal formene',fi:'Maalaa muodot'},
    instruction:       {en:'Pick a paint tin and paint every piece that is its shape, then press Check.',de:'Wähle eine Farbdose, male jedes Teil an, das ihre Form hat, und tippe dann auf Prüfen.',fr:'Choisis un pot de peinture, peins chaque pièce qui a sa forme, puis touche Vérifier.',es:'Elige una lata de pintura, pinta cada pieza que tenga su forma y luego toca Revisar.',pt:'Escolha uma lata de tinta, pinte cada peça que tem a forma dela e depois toque em Conferir.',it:'Scegli un barattolo di colore, colora ogni pezzo che ha la sua forma, poi tocca Controlla.',nl:'Kies een verfpot, schilder elk stuk dat zijn vorm heeft en tik dan op Controleren.',sv:'Välj en färgburk, måla varje bit som har dess form och tryck sedan på Kontrollera.',da:'Vælg en malerbøtte, mal hver brik, der har dens form, og tryk så på Tjek.',no:'Velg en malingsboks, mal hver bit som har formen dens, og trykk så på Sjekk.',fi:'Valitse maalipurkki, maalaa jokainen pala, jolla on sen muoto, ja paina sitten Tarkista.'},
    pPicture:          {en:'Pick a tin. Paint every piece that is its shape.',de:'Wähle eine Dose. Male jedes Teil an, das ihre Form hat.',fr:'Choisis un pot. Peins chaque pièce qui a sa forme.',es:'Elige una lata. Pinta cada pieza que tenga su forma.',pt:'Escolha uma lata. Pinte cada peça que tem a forma dela.',it:'Scegli un barattolo. Colora ogni pezzo che ha la sua forma.',nl:'Kies een pot. Schilder elk stuk dat zijn vorm heeft.',sv:'Välj en burk. Måla varje bit som har dess form.',da:'Vælg en bøtte. Mal hver brik, der har dens form.',no:'Velg en boks. Mal hver bit som har formen dens.',fi:'Valitse purkki. Maalaa jokainen pala, jolla on sen muoto.'},
    pCount:            {en:'Paint the triangles and squares. Then say how many.',de:'Male die Dreiecke und Quadrate an. Sag dann, wie viele es sind.',fr:'Peins les triangles et les carrés. Puis dis combien il y en a.',es:'Pinta los triángulos y los cuadrados. Luego di cuántos hay.',pt:'Pinte os triângulos e os quadrados. Depois diga quantos são.',it:'Colora i triangoli e i quadrati. Poi di’ quanti sono.',nl:'Schilder de driehoeken en vierkanten. Zeg dan hoeveel het er zijn.',sv:'Måla trianglarna och kvadraterna. Säg sedan hur många.',da:'Mal trekanterne og kvadraterne. Sig så, hvor mange der er.',no:'Mal trekantene og kvadratene. Si så hvor mange det er.',fi:'Maalaa kolmiot ja neliöt. Kerro sitten, montako niitä on.'},
    pQuiltClue:        {en:'Paint only the real ones for this tin.',de:'Male nur die echten Formen für diese Dose an.',fr:'Peins seulement les vraies formes de ce pot.',es:'Pinta solo las figuras de verdad para esta lata.',pt:'Pinte só as formas de verdade desta lata.',it:'Colora solo le forme vere di questo barattolo.',nl:'Schilder alleen de echte vormen voor deze pot.',sv:'Måla bara de riktiga formerna för den här burken.',da:'Mal kun de rigtige former til denne bøtte.',no:'Mal bare de ekte formene til denne boksen.',fi:'Maalaa vain tämän purkin oikeat muodot.'},
    check:             {en:'Check',de:'Prüfen',fr:'Vérifier',es:'Revisar',pt:'Conferir',it:'Controlla',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    hintStart:         {en:'Pick a tin, then tap every piece that is its shape.',de:'Wähle eine Dose und tippe dann jedes Teil an, das ihre Form hat.',fr:'Choisis un pot, puis touche chaque pièce qui a sa forme.',es:'Elige una lata y luego toca cada pieza que tenga su forma.',pt:'Escolha uma lata e depois toque em cada peça que tem a forma dela.',it:'Scegli un barattolo, poi tocca ogni pezzo che ha la sua forma.',nl:'Kies een pot en tik dan op elk stuk dat zijn vorm heeft.',sv:'Välj en burk och tryck sedan på varje bit som har dess form.',da:'Vælg en bøtte, og tryk så på hver brik, der har dens form.',no:'Velg en boks, og trykk så på hver bit som har formen dens.',fi:'Valitse purkki ja napauta sitten jokaista palaa, jolla on sen muoto.'},
    hintCount:         {en:'How many did you paint? Set the numbers.',de:'Wie viele hast du angemalt? Stell die Zahlen ein.',fr:'Combien en as-tu peint ? Règle les nombres.',es:'¿Cuántas pintaste? Marca los números.',pt:'Quantas você pintou? Marque os números.',it:'Quanti ne hai colorati? Imposta i numeri.',nl:'Hoeveel heb je geschilderd? Stel de getallen in.',sv:'Hur många målade du? Ställ in talen.',da:'Hvor mange malede du? Indstil tallene.',no:'Hvor mange malte du? Still inn tallene.',fi:'Montako maalasit? Aseta luvut.'},
    hintMoreTin:       {en:'There is one more piece for this tin — look for a turned one or a small one.',de:'Für diese Dose fehlt noch ein Teil – such ein gedrehtes oder ein kleines.',fr:'Il reste une pièce pour ce pot : cherches-en une petite ou une qui est tournée.',es:'Falta una pieza para esta lata: busca una girada o una pequeña.',pt:'Falta uma peça para esta lata: procure uma virada ou uma pequena.',it:'Manca ancora un pezzo per questo barattolo: cercane uno girato o piccolo.',nl:'Er is nog één stuk voor deze pot – zoek een gedraaid of een klein stuk.',sv:'Det finns en bit till för den här burken – leta efter en vriden eller en liten.',da:'Der er én brik mere til denne bøtte – kig efter en drejet eller en lille.',no:'Det er én bit til for denne boksen – se etter en vridd eller en liten.',fi:'Tälle purkille on vielä yksi pala – etsi käännetty tai pieni.'},
    hintWrong:         {en:'Count its corners. Does the tin have that many?',de:'Zähl seine Ecken. Hat die Form auf der Dose genauso viele?',fr:'Compte ses sommets. La forme du pot en a-t-elle autant ?',es:'Cuenta sus esquinas. ¿La figura de la lata tiene la misma cantidad?',pt:'Conte os cantos dela. A forma da lata tem a mesma quantidade?',it:'Conta i suoi angoli. La forma sul barattolo ne ha altrettanti?',nl:'Tel de hoeken. Heeft de vorm op de pot er evenveel?',sv:'Räkna hörnen. Har formen på burken lika många?',da:'Tæl hjørnerne. Har formen på bøtten lige så mange?',no:'Tell hjørnene. Har formen på boksen like mange?',fi:'Laske sen kulmat. Onko purkin muodossa yhtä monta?'},
    hintWrongRound:    {en:'Look at its edge. Is it round the same way as the tin?',de:'Schau auf seinen Rand. Ist er so rund wie die Form auf der Dose?',fr:'Regarde son bord. Est-il rond comme la forme du pot ?',es:'Mira su orilla. ¿Es redonda como la figura de la lata?',pt:'Olhe a borda. Ela é redonda como a forma da lata?',it:'Guarda il bordo. È rotondo come la forma sul barattolo?',nl:'Kijk naar de rand. Is die net zo rond als de vorm op de pot?',sv:'Titta på kanten. Är den rund på samma sätt som formen på burken?',da:'Se på kanten. Er den rund på samme måde som formen på bøtten?',no:'Se på kanten. Er den rund på samme måte som formen på boksen?',fi:'Katso sen reunaa. Onko se pyöreä samalla tavalla kuin purkin muoto?'},
    hintLeak:          {en:'That one has a gap — a shape must be closed all the way round.',de:'Das hat eine Lücke – eine Form muss ringsum geschlossen sein.',fr:'Celle-là a une ouverture : une forme doit être fermée tout autour.',es:'Esa tiene un hueco: una figura debe estar cerrada por todos lados.',pt:'Essa tem uma abertura: uma forma precisa ser fechada em toda a volta.',it:'Quello ha un’apertura: una forma deve essere chiusa tutt’intorno.',nl:'Die heeft een opening – een vorm moet helemaal dicht zijn.',sv:'Den har en öppning – en form måste vara sluten hela vägen runt.',da:'Den har et hul – en form skal være lukket hele vejen rundt.',no:'Den har en åpning – en form må være lukket hele veien rundt.',fi:'Siinä on aukko – muodon pitää olla suljettu joka puolelta.'},
    hintSides:         {en:'Look at the ticks. Are all its sides the same length?',de:'Schau auf die Striche. Sind alle Seiten gleich lang?',fr:'Regarde les petits traits. Ses côtés ont-ils tous la même longueur ?',es:'Mira las rayitas. ¿Todos sus lados miden lo mismo?',pt:'Olhe os risquinhos. Todos os lados têm o mesmo tamanho?',it:'Guarda i trattini. I suoi lati sono tutti lunghi uguali?',nl:'Kijk naar de streepjes. Zijn alle zijden even lang?',sv:'Titta på strecken. Är alla sidor lika långa?',da:'Se på stregerne. Er alle siderne lige lange?',no:'Se på strekene. Er alle sidene like lange?',fi:'Katso viivoja. Ovatko kaikki sivut yhtä pitkät?'},
    hintRight:         {en:'Look at its corners. Are they square, like on the tin?',de:'Schau auf die Ecken. Sind es rechte Winkel wie auf der Dose?',fr:'Regarde ses angles. Sont-ils droits, comme sur le pot ?',es:'Mira sus esquinas. ¿Son rectas, como en la lata?',pt:'Olhe os cantos. Eles são retos, como na lata?',it:'Guarda gli angoli. Sono retti, come sul barattolo?',nl:'Kijk naar de hoeken. Zijn ze recht, zoals op de pot?',sv:'Titta på hörnen. Är de räta, som på burken?',da:'Se på hjørnerne. Er de rette, som på bøtten?',no:'Se på hjørnene. Er de rette, som på boksen?',fi:'Katso kulmia. Ovatko ne suoria kuin purkissa?'},
    hintBent:          {en:'A side is bent or a corner is round. The tin’s shape has straight sides and sharp corners.',de:'Eine Seite ist gebogen oder eine Ecke rund. Die Form auf der Dose hat gerade Seiten und scharfe Ecken.',fr:'Un côté est courbé ou un coin est arrondi. La forme du pot a des côtés droits et des coins pointus.',es:'Un lado está curvo o una esquina es redonda. La figura de la lata tiene lados rectos y esquinas en punta.',pt:'Um lado é curvo ou um canto é arredondado. A forma da lata tem lados retos e cantos pontudos.',it:'Un lato è curvo o un angolo è arrotondato. La forma sul barattolo ha lati dritti e angoli a punta.',nl:'Een zijde is gebogen of een hoek is rond. De vorm op de pot heeft rechte zijden en hoeken die niet rond zijn.',sv:'En sida är böjd eller ett hörn är runt. Formen på burken har raka sidor och skarpa hörn.',da:'En side er bøjet, eller et hjørne er rundt. Formen på bøtten har lige sider og skarpe hjørner.',no:'En side er bøyd, eller et hjørne er rundt. Formen på boksen har rette sider og skarpe hjørner.',fi:'Yksi sivu on kaareva tai kulma pyöreä. Purkin muodossa on suorat sivut, eivätkä kulmat ole pyöreitä.'},
    hintCurve:         {en:'This one is round. The tin’s shape has straight sides and corners.',de:'Das hier ist rund. Die Form auf der Dose hat gerade Seiten und Ecken.',fr:'Celle-ci est ronde. La forme du pot a des côtés droits et des sommets.',es:'Esta es redonda. La figura de la lata tiene lados rectos y esquinas.',pt:'Esta é redonda. A forma da lata tem lados retos e cantos.',it:'Questo è rotondo. La forma sul barattolo ha lati dritti e angoli.',nl:'Deze is rond. De vorm op de pot heeft rechte zijden en hoeken.',sv:'Den här är rund. Formen på burken har raka sidor och hörn.',da:'Den her er rund. Formen på bøtten har lige sider og hjørner.',no:'Denne er rund. Formen på boksen har rette sider og hjørner.',fi:'Tämä on pyöreä. Purkin muodossa on suorat sivut ja kulmat.'},
    hintCornersRound:  {en:'This one has corners. Is the tin’s shape round?',de:'Das hier hat Ecken. Ist die Form auf der Dose rund?',fr:'Celle-ci a des sommets. La forme du pot est-elle ronde ?',es:'Esta tiene esquinas. ¿La figura de la lata es redonda?',pt:'Esta tem cantos. A forma da lata é redonda?',it:'Questo ha degli angoli. La forma sul barattolo è rotonda?',nl:'Deze heeft hoeken. Is de vorm op de pot rond?',sv:'Den här har hörn. Är formen på burken rund?',da:'Den her har hjørner. Er formen på bøtten rund?',no:'Denne har hjørner. Er formen på boksen rund?',fi:'Tässä on kulmia. Onko purkin muoto pyöreä?'},
    hintMoreTinRound:  {en:'There is one more piece for this tin — look for a small one.',de:'Für diese Dose fehlt noch ein Teil – such ein kleines.',fr:'Il reste une pièce pour ce pot : cherches-en une petite.',es:'Falta una pieza para esta lata: busca una pequeña.',pt:'Falta uma peça para esta lata: procure uma pequena.',it:'Manca ancora un pezzo per questo barattolo: cercane uno piccolo.',nl:'Er is nog één stuk voor deze pot – zoek een klein stuk.',sv:'Det finns en bit till för den här burken – leta efter en liten.',da:'Der er én brik mere til denne bøtte – kig efter en lille.',no:'Det er én bit til for denne boksen – se etter en liten.',fi:'Tälle purkille on vielä yksi pala – etsi pieni.'},
    ariaCorner1:       {en:'1 corner',de:'1 Ecke',fr:'1 sommet',es:'1 esquina',pt:'1 canto',it:'1 angolo',nl:'1 hoek',sv:'1 hörn',da:'1 hjørne',no:'1 hjørne',fi:'1 kulma'},
    hintGlow:          {en:'Paint the glowing pieces.',de:'Male die leuchtenden Teile an.',fr:'Peins les pièces qui brillent.',es:'Pinta las piezas que brillan.',pt:'Pinte as peças que estão brilhando.',it:'Colora i pezzi illuminati.',nl:'Schilder de stukken die oplichten.',sv:'Måla bitarna som lyser.',da:'Mal de brikker, der lyser.',no:'Mal bitene som lyser.',fi:'Maalaa hehkuvat palat.'},
    hintCountOne:      {en:'Count these pieces one by one.',de:'Zähl diese Teile eins nach dem anderen.',fr:'Compte ces pièces une par une.',es:'Cuenta estas piezas una por una.',pt:'Conte essas peças uma por uma.',it:'Conta questi pezzi uno alla volta.',nl:'Tel deze stukken één voor één.',sv:'Räkna de här bitarna en i taget.',da:'Tæl de her brikker én ad gangen.',no:'Tell disse bitene én om gangen.',fi:'Laske nämä palat yksi kerrallaan.'},
    hintCountNum:      {en:'Count with the numbers.',de:'Zähl mit den Zahlen.',fr:'Compte avec les nombres.',es:'Cuenta con los números.',pt:'Conte com os números.',it:'Conta con i numeri.',nl:'Tel mee met de getallen.',sv:'Räkna med talen.',da:'Tæl med tallene.',no:'Tell med tallene.',fi:'Laske numeroiden avulla.'},
    setLabels:         {en:'Tins show',de:'Auf der Dose',fr:'Sur les pots',es:'En las latas',pt:'Nas latas',it:'Sui barattoli',nl:'Op de potten',sv:'På burkarna',da:'På bøtterne',no:'På boksene',fi:'Purkeissa'},
    lShape:            {en:'the shape',de:'die Form',fr:'la forme',es:'la figura',pt:'a forma',it:'la forma',nl:'de vorm',sv:'formen',da:'formen',no:'formen',fi:'muoto'},
    lName:             {en:'the name',de:'der Name',fr:'le nom',es:'el nombre',pt:'o nome',it:'il nome',nl:'de naam',sv:'namnet',da:'navnet',no:'navnet',fi:'nimi'},
    lClue:             {en:'the clue',de:'der Hinweis',fr:'l’indice',es:'la pista',pt:'a pista',it:'l’indizio',nl:'de hint',sv:'ledtråden',da:'ledetråden',no:'hintet',fi:'vihje'},
    setBoard:          {en:'Board',de:'Bild',fr:'Tableau',es:'Tablero',pt:'Quadro',it:'Quadro',nl:'Bord',sv:'Bild',da:'Billede',no:'Bilde',fi:'Kuva'},
    bPicture:          {en:'shape pictures',de:'Formenbilder',fr:'images en formes',es:'dibujos de figuras',pt:'desenhos de formas',it:'disegni di forme',nl:'vormplaatjes',sv:'formbilder',da:'formbilleder',no:'formbilder',fi:'muotokuvat'},
    bQuilt:            {en:'real or not',de:'echt oder nicht',fr:'vraie ou pas',es:'¿de verdad o no?',pt:'de verdade ou não',it:'vera o no',nl:'echt of niet',sv:'riktig eller inte',da:'rigtig eller ej',no:'ekte eller ikke',fi:'oikea vai ei'},
    bCount:            {en:'count',de:'zählen',fr:'compter',es:'contar',pt:'contar',it:'contare',nl:'tellen',sv:'räkna',da:'tælle',no:'telle',fi:'laske'},
    ariaPiece:         {en:'piece {k} of {n}',de:'Teil {k} von {n}',fr:'pièce {k} sur {n}',es:'pieza {k} de {n}',pt:'peça {k} de {n}',it:'pezzo {k} di {n}',nl:'stuk {k} van {n}',sv:'bit {k} av {n}',da:'brik {k} af {n}',no:'bit {k} av {n}',fi:'pala {k}/{n}'},
    ariaPainted:       {en:'painted',de:'angemalt',fr:'peinte',es:'pintada',pt:'pintada',it:'colorato',nl:'geschilderd',sv:'målad',da:'malet',no:'malt',fi:'maalattu'},
    ariaBare:          {en:'not painted',de:'nicht angemalt',fr:'pas peinte',es:'sin pintar',pt:'sem pintura',it:'non colorato',nl:'niet geschilderd',sv:'inte målad',da:'ikke malet',no:'ikke malt',fi:'maalaamaton'},
    ariaCorners:       {en:'{n} corners',de:'{n} Ecken',fr:'{n} sommets',es:'{n} esquinas',pt:'{n} cantos',it:'{n} angoli',nl:'{n} hoeken',sv:'{n} hörn',da:'{n} hjørner',no:'{n} hjørner',fi:'{n} kulmaa'},
    ariaRound:         {en:'round, no corners',de:'rund, keine Ecken',fr:'rond, pas de sommet',es:'redonda, sin esquinas',pt:'redonda, sem cantos',it:'rotondo, senza angoli',nl:'rond, geen hoeken',sv:'rund, inga hörn',da:'rund, ingen hjørner',no:'rund, ingen hjørner',fi:'pyöreä, ei kulmia'},
    ariaTin:           {en:'paint tin',de:'Farbdose',fr:'pot de peinture',es:'lata de pintura',pt:'lata de tinta',it:'barattolo di colore',nl:'verfpot',sv:'färgburk',da:'malerbøtte',no:'malingsboks',fi:'maalipurkki'},
    ariaMore:          {en:'one more',de:'eins mehr',fr:'un de plus',es:'uno más',pt:'mais um',it:'uno in più',nl:'één erbij',sv:'en till',da:'én mere',no:'én til',fi:'yksi lisää'},
    ariaLess:          {en:'one fewer',de:'eins weniger',fr:'un de moins',es:'uno menos',pt:'menos um',it:'uno in meno',nl:'één eraf',sv:'en mindre',da:'én mindre',no:'én mindre',fi:'yksi vähemmän'},
    n_circle:          {en:'circle',de:'Kreis',fr:'cercle',es:'círculo',pt:'círculo',it:'cerchio',nl:'cirkel',sv:'cirkel',da:'cirkel',no:'sirkel',fi:'ympyrä'},
    clue_circle:       {en:'I am round. Every part of my edge is the same distance from my middle.',de:'Ich bin rund. Mein Rand ist überall gleich weit von meiner Mitte entfernt.',fr:'Je suis rond. Mon bord est partout à la même distance de mon centre.',es:'Soy redondo. Toda mi orilla está igual de lejos de mi centro.',pt:'Sou redondo. Toda a minha borda fica à mesma distância do meu centro.',it:'Sono rotondo. Il mio bordo è ovunque alla stessa distanza dal centro.',nl:'Ik ben rond. Mijn rand is overal even ver van mijn midden.',sv:'Jag är rund. Min kant är lika långt från mitten överallt.',da:'Jeg er rund. Min kant er lige langt fra midten hele vejen rundt.',no:'Jeg er rund. Kanten min er like langt fra midten hele veien rundt.',fi:'Olen pyöreä. Reunani on joka kohdasta yhtä kaukana keskeltä.'},
    hintMore_circle:   {en:'There is one more circle — look for a small one.',de:'Da ist noch ein Kreis – such einen kleinen.',fr:'Il reste un cercle : cherches-en un petit.',es:'Falta un círculo: busca uno pequeño.',pt:'Falta um círculo: procure um pequeno.',it:'Manca ancora un cerchio: cercane uno piccolo.',nl:'Er is nog één cirkel – zoek een kleine.',sv:'Det finns en cirkel till – leta efter en liten.',da:'Der er én cirkel mere – kig efter en lille.',no:'Det er én sirkel til – se etter en liten.',fi:'Vielä yksi ympyrä puuttuu – etsi pieni.'},
    n_square:          {en:'square',de:'Quadrat',fr:'carré',es:'cuadrado',pt:'quadrado',it:'quadrato',nl:'vierkant',sv:'kvadrat',da:'kvadrat',no:'kvadrat',fi:'neliö'},
    clue_square:       {en:'I have 4 sides, all the same length, and 4 corners like the corner of a book.',de:'Ich habe 4 gleich lange Seiten und 4 rechte Winkel.',fr:'J’ai 4 côtés de la même longueur et 4 angles droits.',es:'Tengo 4 lados del mismo largo y 4 esquinas rectas.',pt:'Tenho 4 lados do mesmo tamanho e 4 cantos retos.',it:'Ho 4 lati lunghi uguali e 4 angoli retti.',nl:'Ik heb 4 even lange zijden en 4 rechte hoeken.',sv:'Jag har 4 lika långa sidor och 4 räta hörn.',da:'Jeg har 4 lige lange sider og 4 rette vinkler.',no:'Jeg har 4 like lange sider og 4 rette vinkler.',fi:'Minulla on 4 yhtä pitkää sivua ja 4 suoraa kulmaa.'},
    hintMore_square:   {en:'There is one more square — look for a turned one or a small one.',de:'Da ist noch ein Quadrat – such ein gedrehtes oder ein kleines.',fr:'Il reste un carré : cherches-en un petit ou un qui est tourné.',es:'Falta un cuadrado: busca uno girado o uno pequeño.',pt:'Falta um quadrado: procure um virado ou um pequeno.',it:'Manca ancora un quadrato: cercane uno girato o piccolo.',nl:'Er is nog één vierkant – zoek een gedraaid of een klein vierkant.',sv:'Det finns en kvadrat till – leta efter en vriden eller en liten.',da:'Der er ét kvadrat mere – kig efter et drejet eller et lille.',no:'Det er ett kvadrat til – se etter et vridd eller et lite.',fi:'Vielä yksi neliö puuttuu – etsi käännetty tai pieni.'},
    n_triangle:        {en:'triangle',de:'Dreieck',fr:'triangle',es:'triángulo',pt:'triângulo',it:'triangolo',nl:'driehoek',sv:'triangel',da:'trekant',no:'trekant',fi:'kolmio'},
    clue_triangle:     {en:'I have 3 straight sides and 3 corners.',de:'Ich habe 3 gerade Seiten und 3 Ecken.',fr:'J’ai 3 côtés droits et 3 sommets.',es:'Tengo 3 lados rectos y 3 esquinas.',pt:'Tenho 3 lados retos e 3 cantos.',it:'Ho 3 lati dritti e 3 angoli.',nl:'Ik heb 3 rechte zijden en 3 hoeken.',sv:'Jag har 3 raka sidor och 3 hörn.',da:'Jeg har 3 lige sider og 3 hjørner.',no:'Jeg har 3 rette sider og 3 hjørner.',fi:'Minulla on 3 suoraa sivua ja 3 kulmaa.'},
    hintMore_triangle: {en:'There is one more triangle — look for a turned one or a small one.',de:'Da ist noch ein Dreieck – such ein gedrehtes oder ein kleines.',fr:'Il reste un triangle : cherches-en un petit ou un qui est tourné.',es:'Falta un triángulo: busca uno girado o uno pequeño.',pt:'Falta um triângulo: procure um virado ou um pequeno.',it:'Manca ancora un triangolo: cercane uno girato o piccolo.',nl:'Er is nog één driehoek – zoek een gedraaide of een kleine.',sv:'Det finns en triangel till – leta efter en vriden eller en liten.',da:'Der er én trekant mere – kig efter en drejet eller en lille.',no:'Det er én trekant til – se etter en vridd eller en liten.',fi:'Vielä yksi kolmio puuttuu – etsi käännetty tai pieni.'},
    n_rectangle:       {en:'rectangle',de:'Rechteck',fr:'rectangle',es:'rectángulo',pt:'retângulo',it:'rettangolo',nl:'rechthoek',sv:'rektangel',da:'rektangel',no:'rektangel',fi:'suorakulmio'},
    clue_rectangle:    {en:'I have 4 square corners. My opposite sides match.',de:'Ich habe 4 rechte Winkel. Gegenüberliegende Seiten sind gleich lang.',fr:'J’ai 4 angles droits. Mes côtés opposés ont la même longueur.',es:'Tengo 4 esquinas rectas. Mis lados de enfrente son iguales.',pt:'Tenho 4 cantos retos. Meus lados opostos são iguais.',it:'Ho 4 angoli retti. I miei lati opposti sono uguali.',nl:'Ik heb 4 rechte hoeken. Mijn overstaande zijden zijn even lang.',sv:'Jag har 4 räta hörn. Mina motsatta sidor är lika långa.',da:'Jeg har 4 rette vinkler. Mine modsatte sider er lige lange.',no:'Jeg har 4 rette vinkler. Sidene mine som står mot hverandre, er like lange.',fi:'Minulla on 4 suoraa kulmaa. Vastakkaiset sivuni ovat yhtä pitkät.'},
    hintMore_rectangle:{en:'There is one more rectangle — look for a turned one or a small one.',de:'Da ist noch ein Rechteck – such ein gedrehtes oder ein kleines.',fr:'Il reste un rectangle : cherches-en un petit ou un qui est tourné.',es:'Falta un rectángulo: busca uno girado o uno pequeño.',pt:'Falta um retângulo: procure um virado ou um pequeno.',it:'Manca ancora un rettangolo: cercane uno girato o piccolo.',nl:'Er is nog één rechthoek – zoek een gedraaide of een kleine.',sv:'Det finns en rektangel till – leta efter en vriden eller en liten.',da:'Der er ét rektangel mere – kig efter et drejet eller et lille.',no:'Det er ett rektangel til – se etter et vridd eller et lite.',fi:'Vielä yksi suorakulmio puuttuu – etsi käännetty tai pieni.'},
    n_hexagon:         {en:'hexagon',de:'Sechseck',fr:'hexagone',es:'hexágono',pt:'hexágono',it:'esagono',nl:'zeshoek',sv:'sexhörning',da:'sekskant',no:'sekskant',fi:'kuusikulmio'},
    clue_hexagon:      {en:'I have 6 straight sides and 6 corners.',de:'Ich habe 6 gerade Seiten und 6 Ecken.',fr:'J’ai 6 côtés droits et 6 sommets.',es:'Tengo 6 lados rectos y 6 esquinas.',pt:'Tenho 6 lados retos e 6 cantos.',it:'Ho 6 lati dritti e 6 angoli.',nl:'Ik heb 6 rechte zijden en 6 hoeken.',sv:'Jag har 6 raka sidor och 6 hörn.',da:'Jeg har 6 lige sider og 6 hjørner.',no:'Jeg har 6 rette sider og 6 hjørner.',fi:'Minulla on 6 suoraa sivua ja 6 kulmaa.'},
    hintMore_hexagon:  {en:'There is one more hexagon — look for a turned one or a small one.',de:'Da ist noch ein Sechseck – such ein gedrehtes oder ein kleines.',fr:'Il reste un hexagone : cherches-en un petit ou un qui est tourné.',es:'Falta un hexágono: busca uno girado o uno pequeño.',pt:'Falta um hexágono: procure um virado ou um pequeno.',it:'Manca ancora un esagono: cercane uno girato o piccolo.',nl:'Er is nog één zeshoek – zoek een gedraaide of een kleine.',sv:'Det finns en sexhörning till – leta efter en vriden eller en liten.',da:'Der er én sekskant mere – kig efter en drejet eller en lille.',no:'Det er én sekskant til – se etter en vridd eller en liten.',fi:'Vielä yksi kuusikulmio puuttuu – etsi käännetty tai pieni.'},
    n_oval:            {en:'oval',de:'Oval',fr:'ovale',es:'óvalo',pt:'oval',it:'ovale',nl:'ovaal',sv:'oval',da:'oval',no:'oval',fi:'soikio'},
    clue_oval:         {en:'I am round, but longer one way.',de:'Ich bin rund, aber in eine Richtung länger.',fr:'Je suis rond, mais plus long dans un sens.',es:'Soy redondo, pero más largo hacia un lado.',pt:'Sou redondo, mas mais comprido para um lado.',it:'Sono rotondo, ma più lungo da una parte.',nl:'Ik ben rond, maar de ene kant op langer.',sv:'Jag är rund, men längre åt ena hållet.',da:'Jeg er rund, men længere den ene vej.',no:'Jeg er rund, men lengre den ene veien.',fi:'Olen pyöreä, mutta toiseen suuntaan pidempi.'},
    hintMore_oval:     {en:'There is one more oval — look for a turned one or a small one.',de:'Da ist noch ein Oval – such ein gedrehtes oder ein kleines.',fr:'Il reste un ovale : cherches-en un petit ou un qui est tourné.',es:'Falta un óvalo: busca uno girado o uno pequeño.',pt:'Falta um oval: procure um virado ou um pequeno.',it:'Manca ancora un ovale: cercane uno girato o piccolo.',nl:'Er is nog één ovaal – zoek een gedraaid of een klein ovaal.',sv:'Det finns en oval till – leta efter en vriden eller en liten.',da:'Der er én oval mere – kig efter en drejet eller en lille.',no:'Det er én oval til – se etter en vridd eller en liten.',fi:'Vielä yksi soikio puuttuu – etsi käännetty tai pieni.'},
    n_star:            {en:'star',de:'Stern',fr:'étoile',es:'estrella',pt:'estrela',it:'stella',nl:'ster',sv:'stjärna',da:'stjerne',no:'stjerne',fi:'tähti'},
    clue_star:         {en:'I have 5 points.',de:'Ich habe 5 Zacken.',fr:'J’ai 5 pointes.',es:'Tengo 5 picos.',pt:'Tenho 5 pontas.',it:'Ho 5 punte.',nl:'Ik heb 5 punten.',sv:'Jag har 5 uddar.',da:'Jeg har 5 takker.',no:'Jeg har 5 tagger.',fi:'Minulla on 5 sakaraa.'},
    hintMore_star:     {en:'There is one more star — look for a turned one or a small one.',de:'Da ist noch ein Stern – such einen gedrehten oder einen kleinen.',fr:'Il reste une étoile : cherches-en une petite ou une qui est tournée.',es:'Falta una estrella: busca una girada o una pequeña.',pt:'Falta uma estrela: procure uma virada ou uma pequena.',it:'Manca ancora una stella: cercane una girata o piccola.',nl:'Er is nog één ster – zoek een gedraaide of een kleine.',sv:'Det finns en stjärna till – leta efter en vriden eller en liten.',da:'Der er én stjerne mere – kig efter en drejet eller en lille.',no:'Det er én stjerne til – se etter en vridd eller en liten.',fi:'Vielä yksi tähti puuttuu – etsi käännetty tai pieni.'},
    n_diamond:         {en:'diamond',de:'Raute',fr:'losange',es:'rombo',pt:'losango',it:'rombo',nl:'ruit',sv:'romb',da:'rombe',no:'rombe',fi:'vinoneliö'},
    clue_diamond:      {en:'I have 4 sides, all the same length, but my corners are not square.',de:'Ich habe 4 gleich lange Seiten, aber keine rechten Winkel.',fr:'J’ai 4 côtés de la même longueur, mais pas d’angle droit.',es:'Tengo 4 lados del mismo largo, pero mis esquinas no son rectas.',pt:'Tenho 4 lados do mesmo tamanho, mas meus cantos não são retos.',it:'Ho 4 lati lunghi uguali, ma i miei angoli non sono retti.',nl:'Ik heb 4 even lange zijden, maar geen rechte hoeken.',sv:'Jag har 4 lika långa sidor, men inga räta hörn.',da:'Jeg har 4 lige lange sider, men ingen rette vinkler.',no:'Jeg har 4 like lange sider, men ingen rette vinkler.',fi:'Minulla on 4 yhtä pitkää sivua, mutta kulmani eivät ole suoria.'},
    hintMore_diamond:  {en:'There is one more diamond — look for a turned one or a small one.',de:'Da ist noch eine Raute – such eine gedrehte oder eine kleine.',fr:'Il reste un losange : cherches-en un petit ou un qui est tourné.',es:'Falta un rombo: busca uno girado o uno pequeño.',pt:'Falta um losango: procure um virado ou um pequeno.',it:'Manca ancora un rombo: cercane uno girato o piccolo.',nl:'Er is nog één ruit – zoek een gedraaide of een kleine.',sv:'Det finns en romb till – leta efter en vriden eller en liten.',da:'Der er én rombe mere – kig efter en drejet eller en lille.',no:'Det er én rombe til – se etter en vridd eller en liten.',fi:'Vielä yksi vinoneliö puuttuu – etsi käännetty tai pieni.'},
    n_heart:           {en:'heart',de:'Herz',fr:'cœur',es:'corazón',pt:'coração',it:'cuore',nl:'hart',sv:'hjärta',da:'hjerte',no:'hjerte',fi:'sydän'},
    clue_heart:        {en:'I have two round bumps and one point.',de:'Ich habe zwei runde Bögen und eine Spitze.',fr:'J’ai deux bosses arrondies et une pointe.',es:'Tengo dos bultos redondos y un pico.',pt:'Tenho duas partes redondas e uma ponta.',it:'Ho due gobbe rotonde e una punta.',nl:'Ik heb twee ronde bolletjes en één punt.',sv:'Jag har två runda bågar och en spets.',da:'Jeg har to runde buer og én spids.',no:'Jeg har to runde buer og én spiss.',fi:'Minulla on kaksi pyöreää kaarta ja yksi kärki.'},
    hintMore_heart:    {en:'There is one more heart — look for a turned one or a small one.',de:'Da ist noch ein Herz – such ein gedrehtes oder ein kleines.',fr:'Il reste un cœur : cherches-en un petit ou un qui est tourné.',es:'Falta un corazón: busca uno girado o uno pequeño.',pt:'Falta um coração: procure um virado ou um pequeno.',it:'Manca ancora un cuore: cercane uno girato o piccolo.',nl:'Er is nog één hart – zoek een gedraaid of een klein hart.',sv:'Det finns ett hjärta till – leta efter ett vridet eller ett litet.',da:'Der er ét hjerte mere – kig efter et drejet eller et lille.',no:'Det er ett hjerte til – se etter et vridd eller et lite.',fi:'Vielä yksi sydän puuttuu – etsi käännetty tai pieni.'},
    n_pentagon:        {en:'pentagon',de:'Fünfeck',fr:'pentagone',es:'pentágono',pt:'pentágono',it:'pentagono',nl:'vijfhoek',sv:'femhörning',da:'femkant',no:'femkant',fi:'viisikulmio'},
    clue_pentagon:     {en:'I have 5 straight sides and 5 corners.',de:'Ich habe 5 gerade Seiten und 5 Ecken.',fr:'J’ai 5 côtés droits et 5 sommets.',es:'Tengo 5 lados rectos y 5 esquinas.',pt:'Tenho 5 lados retos e 5 cantos.',it:'Ho 5 lati dritti e 5 angoli.',nl:'Ik heb 5 rechte zijden en 5 hoeken.',sv:'Jag har 5 raka sidor och 5 hörn.',da:'Jeg har 5 lige sider og 5 hjørner.',no:'Jeg har 5 rette sider og 5 hjørner.',fi:'Minulla on 5 suoraa sivua ja 5 kulmaa.'},
    hintMore_pentagon: {en:'There is one more pentagon — look for a turned one or a small one.',de:'Da ist noch ein Fünfeck – such ein gedrehtes oder ein kleines.',fr:'Il reste un pentagone : cherches-en un petit ou un qui est tourné.',es:'Falta un pentágono: busca uno girado o uno pequeño.',pt:'Falta um pentágono: procure um virado ou um pequeno.',it:'Manca ancora un pentagono: cercane uno girato o piccolo.',nl:'Er is nog één vijfhoek – zoek een gedraaide of een kleine.',sv:'Det finns en femhörning till – leta efter en vriden eller en liten.',da:'Der er én femkant mere – kig efter en drejet eller en lille.',no:'Det er én femkant til – se etter en vridd eller en liten.',fi:'Vielä yksi viisikulmio puuttuu – etsi käännetty tai pieni.'},
    pQuilt_triangle:   {en:'Paint only the real triangles.',de:'Male nur die echten Dreiecke an.',fr:'Peins seulement les vrais triangles.',es:'Pinta solo los triángulos de verdad.',pt:'Pinte só os triângulos de verdade.',it:'Colora solo i triangoli veri.',nl:'Schilder alleen de echte driehoeken.',sv:'Måla bara de riktiga trianglarna.',da:'Mal kun de rigtige trekanter.',no:'Mal bare de ekte trekantene.',fi:'Maalaa vain oikeat kolmiot.'},
    pQuilt_rectangle:  {en:'Paint only the real rectangles.',de:'Male nur die echten Rechtecke an.',fr:'Peins seulement les vrais rectangles.',es:'Pinta solo los rectángulos de verdad.',pt:'Pinte só os retângulos de verdade.',it:'Colora solo i rettangoli veri.',nl:'Schilder alleen de echte rechthoeken.',sv:'Måla bara de riktiga rektanglarna.',da:'Mal kun de rigtige rektangler.',no:'Mal bare de ekte rektanglene.',fi:'Maalaa vain oikeat suorakulmiot.'},
    pQuilt_square:     {en:'Paint only the real squares.',de:'Male nur die echten Quadrate an.',fr:'Peins seulement les vrais carrés.',es:'Pinta solo los cuadrados de verdad.',pt:'Pinte só os quadrados de verdade.',it:'Colora solo i quadrati veri.',nl:'Schilder alleen de echte vierkanten.',sv:'Måla bara de riktiga kvadraterna.',da:'Mal kun de rigtige kvadrater.',no:'Mal bare de ekte kvadratene.',fi:'Maalaa vain oikeat neliöt.'},
    pQuilt_circle:     {en:'Paint only the real circles.',de:'Male nur die echten Kreise an.',fr:'Peins seulement les vrais cercles.',es:'Pinta solo los círculos de verdad.',pt:'Pinte só os círculos de verdade.',it:'Colora solo i cerchi veri.',nl:'Schilder alleen de echte cirkels.',sv:'Måla bara de riktiga cirklarna.',da:'Mal kun de rigtige cirkler.',no:'Mal bare de ekte sirklene.',fi:'Maalaa vain oikeat ympyrät.'},
    pQuilt_hexagon:    {en:'Paint only the real hexagons.',de:'Male nur die echten Sechsecke an.',fr:'Peins seulement les vrais hexagones.',es:'Pinta solo los hexágonos de verdad.',pt:'Pinte só os hexágonos de verdade.',it:'Colora solo gli esagoni veri.',nl:'Schilder alleen de echte zeshoeken.',sv:'Måla bara de riktiga sexhörningarna.',da:'Mal kun de rigtige sekskanter.',no:'Mal bare de ekte sekskantene.',fi:'Maalaa vain oikeat kuusikulmiot.'},
    ok_house:          {en:'Yes — 2 triangles and 4 squares!',de:'Ja – 2 Dreiecke und 4 Quadrate!',fr:'Oui, 2 triangles et 4 carrés !',es:'¡Sí! 2 triángulos y 4 cuadrados.',pt:'Isso! 2 triângulos e 4 quadrados!',it:'Sì! 2 triangoli e 4 quadrati!',nl:'Ja! 2 driehoeken en 4 vierkanten!',sv:'Ja – 2 trianglar och 4 kvadrater!',da:'Ja – 2 trekanter og 4 kvadrater!',no:'Ja – 2 trekanter og 4 kvadrater!',fi:'Kyllä – 2 kolmiota ja 4 neliötä!'},
    ok_rocket:         {en:'Yes — 2 circles and 4 triangles!',de:'Ja – 2 Kreise und 4 Dreiecke!',fr:'Oui, 2 cercles et 4 triangles !',es:'¡Sí! 2 círculos y 4 triángulos.',pt:'Isso! 2 círculos e 4 triângulos!',it:'Sì! 2 cerchi e 4 triangoli!',nl:'Ja! 2 cirkels en 4 driehoeken!',sv:'Ja – 2 cirklar och 4 trianglar!',da:'Ja – 2 cirkler og 4 trekanter!',no:'Ja – 2 sirkler og 4 trekanter!',fi:'Kyllä – 2 ympyrää ja 4 kolmiota!'},
    ok_fish:           {en:'Yes — 3 ovals and 3 triangles!',de:'Ja – 3 Ovale und 3 Dreiecke!',fr:'Oui, 3 ovales et 3 triangles !',es:'¡Sí! 3 óvalos y 3 triángulos.',pt:'Isso! 3 ovais e 3 triângulos!',it:'Sì! 3 ovali e 3 triangoli!',nl:'Ja! 3 ovalen en 3 driehoeken!',sv:'Ja – 3 ovaler och 3 trianglar!',da:'Ja – 3 ovaler og 3 trekanter!',no:'Ja – 3 ovaler og 3 trekanter!',fi:'Kyllä – 3 soikiota ja 3 kolmiota!'},
    ok_sailboat:       {en:'Yes — 2 rectangles and 3 triangles!',de:'Ja – 2 Rechtecke und 3 Dreiecke!',fr:'Oui, 2 rectangles et 3 triangles !',es:'¡Sí! 2 rectángulos y 3 triángulos.',pt:'Isso! 2 retângulos e 3 triângulos!',it:'Sì! 2 rettangoli e 3 triangoli!',nl:'Ja! 2 rechthoeken en 3 driehoeken!',sv:'Ja – 2 rektanglar och 3 trianglar!',da:'Ja – 2 rektangler og 3 trekanter!',no:'Ja – 2 rektangler og 3 trekanter!',fi:'Kyllä – 2 suorakulmiota ja 3 kolmiota!'},
    ok_beehive:        {en:'Yes — 5 hexagons and 3 ovals!',de:'Ja – 5 Sechsecke und 3 Ovale!',fr:'Oui, 5 hexagones et 3 ovales !',es:'¡Sí! 5 hexágonos y 3 óvalos.',pt:'Isso! 5 hexágonos e 3 ovais!',it:'Sì! 5 esagoni e 3 ovali!',nl:'Ja! 5 zeshoeken en 3 ovalen!',sv:'Ja – 5 sexhörningar och 3 ovaler!',da:'Ja – 5 sekskanter og 3 ovaler!',no:'Ja – 5 sekskanter og 3 ovaler!',fi:'Kyllä – 5 kuusikulmiota ja 3 soikiota!'},
    ok_train:          {en:'Yes — 4 circles and 3 squares!',de:'Ja – 4 Kreise und 3 Quadrate!',fr:'Oui, 4 cercles et 3 carrés !',es:'¡Sí! 4 círculos y 3 cuadrados.',pt:'Isso! 4 círculos e 3 quadrados!',it:'Sì! 4 cerchi e 3 quadrati!',nl:'Ja! 4 cirkels en 3 vierkanten!',sv:'Ja – 4 cirklar och 3 kvadrater!',da:'Ja – 4 cirkler og 3 kvadrater!',no:'Ja – 4 sirkler og 3 kvadrater!',fi:'Kyllä – 4 ympyrää ja 3 neliötä!'},
    ok_robot:          {en:'Yes — 3 squares and 2 hearts!',de:'Ja – 3 Quadrate und 2 Herzen!',fr:'Oui, 3 carrés et 2 cœurs !',es:'¡Sí! 3 cuadrados y 2 corazones.',pt:'Isso! 3 quadrados e 2 corações!',it:'Sì! 3 quadrati e 2 cuori!',nl:'Ja! 3 vierkanten en 2 harten!',sv:'Ja – 3 kvadrater och 2 hjärtan!',da:'Ja – 3 kvadrater og 2 hjerter!',no:'Ja – 3 kvadrater og 2 hjerter!',fi:'Kyllä – 3 neliötä ja 2 sydäntä!'},
    ok_lighthouse:     {en:'Yes — 3 diamonds and 4 stars!',de:'Ja – 3 Rauten und 4 Sterne!',fr:'Oui, 3 losanges et 4 étoiles !',es:'¡Sí! 3 rombos y 4 estrellas.',pt:'Isso! 3 losangos e 4 estrelas!',it:'Sì! 3 rombi e 4 stelle!',nl:'Ja! 3 ruiten en 4 sterren!',sv:'Ja – 3 romber och 4 stjärnor!',da:'Ja – 3 romber og 4 stjerner!',no:'Ja – 3 romber og 4 stjerner!',fi:'Kyllä – 3 vinoneliötä ja 4 tähteä!'},
    ok_garden:         {en:'Yes — 3 pentagons and 4 circles!',de:'Ja – 3 Fünfecke und 4 Kreise!',fr:'Oui, 3 pentagones et 4 cercles !',es:'¡Sí! 3 pentágonos y 4 círculos.',pt:'Isso! 3 pentágonos e 4 círculos!',it:'Sì! 3 pentagoni e 4 cerchi!',nl:'Ja! 3 vijfhoeken en 4 cirkels!',sv:'Ja – 3 femhörningar och 4 cirklar!',da:'Ja – 3 femkanter og 4 cirkler!',no:'Ja – 3 femkanter og 4 sirkler!',fi:'Kyllä – 3 viisikulmiota ja 4 ympyrää!'},
    'ok_q-tri-1':      {en:'Yes — 4 real triangles!',de:'Ja – 4 echte Dreiecke!',fr:'Oui, 4 vrais triangles !',es:'¡Sí! 4 triángulos de verdad.',pt:'Isso! 4 triângulos de verdade!',it:'Sì! 4 triangoli veri!',nl:'Ja! 4 echte driehoeken!',sv:'Ja – 4 riktiga trianglar!',da:'Ja – 4 rigtige trekanter!',no:'Ja – 4 ekte trekanter!',fi:'Kyllä – 4 oikeaa kolmiota!'},
    'ok_q-rect-1':     {en:'Yes — 3 real rectangles!',de:'Ja – 3 echte Rechtecke!',fr:'Oui, 3 vrais rectangles !',es:'¡Sí! 3 rectángulos de verdad.',pt:'Isso! 3 retângulos de verdade!',it:'Sì! 3 rettangoli veri!',nl:'Ja! 3 echte rechthoeken!',sv:'Ja – 3 riktiga rektanglar!',da:'Ja – 3 rigtige rektangler!',no:'Ja – 3 ekte rektangler!',fi:'Kyllä – 3 oikeaa suorakulmiota!'},
    'ok_q-sq-1':       {en:'Yes — 3 real squares!',de:'Ja – 3 echte Quadrate!',fr:'Oui, 3 vrais carrés !',es:'¡Sí! 3 cuadrados de verdad.',pt:'Isso! 3 quadrados de verdade!',it:'Sì! 3 quadrati veri!',nl:'Ja! 3 echte vierkanten!',sv:'Ja – 3 riktiga kvadrater!',da:'Ja – 3 rigtige kvadrater!',no:'Ja – 3 ekte kvadrater!',fi:'Kyllä – 3 oikeaa neliötä!'},
    'ok_q-circle-1':   {en:'Yes — 2 real circles!',de:'Ja – 2 echte Kreise!',fr:'Oui, 2 vrais cercles !',es:'¡Sí! 2 círculos de verdad.',pt:'Isso! 2 círculos de verdade!',it:'Sì! 2 cerchi veri!',nl:'Ja! 2 echte cirkels!',sv:'Ja – 2 riktiga cirklar!',da:'Ja – 2 rigtige cirkler!',no:'Ja – 2 ekte sirkler!',fi:'Kyllä – 2 oikeaa ympyrää!'},
    'ok_q-hex-1':      {en:'Yes — 3 real hexagons!',de:'Ja – 3 echte Sechsecke!',fr:'Oui, 3 vrais hexagones !',es:'¡Sí! 3 hexágonos de verdad.',pt:'Isso! 3 hexágonos de verdade!',it:'Sì! 3 esagoni veri!',nl:'Ja! 3 echte zeshoeken!',sv:'Ja – 3 riktiga sexhörningar!',da:'Ja – 3 rigtige sekskanter!',no:'Ja – 3 ekte sekskanter!',fi:'Kyllä – 3 oikeaa kuusikulmiota!'},
    'ok_q-tri-2':      {en:'Yes — 4 real triangles!',de:'Ja – 4 echte Dreiecke!',fr:'Oui, 4 vrais triangles !',es:'¡Sí! 4 triángulos de verdad.',pt:'Isso! 4 triângulos de verdade!',it:'Sì! 4 triangoli veri!',nl:'Ja! 4 echte driehoeken!',sv:'Ja – 4 riktiga trianglar!',da:'Ja – 4 rigtige trekanter!',no:'Ja – 4 ekte trekanter!',fi:'Kyllä – 4 oikeaa kolmiota!'},
    'ok_q-rect-2':     {en:'Yes — 3 real rectangles!',de:'Ja – 3 echte Rechtecke!',fr:'Oui, 3 vrais rectangles !',es:'¡Sí! 3 rectángulos de verdad.',pt:'Isso! 3 retângulos de verdade!',it:'Sì! 3 rettangoli veri!',nl:'Ja! 3 echte rechthoeken!',sv:'Ja – 3 riktiga rektanglar!',da:'Ja – 3 rigtige rektangler!',no:'Ja – 3 ekte rektangler!',fi:'Kyllä – 3 oikeaa suorakulmiota!'},
    'ok_q-sq-2':       {en:'Yes — 4 real squares!',de:'Ja – 4 echte Quadrate!',fr:'Oui, 4 vrais carrés !',es:'¡Sí! 4 cuadrados de verdad.',pt:'Isso! 4 quadrados de verdade!',it:'Sì! 4 quadrati veri!',nl:'Ja! 4 echte vierkanten!',sv:'Ja – 4 riktiga kvadrater!',da:'Ja – 4 rigtige kvadrater!',no:'Ja – 4 ekte kvadrater!',fi:'Kyllä – 4 oikeaa neliötä!'},
    ok_cat:            {en:'Yes — 4 triangles and 2 squares!',de:'Ja – 4 Dreiecke und 2 Quadrate!',fr:'Oui, 4 triangles et 2 carrés !',es:'¡Sí! 4 triángulos y 2 cuadrados.',pt:'Isso! 4 triângulos e 2 quadrados!',it:'Sì! 4 triangoli e 2 quadrati!',nl:'Ja! 4 driehoeken en 2 vierkanten!',sv:'Ja – 4 trianglar och 2 kvadrater!',da:'Ja – 4 trekanter og 2 kvadrater!',no:'Ja – 4 trekanter og 2 kvadrater!',fi:'Kyllä – 4 kolmiota ja 2 neliötä!'},
    ok_tree:           {en:'Yes — 6 triangles and 1 square!',de:'Ja – 6 Dreiecke und 1 Quadrat!',fr:'Oui, 6 triangles et 1 carré !',es:'¡Sí! 6 triángulos y 1 cuadrado.',pt:'Isso! 6 triângulos e 1 quadrado!',it:'Sì! 6 triangoli e 1 quadrato!',nl:'Ja! 6 driehoeken en 1 vierkant!',sv:'Ja – 6 trianglar och 1 kvadrat!',da:'Ja – 6 trekanter og 1 kvadrat!',no:'Ja – 6 trekanter og 1 kvadrat!',fi:'Kyllä – 6 kolmiota ja 1 neliö!'},
    ok_castle:         {en:'Yes — 3 triangles and 3 squares!',de:'Ja – 3 Dreiecke und 3 Quadrate!',fr:'Oui, 3 triangles et 3 carrés !',es:'¡Sí! 3 triángulos y 3 cuadrados.',pt:'Isso! 3 triângulos e 3 quadrados!',it:'Sì! 3 triangoli e 3 quadrati!',nl:'Ja! 3 driehoeken en 3 vierkanten!',sv:'Ja – 3 trianglar och 3 kvadrater!',da:'Ja – 3 trekanter og 3 kvadrater!',no:'Ja – 3 trekanter og 3 kvadrater!',fi:'Kyllä – 3 kolmiota ja 3 neliötä!'},
    ok_bird:           {en:'Yes — 5 triangles and 2 squares!',de:'Ja – 5 Dreiecke und 2 Quadrate!',fr:'Oui, 5 triangles et 2 carrés !',es:'¡Sí! 5 triángulos y 2 cuadrados.',pt:'Isso! 5 triângulos e 2 quadrados!',it:'Sì! 5 triangoli e 2 quadrati!',nl:'Ja! 5 driehoeken en 2 vierkanten!',sv:'Ja – 5 trianglar och 2 kvadrater!',da:'Ja – 5 trekanter og 2 kvadrater!',no:'Ja – 5 trekanter og 2 kvadrater!',fi:'Kyllä – 5 kolmiota ja 2 neliötä!'},
    ok_firs:           {en:'Yes — 7 triangles and 1 square!',de:'Ja – 7 Dreiecke und 1 Quadrat!',fr:'Oui, 7 triangles et 1 carré !',es:'¡Sí! 7 triángulos y 1 cuadrado.',pt:'Isso! 7 triângulos e 1 quadrado!',it:'Sì! 7 triangoli e 1 quadrato!',nl:'Ja! 7 driehoeken en 1 vierkant!',sv:'Ja – 7 trianglar och 1 kvadrat!',da:'Ja – 7 trekanter og 1 kvadrat!',no:'Ja – 7 trekanter og 1 kvadrat!',fi:'Kyllä – 7 kolmiota ja 1 neliö!'},
    ok_windmill:       {en:'Yes — 2 triangles and 4 squares!',de:'Ja – 2 Dreiecke und 4 Quadrate!',fr:'Oui, 2 triangles et 4 carrés !',es:'¡Sí! 2 triángulos y 4 cuadrados.',pt:'Isso! 2 triângulos e 4 quadrados!',it:'Sì! 2 triangoli e 4 quadrati!',nl:'Ja! 2 driehoeken en 4 vierkanten!',sv:'Ja – 2 trianglar och 4 kvadrater!',da:'Ja – 2 trekanter og 4 kvadrater!',no:'Ja – 2 trekanter og 4 kvadrater!',fi:'Kyllä – 2 kolmiota ja 4 neliötä!'},
    ok_boat:           {en:'Yes — 6 triangles and 3 squares!',de:'Ja – 6 Dreiecke und 3 Quadrate!',fr:'Oui, 6 triangles et 3 carrés !',es:'¡Sí! 6 triángulos y 3 cuadrados.',pt:'Isso! 6 triângulos e 3 quadrados!',it:'Sì! 6 triangoli e 3 quadrati!',nl:'Ja! 6 driehoeken en 3 vierkanten!',sv:'Ja – 6 trianglar och 3 kvadrater!',da:'Ja – 6 trekanter og 3 kvadrater!',no:'Ja – 6 trekanter og 3 kvadrater!',fi:'Kyllä – 6 kolmiota ja 3 neliötä!'}
    /*STRINGS-END*/
  },
  defaults: { board: 'picture', labels: 'shape' },
  settings: [
    { key: 'board', type: 'choice', labelKey: 'setBoard', options: [{ value: 'picture', labelKey: 'bPicture' }, { value: 'quilt', labelKey: 'bQuilt' }, { value: 'count', labelKey: 'bCount' }] },
    { key: 'labels', type: 'choice', labelKey: 'setLabels', options: [{ value: 'shape', labelKey: 'lShape' }, { value: 'name', labelKey: 'lName' }, { value: 'clue', labelKey: 'lClue' }] }
  ],

  OK_MS: 2100, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._trace = null; this._puddle = []; this._shed = {};
    injectPaintPotsCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._board()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _board: function () { return PaintPotsCore.board(this._set('board')); },
  _labels: function () { return PaintPotsCore.labelMode(this._set('labels')); },
  _ensurePool: function () { var b = this._board(); if (!this._pool || this._poolKey !== b) { this._pool = PaintPotsCore.rounds(b); this._poolKey = b; this._order = null; } return this._pool; },
  _promptKey: function (r) { if (r.board === 'count') return 'pCount'; if (r.board === 'quilt') return this._labels() === 'clue' ? 'pQuiltClue' : 'pQuilt_' + r.tins[0]; return 'pPicture'; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = PaintPotsCore, self = this;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]];
    return {
      id: 'paint-pots.' + r.id,
      promptKey: self._promptKey(r),
      promptArgs: {},
      celebrateKey: 'ok_' + r.id,
      answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._trace = null; tool._puddle = []; tool._shed = {}; tool.st = C.newState(r); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this.st = PaintPotsCore.newState(PaintPotsCore.rounds('picture')[0]);
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._render2(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st, r = st.r, C = PaintPotsCore;
    api.stage.innerHTML = '';
    var L = this._L = C.layout(r.board, this._width()), B = C.BOARD[r.board], sc = L.scale;
    var wrap = api.el('div', 'pp-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.tight ? ' is-tight' : '') + (r.board === 'quilt' ? ' is-quilt' : '')); this._wrap = wrap;
    var stage = api.el('div', 'pp-stage'); this._stage = stage; wrap.appendChild(stage);
    var note = api.el('div', 'pp-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'pp-ask'); this._ask = ask;
    if (L.tight) ask.appendChild(note); else wrap.appendChild(note);
    var chk = api.el('button', 'pp-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    api.stage.appendChild(wrap);

    /* the tins */
    var tins = api.el('div', 'pp-tins'); this._tinsEl = tins; this._tinBtns = [];
    r.tins.forEach(function (kind, i) {
      var b = api.el('button', 'pp-tin'); b.type = 'button'; b.setAttribute('data-i', i);
      b.style.setProperty('--pp-paint', r.colours[i]);
      b.style.width = L.tinW + 'px'; b.style.height = L.tinH + 'px';
      b.innerHTML = self._tinHTML(kind, r.colours[i], L);
      b.setAttribute('aria-label', self._t('ariaTin') + ': ' + (self._labels() === 'clue' ? self._t('clue_' + kind) : self._t('n_' + kind)));
      b.addEventListener('click', function () { self._pickTin(i); });
      tins.appendChild(b); self._tinBtns.push(b);
    });
    /* counters (count board) */
    var counters = null;
    if (r.board === 'count') {
      counters = api.el('div', 'pp-counters'); this._counterVals = {};
      r.tins.forEach(function (kind, i) {
        var c = api.el('div', 'pp-counter'); c.style.setProperty('--pp-paint', r.colours[i]);
        var sw = api.el('span', 'pp-swatch'); c.appendChild(sw);
        var minus = api.el('button', 'pp-step'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', self._t('ariaLess'));
        var val = api.el('span', 'pp-val'); val.setAttribute('aria-live', 'polite');
        var plus = api.el('button', 'pp-step'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', self._t('ariaMore'));
        minus.addEventListener('click', function () { self._step(kind, -1); });
        plus.addEventListener('click', function () { self._step(kind, 1); });
        c.appendChild(minus); c.appendChild(val); c.appendChild(plus); counters.appendChild(c); self._counterVals[kind] = val;
      });
    }
    /* the board */
    var bw = Math.round(B.W * sc), bh = Math.round(B.H * sc);
    var bd = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bd.setAttribute('class', 'pp-board' + (r.show ? ' show-' + r.show : '')); bd.setAttribute('viewBox', '0 0 ' + B.W + ' ' + B.H); bd.setAttribute('width', bw); bd.setAttribute('height', bh);
    this._boardEl = bd; this._bw = bw; this._bh = bh;
    var puddle = api.el('div', 'pp-puddle'); puddle.setAttribute('aria-hidden', 'true'); puddle.style.width = bw + 'px'; this._puddleEl = puddle;
    if (L.mode === 'wide') {
      var left = api.el('div', 'pp-left'); left.appendChild(bd); left.appendChild(puddle);
      var side = api.el('div', 'pp-side'); side.style.width = L.side + 'px'; side.appendChild(tins); if (counters) side.appendChild(counters);
      var row = api.el('div', 'pp-row'); row.appendChild(left); row.appendChild(side); stage.appendChild(row);
    } else {
      stage.appendChild(tins);
      var mid = api.el('div', 'pp-left'); mid.appendChild(bd); mid.appendChild(puddle); stage.appendChild(mid);
      if (counters) stage.appendChild(counters);
    }
    this._buildBoard();
    this._paint();
  },
  _NS: 'http://www.w3.org/2000/svg',
  _svg: function (tag, attrs) { var e = document.createElementNS(this._NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; },
  /* path data of a piece: the area (always closed) and the outline (with gaps for an open figure) */
  _paths: function (pc) {
    var f = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }, p = pc.pts, n = p.length, i, d = '', o = '';
    if (pc.curve) {
      d = 'M' + p.map(f).join(' L') + ' Z';
      o = pc.t === 'cring' ? 'M' + p.map(f).join(' L') : d;
      return { area: d, line: o };
    }
    var spec = pc.spec, gaps = pc.open ? (spec.gaps || 1) : 0;
    if (pc.rounded) {
      var rr = Math.min.apply(null, PaintPotsCore.sides(pc.pts)) * 0.24;
      for (i = 0; i < n; i++) {
        var a = p[(i + n - 1) % n], b = p[i], c = p[(i + 1) % n], la = Math.hypot(a[0] - b[0], a[1] - b[1]), lc = Math.hypot(c[0] - b[0], c[1] - b[1]);
        var p1 = [b[0] + (a[0] - b[0]) * rr / la, b[1] + (a[1] - b[1]) * rr / la], p2 = [b[0] + (c[0] - b[0]) * rr / lc, b[1] + (c[1] - b[1]) * rr / lc];
        d += (i ? ' L' : 'M') + f(p1) + ' Q' + f(b) + ' ' + f(p2);
      }
      d += ' Z';
      return { area: d, line: d };
    }
    /* edge i from p[i] to p[i+1]: straight, curved (bowed out), or with a gap */
    var cen = PaintPotsCore.centroid(p), segs = [];
    for (i = 0; i < n; i++) {
      var s = p[i], e = p[(i + 1) % n];
      if (pc.curvedSide === i) { var mx = (s[0] + e[0]) / 2, my = (s[1] + e[1]) / 2, ox = mx - cen[0], oy = my - cen[1], ol = Math.hypot(ox, oy) || 1, len = Math.hypot(e[0] - s[0], e[1] - s[1]); segs.push({ s: s, e: e, q: [mx + ox / ol * len * 0.32, my + oy / ol * len * 0.32] }); }
      else segs.push({ s: s, e: e });
    }
    d = 'M' + f(p[0]); segs.forEach(function (g) { d += g.q ? ' Q' + f(g.q) + ' ' + f(g.e) : ' L' + f(g.e); }); d += ' Z';
    if (!gaps) return { area: d, line: d };
    /* the outline: break side 0 (and side 1) in the middle */
    var line = '';
    segs.forEach(function (g, k) {
      if (k < gaps) { var a1 = [g.s[0] + (g.e[0] - g.s[0]) * 0.32, g.s[1] + (g.e[1] - g.s[1]) * 0.32], a2 = [g.s[0] + (g.e[0] - g.s[0]) * 0.68, g.s[1] + (g.e[1] - g.s[1]) * 0.68]; line += ' M' + f(g.s) + ' L' + f(a1) + ' M' + f(a2) + ' L' + f(g.e); }
      else line += ' M' + f(g.s) + (g.q ? ' Q' + f(g.q) + ' ' + f(g.e) : ' L' + f(g.e));
    });
    return { area: d, line: line, gapAt: segs.slice(0, gaps).map(function (g) { return [(g.s[0] + g.e[0]) / 2, (g.s[1] + g.e[1]) / 2]; }) };
  },
  _buildBoard: function () {
    var self = this, st = this.st, r = st.r, C = PaintPotsCore, bd = this._boardEl, B = C.BOARD[r.board];
    bd.innerHTML = '';
    var defs = this._svg('defs', {}); bd.appendChild(defs);
    bd.appendChild(this._svg('rect', { class: 'pp-paper', x: 1.5, y: 1.5, width: B.W - 3, height: B.H - 3, rx: 12 }));
    var ps = this._pieces = C.piecesOf(r); this._byId = {}; ps.forEach(function (pc) { self._byId[pc.id] = pc; });
    var zone = this._svg('rect', { class: 'pp-zone', x: 0, y: 0, width: 0, height: 0, rx: 14 }); this._zone = zone; bd.appendChild(zone);
    this._pEls = {};
    if (r.board === 'quilt') {
      for (var c = 0; c < 8; c++) {
        var pid = 'p' + r.order[c], patch = this._svg('rect', { class: 'pp-patch', x: (c % 4) * 110 + 4, y: Math.floor(c / 4) * 150 + 4, width: 102, height: 142, rx: 10, 'data-id': pid });
        bd.appendChild(patch);
      }
    }
    ps.forEach(function (pc, k) {
      var g = self._svg('g', { class: 'pp-piece', 'data-id': pc.id, tabindex: '0', role: 'button' });
      var P = self._paths(pc); pc._paths = P;
      g.appendChild(self._svg('path', { class: 'pp-fill', d: P.area }));
      g.appendChild(self._svg('ellipse', { class: 'pp-gloss', cx: pc.cx - 6, cy: pc.cy - 8, rx: Math.max(8, C.minWidth(pc) * 0.18), ry: Math.max(4, C.minWidth(pc) * 0.08) }));
      g.appendChild(self._svg('path', { class: 'pp-line', d: P.line }));
      bd.appendChild(g); self._pEls[pc.id] = g;
      void k;
    });
    bd.querySelectorAll(r.board === 'quilt' ? '.pp-patch, .pp-piece' : '.pp-piece').forEach(function (el) {
      el.addEventListener('click', function (ev) { ev.preventDefault(); self._tapPiece(el.getAttribute('data-id')); });
    });
    ps.forEach(function (pc, k) {
      var g = self._pEls[pc.id];
      g.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self._tapPiece(pc.id); return; }
        var d = ev.key === 'ArrowRight' || ev.key === 'ArrowDown' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' ? -1 : 0;
        if (d) { ev.preventDefault(); var nx = self._pEls[ps[(k + d + ps.length) % ps.length].id]; if (nx) nx.focus(); }
      });
    });
    var marks = this._svg('g', { class: 'pp-marks' }); this._marks = marks; bd.appendChild(marks);
    var fx = this._svg('g', { class: 'pp-fx' }); this._fx = fx; bd.appendChild(fx);
  },
  /* a tin: the drawn can, its lid, the paint at the rim, the label */
  _tinHTML: function (kind, colour, L) {
    var mode = this._labels(), w = 100, h = 100, lab = '';
    if (mode === 'shape') lab = this._labelOutline(kind, 50, 58, 34) + '';
    if (mode === 'clue') lab = this._labelClue(kind, 50, 60, 30);
    var can = '<svg class="pp-can" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">'
      + '<path class="pp-canbody" d="M10 22 L10 90 Q50 100 90 90 L90 22 Z"/>'
      + '<ellipse class="pp-canrim" cx="50" cy="22" rx="40" ry="9"/><ellipse class="pp-canpaint" cx="50" cy="22" rx="34" ry="6" fill="' + colour + '"/>'
      + '<path class="pp-lid" d="M8 20 Q50 2 92 20 L92 24 Q50 8 8 24 Z"/>'
      + '<rect class="pp-label" x="18" y="34" width="64" height="' + (mode === 'name' ? 42 : 52) + '" rx="6"/>' + lab + '</svg>';
    var word = mode === 'clue' ? '' : '<span class="pp-word' + (mode === 'name' ? ' is-big' : '') + '">' + this._t('n_' + kind) + '</span>';
    return can + word;
  },
  _canonical: function (kind) {
    var P = { circle: { t: 'circle', w: 52 }, square: { t: 'square', w: 44 }, triangle: { t: 'tri', w: 54 }, rectangle: { t: 'rect', w: 58, h: 34 }, hexagon: { t: 'hex', w: 54 }, oval: { t: 'oval', w: 58, h: 36 },
      star: { t: 'star', w: 58 }, diamond: { t: 'rhombus', w: 34, ang: 60, a: 90 }, heart: { t: 'heart', w: 52, h: 46 }, pentagon: { t: 'pent', w: 54 } }[kind];
    var s = Object.assign({ x: 0, y: 0, a: 0, id: 'c' }, P); if (kind === 'triangle') s.y = 6;
    return PaintPotsCore.build(s);
  },
  _labelOutline: function (kind, cx, cy, size) {
    var pc = this._canonical(kind), k = size / 60, f = function (p) { return (cx + p[0] * k).toFixed(1) + ' ' + (cy + p[1] * k).toFixed(1); };
    return '<path class="pp-labshape" d="M' + pc.pts.map(f).join(' L') + ' Z"/>';
  },
  /* clue: corner beads and equal-side ticks only (no outline); round: a pin and a string */
  _labelClue: function (kind, cx, cy, size) {
    var pc = this._canonical(kind), k = size / 60, P = function (p) { return [cx + p[0] * k, cy + p[1] * k]; }, out = '';
    if (kind === 'circle') return '<circle class="pp-bead" cx="' + cx + '" cy="' + cy + '" r="3"/><line class="pp-string" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + 14) + '" y2="' + cy + '"/><circle class="pp-ghostring" cx="' + cx + '" cy="' + cy + '" r="14"/>';
    if (kind === 'oval') return '<circle class="pp-bead" cx="' + cx + '" cy="' + cy + '" r="3"/><line class="pp-string" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + 18) + '" y2="' + cy + '"/><line class="pp-string" x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - 10) + '"/><ellipse class="pp-ghostring" cx="' + cx + '" cy="' + cy + '" rx="18" ry="10"/>';
    if (kind === 'heart') return '<path class="pp-string" d="M' + (cx - 14) + ' ' + (cy - 2) + ' Q' + (cx - 14) + ' ' + (cy - 14) + ' ' + cx + ' ' + (cy - 6) + ' Q' + (cx + 14) + ' ' + (cy - 14) + ' ' + (cx + 14) + ' ' + (cy - 2) + '"/><circle class="pp-bead" cx="' + cx + '" cy="' + (cy + 12) + '" r="3"/>';
    var pts = kind === 'star' ? pc.pts.filter(function (_, i) { return i % 2 === 0; }) : pc.pts;
    pts.forEach(function (p) { var q = P(p); out += '<circle class="pp-bead" cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="3"/>'; });
    if (kind !== 'star') out += this._ticks(pc, P, 3.2);
    return out;
  },
  /* equal-side ticks: the first group of equal sides 1 tick, the second 2 */
  _ticks: function (pc, P, sz) {
    var tr = PaintPotsCore.traceOf(pc), p = pc.pts, out = '';
    tr.groups.slice(0, 2).forEach(function (g, gi) {
      g.forEach(function (i) {
        var a = P(p[i]), b = P(p[(i + 1) % p.length]), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, ux = dx / l, uy = dy / l;
        for (var t = 0; t <= gi; t++) { var off = (t - gi / 2) * sz * 1.1; out += '<line class="pp-tick" x1="' + (mx + ux * off - nx * sz).toFixed(1) + '" y1="' + (my + uy * off - ny * sz).toFixed(1) + '" x2="' + (mx + ux * off + nx * sz).toFixed(1) + '" y2="' + (my + uy * off + ny * sz).toFixed(1) + '"/>'; }
      });
    });
    return out;
  },
  /* the brush's trace on a piece: beads, ticks, or a pin and string */
  _traceSVG: function (pc, colour) {
    var tr = PaintPotsCore.traceOf(pc), I = function (p) { return p; }, out = '';
    if (pc.curve) {
      var c = PaintPotsCore.centroid(pc.pts);
      if (pc.t === 'circle' || pc.t === 'oval' || pc.t === 'egg') { var far = pc.pts[0], nearP = pc.pts[Math.round(pc.pts.length / 4)]; out += '<circle class="pp-pin" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="5"/><line class="pp-string" x1="' + c[0].toFixed(1) + '" y1="' + c[1].toFixed(1) + '" x2="' + far[0].toFixed(1) + '" y2="' + far[1].toFixed(1) + '"/><line class="pp-string" x1="' + c[0].toFixed(1) + '" y1="' + c[1].toFixed(1) + '" x2="' + nearP[0].toFixed(1) + '" y2="' + nearP[1].toFixed(1) + '"/>'; }
      if (pc.t === 'heart') { var lo = pc.pts.reduce(function (m, q) { return q[1] > m[1] ? q : m; }); out += '<circle class="pp-bead" cx="' + lo[0].toFixed(1) + '" cy="' + lo[1].toFixed(1) + '" r="6"/>'; }
      if (pc.t === 'semi') { var e1 = pc.pts[0], e2 = pc.pts[pc.pts.length - 1]; out += '<circle class="pp-bead" cx="' + e1[0].toFixed(1) + '" cy="' + e1[1].toFixed(1) + '" r="6"/><circle class="pp-bead" cx="' + e2[0].toFixed(1) + '" cy="' + e2[1].toFixed(1) + '" r="6"/>'; }
      return out;
    }
    if (!pc.rounded) pc.pts.forEach(function (p) { out += '<circle class="pp-bead" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="6"/>'; });
    if (pc.curvedSide == null && !pc.rounded) out += this._ticks(pc, I, 7);
    void tr; void colour;
    return out;
  },

  _paint: function () {
    if (!this._stage) return;
    var self = this, st = this.st, r = st.r, C = PaintPotsCore, last = st.last, hp = st.help;
    /* tins */
    this._tinBtns.forEach(function (b, i) { b.classList.toggle('is-on', st.tin === i); b.classList.toggle('is-drip', hp === 1 && last && last.result === 'wrong' && last.missingTin === i && !(last.shed && last.shed.length)); b.disabled = !!st.done; });
    /* pieces */
    var T = C.targets(r), missing = last && last.result === 'wrong' && last.missing ? last.missing : [];
    var n = this._pieces.length;
    this._pieces.forEach(function (pc, k) {
      var g = self._pEls[pc.id], fill = g.querySelector('.pp-fill');
      var wet = st.painted[pc.id], set = st.set[pc.id], shed = self._shed[pc.id];
      var col = set != null ? r.colours[set] : wet != null ? r.colours[wet] : shed ? shed.colour : null;
      fill.style.fill = col || '';
      g.classList.toggle('is-wet', wet != null);
      g.classList.toggle('is-set', set != null);
      g.classList.toggle('is-shed', !!shed);
      var glow = hp >= 2 && missing.indexOf(pc.id) >= 0;
      g.classList.toggle('is-glow', glow);
      if (glow) { var ti = r.tins.findIndex(function (t) { return T[t].indexOf(pc.id) >= 0; }); g.style.setProperty('--pp-glow', r.colours[ti]); }
      var pulse = last && last.result === 'wrong' && last.count && set != null && r.tins[set] === last.count;
      g.classList.toggle('is-pulse', !!pulse);
      g.setAttribute('aria-label', self._t('ariaPiece', { k: k + 1, n: n }) + ', ' + self._t(set != null || wet != null ? 'ariaPainted' : 'ariaBare'));
    });
    /* marks: the trace of the last tap; miss 2: beads on the glowing targets and twice-wrong pieces */
    var mk = '';
    if (this._trace && this._byId[this._trace]) mk += '<g class="pp-trace">' + this._traceSVG(this._byId[this._trace]) + '</g>';
    if (hp >= 2) missing.forEach(function (pid) { mk += '<g class="pp-trace is-keep">' + self._traceSVG(self._byId[pid]) + '</g>'; });
    Object.keys(st.wrongTwice).forEach(function (pid) { if (st.wrongTwice[pid] >= 2 && st.painted[pid] == null && st.set[pid] == null) mk += '<g class="pp-trace is-keep">' + self._traceSVG(self._byId[pid]) + '</g>'; });
    /* count miss 2: numerals on the counted pieces */
    if (last && last.result === 'wrong' && last.count && hp >= 2) { var i = 0; this._pieces.forEach(function (pc) { if (st.set[pc.id] != null && r.tins[st.set[pc.id]] === last.count) { i++; mk += '<text class="pp-num" x="' + pc.cx.toFixed(1) + '" y="' + (pc.cy + 9).toFixed(1) + '" text-anchor="middle">' + i + '</text>'; } }); }
    this._marks.innerHTML = mk;
    /* the quadrant the tin drips on (miss 1, a target still unpainted) */
    var z = this._zone;
    if (hp === 1 && missing.length && !(last.shed && last.shed.length)) {
      var B = C.BOARD[r.board], pc0 = this._byId[missing[0]], qx = pc0.cx < B.W / 2 ? 0 : B.W / 2, qy = pc0.cy < B.H / 2 ? 0 : B.H / 2;
      z.setAttribute('x', qx + 4); z.setAttribute('y', qy + 4); z.setAttribute('width', B.W / 2 - 8); z.setAttribute('height', B.H / 2 - 8);
      z.style.fill = r.colours[last.missingTin]; z.classList.add('is-on');
    } else z.classList.remove('is-on');
    /* the puddle */
    this._puddleEl.innerHTML = this._puddle.map(function (c, i) { return '<span class="pp-blob" style="background:' + c + ';left:' + (8 + (i * 37) % 90) + '%"></span>'; }).join('');
    /* counters */
    if (this._counterVals) for (var kind in this._counterVals) this._counterVals[kind].textContent = st.count[kind] != null ? String(st.count[kind]) : '';
    this._stage.querySelectorAll('.pp-step').forEach(function (b) { b.disabled = !!st.done; });
    /* success show */
    this._boardEl.classList.toggle('is-show', !!st.done && !this._afterOk);
    if (r.board === 'quilt' && st.done) this._pieces.forEach(function (pc) { self._pEls[pc.id].classList.toggle('is-shrug', st.set[pc.id] == null); });
    /* words */
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t('ok_' + r.id);
    else if (h === 'hintMore') { var tk = r.tins[last.missingTin]; msg = this._t(this._labels() === 'clue' ? (tk === 'circle' ? 'hintMoreTinRound' : 'hintMoreTin') : 'hintMore_' + tk); }
    else if (h) msg = this._t(h);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(hp && !st.done));
  },

  /* ---------------- the hand ---------------- */
  _pickTin: function (i) {
    if (this._busy) return;
    if (PaintPotsCore.pickTin(this.st, i)) {
      this.api.sound(880);
      if (this._labels() === 'clue' && this.api.speak) { try { this.api.speak(this._t('clue_' + this.st.r.tins[i])); } catch (e) {} }
      this._paint();
    }
  },
  _tapPiece: function (pid) {
    var C = PaintPotsCore, st = this.st, self = this;
    if (this._busy || st.done || !this._byId[pid]) return;
    if (st.set[pid] != null) { this._showTrace(pid); return; }
    var res = C.paint(st, pid);
    this._shed = {}; this._fx.innerHTML = '';
    if (res === 'paint') this.api.sound(330); else if (res === 'lift') this.api.sound(520);
    this._showTrace(pid);
    var tr = C.traceOf(this._byId[pid]);
    if (this.api.announce) this.api.announce(tr.corners === 1 ? this._t('ariaCorner1') : tr.corners ? this._t('ariaCorners', { n: tr.corners }) : this._t('ariaRound'));
    void self;
  },
  /* the brush runs round the edge: the beads appear, then fade */
  _showTrace: function (pid) {
    var self = this;
    this._trace = pid; this._paint();
    var g = this._marks.querySelector('.pp-trace'); if (g) { g.classList.remove('is-run'); void g.getBoundingClientRect(); g.classList.add('is-run'); }
    /* cosmetic: real time even in FAST (tests read the trace) */
    this._later(function () { if (self._trace === pid) { self._trace = null; self._paint(); } }, 900);
  },
  _step: function (kind, d) {
    if (this._busy) return;
    var st = this.st;
    if (st.count[kind] == null && d > 0) { st.count[kind] = 1; st.help = 0; st.last = null; this.api.sound(700); this._paint(); return; }
    if (PaintPotsCore.setCount(st, kind, d)) { this.api.sound(700); this._paint(); }
  },
  _check: function () {
    var C = PaintPotsCore, st = this.st, self = this, r = st.r;
    if (this._busy || st.done) return;
    var wetBefore = {}; for (var k in st.painted) wetBefore[k] = st.painted[k];
    var res = C.check(st);
    this._trace = null;
    if (res.result === 'ok') { this._setFlash(wetBefore); this._win(); return; }
    if (res.result === 'wrong' && res.shed) {
      /* the shed paint shows a moment, then runs off into the puddle */
      res.shed.forEach(function (pid) { self._shed[pid] = { colour: r.colours[wetBefore[pid]], leak: res.leak.indexOf(pid) >= 0 }; });
      this._setFlash(wetBefore);
      this._runOff(res.shed);
      this.api.sound(196);
    } else if (res.result === 'wrong') this.api.sound(196);
    this._paint();
  },
  _setFlash: function (wet) { var self = this, i = 0; Object.keys(wet).forEach(function (pid) { if (self.st.set[pid] != null) { var g = self._pEls[pid]; g.style.animationDelay = (self.FAST ? 0 : i * 120) + 'ms'; g.classList.remove('is-flash'); void g.getBoundingClientRect(); g.classList.add('is-flash'); i++; } }); },
  /* droplets roll off the lowest edge; an open piece pours out of its gap */
  _runOff: function (shed) {
    var self = this, fx = this._fx, B = PaintPotsCore.BOARD[this.st.r.board], html = '';
    shed.forEach(function (pid) {
      var pc = self._byId[pid], s = self._shed[pid], lo = pc.pts.reduce(function (m, q) { return q[1] > m[1] ? q : m; });
      if (s.leak && pc._paths.gapAt && pc._paths.gapAt.length) { var gp = pc._paths.gapAt[0]; html += '<line class="pp-stream" x1="' + gp[0].toFixed(1) + '" y1="' + gp[1].toFixed(1) + '" x2="' + gp[0].toFixed(1) + '" y2="' + B.H + '" style="stroke:' + s.colour + '"/>'; }
      else if (s.leak) html += '<line class="pp-stream" x1="' + lo[0].toFixed(1) + '" y1="' + lo[1].toFixed(1) + '" x2="' + lo[0].toFixed(1) + '" y2="' + B.H + '" style="stroke:' + s.colour + '"/>';
      for (var d = 0; d < 3; d++) html += '<circle class="pp-drop" cx="' + (lo[0] + (d - 1) * 8).toFixed(1) + '" cy="' + lo[1].toFixed(1) + '" r="5" style="fill:' + s.colour + ';--pp-fall:' + (B.H - lo[1]).toFixed(0) + 'px;animation-delay:' + (d * 90) + 'ms"/>';
      self._puddle.push(s.colour);
    });
    fx.innerHTML = html;
    this._later(function () { self._shed = {}; self._paint(); }, 900);
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

var ppCssDone = false;
function injectPaintPotsCSS() {
  if (ppCssDone || typeof document === 'undefined') return;
  ppCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.pp-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--pp-ink:#0F4A40;--pp-teal:#146B5E;--pp-coral:#F2784B;--pp-gold:#E0A400;}'
  + '.pp-stage{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.pp-row{display:flex;align-items:flex-start;justify-content:center;gap:14px;width:100%;}'
  + '.pp-left{display:flex;flex-direction:column;align-items:center;gap:0;}'
  + '.pp-side{display:flex;flex-direction:column;align-items:center;gap:12px;}'
  + '.pp-tins{display:flex;flex-direction:column;align-items:center;gap:10px;} .is-narrow .pp-tins{flex-direction:row;justify-content:center;}'
  + '.pp-board{display:block;overflow:visible;} .pp-paper{fill:#FFFDF6;stroke:var(--pp-teal);stroke-width:3;}'
  + '.pp-piece{cursor:pointer;outline:none;transition:transform .2s ease;transform-box:fill-box;transform-origin:center;} .pp-fill{fill:#FBF3E4;transition:fill .25s ease;} .pp-line{fill:none;stroke:#2A2A35;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;}'
  + '.pp-gloss{fill:#fff;opacity:0;pointer-events:none;} .pp-piece.is-wet .pp-gloss{opacity:.45;} .pp-piece.is-wet .pp-fill{fill-opacity:.9;}'
  + '.pp-piece.is-shed .pp-fill{animation:pp-fade .8s ease forwards;} @keyframes pp-fade{to{fill-opacity:0;}}'
  + '.pp-piece.is-flash{animation:pp-flash .35s ease-out both;} @keyframes pp-flash{40%{filter:brightness(1.35);}}'
  + '.pp-piece:focus-visible .pp-line{stroke:var(--pp-teal);stroke-width:5;}'
  + '.pp-piece.is-glow .pp-line{stroke:var(--pp-glow,#146B5E);stroke-width:6;animation:pp-glow .6s ease-in-out 3;} @keyframes pp-glow{50%{stroke-width:9;}}'
  + '.pp-piece.is-pulse{animation:pp-pulse .5s ease-in-out 2;} @keyframes pp-pulse{50%{filter:brightness(1.4) drop-shadow(0 0 6px #fff);}}'
  + '.pp-patch{fill:#F1EADB;stroke:#E2D6BE;stroke-width:1.5;cursor:pointer;} .is-quilt .pp-piece{pointer-events:none;}'
  + '.pp-zone{fill-opacity:0;pointer-events:none;} .pp-zone.is-on{fill-opacity:.18;animation:pp-zone .5s ease-in-out 3;} @keyframes pp-zone{50%{fill-opacity:.32;}}'
  + '.pp-marks,.pp-fx{pointer-events:none;} .pp-bead{fill:#2A2A35;stroke:#fff;stroke-width:2;} .pp-tick{stroke:#2A2A35;stroke-width:3;stroke-linecap:round;} .pp-pin{fill:#D9572F;stroke:#fff;stroke-width:2;} .pp-string{stroke:#2A2A35;stroke-width:2.5;stroke-dasharray:5 4;fill:none;} .pp-ghostring{fill:none;stroke:#B9C2C0;stroke-width:1.5;stroke-dasharray:3 3;}'
  + '.pp-trace{opacity:1;} .pp-trace:not(.is-keep){animation:pp-trace .9s ease forwards;} @keyframes pp-trace{0%{opacity:0;}15%{opacity:1;}70%{opacity:1;}100%{opacity:0;}}'
  + '.pp-num{font-weight:800;font-size:26px;fill:#fff;stroke:#2A2A35;stroke-width:4;paint-order:stroke;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);}'
  + '.pp-drop{animation:pp-drop .7s ease-in forwards;} @keyframes pp-drop{to{transform:translateY(var(--pp-fall,120px));opacity:.6;}}'
  + '.pp-stream{stroke-width:6;stroke-linecap:round;stroke-dasharray:400;stroke-dashoffset:400;animation:pp-stream .7s ease-in forwards;} @keyframes pp-stream{to{stroke-dashoffset:0;}}'
  + '.pp-puddle{position:relative;height:18px;border-radius:0 0 12px 12px;background:#E9E2D2;overflow:hidden;} .pp-blob{position:absolute;top:4px;width:26px;height:10px;border-radius:50%;opacity:.8;}'
  + '.pp-tin{position:relative;padding:0;border:0;background:transparent;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;transition:transform .15s ease;} .pp-tin:disabled{cursor:default;}'
  + '.pp-can{width:100%;flex:1;min-height:0;} .pp-canbody{fill:#D7DEDD;stroke:#55615E;stroke-width:2;} .pp-canrim{fill:#C3CCCA;stroke:#55615E;stroke-width:2;} .pp-lid{fill:#9AA6A3;stroke:#55615E;stroke-width:1.5;transition:transform .15s ease;transform-origin:8px 22px;}'
  + '.pp-label{fill:#FFFDF6;stroke:var(--pp-paint);stroke-width:3;} .pp-labshape{fill:var(--pp-paint);stroke:#2A2A35;stroke-width:1.6;stroke-linejoin:round;}'
  + '.pp-word{font-weight:800;font-size:15px;line-height:1.1;color:var(--pp-ink);font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);margin-top:-2px;} .pp-word.is-big{position:absolute;top:44%;left:0;right:0;font-size:17px;text-align:center;} .is-tight .pp-word{font-size:13px;}'
  + '.pp-tin.is-on{transform:translateY(-8px);} .pp-tin.is-on .pp-lid{transform:rotate(-28deg);} .pp-tin.is-on .pp-can{filter:drop-shadow(0 6px 4px rgba(0,0,0,.18));} .pp-tin.is-on::after{content:"";position:absolute;inset:-4px;border-radius:14px;box-shadow:0 0 0 3px var(--pp-paint);pointer-events:none;}'
  + '.pp-tin.is-drip{animation:pp-tip .5s ease-in-out 2;} @keyframes pp-tip{50%{transform:rotate(-12deg);}}'
  + '.pp-counters{display:flex;flex-direction:column;gap:8px;align-items:center;} .is-narrow .pp-counters{flex-direction:row;justify-content:center;gap:12px;}'
  + '.pp-counter{display:flex;align-items:center;gap:4px;padding:3px;border-radius:12px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #C9B897;} .pp-swatch{width:12px;height:36px;border-radius:5px;background:var(--pp-paint);}'
  + '.pp-step{width:44px;height:44px;border:0;border-radius:10px;background:#E3F1EC;font-weight:800;font-size:24px;line-height:1;color:var(--pp-teal);cursor:pointer;} .pp-step:disabled{opacity:.5;cursor:default;}'
  + '.pp-val:empty{box-shadow:inset 0 0 0 2px #C9B897;border-radius:8px;height:34px;background:#fff;} .pp-val{min-width:34px;text-align:center;font-weight:800;font-size:24px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);color:var(--pp-ink);}'
  /* the success show */
  + '.pp-board.is-show.show-lift .pp-piece{animation:pp-lift 1s ease-in-out 2;} @keyframes pp-lift{50%{transform:translateY(-14px);}}'
  + '.pp-board.is-show.show-wiggle .pp-piece{animation:pp-wig .5s ease-in-out 4;} @keyframes pp-wig{25%{transform:rotate(-4deg);}75%{transform:rotate(4deg);}}'
  + '.pp-board.is-show.show-bob .pp-piece{animation:pp-bob .7s ease-in-out 3;} @keyframes pp-bob{50%{transform:translateY(6px) rotate(2deg);}}'
  + '.pp-board.is-show.show-flutter .pp-piece{animation:pp-flut .25s ease-in-out 8;} @keyframes pp-flut{50%{transform:scale(1.05);}}'
  + '.pp-board.is-show.show-chug .pp-piece{animation:pp-chug .3s ease-in-out 6;} @keyframes pp-chug{50%{transform:translateX(5px);}}'
  + '.pp-board.is-show.show-tilt .pp-piece{animation:pp-tilt .6s ease-in-out 3;} @keyframes pp-tilt{50%{transform:rotate(6deg);}}'
  + '.pp-board.is-show.show-beam .pp-piece{animation:pp-beam .5s ease-in-out 4;} @keyframes pp-beam{50%{filter:brightness(1.35);}}'
  + '.pp-board.is-show.show-sway .pp-piece{animation:pp-sway .8s ease-in-out 2;} @keyframes pp-sway{25%{transform:rotate(-3deg);}75%{transform:rotate(3deg);}}'
  + '.pp-board.is-show.show-puff .pp-piece{animation:pp-puff .6s ease-in-out 3;} @keyframes pp-puff{50%{transform:translateY(-6px);}}'
  + '.pp-piece.is-shrug{animation:pp-wig .5s ease-in-out 2;}'
  + '.pp-note{min-height:28px;align-self:center;font:700 20px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--pp-ink);text-align:center;max-width:620px;} .pp-note:empty{display:none;} .pp-note.is-ok{color:var(--pp-teal);font-weight:800;} .pp-note.is-wrong{color:#A6461F;} .is-narrow .pp-note{font-size:17px;}'
  + '.is-tight.pp-wrap{gap:6px;} .is-tight .pp-ask{align-items:center;gap:8px;} .is-tight .pp-note{font-size:15px;line-height:1.25;text-align:left;flex:1;min-height:0;}'
  + '.pp-ask{display:flex;justify-content:center;} .pp-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .pp-check[hidden]{display:none;} .pp-check:disabled{opacity:.5;}'
  + '.pp-tin:focus-visible,.pp-step:focus-visible,.pp-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.pp-piece,.pp-drop,.pp-stream,.pp-trace,.pp-tin,.pp-zone{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'pp-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.PaintPotsActivity = PaintPotsActivity;
