import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/verbindings-werkbladen.ts
 * URL: /nl/apps/verbindings-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/matching.md
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
 *
 * PRICING: Core Bundle - €144/year or €15/month (Basispakket)
 */

export const matchingNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'verbindings-werkbladen',
    appId: 'matching',
    title: 'Gratis Werkbladen Verbindings Generator - Werkblad voor Kinderen en',
    description: 'Maak professionele verbindingswerkbladen met onze werkbladen generator. Met je Basispakket abonnement creëer je onbeperkt oefenbladen zonder extra kosten per.',
    keywords: 'verbindingswerkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, fijne motoriek, veilig leren lezen, rekenen werkbladen, tafels oefenen, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/verbindings-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/matching/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad verbindingsopdracht - werkblad voor kinderen met afbeeldingen koppelen'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/matching/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen verbindingspuzzel - werkblad voor kleuters letters leren'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/matching/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis printables verbindingswerkblad - werkblad voor kinderen woordenschat'
      }
    ]
  },

  // Hero Section
  hero: {
    title: 'Gratis Werkbladen Verbindings Generator - Werkblad voor Kinderen',
    subtitle: 'Gratis Werkblad voor Kinderen en Werkblad voor Kleuters - Gratis Printables',
    description: `Maak professionele verbindingswerkbladen met onze werkbladen generator. Met je Basispakket abonnement creëer je onbeperkt oefenbladen zonder extra kosten per werkblad. De generator maakt werkbladen groep 3 waarbij kinderen lijnen trekken om paren te verbinden. Binnen drie minuten download je hoogwaardige PDF werkbladen klaar voor de printer.

Verbindingswerkbladen zijn ideaal voor werkbladen kleuters en groep 1 2. Kinderen leren visuele herkenning door afbeeldingen te koppelen aan woorden of letters. Dit stimuleert de fijne motoriek omdat leerlingen precieze lijnen moeten trekken. Onze generator biedt vier verschillende verbindingsmodi.

Ontwerp werkbladen groep 3 die perfect aansluiten bij jouw lesmateriaal. Kies uit meer dan 3000 kindvriendelijke afbeeldingen georganiseerd per thema. De generator ondersteunt elf talen inclusief Nederlands. Ideaal voor tweetalig onderwijs en meertalige klaslokalen.`,
    previewImageSrc: '/samples/dutch/matching/sample-1.jpeg',
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

  // Sample Gallery
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
        worksheetSrc: '/samples/dutch/matching/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/matching/sample-1-answer.jpeg',
        altText: 'Gratis werkblad verbindingsopdracht - werkblad voor kinderen portret formaat',
        pdfDownloadUrl: '/samples/dutch/matching/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/dutch/matching/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/matching/sample-2-answer.jpeg',
        altText: 'Gratis werkbladen afbeelding-woord koppelen - werkblad voor kleuters letters leren',
        pdfDownloadUrl: '/samples/dutch/matching/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/dutch/matching/sample-3.jpeg',
        answerKeySrc: '/samples/dutch/matching/sample-3-answer.jpeg',
        altText: 'Gratis printables verbindingspuzzel - werkblad voor kinderen woordenschat oefenen',
        pdfDownloadUrl: '/samples/dutch/matching/sample-3.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Onze verbindingswerkbladen generator bevat alle functies die leerkrachten nodig hebben. Van werkbladen kleuters tot werkbladen groep 3 en hoger. Hieronder vind je een overzicht van de zeven belangrijkste functies. Elke functie is ontworpen om tijd te besparen en professionele resultaten te leveren.',
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
        title: 'Gratis Werkblad in Drie Klikken - Werkblad voor Kinderen Snel Creëren',
        description: `Maak werkbladen groep 3 in slechts drie eenvoudige stappen. Kies eerst je thema uit de uitgebreide afbeeldingenbibliotheek. Selecteer vervolgens de verbindingsmodus die past bij je les. Klik op genereren en je werkblad verschijnt direct.

De hele procedure duurt minder dan drie minuten. Je hoeft geen designvaardigheden te hebben. De generator doet het zware werk automatisch. Werkbladen kleuters en groep 1 2 zijn net zo snel gemaakt.

Vier verschillende verbindingsmodi bieden flexibiliteit. Koppel afbeeldingen aan beginletters voor letters leren. Gebruik afbeelding-woord combinaties voor veilig leren lezen ondersteuning. Maak aangepaste woordenlijsten voor vocabulaire oefeningen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Volledige Bewerkbaarheid - Werkblad voor Kleuters en Gratis Werkbladen Aanpassen',
        description: `Elk element op je werkblad is volledig bewerkbaar. Versleep afbeeldingen naar de gewenste positie. Roteer elementen door te slepen aan de hoeken. Vergroot of verklein afbeeldingen naar de juiste maat.

Deze flexibiliteit maakt werkbladen kleuters perfect aanpasbaar. Ook rekenen werkbladen kunnen exact worden afgestemd. Voeg tekstvelden toe met eigen instructies. Kies uit zeven verschillende lettertypes.

De bewerkingstools zijn intuïtief en eenvoudig. Gebruik de laagfuncties om elementen naar voren of achteren te plaatsen. Centreer objecten horizontaal of verticaal op de pagina. Werkbladen groep 3 worden precies zoals jij ze wilt hebben.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden - Gratis Printables Personaliseren voor Werkblad voor Kinderen',
        description: `Upload je eigen afbeeldingen voor gepersonaliseerde oefenbladen. Ondersteunde formaten zijn JPEG, PNG en GIF. Upload meerdere bestanden tegelijk voor efficiëntie.

Maak werkbladen met foto's van klasgenoten of huisdieren. Ideaal voor fijne motoriek oefeningen met herkenbare afbeeldingen. Geüploade afbeeldingen verschijnen in een apart voorbeeldvenster.

Personalisatie verhoogt de motivatie van leerlingen aanzienlijk. Fijne motoriek ontwikkeling wordt gestimuleerd door bekende beelden. Oefenbladen gratis van licentiekosten voor eigen afbeeldingen.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Elf Talen Ondersteuning - Gratis Werkblad voor Kinderen in Meerdere Talen',
        description: `De generator ondersteunt elf talen volledig. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Zowel de interface als de afbeeldingsnamen zijn vertaald.

Dit is essentieel voor veilig leren lezen in meertalige omgevingen. Afbeeldingsnamen bepalen de verbindingsletters en woorden. Een appel heet "appel" in het Nederlands en "apple" in het Engels.

Werkbladen groep 3 voor Engels leren worden moeiteloos gemaakt. Internationale scholen profiteren van deze meertaligheid. Letters leren in een tweede taal wordt toegankelijk.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie - Gratis Werkbladen Verkopen op Teachers Pay Teachers en Etsy',
        description: `Je Basispakket abonnement bevat een volledige commerciële print-on-demand licentie. Verkoop je werkbladen op Teachers Pay Teachers zonder extra kosten. Publiceer op Etsy en bouw een passief inkomen op.

Oefenbladen gratis van royaltykosten creëren winstpotentieel. Veel leerkrachten verdienen €500 tot €5000 per maand met educatieve materialen. Werkbladen groep 3 zijn zeer gewild op onderwijsplatforms.

De 300 DPI exportkwaliteit voldoet aan professionele drukvereisten. Maak onbeperkt werkbladen zonder per-werkblad kosten. Schaal je educatieve onderneming zonder limieten.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen - Werkblad voor Kleuters en Gratis Printables Thema\'s',
        description: `Toegang tot een bibliotheek met meer dan 3000 kindvriendelijke afbeeldingen. Alle afbeeldingen zijn georganiseerd per thema. Kies uit dieren, voertuigen, voedsel, natuur, seizoenen en meer.

Werkbladen kleuters profiteren van de schattige illustratiestijl. Kleurplaten thema's sluiten naadloos aan bij verbindingswerkbladen. Elk thema bevat tientallen gerelateerde afbeeldingen.

Seizoensgebonden thema's ondersteunen feestdagen en speciale gelegenheden. Kerstmis, Pasen, herfst en zomer thema's beschikbaar. Werkbladen groep 3 met schoolthema's voor de eerste schoolweken.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit - Gratis Werkblad voor Kinderen Drukklaar',
        description: `Alle werkbladen worden geëxporteerd in 300 DPI resolutie. Dit is de industriestandaard voor professioneel drukwerk. Scherpe lijnen en heldere afbeeldingen bij elke afdruk.

Rekenen werkbladen met sommen tot 20 printen kristalhelder. Fijne motoriek lijnoefeningen tonen elk detail. Werkbladen groep 3 zien er professioneel uit.

Het antwoordblad wordt apart gegenereerd. Download werkblad en antwoordblad afzonderlijk. Letters leren werkbladen tonen scherpe lettervormen.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '✨',
        title: 'Vier Verbindingsmodi - Gratis Werkbladen met Werkblad voor Kleuters Opties',
        description: `Kies tussen vier verschillende verbindingsmodi voor je werkbladen. De modus "Afbeelding naar Beginletter" is perfect voor letters leren. Kinderen verbinden plaatjes aan de juiste beginletter.

De modus "Afbeelding plus Woord" ondersteunt veilig leren lezen. Leerlingen koppelen afbeeldingen aan het bijbehorende woord. Voor tafels oefenen gebruik je de aangepaste tekstmodus.

Selecteer vier, vijf of zes paren per werkblad. Werkbladen kleuters beginnen met vier paren. Werkbladen groep 3 kunnen zes paren bevatten voor meer uitdaging.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Gratis Werkblad Maken in Vijf Stappen - Werkblad voor Kinderen met Gratis Printables',
    sectionDescription: 'Volg deze vijf eenvoudige stappen om professionele verbindingswerkbladen te maken. Het hele proces duurt minder dan drie minuten. Geen technische kennis of designervaring nodig. Werkbladen groep 3, werkbladen kleuters en alle andere niveaus volgen dezelfde stappen.',
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
        title: 'Stap 1: Kies Je Inhoud - Werkbladen Kleuters met Kleurplaten Thema\'s of Eigen Afbeeldingen',
        description: `Begin met het selecteren van je werkbladinhoud. Open het zijpaneel en navigeer naar de werkbladconfiguratie. Kies eerst het aantal paren: vier, vijf of zes. Selecteer vervolgens de verbindingsmodus die past bij je lesdoel.

De modus "Afbeelding naar Beginletter" is perfect voor letters leren. Gebruik "Afbeelding plus Woord" voor veilig leren lezen ondersteuning. De flexibele modus biedt maximale aanpasbaarheid voor werkbladen kleuters.

De afbeeldingenbibliotheek bevat kleurplaten thema's zoals dieren en voertuigen. Blader door thema's of zoek op naam. Upload eigen afbeeldingen voor gepersonaliseerde werkbladen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan - Rekenen Werkbladen en Sommen tot 20 Configureren',
        description: `Configureer de werkbladinstellingen voor optimale resultaten. Open de pagina-instellingen in het configuratiepaneel. Kies het paginaformaat: Letter of A4. Selecteer de oriëntatie: staand of liggend.

Pas de werkbladopties aan naar je behoeften. Activeer "Naam en Datum Velden" voor klasgebruik. Deze opties zijn perfect voor rekenen werkbladen. Sommen tot 20 verbindingsopdrachten worden overzichtelijk gepresenteerd.

Selecteer achtergrond en rand thema's voor visuele aantrekkelijkheid. Kleurplaten stijl achtergronden maken werkbladen speels. Seizoensgebonden thema's ondersteunen feestdagen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Werkblad - Oefenbladen Gratis met Letters Leren en Fijne Motoriek',
        description: `Klik op de "Genereren" knop om je werkblad te maken. Het werkblad verschijnt direct op het canvas. Afbeeldingen worden automatisch gerangschikt in twee kolommen. Opsommingstekens markeren elk verbindingspunt voor fijne motoriek oefening.

Letters leren werkbladen tonen duidelijke beginletters. Veilig leren lezen materialen bevatten goed leesbare woorden. Oefenbladen gratis van fouten door de automatische layout.

Genereer vervolgens het antwoordblad. Klik op "Antwoordblad Genereren" in het dropdown menu. Werkbladen groep 3 worden compleet met antwoordsleutel.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Werkbladen Groep 3 Aanpassen voor Tafels Oefenen en Schrijven Oefenen',
        description: `Pas je werkblad aan met de canvasbewerkingstools. Elk element is volledig bewerkbaar na generatie. Klik op een afbeelding om deze te selecteren. Versleep naar een nieuwe positie indien gewenst.

Voeg aangepaste tekst toe voor extra instructies. Kies uit zeven lettertypes voor de juiste stijl. Werkbladen groep 3 voor tafels oefenen krijgen duidelijke kopjes. Schrijven oefenen werkbladen bevatten instructietekst.

Gebruik de laagfuncties voor complexe ontwerpen. Ongedaan maken corrigeert fouten direct. Letters leren werkbladen worden pixel-perfect afgewerkt.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Veilig Leren Lezen Werkbladen en Kleurplaten Kwaliteit Exporteren',
        description: `Download je voltooide werkblad in professionele kwaliteit. Open het download dropdown menu. Kies tussen JPEG en PDF formaat. PDF biedt de beste afdrukkwaliteit voor veilig leren lezen materialen.

Activeer de grijswaarde optie om inkt te besparen. Kleurplaten stijl elementen worden nette grijstinten. Rekenen werkbladen met sommen tot 20 printen helder en duidelijk.

Alle exports zijn 300 DPI resolutie. Dit is professionele drukkwaliteit. Perfect voor verkoop op Teachers Pay Teachers. Oefenbladen gratis van kwaliteitsverlies bij het printen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Wie Gebruikt Gratis Werkbladen - Werkblad voor Kinderen en Werkblad voor Kleuters',
    sectionDescription: 'Verbindingswerkbladen worden gebruikt door diverse groepen in het onderwijs. Leerkrachten, ouders, bijlesdocenten en speciale onderwijsprofessionals profiteren allemaal. Ontdek hoe elke groep de generator gebruikt voor werkbladen groep 3 en werkbladen kleuters.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Basisonderwijs - Werkbladen Groep 3 voor Tafels Oefenen en Sommen tot 20',
        subtitle: 'Werkbladen groep 3 en tafels oefenen',
        description: `Leerkrachten in het basisonderwijs gebruiken verbindingswerkbladen dagelijks. Werkbladen groep 3 ondersteunen het rekenonderwijs met tafels oefenen opdrachten. Verbind tafelsommen aan de juiste antwoorden.

Maak werkbladen voor sommen tot 20 met visuele ondersteuning. Leerlingen verbinden getallen aan afbeeldingen met de juiste hoeveelheid. Dit versterkt getalbegrip en rekenvaardigheid.

Veilig leren lezen methodes worden ondersteund met matching werkbladen. Letters leren wordt interactief en speels. De generator bespaart uren voorbereidingstijd per week.`,
        quote: 'Verbindingswerkbladen maken differentiatie eenvoudig in mijn klas.',
      },
      {
        id: '2',
        icon: '🏠',
        title: 'Ouders en Thuisonderwijs - Werkbladen Kleuters voor Fijne Motoriek en Kleurplaten Activiteiten',
        subtitle: 'Werkbladen kleuters voor thuis',
        description: `Ouders gebruiken verbindingswerkbladen voor thuisonderwijs en huiswerkbegeleiding. Werkbladen kleuters zijn ideaal voor voorschoolse voorbereiding. Kinderen oefenen fijne motoriek door lijnen te trekken.

Kleurplaten stijl werkbladen houden kinderen gemotiveerd. Combineer verbindingsopdrachten met kleuractiviteiten. Letters leren in eigen tempo zonder klasdruk.

De oefenbladen gratis van extra kosten maken thuisonderwijs betaalbaar. Upload familiefoto's voor gepersonaliseerde werkbladen. Kinderen herkennen bekende gezichten en blijven betrokken.`,
        quote: 'Mijn kinderen vinden de thematische werkbladen geweldig!',
      },
      {
        id: '3',
        icon: '📚',
        title: 'Bijlesdocenten en Tutoren - Rekenen Werkbladen met Sommen tot 20 en Tafels Oefenen',
        subtitle: 'Rekenen werkbladen voor bijles',
        description: `Bijlesdocenten maken gedifferentieerde materialen voor individuele leerlingen. Rekenen werkbladen passen bij het specifieke niveau van elke leerling. Sommen tot 20 voor leerlingen die extra oefening nodig hebben.

Tafels oefenen werkbladen voor automatisering van basisbewerkingen. De vier verbindingsmodi bieden flexibiliteit voor diverse leerdoelen. Fijne motoriek training voor leerlingen met motorische uitdagingen.

De commerciële licentie staat verkoop van bijlespakketten toe. Bouw een bijlespraktijk met professionele materialen.`,
        quote: 'Ik kan snel werkbladen maken voor elk niveau.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'Speciaal Onderwijs - Oefenbladen Gratis Aanpassen voor Fijne Motoriek en Veilig Leren Lezen',
        subtitle: 'Oefenbladen voor speciaal onderwijs',
        description: `Speciaal onderwijs professionals waarderen de aanpasbaarheid van onze generator. Oefenbladen gratis van afleidende elementen door minimalistisch ontwerp. Fijne motoriek werkbladen met extra grote verbindingspunten.

Veilig leren lezen materialen met duidelijke lettervormen. De canvasbewerking maakt individuele aanpassingen mogelijk. Vergroot afbeeldingen voor leerlingen met visuele beperkingen.

Werkbladen kleuters voor ontwikkelingsvertraging. Letters leren in aangepast tempo. De grijswaarde optie vermindert visuele overprikkeling.`,
        quote: 'De aanpasbaarheid is perfect voor mijn leerlingen.',
      },
      {
        id: '5',
        icon: '💰',
        title: 'Commerciële Verkopers - Kleurplaten en Werkbladen Groep 3 Verkopen op Etsy en TPT',
        subtitle: 'Commerciële licentie voor verkoop',
        description: `Ondernemende leerkrachten bouwen een inkomen met werkbladverkoop. Kleurplaten bundels combineren met verbindingswerkbladen. Werkbladen groep 3 zijn bestsellers op Teachers Pay Teachers.

Rekenen werkbladen met tafels oefenen voor groep 4-5. Sommen tot 20 bundels voor groep 3 rekenonderwijs. Veilig leren lezen ondersteuningsmaterialen zijn populair.

De 300 DPI kwaliteit voldoet aan professionele verkoopstandaarden. Bouw passief inkomen met educatieve materialen.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
      {
        id: '6',
        icon: '🧒',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters voor Letters Leren en Schrijven Oefenen',
        subtitle: 'Werkbladen kleuters en groep 1 2',
        description: `Leerkrachten in groep 1 en 2 gebruiken verbindingswerkbladen voor vroege geletterdheid. Werkbladen kleuters met grote afbeeldingen en duidelijke verbindingspunten. Letters leren wordt speels en interactief.

Schrijven oefenen wordt indirect ondersteund door lijntrekken. De pengreep ontwikkelt zich door gerichte oefening. Fijne motoriek is de basis voor schrijfvaardigheid.

Kleurplaten thema's maken lessen visueel aantrekkelijk. Combineer verbindingsopdrachten met kleuractiviteiten voor gevarieerde lessen.`,
        quote: 'Mijn kleuters leren letters terwijl ze spelen.',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over onze verbindingswerkbladen generator. Van werkbladen kleuters tot rekenen werkbladen voor hogere groepen. Vind antwoorden op al je vragen over tafels oefenen, letters leren en meer.',
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
        question: 'Hoe Maak Ik Gratis Werkblad voor Kleuters en Werkblad voor Kinderen?',
        answer: 'Werkbladen kleuters maken is eenvoudig met onze generator. Selecteer de modus "Afbeelding naar Beginletter" voor letters leren. Kies een kleutervriendelijk thema zoals dieren of speelgoed. Stel het aantal paren in op vier voor jonge kinderen. Fijne motoriek ontwikkelt zich door het trekken van verbindingslijnen. De dikke opsommingstekens maken het verbindingspunt duidelijk zichtbaar. Grotere afbeeldingen zijn beschikbaar via canvasbewerking. Upload eigen foto\'s voor herkenbare afbeeldingen.',
      },
      {
        id: '2',
        question: 'Kan Ik Gratis Werkbladen Maken voor Werkblad voor Kinderen Rekenen?',
        answer: 'Rekenen werkbladen zijn mogelijk met de aangepaste woordmodus. Maak werkbladen voor tafels oefenen door tafelsommen als tekst in te voeren. Bijvoorbeeld "3 x 4" links en "12" rechts. Sommen tot 20 werken op dezelfde manier. Voer "7 + 8" in aan de ene kant en "15" aan de andere. De generator plaatst items automatisch in willekeurige volgorde. Leerlingen verbinden sommen aan de juiste antwoorden.',
      },
      {
        id: '3',
        question: 'Ondersteunt de Gratis Werkbladen Generator Veilig Leren Lezen Methodes?',
        answer: 'Veilig leren lezen wordt uitstekend ondersteund door onze generator. De modus "Afbeelding plus Woord" toont afbeeldingen met woordlabels. Leerlingen zien het woord direct bij de afbeelding. Dit versterkt de woord-beeld associatie. De modus "Afbeelding naar Beginletter" ondersteunt fonemisch bewustzijn. Kinderen leren welke letter bij welk woord hoort. De elf talen ondersteuning maakt meertalig leren mogelijk.',
      },
      {
        id: '4',
        question: 'Zijn Gratis Printables Geschikt voor Werkblad voor Kinderen Schrijven Oefenen?',
        answer: 'Schrijven oefenen wordt indirect ondersteund door verbindingswerkbladen. Het trekken van lijnen ontwikkelt dezelfde handmotoriek als schrijven. Kinderen oefenen pencontrole en hand-oog coördinatie. Combineer verbindingsopdrachten met kleurplaten voor complete activiteiten. De grijswaarde export maakt werkbladen geschikt als kleurplaten. Kinderen kunnen afbeeldingen inkleuren na het verbinden.',
      },
      {
        id: '5',
        question: 'Hoeveel Verbindingsparen Kan Ik Gebruiken voor Gratis Werkblad voor Kinderen?',
        answer: 'Kies tussen vier, vijf of zes verbindingsparen per werkblad. Vier paren zijn ideaal voor werkbladen kleuters en beginnende leerlingen. Vijf paren bieden een gemiddelde uitdaging. Zes paren zijn geschikt voor gevorderde oefeningen. Sommen tot 20 werkbladen werken goed met alle aantallen. Tafels oefenen opdrachten kunnen meer paren bevatten voor intensievere oefening.',
      },
      {
        id: '6',
        question: 'Kan Ik Gratis Printables Thema\'s Combineren met Werkblad voor Kleuters?',
        answer: 'Kleurplaten thema\'s zijn beschikbaar als achtergronden voor alle werkbladtypes. Selecteer een thematische achtergrond in de pagina-instellingen. Rekenen werkbladen krijgen een speelse uitstraling. Tafels oefenen wordt leuker met seizoensgebonden decoraties. Kerstmis, Pasen en zomer thema\'s beschikbaar. De achtergrond dekking is aanpasbaar om tekst leesbaar te houden.',
      },
      {
        id: '7',
        question: 'Hoe Werkt de Gratis Werkbladen Generator voor Werkblad voor Kleuters?',
        answer: 'Fijne motoriek oefeningen zijn de kern van verbindingswerkbladen. Kinderen in groep 1 2 ontwikkelen motorische vaardigheden door lijnen te trekken. De afstand tussen verbindingspunten kan worden aangepast. Werkbladen kleuters bevatten duidelijke startpunten. De opsommingstekens markeren waar lijnen beginnen en eindigen. Letters leren combineert cognitieve en motorische ontwikkeling.',
      },
      {
        id: '8',
        question: 'Welke Exportkwaliteit Krijg Ik voor Gratis Werkblad voor Kinderen?',
        answer: 'Alle werkbladen exporteren in 300 DPI professionele kwaliteit. Veilig leren lezen materialen printen met scherpe tekst. Afbeeldingen zijn helder en gedetailleerd. De PDF optie biedt de beste afdrukkwaliteit. JPEG is geschikt voor digitaal delen. Grijswaarde export bespaart inkt bij veelvuldig printen.',
      },
      {
        id: '9',
        question: 'Mag Ik Gratis Werkbladen en Gratis Printables Verkopen op Teachers Pay Teachers?',
        answer: 'De Basispakket licentie staat volledige commerciële verkoop toe. Tafels oefenen werkbladen verkopen uitstekend op TPT. Sommen tot 20 bundels zijn populair bij ouders en leerkrachten. Letters leren pakketten voor werkbladen kleuters zijn gewild. Geen naamsvermelding vereist op je producten. Maak onbeperkt werkbladen voor verkoop.',
      },
      {
        id: '10',
        question: 'Is Deze Gratis Werkbladen Generator Echt Gratis voor Werkblad voor Kinderen?',
        answer: 'De verbindingswerkbladen generator vereist een Basispakket abonnement van €144 per jaar of €15 per maand. Je abonnement geeft je onbeperkte werkbladen creatie zonder extra kosten per download. Genereer zoveel werkbladen groep 3 als je nodig hebt. Alles zit inbegrepen. Geen verborgen kosten of limieten. Het Basispakket bevat tien populaire werkblad generators. Het Volledige Toegang abonnement kost €240 per jaar en bevat alle 33 generators.',
      },
      {
        id: '11',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Gratis Werkblad voor Kinderen?',
        answer: 'Ja, de uploadfunctie accepteert JPEG, PNG en GIF bestanden. Upload meerdere afbeeldingen tegelijk voor efficiëntie. Je geüploade afbeeldingen worden gebruikt in de verbindingswerkbladen zonder extra licentiekosten. Combineer met bibliotheekafbeeldingen voor unieke werkbladen. Maak werkbladen met foto\'s van klasactiviteiten of schooluitjes.',
      },
      {
        id: '12',
        question: 'In Welke Talen Kan Ik Gratis Werkbladen en Werkblad voor Kleuters Maken?',
        answer: 'De generator ondersteunt elf talen volledig. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Elke taal werkt perfect voor werkbladen kleuters. De afbeeldingsnamen veranderen per taal. Dit is essentieel voor letters leren in verschillende talen. Internationale scholen profiteren van deze meertaligheid.',
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
      'Onbeperkt werkbladen maken',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
      'Antwoordbladen inbegrepen',
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
    sectionDescription: 'De Basispakket bevat tien werkbladgeneratoren die perfect samenwerken. Combineer verbindingswerkbladen met andere tools voor gevarieerde lessen. Maak complete lespakketten voor werkbladen kleuters en hogere groepen.',
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
        description: 'Combineer woordzoekers met verbindingswerkbladen voor complete taalactiviteiten. Beide tools ondersteunen letters leren op verschillende manieren.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Kleurplaten en verbindingswerkbladen zijn perfecte partners voor fijne motoriek ontwikkeling. Begin met verbinden, eindig met kleuren.',
      },
      {
        id: '3',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer met optelwerkbladen voor compleet getallenwerk. Rekenen werkbladen met sommen tot 20 versterken rekenvaardigheden.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Alfabet Trein',
        category: 'Vroege Educatie',
        icon: '🚂',
        description: 'Vul verbindingswerkbladen aan met alfabetactiviteiten voor werkbladen kleuters. Letters leren wordt interactief en speels.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast verbindingsopdrachten. Schrijven oefenen wordt voorbereid.',
      },
      {
        id: '6',
        slug: 'sudoku',
        name: 'Sudoku',
        category: 'Logica',
        icon: '🧩',
        description: 'Sudoku en verbindingswerkbladen bieden complete rekenpakketten. Logisch denken en tafels oefenen in één bundel.',
      },
    ],
  },
};

export default matchingNlContent;
