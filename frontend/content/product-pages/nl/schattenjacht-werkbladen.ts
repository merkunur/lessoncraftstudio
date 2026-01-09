import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/schattenjacht-werkbladen.ts
 * URL: /nl/apps/schattenjacht-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing Tier: FULL ACCESS ($240/year = €240/jaar)
 *
 * Dutch Keywords:
 * 1. Schattenjacht
 * 2. Werkbladen groep 3
 * 3. Werkbladen kleuters
 * 4. Oefenbladen gratis
 * 5. Fijne motoriek
 * 6. Rekenen werkbladen
 * 7. Richtingswoorden
 * 8. Groep 1 2
 * 9. Veilig leren lezen
 * 10. Ruimtelijk inzicht
 */

export const treasureHuntNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'schattenjacht-werkbladen',
    appId: 'treasure-hunt',
    title: 'Schattenjacht Werkbladen Maken - Oefenbladen Gratis voor Groep 1 2 3 | LessonCraft Studio',
    description: 'Maak professionele schattenjacht werkbladen met onze richtingswoorden generator. Genereer aangepaste oefenbladen perfect voor groep 1, groep 2 en groep 3 leerlingen. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.',
    keywords: 'schattenjacht, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, rekenen werkbladen, richtingswoorden, groep 1 2, veilig leren lezen, ruimtelijk inzicht',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/schattenjacht-werkbladen',
  },

  // Hero Section
  hero: {
    title: 'Schattenjacht Generator',
    subtitle: 'Oefenbladen Gratis voor Groep 1 2 3 - Fijne Motoriek en Richtingswoorden Werkbladen',
    description: `Maak in enkele minuten professionele schattenjacht werkbladen voor je leerlingen. Deze generator helpt leerkrachten bij het maken van richtingswoorden oefeningen. Perfect voor werkbladen groep 3 en werkbladen kleuters die leren volgen van instructies.

De schattenjacht maker werkt volledig in het Nederlands. Kies zes afbeeldingen uit een thema. De generator maakt automatisch een vijf-bij-vijf rooster. Leerlingen volgen de richtingsaanwijzingen om de schat te vinden. Dit oefent fijne motoriek en ruimtelijk inzicht tegelijk.

Je Volledige Toegang abonnement geeft toegang tot onbeperkte werkbladen maken. Download hoogwaardige PDF bestanden. Geen kosten per werkblad. Ideaal voor oefenbladen gratis verzamelingen die je kunt printen voor je klas.`,
    previewImageSrc: '/samples/english/treasure hunt/up down.jpeg',
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
    sectionTitle: 'Schattenjacht Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/treasure hunt/up down.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/up down answer_key.jpeg',
        altText: 'Schattenjacht werkblad met boven onder richtingen voor werkbladen kleuters en fijne motoriek',
        pdfDownloadUrl: '/samples/english/treasure hunt/up down.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/treasure hunt/north south.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/north south answer_key.jpeg',
        altText: 'Schattenjacht werkblad met windrichtingen voor werkbladen groep 3 en ruimtelijk inzicht',
        pdfDownloadUrl: '/samples/english/treasure hunt/north south.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Schattenjacht Functies - Werkbladen Groep 3 en Oefenbladen Gratis voor Alle Niveaus',
    sectionDescription: 'De schattenjacht generator biedt alle functies voor professionele werkbladen. Van eenvoudige richtingsoefeningen voor kleuters tot uitdagende ruimtelijke puzzels voor groep 5. Ontdek hoe je snel werkbladen groep 3 maakt met richtingswoorden en visuele aanwijzingen. Volledige Toegang abonnement (€240 per jaar) geeft toegang tot alle functies en 3000+ afbeeldingen.',
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
        title: 'Maak Werkbladen Kleuters in 3 Klikken - Fijne Motoriek en Ruimtelijk Inzicht Oefenen',
        description: `Het maken van schattenjacht werkbladen kost geen technische kennis. Selecteer een thema uit de bibliotheek met meer dan drieduizend afbeeldingen. De generator plaatst automatisch zes verschillende objecten in een vijf-bij-vijf rooster. Binnen drie klikken heb je een compleet werkblad.

Kies thema's die passen bij je les. Dieren voor werkbladen kleuters in groep 1 2. Voertuigen voor jongens die gemotiveerd moeten blijven. Fruit en groenten voor gezondheidsthema's. Elk thema bevat tientallen afbeeldingen.

De generator maakt automatisch vijf richtingsaanwijzingen. Leerlingen volgen de instructies stap voor stap. Links, rechts, omhoog en omlaag voor beginners. Noord, zuid, oost en west voor gevorderde leerlingen in groep 3 en hoger. Dit oefent fijne motoriek bij het volgen van de route met een potlood.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Volledig Bewerkbaar Canvas voor Rekenen Werkbladen en Kleurplaten Combinaties',
        description: `Na het genereren pas je alles aan op het canvas. Sleep de puzzelrooster naar een andere positie. Vergroot of verklein elementen. Draai objecten of verwijder ze volledig. Volledige controle over je werkblad.

Deze flexibiliteit maakt combinaties mogelijk met rekenen werkbladen. Voeg getallen toe aan de roostervakjes. Leerlingen tellen terwijl ze de route volgen. Of combineer met kleurplaten elementen. Kinderen kleuren de gevonden objecten na het oplossen.

Voeg eigen teksten toe bovenaan het werkblad. Kies uit zeven verschillende lettertypen. Pas kleuren en groottes aan. Maak werkbladen groep 3 met duidelijke instructies voor zelfstandig werk. Perfect voor differentiatie binnen je klas.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden voor Schrijven Oefenen en Letters Leren Thema\'s',
        description: `Upload je eigen foto's voor gepersonaliseerde schattenjachten. De tool accepteert JPG, PNG en GIF bestanden. Meerdere bestanden tegelijk uploaden werkt probleemloos. Combineer eigen afbeeldingen met bibliotheekplaatjes.

Dit is ideaal voor letters leren activiteiten. Upload afbeeldingen die beginnen met dezelfde letter. Maak een B-schattenjacht met bal, beer en banaan. Kinderen oefenen letterherkenning terwijl ze de route volgen.

Voor schrijven oefenen voeg je afbeeldingen toe met woorden. Kinderen volgen de schattenjacht en schrijven gevonden woorden over. Ruimtelijk inzicht en schrijfvaardigheid in een werkblad. Efficiënt en educatief tegelijk.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Nederlands en 10 Andere Talen - Veilig Leren Lezen Ondersteuning in Meerdere Talen',
        description: `De schattenjacht generator ondersteunt elf talen volledig. Nederlands staat centraal voor Nederlandse basisscholen. Maar ook Engels, Duits, Frans en Spaans zijn beschikbaar. Ideaal voor meertalig onderwijs en internationale scholen.

Voor Veilig leren lezen ondersteuning werken de Nederlandse richtingswoorden perfect. Links, rechts, boven, onder. Woorden die kinderen in groep 3 kennen. De instructies zijn helder en eenduidig. Kinderen begrijpen direct wat ze moeten doen.

De interface is volledig vertaald naar het Nederlands. Alle knoppen en menu's. Ook de thema-namen zijn in het Nederlands. Zo werk je altijd in je eigen taal. Geen Engelse termen die verwarring veroorzaken.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie voor Tafels Oefenen Werkbladen en Kleurplaten Verkopen',
        description: `Met je Volledige Toegang abonnement krijg je commerciële rechten. Dit betekent dat je schattenjacht werkbladen mag verkopen. Op platforms zoals Etsy of Teachers Pay Teachers. Geen extra kosten per verkocht werkblad.

De licentie geldt voor alle werkbladen die je maakt. Ook combinaties met tafels oefenen materialen. Of bundels met kleurplaten en schrijfopdrachten. Alles zit inbegrepen in je abonnement van €240 per jaar.

Veel leerkrachten verdienen honderden euro's per maand met lesmateriaal. Ze maken themapakketten met schattenjachten. Combineren deze met rekenen werkbladen en kleurplaten. Verkopen complete lespakketten online. De 300 DPI kwaliteit maakt dit mogelijk.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen - Van Sommen tot 20 Thema\'s tot Complete Lespakketten',
        description: `De beeldbibliotheek bevat meer dan drieduizend kindvriendelijke afbeeldingen. Georganiseerd in tientallen thema's. Dieren, voertuigen, seizoenen, feestdagen. Er is altijd een thema dat past bij je les.

Voor sommen tot 20 integratie vind je getallen en rekenobjecten. Appels om te tellen. Blokken voor optel- en aftreksommen. Vingers voor getalherkenning. Combineer schattenjachten met rekenen voor complete lespakketten.

De zoekfunctie werkt snel en efficiënt. Typ een woord in het zoekveld. Alle relevante afbeeldingen verschijnen direct. Vind precies wat je zoekt voor werkbladen kleuters of groep 3. Geen tijdverspilling aan bladeren door mappen.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit voor Oefenbladen Gratis Printen en Verkopen',
        description: `Alle werkbladen exporteren in 300 DPI resolutie. Dit is de professionele standaard voor drukwerk. Je schattenjachten zien er scherp en helder uit op papier. Perfect voor printen thuis of op school.

Deze kwaliteit is essentieel voor oefenbladen gratis verzamelingen. De roostervakjes blijven duidelijk zichtbaar. Afbeeldingen zijn scherp en herkenbaar. Teksten zijn goed leesbaar. Kinderen werken met overzichtelijke werkbladen.

Download als PDF of JPEG naar keuze. PDF werkt perfect voor printen. JPEG is handig voor digitaal delen. Er is ook een grijswaarden optie. Bespaar inkt zonder kwaliteitsverlies. De puzzels blijven even goed bruikbaar.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Hoe Maak Je Schattenjacht Werkbladen - Werkbladen Groep 3 en Kleuters in 5 Eenvoudige Stappen',
    sectionDescription: 'Het maken van een schattenjacht werkblad duurt minder dan drie minuten. Volg deze vijf stappen voor professionele oefenbladen gratis. Van thema selecteren tot downloaden en printen. Geen technische kennis vereist voor werkbladen groep 3 of werkbladen kleuters.',
    ctaText: 'Nu Starten',
    badgeText: 'Zo werkt het',
    stepLabel: 'Stap',
    completionTitle: 'Klaar!',
    completionSubtitle: 'Je schattenjacht werkblad is gereed',
    readyTime: 'Klaar in minder dan 3 minuten',
    noSkillsNeeded: 'Geen ontwerpkennis nodig',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Stap 1: Kies Je Thema voor Rekenen Werkbladen en Veilig Leren Lezen Combinaties',
        description: `Begin met het selecteren van je inhoud. Je hebt twee hoofdopties. Kies een thema uit de bibliotheek. Of selecteer handmatig zes afbeeldingen. Beide methodes werken uitstekend voor werkbladen kleuters en groep 3.

De thema-optie werkt het snelst. Klik op het dropdown menu in de puzzel instellingen. Kies uit tientallen thema's zoals dieren, voertuigen of eten. De generator selecteert automatisch zes verschillende afbeeldingen. Perfect voor snelle werkbladen groep 3 wanneer tijd schaars is.

Voor Veilig leren lezen integratie kies je de handmatige selectie. Zoek afbeeldingen die beginnen met dezelfde letter. Bijvoorbeeld zes B-woorden voor een letterherkenning les. Bal, beer, banaan, boek, boot en bloem. Kinderen oefenen letters leren terwijl ze de schattenjacht oplossen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Fijne Motoriek Oefeningen en Kleurplaten Elementen',
        description: `Nu stel je de puzzel parameters in. Begin met het richtingstype. Kies tussen basis richtingen of windrichtingen. Basis richtingen zijn links, rechts, omhoog en omlaag. Geschikt voor werkbladen kleuters tot en met groep 2.

Windrichtingen zijn noord, zuid, oost en west. Deze passen bij groep 3 en hoger. Kinderen leren geografische termen. De schattenjacht wordt een aardrijkskundeles. Kies het niveau dat past bij je leerlingen.

Voeg een achtergrond thema toe voor kleurplaten combinaties. Selecteer uit tientallen patronen. Seizoensthema's zoals herfstbladeren of sneeuwvlokken. Feestthema's voor Sinterklaas of Kerstmis. De achtergrond maakt je werkblad visueel aantrekkelijker.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Puzzel met Schrijven Oefenen en Sommen tot 20 Integratie',
        description: `Klik op de knop "Genereer Schattenjacht" in het paneel. De puzzel verschijnt direct op het canvas. Je ziet het vijf-bij-vijf rooster met afbeeldingen. Daaronder staan vijf richtingsaanwijzingen.

De zes gekozen afbeeldingen zijn willekeurig verdeeld over het rooster. Geen twee dezelfde plaatjes naast elkaar. Dit voorkomt verwarring. Leerlingen zien duidelijk elk object.

De generator maakt ook automatisch een antwoordblad. De correcte route is gemarkeerd. De eindpositie is aangegeven. Perfect voor snelle controle. Of voor leerlingen die zelfstandig willen checken.`,
        icon: '🚀',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Oefenbladen Gratis Personaliseren met Tafels Oefenen Elementen',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt intuïtief. Klik op het rooster om het te selecteren. Sleep het naar een andere positie. Vergroot of verklein met de hoekpunten.

Voeg een titel toe bovenaan je werkblad. Klik op "Voeg Tekst Toe" in het paneel. Typ bijvoorbeeld "Schattenjacht - Dieren Thema." Kies een lettertype uit de lijst. Fredoka en Baloo 2 zijn kindvriendelijk. Lexend Deca is modern en strak.

Voor tafels oefenen integratie voeg je getallen toe aan de roostervakjes. Plaats kleine teksten met "×3" of "÷2" in bepaalde vakjes. Kinderen moeten de som oplossen bij het passeren. De schattenjacht wordt een rekenparcours.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Werkbladen Kleuters en Groep 3 als Professionele Oefenbladen Gratis',
        description: `Je schattenjacht is klaar om te downloaden. Klik op "Download" in de rechterbovenhoek. Kies tussen "Werkblad (PDF)" en "Werkblad (JPEG)". PDF is het beste voor printen. JPEG werkt voor digitaal delen.

Selecteer ook of je het antwoordblad wilt downloaden. Vink "Inclusief antwoorden" aan. Je krijgt twee bestanden. Het werkblad voor leerlingen. Het antwoordblad voor jezelf. Beide in 300 DPI kwaliteit.

De grijswaarden optie bespaart inkt. Vink deze aan voor zwart-wit afdrukken. De schattenjacht blijft perfect herkenbaar. De afbeeldingen zijn nog steeds duidelijk. Maar je printer cartridge gaat driemaal langer mee.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Kleuters tot Groep 5 voor Iedereen',
    sectionDescription: 'De schattenjacht generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en welke voordelen schattenjachten bieden voor werkbladen groep 3 en andere leerjaren.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters met Fijne Motoriek en Ruimtelijk Inzicht',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Werk je met kleuters in groep 1 of 2? Dan weet je hoe belangrijk ruimtelijk inzicht is. Schattenjachten oefenen dit op een speelse manier. Kinderen leren begrippen als links, rechts, boven en onder.

De werkbladen kleuters bevatten herkenbare afbeeldingen. Dieren, speelgoed en voorwerpen uit hun leefwereld. Dit maakt de puzzels toegankelijk. Ook kinderen die nog niet kunnen lezen volgen de visuele aanwijzingen.

Fijne motoriek ontwikkeling staat centraal in de kleuterklas. Schattenjachten oefenen het nauwkeurig volgen van lijnen. Kinderen trekken de route met een potlood. Ze leren binnen de lijntjes blijven. Dit is voorbereiding op schrijven oefenen later.`,
        quote: 'Mijn kleuters vinden de schattenjacht werkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Veilig Leren Lezen en Rekenen Werkbladen Combinaties',
        subtitle: 'Werkbladen groep 3 en Veilig leren lezen',
        description: `Groep 3 is het jaar van leren lezen en rekenen. Schattenjachten ondersteunen beide vaardigheden. Voor Veilig leren lezen maak je puzzels met kernwoorden. Kinderen herkennen de woorden uit hun leesmethode.

De richtingsaanwijzingen bevatten eenvoudige zinnen. "Ga twee naar rechts." "Ga één omhoog." Korte instructies die kinderen zelfstandig kunnen lezen. Dit versterkt het leesvertrouwen enorm.

Werkbladen groep 3 met schattenjachten passen perfect bij zelfstandig werk. Leerlingen die klaar zijn met hun reguliere werk krijgen een puzzel. Geen extra uitleg nodig. Ze weten precies wat te doen. Jij hebt tijd voor kinderen die extra hulp nodig hebben.`,
        quote: 'Schattenjachten maken leren leuk voor mijn groep 3!',
      },
      {
        id: '3',
        icon: '🔢',
        title: 'Leerkrachten Groep 4 en 5 - Tafels Oefenen en Sommen tot 20 met Richtingspuzzels',
        subtitle: 'Tafels oefenen en rekenen werkbladen',
        description: `In groep 4 en 5 worden schattenjachten uitdagender. Gebruik windrichtingen in plaats van links-rechts. Noord, zuid, oost en west. Kinderen leren aardrijkskundige begrippen terwijl ze puzzelen.

Voor tafels oefenen maak je rekenroutes. Elk roostervakje bevat een tafelssom. "3 × 4 = ?" Kinderen berekenen het antwoord. Dan verplaatsen ze twaalf vakjes in de aangegeven richting. Zo wordt de schattenjacht een rekenparcours.

Sommen tot 20 uitbreiden naar grotere getallen werkt ook. Of introduceer decimalen voor gevorderde leerlingen. "Tel 1,5 naar rechts" betekent anderhalf vakje. Kinderen leren breuken en kommagetallen in een praktische context.`,
        quote: 'Tafels oefenen is nooit zo leuk geweest!',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Ouders met Thuisonderwijs - Oefenbladen Gratis voor Alle Vakken Combineren',
        subtitle: 'Thuisonderwijs en oefenbladen gratis',
        description: `Geef je thuisonderwijs? Dan waarder je flexibele materialen. Schattenjachten werk je in elk vak. Taal voor woordenschat. Rekenen voor getalbegrip. Aardrijkskunde voor richtingen.

Maak wekelijkse themapakketten met oefenbladen gratis downloaden. Maandag een natuurthema met planten en dieren. Dinsdag voertuigen en transport. Woensdag eten en gezondheid. Elke dag een nieuwe schattenjacht die past bij je les.

Combineer met letters leren activiteiten. Upload eigen afbeeldingen van voorwerpen in huis. Kinderen zoeken objecten die ze dagelijks zien. Dit maakt leren persoonlijk en relevant. Ze herkennen de afbeeldingen direct.`,
        quote: 'Perfect voor gevarieerd thuisonderwijs!',
      },
      {
        id: '5',
        icon: '💼',
        title: 'Onderwijsondernemers - Rekenen Werkbladen en Tafels Oefenen Bundels Verkopen',
        subtitle: 'Commerciële licentie en verkopen',
        description: `Wil je geld verdienen met lesmateriaal? Schattenjachten verkopen uitstekend online. Teachers Pay Teachers heeft grote vraag naar richtingspuzzels. Ook Etsy shoppers zoeken printbare werkbladen.

Maak themabundels met schattenjachten, rekenen werkbladen en kleurplaten. Een herfstpakket met tien verschillende activiteiten. Ouders en leerkrachten betalen graag voor complete sets. Eén thema voor een hele week lessen.

De commerciële licentie in je Volledige Toegang abonnement maakt dit mogelijk. Geen extra kosten per verkocht werkblad. Eén abonnement van €240 per jaar. Onbeperkt werkbladen maken en verkopen. Veel onderwijsondernemers verdienen dit bedrag terug in de eerste maand.`,
        quote: 'Ik verdien €500 per maand met mijn schattenjacht bundels!',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Schattenjacht Werkbladen - Oefenbladen Gratis en Rekenen Werkbladen Antwoorden',
    showMoreText: 'Meer vragen tonen',
    showLessText: 'Minder vragen',
    badgeText: 'Veelgestelde Vragen',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    secureCheckout: 'Veilige betaling',
    cancelAnytime: 'Altijd opzegbaar',
    items: [
      {
        id: '1',
        question: 'Zijn Schattenjacht Werkbladen Groep 3 Echt Gratis of Zit er een Watermerk op Oefenbladen Gratis?',
        answer: `De schattenjacht generator vereist een Volledige Toegang abonnement dat €240 per jaar of €25 per maand kost. Je abonnement geeft je onbeperkte schattenjacht creatie zonder kosten per werkblad. Genereer zoveel werkbladen als je nodig hebt zonder extra kosten.

Het Basis Pakket bevat 10 populaire werkblad generators en kost €144 per jaar. Volledige Toegang kost €240 per jaar en geeft toegang tot alle 33 werkblad generators inclusief schattenjacht. Beide abonnementen bevatten commerciële licentie, ondersteuning voor 11 talen en professionele 300 DPI exportkwaliteit.`,
      },
      {
        id: '2',
        question: 'Werken Schattenjachten voor Fijne Motoriek Ontwikkeling bij Werkbladen Kleuters?',
        answer: `Absoluut. Schattenjachten zijn uitstekend voor fijne motoriek training. Kinderen volgen de route met een potlood. Ze trekken lijnen van vakje naar vakje. Dit oefent nauwkeurigheid en handcoördinatie.

Voor werkbladen kleuters in groep 1 2 maak je eenvoudige schattenjachten. Grote roostervakjes van 5×5. Weinig instructies. Vier of vijf stappen. Kinderen leren de beweging van het potlood te controleren. Essentiële voorbereiding op schrijven later.`,
      },
      {
        id: '3',
        question: 'Kan Ik Schattenjachten Combineren met Veilig Leren Lezen Woordenschat en Letters Leren?',
        answer: `Ja, schattenjachten ondersteunen Veilig leren lezen perfect. Maak puzzels met kernwoorden uit de actuele kern. Kinderen herkennen woorden uit hun leesboek. Dit versterkt woordherkenning op een speelse manier.

Voor letters leren selecteer je afbeeldingen die beginnen met dezelfde letter. Een M-schattenjacht met muis, maan en melk. Kinderen zien het verband tussen letter en woord. Visueel leren gekoppeld aan fonetisch bewustzijn.`,
      },
      {
        id: '4',
        question: 'Hoe Integreer Ik Sommen tot 20 en Rekenen Werkbladen in Schattenjachten?',
        answer: `Schattenjachten combineren uitstekend met sommen tot 20 oefeningen. Voeg getallen toe aan de instructies. "Tel tot 3 en ga naar rechts." Kinderen moeten eerst tellen. Dan de beweging uitvoeren. Rekenen en richtingen in één activiteit.

Voor rekenen werkbladen integratie plaats je sommen in de roostervakjes. "5 + 3 = ?" staat in een vakje. Kinderen berekenen het antwoord. Verplaatsen dan acht vakjes verder. Zo wordt elke stap een rekenopgave.`,
      },
      {
        id: '5',
        question: 'Zijn Schattenjachten Geschikt voor Tafels Oefenen en Schrijven Oefenen Combinaties?',
        answer: `Zeker. Tafels oefenen werkt uitstekend in schattenjachten. Plaats tafelsommen in de roostervakjes. "4 × 3 = ?" Kinderen lossen de som op. Bewegen twaalf vakjes in de aangegeven richting. Actief leren in plaats van passief stampen.

Voor schrijven oefenen voeg je een opdracht toe onder de schattenjacht. "Schrijf alle objecten die je vindt." Kinderen volgen de route. Noteren de gevonden afbeeldingen. Oefenen schrijfvaardigheid in een betekenisvolle context.`,
      },
      {
        id: '6',
        question: 'Kan Ik Schattenjachten met Kleurplaten Elementen Maken voor Langere Activiteiten?',
        answer: `Absoluut. Combineer schattenjachten met kleurplaten voor uitgebreide werkbladen. Kinderen volgen eerst de route. Markeren de gevonden objecten. Daarna kleuren ze alle afbeeldingen in. Activiteit van twintig tot dertig minuten.

Voeg achtergronden toe met thema's. Herfstbladeren rond het rooster. Sneeuwvlokken voor winterthema's. Bloemen voor lente-activiteiten. De achtergrond geeft extra inkleuring. Kinderen maken een compleet kunstwerk van hun werkblad.`,
      },
      {
        id: '7',
        question: 'Hoeveel Kost Volledige Toegang voor Alle Generators Inclusief Oefenbladen Gratis Downloads?',
        answer: `Volledige Toegang kost €240 per jaar of €25 per maand. Dit geeft toegang tot alle 33 werkblad generators. Niet alleen schattenjachten. Ook woordzoekers, kruiswoordpuzzels, sudoku's en meer. Plus onbeperkte oefenbladen downloaden zonder watermerk.

Je krijgt ook commerciële rechten. Verkoop je werkbladen op Teachers Pay Teachers. Of op Etsy en Amazon KDP. Geen extra licentiekosten. Alles inbegrepen in het abonnement. Veel leerkrachten verdienen het abonnement terug in de eerste maand.`,
      },
      {
        id: '8',
        question: 'Ondersteunt de Generator Meertalig Onderwijs voor Werkbladen Kleuters in Verschillende Talen?',
        answer: `Ja, de schattenjacht generator ondersteunt elf talen volledig. Nederlands, Engels, Duits, Frans, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins. Maak werkbladen kleuters in elke taal.

De interface past zich aan de gekozen taal aan. Alle knoppen en menu's worden vertaald. Ook de afbeeldingsnamen veranderen mee. Richtingswoorden verschijnen in de juiste taal. "Left" in Engels. "Links" in Nederlands. "Gauche" in Frans.`,
      },
      {
        id: '9',
        question: 'Werken Schattenjachten op Tablets voor Digitale Rekenen Werkbladen en Oefenbladen Gratis?',
        answer: `De generator werkt op alle apparaten. Desktop computers, laptops, tablets en smartphones. De interface past zich aan het schermformaat aan. Je maakt werkbladen overal waar je internet hebt.

Voor digitale rekenen werkbladen download je PDF of JPEG bestanden. Deel deze via Google Classroom of Teams. Leerlingen openen ze op hun tablet. Gebruiken een stylus of vinger om de route te tekenen. Geen printen nodig voor digitaal onderwijs.`,
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om Werkbladen Groep 3 met Schattenjachten en Fijne Motoriek Oefeningen te Maken?',
        answer: `Gemiddeld drie minuten van start tot download. Kies een thema uit het menu. Klik op genereren. Pas eventueel aan op het canvas. Download als PDF. Klaar om te printen. Geen langdurige voorbereiding.

Voor werkbladen groep 3 met specifieke fijne motoriek oefeningen voeg je extra elementen toe. Schrijflijnen onder het rooster. Tekstvakken met instructies. Dit kost vijf tot zeven minuten totaal. Nog steeds veel sneller dan handmatig maken.`,
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    ctaText: 'Start Nu Met Maken',
    guaranteeText: '30 dagen geld-terug-garantie',
    benefits: [
      'Alle 33 werkblad generators',
      'Onbeperkte werkbladen maken',
      '3000+ afbeeldingen bibliotheek',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteuning',
      '300 DPI professionele kwaliteit',
      'PDF en JPEG downloads',
      'Geen watermerk',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Schattenjachten met Andere Werkbladen',
    ctaTitle: 'Klaar om Geweldige Werkbladen te Maken?',
    ctaDescription: 'Sluit je aan bij duizenden leerkrachten die professionele werkbladen maken met LessonCraft Studio.',
    primaryCtaText: 'Start Gratis Proefperiode',
    secondaryCtaText: 'Bekijk Alle 33 Apps',
    badgeText: 'Werkt Uitstekend Met',
    exploreText: 'Ontdek alle apps',
    trustBadges: {
      guarantee: '30 dagen garantie',
      securePayment: 'Veilige betaling',
      cancelAnytime: 'Altijd opzegbaar',
    },
    items: [
      {
        id: '1',
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Visuele Waarneming',
        icon: '🔍',
        description: 'Combineer zoek- en teloefeningen met schattenjachten voor complete rekenen werkbladen.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Lijnen Trekken',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Perfect voor fijne motoriek oefeningen samen met schattenjacht routes.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Verbinden',
        category: 'Visueel Leren',
        icon: '🔗',
        description: 'Voeg verbindingsoefeningen toe aan schattenjacht werkbladen voor extra uitdaging.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Combineer kleurplaten met schattenjachten voor langere activiteiten.',
      },
    ],
  },
};

export default treasureHuntNlContent;
