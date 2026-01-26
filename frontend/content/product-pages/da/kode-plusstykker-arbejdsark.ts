import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Kode-Plusstykker Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/kode-plusstykker-arbejdsark.ts
 * URL: /da/apps/kode-plusstykker-arbejdsark
 *
 * SEO OPTIMIZED: All sample paths use /samples/danish/code-addition/
 * Keywords: gratis arbejdsark, arbejdsark til børn, arbejdsark til børnehaveklasse, gratis printables
 */

export const kodePlusstykkerDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'kode-plusstykker-arbejdsark',
    appId: 'code-addition',
    title: 'Kode-Addition Gratis Arbejdsark til Børn og Børnehaveklasse',
    description: 'Lav gratis arbejdsark til børn med billedbaseret kode-addition. Arbejdsark til børnehaveklasse og 0. klasse. Download gratis printables som PDF på 3 minutter.',
    keywords: 'gratis arbejdsark, arbejdsark til børn, arbejdsark til børnehaveklasse, matematikopgaver med billeder, billedbaserede plusstykker, gratis printables, kode-addition',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/kode-plusstykker-arbejdsark',
      },

  // Hero Section - FULL text from code-addition.md paragraphs 1-4
  hero: {
    title: 'Gratis Arbejdsark til Børn - Kode-Addition Matematikopgaver',
    subtitle: 'Arbejdsark til Børnehaveklasse og 0. Klasse med Billedbaserede Plusstykker',
    description: `Lav professionelle matematikopgaver med billeder på under 3 minutter. Din Fuld Adgang-abonnement giver dig ubegrænset adgang til at skabe tilpassede opgaver til print uden ekstra gebyrer. Generér billedbaserede plusstykker perfekt til 0. klasse og 1. klasse. Download opgaver i høj kvalitet som PDF på få sekunder.

Vores plusstykke-generator bruger billeder i stedet for tal. Børn tæller æbler, dyr eller legetøj og lærer addition visuelt. Dette værktøj skaber matematikopgaver der kombinerer tælning med simpel addition. Perfekt til elever der lige er begyndt at lære matematik.

Skab arbejdsark med dit eget billedbibliotek eller vælg fra 3000+ børnevenlige billeder. Hver matematikopgave kan tilpasses fuldstændigt. Skift farver, skriftstørrelser, baggrunde og rammer. Tilpas sværhedsgraden ved at indstille minimum og maksimum tal. Generér 1-20 opgaver per ark efter behov.

Fuld Adgang-abonnementet koster 1800 DKK om året eller 200 DKK om måneden. Dit abonnement inkluderer alle 33 opgavegeneratorer med kommerciel licens. Ingen ekstra omkostninger for billeder eller skabeloner. Download ubegrænsede matematikopgaver i 300 DPI professionel kvalitet. Brug dem i klasseværelset eller sælg dem på Teachers Pay Teachers.`,
    previewImageSrc: '/samples/danish/code-addition/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Prøv Gratis',
      viewSamples: 'Se Eksempler',
    },
    trustBadges: {
      languages: '11 Sprog',
      images: '3000+ Billeder',
      license: 'Kommerciel Licens',
    },
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    floatingStats: {
      time: 'Klar på 3 min',
      action: 'Nemt at bruge',
      quality: '300 DPI',
    },
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Se hvordan det virker',
        modalTitle: 'Funktionsoversigt',
      },
      appSpecific: {
        videoId: 'vVd11Kjk9iA',
        buttonText: 'Kode-Addition Funktioner',
        modalTitle: 'Kode-Addition Vejledning',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/danish/code-addition/
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
    freePdfCountLabel: '2 gratis downloads',
    ofLabel: 'af',
    items: [],
    
  },

  // Features Grid - FULL text from code-addition.md feature sections
  features: {
    sectionTitle: 'Gratis Arbejdsark og Arbejdsark til Børn - Gratis Printables og Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Vores billedbaserede plusstykke-generator giver dig alt du behøver for at skabe professionelle matematikopgaver. Hver funktion er designet til at spare tid for travle lærere. Skab arbejdsark til 0. klasse på få minutter i stedet for timer. Fuld Adgang-abonnementet giver dig ubegrænsede muligheder for tilpasning og download.',
    highlightBadgeText: 'Vigtig Funktion',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alle funktioner inkluderet',
      noHiddenFees: 'Ingen skjulte gebyrer',
      cancelAnytime: 'Opsig når som helst',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from code-addition.md step sections
  howTo: {
    sectionTitle: 'Gratis Arbejdsark til Børn Oprette - Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Skab professionelle matematikopgaver på under 3 minutter. Denne step-by-step guide viser dig hvordan. Ingen designerfaring nødvendig. Processen er så enkel at du kan lave opgaver mellem lektioner.',
    ctaText: 'Start Nu',
    badgeText: 'Sådan Virker Det',
    stepLabel: 'Trin',
    readyTime: 'Klar på under 3 minutter',
    noSkillsNeeded: 'Intet designkendskab påkrævet',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    completionTitle: 'Færdig!',
    completionSubtitle: 'Dit arbejdsark er klar til download',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Vælg Billeder til Dine Matematikopgaver',
        description: `Start med at vælge hvilke billeder du vil bruge i dine opgaver. Du har tre muligheder. Vælg et tema fra biblioteket for hurtig generering. Gennemse og vælg individuelle billeder for mere kontrol. Upload dine egne billeder for helt personlige opgaver.

Temavælgeren viser alle tilgængelige kategorier. Bondegårdsdyr, vilde dyr, frugter, grøntsager, legetøj, køretøjer og mange flere. Klik på et tema og generatoren bruger billeder fra den kategori automatisk.

For at vælge specifikke billeder skal du skifte billedbibliotekssprog til dansk. Søg efter "æble" eller "hund". Klik på billeder for at vælge dem. Vælg 5-10 forskellige billeder for variation i opgaverne. Valgte billeder vises i preview-området.

Upload-funktionen accepterer JPEG, PNG og GIF. Multi-fil upload lader dig vælge mange billeder på én gang. Upload fotos af ting fra klasseværelset eller lokale steder. Børn elsker at tælle billeder de genkender.

Hver metode fungerer lige godt til at skabe matematikopgaver. Tema er hurtigst. Individuel udvælgelse giver mest kontrol. Upload giver mest personalisering. Vælg den metode der passer din situation.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger for Matematikopgaver',
        description: `Åbn Page Setup-sektionen for at vælge papirstørrelse. Letter Portrait passer til amerikansk papir. A4 Portrait passer til europæisk papir. De fleste danske skoler bruger A4.

Vælg baggrundsfarve eller lad den være hvid. Hvid baggrund sparer printerblæk. Farvet baggrund gør opgaverne sjovere for børn. Du kan også vælge et baggrundstema med mønstre eller illustrationer.

Tilføj en ramme hvis du vil have pænere opgaver. Rammetemaer inkluderer simple linjer, prikker, stjerner og mange andre designs. Juster opacity hvis rammen skal være mere subtil.

Worksheet Content-sektionen styrer opgavernes sværhedsgrad. Antal opgaver kan indstilles fra 1 til 20. For 0. klasse start med 5-8 opgaver per ark. For 1. klasse kan du øge til 10-12 opgaver.

Minimum og maksimum tal styrer hvor svære opgaverne bliver. For begyndere sæt minimum 1 og maksimum 5. Det giver simple opgaver som 2+3. For mere avancerede elever sæt maksimum til 10 eller 15.

Optional Settings lader dig inkludere navn/dato felter øverst på arket. Dette hjælper med organisering når du printer mange kopier. Nummer-funktionen viser tal ved hver opgave så børn kan holde styr på deres fremskridt.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generér Dine Matematikopgaver',
        description: `Klik den blå "Create Worksheet" knap. Generatoren arbejder øjeblikkeligt. På få sekunder vises dit færdige arbejdsark på skærmen.

Generatoren placerer billederne strategisk på siden. Den skaber addition-opgaver der matcher billederne. Hvis du har valgt æblebilleder viser den 3 æbler plus 2 æbler. Tallene matcher altid antallet af billeder vist.

Preview vises i Worksheet-fanen. Du kan se præcis hvordan den printede opgave vil se ud. Zoom ind for at tjekke detaljer. Zoom ud for at se hele siden på én gang.

Hvis du vil have en anden variation af opgaver klik bare "Create Worksheet" igen. Generatoren laver et helt nyt sæt opgaver med samme indstillinger. Billeder placeres anderledes. Tal ændres. Hver generering er unik.

Answer Key genereres samtidig. Klik Answer Key-fanen for at se facit. Alle svar er automatisk udfyldt korrekt. Dette sparer dig for at skulle regne alle opgaverne selv. Download begge faner når du er tilfreds.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigér på Lærredet',
        description: `Canvas-editoren lader dig ændre alt efter generering. Klik på et hvilket som helst element for at vælge det. Valgte elementer viser håndtag du kan trække for at ændre størrelse.

Træk billeder til nye positioner hvis layoutet ikke er perfekt. Rotér billeder ved at trække rotationshåndtaget. Slet billeder du ikke vil bruge ved at vælge dem og trykke delete-tasten.

Tekstværktøjer lader dig tilføje nye instruktioner eller overskrifter. Skriv teksten du vil have og klik "Add Text". Teksten vises på lærredet. Træk den til den ønskede position. Ændr skriftstørrelse, farve og font i kontrolpanelet.

Justering-værktøjerne hjælper med at få elementerne til at ligne pænt. Vælg flere billeder og klik "Align Left" for at justere dem i en lige kolonne. Klik "Distribute Horizontally" for lige afstand mellem elementer.

Fortryd-knappen lader dig eksperimentere uden bekymring. Prøv forskellige layouts. Hvis du ikke kan lide det bare klik undo. Gentag-knappen genopretter det du fortrød.

Denne redigeringsmulighed gør hver opgave unik. Tilpas layoutet til børn med læsevanskeligheder. Gør billeder store for elever med synsproblemer. Tilføj ekstra instruktioner for elever der har brug for dem.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download og Print Matematikopgaver',
        description: `Når du er tilfreds med dit arbejdsark er det tid til at downloade. Klik Download-knappen og vælg dit format. PDF anbefales til print. JPEG fungerer til digital distribution.

Download både Worksheet og Answer Key. Brug samme format til begge så de matcher. PDF-filer bevarer perfekt kvalitet uanset hvor mange gange de printes. JPEG-filer er mindre og nemmere at dele via email.

Gråtone-funktionen konverterer farvebilleder til sort-hvid før download. Dette sparer enormt på printerblæk. Særligt nyttigt hvis du printer 25 kopier til en hel klasse. Gråtone opgaver ser stadig professionelle ud.

Alle downloads er 300 DPI professionel kvalitet. Dette betyder skarpe linjer og klare billeder selv ved print. Konkurrenter leverer ofte kun 150 DPI hvilket ser kornete ud. Vores 300 DPI matcher professionelle tryk-standarder.

Gem de downloadede filer i organiserede mapper på din computer. Opret mapper for hver måned eller hvert emne. Navngiv filer beskrivende som "Matematikopgaver-Dyr-Addition-1-5.pdf". God organisation betyder du nemt finder opgaver næste år.

Print direkte fra PDF-filen på en hvilken som helst printer. Vælg antal kopier du behøver. Laminér et sæt for genbrugelig brug med whiteboard-markers. Børn kan løse de samme opgaver flere gange for øvelse.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from code-addition.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbejdsark til Børnehaveklasse - Perfekt til Lærere og Forældre',
    sectionDescription: 'Vores billedbaserede matematikopgave-generator passer til mange forskellige undervisningssituationer. Fra børnehaveklasse til 3. klasse. Fra almindelig undervisning til specialundervisning. Fuld Adgang-abonnementet giver dig værktøjer til alle dine undervisningsbehov.',
    badgeText: 'Hvem Er Det Til',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from code-addition.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbejdsark til Børn og Arbejdsark til Børnehaveklasse. Arbejdsark til Børn',
    sectionDescription: 'Lærere og forældre stiller ofte de samme spørgsmål om vores matematikopgave-generator. Her er svar på de mest almindelige spørgsmål. Få klarhed før du abonnerer.',
    showMoreText: 'Vis flere spørgsmål',
    showLessText: 'Vis færre',
    badgeText: 'FAQ',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    secureCheckout: 'Sikker betaling',
    cancelAnytime: 'Opsig når som helst',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Fuld Adgang',
    price: 'kr. 1.800',
    priceInterval: '/år',
    priceSuffix: 'Faktureres årligt',
    benefits: [
      'Ubegrænset arbejdsark oprettelse',
      'Alle 33 opgavegeneratorer',
      'Kommerciel licens inkluderet',
      '11 sprog understøttet',
      '3000+ tematiske billeder',
      '300 DPI printkvalitet',
      'Facitark inkluderet',
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Arbejdsark Kombinere - Arbejdsark til Børn og Gratis Printables',
    sectionDescription: 'Lav komplette læringspakker ved at kombinere matematikopgaver med billeder med disse komplementære generatorer.',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default kodePlusstykkerDaContent;
