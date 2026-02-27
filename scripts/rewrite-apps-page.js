const fs = require('fs');

// ============================================================
// 1. Rewrite AppCard.tsx (simplified - no tiers, no auth)
// ============================================================
const appCard = `import Link from 'next/link';

interface AppCardProps {
  appName: string;
  htmlFile: string;
  detailSlug: string;
  locale: string;
  tryFreeLabel: string;
  detailsLabel: string;
  accentColor: string;
}

export default function AppCard({ appName, htmlFile, detailSlug, locale, tryFreeLabel, detailsLabel, accentColor }: AppCardProps) {
  const tryFreeUrl = \`/worksheet-generators/\${encodeURIComponent(htmlFile)}?tier=free&locale=\${locale}\`;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
        <h3 className="font-semibold text-gray-900">{appName}</h3>
      </div>
      <div className="flex gap-2">
        <a
          href={tryFreeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' }}
        >
          {tryFreeLabel}
          <svg className="w-4 h-4 ml-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <Link
          href={\`/\${locale}/apps/\${detailSlug}\`}
          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200"
        >
          {detailsLabel}
        </Link>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('frontend/components/apps/AppCard.tsx', appCard, 'utf8');
console.log('Wrote AppCard.tsx');

// ============================================================
// 2. Rewrite apps/page.tsx
// ============================================================
const page = `import { Metadata } from 'next';
import Link from 'next/link';
import AppCard from '@/components/apps/AppCard';
import { generateAppsCollectionSchema, generateAppsItemListSchema, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { ALL_APPS, APP_CATEGORIES, type AppId, type CategoryId } from '@/config/warriorplus-products';

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
    description: 'Alle 33 professionellen Druckvorlagen-Generatoren entdecken. Wortsuche, Mathe-Arbeitsbl\u00e4tter, Ausmalbilder, R\u00e4tsel & mehr. Gratis mit Wasserzeichen testen. Auf Etsy & Amazon KDP verkaufen.',
    keywords: 'Druckvorlagen-Generator, Etsy Druckvorlagen, KDP Arbeitsbl\u00e4tter, Druckvorlagen online verkaufen, Wortsuche-Generator, Arbeitsblatt-Ersteller, Ausmalbilder-Generator, Kreuzwortr\u00e4tsel-Generator, Printable-Business',
  },
  fr: {
    title: '33 G\u00e9n\u00e9rateurs d\\'Imprimables | Cr\u00e9ez & Vendez sur Etsy & KDP | LessonCraftStudio',
    description: 'D\u00e9couvrez 33 g\u00e9n\u00e9rateurs d\\'imprimables professionnels. Mots cach\u00e9s, fiches maths, coloriages, puzzles & plus. Essai gratuit avec filigrane. Vendez sur Etsy & Amazon KDP.',
    keywords: 'g\u00e9n\u00e9rateur imprimables, Etsy imprimables, KDP fiches, vendre imprimables en ligne, g\u00e9n\u00e9rateur mots cach\u00e9s, cr\u00e9ateur fiches maths, g\u00e9n\u00e9rateur coloriages, business imprimables',
  },
  es: {
    title: '33 Generadores de Imprimibles | Crea y Vende en Etsy y KDP | LessonCraftStudio',
    description: 'Explora 33 generadores de imprimibles profesionales. Sopa de letras, fichas de matem\u00e1ticas, colorear, puzzles y m\u00e1s. Prueba gratis con marca de agua. Vende en Etsy y Amazon KDP.',
    keywords: 'generador imprimibles, Etsy imprimibles, KDP fichas, vender imprimibles online, generador sopa letras, creador fichas matem\u00e1ticas, generador colorear, negocio imprimibles',
  },
  it: {
    title: '33 Generatori di Stampabili | Crea e Vendi su Etsy e KDP | LessonCraftStudio',
    description: 'Scopri 33 generatori di stampabili professionali. Cerca parole, schede matematica, disegni da colorare, puzzle e altro. Prova gratis con filigrana. Vendi su Etsy e Amazon KDP.',
    keywords: 'generatore stampabili, Etsy stampabili, KDP schede, vendere stampabili online, generatore cerca parole, creatore schede matematica, generatore disegni colorare, business stampabili',
  },
  pt: {
    title: '33 Geradores de Imprim\u00edveis | Crie e Venda no Etsy e KDP | LessonCraftStudio',
    description: 'Descubra 33 geradores de imprim\u00edveis profissionais. Ca\u00e7a-palavras, atividades de matem\u00e1tica, colorir, puzzles e mais. Teste gr\u00e1tis com marca d\\'agua. Venda no Etsy e Amazon KDP.',
    keywords: 'gerador imprim\u00edveis, Etsy imprim\u00edveis, KDP atividades, vender imprim\u00edveis online, gerador ca\u00e7a-palavras, criador atividades matem\u00e1tica, neg\u00f3cio imprim\u00edveis',
  },
  nl: {
    title: '33 Printbare Generatoren | Maak & Verkoop op Etsy & KDP | LessonCraftStudio',
    description: 'Ontdek 33 professionele printbare generatoren. Woordzoekers, rekenwerkbladen, kleurplaten, puzzels & meer. Gratis proberen met watermerk. Verkoop op Etsy & Amazon KDP.',
    keywords: 'printbare generator, Etsy printables, KDP werkbladen, printables online verkopen, woordzoeker generator, werkblad maker, kleurplaat generator, printable business',
  },
  sv: {
    title: '33 Utskriftsgeneratorer | Skapa & S\u00e4lj p\u00e5 Etsy & KDP | LessonCraftStudio',
    description: 'Utforska 33 professionella utskriftsgeneratorer. Ords\u00f6kningar, mattearbetsblad, m\u00e5larbilder, pussel & mer. Prova gratis med vattenst\u00e4mpel. S\u00e4lj p\u00e5 Etsy & Amazon KDP.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP arbetsblad, s\u00e4lja utskrifter online, ords\u00f6kningsgenerator, arbetsbladsskapare, utskriftsf\u00f6retag',
  },
  da: {
    title: '33 Printbare Generatorer | Opret & S\u00e6lg p\u00e5 Etsy & KDP | LessonCraftStudio',
    description: 'Udforsk 33 professionelle printbare generatorer. Ords\u00f8gninger, matematikopgaver, maleb\u00f8ger, puslespil & mere. Pr\u00f8v gratis med vandm\u00e6rke. S\u00e6lg p\u00e5 Etsy & Amazon KDP.',
    keywords: 'printbar generator, Etsy printables, KDP opgaver, s\u00e6lg printables online, ords\u00f8gningsgenerator, opgaveskaber, printable virksomhed',
  },
  no: {
    title: '33 Utskriftsgeneratorer | Lag & Selg p\u00e5 Etsy & KDP | LessonCraftStudio',
    description: 'Utforsk 33 profesjonelle utskriftsgeneratorer. Ords\u00f8k, matteoppgaver, fargelegging, puslespill & mer. Pr\u00f8v gratis med vannmerke. Selg p\u00e5 Etsy & Amazon KDP.',
    keywords: 'utskriftsgenerator, Etsy utskrifter, KDP oppgaver, selg utskrifter online, ords\u00f8kgenerator, oppgaveskaper, utskriftsvirksomhet',
  },
  fi: {
    title: '33 Tulostettavaa Generaattoria | Luo & Myy Etsyss\u00e4 & KDP:ss\u00e4 | LessonCraftStudio',
    description: 'Tutustu 33 ammattimaiseen tulostettavaan generaattoriin. Sanaristikkoja, matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia, palapelejä & lis\u00e4\u00e4. Kokeile ilmaiseksi vesileimalla. Myy Etsyss\u00e4 & Amazon KDP:ss\u00e4.',
    keywords: 'tulostettava generaattori, Etsy tulostettavat, KDP teht\u00e4v\u00e4t, myy tulostettavia verkossa, sanaristikkogeneraattori, tulostettavien liiketoiminta',
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
      math: { name: 'Math Mastery', description: '6 professional math generators \u2014 addition, subtraction, puzzles & more' },
      literacy: { name: 'Literacy & Language', description: '7 word and language generators \u2014 word search, scramble, writing & more' },
      visual: { name: 'Visual Learning', description: '7 visual generators \u2014 coloring pages, drawing, patterns & more' },
      matching: { name: 'Matching & Sorting', description: '5 matching generators \u2014 bingo, grid match, shadow match & more' },
      puzzle: { name: 'Puzzles & Logic', description: '4 puzzle generators \u2014 sudoku, missing pieces, odd one out & more' },
      search: { name: 'Search & Find', description: '4 search generators \u2014 crossword, treasure hunt, find objects & more' },
    },
  },
  de: {
    heroTitle: '33 professionelle Druckvorlagen-Generatoren',
    heroSubtitle: 'Erstellen Sie professionelle Druckvorlagen f\u00fcr Ihr Business. Wortsuche, Mathe-Arbeitsbl\u00e4tter, Ausmalbilder, R\u00e4tsel & mehr. Alle 33 Generatoren gratis mit Wasserzeichen testen.',
    tryFree: 'Gratis testen',
    details: 'Details',
    trustNoAccount: 'Kein Konto erforderlich',
    trustAllFree: 'Alle 33 Generatoren gratis',
    trustCommercial: 'Kommerzielle Lizenz verf\u00fcgbar',
    ctaTitle: 'Starten Sie noch heute mit Druckvorlagen',
    ctaSubtitle: 'Alle 33 Generatoren gratis mit Wasserzeichen testen. Kein Konto erforderlich. Qualit\u00e4t vor dem Kauf pr\u00fcfen.',
    ctaButton: 'Gratis mit Wasserzeichen testen',
    categories: {
      math: { name: 'Mathematik', description: '6 professionelle Mathe-Generatoren \u2014 Addition, Subtraktion, R\u00e4tsel & mehr' },
      literacy: { name: 'Lesen & Sprache', description: '7 Wort- und Sprach-Generatoren \u2014 Wortsuche, Buchstabensalat, Schreiben & mehr' },
      visual: { name: 'Visuelles Lernen', description: '7 visuelle Generatoren \u2014 Ausmalbilder, Zeichnen, Muster & mehr' },
      matching: { name: 'Zuordnung & Sortierung', description: '5 Zuordnungs-Generatoren \u2014 Bingo, Gitter-Match, Schatten-Match & mehr' },
      puzzle: { name: 'R\u00e4tsel & Logik', description: '4 R\u00e4tsel-Generatoren \u2014 Sudoku, fehlende Teile, Au\u00dfenseiter & mehr' },
      search: { name: 'Suchen & Finden', description: '4 Such-Generatoren \u2014 Kreuzwortr\u00e4tsel, Schatzsuche, Objekte finden & mehr' },
    },
  },
  fr: {
    heroTitle: '33 g\u00e9n\u00e9rateurs d\\'imprimables professionnels',
    heroSubtitle: 'Cr\u00e9ez des imprimables professionnels pour votre business. Mots cach\u00e9s, fiches maths, coloriages, puzzles & plus. Essayez les 33 g\u00e9n\u00e9rateurs gratuits avec filigrane.',
    tryFree: 'Essai gratuit',
    details: 'D\u00e9tails',
    trustNoAccount: 'Aucun compte requis',
    trustAllFree: '33 g\u00e9n\u00e9rateurs gratuits',
    trustCommercial: 'Licence commerciale disponible',
    ctaTitle: 'Commencez \u00e0 cr\u00e9er des imprimables',
    ctaSubtitle: 'Essayez les 33 g\u00e9n\u00e9rateurs gratuits avec filigrane. Aucun compte requis. Voyez la qualit\u00e9 avant d\\'acheter.',
    ctaButton: 'Essai gratuit avec filigrane',
    categories: {
      math: { name: 'Math\u00e9matiques', description: '6 g\u00e9n\u00e9rateurs de maths \u2014 addition, soustraction, puzzles & plus' },
      literacy: { name: 'Lecture & Langage', description: '7 g\u00e9n\u00e9rateurs de mots \u2014 mots cach\u00e9s, anagrammes, \u00e9criture & plus' },
      visual: { name: 'Apprentissage visuel', description: '7 g\u00e9n\u00e9rateurs visuels \u2014 coloriages, dessin, motifs & plus' },
      matching: { name: 'Association & Tri', description: '5 g\u00e9n\u00e9rateurs d\\'association \u2014 bingo, grille, ombres & plus' },
      puzzle: { name: 'Puzzles & Logique', description: '4 g\u00e9n\u00e9rateurs de puzzles \u2014 sudoku, pi\u00e8ces manquantes, intrus & plus' },
      search: { name: 'Chercher & Trouver', description: '4 g\u00e9n\u00e9rateurs de recherche \u2014 mots crois\u00e9s, chasse au tr\u00e9sor, objets cach\u00e9s & plus' },
    },
  },
  es: {
    heroTitle: '33 generadores de imprimibles profesionales',
    heroSubtitle: 'Crea imprimibles profesionales para tu negocio. Sopa de letras, fichas de matem\u00e1ticas, colorear, puzzles y m\u00e1s. Prueba los 33 generadores gratis con marca de agua.',
    tryFree: 'Probar gratis',
    details: 'Detalles',
    trustNoAccount: 'Sin cuenta requerida',
    trustAllFree: '33 generadores gratis',
    trustCommercial: 'Licencia comercial disponible',
    ctaTitle: 'Empieza a crear imprimibles hoy',
    ctaSubtitle: 'Prueba los 33 generadores gratis con marca de agua. Sin cuenta requerida. Comprueba la calidad antes de comprar.',
    ctaButton: 'Probar gratis con marca de agua',
    categories: {
      math: { name: 'Matem\u00e1ticas', description: '6 generadores de matem\u00e1ticas \u2014 suma, resta, puzzles y m\u00e1s' },
      literacy: { name: 'Lectura y Lenguaje', description: '7 generadores de palabras \u2014 sopa de letras, anagramas, escritura y m\u00e1s' },
      visual: { name: 'Aprendizaje Visual', description: '7 generadores visuales \u2014 colorear, dibujo, patrones y m\u00e1s' },
      matching: { name: 'Emparejamiento', description: '5 generadores de emparejamiento \u2014 bingo, cuadr\u00edcula, sombras y m\u00e1s' },
      puzzle: { name: 'Puzzles y L\u00f3gica', description: '4 generadores de puzzles \u2014 sudoku, piezas faltantes, intruso y m\u00e1s' },
      search: { name: 'Busca y Encuentra', description: '4 generadores de b\u00fasqueda \u2014 crucigrama, b\u00fasqueda del tesoro, objetos ocultos y m\u00e1s' },
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
    ctaSubtitle: 'Prova tutti i 33 generatori gratis con filigrana. Nessun account richiesto. Verifica la qualit\u00e0 prima di acquistare.',
    ctaButton: 'Prova gratis con filigrana',
    categories: {
      math: { name: 'Matematica', description: '6 generatori di matematica \u2014 addizione, sottrazione, puzzle e altro' },
      literacy: { name: 'Lettura e Linguaggio', description: '7 generatori di parole \u2014 cerca parole, anagrammi, scrittura e altro' },
      visual: { name: 'Apprendimento Visivo', description: '7 generatori visivi \u2014 disegni da colorare, disegno, motivi e altro' },
      matching: { name: 'Abbinamento', description: '5 generatori di abbinamento \u2014 bingo, griglia, ombre e altro' },
      puzzle: { name: 'Puzzle e Logica', description: '4 generatori di puzzle \u2014 sudoku, pezzi mancanti, intruso e altro' },
      search: { name: 'Cerca e Trova', description: '4 generatori di ricerca \u2014 cruciverba, caccia al tesoro, oggetti nascosti e altro' },
    },
  },
  pt: {
    heroTitle: '33 geradores de imprim\u00edveis profissionais',
    heroSubtitle: 'Crie imprim\u00edveis profissionais para seu neg\u00f3cio. Ca\u00e7a-palavras, atividades de matem\u00e1tica, colorir, puzzles e mais. Experimente os 33 geradores gr\u00e1tis com marca d\\'agua.',
    tryFree: 'Teste gr\u00e1tis',
    details: 'Detalhes',
    trustNoAccount: 'Sem conta necess\u00e1ria',
    trustAllFree: '33 geradores gr\u00e1tis',
    trustCommercial: 'Licen\u00e7a comercial dispon\u00edvel',
    ctaTitle: 'Comece a criar imprim\u00edveis hoje',
    ctaSubtitle: 'Experimente os 33 geradores gr\u00e1tis com marca d\\'agua. Sem conta necess\u00e1ria. Veja a qualidade antes de comprar.',
    ctaButton: 'Teste gr\u00e1tis com marca d\\'agua',
    categories: {
      math: { name: 'Matem\u00e1tica', description: '6 geradores de matem\u00e1tica \u2014 adi\u00e7\u00e3o, subtra\u00e7\u00e3o, puzzles e mais' },
      literacy: { name: 'Leitura e Linguagem', description: '7 geradores de palavras \u2014 ca\u00e7a-palavras, anagramas, escrita e mais' },
      visual: { name: 'Aprendizagem Visual', description: '7 geradores visuais \u2014 colorir, desenho, padr\u00f5es e mais' },
      matching: { name: 'Correspond\u00eancia', description: '5 geradores de correspond\u00eancia \u2014 bingo, grade, sombras e mais' },
      puzzle: { name: 'Puzzles e L\u00f3gica', description: '4 geradores de puzzles \u2014 sudoku, pe\u00e7as faltantes, intruso e mais' },
      search: { name: 'Procure e Encontre', description: '4 geradores de busca \u2014 palavras cruzadas, ca\u00e7a ao tesouro, objetos escondidos e mais' },
    },
  },
  nl: {
    heroTitle: '33 professionele printbare generatoren',
    heroSubtitle: 'Maak professionele printables voor je business. Woordzoekers, rekenwerkbladen, kleurplaten, puzzels & meer. Probeer alle 33 generatoren gratis met watermerk.',
    tryFree: 'Gratis proberen',
    details: 'Details',
    trustNoAccount: 'Geen account nodig',
    trustAllFree: 'Alle 33 generatoren gratis',
    trustCommercial: 'Commerci\u00eble licentie beschikbaar',
    ctaTitle: 'Begin vandaag met printables maken',
    ctaSubtitle: 'Probeer alle 33 generatoren gratis met watermerk. Geen account nodig. Bekijk de kwaliteit voor je koopt.',
    ctaButton: 'Gratis proberen met watermerk',
    categories: {
      math: { name: 'Wiskunde', description: '6 professionele wiskunde generatoren \u2014 optellen, aftrekken, puzzels & meer' },
      literacy: { name: 'Lezen & Taal', description: '7 woord- en taalgeneratoren \u2014 woordzoeker, woordmix, schrijven & meer' },
      visual: { name: 'Visueel Leren', description: '7 visuele generatoren \u2014 kleurplaten, tekenen, patronen & meer' },
      matching: { name: 'Matchen & Sorteren', description: '5 matching generatoren \u2014 bingo, rastermatching, schaduwmatching & meer' },
      puzzle: { name: 'Puzzels & Logica', description: '4 puzzelgeneratoren \u2014 sudoku, ontbrekende stukken, vreemde eend & meer' },
      search: { name: 'Zoeken & Vinden', description: '4 zoekgeneratoren \u2014 kruiswoordpuzzel, schattenjacht, objecten zoeken & meer' },
    },
  },
  sv: {
    heroTitle: '33 professionella utskriftsgeneratorer',
    heroSubtitle: 'Skapa professionella utskrifter f\u00f6r ditt f\u00f6retag. Ords\u00f6kningar, mattearbetsblad, m\u00e5larbilder, pussel & mer. Prova alla 33 generatorer gratis med vattenst\u00e4mpel.',
    tryFree: 'Prova gratis',
    details: 'Detaljer',
    trustNoAccount: 'Inget konto kr\u00e4vs',
    trustAllFree: 'Alla 33 generatorer gratis',
    trustCommercial: 'Kommersiell licens tillg\u00e4nglig',
    ctaTitle: 'B\u00f6rja skapa utskrifter idag',
    ctaSubtitle: 'Prova alla 33 generatorer gratis med vattenst\u00e4mpel. Inget konto kr\u00e4vs. Se kvaliteten innan du k\u00f6per.',
    ctaButton: 'Prova gratis med vattenst\u00e4mpel',
    categories: {
      math: { name: 'Matematik', description: '6 professionella mattegeneratorer \u2014 addition, subtraktion, pussel & mer' },
      literacy: { name: 'L\u00e4sning & Spr\u00e5k', description: '7 ord- och spr\u00e5kgeneratorer \u2014 ords\u00f6kning, ordmix, skrivning & mer' },
      visual: { name: 'Visuellt L\u00e4rande', description: '7 visuella generatorer \u2014 m\u00e5larbilder, ritning, m\u00f6nster & mer' },
      matching: { name: 'Matchning & Sortering', description: '5 matchningsgeneratorer \u2014 bingo, rutmatching, skuggmatching & mer' },
      puzzle: { name: 'Pussel & Logik', description: '4 pusselgeneratorer \u2014 sudoku, saknade bitar, udda ut & mer' },
      search: { name: 'S\u00f6k & Hitta', description: '4 s\u00f6kgeneratorer \u2014 korsord, skattjakt, hitta objekt & mer' },
    },
  },
  da: {
    heroTitle: '33 professionelle printbare generatorer',
    heroSubtitle: 'Opret professionelle printables til din virksomhed. Ords\u00f8gninger, matematikopgaver, maleb\u00f8ger, puslespil & mere. Pr\u00f8v alle 33 generatorer gratis med vandm\u00e6rke.',
    tryFree: 'Pr\u00f8v gratis',
    details: 'Detaljer',
    trustNoAccount: 'Ingen konto p\u00e5kr\u00e6vet',
    trustAllFree: 'Alle 33 generatorer gratis',
    trustCommercial: 'Kommerciel licens tilg\u00e6ngelig',
    ctaTitle: 'Begynd at lave printables i dag',
    ctaSubtitle: 'Pr\u00f8v alle 33 generatorer gratis med vandm\u00e6rke. Ingen konto p\u00e5kr\u00e6vet. Se kvaliteten f\u00f8r du k\u00f8ber.',
    ctaButton: 'Pr\u00f8v gratis med vandm\u00e6rke',
    categories: {
      math: { name: 'Matematik', description: '6 professionelle matematikgeneratorer \u2014 addition, subtraktion, puslespil & mere' },
      literacy: { name: 'L\u00e6sning & Sprog', description: '7 ord- og sproggeneratorer \u2014 ords\u00f8gning, ordmix, skrivning & mere' },
      visual: { name: 'Visuel L\u00e6ring', description: '7 visuelle generatorer \u2014 maleb\u00f8ger, tegning, m\u00f8nstre & mere' },
      matching: { name: 'Matching & Sortering', description: '5 matchinggeneratorer \u2014 bingo, gittermatching, skyggematch & mere' },
      puzzle: { name: 'Puslespil & Logik', description: '4 puslespilgeneratorer \u2014 sudoku, manglende brikker, m\u00e6rkelig en ud & mere' },
      search: { name: 'S\u00f8g & Find', description: '4 s\u00f8gegeneratorer \u2014 krydsord, skattejagt, find objekter & mere' },
    },
  },
  no: {
    heroTitle: '33 profesjonelle utskriftsgeneratorer',
    heroSubtitle: 'Lag profesjonelle utskrifter for din virksomhet. Ords\u00f8k, matteoppgaver, fargelegging, puslespill & mer. Pr\u00f8v alle 33 generatorer gratis med vannmerke.',
    tryFree: 'Pr\u00f8v gratis',
    details: 'Detaljer',
    trustNoAccount: 'Ingen konto n\u00f8dvendig',
    trustAllFree: 'Alle 33 generatorer gratis',
    trustCommercial: 'Kommersiell lisens tilgjengelig',
    ctaTitle: 'Begynn \u00e5 lage utskrifter i dag',
    ctaSubtitle: 'Pr\u00f8v alle 33 generatorer gratis med vannmerke. Ingen konto n\u00f8dvendig. Se kvaliteten f\u00f8r du kj\u00f8per.',
    ctaButton: 'Pr\u00f8v gratis med vannmerke',
    categories: {
      math: { name: 'Matematikk', description: '6 profesjonelle mattegeneratorer \u2014 addisjon, subtraksjon, puslespill & mer' },
      literacy: { name: 'Lesing & Spr\u00e5k', description: '7 ord- og spr\u00e5kgeneratorer \u2014 ords\u00f8k, ordmiks, skriving & mer' },
      visual: { name: 'Visuell L\u00e6ring', description: '7 visuelle generatorer \u2014 fargelegging, tegning, m\u00f8nstre & mer' },
      matching: { name: 'Matching & Sortering', description: '5 matchinggeneratorer \u2014 bingo, rutematching, skyggematching & mer' },
      puzzle: { name: 'Puslespill & Logikk', description: '4 puslespillgeneratorer \u2014 sudoku, manglende brikker, odde ut & mer' },
      search: { name: 'S\u00f8k & Finn', description: '4 s\u00f8kegeneratorer \u2014 kryssord, skattejakt, finn objekter & mer' },
    },
  },
  fi: {
    heroTitle: '33 ammattimaista tulostettavaa generaattoria',
    heroSubtitle: 'Luo ammattimaisia tulostettavia liiketoimintaasi varten. Sanaristikkoja, matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia, palapelejä & lis\u00e4\u00e4. Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla.',
    tryFree: 'Kokeile ilmaiseksi',
    details: 'Tiedot',
    trustNoAccount: 'Ei tili\u00e4 tarvita',
    trustAllFree: 'Kaikki 33 generaattoria ilmaiseksi',
    trustCommercial: 'Kaupallinen lisenssi saatavilla',
    ctaTitle: 'Aloita tulostettavien luominen t\u00e4n\u00e4\u00e4n',
    ctaSubtitle: 'Kokeile kaikkia 33 generaattoria ilmaiseksi vesileimalla. Ei tili\u00e4 tarvita. N\u00e4e laatu ennen ostamista.',
    ctaButton: 'Kokeile ilmaiseksi vesileimalla',
    categories: {
      math: { name: 'Matematiikka', description: '6 ammattimaista matematiikkageneraattoria \u2014 yhteenlasku, v\u00e4hennys, palapelit & lis\u00e4\u00e4' },
      literacy: { name: 'Lukutaito & Kieli', description: '7 sana- ja kieligeneraattoria \u2014 sanaristikko, sanamix, kirjoittaminen & lis\u00e4\u00e4' },
      visual: { name: 'Visuaalinen oppiminen', description: '7 visuaalista generaattoria \u2014 v\u00e4rityskuvat, piirt\u00e4minen, kuviot & lis\u00e4\u00e4' },
      matching: { name: 'Yhdist\u00e4minen & Lajittelu', description: '5 yhdist\u00e4misgeneraattoria \u2014 bingo, ruudukkoyhdist\u00e4minen, varjoyhdist\u00e4minen & lis\u00e4\u00e4' },
      puzzle: { name: 'Palapelit & Logiikka', description: '4 palapeligeneraattoria \u2014 sudoku, puuttuvat palat, pariton pois & lis\u00e4\u00e4' },
      search: { name: 'Etsi & L\u00f6yd\u00e4', description: '4 hakugeneraattoria \u2014 ristisanateht\u00e4v\u00e4, aarteenetsint\u00e4, l\u00f6yd\u00e4 esineet & lis\u00e4\u00e4' },
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
    hreflangAlternates[hreflangCode] = \`\${baseUrl}/\${lang}/apps\`;
  }
  hreflangAlternates['x-default'] = \`\${baseUrl}/en/apps\`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: \`\${baseUrl}/\${locale}/apps\`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: \`\${baseUrl}/\${locale}/apps\`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [{ url: \`\${baseUrl}/opengraph-image.png\`, width: 1200, height: 630, alt: 'LessonCraftStudio - 33 Printable Generators' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [\`\${baseUrl}/opengraph-image.png\`],
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
    return { id: appId, name: app.name, slug, description: \`\${app.category} printable generator\` };
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
          <section key={catId} className={\`py-12 \${isAlt ? 'bg-white' : 'bg-gray-50'}\`}>
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
                      appName={app.name}
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
            href={\`/\${locale}/apps\`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(168,85,247,0.2)',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
`;

fs.writeFileSync('frontend/app/[locale]/apps/page.tsx', page, 'utf8');
console.log('Wrote apps/page.tsx');
console.log('Done! Both files rewritten.');
