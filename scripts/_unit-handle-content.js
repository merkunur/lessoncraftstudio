/* =====================================================================
   _unit-handle-content.js — the public landing page for TOOL #40
   ---------------------------------------------------------------------
   Data only. `register-unit-handle.js` reads this and writes the eleven
   `frontend/messages/tool-content/<loc>.json` entries plus the hub card.

   EN is authored. The other ten come from the SAME three-person native
   panels that rebuilt the in-tool strings (see _unit-handle-strings.js),
   so the landing page and the tool speak with one voice per locale — the
   same word for the tape, the same name for the tool, the same word for
   the bench.

   ⚠ EVERY PANEL WAS TOLD, EXPLICITLY, NOT TO CLAIM A MEASURED EFFECT.
   There is no efficacy study for this routine and §23 says so: these are
   research-based, not evidence-based. Every one of the ten wrote that
   caveat into paragraph 2 in its own words, which is where it belongs —
   in front of the teacher, not in a footnote.

   ⚠ AND THE NO-NAMED-UNIT REFUSAL APPLIES HERE TOO. A landing page is
   exactly where "measure in centimetres" would slip in as a helpful
   clarification; it would turn the tool into a ruler. The gate checks it
   on the rendered page, per locale.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    slug: 'measure-with-a-changing-unit-length-k2',
    name: 'The Unit Handle',
    tagline: 'Two tapes measure one object. Stretch the unit on one of them and its number climbs — while the object, and the other tape, have not moved at all.',
    about: [
      'An object lies across the top of the bench: a crayon, a fork, a stick of celery, a ladder. Beneath it run two tapes, each built of identical tiles laid end to end from the object\'s left edge, each with a number at its far end. On the first tile of each tape there is a grip. Drag it and that tile — the unit — grows or shrinks under your finger, the whole tape re-lays itself, and the number climbs or falls with it. The other tape does not move.',
      'Measuring the same thing twice with two different-sized units, and saying how the two measurements relate to the size of the unit, is a standard K-2 expectation and a genuinely hard one. The number a child reads is not a property of the object; it belongs to the object and the unit together, and the unit is the part that stays invisible. There is no efficacy study for this routine and none is claimed — what the tool offers is a way to make the unit the visible, movable thing.',
      'Then comes the moment the whole tool exists for: the unit shrinks and the number gets bigger, while the object lies exactly where it was. Plenty of children conclude first that the object must have grown, because the number did. With both tapes on screen at once — one held still, one stretching in front of the class — the question asks itself: what actually changed? A cupboard full of fixed unit sets can never stage this, because no unit set stretches.',
      'There is nothing to read: an object, some tiles and two numerals, so children who are not yet reading take part on the same terms. It runs in the browser on a whiteboard or projector with no login and nothing to install. When a unit does not fit a whole number of times, the leftover is drawn dashed and is not counted. Neither measurement is ever marked right or wrong, and the tool never says which unit is better. The whole object shelf and printing are part of the Teacher plan.'
    ],
    howToUse: [
      'Put an object on the bench and let the class look at it before anything is measured.',
      'Start with both tapes on the same unit so everyone sees the two numbers agree.',
      'Drag one grip until that unit is clearly smaller, and stop the moment the number changes.',
      'Ask the only question that matters: what happened to the number — and what happened to the object?',
      'Use "Make it come out even" when a leftover appears and the class wants a whole count.',
      'Load another object and run the same round again, letting a child drag this time.'
    ],
    classroomIdeas: [
      'Predict first: before you drag, every child writes down whether the number will go up or down.',
      'Two children, two tapes — each picks a unit, each reads a number, and the class explains the difference.',
      'Work backwards: name a target number and let a child stretch the unit until the tape shows exactly that.',
      'Deliberately choose a unit that does not fit, and talk about the dashed piece that is not counted.',
      'Record every measurement on the board as a pair — the number and the size of the tile beside it. A number alone is incomplete.',
      'Only once the class can explain it, put a real ruler beside the bench and ask why everyone agreed on one unit.'
    ],
    metaTitle: 'The Unit Handle — measure with a changing unit, K-2',
    metaDescription: 'Two tapes, one object: stretch the unit and the number changes while the object stays put. A free whiteboard tool for measuring with different units in K-2.'
  },

  de: {
    slug: 'messen-mit-einheiten-groessen-grundschule',
    name: 'Die dehnbare Einheit',
    tagline: 'Zwei Streifen messen denselben Gegenstand. Die Klasse zieht die Einheit des einen Streifens kleiner – und sieht, wie seine Zahl steigt, obwohl sich der Gegenstand kein Stück bewegt hat.',
    about: [
      'Oben auf dem Messtisch liegt ein einzelner Gegenstand – ein Wachsmalstift, eine Gabel, ein Stück Staudensellerie. Darunter liegen zwei Streifen. Jeder ist aus lauter gleichen Plättchen aneinandergelegt, genau ab der linken Kante des Gegenstands, und am Ende steht eine Zahl. Am ersten Plättchen sitzt ein Griff: Ziehen Sie daran, wächst oder schrumpft die Einheit, der ganze Streifen legt sich unter Ihrem Finger neu, und die Zahl klettert oder fällt mit.',
      'Das ist Lehrplangebiet „Größen und Messen“ in Klasse 1 und 2: zuerst mit selbstgewählten, später mit standardisierten Einheiten messen. Der Schritt dazwischen ist der schwierige: Eine Messzahl gehört immer zu einer Einheit und sagt ohne sie nichts aus. Mit einem Schrank voller fester Materialien lässt sich das kaum vorführen – niemand besitzt ein Material, dessen Einheit vor den Augen der Klasse größer wird.',
      'Dann kommt der Moment, an dem es kippt: Die Einheit wird kleiner – und die Zahl wird größer. Der Gegenstand hat sich kein Stück bewegt, er liegt unverändert auf dem Messtisch, und der zweite Streifen daneben zeigt weiter seine eigene Zahl. Genau hier fragen Kinder zurück: „Der ist doch gleich lang geblieben?“ Zwei verschiedene Zahlen für denselben Gegenstand nebeneinander stehen lassen und darüber sprechen – das ist der eigentliche Kern dieser Stunde.',
      'Es gibt nichts zu lesen und nichts anzumelden: Die Seite läuft im Browser am Whiteboard oder über den Beamer, und der Griff folgt Finger, Maus oder Stift. Geht eine Einheit nicht ohne Rest auf, wird das letzte Stück gestrichelt gezeichnet und nicht mitgezählt. Keine Punkte, keine Zeit: Keine der beiden Messungen wird bewertet, und keine Einheit wird als die bessere dargestellt. Sie entscheiden, wie lange das Gespräch dauert.'
    ],
    howToUse: [
      'Legen Sie einen Gegenstand auf den Messtisch und lassen Sie die Klasse zuerst nur schätzen, wie viele Plättchen darunterpassen.',
      'Messen Sie mit beiden Streifen, solange sie dieselbe Einheit haben, und lassen Sie beide Zahlen vorlesen.',
      'Ziehen Sie am Griff des ersten Streifens, bis seine Einheit deutlich kleiner ist, und halten Sie dann kurz inne.',
      'Fragen Sie: Was ist mit der Zahl passiert – und was ist mit dem Gegenstand passiert?',
      'Mit „Ohne Rest messen“ suchen Sie eine Einheit, die glatt aufgeht; mit „Gleiche Einheit“ stellen Sie beide Streifen wieder gleich.',
      'Holen Sie mit „Anderer Gegenstand“ ein neues Objekt und lassen Sie diesmal ein Kind den Griff ziehen.'
    ],
    classroomIdeas: [
      'Vorhersage-Runde: Bevor Sie die Einheit halbieren, schreibt jedes Kind die neue Zahl auf – erst danach ziehen Sie am Griff.',
      'Zwei Kinder an die Streifen: Jedes wählt seine eigene Einheit, beide nennen ihre Zahl, die Klasse erklärt den Unterschied.',
      'Rückwärts arbeiten: Sie nennen eine Zielzahl, ein Kind zieht so lange, bis der Streifen genau diese Zahl zeigt.',
      'Rest-Gespräch: Suchen Sie bewusst eine Einheit, die nicht aufgeht, und sprechen Sie über das gestrichelte letzte Stück.',
      'Protokoll an der Tafel: Notieren Sie zu jeder Messung die Zahl und daneben die Größe des Plättchens – eine Zahl allein bleibt unvollständig.',
      'Übergang: Erst wenn die Klasse das erklären kann, legen Sie ein Messwerkzeug aus dem Schrank daneben und fragen, warum sich alle auf dieselbe Einheit geeinigt haben.'
    ],
    metaTitle: 'Die dehnbare Einheit – Messen mit Einheiten, Klasse 1-2',
    metaDescription: 'Zwei Streifen, ein Gegenstand: Ziehen Sie die Einheit kleiner – die Zahl steigt. Messen mit selbstgewählten Einheiten in Klasse 1 und 2, am Whiteboard.'
  },

  fr: {
    slug: 'mesurer-avec-un-etalon-longueurs-cp',
    name: "L'étalon élastique",
    tagline: "Deux bandes mesurent le même objet posé sur le plateau ; on étire l'étalon de l'une, son nombre grimpe, et la classe voit que l'objet, lui, n'a pas bougé.",
    about: [
      "Sur le plateau, un objet est posé en haut de l'écran : un crayon, une fourchette, une branche de céleri, une échelle. En dessous, deux bandes partent du bord gauche de l'objet, chacune faite de cases identiques posées bout à bout. Sur la première case de chaque bande, une poignée. On la fait glisser : la case grandit ou rétrécit, toute la bande se recompose sous le doigt, et le nombre affiché au bout monte ou descend.",
      "On est en plein dans « Grandeurs et mesures » du cycle 2 : mesurer des longueurs en reportant un étalon, avant que la règle graduée n'entre en scène. C'est un passage difficile, et pour une raison précise : l'élève doit tenir ensemble deux idées, la longueur de l'objet, qui ne change pas, et le nombre obtenu, qui dépend entièrement de l'étalon choisi. Aucune étude ne mesure l'effet de cet outil ; il donne simplement à voir ce que le matériel de classe montre mal.",
      "Le moment que l'outil rend visible est celui-ci : l'étalon rétrécit, le nombre grimpe, et l'objet n'a pas bougé. Beaucoup d'élèves en concluent d'abord que l'objet est devenu plus long. Avec deux bandes côte à côte sur le même objet, l'une immobile et l'autre qui s'étire sous les yeux de la classe, la question se pose d'elle-même : pourquoi les deux nombres ne sont-ils pas les mêmes ? Une armoire de réglettes ne produira jamais cette scène, car aucune règle ne s'étire.",
      "Rien à lire pour les élèves, aucun compte à créer : la page s'ouvre et l'objet est déjà là. L'affichage tient au TBI comme au vidéoprojecteur et se manipule au doigt comme à la souris. Quand l'étalon ne tient pas un nombre entier de fois, le morceau qui dépasse est dessiné en pointillés et n'est pas compté. Aucune des deux mesures n'est jamais donnée pour juste ou pour fausse. La collection complète d'objets et l'impression du plateau font partie de l'offre Enseignant."
    ],
    howToUse: [
      "Projetez le plateau et faites mesurer l'objet avec la bande du haut, telle qu'elle se présente.",
      "Faites glisser la poignée de l'autre bande pour rendre son étalon nettement plus petit, sans rien annoncer.",
      "Laissez la classe réagir, puis posez la seule question qui compte : l'objet a-t-il changé ?",
      "Utilisez « Le même étalon » pour remettre les deux bandes à égalité et repartir autrement.",
      "Appuyez sur « Faire tomber juste » lorsqu'un morceau dépasse et que la classe veut un compte entier.",
      "Changez d'objet et refaites le tour : le raisonnement doit tenir sur un crayon comme sur une échelle."
    ],
    classroomIdeas: [
      "Avant de toucher à quoi que ce soit, faites parier la classe : si l'étalon devient deux fois plus petit, que devient le nombre ?",
      "Faites dire la mesure à voix haute par un élève : « l'objet fait tant de fois cet étalon-là », et exigez que le mot revienne à chaque fois.",
      "Masquez l'un des deux nombres, montrez les deux bandes, et demandez laquelle a le plus petit étalon.",
      "Réglez les deux bandes sur le même étalon et faites constater que les deux nombres redeviennent identiques.",
      "Partez du morceau qui dépasse : que faudrait-il changer à l'étalon pour que ça tombe juste ?",
      "Terminez par une trace écrite en dictée à l'adulte : plus l'étalon est petit, plus le nombre est grand."
    ],
    metaTitle: "L'étalon élastique — mesurer une longueur en cycle 2",
    metaDescription: "Deux bandes, un seul objet : étirez l'étalon et le nombre change alors que l'objet ne bouge pas. Mesurer des longueurs avec un étalon, cycle 2, au TBI."
  },

  es: {
    slug: 'medir-longitud-unidades-no-convencionales-primaria',
    name: 'Estira la unidad',
    tagline: 'La clase mide el mismo objeto con dos tiras a la vez, estira la unidad de una de ellas y ve cómo su número sube o baja mientras el objeto no se mueve.',
    about: [
      'En la pantalla hay una mesa de medir y, encima, un objeto real fotografiado: un lápiz de color, un tenedor, una rama de apio, una escalera. Debajo del objeto se extienden dos tiras, cada una formada por piezas iguales colocadas una tras otra desde el borde izquierdo. La primera pieza de cada tira tiene un tirador: al arrastrarlo, esa pieza crece o se encoge, toda la tira se vuelve a colocar sola y el número del final sube o baja. La otra tira no se mueve.',
      'Es el territorio de la medida de longitudes con unidades no convencionales, en 1.º y 2.º: medir un mismo objeto con unidades de distinto tamaño y describir cómo se relacionan las dos medidas con el tamaño de la unidad. Cuesta porque el número deja de ser una propiedad del objeto y pasa a depender de con qué se mide. Un armario lleno de juegos de unidades fijas no lo enseña: no existe una regla cuya unidad se pueda estirar delante de la clase.',
      'Ese es el momento: la unidad se hace más pequeña y el número sube. El objeto sigue exactamente donde estaba, nadie lo ha tocado, y sin embargo ahora hacen falta más piezas para recorrerlo. Muchos niños dicen primero que el objeto se ha hecho más largo, porque el número es mayor. Verlo ocurrir en directo, con las dos tiras a la vista al mismo tiempo, es lo que abre la conversación: ¿qué ha cambiado de verdad, el objeto o la unidad?',
      'No hay nada que leer en la pantalla ni texto que traducir: solo el objeto, las tiras y los números. Se abre en el navegador, sin registro y sin instalar nada, y funciona en la pizarra digital, en el ordenador del aula o en una tableta. La herramienta no marca ninguna de las dos medidas como correcta ni incorrecta: las dos son verdad, cada una con su unidad. El estante completo de objetos y la impresión forman parte del plan Docente.'
    ],
    howToUse: [
      'Proyecta la mesa de medir y pregunta a la clase cuántas piezas creen que harán falta para recorrer el objeto.',
      'Empieza con las dos tiras iguales, usando «Igualar las unidades», para que todos vean que dan el mismo número.',
      'Arrastra el tirador de la primera tira y detente en cuanto el número cambie.',
      'Pregunta «¿ha cambiado el objeto?» y deja que lo discutan entre ellos antes de decir nada.',
      'Pulsa «Que salga exacto» cuando sobre un trozo y quieras una medida sin resto.',
      'Cambia de objeto con «Otro objeto» y repite la misma rutina con una forma distinta.'
    ],
    classroomIdeas: [
      'Antes de arrastrar, que cada mesa apunte si el número subirá o bajará al hacer la unidad más pequeña.',
      'Saca a dos alumnos al frente: uno mueve la unidad y el otro lee el número en voz alta mientras el resto anota la pareja.',
      'Deja una tira quieta como testigo durante toda la sesión y estira solo la otra.',
      'Pide que busquen, arrastrando, una unidad con la que el objeto dé un número redondo.',
      'Cuando sobre un trozo, pregunta qué dirían ellos: ¿«cinco y un poco más» o buscar otra unidad?',
      'Cierra siempre con la misma frase a coro: unidad más pequeña, número más grande.'
    ],
    metaTitle: 'Estira la unidad: medir con unidades no convencionales',
    metaDescription: 'Mide el mismo objeto con dos tiras: estira la unidad de una y su número cambia mientras el objeto no se mueve. Para 1.º y 2.º, en la pizarra digital.'
  },

  pt: {
    slug: 'medida-de-comprimento-unidades-nao-padronizadas',
    name: 'A Unidade que Estica',
    tagline: 'Duas fitas medem o mesmo objeto na bancada; a turma estica a unidade de uma delas e vê o número na ponta subir e descer enquanto o objeto continua parado no lugar.',
    about: [
      'Na tela, um objeto real — um giz de cera, um garfo, um talo de aipo, uma escada — está deitado sobre a bancada. Abaixo dele, duas fitas partem da borda esquerda do objeto, cada uma formada por peças iguais enfileiradas. A primeira peça de cada fita tem um puxador: arraste e a peça cresce ou encolhe, a fita inteira se refaz sob o dedo e o número na ponta acompanha. O objeto nunca sai do lugar.',
      'O território é Grandezas e medidas, no 1.º e no 2.º ano: medir comprimentos com unidades de medida não padronizadas e comparar os resultados. É uma das partes mais escorregadias do currículo, porque a criança precisa segurar duas ideias ao mesmo tempo — o tamanho do objeto e o tamanho da unidade — e a segunda costuma ficar invisível. Não existe estudo de eficácia por trás desta ferramenta; ela apenas torna o tamanho da unidade visível e mutável.',
      'O momento é este: a turma mede, a fita mostra um número, e então alguém puxa a peça e a deixa menor. O número sobe. Ninguém encostou no objeto. A fita de baixo, com a unidade maior, continua parada com o número dela. É aqui que a conversa começa de verdade — quanto menor a unidade, mais vezes ela cabe — e é exatamente a parte que a maioria das crianças não enxerga sozinha com um conjunto de peças de tamanho fixo.',
      'Não há nada para ler antes, não há cadastro e não há nada para instalar: abra na lousa digital ou no projetor e comece. Nenhuma das duas medidas é marcada como certa ou errada, e a ferramenta nunca diz qual unidade é melhor. Quando a unidade não cabe um número exato de vezes, o pedaço que sobra aparece tracejado e não entra na conta. A prateleira completa de objetos e a impressão fazem parte do plano Professor.'
    ],
    howToUse: [
      'Projete a bancada e pergunte à turma quantas peças daquela fita cabem no objeto.',
      'Arraste o puxador da primeira peça da fita de cima até a turma concordar que a medição está pronta, e leia o número em voz alta.',
      'Deixe a fita de baixo parada e encolha a unidade da de cima na frente de todos, sem tocar no objeto.',
      'Pergunte o que aconteceu com o número e por quê, e segure a resposta até várias crianças terem falado.',
      'Se sobrar um pedaço tracejado no fim, toque em "Caber sem sobra" para a unidade passar a caber um número exato de vezes.',
      'Use "Igualar as unidades" e depois "Outro objeto" para refazer a rotina com outro objeto da bancada.'
    ],
    classroomIdeas: [
      'Antes de arrastar qualquer coisa, peça um palpite — se a peça ficar bem pequenininha, o número vai subir ou descer? — e anote os palpites na lousa.',
      'Divida a turma em dois times, cada um responsável por uma fita, e peça que cada time explique o número que a sua fita mostra.',
      'Peça que uma criança arraste até o número da fita dar exatamente 4, e depois que conte à turma o que fez com a peça para chegar lá.',
      'Registre no caderno o mesmo objeto medido com três unidades diferentes e peça uma frase sobre o que mudou e o que não mudou.',
      'Feche a rotina pedindo que cada criança complete em voz alta "quanto menor a peça, ..." e ouça as formulações diferentes que aparecem.',
      'Com o plano Professor, imprima a bancada e deixe as crianças desenharem as peças à mão antes de conferir na tela.'
    ],
    metaTitle: 'A Unidade que Estica | medir com unidades não padronizadas',
    metaDescription: 'Duas fitas medem o mesmo objeto na tela. Estique a unidade de uma delas e o número muda sem o objeto sair do lugar. Grandezas e medidas, 1.º e 2.º ano.'
  },

  it: {
    slug: 'misurare-lunghezze-unita-arbitrarie',
    name: "L'unità elastica",
    tagline: 'Due strisce misurano lo stesso oggetto sul tavolo: rimpicciolite l\'unità di una striscia e il suo numero sale, mentre l\'oggetto e l\'altra striscia restano fermi dove sono.',
    about: [
      "Sullo schermo c'è un tavolo con un oggetto vero appoggiato di traverso: un pastello, una forchetta, un gambo di sedano, una scala. Sotto l'oggetto corrono due strisce fatte di piastrelle tutte uguali, posate una dopo l'altra a partire dal bordo sinistro, e in fondo a ciascuna striscia c'è un numero. Sulla prima piastrella di ogni striscia c'è una presa: la trascinate e quella piastrella cresce o si rimpicciolisce, l'intera striscia si ridispone sotto il dito e il numero sale o scende. L'altra striscia resta ferma.",
      "Le Indicazioni nazionali chiedono di misurare con unità arbitrarie prima di arrivare alle unità convenzionali, e in prima e in seconda si lavora proprio lì: si sceglie qualcosa, lo si riporta lungo l'oggetto senza buchi e senza sovrapposizioni, si conta. È più difficile di quanto sembri, perché il numero che esce non appartiene all'oggetto: appartiene alla coppia oggetto-unità. Questo strumento mette quella coppia sotto gli occhi della classe; non promette risultati misurati e non sostituisce il materiale vero.",
      "Il momento è questo: due strisce misurano lo stesso identico oggetto e danno due numeri diversi. Rimpicciolite l'unità di una striscia e il suo numero sale, mentre l'oggetto è rimasto immobile sotto gli occhi di tutti. Per un bambino di sei o sette anni «più piccolo» e «di più» stanno da parti opposte, e qui stanno insieme: più piccola è l'unità, più volte ci sta. La frase che si sente in classe è «ma allora l'oggetto si è allungato!»: non è distrazione, è esattamente la difficoltà, e qui si vede.",
      "Sull'apparato non c'è niente da leggere: si apre nel browser, funziona alla LIM e sul tablet, non chiede registrazione e anche un bambino che non legge ancora può condurre tutto il giro. Nessuna delle due misure viene segnata, premiata o corretta: lo strumento non dà verdetti, non mette punteggi, non misura il tempo e non dice quale unità convenga usare — il confronto lo fa la classe. Il piano Insegnante aggiunge lo scaffale completo degli oggetti e la stampa del tavolo."
    ],
    howToUse: [
      'Parti con le due strisce sulla stessa unità e fai leggere i due numeri prima di toccare qualsiasi cosa.',
      'Chiama un bambino alla LIM e digli di trascinare la presa della prima piastrella finché l\'unità non diventa nettamente più piccola.',
      'Ferma tutto lì e chiedi che cosa è cambiato e che cosa no, prima di dire una parola tu.',
      'Se resta un pezzo fuori, fallo notare: quell\'unità non ci sta un numero intero di volte, e con «Togli l\'avanzo» ne trovi una che ci sta.',
      'Con «Stessa unità» rimetti le due strisce sulla stessa unità e rifai tutto il giro con un altro oggetto.',
      'Chiudi chiedendo di spiegare a parole perché lo stesso oggetto può valere due numeri diversi.'
    ],
    classroomIdeas: [
      'Classe prima: tieni lo stesso oggetto per tutta la settimana e cambia solo l\'unità, finché i bambini dicono da soli «tre di questi» e «sei di questi più piccoli».',
      'Classe prima e seconda: prima di trascinare fai prevedere ad alta voce se il numero salirà o scenderà, poi trascina lentissimo e lascia che se ne accorgano loro.',
      'Classe seconda: fai rifare la scena sul quaderno ritagliando una strisciolina di carta e riportandola lungo la matita del compagno, prima con un ritaglio lungo e poi con uno corto.',
      'Fai scrivere alla lavagna le due frasi complete, con l\'unità disegnata accanto al numero: da solo, il numero non dice ancora niente.',
      'Quando la classe è convinta che l\'oggetto sia stato allungato, non rispondere: rimetti le due strisce sulla stessa unità e lascia che i due numeri tornino uguali davanti a tutti.',
      'Routine da cinque minuti: un oggetto nuovo al giorno e sempre la stessa domanda — quante volte ci sta, e che cosa succede se l\'unità diventa più piccola?'
    ],
    metaTitle: "Misurare con unità arbitrarie alla LIM: l'unità elastica",
    metaDescription: 'Due strisce misurano lo stesso oggetto con unità diverse: rimpicciolite l\'unità e il numero sale, mentre l\'oggetto non si muove. Classe prima e seconda.'
  },

  nl: {
    slug: 'meten-met-natuurlijke-maten-groep-3',
    name: 'De Rekbare Maat',
    tagline: 'Eén voorwerp ligt op het blad, eronder twee stroken van blokjes. Je sleept aan één blokje, de maat wordt groter of kleiner, de hele strook legt zich opnieuw en het getal verandert mee.',
    about: [
      'Op het blad ligt een echt voorwerp: een wasknijper, een vork, een stengel bleekselderij. Daaronder liggen twee stroken. Elke strook bestaat uit gelijke blokjes, achter elkaar gelegd vanaf de linkerrand van het voorwerp, met een greep op het eerste blokje. Sleep je die greep, dan wordt dat blokje — de maat — groter of kleiner, legt de hele strook zich opnieuw onder je vinger en verandert het getal aan het eind mee. De andere strook blijft staan; het voorwerp beweegt nooit.',
      'Meten met natuurlijke maten hoort bij het domein meten en meetkunde uit de SLO-kerndoelen: in groep 3 en 4 leggen kinderen eerst zelfgekozen maten achter elkaar, voordat standaardmaten in beeld komen. Dat is lastiger dan het lijkt. Om te kunnen tellen moeten de maten precies even groot zijn, ze moeten zonder gaten of overlap aansluiten, en ze moeten bij de rand van het voorwerp beginnen. Wij claimen geen gemeten leereffect; dit is gereedschap om die stappen samen zichtbaar te maken.',
      'Alles draait om één moment: de maat wordt kleiner en het getal loopt op. Het voorwerp is niet bewogen, de strook is niet langer geworden, en toch staat er ineens een groter getal. Kinderen zeggen dan vaak dat het voorwerp langer is geworden — precies dáár zit het lastige. Het getal hoort niet bij het voorwerp alleen, maar bij het voorwerp én de maat waarmee je meet. Hoe kleiner de maat, hoe meer er passen.',
      'Er valt niets te lezen: de stroken, de blokjes en het getal doen het werk, dus ook kinderen die nog moeizaam lezen doen gewoon mee. Je hebt geen account nodig en er valt niets te installeren; het opent in de browser en is groot genoeg voor het digibord. Geen score, geen klok. Geen van beide metingen wordt ooit als goed of fout gemarkeerd, en het gereedschap zegt niet welke maat de beste is; dat gesprek voer je met de klas. Alle voorwerpen en het afdrukken horen bij het Leerkracht-pakket.'
    ],
    howToUse: [
      'Zet het voorwerp op het digibord en laat de klas eerst schatten hoeveel blokjes eronder passen.',
      'Sleep aan de greep van de eerste strook tot de maat precies past en lees samen het getal.',
      'Maak de maat van de tweede strook duidelijk kleiner en laat een kind het nieuwe getal voorlezen.',
      'Vraag wat er met het voorwerp is gebeurd — en wat er dus wél is veranderd.',
      'Blijft er een gestreept stukje over, benoem dan dat het niet meetelt en zoek samen een maat die wel past.',
      'Kies een ander voorwerp en laat een kind zelf de maat instellen.'
    ],
    classroomIdeas: [
      'Laat twee kinderen ieder één strook instellen en aan elkaar uitleggen welk getal ze krijgen en waarom die getallen verschillen.',
      'Meet dezelfde ladder met een grote en met een kleine maat en schrijf beide getallen naast elkaar op het bord.',
      'Laat de klas eerst voorspellen: als de maat half zo groot wordt, wat gebeurt er dan met het getal?',
      'Meet eerst met voetstappen of handspannen door de klas en leg dezelfde vraag daarna op het bord met de stroken.',
      'Zoek samen een maat waarbij er niets overblijft en bespreek waaraan je ziet dat die maat past.',
      'Print het blad uit het Leerkracht-pakket en laat kinderen met een eigen strookje verder meten op papier.'
    ],
    metaTitle: 'De Rekbare Maat – meten met natuurlijke maten groep 3/4',
    metaDescription: 'Meet één voorwerp met twee stroken: sleep de maat kleiner en zie het getal oplopen terwijl het voorwerp stil ligt. Meten met natuurlijke maten, groep 3/4.'
  },

  sv: {
    slug: 'mata-langd-med-olika-enheter-lagstadiet',
    name: 'Enhetsremsan',
    tagline: 'Klassen mäter samma föremål med två remsor av olika stora bitar, drar i enheten så den växer eller krymper, och ser talet ändras medan föremålet ligger kvar precis där det låg.',
    about: [
      'Överst på bänken ligger ett föremål – en krita, en gaffel, en selleristjälk, en stege. Under det ligger två remsor. Varje remsa är byggd av likadana bitar som lagts kant i kant från föremålets vänstra kant, och på den första bitens högerkant sitter ett grepp. Drar du i greppet växer eller krymper biten under fingret, hela remsan läggs om direkt, och talet vid remsans slut klättrar uppåt eller nedåt. Den andra remsan rör sig inte. Föremålet rör sig aldrig.',
      'I Lgr22 ligger det här i det centrala innehållet för årskurs 1–3: mätning av längd, jämförelse och uppskattning, och att mäta med olika enheter. Det är svårare än det låter. Ett barn som räknar bitar håller inte alltid fast vid att bitarna måste vara lika stora och ligga kant i kant utan glapp. Att talet hänger ihop med enhetens storlek, inte bara med föremålet, är ytterligare ett steg. Verktyget är en apparat att undervisa vid – ingen utlovad effekt.',
      'Det är där det tar emot. Enheten krymper, remsan läggs om, och talet klättrar – fyra blir sex, sex blir nio – medan föremålet ligger blickstilla på bänken. Frågan ställer sig själv: hur kan det bli mer av något som inte har blivit längre? Klassen brukar dela sig här, och det är precis den diskussionen du är ute efter. Enheten är inte något föremålet har – den är något ni valt, och när den ändras är det talet som ändras, inte saken.',
      'Det finns inget att läsa och inget att logga in för. Öppna sidan på projektorn eller smartboarden, dra i en enhet och börja prata – barnen kan komma fram och dra själva. Går enheten inte jämnt upp ritas den sista biten streckad och räknas inte, så resten syns utan att smyga in i talet. Ingen av de två mätningarna märks någonsin som rätt eller fel, och verktyget säger aldrig vilken enhet som är bäst. Hela föremålshyllan och utskrifterna ingår i Lärarpaketet.'
    ],
    howToUse: [
      'Projicera bänken och låt klassen först gissa hur många bitar som får plats längs föremålet.',
      'Dra i greppet på den första biten tills remsan täcker föremålet, och läs talet högt tillsammans.',
      'Låt ett barn krympa enheten på den andra remsan och fråga vad som händer med talet.',
      'Sätt båda remsorna till samma enhet igen och låt klassen se att talen då möts.',
      'Använd knappen så det går jämnt upp när ni vill ha en mätning utan bit över, och prata om varför just den enheten passade.',
      'Byt föremål och gör om samma runda – kort och ofta, som en rutin.'
    ],
    classroomIdeas: [
      'Gissa först, mät sedan: skriv upp klassens gissning på tavlan innan ni drar remsan på plats.',
      'Två barn, två remsor – låt dem välja varsin enhet och förklara för varandra varför talen skiljer sig.',
      'Vänd på uppgiften: bestäm ett tal, till exempel fem, och låt klassen dra enheten tills remsan visar just det.',
      'Ta en runda med bit över och fråga vad man gör med den streckade biten och varför den inte räknas med.',
      'Gör samma sak i verkligheten – klipp pappersremsor i två olika längder och mät samma bok med båda.',
      'Avsluta med frågan om talet kan bli hur stort som helst, och låt dem dra enheten så liten de kan.'
    ],
    metaTitle: 'Enhetsremsan – mäta längd med olika enheter, åk 1–3',
    metaDescription: 'Mät samma föremål med två remsor och olika stora enheter. Dra i enheten, se talet ändras medan föremålet står still. Gratis att använda i klassrummet, åk 1–3.'
  },

  da: {
    slug: 'maale-laengde-med-egne-enheder',
    name: 'Strækbåndet',
    tagline: 'Klassen måler den samme genstand med to bånd, trækker den ene enhed mindre og ser tallet stige, mens genstanden på bordet ikke har rørt sig en tøddel.',
    about: [
      'Øverst på skærmen ligger en genstand på bordet – et farvekridt, en gaffel, en stang bladselleri, en stige. Under den ligger to bånd, der begge starter ved genstandens venstre kant og er lagt af ens brikker side om side. På den første brik i hvert bånd sidder et greb. Trækker du i grebet, vokser eller skrumper enheden, hele båndet lægger sig om under fingeren, og tallet for enden tæller op eller ned. Det andet bånd rører sig ikke.',
      'Området er måling inden for Geometri og måling: i 1.-2. klasse måler eleverne længde med ikke-standardiserede enheder, længe før de faste enheder kommer på banen. Det svære er ikke at tælle brikkerne. Det svære er, at tallet hører til enheden og ikke til genstanden – mange elever lægger brikkerne pænt uden hul og tror alligevel, at et større tal betyder en længere genstand. Strækbåndet er bygget til den samtale; det er en model at tale ud fra, ikke et program med dokumenteret læringseffekt.',
      'Læg de to bånd med samme enhed, og tallene er ens. Træk så det ene greb mindre, og se, hvad der sker: brikkerne bliver kortere, der skal flere af dem, og tallet stiger – mens genstanden ligger fuldstændig stille på bordet. Der er altid en i klassen, der siger, at genstanden er blevet længere. Det er præcis derhen, samtalen skal: tallet blev større, fordi enheden blev mindre. Man kan ikke eje et bånd, hvis enhed vokser.',
      'Der er ikke noget at læse sig til, ingen login og ingen opsætning: åbn siden på projektoren eller det interaktive whiteboard, og træk i grebet. Der er hverken point eller tid, og ingen af de to målinger bliver bedømt – værktøjet peger aldrig på den ene enhed som den bedre. Begge bånd måler den samme genstand; de gør det bare med hver sin enhed. Hylden med flere genstande og udskrivning af bordet hører til Lærerabonnementet.'
    ],
    howToUse: [
      'Vis genstanden på bordet, og lad klassen gætte, hvor mange brikker der skal til.',
      'Sæt begge bånd ens med Samme enhed på begge, og tæl brikkerne højt sammen.',
      'Træk grebet på det ene bånd mindre, og stop, når tallet er steget.',
      'Spørg klassen: hvad har flyttet sig – tallet eller genstanden?',
      'Brug Få det til at gå op, når et bånd ender med et stykke til overs, og tal om, hvorfor det sidste stykke ikke tælles med.',
      'Hent en ny genstand, og lad et par elever styre grebet.'
    ],
    classroomIdeas: [
      'Lad to elever måle den samme genstand med hvert sit bånd og skrive de to tal op ved siden af hinanden på tavlen.',
      'Bed klassen forudsige tallet, før du trækker enheden halvt så lille – og tjek det sammen bagefter.',
      'Mål den samme genstand med tre forskellige enheder, og skriv parrene op: lille enhed, stort tal.',
      'Lad eleverne finde en enhed, der går op i genstanden, uden at bruge knappen.',
      'Sæt enheden så stor, at der kun er plads til to brikker, og spørg, hvad der sker med tallet, hvis I halverer den.',
      'Slut med en kort skriveøvelse i hæftet: "Tallet blev større, fordi ..."'
    ],
    metaTitle: 'Strækbåndet – mål længde med egne enheder, 1.-2. kl.',
    metaDescription: 'Mål den samme genstand med to bånd, træk den ene enhed mindre, og se tallet stige, mens genstanden ligger stille. Gratis værktøj til 1.-2. klasse.'
  },

  no: {
    slug: 'maale-med-egne-enheter-lengde-smatrinnet',
    name: 'Strekkbåndet',
    tagline: 'Klassen måler den samme gjenstanden med to bånd, drar enheten på det ene båndet mindre og ser tallet klatre oppover mens gjenstanden på benken ikke har flyttet seg i det hele tatt.',
    about: [
      'Øverst ligger en gjenstand på benken – en fargeblyant, en gaffel, en selleristang, en stige. Under den ligger to bånd, og hvert bånd er bygd av like biter lagt etter hverandre fra venstre kant av gjenstanden. På den første biten i hvert bånd sitter et grep. Drar du i grepet, vokser eller krymper enheten mens du holder, hele båndet legger seg på nytt under fingeren, og tallet ved enden klatrer eller faller. Det andre båndet står helt stille, og gjenstanden flytter seg aldri.',
      'Dette er måling av lengde med ikke-standardiserte enheter på 1.–2. trinn, midt i fagområdet måling og i kjerneelementene utforsking og problemløysing. Det er vanskeligere enn det ser ut. Elevene skal ikke bare telle biter, de skal oppdage at tallet henger sammen med hvor stor enheten er. Vi lover ingen målt læringseffekt, og det finnes ingen effektstudie på dette – men sammenhengen blir synlig på skjermen og mulig å snakke om i fellesskap.',
      'Så kommer øyeblikket alt handler om: enheten krymper, og tallet blir større. Gjenstanden ligger nøyaktig der den lå. Mange elever tror at et større tall betyr en lengre gjenstand, for tallet er det eneste de har lært å se på. Her får de to ulike tall for den samme stigen på den samme benken, og spørsmålet «hvorfor er tallene forskjellige?» har bare ett svar. Elevene finner det selv: enheten er ikke den samme.',
      'Det er ingenting å lese for elevene, ingen innlogging og ingen konto. Verktøyet åpner seg i nettleseren og fungerer like godt på projektor og smartboard som på nettbrett. Ingen av de to målingene blir rettet, og verktøyet sier aldri hvilken enhet som er best – begge tallene er sanne, og det er nettopp poenget. Hele hylla med gjenstander og utskrift av benken følger med Lærerabonnementet.'
    ],
    howToUse: [
      'Sett verktøyet på projektoren og la klassen se gjenstanden på benken før du gjør noe som helst.',
      'Si «Vi måler den med disse», og les tallet på begge båndene høyt sammen.',
      'Dra i grepet på det første båndet så enheten blir mindre, og la elevene følge tallet mens du drar.',
      'Spør «hva skjedde med tallet – og hva skjedde med gjenstanden?», og vent til flere har svart.',
      'Bruk «Samme enhet på begge» for å stille tilbake, og «Få det til å gå opp» når en bit blir til overs.',
      'Bytt gjenstand og gjør det samme en gang til, så elevene kan forutsi hva som kommer til å skje.'
    ],
    classroomIdeas: [
      'La to elever velge hver sin enhet i hemmelighet og forklare for resten hvorfor de fikk ulike tall for den samme gjenstanden.',
      'Skriv de to tallene på tavla og be klassen tenke seg hvilken enhet som hørte til det største tallet.',
      'Mål først med en enhet som går opp, så med en som ikke gjør det, og snakk om biten som blir til overs.',
      'La elevene si tallet høyt før du slipper grepet, og skriv gjettene på tavla først.',
      'Bruk verktøyet som inngang til hvorfor klassen må bli enige om én felles enhet før de går ut og måler pultene sine.',
      'Avslutt med spørsmålet «kan vi bruke en enhet som vokser mens vi måler?», og la det stå åpent til neste time.'
    ],
    metaTitle: 'Strekkbåndet – mål med egne enheter, 1.–2. trinn',
    metaDescription: 'Mål den samme gjenstanden med to bånd på skjermen. Krymp enheten og se tallet vokse mens gjenstanden ligger stille. Gratis å bruke på projektor. 1.–2. trinn.'
  },

  fi: {
    slug: 'pituuden-mittaaminen-omilla-yksikoilla-alkuopetus',
    name: 'Venyvä yksikkö',
    tagline: 'Luokka mittaa saman esineen kahdella nauhalla, venyttää toisen nauhan yksikköä isommaksi tai pienemmäksi ja näkee, miten nauhan luku muuttuu, vaikka esine pysyy koko ajan täsmälleen paikallaan.',
    about: [
      'Näytöllä on mittauspöytä ja sen päällä yksi esine: liitu, haarukka, sellerinvarsi tai tikapuut. Esineen alla on kaksi nauhaa, ja kumpikin on ladottu samanlaisista paloista esineen vasemmasta reunasta alkaen. Ensimmäisen palan oikeassa reunassa on kahva: kun siitä vetää, pala eli yksikkö suurenee tai pienenee, koko nauha latoutuu uudelleen sormen alla ja nauhan päässä oleva luku muuttuu samaa tahtia. Toinen nauha ei liiku, eikä esine liiku.',
      'Sisältö kuuluu OPS 2014:n alueeseen Geometria ja mittaaminen: pituuden mittaaminen ei-standardeilla eli itse valituilla yksiköillä 1.–2. luokalla. Mittaamisen periaate on aikuiselle itsestään selvä, lapselle ei. Yksiköiden on oltava keskenään yhtä suuria, ne ladotaan peräkkäin ilman rakoja ja päällekkäisyyksiä, ja mittaluku kertoo vain sen, montako yksikköä esineen matkalle mahtui. Tämän työkalun vaikutuksesta oppimiseen ei ole tutkimusnäyttöä; se on väline yhteiseen puhumiseen, ei mittari.',
      'Vaikein hetki tulee, kun yksikköä pienennetään. Esine on koko ajan sama eikä ole liikahtanut, mutta nauhan luku kasvaa. Moni oppilas odottaa päinvastaista: pienempi yksikkö, pienempi luku. Kun sama esine saa kaksi eri lukua, kysymys "mikä on esineen luku" jää auki, kunnes sovitaan, minkä kokoisella yksiköllä mitataan. Jos yksikkö ei mahdu tasan, viimeinen pala piirtyy katkoviivalla eikä sitä lasketa mukaan.',
      'Käytännössä: mittauspöydällä ei ole sanoja, vain esine, palat ja luvut, joten oppilaan ei tarvitse lukea mitään päästäkseen tekemään. Kirjautumista ei tarvita, ja sivu avautuu sellaisenaan älytaululla ja projektorilla. Työkalu ei merkitse kumpaakaan mittausta oikeaksi eikä vääräksi eikä kerro, kumpi yksikkö olisi parempi – sen ratkaisee luokka puhumalla. Ei pisteitä, ei kelloa. Koko esinevalikoima ja tulostus kuuluvat Opettaja-tilaukseen.'
    ],
    howToUse: [
      'Avaa työkalu älytaululle ja anna luokan katsoa esinettä hetki ennen kuin mitään mitataan.',
      'Mittaa esine ensin niin, että molemmissa nauhoissa on yhtä suuri yksikkö, ja lukekaa luvut ääneen.',
      'Vedä toisen nauhan ensimmäisen palan reunasta niin, että yksikkö pienenee, ja pysäytä liike hetkeksi keskelle.',
      'Kysy luokalta, mikä muuttui ja mikä ei muuttunut: luku, yksikkö vai esine.',
      'Käytä Tasan menevä yksikkö -painiketta, kun haluat, että yksikkö mahtuu tasan eikä katkoviivaista palaa jää yli.',
      'Vaihda esinettä ja esitä sama kysymys uudelleen uudella esineellä.'
    ],
    classroomIdeas: [
      'Pyydä oppilaita ennustamaan ennen vetoa, mitä luvulle tapahtuu, kun yksikkö pienenee.',
      'Anna kahden oppilaan mitata sama esine eri kokoisilla yksiköillä ja perustella luokalle, miksi luvut eroavat.',
      'Kirjatkaa taululle jokaisesta mittauksesta pari: yksikön koko ja luku, ja etsikää yhdessä, mihin suuntaan luku liikkuu.',
      'Sopikaa luokan oma yksikkö säätämällä nauha yhteen kokoon ja mitatkaa sillä kaikki päivän esineet.',
      'Ottakaa esiin tilanne, jossa yksikkö ei mahdu tasan, ja keskustelkaa siitä, mitä ylijäävälle palalle pitäisi tehdä.',
      'Tulostakaa mittauspöytä ja liimatkaa kahden eri yksikön mittaukset vihkoon vierekkäin.'
    ],
    metaTitle: 'Venyvä yksikkö – pituuden mittaaminen omilla yksiköillä',
    metaDescription: 'Mittaa sama esine kahdella nauhalla ja venytä toisen yksikköä: luku muuttuu, esine ei. Mittaamisen työkalu 1.–2. luokan älytaululle, ei kirjautumista.'
  }
};
