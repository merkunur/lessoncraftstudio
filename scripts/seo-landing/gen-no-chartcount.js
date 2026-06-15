#!/usr/bin/env node
/**
 * gen-no-chartcount.js — the no chart-count (Søylediagram) landing generator.
 * Engine = a 1:1 clone of gen-da-chartcount.js (facts loading, vocab plural resolution
 * with override map, honest-count Quiz binding, prose assembly, idempotent merge,
 * zero-mismatch assertion); LANGUAGE LAYER = native bokmål, paths da->no, vocab col da->no.
 *
 * Honest-count binding: per-category count = facts.count (= the rendered bar height).
 * Prose p2 counts AND the practiceProblems answers BOTH draw from the SAME facts ->
 * agree-by-construction with the chart. Operator gate: ZERO mismatches (asserted; halts).
 *
 * The native bokmål PLURAL for the Quiz ("Hvor mange {flertall}?") is resolved from
 * image-vocabulary.js no [sing, plural, gender], cross-checked against the manifest's own
 * category name (facts.locName), with an OVERRIDE_BY_NAME map for vocab gaps / wrong plurals /
 * mass->countable surrogates / already-plural names — each line native-verified.
 *
 * Ledger (no ledger-lock, go-luminous-moon.md Wave E):
 *   strand  = Statistikk og sannsynlighet (LK20 data domain)
 *   standard= K.MD.B.3 (recognition) -> CARRIES (educationalAlignment present)
 *   band    = 2. trinn (the +1 Nordic offset: da 1.klasse / sv åk-1 -> no 2.trinn), tall 0-10
 *
 * Reads:  scripts/seo-landing/_no-cc-facts.json      (Stage-A dump, gen-cc-facts.js --locale=no)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js  (no [sing, plural, gender])
 *         frontend/config/topics-taxonomy.json        (axes.theme.<key>.name.no)
 *         scripts/seo-landing/no-themes.js            (plIndef/h1Display, hand-verified)
 * Writes: filter OUT existing chart-count landings in no.json, append the new set (idempotent).
 * Usage: node scripts/seo-landing/gen-no-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./no-themes');

const DRY = process.argv.includes('--dry-run');
const NO = 'frontend/content/seo-landing/no.json';

// Cull: the 8 semantically-non-countable themes (activities/body_parts/emotions/seasons/weather)
// + 4th_of_july (US holiday, the standing non-EN drop). Result: 49 facts - 8 = 41 landings.
const CULL_THEMES = new Set([
  'activities', 'body_parts', 'emotions',
  'spring', 'summer', 'winter', 'weather',
  '4th_of_july',
]);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_no-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// OVERRIDE_BY_NAME[locName] = [singular, plural, gender(n/t)] — native-verified bokmål plurals
// (no native-linguist ensemble) for every name the no vocab column can't supply correctly:
//  - the -tre compounds (peach/pear/cherry TREE) → -trær (irregular tre→trær, neuter)
//  - "Månen" manifest label is DEFINITE → indef sing "Måne" / pl "Måner"
//  - "Postbud" = neuter zero-plural (et postbud → flere postbud); one entry serves post_office+yrker
//  - mass/compound nouns the vocab gives the wrong/fruit form for.
const OVERRIDE_BY_NAME = {
  'Gyngestol': ['Gyngestol', 'Gyngestoler', 'n'],
  'Sykehusseng': ['Sykehusseng', 'Sykehussenger', 'n'],
  'Sykehuskjole': ['Sykehuskjole', 'Sykehuskjoler', 'n'],
  'Snegle': ['Snegle', 'Snegler', 'n'],
  'Musikknote': ['Musikknote', 'Musikknoter', 'n'],
  'Postvekt': ['Postvekt', 'Postvekter', 'n'],
  'Frimerke': ['Frimerke', 'Frimerker', 't'],
  'Postbud': ['Postbud', 'Postbud', 't'],          // neuter zero-plural (et postbud / flere postbud)
  'Åttekant': ['Åttekant', 'Åttekanter', 'n'],
  'Månen': ['Måne', 'Måner', 'n'],                 // manifest label is definite ("Månen")
  'Ferskentre': ['Ferskentre', 'Ferskentrær', 't'],
  'Pæretre': ['Pæretre', 'Pæretrær', 't'],
  'Kokospalme': ['Kokospalme', 'Kokospalmer', 'n'],
  'Ask': ['Ask', 'Asker', 'n'],
  'Edelgran': ['Edelgran', 'Edelgraner', 'n'],
  'Kirsebærtre': ['Kirsebærtre', 'Kirsebærtrær', 't'],
};

// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set(['Merkur', 'Mars', 'Neptun']);

function resolveNo(nounKey, locNameRaw) {
  if (!locNameRaw) return null;
  const locName = locNameRaw.replace(/\s+\d+$/, '');
  const ovr = OVERRIDE_BY_NAME[locName];
  if (ovr) return { sing: ovr[0], plural: ovr[1], gender: ovr[2] || 'n', src: 'override' };
  const base = nounKey.replace(/-\d+$/, '');
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, ''), base, base.replace(/-/g, '_'), base.replace(/-/g, '')];
  for (const k of cands) {
    if (VOCAB[k] && VOCAB[k].no && VOCAB[k].no[0] && VOCAB[k].no[0].toLowerCase() === locName.toLowerCase()) {
      const v = VOCAB[k].no;
      return { sing: locName, plural: v[1], gender: v[2] || 'n', src: 'vocab' };
    }
  }
  return { sing: locName, plural: null, src: 'needs-plural' };
}
function lc(s) {
  if (PROPER.has(s)) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function themeDisplay(themeKey) {
  const t = THEMES[themeKey];
  if (t && t.h1Display) return t.h1Display;
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.no) ? e.name.no : themeKey;
}
function themeNoun(themeKey) {
  const t = THEMES[themeKey];
  return (t && t.plIndef) ? t.plIndef : lc(themeDisplay(themeKey));
}

// list-join: "3 katter, 4 hunder og 5 ender"
function noList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' og ' + items[items.length - 1];
}

// --- native bokmål prose, classify-count-represent (data, NOT measuring), warm/no-shame,
// tall 0-10, no timer/points. Counting language is OWNED here ("hvor mange" IS the content).
// TN = theme plural noun (lc); ex = 2-3 of the deck's category plurals (lc). ---
function p1(TN, ex, i) {
  const [a, b, c] = ex;
  return [
    `På dette arket møter barnet en blanding av ${TN}, og den første jobben er å sortere dem i grupper før det telles. Her hører ${a} sammen, her ${b}, og her ${c} – hver gruppe får sin egen plass. Så teller barnet opp én gruppe om gangen og fargelegger ett felt for hvert bilde, slik at en søyle vokser oppover for hver kategori. Litt etter litt blir et søylediagram til, og barnet kan lese av diagrammet med øynene: hvilken søyle er høyest, og hvilken er lavest? Å se hvem som har flest og hvem som har færrest blir tydelig når søylene står side om side. Dette knytter sammen tidlig statistikk og tallforståelse opp til 10, i et rolig tempo og helt uten press.`,
    `Tenk deg en haug med ${TN} hulter til bulter på bordet. Oppgaven her er å få orden i kaoset ved å samle ${a} for seg, ${b} for seg og ${c} for seg, og deretter telle hver gruppe nøye. For hvert bilde barnet teller, fargelegges én rute i diagrammet, og slik bygges søylene opp rad for rad. Når alle gruppene er talt, står det ferdige søylediagrammet klart til å leses av. Barnet kan peke på den høyeste søylen og si hvem det er flest av, og finne den laveste for å se hvem det er færrest av. Å sammenligne kolonnene på denne måten øver opp både telling til 10 og den første forståelsen av hvordan tall kan vises som data – trygt og i sitt eget tempo.`,
    `Her starter vi med selve tellingen. Barnet ser flere ${TN} om hverandre og skal finne ut hvor mange det er av hvert slag. Ved å telle opp ${a}, så ${b} og til slutt ${c}, får hver kategori sitt eget tall. Det fine er at tallet ikke bare skrives ned – det fargelegges inn i et søylediagram, ett felt for hvert bilde, slik at hver søyle viser antallet sitt med høyde. Når diagrammet er fylt ut, kan barnet lese av hvilken kolonne som rager høyest og hvilken som er kortest, og dermed se hvem det er flest og færrest av. Slik blir abstrakte tall til noe man kan se og sammenligne, og barnet øver tallforståelse opp til 10 mens den første statistikken tar form, helt uten tidspress.`,
    `Et søylediagram er en av de første måtene barn lærer å vise tall på, og dette arket bygger ett fra bunnen. Først sorteres ${TN} i grupper – ${a}, ${b} og ${c} hver for seg – og så telles hver gruppe rolig opp. For hvert bilde fyller barnet inn én rute i riktig kolonne, og søylene vokser oppover etter hvert som tellingen går. Til slutt står diagrammet ferdig, og nå begynner den morsomste delen: å lese av hva det forteller. Hvilken søyle er den høyeste? Hvem har flest? Og hvem har færrest? Barnet sammenligner kolonnene og oppdager at høyden på en søyle henger sammen med tallet bak den. Dette gir både telleøvelse til 10 og en første smak på hvordan data kan presenteres – uten poeng og uten klokke.`,
    `Det handler om å gjøre tall synlige. På dette arket teller barnet seg gjennom en samling ${TN} og deler dem inn etter type, slik at ${a}, ${b} og ${c} havner i hver sin gruppe. Når én gruppe er ferdig talt, fargelegges ett felt for hvert bilde, og en søyle vokser frem i diagrammet. Slik fortsetter det til alle kolonnene står ferdige, og barnet har laget sitt eget søylediagram. Nå kan diagrammet leses av med ett blikk: den høyeste søylen viser hvem det er flest av, og den laveste viser hvem det er færrest av. Å sammenligne søylene øver opp både nøyaktig telling opp til 10 og evnen til å tolke enkle data – grunnsteiner i tidlig matematikk, lagt trygt og i sitt eget tempo.`,
    `Noen ganger er den beste måten å forstå et tall på å se det vokse. Her får barnet en flokk ${TN} som først skal sorteres i grupper, og deretter telles én og én. ${a} telles opp, ${b} telles opp, og ${c} telles opp, og for hvert bilde fargelegges en rute slik at søylene stiger oppover i diagrammet. Når alt er talt, har barnet et komplett søylediagram å lese av. Da blir det lett å sammenligne: hvilken kolonne er høyest, hvem er det flest av, og hvilken søyle er kortest med færrest? Ved å peke og telle samtidig unngår barnet å hoppe over noen, og øvelsen styrker både tallforståelse til 10 og den spede starten på statistikk – alt i et rolig tempo der det ikke finnes noe som heter feil.`,
    `Dette arket gjør telling til en liten oppdagelsesferd. Barnet får se en blanding av ${TN} og skal samle dem i grupper – ${a}, ${b} og ${c} – før hvert slag telles opp. Det spennende er at hver telling blir til en søyle: ett felt fargelegges for hvert bilde, og kolonnene vokser oppover til et helt søylediagram står ferdig. Nå kan barnet lese av diagrammet og sammenligne søylene med hverandre. Hvilken er den høyeste, og hvem er det dermed flest av? Hvilken er lavest, med færrest? Å se forskjellen i høyde gjør abstrakte tall konkrete og enkle å forstå. Underveis øves nøyaktig telling opp til 10, og barnet får sin første erfaring med å samle, vise og tolke data – trygt, rolig og helt uten press.`,
  ][i % 7];
}

function p3(TN, top, low, i) {
  return [
    `Hele dette arket med ${TN} er helt gratis: skriv det ut på papir eller spill det på nett, akkurat som det passer best. Det kreves ingen innlogging, og det finnes ingen tid og ingen poeng – barnet jobber i sitt eget tempo, helt uten press. Aktiviteten hører til matematikkområdet «Statistikk og sannsynlighet» og passer godt for barn rundt 7–8 år på 2. trinn. Et fint neste steg er å sammenligne kolonnene nærmere: er søylen for ${top} virkelig høyere enn søylen for ${low}, og hvor mange flere?`,
    `Dette ${TN}-arket kan barnet bruke helt gratis, enten ved å skrive det ut eller spille det på nett. Ingen konto, ingen pålogging og ingen klokke som tikker – her er det ingen tid og ingen poeng, bare rolig arbeid i sitt eget tempo. Oppgaven ligger i matematikkdomenet «Statistikk og sannsynlighet» og er laget for barn på omtrent 7–8 år, altså 2. trinn. Når diagrammet er ferdig, kan dere ta et nytt blikk på søylene sammen: er ${top}-søylen høyere enn ${low}-søylen, og hva forteller det om hvor mange det er av hver?`,
    `Du kan skrive ut dette arket med ${TN} eller spille det på nett – det er helt gratis, og det trengs ingen innlogging. Det er heller ingen tid og ingen poeng involvert, så barnet får jobbe i sitt eget tempo uten å føle at noe haster. Aktiviteten er en del av matematikkområdet «Statistikk og sannsynlighet» og passer for barn rundt 7–8 år på 2. trinn. Som et neste steg kan barnet sammenligne søylene grundigere: står søylen for ${top} høyere enn søylen for ${low}? Å sette ord på forskjellen styrker forståelsen av diagrammet.`,
    `Dette er en gratis aktivitet med ${TN} som kan skrives ut eller spilles direkte på nett, helt uten pålogging. Her finnes ingen tid og ingen poeng – barnet bestemmer farten selv og arbeider i sitt eget tempo. Oppgaven hører hjemme i matematikkdomenet «Statistikk og sannsynlighet» og er beregnet på barn på omtrent 7–8 år, altså 2. trinn. Når søylediagrammet er ferdig, er det fint å fortsette med å sammenligne kolonnene: er ${top}-søylen høyere enn ${low}-søylen? La gjerne barnet peke på den høyeste og fortelle hvem det er flest av.`,
    `Arket med ${TN} er gratis å bruke, og du velger selv om du vil skrive det ut eller spille det på nett. Det trengs ingen innlogging, og det er verken tid eller poeng å holde styr på – barnet kan ta seg god tid og jobbe i sitt eget tempo. Innholdet tilhører matematikkområdet «Statistikk og sannsynlighet» og passer for barn rundt 7–8 år på 2. trinn. Et naturlig neste steg er å se nærmere på søylene: er søylen for ${top} høyere enn søylen for ${low}, og hvor stor er forskjellen mellom dem?`,
    `Skriv ut eller spill dette ${TN}-arket på nett – det er helt gratis og krever ingen pålogging. Det finnes ingen tid og ingen poeng her, slik at barnet kan arbeide rolig i sitt eget tempo uten stress. Aktiviteten er knyttet til matematikkdomenet «Statistikk og sannsynlighet» og er laget for barn på omtrent 7–8 år, på 2. trinn. Når diagrammet er fylt ut, kan dere sammenligne kolonnene sammen: er ${top}-søylen høyere enn ${low}-søylen? Å snakke om hvilken som er høyest og lavest hjelper barnet å lese av diagrammet med trygghet.`,
    `Dette arket med ${TN} er gratis, og det kan både skrives ut og spilles på nett etter eget ønske. Ingen innlogging er nødvendig, og det er ingen tid og ingen poeng – barnet får jobbe helt i sitt eget tempo. Oppgaven hører til matematikkområdet «Statistikk og sannsynlighet» og passer godt for barn rundt 7–8 år på 2. trinn. Som et neste steg kan barnet sammenligne de to ytterpunktene i diagrammet: står søylen for ${top} høyere enn søylen for ${low}? Å finne ut hvor mange flere det er, gir fin øvelse i å lese av et søylediagram.`,
  ][i % 7];
}

function buildEntry(deck, i, report) {
  const D = themeDisplay(deck.themeKey);
  const TN = themeNoun(deck.themeKey);
  const cats = [];
  for (const c of deck.categories) {
    if (c.count === 0) continue;
    const r = resolveNo(c.nounKey, c.locName);
    if (!r) { report.unresolved.push(`${c.nounKey} (${deck.themeKey})`); continue; }
    if (r.src === 'needs-plural' || !r.plural) {
      report.needsPlural.push(`"${c.locName}" (${c.nounKey} @ ${deck.themeKey})`);
      continue;
    }
    cats.push({ sing: r.sing, plural: r.plural, gender: r.gender, count: c.count });
  }
  // De-dup by resolved plural: two category slots that resolve to the SAME plural noun (e.g. a
  // "Postbud" + "Postbud 2" image pair) would make "Hvor mange postbuder?" ambiguous and break the
  // honest-count weave/Quiz agreement — keep the FIRST occurrence, drop the rest.
  const seenPl = new Set();
  const deduped = cats.filter((c) => { const k = c.plural.toLowerCase(); if (seenPl.has(k)) { report.dupDropped = report.dupDropped || []; report.dupDropped.push(`${c.plural} @ ${deck.themeKey}`); return false; } seenPl.add(k); return true; });
  cats.length = 0; cats.push(...deduped);
  if (cats.length < 2) { report.droppedDecks.push(`${deck.slug} (only ${cats.length} cats)`); return null; }

  // DISTANCE-2 variant assignment: unique (p1,p2) pair (7x6=42 >= 41), p3=(p1+p2)%7.
  const p1i = i % 7;
  const p2i = Math.floor(i / 7) % 6;
  const p3i = (p1i + p2i) % 7;

  // p2: HONEST-COUNT weave — "3 katter, 4 hunder og 5 ender" (count + lc plural).
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = noList(items);
  const ex = cats.map((c) => lc(c.plural));
  const sorted = [...cats].sort((a, b) => b.count - a.count);
  const top = lc(sorted[0].plural);
  const low = lc(sorted[sorted.length - 1].plural);

  const p2 = [
    `På dette arket teller barnet ${list}. For hvert bilde fargelegges én rute, og søylene vokser oppover til et ferdig søylediagram. Da ser man med ett blikk at ${top} har den høyeste søylen og flest, mens ${low} har den laveste og færrest. Å peke mens man teller hjelper barnet å ikke hoppe over noen, og søylene gjør det lett å kontrollere svaret.`,
    `På dette arket teller barnet ${list}. Hver kategori telles for seg, og ett felt fargelegges for hvert bilde slik at kolonnene fylles opp. Når diagrammet er ferdig, viser den høyeste søylen at det er flest ${top}, og den korteste at det er færrest ${low}. Ved å peke på ett og ett bilde mens det telles, blir det lettere å telle riktig og sjekke svaret mot søylene.`,
    `På dette arket teller barnet ${list}. Tallene fargelegges inn i diagrammet, ett felt om gangen, og etter hvert står søylene side om side. Da er det lett å lese av: ${top} stikker høyest opp med flest, mens ${low} blir stående lavest med færrest. Å følge bildene med fingeren mens man teller gjør at ingen blir glemt, og barnet kan kontrollere svaret ved å se på søylehøyden.`,
    `På dette arket teller barnet ${list}. For hver gruppe fargelegges én rute per bilde, og søylediagrammet bygges opp bit for bit. Når alt er talt, ser barnet at den høyeste søylen tilhører ${top} – det er flest av dem – og den laveste tilhører ${low}, som det er færrest av. Tipset er enkelt: pek mens du teller, så hopper du ikke over noen, og søylene viser om svaret stemmer.`,
    `På dette arket teller barnet ${list}. Hvert bilde gir ett fargelagt felt, og søylene stiger oppover etter hvert som tellingen går. Det ferdige diagrammet forteller alt ved et blikk: ${top} har flest med sin høye søyle, og ${low} har færrest med sin korte. Å peke på bildene underveis hindrer at noe telles dobbelt eller glemmes, og høyden på søylene gjør det enkelt å kontrollere svaret til slutt.`,
    `På dette arket teller barnet ${list}. Etter tur fargelegges ett felt for hvert bilde, og kolonnene vokser til et søylediagram man kan lese av. Den høyeste søylen viser at det er flest ${top}, og den korteste at det er færrest ${low} – forskjellen ses med en gang. Når barnet peker mens det teller, blir tellingen tryggere, og diagrammet lar barnet sjekke at svaret er riktig.`,
  ][p2i];

  // practiceProblems — "Hvor mange {flertall}?" (invariant, no gender split)
  const pp = cats.map((c) => ({ q: `Hvor mange ${lc(c.plural)}?`, a: String(c.count) }));

  return {
    slug: deck.slug,
    variantShape: deck.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: '2-trinn' },
    levels: ['1-trinn', '2-trinn'],
    eyebrow: 'Oppgave: Søylediagram',
    h1: `Søylediagram med ${TN} – tell og fyll ut diagrammet (2. trinn)`,
    strand: 'Statistikk og sannsynlighet',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), D, '1. til 2. trinn'],
    p1: p1(TN, [ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0]], p1i),
    p2,
    p3: p3(TN, top, low, p3i),
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

// carousel post-pass: neighbours at [1,2,5,11], label 'Søylediagram – <h1Display>'.
entries.forEach((e, i) => {
  e.carousel = [1, 2, 5, 11].map((off) => {
    const n = entries[(i + off) % entries.length];
    return { label: 'Søylediagram – ' + themeDisplay(n.coordinate.theme), href: n.slug };
  });
});

// --- summary ---
console.log('=== gen-no-chartcount summary ===');
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

// --- honest-count assertion: every practiceProblem answer must appear with the same number
// in p2's count list (both come from facts, but assert it — defence in depth) ---
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
let cur = { _note: 'NO landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(NO, 'utf8')); } catch (e) {}
const keep = (cur.landings || []).filter((l) => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note, landings: keep.concat(entries) };
JSON.parse(JSON.stringify(merged));
fs.writeFileSync(NO, JSON.stringify(merged, null, 2) + '\n');
console.log('\nwrote ' + entries.length + ' chart-count entries; no.json total landings now ' + merged.landings.length);
