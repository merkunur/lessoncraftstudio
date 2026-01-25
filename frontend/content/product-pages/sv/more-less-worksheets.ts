import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More Less Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/more-less-worksheets.ts
 * URL: /sv/apps/jamforelse-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const moreLessSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'jamforelse-arbetsblad',
    appId: 'more-less',
    title: 'Matematik Arbetsblad för Siffror och Tal | Gratis Arbetsblad',
    description: 'Skapa professionella matematik arbetsblad för jämförelse av siffror och tal. Generera anpassade matte övningar med större än, mindre än och lika med symboler.',
    keywords: 'matematik arbetsblad, arbetsblad gratis, jämförelse, större än mindre än, förskoleklass material, matte övningar, siffror och tal, taluppfattning',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/jamforelse-arbetsblad',
      },

  // Hero Section - FULL text from more-less.md paragraphs 1-4
  hero: {
    title: 'Jämförelse Arbetsblad',
    subtitle: 'Matematik Arbetsblad för Siffror och Tal i Förskoleklass',
    description: `Skapa professionella matematik arbetsblad för jämförelse av siffror och tal. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till arbetsbladsskapande utan extra avgifter per arbetsblad. Generera anpassade matte övningar perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Vår jämförelsegenerator hjälper barn att lära sig siffror och tal genom visuella övningar. Eleverna jämför antal objekt och använder symbolerna större än, mindre än eller lika med. Varje matematik arbetsblad kan anpassas helt efter dina elevers behov. Välj mellan olika bilder, teman och svårighetsgrader.

Använd vårt verktyg för att skapa arbetsblad gratis från per-arbetsblad-avgifter. Full Tillgång-prenumerationen kostar 240 euro per år eller 25 euro per månad. Du får tillgång till alla 33 arbetsbladsgeneratorer inklusive denna jämförelsegenerator. Perfekt för lärare i förskoleklass som behöver matte övningar för taluppfattning och jämförelser.`,
    previewImageSrc: '/samples/swedish/more-less/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/more less/
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
    items: [],
    
  },

  // Features Grid - FULL text from more-less.md feature sections
  features: {
    sectionTitle: 'Matematik Arbetsblad Funktioner - Allt Du Behöver för Siffror och Tal i Förskoleklass Material',
    sectionDescription: 'Vår jämförelsegenerator för matematik arbetsblad erbjuder kraftfulla funktioner. Skapa professionella matte övningar på minuter istället för timmar. Varje funktion är designad för lärare i förskoleklass och lågstadiet. Generera arbetsblad gratis från extra avgifter per arbetsblad med din prenumeration.',
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

  // How-To Guide - FULL text from more-less.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Matematik Arbetsblad för Siffror och Tal på 5 Enkla Steg - Arbetsblad Gratis på Minuter',
    sectionDescription: 'Skapa professionella jämförelsearbetsblad för förskoleklass på under 3 minuter. Följ dessa fem enkla steg för perfekta matte övningar. Ingen erfarenhet av design krävs. Bara välj inställningar och klicka på Skapa. Hela processen är snabb och intuitiv för alla lärare.',
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
        title: 'Välj Ditt Innehåll för Siffror och Tal - Förskoleklass Material och Teman',
        description: `Börja med att välja bilder för dina jämförelseövningar. Du har två huvudalternativ för bildval. Välj individuella bilder eller ett helt tema. Båda alternativen skapar effektiva matematik arbetsblad.

För individuellt bildval väljer du först ett tema från rullgardinsmenyn. Bildbiblioteket visar alla tillgängliga bilder inom temat. Klicka på 1-5 bilder du vill använda. Valda bilder markeras tydligt. Detta ger dig full kontroll över exakt vilka bilder som används.

För temabaserat val väljer du bara ett tema från listan. Generatorn väljer slumpmässigt bilder från temat. Perfekt när du vill ha variation mellan arbetsblad. Samma tema ger olika bilder varje gång du genererar. Sparar tid när du skapar många matte övningar.

Ladda upp egna bilder om du vill. Klicka på uppladdningsknappen och välj filer. Dina bilder blir tillgängliga direkt i generatorn. Kombinera egna bilder med biblioteksbilder fritt. Skapa arbetsblad gratis från begränsningar med personliga bilder.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar för Matte Övningar - Matematik Arbetsblad för Alla Nivåer',
        description: `Välj antal övningar mellan 1 och 8. Färre övningar passar yngre barn i förskoleklass. Fler övningar utmanar äldre elever i lågstadiet. Justera antalet baserat på elevernas ålder och koncentrationsförmåga.

Välj jämförelseläge för dina matematik arbetsblad. Bild mot bild visar två grupper med objekt. Perfekt för visuell jämförelse av siffror och tal. Bild mot nummer kombinerar bilder med skriven siffra. Detta övar både räkning och sifferigenkänning.

Välj bildvariation för övningarna. Samma bilder betyder samma objekt i båda grupperna. Till exempel 5 katter mot 7 katter. Detta underlättar jämförelsen för nybörjare. Olika bilder använder olika objekt. Till exempel 5 katter mot 7 hundar. Mer utmanande men utvecklar flexibelt tänkande.

Välj vilka relationer som ska ingå. Bocka i större än, mindre än eller lika med. Du kan aktivera alla tre eller bara vissa. Detta låter dig fokusera på specifika begrepp. Börja med bara större än och mindre än för nybörjare. Lägg till lika med senare.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Dina Arbetsblad Gratis - Matte Övningar Skapas Direkt för Förskoleklass',
        description: `Klicka på Skapa-knappen när alla inställningar är klara. Generatorn skapar ditt matematik arbetsblad omedelbart. Hela processen tar bara några sekunder. Arbetsbladet visas på duken redo för användning.

Generatorn placerar alla element automatiskt. Bilder, siffror och tal positioneras professionellt. Jämförelsesymboler centreras mellan grupperna. Övningsnummer läggs till om aktiverat. Layouten ser professionell ut direkt.

Skapa facitblad samtidigt genom att klicka på motsvarande knapp. Facitbladet visar samma övningar med rätta svar ifyllda. Symbolerna är redan markerade eller cirklade. Perfekt för rättning och självkontroll. Både arbetsblad och facit finns tillgängliga.

Om du inte är nöjd klickar du bara på Skapa igen. En ny version genereras med nya bilder om du valt temaläge. Eller samma bilder i nya positioner. Experimentera fritt tills du hittar den perfekta layouten. Obegränsad generering ingår i prenumerationen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Duken - Anpassa Matematik Arbetsblad för Siffror och Tal Perfekt',
        description: `Klicka på vilket element som helst för att välja det. Valda element får markeringsramar. Dra för att flytta element till nya positioner. Använd hörnhandtagen för att ändra storlek. Rotera med rotationshandtaget om behövs.

Ändra textegenskaper för alla texter. Välj en text och justera färg med färgväljaren. Ändra storlek med storleksreglaget. Byt font från fontrullgardinsmenyn. Lägg till konturer för bättre läsbarhet om önskat.

Lägg till egna textrutor med instruktioner. Klicka på Lägg till text-knappen. Skriv din text och placera den var du vill. Perfekt för att lägga till extra förklaringar på svenska. Eller skapa specialinstruktioner för specifika elever.

Använd verktygsfältet för mer kontroll. Lagerknapparna flyttar element framåt eller bakåt. Justeringsknapparna centrerar eller justerar element. Låsknappen låser element så de inte flyttas av misstag. Raderingsknappen tar bort valda element.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut Matematik Arbetsblad Gratis - Högkvalitativa PDF för Förskoleklass Material',
        description: `Klicka på Ladda ner-knappen när arbetsbladet är klart. Välj mellan JPEG eller PDF-format. Båda formaten är högkvalitativa 300 DPI. JPEG fungerar bra för digital användning. PDF är perfekt för utskrift.

Ladda ner arbetsbladet och facitbladet separat. Båda finns tillgängliga i nedladdningsmenyn. Arbetsbladet för eleverna saknar svar. Facitbladet visar alla korrekta jämförelser. Skriv ut det antal du behöver av vardera.

Aktivera gråskaleläge för att spara bläck. Bocka i gråskale-alternativet före nedladdning. Arbetsbladet konverteras till svartvitt automatiskt. Perfekt för klassrumsbudgetar med begränsad färgutskrift. Kvaliteten förblir hög även i gråskala.

Skriv ut på vilken skrivare som helst. Hemskrivare fungerar utmärkt för matte övningar. Skolans kopieringsmaskin producerar många kopior snabbt. Professionella tryckeri ger premium-kvalitet för kommersiell försäljning. Filerna är optimerade för alla utskriftsmetoder.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from more-less.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Jämförelsearbetsblad passar många olika användare och undervisningssituationer. Lärare i olika årskurser använder verktyget dagligen. Hemmaskolande föräldrar skapar anpassade lektioner. Specialpedagoger differentierar undervisning effektivt. Varje användargrupp hittar unika fördelar med dessa arbetsblad gratis från designkostnader.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from more-less.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Lärare och föräldrar har många frågor om jämförelsegeneratorn. Här besvarar vi de vanligaste frågorna. Svaren täcker prenumeration, användning i klassrummet och tekniska detaljer.',
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
    price: '240€',
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
    sectionTitle: 'Gratis Arbetsblad Kombinera - Arbetsblad för Barn och Gratis Utskrifter',
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera jämförelsearbetsblad med dessa kompletterande generatorer för matematik och visuell perception.',
    ctaTitle: 'Redo att Skapa Fantastiska Jämförelsearbetsblad?',
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

export default moreLessSvContent;
