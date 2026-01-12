import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Krydsord Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/krydsord-arbejdsark.ts
 * URL: /da/apps/krydsord-arbejdsark
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Danish/crossword.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const crosswordDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'krydsord-arbejdsark',
    appId: 'image-crossword',
    title: 'Opgaver til Print - Krydsord Generator - Gratis Skoleopgaver og Arbejdsark til 1. Klasse',
    description: 'Lav professionelle krydsord opgaver til print med billeder som visuelle ledetråde. Perfekt til lære bogstaver, læse og skrive øvelser, og stavning i børnehaveklasse, 1. klasse, 2. klasse og 3. klasse.',
    keywords: 'krydsord arbejdsark, opgaver til print, gratis skoleopgaver, 1 klasse opgaver, lære bogstaver, læse og skrive, stavning øvelser, krydsord generator, printklare opgaver, dansk skoleopgaver',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/krydsord-arbejdsark',
  },

  // Hero Section - FULL text from crossword.md paragraphs 1-3
  hero: {
    title: 'Krydsord Generator - Gratis Skoleopgaver',
    subtitle: 'Opgaver til Print med Billeder til Børnehaveklassen og Indskolingen',
    description: `Lav professionelle krydsord opgaver til print med billeder som visuelle ledetråde. Dit Fuld Adgang-abonnement giver ubegrænset oprettelse af krydsord arbejdsark uden ekstra gebyrer per opgave. Perfekt til lære bogstaver, læse og skrive øvelser, og stavning i børnehaveklasse, 1. klasse, 2. klasse og 3. klasse.

Vores krydsord generator skaber opgaver til print med billeder som ledetråde. Børnene ser billeder og skal skrive ord i krydsordgitteret. Dette gør arbejdsark perfekte til små børn der lærer bogstaver og stavning.

Fuld Adgang-abonnement koster 240 USD om året eller 25 USD per måned. Du får adgang til alle 33 værktøjer til at lave skoleopgaver. Lav ubegrænsede opgaver til print uden ekstra betaling. Der er kommerciel licens inkluderet.`,
    previewImageSrc: '/samples/english/crossword/crossword_worksheet.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/crossword/
  samples: {
    sectionTitle: 'Krydsord Arbejdsark Eksempler',
    sectionDescription: 'Download gratis eksempler på krydsord arbejdsark for at se vores professionelle kvalitet',
    badgeText: 'Gratis Eksempler',
    downloadLabel: 'Download Gratis Eksempel',
    downloadingLabel: 'Downloader...',
    worksheetLabel: 'Arbejdsark',
    answerKeyLabel: 'Facitark',
    viewAllLabel: 'Se alle',
    noPdfLabel: 'Ingen PDF tilgængelig',
    freePdfCountLabel: '2 gratis downloads',
    ofLabel: 'af',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/crossword/crossword_worksheet.jpeg',
        answerKeySrc: '/samples/english/crossword/crossword_answer_key.jpeg',
        altText: 'Krydsord arbejdsark med billeder som ledetråde til ordforråd og stavning i børnehaveklassen',
        pdfDownloadUrl: '/samples/english/crossword/image-crossword-worksheet.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/crossword/crossword_worksheet (1).jpeg',
        answerKeySrc: '/samples/english/crossword/crossword_answer_key (1).jpeg',
        altText: 'Krydsord puslespil med visuelle billedledetråde til 0. klasse og 1. klasse læse og skrive øvelser',
        pdfDownloadUrl: '/samples/english/crossword/image-crossword-worksheet (1).pdf',
      },
    ],
  },

  // Features Grid - FULL text from crossword.md feature sections
  features: {
    sectionTitle: 'Funktioner til Gratis Skoleopgaver og Arbejdsark til Print',
    sectionDescription: 'Krydsord generatoren tilbyder alle vigtige funktioner til gratis skoleopgaver. Lav professionelle arbejdsark og opgaver til print på få minutter. Hver funktion er udviklet til lærere og pædagoger. Perfekt til børnehaveklassen og indskolingen.',
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
        title: 'Lav Opgaver til Print på 3 Klik',
        description: `Vælg et tema og generer krydsord med ét klik. Vælg sideformat (A4 eller Letter). Klik på et tema som "Dyr" eller "Mad". Din krydsord er klar på under 30 sekunder. Perfekt til travle lærere der skal lave opgaver til print hurtigt.

Du behøver ingen designerfærdigheder. Generatoren laver automatisk gitteret. Ordene placeres optimalt. Billederne tilføjes som visuelle ledetråde. Svarark genereres automatisk. Du downloader færdigt arbejdsark som PDF.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Rediger Alle Elementer på Arbejdsark',
        description: `Alle elementer på dine opgaver til print kan redigeres efter generering. Træk billeder til nye positioner. Roter elementer. Skaler størrelsen. Slet elementer du ikke vil have. Tilføj ekstra tekst til arbejdsark.

Klik på et element for at vælge det. Træk med musen for at flytte. Brug hjørnerne til at ændre størrelse. Alt på canvas kan tilpasses. Dette giver fuld kontrol over dine kopiark og arbejdsark.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Dine Egne Billeder',
        description: `Upload billeder fra din computer til krydsord generatoren. Kombiner dine billeder med biblioteksbilder. Lav personlige arbejdsark til dine elever. Upload klassefotos, lokale steder, eller specielle emner.

Generatoren accepterer JPEG, PNG og GIF formater. Upload flere billeder på én gang. Dine uploadede billeder vises i preview området. Kombiner med de 3000+ professionelle billeder. Perfekt til målrettede 1. klasse opgaver og 0. klasse opgaver.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprog Support',
        description: `Billedbiblioteket virker på dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Hvert billede har navne på alle 11 sprog. Vælg dansk for danske ord i krydsordene. Skift sprog for fremmedsprog undervisning.

Dette er perfekt til lære bogstaver på dansk. Børnene ser billeder og lærer danske ord. Også fantastisk til ESL-undervisning. Lav arbejdsark til læse og skrive på flere sprog. 11-sproget support gør det unikt blandt krydsord generatorer.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerciel Licens Inkluderet',
        description: `Fuld Adgang-abonnement inkluderer print-on-demand kommerciel licens. Sælg krydsord arbejdsark på Teachers Pay Teachers. Sælg kopiark på Etsy. Udgiv opgaver til print på Amazon KDP. Ingen ekstra licensgebyrer.

Mange lærere tjener 500-5000 USD om måneden ved at sælge arbejdsark online. Din licens dækker alt hvad du laver med generatoren. 300 DPI kvalitet er perfekt til kommerciel udgivelse. Start din Teachers Pay Teachers butik med professionelle danske skoleopgaver.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Over 3000 Børnevenlige Billeder',
        description: `Over 3000 børnevenlige billeder er inkluderet i abonnementet. Organiseret efter temaer som dyr, mad, transport, farver og tal. Let at finde billeder til matematikopgaver (tal-billeder). Find billeder til stavning øvelser (hverdagsgenstande).

Søg efter specifikke billeder. Gennemse temaer. Vælg 10-15 billeder for optimal krydsord størrelse. Alle billeder er professionelt designede. Farverige og engagerende for små børn. Perfekt til gratis skoleopgaver når du kombinerer forskellige temaer.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionel 300 DPI Kvalitet',
        description: `Download dine krydsord som høj-opløsning PDF eller JPEG filer. 300 DPI kvalitet sikrer skarpe udskrifter. Print på enhver printer derhjemme eller på skolen. Gråtone mulighed sparer blæk når du printer mange kopiark.

PDF format bevarer perfekt kvalitet. JPEG format virker til online deling. Vælg portræt eller landskab orientering. A4 og Letter formater er begge tilgængelige. Professionel kvalitet til arbejdsark du er stolt af at dele med elever og forældre.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from crossword.md step sections
  howTo: {
    sectionTitle: 'Lav Gratis Skoleopgaver i 5 Nemme Trin',
    sectionDescription: 'Lav professionelle krydsord opgaver til print på under 3 minutter. Følg disse 5 simple trin. Intet designkendskab påkrævet. Perfekt til gratis skoleopgaver til 0. klasse og 1. klasse.',
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
        title: 'Vælg Indhold til Dine Arbejdsark',
        description: `Start med at vælge sprog i billedbiblioteket. Vælg dansk for danske ord. Vælg derefter et tema fra dropdown menuen. Temaer inkluderer dyr, mad, transport, farver, tal til matematikopgaver, bogstaver til lære bogstaver øvelser, og meget mere.

For hurtig generering, vælg bare et tema og klik "Generer". Generatoren vælger automatisk 10-15 billeder fra temaet. For matematikopgaver, vælg tal-temaet. For stavning og læse og skrive, vælg hverdagsgenstande. For gangetabeller øvelser, kombiner tal med gange-symboler.

Du kan også vælge individuelle billeder. Klik på temaet "Alle Temaer" for at se alle 3000+ billeder. Søg efter specifikke ord. Klik på billeder for at vælge dem. De valgte billeder vises i preview området. Vælg 8-15 billeder for optimal krydsord størrelse til 1. klasse opgaver.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger for Arbejdsark',
        description: `Vælg dit sideformat. A4 Portrait er standard i Danmark. Letter format bruges i USA. Du kan også vælge landskab orientering for brede krydsord. Custom størrelse giver fuld kontrol.

Tilføj baggrundstema hvis du vil farverige opgaver til print. Vælg fra farverige baggrunde. Juster opacity for subtile effekter. Tilføj ramme-tema for professionelt udseende kopiark. Dette er perfekt til malebog-stil opgaver hvor børnene også kan farvelægge baggrunden.

Vælg skriftstørrelse der passer til dit klassetrin. Store bogstaver til børnehaveklasse og 0. klasse opgaver. Mellemstore bogstaver til 1. klasse og 2. klasse. Normal størrelse til 3. klasse. Større gitter gør finmotorik øvelser lettere for små hænder.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generer Dit Krydsord',
        description: `Klik på "Generer Krydsord" knappen. Generatoren laver automatisk gitteret i få sekunder. Ordene placeres optimalt med krydsende bogstaver. Billeder tilføjes som visuelle ledetråde ved siden af eller over gitteret.

Se øjeblikkelig preview på skærmen. Zoom ind for at se detaljer. Zoom ud for at se hele opgaven. Hvert krydsord er unikt genereret. Generer igen for ny layout hvis du vil.

Svarark genereres automatisk. Alle ord fyldes ind i gitteret. Perfekt til lærer-svarark. Spar tid på at tjekke elevernes arbejde. Download både opgave og svarark som separate filer til dine gratis skoleopgaver.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Rediger Dit Arbejdsark',
        description: `Efter generering kan du redigere alt på canvas. Klik på billeder for at vælge dem. Træk billeder til nye positioner. Roter billeder med hjørnehåndtag. Skaler billeder større eller mindre. Slet billeder du ikke vil have.

Tilføj ekstra tekst til dine arbejdsark. Skriv instruktioner på dansk. Tilføj elevens navn felt. Tilføj dato felt. Vælg skriftstørrelse, farve og skrifttype for teksten. Tilføj kontur til tekst for bedre læsbarhed.

Brug Fortryd og Gentag knapper hvis du laver en fejl. Alle ændringer kan fortrydes. Zoom kontrol hjælper med præcis redigering. Dette giver fuld kontrol over dine læse og skrive opgaver og stavning øvelser.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download og Print Dine Arbejdsark',
        description: `Når dit krydsord er klar, klik "Download PDF" for bedste print kvalitet. PDF bevarer skarp 300 DPI opløsning. Perfekt til at printe arbejdsark derhjemme eller på skolens printer. Vælg farveprofil eller gråtone for at spare blæk.

Download "JPEG" hvis du vil dele opgaven digitalt. Send til forældre via e-mail. Del i Google Classroom. Upload til skolens læringsplatform. JPEG virker på alle enheder.

Print så mange kopier du skal bruge. Ingen grænse på antal prints. Brug til matematikopgaver, gangetabeller øvelser, lære bogstaver aktiviteter, stavning tests, eller som malebog hvor børnene farvelægger efter at have løst krydsord. Print til hele klassen af 1. klasse elever eller 0. klasse børn.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from crossword.md use case sections
  useCases: {
    sectionTitle: 'Perfekt til Pædagoger, Lærere og Forældre',
    sectionDescription: 'Krydsord generatoren bruges af børnehavepædagoger, folkeskolelærere, hjemmeundervisning forældre og specialpædagoger. Lav opgaver til print til børnehaveklasse, 1. klasse, 2. klasse og 3. klasse. Hver brugergruppe finder unikke fordele i værktøjet til gratis skoleopgaver og arbejdsark.',
    badgeText: 'Hvem Er Det Til',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Børnehaveklasse og 0. Klasse Pædagoger',
        subtitle: 'Malebog Kombineret med Farvelægning Opgaver',
        description: `Pædagoger i børnehaveklassen bruger krydsord til tidlig læsning og bogstavgenkendelse. Billederne fungerer som visuelle ledetråde for børn der lige begynder at lære bogstaver. Kombiner krydsord med farvelægning - børnene løser krydsord først og farvelægger billederne bagefter. Dette gør hver opgave til både læse øvelse og malebog aktivitet.

Vælg simple 6-8 ord krydsord til 0. klasse opgaver. Brug store tydelige bogstaver. Temaer som farver, dyr og former virker godt. Børnene udvikler bogstavgenkendelse mens de har det sjovt. Farvelægning efter løsning giver ekstra belønning og forlænger aktivitetstiden.

Tilføj farverige baggrunde og rammer til dine malebog-stil opgaver. Børnene kan farvelægge både billederne og dekorative elementer. Dette kombinerer læse og skrive med kreativ farvelægning i samme aktivitet.`,
        quote: 'Mine elever elsker at finde ordene og farvelægge billederne!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lærere i 1. Klasse til 3. Klasse',
        subtitle: 'Finmotorik Øvelser og Stavning Arbejdsark',
        description: `Indskolingslærere (1.-3. klasse) bruger krydsord til stavning træning og finmotorik udvikling. At skrive bogstaver i små kasser kræver præcis finmotorik kontrol. Børnene udvikler både stavning færdigheder og håndskrift samtidigt. Dette gør krydsord til effektive finmotorik øvelser.

Juster giterstørrelsen til klassetrinnet. 1. klasse har brug for større kasser for finmotorik øvelser med blyanter. 2. klasse kan bruge mellemstore kasser. 3. klasse kan håndtere normal størrelse. Større kasser gør det lettere for små hænder at skrive pænt.

Brug krydsord til ugentlige stavning tests. Vælg stavning ord fra ugens lektioner. Børnene lærer ord visuelt gennem billederne. De øver finmotorik mens de skriver. Tjekkelse bliver let med det automatiske svarark.`,
        quote: 'Krydsord gør staveøvelser til et spil.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hjemmeundervisende Forældre',
        subtitle: 'Matematikopgaver og Gangetabeller Øvelser til Flere Klassetrin',
        description: `Forældre der underviser hjemme bruger generatoren til varierede matematikopgaver og sprogøvelser. Lav matematikopgaver med tal-billeder for at øve tælling og tal-ord. Lav gangetabeller krydsord hvor børnene skal finde produkter (2×3=SIX). Kombiner matematik læring med krydsord løsning.

For 1. klasse hjemmeundervisning, lav simple tal-krydsord. Brug billeder af 1-10 genstande. Børnene lærer at skrive tal-ord (EN, TO, TRE). For ældre børn, brug gangetabeller øvelser. Skriv regnestykker som ledetråde og produkterne går i gitteret.

Hjemmeundervisning giver fleksibilitet til at tilpasse sværhedsgrad. Lav nye opgaver dagligt uden ekstra omkostninger. Kombiner matematikopgaver med læse og skrive i samme arbejdsark. Tværfaglig læring i én aktivitet.`,
        quote: 'Et værktøj dækker alle mine børns klassetrin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Dansk og Fremmedsprog Lærere',
        subtitle: 'Lære Bogstaver og Ordforråd på 11 Sprog',
        description: `Dansklærere og fremmedsprogslærere bruger 11-sproget support til ordforråd undervisning. Vælg dansk for at lære bogstaver til dansksprogede elever. Skift til engelsk, tysk eller fransk for fremmedsprog klasser. Samme billeder får nye ord på nye sprog.

Lav tematiske ordforråd krydsord. "Mad" tema for restaurant ordforråd. "Dyr" tema for natur ordforråd. Børnene lærer nye ord gennem visuelle associationer. Billederne hjælper med at huske ord betydninger. Perfekt til lære bogstaver og nye ord samtidigt.

For danske som andetsprog elever, kombiner billeder med danske ord. Visuelle ledetråde hjælper ikke-modersmålstalende. De lærer stavning gennem gentagen øvelse. Krydsord gør ordforråd læring sjovt i stedet for kedelig memorering.`,
        quote: 'Den flersprogede support er essentiel for mit tosprogede program.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpædagoger',
        subtitle: 'Tilpassede Opgaver til Print med Finmotorik Øvelser',
        description: `Specialpædagoger tilpasser krydsord til individuelle behov. Lav meget store gitter for elever der kæmper med finmotorik. Brug færre ord (4-6) for elever der let bliver overvældede. Visuelle billedledetråde hjælper elever med læsevanskeligheder.

Upload personlige billeder af kendte personer eller steder fra elevens liv. Brug elevens interesser til engagement. Større skrift støtter elever med synsvanskeligheder. Tilpas alt til præcis det eleven har brug for.

Kombiner krydsord med farvelægning for multisensorisk læring. Elever med koncentrationsproblemer får flere aktiviteter i én opgave. Finmotorik øvelser sker naturligt mens de skriver i kasserne. Succesoplevelse når de løser hele krydsord.`,
        quote: 'Jeg kan hurtigt tilpasse arbejdsark til hver elevs IEP.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lærer-Iværksættere',
        subtitle: 'Sælg Arbejdsark på Teachers Pay Teachers',
        description: `Lærer-iværksættere tjener 500-5000 USD om måneden. Sælg pakker på Teachers Pay Teachers. Kombiner krydsord med matematikopgaver og farvelægning. Lav komplette temapakker. Sæsonpakker sælger særligt godt som gratis skoleopgaver til salg.

Lav færdige pakker til download. 10 krydsord om efterår. 15 matematikopgaver kombineret med krydsord. 20 sider farvelægning med matchende krydsord. Pakker med gangetabeller som krydsord. Købere elsker komplette opgaver til print de kan bruge med det samme.

Print-on-demand licensen åbner muligheder. Sælg på Etsy som arbejdsark til print. Lav bøger til Amazon KDP. Kombiner 50 krydsord i en bog. Tilføj farvelægning sider mellem opgaverne. Lav specialiserede bøger om matematikopgaver eller gangetabeller.`,
        quote: 'Mit abonnement betalte sig selv i første måned!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from crossword.md
  faq: {
    sectionTitle: 'Ofte Stillede Spørgsmål',
    sectionDescription: 'Her er svar på de mest almindelige spørgsmål om krydsord generatoren. Lær om gratis muligheder, abonnementer og hvordan du bruger opgaver til print i din undervisning.',
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
        question: 'Er krydsord generatoren gratis at bruge til gratis skoleopgaver?',
        answer: 'Krydsord generatoren kræver Fuld Adgang-abonnement der koster 240 USD årligt eller 25 USD månedligt. Dit abonnement giver ubegrænset krydsord oprettelse uden ekstra gebyrer per opgave. Lav så mange gratis skoleopgaver som du har brug for uden yderligere omkostninger. Fuld Adgang inkluderer alle 33 værktøjer til opgaver til print. Grundpakke koster 144 USD årligt og inkluderer 10 værktøjer. Begge abonnementer inkluderer kommerciel licens, 11-sproget support og professionel 300 DPI kvalitet.',
      },
      {
        id: '2',
        question: 'Kan jeg bruge krydsord opgaver til print i min 1. klasse?',
        answer: 'Ja. Fuld Adgang-abonnement inkluderer ubegrænset klasseværelsebrug. Print så mange kopier du skal bruge til dine 1. klasse elever. Del digitalt via Google Classroom. Send til forældre til hjemmeopgaver. Ingen grænser på klasseværelses brug. Krydsord er perfekte til 1. klasse stavning øvelser og bogstavgenkendelse. Juster giterstørrelsen til store kasser for begyndere. Vælg simple 6-8 ord temaer. Børnene lærer gennem visuelle billedledetråde.',
      },
      {
        id: '3',
        question: 'Kan jeg sælge krydsord arbejdsark jeg laver?',
        answer: 'Ja. Fuld Adgang-abonnement inkluderer fuld kommerciel print-on-demand licens uden ekstra omkostninger. Sælg dine krydsord arbejdsark på Teachers Pay Teachers. Sælg på Etsy. Udgiv på Amazon KDP. Ingen ekstra licensgebyrer ud over dit abonnement. Mange lærere tjener 500-5000 USD månedligt ved at sælge arbejdsark bundles. Lav tematiske pakker. Kombiner forskellige opgavetyper. 300 DPI kvalitet sikrer professionelt udseende produkter.',
      },
      {
        id: '4',
        question: 'Hvordan tilpasser jeg krydsord til finmotorik øvelser?',
        answer: 'Juster giterstørrelse i side indstillinger for at lave store kasser til finmotorik øvelser. Større kasser gør det lettere for små hænder at skrive pænt. Vælg færre ord (4-6) for fokuserede finmotorik træning. Store tydelige bogstaver støtter håndskrift udvikling. Efter generering kan du redigere giterstørrelse på canvas. Klik på gitteret og skaler det større. Børn med finmotorik udfordringer har brug for ekstra plads.',
      },
      {
        id: '5',
        question: 'Hvilke aldersgrupper er bedst til krydsord?',
        answer: 'Krydsord virker godt fra børnehaveklasse (0. klasse opgaver) til 3. klasse og opefter. For 0. klasse, brug 4-6 simple ord med store billeder. For 1. klasse, brug 8-10 ord med mellemstore gitter. For 2.-3. klasse, brug 12-15 ord med normal størrelse. Billedledetråde gør krydsord tilgængelige for ikke-læsere i 0. klasse. Børnene matcher billeder til bogstaver. 1. klasse elever begynder at læse ordene selv. 2.-3. klasse løser uafhængigt.',
      },
      {
        id: '6',
        question: 'Kan jeg uploade mine egne billeder til matematikopgaver?',
        answer: 'Ja. Upload dine egne billeder fra computer via Upload Custom Images sektion. Accepterer JPEG, PNG og GIF formater. Upload flere filer på én gang. Kombiner dine billeder med de 3000+ biblioteks billeder til matematikopgaver og andre emner. Upload billeder af tal, former og mønstre til matematikopgaver. Upload klassefotos for personlige krydsord. Upload lokale steder eller specielle emner.',
      },
      {
        id: '7',
        question: 'Hvor lang tid tager det at lave gangetabeller krydsord?',
        answer: 'Lav gangetabeller krydsord på under 3 minutter. Vælg tal-billeder fra biblioteket. Skriv gangestykker som custom clues (2×3, 4×5, etc.). Generer krydsord. Produkterne går i gitteret (SIX, TWENTY, etc.). Download færdigt gangetabeller arbejdsark. Traditionelt tager det 30-60 minutter at lave gangetabeller opgaver manuelt. Med generatoren er det 10-20 gange hurtigere.',
      },
      {
        id: '8',
        question: 'Inkluderer krydsord svarark til læse og skrive kontrol?',
        answer: 'Ja. Alle krydsord genererer automatisk et komplet svarark. Alle ord fyldes ind i gitteret. Download både opgave og svarark som separate PDF filer. Perfekt til hurtig rettelse af læse og skrive opgaver. Svarark sparer enorm tid ved kontrol af elevarbejde. Ingen behov for manuelt at løse hver krydsord først. Giv svarark til elever for selvevaluering. Læse og skrive fremskridt bliver let at spore.',
      },
      {
        id: '9',
        question: 'Hvilke sprog er tilgængelige til at lære bogstaver?',
        answer: '11 sprog er tilgængelige: dansk, engelsk, tysk, fransk, spansk, portugisisk, italiensk, hollandsk, svensk, norsk og finsk. Hvert af de 3000+ billeder har navne på alle 11 sprog. Skift sprog med ét klik for at lære bogstaver på et nyt sprog. Vælg dansk til danske elever der lærer bogstaver. Skift til engelsk for ESL klasser. Brug samme billeder på tværs af sprog for konsistens. Perfekt til tosprogede programmer.',
      },
      {
        id: '10',
        question: 'Kan jeg kombinere krydsord med malebog og farvelægning aktiviteter?',
        answer: 'Ja. Tilføj farverige baggrunde og rammer til dine krydsord for malebog-stil opgaver. Børnene løser krydsord først og farvelægger bagefter. Dette kombinerer læse og skrive med kreativ farvelægning. Dobbelt værdi i hver opgave til print. Print i farveprofil for farverige malebog elementer. Eller print i sort-hvid for total farvelægning kontrol. Børnene kan farvelægge billedledetråde, baggrunde og dekorative rammer.',
      },
      {
        id: '11',
        question: 'Er krydsord gode til finmotorik øvelser og håndskrift?',
        answer: 'Ja. At skrive bogstaver i krydsord kasser er fremragende finmotorik øvelser. Børnene udvikler præcis håndkontrol. Små kasser kræver omhyggelig bogstavformation. Dette styrker finmotorik færdigheder naturligt gennem sjov aktivitet. Juster kassestørrelse til barnets finmotorik niveau. Store kasser til begyndere. Mellemstore til udvikling. Små kasser til avancerede. Gentagen øvelse gennem ugentlige krydsord forbedrer finmotorik markant.',
      },
      {
        id: '12',
        question: 'Skal jeg have designkendskab til at lave arbejdsark til print?',
        answer: 'Nej, intet designkendskab påkrævet til gratis skoleopgaver. Vælg tema, klik generer, færdig. Generatoren laver alt automatisk. Professionelt layout hver gang uden designarbejde. Alle elementer kan redigeres hvis du vil. Træk-og-slip interface er intuitivt. Ingen læringskurve for opgaver til print. Selv teknologi-uerfarne lærere mestrer det på minutter.',
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
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombiner med Andre Arbejdsark Generatorer',
    sectionDescription: 'Lav komplette læringspakker ved at kombinere krydsord med disse komplementære generatorer.',
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
        slug: 'word-search',
        name: 'Ordsøgning',
        category: 'Sprog',
        icon: '🔍',
        description: 'Komplement krydsord med ordsøgninger der bruger de samme ordforråstemaer til omfattende ordøvelser.',
      },
      {
        id: '2',
        slug: 'word-scramble',
        name: 'Ordforbytter',
        category: 'Sprog',
        icon: '🔤',
        description: 'Kombiner krydsord med forbyttede ord puslespil for at forstærke stavning og ordforråd fra flere vinkler.',
      },
      {
        id: '3',
        slug: 'word-guess',
        name: 'Gæt Ordet',
        category: 'Sprog',
        icon: '❓',
        description: 'Tilføj ordgætteaktiviteter til dine læsecentre sammen med krydsordspuslespil for varieret øvelse.',
      },
      {
        id: '4',
        slug: 'cryptogram',
        name: 'Kryptogram',
        category: 'Logik',
        icon: '🔐',
        description: 'Udfordr eleverne med kodebrydningspuslespil der udvikler logisk tænkning og bogstavmønstergenkendelse.',
      },
      {
        id: '5',
        slug: 'coloring',
        name: 'Malebilleder',
        category: 'Kunst og Kreativitet',
        icon: '🎨',
        description: 'Beløn færdiggjorte krydsord med tematiske malebilleder der udvikler finmotorik.',
      },
      {
        id: '6',
        slug: 'alphabet-train',
        name: 'Alfabettog',
        category: 'Tidlig Læring',
        icon: '🚂',
        description: 'Balancer krydsordøvelser med bogstavgenkendelsesaktiviteter for omfattende tidlig læsefærdighed.',
      },
    ],
  },
};

export default crosswordDaContent;
