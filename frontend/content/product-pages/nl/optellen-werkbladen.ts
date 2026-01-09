import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/optellen-werkbladen.ts
 * URL: /nl/apps/optellen-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/addition.md
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

export const additionNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'optellen-werkbladen',
    appId: 'image-addition',
    title: 'Optel Werkbladen Generator - Rekenen Werkbladen voor Werkbladen Groep 3 en Sommen tot 20',
    description: 'Maak professionele optelwerkbladen met plaatjes in enkele minuten. Deze rekenen werkbladen generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.',
    keywords: 'optellen werkbladen, rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/optellen-werkbladen',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Optel Werkbladen Generator',
    subtitle: 'Rekenen Werkbladen voor Werkbladen Groep 3 en Sommen tot 20',
    description: `Maak professionele optelwerkbladen met plaatjes in enkele minuten. Deze rekenen werkbladen generator is perfect voor leerkrachten in het basisonderwijs. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.

De optelwerkbladen maker werkt volledig in het Nederlands. Je kiest afbeeldingen uit de bibliotheek of uploadt eigen plaatjes. Kinderen tellen de afbeeldingen bij elkaar op en schrijven het antwoord. Ideaal voor sommen tot 20 oefeningen in groep 3 en groep 4.

Rekenen met plaatjes maakt abstract tellen concreet. Kinderen zien drie appels plus twee appels. Ze begrijpen direct wat optellen betekent. Deze visuele aanpak werkt beter dan alleen cijfers.`,
    previewImageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Optelwerkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key portrait.jpeg',
        altText: 'Optelwerkblad portret met plaatjes voor werkbladen groep 3 en sommen tot 20',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/addition/addition_worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key landscape.jpeg',
        altText: 'Optelwerkblad landschap met rekenen werkbladen voor werkbladen kleuters',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/addition/image and number.jpeg',
        answerKeySrc: '/samples/english/addition/image and number answer_key.jpeg',
        altText: 'Optelwerkblad met afbeelding en getal voor oefenbladen gratis kwaliteit',
        pdfDownloadUrl: '/samples/english/addition/image and number.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/addition/find addend.jpeg',
        answerKeySrc: '/samples/english/addition/find addend answer_key.jpeg',
        altText: 'Vind het ontbrekende getal werkblad voor sommen tot 20 oefeningen',
        pdfDownloadUrl: '/samples/english/addition/find addend.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/addition/mixed mode.jpeg',
        answerKeySrc: '/samples/english/addition/mixed mode answer_key.jpeg',
        altText: 'Gemengde modus optelwerkblad met variatie voor rekenen werkbladen',
        pdfDownloadUrl: '/samples/english/addition/mixed mode.pdf',
      },
    ],
  },

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Functies van de Optelwerkbladen Generator - Alles voor Rekenen Werkbladen en Werkbladen Groep 3',
    sectionDescription: 'Deze optelwerkbladen maker biedt alle functies die je nodig hebt voor effectief rekenonderwijs. Van eenvoudige telwerkbladen voor kleuters tot uitdagende sommen tot 20 voor groep 4. Ontdek hoe je in enkele minuten professionele rekenen werkbladen maakt met vier verschillende oefenmodi.',
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
        title: 'Werkbladen Kleuters Maken in 3 Klikken - Snel Rekenen Werkbladen met Plaatjes',
        description: `Het maken van een optelwerkblad kost geen technische kennis. Je selecteert een thema uit de bibliotheek met meer dan 3000 afbeeldingen. Kies het aantal opgaven en het getallenbereik. Klik op genereren en je werkblad is klaar.

De generator biedt vier oefenmodi voor werkbladen kleuters. De modus "Afbeelding + Afbeelding" toont twee groepen plaatjes. Kinderen tellen beide groepen en schrijven de som. Perfect voor visuele leerlingen in groep 1 2.

De modus "Afbeelding + Getal" combineert plaatjes met cijfers. Eén groep toont afbeeldingen, de andere een getal. Dit helpt kinderen de overgang te maken van concreet naar abstract rekenen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '🔢',
        title: 'Vier Oefenmodi voor Sommen tot 20 - Van Werkbladen Kleuters tot Werkbladen Groep 3',
        description: `De modus "Vind het Ontbrekende Getal" daagt leerlingen extra uit. Ze zien een deel van de som en moeten het missende getal invullen. Ideaal voor sommen tot 20 begrip in werkbladen groep 3.

De "Gemengde Modus" wisselt alle oefentypes af op één werkblad. Kinderen krijgen variatie zonder dat jij extra werkbladen hoeft te maken. Elke opgave is anders, wat de aandacht vasthoudt.

Je bepaalt zelf hoeveel opgaven elk werkblad bevat. Kies een tot tien oefeningen per pagina. Voor werkbladen kleuters adviseren we vier tot zes opgaven. Voor groep 3 en 4 kun je tot tien gaan.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '✏️',
        title: 'Volledig Bewerkbaar Canvas voor Oefenbladen Gratis Kwaliteit en Fijne Motoriek',
        description: `Na het genereren kun je alles aanpassen op het canvas. Sleep afbeeldingen naar een andere positie. Vergroot of verklein elementen met je muis. Draai objecten of verwijder ze volledig.

Deze flexibiliteit is perfect voor fijne motoriek werkbladen. Voeg extra schrijflijnen toe onder de sommen. Maak ruimte voor antwoordvakjes waar kinderen kunnen schrijven. Combineer rekenen met schrijfoefeningen.

Je kunt ook eigen teksten toevoegen voor oefenbladen gratis niveau kwaliteit. Kies uit zeven verschillende lettertypen. Pas de kleur en grootte aan. Voeg een kader toe rond belangrijke instructies.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden voor Werkbladen Groep 3 met Letters Leren Thema\'s',
        description: `Wil je gepersonaliseerde optelwerkbladen maken? Upload je eigen afbeeldingen. De tool accepteert JPG, PNG en GIF bestanden. Je kunt meerdere bestanden tegelijk uploaden.

Dit is ideaal voor thematische werkbladen groep 3 met letters leren elementen. Gebruik foto's van voorwerpen die beginnen met de letter van de week. Kinderen tellen appels terwijl ze de A herkennen. Rekenen en lezen gecombineerd.

De uploadfunctie werkt ook voor seizoensgebonden materialen. Upload herfstbladeren voor oktober. Kerstbomen voor december. Paaseieren voor het voorjaar. Elk thema wordt persoonlijk.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '🌍',
        title: '11 Talen Ondersteuning - Veilig Leren Lezen Combineren met Rekenen Werkbladen',
        description: `De optelwerkbladen generator ondersteunt elf talen volledig. Nederlands staat voorop met afbeeldingsnamen die aansluiten bij Veilig leren lezen woordenschat. Maar je maakt ook werkbladen in het Duits, Frans of Engels.

Voor meertalig onderwijs is dit goud waard. Maak rekenen werkbladen in het Nederlands voor de ochtend. Dezelfde sommen in het Engels voor de middag. Kinderen leren rekentaal in meerdere talen.

De interface is volledig in het Nederlands beschikbaar. Alle knoppen en menu's zijn vertaald. Ook de thema-namen in de bibliotheek zijn Nederlands. Zo werk je altijd in je eigen taal.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💼',
        title: 'Commerciële Licentie voor Kleurplaten en Rekenen Werkbladen Verkopen',
        description: `Met je Basispakket abonnement krijg je een commerciële licentie inbegrepen. Dit betekent dat je jouw werkbladen mag verkopen. Op platforms zoals Etsy, Teachers Pay Teachers of Amazon KDP.

De licentie geldt voor alle werkbladen die je maakt. Ook voor kleurplaten en andere materialen uit de tien Basispakket generators. Je hoeft geen extra kosten te betalen per werkblad.

Veel leerkrachten verdienen extra inkomen met hun materialen. Ze maken rekenen werkbladen met optelthema's. Combineren deze met kleurplaten en tafels oefenen materialen. Complete lespakketten verkopen goed.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen - Van Tafels Oefenen tot Schrijven Oefenen Thema\'s',
        description: `De beeldbibliotheek bevat meer dan drieduizend kindvriendelijke afbeeldingen. Ze zijn georganiseerd in thema's. Van dieren en voertuigen tot seizoenen en feestdagen. Er is altijd iets dat past bij je les.

Voor rekenlessen vind je afbeeldingen perfect voor sommen tot 20. Appels om te tellen. Blokken om op te tellen. Vingers voor visuele ondersteuning. Alles wat je nodig hebt voor effectieve werkbladen.

De afbeeldingen ondersteunen ook tafels oefenen in hogere groepen. Groepeer objecten voor vermenigvuldiging. Toon drie groepen van vier sterren. Kinderen zien wat keer-sommen betekenen.`,
        highlighted: true,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit voor Fijne Motoriek en Oefenbladen Gratis Niveau',
        description: `Alle werkbladen worden geëxporteerd in 300 DPI. Dit is de standaard voor professioneel drukwerk. Je optelwerkbladen zien er scherp en helder uit op papier.

Deze kwaliteit is belangrijk voor fijne motoriek activiteiten. De cijfers en afbeeldingen zijn goed zichtbaar. Kinderen kunnen netjes in de antwoordvakjes schrijven. Details blijven scherp, ook na kopiëren.

Je downloadt werkbladen als PDF of JPEG. De PDF-optie is ideaal voor printen. JPEG werkt goed voor digitaal delen. Er is ook een grijswaarden optie om inkt te besparen.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Optelwerkbladen - Rekenen Werkbladen voor Werkbladen Groep 3 in 5 Stappen',
    sectionDescription: 'Het maken van een optelwerkblad duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist. Van thema kiezen tot downloaden in een paar klikken.',
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
        title: 'Stap 1: Kies Je Afbeeldingen voor Sommen tot 20 - Thema of Eigen Plaatjes voor Werkbladen Kleuters',
        description: `Begin met het selecteren van je afbeeldingen. Je hebt twee opties. Kies een thema uit de bibliotheek. Of upload je eigen plaatjes voor gepersonaliseerde werkbladen kleuters.

De thema-optie werkt het snelst voor sommen tot 20 werkbladen. Selecteer bijvoorbeeld "Fruit" of "Dieren". De generator toont alle beschikbare afbeeldingen in dat thema. Klik op de plaatjes die je wilt gebruiken.

Voor werkbladen groep 3 met specifieke thema's werkt de zoekfunctie handig. Typ een woord in het zoekveld. De tool toont direct alle relevante afbeeldingen. Zoek op "bloemen" voor lentethema's of "sneeuw" voor winterwerkbladen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Stel Oefening In voor Oefenbladen Gratis Kwaliteit - Van Fijne Motoriek tot Rekenen Werkbladen',
        description: `Nu configureer je de oefening. Begin met het aantal opgaven. Kies een tot tien sommen per werkblad. Voor oefenbladen gratis niveau kwaliteit adviseren we zes tot acht opgaven.

Bepaal het getallenbereik voor je rekenen werkbladen. Stel het minimum en maximum aantal items per groep in. Voor kleuters kies je een tot vijf. Voor groep 3 kun je tot tien gaan.

Selecteer de oefenmodus die past bij je les. "Afbeelding + Afbeelding" voor visuele leerlingen. "Afbeelding + Getal" voor de overgang naar abstract rekenen. "Vind het Ontbrekende Getal" voor uitdaging.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Werkblad met Sommen tot 20 - Direct Klaar voor Werkbladen Groep 3',
        description: `Klik op de knop "Genereren" om je optelwerkblad te maken. Het werkblad verschijnt direct op het canvas. Je ziet alle sommen met afbeeldingen. De antwoordvakjes staan klaar.

De generator plaatst de afbeeldingen automatisch in groepen. Twee appels plus drie appels bijvoorbeeld. Het plusteken staat ertussen als je dat hebt gekozen. Het is-gelijkteken wijst naar het antwoordvak.

Elke keer dat je genereert krijg je een nieuwe variant. De volgorde van afbeeldingen wisselt. De getallen binnen je bereik variëren. Zo maak je snel meerdere werkbladen groep 3 met hetzelfde thema.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Kleurplaten Elementen Toevoegen aan Rekenen Werkbladen',
        description: `Na het genereren kun je alles aanpassen. Het canvas werkt intuïtief. Sleep elementen met je muis. Vergroot of verklein ze door aan de hoeken te trekken.

Voeg een titel toe aan je rekenen werkbladen. Typ bijvoorbeeld "Optellen met Dieren" bovenaan. Kies een kindvriendelijk lettertype. Pas de kleur aan bij je thema.

Combineer je optelwerkblad met kleurplaten elementen. Voeg decoratieve afbeeldingen toe uit de bibliotheek. Een vrolijke zon in de hoek. Bloemetjes rond de rand. Kinderen vinden versierde werkbladen leuker.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Oefenbladen Gratis Niveau als PDF met Tafels Oefenen Combinaties',
        description: `Je werkblad is klaar voor downloaden. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen. De kwaliteit is 300 DPI voor scherpe resultaten.

Klik op "Download" en selecteer "Werkblad (PDF)". Het bestand wordt opgeslagen op je computer. Open het en print direct. De afbeeldingen en tekst zijn helder en scherp.

Download ook het antwoordenblad apart. Klik op "Antwoordblad (PDF)". Bewaar dit voor jezelf of print het voor zelfcorrectie door leerlingen. Tijdbesparend bij het nakijken.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Kleuters tot Sommen tot 20 voor Iedereen',
    sectionDescription: 'De optelwerkbladen generator is ontworpen voor verschillende gebruikers. Van kleuterjuffen tot ouders die thuisonderwijs geven. Ontdek hoe deze tool past bij jouw situatie en onderwijsdoelen.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters met Fijne Motoriek en Letters Leren Combinaties',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Werk je met kleuters in groep 1 of 2? Dan weet je hoe belangrijk visueel leren is. Werkbladen kleuters moeten concreet en aansprekend zijn. Abstracte cijfers werken nog niet.

De optelwerkbladen met plaatjes zijn perfect voor deze leeftijd. Kinderen tellen bekende voorwerpen. Appels, bloemen, dieren. Ze begrijpen wat optellen betekent voordat ze met cijfers werken.

Combineer de werkbladen met fijne motoriek oefeningen. Laat kinderen de plaatjes inkleuren na het tellen. Of laat ze de antwoorden omcirkelen. Zo train je handvaardigheid tijdens het rekenen.`,
        quote: 'Mijn kleuters vinden de kleurrijke optelwerkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 - Veilig Leren Lezen Ondersteunen met Rekenen Werkbladen en Sommen tot 20',
        subtitle: 'Werkbladen groep 3 en Veilig leren lezen',
        description: `Groep 3 is een cruciaal jaar. Kinderen leren lezen én rekenen tegelijk. De optelwerkbladen ondersteunen beide vaardigheden. Ze zijn perfect afgestemd op het niveau van deze groep.

Maak werkbladen die aansluiten bij Veilig leren lezen thema's. Gebruik afbeeldingen met woorden uit de actuele kern. Kinderen herkennen de plaatjes én de woorden. Taal en rekenen versterken elkaar.

De sommen tot 20 zijn precies goed voor groep 3. Begin met getallen tot tien. Bouw langzaam op naar twintig. De generator maakt differentiatie eenvoudig. Snelle leerlingen krijgen moeilijkere sommen.`,
        quote: 'Optelwerkbladen passen perfect bij onze leesmethode.',
      },
      {
        id: '3',
        icon: '🧮',
        title: 'Leerkrachten Groep 4 en 5 - Tafels Oefenen Voorbereiden met Optelwerkbladen en Kleurplaten',
        subtitle: 'Tafels oefenen en kleurplaten',
        description: `In groep 4 en 5 worden de sommen complexer. Kinderen werken met grotere getallen. De optelwerkbladen bereiden voor op vermenigvuldigen. Optellen is immers herhaald tellen.

Gebruik de werkbladen als opwarming voor tafels oefenen. Laat kinderen eerst vijf plus vijf optellen. Dan drie keer vijf. Ze zien de verbinding tussen optellen en vermenigvuldigen.

Combineer optelwerkbladen met kleurplaten voor ontspanning. Na het serieuze rekenwerk mogen kinderen de plaatjes inkleuren. Een beloning die ook fijne motoriek traint.`,
        quote: 'Rekenen wordt leuker met puzzelelementen erbij.',
      },
      {
        id: '4',
        icon: '🏠',
        title: 'Ouders met Thuisonderwijs - Oefenbladen Gratis Niveau voor Schrijven Oefenen en Rekenen',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Geef je thuisonderwijs? Dan weet je hoe belangrijk variatie is. Dezelfde werkbladen worden snel saai. De optelwerkbladen generator biedt eindeloze mogelijkheden.

Maak oefenbladen gratis niveau kwaliteit die aansluiten bij jullie thema. Behandel je deze week de boerderij? Genereer optelwerkbladen met boerderijdieren. Kinderen leren spelenderwijs.

Combineer rekenen met schrijven oefenen. Laat kinderen na elke som het antwoord voluit schrijven. "Drie plus twee is vijf." Ze oefenen schrijfvaardigheid in een betekenisvolle context.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '5',
        icon: '🌐',
        title: 'NT2-Docenten - Veilig Leren Lezen voor Anderstaligen met Werkbladen Groep 3 Niveau',
        subtitle: 'Werkbladen groep 3 voor NT2',
        description: `Werk je met nieuwkomers of anderstalige leerlingen? De optelwerkbladen zijn ideaal voor taalondersteuning. Rekenen is universeel. Getallen werken in elke taal hetzelfde.

Gebruik de werkbladen om Veilig leren lezen woordenschat te oefenen. Kies afbeeldingen met eenvoudige Nederlandse namen. Appel, boom, vis. Kinderen leren woorden terwijl ze rekenen.

De visuele aanpak overstijgt taalbarrières. Kinderen begrijpen de opdracht door de plaatjes. Ze hoeven niet alles te kunnen lezen. Het rekenen lukt toch.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Onderwijsondernemers - Kleurplaten en Oefenbladen Gratis Maken voor Verkoop met Commerciële Licentie',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Wil je geld verdienen met je lesmateriaal? De optelwerkbladen generator maakt dit mogelijk. Met je Basispakket abonnement krijg je een commerciële licentie inbegrepen.

Maak unieke oefenbladen en verkoop ze online. Teachers Pay Teachers is populair bij Nederlandse docenten. Ook Etsy werkt goed voor printables. De kwaliteit is professioneel genoeg.

Combineer optelwerkbladen met kleurplaten tot complete pakketten. Een thema-bundel met rekenen, kleuren en schrijfoefeningen. Ouders en collega's betalen graag voor complete materialen.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from addition.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Optelwerkbladen - Oefenbladen Gratis en Kleurplaten Antwoorden',
    sectionDescription: 'Heb je vragen over de optelwerkbladen generator? Hier vind je antwoorden op de meest gestelde vragen. Van abonnementskosten tot technische mogelijkheden.',
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
        question: 'Is Deze Optelwerkbladen Generator Echt Gratis voor Sommen tot 20 en Werkbladen Groep 3?',
        answer: 'De optelwerkbladen generator vereist een Basispakket abonnement van €144 per jaar of €15 per maand. Je abonnement geeft je onbeperkte werkbladen creatie zonder extra kosten per download. Genereer zoveel werkbladen groep 3 als je nodig hebt. Sommen tot 20, sommen tot 10, of complexere opgaven. Alles zit inbegrepen. Geen verborgen kosten of limieten. Het Basispakket bevat tien populaire werkblad generators. Het Volledige Toegang abonnement kost €240 per jaar en bevat alle 33 generators. Beide abonnementen bevatten commerciële licentie, elf talen ondersteuning, en 300 DPI kwaliteit.',
      },
      {
        id: '2',
        question: 'Kan Ik Optelwerkbladen Thuis Printen met Kleurplaten op een Gewone Printer?',
        answer: 'Ja, alle werkbladen zijn geoptimaliseerd voor thuisprinters. De PDF-bestanden printen perfect op standaard A4-papier. Ook op oudere inkjetprinters krijg je goede resultaten. Combineer optelwerkbladen met kleurplaten op één vel. Print in kleur voor de beste ervaring. Of gebruik de grijswaarden optie om inkt te besparen. Beide opties leveren scherpe resultaten. De 300 DPI resolutie garandeert professionele kwaliteit.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Werkbladen Kleuters met Fijne Motoriek?',
        answer: 'Nee, de generator doet al het ontwerpwerk automatisch. Je selecteert afbeeldingen en klikt op genereren. Het werkblad verschijnt direct klaar voor gebruik. Voor werkbladen kleuters met fijne motoriek elementen hoef je niets te tekenen. Kies een thema en de tool maakt de layout. Voeg eventueel decoraties toe met simpele klikken. De bewerkingsfuncties zijn intuïtief. Slepen, vergroten, verkleinen. Alles werkt met je muis.',
      },
      {
        id: '4',
        question: 'Mag Ik Optelwerkbladen Gebruiken in Mijn Klas voor Tafels Oefenen Voorbereiding?',
        answer: 'Ja, je Basispakket abonnement bevat onbeperkt klassikaal gebruik. Print werkbladen voor al je leerlingen. Deel ze digitaal via je leerlingportaal. Geen extra licentie nodig. Gebruik de optelwerkbladen als voorbereiding op tafels oefenen. Kinderen begrijpen eerst optellen. Daarna is vermenigvuldigen logischer. Je mag werkbladen ook delen met collega\'s binnen je school.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Optelwerkbladen Beschikbaar voor Veilig Leren Lezen?',
        answer: 'De generator ondersteunt elf talen volledig. Nederlands, Engels, Duits, Frans, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins. Elke taal werkt perfect. Voor Veilig leren lezen integratie kies je Nederlands. De afbeeldingsnamen sluiten aan bij de woordenschat van groep 3. Kinderen herkennen woorden uit hun leesmethode. Wissel tussen talen voor meertalig onderwijs.',
      },
      {
        id: '6',
        question: 'Kan Ik Optelwerkbladen Verkopen met Kleurplaten voor Commercieel Gebruik?',
        answer: 'Ja, je Basispakket abonnement bevat een volledige commerciële licentie. Verkoop je werkbladen op Teachers Pay Teachers, Etsy of Amazon KDP. Geen extra kosten. Combineer optelwerkbladen met kleurplaten tot complete pakketten. Themabundels verkopen beter dan losse werkbladen. Voeg waarde toe en verhoog je prijzen. De 300 DPI kwaliteit is professioneel genoeg voor verkoop.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Optelwerkbladen Aan voor Letters Leren en Schrijven Oefenen?',
        answer: 'De canvas-editor biedt volledige aanpassingsmogelijkheden. Voeg tekst toe, wijzig kleuren, verplaats elementen. Alles is bewerkbaar na het genereren. Voor letters leren integratie kies je thematische afbeeldingen. Alle woorden die beginnen met dezelfde letter. Kinderen oefenen letterherkenning én rekenen tegelijk. Voeg schrijflijnen toe voor schrijven oefenen onder de sommen.',
      },
      {
        id: '8',
        question: 'Welke Leeftijdsgroepen Werken Het Beste met Werkbladen Kleuters en Sommen tot 20?',
        answer: 'De optelwerkbladen zijn perfect voor kinderen van 4 tot 10 jaar. Werkbladen kleuters bevatten eenvoudige sommen met grote plaatjes. Getallen tot vijf zijn ideaal voor deze leeftijd. Groep 3 en 4 leerlingen werken met sommen tot 20. Ze begrijpen grotere getallen. De visuele ondersteuning helpt bij het ontwikkelen van rekenbegrip. Groep 5 en hoger gebruiken de werkbladen als opwarming.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Oefenbladen Gratis Niveau Werkbladen?',
        answer: 'Ja, de uploadfunctie accepteert JPG, PNG en GIF bestanden. Upload meerdere afbeeldingen tegelijk. Combineer ze met bibliotheekplaatjes voor unieke werkbladen. Je geüploade afbeeldingen worden gebruikt in de optelwerkbladen. Foto\'s van klasactiviteiten, schooluitjes of themaprojecten. Kinderen herkennen bekende plaatjes. De kwaliteit hangt af van je uploads. Gebruik afbeeldingen van minimaal 200x200 pixels.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om een Optelwerkblad te Maken met Fijne Motoriek Oefeningen?',
        answer: 'Het basisproces duurt minder dan drie minuten. Selecteer afbeeldingen, stel opties in, genereer. Je werkblad is direct klaar voor downloaden. Voor uitgebreide werkbladen met fijne motoriek oefeningen reken je vijf tot tien minuten. Voeg decoraties toe, pas teksten aan, combineer met kleuractiviteiten. Na wat oefening maak je een heel weekpakket in dertig minuten.',
      },
      {
        id: '11',
        question: 'Bevatten Optelwerkbladen Antwoordbladen voor Tafels Oefenen Controle?',
        answer: 'Ja, de generator maakt automatisch een antwoordenblad. Alle sommen staan ingevuld met correcte antwoorden. Download het apart of samen met het werkblad. Het antwoordenblad is handig voor snelle correctie. Leg het naast de leerlingwerkbladen. Nakijken gaat in seconden. Ideaal voor drukke leerkrachten. Voor tafels oefenen voorbereiding gebruik je de antwoorden als controle.',
      },
      {
        id: '12',
        question: 'Kan Ik Optelwerkbladen Maken over Specifieke Vakken met Veilig Leren Lezen Thema\'s?',
        answer: 'Ja, de themabibliotheek bevat afbeeldingen voor elk schoolvak. Dieren voor biologie. Vormen voor meetkunde. Fruit voor gezonde voeding. Seizoenen voor aardrijkskunde. Voor Veilig leren lezen integratie kies je afbeeldingen die passen bij de actuele kern. Woorden die kinderen net hebben geleerd. Rekenen versterkt het leesonderwijs. Maak vakoverstijgende werkbladen voor complete lessen.',
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
    guaranteeText: '30 dagen geld-terug-garantie',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Optelwerkbladen met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'De Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer optelwerkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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
        slug: 'word-search',
        name: 'Woordzoeker',
        category: 'Taal',
        icon: '🔍',
        description: 'Combineer optelwerkbladen met woordzoekers voor taalrijke rekenlessen met Veilig leren lezen woorden.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide optelwerkbladen met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '3',
        slug: 'subtraction',
        name: 'Aftrekken',
        category: 'Rekenen',
        icon: '➖',
        description: 'Combineer met aftrekwerkbladen voor compleet getallenwerk. Optellen en aftrekken samen oefenen.',
      },
      {
        id: '4',
        slug: 'alphabet-train',
        name: 'Alfabet Trein',
        category: 'Vroege Educatie',
        icon: '🚂',
        description: 'Vul optelwerkbladen aan met letterherkenningsactiviteiten voor letters leren en rekenen samen.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast het rekenen met plaatjes.',
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

export default additionNlContent;
