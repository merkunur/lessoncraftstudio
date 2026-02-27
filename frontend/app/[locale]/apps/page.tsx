import { Metadata } from 'next';
import Link from 'next/link';
import AppCard from '@/components/apps/AppCard';
import { generateAppsCollectionSchema, generateAppsItemListSchema, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { ALL_APPS, APP_CATEGORIES, type AppId, type CategoryId } from '@/config/warriorplus-products';
import { getLocalizedAppName } from '@/config/app-translations';

// ============================================================
// SEO METADATA (entrepreneur-focused, all 11 locales)
// ============================================================
const appsMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  en: {
    title: '33 Printable Generators | Create & Sell on Etsy & Amazon KDP | LessonCraftStudio',
    description: 'Browse all 33 professional printable generators. Create word searches, math worksheets, coloring pages, puzzles & more. Try free with watermark. Sell on Etsy, Amazon KDP.',
    keywords: 'printable generator, Etsy printables, KDP worksheets, sell printables online, word search generator, math worksheet maker, coloring page creator, crossword puzzle generator, printable business tools, create and sell printables',
  },
  de: {
    title: '33 Druckvorlagen-Generatoren | Erstellen & Verkaufen auf Etsy & KDP | LessonCraftStudio',
    description: 'Alle 33 professionellen Druckvorlagen-Generatoren entdecken. Wortsuche, Mathe-Arbeitsblätter, Ausmalbilder, Rätsel & mehr. Gratis mit Wasserzeichen testen. Auf Etsy & Amazon KDP verkaufen.',
    keywords: 'Druckvorlagen-Generator, Etsy Druckvorlagen, KDP Arbeitsblätter, Druckvorlagen online verkaufen, Wortsuche-Generator, Arbeitsblatt-Ersteller, Ausmalbilder-Generator, Kreuzworträtsel-Generator, Printable-Business',
  },
  fr: {
    title: '33 Générateurs d\'Imprimables | Créez & Vendez sur Etsy & KDP | LessonCraftStudio',
    description: 'Découvrez 33 générateurs d\'imprimables professionnels. Mots cachés, fiches maths, coloriages, puzzles & plus. Essai gratuit avec filigrane. Vendez sur Etsy & Amazon KDP.',
    keywords: 'générateur imprimables, Etsy imprimables, KDP fiches, vendre imprimables en ligne, générateur mots cachés, créateur fiches maths, générateur coloriages, business imprimables',
  },
  es: {
    title: '33 Generadores de Imprimibles | Crea y Vende en Etsy y KDP | LessonCraftStudio',
    description: 'Explora 33 generadores de imprimibles profesionales. Sopa de letras, fichas de matemáticas, colorear, puzzles y más. Prueba gratis con marca de agua. Vende en Etsy y Amazon KDP.',
    keywords: 'generador imprimibles, Etsy imprimibles, KDP fichas, vender imprimibles online, generador sopa letras, creador fichas matemáticas, generador colorear, negocio imprimibles',
  },
  it: {
    title: '33 Generatori di Stampabili | Crea e Vendi su Etsy e KDP | LessonCraftStudio',
    description: 'Scopri 33 generatori di stampabili professionali. Cerca parole, schede matematica, disegni da colorare, puzzle e altro. Prova gratis con filigrana. Vendi su Etsy e Amazon KDP.',
    keywords: 'generatore stampabili, Etsy stampabili, KDP schede, vendere stampabili online, generatore cerca parole, creatore schede matematica, generatore disegni colorare, business stampabili',
  },
  pt: {
    title: '33 Geradores de Imprimíveis | Crie e Venda no Etsy e KDP | LessonCraftStudio',
    description: 'Descubra 33 geradores de imprimíveis profissionais. Caça-palavras, atividades de matemática, colorir, puzzles e mais. Teste grátis com marca d\'agua. Venda no Etsy e Amazon KDP.',
    keywords: 'gerador imprimíveis, Etsy imprimíveis, KDP atividades, vender imprimíveis online, gerador caça-palavras, criador atividades matemática, negócio imprimíveis',
  },
  nl: {
    title: '33 Printbare Generatoren | Maak & Verkoop op Etsy & KDP | LessonCraftStudio',
    description: 'Ontdek 33 professionele printbare generatoren. Woordzoekers, rekenwerkbladen, kleurplaten, puzzels & meer. Gratis proberen met watermerk. Verkoop op Etsy & Amazon KDP.',
    keywords: 'printbare generator, Etsy printables, KDP werkbladen, printables online verkopen, woordzoeker generator, werkblad maker, kleurplaat generator, printable business',
  },
  sv: {
    title: '33 Utskriftsgeneratorer | Skapa & Sälj på Etsy & KDP | LessonCraftStudio',
    description: 'Utforska 33 professionella utskriftsgeneratorer. Ordsökningar, mattearbetsblad, målarbilder, pussel & mer. Prova gratis med vattenstämpel. Sälj på Etsy & Amazon KDP.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP arbetsblad, sälja utskrifter online, ordsökningsgenerator, arbetsbladsskapare, utskriftsföretag',
  },
  da: {
    title: '33 Printbare Generatorer | Opret & Sælg på Etsy & KDP | LessonCraftStudio',
    description: 'Udforsk 33 professionelle printbare generatorer. Ordsøgninger, matematikopgaver, malebøger, puslespil & mere. Prøv gratis med vandmærke. Sælg på Etsy & Amazon KDP.',
    keywords: 'printbar generator, Etsy printables, KDP opgaver, sælg printables online, ordsøgningsgenerator, opgaveskaber, printable virksomhed',
  },
  no: {
    title: '33 Utskriftsgeneratorer | Lag & Selg på Etsy & KDP | LessonCraftStudio',
    description: 'Utforsk 33 profesjonelle utskriftsgeneratorer. Ordsøk, matteoppgaver, fargelegging, puslespill & mer. Prøv gratis med vannmerke. Selg på Etsy & Amazon KDP.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP oppgaver, selg utskrifter online, ordsøkgenerator, oppgaveskaper, utskriftsvirksomhet',
  },
  fi: {
    title: '33 Tulostettavaa Generaattoria | Luo & Myy Etsyssä & KDP:ssä | LessonCraftStudio',
    description: 'Tutustu 33 ammattimaiseen tulostettavaan generaattoriin. Sanaristikkoja, matematiikkatehtäviä, värityskuvia, palapelejä & lisää. Kokeile ilmaiseksi vesileimalla. Myy Etsyssä & Amazon KDP:ssä.',
    keywords: 'tulostettava generaattori, Etsy tulostettavat, KDP tehtävät, myy tulostettavia verkossa, sanaristikkogeneraattori, tulostettavien liiketoiminta',
  },
};

// ============================================================
// PAGE CONTENT (all 11 locales)
// ============================================================
const localeContent: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  tryFree: string;
  details: string;
  trustNoAccount: string;
  trustAllFree: string;
  trustCommercial: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  categories: Record<string, { name: string; description: string }>;
}> = {
  en: {
    heroTitle: '33 Professional Printable Generators',
    heroSubtitle: 'Create professional printables for your business. Word searches, math worksheets, coloring pages, puzzles & more. Try all 33 generators free with watermark.',
    tryFree: 'Try Free',
    details: 'Details',
    trustNoAccount: 'No account required',
    trustAllFree: 'All 33 generators free',
    trustCommercial: 'Commercial license available',
    ctaTitle: 'Start Creating Printables Today',
    ctaSubtitle: 'Try all 33 generators free with watermark. No account required. See the quality before you buy.',
    ctaButton: 'Try Free with Watermark',
    categories: {
      math: { name: 'Math Mastery', description: '6 professional math generators — addition, subtraction, puzzles & more' },
      literacy: { name: 'Literacy & Language', description: '7 word and language generators — word search, scramble, writing & more' },
      visual: { name: 'Visual Learning', description: '7 visual generators — coloring pages, drawing, patterns & more' },
      matching: { name: 'Matching & Sorting', description: '5 matching generators — bingo, grid match, shadow match & more' },
      puzzle: { name: 'Puzzles & Logic', description: '4 puzzle generators — sudoku, missing pieces, odd one out & more' },
      search: { name: 'Search & Find', description: '4 search generators — crossword, treasure hunt, find objects & more' },
    },
  },
  de: {
    heroTitle: '33 professionelle Druckvorlagen-Generatoren',
    heroSubtitle: 'Erstellen Sie professionelle Druckvorlagen für Ihr Business. Wortsuche, Mathe-Arbeitsblätter, Ausmalbilder, Rätsel & mehr. Alle 33 Generatoren gratis mit Wasserzeichen testen.',
    tryFree: 'Gratis testen',
    details: 'Details',
    trustNoAccount: 'Kein Konto erforderlich',
    trustAllFree: 'Alle 33 Generatoren gratis',
    trustCommercial: 'Kommerzielle Lizenz verfügbar',
    ctaTitle: 'Starten Sie noch heute mit Druckvorlagen',
    ctaSubtitle: 'Alle 33 Generatoren gratis mit Wasserzeichen testen. Kein Konto erforderlich. Qualität vor dem Kauf prüfen.',
    ctaButton: 'Gratis mit Wasserzeichen testen',
    categories: {
      math: { name: 'Mathematik', description: '6 professionelle Mathe-Generatoren — Addition, Subtraktion, Rätsel & mehr' },
      literacy: { name: 'Lesen & Sprache', description: '7 Wort- und Sprach-Generatoren — Wortsuche, Buchstabensalat, Schreiben & mehr' },
      visual: { name: 'Visuelles Lernen', description: '7 visuelle Generatoren — Ausmalbilder, Zeichnen, Muster & mehr' },
      matching: { name: 'Zuordnung & Sortierung', description: '5 Zuordnungs-Generatoren — Bingo, Gitter-Match, Schatten-Match & mehr' },
      puzzle: { name: 'Rätsel & Logik', description: '4 Rätsel-Generatoren — Sudoku, fehlende Teile, Außenseiter & mehr' },
      search: { name: 'Suchen & Finden', description: '4 Such-Generatoren — Kreuzworträtsel, Schatzsuche, Objekte finden & mehr' },
    },
  },
  fr: {
    heroTitle: '33 générateurs d\'imprimables professionnels',
    heroSubtitle: 'Créez des imprimables professionnels pour votre business. Mots cachés, fiches maths, coloriages, puzzles & plus. Essayez les 33 générateurs gratuits avec filigrane.',
    tryFree: 'Essai gratuit',
    details: 'Détails',
    trustNoAccount: 'Aucun compte requis',
    trustAllFree: '33 générateurs gratuits',
    trustCommercial: 'Licence commerciale disponible',
    ctaTitle: 'Commencez à créer des imprimables',
    ctaSubtitle: 'Essayez les 33 générateurs gratuits avec filigrane. Aucun compte requis. Voyez la qualité avant d\'acheter.',
    ctaButton: 'Essai gratuit avec filigrane',
    categories: {
      math: { name: 'Mathématiques', description: '6 générateurs de maths — addition, soustraction, puzzles & plus' },
      literacy: { name: 'Lecture & Langage', description: '7 générateurs de mots — mots cachés, anagrammes, écriture & plus' },
      visual: { name: 'Apprentissage visuel', description: '7 générateurs visuels — coloriages, dessin, motifs & plus' },
      matching: { name: 'Association & Tri', description: '5 générateurs d\'association — bingo, grille, ombres & plus' },
      puzzle: { name: 'Puzzles & Logique', description: '4 générateurs de puzzles — sudoku, pièces manquantes, intrus & plus' },
      search: { name: 'Chercher & Trouver', description: '4 générateurs de recherche — mots croisés, chasse au trésor, objets cachés & plus' },
    },
  },
  es: {
    heroTitle: '33 generadores de imprimibles profesionales',
    heroSubtitle: 'Crea imprimibles profesionales para tu negocio. Sopa de letras, fichas de matemáticas, colorear, puzzles y más. Prueba los 33 generadores gratis con marca de agua.',
    tryFree: 'Probar gratis',
    details: 'Detalles',
    trustNoAccount: 'Sin cuenta requerida',
    trustAllFree: '33 generadores gratis',
    trustCommercial: 'Licencia comercial disponible',
    ctaTitle: 'Empieza a crear imprimibles hoy',
    ctaSubtitle: 'Prueba los 33 generadores gratis con marca de agua. Sin cuenta requerida. Comprueba la calidad antes de comprar.',
    ctaButton: 'Probar gratis con marca de agua',
    categories: {
      math: { name: 'Matemáticas', description: '6 generadores de matemáticas — suma, resta, puzzles y más' },
      literacy: { name: 'Lectura y Lenguaje', description: '7 generadores de palabras — sopa de letras, anagramas, escritura y más' },
      visual: { name: 'Aprendizaje Visual', description: '7 generadores visuales — colorear, dibujo, patrones y más' },
      matching: { name: 'Emparejamiento', description: '5 generadores de emparejamiento — bingo, cuadrícula, sombras y más' },
      puzzle: { name: 'Puzzles y Lógica', description: '4 generadores de puzzles — sudoku, piezas faltantes, intruso y más' },
      search: { name: 'Busca y Encuentra', description: '4 generadores de búsqueda — crucigrama, búsqueda del tesoro, objetos ocultos y más' },
    },
  },
  it: {
    heroTitle: '33 generatori di stampabili professionali',
    heroSubtitle: 'Crea stampabili professionali per il tuo business. Cerca parole, schede matematica, disegni da colorare, puzzle e altro. Prova tutti i 33 generatori gratis con filigrana.',
    tryFree: 'Prova gratis',
    details: 'Dettagli',
    trustNoAccount: 'Nessun account richiesto',
    trustAllFree: '33 generatori gratuiti',
    trustCommercial: 'Licenza commerciale disponibile',
    ctaTitle: 'Inizia a creare stampabili oggi',
    ctaSubtitle: 'Prova tutti i 33 generatori gratis con filigrana. Nessun account richiesto. Verifica la qualità prima di acquistare.',
    ctaButton: 'Prova gratis con filigrana',
    categories: {
      math: { name: 'Matematica', description: '6 generatori di matematica — addizione, sottrazione, puzzle e altro' },
      literacy: { name: 'Lettura e Linguaggio', description: '7 generatori di parole — cerca parole, anagrammi, scrittura e altro' },
      visual: { name: 'Apprendimento Visivo', description: '7 generatori visivi — disegni da colorare, disegno, motivi e altro' },
      matching: { name: 'Abbinamento', description: '5 generatori di abbinamento — bingo, griglia, ombre e altro' },
      puzzle: { name: 'Puzzle e Logica', description: '4 generatori di puzzle — sudoku, pezzi mancanti, intruso e altro' },
      search: { name: 'Cerca e Trova', description: '4 generatori di ricerca — cruciverba, caccia al tesoro, oggetti nascosti e altro' },
    },
  },
  pt: {
    heroTitle: '33 geradores de imprimíveis profissionais',
    heroSubtitle: 'Crie imprimíveis profissionais para seu negócio. Caça-palavras, atividades de matemática, colorir, puzzles e mais. Experimente os 33 geradores grátis com marca d\'agua.',
    tryFree: 'Teste grátis',
    details: 'Detalhes',
    trustNoAccount: 'Sem conta necessária',
    trustAllFree: '33 geradores grátis',
    trustCommercial: 'Licença comercial disponível',
    ctaTitle: 'Comece a criar imprimíveis hoje',
    ctaSubtitle: 'Experimente os 33 geradores grátis com marca d\'agua. Sem conta necessária. Veja a qualidade antes de comprar.',
    ctaButton: 'Teste grátis com marca d\'agua',
    categories: {
      math: { name: 'Matemática', description: '6 geradores de matemática — adição, subtração, puzzles e mais' },
      literacy: { name: 'Leitura e Linguagem', description: '7 geradores de palavras — caça-palavras, anagramas, escrita e mais' },
      visual: { name: 'Aprendizagem Visual', description: '7 geradores visuais — colorir, desenho, padrões e mais' },
      matching: { name: 'Correspondência', description: '5 geradores de correspondência — bingo, grade, sombras e mais' },
      puzzle: { name: 'Puzzles e Lógica', description: '4 geradores de puzzles — sudoku, peças faltantes, intruso e mais' },
      search: { name: 'Procure e Encontre', description: '4 geradores de busca — palavras cruzadas, caça ao tesouro, objetos escondidos e mais' },
    },
  },
  nl: {
    heroTitle: '33 professionele printbare generatoren',
    heroSubtitle: 'Maak professionele printables voor je business. Woordzoekers, rekenwerkbladen, kleurplaten, puzzels & meer. Probeer alle 33 generatoren gratis met watermerk.',
    tryFree: 'Gratis proberen',
    details: 'Details',
    trustNoAccount: 'Geen account nodig',
    trustAllFree: 'Alle 33 generatoren gratis',
    trustCommercial: 'Commerciële licentie beschikbaar',
    ctaTitle: 'Begin vandaag met printables maken',
    ctaSubtitle: 'Probeer alle 33 generatoren gratis met watermerk. Geen account nodig. Bekijk de kwaliteit voor je koopt.',
    ctaButton: 'Gratis proberen met watermerk',
    categories: {
      math: { name: 'Wiskunde', description: '6 professionele wiskunde generatoren — optellen, aftrekken, puzzels & meer' },
      literacy: { name: 'Lezen & Taal', description: '7 woord- en taalgeneratoren — woordzoeker, woordmix, schrijven & meer' },
      visual: { name: 'Visueel Leren', description: '7 visuele generatoren — kleurplaten, tekenen, patronen & meer' },
      matching: { name: 'Matchen & Sorteren', description: '5 matching generatoren — bingo, rastermatching, schaduwmatching & meer' },
      puzzle: { name: 'Puzzels & Logica', description: '4 puzzelgeneratoren — sudoku, ontbrekende stukken, vreemde eend & meer' },
      search: { name: 'Zoeken & Vinden', description: '4 zoekgeneratoren — kruiswoordpuzzel, schattenjacht, objecten zoeken & meer' },
    },
  },
  sv: {
    heroTitle: '33 professionella utskriftsgeneratorer',
    heroSubtitle: 'Skapa professionella utskrifter för ditt företag. Ordsökningar, mattearbetsblad, målarbilder, pussel & mer. Prova alla 33 generatorer gratis med vattenstämpel.',
    tryFree: 'Prova gratis',
    details: 'Detaljer',
    trustNoAccount: 'Inget konto krävs',
    trustAllFree: 'Alla 33 generatorer gratis',
    trustCommercial: 'Kommersiell licens tillgänglig',
    ctaTitle: 'Börja skapa utskrifter idag',
    ctaSubtitle: 'Prova alla 33 generatorer gratis med vattenstämpel. Inget konto krävs. Se kvaliteten innan du köper.',
    ctaButton: 'Prova gratis med vattenstämpel',
    categories: {
      math: { name: 'Matematik', description: '6 professionella mattegeneratorer — addition, subtraktion, pussel & mer' },
      literacy: { name: 'Läsning & Språk', description: '7 ord- och språkgeneratorer — ordsökning, ordmix, skrivning & mer' },
      visual: { name: 'Visuellt Lärande', description: '7 visuella generatorer — målarbilder, ritning, mönster & mer' },
      matching: { name: 'Matchning & Sortering', description: '5 matchningsgeneratorer — bingo, rutmatching, skuggmatching & mer' },
      puzzle: { name: 'Pussel & Logik', description: '4 pusselgeneratorer — sudoku, saknade bitar, udda ut & mer' },
      search: { name: 'Sök & Hitta', description: '4 sökgeneratorer — korsord, skattjakt, hitta objekt & mer' },
    },
  },
  da: {
    heroTitle: '33 professionelle printbare generatorer',
    heroSubtitle: 'Opret professionelle printables til din virksomhed. Ordsøgninger, matematikopgaver, malebøger, puslespil & mere. Prøv alle 33 generatorer gratis med vandmærke.',
    tryFree: 'Prøv gratis',
    details: 'Detaljer',
    trustNoAccount: 'Ingen konto påkrævet',
    trustAllFree: 'Alle 33 generatorer gratis',
    trustCommercial: 'Kommerciel licens tilgængelig',
    ctaTitle: 'Begynd at lave printables i dag',
    ctaSubtitle: 'Prøv alle 33 generatorer gratis med vandmærke. Ingen konto påkrævet. Se kvaliteten før du køber.',
    ctaButton: 'Prøv gratis med vandmærke',
    categories: {
      math: { name: 'Matematik', description: '6 professionelle matematikgeneratorer — addition, subtraktion, puslespil & mere' },
      literacy: { name: 'Læsning & Sprog', description: '7 ord- og sproggeneratorer — ordsøgning, ordmix, skrivning & mere' },
      visual: { name: 'Visuel Læring', description: '7 visuelle generatorer — malebøger, tegning, mønstre & mere' },
      matching: { name: 'Matching & Sortering', description: '5 matchinggeneratorer — bingo, gittermatching, skyggematch & mere' },
      puzzle: { name: 'Puslespil & Logik', description: '4 puslespilgeneratorer — sudoku, manglende brikker, mærkelig en ud & mere' },
      search: { name: 'Søg & Find', description: '4 søgegeneratorer — krydsord, skattejagt, find objekter & mere' },
    },
  },
  no: {
    heroTitle: '33 profesjonelle utskriftsgeneratorer',
    heroSubtitle: 'Lag profesjonelle utskrifter for din virksomhet. Ordsøk, matteoppgaver, fargelegging, puslespill & mer. Prøv alle 33 generatorer gratis med vannmerke.',
    tryFree: 'Prøv gratis',
    details: 'Detaljer',
    trustNoAccount: 'Ingen konto nødvendig',
    trustAllFree: 'Alle 33 generatorer gratis',
    trustCommercial: 'Kommersiell lisens tilgjengelig',
    ctaTitle: 'Begynn å lage utskrifter i dag',
    ctaSubtitle: 'Prøv alle 33 generatorer gratis med vannmerke. Ingen konto nødvendig. Se kvaliteten før du kjøper.',
    ctaButton: 'Prøv gratis med vannmerke',
    categories: {
      math: { name: 'Matematikk', description: '6 profesjonelle mattegeneratorer — addisjon, subtraksjon, puslespill & mer' },
      literacy: { name: 'Lesing & Språk', description: '7 ord- og språkgeneratorer — ordsøk, ordmiks, skriving & mer' },
      visual: { name: 'Visuell Læring', description: '7 visuelle generatorer — fargelegging, tegning, mønstre & mer' },
      matching: { name: 'Matching & Sortering', description: '5 matchinggeneratorer — bingo, rutematching, skyggematching & mer' },
      puzzle: { name: 'Puslespill & Logikk', description: '4 puslespillgeneratorer — sudoku, manglende brikker, odde ut & mer' },
      search: { name: 'Søk & Finn', description: '4 søkegeneratorer — kryssord, skattejakt, finn objekter & mer' },
    },
  },
  fi: {
    heroTitle: '33 ammattimaista tulostettavaa generaattoria',
    heroSubtitle: 'Luo ammattimaisia tulostettavia liiketoimintaasi varten. Sanaristikkoja, matematiikkatehtäviä, värityskuvia, palapelejä & lisää. Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla.',
    tryFree: 'Kokeile ilmaiseksi',
    details: 'Tiedot',
    trustNoAccount: 'Ei tiliä tarvita',
    trustAllFree: 'Kaikki 33 generaattoria ilmaiseksi',
    trustCommercial: 'Kaupallinen lisenssi saatavilla',
    ctaTitle: 'Aloita tulostettavien luominen tänään',
    ctaSubtitle: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei tiliä tarvita. Näe laatu ennen ostamista.',
    ctaButton: 'Kokeile ilmaiseksi vesileimalla',
    categories: {
      math: { name: 'Matematiikka', description: '6 ammattimaista matematiikkageneraattoria — yhteenlasku, vähennys, palapelit & lisää' },
      literacy: { name: 'Lukutaito & Kieli', description: '7 sana- ja kieligeneraattoria — sanaristikko, sanamix, kirjoittaminen & lisää' },
      visual: { name: 'Visuaalinen oppiminen', description: '7 visuaalista generaattoria — värityskuvat, piirtäminen, kuviot & lisää' },
      matching: { name: 'Yhdistäminen & Lajittelu', description: '5 yhdistämisgeneraattoria — bingo, ruudukkoyhdistäminen, varjoyhdistäminen & lisää' },
      puzzle: { name: 'Palapelit & Logiikka', description: '4 palapeligeneraattoria — sudoku, puuttuvat palat, pariton pois & lisää' },
      search: { name: 'Etsi & Löydä', description: '4 hakugeneraattoria — ristisanatehtävä, aarteenetsintä, löydä esineet & lisää' },
    },
  },
};

// ============================================================
// MAPPING: warriorplus app ID → product-page-slugs app ID
// (only entries where the IDs differ)
// ============================================================
const appIdToSlugId: Record<string, string> = {
  'addition': 'image-addition',
  'wordsearch': 'word-search',
  'cryptogram': 'image-cryptogram',
  'writing': 'writing-app',
  'big-small': 'big-small-app',
  'chart-count': 'chart-count-color',
  'matching': 'matching-app',
  'bingo': 'picture-bingo',
  'crossword': 'image-crossword',
};

// Category rendering order and colors
const categoryOrder: CategoryId[] = ['math', 'literacy', 'visual', 'matching', 'puzzle', 'search'];
const categoryColors: Record<string, string> = {
  math: '#3B82F6',
  literacy: '#10B981',
  visual: '#F59E0B',
  matching: '#8B5CF6',
  puzzle: '#EF4444',
  search: '#06B6D4',
};
const categoryIcons: Record<string, string> = {
  math: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  literacy: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  visual: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  matching: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  puzzle: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
};

// ============================================================
// METADATA GENERATION
// ============================================================
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const meta = appsMetadata[locale] || appsMetadata.en;

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/apps`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/apps`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/apps`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `${baseUrl}/${locale}/apps`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: 'LessonCraftStudio - 33 Printable Generators' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/opengraph-image.png`],
    },
  };
}

// ============================================================
// PAGE COMPONENT
// ============================================================
interface PageProps {
  params: { locale: string };
}

export default async function AppsPage({ params }: PageProps) {
  const locale = params.locale || 'en';
  const content = localeContent[locale] || localeContent.en;

  // Build schema data
  const collectionSchema = generateAppsCollectionSchema(locale);
  const appsForSchema = Object.entries(ALL_APPS).map(([appId, app]) => {
    const slugId = appIdToSlugId[appId] || appId;
    const slug = getSlugForLocale(slugId, locale as SupportedLocale) || slugId;
    return { id: appId, name: getLocalizedAppName(appId, locale), slug, description: `${app.category} printable generator` };
  });
  const itemListSchema = generateAppsItemListSchema(locale, appsForSchema);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #0f172a 100%)',
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
              top: '-15%',
              right: '-10%',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
              bottom: '-10%',
              left: '-5%',
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-3xl mx-auto">
            {content.heroSubtitle}
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{content.trustNoAccount}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{content.trustAllFree}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{content.trustCommercial}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {categoryOrder.map((catId, index) => {
        const cat = APP_CATEGORIES[catId];
        const catContent = content.categories[catId];
        const color = categoryColors[catId];
        const iconPath = categoryIcons[catId];
        const isAlt = index % 2 === 1;

        return (
          <section key={catId} className={`py-12 ${isAlt ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: color + '15' }}>
                  <svg className="w-6 h-6" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{catContent.name}</h2>
                <span className="text-sm font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '15', color }}>
                  {cat.apps.length}
                </span>
              </div>
              <p className="text-gray-500 mb-6 ml-14">{catContent.description}</p>

              {/* App grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.apps.map((appId: AppId) => {
                  const app = ALL_APPS[appId];
                  const slugId = appIdToSlugId[appId] || appId;
                  const detailSlug = getSlugForLocale(slugId, locale as SupportedLocale) || slugId;
                  return (
                    <AppCard
                      key={appId}
                      appName={getLocalizedAppName(appId, locale)}
                      htmlFile={app.htmlFile}
                      detailSlug={detailSlug}
                      locale={locale}
                      tryFreeLabel={content.tryFree}
                      detailsLabel={content.details}
                      accentColor={color}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #0f172a 100%)',
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.ctaTitle}
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            {content.ctaSubtitle}
          </p>
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(168,85,247,0.2)',
            }}

          >
            {content.ctaButton}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
