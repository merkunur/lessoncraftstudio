import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Image Crossword Worksheets - Dutch Content (Kruiswoordpuzzel Werkbladen)
 *
 * File: frontend/content/product-pages/nl/kruiswoordpuzzel-werkbladen.ts
 * URL: /nl/apps/kruiswoordpuzzel-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/crossword.md
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

export const imageCrosswordNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'kruiswoordpuzzel-werkbladen',
    appId: 'crossword',
    title: 'Kruiswoordpuzzel Werkbladen - Oefenbladen Gratis voor Werkbladen Groep 3 en Kleuters',
    description: 'Maak professionele kruiswoordpuzzel werkbladen met afbeeldingen voor groep 1-3. Met uw Volledige Toegang abonnement creëert u onbeperkt kleurplaten en oefenbladen zonder extra kosten per werkblad. Download hoogwaardige PDF-bestanden in minder dan 3 minuten.',
    keywords: 'kruiswoordpuzzel werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, letters leren, schrijven oefenen, veilig leren lezen, fijne motoriek, kleurplaten, rekenen werkbladen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/kruiswoordpuzzel-werkbladen',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/crossword/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkblad kruiswoordpuzzel - werkbladen groep 3 voor letters leren',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/crossword/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis werkbladen kruiswoordpuzzel - werkblad voor kleuters met afbeeldingen',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/crossword/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Werkblad voor kinderen - kruiswoordpuzzel met plaatjes voor groep 1 2',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/dutch/crossword/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis printables kruiswoordpuzzel - oefenbladen voor veilig leren lezen',
      },
    ],
  },

  // Hero Section - FULL text from crossword.md paragraphs 1-4
  hero: {
    title: 'Kruiswoordpuzzel Werkbladen',
    subtitle: 'Oefenbladen Gratis voor Werkbladen Groep 3 en Kleuters',
    description: `Maak professionele kruiswoordpuzzel werkbladen met afbeeldingen voor groep 1-3. Met uw Volledige Toegang abonnement creëert u onbeperkt kleurplaten en oefenbladen zonder extra kosten per werkblad. Genereer gepersonaliseerde kruiswoordpuzzels voor letters leren en rekenen werkbladen. Download hoogwaardige PDF-bestanden in minder dan 3 minuten.

Onze kruiswoordpuzzel generator combineert beelden met woordenschat oefening. Perfect voor werkbladen kleuters en werkbladen groep 3 die schrijven oefenen en letters leren. Elk werkblad ondersteunt fijne motoriek ontwikkeling terwijl kinderen puzzels oplossen. Ideaal voor veilig leren lezen en tafels oefenen met visuele ondersteuning.

De tool gebruikt een bibliotheek van meer dan 3000 kindvriendelijke afbeeldingen. Selecteer thema's voor sommen tot 20 of kies individuele plaatjes. Upload uw eigen foto's voor gepersonaliseerde werkbladen groep 1 2 materiaal. Combineer kleurplaten elementen met educatieve puzzel uitdagingen voor complete lespakketten.

Volledige Toegang abonnement kost €240 per jaar of €25 per maand. Onbeperkt werkbladen maken voor alle 33 generatoren op het platform. Commerciële licentie inbegrepen voor verkoop op Teachers Pay Teachers of Etsy. Professionele 300 DPI kwaliteit voor printen en doorverkoop zonder extra kosten.`,
    previewImageSrc: '/samples/dutch/crossword/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/dutch/crossword/
  samples: {
    sectionTitle: 'Gratis Werkblad Kruiswoordpuzzel Voorbeelden',
    sectionDescription: 'Download gratis werkbladen om onze professionele kwaliteit te ervaren - werkblad voor kinderen en werkblad voor kleuters',
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
        worksheetSrc: '/samples/dutch/crossword/sample-1.jpeg',
        answerKeySrc: '/samples/dutch/crossword/sample-1-answer.jpeg',
        altText: 'Gratis werkblad kruiswoordpuzzel - werkbladen groep 3 voor letters leren en werkblad voor kinderen',
        pdfDownloadUrl: '/samples/dutch/crossword/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/dutch/crossword/sample-2.jpeg',
        answerKeySrc: '/samples/dutch/crossword/sample-2-answer.jpeg',
        altText: 'Gratis werkbladen kruiswoordpuzzel - werkblad voor kleuters met afbeeldingen en oefenbladen',
        pdfDownloadUrl: '/samples/dutch/crossword/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/dutch/crossword/sample-3.jpeg',
        answerKeySrc: '/samples/dutch/crossword/sample-3-answer.jpeg',
        altText: 'Werkblad voor kinderen kruiswoordpuzzel - gratis printables voor groep 1 2 en kleuters',
        pdfDownloadUrl: '/samples/dutch/crossword/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/dutch/crossword/sample-4.jpeg',
        answerKeySrc: '/samples/dutch/crossword/sample-4-answer.jpeg',
        altText: 'Gratis werkblad kruiswoordpuzzel puzzel - werkbladen groep 3 voor veilig leren lezen',
        pdfDownloadUrl: '/samples/dutch/crossword/sample-4.pdf',
      },
    ],
  },

  // Features Grid - FULL text from crossword.md feature sections
  features: {
    sectionTitle: 'Kruiswoordpuzzel Functies - Alles voor Werkbladen Groep 3 en Oefenbladen Gratis',
    sectionDescription: 'Onze kruiswoordpuzzel generator biedt complete functionaliteit voor leerkrachten groep 1-3. Maak werkbladen kleuters met afbeeldingen in drie klikken. Pas elk element aan op het digitale canvas. Download professionele PDF-bestanden voor uw klas of verkoop online.',
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
        title: 'Maak Werkbladen Groep 3 in 3 Klikken - Snelle Kruiswoordpuzzel Generator',
        description: `Kies een thema uit de bibliotheek. Klik op genereren. Uw werkblad verschijnt direct op het canvas. Geen ingewikkelde instellingen nodig voor basis oefenbladen gratis. Geen design vaardigheden vereist voor professionele werkbladen kleuters.

De generator plaatst automatisch afbeeldingen in het raster. Woorden kruisen elkaar op logische punten. Elk plaatje krijgt een nummer voor duidelijke instructies. Kleuters en groep 1 2 leerlingen begrijpen direct wat ze moeten doen.

Thema's dekken alle schoolvakken en interesses. Dieren voor woordenschat uitbreiding. Eten voor dagelijks Nederlands. Getallen voor sommen tot 20 oefening. Vormen voor ruimtelijk inzicht. Meer dan 150 thema's beschikbaar in 11 talen.

Pas formaat aan naar Letter of A4 papier. Kies portret of landschap oriëntatie. Wijzig rastergrootte voor moeilijkheidsgraad. Grotere vakjes voor groep 1. Kleinere vakjes voor groep 3. Volledig aanpasbaar aan uw lesbehoeften.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Volledige Bewerkbaarheid voor Kleurplaten en Rekenen Werkbladen',
        description: `Elk element op het canvas is versleepbaar. Vergroot of verklein afbeeldingen met de muis. Roteer plaatjes voor creatieve layouts. Verwijder items die niet passen bij uw les. Voeg nieuwe elementen toe waar u wilt.

Sleep afbeeldingen naar verschillende posities. Verander de volgorde van puzzel elementen. Pas de grootte aan voor nadruk op specifieke woorden. Deze flexibiliteit maakt elk werkblad uniek voor uw klas.

Voeg tekstvakken toe voor instructies. Wijzig lettergrootte voor leesbaarheid. Kies uit 6 kindvriendelijke fonts. Pas kleuren aan voor visuele aantrekkelijkheid. Maak werkbladen die kinderen echt willen invullen.

Upload uw eigen afbeeldingen voor gepersonaliseerd leren. Foto's van klasgenoten voor namen oefenen. Plaatjes van schoolspullen voor woordenschat. Afbeeldingen van lokale omgeving voor contextrijk leren. Combineer bibliotheek beelden met eigen materiaal.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Eigen Afbeeldingen voor Letters Leren en Schrijven Oefenen',
        description: `Selecteer meerdere bestanden tegelijk voor snelle upload. Alle gangbare formaten ondersteund: JPEG, PNG, GIF. Uploaded afbeeldingen verschijnen direct in uw persoonlijke bibliotheek. Gebruik ze in elke kruiswoordpuzzel voor uw groep.

Maak gepersonaliseerde werkbladen met foto's van uw leerlingen. Namen leren wordt leuker met gezichten erbij. Schrijven oefenen wordt persoonlijker met bekende objecten. Letters leren krijgt meer betekenis met herkenbare items uit de klas.

Upload plaatjes voor thematische lessen. Herfstbladeren voor seizoenen project. Dieren uit de dierentuin na excursie. Instrumenten na muziekles. Verbind kruiswoordpuzzels met uw lesprogramma.

Combineer eigen foto's met bibliotheek afbeeldingen. Mix vertrouwde items met nieuwe woordenschat. Bouw brug tussen bekend en onbekend. Ondersteun veilig leren lezen met contextuele visuele hints.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Talen voor Werkbladen Kleuters - Nederlands, Engels, Duits en Meer',
        description: `Alle 3000+ afbeeldingen hebben Nederlandse bestandsnamen. Perfect voor woordenschat ontwikkeling en spelling oefening. Elk plaatje toont automatisch de Nederlandse naam. Ideaal voor groep 1 2 die beginnen met lezen.

Switch naar Engels voor tweetalig onderwijs. Duitse namen voor taalvakken. Franse bestandsnamen voor internationale scholen. Elke taal ondersteunt authentieke woordenschat ontwikkeling.

De interface verschijnt in uw gekozen taal. Knoppen, menu's en instructies in Nederlands. Geen Engels nodig om werkbladen te maken. Volledig toegankelijk voor alle Nederlandse leerkrachten.

Gebruik verschillende talen voor gevorderde groep 3 leerlingen. Maak meertalige kruiswoordpuzzels voor uitdaging. Vergelijk woorden tussen talen. Ontwikkel taalbewustzijn vanaf jonge leeftijd.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële Licentie voor Oefenbladen Gratis Verkopen op TPT',
        description: `Volledige Toegang abonnement bevat volledige commerciële licentie. Verkoop uw kruiswoordpuzzels op Teachers Pay Teachers. Open een Etsy shop met printbare werkbladen. Publiceer op Amazon KDP als werkboeken.

Geen extra kosten voor verkoop rechten. Geen attribution vereist op uw producten. Geen limieten aan hoeveel u mag verkopen. Profiteer volledig van uw creativiteit en onderwijsexpertise.

Leerkrachten verdienen €500-€5000 per maand met werkbladen verkoop. Bouw passief inkomen met herbruikbare designs. Maak eenmaal, verkoop onbeperkt. Perfect voor leerkrachten die extra willen verdienen.

300 DPI kwaliteit garandeert professionele uitstraling. Scherpe afbeeldingen na printen. Duidelijke lijnen in het raster. Klanten zijn tevreden met premium kwaliteit. Positieve reviews leiden tot meer verkoop.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Afbeeldingen voor Fijne Motoriek en Tafels Oefenen',
        description: `Bibliotheek bevat meer dan 3000 kindvriendelijke illustraties. Georganiseerd in 150+ thema's. Van ABC letters tot getallen voor sommen tot 20. Van dieren tot voertuigen. Van eten tot sport.

Elke afbeelding is geoptimaliseerd voor jonge kinderen. Eenvoudige, duidelijke vormen. Herkenbare objecten zonder verwarring. Kleurrijk maar niet overweldigend. Perfect voor kleuters en groep 1 2.

Zoekfunctie helpt snel de juiste plaatjes vinden. Type "appel" voor fruit afbeeldingen. Zoek "hond" voor huisdieren. Filter op thema voor snelle selectie. Bladeren door categorieën voor inspiratie.

Thema selectie genereert instant werkbladen. Kies "Tafels oefenen" voor wiskundige kruiswoordpuzzels. Selecteer "Fijne motoriek" voor schrijfoefeningen. Pick "Rekenen werkbladen" voor getallen tot 20. Één klik naar compleet werkblad.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit voor Kleurplaten en Werkbladen Groep 3',
        description: `Download als JPEG voor snelle digitale distributie. Export als PDF voor professioneel printen. Beide formaten bevatten 300 DPI resolutie. Perfecte kwaliteit voor klassikale kopieën.

Grijswaarden optie bespaart printer inkt. Behoud kwaliteit zonder kleur kosten. Ideaal voor scholen met beperkte budgetten. Print honderden kopieën zonder inkt zorgen.

Antwoordsleutel genereert automatisch na puzzel creatie. Toon oplossingen voor leerkrachten. Versnelt nakijken van leerlingen werk. Bespaart tijd bij groepsactiviteiten. Perfecte ondersteuning voor drukke docenten.

Elk werkblad print perfect op standaard papier. A4 formaat voor Nederlandse scholen. Letter formaat voor internationale instellingen. Geen randjes afgesneden. Geen schaalfouten bij printen. Betrouwbare kwaliteit elke keer.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from crossword.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak je Werkbladen Groep 3 en Oefenbladen Gratis in 5 Stappen',
    sectionDescription: 'Maak professionele kruiswoordpuzzels in minder dan 3 minuten. Deze handleiding toont de complete workflow van thema selectie tot download. Volg deze vijf stappen voor perfecte werkbladen kleuters en groep 1-3 materiaal. Geen technische kennis nodig voor hoogwaardige resultaten.',
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
        title: 'Stap 1: Kies Content voor Veilig Leren Lezen en Werkbladen Groep 3',
        description: `Open de kruiswoordpuzzel generator en selecteer uw taal. Nederlands toont Nederlandse woorden bij elke afbeelding. Perfect voor veilig leren lezen met woordherkenning. Kies Engels voor tweetalig onderwijs of internationaal onderwijs.

Selecteer een thema voor instant werkblad generatie. Klik op "Dieren" voor woordenschat over huisdieren en wilde dieren. Kies "Eten" voor fruit, groenten en maaltijden. Pick "School" voor klaslokaal objecten. Meer dan 150 thema's beschikbaar.

Of selecteer individuele afbeeldingen voor gepersonaliseerde puzzels. Browse door de bibliotheek per categorie. Gebruik de zoekfunctie voor specifieke woorden. Type "appel" en selecteer uit meerdere appel afbeeldingen. Klik plaatjes aan om ze toe te voegen aan uw selectie.

Upload eigen foto's voor unieke werkbladen. Foto's van uw klas voor namen oefenen. Plaatjes van schoolgebouw voor herkenning. Afbeeldingen van recente excursie voor contextrijk leren. Combineer uploaded beelden met bibliotheek thema's.

Voor veilig leren lezen materiaal: selecteer afbeeldingen met korte, eenvoudige woorden. Drieletter woorden voor beginners groep 1. Vierletter woorden voor groep 2. Langere woorden voor gevorderde groep 3. Match moeilijkheid aan leesniveau van uw leerlingen.

Selecteer minimaal 5 afbeeldingen voor kleine puzzels. Kies 10-15 items voor standaard werkbladen. Grotere selecties maken uitdagendere kruiswoordpuzzels. De generator plaatst automatisch woorden in optimale configuratie.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Pas Instellingen aan voor Sommen tot 20 en Werkbladen Kleuters',
        description: `Kies paginaformaat naar uw printsituatie. A4 portret voor Nederlandse scholen. Letter landschap voor Amerikaanse instellingen. Custom formaat voor speciale projecten. Elk formaat optimaliseert afbeeldingsgrootte automatisch.

Pas achtergrondkleur aan voor visuele aantrekkelijkheid. Wit voor standaard printen en inktbesparing. Lichte pastelkleuren voor aantrekkelijke kleurplaten effect. Thema achtergronden voor seizoensgebonden werkbladen. Opacity slider regelt achtergrond intensiteit.

Voeg border frames toe voor professionele uitstraling. Kies uit 30+ randthema's. Schoolthema randen voor dagelijks gebruik. Seizoen borders voor feestdagen. Sport randen voor lichamelijke opvoeding thema's. Borders geven werkbladen premium uitstraling.

Voor sommen tot 20 kruiswoordpuzzels: selecteer getallen thema. Cijfers 1-10 voor jonge kleuters. Getallen 1-20 voor groep 2-3. Mix getallen met rekenwoorden zoals "plus", "min", "is". Maak wiskundige woordenschat puzzels.

Voor werkbladen kleuters: kies grotere raster vakjes. Grote vakjes zijn gemakkelijker voor kleine handjes. Meer ruimte voor dikke potloden en markers. Duidelijke scheiding tussen woorden. Perfect voor beginnende schrijvers groep 1.

Stel moeilijkheidsgraad in via rastergrootte. 5x5 raster voor eenvoudige puzzels. 10x10 voor gemiddelde uitdaging. 15x15 voor gevorderde groep 3 leerlingen. Grotere rasters bieden meer kruisende woorden.

Schakel manual edit mode in voor volledige controle. Bewerk afbeeldingsnamen voordat je genereert. Pas spelling aan voor dialecten. Verander woorden naar synoniemen. Wijzig complexiteit per leerling behoefte.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Rekenen Werkbladen en Oefenbladen Gratis Direct',
        description: `Klik op de blauwe "Genereer" knop. De generator plaatst automatisch woorden in het raster. Kruisende woorden maximaliseren puzzel dichtheid. Elk plaatje krijgt een uniek nummer voor instructies.

Het werkblad verschijnt binnen 3 seconden op het canvas. Afbeeldingen verschijnen naast het kruiswoordraster. Nummers linken plaatjes aan raster posities. Horizontale en verticale richtingen duidelijk gemarkeerd.

Preview uw oefenbladen gratis voor kwaliteitscontrole. Zoom in om details te controleren. Controleer of alle woorden correct kruisen. Verificeer dat nummering logisch loopt. Check of afbeeldingen herkenbaar zijn.

Niet tevreden met de layout? Klik "Genereer" opnieuw voor nieuwe configuratie. Dezelfde woorden, andere plaatsing. Elk klik geeft unieke raster arrangement. Probeer meerdere versies voor optimaal resultaat.

Voor rekenen werkbladen: controleer dat getallen duidelijk leesbaar zijn. Verificeer dat wiskundige symbolen correct weergeven. Check dat sommen tot 20 puzzels logische progressie hebben. Zorg dat moeilijkheid past bij lesniveau.

Genereer een antwoordsleutel met één klik. Dezelfde layout, maar met ingevulde letters. Perfect voor nakijken van leerlingen werk. Bespaart docenten tijd bij groepsactiviteiten. Print antwoordsleutel op apart papier.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk Canvas voor Letters Leren en Kleurplaten Elementen',
        description: `Nu begint de creatieve aanpassing. Klik op elk element om het te selecteren. Sleep afbeeldingen naar nieuwe posities. Vergroot of verklein met corner handles. Roteer voor dynamische layouts.

Voeg extra tekstvakken toe voor instructies. Type "Vul de kruiswoordpuzzel in" bovenaan. Schrijf "Gebruik de plaatjes als hints" als uitleg. Personaliseer met klasnaam of datum. Wijzig font naar kindvriendelijke stijlen.

Voor letters leren werkbladen: voeg alfabet referenties toe. Plaats een ABC strip bovenaan voor hulp. Voeg letter-sound hints toe bij moeilijke woorden. Highlight specifieke letter combinaties in verschillende kleuren.

Pas kleuren aan voor kleurplaten effect. Maak rasterlijnen in grijstinten. Laat afbeeldingen zwart-wit voor inkleuroefening. Kinderen kunnen werkblad eerst oplossen, dan inkleuren. Combineert puzzel met fijne motoriek oefening.

Upload logo van uw school voor branding. Plaats naam van leerkracht in de hoek. Voeg copyright tekst toe voor commerciële verkoop. Professionele details maken groot verschil.

Verwijder elementen die te moeilijk zijn. Delete onbekende woorden voor jonge leerlingen. Haal complexe afbeeldingen weg. Vereenvoudig tot passend niveau. Volledige controle over eindresultaat.

Gebruik align tools voor nette layouts. Lijn afbeeldingen uit op grid. Center tekst perfect op pagina. Gelijke afstanden tussen elementen. Professionele uitstraling zonder design training.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download Werkbladen Kleuters en Oefenbladen Gratis als PDF',
        description: `Klik op "Download" voor export opties. Kies JPEG voor digitale distributie. Selecteer PDF voor professioneel printen. Beide formaten bevatten volledige 300 DPI resolutie.

Download het werkblad eerst voor leerlingen. Dan download de antwoordsleutel voor uzelf. Bewaar beide bestanden in uw les folder. Organiseer per thema of week voor gemakkelijke toegang.

Schakel grijswaarden mode in voor inktbesparing. Zwart-wit printen kost minder per kopie. Kwaliteit blijft perfect behouden zonder kleur. Ideaal voor scholen met beperkte budgetten.

Print een testexemplaar voordat je hele klas kopieert. Controleer papierformaat past bij printer. Verificeer dat randen niet afgesneden worden. Check dat tekst leesbaar blijft na printen. Eén test bespaart verspilde kopieën.

Voor werkbladen kleuters: print op dikker papier. 100-120 gram papier voorkomt scheuren. Dikker materiaal voelt professioneler aan. Jonge kinderen behandelen materiaal ruwer.

Lamineer werkbladen voor herbruikbaar materiaal. Leerlingen schrijven met whiteboard markers. Wis schoon na gebruik. Dezelfde puzzel werkt voor meerdere groepen. Duurzaam en kostenbesparend.

Voor oefenbladen gratis verkoop op TPT: download hoogste kwaliteit. PDF formaat voor professionele uitstraling. Voeg instructiepagina toe als tweede blad. Bundle meerdere werkbladen in één product. Klanten waarderen complete pakketten.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from crossword.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten - Werkbladen Kleuters tot Werkbladen Groep 3',
    sectionDescription: 'Kruiswoordpuzzel werkbladen passen bij elke onderwijssituatie. Van groep 1 2 kleuters tot gevorderde groep 3 leerlingen. Van regulier onderwijs tot thuisonderwijs. Van Nederlands tot meertalig onderwijs. Deze tool ondersteunt diverse leerdoelen en lesmethoden.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Kleuter Leerkrachten - Fijne Motoriek en Veilig Leren Lezen voor Groep 1 2',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Groep 1 en 2 leerkrachten gebruiken kruiswoordpuzzels voor beginnende geletterdheid. Afbeeldingen koppelen aan woorden ontwikkelt woordherkenning. Perfect voor veilig leren lezen voorbereiding. Kinderen leren letter-klank relaties met visuele ondersteuning.

Maak werkbladen kleuters met grote raster vakjes voor beginnende schrijvers. Extra grote lettertypes voor beginnende lezers. Eenvoudige drieletter woorden zoals "kat", "hond", "bal". Herkenbare afbeeldingen uit de leefwereld van kleuters. Dagelijkse objecten die elk kind kent.

Kruiswoordpuzzels ontwikkelen fijne motoriek vaardigheden. Kleine vakjes invullen traint pengreep. Letters schrijven binnen lijnen oefent schrijfcontrole. Kruiswoordrasters versterken ruimtelijk begrip. Horizontaal en verticaal schrijven oefent schrijfrichtingen.

Gebruik thema's uit uw kleuterklas lesprogramma. Dieren voor woordenschat rond de boerderij. Kleuren voor basis visuele discriminatie. Vormen voor wiskundige voorbereidingsvaardigheden. Koppel puzzels aan seizoenen en feestdagen voor contextrijk leren.

Ouders waarderen werkbladen kleuters die ze thuis kunnen gebruiken. Stuur kruiswoordpuzzels mee als huiswerk. Print extra kopieën voor herhaling. Maak wekelijkse oefenbladen gratis voor consistente thuisoefening. Betrek ouders bij geletterdheid ontwikkeling.`,
        quote: 'Mijn kleuters vinden de plaatjes-puzzels geweldig voor letters leren!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Basisschool Leerkrachten - Sommen tot 20 en Tafels Oefenen Groep 3',
        subtitle: 'Werkbladen groep 3 en rekenen',
        description: `Groep 3 leerkrachten integreren kruiswoordpuzzels in meerdere vakken. Nederlands les gebruikt puzzels voor spelling oefening. Rekenen les maakt wiskundige woordenschat kruiswoordpuzzels. Wereldoriëntatie puzzels versterken thematische woordenschat. Multifunctioneel gereedschap voor de hele schooldag.

Maak rekenen werkbladen met getallen en rekenwoorden. Sommen tot 20 puzzels voor optellen en aftrekken oefening. Tafels oefenen kruiswoordpuzzels voor vermenigvuldiging introductie. Mix cijfers met wiskundige termen zoals "som", "verschil", "product". Visuele wiskunde versterkt abstract denken.

Voor veilig leren lezen: gebruik kern woordenschat uit uw leesmethode. Veel scholen gebruiken specifieke woord lijsten per kern. Upload die woorden als custom lijst. Genereer kruiswoordpuzzels perfect afgestemd op uw curriculum. Synchroniseer werkbladen met lesprogramma progressie.

Differentieer voor verschillende leesniveaus in één klas. Maak simpele puzzels voor zwakke lezers. Creëer uitdagende varianten voor sterke lezers. Gebruik dezelfde thema's, verschillende woordenschat. Elke leerling werkt op passend niveau.

Kruiswoordpuzzels werken perfect als zelfstandig werk. Leerlingen oefenen onafhankelijk terwijl u kleine groepen begeleidt. Automatisch nakijken met antwoordsleutel. Geen correctie tijd nodig. Efficiënt gebruik van instructietijd.`,
        quote: 'Kruiswoordpuzzels maken spelling oefenen leuk voor mijn groep 3.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijs Ouders - Letters Leren en Schrijven Oefenen Thuis',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Thuisonderwijs gezinnen maken gepersonaliseerde werkbladen voor elk kind. Jongere kinderen krijgen letters leren puzzels. Oudere kinderen ontvangen spelling uitdagingen. Alles van één generator, aangepast per kind. Bespaart tijd in multi-leeftijd onderwijssituaties.

Upload foto's van familie activiteiten voor contextrijk leren. Vakantie plaatjes worden woordenschat lessen. Huisdieren foto's ontwikkelen schrijven oefenen. Tuin groenten maken natuurkunde woordenschat. Persoonlijk onderwijs op zijn best.

Thuisonderwijs ouders waarderen commerciële licentie. Maak materialen voor coöp groepen. Deel werkbladen met andere thuisonderwijs families. Verkoop curriculum pakketten op Teachers Pay Teachers. Genereer inkomen terwijl u uw kinderen onderwijst.

Plan wekelijkse thema's met matching kruiswoordpuzzels. Dinosaurus week krijgt prehistorische woordenschat puzzel. Ruimte eenheid gebruikt planeten en sterren. Seizoen studie combineert weer en natuur woorden. Gestructureerd leren met creatieve flexibiliteit.

Print werkbladen in bulk voor hele week. Lamineer voor herbruikbaar leermateriaal. Kinderen oefenen meerdere keren met uitwisbare markers. Duurzame oplossing voor beperkte thuisonderwijs budgetten.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'Taalleerkrachten - Veilig Leren Lezen in 11 Talen met Oefenbladen Gratis',
        subtitle: 'Meertalig onderwijs',
        description: `Engels leerkrachten op Nederlandse scholen maken tweetalige kruiswoordpuzzels. Nederlandse woorden voor basis les. Engelse woorden voor gevorderde leerlingen. Switch tussen talen met één klik. Vergelijk woordenschat tussen talen.

Alle 3000+ afbeeldingen ondersteunen 11 talen. Nederlands, Engels, Duits, Frans, Spaans. Italiaans, Portugees, Zweeds, Deens, Noors, Fins. Elke afbeelding toont correcte spelling in gekozen taal. Authentiek taalmateriaal voor vreemde talen onderwijs.

Maak cognaten puzzels voor taalvergelijking. Woorden die vergelijkbaar zijn tussen Nederlands en Engels. Leerlingen ontdekken taalpatronen door puzzels. Metacognitief taalbewustzijn ontwikkelt vanaf jonge leeftijd.

Internationale scholen gebruiken kruiswoordpuzzels voor meertalige leerlingen. Kind spreekt Spaans thuis, leert Nederlands op school. Maak puzzels in beide talen. Ontwikkel academische woordenschat in schooltaal. Behoud moedertaal met thuisoefeningen.

Volwassen ESL programma's maken werkbladen voor beginnende lezers. Eenvoudige Nederlandse woorden met duidelijke afbeeldingen. Dagelijks vocabulaire voor nieuwkomers. Supermarkt woorden, vervoer termen, gezondheid vocabulaire. Praktisch Nederlands voor integratie.`,
        quote: 'Meertalige werkbladen helpen mijn NT2-leerlingen enorm.',
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Speciale Onderwijs Leerkrachten - Fijne Motoriek Werkbladen en Kleurplaten',
        subtitle: 'Speciaal onderwijs en differentiatie',
        description: `SO leerkrachten differentiëren kruiswoordpuzzels voor individuele leerplan doelen. Extra grote vakjes voor leerlingen met motorische uitdagingen. Grotere lettertypes voor visueel beperkte kinderen. Simpele woorden voor cognitieve uitdagingen. Volledige personalisatie per leerling.

Kruiswoordpuzzels ontwikkelen fijne motoriek op spelende wijze. Minder confronterend dan traditionele schrijfoefeningen. Puzzel element maakt motoriek training leuker. Kinderen vergeten dat ze moeilijke vaardigheden oefenen. Motivatie verhoogt door spel element.

Gebruik kleurplaten functie voor multisensorische leren. Eerst puzzel oplossen, dan inkleuren. Tactiele versterking van woordenschat. Kleur codering voor woord categorieën. Visueel-ruimtelijke vaardigheden ontwikkelen naast taal.

Maak individuele werkbladen voor elk IEP doel. Letters leren voor pre-geletterdheid doelen. Getallen herkenning voor vroege wiskundige vaardigheden. Sociale woorden voor pragmatische taal ontwikkeling. Werkbladen documenteren voortgang per leerdoel.

Herhaling is cruciaal in speciaal onderwijs. Genereer tien varianten van dezelfde woordenlijst. Iedere week dezelfde woorden, andere puzzel layout. Herkenning zonder verveling door visuele variatie. Gemakkelijk om progressie data te verzamelen.`,
        quote: 'De visuele aanpak werkt perfect voor mijn leerlingen.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Ondernemer Leerkrachten - Verkoop Rekenen Werkbladen en Tafels Oefenen Materiaal',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Duizenden leerkrachten verdienen passief inkomen met werkbladen verkoop. Teachers Pay Teachers, Etsy, Amazon KDP. Volledige Toegang abonnement bevat volledige commerciële licentie. Maak eenmaal, verkoop onbeperkt. Bouw business terwijl u slaapt.

Populaire niches omvatten sommen tot 20 werkbladen voor jonge leerlingen. Tafels oefenen pakketten voor groep 3-4. Veilig leren lezen materialen voor kern 1-12. Seizoensgebonden thema pakketten verkopen goed tijdens feestdagen. Niche focusing verhoogt winstgevendheid.

Bundle meerdere kruiswoordpuzzels in thema pakketten. 20 dieren puzzels in één download. 30 wiskundige woordenschat kruiswoordpuzzels. Complete jaar curriculum met 100+ werkbladen. Klanten betalen meer voor comprehensive pakketten.

300 DPI kwaliteit geeft professionele uitstraling. Klanten delen positieve reviews over print kwaliteit. Scherpe afbeeldingen en duidelijke rasters. Premium product rechtvaardigt premium prijs. Concurreer met traditionele uitgevers.

Gebruik Pinterest marketing om verkoop te boosten. Pin voorbeeld werkbladen naar educatie boards. Gratis sample als lead magnet. Link naar betaalde volledige collectie. Passieve traffic genereert passief inkomen.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from crossword.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Werkbladen Groep 3 en Oefenbladen Gratis',
    sectionDescription: 'Leerkrachten stellen regelmatig vragen over de kruiswoordpuzzel generator. Deze FAQ sectie beantwoordt de meest voorkomende vragen. Van prijzen tot gebruik in de klas. Van technische details tot commerciële licentie. Alle informatie die u nodig heeft om te starten.',
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
        question: 'Zijn Deze Werkbladen Kleuters en Oefenbladen Gratis Echt Gratis?',
        answer: 'De kruiswoordpuzzel generator vereist een Volledige Toegang abonnement van €240 per jaar of €25 per maand. Uw abonnement geeft onbeperkte werkblad creatie zonder kosten per werkblad. Genereer zoveel werkbladen kleuters en groep 1-3 materiaal als u nodig heeft zonder extra kosten. Het woord "gratis" in "oefenbladen gratis" verwijst naar de zoekterm die mensen gebruiken. Eenmaal geabonneerd, creëert u onbeperkt zonder per-werkblad kosten. Volledige Toegang omvat alle 33 worksheet generators op het platform. Beide abonnementen bevatten commerciële licentie, 11 talen ondersteuning en professionele 300 DPI kwaliteit exports.',
      },
      {
        id: '2',
        question: 'Kan ik Rekenen Werkbladen en Sommen tot 20 Printen op Thuisprinter?',
        answer: 'Ja. Alle kruiswoordpuzzels printen perfect op standaard thuisprinters. Download als PDF voor beste print kwaliteit. Gebruik A4 papier voor Nederlandse printers. Letter formaat werkt voor Amerikaanse printers. Geen speciale apparatuur vereist. Rekenen werkbladen met sommen tot 20 bevatten duidelijke cijfers en symbolen. Getallen blijven leesbaar na printen. 300 DPI resolutie garandeert professionele kwaliteit zelfs op budget printers. Grijswaarden optie bespaart inkt voor grote print runs. Lamineer geprinte werkbladen voor herbruikbaar materiaal.',
      },
      {
        id: '3',
        question: 'Heb ik Design Vaardigheden Nodig voor Fijne Motoriek Werkbladen?',
        answer: 'Nee. Geen design ervaring vereist voor professionele werkbladen. De generator doet alles automatisch. Selecteer afbeeldingen, klik genereren, download direct. Zelfs technisch onervaren leerkrachten creëren mooie materialen binnen minuten. Fijne motoriek werkbladen vereisen zorgvuldige spacing en grootte. Generator optimaliseert automatisch voor kleine kinderhanden. Vakjes zijn groot genoeg voor beginnende schrijvers. Drag-and-drop editing maakt aanpassingen simpel. Geen Photoshop kennis nodig.',
      },
      {
        id: '4',
        question: 'Kan ik Veilig Leren Lezen Werkbladen Gebruiken in Mijn Klas?',
        answer: 'Volledige Toegang abonnement bevat onbeperkt klasgebruik. Print zoveel kopieën als uw klas nodig heeft. Deel digitale versies via online leeromgeving. Gebruik in fysieke en digitale lessen. Geen limieten op aantal leerlingen of klassen. Veilig leren lezen materialen combineren perfect met Nederlandse leesmethoden. Upload kern woordenschat uit uw programma. Genereer kruiswoordpuzzels per kern voor systematische progressie. Differentieer voor verschillende leesniveaus binnen één klas.',
      },
      {
        id: '5',
        question: 'Welke Talen Ondersteunen Werkbladen voor Tafels Oefenen?',
        answer: 'Alle 3000+ afbeeldingen bevatten bestandsnamen in 11 talen. Nederlands, Engels, Duits, Frans, Spaans, Italiaans, Portugees, Zweeds, Deens, Noors en Fins. Elke afbeelding toont correcte spelling in gekozen taal voor authentieke woordenschat ontwikkeling. Voor tafels oefenen materiaal: gebruik getallen thema in elke taal. Cijfers zijn universeel maar rekenwoorden variëren per taal. Nederlandse "keer" wordt Engels "times". Meertalige scholen maken kruiswoordpuzzels in meerdere talen.',
      },
      {
        id: '6',
        question: 'Kan ik Kleurplaten en Fijne Motoriek Oefeningen Verkopen die ik Maak?',
        answer: 'Ja. Volledige Toegang abonnement bevat volledige commerciële print-on-demand licentie zonder extra kosten. Verkoop uw kruiswoordpuzzels op Teachers Pay Teachers, Etsy, Amazon KDP. Geen attribution vereist. Geen limieten op verkoop volume of inkomsten. Kleurplaten combinatie kruiswoordpuzzels verkopen uitstekend online. Prijs €3-5 per individueel werkblad. Bundle 20 thema puzzels voor €12-15. Fijne motoriek oefeningen zijn populaire niche voor kleuter materialen.',
      },
      {
        id: '7',
        question: 'Hoe Pas ik Letters Leren Kruiswoordpuzzels aan voor Mijn Leerlingen?',
        answer: 'Volledige canvas editing geeft complete controle. Klik op elk element om te selecteren. Sleep afbeeldingen naar nieuwe posities. Vergroot of verklein met hoek handles. Roteer met de draaiknop. Delete items die niet passen. Voor letters leren differentiatie: pas woordlengte aan per niveau. Beginnende groep 1 krijgt drieletter woorden. Gevorderde groep 2 krijgt vierletter woorden. Voeg tekstvakken toe voor specifieke instructies. Wijzig font grootte voor visuele behoeften.',
      },
      {
        id: '8',
        question: 'Wat is de Beste Leeftijd voor Sommen tot 20 Kruiswoordpuzzels?',
        answer: 'Sommen tot 20 materiaal werkt best voor groep 2-3 leerlingen, leeftijd 6-9 jaar. Jonge groep 1 kinderen focussen op getallen 1-10 eerst. Tegen eind groep 2 zijn meeste kinderen klaar voor optellen en aftrekken tot 20. Pas moeilijkheid aan per kind ontwikkeling, niet leeftijd. Start met concrete getallen voor jonge leerlingen. Gebruik afbeeldingen van aantallen. Wiskundige kruiswoordpuzzels maken getallen oefening minder saai. Kinderen zien het als puzzel game.',
      },
      {
        id: '9',
        question: 'Kan ik Eigen Foto\'s Uploaden voor Schrijven Oefenen Werkbladen?',
        answer: 'Ja. Multi-file upload ondersteunt alle gangbare formaten: JPEG, PNG, GIF. Selecteer meerdere afbeeldingen tegelijk van uw computer. Uploaded foto\'s verschijnen direct in uw persoonlijke bibliotheek. Gebruik ze in elke kruiswoordpuzzel die u maakt. Voor schrijven oefenen: upload foto\'s van uw klas leerlingen. Namen leren wordt leuker met gezichten erbij. Upload plaatjes van schoolspullen voor woordenschat uitbreiding. Combineer uploaded foto\'s met bibliotheek afbeeldingen.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt het om Rekenen Werkbladen te Maken?',
        answer: 'Gemiddelde creatie tijd is 2-3 minuten per werkblad. Selecteer thema: 15 seconden. Klik genereren: 3 seconden. Preview en download: 30 seconden. Totaal onder 1 minuut voor basis werkbladen zonder aanpassingen. Voor aangepaste rekenen werkbladen: 5-10 minuten inclusief editing. Upload custom getallen lijst: 1 minuut. Canvas editing voor perfectie: 3-5 minuten. Traditionele methode duurt 30-60 minuten per kruiswoordpuzzel.',
      },
      {
        id: '11',
        question: 'Bevatten Werkbladen Kleuters Antwoordsleutels voor Controle?',
        answer: 'Ja. Automatische antwoordsleutel generatie met één klik. Dezelfde layout als leerlingen versie maar met ingevulde letters. Print antwoordsleutel op apart papier voor leerkrachten. Vereenvoudigt nakijken van leerlingen werk dramatisch. Voor werkbladen kleuters: antwoordsleutels helpen ouders thuis. Niet alle ouders weten juiste spelling van elk woord. Antwoordsleutel geeft vertrouwen bij thuisoefening. Speciale onderwijs leerkrachten gebruiken antwoordsleutels voor data verzameling.',
      },
      {
        id: '12',
        question: 'Kan ik Tafels Oefenen Kruiswoordpuzzels voor Specifieke Schoolvakken Maken?',
        answer: 'Absoluut. Thema selectie dekt alle school vakken. Wiskunde thema\'s voor tafels oefenen en rekenen. Nederlands thema\'s voor spelling en woordenschat. Wereldoriëntatie voor dieren, planten, landen. Elk vak krijgt aangepaste kruiswoordpuzzels. Voor vak-specifieke tafels oefenen: gebruik getallen en rekenwoorden samen. Upload eigen woordenlijsten voor niche vakken. Cross-curriculaire kruiswoordpuzzels combineren meerdere vakken.',
      },
    ],
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
    sectionTitle: 'Combineer Kruiswoordpuzzels met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'LessonCraft Studio platform biedt 33 verschillende worksheet generators. Kruiswoordpuzzels combineren perfect met andere werkblad types. Maak complete lespakketten die meerdere vaardigheden oefenen. Één thema, meerdere werkblad formats voor versterkte leren.',
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
        slug: 'woordzoeker-werkbladen',
        name: 'Woordzoeker',
        category: 'Taal',
        icon: '🔍',
        description: 'Combineer kruiswoordpuzzels met woordzoekers voor uitgebreide woordenschat oefening en letters leren.',
      },
      {
        id: '2',
        slug: 'woordkruisel-werkbladen',
        name: 'Woordmixer',
        category: 'Taal',
        icon: '🔤',
        description: 'Combineer met woordmixer werkbladen voor complete spelling en woordherkenning oefening.',
      },
      {
        id: '3',
        slug: 'kleurplaten-werkbladen',
        name: 'Kleurplaten',
        category: 'Creativiteit',
        icon: '🎨',
        description: 'Beloon voltooide kruiswoordpuzzels met thematische kleurplaten die de fijne motoriek ontwikkelen.',
      },
      {
        id: '4',
        slug: 'verbindings-werkbladen',
        name: 'Verbinden',
        category: 'Vroege Educatie',
        icon: '🔗',
        description: 'Vul kruiswoordpuzzels aan met verbindingsoefeningen voor woordherkenning en visuele associatie.',
      },
      {
        id: '5',
        slug: 'lijnen-trekken-werkbladen',
        name: 'Lijnen Trekken',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train handschrift en fijne motoriek naast kruiswoordpuzzel woordenschat oefening.',
      },
      {
        id: '6',
        slug: 'sudoku-werkbladen',
        name: 'Sudoku',
        category: 'Logisch Denken',
        icon: '🧩',
        description: 'Combineer met sudoku puzzels voor extra logisch denken en probleemoplossing.',
      },
    ],
  },
};

export default imageCrosswordNlContent;
