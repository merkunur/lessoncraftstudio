import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/find-and-count-worksheets.ts
 * URL: /sv/apps/hitta-och-rakna-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/find-and-count.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'hitta-och-rakna-arbetsblad',
    appId: 'find-and-count',
    title: 'Arbetsblad Gratis - Hitta och Räkna Arbetsblad | Gratis Arbetsblad',
    description: 'Skapa professionella hitta-och-räkna arbetsblad med vår enkla generator. Generera anpassade matematik arbetsblad för förskoleklass och årskurs 1-3.',
    keywords: 'arbetsblad gratis, hitta och räkna, matematik arbetsblad, förskoleklass material, matte övningar, siffror och tal, räkneövningar, finmotorik övningar, multiplikationstabellen, klockan lära sig, bokstäver lära sig, målarbilder barn',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/hitta-och-rakna-arbetsblad',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/find-and-count/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbetsblad hitta och räkna för förskoleklass - matematik övningar med rutnät'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/find-and-count/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbetsblad gratis hitta och räkna för barn - visuell räkneövning för lågstadiet'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/find-and-count/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis utskrifter hitta och räkna arbetsblad - siffror och tal för förskoleklass'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/find-and-count/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbetsblad för barn hitta och räkna - finmotorik övningar med färgglada bilder'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/find-and-count/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Hitta och räkna matematik arbetsblad gratis - räkneträning för årskurs 1-3'
      },
    ],
  },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-4
  hero: {
    title: 'Arbetsblad Gratis - Hitta och Räkna Arbetsblad',
    subtitle: 'Matematik Arbetsblad för Förskoleklass',
    description: `Skapa professionella hitta-och-räkna arbetsblad med vår enkla generator. Din Grundpaketsprenumeration ger dig obegränsad skapande av arbetsblad utan extra kostnader per arbetsblad. Generera anpassade arbetsblad gratis för utskrift perfekta för förskoleklass och årskurs 1-3 elever. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Hitta-och-räkna arbetsblad utvecklar räkneförmåga och visuell diskriminering hos barn. Eleverna letar efter specifika föremål gömda i ett rutnät och räknar hur många de hittar. Dessa matematik arbetsblad kombinerar problemlösning med finmotorik övningar. Perfekt för förskoleklass material och lågstadiet.

Din prenumeration inkluderar över 3000 barnvänliga bilder organiserade i teman. Välj bilder relaterade till siffror och tal, bokstäver lära sig, eller valfritt ämne. Varje arbetsblad kan anpassas helt på canvas efter generering. Dra, rotera, skala och ta bort alla element. Lägg till egna bilder för att personalisera för dina elever.

Grundpaketsprenumerationen kostar 144 dollar per år eller 15 dollar per månad. Du får tillgång till 10 populära arbetsblad-generatorer inklusive hitta och räkna. Alla prenumerationer inkluderar kommersiell licensiering, stöd för 11 språk och professionella 300 DPI-exporter. Skapa obegränsat med arbetsblad gratis för utskrift utan ytterligare avgifter.`,
    previewImageSrc: '/samples/swedish/find-and-count/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
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

  // Features Grid - FULL text from find-and-count.md feature sections
  features: {
    sectionTitle: 'Hitta och Räkna Funktioner - Allt du Behöver för Arbetsblad Gratis och Förskoleklass Material',
    sectionDescription: 'Vår hitta-och-räkna generator inkluderar alla verktyg lärare behöver för professionella arbetsblad gratis för utskrift. Skapa matematik arbetsblad för förskoleklass och lågstadiet på under 3 minuter. Varje funktion designades för att spara tid och producera högkvalitativa resultat. Generatorn fungerar på alla enheter utan installation eller designkunskaper. Din Grundpaketsprenumeration ger obegränsad tillgång till alla funktioner.',
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

  // How-To Guide - FULL text from find-and-count.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Arbetsblad Gratis på 5 Enkla Steg - Matematik Arbetsblad och Förskoleklass Material',
    sectionDescription: 'Skapa kompletta hitta-och-räkna arbetsblad på under 3 minuter. Varje steg är enkelt och kräver inga designkunskaper. Följ denna guide för att producera professionella arbetsblad gratis för utskrift. Generatorn fungerar på alla enheter från datorer till surfplattor. Din Grundpaketsprenumeration ger obegränsad åtkomst till alla funktioner. Perfekt för att skapa matematik arbetsblad, målarbilder barn och förskoleklass material snabbt.',
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
        title: 'Välj Innehåll - Arbetsblad Gratis med Siffror och Tal för Förskoleklass',
        description: `Börja med att välja språk för bildbiblioteket. Svenska ger svenskrelevanta filnamn och teman. Välj sedan bilder från temabiblioteket eller bläddra individuella bilder. Temaval laddar 8-12 relaterade bilder automatiskt. Perfekt för siffror och tal teman, djur, fordon eller bokstäver lära sig. Du kan också ladda upp egna bilder för personalisering. Multi-fil uppladdning låter dig lägga till flera bilder samtidigt. Kombinera temabilder med uppladdade bilder för variation. Varje bild du väljer blir ett potentiellt "hitta"-objekt i arbetsblad gratis. Välj 3-6 olika objekttyper för bästa resultat i förskoleklass material.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar - Matematik Arbetsblad och Matte Övningar',
        description: `Konfigurera rutnätsstorlek från 5x5 till 10x10 rutor. Större rutnät ger svårare arbetsblad för äldre elever. Välj sidstorlek som A4 Portrait, Letter eller anpassad dimension. Välj vilka objekt eleverna ska hitta och räkna. Generatorn skapar automatiskt frågor baserat på dina val. Anpassa bakgrundsfärg eller välj ett bakgrundstema. Lägg till ramar för professionellt utseende. Dessa inställningar påverkar både matematik arbetsblad och finmotorik övningar. Skapa arbetsblad gratis optimerade för addition och subtraktion genom räkning. Justera svårighetsgrad genom att ändra antal objekt och rutnätsstorlek för matte övningar.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Arbetsblad - Förskoleklass Material med Siffror',
        description: `Klicka på "Generera" knappen för att skapa ditt arbetsblad. Generatorn placerar objekt slumpmässigt i rutnätet. Räknefrågor skapas automatiskt baserat på objektval. Förhandsgranskning visas omedelbart på canvas. Facit genereras automatiskt med rätta kvantiteter. Detta fungerar för multiplikationstabellen genom upprepade objektgrupper. Skapa arbetsblad gratis som lär siffror och tal genom visuell räkning. Varje generering skapar unikt layoutmönster. Perfekt för förskoleklass material med varierad svårighetsgrad. Generera om tills du hittar perfekt layout för dina elever.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Canvas - Målarbilder Barn och Finmotorik Övningar',
        description: `Efter generering öppnas full canvas-redigerare. Dra bilder till nya positioner med musen. Rotera objekt för visuellt intressantare layout. Skala bilder större eller mindre efter behov. Ta bort element som inte passar. Lägg till textrutor med elevers namn eller extra instruktioner. Ändra färger på bakgrund och ramar. Lägg till målarbilder barn element för kombinerade aktiviteter. Skapa arbetsblad gratis som kombinerar räkning med bokstäver lära sig. Använd lager-verktyg för att ordna element. Full redigeringsmöjlighet gör varje arbetsblad unikt för finmotorik övningar.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut - Arbetsblad Gratis',
        description: `Exportera ditt färdiga arbetsblad i PDF eller JPEG format. Välj gråskala för att spara bläck vid utskrift. Ladda ner både arbetsblad och facit samtidigt. Båda filerna exporteras i professionell 300 DPI kvalitet. Skriva ut på vanlig skrivare hemma fungerar perfekt. Arbetsblad gratis kan printas obegränsat från samma fil. Använd arbetsbladen för förskoleklass material direkt i klassrummet. Kombinera med klockan lära sig genom att lägga till tidselement. Spara filer för framtida användning eller modifiering. Skapa bibliotek av arbetsblad gratis för hela läsåret. Dela PDF-filer digitalt med föräldrar eller kollegor.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Hitta-och-räkna arbetsblad fungerar för många olika utbildningssituationer. Från förskoleklass till årskurs 3 använder lärare dessa arbetsblad dagligen. Hemundervisande föräldrar skapar anpassade matte övningar för sina barn. Specialpedagoger differentierar innehåll för individuella behov. Lärarentreprenörer säljer professionella arbetsblad gratis design på Teachers Pay Teachers. Varje användargrupp får unik värde från Grundpaketsprenumerationen.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from find-and-count.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Lärare och föräldrar ställer ofta samma frågor om hitta-och-räkna generatorn. Här besvarar vi de vanligaste frågorna om att skapa arbetsblad. Från prissättning till anpassningsalternativ täcker vi allt du behöver veta.',
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
    bundleDescription: 'Din prenumeration inkluderar tillgang till 10 arbetsbladsverktyg:',
    bundleApps: [
      'Bildaddition',
      'Alfabetstandriv',
      'Malarbilder',
      'Matematikuppgifter',
      'Ordtrassel',
      'Hitta och Rakna',
      'Matchningsspel',
      'Rita Linjer',
      'Bildbingo',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Gratis Arbetsblad Kombinera - Arbetsblad för Barn och Gratis Utskrifter',
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera hitta-och-räkna arbetsblad med dessa kompletterande generatorer.',
    ctaTitle: 'Redo att Skapa Fantastiska Arbetsblad?',
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

export default findAndCountSvContent;
