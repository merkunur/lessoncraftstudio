#!/usr/bin/env node
/**
 * gen-nl-chartcount.js — the nl chart-count (Beelddiagram) landing generator.
 *
 * Dedicated generator (NOT gen-nl-readiness): chart-count carries a data-representation
 * mechanic + an honest-count Quiz, so it writes its own native Dutch prose + a per-deck
 * practiceProblems block instead of the readiness template.
 *
 * Honest-count binding: per-category count = facts.count (= the rendered bar height =
 * the manifest icon occurrences, the §22.1 render-time-quantity rule). Prose p2 counts
 * AND the practiceProblems answers BOTH draw from the SAME facts → agree-by-construction
 * with the chart. Operator gate: ZERO mismatches (asserted at the end; halts on any).
 *
 * The native Dutch PLURAL for the Quiz ("Hoeveel {meervoud}?") is resolved from
 * image-vocabulary.js nl [sing, plural, gender], cross-checked against the manifest's
 * own category name (facts.locName), with an OVERRIDE map for vocab gaps, mass→countable
 * surrogates (ijs→ijsjes), and icon-misdepictions — each line native-verified.
 *
 * Ledger (operator-ruled, plan commission-to-cc-tidy-candy.md):
 *   strand  = Meten en gegevens (SLO kerndoelen, the data-handling domain)
 *   standard= K.MD.B.3 (recognition) → CARRIES (educationalAlignment present)
 *   band    = groep 3 (formal data-reading), span kleuters→groep 3 (getalbereik 0–10)
 *
 * Reads:  scripts/seo-landing/_nl-cc-facts.json      (Stage-A dump, gen-cc-facts.js)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js  (nl [sing, plural, gender])
 *         frontend/config/topics-taxonomy.json        (axes.theme.<key>.name.nl)
 * Writes: filter OUT existing chart-count landings in nl.json, append the new set
 *         (idempotent), preserve the rest. rekey-nl-titles.js adds title+meta after.
 *
 * Usage: node scripts/seo-landing/gen-nl-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');

const DRY = process.argv.includes('--dry-run');
const NL = 'frontend/content/seo-landing/nl.json';

// Cull: the 7 semantically-non-countable themes the validity gate flags INVALID for
// chart-count (activities/body_parts/emotions/seasons/weather) + 4th_of_july (the
// standing nl-locale drop: a US holiday Dutch teachers don't search — every other nl
// type drops it via enum-nl-coords). thanksgivinng STAYS (countable; kept across all
// nl types). Result: 49 facts - 8 = 41 landings.
const CULL_THEMES = new Set([
  'activities', 'body_parts', 'emotions',
  'spring', 'summer', 'winter', 'weather',
  '4th_of_july',
]);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_nl-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// The manifest's category name (facts.locName) is the DEPICTED Dutch singular — the
// authoritative word (it disambiguates nounKey collisions like `violet` = the flower
// "Viooltje" in the flowers theme vs the colour "Violet" in the colours theme). So the
// SINGULAR is always locName; only the native PLURAL needs resolving.
//
// OVERRIDE_BY_NAME[locName] = [singular, plural, gender(d/h)] — native-verified plurals
// for every name where vocab can't supply a correct one. Classes:
//  (a) MASS→COUNTABLE — a discrete icon under a mass label (ham→hammen, snoep→snoepjes).
//  (b) ALREADY-PLURAL manifest name — give the true singular (Sperziebonen→Sperzieboon).
//  (c) PROPER NOUN — planets etc. have no plural; plural===singular, capitalised.
//  (d) VOCAB GAP / MISMATCH — tree species, postal nouns, the colour adjectives.
const OVERRIDE_BY_NAME = {
  // tree (so the bomen deck lands)
  'Mammoetboom': ['Mammoetboom', 'Mammoetbomen', 'd'],
  'Kastanjeboom': ['Kastanjeboom', 'Kastanjebomen', 'd'],
  'Sinaasappelboom': ['Sinaasappelboom', 'Sinaasappelbomen', 'd'],
  'Baobab': ['Baobab', 'Baobabs', 'd'],
  'Spar': ['Spar', 'Sparren', 'd'],
  'Ceder': ['Ceder', 'Ceders', 'd'],
  // christmas
  'Sneeuwbol': ['Sneeuwbol', 'Sneeuwbollen', 'd'],
  'Lichtjes': ['Lichtje', 'Lichtjes', 'h'],
  // fruits — mass label, countable icon
  'Drakenfruit': ['Drakenvrucht', 'Drakenvruchten', 'd'],
  // hospital
  'Ziekenhuisjas': ['Ziekenhuisjas', 'Ziekenhuisjassen', 'd'],
  'Mondkapje': ['Mondkapje', 'Mondkapjes', 'h'],
  // music
  'Muzieknoot': ['Muzieknoot', 'Muzieknoten', 'd'],
  // furniture
  'Vloerkleed': ['Vloerkleed', 'Vloerkleden', 'h'],
  'Schommelstoel': ['Schommelstoel', 'Schommelstoelen', 'd'],
  // flowers
  'Viooltje': ['Viooltje', 'Viooltjes', 'h'],
  // post office
  'Postauto': ['Postauto', "Postauto's", 'd'],
  'Postweegschaal': ['Postweegschaal', 'Postweegschalen', 'd'],
  'Postzegel': ['Postzegel', 'Postzegels', 'd'],
  // vegetables
  'Pompoen': ['Pompoen', 'Pompoenen', 'd'],
  'Sperziebonen': ['Sperzieboon', 'Sperziebonen', 'd'],
  // colours — substantivised -e form ("3 blauwe" = "3 blue ones"; honest count of swatches)
  'Blauw': ['Blauwe', 'Blauwe', 'd'],
  'Violet': ['Violette', 'Violette', 'd'],
  'Karmozijn': ['Karmozijnrode', 'Karmozijnrode', 'd'],
  'Geel': ['Gele', 'Gele', 'd'],
  'Roze': ['Roze', 'Roze', 'd'],
  // space — planets are proper nouns (no plural, capitalised); meteor is a common noun
  'Mercurius': ['Mercurius', 'Mercurius', 'd'],
  'Aarde': ['Aarde', 'Aarde', 'd'],
  'Jupiter': ['Jupiter', 'Jupiter', 'd'],
  'Uranus': ['Uranus', 'Uranus', 'd'],
  'Neptunus': ['Neptunus', 'Neptunus', 'd'],
  'Meteoor': ['Meteoor', 'Meteoren', 'd'],
  // supermarket / breakfast / camping / easter — mass labels, discrete icons
  'Ham': ['Ham', 'Hammen', 'd'],
  'Erwten': ['Erwt', 'Erwten', 'd'],
  'Melk': ['Pak melk', 'Pakken melk', 'h'],
  'Honing': ['Pot honing', 'Potten honing', 'd'],
  'Spek': ['Plak spek', 'Plakken spek', 'd'],
  'Ontbijtgranen': ['Kom ontbijtgranen', 'Kommen ontbijtgranen', 'd'],
  'Water': ['Fles water', 'Flessen water', 'd'],
  'Jam': ['Pot jam', 'Potten jam', 'd'],
  'Snoep': ['Snoepje', 'Snoepjes', 'h'],
  'Chocolade': ['Chocolaatje', 'Chocolaatjes', 'h'],
  'Kleurpotloden': ['Kleurpotlood', 'Kleurpotloden', 'h'],
  'Kaarten': ['Kaart', 'Kaarten', 'd'],
  // (e) WRONG vocab plurals corrected — vocab supplied an ungrammatical plural for these
  'Ambulance': ['Ambulance', 'Ambulances', 'd'],          // NOT ambulancen
  'Bij': ['Bij', 'Bijen', 'd'],                            // NOT bijjen
  'Chimpansee': ['Chimpansee', 'Chimpansees', 'd'],        // NOT chimpanseen
  'Macaron': ['Macaron', 'Macarons', 'd'],                 // NOT macaronnen
  'Orang-oetan': ['Orang-oetan', 'Orang-oetans', 'd'],     // NOT orang-oetannen
  'Rekenmachine': ['Rekenmachine', 'Rekenmachines', 'd'],  // NOT rekenmachinen
  'Tyrannosaurus Rex': ['Tyrannosaurus rex', 'Tyrannosaurus rex', 'd'], // invariant, NOT Rexxen
  'Verkeersregelaar': ['Verkeersregelaar', 'Verkeersregelaars', 'd'],   // NOT verkeersregelaren
  'Papegaai': ['Papegaai', 'Papegaaien', 'd'],             // NOT papegaai's
  'Grapefruit': ['Grapefruit', 'Grapefruits', 'd'],        // NOT grapefruiten
  'Blauwe gaai': ['Blauwe gaai', 'Blauwe gaaien', 'd'],    // NOT blauwe gaai's
  'Kameleon': ['Kameleon', 'Kameleons', 'd'],              // NOT kameleonen
};

// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set(['Mercurius', 'Aarde', 'Jupiter', 'Uranus', 'Neptunus', 'Tyrannosaurus rex']);

function resolveNl(nounKey, locNameRaw) {
  if (!locNameRaw) return null;
  // strip a dedup-suffix on the manifest name ("Kat 2" -> "Kat") — duplicate-image label
  const locName = locNameRaw.replace(/\s+\d+$/, '');
  const ovr = OVERRIDE_BY_NAME[locName];
  if (ovr) return { sing: ovr[0], plural: ovr[1], gender: ovr[2] || 'd', src: 'override' };
  // else use locName as singular + the vocab plural WHEN vocab's singular matches locName
  const base = nounKey.replace(/-\d+$/, '');
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, ''), base, base.replace(/-/g, '_'), base.replace(/-/g, '')];
  for (const k of cands) {
    if (VOCAB[k] && VOCAB[k].nl && VOCAB[k].nl[0] && VOCAB[k].nl[0].toLowerCase() === locName.toLowerCase()) {
      const v = VOCAB[k].nl;
      return { sing: locName, plural: v[1], gender: v[2] || 'd', src: 'vocab' };
    }
  }
  return { sing: locName, plural: null, src: 'needs-plural' }; // flagged below
}
// IJ digraph: lowercasing "IJs" must give "ijs" (both letters), never "iJs"
function lc(s) {
  if (PROPER.has(s)) return s;
  if (/^IJ/.test(s)) return 'ij' + s.slice(2);
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function themeDisplay(themeKey) {
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.nl) ? e.name.nl : themeKey;
}

// list-join: "3 ringen, 4 riemen en 5 haarspelden"
function nlList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' en ' + items[items.length - 1];
}


// --- native-nl prose, je-register ("je kind"/"jouw kind"), classify-count-represent
// (data, NOT measuring), warm/no-shame, getalbereik 0–10, no timer/points. theme + the
// deck's own nouns woven through. ex = 2–3 of the deck's category nouns (plural, lc). ---
function p1(T, ex, i) {
  const [a, b, c] = ex;
  return [
    `Dit werkblad met als thema ${T} nodigt je kind uit om op een heel concrete manier te tellen en gegevens te ordenen. Eerst sorteert je kind de plaatjes in groepjes — het legt de ${a} bij elkaar en de ${b} bij elkaar — en telt daarna hoeveel er van elke soort zijn. Voor elk plaatje kleurt je kind een vakje in de juiste kolom, en zo groeit er stap voor stap een staafdiagram of pictogram. Wanneer de ${a}, de ${b} en de ${c} elk in hun eigen staaf staan, ziet je kind in één oogopslag welke groep het grootst is. Zo oefent het een basisidee uit de wiskunde: ordenen op categorie, tellen en hoeveelheden vergelijken, allemaal binnen het getalbereik 0 tot 10 en in zijn eigen rustige tempo.`,
    `Met deze telopdracht in het thema ${T} geeft je kind antwoord op de vraag «hoeveel zijn er?». Het blad mengt verschillende plaatjes door elkaar — ${a}, ${b}, ${c} en meer — en de opdracht is om de gelijke bij elkaar te zoeken, elke groep te tellen en vakje voor vakje een staaf te kleuren tot het pictogram af is. Het is een eerste kennismaking met het ordenen van gegevens: de ${a} en de ${b} op soort leggen, tellen hoeveel het er zijn en kijken welke groep de meeste heeft. Je kind wijst elk plaatje aan terwijl het telt, helemaal zonder tijdsdruk en zonder punten om te halen.`,
    `In deze activiteit met ${T} kijkt je kind goed naar de plaatjes, legt de gelijke bij elkaar — ${a} bij ${a}, ${b} bij ${b} — telt hoeveel er van elke soort zijn en kleurt de vakjes die erbij horen. Als het blad af is, vormen kolommen zoals die met de ${c} een pictogram dat je met één blik kunt lezen. De opdracht oefent het tellen en het ordenen op een tastbare, visuele manier, rustig en veilig. Je kind mag alle tijd nemen die het nodig heeft, want er is hier geen klok en er zijn geen sterren, alleen het plezier om de hoeveelheden te zien groeien.`,
    `Dit tel- en diagramblad met ${T} geeft je kind een duidelijke opdracht: de plaatjes ordenen op soort — ${a}, ${b}, ${c} en meer — tellen hoeveel er van elke soort zijn en per plaatje een vakje kleuren tot elke staaf omhoog komt. Zo leert je kind gegevens ordenen en hoeveelheden vergelijken, en ziet het meteen welke groep de meeste heeft en welke de minste. Alles blijft binnen het getalbereik 0 tot 10, zodat de opdracht overzichtelijk blijft. Je kunt er rustig naast gaan zitten, meetellen en samen wijzen, helemaal zonder druk en zonder beoordeling.`,
    `Tellen wordt iets om te zíén op dit diagramblad over ${T}. Je kind bekijkt een verzameling plaatjes, kiest telkens één soort — bijvoorbeeld de ${a} — en zoekt ze allemaal bij elkaar voordat het ze telt. Elk geteld plaatje wordt een gekleurd vakje in een kolom, en zodra alle ${b} en ${c} hun plek hebben gevonden, staat er een echt grafiekje op papier. Door de staven naast elkaar te leggen leert je kind aflezen welke soort het vaakst voorkomt en welke maar een klein beetje, een eerste stap in het werken met gegevens. Het mag rustig aan, zonder klok en zonder cijfer eronder.`,
    `Op dit blad over ${T} draait alles om groeperen en turven. Je kind schuift de gelijke plaatjes bij elkaar — alle ${a} op één hoopje, alle ${b} op een ander — en telt daarna pas hoeveel het er per groep zijn. Voor elke ${c} of elk ander plaatje kleurt het één hokje in de bijbehorende balk, tot het diagram helemaal gevuld is. Zo ontdekt je kind spelenderwijs hoe je hoeveelheden ordent en vergelijkt, en hoe een rij hokjes verandert in informatie die je in één oogopslag kunt lezen. De getallen blijven klein, tot tien, en jullie bepalen samen het tempo.`,
    `Ga er samen even goed voor zitten met dit ${T}-diagram. Je kind begint met kijken: welke plaatjes lijken op elkaar? De ${a} horen bij elkaar, de ${b} vormen een eigen groepje, en ook de ${c} krijgen hun plek. Daarna telt je kind elke groep en kleurt het per plaatje een vakje, zodat de kolommen langzaam omhoog kruipen. Aan het eind lezen jullie samen af welke staaf het langst is geworden en welke kort bleef — precies waar het bij gegevens om gaat. Alles speelt zich af binnen het getalbereik nul tot tien, warm en zonder enige haast.`,
  ][i % 7];
}

function p3(T, top, low, i) {
  return [
    `Het blad met ${T} kun je als PDF afdrukken om op papier te werken, of meteen op het scherm spelen — altijd gratis en zonder je aan te melden. Er zijn geen stopwatches en geen punten: je kind bepaalt zelf het tempo, zonder schaamte als het zich een keer vertelt, want een staaf opnieuw tellen — nog eens kijken naar de kolom met de ${top}, bijvoorbeeld — hoort gewoon bij het leren. De activiteit sluit aan bij de kerndoelen voor rekenen-wiskunde, het domein meten en gegevens, en past mooi bij kleuters tot en met groep 3, ongeveer 4 tot 7 jaar. Als volgende stap kunnen jullie de kolommen vergelijken en kijken welke het hoogst is.`,
    `Je kunt de PDF met ${T} downloaden om af te drukken, of de interactieve versie online spelen — gratis en zonder account. Geen klok en geen punten: elk kind gaat in zijn eigen tempo vooruit, met warmte en zonder druk. De activiteit sluit aan bij de kerndoelen voor rekenen-wiskunde binnen het domein meten en gegevens en is bedoeld voor kleuters tot en met groep 3, ongeveer 4 tot 7 jaar. Als je kind klaar is met tellen, is het leuk om de staven te vergelijken en te kijken of de kolom met de ${top} echt hoger is dan die met de ${low}.`,
    `Helemaal gratis: druk het blad met ${T} af om op papier te werken, of speel het online zonder je te hoeven registreren. Er zijn geen stopwatches en geen punten; nog eens nakijken en opnieuw tellen hoort ook bij het leren. Het blad sluit aan bij de kerndoelen voor rekenen-wiskunde, het domein meten en gegevens, en past bij kinderen van de kleuterklas tot en met groep 3, in de leeftijd van 4 tot 7 jaar. De volgende stap is vergelijken welke categorie de meeste plaatjes heeft — zijn dat misschien de ${top}?`,
    `Dit diagram met ${T} is gratis af te drukken als PDF of online te spelen, zonder registratie. Geen klok en geen punten: je kind bepaalt zelf het tempo, in een vriendelijke sfeer. Het blad sluit aan bij de kerndoelen voor rekenen-wiskunde, binnen het domein meten en gegevens, en past mooi bij kleuters tot en met groep 3, ongeveer 4 tot 7 jaar. Tot slot kunnen jullie de kolommen vergelijken — is de staaf met de ${top} de hoogste? — en zo lezen jullie samen het pictogram nog eens goed.`,
    `Wil je verder met ${T}? Het blad is gratis te printen als PDF en ook online te spelen, zonder dat je een account hoeft te maken. We werken bewust zonder klok, punten of sterren: je kind telt op zijn gemak en mag fouten gewoon verbeteren. De opdracht hoort bij de kerndoelen voor rekenen-wiskunde, het domein meten en gegevens, en is bedoeld voor kleuters tot en met groep 3, zo rond de 4 tot 7 jaar. Praat daarna samen na over wat het diagram laat zien: van welke soort zag je er het meest, en van welke maar een paar?`,
    `Je vindt ${T} gratis als printbare PDF of als spel op het scherm, helemaal zonder registratie. Geen tijdsdruk en geen score — je kind bepaalt zelf hoe snel het gaat, in een veilige en vriendelijke sfeer. Het blad past bij de kerndoelen voor rekenen-wiskunde binnen het domein meten en gegevens en sluit aan bij kleuters tot en met groep 3, ongeveer 4 tot 7 jaar oud. Een mooie afsluiting is om de hoogste en de laagste staaf aan te wijzen en hardop te zeggen hoeveel het er van elke soort waren.`,
    `Het ${T}-diagram staat gratis klaar om te printen of online te spelen, zonder aanmelden. Bij ons geen stopwatch en geen punten: opnieuw tellen of een kolom nog eens nakijken is onderdeel van het leren, niet iets om je voor te schamen. De activiteit hoort bij de kerndoelen voor rekenen-wiskunde, het domein meten en gegevens, en is geschikt voor kinderen van de kleuterklas tot en met groep 3, zo'n 4 tot 7 jaar. Leg tot slot de staaf met de ${top} naast die met de ${low} en kijk samen welk verschil je ziet.`,
  ][i % 7];
}

function buildEntry(deck, i, report) {
  const T = themeDisplay(deck.themeKey);
  const cats = [];
  for (const c of deck.categories) {
    if (c.count === 0) continue; // a 0-height bar is not an honest "Hoeveel?" Quiz item — skip
    const r = resolveNl(c.nounKey, c.locName);
    if (!r) { report.unresolved.push(`${c.nounKey} (${deck.themeKey})`); continue; }
    if (r.src === 'needs-plural' || !r.plural) {
      report.needsPlural.push(`"${c.locName}" (${c.nounKey} @ ${deck.themeKey})`);
      continue;
    }
    cats.push({ sing: r.sing, plural: r.plural, gender: r.gender, count: c.count });
  }
  if (cats.length < 2) { report.droppedDecks.push(`${deck.slug} (only ${cats.length} cats)`); return null; }

  // DISTANCE-2 variant assignment: each page gets a unique (p1,p2) pair (7×6=42 ≥ 41)
  // and p3 = (p1+p2) mod 7, so any two pages differ in ≥2 of the three paragraph variants
  // (no pair can share both scaffolds → whole-page raw Jaccard stays well off the 0.80
  // gate). This is the §22.1 cell-space anti-clustering as a code, not a hash gamble.
  const p1i = i % 7;
  const p2i = Math.floor(i / 7) % 6;
  const p3i = (p1i + p2i) % 7;

  // p2: HONEST-COUNT weave — "3 ringen, 4 riemen en 5 haarspelden" (count + lc plural).
  // The count list itself varies per deck (the honest-count binding); the SURROUNDING
  // sentences rotate across 6 variants.
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = nlList(items);
  const ex = cats.map((c) => lc(c.plural));
  const sorted = [...cats].sort((a, b) => b.count - a.count);
  const top = lc(sorted[0].plural);
  const low = lc(sorted[sorted.length - 1].plural);

  const p2 = [
    `Op dit werkblad telt je kind ${list}. Wanneer het voor elk plaatje een vakje kleurt, laat de hoogste kolom in één oogopslag zien welke groep de meeste heeft en welke de minste. Met je vinger op elk plaatje wijzen terwijl je telt helpt je kind om de tel niet kwijt te raken en het antwoord te controleren.`,
    `Hier telt je kind ${list}. Elke groep krijgt zijn eigen kolom, dus als het blad af is, zie je meteen welke categorie het hoogst werd en welke het laagst. Tellen en tegelijk elk plaatje aanwijzen zorgt ervoor dat je kind er geen overslaat en het antwoord rustig kan nakijken.`,
    `Op dit blad komt je kind ${list} tegen. Het kleurt per plaatje één vakje, en zo verschijnen de staven naast elkaar: de groep met de ${top} schiet omhoog, terwijl de ${low} maar een laag staafje krijgt. Door hardop mee te tellen en de plaatjes één voor één aan te raken houdt je kind het overzicht en kan het zijn telling rustig nakijken.`,
    `In deze opdracht telt je kind ${list}. Voor elk plaatje kleurt het een vakje in de juiste kolom, en als alles ingekleurd is, vertelt het diagram in één oogopslag welke soort het vaakst voorkomt en welke het minst. Samen wijzen en tellen helpt je kind om geen plaatje over te slaan en het getal nog eens te controleren.`,
    `Tel je mee? Op dit blad gaat je kind ${list} na. Elk plaatje dat het telt, wordt één gekleurd hokje in de juiste balk, en zo bouwt het stukje bij beetje een diagram op. Aan het langste en het kortste staafje ziet je kind meteen waarvan er veel en waarvan er weinig zijn — en aanwijzen tijdens het tellen voorkomt dat er eentje wordt overgeslagen.`,
    `Dit blad laat je kind ${list} ordenen en tellen. Per plaatje kleurt het een vakje, en de kolommen die zo ontstaan, maken in één blik duidelijk welke soort wint en welke achterblijft. Hardop tellen en met de vinger volgen helpt je kind om de tel vast te houden en achteraf rustig te controleren of alles klopt.`,
  ][p2i];

  // practiceProblems — "Hoeveel {meervoud}?" (invariant, no gender split)
  const pp = cats.map((c) => ({ q: `Hoeveel ${lc(c.plural)}?`, a: String(c.count) }));

  return {
    slug: deck.slug,
    variantShape: deck.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: 'groep-3' },
    levels: ['kleuters', 'groep-3'],
    eyebrow: 'Werkblad: Beelddiagram',
    h1: `Tel en vul het diagram in: ${T}`,
    strand: 'Meten en gegevens',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), T, 'Kleuters tot groep 3'],
    p1: p1(T, [ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0]], p1i),
    p2,
    p3: p3(T, top, low, p3i),
    canonicalDeckSlug: deck.slug,
    carousel: [],
    practiceProblems: pp,
    ...(deck.siblings.length > 1 ? { collapseSiblings: deck.siblings } : {}),
  };
}

// --- build ---
const culled = facts.filter((d) => CULL_THEMES.has(d.themeKey)).map((d) => d.themeKey);
const targets = facts.filter((d) => !CULL_THEMES.has(d.themeKey));
const report = { unresolved: [], droppedDecks: [], needsPlural: [] };
const entries = [];
targets.forEach((d, i) => { const e = buildEntry(d, i, report); if (e) entries.push(e); });

// --- summary ---
console.log('=== gen-nl-chartcount summary ===');
console.log('themes processed (countable):', targets.length, '/ facts', facts.length);
console.log('culled (' + culled.length + '):', culled.join(', '));
console.log('categories unresolved (' + report.unresolved.length + '):', report.unresolved.join(', ') || '(none)');
console.log('decks dropped (<2 cats, ' + report.droppedDecks.length + '):', report.droppedDecks.join(', ') || '(none)');
console.log('NEEDS-PLURAL (' + report.needsPlural.length + ') — add to OVERRIDE_BY_NAME:');
report.needsPlural.forEach((m) => console.log('   ' + m));
console.log('total entries built:', entries.length);
if (entries.length) {
  const s = entries[0];
  console.log('--- sample [' + s.slug + '] ---');
  console.log('  h1:', s.h1);
  console.log('  p2:', s.p2);
  console.log('  practiceProblems:', JSON.stringify(s.practiceProblems));
}

// --- honest-count assertion: every practiceProblem answer must appear with the same
// number in p2's count list (both come from facts, but assert it — defence in depth) ---
let mismatch = 0;
for (const e of entries) {
  for (const pp of e.practiceProblems) {
    const noun = pp.q.replace(/^Hoeveel /, '').replace(/\?$/, '');
    const re = new RegExp('(\\d+) ' + noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
    const m = e.p2.match(re);
    if (m && m[1] !== pp.a) { console.error('  HONEST-COUNT MISMATCH ' + e.slug + ': p2 "' + m[0] + '" vs pp a=' + pp.a); mismatch++; }
  }
}
if (mismatch) { console.error('HONEST-COUNT: ' + mismatch + ' mismatch(es) — halting.'); process.exit(1); }
console.log('honest-count assertion: clean (p2 counts ↔ practiceProblems answers agree)');

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }

// --- read / filter-out existing chart-count / append / write (idempotent) ---
let cur = { _note: 'NL landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(NL, 'utf8')); } catch (e) {}
const keep = (cur.landings || []).filter((l) => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note, landings: keep.concat(entries) };
JSON.parse(JSON.stringify(merged)); // validate serializable
fs.writeFileSync(NL, JSON.stringify(merged, null, 2) + '\n');
console.log('\nwrote ' + entries.length + ' chart-count entries; nl.json total landings now ' + merged.landings.length);
