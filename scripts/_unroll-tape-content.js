/* =====================================================================
   _unroll-tape-content.js — the public landing page for TOOL #41
   ---------------------------------------------------------------------
   Data only. `register-unroll-tape.js` reads this and writes the eleven
   `frontend/messages/tool-content/<loc>.json` entries plus the hub card.

   Each locale uses ITS OWN panel's vocabulary — the same cord noun, the
   same runway noun, the same tool name as the in-tool strings, so the
   landing page and the apparatus speak with one voice per language:
     de Schnur/Leiste · fr ficelle/couloir · es cordón/pista ·
     pt barbante/trilha · it spago/pista · nl touwtje/lijn ·
     sv snöre/spår · da tråd/bane · no hyssing/spor · fi lanka/kaista

   ⚠ NO STRING NAMES A UNIT, here either. A landing page is exactly where
   "measure in centimetres" arrives as a helpful clarification, and it
   would turn this into a ruler. Checked on the rendered page, per locale.

   ⭐ AND `howToUse` CARRIES THE INVARIANCE PROMPT. Every panel noticed
   that nothing in the tool invites a teacher to resize the shape — and
   resizing is the one move that shows the reading does not change. It
   belongs in the teacher's runbook, not on the child's apparatus.

   ⚠ NO EFFICACY IS CLAIMED. There is no study behind this routine and
   §23.7 says never to claim one.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    slug: 'measure-around-a-shape-strand-k2',
    name: 'All the Way Round',
    tagline: 'A strand lies all the way round a shape, then lies down straight beside a scale ruled in the shape’s own width — and a circle always comes out at three and a bit.',
    about: [
      'A flat shape stands on a ruled line. A strand lies all the way round its edge. Drag the strand’s tip and it slides off the shape and lies down straight along the line, keeping exactly the length it had when it was curved. The line is not ruled in any named unit: each step is the shape’s own width, marked by the two small uprights beneath it.',
      'Turning a curved length into a straight one is the one move in early measurement with no still picture. You can do it once with real string, which is exactly why it almost never gets done twice — the string tangles, the class has moved on, and the moment does not come round again. There is no efficacy research behind this routine and none is claimed; what the tool offers is the moment, repeatable.',
      'Then the reading. A circle’s strand reaches a little past the third mark. Make the circle bigger and everything grows with it — the outline, the strand, the marks — and the end of the strand stays between the same two marks. It is three and a bit for every circle there has ever been. And a shape that is plainly not a circle, with three curved sides, comes out at exactly the same three and a bit, which is worth an afternoon on its own.',
      'Before the strand moves, the class plants a flag where they think it will reach. The flag freezes when the strand starts to move and it is never marked, never scored, never corrected — it simply stays where it was put, beside where the strand landed. Nothing on screen says which is longer. There is no reading needed to use it: a shape, a cord, and a row of numerals. Five shapes and the whole apparatus are free; the other seven and the printable sheet come with the Teacher plan.'
    ],
    howToUse: [
      'Put a shape up and ask the class how far it is all the way round, before anything moves.',
      'Let a child drag the flag to where they think the strand will reach, and leave it there.',
      'Drag the strand’s tip slowly, so the class watches the cord leave the curve and arrive on the line.',
      '⭐ Now make the shape much bigger and let it lie down again — the number does not change. This is the move the whole tool is for.',
      'Try the shape with three curved sides next to the circle, and let the class explain why they read the same.',
      'Compare the strand with the shorter bar beneath it, which is the shape’s height, and say nothing at all about which is longer.'
    ],
    classroomIdeas: [
      'Predict first: every child writes down how many widths they expect, before the strand moves.',
      'Two shapes, one question — the crescent is shorter than the egg and carries more cord. Ask why.',
      'Give a child a target: make the shape so the strand lands exactly on the fourth mark.',
      'Run the circle three times at three sizes and record all three readings on the board, then look at the column.',
      'Do it on paper afterwards with real string round a jar lid, and compare what the class gets.',
      'Ask which shape would carry the most cord for its width, then check — the flower looks as round as the circle.'
    ],
    metaTitle: 'All the Way Round — measure around a shape, K-2',
    metaDescription: 'A strand lies round a shape, then lies down straight on a scale ruled in the shape’s own width. A free whiteboard tool for measuring around, K-2.'
  },

  de: {
    slug: 'messen-rundherum-umfang-grundschule',
    name: 'Die Schnur rundherum',
    tagline: 'Eine Schnur liegt einmal rundherum um eine Form und legt sich dann gerade auf eine Leiste, die in der Breite der Form eingeteilt ist — beim Kreis kommt immer drei und ein bisschen heraus.',
    about: [
      'Auf der Leiste steht eine flache Form. Um ihren Rand liegt eine Schnur. Zieh am Ende der Schnur: Sie rutscht von der Form herunter und legt sich gerade auf die Leiste — genau so lang, wie sie vorher krumm war. Die Leiste ist in keiner genormten Einheit eingeteilt, sondern in der Breite der Form selbst, die die beiden kleinen Striche darunter markieren.',
      'Aus einer krummen Länge eine gerade zu machen ist der eine Schritt beim Messen, für den es kein Standbild gibt. Mit einer echten Schnur geht das einmal, und genau deshalb passiert es fast nie zweimal: Die Schnur verheddert sich, die Stunde ist vorbei, der Moment kommt nicht wieder. Zu dieser Routine gibt es keine Wirksamkeitsstudie, und wir behaupten auch keine — das Werkzeug macht den Moment wiederholbar.',
      'Und dann die Zahl. Die Schnur eines Kreises reicht ein Stück über den dritten Strich. Macht den Kreis größer: Alles wächst mit — der Rand, die Schnur, die Striche — und das Ende der Schnur bleibt zwischen denselben beiden Strichen liegen. Es sind drei und ein bisschen, bei jedem Kreis. Und eine Form, die sichtbar kein Kreis ist und drei gebogene Seiten hat, kommt auf genau dieselben drei und ein bisschen.',
      'Bevor sich etwas bewegt, steckt die Klasse eine Fahne dorthin, wo die Schnur ihrer Meinung nach ankommt. Beim ersten Zug friert die Fahne fest. Sie wird nie bewertet, nie korrigiert — sie bleibt einfach stehen, neben der Stelle, an der die Schnur gelandet ist. Nichts sagt, was länger ist. Lesen muss dafür niemand können: eine Form, eine Schnur, eine Reihe Zahlen. Fünf Formen und der ganze Aufbau sind kostenlos; die anderen sieben und das Blatt zum Ausdrucken gehören zum Lehrer-Paket.'
    ],
    howToUse: [
      'Zeigt eine Form und fragt, wie weit es einmal rundherum ist — bevor sich irgendetwas bewegt.',
      'Ein Kind zieht die Fahne dorthin, wo die Schnur wohl ankommt, und dort bleibt sie stehen.',
      'Zieht langsam am Ende der Schnur, damit alle sehen, wie sie den Bogen verlässt und auf der Leiste ankommt.',
      '⭐ Macht die Form jetzt viel größer und lasst die Schnur noch einmal hinlegen — die Zahl bleibt gleich. Dafür ist das ganze Werkzeug da.',
      'Legt danach die Form mit den drei gebogenen Seiten neben den Kreis und lasst erklären, warum beide dasselbe ergeben.',
      'Vergleicht die Schnur mit dem kurzen Balken darunter — das ist die Höhe der Form — und sagt nichts darüber, was länger ist.'
    ],
    classroomIdeas: [
      'Erst schätzen: Jedes Kind schreibt auf, wie viele Breiten es erwartet, bevor sich die Schnur bewegt.',
      'Zwei Formen, eine Frage — der Mond ist niedriger als das Ei und braucht mehr Schnur. Warum?',
      'Gebt ein Ziel vor: Stellt die Form so ein, dass die Schnur genau auf dem vierten Strich endet.',
      'Messt denselben Kreis in drei Größen und schreibt alle drei Zahlen untereinander an die Tafel.',
      'Macht es danach auf Papier mit echter Schnur um einen Deckel und vergleicht.',
      'Fragt, welche Form für ihre Breite am meisten Schnur braucht, und prüft es nach — die Blume sieht so rund aus wie der Kreis.'
    ],
    metaTitle: 'Die Schnur rundherum – messen rundherum, Klasse 1-2',
    metaDescription: 'Eine Schnur liegt rundherum um eine Form und legt sich gerade auf eine Leiste, die in der Breite der Form eingeteilt ist. Kostenlos am Whiteboard, Klasse 1-2.'
  },

  fr: {
    slug: 'mesurer-le-tour-dune-forme-cycle-2',
    name: 'La ficelle qui se couche',
    tagline: 'Une ficelle fait tout le tour d’une forme, puis se couche bien droite dans un couloir marqué à la largeur de la forme — et pour un cercle, cela fait toujours trois fois et un peu.',
    about: [
      'Une forme plate est posée sur une ligne. Une ficelle fait tout le tour de son bord. Faites glisser le bout de la ficelle : elle quitte la forme et vient se coucher bien droite dans le couloir, avec exactement la longueur qu’elle avait quand elle était courbe. Le couloir n’est marqué dans aucune mesure convenue : chaque intervalle vaut la largeur de la forme elle-même, repérée par les deux petits traits en dessous.',
      'Transformer une longueur courbe en longueur droite est le seul geste de la mesure au cycle 2 dont il n’existe aucune image fixe. On peut le faire une fois avec une vraie ficelle, et c’est justement pour cela qu’on ne le refait presque jamais : la ficelle s’emmêle, la séance est finie, le moment ne revient pas. Aucune étude ne mesure l’effet de cet outil et nous n’en revendiquons aucun ; il rend simplement ce moment répétable.',
      'Puis vient le nombre. La ficelle d’un cercle dépasse un peu la troisième marque. Agrandissez le cercle : tout grandit avec lui — le contour, la ficelle, les marques — et le bout de la ficelle reste entre les deux mêmes marques. Trois fois et un peu, pour tous les cercles du monde. Et une forme qui n’est manifestement pas un cercle, avec ses trois côtés courbes, donne exactement le même résultat.',
      'Avant que rien ne bouge, la classe pose un repère là où elle pense que la ficelle s’arrêtera. Le repère se fige dès le premier mouvement, et il n’est jamais noté, jamais corrigé : il reste où on l’a posé, à côté de là où la ficelle est arrivée. Rien à l’écran ne dit ce qui est le plus long. Il n’y a rien à lire pour s’en servir : une forme, une ficelle, une rangée de chiffres. Cinq formes et tout l’appareil sont gratuits ; les sept autres et la feuille à imprimer font partie de l’offre Enseignant.'
    ],
    howToUse: [
      'Affichez une forme et demandez quelle distance cela fait tout le tour, avant que rien ne bouge.',
      'Un élève pose le repère là où il pense que la ficelle s’arrêtera, et on l’y laisse.',
      'Faites glisser le bout de la ficelle lentement, pour que la classe la voie quitter la courbe et arriver sur la ligne.',
      '⭐ Agrandissez maintenant beaucoup la forme et recouchez la ficelle : le nombre ne change pas. C’est pour cela que l’outil existe.',
      'Placez ensuite la forme aux trois côtés courbes à côté du cercle et faites expliquer pourquoi les deux donnent la même chose.',
      'Comparez la ficelle à la barre plus courte en dessous, qui est la hauteur de la forme, et ne dites rien sur ce qui est le plus long.'
    ],
    classroomIdeas: [
      'Estimer d’abord : chacun écrit combien de largeurs il attend, avant que la ficelle bouge.',
      'Deux formes, une question — le croissant est plus bas que l’œuf et prend plus de ficelle. Pourquoi ?',
      'Donnez une cible : réglez la forme pour que la ficelle s’arrête pile sur la quatrième marque.',
      'Mesurez le même cercle à trois tailles et écrivez les trois nombres l’un sous l’autre au tableau.',
      'Refaites-le sur papier avec une vraie ficelle autour d’un couvercle et comparez.',
      'Demandez quelle forme prend le plus de ficelle pour sa largeur, puis vérifiez — la fleur paraît aussi ronde que le cercle.'
    ],
    metaTitle: 'La ficelle qui se couche — mesurer le tour, cycle 2',
    metaDescription: 'Une ficelle fait le tour d’une forme puis se couche droite dans un couloir marqué à la largeur de la forme. Outil gratuit au TBI, cycle 2.'
  },

  es: {
    slug: 'medir-el-contorno-de-una-figura-primaria',
    name: 'La vuelta a la figura',
    tagline: 'Un cordón le da toda la vuelta a una figura y luego se acuesta recto en una pista marcada con el ancho de la figura — y en un círculo siempre sale tres y un poco.',
    about: [
      'Una figura plana se apoya sobre una línea. Un cordón le da toda la vuelta al borde. Arrastra la punta del cordón: sale de la figura y se acuesta recto en la pista, con exactamente el mismo largo que tenía cuando estaba curvo. La pista no está marcada en ninguna medida convenida: cada tramo vale el ancho de la propia figura, señalado por las dos rayitas de abajo.',
      'Convertir un largo curvo en uno recto es el único paso de la medida en los primeros años que no tiene ninguna imagen fija. Con un cordón de verdad se hace una vez, y justo por eso casi nunca se hace dos: el cordón se enreda, la clase sigue adelante y el momento no vuelve. No hay estudios sobre el efecto de esta herramienta ni lo afirmamos; lo que ofrece es ese momento, repetible.',
      'Y después, el número. El cordón de un círculo pasa un poco de la tercera marca. Haz el círculo más grande: crece todo con él — el contorno, el cordón, las marcas — y la punta del cordón se queda entre las dos mismas marcas. Tres y un poco, en todos los círculos que existen. Y una figura que claramente no es un círculo, con tres lados curvos, da exactamente ese mismo tres y un poco.',
      'Antes de que nada se mueva, la clase pone una bandera donde cree que llegará el cordón. La bandera se congela en cuanto el cordón empieza a moverse, y nunca se corrige ni se califica: se queda donde la pusieron, al lado de donde cayó el cordón. Nada en la pantalla dice cuál es más largo. No hace falta saber leer para usarla: una figura, un cordón y una fila de números. Cinco figuras y todo el aparato son gratis; las otras siete y la hoja para imprimir van con el plan Docente.'
    ],
    howToUse: [
      'Pon una figura y pregunta cuánto mide toda la vuelta, antes de mover nada.',
      'Que un niño arrastre la bandera hasta donde cree que llegará el cordón, y ahí se queda.',
      'Arrastra la punta del cordón despacio, para que la clase lo vea salir de la curva y llegar a la pista.',
      '⭐ Ahora haz la figura mucho más grande y vuelve a acostar el cordón: el número no cambia. Para esto existe la herramienta.',
      'Pon luego la figura de tres lados curvos junto al círculo y pide que expliquen por qué dan lo mismo.',
      'Compara el cordón con la barra más corta de abajo, que es la altura de la figura, y no digas nada sobre cuál es mayor.'
    ],
    classroomIdeas: [
      'Estimar primero: cada niño escribe cuántos anchos espera, antes de que el cordón se mueva.',
      'Dos figuras, una pregunta — la luna es más baja que el huevo y lleva más cordón. ¿Por qué?',
      'Da un objetivo: ajusta la figura para que el cordón caiga justo en la cuarta marca.',
      'Mide el mismo círculo en tres tamaños y escribe los tres números uno debajo de otro.',
      'Házlo después en papel con un cordón de verdad alrededor de una tapa y compara.',
      'Pregunta qué figura lleva más cordón para su ancho y comprobadlo — la flor parece tan redonda como el círculo.'
    ],
    metaTitle: 'La vuelta a la figura: medir el contorno, 1.º y 2.º',
    metaDescription: 'Un cordón da la vuelta a una figura y se acuesta recto en una pista marcada con el ancho de la figura. Herramienta gratuita para la pizarra digital.'
  },

  pt: {
    slug: 'medir-a-volta-de-uma-figura-anos-iniciais',
    name: 'O Barbante do Contorno',
    tagline: 'Um barbante dá a volta inteira numa figura e depois deita reto numa trilha marcada com a largura da figura — e num círculo dá sempre três e um pouquinho.',
    about: [
      'Uma figura plana fica apoiada numa linha. Um barbante dá a volta inteira na borda dela. Arraste a ponta do barbante: ele sai da figura e deita reto na trilha, com exatamente o mesmo comprimento que tinha quando estava curvo. A trilha não está marcada em nenhuma medida combinada: cada pedaço vale a largura da própria figura, marcada pelos dois tracinhos embaixo.',
      'Transformar um comprimento curvo num comprimento reto é o único passo da medida nos anos iniciais que não tem imagem parada. Com barbante de verdade dá para fazer uma vez, e é exatamente por isso que quase nunca se faz duas: o barbante embola, a aula acaba, o momento não volta. Não há estudo sobre o efeito desta ferramenta e não afirmamos nenhum; o que ela oferece é esse momento, repetível.',
      'E então o número. O barbante de um círculo passa um pouco da terceira marca. Aumente o círculo: tudo cresce junto — o contorno, o barbante, as marcas — e a ponta do barbante continua entre as duas mesmas marcas. Três e um pouquinho, em todo círculo que existe. E uma figura que claramente não é um círculo, com três lados curvos, dá exatamente esse mesmo três e um pouquinho.',
      'Antes de qualquer coisa se mexer, a turma finca uma bandeirinha onde acha que o barbante vai chegar. A bandeirinha congela assim que o barbante começa a andar, e nunca é corrigida nem pontuada: fica onde a colocaram, ao lado de onde o barbante parou. Nada na tela diz qual é maior. Não é preciso saber ler para usar: uma figura, um barbante e uma fileira de números. Cinco figuras e o aparato inteiro são gratuitos; as outras sete e a folha para imprimir vêm com o plano Professor.'
    ],
    howToUse: [
      'Coloque uma figura e pergunte quanto mede a volta inteira, antes de mexer em nada.',
      'Uma criança arrasta a bandeirinha até onde acha que o barbante vai chegar, e ela fica ali.',
      'Arraste a ponta do barbante devagar, para a turma ver ele sair da curva e chegar na trilha.',
      '⭐ Agora aumente bastante a figura e deite o barbante de novo: o número não muda. É para isso que a ferramenta existe.',
      'Depois ponha a figura de três lados curvos ao lado do círculo e peça que expliquem por que dão o mesmo.',
      'Compare o barbante com a barra mais curta embaixo, que é a altura da figura, e não diga nada sobre qual é maior.'
    ],
    classroomIdeas: [
      'Estimar primeiro: cada criança escreve quantas larguras espera, antes de o barbante se mexer.',
      'Duas figuras, uma pergunta — a lua é mais baixa que o ovo e leva mais barbante. Por quê?',
      'Dê um alvo: ajuste a figura para o barbante parar bem na quarta marca.',
      'Meça o mesmo círculo em três tamanhos e escreva os três números um embaixo do outro.',
      'Depois faça no papel com barbante de verdade em volta de uma tampa e comparem.',
      'Pergunte qual figura leva mais barbante para a largura dela e confiram — a flor parece tão redonda quanto o círculo.'
    ],
    metaTitle: 'O Barbante do Contorno | medir a volta de uma figura',
    metaDescription: 'Um barbante dá a volta numa figura e deita reto numa trilha marcada com a largura da figura. Ferramenta gratuita para a lousa digital.'
  },

  it: {
    slug: 'misurare-il-giro-di-una-figura-primaria',
    name: 'Lo spago del contorno',
    tagline: 'Uno spago fa tutto il giro di una figura e poi si stende dritto su una pista graduata con la larghezza della figura — e per un cerchio viene sempre tre e un po’.',
    about: [
      'Una figura piatta poggia su una linea. Uno spago fa tutto il giro del suo bordo. Trascinate la punta dello spago: si stacca dalla figura e si stende dritto sulla pista, esattamente lungo come era da curvo. La pista non è graduata in nessuna misura convenzionale: ogni intervallo vale la larghezza della figura stessa, segnata dai due trattini sotto di essa.',
      'Trasformare una lunghezza curva in una dritta è l’unico passaggio della misura nei primi anni che non ha nessuna immagine ferma. Con uno spago vero lo si fa una volta, ed è proprio per questo che quasi non lo si rifa mai: lo spago si aggroviglia, la lezione finisce, il momento non torna. Non esiste uno studio sull’efficacia di questo strumento e non ne rivendichiamo nessuna; quello che offre è quel momento, ripetibile.',
      'E poi il numero. Lo spago di un cerchio supera di poco la terza tacca. Ingrandite il cerchio: cresce tutto insieme — il contorno, lo spago, le tacche — e la punta dello spago resta fra le stesse due tacche. Tre e un po’, per ogni cerchio che esista. E una figura che chiaramente non è un cerchio, con tre lati curvi, dà esattamente quello stesso tre e un po’.',
      'Prima che si muova qualcosa, la classe pianta una bandierina dove pensa che lo spago arriverà. La bandierina si blocca appena lo spago comincia a muoversi, e non viene mai corretta né valutata: resta dove l’hanno messa, accanto al punto in cui lo spago si è fermato. Niente sullo schermo dice quale sia più lungo. Non serve saper leggere per usarlo: una figura, uno spago e una fila di numeri. Cinque figure e tutto l’apparato sono gratuiti; le altre sette e il foglio da stampare fanno parte del piano Insegnante.'
    ],
    howToUse: [
      'Mettete una figura e chiedete quanto misura tutto il giro, prima che si muova qualcosa.',
      'Un bambino trascina la bandierina dove pensa che arriverà lo spago, e lì resta.',
      'Trascinate la punta dello spago lentamente, così la classe lo vede lasciare la curva e arrivare sulla pista.',
      '⭐ Ora ingrandite molto la figura e fate stendere di nuovo lo spago: il numero non cambia. È per questo che lo strumento esiste.',
      'Poi mettete la figura con i tre lati curvi accanto al cerchio e fate spiegare perché danno lo stesso risultato.',
      'Confrontate lo spago con la barra più corta sotto, che è l’altezza della figura, e non dite nulla su quale sia maggiore.'
    ],
    classroomIdeas: [
      'Prima la stima: ogni bambino scrive quante larghezze si aspetta, prima che lo spago si muova.',
      'Due figure, una domanda — la luna è più bassa dell’uovo e porta più spago. Perché?',
      'Date un obiettivo: regolate la figura perché lo spago si fermi esattamente sulla quarta tacca.',
      'Misurate lo stesso cerchio in tre grandezze e scrivete i tre numeri uno sotto l’altro.',
      'Rifatelo su carta con uno spago vero attorno a un coperchio e confrontate.',
      'Chiedete quale figura porta più spago per la sua larghezza, poi verificate — il fiore sembra rotondo come il cerchio.'
    ],
    metaTitle: 'Lo spago del contorno — misurare il giro, primaria',
    metaDescription: 'Uno spago fa il giro di una figura e si stende dritto su una pista graduata con la larghezza della figura. Strumento gratuito per la LIM.'
  },

  nl: {
    slug: 'meten-rondom-een-vorm-groep-3',
    name: 'Helemaal rondom',
    tagline: 'Een touwtje ligt helemaal rondom een vorm en gaat daarna recht op een lijn liggen die verdeeld is in breedtes van de vorm — bij een cirkel komt er altijd drie en een beetje uit.',
    about: [
      'Een platte vorm staat op een lijn. Om de rand heen ligt een touwtje. Sleep aan het uiteinde: het touwtje glijdt van de vorm af en gaat recht op de lijn liggen, precies zo lang als het was toen het krom lag. De lijn is niet verdeeld in een afgesproken maat, maar in de breedte van de vorm zelf, aangegeven door de twee streepjes eronder.',
      'Van een kromme lengte een rechte maken is de enige stap in het vroege meten waarvan geen stilstaand plaatje bestaat. Met echt touw lukt het één keer, en juist daarom gebeurt het bijna nooit twee keer: het touw raakt in de knoop, de les is voorbij, het moment komt niet terug. Er is geen onderzoek naar het effect van dit gereedschap en dat claimen we ook niet; wat het biedt is dat moment, herhaalbaar.',
      'En dan het getal. Het touwtje van een cirkel komt net voorbij het derde streepje. Maak de cirkel groter: alles groeit mee — de rand, het touwtje, de streepjes — en het uiteinde blijft tussen dezelfde twee streepjes liggen. Drie en een beetje, bij elke cirkel die er is. En een vorm die duidelijk geen cirkel is, met drie ronde zijden, geeft precies datzelfde drie en een beetje.',
      'Voordat er iets beweegt, zet de klas een vlaggetje op de plek waar het touwtje volgens hen komt. Het vlaggetje bevriest zodra het touwtje gaat bewegen, en wordt nooit nagekeken of beoordeeld: het blijft staan waar het gezet is, naast de plek waar het touwtje terechtkwam. Niets op het scherm zegt wat langer is. Je hoeft niet te kunnen lezen om ermee te werken: een vorm, een touwtje en een rij cijfers. Vijf vormen en het hele ding zijn gratis; de andere zeven en het blad om af te drukken horen bij het Leerkracht-pakket.'
    ],
    howToUse: [
      'Zet een vorm neer en vraag hoe ver het helemaal rondom is, voordat er iets beweegt.',
      'Laat een kind het vlaggetje zetten waar het denkt dat het touwtje komt, en laat het staan.',
      'Sleep het uiteinde langzaam, zodat de klas ziet hoe het touwtje de bocht verlaat en op de lijn aankomt.',
      '⭐ Maak de vorm nu veel groter en laat het touwtje opnieuw gaan liggen: het getal verandert niet. Daar is het hele gereedschap voor.',
      'Zet daarna de vorm met de drie ronde zijden naast de cirkel en laat uitleggen waarom ze hetzelfde geven.',
      'Vergelijk het touwtje met het kortere balkje eronder, dat is de hoogte van de vorm, en zeg niets over wat langer is.'
    ],
    classroomIdeas: [
      'Eerst schatten: elk kind schrijft op hoeveel breedtes het verwacht, voordat het touwtje beweegt.',
      'Twee vormen, één vraag — de maan is lager dan het ei en heeft meer touw nodig. Hoe kan dat?',
      'Geef een doel: stel de vorm zo in dat het touwtje precies op het vierde streepje eindigt.',
      'Meet dezelfde cirkel in drie maten en schrijf de drie getallen onder elkaar op het bord.',
      'Doe het daarna op papier met echt touw om een deksel en vergelijk.',
      'Vraag welke vorm het meeste touw nodig heeft voor zijn breedte en controleer het — de bloem lijkt net zo rond als de cirkel.'
    ],
    metaTitle: 'Helemaal rondom – meten rondom een vorm, groep 3/4',
    metaDescription: 'Een touwtje ligt rondom een vorm en gaat recht op een lijn liggen die verdeeld is in breedtes van de vorm. Gratis op het digibord, groep 3/4.'
  },

  sv: {
    slug: 'mata-runt-en-figur-lagstadiet',
    name: 'Snöret runt',
    tagline: 'Ett snöre ligger hela vägen runt en figur och lägger sig sedan rakt på ett spår som är indelat i figurens egen bredd — för en cirkel blir det alltid tre och lite till.',
    about: [
      'En platt figur står på en linje. Runt kanten ligger ett snöre. Dra i snörets ände: det gläpper av figuren och lägger sig rakt på spåret, precis lika långt som det var när det låg krokigt. Spåret är inte indelat i något bestämt mått, utan i figurens egen bredd, som de två små strecken under den visar.',
      'Att göra en krokig längd rak är det enda steget i tidig mätning som inte går att visa på en stillbild. Med ett riktigt snöre gör man det en gång, och det är just därför det nästan aldrig görs två gånger: snöret trasslar, lektionen tar slut, ögonblicket kommer inte igen. Det finns ingen effektstudie bakom den här rutinen och vi påstår ingen; verktyget gör ögonblicket upprepbart.',
      'Och så talet. En cirkels snöre når en bit förbi det tredje strecket. Gör cirkeln större: allt växer med — kanten, snöret, strecken — och snörets ände blir kvar mellan samma två streck. Tre och lite till, för varje cirkel som finns. Och en figur som tydligt inte är en cirkel, med tre bågformade sidor, ger exakt samma tre och lite till.',
      'Innan något rör sig sätter klassen en flagga där de tror att snöret når. Flaggan fryser så fort snöret börjar röra sig, och den rättas aldrig och poängsätts aldrig: den står kvar där den sattes, bredvid där snöret hamnade. Ingenting på skärmen säger vad som är längst. Man behöver inte kunna läsa: en figur, ett snöre och en rad siffror. Fem figurer och hela stationen är gratis; de andra sju och bladet att skriva ut ingår i Lärarpaketet.'
    ],
    howToUse: [
      'Sätt upp en figur och fråga hur långt det är hela vägen runt, innan något rör sig.',
      'Låt ett barn dra flaggan dit det tror att snöret når, och låt den stå kvar.',
      'Dra i snörets ände långsamt, så att klassen ser det lämna bågen och komma fram på spåret.',
      '⭐ Gör nu figuren mycket större och låt snöret lägga sig igen: talet ändras inte. Det är därför verktyget finns.',
      'Sätt sedan figuren med de tre bågformade sidorna bredvid cirkeln och låt klassen förklara varför de blir lika.',
      'Jämför snöret med den kortare stapeln under, som är figurens höjd, och säg ingenting om vilket som är längst.'
    ],
    classroomIdeas: [
      'Gissa först: varje barn skriver hur många bredder de tror, innan snöret rör sig.',
      'Två figurer, en fråga — månen är lägre än ägget och tar mer snöre. Hur kommer det sig?',
      'Ge ett mål: ställ in figuren så att snöret slutar precis på fjärde strecket.',
      'Mät samma cirkel i tre storlekar och skriv de tre talen under varandra på tavlan.',
      'Gör det sedan på papper med riktigt snöre runt ett lock och jämför.',
      'Fråga vilken figur som tar mest snöre i förhållande till sin bredd, och kontrollera — blomman ser lika rund ut som cirkeln.'
    ],
    metaTitle: 'Snöret runt – mäta runt en figur, åk 1–2',
    metaDescription: 'Ett snöre ligger runt en figur och lägger sig rakt på ett spår indelat i figurens egen bredd. Gratis att använda i klassrummet, åk 1–2.'
  },

  da: {
    slug: 'maale-hele-vejen-rundt-om-en-figur',
    name: 'Tråden om figuren',
    tagline: 'En tråd ligger hele vejen rundt om en figur og lægger sig derefter lige ned på en bane, der er inddelt i figurens egen bredde — for en cirkel bliver det altid tre og lidt til.',
    about: [
      'En flad figur står på en linje. Rundt om kanten ligger en tråd. Træk i trådens ende: den glider af figuren og lægger sig lige ned på banen, nøjagtig lige så lang som da den lå krum. Banen er ikke inddelt i noget aftalt mål, men i figurens egen bredde, som de to små streger under den viser.',
      'At lave en krum længde om til en lige er det eneste skridt i tidlig måling, der ikke findes et stillbillede af. Med en rigtig tråd gør man det én gang, og netop derfor bliver det næsten aldrig gjort to gange: tråden filtrer, timen slutter, øjeblikket kommer ikke igen. Der findes ingen effektundersøgelse bag denne rutine, og vi påstår ingen; værktøjet gør øjeblikket gentageligt.',
      'Og så tallet. En cirkels tråd når et lille stykke forbi den tredje streg. Gør cirklen større: alt vokser med — kanten, tråden, stregerne — og trådens ende bliver liggende mellem de samme to streger. Tre og lidt til, for hver eneste cirkel der findes. Og en figur, der tydeligvis ikke er en cirkel, med tre buede sider, giver præcis de samme tre og lidt til.',
      'Før noget bevæger sig, sætter klassen et flag der, hvor de tror tråden når til. Flaget fryser, så snart tråden begynder at bevæge sig, og det bliver aldrig rettet eller bedømt: det bliver stående, hvor det blev sat, ved siden af der hvor tråden landede. Intet på skærmen siger, hvad der er længst. Man behøver ikke kunne læse for at bruge det: en figur, en tråd og en række tal. Fem figurer og hele opstillingen er gratis; de andre syv og arket til at printe følger med Lærerabonnementet.'
    ],
    howToUse: [
      'Sæt en figur op og spørg, hvor langt der er hele vejen rundt, før noget bevæger sig.',
      'Lad et barn trække flaget hen, hvor det tror tråden når til, og lad det blive stående.',
      'Træk langsomt i trådens ende, så klassen ser den forlade buen og nå frem på banen.',
      '⭐ Gør nu figuren meget større og lad tråden lægge sig igen: tallet ændrer sig ikke. Det er derfor værktøjet findes.',
      'Sæt derefter figuren med de tre buede sider ved siden af cirklen, og lad klassen forklare, hvorfor de bliver ens.',
      'Sammenlign tråden med den kortere bjælke nedenunder, som er figurens højde, og sig ingenting om hvad der er længst.'
    ],
    classroomIdeas: [
      'Gæt først: hvert barn skriver, hvor mange bredder de tror, før tråden bevæger sig.',
      'To figurer, ét spørgsmål — månen er lavere end ægget og bruger mere tråd. Hvordan kan det være?',
      'Giv et mål: indstil figuren, så tråden stopper præcis ved fjerde streg.',
      'Mål den samme cirkel i tre størrelser og skriv de tre tal under hinanden på tavlen.',
      'Gør det bagefter på papir med rigtig tråd om et låg og sammenlign.',
      'Spørg, hvilken figur der bruger mest tråd i forhold til sin bredde, og tjek det — blomsten ser lige så rund ud som cirklen.'
    ],
    metaTitle: 'Tråden om figuren – mål hele vejen rundt, 1.–2. kl.',
    metaDescription: 'En tråd ligger rundt om en figur og lægger sig lige ned på en bane inddelt i figurens egen bredde. Gratis værktøj til 1.–2. klasse.'
  },

  no: {
    slug: 'maale-hele-veien-rundt-en-figur',
    name: 'Hyssingsporet',
    tagline: 'En hyssing ligger hele veien rundt en figur og legger seg deretter rett ut på et spor som er delt inn i figurens egen bredde — for en sirkel blir det alltid tre og litt til.',
    about: [
      'En flat figur står på en linje. Rundt kanten ligger en hyssing. Dra i enden av hyssingen: den glir av figuren og legger seg rett ut på sporet, nøyaktig like lang som da den lå krum. Sporet er ikke delt inn i noe avtalt mål, men i figurens egen bredde, som de to små strekene under den viser.',
      'Å gjøre en krum lengde rett er det eneste steget i tidlig måling som det ikke finnes et stillbilde av. Med ekte hyssing gjør man det én gang, og nettopp derfor blir det nesten aldri gjort to ganger: hyssingen floker seg, timen er slutt, øyeblikket kommer ikke igjen. Det finnes ingen effektstudie bak denne rutinen, og vi hevder ingen; verktøyet gjør øyeblikket gjentakbart.',
      'Og så tallet. Hyssingen til en sirkel når et lite stykke forbi den tredje streken. Gjør sirkelen større: alt vokser med — kanten, hyssingen, strekene — og enden av hyssingen blir liggende mellom de samme to strekene. Tre og litt til, for hver eneste sirkel som finnes. Og en figur som tydelig ikke er en sirkel, med tre buede sider, gir nøyaktig de samme tre og litt til.',
      'Før noe beveger seg, setter klassen et flagg der de tror hyssingen når. Flagget fryser så snart hyssingen begynner å bevege seg, og det blir aldri rettet eller vurdert: det blir stående der det ble satt, ved siden av der hyssingen havnet. Ingenting på skjermen sier hva som er lengst. Man trenger ikke kunne lese for å bruke det: en figur, en hyssing og en rad med tall. Fem figurer og hele oppstillingen er gratis; de andre sju og arket til utskrift følger med Lærerabonnementet.'
    ],
    howToUse: [
      'Sett opp en figur og spør hvor langt det er hele veien rundt, før noe beveger seg.',
      'La et barn dra flagget dit det tror hyssingen når, og la det bli stående.',
      'Dra sakte i enden av hyssingen, så klassen ser den forlate buen og komme fram på sporet.',
      '⭐ Gjør nå figuren mye større og la hyssingen legge seg igjen: tallet endrer seg ikke. Det er derfor verktøyet finnes.',
      'Sett deretter figuren med de tre buede sidene ved siden av sirkelen, og la klassen forklare hvorfor de blir like.',
      'Sammenlign hyssingen med den kortere stolpen under, som er høyden til figuren, og si ingenting om hva som er lengst.'
    ],
    classroomIdeas: [
      'Gjett først: hvert barn skriver hvor mange bredder de tror, før hyssingen beveger seg.',
      'To figurer, ett spørsmål — månen er lavere enn egget og bruker mer hyssing. Hvordan kan det ha seg?',
      'Gi et mål: still inn figuren slik at hyssingen stopper akkurat på fjerde strek.',
      'Mål den samme sirkelen i tre størrelser og skriv de tre tallene under hverandre på tavla.',
      'Gjør det etterpå på papir med ekte hyssing rundt et lokk og sammenlign.',
      'Spør hvilken figur som bruker mest hyssing i forhold til bredden sin, og sjekk — blomsten ser like rund ut som sirkelen.'
    ],
    metaTitle: 'Hyssingsporet – mål hele veien rundt, 1.–2. trinn',
    metaDescription: 'En hyssing ligger rundt en figur og legger seg rett ut på et spor delt inn i figurens egen bredde. Gratis verktøy for 1.–2. trinn.'
  },

  fi: {
    slug: 'mittaa-kuvion-ympari-alkuopetus',
    name: 'Ympäri ja suoraksi',
    tagline: 'Lanka kulkee kuvion ympäri ja asettuu sitten suoraksi kaistalle, joka on jaettu kuvion omiin leveyksiin — ympyrällä tulee aina kolme ja vähän päälle.',
    about: [
      'Litteä kuvio seisoo viivalla. Sen reunan ympäri kulkee lanka. Vedä langan päästä: se liukuu kuviolta pois ja asettuu suoraksi kaistalle, täsmälleen yhtä pitkänä kuin se oli kaarella. Kaistaa ei ole jaettu mihinkään sovittuun mittaan, vaan kuvion omaan leveyteen, jonka kaksi pientä viivaa sen alla näyttävät.',
      'Kaarevan pituuden muuttaminen suoraksi on ainoa alkuopetuksen mittaamisen vaihe, josta ei ole olemassa pysähtynyttä kuvaa. Oikealla langalla sen tekee kerran, ja juuri siksi sitä ei melkein koskaan tehdä kahdesti: lanka menee solmuun, tunti loppuu, hetki ei tule uudelleen. Tästä rutiinista ei ole vaikuttavuustutkimusta emmekä sellaista väitä; työkalu tekee hetkestä toistettavan.',
      'Ja sitten luku. Ympyrän lanka yltää vähän kolmannen viivan yli. Suurenna ympyrää: kaikki kasvaa mukana — reuna, lanka, viivat — ja langan pää jää samojen kahden viivan väliin. Kolme ja vähän päälle, jokaisella ympyrällä mitä on olemassa. Ja kuvio joka ei selvästikään ole ympyrä, jolla on kolme kaarevaa sivua, antaa täsmälleen saman kolme ja vähän päälle.',
      'Ennen kuin mikään liikkuu, luokka asettaa lipun siihen kohtaan, johon se arvelee langan yltävän. Lippu lukittuu heti kun lanka lähtee liikkeelle, eikä sitä koskaan korjata eikä pisteytetä: se jää siihen mihin se asetettiin, sen viereen mihin lanka päätyi. Mikään ruudulla ei sano kumpi on pidempi. Käyttöön ei tarvitse osata lukea: kuvio, lanka ja rivi numeroita. Viisi kuviota ja koko laitteisto ovat ilmaisia; loput seitsemän ja tulostettava arkki kuuluvat Opettaja-tilaukseen.'
    ],
    howToUse: [
      'Nosta kuvio esiin ja kysy, kuinka pitkä matka on kuvion ympäri, ennen kuin mikään liikkuu.',
      'Anna lapsen vetää lippu siihen kohtaan, johon hän arvelee langan yltävän, ja jätä se siihen.',
      'Vedä langan päästä hitaasti, jotta luokka näkee sen lähtevän kaarelta ja saapuvan kaistalle.',
      '⭐ Suurenna nyt kuviota paljon ja anna langan asettua uudelleen: luku ei muutu. Tätä varten koko työkalu on olemassa.',
      'Aseta sitten kolmikaarinen kuvio ympyrän viereen ja anna luokan selittää, miksi ne antavat saman.',
      'Vertaa lankaa sen alla olevaan lyhyempään palkkiin, joka on kuvion korkeus, äläkä sano mitään siitä kumpi on pidempi.'
    ],
    classroomIdeas: [
      'Arvatkaa ensin: jokainen kirjoittaa, montako leveyttä odottaa, ennen kuin lanka liikkuu.',
      'Kaksi kuviota, yksi kysymys — kuu on matalampi kuin muna ja vie enemmän lankaa. Miten niin?',
      'Antakaa tavoite: säädä kuvio niin, että lanka päättyy täsmälleen neljänteen viivaan.',
      'Mitatkaa sama ympyrä kolmessa koossa ja kirjoittakaa kolme lukua allekkain taululle.',
      'Tehkää se sen jälkeen paperilla oikealla langalla kannen ympäri ja vertailkaa.',
      'Kysykää, mikä kuvio vie eniten lankaa leveyteensä nähden, ja tarkistakaa — kukka näyttää yhtä pyöreältä kuin ympyrä.'
    ],
    metaTitle: 'Ympäri ja suoraksi – mittaa kuvion ympäri, 1.–2. lk',
    metaDescription: 'Lanka kulkee kuvion ympäri ja asettuu suoraksi kaistalle, joka on jaettu kuvion omiin leveyksiin. Ilmainen työkalu 1.–2. luokan älytaululle.'
  }
};
