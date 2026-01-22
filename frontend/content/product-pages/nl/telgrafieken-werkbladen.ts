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
    title: 'Telgrafieken Werkbladen Maker - Gratis Oefenbladen voor Rekenen en Tellen in Groep 3',
    description: 'Maak professionele telgrafieken werkbladen met onze werkbladen generator. Met je Volledige Toegang abonnement maak je onbeperkt werkbladen zonder extra kosten per werkblad. Deze tool is ideaal voor rekenen werkbladen waarbij kinderen leren tellen en gegevens visualiseren.',
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
    sectionTitle: 'Telgrafieken Werkbladen Voorbeelden - Gratis Werkbladen voor Kinderen',
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
        worksheetSrc: '/samples/dutch/chart-count/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/chart-count/sample-1-answer.jpeg',
        altText: 'Telgrafieken werkblad met plaatjes voor werkbladen groep 3 en werkbladen kleuters',
        pdfDownloadUrl: '/samples/dutch/chart-count/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/dutch/chart-count/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/chart-count/sample-2-answer.jpeg',
        altText: 'Gratis telgrafieken werkblad voor kinderen - rekenen werkbladen met sommen tot 20',
        pdfDownloadUrl: '/samples/dutch/chart-count/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/dutch/chart-count/sample-3.jpeg',
        answerKeySrc: '/samples/dutch/chart-count/sample-3-answer.jpeg',
        altText: 'Gratis werkblad voor kleuters - telgrafieken met oefenbladen gratis',
        pdfDownloadUrl: '/samples/dutch/chart-count/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/dutch/chart-count/sample-4.jpeg',
        answerKeySrc: '/samples/dutch/chart-count/sample-4-answer.jpeg',
        altText: 'Werkbladen groep 3 - gratis printables met rekenen werkbladen',
        pdfDownloadUrl: '/samples/dutch/chart-count/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from chart-count.md feature sections
  features: {
    sectionTitle: 'Functies van de Telgrafieken Generator - Alles voor Rekenen Werkbladen en Oefenbladen Gratis',
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
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Werkbladen Maken in 3 Klikken - Rekenen Werkbladen voor Werkbladen Kleuters en Groep 1 2',
        description: `Het maken van telgrafieken werkbladen is eenvoudig. Kies een thema uit de bibliotheek met meer dan 3000 afbeeldingen. Selecteer hoeveel plaatjes je wilt gebruiken voor je rekenen werkbladen. Klik op genereren en je werkblad verschijnt direct op het scherm.

De generator kiest automatisch willekeurige aantallen voor elk plaatje. Dit maakt elke keer unieke werkbladen kleuters en werkbladen groep 3 mogelijk. Kinderen tellen de plaatjes en vullen de grafiek in. Perfect voor sommen tot 20 oefeningen in groep 1 2.

Je bespaart uren werk met deze aanpak. Geen handmatig tekenen of zoeken naar clipart. Alles zit in één tool, klaar voor gebruik. Leerkrachten maken in 3 minuten wat vroeger 30 minuten kostte.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Alles Aanpassen op het Canvas - Fijne Motoriek en Letters Leren Werkbladen Bewerken',
        description: `Elk element op je werkblad is volledig bewerkbaar. Sleep afbeeldingen naar een andere positie. Draai plaatjes of maak ze groter of kleiner. Verwijder elementen die je niet nodig hebt.

Deze flexibiliteit is ideaal voor fijne motoriek werkbladen. Voeg extra ruimte toe zodat kinderen kunnen kleuren. Plaats tekstvelden voor letters leren en schrijven oefenen. Combineer telgrafieken met andere activiteiten op één pagina.

De bewerkingsfuncties werken intuïtief. Selecteer een object en gebruik de handvatten om te schalen. Rechtermuisklik biedt opties voor lagen en uitlijning. Alles wat je verwacht van professionele ontwerpsoftware.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden voor Rekenen Werkbladen - Werkbladen Groep 3 Personaliseren',
        description: `Upload je eigen foto's en afbeeldingen naar de generator. Gebruik klasfoto's voor gepersonaliseerde werkbladen groep 3. Voeg schoollogo's toe aan je rekenen werkbladen. Combineer eigen afbeeldingen met de ingebouwde bibliotheek.

De upload functie accepteert JPEG, PNG en GIF bestanden. Upload meerdere bestanden tegelijk voor efficiënt werken. Je afbeeldingen blijven beschikbaar tijdens je sessie. Maak werkbladen met foto's van klassenuitjes of schoolprojecten.

Personalisatie verhoogt de betrokkenheid van leerlingen. Kinderen herkennen bekende gezichten en plekken. Dit maakt rekenen werkbladen extra motiverend. Perfect voor speciale gelegenheden en thematische weken.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Talen Ondersteuning - Oefenbladen Gratis voor Veilig Leren Lezen in Elke Taal',
        description: `De telgrafieken generator werkt in 11 talen. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Schakel tussen talen met één klik in het menu.

Dit is waardevol voor internationale scholen. Maak oefenbladen gratis in de moedertaal van elk kind. Ondersteun veilig leren lezen programma's in meerdere talen. De interface past zich automatisch aan de gekozen taal aan.

Afbeeldingsnamen worden vertaald per taal. Dit helpt bij woordenschat ontwikkeling. Kinderen leren nieuwe woorden terwijl ze tellen. Taal en rekenen komen samen in één activiteit.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie voor Kleurplaten en Rekenen Werkbladen - Verkopen op Teachers Pay Teachers',
        description: `Je Volledige Toegang abonnement bevat een volledige commerciële licentie. Verkoop je werkbladen op Teachers Pay Teachers. Start een Etsy winkel met printbare kleurplaten en rekenen werkbladen. Publiceer op Amazon KDP zonder extra licentiekosten.

De 300 DPI exportkwaliteit is geschikt voor professioneel drukwerk. Geen watermerk op je downloads. Geen naamsvermelding vereist. Jouw werkbladen, jouw merk, jouw inkomsten.

Docenten verdienen tussen €500 en €5000 per maand met digitale producten. De telgrafieken generator maakt dit toegankelijk voor iedereen. Maak unieke werkpakketten en bouw een passief inkomen op.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Meer dan 3000 Afbeeldingen - Werkbladen Kleuters met Kleurplaten en Tafels Oefenen Materiaal',
        description: `De afbeeldingenbibliotheek bevat meer dan 3000 kindvriendelijke plaatjes. Thema's variëren van dieren tot voertuigen, seizoenen tot beroepen. Zoek afbeeldingen op naam of blader door categorieën.

Elke afbeelding is geschikt voor werkbladen kleuters en oudere kinderen. De stijl is consistent en professioneel. Combineer plaatjes voor kleurplaten of tafels oefenen werkbladen. Achtergronden en randen zijn ook inbegrepen.

De bibliotheek wordt regelmatig uitgebreid. Nieuwe thema's volgen het schooljaar. Van Sinterklaas tot Pasen, er is altijd passend materiaal. Alles inbegrepen in je abonnement, zonder extra kosten.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit - Sommen tot 20 Werkbladen en Letters Leren Materiaal Exporteren',
        description: `Exporteer je werkbladen als PDF of JPEG in 300 DPI. Dit is de standaard voor professioneel drukwerk. Je werkbladen zien er perfect uit op elke printer. Geen wazige lijnen of korrelige afbeeldingen.

De PDF export is ideaal voor sommen tot 20 werkbladen. Print thuis of op school in hoge kwaliteit. De JPEG optie werkt goed voor digitaal gebruik. Deel werkbladen via e-mail of leerlingportalen.

Een grijswaarden optie bespaart inkt bij het printen. Converteer kleurrijke letters leren werkbladen naar zwart-wit. Kinderen kunnen zelf kleuren terwijl ze oefenen. Praktisch en kostenefficiënt voor dagelijks gebruik.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '✅',
        title: 'Antwoordblad Genereren voor Rekenen Werkbladen - Werkbladen Groep 3 met Correctiesleutel',
        description: `Genereer automatisch een antwoordblad bij elk werkblad. De correctiesleutel toont alle juiste antwoorden. Dit bespaart nakijktijd voor rekenen werkbladen. Leerlingen kunnen ook zelf controleren.

Het antwoordblad volgt dezelfde lay-out als het werkblad. Download beide als PDF in één handeling. Perfect voor werkbladen groep 3 waar differentiatie belangrijk is. Snellere leerlingen kunnen direct verder.

De antwoordblad functie werkt voor alle werkbladtypes. Van eenvoudige telgrafieken tot complexe grafieken. Alles wat je genereert krijgt een bijpassende oplossing. Efficiënt werken met minimale voorbereiding.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from chart-count.md step sections
  howTo: {
    sectionTitle: 'Telgrafieken Werkbladen Maken in 5 Stappen - Oefenbladen Gratis voor Rekenen Werkbladen',
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
    sectionTitle: 'Wie Gebruikt Telgrafieken Werkbladen - Rekenen Werkbladen voor Elke Onderwijssituatie',
    sectionDescription: 'Telgrafieken werkbladen zijn waardevol voor verschillende onderwijsprofessionals. Van leerkrachten groep 1 2 tot thuisonderwijzers, iedereen vindt passend materiaal. De generator past zich aan elk niveau aan. Ontdek hoe rekenen werkbladen jouw onderwijs versterken.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 en Werkbladen Kleuters - Kleurplaten en Sommen tot 20 voor de Jongsten',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Leerkrachten in groep 1 en 2 gebruiken telgrafieken dagelijks. Werkbladen kleuters zijn perfect voor eerste rekenactiviteiten. Kinderen leren tellen door plaatjes te groeperen. De visuele aanpak sluit aan bij hun ontwikkelingsfase.

Combineer telgrafieken met kleurplaten voor gevarieerde lessen. Kinderen tellen eerst en kleuren daarna de grafiek in. Dit houdt ze langer geconcentreerd bezig. Sommen tot 20 worden spelenderwijs geoefend.

De generator biedt thema's die aansluiten bij kleuteractiviteiten. Dieren, seizoenen en feestdagen zijn populair. Personaliseer werkbladen met klasfoto's voor extra betrokkenheid. Elk kind herkent zichzelf op het werkblad.`,
        quote: 'Mijn kleuters vinden de kleurrijke telgrafieken geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Werkbladen Groep 3 en Groep 4 - Rekenen Werkbladen voor Fijne Motoriek en Tafels Oefenen',
        subtitle: 'Werkbladen groep 3 en logisch denken',
        description: `In groep 3 en 4 worden telgrafieken complexer. Werkbladen groep 3 bevatten meer categorieën en hogere aantallen. Kinderen ontwikkelen hun fijne motoriek door nauwkeurig te tellen en te kleuren. De grafieken worden groter en gedetailleerder.

Rekenen werkbladen ondersteunen het formele rekenonderwijs. Kinderen leren gegevens interpreteren en weergeven. Dit is voorbereidend voor statistiek in hogere groepen. Telgrafieken leggen de basis voor tafels oefenen later.

Leerkrachten waarderen de differentiatiemogelijkheden. Genereer eenvoudige versies voor zwakkere rekenaars. Maak uitdagende varianten voor snelle leerlingen. Dezelfde tool, verschillende niveaus.`,
        quote: 'Telgrafieken passen perfect bij ons rekencurriculum.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders met Oefenbladen Gratis - Letters Leren en Rekenen Werkbladen Thuis',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Thuisonderwijzers profiteren enorm van de telgrafieken generator. Oefenbladen gratis downloaden met je abonnement bespaart tijd. Geen eindeloos zoeken naar geschikte werkbladen. Alles in één tool, direct klaar.

Combineer rekenen met letters leren voor geïntegreerde lessen. Voeg woordlabels toe bij de plaatjes in de grafiek. Kinderen leren nieuwe woorden terwijl ze tellen. Multidisciplinair onderwijs in één activiteit.

De flexibiliteit past bij thuisonderwijs. Werk in je eigen tempo en volg de interesses van je kind. Maak werkbladen over dinosaurussen als dat het thema is. Personaliseer alles voor maximale motivatie.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'NT2 Docenten en Veilig Leren Lezen - Werkbladen Kleuters voor Taalverwerving',
        subtitle: 'Werkbladen groep 3 voor NT2',
        description: `Docenten Nederlands als tweede taal gebruiken telgrafieken voor woordenschat. Werkbladen kleuters met plaatjes ondersteunen visueel leren. Kinderen leren Nederlandse woorden bij concrete afbeeldingen. Tellen wordt een taalactiviteit.

De 11-talige ondersteuning is uniek waardevol. Maak werkbladen in de moedertaal voor vergelijking. Schakel naar Nederlands voor immersie-onderwijs. Veilig leren lezen wordt ondersteund door visuele context.

Internationale scholen gebruiken de generator voor meertalig onderwijs. Dezelfde grafiek in verschillende talen vergelijkt vocabulaire. Kinderen zien overeenkomsten en verschillen tussen talen. Rekenen wordt een brug naar taalvaardigheid.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Speciaal Onderwijs met Fijne Motoriek Werkbladen - Sommen tot 20 en Schrijven Oefenen Aangepast',
        subtitle: 'Aangepaste werkbladen voor speciaal onderwijs',
        description: `In het speciaal onderwijs zijn aanpasbare werkbladen essentieel. Fijne motoriek werkbladen kunnen vereenvoudigd worden. Gebruik grotere afbeeldingen en minder categorieën. Pas de moeilijkheidsgraad aan individuele behoeften aan.

Sommen tot 20 blijven beheersbaar met visuele ondersteuning. Kinderen tellen concrete plaatjes in plaats van abstracte cijfers. De grafiekstructuur biedt houvast en voorspelbaarheid. Routine-activiteiten verminderen stress.

Voeg schrijven oefenen toe met dikke lijnen en grote vakken. De bewerkingsfuncties maken elk werkblad toegankelijk. Vergroot tekst voor slechtziende leerlingen. Creëer consistente lay-outs die vertrouwen geven.`,
        quote: 'De aanpasbaarheid maakt deze tool onmisbaar voor mijn leerlingen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Ondernemende Docenten met Kleurplaten en Rekenen Werkbladen - Verkopen op Teachers Pay Teachers',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Creatieve docenten verkopen hun werkbladen online. Kleurplaten en rekenen werkbladen zijn populaire producten. De commerciële licentie maakt dit legaal mogelijk. Geen extra kosten boven je Volledige Toegang abonnement.

Teachers Pay Teachers is het grootste platform voor educatieve materialen. Nederlandse docenten verkopen ook op Juf-Juul en andere platforms. De 300 DPI kwaliteit voldoet aan professionele standaarden. Jouw werkbladen concurreren met uitgeverijen.

Bouw een passief inkomen met telgrafiekenpakketten. Maak thematische bundels voor seizoenen en feestdagen. Combineer met andere werkbladtypes voor complete curriculum-pakketten. Ondernemerschap naast je onderwijsbaan.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from chart-count.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Telgrafieken Werkbladen - Oefenbladen Gratis en Rekenen Werkbladen FAQ',
    sectionDescription: 'Hieronder beantwoorden we de meestgestelde vragen over de telgrafieken generator. Van abonnementskosten tot printmogelijkheden, alles wordt behandeld. Oefenbladen gratis downloaden met je abonnement is eenvoudiger dan je denkt. Lees verder voor complete informatie over rekenen werkbladen.',
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
        question: 'Is de Telgrafieken Generator Echt Gratis voor Sommen tot 20 Werkbladen?',
        answer: 'De telgrafieken werkbladen generator vereist een Volledige Toegang abonnement van €240 per jaar of €25 per maand. Met je abonnement maak je onbeperkt sommen tot 20 werkbladen zonder extra kosten per werkblad. Genereer zoveel telgrafieken als je nodig hebt zonder aanvullende kosten. Het Basispakket abonnement kost €144 per jaar en bevat 10 populaire werkbladgeneratoren. Het Volledige Toegang abonnement kost €240 per jaar en bevat alle 33 werkbladtypes inclusief telgrafieken. Beide abonnementen bevatten commerciële licentie, 11 talen ondersteuning en professionele 300 DPI exports.',
      },
      {
        id: '2',
        question: 'Kan Ik Kleurplaten en Telgrafieken Thuis Printen op een Gewone Printer?',
        answer: 'Ja, alle werkbladen zijn geoptimaliseerd voor thuisprinten. Kleurplaten en telgrafieken exporteren in 300 DPI voor scherpe resultaten. Standaard inkjetprinters produceren professionele kwaliteit. Geen speciale apparatuur nodig. De PDF-export is gekalibreerd voor A4 en Letter formaten. Jouw printer produceert exact wat je op scherm ziet. De grijswaarden optie bespaart inkt bij frequente prints. Kinderen kunnen zwart-wit werkbladen zelf inkleuren.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Fijne Motoriek Werkbladen?',
        answer: 'Nee, de generator doet al het ontwerpwerk. Fijne motoriek werkbladen zijn met drie klikken gemaakt. Kies een thema, genereer, download. Geen grafische kennis vereist. De bewerkingsfuncties zijn intuïtief voor iedereen. Sleep-en-neerzet werkt zoals je verwacht. Selecteer objecten en gebruik handvatten om te schalen. Alles is visueel en direct zichtbaar op het canvas.',
      },
      {
        id: '4',
        question: 'Mag Ik Werkbladen Kleuters Gebruiken in Mijn Klas met Leerlingen?',
        answer: 'Ja, je Volledige Toegang abonnement bevat onbeperkt klasgebruik. Werkbladen kleuters mogen geprint en gekopieerd worden voor al je leerlingen. Geen limiet op het aantal kopieën per werkblad. Print werkbladen voor de hele school als je wilt. Deel digitale versies via leerlingportalen. Gebruik werkbladen voor huiswerk, toetsen en extra oefening. Alles inbegrepen in je abonnement.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Veilig Leren Lezen Werkbladen Beschikbaar?',
        answer: 'De generator ondersteunt 11 talen volledig. Veilig leren lezen werkbladen zijn beschikbaar in Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Schakel tussen talen met één klik in het instellingenmenu. De interface en afbeeldingsnamen passen zich aan. Maak meertalige werkbladen voor internationale klassen. Perfect voor NT2-onderwijs en tweetalige scholen.',
      },
      {
        id: '6',
        question: 'Kan Ik Oefenbladen Gratis Verkopen die Ik Maak met Deze Generator?',
        answer: 'Ja, je Volledige Toegang abonnement bevat volledige commerciële print-on-demand licentie. Verkoop je oefenbladen zonder extra kosten of royalty\'s. Geen naamsvermelding vereist op je producten. Verkoop op Teachers Pay Teachers, Etsy, Amazon KDP en andere platforms. De 300 DPI kwaliteit voldoet aan professionele standaarden. Bouw een passief inkomen met telgrafiekenpakketten. Jouw creaties, jouw winst.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Tafels Oefenen Werkbladen Aan voor Mijn Leerlingen?',
        answer: 'Na het genereren kun je elk element aanpassen op het canvas. Tafels oefenen werkbladen kunnen vereenvoudigd of uitgebreid worden. Sleep afbeeldingen naar nieuwe posities. Schaal objecten groter of kleiner. Voeg tekstelementen toe voor aangepaste instructies. Wijzig kleuren en lettertypen naar wens. Plaats extra afbeeldingen uit de bibliotheek. Combineer verschillende elementen voor unieke werkbladen.',
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijdsgroepen Werken Rekenen Werkbladen het Beste?',
        answer: 'Telgrafieken rekenen werkbladen zijn ideaal voor kinderen van 4 tot 9 jaar. Kleuters beginnen met eenvoudige grafieken met 2-3 categorieën. Groep 3 en 4 werken met complexere versies. Pas de moeilijkheidsgraad aan per leeftijdsgroep. Minder afbeeldingen voor jongere kinderen. Hogere aantallen voor oudere leerlingen. De generator past zich aan elk niveau aan.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Letters Leren Werkbladen?',
        answer: 'Ja, de upload functie accepteert JPEG, PNG en GIF bestanden. Voeg eigen foto\'s toe aan letters leren werkbladen. Upload klasfoto\'s voor gepersonaliseerde activiteiten. Combineer eigen afbeeldingen met de bibliotheek van 3000+ plaatjes. Je uploads blijven beschikbaar tijdens je sessie. Maak unieke werkbladen met schoolfoto\'s en thematische afbeeldingen.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om Sommen tot 20 Werkbladen te Maken?',
        answer: 'Een compleet sommen tot 20 werkblad maak je in minder dan 3 minuten. Kies een thema, klik op genereren, download als PDF. Sneller dan koffie halen. Met aanpassingen duurt het iets langer. Tekst toevoegen, kleuren wijzigen, extra afbeeldingen plaatsen. Maximaal 5-10 minuten voor volledig gepersonaliseerde werkbladen. Veel sneller dan handmatig ontwerpen.',
      },
      {
        id: '11',
        question: 'Bevatten Telgrafieken Werkbladen een Antwoordblad voor Tafels Oefenen?',
        answer: 'Ja, de generator maakt automatisch een antwoordblad bij elk werkblad. De correctiesleutel toont alle juiste antwoorden. Ideaal voor tafels oefenen werkbladen waar snelle controle belangrijk is. Download werkblad en antwoordblad als aparte PDFs. Beide delen dezelfde lay-out voor eenvoudige vergelijking. Leerlingen kunnen zelf nakijken. Leerkrachten besparen correctietijd.',
      },
      {
        id: '12',
        question: 'Kan Ik Veilig Leren Lezen Combineren met Fijne Motoriek Activiteiten?',
        answer: 'Absoluut, de generator ondersteunt multidisciplinaire werkbladen. Combineer veilig leren lezen plaatjes met fijne motoriek oefeningen. Voeg schrijflijnen toe onder telgrafieken. Kinderen tellen afbeeldingen en schrijven de woorden. Visuele herkenning ondersteunt woordenschat. Telactiviteiten ontwikkelen pencontrole. Eén werkblad, meerdere leerdoelen.',
      },
    ],
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
    sectionTitle: 'Combineer Telgrafieken met Andere Werkbladen - Tafels Oefenen en Veilig Leren Lezen Compleet Pakket',
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
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Optellen',
        category: 'Rekenen',
        icon: '➕',
        description: 'Combineer telgrafieken met optelwerkbladen voor complete rekenlessen met visuele plaatjes.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide telgrafieken met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '3',
        slug: 'matching-app',
        name: 'Verbinden',
        category: 'Logica',
        icon: '🔗',
        description: 'Combineer met verbindingswerkbladen voor patroonherkenning en visuele vaardigheden.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Rekenen',
        icon: '🔢',
        description: 'Vul telgrafieken aan met Zoek en Tel voor extra telvaardigheden en visuele concentratie.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast telgrafieken.',
      },
      {
        id: '6',
        slug: 'picture-bingo',
        name: 'Plaatjes Bingo',
        category: 'Logica',
        icon: '🎯',
        description: 'Combineer met Plaatjes Bingo voor extra visuele herkenning en groepsactiviteiten.',
      },
    ],
  },
};

export default chartCountNlContent;
