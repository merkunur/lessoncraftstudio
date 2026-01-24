import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/zoek-en-tel-werkbladen.ts
 * URL: /nl/apps/zoek-en-tel-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/find-and-count.md
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

export const findAndCountNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'zoek-en-tel-werkbladen',
    appId: 'find-and-count',
    title: 'Zoek en Tel Generator - Gratis Werkblad voor Kinderen met Werkbladen',
    description: 'Maak professionele zoek-en-tel werkbladen in enkele minuten. Deze interactieve werkblad generator combineert visueel zoeken met tellen. Met je Basispakket.',
    keywords: 'zoek en tel werkbladen, rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/zoek-en-tel-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-and-count/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad zoek en tel - werkbladen groep 3 voor rekenen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-and-count/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen voor kinderen - zoek en tel met sommen tot 20',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-and-count/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis printables zoek en tel - werkblad voor kleuters met fijne motoriek',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/find-and-count/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Werkblad voor kinderen zoek en tel - oefenbladen gratis kwaliteit',
      },
    ],
  },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-2
  hero: {
    title: 'Zoek en Tel Generator - Gratis Werkbladen Maker',
    subtitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters en Groep 3',
    description: `Maak professionele zoek-en-tel werkbladen in enkele minuten. Deze interactieve werkblad generator combineert visueel zoeken met tellen. Met je Basispakket abonnement creëer je onbeperkt werkbladen groep 3 zonder extra kosten per werkblad.

De zoek-en-tel generator werkt volledig in het Nederlands. Je kiest afbeeldingen uit de bibliotheek of uploadt eigen plaatjes. Kinderen zoeken specifieke objecten in een rasterpatroon en tellen hoeveel ze vinden. Ideaal voor rekenen werkbladen die visuele discriminatie combineren met getalbegrip.

Zoek-en-tel activiteiten stimuleren meerdere vaardigheden tegelijk. Kinderen oefenen concentratie terwijl ze objecten zoeken. Ze tellen wat ze vinden en noteren het antwoord. Dit combineert observatievaardigheden met rekenen werkbladen doelen.`,
    previewImageSrc: '/samples/dutch/find-and-count/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
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
        worksheetSrc: '/samples/dutch/find-and-count/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/find-and-count/sample-1-answer.jpeg',
        altText: 'Gratis zoek en tel werkblad voor kinderen - werkbladen groep 3 voor rekenen werkbladen',
        pdfDownloadUrl: '/samples/dutch/find-and-count/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/dutch/find-and-count/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/find-and-count/sample-2-answer.jpeg',
        altText: 'Gratis werkbladen zoek en tel - werkblad voor kleuters met sommen tot 20',
        pdfDownloadUrl: '/samples/dutch/find-and-count/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/dutch/find-and-count/sample-3.jpeg',
        answerKeySrc: '/samples/dutch/find-and-count/sample-3-answer.jpeg',
        altText: 'Gratis printables zoek en tel - werkblad voor kinderen met fijne motoriek',
        pdfDownloadUrl: '/samples/dutch/find-and-count/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/dutch/find-and-count/sample-4.jpeg',
        answerKeySrc: '/samples/dutch/find-and-count/sample-4-answer.jpeg',
        altText: 'Werkblad voor kinderen zoek en tel - gratis werkblad met oefenbladen kwaliteit',
        pdfDownloadUrl: '/samples/dutch/find-and-count/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from find-and-count.md feature sections
  features: {
    sectionTitle: 'Gratis Werkbladen en Werkblad voor Kinderen - Gratis Printables en Werkblad voor Kleuters',
    sectionDescription: 'Deze zoek-en-tel werkbladen maker biedt alle functies voor effectief onderwijs. Van eenvoudige telwerkbladen voor kleuters tot complexe zoekpatronen voor groep 4. Ontdek hoe je in enkele minuten professionele werkbladen maakt die visueel zoeken combineren met rekenen werkbladen doelen.',
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
        title: 'Gratis Werkblad Maken in 3 Klikken - Werkblad voor Kinderen met Sommen tot 20',
        description: `Het maken van een zoek-en-tel werkblad kost geen technische kennis. Je selecteert een thema uit de bibliotheek met meer dan 3000 afbeeldingen. Kies hoeveel verschillende objecten kinderen moeten zoeken. Klik op genereren en je werkblad is klaar.

De rastergrootte bepaal je zelf voor werkbladen kleuters. Kies vijf bij vijf voor beginners. Of negen bij negen voor gevorderde leerlingen. Het raster vult zich automatisch met afbeeldingen. Sommige objecten komen vaker voor dan andere.

Kinderen zoeken specifieke plaatjes en tellen hoeveel ze vinden. Dit oefent sommen tot 20 op een speelse manier. Ze noteren hun antwoord naast elk zoekobject. Het antwoordblad bevestigt of ze correct hebben geteld.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Gratis Werkbladen Bewerkbaar Canvas - Werkblad voor Kleuters Aanpassen',
        description: `Na het genereren kun je alles aanpassen op het canvas. Sleep afbeeldingen naar een andere positie. Vergroot of verklein elementen met je muis. Draai objecten of verwijder ze volledig. Deze flexibiliteit maakt elke werkblad uniek.

De bewerkingsfuncties zijn perfect voor fijne motoriek integratie. Voeg schrijflijnen toe waar kinderen hun antwoorden noteren. Maak ruimte voor letters leren oefeningen onderaan het werkblad. Combineer visueel zoeken met schrijfvaardigheid.

Je kunt eigen teksten toevoegen aan het werkblad. Schrijf instructies in kindvriendelijke taal. Voeg de naam van de leerling toe. Of maak een titel die past bij je thema. Zeven verschillende lettertypen zijn beschikbaar.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Gratis Printables met Eigen Afbeeldingen - Werkblad voor Kinderen Veilig Leren Lezen',
        description: `Wil je gepersonaliseerde zoek-en-tel werkbladen maken? Upload je eigen afbeeldingen. De tool accepteert JPG, PNG en GIF bestanden. Je kunt meerdere bestanden tegelijk uploaden voor efficiënt werken.

Dit is ideaal voor schrijven oefenen in combinatie met zoeken. Upload afbeeldingen van voorwerpen uit de klas. Kinderen zoeken en tellen bekende objecten. Daarna schrijven ze de namen op. Visueel leren en taalvaardigheid samen.

De uploadfunctie ondersteunt ook Veilig leren lezen integratie. Upload plaatjes die passen bij de huidige kern. Kinderen zoeken de kat, de maan of de roos. Ze oefenen woordherkenning terwijl ze tellen.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Gratis Werkblad voor Kinderen in 11 Talen - Werkblad voor Kleuters Meertalig',
        description: `De zoek-en-tel generator ondersteunt elf talen volledig. Nederlands staat voorop met afbeeldingsnamen die aansluiten bij Veilig leren lezen woordenschat. Maar je maakt ook werkbladen in het Duits, Frans of Engels.

De interface is volledig in het Nederlands beschikbaar. Alle knoppen en menu's zijn vertaald. Ook de thema-namen in de bibliotheek zijn Nederlands. Zo werk je altijd in je eigen taal zonder verwarring.

Voor meertalig onderwijs is dit bijzonder waardevol. Maak rekenen werkbladen in het Nederlands voor de ochtend. Dezelfde zoekactiviteit in het Engels voor de middag. Kinderen leren telwoorden in meerdere talen.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Gratis Werkbladen Commerciële Licentie - Werkblad voor Kinderen Verkopen',
        description: `Met je Basispakket abonnement krijg je een commerciële licentie inbegrepen. Dit betekent dat je jouw werkbladen mag verkopen. Op platforms zoals Etsy, Teachers Pay Teachers of Amazon KDP.

De licentie geldt voor alle werkbladen die je maakt. Ook voor kleurplaten en andere materialen uit de tien Basispakket generators. Je hoeft geen extra kosten te betalen per werkblad of per verkoop.

Veel leerkrachten verdienen extra inkomen met hun materialen. Ze maken zoek-en-tel werkbladen met seizoensthema's. Combineren deze met kleurplaten en rekenwerkbladen. Complete lespakketten verkopen bijzonder goed.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Gratis Printables met 3000+ Afbeeldingen - Werkblad voor Kleuters Thema\'s',
        description: `De beeldbibliotheek bevat meer dan drieduizend kindvriendelijke afbeeldingen. Ze zijn georganiseerd in thema's. Van dieren en voertuigen tot seizoenen en feestdagen. Er is altijd iets dat past bij je les.

Voor zoek-en-tel werkbladen vind je perfecte afbeeldingen. Appels, sterren, bloemen en dieren. Objecten die kinderen direct herkennen. Het zoeken wordt leuk en het tellen betekenisvol.

De afbeeldingen ondersteunen ook tafels oefenen in hogere groepen. Groepeer objecten voor vermenigvuldigingsbegrip. Toon drie groepen van vier sterren. Kinderen tellen eerst, dan vermenigvuldigen ze.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Gratis Werkblad 300 DPI Kwaliteit - Werkblad voor Kinderen Professioneel Printen',
        description: `Alle werkbladen worden geëxporteerd in 300 DPI. Dit is de standaard voor professioneel drukwerk. Je zoek-en-tel werkbladen zien er scherp en helder uit op papier.

Deze kwaliteit is belangrijk voor fijne motoriek activiteiten. De afbeeldingen zijn goed zichtbaar en gedetailleerd. Kinderen kunnen de objecten duidelijk onderscheiden. Het tellen wordt nauwkeurig mogelijk.

Je downloadt werkbladen als PDF of JPEG. De PDF-optie is ideaal voor printen. JPEG werkt goed voor digitaal delen. Er is ook een grijswaarden optie om inkt te besparen.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🔢',
        title: 'Gratis Werkbladen Groep 3 - Werkblad voor Kleuters Visueel Zoeken',
        description: `Leerlingen in groep 3 profiteren enorm van zoek-en-tel oefeningen. Ze leren systematisch zoeken in een raster. Het tellen tot hogere getallen wordt geoefend. Werkbladen groep 3 met deze aanpak versterken getalbegrip op een speelse manier.

De generator maakt automatisch antwoordbladen. Je hoeft niet zelf te tellen hoeveel objecten er verstopt zijn. Het antwoordblad toont exact de aantallen. Dit bespaart correctietijd voor drukke leerkrachten.

Voor werkbladen kleuters zijn zoek-en-tel activiteiten extra waardevol. Kleuters ontwikkelen hun visuele aandacht. Ze leren patronen herkennen in een groter geheel. Het tellen tot vijf of tien wordt speels geoefend.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from find-and-count.md step sections
  howTo: {
    sectionTitle: 'Gratis Werkblad Maken - Werkblad voor Kleuters Zoek en Tel in 5 Stappen',
    sectionDescription: 'Het maken van een zoek-en-tel werkblad duurt minder dan drie minuten. Volg deze vijf stappen en je hebt een professioneel werkblad klaar. Geen technische kennis vereist. Van thema kiezen tot downloaden in een paar klikken.',
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
        title: 'Stap 1: Gratis Werkblad Inhoud Kiezen - Werkblad voor Kinderen Thema',
        description: `Begin met het selecteren van je afbeeldingen. Je hebt twee opties. Kies een thema uit de bibliotheek. Of upload je eigen plaatjes voor gepersonaliseerde werkbladen kleuters.

De thema-optie werkt het snelst voor sommen tot 20 werkbladen. Selecteer bijvoorbeeld "Dieren" of "Fruit". De generator toont alle beschikbare afbeeldingen in dat thema. Klik op de plaatjes die kinderen moeten zoeken en tellen.

Je selecteert één tot vier verschillende objecten als zoekdoelen. Voor beginners kies je twee objecten. Voor gevorderde leerlingen kun je vier kiezen. Elk object wordt meerdere keren in het raster geplaatst.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Gratis Werkbladen Instellingen - Werkblad voor Kleuters Aanpassen',
        description: `Nu configureer je de rasterinstellingen. Begin met het aantal rijen en kolommen. Kies vijf tot tien voor beide dimensies. Een groter raster betekent meer zoekwerk.

Voor werkbladen kleuters adviseren we een vijf bij vijf raster. Dit geeft 25 vakjes met afbeeldingen. Kinderen kunnen het overzicht bewaren. Het tellen blijft behapbaar voor jonge leerlingen.

Voor werkbladen groep 3 kun je naar zes bij zes of zeven bij zeven. Dit geeft 36 of 49 vakjes. Meer uitdaging voor gevorderde zoekers. De sommen tot 20 blijven binnen bereik.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Gratis Printables Genereren - Werkblad voor Kinderen Aanmaken',
        description: `Klik op de knop "Genereren" om je zoek-en-tel werkblad te maken. Het werkblad verschijnt direct op het canvas. Je ziet het volledige raster met alle afbeeldingen.

De generator plaatst de objecten automatisch in het raster. Sommige afbeeldingen komen vaker voor dan andere. De zoekobjecten zijn willekeurig verspreid. Kinderen moeten echt zoeken om alles te vinden.

Onder het raster verschijnen de zoekopdrachten. Elk zoekobject wordt getoond met een antwoordvakje. Kinderen tellen hoeveel ze vinden en noteren het getal. Perfect voor letters leren combinatie met cijfers.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Gratis Werkblad voor Kinderen Bewerken - Werkblad voor Kleuters Canvas',
        description: `Na het genereren kun je alles aanpassen. Dit is waar de tool echt flexibel wordt. Voeg elementen toe of verwijder wat je niet nodig hebt.

Sleep afbeeldingen naar een andere positie in het raster. Vergroot of verklein objecten met je muis. Draai elementen voor variatie. Verwijder afbeeldingen die niet passen bij je thema.

Voor schrijven oefenen integratie voeg je tekstgebieden toe. Kinderen schrijven de naam van elk zoekobject. Ze tellen appels en schrijven "appel". Rekenen en taalvaardigheid gecombineerd.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Gratis Werkbladen Downloaden - Werkblad voor Kinderen PDF Printen',
        description: `Je werkblad is klaar voor downloaden. Kies tussen PDF en JPEG formaat. PDF werkt het beste voor printen. JPEG is handig voor digitaal delen met ouders.

Het antwoordblad genereer je met één klik. Alle aantallen staan automatisch ingevuld. Kinderen kunnen zelf controleren. Of jij controleert snel een hele stapel.

De grijswaarden optie bespaart inkt voor werkbladen groep 3. Alle afbeeldingen blijven herkenbaar in zwart-wit. Perfect voor scholen met beperkt printbudget. De kwaliteit blijft professioneel.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Gratis Werkblad voor Kinderen - Werkblad voor Kleuters voor Leerkrachten',
    sectionDescription: 'Zoek-en-tel werkbladen zijn veelzijdig inzetbaar. Van kleuterklas tot bovenbouw. Van klassikaal onderwijs tot thuisonderwijs. Ontdek hoe verschillende gebruikers profiteren van deze generator voor rekenen werkbladen en visuele training.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters met Fijne Motoriek en Veilig Leren Lezen',
        subtitle: 'Gratis werkblad voor kleuters en fijne motoriek',
        description: `Leerkrachten in groep 1 en 2 gebruiken zoek-en-tel werkbladen dagelijks. Kleuters ontwikkelen hun visuele aandacht met deze activiteiten. Ze leren systematisch zoeken in een raster. Het tellen wordt speels geoefend.

De werkbladen kleuters ondersteunen fijne motoriek ontwikkeling. Kinderen wijzen naar gevonden objecten. Ze tellen op hun vingers. Daarna schrijven ze het getal in het antwoordvakje.

Voor Veilig leren lezen integratie zijn zoekwerkbladen ideaal. Upload afbeeldingen van kernwoorden. Kinderen zoeken de kat tussen alle dieren. Ze tellen hoeveel katten ze vinden. Lezen en rekenen komen samen.`,
        quote: 'Mijn kleuters vinden de kleurrijke zoekwerkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Werkbladen Groep 3 en Groep 4 - Sommen tot 20 met Kleurplaten Thema\'s',
        subtitle: 'Gratis werkbladen groep 3 en sommen tot 20',
        description: `In groep 3 en 4 worden zoek-en-tel werkbladen uitdagender. Grotere rasters met meer objecten. Hogere aantallen om te tellen. Sommen tot 20 worden standaard.

De werkbladen groep 3 combineren zoeken met rekenvaardigheid. Kinderen tellen eerst alle appels. Dan alle peren. Ze vergelijken de aantallen. Wie heeft er meer? Dit oefent vergelijkend rekenen.

Met kleurplaten thema's worden de werkbladen aantrekkelijker. Kies seizoensgebonden afbeeldingen. Herfstbladeren in oktober. Sneeuwvlokken in december. Kinderen zijn extra gemotiveerd door herkenbare thema's.`,
        quote: 'Zoek-en-tel werkbladen passen perfect bij onze leesmethode.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijzende Ouders - Oefenbladen Gratis Niveau voor Rekenen Werkbladen Thuis',
        subtitle: 'Gratis werkblad voor kinderen thuis',
        description: `Ouders die thuisonderwijs geven profiteren enorm van deze generator. Ze maken professionele werkbladen zonder grafische vaardigheden. De oefenbladen gratis niveau kwaliteit is indrukwekkend.

Rekenen werkbladen voor thuis sluiten aan bij schoolmethodes. De visuele aanpak helpt kinderen begrijpen. Tellen wordt concreet door afbeeldingen. Ouders leggen makkelijker uit wat rekenen betekent.

De flexibiliteit past bij thuisonderwijs. Maak werkbladen wanneer je wilt. Pas de moeilijkheid aan per kind. Geen vaste lesmethode die je moet volgen.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'NT2 en Taalleerkrachten - Letters Leren en Schrijven Oefenen met Visueel Zoeken',
        subtitle: 'Werkblad voor kinderen taal en letters leren',
        description: `Voor NT2-onderwijs zijn zoek-en-tel werkbladen bijzonder effectief. Nieuwkomers leren Nederlandse woorden via afbeeldingen. Ze zoeken objecten en horen de naam. Visueel leren overstijgt taalbarrières.

De generator ondersteunt letters leren voor anderstaligen. Kinderen zoeken afbeeldingen die beginnen met een specifieke letter. Alle A-woorden: appel, auto, aap. Ze tellen en leren tegelijk.

Schrijven oefenen combineert met zoekactiviteiten. Kinderen vinden een object en schrijven de naam. Dit versterkt spelling en woordherkenning. Het antwoordblad helpt bij zelfcontrole.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '5',
        icon: '🎓',
        title: 'Leerkrachten Speciaal Onderwijs - Fijne Motoriek en Tafels Oefenen met Visuele Ondersteuning',
        subtitle: 'Gratis printables speciaal onderwijs fijne motoriek',
        description: `In het speciaal onderwijs bieden zoek-en-tel werkbladen structuur. De visuele aanpak werkt voor veel leerlingen. Het raster geeft overzicht. De zoektaak is duidelijk afgebakend.

Voor fijne motoriek doelen zijn deze werkbladen perfect. Kinderen wijzen, tellen en schrijven. Elke stap oefent handvaardigheid. De afbeeldingen zijn groot genoeg om aan te raken.

Tafels oefenen wordt visueel met zoekwerkbladen. Kinderen zoeken groepen van objecten. Drie groepen van vier sterren. Ze tellen eerst, dan vermenigvuldigen. Abstract wordt concreet.`,
        quote: 'Perfecte ondersteuning voor mijn leerlingen met speciale behoeften.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Leerkracht-Ondernemers - Kleurplaten en Werkbladen Groep 3 Verkopen met Commerciële Licentie',
        subtitle: 'Gratis werkbladen verkopen commerciële licentie',
        description: `De commerciële licentie opent deuren voor ondernemende leerkrachten. Je mag alle werkbladen verkopen die je maakt. Op Etsy, Teachers Pay Teachers of Amazon KDP.

Zoek-en-tel werkbladen verkopen uitstekend. Ouders zoeken activiteiten voor thuis. Leerkrachten zoeken aanvulling op hun methode. Seizoensgebonden pakketten zijn populair.

Combineer zoekwerkbladen met kleurplaten in je webshop. Maak thematische bundels. Pasen, Sinterklaas, zomervakantie. Complete lespakketten trekken meer kopers.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from find-and-count.md
  faq: {
    sectionTitle: 'FAQ - Gratis Werkblad voor Kinderen en Werkblad voor Kleuters. Werkblad voor Kinderen',
    sectionDescription: 'Heb je vragen over de zoek-en-tel werkbladen generator? Hier vind je antwoorden op de meest gestelde vragen. Van abonnementskosten tot pedagogische toepassingen.',
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
        question: 'Hoe Combineer Ik Gratis Werkblad Zoek en Tel met Veilig Leren Lezen en Werkblad voor Kleuters?',
        answer: 'De zoek-en-tel generator integreert naadloos met Veilig leren lezen. Upload afbeeldingen van kernwoorden uit de huidige kern. Kinderen zoeken de kat, de maan of de roos in het raster. Ze tellen hoeveel ze vinden en noteren het getal. Voor werkbladen kleuters kies je een kleiner raster van vijf bij vijf. Dit geeft 25 zoekposities. Kleuters behouden het overzicht terwijl ze zoeken. Het tellen blijft binnen hun vaardigheidsniveau. De Veilig leren lezen woordenschat versterkt woordherkenning.',
      },
      {
        id: '2',
        question: 'Kan Ik Gratis Werkbladen Tafels Oefenen Combineren met Zoek en Tel voor Werkblad voor Kinderen Groep 3?',
        answer: 'Absoluut. Zoek-en-tel werkbladen zijn ideaal voor visuele tafels oefenen. Kinderen zoeken groepen van objecten in het raster. Drie groepen van vier sterren bijvoorbeeld. Ze tellen eerst, dan vermenigvuldigen ze. Voor werkbladen groep 3 maak je grotere rasters met meer objecten. Kinderen zoeken en tellen hogere aantallen. De overgang naar vermenigvuldigen wordt concreet. Abstract rekenwerk krijgt visuele betekenis. Je voegt vermenigvuldigingsvragen toe via de teksttools.',
      },
      {
        id: '3',
        question: 'Zijn de Gratis Werkbladen Geschikt als Kleurplaten en Gratis Printables Niveau?',
        answer: 'De afbeeldingen in de bibliotheek hebben kleurplaten kwaliteit. Heldere lijnen en herkenbare vormen. Kinderen kunnen de gevonden objecten inkleuren na het tellen. Zoeken, tellen en kleuren in één activiteit. De oefenbladen gratis niveau kwaliteit is gegarandeerd door 300 DPI export. Alle werkbladen printen scherp en professioneel. Geen korrelige afbeeldingen of vage lijnen. Printklaar materiaal voor elke printer.',
      },
      {
        id: '4',
        question: 'Hoe Ondersteunt Gratis Werkblad voor Kinderen Fijne Motoriek en Schrijven Oefenen?',
        answer: 'Zoek-en-tel activiteiten oefenen fijne motoriek op meerdere manieren. Kinderen wijzen naar gevonden objecten. Ze tellen op hun vingers. Daarna schrijven ze het getal in het antwoordvakje. Voor schrijven oefenen voeg je extra tekstgebieden toe. Kinderen schrijven de naam van elk zoekobject. Ze tellen appels en schrijven "appel". Het werkblad combineert drie vaardigheden. De fijne motoriek ontwikkeling profiteert van de detailrijke afbeeldingen.',
      },
      {
        id: '5',
        question: 'Hoeveel Sommen tot 20 Kan Ik Op Één Gratis Werkblad voor Kinderen Plaatsen?',
        answer: 'De rastergrootte bepaalt hoeveel telwerk mogelijk is. Een zes bij zes raster bevat 36 vakjes. Kinderen kunnen tot vier verschillende objecten zoeken en tellen. Elk object verschijnt meerdere keren. Voor sommen tot 20 houd je de aantallen per object onder twintig. In een klein raster zoeken kinderen bijvoorbeeld acht appels en twaalf peren. Beide tellingen blijven binnen het bereik. Grotere rasters van negen bij negen geven 81 posities.',
      },
      {
        id: '6',
        question: 'Kan Ik Gratis Werkblad voor Kinderen Maken met Eigen Afbeeldingen voor Veilig Leren Lezen?',
        answer: 'Ja, de uploadfunctie accepteert je eigen afbeeldingen. JPG, PNG en GIF formaten werken allemaal. Upload plaatjes die passen bij je huidige Veilig leren lezen kern. Je rekenen werkbladen worden volledig gepersonaliseerd. Kinderen herkennen de afbeeldingen uit hun leesmethode. Het zoeken wordt betekenisvoller. De motivatie stijgt door herkenbare thema\'s. Combineer eigen uploads met bibliotheekafbeeldingen.',
      },
      {
        id: '7',
        question: 'Werkt de Gratis Werkbladen Generator voor Werkblad voor Kleuters en Hogere Groepen?',
        answer: 'De zoek-en-tel generator is flexibel voor alle niveaus. Voor hogere groepen maak je complexere rasters. Meer zoekobjecten in grotere aantallen. Tafels oefenen wordt visueel en concreet. Kinderen zoeken groepen objecten voor vermenigvuldigingsoefeningen. Ze tellen het aantal per groep en het aantal groepen. Dan berekenen ze het totaal. Visueel rekenen voor abstracte concepten. De kleurplaten functie werkt voor alle leeftijden.',
      },
      {
        id: '8',
        question: 'Hoe Download Ik Werkblad voor Kleuters met Gratis Printables Kwaliteit en Antwoordblad?',
        answer: 'Downloaden is eenvoudig met twee klikken. Kies PDF of JPEG formaat. PDF werkt het beste voor printen. JPEG is handig voor digitaal delen met ouders. De werkbladen kleuters hebben dezelfde oefenbladen gratis kwaliteit als alle andere niveaus. 300 DPI resolutie garandeert scherpe afdrukken. Antwoordbladen genereren automatisch met correcte aantallen. De grijswaarden optie bespaart inkt voor scholen met beperkt budget.',
      },
      {
        id: '9',
        question: 'Wat Kost een Basispakket voor Gratis Werkblad voor Kinderen Zoek en Tel?',
        answer: 'Het Basispakket abonnement kost €144 per jaar of €15 per maand. Je krijgt toegang tot tien populaire werkblad generators waaronder de zoek-en-tel generator. Inclusief commerciële licentie voor verkoop van je materialen. Onbeperkt werkbladen maken zonder extra kosten per download. 3000+ afbeeldingen in de bibliotheek. 11 talen ondersteuning. 300 DPI professionele kwaliteit. 30 dagen geld-terug-garantie.',
      },
      {
        id: '10',
        question: 'Kan Ik Gratis Werkbladen Zoek en Tel Verkopen met de Commerciële Licentie?',
        answer: 'Ja, je Basispakket abonnement bevat een volledige commerciële licentie. Verkoop je werkbladen op Teachers Pay Teachers, Etsy of Amazon KDP. Geen extra kosten per werkblad of per verkoop. Combineer zoek-en-tel werkbladen met kleurplaten tot complete pakketten. Themabundels verkopen beter dan losse werkbladen. De 300 DPI kwaliteit is professioneel genoeg voor verkoop. Kopers zien geen verschil met uitgeverijmateriaal.',
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
    sectionDescription: 'Het Basispakket bevat tien werkblad generators die perfect samenwerken. Combineer zoek-en-tel werkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer zoek-en-tel werkbladen met optelwerkbladen voor complete rekenlessen met visuele ondersteuning.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide zoekwerkbladen met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Matching',
        category: 'Visueel',
        icon: '🔗',
        description: 'Combineer met matchingwerkbladen voor visuele discriminatie en concentratie-oefeningen.',
      },
      {
        id: '4',
        slug: 'word-search',
        name: 'Woordzoeker',
        category: 'Taal',
        icon: '🔍',
        description: 'Vul zoek-en-tel werkbladen aan met woordzoekers voor taalrijke activiteiten met Veilig leren lezen woorden.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast het zoeken en tellen.',
      },
      {
        id: '6',
        slug: 'chart-count-color',
        name: 'Tellen en Kleuren',
        category: 'Rekenen',
        icon: '📊',
        description: 'Combineer met tellen en kleuren werkbladen voor uitgebreide visuele rekenlessen.',
      },
    ],
  },
};

export default findAndCountNlContent;
