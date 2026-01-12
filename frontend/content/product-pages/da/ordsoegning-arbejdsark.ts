import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Ordsøgning Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/ordsoegning-arbejdsark.ts
 * URL: /da/apps/ordsoegning-arbejdsark
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Danish/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'ordsoegning-arbejdsark',
    appId: 'word-search',
    title: 'Gratis Ordsøgningsopgaver til Print | Arbejdsark til 0. Klasse og 1. Klasse',
    description: 'Lav professionelle ordsøgningsopgaver til børnehaveklassen og indskolingen med vores gratis generator. Perfekt til gratis skoleopgaver, arbejdsark til print og opgaver til 0. klasse og 1. klasse. Ordsøgningsgeneratoren egner sig til lære bogstaver, læse og skrive og stavning.',
    keywords: 'ordsøgning arbejdsark, gratis skoleopgaver, arbejdsark til print, opgaver til 0 klasse, opgaver til 1 klasse, lære bogstaver, læse og skrive, ordsøgningsgenerator, printklare opgaver, dansk skoleopgaver',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/ordsoegning-arbejdsark',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Gratis Ordsøgningsopgaver til Print',
    subtitle: 'Arbejdsark til Børnehaveklassen, 0. Klasse og 1. Klasse',
    description: `Lav professionelle ordsøgningsopgaver til børnehaveklassen og indskolingen med vores gratis generator. Perfekt til gratis skoleopgaver, arbejdsark til print og opgaver til 0. klasse og 1. klasse. Ordsøgningsgeneratoren egner sig til lære bogstaver, læse og skrive og stavning.

Med ordsøgningsgeneratoren laver du printklare opgaver til print på under 3 minutter. Generatoren kombinerer lære bogstaver med ordforrådsøvelser. Download færdige ordsøgninger som PDF eller JPEG. Hvert arbejdsark kan tilpasses individuelt.

Vores gratis ordsøgningsgenerator tilbyder over 3000 børnevenlige billeder til arbejdsark. Lav tematiske opgaver til matematikopgaver, læse og skrive eller farvelægning. Generatoren fungerer på 11 sprog. Ideel til flersproget undervisning.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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
  },

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Ordsøgning Arbejdsark Eksempler',
    sectionDescription: 'Download gratis eksempler på arbejdsark for at se vores professionelle kvalitet',
    badgeText: 'Gratis Eksempler',
    downloadLabel: 'Download Gratis Eksempel',
    downloadingLabel: 'Downloader...',
    worksheetLabel: 'Arbejdsark',
    answerKeyLabel: 'Facitark',
    viewAllLabel: 'Se alle',
    noPdfLabel: 'Ingen PDF tilgængelig',
    freePdfCountLabel: '3 gratis downloads',
    ofLabel: 'af',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Ordsøgning portrætformat med tematiske billeder til ordforrådsøvelser i børnehaveklassen',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Ordsøgning landskabsformat med farverige billedledetråde til 0. klasse og 1. klasse',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Brugerdefineret ordliste ordsøgning til staveøvelser og de 120 ord',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Funktioner til Gratis Skoleopgaver og Arbejdsark til Print',
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
        icon: '⚡',
        title: 'Lav Ordsøgninger på 3 Klik',
        description: `Vælg et tema fra listen. Generatoren vælger automatisk 8 passende billeder. Klik på Generer. Dit arbejdsark til print er klar. Ingen designkendskab påkrævet.

Generatoren skaber straks printklare opgaver til print. Perfekt til lære bogstaver i børnehaveklassen. Kombiner ordsøgninger med læse og skrive øvelser. Hvert arbejdsark downloades på under 3 minutter.

Vælg mellem over 50 temaer. Dyr, køretøjer, mad, natur og meget mere. Ideel til tematiske gratis skoleopgaver. Børnene elsker farverige opgaver til 0. klasse og 1. klasse.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Rediger Alt på Arbejdsarket',
        description: `Hvert element på arbejdsarket kan redigeres. Flyt billeder med musens træk-og-slip funktion. Roter og skaler objekter. Slet uønskede elementer med et klik.

Tilpas gratis skoleopgaver til din klasse. Tilføj egne tekster og instruktioner. Ændr skrifttyper og farver. Alle ændringer vises øjeblikkeligt på arbejdsarket til print.

Lav unikke opgaver til hver elev. Perfekt til differentiering i indskolingen. Tilpas sværhedsgraden til 0. klasse eller 1. klasse. Rediger arbejdsark direkte på skærmen uden at printe først.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🌍',
        title: '11 Sprog Understøttet',
        description: `Ordsøgningsgeneratoren understøtter 11 sprog. Dansk, engelsk, fransk, spansk, italiensk, portugisisk, hollandsk, tysk, svensk, norsk og finsk. Billednavnene vises automatisk på det valgte sprog.

Lav flersprogede gratis skoleopgaver. Ideel til fremmedsprog og dansk som andetsprog. Sprogvalget ændrer ordene i ordsøgningen. Perfekt til arbejdsark til print i internationale klasser.

Skift sprog med et klik. Lav samme opgave på flere sprog. Fantastisk til lære bogstaver på fremmedsprog. Børn kan sammenligne ord på forskellige sprog.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Upload Egne Billeder',
        description: `Upload så mange egne billeder du vil. Alle almindelige formater understøttes (JPEG, PNG, GIF). Kombiner egne billeder med billedbiblioteket. Lav personlige gratis skoleopgaver til dine elever.

Multi-upload sparer tid. Upload flere billeder samtidig. Perfekt til tematiske arbejdsark om elevernes interesser. Dine uploadede billeder forbliver tilgængelige under sessionen.

Tilføj billeder af elevernes navne. Lav ordsøgninger med klasseværelsets regler. Brug fotos fra skoleturen. Børnene er mere engagerede når opgaverne indeholder kendt indhold.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerciel Print-on-Demand Licens',
        description: `Kernepakke og Fuld Adgang inkluderer fuld kommerciel print-on-demand licens. Sælg dine arbejdsark på Etsy, Teachers Pay Teachers og Amazon KDP. Ingen ekstra licensomkostninger. Ingen kreditering påkrævet.

Mange lærere tjener kr. 4000-40.000 om måneden. Lav pakker med gratis skoleopgaver til salg. Kombiner ordsøgninger med matematikopgaver og farvelægning. 300 DPI professionel kvalitet perfekt til kommercielt salg.

Print-on-demand licensen gælder ubegrænset. Sælg så mange arbejdsark du vil. Perfekt til lærer-iværksættere. Byg en ekstra indtægt ved at sælge opgaver til print.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Over 3000 Børnevenlige Billeder',
        description: `Billedbiblioteket indeholder over 3000 børnevenlige billeder. Organiseret efter temaer som dyr, køretøjer, mad, natur. Gennemse billeder efter kategorier. Eller brug søgefunktionen til specifikke ord.

Lav tematiske arbejdsark til print. Kombiner lære bogstaver med naturfag. Hvert billede er højopløseligt og printklar. Nye billeder tilføjes regelmæssigt til biblioteket.

Billederne passer perfekt til børnehaveklassen og indskolingen. Farverige illustrationer fanger børns opmærksomhed. Lav gratis skoleopgaver om enhver tematik. Billederne virker lige godt til 0. klasse som til 3. klasse.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionel 300 DPI Kvalitet',
        description: `Eksporter arbejdsark i 300 DPI opløsning. Perfekt til print hjemme eller i skolen. PDF og JPEG formater tilgængelige. Gråtoneoption sparer printerblæk ved farvede billeder.

Hvert arbejdsark ser professionelt ud. Klare, skarpe billeder. Læselig skrift selv i små størrelser. Kvaliteten er ideel til gratis skoleopgaver. Print ubegrænset antal kopier af dine opgaver til print.

Ingen pixelerede billeder. Ingen uskarpe linjer. Professionel kvalitet hver gang. Dine arbejdsark ser lige så gode ud som købte opgaver. Forældre og elever vil være imponerede.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Lav Gratis Skoleopgaver i 5 Nemme Trin',
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
    sectionTitle: 'Perfekt til Pædagoger, Lærere og Forældre',
    sectionDescription: 'Ordsøgningsopgaver passer til mange forskellige brugere. Pædagoger i børnehaveklassen elsker de visuelle opgaver. Lærere i indskolingen bruger dem til lære bogstaver. Forældre kombinerer dem med farvelægning hjemme. Hver brugergruppe finder unikke måder at bruge gratis skoleopgaver på.',
    badgeText: 'Hvem Er Det Til',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Pædagoger i Børnehaveklassen',
        subtitle: 'Gratis Skoleopgaver med Farvelægning og Lære Bogstaver',
        description: `Pædagoger i børnehaveklassen elsker ordsøgningsopgaver. Perfekt til at introducere lære bogstaver. Børnene genkender billeder før de kan læse ordene. Kombiner ordsøgninger med farvelægning for ekstra engagement.

Brug store gitre til børnehaveklassen. 5x5 eller 6x6 er perfekte størrelser. Korte ord som DYR, SOL, HUS virker bedst. Børnene elsker at cirkle ordene de finder som finmotorik øvelser.

Kombiner ordsøgninger med farvelægning aktiviteter. Print ordsøgningen og lad børnene farvelægge billederne. Fantastisk til stille aktiviteter efter frokost. Perfekt til gratis skoleopgaver i temauger om dyr eller årstider.`,
        quote: 'Mine elever elsker at finde de skjulte billeder!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lærere i 0. Klasse og 1. Klasse',
        subtitle: 'Læse og Skrive Øvelser og De 120 Ord',
        description: `Lærere i indskolingen bruger ordsøgninger til mange formål. Perfekt til lære bogstaver og læse og skrive øvelser. Kombiner ordsøgninger med matematikopgaver om talord. Lav opgaver til print til gangetabeller når eleverne lærer dem.

I 0. klasse start med simple ordsøgninger. Brug billeder fra elevernes hverdag. Skoleting, legetøj, fødevarer. Kombiner med de 120 ord eleverne skal kende. Perfekt til gratis skoleopgaver hver uge.

I 1. klasse øg sværhedsgraden. Tilføj diagonale ord til opgaverne. Brug længere ord eleverne lærer. Kombiner ordsøgninger med matematikopgaver om addition og subtraktion. Lav tematiske opgaver til print om gangetabeller.`,
        quote: 'Ordsøgninger gør staveøvelser til et spil.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hjemmeundervisende Forældre',
        subtitle: 'Arbejdsark til Print og Matematikopgaver til Flere Klassetrin',
        description: `Hjemmeundervisende forældre elsker ordsøgningsgeneratoren. Lav opgaver til print til alle børn samtidig. Tilpas sværhedsgraden til hvert barns niveau. Kombiner ordsøgninger med farvelægning, matematikopgaver og gangetabeller i samme tema.

Lav temapakker for hele ugen. Mandag dyr med ordsøgning og farvelægning. Tirsdag talord med matematikopgaver. Onsdag gangetabeller som ordsøgning. Torsdag læse og skrive øvelser. Fredag blandet gennemgang. Alle gratis skoleopgaver i samme tema.

Kommerciel licens giver ekstra værdi. Mange hjemmeundervisende forældre sælger deres pakker. Del opgaver med andre familier. Lav samarbejdsprojekter med andre hjemmeundervisere. Del opgaver til print på sociale medier.`,
        quote: 'Et værktøj dækker alle mine børns klassetrin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fremmedsprogs- og DSA-lærere',
        subtitle: 'Flersprogede Gratis Skoleopgaver til Læse og Skrive',
        description: `Fremmedsprogslærere finder ordsøgningsgeneratoren uvurderlig. Skift sprog med et klik. Lav samme ordsøgning på dansk og engelsk. Perfekt til at sammenligne ord på forskellige sprog. Fantastisk til gratis skoleopgaver i sprogundervisning.

Brug ordsøgninger til ordforråd øvelser. Nye ord visualiseres med billeder. Eleverne lærer stavning gennem søgning. Kombiner med læse og skrive øvelser på fremmedsproget. Perfekt til begynderundervisning i nye sprog.

Lav tematiske sprogpakker. Farver på engelsk med ordsøgning. Tal på tysk med matematikopgaver. Madord på fransk kombineret med farvelægning af mad. Hver uge nyt tema med nye ord i opgaver til print.`,
        quote: 'Den flersprogede support er essentiel for mit tosprogede program.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpædagoger',
        subtitle: 'Tilpassede Opgaver til Print med Finmotorik Øvelser',
        description: `Specialpædagoger værdsætter den fulde tilpasningsmulighed. Lav store gitre for elever med synsvanskeligheder. Store bogstaver og tydelige billeder. Kombiner ordsøgninger med farvelægning for finmotorik øvelser. Hver opgave kan tilpasses individuelle behov.

Visuel læring fungerer fantastisk. Billeder støtter ordgenkendelse. Elever med læsevanskeligheder finder ordene lettere. Kombiner ordsøgninger med farvelægning for variation. Multi-sensorisk tilgang til gratis skoleopgaver.

Lav differentierede opgaver til samme klasse. Simple ordsøgninger til nogle elever. Sværere versioner til andre. Alle arbejder med samme tema. Perfekt til inkluderende undervisning med opgaver til print til alle niveauer.`,
        quote: 'Jeg kan hurtigt tilpasse arbejdsark til hver elevs IEP.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lærer-Iværksættere',
        subtitle: 'Sælg Arbejdsark og Matematikopgaver på Teachers Pay Teachers',
        description: `Lærer-iværksættere tjener kr. 4000-40.000 om måneden. Sælg pakker på Teachers Pay Teachers. Kombiner ordsøgninger med matematikopgaver og farvelægning. Lav komplette temapakker. Sæsonpakker sælger særligt godt som gratis skoleopgaver til salg.

Lav færdige pakker til download. 10 ordsøgninger om efterår. 15 matematikopgaver kombineret med ordsøgninger. 20 sider farvelægning med matchende ordsøgninger. Pakker med gangetabeller som ordsøgninger. Købere elsker komplette opgaver til print de kan bruge med det samme.

Print-on-demand licensen åbner muligheder. Sælg på Etsy som arbejdsark til print. Lav bøger til Amazon KDP. Kombiner 50 ordsøgninger i en bog. Tilføj farvelægning sider mellem opgaverne. Lav specialiserede bøger om matematikopgaver eller gangetabeller.`,
        quote: 'Mit abonnement betalte sig selv i første måned!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Ofte Stillede Spørgsmål',
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
        question: 'Er ordsøgningsgeneratoren gratis at bruge til gratis skoleopgaver?',
        answer: 'Ordsøgningsgeneratoren er gratis at bruge med vandmærke på opgaverne. Kun til privat brug i dit hjem eller klasseværelse. Du kan lave ubegrænsede ordsøgninger gratis. Vandmærke vises diskret på hver side af gratis skoleopgaver. Kernepakke abonnement koster kr. 1075 årligt eller kr. 112 månedligt og fjerner vandmærke fra alle opgaver til print. Inkluderer 10 populære værktøjer og giver kommerciel licens til salg af arbejdsark.',
      },
      {
        id: '2',
        question: 'Kan jeg printe gratis skoleopgaver hjemme på normal printer?',
        answer: 'Ja, alle ordsøgninger kan printes hjemme. Standard A4 printer fungerer perfekt til gratis skoleopgaver. 300 DPI kvalitet sikrer skarpe udskrifter. PDF format er optimeret til print. Brug almindeligt kopipapir til daglig brug. Tykkere papir til opgaver til print du vil gemme. Farveprinter giver flotteste resultat. Sort-hvid printer virker også fint med gråtoneoption.',
      },
      {
        id: '3',
        question: 'Skal jeg have designkendskab til at lave arbejdsark til print?',
        answer: 'Nej, intet designkendskab påkrævet til gratis skoleopgaver. Vælg tema, klik generer, færdig. Generatoren laver alt automatisk. Professionelt layout hver gang uden designarbejde. Alle elementer kan redigeres hvis du vil. Træk-og-slip interface er intuitivt. Ingen læringskurve for opgaver til print. Selv teknologi-uerfarne lærere mestrer det på minutter.',
      },
      {
        id: '4',
        question: 'Kan jeg bruge gratis skoleopgaver i mit klasseværelse til eleverne?',
        answer: 'Ja, gratis version kan bruges i klasseværelset. Print ubegrænset antal kopier til dine elever. Vandmærke vises på opgaverne men forstyrrer ikke læsning. Perfekt til daglig undervisningsbrug af gratis skoleopgaver. Abonnement fjerner vandmærke fra arbejdsark og giver mere professionelt udseende. Elever og forældre ser polerede opgaver til print.',
      },
      {
        id: '5',
        question: 'Hvilke sprog er gratis skoleopgaver tilgængelige på til lære bogstaver?',
        answer: 'Ordsøgningsgeneratoren understøtter 11 sprog. Dansk, engelsk, tysk, fransk, spansk, italiensk, portugisisk, hollandsk, svensk, norsk, finsk. Perfekt til lære bogstaver på flere sprog i gratis skoleopgaver. Skift sprog med et klik. Billednavne ændres automatisk. Samme ordsøgning på forskellige sprog. Fantastisk til sprogundervisning med arbejdsark til print.',
      },
      {
        id: '6',
        question: 'Kan jeg sælge gratis skoleopgaver jeg laver med generatoren?',
        answer: 'Gratis version tillader ikke kommercielt salg. Kun privat og klasseværelsesbrug af gratis skoleopgaver. Vandmærkede opgaver kan ikke sælges lovligt. Kernepakke og Fuld Adgang inkluderer kommerciel licens. Sælg dine opgaver til print på Teachers Pay Teachers. Byg Etsy shop med arbejdsark. Lav Amazon KDP bøger. Ingen ekstra licensomkostninger.',
      },
      {
        id: '7',
        question: 'Hvordan tilpasser jeg gratis skoleopgaver til mine elever i 0. klasse?',
        answer: 'Start med små gitre til 0. klasse. 5x5 eller 6x6 passer perfekt. Korte simple ord virker bedst. DYR, SOL, HUS, BIL er ideelle til gratis skoleopgaver. Brug billeder i stedet for tekstliste. Børn i 0. klasse genkender billeder før ord. Farverige illustrationer holder opmærksomhed. Perfekt til visuel læring med arbejdsark til print.',
      },
      {
        id: '8',
        question: 'Hvor lang tid tager det at lave arbejdsark til print?',
        answer: 'Under 3 minutter fra start til download. Vælg tema 10 sekunder. Generer 5 sekunder. Rediger 1-2 minutter efter behov. Download 10 sekunder. Færdige gratis skoleopgaver på rekordtid. Sammenlign med traditionel metode. Find billeder online 15 minutter. Tjek ophavsret 10 minutter. Design i Word 20 minutter. Lav gitter manuelt 15 minutter. Total 60 minutter for et arbejdsark til print.',
      },
      {
        id: '9',
        question: 'Inkluderer gratis skoleopgaver facitark til læse og skrive øvelser?',
        answer: 'Ja, automatisk facitark genereres. Ord er farvemarkeret i gitteret. Perfekt til hurtig rettelse af gratis skoleopgaver. Download både opgave og facit samtidig. Facitark viser præcis hvor ord er placeret. Forskellige farver til hvert ord. Let at se diagonale og baglæns ord. Spar tid på rettelse af arbejdsark til print.',
      },
      {
        id: '10',
        question: 'Kan jeg uploade mine egne billeder til gratis skoleopgaver?',
        answer: 'Ja, ubegrænset billedupload inkluderet. JPEG, PNG, GIF formater understøttes. Kombiner dine billeder med biblioteket. Lav ultra-personlige gratis skoleopgaver til din klasse. Multi-upload funktion sparer tid. Upload 10-20 billeder samtidig. Perfekt til tematiske arbejdsark om klasseprojekt. Brug fotos fra ekskursion i opgaver til print.',
      },
      {
        id: '11',
        question: 'Hvilke aldersgrupper passer gratis skoleopgaver til bedst?',
        answer: 'Børnehaveklassen elsker simple ordsøgninger. 5x5 gitre med 5-6 ord. Billeder i stedet for tekst. Kombiner med farvelægning og finmotorik øvelser. Perfekt introduktion til lære bogstaver. 0. klasse og 1. klasse er ideelle aldersgrupper. 8x8 til 12x12 gitre. Korte ord de lærer. Kombiner med læse og skrive øvelser. Gratis skoleopgaver støtter alfabetisering perfekt.',
      },
      {
        id: '12',
        question: 'Kan jeg lave ordsøgninger om specifikke skoleemner med finmotorik øvelser?',
        answer: 'Ja, vælg hvilke som helst ord. Naturfag ordforråd i ordsøgninger. Historiske personer og begivenheder. Geografiske steder. Matematisk terminologi. Alle emner kan integreres i gratis skoleopgaver. Tematisk integration er nøglen. Vinteruge med vinter-ord. Påsketema med påske-ord. Dyretema med dyrenavne. Kombiner faglig læring med finmotorik øvelser i arbejdsark.',
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
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombiner med Andre Arbejdsark Generatorer',
    sectionDescription: 'Lav komplette læringspakker ved at kombinere ordsøgninger med disse komplementære generatorer.',
    ctaTitle: 'Klar til at Lave Fantastiske Arbejdsark?',
    ctaDescription: 'Tilslut dig tusindvis af pædagoger der laver professionelle arbejdsark. Ubegrænset oprettelse, kommerciel licens inkluderet.',
    primaryCtaText: 'Start Gratis Prøve',
    secondaryCtaText: 'Se Alle 33 Generatorer',
    badgeText: 'Fungerer Godt Med',
    exploreText: 'Udforsk',
    trustBadges: {
      guarantee: '30 dages garanti',
      securePayment: 'Sikker betaling',
      cancelAnytime: 'Opsig når som helst',
    },
    items: [
      {
        id: '1',
        slug: 'crossword',
        name: 'Krydsord',
        category: 'Sprog',
        icon: '📝',
        description: 'Komplement ordsøgninger med krydsord der bruger de samme ordforråstemaer til omfattende ordøvelser.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Ordforbytter',
        category: 'Sprog',
        icon: '🔤',
        description: 'Kombiner ordsøgninger med forbyttede ord puslespil for at forstærke stavning og ordforråd fra flere vinkler.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Gæt Ordet',
        category: 'Sprog',
        icon: '❓',
        description: 'Tilføj ordgætteaktiviteter til dine læsecentre sammen med ordsøgningspuslespil for varieret øvelse.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Kryptogram',
        category: 'Logik',
        icon: '🔐',
        description: 'Udfordr eleverne med kodebrydningspuslespil der udvikler logisk tænkning og bogstavmønstergenkendelse.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Malebilleder',
        category: 'Kunst og Kreativitet',
        icon: '🎨',
        description: 'Beløn færdiggjorte ordsøgninger med tematiske malebilleder der udvikler finmotorik.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Alfabettog',
        category: 'Tidlig Læring',
        icon: '🚂',
        description: 'Balancer ordsøgningsøvelser med bogstavgenkendelsesaktiviteter for omfattende tidlig læsefærdighed.',
      },
    ],
  },
};

export default wordSearchDaContent;
