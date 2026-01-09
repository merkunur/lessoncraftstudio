import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Ordsogning Arbejdsark - Danish Content
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
    title: 'Gratis Ordsogningsopgaver til Print | Arbejdsark til 0. Klasse og 1. Klasse',
    description: 'Lav professionelle ordsoegningsopgaver til børnehaveklassen og indskolingen med vores gratis generator. Perfekt til gratis skoleopgaver, arbejdsark til print og opgaver til 0. klasse og 1. klasse. Ordsoegningsgeneratoren egner sig til laere bogstaver, laese og skrive og stavning.',
    keywords: 'ordsoegning arbejdsark, gratis skoleopgaver, arbejdsark til print, opgaver til 0 klasse, opgaver til 1 klasse, laere bogstaver, laese og skrive, ordsoegningsgenerator, printklare opgaver, dansk skoleopgaver',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/ordsoegning-arbejdsark',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Gratis Ordsogningsopgaver til Print',
    subtitle: 'Arbejdsark til Bornehaveklassen, 0. Klasse og 1. Klasse',
    description: `Lav professionelle ordsoegningsopgaver til boernehaveklassen og indskolingen med vores gratis generator. Perfekt til gratis skoleopgaver, arbejdsark til print og opgaver til 0. klasse og 1. klasse. Ordsoegningsgeneratoren egner sig til laere bogstaver, laese og skrive og stavning.

Med ordsoegningsgeneratoren laver du printklare opgaver til print pa under 3 minutter. Generatoren kombinerer laere bogstaver med ordforradsovelser. Download faerdige ordsoegninger som PDF eller JPEG. Hvert arbejdsark kan tilpasses individuelt.

Vores gratis ordsoegningsgenerator tilbyder over 3000 boernevenlige billeder til arbejdsark. Lav tematiske opgaver til matematikopgaver, laese og skrive eller farvelaegning. Generatoren fungerer pa 11 sprog. Ideel til flersproget undervisning.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
    ctaLabels: {
      tryFree: 'Prov Gratis',
      viewSamples: 'Se Eksempler',
    },
    trustBadges: {
      languages: '11 Sprog',
      images: '3000+ Billeder',
      license: 'Kommerciel Licens',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Ordsoegning Arbejdsark Eksempler',
    downloadLabel: 'Download Gratis Eksempel',
    worksheetLabel: 'Arbejdsark',
    answerKeyLabel: 'Facitark',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Ordsoegning portratformat med tematiske billeder til ordforradsoevelser i boernehaveklassen',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Ordsoegning landskabsformat med farverige billedledetrade til 0. klasse og 1. klasse',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Brugerdefineret ordliste ordsoegning til staveovelser og de 120 ord',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Funktioner til Gratis Skoleopgaver og Arbejdsark til Print',
    sectionDescription: 'Ordsoegningsgeneratoren tilbyder alle vigtige funktioner til gratis skoleopgaver. Lav professionelle arbejdsark og opgaver til print pa fa minutter. Hver funktion er udviklet til laerere og paedagoger. Perfekt til boernehaveklassen og indskolingen.',
    highlightBadgeText: 'Vigtig Funktion',
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Lav Ordsoegninger pa 3 Klik',
        description: `Vaelg et tema fra listen. Generatoren vaelger automatisk 8 passende billeder. Klik pa Generer. Dit arbejdsark til print er klar. Ingen designkendskab paekraevet.

Generatoren skaber straks printklare opgaver til print. Perfekt til laere bogstaver i boernehaveklassen. Kombiner ordsoegninger med laese og skrive oevelser. Hvert arbejdsark downloades pa under 3 minutter.

Vaelg mellem over 50 temaer. Dyr, koeretoejer, mad, natur og meget mere. Ideel til tematiske gratis skoleopgaver. Boernene elsker farverige opgaver til 0. klasse og 1. klasse.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Rediger Alt pa Arbejdsarket',
        description: `Hvert element pa arbejdsarket kan redigeres. Flyt billeder med musens traek-og-slip funktion. Roter og skaler objekter. Slet uoenskede elementer med et klik.

Tilpas gratis skoleopgaver til din klasse. Tilfoej egne tekster og instruktioner. Aendre skrifttyper og farver. Alle aendringer vises oejeblikkeligt pa arbejdsarket til print.

Lav unikke opgaver til hver elev. Perfekt til differentiering i indskolingen. Tilpas svearhedsgraden til 0. klasse eller 1. klasse. Rediger arbejdsark direkte pa skaermen uden at printe foerst.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🌍',
        title: '11 Sprog Understottet',
        description: `Ordsoegningsgeneratoren understoetter 11 sprog. Dansk, engelsk, fransk, spansk, italiensk, portugisisk, hollandsk, tysk, svensk, norsk og finsk. Billednavnene vises automatisk pa det valgte sprog.

Lav flersprogede gratis skoleopgaver. Ideel til fremmedsprog og dansk som andetsprog. Sprogvalget aendrer ordene i ordsoegningen. Perfekt til arbejdsark til print i internationale klasser.

Skift sprog med et klik. Lav samme opgave pa flere sprog. Fantastisk til laere bogstaver pa fremmedsprog. Boern kan sammenligne ord pa forskellige sprog.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Upload Egne Billeder',
        description: `Upload sa mange egne billeder du vil. Alle almindelige formater understoettes (JPEG, PNG, GIF). Kombiner egne billeder med billedbiblioteket. Lav personlige gratis skoleopgaver til dine elever.

Multi-upload sparer tid. Upload flere billeder samtidig. Perfekt til tematiske arbejdsark om elevernes interesser. Dine uploadede billeder forbliver tilgaengelige under sessionen.

Tilfoej billeder af elevernes navne. Lav ordsoegninger med klassevaerelsets regler. Brug fotos fra skoleturen. Boernene er mere engagerede nar opgaverne indeholder kendt indhold.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerciel Print-on-Demand Licens',
        description: `Kernepakke og Fuld Adgang inkluderer fuld kommerciel print-on-demand licens. Saelg dine arbejdsark pa Etsy, Teachers Pay Teachers og Amazon KDP. Ingen ekstra licensomkostninger. Ingen kreditering paekraevet.

Mange laerere tjener kr. 4000-40.000 om maneden. Lav pakker med gratis skoleopgaver til salg. Kombiner ordsoegninger med matematikopgaver og farvelaegning. 300 DPI professionel kvalitet perfekt til kommercielt salg.

Print-on-demand licensen gaelder ubegraenset. Saelg sa mange arbejdsark du vil. Perfekt til laerer-ivaerksaettere. Byg en ekstra indtaegt ved at saelge opgaver til print.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Over 3000 Boernevenlige Billeder',
        description: `Billedbiblioteket indeholder over 3000 boernevenlige billeder. Organiseret efter temaer som dyr, koeretoejer, mad, natur. Gennemse billeder efter kategorier. Eller brug soegefunktionen til specifikke ord.

Lav tematiske arbejdsark til print. Kombiner laere bogstaver med naturfag. Hvert billede er hoejoploeselig og printklar. Nye billeder tilfojes regelmaessigt til biblioteket.

Billederne passer perfekt til boernehaveklassen og indskolingen. Farverige illustrationer fanger boerns opmaerksomhed. Lav gratis skoleopgaver om enhver tematik. Billederne virker lige godt til 0. klasse som til 3. klasse.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionel 300 DPI Kvalitet',
        description: `Eksporter arbejdsark i 300 DPI oploesning. Perfekt til print hjemme eller i skolen. PDF og JPEG formater tilgaengelige. Gratoneoption sparer printerblaek ved farvede billeder.

Hvert arbejdsark ser professionelt ud. Klare, skarpe billeder. Laeselig skrift selv i sma stoerrelser. Kvaliteten er ideel til gratis skoleopgaver. Print ubegraenset antal kopier af dine opgaver til print.

Ingen pixelerede billeder. Ingen uskarpe linjer. Professionel kvalitet hver gang. Dine arbejdsark ser lige sa gode ud som koebte opgaver. Foraeldre og elever vil vaere imponerede.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Lav Gratis Skoleopgaver i 5 Nemme Trin',
    sectionDescription: 'Lav professionelle opgaver til print pa under 3 minutter. Foelg disse 5 simple trin. Intet designkendskab paekraevet. Perfekt til gratis skoleopgaver til 0. klasse og 1. klasse.',
    ctaText: 'Start Nu',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Vaelg Indhold til Dine Arbejdsark',
        description: `Vaelg et tema fra dropdown-menuen. Over 50 temaer tilgaengelige. Dyr, koeretoejer, mad, natur og meget mere. Eller vaelg "Tilfaeldigt tema" for variation.

Generatoren vaelger automatisk 8 passende billeder fra temaet. Ideel til tematiske gratis skoleopgaver. Kombiner laere bogstaver med naturfag. Billedvalget sker oejeblikkeligt efter du vaelger tema.

Alternativt kan du vaelge individuelle billeder manuelt. Gennemse billedbiblioteket kategori for kategori. Brug soegefunktionen til specifikke ord. Perfekt til personaliserede arbejdsark til print til din klasse.

Du kan ogsa indtaste dine egne ord direkte. Skriv ord eleverne skal laere. Fantastisk til matematikopgaver med talord. Perfekt til laese og skrive oevelser med ugens nye ord. Ordsoegningen genereres ud fra dine egne ord.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger til Dit Klassetrin',
        description: `Vaelg gitterstorrelse efter elevernes niveau. 5x5 til boernehaveklassen. 8x8 til 0. klasse. 12x12 til 1. klasse. 20x20 til 2. klasse og 3. klasse. Svaehedsgraden tilpasses automatisk.

Aktiver diagonale ord for mere udfordring. Deaktiver dem til simplere arbejdsark. Baglaens skrevne ord er valgfrie. Hver indstilling aendrer svaehedsgraden pa opgaverne til print.

Vaelg dit sideformat. A4 eller Letter papir. Hoejformat eller tvaerformat. Sidestorrelsen pavirker laesbarheden. Tvaerformat egner sig til stoerre gitre.

Tilfoej en titel til dit arbejdsark. Skriv elevens navn pa opgaven. Perfekt til individuelle gratis skoleopgaver. Personaliser hvert arbejdsark til den enkelte elev i klassen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generer Din Ordsoegning',
        description: `Klik pa "Generer" knappen. Generatoren laver straks din ordsoegning. Ordene placeres automatisk i gitteret. Tomme felter fyldes med tilfaeldige bogstaver for ekstra udfordring.

Ordsoegningsopgaven vises pa arbejdsfladen. Ordlisten genereres automatisk ved siden af. Billeder eller ord vises afhaengig af dine indstillinger. Alt er synligt med det samme.

Et facitark genereres automatisk. Ordene er farvemarkeret i gitteret. Perfekt til hurtig rettelse. Skift mellem opgaveark og facitark med et klik pa knappen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Rediger Dit Arbejdsark',
        description: `Tilpas arbejdsarket til dine behov. Flyt gitteret med traek-og-slip. Foerstoer eller formindsk elementer. Roter objekter som du oensker. Alt kan flyttes og aendres pa arbejdsfladen.

Tilfoej egne tekster til opgaverne. Skriv overskrifter eller instruktioner. Vaelg mellem 7 boernevenlige skrifttyper. Aendr skriftstorrelse og farve efter oenske. Goer arbejdsarket personligt for din klasse.

Upload egne billeder direkte til arbejdsarket. Kombiner gratis skoleopgaver med personlige fotos. Tilfoej rammer og baggrunde efter smag. Hvert element kan tilpasses individuelt pa opgaverne til print.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download og Print Dine Arbejdsark',
        description: `Klik pa "Download" knappen. Vaelg mellem JPEG og PDF format. Begge formater er printklare. 300 DPI kvalitet garanterer skarpe udskrifter hver gang.

Aktiver gratonemuligheden hvis du vil. Sparer printerblaek pa farvede billeder. Ideel til store klassesaet. Kvaliteten forbliver hoej selv i gratone pa opgaverne til print.

Download arbejdsarket til din computer. Download ogsa facitarket til rettelse. Print ubegraenset antal kopier. Hvert arbejdsark er straks klar til brug i klassen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfekt til Paedagoger, Laerere og Foraeldre',
    sectionDescription: 'Ordsoegningsopgaver passer til mange forskellige brugere. Paedagoger i boernehaveklassen elsker de visuelle opgaver. Laerere i indskolingen bruger dem til laere bogstaver. Foraeldre kombinerer dem med farvelaegning hjemme. Hver brugergruppe finder unikke mader at bruge gratis skoleopgaver pa.',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Paedagoger i Boernehaveklassen',
        subtitle: 'Gratis Skoleopgaver med Farvelaegning og Laere Bogstaver',
        description: `Paedagoger i boernehaveklassen elsker ordsoegningsopgaver. Perfekt til at introducere laere bogstaver. Boernene genkender billeder foer de kan laese ordene. Kombiner ordsoegninger med farvelaegning for ekstra engagement.

Brug store gitre til boernehaveklassen. 5x5 eller 6x6 er perfekte stoerrelser. Korte ord som DYR, SOL, HUS virker bedst. Boernene elsker at cirkle ordene de finder som finmotorik oevelser.

Kombiner ordsoegninger med farvelaegning aktiviteter. Print ordsoegningen og lad boernene farvelaegge billederne. Fantastisk til stille aktiviteter efter frokost. Perfekt til gratis skoleopgaver i temauger om dyr eller arstider.`,
        quote: 'Mine elever elsker at finde de skjulte billeder!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Laerere i 0. Klasse og 1. Klasse',
        subtitle: 'Laese og Skrive Oevelser og De 120 Ord',
        description: `Laerere i indskolingen bruger ordsoegninger til mange formal. Perfekt til laere bogstaver og laese og skrive oevelser. Kombiner ordsoegninger med matematikopgaver om talord. Lav opgaver til print til gangetabeller nar eleverne laerer dem.

I 0. klasse start med simple ordsoegninger. Brug billeder fra elevernes hverdag. Skoleting, legetoej, foedevarer. Kombiner med de 120 ord eleverne skal kende. Perfekt til gratis skoleopgaver hver uge.

I 1. klasse oeg svaehedsgraden. Tilfoej diagonale ord til opgaverne. Brug laengere ord eleverne laerer. Kombiner ordsoegninger med matematikopgaver om addition og subtraktion. Lav tematiske opgaver til print om gangetabeller.`,
        quote: 'Ordsoegninger goer staveovelser til et spil.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hjemmeundervisende Foraeldre',
        subtitle: 'Arbejdsark til Print og Matematikopgaver til Flere Klassetrin',
        description: `Hjemmeundervisende foraeldre elsker ordsoegningsgeneratoren. Lav opgaver til print til alle boern samtidig. Tilpas svaehedsgraden til hvert barns niveau. Kombiner ordsoegninger med farvelaegning, matematikopgaver og gangetabeller i samme tema.

Lav temapakker for hele ugen. Mandag dyr med ordsoegning og farvelaegning. Tirsdag talord med matematikopgaver. Onsdag gangetabeller som ordsoegning. Torsdag laese og skrive oevelser. Fredag blandet gennemgang. Alle gratis skoleopgaver i samme tema.

Kommerciel licens giver ekstra vaerdi. Mange hjemmeundervisende foraeldre saelger deres pakker. Del opgaver med andre familier. Lav samarbejdsprojekter med andre hjemmeundervisere. Del opgaver til print pa sociale medier.`,
        quote: 'Et vaerktoj daekker alle mine boerns klassetrin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Fremmedsprogs- og DSA-laerere',
        subtitle: 'Flersprogede Gratis Skoleopgaver til Laese og Skrive',
        description: `Fremmedsprogslaerere finder ordsoegningsgeneratoren uvurderlig. Skift sprog med et klik. Lav samme ordsoegning pa dansk og engelsk. Perfekt til at sammenligne ord pa forskellige sprog. Fantastisk til gratis skoleopgaver i sprogundervisning.

Brug ordsoegninger til ordforrad oevelser. Nye ord visualiseres med billeder. Eleverne laerer stavning gennem soegning. Kombiner med laese og skrive oevelser pa fremmedsproget. Perfekt til begynderundervisning i nye sprog.

Lav tematiske sprogpakker. Farver pa engelsk med ordsoegning. Tal pa tysk med matematikopgaver. Madord pa fransk kombineret med farvelaegning af mad. Hver uge nyt tema med nye ord i opgaver til print.`,
        quote: 'Den flersprogede support er essentiel for mit tosprogede program.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpaedagoger',
        subtitle: 'Tilpassede Opgaver til Print med Finmotorik Oevelser',
        description: `Specialpaedagoger vaerdsaetter den fulde tilpasningsmulighed. Lav store gitre for elever med synsvanskeligheder. Store bogstaver og tydelige billeder. Kombiner ordsoegninger med farvelaegning for finmotorik oevelser. Hver opgave kan tilpasses individuelle behov.

Visuel laering fungerer fantastisk. Billeder stoetter ordgenkendelse. Elever med laesevanskeligheder finder ordene lettere. Kombiner ordsoegninger med farvelaegning for variation. Multi-sensorisk tilgang til gratis skoleopgaver.

Lav differentierede opgaver til samme klasse. Simple ordsoegninger til nogle elever. Svaeere versioner til andre. Alle arbejder med samme tema. Perfekt til inkluderende undervisning med opgaver til print til alle niveauer.`,
        quote: 'Jeg kan hurtigt tilpasse arbejdsark til hver elevs IEP.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Laerer-Ivaerksaettere',
        subtitle: 'Saelg Arbejdsark og Matematikopgaver pa Teachers Pay Teachers',
        description: `Laerer-ivaerksaettere tjener kr. 4000-40.000 om maneden. Saelg pakker pa Teachers Pay Teachers. Kombiner ordsoegninger med matematikopgaver og farvelaegning. Lav komplette temapakker. Saesonpakker saelger saerligt godt som gratis skoleopgaver til salg.

Lav faerdige pakker til download. 10 ordsoegninger om efterar. 15 matematikopgaver kombineret med ordsoegninger. 20 sider farvelaegning med matchende ordsoegninger. Pakker med gangetabeller som ordsoegninger. Koebere elsker komplette opgaver til print de kan bruge med det samme.

Print-on-demand licensen abner muligheder. Saelg pa Etsy som arbejdsark til print. Lav boeger til Amazon KDP. Kombiner 50 ordsoegninger i en bog. Tilfoej farvelaegning sider mellem opgaverne. Lav specialiserede boeger om matematikopgaver eller gangetabeller.`,
        quote: 'Mit abonnement betalte sig selv i foerste maned!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Ofte Stillede Sporgsmal',
    sectionDescription: 'Her er svar pa de mest almindelige sporgsmal om ordsoegningsgeneratoren. Laer om gratis muligheder, abonnementer og hvordan du bruger opgaver til print i din undervisning.',
    showMoreText: 'Vis flere sporgsmal',
    showLessText: 'Vis faerre',
    items: [
      {
        id: '1',
        question: 'Er ordsoegningsgeneratoren gratis at bruge til gratis skoleopgaver?',
        answer: 'Ordsoegningsgeneratoren er gratis at bruge med vandmaerke pa opgaverne. Kun til privat brug i dit hjem eller klassevaerelse. Du kan lave ubegraensede ordsoegninger gratis. Vandmaerke vises diskret pa hver side af gratis skoleopgaver. Kernepakke abonnement koster kr. 1075 arligt eller kr. 112 manedligt og fjerner vandmaerke fra alle opgaver til print. Inkluderer 10 populaere vaerktoejer og giver kommerciel licens til salg af arbejdsark.',
      },
      {
        id: '2',
        question: 'Kan jeg printe gratis skoleopgaver hjemme pa normal printer?',
        answer: 'Ja, alle ordsoegninger kan printes hjemme. Standard A4 printer fungerer perfekt til gratis skoleopgaver. 300 DPI kvalitet sikrer skarpe udskrifter. PDF format er optimeret til print. Brug almindeligt kopipapir til daglig brug. Tykkere papir til opgaver til print du vil gemme. Farveprinter giver flotteste resultat. Sort-hvid printer virker ogsa fint med gratoneoption.',
      },
      {
        id: '3',
        question: 'Skal jeg have designkendskab til at lave arbejdsark til print?',
        answer: 'Nej, intet designkendskab paekraevet til gratis skoleopgaver. Vaelg tema, klik generer, faerdig. Generatoren laver alt automatisk. Professionelt layout hver gang uden designarbejde. Alle elementer kan redigeres hvis du vil. Traek-og-slip interface er intuitivt. Ingen laeringskurve for opgaver til print. Selv teknologi-uerfarne laerere mestrer det pa minutter.',
      },
      {
        id: '4',
        question: 'Kan jeg bruge gratis skoleopgaver i mit klassevaerelse til eleverne?',
        answer: 'Ja, gratis version kan bruges i klassevaerelset. Print ubegraenset antal kopier til dine elever. Vandmaerke vises pa opgaverne men forstyrrer ikke laesning. Perfekt til daglig undervisningsbrug af gratis skoleopgaver. Abonnement fjerner vandmaerke fra arbejdsark og giver mere professionelt udseende. Elever og foraeldre ser polerede opgaver til print.',
      },
      {
        id: '5',
        question: 'Hvilke sprog er gratis skoleopgaver tilgaengelige pa til laere bogstaver?',
        answer: 'Ordsoegningsgeneratoren understoetter 11 sprog. Dansk, engelsk, tysk, fransk, spansk, italiensk, portugisisk, hollandsk, svensk, norsk, finsk. Perfekt til laere bogstaver pa flere sprog i gratis skoleopgaver. Skift sprog med et klik. Billednavne aendres automatisk. Samme ordsoegning pa forskellige sprog. Fantastisk til sprogundervisning med arbejdsark til print.',
      },
      {
        id: '6',
        question: 'Kan jeg saelge gratis skoleopgaver jeg laver med generatoren?',
        answer: 'Gratis version tillader ikke kommercielt salg. Kun privat og klassevaerelsesbrug af gratis skoleopgaver. Vandmaerkede opgaver kan ikke saelges lovligt. Kernepakke og Fuld Adgang inkluderer kommerciel licens. Saelg dine opgaver til print pa Teachers Pay Teachers. Byg Etsy shop med arbejdsark. Lav Amazon KDP boeger. Ingen ekstra licensomkostninger.',
      },
      {
        id: '7',
        question: 'Hvordan tilpasser jeg gratis skoleopgaver til mine elever i 0. klasse?',
        answer: 'Start med sma gitre til 0. klasse. 5x5 eller 6x6 passer perfekt. Korte simple ord virker bedst. DYR, SOL, HUS, BIL er ideelle til gratis skoleopgaver. Brug billeder i stedet for tekstliste. Boern i 0. klasse genkender billeder foer ord. Farverige illustrationer holder opmaerksomhed. Perfekt til visuel laering med arbejdsark til print.',
      },
      {
        id: '8',
        question: 'Hvor lang tid tager det at lave arbejdsark til print?',
        answer: 'Under 3 minutter fra start til download. Vaelg tema 10 sekunder. Generer 5 sekunder. Rediger 1-2 minutter efter behov. Download 10 sekunder. Faerdige gratis skoleopgaver pa rekordtid. Sammenlign med traditionel metode. Find billeder online 15 minutter. Tjek ophavsret 10 minutter. Design i Word 20 minutter. Lav gitter manuelt 15 minutter. Total 60 minutter for et arbejdsark til print.',
      },
      {
        id: '9',
        question: 'Inkluderer gratis skoleopgaver facitark til laese og skrive oevelser?',
        answer: 'Ja, automatisk facitark genereres. Ord er farvemarkeret i gitteret. Perfekt til hurtig rettelse af gratis skoleopgaver. Download bade opgave og facit samtidig. Facitark viser praecis hvor ord er placeret. Forskellige farver til hvert ord. Let at se diagonale og baglaens ord. Spar tid pa rettelse af arbejdsark til print.',
      },
      {
        id: '10',
        question: 'Kan jeg uploade mine egne billeder til gratis skoleopgaver?',
        answer: 'Ja, ubegraenset billedupload inkluderet. JPEG, PNG, GIF formater understoettes. Kombiner dine billeder med biblioteket. Lav ultra-personlige gratis skoleopgaver til din klasse. Multi-upload funktion sparer tid. Upload 10-20 billeder samtidig. Perfekt til tematiske arbejdsark om klasseprojekt. Brug fotos fra ekskursion i opgaver til print.',
      },
      {
        id: '11',
        question: 'Hvilke aldersgrupper passer gratis skoleopgaver til bedst?',
        answer: 'Boernehaveklassen elsker simple ordsoegninger. 5x5 gitre med 5-6 ord. Billeder i stedet for tekst. Kombiner med farvelaegning og finmotorik oevelser. Perfekt introduktion til laere bogstaver. 0. klasse og 1. klasse er ideelle aldersgrupper. 8x8 til 12x12 gitre. Korte ord de laerer. Kombiner med laese og skrive oevelser. Gratis skoleopgaver stoetter alfabetisering perfekt.',
      },
      {
        id: '12',
        question: 'Kan jeg lave ordsoegninger om specifikke skoleemner med finmotorik oevelser?',
        answer: 'Ja, vaelg hvilke som helst ord. Naturfag ordforrad i ordsoegninger. Historiske personer og begivenheder. Geografiske steder. Matematisk terminologi. Alle emner kan integreres i gratis skoleopgaver. Tematisk integration er noeglen. Vinteruge med vinter-ord. Pasketema med paske-ord. Dyretema med dyrenavne. Kombiner faglig laering med finmotorik oevelser i arbejdsark.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Kernepakke',
    price: 'kr. 1.075',
    priceInterval: '/ar',
    priceSuffix: 'Faktureres arligt',
    benefits: [
      'Ubegraenset arbejdsark oprettelse',
      'Kommerciel licens inkluderet',
      '11 sprog understottet',
      '3000+ tematiske billeder',
      '300 DPI printkvalitet',
      'Facitark inkluderet',
    ],
    ctaText: 'Start Nu',
    guaranteeText: '30 dages pengene-tilbage-garanti',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombiner med Andre Arbejdsark Generatorer',
    sectionDescription: 'Lav komplette laeringspakker ved at kombinere ordsoegninger med disse komplementaere generatorer.',
    ctaTitle: 'Klar til at Lave Fantastiske Arbejdsark?',
    ctaDescription: 'Tilslut dig tusindvis af paedagoger der laver professionelle arbejdsark. Ubegraenset oprettelse, kommerciel licens inkluderet.',
    primaryCtaText: 'Start Gratis Prove',
    secondaryCtaText: 'Se Alle 33 Generatorer',
    items: [
      {
        id: '1',
        slug: 'crossword',
        name: 'Krydsord',
        category: 'Sprog',
        icon: '📝',
        description: 'Komplement ordsoegninger med krydsord der bruger de samme ordforradstemaer til omfattende ordoevelser.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Ordforbytter',
        category: 'Sprog',
        icon: '🔤',
        description: 'Kombiner ordsoegninger med forbyttede ord puslespil for at forstaerke stavning og ordforrad fra flere vinkler.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Gaet Ordet',
        category: 'Sprog',
        icon: '❓',
        description: 'Tilfoej ordgaetteaktiviteter til dine laesecentre sammen med ordsoegningspuslespil for varieret oevelse.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Kryptogram',
        category: 'Logik',
        icon: '🔐',
        description: 'Udfordr eleverne med kodebrydningspuslespil der udvikler logisk taenkning og bogstavmoenstergenkendelse.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Malebilleder',
        category: 'Kunst og Kreativitet',
        icon: '🎨',
        description: 'Belon faerdiggjorte ordsoegninger med tematiske malebilleder der udvikler finmotorik.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Alfabettog',
        category: 'Tidlig Laering',
        icon: '🚂',
        description: 'Balancer ordsoegningsoevelser med bogstavgenkendelsesaktiviteter for omfattende tidlig laesefaerdighed.',
      },
    ],
  },
};

export default wordSearchDaContent;
