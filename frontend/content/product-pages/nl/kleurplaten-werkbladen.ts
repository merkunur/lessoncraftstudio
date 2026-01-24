import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/kleurplaten-werkbladen.ts
 * URL: /nl/apps/kleurplaten-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Kleurplaten
 * 2. Werkbladen groep 3
 * 3. Werkbladen kleuters
 * 4. Oefenbladen gratis
 * 5. Fijne motoriek
 * 6. Letters leren / Schrijven oefenen
 * 7. Rekenen werkbladen
 * 8. Veilig leren lezen
 * 9. Sommen tot 20
 * 10. Tafels oefenen
 */

export const coloringNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'kleurplaten-werkbladen',
    appId: 'coloring',
    title: 'Kleurplaten Gratis Werkblad Generator - Gratis Werkbladen voor Kinderen en Kleuters',
    description: 'Maak professionele kleurplaten met onze gratis werkbladen generator. Met je Basispakket abonnement krijg je onbeperkt toegang tot werkblad voor kinderen maken. Download gratis printables als PDF of JPEG.',
    keywords: 'kleurplaten, gratis werkblad, gratis werkbladen, gratis printables, werkblad voor kinderen, werkblad voor kleuters, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/kleurplaten-werkbladen',
    images: [
      { url: 'https://www.lessoncraftstudio.com/samples/dutch/coloring/sample-1.jpeg', width: 2480, height: 3508, caption: 'Gratis werkblad kleurplaat - werkblad voor kinderen met dierenthema' },
      { url: 'https://www.lessoncraftstudio.com/samples/dutch/coloring/sample-2.jpeg', width: 2480, height: 3508, caption: 'Gratis werkbladen kleurplaat - werkblad voor kleuters met fijne motoriek' },
      { url: 'https://www.lessoncraftstudio.com/samples/dutch/coloring/sample-3.jpeg', width: 2480, height: 3508, caption: 'Gratis printables kleurplaat - oefenbladen gratis voor werkbladen groep 3' },
      { url: 'https://www.lessoncraftstudio.com/samples/dutch/coloring/sample-4.jpeg', width: 2480, height: 3508, caption: 'Werkblad voor kinderen kleurplaat - gratis werkblad met seizoensthema' },
      { url: 'https://www.lessoncraftstudio.com/samples/dutch/coloring/sample-5.jpeg', width: 2480, height: 3508, caption: 'Gratis werkblad voor kinderen - kleurplaat voor fijne motoriek' },
    ],
  },

  // Hero Section - FULL text from coloring.md paragraphs 1-4
  hero: {
    title: 'Gratis Werkblad Kleurplaten Generator - Gratis Werkbladen Maken',
    subtitle: 'Gratis Printables Kleurplaten - Werkblad voor Kinderen en Werkblad voor Kleuters',
    description: `Maak professionele kleurplaten met onze gratis werkbladen generator. Met je Basispakket abonnement krijg je onbeperkt toegang tot werkblad voor kinderen maken zonder extra kosten. Download gratis printables als PDF of JPEG en print ze direct uit. Ideaal voor leerkrachten die werkblad voor kleuters nodig hebben.

Onze kleurplaten generator is speciaal ontwikkeld voor het basisonderwijs als gratis werkblad oplossing. Leerkrachten van groep 1 en 2 gebruiken deze tool dagelijks. Met meer dan 3000 kindvriendelijke afbeeldingen maak je in enkele minuten prachtige gratis werkbladen groep 3. De generator ondersteunt 11 talen waaronder Nederlands.

Kleurplaten zijn essentieel voor de ontwikkeling van jonge kinderen. Ze stimuleren de fijne motoriek en creativiteit. Onze gratis printables werkbladen kleuters bevatten thema's die aansluiten bij het schooljaar. Denk aan seizoenen, dieren, voertuigen en feestdagen. Elk werkblad voor kinderen is bewerkbaar op het canvas.`,
    previewImageSrc: '/samples/dutch/coloring/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/dutch/coloring/
  samples: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Gratis Werkbladen en Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis werkblad voor kinderen van professionele kwaliteit. Gratis werkbladen en werkblad voor kinderen perfect voor werkblad voor kleuters. Gratis werkblad voor kinderen en werkblad voor kinderen inclusief educatief materiaal. Gratis werkblad beschikbaar',
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
        worksheetSrc: '/samples/dutch/coloring/sample-1.jpeg',
        answerKeySrc: '',
        altText: 'Gratis werkblad kleurplaat - werkblad voor kinderen met dierenthema voor fijne motoriek',
        pdfDownloadUrl: '/samples/dutch/coloring/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/dutch/coloring/sample-2.jpeg',
        answerKeySrc: '',
        altText: 'Gratis werkbladen kleurplaat - werkblad voor kleuters met seizoensthema',
        pdfDownloadUrl: '/samples/dutch/coloring/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/dutch/coloring/sample-3.jpeg',
        answerKeySrc: '',
        altText: 'Gratis printables kleurplaat - oefenbladen gratis voor letters leren',
        pdfDownloadUrl: '/samples/dutch/coloring/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/dutch/coloring/sample-4.jpeg',
        answerKeySrc: '',
        altText: 'Werkblad voor kinderen kleurplaat - gratis werkblad voor veilig leren lezen',
        pdfDownloadUrl: '/samples/dutch/coloring/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/dutch/coloring/sample-5.jpeg',
        answerKeySrc: '',
        altText: 'Gratis werkblad voor kinderen - kleurplaat werkblad voor kleuters',
        pdfDownloadUrl: '/samples/dutch/coloring/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from coloring.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Onze kleurplaten generator biedt alle functies die leerkrachten nodig hebben. Van eenvoudig maken tot volledig aanpassen. Hieronder vind je de belangrijkste mogelijkheden. Elke functie is ontworpen met het basisonderwijs in gedachten. Leerkrachten besparen uren per week met deze tool.',
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
        title: 'Gratis Werkblad Kleurplaten Maken in 3 Klikken - Werkblad voor Kleuters Snel Genereren',
        description: `Het maken van kleurplaten is verrassend eenvoudig. Kies een thema uit de bibliotheek. Selecteer de afbeeldingen die je wilt gebruiken. Klik op toevoegen en je kleurplaat verschijnt op het canvas.

Binnen 3 minuten heb je een compleet werkblad. Werkbladen kleuters maken was nog nooit zo snel. Je hoeft geen ontwerpvaardigheden te hebben. De generator doet het zware werk voor je.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Gratis Werkbladen Canvas voor Kleurplaten - Werkblad voor Kinderen Aanpassen',
        description: `Elk element op het canvas is volledig bewerkbaar. Sleep afbeeldingen naar de gewenste positie. Draai ze, vergroot of verklein ze. Verwijder wat je niet nodig hebt.

Voeg tekst toe met 7 verschillende lettertypen. De oefenbladen gratis aanpassen gaat intuïtief. Je hebt volledige controle over het eindresultaat. Dit maakt elke kleurplaat uniek voor jouw klas.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Gratis Printables Upload Afbeeldingen - Werkblad voor Kinderen Personaliseren',
        description: `Wil je specifieke afbeeldingen gebruiken? Upload je eigen plaatjes. De generator accepteert JPEG, PNG en GIF bestanden. Je kunt meerdere bestanden tegelijk uploaden.

Combineer eigen afbeeldingen met de bibliotheek. Dit is perfect voor werkbladen groep 3 over lokale thema's. Denk aan de mascotte van je school of foto's van een uitje.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Gratis Werkblad Kleurplaten in 11 Talen - Werkblad voor Kleuters Meertalig',
        description: `De generator ondersteunt 11 talen volledig. Nederlands is natuurlijk beschikbaar. Maar ook Duits, Frans, Spaans en meer. Dit is ideaal voor tweetalig onderwijs.

Afbeeldingsnamen verschijnen in de gekozen taal. Kinderen kunnen zo veilig leren lezen met bekende woorden. Combineer kleurplaten met woordenschatoefeningen. De hele interface past zich aan de gekozen taal aan.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '🧮',
        title: 'Gratis Werkbladen Tafels Oefenen - Werkblad voor Kinderen Rekenen Visueel',
        description: `Maak tafels oefenen leuk met kleurplaten. Voeg getallen toe aan je werkblad. Laat kinderen de uitkomst kleuren in een bepaalde kleur. Bijvoorbeeld: alle antwoorden van de tafel van 3 worden blauw.

Dit maakt rekenen werkbladen interactief. Kinderen onthouden de tafels beter door de visuele associatie. Tafels oefenen wordt zo een creatieve activiteit.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💼',
        title: 'Gratis Printables Commerciële Licentie - Gratis Werkbladen Verkopen op Etsy',
        description: `Je Basispakket abonnement bevat een volledige commerciële licentie. Verkoop je kleurplaten op Teachers Pay Teachers. Start een Etsy winkel met printbare werkbladen. Publiceer op Amazon KDP.

Geen extra licentiekosten of naamsvermelding nodig. Oefenbladen gratis van extra kosten verkopen is mogelijk. De 300 DPI kwaliteit is professioneel genoeg voor commerciële verkoop.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Gratis Werkblad 3000+ Afbeeldingen - Werkblad voor Kleuters met Thema\'s',
        description: `De afbeeldingenbibliotheek bevat meer dan 3000 kindvriendelijke plaatjes. Alle afbeeldingen zijn georganiseerd per thema. Kies uit dieren, voertuigen, seizoenen, feestdagen en meer.

Elk thema bevat tientallen afbeeldingen. De werkbladen kleuters bibliotheek groeit regelmatig. Je vindt altijd passende afbeeldingen voor je les. Zoek op trefwoord om snel te vinden wat je nodig hebt.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Gratis Werkbladen 300 DPI Kwaliteit - Werkblad voor Kinderen Printen zonder Kwaliteitsverlies',
        description: `Alle kleurplaten worden geëxporteerd in 300 DPI. Dit is de standaard voor professioneel drukwerk. Print thuis of op school zonder kwaliteitsverlies.

Kies tussen PDF of JPEG formaat. De grijswaarden optie bespaart inkt. Werkbladen groep 3 zien er altijd scherp en duidelijk uit. Ook na kopiëren blijft de kwaliteit behouden.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from coloring.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van professionele kleurplaten kost minder dan 3 minuten. Volg deze vijf stappen en je hebt een compleet werkblad. Geen ontwerpervaring nodig. De generator doet het zware werk voor je.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je kleurplaat is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Gratis Werkblad Thema Kiezen - Werkblad voor Kinderen met Dieren of Seizoenen',
        description: `Begin met het kiezen van een thema uit de bibliotheek. Je vindt meer dan 30 thema's. Populaire keuzes zijn dieren, voertuigen en seizoenen.

Elk thema bevat tientallen afbeeldingen. Voor werkbladen groep 3 zijn de schoolthema's ideaal. Kleuters houden van dieren en sprookjes. Selecteer het thema dat past bij je les.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Gratis Werkbladen Afbeeldingen Selecteren - Werkblad voor Kleuters met Plaatjes',
        description: `Na het kiezen van een thema zie je alle beschikbare afbeeldingen. Klik op een afbeelding om deze toe te voegen aan je canvas. Je kunt meerdere afbeeldingen combineren.

Voor letters leren kies je afbeeldingen die beginnen met die letter. Bijvoorbeeld een appel voor de letter A. Oefenbladen gratis maken met thematische afbeeldingen is zo eenvoudig.`,
        icon: '🎯',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Printables Pagina-instellingen - Werkblad voor Kinderen Aanpassen',
        description: `Kies het juiste paginaformaat voor je doel. Letter of A4 formaat is beschikbaar. Portret of liggend oriëntatie kun je selecteren.

Pas de achtergrondkleur aan indien gewenst. Voeg een decoratieve rand toe uit de bibliotheek. Voor rekenen werkbladen voeg je tekstvelden toe met sommen tot 20. Zo combineer je kleuren met rekenen.`,
        icon: '⚙️',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Gratis Werkblad Canvas Bewerken - Werkblad voor Kleuters Perfectioneren',
        description: `Nu komt het creatieve gedeelte. Sleep afbeeldingen naar de juiste positie. Vergroot of verklein ze met de hoekpunten. Draai afbeeldingen voor een speelse look.

Voeg tekst toe met de gewenste lettertype. Voor fijne motoriek werkbladen voeg je schrijflijnen toe. Werkbladen kleuters krijgen vaak een naamveld bovenaan. Alles is aanpasbaar tot het perfect is.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Werkbladen Download - Gratis Printables Printen in Hoge Kwaliteit',
        description: `Je kleurplaat is klaar om te downloaden. Kies tussen PDF of JPEG formaat. PDF is ideaal voor printen op school. JPEG werkt goed voor digitaal delen.

Selecteer grijswaarden om inkt te besparen. De oefenbladen gratis downloaden gaat met een klik. Print direct uit op je thuisprinter of op school.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'Onze kleurplaten generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot thuisonderwijzende ouders. Ontdek hoe verschillende groepen de tool gebruiken.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 en 2 - Werkbladen Kleuters voor Fijne Motoriek en Letters Leren',
        subtitle: 'Gratis werkblad voor kleuters en fijne motoriek',
        description: `Kleuterjuffen en -meesters gebruiken kleurplaten dagelijks. De werkbladen kleuters ondersteunen de ontwikkeling van fijne motoriek. Kinderen leren hun pengreep verbeteren door te kleuren.

Combineer kleurplaten met letters leren voor het alfabet. De grote, duidelijke afbeeldingen zijn perfect voor jonge kinderen. Leerkrachten groep 1 en 2 besparen uren voorbereidingstijd.`,
        quote: 'Mijn kleuters vinden de kleurrijke werkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Veilig Leren Lezen met Kleurplaten en Sommen tot 20',
        subtitle: 'Gratis werkbladen groep 3 en werkblad voor kinderen',
        description: `In groep 3 leren kinderen lezen en rekenen tegelijk. Kleurplaten ondersteunen veilig leren lezen door woord-beeld associaties. Voeg woordjes toe onder elke afbeelding.

Kinderen lezen en kleuren tegelijk. Voor rekenen maak je werkbladen met sommen tot 20. Laat kinderen het antwoord berekenen en dan kleuren. Leerkrachten groep 3 vinden dit een effectieve methode.`,
        quote: 'Kleurplaten passen perfect bij onze leesmethode.',
      },
      {
        id: '3',
        icon: '🧮',
        title: 'Leerkrachten Groep 4 en 5 - Tafels Oefenen met Kleurplaten en Rekenen Werkbladen',
        subtitle: 'Gratis werkblad tafels oefenen en werkblad voor kinderen',
        description: `Voor de hogere groepen zijn kleurplaten ook waardevol. Tafels oefenen wordt leuker met een kleurplaat erbij. Maak rekenen werkbladen met vermenigvuldigingen.

Kinderen kleuren het antwoord in een bepaalde kleur. De tafel van 3 wordt rood, de tafel van 7 wordt groen. Tafels oefenen met visuele beloningen werkt motiverend.`,
        quote: 'Rekenen wordt leuker met kleurplaten erbij.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders - Oefenbladen Gratis voor Letters Leren en Schrijven Oefenen',
        subtitle: 'Gratis printables en gratis werkbladen voor thuis',
        description: `Ouders die thuisonderwijs geven hebben flexibele materialen nodig. Met de kleurplaten generator maak je precies wat je kind nodig heeft. Oefenbladen gratis downloaden bespaart geld.

Combineer letters leren met thema's die je kind interessant vindt. Schrijven oefenen gaat beter met motiverende afbeeldingen. Thuisonderwijs ouders waarderen de aanpasbaarheid van elk werkblad.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '5',
        icon: '🌐',
        title: 'NT2 en Taalleerkrachten - Veilig Leren Lezen in 11 Talen met Kleurplaten',
        subtitle: 'Gratis werkbladen voor NT2 onderwijs en werkblad voor kinderen',
        description: `Voor NT2 onderwijs zijn kleurplaten een krachtig hulpmiddel. De generator ondersteunt 11 talen volledig. Maak werkbladen voor veilig leren lezen in het Nederlands.

Of combineer twee talen voor tweetalig onderwijs. Afbeeldingsnamen verschijnen in de gekozen taal. Kinderen leren nieuwe woorden terwijl ze kleuren.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Ondernemende Leerkrachten - Oefenbladen Gratis Verkopen met Commerciële Licentie',
        subtitle: 'Gratis werkblad verkopen met commerciële licentie',
        description: `Veel leerkrachten verdienen bij met het verkopen van werkbladen. De Basispakket bevat een volledige commerciële licentie. Verkoop je kleurplaten op Teachers Pay Teachers.

Start een Etsy winkel met printbare oefenbladen. De 300 DPI kwaliteit is professioneel genoeg voor verkoop. Sommige leerkrachten verdienen honderden euro's per maand.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from coloring.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over onze kleurplaten generator. Van abonnementskosten tot printmogelijkheden.',
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
        question: 'Is de Gratis Werkblad Kleurplaten Generator Echt Gratis te Gebruiken?',
        answer: 'De kleurplaten generator vereist een Basispakket abonnement. Dit kost €144 per jaar of €15 per maand. Met je abonnement maak je onbeperkt kleurplaten zonder extra kosten per werkblad. Er zijn geen verborgen kosten. Het Basispakket bevat 10 populaire generators inclusief kleurplaten. Het Volledige Toegang abonnement kost €240 per jaar en bevat alle 33 generators. Beide abonnementen bevatten een commerciële licentie en ondersteuning voor 11 talen.',
      },
      {
        id: '2',
        question: 'Kan Ik Gratis Werkbladen Kleurplaten Thuis Printen op een Gewone Printer?',
        answer: 'Ja, alle kleurplaten zijn ontworpen voor thuisprinters. De 300 DPI kwaliteit print scherp op elke inkjet of laserprinter. Kies PDF formaat voor beste resultaten. De grijswaarden optie bespaart inkt. Gebruik gewoon kopieerpapier of iets dikker papier. Kleurplaten printen perfect op A4 of Letter formaat. Geen speciale printer of papier nodig.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Gratis Printables Kleurplaten Maken?',
        answer: 'Nee, geen enkele ontwerpervaring is nodig. De generator doet al het werk. Kies een thema en selecteer afbeeldingen. Sleep ze naar de gewenste positie. Voeg tekst toe als je wilt. Download en print. Het hele proces duurt 3 minuten. Zelfs de minst technische gebruiker kan professionele kleurplaten maken. De interface is intuïtief en gebruiksvriendelijk.',
      },
      {
        id: '4',
        question: 'Kan Ik Werkblad voor Kinderen Kleurplaten Gebruiken in Mijn Klas?',
        answer: 'Je Basispakket abonnement bevat onbeperkt klasgebruik. Print zoveel kopieën als je nodig hebt. Gebruik kleurplaten voor fijne motoriek oefeningen. Combineer ze met tafels oefenen opdrachten. Deel ze digitaal via je leerlingvolgsysteem. Er zijn geen beperkingen op het aantal leerlingen. Elke leerkracht met een abonnement mag de werkbladen gebruiken in de klas.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Gratis Werkbladen Kleurplaten Beschikbaar?',
        answer: 'De generator ondersteunt 11 talen volledig. Nederlands, Duits, Frans, Spaans, Portugees, Italiaans, Engels, Zweeds, Deens, Noors en Fins. De hele interface past zich aan. Afbeeldingsnamen verschijnen in de gekozen taal. Dit is ideaal voor veilig leren lezen in meerdere talen. NT2 leerlingen profiteren van meertalige ondersteuning.',
      },
      {
        id: '6',
        question: 'Kan Ik Gratis Printables Kleurplaten Verkopen die Ik Maak?',
        answer: 'Ja, je Basispakket abonnement bevat een volledige commerciële licentie. Verkoop je kleurplaten op Teachers Pay Teachers. Start een Etsy winkel met printbare werkbladen. Publiceer activiteitenboeken op Amazon KDP. Geen extra licentiekosten of naamsvermelding nodig. De 300 DPI kwaliteit is professioneel genoeg voor verkoop. Veel leerkrachten verdienen honderden euro\'s per maand.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Werkblad voor Kinderen Kleurplaten Aan voor Mijn Leerlingen?',
        answer: 'Elk element op het canvas is aanpasbaar. Sleep afbeeldingen naar de gewenste positie. Vergroot of verklein ze. Voeg tekst toe met verschillende lettertypen. Maak rekenen werkbladen door sommen toe te voegen. Voeg een naamveld toe bovenaan. Pas de achtergrondkleur aan. Upload eigen afbeeldingen voor persoonlijke thema\'s.',
      },
      {
        id: '8',
        question: 'Welke Leeftijdsgroepen Werken het Beste met Werkblad voor Kleuters Kleurplaten?',
        answer: 'Kleurplaten zijn geschikt voor kinderen van 3 tot 10 jaar. Kleuters profiteren van grote, eenvoudige afbeeldingen. Groep 3 combineert kleuren met sommen tot 20. Oudere kinderen gebruiken complexere ontwerpen. De generator past zich aan elke leeftijd aan. Kies eenvoudige afbeeldingen voor jongere kinderen. Voeg meer detail toe voor ouderen.',
      },
      {
        id: '9',
        question: 'Kan Ik Gratis Werkblad Eigen Afbeeldingen Uploaden naar Kleurplaten?',
        answer: 'Ja, de generator ondersteunt eigen uploads. Upload JPEG, PNG of GIF bestanden. Combineer ze met de bibliotheek van 3000+ afbeeldingen. Dit is perfect voor tafels oefenen met schoolmascotte. Of foto\'s van een klasuitje als thema. Meerdere bestanden tegelijk uploaden is mogelijk.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt het om een Gratis Werkbladen Kleurplaat te Maken?',
        answer: 'Het maken van een kleurplaat duurt gemiddeld 3 minuten. Kies een thema in 30 seconden. Selecteer afbeeldingen in 1 minuut. Pas aan en download in 1,5 minuut. Fijne motoriek werkbladen zijn even snel gemaakt. Geen wachttijd bij het genereren. Download start direct na klikken.',
      },
      {
        id: '11',
        question: 'Bevatten Werkblad voor Kinderen Kleurplaten Antwoordsleutels?',
        answer: 'Kleurplaten zelf hebben geen antwoordsleutels nodig. Maar voor rekenen werkbladen met sommen kun je een aparte versie maken. Voeg de antwoorden toe aan een tweede kleurplaat. Print deze apart als docentenversie. Voor sommen tot 20 werkbladen is dit handig.',
      },
      {
        id: '12',
        question: 'Kan Ik Gratis Printables Kleurplaten Maken over Specifieke Schoolvakken?',
        answer: 'Ja, de thema\'s dekken alle schoolvakken. Dieren en planten voor biologie. Getallen voor tafels oefenen en rekenen. Letters voor taalonderwijs. Seizoenen voor wereldoriëntatie. De zoekfunctie vindt specifieke afbeeldingen snel. Combineer thema\'s voor geïntegreerd onderwijs.',
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
      'Onbeperkt kleurplaten maken',
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
    sectionTitle: 'Gratis Werkbladen Combineren - Werkblad voor Kinderen en Gratis Printables',
    sectionDescription: 'Het Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer kleurplaten met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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
        slug: 'word-search',
        name: 'Woordzoeker',
        category: 'Taal',
        icon: '🔍',
        description: 'Combineer kleurplaten met woordzoekers voor taalrijke lessen met Veilig leren lezen woorden.',
      },
      {
        id: '2',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Beloon voltooide optelwerkbladen met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '3',
        slug: 'alphabet-train',
        name: 'Alfabet Trein',
        category: 'Vroege Educatie',
        icon: '🚂',
        description: 'Vul kleurplaten aan met letterherkenningsactiviteiten voor letters leren en fijne motoriek samen.',
      },
      {
        id: '4',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast het kleuren.',
      },
      {
        id: '5',
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Rekenen',
        icon: '🔢',
        description: 'Combineer met Zoek en Tel voor extra woordherhaling en visuele telvaardigheden.',
      },
      {
        id: '6',
        slug: 'matching-app',
        name: 'Koppelspel',
        category: 'Logica',
        icon: '🔗',
        description: 'Voeg kleuractiviteiten toe aan koppelwerkbladen voor een complete leerervaring.',
      },
    ],
  },
};

export default coloringNlContent;
