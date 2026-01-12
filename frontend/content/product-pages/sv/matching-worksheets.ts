import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/matching-worksheets.ts
 * URL: /sv/apps/matchnings-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'matchnings-arbetsblad',
    appId: 'matching-app',
    title: 'Matchningsarbetsblad Gratis - Matematik Arbetsblad och Bokstäver Lära Sig | MatchUp Maker för Förskoleklass Material',
    description: 'Skapa professionella matchningsövningar med vår arbetsblad gratis generator. Generera anpassningsbara matematik arbetsblad och bokstäver lära sig material perfekt för förskoleklass material och årskurs 1-3. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
    keywords: 'matchningsarbetsblad, arbetsblad gratis, förskoleklass material, matematik arbetsblad, bokstäver lära sig, matchningsövningar, finmotorik övningar, målarbilder barn, siffror och tal, multiplikationstabellen',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/matchnings-arbetsblad',
  },

  // Hero Section - FULL text from matching.md paragraphs 1-4
  hero: {
    title: 'Matchningsarbetsblad Gratis',
    subtitle: 'Matematik Arbetsblad och Bokstäver Lära Sig - MatchUp Maker för Förskoleklass Material',
    description: `Skapa professionella matchningsövningar med vår arbetsblad gratis generator. Din Grundpaketet-prenumeration ger dig obegränsad skapande av arbetsblad utan avgifter per arbetsblad. Generera anpassningsbara matematik arbetsblad och bokstäver lära sig material perfekt för förskoleklass material och årskurs 1-3. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Matchningsgeneratorn erbjuder fyra olika matchningslägen. Matcha bilder med bokstäver för alfabetsträning. Matcha bild plus ord med bild plus ord för ordförrådsbyggande. Välj bild eller ord kontra bild eller ord för flexibel differentiering. Använd anpassade ord för tematisk undervisning.

Lämplig för förskoleklass material, årskurs 1, årskurs 2 och årskurs 3. Perfekt för matematik arbetsblad om siffror och tal, addition och subtraktion. Idealisk för bokstäver lära sig genom matchningsaktiviteter. Kombinera med målarbilder barn för komplett finmotorik övningar.

Varje arbetsblad gratis mall inkluderar fullt redigerbar canvas. Dra, rotera, skala och ta bort alla element med din mus. Ladda upp dina egna bilder för personalisering. Välj bland 3000+ bilder organiserade efter tema. Exportera som professionell 300 DPI PDF eller JPEG för utskrift eller försäljning online.`,
    previewImageSrc: '/samples/english/matching/matching portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Matchningsarbetsblad Exempel',
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
        worksheetSrc: '/samples/english/matching/matching portrait.jpeg',
        answerKeySrc: '/samples/english/matching/matching portrait answer_key.jpeg',
        altText: 'Matchningsarbetsblad i porträttformat med bilder och bokstäver för förskoleklass',
        pdfDownloadUrl: '/samples/english/matching/matching portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/matching/image and word.jpeg',
        answerKeySrc: '/samples/english/matching/image and word answer_key.jpeg',
        altText: 'Matchningsövning med bilder och ord för ordförrådsträning lågstadiet',
        pdfDownloadUrl: '/samples/english/matching/image and word.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/matching/image and custom word.jpeg',
        answerKeySrc: '/samples/english/matching/image and custom word answer_key.jpeg',
        altText: 'Anpassad matchningsarbetsblad med egna ord för tematisk undervisning',
        pdfDownloadUrl: '/samples/english/matching/image and custom word.pdf',
      },
    ],
  },

  // Features Grid - FULL text from matching.md feature sections
  features: {
    sectionTitle: 'MatchUp Maker Funktioner - Allt Du Behöver för Arbetsblad Gratis och Förskoleklass Material',
    sectionDescription: 'Matchningsgeneratorn innehåller sju professionella funktioner för att skapa arbetsblad gratis. Varje funktion designad för lärare som behöver matematik arbetsblad och bokstäver lära sig material snabbt. Perfekt för förskoleklass material, lågstadiet och hemundervisning. Alla funktioner inkluderade i din Grundpaketet-prenumeration utan extra avgifter.',
    highlightBadgeText: 'Nyckelfunktion',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alla funktioner ingår',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Skapa Arbetsblad Gratis på 3 Klick - Snabb Generator för Förskoleklass Material',
        description: `Generera professionella matchningsarbetsblad på under tre minuter. Välj ditt matchningsläge från fyra alternativ. Välj antal par mellan fyra och sex övningar. Klicka generera och ditt arbetsblad gratis visas direkt.

Inga designkunskaper krävs för att skapa förskoleklass material. Ingen programvaruinstallation nödvändig. Fungerar direkt i din webbläsare på datorer och surfplattor. Perfekt för upptagna lärare som behöver matematik arbetsblad snabbt.

Välj mellan slumpmässigt tema och bilder för snabb generering. Välj slumpmässigt från valt tema för tematisk enhetlighet. Välj specifika bilder för exakt kontroll över innehållet. Använd anpassade ord för personaliserad undervisning.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Redigera Allt på Arbetsblad - Fullständig Anpassning av Matematik Arbetsblad',
        description: `Varje element på din matchningsarbetsblad är fullt redigerbar. Klicka på valfri bild för att välja den. Dra bilder till nya positioner med musen. Rotera bilder för att skapa intressanta layouter.

Skala bilder större eller mindre för visuell tydlighet. Ta bort bilder du inte vill ha med delete-knappen. Lägg till egna textelement var som helst på sidan. Ändra teckensnittsstorlekar mellan 8 och 200 punkter.

Välj från sju professionella typsnitt för bokstäver lära sig övningar. Ändra textfärger för att matcha ditt tema. Lägg till konturer på text för bättre läsbarhet. Justera alla element tills ditt förskoleklass material ser perfekt ut.

Ångra och gör om-knappar låter dig experimentera säkert. Lås objekt för att förhindra oavsiktliga ändringar. Lager-verktyg låter dig ordna element framåt och bakåt. Justerings verktyg för perfekt centrering och fördelning.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '📤',
        title: 'Ladda Upp Dina Egna Bilder - Personalisera Arbetsblad Gratis för Dina Elever',
        description: `Multi-fil uppladdningsfunktionen accepterar obegränsat antal bilder. Ladda upp JPEG, PNG och GIF-format utan storleksbegränsningar. Kombinera dina uppladdade bilder med biblioteksbilder fritt.

Perfekt för att skapa matematik arbetsblad med klassrummets föremål. Fotografera manipulativer för siffror och tal övningar. Ta bilder av elevernas namn för personliga bokstäver lära sig aktiviteter. Ladda upp tematiska bilder för säsongsbetonade förskoleklass material.

Uppladdade bilder sparas i ditt användarkonto för återanvändning. Organisera uppladdningar efter tema eller ämne. Använd samma bilder över flera arbetsblad för kontinuitet. Ta bort uppladdningar när du inte längre behöver dem.`,
        highlighted: false,
      },
      {
        id: '4',
        icon: '🌍',
        title: '11 Språk för Arbetsblad - Svenska Plus 10 Andra Språk för Förskoleklass Material',
        description: `Hela användargränssnittet tillgängligt på elva språk. Svenska, engelska, tyska, franska och spanska stöds fullt. Italienska, portugisiska, nederländska, danska och norska inkluderade. Finska läggs till för komplett nordisk täckning.

Bildfilnamnen på alla elva språk skapar språkspecifikt innehåll. När du väljer svenskt bildbibliotek får bilderna svenska filnamn. Perfekt för bokstäver lära sig i flera språk. Idealiskt för flerspråkiga förskoleklass material i internationella skolor.

Växla språk när som helst utan att förlora ditt arbete. Skapa arbetsblad på svenska för dina svenska elever. Skapa samma arbetsblad på engelska för ESL-undervisning. Använd flera språk för tvåspråkiga hemundervisningsprogram.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '💰',
        title: 'Kommersiell Licens Inkluderad - Sälj Dina Arbetsblad Gratis Lagligt',
        description: `Grundpaketet-prenumeration inkluderar full POD-kommersiell licens. Sälj dina matchningsarbetsblad på Teachers Pay Teachers utan extra avgifter. Lista matematik arbetsblad på Etsy i din utskrivbara butik. Publicera arbetsbokssamlingar på Amazon KDP.

Ingen attribution krävs på sålda arbetsblad. Behåll 100% av dina intäkter minus plattformsavgifter. Skapa månatliga prenumerationsboxar med förskoleklass material. Bygg passiv inkomst med digitala nedladdningar.

Professionell 300 DPI-kvalitet gör arbetsblad perfekta för kommersiell försäljning. Högupplösta exporter ser skarpa ut i kundernas utskrifter. Gråskaleläge sparar kundernas bläck. PDF och JPEG-format passar alla marknadsplatser.

Många lärare tjänar 500-5000 kronor per månad genom att sälja arbetsblad. Din månadsavgift på Grundpaketet är endast 150 kronor. En eller två försäljningar täcker din prenumerationskostnad. Allt annat är ren vinst för ditt sidohustle.`,
        highlighted: true,
      },
      {
        id: '6',
        icon: '🎨',
        title: '3000+ Bildbibliotek - Organiserat Efter Tema för Matematik Arbetsblad',
        description: `Över 3000 barnvänliga bilder tillgängliga i bildbiblioteket. Organiserat i tematiska samlingar för enkel navigering. Hitta snabbt bilder för siffror och tal lektioner. Sök efter multiplikationstabellen visuella hjälpmedel.

Teman inkluderar djur, mat, transporter och fritidsaktiviteter. Säsongsbetonade teman för höst, vinter, vår och sommar. Helgdagsteman för jul, påsk och svenska helgdagar. Klassrumsteman för skolmaterial och inlärningsaktiviteter.

Alla bilder designade för förskoleklass genom årskurs 3-nivå. Tydliga, enkla illustrationer perfekta för unga studerande. Inga licensavgifter eller extra kostnader för bildanvändning. Alla 3000+ bilder inkluderade i din Grundpaketet-prenumeration.

Filtrera bilder efter tema för tematiska enheter. Sök bilder med nyckelord för snabb sökning. Klicka på vilken bild som helst för att lägga till den i ditt arbetsblad. Kombinera bilder från flera teman för anpassade aktiviteter.`,
        highlighted: false,
      },
      {
        id: '7',
        icon: '🖨️',
        title: 'Professionell 300 DPI Kvalitet - Arbetsblad Gratis Redo för Försäljning',
        description: `Alla arbetsblad exporteras vid professionell 300 DPI-upplösning. Perfekt för hemutskrift på standard bläckstråle- och laserskrivare. Idealisk för kommersiell utskrift om du säljer fysiska produkter. Högupplöst kvalitet gör text och bilder kristallklara.

Ladda ner som PDF för bästa kvalitet och filstorlek. PDF-filer öppnas på alla enheter utan formatproblem. Ladda ner som JPEG för enkel redigering i andra program. Båda formaten fungerar perfekt för försäljning online.

Gråskaleläge konverterar färgarbetsblad till svartvitt. Sparar elevernas och föräldrarnas bläckkostnader. Behåller all visuell tydlighet trots att färg tas bort. Perfekt för klassrumskopieringsmaskiner.

Varje arbetsblad inkluderar valfria namn och datumfält. Lägg till objektnummer för enkel bedömning. Visa punkter och punkter för visuell vägledning. Generera matchande facitlistor för snabb bedömning.`,
        highlighted: true,
      },
    ],
  },

  // How-To Guide - FULL text from matching.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Arbetsblad Gratis på 5 Enkla Steg - Matematik Arbetsblad och Bokstäver Lära Sig',
    sectionDescription: 'Skapa professionella matchningsarbetsblad på under tre minuter. Följ dessa fem enkla steg för att generera förskoleklass material snabbt. Ingen designerfarenhet krävs. Perfekt för upptagna lärare som behöver matematik arbetsblad och bokstäver lära sig övningar dagligen.',
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
        title: 'Välj Innehåll för Dina Arbetsblad Gratis',
        description: `Börja genom att välja ditt matchningsläge från fyra alternativ. Välj bild-till-bokstav för bokstäver lära sig övningar. Välj bild-plus-ord för ordförrådsbyggande. Välj bild-eller-ord för flexibel differentiering. Använd anpassade ord för tematiska enheter.

För slumpmässig generering välj radioknappen för slumpmässigt tema och bilder. Detta skapar arbetsblad gratis med blandade teman perfekt för allmän övning. För tematisk enhetlighet välj slumpmässigt från valt tema. Välj sedan ett tema från rullgardinsmenyn för förskoleklass material.

För exakt kontroll välj radioknappen för att välja specifika bilder. Klicka på bildbiblioteksfliken för att bläddra bland 3000+ bilder. Filtrera efter tema för att hitta bilder för siffror och tal lektioner. Sök efter nyckelord för att hitta multiplikationstabellen visuella hjälpmedel.

Klicka på vilken bild som helst för att lägga till den till dina valda bilder. Fortsätt klicka tills du har tillräckligt med bilder för dina par. För matematik arbetsblad välj nummer bilder och matematiska symboler. För bokstäver lära sig välj objekt som börjar med målbokstäver.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar för Förskoleklass Material',
        description: `Välj antal par från rullgardinsmenyn. Välj fyra par för förskoleklass material och yngre studerande. Välj fem par för årskurs 1 och 2. Välj sex par för årskurs 3 och äldre elever.

Aktivera eller avaktivera namn och datumfält kryssrutan. Namnet och datumfält visas överst på arbetsblad gratis. Perfekt för spårning av elevarbete och organisering av portföljer. Hjälper föräldrar identifiera vilka matematik arbetsblad som tillhör vilket barn.

Aktivera eller avaktivera objektnummerkreyssrutan. Objektnummer gör bedömning snabbare. Hjälper eleverna att referera till specifika frågor under genomgången. Användbart för att skapa bedömningsrutiner för bokstäver lära sig framsteg.

Aktivera eller avaktivera punkter och punkterkreyssrutan. Punkter ger visuell vägledning för unga studerande. Hjälper förskoleklass material elever se var de ska skriva eller dra linjer. Särskilt användbara för finmotorik övningar med matchningsaktiviteter.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Ditt Arbetsblad',
        description: `Klicka på genereringsknappen för att skapa ditt arbetsblad gratis omedelbart. Din matchningsarbetsblad visas på canvas på under tre sekunder. Alla bilder placeras automatiskt med professionella avstånd. Bokstäver eller ord genereras baserat på ditt valda läge.

För bokstäver lära sig läge matchas bilder med deras inledande bokstäver. För multiplikationstabellen matchas nummer bilder med matematiska uttryck. För ordförrådsinlärning matchas bilder med skrivna ord. Alla matchningar blandas slumpmässigt för att förhindra mönsterigenkänning.

Facitlistan genereras automatiskt på en separat flik. Växla mellan arbetsbladsflik och facitlistaflik för att se båda versionerna. Arbetsbladet visar omatchade objekt i slumpmässig ordning. Facitlistan visar korrekta par tydligt markerade.

Om du inte gillar den initiala genereringen klicka genereringsknappen igen. Varje klick skapar en helt ny slumpmässig layout. Prova flera versioner tills du hittar perfekta förskoleklass material. Spara olika versioner för differentiering över flera klassrumsnivåer.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Canvas',
        description: `Klicka på vilken bild som helst på canvas för att välja den. Valda objekt visar markeringsrutor med draghandtag. Dra bilder till nya positioner för att justera layouten. Rotera bilder för visuellt intresse i dina förskoleklass material.

Skala bilder större eller mindre med hörnhandtagen. Gör viktiga bilder större för visuell vikt. Gör mindre viktiga bilder mindre för att spara utrymme. Bibehåll proportioner genom att hålla ner Shift medan du drar.

Ta bort bilder du inte vill ha med delete-knappen. Lägg till nya textelement var som helst på sidan. Ändra teckensnittsstorlekar för bokstäver lära sig övningar. Välj färgglada typsnitt för att matcha ditt tema.

Använd lager verktyg för att ordna överlappande element. För förgrunds bilder framåt. Skicka bakgrundselement bakåt. Använd justeringsverktyg för att centrera text perfekt. Låsa objekt när de är perfekt placerade.

Lägg till bakgrundsteman från rullgardinsmenyn. Välj säsongsbetonade bakgrunder för tematiska enheter. Lägg till gränser för professionellt utseende. Justera opacitet för subtila bakgrundseffekter som inte distraherar från matematik arbetsblad innehållet.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut',
        description: `När din arbetsblad ser perfekt ut klicka på nedladdningsmenyn. Välj arbetsblad JPEG för snabba nedladdningar. Välj arbetsblad PDF för bästa kvalitet och filstorlek. Välj facitlista JPEG eller PDF för lärarkopior.

Aktivera gråskale kryssrutan innan nedladdning för att spara bläckkostnader. Gråskaleläge konverterar färgarbetsblad till svartvitt. Bibehåller all visuell tydlighet för bokstäver lära sig aktiviteter. Perfekt för masskopiering av förskoleklass material på skolkopiatorer.

PDF-filer exporteras vid professionell 300 DPI-upplösning. Öppnas på alla enheter utan formatproblem. Perfekt för e-postdelning med föräldrar. Idealisk för uppladdning till Teachers Pay Teachers eller Etsy-butiker.

JPEG-filer perfekta för sociala medier delning. Visa dina arbetsblad gratis på Pinterest för marknadsföring. Dela på Instagram för att bygga din lärarvarumärke. Inkludera i blogginlägg om matematik arbetsblad strategier.

Skriv ut på valfri hemskrivare med standard papper. Kopiera på skolkopiatorer för hela klasset. Laminera för återanvändbart förskoleklass material. Sätt in i plastrådgivare för centerstationsaktiviteter. Binda till arbetsboksamlingar för hemundervisning.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from matching.md use case sections
  useCases: {
    sectionTitle: 'Perfekt för Lärare och Föräldrar - Matematik Arbetsblad, Bokstäver Lära Sig och Multiplikationstabellen för Alla Behov',
    sectionDescription: 'Matchningsgeneratorn tjänar sex olika användarsegment perfekt. Förskoleklass lärare behöver finmotorik övningar och bokstäver lära sig material. Lågstadielärare behöver matematik arbetsblad och multiplikationstabellen övningar. Hemundervisande föräldrar behöver flexibla förskoleklass material. ESL-lärare behöver flerspråkiga arbetsblad. Specialpedagoger behöver differentierade målarbilder barn och finmotorik övningar. Lärarentreprenörer behöver kommersiell licens för försäljning.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Förskoleklass Lärare',
        subtitle: 'Finmotorik Övningar, Bokstäver Lära Sig och Förskoleklass Material',
        description: `Förskoleklass lärare använder matchningsövningar för tidig literacy-utveckling. Bokstäver lära sig aktiviteter introducerar alfabetet genom bild-till-bokstav matchning. Barn ser bilder av äpple, boll och katt. De matchar med bokstäverna A, B och C.

Finmotorik övningar utvecklas när barn drar linjer mellan matchande objekt. Yngre förskoleklass elever använder kritor för stora motoriska rörelser. Äldre förskoleklass elever använder pennor för finare kontroll. Varje matchningsarbetsblad ger värdefull finmotorik övningar praktik.

Förskoleklass material måste vara visuellt tydligt och barnvänligt. Stora bilder hjälper sex-åringar se detaljer. Enkla ord gör bokstäver lära sig tillgängligt. Färgglada teman håller unga studerandes engagemang högt.

Perfekt för dagliga stationsstationer i förskoleklass. Skapa veckotematiska enheter med matchande ordförråd. Använd som morgonarbete när eleverna anländer. Sänd hem som läxor för föräldraengagemang. Laminera för återanvändbart centermaterial året runt.`,
        quote: 'Mina elever älskar att matcha bilder med bokstäver!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Lågstadielärare Årskurs 1-3',
        subtitle: 'Matematik Arbetsblad, Multiplikationstabellen och Addition och Subtraktion Övningar',
        description: `Lågstadielärare använder matchningsövningar för matematik arbetsblad förstärkning. Årskurs 1-lärare skapar addition och subtraktion matchningar med bildrepresentationer. Barn matchar "3 + 2" med en bild av fem äpplen. Visuella konkreta kopplingar förstärker matematiska begrepp.

Årskurs 2 och 3-lärare fokuserar på multiplikationstabellen behärskning. Skapa matchningsövningar för enskilda multiplikationstabellen fakta. Matcha "4 × 3" med "12" för repetitiv övning. Blanda olika multiplikationstabellen för spiralgranskning.

Siffror och tal övningar hjälper till med taluppfattning. Matcha sifferformuläret "25" med ordformuläret "tjugofem". Matcha nummer med motsvarande mängder av punkter. Matcha placeringsvärdespresentationer med standardformen.

Matematik arbetsblad matchningar gör abstrakt konkret för unga studerandes. Addition och subtraktion matchningar med bildobjekt stödjer CPA-progressionen. Multiplikationstabellen matchningar ger nödvändig upprepning för automatisering. Använd som morgonarbete, utträde biljetter eller läxor förstärkning.`,
        quote: 'Matchningar gör mattepraktik till ett roligt spel.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Hemundervisande Föräldrar',
        subtitle: 'Förskoleklass Material, Målarbilder Barn och Flexibla Arbetsblad',
        description: `Hemundervisande föräldrar behöver flexibla förskoleklass material för flera åldersnivåer samtidigt. Skapa matchningsövningar för din 6-åring samtidigt som din 8-åring arbetar självständigt. Anpassa svårighetsgraden för varje barns nivå. Generera flera versioner för differentiering.

Kombinera matchningsövningar med målarbilder barn för integrerade aktiviteter. Barn slutför matchningen först. Sedan färglägger de bilderna som belöning. Målarbilder barn element gör lärande roligt och engagerande. Finmotorik övningar från färgläggning kompletterar matchningsaktiviteten.

Förskoleklass material från generatoren sparar hemundervisande föräldrar timmar av förberedelsetid. Skapa veckans värde av aktiviteter på söndagseftermiddagen. Skriv ut allt på en gång för vecka i taget planering. Inga resor till lärarmaterialbutiker behövs.

Tematiska enheter enkelt att skapa med bildbiblioteket. Gör havstema matchningsövningar för havsvetenskap enhet. Skapa gårdstema matchningar för djur studie. Använd helgdagsteman för säsongsbetonade lektioner. Allt förskoleklass material anpassningsbart för din familjs behov.`,
        quote: 'Ett verktyg täcker alla mina barns årskurser.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'ESL och Flerspråkiga Lärare',
        subtitle: 'Bokstäver Lära Sig, Siffror och Tal på 11 Språk',
        description: `ESL-lärare använder matchningsövningar för ordförrådsförvärv. Svenska som andraspråk studenter matchar bilder med svenska ord. Bildvisuella ledtrådar stödjer förståelse för nya språkinlärare. Upprepade exponeringar genom matchningsövningar förstärker ordförråd.

Bokstäver lära sig på flera språk stödjer tvåspråkiga program. Skapa matchningsövningar på svenska för svenska-medveten klassrum. Generera samma övning på engelska för ESL-jämförelse. Barn ser hur olika språk representerar samma begrepp.

Siffror och tal undervisning drar nytta av visuella matchningar. Matcha nummer med objekt räknar för taluppfattning. Använd flerspråkiga inställningar för att lära nummer ord på svenska. Internationella skolstudenter får ordförråd på målspråk.

Perfekt för nybörjarnivå språkinlärare. Bilder ger sammanhang utan översättning behövs. Matchningsformatet enkelt att förstå även utan lärare förklaring. Användbart för hemspråkssupport i mångkulturella klassrum.`,
        quote: 'Flerspråkigt stöd är avgörande för mitt klassrum.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Specialpedagoger',
        subtitle: 'Finmotorik Övningar, Målarbilder Barn och Differentieringsmaterial',
        description: `Specialpedagoger använder matchningsövningar för differentierad undervisning. Finmotorik övningar särskilt viktiga för studenter med motoriska förseningar. Anpassa bildstorlekar större för studenter med synnedsättningar. Öka utrymmet mellan objekt för enklare motorisk kontroll.

Målarbilder barn element motiverar motvilliga studerandes. Studenter med uppmärksamhetssvårigheter stannar engagerade längre. Färgläggningsbelöningen efter matchningskomplettering driver fullbordande. Visuellt tydliga bilder stödjer studenter med bearbetningsskillnader.

Skapa flera versioner av samma innehåll på olika svårighetsgrader. Förskoleklass nivå version har fyra stora par. Årskurs 1-version har sex medelstora par. Årskurs 2-version har sex små par med mer utmanande ordförråd.

Användbart för IEP-målföljning i finmotorik övningar. Dokumentera framsteg över tid med sparade exempel. Visa föräldrar konkreta bevis på färdighetsutveckling. Anpassa så många gånger det behövs för studentframgång.`,
        quote: 'Jag kan snabbt anpassa arbetsblad för varje elevs behov.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Lärarentreprenörer',
        subtitle: 'Sälj Matematik Arbetsblad, Multiplikationstabellen och Klockan Lära Sig Material',
        description: `Lärarentreprenörer säljer matchningsarbetsblad på Teachers Pay Teachers och Etsy. Matematik arbetsblad säljer konsekvent bra året runt. Multiplikationstabellen övningar särskilt eftertraktade under årskurs 2-3. Klockan lära sig matchningar populära för taluppfattning undervisning.

Skapa tematiska paketeringsbuntar för högre försäljning. Kombinera 10 matchningsövningar i säsongsbetonade buntar. Prissätt enskilda arbetsblad till 2-3 dollar. Prissätt buntar till 8-12 dollar för bättre värde. Kunder köper buntar för tidsbesparingar.

Grundpaketet kommersiell licens låter dig sälja obegränsat. Skapa hundratals unika matematik arbetsblad för din butik. Inga royalties till LessonCraft Studio på din försäljning. Behåll 100% av intäkter minus marknadsplatsavgifter. Din månadsabonnemang betalar för sig själv med några försäljningar.

Använd Pinterest för att marknadsföra dina multiplikationstabellen resurser. Skapa öga-fångande pins med dina arbetsblad pratbilder. Länka till din Teachers Pay Teachers butik. Många lärarentreprenörer tjänar 500-5000 kronor månatligen. Bygg passiv inkomst samtidigt som du hjälper lärare världen över.`,
        quote: 'Min prenumeration betalade sig själv första månaden!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from matching.md
  faq: {
    sectionTitle: 'Vanliga Frågor Om Matchningsarbetsblad',
    sectionDescription: 'Vanliga frågor om siffror och tal, klockan lära sig och addition och subtraktion arbetsblad. Svar på frågor om multiplikationstabellen, finmotorik övningar och målarbilder barn.',
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
        question: 'Är Denna Generator för Siffror och Tal, Multiplikationstabellen och Bokstäver Lära Sig Gratis att Använda?',
        answer: 'Matchningsgeneratorn kräver en Grundpaketet-prenumeration som kostar 1440 kronor årligen eller 150 kronor månadsvis. Din prenumeration ger dig obegränsad skapande av siffror och tal, multiplikationstabellen och bokstäver lära sig arbetsblad utan avgifter per arbetsblad. Generera så många förskoleklass material som du behöver utan ytterligare avgifter. Grundpaketet inkluderar 10 populära arbetsbladsgeneratorer. Full Tillgång-prenumeration kostar 2400 kronor årligen och inkluderar alla 33 generatortyper. Båda prenumerationerna inkluderar kommersiell licensiering, 11 språksstöd och professionell 300 DPI-kvalitetsexporter.',
      },
      {
        id: '2',
        question: 'Kan Jag Skriva Ut Matematik Arbetsblad, Addition och Subtraktion och Klockan Lära Sig Hemma på Min Vanliga Skrivare?',
        answer: 'Ja. Alla matematik arbetsblad, addition och subtraktion och klockan lära sig matchningar exporteras vid professionell 300 DPI-upplösning. Perfekt för hemutskrift på standard bläckstråle- och laserskrivare. Skriv ut på A4 eller Letter-storlek papper utan särskilda inställningar. Använd gråskaleläge för att spara bläckkostnader. Gråskalekonvertering bibehåller all visuell tydlighet för siffror och tal övningar. Perfekt för masskopiering på skolkopieringsmaskiner. Båda PDF- och JPEG-format fungerar på alla skrivare.',
      },
      {
        id: '3',
        question: 'Behöver Jag Designkunskaper för att Skapa Finmotorik Övningar, Målarbilder Barn och Förskoleklass Material?',
        answer: 'Nej. Inga designkunskaper krävs för att skapa finmotorik övningar, målarbilder barn eller förskoleklass material. Välj dina inställningar från enkla rullgardinsmenyer. Klicka generera och ditt arbetsblad skapas automatiskt. Hela processen tar under tre minuter. Bildbiblioteket organiserat efter tema gör val enkelt. Sökning och filtrering hjälper dig hitta perfekta bilder för finmotorik övningar. Drag-och-släpp-redigering låter dig justera layout utan designerfarenhet. Perfekt för upptagna lärare och föräldrar.',
      },
      {
        id: '4',
        question: 'Kan Jag Använda Multiplikationstabellen, Siffror och Tal och Bokstäver Lära Sig Arbetsblad i Mitt Klassrum?',
        answer: 'Ja. Grundpaketet-prenumeration inkluderar obegränsad klassrumsanvändning av multiplikationstabellen, siffror och tal och bokstäver lära sig arbetsblad. Skriv ut så många kopior du behöver för dina elever. Dela digitala kopior via Google Classroom eller klassrumshanteringsplattformar. Använd förskoleklass material för centerstationer. Laminera klockan lära sig matchningar för återanvändning. Skapa klassuppsättningar av addition och subtraktion övningar för hel gruppundervisning. Inga per-student eller per-arbetsblad licensavgifter.',
      },
      {
        id: '5',
        question: 'Vilka Språk Är Tillgängliga för Förskoleklass Material, Målarbilder Barn och Finmotorik Övningar?',
        answer: 'Förskoleklass material, målarbilder barn och finmotorik övningar tillgängliga på elva språk. Svenska, engelska, tyska, franska och spanska fullt stödda. Italienska, portugisiska, nederländska, danska, norska och finska inkluderade. Bildfilnamn på alla elva språk skapar språkspecifikt innehåll för bokstäver lära sig. Växla mellan språk när som helst utan att förlora arbete. Perfekt för tvåspråkiga program och ESL-undervisning. Internationella skolor får komplett flerspråkigt stöd.',
      },
      {
        id: '6',
        question: 'Kan Jag Sälja Klockan Lära Sig, Addition och Subtraktion och Multiplikationstabellen Arbetsblad Jag Skapar?',
        answer: 'Ja. Grundpaketet-prenumeration inkluderar full kommersiell print-on-demand-licensiering utan extra kostnad. Sälj dina klockan lära sig, addition och subtraktion och multiplikationstabellen arbetsblad på Teachers Pay Teachers, Etsy och Amazon KDP. Ingen attribution krävs på sålda arbetsblad. Behåll 100% av intäkter minus marknadsplatsavgifter. Skapa hundratals unika siffror och tal, finmotorik övningar och målarbilder barn produkter. Många lärare tjänar 500-5000 kronor månatligen genom att sälja arbetsblad. Din prenumeration betalar för sig själv snabbt.',
      },
      {
        id: '7',
        question: 'Hur Anpassar Jag Bokstäver Lära Sig, Siffror och Tal och Förskoleklass Material för Mina Elever?',
        answer: 'Anpassa bokstäver lära sig, siffror och tal och förskoleklass material genom att välja specifika bilder från bildbiblioteket. Klicka på valfri bild på canvas för att flytta, rotera eller skala den. Lägg till anpassade textelement med din egen text. Justera antal par för olika svårighetsgrader. Använd fyra par för yngre förskoleklass elever. Använd sex par för årskurs 3-studerande. Kombinera multiplikationstabellen med klockan lära sig för integrerade lektioner. Ladda upp egna bilder för personalisering.',
      },
      {
        id: '8',
        question: 'Vilka Åldersgrupper Fungerar Bäst med Addition och Subtraktion, Målarbilder Barn och Finmotorik Övningar?',
        answer: 'Addition och subtraktion matchningar fungerar bäst för årskurs 1-3 studerande. Målarbilder barn lämpliga för förskoleklass genom årskurs 2. Finmotorik övningar perfekta för 4-8 åringar som utvecklar penngrepp. Bokstäver lära sig matchningar idealiska för förskoleklass och årskurs 1. Siffror och tal övningar perfekta för 5-7 åringar. Multiplikationstabellen matchningar lämpliga för årskurs 2-3. Klockan lära sig aktiviteter bäst för årskurs 1-2 taluppfattning.',
      },
      {
        id: '9',
        question: 'Kan Jag Ladda Upp Mina Egna Bilder till Klockan Lära Sig, Multiplikationstabellen och Förskoleklass Material?',
        answer: 'Ja. Multi-fil uppladdningsfunktionen accepterar obegränsat antal bilder för klockan lära sig, multiplikationstabellen och förskoleklass material. Ladda upp JPEG, PNG och GIF-format utan storleksbegränsningar. Kombinera dina uppladdade bilder med biblioteksbilder fritt. Perfekt för att skapa addition och subtraktion arbetsblad med klassrummets manipulativer. Fotografera elevernas namn för personliga bokstäver lära sig aktiviteter. Ta bilder av klassklockor för klockan lära sig matchningar. Uppladdade bilder sparas för återanvändning.',
      },
      {
        id: '10',
        question: 'Hur Lång Tid Tar Det att Skapa Siffror och Tal, Finmotorik Övningar och Målarbilder Barn Arbetsblad?',
        answer: 'Siffror och tal, finmotorik övningar och målarbilder barn arbetsblad tar under tre minuter att skapa. Välj dina inställningar, klicka generera och arbetsbladet visas omedelbart. Redigering på canvas lägger till ytterligare 2-5 minuter om behövs. Traditionell skapande av multiplikationstabellen, klockan lära sig eller addition och subtraktion arbetsblad tar 30-60 minuter. Generatorn sparar dig timmar varje vecka. Skapa hela veckans förskoleklass material på 30 minuter totalt.',
      },
      {
        id: '11',
        question: 'Inkluderar Multiplikationstabellen, Addition och Subtraktion och Bokstäver Lära Sig Arbetsblad Facitlistor?',
        answer: 'Ja. Alla multiplikationstabellen, addition och subtraktion och bokstäver lära sig arbetsblad inkluderar automatiskt genererade facitlistor. Facitlistan visas på en separat flik från arbetsbladet. Växla mellan flikar för att se båda versionerna. Facitlistorna visar korrekta matchningar tydligt markerade. Perfekt för snabb bedömning av siffror och tal framsteg. Användbar för föräldrar som hjälper med klockan lära sig läxor hemma. Ladda ner facitlistor separat som PDF eller JPEG.',
      },
      {
        id: '12',
        question: 'Kan Jag Skapa Tematiska Förskoleklass Material, Finmotorik Övningar och Målarbilder Barn Om Specifika Ämnen?',
        answer: 'Ja. Skapa tematiska förskoleklass material, finmotorik övningar och målarbilder barn genom att välja från över 3000 temaorganiserade bilder. Välj havstema för havsvetenskap bokstäver lära sig. Välj gårdstema för djur siffror och tal. Skapa helgdagstema multiplikationstabellen för säsongsbetonade lektioner. Använd transporter tema för klockan lära sig matchningar. Bygg matematiktema addition och subtraktion med nummer bilder. Alla teman fungerar för alla åldersgrupper och ämnen.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Grundpaketet',
    price: '144$',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsad arbetsbladskapning',
      'Kommersiell licens ingår',
      '11 språk stöds',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
      'Facit ingår',
    ],
    ctaText: 'Börja Skapa Nu',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera med Andra Arbetsblad Generatorer',
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera matchningsarbetsblad med dessa kompletterande generatorer för klockan lära sig, siffror och tal och addition och subtraktion.',
    ctaTitle: 'Redo att Skapa Fantastiska Matchningsarbetsblad?',
    ctaDescription: 'Gå med tusentals lärare som skapar professionella arbetsblad. Obegränsad generering, kommersiell licens ingår.',
    primaryCtaText: 'Starta Gratis Provperiod',
    secondaryCtaText: 'Visa Alla 33 Appar',
    badgeText: 'Fungerar Utmärkt Med',
    exploreText: 'Utforska alla appar',
    trustBadges: {
      guarantee: '30 dagars pengarna-tillbaka-garanti',
      securePayment: 'Säker betalning',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [
      {
        id: '1',
        slug: 'drawing-lines',
        name: 'Rita Linjer',
        category: 'Finmotorik',
        icon: '✏️',
        description: 'Kombinera matchningsövningar med linjedragning för att förstärka visuell spårning och finmotorik övningar.',
      },
      {
        id: '2',
        slug: 'grid-match',
        name: 'Rutnätsmatchning',
        category: 'Visuell Perception',
        icon: '🔲',
        description: 'Utmana elever med rutnätsbaserade matchningspussel som utvecklar spatial förståelse.',
      },
      {
        id: '3',
        slug: 'shadow-match',
        name: 'Skuggmatchning',
        category: 'Visuell Perception',
        icon: '🔮',
        description: 'Lägg till skuggmatchningsaktiviteter för att utveckla visuell perception och uppmärksamhet på detaljer.',
      },
      {
        id: '4',
        slug: 'find-and-count',
        name: 'Hitta och Räkna',
        category: 'Matematik',
        icon: '🔢',
        description: 'Kombinera matchning med räkning för att förstärka siffror och tal och matematiska begrepp.',
      },
      {
        id: '5',
        slug: 'alphabet-train',
        name: 'Alfabetståg',
        category: 'Tidig Inlärning',
        icon: '🚂',
        description: 'Balansera matchningsträning med bokstavsigenkänningsaktiviteter för omfattande tidig läsning.',
      },
      {
        id: '6',
        slug: 'coloring',
        name: 'Målarbilder',
        category: 'Kreativitet',
        icon: '🎨',
        description: 'Belöna färdiga matchningsövningar med tematiska målarbilder som utvecklar finmotorik.',
      },
    ],
  },
};

export default matchingSvContent;
