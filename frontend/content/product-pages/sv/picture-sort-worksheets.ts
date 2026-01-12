import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Sort Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/picture-sort-worksheets.ts
 * URL: /sv/apps/bildsortering-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/picture-sort.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Tillgång ($240/year or $25/month)
 * Swedish: Full Tillgång (2 900 SEK/år eller 300 SEK/månad)
 */

export const pictureSortSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'bildsortering-arbetsblad',
    appId: 'picture-sort',
    title: 'Sorteringsaktiviteter Barn - Arbetsblad Gratis för Förskoleklass Material och Matematik Arbetsblad',
    description: 'Skapa professionella sorteringsaktiviteter för barn med vår bildsorteringsgenerator. Generera anpassade utskrivbara sorteringsövningar perfekta för förskoleklass material och matematik arbetsblad. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'arbetsblad gratis, bildsortering, förskoleklass material, matematik arbetsblad, matte övningar, finmotorik övningar, multiplikationstabellen, siffror och tal, klockan lära sig, addition och subtraktion, målarbilder barn, bokstäver lära sig, sorteringsaktiviteter',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/bildsortering-arbetsblad',
  },

  // Hero Section - FULL text from picture-sort.md paragraphs 1-4
  hero: {
    title: 'Sorteringsaktiviteter Barn - Arbetsblad Gratis',
    subtitle: 'Förskoleklass Material och Matematik Arbetsblad Generator',
    description: `Skapa professionella sorteringsaktiviteter för barn med vår bildsorteringsgenerator. Din Full Tillgång-prenumeration ger dig obegränsad skapande av arbetsblad utan extra avgifter per arbetsblad. Generera anpassade utskrivbara sorteringsövningar perfekta för förskoleklass material och matematik arbetsblad övningar. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Bildsorteringsverktyget hjälper barn utveckla kritiskt tänkande och kategoriseringsförmåga. Barn lär sig sortera bilder i två kategorier baserat på likheter och skillnader. Verktyget genererar både arbetsblad och facit automatiskt. Perfekt för finmotorik övningar när barn kliper ut och sorterar bilder.

Din prenumeration inkluderar tillgång till 3000+ barnvänliga bilder. Välj temabaserade bilder eller ladda upp egna fotografier. Skapa sorteringsaktiviteter om siffror och tal, bokstäver lära sig, addition och subtraktion, eller valfritt ämne. Alla arbetsblad exporteras i professionell 300 DPI-kvalitet.

Använd sorteringsarbetsblad för förskoleklass material och lågstadiet. Kombinera med målarbilder barn för komplett inlärningspaket. Skapa arbetsblad gratis utan begränsning med din prenumeration. Full Tillgång inkluderar kommersiell licens för att sälja dina arbetsblad på Teachers Pay Teachers eller Etsy.`,
    previewImageSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
    ctaLabels: {
      tryFree: 'Prova Gratis',
      viewSamples: 'Visa Exempel',
    },
    trustBadges: {
      languages: '11 Språk',
      images: '3000+ Bilder',
      license: 'Kommersiell Licens',
    },
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    floatingStats: {
      time: '3 min',
      action: 'Skapa & Ladda Ner',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/picture sort/
  samples: {
    sectionTitle: 'Bildsortering Arbetsblad Exempel',
    sectionDescription: 'Ladda ner gratis exempelarbetsblad för att se vår professionella kvalitet',
    downloadLabel: 'Ladda Ner Gratis Exempel',
    worksheetLabel: 'Arbetsblad',
    answerKeyLabel: 'Facit',
    viewAllLabel: 'Visa större',
    noPdfLabel: 'Endast förhandsgranskning',
    freePdfCountLabel: 'gratis nedladdningar',
    badgeText: 'Gratis Exempel',
    downloadingLabel: 'Laddar ner...',
    ofLabel: 'av',
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/picture sort/picture sort portrait.jpeg',
        answerKeySrc: '/samples/english/picture sort/picture sort portrait answer_key.jpeg',
        altText: 'Bildsortering arbetsblad för förskoleklass kategorisering och finmotorik övningar',
        pdfDownloadUrl: '/samples/english/picture sort/picture sort portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/picture sort/picture sort landscape.jpeg',
        answerKeySrc: '/samples/english/picture sort/picture sort landscape answer_key.jpeg',
        altText: 'Bildsortering liggande arbetsblad för sorteringsaktiviteter barn',
        pdfDownloadUrl: '/samples/english/picture sort/picture sort landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL descriptions from picture-sort.md H3 sections
  features: {
    sectionTitle: 'Funktioner i Bildsorteringsgeneratorn - Allt du Behöver för Arbetsblad Gratis och Förskoleklass Material',
    sectionDescription: 'Vår bildsorteringsgenerator innehåller alla verktyg lärare behöver för professionella sorteringsaktiviteter. Skapa matematik arbetsblad med siffror och tal eller finmotorik övningar med utklippsbilder. Varje funktion är designad för enkelt användande och professionella resultat. Din Full Tillgång-prenumeration ger dig tillgång till alla funktioner utan begränsningar.',
    highlightBadgeText: 'Nyckelfunktion',
    badgeText: 'Funktioner',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    trustBadges: {
      allFeatures: 'Alla funktioner inkluderade',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Skapa Förskoleklass Material och Matematik Arbetsblad på 3 Klick - Snabb Generator för Arbetsblad Gratis',
        description: 'Bildsorteringsgeneratorn gör det enkelt att skapa professionella sorteringsaktiviteter. Välj två teman för vänster och höger sorteringskategori. Systemet väljer automatiskt passande bilder från bildbiblioteket. Klicka på Generera och ditt arbetsblad är klart på sekunder. Skapa förskoleklass material om djur, former, färger eller valfritt ämne. Generera matematik arbetsblad för att sortera udda och jämna siffror och tal. Bygg finmotorik övningar där barn kliper ut och klistrar bilder i rätt kategori. Processen tar under en minut från start till färdigt arbetsblad. Välj mellan automatisk temabaserad generering eller manuellt bildval. Automatiskt läge sparar tid när du behöver många arbetsblad snabbt. Manuellt läge ger fullständig kontroll över exakt vilka bilder som inkluderas. Perfekt för att skapa arbetsblad gratis utan designkunskaper.',
        highlighted: true,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Fullständig Redigerbarhet på Arbetsytan - Anpassa Arbetsblad Gratis och Matte Övningar',
        description: 'Allt på arbetsytan är helt redigerbart efter generering. Dra, rotera, skala eller ta bort valfritt bildelement med musen. Flytta sorteringskategorier för bättre layout. Justera textfält för namn och datum exakt där du vill ha dem. Lägg till extra textrutor för instruktioner eller övningsexempel. Ändra fontstorlek och färg för optimal läsbarhet. Använd konturfunktionen för att göra text lättare att läsa mot mönstrade bakgrunder. Varje textfält kan redigeras oberoende med olika stilval. Objektverktygsfältet aktiveras när du väljer ett element. Använd lagerverktyg för att flytta bilder framåt eller bakåt. Använd justeringsverktyg för att placera objekt exakt. Lås färdiga element för att undvika oavsiktlig förflyttning. Ångra och gör om-funktionen sparar alla ändringar automatiskt. Skapa perfekt anpassade arbetsblad gratis med full kreativ kontroll.',
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda upp Egna Bilder - Skapa Förskoleklass Material och Finmotorik Övningar med Personliga Foton',
        description: 'Uppladdningsfunktionen låter dig använda egna fotografier och bilder. Ladda upp flera filer samtidigt i JPEG, PNG eller GIF-format. Kombinera dina bilder med biblioteksbilder för unika sorteringsaktiviteter. Perfekt för att skapa personliga förskoleklass material om lokala djur eller växter. Använd klassrumsfoton för sorteringsövningar om elevernas egna upplevelser. Skapa matematik arbetsblad med foton av verkliga föremål från klassrummet. Bygg finmotorik övningar med bilder barn känner igen från sin vardag. Uppladdade bilder lagras under din session för enkel återanvändning. Skapa sorteringsarbetsblad om specifika teman som inte finns i standardbiblioteket. Använd egna teckningar eller illustrationer. Kombinera målarbilder barn har skapat med biblioteksbilder. Uppladdningsfunktionen ger obegränsade möjligheter för anpassat förskoleklass material.',
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Språk för Arbetsblad Gratis - Internationellt Förskoleklass Material och Matematik Arbetsblad',
        description: 'Generatorn stödjer 11 språk för både gränssnitt och innehåll. Välj mellan svenska, engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, danska, norska och finska. Språkinställningen påverkar alla gränssnittstexter och knappbeskrivningar. Ändra språk när som helst med en klickning. Bildbiblioteket organiseras efter språkvald nomenklatur. Svenska filnamn visas när svenska är valt. Detta gör det enklare att hitta specifika bilder för bokstäver lära sig eller siffror och tal. Flerspråkig support är ovärderlig för språklärare och internationella skolor. Skapa tvåspråkiga sorteringsaktiviteter genom att kombinera bilder från olika språk. Perfekt för ESL-undervisning och språkinlärning i förskoleklass. Använd samma arbetsblad för flera språkgrupper. Bygg förskoleklass material som fungerar över språkgränser. Språkfunktionen inkluderas utan extra kostnad i Full Tillgång-prenumerationen.',
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Inkluderad - Sälj Arbetsblad Gratis och Förskoleklass Material på Teachers Pay Teachers',
        description: 'Full Tillgång inkluderar fullständig kommersiell print-on-demand-licens utan extra kostnad. Sälj sorteringsarbetsblad på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen attribuering krävs på sålda produkter. Perfekt för lärarentreprenörer som bygger passiv inkomst. Många lärare tjänar 500-5000 kr per månad genom att sälja förskoleklass material online. Sorteringsaktiviteter är särskilt populära på Teachers Pay Teachers. Skapa temapaket med matematik arbetsblad, finmotorik övningar och målarbilder barn. Kombinera flera arbetsbladstyper för högre försäljningspris. 300 DPI-exporten säkerställer professionell kvalitet för digitala produkter. Kunder kan skriva ut dina arbetsblad gratis med perfekta resultat. Bygg en portfölj med förskoleklass material för olika ämnesområden. Marknadsför dina produkter på Pinterest och Instagram. Kommersiell licens värd 1500-2000 kr årligen hos konkurrenter ingår i din prenumeration.',
        highlighted: true,
      },
      {
        id: '6',
        icon: '📚',
        title: '3000+ Bildbibliotek - Barnvänliga Bilder för Arbetsblad Gratis och Matte Övningar',
        description: 'Bildbiblioteket innehåller över 3000 barnvänliga illustrationer. Organiserat efter teman som djur, fordon, mat, former, bokstäver och siffror. Varje bild är professionellt tecknad och optimerad för utskrift. Perfekt för att skapa förskoleklass material och matematik arbetsblad. Temafunktionen låter dig bläddra genom relaterade bilder snabbt. Sökfunktionen hittar specifika bilder direkt. Skriv "äpple" för att hitta alla äppelbilder. Sök på "siffror och tal" för numeriska bilder. Biblioteket uppdateras regelbundet med nya teman och kategorier. Använd temabilder för snabb sorteringsaktivitetsskapande. Välj "djur" för vänsterkategori och "fordon" för högerkategori. Systemet fyller automatiskt arbetsblad med passande bilder. Manuellt urval ger kontroll över exakta bilder som inkluderas. Alla bakgrunder och ramar ingår utan extra kostnad. Skapa otaliga arbetsblad gratis utan bildavgifter.',
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI-kvalitet - Högkvalitativa Arbetsblad Gratis för Utskrift och Försäljning',
        description: 'Exportfunktionen genererar högupplösta filer i 300 DPI. Välj PDF-format för bästa utskriftskvalitet eller JPEG för digital användning. Båda formaten stödjer gråskaleläge för att spara bläck. Ladda ner både arbetsblad och facit med en klickning. PDF-export bevarar vassa linjer och tydlig text. Perfekt för att skapa förskoleklass material som ska kopieras många gånger. JPEG-export fungerar utmärkt för digital distribution eller e-post till föräldrar. Gråskaleläget konverterar färgbilder till svartvita utan kvalitetsförlust. 300 DPI säkerställer professionella resultat på vanliga hemskrivare. Arbetsblad ser lika bra ut på budget-skrivare som på högkvalitativa laserskrivare. Varje detalj i bilder och text förblir skarp och tydlig. Exportera arbetsblad gratis utan vattenstämplar eller begränsningar. Full Tillgång-prenumeranter får obegränsade nedladdningar i båda formaten.',
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from picture-sort.md Step sections
  howTo: {
    sectionTitle: 'Hur man Skapar Förskoleklass Material och Matematik Arbetsblad i 5 Enkla Steg - Arbetsblad Gratis på Under 3 Minuter',
    sectionDescription: 'Skapa professionella sorteringsaktiviteter på under 3 minuter med vår steg-för-steg-process. Inga designkunskaper krävs för att generera förskoleklass material eller matematik arbetsblad. Följ dessa fem enkla steg för att skapa arbetsblad gratis med professionella resultat. Varje steg tar sekunder att slutföra och resultatet exporteras i högkvalitativt format.',
    ctaText: 'Börja Skapa Nu',
    badgeText: 'Så Fungerar Det',
    stepLabel: 'Steg',
    completionTitle: 'Klart!',
    completionSubtitle: 'Ditt arbetsblad är redo',
    readyTime: 'Klart på under 3 minuter',
    noSkillsNeeded: 'Inga designkunskaper behövs',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Steg 1: Välj Innehåll för Arbetsblad Gratis - Förskoleklass Material och Matematik Arbetsblad med Siffror och Tal',
        description: 'Första steget är att välja vilket innehåll sorteringsarbetsblad ska innehålla. Klicka på Sorteringskategorier-sektionen för att välja teman. Välj ett tema för vänster kategori och ett annat för höger kategori. Systemet visar alla tillgängliga teman i rullgardinsmenyer. Populära temaval inkluderar djur mot fordon, färger mot former, eller siffror och tal mot bokstäver. För matematik arbetsblad välj udda mot jämna tal eller stora mot små siffror och tal. För språkinlärning välj vokaler mot konsonanter när barn bokstäver lära sig. För förskoleklass material kombinera teman barn känner igen från vardagen. Alternativt använd Bildbibliotek-sektionen för manuellt urval. Bläddra genom teman eller använd sökfunktionen. Välj upp till 12 bilder totalt för arbetsblad. Tilldela varje bild till vänster eller höger kategori genom att klicka på kategoriknappar. Manuellt läge ger exakt kontroll över vilka bilder inkluderas. Perfekt för anpassade förskoleklass material och finmotorik övningar.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Steg 2: Anpassa Inställningar för Förskoleklass Material - Matematik Arbetsblad och Finmotorik Övningar',
        description: 'Andra steget är att anpassa sidinställningar efter dina behov. Öppna Sidinställningar-sektionen för att välja sidstorlek. Letter Portrait fungerar bra för standardutskrifter. Letter Landscape ger större bilder för finmotorik övningar. A4-format är standard i Sverige och Europa. Välj sidfärg genom färgväljaren om du vill färgad bakgrund. Välj bakgrundstema från rullgardinsmenyn för dekorativa bakgrunder. Bakgrunder gör arbetsblad gratis mer visuellt tilltalande för barn. Justera opacitet med skjutreglaget för att inte överväldiga huvudinnehållet. Välj ramtema för professionell finish på förskoleklass material. Ramar ger arbetsblad polerad look perfekt för säljning på Teachers Pay Teachers. Justera ramopacitet för subtilt eller tydligt ramutseende. Markera Inkludera Namn/Datum-fält om du vill att barn skriver sina namn. Dessa anpassningar fungerar för alla arbetsbladstyper från matematik arbetsblad till målarbilder barn.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Steg 3: Generera Arbetsblad Gratis - Skapa Förskoleklass Material och Matte Övningar på Sekunder',
        description: 'Tredje steget är att generera arbetsblad och facit. Klicka på Generera-knappen i toppmenyn. Välj Skapa Arbetsblad från rullgardinsmenyn. Systemet genererar sorteringsaktivitet på sekunder. Alla valda bilder placeras slumpmässigt på arbetsytan. Arbetsbladet visar båda sorteringskategorierna tydligt markerade. Bilder blandas automatiskt för att skapa pedagogiskt värdefullt sorteringsövning. Genereringen tar 2-3 sekunder även för komplexa matematik arbetsblad med många element. Förhandsgranska resultatet direkt på arbetsytan. Klicka på Facit-fliken för att generera lösningsnyckeln. Välj Skapa Facit från Generera-menyn. Facit visar alla bilder korrekt sorterade i respektive kategori. Detta sparar lärartid vid rättning av finmotorik övningar. Både arbetsblad och facit exporteras separat. Generera obegränsat antal arbetsblad gratis med din Full Tillgång-prenumeration.',
        icon: '⚡',
      },
      {
        id: '4',
        number: 4,
        title: 'Steg 4: Redigera på Arbetsytan - Anpassa Matematik Arbetsblad och Förskoleklass Material Perfekt',
        description: 'Fjärde steget är att anpassa genererat innehåll efter exakta behov. Klicka på valfritt element för att välja det. Dra bilder till nya positioner med musen. Rotera bilder genom att dra rotationshandtaget. Skala bilder större eller mindre genom att dra hörnhandtagen. Lägg till textrutor med instruktioner för sorteringsaktiviteten. Öppna Textverktyg-sektionen och skriv innehåll. Klicka på Lägg till Text för att placera textrutan på arbetsytan. Anpassa fontstorlek för optimal läsbarhet i förskoleklass material. Ändra textfärg för kontrast mot bakgrund. Använd objektverktygsfältet för precision. Justera element vänster, höger, topp eller botten. Centrera objekt horisontellt eller vertikalt på sidan. Flytta element framåt eller bakåt i lagerordning. Lås färdiga element för att undvika oavsiktlig flytt. Ångra-funktionen låter dig testa olika layouter riskfritt. Skapa perfekt anpassade matematik arbetsblad och arbetsblad gratis med full kontroll.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Steg 5: Ladda ner och Skriv ut Arbetsblad Gratis - Förskoleklass Material i Professionell Kvalitet',
        description: 'Femte och sista steget är att exportera färdiga arbetsblad. Klicka på Ladda ner-knappen i toppmenyn. Välj Arbetsblad (PDF) för högsta utskriftskvalitet. PDF-formatet bevarar alla detaljer perfekt för förskoleklass material. Alternativt välj JPEG för digital distribution eller e-post. Ladda ner facit separat genom att välja Facit (PDF) eller Facit (JPEG). Facit exporteras med samma kvalitet som arbetsblad. Båda filerna namnges automatiskt för enkel organisation. Filer sparas direkt till din nedladdningsmapp klara för utskrift. Aktivera gråskaleläget före nedladdning för att spara skrivarbläck. Gråskalekonvertering bevarar bildkvalitet medan den eliminerar färgbläckanvändning. Perfekt för stora arbetsbladsstaplar. Skriv ut på vanlig hemskrivare eller professionell kopiator. 300 DPI-kvalitet säkerställer skarpa resultat varje gång. Skapa obegränsat antal arbetsblad gratis utan nedladdningsgränser eller vattenstämplar.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from picture-sort.md persona sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare, Föräldrar och Pedagoger - Förskoleklass Material och Matematik Arbetsblad för Alla Behov',
    sectionDescription: 'Bildsorteringsgeneratorn fungerar för alla som undervisar barn i förskoleklass och lågstadiet. Skapa förskoleklass material om siffror och tal eller bokstäver lära sig. Generera matematik arbetsblad med addition och subtraktion eller multiplikationstabellen. Kombinera sorteringsaktiviteter med målarbilder barn och finmotorik övningar. Full Tillgång passar alla undervisningssituationer från klassrum till hemundervisning.',
    badgeText: 'Användningsområden',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Förskoleklass Lärare',
        subtitle: 'Siffror och Tal, Bokstäver Lära sig och Finmotorik Övningar',
        description: 'Förskoleklass lärare använder sorteringsaktiviteter för kognitiv utveckling och kategoriseringsförmåga. Skapa förskoleklass material om djur, fordon, färger och former. Barn lär sig sortera objekt baserat på gemensamma egenskaper. Detta bygger kritiskt tänkande och logiska resonemangsförmågor. Kombinera sorteringsarbetsblad med andra förskoleklass material. Skapa aktiviteter om siffror och tal där barn sorterar udda och jämna. Bygg övningar för bokstäver lära sig genom att sortera vokaler och konsonanter. Integrera finmotorik övningar genom utklipps- och inklistringsaktiviteter. Barn utvecklar både kognitiva och motoriska färdigheter samtidigt. Sorteringsaktiviteter fungerar perfekt för temaarbete i förskoleklass. Skapa säsongsbaserade sorteringsövningar om höst, vinter, vår och sommar. Kombinera med målarbilder barn för komplett temapaket. Generera obegränsat antal arbetsblad gratis för hela läsåret.',
        quote: 'Mina elever älskar att sortera bilder i olika kategorier varje dag!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare Årskurs 1-3',
        subtitle: 'Matematik Arbetsblad med Addition och Subtraktion, Multiplikationstabellen och Siffror och Tal',
        description: 'Lågstadielärare i årskurs 1-3 använder sorteringsaktiviteter för matematik arbetsblad och språkutveckling. Skapa sorteringsövningar om addition och subtraktion där elever kategoriserar räkneuppgifter efter summa. Bygg aktiviteter med multiplikationstabellen där barn sorterar produkter i grupper. Använd siffror och tal för att sortera primtal, jämna tal eller tal delbart med specifika siffror. Sorteringsarbetsblad stärker matematiskt tänkande och problemlösning. Elever analyserar mönster och relationer mellan siffror och tal. Kombinera sortering med klockan lära sig genom att kategorisera olika klockslag. Integrera finmotorik övningar genom utklippning och organisering av talexempel. Skapa matematik arbetsblad som täcker hela kursplanen. Använd sortering för språkinlärning när elever bokstäver lära sig. Kategorisera ord efter första bokstav eller antal stavelser. Generera arbetsblad gratis för hela klassen utan begränsningar. Full Tillgång ger tillgång till alla 33 verktyg perfekt för lågstadiet.',
        quote: 'Sorteringsarbetsblad integreras perfekt med matematik och språkövningar!',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemundervisande Föräldrar',
        subtitle: 'Arbetsblad Gratis med Förskoleklass Material och Matte Övningar',
        description: 'Hemundervisande föräldrar uppskattar flexibiliteten att skapa anpassade arbetsblad gratis. Generera förskoleklass material perfekt anpassat efter barnets intresseområden. Skapa matematik arbetsblad på exakt rätt nivå för ditt barns utveckling. Kombinera sorteringsaktiviteter med målarbilder barn för varierad inlärning hemma. Sorteringsarbetsblad fungerar utmärkt för multialders hemundervisning. Skapa enklare aktiviteter med siffror och tal för yngre barn. Bygg mer avancerade övningar med multiplikationstabellen för äldre syskon. Använd samma verktyg för bokstäver lära sig och finmotorik övningar. En prenumeration täcker alla barns behov. Hemundervisande familjer sparar tusentals kronor genom att skapa arbetsblad gratis. Inga kostnader för förlagsproducerade arbetshäften eller enskilda arbetsbladsköp. Generera obegränsat förskoleklass material och matematik arbetsblad. Full Tillgång kostar 300 kr per månad för tillgång till alla 33 verktyg.',
        quote: 'Ett abonnemang täcker alla mina barns behov på olika nivåer!',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Språklärare',
        subtitle: 'Bokstäver Lära sig och Arbetsblad Gratis för Flerspråkig Undervisning',
        description: 'Språklärare använder sorteringsaktiviteter för vokabulärutveckling och kategorisering. Skapa övningar där elever sorterar ord efter tema eller ordklass. Bygg aktiviteter för bokstäver lära sig genom att kategorisera ord efter första ljud. Använd 11 språkstödet för att skapa flerspråkiga sorteringsarbetsblad. Sortering hjälper språkinlärare förstå semantiska relationer mellan ord. Elever kategoriserar synonymer, antonymer eller relaterade begrepp. Kombinera sorteringsaktiviteter med målarbilder barn för visuellt vokabulärstöd. Integrera finmotorik övningar genom utklippning och organisering av ordkort. Skapa arbetsblad gratis för hela språkkursen. Svenska som andraspråk lärare bygger sorteringsövningar om vardagliga teman. Kategorisera mat, kläder, möbler eller transporter. Använd bildbiblioteket med svenska filnamn för språkinlärning. Kombinera med matematik arbetsblad för CLIL-undervisning där elever lär både språk och matematik. Full Tillgång-prenumerationen stödjer alla 11 språk utan extra kostnad.',
        quote: 'Svenska arbetsbladen hjälper mina andraspråkselever bygga ordförråd!',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Förskoleklass Material och Finmotorik Övningar för Differentierad Undervisning',
        description: 'Specialpedagoger använder sorteringsaktiviteter för differentierad undervisning och anpassade övningar. Skapa förskoleklass material med större bilder för elever med synnedsättning. Generera enklare sorteringsuppgifter med färre kategorier för elever som behöver extra stöd. Anpassa finmotorik övningar efter varje elevs motoriska förmåga. Sorteringsarbetsblad bygger kognitiva färdigheter på strukturerat och förutsägbart sätt. Elever med autismspektrumtillstånd drar nytta av tydliga kategorier och visuellt stöd. Kombinera sortering med målarbilder barn för multisensorisk inlärning. Använd samma bilder över flera arbetsblad för igenkänning och trygghet. Skapa arbetsblad gratis anpassade efter varje elevs behov. Specialpedagoger uppskattar redigerbarhetsfunktionen för individanpassning. Förstora text för bättre läsbarhet. Justera antal element efter elevens koncentrationsförmåga. Kombinera sortering med matematik arbetsblad för elever som behöver extra träning på siffror och tal. Full Tillgång ger flexibilitet att skapa exakt rätt stödmaterial för varje elev.',
        quote: 'Jag kan snabbt anpassa arbetsblad för varje elevs individuella behov!',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälj Arbetsblad Gratis och Förskoleklass Material på Teachers Pay Teachers',
        description: 'Lärarentreprenörer bygger passiva inkomster genom att sälja förskoleklass material och matematik arbetsblad online. Skapa sorteringsarbetsbladspaket för försäljning på Teachers Pay Teachers. Kombinera sorteringsaktiviteter med målarbilder barn, finmotorik övningar och matematik arbetsblad för högre försäljningspris. Full Tillgång inkluderar kommersiell licens värd 1500-2000 kr årligen. Sorteringsarbetsblad är mycket populära på Teachers Pay Teachers och Etsy. Skapa temapaket om siffror och tal, bokstäver lära sig eller säsongsbaserade teman. Bygg omfattande resurser med multiplikationstabellen eller addition och subtraktion. Kombinera flera arbetsbladstyper för premium-prissättning. Många lärare tjänar 500-5000 kr per månad. 300 DPI-exporten säkerställer professionell kvalitet för digitala produkter. Kunder kan skriva ut arbetsblad gratis med perfekta resultat. Bygg en portfölj med förskoleklass material för olika ämnesområden och årskurser. Marknadsför produkter på Pinterest med visuellt tilltalande provbilder. Full Tillgång-prenumeration på 300 kr per månad ger obegränsad produktskapande för din lärarbusiness.',
        quote: 'Jag tjänade tillbaka abonnemangskostnaden redan första månaden!',
      },
    ],
  },

  // FAQ Section - ALL questions from picture-sort.md
  faq: {
    sectionTitle: 'Vanliga Frågor om Förskoleklass Material, Arbetsblad Gratis och Matematik Arbetsblad',
    sectionDescription: 'Lärare och föräldrar har många frågor om bildsorteringsgeneratorn innan de börjar använda verktyget. Denna sektion besvarar de vanligaste frågorna om att skapa förskoleklass material, matematik arbetsblad och målarbilder barn. Läs om prenumerationskostnader, kommersiell användning och tekniska möjligheter.',
    showMoreText: 'Visa fler frågor',
    showLessText: 'Visa färre',
    badgeText: 'Vanliga Frågor',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    secureCheckout: 'Säker betalning',
    cancelAnytime: 'Avsluta när som helst',
    items: [
      {
        id: '1',
        question: 'Är Denna Generator för Arbetsblad Gratis och Förskoleklass Material Verkligen Gratis att Använda?',
        answer: 'Bildsorteringsgeneratorn kräver Full Tillgång-prenumeration som kostar 2 900 kr årligen eller 300 kr månadsligan. Din prenumeration ger dig obegränsad skapande av sorteringsarbetsblad utan extra avgifter per arbetsblad. Generera så många förskoleklass material och matematik arbetsblad du behöver utan ytterligare kostnader. Full Tillgång inkluderar Baspaket med 10 populära generatorer plus 23 ytterligare verktyg. Full Tillgång kostar 2 900 kr årligen och inkluderar alla 33 arbetsbladsgeneratortyper. Prenumerationen inkluderar kommersiell licensiering, 11 språkstöd och professionell 300 DPI-kvalitetsexport. Skapa arbetsblad gratis från per-arbetsblad avgifter med din prenumeration.',
      },
      {
        id: '2',
        question: 'Kan jag Skriva ut Målarbilder Barn och Matematik Arbetsblad Hemma på Vanlig Skrivare?',
        answer: 'Ja. Sorteringsarbetsblad, målarbilder barn och förskoleklass material exporteras i 300 DPI-kvalitet perfekt för hemutskrift. Vanliga bläckstråleskrivare och laserskrivare hanterar PDF- och JPEG-formaten utan problem. Arbetsblad ser professionella ut på budget-skrivare likväl som högkvalitativa kontorsskrivare. Använd gråskaleläget före nedladdning för att spara skrivarbläck när du skriver ut målarbilder barn och matematik arbetsblad. Gråskalekonvertering bevarar bildkvalitet medan den eliminerar färgbläckanvändning. Detta sparar betydande kostnader vid utskrift av stora arbetsbladsstaplar. Letter- och A4-sidstorlekar passar standardskrivarformat. Skriv ut förskoleklass material och arbetsblad gratis utan specialutrustning.',
      },
      {
        id: '3',
        question: 'Behöver jag Designkunskaper för att Skapa Klockan Lära sig Material och Bokstäver Lära sig Arbetsblad?',
        answer: 'Nej. Generatorn är byggd för lärare utan designerfarenhet. Välj teman och systemet skapar professionellt förskoleklass material automatiskt. Skapa klockan lära sig aktiviteter, bokstäver lära sig övningar och matematik arbetsblad med siffror och tal på sekunder. Alla verktyg använder enkla klickbaserade gränssnitt. Temabaserad generering kräver bara val av två kategorier. Systemet fyller arbetsblad automatiskt med lämpliga bilder. För klockan lära sig sortering välj morgonaktiviteter mot kvällsaktiviteter. För bokstäver lära sig välj vokaler mot konsonanter. Manuellt läge ger mer kontroll men kräver fortfarande inga designkunskaper. Drag-and-drop redigering är intuitiv för alla användare. Skapa arbetsblad gratis utan grafisk designutbildning.',
      },
      {
        id: '4',
        question: 'Kan jag Använda Siffror och Tal Arbetsblad och Finmotorik Övningar i mitt Klassrum för Elever?',
        answer: 'Full Tillgång-prenumeration inkluderar obegränsad klassrumsanvändning av sorteringsarbetsblad, siffror och tal aktiviteter och finmotorik övningar. Skriv ut förskoleklass material för alla dina elever utan begränsningar. Använd matematik arbetsblad med addition och subtraktion och multiplikationstabellen för hela klassen. Ingen extra licens krävs för pedagogisk klassrumsanvändning. Skapa personliga kopior för varje elev med olika svårighetsnivåer. Generera finmotorik övningar anpassade efter enskilda elevers behov. Kombinera sorteringsaktiviteter med målarbilder barn för temaarbete. Bygg arbetsbladspaket om siffror och tal, bokstäver lära sig och klockan lära sig för veckoarbete. Full Tillgång täcker all klassrumsanvändning med en prenumeration. Dela arbetsblad gratis med kollegor i din skola för samarbetande planering.',
      },
      {
        id: '5',
        question: 'Vilka Språk är Tillgängliga för Klockan Lära sig och Bokstäver Lära sig Arbetsblad?',
        answer: 'Generatorn stödjer 11 språk för både gränssnitt och innehåll när du skapar klockan lära sig material och bokstäver lära sig aktiviteter. Välj mellan svenska, engelska, tyska, franska, spanska, portugisiska, italienska, nederländska, danska, norska och finska. Språkinställningen påverkar bildbiblioteksnamn vilket är viktigt för bokstäver lära sig övningar. Flerspråkigt stöd är ovärderligt för ESL-lärare och internationella skolor. Skapa samma sorteringsaktivitet på flera språk för tvåspråkiga elever. Använd svenska bildnamn för bokstäver lära sig när barn lär sig svenska. Kombinera olika språk för jämförande språkstudier. Bygg klockan lära sig material på elevernas modersmål för bättre förståelse. Alla 11 språk inkluderas utan extra kostnad i Full Tillgång.',
      },
      {
        id: '6',
        question: 'Kan jag Sälja Målarbilder Barn, Addition och Subtraktion Arbetsblad och Multiplikationstabellen Material jag Skapar?',
        answer: 'Ja. Full Tillgång inkluderar fullständig kommersiell print-on-demand-licens utan extra kostnad. Sälj sorteringsarbetsblad, målarbilder barn, addition och subtraktion övningar och multiplikationstabellen material på Teachers Pay Teachers, Etsy eller Amazon KDP. Ingen attribuering krävs på sålda produkter. Många lärare bygger lönsamma sidoinkomster genom att sälja förskoleklass material online. Skapa temapaket kombinera sorteringsaktiviteter med målarbilder barn och finmotorik övningar. Bygg omfattande matematik arbetsblad samlingar med siffror och tal, addition och subtraktion och multiplikationstabellen. Lägg till klockan lära sig och bokstäver lära sig material för premium-paket. 300 DPI-kvalitet säkerställer professionell standard kunder förväntar sig. Kommersiell licens värd 1500-2000 kr årligen hos konkurrenter ingår i din Full Tillgång-prenumeration.',
      },
      {
        id: '7',
        question: 'Hur Anpassar jag Multiplikationstabellen och Siffror och Tal Sorteringsarbetsblad för mina Elever?',
        answer: 'Anpassning sker på flera nivåer när du skapar multiplikationstabellen och siffror och tal arbetsblad. Välj specifika teman och bilder för sorteringskategorier. Ladda upp egna bilder för personliga finmotorik övningar. Efter generering dra, rotera och skala alla element på arbetsytan för perfekt layout. Lägg till anpassade textinstruktioner för addition och subtraktion övningar. Ändra fontstorlek och färg för optimal läsbarhet i förskoleklass material. Välj sidstorlek och orientering baserat på elevernas behov. Justera antal element för olika svårighetsnivåer i matematik arbetsblad. För multiplikationstabellen sortering skapa enklare versioner med färre produkter eller avancerade med fler. Kombinera med målarbilder barn för multisensorisk inlärning. Varje arbetsblad kan anpassas exakt efter elevgrupp. Skapa arbetsblad gratis anpassade för varje barns utvecklingsnivå.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Fungerar Bäst med Finmotorik Övningar och Klockan Lära sig Material?',
        answer: 'Sorteringsarbetsblad, finmotorik övningar och klockan lära sig material fungerar bäst för barn 4-9 år. Förskoleklass och årskurs 1-3 är de primära målåldersgrupperna. Anpassa svårighetsnivå genom att välja enklare eller mer komplexa sorteringskategorier för matematik arbetsblad och bokstäver lära sig aktiviteter. Fyraåringar drar nytta av enkla sorteringsaktiviteter med tydliga visuella skillnader kombinerade med målarbilder barn och finmotorik övningar. Femåringar hanterar mer abstrakta kategorier som siffror och tal sortering. Sexåringar i förskoleklass kan sortera bokstäver lära sig mellan vokaler och konsonanter. Sjuåringar i årskurs 1 sorterar addition och subtraktion uppgifter efter summa. Åtta- och nioåringar bygger komplexa multiplikationstabellen sorteringar och klockan lära sig kategoriseringar. Specialpedagoger anpassar sorteringsarbetsblad för alla utvecklingsnivåer.',
      },
      {
        id: '9',
        question: 'Kan jag Ladda upp Egna Bilder för Addition och Subtraktion och Bokstäver Lära sig Arbetsblad?',
        answer: 'Ja. Uppladdningsfunktionen stödjer JPEG, PNG och GIF-format för dina egna bilder i addition och subtraktion arbetsblad och bokstäver lära sig material. Ladda upp flera filer samtidigt och kombinera med biblioteksbilder. Perfekt för att skapa personliga förskoleklass material om lokala djur, växter eller klassrumsobjekt i matematik arbetsblad. Använd klassrumsfoton för sorteringsövningar barn känner igen. Skapa bokstäver lära sig aktiviteter med bilder av elevernas namn. Bygg addition och subtraktion övningar med foton av verkliga räkneobjekt. Kombinera uppladdade bilder med målarbilder barn från biblioteket. Uppladdade bilder lagras under sessionen för återanvändning i multiplikationstabellen material och klockan lära sig arbetsblad. Full Tillgång-prenumeranter laddar upp obegränsat antal bilder.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar det att Skapa Målarbilder Barn kombinerat med Multiplikationstabellen Arbetsblad?',
        answer: 'Skapa professionella sorteringsarbetsblad, målarbilder barn-kombinationer och multiplikationstabellen material på under 3 minuter. Temabaserad automatisk generering tar 30 sekunder från start till färdigt arbetsblad. Manuellt bildval adderar 1-2 minuter beroende på hur många bilder du väljer för matematik arbetsblad och finmotorik övningar. Förskoleklass material om siffror och tal genereras på sekunder. Addition och subtraktion sorteringsarbetsblad skapas lika snabbt. Klockan lära sig aktiviteter och bokstäver lära sig övningar tar samma korta tid. Jämfört med manuellt arbetsbladsskapande som tar 30-60 minuter representerar detta 90% tidsbesparing. Generera veckans alla arbetsblad gratis på söndagseftermiddag istället för kvällsarbete varje dag. Kombinera sortering med målarbilder barn för komplett lektionspaket på under 5 minuter total.',
      },
      {
        id: '11',
        question: 'Inkluderar Klockan Lära sig och Siffror och Tal Sorteringsarbetsblad Facit?',
        answer: 'Ja. Både klockan lära sig material och siffror och tal arbetsblad inkluderar automatiskt genererade facit. Klicka på Facit-fliken och välj Skapa Facit från Generera-menyn. Facit visar alla bilder korrekt sorterade i respektive kategori för matematik arbetsblad, addition och subtraktion övningar och multiplikationstabellen sorteringar. Facit sparar enormt med lärartid vid rättning av bokstäver lära sig övningar och finmotorik övningar. Exportera facit separat som PDF eller JPEG tillsammans med arbetsbladet. Båda filerna namnges tydligt för enkel organisation av förskoleklass material. Använd facit för självständig elevkontroll i äldre årskurser. Kombinera sorteringsarbetsblad med målarbilder barn där facit visar korrekt färgkategorisering. Generera obegränsat antal arbetsblad gratis med medföljande facit. Full Tillgång inkluderar facit för alla 33 verktygstyper.',
      },
      {
        id: '12',
        question: 'Kan jag Skapa Arbetsblad Gratis om Specifika Ämnen som Bokstäver Lära sig och Klockan Lära sig?',
        answer: 'Ja. Generatorn stödjer alla ämnesområden för förskoleklass material och matematik arbetsblad. Skapa bokstäver lära sig sortering mellan vokaler och konsonanter. Bygg klockan lära sig aktiviteter som kategoriserar morgon-, dag- och kvällsaktiviteter. Generera siffror och tal sortering mellan udda och jämna eller stora och små. Skapa matematik arbetsblad med addition och subtraktion genom att sortera uppgifter efter summa. Bygg multiplikationstabellen övningar genom att kategorisera produkter. Kombinera sorteringsarbetsblad med målarbilder barn för konstintegration. Använd finmotorik övningar genom utklipps- och inklistringsaktiviteter. Bildbiblioteket täcker alla förskoleklass material ämnen från djur till geometriska former. Ladda upp egna bilder för specialiserade teman inte i standardbiblioteket. Skapa arbetsblad gratis om valfritt ämnesområde.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Full Tillgång',
    price: '2 900 kr',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsat skapande av arbetsblad',
      'Kommersiell licens inkluderad',
      '11 språk stöds',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
      'Facit inkluderat',
      'Alla 33 arbetsblad generatorer',
      'Dubbla genereringslägen',
    ],
    ctaText: 'Börja Skapa Nu',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera Sorteringsarbetsblad med Andra Arbetsblad Gratis - Kompletta Förskoleklass Material och Matematik Arbetsblad Paket',
    sectionDescription: 'Bildsorteringsgeneratorn fungerar utmärkt i kombination med andra verktyg på plattformen. Full Tillgång ger tillgång till alla 33 arbetsbladsgeneratorer. Kombinera sorteringsaktiviteter med målarbilder barn, matematik arbetsblad och finmotorik övningar för komplett lärpaket. Skapa temabaserade arbetsbladssamlingar som täcker flera ämnesområden samtidigt.',
    ctaTitle: 'Redo att Skapa Fantastiska Arbetsblad?',
    ctaDescription: 'Gå med tusentals pedagoger som skapar professionella arbetsblad. Obegränsat skapande, kommersiell licens inkluderad.',
    primaryCtaText: 'Starta Gratis Provperiod',
    secondaryCtaText: 'Visa Alla 33 Appar',
    badgeText: 'Fungerar Utmärkt Med',
    exploreText: 'Utforska alla appar',
    trustBadges: {
      guarantee: '30 dagars garanti',
      securePayment: 'Säker betalning',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        slug: 'addition-arbetsblad',
        name: 'Additionsarbetsblad',
        category: 'Matematik',
        icon: '➕',
        description: 'Kombinera sorteringsarbetsblad med additionsarbetsblad för omfattande matte övningar. Elever sorterar räknebilder och löser sedan traditionella additionsuppgifter.',
      },
      {
        id: '2',
        slug: 'malarbilder-arbetsblad',
        name: 'Målarbilder',
        category: 'Konst & Kreativitet',
        icon: '🎨',
        description: 'Skapa kompletta aktivitetspaket kombinera sortering med målarbilder barn. Elever sorterar bilder och färglägger sedan dem enligt kategorier.',
      },
      {
        id: '3',
        slug: 'matchning-arbetsblad',
        name: 'Matchningsarbetsblad',
        category: 'Visuellt Lärande',
        icon: '🔗',
        description: 'Para ihop bildsortering med matchningsarbetsblad för visuell diskrimineringsförmåga. Elever sorterar kategorier och matchar sedan identiska par inom grupperna.',
      },
      {
        id: '4',
        slug: 'hitta-och-rakna-arbetsblad',
        name: 'Hitta och Räkna',
        category: 'Matematik',
        icon: '🔢',
        description: 'Para ihop sorteringsarbetsblad med räkneaktiviteter för siffror och tal träning. Sortera bilder efter typ och räkna sedan varje kategori för datainsamling.',
      },
      {
        id: '5',
        slug: 'rita-linjer-arbetsblad',
        name: 'Rita Linjer',
        category: 'Finmotorik',
        icon: '✏️',
        description: 'Kombinera sorteringsaktiviteter med rita linjer arbetsblad för komplett finmotorik övningar. Elever sorterar och spårar sedan vägar mellan relaterade objekt.',
      },
      {
        id: '6',
        slug: 'stor-liten-arbetsblad',
        name: 'Stor och Liten',
        category: 'Tidig Inlärning',
        icon: '📏',
        description: 'Kombinera storlekssortering med stor och liten arbetsblad för jämförelseförmåga. Elever sorterar efter storleksattribut och övar sedan storleksvokabulär.',
      },
    ],
  },
};

export default pictureSortSvContent;
