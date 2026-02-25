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
    title: 'Gratis Patroontrein Generator | LessonCraftStudio',
    description: 'Maak uitprintbare patroontreinoefeningen voor kinderen. Ontwikkel patroonherkenning en sequentie van kleuterschool tot groep 4. Gratis PDF.',
    keywords: 'patroontrein oefeningen, patroonherkenning kinderen, sequentie oefening, patronen kleuterschool, trein patroon uitprintbaar, patroonreeks oefening, herhalend patroon, patroontraining kinderen, sequentie-oefening kleuterschool, beeldpatroon oefening',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/patroontrein-werkbladen',
      },

  // Hero Section
  hero: {
    title: 'Patroontrein Generator',
    subtitle: 'Patroonherkenning en Sequentie-oefeningen met Afbeeldingen',
    description: `Maak gratis werkblad patroontrein met onze professionele generator. Uw Volledige Toegang abonnement geeft u onbeperkte werkblad creatie zonder kosten per werkblad. Genereer gratis werkbladen perfect voor groep 1, groep 2 en groep 3 leerlingen. Download gratis printables in minder dan 3 minuten.

Patroonherkenning is een fundamentele wiskundige vaardigheid voor jonge kinderen. Onze patroontrein maker helpt leerkrachten visueel aantrekkelijke werkblad voor kinderen te creëren die fijne motoriek en logisch denken ontwikkelen. Kies uit 5 patroonsoorten (AB, AAB, ABB, ABC, AABB) en pas het moeilijkheidsniveau aan voor elk werkblad voor kleuters.

Werkbladen groep 3 vereisen vaak meer uitdagende patronen dan werkblad voor kleuters. Met aanpasbare aanwijzingen (4-10 voorbeelden), thema-gebaseerde afbeeldingen en volledige bewerkbaarheid op canvas creëert u gedifferentieerde gratis werkblad voor kinderen voor alle niveaus. Combineer met onze rekenen werkbladen en letters leren activiteiten voor complete lespakketten.`,
    previewImageSrc: '/samples/dutch/pattern-train/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Bekijk hoe het werkt',
        modalTitle: 'Overzicht van functies',
      },
      appSpecific: {
        videoId: '5A4aHvcC5u4',
        buttonText: 'Patronentrein Functies',
        modalTitle: 'Patronentrein Handleiding',
      },
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
    items: [],
    
  },

  // Features Grid
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Onze patroontrein generator biedt professionele functies voor het maken van gratis werkbladen en gratis printables. Elk werkblad voor kinderen ondersteunt fijne motoriek ontwikkeling en patroonherkenning vaardigheden. Leerkrachten maken gratis werkblad voor kleuters gecombineerd met visuele patronen in minuten. Volledige Toegang abonnement (€240 per jaar) geeft toegang tot alle functies en 3000+ afbeeldingen.',
    highlightBadgeText: 'Uitgelicht',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    badgeText: 'Functies',
    trustBadges: {
      allFeatures: 'Alle functies inbegrepen',
      noHiddenFees: 'Geen verborgen kosten',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Maak gratis werkbladen patroontrein in minder dan 3 minuten. Geen ontwerpervaring vereist voor werkblad voor kinderen en werkblad voor kleuters. Volg deze 5 eenvoudige stappen van selectie tot download.',
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
        title: 'Stap 1: Kies Uw Content voor Gratis Werkblad voor Kleuters',
        description: `Selecteer eerst een patroontype uit het dropdown menu. Kies AB voor eenvoudige werkbladen kleuters en groep 1. Kies AAB of ABB voor groep 2 leerlingen. Selecteer ABC of AABB voor uitdagendere werkbladen groep 3 en 4.

Kies vervolgens uw afbeeldings-selectiemethode uit drie opties. Optie 1 is thema-gebaseerde auto-selectie. Kies een thema zoals "Dieren" of "Vormen" en de app selecteert automatisch passende afbeeldingen. Perfect voor snelle oefenbladen gratis van tijdrovend zoeken.

Optie 2 is handmatige afbeelding selectie uit de 3000+ bibliotheek. Browse afbeeldingen per thema en klik om ze aan uw patroon toe te voegen. Combineer verschillende thema's voor unieke patronen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Gratis Werkbladen en Gratis Printables',
        description: `Selecteer uw papierformaat uit het Page Setup menu. Letter Portrait (8.5×11") is standaard in Noord-Amerika. A4 Portrait (210×297mm) is standaard in Nederland en België. Landscape formaten bieden meer breedte voor treinvisualisatie.

Kies uw paginakleur met de kleurenkiezer. Witte achtergrond is standaard voor professionele oefenbladen gratis van afleidingen. Pastelkleuren voegen visuele interesse toe aan werkbladen kleuters. Lichte kleuren besparen printerinkt vergeleken met donkere achtergronden.

Selecteer uw taalvoorkeur voor de gebruikersinterface. Nederlands is beschikbaar voor leerkrachten in Nederland en Vlaanderen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Uw Gratis Werkblad voor Kinderen Groep 1 2',
        description: `Klik op de "Creëer" knop om uw patroontrein werkblad te genereren. Het werkblad verschijnt direct op het canvas binnen 2-3 seconden. Geen wachttijd of processing delays. Onmiddellijke preview toont exact hoe uw werkblad eruit ziet.

De patroontrein verschijnt met alle vagons gevuld behalve de laatste. De gevulde vagons tonen het herhalende patroon volgens uw gekozen type. De lege wagon geeft ruimte voor leerlingen om het patroon te voltooien.

Wissel tussen Worksheet tab en Answer Key tab om beide versies te bekijken. Het werkblad toont de lege wagon voor leerling invulling. Het antwoordblad toont het complete patroon met alle vagons gevuld.`,
        icon: '🚀',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas voor Aangepaste Werkblad voor Kinderen',
        description: `Klik op elk element om het te selecteren voor bewerking. Geselecteerde objecten tonen selectiehandles aan de hoeken. Sleep objecten naar nieuwe posities overal op het canvas. Verplaats afbeeldingen voor betere visuele balans.

Vergroot of verklein afbeeldingen door aan hoekhandles te slepen. Grotere afbeeldingen zijn makkelijker voor werkbladen kleuters en groep 1 2. Kleinere afbeeldingen verhogen de moeilijkheid door fijne visuele discriminatie te vereisen.

Voeg extra tekstelementen toe met de Text Tools. Type instructies zoals "Welke afbeelding komt in de lege wagon?" of "Teken het patroon verder". Pas tekstkleur, grootte en lettertype aan voor leesbaarheid.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Gratis Werkblad en Gratis Printables Zonder Watermerken',
        description: `Klik op de "Download" dropdown om exportopties te bekijken. Kies tussen JPEG en PDF formaten voor beide werkblad en antwoordblad. Alle downloads zijn 300 DPI kwaliteit voor professioneel printen. Uw Volledige Toegang abonnement verwijdert alle watermerken automatisch.

Download Worksheet (JPEG) voor digitaal delen via e-mail of Google Classroom. JPEG bestanden zijn kleiner in bestandsgrootte voor snelle verzending.

Download Worksheet (PDF) voor professionele printkwaliteit. PDF formaat behoudt exacte layout op elk apparaat en printer. Elke download bevat zowel het werkblad als het antwoordblad.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters en Gratis Printables voor Elke Behoefte',
    sectionDescription: 'Gratis werkbladen patroontrein ondersteunen diverse gebruikers in verschillende onderwijscontexten. Leerkrachten groep 1 2 3 gebruiken gratis werkblad voor kinderen voor wiskundige basisvaardigheden. Thuisonderwijsouders maken werkblad voor kleuters voor hun kinderen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Leerkrachten, ouders en pedagogen stellen vaak dezelfde vragen over gratis werkblad voor kinderen en werkblad voor kleuters. Deze FAQ beantwoordt vragen over gratis printables, gebruik in klas, commerciële verkoop en combinatie met andere materialen.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig betalen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [], // Samples loaded dynamically from content manager
    
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
    bundleDescription: 'Uw abonnement geeft toegang tot alle 33 werkbladgeneratoren:',
    bundleApps: [
      'Sommen met Plaatjes',
      'Alfabettrein',
      'Groot of klein',
      'Plaatjesbingo',
      'Grafieken tellen en kleuren',
      'Code-optellen',
      'Kleurplaten',
      'Beeldkruiswoordpuzzel',
      'Beeldcryptogram',
      'Tekenen en kleuren',
      'Lijnen Trekken',
      'Zoek en Tel',
      'Voorwerpen zoeken',
      'Rooster koppelen',
      'Koppelspel',
      'Rekenpuzzel',
      'Rekenwerkbladen',
      'Ontbrekende stukjes',
      'Meer of minder',
      'Welke hoort er niet bij',
      'Patronentrein',
      'Patroonwerkbladen',
      'Plaatjespad',
      'Plaatjes sorteren',
      'Voorzetsels',
      'Schaduw koppelen',
      'Aftrekken',
      'Sudoku voor Kinderen',
      'Schatzoeken',
      'Woord raden',
      'Letterkraker',
      'Woordzoekers',
      'Schrijfoefeningen',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Werkbladen Combineren - Werkblad voor Kinderen en Gratis Printables',
    sectionDescription: 'Het Volledige Toegang abonnement bevat 33 werkblad generators die perfect samenwerken. Combineer gratis werkblad voor kinderen met andere tools voor complete leerpakketten. Ontdek hoe je werkblad voor kleuters bundels maakt voor elke lesweek.',
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
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default patternTrainNlContent;
