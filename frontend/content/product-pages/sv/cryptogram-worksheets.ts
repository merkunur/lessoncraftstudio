import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Cryptogram Worksheets - Swedish Content
 *
 * File: frontend/content/product-pages/sv/cryptogram-worksheets.ts
 * URL: /sv/apps/bildkryptogram-arbetsblad (Swedish SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Swedish/cryptogram.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const cryptogramSvContent: ProductPageContent = {
  // SEO Metadata - Swedish language-specific
  seo: {
    slug: 'bildkryptogram-arbetsblad',
    appId: 'cryptogram',
    title: 'Gratis Bildkryptogram Generator | LessonCraftStudio',
    description: 'Skapa utskrivbara bildkryptogram för barn. Knacka hemliga koder med bildledtrådar. Förskola till årskurs 3. 50 teman. Ladda ner gratis PDF.',
    keywords: 'bildkryptogram generator, bildkryptogram övningar, hemlig kod barn, kryptogram utskrivbar, avkodningsövning barn, hemliga koder arbetsblad, kodknackare barn, bildkryptogram förskola, chiffer övning, kryptering barn, hemliga meddelanden övning',
    canonicalUrl: 'https://www.lessoncraftstudio.com/sv/apps/bildkryptogram-arbetsblad',
      },

  // Hero Section - FULL text from cryptogram.md paragraphs 1-4
  hero: {
    title: 'Bildkryptogram Generator',
    subtitle: 'Hemliga Koder med Bildledtrådar från Förskola till Årskurs 3',
    description: `Skapa gratis arbetsblad för bildkryptogram med vår generator. Din Full Tillgång-prenumeration ger dig obegränsad skapande av gratis utskrifter utan extra avgifter per arbetsblad. Generera anpassade arbetsblad för barn perfekta för förskoleklass material och lågstadiebarn. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.

Bildkryptogram är roliga pusselarbetsblad där bokstäver ersätts med bilder. Barn löser pusslet genom att dechiffrera vilken bild som representerar varje bokstav. Detta skapar engagerande arbetsblad för förskoleklass och läsförståelse. Perfekt gratis arbetsblad för barn som gör bokstavsträning roligt och interaktivt.

Vår generator skapar både gratis arbetsblad och facit automatiskt. Arbetet med bildkryptogram stödjer flera lärandemål samtidigt. Barn tränar bokstavsigenkänning, problemlösning, logiskt tänkande och uthållighet. Varje bildkryptogram kan anpassas efter elevernas nivå genom att visa ledtrådar i form av avslöjade bokstäver.

Full Tillgång-prenumerationen inkluderar alla 33 arbetsbladsverktyg för 2 880 kr per år. Det motsvarar bara 240 kr per månad. Ingen extra kostnad för kommersiell licens, bildbibliotek eller obegränsad nedladdning. Gratis utskrifter ingår i en prenumeration.`,
    previewImageSrc: '/samples/swedish/cryptogram/sample-1.jpeg',
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
        videoId: '9U0BIIjCnco',
        buttonText: 'Bildkryptogram Funktioner',
        modalTitle: 'Bildkryptogram Guide',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/swedish/cryptogram/
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

  // Features Grid - FULL text from cryptogram.md feature sections
  features: {
    sectionTitle: 'Gratis Arbetsblad och Arbetsblad för Barn - Gratis Utskrifter och Arbetsblad för Förskoleklass',
    sectionDescription: 'Vår bildkryptogram-generator innehåller alla funktioner du behöver för professionella arbetsblad. Sju huvudfunktioner gör det enkelt att skapa engagerande bildkryptogram. Varje funktion är designad för lärare som behöver snabba, effektiva verktyg. Full kontroll över varje element på arbetsbladen.',
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

  // How-To Guide - FULL text from cryptogram.md step sections
  howTo: {
    sectionTitle: 'Gratis Arbetsblad för Barn Skapa - Arbetsblad för Förskoleklass och Gratis Utskrifter',
    sectionDescription: 'Skapa professionella bildkryptogram på under 3 minuter. Fem enkla steg från början till färdigt arbetsblad. Ingen designerfarenhet krävs för att göra högkvalitativa bildkryptogram. Följ denna guide för perfekta resultat varje gång.',
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
        title: 'Välj Innehåll för Bokstäver Lära Sig',
        description: `Skriv in fraser som eleverna ska lösa. En fras per rad i textfältet. Välj fraser som passar elevernas nivå och intresse. Kortare fraser för förskoleklass material, längre för äldre barn.

Varje bokstav i dina fraser kommer få en bild. Tänk på vilka bokstäver som förekommer. För bokstäver lära sig välj fraser med många olika bokstäver. För repetition använd fraser med samma bokstäver flera gånger.

Exempel på bra fraser för bildkryptogram. "KATTEN ÄTER FISK" ger träning på flera bokstäver. "RÄKNA TILL TIO" kombinerar bokstavsträning med siffror och tal. "MOR OCH FAR" är enkelt för nybörjare.

Temavälj gör innehållet meningsfullt för barn. Välj fraser om djur, mat, familj eller skolämnen. Bildkryptogram med bekanta ämnen engagerar bättre. Barn löser pussel snabbare när innehållet känns relevant.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Anpassa Inställningar',
        description: `Välj hur många bokstäver som ska avslöjas som ledtrådar. Nybörjare behöver fler ledtrådar för att komma igång. Avancerade elever klarar svårare pussel med färre ledtrådar. Justera svårighetsgraden efter gruppen.

Ledtråds-funktionen gör bildkryptogram perfekt för differentiering. Samma fras kan användas för hela klassen med olika svårighetsnivåer. Ge vissa elever 5 avslöjade bokstäver, andra bara 2. Automatisk anpassning efter förmåga.

Välj maximalt antal rader per bildkryptogram. Färre rader ger större text och bilder. Bättre för yngre barn och finmotorik övningar. Fler rader får plats med längre fraser och mer komplex träning.

Sidstorlek väljs här också. Letter Portrait för amerikanska skrivare. A4 Portrait för europeiska standard. Landscape för bredare bildkryptogram. Anpassning efter din skrivare och önskad layout.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Generera Bildkryptogram',
        description: `Klicka på Skapa-knappen när inställningarna är klara. Bildkryptogramet genereras på sekunder. Både pussel-versionen och facit skapas samtidigt. Två flikar visar de olika versionerna.

Pussel-fliken visar bildkryptogramet med bilder istället för bokstäver. Detta är vad eleverna får. Varje bokstav har ersatts med sin tilldelade bild. Ledtrådsbokstäver visas med både bild och bokstav.

Facit-fliken visar lösningen med alla bokstäver synliga. Detta är lärarens kopia för rättning. Eller en hjälpguide för elever som fastnar. Enkelt att byta mellan versionerna med flik-knapparna.

Inte nöjd med resultatet? Klicka Rensa och börja om. Eller gå tillbaka och justera inställningarna. Generera igen med nya val. Obegränsade försök ingår i prenumerationen.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Redigera på Canvas',
        description: `Klicka på valfritt element i bildkryptogramet för att välja det. Valda objekt får markeringsramar med handtag. Dra i handtagen för att ändra storlek. Dra objektet för att flytta det.

Bilder kan roteras för bättre layout. Klicka och dra rotationshandtaget. Vänd bilder 45, 90 eller 180 grader. Skapa intressantare bildkryptogram med varierade bildvinklar.

Lägg till egen text för instruktioner eller rubriker. Skriv texten i textfältet och klicka Lägg till. Texten hamnar på bildkryptogramet där du kan flytta den. Ändra typsnitt, storlek och färg efter behov.

Bakgrunder gör bildkryptogram mer tilltalande. Välj tema från bakgrund-menyn. Klicka på önskad bakgrund så läggs den till. Justera opacitet för subtila bakgrunder. Ta bort bakgrund genom att välja "Ingen".`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Ladda Ner och Skriv Ut',
        description: `Klicka på Ladda ner-knappen när bildkryptogramet är färdigt. Välj format från rullgardinsmenyn. JPEG för digital användning och delning. PDF för utskrift med exakt sidlayout.

Ladda ner både pussel och facit separat. Välj "Pussel (JPEG)" för elevkopian. Välj "Facit (JPEG)" för lärarens kopia. Eller välj PDF-versionerna för professionell utskrift. Båda versionerna behövs för komplett bildkryptogram-aktivitet.

Markera gråskala-rutan för svartvitt utskrift. Detta sparar färgbläck avsevärt. Särskilt viktigt när du skriver ut för hela klassen. Bildkryptogram fungerar lika bra i svartvitt som i färg.

Skala aldrig bildkryptogram vid utskrift. Använd "Faktisk storlek" i skrivarinställningar. Detta bibehåller 300 DPI-kvaliteten. Automatisk anpassning kan göra bilder suddiga. Alltid skriv ut i originalstorlek för skarpast resultat.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from cryptogram.md use case sections
  useCases: {
    sectionTitle: 'Gratis Arbetsblad för Barn - Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Bildkryptogram passar många olika användare och undervisningssituationer. Sex huvudgrupper använder verktyget regelbundet. Var och en har specifika behov som bildkryptogram fyller perfekt. Flexibiliteten gör verktyget ovärderligt för olika pedagogiska sammanhang.',
    badgeText: 'Vem Det Är För',
    readMoreLabel: 'Läs mer',
    showLessLabel: 'Visa mindre',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from cryptogram.md
  faq: {
    sectionTitle: 'FAQ - Gratis Arbetsblad för Barn och Arbetsblad för Förskoleklass med Gratis Utskrifter. Arbetsblad för Barn',
    sectionDescription: 'Lärare och föräldrar ställer ofta samma frågor om bildkryptogram-generatorn. Tolv vanligaste frågorna besvaras här. Allt från prenumerationskostnader till praktisk användning.',
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
    sectionDescription: 'Skapa kompletta lärpaket genom att kombinera bildkryptogram arbetsblad med dessa kompletterande generatorer.',
    ctaTitle: 'Redo att Skapa Fantastiska Bildkryptogram?',
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

export default cryptogramSvContent;
