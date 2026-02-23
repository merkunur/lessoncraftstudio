import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Stor og Lille Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/stor-lille-arbejdsark.ts
 * URL: /da/apps/stor-lille-arbejdsark
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Danish/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const bigSmallDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'stor-lille-arbejdsark',
    appId: 'big-small',
    title: 'Størrelsessammenligning Generator | LessonCraftStudio',
    description: 'Lav printbare stor og lille sammenligningsopgaver med billeder. Udvikl størrelsesbegreber fra førskole til 1. klasse. Tilpas indstillinger. Gratis PDF.',
    keywords: 'størrelsessammenligning generator, stor og lille opgaver, størrelsessammenligning førskole, størrelser genkendelse, større og mindre, størrelses sammenligning til børn, stor lille printbar, størrelsesforskel opgaver, størrelsesøvelser førskole, sammenligningsfærdigheder øvelse, størrelser sortering',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/stor-lille-arbejdsark',
      },

  // Hero Section - FULL text from big-small.md paragraphs 1-4
  hero: {
    title: 'Stor og Lille Generator',
    subtitle: 'Størrelsessammenligningsøvelser med Billeder fra Førskole til 1. Klasse',
    description: `Opret professionelle stor og lille opgaver til print med vores specialiserede generator. Dit Fuld Adgang abonnement giver dig ubegrænset adgang til at lave arbejdsark om størrelsesforskelle uden ekstra omkostninger per opgave. Generer tilpassede opgaver til børnehaveklassen, 0. klasse og 1. klasse på under 3 minutter. Download arbejdsark i høj kvalitet som PDF eller JPEG.

Vores stor og lille generator hjælper pædagoger med at undervise i grundlæggende matematiske begreber gennem visuelle størrelsessammenligninger. Børn lærer at skelne mellem stor, lille og mellemstor gennem engagerende opgaver til print. Alle opgaverne kan tilpasses fuldstændigt efter dine elevers behov og læringsniveau.

Generatoren skaber opgaver hvor børn skal finde den lille genstand, den store genstand eller den mellemstore genstand. Du kan også lave opgaver hvor børn nummererer genstande fra lille til stor eller stor til lille. Dette styrker både visuel diskrimination og matematisk tænkning gennem praktiske øvelser.

Med over 3000 barnvenlige billeder kan du nemt lave tematiske arbejdsark. Kombinér størrelsesopgaver med matematikopgaver, finmotorik øvelser eller malebog aktiviteter. Dine gratis skoleopgaver bliver både lærerige og sjove for de yngste elever i børnehaveklassen og indskolingen.`,
    previewImageSrc: '/samples/danish/big-small/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Prøv Gratis',
      viewSamples: 'Se Eksempler',
    },
    trustBadges: {
      languages: '11 Sprog',
      images: '3000+ Billeder',
      license: 'Kommerciel Licens',
    },
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Se hvordan det virker',
        modalTitle: 'Funktionsoversigt',
      },
      appSpecific: {
        videoId: 'S2s2U6Nb7FI',
        buttonText: 'Stor-Lille Funktioner',
        modalTitle: 'Stor-Lille Vejledning',
      },
    },
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    floatingStats: {
      time: 'Klar på 3 min',
      action: 'Nemt at bruge',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Gratis Arbejdsark til Børn - Gratis Arbejdsark og Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis arbejdsark til børn af professionel kvalitet. Gratis arbejdsark og arbejdsark til børn perfekt til arbejdsark til børnehaveklasse. Gratis arbejdsark til børn og arbejdsark til børn inkluderer undervisningsmateriale. Gratis arbejdsark tilgængeligt',
    badgeText: 'Gratis Eksempler',
    downloadLabel: 'Download Gratis Eksempel',
    downloadingLabel: 'Downloader...',
    worksheetLabel: 'Arbejdsark',
    answerKeyLabel: 'Facitark',
    viewAllLabel: 'Se alle',
    noPdfLabel: 'Ingen PDF tilgængelig',
    freePdfCountLabel: '3 gratis downloads',
    ofLabel: 'af',
    items: [],

  },

  // Features Grid - FULL text from big-small.md feature sections
  features: {
    sectionTitle: 'Gratis Arbejdsark og Arbejdsark til Børn - Gratis Printables og Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Vores stor og lille generator indeholder alle funktioner pædagoger behøver for at lave engagerende opgaver til print. Med Fuld Adgang får du adgang til professionelle værktøjer der gør det nemt at skabe tilpassede arbejdsark til børnehaveklassen, 0. klasse og 1. klasse. Hver funktion er designet til at spare tid og give dig fleksibilitet til at lave præcis de opgaver dine elever har brug for. Fra matematikopgaver til finmotorik øvelser er alt inkluderet i dit abonnement.',
    highlightBadgeText: 'Vigtig Funktion',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alle funktioner inkluderet',
      noHiddenFees: 'Ingen skjulte gebyrer',
      cancelAnytime: 'Opsig når som helst',
    },
    items: [
      {
        id: '1',
        icon: '🔍',
        title: '5 opgavetyper til størrelsessammenligning',
        description: 'Generatoren tilbyder fem forskellige opgavetyper der dækker hele progressionen inden for størrelsesbegreber: Find den lille, Find den store, Find den mellemstore, Nummerér fra lille til stor og Nummerér fra stor til lille. Hver opgavetype træner forskellige aspekter af størrelsesdiskrimination i overensstemmelse med FM.MAT.TA.1-3 (tal: sammenligning og ordning). Variér mellem opgavetyper for at sikre at eleverne mestrer alle retninger af størrelsessammenligning – ikke kun én.',
      },
      {
        id: '2',
        icon: '🖼️',
        title: '2-3 billeder per opgave med fleksibelt layout',
        description: 'Vælg mellem 2 eller 3 billeder per størrelsesopgave afhængigt af sværhedsgrad. Med 2 billeder sammenligner børnene simpelt stor og lille – perfekt til førskolen og børnehaveklassen. Med 3 billeder tilføjes mellemstor som kræver finere størrelsesdiskrimination og støtter FM.MAT.MK.1-3 (repræsentation og kommunikation). Layoutet justerer sig automatisk med korrekt mellemrum uanset antal billeder per opgave.',
      },
      {
        id: '3',
        icon: '🔄',
        title: 'Identiske og forskellige billedtilstande',
        description: 'Vælg mellem identisk tilstand hvor samme genstand vises i forskellige størrelser og forskellig tilstand hvor forskellige genstande sammenlignes. Identisk tilstand er nemmere fordi børnene kun fokuserer på størrelse uden distraherende formforskelle – ideel til de yngste i førskolen. Forskellig tilstand er mere udfordrende og kræver at børnene abstraherer størrelsesbegrebet på tværs af objekter. Skift mellem tilstandene for progressiv sværhedsgrad.',
      },
      {
        id: '4',
        icon: '📚',
        title: '3000+ tematiske billeder i 104 temaer',
        description: 'Vælg blandt over 3000 børnevenlige billeder organiseret i 104 temaer som dyr, køretøjer, mad, legetøj og natur. Tematiske størrelsesopgaver knytter matematisk sammenligning til kendte genstande fra hverdagen – præcis som Fælles Mål anbefaler for indskolingen. Brug dyr-temaet til en biologiuge eller køretøjer til et trafikprojekt. Størrelser genkendelse og størrelser sortering bliver meningsfuld når billederne matcher undervisningens kontekst.',
      },
      {
        id: '5',
        icon: '✅',
        title: 'Automatisk facitark med tydelige markeringer',
        description: 'Hvert genereret arbejdsark har et tilhørende facitark der markerer de korrekte svar tydeligt. For find-opgaver viser grønne flueben det korrekte billede. For nummeringsopgaver viser tal i boksene den rigtige rækkefølge fra lille til stor eller stor til lille. Print facitarket separat til læreren eller vis det på smartboardet til fælles gennemgang. Eleverne kan også bruge facitarket til selvevaluering og selvstændig øvelse.',
      },
      {
        id: '6',
        icon: '📤',
        title: 'Upload dine egne billeder til personlige opgaver',
        description: 'Upload ubegrænset antal egne billeder direkte i generatoren. Brug klasserumsbilleder, fotos fra en skoletur eller kæledyrsbilleder til at lave stor og lille opgaver der er personligt relevante for eleverne. Uploadede billeder integreres problemfrit med bibliotekets 3000+ billeder så du kan blande egne fotos med tematiske illustrationer. Personlige billeder øger motivationen markant fordi børnene genkender genstandene fra deres hverdag.',
      },
      {
        id: '7',
        icon: '💼',
        title: 'Kommerciel licens til salg af materialer',
        description: 'Dit Fuld Adgang abonnement inkluderer fuld kommerciel licens uden ekstra gebyrer. Sælg dine stor og lille arbejdsark på Teachers Pay Teachers, Etsy eller din egen webshop. Stor lille printbar opgaver er særligt efterspurgte blandt forældre og pædagoger i førskolen. Skab tematiske pakker med 10-20 ark i progressive sværhedsgrader. Ingen attribueringskrav – dine opgaver er dine at sælge frit.',
      },
      {
        id: '8',
        icon: '🌍',
        title: '11 sprog til flersprogede læringsmiljøer',
        description: 'Generatoren understøtter 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, norsk og finsk. Skift sprog med ét klik for at lave størrelsesopgaver til tosprogede elever eller internationale klasser. Alle instruktioner, overskrifter og facitark oversættes automatisk. Perfekt til modtageklasser hvor størrelsesbegreber er universelle men instruktionerne skal være på elevernes modersmål.',
      },
    ],

  },

  // How-To Guide - FULL text from big-small.md step sections
  howTo: {
    sectionTitle: 'Gratis Arbejdsark til Børn Oprette - Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Opret professionelle størrelsesopgaver på under 3 minutter fra start til færdig download. Denne trin-for-trin guide viser dig præcis hvordan du bruger generatoren til at lave tilpassede arbejdsark og kopiark. Ingen tekniske færdigheder kræves. Følg bare de 5 simple trin nedenfor og du har færdige opgaver til print klar til din klasse. Perfekt til travle pædagoger der har brug for hurtige løsninger til børnehaveklassen og indskolingen.',
    badgeText: 'Trin-for-Trin Guide',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    stepLabel: 'Trin',
    readyTime: 'Klar på under 3 minutter',
    noSkillsNeeded: 'Intet designkendskab påkrævet',
    ctaText: 'Start Nu',
    completionTitle: 'Færdig!',
    completionSubtitle: 'Dit arbejdsark er klar til download',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Vælg Billeder til Dine Gratis Arbejdsark til Børn og 0. Klasse',
        description: `Start med at vælge hvilke billeder du vil bruge i opgaverne. Klik på temavelgeren i billedbiblioteket. Vælg mellem over 50 forskellige temaer som dyr, køretøjer, mad eller legetøj. Alle 3000+ billeder er organiseret så du hurtigt finder relevante genstande. Dette gør det nemt at lave tematiske opgaver der matcher din undervisningsplan.

Du kan også søge efter specifikke billeder med søgefeltet. Skriv navnet på en genstand og relevante billeder vises. Klik på billeder for at tilføje dem til dine valgte billeder. Du kan vælge så mange eller så få billeder som du vil. Generatoren bruger dine valgte billeder til at skabe opgaverne.

Alternativt kan du uploade dine egne billeder. Klik på upload knappen og vælg flere filer på én gang. Dine personlige billeder blandes med biblioteksbilderne. Dette er perfekt til at lave opgaver med genstande fra jeres klasseværelse eller fra en skoletur børnene har været på.

Hvis du ikke vælger specifikke billeder bruges det valgte arbejdsark-tema automatisk. Generatoren vælger tilfældige billeder fra temaet. Dette er den hurtigste måde at lave opgaver på når du har brug for opgaver til print med det samme.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger for Arbejdsark og Kopiark til 1. Klasse',
        description: `Åbn opgaveindstillinger sektionen i sidepanelet. Vælg hvor mange opgaver du vil have per ark. For børnehaveklassen fungerer 2-4 opgaver godt. For 1. klasse kan du bruge 6-8 opgaver. For 2. klasse kan du lave 10 opgaver på ét ark.

Vælg hvor mange billeder der skal være i hver opgave. Vælg 2 billeder for simpel stor/lille sammenligning. Vælg 3 billeder når du vil inkludere mellemstor eller lave nummeringsopgaver. Yngre børn har lettere ved 2 billeder mens ældre elever klarer 3 billeder godt.

Vælg billedtilstand mellem identiske eller forskellige billeder. Identiske billeder viser samme genstand i forskellige størrelser. Dette er nemmere for de yngste børn. Forskellige billeder viser forskellige genstande som skal sammenlignes. Dette er mere udfordrende og kræver bedre størrelsesdiskrimination.

Vælg opgavetype fra de fem muligheder. Find den lille er god til at starte med. Find den store er den mest populære. Find den mellemstore kræver 3 billeder. Nummerér fra lille til stor og nummerér fra stor til lille er sværere opgaver der træner rækkefølge.

Marker eller afmarker svar-indikatorer hvis du vil have tomme cirkler eller bokse på arket. Marker øvelsesnumre hvis du vil have opgaverne nummereret. Vælg sideformat mellem portræt og landskab. Vælg om du vil have navn og dato felter øverst på arket.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generer Gratis Arbejdsark og Gratis Printables med Ét Klik',
        description: `Når alle indstillinger er valgt klik på Opret knappen øverst til højre. Generatoren laver dit arbejdsark på få sekunder. Opgaverne vises automatisk på lærredet. Layoutet er optimeret med korrekt mellemrum og placering af alle elementer. Intet manuelt arbejde kræves.

Generatoren placerer opgaverne i et pænt gitter. Portræt format bruger 2 kolonner. Landskab format bruger 3 kolonner. Dette sikrer opgaverne aldrig ser sammenklemte ud. Alle billeder får automatisk de rigtige størrelsesforskelle så opgaverne fungerer korrekt.

Se hvordan opgaverne ser ud på lærredet. Kontrollér at billederne passer til din klasse. Check at sværhedsgraden er rigtig. Hvis du vil lave ændringer kan du justere indstillingerne og klikke Opret igen. Dette genererer et nyt arbejdsark med de nye indstillinger.

Når arbejdsarket er genereret kan du også lave svarark. Klik på dropdown pilen ved Opret knappen. Vælg Svarark. Generatoren laver automatisk et svarark med rigtige svar markeret. Grønne flueben viser korrekte svar for find-opgaver. Tal i bokse viser korrekt rækkefølge for nummeringsopgaver.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Rediger Arbejdsark på Lærredet - Tilpas Kopiark til Finmotorik Øvelser',
        description: `Nu kan du redigere alt på lærredet efter dine ønsker. Klik på et billede for at vælge det. Træk det til en ny position. Rotér det ved at trække i hjørnet. Skalér det større eller mindre med hjørnehåndtagene. Slet det med Delete tasten hvis du ikke vil have det med.

Tilføj overskrifter med tekst-værktøjet. Skriv teksten i feltet og klik Tilføj tekst. Teksten vises på lærredet. Vælg teksten og ændr farve, størrelse og skrifttype. Tilføj en kontur til teksten for at gøre den lettere at læse. Dette er perfekt til at lave tydelige opgaveoverskrifter.

Brug justering-værktøjerne til at arrangere elementer pænt. Vælg flere elementer ved at holde Shift nede mens du klikker. Juster dem venstre, centreret eller højre. Juster dem top, midt eller bund. Dette giver professionelt udseende arbejdsark med perfekt placering.

Tilføj baggrund eller ramme fra sideopsætning sektionen. Vælg et baggrundstema og klik på en baggrund. Juster gennemsigtigheden med skyderen. Vælg et rammetema og klik på en ramme. Dette gør arbejdsarkene mere visuelt tiltrækkende for børn.

Fortryd og gentag knapperne lader dig eksperimentere uden risiko. Prøv forskellige placeringer og træk tilbage hvis det ikke ser godt ud. Zoom ind for at se detaljer. Zoom ud for at se hele arket. Dette giver dig fuld kontrol over det færdige resultat.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download Opgaver som PDF eller JPEG - Gratis Arbejdsark til Børn Klar til Brug',
        description: `Når arbejdsarket ser perfekt ud er det tid til at downloade. Klik på Download knappen øverst til højre. Vælg mellem JPEG eller PDF format. JPEG er godt til hurtig deling online. PDF bevarer kvaliteten bedst til print og kan gemmes i din computer.

Download både arbejdsark og svarark separat. Vælg Arbejdsark JPEG eller Arbejdsark PDF for eleven-versionen. Vælg Svarark JPEG eller Svarark PDF for lærer-versionen med svar. Nu har du både opgaver og facit klar til brug i klassen.

Marker gråtone afkrydsningsfeltet hvis du vil spare farveblæk. Dette konverterer arket til sort-hvid før download. Perfekt når budgettet er stramt eller når farver ikke er nødvendige. Kvaliteten forbliver høj selv i gråtone.

Alle downloads er i 300 DPI professionel kvalitet. Print derhjemme på din almindelige printer. Eller send til professionelt trykkeri for masseoplag. Kvaliteten er god nok til at sælge på Teachers Pay Teachers eller Etsy hvis du har Fuld Adgang abonnement med kommerciel licens.

Gem PDF filerne på din computer. Organisér dem i mapper efter tema eller klassetrin. Genprint når du har brug for flere kopier. Del med kolleger der kan printe deres egne. Dette sparer enorm tid når du har brug for de samme opgaver næste år eller i en anden klasse.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from big-small.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbejdsark til Børn - Arbejdsark til Børnehaveklasse med Gratis Printables. Arbejdsark til Børn',
    sectionDescription: 'Vores størrelsesopgave generator passer til mange forskellige undervisningssituationer. Fra børnehaveklassen til 3. klasse bruger pædagoger generatoren til forskellige formål. Hjemmeundervisningsforældre finder den uvurderlig til daglig brug. Specialpædagoger kan nemt tilpasse opgaverne til forskellige niveauer. Uanset om du underviser i 0. klasse eller arbejder med ældre elever er generatoren et alsidigt værktøj.',
    badgeText: 'Brugseksempler',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [
      {
        id: '1',
        icon: '🎓',
        title: 'Børnehaveklassepædagoger',
        subtitle: 'Visuel størrelseslæring med legende tilgang',
        description: 'Skab engagerende stor og lille opgaver der passer perfekt til børnehaveklassens legende undervisning. Brug identisk billedtilstand med 2 billeder per opgave så eleverne fokuserer udelukkende på størrelsesforskellen. Vælg temaer fra hverdagen – dyr, legetøj eller mad – der matcher ugens emne. Hold 2-4 opgaver per ark så eleverne kan arbejde selvstændigt uden at blive overvældet. Opgaverne understøtter FM.MAT.TA.1-3 for grundlæggende talforståelse og sammenligning.',
      },
      {
        id: '2',
        icon: '📖',
        title: 'Indskolingslærere',
        subtitle: 'Differentieret størrelsestræning i 1.-3. klasse',
        description: 'Lav differentierede størrelsesopgaver til tre niveauer på 10 minutter. Niveaugruppér med identiske billeder og 2 objekter for de usikre, forskellige billeder med 3 objekter for midterniveauet og nummeringsopgaver fra stor til lille for de stærke elever. Brug størrelsesøvelser som opvarmning før matematiktimen eller som selvstændige stationsopgaver. Opgaverne træner visuel diskrimination og ordinalitetsforståelse der er forudsætning for mere avanceret matematisk ræsonnement.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Forældre og hjemmeundervisere',
        subtitle: 'Sjove størrelsesopgaver til hverdagslæring',
        description: 'Lav stor og lille opgaver til alle dine børn med ét abonnement. Personliggør opgaverne ved at uploade familiebilleder eller kæledyrsbilleder så børnene engagerer sig mere i størrelsessammenligningen. Juster sværhedsgraden efter hvert barns niveau – fra simple find-den-store opgaver med 2 identiske billeder til mere udfordrende nummeringsopgaver med 3 forskellige genstande. Perfekt til regndage, ferier eller daglig øvelse der styrker størrelsesbegreber legende.',
      },
      {
        id: '4',
        icon: '🎨',
        title: 'SFO-pædagoger',
        subtitle: 'Legende størrelsesopgaver efter skoletid',
        description: 'Skab sjove størrelsesopgaver til fritidsordningen der kombinerer læring med leg. Vælg temaer der passer til SFO-aktiviteter som udedyr, insekter eller sportsudstyr. Stor og lille opgaver er perfekte til rolige stunder hvor børnene har brug for en struktureret aktivitet. Identiske billeder i forskellige størrelser gør opgaverne tilgængelige som en legende aktivitet. Eleverne øver størrelsesdiskrimination uden det føles som traditionelle lektier.',
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Speciallærere',
        subtitle: 'Tilpasset størrelsestræning til individuelle behov',
        description: 'Juster antal opgaver, billedtilstand og opgavetype efter den enkelte elevs behov og elevplan. Skab overskuelige arbejdsark med kun 1-2 opgaver og store identiske billeder for at reducere kognitiv belastning. Brug identisk billedtilstand til elever der endnu ikke mestrer størrelsesabstraktion på tværs af forskellige objekter. Gradvis øgning fra find-den-store med 2 billeder til nummeringsopgaver med 3 billeder støtter læringsforløbet i den enkelte elevs tempo.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Materialeproducenter',
        subtitle: 'Sælg størrelsespakker med kommerciel licens',
        description: 'Lav tematiske stor og lille pakker til salg online. Størrelsesforskel opgaver til førskole og børnehaveklasse er eftertragtede på Teachers Pay Teachers og Etsy. Kombiner alle fem opgavetyper i progressive pakker med 10-20 ark – fra simple find-den-store opgaver til avancerede nummeringsøvelser. Den kommercielle licens dækker alle platforme uden ekstra gebyrer eller attribueringskrav. Stor lille printbar materialer sælger særligt godt i begyndelsen af skoleåret.',
      },
    ],

  },

  // Pricing Section - Full Access tier
  pricing: {
    title: 'Fuld Adgang',
    price: '$240',
    priceInterval: '/år',
    priceSuffix: 'Faktureres årligt',
    benefits: [
      'Ubegrænset stor og lille oprettelse',
      'Kommerciel licens inkluderet',
      '11 sprog understøttet',
      '3000+ tematiske billeder',
      '300 DPI printkvalitet',
      'Facitark inkluderet',
      'Alle 33 generatorer inkluderet',
    ],
    ctaText: 'Start Nu',
    bundleDescription: 'Dit abonnement inkluderer adgang til alle 33 arbejdsarkgeneratorer:',
    bundleApps: [
      'Billedaddition',
      'Alfabettog',
      'Stor eller lille',
      'Billedbingo',
      'Diagrammer tæl og farv',
      'Kodeaddition',
      'Malebøger',
      'Billedkrydsord',
      'Billedkryptogram',
      'Tegn og farv',
      'Tegn linjer',
      'Find og tæl',
      'Find objekter',
      'Gittermatch',
      'Matchspil',
      'Matematikpuslespil',
      'Matematikark',
      'Manglende brikker',
      'Mere eller mindre',
      'Hvad passer ikke ind',
      'Mønstertog',
      'Mønsterark',
      'Billedsti',
      'Sorter billeder',
      'Forholdsord',
      'Skyggeparring',
      'Subtraktion',
      'Sudoku for børn',
      'Skattejagt',
      'Gæt ordet',
      'Bogstavblanding',
      'Ordsøgning',
      'Skriveøvelser',
    ],
  },

  // FAQ Section - FULL text from big-small.md FAQ sections
  faq: {
    sectionTitle: 'FAQ - Gratis Arbejdsark til Børn og Arbejdsark til Børnehaveklasse. Arbejdsark til Børn',
    sectionDescription: 'Pædagoger og forældre har mange spørgsmål om størrelsesopgave generatoren før de begynder at bruge den. Her er svarene på de mest almindelige spørgsmål. Disse svar hjælper dig med at forstå præcis hvordan generatoren virker og hvad du kan lave med den.',
    badgeText: 'FAQ',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    showMoreText: 'Vis flere spørgsmål',
    secureCheckout: 'Sikker betaling',
    cancelAnytime: 'Opsig når som helst',
    items: [
      {
        id: '1',
        question: 'Hvilke opgavetyper kan jeg lave med stor og lille generatoren?',
        answer: 'Generatoren tilbyder fem forskellige opgavetyper: Find den lille (børnene identificerer den mindste genstand), Find den store (børnene identificerer den største genstand), Find den mellemstore (kræver 3 billeder – børnene finder genstanden i midten), Nummerér fra lille til stor (børnene skriver 1, 2, 3 i korrekt størrelsesrækkefølge) og Nummerér fra stor til lille (omvendt rækkefølge). Denne variation dækker hele progressionen fra simpel størrelsesdiskrimination til ordinal forståelse.',
      },
      {
        id: '2',
        question: 'Hvad er forskellen på identisk og forskellig billedtilstand?',
        answer: 'Identisk billedtilstand viser den samme genstand (fx en kat) i 2 eller 3 forskellige størrelser. Børnene fokuserer udelukkende på størrelsesforskellen uden at blive distraheret af formforskelle. Forskellig billedtilstand viser forskellige genstande (fx en kat, en hund og en fugl) i forskellige størrelser. Dette er sværere fordi børnene skal abstrahere størrelsesbegrebet på tværs af objekter. Start med identisk tilstand i førskolen og skift gradvist til forskellig tilstand i børnehaveklassen.',
      },
      {
        id: '3',
        question: 'Hvordan justerer jeg sværhedsgraden til forskellige alderstrin?',
        answer: 'Juster tre parametre for at tilpasse sværhedsgraden: Antal billeder (2 for let, 3 for sværere), billedtilstand (identisk for let, forskellig for sværere) og opgavetype (find-opgaver for let, nummeringsopgaver for sværere). For førskolen: 2-4 opgaver per ark med 2 identiske billeder og Find den store. For børnehaveklassen: 4-6 opgaver med 3 billeder og blanding af find-opgaver. For 1. klasse: 6-8 opgaver med nummeringsopgaver og forskellige billeder.',
      },
      {
        id: '4',
        question: 'Inkluderer opgaverne facitark?',
        answer: 'Ja, hvert genereret arbejdsark inkluderer automatisk et facitark. For find-opgaver (find den lille, store eller mellemstore) markeres det korrekte billede med et grønt flueben. For nummeringsopgaver vises de korrekte tal (1, 2, 3) i boksene under billederne. Print facitarket separat til dig selv eller vis det på smartboardet til fælles gennemgang. Eleverne kan også bruge facitarket til selvstændig selvevaluering.',
      },
      {
        id: '5',
        question: 'Hvilke aldersgrupper passer stor og lille opgaverne til?',
        answer: 'Størrelsesopgaverne dækker børn fra 3-8 år. Førskolebørn (3-5 år) arbejder med simple find-den-store opgaver med 2 identiske billeder. Børnehaveklassebørn (5-6 år) mestrer alle fem opgavetyper med blanding af identiske og forskellige billeder. 1. klasse (6-7 år) bruger nummeringsopgaver med 3 forskellige billeder. 2. klasse (7-8 år) bruger opgaverne som hurtige opvarmningsøvelser. Generatoren dækker hele FM.MAT.TA.1-3 kompetenceområdet for sammenligning og ordning.',
      },
      {
        id: '6',
        question: 'Hvordan understøtter stor og lille opgaverne Fælles Mål?',
        answer: 'Opgaverne understøtter direkte to Fælles Mål-kompetenceområder: FM.MAT.TA.1-3 (tal: sammenligning og ordning af størrelser) og FM.MAT.MK.1-3 (matematisk kommunikation og repræsentation). Find-opgaverne træner størrelsesdiskrimination og sammenligning der er kernen i talforståelse. Nummeringsopgaverne træner ordinalitet og rækkefølge. Billedbaserede opgaver konkretiserer matematiske relationer i overensstemmelse med den legende og undersøgende tilgang Fælles Mål foreskriver for indskolingen.',
      },
      {
        id: '7',
        question: 'Kan jeg uploade mine egne billeder til størrelsesopgaverne?',
        answer: 'Ja, upload ubegrænset antal egne billeder direkte i generatoren. Klik på upload-knappen og vælg flere filer på én gang. Dine uploadede billeder integreres med de 3000+ biblioteksbilleder så du kan kombinere egne og færdiglavede billeder på samme opgave. Brug klassebilleder, fotos fra ture eller kæledyrsbilleder til at lave personligt relevante størrelsesopgaver. Generatoren skalerer automatisk billederne til de korrekte størrelsesforhold.',
      },
      {
        id: '8',
        question: 'Hvor lang tid tager det at lave en stor og lille opgave?',
        answer: 'En komplet stor og lille opgave tager under 3 minutter at lave. Vælg tema og billeder på 30 sekunder, indstil opgavetype og antal på 30 sekunder, generér opgaven på 10 sekunder, foretag eventuelle justeringer på 30 sekunder og download som PDF på 10 sekunder. De fleste pædagoger laver 10-15 differentierede opgaver på 30 minutter – nok til flere ugers undervisning i størrelsessammenligning.',
      },
      {
        id: '9',
        question: 'Kan jeg sælge de stor og lille opgaver jeg laver?',
        answer: 'Ja, dit Fuld Adgang abonnement inkluderer en kommerciel licens. Sælg dine størrelsesopgaver online på Teachers Pay Teachers, Etsy eller din egen webshop uden attribueringskrav eller ekstra gebyrer. Stor lille printbar materialer er særligt efterspurgte blandt forældre og pædagoger der arbejder med førskole og børnehaveklasse. Mange lærere tjener ekstra ved at sælge tematiske størrelses-pakker med progressive sværhedsgrader.',
      },
      {
        id: '10',
        question: 'Hvilke sprog understøtter generatoren?',
        answer: 'Generatoren understøtter 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, nederlandsk, svensk, norsk og finsk. Skift sprog med ét klik i indstillingerne. Alle instruktioner, overskrifter og facitark oversættes automatisk til det valgte sprog. Billederne er universelle og fungerer på tværs af alle sprog. Perfekt til tosprogede klasser, modtageklasser eller internationale skoler hvor eleverne har forskellige modersmål.',
      },
    ],

  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Kombinér Stor og Lille Gratis Arbejdsark med Andre Apps til Børn',
    sectionDescription: 'Fuld Adgang abonnement inkluderer 33 generatorer udover stor og lille. Kombiner størrelsesopgaver med andre generatorer for komplette læringspakker.',
    ctaTitle: 'Klar til at Lave Fantastiske Arbejdsark?',
    ctaDescription: 'Tilslut dig tusindvis af pædagoger der laver professionelle arbejdsark. Ubegrænset oprettelse, kommerciel licens inkluderet.',
    primaryCtaText: 'Start Gratis Prøve',
    secondaryCtaText: 'Se Alle 33 Generatorer',
    badgeText: 'Fungerer Godt Med',
    exploreText: 'Udforsk',
    trustBadges: {
      securePayment: 'Sikker betaling',
      cancelAnytime: 'Opsig når som helst',
    },
    items: [
      {
        id: '1',
        slug: 'sammenligningsopgaver-arbejdsark',
        name: 'Sammenligningsopgaver / Mere eller Mindre',
        category: 'Matematik',
        icon: '⚖️',
        description: 'Kombiner størrelsessammenligning med mængdesammenligning for komplet matematisk forståelse. Eleverne der mestrer stor og lille med billeder er klar til at sammenligne mængder med >, < og = symboler. Understøtter FM.MAT.TA.1-3 for tal og mængder i indskolingen.',
      },
      {
        id: '2',
        slug: 'find-den-ulige-arbejdsark',
        name: 'Find den Ulige',
        category: 'Logik',
        icon: '🔎',
        description: 'Find den ulige-opgaver supplerer stor og lille perfekt. Eleverne der kan skelne størrelsesforskelle er klar til at identificere genstande der ikke passer ind i en gruppe. Styrker kategorisering og visuel diskrimination som er kernen i begge opgavetyper.',
      },
      {
        id: '3',
        slug: 'billedsortering-arbejdsark',
        name: 'Billedsortering',
        category: 'Logik',
        icon: '📊',
        description: 'Billedsortering udvider størrelsessortering til flere kategorier. Eleverne lærer at sortere genstande efter egenskaber som farve, form og type – ikke kun størrelse. Perfekt tværfaglig kombination der styrker klassificeringsevner i børnehaveklassen.',
      },
      {
        id: '4',
        slug: 'moenstre-arbejdsark',
        name: 'Mønstre',
        category: 'Logik',
        icon: '🔷',
        description: 'Mønsteropgaver bygger videre på størrelsesforståelsen ved at introducere rækkefølge og gentagelse. Eleverne der kan nummerere fra lille til stor er klar til at genkende og fortsætte mønstre. Udvikler matematisk tænkning og logisk ræsonnement i indskolingen.',
      },
      {
        id: '5',
        slug: 'matchning-arbejdsark',
        name: 'Matchning',
        category: 'Logik',
        icon: '🎯',
        description: 'Matchningsopgaver træner den visuelle parring der er forudsætning for størrelsessammenligning. Eleverne matcher identiske billeder før de lærer at sammenligne forskellige størrelser af samme genstand. Styrker visuel diskrimination og opmærksomhed på detaljer.',
      },
      {
        id: '6',
        slug: 'find-og-tael-arbejdsark',
        name: 'Find og Tæl',
        category: 'Matematik',
        icon: '🔢',
        description: 'Find og tæl-opgaver kombinerer tælling med visuel scanning. Eleverne der mestrer størrelsessammenligning er klar til at tælle specifikke genstande i komplekse billeder. Styrker talforståelse og én-til-én-korrespondance der understøtter FM.MAT.TA.1-3.',
      },
    ],

  },

  // -- SEO & Content Enrichment (Part 211) ------------------------------------

  aiOverviewSnippet: 'En størrelsessammenligning generator er et online værktøj til at lave printbare stor og lille opgaver hvor børn sammenligner genstande efter størrelse. Lærere vælger mellem fem opgavetyper – find den lille, find den store, find den mellemstore, nummerér lille til stor og nummerér stor til lille – og justerer billedtilstand og antal opgaver per ark. Værktøjet genererer en færdig PDF med automatisk facitark på under 3 minutter og understøtter Fælles Mål FM.MAT.TA.1-3 for sammenligning og ordning i indskolingen.',

  comparisonTable: [
    {
      feature: 'Opgavetyper',
      ourApp: '5 typer: find lille/stor/mellemstor, nummerér begge retninger',
      typical: 'Kun find den store eller den lille',
    },
    {
      feature: 'Billedbibliotek',
      ourApp: '3000+ billeder i 104 temaer med identisk/forskellig tilstand',
      typical: 'Begrænsede clipart-billeder uden temainddeling',
    },
    {
      feature: 'Facitark',
      ourApp: 'Automatisk til hver opgave med grønne flueben og tal',
      typical: 'Ofte mod merbetaling eller manuelt',
    },
    {
      feature: 'Oprettelsestid',
      ourApp: 'Under 3 minutter per opgave',
      typical: '30-60 minutter per opgave manuelt',
    },
    {
      feature: 'Kommerciel licens',
      ourApp: 'Inkluderet i abonnement, sælg frit',
      typical: 'Merbetaling eller ikke tilgængeligt',
    },
    {
      feature: 'Sprogunderstøttelse',
      ourApp: '11 sprog med automatisk oversættelse',
      typical: 'Kun ét sprog (typisk engelsk)',
    },
  ],

  researchBacking: [
    {
      claim: 'Visuel størrelsessammenligning med konkrete billeder styrker børns ordinalitetsforståelse og evne til at ordne objekter efter egenskaber – en forudsætning for talforståelse og den formelle matematikundervisning i indskolingen.',
      source: 'Mogensen, A., "Matematiklæring i de tidlige år – fra hverdagserfaringer til faglige begreber," VIA University College, Forskningstidsskrift for Professionsuddannelser',
    },
    {
      claim: 'Når elever arbejder med varierede repræsentationsformer – fra konkret objektmanipulation over billedbaserede opgaver til symbolsk notation – udvikler de dybere matematiske kompetencer end ved udelukkende abstrakt træning.',
      source: 'Niss, M. & Højgaard Jensen, T., "Kompetencer og matematiklæring – ideer og inspiration til udvikling af matematikundervisning i Danmark," IMFUFA, Roskilde Universitetscenter',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Mine børnehaveklasseelever elsker at finde den store og den lille. Vi bruger identiske billeder med dyretemaet og børnene bliver så begejstrede når de genkender dyrene i forskellige størrelser. Det er den perfekte overgang fra fri leg til struktureret matematiklæring.',
      name: 'Else Stampe',
      role: 'Børnehaveklassepædagog',
      school: 'Maglegårdsskolen, Gentofte',
    },
    {
      quote: 'Nummeringsopgaverne fra lille til stor har været en gamechanger i min 1. klasse. Eleverne forstår ordinalitet meget hurtigere når de kan se størrelsesforskellene visuelt. Jeg laver differentierede opgaver til tre niveauer på under 15 minutter – det sparede mig timers forberedelse.',
      name: 'René Vinther',
      role: 'Indskolingslærer',
      school: 'Sølystskolen, Silkeborg',
    },
  ],

  tips: {
    sectionTitle: 'Størrelsessammenlignings-strategier efter klassetrin',
    sectionDescription: 'Tilpas stor og lille generatoren til hvert udviklingstrin. Sådan vælger du opgavetype, billedtilstand og antal billeder fra førskole til 3. klasse for optimal størrelseslæring.',
    items: [
      {
        id: 'forskole',
        icon: '🌱',
        title: 'Førskole: Stor og lille med kendte ting',
        description: 'Introducér størrelsessammenligning med 1-2 simple find-den-store opgaver per ark. Brug identisk billedtilstand med 2 billeder så børnene kun skal fokusere på størrelsen – ikke formforskelle. Vælg store billeder fra dyretemaet eller legetøjstemaet som børnene kender fra hverdagen. Hold opgaverne korte og giv masser af ros. Opbygger grundlæggende størrelsesdiskrimination og ordforråd om stor og lille.',
      },
      {
        id: 'bornehaveklasse',
        icon: '🎒',
        title: 'Børnehaveklasse: Tre størrelser og forskellige billeder',
        description: 'Udvid til 3 billeder per opgave og introducér mellemstor som begreb. Brug 3-4 opgaver per ark med en blanding af identiske og forskellige billeder. Introducér alle fem opgavetyper gradvist: start med find-den-store, tilføj find-den-lille og senere find-den-mellemstore. Mod slutningen af året kan eleverne prøve nummeringsopgaver fra lille til stor. Understøtter FM.MAT.TA.1-3 for sammenligning og ordning.',
      },
      {
        id: '1-klasse',
        icon: '📚',
        title: '1. klasse: Nummerering og ordinalitet',
        description: 'Førsteklasses elever mestrer nummeringsopgaverne i begge retninger: lille til stor og stor til lille. Indstil 5-6 opgaver per ark med 3 forskellige billeder for fuld udfordring. Veksl mellem alle fem opgavetyper for variation og gentagelse. Brug opgaverne som opvarmning før matematiktimen. Eleverne udvikler ordinalitetsforståelse og rækkefølgebegreber der er forudsætning for tallinjen og positionssystemet.',
      },
      {
        id: '2-klasse',
        icon: '✏️',
        title: '2. klasse: Hurtig størrelsesdiskrimination',
        description: 'Andenklasses elever arbejder med 6-8 opgaver per ark som hurtige diagnostiske tests. Brug udelukkende forskellig billedtilstand og nummeringsopgaver for maksimal udfordring. Sæt en tidsbegrænsning på 5 minutter for at træne automatisering af størrelsessammenligning. Opgaverne fungerer som selvstændige stationsopgaver der verificerer grundlæggende størrelsesforståelse er på plads.',
      },
      {
        id: '3-klasse',
        icon: '🎯',
        title: '3. klasse: Størrelseslogik og ræsonnement',
        description: 'Tredjeklasses elever bruger stor og lille opgaver som springbræt til matematisk ræsonnement. Kombiner nummeringsopgaver med mundtlig forklaring – lad eleverne begrunde deres rækkefølge. Brug opgaverne tværfagligt med natur/teknik hvor eleverne sammenligner dyrenes virkelige størrelse med billedstørrelsen. Udvikler metakognitiv tænkning om størrelsesrelationer og forbereder overgangen til abstrakt matematisk argumentation.',
      },
    ],
  },
};

export default bigSmallDaContent;
