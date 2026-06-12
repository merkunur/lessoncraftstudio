#!/usr/bin/env node
/* NL picture-sort "-vs-" PAIRS × kleuters, READINESS (Visuele waarneming en logisch denken — fork ②:
 * perceptual-identity criterion → visual/logic bucket). Clone of gen-sv-picturesort.js with native
 * Dutch frames. Each page sorts the pictures of TWO themes (A,B) into two groups; the body references
 * BOTH themes' concrete nouns (the -vs- differentiation).
 *
 * Dutch definite plural is uniformly "de "+plIndef — render2 is PURE SUBSTITUTION (nl-render.js spirit):
 *   {A_PL}/{B_PL}   -> plIndef    ("met {A_PL} en {B_PL}")
 *   {A_DEF}/{B_DEF} -> plDef     ("leg {A_DEF} bij elkaar")
 *   {A_H1}/{B_H1}   -> h1Display (display)
 *
 * NO `standard` key (readiness). CHART-COUNT FENCE (nl): sort/group lexicon, NEVER count-framing —
 * no hoeveel/aantal/diagram at all; tel-stem words allowed ONLY inside a negation window
 * ("er wordt niet geteld", "tellen hoeft niet", "geen telwerk"). \b-bounded match so "vertellen"
 * (to tell) never false-positives. 16×12=192 cells (§22.1 cell-space invariant, sv needed it for
 * 151 pairs; nl pair-breadth verified at enum time — invariant logged).
 * Usage: node scripts/seo-landing/gen-nl-picturesort.js
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./nl-themes');
const NL = 'frontend/content/seo-landing/nl.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/nl-picture-sort-coordinates.json', 'utf8')).coordinates;

function render2(tpl, vals) {
  let s = tpl;
  Object.keys(vals).forEach(function (k) {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vals[k]);
  });
  return s;
}

// ===== Frames (T1 native nl; {A_PL}/{B_PL}/{A_DEF}/{B_DEF} markers). Warm je/jouw-kind register, kleuters.
// Both themes referenced in every frame. SORT/GROUP mechanic; counting only as the negated divergence. =====
const SKEL = [
  'Op dit werkblad voor kleuters liggen {A_PL} en {B_PL} gezellig door elkaar – alles staat kriskras op één blad. De opdracht voor je kind: sorteer elk plaatje in de goede groep, {A_DEF} bij elkaar en {B_DEF} bij elkaar. Er wordt hier niet geteld; het draait om kijken en sorteren. Bij elk plaatje denkt je kleuter na: bij welke groep hoort dit, wat is dezelfde soort, wat hoort bij elkaar? Zo leert het spullen indelen in twee groepen en ordenen op wat de plaatjes gemeen hebben – een belangrijke vaardigheid op weg naar school. Kijken en sorteren dus, in het eigen tempo van je kind.',
  'Hier zijn {A_PL} en {B_PL} flink door elkaar geraakt – een vrolijke wirwar van plaatjes op één blad. Je kind bekijkt rustig elk plaatje en legt het waar het thuishoort: {A_DEF} hierheen, {B_DEF} daarheen. Tellen hoeft niet; alleen herkennen wat bij elkaar hoort en wat dezelfde soort is. Juist dat sorteren en ordenen is echte kleuterkost: je kind ziet overeenkomsten, vergelijkt en deelt in twee groepen in. Deze rustige kijk-en-sorteeroefening is leuk én versterkt het logische denken – zonder druk en zonder klok. Geef gerust een complimentje voor elk plaatje dat in de goede groep belandt.',
  'Op het werkblad liggen {A_PL} en {B_PL} wild door elkaar, zij aan zij. Nu mag je kind opruimen – met de ogen: het sorteert elk plaatje in twee groepen, {A_DEF} apart en {B_DEF} apart. Welke dingen horen bij elkaar, en welke vormen een eigen soort? Een sorteeropdracht als deze oefent het ordenen: goed vergelijken en indelen op overeenkomsten. Een waardevolle vaardigheid waarmee je kind straks op school gestructureerd leert denken. Geteld wordt er niet – het gaat alleen om de vraag bij welke groep elk plaatje hoort. Neem er samen de tijd voor en geniet van het sorteren.',
  'Stel je een blad voor waarop {A_PL} en {B_PL} kriskras door elkaar liggen. Precies dat vind je hier – en je kind schept orde. Het bekijkt elk plaatje en beslist: hoort dit bij {A_DEF} of bij {B_DEF}? Plaatje voor plaatje verhuist naar de goede groep. Al sorterend oefent je kleuter het ordenen: het herkent wat dezelfde soort is, vergelijkt en groepeert op wat bij elkaar hoort. Die vaardigheid is een stevige bouwsteen op weg naar school. En het mooie: hier wordt gekeken en gesorteerd, nooit geteld. Elk goed geplaatst plaatje mag gevierd worden.',
  '{A_PL} en {B_PL} hebben zich grondig vermengd op dit werkblad – hoog tijd om te sorteren! Je kind brengt elk plaatje naar de goede groep: {A_DEF} vormen de ene soort en {B_DEF} de andere. Bij elk plaatje bedenkt het wat bij elkaar hoort en wat apart moet. Zo groeit begrip van groepen en kenmerken – sorteren en ordenen als echte vaardigheid op weg naar school. Hier telt niemand iets; het draait alleen om kijken, vergelijken en samenleggen. Helemaal zonder tijdsdruk en zonder punten, in jullie eigen tempo, met veel complimentjes.',
  'Op dit kleuterwerkblad wachten {A_PL} en {B_PL} door elkaar heen op een beetje orde. Je kind pakt elk plaatje aan en legt het in zijn groep: {A_DEF} samen en {B_DEF} samen. Wat hoort bij elkaar, en wat vormt een eigen soort? Juist dat vergelijken en groeperen is ordenen – een vaardigheid waarmee je kind later gedachten én taken leert structureren. Er valt niets te tellen; je kind kijkt, herkent wat dezelfde soort is en sorteert. Een rustige, vriendelijke oefening zonder stopwatch – kijken en sorteren, niet tellen, helemaal in het tempo van je kleuter.',
  'Hier zie je {A_PL} en {B_PL} vrolijk door elkaar op één werkblad. Je kind sorteert ze in twee groepen: alles wat bij {A_DEF} hoort aan de ene kant, alles wat bij {B_DEF} hoort aan de andere. Het bekijkt elk plaatje aandachtig en bedenkt wat bij elkaar past. Dit sorteren oefent het ordenen: letten op kenmerken en groepen vormen. Een belangrijke vaardigheid op weg naar school. Geteld wordt er niets – alleen de vraag bij welke groep een plaatje hoort doet ertoe. Complimentjes en geduld maken de oefening extra fijn.',
  'Op het blad zijn {A_PL} en {B_PL} behoorlijk gemengd – en je kind brengt de boel weer op orde. Het sorteert elk plaatje in de goede groep: {A_DEF} apart, {B_DEF} apart. Welke dingen horen bij elkaar, wat is dezelfde soort? Door te sorteren en te ordenen leert je kleuter overeenkomsten herkennen en indelen op kenmerken – een basisvaardigheid voor gestructureerd denken op school. Niemand hoeft hier te tellen; het gaat om kijken, vergelijken en goed neerleggen. Een ontspannen oefening zonder druk en zonder tijdslimiet, met een complimentje voor elke groep die af is.',
  'Een vrolijk allegaartje wacht je kind op dit kleuterblad: {A_PL} en {B_PL} liggen door elkaar en willen geordend worden. Met de ogen als gereedschap deelt je kind ze in twee groepen in – {A_DEF} verzamelen zich op één plek, {B_DEF} op een andere. Bij elk plaatje staat het even stil: wat hoort bij elkaar en wat vormt een eigen soort? Zo sorteren is ordenen: je kleuter let op kenmerken, vergelijkt en groepeert op gelijkenis. Dat versterkt stap voor stap het logische denken op weg naar school. Tellen komt er nooit aan te pas – alleen rustig kijken en sorteren, in het eigen tempo en met een complimentje voor elke treffer.',
  'Stel: een bladzijde vol {A_PL} en {B_PL} door elkaar, zonder enige orde. Hier mag je kind degene zijn die dat oplost. Rustig en stap voor stap verhuist elk plaatje naar waar het hoort: {A_DEF} in de ene groep, {B_DEF} in de andere. Wat verbindt de dingen in een groep, en wat maakt de andere anders? Dit sorteerspel oefent het ordenen – patronen zien, vergelijken en indelen op kenmerken. Een bouwsteen die je kind ver draagt op school. Op dit blad hoeft niets geteld te worden; alleen de groep waar elk plaatje bij hoort is belangrijk. Zit er gezellig naast, stel kleine vragen en vier elk goed geplaatst plaatje.',
  'Dit werkblad begint met een heerlijke rommel: {A_PL} en {B_PL} liggen kruislings door elkaar. Je kind schept orde door plaatje voor plaatje te sorteren in twee duidelijke groepen, {A_DEF} apart en {B_DEF} apart. Wat is dezelfde soort, en wat hoort er niet bij? Door zo te groeperen oefent je kleuter het ordenen – gemeenschappelijke kenmerken herkennen en daarop indelen. Die vaardigheid helpt je kind geordend te denken, nu in de kleuterklas en straks op school. Hier wordt gekeken en gesorteerd, nooit geteld. Gun de oefening alle tijd, zonder stopwatch en zonder punten, en strooi onderweg met aanmoediging.',
  'Twee soorten plaatjes, één rommelig blad: {A_PL} en {B_PL} liggen door elkaar te wachten op je kind. Met de blik haalt je kleuter de boel uit elkaar en sorteert elk plaatje in zijn groep – {A_DEF} horen op de ene plek thuis, {B_DEF} op de andere. Bij elk plaatje vraagt het zich af: hoort dit hier of daar, wat is dezelfde soort? Zo sorteren en ordenen legt de basis voor logisch denken, en het is een echte kleutervaardigheid richting de basisschool. Tellen is nergens voor nodig; alleen kijken, vergelijken en goed neerleggen is genoeg. Een vriendelijke, rustige oefening samen, helemaal zonder druk.',
  'Op deze bladzijde hebben {A_PL} en {B_PL} zich flink gemengd, en nu wordt het tijd om dat uit te zoeken. Je kind bekijkt rustig één plaatje tegelijk en beslist bij welke groep het hoort: alles wat bij {A_DEF} hoort bij elkaar, alles wat bij {B_DEF} hoort apart. Welke dingen horen samen, en wat vormt een eigen groep? Al sorterend oefent je kleuter het ordenen – vergelijken, overeenkomsten zien en indelen op kenmerken. Een waardevolle vaardigheid als voorbereiding op school. Geteld wordt er helemaal niets; de opdracht gaat alleen over wat bij elkaar hoort. Neem de tijd, praat samen over de plaatjes en geef een complimentje bij elke goede keuze.',
  'Wat een mengelmoes! Op dit kleuterblad liggen {A_PL} en {B_PL} door elkaar heen, zonder enige volgorde. Je kind krijgt de mooie taak om met de ogen op te ruimen en elk plaatje in de goede groep te leggen – {A_DEF} verzamelen, {B_DEF} verzamelen. Bij elk plaatje denkt je kleuter na: wat hoort samen, wat is dezelfde soort? Deze oefening in sorteren en ordenen traint het logische denken en het indelen in twee groepen op gemeenschappelijke kenmerken – belangrijke stappen richting school. Tellen hoeft hier niet; alles draait om kijken, vergelijken en goed plaatsen. Een rustig klusje zonder tijdslimiet en zonder punten, op het eigen tempo van je kind en met veel complimentjes.',
  'Hier liggen {A_PL} en {B_PL} gemengd in één vrolijke berg op het werkblad. Je kind schept orde door elk plaatje te leggen waar het thuishoort: {A_DEF} vormen de ene soort en {B_DEF} de andere. Wat verbindt de dingen binnen een groep? Al sorterend traint je kleuter het ordenen – kenmerken opmerken, vergelijken en indelen op gelijkenis. Dat versterkt het logische denken en is een fijne voorbereiding op school. Op dit blad wordt nooit geteld; het belangrijkste is alleen bij welke groep elk plaatje hoort, niet hoe groot iets is. Zit dicht bij je kind, denk samen na en vier rustig elk plaatje dat goed terechtkomt.',
  'Op dit blad liggen {A_PL} en {B_PL} door elkaar, en je kind mag degene zijn die alles netjes uitzoekt. Plaatje voor plaatje beslist het welke groep past: {A_DEF} horen bij de ene soort, {B_DEF} bij de andere. Wat hebben de dingen in een groep met elkaar gemeen, en waarom horen de andere apart? Zo sorteren en ordenen oefent je kleuter in overeenkomsten zien, vergelijken en indelen op kenmerken – een basisvaardigheid die meegaat tot ver op school. Hier wordt alleen gekeken en gesorteerd, nooit geteld. Laat het lekker lang duren, zonder stopwatch en zonder punten, en geef een warm complimentje voor elk plaatje dat zijn groep vindt.',
];
const P2 = [
  'Zo werkt het: je kind bekijkt de gemengde plaatjes en legt ze stuk voor stuk in een van de twee groepen – bij {A_DEF} of bij {B_DEF}. Bij elk plaatje beslist het wat bij elkaar hoort. Denk gerust samen hardop na: bij welke groep hoort deze? Geef een complimentje bij elke keuze, ook als het even duurt. Er is geen tijdslimiet en er zijn geen punten – alleen kijken, vergelijken en sorteren in jullie eigen tempo.',
  'Ga er rustig samen voor zitten en bekijk de gemengde plaatjes. Je kind sorteert ze in twee groepen: {A_DEF} aan de ene kant, {B_DEF} aan de andere. Vraag gerust: wat hebben deze dingen met elkaar gemeen? Zo leert je kind kenmerken herkennen en vergelijken. Geteld wordt er niet – het gaat alleen om wat dezelfde soort is. Helemaal zonder druk, met veel geduld en complimentjes.',
  'Deze oefening is heerlijk overzichtelijk: plaatje bekijken, nadenken, in de goede groep leggen. Je kind houdt {A_DEF} en {B_DEF} uit elkaar en geeft elk plaatje zijn plek. Jij kunt meedoen door samen te bedenken wat bij elkaar hoort. Belandt er iets in de verkeerde groep, dan kijken jullie gewoon nog een keer. Geen telwerk, geen stopwatch – alleen rustig sorteren en ordenen.',
  'Laat je kind in het eigen tempo werken. Het bekijkt elk plaatje en beslist of het bij {A_DEF} of bij {B_DEF} hoort. Al sorterend wordt het ordenen steeds vertrouwder – een belangrijke kleutervaardigheid. Stel af en toe een vraagje: waarom past deze hier? Dan wordt het sorteren vanzelf een gesprekje. Om tellen draait het hier nooit; altijd om welke dingen samen een groep vormen.',
  'Houd het licht en gezellig: je kind kijkt, vergelijkt en sorteert. De gemengde plaatjes verdeelt het in twee soorten – {A_DEF} en {B_DEF}. Elk plaatje krijgt zijn plek in de goede groep. Een complimentje helpt meer dan verbeteren, dus vier elke goede keuze. Er zijn geen punten en geen tikkende klok – alleen het rustige ordenen op kenmerken, helemaal zonder te tellen.',
  'Je kind oefent hier vooral het goed kijken: welke plaatjes horen bij {A_DEF}, welke bij {B_DEF}? Plaatje voor plaatje groepeert het elk motief in zijn groep. Bedenk samen wat de dingen in een groep verbindt. Zo groeit gevoel voor groepen en kenmerken. Deze sorteeropdracht komt volledig zonder cijfers – het draait alleen om wat bij elkaar hoort, niet om hoe groot iets is.',
  'Een rustig klusje voor tussendoor: je kind pakt de gemengde plaatjes aan en sorteert ze in twee groepen. Alles wat bij {A_DEF} hoort komt bij elkaar, en hetzelfde geldt voor {B_DEF}. Doe mee met vriendelijke vragen en veel complimentjes. Raakt er iets verwisseld, dan kijken jullie samen gewoon nog eens. Geen tijdsdruk, geen telwerk – alleen kijken en sorteren, niet tellen, op het tempo van je kind.',
  'Begin met samen naar het blad te kijken: de plaatjes liggen gemengd, en de opdracht is om elk plaatje in de goede groep te leggen. Je kind houdt {A_DEF} en {B_DEF} uit elkaar en geeft alles een plek. Praat gerust over wat de dingen in een groep gemeen hebben – zo wordt het sorteren een gesprekje over overeenkomsten. Gaat er iets mis, dan kijken jullie rustig opnieuw. Geen stopwatch en geen punten, alleen kalm ordenen op wat bij elkaar hoort.',
  'Ga er lekker bij zitten en laat je kind de leiding nemen. Het kiest een plaatje, denkt even na en legt het bij {A_DEF} of bij {B_DEF}. Jij kunt steunen met kleine vragen: waar denk jij dat deze hoort? Elke keuze verdient een complimentje, ook de keuzes die wat langer duren. Tellen komt er nooit bij kijken – alleen herkennen wat dezelfde soort is en indelen in twee groepen, op het eigen tempo van je kind.',
  'Dit onderdeel voelt als een rustig spelletje: kijken, vergelijken, sorteren. De plaatjes worden verdeeld in twee soorten – {A_DEF} op één plek en {B_DEF} op een andere. Denk samen na over waarom een plaatje in zijn groep past. Foutjes zijn geen punt; jullie verbeteren zachtjes en kijken opnieuw. Er loopt geen tijd af en er wordt niets geteld – alleen het plezier van samen ordenen blijft over.',
  'Laat je kind één plaatje tegelijk pakken en beslissen: hoort dit bij {A_DEF} of bij {B_DEF}? Stap voor stap groeien er twee duidelijke groepen op het blad. Maak er een gesprekje van door te vragen waarom een plaatje past waar het past. Zo oefent je kind het ordenen zonder dat het als een opdracht voelt. Om cijfers gaat het hier nooit, altijd om welke dingen bij elkaar horen – in een rustig tempo en met volop aanmoediging.',
  'Pak het blad erbij en bekijk de rommel samen: alles mag een plek krijgen. Je kind legt elk plaatje in de goede groep – {A_DEF} verzamelen zich op de ene plek en {B_DEF} op de andere. Help met een kalme vraag: wat maakt dat deze bij elkaar horen? Zo wordt sorteren een spel én een gesprekje over overeenkomsten. Gaat het een keertje mis, dan kijken jullie gewoon zachtjes opnieuw. Geen aflopende klok, geen telwerk – kijken en sorteren, niet tellen, in het tempo van je kind.',
];
const P3 = 'Heeft je kind {A_DEF} en {B_DEF} netjes in hun groepen gesorteerd? Dan mag je trots zijn – sorteren en ordenen is een echte vaardigheid op weg naar school. Met elk plaatje dat in de goede groep belandt, oefent je kind goed kijken, vergelijken en indelen. Zin in meer? In onze gratis kleuterverzameling staan nog veel meer sorteerbladen met heel verschillende plaatjes – altijd kijken en sorteren, nooit tellen. Kies samen met je kind het volgende blad en geniet van het rustige moment bij het sorteren. Complimentjes en geduld zijn de mooiste beloning. Veel sorteerplezier!';

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function cellAssign(i, S, P) { const cells = S * P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps via i%cells]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L = THEMES[co.left], R = THEMES[co.right];
  if (!L || !R) { console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = {
    A_PL: L.plIndef, B_PL: R.plIndef,
    A_DEF: L.plDef, B_DEF: R.plDef,
    A_H1: L.h1Display, B_H1: R.h1Display,
  };
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: 'kleuters' },
    eyebrow: 'Werkblad: Plaatjes sorteren',
    h1: 'Plaatjes sorteren: ' + L.h1Display + ' en ' + R.h1Display + ' – werkblad voor kleuters',
    strand: 'Visuele waarneming en logisch denken',
    slotTokens: [L.plIndef, R.plIndef, L.h1Display, R.h1Display, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), 'kleuters', 'sorteren'],
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Plaatjes sorteren: ' + nL.h1Display + ' en ' + nR.h1Display, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(NL, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(NL, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); nl.json total ' + merged.landings.length);

// ===== audit: >=200 words, 0 digits in BODY, no `standard` key, BOTH themes' nouns present,
// no count-FRAMING leak, no doubled article. FENCE (nl): hoeveel/aantal/diagram forbidden outright;
// every tel-stem word must sit inside a negation window ("er wordt niet geteld", "tellen hoeft
// niet", "geen telwerk"). \b-bounded so "vertellen"/"voorstellen" never false-positive.
const FENCE_HARD = ['hoeveel', 'aantal', 'diagram'];
const NEG = '(niet|nooit|zonder|geen|niets|niemand|nergens)';
function inNegationWindow(lc, idx) {
  const pre = lc.slice(Math.max(0, idx - 32), idx);
  if (new RegExp(NEG + '\\b[^.!?]*$').test(pre)) return true;
  const post = lc.slice(idx, idx + 32);
  return new RegExp('^tel\\w*[^.!?]*\\b' + NEG + '\\b').test(post) || new RegExp('^getel\\w*[^.!?]*\\b' + NEG + '\\b').test(post);
}
let short = 0, fence = 0, hasStd = 0, missNoun = 0, dig = 0, dd = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  if (/[0-9]/.test(body)) { dig++; console.log('  BODY-DIGIT ' + e.slug); }
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  if (/\b[Dd]e de [a-zà-ž]/.test(body)) { dd++; console.log('  DOUBLED-ARTICLE ' + e.slug); }
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  const re = /\b(tellen|telt|geteld|telwerk|telde|tel)\b/g;
  let m;
  while ((m = re.exec(lc)) !== null) {
    if (!inNegationWindow(lc, m.index)) { fence++; console.log('  TEL-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, m.index - 20), m.index + 10).trim() + '"'); }
  }
  let h = lc.indexOf('hoe groot');
  if (h >= 0 && !inNegationWindow(lc, h)) { fence++; console.log('  HOE-GROOT-NOT-NEGATED ' + e.slug); }
  const co2 = COORDS.find(c => c.canonical === e.slug);
  const Lkey = THEMES[co2.left].plIndef.toLowerCase();
  const Rkey = THEMES[co2.right].plIndef.toLowerCase();
  const Ldef = THEMES[co2.left].plDef.toLowerCase();
  const Rdef = THEMES[co2.right].plDef.toLowerCase();
  const hasL = lc.includes(Lkey) || lc.includes(Ldef);
  const hasR = lc.includes(Rkey) || lc.includes(Rdef);
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (dig ? dig + ' DIGITS' : '0 digits') + ' | ' +
  (dd ? dd + ' DOUBLED-ARTICLE' : '0 doubled-article') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' FENCE-LEAK' : 'no count-framing leak')
);
if (short || fence || hasStd || missNoun || dig || dd) { console.error('nl picture-sort lint: FAIL — halting (fix frames, regenerate).'); process.exit(1); }
