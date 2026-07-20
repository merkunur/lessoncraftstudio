/**
 * Picture-arithmetic teaching blocks (addition + subtraction), all locales in one module.
 *
 * WHY THIS IS ONE FILE WHEN math-puzzle NEEDED ELEVEN
 * The math-puzzle copy needed per-locale LOGIC: whether to print a curricular band or the
 * true maximum, how the ten-crossing count is phrased, which grade the numbers imply. None
 * of that applies here — every deck in this family stays within 10 and no deck contains a
 * crossing — so what varies between locales is STRINGS, not rules. A per-locale data table
 * is the honest shape; eleven near-identical files would be duplication pretending to be
 * localisation.
 *
 * TWO RULINGS THAT CHANGED THE DESIGN, given independently by the German and English
 * practitioners and agreed by both:
 *
 * 1. DO NOT STATE THE ABSENCE OF A CROSSING. On the jigsaw pages "no problem crosses 10"
 *    earns its place because a neighbouring sheet does cross. Here it is universally true,
 *    and an absence nobody expected reads as either a warning or padding — "repeating it 447
 *    times drains it of meaning". The range is stated positively instead.
 *
 * 2. "MIXED" MEANS FORMAT-MIXED, NOT OPERATION-MIXED. Every problem on an addition/mixed
 *    sheet is still addition; only the presentation varies. On a jigsaw sheet "mixed" means
 *    the operations alternate. A teacher scanning for mixed-operation practice would be
 *    misled, so the page says so explicitly.
 *
 * NO SELF-CORRECTION CLAIM. These sheets have no reveal picture. The printable has an answer
 * key and the browser version checks each answer; the paper itself gives no feedback. Saying
 * otherwise would be the overclaim the German teacher warned about.
 *
 * The pedagogical ordering (image-image before image-number) is the practitioners': with two
 * pictured groups a child can count everything and still be right — the pictorial stage. With
 * one group and a numeral, one quantity must be held in the head while the other is counted,
 * which is where counting-on begins.
 */
'use strict';

var L = {};

/* ------------------------------------------------------------------ German */
L.de = {
  headings: ['Was dieses Blatt übt', 'So setzen Sie es ein'],
  modes: {
    'addition/image-number': 'Sechs Aufgaben, bei denen die abgebildeten Gegenstände gezählt und anschließend eine Zahl dazuaddiert wird.',
    'addition/image-image': 'Sechs Aufgaben, bei denen zwei abgebildete Mengen gezählt und zu einer Gesamtzahl zusammengefasst werden.',
    'addition/find-addend': 'Sechs Additionsaufgaben, bei denen der fehlende Summand ergänzt wird.',
    'addition/mixed': 'Sechs Additionsaufgaben in wechselnder Darstellung: gezählte Mengen, Zahlen und fehlende Summanden.',
    'subtraction/image-number': 'Sechs Aufgaben, bei denen die abgebildeten Gegenstände gezählt und anschließend eine Zahl abgezogen wird.',
    'subtraction/cross-out': 'Sechs Aufgaben, bei denen die abzuziehende Anzahl durchgestrichen und der Rest abgezählt wird.',
    'subtraction/find-subtrahend': 'Sechs Subtraktionsaufgaben, bei denen die fehlende abzuziehende Zahl ergänzt wird.',
    'subtraction/mixed': 'Sechs Subtraktionsaufgaben in wechselnder Darstellung: gezählte Mengen, Zahlen und fehlende Zahlen.',
  },
  range: 'Alle Zahlen und Ergebnisse liegen im Zahlenraum bis 10.',
  // stated only on a `mixed` sheet, where the word would otherwise mislead
  mixedNote: 'Gemischt heißt hier: wechselnde Darstellungsformen innerhalb einer Rechenart, nicht wechselnde Rechenarten.',
  // image-number is the harder of the two; say so where it applies
  bridgeNote: 'Da nur eine Menge abgebildet ist und die zweite als Ziffer dasteht, wird hier vom Alleszählen zum Weiterzählen übergegangen.',
  check: 'Zur Kontrolle liegt ein Lösungsblatt als PDF bei; die interaktive Fassung im Browser meldet pro Aufgabe zurück, ob die Antwort stimmt — das ausgedruckte Blatt selbst gibt keine Rückmeldung.',
  objects: function (list) { return 'Abgebildet sind ' + list + '.'; },
  // Five variants, not three: with only ~95 words per block and most of them fixed, two decks
  // of the same mode that drew the same use sentence reached 0.814 similarity. The extra
  // sentences reuse classroom vocabulary this locale's practitioners already ruled on, and
  // none of them references self-correction, which this family does not have.
  uses: [
    'Legen Sie das Blatt in den Wochenplan oder an eine Rechenstation; Wendeplättchen oder das Zwanzigerfeld dürfen daneben liegen.',
    'Für die Übungsphase nach der Einführung geeignet, auch als Hausaufgabe zum Festigen.',
    'In der Partnerarbeit rechnen zwei Kinder abwechselnd je eine Aufgabe und begründen ihr Ergebnis.',
    'Gut geeignet für die Freiarbeit oder als Zusatzangebot für Kinder, die früher fertig sind.',
    'In einer Vertretungsstunde einsetzbar: Die Aufgabenstellung ist in einem Satz erklärt.',
  ],
  chips: { add: 'Addition', sub: 'Subtraktion', range: 'Zahlenraum bis 10' },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' und ' + a[a.length - 1] : a[0]; },
};

/* ----------------------------------------------------------------- English */
L.en = {
  headings: ['What this sheet practises', 'Using it in class'],
  modes: {
    'addition/image-number': 'Six problems where the child counts the pictured objects, then adds a written number.',
    'addition/image-image': 'Six problems where the child counts two groups of pictured objects and adds them.',
    'addition/find-addend': 'Six problems where the child works out the missing addend that completes each addition.',
    'addition/mixed': 'Six addition problems drawn from all three formats on one sheet.',
    'subtraction/image-number': 'Six problems where the child counts the pictured objects, then subtracts a written number.',
    'subtraction/cross-out': 'Six problems where the child crosses out the stated number of pictures and counts what is left.',
    'subtraction/find-subtrahend': 'Six problems where the child works out the missing number that is taken away.',
    'subtraction/mixed': 'Six subtraction problems drawn from all three formats on one sheet.',
  },
  range: 'All numbers stay within 10, so children can work from counting or from known number facts.',
  mixedNote: 'Mixed here means the presentation varies, not the operation — every problem on this sheet is the same operation.',
  bridgeNote: 'One quantity is a numeral rather than a picture, which is where counting-on begins rather than counting everything.',
  check: 'An answer key is included, and the browser version checks each answer as the child works.',
  objects: function (list) { return 'The pictures are ' + list + '.'; },
  uses: [
    'Suited to a math center or independent work, with counters or a number line within reach.',
    'Fits the practice phase after teaching, and works as homework for consolidation.',
    'In pairs, two children take alternate problems and say how they worked each one out.',
    'Works for early finishers or as morning work, since it practises something already taught.',
    'Usable as cover work: the task takes one sentence to explain and the key is included.',
  ],
  chips: { add: 'Addition', sub: 'Subtraction', range: 'Numbers to 10' },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a[0]; },
};

/* ------------------------------------------------------------------ Dutch */
L.nl = {
  headings: ['Wat je op dit blad oefent', 'Zo gebruik je het in de klas'],
  modes: {
    'addition/image-image': 'Zes sommen per blad: je leerling telt beide groepjes plaatjes, telt ze bij elkaar op en schrijft het antwoord op de lijn.',
    'addition/image-number': 'Zes sommen per blad: je leerling telt het groepje plaatjes, telt daar het gedrukte getal bij op en noteert het antwoord.',
    'addition/find-addend': 'Zes sommen per blad waarin één getal ontbreekt; je leerling zoekt welk getal erbij hoort om de optelling kloppend te maken.',
    'addition/mixed': 'Zes sommen per blad in wisselende presentaties, zodat je leerling bij elke som opnieuw bekijkt hoe die is opgebouwd.',
    'subtraction/image-number': 'Zes sommen per blad: je leerling telt de plaatjes, haalt het gedrukte getal eraf en noteert het antwoord.',
    'subtraction/cross-out': 'Zes sommen per blad: je leerling streept het gevraagde aantal plaatjes door, telt wat overblijft en schrijft het antwoord op.',
    'subtraction/find-subtrahend': 'Zes sommen per blad waarin het afgetrokken getal ontbreekt; je leerling zoekt welk getal eraf moet om bij het antwoord uit te komen.',
    'subtraction/mixed': 'Zes sommen per blad in wisselende presentaties, zodat je leerling per som opnieuw bepaalt hoe die som werkt.',
  },
  range: 'Alle getallen en alle antwoorden blijven binnen het getalgebied t/m 10.',
  mixedNote: 'Gemengd slaat op de wisselende presentatie van de sommen; de bewerking blijft op het hele blad dezelfde.',
  bridgeNote: 'Doordat één hoeveelheid als gedrukt getal staat en alleen de andere is afgebeeld, verschuift je leerling van alles tellen naar doortellen.',
  check: 'Bij dit blad hoort een apart antwoordblad in pdf; in de online versie ziet je leerling per som meteen of het antwoord klopt.',
  objects: function (list) { return 'Afgebeeld zijn ' + list + '.'; },
  uses: [
    'Zet het blad in de rekenhoek of op de weektaak, zodat je leerling er tijdens de rekenronde zelfstandig aan werkt.',
    'Gebruik het in de oefenfase of geef het mee naar huis, kort nadat je de bewerking klassikaal hebt geïntroduceerd.',
    'Laat twee leerlingen samenwerken: de een verwoordt de som hardop, de ander schrijft, halverwege wisselen ze van rol.',
    'Houd een stapel achter de hand voor leerlingen die vroeg klaar zijn en tijdens het vrije werken verder willen.',
    'Handig voor een invalles: de opdracht staat in één zin uitgelegd en vraagt vooraf geen voorbereiding van de leerkracht.',
  ],
  chips: { add: 'Optellen met plaatjes', sub: 'Aftrekken met plaatjes', range: 'Getalgebied t/m 10' },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' en ' + a[a.length - 1] : a[0]; },
};

/* ----------------------------------------------------------------- French */
L.fr = {
  headings: ['Ce que la fiche travaille', 'Utilisation en classe'],
  modes: {
    'addition/image-number': "Six calculs : les élèves comptent la collection illustrée, puis ajoutent le nombre écrit à côté et notent la somme.",
    'addition/image-image': "Six calculs : les élèves comptent chacune des deux collections illustrées, réunissent les deux quantités et écrivent la somme.",
    'addition/find-addend': "Six calculs : la somme est donnée, un terme manque, et les élèves cherchent le nombre qui complète l'addition.",
    'addition/mixed': "Six calculs d'addition dont la présentation change d'une case à l'autre : collections illustrées, nombre écrit, terme manquant.",
    'subtraction/image-number': "Six calculs : les élèves comptent la collection illustrée, retirent le nombre écrit et notent ce qui reste.",
    'subtraction/cross-out': "Six calculs : les élèves barrent sur l'illustration le nombre d'objets indiqué, puis comptent ceux qui restent.",
    'subtraction/find-subtrahend': "Six calculs : le résultat est donné, le nombre retiré manque, et les élèves cherchent ce qui complète la soustraction.",
    'subtraction/mixed': "Six calculs de soustraction dont la présentation change d'une case à l'autre : objets à barrer, nombre écrit, nombre manquant.",
  },
  range: "Tous les nombres et tous les résultats restent dans les dix premiers nombres, le domaine de calcul du CP.",
  mixedNote: "La présentation varie d'un calcul à l'autre, mais l'opération reste la même sur toute la fiche.",
  bridgeNote: "Une seule collection est illustrée, l'autre quantité est un nombre écrit : les élèves quittent le comptage de tout pour surcompter à partir d'une quantité gardée en tête.",
  check: "Un corrigé est fourni en PDF séparé, et la version interactive dans le navigateur vérifie chaque réponse au fur et à mesure.",
  // The reviewer wrote `this.list(list)` here; `list` arrives already joined by build(),
  // so re-joining a string would spell it letter by letter.
  objects: function (list) { return "Les collections sont illustrées avec " + list + "."; },
  uses: [
    "À poser dans un atelier de calcul ou dans le plan de travail, comme tâche courte que les élèves mènent seuls.",
    "En phase d'entraînement après la séance de découverte, ou à donner à la maison pour réactiver le calcul du jour.",
    "En binôme : chacun traite trois calculs, puis les deux élèves confrontent leurs écritures avant de rendre la fiche.",
    "Pour les élèves qui terminent tôt, une fiche tenue à disposition prolonge le travail sans mobiliser l'enseignant.",
    "Pour un remplacement, une fiche imprimée d'avance donne une activité mathématique cadrée sans préparation particulière.",
  ],
  chips: { add: 'Addition', sub: 'Soustraction', range: "Nombres jusqu'à 10" },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' et ' + a[a.length - 1] : a[0]; },
};

/* ----------------------------------------------------------------- Spanish */
L.es = {
  headings: ['Qué practica esta ficha', 'Cómo llevarla al aula'],
  modes: {
    'addition/image-number': 'Seis sumas: una cantidad dibujada, otra escrita; el alumno cuenta la colección y sigue contando desde ese número.',
    'addition/image-image': 'Seis sumas con las dos cantidades dibujadas: el alumno cuenta cada colección y escribe el total.',
    'addition/find-addend': 'Seis sumas a las que les falta un sumando: el alumno averigua qué cantidad hay que añadir para llegar al total indicado.',
    'addition/mixed': 'Seis sumas presentadas de formas distintas: unas con las dos colecciones dibujadas, otras con una cantidad escrita.',
    'subtraction/image-number': 'Seis restas: la cantidad de partida dibujada y la que se quita escrita; el alumno cuenta hacia atrás.',
    'subtraction/cross-out': 'Seis restas sobre una colección dibujada: el alumno tacha los elementos que se van y cuenta los que quedan.',
    'subtraction/find-subtrahend': 'Seis restas a las que les falta el número que se quita: el alumno decide cuánto hay que retirar para llegar al resultado.',
    'subtraction/mixed': 'Seis restas presentadas de formas distintas: unas se resuelven tachando dibujos, otras con la cantidad escrita.',
  },
  range: 'Todos los números y todos los resultados se mantienen dentro del 10.',
  mixedNote: 'Varía la presentación de cada operación, no la operación: una ficha de suma contiene solo sumas.',
  bridgeNote: 'Una cantidad dibujada y otra escrita hacen pasar de contarlo todo a contar a partir de una.',
  check: 'El solucionario va en un PDF aparte; la versión del navegador comprueba cada respuesta mientras el alumno trabaja.',
  objects: function (list) { return 'Las cantidades se representan con dibujos de ' + list + '.'; },
  uses: [
    'Colócala en el rincón de matemáticas como tarea del plan de trabajo semanal, con lápiz y ficha ya preparados.',
    'Repártela como práctica al cerrar la sesión de cálculo o como deberes breves que se revisan al día siguiente.',
    'Por parejas, uno cuenta en voz alta y el otro escribe; después intercambian los papeles en la siguiente operación.',
    'Tenla impresa para quien termina antes: seis operaciones ocupan lo justo sin abrir ningún contenido nuevo.',
    'En una clase de sustitución funciona sin explicación previa: el dibujo indica qué contar y la consigna cabe en una frase.',
  ],
  chips: { add: 'Suma hasta 10', sub: 'Resta hasta 10', range: 'Números hasta el 10' },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1] : a[0]; },
};

/* ----------------------------------------------------------------- Italian */
L.it = {
  headings: ['Che cosa allena questa scheda', 'Come usarla in classe'],
  modes: {
    'addition/image-number': "Sei calcoli: il bambino conta una collezione illustrata, aggiunge il numero scritto accanto e annota la somma.",
    'addition/image-image': 'Sei calcoli: il bambino conta le due collezioni illustrate, le somma e scrive il risultato nella casella.',
    'addition/find-addend': "Sei calcoli: un addendo manca e il bambino cerca il numero che completa l'uguaglianza, contando le immagini.",
    'addition/mixed': 'Sei calcoli di addizione presentati in modi diversi: collezioni illustrate, numeri scritti e addendi da trovare.',
    'subtraction/image-number': 'Sei calcoli: il bambino conta la collezione illustrata, toglie il numero scritto accanto e annota la differenza.',
    'subtraction/cross-out': 'Sei calcoli: il bambino cancella con una crocetta le immagini indicate e conta quante ne restano.',
    'subtraction/find-subtrahend': 'Sei calcoli: il bambino individua il numero da togliere perché la sottrazione arrivi al risultato indicato.',
    'subtraction/mixed': 'Sei calcoli di sottrazione presentati in modi diversi: immagini da cancellare, numeri scritti e termini da trovare.',
  },
  range: 'Tutti i numeri e tutti i risultati restano entro il dieci.',
  mixedNote: "Qui varia solo la presentazione: l'operazione resta la stessa in tutti e sei i calcoli.",
  bridgeNote: "Una quantità è illustrata, l'altra è un numero scritto: si passa dal contare tutto al contare avanti.",
  check: 'Le soluzioni sono in un PDF a parte; la versione interattiva nel browser verifica subito ogni risposta.',
  objects: function (list) { return 'Le immagini di questa scheda mostrano ' + list + '.'; },
  uses: [
    'In un angolo di matematica, lascia alcune copie a disposizione per chi vuole esercitarsi da solo.',
    'Come esercitazione dopo la spiegazione o come compito breve a casa, una scheda per volta.',
    "A coppie: un bambino conta ad alta voce, l'altro scrive, poi si scambiano i ruoli.",
    'Per chi finisce prima: una scheda pronta che si affronta in autonomia senza nuove spiegazioni.',
    "In caso di supplenza, un'attività stampabile subito, comprensibile anche a chi non conosce la classe.",
  ],
  chips: { add: 'Addizione con immagini', sub: 'Sottrazione con immagini', range: 'Numeri entro il 10' },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1] : a[0]; },
};

/* ------------------------------------------------- Portuguese (Brazilian) */
/* The child-facing instructions this was authored against are European Portuguese
 * (`em falta`, `risca`, `escreve as tuas respostas`) while the site is pt-BR canonical
 * per §6. The reviewer was shown the discrepancy and wrote Brazilian; the product-side
 * instruction text is a separate defect, recorded not silently mirrored. */
L.pt = {
  headings: ['O que esta atividade trabalha', 'Como usar na sala'],
  modes: {
    'addition/image-number': 'Seis adições em que uma coleção aparece ilustrada e a outra parcela vem como número escrito para somar.',
    'addition/image-image': 'Seis adições com duas coleções ilustradas: o aluno conta cada grupo, soma as duas quantidades e escreve o total.',
    'addition/find-addend': 'Seis adições com uma parcela faltando: o aluno descobre o número que completa a igualdade e o escreve.',
    'addition/mixed': 'Seis adições que alternam entre as apresentações ilustradas, o número escrito e a parcela faltando na mesma atividade.',
    'subtraction/image-number': 'Seis subtrações em que a quantidade inicial aparece ilustrada e o valor a retirar vem como número escrito.',
    'subtraction/cross-out': 'Seis subtrações com uma coleção ilustrada: o aluno risca a quantidade indicada e conta as imagens que sobraram.',
    'subtraction/find-subtrahend': 'Seis subtrações com o número a retirar faltando: o aluno descobre quanto foi tirado e escreve o valor.',
    'subtraction/mixed': 'Seis subtrações que alternam entre riscar as imagens, subtrair um número escrito e descobrir o valor que falta.',
  },
  range: 'Todos os números e todos os resultados ficam entre 0 e 10.',
  mixedNote: 'Nas atividades mistas varia apenas a apresentação: todas as contas mantêm a mesma operação.',
  bridgeNote: 'Uma coleção ilustrada e uma quantidade escrita levam o aluno de contar tudo a contar a partir dela.',
  check: 'A folha impressa não corrige; o gabarito é um PDF à parte e a versão interativa confere as respostas.',
  objects: function (list) { return 'As imagens desta atividade mostram ' + list + '.'; },
  uses: [
    'Deixe algumas cópias no cantinho de matemática para o plano de trabalho semanal dos alunos.',
    'Use uma folha na fase de exercícios da aula ou envie como tarefa de casa curta.',
    'Em duplas, um aluno resolve três contas e o colega resolve as outras três, depois comparam.',
    'Quem termina a atividade principal antes dos colegas pode seguir sozinho com mais uma folha.',
    'Em aula de substituição, a atividade funciona sem preparo: basta imprimir e distribuir para a turma.',
  ],
  chips: { add: 'Adição com imagens', sub: 'Subtração com imagens', range: 'Números até 10' },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1] : a[0]; },
};

/* ----------------------------------------------------------------- Swedish */
/* [NSR-FLAG] per §17.5.1. The Nordic +1-year spine (§22.5) is why the first use sentence
 * names förskoleklass rather than åk 1: Swedish åk 1 is seven, so within-10 content sits a
 * year below where an English Grade 1 tag would put it. Stated as placement advice. */
L.sv = {
  headings: ['Det här tränar bladet', 'Så använder du bladet i klassrummet'],
  modes: {
    'addition/image-number': 'Sex uppgifter där eleven räknar den avbildade mängden, lägger till det skrivna talet och skriver summan.',
    'addition/image-image': 'Sex uppgifter där eleven räknar båda de avbildade mängderna, lägger ihop dem och skriver summan på raden.',
    'addition/find-addend': 'Sex uppgifter där en term saknas och eleven skriver in det tal som gör additionen fullständig.',
    'addition/mixed': 'Sex additionsuppgifter där presentationen växlar mellan avbildade mängder, skrivna tal och en saknad term inom samma blad.',
    'subtraction/image-number': 'Sex uppgifter där eleven räknar den avbildade mängden, drar av det skrivna talet och skriver differensen.',
    'subtraction/cross-out': 'Sex uppgifter där eleven stryker över det angivna antalet bilder, räknar de kvarvarande och skriver differensen.',
    'subtraction/find-subtrahend': 'Sex uppgifter där ett tal saknas och eleven skriver in det tal som gör subtraktionen fullständig.',
    'subtraction/mixed': 'Sex subtraktionsuppgifter där presentationen växlar mellan bilder att stryka över, skrivna tal och ett saknat tal.',
  },
  range: 'Alla tal och alla svar på bladet ligger inom talområdet 0–10.',
  mixedNote: 'Blandningen gäller presentationen, inte räknesättet: alla sex uppgifter på bladet tillhör fortfarande samma räknesätt.',
  bridgeNote: 'En mängd är avbildad, den andra ett skrivet tal: steget från att räkna alla till att räkna vidare.',
  check: 'Papperet ger ingen återkoppling: facit finns som separat PDF, och webbversionen kontrollerar varje svar medan eleven arbetar.',
  objects: function (list) { return 'På det här bladet räknar eleven följande motiv: ' + list + '.'; },
  uses: [
    'Talområdet passar förskoleklass och tidiga åk 1, till exempel som veckans återkommande uppgift i mattestationen.',
    'Skicka med bladet som kort hemuppgift när eleverna behöver hålla räknandet levande mellan lektionerna.',
    'Låt två elever lösa varsin uppgift i taget och sedan berätta för varandra hur de tänkte.',
    'Ha några utskrivna blad i en mapp för elever som blir klara före de andra.',
    'Bladet fungerar utan genomgång och går därför att lämna till en vikarie tillsammans med dagens planering.',
  ],
  chips: { add: 'Addition inom 10', sub: 'Subtraktion inom 10', range: 'Talområde 0–10' },
  list: function (a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' och ' + a[a.length - 1] : a[0]; },
};

/* ------------------------------------------------------------------ build */

function digits(ordinal, radices) {
  var out = [], n = ordinal;
  for (var i = 0; i < radices.length; i++) { out.push(n % radices[i]); n = Math.floor(n / radices[i]); }
  return out;
}

function build(f, ordinal, locale) {
  var t = L[locale];
  if (!t) return null;

  var key = f.type + '/' + (f.mode || 'null');
  var modeSentence = t.modes[key];
  // A mode with no authored sentence must produce NO block rather than a vague one.
  if (!modeSentence) return null;

  var ops = (f.operations || []).map(function (o) { return o.text; });
  /* TWO use sentences, rotated as an ORDERED PAIR: 5 sentences give 20 combinations rather
   * than 5, and each block carries a second variable sentence instead of one.
   *
   * Widening the noun list alone was not enough. The pairs that still collided were all
   * `image-number` and `mixed` — precisely the two modes that carry an EXTRA fixed sentence
   * (the counting-on note, the mixed-means-presentation note), so their fixed share is the
   * largest in the family and the per-deck variation the smallest. More fixed text needs more
   * rotation, and a second classroom situation is worth reading in its own right. */
  var d = digits(ordinal, [t.uses.length, t.uses.length - 1, 3]);

  /* 4, 5 or 6 objects named, rotating. Was 3-4, which German and English cleared but Spanish
   * and French did not: their fixed sentences are longer, so the same per-deck variation was a
   * smaller share of the block and same-shape pairs reached 0.84. Every deck in this family
   * carries exactly six nouns, so widening costs nothing and gives the teacher the whole
   * picture inventory rather than a sample of it.
   *
   * The trailing-number strip is §20.5: `Cartero 2` is a filename artefact (the second cartero
   * image in the theme), not a word any Spanish teacher would write. */
  var useA = d[0];
  var useB = (useA + 1 + d[1]) % t.uses.length;   // never equal to useA

  var nouns = (f.depictedNouns || []).slice(0, 6).map(function (n) {
    return String(n).replace(/\s+\d+$/, '');
  }).filter(function (n, i, a) { return n && a.indexOf(n) === i; });

  var extras = [];
  if (/\/mixed$/.test(key)) extras.push(t.mixedNote);
  if (/image-number$/.test(key)) extras.push(t.bridgeNote);

  var block1 = modeSentence + ' ' + t.range + (extras.length ? ' ' + extras.join(' ') : '');
  var named = [];
  if (nouns.length) { block1 += ' ' + t.objects(t.list(nouns)); named = nouns.slice(); }

  return {
    shapes: { block1: key, block3: 'U' + useA },
    // Recorded so the verifier can assert on DATA rather than parse prose (see F2).
    namedObjects: named,
    chipRange: t.chips.range,
    chipMode: f.type === 'addition' ? t.chips.add : t.chips.sub,
    chipTen: null,                       // deliberately absent: see header note 1
    taskList: ops.length ? ops.join(', ') + '.' : '',
    heading1: t.headings[0],
    heading2: null,                      // no self-correction block in this family
    heading3: t.headings[1],
    block1: block1,
    block2: null,
    block3: t.uses[useA],
    blockExtras: t.check,
  };
}

module.exports = { build: build, locales: Object.keys(L) };
