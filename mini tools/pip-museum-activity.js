/* =====================================================================
   pip-museum-activity.js — ACTIVITY #38 of the one-by-one rebuild:
   "Professor Pip's Museum" (K.G.A.2; G2 solids hall).
   Design sheet: docs/activities-rebuild/designs/038-pip-museum.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: every pedestal's brass clasp is built from what makes its
   shape (rods, hinges, a square lock, a hoop), so it turns and stretches to
   meet a disguised treasure but only CLOSES round its own shape. On Check
   the clasps work: a held treasure spins upright inside its clasp; a
   refused one slides back to the belt and its own ghost clasp builds
   itself out of its sides, beside the pedestal that refused it.
   The solids hall: real objects with wire cages; drawn solids.

   ACTIVITY LAYER ONLY: the model is pip-museum-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity on success).
   Test seams: window.PipMuseumActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var PipMuseumActivity = {
  id: 'pip-museum',
  apparatusClasses: ['pm-'],

  strings: {
    /*STRINGS-BEGIN*/
    title:         {en:'Professor Pip’s Museum',de:'Professor Pips Museum',fr:'Le musée du professeur Pip',es:'El museo del profesor Pip',pt:'O Museu do Professor Pip',it:'Il museo del professor Pip',nl:'Professor Tobbes museum',sv:'Professor Pips museum',da:'Professor Pips museum',no:'Professor Pips museum',fi:'Professori Pipin museo'},
    instruction:   {en:'Put each treasure where it belongs, then press Check.',de:'Bring jeden Schatz an seinen Platz und tippe dann auf Prüfen.',fr:'Mets chaque trésor à sa place, puis touche Vérifier.',es:'Pon cada tesoro en su lugar y luego toca Revisar.',pt:'Coloque cada tesouro no lugar dele e depois toque em Conferir.',it:'Metti ogni tesoro al suo posto, poi tocca Controlla.',nl:'Zet elke schat op zijn plek en tik dan op Controleren.',sv:'Ställ varje skatt på sin plats och tryck sedan på Kontrollera.',da:'Sæt hver skat på sin plads, og tryk så på Tjek.',no:'Sett hver skatt på plassen sin, og trykk så på Sjekk.',fi:'Vie jokainen aarre paikalleen ja paina sitten Tarkista.'},
    pShapes:       {en:'Put each treasure on the pedestal that names it.',de:'Stell jeden Schatz auf den Sockel mit seinem Namen.',fr:'Pose chaque trésor sur le socle qui porte son nom.',es:'Pon cada tesoro en el pedestal con su nombre.',pt:'Coloque cada tesouro no pedestal com o nome dele.',it:'Metti ogni tesoro sul piedistallo con il suo nome.',nl:'Zet elke schat op de sokkel met zijn naam.',sv:'Ställ varje skatt på sockeln med dess namn.',da:'Sæt hver skat på soklen med dens navn.',no:'Sett hver skatt på sokkelen med navnet dens.',fi:'Vie jokainen aarre jalustalle, jossa on sen nimi.'},
    pSolids:       {en:'Put each solid with the thing that has the same shape.',de:'Stell jeden Körper zu dem Gegenstand, der dieselbe Form hat.',fr:'Pose chaque solide à côté de l’objet qui a la même forme.',es:'Pon cada cuerpo junto a la cosa que tiene la misma forma.',pt:'Coloque cada sólido junto ao objeto que tem a mesma forma.',it:'Metti ogni solido vicino all’oggetto che ha la stessa forma.',nl:'Zet elk blok bij het voorwerp met dezelfde vorm.',sv:'Ställ varje kropp vid föremålet som har samma form.',da:'Sæt hver rumfigur ved den ting, der har samme form.',no:'Sett hver romfigur ved tingen som har samme form.',fi:'Vie jokainen kappale sen esineen luo, jolla on sama muoto.'},
    pCount:        {en:'How many triangles and how many squares are in the hall now?',de:'Wie viele Dreiecke und wie viele Quadrate stehen jetzt im Saal?',fr:'Combien de triangles et combien de carrés y a-t-il maintenant dans la salle ?',es:'¿Cuántos triángulos y cuántos cuadrados hay ahora en la sala?',pt:'Quantos triângulos e quantos quadrados há agora na sala?',it:'Quanti triangoli e quanti quadrati ci sono ora nella sala?',nl:'Hoeveel driehoeken en hoeveel vierkanten staan er nu in de zaal?',sv:'Hur många trianglar och hur många kvadrater finns nu i salen?',da:'Hvor mange trekanter og hvor mange kvadrater er der nu i salen?',no:'Hvor mange trekanter og hvor mange kvadrater er det nå i salen?',fi:'Montako kolmiota ja montako neliötä salissa nyt on?'},
    check:         {en:'Check',de:'Prüfen',fr:'Vérifier',es:'Revisar',pt:'Conferir',it:'Controlla',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    mystery:       {en:'Mystery Gallery',de:'Rätsel-Galerie',fr:'Salle Mystère',es:'Sala de misterio',pt:'Galeria dos Mistérios',it:'Sala dei misteri',nl:'Raadselgalerij',sv:'Mysteriegalleriet',da:'Mysteriegalleriet',no:'Mysteriegalleriet',fi:'Mysteerigalleria'},
    n_triangle:    {en:'triangle',de:'Dreieck',fr:'triangle',es:'triángulo',pt:'triângulo',it:'triangolo',nl:'driehoek',sv:'triangel',da:'trekant',no:'trekant',fi:'kolmio'},
    n_square:      {en:'square',de:'Quadrat',fr:'carré',es:'cuadrado',pt:'quadrado',it:'quadrato',nl:'vierkant',sv:'kvadrat',da:'kvadrat',no:'kvadrat',fi:'neliö'},
    n_circle:      {en:'circle',de:'Kreis',fr:'cercle',es:'círculo',pt:'círculo',it:'cerchio',nl:'cirkel',sv:'cirkel',da:'cirkel',no:'sirkel',fi:'ympyrä'},
    n_hexagon:     {en:'hexagon',de:'Sechseck',fr:'hexagone',es:'hexágono',pt:'hexágono',it:'esagono',nl:'zeshoek',sv:'sexhörning',da:'sekskant',no:'sekskant',fi:'kuusikulmio'},
    n_rectangle:   {en:'rectangle',de:'Rechteck',fr:'rectangle',es:'rectángulo',pt:'retângulo',it:'rettangolo',nl:'rechthoek',sv:'rektangel',da:'rektangel',no:'rektangel',fi:'suorakulmio'},
    n_sphere:      {en:'sphere',de:'Kugel',fr:'boule',es:'esfera',pt:'esfera',it:'sfera',nl:'bol',sv:'klot',da:'kugle',no:'kule',fi:'pallo'},
    n_cube:        {en:'cube',de:'Würfel',fr:'cube',es:'cubo',pt:'cubo',it:'cubo',nl:'kubus',sv:'kub',da:'terning',no:'kube',fi:'kuutio'},
    n_cylinder:    {en:'cylinder',de:'Zylinder',fr:'cylindre',es:'cilindro',pt:'cilindro',it:'cilindro',nl:'cilinder',sv:'cylinder',da:'cylinder',no:'sylinder',fi:'lieriö'},
    n_box:         {en:'box',de:'Quader',fr:'pavé',es:'prisma rectangular',pt:'bloco retangular',it:'parallelepipedo',nl:'balk',sv:'rätblock',da:'kasse',no:'firkantet prisme',fi:'särmiö'},
    r_triangle:    {en:'Three straight sides, three corners.',de:'Drei gerade Seiten, drei Ecken.',fr:'Trois côtés droits, trois sommets.',es:'Tres lados rectos, tres esquinas.',pt:'Três lados retos, três cantos.',it:'Tre lati dritti, tre angoli.',nl:'Drie rechte zijden, drie hoeken.',sv:'Tre raka sidor, tre hörn.',da:'Tre rette sider, tre hjørner.',no:'Tre rette sider, tre hjørner.',fi:'Kolme suoraa sivua, kolme kulmaa.'},
    r_square:      {en:'Four equal sides, four corners like a book’s.',de:'Vier gleich lange Seiten, vier rechte Winkel.',fr:'Quatre côtés égaux, quatre angles droits.',es:'Cuatro lados iguales, cuatro esquinas rectas.',pt:'Quatro lados iguais, quatro cantos retos.',it:'Quattro lati uguali, quattro angoli retti.',nl:'Vier even lange zijden, vier rechte hoeken.',sv:'Fyra lika långa sidor, fyra räta hörn.',da:'Fire lige lange sider, fire rette vinkler.',no:'Fire like lange sider, fire rette vinkler.',fi:'Neljä yhtä pitkää sivua, neljä suoraa kulmaa.'},
    r_rectangle:   {en:'Four corners like a book’s, opposite sides match.',de:'Vier rechte Winkel, gegenüberliegende Seiten gleich lang.',fr:'Quatre angles droits, côtés opposés de même longueur.',es:'Cuatro esquinas rectas, lados de enfrente iguales.',pt:'Quatro cantos retos, lados opostos iguais.',it:'Quattro angoli retti, lati opposti uguali.',nl:'Vier rechte hoeken, overstaande zijden even lang.',sv:'Fyra räta hörn, motsatta sidor lika långa.',da:'Fire rette vinkler, modsatte sider lige lange.',no:'Fire rette vinkler, motsatte sider like lange.',fi:'Neljä suoraa kulmaa, vastakkaiset sivut yhtä pitkät.'},
    r_circle:      {en:'Round, the same all the way round.',de:'Rund, überall gleich rund.',fr:'Rond, pareil tout autour.',es:'Redondo, igual por todos lados.',pt:'Redondo, igual em toda a volta.',it:'Rotondo, uguale tutto intorno.',nl:'Rond, overal even rond.',sv:'Rund, likadan hela vägen runt.',da:'Rund, ens hele vejen rundt.',no:'Rund, lik hele veien rundt.',fi:'Pyöreä, joka kohdasta samanlainen.'},
    r_hexagon:     {en:'Six straight sides, six corners.',de:'Sechs gerade Seiten, sechs Ecken.',fr:'Six côtés droits, six sommets.',es:'Seis lados rectos, seis esquinas.',pt:'Seis lados retos, seis cantos.',it:'Sei lati dritti, sei angoli.',nl:'Zes rechte zijden, zes hoeken.',sv:'Sex raka sidor, sex hörn.',da:'Seks rette sider, seks hjørner.',no:'Seks rette sider, seks hjørner.',fi:'Kuusi suoraa sivua, kuusi kulmaa.'},
    r_sphere:      {en:'Round all over, with no flat side.',de:'Überall rund, ohne flache Seite.',fr:'Rond partout, sans face plate.',es:'Redondo por todas partes, sin caras planas.',pt:'Redondo por todos os lados, sem face plana.',it:'Rotondo dappertutto, senza facce piatte.',nl:'Overal rond, zonder platte kant.',sv:'Rund överallt, utan platta ytor.',da:'Rund over det hele, uden kanter og hjørner.',no:'Rund overalt, uten kanter og hjørner.',fi:'Pyöreä joka puolelta, ei tasaisia tahkoja.'},
    r_cube:        {en:'Six flat faces, all squares the same size.',de:'Sechs flache Flächen, alle gleich große Quadrate.',fr:'Six faces plates, toutes des carrés de la même taille.',es:'Seis caras planas, todas cuadrados del mismo tamaño.',pt:'Seis faces planas, todas quadrados do mesmo tamanho.',it:'Sei facce piatte, tutte quadrati uguali.',nl:'Zes platte vlakken, allemaal even grote vierkanten.',sv:'Sex platta ytor, alla lika stora kvadrater.',da:'Seks flader, alle lige store kvadrater.',no:'Seks flater, alle like store kvadrater.',fi:'Kuusi tasaista tahkoa, kaikki samankokoisia neliöitä.'},
    r_cylinder:    {en:'Two round flat faces and a curved side.',de:'Zwei runde flache Flächen und eine gebogene Seite.',fr:'Deux faces plates et rondes, et un côté courbe.',es:'Dos caras planas redondas y un lado curvo.',pt:'Duas faces planas redondas e um lado curvo.',it:'Due facce piatte rotonde e un lato curvo.',nl:'Twee ronde platte vlakken en een gebogen kant.',sv:'Två runda platta ytor och en böjd yta.',da:'To runde flader og én buet flade.',no:'To runde flater og én buet flate.',fi:'Kaksi pyöreää tasaista tahkoa ja kaareva kylki.'},
    r_box:         {en:'Six flat faces, all rectangles.',de:'Sechs flache Flächen, alles Rechtecke.',fr:'Six faces plates, toutes des rectangles.',es:'Seis caras planas, todas rectángulos.',pt:'Seis faces planas, todas retângulos.',it:'Sei facce piatte, tutte rettangoli.',nl:'Zes platte vlakken, allemaal rechthoeken.',sv:'Sex platta ytor, alla rektanglar.',da:'Seks flader, alle rektangler.',no:'Seks flater, alle rektangler.',fi:'Kuusi tasaista tahkoa, kaikki suorakulmioita.'},
    o_ball:        {en:'ball',de:'Ball',fr:'ballon',es:'pelota',pt:'bola',it:'palla',nl:'bal',sv:'boll',da:'bold',no:'ball',fi:'pallo'},
    o_orange:      {en:'orange',de:'Orange',fr:'orange',es:'naranja',pt:'laranja',it:'arancia',nl:'sinaasappel',sv:'apelsin',da:'appelsin',no:'appelsin',fi:'appelsiini'},
    o_dice:        {en:'dice',de:'Spielwürfel',fr:'dé',es:'dado',pt:'dado',it:'dado',nl:'dobbelsteen',sv:'tärning',da:'spilleterning',no:'spilleterning',fi:'noppa'},
    o_present:     {en:'present',de:'Geschenk',fr:'cadeau',es:'regalo',pt:'presente',it:'regalo',nl:'cadeau',sv:'present',da:'gave',no:'gave',fi:'lahja'},
    o_can:         {en:'can',de:'Dose',fr:'boîte de conserve',es:'lata',pt:'lata',it:'lattina',nl:'blik',sv:'burk',da:'dåse',no:'boks',fi:'tölkki'},
    o_drum:        {en:'drum',de:'Trommel',fr:'tambour',es:'tambor',pt:'tambor',it:'tamburo',nl:'trommel',sv:'trumma',da:'tromme',no:'tromme',fi:'rumpu'},
    o_book:        {en:'book',de:'Buch',fr:'livre',es:'libro',pt:'livro',it:'libro',nl:'boek',sv:'bok',da:'bog',no:'bok',fi:'kirja'},
    o_eraser:      {en:'eraser',de:'Radiergummi',fr:'gomme',es:'goma',pt:'borracha',it:'gomma',nl:'gum',sv:'suddgummi',da:'viskelæder',no:'viskelær',fi:'pyyhekumi'},
    hintBelt:      {en:'Put every treasure on a pedestal or in the Mystery Gallery.',de:'Bring jeden Schatz auf einen Sockel oder in die Rätsel-Galerie.',fr:'Mets chaque trésor sur un socle ou dans la Salle Mystère.',es:'Pon cada tesoro en un pedestal o en la sala de misterio.',pt:'Coloque cada tesouro num pedestal ou na Galeria dos Mistérios.',it:'Metti ogni tesoro su un piedistallo o nella sala dei misteri.',nl:'Zet elke schat op een sokkel of in de Raadselgalerij.',sv:'Ställ varje skatt på en sockel eller i Mysteriegalleriet.',da:'Sæt hver skat på en sokkel eller i Mysteriegalleriet.',no:'Sett hver skatt på en sokkel eller i Mysteriegalleriet.',fi:'Vie jokainen aarre jalustalle tai Mysteerigalleriaan.'},
    hintTruth:     {en:'Count its corners and look at its sides. Which clasp can hold it?',de:'Zähl seine Ecken und schau dir die Seiten an. Welche Klammer kann ihn halten?',fr:'Compte ses sommets et regarde ses côtés. Quelle pince peut le tenir ?',es:'Cuenta sus esquinas y mira sus lados. ¿Qué broche lo puede sujetar?',pt:'Conte os cantos e olhe os lados. Qual presilha pode segurá-lo?',it:'Conta i suoi angoli e guarda i lati. Quale fermaglio può tenerlo?',nl:'Tel de hoeken en kijk naar de zijden. Welke klem kan hem vasthouden?',sv:'Räkna hörnen och titta på sidorna. Vilken klämma kan hålla den?',da:'Tæl hjørnerne, og se på siderne. Hvilken klemme kan holde den?',no:'Tell hjørnene og se på sidene. Hvilken klemme kan holde den?',fi:'Laske kulmat ja katso sivuja. Mikä pidike pitää siitä kiinni?'},
    hintTruthSolid:{en:'Look at its faces and corners. Which cage can hold it?',de:'Schau auf seine Flächen und Ecken. Welcher Käfig kann ihn halten?',fr:'Regarde ses faces et ses sommets. Quelle cage peut le tenir ?',es:'Mira sus caras y sus esquinas. ¿Qué jaula lo puede sujetar?',pt:'Olhe as faces e os cantos. Qual gaiola pode segurá-lo?',it:'Guarda le sue facce e i suoi angoli. Quale gabbia può tenerlo?',nl:'Kijk naar de vlakken en hoeken. Welke kooi kan hem vasthouden?',sv:'Titta på ytorna och hörnen. Vilken bur kan hålla den?',da:'Se på fladerne og hjørnerne. Hvilket bur kan holde den?',no:'Se på flatene og hjørnene. Hvilket bur kan holde den?',fi:'Katso sen tahkoja ja kulmia. Mihin häkkiin se sopii?'},
    hintGlow:      {en:'Pick it up: the glowing place can hold it.',de:'Heb ihn hoch: Der leuchtende Platz kann ihn halten.',fr:'Prends-le : la place qui brille peut le tenir.',es:'Tómalo: el lugar que brilla lo puede sujetar.',pt:'Pegue o tesouro: o lugar que brilha pode segurá-lo.',it:'Prendilo: il posto illuminato può tenerlo.',nl:'Pak hem op: de plek die oplicht, kan hem vasthouden.',sv:'Ta upp den: platsen som lyser kan hålla den.',da:'Tag den op: stedet, der lyser, kan holde den.',no:'Ta den opp: plassen som lyser, kan holde den.',fi:'Nosta se: se sopii hehkuvaan paikkaan.'},
    hintCount:     {en:'Count the triangles in the hall, then the squares.',de:'Zähl die Dreiecke im Saal und dann die Quadrate.',fr:'Compte les triangles de la salle, puis les carrés.',es:'Cuenta los triángulos de la sala y luego los cuadrados.',pt:'Conte os triângulos da sala e depois os quadrados.',it:'Conta i triangoli nella sala, poi i quadrati.',nl:'Tel de driehoeken in de zaal en dan de vierkanten.',sv:'Räkna trianglarna i salen och sedan kvadraterna.',da:'Tæl trekanterne i salen og så kvadraterne.',no:'Tell trekantene i salen og så kvadratene.',fi:'Laske salin kolmiot ja sitten neliöt.'},
    hintCountOne:  {en:'Count these one by one.',de:'Zähl diese eins nach dem anderen.',fr:'Compte-les un par un.',es:'Cuéntalos uno por uno.',pt:'Conte-os um por um.',it:'Contali uno alla volta.',nl:'Tel ze één voor één.',sv:'Räkna dem en i taget.',da:'Tæl dem én ad gangen.',no:'Tell dem én om gangen.',fi:'Laske ne yksi kerrallaan.'},
    hintCountNum:  {en:'Count with the numbers.',de:'Zähl mit den Zahlen.',fr:'Compte avec les nombres.',es:'Cuenta con los números.',pt:'Conte com os números.',it:'Conta con i numeri.',nl:'Tel mee met de getallen.',sv:'Räkna med talen.',da:'Tæl med tallene.',no:'Tell med tallene.',fi:'Laske numeroiden avulla.'},
    setHall:       {en:'Hall',de:'Saal',fr:'Salle',es:'Sala',pt:'Sala',it:'Sala',nl:'Zaal',sv:'Sal',da:'Sal',no:'Sal',fi:'Sali'},
    hShapes:       {en:'shapes',de:'Formen',fr:'formes',es:'figuras',pt:'figuras',it:'figure',nl:'vormen',sv:'former',da:'former',no:'former',fi:'tasokuviot'},
    hSolids:       {en:'solids',de:'Körper',fr:'solides',es:'cuerpos',pt:'sólidos',it:'solidi',nl:'blokken',sv:'kroppar',da:'rumfigurer',no:'romfigurer',fi:'kappaleet'},
    setPlates:     {en:'Plates',de:'Schilder',fr:'Plaques',es:'Letreros',pt:'Plaquinhas',it:'Targhette',nl:'Bordjes',sv:'Skyltar',da:'Skilte',no:'Skilt',fi:'Kyltit'},
    pNames:        {en:'names',de:'Namen',fr:'noms',es:'nombres',pt:'nomes',it:'nomi',nl:'namen',sv:'namn',da:'navne',no:'navn',fi:'nimet'},
    pRiddles:      {en:'riddles',de:'Rätsel',fr:'devinettes',es:'adivinanzas',pt:'adivinhações',it:'indovinelli',nl:'raadsels',sv:'gåtor',da:'gåder',no:'gåter',fi:'arvoitukset'},
    ariaTreasure:  {en:'treasure {k}',de:'Schatz {k}',fr:'trésor {k}',es:'tesoro {k}',pt:'tesouro {k}',it:'tesoro {k}',nl:'schat {k}',sv:'skatt {k}',da:'skat {k}',no:'skatt {k}',fi:'aarre {k}'},
    ariaBelt:      {en:'on the belt',de:'auf dem Band',fr:'sur le tapis',es:'en la banda',pt:'na esteira',it:'sul nastro',nl:'op de band',sv:'på bandet',da:'på båndet',no:'på båndet',fi:'hihnalla'},
    ariaPed:       {en:'pedestal',de:'Sockel',fr:'socle',es:'pedestal',pt:'pedestal',it:'piedistallo',nl:'sokkel',sv:'sockel',da:'sokkel',no:'sokkel',fi:'jalusta'},
    ariaPip:       {en:'Professor Pip the penguin',de:'Professor Pip, der Pinguin',fr:'Le professeur Pip, le manchot',es:'El profesor Pip, el pingüino',pt:'O professor Pip, o pinguim',it:'Il professor Pip, il pinguino',nl:'Professor Tobbe, de pinguïn',sv:'Professor Pip, pingvinen',da:'Professor Pip, pingvinen',no:'Professor Pip, pingvinen',fi:'Professori Pip, pingviini'},
    ariaMore:      {en:'one more',de:'eins mehr',fr:'un de plus',es:'uno más',pt:'mais um',it:'uno in più',nl:'één erbij',sv:'en till',da:'én mere',no:'én til',fi:'yksi lisää'},
    ariaLess:      {en:'one fewer',de:'eins weniger',fr:'un de moins',es:'uno menos',pt:'menos um',it:'uno in meno',nl:'één eraf',sv:'en mindre',da:'én mindre',no:'én mindre',fi:'yksi vähemmän'},
    ok_S1:         {en:'Yes — every treasure has its place! A square is still a square when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Quadrat bleibt ein Quadrat, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un carré reste un carré, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un cuadrado sigue siendo un cuadrado aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um quadrado continua sendo um quadrado, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un quadrato resta un quadrato anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een vierkant blijft een vierkant, ook als het gedraaid is!',sv:'Ja – varje skatt har sin plats! En kvadrat är fortfarande en kvadrat, även när den är vriden.',da:'Ja – hver skat har sin plads! Et kvadrat er stadig et kvadrat, også når det er drejet.',no:'Ja – hver skatt har sin plass! Et kvadrat er fortsatt et kvadrat, også når det er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Neliö on yhä neliö, vaikka se on käännetty.'},
    ok_S2:         {en:'Yes — every treasure has its place! A triangle is still a triangle when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Dreieck bleibt ein Dreieck, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un triangle reste un triangle, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un triángulo sigue siendo un triángulo aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um triângulo continua sendo um triângulo, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un triangolo resta un triangolo anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een driehoek blijft een driehoek, ook als hij gedraaid is!',sv:'Ja – varje skatt har sin plats! En triangel är fortfarande en triangel, även när den är vriden.',da:'Ja – hver skat har sin plads! En trekant er stadig en trekant, også når den er drejet.',no:'Ja – hver skatt har sin plass! En trekant er fortsatt en trekant, også når den er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Kolmio on yhä kolmio, vaikka se on käännetty.'},
    ok_S3:         {en:'Yes — every treasure has its place! A square is still a square when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Quadrat bleibt ein Quadrat, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un carré reste un carré, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un cuadrado sigue siendo un cuadrado aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um quadrado continua sendo um quadrado, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un quadrato resta un quadrato anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een vierkant blijft een vierkant, ook als het gedraaid is!',sv:'Ja – varje skatt har sin plats! En kvadrat är fortfarande en kvadrat, även när den är vriden.',da:'Ja – hver skat har sin plads! Et kvadrat er stadig et kvadrat, også når det er drejet.',no:'Ja – hver skatt har sin plass! Et kvadrat er fortsatt et kvadrat, også når det er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Neliö on yhä neliö, vaikka se on käännetty.'},
    ok_S4:         {en:'Yes — every treasure has its place! A triangle is still a triangle when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Dreieck bleibt ein Dreieck, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un triangle reste un triangle, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un triángulo sigue siendo un triángulo aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um triângulo continua sendo um triângulo, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un triangolo resta un triangolo anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een driehoek blijft een driehoek, ook als hij gedraaid is!',sv:'Ja – varje skatt har sin plats! En triangel är fortfarande en triangel, även när den är vriden.',da:'Ja – hver skat har sin plads! En trekant er stadig en trekant, også når den er drejet.',no:'Ja – hver skatt har sin plass! En trekant er fortsatt en trekant, også når den er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Kolmio on yhä kolmio, vaikka se on käännetty.'},
    ok_S5:         {en:'Yes — every treasure has its place! A rectangle is still a rectangle when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Rechteck bleibt ein Rechteck, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un rectangle reste un rectangle, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un rectángulo sigue siendo un rectángulo aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um retângulo continua sendo um retângulo, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un rettangolo resta un rettangolo anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een rechthoek blijft een rechthoek, ook als hij gedraaid is!',sv:'Ja – varje skatt har sin plats! En rektangel är fortfarande en rektangel, även när den är vriden.',da:'Ja – hver skat har sin plads! Et rektangel er stadig et rektangel, også når det er drejet.',no:'Ja – hver skatt har sin plass! Et rektangel er fortsatt et rektangel, også når det er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Suorakulmio on yhä suorakulmio, vaikka se on käännetty.'},
    ok_S6:         {en:'Yes — every treasure has its place! A rectangle is still a rectangle when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Rechteck bleibt ein Rechteck, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un rectangle reste un rectangle, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un rectángulo sigue siendo un rectángulo aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um retângulo continua sendo um retângulo, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un rettangolo resta un rettangolo anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een rechthoek blijft een rechthoek, ook als hij gedraaid is!',sv:'Ja – varje skatt har sin plats! En rektangel är fortfarande en rektangel, även när den är vriden.',da:'Ja – hver skat har sin plads! Et rektangel er stadig et rektangel, også når det er drejet.',no:'Ja – hver skatt har sin plass! Et rektangel er fortsatt et rektangel, også når det er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Suorakulmio on yhä suorakulmio, vaikka se on käännetty.'},
    ok_S7:         {en:'Yes — every treasure has its place! A square is still a square when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Quadrat bleibt ein Quadrat, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un carré reste un carré, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un cuadrado sigue siendo un cuadrado aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um quadrado continua sendo um quadrado, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un quadrato resta un quadrato anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een vierkant blijft een vierkant, ook als het gedraaid is!',sv:'Ja – varje skatt har sin plats! En kvadrat är fortfarande en kvadrat, även när den är vriden.',da:'Ja – hver skat har sin plads! Et kvadrat er stadig et kvadrat, også når det er drejet.',no:'Ja – hver skatt har sin plass! Et kvadrat er fortsatt et kvadrat, også når det er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Neliö on yhä neliö, vaikka se on käännetty.'},
    ok_S8:         {en:'Yes — every treasure has its place! A triangle is still a triangle when it turns.',de:'Ja – jeder Schatz hat seinen Platz! Ein Dreieck bleibt ein Dreieck, auch gedreht.',fr:'Oui, chaque trésor a sa place ! Un triangle reste un triangle, même tourné !',es:'¡Sí! Cada tesoro tiene su lugar. Un triángulo sigue siendo un triángulo aunque esté girado.',pt:'Isso! Cada tesouro tem seu lugar. Um triângulo continua sendo um triângulo, mesmo virado!',it:'Sì! Ogni tesoro ha il suo posto. Un triangolo resta un triangolo anche se è girato!',nl:'Ja! Elke schat heeft zijn plek. Een driehoek blijft een driehoek, ook als hij gedraaid is!',sv:'Ja – varje skatt har sin plats! En triangel är fortfarande en triangel, även när den är vriden.',da:'Ja – hver skat har sin plads! En trekant er stadig en trekant, også når den er drejet.',no:'Ja – hver skatt har sin plass! En trekant er fortsatt en trekant, også når den er dreid.',fi:'Kyllä – jokaisella aarteella on paikkansa! Kolmio on yhä kolmio, vaikka se on käännetty.'},
    ok_S9:         {en:'Yes — 3 triangles and 3 squares!',de:'Ja – 3 Dreiecke und 3 Quadrate!',fr:'Oui, 3 triangles et 3 carrés !',es:'¡Sí! 3 triángulos y 3 cuadrados.',pt:'Isso! 3 triângulos e 3 quadrados!',it:'Sì! 3 triangoli e 3 quadrati!',nl:'Ja! 3 driehoeken en 3 vierkanten!',sv:'Ja – 3 trianglar och 3 kvadrater!',da:'Ja – 3 trekanter og 3 kvadrater!',no:'Ja – 3 trekanter og 3 kvadrater!',fi:'Kyllä – 3 kolmiota ja 3 neliötä!'},
    ok_D1:         {en:'Yes — the can has the shape of a cylinder!',de:'Ja – die Dose hat die Form eines Zylinders!',fr:'Oui, la boîte de conserve a la forme d’un cylindre !',es:'¡Sí! La lata tiene forma de cilindro.',pt:'Isso! A lata tem forma de cilindro!',it:'Sì! La lattina ha la forma di un cilindro!',nl:'Ja! Het blik heeft de vorm van een cilinder!',sv:'Ja – burken har formen av en cylinder!',da:'Ja – dåsen har form som en cylinder!',no:'Ja – boksen har form som en sylinder!',fi:'Kyllä – tölkki on lieriön muotoinen!'},
    ok_D2:         {en:'Yes — the book has the shape of a box!',de:'Ja – das Buch hat die Form eines Quaders!',fr:'Oui, le livre a la forme d’un pavé !',es:'¡Sí! El libro tiene forma de prisma rectangular.',pt:'Isso! O livro tem forma de bloco retangular!',it:'Sì! Il libro ha la forma di un parallelepipedo!',nl:'Ja! Het boek heeft de vorm van een balk!',sv:'Ja – boken har formen av ett rätblock!',da:'Ja – bogen har form som en kasse!',no:'Ja – boka har form som et firkantet prisme!',fi:'Kyllä – kirja on särmiön muotoinen!'},
    ok_D3:         {en:'Yes — the dice has the shape of a cube!',de:'Ja – der Spielwürfel hat die Form eines Würfels!',fr:'Oui, le dé a la forme d’un cube !',es:'¡Sí! El dado tiene forma de cubo.',pt:'Isso! O dado tem forma de cubo!',it:'Sì! Il dado ha la forma di un cubo!',nl:'Ja! De dobbelsteen heeft de vorm van een kubus!',sv:'Ja – tärningen har formen av en kub!',da:'Ja – spilleterningen har form som en terning!',no:'Ja – terningen har form som en kube!',fi:'Kyllä – noppa on kuution muotoinen!'},
    ok_D4:         {en:'Yes — the eraser has the shape of a box!',de:'Ja – der Radiergummi hat die Form eines Quaders!',fr:'Oui, la gomme a la forme d’un pavé !',es:'¡Sí! La goma tiene forma de prisma rectangular.',pt:'Isso! A borracha tem forma de bloco retangular!',it:'Sì! La gomma ha la forma di un parallelepipedo!',nl:'Ja! De gum heeft de vorm van een balk!',sv:'Ja – suddgummit har formen av ett rätblock!',da:'Ja – viskelæderet har form som en kasse!',no:'Ja – viskelæret har form som et firkantet prisme!',fi:'Kyllä – pyyhekumi on särmiön muotoinen!'},
    ok_D5:         {en:'Yes — the orange has the shape of a sphere!',de:'Ja – die Orange hat die Form einer Kugel!',fr:'Oui, l’orange a la forme d’une boule !',es:'¡Sí! La naranja tiene forma de esfera.',pt:'Isso! A laranja tem forma de esfera!',it:'Sì! L’arancia ha la forma di una sfera!',nl:'Ja! De sinaasappel heeft de vorm van een bol!',sv:'Ja – apelsinen har formen av ett klot!',da:'Ja – appelsinen har form som en kugle!',no:'Ja – appelsinen har form som en kule!',fi:'Kyllä – appelsiini on pallon muotoinen!'},
    ok_D6:         {en:'Yes — the book has the shape of a box!',de:'Ja – das Buch hat die Form eines Quaders!',fr:'Oui, le livre a la forme d’un pavé !',es:'¡Sí! El libro tiene forma de prisma rectangular.',pt:'Isso! O livro tem forma de bloco retangular!',it:'Sì! Il libro ha la forma di un parallelepipedo!',nl:'Ja! Het boek heeft de vorm van een balk!',sv:'Ja – boken har formen av ett rätblock!',da:'Ja – bogen har form som en kasse!',no:'Ja – boka har form som et firkantet prisme!',fi:'Kyllä – kirja on särmiön muotoinen!'},
    ok_D7:         {en:'Yes — the present has the shape of a cube!',de:'Ja – das Geschenk hat die Form eines Würfels!',fr:'Oui, le cadeau a la forme d’un cube !',es:'¡Sí! El regalo tiene forma de cubo.',pt:'Isso! O presente tem forma de cubo!',it:'Sì! Il regalo ha la forma di un cubo!',nl:'Ja! Het cadeau heeft de vorm van een kubus!',sv:'Ja – presenten har formen av en kub!',da:'Ja – gaven har form som en terning!',no:'Ja – gaven har form som en kube!',fi:'Kyllä – lahja on kuution muotoinen!'},
    ok_D8:         {en:'Yes — the drum has the shape of a cylinder!',de:'Ja – die Trommel hat die Form eines Zylinders!',fr:'Oui, le tambour a la forme d’un cylindre !',es:'¡Sí! El tambor tiene forma de cilindro.',pt:'Isso! O tambor tem forma de cilindro!',it:'Sì! Il tamburo ha la forma di un cilindro!',nl:'Ja! De trommel heeft de vorm van een cilinder!',sv:'Ja – trumman har formen av en cylinder!',da:'Ja – trommen har form som en cylinder!',no:'Ja – trommen har form som en sylinder!',fi:'Kyllä – rumpu on lieriön muotoinen!'}
    /*STRINGS-END*/
  },
  defaults: { hall: 'shapes', plates: 'names' },
  settings: [
    { key: 'hall', type: 'choice', labelKey: 'setHall', options: [{ value: 'shapes', labelKey: 'hShapes' }, { value: 'solids', labelKey: 'hSolids' }] },
    { key: 'plates', type: 'choice', labelKey: 'setPlates', options: [{ value: 'names', labelKey: 'pNames' }, { value: 'riddles', labelKey: 'pRiddles' }] }
  ],

  OK_MS: 2200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._afterOk = false; this._drag = null; this._flash = null;
    injectPipMuseumCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._hall()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _pic: function (dir, n) { return '/image-library-webp/themes/' + encodeURIComponent(dir) + '/' + n + '@2x.webp'; },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _hall: function () { return PipMuseumCore.hall(this._set('hall')); },
  _plates: function () { return PipMuseumCore.plates(this._set('plates')); },
  _ensurePool: function () { var h = this._hall(); if (!this._pool || this._poolKey !== h) { this._pool = PipMuseumCore.rounds(h); this._poolKey = h; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = PipMuseumCore;
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order); }
    var r = pool[this._order[index % n]];
    return {
      id: 'pip-museum.' + r.id,
      promptKey: r.hall === 'solids' ? 'pSolids' : 'pShapes',
      promptArgs: {},
      celebrateKey: 'ok_' + r.id,
      answerType: 'state',
      setup: function (tool) { tool._clearTimers(); tool._busy = false; tool._afterOk = false; tool._drag = null; tool._flash = null; tool.st = C.newState(r, tool.FAST ? null : Math.random); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this.st = PipMuseumCore.newState(PipMuseumCore.rounds('shapes')[0], null);
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
    var api = this.api, self = this, st = this.st, r = st.r, C = PipMuseumCore;
    api.stage.innerHTML = '';
    var D = C.dests(r), L = this._L = C.layout(this._width(), D.length);
    var wrap = api.el('div', 'pm-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + ' is-' + r.hall); this._wrap = wrap;
    wrap.style.setProperty('--pm-pedw', L.pedW + 'px'); wrap.style.setProperty('--pm-cell', L.cell + 'px'); wrap.style.setProperty('--pm-tcell', L.trayCell + 'px');
    var stage = api.el('div', 'pm-stage'); this._stage = stage; wrap.appendChild(stage);
    /* the hall: Pip (wide) and the pedestals */
    var hallEl = api.el('div', 'pm-hall'); stage.appendChild(hallEl);
    var pip = document.createElement('img'); pip.className = 'pm-pip'; pip.alt = this._t('ariaPip'); pip.draggable = false; pip.src = this._pic(C.PIP[0], C.PIP[1]); pip.style.height = L.pipPic + 'px'; this._pipEl = pip;
    if (L.mode === 'wide') { var pc = api.el('div', 'pm-pipcol'); pc.style.width = L.pip + 'px'; pc.appendChild(pip); hallEl.appendChild(pc); }
    var peds = api.el('div', 'pm-peds'); hallEl.appendChild(peds);
    this._cols = {}; this._trays = {};
    D.forEach(function (d) {
      var col = api.el('div', 'pm-col' + (d === 'mystery' ? ' is-mystery' : '')); col.setAttribute('data-dest', d); col.style.setProperty('--pm-colour', C.COLOUR[d] || '#146B5E');
      var top = api.el('button', 'pm-top'); top.type = 'button'; top.setAttribute('data-dest', d);
      top.innerHTML = self._topHTML(d, r, L);
      top.setAttribute('aria-label', self._destName(d, r));
      top.addEventListener('click', function () { self._tapDest(d, true); });
      var tray = api.el('button', 'pm-tray'); tray.type = 'button'; tray.setAttribute('data-dest', d); tray.setAttribute('aria-label', self._t('ariaPed') + ': ' + self._destName(d, r));
      tray.addEventListener('click', function (ev) { if (ev.target.closest('.pm-tr')) return; self._tapDest(d, false); });
      tray.addEventListener('keydown', function (ev) { self._colKey(ev, d); });
      var plate = api.el('div', 'pm-plate'); plate.innerHTML = self._plateHTML(d, r);
      col.appendChild(top); col.appendChild(tray); col.appendChild(plate);
      peds.appendChild(col); self._cols[d] = col; self._trays[d] = tray;
    });
    /* the belt */
    var belt = api.el('div', 'pm-belt'); belt.setAttribute('aria-label', this._t('ariaBelt')); this._belt = belt; stage.appendChild(belt);
    /* the capstone counters */
    var counters = api.el('div', 'pm-counters'); this._counters = counters; this._cvals = {};
    ['triangle', 'square'].forEach(function (k) {
      var c = api.el('div', 'pm-counter'); c.innerHTML = '<svg class="pm-cicon" viewBox="-50 -50 100 100" aria-hidden="true">' + self._clasp(k, 34) + '</svg>';
      var minus = api.el('button', 'pm-step'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', self._t('n_' + k) + ': ' + self._t('ariaLess'));
      var val = api.el('span', 'pm-val'); val.setAttribute('role', 'status');
      var plus = api.el('button', 'pm-step'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', self._t('n_' + k) + ': ' + self._t('ariaMore'));
      minus.addEventListener('click', function () { self._step(k, -1); }); plus.addEventListener('click', function () { self._step(k, 1); });
      c.appendChild(minus); c.appendChild(val); c.appendChild(plus); counters.appendChild(c); self._cvals[k] = val;
    });
    stage.appendChild(counters);
    var note = api.el('div', 'pm-note'); note.setAttribute('aria-live', 'polite'); this._note = note;
    var ask = api.el('div', 'pm-ask'); this._ask = ask;
    if (L.mode !== 'wide') ask.appendChild(pip);
    ask.appendChild(note);
    var chk = api.el('button', 'pm-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; ask.appendChild(chk);
    wrap.appendChild(ask);
    api.stage.appendChild(wrap);
    this._paint();
  },
  _destName: function (d, r) {
    if (d === 'mystery') return this._t('mystery');
    return this._t('n_' + d);
  },
  /* the top of a column: the brass clasp (shapes) or the object + its wire cage (solids) or the doorway */
  _topHTML: function (d, r, L) {
    if (d === 'mystery') return '<svg class="pm-door" viewBox="0 0 100 80" aria-hidden="true"><path class="pm-arch" d="M14 78 V30 Q50 0 86 30 V78 Z"/><path class="pm-curtain" d="M18 78 V32 Q34 22 50 18 Q50 50 34 78 Z M82 78 V32 Q66 22 50 18 Q50 50 66 78 Z"/><text class="pm-q" x="50" y="64" text-anchor="middle">?</text></svg>';
    if (r.hall === 'solids') {
      var p = r.peds.filter(function (x) { return x.kind === d; })[0], o = PipMuseumCore.OBJ[p.object];
      return '<span class="pm-objbox"><img class="pm-obj" alt="" draggable="false" src="' + this._pic(o[0], p.object) + '" style="height:' + L.obj + 'px"><svg class="pm-cage" viewBox="-50 -50 100 100" aria-hidden="true">' + this._cage(d) + '</svg></span>';
    }
    return '<svg class="pm-clasp" viewBox="-50 -50 100 100" aria-hidden="true">' + this._clasp(d, 34) + '</svg>';
  },
  /* the clasp at rest: brass rods (the canonical shape), hinges, square locks; a hoop */
  _clasp: function (k, R) {
    var f = function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }, pts, out = '';
    if (k === 'circle') return '<circle class="pm-rod" r="' + R + '"/><circle class="pm-hinge" cx="0" cy="-' + R + '" r="4"/>';
    if (k === 'triangle') pts = [[0, -R], [R * 0.87, R * 0.5], [-R * 0.87, R * 0.5]];
    if (k === 'square') pts = [[-R * 0.75, -R * 0.75], [R * 0.75, -R * 0.75], [R * 0.75, R * 0.75], [-R * 0.75, R * 0.75]];
    if (k === 'rectangle') pts = [[-R, -R * 0.55], [R, -R * 0.55], [R, R * 0.55], [-R, R * 0.55]];
    if (k === 'hexagon') { pts = []; for (var i = 0; i < 6; i++) { var a = (30 + 60 * i) * Math.PI / 180; pts.push([R * Math.sin(a), -R * Math.cos(a)]); } }
    out += '<polygon class="pm-rod" points="' + pts.map(f).join(' ') + '"/>';
    pts.forEach(function (p) { out += '<circle class="pm-hinge" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4"/>'; });
    if (k === 'square' || k === 'rectangle') pts.forEach(function (p) { var sx = p[0] > 0 ? -1 : 1, sy = p[1] > 0 ? -1 : 1; out += '<path class="pm-lock" d="M' + (p[0] + sx * 9).toFixed(1) + ' ' + p[1].toFixed(1) + ' V' + (p[1] + sy * 9).toFixed(1) + ' H' + p[0].toFixed(1) + '"/>'; });
    return out;
  },
  /* the wire cage of a solid */
  _cage: function (s) {
    if (s === 'sphere') return '<circle class="pm-wire" r="40"/><ellipse class="pm-wire" rx="40" ry="13"/><ellipse class="pm-wire" rx="13" ry="40"/>';
    if (s === 'cylinder') return '<ellipse class="pm-wire" cx="0" cy="-34" rx="30" ry="9"/><ellipse class="pm-wire" cx="0" cy="34" rx="30" ry="9"/><path class="pm-wire" d="M-30 -34 V34 M30 -34 V34"/>';
    var w = s === 'cube' ? 30 : 40, h = s === 'cube' ? 30 : 22, d = 14;
    return '<path class="pm-wire" d="M' + (-w) + ' ' + (-h + d) + ' h' + (2 * w) + ' v' + (2 * h) + ' h' + (-2 * w) + ' Z M' + (-w) + ' ' + (-h + d) + ' l' + d + ' ' + (-2 * d) + ' h' + (2 * w) + ' l' + (-d) + ' ' + (2 * d) + ' M' + (w + d) + ' ' + (-h - d) + ' v' + (2 * h) + ' l' + (-d) + ' ' + (2 * d) + '"/>';
  },
  _plateHTML: function (d, r) {
    if (d === 'mystery') return '<span class="pm-pname">' + this._t('mystery') + '</span>';
    if (this._plates() === 'riddles') return '<span class="pm-pname is-riddle">' + this._t('r_' + d) + '</span>';
    return '<span class="pm-pname">' + this._t('n_' + d) + '</span>';
  },
  /* a treasure drawn in a 100 × 100 viewBox (shapes from their points; solids shaded) */
  _treasureSVG: function (t, upright, ghost) {
    var C = PipMuseumCore, s = '';
    if (t.solid) s = this._solidSVG(t, upright);
    else {
      var tt = upright ? Object.assign({}, t, { a: 0 }) : t, g = C.shapePts(tt), fill = ['#F6CDBC', '#CFE6DF', '#EAD6A8', '#D9D2EC', '#CFE7C8', '#F7DDE6', '#DDE9F7', '#F3E7C2'][+t.id.slice(1) % 8];
      s = '<path class="pm-shape" style="fill:' + fill + '" d="' + this._shapeD(g, false) + '"/>';
      if (g.open || g.curvedSide != null || g.rounded) s += '<path class="pm-shapeline" d="' + this._shapeD(g, true) + '"/>';
      else s = s.replace('class="pm-shape"', 'class="pm-shape is-lined"');
      if (ghost) s += this._ghostSVG(t);
    }
    return '<svg class="pm-tsvg" viewBox="-50 -50 100 100" aria-hidden="true">' + s + '</svg>';
  },
  _shapeD: function (g, line) {
    var f = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }, p = g.pts, n = p.length, d = '', i;
    if (g.curve) return line && g.open ? 'M' + p.map(f).join(' L') : 'M' + p.map(f).join(' L') + ' Z';
    if (g.rounded) { var rr = Math.min.apply(null, PipMuseumCore.sides(p)) * 0.24; for (i = 0; i < n; i++) { var a = p[(i + n - 1) % n], b = p[i], c = p[(i + 1) % n], la = Math.hypot(a[0] - b[0], a[1] - b[1]), lc = Math.hypot(c[0] - b[0], c[1] - b[1]); d += (i ? ' L' : 'M') + f([b[0] + (a[0] - b[0]) * rr / la, b[1] + (a[1] - b[1]) * rr / la]) + ' Q' + f(b) + ' ' + f([b[0] + (c[0] - b[0]) * rr / lc, b[1] + (c[1] - b[1]) * rr / lc]); } return d + ' Z'; }
    var cen = PipMuseumCore.centroid(p);
    for (i = 0; i < n; i++) {
      var s0 = p[i], e = p[(i + 1) % n];
      if (line && g.open && i === 0) { d += ' M' + f(s0) + ' L' + f([s0[0] + (e[0] - s0[0]) * 0.32, s0[1] + (e[1] - s0[1]) * 0.32]) + ' M' + f([s0[0] + (e[0] - s0[0]) * 0.68, s0[1] + (e[1] - s0[1]) * 0.68]) + ' L' + f(e); continue; }
      if (i === 0 || (line && g.open && i === 1)) d += ' M' + f(s0);
      if (g.curvedSide === i) { var mx = (s0[0] + e[0]) / 2, my = (s0[1] + e[1]) / 2, ox = mx - cen[0], oy = my - cen[1], ol = Math.hypot(ox, oy) || 1, len = Math.hypot(e[0] - s0[0], e[1] - s0[1]); d += ' Q' + f([mx + ox / ol * len * 0.34, my + oy / ol * len * 0.34]) + ' ' + f(e); }
      else d += ' L' + f(e);
    }
    return line && g.open ? d : d + ' Z';
  },
  _solidSVG: function (t, upright) {
    var k = t.scale || t.s || 0.85, rot = upright ? 0 : (t.pose === 'turn' ? 20 : 0), out = '';
    var g = '<g transform="scale(' + k + ') rotate(' + rot + ')">';
    if (t.solid === 'sphere') out = '<circle class="pm-solid" r="40" fill="url(#pm-sph)"/><ellipse class="pm-sline" rx="40" ry="12"/><circle cx="-14" cy="-14" r="8" fill="#fff" opacity=".55"/>';
    else if (t.solid === 'cylinder') out = (t.pose === 'lying' && !upright) ? '<path class="pm-solid" fill="#BFE0F0" d="M-34 -24 H34 A10 24 0 0 1 34 24 H-34 Z"/><ellipse class="pm-solid" fill="#E7F4FA" cx="-34" cy="0" rx="10" ry="24"/>' : '<path class="pm-solid" fill="#BFE0F0" d="M-26 -30 V30 A26 9 0 0 0 26 30 V-30 Z"/><ellipse class="pm-solid" fill="#E7F4FA" cx="0" cy="-30" rx="26" ry="9"/>';
    else if (t.solid === 'cone') out = '<path class="pm-solid" fill="#F3D9A8" d="M0 -40 L30 28 A30 9 0 0 1 -30 28 Z"/><ellipse class="pm-sline" cx="0" cy="28" rx="30" ry="9"/>';
    else if (t.solid === 'pyramid') out = '<path class="pm-solid" fill="#E9C9A1" d="M0 -40 L-34 26 L6 36 Z"/><path class="pm-solid" fill="#D6AE7F" d="M0 -40 L6 36 L34 22 Z"/>';
    else {
      var w = t.solid === 'cube' ? 28 : (t.pose === 'end' && !upright ? 18 : 40), h = t.solid === 'cube' ? 28 : (t.pose === 'end' && !upright ? 38 : 20), d = 12;
      out = '<path class="pm-solid" fill="#CFE6DF" d="M' + (-w) + ' ' + (-h + d) + ' h' + (2 * w) + ' v' + (2 * h) + ' h' + (-2 * w) + ' Z"/>'
        + '<path class="pm-solid" fill="#E6F3EE" d="M' + (-w) + ' ' + (-h + d) + ' l' + d + ' ' + (-2 * d) + ' h' + (2 * w) + ' l' + (-d) + ' ' + (2 * d) + ' Z"/>'
        + '<path class="pm-solid" fill="#A9D2C6" d="M' + w + ' ' + (-h + d) + ' l' + d + ' ' + (-2 * d) + ' v' + (2 * h) + ' l' + (-d) + ' ' + (2 * d) + ' Z"/>';
    }
    return g + out + '</g>';
  },
  /* the ghost clasp built from the treasure itself (miss 1) */
  _ghostSVG: function (t) {
    var gc = PipMuseumCore.ghostClasp(t), f = function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }, out = '<g class="pm-ghost">';
    if (!gc) return '';
    if (gc.hoop) { out += '<path class="pm-grod g0" d="M' + gc.pts.map(f).join(' L') + (gc.open ? '' : ' Z') + '"/>'; return out + '</g>'; }
    gc.rods.forEach(function (rd) { if (rd.gap) { var a = [rd.from[0] + (rd.to[0] - rd.from[0]) * 0.32, rd.from[1] + (rd.to[1] - rd.from[1]) * 0.32], b = [rd.from[0] + (rd.to[0] - rd.from[0]) * 0.68, rd.from[1] + (rd.to[1] - rd.from[1]) * 0.68]; out += '<path class="pm-grod g' + (rd.group % 4) + '" d="M' + f(rd.from) + ' L' + f(a) + ' M' + f(b) + ' L' + f(rd.to) + '"/>'; } else out += '<path class="pm-grod g' + (rd.group % 4) + (rd.bent ? ' is-bent' : '') + '" d="M' + f(rd.from) + ' L' + f(rd.to) + '"/>'; });
    if (!gc.rounded) gc.rods.forEach(function (rd, i) { out += '<circle class="pm-ghinge' + (gc.locks[i] ? ' is-lock' : '') + '" cx="' + rd.from[0].toFixed(1) + '" cy="' + rd.from[1].toFixed(1) + '" r="' + (gc.locks[i] ? 5 : 4) + '"/>'; });
    return out + '</g>';
  },

  _paint: function () {
    if (!this._stage) return;
    var self = this, st = this.st, r = st.r, C = PipMuseumCore, L = this._L, hp = st.help;
    /* the belt */
    this._belt.innerHTML = '';
    this._belt.hidden = st.phase === 'count';
    st.belt.forEach(function (id) { self._belt.appendChild(self._treasureEl(id, 'belt')); });
    /* the trays */
    for (var d in this._trays) {
      var tray = this._trays[d]; tray.innerHTML = '';
      st.trays[d].forEach(function (id) { tray.appendChild(self._treasureEl(id, d)); });
      var col = this._cols[d];
      col.classList.toggle('is-refuse', !!(hp === 1 && this._flash && this._flash[d]));
      col.classList.toggle('is-glow', !!(hp >= 2 && st.sel && C.rightOf(r, C.byId(r, st.sel)) === d));
      col.classList.toggle('is-lit', st.trays[d].some(function (id) { return st.held[id]; }));
      col.classList.toggle('is-floor', !!st.done);
    }
    this._counters.hidden = st.phase !== 'count';
    ['triangle', 'square'].forEach(function (k) { self._cvals[k].textContent = st.count[k] != null ? String(st.count[k]) : ''; });
    this._stage.querySelectorAll('.pm-step').forEach(function (b) { b.disabled = !!st.done; });
    this._pipEl.classList.toggle('is-waddle', !!st.done && !this._afterOk);
    this._checkBtn.hidden = !!st.done; this._checkBtn.disabled = !!this._busy;
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t('ok_' + r.id);
    else if (h) msg = this._t(h);
    else if (st.phase === 'count') msg = this._t('pCount');
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(hp && !st.done && st.last && st.last.result === 'wrong'));
  },
  /* a treasure: a button (drag it, or tap it then a pedestal) */
  _treasureEl: function (id, where) {
    var self = this, st = this.st, r = st.r, C = PipMuseumCore, t = C.byId(r, id), held = !!st.held[id];
    var b = this.api.el('button', 'pm-tr' + (where === 'belt' ? ' on-belt' : ' on-tray') + (held ? ' is-held' : '') + (st.sel === id ? ' is-sel' : '') + (st.refused[id] && st.help >= 1 ? ' is-back' : ''));
    b.type = 'button'; b.setAttribute('data-id', id);
    var k = r.belt.indexOf(t) + 1;
    b.setAttribute('aria-label', this._t('ariaTreasure', { k: k }) + ', ' + (where === 'belt' ? this._t('ariaBelt') : this._t('ariaPed') + ': ' + this._destName(where, r)));
    var ghost = st.help >= 1 && st.refused[id] && where === 'belt';
    var inner = this._treasureSVG(t, held, ghost);
    if (held) inner += '<svg class="pm-hold" viewBox="-50 -50 100 100" aria-hidden="true">' + (t.solid ? (where !== 'mystery' ? '<g transform="scale(0.85)">' + this._cage(t.solid) + '</g>' : '') : this._holdRods(t)) + '</svg>';
    if (ghost && t.solid) inner += '<svg class="pm-hold is-ghost" viewBox="-50 -50 100 100" aria-hidden="true"><g transform="scale(0.85)">' + (['sphere', 'cube', 'cylinder', 'box'].indexOf(t.solid) >= 0 ? this._cage(t.solid) : '<path class="pm-wire" d="M0 -40 L32 30 L-32 30 Z"/>') + '</g></svg>';
    b.innerHTML = inner;
    if (held && !this.FAST) { b.querySelector('.pm-tsvg').style.transform = 'rotate(' + (t.a || 0) + 'deg)'; var tsvg = b.querySelector('.pm-tsvg'); requestAnimationFrame(function () { requestAnimationFrame(function () { if (tsvg) tsvg.style.transform = 'rotate(0deg)'; }); }); }
    this._bindDrag(b, id);
    return b;
  },
  /* the clasp closed round a held treasure: brass along its (upright) sides, a hinge on each corner */
  _holdRods: function (t) {
    var g = PipMuseumCore.shapePts(Object.assign({}, t, { a: 0 })), f = function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); };
    if (!g) return '';
    var out = '<polygon class="pm-rod is-closed" points="' + g.pts.map(f).join(' ') + '"/>';
    if (!g.curve) g.pts.forEach(function (p) { out += '<circle class="pm-hinge" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4"/>'; });
    return out;
  },
  _bindDrag: function (el, id) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || (self.st.held[id] && !self.st.done) || self.st.phase === 'count') return;
      ev.preventDefault();
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, ghost = null;
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        if (!moved) { moved = true; self.st.sel = id; ghost = el.cloneNode(true); ghost.className = 'pm-tr pm-dragging'; document.body.appendChild(ghost); self._paint(); }
        ghost.style.left = (e.clientX - 32) + 'px'; ghost.style.top = (e.clientY - 32) + 'px';
      };
      var up = function (e) {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
        if (ghost) ghost.remove();
        if (!moved) { self.st.sel = self.st.sel === id ? null : id; self.api.sound(660); self._paint(); return; }
        var dest = self._destAt(e.clientX, e.clientY);
        self.st.sel = null;
        if (dest) self._routeTo(id, dest); else self._paint();
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    });
    el.addEventListener('click', function (ev) { if (ev.detail !== 0) return; ev.stopPropagation(); self.st.sel = self.st.sel === id ? null : id; self._paint(); var nx = self._stage.querySelector('.pm-tr[data-id="' + id + '"]'); if (nx) nx.focus(); });
  },
  _destAt: function (x, y) {
    for (var d in this._cols) { var r = this._cols[d].getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return d; }
    var b = this._belt.getBoundingClientRect(); if (x >= b.left && x <= b.right && y >= b.top - 10 && y <= b.bottom + 10) return 'belt';
    return null;
  },
  _routeTo: function (id, dest) {
    if (PipMuseumCore.route(this.st, id, dest)) { this.api.sound(dest === 'belt' ? 420 : 560); this._flash = null; }
    this._paint();
  },
  /* tap a pedestal: route the selected treasure there; with nothing selected, the clasp opens and closes (free play) */
  _tapDest: function (d, fromTop) {
    var st = this.st, self = this;
    if (this._busy) return;
    if (st.sel) { var id = st.sel; st.sel = null; this._routeTo(id, d); var nb = this._trays[d]; if (nb) nb.focus(); return; }
    if (fromTop) { var col = this._cols[d]; col.classList.remove('is-jingle'); void col.offsetWidth; col.classList.add('is-jingle'); this.api.sound(990); this._later(function () { col.classList.remove('is-jingle'); }, 600); void self; }
  },
  _colKey: function (ev, d) {
    var D = PipMuseumCore.dests(this.st.r), i = D.indexOf(d), n = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
    if (n) { ev.preventDefault(); var t = this._trays[D[(i + n + D.length) % D.length]]; if (t) t.focus(); }
  },
  _step: function (k, d) {
    var st = this.st; if (this._busy) return;
    if (st.count[k] == null && d > 0 && st.phase === 'count' && !st.done) { st.count[k] = 1; st.help = 0; st.last = null; this.api.sound(700); this._paint(); return; }
    if (PipMuseumCore.setCount(st, k, d)) { this.api.sound(700); this._paint(); }
  },
  _check: function () {
    var C = PipMuseumCore, st = this.st, self = this;
    if (this._busy || st.done) return;
    var res = C.check(st);
    this._flash = null;
    if (res.result === 'wrong' && res.refused) { this._flash = {}; res.refused.forEach(function (id) { self._flash[st.refused[id]] = true; }); this.api.sound(196); }
    else if (res.result === 'wrong') this.api.sound(196);
    else if (res.result === 'held') this.api.sound(880);
    if (res.result === 'ok') { this._win(); return; }
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

var pmCssDone = false;
function injectPipMuseumCSS() {
  if (pmCssDone || typeof document === 'undefined') return;
  pmCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.pm-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--pm-ink:#0F4A40;--pm-teal:#146B5E;--pm-coral:#F2784B;--pm-brass:#C79A3B;}'
  + '.pm-stage{display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;width:100%;}'
  + '.pm-hall{display:flex;align-items:flex-end;justify-content:center;gap:6px;width:100%;padding:10px 6px 0;border-radius:14px;background:linear-gradient(#FBF3E4 70%,#EFE3CC 70%);box-shadow:inset 0 -3px 0 #D9C6A2;}'
  + '.pm-pipcol{display:flex;align-items:flex-end;justify-content:center;align-self:stretch;padding-bottom:6px;}'
  + '.pm-pip{width:auto;object-fit:contain;transition:transform .9s ease;} .pm-pip.is-waddle{animation:pm-waddle .9s ease-in-out 2;} @keyframes pm-waddle{25%{transform:translate(8px,-4px) rotate(4deg);}75%{transform:translate(16px,0) rotate(-4deg);}}'
  + '.pm-peds{display:flex;gap:var(--pm-gap,8px);justify-content:center;align-items:flex-end;} .is-narrow .pm-peds{gap:4px;}'
  + '.pm-col{width:var(--pm-pedw);display:flex;flex-direction:column;align-items:stretch;border-radius:10px 10px 0 0;transition:box-shadow .2s ease,background .3s ease;}'
  + '.pm-top{padding:0;border:0;background:transparent;cursor:pointer;display:flex;justify-content:center;align-items:flex-end;height:72px;} .is-narrow .pm-top{height:48px;} .is-solids .pm-top{height:108px;} .is-solids.is-narrow .pm-top{height:72px;}'
  + '.pm-clasp{width:66px;height:66px;} .is-narrow .pm-clasp{width:44px;height:44px;} .pm-col.is-jingle .pm-clasp{animation:pm-jingle .5s ease-in-out;} @keyframes pm-jingle{30%{transform:scale(1.18) rotate(-8deg);}60%{transform:scale(.9) rotate(6deg);}}'
  + '.pm-rod{fill:none;stroke:var(--pm-brass);stroke-width:5;stroke-linejoin:round;} .pm-rod.is-closed{stroke-width:6;filter:drop-shadow(0 0 2px rgba(0,0,0,.25));} .pm-hinge{fill:#8C6A21;stroke:#FFE7A6;stroke-width:1.5;} .pm-lock{fill:none;stroke:#8C6A21;stroke-width:3;}'
  + '.pm-objbox{position:relative;display:flex;align-items:flex-end;justify-content:center;} .pm-obj{width:auto;object-fit:contain;display:block;} .pm-cage{position:absolute;inset:-6px;width:calc(100% + 12px);height:calc(100% + 12px);pointer-events:none;} .pm-wire{fill:none;stroke:var(--pm-brass);stroke-width:2.2;opacity:.85;}'
  + '.pm-door{width:80px;height:64px;} .is-narrow .pm-door{width:56px;height:44px;} .pm-arch{fill:#3C4A48;stroke:#2A2A35;stroke-width:2;} .pm-curtain{fill:#146B5E;} .pm-q{fill:#FFE7A6;font-weight:800;font-size:22px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);}'
  + '.pm-tray{position:relative;min-height:calc(2 * var(--pm-tcell) + 14px);padding:5px;border:0;border-radius:10px;background:rgba(255,255,255,.65);box-shadow:inset 0 0 0 2px var(--pm-colour);display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;gap:4px;cursor:pointer;}.is-narrow .pm-tray{min-height:calc(var(--pm-tcell) + 10px);}'
  + '.pm-plate{margin-top:4px;min-height:36px;padding:3px 4px;border-radius:6px;background:#2A2A35;box-shadow:inset 0 -4px 0 var(--pm-colour);display:flex;align-items:center;justify-content:center;text-align:center;} .pm-pname{color:#FFE7A6;font-weight:800;font-size:16px;line-height:1.1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);} .pm-pname.is-riddle{font-size:12px;font-weight:700;color:#FFF3D6;} .is-narrow .pm-pname{font-size:13px;} .is-narrow .pm-pname.is-riddle{font-size:10.5px;} .is-narrow .pm-plate{min-height:30px;}'
  + '.pm-col.is-refuse .pm-clasp,.pm-col.is-refuse .pm-cage,.pm-col.is-refuse .pm-door{animation:pm-refuse .45s ease-in-out 3;} @keyframes pm-refuse{50%{filter:drop-shadow(0 0 6px #F2784B) brightness(1.2);transform:rotate(-6deg);}}'
  + '.pm-col.is-glow{box-shadow:0 0 0 4px var(--pm-colour),0 0 18px var(--pm-colour);background:rgba(255,231,166,.35);}'
  + '.pm-col.is-lit .pm-tray{background:radial-gradient(ellipse at 50% 0,rgba(255,231,166,.8),rgba(255,255,255,.65) 70%);}'
  + '.pm-col.is-floor{background:var(--pm-colour);} .pm-col.is-floor .pm-tray{background:rgba(255,255,255,.85);}'
  + '.pm-belt{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;padding:10px;min-height:calc(var(--pm-cell) + 20px);width:100%;border-radius:12px;background:repeating-linear-gradient(90deg,#55615E 0 22px,#4A5552 22px 44px);box-shadow:inset 0 -4px 0 rgba(0,0,0,.25);} .pm-belt[hidden]{display:none;}'
  + '.pm-tr{position:relative;padding:0;border:0;border-radius:12px;cursor:grab;touch-action:none;background:#FFFDF6;box-shadow:0 2px 0 rgba(0,0,0,.2);} .pm-tr.on-belt{width:var(--pm-cell);height:var(--pm-cell);} .pm-tr.on-tray{width:var(--pm-tcell);height:var(--pm-tcell);}'
  + '.pm-tr.is-sel{box-shadow:0 0 0 4px var(--pm-teal);transform:translateY(-4px);} .pm-tr.is-held{cursor:default;background:#FFF6DA;} .pm-tr.is-back{animation:pm-back .5s ease-out;} @keyframes pm-back{0%{transform:translateY(-30px);}60%{transform:translateY(4px);}}'
  + '.pm-dragging{position:fixed;z-index:50;width:64px;height:64px;pointer-events:none;opacity:.9;box-shadow:0 8px 16px rgba(0,0,0,.25);}'
  + '.pm-tsvg{width:100%;height:100%;display:block;transition:transform .6s ease;} .pm-shape{stroke:none;} .pm-shape.is-lined{stroke:#2A2A35;stroke-width:3;stroke-linejoin:round;} .pm-shapeline{fill:none;stroke:#2A2A35;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;}'
  + '.pm-solid{stroke:#2A2A35;stroke-width:2.5;stroke-linejoin:round;} .pm-sline{fill:none;stroke:#2A2A35;stroke-width:1.5;stroke-dasharray:4 3;}'
  + '.pm-hold{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;} .pm-hold.is-ghost .pm-wire{stroke:#F2784B;stroke-dasharray:5 3;}'
  + '.pm-ghost .pm-grod{fill:none;stroke-width:5;stroke-linecap:round;opacity:.9;} .pm-grod.g0{stroke:#C79A3B;} .pm-grod.g1{stroke:#146B5E;} .pm-grod.g2{stroke:#8A5CC9;} .pm-grod.g3{stroke:#D9572F;} .pm-grod.is-bent{stroke-dasharray:6 4;}'
  + '.pm-ghinge{fill:#2A2A35;stroke:#fff;stroke-width:1.5;} .pm-ghinge.is-lock{fill:#C79A3B;}'
  + '.pm-counters{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;} .pm-counters[hidden]{display:none;} .pm-counter{display:flex;align-items:center;gap:4px;padding:3px;border-radius:12px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #C9B897;} .pm-cicon{width:40px;height:40px;}'
  + '.pm-step{width:44px;height:44px;border:0;border-radius:10px;background:#E3F1EC;font-weight:800;font-size:24px;line-height:1;color:var(--pm-teal);cursor:pointer;} .pm-step:disabled{opacity:.5;} .pm-val{min-width:34px;text-align:center;font-weight:800;font-size:24px;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);color:var(--pm-ink);} .pm-val:empty{height:34px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 2px #C9B897;}'
  + '.pm-note{min-height:28px;font:700 18px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--pm-ink);text-align:center;flex:1;} .pm-note:empty{display:none;} .pm-note.is-ok{color:var(--pm-teal);font-weight:800;} .pm-note.is-wrong{color:#A6461F;} .is-narrow .pm-note{font-size:15px;text-align:left;}'
  + '.pm-ask{display:flex;align-items:center;justify-content:center;gap:10px;} .pm-ask .pm-pip{flex:none;}'
  + '.pm-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font-weight:800;font-size:18px;line-height:1;font-family:var(--lcs-font-display,\'Baloo 2\',sans-serif);cursor:pointer;box-shadow:0 3px 0 #C95A31;flex:none;} .pm-check[hidden]{display:none;} .pm-check:disabled{opacity:.5;}'
  + '.pm-tr:focus-visible,.pm-tray:focus-visible,.pm-top:focus-visible,.pm-step:focus-visible,.pm-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '@media (prefers-reduced-motion: reduce){.pm-pip,.pm-tsvg,.pm-tr,.pm-col *{animation:none !important;transition:none !important;}}';
  var el = document.createElement('style'); el.id = 'pm-css'; el.textContent = css; document.head.appendChild(el);
  /* the sphere's shading */
  var defs = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><radialGradient id="pm-sph" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#FDE3D1"/><stop offset="1" stop-color="#E8996E"/></radialGradient></defs></svg>';
  document.body.insertAdjacentHTML('beforeend', defs);
}

if (typeof window !== 'undefined') window.PipMuseumActivity = PipMuseumActivity;
