/**
 * Part 252: NO Theme Hub 50 \u2014 Summer (Sommer) \u2014 SEO + Enrichment Fields
 *
 * Updates SEO metadata and adds 13 enrichment fields for:
 * 50. summer/no.ts (Sommer)
 *
 * This completes all 50 Norwegian theme hubs.
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');

const themes = [
  // ============================================================
  // 50. SUMMER (Sommer)
  // ============================================================
  {
    folder: 'summer',
    seo: {
      title: 'Gratis Sommer-oppgaver til Barn | LessonCraftStudio',
      description: 'Printbare sommer-oppgaver til barn. Matematikk, fargelegging, ordspill og puslespill med sommertema. F\u00f8rskole til 3. klasse. Gratis PDF.',
      keywords: 'sommeroppgaver til barn, sommer arbeidsark, sommer fargelegging, sommer matematikk, sommer f\u00f8rskole, sommer printbar, sommerferie oppgaver, sommer puslespill, strand og sol, sommer ordoppgaver, sommer aktiviteter',
      heading: 'Sommeroppgaver og \u00d8velser',
    },
    enrichment: `

  // -- SEO Enrichment (Part 252) --

  uniqueAngle: 'Sommerarbeidsark har en unik pedagogisk posisjon i Norge fordi de adresserer det vel dokumenterte fenomenet sommerglidning \u2014 tapet av faglige ferdigheter under den lange sommerferien \u2014 samtidig som de utnytter barnets intense emosjonelle tilknytning til \u00e5rets frieste og mest eventyrlige \u00e5rstid. I norsk kontekst er sommeren s\u00e6rlig verdifull fordi den representerer en dramatisk kontrast til den m\u00f8rke vinteren, og barn forbinder den med midnattsol, hytteliv, b\u00e6rplukking, bading i ferskvann og fjellturer \u2014 opplevelser som er dypt forankret i norsk kultur og friluftsliv. Kunnskapsl\u00f8ftet (LK20) vektlegger at l\u00e6ring skal v\u00e6re relevant for elevenes livsverden, og f\u00e5 temaer er mer levende til stede i norske barns hverdag enn sommeren. N\u00e5r arbeidsark bruker iskremkjeks, sandslott, bading og sommerfugler som kontekst for telling, addisjon og ordl\u00e6ring, m\u00f8ter de barnet i dets gledeligste sinnstilstand. Den norske sommerferiens lengde p\u00e5 \u00e5tte til ni uker gj\u00f8r strukturert \u00f8velse viktigere her enn i land med kortere ferier, og sommerarbeidsark gir denne strukturen uten \u00e5 ber\u00f8ve barnet ferief\u00f8lelsen. For familier som tilbringer ferien p\u00e5 hytta eller p\u00e5 biltur, er utskriftsvennlige arbeidsark den perfekte skjermfrie aktiviteten for regnv\u00e6rsdager og rolige ettermiddager.',

  researchCitation: 'Cooper, H., Nye, B., Charlton, K., Lindsay, J. & Greathouse, S. (1996). The Effects of Summer Vacation on Achievement Test Scores: A Narrative and Meta-Analytic Review. Review of Educational Research, 66(3), 227\u2013268. Denne banebrytende metaanalysen dokumenterte at elever i gjennomsnitt tapte en m\u00e5neds faglig fremgang i l\u00f8pet av sommerferien, med st\u00f8rst tap i matteferegning og staveferdigheter. Forskningen viste at regelmesissg, kortvarig \u00f8velse gjennom ferien var den mest effektive strategien for \u00e5 forebygge tapet, s\u00e6rlig n\u00e5r aktivitetene var engasjerende og koblet til barnas ferieopplevelser.',

  snippetDefinition: 'Sommerarbeidsark for barn er utskrivbare l\u00e6ringsaktiviteter som bruker illustrasjoner av strender, iskrem, solskinn, sv\u00f8mmebasseng, sandslott og sommeraktiviteter til \u00e5 undervise i telling, addisjon, ordforr\u00e5d, m\u00f8nstergjenkjenning og logisk tenkning. Designet for barn i alderen 3 til 9 forebygger de sommerglidning ved \u00e5 pakke faglig \u00f8velse i et tema som f\u00f8les som ferie snarere enn skolearbeid.',

  snippetHowTo: [
    'Velg en arbeidsarktype fra LessonCraftStudio som passer sommertemaet, for eksempel fargelegging av strandscener, addisjons\u00f8velser med iskremkuler, ords\u00f8k med sommervokabular eller skattejakt med sommerillustrasjoner.',
    'Tilpass vanskelighetsgrad og antall elementer etter barnets alder, fra enkel telling av skjell for f\u00f8rskolebarn til flerstegs feriebudsjetteringsoppgaver for 3. klasse.',
    'Introduser aktiviteten med en samtale om sommerplaner eller sommeropplevelser, og still sp\u00f8rsm\u00e5l som hva er det morsomste du har gjort denne sommeren og hva vil du gj\u00f8re p\u00e5 stranden.',
    'Del ut arbeidsarket og la barnet arbeide selvstendig mens du veileder ved behov, med fokus p\u00e5 \u00e5 koble arbeidsarket til barnets egne sommeropplevelser.',
    'Still \u00e5pne sp\u00f8rsm\u00e5l underveis: hvor mange iskremkuler ser du, hva ville du pakket til stranden, hvilken sommerfugl er annerledes.',
    'F\u00f8lg opp med en praktisk sommeraktivitet som \u00e5 bes\u00f8ke stranden, lage hjemmelaget limonade, bygge et sandslott eller g\u00e5 p\u00e5 b\u00e6rtur.',
    'Gjenta med nye oppgavetyper gjennom hele ferien for \u00e5 opprettholde konsistent \u00f8velse, med to til tre korte \u00f8kter per uke som forskningsstøttet minimum.',
  ],

  limitations: 'Sommerarbeidsark har noen naturlige begrensninger som l\u00e6rere og foreldre b\u00f8r v\u00e6re oppmerksomme p\u00e5. Temaet er sterkt sesongavhengig og f\u00f8les mest relevant i juni til august, selv om nostalgisk bruk kan fungere resten av \u00e5ret. Norsk sommer er uforutsigbar med b\u00e5de strålende sol og langvarig regn, noe som kan p\u00e5virke motivasjonen for uteoppf\u00f8lging. Sommerferiens frie struktur gj\u00f8r det utfordrende å opprettholde konsistens i arbeidsark\u00f8velse uten en tydelig plan. Skjermkonkurranse fra nettbrett og mobilspill er s\u00e6rlig sterk om sommeren n\u00e5r barn har mer fritid, s\u00e5 arbeidsarkene m\u00e5 v\u00e6re visuelt tiltalende nok til \u00e5 konkurrere.',

  themeComparisons: [
    {
      vsThemeId: 'spring',
      summary: 'V\u00e5rarbeidsark feirer naturens oppv\u00e5kning med blomstring, dyreunger og smeltende sn\u00f8, mens sommerarbeidsark fokuserer p\u00e5 den fulle utfoldelsen av ferie, friluftsliv og sanselig glede. V\u00e5ren handler om forandring og l\u00f8fte, sommeren om oppfyllelse og frihet. De to temaene utfyller hverandre som en naturlig \u00e5rstidsprogresjon.',
    },
    {
      vsThemeId: 'nature',
      summary: 'Naturarbeidsark utforsker \u00f8kosystemer, planter og dyr som faglige emner gjennom hele \u00e5ret, mens sommerarbeidsark bruker naturopplevelser som kontekst for feriemoro og ferdigehetsvedlikehold. Sommertemaet er mer feriefokusert og emosjonelt, mens naturtemaet er mer vitenskapelig og systematisk.',
    },
    {
      vsThemeId: 'ocean',
      summary: 'Havarbeidsark dykker dypt ned i marine \u00f8kosystemer, havdyr og undervannsbiologi, mens sommerarbeidsark bruker strandscener og badeelementer som en del av et bredere ferietema. Havet er ett aspekt av sommeren, men sommertemaet inkluderer ogs\u00e5 parker, hager, bilturer og hytteliv.',
    },
    {
      vsThemeId: 'holidays',
      summary: 'Helligdagsarbeidsark dekker spesifikke kulturelle feiringer som jul, p\u00e5ske og nasjonaldager, mens sommerarbeidsark fokuserer p\u00e5 den lange ferieperioden som helhet. Sommeren er en sesong snarere enn en enkelt feiring, og gir en bredere kontekst for vedvarende ferdigehts\u00f8velse over uker.',
    },
  ],

  productLinks: [
    {
      appId: 'coloring',
      anchorText: 'sommer fargeleggingssider',
      context: 'Fargelegging av strandscener, iskrembarer og sommerblomster utvikler finmotorikk mens barn uttrykker sommerens varme fargepalett og \u00f8ver kreativt uttrykk i en ferieinspirert kontekst.',
    },
    {
      appId: 'find-and-count',
      anchorText: 'sommer finn-og-tell',
      context: 'Finn-og-tell-oppgaver med skjell, iskremkuler og strandleker bygger telleflyt og visuell skanning i en kontekst som gj\u00f8r matematikk\u00f8velse til en del av sommermoroa.',
    },
    {
      appId: 'word-search',
      anchorText: 'sommer ords\u00f8k',
      context: 'Ords\u00f8k med sommervokabular som solkrem, badevakt, tropisk og hengek\u00f8ye bygger stavebevissthet og utvider barnets beskrivende ordforr\u00e5d med sesongaktuelle begreper.',
    },
    {
      appId: 'treasure-hunt',
      anchorText: 'sommer skattejakt',
      context: 'Skattejaktoppgaver med strandfester og bassengscener utvikler logisk tenkning og visuell diskriminering mens barn f\u00f8ler at de er p\u00e5 et ekte sommeroppdagelsesesventyr.',
    },
  ],

  classroomScenarios: [
    {
      situation: 'En l\u00e6rer skal forberede en avslutningspakke for skoleferien, men vil unng\u00e5 kjedelige repetisjonshefter som ender opp ubrukt i bagen.',
      solution: 'L\u00e6reren lager en sommerlæringspakke med varierte sommerarbeidsark: fargeleggingssider, ords\u00f8k, telleoppgaver og skattejakter, alt med strand- og ferietemaer. Pakken inkluderer et sommerlæringsskjema der elevene f\u00e5r klistremerker for fullf\u00f8rte arbeidsark.',
      outcome: 'Elevene opplever pakken som en del av feriegledesn snarere enn lekser. Sommertemaet motiverer frivillig engasjement, og klistremerkesystemet gir en f\u00f8lelse av fremgang som opprettholder \u00f8velsen gjennom hele ferien.',
    },
    {
      situation: 'En sommerleir-leder trenger strukturerte aktiviteter for regnv\u00e6rsdager som er pedagogiske uten \u00e5 f\u00f8les som skole.',
      solution: 'Lederen bruker sommerarbeidsark som stasjonssaktiviteter: \u00e9n stasjon med strandfarging, \u00e9n med iskrem-addisjonsoppgaver, \u00e9n med sommerords\u00f8k og \u00e9n med finn-den-som-skiller-seg-ut-puslespill. Barna roterer mellom stasjonene i sm\u00e5grupper.',
      outcome: 'Barna er engasjerte fordi stasjonene f\u00f8les som spill og feriemoro. Leirlederen dekker matte, lesing og logikk uten at barna oppdager at de l\u00e6rer, og regnv\u00e6rsdagen blir et h\u00f8ydepunkt fremfor en skuffelse.',
    },
    {
      situation: 'En forelder skal p\u00e5 to ukers biltur med barn som vanligvis bruker mye skjermtid i bilen.',
      solution: 'Forelderen skriver ut en mappe med sommerarbeidsark i ulike kategorier: fargelegging for langkj\u00f8ring, ords\u00f8k for flyplassventing, og matteoppgaver for rasteplasser. Barnet f\u00e5r velge hvilket arbeidsark det vil gj\u00f8re og f\u00e5r en liten sommergodt etter fullf\u00f8ring.',
      outcome: 'Skjermtiden reduseres merkbart fordi barna har et attraktivt alternativ som kobler til ferieopplevelsene. Fargeleggingssider og ordleting fungerer godt i bevegelse, og arbeidsarkene blir samtalestartere om stedene familien bes\u00f8ker.',
    },
  ],

  differentiationStrategies: [
    {
      learnerType: 'Visuelle elever',
      adaptation: 'Bruk de fargerike strandscenene og sommerillustrrasjonene til \u00e5 engasjere visuell bearbeiding. La visuelle elever lage collager av sommerarbeidsark organisert etter tema, og bruk bilder av sommeraktiviteter som visuelle ankere for matematiske begreper som telling og sortering.',
    },
    {
      learnerType: 'Kinestetiske elever',
      adaptation: 'Suppler arbeidsark med praktiske sommeraktiviteter som \u00e5 bygge sandslott, lage issmoothier med tellbare ingredienser og m\u00e5le vanntemperatur. La kinestetiske elever bruke skjell, steiner og sommerleker som konkrete telleobjekter ved siden av papiraktivitetene.',
    },
    {
      learnerType: 'Flerspr\u00e5klige elever',
      adaptation: 'Sommeropplevelser er universelle p\u00e5 tvers av kulturer, men feires ulikt. La flerspr\u00e5klige elever beskrive sommeren i hjemlandet sitt og sammenligne med norsk sommer. Bruk bildeordboker med sommervokabular p\u00e5 norsk og barnets morsm\u00e5l for \u00e5 bygge tverrspråklig ordforr\u00e5d.',
    },
    {
      learnerType: 'Avanserte elever',
      adaptation: 'Utfordr avanserte elever med sommerplanleggingsprosjekter der de beregner feriebudsjetter med multiplikasjon, planlegger dagsutflukter med medg\u00e5tt tid, analyserer v\u00e6rdata fra sommerukene og skriver reiseguider med faktainformasjon og overbevisende argumenter.',
    },
  ],

  crossCurricularLinks: [
    {
      subject: 'Naturfag',
      connection: 'Sommerarbeidsark st\u00f8tter kompetansem\u00e5l i Kunnskapsl\u00f8ftet (LK20) om \u00e5rstider, v\u00e6r og naturmilj\u00f8er ved \u00e5 utforske sommerfenomener som sollys, varme, vannsyklus og marine habitater gjennom engasjerende arbeidsarkformater.',
      activity: 'Elevene registrerer daglig temperatur og soltimer i to uker, lager et s\u00f8ylediagram over v\u00e6rdataene og skriver en kort rapport om sammenhengen mellom sol og temperatur.',
    },
    {
      subject: 'Matematikk',
      connection: 'Sommeraktiviteter gir autentiske kontekster for kompetansem\u00e5l i LK20 om telling, regneoperasjoner, tids- og pengeforst\u00e5else gjennom feriebudsjettering, tidsplanlegging og m\u00e5ling i sommerkontekster.',
      activity: 'Elevene planlegger en fantasiferiedag med et gitt budsjett, beregner kostnader for aktiviteter, is og transport, og sammenligner totalene for \u00e5 finne den beste verdien.',
    },
    {
      subject: 'Norsk og kropps\u00f8ving',
      connection: 'Sommertemaet st\u00f8tter Kunnskapsl\u00f8ftets m\u00e5l om beskrivende og fortellende skriving ved \u00e5 gi motiverende skriveoppdrag om ferieopplevelser, samtidig som utend\u00f8rs sommeraktiviteter kobler til kompetansem\u00e5l i kropps\u00f8ving om friluftsliv.',
      activity: 'Elevene skriver en personlig fortelling om sin beste sommerdag med sansebeskrivelser, og presenterer den for klassen med tilh\u00f8rende illustrasjon eller collage.',
    },
  ],

  assessmentIdeas: [
    {
      method: 'Sommerlæringsdagbok',
      criteria: 'Eleven kan fullf\u00f8re minst to arbeidsark per uke gjennom ferien, registrere fullf\u00f8rte aktiviteter i en logg og skrive en kort refleksjon om hva de l\u00e6rte av hver oppgave.',
      gradeLevel: 'Barnehage til 1. klasse',
    },
    {
      method: 'Ferieplanleggingsprosjekt',
      criteria: 'Eleven kan bruke addisjon og multiplikasjon til \u00e5 beregne et feriebudsjett, planlegge en dagsutflukt med tidsberegninger og skrive en overbevisende tekst som argumenterer for sin ferieplan.',
      gradeLevel: '2. klasse til 3. klasse',
    },
    {
      method: 'Formativ observasjon under sommeraktivitet',
      criteria: 'Eleven kan telle sommerobjekter korrekt til ti, sortere strandgjenstander etter gitte egenskaper og bruke sommerordforr\u00e5d som strand, sol og is i samtale og p\u00e5 arbeidsarket.',
      gradeLevel: 'F\u00f8rskole til barnehage',
    },
  ],

  expertTips: [
    {
      tip: 'Skap en sommerl\u00e6ringsrutine ved \u00e5 koble arbeidsark til faste tidspunkter i feriedagen, for eksempel etter frokost eller f\u00f8r bading. Konsistens er viktigere enn varighet: ti minutter tre ganger per uke hele sommeren forebygger mer sommerglidning enn en intensiv \u00f8kt i august.',
      source: 'Kunnskapsl\u00f8ftet (LK20) \u2014 jevn progresjon og tilpasset oppl\u00e6ring',
      gradeRange: 'F\u00f8rskole til 1. klasse',
    },
    {
      tip: 'Koble hvert sommerarbeidsark til en virkelig opplevelse samme dag: et telleark f\u00f8r iskiosken, et ordletingsark f\u00f8r strandturen. Denne umiddelbare forbindelsen mellom papirl\u00e6ring og levd erfaring styrker hukommelsen og gj\u00f8r barna mer villige til \u00e5 engasjere seg frivillig.',
      source: 'Erfaringsbasert l\u00e6ring \u2014 Deweys prinsipp om learning by doing i norsk pedagogisk tradisjon',
      gradeRange: 'Barnehage til 2. klasse',
    },
    {
      tip: 'Bruk sommerbudsjetteringsprosjekter som autentisk kontekst for multiplikasjon og pengeforst\u00e5else. N\u00e5r elevene beregner kostnaden for fem dager med sv\u00f8mmekurs eller tre uker med sommerleir, \u00f8ver de flerstegsregning i en kontekst som er direkte relevant for familienes ferieplanlegging.',
      source: 'Kunnskapsl\u00f8ftet (LK20) \u2014 praktisk regning og \u00f8konomiforst\u00e5else i sm\u00e5skolen',
      gradeRange: '2. klasse til 3. klasse',
    },
  ],

  quickStats: [
    { label: 'Anbefalt aldersgruppe', value: '3\u20139 \u00e5r' },
    { label: 'Arbeidsark-apper tilgjengelige', value: '10 apper' },
    { label: 'Fagomr\u00e5der dekket', value: 'Matematikk, norsk, naturfag' },
    { label: 'Klassetrinn st\u00f8ttet', value: 'F\u00f8rskole til 3. kl.' },
    { label: 'Gjennomsnittlig \u00f8ktvarighet', value: '10\u201320 min' },
    { label: 'Sommeraktiviteter tilgjengelige', value: '10+ sommeroppgaver' },
  ],`,
  },
];

// ==============================================================
// EXECUTION
// ==============================================================

let totalUpdated = 0;

for (const theme of themes) {
  const filePath = path.join(BASE, theme.folder, 'no.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing: ${theme.folder}/no.ts`);
  console.log('='.repeat(60));

  // 1. Replace SEO fields (first occurrence of each)
  const oldTitle = content.match(/  title: '([^']*)'/)?.[1] || '';
  content = content.replace(/(  title: ')[^']*(')/,  `$1${theme.seo.title}$2`);
  console.log(`  title: "${oldTitle.substring(0, 40)}..." -> "${theme.seo.title.substring(0, 40)}..."`);

  const oldDesc = content.match(/  description: '([^']*)'/)?.[1] || '';
  content = content.replace(/(  description: ')[^']*(')/,  `$1${theme.seo.description}$2`);
  console.log(`  description: "${oldDesc.substring(0, 40)}..." -> "${theme.seo.description.substring(0, 40)}..."`);

  const oldKw = content.match(/  keywords: '([^']*)'/)?.[1] || '';
  content = content.replace(/(  keywords: ')[^']*(')/,  `$1${theme.seo.keywords}$2`);
  console.log(`  keywords: ${oldKw.split(',').length} kw -> ${theme.seo.keywords.split(',').length} kw`);

  const oldHeading = content.match(/  heading: '([^']*)'/)?.[1] || '';
  content = content.replace(/(  heading: ')[^']*(')/,  `$1${theme.seo.heading}$2`);
  console.log(`  heading: "${oldHeading}" -> "${theme.seo.heading}"`);

  // 2. Insert enrichment block after relatedBlogCategories marker
  const marker = 'relatedBlogCategories: [],';
  const markerIdx = content.lastIndexOf(marker);
  if (markerIdx === -1) {
    console.log('  ERROR: Could not find relatedBlogCategories marker');
    continue;
  }

  const before = content.substring(0, markerIdx + marker.length);
  const after = content.substring(markerIdx + marker.length);
  content = before + theme.enrichment + after;

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalUpdated++;
    console.log(`  SAVED: ${theme.folder}/no.ts (${content.split('\n').length} lines)`);
  } else {
    console.log(`  WARNING: No changes for ${theme.folder}/no.ts`);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Done! Updated ${totalUpdated} of ${themes.length} files.`);
console.log('='.repeat(60));
