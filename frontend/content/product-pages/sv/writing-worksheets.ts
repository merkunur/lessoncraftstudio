import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Writing Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/writing-worksheets.ts
 * URL: /sv/apps/skrivovningar-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/writing.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const writingSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'skrivovningar-arbetsblad',
    appId: 'writing',
    title: 'Gratis Skrivarbetsblad för Barn - Bokstäver Lära Sig Generator för',
    description: 'Skapa professionella arbetsblad för skrivövning med vår handstilsgenerator. Full Tillgång-prenumeration ger dig obegränsad åtkomst till alla 33 verktyg för.',
    keywords: 'skriva bokstäver, arbetsblad gratis, förskoleklass material, finmotorik övningar, bokstäver lära sig, handstilsövningar, skrivarbetsblad, spårningsövningar, matematik arbetsblad, målarbilder barn',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/skrivovningar-arbetsblad',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/writing/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis skrivarbetsblad för barn - bokstavsspårning för förskoleklass'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/writing/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbetsblad för bokstäver lära sig - handstilsövningar för barn'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/writing/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis finmotorik övningar arbetsblad - skrivträning för förskoleklass'
      }
    ],
  },

  // Hero Section - FULL text from writing.md paragraphs 1-4
  hero: {
    title: 'Gratis Skrivarbetsblad för Barn - Skriva Bokstäver',
    subtitle: 'Gratis Arbetsblad för Förskoleklass - Bokstäver Lära Sig',
    description: `Skapa professionella arbetsblad för skrivövning med vår handstilsgenerator. Full Tillgång-prenumeration ger dig obegränsad åtkomst till alla 33 verktyg för $240 per år eller $25 per månad. Generera anpassade arbetsblad för att skriva bokstäver perfekta för förskoleklass, årskurs 1 och årskurs 2. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår generator för skrivarbetsblad kombinerar handstilsövning med bokstavsträning. Perfekt för att lära sig bokstäver i förskoleklass. Skapa spårningsövningar i både textstil och skrivstil. Varje arbetsblad kan anpassas helt med egna bilder, teman och text. Idealiskt för förskoleklass material och finmotorik övningar.

Skrivövning är grundläggande för tidiga läsare. Arbetsblad gratis att skapa när du har en prenumeration. Inga avgifter per arbetsblad. Generera obegränsat med arbetsblad för bokstäver lära sig. Kombinera handstilsövningar med teman från vårt bildbibliotek med över 3000 barnvänliga bilder. Exportera som högupplösta PDF-filer eller JPEG-bilder för perfekt utskrift.

Full Tillgång-prenumeration inkluderar kommersiell licens. Sälj dina skrivarbetsblad på Etsy, Teachers Pay Teachers eller Amazon KDP. Professionell 300 DPI-kvalitet garanterar skarp utskrift. Gråskalealternativ sparar bläck vid utskrift i klassrummet. Stöd för 11 språk gör detta verktyg perfekt för svenska lärare och internationella skolor.`,
    previewImageSrc: '/samples/swedish/writing/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/swedish/writing/
  samples: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Gratis Arbetsblad och Gratis Utskrifter',
    sectionDescription: 'Ladda ner gratis utskrifter - Gratis arbetsblad för barn av professionell kvalitet. Gratis arbetsblad och arbetsblad för barn perfekt för arbetsblad för förskoleklass. Gratis arbetsblad för barn och arbetsblad för barn inkluderar utbildningsmaterial. Gratis arbetsblad och gratis utskrifter tillgänglig',
    downloadLabel: 'Ladda Ner Gratis Exempel',
    worksheetLabel: 'Arbetsblad',
    answerKeyLabel: 'Facit',
    viewAllLabel: 'Visa större',
    noPdfLabel: 'Endast förhandsgranskning',
    freePdfCountLabel: 'gratis nedladdningar',
    badgeText: 'Gratis Exempel',
    downloadingLabel: 'Laddar ner...',
    ofLabel: 'av',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from writing.md feature sections
  features: {
    sectionTitle: 'Skrivarbetsblad Funktioner - Allt du Behöver för Bokstäver Lära Sig och Finmotorik Övningar',
    sectionDescription: 'Vår generator för skrivarbetsblad kombinerar kraftfulla funktioner med enkel användning. Perfekt för förskoleklass material och lågstadiet. Skapa professionella arbetsblad för att skriva bokstäver på minuter. Varje funktion är utformad för att spara tid för lärare samtidigt som du levererar högkvalitativa arbetsblad gratis när du väl har din prenumeration. Full anpassningsförmåga gör varje arbetsblad unikt för dina elevers behov.',
    highlightBadgeText: 'Nyckelfunktion',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    badgeText: 'Funktioner',
    trustBadges: {
      allFeatures: 'Alla funktioner ingår',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from writing.md step sections
  howTo: {
    sectionTitle: 'Hur man Skapar Skrivarbetsblad för Bokstäver Lära Sig i 5 Enkla Steg',
    sectionDescription: 'Skapa professionella skrivarbetsblad på under 3 minuter med vår steg-för-steg-guide. Perfekt för förskoleklass material och finmotorik övningar. Ingen erfarenhet krävs. Varje steg är intuitivt och enkelt att följa. Från att välja radtyp till att ladda ner din färdiga PDF tar hela processen mindre tid än att göra kaffe. Följ dessa 5 enkla steg för att skapa arbetsblad gratis när du väl har din prenumeration.',
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
        title: 'Välj Radtyp och Teckensnitt - Skapa Förskoleklass Material för Bokstäver Lära Sig',
        description: `Börja genom att klicka på "Lägg till rad"-knappen för att skapa din första skrivrad. Välj radtyp från rullgardinsmenyn: Spårning, Tonad spårning eller Guidad kopiering. Spårning visar hela bokstäver för fullständig spårning. Tonad spårning visar halvgenomskinliga guidebokstäver. Guidad kopiering visar första bokstaven helt och resten tonade. Varje radtyp stöder olika inlärningsnivåer.

Välj sedan teckensnittsstil från fem alternativ. Textstil vanlig ger grundläggande tryckbokstäver. Textstil med pilar visar pennstreckordning. Spårningsteckensnitt ger prickade bokstäver att spåra över. Spårningsteckensnitt med pilar kombinerar prickar med pennstrecksvägledning. Handstil använder vackra Great Vibes-typsnittet för kursivsövning. Perfekt för bokstäver lära sig i alla stadier.

Varje teckensnitt renderas med perfekt klarhet. Tryckbokstäver använder högkvalitativa SVG-bilder. Handstilsteckensnittet laddas från Google Fonts. Alla bokstäver justeras korrekt på baslinjen. Inklusive svenska specialtecken å, ä och ö renderas perfekt. Lägre rader visar översta, mellersta och nedre guidelinjer för korrekt bokstavsform.

Lägg till så många rader du behöver. Klicka bara på "Lägg till rad" igen för fler skrivlinjer. Varje rad är oberoende anpassningsbar. Blanda radtyper på samma arbetsblad. Kombinera tryckbokstäver och handstil för varierad övning. Skapa arbetsblad som progressivt ökar i svårighet. Förskoleklass material har aldrig varit enklare att skapa.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Radinnehåll och Inställningar - Finmotorik Övningar och Arbetsblad Gratis',
        description: `Välj vad varje rad ska visa från innehållsrullgardinsmenyn. Alternativet "Tomt" skapar rader med endast guidelinjer för fri övning. "Begynnelsebokstav" visar första bokstaven från vald bild. "Helt filnamn" visar hela bildfilnamnet som text. "Anpassad text" låter dig skriva exakt vad som helst du vill att eleverna ska spåra.

Välj skiftläge för dina bokstäver. Versaler skapar stora bokstäver perfekt för nybörjare. Gemener ger små bokstäver för mer avancerade skribenter. Titelfall kapitaliserar första bokstaven i varje ord. Varje skiftläge renderas korrekt med rätt bokstavsproportioner. Idealiskt för att lära sig både stor och liten bokstavsform.

För finmotorik övningar, lägg till streckövningar. Välj strecktyp: Vertikal linje, Horisontell linje, Cirkel eller Sicksacklinje. Streckövningar hjälper små barn utveckla penngrepp innan bokstavsformning. Perfekt för förskolebarn som fortfarande bygger handhållfasthet. Kombinera streckövningar med bokstäver lära sig för komplett handstilskurrikulum.

Anpassad text-alternativet ger obegränsat flexibilitet. Skriv elevnamn för namnsspårningsövning. Ange högfrekventa ord för ordkännedomsträning. Inkludera enkla meningar för meningsövning. Varje rad kan ha olika anpassad text. Skapa arbetsblad som exakt matchar din lektionsplan. Inga mallar att köpa - arbetsblad gratis att skapa på vilket innehåll som helst.

Siduppsättningsinställningar låter dig välja sidstorlek. Letter Portrait och Landscape för amerikanska skrivare. A4 Portrait och Landscape för europeiska standarder. Eller anpassad storlek för specialformat. Lägg till bakgrundsteman för visuellt intresse. Välj ramar för professionell finish. Justera opacitet så att bakgrunder inte stör läsbarheten.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera och Förhandsgranska Ditt Arbetsblad - Skapa Arbetsblad för Förskoleklass Material',
        description: `När alla rader är konfigurerade, klicka helt enkelt "Generera" (eller raderna visas automatiskt när du lägger till dem). Ditt arbetsblad renderas omedelbart på arbetsytan. Varje skrivrad visar exakt vad du konfigurerade. Guidelinjer visas i ljusgrått. Bokstäver placeras korrekt mellan linjerna. Hela förhandsgranskningar ser ut exakt som den slutliga utskriften.

Förhandsgranskningsarbetsytan är helt interaktiv. Zooma in för att inspektera bokstavsdetaljer. Zooma ut för att se layouten för hela sidan. Zoomkontroller ger 50% till 200% skala. Återställningsknappen återgår till 100% visning. Perfekt för att säkerställa att varje detalj är korrekt innan du laddar ner.

Om du valde bildläge från biblioteket, visas din valda bild på arbetsytan. Bilden placeras som ett redigerbart element. Du kan flytta, ändra storlek eller rotera den. Kombinera bilden med skrivraderna för tematisk sammanhängande övning. Perfekt för bokstäver lära sig kopplad till ordförråd - bild av ett äpple med "ÄPPLE" spårningtext.

Förhandsgranskningsstadiet låter dig fånga fel tidigt. Se om textens svårighetsgrad matchar din klass. Kontrollera att radavstånd ser bra ut. Verifiera att specialtecken renderas korrekt. Gör ändringar innan du exporterar. Spara tid genom att få allt rätt i förhandsgranskningsstadiet.

Lägg till ytterligare element om det behövs. Klicka på "Lägg till text" för anpassade rubriker. Ladda upp ytterligare bilder för dekorativa element. Välj olika bakgrund om det nuvarande temat inte passar. Förhandsgranskningsarbetsytan ger fullständig kreativ kontroll. Experimentera tills du är helt nöjd med layouten.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Arbetsytan - Anpassa Arbetsblad Gratis för Finmotorik Övningar',
        description: `Klicka på vilken skrivrad som helst för att välja den. Valda rader visar blå kantlinje. Dra rader uppåt eller nedåt för att justera avstånd. Ändra storlek på rader genom att dra hörna-hanteraren. Radhöjd justeras automatiskt och bokstäver skalas proportionellt. Behåll guidelinjer alltid korrekt placerade oavsett radhöjd.

Använd justeringsverktygen för perfekt placering. Markera flera rader med skift-klick. Justera vänster för att raduppställa alla vänsterkanter. Centrera horisontellt för att placera rader i sidans mitt. Justera radsavstånd genom att ställa in ett jämnt vertikalt mellanrum. Professionellt utseende uppnås med exakt justering.

Textverktyg låter dig lägga till rubriker och instruktioner. Klicka "Lägg till text till arbetsblad" efter att ha skrivit din text. Välj textfärg, teckensnittsstorlek och teckensnittsfamilj. Välj mellan Arial, Verdana, Lexend Deca, Baloo 2, Nunito, Quicksand eller Fredoka. Lägg till konturer för att få text att hoppa ut. Perfekt för att lägga till elevnamn eller uppgiftsinstruktioner.

Bildhantering ger visuell flexibilitet. Dra uppladdade bilder var som helst på arbetsytan. Ändra storlek på bilder för att passa ditt layout. Placera bilder vid sidan av skrivraderna för ordassociation. Eller lägg till dekorativa bilder i hörnen. Varje bild kan låsas för att förhindra oavsiktlig förflyttning.

Lagerkontroller hanterar överlappande element. Klicka "Skicka framåt" för att flytta element ovanför andra. Klicka "Skicka bakåt" för att flytta element bakom. Positionera bakgrunder längst bak. Håll text och skrivraderna längst fram för läsbarhet. Perfekt lagerhantering ger professionella resultat varje gång.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut - Högkvalitativa PDF och JPEG Arbetsblad för Bokstäver Lära Sig',
        description: `När ditt arbetsblad är perfekt, klicka på "Ladda ner"-knappen. Välj PDF eller JPEG från rullgardinsmenyn. Kontrollera gråskalealternativet om du vill spara bläck. PDF-export skapar professionella utskriftsklara filer. JPEG-export ger högupplösta bildfiler för digital delning.

PDF-filer respekterar exakt din sidstorlek. Letter-format centreras perfekt på Letter-papper. A4-format passar europiska standardskrivare. Anpassade storlekar fungerar precis som definierat. Varje PDF renderas vid 300 DPI för skarp utskriftskvalitet. Bokstäver är kristallklara och guidelinjer är perfekt raka.

JPEG-export ger full upplösning för digital användning. Dela via e-post till föräldrar. Ladda upp till Google Classroom eller Seesaw. Inkludera i digitala läroböcker eller presentationer. JPEG-filer behåller varje detalj. Perfekt för förskoleklass material som delas digitalt.

Gråskalealternativet konverterar alla färger till gråskala. Spara betydande bläck när du skriver ut dussintals kopior. Svart-vita utskrifter fungerar lika bra för skrivövningar. Eleverna fokuserar på bokstavsformning, inte färger. Gråskala håller fortfarande professionellt utseende.

Exportprocessen tar bara sekunder. Din fil genereras och laddas ner automatiskt. Filnamnet inkluderar datum och tid för enkel organisation. Spara filer lokalt eller till molnlagring. Skriv ut omedelbart eller spara för framtida användning. Skapa och exportera flera arbetsblad gratis per arbetsblad på bara några minuter med din Full Tillgång-prenumeration.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from writing.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Vår generator för skrivarbetsblad tjänar olika användare inom utbildning och föräldraskap. Från förskoleklasspedagoger till lärarföretagare, varje grupp hittar unika fördelar. Skapa arbetsblad gratis per arbetsblad när du väl har din prenumeration. Förskoleklass material och lågstadiematerial skapas på minuter. Varje användargrupp får exakt vad de behöver för sina specifika undervisningssituationer.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from writing.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Lärare och föräldrar ställer ofta liknande frågor om vår generator för skrivarbetsblad. Följande 12 frågor och svar täcker allt från prenumerationskostnader till tekniska funktioner. Varje svar ger tydlig, praktisk information. Läs igenom dessa innan du prenumererar för att förstå exakt vad du får. Arbetsblad gratis att skapa när du väl har tillgång till Full Tillgång-prenumeration.',
    showMoreText: 'Visa fler frågor',
    showLessText: 'Visa färre',
    badgeText: 'Vanliga Frågor',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    secureCheckout: 'Säker betalning',
    cancelAnytime: 'Avsluta när som helst',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Full Tillgång',
    price: '240$',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Obegränsad arbetsbladskapning',
      'Alla 33 arbetsbladsverktyg',
      'Kommersiell licens ingår',
      '11 språk stöds',
      '3000+ tematiska bilder',
      '300 DPI utskriftskvalitet',
    ],
    ctaText: 'Börja Skapa Nu',
    bundleDescription: 'Din prenumeration inkluderar tillgang till alla 33 arbetsbladsverktyg',
    bundleApps: [
      'Bildaddition', 'Alfabetståg', 'Stor eller liten', 'Bildbingo',
      'Räknediagram', 'Kodaddition', 'Målarbilder', 'Bildkorsord',
      'Bildkryptogram', 'Rita och färglägg', 'Rita linjer', 'Hitta och räkna',
      'Hitta föremålen', 'Rutnätsmatchning', 'Matchningsspel', 'Mattepussel',
      'Matteuppgifter', 'Saknade bitar', 'Mer eller mindre', 'Vilket hör inte hemma',
      'Mönsterståg', 'Mönsterövningar', 'Bildväg', 'Sortera bilder',
      'Prepositioner', 'Skuggmatchning', 'Subtraktion', 'Barnsudoku',
      'Skattjakt', 'Gissa ordet', 'Ordmix', 'Ordletare', 'Skrivövningar',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Kombinera Skrivarbetsblad med Andra Arbetsblad Gratis - Kompletta Förskoleklass Material Paket',
    sectionDescription: 'LessonCraft Studio erbjuder 33 gratis arbetsbladsverktyg på samma plattform. Kombinera skrivarbetsblad med matematik arbetsblad, målarbilder barn och mer för kompletta lärpaket. Full Tillgång-prenumeration ger tillgång till alla generatorer för $240/år. Skapa tematiska enheter som integrerar multipel färdighetsövning. Arbetsblad gratis att skapa när du väl har din prenumeration på vilket verktyg som helst.',
    ctaTitle: 'Redo att Skapa Fantastiska Skrivarbetsblad?',
    ctaDescription: 'Gå med tusentals lärare som skapar professionella arbetsblad. Obegränsad generering, kommersiell licens ingår.',
    primaryCtaText: 'Starta Gratis Provperiod',
    secondaryCtaText: 'Visa Alla 33 Appar',
    badgeText: 'Fungerar Utmärkt Med',
    exploreText: 'Utforska alla appar',
    trustBadges: {
      securePayment: 'Säker betalning',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default writingSvContent;
