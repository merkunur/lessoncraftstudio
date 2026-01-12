import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Drawing Lines Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/lijnen-trekken-werkbladen.ts
 * URL: /nl/apps/lijnen-trekken-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/drawing-lines.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Oefenbladen gratis
 * 4. Fijne motoriek
 * 5. Schrijven oefenen
 * 6. Letters leren
 * 7. Veilig leren lezen
 * 8. Rekenen werkbladen
 * 9. Tafels oefenen
 * 10. Sommen tot 20
 *
 * PRICING: Core Bundle - €144/year or €15/month (Basispakket)
 */

export const drawingLinesNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'lijnen-trekken-werkbladen',
    appId: 'drawing-lines',
    title: 'Lijnen Trekken Werkbladen Generator - Oefenbladen Gratis voor Fijne Motoriek en Schrijven Oefenen',
    description: 'Maak professionele lijnen trekken werkbladen met onze gebruiksvriendelijke generator. Met je Basispakket abonnement creëer je onbeperkt werkbladen kleuters en werkbladen groep 3 zonder extra kosten per werkblad. Elk werkblad helpt kinderen bij fijne motoriek en schrijven oefenen.',
    keywords: 'lijnen trekken werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, schrijven oefenen, letters leren, veilig leren lezen, rekenen werkbladen, tafels oefenen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/lijnen-trekken-werkbladen',
  },

  // Hero Section
  hero: {
    title: 'Lijnen Trekken Werkbladen Gratis',
    subtitle: 'Oefenbladen voor Fijne Motoriek en Schrijven Oefenen',
    description: `Maak professionele lijnen trekken werkbladen met onze gebruiksvriendelijke generator. Met je Basispakket abonnement creëer je onbeperkt werkbladen kleuters en werkbladen groep 3 zonder extra kosten per werkblad. Elk werkblad helpt kinderen bij het ontwikkelen van fijne motoriek en schrijven oefenen. Download werkbladen in minder dan 3 minuten.

Lijnen trekken is een essentiële vaardigheid voor jonge kinderen. Het vormt de basis voor letters leren en schrijven oefenen. Onze generator maakt het eenvoudig om oefenbladen gratis te maken die aansluiten bij het niveau van groep 1-2 en groep 3. Kinderen in groep 3 beginnen met formeel schrijven oefenen en moeten lijnen kunnen controleren.

De fijne motoriek die nodig is voor schrijven ontwikkelt zich geleidelijk. Rechte lijnen, gebogen lijnen, diagonale lijnen - elk type vraagt andere spiercontrole. Onze generator biedt 8 verschillende sjablonen met diverse lijnpatronen. Met je Basispakket abonnement maak je onbeperkt werkbladen en kies je uit meer dan 3000 afbeeldingen.`,
    previewImageSrc: '/samples/english/drawing lines/drawing_lines_curve 1.jpeg',
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
    sectionTitle: 'Lijnen Trekken Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_curve 1.jpeg',
        answerKeySrc: '',
        altText: 'Lijnen trekken werkblad gebogen lijnen voor fijne motoriek kleuters',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_curve 1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_diagonal 1.jpeg',
        answerKeySrc: '',
        altText: 'Lijnen trekken werkblad diagonale lijnen voor schrijven oefenen groep 3',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_diagonal 1.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_horizontal.jpeg',
        answerKeySrc: '',
        altText: 'Lijnen trekken werkblad horizontale lijnen voor werkbladen kleuters',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_horizontal.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/drawing lines/drawing_lines_vertical.jpeg',
        answerKeySrc: '',
        altText: 'Lijnen trekken werkblad verticale lijnen voor fijne motoriek oefeningen',
        pdfDownloadUrl: '/samples/english/drawing lines/drawing_lines_vertical.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Functies van de Lijnen Trekken Generator - Oefenbladen Gratis Maken voor Werkbladen Kleuters en Werkbladen Groep 3',
    sectionDescription: 'Onze lijnen trekken generator biedt alles wat je nodig hebt voor professionele werkbladen. Van fijne motoriek oefeningen tot schrijven oefenen materiaal. Ontdek alle functies die je helpen bij het maken van oefenbladen gratis voor je klas of thuisonderwijs.',
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
        title: 'Werkbladen Kleuters Maken in 3 Klikken - Snelle Fijne Motoriek Oefenbladen Generator',
        description: `Het maken van werkbladen hoeft niet ingewikkeld te zijn. Kies een sjabloon, selecteer afbeeldingen, en klik op genereren. In minder dan 3 minuten heb je een professioneel werkblad klaar. Onze generator biedt 8 verschillende sjablonen voor lijnen trekken.

Er zijn sjablonen met rechte lijnen, gebogen lijnen en diagonale lijnen. Elk sjabloon heeft 4 of 5 koppelparen. Kinderen verbinden de linker afbeelding met de rechter afbeelding. Dit traint de fijne motoriek op een speelse manier.

De sjablonen passen automatisch bij het papierformaat. Kies tussen staand of liggend formaat. Letter-formaat en A4 worden beide ondersteund. Je kunt ook een vierkant formaat kiezen voor speciale projecten.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Schrijven Oefenen Werkbladen Volledig Aanpassen - Bewerk Alles op het Canvas voor Werkbladen Groep 3',
        description: `Na het genereren kun je elk element bewerken. Sleep afbeeldingen naar een andere positie. Draai ze, vergroot ze, of verklein ze. Verwijder elementen die je niet wilt. Voeg nieuwe elementen toe. Je hebt volledige controle over je werkblad.

Deze flexibiliteit maakt onze generator ideaal voor werkbladen groep 3 en werkbladen kleuters. Pas elk werkblad aan op het niveau van je leerlingen. Maak eenvoudige versies voor groep 1-2. Maak uitdagendere versies voor groep 3.

Voeg tekst toe met verschillende lettertypen. Kies uit 7 kindvriendelijke fonts. Pas de kleur en grootte aan. Voeg een omlijning toe voor betere leesbaarheid. Alles is aanpasbaar naar jouw wensen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Oefenbladen Gratis met Eigen Afbeeldingen - Upload Foto\'s voor Fijne Motoriek Werkbladen Kleuters',
        description: `Wil je werkbladen maken met foto's van je eigen klas? Upload je eigen afbeeldingen. Onze generator accepteert JPEG, PNG en GIF bestanden. Upload meerdere bestanden tegelijk. Combineer eigen foto's met afbeeldingen uit onze bibliotheek.

Dit maakt werkbladen extra persoonlijk. Gebruik foto's van klasgenoten voor naamherkenning. Gebruik foto's van het schoolgebouw. Gebruik foto's van huisdieren. Kinderen zijn extra gemotiveerd als ze bekende gezichten zien.

Eigen afbeeldingen werken perfect voor fijne motoriek oefeningen. Het kind herkent de afbeelding en wil de lijn trekken. Deze persoonlijke connectie verhoogt de betrokkenheid bij schrijven oefenen activiteiten.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Werkbladen Groep 3 in 11 Talen - Veilig Leren Lezen Ondersteuning met Meertalige Oefenbladen',
        description: `Onze generator ondersteunt 11 talen. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Alle knoppen en menu's zijn volledig vertaald. Ideaal voor internationale scholen en meertalig onderwijs.

De afbeeldingen in onze bibliotheek hebben bestandsnamen in alle 11 talen. Dit helpt bij veilig leren lezen in verschillende talen. Kinderen leren woordenschat terwijl ze lijnen trekken. Twee vaardigheden in één activiteit.

Voor NT2-onderwijs zijn deze werkbladen zeer geschikt. Combineer taalverwerving met fijne motoriek training. Leerlingen oefenen nieuwe woorden terwijl ze hun pengreep verbeteren. Dit ondersteunt het hele proces van letters leren.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Letters Leren met Commerciële Licentie - Verkoop Je Oefenbladen Gratis Gemaakt op Etsy en TPT',
        description: `Je Basispakket abonnement bevat een volledige commerciële licentie. Verkoop de werkbladen die je maakt. Geen extra kosten voor print-on-demand rechten. Verkoop op Etsy, Teachers Pay Teachers, of Amazon KDP.

Veel leerkrachten verdienen extra inkomen met werkbladen. Maak een serie fijne motoriek werkbladen. Maak seizoensgebonden bundels. Maak thematische pakketten voor letters leren en schrijven oefenen. De mogelijkheden zijn eindeloos.

De commerciële licentie is inbegrepen bij zowel Basispakket als Volledige Toegang. Geen naamsvermelding vereist. Jouw werkbladen, jouw merk. Bouw een passief inkomen op met educatief materiaal.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen voor Werkbladen Kleuters - Fijne Motoriek Oefenbladen met Thema\'s',
        description: `Onze afbeeldingenbibliotheek bevat meer dan 3000 kindvriendelijke illustraties. Allemaal georganiseerd per thema. Dieren, voertuigen, voedsel, natuur, seizoenen, en nog veel meer. Zoek op trefwoord of blader door thema's.

Elke afbeelding is speciaal ontworpen voor educatief gebruik. Heldere kleuren, duidelijke vormen, aantrekkelijk voor kinderen. Perfect voor werkbladen kleuters en werkbladen groep 3. De afbeeldingen zijn ook geschikt voor kleurplaten en andere activiteiten.

Gebruik de auto-fill functie voor snelle werkbladcreatie. Selecteer een thema en de generator vult automatisch alle paren. Perfect voor als je snel oefenbladen gratis wilt maken zonder elk paar handmatig te kiezen.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit voor Schrijven Oefenen Werkbladen Groep 3 - Download als PDF',
        description: `Alle werkbladen worden geëxporteerd in 300 DPI kwaliteit. Dit is printklare resolutie. Scherpe lijnen, heldere afbeeldingen. Perfect voor zowel klasgebruik als commerciële verkoop. Geen kwaliteitsverlies bij het printen.

Download als PDF of JPEG. PDF is ideaal voor meerdere pagina's. JPEG is handig voor digitaal delen. Beide formaten behouden de hoge kwaliteit. Kies de grijstinten-optie om inkt te besparen bij het printen.

De naam- en datumvelden zijn optioneel. Voeg ze toe voor klassikaal gebruik. Laat ze weg voor commerciële verkoop. Elke instelling kun je aanpassen aan jouw specifieke behoeften voor fijne motoriek en schrijven oefenen materiaal.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '📐',
        title: 'Acht Lijnpatronen - Gebogen, Diagonaal, Horizontaal en Verticaal voor Letters Leren',
        description: `Kies uit acht verschillende lijnsjablonen voor je werkbladen. Gebogen lijnen (Curve 1-4) hebben 4 koppelparen in liggend formaat. Gebogen lijnen zijn uitdagender dan rechte lijnen. Ideaal voor werkbladen groep 3 en gevorderde kleuters.

Diagonale lijnen (Diagonal 1-2) hebben 5 koppelparen in staand formaat. Diagonale lijnen bereiden kinderen voor op schuine letters. Perfect voor fijne motoriek training en schrijven oefenen voorbereiding.

Horizontale lijnen zijn de eenvoudigste optie voor beginners. Ideaal voor werkbladen kleuters in groep 1-2. Verticale lijnen trainen de op-en-neer beweging die nodig is voor bepaalde letters.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Hoe Maak Je Fijne Motoriek Werkbladen Kleuters in 5 Stappen - Oefenbladen Gratis Maken voor Schrijven Oefenen',
    sectionDescription: 'Het maken van lijnen trekken werkbladen is eenvoudig. In 5 stappen heb je een professioneel werkblad klaar. Het hele proces duurt minder dan 3 minuten. Volg deze handleiding voor perfecte werkbladen groep 3 en werkbladen kleuters.',
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
        title: 'Stap 1: Kies Je Sjabloon voor Werkbladen Groep 3 - Fijne Motoriek Oefenbladen Selecteren',
        description: `Begin met het kiezen van een sjabloon. Onze generator biedt 8 verschillende opties. Elk sjabloon heeft een uniek lijnpatroon. Kies het sjabloon dat past bij het niveau van je leerlingen.

Gebogen lijnen (Curve 1-4) hebben 4 koppelparen in liggend formaat. Gebogen lijnen zijn uitdagender dan rechte lijnen. Ideaal voor werkbladen groep 3 en gevorderde kleuters. De bochten trainen de polsbeweging die nodig is voor letters leren.

Diagonale lijnen (Diagonal 1-2) hebben 5 koppelparen in staand formaat. Horizontale lijnen zijn de eenvoudigste optie voor beginners. Verticale lijnen trainen de op-en-neer beweging.`,
        icon: '📐',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Selecteer Afbeeldingen voor Letters Leren Werkbladen - Oefenbladen Gratis Vullen met Thema\'s',
        description: `Na het kiezen van een sjabloon selecteer je afbeeldingen. Er zijn twee methodes. Handmatig kiezen of automatisch vullen. Beide methodes werken uitstekend voor werkbladen kleuters en werkbladen groep 3.

Handmatig selecteren: Klik op een leeg vak in de paartabel. Blader door de afbeeldingenbibliotheek. Klik op een afbeelding om deze toe te voegen. Je hebt volledige controle over welke afbeeldingen je gebruikt.

Automatisch vullen: Vink de optie "Auto-fill afbeeldingen" aan. Selecteer een thema uit de dropdown. De generator vult automatisch alle paren met afbeeldingen uit dat thema. Perfect voor snelle oefenbladen gratis creatie.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Pas Pagina-instellingen Aan voor Schrijven Oefenen Werkbladen Groep 3 - Formaat en Achtergrond',
        description: `Voordat je genereert, pas je de pagina-instellingen aan. Deze instellingen bepalen het uiterlijk van je werkblad. Optimaliseer voor je specifieke gebruik bij letters leren of fijne motoriek training.

Papierformaat: Kies tussen Letter (8.5×11 inch) of A4 (210×297mm). Beide formaten zijn beschikbaar in staand of liggend. Paginakleur: Standaard is wit. Kies een andere kleur voor thematische werkbladen kleuters.

Naam- en datumvelden: Vink deze optie aan voor klassikaal gebruik. Rand en achtergrond: Kies een decoratieve rand uit onze thema's. Voeg een subtiele achtergrond toe.`,
        icon: '⚙️',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Genereer en Bewerk Je Fijne Motoriek Oefenbladen - Werkbladen Kleuters Aanpassen op het Canvas',
        description: `Klik op de "Genereren" knop. Je werkblad verschijnt direct op het canvas. Nu kun je alles bewerken. Elk element is aanpasbaar. Dit is waar je werkbladen kleuters echt uniek maakt.

Afbeeldingen bewerken: Klik op een afbeelding om deze te selecteren. Sleep naar een andere positie. Gebruik de hoekpunten om te vergroten of verkleinen. Draai de afbeelding met de rotatiehendel.

Tekst toevoegen: Ga naar het tekstgereedschap. Typ je tekst en klik "Tekst toevoegen". Pas lettertype, grootte en kleur aan. Voeg instructies toe zoals "Trek een lijn".`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Je Werkbladen Groep 3 als PDF - Oefenbladen Gratis Printen voor Letters Leren',
        description: `Je werkblad is klaar. Nu download je het in hoge kwaliteit. Kies het formaat dat past bij jouw gebruik. Beide opties leveren professionele resultaten voor schrijven oefenen materiaal.

PDF downloaden: Ideaal voor printen en delen. Het PDF-bestand behoudt perfecte kwaliteit. Scherpe lijnen en heldere afbeeldingen. JPEG downloaden: Ideaal voor digitaal gebruik. Deel via e-mail of leerlingvolgsysteem.

Grijstinten optie: Vink deze aan om inkt te besparen. Alle kleuren worden omgezet naar grijstinten. Kwaliteit: Alle downloads zijn 300 DPI professionele printkwaliteit.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Voor Wie Zijn Lijnen Trekken Werkbladen Kleuters - Oefenbladen Gratis voor Leerkrachten en Ouders',
    sectionDescription: 'Onze lijnen trekken generator is ontworpen voor iedereen die met jonge kinderen werkt. Van kleuterjuffen tot thuisonderwijs ouders. Van speciaal onderwijs tot NT2-docenten. Ontdek hoe verschillende gebruikers profiteren van werkbladen groep 3 en fijne motoriek oefenbladen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1-2 - Werkbladen Kleuters voor Fijne Motoriek en Veilig Leren Lezen Voorbereiding',
        subtitle: 'Werkbladen kleuters voor kleuterklas',
        description: `Kleuterleidsters gebruiken onze generator dagelijks. Lijnen trekken is een kernactiviteit in groep 1-2. Het bereidt kinderen voor op formeel schrijven. De werkbladen kleuters passen perfect in het kleutercurriculum.

In de kleuterklas werken kinderen aan pengreep en ooghandcoördinatie. Onze fijne motoriek oefenbladen ondersteunen deze ontwikkeling. Kies eenvoudige horizontale lijnen voor beginners. Bouw op naar gebogen en diagonale lijnen.

Combineer lijnen trekken met thematisch onderwijs. Werk je aan het thema "dieren"? Maak werkbladen met dieren. De 3000+ afbeeldingen bieden eindeloze mogelijkheden voor oefenbladen gratis.`,
        quote: 'Lijnen trekken is de perfecte voorbereiding op schrijven in groep 3.',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3-5 - Werkbladen Groep 3 voor Schrijven Oefenen en Letters Leren Ondersteuning',
        subtitle: 'Werkbladen groep 3 voor schrijven',
        description: `In groep 3 begint het formele lees- en schrijfonderwijs. Maar niet alle kinderen zijn er klaar voor. Sommigen hebben extra fijne motoriek oefening nodig. Onze werkbladen groep 3 bieden gedifferentieerde ondersteuning.

Gebruik diagonale lijnsjablonen voor kinderen die moeite hebben met schuine letters. De k, v, w en x bevatten allemaal diagonale lijnen. Oefen deze beweging apart voordat kinderen de letters schrijven. Dit is gericht schrijven oefenen.

Leerkrachten groep 4 en 5 gebruiken de werkbladen voor remediëring. Sommige kinderen blijven moeite houden met schrijven. Extra oefenbladen gratis helpen zonder extra werkdruk voor de leerkracht.`,
        quote: 'Mijn leerlingen die moeite hebben met schrijven profiteren enorm van deze werkbladen.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders - Oefenbladen Gratis voor Werkbladen Kleuters en Rekenen Werkbladen Thuis',
        subtitle: 'Werkbladen kleuters voor thuis',
        description: `Steeds meer ouders kiezen voor thuisonderwijs. Of ze ondersteunen het schoolwerk thuis. Onze generator is perfect voor beide situaties. Maak werkbladen die aansluiten bij wat je kind leert op school.

Voor kleuters thuis zijn fijne motoriek activiteiten essentieel. Lijnen trekken is leuker dan alleen maar cirkels tekenen. Kinderen verbinden herkenbare afbeeldingen. Dit motiveert om door te oefenen met schrijven oefenen activiteiten.

Thuisonderwijs ouders waarderen de commerciële licentie. Deel je werkbladen met andere thuisonderwijs families. Verkoop je creaties om je onderwijskosten te dekken. Met oefenbladen gratis creatie heb je geen extra kosten.`,
        quote: 'Mijn kinderen vragen zelf om meer lijnen trekken werkbladen!',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'NT2-Docenten - Werkbladen Groep 3 in 11 Talen voor Veilig Leren Lezen in het Nederlands',
        subtitle: 'Meertalige werkbladen voor NT2',
        description: `Nieuwkomersonderwijs vraagt speciale materialen. Kinderen leren Nederlands terwijl ze basisvaardigheden ontwikkelen. Onze werkbladen groep 3 ondersteunen beide doelen tegelijk.

De afbeeldingen in onze bibliotheek hebben Nederlandse bestandsnamen. Kinderen zien het woord terwijl ze de lijn trekken. Dit is impliciete woordenschattraining. Combineer met expliciete instructie voor veilig leren lezen in het Nederlands.

NT2-leerlingen hebben vaak extra fijne motoriek training nodig. Niet alle kinderen hebben in hun thuisland voorbereidend schrijven oefenen gehad. Onze werkbladen kleuters vullen deze lacune.`,
        quote: 'De meertalige ondersteuning is perfect voor mijn internationale klas.',
      },
      {
        id: '5',
        icon: '🧒',
        title: 'Speciaal Onderwijs - Fijne Motoriek Oefenbladen voor Gedifferentieerde Werkbladen Kleuters',
        subtitle: 'Oefenbladen voor speciaal onderwijs',
        description: `In het speciaal onderwijs is differentiatie essentieel. Elk kind leert op eigen niveau en tempo. Onze generator maakt het eenvoudig om aangepaste werkbladen te maken voor fijne motoriek training.

Voor kinderen met motorische beperkingen begin je met grote, eenvoudige lijnen. Gebruik het horizontale sjabloon met veel ruimte. Vergroot de afbeeldingen voor betere zichtbaarheid. Pas elk werkblad aan op individuele behoeften.

Kinderen met concentratieproblemen profiteren van korte werkbladen. Kies sjablonen met 4 paren in plaats van 5. Minder prikkels, meer focus. De voltooiing geeft een succeservaring die motiveert.`,
        quote: 'De aanpasbaarheid maakt differentiatie zo veel eenvoudiger.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Ondernemende Leerkrachten - Oefenbladen Gratis Maken en Verkopen met Letters Leren Materiaal',
        subtitle: 'Commerciële licentie voor verkoop',
        description: `Veel leerkrachten ontdekken het verkopen van lesmateriaal als extra inkomen. Onze generator bevat een volledige commerciële licentie. Verkoop je werkbladen kleuters en werkbladen groep 3 zonder extra kosten.

Teachers Pay Teachers is een populair platform voor Nederlandse leerkrachten. Upload je fijne motoriek werkbladen. Maak thematische bundels voor seizoenen en feestdagen. Verdien passief inkomen met materiaal dat je toch al maakt.

De 300 DPI kwaliteit is essentieel voor commerciële verkoop. Klanten verwachten professionele kwaliteit. Onze exports voldoen aan de hoogste standaarden.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Lijnen Trekken Werkbladen Kleuters - Oefenbladen Gratis en Rekenen Werkbladen FAQ',
    sectionDescription: 'Heb je vragen over onze lijnen trekken generator? Hier vind je antwoorden op de meest gestelde vragen. Van prijzen tot functies, van kleurplaten combinaties tot veilig leren lezen ondersteuning.',
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
        question: 'Is Deze Lijnen Trekken Generator Echt Gratis voor Oefenbladen Gratis en Sommen tot 20 Werkbladen?',
        answer: 'De lijnen trekken generator vereist een Basispakket abonnement. Dit kost €144 per jaar of €15 per maand. Met je abonnement maak je onbeperkt werkbladen zonder extra kosten per werkblad. Genereer zoveel oefenbladen gratis als je nodig hebt. Basispakket bevat 10 populaire werkbladgeneratoren. Naast lijnen trekken krijg je ook toegang tot sommen tot 20 werkbladen, rekenen werkbladen, en meer. Volledige Toegang kost €240 per jaar en bevat alle 33 generators.',
      },
      {
        id: '2',
        question: 'Kan Ik Werkbladen Groep 3 Thuis Printen met Kleurplaten Kwaliteit op een Gewone Printer?',
        answer: 'Ja, alle werkbladen zijn ontworpen voor thuisprinters. De 300 DPI kwaliteit zorgt voor scherpe lijnen en heldere afbeeldingen. Zowel inkjet als laserprinters geven uitstekende resultaten voor werkbladen groep 3 en kleurplaten. Gebruik de grijstinten-optie om inkt te besparen. De afbeeldingen blijven herkenbaar in zwart-wit. Kinderen kunnen de werkbladen daarna inkleuren.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Rekenen Werkbladen en Tafels Oefenen Materiaal?',
        answer: 'Nee, geen enkele ontwerpervaring is nodig. Onze generator doet al het werk. Kies een sjabloon, selecteer afbeeldingen, en klik op genereren. In 3 minuten heb je een professioneel werkblad klaar voor rekenen werkbladen of tafels oefenen. De interface is volledig in het Nederlands. Alle knoppen en menu\'s zijn vertaald.',
      },
      {
        id: '4',
        question: 'Mag Ik Werkbladen Kleuters Gebruiken in Mijn Klas voor Veilig Leren Lezen Ondersteuning?',
        answer: 'Ja, je Basispakket abonnement bevat onbeperkt klasgebruik. Print zoveel werkbladen kleuters als je nodig hebt voor veilig leren lezen ondersteuning. Deel digitaal via je leerlingvolgsysteem. Geen beperkingen op het aantal leerlingen. Differentieer door verschillende sjablonen te kiezen.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Sommen tot 20 en Kleurplaten Werkbladen Beschikbaar?',
        answer: 'Onze generator ondersteunt 11 talen volledig. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. De interface én de afbeeldingsnamen zijn in alle talen beschikbaar voor sommen tot 20 en kleurplaten. Dit is ideaal voor NT2-onderwijs en internationale scholen.',
      },
      {
        id: '6',
        question: 'Kan Ik Tafels Oefenen Werkbladen Verkopen die Ik Maak met Deze Generator?',
        answer: 'Ja, je Basispakket abonnement bevat een volledige commerciële licentie. Verkoop je tafels oefenen werkbladen en andere creaties zonder extra kosten. Geen naamsvermelding vereist. Verkoop op Etsy, Teachers Pay Teachers, of Amazon KDP. De commerciële licentie dekt print-on-demand gebruik.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Oefenbladen Gratis Aan voor Mijn Leerlingen met Veilig Leren Lezen Behoeften?',
        answer: 'Elk element op het canvas is aanpasbaar. Sleep afbeeldingen naar andere posities. Vergroot of verklein ze. Voeg tekst toe met instructies. Kies uit 7 kindvriendelijke lettertypen voor oefenbladen gratis die passen bij veilig leren lezen. Voor leerlingen met speciale behoeften pas je de moeilijkheidsgraad aan.',
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijden Zijn Rekenen Werkbladen en Fijne Motoriek Oefenbladen Geschikt?',
        answer: 'Lijnen trekken werkbladen zijn ideaal voor kinderen van 3 tot 8 jaar. Kleuters in groep 1-2 beginnen met eenvoudige horizontale lijnen. Kinderen in groep 3 oefenen met diagonale en gebogen lijnen voor rekenen werkbladen voorbereiding. De fijne motoriek ontwikkeling verschilt per kind.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Foto\'s Uploaden voor Kleurplaten en Sommen tot 20 Werkbladen?',
        answer: 'Ja, upload je eigen afbeeldingen in JPEG, PNG of GIF formaat. Combineer eigen foto\'s met afbeeldingen uit onze bibliotheek. Maak gepersonaliseerde kleurplaten en sommen tot 20 werkbladen met foto\'s van je klas of school. Eigen afbeeldingen maken werkbladen extra motiverend.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om Tafels Oefenen en Veilig Leren Lezen Werkbladen te Maken?',
        answer: 'Het hele proces duurt minder dan 3 minuten. Kies een sjabloon (30 seconden). Selecteer afbeeldingen of gebruik auto-fill (1 minuut). Genereer en bewerk indien nodig (1 minuut). Download als PDF of JPEG (30 seconden). Vergelijk dit met traditionele methodes die 30-60 minuten kosten.',
      },
      {
        id: '11',
        question: 'Welke Lijnpatronen Zijn Beschikbaar voor Fijne Motoriek Werkbladen?',
        answer: 'Onze generator biedt 8 verschillende sjablonen. Gebogen lijnen (Curve 1-4) met 4 koppelparen in liggend formaat. Diagonale lijnen (Diagonal 1-2) met 5 koppelparen in staand formaat. Horizontale lijnen met 5 koppelparen voor beginners. Verticale lijnen met 4 koppelparen voor afwisseling.',
      },
      {
        id: '12',
        question: 'Kan Ik Lijnen Trekken Combineren met Rekenen Werkbladen en Sommen tot 20 Thema\'s?',
        answer: 'Ja, gebruik wiskundige thema\'s voor je afbeeldingen. Selecteer getallen, vormen, of telbare objecten. Kinderen trekken lijnen tussen bijvoorbeeld "3 appels" en het cijfer "3". Dit combineert fijne motoriek met rekenen werkbladen concepten. Perfect voor geïntegreerd leren voor werkbladen groep 3.',
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
      '8 lijnsjablonen beschikbaar',
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
    sectionTitle: 'Combineer Lijnen Trekken met Andere Oefenbladen Gratis - Complete Leerpakketten met Rekenen Werkbladen en Kleurplaten',
    sectionDescription: 'LessonCraft Studio bevat 33 werkbladgeneratoren. Lijnen trekken is slechts één tool in je arsenaal. Combineer verschillende generators voor complete leerpakketten. Integreer rekenen werkbladen, kleurplaten, en meer voor holistische leerervaring.',
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
        slug: 'matching-app',
        name: 'Verbindingswerkbladen',
        category: 'Visueel Leren',
        icon: '🔗',
        description: 'Combineer lijnen trekken met verbindingswerkbladen voor complete fijne motoriek training. Beide tools ontwikkelen pencontrole en hand-oog coördinatie.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Na het lijnen trekken kunnen kinderen de afbeeldingen inkleuren. Gebruik de grijstinten-optie voor werkbladen die dubbel dienen als kleurplaten.',
      },
      {
        id: '3',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer fijne motoriek met rekenvaardigheden. Maak lijnen trekken werkbladen met wiskundige thema\'s voor sommen tot 20 oefening.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Alfabet Trein',
        category: 'Vroege Educatie',
        icon: '🚂',
        description: 'Vul lijnen trekken aan met alfabetactiviteiten voor werkbladen kleuters. Letters leren wordt interactief en speels met beide tools.',
      },
      {
        id: '5',
        slug: 'writing-app',
        name: 'Schrijfoefeningen',
        category: 'Fijne Motoriek',
        icon: '✍️',
        description: 'Na lijnen trekken volgen schrijfoefeningen. Bouw vaardigheden stapsgewijs op van rechte lijnen naar letters en woorden.',
      },
      {
        id: '6',
        slug: 'pattern-worksheet',
        name: 'Patronen',
        category: 'Logica',
        icon: '🔢',
        description: 'Patronen herkennen en lijnen trekken versterken beide de visuele waarneming. Combineer voor complete cognitieve ontwikkeling.',
      },
    ],
  },
};

export default drawingLinesNlContent;
