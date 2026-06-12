#!/usr/bin/env node
/**
 * gen-da-chartcount.js — the da chart-count (Søjlediagram) landing generator.
 * Engine = a 1:1 clone of gen-nl-chartcount.js (facts loading, vocab plural resolution
 * with override map, honest-count Quiz binding, prose assembly, idempotent merge,
 * zero-mismatch assertion); LANGUAGE LAYER = native Danish, paths nl→da.
 *
 * Honest-count binding: per-category count = facts.count (= the rendered bar height =
 * the manifest icon occurrences, the §22.1 render-time-quantity rule). Prose p2 counts
 * AND the practiceProblems answers BOTH draw from the SAME facts → agree-by-construction
 * with the chart. Operator gate: ZERO mismatches (asserted at the end; halts on any).
 *
 * The native Danish PLURAL for the Quiz ("Hvor mange {flertal}?") is resolved from
 * image-vocabulary.js da [sing, plural, gender(n/t)], cross-checked against the manifest's
 * own category name (facts.locName), with an OVERRIDE map for vocab gaps, ungrammatical
 * vocab plurals, mass→countable surrogates (majs→majskolber, spinat→bundter spinat),
 * already-plural manifest names, and icon-misdepictions — each line native-verified.
 *
 * Ledger (operator-ruled, da ledger-lock):
 *   strand  = Statistik og sandsynlighed (Fælles Mål, the data domain)
 *   standard= K.MD.B.3 (recognition) → CARRIES (educationalAlignment present)
 *   band    = 1. klasse (formal data-reading), span børnehaveklasse→1. klasse (tal 0–10)
 *
 * Reads:  scripts/seo-landing/_da-cc-facts.json      (Stage-A dump, gen-cc-facts.js)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js  (da [sing, plural, gender])
 *         frontend/config/topics-taxonomy.json        (axes.theme.<key>.name.da)
 *         scripts/seo-landing/da-themes.js            (plIndef/h1Display, hand-verified)
 * Writes: filter OUT existing chart-count landings in da.json, append the new set
 *         (idempotent), preserve the rest. rekey-da-titles.js adds title+meta after.
 *
 * Usage: node scripts/seo-landing/gen-da-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./da-themes');

const DRY = process.argv.includes('--dry-run');
const DA = 'frontend/content/seo-landing/da.json';

// Cull: the 7 semantically-non-countable themes the validity gate flags INVALID for
// chart-count (activities/body_parts/emotions/seasons/weather) + 4th_of_july (the
// standing da-locale drop: a US holiday Danish teachers don't search — every other da
// type drops it via enum-da-coords). thanksgivinng STAYS (countable; kept across all
// da types). Result: 49 facts - 8 = 41 landings.
const CULL_THEMES = new Set([
  'activities', 'body_parts', 'emotions',
  'spring', 'summer', 'winter', 'weather',
  '4th_of_july',
]);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_da-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// The manifest's category name (facts.locName) is the DEPICTED Danish singular — the
// authoritative word (it disambiguates nounKey collisions like `violet` = the colour in
// the colors theme vs a flower elsewhere). So the SINGULAR is always locName; only the
// native PLURAL needs resolving.
//
// OVERRIDE_BY_NAME[locName] = [singular, plural, gender(n/t)] — native-verified plurals
// for every name where vocab can't supply a correct one. Classes:
//  (a) MASS→COUNTABLE — a discrete icon under a mass label (majs→majskolber, spinat→
//      bundter spinat, gips→gipsbandager, ristet brød→stykker ristet brød).
//  (b) ALREADY-PLURAL manifest name — give the true singular (Ærter→Ært, Gardiner→Gardin);
//      plurale tantum pairs count as PAR (solbriller/jeans/shorts → "par …").
//  (c) PROPER NOUN — planets have no plural; plural===singular, capitalised (via vocab+PROPER).
//  (d) VOCAB GAP / MISMATCH — tree species (-træ compounds, the nl -boom precedent),
//      postal nouns, the colour adjectives (substantivised -e form).
//  (e) WRONG vocab plurals corrected — vocab supplied an ungrammatical Danish plural.
const OVERRIDE_BY_NAME = {
  // tree (so the træer deck lands) — -træ compounds, kid-natural
  'Løn': ['Lønnetræ', 'Lønnetræer', 't'],
  'Birk': ['Birketræ', 'Birketræer', 't'],
  'Gran': ['Grantræ', 'Grantræer', 't'],
  'Hemlock': ['Hemlocktræ', 'Hemlocktræer', 't'],
  'Fyr': ['Fyrretræ', 'Fyrretræer', 't'],
  'Appelsintræ': ['Appelsintræ', 'Appelsintræer', 't'],
  // christmas — vocab gave the DEFINITE pair (Julemanden/Julemandene); bare noun needed
  'Julemanden': ['Julemand', 'Julemænd', 'n'],
  // hospital
  'Hospitalsseng': ['Hospitalsseng', 'Hospitalssenge', 'n'],
  'Hjerteovervågning': ['Overvågningsskærm', 'Overvågningsskærme', 'n'], // device icon under an abstract label
  'Gips': ['Gipsbandage', 'Gipsbandager', 'n'],                          // mass → count the casts
  'Termometer': ['Termometer', 'Termometre', 't'],                       // NOT termometere (syncope)
  // music
  'Musiknode': ['Node', 'Noder', 'n'],          // "Hvor mange noder?" is the natural ask
  'Keyboard': ['Keyboard', 'Keyboards', 't'],   // NOT keyboarder
  // around the house — locName "Borste" is a data typo (Swedish form); Danish = børste
  'Borste': ['Børste', 'Børster', 'n'],
  // furniture / classroom
  'Gardiner': ['Gardin', 'Gardiner', 't'],      // already-plural manifest name
  'Stol': ['Stol', 'Stole', 'n'],               // NOT stoler
  'Lænestol': ['Lænestol', 'Lænestole', 'n'],   // NOT lænestoler
  // post office
  'Frimærke': ['Frimærke', 'Frimærker', 't'],
  'Postbil': ['Postbil', 'Postbiler', 'n'],
  'Postvægt': ['Postvægt', 'Postvægte', 'n'],
  'Levering': ['Pakke', 'Pakker', 'n'],         // the delivery icon = a parcel; "leveringer" is office-speak
  // supermarket / vegetables — mass labels, discrete icons
  'Ærter': ['Ært', 'Ærter', 'n'],
  'Druer': ['Drue', 'Druer', 'n'],
  'Spinat': ['Bundt spinat', 'Bundter spinat', 't'],
  'Salat': ['Salathoved', 'Salathoveder', 't'],
  'Majs': ['Majskolbe', 'Majskolber', 'n'],
  'Svamp': ['Svamp', 'Svampe', 'n'],            // NOT svamper
  'Pastinak': ['Pastinak', 'Pastinakker', 'n'], // kort vokal → kk
  // bakery / breakfast / desserts
  'Ristet brød': ['Stykke ristet brød', 'Stykker ristet brød', 't'],
  'Cheesecake': ['Cheesecake', 'Cheesecakes', 'n'],   // NOT cheesecaker
  'Kanelsnegl': ['Kanelsnegl', 'Kanelsnegle', 'n'],   // NOT kanelsnegler
  'Muffin': ['Muffin', 'Muffins', 'n'],               // NOT muffiner
  'Doughnut': ['Doughnut', 'Doughnuts', 'n'],         // NOT doughnuter
  'Cupcake': ['Cupcake', 'Cupcakes', 'n'],            // NOT cupcaker
  // clothing — plurale tantum counted as pairs; agreement fixes
  'Jeans': ['Par jeans', 'Par jeans', 't'],
  'Shorts': ['Par shorts', 'Par shorts', 't'],
  'Solbriller': ['Par solbriller', 'Par solbriller', 't'],
  'Tanktop': ['Tanktop', 'Tanktoppe', 'n'],     // NOT tanktoper
  'Vest': ['Vest', 'Veste', 'n'],               // NOT vester
  // beach
  'Solhat': ['Solhat', 'Solhatte', 'n'],        // NOT solhater
  'Badebold': ['Badebold', 'Badebolde', 'n'],   // NOT badebolder
  // accessories
  'Tryllestav': ['Tryllestav', 'Tryllestave', 'n'],       // NOT tryllestaver
  'Hårelastik': ['Hårelastik', 'Hårelastikker', 'n'],     // kort i → kk
  // birds — fugl→fugle, kort-vokal doubling, e-plurals
  'Påfugl': ['Påfugl', 'Påfugle', 'n'],
  'Næsehornsfugl': ['Næsehornsfugl', 'Næsehornsfugle', 'n'],
  'Sommerfugl': ['Sommerfugl', 'Sommerfugle', 'n'],
  'Grib': ['Grib', 'Gribbe', 'n'],
  'Stork': ['Stork', 'Storke', 'n'],
  'Spurv': ['Spurv', 'Spurve', 'n'],
  'Rødhals': ['Rødhals', 'Rødhalse', 'n'],
  // insects
  'Mariehøne': ['Mariehøne', 'Mariehøns', 'n'], // DDO: flertal mariehøns
  'Hveps': ['Hveps', 'Hvepse', 'n'],            // NOT hvepser
  'Snegl': ['Snegl', 'Snegle', 'n'],            // NOT snegler
  // forest / zoo / ocean
  'Elg': ['Elg', 'Elge', 'n'],                  // NOT elger
  'Ræv': ['Ræv', 'Ræve', 'n'],                  // NOT ræver
  'Klovnfisk': ['Klovnfisk', 'Klovnfisk', 'n'], // fisk: zero plural
  'Østers': ['Østers', 'Østers', 'n'],          // zero plural
  // easter
  'Fjer': ['Fjer', 'Fjer', 'n'],                // zero plural, NOT fjerer
  // flowers
  'Vintergæk': ['Vintergæk', 'Vintergækker', 'n'], // kort vokal → kk
  'Kløver': ['Kløverblad', 'Kløverblade', 't'],    // mass → count the leaves
  // fruits
  'Kaki': ['Kakifrugt', 'Kakifrugter', 'n'],    // "kakier" is unnatural; -frugt compound
  // kitchen tools
  'Målebæger': ['Målebæger', 'Målebægre', 't'], // syncope: bæger→bægre
  'Skål': ['Skål', 'Skåle', 'n'],               // NOT skåler
  // tools / toys
  'Tang': ['Tang', 'Tænger', 'n'],              // NOT tanger
  'Domino': ['Dominobrik', 'Dominobrikker', 'n'],
  'Lego': ['Legoklods', 'Legoklodser', 'n'],
  'Robot': ['Robot', 'Robotter', 'n'],          // kort o → tt
  'Skateboard': ['Skateboard', 'Skateboards', 't'], // NOT skateboarder
  // occupations
  'Postbud': ['Postbud', 'Postbude', 't'],      // bud→bude
  'Barber': ['Barber', 'Barberer', 'n'],        // RO: -en, -er
  // dinosaurs — -us → -usser (kaktus→kaktusser pattern)
  'Allosaurus': ['Allosaurus', 'Allosaurusser', 'n'],
  'Apatosaurus': ['Apatosaurus', 'Apatosaurusser', 'n'],
  'Ankylosaurus': ['Ankylosaurus', 'Ankylosaurusser', 'n'],
  'Parasaurolophus': ['Parasaurolophus', 'Parasaurolophusser', 'n'],
  // space
  'Satellit': ['Satellit', 'Satellitter', 'n'], // kort i → tt
  // shapes
  'Ottekant': ['Ottekant', 'Ottekanter', 'n'],
  // thanksgiving
  'Høstak': ['Høstak', 'Høstakke', 'n'],                    // kort a → kk
  'Stegt kalkun': ['Stegt kalkun', 'Stegte kalkuner', 'n'], // adjective agreement in plural
  // colours — substantivised -e form ("3 blå" = "3 blue ones"; honest count of swatches)
  'Brun': ['Brune', 'Brune', 'n'],
  'Blå': ['Blå', 'Blå', 'n'],
  'Sort': ['Sorte', 'Sorte', 'n'],
  'Violet': ['Violette', 'Violette', 'n'],
  'Hvid': ['Hvide', 'Hvide', 'n'],
  'Karmin': ['Karminrøde', 'Karminrøde', 'n'],
};

// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set(['Merkur', 'Mars', 'Neptun']);

function resolveDa(nounKey, locNameRaw) {
  if (!locNameRaw) return null;
  // strip a dedup-suffix on the manifest name ("Hest 2" -> "Hest") — duplicate-image label
  const locName = locNameRaw.replace(/\s+\d+$/, '');
  const ovr = OVERRIDE_BY_NAME[locName];
  if (ovr) return { sing: ovr[0], plural: ovr[1], gender: ovr[2] || 'n', src: 'override' };
  // else use locName as singular + the vocab plural WHEN vocab's singular matches locName
  const base = nounKey.replace(/-\d+$/, '');
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, ''), base, base.replace(/-/g, '_'), base.replace(/-/g, '')];
  for (const k of cands) {
    if (VOCAB[k] && VOCAB[k].da && VOCAB[k].da[0] && VOCAB[k].da[0].toLowerCase() === locName.toLowerCase()) {
      const v = VOCAB[k].da;
      return { sing: locName, plural: v[1], gender: v[2] || 'n', src: 'vocab' };
    }
  }
  return { sing: locName, plural: null, src: 'needs-plural' }; // flagged below
}
function lc(s) {
  if (PROPER.has(s)) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function themeDisplay(themeKey) {
  const t = THEMES[themeKey];
  if (t && t.h1Display) return t.h1Display;
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.da) ? e.name.da : themeKey;
}
// the theme's prose noun (indefinite plural, lowercase) — da-themes plIndef, hand-verified
function themeNoun(themeKey) {
  const t = THEMES[themeKey];
  return (t && t.plIndef) ? t.plIndef : lc(themeDisplay(themeKey));
}

// list-join: "3 katte, 4 hunde og 5 ænder"
function daList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' og ' + items[items.length - 1];
}


// --- native-da prose, "dit barn"-register, classify-count-represent (data, NOT measuring),
// warm/no-shame, tal 0–10, no timer/points. Counting language is OWNED here ("hvor mange"
// IS the content). Theme nouns plural-only; B5: never den/det/de (±adj) before a definite
// plural. TN = theme plural noun (lc); ex = 2–3 of the deck's category plurals (lc). ---
function p1(TN, ex, i) {
  const [a, b, c] = ex;
  return [
    `Dette opgaveark med ${TN} inviterer dit barn til at tælle og ordne på en helt konkret måde. Først sorterer barnet billederne i grupper — ${a} for sig og ${b} for sig — og tæller derefter, hvor mange der er af hver slags. For hvert billede farver barnet et felt i den rigtige kolonne, og sådan vokser der lidt efter lidt et søjlediagram frem. Når både ${a}, ${b} og ${c} står i hver deres søjle, kan dit barn med ét blik se, hvilken gruppe der er størst. På den måde øver det en grundidé i matematikken: at ordne i kategorier, tælle og sammenligne mængder — alt sammen med tal op til 10 og i barnets eget rolige tempo.`,
    `Med denne tælleopgave med ${TN} svarer dit barn på spørgsmålet «hvor mange er der?». Arket blander forskellige billeder — ${a}, ${b}, ${c} og flere til — og opgaven er at finde dem, der hører sammen, tælle hver gruppe og farve felt for felt, indtil diagrammet er fyldt ud. Det er et første møde med at ordne data: at lægge ${a} og ${b} i hver sin gruppe, tælle hvor mange der er, og se hvilken gruppe der har flest. Dit barn peger på hvert billede, mens det tæller — helt uden tidspres og uden point at jage efter.`,
    `I denne aktivitet med ${TN} kigger dit barn godt på billederne, samler de ens billeder — ${a} for sig, ${b} for sig — tæller hvor mange der er af hver slags og farver felterne, der hører til. Når arket er færdigt, danner kolonner som den med ${c} et lille diagram, man kan aflæse med ét blik. Opgaven træner tælling og ordning på en håndgribelig, visuel måde, roligt og trygt. Dit barn må bruge al den tid, det har brug for — her er intet ur og ingen stjerner, kun glæden ved at se søjlerne vokse.`,
    `Dette tælle- og diagramark med ${TN} giver dit barn en tydelig opgave: ordne billederne efter slags — ${a}, ${b}, ${c} og flere — tælle hvor mange der er af hver, og farve et felt pr. billede, indtil hver søjle vokser opad. Sådan lærer dit barn at ordne oplysninger og sammenligne mængder, og det ser med det samme, hvilken gruppe der har flest, og hvilken der har færrest. Alt holder sig til tal op til 10, så opgaven forbliver overskuelig. Du kan roligt sætte dig ved siden af, tælle med og pege sammen — helt uden pres og uden bedømmelse.`,
    `At tælle bliver noget, man kan se, på dette diagramark med ${TN}. Dit barn kigger på en samling billeder, vælger én slags ad gangen — for eksempel ${a} — og finder dem alle sammen, før det tæller dem. Hvert talt billede bliver et farvet felt i en kolonne, og når alle ${b} og ${c} har fundet deres plads, står der et rigtigt lille diagram på papiret. Ved at sammenligne søjlerne lærer dit barn at aflæse, hvilken slags der er flest af, og hvilken der kun er få af — et første skridt ind i arbejdet med statistik. Det må gå helt roligt, uden ur og uden karakterer.`,
    `På dette ark med ${TN} handler alt om at gruppere og holde styr på antal. Dit barn samler de ens billeder — alle ${a} i én bunke, alle ${b} i en anden — og tæller først bagefter, hvor mange der er i hver gruppe. For hvert billede farver det ét felt i den rigtige søjle, indtil diagrammet er helt fyldt — også kolonnen med ${c}. Sådan opdager dit barn gennem leg, hvordan man ordner og sammenligner mængder, og hvordan en række felter bliver til information, man kan aflæse med ét blik. Tallene er små, højst ti, og I bestemmer selv tempoet.`,
    `Sæt jer godt til rette sammen med dette diagramark med ${TN}. Dit barn begynder med at kigge: hvilke billeder ligner hinanden? Alle ${a} hører sammen, ${b} danner deres egen gruppe, og ${c} får også deres plads. Derefter tæller dit barn hver gruppe og farver et felt pr. billede, så kolonnerne langsomt kryber opad. Til sidst aflæser I sammen, hvilken søjle der blev længst, og hvilken der forblev kort — netop det, statistik handler om. Det hele foregår med tal fra nul til ti, varmt og helt uden hastværk.`,
  ][i % 7];
}

function p3(TN, top, low, i) {
  return [
    `Arket med ${TN} kan du printe som PDF og arbejde med på papir, eller I kan spille det direkte på skærmen — altid gratis og uden at oprette en konto. Her er ingen stopure og ingen point: dit barn bestemmer selv tempoet, og det er helt i orden at tælle en søjle forfra — at kigge en ekstra gang på kolonnen med ${top} hører simpelthen med til at lære. Aktiviteten knytter sig til matematikkens område statistik og sandsynlighed og passer fint fra børnehaveklassen til 1. klasse, cirka 5 til 7 år. Som næste skridt kan I sammenligne kolonnerne og finde den højeste.`,
    `Du kan hente PDF'en med ${TN} til print eller spille den interaktive udgave online — gratis og uden login. Intet ur og ingen point: hvert barn går frem i sit eget tempo, med varme og uden pres. Aktiviteten hører hjemme i matematikkens område statistik og sandsynlighed og er tænkt til børn fra børnehaveklassen til 1. klasse, cirka 5 til 7 år. Når dit barn er færdigt med at tælle, er det sjovt at sammenligne søjlerne og se, om kolonnen med ${top} virkelig er højere end den med ${low}.`,
    `Helt gratis: print arket med ${TN}, og arbejd på papir, eller spil det online uden at skulle registrere jer. Her er ingen stopure og ingen point; at kigge efter og tælle om hører også med til at lære. Arket knytter sig til matematikkens område statistik og sandsynlighed og passer til børn fra børnehaveklassen til 1. klasse, i alderen cirka 5 til 7 år. Næste skridt er at sammenligne, hvilken kategori der har flest billeder — mon det er ${top}?`,
    `Dette diagram med ${TN} kan printes gratis som PDF eller spilles online uden registrering. Intet ur og ingen point: dit barn sætter selv tempoet i en venlig stemning. Arket hører til matematikkens område statistik og sandsynlighed og passer fint fra børnehaveklassen til 1. klasse, cirka 5 til 7 år. Til sidst kan I sammenligne kolonnerne — er søjlen med ${top} den højeste? — og på den måde læser I diagrammet grundigt en gang til sammen.`,
    `Vil I videre med ${TN}? Arket kan printes gratis som PDF og spilles online, uden at du behøver oprette en konto. Vi arbejder bevidst uden ur, point og stjerner: dit barn tæller i sit eget tempo og må rette sine fejl helt uden videre. Opgaven hører hjemme i matematikkens område statistik og sandsynlighed og er tænkt til børn fra børnehaveklassen til 1. klasse, omkring 5 til 7 år. Snak bagefter om, hvad diagrammet viser: hvilken slags så I flest af, og hvilken var der kun få af?`,
    `Du finder arket med ${TN} gratis som printbar PDF eller som spil på skærmen, helt uden registrering. Intet tidspres og ingen score — dit barn bestemmer selv farten i trygge og venlige rammer. Arket passer til matematikkens område statistik og sandsynlighed og henvender sig til børn fra børnehaveklassen til 1. klasse, cirka 5 til 7 år. En fin afslutning er at pege på den højeste og den laveste søjle og sige højt, hvor mange der var af hver slags.`,
    `Diagrammet med ${TN} står klar til gratis print eller online spil, uden login. Hos os er der ingen stopure og ingen point: at tælle om eller kigge en kolonne efter en ekstra gang er en del af at lære, ikke noget at skamme sig over. Aktiviteten hører til i matematikkens område statistik og sandsynlighed og passer til børn fra børnehaveklassen til 1. klasse, cirka 5 til 7 år. Læg til sidst søjlen med ${top} ved siden af den med ${low}, og se sammen, hvilken forskel I kan få øje på.`,
  ][i % 7];
}

function buildEntry(deck, i, report) {
  const D = themeDisplay(deck.themeKey);
  const TN = themeNoun(deck.themeKey);
  const cats = [];
  for (const c of deck.categories) {
    if (c.count === 0) continue; // a 0-height bar is not an honest "Hvor mange?" Quiz item — skip
    const r = resolveDa(c.nounKey, c.locName);
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

  // p2: HONEST-COUNT weave — "3 katte, 4 hunde og 5 ænder" (count + lc plural).
  // The count list itself varies per deck (the honest-count binding); the SURROUNDING
  // sentences rotate across 6 variants.
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = daList(items);
  const ex = cats.map((c) => lc(c.plural));
  const sorted = [...cats].sort((a, b) => b.count - a.count);
  const top = lc(sorted[0].plural);
  const low = lc(sorted[sorted.length - 1].plural);

  const p2 = [
    `På dette opgaveark tæller dit barn ${list}. Når det farver et felt for hvert billede, viser den højeste kolonne med ét blik, hvilken gruppe der har flest, og hvilken der har færrest. At pege på hvert billede med fingeren, mens man tæller, hjælper dit barn med ikke at miste overblikket og med at tjekke svaret bagefter.`,
    `Her tæller dit barn ${list}. Hver gruppe får sin egen kolonne, så når arket er færdigt, kan man straks se, hvilken kategori der blev højest, og hvilken der blev lavest. At tælle og samtidig pege på hvert billede sikrer, at dit barn ikke springer nogen over og roligt kan kontrollere svaret.`,
    `På dette ark møder dit barn ${list}. Det farver ét felt pr. billede, og sådan vokser søjlerne frem side om side: gruppen med ${top} skyder i vejret, mens ${low} kun får en lav søjle. Ved at tælle højt og røre ved billederne ét efter ét bevarer dit barn overblikket og kan kontrollere sin optælling i ro og mag.`,
    `I denne opgave tæller dit barn ${list}. For hvert billede farver det et felt i den rigtige kolonne, og når alt er farvet, fortæller diagrammet med ét blik, hvilken slags der er flest af, og hvilken der er færrest af. At pege og tælle sammen hjælper dit barn med ikke at springe et billede over og med at tjekke tallet en ekstra gang.`,
    `Tæller du med? På dette ark går dit barn ${list} efter. Hvert billede, der bliver talt, bliver til ét farvet felt i den rigtige søjle, og sådan bygger barnet lidt efter lidt et diagram op. På den længste og den korteste søjle kan dit barn straks se, hvad der er mange af, og hvad der kun er få af — og at pege, mens man tæller, forhindrer, at et billede bliver glemt.`,
    `Dette ark lader dit barn ordne og tælle ${list}. For hvert billede farves et felt, og kolonnerne, der vokser frem, gør det tydeligt med ét blik, hvilken slags der vinder, og hvilken der ligger lavest. At tælle højt og følge med fingeren hjælper dit barn med at holde styr på optællingen og bagefter roligt kontrollere, at alt passer.`,
  ][p2i];

  // practiceProblems — "Hvor mange {flertal}?" (invariant, no gender split)
  const pp = cats.map((c) => ({ q: `Hvor mange ${lc(c.plural)}?`, a: String(c.count) }));

  return {
    slug: deck.slug,
    variantShape: deck.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: '1-klasse' },
    levels: ['boernehaveklasse', '1-klasse'],
    eyebrow: 'Opgave: Søjlediagram',
    h1: `Søjlediagram med ${TN} – tæl og udfyld diagrammet (1. klasse)`,
    strand: 'Statistik og sandsynlighed',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), D, 'Børnehaveklasse til 1. klasse'],
    p1: p1(TN, [ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0]], p1i),
    p2,
    p3: p3(TN, top, low, p3i),
    canonicalDeckSlug: deck.slug,
    carousel: [], // filled post-hoc (da convention: 4 neighbour links, label 'Søjlediagram – <display>')
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

// carousel post-pass (gen-da-readiness convention): neighbours at [1,2,5,11], label
// 'Søjlediagram – <neighbour h1Display>', href = the neighbour's landing slug.
entries.forEach((e, i) => {
  e.carousel = [1, 2, 5, 11].map((off) => {
    const n = entries[(i + off) % entries.length];
    return { label: 'Søjlediagram – ' + themeDisplay(n.coordinate.theme), href: n.slug };
  });
});

// --- summary ---
console.log('=== gen-da-chartcount summary ===');
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
    const noun = pp.q.replace(/^Hvor mange /, '').replace(/\?$/, '');
    const re = new RegExp('(\\d+) ' + noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
    const m = e.p2.match(re);
    if (m && m[1] !== pp.a) { console.error('  HONEST-COUNT MISMATCH ' + e.slug + ': p2 "' + m[0] + '" vs pp a=' + pp.a); mismatch++; }
  }
}
if (mismatch) { console.error('HONEST-COUNT: ' + mismatch + ' mismatch(es) — halting.'); process.exit(1); }
console.log('honest-count assertion: clean (p2 counts ↔ practiceProblems answers agree)');

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }

// --- read / filter-out existing chart-count / append / write (idempotent) ---
let cur = { _note: 'DA landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(DA, 'utf8')); } catch (e) {}
const keep = (cur.landings || []).filter((l) => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note, landings: keep.concat(entries) };
JSON.parse(JSON.stringify(merged)); // validate serializable
fs.writeFileSync(DA, JSON.stringify(merged, null, 2) + '\n');
console.log('\nwrote ' + entries.length + ' chart-count entries; da.json total landings now ' + merged.landings.length);
