/* =====================================================================
   TOOL #57 — THE SHAPE STRETCHER: the eleven ToolEntry landing records.
   ---------------------------------------------------------------------
   ⚠⚠ THE NAMES AND THE APPARATUS NOUNS ARE THE PANELS' OWN, READ OUT OF
   `scripts/_shape-stretcher-locale-<loc>.js`, NOT INVENTED HERE. The
   first version of this file DID invent them — "Der Formendehner" with
   Scheibe/Marken — because I read the tool source, found EN-only
   strings, and concluded the panel pass had not run. It had: eight of
   the ten files were already on disk, unfolded into the tool, and the
   German panel had named it DER FORMENZIEHER with Platte/Etiketten.
   ⚠ The lesson is the recorded one in a new dress: the artefact I was
   told to read was not the only artefact, and "the panels will do it
   later" is a claim to CHECK, not to assume. `git status` found them.

     de Platte / Form / Etiketten        — "Der Formenzieher"
     fr vitre / forme / témoins          — "L’Étire-forme"
     es lámina / figura / marcas         — "La figura de goma"
     pt painel / figura / marquinhas     — "A Figura que Entorta"
     it riquadro / figura / targhette    — "Allunga e inclina la figura"
     sv fönstret / figur / markeringar   — "Figursträckaren"
     no flata / figur / merker           — "Figuren som blir skjev"
     fi pinta / muoto / lipukkeet        — "Muodonmuuttaja"
     en pane / shape / tags              — "The Shape Stretcher"
       (en is `mini tools/shape-stretcher.js` strings.title verbatim,
        and the register script asserts that equality.)

   ⚠⚠ nl AND da ARRIVED MID-TASK — THE PANEL PASS IS RUNNING CONCURRENTLY.
   At the first read only eight panel files existed and nl/da carried my
   placeholders. Minutes later both had been written (nl 06:08, da 06:12)
   and `mini tools/shape-stretcher.js` itself was edited at 06:11:59 — its
   English ariaShape3/4 dropped the {rot} placeholder, which is the
   refuse-list's no-degree-numeral rule landing. Both records were then
   REBUILT from the real panel files:
     nl paneel / vorm / labels        — "De vormrekker"
     da fladen / figur / markeringer  — "Stadig den samme figur?"
   ⚠ da is NOT a translation of the English title, and that is the panel's
   call rather than a slip: "Stadig den samme figur?" is the routine's
   own question.
   ⚠ THIS IS A SNAPSHOT, taken 06:14 on 2026-08-11 while another session
   was still working the tool. RE-RUN the register script before shipping:
   its pre-flight compares every landing `name` against its panel file
   byte-for-byte and dies on any drift.

   ⚠ THE PLAN NAME IS THE SHIPPED ONE PER LOCALE, never "Premium" — and
   for the eight panel locales it is the very phrase the panel itself put
   in `lockedBody`: Lehrkraft-Abo / abonnement Enseignant / plan Docente /
   plano Professor / piano Insegnante / Lärarplanen / Lærerabonnementet /
   Opettajatilaus. The register script re-reads each locale's `planTag`
   out of `frontend/messages/<loc>.json` and refuses copy that omits it.

   ---------------------------------------------------------------------
   ⚠⚠ ALL THREE PANELS RULED DO NOT BUILD, AND THESE ARE THE CONDITIONS
   UNDER WHICH IT SHIPS. Every one binds this file, verbatim from the
   tool header:

     · NO EFFICACY CLAIM anywhere. Every locale says "research-based,
       not evidence-based" in its own register and claims no measured
       effect.
     · NOT "canonical exemplars CAUSE the misconception" — Verdine et
       al. 2019: "We know of no data to support this suggestion." It is
       a co-occurrence. No locale asserts a cause.
     · NOT "documented from age 3" — it is documented from 30 MONTHS,
       i.e. BEFORE SCHOOLING, and no copy may imply a teacher caused it.
       Every locale says so explicitly.
     · NOT "every K-3 tool shows canonical upright shapes" — FALSIFIED
       BY OUR OWN `pip-museum` AND `sort-bins`. The gap is stated as
       what THIS SITE contains ("elsewhere here a shape arrives already
       changed"), never as what the world contains — the
       `sorting-hoops.js:22-26` rule.
     · No perimeter or area, no degree numeral, no corner count as a
       numeral, no timer, no score, no verdict — the tool's refuse-list,
       so none of them is promised here either.

   Slugs are native, /^[a-z0-9-]+$/, ASCII-folded (sv/fi ä→a ö→o å→a,
   da æ→ae ø→oe, no ø→o å→a) and checked against every shipped tool and
   maker slug by the register script before anything is written.
   ===================================================================== */
'use strict';
module.exports = {

  "en": {
    "name": "The Shape Stretcher",
    "slug": "shape-stretcher-turning-changes-nothing-leaning-does-grade-1",
    "tagline": "Turn a shape as far round as you like and nothing lets go. Lean it and a tag does — a tilt and a skew look alike, and only one of them hands you a different shape.",
    "metaTitle": "The Shape Stretcher — turning changes nothing, leaning does, Grade 1",
    "metaDescription": "Free whiteboard tool: one shape on a pane, two tags — every side the same length, and square corners — and three tracks. Turning never lets a tag go. Leaning does. Keep a shape beside the one in your hand and hold both at once.",
    "about": [
      "A pane with a shape on it and two tags hanging from the shape: one says every side is the same length, the other says the corners are square. Three tracks move the shape — stretch it, lean it, turn it — and the tags answer. Turning is the track that never changes anything, and the turn dial carries no notches at all, because a notch marks a place where crossing lets a tag go and on that dial there is no such place. The apparatus says so in its own furniture, before anyone touches it.",
      "Leaning is a different business. Lean far enough and the tag for square corners lets go, and what is left is a shape with four sides all the same length that is no longer a square. That is the distinction the pane is built for: a tilt and a skew both make a square lean over, and only one of them costs you anything. Elsewhere on this site a shape arrives already tilted or stretched and the class decides which bin it belongs in; here the class performs the change itself and watches the boundary being crossed.",
      "That a leaning square is recognised less readily than an upright one has been observed in children as young as thirty months, before any schooling at all, so it is not something a classroom produces — and no one has shown what does produce it. Keep a shape and it stands on the pane beside the one under your hand, so two shapes are compared side by side rather than remembered one after the other. Nothing is marked right or wrong: a tag reports a property and comes back on exactly as loudly as it went off, in the same colour, over the same distance. There are no points and no clock. This routine is research-based, not evidence-based — we describe what the apparatus does and claim no measured effect for it.",
      "Everything on the pane is free: both shapes, all three tracks, the tags, the kept shape and as many new shapes as the class wants. The Teacher plan adds the printed sheet, which carries the shapes the class left on the pane and ruled lines to write on."
    ],
    "howToUse": [
      "Deal a shape and turn it, right round if anyone asks for it. Ask what happened to the tags. Nothing did — and there are no notches on that dial, which is the apparatus saying as much before you say it.",
      "Now take the lean track and move it slowly. Stop the moment a tag lets go, and ask what is still true about this shape and what has stopped being true.",
      "Keep that shape, then move the other one back until the tag comes on again. The two now stand side by side on the same pane, which is the whole point: they are compared, not remembered one after the other.",
      "Set the class a task: make every tag hold at once. Then a harder one — break exactly one tag, and only one."
    ],
    "classroomIdeas": [
      "Two minutes to open a lesson: one shape turned right round, then leaned until something lets go. One sentence on the board about what changed and what did not.",
      "Take a prediction before the track moves — will this one lose a tag? — and write every prediction up before anything happens.",
      "Switch the pane to three sides. Exactly two settings in the whole apparatus put a square corner into a three-sided shape, and finding them is a real hunt."
    ]
  },

  "de": {
    "name": "Der Formenzieher",
    "slug": "formenzieher-drehen-aendert-nichts-neigen-schon-klasse-1",
    "tagline": "Dreht die Form, so weit ihr wollt — es fällt nichts ab. Neigt sie, und ein Etikett hält nicht mehr: Kippen und Scheren sehen gleich aus, und nur eines von beiden macht aus der Form eine andere.",
    "metaTitle": "Der Formenzieher — Drehen ändert nichts, Neigen schon, Klasse 1",
    "metaDescription": "Kostenloses Tafelwerkzeug: eine Form auf der Platte, zwei Etiketten — alle Seiten gleich lang, und rechtwinklig — und drei Bahnen zum Ziehen, Neigen und Drehen. Drehen löst nie ein Etikett. Neigen schon. Eine Form bleibt daneben stehen, dann habt ihr beide zugleich vor Augen.",
    "about": [
      "Eine Platte mit einer Form darauf und zwei Etiketten, die an der Form hängen: das eine sagt, dass alle Seiten gleich lang sind, das andere, dass die Form rechtwinklig ist. Drei Bahnen bewegen die Form — Ziehen, Neigen, Drehen — und die Etiketten antworten. Drehen ist die Bahn, die nie etwas ändert, und der Drehregler hat überhaupt keine Rasten, denn eine Raste markiert die Stelle, an der beim Überschreiten ein Etikett abfällt, und auf diesem Regler gibt es keine solche Stelle. Das Gerät sagt das mit seinem eigenen Aufbau, bevor jemand es anfasst.",
      "Neigen ist etwas ganz anderes. Neigt man weit genug, hält das Etikett für die rechten Winkel nicht mehr, und übrig bleibt eine Form mit vier gleich langen Seiten, die kein Quadrat mehr ist. Genau für diesen Unterschied ist die Platte gebaut: Kippen und Scheren lassen ein Quadrat beide schräg stehen, und nur eines von beiden kostet etwas. An anderer Stelle auf dieser Seite kommt eine Form schon gekippt oder gezogen an, und die Klasse entscheidet, in welches Fach sie gehört; hier führt die Klasse die Veränderung selbst aus und sieht zu, wie die Grenze überschritten wird.",
      "Dass ein schräg stehendes Quadrat schlechter wiedererkannt wird als ein aufrechtes, wurde schon bei Kindern von dreißig Monaten beobachtet, also lange vor jeder Beschulung — es entsteht nicht im Unterricht, und woran es liegt, hat bisher niemand gezeigt. Wer eine Form daneben stehen lässt, hat zwei nebeneinander auf der Platte, statt sie nacheinander erinnern zu müssen. Nichts wird als richtig oder falsch markiert: Ein Etikett meldet eine Eigenschaft und kommt genauso laut zurück, wie es gegangen ist — gleiche Farbe, gleicher Weg. Es gibt keine Punkte und keine Uhr. Diese Routine ist forschungsgestützt, aber nicht wirksamkeitsbelegt: Wir beschreiben, was das Gerät tut, und behaupten keine gemessene Wirkung.",
      "Alles auf der Platte ist kostenlos: beide Formen, das Ziehen, das Neigen und das Drehen, die Etiketten, die zweite Form daneben und so viele neue Formen, wie die Klasse mag. Mit dem Lehrkraft-Abo kommt das Blatt zum Ausdrucken dazu, auf dem steht, was die Klasse auf der Platte stehen ließ, dazu Linien zum Schreiben."
    ],
    "howToUse": [
      "Eine Form holen und drehen, ruhig einmal ganz herum. Fragen, was mit den Etiketten passiert ist. Nichts ist passiert — und der Regler hat keine Rasten, das Gerät sagt es also schon, bevor Sie es sagen.",
      "Jetzt die Bahn zum Neigen nehmen und langsam bewegen. In dem Moment anhalten, in dem ein Etikett nicht mehr hält, und fragen, was an dieser Form noch stimmt und was nicht mehr.",
      "Diese Form daneben stehen lassen und die andere zurückbewegen, bis das Etikett wieder hält. Nun stehen beide nebeneinander auf derselben Platte, und genau darum geht es: Sie werden verglichen, nicht nacheinander erinnert.",
      "Der Klasse eine Aufgabe stellen: alle Etiketten gleichzeitig halten lassen. Dann eine schwerere — genau ein Etikett lösen, und wirklich nur eines."
    ],
    "classroomIdeas": [
      "Zwei Minuten zum Stundenbeginn: eine Form einmal ganz herumdrehen, dann neigen, bis etwas nicht mehr hält. Ein Satz an der Tafel darüber, was sich geändert hat und was nicht.",
      "Vor jeder Bewegung eine Vermutung einholen — verliert diese hier ein Etikett? — und alle Vermutungen anschreiben, bevor irgendetwas passiert.",
      "Die Platte auf drei Seiten umstellen. Genau zwei Einstellungen im ganzen Gerät bringen einen rechten Winkel in eine dreiseitige Form, und sie zu finden ist eine echte Suche."
    ]
  },

  "fr": {
    "name": "L’Étire-forme",
    "slug": "etire-forme-tourner-ne-change-rien-pencher-oui-cp",
    "tagline": "Tournez la forme autant que vous voulez : aucun témoin ne s’en va. Penchez-la et un témoin lâche — l’inclinaison et le cisaillement se ressemblent, et un seul des deux vous laisse une autre forme.",
    "metaTitle": "L’Étire-forme — tourner ne change rien, pencher si, CP",
    "metaDescription": "Outil de tableau gratuit : une forme sur la vitre, deux témoins — tous les côtés de la même longueur, et des angles droits — et trois mouvements : étirer, pencher, tourner. Tourner ne détache jamais rien. Gardez une forme à côté et vous en avez deux sous les yeux.",
    "about": [
      "Une vitre avec une forme dessus et deux témoins accrochés à la forme : l’un dit que tous les côtés ont la même longueur, l’autre que les angles sont droits. Trois mouvements déplacent la forme — l’étirer, la pencher, la tourner — et les témoins répondent. Tourner est le mouvement qui ne change jamais rien, et le cadran de rotation ne porte aucun cran, parce qu’un cran marque l’endroit où le franchir fait lâcher un témoin, et sur ce cadran cet endroit n’existe pas. L’appareil le dit par sa propre construction, avant que quiconque y touche.",
      "Pencher est une tout autre affaire. Penchez assez loin et le témoin des angles droits lâche : il reste une forme à quatre côtés de même longueur qui n’est plus un carré. C’est pour cette distinction que la vitre est faite : l’inclinaison et le cisaillement font tous deux basculer un carré, et un seul des deux vous coûte quelque chose. Ailleurs sur ce site, une forme arrive déjà inclinée ou étirée et la classe décide dans quelle boîte la ranger ; ici c’est la classe qui fait le changement et qui regarde la frontière se franchir.",
      "Qu’un carré penché soit moins bien reconnu qu’un carré droit a été observé chez des enfants de trente mois, donc bien avant toute scolarisation : ce n’est pas la classe qui le fabrique, et personne n’a montré ce qui le fabrique. Gardez une forme et elle reste sur la vitre à côté de celle que vous tenez : on compare deux formes côte à côte au lieu de s’en souvenir l’une après l’autre. Rien n’est marqué juste ou faux : un témoin signale une propriété et revient exactement aussi fort qu’il est parti, même couleur, même trajet. Il n’y a ni points ni chronomètre. Cette routine est fondée sur la recherche, sans preuve d’efficacité : nous décrivons ce que fait l’appareil et ne revendiquons aucun effet mesuré.",
      "Tout l’appareil est gratuit : chaque forme, les trois mouvements, les témoins et la forme gardée. L’abonnement Enseignant ajoute la fiche imprimée, qui reprend la vitre telle que la classe l’a laissée, avec des lignes pour écrire."
    ],
    "howToUse": [
      "Prenez une forme et tournez-la, un tour complet si on vous le demande. Demandez ce qui est arrivé aux témoins. Rien — et ce cadran n’a aucun cran, l’appareil le dit donc avant vous.",
      "Prenez maintenant le mouvement « pencher » et avancez lentement. Arrêtez-vous à l’instant où un témoin lâche, et demandez ce qui reste vrai de cette forme et ce qui a cessé de l’être.",
      "Gardez cette forme, puis ramenez l’autre en arrière jusqu’à ce que le témoin revienne. Les deux sont maintenant côte à côte sur la même vitre, et c’est tout l’enjeu : on les compare, on ne les mémorise pas l’une après l’autre.",
      "Donnez une consigne à la classe : faire tenir tous les témoins en même temps. Puis une plus difficile — en faire lâcher exactement un, et un seul."
    ],
    "classroomIdeas": [
      "Deux minutes en début de séance : une forme tournée d’un tour complet, puis penchée jusqu’à ce qu’un témoin lâche. Une phrase au tableau sur ce qui a changé et ce qui n’a pas changé.",
      "Recueillez une prédiction avant de bouger — celle-ci va-t-elle perdre un témoin ? — et écrivez toutes les prédictions avant que quoi que ce soit ne se passe.",
      "Passez la vitre à trois côtés. Dans tout l’appareil, exactement deux réglages mettent un angle droit dans une forme à trois côtés, et les trouver est une vraie chasse."
    ]
  },

  "es": {
    "name": "La figura de goma",
    "slug": "la-figura-de-goma-girar-no-cambia-nada-inclinar-si-primaria-1",
    "tagline": "Giren la figura todo lo que quieran: no se suelta nada. Inclínenla y una marca se suelta — ladear y sesgar se parecen, y solo uno de los dos les deja otra figura.",
    "metaTitle": "La figura de goma — girar no cambia nada, inclinar sí, 1.º de primaria",
    "metaDescription": "Herramienta de pizarra gratuita: una figura en la lámina, dos marcas — lados iguales y esquinas rectas — y tres mandos: estirar, inclinar y girar. Girar no suelta nunca una marca. Inclinar sí. Dejen una figura al lado y verán las dos a la vez.",
    "about": [
      "Una lámina con una figura encima y dos marcas puestas en ella: una dice que todos los lados miden lo mismo, la otra que las esquinas son rectas. Tres mandos mueven la figura — estirarla, inclinarla, girarla — y las marcas responden. Girar es el mando que nunca cambia nada, y no lleva ninguna muesca, porque una muesca señala el punto en el que cruzar suelta una marca y en ese mando ese punto no existe. El aparato lo dice con su propia forma, antes de que nadie lo toque.",
      "Inclinar es otra cosa. Inclinen lo suficiente y se suelta la marca de las esquinas rectas: queda una figura con cuatro lados iguales que ya no es un cuadrado. Para esa distinción está hecha la lámina: ladear y sesgar dejan los dos el cuadrado torcido, y solo uno de ellos cuesta algo. En otras partes de este sitio la figura llega ya ladeada o estirada y la clase decide en qué caja va; aquí es la clase la que hace el cambio y ve cómo se cruza la frontera.",
      "Que un cuadrado torcido se reconozca peor que uno derecho se ha observado en niños de treinta meses, mucho antes de cualquier escolarización: no lo produce el aula, y nadie ha demostrado qué lo produce. Al dejar una figura al lado, se queda en la lámina junto a la que tienen en la mano, de modo que se comparan dos figuras lado a lado en vez de recordarlas una detrás de otra. Nada se marca como bien ni como mal: una marca informa de una propiedad y vuelve exactamente con la misma fuerza con la que se fue, mismo color, mismo recorrido. No hay puntos ni reloj. Esta rutina está basada en la investigación, no en evidencia de eficacia: describimos lo que hace el aparato y no afirmamos ningún efecto medido.",
      "Todo el aparato es gratis: cualquier figura, estirarla, inclinarla y girarla, las marcas y la figura que dejan al lado. El plan Docente añade la hoja impresa, con lo que la clase dejó en la lámina y líneas para escribir."
    ],
    "howToUse": [
      "Tomen una figura y gírenla, una vuelta entera si alguien lo pide. Pregunten qué les ha pasado a las marcas. Nada — y ese mando no tiene muescas, así que el aparato ya lo dice antes que ustedes.",
      "Ahora tomen el mando de inclinar y muévanlo despacio. Paren justo cuando se suelte una marca y pregunten qué sigue siendo verdad de esta figura y qué ha dejado de serlo.",
      "Dejen esa figura al lado y devuelvan la otra hasta que la marca se ponga otra vez. Ahora las dos están una junto a la otra en la misma lámina, y de eso se trata: se comparan, no se recuerdan una detrás de otra.",
      "Pónganle una tarea a la clase: que todas las marcas se sostengan a la vez. Después una más difícil: soltar exactamente una, y solo una."
    ],
    "classroomIdeas": [
      "Dos minutos para empezar la clase: una figura girada una vuelta entera y luego inclinada hasta que se suelte una marca. Una frase en la pizarra sobre qué cambió y qué no.",
      "Pidan una predicción antes de mover el mando — ¿esta perderá una marca? — y escríbanlas todas antes de que ocurra nada.",
      "Cambien la lámina a tres lados. En todo el aparato hay exactamente dos ajustes que meten una esquina recta en una figura de tres lados, y encontrarlos es una búsqueda de verdad."
    ]
  },

  "pt": {
    "name": "A Figura que Entorta",
    "slug": "a-figura-que-entorta-girar-nao-muda-nada-entortar-muda-1-ano",
    "tagline": "Girem a figura o quanto quiserem: nenhuma marquinha aparece nem some. Entortem, e uma marquinha solta — inclinar e enviesar se parecem, e só um dos dois devolve uma figura diferente.",
    "metaTitle": "A Figura que Entorta — girar não muda nada, entortar muda, 1.º ano",
    "metaDescription": "Ferramenta de lousa gratuita: uma figura no painel, duas marquinhas — todos os lados do mesmo tamanho e cantos retos — e três controles: alongar, entortar e girar. Girar nunca solta uma marquinha. Entortar solta. Deixem uma figura ao lado e ficam com as duas à vista.",
    "about": [
      "Um painel com uma figura em cima e duas marquinhas presas nela: uma diz que todos os lados têm o mesmo tamanho, a outra que os cantos são retos. Três controles movem a figura — alongar, entortar, girar — e as marquinhas respondem. Girar é o controle que nunca muda nada, e não tem nenhum encaixe, porque um encaixe marca o ponto em que atravessar solta uma marquinha e nesse controle esse ponto não existe. O aparelho diz isso pelo próprio formato, antes de alguém encostar nele.",
      "Entortar é outra história. Entortem o bastante e a marquinha dos cantos retos solta: sobra uma figura com quatro lados iguais que já não é um quadrado. É para essa distinção que o painel foi feito: inclinar e enviesar deixam os dois o quadrado torto, e só um deles custa alguma coisa. Em outros lugares deste site a figura chega já torta ou alongada e a turma decide em que caixa ela vai; aqui é a turma que faz a mudança e vê a fronteira sendo atravessada.",
      "Que um quadrado torto seja reconhecido com mais dificuldade do que um em pé já foi observado em crianças de trinta meses, muito antes de qualquer escolarização: não é a sala de aula que produz isso, e ninguém mostrou o que produz. Ao deixar uma figura ao lado, ela fica no painel junto da que está na mão, então duas figuras são comparadas lado a lado em vez de lembradas uma depois da outra. Nada é marcado como certo ou errado: uma marquinha informa uma propriedade e volta exatamente com a mesma intensidade com que saiu, mesma cor, mesmo percurso. Não há pontos nem relógio. Esta rotina é baseada em pesquisa, não em evidência de eficácia: descrevemos o que o aparelho faz e não afirmamos nenhum efeito medido.",
      "Aqui tudo é grátis — todas as figuras, girar, alongar e entortar, as marquinhas e a figura que fica ao lado. O plano Professor traz ainda a folha impressa, que leva o painel do jeito que a turma deixou e linhas pautadas para escrever."
    ],
    "howToUse": [
      "Peguem uma figura e girem, uma volta inteira se alguém pedir. Perguntem o que aconteceu com as marquinhas. Nada — e esse controle não tem encaixes, então o aparelho já disse antes de vocês.",
      "Agora peguem o controle de entortar e andem devagar. Parem no instante em que uma marquinha soltar e perguntem o que ainda é verdade nessa figura e o que deixou de ser.",
      "Deixem essa figura ao lado e tragam a outra de volta até a marquinha aparecer outra vez. Agora as duas estão lado a lado no mesmo painel, e é disso que se trata: são comparadas, não lembradas uma depois da outra.",
      "Deem uma tarefa à turma: fazer todas as marquinhas segurarem ao mesmo tempo. Depois uma mais difícil: soltar exatamente uma, e só uma."
    ],
    "classroomIdeas": [
      "Dois minutos para começar a aula: uma figura girada uma volta inteira e depois entortada até uma marquinha soltar. Uma frase na lousa sobre o que mudou e o que não mudou.",
      "Peçam uma previsão antes de mexer no controle — esta aqui vai perder uma marquinha? — e escrevam todas as previsões antes de qualquer coisa acontecer.",
      "Mudem o painel para três lados. No aparelho inteiro existem exatamente dois ajustes que colocam um canto reto numa figura de três lados, e achá-los é uma caçada de verdade."
    ]
  },

  "it": {
    "name": "Allunga e inclina la figura",
    "slug": "allunga-e-inclina-la-figura-ruotare-non-cambia-niente-classe-prima",
    "tagline": "Gira la figura quanto vuoi: non se ne va niente. Inclinala e una targhetta si stacca — inclinare e deformare si somigliano, e solo uno dei due ti lascia in mano un'altra figura.",
    "metaTitle": "Allunga e inclina la figura — ruotare non cambia niente, classe prima",
    "metaDescription": "Strumento da lavagna gratuito: una figura nel riquadro, due targhette — tutti i lati uguali e angoli retti — e tre comandi: allunga, inclina, gira. Girare non stacca mai una targhetta. Inclinare sì. Tieni una figura da parte e le vedi tutte e due insieme.",
    "about": [
      "Un riquadro con dentro una figura e due targhette appese alla figura: una dice che tutti i lati sono uguali, l'altra che gli angoli sono retti. Tre comandi muovono la figura — allunga, inclina, gira — e le targhette rispondono. Girare è il comando che non cambia mai niente, e non ha nessuno scatto, perché uno scatto segna il punto in cui attraversare fa staccare una targhetta e su quel comando quel punto non c'è. L'apparecchio lo dice con la sua stessa struttura, prima che qualcuno lo tocchi.",
      "Inclinare è tutt'altra faccenda. Inclina abbastanza e la targhetta degli angoli retti si stacca: resta una figura con quattro lati uguali che non è più un quadrato. È per questa distinzione che il riquadro è stato costruito: inclinare e deformare fanno pendere il quadrato tutti e due, e solo uno dei due costa qualcosa. Altrove su questo sito la figura arriva già inclinata o allungata e la classe decide in che scatola metterla; qui è la classe a fare il cambiamento e a vedere il confine venire attraversato.",
      "Che un quadrato inclinato venga riconosciuto meno facilmente di uno dritto è stato osservato in bambini di trenta mesi, quindi molto prima di qualsiasi scolarizzazione: non è la classe a produrlo, e nessuno ha mostrato che cosa lo produca. Se tieni una figura da parte, resta nel riquadro accanto a quella che hai in mano, così due figure si confrontano fianco a fianco invece di ricordarle una dopo l'altra. Niente viene segnato giusto o sbagliato: una targhetta segnala una proprietà e torna esattamente con la stessa forza con cui se n'era andata, stesso colore, stesso percorso. Non ci sono punti né orologio. Questa routine è basata sulla ricerca, non su prove di efficacia: descriviamo che cosa fa l'apparecchio e non rivendichiamo nessun effetto misurato.",
      "Lo strumento è gratuito tutto intero: ogni figura, allungare, inclinare e girare, le targhette e la figura tenuta da parte. Con il piano Insegnante c'è anche la scheda da stampare, con quello che la classe ha lasciato nel riquadro e le righe per scrivere."
    ],
    "howToUse": [
      "Prendi una figura e girala, anche un giro intero se te lo chiedono. Chiedi che cosa è successo alle targhette. Niente — e quel comando non ha scatti, quindi l'apparecchio lo dice prima di te.",
      "Ora prendi il comando per inclinare e muovilo piano. Fermati nell'istante in cui una targhetta si stacca e chiedi che cosa è ancora vero di questa figura e che cosa ha smesso di esserlo.",
      "Tieni quella figura da parte, poi riporta indietro l'altra finché la targhetta non torna. Adesso le due stanno fianco a fianco nello stesso riquadro, ed è tutto qui: si confrontano, non si ricordano una dopo l'altra.",
      "Dai un compito alla classe: far tenere tutte le targhette insieme. Poi uno più difficile: farne staccare esattamente una, e una soltanto."
    ],
    "classroomIdeas": [
      "Due minuti per aprire la lezione: una figura girata di un giro intero, poi inclinata finché una targhetta non si stacca. Una frase alla lavagna su che cosa è cambiato e che cosa no.",
      "Raccogli una previsione prima di muovere il comando — questa perderà una targhetta? — e scrivetele tutte prima che succeda qualsiasi cosa.",
      "Porta il riquadro a tre lati. In tutto l'apparecchio ci sono esattamente due regolazioni che mettono un angolo retto in una figura a tre lati, e trovarle è una caccia vera."
    ]
  },

  "nl": {
    "name": "De vormrekker",
    "slug": "vormrekker-draaien-verandert-niets-scheeftrekken-wel-groep-3",
    "tagline": "Draai de vorm zo ver je wilt: aan de labels verandert er niets. Trek hem scheef en er laat een label los — kantelen en scheeftrekken lijken op elkaar, en maar één van de twee levert je een andere vorm op.",
    "metaTitle": "De vormrekker — draaien verandert niets, scheeftrekken wel, groep 3",
    "metaDescription": "Gratis digibordgereedschap: één vorm op het paneel, twee labels — alle zijden even lang, en rechte hoeken — en drie banen: rekken, scheeftrekken, draaien. Draaien laat nooit een label los. Scheeftrekken wel. Zet er een vorm naast en je hebt ze allebei tegelijk in beeld.",
    "about": [
      "Een paneel met een vorm erop en twee labels die aan de vorm hangen: het ene zegt dat alle zijden even lang zijn, het andere dat de hoeken recht zijn. Drie banen bewegen de vorm — rekken, scheeftrekken, draaien — en de labels antwoorden. Draaien is de baan waarbij er aan de labels niets verandert, en de draaiknop heeft helemaal geen inkepingen, want een inkeping markeert de plek waar het overschrijden een label loslaat, en op die knop bestaat die plek niet. Het apparaat zegt dat met zijn eigen bouw, voordat iemand het aanraakt.",
      "Scheeftrekken is iets heel anders. Trek ver genoeg en het label voor de rechte hoeken laat los: wat overblijft is een vorm met vier even lange zijden die geen vierkant meer is. Voor dat onderscheid is het paneel gebouwd: kantelen en scheeftrekken laten allebei een vierkant schuin staan, en maar één van de twee kost je iets. Elders op deze site komt een vorm al gekanteld of uitgerekt binnen en beslist de klas in welk bakje hij hoort; hier voert de klas de verandering zelf uit en ziet ze de grens overgaan.",
      "Dat een schuin vierkant minder makkelijk herkend wordt dan een rechtop staand, is al waargenomen bij kinderen van dertig maanden, dus ruim voor enige scholing: het ontstaat niet in de klas, en niemand heeft aangetoond waardoor het wél ontstaat. Zet er een vorm naast, dan blijft die op het paneel staan naast die in je hand, zodat twee vormen naast elkaar vergeleken worden in plaats van na elkaar onthouden. Er wordt niets goed of fout gerekend: een label meldt een eigenschap en komt precies even hard terug als het weggegaan is — zelfde kleur, zelfde afstand. Er zijn geen punten en geen klok. Deze routine is op onderzoek gebaseerd, niet op bewezen effect: we beschrijven wat het apparaat doet en claimen geen gemeten effect.",
      "Het hele apparaat is gratis: elke vorm, alle drie de banen, de labels en de vorm die ernaast staat. Met het Leerkracht-abonnement komt daar het blad bij om af te drukken, met wat er op het paneel stond en lijnen om op te schrijven."
    ],
    "howToUse": [
      "Pak een vorm en draai hem, gerust een hele slag. Vraag wat de labels doen. Niets — en die knop heeft geen inkepingen, dus het apparaat zegt het al voordat jij het zegt.",
      "Pak nu de baan voor scheeftrekken en beweeg langzaam. Stop op het moment dat er een label loslaat en vraag wat er van deze vorm nog waar is en wat niet meer.",
      "Laat die vorm staan en breng de andere terug tot het label er weer op zit. Nu staan ze naast elkaar op hetzelfde paneel, en daar gaat het om: ze worden vergeleken, niet na elkaar onthouden.",
      "Geef de klas een opdracht: laat alle labels tegelijk vastzitten. Daarna een moeilijkere: laat er precies één loslaten, en maar één."
    ],
    "classroomIdeas": [
      "Twee minuten om de les te openen: één vorm een hele slag ronddraaien en daarna scheeftrekken tot er een label loslaat. Één zin op het bord over wat er veranderd is en wat niet.",
      "Vraag een voorspelling voordat de baan beweegt — verliest deze een label? — en schrijf alle voorspellingen op voordat er iets gebeurt.",
      "Zet het paneel op drie zijden. In het hele apparaat zijn er precies twee standen die een rechte hoek in een driezijdige vorm leggen, en die vinden is een echte speurtocht."
    ]
  },

  "sv": {
    "name": "Figursträckaren",
    "slug": "figurstrackaren-att-snurra-andrar-ingenting-att-vinkla-gor-det-ak-1",
    "tagline": "Snurra figuren hur mycket ni vill — ingenting lossnar. Vinkla den och en markering lossnar: att luta och att skeva ser likadant ut, och bara det ena lämnar er en annan figur.",
    "metaTitle": "Figursträckaren — att snurra ändrar ingenting, att vinkla gör det, åk 1",
    "metaDescription": "Gratis tavelverktyg: en figur i fönstret, två markeringar — alla sidor lika långa, och räta hörn — och tre reglage: sträck, vinkla, snurra. Att snurra lossar aldrig en markering. Att vinkla gör det. Låt en figur stå kvar bredvid, så syns båda samtidigt.",
    "about": [
      "Ett fönster med en figur i och två markeringar som sitter på figuren: den ena säger att alla sidor är lika långa, den andra att hörnen är räta. Tre reglage flyttar figuren — sträck, vinkla, snurra — och markeringarna svarar. Att snurra är det reglage som aldrig ändrar någonting, och det har inga hack alls, för ett hack markerar stället där ett överskridande får en markering att lossna, och på det reglaget finns inget sådant ställe. Apparaten säger det med sin egen uppbyggnad, innan någon har rört den.",
      "Att vinkla är en helt annan sak. Vinkla tillräckligt långt och markeringen för de räta hörnen lossnar: kvar står en figur med fyra lika långa sidor som inte längre är en kvadrat. Det är för den skillnaden fönstret är byggt: att luta och att skeva får båda kvadraten att stå snett, och bara det ena kostar något. På andra ställen här kommer figuren redan lutad eller sträckt och klassen avgör vilken låda den hör hemma i; här är det klassen som gör förändringen och ser gränsen passeras.",
      "Att en lutande kvadrat känns igen sämre än en upprätt har observerats hos barn på trettio månader, alltså långt före all skolgång: det uppstår inte i klassrummet, och ingen har visat vad det beror på. Låter ni en figur stå kvar står den bredvid den ni håller på med, så att två figurer jämförs sida vid sida i stället för att minnas den ena efter den andra. Ingenting markeras som rätt eller fel: en markering rapporterar en egenskap och kommer tillbaka precis lika högljutt som den försvann — samma färg, samma väg. Det finns inga poäng och ingen klocka. Den här rutinen är forskningsbaserad, men inte evidensbaserad: vi beskriver vad apparaten gör och hävdar ingen uppmätt effekt.",
      "Hela apparaten är gratis — alla figurer, alla tre reglagen, markeringarna och att låta en figur stå kvar bredvid. Lärarplanen lägger till arbetsbladet, som visar det klassen lämnade kvar i fönstret och linjer att skriva på."
    ],
    "howToUse": [
      "Ta fram en figur och snurra den, gärna ett helt varv. Fråga vad som hände med markeringarna. Ingenting — och det reglaget har inga hack, så apparaten säger det redan innan ni gör det.",
      "Ta nu reglaget för att vinkla och rör det långsamt. Stanna i samma stund som en markering lossnar och fråga vad som fortfarande är sant om den här figuren och vad som har slutat vara sant.",
      "Låt den figuren stå kvar och för tillbaka den andra tills markeringen sitter på igen. Nu står de sida vid sida i samma fönster, och det är hela poängen: de jämförs, de minns inte den ena efter den andra.",
      "Ge klassen en uppgift: få alla markeringar att sitta kvar samtidigt. Sedan en svårare — få exakt en att lossna, och bara en."
    ],
    "classroomIdeas": [
      "Två minuter för att öppna lektionen: en figur snurrad ett helt varv och sedan vinklad tills en markering lossnar. En mening på tavlan om vad som ändrades och vad som inte gjorde det.",
      "Ta en gissning innan reglaget rörs — tappar den här en markering? — och skriv upp alla gissningar innan något händer.",
      "Ställ om fönstret till tre sidor. I hela apparaten finns exakt två inställningar som lägger ett rätt hörn i en tresidig figur, och att hitta dem är en riktig jakt."
    ]
  },

  "da": {
    "name": "Stadig den samme figur?",
    "slug": "stadig-den-samme-figur-at-dreje-aendrer-ingenting-1-klasse",
    "tagline": "Drej figuren, så meget I vil — drejningen laver ingenting om. Læn den, og en markering slipper: at vippe og at forskyde ligner hinanden, og kun det ene efterlader jer en anden figur.",
    "metaTitle": "Stadig den samme figur? — at dreje ændrer ingenting, 1. klasse",
    "metaDescription": "Gratis tavleværktøj: én figur på fladen, to markeringer — alle sider lige lange, og rette hjørner — og tre baner: lang og kort, læn, drej. At dreje slipper aldrig en markering. Det gør det at læne. Lad en figur blive stående ved siden af, så I kan se to på én gang.",
    "about": [
      "En flade med en figur på og to markeringer, der sidder på figuren: den ene siger, at alle sider er lige lange, den anden at hjørnerne er rette. Tre baner flytter figuren — lang og kort, læn, drej — og markeringerne svarer. At dreje er den bane, der aldrig laver noget om, og drejeknappen har slet ingen hak, for et hak markerer det sted, hvor en overskridelse får en markering til at slippe, og på den knap findes det sted ikke. Apparatet siger det med sin egen opbygning, før nogen rører ved det.",
      "At læne er en helt anden sag. Læn langt nok, og markeringen for de rette hjørner slipper: tilbage står en figur med fire lige lange sider, som ikke længere er et kvadrat. Det er den forskel, fladen er bygget til: at vippe og at forskyde får begge kvadratet til at stå skævt, og kun det ene koster noget. Andre steder her kommer figuren allerede vippet eller strakt, og klassen afgør, hvilken kasse den hører til i; her er det klassen, der udfører ændringen og ser grænsen blive krydset.",
      "At et skævt kvadrat genkendes dårligere end et opretstående, er observeret hos børn på tredive måneder, altså længe før al skolegang: det opstår ikke i klasseværelset, og ingen har vist, hvad det skyldes. Lader I en figur blive stående, står den på fladen ved siden af den, I arbejder med, så to figurer sammenlignes side om side i stedet for at blive husket den ene efter den anden. Intet markeres som rigtigt eller forkert: en markering melder en egenskab og kommer tilbage præcis lige så højlydt, som den forsvandt — samme farve, samme vej. Der er ingen point og intet ur. Denne rutine er forskningsbaseret, men ikke evidensbaseret: vi beskriver, hvad apparatet gør, og hævder ingen målt effekt.",
      "Hele apparatet er gratis — alle figurer, alt hvad I kan gøre ved dem, markeringerne og figuren, der bliver stående ved siden af. Lærerabonnementet giver desuden udskriften, som viser fladen, sådan som klassen forlod den, med linjer til at skrive på."
    ],
    "howToUse": [
      "Hent en figur frem, og drej den — gerne en hel omgang. Spørg, hvad markeringerne gør. Ingenting — og den knap har ingen hak, så apparatet siger det allerede, før I gør.",
      "Tag nu banen, der læner figuren, og bevæg den langsomt. Stop i samme øjeblik en markering slipper, og spørg, hvad der stadig er sandt om denne figur, og hvad der er holdt op med at være det.",
      "Lad den figur blive stående, og før den anden tilbage, indtil markeringen sidder igen. Nu står de side om side på samme flade, og det er hele pointen: de sammenlignes, de huskes ikke den ene efter den anden.",
      "Giv klassen en opgave: få alle markeringer til at sidde på én gang. Derefter en sværere — få præcis én til at slippe, og kun én."
    ],
    "classroomIdeas": [
      "To minutter til at åbne timen: en figur drejet en hel omgang og derefter lænet, indtil en markering slipper. Én sætning på tavlen om, hvad der ændrede sig, og hvad der ikke gjorde.",
      "Tag et gæt, før banen bevæges — mister denne her en markering? — og skriv alle gæt op, før der sker noget som helst.",
      "Stil fladen om til tre sider. I hele apparatet er der præcis to indstillinger, der lægger et ret hjørne i en tresidet figur, og at finde dem er en rigtig jagt."
    ]
  },

  "no": {
    "name": "Figuren som blir skjev",
    "slug": "figuren-som-blir-skjev-a-dreie-endrer-ingenting-1-trinn",
    "tagline": "Drei figuren så mye du vil — ingenting slipper. Gjør den skjev, og et merke slipper: å vippe og å forskyve ser like ut, og bare det ene gir deg en annen figur.",
    "metaTitle": "Figuren som blir skjev — å dreie endrer ingenting, 1. trinn",
    "metaDescription": "Gratis tavleverktøy: én figur på flata, to merker — alle sider like lange, og rette hjørner — og tre baner: strekk, skjev, drei. Å dreie slipper aldri et merke. Å gjøre den skjev gjør det. Behold én figur på flata, så ser dere begge samtidig.",
    "about": [
      "En flate med en figur på og to merker som henger i figuren: det ene sier at alle sidene er like lange, det andre at hjørnene er rette. Tre baner flytter figuren — strekk, skjev, drei — og merkene svarer. Å dreie er banen som aldri endrer noe, og dreieknappen har ingen hakk i det hele tatt, for et hakk markerer stedet der en kryssing får et merke til å slippe, og på den knappen finnes ikke det stedet. Apparatet sier det med sin egen oppbygning, før noen har rørt det.",
      "Å gjøre figuren skjev er en helt annen sak. Gjør den skjev nok, og merket for de rette hjørnene slipper: igjen står en figur med fire like lange sider som ikke lenger er et kvadrat. Det er for den forskjellen flata er bygd: å vippe og å forskyve får begge kvadratet til å stå skjevt, og bare det ene koster noe. Andre steder her kommer figuren allerede vippet eller strukket, og klassen avgjør hvilken kasse den hører hjemme i; her er det klassen som gjør endringen og ser grensen bli krysset.",
      "At et skjevt kvadrat kjennes igjen dårligere enn et som står rett opp, er observert hos barn på tretti måneder, altså lenge før all skolegang: det oppstår ikke i klasserommet, og ingen har vist hva det kommer av. Beholder dere en figur, blir den stående på flata ved siden av den dere holder på med, slik at to figurer sammenlignes side om side i stedet for å huskes én etter én. Ingenting merkes som riktig eller galt: et merke melder en egenskap og kommer tilbake nøyaktig like høylytt som det forsvant — samme farge, samme vei. Det finnes ingen poeng og ingen klokke. Denne rutinen er forskningsbasert, men ikke evidensbasert: vi beskriver hva apparatet gjør, og hevder ingen målt effekt.",
      "Hele apparatet er gratis: figurene, alle tre — strekk, skjev og drei — merkene og figuren du beholder. Lærerabonnementet legger til arket til utskrift, med flata slik klassen forlot den og linjer å skrive på."
    ],
    "howToUse": [
      "Hent en figur og drei den, gjerne en hel runde. Spør hva som skjedde med merkene. Ingenting — og den knappen har ingen hakk, så apparatet sier det allerede før dere gjør det.",
      "Ta nå banen som gjør figuren skjev, og beveg den sakte. Stopp i det samme et merke slipper, og spør hva som fremdeles er sant om denne figuren, og hva som har sluttet å være det.",
      "Behold den figuren, og før den andre tilbake til merket holder igjen. Nå står de side om side på samme flate, og det er hele poenget: de sammenlignes, de huskes ikke én etter én.",
      "Gi klassen en oppgave: få alle merkene til å holde samtidig. Deretter en vanskeligere — få nøyaktig ett til å slippe, og bare ett."
    ],
    "classroomIdeas": [
      "To minutter til å åpne timen: en figur dreid en hel runde og deretter gjort skjev til et merke slipper. Én setning på tavla om hva som endret seg, og hva som ikke gjorde det.",
      "Ta en gjetning før banen beveges — mister denne et merke? — og skriv opp alle gjetningene før noe som helst skjer.",
      "Still flata om til tre sider. I hele apparatet finnes det nøyaktig to innstillinger som legger et rett hjørne i en tresidig figur, og å finne dem er en ekte jakt."
    ]
  },

  "fi": {
    "name": "Muodonmuuttaja",
    "slug": "muodonmuuttaja-kiertaminen-ei-muuta-mitaan-vinouttaminen-muuttaa-1-luokka",
    "tagline": "Kierrä muotoa niin paljon kuin haluat: muoto pysyy samana. Vinouta sitä, ja lipuke irtoaa — kallistaminen ja vääntäminen näyttävät samalta, ja vain toinen niistä jättää käteen toisen muodon.",
    "metaTitle": "Muodonmuuttaja — kiertäminen ei muuta mitään, vinouttaminen muuttaa, 1. luokka",
    "metaDescription": "Ilmainen taulutyökalu: yksi muoto pinnalla, kaksi lipuketta — kaikki sivut yhtä pitkät ja suorat kulmat — ja kolme säädintä: litistä, vinouta, kierrä. Kiertäminen ei irrota lipuketta koskaan. Vinouttaminen irrottaa. Jätä yksi muoto viereen, niin näet kaksi kerralla.",
    "about": [
      "Pinta, jolla on yksi muoto, ja kaksi lipuketta kiinni muodossa: toinen sanoo, että kaikki sivut ovat yhtä pitkät, toinen että kulmat ovat suoria. Kolme säädintä liikuttaa muotoa — litistä, vinouta, kierrä — ja lipukkeet vastaavat. Kiertäminen on se säädin, joka ei muuta koskaan mitään, eikä siinä ole yhtään lovea, sillä lovi merkitsee kohtaa, jossa ylittäminen irrottaa lipukkeen, ja siinä säätimessä sellaista kohtaa ei ole. Laite sanoo tämän omalla rakenteellaan, ennen kuin kukaan koskee siihen.",
      "Vinouttaminen on aivan toinen asia. Vinouta tarpeeksi, ja suorien kulmien lipuke irtoaa: jäljelle jää muoto, jossa on neljä yhtä pitkää sivua mutta joka ei ole enää neliö. Juuri tätä eroa varten pinta on rakennettu: kallistaminen ja vääntäminen saavat molemmat neliön nojalleen, ja vain toinen niistä maksaa jotakin. Muualla tällä sivustolla muoto saapuu jo kallistettuna tai litistettynä ja luokka päättää, mihin laatikkoon se kuuluu; täällä luokka tekee muutoksen itse ja näkee rajan ylittyvän.",
      "Se, että nojallaan oleva neliö tunnistetaan huonommin kuin pystyssä oleva, on havaittu jo kolmenkymmenen kuukauden ikäisillä lapsilla, siis kauan ennen mitään koulunkäyntiä: se ei synny luokkahuoneessa, eikä kukaan ole osoittanut, mistä se syntyy. Kun jätät muodon viereen, se jää pinnalle kädessä olevan viereen, jolloin kahta muotoa verrataan vierekkäin sen sijaan, että ne muistettaisiin peräkkäin. Mitään ei merkitä oikeaksi tai vääräksi: lipuke kertoo ominaisuuden ja palaa täsmälleen yhtä äänekkäästi kuin se lähti — sama väri, sama matka. Pisteitä ei ole eikä kelloa. Tämä rutiini on tutkimukseen perustuva, ei vaikuttavuusnäyttöön perustuva: kuvaamme, mitä laite tekee, emmekä väitä sillä olevan mitattua vaikutusta.",
      "Koko väline on ilmainen: kaikki muodot, kaikki kolme säädintä, lipukkeet ja viereen jätetty muoto. Opettajatilaus lisää tulostettavan arkin, jossa näkyvät pinnalle jätetyt muodot ja rivit kirjoittamista varten."
    ],
    "howToUse": [
      "Ota muoto esiin ja kierrä sitä, vaikka kokonainen kierros. Kysy, mitä lipukkeille tapahtui. Ei mitään — eikä siinä säätimessä ole loveja, joten laite sanoo sen jo ennen sinua.",
      "Ota nyt vinouttamisen säädin ja liikuta sitä hitaasti. Pysähdy sillä hetkellä, kun lipuke irtoaa, ja kysy, mikä tästä muodosta on yhä totta ja mikä on lakannut olemasta.",
      "Jätä tuo muoto viereen ja vie toinen takaisin, kunnes lipuke pitää jälleen. Nyt ne ovat vierekkäin samalla pinnalla, ja siitä on kyse: niitä verrataan, ei muisteta peräkkäin.",
      "Anna luokalle tehtävä: saa kaikki lipukkeet pitämään yhtä aikaa. Sitten vaikeampi — irrota täsmälleen yksi, ja vain yksi."
    ],
    "classroomIdeas": [
      "Kaksi minuuttia tunnin aluksi: yksi muoto kierretään kokonainen kierros ja vinoutetaan sitten, kunnes lipuke irtoaa. Yksi lause taululle siitä, mikä muuttui ja mikä ei.",
      "Ota arvaus ennen kuin säädintä liikutetaan — irtoaako tästä lipuke? — ja kirjoita kaikki arvaukset näkyviin ennen kuin mitään tapahtuu.",
      "Vaihda pinta kolmisivuiseksi. Koko laitteessa on täsmälleen kaksi asetusta, jotka tuovat suoran kulman kolmisivuiseen muotoon, ja niiden löytäminen on aitoa etsintää."
    ]
  }
};
