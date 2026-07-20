/**
 * Teaching-block copy for three families that share a shape but not a mechanic:
 * math-worksheet (symbol substitution), more-less (comparing quantities) and
 * code-addition (a picture code).
 *
 * ONE MODULE, because none of them needs per-locale RULES — only per-locale strings. That is
 * the same test math-puzzle failed (it needed to know whether a locale prints a curricular
 * band or a measured maximum, and how each language names a ten-crossing) and picture-
 * arithmetic passed.
 *
 * WHAT MAY BE PRINTED, PER FAMILY. This is the whole design, and it differs by family and
 * even by MODE within a family, so it is stated once here rather than implied:
 *
 *   math-worksheet   The equations are printed on the sheet -> quotable, and they are what
 *                    makes one deck different from another. What each picture is WORTH is
 *                    the answer -> never printed. So the block quotes equations and names no
 *                    values; it also skips the objects sentence, because the equations
 *                    already name every picture and saying them twice is padding.
 *
 *   more-less        In the RELATION mode the counts sit beside the pictures on the sheet,
 *                    so the pairs may be quoted; the sign is the answer and may not.
 *                    In CHECK-CROSS the counts ARE the answer — the same field, one mode
 *                    later — so nothing numeric is quoted and the objects sentence carries
 *                    the per-deck content instead.
 *
 *   code-addition    Every total is the answer, and the addends live only in a key baked
 *                    into the sheet image. So NOTHING numeric may be quoted: the band the
 *                    totals stay inside is a property of the sheet, a maximum would be one
 *                    of its answers. The pictures carry the per-deck content.
 *
 * The nouns for more-less are translated from the image library (§6) because that family
 * stores only a file path; math-worksheet and code-addition already hold localised names.
 */
'use strict';

var HEADINGS = require('./picture-arith.js').headings;

var L = {};

/* ------------------------------------------------------------------ English */
L.en = {
  check: 'A separate answer-key PDF comes with the sheet, and the on-screen version marks each answer as the child goes.',
  objects: function (list) { return 'Pictures on this sheet: ' + list + '.'; },
  uses: [
    'Slot it into a weekly math rotation, where one group works on this while another meets the teacher.',
    'Send it home once the method has been taught in class, so families meet the same approach.',
    'Two children can sit side by side, take a problem each, and compare how they reached the number.',
    'Keep a small stack by the desk for children who finish other work ahead of the group.',
    'Leave it for a supply teacher, since the instruction is short and no equipment is needed.',
    'Use one sheet as a quick check before a unit and a second afterwards to see what has shifted.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Two pictures stand for two hidden numbers, and the child works out both.',
      'three-symbols': 'Three pictures hold hidden numbers, so one value found leads to the next.',
      'four-symbols': 'Four pictures share the sheet, and each value found narrows the rest.',
    },
    note: 'A picture keeps one value throughout, so a value found carries onward.',
    mixedOps: 'Equations add and subtract, so the child reads each sign.',
    range: {
      10: 'Numbers and results here stay within ten.',
      20: 'Numbers and results here stay within twenty.',
      100: 'Numbers and results here stay within a hundred.',
    },
    chips: { type: 'Symbol substitution', r10: 'Within 10', r20: 'Within 20', r100: 'Within 100' },
  },
  ml: {
    modes: {
      relation: 'Each pair shows the same object in two amounts, and the child writes the greater-than, less-than or equals sign.',
      'check-cross': 'One scene mixes two kinds of object; the child counts each kind, records both numbers, and ticks the larger.',
      mixed: 'This sheet carries both tasks, so the child moves between writing a sign and counting a mixed scene.',
    },
    sameObject: 'Both sides show the same thing, so the answer cannot come from what it is, only how many.',
    numeralSide: 'One side of some pairs is a numeral, so that quantity is held in mind, not counted.',
    range: 'Counts in the pairs stay within ten, small enough to check by eye.',
    chips: { type: 'Comparing quantities', range: 'Within 10' },
  },
  ca: {
    modes: {
      plain: 'A key gives each picture a number, and every row asks for the total of the pictures shown.',
      'secret-word': 'The same code hides a word: each total points to a letter, so every row has to be right.',
    },
    note: 'The child decodes before calculating, so each row is a two-step task rather than a straightforward sum.',
    range: {
      10: 'Totals stay within ten across every row on the sheet.',
      20: 'Totals stay within twenty across every row on the sheet.',
      100: 'Totals stay within a hundred across every row on the sheet.',
    },
    chips: { type: 'Picture code', r10: 'Totals within 10', r20: 'Totals within 20', r100: 'Totals within 100' },
  },
};

/* ------------------------------------------------------------------- German */
L.de = {
  check: 'Ein separates PDF enthält die Lösungen; im Browser wird jede Eingabe sofort geprüft, auf dem Papier bleibt die Prüfung bei Ihnen.',
  objects: function (list) { return 'Auf dem Blatt kommen diese Bilder vor: ' + list + '.'; },
  uses: [
    'Das Blatt passt an eine Mathestation oder in den Tagesplan und lässt sich dort mehrfach anbieten.',
    'Als Hausaufgabe geben Sie es mit, sobald das Vorgehen im Unterricht besprochen worden ist.',
    'Zu zweit bearbeitet, erklärt ein Kind dem anderen seinen Rechenweg, bevor beide die Ergebnisse vergleichen.',
    'Kinder, die früher fertig sind, arbeiten selbstständig daran weiter, ohne dass Sie etwas erklären müssen.',
    'Ohne Vorbereitung nutzbar, wenn die Klasse kurzfristig von einer fremden Lehrkraft betreut wird.',
    'In der Kleingruppe begleiten Sie einzelne Kinder Schritt für Schritt durch die ersten Aufgaben.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Zwei verschiedene Bilder stehen für je eine Zahl; das Kind ermittelt beide Werte aus den vorgegebenen Gleichungen.',
      'three-symbols': 'Drei verschiedene Bilder sind zu bestimmen; ein einmal gefundener Wert hilft beim Lösen der übrigen Gleichungen weiter.',
      'four-symbols': 'Vier verschiedene Bilder machen das Blatt anspruchsvoller, weil mehrere Werte nacheinander erschlossen und dabei im Kopf behalten werden.',
    },
    note: 'Dasselbe Bild steht auf dem ganzen Blatt für dieselbe Zahl, ein gefundener Wert gilt also weiter.',
    mixedOps: 'Auf diesem Blatt wird sowohl addiert als auch subtrahiert.',
    range: {
      10: 'Die Ergebnisse und die abgedruckten Zahlen bleiben im Zahlenraum bis 10.',
      20: 'Die Ergebnisse und die abgedruckten Zahlen bleiben im Zahlenraum bis 20.',
      100: 'Die Ergebnisse und die abgedruckten Zahlen bleiben im Zahlenraum bis 100.',
    },
    chips: { type: 'Bilder als Platzhalter', r10: 'Zahlenraum bis 10', r20: 'Zahlenraum bis 20', r100: 'Zahlenraum bis 100' },
  },
  ml: {
    modes: {
      relation: 'In jedem Paar steht dasselbe Objekt auf beiden Seiten in unterschiedlicher Anzahl; das Kind setzt das passende Zeichen.',
      'check-cross': 'Ein Bild zeigt zwei Sorten durcheinander; das Kind zählt beide, notiert die Anzahlen und kreuzt die größere Menge an.',
      mixed: 'Das Blatt verbindet beide Formen: Vergleichspaare mit Zeichen und eine gemischte Szene, in der zwei Sorten gezählt werden.',
    },
    sameObject: 'Weil auf beiden Seiten dasselbe Objekt liegt, entscheidet allein die Anzahl über den Vergleich.',
    numeralSide: 'Bei manchen Paaren steht statt einer Gruppe eine Ziffer, die Menge muss dann vorgestellt werden.',
    range: 'Die verglichenen Mengen bleiben klein und liegen im Zahlenraum bis 10.',
    chips: { type: 'Mengen vergleichen', range: 'Zahlenraum bis 10' },
  },
  ca: {
    modes: {
      plain: 'Ein Schlüssel ordnet jedem Bild eine Zahl zu; in jeder Zeile werden mehrere Bilder zusammengezählt.',
      'secret-word': 'Jede Summe steht zugleich für einen Buchstaben; nur wenn alle Zeilen stimmen, ergibt sich am Ende ein Lösungswort.',
    },
    note: 'Erst nachschlagen, dann rechnen: Die Werte müssen bestimmt sein, bevor überhaupt addiert werden kann.',
    range: {
      10: 'Alle Summen der einzelnen Zeilen bleiben im Zahlenraum bis 10.',
      20: 'Alle Summen der einzelnen Zeilen bleiben im Zahlenraum bis 20.',
      100: 'Alle Summen der einzelnen Zeilen bleiben im Zahlenraum bis 100.',
    },
    chips: { type: 'Rechnen mit Bildschlüssel', r10: 'Zahlenraum bis 10', r20: 'Zahlenraum bis 20', r100: 'Zahlenraum bis 100' },
  },
};

/* -------------------------------------------------------------------- Dutch */
L.nl = {
  check: 'Het antwoordblad staat los in pdf; werkt je leerling online, dan wordt elk ingevuld antwoord meteen nagekeken.',
  objects: function (list) { return 'Deze plaatjes kom je tegen: ' + list + '.'; },
  uses: [
    'Leg het blad klaar bij het zelfstandig werken, zodat je leerlingen er tijdens de rekenronde zelf mee aan de slag kunnen.',
    'Zet het in na de instructie als verwerking, of geef het mee als korte rekentaak voor thuis.',
    'Laat een tweetal het blad om de beurt invullen en elkaar hardop uitleggen hoe ze aan een getal komen.',
    'Houd een paar exemplaren klaar voor leerlingen die hun weektaak af hebben en nog verder willen rekenen.',
    'Neem het op in de map voor de vervanger; de opdracht spreekt voor zich en vraagt weinig uitleg.',
    'Gebruik het in de verlengde instructie met een klein groepje dat dit getalgebied nog aan het inslijpen is.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Twee plaatjes staan voor twee getallen; je leerling zoekt uit welk getal erbij hoort.',
      'three-symbols': 'Drie plaatjes verbergen elk een getal; die waarden komen uit de sommen zelf.',
      'four-symbols': 'Vier plaatjes maken het zoekwerk groter; je leerling houdt alle vier de waarden bij.',
    },
    note: 'Eenzelfde plaatje is overal hetzelfde getal, dus een gevonden waarde helpt verderop.',
    mixedOps: 'Op dit blad wisselen plussommen en minsommen elkaar af.',
    range: {
      10: 'Getallen en uitkomsten blijven binnen het getalgebied t/m 10.',
      20: 'Getallen en uitkomsten blijven binnen het getalgebied t/m 20.',
      100: 'Getallen en uitkomsten blijven binnen het getalgebied t/m 100.',
    },
    chips: { type: 'Plaatjes als getallen', r10: 'Getalgebied t/m 10', r20: 'Getalgebied t/m 20', r100: 'Getalgebied t/m 100' },
  },
  ml: {
    modes: {
      relation: 'Bij elk paar staat hetzelfde voorwerp links en rechts; je leerling vergelijkt de aantallen en schrijft het teken ertussen.',
      'check-cross': 'In een tafereel liggen twee soorten door elkaar; je leerling telt ze allebei, noteert de aantallen en vinkt de grootste soort aan.',
      mixed: 'Dit blad combineert beide vormen: paren waar een teken tussen moet, en een tafereel waarin twee soorten geteld worden.',
    },
    sameObject: 'Links en rechts staat hetzelfde voorwerp; alleen het aantal verschilt, dus de vergelijking gaat echt over hoeveelheid.',
    numeralSide: 'Aan een kant staat soms een getal in plaats van een groepje; die hoeveelheid moet je leerling dan vasthouden.',
    range: 'De aantallen in de groepjes blijven binnen het getalgebied t/m 10.',
    chips: { type: 'Vergelijken en tellen', range: 'Getalgebied t/m 10' },
  },
  ca: {
    modes: {
      plain: 'Bovenaan staat een codetabel waarin elk plaatje een getal krijgt; daarna telt je leerling per rij de plaatjes bij elkaar op.',
      'secret-word': 'Elke uitkomst hoort bij een letter; samen vormen die letters een woord dat pas tevoorschijn komt als alle rijen kloppen.',
    },
    note: 'Eerst opzoeken, dan rekenen: elke waarde komt uit de codetabel voordat je leerling begint met optellen.',
    range: {
      10: 'De uitkomsten van de rijen blijven binnen het getalgebied t/m 10.',
      20: 'De uitkomsten van de rijen blijven binnen het getalgebied t/m 20.',
      100: 'De uitkomsten van de rijen blijven binnen het getalgebied t/m 100.',
    },
    chips: { type: 'Rekenen met een code', r10: 'Getalgebied t/m 10', r20: 'Getalgebied t/m 20', r100: 'Getalgebied t/m 100' },
  },
};

/* ------------------------------------------------------------------- French */
L.fr = {
  check: "Le corrigé est joint dans un PDF distinct, et la version en ligne indique la justesse de chaque réponse pendant la résolution.",
  objects: function (list) { return "Images de la fiche : " + list + "."; },
  uses: [
    "En rotation d'ateliers, cette fiche tient dans un créneau court et se range ensuite dans le porte-vues du groupe.",
    "À donner en devoir du soir quand la notion a déjà été travaillée collectivement en classe.",
    "À deux, un élève lit la consigne à voix haute pendant que l'autre écrit, puis les rôles s'inversent.",
    "Dans la bannette d'autonomie, elle occupe les élèves rapides sans ouvrir une nouvelle notion.",
    "Un remplaçant peut la lancer sans préparation : la consigne se comprend à la seule lecture de la fiche.",
    "En APC ou en petit groupe de besoin, elle sert de support d'observation pendant que les élèves cherchent.",
  ],
  mw: {
    modes: {
      'two-symbols': "Deux images à élucider : chacune remplace un nombre, et les calculs suffisent.",
      'three-symbols': "Trois images à élucider : il faut croiser les calculs, aucune ne se déduit seule.",
      'four-symbols': "Quatre images à élucider : il faut tenir plusieurs valeurs et ordonner sa recherche.",
    },
    note: "Une image garde la même valeur partout : ce qui est trouvé sert ensuite.",
    mixedOps: "La fiche mêle additions et soustractions : lire le signe d'abord.",
    range: {
      10: "Les nombres et les résultats ne dépassent pas dix.",
      20: "Le travail va jusqu'à vingt, résultats compris.",
      100: "Le travail va jusqu'à cent, résultats compris.",
    },
    chips: { type: "Substitution imagée", r10: "Jusqu'à dix", r20: "Jusqu'à vingt", r100: "Jusqu'à cent" },
  },
  ml: {
    modes: {
      relation: "Des paires à comparer : le même objet des deux côtés, en quantités différentes, et le signe à écrire.",
      'check-cross': "Une seule scène où deux objets sont mélangés : compter chaque sorte, écrire les deux nombres, cocher la plus nombreuse.",
      mixed: "La fiche réunit les deux exercices : des paires où placer le signe, puis une scène mélangée à dénombrer et à cocher.",
    },
    sameObject: "Le même objet figure des deux côtés : la comparaison ne peut se régler que sur la quantité.",
    numeralSide: "Sur certaines paires, un côté porte un nombre écrit : la quantité se tient en tête, sans comptage.",
    range: "Les groupes à comparer restent en dessous de dix objets.",
    chips: { type: "Comparaison de quantités", range: "Jusqu'à dix" },
  },
  ca: {
    modes: {
      plain: "Une clé attribue un nombre à chaque image, puis chaque ligne additionne les images et demande le total.",
      'secret-word': "Même principe, mais les totaux désignent des lettres : le mot caché n'apparaît que si chaque ligne est juste.",
    },
    note: "Décoder d'abord, calculer ensuite : la lecture de la clé précède l'addition, ce qui fait deux étapes.",
    range: {
      10: "Quelle que soit la ligne, les totaux restent en dessous de dix.",
      20: "Les totaux se tiennent dans les nombres jusqu'à vingt, sans les dépasser.",
      100: "Les totaux vont jusqu'à cent, ce qui demande un calcul en plusieurs étapes.",
    },
    chips: { type: "Addition codée", r10: "Totaux jusqu'à dix", r20: "Totaux jusqu'à vingt", r100: "Totaux jusqu'à cent" },
  },
};

/* ------------------------------------------------------------------ Spanish */
L.es = {
  check: 'Las soluciones se descargan en un PDF independiente; en pantalla, cada respuesta se valida en el momento de escribirla.',
  objects: function (list) { return 'Los dibujos de esta ficha son: ' + list + '.'; },
  uses: [
    'Déjala fija en el taller de números para que cada alumno la resuelva cuando le toque ese turno.',
    'Envíala a casa el mismo día que presentes el contenido, para afianzarlo sin necesidad de material añadido.',
    'En trabajo por parejas, cada alumno resuelve la mitad de la ficha y después contrastan lo escrito.',
    'Guarda unas copias en la bandeja de ampliación para quienes acaban la tarea antes que el resto.',
    'Quien sustituya puede repartirla sin conocer la programación, porque la consigna se entiende sin explicación previa.',
    'Úsala al abrir la unidad para ver de dónde parte cada alumno antes de seguir avanzando.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Dos dibujos distintos ocultan un número cada uno, y el alumno deduce su valor.',
      'three-symbols': 'Con tres dibujos, cada valor hallado se traslada a la igualdad siguiente y estrecha las posibilidades.',
      'four-symbols': 'Con cuatro dibujos, el alumno decide por dónde empezar antes de despejar cada valor.',
    },
    note: 'Cada dibujo vale siempre lo mismo, y ese valor sirve en las demás igualdades.',
    mixedOps: 'La ficha combina sumas y restas: el alumno reconoce cada operación.',
    range: {
      10: 'Los números y los resultados no pasan de diez.',
      20: 'Los números y los resultados llegan hasta veinte.',
      100: 'Los números y los resultados no llegan a cien.',
    },
    chips: { type: 'Igualdades con dibujos', r10: 'Hasta diez', r20: 'Hasta veinte', r100: 'Hasta cien' },
  },
  ml: {
    modes: {
      relation: 'Cada pareja muestra el mismo objeto en dos cantidades distintas y el alumno escribe el signo mayor, menor o igual.',
      'check-cross': 'Una escena mezcla dos clases de objetos: hay que contar cada una, anotar ambas cifras y marcar la más numerosa.',
      mixed: 'La ficha alterna parejas con signo y escenas mezcladas, de manera que se comparan cantidades de dos formas seguidas.',
    },
    sameObject: 'Como el objeto es el mismo a los dos lados, la comparación solo puede decidirse contando cuántos hay.',
    numeralSide: 'En algunas parejas un lado es una cifra, y esa cantidad hay que sostenerla mentalmente sin contarla.',
    range: 'Ninguno de los grupos que se comparan pasa de diez elementos.',
    chips: { type: 'Comparar cantidades', range: 'Grupos hasta diez' },
  },
  ca: {
    modes: {
      plain: 'Una clave asigna un número a cada dibujo y después cada fila suma los dibujos que aparecen en ella.',
      'secret-word': 'Los resultados de las filas se traducen en letras que forman una palabra, y esta solo aparece si todos son correctos.',
    },
    note: 'Primero se descifra cada dibujo y después se calcula: son dos pasos encadenados, no una suma directa.',
    range: {
      10: 'Los resultados de las filas se mantienen todos dentro del diez.',
      20: 'Los resultados de las filas se mantienen todos dentro del veinte.',
      100: 'Los resultados de las filas se mantienen todos por debajo de cien.',
    },
    chips: { type: 'Clave de dibujos', r10: 'Hasta diez', r20: 'Hasta veinte', r100: 'Hasta cien' },
  },
};

/* ------------------------------------------------------------------ Italian */
L.it = {
  check: 'Le risposte arrivano in un file PDF distinto; sullo schermo, invece, la scheda conferma ogni valore appena viene scritto.',
  objects: function (list) { return 'Figure usate in questa scheda: ' + list + '.'; },
  uses: [
    'Inseriscila nel piano settimanale come attività da svolgere in autonomia mentre la classe lavora per postazioni.',
    'Distribuiscila il giorno dopo la lezione, per riprendere il procedimento senza introdurre nessun contenuto nuovo.',
    'Falla svolgere a coppie: un bambino scrive il risultato e il compagno spiega a voce come lo ha trovato.',
    'Tienila pronta per chi termina prima il lavoro e ha bisogno di continuare a esercitarsi con calma.',
    'Lasciala nella cartella delle attività di riserva, pronta per un cambio di insegnante non programmato.',
    'Usala con un piccolo gruppo in recupero: il primo calcolo si affronta insieme, gli altri da soli.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Due figure diverse nelle uguaglianze: il bambino scopre quanto vale ciascuna e scrive il numero.',
      'three-symbols': 'Tre figure diverse: ogni valore trovato serve a sciogliere quella successiva, meglio procedere con ordine.',
      'four-symbols': 'Con quattro figure la catena si allunga: il bambino tiene traccia dei valori già trovati.',
    },
    note: 'Una stessa figura vale sempre lo stesso numero in tutte le righe della scheda.',
    mixedOps: 'Addizioni e sottrazioni si alternano: il segno va letto prima del calcolo.',
    range: {
      10: 'Numeri e risultati di questa scheda non superano il dieci.',
      20: 'Numeri e risultati di questa scheda restano entro il venti.',
      100: 'Numeri e risultati di questa scheda restano entro il cento.',
    },
    chips: { type: 'Sostituzione con figure', r10: 'Entro il dieci', r20: 'Entro il venti', r100: 'Entro il cento' },
  },
  ml: {
    modes: {
      relation: 'Ogni coppia mostra lo stesso oggetto in due quantità diverse e il bambino inserisce il segno maggiore, minore o uguale.',
      'check-cross': 'In una scena unica due oggetti diversi stanno mescolati: il bambino conta ciascun tipo, scrive i due numeri e segna quello più numeroso.',
      mixed: 'La scheda unisce le due proposte: alcune coppie da confrontare con il segno e una scena mescolata da contare.',
    },
    sameObject: 'Da entrambe le parti compare lo stesso oggetto: cambia solo la quantità e il confronto si decide contando.',
    numeralSide: 'In alcune coppie una parte riporta un numero al posto del gruppo: la quantità va tenuta a mente.',
    range: 'I gruppi da confrontare restano piccoli e non superano il dieci.',
    chips: { type: 'Confronto tra quantità', range: 'Entro il dieci' },
  },
  ca: {
    modes: {
      plain: 'Una legenda assegna un numero a ogni figura; in ciascuna riga le figure vanno sommate e il totale si scrive a lato.',
      'secret-word': 'Qui i totali corrispondono a lettere che compongono una parola: la parola si legge solo se tutte le somme sono corrette.',
    },
    note: 'Prima si decodifica, poi si calcola: il bambino cerca il valore di ogni figura e solo dopo somma.',
    range: {
      10: 'I totali di ogni riga di questa scheda non superano il dieci.',
      20: 'I totali di ogni riga di questa scheda restano entro il venti.',
      100: 'I totali di ogni riga di questa scheda restano entro il cento.',
    },
    chips: { type: 'Codice con figure', r10: 'Entro il dieci', r20: 'Entro il venti', r100: 'Entro il cento' },
  },
};

/* ------------------------------------------------- Portuguese (Brazilian) */
L.pt = {
  check: 'O gabarito vem em um PDF separado, e a versão no navegador verifica cada resposta enquanto o aluno trabalha.',
  objects: function (list) { return 'Nesta atividade aparecem estas figuras: ' + list + '.'; },
  uses: [
    'Inclua a atividade no plano semanal como rodízio, com uma folha por grupo a cada rodada.',
    'Envie como tarefa de casa depois de trabalhar o assunto em aula, para consolidar sem introduzir nada novo.',
    'Dois alunos podem trabalhar lado a lado, cada um na sua folha, e comparar o raciocínio no final.',
    'Guarde algumas cópias na gaveta para quem já concluiu a tarefa do dia e precisa continuar produzindo.',
    'Deixe uma pilha pronta para o professor eventual assumir a turma sem precisar de explicação prévia.',
    'Aplique como sondagem rápida no início do bimestre para ver quem já domina o conteúdo.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Duas figuras diferentes representam números, e o aluno descobre quanto vale cada uma.',
      'three-symbols': 'São três figuras a descobrir, e o aluno cruza informações de várias equações.',
      'four-symbols': 'Com quatro figuras a descobrir, o aluno aproveita cada valor já encontrado.',
    },
    note: 'Uma mesma figura vale sempre o mesmo número nas equações seguintes.',
    mixedOps: 'A folha combina adição e subtração; o aluno identifica cada operação.',
    range: {
      10: 'Os números e os resultados não passam de dez.',
      20: 'Os números e os resultados não passam de vinte.',
      100: 'Os números e os resultados não passam de cem.',
    },
    chips: { type: 'Substituição por figuras', r10: 'Até dez', r20: 'Até vinte', r100: 'Até cem' },
  },
  ml: {
    modes: {
      relation: 'Em cada par, o mesmo objeto aparece dos dois lados em quantidades diferentes, e o aluno escreve o sinal de maior, menor ou igual.',
      'check-cross': 'Uma cena reúne dois objetos misturados; o aluno conta cada tipo, registra os dois números e marca o que aparece mais.',
      mixed: 'A folha traz os dois formatos: pares para comparar com sinal e uma cena misturada para contar e marcar.',
    },
    sameObject: 'Como o objeto é o mesmo dos dois lados, só a quantidade distingue os grupos, nunca a aparência.',
    numeralSide: 'Em alguns pares um dos lados traz um numeral, e a quantidade precisa ser mantida na memória.',
    range: 'As quantidades de cada grupo ficam sempre dentro de dez.',
    chips: { type: 'Comparar quantidades', range: 'Grupos até dez' },
  },
  ca: {
    modes: {
      plain: 'Uma legenda dá um número a cada figura; em cada linha o aluno soma as figuras e escreve o total.',
      'secret-word': 'Cada total corresponde a uma letra, e as letras formam uma palavra que só aparece se todos os totais estiverem certos.',
    },
    note: 'Primeiro decodificar, depois calcular: a tarefa tem dois passos e não é apenas uma conta.',
    range: {
      10: 'Os totais das linhas desta atividade ficam sempre dentro de dez.',
      20: 'Os totais das linhas desta atividade ficam sempre dentro de vinte.',
      100: 'Os totais das linhas desta atividade ficam sempre dentro de cem.',
    },
    chips: { type: 'Código de figuras', r10: 'Totais até dez', r20: 'Totais até vinte', r100: 'Totais até cem' },
  },
};

/* ------------------------------------------------------------------ Swedish */
/* [NSR-FLAG] per §17.5.1. */
L.sv = {
  check: 'Utskriften rättar inte av sig själv: facit följer med som egen PDF, medan versionen i webbläsaren markerar varje svar direkt.',
  objects: function (list) { return 'Bilderna i uppgifterna är: ' + list + '.'; },
  uses: [
    'Lägg in bladet som en fast station i veckoschemat, där eleverna arbetar vidare i egen takt under passet.',
    'Använd bladet dagen efter genomgången, så att eleverna får repetera metoden medan den fortfarande sitter färskt.',
    'Ge bladet i läxa över helgen och gå igenom de uppgifter som vållade mest besvär på måndagen.',
    'Sätt eleverna två och två och låt dem jämföra sina lösningar innan bladet lämnas in.',
    'Ha bladet framme för den som blir klar tidigt och behöver något meningsfullt att fortsätta med.',
    'En vikarie kan dela ut bladet direkt, eftersom det framgår av uppgifterna vad som ska göras.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Två olika bilder står för varsitt tal, och eleven tar reda på båda värdena.',
      'three-symbols': 'Tre olika bilder finns i ekvationerna, och eleven arbetar fram varje bilds värde.',
      'four-symbols': 'Fyra olika bilder ingår, så eleven håller ordning på flera värden samtidigt.',
    },
    note: 'Samma bild betyder samma tal på hela bladet, även i nästa ekvation.',
    mixedOps: 'Ekvationerna blandar addition och subtraktion, så eleven läser varje tecken noga.',
    range: {
      10: 'Tal och resultat håller sig inom talområdet 0-10.',
      20: 'Tal och resultat håller sig inom talområdet 0-20.',
      100: 'Tal och resultat håller sig inom talområdet 0-100.',
    },
    chips: { type: 'Bildekvationer', r10: 'Inom 0-10', r20: 'Inom 0-20', r100: 'Inom 0-100' },
  },
  ml: {
    modes: {
      relation: 'Eleven jämför två grupper av samma sak och skriver tecknet större än, mindre än eller lika med.',
      'check-cross': 'I en enda bild ligger två sorters föremål blandade, och eleven räknar varje sort, skriver antalen och markerar den största mängden.',
      mixed: 'Bladet innehåller både jämförelsepar med tecken och en blandad bild där varje sort ska räknas för sig.',
    },
    sameObject: 'Eftersom samma föremål visas på båda sidor kan eleven inte avgöra frågan med annat än antalet.',
    numeralSide: 'I vissa par visas en siffra i stället för en grupp, så mängden måste hållas i huvudet.',
    range: 'Grupperna rör sig inom talområdet 0-10 och går att räkna direkt på bilden.',
    chips: { type: 'Jämföra antal', range: 'Inom 0-10' },
  },
  ca: {
    modes: {
      plain: 'En nyckel ger varje bild ett tal, och därefter adderar eleven bilderna i varje rad för sig.',
      'secret-word': 'Summorna svarar mot bokstäver som bildar ett ord, vilket betyder att ordet framträder först när varje rad är rätt räknad.',
    },
    note: 'Eleven måste slå upp varje bilds värde innan additionen börjar, alltså två steg i stället för ett.',
    range: {
      10: 'Summorna stannar inom talområdet 0-10, oavsett hur många bilder raden innehåller.',
      20: 'Summorna stannar inom talområdet 0-20, oavsett hur många bilder raden innehåller.',
      100: 'Summorna stannar inom talområdet 0-100, oavsett hur många bilder raden innehåller.',
    },
    chips: { type: 'Bildkod och addition', r10: 'Inom 0-10', r20: 'Inom 0-20', r100: 'Inom 0-100' },
  },
};

/* ------------------------------------------------------------------- Danish */
/* [NSR-FLAG] per §17.5.1. Danish 1. klasse is seven, so the reviewer ties each band to the
 * year it belongs to — 0-20 is 1. klasse here, a year later than the English tag implies. */
L.da = {
  check: 'Selve papiret retter ikke; facit ligger i en særskilt PDF, og i webudgaven bliver hvert svar rettet, mens eleven arbejder.',
  objects: function (list) { return 'Følgende billeder optræder på arket: ' + list + '.'; },
  uses: [
    'Sæt arket på ugeplanen som fast punkt, så eleverne møder den samme type flere gange.',
    'Send arket med hjem som kort træning, når klassen lige har arbejdet med stoffet i timen.',
    'Lad makkerpar løse hvert sit ark og bagefter forklare hinanden, hvordan de kom frem til svaret.',
    'Læg nogle kopier i hylden til dem, der mangler noget at gå i gang med.',
    'Gem et sæt i vikarmappen, så timen har et roligt fagligt indhold uden forberedelse.',
    'Brug arket til en kort screening i starten af et forløb, så du ved, hvor eleverne står.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Arket har to forskellige billeder, og eleverne finder begge værdier ud fra regnestykkerne.',
      'three-symbols': 'Tre forskellige billeder har hver sin talværdi, som eleverne samler fra flere regnestykker.',
      'four-symbols': 'Fire forskellige billeder gør arket sværere, for eleverne skal holde styr på fire værdier.',
    },
    note: 'Det samme billede står altid for det samme tal, også i næste regnestykke.',
    mixedOps: 'Arket bruger både plus og minus, så eleverne aflæser regnetegnet først.',
    range: {
      10: 'Alle tal ligger i talområdet 0-10, altså børnehaveklassen.',
      20: 'Alle tal ligger i talområdet 0-20, altså 1. klasse.',
      100: 'Alle tal ligger i talområdet 0-100, altså 2. klasse.',
    },
    chips: { type: 'Billeder som tal', r10: 'Talområdet 0-10', r20: 'Talområdet 0-20', r100: 'Talområdet 0-100' },
  },
  ml: {
    modes: {
      relation: 'Eleverne sammenligner par, hvor den samme genstand står på begge sider, og skriver tegnet mellem de to mængder.',
      'check-cross': 'Én blandet tegning med to slags genstande; eleverne tæller hver slags, skriver antallet og krydser den største af.',
      mixed: 'Arket rummer begge dele: både par med tegn imellem og en blandet tegning, hvor hver slags skal tælles.',
    },
    sameObject: 'Den samme genstand står på begge sider, så forskellen kun ligger i antallet og ikke i motivet.',
    numeralSide: 'På nogle par står der et tal i stedet for en mængde, så antallet skal holdes i hovedet.',
    range: 'Grupperne tæller højst ti genstande, så eleverne kan nå at tælle dem enkeltvis.',
    chips: { type: 'Sammenligning af mængder', range: 'Grupper op til ti' },
  },
  ca: {
    modes: {
      plain: 'En nøgle giver hvert billede en talværdi, og i hver række lægger eleverne billedernes værdier sammen.',
      'secret-word': 'Hver sum svarer til et bogstav, og bogstaverne danner et ord, der kun træder frem, hvis alle rækker er rigtige.',
    },
    note: 'Eleverne skal først slå hvert billede op i nøglen og derefter regne, så hver række består af to trin.',
    range: {
      10: 'Alle summer holder sig inden for talområdet 0-10, altså børnehaveklassens område.',
      20: 'Alle summer holder sig inden for talområdet 0-20, som svarer til 1. klasse.',
      100: 'Alle summer holder sig inden for talområdet 0-100, som hører til 2. klasse.',
    },
    chips: { type: 'Billedkode med plus', r10: 'Summer inden for 10', r20: 'Summer inden for 20', r100: 'Summer inden for 100' },
  },
};

/* ---------------------------------------------------------- Norwegian (bokmål) */
/* [NSR-FLAG] per §17.5.1. Norwegian 1. trinn is six, so unlike sv and da this copy does not
 * place within-10 work below the tagged year. */
L.no = {
  check: 'Fasiten ligger som en egen PDF, og i nettversjonen får eleven svar på hvert regnestykke underveis.',
  objects: function (list) { return 'Disse bildene går igjen på arket: ' + list + '.'; },
  uses: [
    'Sett av et fast kvarter i ukeplanen der elevene arbeider med arket i eget tempo.',
    'Send arket med hjem som lekse når regneformen alt er gjennomgått på skolen.',
    'Sett elevene sammen to og to og la dem forklare framgangsmåten sin for hverandre.',
    'Ha et lite forråd i hylla til elever som trenger noe mer å strekke seg etter.',
    'Arket fungerer i en vikartime fordi det kan deles ut uten videre innføring.',
    'Bruk arket til å kartlegge hva elevene mestrer før du planlegger neste økt.',
  ],
  mw: {
    modes: {
      'two-symbols': 'To ulike bilder står for hvert sitt tall, og eleven finner begge verdiene ved å lese regnestykkene.',
      'three-symbols': 'Tre ulike bilder har hver sin verdi, og eleven må ofte finne én verdi før neste lar seg løse.',
      'four-symbols': 'Fire ulike bilder skal bestemmes, og eleven holder orden på flere verdier samtidig mens regnestykkene arbeides gjennom.',
    },
    note: 'Det samme bildet står for det samme tallet gjennom hele arket, så en funnet verdi gjelder videre.',
    mixedOps: 'Arket blander addisjon og subtraksjon, slik at eleven må lese tegnet i hvert enkelt regnestykke.',
    range: {
      10: 'Både tallene på arket og resultatene holder seg innenfor tallområdet 0-10.',
      20: 'Både tallene på arket og resultatene holder seg innenfor tallområdet 0-20.',
      100: 'Både tallene på arket og resultatene holder seg innenfor tallområdet 0-100.',
    },
    chips: { type: 'Bilder som tall', r10: 'Tallområdet 0-10', r20: 'Tallområdet 0-20', r100: 'Tallområdet 0-100' },
  },
  ml: {
    modes: {
      // The reviewer wrote the comparison signs as HTML entities; the renderer escapes its
      // own output, so they belong here as the real characters or they would double-escape.
      relation: 'I hvert par står samme gjenstand på begge sider i ulikt antall, og eleven setter inn >, < eller =.',
      'check-cross': 'Ett bilde viser to slags gjenstander om hverandre; eleven teller hver sort, skriver antallet og krysser av for den største mengden.',
      mixed: 'Arket kombinerer begge formene, slik at eleven både setter inn tegn mellom par og teller i en samlet tegning.',
    },
    sameObject: 'Med samme gjenstand på begge sider kan ikke sammenligningen avgjøres av hva tingene er, bare av hvor mange.',
    numeralSide: 'På noen par står det et tall i stedet for en mengde, slik at antallet må holdes i hodet.',
    range: 'Mengdene som skal sammenlignes, holder seg innenfor ti på hvert par.',
    chips: { type: 'Sammenligne mengder', range: 'Mengder opp til ti' },
  },
  ca: {
    modes: {
      plain: 'En kodenøkkel gir hvert bilde en verdi, og eleven slår opp verdiene før bildene i hver rad legges sammen.',
      'secret-word': 'Hver sum peker videre til en bokstav, og ordet nederst kommer bare fram når alle radene er riktige.',
    },
    note: 'Eleven slår opp verdiene før noe legges sammen, og hver rad blir dermed to steg.',
    range: {
      10: 'Verdiene i nøkkelen og summene i radene holder seg innenfor tallområdet 0-10.',
      20: 'Verdiene i nøkkelen og summene i radene holder seg innenfor tallområdet 0-20.',
      100: 'Verdiene i nøkkelen og summene i radene holder seg innenfor tallområdet 0-100.',
    },
    chips: { type: 'Bildekode og addisjon', r10: 'Tallområdet 0-10', r20: 'Tallområdet 0-20', r100: 'Tallområdet 0-100' },
  },
};

/* ------------------------------------------------------------------ Finnish */
/* [NSR-FLAG] per §17.5.1. Every frame is nominative and invariant (`lukualueella 0-10`),
 * because a numeral in a governed position would have to inflect. */
L.fi = {
  check: 'Vastausavain tulee omana PDF-tiedostonaan, ja selaimessa tehty versio merkitsee jokaisen vastauksen oikeaksi tai vääräksi; tuloste itse ei sitä tee.',
  objects: function (list) { return 'Kuvasymbolit ovat tällä sivulla seuraavat: ' + list + '.'; },
  uses: [
    'Liitä sivu oman työn kansioon, josta oppilaat ottavat sen vuorollaan käyttöön viikon aikana.',
    'Lähetä sivu kotitehtäväksi, jotta juuri opetettu asia toistuu vielä saman päivän aikana.',
    'Anna sivu parille, jossa toinen laskee ääneen ja toinen seuraa perässä; puolivälissä osat vaihtuvat.',
    'Varaa sivu lisätehtäväksi oppilaalle, jolla jää aikaa muun ryhmän vielä työskennellessä.',
    'Ota sivu esiin tuntiin, jonka pitää joku muu kuin ryhmän oma opettaja.',
    'Käytä sivua pienryhmässä, kun haluat seurata vierestä, miten yksittäinen oppilas etenee.',
  ],
  mw: {
    modes: {
      'two-symbols': 'Sivulla on kaksi eri kuvasymbolia, ja oppilaat päättelevät laskuista, minkä luvun kumpikin symboli korvaa.',
      'three-symbols': 'Kolme eri kuvasymbolia esiintyy laskuissa, joten yhden symbolin arvo on selvitettävä ennen kuin seuraava ratkeaa.',
      'four-symbols': 'Neljä eri kuvasymbolia pitää selvittää, ja ketju etenee laskusta toiseen, kunnes jokaisen symbolin arvo on löytynyt.',
    },
    note: 'Sama kuva tarkoittaa sivulla aina samaa lukua, joten yhdestä laskusta löytynyt arvo kelpaa suoraan seuraavaan.',
    mixedOps: 'Sivun laskuissa käytetään sekä yhteenlaskua että vähennyslaskua.',
    range: {
      10: 'Sivun luvut ja tulokset pysyvät lukualueella 0-10.',
      20: 'Sivun luvut ja tulokset pysyvät lukualueella 0-20.',
      100: 'Sivun luvut ja tulokset pysyvät lukualueella 0-100.',
    },
    chips: { type: 'Kuvasymbolien arvot', r10: 'Lukualue 0-10', r20: 'Lukualue 0-20', r100: 'Lukualue 0-100' },
  },
  ml: {
    modes: {
      relation: 'Pareissa on molemmin puolin sama esine eri määrinä, ja oppilaat merkitsevät väliin merkin >, < tai =.',
      'check-cross': 'Yhdessä kuvassa on kahta eri esinettä sekaisin; oppilaat laskevat kummankin määrän ja rastittavat sen, mitä on enemmän.',
      mixed: 'Sivulla on molempia tehtävätyyppejä: vertailupareja merkkeineen sekä yksi sekalainen kuva, josta kummankin esineen määrä lasketaan.',
    },
    sameObject: 'Kun molemmilla puolilla on sama esine, vertailu ratkeaa pelkästä määrästä eikä esineiden erosta.',
    numeralSide: 'Osassa pareja toisella puolella on ryhmän sijaan numero, jolloin määrä on pidettävä mielessä laskematta.',
    range: 'Vertailtavat ryhmät pysyvät lukualueella 0-10.',
    chips: { type: 'Määrien vertailu', range: 'Lukualue 0-10' },
  },
  ca: {
    modes: {
      plain: 'Avain antaa jokaiselle kuvalle oman luvun, ja jokaisella rivillä oppilaat laskevat rivin kuvien arvot yhteen.',
      'secret-word': 'Rivien summat vastaavat kirjaimia, jotka muodostavat sanan, joten sana paljastuu vasta kun jokainen rivi on oikein.',
    },
    note: 'Kuvan arvo haetaan avaimesta ennen laskemista, joten tehtävä etenee kahdessa vaiheessa yhden sijaan.',
    range: {
      10: 'Rivien summat pysyvät lukualueella 0-10.',
      20: 'Rivien summat pysyvät lukualueella 0-20.',
      100: 'Rivien summat pysyvät lukualueella 0-100.',
    },
    chips: { type: 'Kuvakoodin purku', r10: 'Summat 0-10', r20: 'Summat 0-20', r100: 'Summat 0-100' },
  },
};

/* ------------------------------------------------------------------- build */

function digits(ordinal, radices) {
  var out = [], n = ordinal;
  for (var i = 0; i < radices.length; i++) { out.push(n % radices[i]); n = Math.floor(n / radices[i]); }
  return out;
}

/** Up to six pictures, filename duplicate-markers stripped (§20.5), de-duplicated. */
function pickNouns(list, count) {
  return (list || []).slice(0, count).map(function (n) {
    return String(n).replace(/\s+\d+$/, '');
  }).filter(function (n, i, a) { return n && a.indexOf(n) === i; });
}

function shell(t, d, extras) {
  return {
    heading1: extras.headings[0],
    heading2: null,
    heading3: extras.headings[1],
    block2: null,
    block3: t.uses[d[0]],
    /* THE ANSWER-KEY SENTENCE IS NOT PRINTED IN THESE FAMILIES, though every reviewer wrote
     * one and it is true. It is the most universal sentence in the whole system — identical
     * on every deck of a locale — and these families have the least per-deck material to
     * offset it. Removing it cut same-shape block similarity failures by about ninety per
     * cent, and it costs a teacher nothing: the deck page already links the answer-key PDF
     * directly, so the sentence was restating one of the page's own buttons.
     *
     * Picture-arithmetic keeps its version. Those blocks pass with it, and rewriting 3,000
     * live pages to remove a true sentence would be churn for its own sake (§21.5a). */
    blockExtras: null,
    chipTen: null,
    chipLevel: null,
  };
}

function buildMathWorksheet(f, ordinal, t, headings) {
  var m = t.mw.modes[f.derivedMode];
  if (!m || !f.band) return null;             // an unauthored shape yields NO block
  var d = digits(ordinal, [t.uses.length, 3]);

  var parts = [m, t.mw.range[f.band.ceiling], t.mw.note];
  if (f.mixesOperations) parts.splice(2, 0, t.mw.mixedOps);

  var out = shell(t, d, { headings: headings });
  out.shapes = { block1: 'mw/' + f.derivedMode + '/' + f.band.ceiling, block2: null, block3: 'U' + d[0] };
  /* The equations already name every picture, so an objects sentence repeats them — but it
   * also lists them plainly for a reader scanning the page, and measurement decided it: the
   * blocks without it sat at 0.87 same-shape similarity because the equations were the only
   * per-deck text in ~70 words of fixed prose. */
  var nouns = pickNouns(f.depictedNouns, 4);
  out.block1 = parts.join(' ') + (nouns.length ? ' ' + t.objects(joinList(nouns)) : '');
  out.namedObjects = nouns;
  out.taskList = f.equations.length ? f.equations.join(', ') + '.' : '';
  out.chipRange = t.mw.chips['r' + f.band.ceiling];
  out.chipMode = t.mw.chips.type;
  return out;
}

function buildMoreLess(f, ordinal, t, headings) {
  var m = t.ml.modes[f.derivedMode];
  if (!m) return null;

  /* CHECK-CROSS GETS NO BLOCK. Measured, not assumed: a check-cross deck's counts are the
   * answer and it has no pairs, so the only per-deck text available is the names of its two
   * object kinds — and 29 decks resolve fewer than two. Two such blocks came out 0.896
   * similar, differing in the words "Sausage and Apple" against "Envelope".
   *
   * A block that is 96% identical to its neighbour does not make a page individually
   * valuable, which is the whole point of writing them. Saying nothing is better than saying
   * the same thing on 540 pages. The relation mode keeps its block: it has printable pairs
   * and four to six pictures. */
  if (f.derivedMode === 'check-cross') return null;
  var d = digits(ordinal, [t.uses.length, 3]);

  /* The within-ten sentence only where it is true. Check-cross counts reach 12, and a deck
   * above the band gets no range claim rather than a hedged one — the mode sentence and the
   * pictures carry the block perfectly well without it (§17.8.11 defensive skip). */
  var parts = [m];
  if (f.band) parts.push(t.ml.range);
  /* `sameObject` is NOT printed, though every reviewer wrote it and it is true. It is true of
   * EVERY relation deck measured — 384 of 384 sampled pairs — and the picture-arithmetic
   * ruling covers exactly this case: a fact that holds for the whole family reads as padding
   * once a reader has met it, and it is 15 words of identical text on 1,088 pages. The mode
   * sentence already says the child compares two amounts. `numeralSide` stays, because it
   * genuinely varies between decks. */
  if (f.hasNumeralSide) parts.push(t.ml.numeralSide);

  var nouns = pickNouns(f.depictedNouns, 4 + (d[1] % 3));
  /* Fewer than two resolved pictures means the block would be prose plus a pair list, and
   * those decks fail the similarity gate at 38% against 3% for the rest — measured, not
   * assumed. The image library does not know every filename stem, and a deck it cannot name
   * gets no block rather than a generic one. */
  if (nouns.length < 2) return null;

  var out = shell(t, d, { headings: headings });
  out.shapes = { block1: 'ml/' + f.derivedMode, block2: null, block3: 'U' + d[0] };
  out.block1 = parts.join(' ') + (nouns.length ? ' ' + t.objects(joinList(nouns)) : '');
  out.namedObjects = nouns;
  /* Relation pairs only. In check-cross the two counts ARE the answer, so `pairs` is empty
   * there by construction and nothing numeric reaches the page. */
  out.taskList = f.pairs && f.pairs.length ? f.pairs.join('  ·  ') : '';
  out.chipRange = f.band ? t.ml.chips.range : null;   // no band, no band chip
  out.chipMode = t.ml.chips.type;
  return out;
}

function buildCodeAddition(f, ordinal, t, headings) {
  var m = t.ca.modes[f.derivedMode];
  if (!m || !f.band) return null;
  var d = digits(ordinal, [t.uses.length, 3]);

  var nouns = pickNouns(f.depictedNouns, 4 + (d[1] % 3));
  var out = shell(t, d, { headings: headings });
  out.shapes = { block1: 'ca/' + f.derivedMode + '/' + f.band.ceiling, block2: null, block3: 'U' + d[0] };
  out.block1 = [m, t.ca.range[f.band.ceiling], t.ca.note].join(' ')
    + (nouns.length ? ' ' + t.objects(joinList(nouns)) : '');
  out.namedObjects = nouns;
  // NOTHING numeric: every total on the sheet is an answer, and the addends are only in the
  // key baked into the image. The pictures are what distinguishes one of these decks.
  out.taskList = '';
  out.chipRange = t.ca.chips['r' + f.band.ceiling];
  out.chipMode = t.ca.chips.type;
  return out;
}

/**
 * Join with a comma and the locale's own final conjunction, taken from the picture-arithmetic
 * table so there is one answer per locale rather than two.
 */
var PA_LIST = {};
function joinList(a) {
  if (a.length < 2) return a[0] || '';
  return a.slice(0, -1).join(', ') + (PA_LIST.and || ' & ') + a[a.length - 1];
}

function build(f, ordinal, locale, family) {
  var t = L[locale];
  if (!t) return null;
  PA_LIST.and = CONJUNCTION[locale] || ' & ';
  var headings = HEADINGS(locale);
  if (family === 'math-worksheet') return buildMathWorksheet(f, ordinal, t, headings);
  if (family === 'more-less') return buildMoreLess(f, ordinal, t, headings);
  if (family === 'code-addition') return buildCodeAddition(f, ordinal, t, headings);
  return null;
}

/** The final conjunction in a list, per locale. */
var CONJUNCTION = {
  en: ' and ', de: ' und ', nl: ' en ', fr: ' et ', es: ' y ', it: ' e ',
  pt: ' e ', sv: ' och ', da: ' og ', no: ' og ', fi: ' ja ',
};

module.exports = { build: build, locales: Object.keys(L) };
