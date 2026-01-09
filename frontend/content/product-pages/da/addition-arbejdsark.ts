import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Arbejdsark - Danish Content
 *
 * File: frontend/content/product-pages/da/addition-arbejdsark.ts
 * URL: /da/apps/addition-arbejdsark
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Danish/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionDaContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'addition-arbejdsark',
    appId: 'image-addition',
    title: 'Matematikopgaver Plus – Gratis Skoleopgaver til Print og Arbejdsark til 0. Klasse',
    description: 'Lav professionelle plusstykker og matematikopgaver med vores billedbaserede opgavegenerator. Generer tilpassede matematikopgaver perfekt til børnehaveklassen, 0. klasse opgaver og 1. klasse. Download opgaveark i høj kvalitet som PDF på under 3 minutter.',
    keywords: 'matematikopgaver, plusstykker, gratis skoleopgaver, arbejdsark til print, 0. klasse opgaver, 1. klasse, addition, regning, børnehaveklassen, kopiark, finmotorik øvelser',
    canonicalUrl: 'https://www.lessoncraftstudio.com/da/apps/addition-arbejdsark',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-3
  hero: {
    title: 'Matematikopgaver Plus – Gratis Skoleopgaver',
    subtitle: 'Arbejdsark til Print til Børnehaveklassen og 0. Klasse',
    description: `Lav professionelle plusstykker og matematikopgaver med vores billedbaserede opgavegenerator. Med dit Core Bundle-abonnement får du ubegrænset adgang til at skabe arbejdsark og opgaver til print uden ekstra gebyrer pr. opgaveark. Generer tilpassede matematikopgaver perfekt til børnehaveklassen, 0. klasse opgaver og 1. klasse. Download opgaveark i høj kvalitet som PDF på under 3 minutter.

Vores plusstykke-generator gør det nemt at skabe matematikopgaver til print for lærere i indskolingen. Børn lærer bedst når de kan se konkrete billeder af ting de skal lægge sammen. Denne opgavegenerator kombinerer billeder med tal så eleverne får både visuel og numerisk forståelse af addition. Skab gratis skoleopgaver der hjælper børn med at forstå matematiske begreber gennem billeder og tal.

Hver matematikopgave kan tilpasses efter elevernes niveau og læringsbehov. Vælg mellem billedebaserede opgaver til print hvor børn tæller objekter eller mere avancerede opgaver med tal. Vores arbejdsark til matematik understøtter alle stadier af additionsindlæring fra helt små tal i 0. klasse til større udfordringer i 1. og 2. klasse. Med vores billedbibliotek på over 3000 børnevenlige illustrationer kan du skabe engagerende matematikopgaver der fanger elevernes interesse.`,
    previewImageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Matematikopgaver Eksempler',
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
        worksheetSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key portrait.jpeg',
        altText: 'Addition arbejdsark portrætformat med billedbaserede plusstykker til 0. klasse',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/addition/addition_worksheet landscape.jpeg',
        answerKeySrc: '/samples/english/addition/addition_answer_key landscape.jpeg',
        altText: 'Addition arbejdsark landskabsformat med farverige matematikopgaver til 1. klasse',
        pdfDownloadUrl: '/samples/english/addition/addition_worksheet landscape.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/addition/image and number.jpeg',
        answerKeySrc: '/samples/english/addition/image and number answer_key.jpeg',
        altText: 'Billede og tal kombineret matematikopgave til børnehaveklassen',
        pdfDownloadUrl: '/samples/english/addition/image and number.pdf',
      },
      {
        id: '4',
        worksheetSrc: '/samples/english/addition/find addend.jpeg',
        answerKeySrc: '/samples/english/addition/find addend answer_key.jpeg',
        altText: 'Find manglende led arbejdsark til addition øvelser',
        pdfDownloadUrl: '/samples/english/addition/find addend.pdf',
      },
      {
        id: '5',
        worksheetSrc: '/samples/english/addition/mixed mode.jpeg',
        answerKeySrc: '/samples/english/addition/mixed mode answer_key.jpeg',
        altText: 'Blandet tilstand matematikopgaver med forskellige opgavetyper',
        pdfDownloadUrl: '/samples/english/addition/mixed mode.pdf',
      },
    ],
  },

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Funktioner til Matematikopgaver – Alt Du Skal Bruge til Arbejdsark',
    sectionDescription: 'Vores billedbaserede plusstykke-generator giver dig alle værktøjer til at skabe professionelle matematikopgaver til print. Systemet er designet til danske lærere og pædagoger der arbejder med børnehaveklassen, 0. klasse opgaver og 1. klasse. Hver funktion hjælper dig med at lave engagerende arbejdsark og kopiark der støtter børns matematiske udvikling.',
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
        title: 'Skab Matematikopgaver på 3 Klik',
        description: `Lav færdige plusstykker og matematikopgaver på få sekunder. Vælg et tema fra billedbiblioteket eller individuelle billeder. Tryk generer og dit arbejdsark er klar. Hele processen tager under 3 minutter fra start til færdig PDF. Systemet kræver ingen designerfærdigheder eller teknisk viden.

Mange lærere bruger generatoren til at lave matematikopgaver hver uge til deres 0. klasse opgaver og 1. klasse. Du kan skifte mellem forskellige temaer og sværhedsgrader alt efter elevernes niveau. Børn elsker at arbejde med opgaver til print der indeholder billeder af dyr, frugter, køretøjer eller sæsonting.

Generatoren tilpasser automatisk opgavernes layout så de ser professionelle ud. Dit Core Bundle-abonnement giver ubegrænset adgang til at skabe arbejdsark og kopiark uden begrænsninger.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Rediger Alle Elementer på Arbejdsark',
        description: `Alt på lærredet kan redigeres efter du har genereret matematikopgaverne. Træk, roter, skalér eller slet ethvert element. Flyt billeder så de passer perfekt til dit layout. Ændr tekststørrelse og farver. Tilføj ekstra instruktioner eller hjælpetekst til eleverne.

Denne fleksibilitet er perfekt når du laver arbejdsark til 0. klasse opgaver eller 1. klasse. Nogle børn har brug for større billeder. Andre har brug for ekstra plads til at skrive deres svar. Med fuld redigeringsmulighed tilpasser du hver matematikopgave til dine elevers specifikke behov.

Du kan også kombinere matematikopgaver med andre aktiviteter. Tilføj farvelægning ved at lade eleverne farvelægge svarene. Integrér finmotorik øvelser ved at lade børn tegne streger mellem tal og mængder.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Upload Dine Egne Billeder',
        description: `Upload flere billeder på én gang i almindelige formater som JPEG og PNG. Kombinér dine egne fotos med billedbiblioteket. Lav matematikopgaver med billeder af elevernes egne ting, klasseværelsets genstande eller lokale steder børnene kender.

Dette gør arbejdsark og kopiark mere relevante og engagerende for børnene. En 0. klasse opgave om at tælle æbler bliver pludselig mere spændende når det er billeder af æblerne fra skolens have.

Mange lærere tager billeder under udflugter og bruger dem i opgaver til print bagefter. Besøgte I zoo? Lav matematikopgaver med dyrene I så. Besøgte I en gård? Skab plusstykker med gårdens dyr.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Sprog Understøttet',
        description: `Brugerflade og opgaveindhold tilgængeligt på 11 sprog: dansk, engelsk, tysk, fransk, spansk, italiensk, portugisisk, hollandsk, svensk, norsk og finsk. Skift sprog med ét klik. Perfekt til tosprogede klasser, internationale skoler eller børn der lærer fremmedsprog.

Lav matematikopgaver til print på dansk til dine 0. klasse opgaver og samme opgaver på engelsk til sprogtimen. Mange internationale skoler i Danmark bruger systemet til at skabe arbejdsark på både dansk og elevernes modersmål.

Sprogfunktionen påvirker også billednavnene i opgaverne når du bruger tekst-tunge layouts. Skab gratis skoleopgaver der automatisk tilpasser sig det valgte sprog.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommerciel Licens Inkluderet',
        description: `Kernepakke-abonnement inkluderer fuld kommerciel print-on-demand-licens uden ekstra omkostninger. Sælg dine matematikopgaver på Teachers Pay Teachers, Etsy eller i din egen webshop. Ingen krav om kreditering. Perfekt til lærere der vil bygge en side-indkomst.

Mange danske lærere tjener 3000-15000 kr om måneden ved at sælge opgaver til print og arbejdsark online. Efterspørgslen efter kvalitets matematikopgaver til 0. klasse opgaver og 1. klasse er enorm på danske og internationale platforme.

Sælgere rapporterer at billedbaserede matematikopgaver sælger særligt godt fordi de appellerer til forældre der øver med deres børn derhjemme.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: 'Over 3000 Børnevenlige Billeder',
        description: `Billedbiblioteket indeholder over 3000 børnevenlige illustrationer. Organiseret efter temaer som dyr, køretøjer, mad, natur. Gennemse billeder efter kategorier. Eller brug søgefunktionen til specifikke ord.

Billedbiblioteket dækker alle populære temaer til matematikopgaver: dyr, frugter, grøntsager, køretøjer, legetøj, værktøj, sæsoner, højtider og meget mere. Hvert tema indeholder 20-100 relaterede billeder så dine opgaver til print får variation.

Temaorganisering gør det hurtigt at skabe sammenhængende arbejdsark. Lav en matematikuges opgaver alle med dyretema. Næste uge skifter du til frugt og grøntsager.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionel 300 DPI Kvalitet',
        description: `Høj opløsning eksport perfekt til print. Download som JPEG eller PDF. Gråtone-mulighed sparer blæk. Professionel kvalitet til klasseværelset eller kommercielt salg. Alle opgaver til print eksporteres i 300 DPI.

JPEG-format er perfekt til hurtige prints af matematikopgaver. PDF bevarer den højeste kvalitet og er standardformat til professionelt tryk. Mange lærere downloader samme opgavesæt i begge formater.

Gråtone-funktionen er uvurderlig når du printer store mængder arbejdsark og kopiark. Skolen sparer blæk mens børnene stadig får klare, læsbare matematikopgaver.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Lav Matematikopgaver i 5 Nemme Trin',
    sectionDescription: 'Skab professionelle matematikopgaver og arbejdsark på under 3 minutter. Hele processen er designet til at være hurtig og intuitiv selv for lærere uden tekniske færdigheder. Fra temavalg til færdig PDF tager det kun fem enkle trin.',
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
        title: 'Vælg Indhold til Matematikopgaver',
        description: `Start med at vælge hvilket indhold dine matematikopgaver skal indeholde. Klik på Billedbibliotek-sektionen i venstre sidebar. Her ser du en dropdown-menu med alle tilgængelige temaer. Systemet indeholder over 50 forskellige temaer organiseret efter emner børn kender og elsker.

Populære temaer til matematikopgaver i 0. klasse opgaver inkluderer: Dyr (gårdsdyr, kæledyr, vilde dyr), Frugter og grøntsager, Køretøjer (biler, fly, både), Legetøj, Former og farver. Børn i 1. klasse arbejder ofte med de samme temaer men mere komplekse opgaver.

Alternativt kan du uploade dine egne billeder. Dette er perfekt til at skabe personlige arbejdsark og kopiark med ting fra dit klasseværelse. Tag fotos af elevernes egne legetøj, klassehusdyr eller genstande fra naturfagstimen.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Tilpas Indstillinger for Opgaver',
        description: `Klik på Opgavekonfiguration-sektionen for at tilpasse matematikopgavernes sværhedsgrad. Her bestemmer du hvor mange opgaver arbejdsarket skal indeholde, hvor store tal børnene skal arbejde med og hvilken type additionsopgaver du vil skabe.

Vælg antal opgaver mellem 1 og 10. For 0. klasse opgaver starter mange lærere med 4-5 opgaver pr. arbejdsark. For 1. klasse kan du øge til 8-10 opgaver. Juster efter hvor lang tid dine elever bruger og deres koncentrationsevne.

Vælg opgavetype mellem fire muligheder: Billede + Billede, Billede + Tal, Find Manglende Led eller Blandet. Blandet tilstand er perfekt til differenterede gratis skoleopgaver.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generer Din Matematikopgave',
        description: `Når du har valgt indhold og indstillinger klik på den store Generer-knap øverst til højre. Systemet genererer din matematikopgave øjeblikkeligt. Du ser resultatet på lærredet i midten af skærmen. Hele processen tager under 5 sekunder.

Systemet placerer automatisk billederne, opretter opgaverne og sætter alt i et professionelt layout. Opgavetypen du valgte bestemmer hvordan billederne arrangeres.

Et facitark genereres automatisk. Ordene er farvemarkeret i gitteret. Perfekt til hurtig rettelse. Skift mellem opgaveark og facitark med et klik på knappen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Rediger Dit Arbejdsark',
        description: `Alt på lærredet kan nu redigeres direkte. Klik på et hvilket som helst element for at vælge det. Træk for at flytte. Træk i hjørnerne for at ændre størrelse. Brug rotationshåndtaget for at dreje.

Tekstredigering er særligt vigtig for opgaver til print til små børn. Klik på tekstelementer som opgavenumre eller instruktioner. Ændr skriftstørrelse så den passer til dine elevers læseniveau.

Tilføj ekstra tekstelementer ved at klikke på Tekstværktøjer i sidebaren. Skriv differentierede instruktioner til forskellige elever.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Download og Print Arbejdsark',
        description: `Når dit arbejdsark er perfekt klik på Download-knappen øverst til højre. Vælg mellem JPEG og PDF format. Vælg mellem farve og gråtone. Marker hvilke sider du vil downloade - kun opgavearket, kun facit eller begge.

PDF-format anbefales til matematikopgaver du vil gemme eller printe professionelt. PDF bevarer den højeste kvalitet og kan åbnes på alle enheder. JPEG-format er perfekt til hurtige daglige opgaver.

Alle downloads er 300 DPI professionel kvalitet. Dette sikrer skarpe billeder og læselig tekst selv når du printer på billige skoleprintere.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Perfekt til Pædagoger, Lærere og Forældre',
    sectionDescription: 'Vores billedbaserede matematikgenerator tjener mange forskellige brugergrupper i uddannelsessystemet. Fra børnehaveklassen til hjemmeundervisning, fra SFO til special pædagogiske tilbud. Hver gruppe finder unikke måder at bruge opgaver til print og arbejdsark på.',
    badgeText: 'Hvem Er Det Til',
    readMoreLabel: 'Læs mere',
    showLessLabel: 'Vis mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Pædagoger i Børnehaveklassen',
        subtitle: 'Matematikopgaver Kombineret med Finmotorik Øvelser',
        description: `Pædagoger i børnehaveklassen og 0. klasse bruger billedbaserede matematikopgaver til at introducere talforståelse. Små børn i denne alder lærer bedst gennem konkrete visuelle objekter. Vores opgaver til print gør addition håndgribelig og meningsfuld.

Mange pædagoger kombinerer matematikopgaver med finmotorik øvelser for at støtte børns samlede udvikling. Efter børnene har talt billederne kan de øve at skrive tal med korrekt blyantgreb. Tilføj linje-trækningsopgaver hvor børn forbinder grupper med det rigtige tal.

Farvelægning er særligt populært i børnehaveklassen og 0. klasse opgaver. Print matematikopgaver i gråtone og lad børn farvelægge billederne efter de har regnet opgaven.`,
        quote: 'Mine elever elsker at tælle de farverige billeder!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lærere i 1. til 3. Klasse',
        subtitle: 'Gratis Skoleopgaver til Differenteret Undervisning',
        description: `Lærere i 1. klasse bruger billedbaserede matematikopgaver til at bygge bro mellem konkret og abstrakt tænkning. Børn i denne alder bevæger sig fra at skulle se objekter til at kunne regne med tal alene.

Differentiation er afgørende i 1. klasse hvor børn har meget forskellige matematiske niveauer. Lav flere versioner af samme arbejdsark med forskellige sværhedsgrader. Svage elever får opgaver med 1-3 objekter og billedstøtte. Stærke elever får opgaver med større tal uden billeder.

I 2. og 3. klasse kombinerer mange lærere matematikopgaver med andre fag. Brug dyrebilleder og lad børn lave både additionsopgaver og skrive fakta om dyrene.`,
        quote: 'Differentiation er blevet så meget nemmere med denne generator.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hjemmeundervisende Forældre',
        subtitle: 'Fleksible Arbejdsark til Multi-Niveau Undervisning',
        description: `Hjemmeundervisende forældre elsker systemet fordi det lader dem skabe tilpassede arbejdsark til hvert barns niveau på få minutter. Når du har børn i forskellige aldre er det tidskrævende at finde passende opgaver til print til hver enkelt.

Temabaseret læring er populært i hjemmeundervisning. Forældre skaber ofte hele ugers læringsmaterialer omkring et centralt tema. Hvis ugens tema er have-dyr lav matematikopgaver med billeder af mariehøns, bier og sommerfugle.

Upload-funktionen er perfekt til hjemmeundervisning. Tag billeder på familieudflugter og brug dem i næste uges matematikopgaver.`,
        quote: 'Et værktøj dækker alle mine børns klassetrin.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Tosprogsundervisning og DSA-lærere',
        subtitle: 'Matematikopgaver der Støtter Læse og Skrive på Dansk',
        description: `Lærere i tosprogede klasser bruger billedbaserede matematikopgaver som sprogstøtte. Billeder kommunikerer på tværs af sprogbarrierer. Et barn der stadig lærer dansk kan forstå matematikopgaven ved at se billederne selv hvis de danske ord er nye.

11-sprogs funktionen er uvurderlig for dansk som andetsprog undervisning. Lav samme matematikopgave på både dansk og barnets modersmål. Sammenlign de to versioner så barnet lærer danske ord for tal og matematiske begreber.

Kombinér matematikopgaver med specifik danskindlæring. Brug navn og dato-felter til at øve dansk skrivning.`,
        quote: 'Den flersprogede support er essentiel for mine elever.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpædagoger',
        subtitle: 'Tilpassede Opgaver til Individuelle Behov',
        description: `Specialpædagoger værdsætter den ekstreme fleksibilitet i billedgeneratoren. Børn med indlæringsvanskeligheder har brug for meget specifikke tilpasninger. Nogle har brug for større billeder. Andre har brug for mere plads mellem opgaverne.

Visuel støtte er afgørende for mange børn i specialundervisning. Billedbaserede opgaver til print gør abstrakte talkoncepter konkrete. Børn med matematikvanskeligheder ser faktiske objekter de kan tælle i stedet for symboler de ikke forstår.

Gentagen praksis med variation er en nøglestrategi i specialundervisning. Lav 20 forskellige versioner af samme opgavetype hvor kun billederne skifter.`,
        quote: 'Jeg kan hurtigt tilpasse arbejdsark til hver elevs behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lærer-Iværksættere',
        subtitle: 'Sælg Arbejdsark på Teachers Pay Teachers',
        description: `Danske lærere bygger succesfulde side-forretninger ved at sælge arbejdsark på Teachers Pay Teachers, Etsy og egne hjemmesider. Efterspørgslen efter kvalitets matematikopgaver til 0. klasse og 1. klasse er enorm.

Profitable nicher på det danske marked inkluderer sæsonbestemte matematikopgaver (jul, påske, fastelavn), tematiske læringspakker og differenterede opgavesæt til inklusion. Internationale platforme efterspørger opgaver på alle 11 sprog.

300 DPI kvalitet og professionel layout konkurrerer med store forlag. Mange købere kan ikke se forskel mellem dine arbejdsark og kommercielt producerede materialer.`,
        quote: 'Mit abonnement betalte sig selv i første måned!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from addition.md
  faq: {
    sectionTitle: 'Ofte Stillede Spørgsmål',
    sectionDescription: 'Her er svar på de mest almindelige spørgsmål om matematikopgave-generatoren. Lær om muligheder, abonnementer og hvordan du bruger opgaver til print i din undervisning.',
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
        question: 'Er matematikopgave-generatoren gratis at bruge?',
        answer: 'Matematikopgave-generatoren kræver et Kernepakke-abonnement der koster 144 USD årligt eller 15 USD månedligt. Dit abonnement giver dig ubegrænset adgang til at skabe matematikopgaver og opgaver til print uden gebyrer pr. arbejdsark. Generer så mange gratis skoleopgaver som du har brug for uden ekstra omkostninger. Abonnementet inkluderer også kommerciel licens, 11 sprog og professionel 300 DPI kvalitet.',
      },
      {
        id: '2',
        question: 'Kan jeg printe matematikopgaver hjemme på en almindelig printer?',
        answer: 'Ja, alle matematikopgaver og gratis skoleopgaver kan printes hjemme på en standard printer. Systemet eksporterer som PDF eller JPEG i 300 DPI kvalitet perfekt til almindelige inkjet- eller laserprintere. Vælg mellem farve og gråtone afhængigt af dit blækbudget. Gråtone-muligheden sparer op til 70% blæk mens opgaver til print stadig forbliver klare og læselige.',
      },
      {
        id: '3',
        question: 'Har jeg brug for designfærdigheder for at lave arbejdsark?',
        answer: 'Nej, ingen designfærdigheder kræves for at skabe professionelle matematikopgaver til 0. klasse og arbejdsark. Systemet automatiserer hele designprocessen fra billedplacering til layout-balancering. Vælg simpelthen et tema, juster indstillinger og klik generer. Opgaver til print er færdige på 3 minutter uden at skulle åbne design-software.',
      },
      {
        id: '4',
        question: 'Kan jeg bruge matematikopgaver i mit klasseværelse til alle elever?',
        answer: 'Kernepakke-abonnement inkluderer ubegrænset klasseværelsebrug til alle dine elever. Print så mange kopier af matematikopgaver og gratis skoleopgaver som du har brug for til din 0. klasse, 1. klasse eller enhver anden klasse du underviser. Del opgaver til print med kollegaer på samme skole. Lav ugentlige opgavesæt til hele indskolingen.',
      },
      {
        id: '5',
        question: 'Hvilke sprog er matematikopgaver tilgængelige på?',
        answer: 'Matematikopgaver er tilgængelige på 11 sprog: dansk, engelsk, tysk, fransk, spansk, italiensk, portugisisk (brasiliansk), hollandsk, svensk, norsk og finsk. Skift sprog med ét klik i dropdown-menuen. Både brugerflade og opgaveindhold ændres til det valgte sprog. Dette er uvurderligt for tosprogede klasser og internationale skoler.',
      },
      {
        id: '6',
        question: 'Kan jeg sælge de matematikopgaver jeg laver med generatoren?',
        answer: 'Ja, Kernepakke-abonnement inkluderer fuld kommerciel print-on-demand licens uden ekstra omkostninger. Sælg dine matematikopgaver på Teachers Pay Teachers, Etsy, din egen hjemmeside eller fysiske markeder. Ingen kreditering kræves. Ingen royalties skydes. Lav gratis skoleopgaver og arbejdsark til 0. klasse og sælg dem som digitale downloads eller fysiske prints.',
      },
      {
        id: '7',
        question: 'Hvordan tilpasser jeg matematikopgaver til mine elever?',
        answer: 'Hver matematikopgave kan tilpasses fuldstændigt efter dine elevers behov. Juster sværhedsgrad ved at ændre minimum og maksimum tal. For 0. klasse opgaver start med 1-5 objekter pr. gruppe. For avancerede elever i 1. klasse øg til 1-10. Vælg mellem billedebaserede opgaver, tal-baserede opgaver eller blandet tilstand.',
      },
      {
        id: '8',
        question: 'Hvilke aldersgrupper fungerer bedst med disse matematikopgaver?',
        answer: 'Billedbaserede matematikopgaver fungerer bedst for børn 4-9 år (børnehaveklasse til 3. klasse). Børn i denne alder lærer mest effektivt gennem visuelle konkrete objekter. Børnehaveklassen (4-5 år) bruger de simpleste opgaver med 1-3 objekter. 0. klasse (5-6 år) arbejder med 1-5 objekter. 1. klasse (6-7 år) mestrer 1-10 addition.',
      },
      {
        id: '9',
        question: 'Kan jeg uploade mine egne billeder til matematikopgaver?',
        answer: 'Ja, upload ubegrænset antal egne billeder i JPEG, PNG eller GIF formater. Klik Upload-sektionen, vælg flere filer på én gang og de tilføjes til dit session-bibliotek. Kombinér dine egne fotos med systemets 3000+ billedbibliotek for maksimal variation i dine gratis skoleopgaver. Dette personaliserer matematikopgaver.',
      },
      {
        id: '10',
        question: 'Hvor lang tid tager det at lave en matematikopgave?',
        answer: 'En komplet matematikopgave fra start til færdig PDF tager under 3 minutter. Vælg tema (30 sekunder), juster indstillinger (60 sekunder), generer (5 sekunder), download (10 sekunder). Total tid: 2-3 minutter pr. arbejdsark. Sammenlign dette med 30-60 minutter for manuel opgaveskabelse.',
      },
      {
        id: '11',
        question: 'Inkluderer matematikopgaver facit-sider?',
        answer: 'Ja, systemet genererer automatisk facit-sider med alle korrekte svar. Når du klikker "Generer Facit"-knappen skaber systemet en svarside med identisk layout som opgavearket. Alle matematikopgaver vises med beregnede svar. Dette eliminerer behovet for at regne alle opgaver igennem manuelt.',
      },
      {
        id: '12',
        question: 'Kan jeg kombinere matematikopgaver med andre aktiviteter?',
        answer: 'Ja, kreative lærere kombinerer matematikopgaver med farvelægning, finmotorik øvelser og bogstavtræning. Selvom generatoren fokuserer på addition bruger mange lærere gentagen addition som bro til multiplikation. Print matematikopgaver i gråtone og lad børn farvelægge billederne efter de har regnet opgaverne.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Kernepakke',
    price: 'kr. 1.075',
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
    guaranteeText: '30 dages pengene-tilbage-garanti',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombiner med Andre Arbejdsark Generatorer',
    sectionDescription: 'Lav komplette læringspakker ved at kombinere matematikopgaver med disse komplementære generatorer.',
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
        slug: 'subtraction',
        name: 'Subtraktion',
        category: 'Matematik',
        icon: '➖',
        description: 'Kombinér addition med subtraktion for at give eleverne komplet forståelse af grundlæggende regneoperationer.',
      },
      {
        id: '2',
        slug: 'math-worksheet',
        name: 'Matematikark',
        category: 'Matematik',
        icon: '🔢',
        description: 'Udvid matematikøvelserne med varierede arbejdsark der dækker flere matematiske koncepter.',
      },
      {
        id: '3',
        slug: 'chart-count',
        name: 'Tælle-Diagram',
        category: 'Matematik',
        icon: '📊',
        description: 'Kombinér addition med diagram-tælleøvelser for at udvikle grafisk matematikforståelse.',
      },
      {
        id: '4',
        slug: 'coloring',
        name: 'Malebilleder',
        category: 'Kunst og Kreativitet',
        icon: '🎨',
        description: 'Beløn færdiggjorte matematikopgaver med tematiske malebilleder der udvikler finmotorik.',
      },
      {
        id: '5',
        slug: 'matching',
        name: 'Matching',
        category: 'Visuel Læring',
        icon: '🔗',
        description: 'Styrk talopfattelse ved at kombinere addition med visuelle matchingøvelser.',
      },
      {
        id: '6',
        slug: 'find-and-count',
        name: 'Find og Tæl',
        category: 'Visuel Læring',
        icon: '🔍',
        description: 'Udvikl tællefærdigheder gennem interaktive søge-og-tælle aktiviteter der supplerer addition.',
      },
    ],
  },
};

export default additionDaContent;
