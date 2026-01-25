import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Path Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/picture-path-worksheets.ts
 * URL: /sv/apps/bildlabyrint-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/picture-path.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Tillgång ($240/year or $25/month)
 * Swedish: Full Tillgång (2 900 SEK/år eller 300 SEK/månad)
 */

export const picturePathSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'bildlabyrint-arbetsblad',
    appId: 'picture-path',
    title: 'Gratis Arbetsblad Bildlabyrint | Generator för Barn och Förskoleklass',
    description: 'Skapa gratis arbetsblad för barn med vår bildlabyrint generator. Perfekt arbetsblad för förskoleklass och finmotorik övningar. Ladda ner PDF på 3 min.',
    keywords: 'arbetsblad gratis, bildlabyrint, förskoleklass material, matematik arbetsblad, matte övningar, finmotorik övningar, multiplikationstabellen, siffror och tal, klockan lära sig, addition och subtraktion, målarbilder barn, bokstäver lära sig, skriva bokstäver',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/bildlabyrint-arbetsblad',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/picture-path/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Bildlabyrint gratis arbetsblad för förskoleklass - finmotorik övningar visuell problemlösning'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/picture-path/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Gratis arbetsblad bildlabyrint - arbetsblad för barn matte övningar'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/picture-path/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Arbetsblad för förskoleklass bildlabyrint - gratis utskrifter matematik arbetsblad'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/swedish/picture-path/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Bildlabyrint arbetsblad för barn - gratis arbetsblad siffror och tal'
      },
    ],
  },

  // Hero Section - FULL text from picture-path.md paragraphs 1-4
  hero: {
    title: 'Gratis Arbetsblad Bildlabyrint Generator',
    subtitle: 'Arbetsblad för Barn och Förskoleklass - Gratis Utskrifter med Finmotorik Övningar',
    description: `Skapa professionella bildlabyrint arbetsblad med vår bildlabyrint generator. Generatorn inkluderar tre spellägen för varierad inlärning. Bildlabyrint kombinerar visuell problemlösning med finmotorik övningar. Perfekt för att skapa arbetsblad gratis för förskoleklass material och lågstadiet. Ladda ner högkvalitativa PDF arbetsblad på under tre minuter.

Vår bildlabyrint generator gör det enkelt att skapa anpassade labyrintarbetsblad. Välj mellan klassisk labyrint, bildväg eller välj rätt väg spellägen. Varje läge erbjuder unik inlärning för eleverna. Använd över 3000 barnvänliga bilder för att skapa engagerande arbetsblad. Kombinera bildlabyrint med matematik arbetsblad för matte övningar. Perfekt för att öva siffror och tal genom visuell problemlösning.

Generatorn skapar automatiskt facit för varje labyrint. Ladda ner både arbetsblad och facit som PDF eller JPEG. Varje arbetsblad kan anpassas helt på canvas. Dra, rotera och ändra storlek på alla element. Lägg till målarbilder barn kan färglägga efter att ha löst labyrinten. Bildlabyrinten fungerar utmärkt för finmotorik övningar när elever ritar vägen.

Bildlabyrint generatorn stöder svenska och tio andra språk. Bildnamn visas på svenska när du väljer svenska som innehållsspråk. Detta gör det perfekt för svenska klassrum. Skapa arbetsblad för bokstäver lära sig genom bildvägar med alfabetsbilder. Använd labyrint för att öva multiplikationstabellen med sifferbilder. Kombinera med övningar för att skriva bokstäver och klockan lära sig.`,
    previewImageSrc: '/samples/swedish/picture-path/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/swedish/picture-path/
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
    items: [
      {
        id: 'sample-1',
        worksheetSrc: '/samples/swedish/picture-path/sample-1.jpeg',
        answerKeySrc: '/samples/swedish/picture-path/sample-1.jpeg',
        altText: 'Bildlabyrint gratis arbetsblad för förskoleklass - finmotorik övningar visuell problemlösning',
        imageTitle: 'Bildlabyrint gratis arbetsblad för förskoleklass',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/swedish/picture-path/sample-2.jpeg',
        answerKeySrc: '/samples/swedish/picture-path/sample-2.jpeg',
        altText: 'Gratis arbetsblad bildlabyrint - arbetsblad för barn matte övningar',
        imageTitle: 'Gratis arbetsblad bildlabyrint',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/swedish/picture-path/sample-3.jpeg',
        answerKeySrc: '/samples/swedish/picture-path/sample-3.jpeg',
        altText: 'Arbetsblad för förskoleklass bildlabyrint - gratis utskrifter matematik arbetsblad',
        imageTitle: 'Arbetsblad för förskoleklass bildlabyrint',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/swedish/picture-path/sample-4.jpeg',
        answerKeySrc: '/samples/swedish/picture-path/sample-4.jpeg',
        altText: 'Bildlabyrint arbetsblad för barn - gratis arbetsblad siffror och tal',
        imageTitle: 'Bildlabyrint arbetsblad för barn',
      },
    ],
    
  },

  // Features Grid - FULL descriptions from picture-path.md H3 sections
  features: {
    sectionTitle: 'Gratis Arbetsblad Bildlabyrint Funktioner - Arbetsblad för Barn och Förskoleklass Material',
    sectionDescription: 'Vår bildlabyrint generator innehåller alla funktioner du behöver för professionella arbetsblad. Skapa arbetsblad gratis som vattenstämplade filer eller prenumerera för kommersiell användning. Generatorn är perfekt för att skapa förskoleklass material och matematik arbetsblad med gratis utskrifter. Använd den för matte övningar och finmotorik övningar. Varje funktion är designad för att göra arbetsbladet professionellt och engagerande för eleverna.',
    highlightBadgeText: 'Nyckelfunktion',
    badgeText: 'Funktioner',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    trustBadges: {
      allFeatures: 'Alla funktioner inkluderade',
      noHiddenFees: 'Inga dolda avgifter',
      cancelAnytime: 'Avsluta när som helst',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from picture-path.md Step sections
  howTo: {
    sectionTitle: 'Gratis Arbetsblad för Barn Skapa - Arbetsblad för Förskoleklass och Gratis Utskrifter',
    sectionDescription: 'Skapa professionella bildlabyrint arbetsblad på under tre minuter totalt. Följ dessa fem enkla steg för att skapa arbetsblad gratis. Varje steg är designat för enkelhet och effektivitet. Inga designkunskaper behövs för att skapa förskoleklass material. Generatorn guidar dig genom hela processen automatiskt.',
    ctaText: 'Börja Skapa Nu',
    badgeText: 'Så Fungerar Det',
    stepLabel: 'Steg',
    completionTitle: 'Klart!',
    completionSubtitle: 'Ditt arbetsblad är redo',
    readyTime: 'Klart på under 3 minuter',
    noSkillsNeeded: 'Inga designkunskaper behövs',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Steg 1: Välj Spelläge och Bilder - Multiplikationstabellen, Addition och Subtraktion, eller Klockan Lära Sig Arbetsblad',
        description: 'Det första steget är att välja spelläge och bildinnehåll. Välj mellan tre spellägen: bildväg, klassisk labyrint eller välj rätt väg. Bildväg är enklast för förskoleklass material. Klassisk labyrint ger rutnätsnavigering för äldre elever. Välj rätt väg kräver problemlösning när elever väljer mellan alternativ. För matematik arbetsblad välj bilder för multiplikationstabellen. Hitta sifferbilder i bildbiblioteket. Skapa labyrint för addition och subtraktion med räknebilder. Välj bilder som visar siffror och tal visuellt. För tidsarbetsblad välj klockbilder för klockan lära sig.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Steg 2: Anpassa Inställningar - Arbetsblad Gratis för Förskoleklass Material och Matte Övningar',
        description: 'Andra steget är att anpassa labyrintinställningar efter dina elevers nivå. För klassisk labyrint välj rutnätsstorlek mellan 12×12 och 15×15. Mindre rutnät passar förskoleklass material bättre. Större rutnät ger mer utmaning för årskurs 2-3. Justera svårighetsgraden baserat på elevgruppen. För bildväg läge bestäm hur många bilder som ska ingå i vägen. Färre bilder gör vägen enklare att följa för yngre elever. Anpassa sidstorlek för ditt utskriftsbehov. A4 format är standard för svenska skolor.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Steg 3: Generera Arbetsblad - Matematik Arbetsblad för Multiplikationstabellen och Finmotorik Övningar',
        description: 'Tredje steget är att generera ditt bildlabyrint arbetsblad. Klicka på generera knappen och arbetsbladet skapas automatiskt. Genereringen tar bara några sekunder. Förhandsvisning visar både arbetsblad och facit. Generatorn skapar professionella arbetsblad gratis varje gång. För matematik arbetsblad placeras multiplikationstabellen bilder strategiskt i labyrinten. Klassisk labyrint placerar sifferbilder längs lösningsvägen. Elever samlar alla matematikbilder när de följer rätt väg. För bildväg läge skapar generatorn en väg genom valda bilder.',
        icon: '⚡',
      },
      {
        id: '4',
        number: 4,
        title: 'Steg 4: Redigera på Canvas - Bokstäver Lära Sig och Målarbilder Barn Anpassning',
        description: 'Fjärde steget är att anpassa arbetsbladet på canvas. Varje element kan redigeras efter generering. Dra bilder till nya positioner med musen. Rotera element för bättre layout. Ändra storlek på bilder för visuell balans. Full redigerbarhet gör varje arbetsblad unikt. Lägg till textelement med instruktioner på svenska. För bokstäver lära sig arbetsblad lägg till alfabetsinstruktioner. Lägg till målarbilder barn kan färglägga efter att ha löst labyrinten. Placera färgläggningsbilder i hörnen av arbetsbladet.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Steg 5: Ladda Ner och Skriv Ut - Arbetsblad Gratis för Addition och Subtraktion och Klockan Lära Sig',
        description: 'Femte steget är att ladda ner dina färdiga arbetsblad. Välj mellan PDF och JPEG format. PDF är bäst för utskrift och digital distribution. JPEG fungerar bra för att infoga i presentationer. Båda formaten exporterar i 300 DPI professionell kvalitet. Ladda ner både arbetsblad och facit samtidigt. Välj gråskala alternativ för att spara bläck vid utskrift. För addition och subtraktion arbetsblad skriv ut flera kopior för övning. För klockan lära sig arbetsblad skriv ut och laminera för återanvändning.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from picture-path.md persona sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Bildlabyrint generatorn är perfekt för olika användargrupper. Lärare i förskoleklass och lågstadiet använder den dagligen. Föräldrar som hemundervisar uppskattar flexibiliteten. Speciallärare skapar anpassade arbetsblad för individuella behov. Lärare entreprenörer säljer bildlabyrint på Teachers Pay Teachers. Varje användargrupp drar nytta av generatorns funktioner.',
    badgeText: 'Användningsområden',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - ALL questions from picture-path.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Lärare och föräldrar har vanligtvis liknande frågor om bildlabyrint generatorn. Dessa vanliga frågor täcker de mest efterfrågade ämnena. Lär dig hur du skapar multiplikationstabellen arbetsblad effektivt. Förstå hur siffror och tal arbetsblad fungerar. Upptäck hur målarbilder barn kan integreras i labyrinterna.',
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
      '3 labyrint spellägen',
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
    sectionDescription: 'Bildlabyrint är bara en av 33 arbetsblad generatorer i Full Tillgång prenumeration. Kombinera bildlabyrint med andra verktyg för kompletta lärpaket. Skapa tematiska samlingar som täcker flera inlärningsområden samtidigt. Lärare bygger kompletta förskoleklass material paket med kombinerade verktyg.',
    ctaTitle: 'Redo att Skapa Fantastiska Arbetsblad?',
    ctaDescription: 'Gå med tusentals pedagoger som skapar professionella arbetsblad. Obegränsat skapande, kommersiell licens inkluderad.',
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

export default picturePathSvContent;
