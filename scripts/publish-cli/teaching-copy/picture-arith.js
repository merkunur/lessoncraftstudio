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
  var d = digits(ordinal, [t.uses.length, 3]);
  // 3 or 4 objects named, rotating — the second digit previously selected nothing
  var nouns = (f.depictedNouns || []).slice(0, 3 + (d[1] % 2));

  var extras = [];
  if (/\/mixed$/.test(key)) extras.push(t.mixedNote);
  if (/image-number$/.test(key)) extras.push(t.bridgeNote);

  var block1 = modeSentence + ' ' + t.range + (extras.length ? ' ' + extras.join(' ') : '');
  var named = [];
  if (nouns.length) { block1 += ' ' + t.objects(t.list(nouns)); named = nouns.slice(); }

  return {
    shapes: { block1: key, block3: 'U' + d[0] },
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
    block3: t.uses[d[0]],
    blockExtras: t.check,
  };
}

module.exports = { build: build, locales: Object.keys(L) };
