/**
 * data/e2b/e2-math-b.js — the bank of Batch DE-B (Daily Teaching System Stage E-2, 2026-11-26): the German mathematics
 * pages of Klasse 3, types G3-633 .. G3-646 (factory types/_shared/e2-math-b.js, drawings e2-math-b-art.js, gate
 * qa/verify-e2-de-b.js). GIT-IGNORED folder: commit with `git add -f`.
 *
 * Every word a page prints is here (TEXT), in German as a Klasse-3 teacher writes it for a child who reads it alone
 * (du-form; the strategy and where it starts named). The ranges below are what a German teacher accepts for the thing
 * (each with its source); a gate (qa/verify-e2-de-b.js) holds every one against its OWN table.
 */
'use strict';

/* ================================================================ G3-638: small things drawn at their real size */
/** mm = the length range drawn (whole millimetres; the page draws one length in it), src = where the range comes from */
const MM_THINGS = [
  { id: 'klammer', de: 'Büroklammer', mm: [26, 33], src: 'Büroklammern DIN-Größen 26 mm und 32 mm (Herstellerangaben Büroklammer Nr. 2 / Nr. 3)' },
  { id: 'radierer', de: 'Radiergummi', mm: [35, 50], src: 'Schul-Radiergummi mit Papierhülle, gängige Größe 40-50 mm' },
  { id: 'schraube', de: 'Schraube', mm: [25, 45], src: 'Holzschraube 4 x 30 / 4 x 40 mm: Gesamtlänge mit Kopf' },
  { id: 'bleistift', de: 'kurzer Bleistift', mm: [45, 75], src: 'Bleistiftstummel: ein Bleistift (175 mm neu) nach langem Anspitzen' },
];

/* ================================================================ G3-639: the town map and everyday distances */
/** the places on the map (drawn; the bakery's sign is the library pretzel, the others are drawn) */
const PLACES = [
  { id: 'schule', de: 'Schule' },
  { id: 'baeckerei', de: 'Bäckerei' },
  { id: 'spielplatz', de: 'Spielplatz' },
  { id: 'schwimmbad', de: 'Schwimmbad' },
  { id: 'bahnhof', de: 'Bahnhof' },
];
/**
 * everyday distances and the card each belongs to: 'h' = etwa 100 m, 'k' = etwa 1 km, 'v' = viele Kilometer.
 * m = the range in metres a teacher accepts (the card is the nearest of 100 m / 1000 m / far more on a tenfold scale).
 */
const DISTANCES = [
  { id: 'fussballfeld', de: 'ein Fußballfeld von Tor zu Tor', m: [90, 120], card: 'h', src: 'DFB-Spielordnung: Spielfeld 90-120 m lang' },
  { id: 'schulhof', de: 'der Schulhof von einem Ende zum anderen', m: [40, 150], card: 'h', src: 'Grundschulhöfe in Deutschland: etwa 40-150 m lang' },
  { id: 'viertelstunde', de: 'eine Viertelstunde zu Fuß', m: [900, 1300], card: 'k', src: 'Gehgeschwindigkeit eines Kindes etwa 4-5 km in der Stunde' },
  { id: 'zehnfelder', de: 'zehn Fußballfelder hintereinander', m: [900, 1200], card: 'k', src: 'zehnmal etwa 100 m' },
  { id: 'runden', de: 'zweieinhalb Runden auf der 400-m-Laufbahn', m: [1000, 1000], card: 'k', src: 'Laufbahn im Stadion: eine Runde 400 m' },
  { id: 'hamburg', de: 'mit dem Auto von Hamburg nach München', m: [775000, 800000], card: 'v', src: 'Autobahnstrecke Hamburg-München etwa 780 km' },
  { id: 'berlin', de: 'mit dem Zug von Berlin nach Köln', m: [570000, 600000], card: 'v', src: 'Bahnstrecke Berlin-Köln etwa 580 km' },
  { id: 'urlaub', de: 'mit dem Flugzeug nach Spanien', m: [1000000, 3500000], card: 'v', src: 'Flugstrecken von Deutschland nach Spanien: Frankfurt-Mallorca etwa 1200 km, Frankfurt-Madrid etwa 1400 km, Frankfurt-Teneriffa etwa 3200 km' },
];

/* ================================================================ G3-641: a German supermarket's prices (2025) */
/** ct = the price range in cent a teacher accepts (German supermarkets, 2025: Aldi, Lidl, Rewe, Edeka), pl = plural or not */
const SHOP = [
  { id: 'brot', de: 'Brot', ct: [189, 399] },
  { id: 'milch', de: 'Milch', ct: [99, 149] },
  { id: 'butter', de: 'Butter', ct: [189, 289] },
  { id: 'kaese', de: 'Käse', ct: [149, 399] },
  { id: 'aepfel', de: 'Äpfel', ct: [179, 349] },
  { id: 'bananen', de: 'Bananen', ct: [119, 229] },
  { id: 'nudeln', de: 'Nudeln', ct: [79, 199] },
  { id: 'saft', de: 'Apfelsaft', ct: [119, 249] },
  { id: 'joghurt', de: 'Joghurt', ct: [39, 99] },
  { id: 'eier', de: 'Eier', ct: [199, 329] },
  { id: 'honig', de: 'Honig', ct: [329, 599] },
  { id: 'muesli', de: 'Müsli', ct: [199, 399] },
  { id: 'schokolade', de: 'Schokolade', ct: [99, 199] },
  { id: 'kekse', de: 'Kekse', ct: [119, 249] },
  { id: 'reis', de: 'Reis', ct: [129, 249] },
  { id: 'tomaten', de: 'Tomaten', ct: [149, 299] },
  { id: 'gurke', de: 'Gurke', ct: [59, 99] },
  { id: 'kakao', de: 'Kakao', ct: [249, 399] },
  { id: 'karotten', de: 'Karotten', ct: [99, 179] },
  { id: 'wasser', de: 'Wasser', ct: [49, 99] },
  { id: 'kaffee', de: 'Kaffee', ct: [449, 799] },
  { id: 'blumen', de: 'Blumen', ct: [399, 899] },
  { id: 'waschmittel', de: 'Waschmittel', ct: [399, 799] },
  { id: 'olivenoel', de: 'Olivenöl', ct: [399, 799] },
  { id: 'lachs', de: 'Lachs', ct: [349, 699] },
  { id: 'pizza', de: 'Pizza', ct: [249, 499] },
];

/* ================================================================ G3-642 / G3-643: things bought by the piece */
/**
 * g = the gender for "Für jede / jeden / jedes", sg / pl, eur = the price range for ONE piece a teacher accepts, in whole
 * euros. small: a thing sold in tens (the price table runs to 10 pieces).
 */
const PIECES = [
  { id: 'brezel', g: 'f', sg: 'Brezel', pl: 'Brezeln', eur: [1, 2] },
  { id: 'malblock', g: 'm', sg: 'Malblock', pl: 'Malblöcke', eur: [2, 3] },
  { id: 'kugel', g: 'f', sg: 'Kugel Eis', pl: 'Kugeln Eis', eur: [1, 2] },
  { id: 'bleistift', g: 'm', sg: 'Bleistift', pl: 'Bleistifte', eur: [1, 2] },
  { id: 'ball', g: 'm', sg: 'Ball', pl: 'Bälle', eur: [5, 10] },
  { id: 'buch', g: 'n', sg: 'Buch', pl: 'Bücher', eur: [6, 12] },
  { id: 'kinokarte', g: 'f', sg: 'Kinokarte', pl: 'Kinokarten', eur: [6, 9] },
  { id: 'eintrittskarte', g: 'f', sg: 'Eintrittskarte', pl: 'Eintrittskarten', eur: [4, 15] },
  { id: 'malkasten', g: 'm', sg: 'Malkasten', pl: 'Malkästen', eur: [5, 10] },
  { id: 'puzzle', g: 'n', sg: 'Puzzle', pl: 'Puzzles', eur: [5, 10] },
  { id: 'tasse', g: 'f', sg: 'Tasse', pl: 'Tassen', eur: [3, 8] },
  { id: 'netz', g: 'n', sg: 'Netz Äpfel', pl: 'Netze Äpfel', eur: [2, 3] },
];
/** G3-643: bigger things (numbers to 1000) — eur for ONE */
const BIG_PIECES = [
  { id: 'fahrrad', g: 'n', sg: 'Fahrrad', pl: 'Fahrräder', eur: [150, 350] },
  { id: 'zelt', g: 'n', sg: 'Zelt', pl: 'Zelte', eur: [60, 200] },
  { id: 'roller', g: 'm', sg: 'Roller', pl: 'Roller', eur: [40, 120] },
  { id: 'stuhl', g: 'm', sg: 'Stuhl', pl: 'Stühle', eur: [30, 90] },
  { id: 'tisch', g: 'm', sg: 'Tisch', pl: 'Tische', eur: [80, 250] },
  { id: 'helm', g: 'm', sg: 'Fahrradhelm', pl: 'Fahrradhelme', eur: [20, 60] },
];

/* ================================================================ G3-645: survey charts */
const SPORTS = ['Fußball', 'Schwimmen', 'Turnen', 'Radfahren', 'Tanzen', 'Basketball', 'Reiten', 'Tennis'];

/* ================================================================ G3-646: things to combine */
/** clothing drawn in a colour; the colour word goes with the noun's gender */
const COLOURS = [
  { id: 'rot', fill: '#E35B4C', m: 'roter', f: 'rote', n: 'rotes', w: 'rot' },
  { id: 'blau', fill: '#4A7FC1', m: 'blauer', f: 'blaue', n: 'blaues', w: 'blau' },
  { id: 'gelb', fill: '#F2C84B', m: 'gelber', f: 'gelbe', n: 'gelbes', w: 'gelb' },
  { id: 'gruen', fill: '#5DAA5A', m: 'grüner', f: 'grüne', n: 'grünes', w: 'grün' },
];
/** a tree task: three choices, each of two (2 x 2 x 2) */
const TREES = [
  { id: 'fruehstueck', intro: 'Zum Frühstück gibt es', levels: [['ein helles Brötchen', 'ein dunkles Brötchen'], ['Käse', 'Wurst'], ['Milch', 'Saft']], short: [['hell', 'dunkel'], ['Käse', 'Wurst'], ['Milch', 'Saft']], q: 'Jedes Kind nimmt ein Brötchen, einen Belag und ein Getränk. Wie viele verschiedene Frühstücke gibt es?' },
  { id: 'eis', intro: 'Beim Eis gibt es', levels: [['Waffel', 'Becher'], ['Erdbeere', 'Schoko'], ['mit Sahne', 'ohne Sahne']], short: [['Waffel', 'Becher'], ['Erdbeere', 'Schoko'], ['mit Sahne', 'ohne Sahne']], q: 'Jedes Kind wählt Waffel oder Becher, eine Sorte und mit oder ohne Sahne. Wie viele Möglichkeiten gibt es?' },
  { id: 'ausflug', intro: 'Für den Ausflug gibt es', levels: [['Bus', 'Zug'], ['Zoo', 'Museum'], ['vormittags', 'nachmittags']], short: [['Bus', 'Zug'], ['Zoo', 'Museum'], ['vormittags', 'nachmittags']], q: 'Die Klasse wählt ein Fahrzeug, ein Ziel und eine Zeit. Wie viele verschiedene Ausflüge gibt es?' },
];
/** a table task with words (not drawn clothes): rows x columns */
const WORD_TABLES = [
  { id: 'broetchen', rowsHead: 'Brötchen', colsHead: 'Belag', rows: ['hell', 'dunkel', 'mit Körnern'], cols: ['Käse', 'Wurst', 'Marmelade'], q: 'Jedes Brötchen gibt es mit Käse, Wurst oder Marmelade. Wie viele verschiedene belegte Brötchen gibt es?' },
  { id: 'pizza', rowsHead: 'Teig', colsHead: 'Belag', rows: ['dünn', 'dick', 'mit Rand'], cols: ['Tomate', 'Salami', 'Pilze'], q: 'Jede Pizza hat einen Teig und einen Belag. Wie viele verschiedene Pizzen gibt es?' },
];
/** children for the row task (3! = 6) */
const ROW_KIDS = [['Lena', 'Ben', 'Mia'], ['Paul', 'Emma', 'Can'], ['Elif', 'Tim', 'Nele'], ['Jonas', 'Ida', 'Yusuf']];

/* ================================================================ every printed string */
const TEXT = {
  // G3-633
  hz: {
    small: 'kleine Aufgabe', big: 'große Aufgabe',
    blocks: { A: 'Hunderterzahlen', B: 'Zehnerzahlen', C: 'Zehnerzahlen über den Hunderter', D: 'Ergänze bis zum nächsten Hunderter.', D2: 'Ergänze bis 1000.', Dk: 'Ergänze bis zum nächsten Hunderter und bis 1000.', D3: 'Ergänze in zwei Schritten bis 1000.' },
    mixed: 'Rechne. Denke an die kleine Aufgabe.',
    also: 'also',
  },
  // G3-634
  hsub: {
    sub: 'Ich ziehe ab.', add: 'Ich ergänze.',
    given: { sub: 'Ziehe schrittweise ab:', add: 'Ergänze:' },
    stepsHead: 'Meine Schritte:',
    both: 'Rechne auf beiden Wegen:', bothSub: 'Abziehen', bothAdd: 'Ergänzen',
    which: 'Welcher Weg war hier geschickter?', whichSub: 'Abziehen', whichAdd: 'Ergänzen',
    why: 'Warum?',
    quickHead: 'Wie würdest du rechnen? Kreuze an. Du musst hier nicht rechnen.',
  },
  // G3-635
  mz: {
    small: 'Einmaleins', big: 'mit der Zehnerzahl',
    rod: 'Eine Zehnerstange ist 10.',
  },
  // G3-636
  hmul: {
    field: 'Punktefeld', cross: 'Malkreuz', steps: 'Rechenschritte',
    helps: 'Was hilft dir am meisten? Kreuze an.',
    helpsOpts: ['das Punktefeld', 'das Malkreuz', 'die Rechenschritte'],
    helpsOpts3: ['das Malkreuz', 'die Rechenschritte'],
    zehner: 'Zehner', einer: 'Einer',
    because: 'Mir hilft das am meisten, weil',
    // level 3 offers two (no Punktefeld): "mehr", not "am meisten"
    helps3: 'Was hilft dir mehr? Kreuze an.',
    because3: 'Mir hilft das mehr, weil',
  },
  // G3-637
  hdiv: {
    givenHead: 'Die Zerlegung ist schon da.', ownHead: 'Zerlege selbst.',
    probe: 'Probe:', probeTo: 'Aufgabe',
  },
  // G3-638
  mm: {
    ruler: 'Dieses Lineal ist 10 cm lang. Lege dein Lineal daneben: Ist es genauso lang?',
    lines: 'Miss die Strecken.', things: 'Miss, wie lang die Dinge sind.', draw: 'Zeichne die Strecken. Beginne am Punkt.',
    rule: '1 cm = 10 mm',
    diff: 'Wie viel länger ist die längste Strecke als die kürzeste?',
    teacher: 'Drucke in tatsächlicher Größe (100 %), sonst stimmen die Längen nicht.',
  },
  // G3-639
  km: {
    rule: '1 km = 1000 m',
    routes: 'Wie lang ist der Weg? Rechne.', fill: 'Ergänze bis 1 km.', match: 'Wie weit ist das ungefähr? Verbinde.',
    cards: { h: 'etwa 100 m', k: 'etwa 1 km', v: 'viele Kilometer' },
    shorter: 'Welcher Weg ist kürzer?', missing: 'Wie viele Meter fehlen noch bis 1 km?', missingShort: 'Bis 1 km fehlen noch',
  },
  // G3-640
  komma: {
    moneyHead: 'Geld', lenHead: 'Längen',
    moneyCols: ['€ und ct', 'nur ct', 'mit Komma'], lenCols: ['m und cm', 'nur cm', 'mit Komma'],
    convert: 'Wandle um.',
  },
  // G3-641
  ueber: {
    ruleHead: 'So überschlägst du:',
    rule: 'Runde jeden Preis auf ganze Euro: Ab 50 Cent rundest du auf, sonst rundest du ab. Rechne dann die gerundeten Preise zusammen.',
    list: 'Einkaufszettel', have: 'Ich habe:',
    est: 'Überschlag:', enough: 'Das Geld reicht.', notEnough: 'Das Geld reicht nicht.',
    receipt: 'Kassenzettel', total: 'Summe',
    receiptRule: 'Ist die Summe mehr als 2 € von deinem Überschlag entfernt, kann sie nicht stimmen.',
    can: 'kann stimmen', cannot: 'kann nicht stimmen', after: 'Nach dem Überschlag:',
    because: 'Begründe:',
  },
  // G3-642 / G3-643
  tab: {
    count: 'Anzahl', price: 'Preis in €',
    each: { f: 'Für jede {sg} mehr bezahlst du', m: 'Für jeden {sg} mehr bezahlst du', n: 'Für jedes {sg} mehr bezahlst du' },
    eachTail: '€ mehr.',
    one: { f: '1 {sg} kostet', m: '1 {sg} kostet', n: '1 {sg} kostet' },
    answer: 'Antwort:',
  },
  // G3-644
  zirkel: {
    circles: 'Zeichne die Kreise um den Mittelpunkt M.', target: 'Zeichne um M drei Kreise: eine Zielscheibe.',
    flower: 'Zeichne die Blume fertig.', model: 'So sieht sie aus:',
    radius: 'Radius', diameter: 'Durchmesser',
    flowerHint: 'Stich die Zirkelspitze in einen Punkt auf dem Kreis ein. Der Radius bleibt gleich.',
    radii: 'Radien: 2 cm, 3 cm und 4 cm',
    teacher: 'Drucke in tatsächlicher Größe (100 %), sonst stimmen die gedruckten Kreise und die Blume nicht.',
  },
  // G3-645
  dia: {
    title: 'Lieblingssport an unserer Schule', axis: 'Kinder', read: 'Wie viele Kinder sind es? Schreibe die Zahlen auf.',
    chart1: 'Diagramm 1', chart2: 'Diagramm 2', picture: 'Bilddiagramm',
    key: 'Ein Bild bedeutet {N} Kinder.',
    yes: 'stimmt', no: 'stimmt nicht', cant: 'kann man nicht ablesen',
    why: 'Warum sehen die Säulen in Diagramm 2 so verschieden hoch aus?',
    same: 'Beide Diagramme zeigen dieselbe Umfrage.',
  },
  // G3-646
  kombi: {
    count: 'Es gibt', countTail: 'Möglichkeiten.', mal: 'Malaufgabe:',
    tshirts: 'T-Shirts', hosen: 'Hosen',
    tableTask: '{N} hat {T} T-Shirts und {H} Hosen. Wie viele verschiedene Möglichkeiten gibt es, ein T-Shirt und eine Hose anzuziehen?',
    paint: 'Male in jedem Feld das T-Shirt und die Hose in den passenden Farben an.',
    rowTask: '{A}, {B} und {C} stellen sich in eine Reihe. Wie viele verschiedene Reihen gibt es?',
    first: 'vorne', example: 'Beispiel', places: ['vorne', 'in der Mitte', 'hinten'],
  },
};

module.exports = { MM_THINGS, PLACES, DISTANCES, SHOP, PIECES, BIG_PIECES, SPORTS, COLOURS, TREES, WORD_TABLES, ROW_KIDS, TEXT };
