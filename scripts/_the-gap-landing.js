/* =====================================================================
   TOOL #56 — THE GAP: the eleven ToolEntry landing records.
   ---------------------------------------------------------------------
   ⚠ NOT machine-translated and NOT concatenated out of the tool's UI
   strings. Each locale is written in ITS OWN apparatus vocabulary — the
   GROUND / MARKS / GAP nouns the ten native panels chose in
   `scripts/_the-gap-strings.js`, never a calque of the English:

     en ground / marks / the gap        de Boden / Kiesel / Zwischenzeit
     fr sol / billes / l'éclipse        es suelo / marcas / parpadeo
     pt chão / bolinhas / intervalo     it riva / sassi / frattempo
     nl stoep / knikkers / tussentijd   sv golvet / prickar / ögonblicket
     da jorden / kastanjer / mellemtiden
     no bakken / punkt / øyeblikket     fi maa / merkit / väliaika

   ⚠ `name` is the tool's OWN title per locale. en comes from
   `mini tools/the-gap.js` strings.title; the other ten come from
   `scripts/_the-gap-strings.js`, the ten native panels' consolidated
   output, because the tool source still ships EN-only strings. Several
   are deliberately NOT translations of each other (pt "O que aconteceu
   no intervalo", no "Øyeblikket vi ikke ser").

   ⚠ THE PLAN NAME IS THE SHIPPED ONE PER LOCALE, never "Premium" —
   Teacher plan / Lehrkraft-Abo / abonnement Enseignant / plan Docente /
   plano Professor / piano Insegnante / Leerkracht-abonnement /
   Lärarplanen / Lærerabonnementet (da+no) / Opettajatilaus, matching
   each locale's own `lockedTitle` in the tool.

   ---------------------------------------------------------------------
   ⚠⚠ THE PEDAGOGY PANEL RULED DO NOT BUILD, AND THESE ARE THE
   CONDITIONS UNDER WHICH IT SHIPS. Every one of them binds this file:

     · NO EFFICACY CLAIM anywhere. Every locale says "research-based,
       not evidence-based" in its own register and states plainly that
       no measured effect is claimed.
     · NOT "the second rung of the difficulty ladder" — measured, it is
       FIFTH OF ELEVEN. The claim appears in no locale.
     · NOT "children believe maths runs left to right" — that is the
       equals-sign misconception, a different literature, and this tool
       NEVER DISPLAYS AN EQUALS SIGN.
     · NOT "teachers avoid these problems" — no classroom-practice study
       exists. What IS sayable, and is all that is said: join-change-
       unknown appeared ZERO TIMES in three of four grade-1 textbooks
       examined in the 1980s, and it is harder than the result-unknown
       question those pages do carry.
     · NO Behr/Erlwanger/Nichols percentages, no Rittle-Johnson 68%, no
       McNeil per-age figures, no Carpenter 1989, no Riley ladder.

   Slugs are native, /^[a-z0-9-]+$/, ASCII-folded (sv ö→o, da+no ø→o,
   å→a) and checked against all 984 shipped tool + maker slugs.
   ===================================================================== */
'use strict';
module.exports = {

  "en": {
    "name": "The Gap",
    "slug": "the-gap-what-changed-while-you-could-not-see-grade-1",
    "tagline": "Count what is on the ground. The gap covers it for a moment, and when it lifts the count is different — the class works out what happened while nobody could see.",
    "metaTitle": "The Gap — what changed while you could not see, Grade 1",
    "metaDescription": "Free whiteboard tool: marks on the ground, a gap that takes them out of sight, and a different count when it lifts. The ground shows only whether something came or went, never how much.",
    "about": [
      "A ground with marks on it, and a number the class counts out loud together. Then the gap: the marks are not hidden behind anything — while the gap lasts they are not drawn at all, so there is nothing on the screen to peer at. What is left is the ground itself, and one single pulse travels along it, inward or outward. That pulse says that something happened and which way it went. It looks exactly the same for one mark as for six, so the amount never leaks.",
      "When the gap lifts, count again. The start is known, the finish is known, and the one thing nobody saw is the size of the change. That is the question worksheets almost never ask: in three of four grade-1 textbooks examined in the 1980s it did not appear a single time. It is harder than the usual question about the result, and that difficulty is worth a conversation in class rather than a correction.",
      "A child states a theory by tapping a number. The apparatus acts it out and lands where it lands — on the same ground, in the same colour, at the same size. No comparison is computed anywhere: nothing turns green, nothing turns red, and no sentence says wrong. The child sees that two numbers are not the same and carries on from there. There are no points and no clock. This routine is research-based, not evidence-based: we describe what the apparatus does and claim no measured effect for it.",
      "Everything here is free — every new ground, every gap, and as many tries as the class wants. The Teacher plan adds the printable sheet, which carries the ground before and after exactly as the class just watched it, with ruled lines for the number sentences they wrote."
    ],
    "howToUse": [
      "Deal a ground and count it together, out loud. Nothing runs against a clock — the counting may take as long as it takes.",
      "Send it through the gap. Ask the class to watch the ground: it is the only thing that stays, and it shows one thing only — something came in, or something went out.",
      "When the gap lifts, count again and write both numbers where everyone can see them. Then comes the real question: how many, while we could not see?",
      "Take a theory from a child and tap that number in. The apparatus starts from the first count and lands wherever the theory leads. If it lands somewhere other than the class counted, that is not a mistake but a piece of information — ask what it tells you."
    ],
    "classroomIdeas": [
      "Two minutes a day: one ground, one gap, one number sentence on the board. The sentence is the goal; counting is the way there.",
      "Collect three different theories and write them all up before anything is tapped. Then act them out one at a time and watch where each one lands.",
      "Use the same starting count twice — once with something coming in, once with something going out. The only difference is the pulse, and it is worth asking what the class actually saw."
    ]
  },

  "de": {
    "name": "Die Zwischenzeit",
    "slug": "die-zwischenzeit-was-ist-dazwischen-passiert-klasse-1",
    "tagline": "Zählt, was auf dem Boden liegt. In der Zwischenzeit ist nichts zu sehen, und danach sind es andere — herauszufinden ist, was dazwischen passiert ist.",
    "metaTitle": "Die Zwischenzeit — was ist passiert, während ihr nichts saht? Klasse 1",
    "metaDescription": "Kostenloses Tafelwerkzeug: Kiesel auf dem Boden, eine Zwischenzeit, in der nichts zu sehen ist, und danach eine andere Anzahl. Der Boden verrät nur die Richtung, nie wie viel.",
    "about": [
      "Ein Boden mit Kieseln darauf und eine Anzahl, die die Klasse gemeinsam laut zählt. Dann kommt die Zwischenzeit: Die Kiesel sind nicht hinter etwas versteckt — solange sie läuft, werden sie gar nicht gezeichnet, es gibt also nichts, worauf man schielen könnte. Übrig bleibt der Boden selbst, und über ihn läuft ein einziger Impuls, nach innen oder nach außen. Er sagt, dass etwas passiert ist und in welche Richtung. Bei einem Kiesel sieht er genauso aus wie bei sechs — die Menge verrät er nie.",
      "Ist die Zwischenzeit vorbei, wird noch einmal gezählt. Der Anfang ist bekannt, das Ende ist bekannt, und unbekannt bleibt genau das, was niemand gesehen hat: wie groß die Veränderung war. Diese Frage stellen Arbeitshefte fast nie — in drei von vier untersuchten Erstklassbüchern der 1980er-Jahre kam sie kein einziges Mal vor. Sie ist schwerer als die übliche Frage nach dem Ergebnis, und dieses Schwerersein ist ein Gespräch in der Klasse wert und keine Korrektur.",
      "Ein Kind sagt seine Vermutung, indem es eine Zahl antippt. Das Werkzeug spielt sie durch und landet, wo es eben landet — auf demselben Boden, in derselben Farbe, in derselben Größe. Verglichen wird nirgends: nichts wird grün, nichts wird rot, kein Satz sagt falsch. Das Kind sieht, dass zwei Zahlen nicht gleich sind, und macht von dort aus weiter. Es gibt keine Punkte und keine Uhr. Diese Routine ist forschungsgestützt, nicht evidenzbasiert: Wir beschreiben, was das Werkzeug tut, und behaupten keine gemessene Wirkung.",
      "Alles hier ist kostenlos: jeder neue Boden, jede Zwischenzeit und so viele Versuche, wie die Klasse mag. Das Lehrkraft-Abo bringt zusätzlich das Blatt zum Ausdrucken — der Boden vorher und nachher, genau so, wie die Klasse ihn gerade gesehen hat, und Linien für die Rechnungen, die dabei entstanden sind."
    ],
    "howToUse": [
      "Einen Boden austeilen und gemeinsam laut zählen. Nichts läuft gegen die Uhr — das Zählen darf so lange dauern, wie es dauert.",
      "Die Zwischenzeit starten. Sagt der Klasse, sie soll auf den Boden schauen: Er ist das Einzige, was bleibt, und er zeigt nur eines — es ist etwas dazugekommen, oder es ist etwas weggegangen.",
      "Danach noch einmal zählen und beide Zahlen gut sichtbar aufschreiben. Dann kommt die eigentliche Frage: Wie viele waren es, während wir nichts sehen konnten?",
      "Eine Vermutung aus der Klasse annehmen und die Zahl antippen. Das Werkzeug beginnt bei der ersten Anzahl und landet dort, wohin die Vermutung führt. Landet es woanders als die Klasse gezählt hat, ist das kein Fehler, sondern eine Information — fragt, was sie euch sagt."
    ],
    "classroomIdeas": [
      "Zwei Minuten am Tag: ein Boden, eine Zwischenzeit, eine Rechnung an der Tafel. Die Rechnung ist das Ziel, das Zählen der Weg dorthin.",
      "Erst drei verschiedene Vermutungen einsammeln und alle anschreiben, bevor irgendetwas angetippt wird. Danach eine nach der anderen durchspielen und zuschauen, wo jede landet.",
      "Dieselbe Anfangszahl zweimal nehmen — einmal kommt etwas dazu, einmal geht etwas weg. Der Unterschied liegt allein im Impuls, und es lohnt sich zu fragen, was die Klasse tatsächlich gesehen hat."
    ]
  },

  "fr": {
    "name": "L’Éclipse",
    "slug": "l-eclipse-chercher-ce-qui-a-change-cp",
    "tagline": "Comptez les billes sur le sol. Pendant l’éclipse on ne voit plus rien, et après il n’y en a plus le même nombre — reste à trouver ce qui s’est passé.",
    "metaTitle": "L’Éclipse — chercher ce qui a changé pendant qu’on ne voyait rien, CP",
    "metaDescription": "Outil de tableau gratuit : des billes sur le sol, une éclipse qui les fait disparaître et un autre compte à la fin. Le sol dit seulement si quelque chose est entré ou sorti, jamais combien.",
    "about": [
      "Un sol avec des billes dessus et un nombre que la classe compte à voix haute. Puis l’éclipse : les billes ne sont pas cachées derrière quelque chose — tant qu’elle dure, elles ne sont pas dessinées du tout, il n’y a donc rien à scruter. Il ne reste que le sol, et une seule onde le parcourt, vers l’intérieur ou vers l’extérieur. Elle dit qu’il s’est passé quelque chose et dans quel sens. Elle est exactement la même pour une bille que pour six : la quantité, elle ne la laisse jamais échapper.",
      "Quand l’éclipse est finie, on recompte. Le départ est connu, l’arrivée est connue, et ce que personne n’a vu, c’est justement la taille du changement. C’est la question que les fichiers ne posent presque jamais : dans trois manuels de première année sur quatre étudiés dans les années 1980, elle n’apparaissait pas une seule fois. Elle est plus difficile que la question habituelle sur le résultat, et cette difficulté mérite une discussion en classe plutôt qu’une correction.",
      "Un enfant propose une idée en touchant un nombre. L’outil la joue et arrive là où elle mène — sur le même sol, de la même couleur, à la même taille. Aucune comparaison n’est calculée nulle part : rien ne devient vert, rien ne devient rouge, aucune phrase ne dit faux. L’enfant voit que deux nombres ne sont pas les mêmes et repart de là. Il n’y a ni points ni chronomètre. Cette routine s’appuie sur la recherche sans être validée par des preuves d’efficacité : nous décrivons ce que fait l’outil et n’annonçons aucun effet mesuré.",
      "Tout est gratuit ici : chaque nouveau sol, chaque éclipse et autant d’essais que la classe veut. L’abonnement Enseignant ajoute la fiche imprimée, qui reprend le sol avant et après tel que la classe vient de le voir, avec des lignes réglées pour les calculs qu’elle a écrits."
    ],
    "howToUse": [
      "Distribuez un sol et comptez ensemble à voix haute. Rien n’est chronométré : le comptage prend le temps qu’il faut.",
      "Lancez l’éclipse. Demandez à la classe de regarder le sol : c’est la seule chose qui reste, et il ne montre qu’une chose — quelque chose est entré, ou quelque chose est sorti.",
      "Quand c’est fini, recomptez et écrivez les deux nombres bien en vue. Puis posez la vraie question : combien, pendant qu’on ne voyait rien ?",
      "Prenez l’idée d’un enfant et touchez ce nombre. L’outil part du premier compte et arrive là où cette idée le mène. S’il n’arrive pas là où la classe a compté, ce n’est pas une faute mais un renseignement — demandez ce qu’il vous apprend."
    ],
    "classroomIdeas": [
      "Deux minutes par jour : un sol, une éclipse, un calcul écrit au tableau. Le calcul est le but, le comptage est le chemin.",
      "Récoltez trois idées différentes et écrivez-les toutes avant de toucher quoi que ce soit. Jouez-les ensuite l’une après l’autre et regardez où chacune arrive.",
      "Reprenez le même nombre de départ deux fois : une fois quelque chose entre, une fois quelque chose sort. Seule l’onde change, et il vaut la peine de demander ce que la classe a vraiment vu."
    ]
  },

  "es": {
    "name": "El parpadeo",
    "slug": "el-parpadeo-que-paso-mientras-nadie-miraba-1-primaria",
    "tagline": "Cuenten las marcas del suelo. En el parpadeo no se ve nada, y al final el número es otro: falta averiguar qué pasó mientras nadie miraba.",
    "metaTitle": "El parpadeo — qué pasó mientras nadie miraba, 1.º de primaria",
    "metaDescription": "Herramienta gratuita para la pizarra: marcas en el suelo, un parpadeo que las quita de la vista y otro recuento al final. El suelo solo dice si algo entró o salió, nunca cuánto.",
    "about": [
      "Un suelo con marcas encima y un número que la clase cuenta en voz alta. Luego llega el parpadeo: las marcas no quedan escondidas detrás de nada — mientras dura, sencillamente no se dibujan, así que no hay nada que espiar. Lo único que queda es el suelo, y por él recorre un solo pulso, hacia dentro o hacia fuera. Ese pulso dice que ha pasado algo y hacia dónde. Es idéntico para una marca que para seis: la cantidad no la deja escapar nunca.",
      "Cuando el parpadeo termina, se vuelve a contar. El principio se sabe, el final se sabe, y lo que nadie ha visto es justo el tamaño del cambio. Es la pregunta que los cuadernos casi nunca traen: en tres de cada cuatro libros de primer curso estudiados en los años ochenta no aparecía ni una sola vez. Es más difícil que la pregunta habitual por el resultado, y esa dificultad merece una conversación en clase antes que una corrección.",
      "Un niño dice su idea tocando un número. La herramienta la representa y llega adonde llega — sobre el mismo suelo, del mismo color y del mismo tamaño. No se calcula ninguna comparación en ningún sitio: nada se vuelve verde, nada se vuelve rojo, ninguna frase dice mal. El niño ve que dos números no son el mismo y sigue desde ahí. No hay puntos ni reloj. Esta rutina está basada en la investigación, no en pruebas de eficacia: describimos lo que hace la herramienta y no afirmamos ningún efecto medido.",
      "Aquí todo es gratis: cada suelo nuevo, cada parpadeo y todas las ideas que la clase quiera probar. El plan Docente añade la hoja impresa, con el suelo antes y después tal como la clase acaba de verlo y renglones para las operaciones que escribieron."
    ],
    "howToUse": [
      "Reparte un suelo y cuéntenlo juntos en voz alta. Nada corre contra el reloj: contar puede llevar el tiempo que haga falta.",
      "Haz que pase el parpadeo. Pide a la clase que mire el suelo: es lo único que se queda, y solo enseña una cosa — entró algo, o salió algo.",
      "Al terminar, vuelvan a contar y escribe los dos números donde todos los vean. Después llega la pregunta de verdad: ¿cuántas, mientras no mirábamos?",
      "Toma la idea de un niño y toca ese número. La herramienta parte del primer recuento y llega adonde esa idea la lleve. Si llega a otro sitio que el que contó la clase, no es un error sino un dato — pregunta qué os dice."
    ],
    "classroomIdeas": [
      "Dos minutos al día: un suelo, un parpadeo y una operación en la pizarra. La operación es la meta; contar es el camino.",
      "Recoge tres ideas distintas y escríbelas todas antes de tocar nada. Después represéntalas una tras otra y que la clase mire adónde llega cada una.",
      "Usa el mismo recuento inicial dos veces: una con algo que entra y otra con algo que sale. Lo único distinto es el pulso, y conviene preguntar qué vio la clase exactamente."
    ]
  },

  "pt": {
    "name": "O que aconteceu no intervalo",
    "slug": "o-intervalo-o-que-aconteceu-enquanto-ninguem-via-1-ano",
    "tagline": "Contem as bolinhas no chão. No intervalo não dá para ver nada, e no fim o número é outro: falta descobrir o que aconteceu enquanto ninguém via.",
    "metaTitle": "O que aconteceu no intervalo — quanto mudou sem ninguém ver, 1.º ano",
    "metaDescription": "Ferramenta gratuita de lousa: bolinhas no chão, um intervalo que as tira da vista e outra contagem no fim. O chão só mostra se algo entrou ou saiu, nunca quanto.",
    "about": [
      "Um chão com bolinhas em cima e um número que a turma conta em voz alta. Depois vem o intervalo: as bolinhas não ficam escondidas atrás de nada — enquanto ele dura, elas simplesmente não são desenhadas, então não há o que espiar. Sobra o próprio chão, e por ele passa um único pulso, para dentro ou para fora. Esse pulso diz que aconteceu alguma coisa e para que lado. Ele é igualzinho para uma bolinha e para seis: a quantidade ele nunca entrega.",
      "Quando o intervalo acaba, conta-se de novo. O começo se sabe, o fim se sabe, e o que ninguém viu é justamente o tamanho da mudança. É a pergunta que os cadernos quase nunca trazem: em três de quatro livros de 1.º ano examinados nos anos 1980 ela não apareceu nenhuma vez. É mais difícil que a pergunta comum pelo resultado, e essa dificuldade merece uma conversa na aula em vez de uma correção.",
      "Uma criança diz a ideia dela tocando um número. A ferramenta representa a ideia e chega aonde chega — no mesmo chão, na mesma cor e no mesmo tamanho. Nenhuma comparação é calculada em lugar nenhum: nada fica verde, nada fica vermelho, nenhuma frase diz errado. A criança vê que dois números não são iguais e segue dali. Não há pontos nem relógio. Esta rotina é baseada em pesquisa, mas não em provas de eficácia: descrevemos o que a ferramenta faz e não afirmamos nenhum efeito medido.",
      "Aqui tudo é grátis: cada chão novo, cada intervalo e quantas tentativas a turma quiser. O plano Professor acrescenta a folha impressa, com o chão antes e depois exatamente como a turma acabou de ver, e linhas pautadas para as sentenças matemáticas que ela escreveu."
    ],
    "howToUse": [
      "Distribua um chão e contem juntos em voz alta. Nada é cronometrado: contar pode levar o tempo que precisar.",
      "Comece o intervalo. Peça que a turma olhe para o chão: é a única coisa que fica, e ele mostra só uma coisa — entrou alguma coisa, ou saiu alguma coisa.",
      "Quando acabar, contem de novo e escreva os dois números à vista de todos. Aí vem a pergunta de verdade: quantas, enquanto ninguém via?",
      "Pegue a ideia de uma criança e toque nesse número. A ferramenta parte da primeira contagem e chega aonde essa ideia leva. Se chegar a outro lugar do que a turma contou, não é erro e sim informação — pergunte o que ela diz a vocês."
    ],
    "classroomIdeas": [
      "Dois minutos por dia: um chão, um intervalo e uma conta na lousa. A conta é o objetivo; contar é o caminho.",
      "Recolha três ideias diferentes e escreva todas antes de tocar em qualquer coisa. Depois represente uma por uma e deixe a turma ver aonde cada uma chega.",
      "Use a mesma contagem inicial duas vezes: uma com algo entrando e outra com algo saindo. A única diferença é o pulso, e vale perguntar o que a turma viu de fato."
    ]
  },

  "it": {
    "name": "Il frattempo",
    "slug": "il-frattempo-che-cosa-e-cambiato-mentre-non-si-vedeva-classe-1",
    "tagline": "Contate i sassi sulla riva. Nel frattempo non si vede niente, e alla fine sono un altro numero: resta da capire che cosa è successo.",
    "metaTitle": "Il frattempo — che cosa è successo mentre non si vedeva, classe 1",
    "metaDescription": "Strumento gratuito per la LIM: sassi sulla riva, un frattempo in cui non si vede nulla e un altro conteggio alla fine. La riva dice solo se qualcosa è entrato o uscito, mai quanto.",
    "about": [
      "Una riva con dei sassi sopra e un numero che la classe conta ad alta voce insieme. Poi arriva il frattempo: i sassi non sono nascosti dietro qualcosa — finché dura, non vengono disegnati affatto, quindi non c’è niente da sbirciare. Resta la riva, e su di essa corre una sola onda, verso l’interno o verso l’esterno. Quell’onda dice che è successo qualcosa e in che direzione. È identica per un sasso e per sei: la quantità non la lascia mai trapelare.",
      "Quando il frattempo è passato, si conta di nuovo. L’inizio si sa, la fine si sa, e quello che nessuno ha visto è proprio quanto è cambiato. È la domanda che i quaderni non fanno quasi mai: in tre libri di prima su quattro esaminati negli anni Ottanta non compariva nemmeno una volta. È più difficile della solita domanda sul risultato, e di quella difficoltà vale la pena parlare in classe invece di correggerla.",
      "Un bambino dice la sua idea toccando un numero. Lo strumento la mette in scena e arriva dove arriva — sulla stessa riva, dello stesso colore e della stessa grandezza. Nessun confronto viene calcolato da nessuna parte: niente diventa verde, niente diventa rosso, nessuna frase dice sbagliato. Il bambino vede che due numeri non sono uguali e riparte da lì. Non ci sono punti né cronometro. Questa routine si basa sulla ricerca ma non su prove di efficacia: descriviamo quello che lo strumento fa e non dichiariamo nessun effetto misurato.",
      "Qui è tutto gratuito: ogni riva nuova, ogni frattempo e tutte le prove che la classe vuole fare. Il piano Insegnante aggiunge la scheda da stampare, con la riva prima e dopo esattamente come l’ha vista la classe e le righe per le operazioni che ha scritto."
    ],
    "howToUse": [
      "Distribuite una riva e contate insieme ad alta voce. Niente va a tempo: contare può durare quanto serve.",
      "Fate partire il frattempo. Chiedete alla classe di guardare la riva: è l’unica cosa che resta e mostra una cosa sola — è entrato qualcosa, oppure è uscito qualcosa.",
      "Quando è passato, contate di nuovo e scrivete i due numeri bene in vista. Poi arriva la domanda vera: quanti, mentre non si vedeva?",
      "Prendete l’idea di un bambino e toccate quel numero. Lo strumento parte dal primo conteggio e arriva dove porta quell’idea. Se arriva altrove rispetto a quanto ha contato la classe, non è un errore ma un’informazione — chiedete che cosa vi dice."
    ],
    "classroomIdeas": [
      "Due minuti al giorno: una riva, un frattempo e un’operazione scritta alla lavagna. L’operazione è l’obiettivo, contare è la strada.",
      "Raccogliete tre idee diverse e scrivetele tutte prima di toccare qualsiasi cosa. Poi mettetele in scena una dopo l’altra e guardate dove arriva ciascuna.",
      "Usate due volte lo stesso conteggio di partenza: una volta entra qualcosa, una volta esce. L’unica differenza è l’onda, e vale la pena chiedere che cosa ha visto davvero la classe."
    ]
  },

  "nl": {
    "name": "De tussentijd",
    "slug": "de-tussentijd-wat-is-er-veranderd-terwijl-je-niet-keek-groep-3",
    "tagline": "Tel de knikkers op de stoep. In de tussentijd zie je even niets, en daarna zijn het er andere — uitzoeken wat er gebeurd is.",
    "metaTitle": "De tussentijd — wat veranderde er terwijl je niet keek? Groep 3",
    "metaDescription": "Gratis digibordtool: knikkers op de stoep, een tussentijd waarin je niets ziet en daarna een ander aantal. De stoep laat alleen zien of er iets bij kwam of weg ging, nooit hoeveel.",
    "about": [
      "Een stoep met knikkers erop en een aantal dat de klas samen hardop telt. Dan komt de tussentijd: de knikkers zitten niet ergens achter verstopt — zolang die loopt, worden ze helemaal niet getekend, dus er valt niets te spieken. Wat overblijft is de stoep zelf, en daar loopt één golf overheen, naar binnen of naar buiten. Die golf zegt dat er iets gebeurd is en welke kant op. Bij één knikker ziet hij er precies zo uit als bij zes: het aantal verraadt hij nooit.",
      "Als de tussentijd voorbij is, tel je opnieuw. Het begin weet je, het eind weet je, en wat niemand gezien heeft is juist hoe groot de verandering was. Dat is de vraag die op werkbladen bijna nooit staat: in drie van de vier onderzochte eersteklasboeken uit de jaren tachtig kwam hij geen enkele keer voor. Hij is lastiger dan de gewone vraag naar de uitkomst, en dat lastige is een gesprek in de klas waard in plaats van een verbetering.",
      "Een kind zegt zijn idee door een getal aan te tikken. De tool speelt het na en komt uit waar het uitkomt — op dezelfde stoep, in dezelfde kleur, even groot. Nergens wordt iets vergeleken: niets wordt groen, niets wordt rood, geen enkele zin zegt fout. Het kind ziet dat twee getallen niet hetzelfde zijn en gaat vanaf daar verder. Er zijn geen punten en er loopt geen klok. Deze routine is gebaseerd op onderzoek, maar niet op bewezen effect: we beschrijven wat de tool doet en claimen geen gemeten resultaat.",
      "Alles hier is gratis: elke nieuwe stoep, elke tussentijd en zoveel ideeën als de klas wil. Het Leerkracht-abonnement voegt het afdrukbare blad toe, met de stoep ervoor en erna precies zoals de klas hem net zag, en lijnen voor de sommen die erbij bedacht zijn."
    ],
    "howToUse": [
      "Deel een stoep uit en tel samen hardop. Er loopt geen klok: tellen mag zo lang duren als nodig is.",
      "Laat de tussentijd lopen. Vraag de klas naar de stoep te kijken: dat is het enige wat blijft, en hij laat maar één ding zien — er is iets bij gekomen, of er is iets weg gegaan.",
      "Tel daarna opnieuw en schrijf beide getallen goed zichtbaar op. Dan komt de echte vraag: hoeveel, terwijl we niet konden kijken?",
      "Neem het idee van een kind en tik dat getal aan. De tool begint bij het eerste aantal en komt uit waar dat idee heen leidt. Komt hij ergens anders uit dan de klas telde, dan is dat geen fout maar informatie — vraag wat het jullie vertelt."
    ],
    "classroomIdeas": [
      "Twee minuten per dag: één stoep, één tussentijd, één som op het bord. De som is het doel, tellen is de weg ernaartoe.",
      "Verzamel drie verschillende ideeën en schrijf ze allemaal op voordat er iets aangetikt wordt. Speel ze daarna één voor één na en kijk waar elk idee uitkomt.",
      "Neem hetzelfde beginaantal twee keer: één keer komt er iets bij, één keer gaat er iets weg. Alleen de golf verschilt, en het is de moeite waard te vragen wat de klas precies zag."
    ]
  },

  "sv": {
    "name": "Ögonblicket",
    "slug": "ogonblicket-vad-hande-medan-ni-inte-sag-arskurs-1",
    "tagline": "Räkna prickarna på golvet. Under ögonblicket syns ingenting, och efteråt är de ett annat antal — kvar står frågan vad som hände.",
    "metaTitle": "Ögonblicket — vad hände medan ni inte såg? Årskurs 1",
    "metaDescription": "Gratis tavelverktyg: prickar på golvet, ett ögonblick då ingenting syns och ett annat antal efteråt. Golvet visar bara om något kom eller gick, aldrig hur många.",
    "about": [
      "Ett golv med prickar på och ett antal som klassen räknar högt tillsammans. Sedan kommer ögonblicket: prickarna gömmer sig inte bakom någonting — så länge det pågår ritas de inte alls, så det finns ingenting att kika på. Kvar finns golvet, och över det går en enda våg, inåt eller utåt. Vågen säger att något har hänt och åt vilket håll. Den ser likadan ut för en prick som för sex: antalet avslöjar den aldrig.",
      "När ögonblicket är över räknar ni igen. Början vet ni, slutet vet ni, och det ingen har sett är just hur stor förändringen var. Det är frågan som arbetsböcker nästan aldrig ställer: i tre av fyra granskade förstaklassböcker från 1980-talet fanns den inte en enda gång. Den är svårare än den vanliga frågan efter svaret, och den svårigheten är värd ett samtal i klassen i stället för en rättning.",
      "Ett barn säger sitt förslag genom att trycka på ett tal. Verktyget spelar upp det och hamnar där det hamnar — på samma golv, i samma färg, i samma storlek. Ingen jämförelse räknas ut någonstans: ingenting blir grönt, ingenting blir rött, ingen mening säger fel. Barnet ser att två tal inte är samma och går vidare därifrån. Det finns inga poäng och ingen klocka. Den här rutinen är forskningsnära men inte evidensbaserad: vi beskriver vad verktyget gör och påstår ingen uppmätt effekt.",
      "Allt här är gratis: varje nytt golv, varje ögonblick och hur många förslag klassen vill. Lärarplanen lägger till arbetsbladet som visar golvet före och efter precis som klassen såg det, med linjerade rader för de likheter ni skrev."
    ],
    "howToUse": [
      "Dela ut ett golv och räkna högt tillsammans. Ingenting går på tid — räknandet får ta den tid det tar.",
      "Låt ögonblicket gå. Be klassen titta på golvet: det är det enda som är kvar, och det visar bara en sak — något kom in, eller något gick ut.",
      "Räkna igen efteråt och skriv upp båda talen så att alla ser dem. Sedan kommer den riktiga frågan: hur många, medan vi inte kunde se?",
      "Ta ett förslag från ett barn och tryck på talet. Verktyget utgår från den första räkningen och hamnar där förslaget leder. Hamnar det någon annanstans än klassen räknade är det inget fel utan en upplysning — fråga vad den säger er."
    ],
    "classroomIdeas": [
      "Två minuter varje dag: ett golv, ett ögonblick och en likhet på tavlan. Likheten är målet, räknandet är vägen dit.",
      "Samla in tre olika förslag och skriv upp alla innan något trycks. Spela sedan upp dem ett i taget och se var vart och ett hamnar.",
      "Använd samma startantal två gånger: en gång kommer något in, en gång går något ut. Det enda som skiljer är vågen, och det är värt att fråga vad klassen faktiskt såg."
    ]
  },

  "da": {
    "name": "Mellemtiden",
    "slug": "mellemtiden-hvad-skete-der-imens-1-klasse",
    "tagline": "Tæl kastanjerne på jorden. I mellemtiden er der ikke noget at se, og bagefter er der et andet antal — så mangler I bare at finde ud af, hvad der skete.",
    "metaTitle": "Mellemtiden — hvad skete der, mens I ikke kunne se det? 1. klasse",
    "metaDescription": "Gratis tavleværktøj: kastanjer på jorden, en mellemtid hvor intet kan ses, og et andet antal bagefter. Jorden viser kun, om der kom noget ind eller gik noget ud — aldrig hvor meget.",
    "about": [
      "En jord med kastanjer på og et antal, som klassen tæller højt sammen. Så kommer mellemtiden: kastanjerne gemmer sig ikke bag noget — så længe den varer, bliver de slet ikke tegnet, så der er ingenting at kigge efter. Tilbage er jorden selv, og hen over den løber én eneste bølge, indad eller udad. Bølgen siger, at der er sket noget, og hvilken vej. Den ser præcis ens ud ved én kastanje og ved seks: mængden røber den aldrig.",
      "Når mellemtiden er forbi, tæller I igen. Begyndelsen kender I, slutningen kender I, og det, ingen har set, er netop, hvor stor ændringen var. Det er det spørgsmål, opgavehæfter næsten aldrig stiller: i tre ud af fire undersøgte 1.-klassesbøger fra 1980'erne optrådte det ikke en eneste gang. Det er sværere end det sædvanlige spørgsmål om resultatet, og den sværhed er en snak i klassen værd frem for en rettelse.",
      "Et barn siger sit forslag ved at trykke på et tal. Værktøjet spiller det igennem og lander, hvor det lander — på den samme jord, i den samme farve og i den samme størrelse. Der bliver ikke regnet nogen sammenligning ud nogen steder: intet bliver grønt, intet bliver rødt, og ingen sætning siger forkert. Barnet ser, at to tal ikke er ens, og går videre derfra. Der er hverken point eller ur. Rutinen her er forskningsnær, men ikke evidensbaseret: vi beskriver, hvad værktøjet gør, og påstår ingen målt effekt.",
      "Alt her er gratis: hver ny jord, hver mellemtid og lige så mange forslag, som klassen har lyst til. Lærerabonnementet giver desuden det printede ark med jorden før og efter, præcis som klassen lige har set den, og linjer til de regnestykker, klassen skrev."
    ],
    "howToUse": [
      "Del en jord ud, og tæl højt sammen. Der er ikke noget ur — tællingen må tage den tid, den tager.",
      "Lad mellemtiden gå. Bed klassen kigge på jorden: den er det eneste, der bliver tilbage, og den viser kun én ting — der kom noget ind, eller der gik noget ud.",
      "Tæl igen bagefter, og skriv begge tal op, så alle kan se dem. Så kommer det rigtige spørgsmål: hvor mange, mens vi ikke kunne se det?",
      "Tag et forslag fra et barn, og tryk på tallet. Værktøjet går ud fra den første tælling og lander der, hvor forslaget fører hen. Lander det et andet sted, end klassen talte, er det ikke en fejl, men en oplysning — spørg, hvad den fortæller jer."
    ],
    "classroomIdeas": [
      "To minutter hver dag: én jord, én mellemtid og ét regnestykke på tavlen. Regnestykket er målet, tællingen er vejen derhen.",
      "Saml tre forskellige forslag, og skriv dem alle op, før der bliver trykket på noget. Spil dem så igennem ét ad gangen, og se, hvor hvert af dem lander.",
      "Brug det samme starttal to gange: én gang kommer der noget ind, én gang går der noget ud. Det eneste, der er forskelligt, er bølgen — og det er værd at spørge, hvad klassen faktisk så."
    ]
  },

  "no": {
    "name": "Øyeblikket vi ikke ser",
    "slug": "oyeblikket-hva-skjedde-mens-dere-ikke-sa-det-1-trinn",
    "tagline": "Tell punktene på bakken. I øyeblikket er det ingenting å se, og etterpå er det et annet antall — så gjenstår det å finne ut hva som skjedde.",
    "metaTitle": "Øyeblikket vi ikke ser — hva skjedde mens dere ikke så? 1. trinn",
    "metaDescription": "Gratis tavleverktøy: punkt på bakken, et øyeblikk der ingenting er å se, og et annet antall etterpå. Bakken viser bare om noe kom eller gikk — aldri hvor mye.",
    "about": [
      "En bakke med punkt på og et antall klassen teller høyt sammen. Så kommer øyeblikket: punktene gjemmer seg ikke bak noe — så lenge det varer, blir de ikke tegnet i det hele tatt, så det er ingenting å kikke på. Igjen står bakken selv, og over den går én eneste bølge, innover eller utover. Bølgen sier at noe har skjedd, og hvilken vei. Den ser helt lik ut for ett punkt og for seks: mengden røper den aldri.",
      "Når øyeblikket er over, teller dere på nytt. Begynnelsen vet dere, slutten vet dere, og det ingen har sett, er nettopp hvor stor endringen var. Det er spørsmålet arbeidsbøker nesten aldri stiller: i tre av fire undersøkte førsteklassebøker fra 1980-tallet fantes det ikke én eneste gang. Det er vanskeligere enn det vanlige spørsmålet etter svaret, og den vanskeligheten er verdt en samtale i klassen framfor en retting.",
      "Et barn sier forslaget sitt ved å trykke på et tall. Verktøyet spiller det ut og lander der det lander — på den samme bakken, i den samme fargen og i den samme størrelsen. Ingen sammenligning blir regnet ut noe sted: ingenting blir grønt, ingenting blir rødt, og ingen setning sier feil. Barnet ser at to tall ikke er like, og går videre derfra. Det finnes verken poeng eller klokke. Denne rutinen er forskningsnær, men ikke evidensbasert: vi beskriver hva verktøyet gjør, og hevder ingen målt effekt.",
      "Alt her er gratis: hver ny bakke, hvert øyeblikk og så mange forslag klassen vil prøve. Lærerabonnementet gir i tillegg det utskrivbare arket med bakken før og etter, slik klassen nettopp så den, og linjer til regnestykkene dere skrev."
    ],
    "howToUse": [
      "Del ut en bakke, og tell høyt sammen. Ingenting går på tid — tellingen får ta den tida den trenger.",
      "Start øyeblikket. Be klassen se på bakken: den er det eneste som blir igjen, og den viser bare én ting — noe kom inn, eller noe gikk ut.",
      "Tell på nytt etterpå, og skriv opp begge tallene godt synlig. Så kommer det egentlige spørsmålet: hvor mange, mens vi ikke kunne se?",
      "Ta imot et forslag fra et barn, og trykk på tallet. Verktøyet går ut fra den første tellingen og lander der forslaget fører. Lander det et annet sted enn klassen telte, er det ingen feil, men en opplysning — spør hva den forteller dere."
    ],
    "classroomIdeas": [
      "To minutter hver dag: én bakke, ett øyeblikk og ett regnestykke på tavla. Regnestykket er målet, tellingen er veien dit.",
      "Samle tre ulike forslag, og skriv opp alle før noe blir trykket. Spill dem så ut ett om gangen, og se hvor hvert av dem lander.",
      "Bruk det samme starttallet to ganger: én gang kommer det noe inn, én gang går det noe ut. Det eneste som skiller, er bølgen — og det er verdt å spørre hva klassen faktisk så."
    ]
  },

  "fi": {
    "name": "Väliaika",
    "slug": "valiaika-mita-tapahtui-kun-kukaan-ei-nahnyt-1-luokka",
    "tagline": "Laskekaa, kuinka monta merkkiä maassa on. Väliajalla ei näy mitään, ja sen jälkeen niitä on eri määrä — jäljelle jää kysymys, mitä tapahtui.",
    "metaTitle": "Väliaika — mitä tapahtui, kun kukaan ei nähnyt? 1. luokka",
    "metaDescription": "Maksuton taulutyökalu: merkkejä maassa, väliaika jonka aikana ei näy mitään, ja eri määrä sen jälkeen. Maa näyttää vain, tuliko vai lähtikö jotakin — ei koskaan kuinka paljon.",
    "about": [
      "Maa, jossa on merkkejä, ja luku, jonka luokka laskee yhdessä ääneen. Sitten alkaa väliaika: merkit eivät piiloudu minkään taakse — väliajan ajan niitä ei piirretä lainkaan, joten mitään ei ole kurkistettavana. Jäljelle jää maa itse, ja sen yli kulkee yksi ainoa aalto, sisäänpäin tai ulospäin. Aalto kertoo, että jotakin tapahtui ja mihin suuntaan. Se näyttää täsmälleen samalta yhdellä merkillä ja kuudella: määrää se ei paljasta koskaan.",
      "Kun väliaika on ohi, lasketaan uudelleen. Alku tiedetään, loppu tiedetään, ja se mitä kukaan ei nähnyt, on juuri muutoksen suuruus. Tätä kysymystä tehtäväkirjat eivät juuri koskaan esitä: kolmessa neljästä 1980-luvulla tutkitusta ensimmäisen luokan oppikirjasta sitä ei ollut kertaakaan. Se on vaikeampi kuin tavallinen kysymys tuloksesta, ja siitä vaikeudesta kannattaa keskustella luokassa sen sijaan, että se korjattaisiin.",
      "Lapsi kertoo ehdotuksensa koskettamalla lukua. Väline toteuttaa ehdotuksen ja päätyy siihen mihin päätyy — samaan maahan, samalla värillä ja samankokoisena. Missään ei lasketa vertailua: mikään ei muutu vihreäksi eikä punaiseksi, eikä yksikään lause sano väärin. Lapsi näkee, että kaksi lukua eivät ole sama, ja jatkaa siitä. Pisteitä ei ole eikä kelloa. Tämä rutiini nojaa tutkimukseen mutta ei vaikuttavuusnäyttöön: kuvaamme sen, mitä väline tekee, emmekä väitä mitattua vaikutusta.",
      "Täällä kaikki on maksutonta: jokainen uusi maa, jokainen väliaika ja niin monta ehdotusta kuin luokka haluaa. Opettajatilaus tuo lisäksi tulostettavan paperipohjan, jossa on maa ennen ja jälkeen juuri sellaisena kuin luokka sen näki, ja viivat niille laskuille, jotka luokka kirjoitti."
    ],
    "howToUse": [
      "Jaa maa ja laskekaa yhdessä ääneen. Mikään ei käy kelloa vastaan — laskeminen saa kestää niin kauan kuin se kestää.",
      "Aloita väliaika. Pyydä luokkaa katsomaan maata: se on ainoa mikä jää, ja se näyttää vain yhden asian — jotakin tuli lisää, tai jotakin lähti pois.",
      "Laskekaa sen jälkeen uudelleen ja kirjoita molemmat luvut kaikkien nähtäville. Sitten tulee varsinainen kysymys: kuinka monta, silloin kun emme nähneet?",
      "Ota vastaan lapsen ehdotus ja kosketa sitä lukua. Väline lähtee ensimmäisestä laskusta ja päätyy sinne mihin ehdotus vie. Jos se päätyy muualle kuin mihin luokka laski, se ei ole virhe vaan tieto — kysykää, mitä se kertoo."
    ],
    "classroomIdeas": [
      "Kaksi minuuttia päivässä: yksi maa, yksi väliaika ja yksi lasku taululle. Lasku on tavoite, laskeminen on tie sinne.",
      "Kerätkää kolme erilaista ehdotusta ja kirjoittakaa ne kaikki ylös, ennen kuin mitään kosketetaan. Toteuttakaa ne sitten yksi kerrallaan ja katsokaa, mihin kukin päätyy.",
      "Käyttäkää samaa aloitusmäärää kahdesti: kerran jotakin tulee lisää, kerran jotakin lähtee pois. Ainoa ero on aalto — ja kannattaa kysyä, mitä luokka todella näki."
    ]
  }
};
