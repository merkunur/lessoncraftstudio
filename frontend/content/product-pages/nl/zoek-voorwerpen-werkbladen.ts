import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/zoek-voorwerpen-werkbladen.ts
 * URL: /nl/apps/zoek-voorwerpen-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/find-objects.md
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
 * Universal Keywords (5+ in TITLE fields):
 * - Gratis werkblad
 * - Gratis werkblad voor kinderen
 * - Gratis werkbladen
 * - Gratis printables
 * - Werkblad voor kinderen
 * - Werkblad voor kleuters
 */

export const findObjectsNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'zoek-voorwerpen-werkbladen',
    appId: 'find-objects',
    title: 'Zoek Voorwerpen Werkbladen - Gratis Werkblad voor Kinderen Groep 1 2',
    description: 'Maak professionele zoekwerkbladen met onze gebruiksvriendelijke generator. Jouw Volledige Toegang abonnement geeft je onbeperkte toegang tot werkbladen voor.',
    keywords: 'zoek voorwerpen werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, visuele discriminatie, veilig leren lezen, letters leren, rekenen werkbladen, I Spy werkbladen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/zoek-voorwerpen-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-objects/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Zoek voorwerpen werkbladen - gratis werkblad voor kinderen met visuele discriminatie oefeningen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-objects/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen zoek voorwerpen - werkblad voor kleuters met I Spy activiteit',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-objects/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Werkblad voor kinderen zoek de vreemde eend - gratis printables voor groep 3',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-objects/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad zoek voorwerpen - oefenbladen gratis voor werkbladen kleuters',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-objects/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Zoek voorwerpen gratis werkbladen - werkblad voor kleuters en visuele training',
      },
    ],
  },

  // Hero Section - FULL text from find-objects.md paragraphs 1-2
  hero: {
    title: 'Zoek de Voorwerpen Werkbladen',
    subtitle: 'Gratis Werkbladen voor Kleuters en Groep 3 Kinderen',
    description: `Maak professionele zoekwerkbladen met onze gebruiksvriendelijke generator. Jouw Volledige Toegang abonnement geeft je onbeperkte toegang tot werkbladen voor kleuters en groep 3 leerlingen. Download printklare oefenbladen gratis van extra kosten per werkblad. Genereer in minder dan drie minuten prachtige zoekactiviteiten.

Onze zoekgenerator biedt twee unieke modi voor werkbladen groep 3 en werkbladen kleuters. De eerste modus is "I Spy" waarbij kinderen verborgen voorwerpen zoeken tussen afleidende afbeeldingen. De tweede modus is "Vind de Vreemde Eend" waarbij leerlingen afbeeldingen zonder paar moeten identificeren.

Deze werkbladen kleuters ondersteunen de ontwikkeling van visuele waarneming en fijne motoriek. Kinderen leren vormen herkennen en verschillen opmerken. Perfect voor leerkrachten die werkbladen groep 3 nodig hebben voor visuele training. De oefenbladen gratis downloaden als PDF of JPEG.`,
    previewImageSrc: '/samples/dutch/find-objects/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/dutch/find-objects/
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from find-objects.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Deze sectie beschrijft alle functies van onze zoekwerkbladen generator. Van eenvoudig maken tot volledig aanpassen. Ontdek waarom duizenden leerkrachten kiezen voor onze werkbladen kleuters en werkbladen groep 3. Elke functie is ontworpen om tijd te besparen en professionele resultaten te leveren.',
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

  // How-To Guide - FULL text from find-objects.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Leer in vijf eenvoudige stappen professionele zoekwerkbladen maken. Het hele proces duurt minder dan drie minuten. Geen technische kennis of ontwerpervaring nodig. Volg deze handleiding en maak direct werkbladen kleuters en werkbladen groep 3.',
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
        title: 'Stap 1: Gratis Werkbladen Modus Kiezen - I Spy of Vreemde Eend',
        description: `Open de zoekwerkbladen generator in jouw browser. Het eerste wat je ziet is het zijpaneel met alle opties. Zoek de sectie "Object Selectie" in het menu. Hier kies je tussen twee activiteitenmodi voor jouw werkbladen kleuters.

De I Spy modus is perfect voor klassieke zoekactiviteiten. Kinderen zoeken verborgen voorwerpen tussen afleidende afbeeldingen. Selecteer één tot vijf objecten om te verstoppen. Kies acht tot twaalf afleidende afbeeldingen als achtergrond. Deze modus traint visuele discriminatie en concentratie.

De Vreemde Eend modus werkt anders maar is even leerzaam. Hier maak je paren van identieke afbeeldingen. Voeg dan één tot drie ongepaarde afbeeldingen toe. Leerlingen moeten ontdekken welke afbeeldingen geen match hebben. Perfect voor werkbladen groep 3 met matching oefeningen. Beide modi ondersteunen fijne motoriek ontwikkeling.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Werkblad voor Kinderen Afbeeldingen Selecteren - 3000+ Opties',
        description: `Navigeer naar de sectie "Afbeeldingenbibliotheek" in het zijpaneel. Hier vind je meer dan drieduizend kindvriendelijke afbeeldingen. Gebruik de zoekfunctie om specifieke afbeeldingen te vinden. Type bijvoorbeeld "appel" of "auto" in het zoekveld.

Filter op thema voor snellere selectie van werkbladen kleuters. Kies een thema zoals "Dieren" of "Voertuigen" uit het dropdown menu. De beschikbare afbeeldingen worden direct gefilterd. Klik op een afbeelding om deze toe te voegen aan jouw selectie. Herhaal dit voor alle gewenste afbeeldingen.

Je kunt ook een thema selecteren voor automatische vulling. In de Object Selectie sectie kies je een thema voor afleidingsafbeeldingen. De generator selecteert automatisch passende afbeeldingen. Dit bespaart tijd bij het maken van oefenbladen gratis. Combineer themakeuze met handmatige selectie voor maximale controle.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Werkblad Genereren - Werkblad voor Kleuters Aanmaken',
        description: `Nadat je alle afbeeldingen hebt geselecteerd klik je op "Aanmaken". Deze knop bevindt zich rechtsboven in de interface. Kies "Nieuw Werkblad" uit het dropdown menu. De generator maakt direct jouw werkbladen kleuters aan.

Het werkblad verschijnt op het canvas in het midden van het scherm. Alle afbeeldingen zijn automatisch geplaatst op aantrekkelijke posities. De verborgen objecten of ongepaarde afbeeldingen zijn geïntegreerd. Het hele proces duurt slechts enkele seconden. Jouw oefenbladen gratis zijn nu klaar voor bewerking.

Bekijk het resultaat en controleer de plaatsing. Zijn alle afbeeldingen goed zichtbaar? Is de moeilijkheidsgraad geschikt voor jouw leerlingen? Zo niet, dan kun je alles aanpassen in de volgende stap. De generator geeft je volledige controle over het eindresultaat.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Werkblad voor Kinderen Bewerken - Gratis Printables Aanpassen',
        description: `Klik op een afbeelding om deze te selecteren op het canvas. Er verschijnt een bewerkingswerkbalk bovenaan het scherm. Hier vind je alle opties voor jouw werkbladen kleuters. Sleep afbeeldingen naar nieuwe posities met de muis.

Gebruik de hoekpunten om afbeeldingen te schalen. Maak objecten groter voor jongere kinderen in groep 1 2. Maak ze kleiner voor uitdagender werkbladen groep 3. Roteer afbeeldingen door de rotatiehandgreep te slepen. Variatie in oriëntatie maakt de zoekactiviteit moeilijker.

De laagfuncties bepalen welke afbeeldingen voor of achter liggen. Klik op het laagicoon voor opties zoals "Naar Voren Brengen". Verberg objecten achter andere afbeeldingen voor I Spy werkbladen. De uitlijnfuncties helpen bij nette rangschikking. Centreer afbeeldingen horizontaal of verticaal op de pagina.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Werkbladen Downloaden - PDF voor Printen',
        description: `Jouw zoekwerkblad is klaar voor download. Klik op de "Download" knop rechtsboven. Kies jouw gewenste formaat uit het dropdown menu. JPEG is ideaal voor digitaal gebruik en online delen. PDF is perfect voor professioneel printen.

Selecteer "Werkblad PDF" voor hoogwaardige werkbladen kleuters. De 300 DPI resolutie garandeert scherpe afdrukken. Activeer de grijswaarden optie om inkt te besparen. Deze optie bevindt zich onderaan het download menu. Ideaal voor dagelijkse oefenbladen gratis in de klas.

Vergeet de antwoordsleutel niet te genereren. Klik op "Aanmaken" en selecteer "Antwoordsleutel". De generator markeert automatisch de verborgen of ongepaarde objecten. Download de antwoordsleutel apart als PDF. Bewaar beide bestanden voor eenvoudig nakijken.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-objects.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'Onze zoekwerkbladen generator bedient diverse onderwijsprofessionals en ouders. Van kleuterjuffen tot leerkracht-ondernemers. Ontdek hoe verschillende gebruikers profiteren van werkbladen groep 3 en oefenbladen gratis. Elke gebruikersgroep vindt specifieke voordelen voor hun unieke situatie.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from find-objects.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Hier beantwoorden we de meest gestelde vragen over onze zoekwerkbladen generator. Van prijzen tot functies en van combinaties tot commercieel gebruik. Vind antwoorden over werkbladen kleuters en werkbladen groep 3.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig betalen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Full Access pricing (€240/year)
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Onbeperkt werkbladen maken',
      'Alle 33 werkblad generators',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
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
    sectionDescription: 'Het Volledige Toegang abonnement bevat drieëndertig werkblad generators die perfect samenwerken. Combineer zoekwerkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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

export default findObjectsNlContent;
