import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Bingo Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/plaatjes-bingo-werkbladen.ts
 * URL: /nl/apps/plaatjes-bingo-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/bingo.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Werkbladen kleuters
 * 2. Werkbladen groep 3
 * 3. Oefenbladen gratis
 * 4. Rekenen werkbladen
 * 5. Letters leren
 * 6. Veilig leren lezen
 * 7. Sommen tot 20
 * 8. Kleurplaten
 * 9. Fijne motoriek
 * 10. Tafels oefenen
 *
 * PRICING: Core Bundle ($144/year = €144/jaar) - Picture Bingo is in Core Bundle
 */

export const pictureBingoNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'plaatjes-bingo-werkbladen',
    appId: 'bingo',
    title: 'Gratis Werkblad Plaatjes Bingo - Generator voor Werkbladen Kleuters',
    description: 'Maak professionele bingo werkbladen met onze plaatjes bingo generator. Met je Basispakket abonnement genereer je onbeperkt werkbladen voor groep 1, 2 en 3.',
    keywords: 'plaatjes bingo, werkbladen kleuters, werkbladen groep 3, oefenbladen gratis, rekenen werkbladen, letters leren, veilig leren lezen, sommen tot 20, kleurplaten, fijne motoriek, tafels oefenen, bingo generator',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/plaatjes-bingo-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/bingo/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad plaatjes bingo - werkblad voor kinderen met afbeeldingen voor groep 1-3'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/bingo/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen bingo - werkblad voor kleuters met thematische plaatjes'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/bingo/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis printables bingo - werkblad letters leren en veilig leren lezen'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/bingo/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Werkblad voor kinderen bingo - oefenbladen gratis fijne motoriek'
      }
    ],
  },

  // Hero Section - FULL text from bingo.md paragraphs
  hero: {
    title: 'Gratis Werkbladen Plaatjes Bingo Generator',
    subtitle: 'Werkblad voor Kinderen - Gratis Printables voor Groep 1-3',
    description: `Maak professionele bingo werkbladen met onze plaatjes bingo generator. Met je Basispakket abonnement genereer je onbeperkt werkbladen voor groep 1, 2 en 3. Download direct als PDF en print thuis of op school. Leerlingen leren spelenderwijs met visuele herkenning en woordenschat.

Plaatjes bingo is een fantastisch leermiddel voor het basisonderwijs. Kleuters en kinderen uit groep 3 leren nieuwe woorden terwijl ze spelen. De generator maakt unieke bingokaarten met afbeeldingen of woorden. Elke kaart is anders, zodat ieder kind een eigen speelervaring heeft.

Met je abonnement maak je zoveel bingokaarten als je nodig hebt. Geen extra kosten per werkblad. Kies uit meer dan 3000 kindvriendelijke afbeeldingen. De beeldbibliotheek is georganiseerd op thema. Van dieren tot voertuigen, van fruit tot schoolspullen.`,
    previewImageSrc: '/samples/dutch/bingo/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/bingo/
  samples: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Gratis Werkbladen en Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis werkblad voor kinderen van professionele kwaliteit. Gratis werkbladen en werkblad voor kinderen perfect voor werkblad voor kleuters. Gratis werkblad voor kinderen en werkblad voor kinderen inclusief educatief materiaal. Gratis werkblad beschikbaar',
    downloadLabel: 'Gratis Voorbeeld Downloaden',
    worksheetLabel: 'Werkblad',
    answerKeyLabel: 'Oproepkaarten',
    viewAllLabel: 'Groter bekijken',
    noPdfLabel: 'Alleen voorbeeld',
    freePdfCountLabel: 'gratis downloads',
    badgeText: 'Gratis Voorbeelden',
    downloadingLabel: 'Downloaden...',
    ofLabel: 'van',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/dutch/bingo/sample-1.jpeg',
        pdfDownloadUrl: '/samples/dutch/bingo/sample-1.pdf',
        answerKeySrc: '/samples/dutch/bingo/sample-1-answer.jpeg',
        altText: 'Gratis werkblad plaatjes bingo - werkbladen kleuters met afbeeldingen voor groep 1-3',
      },
      {
        id: '2',
        worksheetSrc: '/samples/dutch/bingo/sample-2.jpeg',
        pdfDownloadUrl: '/samples/dutch/bingo/sample-2.pdf',
        answerKeySrc: '/samples/dutch/bingo/sample-2-answer.jpeg',
        altText: 'Gratis werkbladen bingo - werkblad voor kinderen met thematische plaatjes',
      },
      {
        id: '3',
        worksheetSrc: '/samples/dutch/bingo/sample-3.jpeg',
        pdfDownloadUrl: '/samples/dutch/bingo/sample-3.pdf',
        answerKeySrc: '/samples/dutch/bingo/sample-3-answer.jpeg',
        altText: 'Gratis printables bingo - werkblad voor kleuters veilig leren lezen',
      },
      {
        id: '4',
        worksheetSrc: '/samples/dutch/bingo/sample-4.jpeg',
        pdfDownloadUrl: '/samples/dutch/bingo/sample-4.pdf',
        answerKeySrc: '/samples/dutch/bingo/sample-4-answer.jpeg',
        altText: 'Werkblad voor kinderen bingo - oefenbladen gratis fijne motoriek training',
      },
    ],
  },

  // Features Grid - FULL text from bingo.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'De bingo werkbladen generator biedt alles wat je nodig hebt voor interactief onderwijs. Van eenvoudige bediening tot professionele exportkwaliteit. Ontdek alle mogelijkheden om werkbladen te maken voor groep 1, 2 en 3.',
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
        title: 'Gratis Werkblad Maken in 3 Klikken - Werkblad voor Kinderen Bingo',
        description: `Binnen drie minuten heb je complete bingokaarten klaar. Kies een thema uit de beeldbibliotheek. Stel het rasterformaat in van 3x3 tot 5x5. Klik op genereren en je werkbladen verschijnen direct.

Geen ingewikkelde software nodig. Geen ontwerpervaring vereist. De generator doet het zware werk voor je. Werkbladen kleuters maken was nog nooit zo snel.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Gratis Werkbladen Bewerken - Werkblad voor Kleuters Volledig Aanpasbaar',
        description: `Na het genereren bewerk je elk element op het canvas. Sleep afbeeldingen naar een andere positie. Vergroot of verklein plaatjes met de hoekpunten. Draai elementen voor een speelse uitstraling.

Verwijder wat je niet nodig hebt. Voeg extra tekst toe waar je wilt. De oefenbladen gratis aanpassen gaat intuïtief. Je hebt volledige controle over het eindresultaat.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Gratis Printables met Eigen Afbeeldingen - Upload Je Schoolfoto\'s',
        description: `Upload je eigen afbeeldingen voor persoonlijke bingokaarten. Gebruik klassenfoto's voor een kennismakingsspel. Voeg foto's van schoolspullen toe. Combineer eigen uploads met bibliotheekafbeeldingen.

Ondersteunde formaten zijn JPEG, PNG en GIF. Meerdere bestanden tegelijk uploaden is mogelijk. Dit is perfect voor letters leren met persoonlijke thema's.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Gratis Werkblad voor Kinderen - Bingo in 11 Talen voor Taalonderwijs',
        description: `De interface werkt in elf talen. Nederlands, Engels, Duits, Frans en meer. De beeldbibliotheek toont afbeeldingsnamen in je gekozen taal. Perfect voor tweetalig onderwijs en NT2-lessen.

Kinderen zien het woord onder elk plaatje. Dit ondersteunt veilig leren lezen methodes. De hele interface past zich aan de gekozen taal aan.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Gratis Werkblad voor Kinderen met Commerciële Licentie - Verkoop Je Werkbladen',
        description: `Je Basispakket abonnement bevat een commerciële print-on-demand licentie. Verkoop je zelfgemaakte bingokaarten op platforms zoals Bol.com. Bied werkbladen aan via Teachers Pay Teachers.

Geen extra licentiekosten bovenop je abonnement. Ideaal voor ondernemende leerkrachten. De 300 DPI kwaliteit is professioneel genoeg voor verkoop.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Gratis Werkbladen en 3000+ Afbeeldingen - Uitgebreide Beeldbibliotheek',
        description: `Toegang tot meer dan drieduizend kindvriendelijke afbeeldingen. Georganiseerd in handige thema's. Dieren, voertuigen, fruit, groenten, seizoenen. Achtergronden en randen inbegrepen.

Zoekfunctie om snel specifieke plaatjes te vinden. Alle visuele materialen zitten in je abonnement. Download kleurplaten in grijstinten voor extra oefening.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Werkblad voor Kleuters in Professionele 300 DPI Kwaliteit - Perfect Printen',
        description: `Exporteer in hoge resolutie voor scherpe afdrukken. 300 DPI is de standaard voor professioneel drukwerk. Download als PDF voor meerdere pagina's. Of kies JPEG voor losse afbeeldingen.

Grijstintenoptie bespaart inkt. Geschikt voor thuis printen en professionele drukkerijen. Werkbladen groep 3 zien er altijd scherp en duidelijk uit.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🔢',
        title: 'Gratis Printables Bingokaarten - Tafels Oefenen Werkbladen voor Groep 3',
        description: `Maak bingo met getallen voor tafels oefenen. Gebruik afbeeldingen van hoeveelheden. Kinderen herkennen vermenigvuldigingen visueel. Combineer met sommen tot 20 voor rekenbingo.

Maak rekenonderwijs interactief en speels. Perfect voor de rekenhoek. Differentiatie is eenvoudig met verschillende rastergroottes.`,
        highlighted: false,
      },
      {
        id: '9',
        icon: '✋',
        title: 'Werkblad voor Kleuters Fijne Motoriek - Gratis Werkblad Bingo Ontwikkelen',
        description: `Bingokaarten inkleuren voor extra motoriekoefening. Kleine vakjes vragen om precisie. Kinderen oefenen pengreep en handcontrole. Combineer met letters leren voor dubbel leereffect.

Download de grijstintenversie voor inkleuropdrachten. Fijne motoriek en cognitieve vaardigheden samen. Ideaal voor de kleuterklas.`,
        highlighted: false,
      },
      {
        id: '10',
        icon: '📚',
        title: 'Gratis Werkbladen Zonder Extra Kosten - Onbeperkt Genereren',
        description: `Met je abonnement maak je onbeperkt bingokaarten. Geen kosten per werkblad. Geen limiet op downloads. Genereer tien unieke kaarten tegelijk.

Elke kaart heeft een andere plaatjesverdeling. Ideaal voor grote klassen waar ieder kind een eigen kaart nodig heeft. Oefenbladen gratis zonder extra kosten.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from bingo.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad Maken - Plaatjes Bingo in 5 Stappen voor Kinderen',
    sectionDescription: 'Het maken van een gratis werkblad voor kinderen duurt minder dan drie minuten. Volg dit eenvoudige stappenplan voor perfecte bingokaarten. Van thema kiezen tot printen, alles uitgelegd voor leerkrachten en ouders.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je bingokaarten zijn gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Je Thema voor Gratis Werkblad - Beeldbibliotheek Verkennen',
        description: `Open de bingo generator en bekijk de zijbalk. Selecteer de taal voor je beeldbibliotheek. Kies Nederlands voor Nederlandse woordnamen onder de plaatjes. Klik op het thema-dropdown menu.

Blader door categorieën zoals dieren, voertuigen of seizoenen. Je ziet direct alle beschikbare afbeeldingen in dat thema. Klik op plaatjes om ze te selecteren voor aangepaste oproepkaarten.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Stel Rastergrootte in voor Werkblad voor Kinderen - Van 3x3 tot 5x5',
        description: `Ga naar het onderdeel bingokaart instellingen. Kies het aantal rijen tussen drie en vijf. Kies het aantal kolommen tussen drie en vijf. Een 3x3 raster geeft negen vakjes per kaart.

Kleinere rasters zijn ideaal voor kleuters en beginners. Grotere rasters bieden meer uitdaging voor groep 3. Bepaal hoeveel kaarten je wilt genereren. Maximaal tien kaarten tegelijk mogelijk.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Werkbladen Genereren - Klik en Bekijk Direct Resultaat',
        description: `Kies of de bingokaart plaatjes of woorden toont. De plaatjesoptie toont afbeeldingen in elk vakje. De woordoptie toont de naam van elke afbeelding. Kies ook de vulling voor de oproepchips.

Klik op de genereerknop in de paarse werkbalk. Je bingokaarten verschijnen direct op het canvas. Het eerste tabblad toont kaarten en chips samen. Het tweede tabblad toont alleen de oproepkaarten.`,
        icon: '🎯',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Werkblad voor Kleuters Bewerken - Canvas Aanpassen naar Wens',
        description: `Nu begint het creatieve deel. Klik op elk element om het te selecteren. Sleep afbeeldingen naar een andere plek. Pak een hoekpunt om te vergroten of verkleinen. Draai elementen door het rotatiepunt te slepen.

Voeg tekst toe via de tekstgereedschappen. Typ een titel zoals "Dierenbingo Groep 2". Kies lettertype, grootte en kleur. Gebruik de uitlijnknoppen voor perfecte positionering.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Printables Downloaden - PDF of JPEG Exporteren',
        description: `Je werkblad is klaar voor export. Klik op de downloadknop in de werkbalk. Kies tussen verschillende formaten. JPEG voor losse afbeeldingsbestanden. PDF voor documenten met meerdere pagina's.

Vink de grijstintenoptie aan voor zwart-wit afdrukken. Dit bespaart inkt en maakt kleurplaten van je bingokaarten. Download apart de kaarten en de oproepchips.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from bingo.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Plaatjes Bingo voor Leerkrachten en Ouders',
    sectionDescription: 'Plaatjes bingo past in veel onderwijssituaties. Van kleuterklas tot speciaal onderwijs. Van thuisonderwijs tot taalles. Ontdek hoe verschillende gebruikers profiteren van de bingo generator.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Werkbladen Kleuters voor Leerkrachten Groep 1-2 - Spelend Leren in de Kleuterklas',
        subtitle: 'Gratis werkblad voor kinderen en fijne motoriek',
        description: `Kleuterjuffen en -meesters gebruiken bingo dagelijks. Het spel past perfect in de speelhoek. Kinderen leren nieuwe woorden door plaatjes te herkennen. Thematische bingo sluit aan bij projecten.

De generator maakt snel genoeg kaarten voor de hele groep. Elke kleuter krijgt een unieke kaart. Fijne motoriek ontwikkelt door vakjes te markeren. Concentratie en luistervaardigheid verbeteren spelenderwijs.`,
        quote: 'Mijn kleuters vinden de bingospellen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Rekenen Werkbladen voor Groep 3 Leerkrachten - Sommen tot 20 Oefenen',
        subtitle: 'Gratis werkbladen groep 3 en rekenen',
        description: `Leerkrachten groep 3 integreren bingo in rekenlessen. Getallenbingo helpt bij getalherkenning. Kinderen oefenen sommen tot 20 in spelcontext. Tellen wordt leuk met plaatjes van hoeveelheden.

Combineer rekenbingo met tafels oefenen voor groep 4. Maak kaarten met producten van de tafels. Roep de som, kinderen zoeken het antwoord. Differentiatie is eenvoudig met verschillende rastergroottes.`,
        quote: 'Rekenen wordt leuker met bingo erbij.',
      },
      {
        id: '3',
        icon: '📖',
        title: 'Letters Leren voor Groep 3 en 4 - Veilig Leren Lezen met Bingo',
        subtitle: 'Gratis werkblad veilig leren lezen ondersteuning',
        description: `Taalleerkrachten zetten bingo in voor woordenschatontwikkeling. De woordoptie toont geschreven woorden in vakjes. Kinderen koppelen gesproken woorden aan geschreven tekst. Dit ondersteunt veilig leren lezen perfect.

Kies plaatjes die passen bij de actuele leeskern. Kern 1 bevat eenvoudige woorden zoals maan en roos. Latere kernen bevatten complexere woorden. Elke kern krijgt eigen bingokaarten.`,
        quote: 'Bingo past perfect bij onze leesmethode.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Kleurplaten Bingo voor Thuisonderwijs - Oefenbladen Gratis voor Ouders',
        subtitle: 'Gratis printables en werkbladen voor thuis',
        description: `Thuisonderwijzende ouders vinden in bingo een veelzijdig hulpmiddel. Het spel combineert meerdere leergebieden tegelijk. Kinderen oefenen woordenschat, concentratie en motoriek. De grijstintenoptie maakt kleurplaten van bingokaarten.

Genereer kaarten voor verschillende leeftijden tegelijk. Jongere kinderen krijgen 3x3 rasters. Oudere kinderen werken met 5x5 kaarten. Speel samen als gezin voor sociale interactie.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Fijne Motoriek Training voor Speciaal Onderwijs - Werkbladen Groep 3 Niveau',
        subtitle: 'Werkblad voor kleuters speciaal onderwijs',
        description: `Leerkrachten speciaal onderwijs waarderen de aanpasbaarheid. Kleinere rasters voor kinderen die ondersteuning nodig hebben. Grote, duidelijke plaatjes voor visuele herkenbaarheid. De bewerkingsopties maken individuele aanpassingen mogelijk.

Bingo biedt structuur en voorspelbaarheid. Kinderen weten wat ze kunnen verwachten. Fijne motoriek verbetert door vakjes aan te kruisen. Succeservaringen bouwen zelfvertrouwen.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Tafels Oefenen voor Ondernemende Leerkrachten - Verkoop Je Werkbladen',
        subtitle: 'Gratis werkbladen met commerciële licentie',
        description: `Creatieve leerkrachten verdienen bij met zelfgemaakte materialen. Je Basispakket abonnement bevat commerciële licentie. Verkoop bingokaarten op platforms zoals Bol.com. Bied complete lessenpakketten aan via Teachers Pay Teachers.

De 300 DPI kwaliteit is professioneel genoeg voor verkoop. Maak seizoensgebonden sets voor Sinterklaas of Kerst. Tafels oefenen bingo voor groep 4. Sommige leerkrachten verdienen honderden euro's per maand.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from bingo.md
  faq: {
    sectionTitle: 'Gratis Werkblad FAQ - Veelgestelde Vragen over Plaatjes Bingo',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over de plaatjes bingo generator. Van prijzen tot mogelijkheden, van printen tot verkopen. Alles wat je moet weten voordat je begint.',
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
        question: 'Is de Bingo Generator Echt Gratis te Gebruiken voor Rekenen Werkbladen?',
        answer: 'De bingo werkbladen generator vereist een Basispakket abonnement. Dit kost €144 per jaar of €15 per maand. Met je abonnement genereer je onbeperkt bingokaarten zonder extra kosten. Geen kosten per werkblad of per download. Het Basispakket bevat tien populaire werkbladgeneratoren inclusief bingo. Het Volledige Toegang abonnement kost €240 per jaar en bevat alle 33 generators. Beide abonnementen bevatten een commerciële licentie en ondersteuning voor elf talen.',
      },
      {
        id: '2',
        question: 'Kan Ik Werkbladen Groep 3 Thuis Printen op een Gewone Printer?',
        answer: 'Ja, alle bingokaarten zijn ontworpen voor thuisgebruik. De generator exporteert in standaard paginaformaten. Kies Letter of A4 formaat voor je printer. Gewoon kopieerpapier werkt prima voor dagelijks gebruik. Voor duurzamere kaarten kies je dikker papier. De 300 DPI kwaliteit zorgt voor scherpe afdrukken. Zowel kleuren- als zwart-witprinters werken uitstekend. De grijstintenoptie bespaart inkt bij regelmatig printen.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Werkbladen Kleuters Bingo?',
        answer: 'Nee, de generator is ontworpen voor iedereen. Geen Photoshop of InDesign kennis nodig. Selecteer een thema, stel het raster in en klik op genereren. Je bingokaarten verschijnen automatisch op het canvas. De bewerkingstools zijn intuïtief. Sleep elementen met je muis. Klik en typ voor teksttoevoegingen. Alles werkt via eenvoudige knoppen. Binnen vijf minuten maak je professionele letters leren materialen.',
      },
      {
        id: '4',
        question: 'Mag Ik Bingo Oefenbladen Gratis Gebruiken in Mijn Klas voor Leerlingen?',
        answer: 'Je Basispakket abonnement bevat onbeperkt klasgebruik. Print zoveel kaarten als je nodig hebt. Deel werkbladen met alle leerlingen in je groep. Geen extra licentie vereist voor educatief gebruik. Genereer tien unieke kaarten per keer voor variatie. Elke leerling krijgt een andere plaatjesverdeling. Perfect voor klassikale bingospellen. De oefenbladen zijn gratis van extra kosten na je abonnement.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Veilig Leren Lezen Bingo Werkbladen Beschikbaar?',
        answer: 'De generator ondersteunt elf talen volledig. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees. Ook Zweeds, Deens, Noors en Fins zijn beschikbaar. Zowel de interface als de beeldbibliotheek werken meertalig. De afbeeldingsnamen verschijnen in je gekozen taal. Dit is essentieel voor veilig leren lezen ondersteuning. Kinderen zien het Nederlandse woord onder elk plaatje. Of het Engelse woord voor tweetalig onderwijs.',
      },
      {
        id: '6',
        question: 'Kan Ik Zelfgemaakte Tafels Oefenen Werkbladen Verkopen Online?',
        answer: 'Ja, je Basispakket abonnement bevat volledige commerciële rechten. Verkoop je bingokaarten op elk platform. Bol.com, Etsy, Teachers Pay Teachers, Amazon. Geen extra licentiekosten of royalty\'s. De 300 DPI exportkwaliteit voldoet aan professionele standaarden. Maak complete lessenpakketten voor tafels oefenen. Creëer niche-producten voor specifieke doelgroepen. Je creativiteit levert direct inkomen op.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Sommen tot 20 Bingo Werkbladen Aan voor Mijn Leerlingen?',
        answer: 'Na het genereren bewerk je elk element op het canvas. Klik op een afbeelding om deze te selecteren. Sleep naar een andere positie of verwijder. Vergroot of verklein met de hoekpunten. Voeg tekst toe via de tekstgereedschappen. Typ titels, instructies of namen. Kies lettertype, grootte en kleur. De bewerkingsopties maken sommen tot 20 bingo volledig aanpasbaar aan jouw klas.',
      },
      {
        id: '8',
        question: 'Welke Leeftijdsgroepen Werken het Best met Werkbladen Kleuters Bingo?',
        answer: 'Bingo werkt voor kinderen van drie tot twaalf jaar. Kleuters spelen met 3x3 rasters en grote plaatjes. Groep 3 en 4 gebruiken 4x4 of 5x5 rasters. De moeilijkheidsgraad past zich aan via rastergrootte. De kleurplaten optie werkt het best voor jongere kinderen. Download in grijstinten en laat eerst inkleuren. Dit combineert fijne motoriek met het bingospel. Oudere kinderen focussen meer op de woordoptie.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Foto\'s Uploaden voor Fijne Motoriek Bingo Werkbladen?',
        answer: 'Ja, de generator ondersteunt eigen afbeeldingen. Upload klassenfoto\'s voor kennismakingsbingo. Voeg foto\'s van schoolspullen of huisdieren toe. Combineer uploads met bibliotheekafbeeldingen voor variatie. Ondersteunde formaten zijn JPEG, PNG en GIF. Upload meerdere bestanden tegelijk. Je eigen afbeeldingen verschijnen in het uploadoverzicht. Selecteer ze voor gebruik in bingokaarten. Fijne motoriek oefeningen worden persoonlijker.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt het om Werkbladen Groep 3 Bingo te Maken?',
        answer: 'Gemiddeld drie minuten van start tot download. Selecteer een thema uit de bibliotheek. Stel rijen, kolommen en aantal kaarten in. Klik op genereren en bekijk het resultaat. Bewerken kost extra tijd afhankelijk van je wensen. Kleine aanpassingen duren één minuut. Complete herontwerpen kunnen vijf tot tien minuten kosten. Werkbladen groep 3 maak je sneller dan ooit tevoren.',
      },
      {
        id: '11',
        question: 'Bevatten Bingo Werkbladen een Antwoordenblad of Oproepkaarten?',
        answer: 'Ja, de generator maakt automatisch oproepkaarten. Het tweede tabblad toont alle afbeeldingen of woorden. Dit is het blad voor de spelleider of leerkracht. Knip de chips uit voor traditioneel bingospelen. De oproepkaarten downloaden als apart bestand. Kies JPEG of PDF formaat. Print op stevig papier voor herhaaldelijk gebruik. Lamineren maakt de chips nog duurzamer. Alles zit inbegrepen zonder extra kosten.',
      },
      {
        id: '12',
        question: 'Kan Ik Werkbladen Kleuters en Tafels Oefenen Thema\'s Maken met Bingo?',
        answer: 'Absoluut, de beeldbibliotheek is thematisch georganiseerd. Kies het dierenthema voor biologieles. Selecteer voertuigen voor verkeersonderwijs. Gebruik seizoensthema\'s voor herfst of lente projecten. Voor letters leren kies je de woordoptie. Afbeeldingsnamen verschijnen in de bingovakjes. Voor rekenen werkbladen selecteer je getallen of hoeveelheden. Elk schoolvak krijgt passende bingokaarten.',
      },
    ],
  },

  // Pricing - Core Bundle pricing
  pricing: {
    title: 'Basispakket',
    price: '€144',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Onbeperkt bingo werkbladen maken',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
      'Volledig bewerkbaar canvas',
    ],
    ctaText: 'Nu Starten',
    bundleDescription: 'Uw abonnement geeft toegang tot 10 werkbladgeneratoren:',
    bundleApps: [
      'Beeldoptelling',
      'Alfabettrein',
      'Kleurplaten',
      'Rekenwerkbladen',
      'Woordkruisel',
      'Zoek en Tel',
      'Verbindingsspel',
      'Lijnen Trekken',
      'Plaatjes Bingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Werkbladen Combineren - Plaatjes Bingo met Letters Leren en Rekenen',
    sectionDescription: 'De bingo generator is nog krachtiger in combinatie met andere tools. Het Basispakket bevat tien werkbladgeneratoren die elkaar aanvullen. Maak complete leerpakketten voor thema\'s, seizoenen of vaardigheden.',
    ctaTitle: 'Klaar om geweldige werkbladen te maken?',
    ctaDescription: 'Sluit je aan bij duizenden leerkrachten die professionele werkbladen maken. Onbeperkt genereren, commerciële licentie inbegrepen.',
    primaryCtaText: 'Gratis Proberen',
    secondaryCtaText: 'Alle 33 Apps Bekijken',
    badgeText: 'Werkt goed met',
    exploreText: 'Alle apps bekijken',
    trustBadges: {
      securePayment: 'Veilig betalen',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Rekenen',
        icon: '🔢',
        description: 'Combineer bingo met Zoek en Tel werkbladen voor extra rekenen werkbladen en sommen tot 20 oefening.',
      },
      {
        id: '2',
        slug: 'matching-app',
        name: 'Koppelspel',
        category: 'Logica',
        icon: '🔗',
        description: 'Voeg koppelwerkbladen toe aan je bingo voor visuele herkenning en werkbladen kleuters activiteiten.',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creatief',
        icon: '🎨',
        description: 'Maak thematische kleurplaten die passen bij je bingo voor fijne motoriek en creatieve ontwikkeling.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Alfabet Trein',
        category: 'Vroege Educatie',
        icon: '🚂',
        description: 'Combineer met alfabetactiviteiten voor letters leren en veilig leren lezen ondersteuning.',
      },
      {
        id: '5',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Voeg optelwerkbladen toe voor complete rekenen werkbladen pakketten met sommen tot 20.',
      },
      {
        id: '6',
        slug: 'drawing-lines',
        name: 'Lijnen Trekken',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast het bingo spelen.',
      },
    ],
  },
};

export default pictureBingoNlContent;
