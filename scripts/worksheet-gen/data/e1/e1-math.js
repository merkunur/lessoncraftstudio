/**
 * data/e1/e1-math.js — the bank of Batch E-1 (Daily Teaching System Stage E, 2026-11-25): German and Swedish mathematics,
 * types G1-671 .. G3-632 (factory types/_shared/e1-math.js, drawings e1-math-art.js, gate qa/verify-e1-math.js).
 * GIT-IGNORED folder: commit with `git add -f`.
 *
 * Every word a page prints is here, in the page's own language (German for G1-671, G3-630, G3-631; Swedish for G1-672,
 * G2-631, G2-632, G2-633, G3-632), written as a German Grundschule / Swedish lågstadium teacher writes it. The pictures
 * are library pictures (theme, noun), each opened on a contact sheet (lcs-stage-d/batch-e1/work/pics).
 */
'use strict';

/* ================================================================ G1-671: the market stall (whole euros) */
/** goods a Klasse-1 stall sells for whole euros; eur = the price range a teacher accepts for the thing (flea market /
 *  toy stall prices, 2025). de = the word (for the text dump and the reviewers; the page shows only the picture). */
const DE_GOODS = [
  { id: 'ball', pic: ['toys', 'ball'], de: 'der Ball', eur: [4, 12] },
  { id: 'car', pic: ['toys', 'car'], de: 'das Spielzeugauto', eur: [2, 8] },
  { id: 'robot', pic: ['toys', 'robot'], de: 'der Roboter', eur: [6, 12] },
  { id: 'train', pic: ['toys', 'train'], de: 'die Spielzeuglok', eur: [5, 12] },
  { id: 'dice', pic: ['toys', 'dice'], de: 'der Würfel', eur: [1, 3] },
  { id: 'kite', pic: ['toys', 'kite'], de: 'der Drachen', eur: [4, 12] },
  { id: 'boat', pic: ['toys', 'boat'], de: 'das Spielzeugboot', eur: [3, 10] },
  { id: 'dinosaur', pic: ['toys', 'dinosaur'], de: 'der Dinosaurier', eur: [3, 9] },
  { id: 'truck', pic: ['toys', 'truck'], de: 'der Kipplaster', eur: [5, 12] },
  { id: 'rocket', pic: ['toys', 'rocket'], de: 'die Rakete', eur: [3, 9] },
  { id: 'teddy', pic: ['toys', 'teddy_bear'], de: 'der Teddy', eur: [5, 12] },
  { id: 'crayons', pic: ['toys', 'crayons'], de: 'die Wachsmalstifte', eur: [2, 6] },
  { id: 'cards', pic: ['toys', 'cards'], de: 'das Kartenspiel', eur: [2, 6] },
  { id: 'bucket', pic: ['toys', 'bucket'], de: 'der Sandeimer', eur: [2, 6] },
  { id: 'shovel', pic: ['toys', 'shovel'], de: 'die Schaufel', eur: [1, 4] },
  { id: 'book', pic: ['classroom', 'book'], de: 'das Buch', eur: [3, 12] },
  { id: 'scissors', pic: ['classroom', 'scissors'], de: 'die Schere', eur: [2, 5] },
  { id: 'glue', pic: ['classroom', 'glue'], de: 'der Kleber', eur: [1, 3] },
  { id: 'ruler', pic: ['classroom', 'ruler'], de: 'das Lineal', eur: [1, 3] },
  { id: 'lunchbox', pic: ['classroom', 'lunchbox'], de: 'die Brotdose', eur: [3, 9] },
  { id: 'cap', pic: ['accessories', 'cap'], de: 'die Kappe', eur: [4, 12] },
  { id: 'umbrella', pic: ['accessories', 'umbrella'], de: 'der Regenschirm', eur: [5, 12] },
  { id: 'sunglasses', pic: ['accessories', 'sunglasses'], de: 'die Sonnenbrille', eur: [3, 12] },
  { id: 'scarf', pic: ['accessories', 'scarf'], de: 'der Schal', eur: [4, 12] },
  { id: 'beanie', pic: ['clothing', 'beanie'], de: 'die Mütze', eur: [4, 10] },
];

/* ================================================================ G2-631: goods in kronor (12-95 kr) */
/** kr = a price range a teacher accepts for the thing in a Swedish toy or stationery shop (2025) */
const SV_GOODS = [
  { id: 'ball', pic: ['toys', 'ball'], sv: 'en boll', kr: [39, 95] },
  { id: 'car', pic: ['toys', 'car'], sv: 'en leksaksbil', kr: [19, 49] },
  { id: 'robot', pic: ['toys', 'robot'], sv: 'en robot', kr: [59, 95] },
  { id: 'train', pic: ['toys', 'train'], sv: 'ett leksakståg', kr: [39, 95] },
  { id: 'dice', pic: ['toys', 'dice'], sv: 'en tärning', kr: [12, 19] },
  { id: 'kite', pic: ['toys', 'kite'], sv: 'en drake', kr: [39, 95] },
  { id: 'boat', pic: ['toys', 'boat'], sv: 'en leksaksbåt', kr: [29, 79] },
  { id: 'dinosaur', pic: ['toys', 'dinosaur'], sv: 'en dinosaurie', kr: [29, 79] },
  { id: 'truck', pic: ['toys', 'truck'], sv: 'en lastbil', kr: [39, 95] },
  { id: 'rocket', pic: ['toys', 'rocket'], sv: 'en raket', kr: [25, 69] },
  { id: 'teddy', pic: ['toys', 'teddy_bear'], sv: 'en nalle', kr: [49, 95] },
  { id: 'crayons', pic: ['toys', 'crayons'], sv: 'kritor', kr: [19, 45] },
  { id: 'cards', pic: ['toys', 'cards'], sv: 'en kortlek', kr: [19, 39] },
  { id: 'bucket', pic: ['toys', 'bucket'], sv: 'en hink', kr: [15, 35] },
  { id: 'shovel', pic: ['toys', 'shovel'], sv: 'en spade', kr: [12, 25] },
  { id: 'book', pic: ['classroom', 'book'], sv: 'en bok', kr: [39, 95] },
  { id: 'scissors', pic: ['classroom', 'scissors'], sv: 'en sax', kr: [15, 39] },
  { id: 'glue', pic: ['classroom', 'glue'], sv: 'ett lim', kr: [12, 25] },
  { id: 'ruler', pic: ['classroom', 'ruler'], sv: 'en linjal', kr: [12, 25] },
  { id: 'notebook', pic: ['classroom', 'notebook'], sv: 'ett anteckningsblock', kr: [12, 29] },
  { id: 'lunchbox', pic: ['classroom', 'lunchbox'], sv: 'en matlåda', kr: [29, 79] },
  { id: 'cap', pic: ['accessories', 'cap'], sv: 'en keps', kr: [49, 95] },
  { id: 'umbrella', pic: ['accessories', 'umbrella'], sv: 'ett paraply', kr: [59, 95] },
  { id: 'sunglasses', pic: ['accessories', 'sunglasses'], sv: 'solglasögon', kr: [29, 95] },
  { id: 'scarf', pic: ['accessories', 'scarf'], sv: 'en halsduk', kr: [49, 95] },
  { id: 'beanie', pic: ['clothing', 'beanie'], sv: 'en mössa', kr: [39, 95] },
];

/* ================================================================ G2-632: masses (whole kilograms) */
/**
 * things drawn on a balance or a kitchen scale; kg = the whole kilograms a teacher accepts for the thing as pictured.
 * Typical masses (general reference knowledge of everyday things, NOT checked against a cited page: a reviewer confirms
 * them): a whole pineapple about 1 kg (1-1.5 kg; review round 1, the Swedish teacher: level 3 uses it as THE "about
 * 1 kg" thing, so the measure cards weigh it at 1 kg only); a full-size acoustic guitar about 2-3 kg; a filled school
 * backpack about 2-5 kg (the common advice is at most about a tenth of a child's body weight, and real bags are often
 * heavier); an orange carving pumpkin about 3-7 kg; a wooden chair about 4-7 kg. NO BICYCLE on the measure cards (review
 * round 2: every bicycle in the library is drawn as a full-size bike, about 15 kg, so 8-10 kg is wrong for the picture;
 * the bicycle stays in the "mer än 1 kg" picture compare). NO CAT: every cat in the library is drawn as a kitten (big head, big eyes),
 * and a kitten can weigh under 1 kg (review round 1). Each range is wide on purpose: the page states the number the
 * balance or the scale shows, so the range only has to make that number believable for the thing pictured.
 */
const MASS_OBJECTS = [
  { id: 'pineapple', pic: ['fruits', 'pineapple'], sv: 'en ananas', kg: [1, 1], scale: true },
  { id: 'guitar', pic: ['music', 'guitar'], sv: 'en gitarr', kg: [2, 3], scale: false },
  { id: 'backpack', pic: ['classroom', 'backpack'], sv: 'en full skolväska', kg: [2, 5], scale: true },
  { id: 'pumpkin', pic: ['vegetables', 'pumpkin'], sv: 'en pumpa', kg: [3, 7], scale: true },
  { id: 'chair', pic: ['furniture', 'chair'], sv: 'en stol', kg: [4, 7], scale: false },
];
/** more or less than 1 kg (every one far from 1 kg: the lightest "more" thing is a pumpkin, about 3 kg; the heaviest
 *  "less" thing is an orange, about 0.2 kg) */
const LIGHT_THINGS = [
  { id: 'apple', pic: ['fruits', 'apple'], sv: 'ett äpple' },
  { id: 'banana', pic: ['fruits', 'banana'], sv: 'en banan' },
  { id: 'key', pic: ['around the house', 'key'], sv: 'en nyckel' },
  { id: 'feather', pic: ['easter', 'feather'], sv: 'en fjäder' },
  { id: 'strawberry', pic: ['fruits', 'strawberry'], sv: 'en jordgubbe' },
  { id: 'spoon', pic: ['around the house', 'spoon'], sv: 'en sked' },
  { id: 'toothbrush', pic: ['around the house', 'toothbrush'], sv: 'en tandborste' },
  { id: 'pencil', pic: ['classroom', 'pencil'], sv: 'en blyertspenna' },
  { id: 'mouse', pic: ['pets', 'mouse'], sv: 'en mus', alive: true },
  { id: 'goldfish', pic: ['pets', 'goldfish'], sv: 'en guldfisk', alive: true },
  { id: 'orange', pic: ['fruits', 'orange'], sv: 'en apelsin' },
  { id: 'lemon', pic: ['fruits', 'lemon'], sv: 'en citron' },
];
const HEAVY_THINGS = [
  { id: 'bicycle', pic: ['toys', 'bicycle'], sv: 'en cykel' },
  { id: 'chair', pic: ['furniture', 'chair'], sv: 'en stol' },
  { id: 'television', pic: ['around the house', 'television'], sv: 'en tv' },
  { id: 'refrigerator', pic: ['around the house', 'refrigerator'], sv: 'ett kylskåp' },
  { id: 'couch', pic: ['furniture', 'couch'], sv: 'en soffa' },
  { id: 'pumpkin', pic: ['vegetables', 'pumpkin'], sv: 'en pumpa' },
];
/** level 3: the small balances against ONE 1-kg weight. The things that go DOWN on them (heavier than 1 kg, small enough
 *  for a pan, never alive): a pumpkin (3-7 kg), a filled school backpack (2-5 kg), a skateboard (about 2-4 kg) */
const PAN_HEAVY = [
  { id: 'pumpkin', pic: ['vegetables', 'pumpkin'], sv: 'en pumpa' },
  { id: 'backpack', pic: ['classroom', 'backpack'], sv: 'en full skolväska' },
  { id: 'skateboard', pic: ['toys', 'skateboard'], sv: 'en skateboard' },
];
/** level 3: a thing that balances 1 kg (a pineapple, about 1 kg) */
const ABOUT_ONE = [{ id: 'pineapple', pic: ['fruits', 'pineapple'], sv: 'en ananas' }];

/* ================================================================ G2-633: seconds, minutes or hours */
/** everyday activities of a Swedish second grader, each in ONE unit by an order of magnitude: seconds (under about 10
 *  seconds), minutes (2 to 30 minutes), hours (3 hours or more). Wordings a child reads; the gate holds the unit. */
const UNIT_ACTIVITIES = [
  { id: 'blink', sv: 'blinka en gång', unit: 'sekunder' },
  { id: 'sneeze', sv: 'nysa', unit: 'sekunder' },
  { id: 'clap', sv: 'klappa i händerna en gång', unit: 'sekunder' },
  { id: 'name', sv: 'säga sitt namn', unit: 'sekunder' },
  { id: 'button', sv: 'trycka på en knapp', unit: 'sekunder' },
  { id: 'slide', sv: 'åka nerför en rutschkana', unit: 'sekunder' },
  { id: 'teeth', sv: 'borsta tänderna på kvällen', unit: 'minuter' },
  { id: 'banana', sv: 'äta en banan', unit: 'minuter' },
  { id: 'shower', sv: 'duscha', unit: 'minuter' },
  { id: 'dress', sv: 'klä på sig på morgonen', unit: 'minuter' },
  { id: 'story', sv: 'läsa en saga', unit: 'minuter' },
  { id: 'walk', sv: 'gå till skolan', unit: 'minuter' },
  { id: 'night', sv: 'sova en natt', unit: 'timmar' },
  { id: 'schoolday', sv: 'vara i skolan en dag', unit: 'timmar' },
  { id: 'train', sv: 'åka tåg till Kiruna', unit: 'timmar' },
  { id: 'plane', sv: 'flyga till Thailand', unit: 'timmar' },
  { id: 'bus', sv: 'åka buss till fjällen', unit: 'timmar' },
  { id: 'beach', sv: 'vara på stranden en hel dag', unit: 'timmar' },
];
const UNITS = ['sekunder', 'minuter', 'timmar'];
/** Swedish number words for the hours on a clock (klockan nio, halv tio = 9:30) */
const SV_HOURS = { 1: 'ett', 2: 'två', 3: 'tre', 4: 'fyra', 5: 'fem', 6: 'sex', 7: 'sju', 8: 'åtta', 9: 'nio', 10: 'tio', 11: 'elva', 12: 'tolv' };

/* ================================================================ G1-672: the shelf */
/** things that stand on the shelf: the Swedish definite form (as the sentence names it) and the verb a Swede uses for it
 *  there (ligger: lies, står: stands, sitter: sits) */
const SHELF_THINGS = [
  { id: 'book', pic: ['classroom', 'book'], def: 'boken', verb: 'ligger' },
  { id: 'ball', pic: ['toys', 'ball'], def: 'bollen', verb: 'ligger' },
  { id: 'car', pic: ['toys', 'car'], def: 'bilen', verb: 'står' },
  { id: 'robot', pic: ['toys', 'robot'], def: 'roboten', verb: 'står' },
  { id: 'train', pic: ['toys', 'train'], def: 'tåget', verb: 'står' },
  { id: 'dice', pic: ['toys', 'dice'], def: 'tärningen', verb: 'ligger' },
  { id: 'globe', pic: ['classroom', 'globe'], def: 'jordgloben', verb: 'står' },
  { id: 'teddy', pic: ['toys', 'teddy_bear'], def: 'nallen', verb: 'sitter' },
  { id: 'boat', pic: ['toys', 'boat'], def: 'båten', verb: 'står' },
  { id: 'rocket', pic: ['toys', 'rocket'], def: 'raketen', verb: 'står' },
  { id: 'dinosaur', pic: ['toys', 'dinosaur'], def: 'dinosaurien', verb: 'står' },
  { id: 'cup', pic: ['around the house', 'cup'], def: 'koppen', verb: 'står' },
];
/** the box (G1-672). BEHIND it: a figure with a head (its head and shoulders show over the box: read on the renders, a
 *  ball or a dice whose top half shows over the box reads as lying ON the box, so they never go behind). IN FRONT of it:
 *  the same three figures, as big as every other thing on the shelf, over the box's face (review round 1). The same list for both roles: with a ball
 *  or a dice allowed only in front, "Bollen ligger ___ lådan" was always "framför" (the first word told the answer
 *  71.9 % of the time at level 1, measured by the gate); now the thing never tells which side of the box it is on. */
const BOX_BEHIND = ['teddy', 'dinosaur', 'robot'];
const BOX_FRONT = ['teddy', 'dinosaur', 'robot'];
/** things the child draws (never a thing printed on the shelf) */
const DRAW_THINGS = [
  { id: 'apple', sv: 'ett äpple' }, { id: 'star', sv: 'en stjärna' }, { id: 'heart', sv: 'ett hjärta' }, { id: 'flower', sv: 'en blomma' },
];
/** the position words (a word in the box is its whole phrase) */
const SV_REL = { left: 'till vänster om', right: 'till höger om', next: 'bredvid', between: 'mellan', above: 'ovanför', below: 'nedanför', front: 'framför', behind: 'bakom' };

/* ================================================================ the words each page prints */
const TEXT = {
  // G1-671 de
  markt: {
    payWith: 'Du bezahlst mit',
    change: 'Rückgeld:',
    euro: '€',
  },
  // G2-631 sv
  vaxel: {
    pays: 'Kunden betalar med',
    draw: 'Rita växeln:',
    drawFew: 'Rita växeln:',   // review round 1: the rule "så få … som möjligt" is in the level-3 instruction; the box keeps its room
    money: 'Mynt: 1 kr, 2 kr, 5 kr, 10 kr   Sedlar: 20 kr, 50 kr, 100 kr',   // review round 1 (levels 2 and 3), the teacher's wording
    back: 'Kunden får tillbaka',
    kr: 'kr',
    line: 'Räkna uppåt på tallinjen:',
  },
  // G2-632 sv
  kilo: {
    balanceHead: 'Balansvåg',
    scaleHead: 'Köksvåg',
    kg: 'kg',
    compareHead: 'Väger det mer eller mindre än 1 kg?',
    tiltHead: 'Jämför med 1 kg:',
    more: 'mer än 1 kg', less: 'mindre än 1 kg', about: 'ungefär 1 kg',
  },
  // G2-633 sv
  tid: {
    start: 'Start', end: 'Slut', hours: 'timmar', minutes: 'minuter',
    unitHead: 'Vilken enhet passar? Ringa in.',
    clockWord: 'Klockan:',
    halfHour: 'En halvtimme = 30 minuter.',   // review round 1 (level 1)
  },
  // G3-632 sv
  undersokning: {
    q: '1. Min fråga', alts: 'Svarsalternativ:',
    table: '2. Frekvenstabell', colAlt: 'Svars­alternativ', colTally: 'Streck', colCount: 'Antal',   // a soft hyphen: "Svars-alternativ" breaks at the joint in the narrow column
    chart: '3. Stapeldiagram', title: 'Rubrik:', yAxis: 'Lodrät axel:', xAxis: 'Vågrät axel:', step: 'Ett steg på axeln är 2.',
    moreSteps: 'Rita fler steg om det behövs.',   // review round 2 (the teacher's line): 12 steps of 5 mm reach 24
    concl: '4. Det här visar mitt diagram',
    starters: ['Flest valde', 'Färst valde', 'Skillnaden mellan flest och färst är'],
    total: 'Så många svarade:',
  },
  // G3-630 de
  halb: {
    labels: ['Hunderter dazu', 'Zehner dazu', 'Einer dazu'],   // review round 1: the steps ADD the second number's places
    explainHead: 'So habe ich die letzte Aufgabe gerechnet:',
    starters: ['Zuerst habe ich', 'Dann habe ich', 'Zum Schluss habe ich'],
    checkedBy: 'Nachgerechnet von:',
  },
  // G3-631 de
  ueber: {
    ruleHead: 'Überschlag:',
    // review round 1, the German teacher's wording (a child rounds the two numbers of the task, never the printed result)
    rule: 'Runde die beiden Zahlen der Aufgabe auf Hunderter und rechne damit. Vergleiche das Ergebnis der fertigen Rechnung (nicht runden!) mit deinem Überschlag: Ist es mehr als 100 entfernt, kann es nicht stimmen.',
    probeHead: 'Probe:',
    probe: 'Rechne die Umkehraufgabe: Ergebnis minus zweite Zahl (bei Minusaufgaben: Ergebnis plus zweite Zahl). Kommt die erste Zahl heraus, stimmt die Rechnung.',
    est: 'Überschlag:',
    after: 'Nach dem Überschlag:',
    can: 'kann stimmen', cannot: 'kann nicht stimmen',
    right: 'Richtig wäre:',
    probeTo: 'Probe zu',
  },
  // G1-672 sv
  lage: {
    draw: 'Rita',
    wordsHead: 'Lägesord:',
    left: 'vänster', right: 'höger',
    box: 'lådan',
  },
};

module.exports = { DE_GOODS, SV_GOODS, MASS_OBJECTS, LIGHT_THINGS, HEAVY_THINGS, PAN_HEAVY, ABOUT_ONE, UNIT_ACTIVITIES, UNITS, SV_HOURS, SHELF_THINGS, BOX_BEHIND, BOX_FRONT, DRAW_THINGS, SV_REL, TEXT };
