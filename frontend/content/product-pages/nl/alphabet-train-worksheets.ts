import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Alphabet Train Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/alphabet-train-worksheets.ts
 * URL: /nl/apps/alfabet-trein-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/alphabet-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Letters leren
 * 4. Kleurplaten
 * 5. Oefenbladen gratis
 * 6. Veilig leren lezen
 * 7. Fijne motoriek
 * 8. Schrijven oefenen
 * 9. Alfabet werkbladen
 * 10. Groep 1 2
 */

export const alphabetTrainNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'alfabet-trein-werkbladen',
    appId: 'alphabet-train',
    title: 'Alfabet Trein Gratis Werkbladen Generator | Gratis Werkbladen',
    description: 'Maak gratis werkbladen voor alfabet trein met deze professionele generator. Letters leren werkblad voor kinderen, kleuters en groep 3. Download als PDF -.',
    keywords: 'gratis werkblad, gratis werkbladen, werkblad voor kinderen, werkblad voor kleuters, gratis printables, alfabet trein werkbladen, letters leren, werkbladen kleuters, werkbladen groep 3, oefenbladen gratis',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/alfabet-trein-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/alphabet-train/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Alfabet trein gratis werkblad - letters leren voor kleuters en groep 3'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/alphabet-train/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad voor kinderen - alfabet trein letters leren'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/alphabet-train/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen alfabet trein - werkblad voor kleuters'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/alphabet-train/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Letters leren gratis printables - alfabet werkblad voor kinderen'
      },
    ]
  },

  // Hero Section - FULL text from alphabet-train.md
  hero: {
    title: 'Alfabet Trein Gratis Werkbladen',
    subtitle: 'Letters Leren Werkblad voor Kinderen en Kleuters - Gratis Printables',
    description: `Maak professionele alfabet trein werkbladen waarmee kinderen spelenderwijs letters leren. Met je Basispakket abonnement krijg je onbeperkte toegang tot deze werkbladen generator. Geen extra kosten per werkblad. Download direct als PDF of JPEG in hoge kwaliteit.

De Alfabet Trein werkbladen generator helpt leerkrachten en ouders bij het maken van letters leren materiaal. Elk werkblad toont een kleurrijke trein met wagons. In elke wagon staat een letter met een bijpassende afbeelding. Kinderen leren zo het alfabet door visuele associatie. Perfect voor werkbladen kleuters en groep 1 2.

Deze werkbladen generator biedt meer dan 3000 kindvriendelijke afbeeldingen. Kies een thema of selecteer afzonderlijke plaatjes. De trein bevat 11 wagons voor 11 letters. Ideaal voor oefenbladen gratis te downloaden en thuis uit te printen. Kinderen verbinden elke letter met een herkenbaar beeld. Dit ondersteunt het visueel geheugen.`,
    previewImageSrc: '/samples/dutch/alphabet-train/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
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
        worksheetSrc: '/samples/dutch/alphabet-train/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/alphabet-train/sample-1-answer.jpeg',
        altText: 'Alfabet trein gratis werkblad - letters leren voor kleuters en groep 3',
        pdfDownloadUrl: '/samples/dutch/alphabet-train/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/dutch/alphabet-train/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/alphabet-train/sample-2-answer.jpeg',
        altText: 'Alfabet trein gratis werkblad voor kinderen - werkbladen kleuters',
        pdfDownloadUrl: '/samples/dutch/alphabet-train/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/dutch/alphabet-train/sample-3.jpeg',
        answerKeySrc: '/samples/dutch/alphabet-train/sample-3-answer.jpeg',
        altText: 'Letters leren gratis werkbladen - werkblad voor kinderen groep 1 2',
        pdfDownloadUrl: '/samples/dutch/alphabet-train/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/dutch/alphabet-train/sample-4.jpeg',
        answerKeySrc: '/samples/dutch/alphabet-train/sample-4-answer.jpeg',
        altText: 'Alfabet werkblad voor kleuters - gratis printables letters leren',
        pdfDownloadUrl: '/samples/dutch/alphabet-train/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from alphabet-train.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'De Alfabet Trein werkbladen generator bevat alle functies die je nodig hebt. Van snelle creatie tot professionele export. Hieronder vind je een overzicht van de belangrijkste mogelijkheden. Elke functie is ontworpen om het maken van oefenbladen gratis en eenvoudig te maken.',
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
        title: 'Letters Leren Gratis Werkbladen in 3 Klikken - Snel en Eenvoudig',
        description: `Maak werkbladen kleuters in slechts drie stappen. Kies eerst een thema of selecteer afzonderlijke afbeeldingen. Bepaal vervolgens welke letters je wilt gebruiken. Klik daarna op 'Genereren' en je werkblad verschijnt direct. Geen ingewikkelde software nodig. Geen technische kennis vereist. Binnen drie minuten heb je een professioneel werkblad. Perfect voor drukke leerkrachten groep 1 2.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Volledig Bewerkbaar Canvas - Werkblad voor Kinderen Aanpassen',
        description: `Elk element op het werkblad is aanpasbaar. Sleep afbeeldingen naar een andere plek. Vergroot of verklein letters en plaatjes. Draai elementen naar elke hoek. Verwijder wat je niet nodig hebt. Voeg extra tekst toe voor instructies. Werkbladen groep 3 worden zo volledig gepersonaliseerd. Je hebt volledige controle over het eindresultaat. Dit maakt de generator uniek flexibel.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden - Gratis Werkblad Personaliseren',
        description: `Upload je eigen foto's en afbeeldingen. Gebruik klasfoto's of thematische plaatjes. Combineer geüploade afbeeldingen met de bibliotheek. Maak oefenbladen gratis met persoonlijke content. Ondersteunt JPEG, PNG en GIF formaten. Upload meerdere bestanden tegelijk. Ideaal voor projecten rond de klas of seizoenen. Kinderen herkennen eigen materiaal en zijn extra gemotiveerd.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Werkblad voor Kleuters in 11 Talen - Letters Leren in het Nederlands',
        description: `De generator ondersteunt 11 talen waaronder Nederlands. De interface is volledig in het Nederlands beschikbaar. Afbeeldingsnamen worden automatisch vertaald. Werkbladen kleuters bevatten Nederlandse letterbenamingen. Ook Duits, Frans, Spaans en meer zijn beschikbaar. Perfect voor internationale scholen. Ideaal voor meertalige gezinnen. Letters leren gebeurt zo in de juiste taal.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie Inbegrepen - Gratis Werkbladen Verkopen',
        description: `Met je Basispakket abonnement krijg je commerciële rechten. Verkoop je werkbladen op Teachers Pay Teachers. Bied ze aan op Etsy of Amazon KDP. Geen extra licentiekosten. Alle oefenbladen gratis van auteursrechtelijke beperkingen. Professionele kwaliteit van 300 DPI voor perfecte prints. Bouw een passief inkomen met je lesmateriaal. Veel docenten verdienen €500 tot €5000 per maand.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen - Gratis Printables Letters Leren Materiaal',
        description: `Kies uit meer dan 3000 kindvriendelijke afbeeldingen. Georganiseerd op thema voor snel zoeken. Dieren, voertuigen, voedsel, seizoenen en meer. Alle afbeeldingen zijn geschikt als kleurplaten. Hoge kwaliteit vectorillustraties. Zoekfunctie voor specifieke onderwerpen. Nieuwe thema's worden regelmatig toegevoegd. Letters leren wordt zo visueel aantrekkelijk. Kinderen blijven gefocust en gemotiveerd.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit - Werkblad voor Kinderen Afdrukken',
        description: `Download werkbladen in hoge resolutie. 300 DPI zorgt voor scherpe prints. Kies tussen JPEG en PDF formaat. Grijswaarden optie bespaart inkt. Perfect voor classroom printing. Geschikt voor professionele drukkers. Werkbladen groep 3 zien er altijd professioneel uit. Antwoordsleutels apart downloadbaar. Ideaal voor toetsen en huiswerk.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '✋',
        title: 'Fijne Motoriek Ontwikkelen - Werkblad voor Kleuters Schrijven Oefenen',
        description: `De Alfabet Trein stimuleert fijne motoriek ontwikkeling. Kinderen volgen de letters met hun vinger. Ze kleuren de afbeeldingen in de wagons. Werkbladen kleuters combineren visueel leren met motorische oefening. Dit bereidt voor op schrijven oefenen in groep 3. De grote, duidelijke letters zijn makkelijk na te tekenen. Fijne motoriek en letterherkenning gaan samen.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from alphabet-train.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van professionele werkbladen kleuters kost slechts enkele minuten. Volg deze vijf eenvoudige stappen. Van thema kiezen tot downloaden als PDF. Binnen drie minuten heb je een compleet werkblad. Geen ervaring nodig. Iedereen kan het.',
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
        title: 'Stap 1: Kies Je Thema voor Gratis Werkbladen - Letters Leren met Afbeeldingen',
        description: `Begin met het selecteren van een afbeeldingsthema. Kies uit meer dan 50 thema's zoals dieren, voertuigen of seizoenen. Het thema bepaalt welke plaatjes beschikbaar zijn. Voor werkbladen kleuters zijn dierenthema's zeer populair. Kinderen herkennen de afbeeldingen direct. Dit versterkt de koppeling tussen letter en beeld.

Je kunt ook de zoekfunctie gebruiken. Typ een woord en vind specifieke afbeeldingen. Combineer plaatjes uit verschillende thema's. Upload eigen foto's voor persoonlijke werkbladen. De flexibiliteit is enorm. Letters leren wordt zo volledig aanpasbaar aan jouw lesdoelen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Selecteer 11 Letters - Werkblad voor Kinderen Aanpassen',
        description: `De Alfabet Trein bevat precies 11 wagons. Kies welke 11 letters je wilt oefenen. Voor groep 1 2 begin je vaak met de eerste letters. Werkbladen groep 3 kunnen focussen op lastigere letters. Klik op elke letter in het selectierooster. De teller toont hoeveel letters geselecteerd zijn.

Je kunt ook de automatische modus gebruiken. De generator kiest dan willekeurig 11 letters. Ideaal voor snelle oefenbladen gratis maken. De handmatige modus geeft meer controle. Kies letters die aansluiten bij je lesweek. Stem af op de leesmethode die je gebruikt.`,
        icon: '🔤',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Wijs Afbeeldingen Toe - Gratis Werkblad Samenstellen',
        description: `Koppel elke letter aan een passende afbeelding. Klik op een plaatje in de bibliotheek. Het wordt toegewezen aan de volgende beschikbare letter. De afbeelding moet beginnen met die letter. Appel voor A, Boom voor B, enzovoort. Dit ondersteunt veilig leren lezen methodes.

De generator toont een voorvertoning van toegewezen afbeeldingen. Controleer of elke letter een plaatje heeft. Je kunt toewijzingen wijzigen door opnieuw te klikken. Voor fijne motoriek ontwikkeling kies herkenbare beelden. Kinderen kleuren deze later in. Duidelijke, eenvoudige illustraties werken het best.`,
        icon: '🔗',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Genereer en Bewerk - Werkblad voor Kleuters Personaliseren',
        description: `Klik op de knop 'Genereren' wanneer alles klaar is. Je werkblad verschijnt direct op het canvas. De trein met 11 wagons toont alle letters en afbeeldingen. Nu kun je alles bewerken. Sleep elementen naar andere posities. Vergroot of verklein plaatjes. Voeg tekst toe voor instructies.

De afbeeldingen zijn ook bruikbaar als kleurplaten. Kinderen kleuren de plaatjes terwijl ze letters leren. Voeg een titel toe bovenaan het werkblad. Activeer naam- en datumvelden voor leerlingen. Pas de achtergrond aan met decoratieve thema's. Voeg een rand toe voor een professionele uitstraling.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download als Gratis Printables - Werkbladen in Hoge Kwaliteit',
        description: `Je werkblad is klaar om te downloaden. Kies tussen PDF en JPEG formaat. PDF is ideaal voor afdrukken. JPEG werkt goed voor digitaal delen. Selecteer de grijswaarden optie om inkt te besparen. De resolutie is altijd 300 DPI voor scherpe prints.

Download ook de antwoordsleutel apart. Deze toont welke letter bij welk plaatje hoort. Perfect voor zelfstudie of toetsing. Oefenbladen gratis printen op elke standaard printer. Letter formaat en A4 worden beide ondersteund. Je werkbladen kleuters zijn nu klaar voor gebruik.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'De Alfabet Trein werkbladen generator is ontwikkeld voor iedereen die kinderen letters leert. Van kleuterleerkrachten tot thuisonderwijzende ouders. Hieronder vind je hoe verschillende gebruikers profiteren van deze tool. Ontdek hoe oefenbladen gratis je onderwijspraktijk verbeteren.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters voor Letters Leren in de Klas',
        subtitle: 'Gratis werkbladen en werkblad voor kleuters',
        description: `Leerkrachten in groep 1 en 2 werken dagelijks met kleuters aan letterherkenning. De Alfabet Trein biedt perfecte werkbladen kleuters voor deze leeftijdsgroep. Grote letters en kleurrijke afbeeldingen trekken de aandacht. Kinderen leren spelenderwijs het alfabet kennen.

Maak werkbladen die aansluiten bij je weekthema. Kies dierenafbeeldingen voor de dierenweek. Selecteer seizoensgebonden plaatjes voor herfst of lente. De generator past zich aan jouw lesplan aan. Fijne motoriek ontwikkeling wordt gestimuleerd door het inkleuren. Letters leren wordt zo een creatieve activiteit.`,
        quote: 'Mijn kleuters vinden de kleurrijke trein geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Werkbladen Groep 3 voor Veilig Leren Lezen',
        subtitle: 'Werkblad voor kinderen en gratis printables',
        description: `In groep 3 begint het formele leesonderwijs. Werkbladen groep 3 ondersteunen de overgang naar lezen. De Alfabet Trein versterkt de letter-klank koppeling. Elke letter wordt gekoppeld aan een herkenbaar woord en beeld. Dit sluit aan bij methodes voor veilig leren lezen.

Gebruik de werkbladen als extra oefenmateriaal naast de leesmethode. Focus op letters die leerlingen lastig vinden. Maak herhalingsoefeningen voor zwakkere lezers. De antwoordsleutel maakt zelfstudie mogelijk. Werkbladen groep 3 worden zo gedifferentieerd ingezet. Elk kind krijgt wat het nodig heeft.`,
        quote: 'Perfect aanvullend materiaal voor onze leesmethode.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders - Oefenbladen Gratis voor Letters Leren Thuis',
        subtitle: 'Gratis werkblad thuis printen',
        description: `Steeds meer ouders kiezen voor thuisonderwijs of willen thuis extra oefenen. De Alfabet Trein maakt professionele oefenbladen gratis van complexe voorbereiding. Geen pedagogische achtergrond nodig. De generator doet het werk voor je.

Maak werkbladen die aansluiten bij de interesses van je kind. Upload foto's van huisdieren of favoriete speelgoed. Personaliseer het leerproces volledig. Letters leren wordt zo een leuke thuisactiviteit. Print werkbladen voor rustige middagen of regenachtige dagen. Fijne motoriek oefeningen houden kleine handen bezig.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'NT2 en Taalonderwijs - Werkbladen Kleuters in 11 Talen voor Nieuwkomers',
        subtitle: 'Werkblad voor kinderen in meerdere talen',
        description: `De generator ondersteunt 11 talen waaronder Nederlands. Perfect voor NT2 onderwijs aan nieuwkomers. Werkbladen kleuters helpen anderstalige kinderen het Nederlandse alfabet leren. Afbeeldingen overbruggen taalbarrières. Visueel leren werkt universeel.

Internationale scholen profiteren van de meertalige ondersteuning. Maak werkbladen in de moedertaal én het Nederlands. Vergelijk alfabetten tussen talen. Letters leren wordt zo intercultureel onderwijs. De Alfabet Trein verbindt talen door beelden.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '5',
        icon: '🧠',
        title: 'Speciaal Onderwijs - Fijne Motoriek en Letters Leren met Aangepaste Werkbladen',
        subtitle: 'Werkblad voor kleuters aangepast onderwijs',
        description: `Leerlingen met speciale onderwijsbehoeften hebben vaak extra visuele ondersteuning nodig. De Alfabet Trein biedt duidelijke, overzichtelijke werkbladen. Grote letters en herkenbare afbeeldingen verminderen cognitieve belasting. Fijne motoriek oefeningen zijn aanpasbaar aan elk niveau.

Maak werkbladen met minder letters voor gefocust oefenen. Kies simpele, concrete afbeeldingen. Herhaal dezelfde letters in meerdere werkbladen. De bewerkbare canvas maakt aanpassingen eenvoudig. Speciaal onderwijs professionals waarderen de flexibiliteit. Elk kind krijgt materiaal op maat.`,
        quote: 'De flexibiliteit is perfect voor mijn leerlingen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Ondernemende Docenten - Kleurplaten en Werkbladen Verkopen op Teachers Pay Teachers',
        subtitle: 'Gratis werkbladen commercieel verkopen',
        description: `Met je Basispakket abonnement krijg je commerciële rechten. Verkoop je Alfabet Trein werkbladen online. Teachers Pay Teachers, Etsy en Amazon KDP zijn populaire platforms. Kleurplaten en educatieve werkbladen verkopen goed.

Maak complete alfabetpakketten voor verschillende thema's. Seizoenspakketten voor herfst, winter, lente en zomer. Dierthema's voor natuurliefhebbers. De 300 DPI kwaliteit is professioneel verkoopbaar. Veel docenten verdienen €500 tot €5000 per maand met werkbladen. Bouw een passief inkomen naast je reguliere baan.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from alphabet-train.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Heb je vragen over de Alfabet Trein generator? Hier vind je antwoorden op de meest gestelde vragen. Van abonnementskosten tot technische mogelijkheden.',
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
        question: 'Is de Alfabet Trein Generator Echt Gratis voor Werkbladen Maken?',
        answer: 'De Alfabet Trein werkbladen generator vereist een Basispakket abonnement. Dit kost €144 per jaar of €15 per maand. Met je abonnement maak je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad. Genereer zoveel alfabet werkbladen als je nodig hebt zonder bijkomende kosten. Het Basispakket bevat 10 populaire werkbladen generators. Volledige Toegang kost €240 per jaar en bevat alle 33 generators. Beide abonnementen bevatten commerciële licentie, 11 talen ondersteuning en professionele 300 DPI kwaliteit exports.',
      },
      {
        id: '2',
        question: 'Kan Ik Gratis Werkbladen Thuis Printen op een Gewone Printer?',
        answer: 'Ja, alle werkbladen zijn ontworpen voor thuisprinten. Kleurplaten en alfabet werkbladen printen perfect op standaard inkjet of laser printers. Kies tussen A4 en Letter formaat. De grijswaarden optie bespaart inkt voor dagelijks gebruik. De 300 DPI resolutie zorgt voor scherpe prints. Tekst en afbeeldingen zijn helder en duidelijk leesbaar. Kinderen kunnen de kleurplaten prima inkleuren. Fijne motoriek oefeningen komen goed tot hun recht op gewoon kopieerpapier.',
      },
      {
        id: '3',
        question: 'Heb Ik Vaardigheden Nodig voor Werkblad voor Kinderen Maken?',
        answer: 'Nee, geen enkele ontwerpervaring is nodig. De generator doet al het werk voor je. Kies een thema, selecteer letters en afbeeldingen, en klik op genereren. Werkbladen kleuters verschijnen direct op het canvas. De interface is volledig in het Nederlands. Alles is drag-and-drop. Sleep elementen naar de gewenste positie. Vergroot of verklein met simpele handgrepen. Zelfs technisch onervaren gebruikers maken binnen minuten professionele werkbladen. Letters leren materiaal maken was nog nooit zo eenvoudig.',
      },
      {
        id: '4',
        question: 'Mag Ik Gratis Werkbladen Gebruiken in Mijn Klas?',
        answer: 'Je Basispakket abonnement geeft onbeperkte klassenlicentie. Gebruik werkbladen voor veilig leren lezen in je hele klas. Print voor elke leerling een kopie. Geen beperkingen op het aantal leerlingen of prints per dag. De werkbladen sluiten aan bij gangbare leesmethodes. Versterk de letter-klank koppeling met visuele ondersteuning. Veilig leren lezen wordt effectiever met herkenbare afbeeldingen. Gebruik de antwoordsleutel voor zelfstudie of toetsing.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Gratis Printables Beschikbaar?',
        answer: 'De generator ondersteunt 11 talen. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Werkbladen kleuters zijn beschikbaar in elke taal. De interface vertaalt automatisch. Afbeeldingsnamen passen zich aan de gekozen taal aan. Perfect voor NT2 onderwijs en internationale scholen. Letters leren in de moedertaal én het Nederlands. Vergelijk alfabetten tussen talen. De meertalige ondersteuning maakt de generator uniek veelzijdig.',
      },
      {
        id: '6',
        question: 'Kan Ik Gratis Werkbladen Verkopen die Ik Maak?',
        answer: 'Ja, je Basispakket abonnement bevat volledige commerciële print-on-demand licentie. Verkoop je kleurplaten en werkbladen op Teachers Pay Teachers. Bied ze aan op Etsy of Amazon KDP. Geen extra licentiekosten of attributie vereist. De 300 DPI kwaliteit is professioneel verkoopbaar. Maak complete alfabetpakketten. Seizoensbundels en themacollecties verkopen goed. Veel docenten verdienen €500 tot €5000 per maand met educatieve werkbladen.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik een Werkblad voor Kinderen Aan?',
        answer: 'De generator biedt volledige bewerkbaarheid. Werkbladen groep 3 kun je volledig aanpassen. Kies welke 11 letters je wilt oefenen. Selecteer afbeeldingen die aansluiten bij je lesweek. Upload eigen foto\'s voor personalisatie. Op het canvas bewerk je elk element. Sleep, vergroot, verklein of verwijder onderdelen. Voeg tekst toe voor instructies. Pas kleuren en lettertypen aan. Fijne motoriek oefeningen worden zo op maat gemaakt voor jouw groep.',
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijdsgroepen Werkt het Werkblad voor Kleuters?',
        answer: 'De Alfabet Trein is ideaal voor kinderen van 4 tot 8 jaar. Groep 1-2 kleuters beginnen met letterherkenning. Groep 3 leerlingen versterken hun leesvaardigheden. Fijne motoriek ontwikkeling wordt gestimuleerd door het inkleuren van de afbeeldingen. De grote, duidelijke letters zijn geschikt voor jonge kinderen. Oudere leerlingen die extra ondersteuning nodig hebben profiteren ook. Fijne motoriek oefeningen blijven waardevol tot en met groep 4.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Gratis Werkbladen?',
        answer: 'Ja, de generator ondersteunt het uploaden van eigen afbeeldingen. Gebruik klasfoto\'s of thematische plaatjes. Combineer geüploade afbeeldingen met de bibliotheek van 3000+ plaatjes. Werkbladen kleuters worden zo volledig gepersonaliseerd. Ondersteunde formaten zijn JPEG, PNG en GIF. Upload meerdere bestanden tegelijk. Ideaal voor projecten rond de klas, seizoenen of speciale thema\'s. Kinderen herkennen eigen materiaal en zijn extra gemotiveerd voor letters leren.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om een Gratis Werkblad te Maken?',
        answer: 'Een standaard alfabet werkblad maak je in 3 minuten. Van thema kiezen tot downloaden als PDF. De generator is ontworpen voor snelheid en efficiëntie. Kies een thema, selecteer letters, genereer en download. Na wat oefening maak je een heel weekpakket in dertig minuten. De tijdsbesparing ten opzichte van handmatig maken is enorm. Meer tijd voor wat echt belangrijk is: lesgeven.',
      },
      {
        id: '11',
        question: 'Bevatten Gratis Werkbladen Antwoordsleutels?',
        answer: 'Ja, elke werkblad heeft een bijpassende antwoordsleutel. Download de antwoordsleutel apart als PDF of JPEG. De sleutel toont welke letter bij welk plaatje hoort. Perfect voor veilig leren lezen toetsen en zelfstudie. Leerkrachten gebruiken de antwoordsleutel voor snelle correctie. Leerlingen kunnen zelfstandig controleren. Ouders helpen thuis met de antwoordsleutel. Veilig leren lezen wordt zo ondersteund in elke situatie.',
      },
      {
        id: '12',
        question: 'Kan Ik Naast Alfabet ook Rekenen Werkblad voor Kinderen Maken?',
        answer: 'Ja, het Basispakket bevat meerdere generators. Naast de Alfabet Trein maak je ook rekenen werkbladen. Sommen tot 20 oefenbladen voor groep 3. Tafels oefenen werkbladen voor groep 4 en 5. Alles in één abonnement. Combineer taal en rekenen in thematische weekpakketten. Gebruik dezelfde afbeeldingsthema\'s voor consistentie. Tafels oefenen wordt leuker met herkenbare plaatjes. Rekenen werkbladen en alfabet werkbladen vullen elkaar perfect aan.',
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
    sectionDescription: 'Het Basispakket bevat 10 werkbladen generators die perfect samenwerken. Combineer de Alfabet Trein met andere tools voor complete leerpakketten. Van rekenen werkbladen tot kleurplaten. Van sommen tot 20 tot tafels oefenen. Hieronder ontdek je krachtige combinaties voor effectief onderwijs.',
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
        description: 'Combineer alfabet werkbladen met woordzoekers voor taalrijke lessen met Veilig leren lezen woorden.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide alfabet werkbladen met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '3',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer letters leren met rekenen werkbladen. Kinderen tellen plaatjes terwijl ze letters herkennen.',
      },
      {
        id: '4',
        slug: 'writing-app',
        name: 'Schrijven',
        category: 'Taal',
        icon: '✏️',
        description: 'Vul alfabet werkbladen aan met schrijfoefeningen voor complete letterherkenning en fijne motoriek training.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '📏',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast het letters leren met de trein.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Rekenen',
        icon: '🔢',
        description: 'Combineer met Zoek en Tel voor extra woordherhaling en visuele telvaardigheden.',
      },
    ],
  },
};

export default alphabetTrainNlContent;
