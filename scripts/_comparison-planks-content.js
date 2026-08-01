/* =====================================================================
   _comparison-planks-content.js — the /tools/ LANDING copy for TOOL #42
   ---------------------------------------------------------------------
   11 locale entries, each a `ToolEntry` for
   frontend/messages/tool-content/<locale>.json. Consumed by
   scripts/register-comparison-planks.js (registration point 5 of 7).

   ⭐ REBUILT PER LOCALE BY THE SAME THREE NATIVE PANELS (§A.13.48) that
   built the in-tool strings, so the landing prose carries each
   language's own nouns rather than a translation of the English.

   ⚠ SLUG FOLDING IS PER LOCALE AND THE PANELS READ IT OFF THE 44
   SHIPPED SLUGS rather than assuming it. Danish folds ø→oe
   (`foelelsestjek`) where Norwegian folds ø→o (`folelsessjekk`) — the
   same word, the same two tools, two different slugs. That divergence
   is exactly what keeps two near-identical Scandinavian slugs apart,
   and here da/no diverge before folding even applies
   (`laengde` vs `lengde`).

   ⭐⭐ AND EVERY `about` STATES IN THE NEGATIVE THAT THE TOOL TAKES NO
   ANSWER. That is not padding — it is the ONLY honest way to sell a
   fence that is behavioural rather than lexical. `span-length-gap` owns
   2.MD.A.4 and asks "how much longer"; this tool has the same subject
   and never asks anything, so a teacher arriving from search has to be
   able to tell the two apart BEFORE clicking. Every panel arrived at
   this independently once told the fence was behavioural.

   ⚠ AND THE HOLLOW IS UNNAMED HERE TOO. The absence is a departure —
   `er letterlijk afgaan` · `lämna plankan` · `forlade brættet` ·
   `forlate fjøla` · `lähtevän lankusta` · `gefehlt hat` · `qui
   manquait` — never a thing. Three named parts, on every surface.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    slug: 'compare-lengths-difference-grade-1-2',
    name: 'The Planks',
    tagline: 'Two planks grow from one line. Over the part where one reaches further a bracket appears, and that piece comes off and lands at the end of the short one — where together they reach exactly as far.',
    about: [
      'Two planks start from the same line, one above the other. Drag the end of either and it grows or shrinks in whole steps, while the plank nobody is touching does not move at all. Each plank carries the number the class chose. Nothing else is on the board: no question, no box to fill, no clock running down. The planks are smooth, with no marks to count, because this is not about counting but about seeing how far something reaches.',
      'The moment one plank reaches further than the other, a bracket appears over exactly the part that sticks out. Drag the bracket down and that piece comes away from the long plank: it is now its own object, liftable and carriable. It is not redrawn and not copied — it is the same piece that was attached a moment ago. That difference matters, because the class does not see the piece arrive from somewhere; they see it leave the plank.',
      'Carry it to the end of the short plank and something happens that children see before anyone explains it: together the short plank and the piece reach exactly to where the long plank ends. So the difference is not a number to work out. It is a piece of the long plank, and it is exactly the piece the short one was missing. That is the whole lesson, and it is written nowhere.',
      'Each plank shows its number; the third number is shown nowhere. That is deliberate — it is the number the class says out loud, before the piece is moved. The board asks nothing, takes no answer and rules on nothing right or wrong; the teacher holds the conversation, not the screen. It sits with the Grade 1 and Grade 2 work on comparing lengths and on subtraction understood as difference.'
    ],
    howToUse: [
      'Drag the ends of the two planks to the lengths you want the class to see, before you say anything.',
      'Let the class find where one plank reaches further than the other; the bracket appears there by itself.',
      'Ask the class to say out loud how long that piece is, while it is still attached.',
      'Drag the bracket down so the piece comes away from the long plank.',
      'Lay the piece at the end of the short plank and let the class see the two reach exactly as far.',
      'Put it back and choose the next pair — two planks of the same length, say, so nothing sticks out at all.'
    ],
    classroomIdeas: [
      'Say it before you take it: every child says how long the piece is while it is still attached, and nobody writes anything down.',
      'Set the same difference two ways — one and five, then eleven and fifteen. The piece is the same size both times, on planks that look nothing alike.',
      'Make one plank twice the other, eight and sixteen, and ask what the class notices about the piece before you move it.',
      'Give a child a target: set the planks so the piece is exactly as long as the short plank.',
      'Carry the piece halfway and stop. Ask whether the short plank has got any longer yet, and where the extra will come from.',
      'Leave both planks the same length and ask what happened to the bracket, and why there is nothing to take off.'
    ],
    metaTitle: 'The Planks — see the difference as a piece, K-2',
    metaDescription: 'Two planks from one line. The overhang comes off the long one and lands at the end of the short one, and they reach the same. A free whiteboard tool for K-2.'
  },

  de: {
    slug: 'laengen-vergleichen-unterschied-grundschule',
    name: 'Zwei Bretter, eine Linie',
    tagline: 'Zwei Bretter beginnen an derselben Linie. Reicht eines weiter als das andere, erscheint ein Henkel über dem überstehenden Endstück: Dieses Stück lässt sich abnehmen und ans Ende des kurzen Brettes anlegen.',
    about: [
      'Zwei Bretter liegen untereinander und beginnen an derselben Linie. Am Ende jedes Brettes lässt sich ziehen: Das Brett wird länger oder kürzer, immer in ganzen Schritten. Sobald ein Brett weiter reicht als das andere, erscheint über dem überstehenden Teil ein Henkel. Zieht man ihn nach unten, löst sich dieses Endstück vom langen Brett und liegt frei da. Von dort lässt es sich an das Ende des kurzen Brettes tragen, wo es einrastet. Beide Bretter reichen dann genau gleich weit.',
      'So zeigt das Gerät etwas, das sich mit Zahlen allein schwer sagen lässt. Der Unterschied zwischen zwei Längen ist hier nichts, was man ausrechnet – er ist ein Stück, das man anfassen und tragen kann. Und es ist genau das Stück, das dem kürzeren Brett gefehlt hat: Es kommt vom langen Brett und passt trotzdem genau an das kurze. Kinder, für die der Unterschied als Rechenaufgabe noch zu abstrakt ist, sehen hier zuerst den Gegenstand und erst danach die Zahl dazu.',
      'Jedes Brett zeigt seine eigene Zahl. Das Endstück zeigt keine, und das ist Absicht. Die dritte Zahl – die Länge des Endstücks – steht nirgends auf der Fläche. Sie ist die Zahl, die die Klasse laut ausspricht, bevor das Stück bewegt wird. Das Gerät nimmt keine Antwort entgegen, prüft nichts und bewertet nichts. Es gibt kein Richtig und kein Falsch, keine Punkte und keine Uhr, die mitläuft. Die Zahl wird im Raum gesagt, und das Gespräch darüber gehört der Lehrkraft und den Kindern.',
      'Im Lehrplan der Grundschule gehört das zum Vergleichen von Längen und zum Ergänzen: Wie weit reicht das eine Brett, wie weit das andere, und was liegt dazwischen? Das Gerät passt in die tägliche Rechenzeit zu Beginn der Stunde, an das Whiteboard vor der ganzen Klasse und zu Kindern, die einen Unterschied lieber sehen und bewegen als aufschreiben. Es lässt sich ohne Vorbereitung öffnen, und ein Paar Bretter ist in wenigen Minuten besprochen.'
    ],
    howToUse: [
      'Öffnen Sie das Gerät am Whiteboard und ziehen Sie zuerst beide Bretter auf dieselbe Länge, damit die Klasse sieht, dass nichts übersteht.',
      'Ziehen Sie ein Brett länger und lassen Sie die beiden Zahlen vorlesen, bevor irgendetwas abgenommen wird.',
      'Zeigen Sie auf den Henkel über dem überstehenden Endstück und lassen Sie die Klasse laut sagen, wie lang dieses Stück ist.',
      'Nehmen Sie das Endstück ab und tragen Sie es langsam an das Ende des kurzen Brettes, damit alle das Einrasten sehen.',
      'Fragen Sie danach, woher dieses Stück kam und warum es genau an das kurze Brett passt, und wiederholen Sie das Ganze mit einem neuen Paar.'
    ]
  },

  fr: {
    slug: 'comparer-des-longueurs-difference-cp',
    name: 'Deux planches, un même départ',
    tagline: "Deux planches partent de la même ligne. Dès que l'une va plus loin que l'autre, une accolade apparaît au-dessus du bout qui dépasse : ce bout se détache et vient se poser à l'extrémité de la planche courte.",
    about: [
      "Deux planches sont posées l'une sous l'autre et partent de la même ligne. On fait glisser l'extrémité de chacune : la planche s'allonge ou se raccourcit, toujours par pas entiers. Dès qu'une planche va plus loin que l'autre, une accolade apparaît au-dessus de la partie qui dépasse. Faites-la glisser vers le bas : ce bout se détache de la planche longue et se retrouve libre. Portez-le ensuite jusqu'à l'extrémité de la planche courte, où il vient se loger. Les deux planches arrivent alors exactement au même endroit.",
      "L'appareil montre ainsi quelque chose que les nombres seuls disent mal. Ici, la différence entre deux longueurs n'est pas un résultat que l'on calcule : c'est un bout que l'on peut saisir et déplacer. Et c'est exactement le bout qui manquait à la planche courte : il vient de la planche longue, et pourtant il s'ajuste précisément à l'autre. Les élèves pour qui la différence reste une opération abstraite voient d'abord l'objet, et le nombre seulement ensuite.",
      "Chaque planche affiche son propre nombre. Le bout, lui, n'en affiche aucun, et c'est voulu. Le troisième nombre – la longueur de ce bout – n'est écrit nulle part : c'est celui que la classe dit à voix haute, avant que le bout ne bouge. L'appareil ne recueille aucune réponse, ne vérifie rien et ne corrige rien. Il n'y a ni bonne ni mauvaise réponse, ni points, ni chronomètre. Ce qui est dit reste dans la classe, et la discussion appartient à l'enseignant et aux élèves.",
      "Dans les programmes officiels, cela relève de la comparaison de longueurs et de la recherche du complément : jusqu'où va l'une, jusqu'où va l'autre, et qu'y a-t-il entre les deux ? L'appareil trouve sa place dans le rituel de calcul du matin, au tableau devant toute la classe, et auprès des élèves qui préfèrent voir et déplacer une différence plutôt que l'écrire. Il s'ouvre sans préparation, et une paire de planches se commente en quelques minutes."
    ],
    howToUse: [
      "Projetez l'appareil et donnez d'abord aux deux planches la même longueur, pour que la classe voie que rien ne dépasse.",
      'Allongez une seule planche, puis faites lire les deux nombres à voix haute, avant de détacher quoi que ce soit.',
      "Montrez l'accolade au-dessus du bout qui dépasse et laissez la classe dire à voix haute quelle est la longueur de ce bout.",
      "Détachez le bout et portez-le lentement jusqu'à l'extrémité de la planche courte, pour que tous voient les deux planches arriver au même endroit.",
      "Demandez ensuite d'où venait ce bout et pourquoi il s'ajuste si bien à la planche courte, puis recommencez avec une autre paire."
    ]
  },

  es: {
    slug: 'comparar-longitudes-diferencia-primaria',
    name: 'Los dos tablones',
    tagline: 'Dos tablones salen de la misma línea. Sobre lo que sobresale del largo aparece un corchete: ese recorte se quita y se pone al final del corto, y entonces los dos llegan igual de lejos.',
    about: [
      'Dos tablones salen de la misma línea vertical. La clase alarga o acorta cualquiera de los dos arrastrando su extremo, siempre en unidades enteras. Que los dos empiecen en el mismo sitio no es un detalle de dibujo: es lo que hace que comparar tenga sentido. Cuando dos objetos no arrancan del mismo punto, el que parece más largo puede no serlo, y ese es justamente el error que aparece en primero y segundo cuando los niños comparan dos cosas apoyadas de cualquier manera.',
      'En cuanto uno de los dos llega más lejos, aparece un corchete sobre la parte que sobresale. Ese corchete no es una marca: es un asa. Al arrastrarlo hacia abajo, el recorte se separa del tablón largo y queda suelto, como una pieza más. Se puede llevar hasta el extremo del tablón corto, donde se une punta con punta, y entonces el tablón corto con el recorte llega exactamente hasta donde termina el largo. La diferencia deja de ser una cuenta y pasa a ser algo que se coge con la mano.',
      'Esa es la idea central. La diferencia entre los dos tablones no es un número que haya que averiguar: es una parte del tablón largo, y es justo la parte que le faltaba al corto. Los niños lo ven porque son ellos quienes la mueven. El tablón corto no crece por arte de magia; recibe algo que estaba en el otro. Ver la diferencia como un objeto que se quita y se pone sostiene después la resta y las situaciones de comparación mucho mejor que memorizar qué operación toca.',
      'Cada tablón muestra su propio número. El recorte no muestra ninguno, y eso es deliberado: el tercer número es el que dice la clase en voz alta. La herramienta no pregunta nada, no recoge respuestas, no corrige y no lleva tiempo ni puntuación; lo único que hace es mostrar lo que pasa. Encaja con lo que los planes de estudio piden en primero y segundo de primaria sobre comparar longitudes y sobre las situaciones de resta entendidas como diferencia.'
    ],
    howToUse: [
      'Proyecta la herramienta y arrastra los extremos hasta que los dos tablones tengan largos distintos; también puede hacerlo un niño desde la pizarra.',
      'Antes de tocar el corchete, pide a la clase que diga en voz alta cuánto mide el recorte que sobresale. Recoge todas las propuestas, aunque no coincidan.',
      'Arrastra el corchete hacia abajo. El recorte se separa del tablón largo y queda suelto: pregunta si sigue midiendo lo mismo ahora que está fuera.',
      'Llévalo hasta el extremo del tablón corto y únelo punta con punta. Deja que la clase vea que ahora los dos llegan igual de lejos, y pregunta de quién era esa pieza.',
      'Devuélvelo a su lugar, cambia un solo tablón y repite. Después de dos o tres parejas, la clase empieza a anticipar el tamaño del recorte antes de que lo saques.'
    ]
  },

  pt: {
    slug: 'comparar-comprimentos-diferenca-anos-iniciais',
    name: 'As Duas Ripas',
    tagline: 'Duas ripas começam na mesma linha. Sobre o que passa da mais comprida aparece um colchete: esse retalho sai dali e vai para a ponta da curta, e então as duas chegam igualmente longe.',
    about: [
      'Duas ripas começam na mesma linha vertical. A turma deixa qualquer uma delas mais comprida ou mais curta arrastando a ponta, sempre em quantidades inteiras. Começar do mesmo lugar não é detalhe de desenho: é o que faz a comparação valer. Quando dois objetos não partem do mesmo ponto, o que parece maior pode não ser, e é justamente esse engano que aparece no primeiro e no segundo ano, quando as crianças comparam duas coisas encostadas de qualquer jeito.',
      'Assim que uma delas chega mais longe, aparece um colchete sobre a parte que passa. Esse colchete não é uma marca: é uma alça. Ao arrastá-lo para baixo, o retalho se solta da ripa comprida e fica ali, solto, separado de tudo. Dá para levá-lo até a ponta da ripa curta, onde ele encosta ponta com ponta, e então a ripa curta com o retalho chega exatamente até onde a comprida termina. A diferença deixa de ser conta e vira uma coisa que se pega com a mão.',
      'Essa é a ideia central. A diferença entre as duas ripas não é um número a descobrir: é uma parte da ripa comprida, e é exatamente a parte que faltava na curta. As crianças enxergam isso porque são elas que movem. A ripa curta não cresce por mágica; ela recebe algo que estava na outra. Ver a diferença como um objeto que sai e volta sustenta depois a subtração e as situações de comparação muito melhor do que decorar qual é a conta certa.',
      'Cada ripa mostra o próprio número. O retalho não mostra nenhum, e isso é proposital: o terceiro número é o que a turma fala em voz alta. A ferramenta não pergunta nada, não recolhe respostas, não corrige e não tem tempo nem pontuação; ela apenas mostra o que acontece. Conversa direto com o que a BNCC pede nos anos iniciais sobre comparar comprimentos e sobre a subtração entendida como diferença.'
    ],
    howToUse: [
      'Projete a ferramenta e arraste as pontas até as duas ripas ficarem de tamanhos diferentes; uma criança também pode fazer isso na lousa.',
      'Antes de tocar no colchete, peça que a turma diga em voz alta quanto mede o retalho que passa. Acolha todos os palpites, inclusive os que não combinam entre si.',
      'Arraste o colchete para baixo. O retalho se solta da ripa comprida e fica solto: pergunte se ele continua do mesmo tamanho agora que saiu.',
      'Leve-o até a ponta da ripa curta e encoste ponta com ponta. Deixe a turma ver que agora as duas chegam igualmente longe e pergunte de quem era aquele retalho.',
      'Ponha de volta no lugar, mude uma ripa só e repita. Depois de duas ou três duplas, a turma começa a prever o tamanho do retalho antes mesmo de você tirá-lo.'
    ]
  },

  it: {
    slug: 'confrontare-lunghezze-differenza-primaria',
    name: 'Le due travi',
    tagline: 'Due travi partono dalla stessa linea. Sopra ciò che sporge dalla più lunga compare una parentesi: quel ritaglio si stacca e va in fondo alla corta, e così le due arrivano allo stesso punto.',
    about: [
      "Due travi partono dalla stessa linea verticale. La classe le allunga o le accorcia trascinando l'estremità, sempre a quantità intere. Che partano dallo stesso punto non è un dettaglio del disegno: è ciò che rende sensato il confronto. Quando due oggetti non partono dallo stesso punto, quello che sembra più lungo può non esserlo, ed è proprio l'errore che si vede in prima e in seconda quando i bambini confrontano due cose appoggiate alla rinfusa.",
      'Appena una delle due arriva più lontano, sopra la parte che sporge compare una parentesi. Quella parentesi non è un segno: è una maniglia. Trascinandola verso il basso, il ritaglio si stacca dalla trave lunga e resta lì, libero, staccato da tutto. Si può portare in fondo alla trave corta, dove si appoggia di seguito, e allora la trave corta con il ritaglio arriva esattamente dove finisce quella lunga. La differenza smette di essere un calcolo e diventa una cosa che si prende in mano.',
      "È questa l'idea centrale. La differenza fra le due travi non è un numero da trovare: è una parte della trave lunga, ed è esattamente la parte che mancava alla corta. I bambini lo vedono perché sono loro a spostarla. La trave corta non cresce per magia: riceve qualcosa che stava nell'altra. Vedere la differenza come un oggetto che si toglie e si rimette regge poi la sottrazione e le situazioni di confronto molto meglio che ricordarsi quale operazione si fa.",
      'Ogni trave mostra il proprio numero. Il ritaglio non ne mostra nessuno, ed è voluto: il terzo numero è quello che la classe dice ad alta voce. Lo strumento non chiede niente, non raccoglie risposte, non corregge e non ha tempo né punteggio; mostra soltanto quello che succede. Va incontro a quanto le Indicazioni nazionali chiedono in prima e in seconda sul confronto di lunghezze e sulla sottrazione intesa come differenza.'
    ],
    howToUse: [
      "Proietta lo strumento e trascina le estremità finché le due travi non hanno lunghezze diverse; può farlo anche un bambino alla lavagna.",
      "Prima di toccare la parentesi, chiedi alla classe di dire ad alta voce quanto è lungo il ritaglio che sporge. Accogli tutte le risposte, anche quelle diverse fra loro.",
      'Trascina la parentesi verso il basso. Il ritaglio si stacca dalla trave lunga e resta libero: chiedi se è ancora lungo uguale adesso che è fuori.',
      'Portalo in fondo alla trave corta e appoggialo di seguito. Lascia vedere alla classe che ora le due arrivano allo stesso punto e chiedi di chi era quel ritaglio.',
      'Rimettilo a posto, cambia una sola trave e ripeti. Dopo due o tre coppie la classe comincia a prevedere quanto sarà lungo il ritaglio prima ancora che tu lo stacchi.'
    ]
  },

  nl: {
    slug: 'lengte-vergelijken-twee-latten-groep-3',
    name: 'De latten',
    tagline: 'Twee latten groeien vanaf dezelfde streep; over het deel waar de ene verder komt verschijnt een beugel, en dat stuk komt eraf en landt aan het eind van de korte lat — waar ze samen precies even ver komen.',
    about: [
      'Twee latten beginnen bij dezelfde streep, de ene boven de andere. Je sleept aan het uiteinde van een lat en die wordt langer of korter; de lat waar niemand aan zit, beweegt niet mee. Bij elke lat staat het getal dat de klas zelf heeft gekozen. Meer staat er niet op het bord: geen vraag, geen invulvak, geen tijd die wegloopt. De latten zijn glad, zonder streepjes om te tellen, want het gaat hier niet om tellen maar om zien hoe ver iets komt.',
      'Zodra de ene lat verder komt dan de andere, verschijnt er een beugel over precies dat deel dat uitsteekt. Sleep de beugel naar beneden en dat stuk komt los van de lange lat: het is nu een eigen ding dat je kunt oppakken en verplaatsen. Het is niet nagetekend en niet nagemaakt, het is hetzelfde stuk dat er net nog aan zat. Dat verschil is belangrijk, want de klas ziet het stuk niet ergens vandaan komen, maar er letterlijk afgaan.',
      'Breng dat stuk naar het eind van de korte lat en er gebeurt iets dat kinderen zelf zien voordat iemand het uitlegt: samen komen de korte lat en het stuk precies tot waar de lange lat eindigt. Het verschil is dus geen getal dat je moet uitrekenen. Het is een stuk van de lange lat, en het is precies het stuk dat de korte lat tekortkwam. Dat is de hele les, en die staat er nergens in woorden bij.',
      'Bij elke lat staat het getal, maar het derde getal staat nergens. Dat is met opzet: dat getal zegt de klas hardop, voordat het stuk verplaatst wordt. Het bord vraagt niets, neemt geen antwoord aan en keurt niets goed of af — de leerkracht leidt het gesprek, niet het scherm. Zo sluit het aan bij het meten en vergelijken van lengtes uit de SLO-kerndoelen voor groep 3 en groep 4, waar kinderen eerst leren zien en benoemen voordat er gerekend wordt.'
    ],
    howToUse: [
      'Sleep de uiteinden van de twee latten naar de lengtes die je de klas wilt laten zien, voordat je iets zegt.',
      'Laat de klas eerst kijken waar de ene lat verder komt dan de andere; daar verschijnt vanzelf de beugel.',
      'Vraag de klas om hardop te zeggen hoe lang dat stuk is, terwijl het er nog aan vastzit.',
      'Sleep de beugel naar beneden, zodat het stuk loskomt van de lange lat.',
      'Leg het stuk aan het eind van de korte lat en laat de klas zien dat ze samen precies even ver komen.',
      'Zet het stuk terug en kies een volgend paar — bijvoorbeeld twee latten die even lang zijn, zodat er niets uitsteekt.'
    ]
  },

  sv: {
    slug: 'jamfora-langd-med-plankor-lagstadiet',
    name: 'Plankorna',
    tagline: 'Två plankor växer från samma streck; över den del där den ena når längre visas en klammer, och stumpen lossnar och hamnar i änden av den korta plankan — där de tillsammans når precis lika långt.',
    about: [
      'Två plankor börjar vid samma streck, den ena ovanför den andra. Klassen drar i änden på en planka så att den blir längre eller kortare, och den planka ingen rör står helt stilla. Vid varje planka står det tal som klassen själv har valt. Mer än så finns inte på tavlan: ingen fråga, ingen ruta att fylla i, ingen tid som räknar ner. Plankorna är släta, utan streck att räkna, för det handlar inte om att räkna utan om att se hur långt något når.',
      'Så snart den ena plankan når längre än den andra visas en klammer över precis den del som sticker ut. Dra klammern nedåt och stumpen lossnar från den långa plankan: den blir ett eget föremål som går att lyfta och bära. Den är inte ritad på nytt och inte kopierad, det är samma stump som satt där nyss. Skillnaden spelar roll, för klassen ser inte stumpen dyka upp från något håll — de ser den lämna plankan.',
      'Bär stumpen till änden av den korta plankan, så händer något som barnen ser innan någon hunnit förklara det: tillsammans når den korta plankan och stumpen precis dit den långa plankan slutar. Skillnaden är alltså inget tal att räkna fram. Den är en bit av den långa plankan, och den är exakt den bit som den korta plankan saknade. Det är hela lektionen, och den står ingenstans i ord.',
      'Vid varje planka står talet, men det tredje talet står ingenstans. Det är avsiktligt: det talet säger klassen högt, innan stumpen flyttas. Tavlan frågar ingenting, tar inte emot något svar och avgör inte om något är rätt — det är läraren som håller i samtalet, inte skärmen. Så knyter verktyget an till Lgr22 och arbetet med att jämföra och uppskatta längd i årskurs ett och två, där eleverna först ska se och sätta ord på innan de räknar.'
    ],
    howToUse: [
      'Dra i ändarna på de två plankorna tills de har de längder du vill visa klassen, innan du säger något.',
      'Låt klassen först titta på var den ena plankan når längre än den andra; där visas klammern av sig själv.',
      'Be klassen säga högt hur lång stumpen är, medan den fortfarande sitter kvar.',
      'Dra klammern nedåt så att stumpen lossnar från den långa plankan.',
      'Lägg stumpen i änden av den korta plankan och visa att de tillsammans når precis lika långt.',
      'Lägg tillbaka stumpen och välj nästa par — till exempel två plankor som är lika långa, så att ingenting sticker ut.'
    ]
  },

  da: {
    slug: 'sammenligne-laengde-med-braedder-indskoling',
    name: 'Brædderne',
    tagline: 'To brædder vokser fra den samme streg; over det sted, hvor det ene når længere, kommer der en bøjle, og stykket løsner sig og lander for enden af det korte bræt — hvor de tilsammen når præcis lige langt.',
    about: [
      'To brædder starter ved den samme streg, det ene over det andet. Klassen trækker i enden af et bræt, så det bliver længere eller kortere, og det bræt, ingen rører, står helt stille. Ved hvert bræt står det tal, klassen selv har valgt. Mere er der ikke på tavlen: ingen spørgsmål, intet felt at skrive i, ingen tid der løber. Brædderne er glatte, uden streger at tælle, for det handler ikke om at tælle, men om at se, hvor langt noget når.',
      'Så snart det ene bræt når længere end det andet, kommer der en bøjle over netop det stykke, der rager ud. Træk bøjlen nedad, og stykket løsner sig fra det lange bræt: nu er det en ting for sig, som kan løftes og flyttes. Det er ikke tegnet igen og ikke kopieret — det er det samme stykke, som sad der lige før. Forskellen betyder noget, for klassen ser ikke stykket dukke op et sted fra; de ser det forlade brættet.',
      'Flyt stykket hen for enden af det korte bræt, og der sker noget, børnene ser, før nogen når at forklare det: tilsammen når det korte bræt og stykket præcis derhen, hvor det lange bræt ender. Forskellen er altså ikke et tal, man skal regne sig frem til. Den er et stykke af det lange bræt, og den er præcis det stykke, det korte bræt manglede. Det er hele lektionen, og den står ingen steder skrevet.',
      'Ved hvert bræt står tallet, men det tredje tal står ingen steder. Det er med vilje: det tal siger klassen højt, før stykket bliver flyttet. Tavlen spørger ikke om noget, tager ikke imod svar og afgør ikke, om noget er rigtigt — det er læreren, der holder samtalen i gang, ikke skærmen. Sådan knytter værktøjet an til Fælles Mål og arbejdet med at sammenligne og vurdere længder i første og anden klasse, hvor eleverne først skal se og sætte ord på, før de regner.'
    ],
    howToUse: [
      'Træk i enderne af de to brædder, indtil de har de længder, du vil vise klassen, før du siger noget.',
      'Lad klassen først kigge på, hvor det ene bræt når længere end det andet; dér kommer bøjlen frem af sig selv.',
      'Bed klassen sige højt, hvor langt stykket er, mens det stadig sidder fast.',
      'Træk bøjlen nedad, så stykket løsner sig fra det lange bræt.',
      'Læg stykket for enden af det korte bræt, og vis, at de tilsammen når præcis lige langt.',
      'Læg stykket tilbage, og vælg det næste par — for eksempel to brædder, der er lige lange, så der ikke rager noget ud.'
    ]
  },

  no: {
    slug: 'sammenligne-lengde-med-fjoler-smatrinnet',
    name: 'Fjølene',
    tagline: 'To fjøler vokser fra samme strek; over stedet der den ene når lenger, kommer det en bue, og biten løsner og havner i enden av den korte fjøla — der de til sammen når nøyaktig like langt.',
    about: [
      'To fjøler starter fra samme strek, den ene over den andre. Klassen drar i enden av ei fjøl så den blir lengre eller kortere, og fjøla ingen rører, står helt stille. Ved hver fjøl står tallet klassen selv har valgt. Mer er det ikke på tavla: ingen spørsmål, ingen rute å fylle ut, ingen tid som løper. Fjølene er glatte, uten streker å telle, for dette handler ikke om å telle, men om å se hvor langt noe når.',
      'Så snart den ene fjøla når lenger enn den andre, kommer det en bue over akkurat den delen som stikker ut. Dra buen nedover, og biten løsner fra den lange fjøla: nå er den en ting for seg, som kan løftes og bæres. Den er ikke tegnet på nytt og ikke kopiert — det er den samme biten som satt der like før. Forskjellen betyr noe, for klassen ser ikke biten dukke opp fra et sted; de ser den forlate fjøla.',
      'Flytt biten til enden av den korte fjøla, og det skjer noe barna ser før noen rekker å forklare det: til sammen når den korte fjøla og biten nøyaktig dit den lange fjøla slutter. Forskjellen er altså ikke et tall man må regne seg fram til. Den er en bit av den lange fjøla, og den er nøyaktig den biten den korte fjøla manglet. Det er hele leksjonen, og den står ingen steder skrevet.',
      'Ved hver fjøl står tallet, men det tredje tallet står ingen steder. Det er med vilje: det tallet sier klassen høyt, før biten blir flyttet. Tavla spør ikke om noe, tar ikke imot svar og avgjør ikke om noe er riktig — det er læreren som holder samtalen i gang, ikke skjermen. Slik knytter verktøyet an til LK20 og arbeidet med å sammenligne og vurdere lengder på første og andre trinn, der elevene først skal se og sette ord på, før de regner.'
    ],
    howToUse: [
      'Dra i endene på de to fjølene til de har lengdene du vil vise klassen, før du sier noe.',
      'La klassen først se etter hvor den ene fjøla når lenger enn den andre; der kommer buen fram av seg selv.',
      'Be klassen si høyt hvor lang biten er, mens den fortsatt sitter fast.',
      'Dra buen nedover så biten løsner fra den lange fjøla.',
      'Legg biten i enden av den korte fjøla, og vis at de til sammen når nøyaktig like langt.',
      'Legg biten tilbake og velg neste par — for eksempel to fjøler som er like lange, slik at ingenting stikker ut.'
    ]
  },

  fi: {
    slug: 'pituuksien-vertailu-lankuilla-alkuopetus',
    name: 'Lankut',
    tagline: 'Kaksi lankkua kasvaa samalta viivalta; sen kohdan päälle, jossa toinen yltää pidemmälle, ilmestyy kaari, ja pala irtoaa ja asettuu lyhyen lankun päähän — jolloin ne yltävät yhdessä täsmälleen yhtä pitkälle.',
    about: [
      'Kaksi lankkua lähtee samalta viivalta, toinen toisen yläpuolella. Luokka vetää lankun päästä, jolloin lankku pitenee tai lyhenee, ja se lankku, johon kukaan ei koske, pysyy täysin paikallaan. Kummankin lankun kohdalla näkyy luku, jonka luokka on itse valinnut. Enempää taululla ei ole: ei kysymystä, ei täytettävää ruutua, ei juoksevaa aikaa. Lankut ovat sileitä, eikä niissä ole viivoja laskettavaksi, sillä kyse ei ole laskemisesta vaan sen näkemisestä, kuinka pitkälle jokin yltää.',
      'Heti kun toinen lankku yltää pidemmälle kuin toinen, yli jäävän osan päälle ilmestyy kaari. Vedä kaarta alaspäin, ja pala irtoaa pitkästä lankusta: siitä tulee oma esineensä, jonka voi nostaa ja kantaa. Sitä ei piirretä uudelleen eikä kopioida — se on sama pala, joka oli kiinni lankussa hetkeä aiemmin. Ero on merkittävä, sillä luokka ei näe palan ilmestyvän jostakin, vaan he näkevät sen lähtevän lankusta.',
      'Siirrä pala lyhyen lankun päähän, ja tapahtuu jotakin, minkä lapset näkevät ennen kuin kukaan ehtii selittää sen: lyhyt lankku ja pala yltävät yhdessä täsmälleen siihen kohtaan, johon pitkä lankku päättyy. Ero ei siis ole luku, joka pitää laskea. Se on pala pitkästä lankusta, ja se on juuri se pala, joka lyhyeltä lankulta puuttui. Siinä on koko oppitunti, eikä sitä ole kirjoitettu mihinkään näkyviin.',
      'Kummankin lankun kohdalla näkyy luku, mutta kolmatta lukua ei näy missään. Se on tarkoituksellista: sen luvun luokka sanoo ääneen, ennen kuin pala siirretään. Taulu ei kysy mitään, ei ota vastaan vastauksia eikä ratkaise, onko jokin oikein — keskustelua johtaa opettaja, ei näyttö. Näin väline liittyy OPS 2014:n tavoitteisiin pituuksien vertailusta ja arvioinnista ensimmäisellä ja toisella luokalla, joissa oppilaan on ensin nähtävä ja sanoitettava ennen kuin lasketaan.'
    ],
    howToUse: [
      'Vedä lankkujen päistä, kunnes ne ovat niissä pituuksissa, jotka haluat näyttää luokalle, ennen kuin sanot mitään.',
      'Anna luokan ensin katsoa, missä toinen lankku yltää pidemmälle kuin toinen; siihen kohtaan ilmestyy kaari itsestään.',
      'Pyydä luokkaa sanomaan ääneen, kuinka pitkä pala on, sen ollessa vielä kiinni lankussa.',
      'Vedä kaarta alaspäin, jolloin pala irtoaa pitkästä lankusta.',
      'Aseta pala lyhyen lankun päähän ja näytä, että ne yltävät yhdessä täsmälleen yhtä pitkälle.',
      'Palauta pala paikalleen ja valitse seuraava pari — esimerkiksi kaksi yhtä pitkää lankkua, jolloin mitään ei jää yli.'
    ]
  }
};
