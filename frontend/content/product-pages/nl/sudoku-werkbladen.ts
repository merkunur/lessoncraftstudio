import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Sudoku Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/sudoku-werkbladen.ts
 * URL: /nl/apps/sudoku-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/sudoku.md
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

export const sudokuNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'sudoku-werkbladen',
    appId: 'sudoku',
    title: 'Sudoku Werkbladen Generator - Oefenbladen Gratis voor Werkbladen Groep 3 en Werkbladen Kleuters',
    description: 'Maak prachtige visuele sudoku puzzels voor jonge kinderen. Onze sudoku werkbladen generator is speciaal ontworpen voor kleuters en basisschoolleerlingen. Met je Basispakket abonnement maak je onbeperkt werkbladen kleuters zonder extra kosten per werkblad.',
    keywords: 'sudoku werkbladen, werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, oefenbladen gratis, kleurplaten, letters leren, schrijven oefenen, tafels oefenen, veilig leren lezen, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/sudoku-werkbladen',
  },

  // Hero Section - FULL text from sudoku.md paragraphs 1-4
  hero: {
    title: 'Sudoku Werkbladen Generator',
    subtitle: 'Oefenbladen Gratis voor Werkbladen Groep 3 en Werkbladen Kleuters',
    description: `Maak prachtige visuele sudoku puzzels voor jonge kinderen. Onze sudoku werkbladen generator is speciaal ontworpen voor kleuters en basisschoolleerlingen. Met je Basispakket abonnement maak je onbeperkt werkbladen kleuters zonder extra kosten per werkblad. In plaats van cijfers gebruiken deze puzzels kleurrijke plaatjes. Perfect voor kinderen die nog niet kunnen rekenen.

Visuele sudoku helpt kinderen logisch denken ontwikkelen. De puzzels zijn ideaal voor werkbladen groep 3 en werkbladen kleuters. Kinderen leren patronen herkennen zonder dat ze cijfers hoeven te kennen. Dit maakt onze sudoku generator perfect voor de jongste leerlingen.

Onze sudoku voor kinderen gebruikt afbeeldingen in plaats van cijfers. Een 4x4 rooster maakt de puzzels behapbaar voor jonge leerlingen. Kies uit meer dan 3000 kindvriendelijke afbeeldingen. Selecteer een thema of kies individuele plaatjes.`,
    previewImageSrc: '/samples/english/sudoku/sudoku_easy.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/sudoku/
  samples: {
    sectionTitle: 'Sudoku Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/sudoku/sudoku_easy.jpeg',
        answerKeySrc: '/samples/english/sudoku/sudoku_easy answer_key.jpeg',
        altText: 'Sudoku werkblad makkelijk niveau met plaatjes voor werkbladen kleuters',
        pdfDownloadUrl: '/samples/english/sudoku/sudoku_easy.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/sudoku/sudoku medium.jpeg',
        answerKeySrc: '/samples/english/sudoku/sudoku medium answer_key.jpeg',
        altText: 'Sudoku werkblad medium niveau voor werkbladen groep 3',
        pdfDownloadUrl: '/samples/english/sudoku/sudoku medium.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/sudoku/sudoku hard.jpeg',
        answerKeySrc: '/samples/english/sudoku/sudoku hard answer_key.jpeg',
        altText: 'Sudoku werkblad moeilijk niveau voor gevorderde leerlingen',
        pdfDownloadUrl: '/samples/english/sudoku/sudoku hard.pdf',
      },
    ],
  },

  // Features Grid - FULL text from sudoku.md feature sections
  features: {
    sectionTitle: 'Sudoku Generator Functies - Alles voor Werkbladen Groep 3 en Oefenbladen Gratis',
    sectionDescription: 'Onze sudoku werkbladen generator biedt alle functies die je nodig hebt. Van eenvoudige creatie tot professionele downloads. Hieronder vind je de zeven belangrijkste mogelijkheden. Elke functie is ontworpen met leerkrachten en ouders in gedachten. Maak werkbladen kleuters en werkbladen groep 3 zonder technische kennis.',
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
        title: 'Werkbladen Kleuters Maken in 3 Klikken - Snel Oefenbladen Gratis Genereren',
        description: `Maak een complete sudoku puzzel in slechts drie stappen. Kies eerst een thema of selecteer individuele plaatjes. Stel vervolgens de moeilijkheidsgraad in. Klik op genereren en je werkblad verschijnt direct. Geen ingewikkelde instellingen of lange wachttijden.

De generator selecteert automatisch vier unieke afbeeldingen. Het rooster wordt perfect gevuld volgens sudoku regels. Lege vakjes worden willekeurig geplaatst op basis van je gekozen niveau. Binnen een minuut heb je een printklaar werkblad.

Dit bespaart uren voorbereidingstijd. Traditioneel kost het maken van puzzels veel tijd. Met onze tool maak je in drie minuten wat anders een uur duurt. Meer tijd voor les geven in plaats van materiaal maken.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Rekenen Werkbladen Volledig Bewerkbaar - Alles op het Canvas Aanpassen',
        description: `Elk element op je werkblad is volledig aanpasbaar. Sleep afbeeldingen naar een andere positie. Vergroot of verklein plaatjes met je muis. Draai elementen in elke gewenste hoek. Verwijder wat je niet nodig hebt.

Deze flexibiliteit onderscheidt onze generator. Andere tools geven statische output. Bij ons pas je alles aan naar wens. Voeg extra decoraties toe. Plaats een titel bovenaan. Schrijf instructies voor leerlingen.

De bewerkingsmogelijkheden zijn ideaal voor rekenen werkbladen combinaties. Voeg getallen toe naast de puzzel. Maak ruimte voor sommen tot 20 oefeningen. Creëer een complete werkblad met meerdere activiteiten.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Fijne Motoriek Training met Eigen Afbeeldingen - Upload je Eigen Plaatjes',
        description: `Upload je eigen foto's en afbeeldingen. Ondersteunde formaten zijn JPEG, PNG en GIF. Selecteer meerdere bestanden tegelijk. Je uploads verschijnen direct in de bibliotheek.

Gebruik klasfoto's voor persoonlijke puzzels. Upload afbeeldingen van het huidige thema. Maak seizoensgebonden werkbladen met eigen materiaal. Combineer uploads met bibliotheekafbeeldingen.

Eigen afbeeldingen maken werkbladen extra motiverend. Kinderen herkennen bekende plaatjes. Dit verhoogt betrokkenheid en concentratie. Perfect voor fijne motoriek oefeningen met persoonlijke touch.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Veilig Leren Lezen Ondersteuning in 11 Talen - Nederlandse Interface',
        description: `De generator ondersteunt elf talen volledig. Nederlands, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors, Fins en Engels. Alle menu's verschijnen in je gekozen taal. Afbeeldingsnamen zijn vertaald.

Voor veilig leren lezen programma's is dit essentieel. Kinderen zien Nederlandse woorden bij elke afbeelding. Dit versterkt woordherkenning. Taalondersteuning maakt de tool bruikbaar voor meertalige klassen.

Internationale scholen profiteren enorm. Wissel tussen talen met een klik. Maak dezelfde puzzel in verschillende talen. Ideaal voor taalonderwijs en NT2 lessen.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Kleurplaten Verkopen met Commerciële Licentie - POD Rechten Inbegrepen',
        description: `Je Basispakket abonnement bevat volledige commerciële rechten. Verkoop je werkbladen op Teachers Pay Teachers. Bied puzzels aan via Etsy. Publiceer op Amazon KDP. Geen extra licentiekosten.

Dit opent mogelijkheden voor ondernemende leerkrachten. Maak thematische bundels met kleurplaten en sudoku. Verkoop seizoenspakketten. Bouw een passief inkomen naast je baan.

De 300 DPI exportkwaliteit is professioneel. Kopers ontvangen scherpe afdrukken. Jouw reputatie als verkoper blijft sterk. Commerciële licentie is inbegrepen bij €144 per jaar.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Tafels Oefenen Aanvullen met 3000+ Afbeeldingen - Complete Beeldbibliotheek',
        description: `Toegang tot meer dan 3000 kindvriendelijke afbeeldingen. Alle plaatjes zijn georganiseerd per thema. Dieren, voertuigen, eten, natuur, seizoenen en meer. Zoek op trefwoord of blader door categorieën.

De bibliotheek bevat ook achtergronden en randen. Kies een passende achtergrond voor je thema. Voeg een decoratieve rand toe. Alle visuele elementen zijn inbegrepen.

Combineer sudoku met tafels oefenen materiaal. Gebruik dezelfde thema-afbeeldingen. Creëer herkenbare leerpakketten. Kinderen associëren plaatjes met leeractiviteiten.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Sommen tot 20 Kwaliteit met 300 DPI - Professionele Downloads',
        description: `Elke download heeft 300 DPI resolutie. Dit is professionele printkwaliteit. Afbeeldingen blijven scherp op papier. Geen korrelige of wazige afdrukken.

Kies tussen PDF en JPEG formaat. PDF is ideaal voor meerdere pagina's. JPEG werkt perfect voor individuele werkbladen. Beide formaten printen uitstekend thuis.

De grijstinten optie bespaart inkt. Zet kleuren om naar zwart-wit met een klik. Ideaal voor grote aantallen prints. Werkbladen groep 3 en sommen tot 20 oefeningen in inktbesparende kwaliteit.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '✅',
        title: 'Schrijven Oefenen Combineren met Puzzels - Antwoordsleutels Automatisch',
        description: `Elke puzzel krijgt automatisch een antwoordsleutel. Genereer eerst het werkblad. Klik daarna op antwoordsleutel genereren. Beide versies zijn direct downloadbaar.

Antwoordsleutels besparen nakijktijd. Leerlingen kunnen zelf controleren. Of gebruik ze voor snelle beoordeling. Perfect bij schrijven oefenen en andere zelfstandige werkvormen.

De tabbladen scheiden werkblad en antwoorden. Wissel eenvoudig tussen beide weergaves. Bewerk elk apart naar wens. Download beide als set voor complete lespakketten.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from sudoku.md step sections
  howTo: {
    sectionTitle: 'Sudoku Werkbladen Maken in 5 Stappen - Oefenbladen Gratis voor Groep 1 2 3',
    sectionDescription: 'Maak je eerste sudoku werkblad in minder dan drie minuten. Het proces is eenvoudig en intuïtief. Volg deze vijf stappen voor perfecte resultaten. Geen ervaring met ontwerpen nodig. Iedereen kan professionele werkbladen kleuters en werkbladen groep 3 maken.',
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
        title: 'Stap 1: Kies je Afbeeldingen voor Rekenen Werkbladen - Thema of Individueel',
        description: `Begin met het selecteren van afbeeldingen voor je puzzel. Je hebt twee opties. Kies een compleet thema of selecteer individuele plaatjes.

Bij themaselectie kiest de generator automatisch vier passende afbeeldingen. Thema's omvatten dieren, voertuigen, fruit, seizoenen en meer. Perfect voor snelle werkbladen groep 3 creatie. Alle plaatjes passen bij elkaar qua stijl.

Voor meer controle selecteer je individuele afbeeldingen. Blader door de bibliotheek met 3000+ plaatjes. Gebruik de zoekfunctie voor specifieke items. Klik op vier afbeeldingen naar keuze. Ze verschijnen in het selectievak.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Stel Moeilijkheidsgraad in voor Sommen tot 20 Niveau - Makkelijk tot Moeilijk',
        description: `Kies de moeilijkheidsgraad voor je puzzel. Dit bepaalt hoeveel vakjes leeg blijven. Drie niveaus zijn beschikbaar.

Makkelijk heeft vier lege vakjes. Perfect voor beginners en werkbladen kleuters. Kinderen leren de basisregels zonder frustratie. Ideaal voor eerste kennismaking met sudoku.

Medium bevat zes lege vakjes. Geschikt voor kinderen met enige ervaring. Vergelijkbaar met sommen tot 20 qua uitdaging. Een goede tussenstap naar moeilijker werk.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer je Werkbladen Kleuters - Direct Resultaat Bekijken',
        description: `Klik op de blauwe genereerknop. Je puzzel verschijnt direct op het canvas. Het 4x4 rooster toont je gekozen afbeeldingen. Lege vakjes zijn wit gemarkeerd.

De generator plaatst afbeeldingen volgens sudoku regels. Elke rij bevat elk plaatje precies een keer. Elke kolom bevat elk plaatje precies een keer. Dit garandeert een oplosbare puzzel.

Bekijk het resultaat op het canvas. Zoom in voor details. Controleer of de afbeeldingen duidelijk zichtbaar zijn. Het werkblad is nu klaar voor bewerking of download.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas voor Veilig Leren Lezen Combinaties - Volledige Aanpassing',
        description: `Nu kun je het werkblad volledig aanpassen. Elk element is bewerkbaar. Dit onderscheidt onze tool van statische generators.

Voeg een titel toe bovenaan. Klik op tekst toevoegen. Typ bijvoorbeeld "Sudoku Puzzel" of de naam van je leerling. Kies lettertype, grootte en kleur. Plaats de tekst waar je wilt.

Sleep afbeeldingen naar andere posities. Vergroot of verklein elementen. Draai plaatjes in elke hoek. Verwijder wat je niet nodig hebt. Volledige creatieve vrijheid.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Oefenbladen Gratis als PDF - Werkbladen Groep 3 Printen',
        description: `Je werkblad is klaar voor download. Klik op de downloadknop. Kies je gewenste formaat.

PDF is ideaal voor werkbladen groep 3 en kleurplaten combinaties. Het formaat behoudt perfecte kwaliteit. Print meerdere pagina's eenvoudig. Deel bestanden digitaal met collega's.

JPEG werkt uitstekend voor individuele werkbladen. Snel te delen via e-mail of chat. Eenvoudig in te voegen in andere documenten. Beide formaten hebben 300 DPI kwaliteit.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from sudoku.md use case sections
  useCases: {
    sectionTitle: 'Sudoku Werkbladen voor Leerkrachten en Ouders - Oefenbladen Gratis voor Iedereen',
    sectionDescription: 'Onze sudoku generator is ontworpen voor diverse gebruikers. Van kleuterjuffen tot thuisonderwijzers. Van basisschoolleerkrachten tot ondernemende docenten. Hieronder ontdek je hoe verschillende groepen profiteren. Iedereen vindt werkbladen kleuters en werkbladen groep 3 voor hun specifieke situatie.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 met Werkbladen Kleuters - Fijne Motoriek Ontwikkelen',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Kleuterleidsters gebruiken sudoku voor vroege ontwikkeling. Visuele puzzels zijn perfect voor fijne motoriek training. Kinderen wijzen naar plaatjes en vergelijken vormen. Dit versterkt hand-oog coördinatie.

In groep 1 2 leren kinderen basisvaardigheden. Sudoku introduceert logisch denken spelenderwijs. Geen cijfers nodig, alleen herkenbare afbeeldingen. Kleuters begrijpen de regels intuïtief.

Combineer sudoku met andere werkbladen kleuters activiteiten. Wissel af met kleurplaten voor variatie. Voeg fijne motoriek oefeningen toe aan je dagplanning. Creëer thematische weken met bijpassende puzzels.`,
        quote: 'Mijn kleuters vinden de kleurrijke sudoku puzzels geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 met Rekenen Werkbladen - Logisch Denken Stimuleren',
        subtitle: 'Werkbladen groep 3 en logisch denken',
        description: `In groep 3 start formeel onderwijs. Sudoku sluit perfect aan bij rekenen werkbladen. Beide trainen logisch redeneren. Kinderen schakelen tussen cijfers en beelden.

Groep 3 leerlingen werken met veilig leren lezen. Sudoku biedt afwisseling van taalactiviteiten. De puzzels activeren andere hersendelen. Dit bevordert concentratie en focus.

Gebruik medium moeilijkheidsgraad voor groep 3. Zes lege vakjes vormen een goede uitdaging. Leerlingen die sommen tot 20 beheersen, kunnen ook sudoku aan. De cognitieve vaardigheden overlappen.`,
        quote: 'Sudoku puzzels passen perfect bij onze leesmethode.',
      },
      {
        id: '3',
        icon: '🧮',
        title: 'Leerkrachten Groep 4 5 met Tafels Oefenen - Afwisseling in Rekenles',
        subtitle: 'Tafels oefenen en afwisseling',
        description: `Bovenbouwleerkrachten zoeken variatie. Tafels oefenen kan eentonig worden. Sudoku biedt welkome afwisseling zonder rekenfocus te verliezen.

In groep 4 en 5 kunnen leerlingen moeilijke puzzels aan. Acht lege vakjes vereisen doorzettingsvermogen. Dit past bij de ontwikkeling van oudere kinderen. Ze leren omgaan met complexere uitdagingen.

Combineer sudoku met sommen tot 20 herhalingsoefeningen. Maak complete rekenpakketten. Wissel cijferwerk af met beeldpuzzels. Leerlingen blijven gemotiveerd door variatie.`,
        quote: 'Rekenen wordt leuker met puzzelelementen erbij.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders met Oefenbladen Gratis - Flexibel Lesmateriaal',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Thuisonderwijzers waarderen flexibiliteit. Onze generator biedt oefenbladen gratis maken wanneer je wilt. Geen wachten op leveringen. Direct printen en gebruiken.

Pas puzzels aan op je kind. Upload foto's van huisdieren of familieleden. Maak sudoku persoonlijk en motiverend. Kinderen herkennen bekende gezichten.

Combineer sudoku met andere vakken. Gebruik het als beloning na rekenen werkbladen. Of als rustige activiteit tussen lessen. De visuele puzzels bieden mentale pauze.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '5',
        icon: '🌐',
        title: 'NT2 en Taalonderwijs met Veilig Leren Lezen - Woordenschat Uitbreiden',
        subtitle: 'Werkbladen groep 3 voor NT2',
        description: `Taalleerkrachten gebruiken sudoku voor woordenschat. Afbeeldingsnamen verschijnen in het Nederlands. Kinderen leren woorden bij elk plaatje. Dit ondersteunt veilig leren lezen programma's.

De 11 taalondersteuning helpt meertalige klassen. Wissel tussen Nederlands en andere talen. Vergelijk woorden in verschillende talen. Ideaal voor NT2 onderwijs.

Visuele puzzels zijn taalarm. Instructies zijn minimaal. Nieuwkomers kunnen direct meedoen. Ze voelen zich succesvol ondanks taalbarrières.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Ondernemende Leerkrachten met Kleurplaten Verkopen - Commerciële Mogelijkheden',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Wil je bijverdienen met lesmateriaal? Je Basispakket abonnement bevat commerciële rechten. Verkoop je werkbladen zonder extra kosten. De licentie is inbegrepen bij €144 per jaar.

Maak thematische bundels voor verkoop. Combineer sudoku met kleurplaten en rekenen werkbladen. Seizoenspakketten verkopen uitstekend. Denk aan Sinterklaas, Kerst of Pasen.

Verkoop op Teachers Pay Teachers Nederland. Of bied aan via Etsy. Amazon KDP accepteert ook puzzelboeken. Meerdere verkoopkanalen maximaliseren bereik.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from sudoku.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Sudoku Werkbladen - Oefenbladen Gratis en Meer',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over onze sudoku generator. Van kosten tot mogelijkheden. Van printen tot verkopen. Vind snel antwoord op jouw vraag over werkbladen groep 3 en werkbladen kleuters.',
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
        question: 'Is de Sudoku Generator met Rekenen Werkbladen Echt Gratis te Gebruiken?',
        answer: 'De sudoku werkbladen generator vereist een Basispakket abonnement. Dit kost €144 per jaar of €15 per maand. Met je abonnement maak je onbeperkt sudoku puzzels zonder extra kosten per werkblad. Het Basispakket bevat tien populaire generators. Naast sudoku krijg je toegang tot rekenen werkbladen, kleurplaten, alfabet werkbladen en meer. Eén prijs voor tien tools. Volledige Toegang kost €240 per jaar en geeft toegang tot alle 33 generators. Beide abonnementen bevatten commerciële licentie, 11 talen ondersteuning en 300 DPI exports.',
      },
      {
        id: '2',
        question: 'Kan ik Werkbladen Groep 3 Thuis Printen op een Gewone Printer?',
        answer: 'Ja, alle werkbladen zijn ontworpen voor thuisprinten. De 300 DPI resolutie zorgt voor scherpe afdrukken. Gebruik standaard kopieerpapier of dikker papier naar wens. Selecteer bij het printen "Werkelijke grootte" of "100%". Vermijd schalen voor beste resultaten. Zowel inkjet als laserprinters werken uitstekend. De grijstinten optie bespaart inkt. Activeer deze voor zwart-wit prints. Ideaal voor grote aantallen werkbladen groep 3 of sommen tot 20 oefeningen.',
      },
      {
        id: '3',
        question: 'Heb ik Ontwerpvaardigheden Nodig voor Oefenbladen Gratis Maken?',
        answer: 'Nee, geen enkele ontwerpervaring is nodig. De generator doet al het werk. Selecteer afbeeldingen, kies moeilijkheid, klik genereren. Klaar. De interface is intuïtief ontworpen. Knoppen zijn duidelijk gelabeld. Tooltips helpen bij elke stap. Binnen vijf minuten maak je je eerste puzzel. Wil je toch aanpassen? Het canvas biedt volledige bewerkingsmogelijkheden. Sleep, roteer en schaal elementen. Maar dit is optioneel, niet vereist.',
      },
      {
        id: '4',
        question: 'Mag ik Sudoku met Tafels Oefenen Gebruiken in mijn Klaslokaal?',
        answer: 'Ja, je Basispakket abonnement omvat onbeperkt klaslokaalgebruik. Print zoveel werkbladen als je nodig hebt. Deel met alle leerlingen in je klas. Maak puzzels voor verschillende niveaus. Combineer sudoku met tafels oefenen materiaal. Creëer complete leerpakketten voor je groep. Er zijn geen beperkingen op aantal prints of leerlingen. Je abonnement dekt al je onderwijsbehoeften voor sudoku en negen andere generators.',
      },
      {
        id: '5',
        question: 'In Welke Talen zijn Werkbladen Kleuters met Veilig Leren Lezen Beschikbaar?',
        answer: 'De generator ondersteunt elf talen volledig. Nederlands, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors, Fins en Engels. Alle menu\'s verschijnen in je gekozen taal. Afbeeldingsnamen zijn vertaald. Dit ondersteunt veilig leren lezen programma\'s en woordenschatontwikkeling. Wissel tussen talen met één klik. Maak dezelfde puzzel in meerdere talen. Ideaal voor meertalig onderwijs en werkbladen kleuters in verschillende talen.',
      },
      {
        id: '6',
        question: 'Kan ik Kleurplaten en Sudoku Verkopen die ik met deze Generator Maak?',
        answer: 'Ja, je Basispakket abonnement bevat volledige commerciële POD-licentie. Verkoop je werkbladen zonder extra kosten. Geen aparte licentie nodig. Verkoop op Teachers Pay Teachers, Etsy of Amazon KDP. Maak bundels met kleurplaten en sudoku. Thematische pakketten verkopen uitstekend. De 300 DPI kwaliteit is professioneel genoeg voor verkoop. Kopers ontvangen scherpe downloads. Bouw een winstgevende bijverdienste met je creaties.',
      },
      {
        id: '7',
        question: 'Hoe Pas ik Sommen tot 20 Werkbladen aan voor Mijn Leerlingen?',
        answer: 'Aanpassen is eenvoudig via het bewerkbare canvas. Nadat je een puzzel genereert, kun je alles wijzigen. Voeg tekst toe, verplaats elementen, pas kleuren aan. Combineer sudoku met sommen tot 20 door extra elementen toe te voegen. Plaats rekenopgaven naast de puzzel. Creëer complete werkbladen. Upload eigen afbeeldingen voor personalisatie. Gebruik klasfoto\'s of thematische plaatjes. Maak puzzels die perfect aansluiten bij je les.',
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijden zijn Fijne Motoriek Sudoku Werkbladen Geschikt?',
        answer: 'Visuele sudoku is ideaal voor kinderen van 4 tot 9 jaar. Groep 1 2 kleuters beginnen met makkelijke puzzels. Groep 3, 4 en 5 leerlingen kunnen moeilijkere niveaus aan. De puzzels ondersteunen fijne motoriek ontwikkeling. Kinderen wijzen, vergelijken en selecteren. Geen schrijfvaardigheid vereist voor succes. Pas de moeilijkheidsgraad aan per leeftijd. Makkelijk voor kleuters, medium voor groep 3, moeilijk voor bovenbouw. Elke leeftijd vindt passende uitdaging.',
      },
      {
        id: '9',
        question: 'Kan ik Eigen Afbeeldingen Uploaden voor Letters Leren Puzzels?',
        answer: 'Ja, de generator ondersteunt eigen uploads. Klik op de upload sectie. Selecteer JPEG, PNG of GIF bestanden. Meerdere bestanden tegelijk uploaden is mogelijk. Combineer uploads met bibliotheekafbeeldingen. Gebruik vier eigen foto\'s of mix met standaardplaatjes. Ideaal voor letters leren met persoonlijke beelden. Uploads blijven beschikbaar tijdens je sessie. Maak meerdere puzzels met dezelfde afbeeldingen. Perfect voor thematische series.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt het om Rekenen Werkbladen met Sudoku te Maken?',
        answer: 'Een complete sudoku puzzel maak je in drie minuten. Selecteer afbeeldingen, kies instellingen, klik genereren. Het resultaat verschijnt direct. Wil je aanpassen? Reken vijf tot tien minuten extra. Voeg titels toe, pas kleuren aan, combineer met rekenen werkbladen elementen. Vergelijk dit met handmatig maken: dertig tot zestig minuten per puzzel. De tijdsbesparing is enorm. Maak tien puzzels in de tijd van één handgemaakte.',
      },
      {
        id: '11',
        question: 'Bevatten Sudoku Oefenbladen Gratis ook Antwoordsleutels?',
        answer: 'Ja, elke puzzel krijgt automatisch een antwoordsleutel. Genereer eerst het werkblad. Klik daarna op "Antwoordsleutel Genereren". Beide zijn direct downloadbaar. De antwoordsleutel toont de complete oplossing. Alle vakjes zijn ingevuld met de juiste afbeeldingen. Nakijken kost slechts seconden. Download werkblad en antwoord als set. Of print alleen werkbladen voor leerlingen. Oefenbladen gratis met antwoorden maken was nog nooit zo makkelijk.',
      },
      {
        id: '12',
        question: 'Kan ik Werkbladen Groep 3 over Specifieke Schoolonderwerpen Maken?',
        answer: 'Ja, de themabibliotheek bevat duizenden afbeeldingen. Dieren, voertuigen, fruit, groenten, seizoenen, feestdagen en meer. Kies plaatjes die passen bij je les. Behandel je boerderijdieren? Selecteer koe, varken, kip en schaap. Werken aan verkeer? Kies auto, fiets, bus en trein. Werkbladen groep 3 sluiten perfect aan bij je curriculum. Upload eigen afbeeldingen voor specifieke onderwerpen. Foto\'s uit schoolboeken of actuele gebeurtenissen. Volledige flexibiliteit voor elk onderwerp.',
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
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Sudoku met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'Het Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer sudoku werkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer sudoku met optelwerkbladen voor complete rekenlessen met visuele plaatjes.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide sudoku puzzels met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Verbinden',
        category: 'Logica',
        icon: '🔗',
        description: 'Combineer met verbindingswerkbladen voor patroonherkenning en visuele vaardigheden.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Rekenen',
        icon: '🔢',
        description: 'Vul sudoku aan met Zoek en Tel voor extra telvaardigheden en visuele concentratie.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast logische puzzels.',
      },
      {
        id: '6',
        slug: 'picture-bingo',
        name: 'Plaatjes Bingo',
        category: 'Logica',
        icon: '🎯',
        description: 'Combineer met Plaatjes Bingo voor extra visuele herkenning en groepsactiviteiten.',
      },
    ],
  },
};

export default sudokuNlContent;
