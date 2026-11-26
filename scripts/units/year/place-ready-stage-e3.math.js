#!/usr/bin/env node
/**
 * Daily Teaching System, Stage E-3 (2026-11-26): the 46 German and Swedish mathematics lessons of the year designs that
 * waited for a page (Stage E-1 changed generators, E-2 built 30 new types) or for the ruling that a live unit's
 * description may change its count (operator 2026-11-25: a lesson goes into the unit the year design gives it, and that
 * unit's description gets the new lesson count and weeks, nothing else).
 *
 * Where a lesson goes (decided 2026-11-26, recorded in PLAN.md):
 *   - into the live unit of its design;
 *   - a design unit that is not live becomes a NEW unit only when it has at least four lessons without taking a lesson
 *     out of a live, indexed unit: de Klasse 3 "Halbschriftlich addieren und subtrahieren bis 1000" and "Längen und
 *     Geld", sv åk 3 "Samband, slump och statistik";
 *   - otherwise its new lessons join the live unit that holds their design neighbours (de "Ausblick bis 100": bundling
 *     and skip counting close "Zahlen bis 20", shopping follows the coins of "Uhr, Kalender und Geld"; de "Gleichungen,
 *     Zahlenfolgen und Tabellen": the two price-table lessons join the new "Längen und Geld" beside the other money
 *     lessons; first placed in "Malnehmen und Teilen", which holds its other four, they made that unit twelve lessons,
 *     and its guide's cover ran 34 px past its foot; sv "Mäta och jämföra", "Pengar och räknehändelser 0–100" and
 *     "Klockan och almanackan åk 2" likewise).
 * A lesson moved after the German review: "Überschlag und Probe" is the LAST lesson of "Runden und schriftlich
 * rechnen" (its page shows finished written calculations, taught in the two lessons before it).
 * Every lesson has two real assets (units/gates.js P3): a page and the classroom tool that models its point, or, where no
 * tool models it, the hands-on routine of its teacher note (routine: true below; notes/de-math-e3.js, sv-math-e3.js).
 * The fourteen new teaching points come first: scripts/units/year/add-points-e3.math.js.
 *
 *   node scripts/units/year/place-ready-stage-e3.math.js            (refuses to run twice)
 *   node scripts/units/year/place-ready-stage-e3.math.js --list     (the lessons as JSON, for the note writers)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const writeJsonLike = (f, raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file(f), out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
};

// L(key, types, tool, opts): key = point or point#id; tool = a key of tools.json or null (then routine: true)
const L = (key, types, tool, o = {}) => ({ key, types, tool, ...o });
// unit → [after, lesson] in order; after = the key the lesson follows, null = first, 'END' = last
const PLACE = {
  de: {
    'g1-add-subtract-within-10': [['1:subtract-cross-out', L('1:add-within-10-models#rechnen-mit-der-null', ['G1-673'], null, { routine: true, design: 'Rechnen mit der Null' })]],
    'de1-zehneruebergang': [['1:fluency-within-20#minus-ueber-die-10', L('1:fluency-within-20#rechenwege-vergleichen-7-plus-8', ['G1-674'], 'rekenrek', { design: 'Rechenwege vergleichen: Wie rechnest du 7 + 8?' })]],
    'g1-shapes-measuring-graphs': [['1:map-key', L('1:measure-length-units#handspanne-fuss-schritt', ['G1-675'], 'unit-handle', { design: 'Mit Handspanne, Fuß und Schritt messen' })]],
    'de1-zahlen-bis-20': [
      ['END', L('2:bundle-ten-ones#zehnerzahlen-bis-100', ['G1-560'], 'counting-cups', { design: 'In Zehnern bündeln: die Zehnerzahlen bis 100' })],
      ['2:bundle-ten-ones#zehnerzahlen-bis-100', L('1:skip-counting', ['G1-125', 'G1-124', 'G1-123'], 'choral-counting', { design: 'In Schritten zählen: Zweier, Fünfer, Zehner' })],
    ],
    'g1-time-calendar-coins': [['END', L('2:shopping-money#einkaufen-bis-20-euro', ['G1-671'], 'money-mat', { design: 'Einkaufen bis 20 Euro: bezahlen und Rückgeld' })]],
    'de2-plus-minus-bis-100': [['1:mental-math-to-100#einer-dazu-und-weg', L('1:mental-math-to-100#zum-zehner-ergaenzen', ['G2-634'], 'open-number-line', { design: 'Zum Zehner ergänzen, vom Zehner abziehen' })]],
    'de2-plus-minus-zweistellig': [['1:open-number-line#zweistellig-subtrahieren', L('2:explain-strategies', ['G2-635'], 'open-number-line', { design: 'Rechenwege vergleichen: schrittweise oder mit Hilfsaufgabe?' })]],
    'de2-groessen-daten': [['2:compare-lengths', L('2:estimate-lengths', ['G2-636'], 'ruler', { design: 'Meter und Zentimeter: erst schätzen, dann messen' })]],
    'de3-zahlen-bis-1000': [['2:compare-order-3-digit', L('2:number-line-not-from-zero#zahlenstrahl-bis-1000', ['G2-395'], 'landing-strip', { core: { 'G2-395': 3 }, design: 'Der Zahlenstrahl bis 1000: Nachbarzehner und Nachbarhunderter' })]],
    'de3-mal-geteilt-gleichungen': [
      ['3:muldiv-word-problems', L('3:multiply-multiples-of-10', ['G3-635'], 'place-value-lab', { design: 'Einmaleins mit Zehnerzahlen: 3 · 40 und 240 : 6' })],
      ['3:multiply-multiples-of-10', L('3:multiply-in-steps', ['G3-636'], 'baking-tray', { design: 'Halbschriftlich multiplizieren: 4 · 37' })],
      ['3:multiply-in-steps', L('3:divide-in-steps', ['G3-637'], null, { routine: true, design: 'Halbschriftlich dividieren: 84 : 4' })],
    ],
    'de3-runden-schriftlich': [['END', L('3:estimate-by-rounding#ueberschlag-und-probe', ['G3-631'], null, { routine: true, design: 'Überschlag und Probe: Kann das stimmen?' })]],   // the last lesson: its page shows finished WRITTEN calculations, taught in the two lessons before it (German reviewer, 2026-11-26)
    'g3-shapes-and-data': [
      ['3:symmetry', L('3:circles-with-compass', ['G3-644'], null, { routine: true, design: 'Mit dem Zirkel zeichnen: Kreise und Kreismuster' })],
      ['3:line-plot-halves', L('3:scaled-graphs#diagramme-genau-lesen', ['G3-645'], null, { routine: true, design: 'Diagramme genau lesen: Was stimmt, was nicht?' })],
      ['3:scaled-graphs#diagramme-genau-lesen', L('3:count-all-possibilities', ['G3-646'], null, { routine: true, design: 'Alle Möglichkeiten finden: Tabelle und Baumdiagramm' })],
    ],
  },
  sv: {
    'sv-f-ma-lage-storlek-monster': [
      ['K:order-by-size', L('1:measure-length-units#mata-langd-med-klossar', ['G1-139'], 'unit-handle', { design: 'Mäta längd med klossar och steg' })],
      ['K:heavy-light', L('K:compare-capacity', ['K-727'], 'measurement-bench', { design: 'Vad rymmer mest?' })],
    ],
    'sv-f-ma-former': [['END', L('K:draw-shapes', ['K-372'], null, { routine: true, design: 'Bygga och rita former på prickpapper' })]],   // the LAST lesson, not the third of the design: the unit's live check names lessons 1-4 by number and cannot be built again today (its lesson 1 pool changed with the picture fixes of 2026-11-25), so no number may move
    'sv-1-ma-former-monster-langd': [
      [null, L('K:place-words', ['G1-672'], null, { routine: true, design: 'Lägesord: framför, bakom, mellan och bredvid' })],
      ['1:measure-length-units', L('1:units-give-different-numbers', ['G1-676'], 'unit-handle', { design: 'Olika enheter ger olika tal' })],
    ],
    'sv-1-ma-add-sub-0-20': [['1:fluency-within-20#tiotalsovergang-subtraktion', L('1:count-on-back-hops#subtraktion-som-skillnad', ['G1-677'], 'number-line', { design: 'Subtraktion som skillnad: räkna upp' })]],
    'sv-2-ma-add-sub-0-100': [['2:shopping-money', L('2:shopping-money#betala-med-sedlar', ['G2-631'], 'money-mat', { design: 'Betala med sedlar och få växel tillbaka' })]],
    'sv-2-ma-langd-tid': [
      ['2:compare-lengths', L('2:estimate-lengths', ['G2-637'], 'ruler', { design: 'Meter och centimeter' })],
      ['2:estimate-lengths', L('2:mass-grams#kilogram', ['G2-632'], 'measurement-bench', { design: 'Kilogram: väga och jämföra' })],
      ['2:time-5-min-quarter', L('1:time-read#fem-i-halv', ['G1-477'], 'learning-clock', { core: { 'G1-477': 3 }, prefer: ['klockan-svar-g1477-12', 'klockan-svar-g1477-15', 'klockan-svar-g1477-14'], design: 'Fem i halv och fem över halv' })],
      ['1:time-read#fem-i-halv', L('3:elapsed-duration', ['G2-633'], null, { routine: true, design: 'Hur lång tid tar det?' })],
    ],
    'sv-3-ma-tal-0-1000': [['2:hundred-more-less', L('3:historical-numerals', ['G3-647'], null, { routine: true, design: 'Talsymboler förr och nu' })]],
    'sv-3-ma-avrundning-uppstallning': [
      ['3:estimate-by-rounding', L('3:estimate-by-rounding#ar-svaret-rimligt', ['G3-648'], null, { routine: true, design: 'Är svaret rimligt?' })],
      ['3:estimate-by-rounding#ar-svaret-rimligt', L('3:add-sub-by-place-value', ['G3-649'], 'place-value-lab', { design: 'Skriftlig huvudräkning med mellanled' })],
    ],
    'sv-3-ma-matning': [['3:thermometer', L('3:old-body-measures', ['G3-650'], 'unit-handle', { design: 'Äldre mått: tum, fot, aln och famn' })]],
  },
};
// the three new units: their lessons in order, after which unit of the plan they stand
const NEW_UNITS = {
  de: [
    { after: 'de3-zahlen-bis-1000', unit: { id: 'de3-halbschriftlich-plus-minus', slug: 'halbschriftlich-addieren-und-subtrahieren-bis-1000-klasse-3', status: 'live', grade: '3', subject: 'math',
      title: 'Halbschriftlich addieren und subtrahieren bis 1000', metaTitle: 'Mathe Klasse 3: Halbschriftlich addieren und subtrahieren bis 1000',
      metaDescription: 'Zwei Wochen Mathe Klasse 3: 4 Stunden zum Rechnen mit Hunderter- und Zehnerzahlen, zum halbschriftlichen Addieren und Subtrahieren bis 1000 und zu Zauberquadraten.', weeks: 2 },
      lessons: [
        L('3:mental-math-hundreds-tens', ['G3-633'], 'place-value-lab', { design: 'Rechnen mit Hunderter- und Zehnerzahlen' }),
        L('1:open-number-line#halbschriftlich-addieren', ['G3-630'], 'open-number-line', { design: 'Halbschriftlich addieren: den Rechenweg aufschreiben und erklären' }),
        L('1:open-number-line#halbschriftlich-subtrahieren', ['G3-634'], 'open-number-line', { design: 'Halbschriftlich subtrahieren: abziehen oder ergänzen?' }),
        L('3:magic-squares', ['G3-349'], null, { core: { 'G3-349': 2 }, routine: true, design: 'Zauberquadrate' }),
      ] },
    { after: 'de3-mal-geteilt-gleichungen', unit: { id: 'de3-laengen-und-geld', slug: 'laengen-und-geld-millimeter-kilometer-kommaschreibweise-klasse-3', status: 'live', grade: '3', subject: 'math',
      title: 'Längen und Geld: Millimeter, Kilometer und Kommaschreibweise', metaTitle: 'Mathe Klasse 3: Längen und Geld | Unterrichtseinheit',
      metaDescription: 'Drei Wochen Mathe Klasse 3: 6 Stunden zu Millimetern und Kilometern, zur Kommaschreibweise bei Euro und Cent, zum Überschlagen beim Einkaufen und zu Preistabellen.', weeks: 2 },
      lessons: [
        L('2:measure-with-ruler#millimeter', ['G3-638'], 'ruler', { design: 'Millimeter: genau messen und zeichnen' }),
        L('3:kilometres-and-metres', ['G3-639'], null, { routine: true, design: 'Meter und Kilometer: Wie weit ist ein Kilometer?' }),
        L('3:comma-notation-money-length', ['G3-640'], 'money-mat', { design: 'Mit Komma schreiben: Euro und Cent, Meter und Zentimeter' }),
        L('3:estimate-by-rounding#ueberschlagen-beim-einkaufen', ['G3-641'], null, { routine: true, design: 'Überschlagen beim Einkaufen: Reicht das Geld?' }),
        L('3:muldiv-word-problems#preistabellen', ['G3-642'], null, { routine: true, design: 'Preistabellen: je mehr, desto teurer' }),
        L('3:muldiv-word-problems#sachaufgaben-mit-tabellen', ['G3-643'], null, { routine: true, design: 'Sachaufgaben mit Tabellen lösen' }),
      ] },
  ],
  sv: [
    { after: 'END', unit: { id: 'sv-3-ma-samband-slump-statistik', slug: 'samband-slump-och-statistik-ak-3', status: 'live', grade: '3', subject: 'math',
      title: 'Samband, slump och statistik', metaTitle: 'Matematik åk 3: Samband, slump och statistik | Lektionsplanering',
      metaDescription: 'Lektionsplanering i matematik för åk 3, arbetsområdet ”Samband, slump och statistik”: 4 lektioner med lärarkommentar och arbetsblad till varje lektion.', weeks: 2 },
      lessons: [
        L('3:proportional-tables', ['G3-651'], null, { routine: true, design: 'Proportionella samband: dubbelt så många, dubbelt så mycket' }),
        L('3:chance-more-likely', ['G3-484'], 'draw-bag', { design: 'Slumpförsök: lika stor chans?' }),   // the die sheet (G2-508) is a page of the Grade 2 point: a lesson hands out pages of its own point; the experiment runs on the Slumppåse
        L('3:scaled-graphs#egen-undersokning', ['G3-632'], null, { routine: true, design: 'Egen undersökning: från fråga till diagram' }),
        L('3:line-plot-halves', ['G3-652'], 'ruler', { design: 'Mäta i halva centimeter och visa i diagram' }),
      ] },
  ],
};
const COUNT_RE = { de: /(\b)\d+( Stunden\b)/, sv: /(\b)\d+( lektioner\b)/ };

const toLesson = (x) => {
  const [point] = x.key.split('#');
  const l = { point };
  if (x.key !== point) l.id = x.key;
  l.types = x.types;
  if (x.core) l.core = x.core;
  if (x.prefer) l.prefer = x.prefer;   // the copies the lesson hands out first: only some copies of G1-477 level 3 show fem i halv and fem över halv (copy 12 shows both, 15 and 14 fem i halv; read from the live PDFs 2026-11-26)
  l.tool = x.tool; l.activity = null;
  return l;
};

if (process.argv.includes('--list')) {
  const out = [];
  for (const loc of ['de', 'sv']) {
    for (const [uid, list] of Object.entries(PLACE[loc])) for (const [, x] of list) out.push({ loc, unit: uid, ...x });
    for (const n of NEW_UNITS[loc]) for (const x of n.lessons) out.push({ loc, unit: n.unit.id, newUnit: true, ...x });
  }
  console.log(JSON.stringify(out, null, 1));
  process.exit(0);
}

// the design rows this places: marked placed (key) in design.<loc>.math.json
const designMarks = { de: new Map(), sv: new Map() };
for (const loc of ['de', 'sv']) {
  for (const list of Object.values(PLACE[loc])) for (const [, x] of list) designMarks[loc].set(x.design, x.key);
  for (const n of NEW_UNITS[loc]) for (const x of n.lessons) designMarks[loc].set(x.design, x.key);
}

const out = [];
for (const loc of ['de', 'sv']) {
  const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); const defs = JSON.parse(raw);
  const keyOf = (l) => l.id || l.point;
  const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
  const fresh = (l) => { if (all.has(keyOf(l))) throw new Error(loc + ': ' + keyOf(l) + ' is placed already: this script ran before'); all.add(keyOf(l)); return l; };
  const points = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
  for (const [uid, list] of Object.entries(PLACE[loc])) {
    const u = defs.units.find((x) => x.id === uid); if (!u) throw new Error(loc + ': no unit ' + uid);
    for (const [after, x] of list) {
      const l = fresh(toLesson(x));
      if (!points.has(l.point)) throw new Error(loc + ': ' + l.point + ' is no teaching point (run add-points-e3.math.js first)');
      const i = after === null ? 0 : after === 'END' ? u.lessons.length : u.lessons.findIndex((y) => keyOf(y) === after) + 1;
      if (after !== null && after !== 'END' && i === 0) throw new Error(uid + ' has no lesson ' + after);
      u.lessons.splice(i, 0, l);
    }
    const t = u.metaDescription.replace(COUNT_RE[loc], '$1' + u.lessons.length + '$2');
    if (t === u.metaDescription || !t.includes(' ' + u.lessons.length + ' ')) throw new Error(uid + ': the count of "' + u.metaDescription + '" did not change');
    if (t.length < 110 || t.length > 170) throw new Error(uid + ': a description of ' + t.length + ' characters: ' + t);
    u.metaDescription = t;
  }
  for (const n of NEW_UNITS[loc]) {
    if (defs.units.some((x) => x.id === n.unit.id)) throw new Error(n.unit.id + ' exists: this script ran before');
    const u = { ...n.unit, lessons: n.lessons.map((x) => fresh(toLesson(x))) };
    for (const l of u.lessons) if (!points.has(l.point)) throw new Error(loc + ': ' + l.point + ' is no teaching point (run add-points-e3.math.js first)');
    if (!u.metaDescription.includes(' ' + u.lessons.length + ' ') || u.metaDescription.length < 110 || u.metaDescription.length > 170 || u.metaTitle.length > 70) throw new Error(u.id + ': its description or meta title');
    const plan = defs.plans.find((p) => p.subject === 'math' && p.grade === u.grade); if (!plan) throw new Error('no math plan of grade ' + u.grade);
    const at = n.after === 'END' ? plan.units.length : plan.units.indexOf(n.after) + 1;
    if (n.after !== 'END' && at === 0) throw new Error(plan.id + ' has no unit ' + n.after);
    plan.units.splice(at, 0, u.id);
    const ui = n.after === 'END' ? defs.units.findIndex((x) => x.id === plan.units[at - 1]) + 1 : defs.units.findIndex((x) => x.id === n.after) + 1;
    defs.units.splice(ui, 0, u);
  }
  out.push([f, raw, defs]);
  // the design rows
  const df = 'scripts/units/year/design.' + loc + '.math.json'; const draw = read(df); const d = JSON.parse(draw);
  let marked = 0;
  for (const g of Object.keys(d).filter((k) => k !== 'pacing')) for (const u of d[g].units) for (const l of u.lessons) {
    if (l.new && !l.placed && designMarks[loc].has(l.title)) { l.placed = designMarks[loc].get(l.title); marked++; }
  }
  if (marked !== designMarks[loc].size) throw new Error(loc + ': marked ' + marked + ' design rows of ' + designMarks[loc].size);
  out.push([df, draw, d]);
}
for (const [f, raw, obj] of out) writeJsonLike(f, raw, obj);
for (const loc of ['de', 'sv']) { const d = JSON.parse(read('frontend/content/units/defs/' + loc + '.json')); console.log(loc + ': ' + d.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + d.units.length + ' units'); }
