import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Image Cryptogram Worksheets - Dutch Content (Cryptogram Werkbladen)
 *
 * File: frontend/content/product-pages/nl/cryptogram-werkbladen.ts
 * URL: /nl/apps/cryptogram-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/cryptogram.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * App Tier: FULL ACCESS (€240/year) - Volledige Toegang
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

export const imageCryptogramNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'cryptogram-werkbladen',
    appId: 'cryptogram',
    title: 'Cryptogram Werkbladen Generator - Oefenbladen Gratis voor Werkbladen',
    description: 'Maak professionele cryptogram werkbladen met afbeeldingen met onze cryptogram generator. Met uw Volledige Toegang abonnement creëert u onbeperkt educatieve.',
    keywords: 'cryptogram werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, schrijven oefenen, veilig leren lezen, fijne motoriek, kleurplaten, rekenen werkbladen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/cryptogram-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/cryptogram/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad cryptogram - werkbladen groep 3 voor letters leren',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/cryptogram/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen cryptogram - werkblad voor kleuters met afbeeldingen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/cryptogram/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Werkblad voor kinderen - cryptogram met plaatjes voor groep 1 2',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/cryptogram/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis printables cryptogram - oefenbladen voor veilig leren lezen',
      },
    ],
  },

  // Hero Section - FULL text from cryptogram.md paragraphs 1-4
  hero: {
    title: 'Cryptogram Werkbladen Generator',
    subtitle: 'Oefenbladen Gratis voor Werkbladen Groep 3 en Werkbladen Kleuters',
    description: `Maak professionele cryptogram werkbladen met afbeeldingen met onze cryptogram generator. Met uw Volledige Toegang abonnement creëert u onbeperkt educatieve werkbladen zonder extra kosten per werkblad. Ontwikkel aangepaste cryptogram werkbladen perfect voor werkbladen groep 3, werkbladen kleuters en groep 1 2. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.

Onze cryptogram werkblad maker combineert letters leren met puzzelplezier. Elke letter in de zin wordt vervangen door een afbeelding. Kinderen ontcijferen de code door de afbeeldingen te matchen met letters. Deze unieke aanpak maakt letters leren spannend voor kleuters en basisschoolleerlingen.

De cryptogram generator ondersteunt 11 talen voor de afbeeldingenbibliotheek. U kiest thema's zoals dieren, voedsel of vervoer voor uw puzzels. Upload uw eigen afbeeldingen voor gepersonaliseerde werkbladen. Combineer cryptogram werkbladen met rekenen werkbladen en kleurplaten voor complete leerpakketten.

Genereer cryptogram werkbladen in seconden. Pas elke letter-afbeelding toewijzing aan. Download zowel het werkblad als het antwoordblad. Perfect voor werkbladen groep 3 die schrijven oefenen en letters leren, fijne motoriek ontwikkelen en veilig leren lezen ondersteunen.`,
    previewImageSrc: '/samples/dutch/cryptogram/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/cryptogram/
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
        id: 'sample-1',
        worksheetSrc: '/samples/dutch/cryptogram/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/cryptogram/sample-1.jpeg',
        altText: 'Gratis werkblad cryptogram - werkbladen groep 3 voor letters leren',
        imageTitle: 'Gratis werkblad cryptogram',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/dutch/cryptogram/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/cryptogram/sample-2.jpeg',
        altText: 'Gratis werkbladen cryptogram - werkblad voor kleuters met afbeeldingen',
        imageTitle: 'Gratis werkbladen cryptogram',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/dutch/cryptogram/sample-3.jpeg',
        answerKeySrc: '/samples/dutch/cryptogram/sample-3.jpeg',
        altText: 'Werkblad voor kinderen - cryptogram met plaatjes voor groep 1 2',
        imageTitle: 'Werkblad voor kinderen',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/dutch/cryptogram/sample-4.jpeg',
        answerKeySrc: '/samples/dutch/cryptogram/sample-4.jpeg',
        altText: 'Gratis printables cryptogram - oefenbladen voor veilig leren lezen',
        imageTitle: 'Gratis printables cryptogram',
      },
    ],
    
  },

  // Features Grid - FULL text from cryptogram.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Onze cryptogram werkblad generator biedt alle tools die u nodig heeft voor het maken van professionele werkbladen groep 3 en werkbladen kleuters. Met uw Volledige Toegang abonnement krijgt u toegang tot krachtige functies voor het creëren van boeiende cryptogram puzzels. Elke functie is ontworpen om het maken van werkbladen snel en eenvoudig te maken voor leerkrachten groep 1 2 en basisschoolleerkrachten.',
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

  // How-To Guide - FULL text from cryptogram.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van professionele cryptogram werkbladen duurt minder dan 3 minuten van start tot finish. Onze stap-voor-stap proces is ontworpen voor drukke leerkrachten die snel hoogwaardige werkbladen groep 3 en werkbladen kleuters nodig hebben. Geen ontwerpvaardigheden vereist. Geen ingewikkelde software om te leren.',
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
        title: 'Stap 1: Kies Uw Inhoud voor Cryptogram Werkbladen - Zinnen en Thema\'s voor Werkbladen Kleuters',
        description: `Begin met het typen van uw zinnen in het tekstveld. Elke regel wordt een aparte cryptogrampuzzel. Gebruik korte zinnen voor werkbladen kleuters groep 1 2. Gebruik langere zinnen voor werkbladen groep 3 en oudere leerlingen.

Kies zinnen die aansluiten bij uw lessen. Voor letters leren gebruikt u het alfabet of eenvoudige woorden. Voor veilig leren lezen kiest u hoogfrequente woorden. Voor thematisch onderwijs maakt u zinnen over seizoenen of feestdagen. Elke zin kan tot 8 regels lang zijn.

Selecteer een afbeeldingthema uit het dropdown menu. Dierenthema's werken goed voor jonge leerlingen. Voedselthema's zijn perfect voor gezondheidsonderwijs. Vervoerthema's ondersteunen verkeersveiligheidslessen. Het alfabetthema is ideaal voor beginnende lezers die schrijven oefenen.

U kunt ook "Alle Thema's" selecteren om toegang te krijgen tot de volledige 3000+ afbeeldingbibliotheek. Zoek naar specifieke objecten met de zoekbalk. Combineer thema's voor gevarieerde visuele interesse. Dit maakt oefenbladen gratis uniek en boeiend voor werkbladen groep 3.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan - Letters Leren en Schrijven Oefenen voor Werkbladen Groep 3',
        description: `Kies hoeveel letters u wilt onthullen in de puzzel. Stel in op 0 voor maximale moeilijkheid. Stel in op 3-5 letters voor werkbladen kleuters die nog letters leren. Meer onthuld letters maken de puzzel gemakkelijker voor jonge leerlingen groep 1 2.

Selecteer het maximale aantal regels per puzzel. Kortere puzzels (1-2 regels) werken goed voor fijne motoriek ontwikkeling. Langere puzzels (6-8 regels) zijn perfect voor oudere leerlingen werkbladen groep 3. Pas dit aan op basis van het concentratievermogen van uw leerlingen.

Schakel het automatisch toewijzen selectievakje in als u wilt dat de generator automatisch afbeeldingen aan letters toewijst. Dit bespaart tijd bij het maken van meerdere werkbladen. Of laat het uitgeschakeld om handmatig specifieke afbeeldingen te kiezen voor elke letter. Beide opties geven u volledige controle.

Kies uw paginaformaat uit de opties. Letter Portrait is standaard voor Amerikaanse scholen. A4 Portrait is standaard voor Europese scholen. Landschapsformaten bieden meer horizontale ruimte. Vierkante formaten zijn perfect voor social media posts van uw oefenbladen gratis werkbladen.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Uw Werkblad - Direct Voorbeeld van Werkbladen Kleuters en Rekenen Werkbladen',
        description: `Klik op de Genereren knop. Uw cryptogram werkblad verschijnt direct op het canvas. Elk proces duurt slechts enkele seconden. Geen wachttijd. Geen laden. Direct resultaat dat klaar is om aan te passen.

Het werkblad toont uw zinnen met afbeeldingen die elke letter vervangen. De afbeeldingen worden automatisch geschaald voor leesbaarheid. Spatiëring is geoptimaliseerd voor werkbladen groep 3 en werkbladen kleuters. Alles is professioneel gerangschikt en klaar om te gebruiken.

Het antwoordblad wordt automatisch gegenereerd. Wissel tussen het werkblad en antwoordblad met de tabs bovenaan. Het antwoordblad toont dezelfde puzzel met letters zichtbaar. Dit maakt nakijken snel en eenvoudig voor drukke leerkrachten.

Als u niet tevreden bent met het resultaat, pas dan de instellingen aan en genereer opnieuw. Probeer verschillende thema's. Verander het aantal onthuld letters. Pas het paginaformaat aan. Elk nieuw werkblad wordt in seconden gegenereerd voor letters leren en schrijven oefenen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Volledige Aanpassing voor Oefenbladen Gratis en Kleurplaten',
        description: `Klik op elk element om het te selecteren. Sleep afbeeldingen naar nieuwe posities. Wijzig de grootte door aan de hoeken te slepen. Roteer elementen voor visuele interesse. Verwijder items die u niet wilt. Volledige bewerkbaarheid geeft u complete controle.

Voeg decoratieve elementen toe uit de afbeeldingbibliotheek. Plaats grensafbeeldingen rond de randen. Voeg achtergrondelementen toe voor visuele context. Upload uw eigen afbeeldingen voor personalisatie. Combineer met kleurplaten elementen voor multifunctionele werkbladen.

Gebruik de teksttools om instructies toe te voegen. Kies uit 7 verschillende lettertypes. Pas tekstgrootte aan voor leesbaarheid. Verander kleuren om te matchen met uw klaslokaalthema. Voeg outlines toe voor tekstemfase. Perfect voor het maken van professionele werkbladen groep 3.

De uitlijn- en laaggereedschappen helpen bij precieze plaatsing. Centreer elementen horizontaal of verticaal. Breng objecten naar voren of naar achteren. Vergrendel elementen om onbedoelde wijzigingen te voorkomen. Onbeperkt ongedaan maken en opnieuw geeft u vertrouwen om te experimenteren met oefenbladen gratis ontwerpen.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print Werkbladen Groep 3 - Hoogwaardige PDF en JPEG Bestanden',
        description: `Klik op de Download knop om uw opties te zien. Download alleen het werkblad. Download alleen het antwoordblad. Of download beide voor volledige lesvoorbereiding. Elk bestand downloadt in seconden.

Kies tussen JPEG voor digitaal delen of PDF voor printen. PDF-bestanden behouden perfecte kwaliteit bij elke schaal. JPEG-bestanden zijn kleiner voor e-mailen of uploaden. Beide formaten zijn 300 DPI professionele printkwaliteit voor werkbladen groep 3 en werkbladen kleuters.

Schakel de grijswaarden optie in om printkosten te verlagen. Grijswaardenversies gebruiken minder inkt maar behouden duidelijkheid. Perfect voor grote klaslokalen die veel oefenbladen gratis moeten printen. Kleurenversies zijn levendig en aantrekkelijk voor jonge leerlingen.

Uw gedownloade werkbladen zijn direct klaar voor gebruik. Print ze thuis op een gewone printer. Print ze op school op standaard kopieerpapier. Of upload ze naar commerciële printdiensten voor bulkproductie. Verkoop ze online met uw Volledige Toegang commerciële licentie. Combineer met rekenen werkbladen, kleurplaten en andere werkbladen voor complete leerpakketten voor letters leren en schrijven oefenen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases Section - FULL text from cryptogram.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'Onze cryptogram werkblad generator bedient diverse onderwijsbehoeften van kleuterscholen tot basisonderwijs. Leerkrachten groep 1 2 gebruiken het voor fijne motoriek en letters leren. Leerkrachten groep 3 maken werkbladen voor veilig leren lezen. Thuisonderwijsouders creëren oefenbladen gratis voor hun kinderen.',
    badgeText: 'Gebruikssituaties',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL questions and answers
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Leerkrachten en ouders hebben vergelijkbare vragen over onze cryptogram werkblad generator. Deze FAQ sectie beantwoordt de meest gestelde vragen over functionaliteit, prijzen en gebruik. Van werkbladen kleuters tot werkbladen groep 3 toepassingen.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig afrekenen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing Section
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
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
    benefits: [
      'Alle 33 werkblad generatoren',
      'Onbeperkte downloads',
      '11 talen ondersteuning',
      'Commerciële licentie inbegrepen',
      '300 DPI professionele kwaliteit',
      '3000+ afbeeldingen bibliotheek',
    ],
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Gratis Werkbladen Combineren - Werkblad voor Kinderen en Gratis Printables',
    sectionDescription: 'Uw Volledige Toegang abonnement bevat 33 gratis werkblad generatoren op één platform. Combineer cryptogram werkbladen met rekenen werkbladen, kleurplaten en andere tools. Maak complete thematische leerpakketten voor werkbladen groep 3 en werkbladen kleuters. Elke combinatie versterkt leren op meerdere manieren.',
    ctaTitle: 'Klaar om Professionele Werkbladen te Maken?',
    ctaDescription: 'Sluit u aan bij duizenden leerkrachten die professionele werkbladen maken met LessonCraft Studio.',
    primaryCtaText: 'Gratis Uitproberen',
    secondaryCtaText: 'Bekijk Alle 33 Apps',
    badgeText: 'Werkt Uitstekend Met',
    exploreText: 'Alle apps bekijken',
    trustBadges: {
      securePayment: 'Veilig betalen',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default imageCryptogramNlContent;
