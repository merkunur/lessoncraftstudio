/**
 * data/e2sv/e2-math-sv.js — the bank of Batch SV (Daily Teaching System Stage E-2, 2026-11-26): Swedish mathematics,
 * förskoleklass to åk 3, the types K-727, G1-676, G1-677, G3-647, G3-648, G3-649, G3-651, G3-652 (factory
 * types/_shared/e2-math-sv.js, drawings e2-math-sv-art.js, gate qa/verify-e2-sv.js). G2-637 and G3-650 are sets of the
 * DE-A measuring-table mode: their bank lives in data/e2/e2-math.js (UNITS, THINGS, SETS, TEXT.mess.sv).
 * GIT-IGNORED folder: commit with `git add -f`.
 *
 * Every word a page prints is here, in Swedish as a lågstadielärare writes it on a worksheet (the plain imperative; the
 * Lgr22 words: kärl, rymmer, enhet, mätetal, tallinje, skillnad, överslag, rimligt, talsorter, mellanled, proportionellt).
 * Library pictures (theme, noun) were each opened on a contact sheet (lcs-stage-d/batch-sv/work/pics).
 */
'use strict';

/* ================================================================ K-727 Vad rymmer mest? */
/**
 * Containers a förskoleklass child knows, with what each typically holds (litres; general reference values, see the
 * result file). The page compares only containers whose capacities differ by at least 4 times, so a teacher accepts the
 * order at a glance; two of one size class are never compared.
 *   kopp (a coffee or tea cup) 0,2 l · glas (a drinking glass) 0,25 l · mugg 0,3 l · tekanna 1 l · kanna (a jug) 1,5 l ·
 *   vattenkanna (a garden watering can) 8 l · hink 2 l · badkar 180 l · pool (a garden swimming pool) 20 000 l
 * (no flaska: a bottle of 0,33-0,5 l is too close to a mug; no gryta or kastrull: 2-5 l sits between a jug and a bucket)
 * seen = what a child could take the PICTURE to hold, least and most (litres). Review round 1: the bucket picture is a
 * yellow plastic sandhink (1-2 l), not a 10-litre städhink, and the library has no städhink; so the hink holds 2 l and a
 * child may read it as anything from 1 to 10 l. Two containers are compared (in a pair or side by side in the row) only
 * when the larger one's least is at least twice the smaller one's most: the hink then meets only kopp, glas, mugg,
 * badkar and pool, never tekanna, kanna or vattenkanna. prop = a small picture drawn on the pool's water (a beach ball),
 * so its size shows (review round 1: the pool alone printed as a small flat tray).
 */
const CONTAINERS = [
  { id: 'kopp', sv: 'kopp', pic: ['around the house', 'cup'], litres: 0.2, seen: [0.15, 0.3] },
  { id: 'glas', sv: 'glas', pic: ['kitchen tools', 'glass'], litres: 0.25, seen: [0.2, 0.35] },
  { id: 'mugg', sv: 'mugg', pic: ['kitchen tools', 'mug'], litres: 0.3, seen: [0.25, 0.4] },
  { id: 'tekanna', sv: 'tekanna', pic: ['kitchen tools', 'teapot'], litres: 1, seen: [0.8, 1.5] },
  { id: 'kanna', sv: 'kanna', pic: ['kitchen tools', 'jug'], litres: 1.5, seen: [1, 2] },
  { id: 'vattenkanna', sv: 'vattenkanna', pic: ['around the house', 'watering_can'], litres: 8, seen: [5, 10] },
  { id: 'hink', sv: 'hink', pic: ['summer', 'bucket'], litres: 2, seen: [1, 10] },
  { id: 'badkar', sv: 'badkar', pic: ['around the house', 'bathtub'], litres: 180, seen: [100, 250] },
  { id: 'pool', sv: 'pool', pic: ['summer', 'pool'], litres: 20000, seen: [5000, 50000], prop: ['summer', 'beach_ball'] },
];
/** the class's jar and the mug it is filled with (the record at the bottom) */
const JAR = { sv: 'klassens burk', pic: ['kitchen tools', 'jar'] };
const MUG = { sv: 'mugg', pic: ['kitchen tools', 'mug'] };

/* ================================================================ G1-676 Olika enheter ger olika tal */
/**
 * The units (drawn): px = the length of one unit on the page. A page uses one size per unit. Level 1: klossar of 84 px
 * and gem of 42 px (a kloss is two gem; only these two units); levels 2-3: klossar of 42 px, gem of 28 px and pinnar (glasspinnar) of 84 px, so a kloss is one and a
 * half gem and the counts never simply double.
 */
const UNITS_SV = {
  kloss: { one: 'kloss', many: 'klossar' },
  gem: { one: 'gem', many: 'gem' },
  pinne: { one: 'glasspinne', many: 'glasspinnar' },   // review round 1: Swedish classrooms measure with glasspinnar
};
/** the things measured (drawn, lying flat): the length range (px) each may take on the page */
const MEASURE_THINGS = [
  { id: 'penna', sv: 'pennan', draw: 'pencil', min: 168, max: 504 },
  { id: 'pensel', sv: 'penseln', draw: 'brush', min: 168, max: 504 },
  { id: 'krita', sv: 'kritan', draw: 'crayon', min: 168, max: 336 },
  { id: 'bok', sv: 'boken', draw: 'book', min: 168, max: 252 },   // review round 1: drawn from above, so it stays book-shaped (at most 252 px)
  { id: 'sked', sv: 'skeden', draw: 'spoon', min: 168, max: 420 },
  { id: 'tandborste', sv: 'tandborsten', draw: 'toothbrush', min: 168, max: 420 },
];

/* ================================================================ G3-647 Talsymboler förr och nu */
/** the Egyptian number signs (hieroglyfer) and their values; the Roman numerals a page uses (up to 30) */
const EGYPT = [
  { v: 1000, sv: 'en lotusblomma', draw: 'lotus' },
  { v: 100, sv: 'ett rep (en repring)', draw: 'coil' },
  { v: 10, sv: 'en båge', draw: 'heel' },
  { v: 1, sv: 'ett streck', draw: 'stroke' },
];
const ROMAN = [['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]];
/** the sources a teacher can check (printed nowhere; in the result file) */
const NUMERAL_SOURCES = [
  'Egyptian hieroglyphic numerals: 1 a stroke, 10 a hobble for cattle (drawn as an arch), 100 a coil of rope, 1 000 a lotus plant; an additive system with no zero, each sign repeated up to nine times — MacTutor History of Mathematics, "Egyptian numerals" (University of St Andrews); Encyclopaedia Britannica, "numerals and numeral systems".',
  'Roman numerals: I = 1, V = 5, X = 10; a smaller numeral before a larger one is taken away (IV = 4, IX = 9), the modern standard form — Encyclopaedia Britannica, "Roman numeral"; Nationalencyklopedin, "romerska siffror".',
];

/* ================================================================ G3-648 Är svaret rimligt? */
/**
 * Everyday questions with three answers: ONE reasonable (typical values a teacher can confirm), two that are at least ten
 * times off. The three answers are printed smallest first; right = the place of the reasonable one (0, 1, 2), spread so the
 * middle answer is not the right one by habit. Every item has either ONE unit for its three answers (3 kg, 30 kg,
 * 300 kg) or ONE number (18 cm, 18 m, 18 km), so no answer stands out by its look (an odd unit or an odd number).
 */
const EVERYDAY = [
  { id: 'skolvaska', q: 'Hur mycket väger en skolväska med böcker?', opts: ['3 kg', '30 kg', '300 kg'], right: 0 },
  { id: 'buss', q: 'Hur lång är en buss?', opts: ['12 cm', '12 dm', '12 m'], right: 2 },
  { id: 'penna', q: 'Hur lång är en ny blyertspenna?', opts: ['18 cm', '18 m', '18 km'], right: 0 },
  { id: 'apple', q: 'Hur mycket väger ett äpple?', opts: ['150 g', '150 hg', '150 kg'], right: 0 },
  { id: 'somn', q: 'Hur länge sover ett barn på natten?', opts: ['10 sekunder', '10 minuter', '10 timmar'], right: 2 },
  { id: 'badkar', q: 'Hur mycket vatten rymmer ett badkar?', opts: ['15 liter', '150 liter', '1 500 liter'], right: 1 },
  { id: 'dorr', q: 'Hur hög är en dörr?', opts: ['2 cm', '2 dm', '2 m'], right: 2 },
  { id: 'tander', q: 'Hur lång tid tar det att borsta tänderna?', opts: ['2 minuter', '2 timmar', '2 dagar'], right: 0 },
  { id: 'vuxen', q: 'Hur mycket väger en vuxen människa?', opts: ['7 kg', '70 kg', '700 kg'], right: 1 },
  { id: 'mjolk', q: 'Hur mycket mjölk finns det i ett vanligt mjölkpaket?', opts: ['1 liter', '10 liter', '100 liter'], right: 0 },
  { id: 'fotboll', q: 'Hur lång är en fotbollsplan?', opts: ['100 cm', '100 m', '100 km'], right: 1 },
  { id: 'lektion', q: 'Hur länge varar en lektion?', opts: ['45 sekunder', '45 minuter', '45 timmar'], right: 1 },
  { id: 'promenad', q: 'Hur lång tid tar det att gå 1 km?', opts: ['15 sekunder', '15 minuter', '15 timmar'], right: 1 },
  { id: 'klassrum', q: 'Hur långt är ett klassrum?', opts: ['8 cm', '8 dm', '8 m'], right: 2 },
  { id: 'cykel', q: 'Hur mycket väger en cykel för vuxna?', opts: ['15 kg', '150 kg', '1 500 kg'], right: 0 },
  { id: 'bok', q: 'Hur mycket väger en kapitelbok?', opts: ['3 g', '30 g', '300 g'], right: 2 },
  { id: 'hus', q: 'Hur högt är ett hus med två våningar?', opts: ['7 m', '70 m', '700 m'], right: 0 },
  { id: 'sommarlov', q: 'Hur länge varar sommarlovet?', opts: ['10 timmar', '10 veckor', '10 år'], right: 1 },
];

/* ================================================================ G3-651 Proportionella samband */
/** price tables: one piece costs the same; sg / pl as printed ("1 glass", "3 glassar") */
const PRICE_ITEMS = [
  { id: 'glass', sg: 'glass', pl: 'glassar', unit: [12, 15, 18, 20] },
  { id: 'bulle', sg: 'bulle', pl: 'bullar', unit: [8, 10, 12, 15] },
  { id: 'penna', sg: 'penna', pl: 'pennor', unit: [5, 6, 8, 10] },
  { id: 'apple', sg: 'äpple', pl: 'äpplen', unit: [4, 5, 6] },
  { id: 'sudd', sg: 'sudd', pl: 'suddar', unit: [4, 5, 6, 8] },
  { id: 'vassare', sg: 'pennvässare', pl: 'pennvässare', unit: [15, 20, 25] },   // review round 1: a comic costs 50-70 kr; a pencil sharpener 15-25 kr
];
/**
 * recipes for 4 personer with amounts a child can halve, double and treble (whole numbers): the ingredient, its amount
 * for 4, and its unit word (empty = a count)
 */
const RECIPES = [
  { id: 'pannkakor', sv: 'Pannkakor', rows: [['vetemjöl', 2, 'dl'], ['mjölk', 6, 'dl'], ['ägg', 4, '']] },   // the usual Swedish batter for 4 is about 2,5 dl, 6 dl, 3 ägg: rounded to amounts that halve
  { id: 'fruktsallad', sv: 'Fruktsallad', rows: [['äpplen', 2, ''], ['bananer', 4, ''], ['apelsiner', 2, ''], ['vindruvor', 20, '']] },
  { id: 'smoothie', sv: 'Smoothie', rows: [['bananer', 2, ''], ['yoghurt', 6, 'dl'], ['blåbär', 2, 'dl']] },
  { id: 'gryn', sv: 'Havregrynsgröt', rows: [['havregryn', 4, 'dl'], ['vatten', 8, 'dl'], ['russin', 2, 'msk']] },
];

/* ================================================================ G3-652 Mäta i halva centimeter */
/** the pencils' colours (body, its darker edge); lengths are drawn true (whole and half centimetres) */
const PENCIL_COLOURS = [['#3E7CC9', '#24548F'], ['#D9534F', '#9E2F2C'], ['#4FA36B', '#2F6E44'], ['#8A63C7', '#5B3D8F'], ['#E3922B', '#A86414'], ['#2AA3A3', '#1A6E6E']];

/* ================================================================ every printed string */
const TEXT = {
  rymmer: {
    pairsHead: 'Ringa in det som rymmer mest.',
    pairsHeadLeast: 'Ringa in det som rymmer minst.',
    orderHead3: 'Skriv 1, 2 och 3. Skriv 1 under det som rymmer minst.',
    orderHead4: 'Skriv 1, 2, 3 och 4. Skriv 1 under det som rymmer minst.',
    jarHead: 'Så många muggar gick det åt för att fylla klassens burk.',
    jarDraw: 'Rita muggarna här.',
    jarWrite: 'muggar',
  },
  enheter: {
    most: 'Det gick åt flest:',
    why: 'Ju kortare enheten är, desto',
    whyEnd: 'går det åt.',
    whyChoices: ['fler', 'färre'],
  },
  skillnad: {
    jump: 'Hoppet är',
    steps: 'steg.',
  },
  symboler: {
    keyHead: 'Nyckel',
    egypt: 'Egyptiska tecken',
    roman: 'Romerska siffror',
    head1: 'Skriv de egyptiska talen med våra siffror.',
    head2: 'Skriv de romerska talen med våra siffror.',
    head3: 'Skriv talet med egyptiska tecken.',
    head3pl: 'Skriv talen med egyptiska tecken.',
    head4: 'Skriv talen med romerska siffror.',
    head5: 'Varför behövde egyptierna ingen nolla?',
    because: 'Egyptierna behövde ingen nolla eftersom',
    sub: 'I före V eller X: ta bort 1.',
    subEx: 'IV = 4   IX = 9',
  },
  rimligt: {
    ruleHead: 'Så gör du ett överslag:',
    rule1: 'Avrunda båda talen till närmaste hundratal och räkna.',
    rule2: 'Skiljer svaret mer än 100 från överslaget, är svaret orimligt.',   // review round 1: true for every sum and difference (each rounding moves a number at most 50)
    over: 'Överslag:',
    by: 'Enligt överslaget är svaret',
    choices: ['rimligt', 'orimligt'],
    right: 'Rätt svar:',
    head2: 'Vilket svar är rimligt? Ringa in.',
  },
  mellanled: {
    rows: ['hundratal', 'tiotal', 'ental'],
    answer: 'svar',
  },
  proportion: {
    priceHead: 'Alla {pl} kostar lika mycket.',
    count: 'Antal',
    price: 'Pris (kr)',
    recipeHead: '{name} för 4 personer. Räkna om receptet.',
    persons: '{n} personer',
    sentence1: 'Köper man dubbelt så många {pl}, kostar det',
    sentence2: 'Köper man hälften så många {pl}, kostar det',
    choices: ['dubbelt så mycket', 'lika mycket', 'hälften så mycket'],
    writeHead: 'Skriv med ord: vad händer med priset när man köper tre gånger så många?',
  },
  halvcm: {
    measureHead: 'Mät pennorna. Skriv längden.',
    plotTitle: 'Hur långa är pennorna?',
    axis: 'Längd i cm',
    plotHead: 'Rita ett kryss för varje penna.',
    pencil: 'Penna',
    q1: 'Vilken längd har flest pennor?',
    q2: 'Hur många pennor är längre än {x} cm?',
    q3: 'Hur många pennor är kortare än {x} cm?',
    printNote: 'Utskrift: verklig storlek (100 %)',
  },
};

module.exports = { CONTAINERS, JAR, MUG, UNITS_SV, MEASURE_THINGS, EGYPT, ROMAN, NUMERAL_SOURCES, EVERYDAY, PRICE_ITEMS, RECIPES, PENCIL_COLOURS, TEXT };
