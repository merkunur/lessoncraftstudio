/* =====================================================================
   _exchange-machine-strings.js — the SoT for TOOL #45's UI strings
   ---------------------------------------------------------------------
   25 keys × 11 locales. Applied by apply-exchange-machine-locales.js.
   ⚠ NEVER hand-edit the strings block in `mini tools/exchange-machine.js`.

   ⭐ REBUILT, NEVER TRANSLATED (§A.13.48). Ten native panels in two
   ensembles, each a linguist + a K-3 teacher + a marketing writer. They
   were handed the ENGLISH AS A SOURCE TO AUDIT, not as a target to
   render — and it paid for itself several times over:

     · HALF THE PRODUCT SHIPPED FALSE CHROME. The operation chip flipped
       the machine into addition while `instruction`, `hintStart`,
       `hintShort`, `hintReady` and `takeAria` were all written for
       subtraction only. Found in the English before a single locale was
       authored. Fixed in the model, not the copy: `hintFill` and
       `hintAddReady` are new keys and `_hintKey()` now has an addition
       branch, with a gate assertion so it cannot come back.
     · `hintOver` WAS OFF BY ONE on the exact number the tool teaches —
       "gone past ten", when the exchange is due AT ten.
     · `hintDone` WAS BOTH FALSE AND A VERDICT. "Nothing arrived and
       nothing left" is untrue in a subtraction, where a great deal
       leaves; and under the French and Spanish default method ten
       APPEAR from nowhere, so it was flatly false in two of the largest
       markets. "The material and the writing agree" is a verdict in
       everything but vocabulary.
     · THREE NOUNS FOR ONE OBJECT — lane, tube, column — in a tool whose
       entire thesis is that they are ONE THING. The recorded
       "fourth named part" defect, self-inflicted.
     · THE PAYWALL SOLD WHAT THE FREE BUTTON ALREADY GAVE: `printBtn`
       said "Print practice sheets" while `gateBody` sold sheets to
       print. Free is now THIS sum's sheet; paid is the book.
     · `opBtn` WAS A TOGGLE WEARING A ONE-STATE LABEL ("Add instead",
       still reading "Add instead" once the machine was adding).
     · `sendAria` and `backAria` NAMED THE SAME ACT to a screen reader.
     · "outlined squares" NAMED THE MATERIAL — a shape noun, forbidden —
       and collided with "squared paper" in the same string family.

   ⚠⚠ AND A BANANA-CLASS CATCH, from three Nordic panels independently:
   the natural rendering of "the Teacher plan" is `lärarplanen` /
   `lærerplanen`, which is ONE LETTER from `läroplanen` / `læreplanen` —
   the NATIONAL CURRICULUM (Lgr22, LK20, Fælles Mål). The hyphenated
   plan-name form is used instead in sv/da/no.

   ⭐ TWO EXPLICIT, AUDITABLE EXEMPTIONS, recorded so eleven panels do
   not each assume them silently and a gate later condemn correct copy:
     1. THE CARDINALS "ONE" AND "TEN" ARE EXEMPT from the no-number-words
        rule when they name THE BASE. Base ten is not describable
        without them, and they are the tool's subject rather than a
        counted quantity. Six locales write the numeral 10 instead,
        which is also correct; both forms ship.
     2. THE IMPERATIVE IS ALLOWED where a language has no pronoun-free
        alternative. German, French and Spanish are forced into the
        INFINITIVE (which is the ordinary register of worksheets in all
        three, so nothing is lost); Dutch may use the plain imperative
        because it is identical for je and u; the Nordic and Finnish
        panels used agentless passives and the impersonal.

   [NSR-FLAG][sv][da][no][fi] per §17.5.1 — the Nordic and Finnish
   panels are confident on vocabulary and explicitly UNSURE on carry-mark
   PLACEMENT; that uncertainty is carried in NOTATION[].conf, not hidden.
   ===================================================================== */

module.exports = {
  en: {
    "title": "The Exchange Machine",
    "instruction": "Tap a column that has something to give. What crosses over comes apart into ten on the right, or gathers into one on the left — and the digit is written in the same instant.",
    "sceneLabel": "On squared paper, a sum written in columns, with its sign and the rule under it. Each column carries on downwards and shows what it holds; pale outlines mark what has to come away.",
    "hintStart": "Start at the right-hand column. Is there enough there for the outlines?",
    "hintShort": "This column has not got enough. The column to its left has something to give — tap that one.",
    "hintBlocked": "The column to the left is empty, so there is nothing there to come apart. Something further left has to come apart first.",
    "hintReady": "Every column can be taken from now. Read what stays in each one and write it under the line.",
    "hintOver": "This column has reached ten, and only one digit fits under the line. Ten of these make one of the column to its left.",
    "hintFill": "Start at the right-hand column and fill the outlines — that is the second number arriving.",
    "hintAddReady": "Every column holds fewer than ten now. Read each one and write it under the line.",
    "hintDone": "Under the line now stands what the columns hold. Through all the exchanges nothing vanished — it simply lies differently.",
    "laneAria": "the {c} column, holding {v}",
    "breakAria": "in the {c} column, let one come apart: ten arrive in the column to its right",
    "sendAria": "from the {c} column, gather ten: one arrives in the column to its left",
    "backAria": "undo the exchange in the {c} column",
    "takeAria": "take one away in the {c} column",
    "fillAria": "put one more in the {c} column",
    "stampAria": "write {v} under the line in the {c} column",
    "methodBtn": "Written method",
    "opBtn": "Change the operation",
    "nextBtn": "Another sum",
    "printBtn": "Print this sum",
    "gateTitle": "More sums, and the sheets",
    "gateBody": "More of every kind: three-digit sums and the awkward ones — an empty column that has to be filled from further left first. Plus practice sheets to print, set out the way it is written here, with the columns left empty.",
    "gateCta": "See the Teacher plan"
  },

  de: {
    "title": "Die Tauschsäulen",
    "instruction": "Eine Säule antippen, die etwas abgeben kann. Was hinübergeht, zerfällt rechts in zehn oder fügt sich links zu einem — und im selben Augenblick steht die Ziffer auf dem Papier.",
    "sceneLabel": "Auf kariertem Papier steht eine Rechnung stellengerecht untereinander, daneben das Rechenzeichen, darunter der Ergebnisstrich. Jede Säule setzt sich nach unten fort und zeigt, was darin liegt; helle Umrisse zeigen, was abgehen soll.",
    "hintStart": "Ganz rechts beginnen. Liegt dort genug für die hellen Umrisse?",
    "hintShort": "In dieser Säule liegt zu wenig. Links daneben liegt etwas — diese Säule antippen.",
    "hintBlocked": "Links daneben ist es leer, dort ist nichts zu entbündeln. Weiter links muss zuerst etwas zerfallen.",
    "hintReady": "Jetzt lässt sich in jeder Säule abnehmen. Ablesen, was liegen bleibt, und unter den Strich schreiben.",
    "hintOver": "Diese Säule hat zehn erreicht, und unter dem Strich ist nur Platz für eine Ziffer. Zehn davon werden links daneben zu einem.",
    "hintFill": "Ganz rechts beginnen und die hellen Umrisse auffüllen — so kommt die zweite Zahl dazu.",
    "hintAddReady": "In jeder Säule liegt jetzt weniger als zehn. Ablesen und unter den Strich schreiben.",
    "hintDone": "Unter dem Strich steht nun, was in den Säulen liegt. Beim Tauschen ist nichts verschwunden — es liegt nur anders.",
    "laneAria": "Säule der {c}, darin {v}",
    "breakAria": "In der Säule der {c} eines entbündeln: rechts daneben werden zehn daraus",
    "sendAria": "Aus der Säule der {c} zehn bündeln: links daneben wird eines daraus",
    "backAria": "Das Entbündeln in der Säule der {c} rückgängig machen",
    "takeAria": "In der Säule der {c} eines wegnehmen",
    "fillAria": "In der Säule der {c} eines dazulegen",
    "stampAria": "{v} in der Säule der {c} unter den Strich schreiben",
    "methodBtn": "Verfahren",
    "opBtn": "Rechenart wechseln",
    "nextBtn": "Neue Aufgabe",
    "printBtn": "Diese Aufgabe drucken",
    "gateTitle": "Mehr Aufgaben und die Übungsblätter",
    "gateBody": "Mehr von jeder Art: dreistellige Aufgaben und die kniffligen Fälle — eine leere Säule, die erst von weiter links her gefüllt werden muss. Dazu Übungsblätter zum Ausdrucken, gesetzt wie im Heft hier üblich, mit leeren Säulen.",
    "gateCta": "Zum Lehrkraft-Zugang"
  },

  fr: {
    "title": "La machine à échanger",
    "instruction": "Toucher une colonne qui a de quoi donner. Ce qui passe se défait en dix dans la colonne de droite, ou se rassemble en un seul dans celle de gauche — et le chiffre s'écrit au même instant.",
    "sceneLabel": "Sur du papier quadrillé, une opération posée en colonnes, avec son signe et le trait du résultat. Chaque colonne se prolonge vers le bas et montre ce qu'elle contient ; des contours clairs marquent ce qui doit partir.",
    "hintStart": "Commencer par la colonne de droite. Y a-t-il là de quoi couvrir les contours ?",
    "hintShort": "Cette colonne n'a pas assez. Celle de gauche a de quoi donner — la toucher.",
    "hintBlocked": "À gauche, c'est vide : rien à casser ici. Il faut d'abord que quelque chose se défasse plus loin à gauche.",
    "hintReady": "Chaque colonne peut donner maintenant. Lire ce qui reste dans chacune et l'écrire sous le trait.",
    "hintOver": "Cette colonne a atteint dix, et sous le trait il n'y a la place que pour un seul chiffre. Dix d'ici font un dans la colonne de gauche.",
    "hintFill": "Commencer par la colonne de droite et remplir les contours — c'est le second nombre qui arrive.",
    "hintAddReady": "Chaque colonne contient maintenant moins de dix. Lire chacune et l'écrire sous le trait.",
    "hintDone": "Sous le trait, il y a maintenant ce que les colonnes contiennent. Pendant les échanges, rien n'a disparu : c'est seulement réparti autrement.",
    "laneAria": "colonne des {c}, contenu {v}",
    "breakAria": "Dans la colonne des {c}, en défaire un : il en vient dix dans la colonne de droite",
    "sendAria": "Depuis la colonne des {c}, en rassembler dix : il en vient un dans la colonne de gauche",
    "backAria": "Annuler ce qui a été défait dans la colonne des {c}",
    "takeAria": "Retirer un dans la colonne des {c}",
    "fillAria": "Ajouter un dans la colonne des {c}",
    "stampAria": "Écrire {v} sous le trait, dans la colonne des {c}",
    "methodBtn": "Méthode",
    "opBtn": "Changer d'opération",
    "nextBtn": "Une autre opération",
    "printBtn": "Imprimer cette opération",
    "gateTitle": "D'autres opérations, et les fiches",
    "gateBody": "De chaque forme, davantage : les nombres à trois chiffres et les cas épineux — une colonne vide qu'il faut d'abord remplir depuis plus loin à gauche. Avec des fiches à imprimer, présentées comme on les écrit ici, colonnes laissées vides.",
    "gateCta": "Voir l'offre Enseignant"
  },

  it: {
    "title": "La macchina dei cambi",
    "instruction": "Sotto ogni colonna c'è un tubo con quanto la colonna possiede. Quando una colonna non basta, da quella a sinistra se ne apre uno: diventa 10 nella colonna a destra. All'indietro, 10 tornano a essere uno. Sul foglio il segno compare nello stesso istante.",
    "sceneLabel": "Un'operazione in colonna su carta a quadretti, con la riga del risultato. Sotto ogni colonna un tubo con quanto la colonna possiede, e i segni di quanto deve uscire. In basso i comandi: metodo scritto, operazione, nuova operazione, stampa.",
    "hintStart": "Si parte dalla colonna più a destra. Lì dentro basta per quanto deve uscire?",
    "hintShort": "Qui non basta. Nella colonna a sinistra sì: è da lì che se ne apre uno.",
    "hintBlocked": "La colonna a sinistra è vuota: lì non c'è nulla da aprire. Il cambio deve cominciare più a sinistra.",
    "hintReady": "Ora ogni colonna può dare quanto le viene chiesto. Quello che resta in ciascun tubo va scritto sotto la riga.",
    "hintOver": "Questa colonna è arrivata a 10, e sotto la riga entra una cifra sola. 10 di qui fanno uno nella colonna a sinistra.",
    "hintFill": "Si parte dalla colonna più a destra e si riempiono i segni: è il secondo numero che arriva.",
    "hintAddReady": "Ora ogni colonna ha meno di 10. Quello che c'è in ciascun tubo va scritto sotto la riga.",
    "hintDone": "Il tubo e il foglio dicono la stessa cosa. Fra le colonne nulla ha cambiato valore: ha cambiato posto.",
    "laneAria": "colonna {c}, contiene {v}",
    "breakAria": "aprire uno della colonna {c} in 10 nella colonna a destra",
    "sendAria": "riunire 10 della colonna {c} in uno nella colonna a sinistra",
    "backAria": "riportare la colonna {c} com'era",
    "takeAria": "togliere uno dalla colonna {c}",
    "fillAria": "aggiungere uno nella colonna {c}",
    "stampAria": "scrivere {v} per la colonna {c}",
    "methodBtn": "Metodo scritto",
    "opBtn": "Operazione",
    "nextBtn": "Altra operazione",
    "printBtn": "Stampa il foglio",
    "gateTitle": "Altre operazioni, e la raccolta di fogli",
    "gateBody": "Il resto del quaderno: operazioni di ogni forma, numeri a tre cifre e i casi che fanno discutere la classe, come la colonna vuota che costringe a cominciare il cambio più a sinistra. E una raccolta di fogli da stampare, impostati come si scrive in colonna nella scuola italiana.",
    "gateCta": "Il piano Insegnante"
  },

  es: {
    "title": "La máquina de los cambios",
    "instruction": "Tocar una columna que tenga algo que dar. Lo que pasa se deshace en diez en la columna de la derecha, o se junta en uno solo en la de la izquierda — y la cifra se escribe en ese mismo instante.",
    "sceneLabel": "Sobre papel cuadriculado, una operación escrita en columnas, con su signo y la raya del resultado. Cada columna sigue hacia abajo y muestra lo que tiene; unas siluetas claras señalan lo que debe salir.",
    "hintStart": "Empezar por la columna de la derecha. ¿Hay ahí bastante para las siluetas?",
    "hintShort": "En esta columna no hay bastante. En la de la izquierda sí hay algo — tocar esa.",
    "hintBlocked": "A la izquierda está vacío: ahí no hay nada que deshacer. Más a la izquierda tiene que deshacerse algo primero.",
    "hintReady": "Ya se puede sacar en todas las columnas. Leer lo que queda en cada una y escribirlo bajo la raya.",
    "hintOver": "Esta columna ha llegado a diez, y bajo la raya solo cabe una cifra. Diez de aquí son uno en la columna de la izquierda.",
    "hintFill": "Empezar por la columna de la derecha y rellenar las siluetas: es el segundo número que llega.",
    "hintAddReady": "Ahora cada columna tiene menos de diez. Leer cada una y escribirla bajo la raya.",
    "hintDone": "Bajo la raya está ahora lo que hay en las columnas. En los cambios no ha desaparecido nada: solo está repartido de otra manera.",
    "laneAria": "columna de {c}, contiene {v}",
    "breakAria": "En la columna de {c}, deshacer uno: a la derecha aparecen diez",
    "sendAria": "Desde la columna de {c}, juntar diez: a la izquierda aparece uno",
    "backAria": "Volver atrás el cambio en la columna de {c}",
    "takeAria": "Quitar uno en la columna de {c}",
    "fillAria": "Poner uno en la columna de {c}",
    "stampAria": "Escribir {v} bajo la raya, en la columna de {c}",
    "methodBtn": "Método",
    "opBtn": "Cambiar de operación",
    "nextBtn": "Otra operación",
    "printBtn": "Imprimir esta operación",
    "gateTitle": "Más operaciones, y las fichas",
    "gateBody": "De cada tipo, más: operaciones de tres cifras y los casos más espinosos — una columna vacía que hay que llenar primero desde más a la izquierda. Y fichas para imprimir, con la disposición que se usa aquí y las columnas en blanco.",
    "gateCta": "Ver el plan Docente"
  },

  pt: {
    "title": "A Máquina de Trocas",
    "instruction": "Embaixo de cada coluna há um tubo com o que aquela coluna vale. Quando uma coluna não dá conta, a coluna à esquerda abre um: viram 10 na coluna da direita. No sentido inverso, 10 se juntam de novo em um. O registro no papel acontece no mesmo instante.",
    "sceneLabel": "Uma conta armada em colunas no papel quadriculado, com o traço do resultado. Embaixo de cada coluna, um tubo com o que a coluna tem e as marcas do que precisa sair. Mais abaixo, os comandos: método escrito, operação, outra conta e impressão.",
    "hintStart": "A conta começa pela coluna da direita. O que está ali dentro dá para o que precisa sair?",
    "hintShort": "Nesta coluna não dá. Na coluna à esquerda dá: é de lá que se abre um.",
    "hintBlocked": "A coluna à esquerda está vazia — ali não há o que abrir. A troca precisa começar mais à esquerda.",
    "hintReady": "Agora cada coluna dá conta do que é pedido. O que fica em cada tubo é o que vai embaixo do traço.",
    "hintOver": "Esta coluna chegou a 10, e embaixo do traço cabe um algarismo só. 10 daqui viram um na coluna à esquerda.",
    "hintFill": "A conta começa pela coluna da direita, preenchendo as marcas: é o segundo número chegando.",
    "hintAddReady": "Agora cada coluna tem menos de 10. O que está em cada tubo vai embaixo do traço.",
    "hintDone": "O tubo e o papel dizem a mesma coisa. Entre as colunas nada mudou de valor — mudou de lugar.",
    "laneAria": "coluna {c}, com {v}",
    "breakAria": "abrir um da coluna {c} em 10 na coluna à direita",
    "sendAria": "juntar 10 da coluna {c} em um na coluna à esquerda",
    "backAria": "voltar a coluna {c} como estava",
    "takeAria": "tirar um da coluna {c}",
    "fillAria": "pôr um na coluna {c}",
    "stampAria": "registrar {v} na coluna {c}",
    "methodBtn": "Método escrito",
    "opBtn": "Operação",
    "nextBtn": "Outra conta",
    "printBtn": "Imprimir a folha",
    "gateTitle": "Mais contas, e o conjunto de folhas",
    "gateBody": "O resto do caderno: contas de todo tipo, números de três algarismos e os casos que fazem a turma conversar, como a coluna vazia que obriga a começar a troca mais à esquerda. E um conjunto de folhas para imprimir, armadas do jeito que se escreve na escola brasileira.",
    "gateCta": "O plano Professor"
  },

  nl: {
    "title": "De Wisselmachine",
    "instruction": "Tik op een kolom die iets kan afstaan. Wat overgaat, valt rechts uiteen in tien of komt links samen tot één — en op hetzelfde moment verschijnt het cijfer op papier.",
    "sceneLabel": "Op ruitjespapier staat een som in kolommen, met het rekenteken en de streep voor de uitkomst. Elke kolom loopt naar beneden door en laat zien wat erin zit; lichte omtrekken geven aan wat eraf moet.",
    "hintStart": "Begin rechts. Zit daar genoeg voor de lichte omtrekken?",
    "hintShort": "In deze kolom zit te weinig. Links ernaast zit wel iets — tik daarop.",
    "hintBlocked": "Links ernaast is het leeg, daar valt niets te wisselen. Verderop naar links moet eerst iets uiteenvallen.",
    "hintReady": "Nu kan er in elke kolom afgehaald worden. Lees af wat er blijft liggen en schrijf dat onder de streep.",
    "hintOver": "Deze kolom heeft tien bereikt, en onder de streep past maar één cijfer. Tien hiervan worden er één in de kolom links.",
    "hintFill": "Begin rechts en vul de lichte omtrekken: dat is het tweede getal dat erbij komt.",
    "hintAddReady": "In elke kolom ligt nu minder dan tien. Lees af en schrijf het onder de streep.",
    "hintDone": "Onder de streep staat nu wat er in de kolommen ligt. Bij het wisselen is er niets verdwenen — het ligt alleen anders.",
    "laneAria": "kolom van de {c}, inhoud {v}",
    "breakAria": "In de kolom van de {c} er één laten uiteenvallen: rechts komen er tien",
    "sendAria": "Uit de kolom van de {c} tien samenvoegen: links komt er één",
    "backAria": "Het uiteenvallen in de kolom van de {c} ongedaan maken",
    "takeAria": "In de kolom van de {c} er één afhalen",
    "fillAria": "In de kolom van de {c} er één bij leggen",
    "stampAria": "{v} onder de streep schrijven in de kolom van de {c}",
    "methodBtn": "Werkwijze",
    "opBtn": "Andere bewerking",
    "nextBtn": "Nieuwe som",
    "printBtn": "Deze som afdrukken",
    "gateTitle": "Meer sommen, en de bladen",
    "gateBody": "Van elke soort meer: sommen met drie cijfers en de lastige gevallen — een lege kolom die eerst van verderop links gevuld moet worden. Plus oefenbladen om af te drukken, gezet zoals het hier op school geschreven wordt, met de kolommen leeg.",
    "gateCta": "Bekijk het Leerkracht-abonnement"
  },

  sv: {
    "title": "Växlingsmaskinen",
    "instruction": "Under varje kolumn sitter ett rör med det kolumnen är värd. När en kolumn inte räcker öppnas en ur kolumnen till vänster: den blir 10 i kolumnen till höger. Åt andra hållet slås 10 ihop till en igen. Samma sekund skrivs det på papperet.",
    "sceneLabel": "En uppställning på rutat papper, med strecket under. Under varje kolumn ett rör med det kolumnen har, och märken för det som ska bort. Längst ned reglagen: skrivsätt, räknesätt, ny uppställning och utskrift.",
    "hintStart": "Uppställningen börjar i kolumnen längst till höger. Räcker det som ligger där till det som ska bort?",
    "hintShort": "Här räcker det inte. I kolumnen till vänster gör det — därifrån öppnas en.",
    "hintBlocked": "Kolumnen till vänster är tom, så där finns inget att öppna. Växlingen måste börja längre till vänster.",
    "hintReady": "Nu räcker varje kolumn till det som ska bort. Det som blir kvar i rören skrivs under strecket.",
    "hintOver": "Den här kolumnen har nått 10, och under strecket får bara en siffra plats. 10 härifrån blir en i kolumnen till vänster.",
    "hintFill": "Uppställningen börjar i kolumnen längst till höger, och märkena fylls: det är det andra talet som kommer till.",
    "hintAddReady": "Nu ligger det mindre än 10 i varje kolumn. Det som ligger i rören skrivs under strecket.",
    "hintDone": "Rören och papperet säger samma sak. Ingenting har bytt värde mellan kolumnerna — bara plats.",
    "laneAria": "kolumn {c}, innehåller {v}",
    "breakAria": "öppna en ur kolumn {c} till 10 i kolumnen till höger",
    "sendAria": "slå ihop 10 i kolumn {c} till en i kolumnen till vänster",
    "backAria": "återställa kolumn {c}",
    "takeAria": "ta bort en ur kolumn {c}",
    "fillAria": "lägga till en i kolumn {c}",
    "stampAria": "skriva {v} för kolumn {c}",
    "methodBtn": "Skrivsätt",
    "opBtn": "Räknesätt",
    "nextBtn": "Ny uppställning",
    "printBtn": "Utskrift",
    "gateTitle": "Fler uppställningar, och bladen",
    "gateBody": "Här finns fortsättningen: uppställningar av alla former, tresiffriga tal och de fall som brukar få en klass att börja prata — den tomma kolumnen som tvingar växlingen att börja längre till vänster. Dessutom blad att skriva ut, uppställda som det skrivs i svensk skola.",
    "gateCta": "Lärare-planen"
  },

  da: {
    "title": "Vekslemaskinen",
    "instruction": "Under hver kolonne sidder et rør med det, kolonnen er værd. Når en kolonne ikke rækker, åbnes én fra kolonnen til venstre: den bliver til 10 i kolonnen til højre. Den anden vej samles 10 igen til én. Det skrives på papiret i samme øjeblik.",
    "sceneLabel": "Et regnestykke stillet op i kolonner på ternet papir, med stregen under. Under hver kolonne et rør med det, kolonnen har, og mærker for det, der skal væk. Nederst betjeningen: skrivemåde, regneart, nyt stykke og udskrift.",
    "hintStart": "Der begyndes i kolonnen længst til højre. Rækker det, der ligger dér, til det, der skal væk?",
    "hintShort": "Her rækker det ikke. I kolonnen til venstre gør det — derfra åbnes én.",
    "hintBlocked": "Kolonnen til venstre er tom, så dér er intet at åbne. Vekslingen må begynde længere til venstre.",
    "hintReady": "Nu rækker hver kolonne til det, der skal væk. Det, der bliver tilbage i rørene, skrives under stregen.",
    "hintOver": "Denne kolonne er nået til 10, og under stregen er der kun plads til ét ciffer. 10 herfra bliver til én i kolonnen til venstre.",
    "hintFill": "Der begyndes i kolonnen længst til højre, og mærkerne fyldes: det er det andet tal, der kommer til.",
    "hintAddReady": "Nu ligger der mindre end 10 i hver kolonne. Det, der ligger i rørene, skrives under stregen.",
    "hintDone": "Rørene og papiret siger det samme. Intet har skiftet værdi mellem kolonnerne — kun plads.",
    "laneAria": "kolonne {c}, indeholder {v}",
    "breakAria": "åbne én fra kolonne {c} til 10 i kolonnen til højre",
    "sendAria": "samle 10 i kolonne {c} til én i kolonnen til venstre",
    "backAria": "sætte kolonne {c} tilbage, som den var",
    "takeAria": "tage én væk i kolonne {c}",
    "fillAria": "lægge én til i kolonne {c}",
    "stampAria": "skrive {v} for kolonne {c}",
    "methodBtn": "Skrivemåde",
    "opBtn": "Regneart",
    "nextBtn": "Nyt stykke",
    "printBtn": "Udskrift",
    "gateTitle": "Flere stykker, og arkene",
    "gateBody": "Her ligger fortsættelsen: stykker af alle former, tal med tre cifre og de tilfælde, der plejer at få en klasse til at tale sammen — den tomme kolonne, der tvinger vekslingen til at begynde længere til venstre. Dertil ark til at printe, stillet op, som der skrives i dansk skole.",
    "gateCta": "Lærer-planen"
  },

  no: {
    "title": "Vekslingsmaskinen",
    "instruction": "Under hver kolonne sitter et rør med det kolonnen er verdt. Når en kolonne ikke rekker, åpnes én fra kolonnen til venstre: den blir til 10 i kolonnen til høyre. Den andre veien samles 10 igjen til én. Det skrives på papiret i samme øyeblikk.",
    "sceneLabel": "Et regnestykke satt opp i kolonner på rutete papir, med streken under. Under hver kolonne et rør med det kolonnen har, og merker for det som skal bort. Nederst knappene: skrivemåte, regneart, nytt stykke og utskrift.",
    "hintStart": "Det begynner i kolonnen lengst til høyre. Rekker det som ligger der, til det som skal bort?",
    "hintShort": "Her rekker det ikke. I kolonnen til venstre gjør det — derfra åpnes én.",
    "hintBlocked": "Kolonnen til venstre er tom, så der er ingenting å åpne. Vekslingen må begynne lenger til venstre.",
    "hintReady": "Nå rekker hver kolonne til det som skal bort. Det som blir igjen i rørene, skrives under streken.",
    "hintOver": "Denne kolonnen har nådd 10, og under streken er det plass til bare ett siffer. 10 herfra blir til én i kolonnen til venstre.",
    "hintFill": "Det begynner i kolonnen lengst til høyre, og merkene fylles: det er det andre tallet som kommer til.",
    "hintAddReady": "Nå ligger det mindre enn 10 i hver kolonne. Det som ligger i rørene, skrives under streken.",
    "hintDone": "Rørene og papiret sier det samme. Ingenting har byttet verdi mellom kolonnene — bare plass.",
    "laneAria": "kolonne {c}, inneholder {v}",
    "breakAria": "åpne én fra kolonne {c} til 10 i kolonnen til høyre",
    "sendAria": "samle 10 i kolonne {c} til én i kolonnen til venstre",
    "backAria": "sette kolonne {c} tilbake slik den var",
    "takeAria": "ta bort én i kolonne {c}",
    "fillAria": "legge til én i kolonne {c}",
    "stampAria": "skrive {v} for kolonne {c}",
    "methodBtn": "Skrivemåte",
    "opBtn": "Regneart",
    "nextBtn": "Nytt stykke",
    "printBtn": "Utskrift",
    "gateTitle": "Flere stykker, og arkene",
    "gateBody": "Her ligger fortsettelsen: stykker av alle former, tresifrede tall og tilfellene som pleier å få en klasse til å snakke sammen — den tomme kolonnen som tvinger vekslingen til å begynne lenger til venstre. I tillegg ark til å skrive ut, satt opp slik det skrives i norsk skole.",
    "gateCta": "Lærer-planen"
  },

  fi: {
    "title": "Vaihtokone",
    "instruction": "Jokaisen sarakkeen alla on putki, ja putkessa on se, mitä sarakkeessa on. Kun sarake ei riitä, vasemmanpuoleisesta sarakkeesta avataan yksi: siitä tulee 10 oikeanpuoleiseen sarakkeeseen. Toisin päin 10 kootaan takaisin yhdeksi. Samalla hetkellä se kirjoittuu paperille.",
    "sceneLabel": "Allekkain kirjoitettu lasku ruutupaperilla ja sen alla vastausviiva. Jokaisen sarakkeen alla putki, jossa on sarakkeen sisältö, sekä merkit siitä, minkä pitää lähteä pois. Alimpana säätimet: merkintätapa, laskutoimitus, uusi tehtävä ja tulostus.",
    "hintStart": "Aloitetaan oikeanpuoleisimmasta sarakkeesta. Riittääkö siellä siihen, minkä pitää lähteä pois?",
    "hintShort": "Tässä sarakkeessa ei riitä. Vasemmalla riittää — sieltä avataan yksi.",
    "hintBlocked": "Vasemmanpuoleinen sarake on tyhjä, joten siellä ei ole mitään avattavaa. Vaihto on aloitettava kauempaa vasemmalta.",
    "hintReady": "Nyt jokaisesta sarakkeesta lähtee se, mitä pyydetään. Se, mitä putkiin jää, kirjoitetaan viivan alle.",
    "hintOver": "Tässä sarakkeessa on 10 tai enemmän, ja viivan alle mahtuu vain yksi numero. 10 täältä on yksi vasemmanpuoleisessa sarakkeessa.",
    "hintFill": "Aloitetaan oikeanpuoleisimmasta sarakkeesta ja täytetään merkit: siinä tulee toinen luku mukaan.",
    "hintAddReady": "Nyt jokaisessa sarakkeessa on alle 10. Se, mitä putkissa on, kirjoitetaan viivan alle.",
    "hintDone": "Putket ja paperi kertovat saman. Mikään ei ole vaihtanut arvoa sarakkeiden välillä — vain paikkaa.",
    "laneAria": "sarake {c}, sisältö {v}",
    "breakAria": "avata sarakkeesta {c} yksi, josta tulee 10 oikeanpuoleiseen sarakkeeseen",
    "sendAria": "koota sarakkeen {c} 10 yhdeksi vasemmanpuoleiseen sarakkeeseen",
    "backAria": "palauttaa sarake {c} ennalleen",
    "takeAria": "poistaa sarakkeesta {c} yksi",
    "fillAria": "lisätä sarakkeeseen {c} yksi",
    "stampAria": "kirjoittaa {v} sarakkeen {c} kohdalle",
    "methodBtn": "Merkintätapa",
    "opBtn": "Laskutoimitus",
    "nextBtn": "Uusi tehtävä",
    "printBtn": "Tulostus",
    "gateTitle": "Lisää tehtäviä ja tulostettavat sivut",
    "gateBody": "Tästä jatkuu loput: kaikenmuotoisia tehtäviä, kolminumeroisia lukuja ja ne tapaukset, joista luokka yleensä alkaa keskustella — tyhjä sarake, jonka takia vaihto on aloitettava kauempaa vasemmalta. Lisäksi tulostettavia sivuja, jotka on aseteltu niin kuin suomalaisessa koulussa kirjoitetaan.",
    "gateCta": "Opettaja-tilaus"
  }
};
