/**
 * data/e2/e2-math.js — the bank of Batch DE-A (Daily Teaching System Stage E-2, 2026-11-26): German mathematics,
 * Klasse 1 and 2, types G1-673 .. G2-636 (factory types/_shared/e2-math.js, drawings e2-math-art.js, gate
 * qa/verify-e2-de-a.js). GIT-IGNORED folder: commit with `git add -f`.
 *
 * Every word a page prints is here, in German as a Grundschule teacher writes it on a worksheet (du-form to the child).
 * The pictures are library pictures (theme, noun), each opened on a contact sheet (lcs-stage-d/batch-de-a/work/pics);
 * the classroom things, the body measures and the measuring tools are drawn (e2-math-art.js).
 *
 * The measuring-table bank (MEASURE) is built so a later batch adds only its own units and things: a UNIT names its
 * drawing and its words per locale; a SET names its locale, its units, its things and its columns per level.
 */
'use strict';

/* ================================================================ G1-673 Rechnen mit der Null: the picture stories */
/**
 * A story thing: a library picture, the German words, the place (the first sentence) and how it goes away or comes.
 *   kind 'animal': it leaves by itself (weg: "fliegt weg"), more come ("Es kommen noch Vögel dazu.")
 *   kind 'food'  : it is eaten ("wird gegessen"), more are put down ("Es werden noch Kekse dazugelegt.")
 * g = the gender of the singular (m / f / n) for "kein / keine"; scene = the drawn place (e2-math-art.js storyPanel).
 * Every picture was opened: a bird, a white swan, a ladybird, a green frog, a brown hare, a green car,
 * a chocolate-chip biscuit, a red apple, a strawberry, a muffin (no zero, no "show none": the picture always shows the
 * things that are there; the action — nothing comes, nothing goes, all go — is in the sentence and the crossing out).
 */
const NULL_THINGS = [
  { id: 'vogel', kind: 'animal', pic: ['spring', 'bird'], g: 'm', sg: 'Vogel', pl: 'Vögel', place: 'Auf dem Ast sitzen', scene: 'branch', goSg: 'fliegt weg', goPl: 'fliegen weg' },
  // (no duck: every duck in the library is a yellow duckling, which a child calls a Küken)
  { id: 'schwan', kind: 'animal', pic: ['Things That Fly', 'swan'], g: 'm', sg: 'Schwan', pl: 'Schwäne', place: 'Auf dem Teich schwimmen', scene: 'pond', goSg: 'schwimmt weg', goPl: 'schwimmen weg' },
  { id: 'marienkaefer', kind: 'animal', pic: ['summer', 'ladybug'], g: 'm', sg: 'Marienkäfer', pl: 'Marienkäfer', place: 'Auf dem Blatt sitzen', scene: 'leaf', goSg: 'krabbelt weg', goPl: 'krabbeln weg' },
  { id: 'frosch', kind: 'animal', pic: ['spring', 'frog'], g: 'm', sg: 'Frosch', pl: 'Frösche', place: 'Auf dem Stein sitzen', scene: 'stone', goSg: 'hüpft weg', goPl: 'hüpfen weg' },
  { id: 'hase', kind: 'animal', pic: ['pets', 'rabbit'], g: 'm', sg: 'Hase', pl: 'Hasen', place: 'Auf der Wiese sitzen', scene: 'meadow', goSg: 'hoppelt weg', goPl: 'hoppeln weg' },
  { id: 'auto', kind: 'animal', pic: ['vehicles', 'car'], g: 'n', sg: 'Auto', pl: 'Autos', place: 'Auf dem Parkplatz stehen', scene: 'parking', goSg: 'fährt weg', goPl: 'fahren weg' },
  { id: 'keks', kind: 'food', pic: ['bakery', 'cookie'], g: 'm', sg: 'Keks', pl: 'Kekse', place: 'Auf dem Teller liegen', scene: 'plate' },
  { id: 'apfel', kind: 'food', pic: ['fruits', 'apple'], g: 'm', sg: 'Apfel', pl: 'Äpfel', place: 'Im Korb liegen', scene: 'basket' },
  { id: 'erdbeere', kind: 'food', pic: ['fruits', 'strawberry'], g: 'f', sg: 'Erdbeere', pl: 'Erdbeeren', place: 'In der Schale liegen', scene: 'bowl' },
  { id: 'muffin', kind: 'food', pic: ['bakery', 'muffin'], g: 'm', sg: 'Muffin', pl: 'Muffins', place: 'Auf dem Tablett stehen', scene: 'tray' },
];

/* ================================================================ G1-674, G2-635: the children */
/** common first names in German Grundschulen today (girls, boys); a page draws three or four, never two alike */
const NAMES = {
  f: ['Lena', 'Mia', 'Emma', 'Hannah', 'Lea', 'Sophie', 'Marie', 'Emilia', 'Lina', 'Ida', 'Elif', 'Aylin', 'Clara', 'Nele', 'Zeynep', 'Leonie'],
  m: ['Ben', 'Paul', 'Leon', 'Finn', 'Jonas', 'Noah', 'Elias', 'Luca', 'Emil', 'Felix', 'Anton', 'Milan', 'Can', 'Yusuf', 'Tim', 'Max'],
};

/* ================================================================ G1-675, G2-636: the measuring tables */
/**
 * UNITS: what a child measures with. draw = the drawing in e2-math-art.js; words per locale (one / many / the column
 * word). kind 'count' = a count of the unit (body measures, old measures); kind 'metric' = metres and centimetres read
 * on a tool. A later batch (the Swedish äldre mått: tum, fot, aln, famn) adds its units here with draw + sv words.
 */
const UNITS = {
  span: { kind: 'count', draw: 'span', de: { one: 'Handspanne', many: 'Handspannen' }, approxCm: [12, 16] },
  foot: { kind: 'count', draw: 'foot', de: { one: 'Fuß', many: 'Füße' }, approxCm: [17, 21] },
  step: { kind: 'count', draw: 'step', de: { one: 'Schritt', many: 'Schritte' }, approxCm: [40, 55] },
  ruler: { kind: 'tool', draw: 'ruler', de: { one: 'Lineal' } },
  folding: { kind: 'tool', draw: 'folding', de: { one: 'Meterstab' } },
  tape: { kind: 'tool', draw: 'tape', de: { one: 'Maßband' } },
};
/**
 * THINGS a German classroom and Schulhof have; each is drawn with a coral double arrow on the side to measure. cm = the
 * range a teacher meets (sources in the result file: DIN EN 1729-1 school furniture, DIN 18101 doors, DIN 476 / ISO 216
 * paper, the ITTF table, common classroom sizes). de = the word printed in the table (with the side to measure); short =
 * under 1 m (the metric table asks only for cm there).
 */
const THINGS = {
  tisch: { draw: 'table', de: 'Tisch', cm: [120, 130] },                     // a Zweiertisch, the long side
  tischhoehe: { draw: 'tableHeight', de: 'Tisch\u00adhöhe', cm: [59, 76], short: true },
  heft: { draw: 'notebook', de: 'Heft', cm: [21, 30], short: true },          // DIN A5 / A4, the long side
  mappe: { draw: 'pencilcase', de: 'Feder\u00admäppchen', cm: [19, 24], short: true },
  tafel: { draw: 'board', de: 'Tafel', cm: [200, 400] },                     // the middle panel / opened
  tuer: { draw: 'doorWidth', de: 'Türbreite', cm: [86, 101] },
  tuerhoehe: { draw: 'doorHeight', de: 'Tür\u00adhöhe', cm: [199, 211] },
  fensterbank: { draw: 'sill', de: 'Fenster\u00adbank', cm: [100, 800] },   // a whole window front can be 5-8 m (review round 1)
  fensterbank1: { draw: 'sill', de: 'Fenster\u00adbank an einem Fenster', cm: [80, 150] },   // Klasse 1: one window (review round 1)
  teppich: { draw: 'rug', de: 'Teppich', cm: [200, 300] },
  schrank: { draw: 'cupboard', de: 'Schrank\u00adhöhe', cm: [180, 220] },
  zimmer: { draw: 'room', de: 'Klassen\u00adzimmer: lange Seite', cm: [700, 1000] },
  zimmerkurz: { draw: 'roomShort', de: 'Klassen\u00adzimmer: kurze Seite', cm: [600, 800] },
  flur: { draw: 'corridor', de: 'Flur (breit)', cm: [200, 400] },
  bank: { draw: 'bench', de: 'Bank auf dem Schulhof', cm: [150, 200] },
  platte: { draw: 'pingpong', de: 'Tischtennis\u00adplatte', cm: [274, 274] },   // a soft hyphen: it breaks as Tischtennis-platte in the narrow column
};
/**
 * SETS: one per measuring page. locale; units (which a row may name); rows per level: [thing, unit] with unit null =
 * the child chooses; columns per level. Columns: thing | with (the unit drawn, or the units to tick) | est | meas |
 * partner | diff. own = an empty row for a thing the child chooses.
 */
const SETS = {
  // G1-675: Handspanne, Fuß, Schritt (Klasse 1; counts up to about 20)
  koerper: {
    locale: 'de', units: ['span', 'foot', 'step'],
    // thing -> the body measure a Klasse-1 teacher pairs with it, and the count a six-to-seven-year-old gets (about)
    // (no door height and no cupboard height: a six-year-old cannot reach 2 m; no pencil case: it is about one hand span)
    // (the classroom's short side: its long side, up to 10 m, is up to 25 steps; the objective says up to about 20)
    pairs: { tisch: 'span', heft: 'span', fensterbank1: 'span', tafel: 'step', zimmerkurz: 'step', tuer: 'foot', teppich: 'foot' },
    must: ['tisch'],   // the comparison under the table is about the Tisch
    bottom: 'compare', compare: { thing: 'tisch', unit: 'span' },
    levels: {
      1: { rows: 4, cols: ['thing', 'with', 'est', 'meas'], choose: false },
      2: { rows: 5, cols: ['thing', 'with', 'est', 'meas', 'partner'], choose: false },
      3: { rows: 5, cols: ['thing', 'with', 'est', 'meas', 'diff'], choose: true },
    },
  },
  // G2-636: Meter und Zentimeter (Klasse 2; up to 10 m)
  mcm: {
    locale: 'de', units: ['ruler', 'folding', 'tape'],
    // (no Flur: its drawing did not read as a corridor at print size; the Klassenzimmer is the long thing up to 10 m)
    things: ['heft', 'tischhoehe', 'tafel', 'tuerhoehe', 'bank', 'mappe', 'fensterbank', 'schrank', 'zimmer', 'platte'],
    bottom: 'sort',
    levels: {
      1: { rows: 4, cols: ['thing', 'est', 'meas', 'with'], refs: ['finger', 'lineal', 'tuer'] },
      2: { rows: 5, cols: ['thing', 'est', 'meas', 'with', 'partner'], refs: ['finger', 'lineal', 'tuer'] },
      3: { rows: 5, cols: ['thing', 'est', 'meas', 'with', 'diff'], refs: ['finger', 'tuer'] },
    },
  },
};
/** the reference lengths printed on the metric page (Vergleichsgrößen), each with its source */
const REFS = {
  finger: { de: 'Fingerbreite: etwa 1 cm', src: 'a child\'s finger is 1-1.5 cm wide (the year design: "Fingerbreite etwa 1 cm")' },
  lineal: { de: 'Lineal: 30 cm', src: 'the standard school ruler is 30 cm long' },
  tuer: { de: 'Türbreite: etwa 1 m', src: 'DIN 18101: door leaves 86 / 98.5 cm, openings 88.5 / 101 cm (the year design: "Türbreite etwa 1 m")' },
};
/**
 * G2-636: the pictures to connect with "kürzer als 1 m / etwa 1 m / länger als 1 m" — each far from the line (short ≤ 45
 * cm, long ≥ 180 cm along its long side) or a thing a teacher calls about 1 m (the guitar: a full-size acoustic or
 * classical guitar is about 100 cm long). Every picture opened: a full-size car, a bus, a canoe and a bed, not toys; the
 * shoe an adult's.
 */
const LENGTH_PICS = [
  { id: 'bleistift', pic: ['classroom', 'pencil'], de: 'der Bleistift', cm: 18, ans: 'short' },
  { id: 'heft', pic: ['classroom', 'notebook'], de: 'das Heft', cm: 30, ans: 'short' },
  { id: 'buch', pic: ['classroom', 'book'], de: 'das Buch', cm: 25, ans: 'short' },
  { id: 'schere', pic: ['classroom', 'scissors'], de: 'die Schere', cm: 15, ans: 'short' },
  { id: 'loeffel', pic: ['around the house', 'spoon'], de: 'der Löffel', cm: 18, ans: 'short' },
  { id: 'schluessel', pic: ['around the house', 'key'], de: 'der Schlüssel', cm: 7, ans: 'short' },
  { id: 'schuh', pic: ['clothing', 'shoe'], de: 'der Schuh', cm: 28, ans: 'short' },
  { id: 'apfel', pic: ['fruits', 'apple'], de: 'der Apfel', cm: 8, ans: 'short' },
  { id: 'brotdose', pic: ['classroom', 'lunchbox'], de: 'die Brotdose', cm: 20, ans: 'short' },
  { id: 'gitarre', pic: ['music', 'guitar'], de: 'die Gitarre', cm: 100, ans: 'about' },
  { id: 'schlitten', pic: ['winter', 'sled'], de: 'der Schlitten', cm: 100, ans: 'about' },   // a wooden Rodel: 90-110 cm
  { id: 'auto', pic: ['vehicles', 'car'], de: 'das Auto', cm: 400, ans: 'long' },
  { id: 'bus', pic: ['vehicles', 'bus'], de: 'der Bus', cm: 1200, ans: 'long' },
  { id: 'kanu', pic: ['vehicles', 'canoe'], de: 'das Kanu', cm: 450, ans: 'long' },
  { id: 'bett', pic: ['furniture', 'bed'], de: 'das Bett', cm: 200, ans: 'long' },
  { id: 'sofa', pic: ['furniture', 'sofa'], de: 'das Sofa', cm: 200, ans: 'long' },
  // (no surfboard: at print size the library's surfboard reads as a striped oval, not as a board)
];

/* ================================================================ every printed string */
const TEXT = {
  // G1-673
  null: {
    storiesHead: 'Bildgeschichten',
    tasksHead: 'Rechne.',
    tasksHeadMissing: 'Rechne. Setze die fehlende Zahl ein.',
  },
  // G1-674 and G2-635: the children's ways
  wege1: {
    anchor: '7 + 8',
    headA: '1. Rechne die Wege der Kinder nach.',
    headB: '2. Wessen Weg ist das? Verbinde.',
    headB3: '2. Welcher Weg passt gut? Schreibe den Namen auf und rechne so.',
    headC: '3. Rechne auf deinem Weg. Schreibe die Schritte auf.',   // review round 2, the teacher's wording
    headC3: '3. Rechne auf deinem eigenen Weg. Schreibe die Schritte auf.',
    name: 'Weg von:',   // whose way the child takes (level 3)
    // the bubble's words in two lines (a Klasse-1 bubble breaks where a teacher reads a breath), then the way
    ways: {
      zehn: { line: ['Ich rechne erst', 'bis zur 10.'], chain: ['7', '3', '5'] },
      doppel: { line: ['Ich verdopple', 'die 7.'], chain: ['7', '7', '1'] },
      tausch: { line: ['Ich tausche:', '8 + 7.'], chain: ['8', '2', '5'] },
    },
  },
  wege2: {
    headA: '1. Rechne die Wege der Kinder nach.',
    headB: '2. Bei {name} steckt ein Fehler im Rechenweg.',
    headB2: 'In welchem Schritt steckt der Fehler? Kreuze ihn an.',   // review round 1, the teacher's wording
    fixLine: 'So ist der Schritt richtig:',
    result: 'Ergebnis:',
    headC: '3. Rechne mit der Hilfsaufgabe.',
    helper: 'Hilfsaufgabe:',
    headD: '4. Rechne auf deinem Weg. Schreibe die Schritte auf.',
    // the bubble's words in two lines, then the way
    ways: {
      schritt: ['Ich rechne', 'schrittweise:'],
      stellen: ['Ich rechne Zehner', 'und Einer extra:'],
      hilfs: ['Ich rechne mit', 'der Hilfsaufgabe:'],
    },
    and: 'und',
  },
  // G1-675 and G2-636: the measuring tables (per locale: a later set in another language adds its own block)
  mess: { de: {
    cols: { thing: 'Ding', with: 'Womit?', est: 'geschätzt', meas: 'gemessen', partner: 'Partnerkind', diff: 'Unterschied' },
    own: 'Das messe ich noch:',
    m: 'm', cm: 'cm',
    refsHead: 'Vergleichsgrößen:',
    // G1-675 under the table
    // both children measure the SAME table: only then do different numbers say something about their hands
    cmpHead: 'Messt beide denselben Tisch mit euren Handspannen.',
    mine: 'Ich:',
    theirs: 'Name:',
    whose: 'Wessen Handspanne ist größer? Kreuze an.',
    whoseChoices: ['meine', 'die vom anderen Kind', 'beide etwa gleich groß'],   // review round 1
    why: 'Wir haben verschiedene Zahlen, weil',
    rule: 'Wer weniger Handspannen braucht, hat die größere Handspanne. Gleich viele Handspannen: beide etwa gleich groß.',   // the key (never printed)
    // G2-636 under the table
    meterHead: 'Ergänze:',
    sortHead: 'Kürzer oder länger als 1 m? Verbinde.',
    sortHead3: 'Kürzer als 1 m, etwa 1 m oder länger als 1 m? Verbinde.',
    cards: { short: 'kürzer als 1 m', about: 'etwa 1 m', long: 'länger als 1 m' },
    cardEmpty: 'Eine Karte kann leer bleiben.',   // review round 1, the teacher's wording
  } },
  // G2-634
  zehner: {
    headE: 'Ergänze bis zum nächsten Zehner.',
    headMix: 'Ergänze zum Zehner und ziehe vom Zehner ab.',   // review round 1, the teacher's wording
    hundredHead: 'Ergänze bis 100 in zwei Schritten.',
    so: 'also',
  },
};

module.exports = { NULL_THINGS, NAMES, UNITS, THINGS, SETS, REFS, LENGTH_PICS, TEXT };
