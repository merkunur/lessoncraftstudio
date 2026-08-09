/* =====================================================================
   _baking-tray-content.js — TOOL #46 landing copy, eleven locales
   ---------------------------------------------------------------------
   The single source for `frontend/messages/tool-content/<loc>.json` and
   for the hub card in `frontend/lib/manipulatives.ts`. Consumed by
   scripts/register-baking-tray.js.

   ⚠ EIGHT REQUIRED FIELDS, and the register script reads that list OFF
   THE ToolEntry INTERFACE rather than trusting this comment: slug, name,
   tagline, about[], howToUse[], classroomIdeas[], metaTitle,
   metaDescription. #42 shipped five of the eight, and the build then
   failed the static export of all eleven landing pages AFTER
   registration had reported success — tsc cannot catch it, because
   tool-content/*.json is untyped at runtime.

   ⭐ THE ROUTINE IS PART OF THE PRODUCT, NOT MARKETING. The pedagogy
   panel's blunt finding was that the tool does not teach the invariant —
   the ROUTINE teaches it. A silent instrument makes nothing salient: a
   child watches a tray split and reasonably concludes there are now two
   trays. So `howToUse` is the six-move routine, in order, and the
   load-bearing move is the fourth one (put it back and break it
   somewhere else), not the crack.

   ⚠ NO `×`, NO `+`, NO `=` AND NO TOTAL in any tool STRING — but the
   landing prose MAY carry them, because a landing page has to be able to
   say what the tool refuses to do. That distinction is the #44 ruling:
   running the apparatus bans over landing copy failed four locales on
   sentences whose whole job was to state the refusal.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    slug: 'baking-tray',
    name: 'The Baking Tray',
    tagline: 'One tray, two facts: the hard one breaks into two the class already owns.',
    about: [
      'A tray of buns is baked in rows, all joined, so the line where two buns meet is a line you could break along. Seven rows of six is a hard fact. Break the tray after the fifth row and it is five rows of six and two rows of six — two facts most of the class already has. Nothing was added and nothing was taken away; the same buns are simply being read as two pieces instead of one.',
      'Turning the tray a quarter turn is the other move, and it is not a trick about the order of the numbers. It changes which lines are there to break along. If nothing useful can be broken off the seven, turn the tray and break the six instead.',
      'The tray never shows a total, never writes a number sentence and never says whether a break was a good one. Where to break it is the question the class is there to argue about, and a tool with an opinion about that would end the argument before it started.'
    ],
    howToUse: [
      'Have the tray on screen before the children come in. Ask for the shape, not the total: how many rows, and how many in each row?',
      'Ask whether anyone knows this one straight away. Usually nobody does, and saying so out loud is worth more than it sounds.',
      'Ask where to break it so that BOTH pieces are ones the class already knows — then break it where they say, including when they say somewhere awkward.',
      'Push the pieces back together and ask whether any buns were lost. Then break it somewhere else. Two different breaks of one tray inside a minute is the whole idea.',
      'Now write it on the board yourself, in the way your class writes it. The tray deliberately does not: it holds the material still while the writing stays yours.',
      'Turn the tray when the breaks on offer are not helpful, and let the class see the same buns read the other way round.'
    ],
    classroomIdeas: [
      'Break the same tray two different ways in one session and put both up on the board. The point is not which is better; it is that one tray makes more than one pair of facts.',
      'Start with a tray whose break is obvious — a ten, or a five — before going anywhere near the sevens and eights. The five line is drawn deeper in the tray for exactly that reason.',
      'Use it the other way round for square numbers: turn a six-by-six and let the class watch nothing at all happen. That is a result, and it is worth naming.'
    ],
    metaTitle: 'The Baking Tray — Breaking a Hard Times Table Fact in Two',
    metaDescription: 'A free whole-class tray of buns for multiplication: break seven rows of six into five rows and two rows, two facts the class already knows. No total, no timer, no score. Ages 7-9.'
  },

  de: {
    slug: 'broetchenblech',
    name: 'Das Brötchenblech',
    tagline: '7 × 6 ist keine Kernaufgabe – 5 × 6 und 2 × 6 sind es, und genau an dieser Rille bricht das Blech auseinander.',
    about: [
      'Auf dem Blech liegen die Brötchen aneinandergebacken: 7 Reihen zu je 6, ein einziges zusammenhängendes Stück, und jede Rille zwischen zwei Brötchen ist eine Stelle, an der es auseinandergehen kann. Mehr als drei Bewegungen gibt es nicht – das Blech drehen, an einer Rille auseinanderbrechen, die Teile wieder zusammenschieben. Die Anzahl ändert sich dabei nie: Die 42 Brötchen liegen nach dem Brechen genauso auf dem Tisch wie vorher, nur in zwei Teilen.',
      'Damit wird das Ableiten sichtbar, das im Einmaleins die eigentliche Arbeit ist. 7 × 6 gehört zu den Aufgaben, die kaum ein Kind auswendig weiß; 5 × 6 und 2 × 6 sind Kernaufgaben, die es längst besitzt. Bricht das Blech nach der fünften Reihe, liegen beide Kernaufgaben nebeneinander auf dem Tisch, und die schwere Aufgabe ist keine neue mehr, sondern die Summe zweier bekannter. Höchstens zwei Brüche sind möglich, also höchstens drei Teile – danach wäre es kein Ableiten mehr, sondern Zählen.',
      'Das Drehen ist hier kein Beweis, dass 3 × 4 und 4 × 3 dasselbe wären: 3 Gruppen zu 4 und 4 Gruppen zu 3 sind verschiedene Situationen, und dafür gibt es auf dieser Plattform eine eigene Aufgabe. Gedreht wird aus einem einzigen Grund – die Vierteldrehung ändert, welche Rillen zur Verfügung stehen. Notiert wird nichts: kein Rechenzeichen, keine Gesamtzahl, nicht einmal in der Vorlesefunktion. Den Satz „7 × 6 = 5 × 6 + 2 × 6" schreibt die Lehrkraft an die Tafel, in der Schreibweise, die an eurer Schule gilt. Das Gerät bewertet nichts, korrigiert nichts, misst keine Zeit und schlägt auch keine Bruchstelle vor – wo gebrochen wird, ist die Frage, um die es geht.'
    ],
    howToUse: [
      'Lass das Blech schon an der Wand stehen, bevor die Klasse hereinkommt, und frage nicht nach der Gesamtzahl, sondern nach der Form: Wie viele Reihen sind das, und wie viele Brötchen liegen in jeder Reihe?',
      'Frage, wer diese Aufgabe sofort weiß – und sag dazu, dass du 7 × 6 auch nicht auswendig kannst. Damit ist das Ableiten kein Notbehelf für die Kinder, die es nicht wissen, sondern das Verfahren für alle.',
      'Frage, wo man so auseinanderbrechen kann, dass beide Teile Aufgaben sind, die die Klasse schon kann, und brich genau dort, wo die Kinder es sagen – auch dann, wenn 4 Reihen und 3 Reihen herauskommen. Zwei unbequeme Teile sind das beste Argument für die fünfte Rille, und dieses Argument gehört den Kindern.',
      'Schiebe die Teile wieder zusammen und frage, ob dabei ein Brötchen verloren gegangen ist. Dann brich an einer anderen Rille auseinander. Dass dieselben Brötchen zwei verschiedene Zerlegungen tragen, ohne dass eines dazukommt oder fehlt, ist der tragende Moment der Stunde – und der einzige, der zweimal gebraucht wird.',
      'Schreib die Aufgabe jetzt selbst an die Tafel, so wie es in eurem Schulbuch steht: 7 × 6 = 5 × 6 + 2 × 6. Das Blech notiert bewusst nichts, weil kein Rechenzeichen in allen Sprachen gleich gelesen wird – die Schreibweise kommt von dir und bleibt an der Tafel stehen, wenn das Blech längst wieder ganz ist.',
      'Gibt keine Rille etwas her, dann dreh das Blech: Aus 7 Reihen zu je 6 werden 6 Reihen zu je 7, und jetzt lässt sich die 6 in 5 und 1 zerlegen. Gedreht wird nur am ganzen Blech, also vorher zusammenschieben – auch das ist eine Aussage über das Material und keine Sperre.'
    ],
    classroomIdeas: [
      'Klasse 2, eine Woche lang fünf Minuten: Jeden Tag ein anderes Blech, gebrochen immer nach der fünften Reihe. Die Klasse liest beide Teile vor, die Tafel sammelt die Sätze untereinander. Am Freitag steht dort die 5er-Reihe als Werkzeug für sieben verschiedene Aufgaben – und nicht als siebte Zeile einer Tabelle.',
      'Klasse 3, Partnerarbeit am selben Blech: Zwei Kinder brechen dasselbe 8 × 7-Blech an verschiedenen Rillen und schreiben ihre beiden Aufgaben auf. Beide rechnen aus, was zusammenkommt. Dass 5 × 7 + 3 × 7 und 4 × 7 + 4 × 7 dieselbe Zahl ergeben, ist kein Zufall, den man glauben muss, sondern liegt vor beiden auf dem Tisch.',
      'Klasse 3, rückwärts: Schreib 5 × 6 und 1 × 6 an die Tafel und lass die Kinder das Blech dazu bauen, bevor sie es brechen. Danach dasselbe mit einem Quadrat – 6 Reihen zu je 6, gedreht, und es ändert sich nichts. Genau dieser Fall zeigt, wozu das Drehen sonst gut ist, weil er der einzige ist, in dem es nichts bringt.'
    ],
    metaTitle: 'Das Brötchenblech – Einmaleins ableiten, Klasse 2 und 3',
    metaDescription: 'Kostenloses Werkzeug zum Ableiten im Einmaleins: Ein Blech Brötchen bricht an einer Rille auseinander, und aus 7 × 6 werden 5 × 6 und 2 × 6. Klasse 2 und 3.'
  },

  fr: {
    slug: 'plaque-de-brioches',
    name: 'La plaque de brioches',
    tagline: 'Une plaque, deux résultats connus : la table difficile se casse en deux tables faciles.',
    about: [
      'Les brioches cuisent en rangées, soudées les unes aux autres : là où deux brioches se touchent, il y a un creux, et un creux est une ligne où l’on peut casser. 7 × 6, personne ne le sait par cœur en CE2. On casse la plaque après la cinquième rangée et il reste 5 rangées de 6 et 2 rangées de 6 — deux résultats que la classe possède déjà. Rien n’a été ajouté, rien n’a été retiré : ce sont les mêmes brioches, lues en deux morceaux au lieu d’un seul. C’est la distributivité, avant qu’elle porte ce nom : 7 × 6 = 5 × 6 + 2 × 6.',
      'Tourner la plaque d’un quart de tour est le second geste, et ce n’est pas une astuce sur l’ordre des nombres : la plaque ne dit jamais que 3 × 4 et 4 × 3, « c’est pareil ». Tourner change les creux disponibles. Quand rien d’utile ne se détache du 7, on tourne et on casse le 6. Le geste est subordonné au premier : on tourne pour ouvrir d’autres cassures, pas pour retourner le résultat.',
      'La plaque n’affiche aucun total, n’écrit aucune opération et ne dit jamais si la cassure était la bonne. Pas de minuteur, pas de points, aucune correction. Où casser, c’est précisément la question dont la classe est venue discuter, et un outil qui aurait un avis là-dessus mettrait fin au débat avant qu’il commence. L’écriture chiffrée reste au tableau, de la main de l’enseignant, dans la convention de sa classe. L’outil est gratuit ; seule la fiche à imprimer fait partie de l’offre Enseignant.'
    ],
    howToUse: [
      'Projetez la plaque avant l’entrée des élèves. Demandez la forme, jamais le total : combien de rangées, et combien de brioches dans chaque rangée ?',
      'Demandez si quelqu’un connaît celui-là tout de suite. En général personne, et dire à voix haute que vous non plus vaut plus qu’il n’y paraît.',
      'Demandez dans quel creux casser pour que LES DEUX morceaux soient des résultats déjà connus — puis cassez là où la classe le dit, y compris quand l’endroit est peu commode.',
      'Remettez les morceaux ensemble et demandez s’il manque des brioches. Puis cassez ailleurs. Deux cassures différentes de la même plaque en une minute : c’est là que tout se joue.',
      'Écrivez-le vous-même au tableau, comme votre classe l’écrit : 7 × 6 = 5 × 6 + 2 × 6. La plaque s’y refuse volontairement — elle tient le matériel immobile, l’écriture reste la vôtre.',
      'Tournez la plaque quand les cassures possibles n’aident pas, et laissez la classe relire les mêmes brioches dans l’autre sens.'
    ],
    classroomIdeas: [
      'Cassez la même plaque de deux manières dans la même séance et affichez les deux au tableau. La question n’est pas laquelle est la meilleure : c’est qu’une seule plaque donne plusieurs paires de résultats connus.',
      'Commencez par une plaque dont la cassure saute aux yeux — un 10, un 5 — bien avant d’approcher les tables de 7 et de 8. Le cinquième creux est dessiné plus profond exactement pour cela, et se désactive dans les réglages le jour où vous travaillez les doubles.',
      'Prenez-le à l’envers avec les carrés : tournez une plaque de 6 rangées de 6 et laissez la classe constater qu’il ne se passe rien. C’est un résultat, il mérite d’être nommé — puis cassez-la en 5 rangées de 6 et 1 rangée de 6.'
    ],
    metaTitle: 'La plaque de brioches : casser une table difficile en deux',
    metaDescription: 'Outil gratuit pour la classe : la plaque de brioches casse 7 rangées de 6 en 5 rangées de 6 et 2 rangées de 6. Aucun total affiché. CE1-CE2, sans compte.'
  },

  es: {
    slug: 'bandeja-de-panecillos-tablas-de-multiplicar-primaria',
    name: 'La bandeja de panecillos',
    tagline: 'Una bandeja de panecillos horneados pegados: separa siete filas de seis en cinco filas de seis y dos filas de seis, y la tabla difícil se apoya en dos que la clase ya se sabe.',
    about: [
      'Los panecillos de esta bandeja se han horneado pegados, así que la línea donde se tocan dos panecillos es una línea que se puede separar. Siete filas de seis es de las difíciles. Separa los panecillos debajo de la quinta fila y quedan cinco filas de seis y dos filas de seis: dos cosas que casi toda la clase ya se sabe. No se ha añadido ni quitado nada — los mismos panecillos se leen ahora en dos trozos en lugar de en uno. Es 7 × 6 = 30 + 12 = 42 convertido en material, antes de ser una cuenta.',
      'Girar la bandeja un cuarto de giro es el otro movimiento, y no es el truco de que da igual el orden de los números. Esta herramienta no dice en ningún momento que 3 × 4 y 4 × 3 sean la misma cosa: tres grupos de cuatro y cuatro grupos de tres son dos situaciones distintas, y otra actividad de esta misma plataforma se dedica precisamente a que no se confundan. El giro va de otra cosa y es estratégico: cambia qué líneas hay disponibles para separar. Si del siete no sale nada útil, gira la bandeja y separa el seis.',
      'La bandeja no enseña nunca el total, no escribe ninguna operación y no opina sobre si la separación ha sido buena. Dónde separarla es justo lo que la clase ha venido a discutir, y una herramienta con opinión sobre eso cerraría la discusión antes de empezarla. Tampoco hay cronómetro, ni puntuación, ni corrección: la frase se escribe en la pizarra y la escribes tú, con la convención que use tu clase. Se abre en el navegador, sin instalar nada y sin cuenta. La bandeja entera —los tres movimientos y de una a diez filas— es gratis para siempre; la hoja para imprimir y las bandejas de once y de doce van con el plan Docente.'
    ],
    howToUse: [
      'Ten la bandeja proyectada antes de que entren los niños. Pregunta por la forma, no por el total: cuántas filas hay y cuántos panecillos hay en cada fila.',
      'Pregunta si alguien se sabe esta de memoria. Normalmente no se la sabe nadie, y decir en voz alta que tú tampoco vale más de lo que parece.',
      'Pregunta dónde separarla para que los DOS trozos sean de las que la clase ya se sabe, y sepárala donde ellos digan, también cuando digan un sitio incómodo.',
      'Junta los trozos y pregunta si se ha perdido algún panecillo. Después sepárala en otro sitio. Dos separaciones distintas de la misma bandeja en un minuto: esa es la idea entera.',
      'Ahora escribe tú la frase en la pizarra, tal y como la escriba tu clase: 7 × 6 = 5 × 6 + 2 × 6. La bandeja no lo hace, y no lo hace a propósito: sujeta el material quieto mientras la escritura sigue siendo tuya.',
      'Gira la bandeja cuando las separaciones que ofrece no sirvan, y deja que la clase vea los mismos panecillos leídos del otro lado.'
    ],
    classroomIdeas: [
      'Separad la misma bandeja de dos maneras distintas en una sola sesión y dejad las dos escritas en la pizarra. No va de cuál es mejor: va de que una bandeja da más de una manera de apoyarse.',
      'Empieza con una bandeja cuya separación se ve venir —un diez, o un cinco— antes de acercarte a los sietes y los ochos. La línea del cinco viene marcada más honda justo por eso.',
      'Del revés, para los cuadrados: gira una de seis filas de seis y deja que la clase vea que no pasa absolutamente nada. Eso también es un resultado, y merece que alguien lo diga en voz alta.'
    ],
    metaTitle: 'La bandeja de panecillos — las tablas difíciles, en dos trozos',
    metaDescription: 'Una bandeja de panecillos pegados para las tablas: separa 7 filas de 6 en 5 filas de 6 y 2 filas de 6. Sin total, sin cronómetro y sin nota. Gratis, 2.º y 3.º.'
  },

  it: {
    slug: 'teglia-dei-panini',
    name: 'La teglia dei panini',
    tagline: 'Una teglia sola: la tabellina difficile si spezza in due che la classe sa già.',
    about: [
      'Una teglia di panini al latte, cotti attaccati in righe: la linea dove due panini si toccano è una linea lungo cui si può spezzare. 7 righe da 6 è una tabellina che in seconda quasi nessuno ha ancora in testa. Spezzate la teglia dopo la quinta riga e diventa 5 righe da 6 e 2 righe da 6 — 5 × 6 = 30 e 2 × 6 = 12, due risultati che la classe ha già. Non è stato aggiunto niente e non è stato tolto niente: sono gli stessi identici panini, letti come due pezzi invece che come uno solo.',
      'Girare la teglia di un quarto di giro è l’altra mossa, e non è un trucco sull’ordine dei numeri. Su questa piattaforma c’è un’attività che insegna, giustamente, che 3 gruppi da 4 e 4 gruppi da 3 non sono la stessa situazione. Qui girare serve a un’altra cosa: cambia quali linee ci sono da spezzare. Se sul 7 non si trova un punto utile, si gira la teglia e si spezza il 6.',
      'La teglia non mostra mai un totale, non scrive mai l’operazione e non dice mai se avete spezzato nel punto giusto. Dove spezzare è esattamente la domanda su cui la classe è lì a discutere, e uno strumento con un’opinione chiuderebbe la discussione prima ancora che cominci. Nessun timer, nessun punteggio, nessun «bravo»: il gessetto resta in mano all’insegnante, che scrive alla lavagna nella forma in cui si scrive in quella classe.'
    ],
    howToUse: [
      'Teglia già sullo schermo quando i bambini entrano. Chiedete la forma, non il totale: quante righe, e quanti panini in ogni riga?',
      'Chiedete se qualcuno la sa già a memoria. Di solito no — e dirlo ad alta voce, anche da insegnante, vale più di quanto sembri.',
      'Chiedete dove spezzare in modo che tutti e due i pezzi siano tabelline che la classe sa già, poi spezzate dove dicono loro, anche quando indicano un punto scomodo.',
      'Rimettete insieme i pezzi e chiedete se si è perso qualche panino. Poi spezzate in un altro punto. Due spezzature diverse della stessa teglia nel giro di un minuto: l’idea è tutta qui.',
      'Adesso scrivete voi alla lavagna, nella forma in cui la scrive la vostra classe: 7 × 6 = 5 × 6 + 2 × 6. La teglia non lo fa apposta — tiene ferma la materia e lascia a voi la scrittura.',
      'Girate la teglia quando i punti disponibili non aiutano, e lasciate che la classe veda gli stessi panini letti dall’altro verso.'
    ],
    classroomIdeas: [
      'Spezzate la stessa teglia in due modi diversi nella stessa lezione e lasciate tutti e due alla lavagna. Non conta quale sia il migliore: conta che una teglia sola dia più di una coppia di tabelline.',
      'Partite da una teglia con il punto ovvio — un 10 o un 5 — molto prima di avvicinarvi al 7 e all’8. Il solco della quinta riga è più profondo proprio per questo, e si toglie dalle impostazioni quando state lavorando sui doppi.',
      'Usatela al contrario con i numeri quadrati: girate una teglia di 6 righe da 6 e lasciate che la classe veda che non succede assolutamente niente. Anche questo è un risultato, e vale la pena dargli un nome.'
    ],
    metaTitle: 'La teglia dei panini — spezzare una tabellina difficile',
    metaDescription: 'Una teglia di panini per la LIM: 7 righe da 6 si spezza in 5 righe da 6 e 2 righe da 6, due tabelline che la classe sa già. Senza timer né punteggio, gratuita.'
  },

  nl: {
    slug: 'breekbrood-moeilijke-tafels-handig-rekenen-groep-4-5',
    name: 'Het breekbrood',
    tagline: 'Zeven rijen van zes breekt in vijf rijen van zes en twee rijen van zes — dezelfde broodjes, twee tafels die de klas al kent.',
    about: [
      'Op het digibord ligt een breekbrood: bolletjes die tegen elkaar aan gebakken zijn, in rijen, zodat de lijn waar twee broodjes elkaar raken een lijn is waarlangs je kunt breken. Zeven rijen van zes is voor de meeste kinderen nog een moeilijke. Breek het brood bij de naad na de vijfde rij en er liggen vijf rijen van zes en twee rijen van zes — 5 × 6 = 30 en 2 × 6 = 12, dus 42. Er is niets bijgekomen en niets afgegaan: precies dezelfde 42 broodjes worden alleen als twee stukken gelezen in plaats van als één. Dat is de hele beweging, en het is de beweging waarmee elke Nederlandse methode de moeilijke tafels aanpakt.',
      'De tweede zet is een kwartslag, en die is niet wat u denkt. Dit hulpmiddel beweert nadrukkelijk níét dat 3 × 4 en 4 × 3 "hetzelfde" zijn — op dit platform staat een activiteit die juist laat zien dat 3 groepjes van 4 iets anders is dan 4 groepjes van 3, en dat klopt. Draaien is een strategische zet: het verandert wélke naden er zijn om bij te breken. Levert de zeven niets bruikbaars op, draai het brood dan en breek de zes. Bij een vierkant brood gebeurt er bij het draaien niets, en ook dat is een uitkomst die het waard is om te benoemen.',
      'Het brood zegt nooit hoeveel het er bij elkaar zijn, schrijft nooit een som op en zegt nooit of een plek een handige plek was. Geen timer, geen punten, niets wordt nagekeken — waar je breekt is precies de vraag waar de klas het over oneens mag zijn, en een hulpmiddel met een mening daarover zou dat gesprek beëindigen voordat het begint. Het notatiewerk blijft van u: u schrijft de som op het bord zoals uw klas hem schrijft. Het sluit aan bij het domein Getallen en bewerkingen van de SLO-kerndoelen en hoort in de dagelijkse rekenstart in groep 4 en 5.'
    ],
    howToUse: [
      'Zet het brood op het digibord vóórdat de kinderen binnenkomen. Vraag naar de vórm, niet naar het totaal: hoeveel rijen, en hoeveel in elke rij? Laat de klas het hardop lezen — "zeven rijen van zes" — en schrijf nog niets op.',
      'Vraag wie deze zo weet. Meestal weet niemand hem zo, en dat hardop vaststellen is meer waard dan het klinkt. Zeg erbij dat u hem zelf ook niet zomaar uit uw hoofd doet.',
      'Vraag waar u moet breken zodat u aan allebei de stukken genoeg hebt aan wat de klas al kent. Breek dan waar ze het zeggen — ook als ze een onhandige naad kiezen. Twee kinderen die het oneens zijn over de naad is precies de inhoud van deze les.',
      'Duw de stukken weer tegen elkaar en vraag of er broodjes verdwenen zijn. Breek daarna ergens ánders. Dit is de zet waar het om draait: twee verschillende breuken van hetzelfde brood binnen één minuut laten zien dat het aantal niet aan de naad hangt.',
      'Nu schrijft u het op het bord, in de schrijfwijze van uw klas: 7 × 6 = 5 × 6 + 2 × 6 = 30 + 12 = 42. Het brood doet dat met opzet niet — het houdt het materiaal stil terwijl de notatie van u blijft.',
      'Draai het brood wanneer de naden die er liggen niets opleveren. Zeven rijen van zes wordt zes rijen van zeven, dezelfde broodjes andersom gelezen, met andere naden om bij te breken.'
    ],
    classroomIdeas: [
      'Breek één brood in dezelfde les op twee verschillende naden en zet beide uitkomsten naast elkaar op het bord. De vraag is niet welke de beste is, maar dat één brood meer dan één paar tafelsommen oplevert — en dat het aantal broodjes bij allebei hetzelfde blijft.',
      'Begin in groep 4 met een brood waarvan de naad voor de hand ligt: bij de tafel van 10 of de tafel van 5. De vijfde naad ligt dieper ingesneden dan de andere, precies daarvoor. Ga pas naar de zevens en achten als de klas de zet zelf voorstelt.',
      'Zet een brood van zes rijen van zes neer en laat de klas voorspellen wat er gebeurt als het gedraaid wordt. Draai het dan, en laat ze zien dat er niets verandert. Laat een kind onder woorden brengen waaróm niet, en schrijf die zin op het bord.'
    ],
    metaTitle: 'Het breekbrood — een moeilijke tafel breken, groep 4/5',
    metaDescription: 'Breek zeven rijen van zes in vijf rijen van zes en twee rijen van zes — dezelfde broodjes, twee tafels die de klas al kent. Gratis digibordtool, groep 4/5.'
  },

  pt: {
    slug: 'assadeira-de-paezinhos-tabuada-anos-iniciais',
    name: 'A assadeira de pãezinhos',
    tagline: '7 fileiras de 6 se quebram em 5 fileiras de 6 e 2 fileiras de 6 — a conta difícil sai de duas que a turma já sabe de cor.',
    about: [
      'Uma assadeira de pãezinhos assados grudados, em fileiras, de tal jeito que a marca onde dois pãezinhos se encontram é uma marca por onde a assadeira quebra. 7 fileiras de 6 é uma conta difícil. Quebre depois da quinta fileira e ela vira 5 fileiras de 6 e 2 fileiras de 6 — duas contas que quase toda a turma já tem na ponta da língua. Nada entrou e nada saiu: 7 × 6 = 42 continua 42, só que agora lido em dois pedaços no lugar de um.',
      'Girar a assadeira de lado é o outro movimento, e ele não é o truque de que a ordem dos fatores não altera o produto — nesta plataforma existe uma atividade que ensina, de propósito, que 3 grupos de 4 e 4 grupos de 3 são situações diferentes, e ela está certa. Aqui girar é uma jogada a serviço da quebra: o que muda é quais marcas ficam ao alcance. Se do 7 não sai nada de útil, gire a assadeira e quebre o 6.',
      'A assadeira nunca mostra o total, nunca escreve a conta e nunca diz se a quebra foi boa. Onde quebrar é justamente o que a turma está ali para discutir, e um instrumento com opinião sobre isso encerraria a discussão antes de ela começar. Quem escreve 7 × 6 = 5 × 6 + 2 × 6 no quadro é você, do jeito que se escreve na escola brasileira — a ferramenta segura o material parado e deixa a escrita com a professora. Não há cronômetro, não há pontuação e nada é marcado como certo ou errado.'
    ],
    howToUse: [
      'Deixe a assadeira projetada antes de a turma entrar. Pergunte pela forma, não pelo total: quantas fileiras, e quantos pãezinhos em cada fileira?',
      'Pergunte se alguém já sabe essa de cabeça. Quase sempre ninguém sabe — e dizer em voz alta que você também não sabe essa de cor vale mais do que parece.',
      'Pergunte onde quebrar para que OS DOIS pedaços sejam contas que a turma já sabe. Quebre onde eles disserem, inclusive quando disserem um lugar esquisito.',
      'Encoste os pedaços de volta e pergunte se sumiu algum pãozinho. Depois quebre em OUTRO lugar. Duas quebras diferentes da mesma assadeira em um minuto é a aula inteira — este é o movimento que sustenta tudo.',
      'Agora escreva no quadro, você mesma, do jeito que a sua turma escreve: 7 × 6 = 5 × 6 + 2 × 6 = 30 + 12 = 42. A assadeira não escreve de propósito, porque a notação é da sala e não do aparelho.',
      'Gire a assadeira quando as quebras que aparecem não ajudarem, e deixe a turma ver os mesmos pãezinhos lidos do outro jeito.'
    ],
    classroomIdeas: [
      'Quebre a mesma assadeira de dois jeitos na mesma rodada e deixe as duas escritas no quadro, uma embaixo da outra. Não se trata de qual é melhor: uma assadeira só dá mais de um par de contas, e é isso que a turma precisa ver.',
      'Comece por uma assadeira de quebra fácil — o 10 ou o 5 — antes de chegar perto dos 7 e dos 8. A marca do quinto pãozinho vem mais funda justamente por isso, e você pode desligá-la quando a aula for de dobros.',
      'Use ao contrário nos quadrados: gire uma de 6 fileiras de 6 e deixe a turma ver que não acontece nada. Isso é um resultado, e vale dar nome a ele.'
    ],
    metaTitle: 'A assadeira de pãezinhos — tabuada difícil, anos iniciais',
    metaDescription: 'Quebre 7 fileiras de 6 em 5 e 2 fileiras de 6: a tabuada difícil sai de duas que a turma já sabe. Ferramenta gratuita para a lousa digital, anos iniciais.'
  },

  sv: {
    slug: 'bullplaten',
    name: 'Bullplåten',
    tagline: 'En plåt bullar som sitter ihop: bryt isär den där båda bitarna är uppgifter klassen redan kan, så kommer den svåra tabellen ur de lätta.',
    about: [
      'En plåt bullar som har jäst ihop i ugnen: 7 rader med 6 i varje, ett enda sammanhängande stycke, och där två bullar sitter ihop finns en skåra att bryta längs. Tre saker går att göra, inte fler. Bryt isär plåten vid en skåra, så att 7 rader med 6 ligger kvar som 5 rader med 6 och 2 rader med 6, sida vid sida på samma plåt. Skjut ihop dem igen. Eller vrid plåten ett kvarts varv. Antalet ändras aldrig, och det är materialet som garanterar det — inte en text som påstår det.',
      'Den svåra tabellen kommer ur de lätta. 7 × 6 är tung i åk 3; 5 × 6 och 2 × 6 är det inte, och plåten är redskapet som visar att de tre hänger ihop — 30 och 12 ligger kvar bredvid varandra, och 42 har aldrig varit borta någonstans. Men plåten skriver aldrig ×, + eller =, och den säger aldrig 42. Det är med flit: hur 7 × 6 ska läsas avgörs inte likadant i alla länder, och i en systeraktivitet här är 3 grupper med 4 och 4 grupper med 3 medvetet två olika situationer. Talet skrivs på tavlan, av dig, med klassens eget skrivsätt.',
      'Att vrida plåten är inget påstående om att 7 × 6 och 6 × 7 "är samma sak". Att vrida är ett drag: det byter ut vilka skåror som finns att bryta längs. Kommer ingenting bra ur sjuan vrider du plåten och bryter sexan i stället. Ingenting rättas här — ingen klocka, ingen poäng, ingen stjärna — och verktyget föreslår aldrig var man ska bryta, eftersom två elever som är oense om var skåran ska öppnas inte är ett problem att lösa utan själva innehållet i lektionen. Lgr22, matematik åk 1–3: de fyra räknesättens egenskaper och samband.'
    ],
    howToUse: [
      'Låt plåten stå framme på skärmen innan klassen kommer in, och fråga efter hur den ser ut, inte efter hur många bullar det är: hur många rader, och hur många i varje rad?',
      'Fråga om någon kan just den här uppgiften direkt. Säg högt när du inte kan den heller — det är den viktigaste meningen i hela lektionen.',
      'Fråga var ni ska bryta isär så att båda bitarna är uppgifter klassen redan kan, och bryt sedan där de säger, också när det är ett obekvämt ställe.',
      'Skjut ihop plåten igen och fråga om det försvann några bullar. Bryt sedan isär på ett annat ställe. Det är det draget hela verktyget vilar på.',
      'Skriv talet på tavlan själv, med det skrivsätt klassen använder. Plåten skriver aldrig ut det, och det är med flit.',
      'Vrid plåten ett kvarts varv när skårorna som finns inte hjälper: samma bullar, andra skåror att bryta vid.'
    ],
    classroomIdeas: [
      'Låt två elever välja var sin skåra på samma plåt, bryta isär var för sig och läsa upp sina två bitar för varandra. Båda har gjort rätt, och att de är oense är hela poängen.',
      'Åk 3, Lgr22 – de fyra räknesättens samband: ställ in 7 rader med 6 och låt klassen hitta alla ställen där båda bitarna kommer ur tabeller de redan kan. Skriv upp varje uppdelning på tavlan under varandra och läs dem tillsammans.',
      'På papper: skriv ut bladet och klipp inte — riv längs skårorna, precis som med riktiga bullar, och låt varje elev skriva sin egen mening på linjen under varje bild.'
    ],
    metaTitle: 'Bullplåten – bryt isär en plåt bullar, multiplikation åk 2-3',
    metaDescription: 'Gratis verktyg för hela klassen: en plåt bullar som sitter ihop. Bryt isär 7 rader i 5 och 2, skjut ihop igen — lika många bullar hela tiden. Åk 2-3, Lgr22.'
  },

  da: {
    slug: 'bagepladen-svaere-gangestykker-indskoling',
    name: 'Bagepladen',
    tagline: 'En plade boller, der er bagt sammen: klassen knækker den ét sted, siger begge stykker højt og henter 7 · 6 ud af 5 · 6 og 2 · 6 — pladen selv skriver hverken tegn eller facit.',
    about: [
      'Bagepladen er én plade boller, bagt så tæt at de sidder sammen. Der er ingen løse brikker at tælle: pladen er ét stykke, og de revner, hvor to boller mødes, er de steder, den kan knækkes. Klassen peger på et sted, pladen knækker dér, og de to stykker bliver liggende side om side, så begge kan læses på én gang. Der er kun tre ting at gøre: knække, skubbe sammen igen og dreje pladen en kvart omdrejning. Antallet af boller ændrer sig aldrig — heller ikke når pladen er knækket to steder.',
      'Pointen er at hente et svært stykke ud af to lette. De fleste i 2. og 3. klasse kan 5-tabellen og 2-tabellen længe før de kan 7 · 6, og knækkes en plade med 7 rækker efter række 5, ligger 5 · 6 og 2 · 6 pludselig ved siden af hinanden: 30 og 12, og dermed 42. Barnet regner ikke på et facit, det ser, hvor facit kommer fra, og opdager samtidig, at det samme antal boller kan læses på flere måder uden at blive til flere eller færre. Det ligger helt i tråd med arbejdet med tal og algebra i Fælles Mål for indskolingen.',
      'Pladen skriver ikke regnestykket. Der kommer aldrig et gangetegn, et lighedstegn eller et facit på skærmen, for der findes ikke én læsning af 7 · 6, der er rigtig i alle de lande, værktøjet bruges i — derfor er det læreren, der skriver sætningen på tavlen i den form, klassen bruger. Der er ingen tid, der løber, ingen point, ingen mærker for rigtigt og forkert, og værktøjet foreslår aldrig, hvor der skal knækkes: to børn, der er uenige om stedet, er ikke en fejl, der skal rettes, men selve timen. Og at dreje pladen er ikke en påstand om, at 7 rækker med 6 er det samme som 6 rækker med 7. Det er et strategisk træk: det giver nogle andre revner at vælge imellem.'
    ],
    howToUse: [
      'Sæt pladen på tavlen, før klassen kommer ind, og spørg om formen, ikke om antallet: hvor mange rækker, og hvor mange boller i rækken?',
      'Spørg, om nogen kan det stykke med det samme — og sig det ligeud, hvis du heller ikke selv kan det udenad. Det er ikke en prøve, det er et fælles problem.',
      'Spørg, hvor pladen skal knækkes, så I kan begge stykker i forvejen, og knæk dér, hvor de siger — også når stedet er upraktisk. Det er deres forslag, der bliver prøvet af, ikke dit.',
      'Skub stykkerne sammen igen, spørg om der forsvandt nogen boller undervejs, og knæk så et helt andet sted. Det er dét træk, hele værktøjet er bygget for: samme plade, samme antal boller, nyt sted at knække.',
      'Skriv selv regnestykket på tavlen — pladen gør det med vilje ikke. Klassen siger stykkerne højt, og du skriver dem op i den form, I bruger i klassen.',
      'Drej pladen en kvart omdrejning, når de revner, der er, ikke fører nogen vegne: så er det rækkerne den anden vej, der kan knækkes.'
    ],
    classroomIdeas: [
      'Lad to børn være uenige med vilje: den ene knækker efter række 5, den anden efter række 3. Skriv begge veje op under hinanden på tavlen, og lad klassen se, at de ender samme sted, selvom vejen dertil var forskellig.',
      'Tag en plade, ingen kan udenad — 7 rækker med 8 boller — og lad klassen finde et knæk, hvor de kan begge stykker. Drej bagefter pladen, og lad dem finde ud af, hvilke andre revner der nu er at vælge imellem.',
      'Med Lærerabonnementet følger arket til print: først den hele plade, derefter den samme plade igen, knækket ved hver af de revner, der er, med en skrivelinje under hver, så børnene selv skriver sætningen i hæftet.'
    ],
    metaTitle: 'Bagepladen — svære gangestykker på tavlen | gratis værktøj',
    metaDescription: 'En plade boller bagt sammen på tavlen: klassen knækker den ét sted, siger begge stykker højt og finder 7 · 6 i 5 · 6 og 2 · 6. Antallet ændrer sig aldrig.'
  },

  no: {
    slug: 'gangestykker-fra-kjente-fakta-multiplikasjon-2-3-trinn',
    name: 'Bolleplata',
    tagline: 'Bollene er stekt inntil hverandre, så plata er én ting – og der to boller møtes, går det ei linje klassen kan bryte langs, slik at 7 rader med 6 blir til 5 rader med 6 og 2 rader med 6 uten at én eneste bolle forsvinner.',
    about: [
      'På skjermen ligger ei plate med boller som er stekt inntil hverandre, så de har vokst sammen til én ting. Der to boller møtes, går det ei brytelinje, og den kan brytes. Bryt under rad 5 på ei plate med 7 rader med 6 boller, og du står igjen med 5 rader med 6 og 2 rader med 6, liggende ved siden av hverandre på samme plate. Ingen boller er borte. Mer er det ikke: høyst to brytelinjer, tre biter, og alltid like mange boller som før.',
      'Plata skriver ingenting. Det står aldri 7 × 6 = 42 på skjermen, og det står ikke noe tall for hvor mange boller det er til sammen heller – verktøyet sier «7 rader med 6», og der stopper det. Grunnen er enkel: ingen måte å lese «7 × 6» på er riktig i alle de elleve landene verktøyet brukes i, og det er læreren som skal skrive setningen på tavla, i den skrivemåten klassen din faktisk bruker. Bolleplata er materialet under setningen, ikke setningen.',
      'Å snu plata er et strategisk trekk, ikke en påstand om at 3 rader med 4 og 4 rader med 3 er det samme. Verktøyet sier ikke det – en annen aktivitet her lærer barna nettopp at 3 grupper med 4 og 4 grupper med 3 er to forskjellige situasjoner, og det er riktig. Du snur fordi det gir deg andre brytelinjer: får du ingenting fornuftig ut av sjutallet, snur du og bryter sekseren i stedet. Det er ingen tid som løper, ingen poeng og ingenting som blir rettet – verktøyet vurderer ingenting, og to elever som er uenige om hvor plata skal brytes, er nettopp innholdet i timen. Arbeidet ligger i LK20 under tall og algebra på 2. og 3. trinn.'
    ],
    howToUse: [
      'La plata stå på storskjermen før klassen kommer inn, og be om formen, ikke svaret: «Hvor mange rader? Hvor mange boller i hver rad?» Ingen skal regne ennå.',
      'Spør om noen kan denne fra før. Si det høyt hvis du selv ikke husker 7 rader med 6 – det er nettopp derfor plata ligger der, og klassen skal se at det er greit.',
      'Spør hvor plata skal brytes, slik at klassen kjenner begge bitene fra før. Bryt der de sier, også når forslaget er upraktisk. Bitene blir liggende ved siden av hverandre og kan leses hver for seg.',
      'Skyv bitene sammen igjen, spør om det forsvant noen boller – og bryt så et helt annet sted. Dette er trekket alt hviler på: samme plate, andre biter, like mange boller.',
      'Nå skriver du regnestykket på tavla, i den skrivemåten klassen din bruker: 7 × 6 = 5 × 6 + 2 × 6 = 42, eller slik dere pleier å sette det opp. Plata skriver det aldri selv – det er med vilje, og det er din jobb.',
      'Snu plata når brytelinjene du har, ikke hjelper. Får du ingenting ut av 7 rader, snur du og bryter sekseren i stedet – samme boller, lest den andre veien.'
    ],
    classroomIdeas: [
      'Kjør den samme plata to økter etter hverandre: første økt bryter dere bare på tvers, andre økt bare inni radene. La klassen si hva som ble lettest, og hvorfor.',
      'La to elever foreslå hvert sitt brudd på 7 rader med 6. Gjennomfør begge, og la klassen sammenligne de to veiene fram til det samme tallet – uten at du sier hvilken som var best.',
      'Ta ei plate ingen kan fra før, for eksempel 8 rader med 7, og be om et brudd der begge bitene står i gangetabellene barna allerede har jobbet med: 5 rader med 7 og 3 rader med 7.'
    ],
    metaTitle: 'Gangestykker fra kjente fakta – 2.-3. trinn | Bolleplata',
    metaDescription: 'Gratis verktøy for tavla: bollene er stekt sammen, klassen bestemmer hvor plata skal brytes, og 7 rader med 6 kommer ut av 5 rader med 6 og 2 rader med 6.'
  },

  fi: {
    slug: 'kertolasku-kertotaulu-pullapelti-alkuopetus',
    name: 'Pullapelti',
    tagline: 'Pellillinen pullia, jonka luokka katkaisee saumasta — vaikea kertolasku syntyy kahdesta helposta.',
    about: [
      'Pullapelti on taulunäytöllä yksi ainoa esine: pellillinen pullia, jotka on paistettu kiinni toisiinsa siisteihin riveihin. Rivien määrää ja rivin pituutta säädetään yhdestä kymmeneen, ja kohta, jossa kaksi pullaa koskettaa toisiaan, on sauma — juuri siitä pellin voi katkaista. Yksi katkaisu tekee pellistä kaksi palaa, jotka jäävät vierekkäin pöydälle, ja palat työnnetään takaisin kiinni yhdellä napautuksella. Katkaisuja tehdään enintään kaksi, joten paloja on korkeintaan kolme. Pullat pysyvät koko ajan tallella.',
      'Koko väline on olemassa yhtä asiaa varten: vaikean kertolaskun johtamista helpoista. Toisluokkalainen osaa kakkoset, viitoset ja kympit, mutta 7 · 6 ei ole vielä kenenkään päässä valmiina. Kun pelti katkaistaan viidennen rivin jälkeen, esiin tulee kaksi apulaskua, jotka luokka jo osaa — 5 · 6 ja 2 · 6 — ja ne ovat samat pullat. Sitten opettaja kirjoittaa taululle 5 · 6 = 30, 2 · 6 = 12 ja 7 · 6 = 42. Pelti itse ei kirjoita mitään: siinä ei näy kertomerkkiä, yhtäsuuruusmerkkiä eikä yhteismäärää missään, ei edes ruudunlukijan lukemassa tekstissä. Se on tarkoituksellista, sillä yhdessätoista maassa merkintätapa ei ole sama.',
      'Kääntäminen ei väitä, että 3 · 4 ja 4 · 3 olisivat sama tilanne. Kolme neljän ryhmää ja neljä kolmen ryhmää ovat eri asioita, ja toinen tämän alustan työkalu opettaa juuri sen eron. Kääntäminen on täällä alisteinen, strateginen liike: se vaihtaa sen, mitkä saumat ovat tarjolla. Jos seitsemästä ei irtoa mitään järkevää, käännä pelti ja katkaise kuutosen puolelta. Ei ajastinta, ei pisteitä, ei kehuja eikä korjauksia, eikä pelti koskaan ehdota, mistä saumasta kannattaisi katkaista. Kaksi lasta, jotka ovat eri mieltä katkaisukohdasta, ovat täsmälleen se sisältö, jota varten väline on tehty.'
    ],
    howToUse: [
      'Laita pelti näkyviin jo ennen kuin luokka tulee sisään, ja kysy ensimmäiseksi muotoa, älä määrää: montako riviä, montako pullaa yhdessä rivissä?',
      'Kysy, tietääkö joku tämän laskun suoraan ulkoa. Jos et itsekään tiedä, sano se ääneen. 7 · 6 ei ole valmiina toisluokkalaisen päässä eikä useinkaan opettajankaan, ja juuri se myönnetty tyhjä kohta on tunnin lähtöpiste.',
      'Kysy, mistä saumasta pelti katkaistaan niin, että kumpikin pala on luokalle tuttu — ja katkaise sieltä, mistä luokka sanoo, myös silloin kun kohta on hankala.',
      'Työnnä palat takaisin kiinni ja kysy, katosiko yhtään pullaa. Katkaise sitten TOISESTA saumasta: sama pelti, eri apulaskut. Tämä on tunnin kantava liike.',
      'Kirjoita lasku taululle itse. Pelti ei kirjoita sitä, koska merkintätapa on maakohtainen: suomalaisessa luokassa 5 · 6 = 30, 2 · 6 = 12 ja 7 · 6 = 42. Anna luokan sanoa lasku ääneen ennen kuin kirjoitat sen.',
      'Käännä pelti, kun tarjolla olevat saumat eivät auta. Seitsemän ei hajoa mukavasti, mutta käännön jälkeen katkaisukohdat ovat kuutosen puolella: samat pullat, uudet saumat.'
    ],
    classroomIdeas: [
      'Neljä tapaa, ei yhtä oikeaa: anna pareille sama pelti ja pyydä jokaista paria etsimään oma katkaisukohtansa. Kirjatkaa taululle kaikki löydetyt tavat rinnakkain — vastaus pysyy samana.',
      'Kaksi katkaisua, kolme palaa: ottakaa 8 riviä, joissa kussakin on 8, ja katkaiskaa se kolmeksi tutuksi palaksi. Kysykää sitten, oliko kolmas pala tarpeen — usein kaksi riittää, ja juuri sen huomaaminen on tunnin sisältö.',
      'OPS 2014 rakentaa kertolaskun 1.–2. luokalla konkreettisten välineiden varaan, ja siksi pelti ei näytä vastausta. Lopettakaa oikeilla pullilla — paistakaa pellillinen kiinni toisiinsa ja repikää se auki juuri siitä saumasta, jonka luokka taululla valitsi.'
    ],
    metaTitle: 'Pullapelti — vaikea kertotaulu helpoista | Ilmainen',
    metaDescription: 'Ilmainen kertolaskutyökalu taululle: pellillinen pullia riveissä, jonka luokka katkaisee saumasta. 7 · 6 hajoaa apulaskuiksi 5 · 6 ja 2 · 6. Ei kirjautumista.'
  }
};
