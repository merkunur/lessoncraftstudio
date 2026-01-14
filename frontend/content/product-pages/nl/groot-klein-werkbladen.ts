import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big Small Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/groot-klein-werkbladen.ts
 * URL: /nl/apps/groot-klein-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/big-small.md
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

export const bigSmallNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'groot-klein-werkbladen',
    appId: 'big-small',
    title: 'Groot en Klein Werkbladen Generator - Oefenbladen Gratis voor Kleuters en Groep 3',
    description: 'Maak in enkele minuten professionele groot-klein werkbladen met onze Groot en Klein generator. Met je Volledige Toegang abonnement heb je onbeperkt toegang tot werkbladen kleuters en werkbladen groep 3 zonder extra kosten per werkblad. Download hoogwaardige PDF-werkbladen in minder dan 3 minuten.',
    keywords: 'groot klein werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, rekenen werkbladen, sommen tot 20, tafels oefenen, veilig leren lezen, letters leren',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/groot-klein-werkbladen',
  },

  // Hero Section - FULL text from big-small.md paragraphs 1-2
  hero: {
    title: 'Groot en Klein Werkbladen',
    subtitle: 'Oefenbladen Gratis voor Kleuters en Groep 3',
    description: `Maak in enkele minuten professionele groot-klein werkbladen met onze Groot en Klein generator. Met je Volledige Toegang abonnement heb je onbeperkt toegang tot werkbladen kleuters en werkbladen groep 3 zonder extra kosten per werkblad. Deze werkbladen ondersteunen de fijne motoriek ontwikkeling van jonge kinderen. Download hoogwaardige PDF-werkbladen in minder dan 3 minuten.

Werkbladen groep 3 en werkbladen kleuters zijn essentieel voor het ontwikkelen van visuele waarneming. Kinderen leren objecten vergelijken op grootte. Dit is een belangrijke vaardigheid voor rekenen werkbladen en sommen tot 20. De oefenbladen gratis online zijn moeilijk te vinden in goede kwaliteit. Onze generator biedt professionele werkbladen met meer dan 3000 afbeeldingen.

De Groot en Klein werkbladen helpen bij de ontwikkeling van fijne motoriek. Kinderen oefenen met omcirkelen en nummeren. Dit ondersteunt later het letters leren en schrijven oefenen. De werkbladen zijn perfect voor veilig leren lezen voorbereiding. Kleuters ontwikkelen hun visuele discriminatie door grootteverschillen te herkennen.`,
    previewImageSrc: '/samples/english/big small/big-small-different images.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Groot en Klein Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/big small/big-small-different images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small-different images answer_key.jpeg',
        altText: 'Groot klein werkblad met verschillende afbeeldingen voor werkbladen kleuters en groep 3',
        pdfDownloadUrl: '/samples/english/big small/big-small-different images.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/big small/big-small identical images.jpeg',
        answerKeySrc: '/samples/english/big small/big-small identical images answer_key.jpeg',
        altText: 'Groot klein werkblad met identieke afbeeldingen voor fijne motoriek oefeningen',
        pdfDownloadUrl: '/samples/english/big small/big-small identical images.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/big small/big-small number 1-2-3.jpeg',
        answerKeySrc: '/samples/english/big small/big-small number 1-2-3 answer_key.jpeg',
        altText: 'Groot klein werkblad met nummering 1-2-3 voor ordenen van klein naar groot',
        pdfDownloadUrl: '/samples/english/big small/big-small number 1-2-3.pdf',
      },
    ],
  },

  // Features Grid - FULL text from big-small.md feature sections
  features: {
    sectionTitle: 'Functies van de Groot en Klein Generator - Werkbladen Kleuters en Oefenbladen Gratis',
    sectionDescription: 'Onze Groot en Klein werkbladgenerator biedt alle functies die leerkrachten nodig hebben. Van werkbladen groep 3 tot materiaal voor kleuters. De generator ondersteunt fijne motoriek ontwikkeling en voorbereiding op rekenen werkbladen. Hieronder vind je alle mogelijkheden voor het maken van professionele oefenbladen gratis te downloaden.',
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
        title: 'Werkbladen Groep 3 Maken in 3 Klikken - Snelle Oefenbladen Gratis Generator',
        description: `Maak werkbladen groep 3 in slechts drie eenvoudige stappen. Kies eerst een thema of selecteer afbeeldingen uit de bibliotheek. Stel vervolgens het aantal oefeningen in van 1 tot 10. Klik op genereren en je werkblad is klaar. De hele procedure duurt minder dan drie minuten. Perfecte oefenbladen gratis voor drukke leerkrachten.

De generator biedt vijf verschillende oefentypes. Kinderen kunnen de kleine omcirkelen. Of juist de grote aanwijzen. Bij drie afbeeldingen kunnen ze de middelste vinden. Ordenen van klein naar groot oefent getallenrijen. Van groot naar klein bereidt voor op aftrekken bij sommen tot 20.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Werkbladen Kleuters Volledig Aanpasbaar - Fijne Motoriek Oefeningen Bewerken',
        description: `Elk element op het werkblad is volledig bewerkbaar. Sleep afbeeldingen naar de gewenste positie. Vergroot of verklein objecten met je muis. Draai afbeeldingen voor variatie in je werkbladen kleuters. Verwijder elementen die je niet nodig hebt. Deze flexibiliteit maakt werkbladen groep 3 uniek voor elke klas.

De bewerkingsmogelijkheden ondersteunen fijne motoriek ontwikkeling. Leerkrachten kunnen de moeilijkheidsgraad aanpassen. Grotere afbeeldingen voor beginners bij groep 1 2. Kleinere verschillen voor gevorderde leerlingen. Oefenbladen gratis met dit niveau van aanpassing zijn zeldzaam online.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Rekenen Werkbladen met Eigen Afbeeldingen Uploaden - Sommen tot 20 Personaliseren',
        description: `Upload je eigen afbeeldingen voor gepersonaliseerde rekenen werkbladen. Gebruik foto's van klasgenoten of schoolprojecten. Combineer eigen uploads met bibliotheekafbeeldingen. Alle gangbare formaten worden ondersteund zoals JPEG en PNG. Dit maakt sommen tot 20 oefeningen relevant voor je specifieke klas.

Eigen afbeeldingen verhogen de betrokkenheid van leerlingen. Kinderen herkennen bekende objecten en personen. Dit motiveert bij werkbladen kleuters en werkbladen groep 3. De uploadfunctie werkt per sessie zonder accountvereisten. Perfect voor het personaliseren van oefenbladen gratis.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Veilig Leren Lezen Ondersteuning in 11 Talen - Letters Leren en Schrijven Oefenen',
        description: `De generator ondersteunt 11 talen voor de gebruikersinterface. Nederlands, Engels, Duits, Frans, Spaans en meer. De afbeeldingenbibliotheek toont namen in de gekozen taal. Dit ondersteunt veilig leren lezen in meertalige klassen. Kinderen zien bekende woorden bij de afbeeldingen.

Voor letters leren en schrijven oefenen zijn de afbeeldingsnamen waardevol. Leerkrachten kunnen woorden bespreken tijdens de les. De meertaligheid ondersteunt NT2-onderwijs. Internationale scholen profiteren van alle taalopties. Werkbladen kleuters in de moedertaal verhogen begrip.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Kleurplaten en Fijne Motoriek - Commerciële Licentie voor Verkoop Inbegrepen',
        description: `Je Volledige Toegang abonnement bevat een commerciële print-on-demand licentie. Verkoop je werkbladen op platforms zoals Etsy. Maak kleurplaten en werkbladen voor Teachers Pay Teachers. Amazon KDP ondersteunt laagdrempelige werkboekjes. Geen extra licentiekosten boven je abonnement van 240 euro per jaar.

De 300 DPI kwaliteit is perfect voor professionele verkoop. Kleurplaten en fijne motoriek werkbladen zijn populair bij ouders. Docent-ondernemers verdienen honderden euros per maand. De commerciële licentie maakt dit mogelijk zonder juridische zorgen. Werkbladen groep 3 verkopen is een groeiende markt.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Tafels Oefenen Voorbereiding met 3000+ Afbeeldingen - Rekenen Werkbladen Bibliotheek',
        description: `Toegang tot meer dan 3000 kindvriendelijke afbeeldingen. Alle afbeeldingen zijn georganiseerd per thema. Dieren, voertuigen, eten, seizoenen en meer. Zoek specifieke afbeeldingen met de zoekfunctie. Selecteer meerdere afbeeldingen voor gevarieerde werkbladen.

De thematische organisatie ondersteunt tafels oefenen voorbereiding. Groepeer objecten voor visuele rekenlessen. Rekenen werkbladen worden interessanter met thematische afbeeldingen. De bibliotheek bevat ook achtergronden en randen. Alles inbegrepen in je abonnement zonder extra kosten voor oefenbladen gratis.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Sommen tot 20 Kwaliteit - Professionele 300 DPI Werkbladen Groep 3 Downloaden',
        description: `Download werkbladen in professionele 300 DPI kwaliteit. Kies tussen JPEG en PDF formaten. Werkbladen en antwoordbladen apart downloadbaar. De grijstintenoptie bespaart inkt bij het printen. Perfect voor sommen tot 20 en andere rekenactiviteiten.

De hoge resolutie is geschikt voor alle printers. Werkbladen groep 3 zien er scherp uit op papier. Kleuters kunnen kleine details goed onderscheiden. Dit ondersteunt fijne motoriek en visuele ontwikkeling. Oefenbladen gratis in deze kwaliteit zijn moeilijk te vinden elders.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '✨',
        title: 'Letters Leren met Veilig Leren Lezen Thema\'s - Schrijven Oefenen en Kleurplaten',
        description: `Combineer groot-klein oefeningen met letters leren activiteiten. De afbeeldingenbibliotheek bevat alfabetthema's. Kinderen vergelijken grote en kleine letters. Dit ondersteunt veilig leren lezen methodes. Schrijven oefenen wordt voorbereid door visuele discriminatie.

Kleurplaten met lettervormen zijn beschikbaar in de bibliotheek. Fijne motoriek wordt geoefend door omcirkelen. Werkbladen kleuters met letters verhogen letterherkenning. De combinatie met groot-klein concepten versterkt het leren. Groep 1 2 profiteert van deze geïntegreerde aanpak.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from big-small.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Werkbladen Groep 3 in 5 Stappen - Oefenbladen Gratis Stappenplan',
    sectionDescription: 'Het maken van professionele groot-klein werkbladen is eenvoudig. In vijf stappen heb je werkbladen kleuters of werkbladen groep 3 klaar. Het hele proces duurt minder dan drie minuten. Volg dit stappenplan voor perfecte oefenbladen gratis. Geen technische kennis of ontwerpervaring nodig.',
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
        title: 'Stap 1: Kies Afbeeldingen voor Werkbladen Kleuters - Fijne Motoriek Thema Selecteren',
        description: `Begin met het selecteren van afbeeldingen voor je werkbladen kleuters. Je hebt twee opties voor het kiezen van beelden. Selecteer een thema uit het dropdownmenu voor automatische selectie. Of kies handmatig afbeeldingen uit de bibliotheek met meer dan 3000 opties.

De thematische aanpak werkt perfect voor fijne motoriek lessen. Kies bijvoorbeeld het dierenthema voor biologielessen. Het voertuigenthema past bij verkeersonderwijs. Seizoensthema's sluiten aan bij het jaarrooster. De zoekfunctie helpt bij het vinden van specifieke afbeeldingen.

Voor werkbladen groep 3 kun je ook eigen afbeeldingen uploaden. Combineer bibliotheekafbeeldingen met je eigen foto's. Dit personaliseert je oefenbladen gratis voor jouw klas. Selecteer minimaal zoveel afbeeldingen als je oefeningen plant.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Stel Rekenen Werkbladen Instellingen In - Sommen tot 20 Voorbereiden',
        description: `Configureer de oefeningen voor je rekenen werkbladen voorbereiding. Kies eerst het aantal oefeningen van 1 tot 10. Vier oefeningen is standaard en werkt goed voor de meeste werkbladen groep 3.

Selecteer vervolgens het aantal afbeeldingen per oefening. Kies 2 afbeeldingen voor eenvoudige groot-klein vergelijking. Kies 3 afbeeldingen om ook de middelste te oefenen. Drie afbeeldingen bereiden voor op sommen tot 20 met getallenrijen.

Bepaal de afbeeldingsmodus voor je werkbladen kleuters. Identieke modus toont dezelfde afbeelding in verschillende groottes. Verschillende modus gebruikt unieke afbeeldingen per oefening. De verschillende modus is uitdagender voor gevorderde kleuters.

Kies het vraagtype dat past bij je leerdoel. Omcirkel de kleine oefent herkenning van het kleinste object. Omcirkel de grote focust op het grootste. Nummer 1-2-3 oefent ordenen zoals bij tafels oefenen voorbereidend.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Oefenbladen Gratis met Veilig Leren Lezen Opties - Kleurplaten Direct Bekijken',
        description: `Klik op de genereerknop om je werkblad te maken. Het werkblad verschijnt direct op het scherm. De generator plaatst afbeeldingen automatisch in een overzichtelijke indeling. Antwoordindicatoren worden toegevoegd indien geselecteerd. Oefennummers maken duidelijk welke opgave welke is.

Bekijk het resultaat en controleer de kwaliteit. Kleurplaten en afbeeldingen moeten duidelijk zichtbaar zijn. De grootteverschillen moeten herkenbaar zijn voor kinderen. Dit ondersteunt veilig leren lezen door visuele discriminatie. Kleuters leren details onderscheiden.

Het antwoordblad wordt automatisch voorbereid. Klik op de antwoordbladtab om deze te bekijken. Correcte antwoorden zijn gemarkeerd voor snelle nakijking. Dit bespaart leerkrachten veel tijd bij werkbladen groep 3. Oefenbladen gratis met antwoordbladen zijn zeldzaam online.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk Werkbladen Groep 3 op het Canvas - Letters Leren en Schrijven Oefenen Toevoegen',
        description: `Pas je werkblad aan met de bewerkingstools. Klik op een afbeelding om deze te selecteren. Sleep naar een nieuwe positie indien gewenst. Vergroot of verklein met de hoekpunten. Draai afbeeldingen voor variatie in je werkbladen kleuters.

Voeg tekst toe voor instructies of titels. Typ letters leren opdrachten bovenaan het werkblad. Schrijven oefenen instructies kunnen onderaan geplaatst worden. Kies uit zeven lettertypen die kindvriendelijk zijn. Pas kleur en grootte aan naar wens.

Selecteer een achtergrondthema voor visuele aantrekkelijkheid. Kies een rand die past bij het seizoen of onderwerp. Pas de transparantie aan voor optimale leesbaarheid. Deze aanpassingen maken werkbladen groep 3 professioneel. Fijne motoriek activiteiten worden aantrekkelijker gepresenteerd.

Gebruik de laagfuncties voor complexere ontwerpen. Breng elementen naar voren of naar achteren. Lijn objecten uit voor een strakke presentatie. Vergrendel elementen die niet mogen verschuiven. Dit niveau van controle is uniek voor oefenbladen gratis.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Rekenen Werkbladen als PDF - Tafels Oefenen en Sommen tot 20 Printen',
        description: `Download je voltooide werkblad in hoge kwaliteit. Kies JPEG voor digitaal delen of projectie. Kies PDF voor professioneel printen van rekenen werkbladen. De 300 DPI resolutie garandeert scherpe afdrukken. Tafels oefenen voorbereidende materialen zien er professioneel uit.

Download ook het antwoordblad voor nakijken. Kies dezelfde bestandsindeling als het werkblad. De grijstintenoptie bespaart inkt en is ideaal voor sommen tot 20 oefeningen. Zwart-wit werkbladen zijn ook geschikt als kleurplaten.

Print je werkbladen kleuters op standaard A4 of Letter papier. De generator optimaliseert automatisch voor je gekozen formaat. Werkbladen groep 3 printen perfect op kantoorprinters. Kopieer voor de hele klas zonder kwaliteitsverlies.

Bewaar digitale kopies voor hergebruik. Maak variaties door opnieuw te genereren met andere afbeeldingen. Bouw een bibliotheek van oefenbladen gratis voor het hele schooljaar. Elke download is onbeperkt binnen je Volledige Toegang abonnement.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from big-small.md use case sections
  useCases: {
    sectionTitle: 'Voor Wie Zijn Groot en Klein Werkbladen - Oefenbladen Gratis voor Leerkrachten en Ouders',
    sectionDescription: 'Groot en klein werkbladen zijn geschikt voor diverse gebruikers. Van leerkrachten groep 1 2 tot thuisonderwijzende ouders. De generator maakt werkbladen kleuters en werkbladen groep 3 voor elke situatie. Hieronder beschrijven we wie het meest profiteert van deze oefenbladen gratis.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 en Kleuters - Werkbladen Kleuters voor Fijne Motoriek Ontwikkeling',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Leerkrachten in groep 1 2 gebruiken groot-klein werkbladen dagelijks. Werkbladen kleuters ondersteunen de fijne motoriek ontwikkeling van jonge kinderen. Het omcirkelen van grote of kleine objecten oefent pengreep. Kinderen leren visuele verschillen herkennen.

De generator past perfect bij het kleuteronderwijs curriculum. Thematische werkbladen sluiten aan bij projecten over seizoenen of dieren. Fijne motoriek oefeningen bereiden voor op schrijven oefenen in groep 3. Leerkrachten besparen uren voorbereidingstijd met oefenbladen gratis.

Combineer groot-klein met veilig leren lezen activiteiten. Bespreek de namen van afbeeldingen met de klas. Kinderen leren nieuwe woorden terwijl ze vergelijken. Letters leren wordt versterkt door letterafbeeldingen in de bibliotheek. Kleurplaten maken de activiteit compleet.`,
        quote: 'Mijn kleuters zijn dol op de kleurrijke groot-klein werkbladen!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 met Rekenen Werkbladen - Tafels Oefenen en Sommen tot 20 Voorbereiding',
        subtitle: 'Werkbladen groep 3 en sommen tot 20',
        description: `Groep 3 leerkrachten gebruiken groot-klein voor wiskundevoorbereiding. Werkbladen groep 3 met ordenen van klein naar groot oefenen getallenrijen. Dit is essentieel voor begrip van sommen tot 20. Visuele vergelijking versterkt het wiskundig denken.

De nummer 1-2-3 oefeningen bereiden voor op tafels oefenen. Kinderen leren ordenen en rangschikken. Dit zijn fundamentele vaardigheden voor rekenen werkbladen. De overstap naar abstracte getallen wordt makkelijker door visuele oefening.

Combineer met andere rekenen werkbladen uit de generator. Telrijen, optel- en aftrekoefeningen vullen groot-klein aan. Werkbladen groep 3 worden zo een compleet rekenpakket. Oefenbladen gratis voor het hele rekencurriculum zijn beschikbaar.`,
        quote: 'Groot-klein werkbladen passen perfect bij onze rekenmethode.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders - Veilig Leren Lezen en Letters Leren met Werkbladen Kleuters',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Thuisonderwijzende ouders waarderen de eenvoud van de generator. Geen ontwerpvaardigheden nodig voor professionele werkbladen kleuters. Maak materiaal dat aansluit bij veilig leren lezen methodes thuis. Kinderen krijgen dezelfde kwaliteit als op school.

De flexibiliteit past bij individueel onderwijs. Pas moeilijkheidsgraad aan per kind. Gebruik eigen foto's voor gepersonaliseerde oefenbladen gratis. Motiveer kinderen met bekende afbeeldingen uit hun omgeving.

Letters leren en schrijven oefenen combineren goed met groot-klein. Vergelijk grote en kleine letters visueel. Fijne motoriek ontwikkeling is cruciaal voor thuisonderwijs. De commerciële licentie maakt doorverkopen mogelijk voor extra inkomen.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'NT2-Docenten en Taalonderwijs - Veilig Leren Lezen in 11 Talen met Kleurplaten',
        subtitle: 'Letters leren en schrijven oefenen',
        description: `NT2-docenten profiteren van de meertalige ondersteuning. De generator toont afbeeldingsnamen in 11 talen. Dit ondersteunt veilig leren lezen voor anderstalige kinderen. Woordenschat groeit tijdens de groot-klein activiteit.

Kleurplaten met benoemde objecten versterken taalverwerving. Kinderen leren Nederlandse woorden bij elke afbeelding. Letters leren gebeurt in context van betekenisvolle beelden. De visuele ondersteuning is essentieel voor taalleerders.

Internationale scholen gebruiken de taalopties voor meertalig onderwijs. Werkbladen kleuters in de moedertaal ondersteunen de overgang. Oefenbladen gratis in meerdere talen zijn moeilijk te vinden elders. Schrijven oefenen wordt gekoppeld aan woordherkenning.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '5',
        icon: '🎓',
        title: 'Speciaal Onderwijs - Fijne Motoriek en Sommen tot 20 met Werkbladen Groep 3',
        subtitle: 'Fijne motoriek en speciaal onderwijs',
        description: `Leerkrachten in het speciaal onderwijs waarderen de aanpasbaarheid. Vergroot afbeeldingen voor kinderen met visuele beperkingen. Vereenvoudig oefeningen tot 2 afbeeldingen per opdracht. Fijne motoriek oefeningen kunnen individueel worden afgestemd.

Werkbladen groep 3 op aangepast niveau ondersteunen inclusief onderwijs. Sommen tot 20 voorbereiding gaat in eigen tempo. De herhaling van groot-klein concepten versterkt het leren. Oefenbladen gratis met antwoordbladen helpen bij zelfcorrectie.

Kleurplaten bieden rustige verwerkingstijd na de cognitieve taak. Werkbladen kleuters met grote afbeeldingen zijn minder overweldigend. Tafels oefenen voorbereiding kan visueel beginnen. De generator ondersteunt gedifferentieerd onderwijs volledig.`,
        quote: 'Perfecte ondersteuning voor mijn leerlingen met speciale behoeften.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Docent-Ondernemers - Rekenen Werkbladen en Kleurplaten Verkopen met Commerciële Licentie',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Docent-ondernemers verdienen met zelfgemaakte werkbladen. De commerciële licentie in Volledige Toegang maakt verkoop legaal. Verkoop rekenen werkbladen op Teachers Pay Teachers. Kleurplaten en werkbladen groep 3 zijn populaire producten.

Maak complete lespakketten met groot-klein thema's. Combineer met sommen tot 20 werkbladen voor waardetoevoeging. Seizoensgebonden oefenbladen gratis voor jezelf, premium voor verkoop. De 300 DPI kwaliteit voldoet aan professionele standaarden.

Etsy winkels floreren met educatieve printables. Tafels oefenen voorbereidende materialen zijn gewild. Werkbladen kleuters in thematische bundels verkopen goed. Het Volledige Toegang abonnement van 240 euro per jaar verdient zichzelf terug.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from big-small.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Groot en Klein Werkbladen - Oefenbladen Gratis FAQ',
    sectionDescription: 'Hieronder beantwoorden we de meest gestelde vragen over de Groot en Klein werkbladgenerator. Van technische vragen over werkbladen groep 3 tot pedagogische toepassingen. Vind antwoorden over tafels oefenen, veilig leren lezen en meer.',
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
        question: 'Welke Leeftijden Zijn Geschikt voor Werkbladen Kleuters met Fijne Motoriek Oefeningen?',
        answer: 'Groot en klein werkbladen zijn ontworpen voor kinderen van 4 tot 8 jaar. Werkbladen kleuters passen bij groep 1 en 2 in het Nederlandse systeem. Fijne motoriek oefeningen met omcirkelen zijn geschikt vanaf 4 jaar. De nummer 1-2-3 oefeningen passen bij groep 3 leerlingen van 6 tot 7 jaar. De moeilijkheidsgraad is aanpasbaar voor elke leeftijd. Gebruik 2 afbeeldingen voor jongere kinderen. Kies 3 afbeeldingen met de middelste optie voor oudere leerlingen. Grotere afbeeldingen maken werkbladen toegankelijker voor beginners.',
      },
      {
        id: '2',
        question: 'Hoe Ondersteunt de Generator Tafels Oefenen en Sommen tot 20 Voorbereiding?',
        answer: 'De ordening van klein naar groot oefent sequentiële vaardigheden. Dit is fundamenteel voor begrip van getallenrijen bij tafels oefenen. Kinderen leren dat getallen een volgorde hebben. Sommen tot 20 worden makkelijker door visuele ordeningservaring. De nummer 1-2-3 oefeningen zijn directe voorbereiding. Kinderen schrijven cijfers bij objecten in volgorde. Dit combineert schrijven oefenen met wiskundig denken. Rekenen werkbladen profiteren van deze visuele basis.',
      },
      {
        id: '3',
        question: 'Kan Ik Werkbladen Groep 3 Combineren met Veilig Leren Lezen Methodes?',
        answer: 'Ja, groot en klein werkbladen ondersteunen veilig leren lezen uitstekend. De afbeeldingenbibliotheek toont namen bij elke afbeelding. Kinderen leren woorden herkennen tijdens de activiteit. Letters leren wordt versterkt door visuele woordassociaties. Werkbladen groep 3 kunnen instructieteksten bevatten. Voeg leesopdrachten toe bovenaan het werkblad. Combineer met kleurplaten voor langere leesactiviteiten. De meertalige ondersteuning helpt bij anderstalige leerlingen.',
      },
      {
        id: '4',
        question: 'Zijn er Oefenbladen Gratis Beschikbaar voor Tafels Oefenen Voorbereiding?',
        answer: 'Met je Volledige Toegang abonnement maak je onbeperkt oefenbladen gratis. Er zijn geen extra kosten per werkblad of download. Tafels oefenen voorbereidend materiaal is inbegrepen in je abonnement. De commerciële licentie maakt verkopen ook mogelijk. Het abonnement kost 240 euro per jaar of 25 euro per maand. Voor dit bedrag heb je toegang tot 33 generators. Oefenbladen gratis voor het hele schooljaar zijn dan beschikbaar. Geen verborgen kosten of limieten op downloads.',
      },
      {
        id: '5',
        question: 'Hoe Werkt Letters Leren met Groot en Klein Werkbladen en Schrijven Oefenen?',
        answer: 'De afbeeldingenbibliotheek bevat alfabetthema\'s met lettervormen. Kinderen vergelijken grote en kleine letters visueel. Dit ondersteunt letters leren door vormherkenning. Schrijven oefenen combineert met de omcirkelopdrachten. Voeg tekst toe aan werkbladen met letterinstructies. Kies kindvriendelijke lettertypen voor leesbaarheid. De combinatie van visueel vergelijken en schrijven oefenen is krachtig. Werkbladen kleuters met letters bereiden voor op formeel schrijfonderwijs.',
      },
      {
        id: '6',
        question: 'Welke Kleurplaten en Rekenen Werkbladen Kan Ik Maken met de Generator?',
        answer: 'De Groot en Klein generator focust op groottevergelijking. Kleurplaten ontstaan door de grijstintenoptie te gebruiken. Download in zwart-wit voor inkleuractiviteiten. Rekenen werkbladen met ordening ondersteunen wiskundevoorbereiding. Combineer met andere generators voor complete lespakketten. De optellen generator maakt sommen tot 20 werkbladen. Tafels oefenen materiaal komt uit de vermenigvuldigingsgenerator. Kleurplaten uit de teken- en kleurgenerator vullen aan.',
      },
      {
        id: '7',
        question: 'Is de Generator Geschikt voor Veilig Leren Lezen en Fijne Motoriek bij Speciaal Onderwijs?',
        answer: 'Absoluut. De aanpasbaarheid maakt de generator perfect voor speciaal onderwijs. Vergroot afbeeldingen voor kinderen met visuele beperkingen. Veilig leren lezen gaat in aangepast tempo met individuele werkbladen. Fijne motoriek oefeningen kunnen vereenvoudigd worden. Gebruik grote omcirkelruimtes voor motorische uitdagingen. Werkbladen kleuters op aangepast niveau ondersteunen inclusief onderwijs. Antwoordbladen helpen bij zelfcorrectie en zelfstandig werken.',
      },
      {
        id: '8',
        question: 'Hoe Download Ik Werkbladen Groep 3 met Tafels Oefenen Kwaliteit?',
        answer: 'Klik op de downloadknop na het genereren van je werkblad. Kies JPEG voor digitaal gebruik of PDF voor printen. Werkbladen groep 3 downloaden in 300 DPI voor professionele kwaliteit. Tafels oefenen materiaal ziet er scherp uit op elke printer. De grijstintenoptie bespaart inkt bij grote aantallen. Download werkblad en antwoordblad apart. Oefenbladen gratis downloaden is onbeperkt met je abonnement. Bewaar digitale kopies voor hergebruik in volgende schooljaren.',
      },
      {
        id: '9',
        question: 'Welke Talen Ondersteunt de Generator voor Sommen tot 20 en Letters Leren?',
        answer: 'De generator ondersteunt 11 talen voor de interface. Nederlands, Engels, Duits, Frans, Spaans, Portugees, Italiaans, Zweeds, Deens, Noors en Fins. De afbeeldingenbibliotheek toont namen in de geselecteerde taal. Sommen tot 20 voorbereiding werkt in elke taal met universele cijfers. Letters leren kan in meerdere alfabetten met de juiste afbeeldingen. Internationale scholen en NT2-klassen profiteren van de meertaligheid. Veilig leren lezen methodes zijn taalspecifiek ondersteund.',
      },
      {
        id: '10',
        question: 'Wat Kost een Volledige Toegang Abonnement voor Groot en Klein Werkbladen?',
        answer: 'Volledige Toegang kost 240 euro per jaar of 25 euro per maand. Dit geeft toegang tot alle 33 werkbladgeneratoren op het platform. Groot en Klein is een van de 23 apps exclusief voor Volledige Toegang. De Core Bundle van 144 euro bevat 10 populaire apps. Voor Groot en Klein werkbladen kleuters heb je Volledige Toegang nodig. De meerprijs van 96 euro per jaar ontsluit 23 extra generators. Tafels oefenen, sommen tot 20 en meer zijn dan beschikbaar. Beide abonnementen bevatten onbeperkte werkbladcreatie en commerciële licentie.',
      },
    ],
  },

  // Pricing - Full Access pricing (Big Small is Full Access only)
  pricing: {
    title: 'Volledige Toegang',
    price: '€240',
    priceInterval: '/jaar',
    priceSuffix: 'Jaarlijks gefactureerd',
    benefits: [
      'Toegang tot alle 33 generators',
      'Groot en Klein werkbladen inbegrepen',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
    ],
    ctaText: 'Nu Starten',
    bundleDescription: 'Uw abonnement geeft toegang tot alle 33 werkbladgeneratoren',
    bundleApps: [],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Groot en Klein met Andere Generators - Rekenen Werkbladen en Kleurplaten Platform',
    sectionDescription: 'Het LessonCraftStudio platform biedt 33 werkbladgeneratoren. Groot en Klein combineert perfect met andere apps voor complete lespakketten. Van rekenen werkbladen tot kleurplaten en taalactiviteiten. Hieronder beschrijven we de beste combinaties voor werkbladen kleuters en werkbladen groep 3.',
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
        description: 'Combineer groot-klein werkbladen met optelwerkbladen voor visuele sommen tot 20 voorbereiding.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide groot-klein werkbladen met thematische kleurplaten voor fijne motoriek.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Matching',
        category: 'Visueel',
        icon: '🔗',
        description: 'Versterk visuele discriminatie door matching te combineren met groottevergelijking.',
      },
      {
        id: '4',
        slug: 'pattern-train',
        name: 'Patroontrein',
        category: 'Logica',
        icon: '🚂',
        description: 'Oefen sequenties en patronen als aanvulling op groot-klein ordening.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast groottevergelijking.',
      },
      {
        id: '6',
        slug: 'chart-count-color',
        name: 'Tellen en Kleuren',
        category: 'Rekenen',
        icon: '📊',
        description: 'Combineer groot-klein met grafiekvaardigheden voor visuele rekenlessen.',
      },
    ],
  },
};

export default bigSmallNlContent;
