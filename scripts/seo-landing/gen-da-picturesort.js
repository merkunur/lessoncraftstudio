#!/usr/bin/env node
/* DA picture-sort "-vs-" PAIRS × børnehaveklasse, READINESS (Visuel opmærksomhed og logisk tænkning —
 * fork ②: perceptual-identity criterion → visual/logic bucket). Clone of gen-nl-picturesort.js with
 * native Danish frames. Each page sorts the pictures of TWO themes (A,B) into two groups; the body
 * references BOTH themes' concrete nouns (the -vs- differentiation).
 *
 * Danish definite plural is the SUFFIXED form from da-themes (dyrene/blomsterne) — render2 is PURE
 * SUBSTITUTION (da-render.js spirit; no morphology computed here):
 *   {A_PL}/{B_PL}   -> plIndef    ("med {A_PL} og {B_PL}")
 *   {A_DEF}/{B_DEF} -> plDef     ("sortér {A_DEF}")
 *   {A_H1}/{B_H1}   -> h1Display (display)
 * GRAMMAR FENCE (da B5): den/det/de must NEVER stand (± one word) directly before a plDef token —
 * the suffixed definite is the article. Checked on the RAW templates pre-render (FAIL-halt).
 *
 * NO `standard` key (readiness). CHART-COUNT FENCE (da): sort/group lexicon, NEVER count-framing —
 * no "hvor mange"/antal/diagram at all; tæl-stem words allowed ONLY inside a negation window
 * ("her tælles der ikke", "uden at tælle", "ingen skal tælle"). Stem match requires a NON-LETTER
 * before the stem — JS \b cannot be trusted around æ/ø/å, and "fortælle" (to tell) contains the
 * stem with a letter before it; additionally fortælle/fortæller/genfortælle are simply never used
 * in the frames. 16×14=224 cells (§22.1 cell-space invariant: 224 > 211 da pairs).
 * Usage: node scripts/seo-landing/gen-da-picturesort.js
 */
'use strict';
const fs = require('fs');
const { THEMES } = require('./da-themes');
const DA = 'frontend/content/seo-landing/da.json';
const COORDS = JSON.parse(fs.readFileSync('scripts/seo-landing/da-picture-sort-coordinates.json', 'utf8')).coordinates;

function render2(tpl, vals) {
  let s = tpl;
  Object.keys(vals).forEach(function (k) {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vals[k]);
  });
  return s;
}

// ===== Frames (T1 native da; {A_PL}/{B_PL}/{A_DEF}/{B_DEF} markers). Warm dit-barn register,
// børnehaveklassen. Both themes referenced in every frame. SORT/GROUP mechanic; counting only as
// the negated divergence. =====
const SKEL = [
  'På dette ark til børnehaveklassen ligger {A_PL} og {B_PL} kriskras mellem hinanden – alt er blandet sammen på én side. Opgaven til dit barn: sortér billederne i to grupper, så {A_DEF} kommer for sig og {B_DEF} for sig. Her tælles der ikke; det hele handler om at kigge godt efter og sortere. Ved hvert billede tænker dit barn: hvilken slags er det her, og hvad hører sammen? På den måde lærer det at dele billeder ind i to grupper og ordne dem efter det, de har til fælles – en vigtig færdighed på vejen mod skolen. Læg arket på bordet, gå på opdagelse sammen, og lad dit barn kigge og sortere i sit helt eget tempo.',
  'Hvad hører sammen, og hvad gør ikke? På dette ark er {A_PL} og {B_PL} blandet grundigt sammen, og dit barn får den fine opgave at skille dem ad. Hvert billede bliver kigget på, vendt i tankerne og lagt i den rigtige gruppe: {A_DEF} ét sted og {B_DEF} et andet. Tælle skal man ikke – man skal genkende, hvilken slags hvert billede er. Netop dét at sortere og ordne er ægte læring for børnehaveklassen: dit barn ser ligheder, sammenligner og deler ind i to grupper. En rolig kigge-og-sortere-opgave, der både er hyggelig og styrker den logiske tænkning – uden pres og uden stopur. Giv gerne et lille klap på skulderen for hvert billede, der lander rigtigt.',
  'Sikke et virvar! {A_PL} og {B_PL} er endt i én stor bunke på dette ark, og nu skal der ryddes op – med øjnene. Dit barn sorterer hvert billede over i den gruppe, hvor det hører hjemme: {A_DEF} for sig og {B_DEF} for sig. Hvilke ting hører sammen, og hvilke er en helt anden slags? En sorteringsopgave som denne træner ordenssansen: at sammenligne omhyggeligt og dele ind efter fælles træk. Det er en værdifuld færdighed, som hjælper dit barn til at tænke klart, både nu og senere i skolen. Der bliver ikke talt undervejs – det eneste spørgsmål er, hvilken gruppe hvert billede hører til. Tag jer god tid, og nyd at skabe orden sammen.',
  'Forestil dig en side, hvor {A_PL} og {B_PL} ligger hulter til bulter uden nogen orden. Præcis sådan ser dette ark ud – og dit barn er den, der skaber overblik. Det kigger på hvert billede og beslutter: hører det til hos {A_DEF} eller hos {B_DEF}? Billede for billede vokser der to pæne grupper frem. Mens dit barn sorterer, øver det sig i at ordne: genkende hvilken slags noget er, sammenligne og lægge dét sammen, som hører sammen. Den færdighed er en solid byggesten på vejen mod skolen. Og det bedste: her bliver der kigget og sorteret, aldrig talt. Fejr gerne hvert billede, der finder hjem til sin gruppe.',
  '{A_PL} og {B_PL} har blandet sig godt og grundigt på dette ark – så nu er det tid til at sortere! Dit barn flytter hvert billede hen til den rigtige gruppe: {A_DEF} er den ene slags, og {B_DEF} er den anden. Ved hvert billede overvejer det, hvad der hører sammen, og hvad der skal ligge for sig selv. Sådan vokser forståelsen af grupper og kendetegn – at sortere og ordne er en rigtig færdighed for børnehaveklassen. Ingen skal tælle noget her; det handler kun om at kigge, sammenligne og lægge på plads. Helt uden tidspres og uden point, i jeres eget tempo og med masser af opmuntring undervejs. Læg eventuelt billederne i to små bunker, så grupperne er nemme at se.',
  'På arket venter {A_PL} og {B_PL} i ét stort miskmask på lidt orden. Dit barn tager fat i hvert billede med blikket og lægger det i sin gruppe: {A_DEF} sammen og {B_DEF} sammen. Hvad hører sammen, og hvad er en slags for sig? Netop dét at sammenligne og gruppere er at ordne – en færdighed, som dit barn senere bruger til at strukturere både tanker og opgaver. Der er ingenting at tælle; dit barn kigger, genkender hvilken slags hvert billede er, og sorterer. En rolig og venlig opgave uden stopur – kig og sortér i børnehaveklasse-tempo, med god tid til at undre sig over billederne undervejs og snakke om dem.',
  'To slags billeder, ét rodet ark: {A_PL} og {B_PL} ligger mellem hinanden og venter på dit barn. Med blikket som værktøj rydder din lille sorteringsmester op og lægger hvert billede i sin gruppe – {A_DEF} hører hjemme ét sted, {B_DEF} et andet. Ved hvert billede spørger barnet sig selv: hører det her til her eller dér, og hvilken slags er det? At sortere og ordne på den måde lægger grunden til logisk tænkning og er en rigtig færdighed på vej mod skolen. Tælle behøver man aldrig; det er nok at kigge, sammenligne og lægge rigtigt. En venlig og rolig opgave, som I kan dele i fred og ro, helt uden pres.',
  'Mange børn elsker at rydde op – i hvert fald når det foregår med øjnene. På dette ark er {A_PL} og {B_PL} viklet godt ind i hinanden, og dit barn bringer orden i sagerne. Det sorterer hvert billede over i den rigtige gruppe: {A_DEF} for sig, {B_DEF} for sig. Hvilke ting hører sammen, og hvilken slags er noget helt andet? Gennem sorteringen lærer dit barn at få øje på ligheder og dele ind efter kendetegn – en grundfærdighed for struktureret tænkning i skolen. Her skal hverken tælles eller måles; det drejer sig om at kigge, sammenligne og lægge pænt på plads. En afslappet opgave uden tidsgrænse, med ros for hver gruppe, der bliver færdig.',
  'En glad blanding venter på dette ark: {A_PL} og {B_PL} ligger mellem hinanden og vil gerne ordnes. Med øjnene som redskab deler dit barn dem op i to grupper – {A_DEF} samler sig ét sted, {B_DEF} et andet. Ved hvert billede standser det et øjeblik: hvad hører sammen, og hvad er en slags for sig selv? At sortere sådan er at ordne: dit barn lægger mærke til kendetegn, sammenligner og grupperer efter lighed. Det styrker den logiske tænkning skridt for skridt på vejen mod skolen. Der bliver aldrig talt her – kun kigget, sammenlignet og sorteret omhyggeligt, i eget tempo og med ros for hver fuldtræffer undervejs.',
  'Der er gået kludder i billederne: {A_PL} og {B_PL} ligger spredt ud over hele siden uden system. Nu får dit barn den fine rolle at løse det. Roligt og skridt for skridt flytter det hvert billede derhen, hvor det hører til: {A_DEF} i den ene gruppe, {B_DEF} i den anden. Hvad binder tingene i en gruppe sammen, og hvad gør den anden gruppe anderledes? Dette sorteringsspil øver evnen til at ordne – at se mønstre, sammenligne og dele ind efter kendetegn. En byggesten, der bærer langt ind i skolen. På dette ark skal der ikke tælles noget; kun gruppen, hvert billede hører til, er vigtig. Sid med ved bordet, stil små spørgsmål, og fejr hvert billede, der lander rigtigt.',
  'Dette ark begynder med et herligt rod: {A_PL} og {B_PL} ligger kriskras mellem hinanden. Dit barn skaber orden ved at sortere billederne, ét ad gangen, i to tydelige grupper – {A_DEF} for sig og {B_DEF} for sig. Hvad er af én slags, og hvad hører ikke med? Når dit barn grupperer på den måde, øver det sig i at ordne: finde fælles træk og dele ind efter dem. Den evne hjælper med at tænke struktureret, først i børnehaveklassen og siden i skolen. Her bliver der kigget og sorteret, aldrig talt. Giv opgaven al den tid, den fortjener, uden stopur og uden point, og drys rigeligt med opmuntring undervejs.',
  'Velkommen til et ark, hvor {A_PL} og {B_PL} ligger i skøn forvirring. Dit barn kigger roligt på ét billede ad gangen og beslutter, hvilken gruppe det hører til: alt, der hører til {A_DEF}, lægges sammen, og alt, der hører til {B_DEF}, lægges for sig. Hvilke ting hører sammen, og hvad danner sin egen gruppe? Mens der sorteres, øver dit barn sig i at ordne – sammenligne, se ligheder og dele ind efter kendetegn. En værdifuld færdighed som forberedelse til skolen. Der bliver ingenting talt overhovedet; opgaven handler kun om, hvad der hører sammen. Tag jer tid, snak om billederne, og giv et lille bravo ved hvert godt valg.',
  'Lige nu ligger {A_PL} og {B_PL} hulter til bulter i én stor bunke på arket. Dit barn lægger orden i bunken ved at give hvert billede en plads: {A_DEF} er den ene slags, {B_DEF} den anden. Hvad har tingene i en gruppe til fælles? Mens der sorteres, træner dit barn ordenssansen – at lægge mærke til kendetegn, sammenligne og dele ind efter lighed. Det styrker den logiske tænkning og er en god forberedelse til skolen. På dette ark bliver der aldrig talt; det vigtigste er kun, hvilken gruppe hvert billede hører til – ikke noget med at måle eller veje. Sæt jer tæt sammen, tænk højt, og glæd jer stille over hvert billede, der finder sin plads.',
  'Kan dit barn se, hvad der hører sammen? På dette ark gemmer svaret sig mellem {A_PL} og {B_PL}, som ligger godt blandet mellem hinanden. Opgaven er klar: sortér billederne i to grupper, så {A_DEF} samles ét sted og {B_DEF} et andet. Ved hvert billede mærker dit barn efter: hvilken slags er det, og hvor hører det hjemme? Sortering som denne er stille logik-træning – at genkende fælles træk, sammenligne og dele ind. Den slags ordenssans bliver der brug for hele skolelivet. Og husk: her skal der ikke tælles, kun kigges og sorteres. Gør opgaven hyggelig med god tid, små snakke om billederne og ros for hvert valg, der sidder lige i skabet.',
  'Et helt ark, to slags billeder: her møder dit barn {A_PL} og {B_PL} i én blandet bunke. Nu skal der ryddes op med øjnene. Hvert billede bliver kigget på og lagt i den rigtige gruppe – {A_DEF} hører til i den ene, {B_DEF} i den anden. Hvad hører sammen, og hvad skiller sig ud? Ved at sortere og ordne lærer dit barn at se ligheder og forskelle og at dele ind efter kendetegn – en grundsten for klar tænkning i skolen. Uden at tælle, uden stopur og uden point: kun blikket, roen og glæden ved at få orden på tingene. Sid gerne ved siden af, og lad dit barn forklare, hvorfor hvert billede ligger, hvor det ligger.',
  'Først ser det rodet ud: {A_PL} og {B_PL} ligger spredt mellem hinanden over hele arket. Men bag rodet gemmer der sig en fin opgave for dit barn: at sortere hvert billede over i den gruppe, hvor det hører hjemme, så {A_DEF} ender for sig og {B_DEF} for sig. Hvad hører sammen, og hvilken slags er noget for sig selv? At sortere og ordne øver dit barn i at sammenligne, genkende fælles træk og dele ind i to grupper – netop den slags rolige logik, børnehaveklassen elsker. Ingen skal tælle, og ingenting skal gå stærkt; det vigtige er blikket og de gode valg. Følg med over skulderen, spørg nysgerrigt, og glæd jer sammen over hver gruppe, der vokser frem.',
];
const P2 = [
  'Sådan gør I: dit barn kigger på de blandede billeder og lægger dem ét ad gangen i en af de to grupper – hos {A_DEF} eller hos {B_DEF}. Tænk gerne højt sammen: hvad hører sammen her? Arket er gratis og ligger klar som PDF, så du kan printe det med det samme. Ingen tidsgrænse, ingen point – bare kig, sammenlign og sortér i jeres eget tempo.',
  'Sæt jer godt til rette og kig på billederne sammen. Dit barn sorterer dem i to grupper: {A_DEF} på den ene side, {B_DEF} på den anden. Spørg undervejs: hvad har de her ting til fælles? Opgaven er gratis at hente som PDF og nem at printe derhjemme. Her tælles der ikke – det handler kun om, hvilken slags noget er. Helt uden pres, med god tålmodighed og masser af ros.',
  'Denne opgave er dejligt overskuelig: kig på billedet, tænk dig om, læg det i den rigtige gruppe. Dit barn holder {A_DEF} og {B_DEF} hver for sig og giver hvert billede sin plads. Hent PDF\'en gratis, og print den, når det passer jer. Ender noget i den forkerte gruppe, kigger I bare en gang til. Ikke noget med at tælle, ikke noget stopur – kun rolig sortering i barnets tempo.',
  'Lad dit barn arbejde i sit eget tempo. Det kigger på hvert billede og beslutter, om det hører til hos {A_DEF} eller hos {B_DEF}. Stille og roligt bliver sorteringen mere og mere sikker – en vigtig færdighed i børnehaveklassen. Stil af og til et lille spørgsmål: hvorfor passer det her billede dér? Arket koster ingenting og kan printes som PDF, lige til at gå i gang med. Tælle skal der aldrig – det vigtige er, hvad der hører sammen.',
  'Hold stemningen let: dit barn kigger, sammenligner og sorterer. De blandede billeder deles op i to slags – {A_DEF} og {B_DEF}. Hvert billede får sin plads i den rigtige gruppe. Et venligt ord hjælper mere end en rettelse, så fejr de gode valg. Opgaven er gratis, klar som PDF og lige til at udskrive. Ingen point og intet ur, der tikker – kun rolig sortering, hvor der ikke skal tælles.',
  'Her øver dit barn først og fremmest det gode blik: hvilke billeder hører til {A_DEF}, og hvilke hører til {B_DEF}? Billede for billede grupperes alt på sin rette plads. Find sammen ud af, hvad der binder tingene i en gruppe sammen. PDF-arket er gratis at hente og printe, så I kan begynde med det samme. Det handler ikke om at tælle, og det handler ikke om, hvor store tingene er – kun om, hvad der hører sammen.',
  'En rolig lille opgave til en stille stund: dit barn tager de blandede billeder og sorterer dem i to grupper. Alt, der hører til {A_DEF}, samles, og det gælder også for {B_DEF}. Hjælp til med venlige spørgsmål og god ros. Bytter noget plads ved en fejl, kigger I bare sammen igen. Arket er gratis – hent PDF\'en og print den derhjemme. Intet tidspres, og der skal ingenting tælles – bare kig og sortér i barnets tempo.',
  'Begynd med at kigge på arket sammen: billederne ligger blandede, og opgaven er at lægge hvert billede i den rigtige gruppe. Dit barn holder {A_DEF} og {B_DEF} ude fra hinanden og giver alt en plads. Snak gerne om, hvad tingene i en gruppe har til fælles – så bliver sorteringen til en lille samtale om ligheder. Det hele er gratis: PDF\'en ligger klar til print. Ingen stopur og ingen point, kun rolig orden i tingene.',
  'Sæt dig godt til rette, og lad dit barn styre. Det vælger et billede, tænker sig om og lægger billedet hos {A_DEF} eller hos {B_DEF}. Du kan støtte med små spørgsmål: hvor tror du, det her hører til? Hvert valg fortjener ros, også dem, der tager lidt tid. Arket er gratis som PDF og hurtigt printet. Der bliver ikke talt undervejs – kun genkendt, hvilken slags noget er, og delt ind i to grupper.',
  'Denne del føles som et stille spil: kig, sammenlign, sortér. Billederne deles i to slags – {A_DEF} ét sted og {B_DEF} et andet. Snak sammen om, hvorfor et billede passer ind i sin gruppe. Småfejl er helt fine; I retter blidt og kigger igen. Hent den gratis PDF, print arket, og gå i gang. Intet ur løber ud, og ingenting bliver talt – tilbage er kun glæden ved at ordne sammen.',
  'Lad dit barn tage ét billede ad gangen og beslutte: hører det til hos {A_DEF} eller hos {B_DEF}? Skridt for skridt vokser to tydelige grupper frem på arket. Gør det til en lille snak ved at spørge, hvorfor billedet passer dér, hvor det ligger. Sådan øver dit barn at ordne, uden at det føles som en lektie. Arket er gratis og kan printes som PDF på et øjeblik. Det drejer sig aldrig om at tælle – altid om, hvilke ting der hører sammen.',
  'Find arket frem, og kig på rodet sammen: alt skal nok finde sin plads. Dit barn lægger hvert billede i den rigtige gruppe – {A_DEF} samler sig ét sted og {B_DEF} et andet. Hjælp med et roligt spørgsmål: hvad gør, at de her hører sammen? Så bliver sorteringen både leg og samtale. Det hele er gratis; print PDF\'en, så er I i gang. Uden ur, uden point – og uden at tælle.',
  'Gør opgaven til jeres egen: nogle børn peger på hvert billede, andre lægger en finger på det og forklarer højt. Uanset hvad ender {A_DEF} i den ene gruppe og {B_DEF} i den anden. Lyt til dit barns begrundelser – dér gemmer den gode læring sig. Arket er gratis og ligger som PDF, klar til at blive printet. Der skal hverken tælles eller skyndes; kig roligt, og sortér med omhu.',
  'Til sidst et lille tip: lad dit barn kigge hele arket igennem, før sorteringen begynder. Så ved det, at både {A_DEF} og {B_DEF} gemmer sig mellem billederne. Bagefter lægges alt på plads, gruppe for gruppe. Ros undervejs gør opgaven tryg og rar. Du kan hente arket gratis som PDF og printe det til køkkenbordet. Her er ingen point og intet jag – og der bliver selvfølgelig ikke talt, kun sorteret.',
];
const P3 = 'Har dit barn fået {A_DEF} og {B_DEF} pænt på plads i hver sin gruppe? Så er der god grund til at være stolt – at sortere og ordne er en rigtig færdighed på vejen mod skolen. For hvert billede, der lander rigtigt, øver dit barn sig i at kigge godt efter, sammenligne og dele ind. Har I fået smag for mere? I vores gratis samling til børnehaveklassen venter mange flere sorteringsark med helt andre billeder – altid kig og sortér, aldrig tælle. Vælg det næste ark sammen, print det, og nyd endnu en rolig stund med orden i billederne. Ros og tålmodighed er den fineste belønning. God fornøjelse med sorteringen!';

// ===== DA B5 raw-template grammar gate (pre-render, FAIL-halt): the suffixed definite plural IS
// the article — den/det/de (± one adjective) directly before {A_DEF}/{B_DEF} is ungrammatical
// ("de dyrene"). Explicit non-letter guard instead of \b (æ/ø/å are non-word chars to JS \b). =====
const B5 = /(^|[^a-zæøå])(den|det|de)\s+(\p{L}+\s+)?\{(A_DEF|B_DEF)\}/iu;
[].concat(SKEL, P2, [P3]).forEach(function (tpl, k) {
  if (B5.test(tpl)) {
    console.error('da picture-sort B5: FAIL — den/det/de before a definite-plural token in template #' + k + ' @"' + tpl.match(B5)[0] + '"');
    process.exit(1);
  }
});

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function coprimeStride(cells) { let k = Math.max(2, Math.round(cells * 0.6180339887)); for (let d = 0; d < cells; d++) for (const cand of [k + d, k - d]) if (cand > 1 && cand < cells && gcd(cand, cells) === 1) return cand; return 1; }
function cellAssign(i, S, P) { const cells = S * P, stride = coprimeStride(cells); const c = ((i % cells) * stride) % cells; return { skel: c % S, p2: Math.floor(c / S) % P }; }

// spring & flowers share the countable surrogate "blomster" in da-themes; a -vs- pair needs TWO
// distinct nouns, so the spring side falls back to the more specific "forårsblomster" for such a
// pair only (h1Display stays Forår/Blomster — already distinct).
const PAIR_DISAMBIG = {
  spring: { plIndef: 'forårsblomster', plDef: 'forårsblomsterne' },
};

const list = COORDS.slice().sort((a, b) => a.pairKey < b.pairKey ? -1 : 1);
const cells = SKEL.length * P2.length;
console.log('  ' + (cells > list.length ? '[invariant OK]' : '[invariant: cells<pairs -> coprime bijection wraps via i%cells]') + ' picture-sort: ' + SKEL.length + 'x' + P2.length + '=' + cells + ' vs pairs ' + list.length);

const out = []; let blocked = 0;
list.forEach((co, i) => {
  const L0 = THEMES[co.left], R0 = THEMES[co.right];
  if (!L0 || !R0) { console.log('NO COPY DATA for ' + co.pairKey); blocked++; return; }
  let L = { plIndef: L0.plIndef, plDef: L0.plDef, h1Display: L0.h1Display };
  let R = { plIndef: R0.plIndef, plDef: R0.plDef, h1Display: R0.h1Display };
  if (L.plIndef === R.plIndef) {
    if (PAIR_DISAMBIG[co.left]) L = Object.assign({}, L, PAIR_DISAMBIG[co.left]);
    else if (PAIR_DISAMBIG[co.right]) R = Object.assign({}, R, PAIR_DISAMBIG[co.right]);
    if (L.plIndef === R.plIndef) { console.log('NOUN-COLLISION unresolved ' + co.pairKey); blocked++; return; }
  }
  const cell = cellAssign(i, SKEL.length, P2.length);
  const vals = {
    A_PL: L.plIndef, B_PL: R.plIndef,
    A_DEF: L.plDef, B_DEF: R.plDef,
    A_H1: L.h1Display, B_H1: R.h1Display,
  };
  const entry = {
    slug: co.canonical,
    variantShape: co.siblings.length > 1 ? 'collapsed' : 'singleton',
    coordinate: { type: 'picture-sort', mode: null, theme: co.pairKey, level: 'boernehaveklasse' },
    eyebrow: 'Opgave: Sortér billederne',
    h1: 'Sortér billederne: ' + L.h1Display + ' og ' + R.h1Display + ' – opgave til børnehaveklassen',
    strand: 'Visuel opmærksomhed og logisk tænkning',
    slotTokens: [L.plIndef, R.plIndef, L.h1Display, R.h1Display, co.left.replace(/_/g, ' '), co.right.replace(/_/g, ' '), 'boernehaveklasse', 'sortere'],
    p1: render2(SKEL[cell.skel], vals),
    p2: render2(P2[cell.p2], vals),
    p3: render2(P3, vals),
    canonicalDeckSlug: co.canonical,
    carousel: [1, 2, 5, 11].map(off => {
      const n = list[(i + off) % list.length];
      const nL = THEMES[n.left], nR = THEMES[n.right];
      return { label: 'Sortér billederne: ' + nL.h1Display + ' og ' + nR.h1Display, href: n.canonical };
    }),
  };
  if (co.n > 1) entry.collapseSiblings = co.siblings;
  out.push(entry);
});

const cur = JSON.parse(fs.readFileSync(DA, 'utf8'));
const keep = cur.landings.filter(l => !(l.coordinate && l.coordinate.type === 'picture-sort'));
const merged = { _note: cur._note, landings: keep.concat(out) };
fs.writeFileSync(DA, JSON.stringify(merged, null, 2) + '\n');
console.log('generated ' + out.length + ' picture-sort landings (blocked ' + blocked + '); da.json total ' + merged.landings.length);

// ===== audit: >=200 words, 0 digits in BODY, no `standard` key, BOTH themes' nouns present,
// no count-FRAMING leak, no den/det/de-before-definite. FENCE (da): "hvor mange"/antal/diagram
// forbidden outright; every tæl-stem word must sit inside a negation window ("her tælles der ikke",
// "uden at tælle", "ingen skal tælle"). Stem match requires a NON-LETTER before the stem — JS \b
// is unreliable around æ/ø/å, and "fortælle" (to tell) carries a letter before the stem, so the
// guard structurally protects it (and fortælle/fortæller/genfortælle are never used regardless).
// "hvor stor(e)" allowed only negated ("det handler ikke om, hvor store tingene er"). =====
const FENCE_HARD = ['hvor mange', 'antal', 'diagram'];
const NEG = '(ikke|aldrig|uden|ingenting|ingen|intet|hverken)';
function inNegationWindow(lc, idx) {
  const pre = lc.slice(Math.max(0, idx - 32), idx);
  if (new RegExp('(^|[^a-zæøå])' + NEG + '(?![a-zæøå])[^.!?]*$').test(pre)) return true;
  const post = lc.slice(idx, idx + 40);
  return new RegExp('^(tælles|tæller|tælle|talt|tæl)(?![a-zæøå])[^.!?]*[^a-zæøå]' + NEG + '(?![a-zæøå])').test(post);
}
let short = 0, fence = 0, hasStd = 0, missNoun = 0, dig = 0, dd = 0;
out.forEach(e => {
  const body = e.p1 + ' ' + e.p2 + ' ' + e.p3;
  const lc = body.toLowerCase();
  const w = body.split(/\s+/).filter(Boolean).length;
  if (w < 200) { short++; console.log('  SHORT ' + e.slug + ': ' + w); }
  if (/[0-9]/.test(body)) { dig++; console.log('  BODY-DIGIT ' + e.slug); }
  if ('standard' in e) { hasStd++; console.log('  HAS-STANDARD ' + e.slug); }
  // rendered-body B5 echo (templates already gated pre-render; this re-checks against the
  // rendered definite plurals so a future frame edit cannot sneak "de dyrene" through)
  const co2 = COORDS.find(c => c.canonical === e.slug);
  const Lth = THEMES[co2.left], Rth = THEMES[co2.right];
  [Lth.plDef, Rth.plDef, PAIR_DISAMBIG.spring.plDef].forEach(def => {
    if (new RegExp('(^|[^a-zæøå])(den|det|de) ([a-zæøå]+ )?' + def + '(?![a-zæøå])').test(lc)) { dd++; console.log('  DEF-AFTER-ARTICLE "' + def + '" ' + e.slug); }
  });
  FENCE_HARD.forEach(f => { if (lc.includes(f)) { fence++; console.log('  FENCE-LEAK "' + f + '" ' + e.slug); } });
  const re = /(^|[^a-zæøå])(tælles|tæller|tælle|talt|tæl)(?![a-zæøå])/g;
  let m;
  while ((m = re.exec(lc)) !== null) {
    const idx = m.index + m[1].length;
    if (!inNegationWindow(lc, idx)) { fence++; console.log('  TAEL-NOT-NEGATED ' + e.slug + ' @"' + lc.slice(Math.max(0, idx - 20), idx + 10).trim() + '"'); }
  }
  let h = lc.indexOf('hvor stor');
  while (h >= 0) {
    if (!inNegationWindow(lc, h)) { fence++; console.log('  HVOR-STOR-NOT-NEGATED ' + e.slug); }
    h = lc.indexOf('hvor stor', h + 1);
  }
  const Lkey = Lth.plIndef.toLowerCase();
  const Rkey = Rth.plIndef.toLowerCase();
  const Ldef = Lth.plDef.toLowerCase();
  const Rdef = Rth.plDef.toLowerCase();
  const hasL = lc.includes(Lkey) || lc.includes(Ldef);
  const hasR = lc.includes(Rkey) || lc.includes(Rdef);
  if (!hasL || !hasR) { missNoun++; console.log('  MISSING-THEME-NOUN ' + e.slug + ' (L:' + hasL + ' R:' + hasR + ')'); }
});
console.log(
  (short ? short + ' short' : 'all >=200 words') + ' | ' +
  (dig ? dig + ' DIGITS' : '0 digits') + ' | ' +
  (dd ? dd + ' DEF-AFTER-ARTICLE' : '0 def-after-article') + ' | ' +
  (hasStd ? hasStd + ' HAS-STANDARD' : 'all readiness (no standard)') + ' | ' +
  (missNoun ? missNoun + ' missing-theme-noun' : 'both-themes nouns present') + ' | ' +
  (fence ? fence + ' FENCE-LEAK' : 'no count-framing leak')
);
if (short || fence || hasStd || missNoun || dig || dd) { console.error('da picture-sort lint: FAIL — halting (fix frames, regenerate).'); process.exit(1); }
