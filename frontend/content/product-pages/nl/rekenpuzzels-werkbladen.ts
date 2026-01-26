import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Puzzle Worksheets - Dutch Content (Rekenpuzzels Werkbladen)
 *
 * File: frontend/content/product-pages/nl/rekenpuzzels-werkbladen.ts
 * URL: /nl/apps/rekenpuzzels-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/math-puzzle.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * App Tier: FULL ACCESS (€240/year) - Volledige Toegang
 *
 * Dutch Keywords:
 * 1. Werkbladen groep 3
 * 2. Werkbladen kleuters
 * 3. Rekenen werkbladen
 * 4. Oefenbladen gratis
 * 5. Tafels oefenen
 * 6. Sommen tot 20
 * 7. Fijne motoriek
 * 8. Kleurplaten
 * 9. Veilig leren lezen
 * 10. Letters leren schrijven oefenen
 */

export const mathPuzzleNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'rekenpuzzels-werkbladen',
    appId: 'math-puzzle',
    title: 'Rekenpuzzels Werkbladen Groep 3 - Oefenbladen Gratis voor Rekenen en',
    description: 'Maak professionele rekenpuzzels met onze math puzzle generator voor groep 1 2 en groep 3. Perfect voor leerkrachten die werkbladen kleuters en rekenen.',
    keywords: 'rekenpuzzels werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, rekenen werkbladen, sommen tot 20, tafels oefenen, fijne motoriek, kleurplaten, veilig leren lezen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/rekenpuzzels-werkbladen',
      },

  // Hero Section - FULL text from math-puzzle.md paragraphs 1-3
  hero: {
    title: 'Rekenpuzzels Werkbladen Groep 3',
    subtitle: 'Oefenbladen Gratis voor Rekenen en Sommen tot 20',
    description: `Maak professionele rekenpuzzels met onze math puzzle generator voor groep 1 2 en groep 3. Perfect voor leerkrachten die werkbladen kleuters en rekenen werkbladen nodig hebben. Uw Volledige Toegang abonnement geeft u onbeperkte toegang tot het maken van oefenbladen zonder extra kosten per werkblad. Genereer gepersonaliseerde rekenpuzzels met optellen en aftrekken voor groep 1 2 en groep 3 leerlingen.

Download hoogwaardige PDF oefenbladen in minder dan 3 minuten. Onze rekenpuzzels werkbladen combineren fijne motoriek met tafels oefenen. Ideaal voor rekenen werkbladen groep 3 en werkbladen kleuters die sommen tot 20 leren. De generator maakt automatisch antwoordsleutels aan.

Kies puzzelroosters van 2×2 tot 4×4. Selecteer optellen subtractie of beide bewerkingen. Voeg afbeeldingen toe uit onze bibliotheek van 3000+ kindvriendelijke plaatjes. Upload uw eigen afbeeldingen om werkbladen te personaliseren voor uw leerlingen. Alle rekenpuzzels downloaden als professionele 300 DPI PDF bestanden.`,
    previewImageSrc: '/samples/dutch/math-puzzle/sample-1.jpeg',
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
        videoId: 'n5QO39Lq5l8',
        buttonText: 'Rekenpuzzels Functies',
        modalTitle: 'Rekenpuzzels Handleiding',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/dutch/math-puzzle/
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

  // Features Grid - FULL text from math-puzzle.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Onze math puzzle generator biedt complete functionaliteit voor leerkrachten. Maak rekenen werkbladen voor groep 1 2 en groep 3. Elk oefenblad te maken zonder extra kosten. Volledige Toegang abonnement geeft toegang tot alle functies. Download onbeperkt werkbladen kleuters en rekenpuzzels voor sommen tot 20.',
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

  // How-To Guide - FULL text from math-puzzle.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Maak professionele rekenen werkbladen in minder dan 3 minuten. Geen ontwerpervaring nodig voor werkbladen kleuters. Volg deze 5 simpele stappen voor perfecte oefenbladen. Elke stap duurt minder dan 1 minuut. Complete rekenpuzzels voor sommen tot 20 klaar om te printen.',
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
        title: 'Stap 1: Kies Inhoud voor Rekenpuzzels - Werkbladen Groep 3 Sommen tot 20 en Rekenen Werkbladen',
        description: `Open de math puzzle generator in uw browser. Selecteer Nederlandse taal uit het taalmenu. Interface verschijnt volledig in het Nederlands. Klaar om werkbladen groep 3 te maken.

Kies eerst het puzzelrooster formaat. Klik op het rijen veld en typ 2 tot 4. Klik op kolommen veld en typ 2 tot 4. Voor werkbladen kleuters start met 2×2 roosters. Voor groep 3 gebruik 3×3 of 4×4 roosters. Grotere roosters uitdagender voor sommen tot 20.

Selecteer vervolgens de rekenbewerking. Drie opties beschikbaar in het menu. Optellen voor beginnende rekenen werkbladen. Aftrekken voor gevorderde groep 3 leerlingen. Beide bewerkingen voor uitdagende oefenbladen. Kies optellen voor eerste tafels oefenen.

Scroll naar de afbeeldingenbibliotheek. Browse door 3000+ beschikbare plaatjes. Selecteer een thema of zoek specifieke afbeeldingen. Klik op een afbeelding om te selecteren. Gekozen afbeelding verschijnt in de voorbeeldweergave. Deze afbeelding komt in elke cel van uw rekenpuzzels.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan - Werkbladen Kleuters Oefenbladen en Tafels Oefenen',
        description: `Klik op de pagina-instellingen sectie. Kies uw gewenste paginaformaat. Letter Portrait voor Amerikaanse printers. A4 Portrait voor Europese printers. Perfect voor standaard werkbladen groep 3.

Selecteer paginakleur indien gewenst. Witte achtergrond standaard voor oefenbladen. Pastelkleuren beschikbaar voor kleurrijke werkbladen kleuters. Lichte kleuren werken goed bij kopiëren. Donkere kleuren gebruiken meer inkt.

Browse door beschikbare achtergrondthema's. Seizoensthema's beschikbaar - lente zomer herfst winter. Feestthema's voor speciale gelegenheden. Geen achtergrond voor simpele rekenen werkbladen. Achtergronden maken werkbladen aantrekkelijker voor groep 1 2.

Bekijk beschikbare randthema's. Decoratieve randen voor speciale werkbladen groep 3. Geen rand voor standaard oefenbladen. Pas randopaciteit aan indien nodig. Randen voegen professionele touch toe aan tafels oefenen werkbladen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Uw Rekenpuzzels - Directe Preview van Werkbladen Groep 3 Rekenen Werkbladen',
        description: `Klik op de groene Genereren knop. Generator berekent automatisch de sommen. Optelsommen binnen bereik voor sommen tot 20. Elke cel krijgt unieke rekensom. Gekozen afbeelding verschijnt in elke cel.

Werkblad verschijnt direct op canvas. Geen wachttijd voor laden. Instant preview van uw rekenen werkbladen. Alle sommen netjes uitgelijnd in rooster. Perfect formaat voor werkbladen groep 3.

Controleer of sommen correct moeilijkheidsgraad hebben. Voor groep 1 2 eenvoudige optelsommen. Voor groep 3 complexere sommen tot 20. Wijzig bewerking indien sommen te makkelijk of moeilijk. Genereer opnieuw met nieuwe instellingen.

Elke keer genereren maakt nieuw werkblad. Andere sommen in iedere poging. Onbeperkt verschillende oefenbladen maken. Geen twee werkbladen groep 3 identiek. Perfect voor grote klassen die unieke rekenpuzzels nodig hebben.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Fijne Motoriek Kleurplaten Elementen Toevoegen aan Oefenbladen',
        description: `Klik op elk element om te selecteren. Handvatten verschijnen rond geselecteerd object. Sleep handvatten om grootte aan te passen. Roteer met draaihandvat. Verplaats door te slepen.

Voeg eigen tekst toe aan werkbladen groep 3. Klik op Tekst Toevoegen knop. Typ instructies of namen van leerlingen. Kies lettertype uit 6 beschikbare opties. Wijzig tekstgrootte en kleur. Perfect voor gepersonaliseerde werkbladen kleuters.

Upload eigen afbeeldingen voor extra personalisatie. Klik op upload knop. Selecteer meerdere bestanden tegelijk. JPEG PNG GIF formaten werken allemaal. Geüploade afbeeldingen direct beschikbaar. Sleep naar canvas voor unieke rekenen werkbladen.

Voeg kleurplaten elementen toe voor fijne motoriek oefening. Voeg eenvoudige lijntekeningen toe. Combineer rekenen met kleuren. Leerlingen lossen sommen op en kleuren plaatjes in. Excellente combinatie van rekenen en fijne motoriek.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print Rekenen Werkbladen - Hoogwaardige Oefenbladen voor Werkbladen Kleuters',
        description: `Klik eerst op Antwoordsleutel Genereren. Generator maakt automatisch antwoordblad. Alle sommen ingevuld met correcte antwoorden. Antwoordsleutel verschijnt op apart tabblad. Beide werkbladen klaar om te downloaden.

Klik op de Download knop. Kies tussen JPEG en PDF formaten. PDF perfect voor professioneel printen van werkbladen groep 3. JPEG goed voor digitaal delen. Beide formaten hoogwaardige 300 DPI kwaliteit.

Download werkblad en antwoordsleutel apart. Twee bestanden in uw downloadmap. Werkblad voor leerlingen zonder antwoorden. Antwoordsleutel voor leerkrachten met oplossingen. Perfect systeem voor rekenen werkbladen en oefenbladen.

Kies grijswaarden optie voor inkt besparing. Zwart-wit versie print goedkoper. Kleurenversie mooier voor speciale gelegenheden. Beide opties beschikbaar voor werkbladen kleuters en groep 3. Schakel eenvoudig tussen kleur en zwart-wit.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from math-puzzle.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'Onze math puzzle generator werkt voor alle educatieve settings. Van groep 1 2 werkbladen kleuters tot groep 3 rekenen werkbladen. Thuisonderwijs ouders tot professionele leerkrachten. Iedereen maakt eenvoudig oefenbladen voor sommen tot 20. Volledige Toegang abonnement ondersteunt alle gebruikers.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from math-puzzle.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Leerkrachten stellen regelmatig vragen over onze generator. Kan ik het combineren met veilig leren lezen methodes? Werkt het voor letters leren schrijven oefenen activiteiten? Geschikt voor tafels oefenen en sommen tot 20 practice? Kunnen leerlingen kleurplaten en fijne motoriek combineren? Alle antwoorden hieronder voor oefenbladen vragen.',
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
      'Alle 33 werkbladgeneratoren',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
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
    sectionDescription: 'LessonCraft Studio platform biedt 33 verschillende worksheet generators. Rekenpuzzels combineren perfect met andere werkblad types. Maak complete lespakketten die meerdere vaardigheden oefenen. Één thema, meerdere werkblad formats voor versterkte leren.',
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

export default mathPuzzleNlContent;
