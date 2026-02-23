import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Ordsøgning Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/ordsoegning-arbejdsark.ts
 * URL: /da/apps/ordsoegning-arbejdsark
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Danish/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * SEO ENRICHED: Part 210 — features, useCases, FAQ, relatedApps,
 * aiOverviewSnippet, comparisonTable, researchBacking, teacherTestimonials, tips
 */

export const wordSearchDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'ordsoegning-arbejdsark',
    appId: 'wordsearch',
    title: 'Gratis Ordsøgning Generator | LessonCraftStudio',
    description: 'Lav printbare ordsøgningsopgaver på 11 sprog. Tilpasbare ord, størrelser og sværhedsgrader. Ordforråd og stavning. Gratis PDF.',
    keywords: 'ordsøgning generator, ordsøgning printbar, ordsøgning til børn, ordspil generator, ordsøgning opgave, ordpuslespil printbar, ordristikko til børn, ordforråd ordsøgning, stavning ordsøgning, ordsøgning indskoling, ordsøgning førskole',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/ordsoegning-arbejdsark',
      },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Ordsøgning Generator',
    subtitle: 'Printbare Ordsøgningsopgaver til Ordforrådstræning',
    description: `Lav professionelle ordsøgningsopgaver til børnehaveklassen og indskolingen med vores gratis generator. Perfekt til gratis skoleopgaver, arbejdsark til print og opgaver til 0. klasse og 1. klasse. Ordsøgningsgeneratoren egner sig til lære bogstaver, læse og skrive og stavning.

Med ordsøgningsgeneratoren laver du printklare opgaver til print på under 3 minutter. Generatoren kombinerer lære bogstaver med ordforrådsøvelser. Download færdige ordsøgninger som PDF eller JPEG. Hvert arbejdsark kan tilpasses individuelt.

Vores gratis ordsøgningsgenerator tilbyder over 3000 børnevenlige billeder til arbejdsark. Lav tematiske opgaver til matematikopgaver, læse og skrive eller farvelægning. Generatoren fungerer på 11 sprog. Ideel til flersproget undervisning.`,
    previewImageSrc: '/samples/danish/wordsearch/sample-1.jpeg',
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
    },
  },

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Gratis Arbejdsark til Børn - Gratis Arbejdsark og Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis arbejdsark til børn af professionel kvalitet. Gratis arbejdsark og arbejdsark til børn perfekt til arbejdsark til børnehaveklasse. Gratis arbejdsark til børn og arbejdsark til børn inkluderer gratis printables undervisningsmateriale. Gratis arbejdsark tilgængeligt',
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

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Gratis Arbejdsark og Arbejdsark til Børn - Gratis Printables og Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Ordsøgningsgeneratoren tilbyder alle vigtige funktioner til gratis skoleopgaver. Lav professionelle arbejdsark og opgaver til print på få minutter. Hver funktion er udviklet til lærere og pædagoger. Perfekt til børnehaveklassen og indskolingen.',
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
        icon: '🔤',
        title: 'Tilpasbar gitterstørrelse fra 5×5 til 20×20',
        description: 'Vælg gitterstørrelse efter elevernes niveau. 5×5 til førskole og børnehaveklasse med enkle ord. 8×8 til 0. klasse med lidt længere ord. 12×12 og 20×20 til 1.–3. klasse med udfordrende ordforråd. Sværhedsgraden tilpasses automatisk baseret på gitterstørrelsen i overensstemmelse med FM.DAN.LÆ.1-2.',
      },
      {
        id: '2',
        icon: '🖼️',
        title: 'Billedbaserede ordsøgninger med 3000+ temaer',
        description: 'Brug billeder i stedet for ordlister til de yngste elever. Børn ser et billede og finder ordet i gitteret. Over 3000 børnevenlige billeder i 50+ temaer: dyr, mad, køretøjer, natur og mange flere. Billedbaserede ordsøgninger styrker ordforråd og stavning samtidig.',
      },
      {
        id: '3',
        icon: '↗️',
        title: 'Diagonale og baglæns ord for ekstra udfordring',
        description: 'Aktivér diagonale ord for mellemsvære opgaver. Tilføj baglæns skrevne ord for avancerede elever. Deaktiver begge til simple opgaver for børnehaveklassen. Hver kombination ændrer sværhedsgraden markant. Perfekt til differentiering indenfor samme klasse.',
      },
      {
        id: '4',
        icon: '✅',
        title: 'Automatisk facitark med farvemarkering',
        description: 'Hvert ordsøgningsark genererer automatisk et facitark. Ordene er tydeligt farvemarkeret i gitteret. Lærere retter på sekunder. Print facitarket separat til selvretningstationer. Eleverne kan tjekke egne svar og øve selvevaluering.',
      },
      {
        id: '5',
        icon: '✏️',
        title: 'Skriv egne ord direkte i generatoren',
        description: 'Indtast dine egne ord til ordsøgningen. Perfekt til ugens nye gloser i dansktimerne. Skriv fagspecifikke termer fra naturfag eller matematik. Lav ordsøgninger med elevernes navne til fødselsdage. Generatoren placerer ordene automatisk i gitteret.',
      },
      {
        id: '6',
        icon: '📤',
        title: 'Upload egne billeder til personlige opgaver',
        description: 'Upload ubegrænset antal egne billeder og lav personlige ordsøgninger. Brug fotos fra udeskoleoplevelser, klassedyr eller udflugter. Kombiner uploadede billeder med bibliotekets 3000+ billeder på samme ark. Børn engagerer sig mere med velkendte billeder fra hverdagen.',
      },
      {
        id: '7',
        icon: '🌍',
        title: '11 sprogs understøttelse til flersprogede klasser',
        description: 'Lav ordsøgninger på dansk, svensk, norsk, tysk, engelsk og 6 andre sprog. Perfekt til flersprogede klasser og tosprogede elever. Billednavne oversættes automatisk til det valgte sprog. Underst støtter FM.DAN.KO.1-2 om sproglig bevidsthed og ordforråd.',
      },
      {
        id: '8',
        icon: '💼',
        title: 'Kommerciel licens til salg af ordpuslespil',
        description: 'Dit abonnement inkluderer kommercielle rettigheder til at sælge dine ordsøgningsopgaver online. Lav temapakker med ordsøgninger til årstider, højtider eller faglige emner. Sælg på Teachers Pay Teachers eller Etsy uden attribueringskrav eller ekstra licensgebyrer.',
      },
    ],

  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Gratis Arbejdsark til Børn Oprette - Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Lav professionelle opgaver til print på under 3 minutter. Følg disse 5 simple trin. Intet designkendskab påkrævet. Perfekt til gratis skoleopgaver til 0. klasse og 1. klasse.',
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
        title: 'Vælg Indhold til Dine Arbejdsark',
        description: `Vælg et tema fra dropdown-menuen. Over 50 temaer tilgængelige. Dyr, køretøjer, mad, natur og meget mere. Eller vælg "Tilfældigt tema" for variation.

Generatoren vælger automatisk 8 passende billeder fra temaet. Ideel til tematiske gratis skoleopgaver. Kombiner lære bogstaver med naturfag. Billedvalget sker øjeblikkeligt efter du vælger tema.

Alternativt kan du vælge individuelle billeder manuelt. Gennemse billedbiblioteket kategori for kategori. Brug søgefunktionen til specifikke ord. Perfekt til personaliserede arbejdsark til print til din klasse.

Du kan også indtaste dine egne ord direkte. Skriv ord eleverne skal lære. Fantastisk til matematikopgaver med talord. Perfekt til læse og skrive øvelser med ugens nye ord. Ordsøgningen genereres ud fra dine egne ord.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger til Dit Klassetrin',
        description: `Vælg gitterstørrelse efter elevernes niveau. 5x5 til børnehaveklassen. 8x8 til 0. klasse. 12x12 til 1. klasse. 20x20 til 2. klasse og 3. klasse. Sværhedsgraden tilpasses automatisk.

Aktiver diagonale ord for mere udfordring. Deaktiver dem til simplere arbejdsark. Baglæns skrevne ord er valgfrie. Hver indstilling ændrer sværhedsgraden på opgaverne til print.

Vælg dit sideformat. A4 eller Letter papir. Højformat eller tværformat. Sidestørrelsen påvirker læsbarheden. Tværformat egner sig til større gitre.

Tilføj en titel til dit arbejdsark. Skriv elevens navn på opgaven. Perfekt til individuelle gratis skoleopgaver. Personaliser hvert arbejdsark til den enkelte elev i klassen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generer Din Ordsøgning',
        description: `Klik på "Generer" knappen. Generatoren laver straks din ordsøgning. Ordene placeres automatisk i gitteret. Tomme felter fyldes med tilfældige bogstaver for ekstra udfordring.

Ordsøgningsopgaven vises på arbejdsfladen. Ordlisten genereres automatisk ved siden af. Billeder eller ord vises afhængig af dine indstillinger. Alt er synligt med det samme.

Et facitark genereres automatisk. Ordene er farvemarkeret i gitteret. Perfekt til hurtig rettelse. Skift mellem opgaveark og facitark med et klik på knappen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Rediger Dit Arbejdsark',
        description: `Tilpas arbejdsarket til dine behov. Flyt gitteret med træk-og-slip. Forstør eller formindsk elementer. Roter objekter som du ønsker. Alt kan flyttes og ændres på arbejdsfladen.

Tilføj egne tekster til opgaverne. Skriv overskrifter eller instruktioner. Vælg mellem 7 børnevenlige skrifttyper. Ændr skriftstørrelse og farve efter ønske. Gør arbejdsarket personligt for din klasse.

Upload egne billeder direkte til arbejdsarket. Kombiner gratis skoleopgaver med personlige fotos. Tilføj rammer og baggrunde efter smag. Hvert element kan tilpasses individuelt på opgaverne til print.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download og Print Dine Arbejdsark',
        description: `Klik på "Download" knappen. Vælg mellem JPEG og PDF format. Begge formater er printklare. 300 DPI kvalitet garanterer skarpe udskrifter hver gang.

Aktiver gråtonemuligheden hvis du vil. Sparer printerblæk på farvede billeder. Ideel til store klassesæt. Kvaliteten forbliver høj selv i gråtone på opgaverne til print.

Download arbejdsarket til din computer. Download også facitarket til rettelse. Print ubegrænset antal kopier. Hvert arbejdsark er straks klar til brug i klassen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbejdsark til Børn - Arbejdsark til Børnehaveklasse med Gratis Printables. Arbejdsark til Børn',
    sectionDescription: 'Ordsøgningsopgaver passer til mange forskellige brugere. Pædagoger i børnehaveklassen elsker de visuelle opgaver. Lærere i indskolingen bruger dem til lære bogstaver. Forældre kombinerer dem med farvelægning hjemme. Hver brugergruppe finder unikke måder at bruge gratis skoleopgaver på.',
    badgeText: 'Hvem Er Det Til',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Dansklærere i indskolingen',
        subtitle: 'Stavning og ordforråd med ordsøgning',
        description: 'Brug ordsøgninger til at træne ugens nye gloser i dansktimerne. Eleverne finder ordene i gitteret og styrker dermed stavning og bogstavgenkendelse. Ordsøgninger understøtter FM.DAN.LÆ.1-2 om afkodning og stavning. Lav tematiske ordsøgninger der matcher klassens aktuelle emne.',
      },
      {
        id: '2',
        icon: '🏫',
        title: 'Børnehaveklassepædagoger',
        subtitle: 'Billedbaserede opgaver til de yngste',
        description: 'Lav ordsøgninger med billeder i stedet for ordlister. Børn ser et billede af en kat og finder ordet "KAT" i gitteret. 5×5 gitre med 3–5 korte ord passer perfekt til børnehaveklassen. Billedbaserede ordsøgninger bygger bro mellem mundtligt og skriftligt ordforråd.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Forældre og hjemmeundervisere',
        subtitle: 'Sjov ordtræning derhjemme',
        description: 'Lav personlige ordsøgninger med familiemedlemmers navne, kæledyr eller ferieminder. Børn øver stavning uden det føles som lektier. Upload egne billeder for ekstra engagement. Perfekt som supplerende øvelse efter skole.',
      },
      {
        id: '4',
        icon: '🌟',
        title: 'SFO-pædagoger',
        subtitle: 'Legende læring i fritidsordningen',
        description: 'Ordsøgninger fungerer perfekt som frivillig aktivitet i SFO. Børn vælger selv tema og sværhedsgrad. Kombiner med farvelægning for en komplet aktivitetstime. Ingen forberedelse nødvendig – lav et nyt ark på under 3 minutter.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Speciallærere og DSA-undervisere',
        subtitle: 'Individuelt tilpasset ordtræning',
        description: 'Tilpas gitterstørrelse og ordlængde efter den enkelte elevs niveau. Brug billedstøtte til elever med læsevanskeligheder. Lav opgaver med kun 3 ord i et lille gitter for overskuelighed. Ordsøgninger giver positiv mestringsfølelse uanset ordforrådsomfang.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Materialeproducenter',
        subtitle: 'Sælg tematiske ordsøgningspakker',
        description: 'Lav professionelle ordsøgningspakker til salg online. Temapakker med 10–20 ordsøgninger per emne sælger godt på Teachers Pay Teachers. Kommerciel licens inkluderet uden attribueringskrav. Kombinér ordsøgninger med krydsord og bogstavblanding til komplette stavepakker.',
      },
    ],

  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbejdsark til Børn og Arbejdsark til Børnehaveklasse. Arbejdsark til Børn',
    sectionDescription: 'Her er svar på de mest almindelige spørgsmål om ordsøgningsgeneratoren. Lær om gratis muligheder, abonnementer og hvordan du bruger opgaver til print i din undervisning.',
    showMoreText: 'Vis flere spørgsmål',
    showLessText: 'Vis færre',
    badgeText: 'FAQ',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    secureCheckout: 'Sikker betaling',
    cancelAnytime: 'Opsig når som helst',
    items: [
      {
        id: '1',
        question: 'Hvilke gitterstørrelser kan jeg vælge til ordsøgningen?',
        answer: 'Generatoren tilbyder gitterstørrelser fra 5×5 til 20×20. 5×5 passer til førskole og børnehaveklasse med korte ord. 8×8 er ideel til 0. klasse. 12×12 udfordrer 1.–2. klasse elever. 20×20 giver plads til mange lange ord til 3. klasse og ældre.',
      },
      {
        id: '2',
        question: 'Kan jeg bruge billeder i stedet for ordlister?',
        answer: 'Ja, du kan lave billedbaserede ordsøgninger hvor børn ser et billede og finder det tilhørende ord i gitteret. Vælg fra 3000+ børnevenlige billeder i 50+ temaer. Dette er særligt effektivt for børn der endnu ikke kan læse hele ord men genkender bogstaver.',
      },
      {
        id: '3',
        question: 'Hvordan justerer jeg sværhedsgraden?',
        answer: 'Sværhedsgraden styres af tre faktorer: gitterstørrelse (5×5 til 20×20), diagonale ord (til/fra) og baglæns skrevne ord (til/fra). Til børnehaveklassen: 5×5 gitter uden diagonale og baglæns ord. Til 3. klasse: 15×15+ med begge aktiveret.',
      },
      {
        id: '4',
        question: 'Indeholder ordsøgningerne facitark?',
        answer: 'Ja, hvert ordsøgningsark genererer automatisk et facitark med alle ord farvemarkeret i gitteret. Download facitarket separat til rettelse eller vis det på dokumentkameraet til fælles gennemgang i klassen.',
      },
      {
        id: '5',
        question: 'Kan jeg skrive mine egne ord til ordsøgningen?',
        answer: 'Ja, du kan indtaste dine egne ord direkte i generatoren. Skriv ugens nye gloser, fagspecifikke termer eller elevernes navne. Generatoren placerer automatisk ordene i gitteret og fylder tomme felter med tilfældige bogstaver.',
      },
      {
        id: '6',
        question: 'Hvilke aldersgrupper passer ordsøgninger til?',
        answer: 'Ordsøgninger passer til børn fra 4–10 år. Førskole: 5×5 gitter med 3 billedord. Børnehaveklasse: 5×5–8×8 med korte ord. 1. klasse: 8×8–12×12 med diagonale ord. 2.–3. klasse: 12×12–20×20 med baglæns og diagonale ord.',
      },
      {
        id: '7',
        question: 'Understøtter generatoren dansk med æ, ø og å?',
        answer: 'Ja, generatoren understøtter alle danske bogstaver inklusiv æ, ø og å fuldt ud. Fyldebogstaverne i gitteret inkluderer også danske specialtegn for autentiske ordsøgninger. Alle 11 sprog understøttes med deres lokale specialtegn.',
      },
      {
        id: '8',
        question: 'Hvordan understøtter ordsøgninger Fælles Mål?',
        answer: 'Ordsøgninger understøtter FM.DAN.LÆ.1-2 (læsning – afkodning og stavning) ved at træne bogstavgenkendelse og ordidentifikation. De understøtter også FM.DAN.KO.1-2 (kommunikation – ordforråd og sproglig bevidsthed) når eleverne arbejder med tematiske ordlister.',
      },
      {
        id: '9',
        question: 'Kan jeg lave ordsøgninger på flere sprog?',
        answer: 'Ja, generatoren understøtter 11 sprog inklusive dansk, svensk, norsk og tysk. Billednavne oversættes automatisk. Perfekt til flersprogede klasser, tosprogede elever og fremmedsprogundervisning.',
      },
      {
        id: '10',
        question: 'Kan jeg uploade mine egne billeder?',
        answer: 'Ja, upload ubegrænset antal egne billeder i JPEG, PNG og GIF format. Brug fotos fra klasseværelset, udflugter eller familieaktiviteter. Kombinér egne billeder med bibliotekets 3000+ billeder på samme ordsøgningsark.',
      },
      {
        id: '11',
        question: 'Hvor lang tid tager det at lave en ordsøgning?',
        answer: 'En ordsøgning tager under 3 minutter at lave. Vælg tema på 30 sekunder, indstil sværhedsgrad på 30 sekunder, generér opgaven på 10 sekunder. Du kan lave 10–20 forskellige ordsøgninger på 30 minutter til hele ugen.',
      },
      {
        id: '12',
        question: 'Kan jeg sælge de ordsøgninger jeg laver?',
        answer: 'Ja, dit abonnement inkluderer en kommerciel licens. Sælg ordsøgninger online uden attribueringskrav eller ekstra gebyrer. Tematiske ordsøgningspakker sælger godt på Teachers Pay Teachers og Etsy.',
      },
    ],

  },

  // Pricing
  pricing: {
    title: 'Kernepakke',
    price: 'kr. 1.075',
    priceInterval: '/år',
    priceSuffix: 'Faktureres årligt',
    benefits: [
      'Ubegrænset arbejdsark oprettelse',
      'Kommerciel licens inkluderet',
      '11 sprog understøttet',
      '3000+ tematiske billeder',
      '300 DPI printkvalitet',
      'Facitark inkluderet',
    ],
    ctaText: 'Start Nu',
    bundleDescription: 'Dit abonnement inkluderer adgang til 10 arbejdsarkgeneratorer:',
    bundleApps: [
      'Billedaddition',
      'Alfabettog',
      'Malebog',
      'Matematikopgaver',
      'Bogstavblanding',
      'Find og Tael',
      'Matchningsspil',
      'Tegn Linjer',
      'Billede Bingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Arbejdsark Kombinere - Arbejdsark til Børn og Gratis Printables',
    sectionDescription: 'Lav komplette læringspakker ved at kombinere ordsøgninger med disse komplementære generatorer.',
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
        slug: 'krydsord-arbejdsark',
        name: 'Krydsord',
        category: 'Literacy',
        icon: '📝',
        description: 'Kombinér ordsøgninger med billedkrydsord til komplette stavepakker. Eleverne finder ord i gitteret og staver dem i krydsordets felter. Dobbelt træning af ordforråd og bogstavgenkendelse i overensstemmelse med FM.DAN.LÆ.1-2.',
      },
      {
        id: '2',
        slug: 'kryptogram-arbejdsark',
        name: 'Kryptogram',
        category: 'Literacy',
        icon: '🔐',
        description: 'Billedkryptogram-opgaver lader eleverne knække en kode for at afsløre ord. Perfekt supplement til ordsøgninger. Eleverne træner bogstavgenkendelse fra en anden vinkel og styrker afkodningsstrategier.',
      },
      {
        id: '3',
        slug: 'gaet-ordet-arbejdsark',
        name: 'Gæt Ordet',
        category: 'Literacy',
        icon: '❓',
        description: 'Gæt-ordet-opgaver kombinerer billedledetråde med bogstavgætning. Eleverne bruger de samme ord fra ordsøgningen i et nyt format. Varierede opgaveformater styrker ordgenkendelse og langtidshukommelse.',
      },
      {
        id: '4',
        slug: 'bogstavblanding-arbejdsark',
        name: 'Bogstavblanding',
        category: 'Literacy',
        icon: '🔀',
        description: 'Bogstavblanding udfordrer eleverne til at sætte sammenblandede bogstaver i den rigtige rækkefølge. Eleverne træner stavning aktivt i modsætning til passiv genkendelse i ordsøgninger. Sammen dækker de begge sider af stavefærdigheder.',
      },
      {
        id: '5',
        slug: 'alfabet-tog-arbejdsark',
        name: 'Alfabet Tog',
        category: 'Literacy',
        icon: '🚂',
        description: 'Alfabettog-opgaver træner bogstavrækkefølge og begyndelsesbogstaver. Ideelt forarbejde til ordsøgninger for de yngste elever. Børn der kender alfabetets rækkefølge finder lettere ord i gitteret.',
      },
      {
        id: '6',
        slug: 'skriveopgaver-arbejdsark',
        name: 'Skriveopgaver',
        category: 'Finmotorik',
        icon: '✍️',
        description: 'Kombinér ordsøgninger med sporbar skrivning for komplet bogstavtræning. Eleverne finder ordet i gitteret og skriver det bagefter. Denne dobbelte tilgang styrker FM.DAN.FR.1-2 om håndskrift og bogstavdannelse.',
      },
    ],

  },

  // -- SEO & Content Enrichment (Part 210) ------------------------------------

  aiOverviewSnippet: 'En ordsøgning generator er et online værktøj der laver printbare ordpuslespil med tilpasbare gitterstørrelser, billedledetråde og automatiske facitark. Lærere vælger temaord eller indtaster egne gloser, justerer sværhedsgrad med diagonale og baglæns ord, og downloader en færdig PDF på under 3 minutter. Værktøjet understøtter FM.DAN.LÆ.1-2 for stavning og afkodning i indskolingen.',

  comparisonTable: [
    {
      feature: 'Gitterstørrelse',
      ourApp: '5×5 til 20×20 med fri justering',
      typical: 'Faste størrelser (ofte kun 10×10)',
    },
    {
      feature: 'Billedledetråde',
      ourApp: '3000+ tematiske billeder',
      typical: 'Kun tekstbaserede ordlister',
    },
    {
      feature: 'Facitark',
      ourApp: 'Automatisk med farvemarkering',
      typical: 'Ofte uden eller mod merbetaling',
    },
    {
      feature: 'Oprettelsestid',
      ourApp: 'Under 3 minutter per opgave',
      typical: '15–30 minutter manuelt',
    },
    {
      feature: 'Kommerciel licens',
      ourApp: 'Inkluderet, sælg frit',
      typical: 'Merbetaling eller ikke tilladt',
    },
    {
      feature: 'Sprogunderstøttelse',
      ourApp: '11 sprog med æ, ø, å',
      typical: 'Kun engelsk',
    },
  ],

  researchBacking: [
    {
      claim: 'Ordsøgningsopgaver styrker elevers ortografiske opmærksomhed og bogstavgenkendelse, hvilket er en central forudsætning for sikker afkodning i de første skoleår.',
      source: 'Elbro, C., "Læsning og læseundervisning," Gyldendal – grundbog i nordisk læseforskning',
    },
    {
      claim: 'Tematisk organiseret ordforrådsundervisning med visuelle støttestrukturer giver bedre langtidsretention end isoleret ordindlæring hos indskolingselever.',
      source: 'Juul, H. & Sigurdsson, B., "Ordkendskab og læseforståelse i indskolingen," Dansk Pædagogisk Tidsskrift',
    },
  ],

  teacherTestimonials: [
    {
      quote: 'Mine elever i 1. klasse elsker ordsøgninger med billedledetråde. De svage læsere knækker koden gennem billederne, og de stærke læsere udfordres af diagonale og baglæns ord. Perfekt differentiering på ét ark.',
      name: 'Vibeke Gram',
      role: 'Dansklærer, indskoling',
      school: 'Bakkeskolen, Vejle',
    },
    {
      quote: 'Jeg laver tematiske ordsøgningspakker til hele ugen på 20 minutter. Før brugte jeg en hel aften på at tegne gitre i hånden. Facitarkene er en kæmpe tidsbesparelse til rettelse.',
      name: 'Frederik Juhl',
      role: 'Børnehaveklasselærer',
      school: 'Skovvangskolen, Aarhus',
    },
  ],

  tips: {
    sectionTitle: 'Ordsøgningsstrategier efter klassetrin',
    sectionDescription: 'Tilpas ordsøgningsgeneratoren til hvert udviklingstrin. Sådan vælger du gitterstørrelse, ordtyper og billedbrug fra førskole til 3. klasse.',
    items: [
      {
        id: 'forskole',
        icon: '🌱',
        title: 'Førskole: Billedgenkendelse i minigitter',
        description: 'Brug 5×5 gitter med 3 billedord på 2–3 bogstaver. Deaktiver diagonale og baglæns ord. Børn finder korte ord som "KO", "BI" og "ÆG" ved at matche billeder med bogstavsekvenser. Introducerer bogstavgenkendelse på en legende måde.',
      },
      {
        id: 'bornehaveklasse',
        icon: '🎒',
        title: 'Børnehaveklasse: Billedbaseret ordforråd',
        description: 'Lav 5×5–8×8 gitre med 5–6 billedord på 3–4 bogstaver. Kun vandrette og lodrette ord. Vælg temaer der matcher klassens emne som dyr eller frugt. Styrker FM.DAN.KO.1-2 om ordforråd og sproglig bevidsthed i børnehaveklassen.',
      },
      {
        id: '1-klasse',
        icon: '📚',
        title: '1. klasse: Stavning med diagonale ord',
        description: 'Brug 8×8–12×12 gitre med 8–10 ord på 4–6 bogstaver. Aktivér diagonale ord for ekstra udfordring. Brug ugens nye gloser fra dansktimerne. Eleverne styrker stavning og afkodning i overensstemmelse med FM.DAN.LÆ.1-2.',
      },
      {
        id: '2-klasse',
        icon: '✏️',
        title: '2. klasse: Tematiske ordlister',
        description: 'Lav 12×12–15×15 gitre med 10–12 tematiske ord. Aktivér både diagonale og baglæns ord. Brug fagspecifikke ord fra naturfag eller matematik. Eleverne udvider deres faglige ordforråd gennem udfordrende ordpuslespil.',
      },
      {
        id: '3-klasse',
        icon: '🎯',
        title: '3. klasse: Avancerede ordjagter',
        description: 'Brug 15×15–20×20 gitre med 12–15 lange ord. Alle retninger aktiveret inklusive baglæns diagonalt. Lav tværfaglige ordsøgninger med ord fra historie, geografi og naturfag. Eleverne skriver fundne ord i sætninger som efteropgave.',
      },
    ],
  },
};

export default wordSearchDaContent;
