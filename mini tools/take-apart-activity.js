/* =====================================================================
   take-apart-activity.js — ACTIVITY #105 of the one-by-one rebuild:
   "Is It Still a Triangle?" → THE TAKE-APART TRAY (1.G.A.1, 11 locales).
   Design: docs/activities-rebuild/designs/105-sort-bins.md
   ---------------------------------------------------------------------
   THE INVENTION: tap any shape and it falls apart into its sticks and
   joints on a tray — the sticks line up longest first, the joints drop
   into cups (one cup per place where two stick ends should meet). A
   triangle is three straight sticks and three full cups however it was
   turned, painted or stretched; a curved "triangle" drops a bent stick;
   an open shape leaves a cup EMPTY; a circle's hoop has no ends and no
   cups. Level 1 sorts real members from look-alikes into two boxes,
   level 2 names one shape, level 3 solves a riddle.
   Miss 1: the first misplaced shape lies taken apart on the tray and the
   yes-box shows its rule as a stick pattern; the hint asks a question
   about the sticks (never the answer). Miss 2: the target's prototype
   (level 1) or the chosen name's prototype (level 2) lies beside it,
   stick for stick; level 3 draws the riddle's sticks under its card.
   Success: the yes-box shuts and its shapes come apart into bundles of
   equal sticks tied with a ribbon; then a paint pot, a turn knob and a
   stretch handle let the child try to "break" a shape — and fail.
   ACTIVITY LAYER ONLY: the model is take-apart-core.js; every shape and
   the tray are drawn geometry; lcs-shell.js untouched (the shell's Check
   is hidden and pressed by this activity when right).
   Test seams: window.TakeApartActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._view / ._dims / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var TakeApartActivity = {
  id: 'take-apart',
  apparatusClasses: ['ta-'],

  /*STRINGS-BEGIN*/strings: {
    title:        {en:'Is It Still a Triangle?',de:'Ist es noch ein Dreieck?',nl:'Is het nog een driehoek?',da:'Er det stadig en trekant?',sv:'Är det fortfarande en triangel?',no:'Er det fortsatt en trekant?',es:'¿Sigue siendo un triángulo?',it:'È ancora un triangolo?',pt:'Ainda é um triângulo?',fr:'Est-ce encore un triangle ?',fi:'Onko se yhä kolmio?'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    tRealTri:     {en:'Which shapes are real triangles? Tap one to take it apart, then sort them all.',de:'Welche Formen sind echte Dreiecke? Tippe eine an, um sie zu zerlegen, und sortiere dann alle.',nl:'Welke vormen zijn echte driehoeken? Tik op een vorm om hem uit elkaar te halen en sorteer ze dan allemaal.',da:'Hvilke figurer er rigtige trekanter? Tryk på en for at skille den ad, og sortér dem så allesammen.',sv:'Vilka former är riktiga trianglar? Tryck på en för att ta isär den och sortera sedan alla.',no:'Hvilke former er ekte trekanter? Trykk på en for å ta den fra hverandre, og sorter så alle.',es:'¿Qué figuras son triángulos de verdad? Toca una para desarmarla y luego clasifícalas todas.',it:'Quali figure sono veri triangoli? Tocca una figura per smontarla, poi smistale tutte.',pt:'Quais figuras são triângulos de verdade? Toque em uma para desmontá-la e depois separe todas.',fr:'Quelles formes sont de vrais triangles ? Touche une forme pour la démonter, puis trie-les toutes.',fi:'Mitkä kuviot ovat oikeita kolmioita? Napauta kuviota, niin se purkautuu osiin, ja lajittele sitten kaikki.'},
    tRealQuad:    {en:'Which shapes really have four sides? Tap one to take it apart, then sort them all.',de:'Welche Formen sind echte Vierecke? Tippe eine an, um sie zu zerlegen, und sortiere dann alle.',nl:'Welke vormen zijn echte vierhoeken? Tik op een vorm om hem uit elkaar te halen en sorteer ze dan allemaal.',da:'Hvilke figurer er rigtige firkanter? Tryk på en for at skille den ad, og sortér dem så allesammen.',sv:'Vilka former är riktiga fyrhörningar? Tryck på en för att ta isär den och sortera sedan alla.',no:'Hvilke former er ekte firkanter? Trykk på en for å ta den fra hverandre, og sorter så alle.',es:'¿Qué figuras son cuadriláteros de verdad? Toca una para desarmarla y luego clasifícalas todas.',it:'Quali figure sono veri quadrilateri? Tocca una figura per smontarla, poi smistale tutte.',pt:'Quais figuras são quadriláteros de verdade? Toque em uma para desmontá-la e depois separe todas.',fr:'Quelles formes sont de vrais quadrilatères ? Touche une forme pour la démonter, puis trie-les toutes.',fi:'Mitkä kuviot ovat oikeita nelikulmioita? Napauta kuviota, niin se purkautuu osiin, ja lajittele sitten kaikki.'},
    tRealPent:    {en:'Which shapes are real pentagons? Tap one to take it apart, then sort them all.',de:'Welche Formen sind echte Fünfecke? Tippe eine an, um sie zu zerlegen, und sortiere dann alle.',nl:'Welke vormen zijn echte vijfhoeken? Tik op een vorm om hem uit elkaar te halen en sorteer ze dan allemaal.',da:'Hvilke figurer er rigtige femkanter? Tryk på en for at skille den ad, og sortér dem så allesammen.',sv:'Vilka former är riktiga femhörningar? Tryck på en för att ta isär den och sortera sedan alla.',no:'Hvilke former er ekte femkanter? Trykk på en for å ta den fra hverandre, og sorter så alle.',es:'¿Qué figuras son pentágonos de verdad? Toca una para desarmarla y luego clasifícalas todas.',it:'Quali figure sono veri pentagoni? Tocca una figura per smontarla, poi smistale tutte.',pt:'Quais figuras são pentágonos de verdade? Toque em uma para desmontá-la e depois separe todas.',fr:'Quelles formes sont de vrais pentagones ? Touche une forme pour la démonter, puis trie-les toutes.',fi:'Mitkä kuviot ovat oikeita viisikulmioita? Napauta kuviota, niin se purkautuu osiin, ja lajittele sitten kaikki.'},
    tRealHex:     {en:'Which shapes are real hexagons? Tap one to take it apart, then sort them all.',de:'Welche Formen sind echte Sechsecke? Tippe eine an, um sie zu zerlegen, und sortiere dann alle.',nl:'Welke vormen zijn echte zeshoeken? Tik op een vorm om hem uit elkaar te halen en sorteer ze dan allemaal.',da:'Hvilke figurer er rigtige sekskanter? Tryk på en for at skille den ad, og sortér dem så allesammen.',sv:'Vilka former är riktiga sexhörningar? Tryck på en för att ta isär den och sortera sedan alla.',no:'Hvilke former er ekte sekskanter? Trykk på en for å ta den fra hverandre, og sorter så alle.',es:'¿Qué figuras son hexágonos de verdad? Toca una para desarmarla y luego clasifícalas todas.',it:'Quali figure sono veri esagoni? Tocca una figura per smontarla, poi smistale tutte.',pt:'Quais figuras são hexágonos de verdade? Toque em uma para desmontá-la e depois separe todas.',fr:'Quelles formes sont de vrais hexagones ? Touche une forme pour la démonter, puis trie-les toutes.',fi:'Mitkä kuviot ovat oikeita kuusikulmioita? Napauta kuviota, niin se purkautuu osiin, ja lajittele sitten kaikki.'},
    tRealCirc:    {en:'Which shapes are real circles? Tap one to take it apart, then sort them all.',de:'Welche Formen sind echte Kreise? Tippe eine an, um sie zu zerlegen, und sortiere dann alle.',nl:'Welke vormen zijn echte cirkels? Tik op een vorm om hem uit elkaar te halen en sorteer ze dan allemaal.',da:'Hvilke figurer er rigtige cirkler? Tryk på en for at skille den ad, og sortér dem så allesammen.',sv:'Vilka former är riktiga cirklar? Tryck på en för att ta isär den och sortera sedan alla.',no:'Hvilke former er ekte sirkler? Trykk på en for å ta den fra hverandre, og sorter så alle.',es:'¿Qué figuras son círculos de verdad? Toca una para desarmarla y luego clasifícalas todas.',it:'Quali figure sono veri cerchi? Tocca una figura per smontarla, poi smistale tutte.',pt:'Quais figuras são círculos de verdade? Toque em uma para desmontá-la e depois separe todas.',fr:'Quelles formes sont de vrais cercles ? Touche une forme pour la démonter, puis trie-les toutes.',fi:'Mitkä kuviot ovat oikeita ympyröitä? Napauta kuviota, niin se purkautuu osiin, ja lajittele sitten kaikki.'},
    tName:        {en:'What is this shape called? Tap it to take it apart.',de:'Wie heißt diese Form? Tippe sie an, um sie zu zerlegen.',nl:'Hoe heet deze vorm? Tik erop om hem uit elkaar te halen.',da:'Hvad hedder denne figur? Tryk på den for at skille den ad.',sv:'Vad heter den här formen? Tryck på den för att ta isär den.',no:'Hva heter denne formen? Trykk på den for å ta den fra hverandre.',es:'¿Cómo se llama esta figura? Tócala para desarmarla.',it:'Come si chiama questa figura? Toccala per smontarla.',pt:'Qual é o nome desta figura? Toque nela para desmontá-la.',fr:'Comment s’appelle cette forme ? Touche-la pour la démonter.',fi:'Mikä tämän kuvion nimi on? Napauta sitä, niin se purkautuu osiin.'},
    tRiddle:      {en:'Read the riddle. Which shape is it?',de:'Lies das Rätsel. Welche Form ist es?',nl:'Lees het raadsel. Welke vorm is het?',da:'Læs gåden. Hvilken figur er det?',sv:'Läs gåtan. Vilken form är det?',no:'Les gåten. Hvilken form er det?',es:'Lee la adivinanza. ¿Qué figura es?',it:'Leggi l’indovinello. Quale figura è?',pt:'Leia a adivinhação. Qual é a figura?',fr:'Lis la devinette. Quelle forme est-ce ?',fi:'Lue arvoitus. Mikä kuvio se on?'},
    bxYesTri:     {en:'Triangle',de:'Dreieck',nl:'Driehoek',da:'Trekant',sv:'Triangel',no:'Trekant',es:'Triángulo',it:'Triangolo',pt:'Triângulo',fr:'Triangle',fi:'Kolmio'},
    bxNoTri:      {en:'Not a triangle',de:'Kein Dreieck',nl:'Geen driehoek',da:'Ikke en trekant',sv:'Inte en triangel',no:'Ikke en trekant',es:'No es un triángulo',it:'Non è un triangolo',pt:'Não é um triângulo',fr:'Pas un triangle',fi:'Ei kolmio'},
    bxYesQuad:    {en:'Four-sided shape',de:'Viereck',nl:'Vierhoek',da:'Firkant',sv:'Fyrhörning',no:'Firkant',es:'Cuadrilátero',it:'Quadrilatero',pt:'Quadrilátero',fr:'Quadrilatère',fi:'Nelikulmio'},
    bxNoQuad:     {en:'Not four-sided',de:'Kein Viereck',nl:'Geen vierhoek',da:'Ikke en firkant',sv:'Inte en fyrhörning',no:'Ikke en firkant',es:'No es un cuadrilátero',it:'Non è un quadrilatero',pt:'Não é um quadrilátero',fr:'Pas un quadrilatère',fi:'Ei nelikulmio'},
    bxYesPent:    {en:'Pentagon',de:'Fünfeck',nl:'Vijfhoek',da:'Femkant',sv:'Femhörning',no:'Femkant',es:'Pentágono',it:'Pentagono',pt:'Pentágono',fr:'Pentagone',fi:'Viisikulmio'},
    bxNoPent:     {en:'Not a pentagon',de:'Kein Fünfeck',nl:'Geen vijfhoek',da:'Ikke en femkant',sv:'Inte en femhörning',no:'Ikke en femkant',es:'No es un pentágono',it:'Non è un pentagono',pt:'Não é um pentágono',fr:'Pas un pentagone',fi:'Ei viisikulmio'},
    bxYesHex:     {en:'Hexagon',de:'Sechseck',nl:'Zeshoek',da:'Sekskant',sv:'Sexhörning',no:'Sekskant',es:'Hexágono',it:'Esagono',pt:'Hexágono',fr:'Hexagone',fi:'Kuusikulmio'},
    bxNoHex:      {en:'Not a hexagon',de:'Kein Sechseck',nl:'Geen zeshoek',da:'Ikke en sekskant',sv:'Inte en sexhörning',no:'Ikke en sekskant',es:'No es un hexágono',it:'Non è un esagono',pt:'Não é um hexágono',fr:'Pas un hexagone',fi:'Ei kuusikulmio'},
    bxYesCirc:    {en:'Circle',de:'Kreis',nl:'Cirkel',da:'Cirkel',sv:'Cirkel',no:'Sirkel',es:'Círculo',it:'Cerchio',pt:'Círculo',fr:'Cercle',fi:'Ympyrä'},
    bxNoCirc:     {en:'Not a circle',de:'Kein Kreis',nl:'Geen cirkel',da:'Ikke en cirkel',sv:'Inte en cirkel',no:'Ikke en sirkel',es:'No es un círculo',it:'Non è un cerchio',pt:'Não é um círculo',fr:'Pas un cercle',fi:'Ei ympyrä'},
    nmTri:        {en:'triangle',de:'Dreieck',nl:'driehoek',da:'trekant',sv:'triangel',no:'trekant',es:'triángulo',it:'triangolo',pt:'triângulo',fr:'triangle',fi:'kolmio'},
    nmSquare:     {en:'square',de:'Quadrat',nl:'vierkant',da:'kvadrat',sv:'kvadrat',no:'kvadrat',es:'cuadrado',it:'quadrato',pt:'quadrado',fr:'carré',fi:'neliö'},
    nmRect:       {en:'rectangle',de:'Rechteck',nl:'rechthoek',da:'rektangel',sv:'rektangel',no:'rektangel',es:'rectángulo',it:'rettangolo',pt:'retângulo',fr:'rectangle',fi:'suorakulmio'},
    nmPent:       {en:'pentagon',de:'Fünfeck',nl:'vijfhoek',da:'femkant',sv:'femhörning',no:'femkant',es:'pentágono',it:'pentagono',pt:'pentágono',fr:'pentagone',fi:'viisikulmio'},
    nmHex:        {en:'hexagon',de:'Sechseck',nl:'zeshoek',da:'sekskant',sv:'sexhörning',no:'sekskant',es:'hexágono',it:'esagono',pt:'hexágono',fr:'hexagone',fi:'kuusikulmio'},
    nmCirc:       {en:'circle',de:'Kreis',nl:'cirkel',da:'cirkel',sv:'cirkel',no:'sirkel',es:'círculo',it:'cerchio',pt:'círculo',fr:'cercle',fi:'ympyrä'},
    nmHalf:       {en:'half-circle',de:'Halbkreis',nl:'halve cirkel',da:'halvcirkel',sv:'halvcirkel',no:'halvsirkel',es:'semicírculo',it:'semicerchio',pt:'semicírculo',fr:'demi-cercle',fi:'puoliympyrä'},
    rd1:          {en:'I have 3 straight sides and 3 corners. What am I?',de:'Ich habe 3 gerade Seiten und 3 Ecken. Wer bin ich?',nl:'Ik heb 3 rechte zijden en 3 hoeken. Wat ben ik?',da:'Jeg har 3 rette sider og 3 hjørner. Hvad er jeg?',sv:'Jag har 3 raka sidor och 3 hörn. Vad är jag?',no:'Jeg har 3 rette sider og 3 hjørner. Hva er jeg?',es:'Tengo 3 lados rectos y 3 vértices. ¿Quién soy?',it:'Ho 3 lati dritti e 3 vertici. Chi sono?',pt:'Tenho 3 lados retos e 3 vértices. Quem sou eu?',fr:'J’ai 3 côtés droits et 3 sommets. Qui suis-je ?',fi:'Minulla on 3 suoraa sivua ja 3 kulmaa. Mikä minä olen?'},
    rd2:          {en:'I have 4 sides, all the same length, and 4 square corners. What am I?',de:'Ich habe 4 Seiten, alle gleich lang, und 4 rechte Winkel. Wer bin ich?',nl:'Ik heb 4 zijden, allemaal even lang, en 4 rechte hoeken. Wat ben ik?',da:'Jeg har 4 sider, der alle er lige lange, og 4 rette vinkler. Hvad er jeg?',sv:'Jag har 4 sidor som alla är lika långa och 4 räta vinklar. Vad är jag?',no:'Jeg har 4 sider som alle er like lange, og 4 rette vinkler. Hva er jeg?',es:'Tengo 4 lados, todos del mismo largo, y 4 ángulos rectos. ¿Quién soy?',it:'Ho 4 lati tutti lunghi uguali e 4 angoli retti. Chi sono?',pt:'Tenho 4 lados, todos do mesmo tamanho, e 4 ângulos retos. Quem sou eu?',fr:'J’ai 4 côtés de la même longueur et 4 angles droits. Qui suis-je ?',fi:'Minulla on 4 yhtä pitkää sivua ja 4 suoraa kulmaa. Mikä minä olen?'},
    rd3:          {en:'I have 4 sides and 4 square corners. Two sides are long and two are short. What am I?',de:'Ich habe 4 Seiten und 4 rechte Winkel. Zwei Seiten sind lang und zwei sind kurz. Wer bin ich?',nl:'Ik heb 4 zijden en 4 rechte hoeken. Twee zijden zijn lang en twee zijn kort. Wat ben ik?',da:'Jeg har 4 sider og 4 rette vinkler. To sider er lange, og to er korte. Hvad er jeg?',sv:'Jag har 4 sidor och 4 räta vinklar. Två sidor är långa och två är korta. Vad är jag?',no:'Jeg har 4 sider og 4 rette vinkler. To sider er lange, og to er korte. Hva er jeg?',es:'Tengo 4 lados y 4 ángulos rectos. Dos lados son largos y dos son cortos. ¿Quién soy?',it:'Ho 4 lati e 4 angoli retti. Due lati sono lunghi e due sono corti. Chi sono?',pt:'Tenho 4 lados e 4 ângulos retos. Dois lados são compridos e dois são curtos. Quem sou eu?',fr:'J’ai 4 côtés et 4 angles droits. Deux côtés sont longs et deux sont courts. Qui suis-je ?',fi:'Minulla on 4 sivua ja 4 suoraa kulmaa. Kaksi sivua on pitkiä ja kaksi lyhyitä. Mikä minä olen?'},
    rd4:          {en:'I am closed, and I have 3 straight sides. What am I?',de:'Ich bin geschlossen und habe 3 gerade Seiten. Wer bin ich?',nl:'Ik ben gesloten en ik heb 3 rechte zijden. Wat ben ik?',da:'Jeg er lukket, og jeg har 3 rette sider. Hvad er jeg?',sv:'Jag är sluten och har 3 raka sidor. Vad är jag?',no:'Jeg er lukket og har 3 rette sider. Hva er jeg?',es:'Soy una figura cerrada y tengo 3 lados rectos. ¿Quién soy?',it:'Sono una figura chiusa e ho 3 lati dritti. Chi sono?',pt:'Sou uma figura fechada e tenho 3 lados retos. Quem sou eu?',fr:'Je suis une figure fermée et j’ai 3 côtés droits. Qui suis-je ?',fi:'Olen suljettu kuvio, ja minulla on 3 suoraa sivua. Mikä minä olen?'},
    rd5:          {en:'I have 5 sides and 5 corners. What am I?',de:'Ich habe 5 Seiten und 5 Ecken. Wer bin ich?',nl:'Ik heb 5 zijden en 5 hoeken. Wat ben ik?',da:'Jeg har 5 sider og 5 hjørner. Hvad er jeg?',sv:'Jag har 5 sidor och 5 hörn. Vad är jag?',no:'Jeg har 5 sider og 5 hjørner. Hva er jeg?',es:'Tengo 5 lados y 5 vértices. ¿Quién soy?',it:'Ho 5 lati e 5 vertici. Chi sono?',pt:'Tenho 5 lados e 5 vértices. Quem sou eu?',fr:'J’ai 5 côtés et 5 sommets. Qui suis-je ?',fi:'Minulla on 5 sivua ja 5 kulmaa. Mikä minä olen?'},
    rd6:          {en:'I have 6 straight sides. What am I?',de:'Ich habe 6 gerade Seiten. Wer bin ich?',nl:'Ik heb 6 rechte zijden. Wat ben ik?',da:'Jeg har 6 rette sider. Hvad er jeg?',sv:'Jag har 6 raka sidor. Vad är jag?',no:'Jeg har 6 rette sider. Hva er jeg?',es:'Tengo 6 lados rectos. ¿Quién soy?',it:'Ho 6 lati dritti. Chi sono?',pt:'Tenho 6 lados retos. Quem sou eu?',fr:'J’ai 6 côtés droits. Qui suis-je ?',fi:'Minulla on 6 suoraa sivua. Mikä minä olen?'},
    rd7:          {en:'I have 1 straight side and 1 curved side. What am I?',de:'Ich habe 1 gerade Seite und 1 gebogene Seite. Wer bin ich?',nl:'Ik heb 1 rechte zijde en 1 gebogen zijde. Wat ben ik?',da:'Jeg har 1 ret side og 1 buet side. Hvad er jeg?',sv:'Jag har 1 rak sida och 1 böjd sida. Vad är jag?',no:'Jeg har 1 rett side og 1 buet side. Hva er jeg?',es:'Tengo 1 lado recto y 1 lado curvo. ¿Quién soy?',it:'Ho 1 lato dritto e 1 lato curvo. Chi sono?',pt:'Tenho 1 lado reto e 1 lado curvo. Quem sou eu?',fr:'J’ai 1 côté droit et 1 côté courbe. Qui suis-je ?',fi:'Minulla on 1 suora sivu ja 1 kaareva sivu. Mikä minä olen?'},
    rd8:          {en:'I have no corners and no straight sides. What am I?',de:'Ich habe keine Ecken und keine geraden Seiten. Wer bin ich?',nl:'Ik heb geen hoeken en geen rechte zijden. Wat ben ik?',da:'Jeg har ingen hjørner og ingen rette sider. Hvad er jeg?',sv:'Jag har inga hörn och inga raka sidor. Vad är jag?',no:'Jeg har ingen hjørner og ingen rette sider. Hva er jeg?',es:'No tengo vértices ni lados rectos. ¿Quién soy?',it:'Non ho vertici e non ho lati dritti. Chi sono?',pt:'Não tenho vértices nem lados retos. Quem sou eu?',fr:'Je n’ai ni sommet ni côté droit. Qui suis-je ?',fi:'Minulla ei ole kulmia eikä suoria sivuja. Mikä minä olen?'},
    rd9:          {en:'I have 4 sides, all the same length, but no square corners. What am I?',de:'Ich habe 4 Seiten, alle gleich lang, aber keine rechten Winkel. Wer bin ich?',nl:'Ik heb 4 zijden, allemaal even lang, maar geen rechte hoeken. Wat ben ik?',da:'Jeg har 4 sider, der alle er lige lange, men ingen rette vinkler. Hvad er jeg?',sv:'Jag har 4 sidor som alla är lika långa, men inga räta vinklar. Vad är jag?',no:'Jeg har 4 sider som alle er like lange, men ingen rette vinkler. Hva er jeg?',es:'Tengo 4 lados, todos del mismo largo, pero ningún ángulo recto. ¿Quién soy?',it:'Ho 4 lati tutti lunghi uguali, ma nessun angolo retto. Chi sono?',pt:'Tenho 4 lados, todos do mesmo tamanho, mas nenhum ângulo reto. Quem sou eu?',fr:'J’ai 4 côtés de la même longueur, mais pas d’angle droit. Qui suis-je ?',fi:'Minulla on 4 yhtä pitkää sivua, mutta ei yhtään suoraa kulmaa. Mikä minä olen?'},
    hintPlace:    {en:'Put every shape in a box first.',de:'Leg zuerst jede Form in eine Kiste.',nl:'Leg eerst elke vorm in een bak.',da:'Læg først hver figur i en kasse.',sv:'Lägg först varje form i en låda.',no:'Legg først hver form i en kasse.',es:'Primero pon cada figura en una caja.',it:'Prima metti ogni figura in una scatola.',pt:'Primeiro coloque cada figura em uma caixa.',fr:'D’abord, mets chaque forme dans une boîte.',fi:'Laita ensin jokainen kuvio laatikkoon.'},
    hintName:     {en:'Tap a name first.',de:'Tippe zuerst einen Namen an.',nl:'Tik eerst op een naam.',da:'Tryk først på et navn.',sv:'Tryck först på ett namn.',no:'Trykk først på et navn.',es:'Primero toca un nombre.',it:'Prima tocca un nome.',pt:'Primeiro toque em um nome.',fr:'D’abord, touche un nom.',fi:'Napauta ensin nimeä.'},
    hintFrame:    {en:'Put a shape in the frame first.',de:'Leg zuerst eine Form in den Rahmen.',nl:'Leg eerst een vorm in het lijstje.',da:'Læg først en figur i rammen.',sv:'Lägg först en form i ramen.',no:'Legg først en form i rammen.',es:'Primero pon una figura en el marco.',it:'Prima metti una figura nella cornice.',pt:'Primeiro coloque uma figura na moldura.',fr:'D’abord, mets une forme dans le cadre.',fi:'Laita ensin kuvio kehykseen.'},
    hintTurn:     {en:'Look at its sticks on the tray. Did turning, size or colour change them?',de:'Schau dir die Stäbchen auf dem Tablett an. Hat Drehen, Größe oder Farbe sie verändert?',nl:'Kijk naar de stokjes op het dienblad. Zijn ze veranderd door draaien, grootte of kleur?',da:'Se på pindene på bakken. Ændrede drejning, størrelse eller farve dem?',sv:'Titta på pinnarna på brickan. Har vridning, storlek eller färg ändrat dem?',no:'Se på pinnene på brettet. Endret vridning, størrelse eller farge dem?',es:'Mira sus palitos en la charola. ¿Cambiaron al girarla, al cambiar su tamaño o su color?',it:'Guarda i suoi bastoncini sul vassoio. Girarla o cambiarne la grandezza o il colore li ha cambiati?',pt:'Olhe os palitos dela na bandeja. Girar a figura ou mudar o tamanho ou a cor mudou os palitos?',fr:'Regarde ses bâtonnets sur le plateau. Tourner la forme, changer sa taille ou sa couleur les a-t-il changés ?',fi:'Katso sen tikkuja alustalla. Muuttiko kääntäminen, koko tai väri niitä?'},
    hintOpen:     {en:'Look at the cups on the tray: is every corner joined?',de:'Schau dir die Mulden auf dem Tablett an: Ist jede Ecke verbunden?',nl:'Kijk naar de kuiltjes op het dienblad: is elke hoek dicht?',da:'Se på skålene på bakken: Er hvert hjørne samlet?',sv:'Titta på skålarna på brickan: är varje hörn ihopsatt?',no:'Se på skålene på brettet: Er hvert hjørne satt sammen?',es:'Mira los huequitos en la charola: ¿está unido cada vértice?',it:'Guarda le coppette sul vassoio: ogni vertice è unito?',pt:'Olhe os buraquinhos na bandeja: cada vértice está unido?',fr:'Regarde les godets sur le plateau : chaque sommet est-il bien assemblé ?',fi:'Katso kuppeja alustalla: onko jokainen kulma liitetty?'},
    bentTri:      {en:'One stick is curved. Can a triangle have a curved side?',de:'Ein Stäbchen ist gebogen. Kann ein Dreieck eine gebogene Seite haben?',nl:'Eén stokje is gebogen. Kan een driehoek een gebogen zijde hebben?',da:'En pind er buet. Kan en trekant have en buet side?',sv:'En pinne är böjd. Kan en triangel ha en böjd sida?',no:'En pinne er buet. Kan en trekant ha en buet side?',es:'Un palito es curvo. ¿Puede un triángulo tener un lado curvo?',it:'Un bastoncino è curvo. Un triangolo può avere un lato curvo?',pt:'Um palito é curvo. Um triângulo pode ter um lado curvo?',fr:'Un bâtonnet est courbe. Un triangle peut-il avoir un côté courbe ?',fi:'Yksi tikku on kaareva. Voiko kolmiolla olla kaareva sivu?'},
    cntTri:       {en:'Count the sticks on the tray. How many does a triangle have?',de:'Zähl die Stäbchen auf dem Tablett. Wie viele hat ein Dreieck?',nl:'Tel de stokjes op het dienblad. Hoeveel heeft een driehoek?',da:'Tæl pindene på bakken. Hvor mange har en trekant?',sv:'Räkna pinnarna på brickan. Hur många har en triangel?',no:'Tell pinnene på brettet. Hvor mange har en trekant?',es:'Cuenta los palitos en la charola. ¿Cuántos tiene un triángulo?',it:'Conta i bastoncini sul vassoio. Quanti ne ha un triangolo?',pt:'Conte os palitos na bandeja. Quantos tem um triângulo?',fr:'Compte les bâtonnets sur le plateau. Combien en a un triangle ?',fi:'Laske tikut alustalla. Montako niitä on kolmiolla?'},
    bentQuad:     {en:'One stick is curved. Can a four-sided shape have a curved side?',de:'Ein Stäbchen ist gebogen. Kann ein Viereck eine gebogene Seite haben?',nl:'Eén stokje is gebogen. Kan een vierhoek een gebogen zijde hebben?',da:'En pind er buet. Kan en firkant have en buet side?',sv:'En pinne är böjd. Kan en fyrhörning ha en böjd sida?',no:'En pinne er buet. Kan en firkant ha en buet side?',es:'Un palito es curvo. ¿Puede un cuadrilátero tener un lado curvo?',it:'Un bastoncino è curvo. Un quadrilatero può avere un lato curvo?',pt:'Um palito é curvo. Um quadrilátero pode ter um lado curvo?',fr:'Un bâtonnet est courbe. Un quadrilatère peut-il avoir un côté courbe ?',fi:'Yksi tikku on kaareva. Voiko nelikulmiolla olla kaareva sivu?'},
    cntQuad:      {en:'Count the sticks on the tray. How many does a four-sided shape have?',de:'Zähl die Stäbchen auf dem Tablett. Wie viele hat ein Viereck?',nl:'Tel de stokjes op het dienblad. Hoeveel heeft een vierhoek?',da:'Tæl pindene på bakken. Hvor mange har en firkant?',sv:'Räkna pinnarna på brickan. Hur många har en fyrhörning?',no:'Tell pinnene på brettet. Hvor mange har en firkant?',es:'Cuenta los palitos en la charola. ¿Cuántos tiene un cuadrilátero?',it:'Conta i bastoncini sul vassoio. Quanti ne ha un quadrilatero?',pt:'Conte os palitos na bandeja. Quantos tem um quadrilátero?',fr:'Compte les bâtonnets sur le plateau. Combien en a un quadrilatère ?',fi:'Laske tikut alustalla. Montako niitä on nelikulmiolla?'},
    bentPent:     {en:'One stick is curved. Can a pentagon have a curved side?',de:'Ein Stäbchen ist gebogen. Kann ein Fünfeck eine gebogene Seite haben?',nl:'Eén stokje is gebogen. Kan een vijfhoek een gebogen zijde hebben?',da:'En pind er buet. Kan en femkant have en buet side?',sv:'En pinne är böjd. Kan en femhörning ha en böjd sida?',no:'En pinne er buet. Kan en femkant ha en buet side?',es:'Un palito es curvo. ¿Puede un pentágono tener un lado curvo?',it:'Un bastoncino è curvo. Un pentagono può avere un lato curvo?',pt:'Um palito é curvo. Um pentágono pode ter um lado curvo?',fr:'Un bâtonnet est courbe. Un pentagone peut-il avoir un côté courbe ?',fi:'Yksi tikku on kaareva. Voiko viisikulmiolla olla kaareva sivu?'},
    cntPent:      {en:'Count the sticks on the tray. How many does a pentagon have?',de:'Zähl die Stäbchen auf dem Tablett. Wie viele hat ein Fünfeck?',nl:'Tel de stokjes op het dienblad. Hoeveel heeft een vijfhoek?',da:'Tæl pindene på bakken. Hvor mange har en femkant?',sv:'Räkna pinnarna på brickan. Hur många har en femhörning?',no:'Tell pinnene på brettet. Hvor mange har en femkant?',es:'Cuenta los palitos en la charola. ¿Cuántos tiene un pentágono?',it:'Conta i bastoncini sul vassoio. Quanti ne ha un pentagono?',pt:'Conte os palitos na bandeja. Quantos tem um pentágono?',fr:'Compte les bâtonnets sur le plateau. Combien en a un pentagone ?',fi:'Laske tikut alustalla. Montako niitä on viisikulmiolla?'},
    bentHex:      {en:'One stick is curved. Can a hexagon have a curved side?',de:'Ein Stäbchen ist gebogen. Kann ein Sechseck eine gebogene Seite haben?',nl:'Eén stokje is gebogen. Kan een zeshoek een gebogen zijde hebben?',da:'En pind er buet. Kan en sekskant have en buet side?',sv:'En pinne är böjd. Kan en sexhörning ha en böjd sida?',no:'En pinne er buet. Kan en sekskant ha en buet side?',es:'Un palito es curvo. ¿Puede un hexágono tener un lado curvo?',it:'Un bastoncino è curvo. Un esagono può avere un lato curvo?',pt:'Um palito é curvo. Um hexágono pode ter um lado curvo?',fr:'Un bâtonnet est courbe. Un hexagone peut-il avoir un côté courbe ?',fi:'Yksi tikku on kaareva. Voiko kuusikulmiolla olla kaareva sivu?'},
    cntHex:       {en:'Count the sticks on the tray. How many does a hexagon have?',de:'Zähl die Stäbchen auf dem Tablett. Wie viele hat ein Sechseck?',nl:'Tel de stokjes op het dienblad. Hoeveel heeft een zeshoek?',da:'Tæl pindene på bakken. Hvor mange har en sekskant?',sv:'Räkna pinnarna på brickan. Hur många har en sexhörning?',no:'Tell pinnene på brettet. Hvor mange har en sekskant?',es:'Cuenta los palitos en la charola. ¿Cuántos tiene un hexágono?',it:'Conta i bastoncini sul vassoio. Quanti ne ha un esagono?',pt:'Conte os palitos na bandeja. Quantos tem um hexágono?',fr:'Compte les bâtonnets sur le plateau. Combien en a un hexagone ?',fi:'Laske tikut alustalla. Montako niitä on kuusikulmiolla?'},
    hintCircle:   {en:'Look at the tray: does a circle have straight sticks or corners?',de:'Schau auf das Tablett: Hat ein Kreis gerade Stäbchen oder Ecken?',nl:'Kijk naar het dienblad: heeft een cirkel hoeken of rechte stokjes?',da:'Se på bakken: Har en cirkel rette pinde eller hjørner?',sv:'Titta på brickan: har en cirkel raka pinnar eller hörn?',no:'Se på brettet: Har en sirkel rette pinner eller hjørner?',es:'Mira la charola: ¿un círculo tiene palitos rectos o vértices?',it:'Guarda il vassoio: un cerchio ha bastoncini dritti o vertici?',pt:'Olhe a bandeja: um círculo tem palitos retos ou vértices?',fr:'Regarde le plateau : un cercle a-t-il des bâtonnets droits ou des sommets ?',fi:'Katso alustaa: onko ympyrällä suoria tikkuja tai kulmia?'},
    hintOval:     {en:'Look at the hoop: is it just as wide every way, like a circle?',de:'Schau dir den Ring an: Ist er in jede Richtung gleich breit, wie ein Kreis?',nl:'Kijk naar de ring: is hij overal even breed, zoals een cirkel?',da:'Se på ringen: Er den lige bred alle veje, ligesom en cirkel?',sv:'Titta på ringen: är den lika bred åt alla håll, som en cirkel?',no:'Se på ringen: Er den like bred alle veier, som en sirkel?',es:'Mira el aro: ¿es igual de ancho por todos lados, como un círculo?',it:'Guarda l’anello: è largo uguale in ogni direzione, come un cerchio?',pt:'Olhe o aro: ele tem a mesma largura para todos os lados, como um círculo?',fr:'Regarde l’anneau : est-il aussi large dans tous les sens, comme un cercle ?',fi:'Katso rengasta: onko se joka suuntaan yhtä leveä, kuin ympyrä?'},
    hintCount2:   {en:'Count the sticks on the tray, then choose the name again.',de:'Zähl die Stäbchen auf dem Tablett und wähl dann noch einmal den Namen.',nl:'Tel de stokjes op het dienblad en kies dan opnieuw de naam.',da:'Tæl pindene på bakken, og vælg så navnet igen.',sv:'Räkna pinnarna på brickan och välj sedan namnet igen.',no:'Tell pinnene på brettet, og velg så navnet igjen.',es:'Cuenta los palitos en la charola y vuelve a elegir el nombre.',it:'Conta i bastoncini sul vassoio, poi scegli di nuovo il nome.',pt:'Conte os palitos na bandeja e escolha o nome de novo.',fr:'Compte les bâtonnets sur le plateau, puis choisis de nouveau le nom.',fi:'Laske tikut alustalla ja valitse sitten nimi uudelleen.'},
    hintLine2:    {en:'Look at the sticks in a row: are they all the same length? Look for square corners too.',de:'Schau dir die Stäbchen in der Reihe an: Sind alle gleich lang? Achte auch auf rechte Winkel.',nl:'Kijk naar de stokjes op een rij: zijn ze allemaal even lang? Let ook op rechte hoeken.',da:'Se på pindene på række: Er de alle lige lange? Se også efter rette vinkler.',sv:'Titta på pinnarna i rad: är alla lika långa? Leta också efter räta vinklar.',no:'Se på pinnene på rad: Er alle like lange? Se også etter rette vinkler.',es:'Mira los palitos en fila: ¿son todos del mismo largo? Busca también ángulos rectos.',it:'Guarda i bastoncini in fila: sono tutti lunghi uguali? Cerca anche gli angoli retti.',pt:'Olhe os palitos em fila: todos têm o mesmo tamanho? Procure também ângulos retos.',fr:'Regarde les bâtonnets en rang : ont-ils tous la même longueur ? Cherche aussi les angles droits.',fi:'Katso tikkuja rivissä: ovatko ne kaikki yhtä pitkiä? Etsi myös suoria kulmia.'},
    hintBent2:    {en:'Look at the sticks on the tray: are they straight or bent?',de:'Schau dir die Stäbchen auf dem Tablett an: Sind sie gerade oder gebogen?',nl:'Kijk naar de stokjes op het dienblad: zijn ze recht of gebogen?',da:'Se på pindene på bakken: Er de rette eller buede?',sv:'Titta på pinnarna på brickan: är de raka eller böjda?',no:'Se på pinnene på brettet: Er de rette eller buede?',es:'Mira los palitos en la charola: ¿son rectos o curvos?',it:'Guarda i bastoncini sul vassoio: sono dritti o curvi?',pt:'Olhe os palitos na bandeja: eles são retos ou curvos?',fr:'Regarde les bâtonnets sur le plateau : sont-ils droits ou courbes ?',fi:'Katso tikkuja alustalla: ovatko ne suoria vai kaarevia?'},
    hintRiddle1:  {en:'Look at its sticks on the tray and check every part of the riddle.',de:'Schau dir die Stäbchen auf dem Tablett an und prüfe jeden Teil des Rätsels.',nl:'Kijk naar de stokjes op het dienblad en controleer elk deel van het raadsel.',da:'Se på pindene på bakken, og tjek hver del af gåden.',sv:'Titta på pinnarna på brickan och kontrollera varje del av gåtan.',no:'Se på pinnene på brettet, og sjekk hver del av gåten.',es:'Mira sus palitos en la charola y revisa cada parte de la adivinanza.',it:'Guarda i suoi bastoncini sul vassoio e controlla ogni parte dell’indovinello.',pt:'Olhe os palitos dela na bandeja e confira cada parte da adivinhação.',fr:'Regarde ses bâtonnets sur le plateau et vérifie chaque partie de la devinette.',fi:'Katso sen tikkuja alustalla ja tarkista arvoituksen jokainen kohta.'},
    hintBoth:     {en:'Look at both rows on the tray: do they have the same sticks and corners?',de:'Schau dir beide Reihen auf dem Tablett an: Haben sie die gleichen Stäbchen und Ecken?',nl:'Kijk naar beide rijen op het dienblad: hebben ze dezelfde stokjes en hoeken?',da:'Se på begge rækker på bakken: Har de de samme pinde og hjørner?',sv:'Titta på båda raderna på brickan: har de samma pinnar och hörn?',no:'Se på begge radene på brettet: Har de de samme pinnene og hjørnene?',es:'Mira las dos filas de la charola: ¿tienen los mismos palitos y vértices?',it:'Guarda le due file sul vassoio: hanno gli stessi bastoncini e vertici?',pt:'Olhe as duas fileiras na bandeja: elas têm os mesmos palitos e vértices?',fr:'Regarde les deux rangées du plateau : ont-elles les mêmes bâtonnets et les mêmes sommets ?',fi:'Katso alustan kahta riviä: onko niissä samat tikut ja kulmat?'},
    hintRiddle2:  {en:'The card now shows the sticks the riddle asks for. Which shape has them?',de:'Die Karte zeigt jetzt die Stäbchen, die das Rätsel verlangt. Welche Form hat genau diese Stäbchen?',nl:'De kaart laat nu de stokjes zien die het raadsel vraagt. Welke vorm heeft precies die stokjes?',da:'Kortet viser nu de pinde, gåden spørger om. Hvilken figur har dem?',sv:'Kortet visar nu pinnarna som gåtan frågar efter. Vilken form har dem?',no:'Kortet viser nå pinnene gåten spør etter. Hvilken form har dem?',es:'La tarjeta ya muestra los palitos que pide la adivinanza. ¿Qué figura los tiene?',it:'La carta ora mostra i bastoncini che chiede l’indovinello. Quale figura li ha?',pt:'O cartão agora mostra os palitos que a adivinhação pede. Qual figura tem esses palitos?',fr:'La carte montre maintenant les bâtonnets que demande la devinette. Quelle forme les a ?',fi:'Kortti näyttää nyt tikut, joita arvoitus kysyy. Missä kuviossa ne ovat?'},
    okTri:        {en:'Every triangle has 3 straight sides — big or small, turned or not!',de:'Jedes Dreieck hat 3 gerade Seiten – ob groß oder klein, gedreht oder nicht!',nl:'Elke driehoek heeft 3 rechte zijden – groot of klein, gedraaid of niet!',da:'Alle trekanter har 3 rette sider – store eller små, drejede eller ej!',sv:'Alla trianglar har 3 raka sidor – stora eller små, vridna eller inte!',no:'Alle trekanter har 3 rette sider – store eller små, vridde eller ikke!',es:'¡Todo triángulo tiene 3 lados rectos, grande o pequeño, girado o no!',it:'Ogni triangolo ha 3 lati dritti, grande o piccolo, girato o no!',pt:'Todo triângulo tem 3 lados retos, grande ou pequeno, girado ou não!',fr:'Tout triangle a 3 côtés droits, grand ou petit, tourné ou pas !',fi:'Jokaisella kolmiolla on 3 suoraa sivua – oli se iso tai pieni, käännetty tai ei!'},
    okQuad:       {en:'Every four-sided shape has 4 straight sides — big or small, turned or not!',de:'Jedes Viereck hat 4 gerade Seiten – ob groß oder klein, gedreht oder nicht!',nl:'Elke vierhoek heeft 4 rechte zijden – groot of klein, gedraaid of niet!',da:'Alle firkanter har 4 rette sider – store eller små, drejede eller ej!',sv:'Alla fyrhörningar har 4 raka sidor – stora eller små, vridna eller inte!',no:'Alle firkanter har 4 rette sider – store eller små, vridde eller ikke!',es:'¡Todo cuadrilátero tiene 4 lados rectos, grande o pequeño, girado o no!',it:'Ogni quadrilatero ha 4 lati dritti, grande o piccolo, girato o no!',pt:'Todo quadrilátero tem 4 lados retos, grande ou pequeno, girado ou não!',fr:'Tout quadrilatère a 4 côtés droits, grand ou petit, tourné ou pas !',fi:'Jokaisella nelikulmiolla on 4 suoraa sivua – oli se iso tai pieni, käännetty tai ei!'},
    okPent:       {en:'Every pentagon has 5 straight sides — big or small, turned or not!',de:'Jedes Fünfeck hat 5 gerade Seiten – ob groß oder klein, gedreht oder nicht!',nl:'Elke vijfhoek heeft 5 rechte zijden – groot of klein, gedraaid of niet!',da:'Alle femkanter har 5 rette sider – store eller små, drejede eller ej!',sv:'Alla femhörningar har 5 raka sidor – stora eller små, vridna eller inte!',no:'Alle femkanter har 5 rette sider – store eller små, vridde eller ikke!',es:'¡Todo pentágono tiene 5 lados rectos, grande o pequeño, girado o no!',it:'Ogni pentagono ha 5 lati dritti, grande o piccolo, girato o no!',pt:'Todo pentágono tem 5 lados retos, grande ou pequeno, girado ou não!',fr:'Tout pentagone a 5 côtés droits, grand ou petit, tourné ou pas !',fi:'Jokaisella viisikulmiolla on 5 suoraa sivua – oli se iso tai pieni, käännetty tai ei!'},
    okHex:        {en:'Every hexagon has 6 straight sides — big or small, turned or not!',de:'Jedes Sechseck hat 6 gerade Seiten – ob groß oder klein, gedreht oder nicht!',nl:'Elke zeshoek heeft 6 rechte zijden – groot of klein, gedraaid of niet!',da:'Alle sekskanter har 6 rette sider – store eller små, drejede eller ej!',sv:'Alla sexhörningar har 6 raka sidor – stora eller små, vridna eller inte!',no:'Alle sekskanter har 6 rette sider – store eller små, vridde eller ikke!',es:'¡Todo hexágono tiene 6 lados rectos, grande o pequeño, girado o no!',it:'Ogni esagono ha 6 lati dritti, grande o piccolo, girato o no!',pt:'Todo hexágono tem 6 lados retos, grande ou pequeno, girado ou não!',fr:'Tout hexagone a 6 côtés droits, grand ou petit, tourné ou pas !',fi:'Jokaisella kuusikulmiolla on 6 suoraa sivua – oli se iso tai pieni, käännetty tai ei!'},
    okCirc:       {en:'Every circle is round all the way and just as wide every way — big or small!',de:'Jeder Kreis ist ganz rund und in jede Richtung gleich breit – ob groß oder klein!',nl:'Elke cirkel is helemaal rond en overal even breed – groot of klein!',da:'Alle cirkler er runde hele vejen rundt og lige brede alle veje – store eller små!',sv:'Alla cirklar är runda hela vägen runt och lika breda åt alla håll – stora eller små!',no:'Alle sirkler er runde hele veien rundt og like brede alle veier – store eller små!',es:'¡Todo círculo es redondo por completo e igual de ancho por todos lados, grande o pequeño!',it:'Ogni cerchio è tutto tondo e largo uguale in ogni direzione, grande o piccolo!',pt:'Todo círculo é redondo por inteiro e tem a mesma largura para todos os lados, grande ou pequeno!',fr:'Tout cercle est rond d’un bout à l’autre et aussi large dans tous les sens, grand ou petit !',fi:'Jokainen ympyrä on pyöreä joka puolelta ja joka suuntaan yhtä leveä – oli se iso tai pieni!'},
    ok2Tri:       {en:'Triangle — 3 straight sides!',de:'Dreieck – 3 gerade Seiten!',nl:'Driehoek – 3 rechte zijden!',da:'Trekant – 3 rette sider!',sv:'Triangel – 3 raka sidor!',no:'Trekant – 3 rette sider!',es:'¡Triángulo: 3 lados rectos!',it:'Triangolo: 3 lati dritti!',pt:'Triângulo: 3 lados retos!',fr:'Triangle : 3 côtés droits !',fi:'Kolmio – 3 suoraa sivua!'},
    ok2Square:    {en:'Square — 4 equal sides and 4 square corners!',de:'Quadrat – 4 gleich lange Seiten und 4 rechte Winkel!',nl:'Vierkant – 4 even lange zijden en 4 rechte hoeken!',da:'Kvadrat – 4 lige lange sider og 4 rette vinkler!',sv:'Kvadrat – 4 lika långa sidor och 4 räta vinklar!',no:'Kvadrat – 4 like lange sider og 4 rette vinkler!',es:'¡Cuadrado: 4 lados del mismo largo y 4 ángulos rectos!',it:'Quadrato: 4 lati lunghi uguali e 4 angoli retti!',pt:'Quadrado: 4 lados do mesmo tamanho e 4 ângulos retos!',fr:'Carré : 4 côtés de même longueur et 4 angles droits !',fi:'Neliö – 4 yhtä pitkää sivua ja 4 suoraa kulmaa!'},
    ok2Rect:      {en:'Rectangle — 4 straight sides and 4 square corners!',de:'Rechteck – 4 gerade Seiten und 4 rechte Winkel!',nl:'Rechthoek – 4 rechte zijden en 4 rechte hoeken!',da:'Rektangel – 4 rette sider og 4 rette vinkler!',sv:'Rektangel – 4 raka sidor och 4 räta vinklar!',no:'Rektangel – 4 rette sider og 4 rette vinkler!',es:'¡Rectángulo: 4 lados rectos y 4 ángulos rectos!',it:'Rettangolo: 4 lati dritti e 4 angoli retti!',pt:'Retângulo: 4 lados retos e 4 ângulos retos!',fr:'Rectangle : 4 côtés droits et 4 angles droits !',fi:'Suorakulmio – 4 suoraa sivua ja 4 suoraa kulmaa!'},
    ok2Pent:      {en:'Pentagon — 5 straight sides!',de:'Fünfeck – 5 gerade Seiten!',nl:'Vijfhoek – 5 rechte zijden!',da:'Femkant – 5 rette sider!',sv:'Femhörning – 5 raka sidor!',no:'Femkant – 5 rette sider!',es:'¡Pentágono: 5 lados rectos!',it:'Pentagono: 5 lati dritti!',pt:'Pentágono: 5 lados retos!',fr:'Pentagone : 5 côtés droits !',fi:'Viisikulmio – 5 suoraa sivua!'},
    ok2Hex:       {en:'Hexagon — 6 straight sides!',de:'Sechseck – 6 gerade Seiten!',nl:'Zeshoek – 6 rechte zijden!',da:'Sekskant – 6 rette sider!',sv:'Sexhörning – 6 raka sidor!',no:'Sekskant – 6 rette sider!',es:'¡Hexágono: 6 lados rectos!',it:'Esagono: 6 lati dritti!',pt:'Hexágono: 6 lados retos!',fr:'Hexagone : 6 côtés droits !',fi:'Kuusikulmio – 6 suoraa sivua!'},
    ok2Circ:      {en:'Circle — round all the way and just as wide every way!',de:'Kreis – ganz rund und in jede Richtung gleich breit!',nl:'Cirkel – helemaal rond en overal even breed!',da:'Cirkel – rund hele vejen rundt og lige bred alle veje!',sv:'Cirkel – rund hela vägen runt och lika bred åt alla håll!',no:'Sirkel – rund hele veien rundt og like bred alle veier!',es:'¡Círculo: redondo por completo e igual de ancho por todos lados!',it:'Cerchio: tutto tondo e largo uguale in ogni direzione!',pt:'Círculo: redondo por inteiro e com a mesma largura para todos os lados!',fr:'Cercle : rond d’un bout à l’autre et aussi large dans tous les sens !',fi:'Ympyrä – pyöreä joka puolelta ja joka suuntaan yhtä leveä!'},
    ok2Half:      {en:'Half-circle — 1 straight side and 1 curved side!',de:'Halbkreis – 1 gerade Seite und 1 gebogene Seite!',nl:'Halve cirkel – 1 rechte zijde en 1 gebogen zijde!',da:'Halvcirkel – 1 ret side og 1 buet side!',sv:'Halvcirkel – 1 rak sida och 1 böjd sida!',no:'Halvsirkel – 1 rett side og 1 buet side!',es:'¡Semicírculo: 1 lado recto y 1 lado curvo!',it:'Semicerchio: 1 lato dritto e 1 lato curvo!',pt:'Semicírculo: 1 lado reto e 1 lado curvo!',fr:'Demi-cercle : 1 côté droit et 1 côté courbe !',fi:'Puoliympyrä – 1 suora sivu ja 1 kaareva sivu!'},
    ok3_1:        {en:'Riddle solved: I am a triangle!',de:'Rätsel gelöst: Ich bin ein Dreieck!',nl:'Raadsel opgelost: ik ben een driehoek!',da:'Gåden er løst: Jeg er en trekant!',sv:'Gåtan är löst: jag är en triangel!',no:'Gåten er løst: Jeg er en trekant!',es:'¡Adivinanza resuelta: soy un triángulo!',it:'Indovinello risolto: sono un triangolo!',pt:'Adivinhação resolvida: eu sou um triângulo!',fr:'Devinette résolue : je suis un triangle !',fi:'Arvoitus ratkaistu: olen kolmio!'},
    ok3_2:        {en:'Riddle solved: I am a square!',de:'Rätsel gelöst: Ich bin ein Quadrat!',nl:'Raadsel opgelost: ik ben een vierkant!',da:'Gåden er løst: Jeg er et kvadrat!',sv:'Gåtan är löst: jag är en kvadrat!',no:'Gåten er løst: Jeg er et kvadrat!',es:'¡Adivinanza resuelta: soy un cuadrado!',it:'Indovinello risolto: sono un quadrato!',pt:'Adivinhação resolvida: eu sou um quadrado!',fr:'Devinette résolue : je suis un carré !',fi:'Arvoitus ratkaistu: olen neliö!'},
    ok3_3:        {en:'Riddle solved: I am a rectangle!',de:'Rätsel gelöst: Ich bin ein Rechteck!',nl:'Raadsel opgelost: ik ben een rechthoek!',da:'Gåden er løst: Jeg er et rektangel!',sv:'Gåtan är löst: jag är en rektangel!',no:'Gåten er løst: Jeg er et rektangel!',es:'¡Adivinanza resuelta: soy un rectángulo!',it:'Indovinello risolto: sono un rettangolo!',pt:'Adivinhação resolvida: eu sou um retângulo!',fr:'Devinette résolue : je suis un rectangle !',fi:'Arvoitus ratkaistu: olen suorakulmio!'},
    ok3_4:        {en:'Riddle solved: I am a triangle — closed, with 3 straight sides!',de:'Rätsel gelöst: Ich bin ein Dreieck – geschlossen, mit 3 geraden Seiten!',nl:'Raadsel opgelost: ik ben een driehoek – gesloten, met 3 rechte zijden!',da:'Gåden er løst: Jeg er en trekant – lukket, med 3 rette sider!',sv:'Gåtan är löst: jag är en triangel – sluten, med 3 raka sidor!',no:'Gåten er løst: Jeg er en trekant – lukket, med 3 rette sider!',es:'¡Adivinanza resuelta: soy un triángulo, cerrado y con 3 lados rectos!',it:'Indovinello risolto: sono un triangolo, chiuso, con 3 lati dritti!',pt:'Adivinhação resolvida: eu sou um triângulo, fechado, com 3 lados retos!',fr:'Devinette résolue : je suis un triangle, fermé, avec 3 côtés droits !',fi:'Arvoitus ratkaistu: olen kolmio – suljettu, ja siinä on 3 suoraa sivua!'},
    ok3_5:        {en:'Riddle solved: I am a pentagon!',de:'Rätsel gelöst: Ich bin ein Fünfeck!',nl:'Raadsel opgelost: ik ben een vijfhoek!',da:'Gåden er løst: Jeg er en femkant!',sv:'Gåtan är löst: jag är en femhörning!',no:'Gåten er løst: Jeg er en femkant!',es:'¡Adivinanza resuelta: soy un pentágono!',it:'Indovinello risolto: sono un pentagono!',pt:'Adivinhação resolvida: eu sou um pentágono!',fr:'Devinette résolue : je suis un pentagone !',fi:'Arvoitus ratkaistu: olen viisikulmio!'},
    ok3_6:        {en:'Riddle solved: I am a hexagon — an L can have 6 straight sides too!',de:'Rätsel gelöst: Ich bin ein Sechseck – auch ein L kann 6 gerade Seiten haben!',nl:'Raadsel opgelost: ik ben een zeshoek – ook een L kan 6 rechte zijden hebben!',da:'Gåden er løst: Jeg er en sekskant – også et L kan have 6 rette sider!',sv:'Gåtan är löst: jag är en sexhörning – även ett L kan ha 6 raka sidor!',no:'Gåten er løst: Jeg er en sekskant – også en L kan ha 6 rette sider!',es:'¡Adivinanza resuelta: soy un hexágono, y una L también puede tener 6 lados rectos!',it:'Indovinello risolto: sono un esagono, e anche una L può avere 6 lati dritti!',pt:'Adivinhação resolvida: eu sou um hexágono, e um L também pode ter 6 lados retos!',fr:'Devinette résolue : je suis un hexagone, et un L aussi peut avoir 6 côtés droits !',fi:'Arvoitus ratkaistu: olen kuusikulmio – myös L-kirjaimen muotoisella kuviolla voi olla 6 suoraa sivua!'},
    ok3_7:        {en:'Riddle solved: I am a half-circle!',de:'Rätsel gelöst: Ich bin ein Halbkreis!',nl:'Raadsel opgelost: ik ben een halve cirkel!',da:'Gåden er løst: Jeg er en halvcirkel!',sv:'Gåtan är löst: jag är en halvcirkel!',no:'Gåten er løst: Jeg er en halvsirkel!',es:'¡Adivinanza resuelta: soy un semicírculo!',it:'Indovinello risolto: sono un semicerchio!',pt:'Adivinhação resolvida: eu sou um semicírculo!',fr:'Devinette résolue : je suis un demi-cercle !',fi:'Arvoitus ratkaistu: olen puoliympyrä!'},
    ok3_8:        {en:'Riddle solved: I am a circle!',de:'Rätsel gelöst: Ich bin ein Kreis!',nl:'Raadsel opgelost: ik ben een cirkel!',da:'Gåden er løst: Jeg er en cirkel!',sv:'Gåtan är löst: jag är en cirkel!',no:'Gåten er løst: Jeg er en sirkel!',es:'¡Adivinanza resuelta: soy un círculo!',it:'Indovinello risolto: sono un cerchio!',pt:'Adivinhação resolvida: eu sou um círculo!',fr:'Devinette résolue : je suis un cercle !',fi:'Arvoitus ratkaistu: olen ympyrä!'},
    ok3_9:        {en:'Riddle solved: I am a rhombus — 4 equal sides, no square corners!',de:'Rätsel gelöst: Ich bin eine Raute – 4 gleich lange Seiten, keine rechten Winkel!',nl:'Raadsel opgelost: ik ben een ruit – 4 even lange zijden, geen rechte hoeken!',da:'Gåden er løst: Jeg er en rombe – 4 lige lange sider, ingen rette vinkler!',sv:'Gåtan är löst: jag är en romb – 4 lika långa sidor, inga räta vinklar!',no:'Gåten er løst: Jeg er en rombe – 4 like lange sider, ingen rette vinkler!',es:'¡Adivinanza resuelta: soy un rombo, con 4 lados del mismo largo y sin ángulos rectos!',it:'Indovinello risolto: sono un rombo, con 4 lati lunghi uguali e nessun angolo retto!',pt:'Adivinhação resolvida: eu sou um losango, com 4 lados do mesmo tamanho e nenhum ângulo reto!',fr:'Devinette résolue : je suis un losange, avec 4 côtés de même longueur et sans angle droit !',fi:'Arvoitus ratkaistu: olen neljäkäs – 4 yhtä pitkää sivua, ei suoria kulmia!'},
    aShape:       {en:'Shape {n}: {colour}, {size}, {turn}',de:'Form {n}: {colour}, {size}, {turn}',nl:'Vorm {n}: {colour}, {size}, {turn}',da:'Figur {n}: {colour}, {size}, {turn}',sv:'Form {n}: {colour}, {size}, {turn}',no:'Form {n}: {colour}, {size}, {turn}',es:'Figura {n}: {colour}, {size}, {turn}',it:'Figura {n}: {colour}, {size}, {turn}',pt:'Figura {n}: {colour}, {size}, {turn}',fr:'Forme {n} : {colour}, {size}, {turn}',fi:'Kuvio {n}: {colour}, {size}, {turn}'},
    colCoral:     {en:'orange',de:'orange',nl:'oranje',da:'orange',sv:'orange',no:'oransje',es:'naranja',it:'arancione',pt:'laranja',fr:'orange',fi:'oranssi'},
    colTeal:      {en:'turquoise',de:'türkis',nl:'turquoise',da:'turkis',sv:'turkos',no:'turkis',es:'turquesa',it:'turchese',pt:'turquesa',fr:'turquoise',fi:'turkoosi'},
    colSun:       {en:'yellow',de:'gelb',nl:'geel',da:'gul',sv:'gul',no:'gul',es:'amarilla',it:'gialla',pt:'amarela',fr:'jaune',fi:'keltainen'},
    colPlum:      {en:'purple',de:'lila',nl:'paars',da:'lilla',sv:'lila',no:'lilla',es:'morada',it:'viola',pt:'roxa',fr:'violette',fi:'violetti'},
    colSky:       {en:'blue',de:'blau',nl:'blauw',da:'blå',sv:'blå',no:'blå',es:'azul',it:'azzurra',pt:'azul',fr:'bleue',fi:'sininen'},
    colLeaf:      {en:'green',de:'grün',nl:'groen',da:'grøn',sv:'grön',no:'grønn',es:'verde',it:'verde',pt:'verde',fr:'verte',fi:'vihreä'},
    szS:          {en:'small',de:'klein',nl:'klein',da:'lille',sv:'liten',no:'liten',es:'pequeña',it:'piccola',pt:'pequena',fr:'petite',fi:'pieni'},
    szM:          {en:'medium',de:'mittelgroß',nl:'middelgroot',da:'mellemstor',sv:'mellanstor',no:'middels stor',es:'mediana',it:'media',pt:'média',fr:'moyenne',fi:'keskikokoinen'},
    szL:          {en:'big',de:'groß',nl:'groot',da:'stor',sv:'stor',no:'stor',es:'grande',it:'grande',pt:'grande',fr:'grande',fi:'iso'},
    tuUp:         {en:'upright',de:'aufrecht',nl:'rechtop',da:'opret',sv:'upprätt',no:'oppreist',es:'sin girar',it:'non girata',pt:'sem girar',fr:'pas tournée',fi:'pystyssä'},
    tuTurned:     {en:'turned',de:'gedreht',nl:'gedraaid',da:'drejet',sv:'vriden',no:'vridd',es:'girada',it:'girata',pt:'girada',fr:'tournée',fi:'käännetty'},
    aTray:        {en:'Take-apart tray: tap it to put the shape back together',de:'Zerlege-Tablett: Tippe darauf, um die Form wieder zusammenzusetzen',nl:'Uit-elkaar-dienblad: tik erop om de vorm weer in elkaar te zetten',da:'Skil-ad-bakke: Tryk på den for at samle figuren igen',sv:'Ta-isär-bricka: tryck på den för att sätta ihop formen igen',no:'Ta-fra-hverandre-brett: Trykk på det for å sette formen sammen igjen',es:'Charola para desarmar: tócala para volver a armar la figura',it:'Vassoio per smontare: toccalo per rimontare la figura',pt:'Bandeja de desmontar: toque nela para montar a figura de novo',fr:'Plateau à démonter : touche-le pour remonter la forme',fi:'Purkualusta: napauta sitä, niin kuvio kootaan takaisin'},
    aTrayRead:    {en:'Straight sticks: {k}. Bent sticks: {j}. Corners: {m}. Empty cups: {e}.',de:'Gerade Stäbchen: {k}. Gebogene Stäbchen: {j}. Ecken: {m}. Leere Mulden: {e}.',nl:'Rechte stokjes: {k}. Gebogen stokjes: {j}. Hoeken: {m}. Lege kuiltjes: {e}.',da:'Rette pinde: {k}. Buede pinde: {j}. Hjørner: {m}. Tomme skåle: {e}.',sv:'Raka pinnar: {k}. Böjda pinnar: {j}. Hörn: {m}. Tomma skålar: {e}.',no:'Rette pinner: {k}. Buede pinner: {j}. Hjørner: {m}. Tomme skåler: {e}.',es:'Palitos rectos: {k}. Palitos curvos: {j}. Vértices: {m}. Huequitos vacíos: {e}.',it:'Bastoncini dritti: {k}. Bastoncini curvi: {j}. Vertici: {m}. Coppette vuote: {e}.',pt:'Palitos retos: {k}. Palitos curvos: {j}. Vértices: {m}. Buraquinhos vazios: {e}.',fr:'Bâtonnets droits : {k}. Bâtonnets courbes : {j}. Sommets : {m}. Godets vides : {e}.',fi:'Suoria tikkuja: {k}. Kaarevia tikkuja: {j}. Kulmia: {m}. Tyhjiä kuppeja: {e}.'},
    aShelf:       {en:'Shelf of shapes',de:'Regal mit Formen',nl:'Plank met vormen',da:'Hylde med figurer',sv:'Hylla med former',no:'Hylle med former',es:'Repisa de figuras',it:'Mensola delle figure',pt:'Prateleira de figuras',fr:'Étagère des formes',fi:'Kuviohylly'},
    aFrame:       {en:'Answer frame',de:'Antwortrahmen',nl:'Antwoordlijstje',da:'Svarramme',sv:'Svarsram',no:'Svarramme',es:'Marco de respuesta',it:'Cornice della risposta',pt:'Moldura da resposta',fr:'Cadre de réponse',fi:'Vastauskehys'},
    aSlot:        {en:'Name slot: tap to take the name back',de:'Namensfeld: tippen, um den Namen zurückzunehmen',nl:'Naamvak: tik om de naam terug te nemen',da:'Navnefelt: tryk for at tage navnet tilbage',sv:'Namnruta: tryck för att ta tillbaka namnet',no:'Navnefelt: trykk for å ta navnet tilbake',es:'Espacio del nombre: toca para quitar el nombre',it:'Spazio del nome: tocca per togliere il nome',pt:'Espaço do nome: toque para tirar o nome',fr:'Case du nom : touche pour reprendre le nom',fi:'Nimiruutu: napauta, niin nimi palaa takaisin'},
    aPaint:       {en:'Paint pot: change the colour',de:'Farbtopf: die Farbe ändern',nl:'Verfpot: de kleur veranderen',da:'Malerbøtte: skift farven',sv:'Färgburk: byt färg',no:'Malingsboks: bytt farge',es:'Bote de pintura: cambia el color',it:'Barattolo di colore: cambia il colore',pt:'Pote de tinta: mude a cor',fr:'Pot de peinture : change la couleur',fi:'Maalipurkki: vaihda väri'},
    aTurn:        {en:'Turn knob: turn the shape',de:'Drehknopf: die Form drehen',nl:'Draaiknop: de vorm draaien',da:'Drejeknap: drej figuren',sv:'Vridknapp: vrid formen',no:'Vriknapp: vri formen',es:'Perilla: gira la figura',it:'Manopola: gira la figura',pt:'Botão de girar: gire a figura',fr:'Bouton tournant : tourne la forme',fi:'Kääntönuppi: käännä kuviota'},
    aStretch:     {en:'Stretch handle: make it bigger or smaller',de:'Ziehgriff: größer oder kleiner machen',nl:'Rekhendel: groter of kleiner maken',da:'Strækhåndtag: gør den større eller mindre',sv:'Draghandtag: gör den större eller mindre',no:'Strekkhåndtak: gjør den større eller mindre',es:'Jaladera: hazla más grande o más pequeña',it:'Maniglia: falla più grande o più piccola',pt:'Alça de esticar: deixe maior ou menor',fr:'Poignée : rends-la plus grande ou plus petite',fi:'Venytyskahva: tee siitä isompi tai pienempi'},
    setLevel:     {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvReal:       {en:'Real or not?',de:'Echt oder nicht?',nl:'Echt of niet?',da:'Rigtig eller ej?',sv:'Riktig eller inte?',no:'Ekte eller ikke?',es:'¿De verdad o no?',it:'Vero o no?',pt:'De verdade ou não?',fr:'Vrai ou pas ?',fi:'Oikea vai ei?'},
    lvName:       {en:'Name it',de:'Benenne sie',nl:'Geef een naam',da:'Navngiv den',sv:'Ge den ett namn',no:'Gi den et navn',es:'Ponle nombre',it:'Dagli un nome',pt:'Dê o nome',fr:'Nomme-la',fi:'Nimeä se'},
    lvRiddle:     {en:'Riddles',de:'Rätsel',nl:'Raadsels',da:'Gåder',sv:'Gåtor',no:'Gåter',es:'Adivinanzas',it:'Indovinelli',pt:'Adivinhações',fr:'Devinettes',fi:'Arvoitukset'},
    setTray:      {en:'Take-apart tray',de:'Zerlege-Tablett',nl:'Uit-elkaar-dienblad',da:'Skil-ad-bakke',sv:'Ta-isär-bricka',no:'Ta-fra-hverandre-brett',es:'Charola para desarmar',it:'Vassoio per smontare',pt:'Bandeja de desmontar',fr:'Plateau à démonter',fi:'Purkualusta'},
    trOpen:       {en:'Open',de:'Offen',nl:'Open',da:'Åben',sv:'Öppen',no:'Åpen',es:'Abierta',it:'Aperto',pt:'Aberta',fr:'Ouvert',fi:'Auki'},
    trHelp:       {en:'Only as help',de:'Nur als Hilfe',nl:'Alleen als hulp',da:'Kun som hjælp',sv:'Bara som hjälp',no:'Bare som hjelp',es:'Solo como ayuda',it:'Solo come aiuto',pt:'Só como ajuda',fr:'Seulement pour aider',fi:'Vain apuna'},
    setShapes:    {en:'Shapes',de:'Formen',nl:'Vormen',da:'Figurer',sv:'Former',no:'Former',es:'Figuras',it:'Figure',pt:'Figuras',fr:'Formes',fi:'Kuviot'},
    sh6:          {en:'6',de:'6',nl:'6',da:'6',sv:'6',no:'6',es:'6',it:'6',pt:'6',fr:'6',fi:'6'},
    sh4:          {en:'4',de:'4',nl:'4',da:'4',sv:'4',no:'4',es:'4',it:'4',pt:'4',fr:'4',fi:'4'}
  },/*STRINGS-END*/

  defaults: { level: 'real', tray: 'open', shapes: '6' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'real', labelKey: 'lvReal' }, { value: 'name', labelKey: 'lvName' }, { value: 'riddle', labelKey: 'lvRiddle' }] },
    { key: 'tray', type: 'choice', labelKey: 'setTray', options: [{ value: 'open', labelKey: 'trOpen' }, { value: 'help', labelKey: 'trHelp' }] },
    { key: 'shapes', type: 'choice', labelKey: 'setShapes', options: [{ value: '6', labelKey: 'sh6' }, { value: '4', labelKey: 'sh4' }] }
  ],
  OK_MS: 500, FAST: false,
  COL: { coral: '#F2784B', teal: '#1F9A86', sun: '#F4C542', plum: '#9B5DB0', sky: '#4A9BE0', leaf: '#6DB653' },
  NAMEKEY: { triangle: 'nmTri', square: 'nmSquare', rectangle: 'nmRect', pentagon: 'nmPent', hexagon: 'nmHex', circle: 'nmCirc', halfcircle: 'nmHalf' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pos = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._swallow = 0;
    injectTakeApartCSS();
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) { if (this.st && this.st.level === 'real' && this.st.items.length !== this._count() && !this.st.done) this._start(this.st.r, this._at); this._paint(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return TakeApartCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return TakeApartCore.levelOf(this._setting('level')); },
  _help: function () { return TakeApartCore.trayOf(this._setting('tray')) === 'help'; },
  _count: function () { return TakeApartCore.countOf(this._setting('shapes')); },
  _key: function () { return this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TakeApartCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TakeApartCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      var P = C.plan(this._level(), Math.random, prevIds);
      this._order = P.order.map(function (id) { return pool.indexOf(id); }); this._pos = P.pos; this._orderForPool = pool; this._pass = pass;
    }
    var r = pool[this._order[at]], pa = { msg: '' }; this._pa = pa;
    var self = this;
    return {
      id: 'takeapart.' + this._loc() + '.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function () {
    var st = this.st; if (!st) return '';
    if (st.level === 'real') return this._t('tReal' + TakeApartCore.DATA.TKEY[st.target]);
    return this._t(st.level === 'name' ? 'tName' : 'tRiddle');
  },
  _setPrompt: function () { var line = this._promptText(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._endDrag(); this._at = at || 0;
    var lv = this._level(), pos = this._pos ? this._pos[this._at] : null;
    this.st = TakeApartCore.newState(lv, r, { count: this._count(), pos: pos });
    this._resetView(); this._setPrompt();
  },
  _resetView: function () { this._view = { showing: false, proto: null, pattern: false, note: '', ok: '', bob: false, fresh: -1, spin: false }; },
  _clearShowing: function () { var v = this._view; v.showing = false; v.proto = null; v.pattern = false; v.note = ''; v.bob = false; },

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
    var wrap = api.el('div', 'ta-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ta-shelf"></div><div class="ta-tray"></div><div class="ta-tools"></div><div class="ta-answer"></div><div class="ta-foot"></div><p class="ta-note" aria-live="polite"></p><p class="ta-sr" aria-live="polite"></p>';
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
  /* the geometry: the shelf, the tray, the answer area (boxes / name board / riddle card) */
  _dims: function () {
    var C = TakeApartCore, w = Math.min(this._width(), 680), B = C.band(this._width()), st = this.st, n = st.items.length;
    var cols = st.level === 'name' ? 1 : (B.wide ? n : Math.min(n, 3)), gap = 8;
    /* tiny (a 320 px phone: the shell's header alone takes 191 px) trims the shelf, the tray and the gaps so Check stays above the fold */
    var cell = st.level === 'name' ? (B.wide ? 156 : B.tiny ? 112 : 140) : Math.min(B.tiny ? 76 : 108, Math.floor((w - 16 - (cols - 1) * gap) / cols));
    var trayH = B.wide ? 128 : B.tiny ? 84 : 112;
    var boxW = Math.floor((w - 12) / 2), mini = 44, mcols = Math.max(2, Math.floor((boxW - 10) / (mini + 4)));
    return { w: w, wide: B.wide, tiny: B.tiny, cols: cols, cell: cell, gap: gap, box: cell - 8, floor: B.wide ? 60 : 58, trayH: trayH,
      boxW: boxW, mini: mini, mcols: mcols, cupR: B.wide ? 13 : 11, cupCols: B.wide ? 3 : 2, icon: B.wide ? 52 : 40 };
  },

  /* ---- drawing a shape (model box 100 × 100) ---- */
  _arcPts: function (a, b, sag, N) {
    var m = TakeApartCore.arcMid(a, b, sag), ax = a[0], ay = a[1], bx = b[0], by = b[1], mx = m[0], my = m[1];
    var d = 2 * (ax * (my - by) + mx * (by - ay) + bx * (ay - my));
    var ux = ((ax * ax + ay * ay) * (my - by) + (mx * mx + my * my) * (by - ay) + (bx * bx + by * by) * (ay - my)) / d;
    var uy = ((ax * ax + ay * ay) * (bx - mx) + (mx * mx + my * my) * (ax - bx) + (bx * bx + by * by) * (mx - ax)) / d;
    var R = Math.hypot(ax - ux, ay - uy), t0 = Math.atan2(ay - uy, ax - ux), tm = Math.atan2(my - uy, mx - ux), t1 = Math.atan2(by - uy, bx - ux);
    var norm = function (t) { while (t < t0) t += 2 * Math.PI; while (t >= t0 + 2 * Math.PI) t -= 2 * Math.PI; return t; };
    var e1 = norm(t1), em = norm(tm), sweep = em < e1 ? e1 - t0 : -(2 * Math.PI - (e1 - t0)), out = [];
    for (var i = 0; i <= N; i++) { var t = t0 + sweep * i / N; out.push([ux + R * Math.cos(t), uy + R * Math.sin(t)]); }
    return out;
  },
  _pathOf: function (sh) {
    var C = TakeApartCore, self = this, segs = [];
    sh.e.forEach(function (e) { var ab = C.ends(sh, e); segs.push(e.sag ? self._arcPts(ab[0], ab[1], e.sag, 24) : [ab[0], ab[1]]); });
    return segs;
  },
  _shapeSvg: function (it, px, opt) {
    opt = opt || {}; var C = TakeApartCore, sh = C.DATA.CAT[it.id], k = 100 / px, out = '';
    var col = this.COL[it.colour] || '#F2784B', joint = 6.5 * k, ink = 2;
    out += '<svg class="ta-shape-svg" width="' + f1(px) + '" height="' + f1(px) + '" viewBox="-8 -8 116 116" aria-hidden="true" focusable="false"><g transform="rotate(' + (it.r || 0) + ' 50 50)">';
    if (sh.hoop) {
      out += '<ellipse cx="50" cy="50" rx="' + sh.hoop.rx + '" ry="' + sh.hoop.ry + '" fill="' + col + '" fill-opacity=".7" stroke="#3A2E1F" stroke-width="' + f1(9 * k) + '"/>';
      out += '<ellipse cx="50" cy="50" rx="' + sh.hoop.rx + '" ry="' + sh.hoop.ry + '" fill="none" stroke="#C98B4A" stroke-width="' + f1(5 * k) + '"/>';
    } else {
      var fill = '', segs = this._pathOf(sh);
      /* the painted card behind the sticks follows the corners (and the arcs) */
      for (var i = 0; i < sh.e.length; i++) { var e = sh.e[i], A = sh.v[e.a], B = sh.v[e.b]; var pts = e.sag ? this._arcPts(A, B, e.sag, 24) : [A, B]; pts.forEach(function (p, j) { if (i === 0 && j === 0) fill += 'M' + f1(p[0]) + ' ' + f1(p[1]); else fill += 'L' + f1(p[0]) + ' ' + f1(p[1]); }); }
      out += '<path d="' + fill + 'Z" fill="' + col + '" fill-opacity=".7"/>';
      var sticks = segs.map(function (s) { return 'M' + s.map(function (p) { return f1(p[0]) + ' ' + f1(p[1]); }).join(' L'); }).join(' ');
      out += '<path d="' + sticks + '" fill="none" stroke="#3A2E1F" stroke-width="' + f1((5 + 2 * ink) * k) + '" stroke-linecap="round" stroke-linejoin="round"/>';
      out += '<path d="' + sticks + '" fill="none" stroke="#C98B4A" stroke-width="' + f1(5 * k) + '" stroke-linecap="round" stroke-linejoin="round"/>';
      for (var v = 0; v < sh.v.length; v++) if (sh.open.indexOf(v) < 0) out += '<circle cx="' + f1(sh.v[v][0]) + '" cy="' + f1(sh.v[v][1]) + '" r="' + f1(joint) + '" fill="#D9A441" stroke="#3A2E1F" stroke-width="' + f1(1.5 * k) + '"/>';
    }
    out += '</g></svg>';
    return out;
  },
  _sizeWord: function (s) { return this._t(s <= 0.6 ? 'szS' : s < 0.95 ? 'szM' : 'szL'); },
  _shapeLabel: function (i) { var it = this.st.items[i], turned = ((it.r % 360) + 360) % 360 !== 0; return this._t('aShape', { n: i + 1, colour: this._t('col' + it.colour.charAt(0).toUpperCase() + it.colour.slice(1)), size: this._sizeWord(it.s), turn: this._t(turned ? 'tuTurned' : 'tuUp') }); },

  /* ---- the tray: one row per shape taken apart ---- */
  _trayRow: function (it, D, rowH, opt) {
    var C = TakeApartCore, T = C.takeApart(it), sq = this.st.level !== 'real', out = '', fast = this.FAST;
    var W = D.w - 16, iconW = D.icon + 10, cupsW = D.cupCols * (2 * D.cupR + 8) + 6, rackW = W - iconW - cupsW - 12;
    var H = rowH, lanes = Math.max(3, T.sticks.length), laneH = (H - 14) / lanes, unit = rackW / 112;
    out += '<svg class="ta-row" width="' + f1(W) + '" height="' + f1(H) + '" viewBox="0 0 ' + f1(W) + ' ' + f1(H) + '" aria-hidden="true" focusable="false">';
    out += '<rect x="1" y="1" width="' + f1(W - 2) + '" height="' + f1(H - 2) + '" rx="12" fill="#FFF8EC" stroke="#3A2E1F" stroke-width="2.5"/>';
    /* which shape this row belongs to: its little picture */
    out += '<g transform="translate(6 ' + f1((H - D.icon) / 2) + ')">' + this._shapeSvg(it, D.icon).replace('<svg ', '<svg x="0" y="0" ') + '</g>';
    var x0 = iconW + 4;
    out += '<line x1="' + f1(x0 - 4) + '" y1="8" x2="' + f1(x0 - 4) + '" y2="' + f1(H - 8) + '" stroke="#E2CFAE" stroke-width="2"/>';
    T.sticks.forEach(function (s, k) {
      var cy = 7 + laneH * (k + 0.5), d = fast ? 0 : 40 * k, cls = 'ta-stick' + (s.curved ? ' is-bent' : '');
      if (s.hoop) {
        var R = Math.min((H - 16) / 2, rackW / 2 - 4) * (s.rx / 46), ry = R * (s.ry / s.rx), cx = x0 + R + 4, cyy = H / 2;
        out += '<g class="' + cls + '" style="animation-delay:' + d + 'ms"><ellipse cx="' + f1(cx) + '" cy="' + f1(cyy) + '" rx="' + f1(R) + '" ry="' + f1(ry) + '" fill="none" stroke="#3A2E1F" stroke-width="10"/><ellipse cx="' + f1(cx) + '" cy="' + f1(cyy) + '" rx="' + f1(R) + '" ry="' + f1(ry) + '" fill="none" stroke="#C98B4A" stroke-width="6"/></g>';
        return;
      }
      if (s.curved) {
        /* a bent stick keeps a visible bend inside its own lane: ends at the lane's top, the belly at its bottom */
        var c = s.chord * unit, dep = Math.max(8, Math.min(s.sag * unit, laneH - 6)), ye = cy - dep / 2;
        var p = 'M' + f1(x0) + ' ' + f1(ye) + ' Q' + f1(x0 + c / 2) + ' ' + f1(ye + 2 * dep) + ' ' + f1(x0 + c) + ' ' + f1(ye);
        out += '<g class="' + cls + '" style="animation-delay:' + d + 'ms;transform-origin:' + f1(x0 + c / 2) + 'px ' + f1(cy) + 'px"><path d="' + p + '" fill="none" stroke="#3A2E1F" stroke-width="10" stroke-linecap="round"/><path d="' + p + '" fill="none" stroke="#C98B4A" stroke-width="6" stroke-linecap="round"/></g>';
        return;
      }
      var L = s.len * unit, th = Math.max(6, Math.min(10, laneH - 5));
      out += '<g class="' + cls + '" style="animation-delay:' + d + 'ms"><rect x="' + f1(x0) + '" y="' + f1(cy - th / 2) + '" width="' + f1(L) + '" height="' + f1(th) + '" rx="' + f1(th / 2) + '" fill="#C98B4A" stroke="#3A2E1F" stroke-width="2"/></g>';
    });
    /* the cups: one per place where two stick ends should meet; an empty cup is dashed */
    var cx0 = W - cupsW + 2, ccols = D.cupCols, rows = Math.max(1, Math.ceil(T.cups.length / ccols)), pitchY = Math.min(2 * D.cupR + 8, (H - 12) / rows), y0 = (H - pitchY * rows) / 2;
    out += '<rect x="' + f1(cx0 - 4) + '" y="6" width="' + f1(cupsW - 6) + '" height="' + f1(H - 12) + '" rx="10" fill="#F3E3C6"/>';
    T.cups.forEach(function (u, k) {
      var cx = cx0 + (k % ccols) * (2 * D.cupR + 8) + D.cupR + 3, cy = y0 + Math.floor(k / ccols) * pitchY + pitchY / 2, d = fast ? 0 : 200 + 30 * k;
      out += '<circle cx="' + f1(cx) + '" cy="' + f1(cy) + '" r="' + D.cupR + '" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="2"' + (u.filled ? '' : ' stroke-dasharray="4 3" class="ta-empty"') + '/>';
      if (u.filled) out += '<circle class="ta-joint" style="animation-delay:' + d + 'ms" cx="' + f1(cx) + '" cy="' + f1(cy) + '" r="' + f1(D.cupR * 0.58) + '" fill="#D9A441" stroke="#3A2E1F" stroke-width="1.5"/>';
      if (u.square && sq) out += '<rect class="ta-sq" x="' + f1(cx + D.cupR * 0.25) + '" y="' + f1(cy - D.cupR * 1.05) + '" width="9" height="9" fill="#FFFDF6" stroke="#146B5E" stroke-width="2"/>';
    });
    out += '</svg>';
    return out;
  },
  /* the success tray: every yes-shape's sticks tied into a bundle with a ribbon */
  _bundles: function (list, D, H) {
    var C = TakeApartCore, W = D.w - 16, n = list.length, pitch = Math.min(110, (W - 20) / Math.max(1, n)), out = '';
    out += '<svg class="ta-row ta-bundles" width="' + f1(W) + '" height="' + f1(H) + '" viewBox="0 0 ' + f1(W) + ' ' + f1(H) + '" aria-hidden="true" focusable="false"><rect x="1" y="1" width="' + f1(W - 2) + '" height="' + f1(H - 2) + '" rx="12" fill="#FFF8EC" stroke="#3A2E1F" stroke-width="2.5"/>';
    var x0 = (W - pitch * n) / 2;
    list.forEach(function (it, k) {
      var T = C.takeApart(it), cx = x0 + pitch * (k + 0.5), top = 12, bot = H - 12, d = 80 * k;
      out += '<g class="ta-bundle" style="animation-delay:' + d + 'ms">';
      if (T.sticks[0] && T.sticks[0].hoop) {
        var R = Math.min(pitch / 2 - 8, (H - 24) / 2);
        out += '<circle cx="' + f1(cx) + '" cy="' + f1(H / 2) + '" r="' + f1(R) + '" fill="none" stroke="#3A2E1F" stroke-width="10"/><circle cx="' + f1(cx) + '" cy="' + f1(H / 2) + '" r="' + f1(R) + '" fill="none" stroke="#C98B4A" stroke-width="6"/>';
      } else {
        var m = T.sticks.length, sw = Math.min(9, (pitch - 24) / m);
        for (var j = 0; j < m; j++) { var x = cx - (m * sw) / 2 + j * sw; out += '<rect x="' + f1(x) + '" y="' + top + '" width="' + f1(sw - 1) + '" height="' + f1(bot - top) + '" rx="2" fill="#C98B4A" stroke="#3A2E1F" stroke-width="1.5"/>'; }
        out += '<rect x="' + f1(cx - (m * sw) / 2 - 4) + '" y="' + f1(H / 2 - 5) + '" width="' + f1(m * sw + 7) + '" height="10" rx="3" fill="#E85D75" stroke="#3A2E1F" stroke-width="1.5"/>';
        out += '<path d="M' + f1(cx) + ' ' + f1(H / 2 + 4) + ' l-7 14 M' + f1(cx) + ' ' + f1(H / 2 + 4) + ' l7 14" stroke="#E85D75" stroke-width="4" stroke-linecap="round"/>';
      }
      out += '</g>';
    });
    out += '</svg>';
    return out;
  },
  /* a box front's rule at miss 1: n stick icons and n joint dots (a hoop for the circle) */
  _ruleSvg: function (target) {
    var n = TakeApartCore.DATA.TARGETS[target], out = '<svg class="ta-rule" width="96" height="22" viewBox="0 0 96 22" aria-hidden="true">';
    if (!n) out += '<circle cx="48" cy="11" r="8" fill="none" stroke="#3A2E1F" stroke-width="5"/><circle cx="48" cy="11" r="8" fill="none" stroke="#C98B4A" stroke-width="2.5"/>';
    else for (var i = 0; i < n; i++) { var x = 48 - n * 7.5 + i * 15; out += '<rect x="' + f1(x) + '" y="2" width="11" height="6" rx="3" fill="#C98B4A" stroke="#3A2E1F" stroke-width="1.2"/><circle cx="' + f1(x + 5.5) + '" cy="16" r="4" fill="#D9A441" stroke="#3A2E1F" stroke-width="1.2"/>'; }
    return out + '</svg>';
  },
  /* level 3 miss 2: the sticks and cups the riddle asks for */
  _riddleSvg: function (attrs) {
    var out = '<svg class="ta-rule ta-rpat" width="200" height="34" viewBox="0 0 200 34" aria-hidden="true">', x = 4;
    /* cups only where the riddle fixes them: its corners, or "closed" / square corners (one per straight stick) */
    var nS = attrs.straight || 0, nC = attrs.curved || 0, cups = attrs.corners != null ? attrs.corners : ((attrs.closed || attrs.square != null) ? nS : null);
    for (var i = 0; i < nS; i++) { var L = attrs.equal === false && i >= 2 ? 14 : 22; out += '<rect x="' + x + '" y="5" width="' + L + '" height="7" rx="3.5" fill="#C98B4A" stroke="#3A2E1F" stroke-width="1.2"/>'; x += L + 4; }
    for (var j = 0; j < nC; j++) { out += '<path d="M' + x + ' 6 Q' + (x + 11) + ' 18 ' + (x + 22) + ' 6" fill="none" stroke="#3A2E1F" stroke-width="5" stroke-linecap="round"/><path d="M' + x + ' 6 Q' + (x + 11) + ' 18 ' + (x + 22) + ' 6" fill="none" stroke="#C98B4A" stroke-width="2.5" stroke-linecap="round"/>'; x += 26; }
    if (!nS && !nC) { out += '<rect x="' + x + '" y="5" width="22" height="7" rx="3.5" fill="none" stroke="#8C6A45" stroke-width="1.2" stroke-dasharray="3 2"/><line x1="' + x + '" y1="14" x2="' + (x + 22) + '" y2="2" stroke="#8A3B1F" stroke-width="2"/>'; x += 28; }
    var cx = 4;
    if (cups === 0) out += '<circle cx="12" cy="25" r="6" fill="none" stroke="#8C6A45" stroke-width="1.5" stroke-dasharray="3 2"/><line x1="5" y1="31" x2="19" y2="19" stroke="#8A3B1F" stroke-width="2"/>';
    else if (cups) for (var k = 0; k < cups; k++) { out += '<circle cx="' + (cx + 6) + '" cy="25" r="6" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="1.2"/><circle cx="' + (cx + 6) + '" cy="25" r="3.5" fill="#D9A441"/>'; if (attrs.square && k < attrs.square) out += '<rect x="' + (cx + 8) + '" y="17" width="5" height="5" fill="#FFFDF6" stroke="#146B5E" stroke-width="1.2"/>'; cx += 15; }
    return out + '</svg>';
  },

  _paint_: function () {
    var C = TakeApartCore, st = this.st, D = this._dims(), v = this._view, self = this, help = this._help();
    this._wrap.className = 'ta-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + st.level;
    var shelf = this._qs('.ta-shelf'), tray = this._qs('.ta-tray'), tools = this._qs('.ta-tools'), ans = this._qs('.ta-answer');
    shelf.innerHTML = ''; tray.innerHTML = ''; tools.innerHTML = ''; ans.innerHTML = '';
    shelf.setAttribute('role', 'group'); shelf.setAttribute('aria-label', this._t('aShelf')); shelf.setAttribute('data-drop', 'shelf');
    shelf.style.width = (D.cols * D.cell + (D.cols - 1) * D.gap + 12) + 'px'; shelf.style.gap = D.gap + 'px';
    /* the shelf holds only the shapes not yet in a box / the frame (it empties as the child sorts, so the boxes keep their place on a phone) */
    var left = 0;
    st.items.forEach(function (it, i) {
      var away = (st.level === 'real' && st.place[i]) || (st.level === 'riddle' && st.frame === i);
      if (away) return;
      left++;
      var px = C.sizeOf(it.s, D.box, D.floor);
      var b = self._btn('ta-cell' + (st.sel === i ? ' is-sel' : '') + (st.tray === i ? ' is-apart' : '') + (v.bob && st.level === 'real' ? ' is-bob' : '') + (v.fresh === i ? ' is-snap' : '') + (v.spin && st.done ? ' is-spin' : ''), 'shape-' + i, self._shapeLabel(i), self._shapeSvg(it, px));
      b.style.width = b.style.height = D.cell + 'px'; b.setAttribute('aria-pressed', st.sel === i ? 'true' : 'false');
      self._wireShape(b, i); shelf.appendChild(b);
    });
    shelf.classList.toggle('is-empty', !left);
    /* the tray */
    tray.setAttribute('role', 'group'); tray.setAttribute('aria-label', this._t('aTray'));
    var showOpen = !help || v.showing || st.done;
    if (!showOpen) {
      tray.className = 'ta-tray is-shut';
      tray.innerHTML = '<svg width="' + f1(D.w - 16) + '" height="30" viewBox="0 0 ' + f1(D.w - 16) + ' 30" aria-hidden="true"><rect x="1" y="1" width="' + f1(D.w - 18) + '" height="28" rx="8" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="2.5"/><rect x="' + f1((D.w - 16) / 2 - 22) + '" y="11" width="44" height="8" rx="4" fill="#8C6A45"/></svg>';
    } else {
      tray.className = 'ta-tray';
      var yesItems = st.level === 'real' ? st.items.filter(function (x, i) { return st.place[i] === 'yes'; }) : [st.items[st.level === 'name' ? 0 : st.answer]];
      if (st.done && v.bundles) tray.innerHTML = this._bundles(yesItems, D, D.trayH);
      else if (st.tray != null) {
        /* miss 2 lays the prototype (always the same plain yellow one) on a second row */
        var rows = [st.items[st.tray]]; if (v.proto) { var pr = C.parseItem(v.proto); pr.colour = 'sun'; rows.push(pr); }
        var rh = rows.length > 1 ? Math.max(84, D.trayH - 20) : D.trayH;
        rows.forEach(function (it) { tray.insertAdjacentHTML('beforeend', self._trayRow(it, D, rh)); });
      } else {
        /* the empty tray: on a phone a slim strip (it grows when a shape comes apart), so Check stays above the fold */
        var eh = D.wide ? D.trayH : 40, nl = D.wide ? 3 : 1;
        tray.innerHTML = '<svg class="ta-row ta-rest" width="' + f1(D.w - 16) + '" height="' + eh + '" viewBox="0 0 ' + f1(D.w - 16) + ' ' + eh + '" aria-hidden="true"><rect x="1" y="1" width="' + f1(D.w - 18) + '" height="' + (eh - 2) + '" rx="12" fill="#FFF8EC" stroke="#3A2E1F" stroke-width="2.5"/>'
          + (nl === 1 ? [0] : [0, 1, 2]).map(function (k) { var y = nl === 1 ? eh / 2 : 14 + (eh - 28) * (k + 0.5) / 3; return '<line x1="' + f1(D.icon + 18) + '" y1="' + f1(y) + '" x2="' + f1(D.w - 120) + '" y2="' + f1(y) + '" stroke="#EADBC0" stroke-width="2" stroke-dasharray="6 6"/>'; }).join('') + '</svg>';
      }
      if (st.tray != null || st.done) tray.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('button')) return; if (st.tray != null && !st.done) { C.together(st); self.api.sound(600); self._paint(); } });
    }
    /* free play: paint pot, turn knob, stretch handle (after success) */
    if (st.done) {
      [['paint', 'aPaint', '<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><path d="M7 12h20l-2 17H9z" fill="#9B5DB0" stroke="#3A2E1F" stroke-width="2"/><path d="M7 12q10-8 20 0" fill="none" stroke="#3A2E1F" stroke-width="2"/><circle cx="17" cy="20" r="4" fill="#F4C542"/></svg>'],
       ['turn', 'aTurn', '<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="12" fill="#E9D3B0" stroke="#3A2E1F" stroke-width="2"/><path d="M17 5v10" stroke="#3A2E1F" stroke-width="3" stroke-linecap="round"/><path d="M27 9a13 13 0 0 1 2 8" fill="none" stroke="#146B5E" stroke-width="2.5"/><path d="M29 17l-3-3h5z" fill="#146B5E"/></svg>'],
       ['stretch', 'aStretch', '<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect x="6" y="14" width="22" height="6" rx="3" fill="#C98B4A" stroke="#3A2E1F" stroke-width="2"/><path d="M3 17l5-5v10zM31 17l-5-5v10z" fill="#146B5E"/></svg>']].forEach(function (t) {
        var b = self._btn('ta-tool', 'tool-' + t[0], self._t(t[1]), t[2]); b.addEventListener('click', function () { self._tool(t[0]); }); tools.appendChild(b);
      });
    }
    /* the answer area */
    if (st.level === 'real') this._boxes(ans, D);
    else if (st.level === 'name') this._nameBoard(ans, D);
    else this._riddleCard(ans, D);
    /* Check */
    var foot = this._qs('.ta-foot'); foot.innerHTML = '';
    var chk = this._btn('ta-check', 'check', null, esc(this._t('check'))); chk.disabled = st.done;
    chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.ta-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'ta-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ta-note is-hint'; }
    else { note.textContent = ''; note.className = 'ta-note'; }
    v.fresh = -1;
  },
  _boxes: function (ans, D) {
    var st = this.st, v = this._view, self = this, T = TakeApartCore.DATA.TKEY[st.target];
    var nYes = 0, nNo = 0; st.place.forEach(function (p) { if (p === 'yes') nYes++; if (p === 'no') nNo++; });
    var rows = Math.max(1, Math.ceil(Math.max(nYes, nNo, 1) / D.mcols));
    ans.className = 'ta-answer ta-boxes';
    ['yes', 'no'].forEach(function (box) {
      var bx = self._btn('ta-box ta-box-' + box + (st.sel != null ? ' is-target' : '') + (box === 'yes' && st.done ? ' is-shut' : ''), 'box-' + box, null);
      bx.setAttribute('data-drop', box); bx.style.width = D.boxW + 'px';
      var label = self._t((box === 'yes' ? 'bxYes' : 'bxNo') + T);
      bx.setAttribute('aria-label', label);
      bx.innerHTML = '<span class="ta-blabel">' + esc(label) + '</span>' + (box === 'yes' && v.pattern ? self._ruleSvg(st.target) : '') + '<span class="ta-bin" style="min-height:' + (rows * (D.mini + 4)) + 'px"></span>' + (box === 'yes' && st.done ? '<span class="ta-lid"></span>' : '');
      bx.addEventListener('click', function (e) { if (e.target.closest('.ta-mini')) return; self._toBox(box); });
      var bin = bx.querySelector('.ta-bin');
      st.items.forEach(function (it, i) {
        if (st.place[i] !== box) return;
        var m = self._btn('ta-mini' + (st.sel === i ? ' is-sel' : '') + (st.tray === i ? ' is-apart' : '') + (v.fresh === i ? ' is-snap' : ''), 'shape-' + i, self._shapeLabel(i), self._shapeSvg(it, TakeApartCore.sizeOf(it.s, D.mini - 4, 30)));
        m.setAttribute('aria-pressed', st.sel === i ? 'true' : 'false');
        self._wireShape(m, i); bin.appendChild(m);
      });
      ans.appendChild(bx);
    });
  },
  _nameBoard: function (ans, D) {
    var st = this.st, self = this, v = this._view;
    ans.className = 'ta-answer ta-names';
    var slot = this._btn('ta-slot' + (st.choice ? ' is-full' : '') + (st.done ? ' is-ok' : ''), 'slot', this._t('aSlot'), st.choice ? esc(this._t(this.NAMEKEY[st.choice])) : '');
    slot.addEventListener('click', function () { if (st.done || !st.choice) return; TakeApartCore.choose(st, null); self._moved(); });
    ans.appendChild(slot);
    var grid = this.api.el('div', 'ta-tiles');
    st.tiles.forEach(function (t, k) {
      var on = st.choice === t;
      var b = self._btn('ta-tile' + (on ? ' is-on' : ''), 'tile-' + k, null, esc(self._t(self.NAMEKEY[t])));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.addEventListener('click', function () { if (st.done) return; TakeApartCore.choose(st, on ? null : t); self.api.sound(500); self._moved(); });
      grid.appendChild(b);
    });
    ans.appendChild(grid);
    void v; void D;
  },
  _riddleCard: function (ans, D) {
    var st = this.st, self = this, v = this._view;
    ans.className = 'ta-answer ta-riddle';
    var card = this.api.el('div', 'ta-card' + (st.done ? ' is-ok' : ''));
    card.innerHTML = '<p class="ta-rtext">' + esc(this._t('rd' + (st.r + 1))) + '</p>' + ((v.showing && st.show >= 2) || st.done ? this._riddleSvg(st.attrs) : '');
    ans.appendChild(card);
    var fr = this._btn('ta-frame' + (st.frame != null ? ' is-full' : '') + (st.sel != null ? ' is-target' : ''), 'frame', this._t('aFrame'));
    fr.setAttribute('data-drop', 'frame');
    var fs = D.wide ? 110 : 96; fr.style.width = fr.style.height = fs + 'px';
    if (st.frame != null) { var it = st.items[st.frame], m = this._btn('ta-mini ta-inframe' + (st.tray === st.frame ? ' is-apart' : ''), 'shape-' + st.frame, this._shapeLabel(st.frame), this._shapeSvg(it, TakeApartCore.sizeOf(it.s, fs - 18, 50))); this._wireShape(m, st.frame); fr.appendChild(m); }
    fr.addEventListener('click', function (e) { if (e.target.closest('.ta-mini')) return; self._toFrame(); });
    ans.appendChild(fr);
  },

  /* ---------------- the hand ---------------- */
  _wireShape: function (b, i) {
    var self = this;
    b.addEventListener('click', function (e) {
      /* the click that ends a drag on this very button is not a tap (any other click is) */
      if (self._swallowEl === b && Date.now() - self._swallow < 400) { e.preventDefault(); return; }
      /* a shape is chosen and the child taps a box (or the frame) where other shapes already sit: it is a tap on the box */
      var st = self.st, drop = b.parentNode && b.parentNode.closest ? b.parentNode.closest('[data-drop]') : null, where = drop ? drop.getAttribute('data-drop') : null;
      if (st.sel != null && st.sel !== i && !st.done && (where === 'yes' || where === 'no' || where === 'frame')) { if (where === 'frame') self._toFrame(); else self._toBox(where); return; }
      self._tapShape(i);
    });
    b.addEventListener('pointerdown', function (e) { self._down(e, i); });
  },
  _tapShape: function (i) {
    var C = TakeApartCore, st = this.st, v = this._view;
    if (this._help() && !v.showing && !st.done) { st.sel = st.sel === i ? null : i; this._paint(); return; }
    var r = C.tap(st, i);
    if (r === 'apart') { this.api.sound(300); var c = C.counts(st.items[i]); this._sr(this._t('aTrayRead', { k: c.straight, j: c.curved, m: c.corners, e: c.empty })); }
    else { this.api.sound(600); v.fresh = i; }
    if (!st.done) this._clearShowing(); else v.bundles = false;
    if (r === 'apart' && v.proto) v.proto = null;
    this._paint();
  },
  _sr: function (s) { var el = this._qs('.ta-sr'); if (el) el.textContent = s; },
  _toBox: function (box) {
    var st = this.st; if (st.done || st.sel == null) return;
    TakeApartCore.place(st, st.sel, box); this.api.sound(180); this._moved();
  },
  _toFrame: function () {
    var st = this.st; if (st.done || st.sel == null) return;
    TakeApartCore.frame(st, st.sel); this.api.sound(180); this._moved();
  },
  /* a placement: the help is taken away until the next Check */
  _moved: function () { if (!this.st.done) { this._clearShowing(); } this._paint(); },
  _tool: function (what) {
    var st = this.st, C = TakeApartCore, i = st.tray;
    if (i == null) { i = st.level === 'real' ? st.place.indexOf('yes') : st.level === 'name' ? 0 : st.answer; if (i < 0) i = 0; }
    var it = st.items[i], cs = C.DATA.COLOURS;
    if (what === 'paint') it.colour = cs[(cs.indexOf(it.colour) + 1) % cs.length];
    if (what === 'turn') it.r = (it.r + 30) % 360;
    if (what === 'stretch') it.s = it.s <= 0.55 ? 0.8 : it.s < 1 ? 1.0 : 0.55;
    st.tray = i; this._view.bundles = false; this.api.sound(what === 'paint' ? 660 : 420);
    var c = C.counts(it); this._sr(this._t('aTrayRead', { k: c.straight, j: c.curved, m: c.corners, e: c.empty }));
    this._paint();
  },
  _down: function (e, i) {
    if ((e.button != null && e.button !== 0) || this.st.done && this.st.level !== 'real') return;
    if (this.st.level === 'name') return;
    var self = this, x0 = e.clientX, y0 = e.clientY, src = e.currentTarget;
    var drag = { i: i, moved: false, ghost: null, over: null };
    var move = function (ev) {
      if (!drag.moved && Math.hypot(ev.clientX - x0, ev.clientY - y0) < 8) return;
      if (self.st.done) return;
      if (!drag.moved) {
        drag.moved = true; self._drag = drag;
        var g = document.createElement('div'); g.className = 'ta-ghost'; g.innerHTML = src.innerHTML; document.body.appendChild(g); drag.ghost = g;
        src.classList.add('is-lifted');
      }
      ev.preventDefault();
      drag.ghost.style.left = (ev.clientX - 40) + 'px'; drag.ghost.style.top = (ev.clientY - 40) + 'px';
      drag.ghost.style.display = 'none'; var el = document.elementFromPoint(ev.clientX, ev.clientY); drag.ghost.style.display = '';
      var t = el && el.closest ? el.closest('[data-drop]') : null;
      if (drag.over && drag.over !== t) drag.over.classList.remove('is-over');
      drag.over = t; if (t) t.classList.add('is-over');
    };
    var up = function () {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
      if (!drag.moved) return;
      self._swallow = Date.now(); self._swallowEl = src;
      var t = drag.over ? drag.over.getAttribute('data-drop') : null;
      self._endDrag();
      var st = self.st;
      if (t === 'yes' || t === 'no') { TakeApartCore.place(st, i, t); self.api.sound(180); }
      else if (t === 'frame') { TakeApartCore.frame(st, i); self.api.sound(180); }
      else if (t === 'shelf') { if (st.level === 'real') TakeApartCore.place(st, i, null); else if (st.frame === i) TakeApartCore.frame(st, null); }
      self._moved();
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d) return;
    if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost);
    if (d.over) d.over.classList.remove('is-over');
    this._drag = null;
  },

  /* ---------------- Check ---------------- */
  _check: function () {
    var C = TakeApartCore, st = this.st, v = this._view, self = this;
    if (st.done) return;
    var a = C.check(st);
    if (a.result === 'tray') {
      this.api.sound(200); v.note = this._t(C.hint(st).key); v.bob = true;
      this._paint(); this.api.announce(v.note);
      this._later(function () { v.bob = false; }, 900);
      return;
    }
    if (a.result === 'ok') {
      v.showing = false; v.note = ''; v.proto = null;
      if (st.level === 'real') { v.bundles = true; v.ok = this._t('ok' + C.DATA.TKEY[st.target]); st.tray = null; }
      else if (st.level === 'name') { v.ok = this._t('ok2' + this.NAMEKEY[st.name].slice(2)); st.tray = 0; v.spin = true; }
      else { v.ok = this._t('ok3_' + (st.r + 1)); st.tray = st.answer; }
      st.sel = null;
      this.api.sound(880); this._paint(); this.api.announce(v.ok);
      this._advance(v.ok.length * 60 + 3600);
      return;
    }
    this.api.sound(220);
    var hk = C.hint(st);
    v.showing = true; v.note = this._t(hk.key); v.bob = false;
    st.tray = st.wrong[0]; st.sel = null;
    v.pattern = st.level === 'real';
    v.proto = st.show >= 2 ? C.protoOf(st) : null;
    this._paint(); this.api.announce(v.note);
    var c = C.counts(st.items[st.tray]); this._sr(this._t('aTrayRead', { k: c.straight, j: c.curved, m: c.corners, e: c.empty }));
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function f1(x) { return Math.round(x * 10) / 10; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectTakeApartCSS() {
  if (typeof document === 'undefined' || document.getElementById('ta-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif";
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ta-wrap{position:relative;width:100%;max-width:680px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .ta-wrap:focus{outline:none;} .ta-wrap.is-narrow{gap:8px;} .ta-wrap.is-tiny{gap:6px;} .ta-wrap.is-tiny .ta-shelf{padding:4px 4px 6px;}'
  + '.ta-shelf{display:flex;flex-wrap:wrap;justify-content:center;max-width:100%;min-height:14px;padding:6px 6px 10px;border-bottom:6px solid #C99A6B;border-radius:0 0 4px 4px;}'
  + '.ta-cell{display:flex;align-items:center;justify-content:center;padding:0;border:2px solid transparent;border-radius:14px;background:transparent;cursor:pointer;touch-action:none;}'
  + '.ta-cell.is-sel,.ta-mini.is-sel{border-color:#F4CF62;background:#FFF6D8;} .ta-cell.is-apart,.ta-mini.is-apart{border-style:dashed;border-color:#8C6A45;} .ta-cell.is-apart svg{opacity:.35;}'
  + '.ta-cell.is-lifted,.ta-mini.is-lifted{opacity:.3;}'
  + '.ta-cell.is-bob{animation:taBob .45s ease-in-out 2;} @keyframes taBob{0%,100%{transform:none;}50%{transform:translateY(-8px);}}'
  + '.ta-cell.is-snap svg,.ta-mini.is-snap svg{animation:taSnap .3s ease-out;} @keyframes taSnap{0%{transform:scale(1.15);}100%{transform:none;}}'
  + '.ta-cell.is-spin svg{animation:taSpin .9s ease-in-out;} @keyframes taSpin{0%{transform:rotate(0);}100%{transform:rotate(360deg);}}'
  + '.ta-ghost{position:fixed;z-index:50;width:80px;height:80px;pointer-events:none;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 6px 6px rgba(58,46,31,.3));transform:scale(1.1);} .ta-ghost svg{max-width:80px;max-height:80px;}'
  + '.ta-tray{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;cursor:default;} .ta-row{display:block;}'
  + '.ta-stick{animation:taFly .35s ease-out backwards;} .ta-stick.is-bent{animation:taFly .35s ease-out backwards,taRock .3s ease-in-out .35s 2;}'
  + '@keyframes taFly{0%{transform:translate(-40px,-30px) rotate(-20deg);opacity:0;}100%{transform:none;opacity:1;}} @keyframes taRock{0%,100%{transform:rotate(0);}25%{transform:rotate(-4deg);}75%{transform:rotate(4deg);}}'
  + '.ta-joint{animation:taDrop .3s ease-out backwards;} @keyframes taDrop{0%{transform:translateY(-14px);opacity:0;}100%{transform:none;opacity:1;}} .ta-joint{transform-box:fill-box;transform-origin:center;}'
  + '.ta-empty{animation:taFlash 1s ease-in-out 2;} @keyframes taFlash{0%,100%{stroke:#3A2E1F;}50%{stroke:#F2784B;}}'
  + '.ta-bundle{animation:taDrop .4s ease-out backwards;}'
  + '.ta-wrap.is-fast .ta-stick,.ta-wrap.is-fast .ta-joint,.ta-wrap.is-fast .ta-empty,.ta-wrap.is-fast .ta-bundle,.ta-wrap.is-fast .ta-cell,.ta-wrap.is-fast svg{animation:none !important;}'
  + '.ta-tools{display:flex;gap:10px;justify-content:center;} .ta-tools:empty{display:none;}'
  + '.ta-tool{min-width:52px;min-height:52px;border-radius:14px;border:2px solid #3A2E1F;background:#FFF8E7;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.ta-answer{display:flex;gap:12px;justify-content:center;width:100%;flex-wrap:wrap;}'
  + '.ta-box{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 6px 10px;border:3px solid #3A2E1F;border-radius:6px 6px 16px 16px;background:#F3E3C6;cursor:pointer;font:inherit;} .ta-box-no{background:#EDE6DA;}'
  + '.ta-box.is-target{box-shadow:0 0 0 3px #F4CF62;} .ta-box.is-over,.ta-frame.is-over{box-shadow:0 0 0 4px #1F8A78;background:#E3EFE9;}'
  + '.ta-blabel{font-family:' + H + ';font-weight:800;font-size:22px;line-height:1.1;color:#3A2E1F;text-align:center;} .ta-wrap.is-narrow .ta-blabel{font-size:18px;}'
  + '.ta-bin{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;width:100%;}'
  + '.ta-mini{width:44px;height:44px;padding:0;border:2px solid transparent;border-radius:10px;background:#FFFDF6;display:flex;align-items:center;justify-content:center;cursor:pointer;touch-action:none;}'
  + '.ta-lid{position:absolute;left:-6px;right:-6px;top:-10px;height:16px;border-radius:8px;background:#8C6A45;border:3px solid #3A2E1F;animation:taLid .4s ease-out;} @keyframes taLid{0%{transform:translateY(-24px) rotate(-8deg);opacity:0;}100%{transform:none;opacity:1;}} .ta-wrap.is-fast .ta-lid{animation:none;}'
  + '.ta-names{flex-direction:column;align-items:center;} .ta-slot{min-width:200px;min-height:56px;padding:6px 16px;border:3px dashed #8C6A45;border-radius:14px;background:#FFFDF6;font-family:' + H + ';font-weight:800;font-size:24px;color:#3A2E1F;cursor:pointer;} .ta-slot.is-full{border-style:solid;} .ta-slot.is-ok{border-color:#146B5E;color:#146B5E;box-shadow:0 0 0 4px #CFE7DF;}'
  + '.ta-tiles{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:8px;width:100%;max-width:620px;} .ta-wrap.is-narrow .ta-tiles{grid-template-columns:repeat(2,1fr);}'
  + '.ta-tile{min-height:56px;padding:4px 8px;border:2px solid #3A2E1F;border-radius:14px;background:#FFF8E7;font-family:' + H + ';font-weight:800;font-size:21px;line-height:1.1;color:#3A2E1F;cursor:pointer;} .ta-tile.is-on{background:#E9D3B0;border-style:dashed;color:#8C6A45;} .ta-wrap.is-narrow .ta-tile{min-height:52px;font-size:19px;} .ta-wrap.is-tiny .ta-tile{min-height:48px;}'
  + '.ta-riddle{align-items:center;flex-wrap:nowrap;} .ta-wrap.is-narrow .ta-riddle{gap:8px;} .ta-card{flex:1 1 auto;min-width:0;max-width:440px;padding:12px 16px;border-radius:14px;background:#0E3B34;color:#FFF8E7;display:flex;flex-direction:column;align-items:center;gap:6px;} .ta-card.is-ok{background:#146B5E;}'
  + '.ta-rtext{margin:0;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.3;text-align:center;} .ta-wrap.is-narrow .ta-rtext{font-size:18px;} .ta-card .ta-rule{background:#FFF8EC;border-radius:8px;padding:2px;}'
  + '.ta-frame{flex:0 0 auto;display:flex;align-items:center;justify-content:center;padding:0;border:3px dashed #8C6A45;border-radius:14px;background:#FFFDF6;cursor:pointer;} .ta-frame.is-full{border-style:solid;} .ta-frame.is-target{box-shadow:0 0 0 3px #F4CF62;} .ta-inframe{width:auto;height:auto;background:transparent;}'
  + '.ta-foot{display:flex;justify-content:center;width:100%;}'
  + '.ta-check{min-width:150px;min-height:54px;padding:8px 28px;border:0;border-radius:16px;background:#1F8A78;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0E5A4D;cursor:pointer;} .ta-check:disabled{opacity:.5;cursor:default;}'
  + '.ta-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ta-note.is-hint{color:#8A3B1F;} .ta-wrap.is-narrow .ta-note{font-size:17px;}'
  + '.ta-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.ta-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'ta-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.TakeApartActivity = TakeApartActivity;
