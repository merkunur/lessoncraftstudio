import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Chart Count Worksheets - Dutch Content (Telgrafieken Werkbladen)
 *
 * File: frontend/content/product-pages/nl/telgrafieken-werkbladen.ts
 * URL: /nl/apps/telgrafieken-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/chart-count.md
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

export const chartCountNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'telgrafieken-werkbladen',
    appId: 'chart-count',
    title: 'Telgrafieken Werkbladen Maker - Gratis Oefenbladen voor Rekenen en',
    description: 'Maak professionele telgrafieken werkbladen met onze werkbladen generator. Met je Volledige Toegang abonnement maak je onbeperkt werkbladen zonder extra kosten.',
    keywords: 'telgrafieken werkbladen, werkbladen groep 3, werkbladen kleuters, rekenen werkbladen, oefenbladen gratis, kleurplaten, letters leren, schrijven oefenen, tafels oefenen, veilig leren lezen, fijne motoriek, sommen tot 20',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/telgrafieken-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/chart-count/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Telgrafieken werkblad - gratis werkblad voor kinderen met rekenen oefeningen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/chart-count/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen voor kleuters - telgrafieken werkbladen met sommen tot 20',
      },
    ],
  },

  // Hero Section - FULL text from chart-count.md paragraphs 1-4
  hero: {
    title: 'Telgrafieken Werkbladen Maker',
    subtitle: 'Gratis Oefenbladen voor Rekenen en Tellen in Groep 3',
    description: `Maak professionele telgrafieken werkbladen met onze werkbladen generator. Met je Volledige Toegang abonnement maak je onbeperkt werkbladen zonder extra kosten per werkblad. Deze tool is ideaal voor rekenen werkbladen waarbij kinderen leren tellen en gegevens visualiseren. Download werkbladen als PDF in minder dan 3 minuten.

Telgrafieken zijn perfecte rekenen werkbladen voor werkbladen groep 3 en werkbladen kleuters. Kinderen leren op een speelse manier omgaan met cijfers en grafieken. De generator biedt meer dan 3000 afbeeldingen, allemaal inbegrepen in je abonnement. Combineer plaatjes met telactiviteiten voor effectieve sommen tot 20 oefeningen.`,
    previewImageSrc: '/samples/dutch/chart-count/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/dutch/chart-count/
  samples: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Gratis Werkbladen en Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis werkblad voor kinderen van professionele kwaliteit. Gratis werkbladen en werkblad voor kinderen perfect voor werkblad voor kleuters. Gratis werkblad voor kinderen en werkblad voor kinderen en werkblad voor kleuters inclusief educatief materiaal. Gratis werkblad beschikbaar',
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
        worksheetSrc: '/samples/dutch/chart-count/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/chart-count/sample-1.jpeg',
        altText: 'Telgrafieken werkblad - gratis werkblad voor kinderen met rekenen oefeningen',
        imageTitle: 'Telgrafieken werkblad',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/dutch/chart-count/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/chart-count/sample-2.jpeg',
        altText: 'Gratis werkbladen voor kleuters - telgrafieken werkbladen met sommen tot 20',
        imageTitle: 'Gratis werkbladen voor kleuters',
      },
    ],
    
  },

  // Features Grid - FULL text from chart-count.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'De telgrafieken werkbladen generator biedt complete functionaliteit voor leerkrachten. Van werkbladen groep 3 tot werkbladen kleuters, elk niveau wordt ondersteund. Hieronder vind je alle functies die je nodig hebt voor professionele rekenen werkbladen. Met je Volledige Toegang abonnement krijg je toegang tot alle mogelijkheden.',
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

  // How-To Guide - FULL text from chart-count.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad voor Kinderen Maken - Werkblad voor Kleuters',
    sectionDescription: 'Het maken van professionele telgrafieken werkbladen duurt minder dan 3 minuten. Volg deze vijf eenvoudige stappen voor perfecte oefenbladen gratis met je abonnement. Van het kiezen van afbeeldingen tot het downloaden van je PDF, alles is intuïtief. Ideaal voor drukke leerkrachten die snel rekenen werkbladen nodig hebben.',
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
        title: 'Stap 1: Kies Je Afbeeldingen voor Werkbladen Kleuters - Sommen tot 20 met Thema\'s of Eigen Plaatjes',
        description: `Begin met het selecteren van afbeeldingen voor je telgrafiek. Je hebt twee opties voor werkbladen kleuters en oudere kinderen. Kies een thema uit de dropdown voor automatische selectie. Of selecteer handmatig plaatjes uit de bibliotheek.

De themakeuze is perfect voor snelle sommen tot 20 werkbladen. Selecteer "Dieren" en de generator kiest willekeurige dierenplaatjes. Kies "Voertuigen" voor transportthema's. Elk thema bevat tientallen passende afbeeldingen.

Voor meer controle gebruik je handmatige selectie. Blader door de bibliotheek met meer dan 3000 afbeeldingen. Klik op plaatjes om ze toe te voegen aan je werkblad. Je kunt maximaal 6 verschillende afbeeldingen selecteren per grafiek.

Upload ook je eigen afbeeldingen voor gepersonaliseerde werkbladen. Klasfoto's maken telgrafieken extra leuk. Foto's van schooluitjes creëren unieke oefenbladen. Combineer eigen uploads met bibliotheekafbeeldingen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Werkbladen Groep 3 - Fijne Motoriek en Rekenen Werkbladen Configureren',
        description: `Configureer je werkblad voor het juiste niveau. Kies het papierformaat dat past bij je printer. Letter Portrait en A4 zijn de populairste opties. Landschapsformaat werkt goed voor bredere grafieken.

Stel de paginakleur in als achtergrond. Wit is standaard maar pastelkleuren maken werkbladen groep 3 aantrekkelijker. Voeg naam- en datumvelden toe bovenaan het werkblad. Kinderen leren zo hun werk te organiseren.

Selecteer een decoratieve rand voor extra visuele aantrekkingskracht. Thematische randen passen bij seizoenen of vakken. Een herfstrand voor oktober, sterren voor beloningswerkbladen. De rand ondersteunt fijne motoriek door visuele structuur.

Kies een achtergrondthema voor subtiele decoratie. Pas de doorzichtigheid aan zodat de grafiek leesbaar blijft. Te veel decoratie leidt af van de rekenen werkbladen. Balanceer esthetiek met functionaliteit.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Telgrafiek voor Kleurplaten en Tafels Oefenen - Werkbladen Kleuters Maken',
        description: `Klik op de knop "Maken" om je telgrafiek te genereren. De generator plaatst willekeurige aantallen van elk gekozen plaatje. De grafiek verschijnt direct op het canvas. Bekijk het resultaat in het voorbeeldvenster.

Elke generatie is uniek. Klik opnieuw op "Maken" voor een andere verdeling. Zo maak je snel meerdere varianten voor differentiatie. Werkbladen kleuters krijgen eenvoudigere grafieken dan oudere kinderen.

De grafiek toont plaatjes in rijen of kolommen. Kinderen tellen elk type en vullen de bijbehorende balk in. Dit is de basis voor kleurplaten gecombineerd met rekenen. Later gebruiken ze dezelfde vaardigheden voor tafels oefenen.

Het antwoordblad wordt automatisch voorbereid. Klik op "Antwoordblad" om de oplossing te genereren. Beide werkbladen delen dezelfde lay-out. Nakijken wordt zo kinderspel.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk Alles op het Canvas - Letters Leren en Schrijven Oefenen Toevoegen aan Werkbladen Groep 3',
        description: `Na het genereren kun je elk element aanpassen. Selecteer een afbeelding en sleep deze naar een nieuwe positie. Gebruik de hoekpunten om te schalen of te roteren. Verwijder elementen die je niet nodig hebt.

Voeg tekstelementen toe voor instructies. Typ "Tel de dieren" of "Kleur de grafiek in". Kies lettertype, grootte en kleur. Voeg tekst toe voor letters leren en schrijven oefenen activiteiten.

De uitlijnfuncties helpen bij professionele lay-outs. Centreer meerdere objecten horizontaal of verticaal. Gebruik de lagenfunctie om elementen naar voren of achteren te plaatsen. Vergrendel elementen die je niet per ongeluk wilt verplaatsen.

Combineer de telgrafiek met andere activiteiten. Voeg een schrijflijn toe onderaan voor werkbladen groep 3. Plaats extra afbeeldingen voor kleuractiviteiten. Maak complete werkpakketten op één pagina.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print voor Oefenbladen Gratis - Veilig Leren Lezen met Rekenen Werkbladen',
        description: `Je werkblad is klaar voor download. Kies tussen PDF en JPEG formaat. PDF is ideaal voor printen, JPEG voor digitaal delen. Beide exporteren in professionele 300 DPI kwaliteit.

Activeer de grijswaarden optie om inkt te besparen. Kleurenafbeeldingen worden zwart-wit. Kinderen kunnen zelf kleuren als extra activiteit. Perfect voor oefenbladen gratis printen thuis.

Download het werkblad en het antwoordblad apart. Of combineer ze in je lesvoorbereiding. Print direct op je thuisprinter of schoolkopieerapparaat. De hoge resolutie garandeert scherpe resultaten.

Je werkbladen ondersteunen veilig leren lezen door visuele herkenning. Kinderen zien plaatjes en leren de bijbehorende woorden. Rekenen werkbladen worden zo onderdeel van taalontwikkeling. Multidisciplinair leren in één activiteit.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from chart-count.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters met Gratis Printables. Werkblad voor Kinderen',
    sectionDescription: 'Telgrafieken werkbladen zijn waardevol voor verschillende onderwijsprofessionals. Van leerkrachten groep 1 2 tot thuisonderwijzers, iedereen vindt passend materiaal. De generator past zich aan elk niveau aan. Ontdek hoe rekenen werkbladen jouw onderwijs versterken.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL FAQs from chart-count.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Hieronder beantwoorden we de meestgestelde vragen over de telgrafieken generator. Van abonnementskosten tot printmogelijkheden, alles wordt behandeld. Oefenbladen gratis downloaden met je abonnement is eenvoudiger dan je denkt. Lees verder voor complete informatie over rekenen werkbladen.',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder tonen',
    badgeText: 'Veelgestelde vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilig betalen',
    cancelAnytime: 'Altijd opzegbaar',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Volledige Toegang pricing (Chart Count is Volledige Toegang app)
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Onbeperkt werkbladen maken',
      'Toegang tot alle 33 generators',
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
    sectionDescription: 'Je Volledige Toegang abonnement bevat 33 verschillende werkbladgeneratoren. Combineer telgrafieken met andere tools voor complete lespakketten. Van tafels oefenen tot veilig leren lezen, alles werkt samen. Ontdek de krachtigste combinaties voor jouw onderwijs.',
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

export default chartCountNlContent;
