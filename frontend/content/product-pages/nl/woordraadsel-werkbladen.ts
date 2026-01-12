import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Guess Worksheets - Dutch Content (Woordraadsel Werkbladen)
 *
 * File: frontend/content/product-pages/nl/woordraadsel-werkbladen.ts
 * URL: /nl/apps/woordraadsel-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/word-guess.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * App Tier: FULL ACCESS (€240/year) - Volledige Toegang
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Oefenbladen gratis
 * 4. Letters leren
 * 5. Schrijven oefenen
 * 6. Veilig leren lezen
 * 7. Fijne motoriek
 * 8. Rekenen werkbladen
 * 9. Kleurplaten
 * 10. Groep 1 2
 */

export const wordGuessNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'woordraadsel-werkbladen',
    appId: 'word-guess',
    title: 'Woordraadsel Werkbladen - Oefenbladen Gratis voor Groep 1 2 en Groep 3',
    description: 'Maak professionele woordraadsel werkbladen met onze werkbladen generator. Uw Volledige Toegang abonnement geeft u onbeperkte toegang tot werkbladen maken zonder kosten per werkblad. Genereer aangepaste werkbladen kleuters en werkbladen groep 3 perfect voor letters leren en schrijven oefenen. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.',
    keywords: 'woordraadsel werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, schrijven oefenen, veilig leren lezen, fijne motoriek, groep 1 2',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/woordraadsel-werkbladen',
  },

  // Hero Section - FULL text from word-guess.md paragraphs 1-4
  hero: {
    title: 'Woordraadsel Werkbladen',
    subtitle: 'Oefenbladen Gratis voor Groep 1 2 en Groep 3',
    description: `Maak professionele woordraadsel werkbladen met onze werkbladen generator. Uw Volledige Toegang abonnement geeft u onbeperkte toegang tot werkbladen maken zonder kosten per werkblad. Genereer aangepaste werkbladen kleuters en werkbladen groep 3 perfect voor letters leren en schrijven oefenen. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.

Onze woordraadsel generator is ideaal voor leerkrachten die oefenbladen gratis willen maken. Elke woordraadsel bevat een afbeelding als aanwijzing en lege vakjes voor elke letter. Kinderen moeten het woord raden op basis van de visuele hint. Perfect voor fijne motoriek ontwikkeling en letters leren.

De generator ondersteunt Nederlands voor groep 1 2 en groep 3. Kies uit duizenden thema-afbeeldingen of upload uw eigen plaatjes. Pas moeilijkheidsgraad aan van geen aanwijzingen tot gemakkelijk voor jonge leerlingen. Ideaal voor rekenen werkbladen, kleurplaten, veilig leren lezen en sommen tot 20 thema's.

Maak 1 tot 10 woordraadsels per werkblad. Elk raadsel schaalt automatisch voor perfecte pasvorm. Download als PDF of JPEG in 300 DPI kwaliteit. Perfect voor printen thuis of op school. Maak vandaag nog uw eerste werkbladen groep 3 en werkbladen kleuters.`,
    previewImageSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
    ctaLabels: {
      tryFree: 'Gratis Uitproberen',
      viewSamples: 'Voorbeelden Bekijken',
    },
    trustBadges: {
      languages: '11 Talen',
      images: '3000+ Afbeeldingen',
      license: 'Commerciële Licentie',
    },
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    floatingStats: {
      time: '3 min',
      action: 'Maken & Downloaden',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/word guess/
  samples: {
    sectionTitle: 'Woordraadsel Voorbeelden',
    sectionDescription: 'Download gratis voorbeeldwerkbladen om onze professionele kwaliteit te ervaren',
    downloadLabel: 'Gratis Voorbeeld Downloaden',
    worksheetLabel: 'Werkblad',
    answerKeyLabel: 'Antwoordblad',
    viewAllLabel: 'Groter bekijken',
    noPdfLabel: 'Alleen voorbeeld',
    freePdfCountLabel: 'gratis downloads',
    badgeText: 'Gratis Voorbeelden',
    downloadingLabel: 'Downloaden...',
    ofLabel: 'van',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/word guess/clue-grid_worksheet.jpeg',
        answerKeySrc: '/samples/english/word guess/clue-grid_answer-key.jpeg',
        altText: 'Woordraadsel werkblad met aanwijzingenraster voor werkbladen groep 3',
        pdfDownloadUrl: '/samples/english/word guess/clue-grid_worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/word guess/landscape.jpeg',
        answerKeySrc: '/samples/english/word guess/landscape answer-key.jpeg',
        altText: 'Woordraadsel werkblad liggend formaat voor werkbladen kleuters',
        pdfDownloadUrl: '/samples/english/word guess/landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/word guess/custom word list.jpeg',
        answerKeySrc: '/samples/english/word guess/custom word list answer-key.jpeg',
        altText: 'Woordraadsel werkblad met eigen woordenlijst voor letters leren',
        pdfDownloadUrl: '/samples/english/word guess/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from word-guess.md feature sections
  features: {
    sectionTitle: 'Woordraadsel Werkbladen Functies - Alles voor Oefenbladen Gratis Maken voor Groep 1 2 en Groep 3',
    sectionDescription: 'Onze woordraadsel generator biedt complete functionaliteit voor werkbladen kleuters en werkbladen groep 3. Maak professionele oefenbladen gratis met alle tools die u nodig heeft. Elke functie is ontworpen voor letters leren, schrijven oefenen en fijne motoriek ontwikkeling. Perfect voor Nederlandse basisscholen groep 1 2 tot groep 3.',
    highlightBadgeText: 'Uitgelicht',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    badgeText: 'Functies',
    trustBadges: {
      allFeatures: 'Alle functies inbegrepen',
      noHiddenFees: 'Geen verborgen kosten',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Maak Werkbladen Groep 3 in 3 Klikken - Snelle Oefenbladen Generator',
        description: `Genereer werkbladen groep 3 en werkbladen kleuters in drie eenvoudige stappen. Kies een thema uit onze bibliotheek met 3000+ afbeeldingen. Klik op genereren en uw werkblad verschijnt direct. Download binnen 3 minuten hoogwaardige oefenbladen gratis.

Geen ontwerpervaring nodig voor letters leren werkbladen. De generator doet al het werk automatisch. Perfect voor drukke leerkrachten groep 1 2 die tijd willen besparen. Ideaal voor veilig leren lezen materiaal en schrijven oefenen activiteiten.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Bewerk Werkbladen Kleuters en Groep 1 2 Volledig - Alle Elementen Aanpasbaar',
        description: `Elk element op uw werkbladen kleuters is volledig bewerkbaar. Sleep afbeeldingen naar nieuwe posities met uw muis. Roteer en schaal elk object precies zoals u wilt. Verwijder elementen die u niet nodig heeft met één klik.

Voeg extra tekst toe voor letters leren oefeningen. Wijzig kleuren voor kleurplaten activiteiten. Pas lettergrootte aan voor verschillende leeftijdsgroepen groep 1 2. Volledige controle over uw oefenbladen gratis maken.

Deze flexibiliteit is essentieel voor werkbladen groep 3 differentiatie. Pas moeilijkheid aan voor verschillende leerlingen. Maak aangepaste versies voor fijne motoriek niveaus. Perfect voor rekenen werkbladen en sommen tot 20 oefeningen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Eigen Afbeeldingen voor Werkbladen Groep 3 - Personaliseer Oefenbladen Gratis',
        description: `Upload uw eigen foto's en afbeeldingen voor werkbladen groep 3. Ondersteunt JPEG, PNG en GIF bestandsformaten. Upload meerdere bestanden tegelijk voor snelle werkbladen kleuters creatie. Combineer bibliotheekafbeeldingen met uw eigen materiaal.

Perfect voor thematische werkbladen groep 1 2 over klasonderwerpen. Voeg foto's van uw leerlingen toe voor gepersonaliseerde oefenbladen. Ideaal voor letters leren met bekende objecten uit de klas. Maak schrijven oefenen interessanter met herkenbare afbeeldingen.

Upload afbeeldingen blijven beschikbaar tijdens uw sessie. Gebruik dezelfde afbeeldingen voor meerdere werkbladen kleuters. Perfect voor het maken van complete oefenbladen gratis pakketten. Ideaal voor veilig leren lezen thema-eenheden.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Werkbladen Kleuters in 11 Talen - Nederlands voor Groep 1 2 en Groep 3',
        description: `Alle werkbladen groep 3 zijn beschikbaar in 11 talen. Nederlandse interface voor leerkrachten in Nederland en België. Woordextractie werkt perfect voor Nederlandse bestandsnamen. Essentieel voor veilig leren lezen en letters leren programma's.

Maak meertalige oefenbladen gratis voor taallessen. Ondersteunt Engels, Duits, Frans, Spaans en meer talen. Perfect voor internationale scholen met werkbladen kleuters. Ideaal voor NT2 lessen en meertalig onderwijs groep 1 2.

De generator begrijpt Nederlandse woordstructuur. Genereert correcte aanwijzingen voor letters leren. Perfect voor schrijven oefenen in het Nederlands. Ondersteunt alle Nederlandse leesmethodes inclusief veilig leren lezen.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie voor Werkbladen Groep 3 - Verkoop Uw Oefenbladen Gratis Gemaakt',
        description: `Volledige Toegang abonnement bevat commerciële print-on-demand licentie. Verkoop werkbladen groep 3 op platforms zoals Etsy. Geen extra kosten bovenop uw €240 per jaar abonnement. Perfect voor leerkrachten met een bijverdienste.

Maak werkbladen kleuters en verkoop als PDF downloads. Upload naar Teachers Pay Teachers voor passief inkomen. Geen attributie vereist op uw oefenbladen gratis gemaakt. Volledige commerciële rechten voor letters leren materiaal.

Veel leerkrachten verdienen €500-€5000 per maand. Verkoop werkbladen groep 1 2 pakketten op verschillende platforms. Combineer met kleurplaten en rekenen werkbladen voor sets. Professionele 300 DPI kwaliteit trekt kopers aan.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Afbeeldingen Bibliotheek voor Werkbladen Kleuters - Thema\'s voor Groep 1 2',
        description: `Toegang tot meer dan 3000 kindvriendelijke afbeeldingen. Georganiseerd in thema's voor gemakkelijk zoeken. Perfect voor werkbladen groep 3 over dieren, voertuigen, eten en meer. Alle afbeeldingen geschikt voor letters leren en schrijven oefenen.

Kies hele thema's voor consistente oefenbladen gratis. Zoek specifieke afbeeldingen met zoekfunctie. Elke afbeelding werkt perfect voor werkbladen kleuters. Ideaal voor veilig leren lezen woordenschat opbouw.

Bibliotheek bevat afbeeldingen voor alle vakken. Rekenen werkbladen met getallen en vormen. Kleurplaten combineren met woordraadsels. Perfect voor sommen tot 20 visuele ondersteuning. Tafels oefenen met thematische afbeeldingen.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit Werkbladen Groep 3 - Perfect voor Printen',
        description: `Download werkbladen groep 3 in hoge resolutie 300 DPI. Perfecte kwaliteit voor printen thuis of op school. Kies tussen PDF en JPEG bestandsformaten. Grijswaarden optie bespaart inkt voor werkbladen kleuters.

Elk werkblad print scherp en duidelijk. Letters leren vakjes zijn precies de juiste grootte. Afbeeldingen printen helder zonder pixelvorming. Professionele kwaliteit oefenbladen gratis voor uw groep 1 2.

PDF formaat behoudt exacte opmaak. JPEG werkt perfect voor online delen. Antwoordsleutels downloaden apart. Ideaal voor schrijven oefenen nakijken en veilig leren lezen assessment.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from word-guess.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Werkbladen Groep 3 en Oefenbladen Gratis in 5 Eenvoudige Stappen',
    sectionDescription: 'Maak professionele werkbladen kleuters en werkbladen groep 3 in minder dan 3 minuten. Deze stapsgewijze handleiding toont hoe u oefenbladen gratis maakt voor letters leren, schrijven oefenen en fijne motoriek. Perfect voor leerkrachten groep 1 2 zonder ontwerpervaring. Volg deze vijf stappen voor hoogwaardige werkbladen.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je werkblad is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Afbeeldingen voor Werkbladen Kleuters - Letters Leren en Veilig Leren Lezen Thema\'s',
        description: `Open de afbeeldingen bibliotheek voor uw werkbladen groep 3. Selecteer een thema zoals dieren, voertuigen of schoolobjecten voor letters leren. Klik op afbeeldingen om ze toe te voegen aan uw selectie. Perfect voor veilig leren lezen woordenschat opbouw.

De bibliotheek bevat thema's voor alle vakken. Kies rekenen werkbladen afbeeldingen met getallen en vormen. Selecteer kleurplaten compatibele afbeeldingen voor schrijven oefenen. Ideaal voor sommen tot 20 visuele ondersteuning en tafels oefenen materiaal.

U kunt ook eigen afbeeldingen uploaden voor werkbladen kleuters. Upload foto's van uw eigen klaslokaal voor oefenbladen gratis personalisatie. Perfect voor thematische groep 1 2 projecten. Combineer bibliotheek en eigen afbeeldingen voor unieke werkbladen groep 3.

Selecteer 1 tot 10 afbeeldingen afhankelijk van hoeveel raadsels u wilt. Elke afbeelding wordt één woordraadsel. De generator extraheert woorden automatisch uit bestandsnamen. Perfect voor letters leren met Nederlandse woorden en fijne motoriek ontwikkeling.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Oefenbladen Gratis - Werkbladen Groep 1 2 Moeilijkheid',
        description: `Kies moeilijkheidsgraad voor uw werkbladen kleuters. Selecteer "geen aanwijzingen" voor uitdagende werkbladen groep 3. Kies "gemakkelijk" voor jonge leerlingen groep 1 2 met meer letter hints.

De normale moeilijkheid toont 1 op 4 letters. Perfect voor gemiddelde leerlingen letters leren. Moeilijke modus toont 1 op 6 letters. Ideaal voor gevorderde schrijven oefenen en veilig leren lezen oefeningen.

Stel lettergrootte in voor verschillende leeftijden. Grotere vakjes voor jonge kinderen fijne motoriek ontwikkeling. Kleinere vakjes voor oudere groep 3 leerlingen. Kies hoofdletters of kleine letters voor letters leren doelen.

Kies paginaformaat voor uw oefenbladen gratis. A4 portret is standaard voor Nederland. Landschap werkt goed voor meerdere raadsels naast elkaar. Perfect voor rekenen werkbladen en kleurplaten combinaties op één pagina.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Werkbladen Groep 3 - Snelle Oefenbladen voor Letters Leren en Schrijven Oefenen',
        description: `Klik op de genereer knop voor uw werkbladen kleuters. Het werkblad verschijnt binnen seconden op uw scherm. Alle raadsels zijn automatisch gepositioneerd en geschaald. Perfect voor snelle oefenbladen gratis productie.

Elk raadsel toont een afbeelding met lege lettervakjes. Vooraf ingevulde letters verschijnen op basis van moeilijkheid. Perfect voor letters leren met visuele ondersteuning. Ideaal voor veilig leren lezen woordherkenning oefeningen.

De generator maakt automatisch een antwoordsleutel. Wissel tussen werkblad en antwoorden tabblad. Beide versies downloaden apart voor uw werkbladen groep 3. Essentieel voor schrijven oefenen nakijken en fijne motoriek assessment.

Raadsels schalen automatisch om op de pagina te passen. Werkt perfect voor 1 tot 10 raadsels per werkblad. Twee-kolommen layout voor landschap met veel raadsels. Optimaal voor werkbladen groep 1 2 en oefenbladen gratis printen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk Werkbladen Kleuters op Canvas - Personaliseer Oefenbladen Gratis voor Groep 1 2',
        description: `Bewerk elk element op uw gegenereerde werkbladen groep 3. Sleep afbeeldingen naar nieuwe posities. Roteer elementen voor interessante layouts. Schaal objecten groter of kleiner naar wens.

Voeg eigen tekst toe voor letters leren instructies. Typ "Schrijf het woord" of "Raad het woord" bovenaan. Pas tekstkleur aan voor kleurplaten thema's. Perfect voor schrijven oefenen richtlijnen op werkbladen kleuters.

Wijzig achtergrondkleur voor visueel aantrekkelijke oefenbladen gratis. Voeg randen toe uit onze thema bibliotheek. Combineer met rekenen werkbladen elementen voor multidisciplinair leren. Ideaal voor veilig leren lezen en fijne motoriek combinaties.

Sleep elementen naar lagen voor perfecte overlap. Breng afbeeldingen naar voren of achteren. Vergrendel elementen die u niet wilt veranderen. Volledige controle over uw werkbladen groep 3 en werkbladen groep 1 2 ontwerp.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Oefenbladen Gratis - Hoogwaardige Werkbladen Groep 3 en Werkbladen Kleuters',
        description: `Download uw werkbladen groep 3 als PDF of JPEG bestand. PDF behoudt perfecte kwaliteit voor printen. JPEG werkt goed voor online delen met ouders. Beide formaten zijn 300 DPI professionele kwaliteit.

Download het werkblad en de antwoordsleutel apart. Geef werkblad aan leerlingen voor letters leren oefening. Bewaar antwoordsleutel voor schrijven oefenen nakijken. Perfect voor veilig leren lezen assessment.

Selecteer grijswaarden optie om inkt te besparen. Werkt perfect voor werkbladen kleuters en oefenbladen gratis printen. Zwart-wit versie ideaal voor kleurplaten activiteiten. Kinderen kunnen afbeeldingen inkleuren na het raadsel.

Gebruik downloadede werkbladen groep 3 direct in de klas. Print meerdere kopieën voor groep 1 2 differentiatie. Combineer met rekenen werkbladen en fijne motoriek oefeningen. Perfect voor sommen tot 20 en tafels oefenen thematische pakketten.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section - FULL text from word-guess.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Kleuters en Oefenbladen Gratis voor Elke Behoefte',
    sectionDescription: 'Onze woordraadsel generator is ideaal voor verschillende gebruikers. Leerkrachten groep 1 2 en groep 3 maken werkbladen voor dagelijks gebruik. Ouders creëren oefenbladen gratis voor thuisonderwijs. Specialisten ontwerpen werkbladen kleuters voor specifieke leerdoelen. Perfect voor letters leren, schrijven oefenen en fijne motoriek ontwikkeling.',
    badgeText: 'Gebruikssituaties',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters voor Letters Leren en Schrijven Oefenen',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Leerkrachten groep 1 2 gebruiken onze generator dagelijks. Maak werkbladen kleuters voor veilig leren lezen lessen. Creëer oefenbladen gratis voor letters leren centra. Perfect voor fijne motoriek stations en schrijven oefenen hoeken.

Combineer woordraadsels met kleurplaten voor differentiatie. Maak gemakkelijke versies voor zwakkere leerlingen groep 1 2. Moeilijke versies voor gevorderde kinderen. Ideaal voor werkbladen groep 3 overgang voorbereiden.

Gebruik thematische afbeeldingen voor woordenschat opbouw. Maak seizoensgebonden oefenbladen gratis voor elk thema. Perfect voor veilig leren lezen woordenlijsten oefening. Combineer met rekenen werkbladen voor geïntegreerde thema's.`,
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Rekenen Werkbladen en Tafels Oefenen Combinaties',
        subtitle: 'Werkbladen groep 3 en multidisciplinair',
        description: `Leerkrachten groep 3 maken multidisciplinaire werkbladen. Combineer woordraadsels met rekenen werkbladen voor getallen. Integreer tafels oefenen in woordenschat lessen. Perfect voor sommen tot 20 visuele ondersteuning.

Maak werkbladen groep 3 voor spelling en rekenen samen. Gebruik afbeeldingen met getallen voor wiskundige woordenschat. Ideaal voor letters leren en rekenen werkbladen integratie. Perfect voor fijne motoriek en schrijven oefenen combinaties.

Creëer weekpakketten met verschillende werkbladen kleuters types. Combineer met kleurplaten voor vrijdagmiddagen. Maak oefenbladen gratis voor huiswerk of extra oefening. Perfect voor veilig leren lezen en tafels oefenen thuis.`,
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijzers - Oefenbladen Gratis voor Groep 1 2 en Fijne Motoriek Thuis',
        subtitle: 'Thuisonderwijs en personalisatie',
        description: `Thuisonderwijzers maken gepersonaliseerde werkbladen kleuters. Creëer oefenbladen gratis op basis van kinderinteresses. Perfect voor letters leren in eigen tempo. Ideaal voor schrijven oefenen zonder klasdruk.

Gebruik eigen foto's voor herkenbare werkbladen groep 3. Upload afbeeldingen van huisdieren of speelgoed. Maak woordraadsels over familie en vrienden. Perfect voor veilig leren lezen met bekende woorden.

Combineer met rekenen werkbladen voor complete lessen. Maak kleurplaten activiteiten voor pauzes. Integreer tafels oefenen en sommen tot 20 natuurlijk. Ideaal voor fijne motoriek ontwikkeling gedurende de dag.`,
      },
      {
        id: '4',
        icon: '🌐',
        title: 'NT2 Leerkrachten - Werkbladen Kleuters voor Meertalige Groep 1 2 Leerlingen',
        subtitle: 'Meertalig onderwijs en NT2',
        description: `NT2 leerkrachten gebruiken de 11-talige ondersteuning. Maak werkbladen kleuters in Nederlands en moedertaal. Perfect voor letters leren met visuele context. Ideaal voor schrijven oefenen zonder taalbarrière.

Visuele aanwijzingen helpen bij woordbegrip. Maak oefenbladen gratis voor basiswoordenschat. Perfect voor veilig leren lezen voor anderstaligen. Combineer met kleurplaten voor culturele thema's.

Creëer werkbladen groep 3 voor geleidelijke progressie. Begin met eenvoudige woorden voor groep 1 2. Verhoog moeilijkheid naarmate taalvaardigheid groeit. Perfect voor fijne motoriek en rekenen werkbladen in het Nederlands.`,
      },
      {
        id: '5',
        icon: '🎯',
        title: 'Remedial Teachers - Werkbladen Groep 3 voor Fijne Motoriek en Schrijven Oefenen Ondersteuning',
        subtitle: 'Speciaal onderwijs en differentiatie',
        description: `Remedial teachers maken aangepaste werkbladen kleuters. Grotere lettervakjes voor fijne motoriek uitdagingen. Minder raadsels per pagina voor concentratieproblemen. Perfect voor letters leren in kleine stappen.

Pas moeilijkheidsgraad aan voor individuele behoeften. Maak oefenbladen gratis met veel visuele ondersteuning. Perfect voor veilig leren lezen interventies. Ideaal voor schrijven oefenen met succeservaringen.

Combineer met kleurplaten voor motivatie. Gebruik thema's die interesseren voor betrokkenheid. Maak werkbladen groep 3 voor specifieke lettergrepen. Perfect voor rekenen werkbladen en tafels oefenen aanpassing.`,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Leerkrachten met Bijverdienste - Verkoop Werkbladen Kleuters en Oefenbladen Gratis Gemaakt',
        subtitle: 'Commercieel gebruik en passief inkomen',
        description: `Leerkrachten verkopen werkbladen groep 3 online. Upload oefenbladen gratis gemaakt naar Teachers Pay Teachers. Verkoop werkbladen kleuters pakketten op Etsy. Perfect voor passief inkomen van letters leren materiaal.

Maak themapakketten met verschillende werkbladen types. Combineer woordraadsels met rekenen werkbladen en kleurplaten. Voeg tafels oefenen en sommen tot 20 werkbladen toe. Ideaal voor schrijven oefenen en veilig leren lezen bundels.

Commerciële licentie maakt verkopen mogelijk. Geen extra kosten voor fijne motoriek werkbladen verkoop. Verdien €500-€5000 per maand met werkbladen groep 1 2. Perfect voor professionele oefenbladen gratis ontwerp en verkoop.`,
      },
    ],
  },

  // FAQ Section - FULL questions and answers
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Werkbladen Kleuters en Oefenbladen Gratis voor Letters Leren',
    sectionDescription: 'Leerkrachten stellen vaak vragen over onze werkbladen generator. Deze FAQ beantwoordt vragen over werkbladen groep 3, werkbladen kleuters en oefenbladen gratis maken. Perfect voor letters leren, schrijven oefenen, fijne motoriek, rekenen werkbladen en kleurplaten informatie.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig afrekenen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [
      {
        id: '1',
        question: 'Is Deze Werkbladen Kleuters Generator Echt Gratis voor Oefenbladen Maken?',
        answer: `De woordraadsel generator vereist Volledige Toegang abonnement voor €240 per jaar of €25 per maand. Uw abonnement geeft onbeperkte werkbladen groep 3 en werkbladen kleuters creatie. Geen kosten per werkblad voor oefenbladen gratis maken. Perfect voor letters leren, schrijven oefenen en fijne motoriek materiaal.

Volledige Toegang bevat alle 33 werkbladen generators. Maak rekenen werkbladen, kleurplaten, tafels oefenen en sommen tot 20 werkbladen onbeperkt. Perfect voor veilig leren lezen en groep 1 2 materiaal. Commerciële licentie, 11 talen ondersteuning en 300 DPI kwaliteit inbegrepen.`,
      },
      {
        id: '2',
        question: 'Kan Ik Werkbladen Groep 3 en Kleurplaten Thuis Printen voor Letters Leren?',
        answer: `Ja, download werkbladen kleuters als PDF of JPEG bestanden. Print thuis op normale printer voor oefenbladen gratis gebruik. Perfect voor werkbladen groep 3 thuisonderwijs. Ideaal voor letters leren, schrijven oefenen en fijne motoriek oefeningen thuis.

Grijswaarden optie bespaart inkt voor werkbladen kleuters. Zwart-wit versies werken perfect als kleurplaten. Kinderen kunnen afbeeldingen inkleuren na letters leren raadsels. Ideaal voor veilig leren lezen en fijne motoriek combinaties.

PDF formaat behoudt kwaliteit op alle printers. Werkt perfect voor werkbladen groep 3 en rekenen werkbladen. Print meerdere kopieën voor klasgebruik. Ideaal voor tafels oefenen en sommen tot 20 oefeningen thuis.`,
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpervaring Nodig voor Werkbladen Kleuters en Rekenen Werkbladen Maken?',
        answer: `Nee, geen ontwerpervaring nodig voor werkbladen groep 3 maken. Generator doet al het werk automatisch. Perfect voor leerkrachten zonder grafische vaardigheden. Ideaal voor snelle oefenbladen gratis creatie.

Kies afbeeldingen en klik genereren voor werkbladen kleuters. Alles positioneert automatisch perfect. Werkt uitstekend voor letters leren, schrijven oefenen en kleurplaten. Perfect voor rekenen werkbladen, tafels oefenen en sommen tot 20 materiaal.

Canvas bewerking is intuïtief voor werkbladen groep 3 aanpassing. Sleep elementen met muis voor werkbladen kleuters personalisatie. Perfect voor veilig leren lezen en fijne motoriek werkbladen. Geen speciale software kennis vereist.`,
      },
      {
        id: '4',
        question: 'Kan Ik Werkbladen Groep 3 en Oefenbladen Gratis in Mijn Klas Gebruiken voor Veilig Leren Lezen?',
        answer: `Volledige Toegang abonnement bevat onbeperkt klasgebruik. Gebruik werkbladen kleuters met alle leerlingen groep 1 2. Print onbeperkte kopieën voor oefenbladen gratis distributie. Perfect voor letters leren, schrijven oefenen en fijne motoriek lessen.

Deel werkbladen groep 3 digitaal of fysiek. Email PDF bestanden naar ouders voor thuiswerk. Perfect voor rekenen werkbladen en kleurplaten naar huis. Ideaal voor tafels oefenen, sommen tot 20 en veilig leren lezen oefeningen.`,
      },
      {
        id: '5',
        question: 'Welke Talen Zijn Beschikbaar voor Werkbladen Kleuters en Letters Leren Oefenbladen Gratis?',
        answer: `Generator ondersteunt 11 talen voor werkbladen groep 3. Nederlands interface perfect voor Nederlandse leerkrachten. Maak werkbladen kleuters in Engels, Duits, Frans, Spaans en meer. Ideaal voor oefenbladen gratis meertalig onderwijs.

Taal selectie beïnvloedt woordextractie voor letters leren. Perfect voor veilig leren lezen in verschillende talen. Maak rekenen werkbladen met meertalige wiskundetermen. Ideaal voor kleurplaten, schrijven oefenen en fijne motoriek in moedertaal.`,
      },
      {
        id: '6',
        question: 'Kan Ik Werkbladen Groep 3 Verkopen die Ik Maak met Rekenen Werkbladen en Kleurplaten Generator?',
        answer: `Ja, Volledige Toegang abonnement bevat commerciële licentie. Verkoop werkbladen kleuters zonder extra kosten. Upload oefenbladen gratis gemaakt naar Teachers Pay Teachers en Etsy. Perfect voor letters leren en schrijven oefenen materiaal verkoop.

Maak themapakketten met werkbladen groep 3 en kleurplaten. Combineer met rekenen werkbladen, tafels oefenen en sommen tot 20 sets. Perfect voor veilig leren lezen bundels verkoop. Verdien passief inkomen met fijne motoriek werkbladen.`,
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Werkbladen Kleuters Aan voor Letters Leren en Schrijven Oefenen Differentiatie?',
        answer: `Bewerk alle elementen op werkbladen groep 3 canvas. Sleep afbeeldingen voor werkbladen kleuters herpositionering. Voeg tekst toe voor oefenbladen gratis instructies. Perfect voor letters leren en schrijven oefenen aanpassing.

Wijzig moeilijkheidsgraad voor verschillende niveaus. Maak gemakkelijke versies voor zwakkere groep 1 2 leerlingen. Moeilijke versies voor gevorderde kinderen. Perfect voor veilig leren lezen differentiatie en fijne motoriek niveaus.

Pas kleuren aan voor kleurplaten thema's. Combineer met rekenen werkbladen elementen. Perfect voor tafels oefenen en sommen tot 20 visuele aanpassing. Ideaal voor werkbladen groep 3 personalisatie.`,
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijden Werken Werkbladen Groep 3 en Kleurplaten het Beste voor Fijne Motoriek?',
        answer: `Werkbladen kleuters werken perfect voor 4-9 jarigen. Groep 1 2 kinderen oefenen letters leren met visuele ondersteuning. Werkbladen groep 3 leerlingen ontwikkelen schrijven oefenen vaardigheden. Ideaal voor oefenbladen gratis alle basisschool leeftijden.

Pas vakjesgrootte aan voor fijne motoriek niveaus. Grotere letters voor jonge kleuters. Kleinere letters voor oudere groep 3 kinderen. Perfect voor veilig leren lezen progressie.

Combineer met kleurplaten voor motivatie. Gebruik rekenen werkbladen voor wiskunde integratie. Perfect voor tafels oefenen en sommen tot 20 alle leeftijden. Ideaal voor letters leren en schrijven oefenen ontwikkeling.`,
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Werkbladen Kleuters en Rekenen Werkbladen Personalisatie?',
        answer: `Ja, upload uw eigen foto's voor werkbladen groep 3. Ondersteunt meerdere bestanden tegelijk voor werkbladen kleuters. Combineer met bibliotheek afbeeldingen voor oefenbladen gratis creatie. Perfect voor letters leren en schrijven oefenen personalisatie.

Upload klassenfoto's voor herkenbare veilig leren lezen materiaal. Voeg getallen afbeeldingen toe voor rekenen werkbladen. Perfect voor thematische kleurplaten en fijne motoriek oefeningen. Ideaal voor tafels oefenen en sommen tot 20 visuele ondersteuning.`,
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om Werkbladen Groep 3 te Maken voor Letters Leren en Veilig Leren Lezen?',
        answer: `Maak werkbladen kleuters in minder dan 3 minuten. Selecteer afbeeldingen, pas instellingen aan en genereer. Download oefenbladen gratis direct als PDF. Perfect voor snelle werkbladen groep 3 productie.

Handmatige creatie duurt 30-60 minuten per werkblad. Generator bespaart enorme tijd voor letters leren materiaal. Perfect voor drukke leerkrachten schrijven oefenen behoeften. Ideaal voor fijne motoriek, rekenen werkbladen en kleurplaten snelle productie.`,
      },
      {
        id: '11',
        question: 'Bevatten Werkbladen Kleuters Antwoordsleutels voor Letters Leren en Schrijven Oefenen Nakijken?',
        answer: `Ja, generator maakt automatisch antwoordsleutels voor werkbladen groep 3. Download werkblad en antwoorden apart. Perfect voor werkbladen kleuters nakijken. Ideaal voor oefenbladen gratis assessment.

Antwoordsleutels tonen alle letters ingevuld. Perfect voor letters leren verificatie en schrijven oefenen beoordeling. Ideaal voor veilig leren lezen progressie volgen. Werkt uitstekend voor fijne motoriek en rekenen werkbladen controle.`,
      },
      {
        id: '12',
        question: 'Kan Ik Werkbladen Groep 3 Maken over Specifieke Vakken zoals Rekenen Werkbladen en Tafels Oefenen?',
        answer: `Ja, maak thematische werkbladen kleuters voor alle vakken. Gebruik getallen afbeeldingen voor rekenen werkbladen en sommen tot 20. Perfect voor tafels oefenen visuele ondersteuning. Ideaal voor oefenbladen gratis wiskundewoordenschat.

Maak letters leren werkbladen voor taal. Creëer schrijven oefenen materiaal voor Nederlands. Perfect voor veilig leren lezen thematische eenheden. Combineer met kleurplaten voor geïntegreerde werkbladen groep 3 en fijne motoriek lessen.`,
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    ctaText: 'Nu Starten',
    benefits: [
      'Alle 33 werkblad generatoren',
      'Onbeperkte downloads',
      '11 talen ondersteuning',
      'Commerciële licentie inbegrepen',
      '300 DPI professionele kwaliteit',
      '3000+ afbeeldingen bibliotheek',
    ],
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Combineer Woordraadsels met Rekenen Werkbladen, Kleurplaten en Oefenbladen Gratis - Complete Leerpakketten voor Groep 1 2',
    sectionDescription: 'Ons platform biedt 33 gratis werkbladen generators. Combineer woordraadsels met rekenen werkbladen, kleurplaten en schrijven oefenen materiaal. Perfect voor complete werkbladen kleuters pakketten. Ideaal voor letters leren, veilig leren lezen, fijne motoriek, tafels oefenen en sommen tot 20 geïntegreerde oefenbladen gratis.',
    ctaTitle: 'Klaar om Professionele Werkbladen te Maken?',
    ctaDescription: 'Sluit u aan bij duizenden leerkrachten die professionele werkbladen maken met LessonCraft Studio.',
    primaryCtaText: 'Gratis Uitproberen',
    secondaryCtaText: 'Bekijk Alle 33 Apps',
    badgeText: 'Werkt Uitstekend Met',
    exploreText: 'Alle apps bekijken',
    trustBadges: {
      guarantee: '30 dagen garantie',
      securePayment: 'Veilig betalen',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        slug: 'rekenen-werkbladen',
        name: 'Rekenen Werkbladen',
        description: 'Combineer woordraadsels met rekenen werkbladen voor wiskundewoordenschat. Maak raadsels over getallen voor tafels oefenen ondersteuning. Perfect voor sommen tot 20 visuele leren. Ideaal voor werkbladen kleuters wiskunde integratie.',
        icon: '➕',
        category: 'Wiskunde',
      },
      {
        id: '2',
        slug: 'kleurplaten-werkbladen',
        name: 'Kleurplaten',
        description: 'Combineer woordraadsels met kleurplaten voor fijne motoriek ontwikkeling. Kinderen kleuren afbeeldingen na letters leren raadsels. Perfect voor schrijven oefenen en fijne motoriek integratie. Ideaal voor werkbladen kleuters differentiatie.',
        icon: '🎨',
        category: 'Creatief',
      },
      {
        id: '3',
        slug: 'cryptogram-werkbladen',
        name: 'Cryptogram Werkbladen',
        description: 'Combineer woordraadsels met cryptogrammen voor volledige puzzeloefening. Beide puzzeltypes ontwikkelen probleemoplossend vermogen. Perfect voor werkbladen groep 3 die van raadsels houden. Combineer voor complete leerpakketten.',
        icon: '🔐',
        category: 'Puzzels',
      },
      {
        id: '4',
        slug: 'kruiswoordpuzzel-werkbladen',
        name: 'Kruiswoordpuzzel',
        description: 'Bundel woordraadsels met kruiswoordpuzzels voor gevarieerde woordenschat oefening. Beide activiteiten versterken spelling en woordherkenning. Perfect voor letters leren en veilig leren lezen programma\'s. Maak complete taalpakketten.',
        icon: '📝',
        category: 'Taal',
      },
      {
        id: '5',
        slug: 'alfabet-trein-werkbladen',
        name: 'Alfabet Werkbladen',
        description: 'Combineer woordraadsels met alfabetwerkbladen voor volledige letters leren programma\'s. Woordraadsels leren letter herkenning. Tracing werkbladen ontwikkelen schrijfvaardigheden. Samen bouwen ze complete alfabetisering voor werkbladen kleuters groep 1 2.',
        icon: '🔤',
        category: 'Alfabet',
      },
    ],
  },
};

export default wordGuessNlContent;
