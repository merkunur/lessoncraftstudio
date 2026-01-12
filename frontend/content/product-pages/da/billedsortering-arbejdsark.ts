import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Billedsortering Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/billedsortering-arbejdsark.ts
 * URL: /da/apps/billedsortering-arbejdsark
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Danish/picture-sort.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Picture Sort = Fuld Adgang ($240/year = 1800 kr/year)
 */

export const billedsorteringDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'billedsortering-arbejdsark',
    appId: 'picture-sort',
    title: 'Billedsortering Opgaveark - Gratis Skoleopgaver til Print - Arbejdsark Børnehaveklasse og 1. Klasse',
    description: 'Opret professionelle billedsorteringsopgaver med vores opgavegenerator. Dit Fuld Adgang abonnement giver dig ubegrænset oprettelse af arbejdsark uden betaling per opgave. Generer specialtilpassede opgaver til print perfekt til børnehaveklasse og 1. klasse elever. Download højkvalitets PDF arbejdsark på under 3 minutter.',
    keywords: 'billedsortering, opgaveark, gratis skoleopgaver, arbejdsark til print, 0. klasse opgaver, 1. klasse, børnehaveklasse, kopiark, kategorisering, sorteringsaktiviteter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/billedsortering-arbejdsark',
  },

  // Hero Section - FULL text from picture-sort.md paragraphs 1-4
  hero: {
    title: 'Billedsortering Opgaveark – Gratis Skoleopgaver',
    subtitle: 'Arbejdsark til Print til Børnehaveklasse og 1. Klasse',
    description: `Opret professionelle billedsorteringsopgaver med vores opgavegenerator. Dit Fuld Adgang abonnement giver dig ubegrænset oprettelse af arbejdsark uden betaling per opgave. Generer specialtilpassede opgaver til print perfekt til børnehaveklasse og 1. klasse elever. Download højkvalitets PDF arbejdsark på under 3 minutter.

Billedsortering opgaver hjælper børn med at udvikle kritisk tænkning og kategoriseringsevner. Vores generator gør det nemt at oprette engagerende sorteringsaktiviteter. Vælg temaer eller specifikke billeder til venstre og højre kategorier. Hver opgave inkluderer et facitark der viser korrekt sortering.

Generer opgaver til print med to sorteringskategorier perfekt til kopiark. Børn sorterer billeder i venstre eller højre gruppe baseret på fælles træk. Egnet til 0. klasse opgaver og 1. klasse undervisning. Download som PDF eller JPEG format til klasseværelset eller hjemmeundervisning.

Fuld Adgang abonnement inkluderer ubegrænset adgang til alle 33 opgavegeneratorer. Opret så mange arbejdsark som du har brug for. Intet ekstra gebyr per opgave eller per billede. Kommerciel licens inkluderet til at sælge dine opgaver.`,
    previewImageSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
    ctaLabels: {
      tryFree: 'Prøv Gratis',
      viewSamples: 'Se Eksempler',
    },
    trustBadges: {
      languages: '11 Sprog',
      images: '3000+ Billeder',
      license: 'Kommerciel Licens',
    },
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    floatingStats: {
      time: 'Klar på 3 min',
      action: 'Nemt at bruge',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/picture sort/
  samples: {
    sectionTitle: 'Billedsortering Eksempler',
    sectionDescription: 'Download gratis eksempler på arbejdsark for at se vores professionelle kvalitet',
    badgeText: 'Gratis Eksempler',
    downloadLabel: 'Download Gratis Eksempel',
    downloadingLabel: 'Downloader...',
    worksheetLabel: 'Arbejdsark',
    answerKeyLabel: 'Facitark',
    viewAllLabel: 'Se alle',
    noPdfLabel: 'Ingen PDF tilgængelig',
    freePdfCountLabel: '3 gratis downloads',
    ofLabel: 'af',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
        answerKeySrc: '/samples/english/picture sort/picture sort portrait answer_key.jpeg',
        altText: 'Billedsortering opgaveark med to kategorier til børnehaveklasse',
        pdfDownloadUrl: '/samples/english/picture sort/picture sort portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/picture sort/picture sort landscape.jpeg',
        answerKeySrc: '/samples/english/picture sort/picture sort landscape answer_key.jpeg',
        altText: 'Billedsortering arbejdsark i liggende format til 1. klasse',
        pdfDownloadUrl: '/samples/english/picture sort/picture sort landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from picture-sort.md feature sections
  features: {
    sectionTitle: 'Billedsortering Funktioner - Alt Du Behøver til Gratis Skoleopgaver og Arbejdsark til Print',
    sectionDescription: 'Vores billedsortering generator kombinerer kraftfulde funktioner med nem betjening. Opret professionelle opgaver til print på minutter. Fuld Adgang abonnement giver dig adgang til alle værktøjer uden ekstra gebyrer. Hver funktion er designet til at spare tid og skabe engagerende kopiark til børnehaveklasse og 1. klasse.',
    highlightBadgeText: 'Vigtig Funktion',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alle funktioner inkluderet',
      noHiddenFees: 'Ingen skjulte gebyrer',
      cancelAnytime: 'Opsig når som helst',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Opret Billedsortering Opgaver til Print på 3 Klik',
        description: `Vælg tema for venstre kategori og højre kategori. Klik Opret Opgaveark knappen. Din sorteringsaktivitet genereres øjeblikkeligt. Hele processen tager under ét minut fra start til færdig opgave til print.

Temabaseret generering fylder automatisk 12 billeder. Systemet sikrer ligelig fordeling mellem begge kategorier. Børn sorterer billeder baseret på det valgte tema. Perfekt til hurtig forberedelse af gratis skoleopgaver.

Vælg mellem snesevis af færdige temapar. Dyr versus køretøjer giver tydelig kontrast. Mad versus legetøj fungerer godt til yngre børn. Indendørs versus udendørs objekter lærer rumlige begreber. Hver temakombination skaber øjeblikkelig opgave til print.

Manuel billedvalg giver dig præcis kontrol. Gennemse biblioteket efter tema eller søg efter specifikke emner. Klik på billeder for at tilføje til venstre eller højre gruppe. Opret specialtilpassede opgaver til print tilpasset din undervisningsplan.

Søgefunktionen finder billeder hurtigt. Skriv æble for at se alle frugtbilleder. Søg bil for transportmuligheder. Specifikke ord giver præcise resultater. Opbyg arbejdsark omkring læseplanens ordforråd.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Rediger Alt på Dit Arbejdsark - Fuld Tilpasning af Kopiark til 0. Klasse og 1. Klasse',
        description: `Hvert element på lærredet kan redigeres frit. Træk billeder til nye positioner med musen. Roter elementer for bedre layout. Skaler billeder større eller mindre efter behov. Fuld kontrol over hver detalje.

Klik på ethvert objekt for at vælge det. Værktøjslinjen viser justeringsmuligheder. Arranger billeder i kolonner eller rækker. Centrer elementer på siden med ét klik. Præcis placering skaber professionelle arbejdsark.

Lagkontroller sender objekter fremad eller bagud. Sørg for tekst vises oven på baggrunde. Overmapper billeder for kreative layouts. Juster synlighed efter behov. Fuldt lagbaseret redigeringssystem.

Tilføj tekstfelter med brugerdefineret indhold. Vælg skrifttype og farve til overskrifter. Juster tekststørrelse for bedre læsbarhed. Perfekt til at tilpasse arbejdsark til specifikke lærebogsstandarder. Syv skrifttyper inkluderet i generatoren.

Justeringsværktøjer arrangerer flere objekter hurtigt. Venstrejuster alle billeder med ét klik. Centrer objekter vandret eller lodret. Fordel elementer jævnt på tværs af siden. Professionel layout på sekunder.

Fortryd og Gentag knapper lader dig eksperimentere sikkert. Lås elementer for at forhindre utilsigtet flytning. Slet uønskede objekter med et enkelt klik. Fuld redigerbarhed sikrer hver opgave til print ser professionel ud.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Dine Egne Billeder - Personaliser Gratis Skoleopgaver og Arbejdsark',
        description: `Multi-fil upload understøtter JPEG, PNG og GIF formater. Klik Vælg Filer knappen i Upload sektionen. Vælg flere billeder på samme tid fra din computer. Uploadede billeder vises øjeblikkeligt i din session. Hurtig upload selvom med langsomme forbindelser.

Kombiner biblioteksbilleder med dine egne fotos. Opret sorteringsopgaver med klasseværelsets genstande. Brug billeder af elevernes navne eller personlige ejendele. Personalisering øger engagement i børnehaveklasse aktiviteter. Børn genkender velkendte objekter bedre.

Uploadede billeder forbliver tilgængelige under din session. Brug dem på tværs af flere opgaver til print. Intet ekstra gebyr for billedlagring eller brug. Din Fuld Adgang abonnement inkluderer ubegrænset upload. Ingen filstørrelsesbegrænsninger på normale fotos.

Tilføj klassefotos til sorteringsaktiviteter. Opret opgaver med lokale vartegn eller begivenheder. Brug billeder fra klasseudflugter eller projekter. Brugerdefinerede billeder gør kopiark mere relevante for dine elever.

Tag fotos med smartphone eller tablet. Upload direkte fra digital kamera. Scan håndtegnede illustrationer til unikke arbejdsark. Enhver billedkilde fungerer perfekt. Fleksibel upload fra alle enheder.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprog Understøttet - Arbejdsark til Print på Dansk og 10 Andre Sprog',
        description: `Brugergrænsefladen skifter øjeblikkeligt mellem 11 sprog. Vælg Dansk, Engelsk, Tysk, Fransk, Spansk, Portugisisk, Italiensk, Hollandsk, Svensk, Norsk eller Finsk. Alle knapper og etiketter oversættes automatisk. Opret gratis skoleopgaver på hvilket som helst understøttet sprog. Ingen genindlæsning nødvendig ved sprogskift.

Billednavne bestemmer indhold sprog for tekstbaserede apps. Billedsortering bruger visuel kategorisering så sprog påvirker primært grænseflade. Vælg det sprog dine elever lærer. Perfekt til internationale skoler og flersprogede klasseværelser. Visuelle opgaver fungerer på tværs af alle sproggrænser.

Dansk sprogunderstøttelse inkluderer korrekt typografi. Alle instruktioner vises på naturligt dansk. Generér opgaver til print der matcher danske undervisningsstandarder. Børnehaveklasse og 1. klasse lærere får fuldt lokaliseret oplevelse. Æ, Ø og Å vises korrekt overalt.

Skift sprog når som helst uden at miste dit arbejde. Opret opgaver til print på flere sprog fra samme konto. Perfekt til sprogundervisning eller tosprogede programmer. Fuld Adgang inkluderer alle sprog uden ekstra omkostninger. Ét abonnement dækker alle 11 sprog.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerciel Print-on-Demand Licens - Sælg Dine Arbejdsark og Opgaver til Print',
        description: `Fuld Adgang abonnement inkluderer fuld kommerciel POD licens. Sælg dine sorteringsopgaver på Teachers Pay Teachers. Opret Etsy butik med printbare kopiark. Udgiv lavindholdsarbejdsbøger på Amazon KDP. Fuld kommerciel ret inkluderet i abonnementsprisen.

Ingen tilskrivning påkrævet på kommercielle produkter. Brug 300 DPI eksport til professionel printkvalitet. Opret produktpakker med flere opgaver til print. Kombinér sorteringsaktiviteter med andre arbejdsark typer. Sælg ubegrænset antal eksemplarer uden ekstra gebyr.

Mange lærere tjener 500-5000 kr. månedligt ved at sælge opgaver. Børnehaveklasse og 1. klasse materialer er meget efterspurgte. Tematiske pakker til ferier sælger særligt godt. Din Fuld Adgang investering kan betale sig selv gennem salg. Passive indtægter vokser over tid.

Pinterest markedsføring driver trafik til din butik. Opret iøjnefaldende pins med gratis skoleopgaver eksempler. Del snippets på Instagram og Facebook. Byg passiv indkomst med printbare arbejdsark. Sociale medier genererer organisk rækkevidde gratis.

Teachers Pay Teachers lærere rapporterer stærkt salg. Etsy shops med uddannelsesmaterialer vokser hurtigt. Amazon KDP lowcontent bøger kræver minimal vedligeholdelse. Flere salgskanaler diversificerer indtægter. Start lille og skaler op når salget stiger.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Billedbibliotek - Børnevenlige Billeder til Alle Gratis Skoleopgaver',
        description: `Adgang til over 3000 professionelle børnevenlige billeder. Organiseret efter temaer for nem browsing. Søg efter nøgleord for at finde specifikke emner. Alle billeder inkluderet i din Fuld Adgang abonnement. Intet ekstra gebyr for billedadgang eller brug.

Temaer dækker årstider, dyr, mad, transport, former og meget mere. Hvert tema indeholder snesevis af relevante billeder. Konsistent kunststil på tværs af hele biblioteket. Perfekt til sammenhængende kopiark og opgaver til print. Professionelt tegnet kunst i venlig stil.

Baggrundsbibliotek tilføjer visuelt interessante layouts. Rammetemaer giver professionelt poleret udseende. Juster gennemsigtighed for subtile eller dristige effekter. Opret arbejdsark der skiller sig ud uden ekstra designarbejde. Over 100 baggrunde og 50 rammedesigns.

Nye billeder tilføjes regelmæssigt til biblioteket. Sæsonbestemt indhold understøtter helligdage og begivenheder. Anmod om specifikke temaer gennem kundesupport. Billedbiblioteket vokser konstant for at opfylde lærebehov. Månedlige opdateringer med nyt indhold.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionel 300 DPI Kvalitet - Højkvalitets Opgaver til Print og Kopiark',
        description: `Eksportér opgaver til print i krystalklar 300 DPI opløsning. PDF format bevarer skarp detaljekvalitet. JPEG filer tilbyder kompatibilitet med alle printere. Begge formater download på sekunder. Hurtig eksport selvom for store filer.

Gråtone mulighed sparer printerblæk betydeligt. Behold al detalje mens du reducerer farveomkostninger. Perfekt til masseproduktion af arbejdsark. Børnehaveklasse lærere værdsætter blækbesparende muligheder. Op til 70% blækbesparelse sammenlignet med farve.

6x multiplikator sikrer højopløsningseksport. Billeder forbliver skarpe ved print i fuld størrelse. Tekst er læsbar selv i små skriftstørrelser. Professionel kvalitet matcher kommercielt producerede materialer. Ingen pixelering eller uklarhed.

Print derhjemme på almindeligt printerpapir. Send til professionel printservice for større mængder. Laminér opgaver til genanvendelige manipulativer. Download både opgaveark og facitark for komplet undervisningssæt.

Facitark viser løsningerne tydeligt. Korrekt sortering markeret visuelt. Børn kan selvvurdere deres arbejde. Lærere retteklar på sekunder. Automatisk genereret sammen med hver opgave.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from picture-sort.md step sections
  howTo: {
    sectionTitle: 'Sådan Opretter Du Billedsortering Opgaver til Print på 5 Nemme Trin',
    sectionDescription: 'Opret professionelle billedsortering arbejdsark på under 3 minutter. Denne trin-for-trin guide viser præcis hvordan man bruger generatoren. Ingen designerfaring påkrævet. Følg disse fem simple trin for perfekte opgaver til print hver gang. Børnehaveklasse og 1. klasse lærere kan oprette kopiark øjeblikkeligt.',
    ctaText: 'Start Nu',
    badgeText: 'Sådan Virker Det',
    stepLabel: 'Trin',
    readyTime: 'Klar på under 3 minutter',
    noSkillsNeeded: 'Intet designkendskab påkrævet',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    completionTitle: 'Færdig!',
    completionSubtitle: 'Dit arbejdsark er klar til download',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Vælg Dit Indhold til Billedsortering Opgaver til Print',
        description: `Start med at vælge sprog i sprogvælgeren. Dansk sætter grænsefladen til danske instruktioner. Åbn Sorteringskategorier sektionen i venstre sidepanel. Denne sektion kontrollerer hvilke billeder vises i din opgave til print.

For hurtig oprettelse vælg temaer fra dropdown menuerne. Vælg et tema for Venstre Kategori som Dyr. Vælg et tema for Højre Kategori som Køretøjer. Generatoren fylder automatisk 12 relevante billeder. Dette er hurtigste vej til færdige gratis skoleopgaver.

For præcis kontrol brug manuel billedvalg. Åbn Billedbibliotek sektionen. Gennemse temaer eller brug søgefeltet. Klik på billeder for at tilføje dem til venstre eller højre kategori. Opbyg din sorteringsaktivitet ét billede ad gangen.

Billedforhåndsvisning viser dine valg. Venstre kategori tæller vises separat fra højre. Maksimum 12 billeder totalt sikrer læsbar layout. Fjern billeder ved at klikke på rød slet knap. Juster kategorier indtil balancen er korrekt.

Upload sektionen lader dig tilføje egne billeder. Klik Vælg Filer for multi-fil upload. Kombiner biblioteksbilleder med dine fotos. Personlige billeder øger engagement i børnehaveklasse. Uploadede billeder forbliver i din session.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger for Arbejdsark til Print',
        description: `Åbn Sideopsætning sektionen for layoutkontrol. Vælg sidestørrelse fra dropdown menuen. Letter Stående passer standard amerikanske printere. A4 Stående er standard i Danmark og Europa. Vælg det format der matcher dine printere.

Letter Liggende giver bredere layout til flere billeder. A4 Liggende fungerer identisk på europæiske printere. Kvadrat format perfekt til sociale medieindlæg. Brugerdefineret størrelse giver præcis dimensioner i pixels. Klik Anvend Størrelse efter ændringer.

Sidefarve picker sætter baggrundsfarven. Hvid er standard for blækbesparelse. Lyse farver tilføjer visuelt interesse. Undgå mørke farver der bruger for meget blæk. Farve vises øjeblikkeligt i forhåndsvisning.

Inkluder Navn/Dato Felter checkbox tilføjer overskriftsområde. Elever skriver deres navne øverst. Datofeltet hjælper med organisering. Perfekt til kopiark der gemmes i mapper. Fjern markeringen for opgaver uden personlig identifikation.

Baggrundstema dropdown tilføjer dekorative baggrunde. Over 100 temaer tilgængelige. Gennemsigtighedsslider kontrollerer synlighed. Lave indstillinger for subtile effekter. Høje indstillinger for dristige baggrunde. Rammetema fungerer identisk til kantdekoration.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generer Din Opgave til Print',
        description: `Klik Opret Opgaveark knappen i øverste højre hjørne. Generatoren arrangerer alle valgte billeder automatisk. Venstre kategori billeder placeres på venstre side. Højre kategori billeder går til højre. Hele processen tager under 5 sekunder.

Opgaveark fanen viser det genererede arbejdsark. Billeder fordeles jævnt på tværs af lærredet. 12 billeder passer komfortabelt på én side. Layout balancerer æstetik med funktionalitet. Børn kan nemt se alle sorteringsmuligheder.

Facitark fanen viser løsningen. Korrekt sortering markeres tydeligt visuelt. Billeder grupperet efter kategori. Lærere ser øjeblikkeligt rigtig svar. Børn kan selvkontrollere deres arbejde. Skift mellem faner med ét klik.

Zoom kontroller justerer visningstørrelse. Zoom Ud for at se hele siden. Zoom Ind for detaljekontrol. Nulstil Zoom returnerer til 100%. Hjælper med at verificere små detaljer. Især nyttigt for tekstelementer.

Hvis du ikke kan lide resultatet klik Ryd Alt. Start forfra med nye valg. Fortryd knappen vender et trin tilbage. Gentag knappen genopretter fortrudte ændringer. Eksperimentér frit uden frygt for fejl.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Rediger på Lærredet - Tilpas Kopiark til 0. Klasse og 1. Klasse Behov',
        description: `Klik på ethvert billede for at vælge det. Blå kontur viser valgte objekter. Træk billeder til nye positioner med musen. Roter med hjørnehåndtagene. Skaler ved at trække sidefastgørelsespunkter. Fuld kontrol over hver detalje.

Objektværktøjslinjen vises når noget er valgt. Lag knapper sender objekter frem eller tilbage. Justeringsknapper arrangerer flere objekter. Venstrejuster sætter alle til venstre kant. Centrer vandret placerer elementer i midten. Brug disse til hurtig organisering.

Tekstværktøjer sektionen tilføjer brugerdefinerede etiketter. Skriv indhold i tekstfeltet. Klik Tilføj Tekst for at placere på lærredet. Tekst vises i centrum klar til placering. Træk til ønsket position.

Vælg tekstobjekter for at ændre egenskaber. Farvevælger ændrer tekstfarve. Størrelsesslider justerer skriftstørrelse. Skrifttypedropdown giver syv muligheder. Konturfarve og bredde tilføjer skyggeeffekter. Eksperimentér med kombinationer.

Lås knappen fryser objekter på plads. Forhindrer utilsigtede ændringer. Lås baggrundelementer mens du arbejder på forgrund. Lås Alle Op knap frigiver alt på én gang. Slet Valgte fjerner uønskede objekter. Rediger indtil opgaven ser perfekt ud.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download og Print Arbejdsark',
        description: `Klik Download knappen i øverste højre. Dropdown menu viser fire muligheder. Opgaveark JPEG downloader elevkopien som billedfil. Facitark JPEG giver svarskema som billede. JPEG filer åbner på alle enheder.

Opgaveark PDF og Facitark PDF downloader i PDF format. PDF bevarer højeste kvalitet til print. Professionelle printservices foretrækker PDF. Hjemmeprintere håndterer begge formater fint. Vælg baseret på din printopsætning.

Gråtone checkbox sparer printerblæk. Konverterer farver til gråtoner. Sparer op til 70% blæk sammenlignet med farve. Billeddetaljer forbliver klare. Perfekt til masseprint af kopiark. Særligt værdifuldt for store klasseværelser.

Filer downloader til din computer øjeblikkeligt. Find dem i Downloads mappe. Filnavne inkluderer dato og opgavetype. Organiser downloads i mapper efter emne. Print lige så mange kopier som nødvendigt. Ingen downloadbegrænsninger med Fuld Adgang.

Åbn PDF i Adobe Reader eller lignende. Kontroller forhåndsvisning før print. Vælg sidestørrelse der matcher papir. Print én kopi først for at verificere. Juster om nødvendigt og print flere. Print både opgave og facit for komplette undervisningssæt til børnehaveklasse og 1. klasse.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from picture-sort.md use case sections
  useCases: {
    sectionTitle: 'Perfekt til Pædagoger, Forældre og Undervisere',
    sectionDescription: 'Billedsortering opgaver til print gavner forskellige undervisningssituationer. Børnehaveklasse pædagoger bruger dem til kognitiv udvikling. 1. klasse lærere integrerer sortering i læseplaner. Hjemmeundervisende forældre skaber struktureret læring. Specialpædagoger differentierer efter elevbehov. Hver brugergruppe finder unik værdi.',
    badgeText: 'Hvem Er Det Til',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Børnehaveklasse Pædagoger',
        subtitle: 'Gratis Skoleopgaver og Opgaver til Print til 0. Klasse Udvikling',
        description: `Børnehaveklasse pædagoger bruger billedsortering dagligt til kognitiv udvikling. Sorteringsaktiviteter lærer kategoriseringsfærdigheder tidligt. Børn identificerer fælles træk mellem objekter. Visuel diskrimination forbedres gennem sammenligning. Disse fundamentale færdigheder forbereder på 0. klasse læring.

Opret opgaver til print med tydelige kontrasterende kategorier. Dyr versus køretøjer giver synlig forskel. Mad versus legetøj fungerer godt for 3-5 årige. Store versus små objekter lærer størrelseskoncepter. Enkle kategorier opbygger tillid før mere komplekse sorteringer.

Kombiner billedsortering med finmotorik øvelser. Børn klipper billederne ud før sortering. Lim aktiviteter styrker håndmuskulatur. Farvelægning tilføjes efter sortering er komplet. Multisensorisk læring engagerer flere udviklingsniveauer samtidigt.

Brug sorteringsopgaver til sprogudvikling. Børn forklarer hvorfor de valgte hver kategori. Samtaler opbygger ordforråd og ræsonneringsevner. Gruppe sorteringsaktiviteter fremmer social interaktion. Pædagoger evaluerer tænkningsprocesser gennem observation.`,
        quote: 'Mine elever elsker at sortere billeder i kategorier!',
      },
      {
        id: '2',
        icon: '📚',
        title: '1. Klasse og 2. Klasse Lærere',
        subtitle: 'Matematikopgaver og Læse og Skrive Arbejdsark Integration',
        description: `1. klasse lærere integrerer billedsortering i matematik og sprog. Matematikopgaver bruger sortering til at undervise i mønstre og klassifikation. Tæl objekter i hver kategori for tidlig addition. Sammenlign grupper for introduktion til større end mindre end koncepter. Dataindsamling starter med simple sorteringer.

Læse og skrive aktiviteter parres med billedsortering. Børn skriver etiketter for hver kategori. Sætningsskrivning beskriver sorteringskriterier. Ordforrådsudvikling kommer fra billednavne. Fonologisk bevidsthed øves gennem kategorinavne.

2. klasse undervisning udvider til flerkategori sorteringer. Venn diagrammer introduceres med overlappende kategorier. Logisk ræsonnering udvikles gennem komplekse klassifikationer. Videnskabelig metode undervises gennem observation og gruppering.

Kombiner billedsortering med gangetabeller øvelse. Multiplicér antal objekter i hver kategori. Opret arrays med sorterede billeder. Visuel repræsentation hjælper matematiforståelse. Konkrete manipulativer overgår til abstrakt tænkning.

Sæsonbestemt tematisk undervisning bruger sortering naturligt. Efterårsblade sorteres efter form og farve. Vinterbeklædning versus sommerbeklædning. Forårsblomster klassificeres efter type. Tematiske enheder gør læring relevant og engagerende.`,
        quote: 'Sorteringsopgaver integrerer perfekt med vores læseplan.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hjemmeundervisende Forældre',
        subtitle: 'Opgaver til Print og Arbejdsark til Flerniveau Læring',
        description: `Hjemmeundervisende forældre værdsætter fleksible opgaver til print. Billedsortering tilpasser sig flere børn på forskellige niveauer. Samme aktivitet modificeres for hver aldergruppe. Forældre sparer forberedelsestid med ét værktøj.

Opret personlige sorteringsopgaver med familiefotos. Sortér familiemedlemmer efter alder eller højde. Huslige genstande grupperes efter rum. Madsortering lærer ernæringskategorier. Personalisering øger engagement og relevans.

Kombiner billedsortering med malebog aktiviteter. Print opgaver i gråtone for farvelægning. Børn farver før de sorterer. Kunstintegration tilføjer kreativitet til logisk tænkning. Afsluttede projekter bliver familiens kunstværker.

Hjemmeundervisningssamarbejder deler opgaver til print. Forældre udveksler specialtilpassede sorteringsaktiviteter. Fuld Adgang abonnement dækker hele samarbejdet. Delte ressourcer reducerer individuelle omkostninger. Fællesskabsopbygning styrker hjemmeundervisningsnetværk.`,
        quote: 'Én generator dækker alle mine børns behov.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Sproglærere',
        subtitle: 'Lære Bogstaver og Opgaver til Print til Flersproget Undervisning',
        description: `Sproglærere bruger billedsortering til ordforrådsudvikling. Sortér objekter efter begyndelsesbogstav. Gruppér billeder efter vokal lyde. Konsonant versus vokal sortering lærer fonetik. Visuelle ledetråde understøtter sprogindlæring.

Lære bogstaver aktiviteter integreres naturligt. Alfabetsortering med billedstøtte. Børn matcher billeder til bogstavlyde. Fonologisk bevidsthed udvikles gennem auditive og visuelle forbindelser. Multisensorisk tilgang accelererer læsefærdigheder.

Tosprogede klasseværelser drager fordel af visuelle sorteringer. Billeder transcenderer sprogbarrierer. Samme aktivitet fungerer på dansk og modersmål. Konceptuel forståelse udvikles uafhængigt af sprog. Oversættelse kommer naturligt gennem anvendelse.

Andetsprogsundervisning studerende sorterer kulturelt relevante objekter. Mad fra forskellige lande grupperes. Transport metoder sammenlignes på tværs af kulturer. Sortering fremmer interkulturel forståelse. Sprogindlæring bliver meningsfuld og kontekstuel.`,
        quote: 'Visuelle opgaver hjælper mine flersprogede elever enormt.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpædagoger',
        subtitle: 'Finmotorik Øvelser og Differentielle Gratis Skoleopgaver',
        description: `Specialpædagoger bruger billedsortering til differentieret instruktion. Visuelle lærende trives med billedbaserede aktiviteter. Håndgribelige sorteringsopgaver hjælper kinæstetiske elever. Auditive forklaringer understøtter forskellige læringsstile. Multisensorisk tilgang når alle elever.

Finmotorik øvelser integreres gennem klippeaktiviteter. Børn klipper billeder før sortering. Sakseøvelse styrker håndmuskler for skrivning. Lime færdigheder udvikler præcision og koordination. Terapeutiske mål opnås gennem engagerende opgaver.

Modificer sværhedsgrad for individuelle behov. Simple to-kategori sorteringer for begyndere. Gradvist introducer flere kategorier. Visuel støtte tilføjes efter behov. Stilladsering sikrer succes på alle niveauer.

Adfærdsmål spores gennem sorteringsaktiviteter. Fokus og opmærksomhed øges ved strukturerede opgaver. Følge instruktioner øves trin for trin. Afslutning af opgaver opbygger selvværd. Målbare fremskridt dokumenteres gennem arbejdsprøver.`,
        quote: 'Jeg kan tilpasse hver opgave til elevens specifikke behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lærer Entreprenører',
        subtitle: 'Sælg Arbejdsark og Kopiark som Printbare Opgaver til Print',
        description: `Lærer entreprenører sælger billedsortering opgaver til print på flere platforme. Teachers Pay Teachers købere søger færdige sorteringsaktiviteter. Etsy shops med printbare kopiark vokser hurtigt. Amazon KDP lavindholdbøger kræver minimal vedligeholdelse. Passive indkomststrømme opbygges over tid.

Opret tematiske pakker med flere opgaver til print. Sæsonsamlinger sælger godt året rundt. Feriespecifikke sorteringer topper i december. Tilbage til skole pakker sælger i august. Strategisk timing maksimerer salg.

Kommerciel licens inkluderet i Fuld Adgang abonnement. Sælg ubegrænset eksemplarer uden ekstra gebyrer. Ingen tilskrivning påkrævet på produkter. Professionel 300 DPI kvalitet matcher kommercielle standarder. Konkurrer med etablerede udgivere.

Pinterest markedsføring driver organisk trafik gratis. Opret iøjnefaldende pins med produkteksempler. SEO optimerede beskrivelser forbedrer søgbarhed. Konsekvent posting opbygger følgere over tid. Social media konverterer til salg uden reklameomkostninger.

Mange danske lærere tjener 500-5000 kr. månedligt. Nogle tjener meget mere. Kombiner opgave-salg med almindeligt lærerarbejde. Eller gå fuldtids med opgave-skabelse. Dit Fuld Adgang abonnement på 1.800 kr. årligt betaler sig selv efter få salg af arbejdsark og kopiark.`,
        quote: 'Mit abonnement betalte sig selv i første måned!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from picture-sort.md
  faq: {
    sectionTitle: 'Ofte Stillede Spørgsmål om Billedsortering Opgaver til Print og Gratis Skoleopgaver',
    sectionDescription: 'Lærere og forældre stiller almindelige spørgsmål før tilmelding. Denne sektion besvarer de mest hyppige spørgsmål. Forstå præcist hvad Fuld Adgang inkluderer. Lær hvordan billedsortering arbejdsark fungerer. Få afklaring om kommerciel brug og printrettigheder.',
    showMoreText: 'Vis flere spørgsmål',
    showLessText: 'Vis færre',
    badgeText: 'FAQ',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    secureCheckout: 'Sikker betaling',
    cancelAnytime: 'Opsig når som helst',
    items: [
      {
        id: '1',
        question: 'Er Denne Billedsortering Generator Virkelig Gratis at Bruge for Gratis Skoleopgaver?',
        answer: 'Billedsorteringsgeneratoren kræver et Fuld Adgang abonnement der koster 1800 kr. årligt eller 200 kr. månedligt. Dit abonnement giver dig ubegrænset oprettelse af opgaver til print uden per-opgave gebyrer. Generer så mange gratis skoleopgaver arbejdsark som du har brug for uden ekstra omkostninger. Kernepakke inkluderer 10 populære opgavegeneratorer og koster 1080 kr. årligt. Fuld Adgang abonnement koster 1800 kr. årligt og inkluderer alle 33 generatortyper inklusive billedsortering. Begge abonnementer inkluderer kommerciel licensering, 11 sprog support og professionel 300 DPI kvalitetseksport.',
      },
      {
        id: '2',
        question: 'Kan Jeg Printe Billedsortering Arbejdsark Derhjemme på en Almindelig Printer til 0. Klasse og 1. Klasse?',
        answer: 'Ja. Billedsortering kopiark printer perfekt på enhver hjemmeprinter. 300 DPI opløsning sikrer skarpe billeder på standard printere. PDF og JPEG formater fungerer med alle printermærker. Download og print på almindeligt kopipapir. A4 Stående format matcher europæiske printere perfekt. Letter Stående passer amerikanske standarder. Begge størrelser tilgængelige for børnehaveklasse, 0. klasse og 1. klasse materialer. Vælg det format der matcher dit papir. Gråtone mulighed reducerer farveblækforbrug med 70%. Perfekt til masseprint af arbejdsark. Billeddetaljer forbliver klare i sort-hvid. Børn kan farvelægge gråtone udskrifter som malebog aktivitet. Sparer penge på blækpatroner.',
      },
      {
        id: '3',
        question: 'Har Jeg Brug for Designfærdigheder for at Oprette Matematikopgaver og Læse og Skrive Opgaver til Print?',
        answer: 'Ingen designerfaring påkrævet. Billedsorteringsgeneratoren er designet til lærere ikke designere. Klik Opret knappen og opgaven genereres automatisk. Tre minutters total tid fra start til færdig arbejdsark. Selv teknologi-udfordrede brugere får succes. Temabaseret generering fylder billeder automatisk. Ingen manuel placering nødvendig. Systemet arrangerer layout professionelt. Opret matematikopgaver og læse og skrive aktiviteter uden designerfaring. Point-and-click grænseflade er intuitiv. Video tutorials viser hver funktion trin for trin. Skriftlig dokumentation forklarer alle værktøjer. Kundesupport hjælper med spørgsmål. Fællesskabsforum deler tips. Designbaggrund fuldstændig unødvendig for succes.',
      },
      {
        id: '4',
        question: 'Kan Jeg Bruge Billedsortering Opgaver til Print i Mit Klasseværelse til Børnehaveklasse, 0. Klasse og 1. Klasse Elever?',
        answer: 'Fuld Adgang abonnement inkluderer ubegrænset klasseværelsesbrug. Print så mange kopier som din børnehaveklasse, 0. klasse eller 1. klasse har brug for. Ingen per-elev gebyrer eller downloadbegrænsninger. Brug opgaver til print i fysiske og virtuelle klasseværelser. Del opgaver digitalt til fjernundervisning. Upload til Google Classroom eller lignende platforme. Email til forældre til hjemmeøvelse. Ubegrænset distribution til dine elever. Fuld Adgang dækker alle klasseværelsesanvendelser. Opret differentierede opgaver til print for forskellige evneniveauer. Samme billedsorteringsaktivitet tilpasset begyndere og avancerede. Specialpædagogisk brug fuldt inkluderet. Modificer sværhedsgrad efter individuelle behov. Samarbejde med teamkollegaer er tilladt inden for samme skole.',
      },
      {
        id: '5',
        question: 'Hvilke Sprog er Tilgængelige for Matematikopgaver, Gangetabeller og Lære Bogstaver Opgaver til Print?',
        answer: 'Billedsorteringsgeneratoren understøtter 11 sprog komplet. Dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk alle inkluderet. Samme abonnement dækker alle sprog. Skift mellem sprog øjeblikkeligt. Matematikopgaver fungerer identisk på alle 11 sprog. Gangetabeller øvelser tilpasser sig hvert sprogs notation. Lære bogstaver aktiviteter matcher hvert alfabet. Fonologiske systemer respekteres automatisk. Flersproget funktionalitet uden ekstra omkostninger. Brugergrænsefladen oversættes fuldstændigt. Alle knapper, etiketter og instruktioner vises på valgt sprog. Dansk sprogversion inkluderer korrekt Æ, Ø og Å. Ingen engelsk blødning i dansk grænseflade. Fuld lokalisering sikrer naturlig oplevelse.',
      },
      {
        id: '6',
        question: 'Kan Jeg Sælge Billedsortering Arbejdsark, Malebog Sider og Finmotorik Øvelser Jeg Opretter?',
        answer: 'Ja. Fuld Adgang abonnement inkluderer fuld kommerciel print-on-demand licens uden ekstra omkostninger. Sælg dine billedsortering arbejdsark på Teachers Pay Teachers. Opret Etsy butik med printbare malebog sider. Udgiv lavindholdsarbejdsbøger med finmotorik øvelser på Amazon KDP. Ingen tilskrivning påkrævet på kommercielle produkter. Dit brand vises fremtrædende. Sælg ubegrænset antal eksemplarer. Ingen royalty betalinger ud over abonnementsgebyret. Fuld kommerciel ret til alt du opretter. Kombiner billedsortering med matematikopgaver for tematiske pakker. Par med gangetabeller for matematik samlinger. Inkluder læse og skrive aktiviteter i literacy bundles. Diversificerede produktlinjer maksimerer indtægtspotentiale. Kommerciel licens dækker alle kombinationer.',
      },
      {
        id: '7',
        question: 'Hvordan Tilpasser Jeg Billedsortering Kopiark til Mine Børnehaveklasse og 1. Klasse Elevers Behov?',
        answer: 'Fuld lærredsredigering giver komplet kontrol. Træk billeder til nye positioner. Skaler objekter større for yngre børn. Roter elementer for visuel variation. Tilpas hver detalje til specifikke behov. Upload brugerdefinerede billeder for personalisering. Brug klasseværelsesfotos for genkendelse. Inkluder elevernes navne som billeder. Lokale vartegn øger relevans. Brugerdefinerede billeder gør kopiark mere engagerende. Tekstværktøjer tilføjer specialiserede instruktioner. Skriv elevnavne direkte på opgaver. Tilføj ekstra ledetråde for støttende læring. Modificer sprogkompleksitet. Syv skrifttyper og fuld farve tilpasning. Kombiner med malebog funktionalitet. Print i gråtone for farvelægning. Børn farver før de sorterer. Integrerer kunst og logik. Finmotorik øvelser gennem farvelægning.',
      },
      {
        id: '8',
        question: 'Hvilke Aldersgrupper Fungerer Bedst med Billedsortering Matematikopgaver og Gangetabeller Opgaver til Print?',
        answer: 'Billedsortering arbejdsark fungerer til børn 3-8 år. Børnehaveklasse børn sorterer simple to-kategori grupper. 0. klasse udvider til flere kategorier. 1. klasse håndterer komplekse klassifikationer. 2. klasse integrerer med matematikopgaver. 3-4 årige profiterer af store tydelige billeder. Simpel stor versus lille sortering. Dyr versus køretøjer kontraster. Grundlæggende kategorisering opbygger kognitive færdigheder. Håndgribelige klip-og-lim versioner arbejder godt. 5-6 årige håndterer nuancerede kategorier. Farvesortering med flere farvetoner. Formeklassifikation med variationer. Temasortering på tværs af underkategorier. Gangetabeller introduktion gennem visuel gruppering. 7-8 årige kombinerer sortering med matematikopgaver. Tæl objekter i hver kategori. Sammenlign gruppestørrelser matematisk. Opret grafer fra sorteringsdata. Logisk ræsonnering gennem kompleks klassifikation. Modificer sværhedsgrad for alle aldre.',
      },
      {
        id: '9',
        question: 'Kan Jeg Uploade Mine Egne Billeder til Læse og Skrive og Lære Bogstaver Arbejdsark?',
        answer: 'Ja. Multi-fil upload understøtter JPEG, PNG og GIF formater. Klik Vælg Filer knappen og vælg flere billeder. Uploadede fotos vises øjeblikkeligt. Kombiner med biblioteksbilleder frit. Brug elevfotos til personlige læse og skrive aktiviteter. Sortér klassemedlemmer efter navnebogstaver. Alfabetsortering med velkendte ansigter. Lære bogstaver gennem personlig forbindelse. Engagement øges dramatisk. Upload billeder af klasseværelsesmaterialer. Sortér reelle objekter børn kender. Bøger versus legetøj fra eget rum. Mad fra cafeteriet sorteret. Relevans maksimerer læring. Ingen filstørrelsesbegrænsninger på normale fotos. Uploadede billeder forbliver tilgængelige under session. Brug på tværs af flere opgaver til print. Intet ekstra gebyr for upload eller lagring. Fuld Adgang inkluderer ubegrænset brugerdefineret billedbrug.',
      },
      {
        id: '10',
        question: 'Hvor Lang Tid Tager Det at Oprette Billedsortering Opgaver til Print, Matematikopgaver og Gangetabeller?',
        answer: 'Under 3 minutter fra start til færdig opgave til print. Temabaseret generering tager under 1 minut. Vælg temaer, klik Opret, download øjeblikkeligt. Hurtigere end fotokopieringstid. Manuel billedvalg tager 2-3 minutter. Gennemse bibliotek og vælg specifikke billeder. Arrangementer sker automatisk. Få justeringer om nødvendigt. Download og print klar hurtigt. Oprettelse af matematikopgaver og gangetabeller følger samme arbejdsgang. Komplekse opgaver til print tager maksimalt 5 minutter. Inkluderer brugerdefineret tekst og layoutjusteringer. Stadig 10x hurtigere end traditionelle metoder. Batch oprettelse går endnu hurtigere. Opret en uges opgaver på 15 minutter. Gem individuelt til hver dag. Organisér efter emne eller sværhedsgrad. Masse forberedelse sparer undervisningstid.',
      },
      {
        id: '11',
        question: 'Inkluderer Billedsortering Opgaver til Print Facitark for Matematikopgaver og Gangetabeller?',
        answer: 'Ja. Facitark genereres automatisk for hver opgave. Klik Facitark fanen for at se løsningen. Korrekt sortering vises tydeligt. Download separat fra elevopgaven. Begge inkluderet uden ekstra gebyr. Facitark viser billeder grupperet korrekt. Visuel repræsentation af rigtige svar. Lærere retteklar på sekunder. Elever kan selvkontrollere arbejde. Fremmer selvstændig læring. For matematikopgaver viser facit alle beregninger. Gangetabeller svarnøgler inkluderet. Step-by-step løsninger når relevant. Komplet undervisningssæt med ét klik. Spar retningstid betydeligt. Print facitark separat fra elevkopier. Gem i lærermappe til reference. Eller distribuer til elever efter fuldførelse. Fleksibel anvendelse understøtter forskellige pædagogikker. Professionelt format matcher elevopgaver.',
      },
      {
        id: '12',
        question: 'Kan Jeg Oprette Billedsortering om Specifikke Emner som Matematikopgaver, Læse og Skrive, Lære Bogstaver, Malebog og Finmotorik Øvelser?',
        answer: 'Ja. Billedbiblioteket dækker hundredvis af emner. Opret matematikopgaver med talsortering. Læse og skrive aktiviteter sorterer bogstaver. Lære bogstaver opgaver grupperer alfabetiske lyde. Malebog emner sorteres efter tema. Finmotorik øvelser gennem klipning af sorterede billeder. Matematikopgaver bruger talsortering 1-100. Sortér lige versus ulige tal. Gruppér efter tierpladser. Gangetabeller visualiseres gennem arrays. Geometriske former sorteres efter egenskaber. Fraktioner grupperes efter størrelse. Læse og skrive aktiviteter sorterer efter begyndelsesbogstaver. Vokal versus konsonant klassifikation. Lære bogstaver gennem alfabetisk rækkefølge. Ordforråd grupperet efter tema. Fonologisk bevidsthed gennem lydsortering. Tematisk indhold støtter tværfaglig læring. Videnskabsemner sorteret. Historiske perioder klassificeret. Geografiske regioner grupperet. Sociologiske koncepter kategoriseret. Billedsortering understøtter alle curriculumområder.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Fuld Adgang',
    price: 'kr. 1.800',
    priceInterval: '/år',
    priceSuffix: 'Faktureres årligt',
    benefits: [
      'Ubegrænset arbejdsark oprettelse',
      'Kommerciel licens inkluderet',
      '11 sprog understøttet',
      '3000+ tematiske billeder',
      '300 DPI printkvalitet',
      'Facitark inkluderet',
      'Alle 33 generatorer inkluderet',
    ],
    ctaText: 'Start Nu',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombiner med Andre Arbejdsark Generatorer',
    sectionDescription: 'Opret komplette læringspakker ved at kombinere billedsortering med disse komplementære generatorer. Fuld Adgang abonnement giver dig adgang til 33 forskellige opgavegeneratorer. Kombiner billedsortering med andre værktøjer for omfattende undervisningspakker.',
    ctaTitle: 'Klar til at Lave Fantastiske Arbejdsark?',
    ctaDescription: 'Tilslut dig tusindvis af pædagoger der laver professionelle arbejdsark. Ubegrænset oprettelse, kommerciel licens inkluderet.',
    primaryCtaText: 'Start Gratis Prøve',
    secondaryCtaText: 'Se Alle 33 Generatorer',
    badgeText: 'Fungerer Godt Med',
    exploreText: 'Udforsk',
    trustBadges: {
      guarantee: '30 dages garanti',
      securePayment: 'Sikker betaling',
      cancelAnytime: 'Opsig når som helst',
    },
    items: [
      {
        id: '1',
        slug: 'coloring',
        name: 'Malebilleder',
        category: 'Kunst og Kreativitet',
        icon: '🎨',
        description: 'Kombinér billedsortering med farvelægning for malebog-stil aktiviteter. Børn farver først og sorterer bagefter.',
      },
      {
        id: '2',
        slug: 'matching',
        name: 'Sammensætning',
        category: 'Visuel Læring',
        icon: '🔗',
        description: 'Styrk visuel læring ved at kombinere billedsortering med sammensætningsøvelser for varieret læring.',
      },
      {
        id: '3',
        slug: 'find-and-count',
        name: 'Find og Tæl',
        category: 'Matematik',
        icon: '🔍',
        description: 'Kombinér billedsortering med tælleøvelser for matematik-integration. Tæl objekter i hver kategori.',
      },
      {
        id: '4',
        slug: 'big-small',
        name: 'Stor og Lille',
        category: 'Begreber',
        icon: '📏',
        description: 'Kombinér størrelsessortering med billedkategorisering for at lære rumlige begreber.',
      },
      {
        id: '5',
        slug: 'odd-one-out',
        name: 'Find den der Ikke Hører Til',
        category: 'Logik',
        icon: '🎯',
        description: 'Styrk kategoriseringsevner ved at kombinere billedsortering med find-den-ulige øvelser.',
      },
      {
        id: '6',
        slug: 'shadow-match',
        name: 'Skyggematch',
        category: 'Visuel Perception',
        icon: '👤',
        description: 'Kombinér billedsortering med skyggematching for at udvikle visuel diskrimination.',
      },
    ],
  },
};

export default billedsorteringDaContent;
