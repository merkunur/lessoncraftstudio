import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Crossword Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/crossword-worksheets.ts
 * URL: /sv/apps/bildkorsord-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/crossword.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const crosswordSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'bildkorsord-arbetsblad',
    appId: 'crossword',
    title: 'Gratis Bildkorsord Generator | LessonCraftStudio',
    description: 'Skapa utskrivbara bildkorsord för barn. Bildledtrådar istället för text. Utveckla ordförråd från förskola till årskurs 3. Ladda ner gratis PDF.',
    keywords: 'bildkorsord generator, bildkorsord övningar, korsord barn utskrivbar, bildkorsord förskola, ordförråd korsord, korsord med bilder, enkla korsord barn, bildbaserade korsord, stavnings-korsord, korsord gratis barn, korsord lågstadiet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad',
      },

  // Hero Section - FULL text from crossword.md paragraphs 1-4
  hero: {
    title: 'Bildkorsord Generator',
    subtitle: 'Utskrivbara Korsord med Bildledtrådar för Barn',
    description: `Skapa professionella bildkorsord med vår bildkorsordsgenerator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till att skapa korsord utan extra avgifter per arbetsblad. Generera anpassade utskrivbara bildkorsord perfekta för förskoleklass material och bokstäver lära sig aktiviteter. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Bildkorsord kombinerar bilder med ordkunskap på ett roligt sätt. Eleverna ser bilder och skriver motsvarande ord i korsordsrutan. Detta hjälper barn att lära sig bokstäver samtidigt som de utvecklar ordförråd och stavningsförmåga. Perfekt för svenska klassrum från förskoleklass till årskurs 3.

Vår bildkorsordsgenerator erbjuder över 3000 barnvänliga bilder organiserade efter tema. Välj bilder från vårt bibliotek eller ladda upp dina egna foton. Anpassa allt från bakgrunder och ramar till textstorlek och färg. Skapa unika bildkorsord som passar dina elevers behov och intressen.

Varje bildkorsord exporteras i professionell 300 DPI-kvalitet. Ladda ner som PDF eller JPEG för perfekt utskrift. Full Tillgång-prenumerationen inkluderar kommersiell licens så du kan sälja dina bildkorsord på Teachers Pay Teachers, Etsy eller Amazon KDP. Alla 33 arbetsbladsgeneratorer ingår för endast $240 per år.`,
    previewImageSrc: '/samples/swedish/crossword/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Se hur det fungerar',
        modalTitle: 'Funktionsöversikt',
      },
      appSpecific: {
        videoId: 'b3WKDrzif-w',
        buttonText: 'Bildkorsord Funktioner',
        modalTitle: 'Bildkorsord Guide',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/crossword/
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

  // Features Grid - FULL text from crossword.md feature sections
  features: {
    sectionTitle: 'Bildkorsordsgenerator Funktioner - Allt Du Behöver för Arbetsblad Gratis och Matematik Arbetsblad',
    sectionDescription: 'Vår bildkorsordsgenerator innehåller alla verktyg du behöver för att skapa professionella arbetsblad för förskoleklass och arbetsblad för barn. Från gratis utskrifter till avancerade uppgifter för årskurs 3. Skapa bildkorsord med bokstäver lära sig fokus eller matematik arbetsblad kombinationer.',
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

  // How-To Guide - FULL text from crossword.md step sections
  howTo: {
    sectionTitle: 'Hur Man Skapar Arbetsblad Gratis i 5 Steg',
    sectionDescription: 'Skapa professionella bildkorsord på under 3 minuter med dessa enkla steg. Ingen design-erfarenhet krävs. Vårt verktyg guidar dig genom hela processen från bildval till färdig PDF. Perfekt för arbetsblad för förskoleklass, arbetsblad för barn och gratis utskrifter.',
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
        title: 'Välj Ditt Innehåll',
        description: `Börja med att välja vilket innehåll ditt bildkorsord ska ha. Välj ett tema från biblioteket för snabb start. Teman inkluderar djur, fordon, mat, kläder och mycket mer. Eller välj individuella bilder för fullständig kontroll.

Perfekt för att skapa bildkorsord med multiplikationstabellen eller siffror och tal fokus. Sök efter specifika bildnamn på svenska. Klicka på bilder för att lägga till dem i din samling. Du kan också aktivera anpassad ordlista-läge. Skriv in egna ord och ledtrådar manuellt.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Välj sidformat för ditt bildkorsord. Letter Portrait eller A4 Portrait för standardutskrift. Landscape-format för bredare korsord. Eller anpassad storlek för specialbehov.

Välj bakgrundstema från biblioteket. Över 50 temabaserade bakgrunder tillgängliga. Lägg till ramteman för professionellt utseende. Justera opacitet på bakgrund och ram. Skapa arbetsblad gratis med perfekt utseende för förskoleklass material. Alla inställningar sparas automatiskt för nästa gång.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Ditt Bildkorsord',
        description: `Klicka på generera-knappen efter att du valt bilder. Bildkorsordet skapas automatiskt på några sekunder. Algoritmen placerar ord i korsordsrutan baserat på bildnamn. Lodräta och vågräta ord flätas samman perfekt.

Bilderna visas som ledtrådar runt korsordet. Perfekt för klockan lära sig övningar där barn matchar klockbilder med tidsord. Fungerar lika bra för addition och subtraktion teman. Om du inte är nöjd klickar du bara på generera igen. Varje generering skapar en unik layout.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Canvas',
        description: `Efter generering öppnas redigeringsläget automatiskt. Dra bilder till nya positioner med musen. Skala element större eller mindre. Rotera för bättre layout. Ta bort bilder som inte passar. Lägg till nya bilder från biblioteket.

Lägg till textrutor med instruktioner. Ändra textstorlek och färg. Justera korsordsrutornas storlek. Perfekt för att kombinera matematik arbetsblad med bildkorsord. Anpassa för bokstäver lära sig fokus i svenska klassrum.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut',
        description: `Klicka på nedladdningsknappen när du är nöjd. Välj PDF-format för bästa utskriftskvalitet. Eller JPEG för delning online. Gråskaleläge tillgängligt för att spara bläck.

Facit genereras automatiskt med lösningen. Perfekt för multiplikationstabellen övningar där lärare behöver svarsnycklar. Skriv ut hemma på vanlig skrivare. Eller skicka till professionellt tryckeri. 300 DPI kvalitet garanterad på alla nedladdningar.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from crossword.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Bildkorsordsgeneratorn passar många olika användare inom svensk utbildning. Från förskollärare till lärarentreprenörer. Varje användargrupp får unika fördelar av vårt verktyg. Skapa arbetsblad gratis med förskoleklass material anpassat för dina elever.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from crossword.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Vanliga frågor om vår bildkorsordsgenerator, matematik arbetsblad och bokstäver lära sig funktioner.',
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
    price: '$240',
    priceInterval: '/år',
    priceSuffix: 'Faktureras årligen',
    benefits: [
      'Alla 33 arbetsbladsverktyg',
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
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera bildkorsord arbetsblad med dessa kompletterande generatorer.',
    ctaTitle: 'Redo att Skapa Fantastiska Bildkorsord?',
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

export default crosswordSvContent;
