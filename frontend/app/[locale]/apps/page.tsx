import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { getTranslations } from 'next-intl/server';
import AppCard from '@/components/apps/AppCard';
import { generateAppsCollectionSchema } from '@/lib/schema-generator';

// Localized SEO metadata for all 11 languages
// Keywords focus on PLATFORM-LEVEL terms to avoid cannibalization with individual product pages
const appsMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  en: {
    title: '33 Free Worksheet Generators - Educational Apps | LessonCraftStudio',
    description: 'Browse all 33 professional worksheet generators. Word search, crossword, math puzzles, and more. Free for teachers and parents.',
    keywords: 'worksheet generator platform, educational app suite, teacher worksheet tools, classroom resource creator, all-in-one worksheet maker, 33 worksheet generators, printable activity creator, educational technology platform, teacher resource hub, worksheet creation software'
  },
  de: {
    title: '33 Kostenlose Arbeitsblatt-Generatoren | LessonCraftStudio',
    description: 'Entdecken Sie 33 professionelle Arbeitsblatt-Generatoren. Wortsuchrätsel, Kreuzworträtsel, Mathe-Puzzles und mehr.',
    keywords: 'Arbeitsblatt-Generator-Plattform, Lehrmittel-Software, Unterrichtsmaterial-Ersteller, 33 Generatoren, Klassenzimmer-Tools, pädagogische App-Suite, Lehrer-Ressourcen-Plattform, Bildungstechnologie, Arbeitsblatt-Erstellung, digitale Lernwerkzeuge'
  },
  fr: {
    title: '33 Générateurs de Fiches Gratuits | LessonCraftStudio',
    description: 'Découvrez 33 générateurs de fiches professionnels. Mots cachés, mots croisés, puzzles mathématiques et plus.',
    keywords: 'plateforme générateur de fiches, suite éducative, outils pédagogiques enseignants, 33 générateurs, créateur ressources classe, logiciel création fiches, technologie éducative, plateforme enseignants, outils numériques école, application éducative'
  },
  es: {
    title: '33 Generadores de Fichas Gratis | LessonCraftStudio',
    description: 'Explore 33 generadores de fichas profesionales. Sopa de letras, crucigramas, puzzles matemáticos y más.',
    keywords: 'plataforma generador fichas, suite educativa, herramientas docentes, 33 generadores, creador recursos aula, software educativo, tecnología educativa, plataforma profesores, herramientas digitales escuela, aplicación pedagógica'
  },
  pt: {
    title: '33 Geradores de Planilhas Grátis | LessonCraftStudio',
    description: 'Descubra 33 geradores de planilhas profissionais. Caça-palavras, palavras cruzadas, quebra-cabeças de matemática e mais.',
    keywords: 'plataforma gerador atividades, suite educacional, ferramentas professores, 33 geradores, criador recursos sala aula, software educacional, tecnologia educacional, plataforma docentes, ferramentas digitais escola, aplicativo pedagógico'
  },
  it: {
    title: '33 Generatori di Schede Gratis | LessonCraftStudio',
    description: 'Scopri 33 generatori di schede professionali. Ricerca di parole, cruciverba, puzzle matematici e altro.',
    keywords: 'piattaforma generatore schede, suite educativa, strumenti didattici insegnanti, 33 generatori, creatore risorse classe, software educativo, tecnologia didattica, piattaforma docenti, strumenti digitali scuola, applicazione pedagogica'
  },
  nl: {
    title: '33 Gratis Werkblad Generatoren | LessonCraftStudio',
    description: 'Ontdek 33 professionele werkblad generatoren. Woordzoekers, kruiswoordpuzzels, rekenpuzzels en meer.',
    keywords: 'werkblad generator platform, educatieve software suite, leerkracht hulpmiddelen, 33 generatoren, lesmaterialen creator, onderwijstechnologie, leerkrachten platform, digitale leermiddelen, educatieve applicatie, klaslokaal tools'
  },
  sv: {
    title: '33 Gratis Arbetsblad Generatorer | LessonCraftStudio',
    description: 'Utforska 33 professionella arbetsblad generatorer. Ordjaktar, korsord, mattepussel och mer.',
    keywords: 'arbetsblad generator plattform, pedagogisk mjukvara, lärarverktyg, 33 generatorer, lärresurser skapare, utbildningsteknik, lärarplattform, digitala läromedel, pedagogisk applikation, klassrumsverktyg'
  },
  da: {
    title: '33 Gratis Arbejdsark Generatorer | LessonCraftStudio',
    description: 'Udforsk 33 professionelle arbejdsark generatorer. Ordsøgning, krydsord, matematikpuslespil og mere.',
    keywords: 'arbejdsark generator platform, pædagogisk software, lærerværktøjer, 33 generatorer, undervisningsressourcer skaber, uddannelsesteknologi, lærerplatform, digitale læringsmaterialer, pædagogisk applikation, klasseværelses værktøjer'
  },
  no: {
    title: '33 Gratis Arbeidsark Generatorer | LessonCraftStudio',
    description: 'Utforsk 33 profesjonelle arbeidsark generatorer. Ordsøking, kryssord, mattepuslespill og mer.',
    keywords: 'arbeidsark generator plattform, pedagogisk programvare, lærerverktøy, 33 generatorer, undervisningsressurser skaper, utdanningsteknologi, lærerplattform, digitale læringsmaterialer, pedagogisk applikasjon, klasseromverktøy'
  },
  fi: {
    title: '33 Ilmaista Työarkki Generaattoria | LessonCraftStudio',
    description: 'Tutustu 33 ammattimaiseen työarkki generaattoriin. Sanaristikot, ristisanatehtävät, matemaattiset pulmat ja muuta.',
    keywords: 'tehtäväarkki generaattori alusta, opetusohjelma suite, opettajan työkalut, 33 generaattoria, opetusresurssien luoja, opetusteknologia, opettajien alusta, digitaaliset oppimateriaalit, pedagoginen sovellus, luokkahuonetyökalut'
  }
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';

  // Get localized metadata
  const meta = appsMetadata[locale] || appsMetadata.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/apps`,
      languages: {
        'en': `${baseUrl}/en/apps`,
        'de': `${baseUrl}/de/apps`,
        'fr': `${baseUrl}/fr/apps`,
        'es': `${baseUrl}/es/apps`,
        'pt': `${baseUrl}/pt/apps`,
        'it': `${baseUrl}/it/apps`,
        'nl': `${baseUrl}/nl/apps`,
        'sv': `${baseUrl}/sv/apps`,
        'da': `${baseUrl}/da/apps`,
        'no': `${baseUrl}/no/apps`,
        'fi': `${baseUrl}/fi/apps`,
        'x-default': `${baseUrl}/en/apps`
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `${baseUrl}/${locale}/apps`,
      siteName: 'LessonCraftStudio',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].filter(l => l !== locale),
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

  // Generate JSON-LD schema for SEO
  const schema = generateAppsCollectionSchema(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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