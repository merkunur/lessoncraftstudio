#!/usr/bin/env node
/**
 * gen-sv-chartcount.js — generate the sv chart-count (Räkna i diagram) landing
 * entries on the 41-theme countable catalog (the 49-theme facts minus 8 culled
 * non-countable/locale-invalid themes that match the validity gate).
 *
 * Honest-count binding: per-category count = facts.count (= rendered bar height,
 * the manifest icon occurrences). The native-Swedish plural is resolved from the
 * facts `plural` when correct, else an OVERRIDE map authored + verified by a native
 * förskola/lågstadie educator (vocab gaps, icon-misdepictions, mechanical errors).
 * Prose p2 counts AND practiceProblems answers both draw from the SAME facts →
 * agree by construction with the chart. Operator gate: ZERO mismatches.
 *
 * Ledger: K.MD.B.3 (recognition), strand Sannolikhet och statistik (Lgr22),
 * Förskola–åk 1 span (talområdet 0–10), "Hur många {plural}?" framing.
 *
 * Reads:  scripts/seo-landing/_sv-cc-facts.json      (Stage-A server dump)
 *         REFERENCE TRANSLATIONS/image-vocabulary.js  (sv [sing,plural,gender])
 *         frontend/config/topics-taxonomy.json        (axes.theme.<key>.name.sv)
 * Writes: filter OUT existing chart-count landings in sv.json, append the new set
 *         (idempotent), preserve the rest.
 *
 * Usage: node scripts/seo-landing/gen-sv-chartcount.js [--dry-run]
 */
'use strict';
const fs = require('fs');

const DRY = process.argv.includes('--dry-run');
const SV = 'frontend/content/seo-landing/sv.json';

// Cull: themes the validity gate excludes for "count how many objects" — non-
// countable-discrete (activities=verbs/sports, emotions=faces, weather/seasons=
// abstract, body_parts per operator, 4th_of_july per operator). Decks stay /decks/,
// no landing. These match the 8 NOT in the 41 valid coords.
const CULL_THEMES = new Set([
  '4th_of_july', 'activities', 'body_parts', 'emotions',
  'spring', 'summer', 'winter', 'weather',
]);

// --- load sources ---
const facts = JSON.parse(fs.readFileSync('scripts/seo-landing/_sv-cc-facts.json', 'utf8'));
const tax = JSON.parse(fs.readFileSync('frontend/config/topics-taxonomy.json', 'utf8'));
const vmod = {};
new Function('module', fs.readFileSync('REFERENCE TRANSLATIONS/image-vocabulary.js', 'utf8') + '\nmodule.exports=IMAGE_VOCABULARY;')(vmod);
const VOCAB = vmod.exports;

// [singular, plural, gender] override map — resolved by nounKey, checked BEFORE the
// facts plural. Authored + verified by a native sv educator. Three classes:
//  (a) VOCAB GAPS — facts.plural === null (tree species, dragonfruit, octogon).
//  (b) ICON-MISDEPICTIONS — facts label mis-describes the rendered ICON (translated
//      from the es icon-verified OVERRIDE: same thumbnails).
//  (c) MECHANICAL PLURAL ERRORS — facts ran a naive +ar/+er rule; the real sv plural
//      differs (latin -us, vowel-stems, -us/-an/-in declensions, double-plurals,
//      mass/zero-plural neuters). Each line below is the CORRECT teacher-facing form.
const OVERRIDE = {
  // (a) vocab gaps — tree theme (icon = a TREE) + dragonfruit + octogon
  palm:        ['Palm', 'Palmer', 'n'],            // en palm → palmer
  fir:         ['Gran', 'Granar', 'n'],            // en gran → granar
  oak:         ['Ek', 'Ekar', 'n'],               // en ek → ekar
  cedar:       ['Ceder', 'Cedrar', 'n'],           // en ceder → cedrar
  walnut:      ['Valnötsträd', 'Valnötsträd', 't'], // ett valnötsträd → valnötsträd (zero)
  maple:       ['Lönn', 'Lönnar', 'n'],            // en lönn → lönnar
  dragonfruit: ['Drakfrukt', 'Drakfrukter', 'n'],  // en drakfrukt → drakfrukter
  octogon:     ['Åttahörning', 'Åttahörningar', 'n'], // en åttahörning → åttahörningar

  // (b) icon-misdepictions — verified against the deck thumbnail (es-parity icons)
  liberty:       ['Frihetsgudinna', 'Frihetsgudinnor', 'n'],  // icon: Statue of Liberty (NOT "frihet")
  'uncle-sam':   ['Onkel Sam-figur', 'Onkel Sam-figurer', 'n'],
  uncle_sam:     ['Onkel Sam-figur', 'Onkel Sam-figurer', 'n'],
  autumn:        ['Höstträd', 'Höstträd', 't'],               // icon: autumn-foliage tree (NOT "höst")
  delivery:      ['Brevbärare', 'Brevbärare', 'n'],           // icon: mail-carrier person
  santa:         ['Tomte', 'Tomtar', 'n'],
  'santa-claus': ['Tomte', 'Tomtar', 'n'],
  santa_claus:   ['Tomte', 'Tomtar', 'n'],
  note:          ['Not', 'Noter', 'n'],                       // icon: musical note
  spanner:       ['Skiftnyckel', 'Skiftnycklar', 'n'],
  rocker:        ['Gungstol', 'Gungstolar', 'n'],
  stamp:         ['Frimärke', 'Frimärken', 't'],              // icon: postage stamp (NOT "stämplar"=rubber stamps)
  truck:         ['Postbil', 'Postbilar', 'n'],               // post_office icon: mail truck (svName Postbil)
  bed:           ['Sjukhussäng', 'Sjukhussängar', 'n'],       // hospital bed (match svName)
  bracelet:      ['Sjukhusarmband', 'Sjukhusarmband', 't'],   // ett armband → armband (zero); match svName
  cape:          ['Cape', 'Capes', 'n'],                      // superhero cape (NOT "kapa"=to cut)

  // (c) mechanical plural errors — corrected to the standard sv plural
  balloon:    ['Ballong', 'Ballonger', 'n'],          // en ballong → ballonger (NOT ballongar)
  flamingo:   ['Flamingo', 'Flamingor', 'n'],          // en flamingo → flamingor
  dresser:    ['Byrå', 'Byråer', 'n'],                 // en byrå → byråer
  eclair:     ['Eclair', 'Eclairer', 'n'],             // en éclair → éclairer
  'bathing-suit': ['Baddräkt', 'Baddräkter', 'n'],     // en baddräkt → baddräkter
  curtains:   ['Gardin', 'Gardiner', 'n'],             // gardiner already pl (NOT "gardinerar")
  pliers:     ['Tång', 'Tänger', 'n'],                 // en tång (verktyg) → tänger (NOT tångar=seaweeds)
  mango:      ['Mango', 'Mangor', 'n'],                // en mango → mangor
  watermelon: ['Vattenmelon', 'Vattenmeloner', 'n'],   // en vattenmelon → vattenmeloner
  pineapple:  ['Ananas', 'Ananaser', 'n'],             // en ananas → ananaser
  salamander: ['Salamander', 'Salamandrar', 'n'],      // en salamander → salamandrar
  oyster:     ['Ostron', 'Ostron', 't'],               // ett ostron → ostron (zero)
  iguana:     ['Leguan', 'Leguaner', 'n'],             // en leguan → leguaner
  pelican:    ['Pelikan', 'Pelikaner', 'n'],           // en pelikan → pelikaner
  toucan:     ['Tukan', 'Tukaner', 'n'],               // en tukan → tukaner
  asteroid:   ['Asteroid', 'Asteroider', 'n'],         // en asteroid → asteroider
  comet:      ['Komet', 'Kometer', 'n'],               // en komet → kometer
  medicine:   ['Medicin', 'Mediciner', 'n'],           // en medicin → mediciner
  ambulance:  ['Ambulans', 'Ambulanser', 'n'],         // en ambulans → ambulanser
  compass:    ['Kompass', 'Kompasser', 'n'],           // en kompass → kompasser
  'electric-drill': ['Borrmaskin', 'Borrmaskiner', 'n'], // en borrmaskin → borrmaskiner
  excavator:  ['Grävmaskin', 'Grävmaskiner', 'n'],     // en grävmaskin → grävmaskiner
  cymbals:    ['Cymbal', 'Cymbaler', 'n'],             // cymbaler already pl (NOT "cymbalerar")
  violin:     ['Fiol', 'Fioler', 'n'],                 // en fiol → fioler
  chameleon:  ['Kameleont', 'Kameleonter', 'n'],       // en kameleont → kameleonter (facts gave singular)
  carrot:     ['Morot', 'Morötter', 'n'],              // en morot → morötter (umlaut plural)
  garlic:     ['Vitlök', 'Vitlökar', 'n'],             // en vitlök → vitlökar
  'native-american': ['Uramerikan', 'Uramerikaner', 'n'], // svName "Indianer" already pl + dated; native modern term
  'tyrannosaurus-rex': ['Tyrannosaurus rex', 'Tyrannosaurus rex', 'n'], // invariant (NOT "Rexar")
};

function resolveSv(nounKey) {
  const base = nounKey.replace(/-\d+$/, '');
  if (OVERRIDE[nounKey]) return OVERRIDE[nounKey];
  if (OVERRIDE[base]) return OVERRIDE[base];
  if (OVERRIDE[base.replace(/-/g, '_')]) return OVERRIDE[base.replace(/-/g, '_')];
  const cands = [nounKey, nounKey.replace(/-/g, '_'), nounKey.replace(/-/g, '')];
  if (base !== nounKey) cands.push(base, base.replace(/-/g, '_'), base.replace(/-/g, ''));
  for (const k of cands) { if (VOCAB[k] && VOCAB[k].sv) return VOCAB[k].sv; }
  return null;
}

// proper nouns whose first letter must NOT be lowercased mid-sentence
const PROPER = new Set(['Onkel Sam-figur', 'Onkel Sam-figurer', 'Tyrannosaurus rex']);
const lc = (s) => PROPER.has(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);

function themeDisplay(themeKey) {
  const e = tax.axes.theme[themeKey];
  return (e && e.name && e.name.sv) ? e.name.sv : themeKey;
}

// list-join: "3 fiskar, 4 rävar och 5 kameler"
function svList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' och ' + items[items.length - 1];
}

// --- native-sv prose, du-register, "ditt barn", classify-count-represent (data),
// warm/no-shame, talområdet 0–10, no timer/points. theme + the deck's own nouns
// woven through. ex = 2–3 of the deck's category nouns (plural, lowercased). ---
function p1(T, ex, i) {
  const [a, b, c] = ex;
  return [
    `Det här arbetsbladet med temat ${T} bjuder in ditt barn att räkna och ordna data på ett konkret sätt. Först sorterar barnet bilderna i grupper – det lägger ${a} för sig och ${b} för sig – och räknar sedan hur många det finns av varje slag. För varje bild färgar ditt barn en ruta i rätt kolumn, och så växer ett diagram eller piktogram fram steg för steg. När ${a}, ${b} och ${c} står i var sin stapel ser ditt barn genast vilken grupp som är störst. På så vis övar barnet en grundläggande matematisk tanke: att klassificera efter kategori, räkna och jämföra mängder, allt inom talområdet 0–10 och i sin egen lugna takt.`,
    `Med den här räkneuppgiften i ${T} får ditt barn svara på frågan «hur många finns det?». Bladet blandar flera olika bilder – ${a}, ${b}, ${c} och fler – och uppgiften är att samla ihop de likadana, räkna varje grupp och färga en stapel ruta för ruta tills ett piktogram är klart. Det är en första bekantskap med att organisera data: att sortera ${a} och ${b} efter sort, räkna hur många det blir och jämföra vilken grupp som är flest. Ditt barn pekar på varje bild medan det räknar, helt utan tidspress och utan poäng att jaga.`,
    `I den här aktiviteten med ${T} tittar ditt barn på bilderna, lägger de likadana tillsammans – ${a} med ${a}, ${b} med ${b} – räknar hur många det finns av varje och färgar de rutor som hör till. När bladet är klart bildar kolumner som ${c} ett piktogram som går att läsa med en enda blick. Uppgiften övar räknandet och klassificeringen på ett påtagligt och visuellt sätt, lugnt och tryggt. Ditt barn får ta all den tid det behöver, för det finns ingen klocka och inga stjärnor här, bara glädjen i att se mängderna växa fram.`,
    `Det här räkne- och diagrambladet med ${T} ger ditt barn en tydlig uppgift: att klassificera bilderna efter sort – ${a}, ${b}, ${c} och fler – räkna hur många det finns av varje slag och färga en ruta per bild tills varje stapel reser sig. Så lär sig ditt barn att ordna data och jämföra mängder, och ser direkt vilken grupp som har flest och vilken som har minst. Allt håller sig inom talområdet 0–10, så uppgiften förblir överskådlig. Du kan sitta bredvid, räkna med och peka tillsammans, helt utan press och utan bedömning.`,
  ][i % 4];
}

function p3(T, top, i) {
  return [
    `Bladet med ${T} går att skriva ut som PDF för att arbeta på papper, eller att spela direkt på skärmen – alltid gratis och utan att registrera sig. Det finns inga tidtagarur och inga poäng: ditt barn bestämmer takten själv, utan skam över att räkna fel, för att räkna om en stapel – titta en gång till på kolumnen med ${top}, till exempel – är en del av att lära sig. Aktiviteten knyter an till Lgr22 och området Sannolikhet och statistik inom matematiken, och passar fint för förskola till årskurs 1, ungefär 5–7 år. Som ett nästa steg kan ni jämföra kolumnerna och se vilken som är högst.`,
    `Du kan ladda ner PDF:en med ${T} för att skriva ut, eller spela den interaktiva versionen online – gratis och utan konto. Ingen klocka och inga poäng: varje barn går fram i sin egen takt, med värme och utan press. Aktiviteten knyter an till Lgr22 inom området Sannolikhet och statistik (matematik) och är tänkt för förskola till årskurs 1, ungefär 5–7 år. När ditt barn har räknat klart är det fint att jämföra staplarna och se om kolumnen med ${top} är den högsta.`,
    `Helt gratis: skriv ut bladet med ${T} för att arbeta på papper, eller spela det online utan att behöva registrera dig. Det finns inga tidtagarur och inga poäng; att granska och räkna en gång till är också att lära sig. Bladet knyter an till Lgr22, området Sannolikhet och statistik (matematik), och passar barn i förskola till årskurs 1, i åldern 5–7 år. Nästa steg är att jämföra vilken kategori som har flest bilder – är det kanske ${top}?`,
    `Det här diagrammet med ${T} finns gratis att skriva ut som PDF eller spela online, utan registrering. Inga klockor och inga poäng: ditt barn sätter takten själv, i en vänlig ton. Bladet knyter an till Lgr22, inom området Sannolikhet och statistik (matematik), och passar fint för förskola till årskurs 1, ungefär 5–7 år. Till sist kan ni jämföra kolumnerna – är stapeln med ${top} den högsta? – och så befäster ni läsningen av piktogrammet tillsammans.`,
  ][i % 4];
}

function buildEntry(deck, i, report) {
  const T = themeDisplay(deck.themeKey);
  const cats = [];
  for (const c of deck.categories) {
    const sv = resolveSv(c.nounKey);
    if (!sv) { report.unresolved.push(`${c.nounKey} (${deck.themeKey})`); continue; }
    cats.push({ sing: sv[0], plural: sv[1], gender: sv[2] || 'n', count: c.count });
  }
  if (cats.length < 2) { report.droppedDecks.push(`${deck.slug} (only ${cats.length} resolved cats)`); return null; }

  // p2: HONEST-COUNT weave — "3 fiskar, 4 rävar och 5 kameler" (count + lc plural)
  const items = cats.map((c) => `${c.count} ${lc(c.count === 1 ? c.sing : c.plural)}`);
  const list = svList(items);
  const ex = cats.map((c) => lc(c.plural));
  const top = lc([...cats].sort((a, b) => b.count - a.count)[0].plural);

  const p2 = (i % 2 === 0)
    ? `I det här arbetsbladet räknar ditt barn ${list}. När det färgar en ruta för varje bild visar den högsta kolumnen med en enda blick vilken grupp som har flest och vilken som har minst. Att peka med fingret på varje bild medan man räknar hjälper ditt barn att inte tappa räkningen och att kontrollera svaret.`
    : `Här räknar ditt barn ${list}. Varje grupp får sin egen kolumn, så när bladet är klart syns det direkt vilken kategori som blev högst och vilken som blev lägst. Att räkna och samtidigt peka på varje bild gör att ditt barn inte hoppar över någon och kan granska svaret i lugn och ro.`;

  // practiceProblems — "Hur många {plural} finns det?" (invariant, no gender split)
  const pp = cats.map((c) => ({
    q: `Hur många ${lc(c.plural)} finns det?`,
    a: String(c.count),
  }));

  return {
    slug: deck.slug,
    variantShape: deck.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'chart-count', mode: null, theme: deck.themeKey, level: 'ak-1' },
    levels: ['forskola', 'ak-1'],
    eyebrow: 'Arbetsblad: Räkna i diagram',
    h1: `Räkna och fyll i diagrammet: ${T}`,
    strand: 'Sannolikhet och statistik',
    standard: 'K.MD.B.3',
    slotTokens: [...cats.map((c) => c.sing), T, 'Förskola till åk 1'],
    p1: p1(T, [ex[0], ex[1] || ex[0], ex[2] || ex[1] || ex[0]], i),
    p2,
    p3: p3(T, top, i),
    canonicalDeckSlug: deck.slug,
    carousel: [],
    practiceProblems: pp,
    ...(deck.siblings.length > 1 ? { collapseSiblings: deck.siblings } : {}),
  };
}

// --- build ---
const culled = facts.filter((d) => CULL_THEMES.has(d.themeKey)).map((d) => d.themeKey);
const targets = facts.filter((d) => !CULL_THEMES.has(d.themeKey));
const report = { unresolved: [], droppedDecks: [] };
const entries = [];
targets.forEach((d, i) => { const e = buildEntry(d, i, report); if (e) entries.push(e); });

// --- summary ---
console.log('=== gen-sv-chartcount summary ===');
console.log('themes processed (countable):', targets.length, '/ facts', facts.length);
console.log('culled (non-countable, ' + culled.length + '):', culled.join(', '));
console.log('categories skipped (unresolved, ' + report.unresolved.length + '):', report.unresolved.join(', ') || '(none)');
console.log('decks dropped (<2 cats, ' + report.droppedDecks.length + '):', report.droppedDecks.join(', ') || '(none)');
console.log('total entries built:', entries.length);
if (entries.length) {
  const s = entries[0];
  console.log('--- sample entry [' + s.slug + '] ---');
  console.log('  h1:', s.h1);
  console.log('  p2:', s.p2);
  console.log('  practiceProblems:', JSON.stringify(s.practiceProblems));
}

// --- honest-count assertion: every practiceProblem answer must appear with the same
// number in p2's count list (defence in depth — both come from facts but assert it) ---
let mismatch = 0;
for (const e of entries) {
  for (const pp of e.practiceProblems) {
    const noun = pp.q.replace(/^Hur många /, '').replace(/ finns det\?$/, '');
    const re = new RegExp('(\\d+) ' + noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const m = e.p2.match(re);
    if (m && m[1] !== pp.a) { console.error('  HONEST-COUNT MISMATCH ' + e.slug + ': p2 "' + m[0] + '" vs pp a=' + pp.a); mismatch++; }
  }
}
if (mismatch) { console.error('HONEST-COUNT: ' + mismatch + ' mismatch(es) — halting.'); process.exit(1); }
console.log('honest-count assertion: clean (p2 counts ↔ practiceProblems answers agree)');

if (DRY) { console.log('\n[DRY-RUN] no write.'); process.exit(0); }

// --- read / filter-out existing chart-count / append / write (idempotent) ---
let cur = { _note: 'SV landing copy.', landings: [] };
try { cur = JSON.parse(fs.readFileSync(SV, 'utf8')); } catch (e) {}
const keep = (cur.landings || []).filter((l) => l.coordinate.type !== 'chart-count');
const merged = { _note: cur._note, landings: keep.concat(entries) };
JSON.parse(JSON.stringify(merged)); // validate serializable
fs.writeFileSync(SV, JSON.stringify(merged, null, 2) + '\n');
console.log('\nwrote ' + entries.length + ' chart-count entries; sv.json total landings now ' + merged.landings.length);
