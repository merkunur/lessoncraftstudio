import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'schaduwspel werkblad printen',
    secondaryKeywords: [
      'schaduw koppelen werkblad',
      'silhouetten verbinden printen',
      'schaduwen en figuren werkblad',
      'schaduwspel kleuters',
    ],
    lsiKeywords: [
      'silhouet',
      'schaduw',
      'koppelen',
      'visuele discriminatie',
    ],
    titleTag: 'Schaduwkoppel-generator | LessonCraftStudio',
    metaDescription: 'Maak schaduwspel werkbladen met plaatjes en silhouetten op thema. Automatische antwoorden, PDF 300 DPI. Gratis proberen.',
  },

  hero: {
    title: 'Schaduwkoppel-generator — Maak printables om te verkopen op Etsy en KDP',
    tagline:
      'Maak schaduwspel werkbladen met plaatjes en automatische silhouetten voor kleuters — twee koppelmodi, probeer gratis met watermerk.',
    description:
      'Bouw een populaire productlijn schaduwwerkbladen voor uw Etsy-shop of Amazon KDP-portfolio. Kinderen koppelen gekleurde afbeeldingen aan hun zwarte silhouetten of voegen gesplitste afbeeldingshelften weer samen — een activiteit die visuele waarneming traint en bijzonder geliefd is bij ouders van kleuters en peuters. De generator maakt automatisch nauwkeurige silhouetten via pixelniveau beeldverwerking, wat u uren handwerk bespaart. De Maak het Compleet-modus splitst afbeeldingen in helften voor een tweede puzzeltype vanuit dezelfde tool. Beide modi gebruiken Fisher-Yates derangement dat triviale koppelingen uitsluit, waardoor elk werkblad een echte uitdaging biedt. Met 104 thematische collecties en meer dan 3.100 illustraties kunt u eindeloze varianten produceren voor seizoensbundels en themapakketten. De werkbladen zijn volledig visueel en verkopen daarom op elke markt zonder vertaling — ideaal voor Etsy.nl, Bol.com en internationale shops. Automatische antwoordbladen met letter-naar-nummer-koppelingslabels maken uw producten direct verkoopklaar. Exporteer printklare PDF\'s op 300 DPI. De gratis proefversie met watermerk geeft u toegang tot alle functies — koop een licentie om het watermerk te verwijderen.',
  },

  ctaHeading: 'Schaduwkoppel-werkbladen maken',

  howItWorks: {
    title: 'Hoe maakt u schaduwwerkbladen om te verkopen in 5 stappen',
    steps: [
      {
        title: 'Stel je pagina-indeling in',
        description:
          'Open het paneel Pagina-instellingen en kies een paginaformaat: Letter Staand, Letter Liggend, A4 Staand, A4 Liggend, Vierkant (1200×1200) of een volledig aangepaste afmeting. Kies een achtergrondkleur met de kleurkiezer als reserveachtergrond. Selecteer een achtergrondthema en pas de dekking aan (0–1 in stappen van 0,05), kies vervolgens een kaderthema met een eigen onafhankelijke dekkingsregelaar. Deze indelingskeuzes vormen het kader van je schaduw koppelen werkblad voordat je inhoud configureert. Als je verkoopt op Etsy.nl, maak dan zowel Letter-versies voor Noord-Amerikaanse kopers als A4-versies voor Europese klanten — het vierkante formaat (1200×1200) is ideaal voor Instagram- en Pinterest-promotie van je producten.',
      },
      {
        title: 'Kies oefenmodus en configureer opties',
        description:
          'Open het paneel Oefeningconfiguratie en selecteer je modus: Schaduw Koppelen of Maak het Compleet. Schaduw Koppelen genereert zwarte silhouetten van je geselecteerde afbeeldingen via pixelniveau beeldverwerking. Maak het Compleet splitst afbeeldingen in helften — kies horizontale (boven/onder) of verticale (links/rechts) snijrichting met de keuzerondjes die in deze modus verschijnen. Schakel het selectievakje "Labels tonen" in (standaard AAN) om A/B/C/D en 1/2/3/4 identificatoren op het werkblad weer te geven. Schakel "Naam-/datumvelden opnemen" in om naam- en datumregels toe te voegen.',
      },
      {
        title: 'Selecteer 4 afbeeldingen uit de bibliotheek',
        description:
          'Open het paneel Afbeeldingenbibliotheek en blader door 104 thematische collecties met meer dan 3100 kleurrijke illustraties — dieren, voedsel, voertuigen, natuur, feestdagen en tientallen meer. Filter op thema met het dropdownmenu of zoek op trefwoord met 300ms debounce. Klik op afbeeldingen om ze te selecteren — de teller toont je voortgang naar de vereiste 4 afbeeldingen. Een voorbeeld van geselecteerde afbeeldingen bevestigt je keuzes voordat je genereert. Kies afbeeldingen met herkenbare omtrekken — dierenvormen, voertuigprofielen en objectcontouren produceren de meest onderscheidende silhouetten voor uitdagende koppelactiviteiten. Je kunt ook eigen PNG-, JPG- of GIF-afbeeldingen uploaden via het paneel Eigen Afbeeldingen Uploaden.',
      },
      {
        title: 'Genereer het schaduw koppelen werkblad',
        description:
          'Klik op Genereren om het koppelwerkblad te maken. In de Schaduw Koppelen-modus verwerkt de app elke afbeelding op pixelniveau — laadt deze op een canvas, extraheert pixeldata via getImageData en converteert elke pixel met alpha > 10 naar puur zwart (R=0, G=0, B=0, A=255) om nauwkeurige silhouetten te produceren. In de Maak het Compleet-modus worden afbeeldingen gesplitst langs de gekozen snijrichting. Beide modi passen Fisher-Yates derangement toe om te garanderen dat geen enkel item op zijn oorspronkelijke positie verschijnt. Een gestileerde koptekst verschijnt met een amberkleurige achtergrond (#FFC107), witte pilvormige container en 3px amberen kaderlijn met "Schaduw Koppelen" en instructies in de geselecteerde taal. De indeling past zich automatisch aan: liggende pagina\'s gebruiken 2 rijen × 4 items, staande pagina\'s gebruiken 2 kolommen × 4 items.',
      },
      {
        title: 'Genereer het antwoordblad en download',
        description:
          'Schakel naar het tabblad Antwoordblad om het automatisch gegenereerde antwoordblad te zien. In de Schaduw Koppelen-modus toont elke cel de originele afbeelding naast het silhouet met een label zoals "A → 2" dat de correcte koppeling aangeeft. In de Maak het Compleet-modus toont elke cel de volledige originele afbeelding met het koppelingslabel. Het raster gebruikt 4 kolommen met 50px tussenruimte vóór de tweede rij en 15px verticale afstand tussen elementen. Download beide versies met de vier speciale knoppen: Werkblad JPEG, Antwoordblad JPEG, Werkblad PDF en Antwoordblad PDF op 300 DPI. Schakel grijstinten in voor inktbesparende versies. Elke export is productieklaar voor Etsy-vermeldingen, Amazon KDP-binnenwerken en Gumroad-productbestanden.',
      },
    ],
  },

  keyFeatures: {
    title: 'Belangrijkste functies van de schaduwwerkbladen generator',
    features: [
      {
        title: 'Automatisch Gegenereerde Silhouetten via Pixelniveau Beeldverwerking',
        description:
          'De Schaduw Koppelen-modus maakt zwarte silhouetten door echte pixelniveau manipulatie — geen CSS-filters of voorgemaakte assets. De app laadt elke afbeelding op een canvas, extraheert pixeldata met getImageData en converteert elke pixel met een alpha-waarde groter dan 10 naar puur zwart (R=0, G=0, B=0, A=255). Dit behoudt het exacte transparantieprofiel van elke afbeelding, waardoor nauwkeurige silhouetomtrekken ontstaan die fijne details weergeven zoals dierenoren, voertuigvormen en objectcontouren. CORS-afhandeling zorgt ervoor dat cross-origin afbeeldingen correct worden verwerkt, met een uitwijkmogelijkheid naar een massief zwart rechthoek als het canvas besmet is. De kwaliteit van deze automatische silhouetten overtreft handmatig geknipte schaduwen — elk detail van de bronafbeelding wordt nauwkeurig vastgelegd in het silhouet.',
      },
      {
        title: 'Twee Oefenmodi: Schaduw Koppelen en Maak het Compleet met Snijrichtingopties',
        description:
          'Eén generator levert twee verschillende visuele koppelactiviteiten. De Schaduw Koppelen-modus plaatst 4 gekleurde afbeeldingen in de bovenste rij en 4 automatisch gegenereerde silhouetten in de onderste rij — gebruikers identificeren elke afbeelding aan de hand van alleen de omtrekvorm. De Maak het Compleet-modus splitst 4 afbeeldingen in helften en presenteert eerste helften en tweede helften afzonderlijk — gebruikers verbinden de stukken opnieuw om elk plaatje te completeren. In de Maak het Compleet-modus kies je horizontale snijrichting (bovenste/onderste helften) of verticale snijrichting (linker/rechter helften). De indeling past zich automatisch aan: liggende pagina\'s gebruiken 2 rijen × 4 items, staande pagina\'s gebruiken 2 kolommen × 4 items. Deze twee modi in één tool verdubbelen je productaanbod — verkoop silhouet-koppelsets én gesplitste-afbeelding-puzzels vanuit dezelfde generator.',
      },
      {
        title: 'Derangement-algoritme dat Triviale Koppelingen Uitsluit',
        description:
          'Beide oefenmodi gebruiken een Fisher-Yates derangement-algoritme dat garandeert dat geen enkel item op zijn oorspronkelijke positie verschijnt. In de Schaduw Koppelen-modus zit geen enkel silhouet direct onder de bijbehorende afbeelding. In de Maak het Compleet-modus verschijnt geen enkele tweede helft naast de bijbehorende eerste helft. Dit elimineert de mogelijkheid dat gebruikers correct raden op basis van alleen positie en zorgt ervoor dat elk werkblad een echte koppeluitdaging presenteert. Het derangement wordt bij elke generatie opnieuw berekend, waardoor verschillende arrangementen ontstaan van dezelfde afbeeldingenset. Voor verkopers betekent dit: je kunt meerdere unieke werkbladvarianten produceren vanuit dezelfde 4 afbeeldingen — ideaal voor bundels met variatie.',
      },
      {
        title: 'Automatisch Gegenereerd Antwoordblad met Letter-naar-Nummer-Koppelingslabels',
        description:
          'Elk schaduw koppelen werkblad genereert automatisch een bijbehorend antwoordblad op een apart canvastabblad. Het antwoordblad gebruikt een rasterindeling waarbij elke cel de originele afbeelding toont naast het silhouet of de complete afbeelding, gelabeld met de correcte koppeling zoals "A → 2". Het raster gebruikt 4 kolommen met 50px tussenruimte vóór de tweede rij en 15px verticale afstand tussen elementen. Geen handmatig antwoordblad maken — het antwoordblad blijft altijd gesynchroniseerd met het werkblad. Download het afzonderlijk als antwoordblad JPEG of antwoordblad PDF naast het gebruikerwerkblad. Bij bundels van 20+ werkbladen bespaart deze functie uren werk — je hoeft nooit meer handmatig letter-nummer-koppelingen in te vullen op antwoordbladen.',
      },
      {
        title: 'Afbeeldingenbibliotheek met 104 Thematische Collecties en 3100+ Illustraties',
        description:
          'Blader door 104 thematische beeldcollecties over dieren, voedsel, voertuigen, natuur, beroepen, feestdagen, sport, seizoenen en tientallen meer. Elk thema biedt kleurrijke illustraties die onderscheidende silhouetten produceren met herkenbare omtrekken — dierenvormen, voertuigprofielen en objectcontouren die visuele waarneming uitdagen. Filter op thema met het dropdownmenu of zoek naar specifieke afbeeldingen op trefwoord. De Commerciële licentie bevat 10 kleurrijke thema\'s om mee te starten; Volledige Toegang ontgrendelt alle 104 thema\'s voor maximale creatieve variatie in beide oefenmodi. Kies thema\'s met complexe omtrekken — dieren met oren en staarten, voertuigen met wielen en antennes — voor de meest uitdagende schaduwkoppelingen.',
      },
      {
        title: 'Optionele Labels en Naam-/Datumvelden voor gebruikers',
        description:
          'Schakel het selectievakje "Labels tonen" in (standaard AAN) om A, B, C, D identificatoren op afbeeldingen of eerste helften weer te geven en 1, 2, 3, 4 identificatoren op silhouetten of tweede helften. Wanneer labels verborgen zijn, wordt het werkblad een puur visuele koppeluitdaging zonder letter-nummerondersteuning — ideaal voor gevorderde activiteiten of puzzelboeken waar geschreven antwoorden niet nodig zijn. Het selectievakje "Naam-/datumvelden opnemen" voegt naam- en datumregels onderaan de pagina toe voor klasverantwoording en georganiseerde beoordeling. Voor verkopers op Gumroad is de labels-schakelaar bijzonder waardevol: maak twee versies van elk werkblad — met labels voor jongere gebruikers in groep 1–3 en zonder labels als uitdagingsversie voor groep 4–6.',
      },
      {
        title: 'Printklare PDF- en JPEG-export op 300 DPI met Grijstintenmodus',
        description:
          'Download schaduw koppelen werkbladen en antwoordbladen als hoogwaardige JPEG-afbeeldingen of printklare PDF-documenten gerenderd op 300 DPI (6× vermenigvuldigingsfactor, JPEG-kwaliteit 1,0). Vier speciale downloadknoppen exporteren werkblad- en antwoordbladbestanden afzonderlijk. Paginaformaten omvatten Letter Staand, Letter Liggend, A4 Staand, A4 Liggend, Vierkant (1200×1200) en volledig aangepaste afmetingen. PDF-oriëntatie wordt automatisch gedetecteerd. Schakel grijstinten in voor inktbesparende versies — silhouetten zijn al zwart, dus grijstintenmodus beïnvloedt voornamelijk de gekleurde afbeeldingen en achtergrond. Elke export is productieklaar voor digitale downloads, gedrukte werkboeken en printbare producten.',
      },
      {
        title: 'Volledig Canvas-bewerkingssysteem met Teksttools, Uitlijning en Laagbeheer',
        description:
          'Het Fabric.js-canvas biedt volledige controle over elk element op je schaduw koppelen werkblad. Sleep, verschaal, roteer en herpositioneer afbeeldingen, tekst en gegenereerde inhoud vrijelijk. Laagbediening beheert de stapelvolgorde — breng elementen naar voren of stuur ze naar achteren. Vergrendel afgewerkte elementen terwijl je andere bewerkt. Voeg aangepaste tekst toe met zeven lettertype-opties (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), instelbare grootte en kleur, en tekstomlijning van 0 tot 10 met stappen van 0,5. Zes uitlijnopties plus centreren-op-pagina houden de opmaak precies. Zoom van 25% tot 300% voor detailwerk. Ongedaan maken en opnieuw uitvoeren met onbeperkte geschiedenis via Ctrl+Z en Ctrl+Y. Dit bewerkingsniveau stelt je in staat om merkspecifieke aanpassingen toe te voegen — je eigen logo, instructieteksten in het Nederlands, of thematische decoratieve elementen die je producten onderscheiden van concurrenten.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hoe u schaduwwerkbladen verkoopt op Etsy en Amazon KDP',
    cases: [
      {
        title: 'Thematische Schaduwkoppeling-Bundels op Etsy.nl',
        description:
          'Maak thematische schaduw koppelen pakketten met de 104 beeldcollecties — dieren-schaduwpuzzels, voertuigen-silhouetkoppeling, voedsel-schaduwuitdagingen en tientallen meer. Elk thema biedt illustraties met onderscheidende omtrekken die boeiende silhouetactiviteiten opleveren. Bundel 15–20 schaduw koppelen werkbladen per thema met antwoordbladen inbegrepen, en verkoop voor €3–€7 per bundel. Mix beide modi binnen één bundel: Schaduw Koppelen werkbladen voor silhouetherkenning en Maak het Compleet werkbladen voor ruimtelijk redeneren. De automatisch gegenereerde silhouetten en antwoordbladen elimineren de meest tijdrovende onderdelen van de productie. Omdat de werkbladen puur visueel zijn, werken ze in elke taal — verkoop dezelfde bundel aan Nederlandse, Duitse, Franse en Engelse klanten zonder aanpassingen.',
        platform: 'Etsy (etsy.nl)',
      },
      {
        title: 'Visuele Waarnemingswerkboeken op Amazon KDP',
        description:
          'Stel 50–80 schaduw koppelen werkbladen samen in een gedrukt werkboek geformateerd voor Amazon KDP. Structureer je boek met afwisselende hoofdstukken: Schaduw Koppelen-hoofdstukken bouwen silhouetherkenningsvaardigheden op terwijl Maak het Compleet-hoofdstukken ruimtelijk bewustzijn en deel-tot-geheel-redeneren ontwikkelen. Neem zowel horizontale als verticale snijrichtingen op in de Maak het Compleet-secties voor variatie. Plaats antwoordbladen achterin het boek met de automatisch gegenereerde antwoordblad-functie. De grijstintenmodus produceert inktbesparende pagina\'s klaar voor zwart-wit boekbinnenwerken. Visuele waarnemingspuzzelboeken presteren het hele jaar goed in de categorie activiteitenboeken — schaduwpuzzels hebben een universele aantrekkingskracht die niet afhankelijk is van taal of cultuur.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Lesactiviteiten als Snelle Afmaaktaken voor Gumroad',
        description:
          'Maak kant-en-klare schaduw koppelen activiteiten met naam-/datumvelden en gedrukte antwoordbladen voor gebruik online. verkopers die zoeken naar visuele discriminatie-oefeningen waarderen werkbladen die printklaar worden geleverd. Maak lesstof-gerelateerde sets: dieren-schaduwkoppeling voor biologielessen, hulpverlener-silhouetten voor maatschappijleer, voedsel-schaduwpuzzels voor gezondheidslessen. De labels-schakelaar laat je zowel ondersteunde versies (met A/B/C/D en 1/2/3/4 labels) als uitdagingsversies (labels verborgen) in hetzelfde product maken voor getrapte productpakketten. Schaduw koppelen werkbladen oefenen visuele waarneming en visuele discriminatie — vaardigheden die in elk productcatalogus voorkomen van kleuterniveau tot groep 6.',
        platform: 'Gumroad (teacherspayteachers.com)',
      },
      {
        title: 'Seizoensgebonden Schaduwkoppelingscollecties',
        description:
          'De 104 thematische beeldcollecties dekken elk seizoen en elke feestdag — Kerstmis, Halloween, Pasen, Valentijnsdag, Koningsdag, terug-naar-school, zomervakantie en meer. Silhouetactiviteiten hebben speciale aantrekkingskracht tijdens Halloween wanneer schaduw- en mysteriethema\'s van nature populair zijn — dit is het ideale moment om schaduwkoppeling-bundels uit te brengen. Maak tijdgebonden schaduw koppelen collecties die aansluiten bij piekverkoopperiodes. Neem zowel Schaduw Koppelen als Maak het Compleet werkbladen op in elke seizoensbundel voor maximale waarde en variatie. Seizoensproducten brengen hogere prijzen op tijdens hun piekperiodes — een Halloween-schaduwbundel kan €5–€8 opbrengen tegenover €3–€5 voor een standaardbundel.',
        platform: 'Etsy / Amazon KDP / Gumroad (seizoensgebonden)',
      },
      {
        title: 'Gemengde-Modus Puzzelpakketten als Premium Bundels',
        description:
          'Combineer beide oefenmodi in premium gemengde-modus puzzelpakketten die de veelzijdigheid van de generator tonen. Elk pakket bevat Schaduw Koppelen werkbladen (silhouetherkenning), Maak het Compleet werkbladen met horizontale snijrichting (boven/onder hersamenstelling) en Maak het Compleet werkbladen met verticale snijrichting (links/rechts hersamenstelling) — drie verschillende activiteitentypen vanuit één thematische beeldset. Deze drie-in-één-aanpak rechtvaardigt premium prijzen van €7–€12 per bundel. Antwoordbladen voor elk werkblad worden automatisch inbegrepen, wat professionele afwerking toevoegt die een hogere waargenomen waarde oplevert. De universele visuele aard van deze werkbladen betekent dat je ze zonder aanpassingen kunt verkopen op Etsy.nl, Etsy.com, Etsy.de en elke andere Etsy-marktplaats.',
        platform: 'Etsy / Amazon KDP (premium bundels)',
      },
    ],
  },

  faq: [
    {
      question: 'Wat zijn de twee oefenmodi en hoe verschillen ze?',
      answer:
        'De generator biedt twee verschillende modi. De Schaduw Koppelen-modus plaatst 4 gekleurde afbeeldingen in de bovenste rij en 4 automatisch gegenereerde zwarte silhouetten in de onderste rij — gebruikers koppelen elke afbeelding aan zijn schaduw door letters (A–D) te verbinden met nummers (1–4). De Maak het Compleet-modus splitst 4 afbeeldingen in helften en presenteert eerste helften (A–D) en tweede helften (1–4) afzonderlijk — gebruikers koppelen helften om elk plaatje te completeren. Schaduw Koppelen test silhouetherkenning terwijl Maak het Compleet ruimtelijk bewustzijn en deel-tot-geheel-redeneren ontwikkelt.',
    },
    {
      question: 'Hoe worden de silhouetten gegenereerd?',
      answer:
        'Silhouetten worden gemaakt door echte pixelniveau beeldverwerking, niet door CSS-filters of voorgemaakte schaduw-assets. De app laadt elke afbeelding op een canvas, extraheert elke pixel met getImageData en converteert alle pixels met een alpha-waarde groter dan 10 naar puur zwart (R=0, G=0, B=0, A=255). Dit behoudt het exacte transparantieprofiel van elke bronafbeelding, waardoor nauwkeurige zwarte silhouetten ontstaan die fijne details weergeven zoals oren, staarten, handvatten en andere onderscheidende omtrekken.',
    },
    {
      question: 'Wat zijn de snijrichtingopties in de Maak het Compleet-modus?',
      answer:
        'De Maak het Compleet-modus biedt twee snijrichtingopties via keuzerondjes: Horizontaal snijdt afbeeldingen in bovenste en onderste helften, terwijl Verticaal afbeeldingen snijdt in linker en rechter helften. De snijrichting geldt voor alle 4 afbeeldingen op het werkblad. De indeling past zich automatisch aan op basis van pagina-oriëntatie — liggende pagina\'s rangschikken items in 2 rijen × 4 items, terwijl staande pagina\'s 2 kolommen × 4 items gebruiken voor optimale visuele balans.',
    },
    {
      question: 'Hoe werkt het derangement-algoritme?',
      answer:
        'Beide modi gebruiken een Fisher-Yates derangement-algoritme dat garandeert dat geen enkel item op zijn oorspronkelijke positie verschijnt. In de Schaduw Koppelen-modus zit geen enkel silhouet direct onder de bijbehorende afbeelding. In de Maak het Compleet-modus verschijnt geen enkele tweede helft naast de bijbehorende eerste helft. Dit zorgt ervoor dat elk werkblad een echte koppeluitdaging presenteert — gebruikers kunnen niet correct raden op basis van alleen positie. Het derangement wordt bij elke generatie opnieuw berekend, waardoor verschillende arrangementen ontstaan van dezelfde afbeeldingen.',
    },
    {
      question: 'Kan ik de A/B/C/D en 1/2/3/4 labels aan- en uitzetten?',
      answer:
        'Ja. Het selectievakje "Labels tonen" in het paneel Oefeningconfiguratie (standaard AAN) bepaalt of A, B, C, D labels op afbeeldingen of eerste helften verschijnen en 1, 2, 3, 4 labels op silhouetten of tweede helften. Wanneer labels AAN staan, schrijven gebruikers letter-nummer-paren als antwoorden. Wanneer labels UIT staan, wordt het werkblad een puur visuele koppeluitdaging zonder alfanumerieke ondersteuning — handig voor puzzelboeken of gevorderde activiteiten.',
    },
    {
      question: 'Waarom zijn er altijd precies 4 opgaven per werkblad?',
      answer:
        'Het werkblad gebruikt een vast aantal van 4 koppeloplossingen (SELECT_COUNT = 4). Dit is niet aanpasbaar. Vier items bieden de optimale balans voor schaduw- en gesplitste-afbeelding-koppeling: genoeg variatie om een echte koppeluitdaging te creëren met derangement, terwijl elke afbeelding groot genoeg blijft voor gebruikers om fijne details in silhouetten en gesplitste helften te bestuderen. Het consistente 4-items-formaat werkt ook goed voor gebundelde producten waar elke pagina een voorspelbare inhoudsdichtheid heeft.',
    },
    {
      question: 'Hoe werken de naam- en datumvelden?',
      answer:
        'Schakel het selectievakje "Naam-/datumvelden opnemen" in het paneel Oefeningconfiguratie in om naam- en datumregels onderaan het werkblad toe te voegen. Wanneer ingeschakeld, kunnen gebruikers hun naam en de datum direct op de gedrukte pagina schrijven — essentieel voor klasverantwoording en georganiseerde beoordeling. Wanneer uitgeschakeld, gebruikt het werkblad het volledige paginagebied voor koppelinhoud. Deze optie werkt met zowel de Schaduw Koppelen- als de Maak het Compleet-modus.',
    },
    {
      question: 'Hoe werkt het automatisch gegenereerde antwoordblad?',
      answer:
        'De generator gebruikt een dubbel-canvassysteem met een tabblad Werkblad en een tabblad Antwoordblad. In de Schaduw Koppelen-modus toont het antwoordblad een raster waarbij elke cel de originele afbeelding naast het silhouet weergeeft met een label zoals "A → 2". In de Maak het Compleet-modus toont elke cel de volledige originele afbeelding met het koppelingslabel. Het raster gebruikt 4 kolommen met consistente tussenruimte. Beide versies worden afzonderlijk geëxporteerd met vier speciale downloadknoppen: werkblad JPEG, werkblad PDF, antwoordblad JPEG en antwoordblad PDF.',
    },
    {
      question: 'Is er een gratis proefversie?',
      answer:
        'Ja. Je kunt elke functie gebruiken — beide oefenmodi, automatisch gegenereerde silhouetten, snijrichtingopties, het antwoordblad, de volledige afbeeldingenbibliotheek, achtergrond- en kaderthema\'s, labels-schakelaar, naam-/datumvelden, teksttools en alle downloadformaten — zonder account aan te maken, creditcard in te voeren of software te installeren. Downloads van de gratis proefversie bevatten een klein watermerk. Een commerciële licentie verwijdert het watermerk en verleent volledige verkooprechten.',
    },
    {
      question: 'Is de Schaduw Koppelen Generator taalgevoelig?',
      answer:
        'Nee. Schaduw Koppelen is puur visueel — de werkbladuitvoer bevat alleen afbeeldingen, silhouetten en gesplitste helften zonder gelokaliseerde woordinhoud. De app-interface (menu\'s, knoppen, koptekst) ondersteunt alle 11 talen, maar het gegenereerde werkblad werkt identiek ongeacht taalselectie. Dit maakt schaduw koppelen werkbladen universeel verkoopbaar op alle markten zonder vertaling. De Commerciële licentie bevat 10 kleurrijke thema\'s; Volledige Toegang ontgrendelt alle 104 thema\'s en alle 11 UI-talen.',
    },
    {
      question: 'Kan ik schaduw koppelen werkbladen gemaakt met deze tool verkopen op Etsy en Amazon KDP?',
      answer:
        'Ja. Met een commerciële licentie heb je volledige rechten om je schaduw koppelen werkbladen te verkopen als digitale downloads op Etsy, als gedrukte werkboeken op Amazon KDP, als printbare producten op Gumroad, of via elk ander verkoopkanaal. De twee oefenmodi, automatisch gegenereerde silhouetten, derangement-algoritme, automatische antwoordbladen en 104 thematische beeldcollecties geven je de creatieve tools om originele, verkoopbare visuele koppelproducten te produceren.',
    },
    {
      question: 'Wat is het restitutiebeleid?',
      answer:
        'Omdat de gratis proefversie je toegang geeft tot elke functie, bieden wij geen restituties aan op aankopen van commerciële licenties. Je kunt beide oefenmodi, automatisch gegenereerde silhouetten, snijrichtingopties, het antwoordblad, de volledige afbeeldingenbibliotheek, achtergrond- en kaderthema\'s, labels-schakelaar, naam-/datumvelden, teksttools en alle downloadformaten testen voordat je koopt. De gratis proefversie is het restitutiebeleid — zorg dat de tool bij je behoeften past voordat je een licentie aanschaft.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'verbindings-werkbladen',
      anchorText: 'Verbindingswerkbladen Generator',
    },
    {
      pageType: 'bundle',
      slug: 'matchen-sorteren-pakket',
      anchorText: 'Matchen & Sorteren Pakket — alle koppel-apps in een pakket',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/dutch/shadow%20match/schaduw-koppelen-1.webp',
      primaryAlt: 'Schaduw koppelen werkblad met gekleurde afbeeldingen in bovenste rij en automatisch gegenereerde zwarte silhouetten in onderste rij met amberkleurige koptekst',
    },
    sampleGallery: [
      {
        src: '/samples/dutch/shadow%20match/schaduw-koppelen-1.webp',
        alt: 'Schaduw koppelen werkblad met vier gekleurde afbeeldingen gekoppeld aan vier zwarte silhouetten met letter- en nummerlabels',
        caption: 'Schaduw Koppelen-modus — gebruikers koppelen afbeeldingen aan hun automatisch gegenereerde silhouetten',
      },
      {
        src: '/samples/dutch/shadow%20match/schaduw-koppelen-2.webp',
        alt: 'Maak het compleet werkblad met gesplitste afbeeldingshelften die gebruikers opnieuw samenvoegen door eerste en tweede helften te koppelen',
        caption: 'Maak het Compleet-modus — gebruikers koppelen gesplitste afbeeldingshelften om plaatjes te completeren',
      },
      {
        src: '/samples/dutch/shadow%20match/schaduw-koppelen-1-answer-key.webp',
        alt: 'Schaduw koppelen antwoordblad met originele afbeeldingen naast silhouetten en correcte letter-naar-nummer-koppelingslabels',
        caption: 'Automatisch gegenereerd antwoordblad — letter-naar-nummer-labels tonen correcte koppelingen',
      },
    ],
    youtubeId: 'TYvUXJeMI98',
    videoTitle: 'Hoe Maak Je Schaduw Koppelen Werkbladen met Silhouetten en Gesplitste Afbeeldingen — Stap-voor-Stap Handleiding',
  },
};

export default content;
