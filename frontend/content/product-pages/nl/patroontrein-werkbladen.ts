import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Train Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/patroontrein-werkbladen.ts
 * URL: /nl/apps/patroontrein-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/pattern-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Dutch Keywords:
 * 1. Patroontrein
 * 2. Werkbladen groep 3
 * 3. Werkbladen kleuters
 * 4. Oefenbladen gratis
 * 5. Fijne motoriek
 * 6. Rekenen werkbladen
 * 7. Patroonherkenning
 * 8. Groep 1 2
 * 9. Letters leren
 * 10. Veilig leren lezen
 */

export const patternTrainNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'patroontrein-werkbladen',
    appId: 'pattern-train',
    title: 'Patroontrein Werkbladen Maken - Oefenbladen Gratis voor Groep 1 2 3 | LessonCraft Studio',
    description: 'Maak professionele patroonherkenning werkbladen met onze patroontrein generator. Genereer aangepaste oefenbladen perfect voor groep 1, groep 2 en groep 3 leerlingen. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.',
    keywords: 'patroontrein, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, rekenen werkbladen, patroonherkenning, groep 1 2, letters leren, veilig leren lezen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/patroontrein-werkbladen',
  },

  // Hero Section
  hero: {
    title: 'Patroontrein Generator',
    subtitle: 'Oefenbladen Gratis voor Groep 1 2 3 - Fijne Motoriek en Rekenen Werkbladen',
    description: `Maak professionele patroonherkenning werkbladen met onze patroontrein generator. Uw Volledige Toegang abonnement geeft u onbeperkte werkblad creatie zonder kosten per werkblad. Genereer aangepaste oefenbladen perfect voor groep 1, groep 2 en groep 3 leerlingen. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.

Patroonherkenning is een fundamentele wiskundige vaardigheid voor jonge kinderen. Onze patroontrein maker helpt leerkrachten visueel aantrekkelijke werkbladen te creëren die fijne motoriek en logisch denken ontwikkelen. Kies uit 5 patroonsoorten (AB, AAB, ABB, ABC, AABB) en pas het moeilijkheidsniveau aan voor elke groep.

Werkbladen groep 3 vereisen vaak meer uitdagende patronen dan werkbladen kleuters. Met aanpasbare aanwijzingen (4-10 voorbeelden), thema-gebaseerde afbeeldingen en volledige bewerkbaarheid op canvas creëert u gedifferentieerde oefenbladen voor alle niveaus. Combineer met onze rekenen werkbladen en letters leren activiteiten voor complete lespakketten.`,
    previewImageSrc: '/samples/english/pattern train/pattern_train portrait.jpeg',
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
    sectionTitle: 'Patroontrein Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/pattern train/pattern_train portrait.jpeg',
        answerKeySrc: '/samples/english/pattern train/pattern_train portrait answer_key.jpeg',
        altText: 'Patroontrein werkblad portret formaat voor werkbladen groep 3 en patroonherkenning',
        pdfDownloadUrl: '/samples/english/pattern train/pattern_train portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/pattern train/pattern_train landscape.jpeg',
        answerKeySrc: '/samples/english/pattern train/pattern_train landscape answer_key.jpeg',
        altText: 'Patroontrein werkblad landschap formaat voor werkbladen kleuters en fijne motoriek',
        pdfDownloadUrl: '/samples/english/pattern train/pattern_train landscape.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Patroontrein Functies - Alles voor Werkbladen Groep 3 en Oefenbladen Gratis',
    sectionDescription: 'Onze patroontrein generator biedt professionele functies voor het maken van werkbladen kleuters en werkbladen groep 3. Elk werkblad ondersteunt fijne motoriek ontwikkeling en patroonherkenning vaardigheden. Leerkrachten maken rekenen werkbladen gecombineerd met visuele patronen in minuten. Volledige Toegang abonnement (€240 per jaar) geeft toegang tot alle functies en 3000+ afbeeldingen.',
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
        title: 'Maak Patroontrein Werkbladen in 3 Klikken - Snelle Werkbladen Groep 3 Generator',
        description: `Selecteer een patroontype (AB, AAB, ABB, ABC of AABB) met één klik. Kies een thema uit 50+ categorieën of selecteer individuele afbeeldingen. Klik op "Creëer" en uw werkblad verschijnt direct op het canvas.

Geen ontwerpervaring nodig voor professionele werkbladen groep 3. De app selecteert automatisch passende afbeeldingen wanneer u een thema kiest. Voor werkbladen kleuters kiest u eenvoudige AB patronen met herkenbare afbeeldingen. Voor oudere leerlingen kiest u complexere ABC of AABB patronen.

Pas het aantal aanwijzingen aan van 4 tot 10 voorbeelden. Meer aanwijzingen maken het werkblad makkelijker voor groep 1 2 leerlingen. Minder aanwijzingen verhogen de moeilijkheid voor groep 3 en 4. Voeg optioneel naam/datum velden toe voor klasorganisatie.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Bewerk Alles op Uw Werkblad - Volledige Aanpassing voor Rekenen Werkbladen',
        description: `Elk element op het canvas is volledig bewerkbaar met uw muis. Sleep afbeeldingen naar nieuwe posities op het werkblad. Vergroot of verklein afbeeldingen door aan de hoeken te slepen. Draai afbeeldingen naar elke hoek voor visuele variatie.

Verwijder ongewenste elementen met de delete-toets. Voeg extra afbeeldingen toe uit de 3000+ bibliotheek. Combineer patroontrein werkbladen met rekenen werkbladen elementen. Maak aangepaste oefenbladen gratis van ontwerpbeperkingen.

Pas tekstkleur, lettergrootte en lettertype aan voor elke tekst. Kies uit 7 kindvriendelijke lettertypen inclusief Baloo 2 en Fredoka. Voeg gekleurde omlijningen toe aan tekst voor betere leesbaarheid. Alle aanpassingen gebeuren in real-time op het canvas.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Eigen Afbeeldingen - Personaliseer Werkbladen Kleuters en Groep 1 2',
        description: `Upload meerdere afbeeldingen tegelijk in JPEG, PNG of GIF formaat. Uw afbeeldingen verschijnen direct in de lijst met beschikbare afbeeldingen. Combineer uw uploads met de 3000+ bibliotheekafbeeldingen op één werkblad.

Personaliseer werkbladen kleuters met foto's van klasgenoten of huisdieren. Upload afbeeldingen van klasobjecten die leerlingen herkennen. Maak cultureel relevante oefenbladen gratis van generieke content.

Voor letters leren kunt u eigen letterkaarten uploaden. Voor rekenen werkbladen upload getallen of rekenobjecten. Voor fijne motoriek activiteiten upload traceerbare vormen. Alle uploads blijven beschikbaar tijdens uw editeersessie.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Patroontrein Werkbladen in 11 Talen - Ondersteuning voor Veilig Leren Lezen',
        description: `De gebruikersinterface is beschikbaar in 11 talen inclusief Nederlands. Wissel tussen talen met één klik in het taalinstellingen menu. Alle labels, knoppen en instructies verschijnen in uw gekozen taal.

Nederlands ondersteunt leerkrachten in Nederland en België (Vlaanderen). De interface gebruikt correcte Nederlandse terminologie voor onderwijs. Groep 1 2 3 niveaus worden herkend door Nederlandse leerkrachten. Dit ondersteunt veilig leren lezen programma's met vertrouwde taalgebruik.

De 11 talen zijn: Engels, Duits, Frans, Spaans, Italiaans, Portugees (Braziliaans), Nederlands, Zweeds, Deens, Noors en Fins. Europese leerkrachten vinden hun moedertaal ondersteund. Dit maakt de tool toegankelijk voor 400+ miljoen native speakers.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie Inbegrepen - Verkoop Werkbladen Groep 3 en Oefenbladen',
        description: `Volledige Toegang abonnement (€240 per jaar) bevat volledige commerciële print-on-demand licentie. Verkoop uw patroontrein werkbladen op Etsy, Teachers Pay Teachers en Amazon KDP. Geen extra licentiekosten bovenop uw abonnement.

Veel leerkrachten verdienen €500-€5000 per maand met verkoop van werkbladen. Maak sets thematische werkbladen groep 3 voor verschillende seizoenen. Combineer patroontrein werkbladen met rekenen werkbladen en kleurplaten voor complete pakketten. Verkoop digitale downloads of print-on-demand producten.

De 300 DPI exportkwaliteit is perfect voor professioneel printen. Uw werkbladen zien er scherp en helder uit op elk printertype. Geen naamsvermelding vereist op verkochte werkbladen. Uw branding en logo kunnen op elk werkblad.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Afbeeldingenbibliotheek - Thema\'s voor Fijne Motoriek en Letters Leren',
        description: `Toegang tot meer dan 3000 kindvriendelijke afbeeldingen georganiseerd per thema. Kies uit 50+ thema's inclusief dieren, eten, vormen, transport en seizoenen. Elke thema bevat 30-100 gerelateerde afbeeldingen voor variatie.

Thema-gebaseerde selectie bespaart tijd bij het maken van werkbladen groep 3. Kies "Dieren" thema en de app selecteert automatisch diverse dieren voor uw patroon. Kies "Vormen" thema voor geometrische patroonherkenning. Kies "Eten" voor alledaagse herkenbare objecten.

Achtergronden en randen zijn ook inbegrepen in uw abonnement. Kies uit 50+ achtergrondthema's om visuele interesse toe te voegen. Pas achtergrond-opaciteit aan om afleidingen te minimaliseren. Voeg professionele randen toe voor afgewerkte oefenbladen gratis van extra kosten.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit - Download Werkbladen Kleuters als PDF en JPEG',
        description: `Exporteer alle werkbladen in 300 DPI resolutie voor commercieel gebruik. Download als JPEG voor digitaal delen of printen thuis. Download als PDF voor professionele printshops en publicaties.

JPEG bestanden zijn perfect voor het delen op sociale media of e-mail. Ouders kunnen werkbladen groep 3 downloaden en direct printen thuis. Digitale downloads voor uw Teachers Pay Teachers shop zijn hoogwaardig. Alle kleuren en details blijven scherp en helder.

Grijswaarden optie converteert werkbladen naar zwart-wit voor inktbesparing. Perfect voor scholen met beperkte printbudgetten. Werkbladen kleuters zijn nog steeds duidelijk leesbaar in grijstinten. Kopiëren en vermenigvuldigen behoudt leesbaarheid.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🔢',
        title: '5 Patroonsoorten voor Elke Leeftijd - AB tot AABB voor Werkbladen Kleuters',
        description: `Kies uit vijf patroontypen voor alle leeftijden en niveaus. AB patronen (cirkel, vierkant, cirkel, vierkant) zijn perfect voor werkbladen kleuters en groep 1. AAB patronen voegen een extra uitdaging toe voor groep 2 leerlingen.

ABC patronen (cirkel, vierkant, driehoek) ontwikkelen gevorderd patroondenken voor groep 3. AABB patronen (cirkel, cirkel, vierkant, vierkant) voorbereiden op tafels oefenen door herhaalde groepen te herkennen. ABB patronen bieden variatie voor gevorderde groep 2.

De patroontrein visualisatie maakt abstract patroondenken concreet en speels. Leerlingen zien een trein met vagons die het patroon tonen en moeten bepalen wat er in de lege wagon komt. Dit ondersteunt veilig leren lezen door visuele discriminatie en sequentiële verwerking te oefenen.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Hoe Maak Je Werkbladen Groep 3 in 5 Eenvoudige Stappen - Oefenbladen Gratis Binnen 3 Minuten',
    sectionDescription: 'Maak professionele patroontrein werkbladen in minder dan 3 minuten. Geen ontwerpervaring vereist voor hoogwaardige werkbladen kleuters. Volg deze 5 eenvoudige stappen van selectie tot download.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je patroontrein werkblad is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Uw Content voor Werkbladen Kleuters',
        description: `Selecteer eerst een patroontype uit het dropdown menu. Kies AB voor eenvoudige werkbladen kleuters en groep 1. Kies AAB of ABB voor groep 2 leerlingen. Selecteer ABC of AABB voor uitdagendere werkbladen groep 3 en 4.

Kies vervolgens uw afbeeldings-selectiemethode uit drie opties. Optie 1 is thema-gebaseerde auto-selectie. Kies een thema zoals "Dieren" of "Vormen" en de app selecteert automatisch passende afbeeldingen. Perfect voor snelle oefenbladen gratis van tijdrovend zoeken.

Optie 2 is handmatige afbeelding selectie uit de 3000+ bibliotheek. Browse afbeeldingen per thema en klik om ze aan uw patroon toe te voegen. Combineer verschillende thema's voor unieke patronen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Rekenen Werkbladen',
        description: `Selecteer uw papierformaat uit het Page Setup menu. Letter Portrait (8.5×11") is standaard in Noord-Amerika. A4 Portrait (210×297mm) is standaard in Nederland en België. Landscape formaten bieden meer breedte voor treinvisualisatie.

Kies uw paginakleur met de kleurenkiezer. Witte achtergrond is standaard voor professionele oefenbladen gratis van afleidingen. Pastelkleuren voegen visuele interesse toe aan werkbladen kleuters. Lichte kleuren besparen printerinkt vergeleken met donkere achtergronden.

Selecteer uw taalvoorkeur voor de gebruikersinterface. Nederlands is beschikbaar voor leerkrachten in Nederland en Vlaanderen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Uw Werkblad voor Groep 1 2',
        description: `Klik op de "Creëer" knop om uw patroontrein werkblad te genereren. Het werkblad verschijnt direct op het canvas binnen 2-3 seconden. Geen wachttijd of processing delays. Onmiddellijke preview toont exact hoe uw werkblad eruit ziet.

De patroontrein verschijnt met alle vagons gevuld behalve de laatste. De gevulde vagons tonen het herhalende patroon volgens uw gekozen type. De lege wagon geeft ruimte voor leerlingen om het patroon te voltooien.

Wissel tussen Worksheet tab en Answer Key tab om beide versies te bekijken. Het werkblad toont de lege wagon voor leerling invulling. Het antwoordblad toont het complete patroon met alle vagons gevuld.`,
        icon: '🚀',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas voor Aangepaste Werkbladen Kleuters',
        description: `Klik op elk element om het te selecteren voor bewerking. Geselecteerde objecten tonen selectiehandles aan de hoeken. Sleep objecten naar nieuwe posities overal op het canvas. Verplaats afbeeldingen voor betere visuele balans.

Vergroot of verklein afbeeldingen door aan hoekhandles te slepen. Grotere afbeeldingen zijn makkelijker voor werkbladen kleuters en groep 1 2. Kleinere afbeeldingen verhogen de moeilijkheid door fijne visuele discriminatie te vereisen.

Voeg extra tekstelementen toe met de Text Tools. Type instructies zoals "Welke afbeelding komt in de lege wagon?" of "Teken het patroon verder". Pas tekstkleur, grootte en lettertype aan voor leesbaarheid.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Oefenbladen Gratis van Watermerken',
        description: `Klik op de "Download" dropdown om exportopties te bekijken. Kies tussen JPEG en PDF formaten voor beide werkblad en antwoordblad. Alle downloads zijn 300 DPI kwaliteit voor professioneel printen. Uw Volledige Toegang abonnement verwijdert alle watermerken automatisch.

Download Worksheet (JPEG) voor digitaal delen via e-mail of Google Classroom. JPEG bestanden zijn kleiner in bestandsgrootte voor snelle verzending.

Download Worksheet (PDF) voor professionele printkwaliteit. PDF formaat behoudt exacte layout op elk apparaat en printer. Elke download bevat zowel het werkblad als het antwoordblad.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten, Ouders en Pedagogen - Werkbladen Groep 3 en Oefenbladen Gratis voor Elke Behoefte',
    sectionDescription: 'Patroontrein werkbladen ondersteunen diverse gebruikers in verschillende onderwijscontexten. Leerkrachten groep 1 2 3 gebruiken patronen voor wiskundige basisvaardigheden. Thuisonderwijsouders maken aangepaste werkbladen kleuters voor hun kinderen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 en Groep 2 - Werkbladen Kleuters voor Fijne Motoriek',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Leerkrachten in groep 1 en 2 gebruiken patroontrein werkbladen voor visuele discriminatie oefeningen. Jonge leerlingen (4-6 jaar) ontwikkelen patroonherkenning als wiskundige basisvaardigheid. AB patronen met grote, herkenbare afbeeldingen zijn perfect voor beginners.

Patroonherkenning ondersteunt veilig leren lezen door visuele sequenties te oefenen. Leerlingen die patronen kunnen herkennen, leren sneller letter- en woordpatronen. Gebruik patroontrein werkbladen parallel aan letterherkenning lessen.

Fijne motoriek ontwikkelt door leerlingen patronen na te tekenen of in te kleuren. Vraag leerlingen het juiste element te tekenen in de lege wagon. Combineer met kleurplaten door patronen eerst in te kleuren.`,
        quote: 'Mijn kleuters vinden de patroontrein werkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 tot 5 - Rekenen Werkbladen met Tafels Oefenen',
        subtitle: 'Werkbladen groep 3 en tafels oefenen',
        description: `Leerkrachten in groep 3, 4 en 5 gebruiken complexere patronen voor gevorderde wiskundige vaardigheden. ABC en AABB patronen ontwikkelen algebraïsch denken. Leerlingen beginnen de onderliggende regel van patronen te begrijpen.

Combineer patroontrein werkbladen met rekenen werkbladen voor geïntegreerde wiskundeles. Gebruik getallenpatronen (2, 4, 6, 8) op de trein. Leerlingen oefenen sommen tot 20 door visuele tellingen. Patronen met groepen voorbereiden op tafels oefenen door herhaalde optelling.

AABB patronen introduceren vermenigvuldiging concepten. Leerlingen zien dat 2+2 hetzelfde is als 2×2. Deze visuele representatie ondersteunt begrip van tafels oefenen.`,
        quote: 'Patroontrein werkbladen passen perfect bij onze rekenlessen.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijsouders - Oefenbladen Gratis voor Multi-Level Instructie',
        subtitle: 'Oefenbladen gratis voor thuisonderwijs',
        description: `Thuisonderwijsouders onderwijzen vaak meerdere leeftijden tegelijkertijd. Patroontrein generator maakt gedifferentieerde oefenbladen in minuten. Maak AB patronen voor uw 4-jarige en ABC patronen voor uw 7-jarige. Beide werkbladen gebruiken dezelfde thema's voor gezamenlijke lessen.

Volledige Toegang abonnement (€240 per jaar) ondersteunt volledige curriculum planning voor thuisonderwijs. Maak rekenen werkbladen, kleurplaten, letters leren activiteiten en patroonherkenning oefeningen. Onbeperkte creatie betekent geen extra kosten per kind of per activiteit.

Seizoensthema's houden thuisonderwijs fris en interessant. Maak pompoen patronen in oktober, bloemenpatronen in mei. Upload familiefoto's voor gepersonaliseerde patronen tijdens verjaardagen.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'ESL en Tweetalige Leerkrachten - Letters Leren met Visuele Patronen',
        subtitle: 'Werkbladen voor taalonderwijs',
        description: `ESL leerkrachten gebruiken visuele patroontrein werkbladen voor taal-onafhankelijke instructie. Patronen vereisen geen taalvaardigheid om te begrijpen. Nieuwkomers kunnen succesvol zijn met visuele patroonherkenning. Dit bouwt vertrouwen op terwijl ze Nederlands leren.

Combineer patronen met letters leren door alfabetische sequenties te gebruiken. Upload letterkaarten (A, B, C) als patroonelementen. Leerlingen oefenen alfabetische volgorde door letterpatronen. Dit ondersteunt veilig leren lezen door letterherkenning te versterken.

Tweetalige programma's gebruiken patronen in beide talen. Maak werkbladen in Nederlands en wissel interface naar Engels. Dezelfde afbeeldingen werken in beide talen.`,
        quote: 'Visuele patronen werken voor alle taalniveaus.',
      },
      {
        id: '5',
        icon: '💡',
        title: 'Speciaal Onderwijs Leerkrachten - Gedifferentieerde Werkbladen',
        subtitle: 'Werkbladen voor diverse leerbehoeften',
        description: `Speciaal onderwijs leerkrachten gebruiken visuele patronen voor leerlingen met diverse behoeften. Grote, duidelijke afbeeldingen ondersteunen leerlingen met visuele verwerkingsproblemen. Verstelbare moeilijkheid maakt individuele educatieve plannen (IEP) mogelijk.

Leerlingen met ontwikkelingsachterstanden profiteren van concrete visuele patronen. Begin met eenvoudige AB patronen met zeer herkenbare objecten. Graduele toename naar AAB patronen over maanden. Werkbladen documenteren meetbare vooruitgang voor IEP verslagen.

Autisme spectrum leerlingen gedijen bij visuele, voorspelbare structuren. Patronen bieden precies deze voorspelbaarheid en orde. Gebruik interessegebieden als patroonelementen (treinen, dinosauriërs).`,
        quote: 'Perfecte aanpassing voor elke leerling.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Leraar-Ondernemers - Verkoop Oefenbladen op Teachers Pay Teachers',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Leraar-ondernemers maken passief inkomen door hoogwaardige werkbladen te verkopen. Patroontrein generator met commerciële licentie ondersteunt dit ondernemerschap. Maak thematische werkbladen groep 3 bundels voor Teachers Pay Teachers. Volledige Toegang (€240 per jaar) geeft onbeperkte commerciële creatie.

Succesvolle werkblad verkopers verdienen €500-€5000 per maand. Maak seizoensbundels met 20-30 werkbladen per set. Prijs bundels €8-€15 voor maximale conversie. Patroontrein werkbladen gecombineerd met rekenen werkbladen en kleurplaten maken complete pakketten.

Pinterest marketing drijft verkeer naar uw Teachers Pay Teachers winkel. Maak visueel aantrekkelijke preview afbeeldingen van uw beste werkbladen. Patroontrein werkbladen zijn visueel aantrekkelijk voor Pinterest pinners.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Werkbladen Groep 3 en Oefenbladen Gratis - Patroontrein Generator',
    sectionDescription: 'Leerkrachten, ouders en pedagogen stellen vaak dezelfde vragen over patroontrein werkbladen. Deze FAQ beantwoordt vragen over abonnement, gebruik in klas, commerciële verkoop en combinatie met andere materialen.',
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
        question: 'Is de Patroontrein Generator Echt Gratis te Gebruiken voor Werkbladen Kleuters?',
        answer: 'De patroontrein generator vereist Volledige Toegang abonnement voor €240 per jaar of €25 per maand. Uw abonnement geeft onbeperkte werkblad creatie zonder per-werkblad kosten. Genereer zoveel werkbladen groep 3 en werkbladen kleuters als u nodig heeft zonder extra charges. Dit is zeer kosteneffectief vergeleken met per-werkblad platforms. Volledige Toegang bevat alle 33 worksheet generator types inclusief patroontrein. U krijgt ook rekenen werkbladen, kleurplaten, tafels oefenen generatoren en sommen tot 20 materialen.',
      },
      {
        id: '2',
        question: 'Kan Ik Patroontrein Werkbladen Groep 3 Printen op Normale Thuisprinter?',
        answer: 'Ja, alle patroontrein werkbladen downloaden als print-ready PDF of JPEG bestanden. Print thuis op elke standaard printer. 300 DPI kwaliteit zorgt voor scherpe, professionele afdrukken. Werkbladen kleuters en werkbladen groep 3 printen perfect op A4 of Letter papier. PDF formaat behoudt exacte layout op elke printer. Stuur naar schoolprinter, thuisprinter of professionele printservice. Grijswaarden optie converteert werkbladen naar zwart-wit voor inktbesparing.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Werkbladen Kleuters en Rekenen Werkbladen?',
        answer: 'Nee, absoluut geen ontwerpervaring vereist. Patroontrein generator is ontworpen voor leerkrachten zonder grafische ontwerp achtergrond. Kies patroontype, selecteer thema, klik genereren. Werkblad verschijnt in 3 minuten klaar voor gebruik. Thema-gebaseerde auto-selectie kiest automatisch passende afbeeldingen. Geen manuele afbeelding plaatsing nodig. Generator optimaliseert afbeeldingsgroottes en posities. Professionele uitstraling is gegarandeerd zonder enige inspanning.',
      },
      {
        id: '4',
        question: 'Kan Ik Patroontrein Werkbladen Gebruiken in Mijn Klas voor Fijne Motoriek?',
        answer: 'Volledige Toegang abonnement bevat onbeperkt klasgebruik. Print zoveel kopieën als u nodig heeft voor alle leerlingen. Deel digitaal via Google Classroom of andere platforms. Geen per-leerling of per-werkblad limieten. Patroonwerkbladen ondersteunen fijne motoriek ontwikkeling op meerdere manieren. Leerlingen traceren rond afbeeldingen voor handschrift voorbereiding. Tekenen het juiste element in de lege wagon ontwikkelt hand-oog coördinatie.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Patroontrein Werkbladen Beschikbaar - Veilig Leren Lezen?',
        answer: 'Gebruikersinterface is beschikbaar in 11 talen. Engels, Duits, Frans, Spaans, Italiaans, Portugees (Braziliaans), Nederlands, Zweeds, Deens, Noors en Fins. Wissel tussen talen met één klik. Alle labels en instructies verschijnen in uw taal. Nederlands interface ondersteunt leerkrachten in Nederland en België. Groep 1 2 3 terminologie wordt correct gebruikt. Dit ondersteunt veilig leren lezen programma\'s met juiste taalgebruik.',
      },
      {
        id: '6',
        question: 'Kan Ik Werkbladen Groep 3 Verkopen Die Ik Maak met Deze Generator?',
        answer: 'Ja. Volledige Toegang abonnement bevat volledige commerciële print-on-demand licentie. Verkoop alle werkbladen die u maakt op Teachers Pay Teachers, Etsy en Amazon KDP. Geen extra licentiekosten bovenop uw €240/jaar abonnement. Geen naamsvermelding vereist. Maak thematische bundels met patroontrein + kleurplaten + tafels oefenen materialen. 300 DPI exportkwaliteit is essentieel voor commerciële verkoop.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Werkbladen Kleuters Aan voor Specifieke Leerlingen met Fijne Motoriek?',
        answer: 'Volledige canvas bewerkbaarheid geeft controle over elk element. Vergroot afbeeldingen voor leerlingen met visuele beperkingen. Verklein afbeeldingen voor uitdaging. Sleep elementen naar nieuwe posities voor optimale layout. Voeg extra tekst toe met instructies voor fijne motoriek activiteiten. Aanpas aantal aanwijzingen voor cognitief niveau. 8-10 aanwijzingen voor leerlingen die meer herhaling nodig hebben. 4-5 aanwijzingen voor gevorderde leerlingen.',
      },
      {
        id: '8',
        question: 'Welke Leeftijdsgroepen Werken Beste met Patroontrein Werkbladen?',
        answer: 'Patroontrein werkbladen zijn perfect voor 4-8 jaar (groep 1 tot en met groep 4). Eenvoudige AB patronen werken voor 4-5 jarigen in groep 1. Complexe ABC en AABB patronen uitdagen 7-8 jarigen in groep 3 en 4. Groep 1 en 2 leerlingen beginnen met grote, herkenbare afbeeldingen. Dieren, vormen, kleuren zijn vertrouwd. AB patronen zijn toegankelijk. 8-10 aanwijzingen geven voldoende voorbeelden voor begrip.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Werkbladen Groep 3?',
        answer: 'Ja, multi-file upload accepteert JPEG, PNG en GIF formaten. Upload zoveel afbeeldingen tegelijk als u wilt. Uw afbeeldingen verschijnen direct in beschikbare afbeeldingen lijst. Combineer met 3000+ bibliotheek afbeeldingen op één werkblad. Upload letterkaarten voor letters leren activiteiten. Maak alfabetpatronen (A, B, C, A, B, C). Upload foto\'s van klasobjecten voor gepersonaliseerde werkbladen kleuters.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om Patroontrein Werkbladen Groep 3 te Maken?',
        answer: 'Standaard patroontrein werkblad neemt 2-3 minuten van selectie tot download. Kies patroontype (30 seconden), selecteer thema (30 seconden), genereer (instant), download (30 seconden). Sneller dan koffie zetten. Aangepaste werkbladen met specifieke afbeeldingen nemen 5-7 minuten. Browse bibliotheek, selecteer exacte afbeeldingen, plaats op canvas. Nog steeds 10x sneller dan handmatig ontwerpen.',
      },
      {
        id: '11',
        question: 'Bevatten Patroontrein Werkbladen Antwoordsleutels voor Rekenen Werkbladen?',
        answer: 'Ja, patroontrein generator maakt automatisch antwoordsleutel voor elk werkblad. Antwoordsleutel toont complete patroon met alle vagons gevuld. Leerkrachten zien direct het correcte antwoord. Nakijken is snel en gemakkelijk. Download zowel werkblad als antwoordsleutel in JPEG of PDF formaat. Beide bestanden zijn 300 DPI kwaliteit. Print antwoordsleutel voor eigen referentie of projecteer op smartboard.',
      },
      {
        id: '12',
        question: 'Kan Ik Werkbladen Groep 3 Maken over Specifieke Schoolvakken?',
        answer: 'Ja, thematische afbeeldingen dekken alle basisschool vakken. Wiskundethema\'s voor rekenen werkbladen en sommen tot 20 oefening. Letterthema\'s voor veilig leren lezen en letters leren. Wetenschapsthema\'s (dieren, planten, weer) voor wereldoriëntatie. Combineer patroonherkenning met vakspecifieke vocabulaire. Seizoensthema\'s linken aan jaarkalender en weerkunde. Upload vakspecifieke afbeeldingen voor gespecialiseerde eenheden.',
      },
    ],
  },

  // Pricing - Full Access pricing
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Onbeperkt patroontrein werkbladen maken',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
      'Volledig bewerkbaar canvas',
      'Alle 33 werkblad generators',
      'Antwoordbladen inbegrepen',
    ],
    ctaText: 'Nu Starten',
    bundleDescription: 'Uw abonnement geeft toegang tot alle 33 werkbladgeneratoren',
    bundleApps: [],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Patroontrein met Andere Werkbladen voor Complete Lesplannen',
    sectionDescription: 'Het Volledige Toegang abonnement bevat 33 werkblad generators die perfect samenwerken. Combineer patroontrein met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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
        slug: 'alphabet-train',
        name: 'Alfabet Trein',
        category: 'Letters Leren',
        icon: '🚂',
        description: 'Combineer patroontrein met alfabettrein voor letters leren en patroonherkenning samen.',
      },
      {
        id: '2',
        slug: 'pattern-worksheet',
        name: 'Patroon Werkbladen',
        category: 'Logisch Denken',
        icon: '🔢',
        description: 'Vul patroontrein aan met patroon werkbladen voor uitgebreide patroonherkenning oefeningen.',
      },
      {
        id: '3',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer met optelwerkbladen voor geïntegreerde rekenlessen met visuele elementen.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creatief',
        icon: '🎨',
        description: 'Voeg kleuractiviteiten toe aan patroonwerkbladen voor fijne motoriek ontwikkeling.',
      },
      {
        id: '5',
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Rekenen',
        icon: '🔢',
        description: 'Combineer met Zoek en Tel voor extra telling en patroonherkenning vaardigheden.',
      },
      {
        id: '6',
        slug: 'matching-app',
        name: 'Koppelspel',
        category: 'Logica',
        icon: '🔗',
        description: 'Voeg koppelactiviteiten toe aan patroonwerkbladen voor visuele discriminatie.',
      },
    ],
  },
};

export default patternTrainNlContent;
