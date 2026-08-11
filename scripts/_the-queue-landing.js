/* =====================================================================
   TOOL #58 — THE QUEUE: the eleven ToolEntry landing records.
   ---------------------------------------------------------------------
   ⚠⚠ THE NAMES AND THE APPARATUS NOUNS ARE THE PANELS' OWN, READ OUT OF
   `scripts/_the-queue-locale-<loc>.js`, NOT INVENTED HERE. On #57 the
   first version of this file DID invent them, on the reasoning that the
   tool source shipped EN-only strings so the panel pass had not run —
   and eight panel files were already on disk. `register-the-queue.js`
   pre-flight 0b2 now compares every `name` against its panel file with
   EXACT STRING EQUALITY and dies on any drift, so the agreement is
   measured rather than asserted.

     en platform / walker         — "The Queue"
     de Bahnsteig / Zählmarke     — "Der Bahnsteig"
     fr quai / marcheur           — "Le quai des deux bouts"
     es andén / puntero           — "El andén"
     pt calçada / andarilho       — "A calçada de ponta a ponta"
     it pedana / chi cammina      — "La pedana da tutte e due le parti"
     nl perron / aanwijzer        — "Het perron"
     sv perrong / vandrare        — "Perrongen"
     da venteplads / pegepind     — "Tæl fra begge ender"
     no perrong / vandrer         — "Perrongen"
     fi laituri / kulkija         — "Laiturin päät"

   ⚠ Three panels did NOT translate the English title, and each was a
   ruling rather than a slip: da named the ROUTINE ("Count from both
   ends") because that is what a Danish teacher says out loud; fi named
   the two ENDS; fr and it named the apparatus AND the reversal together.
   The Norwegian panel was handed `kø` — measured free in Norwegian
   alone — and REFUSED it, because a kø has a front by definition and
   invention #1 is that neither end is home.

   ⚠⚠ sv AND no BOTH ARRIVED AT `perrong`, INDEPENDENTLY. That is a fact
   about two languages, not a collision. `resolveToolSlug` scans one
   locale's file only, and the shelf already ships thirteen cross-locale
   shared slugs — `tallinje` (sv+da+no), `linjal` (sv+no),
   `magnetbokstaver` (sv+no), `tom-tallinje` (sv+no), `diktat` (de+da+no)
   — every one of them the same tool in sibling locales.

   ---------------------------------------------------------------------
   ⚠ WHAT THIS COPY MAY AND MAY NOT SAY
   ---------------------------------------------------------------------
   · The APPARATUS may never name a position (§23.2 — "third" is a word).
     THIS FILE MAY, and must: a teacher searching for help with ordinals
     types "third", and the landing page is the SEO surface, not the
     apparatus. The recorded #44 ruling is exactly this — the no-digits
     law is for the apparatus, not the landing prose.
   · NO EFFICACY CLAIM anywhere. There are no studies for this routine
     and none is implied; the copy describes what the apparatus does.
   · NO STANDARD CLAIM. Enumerating every K math code returns the
     official 22 and NONE is ordinal; there is none in Grade 1 either.
     No locale calls this "a standard".
   · NO VEHICLE, in any locale. `calendar-wall.js:677` already ruled the
     school bus US-coded and the European coach non-iconic, and `bus`
     ships in seven languages in two other tools.
   · THE PAID PLAN IS THE SHIPPED ONE, per locale, read out of
     `frontend/messages/<loc>.json` — never "Premium", which names a plan
     that does not exist and which 28 tools already print 655 times.
   ===================================================================== */
'use strict';

module.exports = {

  en: {
    slug: 'the-queue',
    name: 'The Queue',
    tagline: 'Count three from one end, then three from the other. Nobody moved — so why is it somebody else?',
    about: [
      'Four shapes stand on a platform. Choose an end, step along, and see who you land on. Then choose the other end and take exactly the same number of steps. Nothing on the platform has moved, and yet the answer is usually a different one.',
      'That is the whole instrument. A child who has learned to count "one, two, three" along a row often hears "third" as a name the object carries, the way its colour is a name it carries. It is not: it is a report about where you started counting. The platform makes the point without arguing it, because the shapes are visibly untouched between the two counts.',
      'There is no front. The walker waits off the platform until an end is chosen, and neither button is the real one — a default end would quietly assert that one direction is the true direction, which is the misconception itself.',
      'The shapes carry no letters, no numbers and no ranking. All four are drawn to the same area and stand on the same line, so nothing in the material answers "which one" before the class does.'
    ],
    howToUse: [
      'Put it on the board and ask the class to count three along from the left-hand end. Ask who they landed on before you press anything.',
      'Now count three from the other end. Ask the question that matters: did anybody move?',
      'Let one leave the platform and count again from the same end. The far end\'s answers do not budge — that is worth noticing out loud.',
      'Switch to three waiting. With an odd number there is a place where both ends give the same answer, and finding it is the best moment the tool has.'
    ],
    classroomIdeas: [
      'Line up four children at the front of the room and run the same routine on them before you open the tool. The screen then confirms what the class already argued about.',
      'Ask a child to describe who to fetch without pointing — they will reach for "third", and then have to say third from where.',
      'Use it for two minutes at the start of a lesson on ordinal words, then leave it on screen while the class works.',
      'Print the sheet and let pairs record one count per line: which end they started from, and who they finished on. The printed sheet comes with a Teacher plan; the apparatus itself — every platform, both ends, the walker — is free for everyone.'
    ],
    metaTitle: 'The Queue — ordinal position teaching tool for K-2 | LessonCraftStudio',
    metaDescription: 'A free classroom tool for teaching ordinal position. Count from one end of the platform, then the other: nobody moves, but the answer changes. Works on any board or tablet, no account needed.'
  },

  de: {
    slug: 'der-bahnsteig',
    name: 'Der Bahnsteig',
    tagline: 'Zählt drei von einem Ende, dann drei vom anderen. Niemand hat sich bewegt — warum ist es jemand anderes?',
    about: [
      'Auf einem Bahnsteig warten vier Formen. Wählt ein Ende, geht Schritt für Schritt weiter und schaut, bei wem ihr ankommt. Nehmt dann das andere Ende und geht genauso oft. Auf dem Bahnsteig hat sich nichts bewegt, und trotzdem kommt ihr meist bei jemand anderem an.',
      'Mehr ist es nicht — und mehr braucht es nicht. Ein Kind, das gelernt hat, eine Reihe entlang zu zählen, hört "der Dritte" oft als Namen, den die Sache trägt, so wie sie ihre Farbe trägt. Das ist sie nicht: Es ist eine Auskunft darüber, wo ihr zu zählen angefangen habt. Der Bahnsteig zeigt das, ohne es zu behaupten, weil zwischen den beiden Zählungen sichtbar nichts angefasst wird.',
      'Es gibt keinen Anfang. Die Zählmarke steht neben dem Bahnsteig, bis ein Ende gewählt ist, und keine der beiden Tasten ist die richtige — ein voreingestelltes Ende würde stillschweigend behaupten, eine Richtung sei die echte, und genau das ist der Denkfehler.',
      'Die Formen tragen keine Buchstaben, keine Zahlen und keine Rangfolge. Alle vier sind auf dieselbe Fläche gerechnet und stehen auf derselben Linie, damit nichts im Material die Frage "welcher denn?" beantwortet, bevor die Klasse es tut.'
    ],
    howToUse: [
      'An die Wand werfen und die Klasse vom linken Ende drei weiterzählen lassen. Fragt, bei wem sie angekommen sind, bevor ihr etwas drückt.',
      'Jetzt drei vom anderen Ende. Und dann die Frage, um die es geht: Hat sich jemand bewegt?',
      'Lasst einen weggehen und zählt vom selben Ende noch einmal. Vom anderen Ende aus ändert sich nichts — das lohnt sich, laut zu sagen.',
      'Stellt auf drei Wartende um. Bei einer ungeraden Anzahl gibt es eine Stelle, an der beide Enden dasselbe ergeben, und die zu finden ist der schönste Moment, den das Gerät hat.'
    ],
    classroomIdeas: [
      'Stellt vier Kinder vorne auf und macht dasselbe mit ihnen, bevor ihr das Gerät öffnet. Der Bildschirm bestätigt dann, worüber die Klasse schon gestritten hat.',
      'Ein Kind soll sagen, wen es holen soll, ohne zu zeigen — es greift zu "der Dritte" und muss dann dazusagen: der Dritte von wo aus.',
      'Zwei Minuten zum Einstieg in eine Stunde über Ordnungszahlen, danach einfach stehen lassen, während die Klasse arbeitet.',
      'Blatt ausdrucken und die Kinder zu zweit pro Zeile eine Zählung eintragen lassen: von welchem Ende — und bei wem sie angekommen sind. Das Blatt gehört zum Lehrkraft-Abo; der Bahnsteig selbst — jede Aufstellung, beide Enden, die Zählmarke — ist für alle kostenlos.'
    ],
    metaTitle: 'Der Bahnsteig — Ordnungszahlen anschaulich, Klasse 1-2 | LessonCraftStudio',
    metaDescription: 'Kostenloses Unterrichtsgerät für Ordnungszahlen. Von einem Ende zählen, dann vom anderen: Niemand bewegt sich, und trotzdem ändert sich die Antwort. Läuft auf Beamer und Tablet, ohne Anmeldung.'
  },

  fr: {
    slug: 'le-quai-des-deux-bouts',
    name: 'Le quai des deux bouts',
    tagline: 'Comptez trois depuis un bout, puis trois depuis l’autre. Personne n’a bougé — alors pourquoi est-ce quelqu’un d’autre ?',
    about: [
      'Quatre formes attendent sur un quai. Choisissez un bout, faites avancer le marcheur pas à pas, et regardez sur qui il s’arrête. Repartez ensuite de l’autre bout et faites exactement le même nombre de pas. Rien n’a bougé sur le quai, et pourtant ce n’est presque jamais le même.',
      'C’est tout l’instrument. Un enfant qui a appris à compter le long d’une rangée entend souvent « le troisième » comme un nom que la chose porte, au même titre que sa couleur. Ce n’en est pas un : c’est une information sur l’endroit d’où l’on a commencé à compter. Le quai le montre sans le démontrer, puisque entre les deux comptages on voit bien que personne n’est touché.',
      'Il n’y a pas de tête de file. Le marcheur reste à côté du quai tant qu’aucun bout n’est choisi, et aucun des deux boutons n’est le bon — un bout par défaut affirmerait discrètement qu’un sens est le vrai sens, ce qui est exactement l’erreur.',
      'Les formes ne portent ni lettre, ni chiffre, ni classement. Les quatre sont calculées à la même surface et posées sur la même ligne, pour que rien dans la matière ne réponde « lequel ? » avant la classe.'
    ],
    howToUse: [
      'Projetez-le et demandez à la classe d’avancer de trois depuis le bout de gauche. Faites-leur dire sur qui ils tombent avant d’appuyer sur quoi que ce soit.',
      'Maintenant trois depuis l’autre bout. Puis la question qui compte : est-ce que quelqu’un a bougé ?',
      'Faites partir quelqu’un et recomptez depuis le même bout. Depuis l’autre bout, rien ne change — cela vaut la peine d’être dit à voix haute.',
      'Passez à trois qui attendent. Avec un nombre impair, il existe une place où les deux bouts donnent la même réponse, et la trouver est le meilleur moment de l’appareil.'
    ],
    classroomIdeas: [
      'Alignez quatre enfants devant la classe et faites la même chose avec eux avant d’ouvrir l’outil. L’écran confirme ensuite ce dont la classe a déjà discuté.',
      'Demandez à un enfant de dire qui aller chercher sans montrer du doigt : il dira « le troisième », et devra préciser le troisième à partir d’où.',
      'Deux minutes pour lancer une séance sur les nombres ordinaux, puis laissez-le affiché pendant que la classe travaille.',
      'Imprimez la fiche et faites noter à deux, une ligne par comptage : de quel bout ils sont partis, et sur qui ils se sont arrêtés. La fiche fait partie de l’abonnement Enseignant ; le quai lui-même — les deux bouts, le marcheur — est gratuit pour tout le monde.'
    ],
    metaTitle: 'Le quai des deux bouts — les nombres ordinaux au cycle 2 | LessonCraftStudio',
    metaDescription: 'Outil de classe gratuit pour les nombres ordinaux. Comptez d’un bout du quai, puis de l’autre : personne ne bouge, et la réponse change. Fonctionne au vidéoprojecteur et sur tablette, sans compte.'
  },

  es: {
    slug: 'el-anden',
    name: 'El andén',
    tagline: 'Cuenta tres desde un lado y luego tres desde el otro. No se ha movido nadie, ¿por qué es otro?',
    about: [
      'En un andén esperan cuatro figuras. Elige un lado, avanza con el puntero y mira en quién te quedas. Después elige el otro lado y avanza exactamente las mismas veces. Del andén no se ha movido nadie y, aun así, casi siempre te quedas en otro.',
      'Ese es todo el aparato. Un niño que ha aprendido a contar a lo largo de una fila suele oír «el tercero» como un nombre que la cosa lleva puesto, igual que lleva su color. No lo es: es un dato sobre desde dónde empezaste a contar. El andén lo enseña sin discutirlo, porque entre las dos cuentas se ve que nadie ha tocado nada.',
      'No hay principio de fila. El puntero se queda fuera del andén mientras no haya un lado elegido, y ninguno de los dos botones es el bueno: un lado por defecto afirmaría en voz baja que una dirección es la de verdad, que es justo el error.',
      'Las figuras no llevan letras, ni números, ni orden. Las cuatro están calculadas con la misma superficie y apoyadas en la misma línea, para que nada del material conteste «¿cuál?» antes que la clase.'
    ],
    howToUse: [
      'Proyéctalo y pide a la clase que avance tres desde el lado izquierdo. Que digan en quién se han quedado antes de que pulses nada.',
      'Ahora tres desde el otro lado. Y luego la pregunta que importa: ¿se ha movido alguien?',
      'Deja que se vaya uno y vuelve a contar desde el mismo lado. Desde el otro lado no cambia nada, y eso merece decirse en alto.',
      'Cambia a tres esperando. Con un número impar hay un sitio en el que los dos lados dan lo mismo, y encontrarlo es el mejor momento del aparato.'
    ],
    classroomIdeas: [
      'Pon a cuatro niños en fila delante de la clase y haz lo mismo con ellos antes de abrir la herramienta. La pantalla confirma después lo que la clase ya ha discutido.',
      'Pide a un niño que diga a quién hay que ir a buscar sin señalar: dirá «el tercero», y tendrá que añadir el tercero desde dónde.',
      'Dos minutos para empezar una sesión sobre los ordinales y luego se queda puesto mientras la clase trabaja.',
      'Imprime la hoja y que anoten por parejas una cuenta en cada línea: desde qué lado empezaron y en quién se quedaron. La hoja es parte del plan Docente; el andén en sí — los dos lados, el puntero — es gratis para todo el mundo.'
    ],
    metaTitle: 'El andén — los números ordinales en Infantil y Primaria | LessonCraftStudio',
    metaDescription: 'Herramienta de aula gratuita para los números ordinales. Cuenta desde un lado del andén y luego desde el otro: no se mueve nadie y la respuesta cambia. Funciona en pizarra digital y tableta, sin cuenta.'
  },

  pt: {
    slug: 'a-calcada-de-ponta-a-ponta',
    name: 'A calçada de ponta a ponta',
    tagline: 'Conte três de uma ponta e depois três da outra. Ninguém saiu do lugar — então por que é outra pessoa?',
    about: [
      'Quatro formas estão esperando numa calçada. Escolha uma ponta, ande com o andarilho e veja em quem você parou. Depois escolha a outra ponta e ande a mesma quantidade de passos. Ninguém saiu do lugar na calçada e, mesmo assim, quase sempre é outra pessoa.',
      'É só isso — e é o bastante. Uma criança que aprendeu a contar ao longo de uma fila costuma ouvir «o terceiro» como um nome que a coisa carrega, do mesmo jeito que carrega a cor dela. Não é: é uma informação sobre de onde você começou a contar. A calçada mostra isso sem precisar argumentar, porque entre as duas contagens dá para ver que ninguém encostou em nada.',
      'Não existe começo de fila. O andarilho fica fora da calçada enquanto nenhuma ponta for escolhida, e nenhum dos dois botões é o certo: uma ponta padrão afirmaria em silêncio que um sentido é o verdadeiro, que é exatamente o engano.',
      'As formas não têm letra, nem número, nem classificação. As quatro são calculadas com a mesma área e apoiadas na mesma linha, para que nada no material responda «qual?» antes da turma.'
    ],
    howToUse: [
      'Projete e peça para a turma andar três a partir da ponta da esquerda. Deixe que digam em quem pararam antes de você apertar qualquer coisa.',
      'Agora três a partir da outra ponta. E então a pergunta que interessa: alguém saiu do lugar?',
      'Deixe alguém ir embora e conte de novo pela mesma ponta. Pela outra ponta nada muda — vale dizer isso em voz alta.',
      'Mude para três esperando. Com um número ímpar existe um lugar em que as duas pontas dão a mesma resposta, e achar esse lugar é o melhor momento do aparelho.'
    ],
    classroomIdeas: [
      'Coloque quatro crianças em fila na frente da turma e faça o mesmo com elas antes de abrir a ferramenta. A tela depois confirma o que a turma já discutiu.',
      'Peça para uma criança dizer quem ela quer chamar sem apontar: ela vai falar «o terceiro», e vai ter que completar: o terceiro a partir de onde.',
      'Dois minutos para abrir uma aula sobre números ordinais, e depois é só deixar na tela enquanto a turma trabalha.',
      'Imprima a folha e peça que anotem em dupla uma contagem por linha: de que ponta começaram e em quem pararam. A folha faz parte do plano Professor; a calçada em si — as duas pontas, o andarilho — é grátis para todo mundo.'
    ],
    metaTitle: 'A calçada de ponta a ponta — números ordinais nos anos iniciais | LessonCraftStudio',
    metaDescription: 'Ferramenta de sala gratuita para números ordinais. Conte de uma ponta da calçada e depois da outra: ninguém sai do lugar e a resposta muda. Funciona no projetor e no tablet, sem precisar de conta.'
  },

  it: {
    slug: 'la-pedana-da-tutte-e-due-le-parti',
    name: 'La pedana da tutte e due le parti',
    tagline: 'Conta tre da una parte, poi tre dall\'altra. Non si è spostato nessuno: perché è un altro?',
    about: [
      'Sulla pedana aspettano quattro figure. Scegli una parte, cammina e guarda su chi ti fermi. Poi scegli l\'altra parte e cammina altrettante volte. Sulla pedana non si è spostato nessuno e, nonostante questo, quasi sempre ti fermi su un altro.',
      'Lo strumento è tutto qui. Un bambino che ha imparato a contare lungo una fila sente spesso «il terzo» come un nome che la cosa si porta addosso, come si porta il suo colore. Non lo è: è un\'informazione su dove hai cominciato a contare. La pedana lo fa vedere senza doverlo sostenere, perché fra i due conteggi si vede benissimo che nessuno viene toccato.',
      'Non c\'è una testa della fila. Chi cammina resta giù dalla pedana finché non è scelta una parte, e nessuno dei due pulsanti è quello giusto: una parte predefinita direbbe sottovoce che un verso è quello vero, che è proprio l\'errore.',
      'Le figure non hanno lettere, né numeri, né una classifica. Tutte e quattro sono calcolate sulla stessa area e appoggiate sulla stessa linea, così niente nel materiale risponde «quale?» prima della classe.'
    ],
    howToUse: [
      'Proiettala e chiedi alla classe di camminare di tre partendo dalla parte di sinistra. Fatti dire su chi si sono fermati prima di premere qualsiasi cosa.',
      'Adesso tre dall\'altra parte. E poi la domanda che conta: si è spostato qualcuno?',
      'Fai andare via uno e riconta dalla stessa parte. Dall\'altra parte non cambia niente, e vale la pena dirlo ad alta voce.',
      'Passa a tre che aspettano. Con un numero dispari c\'è un posto in cui tutte e due le parti danno la stessa risposta, e trovarlo è il momento migliore dell\'apparecchio.'
    ],
    classroomIdeas: [
      'Metti in fila quattro bambini davanti alla classe e fai la stessa cosa con loro prima di aprire lo strumento. Lo schermo poi conferma quello su cui la classe ha già discusso.',
      'Chiedi a un bambino di dire chi andare a chiamare senza indicare: dirà «il terzo», e dovrà aggiungere il terzo a partire da dove.',
      'Due minuti per aprire una lezione sui numeri ordinali, poi lascialo sullo schermo mentre la classe lavora.',
      'Stampa la scheda e falla compilare a coppie, un conteggio per riga: da che parte sono partiti e su chi si sono fermati. La scheda fa parte del Piano Insegnante; la pedana in sé — tutte e due le parti, chi cammina — è gratuita per tutti.'
    ],
    metaTitle: 'La pedana da tutte e due le parti — i numeri ordinali in classe 1ª-2ª | LessonCraftStudio',
    metaDescription: 'Strumento di classe gratuito per i numeri ordinali. Conta da una parte della pedana e poi dall\'altra: non si sposta nessuno e la risposta cambia. Funziona su LIM e tablet, senza account.'
  },

  nl: {
    slug: 'het-perron',
    name: 'Het perron',
    tagline: 'Tel er drie vanaf de ene kant en dan drie vanaf de andere. Niemand is verschoven — waarom is het dan iemand anders?',
    about: [
      'Op een perron staan vier vormen te wachten. Kies een kant, stap langs het perron en kijk bij wie je uitkomt. Kies daarna de andere kant en stap even vaak. Er is niemand verschoven op het perron, en toch kom je bijna altijd bij iemand anders uit.',
      'Meer is het niet. Een kind dat heeft leren tellen langs een rij hoort «de derde» vaak als een naam die het ding draagt, net zoals het zijn kleur draagt. Dat is het niet: het is een mededeling over waar je bent begonnen met tellen. Het perron laat dat zien zonder erover te discussiëren, want tussen de twee tellingen door zie je dat er niemand wordt aangeraakt.',
      'Er is geen voorkant. De aanwijzer blijft naast het perron staan zolang er geen kant is gekozen, en geen van beide knoppen is de echte: een standaardkant zou stilletjes beweren dat één richting de juiste is, en dat is precies de misvatting.',
      'De vormen dragen geen letters, geen cijfers en geen rangorde. Alle vier zijn op dezelfde oppervlakte berekend en staan op dezelfde lijn, zodat niets in het materiaal «welke?» beantwoordt voordat de klas dat doet.'
    ],
    howToUse: [
      'Zet hem op het digibord en laat de klas er drie tellen vanaf de linkerkant. Laat ze zeggen bij wie ze uitkomen voordat je iets indrukt.',
      'Nu drie vanaf de andere kant. En dan de vraag waar het om gaat: is er iemand verschoven?',
      'Laat er iemand weggaan en tel opnieuw vanaf dezelfde kant. Vanaf de andere kant verandert er niets — dat is het waard om hardop te zeggen.',
      'Zet hem op drie wachtenden. Bij een oneven aantal is er een plek waar beide kanten hetzelfde opleveren, en die vinden is het mooiste moment van het apparaat.'
    ],
    classroomIdeas: [
      'Zet vier kinderen vooraan in de rij en doe hetzelfde met hen voordat je het apparaat opent. Het scherm bevestigt daarna waar de klas het al over had.',
      'Vraag een kind te zeggen wie het moet halen zonder te wijzen: het zegt «de derde», en moet er dan bij zeggen de derde vanaf waar.',
      'Twee minuten om een les over rangtelwoorden te openen, en laat hem daarna gewoon staan terwijl de klas werkt.',
      'Druk het blad af en laat ze in tweetallen per regel één telling opschrijven: vanaf welke kant ze begonnen en bij wie ze uitkwamen. Het blad hoort bij het Leerkracht-abonnement; het perron zelf — beide kanten, de aanwijzer — is voor iedereen gratis.'
    ],
    metaTitle: 'Het perron — rangtelwoorden in groep 3 en 4 | LessonCraftStudio',
    metaDescription: 'Gratis klasapparaat voor rangtelwoorden. Tel vanaf de ene kant van het perron en dan vanaf de andere: er verschuift niemand en toch verandert het antwoord. Werkt op digibord en tablet, zonder account.'
  },

  sv: {
    slug: 'perrongen',
    name: 'Perrongen',
    tagline: 'Räkna tre från den ena änden och sedan tre från den andra. Ingen har flyttat sig — varför är det någon annan?',
    about: [
      'Fyra figurer står på en perrong. Välj en ände, gå ett kliv i taget och se vem ni hamnar på. Välj sedan andra änden och gå lika många kliv. Ingen på perrongen har flyttat sig, och ändå hamnar ni nästan alltid på någon annan.',
      'Det är hela apparaten. Ett barn som har lärt sig räkna längs en rad hör ofta «den tredje» som ett namn saken bär, på samma sätt som den bär sin färg. Det är det inte: det är en uppgift om var ni började räkna. Perrongen visar det utan att argumentera för det, eftersom man mellan de två räkningarna ser att ingen rörs.',
      'Det finns ingen framsida. Vandraren står bredvid perrongen tills en ände är vald, och ingen av de två knapparna är den rätta — en förvald ände skulle tyst påstå att ett håll är det riktiga, vilket är just missuppfattningen.',
      'Figurerna bär varken bokstäver, siffror eller rangordning. Alla fyra är uträknade på samma yta och står på samma linje, så att ingenting i materialet svarar «vilken?» innan klassen gör det.'
    ],
    howToUse: [
      'Sätt upp den på tavlan och låt klassen gå tre kliv från den vänstra änden. Låt dem säga vem de hamnar på innan ni trycker på något.',
      'Nu tre kliv från andra änden. Och sedan frågan det handlar om: har någon flyttat sig?',
      'Låt någon gå härifrån och räkna om från samma ände. Från andra hållet ändras ingenting — det är värt att säga högt.',
      'Ställ om till tre som står. Med ett udda antal finns det ett ställe där båda ändarna ger samma svar, och att hitta det är apparatens finaste ögonblick.'
    ],
    classroomIdeas: [
      'Ställ fyra barn på rad längst fram och gör samma sak med dem innan ni öppnar verktyget. Skärmen bekräftar sedan det klassen redan har tvistat om.',
      'Be ett barn säga vem som ska hämtas utan att peka — det säger «den tredje», och måste sedan lägga till: den tredje räknat varifrån.',
      'Två minuter för att inleda en lektion om ordningstal, och låt den sedan stå kvar medan klassen arbetar.',
      'Skriv ut arbetsbladet och låt dem två och två skriva en räkning per rad: vilken ände de började i och vem de hamnade på. Arbetsbladet ingår i Lärarplanen; själva perrongen — båda ändarna, vandraren — är gratis för alla.'
    ],
    metaTitle: 'Perrongen — ordningstal i förskoleklass och åk 1 | LessonCraftStudio',
    metaDescription: 'Gratis klassrumsverktyg för ordningstal. Räkna från den ena änden av perrongen och sedan från den andra: ingen flyttar sig, men svaret ändras. Fungerar på projektor och surfplatta, utan konto.'
  },

  da: {
    slug: 'tael-fra-begge-ender',
    name: 'Tæl fra begge ender',
    tagline: 'Tæl tre fra den ene ende og så tre fra den anden. Ingen har rørt sig — hvorfor er det så en anden?',
    about: [
      'Fire figurer står på en venteplads. Vælg en ende, flyt pegepinden ét skridt ad gangen, og se hvem I lander på. Vælg så den anden ende, og flyt lige så mange skridt. Ingen på ventepladsen har rørt sig, og alligevel lander I næsten altid på en anden.',
      'Det er hele instrumentet. Et barn, der har lært at tælle langs en række, hører ofte «den tredje» som et navn, tingen bærer, på samme måde som den bærer sin farve. Det er det ikke: det er en oplysning om, hvor I begyndte at tælle. Ventepladsen viser det uden at argumentere for det, for mellem de to tællinger kan man se, at ingen bliver rørt.',
      'Der er ingen forende. Pegepinden bliver stående ved siden af ventepladsen, indtil en ende er valgt, og ingen af de to knapper er den rigtige — en forvalgt ende ville stiltiende påstå, at én retning er den ægte, og det er netop misforståelsen.',
      'Figurerne bærer hverken bogstaver, tal eller rangorden. Alle fire er regnet ud til samme areal og står på samme linje, så intet i materialet svarer «hvilken?», før klassen gør det.'
    ],
    howToUse: [
      'Sæt den op på tavlen, og lad klassen tælle tre fra den venstre ende. Lad dem sige, hvem de lander på, før I trykker på noget.',
      'Nu tre fra den anden ende. Og så det spørgsmål, det handler om: har nogen rørt sig?',
      'Lad én gå sin vej, og tæl igen fra den samme ende. Fra den anden ende ændrer der sig ingenting — det er værd at sige højt.',
      'Skift til tre, der venter. Med et ulige antal er der et sted, hvor begge ender giver det samme svar, og at finde det er apparatets bedste øjeblik.'
    ],
    classroomIdeas: [
      'Stil fire børn på række forrest i klassen, og gør det samme med dem, før I åbner værktøjet. Skærmen bekræfter bagefter det, klassen allerede har diskuteret.',
      'Bed et barn sige, hvem der skal hentes, uden at pege — det siger «den tredje» og må så tilføje: den tredje talt hvorfra.',
      'To minutter til at åbne en time om ordenstal, og lad den så blive stående, mens klassen arbejder.',
      'Udskriv arket, og lad dem to og to skrive én tælling per linje: hvilken ende de begyndte i, og hvem de landede på. Arket hører til Lærerabonnementet; selve ventepladsen — begge ender, pegepinden — er gratis for alle.'
    ],
    metaTitle: 'Tæl fra begge ender — ordenstal i børnehaveklassen og 1. klasse | LessonCraftStudio',
    metaDescription: 'Gratis klasseværktøj til ordenstal. Tæl fra den ene ende af ventepladsen og så fra den anden: ingen rører sig, men svaret ændrer sig. Virker på projektor og tablet, uden konto.'
  },

  no: {
    slug: 'perrongen',
    name: 'Perrongen',
    tagline: 'Tell tre fra den ene enden og så tre fra den andre. Ingen har flyttet seg — hvorfor er det en annen?',
    about: [
      'Fire figurer står og venter på en perrong. Velg en ende, gå bortover ett steg av gangen, og se hvem du lander på. Velg så den andre enden og gå like mange steg. Ingen på perrongen har flyttet seg, og likevel lander du nesten alltid på en annen.',
      'Det er hele instrumentet. Et barn som har lært å telle langs en rekke, hører ofte «den tredje» som et navn tingen bærer, på samme måte som den bærer fargen sin. Det er det ikke: det er en opplysning om hvor du begynte å telle. Perrongen viser det uten å argumentere for det, for mellom de to tellingene ser man at ingen blir rørt.',
      'Det finnes ingen forside. Vandreren står utenfor perrongen til en ende er valgt, og ingen av de to knappene er den riktige — en forhåndsvalgt ende ville stille påstå at én retning er den ekte, og det er nettopp misforståelsen.',
      'Figurene bærer verken bokstaver, tall eller rangering. Alle fire er regnet ut til samme areal og står på samme linje, slik at ingenting i materialet svarer «hvilken?» før klassen gjør det.'
    ],
    howToUse: [
      'Sett den opp på tavla og la klassen telle tre fra den venstre enden. La dem si hvem de lander på før dere trykker på noe.',
      'Nå tre fra den andre enden. Og så spørsmålet det handler om: har noen flyttet seg?',
      'La én gå sin vei og tell på nytt fra den samme enden. Fra den andre enden endrer ingenting seg — det er verdt å si høyt.',
      'Bytt til tre som venter. Med et oddetall finnes det et sted der begge endene gir samme svar, og å finne det er apparatets beste øyeblikk.'
    ],
    classroomIdeas: [
      'Still fire barn på rekke foran i klassen og gjør det samme med dem før dere åpner verktøyet. Skjermen bekrefter etterpå det klassen allerede har kranglet om.',
      'Be et barn si hvem som skal hentes uten å peke — det sier «den tredje», og må så legge til: den tredje talt fra hvor.',
      'To minutter for å åpne en time om ordenstall, og la den så bli stående mens klassen jobber.',
      'Skriv ut arket og la dem to og to skrive én telling per linje: hvilken ende de startet fra, og hvem de landet på. Arket hører til Lærerabonnementet; selve perrongen — begge endene, vandreren — er gratis for alle.'
    ],
    metaTitle: 'Perrongen — ordenstall på 1. og 2. trinn | LessonCraftStudio',
    metaDescription: 'Gratis klasseromsverktøy for ordenstall. Tell fra den ene enden av perrongen og så fra den andre: ingen flytter seg, men svaret endrer seg. Virker på projektor og nettbrett, uten konto.'
  },

  fi: {
    slug: 'laiturin-paat',
    name: 'Laiturin päät',
    tagline: 'Laske kolme yhdestä päästä ja sitten kolme toisesta. Kukaan ei liikkunut — miksi se on joku muu?',
    about: [
      'Laiturilla odottaa neljä muotoa. Valitse pää, laske eteenpäin ja katso, kenen kohdalle pysähdyit. Valitse sitten toinen pää ja laske yhtä monta. Kukaan laiturilla ei liikkunut, ja silti pysähdyt melkein aina jonkun toisen kohdalle.',
      'Siinä on koko laite. Lapsi, joka on oppinut laskemaan rivin läpi, kuulee usein sanan «kolmas» nimenä, jota esine kantaa mukanaan samalla tavalla kuin se kantaa väriään. Se ei ole nimi: se on tieto siitä, mistä aloitit laskemisen. Laituri näyttää tämän ilman että sitä tarvitsee perustella, koska kahden laskennan välissä näkee, ettei kukaan koske mihinkään.',
      'Etupäätä ei ole. Kulkija seisoo laiturin ulkopuolella, kunnes pää on valittu, eikä kumpikaan painike ole se oikea — valmiiksi valittu pää väittäisi hiljaa, että yksi suunta on se todellinen, ja juuri se on väärinkäsitys.',
      'Muodoissa ei ole kirjaimia, numeroita eikä paremmuusjärjestystä. Kaikki neljä on laskettu samalle pinta-alalle ja ne seisovat samalla viivalla, jottei mikään materiaalissa vastaa kysymykseen «kumpi?» ennen luokkaa.'
    ],
    howToUse: [
      'Heijasta se taululle ja pyydä luokkaa laskemaan kolme vasemmasta päästä. Anna heidän sanoa, kenen kohdalle he pysähtyivät, ennen kuin painat mitään.',
      'Nyt kolme toisesta päästä. Ja sitten se kysymys, josta on kyse: liikkuiko kukaan?',
      'Anna yhden lähteä ja laske uudelleen samasta päästä. Toisesta päästä mikään ei muutu — se kannattaa sanoa ääneen.',
      'Vaihda kolmeen odottajaan. Parittomalla määrällä on paikka, jossa molemmat päät antavat saman vastauksen, ja sen löytäminen on laitteen paras hetki.'
    ],
    classroomIdeas: [
      'Aseta neljä lasta riviin luokan eteen ja tee heille sama ennen kuin avaat työkalun. Ruutu vahvistaa sen jälkeen sen, mistä luokka jo kiisteli.',
      'Pyydä lasta kertomaan, kuka pitää hakea, ilman että hän osoittaa — hän sanoo «kolmas», ja joutuu sitten lisäämään: kolmas mistä päin laskien.',
      'Kaksi minuuttia järjestyslukuja käsittelevän tunnin aluksi, ja anna sen sitten jäädä näkyviin luokan työskennellessä.',
      'Tulosta arkki ja anna parien kirjoittaa yksi laskeminen riviä kohti: mistä päästä he aloittivat ja kenen kohdalle he päätyivät. Opettajatilaus tuo mukanaan tulostettavan arkin; itse laituri — molemmat päät ja kulkija — on ilmainen kaikille.'
    ],
    metaTitle: 'Laiturin päät — järjestysluvut esiopetuksessa ja 1. luokalla | LessonCraftStudio',
    metaDescription: 'Ilmainen luokkatyökalu järjestyslukujen opettamiseen. Laske laiturin yhdestä päästä ja sitten toisesta: kukaan ei liiku, mutta vastaus muuttuu. Toimii videotykillä ja tabletilla, ilman tiliä.'
  }
};
