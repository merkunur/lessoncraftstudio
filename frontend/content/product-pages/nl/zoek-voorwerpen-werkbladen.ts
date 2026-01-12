import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - Dutch Content
 *
 * File: frontend/content/product-pages/nl/zoek-voorwerpen-werkbladen.ts
 * URL: /nl/apps/zoek-voorwerpen-werkbladen (Dutch SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Dutch/find-objects.md
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

export const findObjectsNlContent: ProductPageContent = {
  // SEO Metadata - Dutch language-specific
  seo: {
    slug: 'zoek-voorwerpen-werkbladen',
    appId: 'find-objects',
    title: 'Zoek de Voorwerpen Werkbladen Generator - Gratis Oefenbladen voor Groep 1 2 en Groep 3',
    description: 'Maak professionele zoekwerkbladen met onze gebruiksvriendelijke generator. Jouw Volledige Toegang abonnement geeft je onbeperkte toegang tot werkbladen voor kleuters en groep 3 leerlingen. Download printklare oefenbladen gratis van extra kosten per werkblad.',
    keywords: 'zoek voorwerpen werkbladen, werkbladen groep 3, werkbladen kleuters, oefenbladen gratis, fijne motoriek, visuele discriminatie, veilig leren lezen, letters leren, rekenen werkbladen, I Spy werkbladen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/nl/apps/zoek-voorwerpen-werkbladen',
  },

  // Hero Section - FULL text from find-objects.md paragraphs 1-2
  hero: {
    title: 'Zoek de Voorwerpen Werkbladen',
    subtitle: 'Gratis Oefenbladen voor Groep 1 2 en Groep 3',
    description: `Maak professionele zoekwerkbladen met onze gebruiksvriendelijke generator. Jouw Volledige Toegang abonnement geeft je onbeperkte toegang tot werkbladen voor kleuters en groep 3 leerlingen. Download printklare oefenbladen gratis van extra kosten per werkblad. Genereer in minder dan drie minuten prachtige zoekactiviteiten.

Onze zoekgenerator biedt twee unieke modi voor werkbladen groep 3 en werkbladen kleuters. De eerste modus is "I Spy" waarbij kinderen verborgen voorwerpen zoeken tussen afleidende afbeeldingen. De tweede modus is "Vind de Vreemde Eend" waarbij leerlingen afbeeldingen zonder paar moeten identificeren.

Deze werkbladen kleuters ondersteunen de ontwikkeling van visuele waarneming en fijne motoriek. Kinderen leren vormen herkennen en verschillen opmerken. Perfect voor leerkrachten die werkbladen groep 3 nodig hebben voor visuele training. De oefenbladen gratis downloaden als PDF of JPEG.`,
    previewImageSrc: '/samples/english/find objects/find objects portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
  samples: {
    sectionTitle: 'Zoek de Voorwerpen Werkbladen Voorbeelden',
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
        worksheetSrc: '/samples/english/find objects/find objects portrait.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects portrait answer_key.jpeg',
        altText: 'Zoek de voorwerpen werkblad portret voor werkbladen groep 3 en oefenbladen gratis',
        pdfDownloadUrl: '/samples/english/find objects/find objects portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find objects/find objects landscape.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects landscape answer_key.jpeg',
        altText: 'Zoek de voorwerpen werkblad landschap met visuele discriminatie voor werkbladen kleuters',
        pdfDownloadUrl: '/samples/english/find objects/find objects landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from find-objects.md feature sections
  features: {
    sectionTitle: 'Functies van de Zoekwerkbladen Generator - Alles voor Werkbladen Groep 3 en Kleuters',
    sectionDescription: 'Deze sectie beschrijft alle functies van onze zoekwerkbladen generator. Van eenvoudig maken tot volledig aanpassen. Ontdek waarom duizenden leerkrachten kiezen voor onze werkbladen kleuters en werkbladen groep 3. Elke functie is ontworpen om tijd te besparen en professionele resultaten te leveren.',
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
        title: 'Werkbladen Kleuters in 3 Klikken Maken - Snelle Oefenbladen Gratis Generator',
        description: `Maak werkbladen kleuters in slechts drie simpele klikken. Kies eerst jouw activiteitenmodus. Selecteer daarna de afbeeldingen uit de bibliotheek. Klik op genereren en jouw werkblad verschijnt direct. Geen technische kennis nodig voor deze oefenbladen gratis te maken. De interface is intuïtief en gebruiksvriendelijk ontworpen.

Onze generator bespaart uren voorbereidingstijd per week. Waar traditionele methoden dertig tot zestig minuten kosten, maak je hier werkbladen groep 3 in minder dan drie minuten. Perfect voor drukke leerkrachten die snel materiaal nodig hebben. Combineer met veilig leren lezen activiteiten voor complete lessen.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Volledige Bewerkbaarheid op Canvas - Werkbladen Groep 3 Volledig Aanpassen',
        description: `Elk element op het canvas is volledig bewerkbaar. Sleep afbeeldingen naar elke gewenste positie. Roteer objecten om variatie te creëren. Schaal afbeeldingen groter of kleiner met de muis. Verwijder ongewenste elementen met één klik. Deze flexibiliteit maakt unieke werkbladen kleuters mogelijk.

De laagfuncties geven volledige controle over overlapping. Breng objecten naar voren of stuur ze naar achteren. Vergrendel elementen om onbedoelde wijzigingen te voorkomen. Lijn afbeeldingen perfect uit met de uitlijnhulpmiddelen. Centreer objecten horizontaal of verticaal op de pagina. Ideaal voor rekenen werkbladen met gestructureerde indelingen.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Eigen Afbeeldingen Uploaden - Werkbladen Kleuters Personaliseren met Groep 1 2 Thema\'s',
        description: `Upload jouw eigen afbeeldingen voor gepersonaliseerde werkbladen. Ondersteunt alle gangbare formaten zoals JPEG, PNG en GIF. Upload meerdere bestanden tegelijk voor snelle verwerking. Combineer eigen afbeeldingen met bibliotheekafbeeldingen. Perfect voor werkbladen groep 3 met klassenfoto's of schoolmascotte.

Gepersonaliseerde werkbladen kleuters verhogen de betrokkenheid van leerlingen. Kinderen herkennen bekende afbeeldingen en raken meer gemotiveerd. Maak thematische oefenbladen gratis met seizoensgebonden eigen foto's. De uploadfunctie werkt naadloos binnen de sessie. Jouw afbeeldingen blijven beschikbaar tijdens het werken.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Werkbladen in 11 Talen voor Veilig Leren Lezen - Letters Leren met Internationale Woordenschat',
        description: `Onze afbeeldingenbibliotheek ondersteunt elf talen volledig. Nederlands, Duits, Frans, Spaans en Portugees zijn beschikbaar. Italiaans, Zweeds, Deens, Noors en Fins eveneens. De afbeeldingsnamen verschijnen in de gekozen taal. Essentieel voor veilig leren lezen in meertalige contexten.

Deze meertaligheid maakt de generator perfect voor NT2-onderwijs. Leerlingen zien afbeeldingen met Nederlandse woorden voor letters leren. Ondersteun schrijven oefenen door woord-afbeelding koppelingen. Internationaal onderwijs profiteert van dezelfde kwaliteit werkbladen kleuters. Wereldtalen onderwijs wordt eenvoudiger met visuele woordenschat.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💼',
        title: 'Commerciële POD-Licentie voor Oefenbladen Gratis van Extra Kosten - Verkoop Werkbladen Groep 3',
        description: `Jouw Volledige Toegang abonnement bevat een complete print-on-demand licentie. Verkoop jouw werkbladen groep 3 zonder extra licentiekosten. Teachers Pay Teachers, Etsy en Amazon KDP zijn allemaal toegestaan. Geen naamsvermelding vereist bij commercieel gebruik. De licentie dekt onbeperkt commercieel gebruik.

Leerkracht-ondernemers verdienen €500 tot €5000 per maand met werkbladen. Begin met oefenbladen gratis te genereren en verkoop ze online. De professionele kwaliteit onderscheidt jouw producten van concurrenten. Combineer zoekwerkbladen met kleurplaten voor complete pakketten. Bouw een passief inkomen met werkbladen kleuters.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Bibliotheek met 3000+ Afbeeldingen - Kleurplaten Thema\'s en Rekenen Werkbladen Afbeeldingen',
        description: `Toegang tot meer dan drieduizend kindvriendelijke afbeeldingen. Elke afbeelding is professioneel ontworpen voor het onderwijs. Thematische categorieën maken zoeken eenvoudig. Van dieren tot voertuigen en van fruit tot vormen. Zoek op trefwoord om specifieke afbeeldingen te vinden. Perfect voor kleurplaten combinaties.

De bibliotheek bevat afbeeldingen voor alle vakgebieden. Gebruik dierenafbeeldingen voor rekenen werkbladen met tellen. Kies letters voor werkbladen groep 3 met alfabetactiviteiten. Selecteer getallen voor sommen tot 20 oefeningen. Seizoensthema's ondersteunen jaarlijkse lesplanning. De variëteit garandeert altijd passende content.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionele 300 DPI Kwaliteit - Werkbladen Kleuters Downloaden als PDF voor Fijne Motoriek',
        description: `Download jouw werkbladen in professionele 300 DPI resolutie. Perfect voor scherp printen op elk formaat. Kies tussen JPEG of PDF exportformaat. De grijswaardenoptie bespaart printkosten aanzienlijk. Ideaal voor werkbladen kleuters met fijne motoriek activiteiten.

Zowel het werkblad als de antwoordsleutel zijn apart downloadbaar. De antwoordsleutel toont de verborgen of ongepaarde objecten duidelijk. Leerkrachten besparen tijd bij het nakijken. Ouders kunnen thuis ondersteunen met de juiste antwoorden. Professionele kwaliteit maakt verkoop op Teachers Pay Teachers mogelijk.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🎯',
        title: 'Twee Activiteitenmodi in Eén Generator - Werkbladen Groep 3 met I Spy en Vreemde Eend',
        description: `De I Spy modus laat kinderen verborgen objecten zoeken. Selecteer één tot vijf verstopte afbeeldingen. Kies acht tot twaalf afleidende afbeeldingen als achtergrond. De generator plaatst alles automatisch op aantrekkelijke wijze. Perfect voor visuele discriminatie training in groep 1 2.

De Vreemde Eend modus traint matching vaardigheden. Kies acht tot twaalf paren van identieke afbeeldingen. Voeg één tot drie ongepaarde afbeeldingen toe. Leerlingen zoeken welke afbeeldingen geen match hebben. Beide modi genereren automatisch antwoordsleutels. Combineer met tafels oefenen voor gevarieerde lessen.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from find-objects.md step sections
  howTo: {
    sectionTitle: 'Hoe Maak Je Zoekwerkbladen in 5 Stappen - Werkbladen Groep 3 en Oefenbladen Gratis',
    sectionDescription: 'Leer in vijf eenvoudige stappen professionele zoekwerkbladen maken. Het hele proces duurt minder dan drie minuten. Geen technische kennis of ontwerpervaring nodig. Volg deze handleiding en maak direct werkbladen kleuters en werkbladen groep 3.',
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
        title: 'Stap 1: Kies Jouw Activiteitenmodus - Werkbladen Kleuters met I Spy of Vreemde Eend',
        description: `Open de zoekwerkbladen generator in jouw browser. Het eerste wat je ziet is het zijpaneel met alle opties. Zoek de sectie "Object Selectie" in het menu. Hier kies je tussen twee activiteitenmodi voor jouw werkbladen kleuters.

De I Spy modus is perfect voor klassieke zoekactiviteiten. Kinderen zoeken verborgen voorwerpen tussen afleidende afbeeldingen. Selecteer één tot vijf objecten om te verstoppen. Kies acht tot twaalf afleidende afbeeldingen als achtergrond. Deze modus traint visuele discriminatie en concentratie.

De Vreemde Eend modus werkt anders maar is even leerzaam. Hier maak je paren van identieke afbeeldingen. Voeg dan één tot drie ongepaarde afbeeldingen toe. Leerlingen moeten ontdekken welke afbeeldingen geen match hebben. Perfect voor werkbladen groep 3 met matching oefeningen. Beide modi ondersteunen fijne motoriek ontwikkeling.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Stap 2: Selecteer Afbeeldingen uit de Bibliotheek - Oefenbladen Gratis met 3000+ Afbeeldingen',
        description: `Navigeer naar de sectie "Afbeeldingenbibliotheek" in het zijpaneel. Hier vind je meer dan drieduizend kindvriendelijke afbeeldingen. Gebruik de zoekfunctie om specifieke afbeeldingen te vinden. Type bijvoorbeeld "appel" of "auto" in het zoekveld.

Filter op thema voor snellere selectie van werkbladen kleuters. Kies een thema zoals "Dieren" of "Voertuigen" uit het dropdown menu. De beschikbare afbeeldingen worden direct gefilterd. Klik op een afbeelding om deze toe te voegen aan jouw selectie. Herhaal dit voor alle gewenste afbeeldingen.

Je kunt ook een thema selecteren voor automatische vulling. In de Object Selectie sectie kies je een thema voor afleidingsafbeeldingen. De generator selecteert automatisch passende afbeeldingen. Dit bespaart tijd bij het maken van oefenbladen gratis. Combineer themakeuze met handmatige selectie voor maximale controle.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Stap 3: Genereer Jouw Werkblad - Werkbladen Groep 3 in Eén Klik Aanmaken',
        description: `Nadat je alle afbeeldingen hebt geselecteerd klik je op "Aanmaken". Deze knop bevindt zich rechtsboven in de interface. Kies "Nieuw Werkblad" uit het dropdown menu. De generator maakt direct jouw werkbladen kleuters aan.

Het werkblad verschijnt op het canvas in het midden van het scherm. Alle afbeeldingen zijn automatisch geplaatst op aantrekkelijke posities. De verborgen objecten of ongepaarde afbeeldingen zijn geïntegreerd. Het hele proces duurt slechts enkele seconden. Jouw oefenbladen gratis zijn nu klaar voor bewerking.

Bekijk het resultaat en controleer de plaatsing. Zijn alle afbeeldingen goed zichtbaar? Is de moeilijkheidsgraad geschikt voor jouw leerlingen? Zo niet, dan kun je alles aanpassen in de volgende stap. De generator geeft je volledige controle over het eindresultaat.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Stap 4: Bewerk op het Canvas - Kleurplaten Stijl en Fijne Motoriek Aanpassingen',
        description: `Klik op een afbeelding om deze te selecteren op het canvas. Er verschijnt een bewerkingswerkbalk bovenaan het scherm. Hier vind je alle opties voor jouw werkbladen kleuters. Sleep afbeeldingen naar nieuwe posities met de muis.

Gebruik de hoekpunten om afbeeldingen te schalen. Maak objecten groter voor jongere kinderen in groep 1 2. Maak ze kleiner voor uitdagender werkbladen groep 3. Roteer afbeeldingen door de rotatiehandgreep te slepen. Variatie in oriëntatie maakt de zoekactiviteit moeilijker.

De laagfuncties bepalen welke afbeeldingen voor of achter liggen. Klik op het laagicoon voor opties zoals "Naar Voren Brengen". Verberg objecten achter andere afbeeldingen voor I Spy werkbladen. De uitlijnfuncties helpen bij nette rangschikking. Centreer afbeeldingen horizontaal of verticaal op de pagina.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Stap 5: Download en Print - Werkbladen Groep 3 als PDF voor Rekenen Werkbladen Pakketten',
        description: `Jouw zoekwerkblad is klaar voor download. Klik op de "Download" knop rechtsboven. Kies jouw gewenste formaat uit het dropdown menu. JPEG is ideaal voor digitaal gebruik en online delen. PDF is perfect voor professioneel printen.

Selecteer "Werkblad PDF" voor hoogwaardige werkbladen kleuters. De 300 DPI resolutie garandeert scherpe afdrukken. Activeer de grijswaarden optie om inkt te besparen. Deze optie bevindt zich onderaan het download menu. Ideaal voor dagelijkse oefenbladen gratis in de klas.

Vergeet de antwoordsleutel niet te genereren. Klik op "Aanmaken" en selecteer "Antwoordsleutel". De generator markeert automatisch de verborgen of ongepaarde objecten. Download de antwoordsleutel apart als PDF. Bewaar beide bestanden voor eenvoudig nakijken.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-objects.md use case sections
  useCases: {
    sectionTitle: 'Perfect voor Leerkrachten en Ouders - Zoekwerkbladen voor Werkbladen Kleuters tot Werkbladen Groep 3',
    sectionDescription: 'Onze zoekwerkbladen generator bedient diverse onderwijsprofessionals en ouders. Van kleuterjuffen tot leerkracht-ondernemers. Ontdek hoe verschillende gebruikers profiteren van werkbladen groep 3 en oefenbladen gratis. Elke gebruikersgroep vindt specifieke voordelen voor hun unieke situatie.',
    badgeText: 'Voor wie',
    readMoreLabel: 'Lees meer',
    showLessLabel: 'Minder tonen',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Leerkrachten Groep 1 2 - Werkbladen Kleuters voor Fijne Motoriek en Visuele Training',
        subtitle: 'Werkbladen kleuters en fijne motoriek',
        description: `Kleuterjuffen en meesters in groep 1 en 2 gebruiken zoekwerkbladen dagelijks. De visuele discriminatie activiteiten ondersteunen de ontwikkeling van fijne motoriek. Kleuters leren vormen herkennen en verschillen opmerken. Deze vaardigheden zijn essentieel voor het latere leren lezen en schrijven.

Maak werkbladen kleuters met grote duidelijke afbeeldingen. Kies thema's die aansluiten bij de belevingswereld van vierjarigen. Dieren, speelgoed en voertuigen werken uitstekend. Gebruik de I Spy modus met slechts twee tot drie verborgen objecten. De oefenbladen gratis zijn perfect voor kringactiviteiten en zelfstandig werken.

Combineer zoekactiviteiten met letters leren opdrachten. Kies afbeeldingen die beginnen met de letter van de week. Ondersteun het veilig leren lezen programma met visuele woordenschat. Kleuters maken de koppeling tussen beeld en woord spelenderwijs. Zo bereid je hen voor op groep 3.`,
        quote: 'Mijn kleuters vinden de kleurrijke zoekwerkbladen geweldig!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Leerkrachten Groep 3 4 5 - Werkbladen Groep 3 met Rekenen Werkbladen en Tafels Oefenen',
        subtitle: 'Werkbladen groep 3 en rekenen werkbladen',
        description: `Leerkrachten in groep 3 tot en met 5 hebben gevarieerde materiaalbehoeften. Zoekwerkbladen bieden welkome afwisseling naast rekenen werkbladen. Combineer visuele activiteiten met tafels oefenen voor complete lessen. De Vreemde Eend modus traint logisch denken en matching vaardigheden.

Gebruik werkbladen groep 3 voor differentiatie in de klas. Maak eenvoudige versies voor leerlingen die extra ondersteuning nodig hebben. Creëer uitdagende werkbladen met meer objecten voor snelle leerlingen. De oefenbladen gratis downloaden bespaart kostbare voorbereidingstijd. Eén werkblad maken kost minder dan drie minuten.

Integreer zoekwerkbladen in thematisch onderwijs. Kies afbeeldingen passend bij het actuele thema zoals herfst of Sinterklaas. Voeg sommen tot 20 toe door leerlingen de gevonden objecten te laten tellen. Combineer met schrijven oefenen door woorden te laten noteren. Zo ontstaan rijke leeractiviteiten.`,
        quote: 'Zoekwerkbladen passen perfect bij onze leesmethode.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Thuisonderwijzende Ouders - Oefenbladen Gratis voor Kleurplaten en Letters Leren Thuis',
        subtitle: 'Oefenbladen gratis voor thuis',
        description: `Ouders die thuisonderwijs geven zoeken gevarieerd materiaal. Onze generator biedt onbeperkte werkbladen kleuters zonder extra kosten per werkblad. Maak elke dag nieuwe zoekactiviteiten afgestemd op jouw kind. Combineer met kleurplaten voor ontspannende leermomenten.

De zoekwerkbladen ondersteunen letters leren op speelse wijze. Kies afbeeldingen met dezelfde beginletter voor gerichte oefening. Print werkbladen groep 3 niveau voor oudere kinderen. De fijne motoriek ontwikkeling wordt gestimuleerd door het zoeken en aanwijzen. Thuisonderwijs wordt leuker met gevarieerde oefenbladen gratis.

Gebruik de antwoordsleutel voor zelfstandig nakijken door je kind. Dit stimuleert zelfredzaamheid en verantwoordelijkheid. De professionele kwaliteit motiveert kinderen om hun best te doen. Jouw thuisschool krijgt materiaal van schoolkwaliteit.`,
        quote: 'Eén tool voor al mijn kinderen op verschillende niveaus.',
      },
      {
        id: '4',
        icon: '🌐',
        title: 'NT2 en Taalonderwijs Docenten - Veilig Leren Lezen in 11 Talen met Werkbladen Kleuters',
        subtitle: 'Veilig leren lezen en taalonderwijs',
        description: `Docenten Nederlands als tweede taal profiteren van de meertalige functionaliteit. De afbeeldingenbibliotheek ondersteunt elf talen volledig. Leerlingen zien Nederlandse woorden gekoppeld aan duidelijke afbeeldingen. Dit versterkt woordenschatopbouw voor nieuwkomers.

Maak werkbladen kleuters met alledaagse voorwerpen en hun Nederlandse namen. Ondersteun het veilig leren lezen programma met visuele ondersteuning. De zoekactiviteit maakt vocabulaire leren interactief en leuk. NT2-leerlingen onthouden woorden beter door actieve betrokkenheid.

Gebruik de schrijven oefenen mogelijkheid voor woordproductie. Laat leerlingen de gevonden woorden opschrijven in hun schrift. De letters leren component integreert naadloos met zoekactiviteiten. Oefenbladen gratis maken in meerdere talen voor vergelijking. Meertalig onderwijs wordt toegankelijker.`,
        quote: 'Ik kan snel geïndividualiseerde werkbladen maken.',
      },
      {
        id: '5',
        icon: '🎓',
        title: 'Speciaal Onderwijs Leerkrachten - Fijne Motoriek en Werkbladen Groep 3 voor Differentiatie',
        subtitle: 'Fijne motoriek en speciaal onderwijs',
        description: `Leerkrachten in het speciaal onderwijs waarderen de aanpasbaarheid. Maak werkbladen kleuters met grotere afbeeldingen voor visuele ondersteuning. Verminder het aantal objecten voor leerlingen met concentratieproblemen. De fijne motoriek training helpt bij motorische ontwikkelingsachterstanden.

De visuele discriminatie activiteiten ondersteunen diverse leerdoelen. Leerlingen met dyslexie profiteren van beeld-woord koppelingen. Kinderen met autisme genieten van de voorspelbare structuur. De oefenbladen gratis aanpassen aan individuele behoeften. Geen twee werkbladen hoeven hetzelfde te zijn.

Gebruik de vergrendelfunctie voor leerlingen die structuur nodig hebben. Bepaal vooraf welke elementen vast blijven staan. Differentieer werkbladen groep 3 per leerling zonder extra werk. De tijdsbesparing is enorm vergeleken met handmatig materiaal maken.`,
        quote: 'Perfecte ondersteuning voor mijn leerlingen met speciale behoeften.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Leerkracht-Ondernemers - Kleurplaten en Rekenen Werkbladen Verkopen op Teachers Pay Teachers',
        subtitle: 'Commerciële licentie voor ondernemers',
        description: `Ondernemende leerkrachten bouwen een passief inkomen met werkbladen. Jouw Volledige Toegang abonnement bevat een volledige commerciële licentie. Verkoop zoekwerkbladen op Teachers Pay Teachers zonder extra kosten. Combineer met kleurplaten en rekenen werkbladen voor complete bundels.

Maak thematische pakketten voor seizoenen en feestdagen. Herfstbundels met pompoenen en bladeren verkopen uitstekend. Kerstpakketten met cadeaus en kerstbomen zijn populair. Voeg werkbladen groep 3 en werkbladen kleuters toe aan elk pakket. Differentiatie verhoogt de waarde voor kopers.

De professionele 300 DPI kwaliteit onderscheidt jouw producten. Geen watermerken op jouw creaties. Onbeperkt genereren betekent onbeperkt verkopen. Leerkracht-ondernemers verdienen honderden euro's per maand. Sommigen bouwen een volledig inkomen met oefenbladen gratis gegenereerd.`,
        quote: 'Mijn abonnement heeft zichzelf terugverdiend in de eerste maand!',
      },
    ],
  },

  // FAQ Section - FULL FAQs from find-objects.md
  faq: {
    sectionTitle: 'Veelgestelde Vragen over Zoekwerkbladen - Werkbladen Groep 3 en Oefenbladen Gratis FAQ',
    sectionDescription: 'Hier beantwoorden we de meest gestelde vragen over onze zoekwerkbladen generator. Van prijzen tot functies en van combinaties tot commercieel gebruik. Vind antwoorden over werkbladen kleuters en werkbladen groep 3.',
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
        question: 'Is Deze Zoekwerkbladen Generator Gratis te Gebruiken voor Rekenen Werkbladen en Tafels Oefenen?',
        answer: 'De zoekwerkbladen generator vereist een Volledige Toegang abonnement van €240 per jaar of €25 per maand. Jouw abonnement geeft onbeperkte toegang tot deze generator en alle andere rekenen werkbladen tools. Genereer zoveel werkbladen als je nodig hebt zonder extra kosten per werkblad. De tafels oefenen generator en sommen tot 20 werkbladen zijn eveneens inbegrepen. Volledige Toegang bevat alle drieëndertig werkbladgeneratoren op het platform.',
      },
      {
        id: '2',
        question: 'Kan Ik Zoekwerkbladen Thuis Printen voor Werkbladen Kleuters en Fijne Motoriek Oefeningen?',
        answer: 'Absoluut. Alle werkbladen kleuters zijn ontworpen voor thuisprinters. Download als PDF in professionele 300 DPI kwaliteit. De bestanden printen scherp op elke standaard inkjet of laserprinter. Fijne motoriek oefeningen komen perfect uit op gewoon kopieerpapier. De grijswaardenoptie bespaart inkt bij dagelijks printen. Zwart-wit werkbladen zijn even effectief voor visuele discriminatie training.',
      },
      {
        id: '3',
        question: 'Heb Ik Ontwerpvaardigheden Nodig voor Werkbladen Groep 3 met Veilig Leren Lezen Thema\'s?',
        answer: 'Geen enkele ontwerpervaring is nodig voor werkbladen groep 3. De generator doet al het werk automatisch. Selecteer afbeeldingen en klik op genereren. Het werkblad verschijnt direct klaar voor gebruik. De veilig leren lezen integratie werkt met dezelfde eenvoudige klikken. De interface is ontworpen voor leerkrachten zonder technische achtergrond. Binnen vijf minuten maak je jouw eerste werkblad.',
      },
      {
        id: '4',
        question: 'Mag Ik Zoekwerkbladen Gebruiken in Mijn Klas voor Sommen tot 20 en Tafels Oefenen Combinaties?',
        answer: 'Jouw Volledige Toegang abonnement dekt onbeperkt klasgebruik volledig. Print zoveel werkbladen als nodig voor al jouw leerlingen. Combineer zoekwerkbladen met sommen tot 20 oefenbladen voor thematische lessen. Voeg tafels oefenen werkbladen toe aan dezelfde lespakketten. Geen beperkingen op het aantal afdrukken. Gebruik de werkbladen voor reguliere lessen en extra oefening.',
      },
      {
        id: '5',
        question: 'In Welke Talen Zijn Zoekwerkbladen Beschikbaar voor Letters Leren en Schrijven Oefenen?',
        answer: 'De generator ondersteunt elf talen volledig voor letters leren activiteiten. Nederlands, Duits, Frans, Spaans en Portugees zijn beschikbaar. Italiaans, Zweeds, Deens, Noors en Fins eveneens. Engels is natuurlijk ook volledig ondersteund. Elke taal heeft complete afbeeldingsnamen voor schrijven oefenen koppelingen. Wissel tussen talen via het dropdown menu bovenaan.',
      },
      {
        id: '6',
        question: 'Kan Ik Werkbladen Kleuters Verkopen met Kleurplaten en Rekenen Werkbladen Bundels?',
        answer: 'Ja. Volledige Toegang bevat een volledige commerciële print-on-demand licentie. Verkoop jouw werkbladen kleuters op Teachers Pay Teachers zonder extra kosten. Etsy en Amazon KDP zijn eveneens toegestaan. Combineer met kleurplaten en rekenen werkbladen voor waardevolle bundels. De licentie dekt onbeperkt commercieel gebruik. Geen naamsvermelding vereist op jouw producten.',
      },
      {
        id: '7',
        question: 'Hoe Pas Ik Zoekwerkbladen Aan voor Tafels Oefenen en Sommen tot 20 Thema\'s?',
        answer: 'Elk element op het canvas is volledig aanpasbaar voor tafels oefenen thema\'s. Sleep afbeeldingen naar gewenste posities. Schaal objecten groter of kleiner. Roteer afbeeldingen voor variatie. Voeg tekst toe met rekeninstructies. Combineer zoekactiviteiten met sommen tot 20 opdrachten. Gebruik getalafbeeldingen uit de bibliotheek voor rekenwerkbladen.',
      },
      {
        id: '8',
        question: 'Voor Welke Leeftijden Werken Zoekwerkbladen met Oefenbladen Gratis het Beste?',
        answer: 'Zoekwerkbladen zijn perfect voor kinderen van vier tot negen jaar. Groep 1 2 kleuters genieten van eenvoudige I Spy activiteiten. Werkbladen groep 3 leerlingen profiteren van complexere zoekopdrachten. Groep 4 en 5 kinderen waarderen de Vreemde Eend modus. De oefenbladen gratis aanpassen aan elk niveau. Jongere kinderen krijgen werkbladen met minder en grotere afbeeldingen.',
      },
      {
        id: '9',
        question: 'Kan Ik Eigen Afbeeldingen Uploaden voor Veilig Leren Lezen en Letters Leren Werkbladen?',
        answer: 'Absoluut. De uploadfunctie accepteert jouw eigen afbeeldingen voor veilig leren lezen activiteiten. Ondersteunde formaten zijn JPEG, PNG en GIF. Upload meerdere bestanden tegelijk voor snelle verwerking. Combineer eigen afbeeldingen met bibliotheekafbeeldingen. Perfect voor gepersonaliseerde letters leren werkbladen. Upload foto\'s van klasmascotte of schoolgebouw voor herkenbare elementen.',
      },
      {
        id: '10',
        question: 'Hoe Lang Duurt Het om Werkbladen Groep 3 te Maken met Kleurplaten Kwaliteit?',
        answer: 'Het complete proces duurt minder dan drie minuten per werkblad. Afbeeldingen selecteren kost ongeveer één minuut. Genereren gebeurt in seconden. Bewerken op canvas neemt nog een minuut. Download als PDF met kleurplaten kwaliteit in 300 DPI. Sneller dan elke andere methode. Vergelijk met handmatig maken dat dertig tot zestig minuten kost.',
      },
      {
        id: '11',
        question: 'Bevatten Zoekwerkbladen Antwoordsleutels voor Rekenen Werkbladen en Tafels Oefenen Controle?',
        answer: 'Ja. De generator maakt automatisch antwoordsleutels voor elke activiteit. De verborgen objecten worden duidelijk gemarkeerd. De ongepaarde afbeeldingen in Vreemde Eend modus eveneens. Download werkblad en antwoordsleutel apart als PDF. Perfect voor rekenen werkbladen nakijken en tafels oefenen controle. Leerkrachten besparen tijd bij het nakijken.',
      },
      {
        id: '12',
        question: 'Welke Vakken Combineren Goed met Zoekwerkbladen voor Sommen tot 20 en Schrijven Oefenen?',
        answer: 'Zoekwerkbladen combineren uitstekend met alle basisvaardigheden. Sommen tot 20 door gevonden objecten te laten tellen. Schrijven oefenen door woorden van afbeeldingen te noteren. Tafels oefenen met groepjes van identieke objecten. Kleurplaten als beloning na voltooiing. De mogelijkheden zijn eindeloos. De fijne motoriek training loopt door alle activiteiten.',
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
      'Alle 33 werkblad generators',
      'Commerciële licentie inbegrepen',
      '11 talen ondersteund',
      '3000+ thematische afbeeldingen',
      '300 DPI afdrukkwaliteit',
    ],
    ctaText: 'Nu Starten',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combineer Zoekwerkbladen met Andere Generators - Complete Werkbladen Pakketten',
    sectionDescription: 'Het Volledige Toegang abonnement bevat drieëndertig werkblad generators die perfect samenwerken. Combineer zoekwerkbladen met andere tools voor complete leerpakketten. Ontdek hoe je thematische bundels maakt voor elke lesweek.',
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
        slug: 'find-and-count',
        name: 'Zoek en Tel',
        category: 'Visueel',
        icon: '🔢',
        description: 'Combineer zoekwerkbladen met zoek-en-tel activiteiten voor visuele discriminatie en rekenvaardigheden.',
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
        description: 'Vul zoekwerkbladen aan met woordzoekers voor taalrijke activiteiten met Veilig leren lezen woorden.',
      },
      {
        id: '5',
        slug: 'drawing-lines',
        name: 'Tekenlijnen',
        category: 'Fijne Motoriek',
        icon: '✏️',
        description: 'Train basislijnen voor fijne motoriek ontwikkeling naast het zoeken.',
      },
      {
        id: '6',
        slug: 'odd-one-out',
        name: 'Vreemde Eend',
        category: 'Logica',
        icon: '🦆',
        description: 'Vergelijkbare visuele discriminatie activiteiten voor afwisseling in je lesprogramma.',
      },
    ],
  },
};

export default findObjectsNlContent;
