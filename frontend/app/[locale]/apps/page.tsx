import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getTranslations } from 'next-intl/server';
import AppCard from '@/components/apps/AppCard';
import { generateAppsCollectionSchema, generateAppsItemListSchema, generateFAQSchema, getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { productPageSlugs } from '@/config/product-page-slugs';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { GRADE_IDS, getGradeSlug, gradeDisplayNames, gradeAgeRanges } from '@/config/grade-slugs';
import { getRecentBlogPosts } from '@/lib/blog-data';

// Localized SEO metadata for all 11 languages
// Keywords focus on PLATFORM-LEVEL terms to avoid cannibalization with individual product pages
const appsMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  en: {
    title: '33 Free Worksheet Generators for Teachers — Printable PDFs | LessonCraftStudio',
    description: 'Browse all 33 free worksheet generators. Create word searches, crosswords, math worksheets, coloring pages and more. Download printable PDFs instantly.',
    keywords: 'free worksheet generators for teachers, printable worksheet maker online, educational worksheet creator tools, math worksheet generator free, word search generator for kids, crossword puzzle maker classroom, coloring page generator printable, PDF worksheet tools for education, worksheet generator preschool to 3rd grade, create worksheets online free, teacher worksheet tools no login, printable activity generators for school'
  },
  de: {
    title: '33 Kostenlose Arbeitsblatt-Generatoren | Mathe, Sprache, R\u00e4tsel | LessonCraftStudio',
    description: 'Alle 33 Arbeitsblatt-Generatoren entdecken. Wortsuche, Kreuzwortr\u00e4tsel, Mathe-Arbeitsbl\u00e4tter, Ausmalbilder & mehr erstellen. Druckbare PDFs sofort herunterladen.',
    keywords: 'Arbeitsblatt-Generator-Plattform, Lehrmittel-Software, Unterrichtsmaterial-Ersteller, 33 Generatoren, Klassenzimmer-Tools, pädagogische App-Suite, Lehrer-Ressourcen-Plattform, Bildungstechnologie, Arbeitsblatt-Erstellung, digitale Lernwerkzeuge'
  },
  fr: {
    title: '33 G\u00e9n\u00e9rateurs de Fiches Gratuits | Maths, Fran\u00e7ais, Puzzles | LessonCraftStudio',
    description: 'D\u00e9couvrez 33 g\u00e9n\u00e9rateurs de fiches gratuits. Cr\u00e9ez mots cach\u00e9s, mots crois\u00e9s, fiches maths, coloriages & plus. T\u00e9l\u00e9chargez des PDF imprimables instantan\u00e9ment.',
    keywords: 'plateforme générateur de fiches, suite éducative, outils pédagogiques enseignants, 33 générateurs, créateur ressources classe, logiciel création fiches, technologie éducative, plateforme enseignants, outils numériques école, application éducative'
  },
  es: {
    title: '33 Generadores de Fichas Gratis | Matem\u00e1ticas, Lenguaje, Puzzles | LessonCraftStudio',
    description: 'Explore 33 generadores de fichas gratis. Cree sopa de letras, crucigramas, fichas de matem\u00e1ticas, colorear & m\u00e1s. Descargue PDF imprimibles al instante.',
    keywords: 'plataforma generador fichas, suite educativa, herramientas docentes, 33 generadores, creador recursos aula, software educativo, tecnología educativa, plataforma profesores, herramientas digitales escuela, aplicación pedagógica'
  },
  pt: {
    title: '33 Geradores de Atividades Gr\u00e1tis | Matem\u00e1tica, Portugu\u00eas, Puzzles | LessonCraftStudio',
    description: 'Descubra 33 geradores de atividades gr\u00e1tis. Crie ca\u00e7a-palavras, palavras cruzadas, atividades de matem\u00e1tica, colorir & mais. Baixe PDFs imprim\u00edveis na hora.',
    keywords: 'plataforma gerador atividades, suite educacional, ferramentas professores, 33 geradores, criador recursos sala aula, software educacional, tecnologia educacional, plataforma docentes, ferramentas digitais escola, aplicativo pedagógico'
  },
  it: {
    title: '33 Generatori di Schede Gratis | Matematica, Italiano, Puzzle | LessonCraftStudio',
    description: 'Scopri 33 generatori di schede gratis. Crea cerca parole, cruciverba, schede di matematica, disegni da colorare & altro. Scarica PDF stampabili subito.',
    keywords: 'piattaforma generatore schede, suite educativa, strumenti didattici insegnanti, 33 generatori, creatore risorse classe, software educativo, tecnologia didattica, piattaforma docenti, strumenti digitali scuola, applicazione pedagogica'
  },
  nl: {
    title: '33 Werkblad Generatoren — Gratis PDF | LessonCraftStudio',
    description: 'Ontdek 33 gratis werkblad generatoren. Maak woordzoekers, kruiswoordpuzzels, rekenwerkbladen, kleurplaten & meer. Download printbare PDFs direct. Gratis.',
    keywords: 'werkblad generator platform, educatieve software suite, leerkracht hulpmiddelen, 33 generatoren, lesmaterialen creator, onderwijstechnologie, leerkrachten platform, digitale leermiddelen, educatieve applicatie, klaslokaal tools'
  },
  sv: {
    title: '33 Arbetsblad Generatorer \u2014 Gratis PDF | LessonCraftStudio',
    description: 'Utforska 33 gratis arbetsblad generatorer. Skapa ordjaktar, korsord, mattearbetsblad, m\u00e5larbilder & mer. Ladda ner utskrivbara PDFer direkt. Ingen registrering.',
    keywords: 'arbetsblad generator plattform, pedagogisk mjukvara, lärarverktyg, 33 generatorer, lärresurser skapare, utbildningsteknik, lärarplattform, digitala läromedel, pedagogisk applikation, klassrumsverktyg'
  },
  da: {
    title: 'Alle 33 Opgavegeneratorer til B\u00f8rn | LessonCraftStudio',
    description: 'Udforsk 33 gratis arbejdsark generatorer. Lav ords\u00f8gning, krydsord, matematikopgaver, malebog & mere. Hent printbare PDFer med det samme. Ingen tilmelding.',
    keywords: 'arbejdsark generator platform, pædagogisk software, lærerværktøjer, 33 generatorer, undervisningsressourcer skaber, uddannelsesteknologi, lærerplatform, digitale læringsmaterialer, pædagogisk applikation, klasseværelses værktøjer'
  },
  no: {
    title: '33 Arbeidsark Generatorer \u2014 Gratis PDF | LessonCraftStudio',
    description: 'Utforsk 33 gratis arbeidsark generatorer. Lag ords\u00f8k, kryssord, matteoppgaver, fargelegging & mer. Last ned utskrivbare PDFer direkte. Ingen registrering.',
    keywords: 'arbeidsark generator plattform, pedagogisk programvare, lærerverktøy, 33 generatorer, undervisningsressurser skaper, utdanningsteknologi, lærerplattform, digitale læringsmaterialer, pedagogisk applikasjon, klasseromverktøy'
  },
  fi: {
    title: '33 Ilmaista Teht\u00e4v\u00e4generaattoria | LessonCraftStudio',
    description: 'Tutustu 33 ilmaiseen teht\u00e4v\u00e4generaattoriin. Luo sanaristikkoja, ristisanateht\u00e4vi\u00e4, matematiikkateht\u00e4vi\u00e4, v\u00e4rityskuvia ja lis\u00e4\u00e4. Lataa tulostettavat PDFt heti.',
    keywords: 'tehtäväarkki generaattori alusta, opetusohjelma suite, opettajan työkalut, 33 generaattoria, opetusresurssien luoja, opetusteknologia, opettajien alusta, digitaaliset oppimateriaalit, pedagoginen sovellus, luokkahuonetyökalut'
  }
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';

  // Get localized metadata
  const meta = appsMetadata[locale] || appsMetadata.en;

  // Generate hreflang alternates with proper regional codes (pt-BR, es-MX)
  const locales = SUPPORTED_LOCALES;
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
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
      languages: hreflangAlternates
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `${baseUrl}/${locale}/apps`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [{
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'LessonCraftStudio - 33 Worksheet Generators'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/opengraph-image.png`]
    }
  };
}

interface PageProps {
  params: {
    locale: string;
  };
}

type AppTier = 'free' | 'core' | 'full';

interface App {
  id: string;
  name: string;
  tier: AppTier;
  category: string;
  icon: string;
  popular?: boolean;
}

// Hardcoded app data for now (will be replaced with Strapi data)
const apps: App[] = [
  // Free Tier (1 app)
  { id: 'word-search', name: 'Word Search', tier: 'free', category: 'Word Games', icon: '🔍', popular: true },
  
  // Core Bundle (10 apps)
  { id: 'image-addition', name: 'Image Addition', tier: 'core', category: 'Math', icon: '➕', popular: true },
  { id: 'alphabet-train', name: 'Alphabet Train', tier: 'core', category: 'Language Arts', icon: '🚂', popular: true },
  { id: 'coloring', name: 'Coloring Pages', tier: 'core', category: 'Art & Creativity', icon: '🎨', popular: true },
  { id: 'math-worksheet', name: 'Math Worksheets', tier: 'core', category: 'Math', icon: '📐', popular: true },
  { id: 'word-scramble', name: 'Word Scramble', tier: 'core', category: 'Language Arts', icon: '🔤', popular: true },
  { id: 'find-and-count', name: 'Find and Count', tier: 'core', category: 'Visual Perception', icon: '🔢', popular: true },
  { id: 'matching-app', name: 'MatchUp Maker', tier: 'core', category: 'Matching', icon: '🎯', popular: true },
  { id: 'drawing-lines', name: 'Drawing Lines', tier: 'core', category: 'Fine Motor Skills', icon: '✏️', popular: true },
  { id: 'picture-bingo', name: 'Picture Bingo', tier: 'core', category: 'Games', icon: '🎲', popular: true },
  { id: 'sudoku', name: 'Sudoku for Kids', tier: 'core', category: 'Logic', icon: '🧩', popular: true },
  
  // Full Access (Additional 23 apps)
  { id: 'big-small-app', name: 'Big or Small', tier: 'full', category: 'Concepts', icon: '📏' },
  { id: 'chart-count-color', name: 'Chart Count & Color', tier: 'full', category: 'Math', icon: '📊' },
  { id: 'code-addition', name: 'Code Addition', tier: 'full', category: 'Math', icon: '🔐' },
  { id: 'draw-and-color', name: 'Draw and Color', tier: 'full', category: 'Art & Creativity', icon: '🖍️' },
  { id: 'find-objects', name: 'Find Objects', tier: 'full', category: 'Visual Perception', icon: '👀' },
  { id: 'grid-match', name: 'Grid Match', tier: 'full', category: 'Matching', icon: '⚡' },
  { id: 'image-crossword', name: 'Image Crossword', tier: 'full', category: 'Word Games', icon: '❌' },
  { id: 'image-cryptogram', name: 'Image Cryptogram', tier: 'full', category: 'Logic', icon: '🔒' },
  { id: 'math-puzzle', name: 'Math Puzzle', tier: 'full', category: 'Math', icon: '🧮' },
  { id: 'missing-pieces', name: 'Missing Pieces', tier: 'full', category: 'Visual Perception', icon: '🧩' },
  { id: 'more-less', name: 'More or Less', tier: 'full', category: 'Math', icon: '⚖️' },
  { id: 'odd-one-out', name: 'Odd One Out', tier: 'full', category: 'Logic', icon: '🎭' },
  { id: 'pattern-train', name: 'Pattern Train', tier: 'full', category: 'Patterns', icon: '🚂' },
  { id: 'pattern-worksheet', name: 'Pattern Worksheets', tier: 'full', category: 'Patterns', icon: '🔄' },
  { id: 'picture-path', name: 'Picture Pathway', tier: 'full', category: 'Logic', icon: '🛤️' },
  { id: 'picture-sort', name: 'Picture Sort', tier: 'full', category: 'Sorting', icon: '📦' },
  { id: 'prepositions', name: 'Prepositions', tier: 'full', category: 'Language Arts', icon: '📍' },
  { id: 'shadow-match', name: 'Shadow Match', tier: 'full', category: 'Matching', icon: '👤' },
  { id: 'subtraction', name: 'Subtraction', tier: 'full', category: 'Math', icon: '➖' },
  { id: 'treasure-hunt', name: 'Treasure Hunt', tier: 'full', category: 'Games', icon: '💎' },
  { id: 'word-guess', name: 'Word Guess', tier: 'full', category: 'Word Games', icon: '❓' },
  { id: 'writing-app', name: 'English Writing Practice', tier: 'full', category: 'Language Arts', icon: '✍️' }
];

// Get unique categories
const categories = Array.from(new Set(apps.map(app => app.category)));

// Helper function to get translated app name
const getAppName = (appId: string, defaultName: string, locale: string, translations: any) => {
  if (locale === 'fi' && translations?.appNames) {
    const finnishNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return finnishNames[appId] || defaultName;
  } else if (locale === 'no' && translations?.appNames) {
    const norwegianNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return norwegianNames[appId] || defaultName;
  } else if (locale === 'da' && translations?.appNames) {
    const danishNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return danishNames[appId] || defaultName;
  } else if (locale === 'sv' && translations?.appNames) {
    const swedishNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return swedishNames[appId] || defaultName;
  } else if (locale === 'nl' && translations?.appNames) {
    const dutchNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return dutchNames[appId] || defaultName;
  } else if (locale === 'pt' && translations?.appNames) {
    const portugueseNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return portugueseNames[appId] || defaultName;
  } else if (locale === 'it' && translations?.appNames) {
    const italianNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return italianNames[appId] || defaultName;
  } else if (locale === 'fr' && translations?.appNames) {
    const frenchNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return frenchNames[appId] || defaultName;
  } else if (locale === 'de' && translations?.appNames) {
    const germanNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return germanNames[appId] || defaultName;
  } else if (locale === 'es' && translations?.appNames) {
    const spanishNames: Record<string, string> = {
      'word-search': translations.appNames.wordSearch || defaultName,
      'image-addition': translations.appNames.imageAddition || defaultName,
      'alphabet-train': translations.appNames.alphabetTrain || defaultName,
      'coloring': translations.appNames.coloringPages || defaultName,
      'math-worksheet': translations.appNames.mathWorksheets || defaultName,
      'word-scramble': translations.appNames.wordScramble || defaultName,
      'find-and-count': translations.appNames.findAndCount || defaultName,
      'matching-app': translations.appNames.matchUpMaker || defaultName,
      'drawing-lines': translations.appNames.drawingLines || defaultName,
      'picture-bingo': translations.appNames.pictureBingo || defaultName,
      'sudoku': translations.appNames.sudokuForKids || defaultName,
      'big-small-app': translations.appNames.bigOrSmall || defaultName,
      'chart-count-color': translations.appNames.chartCountColor || defaultName,
      'code-addition': translations.appNames.codeAddition || defaultName,
      'draw-and-color': translations.appNames.drawAndColor || defaultName,
      'find-objects': translations.appNames.findObjects || defaultName,
      'grid-match': translations.appNames.gridMatch || defaultName,
      'image-crossword': translations.appNames.imageCrossword || defaultName,
      'image-cryptogram': translations.appNames.imageCryptogram || defaultName,
      'math-puzzle': translations.appNames.mathPuzzle || defaultName,
      'missing-pieces': translations.appNames.missingPieces || defaultName,
      'more-less': translations.appNames.moreOrLess || defaultName,
      'odd-one-out': translations.appNames.oddOneOut || defaultName,
      'pattern-train': translations.appNames.patternTrain || defaultName,
      'pattern-worksheet': translations.appNames.patternWorksheets || defaultName,
      'picture-path': translations.appNames.picturePathway || defaultName,
      'picture-sort': translations.appNames.pictureSort || defaultName,
      'prepositions': translations.appNames.prepositions || defaultName,
      'shadow-match': translations.appNames.shadowMatch || defaultName,
      'subtraction': translations.appNames.subtraction || defaultName,
      'treasure-hunt': translations.appNames.treasureHunt || defaultName,
      'word-guess': translations.appNames.wordGuess || defaultName,
      'writing-app': translations.appNames.englishWritingPractice || defaultName
    };
    return spanishNames[appId] || defaultName;
  }
  return defaultName;
};

// Helper function to get translated category
const getCategory = (category: string, locale: string, translations: any) => {
  if (locale === 'fi' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'no' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'da' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'sv' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'nl' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'pt' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'it' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'fr' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'de' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  } else if (locale === 'es' && translations?.categories) {
    const categoryMap: Record<string, string> = {
      'Word Games': translations.categories.wordGames || category,
      'Math': translations.categories.math || category,
      'Language Arts': translations.categories.languageArts || category,
      'Art & Creativity': translations.categories.artCreativity || category,
      'Visual Perception': translations.categories.visual || category,
      'Matching': translations.categories.matching || category,
      'Fine Motor Skills': translations.categories.fineMotorSkills || category,
      'Games': translations.categories.games || category,
      'Logic': translations.categories.logic || category,
      'Concepts': translations.categories.concepts || category,
      'Patterns': translations.categories.patterns || category,
      'Sorting': translations.categories.sorting || category
    };
    return categoryMap[category] || category;
  }
  return category;
};

// Pillar content (EN only, ~700 words)

const appsPillarContent = {
  heading: 'The Complete Guide to Free Worksheet Generators',
  sections: [
    {
      title: 'Why Use Worksheet Generators Instead of Static PDFs?',
      content: 'Traditional worksheet packs contain a fixed number of pages. Once a student finishes them, nothing remains to print. Worksheet generators solve this by creating a brand-new page every time you click print. The content is randomized so no two sheets are ever identical, giving students unlimited practice without repetition. This is essential for building fluency in math facts, spelling patterns, and letter formation. Teachers no longer need to spend evenings searching for fresh material because a single generator replaces an entire filing cabinet of photocopies. Parents appreciate the convenience as well because there is always another worksheet ready the moment a child asks for one. The result is less prep time for adults and more productive practice time for kids. Every page is formatted for clean printing, with large fonts, generous spacing, and clear instructions that let children work independently.',
    },
    {
      title: 'How Our 33 Generators Work',
      content: 'Every generator on LessonCraftStudio follows a simple three-step process: choose your theme, adjust the settings, and hit print. Behind the scenes the generator builds a unique layout with randomized content including new math problems, different word lists, and fresh image placements, then renders it as a clean, print-ready PDF. The entire cycle takes seconds and requires no account, no download, and no special software. Worksheets are formatted for standard letter-size paper, print cleanly in black and white to save ink, and include clear instructions so students can work independently. Each generator supports 50 engaging themes and all eleven site languages, making it easy to match content to your curriculum or individual student interests.',
    },
    {
      title: 'Eight Categories of Learning Tools',
      content: 'Our generators span eight skill categories designed to cover the full early-childhood curriculum. Math generators handle addition, subtraction, number comparison, and counting with images. Literacy generators cover alphabet tracing, letter recognition, and writing practice. Word game generators produce word searches, crosswords, and scramble puzzles that build vocabulary and spelling skills. Art generators create themed coloring pages and drawing prompts. Logic generators challenge young minds with Sudoku and code-breaking puzzles. Visual perception tools train pattern spotting, shadow matching, and spatial reasoning. Matching activities develop memory and association skills. Pattern recognition worksheets strengthen the ability to identify and continue sequences. Together these eight categories give teachers a complete toolkit for differentiated instruction.',
    },
    {
      title: 'Built for Every Learner — Preschool Through Third Grade',
      content: 'Our worksheets serve five grade levels covering ages three to nine. Preschool activities focus on tracing, color recognition, and basic counting. Kindergarten sheets introduce letter formation, simple addition, and pattern work. First-grade worksheets advance to subtraction, sight words, and reading comprehension. Second-grade content covers two-digit operations, expanded vocabulary, and creative writing. Third graders tackle multiplication, cursive practice, and multi-step puzzles. Difficulty scales automatically within each generator so one tool serves an entire mixed-age classroom. This makes our platform especially valuable for special education teachers who need materials at varied readiness levels and for homeschooling families managing multiple children at once.',
    },
    {
      title: 'Designed for the Classroom and Beyond',
      content: 'Teachers use our generators to create differentiated station work, early-finisher packets, homework sheets, and assessment warm-ups in seconds. Because every print is unique, the same generator serves an entire class without students comparing identical answers. Substitute teachers find the tools invaluable for producing quality activities on short notice. Homeschooling families build weekly unit studies around a single theme, and parents supplement school assignments with extra practice tailored to individual interests. Occupational therapists use tracing and maze worksheets for fine-motor exercises. Speech-language pathologists find value in letter and word activities for articulation practice. Tutors, after-school programs, and summer camps all benefit from the quick turnaround and consistent quality.',
    },
    {
      title: 'Getting Started in Three Steps',
      content: 'Using LessonCraftStudio could not be simpler. First, browse the app collection on this page or filter by category to find the generator you need. Second, open the generator, pick a theme from 50 options, and adjust settings like difficulty or number of items. Third, click print and a fresh PDF appears in seconds, ready to hand out, assign as homework, or add to a learning station. No account is required, no credit card is needed, and there are no watermarks on any worksheet. Every generator is completely free with no hidden paywalls. The site works on any device with a browser and a printer, and it is available in eleven languages to support multilingual classrooms around the world.',
    },
  ],
};

// FAQ items (EN only, 6 questions)

const appsFaqItems: Array<{question: string; answer: string}> = [
  {
    question: 'How do the worksheet generators work?',
    answer: 'Each generator creates a unique worksheet every time you click print. You choose a theme from 50 options, adjust settings like difficulty level and number of items, and the generator builds a randomized PDF in seconds. No two worksheets are ever the same, so students always get fresh practice material.',
  },
  {
    question: 'Are all 33 generators really free?',
    answer: 'The Word Search generator is completely free with no restrictions. The remaining 32 generators are available through our Core Bundle at $15 per month or Full Access at $25 per month, both with a free trial. Subscribers can print unlimited worksheets with no watermarks and full commercial-use rights for classroom distribution.',
  },
  {
    question: 'Can I customize the worksheets?',
    answer: 'Yes. Every generator lets you choose from 50 themes, select a grade level from preschool through third grade, and adjust difficulty settings. Some generators offer additional options like the number of problems, grid size, or word count. The customization ensures that worksheets match your curriculum and student skill levels.',
  },
  {
    question: 'What file format are the worksheets?',
    answer: 'All worksheets are generated as print-ready PDFs formatted for standard letter-size paper. They print cleanly in black and white to save ink and include large fonts with generous spacing so young learners can work independently. Simply click print in your browser and the PDF is ready.',
  },
  {
    question: 'Do the generators work on mobile devices?',
    answer: 'Yes. All 33 generators are fully responsive and work on phones, tablets, laptops, and desktop computers. You can preview and print worksheets from any device with a modern browser. Many teachers use a phone to generate a worksheet and print it directly to a classroom printer via wireless printing.',
  },
  {
    question: 'How are these different from static worksheet download sites?',
    answer: 'Static sites offer a fixed library of pre-made PDFs that eventually run out. Our generators create unlimited unique worksheets on demand with randomized content. Students never repeat the same page twice, and teachers never need to search for new material. You also get 50 themes and five grade levels in a single tool, replacing dozens of separate worksheet packs.',
  },
];

export default async function AppsPage({ params: { locale } }: PageProps) {
  // Load translations
  let translations: any = {};
  try {
    const messages = await import(`@/messages/${locale}.json`);
    translations = messages.default?.apps || {};
  } catch (error) {
    // Fallback to English if translation file doesn't exist
    console.error(`Failed to load translations for locale: ${locale}`);
  }

  // Fetch recent blog posts for internal linking
  const recentBlogPosts = await getRecentBlogPosts(locale, 3);

  // Generate JSON-LD schema for SEO
  const collectionSchema = generateAppsCollectionSchema(locale);

  // Generate ItemList schema with all apps for better SERP display
  const appsForSchema = apps.map(app => {
    const appConfig = productPageSlugs.find(p => p.appId === app.id);
    const slug = appConfig?.slugs[locale as keyof typeof appConfig.slugs] || appConfig?.slugs.en || app.id;
    return {
      id: app.id,
      name: getAppName(app.id, app.name, locale, translations),
      slug,
      description: `${app.category} worksheet generator`
    };
  });
  const itemListSchema = generateAppsItemListSchema(locale, appsForSchema);

  const baseUrl = 'https://www.lessoncraftstudio.com';
  const pageUrl = `${baseUrl}/${locale}/apps`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {locale === 'en' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(appsFaqItems, locale, pageUrl)) }}
        />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            {locale === 'de' ? translations.heroTitle || '33 Arbeitsblatt-Generatoren' :
             locale === 'fr' ? translations.heroTitle || '33 générateurs de fiches pédagogiques' :
             locale === 'es' ? translations.heroTitle || '33 generadores de fichas educativas' :
             locale === 'it' ? translations.heroTitle || '33 generatori di schede didattiche' :
             locale === 'pt' ? translations.heroTitle || '33 geradores de atividades educativas' :
             locale === 'nl' ? translations.heroTitle || '33 werkbladgenerators voor onderwijs' :
             locale === 'sv' ? translations.heroTitle || '33 pedagogiska arbetsbladsgeneratorer' :
             locale === 'da' ? translations.heroTitle || '33 pædagogiske arbejdsarkgeneratorer' :
             locale === 'no' ? translations.heroTitle || '33 pedagogiske arbeidsarkgeneratorer' :
             locale === 'fi' ? translations.heroTitle || '33 pedagogista tehtävämonistegeneraattoria' :
             '33 Worksheet Generator Apps'}
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            {locale === 'de' ? translations.heroSubtitle || 'Verwandeln Sie Ihre Unterrichtsmaterialien mit unserer umfassenden Sammlung pädagogischer Arbeitsblatt-Generatoren. Von Worträtseln bis zu Mathe-Aufgaben – bei uns finden Sie alles, was Sie brauchen.' :
             locale === 'fr' ? translations.heroSubtitle || 'Transformez vos supports pédagogiques avec notre collection complète de générateurs de fiches éducatives. Des mots cachés aux puzzles mathématiques, nous avons tout ce qu\'il vous faut.' :
             locale === 'es' ? translations.heroSubtitle || 'Transforma tus materiales didácticos con nuestra colección completa de generadores de fichas educativas. Desde sopas de letras hasta acertijos matemáticos, tenemos todo lo que necesitas.' :
             locale === 'it' ? translations.heroSubtitle || 'Trasforma i tuoi materiali didattici con la nostra collezione completa di generatori di schede educative. Dai crucipuzzle ai rompicapi matematici, abbiamo tutto ciò che ti serve.' :
             locale === 'pt' ? translations.heroSubtitle || 'Transforme seus materiais didáticos com nossa coleção completa de geradores de atividades educativas. De caça-palavras a desafios matemáticos, temos tudo o que você precisa.' :
             locale === 'nl' ? translations.heroSubtitle || 'Transformeer je lesmateriaal met onze complete collectie educatieve werkbladgenerators. Van woordzoekers tot rekenpuzzels, we hebben alles wat je nodig hebt.' :
             locale === 'sv' ? translations.heroSubtitle || 'Förvandla ditt undervisningsmaterial med vår kompletta samling pedagogiska arbetsbladsgeneratorer. Från ordsökning till mattepussel, vi har allt du behöver.' :
             locale === 'da' ? translations.heroSubtitle || 'Forvandl dit undervisningsmateriale med vores komplette samling af pædagogiske arbejdsarkgeneratorer. Fra ordsøgning til matematikpuslespil, vi har alt du behøver.' :
             locale === 'no' ? translations.heroSubtitle || 'Forvandle undervisningsmaterialet ditt med vår komplette samling av pedagogiske arbeidsarkgeneratorer. Fra ordsøking til matteoppgaver, vi har alt du trenger.' :
             locale === 'fi' ? translations.heroSubtitle || 'Uudista opetusmateriaalisi kattavalla kokoelmalla pedagogisia tehtävämonistegeneraattoreita. Sanaristikoista matemaattisiin pulmiin, meillä on kaikki mitä tarvitset.' :
             'Transform your teaching materials with our comprehensive suite of educational worksheet generators. From word searches to math puzzles, we have everything you need.'}
          </p>
        </div>
      </section>

      {/* Tier Explanation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{locale === 'de' ? translations.tierInfo?.freeTitle || 'Kostenlose Version' :
                                                             locale === 'fr' ? translations.tierInfo?.freeTitle || 'Version gratuite' :
                                                             locale === 'es' ? translations.tierInfo?.freeTitle || 'Versión gratuita' :
                                                             locale === 'it' ? translations.tierInfo?.freeTitle || 'Versione gratuita' :
                                                             locale === 'pt' ? translations.tierInfo?.freeTitle || 'Versão gratuita' :
                                                             locale === 'nl' ? translations.tierInfo?.freeTitle || 'Gratis versie' :
                                                             locale === 'sv' ? translations.tierInfo?.freeTitle || 'Gratisversion' :
                                                             locale === 'da' ? translations.tierInfo?.freeTitle || 'Gratis version' :
                                                             locale === 'no' ? translations.tierInfo?.freeTitle || 'Gratisversjon' :
                                                             locale === 'fi' ? translations.tierInfo?.freeTitle || 'Ilmaisversio' :
                                                             'Free Tier'}</h3>
              <p className="text-sm text-gray-600">{locale === 'de' ? translations.tierInfo?.freeDescription || 'Testen Sie den Wortsuche-Generator mit Wasserzeichen' :
                                                    locale === 'fr' ? translations.tierInfo?.freeDescription || 'Essayez le générateur de mots cachés avec filigrane' :
                                                    locale === 'es' ? translations.tierInfo?.freeDescription || 'Prueba el generador de sopa de letras con marca de agua' :
                                                    locale === 'it' ? translations.tierInfo?.freeDescription || 'Prova il generatore di crucipuzzle con filigrana' :
                                                    locale === 'pt' ? translations.tierInfo?.freeDescription || "Experimente o gerador de caça-palavras com marca d'\u00e1gua" :
                                                    locale === 'nl' ? translations.tierInfo?.freeDescription || 'Probeer de woordzoeker generator met watermerk' :
                                                    locale === 'sv' ? translations.tierInfo?.freeDescription || 'Prova ordsökningsgeneratorn med vattenstämpel' :
                                                    locale === 'da' ? translations.tierInfo?.freeDescription || 'Prøv ordsøgningsgeneratoren med vandmærke' :
                                                    locale === 'no' ? translations.tierInfo?.freeDescription || 'Prøv ordsøkingsgeneratoren med vannmerke' :
                                                    locale === 'fi' ? translations.tierInfo?.freeDescription || 'Kokeile sanaristikkogeneraattoria vesileimalla' :
                                                    'Try Word Search generator with watermarked output'}</p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{locale === 'de' ? translations.tierInfo?.coreTitle || 'Basis-Paket - $15/Monat' :
                                                             locale === 'fr' ? translations.tierInfo?.coreTitle || 'Pack Essentiel - 15$/mois' :
                                                             locale === 'es' ? translations.tierInfo?.coreTitle || 'Paquete Esencial - $15/mes' :
                                                             locale === 'it' ? translations.tierInfo?.coreTitle || 'Pacchetto Essenziale - $15/mese' :
                                                             locale === 'pt' ? translations.tierInfo?.coreTitle || 'Pacote Essencial - $15/mês' :
                                                             locale === 'nl' ? translations.tierInfo?.coreTitle || 'Basis Pakket - $15/maand' :
                                                             locale === 'sv' ? translations.tierInfo?.coreTitle || 'Baspaket - $15/månad' :
                                                             locale === 'da' ? translations.tierInfo?.coreTitle || 'Kernepakke - $15/måned' :
                                                             locale === 'no' ? translations.tierInfo?.coreTitle || 'Kjernepakke - $15/måned' :
                                                             locale === 'fi' ? translations.tierInfo?.coreTitle || 'Peruspaketti - $15/kuukausi' :
                                                             'Core Bundle - $15/mo'}</h3>
              <p className="text-sm text-gray-600">{locale === 'de' ? translations.tierInfo?.coreDescription || 'Zugriff auf die 10 beliebtesten Apps mit kommerzieller Lizenz' :
                                                    locale === 'fr' ? translations.tierInfo?.coreDescription || 'Accès aux 10 applications les plus populaires avec licence commerciale' :
                                                    locale === 'es' ? translations.tierInfo?.coreDescription || 'Acceso a las 10 aplicaciones más populares con licencia comercial' :
                                                    locale === 'it' ? translations.tierInfo?.coreDescription || 'Accesso alle 10 app più popolari con licenza commerciale' :
                                                    locale === 'pt' ? translations.tierInfo?.coreDescription || 'Acesso aos 10 aplicativos mais populares com licença comercial' :
                                                    locale === 'nl' ? translations.tierInfo?.coreDescription || 'Toegang tot de 10 populairste apps met commerciële licentie' :
                                                    locale === 'sv' ? translations.tierInfo?.coreDescription || 'Tillgång till de 10 mest populära apparna med kommersiell licens' :
                                                    locale === 'da' ? translations.tierInfo?.coreDescription || 'Adgang til de 10 mest populære apps med kommerciel licens' :
                                                    locale === 'no' ? translations.tierInfo?.coreDescription || 'Tilgang til de 10 mest populære appene med kommersiell lisens' :
                                                    locale === 'fi' ? translations.tierInfo?.coreDescription || 'Pääsy 10 suosituimpaan sovellukseen kaupallisella lisenssillä' :
                                                    'Access 10 most popular apps with commercial license'}</p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-3 bg-purple-100 rounded-full mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{locale === 'de' ? translations.tierInfo?.fullTitle || 'Vollzugriff - $25/Monat' :
                                                             locale === 'fr' ? translations.tierInfo?.fullTitle || 'Accès Complet - 25$/mois' :
                                                             locale === 'es' ? translations.tierInfo?.fullTitle || 'Acceso Completo - $25/mes' :
                                                             locale === 'it' ? translations.tierInfo?.fullTitle || 'Accesso Completo - $25/mese' :
                                                             locale === 'pt' ? translations.tierInfo?.fullTitle || 'Acesso Completo - $25/mês' :
                                                             locale === 'nl' ? translations.tierInfo?.fullTitle || 'Volledige Toegang - $25/maand' :
                                                             locale === 'sv' ? translations.tierInfo?.fullTitle || 'Full Tillgång - $25/månad' :
                                                             locale === 'da' ? translations.tierInfo?.fullTitle || 'Fuld Adgang - $25/måned' :
                                                             locale === 'no' ? translations.tierInfo?.fullTitle || 'Full Tilgang - $25/måned' :
                                                             locale === 'fi' ? translations.tierInfo?.fullTitle || 'Täysi Pääsy - $25/kuukausi' :
                                                             'Full Access - $25/mo'}</h3>
              <p className="text-sm text-gray-600">{locale === 'de' ? translations.tierInfo?.fullDescription || 'Alle 33 Apps, Prioritäts-Support, frühzeitiger Zugang' :
                                                    locale === 'fr' ? translations.tierInfo?.fullDescription || 'Les 33 applications, support prioritaire, accès anticipé' :
                                                    locale === 'es' ? translations.tierInfo?.fullDescription || 'Las 33 aplicaciones, soporte prioritario, acceso anticipado' :
                                                    locale === 'it' ? translations.tierInfo?.fullDescription || 'Tutte le 33 app, supporto prioritario, accesso anticipato' :
                                                    locale === 'pt' ? translations.tierInfo?.fullDescription || 'Todos os 33 aplicativos, suporte prioritário, acesso antecipado' :
                                                    locale === 'nl' ? translations.tierInfo?.fullDescription || 'Alle 33 apps, prioriteitsondersteuning, vroege toegang' :
                                                    locale === 'sv' ? translations.tierInfo?.fullDescription || 'Alla 33 appar, prioriterad support, tidig tillgång' :
                                                    locale === 'da' ? translations.tierInfo?.fullDescription || 'Alle 33 apps, prioriteret support, tidlig adgang' :
                                                    locale === 'no' ? translations.tierInfo?.fullDescription || 'Alle 33 apper, prioritert støtte, tidlig tilgang' :
                                                    locale === 'fi' ? translations.tierInfo?.fullDescription || 'Kaikki 33 sovellusta, priorisoitu tuki, varhainen pääsy' :
                                                    'All 33 apps, priority support, early access'}</p>
            </div>
          </div>
        </div>
      </section>


      {/* Pillar Content (EN only) */}
      {locale === 'en' && (
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              {appsPillarContent.heading}
            </h2>
            {appsPillarContent.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="py-6 bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-full whitespace-nowrap">
              {locale === 'de' ? translations.filters?.allApps || 'Alle Apps' :
               locale === 'fr' ? translations.filters?.allApps || 'Toutes les applications' :
               locale === 'es' ? translations.filters?.allApps || 'Todas las aplicaciones' :
               locale === 'it' ? translations.filters?.allApps || 'Tutte le app' :
               locale === 'pt' ? translations.filters?.allApps || 'Todos os aplicativos' :
               locale === 'nl' ? translations.filters?.allApps || 'Alle apps' :
               locale === 'sv' ? translations.filters?.allApps || 'Alla appar' :
               locale === 'da' ? translations.filters?.allApps || 'Alle apps' :
               locale === 'no' ? translations.filters?.allApps || 'Alle apper' :
               locale === 'fi' ? translations.filters?.allApps || 'Kaikki sovellukset' :
               'All Apps'}
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                {getCategory(category, locale, translations)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Free Tier */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-block w-2 h-8 bg-green-500 mr-3"></span>
              {locale === 'de' ? 'Kostenlose Version' :
               locale === 'fr' ? 'Version gratuite' :
               locale === 'es' ? 'Versión gratuita' :
               locale === 'it' ? 'Versione gratuita' :
               locale === 'pt' ? 'Versão gratuita' :
               locale === 'nl' ? 'Gratis versie' :
               locale === 'sv' ? 'Gratisversion' :
               locale === 'da' ? 'Gratis version' :
               locale === 'no' ? 'Gratisversjon' :
               locale === 'fi' ? 'Ilmaisversio' :
               'Free Tier'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apps.filter(app => app.tier === 'free').map(app => (
                <AppCard
                  key={app.id}
                  app={app}
                  locale={locale}
                  appName={getAppName(app.id, app.name, locale, translations)}
                  categoryName={getCategory(app.category, locale, translations)}
                />
              ))}
            </div>
          </div>

          {/* Core Bundle */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-block w-2 h-8 bg-blue-500 mr-3"></span>
              {locale === 'de' ? 'Basis-Paket' :
               locale === 'fr' ? 'Pack Essentiel' :
               locale === 'es' ? 'Paquete Esencial' :
               locale === 'it' ? 'Pacchetto Essenziale' :
               locale === 'pt' ? 'Pacote Essencial' :
               locale === 'nl' ? 'Basis Pakket' :
               locale === 'sv' ? 'Baspaket' :
               locale === 'da' ? 'Kernepakke' :
               locale === 'no' ? 'Kjernepakke' :
               locale === 'fi' ? 'Peruspaketti' :
               'Core Bundle'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apps.filter(app => app.tier === 'core').map(app => (
                <AppCard
                  key={app.id}
                  app={app}
                  locale={locale}
                  appName={getAppName(app.id, app.name, locale, translations)}
                  categoryName={getCategory(app.category, locale, translations)}
                />
              ))}
            </div>
          </div>

          {/* Full Access */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-block w-2 h-8 bg-purple-500 mr-3"></span>
              {locale === 'de' ? 'Vollzugriff Apps' :
               locale === 'fr' ? 'Accès Complet' :
               locale === 'es' ? 'Acceso Completo' :
               locale === 'it' ? 'Accesso Completo' :
               locale === 'pt' ? 'Acesso Completo' :
               locale === 'nl' ? 'Volledige Toegang' :
               locale === 'sv' ? 'Full Tillgång' :
               locale === 'da' ? 'Fuld Adgang' :
               locale === 'no' ? 'Full Tilgang' :
               locale === 'fi' ? 'Täysi Pääsy' :
               'Full Access Apps'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apps.filter(app => app.tier === 'full').map(app => (
                <AppCard
                  key={app.id}
                  app={app}
                  locale={locale}
                  appName={getAppName(app.id, app.name, locale, translations)}
                  categoryName={getCategory(app.category, locale, translations)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Grade Level - Internal Linking to Grade Hub Pages */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3 text-gray-900">
            {locale === 'de' ? 'Nach Klassenstufe durchsuchen' :
             locale === 'fr' ? 'Parcourir par niveau scolaire' :
             locale === 'es' ? 'Explorar por nivel escolar' :
             locale === 'it' ? 'Sfoglia per livello scolastico' :
             locale === 'pt' ? 'Explorar por n\u00edvel escolar' :
             locale === 'nl' ? 'Blader op schoolniveau' :
             locale === 'sv' ? 'Bl\u00e4ddra efter \u00e5rskurs' :
             locale === 'da' ? 'Gennemse efter klassetrin' :
             locale === 'no' ? 'Bla etter klassetrinn' :
             locale === 'fi' ? 'Selaa luokka-asteen mukaan' :
             'Browse by Grade Level'}
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === 'de' ? 'Finden Sie altersgerechte Apps f\u00fcr jede Klassenstufe.' :
             locale === 'fr' ? 'Trouvez des applications adapt\u00e9es \u00e0 chaque niveau scolaire.' :
             locale === 'es' ? 'Encuentra aplicaciones apropiadas para cada nivel escolar.' :
             locale === 'it' ? 'Trova app adatte a ogni livello scolastico.' :
             locale === 'pt' ? 'Encontre aplicativos adequados para cada n\u00edvel escolar.' :
             locale === 'nl' ? 'Vind leeftijdsgeschikte apps voor elk schoolniveau.' :
             locale === 'sv' ? 'Hitta \u00e5ldersanpassade appar f\u00f6r varje \u00e5rskurs.' :
             locale === 'da' ? 'Find alderspassende apps til hvert klassetrin.' :
             locale === 'no' ? 'Finn alderstilpassede apper for hvert klassetrinn.' :
             locale === 'fi' ? 'L\u00f6yd\u00e4 ik\u00e4\u00e4n sopivia sovelluksia jokaiselle luokka-asteelle.' :
             'Find age-appropriate apps for each grade level.'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {GRADE_IDS.map((gradeId) => (
              <Link
                key={gradeId}
                href={`/${locale}/apps/grades/${getGradeSlug(gradeId, locale) || gradeId}`}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {gradeDisplayNames[gradeId]?.[locale] || gradeDisplayNames[gradeId]?.en}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {gradeAgeRanges[gradeId]?.[locale] || gradeAgeRanges[gradeId]?.en}
                </p>
                <span className="text-blue-500 text-sm mt-2 inline-block group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={`/${locale}/worksheets`}
              className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
            >
              {locale === 'de' ? 'Entdecken Sie 50 thematische Arbeitsbl\u00e4tter' :
               locale === 'fr' ? 'D\u00e9couvrez 50 fiches th\u00e9matiques' :
               locale === 'es' ? 'Explora 50 fichas tem\u00e1ticas' :
               locale === 'it' ? 'Esplora 50 schede tematiche' :
               locale === 'pt' ? 'Explore 50 atividades tem\u00e1ticas' :
               locale === 'nl' ? 'Ontdek 50 thematische werkbladen' :
               locale === 'sv' ? 'Utforska 50 tematiska arbetsblad' :
               locale === 'da' ? 'Udforsk 50 tematiske arbejdsark' :
               locale === 'no' ? 'Utforsk 50 tematiske arbeidsark' :
               locale === 'fi' ? 'Tutustu 50 teemapohjaiseen teht\u00e4v\u00e4\u00e4n' :
               'Explore 50 Themed Worksheets'}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ Section (EN only) */}
      {locale === 'en' && appsFaqItems.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {appsFaqItems.map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-lg bg-white">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900">
                    {item.question}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Teaching Tips from Blog - SEO Internal Linking */}
      {recentBlogPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
              {locale === 'de' ? 'Tipps und Ressourcen für Lehrer' :
               locale === 'fr' ? 'Conseils et ressources pédagogiques' :
               locale === 'es' ? 'Consejos y recursos para maestros' :
               locale === 'it' ? 'Consigli e risorse per insegnanti' :
               locale === 'pt' ? 'Dicas e recursos para professores' :
               locale === 'nl' ? 'Tips en hulpmiddelen voor leraren' :
               locale === 'sv' ? 'Tips och resurser för lärare' :
               locale === 'da' ? 'Tips og ressourcer til lærere' :
               locale === 'no' ? 'Tips og ressurser for lærere' :
               locale === 'fi' ? 'Vinkkejä ja resursseja opettajille' :
               'Teaching Tips & Resources'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {recentBlogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <span className="text-xs text-blue-600 uppercase tracking-wide font-medium">
                    {post.category}
                  </span>
                  <h3 className="font-semibold mt-2 mb-2 text-gray-900 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/blog`}
                className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
              >
                {locale === 'de' ? 'Alle Artikel anzeigen' :
                 locale === 'fr' ? 'Voir tous les articles' :
                 locale === 'es' ? 'Ver todos los artículos' :
                 locale === 'it' ? 'Vedi tutti gli articoli' :
                 locale === 'pt' ? 'Ver todos os artigos' :
                 locale === 'nl' ? 'Bekijk alle artikelen' :
                 locale === 'sv' ? 'Visa alla artiklar' :
                 locale === 'da' ? 'Se alle artikler' :
                 locale === 'no' ? 'Se alle artikler' :
                 locale === 'fi' ? 'Näytä kaikki artikkelit' :
                 'View All Articles'}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{locale === 'de' ? translations.cta?.title || 'Bereit für großartige Arbeitsblätter?' :
                                                     locale === 'fr' ? translations.cta?.title || 'Prêt à créer des fiches extraordinaires?' :
                                                     locale === 'es' ? translations.cta?.title || '¿Listo para crear fichas increíbles?' :
                                                     locale === 'it' ? translations.cta?.title || 'Pronto per creare schede fantastiche?' :
                                                     locale === 'pt' ? translations.cta?.title || 'Pronto para criar atividades incríveis?' :
                                                     locale === 'nl' ? translations.cta?.title || 'Klaar om geweldige werkbladen te maken?' :
                                                     locale === 'sv' ? translations.cta?.title || 'Redo att skapa fantastiska arbetsblad?' :
                                                     locale === 'da' ? translations.cta?.title || 'Klar til at lave fantastiske arbejdsark?' :
                                                     locale === 'no' ? translations.cta?.title || 'Klar til å lage fantastiske arbeidsark?' :
                                                     locale === 'fi' ? translations.cta?.title || 'Valmis luomaan upeita tehtävämonisteita?' :
                                                     'Ready to Create Amazing Worksheets?'}</h2>
          <p className="text-xl text-blue-100 mb-8">
            {locale === 'de' ? translations.cta?.subtitle || 'Beginnen Sie mit unserem kostenlosen Wortsuche-Generator oder schalten Sie heute alle Apps frei' :
             locale === 'fr' ? translations.cta?.subtitle || 'Commencez avec notre générateur gratuit de mots cachés ou débloquez toutes les applications dès aujourd\'hui' :
             locale === 'es' ? translations.cta?.subtitle || 'Comienza con nuestro generador gratuito de sopa de letras o desbloquea todas las aplicaciones hoy mismo' :
             locale === 'it' ? translations.cta?.subtitle || 'Inizia con il nostro generatore gratuito di crucipuzzle o sblocca tutte le app oggi stesso' :
             locale === 'pt' ? translations.cta?.subtitle || 'Comece com nosso gerador gratuito de caça-palavras ou desbloqueie todos os aplicativos hoje' :
             locale === 'nl' ? translations.cta?.subtitle || 'Begin met onze gratis woordzoeker generator of ontgrendel vandaag alle apps' :
             locale === 'sv' ? translations.cta?.subtitle || 'Börja med vår gratis ordsökningsgenerator eller lås upp alla appar idag' :
             locale === 'da' ? translations.cta?.subtitle || 'Start med vores gratis ordsøgningsgenerator eller lås alle apps op i dag' :
             locale === 'no' ? translations.cta?.subtitle || 'Start med vår gratis ordsøkingsgenerator eller lås opp alle apper i dag' :
             locale === 'fi' ? translations.cta?.subtitle || 'Aloita ilmaisella sanaristikkogeneraattorilla tai avaa kaikki sovellukset tänään' :
             'Start with our free Word Search generator or unlock all apps today'}
          </p>
          <div className="flex gap-4 justify-center">
            <Button href={`/${locale}/auth/signup`} variant="secondary" size="lg">
              {locale === 'de' ? translations.cta?.startFreeTrial || 'Kostenlos testen' :
               locale === 'fr' ? translations.cta?.startFreeTrial || 'Essai gratuit' :
               locale === 'es' ? translations.cta?.startFreeTrial || 'Prueba gratuita' :
               locale === 'it' ? translations.cta?.startFreeTrial || 'Prova gratuita' :
               locale === 'pt' ? translations.cta?.startFreeTrial || 'Teste grátis' :
               locale === 'nl' ? translations.cta?.startFreeTrial || 'Gratis proberen' :
               locale === 'sv' ? translations.cta?.startFreeTrial || 'Prova gratis' :
               locale === 'da' ? translations.cta?.startFreeTrial || 'Prøv gratis' :
               locale === 'no' ? translations.cta?.startFreeTrial || 'Prøv gratis' :
               locale === 'fi' ? translations.cta?.startFreeTrial || 'Kokeile ilmaiseksi' :
               'Start Free Trial'}
            </Button>
            <Button href={`/${locale}/pricing`} variant="primary" size="lg">
              {locale === 'de' ? translations.cta?.viewPricing || 'Preise ansehen' :
               locale === 'fr' ? translations.cta?.viewPricing || 'Voir les tarifs' :
               locale === 'es' ? translations.cta?.viewPricing || 'Ver precios' :
               locale === 'it' ? translations.cta?.viewPricing || 'Vedi i prezzi' :
               locale === 'pt' ? translations.cta?.viewPricing || 'Ver preços' :
               locale === 'nl' ? translations.cta?.viewPricing || 'Bekijk prijzen' :
               locale === 'sv' ? translations.cta?.viewPricing || 'Se priser' :
               locale === 'da' ? translations.cta?.viewPricing || 'Se priser' :
               locale === 'no' ? translations.cta?.viewPricing || 'Se priser' :
               locale === 'fi' ? translations.cta?.viewPricing || 'Katso hinnat' :
               'View Pricing'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}