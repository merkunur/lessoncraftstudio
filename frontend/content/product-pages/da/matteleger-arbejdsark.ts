import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matteleger Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/matteleger-arbejdsark.ts
 * URL: /da/apps/matteleger-arbejdsark
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Danish/math-puzzle.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const mathPuzzleDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'matteleger-arbejdsark',
    appId: 'math-puzzle',
    title: 'Matteleger - Gratis Arbejdsark Generator til Børn og Børnehaveklasse',
    description: 'Lav professionelle matematikopgaver med symbolbaserede matteleger på få minutter. Generer gratis arbejdsark til børn med facitark. Perfekt til børnehaveklasse.',
    keywords: 'gratis arbejdsark, gratis arbejdsark til børn, arbejdsark til børn, arbejdsark til børnehaveklasse, matematikopgaver, matteleger, opgaver til print, gratis skoleopgaver, 1 klasse opgaver, 2 klasse matematikopgaver',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/matteleger-arbejdsark',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/danish/math-puzzle/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Matteleger gratis arbejdsark til børn - symbolbaseret matematikpuslespil til børnehaveklasse'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/danish/math-puzzle/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbejdsark matteleger - matematikopgaver til børn i 1. klasse og 2. klasse'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/danish/math-puzzle/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbejdsark til børn - symbolbaseret matematikpuslespil til børnehaveklasse'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/danish/math-puzzle/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbejdsark til børnehaveklasse - matematikopgaver med symboler'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/danish/math-puzzle/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbejdsark til børnehaveklasse - matteleger med logiske matematikopgaver'
      },
    ],
  },

  // Hero Section - FULL text from math-puzzle.md paragraphs 1-3
  hero: {
    title: 'Gratis Arbejdsark Matteleger Generator til Børn',
    subtitle: 'Gratis Arbejdsark til Børn - Symbolbaserede Matematikopgaver til Børnehaveklasse',
    description: `Lav professionelle matematikopgaver med symbolbaserede matteleger på få minutter. Dit Fuld Adgang-abonnement giver dig ubegrænset adgang til at skabe gratis arbejdsark til børn uden ekstra omkostninger pr. opgave. Generer gratis arbejdsark til børnehaveklasse, der passer perfekt til 1. klasse, 2. klasse og børnehaveklassen. Download opgaver i høj kvalitet som PDF på under 3 minutter.

Vores mattelege-generator skaber matematikopgaver, hvor symboler repræsenterer tal. Eleverne løser opgaverne ved at finde ud af, hvilket tal hvert symbol står for. Dette udvikler både matematikfærdigheder og logisk tænkning. Perfekt til arbejdsark til børn i 0. klasse til 3. klasse.

Fuld Adgang-abonnementet inkluderer kommerciel licens til print-on-demand. Sælg dine gratis arbejdsark på platforme som Teachers Pay Teachers, Etsy og Amazon KDP. Din kommercielle licens er inkluderet i abonnementsprisen på 1.797 kr. årligt uden ekstra licensomkostninger. Professionel 300 DPI-kvalitet sikrer perfekt udskrift og salg.`,
    previewImageSrc: '/samples/danish/math-puzzle/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/danish/math-puzzle/
  samples: {
    sectionTitle: 'Gratis Arbejdsark til Børn - Gratis Arbejdsark og Gratis Printables',
    sectionDescription: 'Download gratis printables - Gratis arbejdsark til børn af professionel kvalitet. Gratis arbejdsark og arbejdsark til børn perfekt til arbejdsark til børnehaveklasse. Gratis arbejdsark til børn og arbejdsark til børn inkluderer gratis printables undervisningsmateriale. Gratis arbejdsark tilgængeligt',
    badgeText: 'Gratis Eksempler',
    downloadLabel: 'Download Gratis Eksempel',
    downloadingLabel: 'Downloader...',
    worksheetLabel: 'Arbejdsark',
    answerKeyLabel: 'Facitark',
    viewAllLabel: 'Se alle',
    noPdfLabel: 'Ingen PDF tilgængelig',
    freePdfCountLabel: '5 gratis downloads',
    ofLabel: 'af',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/danish/math-puzzle/sample-1.jpeg',
        answerKeySrc: '/samples/danish/math-puzzle/sample-1-answer.jpeg',
        altText: 'Matteleger gratis arbejdsark til børn - symbolbaseret matematikpuslespil til 1. klasse og 2. klasse',
        pdfDownloadUrl: '/samples/danish/math-puzzle/sample-1.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/danish/math-puzzle/sample-2.jpeg',
        answerKeySrc: '/samples/danish/math-puzzle/sample-2-answer.jpeg',
        altText: 'Gratis arbejdsark symbolpuslespil matematikopgave til børnehaveklasse og 0. klasse',
        pdfDownloadUrl: '/samples/danish/math-puzzle/sample-2.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/danish/math-puzzle/sample-3.jpeg',
        answerKeySrc: '/samples/danish/math-puzzle/sample-3-answer.jpeg',
        altText: 'Arbejdsark til børn - matteleger med symbolbaserede matematikopgaver til børnehaveklasse',
        pdfDownloadUrl: '/samples/danish/math-puzzle/sample-3.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/danish/math-puzzle/sample-4.jpeg',
        answerKeySrc: '/samples/danish/math-puzzle/sample-4-answer.jpeg',
        altText: 'Gratis arbejdsark til børnehaveklasse - matematikpuslespil med symboler til 1. klasse',
        pdfDownloadUrl: '/samples/danish/math-puzzle/sample-4.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/danish/math-puzzle/sample-5.jpeg',
        answerKeySrc: '/samples/danish/math-puzzle/sample-5-answer.jpeg',
        altText: 'Arbejdsark til børnehaveklasse - gratis matteleger matematikopgaver til børn',
        pdfDownloadUrl: '/samples/danish/math-puzzle/sample-5.pdf',
      },
    ],
  },

  // Features Grid - FULL text from math-puzzle.md feature sections
  features: {
    sectionTitle: 'Gratis Arbejdsark og Arbejdsark til Børn - Gratis Printables og Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Vores mattelege-generator indeholder alle funktioner, du behøver for at skabe professionelle matematikopgaver. Fra simpel oprettelse på 3 klik til fuld redigeringsmuligheder på lærredet. Upload dine egne billeder, vælg mellem 3000+ biblioteksbilleder, tilføj tekst og tilpas alt. Download matematikopgaver som PDF eller JPEG i professionel 300 DPI-kvalitet.',
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
        title: 'Skab Gratis Arbejdsark på 3 Klik - Matematikopgaver til Børn',
        description: `Generering af matematikopgaver tager under 3 minutter. Vælg et billede fra vores bibliotek eller upload dit eget. Indstil gitterstørrelse fra 2×2 til 4×4 opgaver. Vælg operation: addition, subtraktion eller begge dele. Klik på Skab og din opgave vises øjeblikkeligt.

Mattelege-generatoren skaber automatisk både opgaveark og facitark. Hvert symbol i opgaven repræsenterer et tal. Eleverne løser ligningerne for at finde ud af, hvilket tal hvert symbol står for. Dette træner både matematikfærdigheder og logisk tænkning hos elever i 1. klasse og 2. klasse.

Ingen designerfærdigheder kræves for at skabe matematikopgaver. Generatoren håndterer al layoutarbejde automatisk. Du vælger indhold og indstillinger, generatoren skaber den færdige opgave. Perfekt til travle lærere, der skal bruge matematikopgaver hurtigt.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigér Dine Gratis Arbejdsark - Tilpas Alt til Børn',
        description: `Alle elementer på lærredet er fuldt redigerbare efter generering. Klik på ethvert billede, symbol eller tekst for at vælge det. Træk for at flytte, brug hjørnerne til at skalere, rotér med rotationsgrebet. Slet elementer, du ikke ønsker med slet-knappen.

Tilføj brugerdefineret tekst hvor som helst på matematikopgaverne. Vælg mellem 7 forskellige skrifttyper inklusiv Baloo 2, Nunito, Quicksand og Fredoka. Indstil tekstfarve, størrelse fra 8 pixels og opefter. Tilføj konturer til tekst med justerbar bredde og farve.

Lås objekter for at beskytte dem mod utilsigtet redigering. Låsefunktionen er perfekt til at fastholde opgavestrukturen, mens du redigerer andre elementer. Lås op igen med et enkelt klik. Fortryd- og Gentag-funktioner sikrer, at du kan eksperimentere uden risiko.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Dine Egne Billeder',
        description: `Multi-fil upload understøtter alle almindelige billedformater. Upload JPEG, PNG, GIF og andre formater direkte til generatoren. Vælg flere filer på én gang for hurtigere arbejdsgang. Uploadede billeder vises øjeblikkeligt i forhåndsvisningen.

Kombiner dine egne billeder med vores biblioteksbilleder i samme matematikopgave. Dette giver ubegrænset kreativitet til at matche opgaverne med dit pensum. Upload billeder af dine elevers yndlingskarakterer, klassemaskotten eller undervisningsemner.

Uploadede billeder gemmes i browsersessionen. De forbliver tilgængelige, mens du arbejder på forskellige matematikopgaver. Perfekt til lærere, der opretter serier af relaterede opgaver med samme billedsæt. Personaliserede opgaver øger elevengagementet betydeligt.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprog Support',
        description: `Brugerfladen understøtter 11 sprog fuldt ud. Dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Billedbiblioteket tilpasser sig automatisk til det valgte sprog. Dette gør det nemt at skabe matematikopgaver til flersproget undervisning.

Vælg sprog fra rullemenuen i sidepanelet. Hele brugerfladen skifter øjeblikkeligt til det valgte sprog. Billednavne og kategorier vises på det valgte sprog. Dette er specielt nyttigt for tosprogede klasser og internationale skoler.

Skab matematikopgaver til dansk som andetsprog, fremmedsprogstimer eller internationale elevgrupper. Samme værktøj fungerer til alle 11 sprog uden ekstra omkostninger. Fuld Adgang-abonnementet inkluderer alle sprog i prisen på 1.797 kr. årligt.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerciel Licens - Sælg Gratis Arbejdsark til Børn',
        description: `Fuld Adgang-abonnementet inkluderer fuld kommerciel print-on-demand-licens. Sælg dine matematikopgaver på Teachers Pay Teachers, Etsy, Amazon KDP og andre platforme. Ingen ekstra licensomkostninger ud over dit abonnement på 1.797 kr. årligt.

Professionel 300 DPI-kvalitet sikrer, at dine matematikopgaver ser perfekte ud trykt. Eksportér som PDF eller JPEG i høj opløsning. Ingen kreditering påkrævet på dine produkter. Skab produktpakker, bind dem sammen i bøger eller sælg som individuelle downloads.

Mange lærere tjener 3.750-37.500 kr. månedligt ved at sælge matematikopgaver og andre undervisningsressourcer. Din kommercielle licens gælder for alle 33 værktøjer i Fuld Adgang-abonnementet. Skab alsidige produktpakker ved at kombinere matematikopgaver med andre opgavetyper.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Billedbibliotek',
        description: `Vælg mellem over 3000 børnevenlige billeder organiseret efter temaer. Vælg et tema fra rullemenuen for at se alle relaterede billeder. Eller brug søgefunktionen til at finde specifikke billeder som "kat", "æble" eller "bil".

Temabaseret organisation gør det hurtigt at skabe tematiske matematikopgaver. Vælg et forår-tema for forårsopgaver, et dyre-tema til zoologi-emner eller et fødevarer-tema til sundhedsundervisning. Alle billeder er designet til at tiltrække børn i børnehaveklasse til 3. klasse.

Billedbiblioteket inkluderer også baggrunde og rammer. Vælg baggrundstemaer med justerbar gennemsigtighed. Tilføj dekorative rammer til dine matematikopgaver for en professionel finish. Alle visuelle elementer er inkluderet i dit abonnement uden ekstra omkostninger per billede.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionel 300 DPI - Gratis Arbejdsark Klar til Print',
        description: `Eksportér matematikopgaver i professionel 300 DPI-opløsning. Denne høje kvalitet sikrer skarpe, klare udskrifter på enhver printer. Perfekt til både klasseværelsesbrug og kommercielt salg. Download som JPEG eller PDF efter dine behov.

PDF-format bevarer skarp tekstkvalitet og vektorgrafik. JPEG-format er ideelt til hurtige delinger og onlineupload. Begge formater understøtter 300 DPI professionel kvalitet. Gråtone-mulighed reducerer blækforbrug ved udskrivning uden at miste kvalitet.

Download både opgaveark og facitark separat. Brug opgavearket til eleverne og facitarket til lærerens rettevejledning. Separat download giver dig fuld kontrol over, hvad der uddeles til eleverne. Begge ark kan downloades som PDF eller JPEG i én arbejdsgang.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from math-puzzle.md step sections
  howTo: {
    sectionTitle: 'Gratis Arbejdsark til Børn Oprette - Arbejdsark til Børnehaveklasse',
    sectionDescription: 'Oprettelse af professionelle matematikopgaver tager under 3 minutter fra start til download. Vælg dit indhold, tilpas indstillinger, generér opgaven, redigér på lærredet og download. Ingen designerfærdigheder kræves.',
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
        title: 'Vælg Dit Indhold til Matematikopgaver',
        description: `Start med at vælge et billede, der bruges som symbol i dine matematikopgaver. Dette billede gentages i alle ligninger i opgaven. Vælg fra vores bibliotek med 3000+ børnevenlige billeder eller upload dit eget.

Brug temavælgeren til at gennemse billedkategorier. Dyr, mad, køretøjer, former, tal og mange andre kategorier er tilgængelige. Vælg et tema, der matcher dit undervisningsemne. For eksempel dyre-temaer til naturfag eller fødevare-temaer til sundhedsundervisning.

Søgefunktionen lader dig finde specifikke billeder hurtigt. Skriv "kat", "bil" eller "æble" for at se alle matchende billeder. Klik på et billede for at vælge det til din matematikopgave. Det valgte billede vises i forhåndsvisningen.

Upload dit eget billede, hvis du vil personalisere matematikopgaverne. Klik på Upload-knappen og vælg filer fra din computer. Alle almindelige formater som JPEG, PNG og GIF understøttes. Uploadede billeder kombineres med biblioteksbilleder i samme opgave.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger',
        description: `Indstil gitterstørrelse for din matematikopgave. Vælg mellem 2×2, 3×3 eller 4×4 opgaver. Mindre gitre som 2×2 er perfekte til børnehaveklassen og 0. klasse. Større gitre som 4×4 udfordrer elever i 2. klasse og 3. klasse.

Vælg matematisk operation fra rullemenuen. Addition-opgaver træner plus-regning. Subtraktions-opgaver træner minus-regning. Vælg "Begge" for en blanding af addition og subtraktion i samme opgave. Dette varierer sværhedsgraden og holder eleverne engagerede.

Indstil sidestørrelse efter dine behov. Letter Portrait passer til standard amerikansk papir. A4 Portrait passer til europæisk papir. Liggende formater giver mere vandret plads. Kvadratiske formater er perfekte til at printe og skære til kort.

Vælg sidefarve, hvis du ønsker en farvet baggrund. Hvid er standard, men pastellfarver kan gøre matematikopgaverne mere tiltalende. Vælg baggrundstemaer og rammetemaer for ekstra visuel appel. Juster gennemsigtighed på baggrunde og rammer.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generér Din Matematikopgave',
        description: `Klik på "Skab" knappen for at generere din matematikopgave. Generatoren skaber øjeblikkeligt et gitter med matematiske ligninger. Hvert symbol repræsenterer et tal mellem 1 og 10. Eleverne skal løse ligningerne for at finde symbolværdierne.

Både opgaveark og facitark genereres automatisk. Skift mellem fanerne for at se begge versioner. Opgavearket viser ligninger med tomme felter til svar. Facitarket viser alle svar udfyldt til lærerens rettevejledning.

Generatoren sikrer, at alle ligninger er matematisk korrekte. Subtraktionsopgaver giver aldrig negative resultater. Additionsopgaver holder sig inden for passende talområder for aldersgruppen. Sværhedsgraden matcher den valgte gitterstørrelse.

Klik på "Skab" igen for at generere en ny tilfældig opgave med samme indstillinger. Dette er perfekt til at skabe flere versioner af samme opgavetype. Giv hver elev en unik opgave for at undgå afskrivning.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigér på Lærredet',
        description: `Alle elementer på lærredet er fuldt redigerbare. Klik på ethvert symbol, tekst eller billede for at vælge det. Håndtag vises rundt om det valgte objekt. Træk for at flytte, brug hjørnehåndtag til at skalere, rotér med rotationsgrebet.

Tilføj brugerdefineret tekst til dine matematikopgaver. Skriv instruktioner, elevnavn eller opgavetitel. Vælg skrifttype, farve og størrelse. Tilføj konturer til tekst for bedre læsbarhed. Placér tekst hvor som helst på opgaven.

Brug lagerværktøjerne til at justere elementplacering. Bring vigtige elementer frem, send dekorative elementer bagud. Justeringsværktøjer lader dig flugte objekter perfekt. Centrér overskrifter på siden med ét klik.

Lås elementer, du er tilfreds med, for at beskytte dem. Redigér andre dele af opgaven uden at flytte låste objekter utilsigtet. Lås op igen når som helst. Fortryd- og Gentag-knapper sikrer, at du kan eksperimentere frit.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download og Print',
        description: `Klik på Download-knappen og vælg dit format. PDF bevarer skarp tekstkvalitet og er ideelt til udskrivning. JPEG er perfekt til hurtigt at dele på email eller læringsplatforme. Begge formater eksporteres i professionel 300 DPI-kvalitet.

Download opgavearket og facitarket separat. Vælg "Opgaveark (PDF)" til elevkopier. Vælg "Facitark (PDF)" til din rettevejledning. Begge kan downloades i samme session. Filerne navngives automatisk, så de er nemme at organisere.

Aktivér gråtone-muligheden for at spare blæk ved udskrivning. Gråtone-versioner printer perfekt på sort-hvide printere. Alle billeder og symboler forbliver klare og genkendelige i gråtone. Dette reducerer udskrivningsomkostninger betydeligt.

Print matematikopgaverne direkte fra PDF-filen. Send JPEG-filer til elever via læringsplatforme. Upload til Google Classroom, Seesaw eller anden software. Filerne er klar til brug med det samme uden yderligere bearbejdning.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from math-puzzle.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbejdsark til Børn - Perfekt til Lærere og Forældre',
    sectionDescription: 'Matematikopgaver med symbolbaserede puslespil passer til mange forskellige undervisningssituationer. Børnehavepædagoger, indskolingslærere, hjemmeskolelærere og specialundervisere bruger alle denne type opgaver.',
    badgeText: 'Hvem Er Det Til',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Børnehaveklasse og 0. Klasse Pædagoger',
        subtitle: 'Matematikopgaver Kombineret med Finmotorik Øvelser og Farvelægning',
        description: `Pædagoger i børnehaveklassen og 0. klasse bruger matematikopgaver til at introducere talforståelse og logisk tænkning. Symbolbaserede puslespil engagerer unge elever visuelt. Tilføj farverige billeder, der fanger deres opmærksomhed. Indstil mindre gitre som 2×2 for passende sværhedsgrad.

Kombiner matematikopgaver med finmotorik øvelser for alsidige læringspakker. Efter at have løst symbolpuslespillet kan elever farvelægge symbolerne. Dette udvikler både matematiske færdigheder og hånd-øje koordination. Skab malebog-sider med matematikindhold til integreret læring.

Mange børnehavelærere inkluderer matematikopgaver i morgenstunder eller centertid. Symbolpuslespil fungerer godt som stille aktiviteter, der holder børn engagerede. Kombiner med opgaver til print til lære bogstaver for komplette forberedelsespakker. Farvelægning af matematikopgaver gør tal sjove og tilgængelige.

Upload billeder af klassemaskotten eller børnenes yndlingsfigurer. Personaliserede symboler øger engagementet betydeligt hos små børn. Kombiner matematikopgaver med kopiark til navneskrivning og finmotorik øvelser. Skab tematiske læringscentre med matematik, literacy og kunst integreret.`,
        quote: 'Mine elever elsker at løse symbolpuslespillene!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lærere i 1. Klasse til 3. Klasse',
        subtitle: 'Arbejdsark til Matematikopgaver, Gangetabeller og Læse og Skrive Aktiviteter',
        description: `Indskolingslærere bruger matematikopgaver til at differentiere matematikundervisning. 1. klasse elever arbejder med simple 2×2 gitre med kun addition. 2. klasse og 3. klasse elever løser komplekse 4×4 gitre med blandede operationer. Samme værktøj skaber opgaver til alle niveauer.

Kombiner matematikopgaver med gangetabeller-træning for ældre elever. Selvom symbolpuslespil primært bruger addition og subtraktion, udvikler de den logiske tænkning, der er nødvendig for multiplikation. Skab opgavepakker, der inkluderer matematikopgaver, gangetabeller-øvelser og læse og skrive opgaver.

Mange lærere opretter tematiske ugepakker med matematikopgaver som en komponent. Kombiner med arbejdsark til bogstavlæring for første klasse elever, der stadig mestrer grundlæggende færdigheder. Inkludér farvelægning af tal og symboler for multi-sensorisk læring. Skab komplette lektionspakker på tværs af fag.

Matematikopgaver fungerer perfekt som morgenarbejde eller som stilletime-aktiviteter. Giv hver elev en unik version af samme opgave for at undgå afskrivning. Kombiner med stavning-opgaver og skriv bogstaver-ark for alsidige daglige starter-pakker. Differentieringsmulighederne er ubegrænsede.`,
        quote: 'Symbolpuslespil udvikler logisk tænkning hos mine elever.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hjemmeskoleforældre',
        subtitle: 'Gratis Skoleopgaver og Opgaver til Print til Flerniveauundervisning',
        description: `Hjemmeskoleforældre sætter pris på matematikopgaver for deres alsidighed på tværs af klassetrin. En forælder, der underviser flere børn i forskellige aldre, kan skabe tilpassede opgaver til hver. 2×2 gitre til den yngste, 4×4 gitre til den ældste, alle med samme tema.

Fuld Adgang-abonnementet til 1.797 kr. årligt giver adgang til 33 forskellige værktøjer. Kombiner matematikopgaver med opgaver til lære bogstaver til yngre børn. Tilføj gangetabeller-generatorer til ældre elever. Inkludér farvelægning og finmotorik øvelser for komplet hjemmeundervisning.

Mange hjemmeskolelærere opretter ugentlige temapakker. Vælg et tema som "havdyr" og skab matematikopgaver med havdyrsymboler. Tilføj læse og skrive opgaver om havet, farvelægning af havdyr og naturvidenskabsaktiviteter. Tematisk læring på tværs af alle fag er nemt.

Upload familiefotos eller billeder fra familieudflugter til personaliserede matematikopgaver. Dette gør læring meningsfuld og relevant. Kombiner med arbejdsark og kopiark til andre fag. Hjemmeskoling kræver mangfoldighed, og 33 værktøjer giver uendelige kombinationer af gratis skoleopgaver.`,
        quote: 'Et værktøj dækker alle mine børns klassetrin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Dansk som Andetsprog og Fremmedsprogslærere',
        subtitle: 'Matematikopgaver på 11 Sprog med Læse og Skrive Integration',
        description: `Fremmedsprogslærere bruger matematikopgaver til tværfaglig undervisning. Matematik er et universelt sprog, og symbolpuslespil kræver minimal sproglig forståelse. Dette gør dem perfekte til nyankomne elever, der stadig lærer dansk. Kombiner med opgaver til lære bogstaver på deres modersmål.

Platformen understøtter 11 sprog: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Skab matematikopgaver i elevens modersmål for at opbygge selvtillid. Skift gradvist til dansk, efterhånden som sprogfærdigheder udvikles. Kombiner med tosprogede læse og skrive aktiviteter.

Mange internationale skoler bruger matematikopgaver i deres flersprogede programmer. Skab samme opgave på flere sprog for at vise, at matematik er universelt. Kombiner med stavning og skriv bogstaver-opgaver på målsproget. Farvelægning af matematikopgaver giver pauser fra intensiv sprogtilegnelse.

Upload kulturelt relevante billeder til matematikopgaver for repræsentation. Elever ser deres egen kultur afspejlet i undervisningen. Kombiner matematikopgaver med arbejdsark til ordforråd og finmotorik øvelser til afslapning. Tværfaglig tilgang accelererer både sprog- og matematiklæring.`,
        quote: 'Den flersprogede support er essentiel for mit tosprogede program.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialundervisere',
        subtitle: 'Matematikopgaver med Farvelægning, Finmotorik og Differentieringsmuligheder',
        description: `Specialundervisere sætter pris på matematikopgavers visuelle og haptiske natur. Symbolbaserede puslespil tilbyder multi-sensoriske læringsmuligheder. Kombiner med farvelægning for elever, der har brug for bevægelsespauser. Tilføj finmotorik øvelser som at klippe og indsætte symboler.

Differentiering er indbygget i matematikopgaver. Juster gitterstørrelse, operationstype og symbolkompleksitet efter individuelle behov. Nogle elever arbejder med 2×2 addition, mens klassekammerater løser 4×4 blandede opgaver. Kombiner med arbejdsark til lære bogstaver på passende niveauer.

Mange specialundervisere opretter personaliserede læringscentre. En station med matematikopgaver, en anden med malebog-aktiviteter, en tredje med læse og skrive opgaver. Roter elever gennem stationerne for varieret praksis. Kombiner opgaver til print fra alle 33 værktøjer for komplette centerpakker.

Upload billeder af elevernes interesser til øget motivation. En elev, der elsker tog, får matematikopgaver med togsymboler. Kombiner med gangetabeller-træning, farvelægning og finmotorik øvelser tilpasset individuelle uddannelsesplaner. Personalisering driver engagement og læring.`,
        quote: 'Jeg kan hurtigt tilpasse arbejdsark til hver elevs IEP.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lærerentreprenører',
        subtitle: 'Sælg Matematikopgaver og Gratis Skoleopgaver som Komplette Pakker',
        description: `Lærere, der sælger ressourcer på Teachers Pay Teachers og Etsy, tjener godt på matematikopgaver. Skab produktpakker, der kombinerer matematikopgaver med opgaver til lære bogstaver, farvelægning, gangetabeller og stavning. Komplette temapakker sælger bedre end individuelle ark.

Fuld Adgang-abonnementet til 1.797 kr. årligt inkluderer kommerciel licens for alle 33 værktøjer. Skab ugentlige læringscenterpakker med matematikopgaver, malebog-sider, læse og skrive aktiviteter og finmotorik øvelser. Sælg som komplette temaunits for højere priser.

Mange lærerentreprenører tjener 3.750-37.500 kr. månedligt ved at sælge undervisningsressourcer. Kombiner matematikopgaver med arbejdsark og kopiark til alle kernefag. Skab differentierede pakker til børnehaveklasse, 0. klasse, 1. klasse, 2. klasse og 3. klasse. Tematiske samlinger som "Forår", "Dyr" eller "Tal" er populære.

Professionel 300 DPI-kvalitet sikrer, at dine produkter ser perfekte ud. Bundle matematikopgaver med opgaver til skriv bogstaver, farvelægning og gangetabeller-træning. Skab abonnementsforretninger med månedlige pakker af gratis skoleopgaver. Din kommercielle licens dækker ubegrænset salg uden ekstra omkostninger.`,
        quote: 'Mit abonnement betalte sig selv i første måned!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from math-puzzle.md
  faq: {
    sectionTitle: 'FAQ om Gratis Arbejdsark til Børn - Matteleger Generator',
    sectionDescription: 'Her er svar på de mest almindelige spørgsmål om gratis arbejdsark til børn og mattelege-generatoren. Lær om abonnementer, kommerciel licens og hvordan du bruger arbejdsark til børnehaveklasse i din undervisning.',
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
        question: 'Er gratis arbejdsark til børn matematikopgave-generatoren virkelig gratis at bruge?',
        answer: 'Matematikopgave-generatoren kræver et Fuld Adgang-abonnement, der koster 1.797 kr. årligt eller 188 kr. månedligt. Dit abonnement giver dig ubegrænset oprettelse af matematikopgaver, opgaver til lære bogstaver og skriv bogstaver, farvelægning, gangetabeller og finmotorik øvelser uden ekstra omkostninger per opgave. Generér så mange gratis skoleopgaver og arbejdsark, som du har brug for, uden yderligere gebyrer. Fuld Adgang inkluderer 33 forskellige værktøjer. Grundpakke koster 1.080 kr. årligt og inkluderer 10 værktøjer.',
      },
      {
        id: '2',
        question: 'Kan jeg printe gratis arbejdsark til børn og matematikopgaver derhjemme på en almindelig printer?',
        answer: 'Ja, matematikopgaver og opgaver til lære bogstaver printer perfekt på enhver hjemmeprinter. Download som PDF i professionel 300 DPI-kvalitet. Brug farveprinter til farverige matematikopgaver og malebog-aktiviteter. Brug sort-hvid printer med gråtone-muligheden for at spare blæk på arbejdsark, kopiark og gangetabeller. Standard Letter og A4-formater passer til almindeligt printerpapir.',
      },
      {
        id: '3',
        question: 'Har jeg brug for designfærdigheder for at skabe gratis arbejdsark til børnehaveklasse?',
        answer: 'Nej, ingen designfærdigheder er nødvendige. Generatoren håndterer alt layoutarbejde for matematikopgaver, opgaver til lære bogstaver, farvelægning og gangetabeller automatisk. Du vælger indhold og indstillinger, generatoren skaber den færdige opgave. Brugerfladen er simpel og intuitiv. Vælg billede, indstil gitterstørrelse, vælg operation og klik Skab. Matematikopgaver genereres på 3 minutter.',
      },
      {
        id: '4',
        question: 'Kan jeg bruge arbejdsark til børn og matematikopgaver i mit klasseværelse?',
        answer: 'Fuld Adgang-abonnement inkluderer ubegrænset klasseværelsesbrug. Print så mange kopier af matematikopgaver, opgaver til lære bogstaver, farvelægning og gangetabeller, som dine elever har brug for. Del arbejdsark og kopiark via læringsplatforme som Google Classroom. Brug gratis skoleopgaver til morgenarbejde, centres, lektier og vurderinger. Din Fuld Adgang-licens dækker alle dine klasser og elever.',
      },
      {
        id: '5',
        question: 'Hvilke sprog er gratis arbejdsark til børn og matematikopgaver tilgængelige på?',
        answer: 'Matematikopgaver, opgaver til lære bogstaver og skriv bogstaver, farvelægning, gangetabeller og finmotorik øvelser er tilgængelige på 11 sprog. Dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Skift sprog fra rullemenuen for at ændre brugerflade og billedbibliotek. Flersproget understøttelse er inkluderet i dit abonnement uden ekstra omkostninger.',
      },
      {
        id: '6',
        question: 'Kan jeg sælge gratis arbejdsark til børn og matematikopgaver, jeg laver?',
        answer: 'Ja, Fuld Adgang-abonnement inkluderer fuld kommerciel print-on-demand-licens uden ekstra omkostninger. Sælg dine matematikopgaver, opgaver til lære bogstaver og skriv bogstaver, farvelægning, gangetabeller og finmotorik øvelser på Teachers Pay Teachers, Etsy, Amazon KDP og andre platforme. Ingen kreditering påkrævet på dine arbejdsark og kopiark. Din kommercielle licens dækker ubegrænset salg. Mange lærere tjener 3.750-37.500 kr. månedligt.',
      },
      {
        id: '7',
        question: 'Hvordan tilpasser jeg gratis arbejdsark og matematikopgaver til mine elever?',
        answer: 'Alt på lærredet er redigerbart efter generering af matematikopgaver og opgaver til lære bogstaver. Klik på ethvert element for at vælge det. Træk for at flytte, skalér med hjørnehåndtag, rotér med rotationsgrebet. Tilføj brugerdefineret tekst til matematikopgaver, arbejdsark til skriv bogstaver, farvelægning og gangetabeller. Upload dine egne billeder til personaliserede matematikopgaver og opgaver til lære bogstaver. Kombiner med biblioteksbilleder for unikke gratis skoleopgaver.',
      },
      {
        id: '8',
        question: 'Hvilke aldersgrupper fungerer bedst med arbejdsark til børnehaveklasse og matematikopgaver?',
        answer: 'Matematikopgaver fungerer bedst til børnehaveklasse, 0. klasse, 1. klasse, 2. klasse og 3. klasse. Små 2×2 gitre passer til børnehaveklasse og 0. klasse elever. Mellemstore 3×3 gitre er perfekte til 1. klasse og 2. klasse. Store 4×4 gitre udfordrer 3. klasse elever. Differentiering er indbygget. Yngre elever arbejder med simple addition-matematikopgaver, ældre elever løser komplekse blandede operations-matematikopgaver.',
      },
      {
        id: '9',
        question: 'Kan jeg uploade mine egne billeder til gratis arbejdsark til børn?',
        answer: 'Ja, multi-fil upload understøtter alle almindelige billedformater. Upload JPEG, PNG, GIF til matematikopgaver, opgaver til lære bogstaver, farvelægning og gangetabeller. Kombiner dine uploadede billeder med vores bibliotek med 3000+ billeder. Personalisér matematikopgaver med klassemaskotter, arbejdsark til skriv bogstaver med familiefotos, malebog-aktiviteter med elevtegninger. Uploadede billeder gemmes i browsersessionen.',
      },
      {
        id: '10',
        question: 'Hvor lang tid tager det at skabe gratis arbejdsark til børn?',
        answer: 'Matematikopgaver og opgaver til lære bogstaver tager under 3 minutter at oprette fra start til download. Vælg billede, indstil parametre, generér opgave, redigér efter behov, download. Samme hurtige proces for farvelægning, gangetabeller, finmotorik øvelser og alle gratis skoleopgaver. Ingen ventetid, øjeblikkelig generering af arbejdsark og kopiark. Batch-oprettelse er hurtigere. Generér 10 forskellige matematikopgaver på 15 minutter.',
      },
      {
        id: '11',
        question: 'Inkluderer gratis arbejdsark til børnehaveklasse matematikopgaver facitark?',
        answer: 'Ja, alle matematikopgaver genererer automatisk både opgaveark og facitark. Opgavearket viser ligninger med tomme felter til elevernes svar. Facitarket viser alle svar udfyldt til lærerens rettevejledning. Download begge ark separat som PDF eller JPEG. Skift mellem faner for at se begge versioner. Redigér begge versioner separat, hvis nødvendigt. Download facitark til din rettemappe, opgaveark til elevernes mapper.',
      },
      {
        id: '12',
        question: 'Kan jeg skabe arbejdsark til børn om specifikke skoleemner?',
        answer: 'Ja, vælg tematiske billeder til emnefokuserede matematikopgaver. Brug dyre-billeder til naturfagsemner, fødevare-billeder til sundhedsundervisning, køretøjsbilleder til samfundsfag. Kombiner matematikopgaver med tematiske opgaver til skriv bogstaver, farvelægning, gangetabeller og finmotorik øvelser for tværfaglige gratis skoleopgaver. Upload dine egne emnespecifikke billeder for personaliserede opgaver.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Fuld Adgang',
    price: 'kr. 1.725',
    priceInterval: '/år',
    priceSuffix: 'Faktureres årligt',
    benefits: [
      'Ubegrænset arbejdsark oprettelse',
      'Kommerciel licens inkluderet',
      '11 sprog understøttet',
      '3000+ tematiske billeder',
      '300 DPI printkvalitet',
      'Facitark inkluderet',
    ],
    ctaText: 'Start Nu',
    bundleDescription: 'Dit abonnement inkluderer adgang til alle 33 arbejdsarkgeneratorer:',
    bundleApps: [
      'Billedaddition',
      'Alfabettog',
      'Stor eller lille',
      'Billedbingo',
      'Diagrammer tæl og farv',
      'Kodeaddition',
      'Malebøger',
      'Billedkrydsord',
      'Billedkryptogram',
      'Tegn og farv',
      'Tegn linjer',
      'Find og tæl',
      'Find objekter',
      'Gittermatch',
      'Matchspil',
      'Matematikpuslespil',
      'Matematikark',
      'Manglende brikker',
      'Mere eller mindre',
      'Hvad passer ikke ind',
      'Mønstertog',
      'Mønsterark',
      'Billedsti',
      'Sorter billeder',
      'Forholdsord',
      'Skyggeparring',
      'Subtraktion',
      'Sudoku for børn',
      'Skattejagt',
      'Gæt ordet',
      'Bogstavblanding',
      'Ordsøgning',
      'Skriveøvelser',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Arbejdsark Kombinere - Arbejdsark til Børn og Gratis Printables',
    sectionDescription: 'Lav komplette læringspakker ved at kombinere matteleger med disse komplementære generatorer.',
    ctaTitle: 'Klar til at Lave Fantastiske Arbejdsark?',
    ctaDescription: 'Tilslut dig tusindvis af pædagoger der laver professionelle arbejdsark. Ubegrænset oprettelse, kommerciel licens inkluderet.',
    primaryCtaText: 'Start Gratis Prøve',
    secondaryCtaText: 'Se Alle 33 Generatorer',
    badgeText: 'Fungerer Godt Med',
    exploreText: 'Udforsk',
    trustBadges: {
      securePayment: 'Sikker betaling',
      cancelAnytime: 'Opsig når som helst',
    },
    items: [
      {
        id: '1',
        slug: 'image-addition',
        name: 'Addition',
        category: 'Matematik',
        icon: '➕',
        description: 'Kombiner matteleger med additions-arbejdsark for at forstærke talforståelse og regnefærdigheder.',
      },
      {
        id: '2',
        slug: 'subtraction',
        name: 'Subtraktion',
        category: 'Matematik',
        icon: '➖',
        description: 'Supplér matteleger med subtraktionsopgaver for omfattende træning i grundlæggende regnearter.',
      },
      {
        id: '3',
        slug: 'code-addition',
        name: 'Kode-Addition',
        category: 'Matematik',
        icon: '🔢',
        description: 'Tilføj kode-addition puslespil til dine mattecentre for varieret logisk tænkning og matematik.',
      },
      {
        id: '4',
        slug: 'math-worksheet',
        name: 'Matematik Arbejdsark',
        category: 'Matematik',
        icon: '📐',
        description: 'Komplement matteleger med traditionelle matematik-arbejdsark for komplet pensumdækning.',
      },
      {
        id: '5',
        slug: 'sudoku',
        name: 'Sudoku',
        category: 'Logik',
        icon: '🔲',
        description: 'Udfordr eleverne med sudoku-puslespil der udvikler logisk tænkning og talfærdigheder.',
      },
      {
        id: '6',
        slug: 'grid-match',
        name: 'Gittermatch',
        category: 'Logik',
        icon: '🧩',
        description: 'Balancer matematikopgaver med visuelle gittermatch-puslespil for varieret kognitiv træning.',
      },
    ],
  },
};

export default mathPuzzleDaContent;
