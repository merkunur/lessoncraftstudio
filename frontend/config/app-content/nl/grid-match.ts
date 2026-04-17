import type { AppContent } from '../types';

const content: AppContent = {
  seo: {
    primaryKeyword: 'natekenen op raster werkblad printen',
    secondaryKeywords: [
      'raster tekening werkblad',
      'pixel art printen',
      'kopiëren op raster',
      'symmetrie raster werkblad',
    ],
    lsiKeywords: [
      'raster',
      'natekenen',
      'kopiëren',
      'symmetrie',
      'ruimtelijk inzicht',
    ],
    titleTag: 'Rasterwerkblad-generator | LessonCraftStudio',
    metaDescription: 'Maak natekenen-op-raster werkbladen met themaplaatjes. Automatische antwoorden, printbare PDF\'s. Gratis proberen.',
  },

  hero: {
    title: 'Rasterwerkblad-generator — Maak printables om te verkopen op Etsy en KDP',
    tagline:
      'Maak raster-koppelpuzzels met instelbare tegels en themaplaatjes — automatische antwoordbladen, probeer gratis met watermerk.',
    description:
      'Bouw een winstgevende productlijn op met raster-koppelpuzzels die kinderen uitdagen om patronen op een raster na te tekenen of tegels op de juiste positie terug te plaatsen. De generator verdeelt elke afbeelding in een instelbaar raster van 2×2 tot 4×4 en schudt de tegels met Fisher-Yates randomisatie, zodat u bij elke generatie een unieke puzzel krijgt. Stel 1 tot 5 aanwijzingscellen in als hints — minder hints betekent een moeilijkere puzzel, waardoor u gedifferentieerde bundels kunt samenstellen in meerdere moeilijkheidsgraden. Het dubbele-canvassysteem maakt tegelijkertijd een werkblad en een antwoordblad aan met genummerde cirkeloverlays, zodat u nooit handmatig antwoorden hoeft te maken. Kies uit meer dan 3100 illustraties in 104 thema\'s of upload uw eigen afbeeldingen voor merkgebonden puzzels. Exporteer printklare PDF\'s en JPEG\'s op 300 DPI in Letter-, A4- of aangepaste formaten. Verkoop uw puzzels als digitale downloads op Etsy, als activiteitenboeken op Amazon KDP of via Bol.com — de commerciële licentie geeft u volledige verkooprechten zonder royalty\'s per verkoop.',
  },

  ctaHeading: 'Rasterwerkbladen maken',

  howItWorks: {
    title: 'Hoe maakt u raster-koppelpuzzels in 5 stappen',
    steps: [
      {
        title: 'Stel je pagina-indeling in',
        description:
          'Open het paneel Pagina-instellingen en kies een paginaformaat: Letter Staand, Letter Liggend, A4 Staand, A4 Liggend, of een volledig aangepaste afmeting. Kies een achtergrondkleur met de kleurkiezer. Selecteer een achtergrondthema en pas de dekking aan (0–1 in stappen van 0,05), kies vervolgens een kaderthema met een eigen onafhankelijke dekkingsregelaar. Deze indelingskeuzes vormen het kader van je rasterpuzzel voordat je inhoud configureert. Let op: het vierkante paginaformaat is niet beschikbaar voor rasterpuzzels. Als je verkoopt op Etsy.nl, maak dan zowel Letter-versies voor Noord-Amerikaanse kopers als A4-versies voor Europese klanten — zo bereik je beide markten met minimale aanpassingen.',
      },
      {
        title: 'Configureer het raster',
        description:
          'Open het paneel Rasteropties en stel het aantal rijen (2–4, standaard 3) en kolommen (2–4, standaard 3) in voor je puzzelraster. Stel vervolgens het aantal aanwijzingscellen in (1–5, standaard 1) — dit zijn tegels die zichtbaar blijven op het werkblad als hints voor gebruikers. Een 3×3 raster met 1 aanwijzing creëert een uitdagende puzzel met 8 tegels om te koppelen, terwijl een 2×2 raster met 3 aanwijzingen een makkelijke opwarmer maakt met slechts 1 tegel om te plaatsen. Deze instelbare moeilijkheidsgraad maakt het eenvoudig om oplopende puzzelsets te creëren — ideaal voor gedifferentieerde bundels op Etsy.nl of Gumroad.',
      },
      {
        title: 'Selecteer een afbeelding',
        description:
          'Open het paneel Afbeeldingenbibliotheek en blader door 104 thematische collecties met meer dan 3100 kleurrijke illustraties — dieren, voedsel, voertuigen, natuur, feestdagen en tientallen meer. Filter op thema met het dropdownmenu of zoek op trefwoord. Klik op een afbeelding om deze te selecteren voor je puzzel. Het geselecteerde afbeeldingsvoorbeeld toont je keuze voordat je genereert. Je kunt ook eigen PNG-, JPG- of GIF-afbeeldingen uploaden via het paneel Eigen Afbeeldingen Uploaden om gepersonaliseerde rasterpuzzels te maken van je eigen foto\'s of illustraties — ideaal voor gepersonaliseerde producten op Etsy.',
      },
      {
        title: 'Genereer het rasterpuzzel-werkblad',
        description:
          'Klik op Genereren om de rasterpuzzel te maken. De app verdeelt je geselecteerde afbeelding in het geconfigureerde raster, toont de aanwijzingscellen met de werkelijke afbeeldingstegels zichtbaar, en markeert de overige cellen met "?" plaatshouders. Alle tegels worden geschud met Fisher-Yates randomisatie en weergegeven als een genummerd palet. Staande indelingen plaatsen het raster bovenaan met het palet eronder; liggende indelingen positioneren het raster links met het palet rechts. Een gestileerde koptekst verschijnt met een cyaankleurige achtergrond (#00BCD4), dieppurperen titel (#6A1B9A) en oranje kaderlijn (#FF8C42) met "Rasterpuzzel" en instructies in de geselecteerde taal. Elke keer dat je genereert, ontstaat een andere tegelschikking dankzij de Fisher-Yates randomisatie — zo maak je meerdere unieke puzzels van dezelfde afbeelding.',
      },
      {
        title: 'Genereer het antwoordblad en download',
        description:
          'Schakel naar het tabblad Antwoordblad om het automatisch gegenereerde antwoordblad te zien. Het toont de volledige, ongedeelde afbeelding met genummerde cirkels over elke rastercel — gele achtergrondcirkels (#ffffe0) met zwarte omlijning die het juiste paletnummer per positie tonen, in het Fredoka-lettertype. Download beide versies met de vier speciale knoppen: Werkblad JPEG, Antwoordblad JPEG, Werkblad PDF en Antwoordblad PDF op 300 DPI. Schakel grijstinten in voor inktbesparende versies. Elke export is productieklaar voor Etsy-vermeldingen, Amazon KDP-binnenwerken en Gumroad-productbestanden. Het automatische antwoordblad met genummerde cirkeloverlays bespaart je enorm veel tijd — bij bundels van 20+ puzzels scheelt dit uren handmatig antwoordbladen maken.',
      },
    ],
  },

  keyFeatures: {
    title: 'Belangrijkste functies van de raster-koppelpuzzel generator',
    features: [
      {
        title: 'Raster van Één Afbeelding met Instelbare Rijen en Kolommen (2–4 × 2–4)',
        description:
          'Elke puzzel begint met één afbeelding die wordt verdeeld in een raster van tegels. Stel 2–4 rijen en 2–4 kolommen onafhankelijk in, waardoor rasters van 2×2 (4 tegels) tot 4×4 (16 tegels) ontstaan. Het standaard 3×3 raster produceert 9 tegels — een gebalanceerd moeilijkheidsniveau voor de meeste leeftijden. Kleinere rasters werken goed voor inleidende puzzels en jongere gebruikers in groep 1–2, terwijl grotere rasters oudere gebruikers in groep 5–8 uitdagen en premium puzzelproducten opleveren. In tegenstelling tot koppelwerkbladen met meerdere afbeeldingen test de rasterpuzzel ruimtelijk redeneren en visuele analyse van één complete afbeelding. Je kunt rijen en kolommen op verschillende waarden instellen — bijvoorbeeld 2 rijen × 4 kolommen creëert een brede rechthoekige puzzel, ideaal voor panoramische afbeeldingen.',
      },
      {
        title: 'Instelbaar Aantal Aanwijzingscellen voor Schaalbare Moeilijkheidsgraad (1–5 Zichtbare Cellen)',
        description:
          'Beheer de puzzelmoeilijkheid door 1–5 aanwijzingscellen in te stellen die zichtbaar blijven op het werkblad als hints. Bij een 3×3 raster met 1 aanwijzing moeten gebruikers 8 geschude tegels koppelen — een echte uitdaging. Met 5 aanwijzingen op hetzelfde raster hoeven slechts 4 tegels gekoppeld te worden — veel toegankelijker. Deze enkele schuifregelaar transformeert dezelfde afbeelding in puzzels van makkelijk tot gevorderd, waardoor je gedifferentieerde puzzelsets kunt maken vanuit één afbeelding en één rasterconfiguratie. De standaardwaarde is 1 aanwijzingscel voor maximale uitdaging. Voor verkopers betekent dit: maak drie moeilijkheidsgraden (2 aanwijzingen = makkelijk, 1 aanwijzing = gemiddeld, 4×4 met 1 aanwijzing = moeilijk) en verkoop ze als een gedifferentieerd bundelpakket op Etsy.nl voor €5–€8.',
      },
      {
        title: 'Geschud Genummerd Tegelpalet met Fisher-Yates Randomisatie',
        description:
          'Verborgen tegels worden geschud met het Fisher-Yates algoritme en weergegeven in een genummerd palet naast het raster. Elke tegel krijgt een uniek nummer dat gebruikers als referentie gebruiken bij het invullen. De randomisatie zorgt ervoor dat elke gegenereerde puzzel een andere tegelvolgorde heeft, zelfs bij dezelfde afbeelding en rasterinstellingen. Dit betekent dat je meerdere unieke puzzelwerkbladen kunt produceren vanuit één afbeelding door simpelweg opnieuw te genereren — waardevol voor het maken van variatiepakketten zonder verschillende bronafbeeldingen nodig te hebben. Voor Etsy-verkopers is dit een enorme productiviteitsboost: één afbeelding levert 10+ unieke puzzelvarianten op, wat bundels van 20–30 puzzels haalbaar maakt met slechts een handvol bronafbeeldingen.',
      },
      {
        title: 'Automatisch Gegenereerd Antwoordblad met Genummerde Cirkeloverlays op Volledige Afbeelding',
        description:
          'Elke rasterpuzzel genereert automatisch een bijbehorend antwoordblad op een apart canvastabblad. Het antwoordblad toont de volledige, ongedeelde afbeelding met genummerde cirkels over elke rastercel — gele achtergrond (#ffffe0) cirkels met zwarte omlijning en zwarte nummertekst in het Fredoka-lettertype. Elk nummer komt overeen met de geschude paletvolgorde van het werkblad, zodat gebruikers en verkopers precies kunnen zien welke tegel waar hoort. Geen handmatig antwoordblad maken, geen apart bestand — het antwoordblad blijft altijd perfect gesynchroniseerd met het werkblad. Download het antwoordblad als JPEG of PDF naast het gebruikerwerkblad. Bij bundels van 20 puzzels bespaart deze functie letterlijk uren werk — je hoeft nooit meer handmatig nummers in te vullen op antwoordbladen.',
      },
      {
        title: 'Afbeeldingenbibliotheek met 104 Thematische Collecties en 3100+ Illustraties',
        description:
          'Blader door 104 thematische beeldcollecties over dieren, voedsel, voertuigen, natuur, beroepen, feestdagen, sport, seizoenen en tientallen meer. Elk thema biedt kleurrijke illustraties die prachtig werken als rasterpuzzel-bronafbeeldingen. Filter op thema met het dropdownmenu of zoek naar specifieke afbeeldingen op trefwoord. Klik op een afbeelding om deze als puzzelbron te selecteren. De Commerciële licentie bevat 10 kleurrijke thema\'s om mee te starten; Volledige Toegang ontgrendelt alle 104 thema\'s voor maximale creatieve variatie in al je rasterpuzzelproducten. Omdat rasterpuzzels puur visueel zijn — geen vertaling nodig — zijn je producten universeel verkoopbaar op elke markt wereldwijd.',
      },
      {
        title: 'Responsieve Staande en Liggende Indeling met Automatische Herpositionering',
        description:
          'De generator past automatisch de indeling aan op basis van pagina-oriëntatie. Staande pagina\'s (hoogte > breedte) plaatsen het raster bovenaan met 45% van de beschikbare hoogte en het genummerde palet eronder, plus een koptekst over de volle breedte (100px hoogte, 15px radius). Liggende pagina\'s (breedte > hoogte) positioneren het raster op de linkerhelft (48% van de beschikbare breedte) met het palet rechts en een compacte koptekst (70px hoogte, 35px radius). Deze automatische herpositionering zorgt ervoor dat rasterpuzzels er verzorgd uitzien op zowel Letter als A4 in beide oriëntaties zonder handmatige aanpassingen. Maak beide versies voor maximale marktdekking — Noord-Amerikaanse kopers verwachten Letter-formaat, Europese klanten verwachten A4.',
      },
      {
        title: 'Printklare PDF- en JPEG-export op 300 DPI met Grijstintenmodus',
        description:
          'Download rasterpuzzels en antwoordbladen als hoogwaardige JPEG-afbeeldingen of printklare PDF-documenten gerenderd op 300 DPI (6× vermenigvuldigingsfactor, JPEG-kwaliteit 1,0). Vier speciale downloadknoppen exporteren werkblad- en antwoordbladbestanden afzonderlijk. Paginaformaten omvatten Letter Staand, Letter Liggend, A4 Staand, A4 Liggend en volledig aangepaste afmetingen. PDF-oriëntatie wordt automatisch gedetecteerd. Schakel grijstinten in voor inktbesparende versies die toner besparen terwijl de rasterstructuur behouden blijft. Elke export is productieklaar voor digitale downloads, gedrukte werkboeken en printbare producten. De vier afzonderlijke bestanden — werkblad JPEG, werkblad PDF, antwoordblad JPEG, antwoordblad PDF — zijn direct klaar voor upload naar Etsy, Amazon KDP of Gumroad.',
      },
      {
        title: 'Volledig Canvas-bewerkingssysteem met Teksttools, Uitlijning en Laagbeheer',
        description:
          'Het Fabric.js-canvas biedt volledige controle over elk element op je rasterpuzzel. Sleep, verschaal, roteer en herpositioneer afbeeldingen, tekst en gegenereerde inhoud vrijelijk. Laagbediening beheert de stapelvolgorde — breng elementen naar voren of stuur ze naar achteren. Vergrendel afgewerkte elementen terwijl je andere bewerkt. Voeg aangepaste tekst toe met zeven lettertype-opties (Lexend Deca, Baloo 2, Nunito, Quicksand, Fredoka, Arial, Verdana), instelbare grootte en kleur, en tekstomlijning van 0 tot 10 met stappen van 0,5. Zes uitlijnopties plus centreren-op-pagina houden de opmaak precies. Zoom van 25% tot 300% voor detailwerk. Ongedaan maken en opnieuw uitvoeren tot 20 geschiedenisstappen met Ctrl+Z en Ctrl+Y. Dit bewerkingsniveau stelt je in staat om merkspecifieke aanpassingen toe te voegen aan je rasterpuzzels — ideaal voor verkopers die een herkenbare stijl willen opbouwen.',
      },
    ],
  },

  businessUseCases: {
    title: 'Hoe verkoopt u raster-koppelpuzzels online',
    cases: [
      {
        title: 'Thematische Rasterpuzzelbundels op Etsy.nl',
        description:
          'Maak thematische rasterpuzzelpakketten met de 104 beeldcollecties — dieren-rasterpuzzels, voertuigen-rasterpuzzels, feestdagen-beeldpuzzels en tientallen meer. Elk thema biedt genoeg illustraties voor 20–30 unieke puzzelwerkbladen in verschillende rastergroottes en aanwijzingsaantallen. Bundel 15–25 rasterpuzzels per thema met antwoordbladen inbegrepen, en verkoop voor €3–€7 per bundel. Voeg een mix toe van makkelijk (2×2 met 3 aanwijzingen), gemiddeld (3×3 met 2 aanwijzingen) en moeilijk (4×4 met 1 aanwijzing) in elke bundel voor brede aantrekkingskracht. Het automatisch gegenereerde antwoordblad met genummerde overlays elimineert het meest tijdrovende deel van puzzelcreatie. Omdat rasterpuzzels puur visueel zijn, werken ze in elke taal — je kunt dezelfde bundel verkopen aan Nederlandse, Duitse, Franse en Engelse klanten zonder aanpassingen.',
        platform: 'Etsy (etsy.nl)',
      },
      {
        title: 'Beeldpuzzel-werkboeken op Amazon KDP',
        description:
          'Stel 50–100 rasterpuzzels samen in een gedrukt werkboek geformateerd voor Amazon KDP. Structureer je boek op oplopende moeilijkheidsgraad: Hoofdstuk 1 gebruikt 2×2 rasters met 3 aanwijzingen voor beginners, Hoofdstuk 2 gebruikt 3×3 rasters met 2 aanwijzingen voor gemiddeld niveau, en Hoofdstuk 3 gebruikt 4×4 rasters met 1 aanwijzing voor gevorderden. Neem antwoordbladen op achterin het boek op met de automatisch gegenereerde genummerde cirkeloverlays. De grijstintenmodus produceert inktbesparende pagina\'s klaar voor zwart-wit boekbinnenwerken. Visuele waarnemingspuzzelboeken presteren goed in de categorie activiteitenboeken het hele jaar door. Met de Fisher-Yates randomisatie maak je genoeg unieke puzzelvariaties voor een compleet werkboek vanuit slechts 20–30 bronafbeeldingen.',
        platform: 'Amazon KDP (kdp.amazon.com)',
      },
      {
        title: 'Lespuzzel-activiteiten voor Gumroad',
        description:
          'Maak kant-en-klare rasterpuzzel-activiteiten voor snelle afmaaktaken, oefenactiviteit of verrijkingshoeken online. verkopers die op Gumroad zoeken naar visuele waarnemingsactiviteiten waarderen puzzels die printklaar worden geleverd met antwoordbladen. Maak lesstof-gerelateerde sets: dierenpuzzels voor biologielessen, voertuigpuzzels voor techniekonderwijs, voedingspuzzels voor gezondheidslessen. De instelbare moeilijkheidsgraad laat je differentiëren binnen één product — voeg makkelijke, gemiddelde en moeilijke versies van dezelfde thematische puzzels toe zodat verkopers op gebruikerniveau kunnen toewijzen. Rasterpuzzels oefenen ruimtelijk redeneren en visuele waarneming — vaardigheden die in elk productcatalogus voorkomen.',
        platform: 'Gumroad (teacherspayteachers.com)',
      },
      {
        title: 'Seizoensgebonden Rasterpuzzelcollecties',
        description:
          'De 104 thematische beeldcollecties dekken elk seizoen en elke feestdag — Kerstmis, Halloween, Pasen, Valentijnsdag, Koningsdag, terug-naar-school, zomervakantie en meer. Maak tijdgebonden rasterpuzzelcollecties die aansluiten bij piekverkoopperiodes. Breng Halloween-puzzelbundels uit in september, Kerstmiscollecties in oktober, Sinterklaas-puzzels in november, en Valentijnsdagpakketten in januari. Voeg meerdere rastergroottes en moeilijkheidsgraden toe aan elke seizoensbundel voor maximale waarde. Seizoensproducten brengen hogere prijzen op tijdens hun piekperiodes en creëren natuurlijke redenen voor herhaalaankopen — klanten die je Halloween-bundel kochten, komen terug voor Kerstmis.',
        platform: 'Etsy / Amazon KDP / Gumroad (seizoensgebonden)',
      },
      {
        title: 'Gepersonaliseerde Foto-rasterpuzzels als Maatwerkproducten',
        description:
          'Gebruik de functie Eigen Afbeeldingen Uploaden om rasterpuzzels te maken van elke foto of illustratie. Familiefoto-puzzels zijn unieke gepersonaliseerde cadeaus. verkopers kunnen productlijnenfoto\'s uploaden voor eindejaar-activiteiten. Huisdierfoto-puzzels, vakantiefoto-puzzels en teamfoto-puzzels creëren allemaal unieke producten. Bied aangepaste rasterpuzzelcreatie aan als premium Etsy-service waarbij klanten hun foto\'s insturen en jij gedrukte puzzelwerkbladen met antwoordbladen levert — een product met hoge marge en minimale productietijd. De instelbare rastergrootte en aanwijzingscellen laten je het moeilijkheidsniveau afstemmen op de wensen van de klant. Verkoop op Etsy.nl voor €8–€15 per gepersonaliseerde puzzelset.',
        platform: 'Etsy (gepersonaliseerde producten)',
      },
    ],
  },

  faq: [
    {
      question: 'Welke rastergroottes zijn beschikbaar voor rasterpuzzels?',
      answer:
        'De generator ondersteunt 2–4 rijen en 2–4 kolommen, onafhankelijk instelbaar. Dit creëert rasters van 2×2 (4 tegels) tot 4×4 (16 tegels). De standaard is 3×3 (9 tegels). Kleinere rasters zijn makkelijker en werken goed voor jongere gebruikers in groep 1–3; grotere rasters verhogen de moeilijkheid en visuele complexiteit voor gebruikers in groep 5–8. Je kunt rijen en kolommen op verschillende waarden instellen — bijvoorbeeld 2 rijen × 4 kolommen creëert een brede rechthoekige puzzel.',
    },
    {
      question: 'Hoe bepalen aanwijzingscellen de moeilijkheidsgraad?',
      answer:
        'Aanwijzingscellen zijn rasterposities waar de afbeeldingstegel zichtbaar blijft als hint. Stel 1–5 aanwijzingscellen in met de schuifregelaar in het paneel Rasteropties (standaard is 1). Meer aanwijzingen maken de puzzel makkelijker omdat gebruikers meer referentiepunten hebben. Bij een 3×3 raster met 1 aanwijzing moeten gebruikers 8 tegels koppelen — behoorlijk uitdagend. Met 5 aanwijzingen hoeven slechts 4 tegels gekoppeld te worden — veel toegankelijker. Deze enkele schuifregelaar laat je gedifferentieerde moeilijkheidssets maken vanuit dezelfde afbeelding.',
    },
    {
      question: 'Hoe werkt de rasterpuzzel voor gebruikers?',
      answer:
        'Het werkblad toont een raster waar sommige cellen de werkelijke afbeeldingstegel tonen (aanwijzingscellen) en de overige cellen "?" plaatshouders bevatten. Onder of naast het raster wordt een genummerd palet getoond met alle verborgen tegels in geschude volgorde. gebruikers bestuderen de aanwijzingscellen, bekijken de genummerde tegels en bepalen welk nummer in elke lege rasterpositie hoort. De opdracht vereist ruimtelijk redeneren — het koppelen van tegelinhoud aan de juiste locatie in de totale afbeelding.',
    },
    {
      question: 'Hoe werkt het automatisch gegenereerde antwoordblad?',
      answer:
        'De generator gebruikt een dubbel-canvassysteem met een tabblad Werkblad en een tabblad Antwoordblad. Het antwoordblad toont de volledige, ongedeelde afbeelding met genummerde cirkels over elke rastercel. Elke cirkel heeft een gele achtergrond (#ffffe0) met zwarte omlijning en toont het paletnummer dat op die positie hoort, in het Fredoka-lettertype. De nummers corresponderen met de geschude tegelvolgorde van het werkblad, waardoor het controleren van antwoorden eenvoudig is. Beide versies worden afzonderlijk geëxporteerd met vier speciale downloadknoppen.',
    },
    {
      question: 'Kan ik mijn eigen afbeeldingen gebruiken voor rasterpuzzels?',
      answer:
        'Ja. Het paneel Eigen Afbeeldingen Uploaden laat je PNG-, JPG- of GIF-bestanden uploaden vanaf je computer. Geüploade afbeeldingen verschijnen in een galerij onder het uploadgebied. Klik op een geüploade afbeelding om deze als puzzelbron te selecteren. Deze functie is ideaal voor het maken van gepersonaliseerde puzzels van foto\'s, eigen illustraties of merkafbeeldingen. Je kunt geüploade afbeeldingen naast de ingebouwde bibliotheek gebruiken — wissel er vrijelijk tussen.',
    },
    {
      question: 'Hoe past de indeling zich aan voor staande en liggende oriëntatie?',
      answer:
        'De generator detecteert automatisch je pagina-oriëntatie en herpositioneert elementen dienovereenkomstig. Staande pagina\'s plaatsen het raster bovenaan (met 45% van de beschikbare hoogte) met het genummerde palet eronder en een koptekst over de volle breedte. Liggende pagina\'s positioneren het raster op de linkerhelft (48% van de beschikbare breedte) met het palet rechts en een compacte koptekst. Dit zorgt ervoor dat rasterpuzzels er gebalanceerd en professioneel uitzien in beide oriëntaties zonder handmatige indelingsaanpassingen.',
    },
    {
      question: 'Kan ik meerdere unieke puzzels maken van dezelfde afbeelding?',
      answer:
        'Ja. Elke keer dat je op Genereren klikt, schudt de app tegels met Fisher-Yates randomisatie, waardoor een andere genummerde tegelvolgorde ontstaat. Aanwijzingscelposities veranderen ook tussen generaties. Dit betekent dat je meerdere verschillende puzzelwerkbladen kunt maken vanuit één afbeelding zonder instellingen te wijzigen — elk heeft andere tegelnummers en aanwijzingsposities, waardoor het unieke puzzelervaringen zijn. Voor verkopers is dit een enorme productiviteitsboost: één bronafbeelding levert 10+ unieke puzzelvarianten op.',
    },
    {
      question: 'Hoe werkt de moeilijkheidsschaling over rastergroottes en aanwijzingsaantallen?',
      answer:
        'De moeilijkheid hangt af van twee factoren: totaal aantal tegels (rastergrootte) en zichtbare aanwijzingen. Een 2×2 raster met 3 aanwijzingen laat slechts 1 tegel over om te koppelen — de makkelijkste puzzel. Een 4×4 raster met 1 aanwijzing vereist het koppelen van 15 tegels — de moeilijkste configuratie. Tussen deze uitersten kun je elk moeilijkheidsniveau creëren. Voor werkboeken met oplopende moeilijkheid: begin met 2×2 rasters (3 aanwijzingen), ga verder naar 3×3 (2 aanwijzingen) en eindig met 4×4 (1 aanwijzing) voor een natuurlijke moeilijkheidscurve.',
    },
    {
      question: 'Is er een gratis proefversie?',
      answer:
        'Ja. Je kunt elke functie gebruiken — alle rastergroottes, instelbare aanwijzingscellen, het automatisch gegenereerde antwoordblad met genummerde overlays, de volledige afbeeldingenbibliotheek, achtergrond- en kaderthema\'s, eigen afbeeldingen uploaden, teksttools en alle downloadformaten — zonder account aan te maken, creditcard in te voeren of software te installeren. Downloads van de gratis proefversie bevatten een klein watermerk. Een commerciële licentie verwijdert het watermerk en verleent volledige verkooprechten.',
    },
    {
      question: 'Is de Rasterpuzzel Generator taalgevoelig?',
      answer:
        'Nee. De Rasterpuzzel Generator is puur visueel — de puzzeluitvoer bevat alleen afbeeldingstegels en nummers, zonder gelokaliseerde woordinhoud op het werkblad zelf. De app-interface (menu\'s, knoppen, koptekst) ondersteunt alle 11 talen, maar de gegenereerde puzzel werkt identiek ongeacht taalselectie. Dit maakt rasterpuzzels universeel verkoopbaar op alle markten zonder vertaling. De Commerciële licentie bevat 10 kleurrijke thema\'s; Volledige Toegang ontgrendelt alle 104 thema\'s en alle 11 UI-talen.',
    },
    {
      question: 'Wat is het restitutiebeleid?',
      answer:
        'Omdat de gratis proefversie je toegang geeft tot elke functie, bieden wij geen restituties aan op aankopen van commerciële licenties. Je kunt alle rastergroottes, aanwijzingscelconfiguraties, het automatisch gegenereerde antwoordblad met genummerde overlays, de volledige afbeeldingenbibliotheek, achtergrond- en kaderthema\'s, eigen afbeeldingen uploaden, teksttools en alle downloadformaten testen voordat je koopt. De gratis proefversie is het restitutiebeleid — zorg dat de tool bij je behoeften past voordat je een licentie aanschaft.',
    },
  ],

  internalLinks: [
    {
      pageType: 'app',
      slug: 'verbindings-werkbladen',
      anchorText: 'Verbindingswerkblad Generator',
    },
    {
      pageType: 'app',
      slug: 'raster-puzzel-werkbladen',
      anchorText: 'Rasterpuzzel Werkblad Generator',
    },
    {
      pageType: 'bundle',
      slug: 'matchen-sorteren-pakket',
      anchorText: 'Matchen & Sorteren Pakket — Alle Koppel-Apps in Één Bundel',
    },
  ],

  visuals: {
    heroImages: {
      primary: '/samples/dutch/grid%20match/rasterpuzzel-1.webp',
      primaryAlt: 'Rasterpuzzel werkblad met afbeeldingstegels verdeeld in een raster, aanwijzingscellen zichtbaar, en genummerd tegelpalet voor koppeling',
    },
    sampleGallery: [
      {
        src: '/samples/dutch/grid%20match/rasterpuzzel-2.webp',
        alt: 'Drie bij drie rasterpuzzel met één aanwijzingscel en acht genummerde tegels in palet',
        caption: '3×3 rasterpuzzel — één aanwijzingscel zichtbaar, acht tegels om te koppelen vanuit genummerd palet',
      },
      {
        src: '/samples/dutch/grid%20match/rasterpuzzel-3.webp',
        alt: 'Rasterpuzzel met thematische afbeelding en instelbare moeilijkheidsgraad',
        caption: 'Thematische rasterpuzzel — instelbare rastergrootte en aanwijzingscellen voor gedifferentieerde puzzelsets',
      },
      {
        src: '/samples/dutch/grid%20match/rasterpuzzel-1-answer-key.webp',
        alt: 'Rasterpuzzel antwoordblad met volledige afbeelding en genummerde cirkels over elke rastercel',
        caption: 'Automatisch gegenereerd antwoordblad — genummerde cirkels tonen correcte tegelplaatsing op volledige afbeelding',
      },
    ],
    youtubeId: 'RGtED1Bnut8',
    videoTitle: 'Hoe Maak Je Rasterpuzzels met Instelbare Moeilijkheidsgraad — Stap-voor-Stap Handleiding',
  },
};

export default content;
