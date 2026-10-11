/**
 * data/htdx/strings.js — the How to Draw LEVEL SET titles and instructions (2026-10-11), per face (mode) × level × locale.
 * Read by K-396 copyStrings for a Level Set unit ('lsx-…') only; the published pages keep data/b7 strings.
 * Rules (every locale): the instruction never names the drawing (any of 153 drawings may sit on the page) and never counts
 * its steps (3, 4 or 5) — it says "the picture"; a pronoun refers to that fixed noun, never to the drawing's own noun.
 * Titles carry the drawing through {L} (the title form with its article, data/htdx/names.js) or {U} (the same, capitalised);
 * no title uses a pronoun that would have to agree with the drawing. "Printed" = what the page shows: a BOX with a dashed
 * frame (not a sheet), grey = the trace colour, orange = the new lines of a step (never on the last card).
 */
'use strict';
const T = {};   // titles per mode × locale (the same at every level unless a level overrides)
const I = {};   // instructions per mode × level × locale

T.base = {
  en: 'How to Draw {L} Step by Step', de: '{N} zeichnen lernen Schritt für Schritt', fr: 'Apprendre à dessiner {L} étape par étape',
  es: 'Cómo dibujar {L} paso a paso', it: 'Come disegnare {L} passo dopo passo', pt: 'Como desenhar {L} passo a passo',
  nl: 'Hoe teken je {L}: stap voor stap', sv: 'Hur man ritar {L} steg för steg', da: 'Tegn {L} trin for trin', no: 'Tegn {L} steg for steg', fi: 'Piirrä {L} vaihe vaiheelta',
};
I.base = {
  1: {
    en: 'Look at the numbered steps and draw the picture in the big box over the dotted shapes: first the outline, then the new lines of each step.',
    de: 'Schau dir die nummerierten Schritte an und zeichne das Bild über die gestrichelten Formen in das große Feld: zuerst den Umriss, dann die neuen Linien jedes Schritts.',
    fr: 'Suis les étapes et dessine l\'image dans le grand cadre, sur les formes en pointillés : d\'abord le contour, puis les nouveaux traits.',
    es: 'Mira los pasos numerados y dibuja la imagen en el recuadro grande, sobre las figuras punteadas: primero el contorno y luego las líneas nuevas de cada paso.',
    it: 'Guarda i passaggi numerati e disegna la figura nel riquadro grande, sopra le forme tratteggiate: prima il contorno, poi le linee nuove di ogni passaggio.',
    pt: 'Olhe os passos numerados e desenhe a figura no quadro grande, por cima das formas pontilhadas: primeiro o contorno e depois as linhas novas de cada passo.',
    nl: 'Kijk naar de genummerde stappen en teken de tekening in het grote vak, over de gestippelde vormen: eerst de omtrek, dan de nieuwe lijnen van elke stap.',
    sv: 'Titta på de numrerade stegen och rita bilden i den stora rutan, över de prickade formerna: först konturen, sedan de nya linjerna i varje steg.',
    da: 'Kig på de nummererede trin, og tegn billedet i den store boks oven på de stiplede former: først omridset og så de nye streger i hvert trin.',
    no: 'Se på de nummererte stegene, og tegn bildet i den store ruta oppå de stiplede formene: først omrisset og så de nye strekene i hvert steg.',
    fi: 'Katso numeroituja vaiheita ja piirrä kuva isoon ruutuun katkoviivamuotojen päälle: ensin ääriviiva ja sitten jokaisen vaiheen uudet viivat.',
  },
  2: {
    en: 'Look at the numbered steps and draw the picture in the big box: first the outline, then the new lines you see in each step.',
    de: 'Schau dir die nummerierten Schritte an und zeichne das Bild in das große Feld: zuerst den Umriss, dann die neuen Linien, die du in jedem Schritt siehst.',
    fr: 'Regarde les étapes numérotées et dessine l\'image dans le grand cadre : d\'abord le contour, puis les nouveaux traits que tu vois à chaque étape.',
    es: 'Mira los pasos numerados y dibuja la imagen en el recuadro grande: primero el contorno y luego las líneas nuevas que ves en cada paso.',
    it: 'Guarda i passaggi numerati e disegna la figura nel riquadro grande: prima il contorno, poi le linee nuove che vedi in ogni passaggio.',
    pt: 'Olhe os passos numerados e desenhe a figura no quadro grande: primeiro o contorno e depois as linhas novas que você vê em cada passo.',
    nl: 'Kijk naar de genummerde stappen en teken de tekening in het grote vak: eerst de omtrek, dan de nieuwe lijnen die je in elke stap ziet.',
    sv: 'Titta på de numrerade stegen och rita bilden i den stora rutan: först konturen, sedan de nya linjerna du ser i varje steg.',
    da: 'Kig på de nummererede trin, og tegn billedet i den store boks: først omridset og så de nye streger, du ser i hvert trin.',
    no: 'Se på de nummererte stegene, og tegn bildet i den store ruta: først omrisset og så de nye strekene du ser i hvert steg.',
    fi: 'Katso numeroituja vaiheita ja piirrä kuva isoon ruutuun: ensin ääriviiva ja sitten jokaisen vaiheen uudet viivat.',
  },
  3: {
    en: 'Follow the numbered steps and draw the picture twice, once in each box: first the outline, then the new lines of each step.',
    de: 'Folge den nummerierten Schritten und zeichne das Bild zweimal, einmal in jedes Feld: zuerst den Umriss, dann die neuen Linien jedes Schritts.',
    fr: 'Suis les étapes numérotées et dessine l\'image deux fois, une fois dans chaque cadre : d\'abord le contour, puis les nouveaux traits de chaque étape.',
    es: 'Sigue los pasos numerados y dibuja la imagen dos veces, una en cada recuadro: primero el contorno y luego las líneas nuevas de cada paso.',
    it: 'Segui i passaggi numerati e disegna la figura due volte, una in ogni riquadro: prima il contorno, poi le linee nuove di ogni passaggio.',
    pt: 'Siga os passos numerados e desenhe a figura duas vezes, uma em cada quadro: primeiro o contorno e depois as linhas novas de cada passo.',
    nl: 'Volg de genummerde stappen en teken de tekening twee keer, één keer in elk vak: eerst de omtrek, dan de nieuwe lijnen van elke stap.',
    sv: 'Följ de numrerade stegen och rita bilden två gånger, en gång i varje ruta: först konturen, sedan de nya linjerna i varje steg.',
    da: 'Følg de nummererede trin, og tegn billedet to gange, én gang i hver boks: først omridset og så de nye streger i hvert trin.',
    no: 'Følg de nummererte stegene, og tegn bildet to ganger, én gang i hver rute: først omrisset og så de nye strekene i hvert steg.',
    fi: 'Seuraa numeroituja vaiheita ja piirrä kuva kahdesti, kerran kumpaankin ruutuun: ensin ääriviiva ja sitten jokaisen vaiheen uudet viivat.',
  },
};
T.shapes = {
  en: 'Draw {L} with Simple Shapes', de: '{U} aus einfachen Formen zeichnen', fr: 'Dessiner {L} avec des formes simples', es: 'Dibuja {L} con figuras simples',
  it: 'Disegna {L} partendo da forme semplici', pt: 'Desenhe {L} com formas simples', nl: '{U} tekenen met simpele vormen', sv: 'Rita {L} av enkla former',
  da: 'Tegn {L} ud fra enkle former', no: 'Tegn {L} av enkle former', fi: 'Piirrä {L} yksinkertaisista muodoista',
};
I.shapes = {
  1: {
    en: 'The picture is pale in the box, with its shapes dotted: go over the shapes, then draw the lines of each step on top.',
    de: 'Im Feld ist das Bild ganz hell, mit gestrichelten Formen: fahre zuerst die Formen nach und zeichne dann die Linien jedes Schritts darüber.',
    fr: 'L\'image est pâle dans le cadre, avec ses formes en pointillés : repasse les formes, puis dessine par-dessus les traits de chaque étape.',
    es: 'La imagen está clarita en el recuadro, con sus figuras punteadas: repasa las figuras y luego dibuja encima las líneas de cada paso.',
    it: 'Nel riquadro la figura è chiara, con le forme tratteggiate: ripassa le forme, poi disegna sopra le linee di ogni passaggio.',
    pt: 'A figura está clarinha no quadro, com as formas pontilhadas: passe o lápis por cima das formas e depois desenhe as linhas de cada passo.',
    nl: 'De tekening staat licht in het vak, met gestippelde vormen: trek eerst de vormen over en teken dan de lijnen van elke stap erover.',
    sv: 'Bilden är ljus i rutan, med prickade former: rita över formerna och rita sedan linjerna i varje steg ovanpå.',
    da: 'Billedet står lyst i boksen med stiplede former: tegn oven på formerne, og tegn så stregerne fra hvert trin ovenpå.',
    no: 'Bildet står lyst i ruta med stiplede former: tegn oppå formene, og tegn så strekene fra hvert steg oppå.',
    fi: 'Kuva on vaaleana ruudussa, ja sen muodot ovat katkoviivoina: piirrä muotojen päälle ja sitten jokaisen vaiheen viivat niiden päälle.',
  },
  2: {
    en: 'Go over the dotted shapes in the box, then draw the outline around them and finish the picture with the steps.',
    de: 'Fahre die gestrichelten Formen im Feld nach, zeichne dann den Umriss darum und mache das Bild mit den Schritten fertig.',
    fr: 'Repasse les formes en pointillés du cadre, dessine le contour autour, puis termine l\'image avec les étapes.',
    es: 'Repasa las figuras punteadas del recuadro, dibuja el contorno alrededor y termina la imagen siguiendo los pasos.',
    it: 'Ripassa le forme tratteggiate nel riquadro, disegna intorno il contorno e completa la figura seguendo i passaggi.',
    pt: 'Passe o lápis por cima das formas pontilhadas do quadro, desenhe o contorno em volta delas e termine a figura com os passos.',
    nl: 'Trek de gestippelde vormen in het vak over, teken de omtrek eromheen en maak de tekening af met de stappen.',
    sv: 'Rita över de prickade formerna i rutan, rita sedan konturen runt dem och gör klart bilden med stegen.',
    da: 'Tegn oven på de stiplede former i boksen, tegn så omridset rundt om dem, og tegn billedet færdigt efter trinnene.',
    no: 'Tegn oppå de stiplede formene i ruta, tegn så omrisset rundt dem, og gjør bildet ferdig med stegene.',
    fi: 'Piirrä ruudun katkoviivamuotojen päälle, piirrä sitten ääriviiva niiden ympärille ja viimeistele kuva vaiheiden avulla.',
  },
  3: {
    en: 'Start from the big dotted shapes in the box, draw the outline around them, then finish the picture with the steps.',
    de: 'Beginne mit den großen gestrichelten Formen im Feld, zeichne den Umriss darum und mache das Bild dann mit den Schritten fertig.',
    fr: 'Pars des grandes formes en pointillés du cadre, dessine le contour autour, puis termine l\'image avec les étapes.',
    es: 'Empieza por las figuras punteadas grandes del recuadro, dibuja el contorno alrededor y termina la imagen siguiendo los pasos.',
    it: 'Parti dalle forme tratteggiate grandi nel riquadro, disegna intorno il contorno e completa la figura seguendo i passaggi.',
    pt: 'Comece pelas formas pontilhadas grandes do quadro, desenhe o contorno em volta delas e termine a figura com os passos.',
    nl: 'Begin bij de grote gestippelde vormen in het vak, teken de omtrek eromheen en maak de tekening af met de stappen.',
    sv: 'Börja med de stora prickade formerna i rutan, rita konturen runt dem och gör sedan klart bilden med stegen.',
    da: 'Begynd med de store stiplede former i boksen, tegn omridset rundt om dem, og tegn så billedet færdigt efter trinnene.',
    no: 'Begynn med de store stiplede formene i ruta, tegn omrisset rundt dem, og gjør så bildet ferdig med stegene.',
    fi: 'Aloita ruudun isoista katkoviivamuodoista, piirrä ääriviiva niiden ympärille ja viimeistele kuva sitten vaiheiden avulla.',
  },
};
T.trace = {
  en: 'Trace, Then Draw {L}', de: '{U} nachfahren und dann selbst zeichnen', fr: 'Repasse, puis dessine toi-même {L}', es: 'Repasa y luego dibuja {L}',
  it: 'Disegno guidato: ripassa e poi disegna {L}', pt: 'Cubra {L} e depois desenhe sozinho', nl: '{U} overtrekken en dan zelf tekenen', sv: 'Rita över {L}, rita sedan själv',
  da: 'Tegn oven på, og tegn selv: {L}', no: 'Tegn oppå, og tegn selv: {L}', fi: 'Piirrä viivojen päälle ja sitten itse: {L}',
};
T.trace.byLevel = { 1: {
  en: 'Trace {L} Step by Step', de: '{U} Schritt für Schritt nachfahren', fr: 'Repasse {L} étape par étape', es: 'Repasa {L} paso a paso',
  it: 'Ripassa {L} passo dopo passo', pt: 'Cubra {L} passo a passo', nl: '{U} stap voor stap overtrekken', sv: 'Rita över {L} steg för steg',
  da: 'Tegn oven på {L} trin for trin', no: 'Tegn oppå {L} steg for steg', fi: 'Piirrä viivojen päälle vaihe vaiheelta: {L}',
} };
I.trace = {
  1: {
    en: 'Trace the grey picture with your pencil, step by step, following the numbered steps.',
    de: 'Fahre das graue Bild mit dem Bleistift nach, Schritt für Schritt, so wie die nummerierten Schritte es zeigen.',
    fr: 'Repasse l\'image grise avec ton crayon, étape par étape, en suivant les étapes numérotées.',
    es: 'Repasa la imagen gris con tu lápiz, paso a paso, siguiendo los pasos numerados.',
    it: 'Ripassa con la matita la figura grigia, passo dopo passo, seguendo i passaggi numerati.',
    pt: 'Cubra a figura cinza com o lápis, passo a passo, seguindo os passos numerados.',
    nl: 'Trek de grijze tekening over met je potlood, stap voor stap, zoals de genummerde stappen laten zien.',
    sv: 'Rita över den grå bilden med pennan, steg för steg, så som de numrerade stegen visar.',
    da: 'Tegn oven på det grå billede med blyanten, trin for trin, sådan som de nummererede trin viser.',
    no: 'Tegn oppå det grå bildet med blyanten, steg for steg, slik de nummererte stegene viser.',
    fi: 'Piirrä kynällä harmaan kuvan viivojen päälle vaihe vaiheelta numeroitujen vaiheiden mukaan.',
  },
  2: {
    en: 'Trace the grey picture with your pencil, then draw it yourself in the empty box beside it.',
    de: 'Fahre das graue Bild mit dem Bleistift nach und zeichne es dann selbst in das leere Feld daneben.',
    fr: 'Repasse l\'image grise avec ton crayon, puis dessine-la toi-même dans le cadre vide à côté.',
    es: 'Repasa la imagen gris con tu lápiz y luego dibújala tú solo en el recuadro vacío de al lado.',
    it: 'Ripassa con la matita la figura grigia, poi disegnala da solo nel riquadro vuoto accanto.',
    pt: 'Cubra a figura cinza com o lápis e depois desenhe sozinho no quadro vazio ao lado.',
    nl: 'Trek de grijze tekening over met je potlood en teken hem daarna zelf in het lege vak ernaast.',
    sv: 'Rita över den grå bilden med pennan och rita den sedan själv i den tomma rutan bredvid.',
    da: 'Tegn oven på det grå billede med blyanten, og tegn det så selv i den tomme boks ved siden af.',
    no: 'Tegn oppå det grå bildet med blyanten, og tegn det så selv i den tomme ruta ved siden av.',
    fi: 'Piirrä kynällä harmaan kuvan viivojen päälle ja piirrä se sitten itse viereiseen tyhjään ruutuun.',
  },
  3: {
    en: 'Trace the grey outline, add the lines inside it from the steps, then draw the whole picture yourself in the empty box.',
    de: 'Fahre den grauen Umriss nach, zeichne die Linien innen nach den Schritten dazu und zeichne dann das ganze Bild selbst in das leere Feld.',
    fr: 'Repasse le contour gris, ajoute les traits de l\'intérieur en suivant les étapes, puis dessine toute l\'image toi-même dans le cadre vide.',
    es: 'Repasa el contorno gris, agrega las líneas de adentro siguiendo los pasos y luego dibuja toda la imagen tú solo en el recuadro vacío.',
    it: 'Ripassa il contorno grigio, aggiungi le linee interne seguendo i passaggi, poi disegna tutta la figura da solo nel riquadro vuoto.',
    pt: 'Cubra o contorno cinza, acrescente as linhas de dentro seguindo os passos e depois desenhe a figura inteira sozinho no quadro vazio.',
    nl: 'Trek de grijze omtrek over, teken de lijnen erbinnen erbij met de stappen en teken daarna de hele tekening zelf in het lege vak.',
    sv: 'Rita över den grå konturen, rita linjerna inuti med hjälp av stegen och rita sedan hela bilden själv i den tomma rutan.',
    da: 'Tegn oven på det grå omrids, tegn stregerne indeni efter trinnene, og tegn så hele billedet selv i den tomme boks.',
    no: 'Tegn oppå det grå omrisset, tegn strekene inni etter stegene, og tegn så hele bildet selv i den tomme ruta.',
    fi: 'Piirrä harmaan ääriviivan päälle, lisää sen sisälle viivat vaiheiden mukaan ja piirrä sitten koko kuva itse tyhjään ruutuun.',
  },
};
T.finish = {
  en: 'Finish the {N} Drawing', de: '{U} fertig zeichnen', fr: 'Termine le dessin : {L} à compléter', es: 'Completa el dibujo de {L}',
  it: 'Completa il disegno di {L}', pt: 'Complete o desenho de {L}', nl: 'Maak de tekening af: {L}', sv: 'Gör färdigt teckningen av {L}',
  da: 'Tegn tegningen af {L} færdig', no: 'Tegn ferdig tegningen av {L}', fi: 'Piirrä valmiiksi: {L}',
};
I.finish = {
  1: {
    en: 'A few lines are missing from the second picture: look at the whole picture and draw them in. Then draw one of your own below.',
    de: 'Beim zweiten Bild fehlen ein paar Linien: schau dir das ganze Bild an und zeichne sie ein. Zeichne dann unten ein eigenes Bild.',
    fr: 'Il manque quelques traits sur la deuxième image : regarde l\'image complète et ajoute-les. Puis fais ton propre dessin en bas.',
    es: 'A la segunda imagen le faltan algunas líneas: mira la imagen completa y dibújalas. Luego haz tu propio dibujo abajo.',
    it: 'Alla seconda figura mancano alcune linee: guarda la figura completa e disegnale. Poi fai un disegno tutto tuo qui sotto.',
    pt: 'Faltam algumas linhas na segunda figura: olhe a figura completa e desenhe as que faltam. Depois faça o seu próprio desenho embaixo.',
    nl: 'Bij de tweede tekening ontbreken een paar lijnen: kijk naar de hele tekening en teken ze erbij. Maak daarna onderaan je eigen tekening.',
    sv: 'Några linjer saknas på den andra bilden: titta på hela bilden och rita dit dem. Rita sedan en egen bild nedanför.',
    da: 'Der mangler et par streger på det andet billede: kig på hele billedet, og tegn dem. Tegn så dit eget billede nedenunder.',
    no: 'Det mangler noen streker på det andre bildet: se på hele bildet, og tegn dem inn. Tegn så ditt eget bilde under.',
    fi: 'Toisesta kuvasta puuttuu muutama viiva: katso kokonaista kuvaa ja piirrä ne. Piirrä sitten oma kuvasi alle.',
  },
  2: {
    en: 'Look at the whole picture, draw the lines that are missing on the second picture, then draw one of your own below.',
    de: 'Schau dir das ganze Bild an, zeichne beim zweiten Bild die fehlenden Linien ein und zeichne dann unten ein eigenes Bild.',
    fr: 'Regarde l\'image complète, dessine les traits qui manquent sur la deuxième image, puis fais ton propre dessin en bas.',
    es: 'Mira la imagen completa, dibuja las líneas que le faltan a la segunda imagen y luego haz tu propio dibujo abajo.',
    it: 'Guarda la figura completa, disegna le linee che mancano sulla seconda figura, poi fai un disegno tutto tuo qui sotto.',
    pt: 'Olhe a figura completa, desenhe as linhas que faltam na segunda figura e depois faça o seu próprio desenho embaixo.',
    nl: 'Kijk naar de hele tekening, teken de lijnen die bij de tweede tekening ontbreken en maak daarna onderaan je eigen tekening.',
    sv: 'Titta på hela bilden, rita linjerna som saknas på den andra bilden och rita sedan en egen bild nedanför.',
    da: 'Kig på hele billedet, tegn de streger, der mangler på det andet billede, og tegn så dit eget billede nedenunder.',
    no: 'Se på hele bildet, tegn strekene som mangler på det andre bildet, og tegn så ditt eget bilde under.',
    fi: 'Katso kokonaista kuvaa, piirrä toiseen kuvaan puuttuvat viivat ja piirrä sitten oma kuvasi alle.',
  },
  3: {
    en: 'Only the outline is there: look at the whole picture and draw all the lines inside it. Then draw one of your own below.',
    de: 'Beim zweiten Bild ist nur der Umriss da: schau dir das ganze Bild an und zeichne alle Linien innen ein. Zeichne dann unten ein eigenes Bild.',
    fr: 'Sur la deuxième image, il n\'y a que le contour : regarde l\'image complète et dessine tous les traits de l\'intérieur. Puis fais ton propre dessin en bas.',
    es: 'En la segunda imagen solo está el contorno: mira la imagen completa y dibuja todas las líneas de adentro. Luego haz tu propio dibujo abajo.',
    it: 'Nella seconda figura c\'è solo il contorno: guarda la figura completa e disegna tutte le linee interne. Poi fai un disegno tutto tuo qui sotto.',
    pt: 'Na segunda figura só tem o contorno: olhe a figura completa e desenhe todas as linhas de dentro. Depois faça o seu próprio desenho embaixo.',
    nl: 'Bij de tweede tekening staat alleen de omtrek: kijk naar de hele tekening en teken alle lijnen erbinnen. Maak daarna onderaan je eigen tekening.',
    sv: 'På den andra bilden finns bara konturen: titta på hela bilden och rita alla linjer inuti. Rita sedan en egen bild nedanför.',
    da: 'På det andet billede er der kun omridset: kig på hele billedet, og tegn alle stregerne indeni. Tegn så dit eget billede nedenunder.',
    no: 'På det andre bildet er det bare omrisset: se på hele bildet, og tegn alle strekene inni. Tegn så ditt eget bilde under.',
    fi: 'Toisessa kuvassa on vain ääriviiva: katso kokonaista kuvaa ja piirrä kaikki viivat sen sisälle. Piirrä sitten oma kuvasi alle.',
  },
};
T.grid = {
  en: 'Draw {L} with the Grid', de: '{U} mit dem Raster zeichnen', fr: '{U} à dessiner sur quadrillage', es: 'Dibuja {L} en cuadrícula',
  it: 'Disegna {L} con la griglia', pt: 'Desenhe {L} com a ajuda da grade', nl: '{U} tekenen met een raster', sv: 'Rita {L} ruta för ruta',
  da: 'Tegn {L} med gitter', no: 'Tegn {L} med rutenett', fi: 'Piirrä {L} ruudukon avulla',
};
I.grid = {
  1: {
    en: 'Copy the picture onto the empty grid one big square at a time, then draw it once more without the grid.',
    de: 'Zeichne das Bild Kästchen für Kästchen in das leere Raster mit den großen Kästchen und danach noch einmal ohne Raster.',
    fr: 'Recopie l\'image sur le quadrillage vide, une grande case à la fois, puis dessine-la encore une fois sans quadrillage.',
    es: 'Copia la imagen en la cuadrícula vacía, un cuadro grande a la vez, y luego dibújala otra vez sin cuadrícula.',
    it: 'Copia la figura nella griglia vuota un quadrato grande alla volta, poi disegnala ancora una volta senza griglia.',
    pt: 'Copie a figura na grade vazia, um quadrado grande de cada vez, e depois desenhe mais uma vez sem a grade.',
    nl: 'Teken de tekening hokje voor hokje na in het lege raster met grote hokjes en daarna nog een keer zonder raster.',
    sv: 'Rita av bilden i de tomma rutorna, en stor ruta i taget, och sedan en gång till utan rutor.',
    da: 'Tegn billedet af i det tomme gitter, ét stort felt ad gangen, og tegn det så en gang til uden gitter.',
    no: 'Tegn av bildet i det tomme rutenettet, én stor rute om gangen, og tegn det så en gang til uten rutenett.',
    fi: 'Piirrä kuva tyhjään ruudukkoon iso ruutu kerrallaan ja sitten vielä kerran ilman ruudukkoa.',
  },
  2: {
    en: 'Look at the picture on the grid and draw it on the empty grid one square at a time, then once more without the grid.',
    de: 'Schau dir das Bild im Raster an, zeichne es Kästchen für Kästchen in das leere Raster und danach noch einmal ohne Raster.',
    fr: 'Regarde l\'image sur le quadrillage et dessine-la sur le quadrillage vide, case par case, puis encore une fois sans quadrillage.',
    es: 'Mira la imagen en la cuadrícula y dibújala en la cuadrícula vacía, cuadro por cuadro; luego dibújala otra vez sin cuadrícula.',
    it: 'Guarda la figura sulla griglia e disegnala nella griglia vuota un quadrato alla volta, poi ancora una volta senza griglia.',
    pt: 'Olhe a figura na grade, copie o desenho na grade vazia um quadradinho de cada vez e depois desenhe mais uma vez sem a grade.',
    nl: 'Kijk naar de tekening in het raster, teken hem hokje voor hokje na in het lege raster en daarna nog een keer zonder raster.',
    sv: 'Titta på bilden i rutorna och rita av den ruta för ruta i de tomma rutorna, och sedan en gång till utan rutor.',
    da: 'Kig på billedet i gitteret, tegn det felt for felt i det tomme gitter, og tegn det så en gang til uden gitter.',
    no: 'Se på bildet i rutenettet, tegn det rute for rute i det tomme rutenettet, og tegn det så en gang til uten rutenett.',
    fi: 'Katso kuvaa ruudukossa, piirrä se ruutu kerrallaan tyhjään ruudukkoon ja sitten vielä kerran ilman ruudukkoa.',
  },
  3: {
    en: 'Copy the picture onto the empty grid one small square at a time, looking closely, then draw it once more without the grid.',
    de: 'Schau genau hin und zeichne das Bild Kästchen für Kästchen in das leere Raster mit den kleinen Kästchen, danach noch einmal ohne Raster.',
    fr: 'Regarde bien et recopie l\'image sur le quadrillage vide, une petite case à la fois, puis dessine-la encore une fois sans quadrillage.',
    es: 'Mira con atención y copia la imagen en la cuadrícula vacía, un cuadro pequeño a la vez; luego dibújala otra vez sin cuadrícula.',
    it: 'Guarda bene e copia la figura nella griglia vuota un quadratino alla volta, poi disegnala ancora una volta senza griglia.',
    pt: 'Olhe com atenção e copie a figura na grade vazia, um quadradinho de cada vez, e depois desenhe mais uma vez sem a grade.',
    nl: 'Kijk goed en teken de tekening hokje voor hokje na in het lege raster met kleine hokjes, daarna nog een keer zonder raster.',
    sv: 'Titta noga och rita av bilden i de tomma rutorna, en liten ruta i taget, och sedan en gång till utan rutor.',
    da: 'Kig godt efter, og tegn billedet af i det tomme gitter, ét lille felt ad gangen, og tegn det så en gang til uden gitter.',
    no: 'Se godt etter, og tegn av bildet i det tomme rutenettet, én liten rute om gangen, og tegn det så en gang til uten rutenett.',
    fi: 'Katso tarkasti ja piirrä kuva tyhjään ruudukkoon pieni ruutu kerrallaan ja sitten vielä kerran ilman ruudukkoa.',
  },
};
T.word = {
  en: 'Draw {L} and Write the Word', de: '{U} zeichnen und das Wort schreiben', fr: 'Dessine {L} et écris le mot', es: 'Dibuja {L} y escribe la palabra',
  it: 'Disegna {L} e scrivi la parola', pt: 'Desenhe {L} e escreva a palavra', nl: '{U} tekenen en het woord schrijven', sv: 'Rita {L} och skriv ordet',
  da: 'Tegn {L}, og skriv ordet', no: 'Tegn {L}, og skriv ordet', fi: 'Piirrä {L} ja kirjoita sana',
};
I.word = {
  1: {
    en: 'Follow the steps to draw the picture in the box, then trace the grey word on both lines under it.',
    de: 'Zeichne das Bild mit den Schritten in das Feld und fahre dann das graue Wort auf beiden Zeilen darunter nach.',
    fr: 'Suis les étapes pour dessiner l\'image dans le cadre, puis repasse le mot gris sur les deux lignes en dessous.',
    es: 'Sigue los pasos para dibujar la imagen en el recuadro y luego repasa la palabra gris en los dos renglones de abajo.',
    it: 'Segui i passaggi per disegnare la figura nel riquadro, poi ripassa la parola grigia sulle due righe sotto.',
    pt: 'Siga os passos para desenhar a figura no quadro e depois cubra a palavra cinza nas duas linhas embaixo.',
    nl: 'Teken de tekening met de stappen in het vak en trek dan het grijze woord over op de twee lijnen eronder.',
    sv: 'Följ stegen och rita bilden i rutan, rita sedan över det grå ordet på båda raderna under.',
    da: 'Følg trinnene, og tegn billedet i boksen, og skriv så oven på det grå ord på begge linjer nedenunder.',
    no: 'Følg stegene, og tegn bildet i ruta, og skriv så oppå det grå ordet på begge linjene under.',
    fi: 'Piirrä kuva ruutuun vaiheiden avulla ja kirjoita sitten harmaan sanan päälle kummallakin alla olevalla rivillä.',
  },
  2: {
    en: 'Follow the steps to draw the picture in the box, then trace the word under it and write it once more.',
    de: 'Zeichne das Bild mit den Schritten in das Feld, fahre dann das Wort darunter nach und schreibe es noch einmal.',
    fr: 'Suis les étapes pour dessiner l\'image dans le cadre, puis repasse le mot en dessous et écris-le encore une fois.',
    es: 'Sigue los pasos para dibujar la imagen en el recuadro, luego repasa la palabra de abajo y escríbela una vez más.',
    it: 'Segui i passaggi per disegnare la figura nel riquadro, poi ripassa la parola sotto e scrivila ancora una volta.',
    pt: 'Siga os passos para desenhar a figura no quadro, depois cubra a palavra embaixo e escreva mais uma vez.',
    nl: 'Teken de tekening met de stappen in het vak, trek dan het woord eronder over en schrijf het nog een keer.',
    sv: 'Följ stegen och rita bilden i rutan, rita sedan över ordet under och skriv det en gång till.',
    da: 'Følg trinnene, og tegn billedet i boksen, skriv så oven på det stiplede ord, og skriv ordet selv på den tomme linje.',
    no: 'Følg stegene, og tegn bildet i ruta; skriv så oppå ordet under, og skriv det en gang til selv.',
    fi: 'Piirrä kuva ruutuun vaiheiden avulla, kirjoita sitten harmaan sanan päälle ja kirjoita sana vielä itse tyhjälle riville.',
  },
  3: {
    en: 'Follow the steps to draw the picture in the box, then write the word yourself on the empty line under it.',
    de: 'Zeichne das Bild mit den Schritten in das Feld und schreibe das Wort dann selbst auf die leere Zeile darunter.',
    fr: 'Suis les étapes pour dessiner l\'image dans le cadre, puis écris le mot tout seul sur la ligne vide en dessous.',
    es: 'Sigue los pasos para dibujar la imagen en el recuadro y luego escribe tú solo la palabra en el renglón vacío de abajo.',
    it: 'Segui i passaggi per disegnare la figura nel riquadro, poi scrivi da solo la parola sulla riga vuota sotto.',
    pt: 'Siga os passos para desenhar a figura no quadro e depois escreva sozinho a palavra na linha vazia embaixo.',
    nl: 'Teken de tekening met de stappen in het vak en schrijf het woord dan zelf op de lege lijn eronder.',
    sv: 'Följ stegen och rita bilden i rutan, skriv sedan ordet själv på den tomma raden under.',
    da: 'Følg trinnene, og tegn billedet i boksen, og skriv så ordet selv på den tomme linje nedenunder.',
    no: 'Følg stegene, og tegn bildet i ruta, og skriv så ordet selv på den tomme linjen under.',
    fi: 'Piirrä kuva ruutuun vaiheiden avulla ja kirjoita sitten sana itse alla olevalle tyhjälle riville.',
  },
};
T.scene = {
  en: 'Draw {L} in the Picture', de: '{U} ins Bild zeichnen', fr: 'Dessine {L} dans l\'image', es: 'Dibuja {L} en la escena',
  it: 'Disegna {L} nella scena', pt: 'Desenhe {L} na cena', nl: '{U} in het plaatje tekenen', sv: 'Rita {L} i bilden',
  da: 'Tegn {L} i billedet', no: 'Tegn {L} i bildet', fi: 'Piirrä {L} kuvaan',
};
I.scene = {
  1: {
    en: 'Follow the steps, then draw the missing picture inside the dashed ring in the scene.',
    de: 'Folge den Schritten und zeichne dann, was im Bild fehlt, in den gestrichelten Ring.',
    fr: 'Suis les étapes, puis dessine ce qui manque dans l\'image, à l\'intérieur du rond en pointillés.',
    es: 'Sigue los pasos y luego dibuja lo que falta en la escena, dentro del óvalo punteado.',
    it: 'Segui i passaggi, poi disegna ciò che manca nella scena, dentro l\'ovale tratteggiato.',
    pt: 'Siga os passos e depois desenhe o que está faltando na cena, dentro do círculo pontilhado.',
    nl: 'Volg de stappen en teken dan wat er in het plaatje ontbreekt, binnen de gestippelde ring.',
    sv: 'Följ stegen och rita sedan det som saknas i bilden, inuti den streckade ringen.',
    da: 'Følg trinnene, og tegn så det, der mangler i billedet, inden i den stiplede ring.',
    no: 'Følg stegene, og tegn så det som mangler i bildet, inni den stiplede ringen.',
    fi: 'Seuraa vaiheita ja piirrä sitten kuvasta puuttuva kohde katkoviivarenkaan sisälle.',
  },
  2: {
    en: 'Follow the steps, then draw the missing picture in an empty place in the scene.',
    de: 'Folge den Schritten und zeichne dann, was im Bild fehlt, an eine freie Stelle.',
    fr: 'Suis les étapes, puis dessine ce qui manque dans l\'image, dans un espace libre.',
    es: 'Sigue los pasos y luego dibuja lo que falta en la escena, en un lugar vacío.',
    it: 'Segui i passaggi, poi disegna ciò che manca nella scena, in un posto libero.',
    pt: 'Siga os passos e depois desenhe o que está faltando na cena, num lugar vazio.',
    nl: 'Volg de stappen en teken dan wat er in het plaatje ontbreekt, op een lege plek.',
    sv: 'Följ stegen och rita sedan det som saknas i bilden, på en tom plats.',
    da: 'Følg trinnene, og tegn så det, der mangler i billedet, på en tom plads.',
    no: 'Følg stegene, og tegn så det som mangler i bildet, på en tom plass.',
    fi: 'Seuraa vaiheita ja piirrä sitten kuvasta puuttuva kohde tyhjään kohtaan.',
  },
  3: {
    en: 'Follow the steps, then draw the missing picture in an empty place in the scene, at the right size next to the other things.',
    de: 'Folge den Schritten und zeichne dann, was im Bild fehlt, an eine freie Stelle: so groß, wie es zu den anderen Dingen passt.',
    fr: 'Suis les étapes, puis dessine ce qui manque dans l\'image, dans un espace libre et à la bonne taille à côté des autres choses.',
    es: 'Sigue los pasos y luego dibuja lo que falta en la escena, en un lugar vacío y del tamaño correcto junto a las demás cosas.',
    it: 'Segui i passaggi, poi disegna ciò che manca nella scena, in un posto libero e della grandezza giusta rispetto alle altre cose.',
    pt: 'Siga os passos e depois desenhe o que está faltando na cena, num lugar vazio e do tamanho certo perto das outras coisas.',
    nl: 'Volg de stappen en teken dan wat er in het plaatje ontbreekt, op een lege plek en zo groot als past bij de andere dingen.',
    sv: 'Följ stegen och rita sedan det som saknas i bilden, på en tom plats och lagom stort bredvid de andra sakerna.',
    da: 'Følg trinnene, og tegn så det, der mangler i billedet, på en tom plads og i den rigtige størrelse ved siden af de andre ting.',
    no: 'Følg stegene, og tegn så det som mangler i bildet, på en tom plass og i riktig størrelse ved siden av de andre tingene.',
    fi: 'Seuraa vaiheita ja piirrä sitten kuvasta puuttuva kohde tyhjään kohtaan, oikean kokoisena muiden asioiden viereen.',
  },
};
T.order = {
  en: 'Order the Steps: Drawing {L}', de: 'Schritte ordnen und {L} zeichnen', fr: 'Remets les étapes dans l\'ordre : dessiner {L}', es: 'Ordena los pasos: dibujar {L}',
  it: 'Metti in ordine i passaggi: disegna {L}', pt: 'Coloque os passos em ordem e desenhe {L}', nl: 'Zet de stappen op volgorde: {L} tekenen', sv: 'Ordna stegen: rita {L}',
  da: 'Sæt trinnene i rækkefølge: tegn {L}', no: 'Sett stegene i rekkefølge: tegn {L}', fi: 'Laita vaiheet järjestykseen: piirrä {L}',
};
const ORDER = (k) => ({
  en: `The steps are mixed up: write 1 to ${k} in the boxes beside them in the right order, then draw the picture in the big box.`,
  de: `Die Schritte sind durcheinander: Schreibe 1 bis ${k} in der richtigen Reihenfolge in die Kästchen daneben und zeichne dann das Bild in das große Feld.`,
  fr: `Les étapes sont mélangées : écris 1 à ${k} dans les cases à côté pour les remettre dans l'ordre, puis dessine l'image dans le grand cadre.`,
  es: `Los pasos están revueltos: escribe del 1 al ${k} en los cuadros de al lado, en el orden correcto, y luego dibuja la imagen en el recuadro grande.`,
  it: `I passaggi sono in disordine: scrivi da 1 a ${k} nelle caselle accanto per rimetterli in ordine, poi disegna la figura nel riquadro grande.`,
  pt: `Os passos estão fora de ordem: escreva de 1 a ${k} nos quadradinhos ao lado, na ordem certa, e depois desenhe a figura no quadro grande.`,
  nl: `De stappen staan door elkaar: schrijf 1 tot en met ${k} in de vakjes ernaast, in de goede volgorde, en teken dan de tekening in het grote vak.`,
  sv: `Stegen har hamnat i fel ordning: skriv 1 till ${k} i rutorna bredvid dem i rätt ordning och rita sedan bilden i den stora rutan.`,
  da: `Trinnene er blandet: skriv 1 til ${k} i boksene ved siden af dem, så de kommer i den rigtige rækkefølge, og tegn så billedet i den store boks.`,
  no: `Stegene er stokket om: skriv 1 til ${k} i rutene ved siden av dem i riktig rekkefølge, og tegn så bildet i den store ruta.`,
  fi: `Vaiheet ovat sekaisin: kirjoita viereisiin ruutuihin numerot 1–${k} oikeassa järjestyksessä ja piirrä sitten kuva isoon ruutuun.`,
});
I.order = { 1: ORDER(4), 2: ORDER(5), 3: ORDER(5) };
T['copy-steps'] = {
  en: 'Copy Each Step: Draw {L}', de: '{U} Schritt für Schritt abzeichnen', fr: 'Recopie chaque étape : dessine {L}', es: 'Copia cada paso: dibuja {L}',
  it: 'Copia ogni passaggio: disegna {L}', pt: 'Copie cada passo e desenhe {L}', nl: 'Teken elke stap na: {L}', sv: 'Rita steg för steg: {L}',
  da: 'Trin for trin: tegn {L}', no: 'Steg for steg: tegn {L}', fi: 'Vaihe vaiheelta: piirrä {L}',
};
const COPY = {
  en: 'Draw what you see in each step in the box under it, adding the new lines as you go, then draw the whole picture bigger in the box below.',
  de: 'Zeichne in jedes Feld, was du im Schritt darüber siehst, jedes Mal mit den neuen Linien dazu, und zeichne dann das ganze Bild größer in das Feld unten.',
  fr: 'Dessine ce que tu vois à chaque étape dans la case en dessous, en ajoutant les nouveaux traits, puis dessine toute l\'image en plus grand dans le cadre du bas.',
  es: 'Dibuja en el recuadro de debajo de cada paso lo que ves, agregando cada vez las líneas nuevas, y al final dibuja toda la imagen más grande en el recuadro grande de hasta abajo.',
  it: 'Disegna quello che vedi in ogni passaggio nel riquadro sotto, aggiungendo ogni volta le linee nuove, poi disegna tutta la figura più grande nel riquadro in basso.',
  pt: 'Desenhe no quadro embaixo de cada passo o que você vê, acrescentando as linhas novas, e depois desenhe a figura inteira maior no quadro grande lá embaixo.',
  nl: 'Teken in elk vak wat je in de stap erboven ziet, steeds met de nieuwe lijnen erbij, en teken daarna de hele tekening groter in het vak onderaan.',
  sv: 'Rita det du ser i varje steg i rutan under det, med de nya linjerna varje gång, och rita sedan hela bilden större i rutan längst ner.',
  da: 'Tegn hvert trin i boksen under det, med de nye streger hver gang, og tegn så hele billedet større i boksen nederst.',
  no: 'Tegn hvert steg i ruta under det, med de nye strekene hver gang, og tegn så hele bildet større i ruta nederst.',
  fi: 'Piirrä jokaisen vaiheen kuva sen alla olevaan ruutuun, aina uudet viivat mukaan, ja piirrä sitten koko kuva isompana alimpaan ruutuun.',
};
I['copy-steps'] = { 1: COPY, 2: COPY, 3: COPY };
T.write = {
  en: 'Draw {L}, Then Write About It', de: '{U} zeichnen und darüber schreiben', fr: 'Dessine {L}, puis écris à propos de ton dessin', es: 'Dibuja {L} y escribe sobre tu dibujo',
  it: 'Disegna {L} e poi scrivi del tuo disegno', pt: 'Desenhe {L} e escreva sobre o seu desenho', nl: 'Teken {L} en schrijf erover', sv: 'Rita {L} och skriv några meningar om teckningen',
  da: 'Tegn {L}, og skriv om tegningen', no: 'Tegn {L}, og skriv om tegningen', fi: 'Piirrä {L} ja kirjoita siitä',
};
I.write = {
  1: {
    en: 'Draw the picture with the steps, then write two sentences about your drawing on the lines, starting with the printed words.',
    de: 'Zeichne das Bild mit den Schritten und schreibe dann zwei Sätze über dein Bild auf die Zeilen; beginne mit den gedruckten Wörtern.',
    fr: 'Dessine l\'image avec les étapes, puis écris sur les lignes deux phrases à propos de ton dessin, en commençant par les mots déjà écrits.',
    es: 'Dibuja la imagen siguiendo los pasos y luego escribe dos oraciones sobre tu dibujo en los renglones, empezando con las palabras impresas.',
    it: 'Disegna la figura seguendo i passaggi, poi scrivi sulle righe due frasi sul tuo disegno, cominciando con le parole già stampate.',
    pt: 'Desenhe a figura seguindo os passos e depois escreva duas frases sobre o seu desenho nas linhas, começando pelas palavras já escritas.',
    nl: 'Teken de tekening met de stappen en schrijf dan twee zinnen over je tekening op de lijnen; begin met de woorden die er al staan.',
    sv: 'Rita bilden med hjälp av stegen och skriv sedan två meningar om din teckning på raderna; börja med orden som redan står där.',
    da: 'Tegn billedet med trinnene, og skriv så to sætninger om din tegning på linjerne; begynd med de ord, der allerede står der.',
    no: 'Tegn bildet med stegene, og skriv så to setninger om tegningen din på linjene; begynn med ordene som allerede står der.',
    fi: 'Piirrä kuva vaiheiden avulla ja kirjoita sitten viivoille kaksi lausetta piirustuksestasi; aloita valmiiksi kirjoitetuilla sanoilla.',
  },
  2: {
    en: 'Draw the picture with the steps, then write three sentences about your drawing on the lines, starting with the printed words.',
    de: 'Zeichne das Bild mit den Schritten und schreibe dann drei Sätze über dein Bild auf die Zeilen; beginne mit den gedruckten Wörtern.',
    fr: 'Dessine l\'image avec les étapes, puis écris sur les lignes trois phrases à propos de ton dessin, en commençant par les mots déjà écrits.',
    es: 'Dibuja la imagen siguiendo los pasos y luego escribe tres oraciones sobre tu dibujo en los renglones, empezando con las palabras impresas.',
    it: 'Disegna la figura seguendo i passaggi, poi scrivi sulle righe tre frasi sul tuo disegno, cominciando con le parole già stampate.',
    pt: 'Desenhe a figura seguindo os passos e depois escreva três frases sobre o seu desenho nas linhas, começando pelas palavras já escritas.',
    nl: 'Teken de tekening met de stappen en schrijf dan drie zinnen over je tekening op de lijnen; begin met de woorden die er al staan.',
    sv: 'Rita bilden med hjälp av stegen och skriv sedan tre meningar om din teckning på raderna; börja med orden som redan står där.',
    da: 'Tegn billedet med trinnene, og skriv så tre sætninger om din tegning på linjerne; begynd med de ord, der allerede står der.',
    no: 'Tegn bildet med stegene, og skriv så tre setninger om tegningen din på linjene; begynn med ordene som allerede står der.',
    fi: 'Piirrä kuva vaiheiden avulla ja kirjoita sitten viivoille kolme lausetta piirustuksestasi; aloita valmiiksi kirjoitetuilla sanoilla.',
  },
  3: {
    en: 'Draw the picture with the steps, then write three sentences about your drawing on the lines.',
    de: 'Zeichne das Bild mit den Schritten und schreibe dann drei Sätze über dein Bild auf die Zeilen.',
    fr: 'Dessine l\'image avec les étapes, puis écris sur les lignes trois phrases à propos de ton dessin.',
    es: 'Dibuja la imagen siguiendo los pasos y luego escribe tres oraciones sobre tu dibujo en los renglones.',
    it: 'Disegna la figura seguendo i passaggi, poi scrivi sulle righe tre frasi sul tuo disegno.',
    pt: 'Desenhe a figura seguindo os passos e depois escreva três frases sobre o seu desenho nas linhas.',
    nl: 'Teken de tekening met de stappen en schrijf dan drie zinnen over je tekening op de lijnen.',
    sv: 'Rita bilden med hjälp av stegen och skriv sedan tre meningar om din teckning på raderna.',
    da: 'Tegn billedet med trinnene, og skriv så tre sætninger om din tegning på linjerne.',
    no: 'Tegn bildet med stegene, og skriv så tre setninger om tegningen din på linjene.',
    fi: 'Piirrä kuva vaiheiden avulla ja kirjoita sitten viivoille kolme lausetta piirustuksestasi.',
  },
};
T.memory = {
  en: 'Draw {L} from Memory', de: '{U} aus dem Gedächtnis zeichnen', fr: 'Dessine {L} de mémoire', es: 'Dibuja {L} de memoria',
  it: 'Disegna {L} a memoria', pt: 'Desenhe {L} de memória', nl: '{U} uit je hoofd tekenen', sv: 'Rita {L} ur minnet',
  da: 'Tegn {L} efter hukommelsen', no: 'Tegn {L} etter hukommelsen', fi: 'Piirrä {L} muistista',
};
const MEM = {
  en: 'Look at the picture, fold the page back on the dotted line so you cannot see it, and draw it from memory in the big box.',
  de: 'Schau dir das Bild genau an, falte das Blatt an der Linie nach hinten, damit du es nicht mehr siehst, und zeichne es aus dem Gedächtnis in das große Feld.',
  fr: 'Regarde bien l\'image, plie la page sur la ligne en pointillés pour la cacher, puis dessine-la de mémoire dans le grand cadre.',
  es: 'Mira la imagen, dobla la hoja hacia atrás por la línea punteada para que ya no la veas y dibújala de memoria en el recuadro grande.',
  it: 'Guarda bene la figura, piega il foglio sulla linea tratteggiata per nasconderla e disegnala a memoria nel riquadro grande.',
  pt: 'Olhe bem a figura, dobre a folha na linha pontilhada para não ver mais o desenho e depois desenhe de memória no quadro grande.',
  nl: 'Kijk goed naar de tekening, vouw het blad op de stippellijn naar achteren zodat je hem niet meer ziet, en teken hem uit je hoofd in het grote vak.',
  sv: 'Titta på bilden, vik pappret bakåt längs den streckade linjen så att du inte ser bilden, och rita den ur minnet i den stora rutan.',
  da: 'Kig på billedet, fold papiret bagud langs den stiplede linje, så du ikke kan se det, og tegn det efter hukommelsen i den store boks.',
  no: 'Se på bildet, brett arket bakover langs den stiplede linja så du ikke ser det, og tegn det etter hukommelsen i den store ruta.',
  fi: 'Katso kuvaa, taita paperi taakse katkoviivaa pitkin niin, ettet näe sitä, ja piirrä se muistista isoon ruutuun.',
};
I.memory = {
  1: {
    en: 'Look at the picture, fold the page back on the dotted line, then draw it from memory in the big box; the dotted shapes help you start.',
    de: 'Schau dir das Bild an, falte das Blatt an der Linie nach hinten und zeichne es aus dem Gedächtnis in das große Feld; die gestrichelten Formen helfen beim Anfangen.',
    fr: 'Regarde bien l\'image, plie la page sur la ligne en pointillés, puis dessine-la de mémoire dans le grand cadre ; les formes en pointillés t\'aident à commencer.',
    es: 'Mira la imagen, dobla la hoja hacia atrás por la línea punteada y dibújala de memoria en el recuadro grande; las figuras punteadas te ayudan a empezar.',
    it: 'Guarda bene la figura, piega il foglio sulla linea tratteggiata e disegnala a memoria nel riquadro grande; le forme tratteggiate ti aiutano a cominciare.',
    pt: 'Olhe bem a figura, dobre a folha na linha pontilhada e desenhe de memória no quadro grande; as formas pontilhadas ajudam você a começar.',
    nl: 'Kijk goed naar de tekening, vouw het blad op de stippellijn naar achteren en teken hem uit je hoofd in het grote vak; de gestippelde vormen helpen je op weg.',
    sv: 'Titta på bilden, vik pappret bakåt längs den streckade linjen och rita den ur minnet i den stora rutan; de prickade formerna hjälper dig att börja.',
    da: 'Kig på billedet, fold papiret bagud langs den stiplede linje, og tegn det efter hukommelsen i den store boks; de stiplede former hjælper dig i gang.',
    no: 'Se på bildet, brett arket bakover langs den stiplede linja, og tegn det etter hukommelsen i den store ruta; de stiplede formene hjelper deg i gang.',
    fi: 'Katso kuvaa, taita paperi taakse katkoviivaa pitkin ja piirrä se muistista isoon ruutuun; katkoviivamuodot auttavat sinua alkuun.',
  },
  2: MEM, 3: MEM,
};

const STRINGS = {};
for (const mode of Object.keys(I)) {
  STRINGS[mode] = {};
  for (const lv of Object.keys(I[mode])) {
    STRINGS[mode][lv] = {};
    for (const loc of Object.keys(I[mode][lv])) {
      const title = (T[mode].byLevel && T[mode].byLevel[lv] && T[mode].byLevel[lv][loc]) || T[mode][loc];
      STRINGS[mode][lv][loc] = { title, instruction: I[mode][lv][loc] };
    }
  }
}
module.exports = { STRINGS, T, I };
