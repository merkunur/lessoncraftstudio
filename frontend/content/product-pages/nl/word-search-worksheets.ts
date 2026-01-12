import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/word-search-worksheets.ts
 * URL: /nl/apps/woordzoeker-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Rekenen werkbladen
 * 4. Kleurplaten
 * 5. Letters leren / Schrijven oefenen
 * 6. Oefenbladen gratis
 * 7. Tafels oefenen
 * 8. Veilig leren lezen
 * 9. Fijne motoriek
 * 10. Sommen tot 20
 */

export const wordSearchNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'woordzoeker-werkbladen',
    appId: 'word-search',
    title: 'Woordzoeker Generator - Gratis Oefenbladen voor Werkbladen Groep 3 en Kleuters',
    description: 'Maak professionele woordzoekers voor het basisonderwijs. Deze gratis woordzoeker generator is perfect voor werkbladen groep 3, werkbladen kleuters en oefenbladen. Ontwerp werkbladen die kinderen uitdagen en vermaken. De woordzoeker maker werkt volledig in het Nederlands.',
    keywords: 'woordzoeker generator, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, veilig leren lezen, rekenen werkbladen, kleurplaten, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/woordzoeker-werkbladen',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Woordzoeker Generator',
    subtitle: 'Gratis Oefenbladen voor Werkbladen Groep 3 en Kleuters',
    description: `Maak in een paar klikken professionele woordzoekers voor je leerlingen. Deze gratis woordzoeker generator is perfect voor leerkrachten in het basisonderwijs. Ontwerp werkbladen groep 3 die kinderen uitdagen en vermaken tegelijk.

De woordzoeker maker werkt volledig in het Nederlands. Je kiest een thema of uploadt eigen afbeeldingen. Binnen drie minuten heb je een afdrukbare puzzel klaar. Ideaal voor werkbladen kleuters en groep 1 2 die net beginnen met letters leren.

Traditionele werkbladen kosten veel tijd om te maken. Met deze tool bespaar je uren werk. De generator maakt automatisch een puzzelrooster met de woorden die jij kiest. Je downloadt het resultaat als PDF of afbeelding.`,
    previewImageSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Woordzoeker Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/wordsearch/wordsearch portrait.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch portrait answer_key.jpeg',
        altText: 'Woordzoeker portret met thematische afbeeldingen voor werkbladen kleuters en woordenschat',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
        answerKeySrc: '/samples/english/wordsearch/wordsearch landscape answer_key.jpeg',
        altText: 'Woordzoeker werkblad landschap met kleurrijke hints voor werkbladen groep 3',
        pdfDownloadUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/wordsearch/custom word list.jpeg',
        answerKeySrc: '/samples/english/wordsearch/custom word list answer_key.jpeg',
        altText: 'Woordzoeker met eigen woordenlijst voor spelling oefeningen en oefenbladen',
        pdfDownloadUrl: '/samples/english/wordsearch/custom word list.pdf',
      },
    ],
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Functies van de Woordzoeker Generator - Werkbladen Groep 3 en Oefenbladen Gratis',
    sectionDescription: 'Deze woordzoeker maker biedt alle functies die je nodig hebt. Van simpele puzzels voor kleuters tot uitdagende woordzoekers voor groep 5. Ontdek hoe je in enkele minuten professionele werkbladen maakt.',
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
        title: 'Werkbladen Kleuters Maken in 3 Klikken - Snel en Eenvoudig Letters Leren',
        description: `Het maken van een woordzoeker kost geen technische kennis. Je selecteert een thema uit de bibliotheek. De generator doet de rest automatisch. Binnen drie klikken heb je een complete puzzel.

Kies bijvoorbeeld het thema "Dieren" of "Fruit". De tool selecteert passende afbeeldingen met Nederlandse woorden. Perfect voor werkbladen kleuters die net beginnen met letters leren. De woorden zijn afgestemd op het niveau van groep 1 2.

Je bepaalt zelf de moeilijkheidsgraad. Stel het rooster in op 8x8 voor beginners. Of kies 15x15 voor gevorderde leerlingen in groep 3. Diagonale en omgekeerde woorden maken de puzzel extra uitdagend.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Volledig Bewerkbaar Canvas voor Rekenen Werkbladen en Woordzoekers',
        description: `Na het genereren kun je alles aanpassen op het canvas. Sleep afbeeldingen naar een andere positie. Vergroot of verklein elementen met je muis. Draai objecten of verwijder ze volledig.

Deze flexibiliteit maakt de tool perfect voor gecombineerde werkbladen. Voeg een titel toe bovenaan je puzzel. Plaats instructies voor de leerlingen. Of combineer de woordzoeker met rekenen werkbladen elementen.

Je kunt ook eigen teksten toevoegen. Kies uit zeven verschillende lettertypen. Pas de kleur en grootte aan. Voeg een kader toe rond belangrijke woorden. Alles is volledig aanpasbaar.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden voor Werkbladen Groep 3 met Fijne Motoriek Oefeningen',
        description: `Wil je een gepersonaliseerde woordzoeker maken? Upload je eigen afbeeldingen. De tool accepteert JPG, PNG en GIF bestanden. Je kunt meerdere bestanden tegelijk uploaden.

Dit is ideaal voor thematische werkbladen groep 3. Gebruik foto's van een schooluitje. Of maak een puzzel met namen van klasgenoten. Kinderen vinden het extra leuk om bekende gezichten te zoeken.

De uploadfunctie werkt ook voor fijne motoriek oefeningen. Upload afbeeldingen van schrijfpatronen. Of voeg plaatjes toe die passen bij je huidige lesonderwerp. De mogelijkheden zijn eindeloos.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Talen Ondersteuning - Veilig Leren Lezen in het Nederlands en Meer',
        description: `De woordzoeker generator ondersteunt elf talen. Nederlands staat natuurlijk voorop. Maar je maakt ook puzzels in het Duits, Frans, Engels of Spaans. Ideaal voor meertalig onderwijs.

Voor Nederlandse basisscholen is de tool perfect afgestemd op Veilig leren lezen. De woorden in de bibliotheek passen bij de woordenschat van groep 3. Kinderen herkennen de woorden uit hun leesmethode.

De interface is volledig in het Nederlands beschikbaar. Alle knoppen en menu's zijn vertaald. Ook de thema-namen en afbeeldingslabels zijn Nederlands. Zo werk je altijd in je eigen taal.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '📐',
        title: 'Aanpasbare Rastergroottes - Oefenbladen Gratis voor Alle Niveaus',
        description: `Kies de roostergrootte van 5x5 tot 30x30. Kleinere roosters voor werkbladen kleuters. Grotere roosters voor gevorderde leerlingen. De moeilijkheidsgraad past zich automatisch aan.

Diagonale woorden kunnen aan of uit worden gezet. Omgekeerde woorden maken de puzzel moeilijker. Woorden lopen dan ook van rechts naar links. Of van onder naar boven. Gebruik dit voor rekenen werkbladen combinaties met gevorderde leerlingen.

Selecteer ook je paginaformaat. Kies A4 staand voor standaard werkbladen. Of A4 liggend voor puzzels met grote roosters. Letter-formaat werkt ook voor internationale standaarden.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen - Van Sommen tot 20 tot Letters Leren Thema\'s',
        description: `De beeldbibliotheek bevat meer dan drieduizend afbeeldingen. Ze zijn georganiseerd in thema's. Van dieren en voertuigen tot seizoenen en feestdagen. Er is altijd iets dat past bij je les.

Voor rekenlessen vind je afbeeldingen die passen bij sommen tot 20. Appels om te tellen. Blokken om op te tellen. Vingers voor aftrekken. Alles wat je nodig hebt voor rekenen werkbladen.

De afbeeldingen voor letters leren zijn speciaal geselecteerd. Elk plaatje heeft een duidelijke naam. Kinderen herkennen het woord direct. Dit ondersteunt het leesproces in groep 3.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit voor Schrijven Oefenen en Tafels Oefenen Werkbladen',
        description: `Alle werkbladen worden geëxporteerd in 300 DPI. Dit is de standaard voor professioneel drukwerk. Je puzzels zien er scherp en helder uit op papier.

Deze kwaliteit is belangrijk voor schrijven oefenen activiteiten. De letters in het rooster zijn goed leesbaar. Kinderen kunnen de woorden netjes omcirkelen. Ook fijne details blijven zichtbaar.

Je downloadt werkbladen als PDF of JPEG. De PDF-optie is ideaal voor printen. JPEG werkt goed voor digitaal delen. Er is ook een grijswaarden optie om inkt te besparen.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Woordzoekers - Werkbladen Groep 3 in 5 Eenvoudige Stappen',
    sectionDescription: 'Het maken van een woordzoeker duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist.',
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
        title: 'Stap 1: Kies Je Inhoud voor Oefenbladen Gratis - Thema of Eigen Woorden voor Letters Leren',
        description: `Begin met het selecteren van je inhoud. Je hebt drie opties. Kies een thema uit de bibliotheek. Selecteer individuele afbeeldingen. Of typ je eigen woordenlijst.

De thema-optie werkt het snelst voor oefenbladen gratis. Selecteer bijvoorbeeld "Boerderij" of "School". De generator kiest automatisch passende woorden. Ideaal voor snelle werkbladen groep 3.

Voor letters leren activiteiten werkt de individuele selectie goed. Zoek afbeeldingen die beginnen met dezelfde letter. Maak een puzzel met alleen B-woorden. Of focus op de letters die je deze week behandelt.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Rekenen Werkbladen en Fijne Motoriek Oefeningen',
        description: `Nu stel je de puzzelinstellingen in. Begin met de roostergrootte. Kies het aantal rijen en kolommen. Van 5x5 voor kleuters tot 30x30 voor gevorderden.

Voor werkbladen kleuters adviseren we een rooster van 8x8. De letters zijn dan groot genoeg. Kinderen kunnen ze makkelijk omcirkelen. Perfect voor fijne motoriek oefeningen.

Groep 3 leerlingen kunnen een 10x10 of 12x12 rooster aan. Dit biedt meer uitdaging. Maar blijft overzichtelijk voor kinderen die net leren lezen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Werkblad met Kleurplaten Elementen en Sommen tot 20 Thema\'s',
        description: `Klik op de knop "Genereren" om je puzzel te maken. De woordzoeker verschijnt direct op het canvas. Je ziet het rooster met alle letters. Daaronder staan de woorden om te zoeken.

De woorden worden willekeurig in het rooster geplaatst. Lege vakjes worden gevuld met andere letters. Het resultaat is een unieke puzzel. Elke keer dat je genereert krijg je een nieuwe variant.

De generator maakt ook automatisch een antwoordblad. Hierop zijn alle woorden gemarkeerd. Perfect voor zelfcorrectie door leerlingen. Of voor snelle controle door de leerkracht.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Werkbladen Groep 3 Personaliseren met Schrijven Oefenen',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt als een eenvoudig tekenprogramma. Sleep elementen met je muis. Vergroot of verklein ze naar wens.

Voeg een titel toe aan je werkbladen groep 3. Typ bijvoorbeeld "Woordzoeker Week 5" bovenaan. Kies een leuk lettertype. Pas de kleur aan bij je thema.

De bewerkingsmogelijkheden zijn eindeloos. Voeg extra afbeeldingen toe uit de bibliotheek. Sleep ze naar een lege plek op het werkblad. Maak ruimte voor schrijven oefenen onder de puzzel.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Oefenbladen Gratis als PDF met Tafels Oefenen Combinaties',
        description: `Je werkblad is klaar. Nu download je het in hoge kwaliteit. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen.

Klik op "Download" en selecteer "Werkblad (PDF)". Het bestand wordt opgeslagen op je computer. Open het en print direct. De kwaliteit is 300 DPI voor scherpe resultaten.

De gratis versie bevat een klein watermerk. Dit is niet storend voor klassikaal gebruik. Voor werkbladen zonder watermerk kies je een betaald abonnement.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Kleuters tot Groep 5 voor Iedereen',
    sectionDescription: 'De woordzoeker generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters met Fijne Motoriek en Letters Leren',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Werk je met kleuters in groep 1 of 2? Dan ken je de uitdaging van leuke leeractiviteiten. Werkbladen kleuters moeten speels zijn. Maar ook educatief waardevol.

Woordzoekers zijn perfect voor fijne motoriek ontwikkeling. Kinderen oefenen het vasthouden van een potlood. Ze leren nauwkeurig kijken en omcirkelen. Dit zijn basisvaardigheden voor later schrijven.

Combineer woordzoekers met kleurplaten voor een complete activiteit. Kinderen zoeken eerst de woorden. Daarna kleuren ze de bijbehorende plaatjes. Zo blijven ze langer geconcentreerd bezig.`,
        quote: 'Mijn kleuters vinden de kleurrijke woordzoekers geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Veilig Leren Lezen Ondersteunen met Oefenbladen Gratis',
        subtitle: 'Werkbladen groep 3 en Veilig leren lezen',
        description: `Groep 3 is het jaar van leren lezen. Methodes zoals Veilig leren lezen vormen de basis. Woordzoekers zijn een perfecte aanvulling op deze methodes.

Maak puzzels met woorden uit de actuele kern. Kinderen herkennen de woorden uit hun leesboek. Dit versterkt de woordherkenning. En maakt lezen leuker.

De oefenbladen gratis mogelijkheid is ideaal voor extra oefening. Print puzzels voor leerlingen die meer uitdaging nodig hebben. Of maak makkelijkere varianten voor kinderen die extra ondersteuning nodig hebben.`,
        quote: 'Woordzoekers passen perfect bij onze leesmethode.',
      },
      {
        id: '3',
        icon: '🧮',
        title: 'Leerkrachten Groep 4 en 5 - Tafels Oefenen en Sommen tot 20 met Woordpuzzels',
        subtitle: 'Rekenen werkbladen en tafels oefenen',
        description: `In groep 4 en 5 worden de puzzels uitdagender. Grotere roosters met meer woorden. Diagonale en omgekeerde woordrichtingen. Kinderen vinden dit een leuke uitdaging.

Combineer woordzoekers met tafels oefenen thema's. Maak een puzzel met woorden als "keer", "delen" en "vermenigvuldigen". Kinderen leren de rekenwoordenschat terwijl ze puzzelen.

Voor sommen tot 20 integratie kies je getalswoorden. "Twaalf", "vijftien" en "achttien" in een woordzoeker. Dit versterkt de koppeling tussen woord en getal.`,
        quote: 'Rekenen wordt leuker met puzzelelementen erbij.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Ouders met Thuisonderwijs - Kleurplaten en Werkbladen Groep 3 voor Thuis',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Geef je thuisonderwijs? Dan weet je hoe belangrijk variatie is. Dezelfde werkbladen worden snel saai. De woordzoeker generator biedt eindeloze mogelijkheden.

Maak werkbladen groep 3 die aansluiten bij jullie thema. Behandel je deze week de boerderij? Genereer een woordzoeker met boerderijwoorden. Kinderen leren spelenderwijs.

Combineer puzzels met kleurplaten voor een creatieve middag. De woordzoeker houdt het educatieve element. Het kleuren voegt ontspanning toe. Een perfecte balans.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Remedial Teachers - Veilig Leren Lezen Extra Oefening met Schrijven Oefenen',
        subtitle: 'Aangepaste werkbladen kleuters',
        description: `Werk je met kinderen die extra ondersteuning nodig hebben? Woordzoekers zijn een waardevolle tool. Ze bieden herhaling zonder verveling.

Voor Veilig leren lezen achterstand maak je gerichte puzzels. Gebruik woorden waar het kind moeite mee heeft. De puzzelvorm maakt oefenen minder confronterend.

Schrijven oefenen gaat samen met woordzoeken. Laat kinderen de gevonden woorden overschrijven. Ze oefenen lettervorming in een betekenisvolle context.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Onderwijsondernemers - Oefenbladen Gratis Maken en Verkopen met Commerciële Licentie',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Wil je geld verdienen met je lesmateriaal? De woordzoeker generator maakt dit mogelijk. Met een abonnement krijg je een commerciële licentie.

Maak unieke oefenbladen en verkoop ze online. Teachers Pay Teachers is populair bij Nederlandse docenten. Ook Etsy werkt goed voor printables.

Combineer woordzoekers met andere werkbladen tot pakketten. Een thema-bundel met puzzels, kleurplaten en rekenen werkbladen. Ouders en collega's betalen graag voor complete materialen.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from wordsearch.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Woordzoekers - Oefenbladen Gratis en Kleurplaten',
    sectionDescription: 'Heb je vragen over de woordzoeker generator? Hieronder vind je antwoorden op de meest gestelde vragen. Van prijzen tot functies en alles daartussen.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig betalen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [
      {
        id: '1',
        question: 'Is Deze Woordzoeker Generator Echt Gratis voor Werkbladen Kleuters en Fijne Motoriek?',
        answer: 'Ja, de basisversie is gratis te gebruiken. Je maakt onbeperkt woordzoekers voor persoonlijk gebruik. De werkbladen bevatten een klein watermerk onderaan. Voor werkbladen kleuters en fijne motoriek oefeningen werkt de gratis versie uitstekend. Je hebt toegang tot alle thema\'s en afbeeldingen. Ook de bewerkingsfuncties zijn volledig beschikbaar. Wil je werkbladen zonder watermerk? Of een commerciële licentie om te verkopen? Dan kies je voor een Basispakket abonnement. Dit kost €144 per jaar of €15 per maand. Het Volledige Toegang abonnement kost €240 per jaar en geeft toegang tot alle 33 generators.',
      },
      {
        id: '2',
        question: 'Kan Ik Woordzoekers met Sommen tot 20 Thuis Printen op een Gewone Printer?',
        answer: 'Absoluut. Alle werkbladen zijn ontworpen voor thuisprinten. Ze werken perfect op elke inkjet of laserprinter. Geen speciaal papier nodig. De sommen tot 20 thema\'s printen scherp en duidelijk. Kies de grijswaarden optie om inkt te besparen. De puzzel blijft goed leesbaar in zwart-wit. Voor de beste resultaten gebruik je standaard kopieerpapier. 80 grams is prima. Je hoeft geen duur fotopapier te kopen.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Tafels Oefenen Woordzoekers?',
        answer: 'Nee, helemaal niet. De generator doet al het werk voor je. Je selecteert alleen je voorkeuren. De rest gaat automatisch. Voor tafels oefenen puzzels kies je simpelweg een rekenthema. Of typ je eigen woorden zoals "vermenigvuldigen" en "keer". De generator plaatst ze in het rooster. Zelfs het bewerken achteraf is eenvoudig. Sleep elementen met je muis. Geen Photoshop of InDesign kennis nodig.',
      },
      {
        id: '4',
        question: 'Mag Ik Woordzoekers met Veilig Leren Lezen Woorden Gebruiken in de Klas?',
        answer: 'Ja, klassikaal gebruik is toegestaan. Dit geldt voor zowel de gratis als betaalde versie. Print zoveel kopieën als je nodig hebt. Voor Veilig leren lezen ondersteuning maak je puzzels met kernwoorden. Kinderen oefenen woordherkenning op een speelse manier. De puzzels passen perfect bij je leesmethode. Met een abonnement vervalt het watermerk. Je werkbladen zien er dan nog professioneler uit.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Rekenen Werkbladen met Woordzoekers Beschikbaar?',
        answer: 'De generator ondersteunt elf talen volledig. Nederlands, Engels, Duits, Frans, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins. Voor rekenen werkbladen betekent dit dat je getalswoorden in elke taal kunt gebruiken. "Twelve" in het Engels. "Zwölf" in het Duits. "Douze" in het Frans. De interface past zich aan je gekozen taal aan. Ook de afbeeldingsnamen veranderen mee.',
      },
      {
        id: '6',
        question: 'Kan Ik Kleurplaten met Woordzoekers Verkopen die Ik Maak?',
        answer: 'Ja, met een Basispakket of Volledige Toegang abonnement. De commerciële licentie is inbegrepen. Geen extra kosten per verkocht werkblad. Combineer kleurplaten met woordzoekers in themapakketten. Verkoop ze op Teachers Pay Teachers of Etsy. Veel leerkrachten verdienen zo honderden euro\'s per maand. De 300 DPI kwaliteit is professioneel genoeg voor verkoop.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Woordzoekers Aan voor Fijne Motoriek Oefeningen bij Kleuters?',
        answer: 'Gebruik de instellingen om de puzzel makkelijker te maken. Kies een klein rooster van 6x6 of 8x8. Gebruik maximaal vier of vijf woorden. Voor fijne motoriek oefeningen zijn grote letters belangrijk. Het standaard lettertype is al goed leesbaar. Kinderen kunnen de woorden makkelijk omcirkelen. Voeg extra ruimte toe onder de puzzel. Daar kunnen kleuters de gevonden woorden overtekenen.',
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijden Werken Sommen tot 20 Woordzoekers het Beste?',
        answer: 'De generator is flexibel voor alle leeftijden. Van kleuters tot bovenbouw basisschool. Je past de moeilijkheidsgraad aan. Sommen tot 20 woordzoekers passen bij groep 3 en 4. Kinderen kennen de getallen al. Nu leren ze de woorden erbij. "Dertien", "veertien" en "vijftien" in de puzzel. Voor jongere kinderen maak je puzzels met getallen tot tien. Voor oudere leerlingen voeg je grotere getallen toe.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Foto\'s Uploaden voor Veilig Leren Lezen Woordzoekers?',
        answer: 'Ja, de uploadfunctie werkt voor alle bestandstypen. JPG, PNG en GIF worden ondersteund. Je uploadt meerdere bestanden tegelijk. Voor Veilig leren lezen personalisatie upload je eigen afbeeldingen. Foto\'s van de klas of school. Plaatjes die passen bij jullie thema. De woorden typ je zelf. De geüploade afbeeldingen verschijnen in je puzzel.',
      },
      {
        id: '10',
        question: 'Hoelang Duurt Het om Tafels Oefenen Werkbladen met Woordzoekers te Maken?',
        answer: 'Gemiddeld drie minuten van start tot download. Dat is inclusief thema kiezen, genereren en eventueel bewerken. Voor tafels oefenen werkbladen gaat het nog sneller. Typ je woorden, kies roostergrootte en klik op genereren. In twee minuten heb je een complete puzzel. Vergelijk dit met handmatig maken. Dat kost dertig tot zestig minuten. De tijdsbesparing is enorm.',
      },
      {
        id: '11',
        question: 'Hebben Woordzoekers voor Werkbladen Kleuters een Antwoordblad?',
        answer: 'Ja, elk werkblad heeft een bijbehorend antwoordblad. De generator maakt deze automatisch. Alle woorden zijn gemarkeerd met kleuren. Voor werkbladen kleuters is het antwoordblad handig voor de leerkracht. Controleer snel of kinderen alle woorden hebben gevonden. Of geef het aan leerlingen voor zelfcorrectie. Je downloadt werkblad en antwoordblad apart.',
      },
      {
        id: '12',
        question: 'Kan Ik Woordzoekers Maken over Rekenen Werkbladen Thema\'s en Kleurplaten?',
        answer: 'Absoluut. De themabibliotheek is uitgebreid. Van rekenen werkbladen onderwerpen tot creatieve kleurplaten thema\'s. Er is voor elk vak iets. Kies het thema "Getallen" voor rekengerelateerde afbeeldingen. Of "Vormen" voor meetkunde. De woorden passen automatisch bij de plaatjes. Combineer woordzoekers met kleurplaten elementen. Voeg decoratieve randen toe.',
      },
    ],
  },

  // Pricing - Word Search is FREE but needs subscription for no-watermark/commercial
  pricing: {
    title: 'Basispakket',
    price: '€144',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Onbeperkt werkbladen maken',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
      'Antwoordbladen inbegrepen',
    ],
    ctaText: 'Nu Starten',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Woordzoekers met Andere Generatoren - Complete Werkbladen Pakketten',
    sectionDescription: 'Met een abonnement krijg je toegang tot 33 generatoren. Combineer verschillende werkblad-typen voor maximale impact. Woordzoekers alleen zijn al waardevol. In combinatie met andere apps ontstaat echte meerwaarde.',
    ctaTitle: 'Klaar om geweldige werkbladen te maken?',
    ctaDescription: 'Sluit je aan bij duizenden leerkrachten die professionele werkbladen maken. Onbeperkt genereren, commerciële licentie inbegrepen.',
    primaryCtaText: 'Gratis Proberen',
    secondaryCtaText: 'Alle 33 Apps Bekijken',
    badgeText: 'Werkt goed met',
    exploreText: 'Alle apps bekijken',
    trustBadges: {
      guarantee: '30 dagen geld-terug-garantie',
      securePayment: 'Veilig betalen',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        slug: 'crossword',
        name: 'Kruiswoordpuzzel',
        category: 'Taal',
        icon: '📝',
        description: 'Vul woordzoekers aan met kruiswoordpuzzels voor dezelfde woordenschat voor uitgebreide woordtraining.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Letterpuzzel',
        category: 'Taal',
        icon: '🔤',
        description: 'Combineer woordzoekers met letterpuzzels voor spelling en woordenschat vanuit verschillende invalshoeken.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Woord Raden',
        category: 'Taal',
        icon: '❓',
        description: 'Voeg woord-raad activiteiten toe aan je lesstations, samen met woordzoekers voor afwisselend oefenen.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Cryptogram',
        category: 'Logica',
        icon: '🔐',
        description: 'Daag leerlingen uit met codebreker-puzzels die logisch denken en letterpatroonherkenning ontwikkelen.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide woordzoekers met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Alfabet Trein',
        category: 'Vroege Educatie',
        icon: '🚂',
        description: 'Vul woordzoeker-oefeningen aan met letterherkenningsactiviteiten voor uitgebreid leren lezen.',
      },
    ],
  },
};

export default wordSearchNlContent;
