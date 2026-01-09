import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Subtraction Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/aftrekken-werkbladen.ts
 * URL: /nl/apps/aftrekken-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/subtraction.md
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

export const subtractionNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'aftrekken-werkbladen',
    appId: 'subtraction',
    title: 'Aftrekken Werkbladen Maker - Rekenen Werkbladen voor Groep 1-3 - Oefenbladen Gratis Printen',
    description: 'Maak professionele aftrekken werkbladen met onze rekenen werkbladen generator. Met een Volledige Toegang abonnement krijg je onbeperkt werkbladen zonder kosten per werkblad. Genereer op maat gemaakte oefenbladen voor groep 1, groep 2 en groep 3.',
    keywords: 'aftrekken werkbladen, rekenen werkbladen, werkbladen groep 3, werkbladen kleuters, sommen tot 20, oefenbladen gratis, tafels oefenen, veilig leren lezen, fijne motoriek, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/aftrekken-werkbladen',
  },

  // Hero Section - FULL text from subtraction.md paragraphs 1-4
  hero: {
    title: 'Aftrekken Werkbladen Maker',
    subtitle: 'Rekenen Werkbladen voor Groep 1-3 - Oefenbladen Gratis Printen',
    description: `Maak professionele aftrekken werkbladen met onze rekenen werkbladen generator. Met een Volledige Toegang abonnement krijg je onbeperkt werkbladen zonder kosten per werkblad. Genereer op maat gemaakte oefenbladen voor groep 1, groep 2 en groep 3. Download hoogwaardige PDF werkbladen in minder dan 3 minuten.

Onze aftrekken werkbladen maker combineert spelende afbeeldingen met rekenen oefeningen. Perfect voor basisschool leerkrachten die snel werkbladen groep 3 nodig hebben. Maak visueel aantrekkelijke sommen tot 20 werkbladen die leerlingen betrokken houden. Ideaal voor werkbladen kleuters en jonge rekenaars.

De generator biedt vier verschillende oefenmodi voor aftrekken. Kies tussen traditioneel wegstrepen, afbeelding-nummer sommen, vind de subtrahend, of gemengde oefeningen. Elke modus helpt leerlingen aftrekken op een andere manier te begrijpen. Pas elk werkblad volledig aan op het canvas. Combineer met kleurplaten en fijne motoriek oefeningen voor complete leerpakketten.`,
    previewImageSrc: '/samples/english/subtraction/cross out.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/subtraction/
  samples: {
    sectionTitle: 'Aftrekken Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/subtraction/cross out.jpeg',
        answerKeySrc: '/samples/english/subtraction/cross out answer_key.jpeg',
        altText: 'Aftrekken werkblad wegstrepen modus voor werkbladen groep 3 en sommen tot 20',
        pdfDownloadUrl: '/samples/english/subtraction/cross out.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/subtraction/image number.jpeg',
        answerKeySrc: '/samples/english/subtraction/image number answer_key.jpeg',
        altText: 'Aftrekken werkblad afbeelding-nummer modus voor rekenen werkbladen kleuters',
        pdfDownloadUrl: '/samples/english/subtraction/image number.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/subtraction/find subtrahend.jpeg',
        answerKeySrc: '/samples/english/subtraction/find subtrahend answer_key.jpeg',
        altText: 'Vind de subtrahend werkblad voor oefenbladen gratis kwaliteit',
        pdfDownloadUrl: '/samples/english/subtraction/find subtrahend.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/subtraction/mixed.jpeg',
        answerKeySrc: '/samples/english/subtraction/mixed answer_key.jpeg',
        altText: 'Gemengde modus aftrekken werkblad met variatie voor sommen tot 20 oefeningen',
        pdfDownloadUrl: '/samples/english/subtraction/mixed.pdf',
      },
    ],
  },

  // Features Grid - FULL text from subtraction.md feature sections
  features: {
    sectionTitle: 'Aftrekken Werkbladen Functies - Alles voor Rekenen Werkbladen en Oefenbladen Gratis Maken',
    sectionDescription: 'Onze aftrekken werkbladen maker biedt professionele functies voor basisschool leerkrachten. Maak werkbladen groep 3 met visuele afbeeldingen die leerlingen betrokken houden. Genereer sommen tot 20 werkbladen in verschillende moeilijkheidsgraden. Elke functie is ontworpen om kwalitatieve rekenen werkbladen snel te maken. Combineer aftrekken met kleurplaten en fijne motoriek activiteiten. Perfect voor werkbladen kleuters en groep 1 2 leerlingen. Je Volledige Toegang abonnement geeft toegang tot alle premium functies voor €240 per jaar.',
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
        title: 'Maak Rekenen Werkbladen in 3 Klikken - Snelle Oefenbladen Gratis Generator',
        description: `Selecteer je aftrekken oefeningen en klik op genereer. De werkbladen groep 3 generator maakt direct een compleet werkblad. Kies hoeveel sommen tot 20 je wilt per pagina. Selecteer uit 1 tot 10 aftrekken oefeningen per werkblad. Elk rekenen werkblad verschijnt binnen seconden op je scherm.

De generator gebruikt kindvriendelijke afbeeldingen voor visuele aftrekken oefeningen. Perfect voor werkbladen kleuters die leren door te zien. Combineer met kleurplaten voor extra betrokkenheid. Geen ontwerp vaardigheden nodig voor professionele oefenbladen gratis maken. Drie klikken en je rekenen werkblad is klaar om te bewerken.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Bewerk Alles op het Canvas - Werkbladen Groep 3 Volledig Aanpasbaar',
        description: `Sleep, roteer en vergroot elk element op je aftrekken werkblad. Verplaats sommen tot 20 oefeningen naar gewenste posities. Pas tekstgroottes aan voor werkbladen kleuters met grotere cijfers. Verwijder of vervang afbeeldingen met een klik. Elke rekenen werkblad is volledig bewerkbaar op het canvas.

Wijzig lettertypen in 7 verschillende kindvriendelijke stijlen. Pas kleuren aan voor kleurrijke oefenbladen gratis ontwerpen. Voeg extra tekst toe voor instructies of namen. Sleep elementen met je muis voor perfecte positionering. Deze flexibiliteit maakt professionele werkbladen groep 3 binnen minuten mogelijk.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Eigen Afbeeldingen - Gepersonaliseerde Rekenen Werkbladen voor Groep 1 2',
        description: `Upload meerdere afbeeldingen tegelijk in JPEG, PNG of GIF formaat. Combineer je eigen foto's met bibliotheek afbeeldingen. Maak werkbladen kleuters met herkenbare voorwerpen uit de klas. Upload thematische afbeeldingen voor seizoensgebonden rekenen werkbladen. Gepersonaliseerde sommen tot 20 werkbladen houden leerlingen betrokken.

Gebruik foto's van klasgenoten voor sociale oefenbladen gratis activiteiten. Upload schoollogo's voor gebrande werkbladen groep 3. Combineer met kleurplaten afbeeldingen voor hybride werkbladen. Je geüploade afbeeldingen blijven beschikbaar tijdens je sessie. Geen limiet op hoeveel afbeeldingen je kunt uploaden voor rekenen werkbladen.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Talen Ondersteuning - Rekenen Werkbladen en Oefenbladen Gratis in Nederlands',
        description: `De interface werkt in 11 verschillende talen inclusief Nederlands. Afbeelding bibliotheek labels tonen in je gekozen taal. Perfect voor meertalige scholen met werkbladen kleuters in meerdere talen. Maak rekenen werkbladen in Engels, Duits, Frans, Spaans, Italiaans, Portugees. Ook Zweeds, Deens, Noors en Fins beschikbaar.

Schakel eenvoudig tussen talen voor werkbladen groep 3 met internationale leerlingen. Afbeelding bestandsnamen genereren automatisch in de juiste taal. Ideaal voor tweetalig onderwijs en taalleer rekenen werkbladen. Combineer met veilig leren lezen materialen in meerdere talen. Alle oefenbladen gratis functies werken in elke ondersteunde taal.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Print-on-Demand Commerciële Licentie - Verkoop Werkbladen Groep 3 en Rekenen Werkbladen',
        description: `Je Volledige Toegang abonnement bevat volledige commerciële POD licentie. Verkoop je aftrekken werkbladen op Teachers Pay Teachers. Publiceer sommen tot 20 werkbundels op Etsy. Maak Amazon KDP boeken met je rekenen werkbladen. Geen extra kosten voor commerciële rechten.

Gebruik 300 DPI export voor professionele druk kwaliteit. Maak werkbladen kleuters bundels voor passief inkomen. Combineer aftrekken met kleurplaten voor complete producten. Geen naamsvermelding vereist op je oefenbladen gratis producten. Ideaal voor leerkracht ondernemers die werkbladen groep 3 willen verkopen.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Afbeeldingen Bibliotheek - Visuele Rekenen Werkbladen en Sommen Tot 20 Oefeningen',
        description: `Toegang tot meer dan 3000 kindvriendelijke afbeeldingen. Georganiseerd in thema's voor snelle selectie. Zoek specifieke afbeeldingen voor werkbladen groep 3 thema-eenheden. Alle afbeeldingen zijn geoptimaliseerd voor rekenen werkbladen gebruik. Combineer met kleurplaten voor gemengde activiteiten.

Selecteer thema's zoals dieren, voedsel, transport of seizoenen. Perfect voor contextuele sommen tot 20 met herkenbare voorwerpen. Maak werkbladen kleuters met grote, duidelijke afbeeldingen. Alle achtergronden en randen inbegrepen in je abonnement. Geen extra kosten per afbeelding voor oefenbladen gratis maken.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit - Hoogwaardige Werkbladen Groep 3 en Rekenen Werkbladen',
        description: `Exporteer je aftrekken werkbladen in 300 DPI resolutie. Download als PDF of JPEG voor verschillende gebruiksdoelen. Grijswaarden optie bespaart inkt bij printen. Perfecte print kwaliteit voor werkbladen kleuters bundels. Professioneel genoeg voor verkoop op Teachers Pay Teachers.

PDF formaat behoudt scherpe lijnen en tekst. JPEG ideaal voor digitale oefenbladen gratis distributie. Print sommen tot 20 werkbladen thuis op standaard printer. Geen kwaliteitsverlies bij vergroten of verkleinen. Alle rekenen werkbladen zien er professioneel uit op elk formaat.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🔢',
        title: 'Vier Oefenmodi - Van Wegstrepen tot Gemengde Sommen Tot 20',
        description: `Kies je aftrekken oefenmodus uit vier opties. Traditioneel wegstrepen voor visuele werkbladen kleuters. Afbeelding-nummer modus combineert plaatjes met cijfers. Vind de subtrahend modus daagt leerlingen uit. Gemengde modus biedt variatie in rekenen werkbladen.

Selecteer hoeveel oefeningen je wilt per werkblad. Kies tussen 1 en 10 aftrekken problemen. Voor groep 1 2 leerlingen begin je met 3-5 oefeningen. Werkbladen groep 3 kunnen 7-10 oefeningen bevatten. Meer oefeningen betekent meer oefenbladen gratis practice.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from subtraction.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Werkbladen Groep 3 en Rekenen Werkbladen in 5 Eenvoudige Stappen - Oefenbladen Gratis Maken',
    sectionDescription: 'Maak professionele aftrekken werkbladen in minder dan 3 minuten. Deze stap-voor-stap handleiding toont hoe je sommen tot 20 werkbladen maakt. Perfect voor leerkrachten die snel werkbladen kleuters nodig hebben. Elke stap is eenvoudig en duidelijk uitgelegd. Geen technische kennis vereist voor het maken van rekenen werkbladen. Combineer met kleurplaten en fijne motoriek oefeningen voor complete lespakketten. Volg deze vijf stappen voor professionele oefenbladen gratis genereren.',
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
        title: 'Stap 1: Kies Afbeeldingen voor Werkbladen Kleuters - Rekenen Werkbladen en Sommen Tot 20',
        description: `Selecteer een thema uit de 3000+ afbeeldingen bibliotheek. Kies dieren, voedsel, transport of seizoenen voor werkbladen groep 3. Zoek specifieke afbeeldingen met de zoekbalk. Klik op afbeeldingen om ze te selecteren voor je sommen tot 20 oefeningen. Upload je eigen foto's voor gepersonaliseerde rekenen werkbladen.

Het aantal benodigde afbeeldingen hangt af van je oefeningen aantal. Voor 5 aftrekken problemen selecteer je 5 verschillende afbeeldingen. Voor werkbladen kleuters kies je grote, herkenbare voorwerpen. Thematische selecties maken oefenbladen gratis professioneler. Combineer bibliotheek afbeeldingen met geüploade foto's. Geselecteerde afbeeldingen verschijnen in het preview venster.

Verander de taal van afbeelding labels als gewenst. Perfect voor meertalige werkbladen groep 3 creatie. Alle labels passen automatisch aan naar je gekozen taal. Ideaal voor tweetalig onderwijs rekenen werkbladen. Combineer met veilig leren lezen materialen in verschillende talen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen Aan voor Oefenbladen Gratis - Werkbladen Groep 3 en Sommen Tot 20',
        description: `Kies je aftrekken oefenmodus uit vier opties. Traditioneel wegstrepen voor visuele werkbladen kleuters. Afbeelding-nummer modus combineert plaatjes met cijfers. Vind de subtrahend modus daagt leerlingen uit. Gemengde modus biedt variatie in rekenen werkbladen.

Selecteer hoeveel oefeningen je wilt per werkblad. Kies tussen 1 en 10 aftrekken problemen. Voor groep 1 2 leerlingen begin je met 3-5 oefeningen. Werkbladen groep 3 kunnen 7-10 oefeningen bevatten. Meer oefeningen betekent meer oefenbladen gratis practice.

Stel het maximale getal in voor aftrekken sommen tot 20. Kies tussen 2 en 20 als hoogste getal. Voor werkbladen kleuters gebruik je getallen tot 10. Oudere leerlingen kunnen rekenen werkbladen met getallen tot 20. Vink naam/datum velden aan voor personalisatie.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Je Rekenen Werkblad - Snelle Werkbladen Groep 3 en Oefenbladen Gratis Creatie',
        description: `Klik op de genereer knop om je werkblad te maken. Het aftrekken werkblad verschijnt binnen seconden op het canvas. Alle sommen tot 20 oefeningen zijn automatisch geplaatst. Afbeeldingen zijn gepositioneerd met correcte hoeveelheden. Je rekenen werkblad is klaar voor bewerking.

De generator plaatst elk element op optimale posities. Werkbladen kleuters krijgen grotere afbeeldingen en tekst. Werkbladen groep 3 hebben meer gebalanceerde layouts. Alle oefenbladen gratis creaties zijn meteen bewerkbaar. Geen wachttijd voor professionele rekenen werkbladen.

Switch tussen werkblad en antwoordsleutel tabbladen. Het antwoordsleutel toont alle correcte antwoorden. Perfect voor snel nakijken van sommen tot 20 oefeningen. Beide tabbladen zijn volledig bewerkbaar.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op Canvas - Werkbladen Kleuters en Rekenen Werkbladen Aanpassen met Fijne Motoriek Focus',
        description: `Sleep elk element naar gewenste positie met je muis. Vergroot of verklein afbeeldingen voor perfecte verhoudingen. Roteer elementen voor dynamische werkbladen groep 3 layouts. Verwijder elementen die je niet nodig hebt. Voeg extra tekst toe voor instructies of namen.

Wijzig lettertypen uit 7 kindvriendelijke opties. Pas tekstkleuren aan voor kleurrijke oefenbladen gratis. Verander tekstgroottes voor werkbladen kleuters leesbaarheid. Voeg omlijningen toe aan tekst voor betere zichtbaarheid. Alle tekst aanpassingen gebeuren direct op het canvas.

Groepeer elementen voor eenvoudiger bewerken van sommen tot 20. Gebruik laag opties om elementen naar voren of achteren te brengen. Vergrendel elementen om onbedoelde wijzigingen te voorkomen.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Werkbladen Groep 3 en Rekenen Werkbladen - Oefenbladen Gratis Printen en Delen',
        description: `Kies tussen PDF of JPEG export formaten. PDF behoudt scherpe kwaliteit voor werkbladen kleuters printen. JPEG ideaal voor digitale oefenbladen gratis delen. Selecteer grijswaarden optie om inkt te besparen. Download beide formaten voor flexibele sommen tot 20 distributie.

Download alleen het werkblad of inclusief antwoordsleutel. Beide opties beschikbaar voor rekenen werkbladen. Professionele 300 DPI kwaliteit voor alle downloads. Perfect voor printen op standaard thuisprinter. Geschikt voor commerciële verkoop op Teachers Pay Teachers.

Print je werkbladen groep 3 direct na downloaden. Geen extra software nodig voor oefenbladen gratis printen. Deel digitaal met ouders voor thuisoefening. Upload naar Google Classroom voor digitale lessen.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from subtraction.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Werkbladen Groep 3, Rekenen Werkbladen en Oefenbladen Gratis voor Elke Behoefte',
    sectionDescription: 'Onze aftrekken werkbladen maker dient verschillende onderwijsbehoeften. Van werkbladen kleuters tot werkbladen groep 3 materialen. Combineer met kleurplaten en letters leren activiteiten. Integreer veilig leren lezen principes in rekenen werkbladen. Perfect voor fijne motoriek ontwikkeling met tafels oefenen. Elk type gebruiker vindt waarde in deze veelzijdige oefenbladen gratis generator.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Groep 1-2 Leerkrachten - Werkbladen Kleuters met Kleurplaten en Fijne Motoriek Integratie',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Leerkrachten van groep 1 en 2 maken visuele rekenen werkbladen voor kleuters. Combineer aftrekken oefeningen met kleurplaten voor betrokkenheid. Grote afbeeldingen ondersteunen beginnende rekenaars. Gebruik tot 5 objecten voor werkbladen kleuters getalbegrip. Voeg kleurplaten elementen toe voor fijne motoriek ontwikkeling.

Integreer letters leren met aftrekken sommen tot 20. Combineer cijfers met letter herkenning op oefenbladen gratis. Perfect voor kleuters die meerdere vaardigheden ontwikkelen. Gebruik veilig leren lezen principes met visuele rekenen werkbladen. Thematische werkbladen groep 1 2 verbinden taal met wiskunde.

Maak speelse oefenbladen gratis met dieren en speelgoed. Gebruik herkenbare voorwerpen voor werkbladen kleuters betrokkenheid. Voeg kleurplaten randen toe voor aantrekkelijke layouts.`,
        quote: 'Mijn kleuters vinden de kleurrijke aftrekwerkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Groep 3-5 Leerkrachten - Werkbladen Groep 3 met Sommen Tot 20 en Tafels Oefenen Verbindingen',
        subtitle: 'Werkbladen groep 3 en tafels oefenen',
        description: `Leerkrachten van groep 3, 4 en 5 maken uitdagende rekenen werkbladen. Focus op sommen tot 20 voor werkbladen groep 3 curriculum. Verhoog moeilijkheid met vind de subtrahend oefeningen. Combineer aftrekken met tafels oefenen voor verbanden leggen. Voeg letters leren elementen toe voor geïntegreerde lessen.

Gebruik gemengde oefenmodi voor werkbladen groep 3 differentiatie. Sommige leerlingen krijgen visuele oefenbladen gratis met afbeeldingen. Anderen werken met abstract cijfer aftrekken. Combineer met veilig leren lezen woordenschat oefeningen. Integreer kleurplaten voor leerlingen die pauzes nodig hebben.

Maak thematische eenheden met rekenen werkbladen en taalvaardigheden. Seizoensgebonden sommen tot 20 met relevante vocabulaire.`,
        quote: 'Aftrekwerkbladen passen perfect bij ons rekencurriculum.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders - Oefenbladen Gratis voor Rekenen Werkbladen en Kleurplaten Combinaties',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Thuisonderwijs ouders maken gepersonaliseerde werkbladen kleuters materialen. Combineer familie foto's met aftrekken oefeningen. Gebruik herkenbare huishoudelijke voorwerpen voor sommen tot 20. Integreer letters leren met dagelijkse rekenen werkbladen. Voeg kleurplaten toe voor creatieve pauzes.

Maak oefenbladen gratis voor meerdere kinderen tegelijk. Pas moeilijkheid aan per kind met flexibele instellingen. Combineer werkbladen groep 3 wiskunde met veilig leren lezen. Gebruik tafels oefenen voor oudere broers en zussen. Voeg fijne motoriek activiteiten toe voor jonge leerlingen.

Plan wekelijkse rekenen werkbladen met thematische verbindingen. Maak maandag aftrekken, dinsdag kleurplaten, woensdag letters leren.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'Taalleerkrachten - Veilig Leren Lezen met Rekenen Werkbladen en Letters Leren Integratie',
        subtitle: 'Veilig leren lezen en rekenen',
        description: `Taalleerkrachten combineren aftrekken met veilig leren lezen principes. Gebruik afbeelding labels voor vocabulaire ontwikkeling. Maak tweetalige werkbladen groep 3 in 11 verschillende talen. Integreer letters leren met cijfer herkenning. Combineer rekenen werkbladen met taalverwerving strategieën.

Gebruik themed werkbladen kleuters voor contextuele woordenschat. Dieren thema combineert sommen tot 20 met dieren namen. Voeg letters leren elementen toe aan elke oefenbladen gratis. Perfect voor tweetalig onderwijs rekenen werkbladen. Voeg kleurplaten toe voor visuele woordenschat versterking.

Maak cultureel relevante werkbladen groep 3 voor diverse leerlingen.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Speciaal Onderwijs Leerkrachten - Werkbladen Kleuters Aanpassing met Fijne Motoriek en Kleurplaten Focus',
        subtitle: 'Aangepaste werkbladen voor speciaal onderwijs',
        description: `Speciaal onderwijs leerkrachten passen werkbladen groep 3 aan individuele behoeften. Vergroot afbeeldingen voor visuele ondersteuning. Gebruik kleurplaten voor sensorische breaks. Voeg fijne motoriek elementen toe voor motorische ontwikkeling. Combineer aftrekken met letters leren voor multi-sensorisch leren.

Maak oefenbladen gratis met hoge contrast voor visuele beperkingen. Gebruik grote, duidelijke cijfers voor werkbladen kleuters leesbaarheid. Combineer sommen tot 20 met veilig leren lezen visuele ondersteuning. Voeg extra kleurplaten voor zelfregulatie momenten. Integreer tafels oefenen met bewegingsactiviteiten.

Creëer gelaagde rekenen werkbladen voor verschillende vaardigheidsniveaus.`,
        quote: 'De aanpasbaarheid is perfect voor mijn leerlingen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Leerkracht Ondernemers - Verkoop Werkbladen Groep 3, Kleurplaten en Rekenen Werkbladen Bundels',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Leerkracht ondernemers verkopen aftrekken werkbladen op Teachers Pay Teachers. Maak bundles met sommen tot 20, kleurplaten en letters leren. Combineer werkbladen kleuters met veilig leren lezen materialen. Voeg tafels oefenen toe voor complete curriculum pakketten. Gebruik fijne motoriek activiteiten in premium bundels.

Creëer seizoensgebonden oefenbladen gratis thema collecties. Herfst aftrekken met kleurplaten en letters leren. Winter sommen tot 20 met sneeuwvlok kleurplaten. Lente werkbladen groep 3 met bloemen tafels oefenen. Zomer rekenen werkbladen met strand thema's.

Gebruik 300 DPI export voor professionele werkbladen kleuters producten.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from subtraction.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Werkbladen Groep 3, Rekenen Werkbladen en Oefenbladen Gratis met Kleurplaten en Fijne Motoriek',
    sectionDescription: 'Leerkrachten hebben vragen over onze aftrekken werkbladen maker. Leer hoe je werkbladen kleuters met sommen tot 20 maakt. Ontdek hoe je kleurplaten en letters leren combineert. Begrijp veilig leren lezen integratie met rekenen werkbladen.',
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
        question: 'Is Deze Aftrekken Werkbladen Groep 3 Generator Echt Gratis voor Oefenbladen Gratis Maken?',
        answer: 'De aftrekken werkbladen generator vereist een Volledige Toegang abonnement voor €240 per jaar of €25 per maand. Je abonnement geeft onbeperkte werkbladen groep 3 creatie zonder kosten per werkblad. Genereer zoveel rekenen werkbladen als je nodig hebt zonder extra kosten. Maak onbeperkt werkbladen kleuters met sommen tot 20. Combineer met kleurplaten, letters leren en veilig leren lezen materialen.',
      },
      {
        id: '2',
        question: 'Kan Ik Werkbladen Kleuters en Sommen Tot 20 Thuis Printen op Normale Printer?',
        answer: 'Ja, print alle werkbladen groep 3 en rekenen werkbladen thuis op standaard inkjet of laser printer. Download als PDF voor beste print kwaliteit. Kies grijswaarden optie voor werkbladen kleuters om inkt te besparen. Print sommen tot 20 oefeningen op A4 of US Letter formaat. Alle oefenbladen gratis downloads zijn geoptimaliseerd voor thuis printen. De 300 DPI export kwaliteit zorgt voor scherpe afbeeldingen en tekst.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Werkbladen Groep 3 en Kleurplaten met Fijne Motoriek?',
        answer: 'Nee, geen ontwerpvaardigheden nodig voor professionele rekenen werkbladen. De generator maakt automatisch werkbladen groep 3 in drie klikken. Selecteer afbeeldingen, kies instellingen en klik genereer. Elk werkblad kleuters met sommen tot 20 is klaar om te gebruiken. Voeg kleurplaten en letters leren toe zonder ontwerp kennis. Het canvas editor systeem is eenvoudig te gebruiken.',
      },
      {
        id: '4',
        question: 'Kan Ik Werkbladen Groep 3 en Rekenen Werkbladen Gebruiken in Mijn Klas met Leerlingen?',
        answer: 'Volledige Toegang abonnement bevat onbeperkt klasgebruik voor alle leerlingen. Print zoveel werkbladen groep 3 als je klas nodig heeft. Maak gedifferentieerde rekenen werkbladen per leerling niveau. Gebruik werkbladen kleuters voor groep 1-2 zonder limiet. Genereer sommen tot 20 oefeningen voor hele klas. Alle werkbladen groep 3 materialen inclusief in €240 per jaar abonnement.',
      },
      {
        id: '5',
        question: 'Welke Talen Zijn Beschikbaar voor Werkbladen Kleuters en Veilig Leren Lezen?',
        answer: 'De interface werkt in 11 verschillende talen voor werkbladen groep 3 creatie. Nederlands, Engels, Duits, Frans, Spaans, Italiaans en Portugees. Ook Zweeds, Deens, Noors en Fins beschikbaar. Afbeelding labels tonen automatisch in gekozen taal voor rekenen werkbladen. Perfect voor meertalige scholen met werkbladen kleuters behoeften.',
      },
      {
        id: '6',
        question: 'Kan Ik Werkbladen Groep 3 en Oefenbladen Gratis Verkopen Die Ik Maak?',
        answer: 'Ja, Volledige Toegang abonnement bevat volledige commerciële print-on-demand licentie zonder extra kosten. Verkoop je werkbladen groep 3 bundels op Teachers Pay Teachers. Publiceer rekenen werkbladen op Etsy als digitale downloads. Maak Amazon KDP boeken met sommen tot 20 en kleurplaten. Geen naamsvermelding vereist op je oefenbladen gratis producten.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Werkbladen Kleuters Aan voor Verschillende Sommen Tot 20 Niveaus?',
        answer: 'Gebruik het canvas editor systeem om elk element aan te passen. Vergroot afbeeldingen voor werkbladen kleuters visuele ondersteuning. Verklein tekst voor werkbladen groep 3 uitdagingen. Sleep sommen tot 20 oefeningen naar gewenste posities. Voeg extra kleurplaten elementen toe voor pauzes. Wijzig moeilijkheid door maximale getal in te stellen.',
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijden Werken Deze Rekenen Werkbladen en Werkbladen Groep 3?',
        answer: 'Werkbladen kleuters zijn perfect voor 4-6 jaar oud groep 1-2. Gebruik eenvoudige aftrekken tot 5-10 voor deze leeftijd. Combineer met grote kleurplaten voor betrokkenheid. Werkbladen groep 3 werken goed voor 6-9 jaar oud leerlingen. Focus op sommen tot 20 voor groep 3 curriculum. Alle leeftijden kunnen rekenen werkbladen gebruiken met juiste instellingen.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Werkbladen Kleuters?',
        answer: 'Ja, upload meerdere eigen afbeeldingen tegelijk in JPEG, PNG of GIF formaat. Combineer je foto\'s met bibliotheek afbeeldingen voor werkbladen groep 3. Maak gepersonaliseerde rekenen werkbladen met klasfoto\'s. Upload thematische afbeeldingen voor seizoensgebonden sommen tot 20. Gebruik familie foto\'s voor thuisonderwijs werkbladen kleuters.',
      },
      {
        id: '10',
        question: 'Hoelang Duurt Het om Werkbladen Groep 3 te Maken met Sommen Tot 20?',
        answer: 'Maak professionele rekenen werkbladen in minder dan 3 minuten. Selecteer afbeeldingen, pas instellingen aan en genereer. Het werkblad kleuters verschijnt direct op canvas. Nog 1-2 minuten voor oefenbladen gratis aanpassingen. Totaal 3-5 minuten voor complete werkbladen groep 3. Traditioneel hand maken duurt 30-60 minuten per werkblad.',
      },
      {
        id: '11',
        question: 'Bevatten Werkbladen Groep 3 en Rekenen Werkbladen Antwoordsleutels?',
        answer: 'Ja, elke aftrekken werkblad heeft automatisch gegenereerde antwoordsleutel. Switch tussen werkblad en antwoordsleutel tabbladen. Alle sommen tot 20 antwoorden worden automatisch berekend. Perfect voor snel nakijken van werkbladen groep 3. Download beide apart of samen als oefenbladen gratis pakket. Antwoordsleutels tonen correcte antwoorden voor alle oefeningen.',
      },
      {
        id: '12',
        question: 'Kan Ik Werkbladen Kleuters Maken over Specifieke Schoolvakken?',
        answer: 'Ja, maak thematische rekenen werkbladen voor elk schoolvak. Wetenschap thema aftrekken met dieren en planten afbeeldingen. Geschiedenis themed werkbladen groep 3 met culturele voorwerpen. Aardrijkskunde sommen tot 20 met landkaart elementen. Kunst kleurplaten gecombineerd met aftrekken. Alle vakken integreren natuurlijk in werkbladen groep 3.',
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
      'Onbeperkt werkbladen maken',
      'Alle 33 werkbladen generators',
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
    sectionTitle: 'Combineer Aftrekken Werkbladen met Andere Generators - Complete Leerpakketten met Letters Leren, Veilig Leren Lezen, Tafels Oefenen en Fijne Motoriek',
    sectionDescription: 'LessonCraft Studio biedt 33 verschillende werkbladen generators in één platform. Combineer aftrekken met letters leren voor geïntegreerde lessen. Voeg veilig leren lezen principes toe aan rekenen werkbladen. Integreer tafels oefenen voor wiskundige verbanden. Gebruik fijne motoriek activiteiten voor complete ontwikkeling.',
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
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer aftrekken met optellen voor compleet getallenwerk. Beide operaties samen oefenen versterkt rekenbegrip.',
      },
      {
        id: '2',
        slug: 'word-search',
        name: 'Woordzoeker',
        category: 'Taal',
        icon: '🔍',
        description: 'Combineer aftrekwerkbladen met woordzoekers voor taalrijke rekenlessen met veilig leren lezen woorden.',
      },
      {
        id: '3',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide aftrekwerkbladen met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '4',
        slug: 'math-worksheet',
        name: 'Rekenwerkbladen',
        category: 'Rekenen',
        icon: '🧮',
        description: 'Combineer met algemene rekenwerkbladen voor uitgebreide wiskundige oefening en differentiatie.',
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

export default subtractionNlContent;
