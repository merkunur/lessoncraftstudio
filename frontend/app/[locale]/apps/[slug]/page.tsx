import { Metadata } from 'next';
import AutoLaunchApp from './AutoLaunchApp';
import { notFound, redirect } from 'next/navigation';
import ProductPageClient from '@/components/product-page/ProductPageClient';
import { getContentBySlug, getAllStaticParams, getAlternateLanguageUrls } from '@/config/product-page-content';
import { generateAppProductSchemas, AppProductData } from '@/lib/schema-generator';
import additionEnContent from '@/content/product-pages/en/addition-worksheets';
import wordSearchEnContent from '@/content/product-pages/en/word-search-worksheets';
import alphabetTrainEnContent from '@/content/product-pages/en/alphabet-train-worksheets';
import coloringEnContent from '@/content/product-pages/en/coloring-worksheets';
import mathWorksheetsEnContent from '@/content/product-pages/en/math-worksheets';
import wordScrambleEnContent from '@/content/product-pages/en/word-scramble-worksheets';
import findAndCountEnContent from '@/content/product-pages/en/find-and-count-worksheets';
import matchingEnContent from '@/content/product-pages/en/matching-worksheets';
import drawingLinesEnContent from '@/content/product-pages/en/drawing-lines-worksheets';
import pictureBingoEnContent from '@/content/product-pages/en/picture-bingo-worksheets';
import sudokuEnContent from '@/content/product-pages/en/sudoku-worksheets';
import bigSmallEnContent from '@/content/product-pages/en/big-small-worksheets';
import chartCountEnContent from '@/content/product-pages/en/chart-count-worksheets';
import codeAdditionEnContent from '@/content/product-pages/en/code-addition-worksheets';
import drawAndColorEnContent from '@/content/product-pages/en/draw-and-color-worksheets';
import findObjectsEnContent from '@/content/product-pages/en/find-objects-worksheets';
import gridMatchEnContent from '@/content/product-pages/en/grid-match-worksheets';
import crosswordEnContent from '@/content/product-pages/en/crossword-worksheets';
import cryptogramEnContent from '@/content/product-pages/en/cryptogram-worksheets';
import mathPuzzleEnContent from '@/content/product-pages/en/math-puzzle-worksheets';
import missingPiecesEnContent from '@/content/product-pages/en/missing-pieces-worksheets';
import moreLessEnContent from '@/content/product-pages/en/more-less-worksheets';
import oddOneOutEnContent from '@/content/product-pages/en/odd-one-out-worksheets';
import patternTrainEnContent from '@/content/product-pages/en/pattern-train-worksheets';
import patternWorksheetsEnContent from '@/content/product-pages/en/pattern-worksheets';
import picturePathEnContent from '@/content/product-pages/en/picture-path-worksheets';
import pictureSortEnContent from '@/content/product-pages/en/picture-sort-worksheets';
import prepositionsEnContent from '@/content/product-pages/en/prepositions-worksheets';
import shadowMatchEnContent from '@/content/product-pages/en/shadow-match-worksheets';
import subtractionEnContent from '@/content/product-pages/en/subtraction-worksheets';
import treasureHuntEnContent from '@/content/product-pages/en/treasure-hunt-worksheets';
import wordGuessEnContent from '@/content/product-pages/en/word-guess-worksheets';
import writingEnContent from '@/content/product-pages/en/writing-worksheets';
import wordSearchSvContent from '@/content/product-pages/sv/word-search-worksheets';
import wordSearchDeContent from '@/content/product-pages/de/word-search-worksheets';
import alphabetTrainDeContent from '@/content/product-pages/de/alphabet-train-worksheets';
import coloringDeContent from '@/content/product-pages/de/coloring-worksheets';
import mathWorksheetsDeContent from '@/content/product-pages/de/math-worksheets';
import matchingDeContent from '@/content/product-pages/de/matching-worksheets';
import drawingLinesDeContent from '@/content/product-pages/de/drawing-lines-worksheets';
import pictureBingoDeContent from '@/content/product-pages/de/picture-bingo-worksheets';
import chartCountDeContent from '@/content/product-pages/de/chart-count-worksheets';
import codeAdditionDeContent from '@/content/product-pages/de/code-addition-worksheets';
import findObjectsDeContent from '@/content/product-pages/de/find-objects-worksheets';
import crosswordDeContent from '@/content/product-pages/de/crossword-worksheets';
import cryptogramDeContent from '@/content/product-pages/de/cryptogram-worksheets';
import mathPuzzleDeContent from '@/content/product-pages/de/math-puzzle-worksheets';
import moreLessDeContent from '@/content/product-pages/de/mehr-weniger-arbeitsblaetter';
import oddOneOutDeContent from '@/content/product-pages/de/was-passt-nicht-arbeitsblaetter';
import patternTrainDeContent from '@/content/product-pages/de/muster-zug-arbeitsblaetter';
import patternWorksheetDeContent from '@/content/product-pages/de/muster-arbeitsblatt-arbeitsblaetter';
import picturePathDeContent from '@/content/product-pages/de/bilderpfad-arbeitsblaetter';
import pictureSortDeContent from '@/content/product-pages/de/bilder-sortieren-arbeitsblaetter';
import prepositionsDeContent from '@/content/product-pages/de/praepositionen-arbeitsblaetter';
import shadowMatchDeContent from '@/content/product-pages/de/schattenbilder-zuordnen-arbeitsblaetter';
import subtractionDeContent from '@/content/product-pages/de/subtraktion-arbeitsblaetter';
import treasureHuntDeContent from '@/content/product-pages/de/schatzsuche-arbeitsblaetter';
import wordGuessDeContent from '@/content/product-pages/de/woerter-raten-arbeitsblaetter';
import additionSvContent from '@/content/product-pages/sv/addition-worksheets';
import alphabetTrainSvContent from '@/content/product-pages/sv/alphabet-train-worksheets';
import coloringSvContent from '@/content/product-pages/sv/coloring-worksheets';
import mathWorksheetsSvContent from '@/content/product-pages/sv/math-worksheets';
import wordScrambleSvContent from '@/content/product-pages/sv/word-scramble-worksheets';
import matchingSvContent from '@/content/product-pages/sv/matching-worksheets';
import sudokuSvContent from '@/content/product-pages/sv/sudoku-worksheets';
import bigSmallSvContent from '@/content/product-pages/sv/big-small-worksheets';
import drawAndColorSvContent from '@/content/product-pages/sv/draw-and-color-worksheets';
import crosswordSvContent from '@/content/product-pages/sv/crossword-worksheets';
import mathPuzzleSvContent from '@/content/product-pages/sv/math-puzzle-worksheets';
import oddOneOutSvContent from '@/content/product-pages/sv/odd-one-out-worksheets';
import patternTrainSvContent from '@/content/product-pages/sv/pattern-train-worksheets';
import patternWorksheetsSvContent from '@/content/product-pages/sv/pattern-worksheets';
import shadowMatchSvContent from '@/content/product-pages/sv/shadow-match-worksheets';
import subtractionSvContent from '@/content/product-pages/sv/subtraction-worksheets';
import treasureHuntSvContent from '@/content/product-pages/sv/treasure-hunt-worksheets';
import wordGuessSvContent from '@/content/product-pages/sv/word-guess-worksheets';
import writingSvContent from '@/content/product-pages/sv/writing-worksheets';
import wordSearchFrContent from '@/content/product-pages/fr/word-search-worksheets';
import additionFrContent from '@/content/product-pages/fr/addition-worksheets';
import alphabetTrainFrContent from '@/content/product-pages/fr/alphabet-train-worksheets';
import coloringFrContent from '@/content/product-pages/fr/coloring-worksheets';
import findAndCountFrContent from '@/content/product-pages/fr/find-and-count-worksheets';
import matchingFrContent from '@/content/product-pages/fr/matching-worksheets';
import drawingLinesFrContent from '@/content/product-pages/fr/drawing-lines-worksheets';
import pictureBingoFrContent from '@/content/product-pages/fr/picture-bingo-worksheets';
import findObjectsFrContent from '@/content/product-pages/fr/find-objects-worksheets';
import gridMatchFrContent from '@/content/product-pages/fr/grid-match-worksheets';
import crosswordFrContent from '@/content/product-pages/fr/crossword-worksheets';
import cryptogramFrContent from '@/content/product-pages/fr/cryptogram-worksheets';
import missingPiecesFrContent from '@/content/product-pages/fr/missing-pieces-worksheets';
import moreLessFrContent from '@/content/product-pages/fr/more-less-worksheets';
import oddOneOutFrContent from '@/content/product-pages/fr/odd-one-out-worksheets';
import patternTrainFrContent from '@/content/product-pages/fr/pattern-train-worksheets';
import treasureHuntFrContent from '@/content/product-pages/fr/treasure-hunt-worksheets';
import wordGuessFrContent from '@/content/product-pages/fr/word-guess-worksheets';
import wordSearchEsContent from '@/content/product-pages/es/word-search-worksheets';
import additionEsContent from '@/content/product-pages/es/addition-worksheets';
import alphabetTrainEsContent from '@/content/product-pages/es/alphabet-train-worksheets';
import coloringEsContent from '@/content/product-pages/es/coloring-worksheets';
import mathWorksheetsEsContent from '@/content/product-pages/es/math-worksheets';
import wordScrambleEsContent from '@/content/product-pages/es/word-scramble-worksheets';
import findAndCountEsContent from '@/content/product-pages/es/find-and-count-worksheets';
import matchingEsContent from '@/content/product-pages/es/matching-worksheets';
import drawingLinesEsContent from '@/content/product-pages/es/drawing-lines-worksheets';
import bingoEsContent from '@/content/product-pages/es/bingo-fichas';
import sudokuEsContent from '@/content/product-pages/es/sudoku-fichas-ninos';
import bigSmallEsContent from '@/content/product-pages/es/grande-pequeno-fichas';
import graficosConteoEsContent from '@/content/product-pages/es/graficos-conteo-fichas';
import sumaCodigoEsContent from '@/content/product-pages/es/suma-codigo-fichas';
import dibujoCuadriculaEsContent from '@/content/product-pages/es/dibujo-cuadricula-fichas';
import findObjectsEsContent from '@/content/product-pages/es/buscar-objetos-fichas';
import gridMatchEsContent from '@/content/product-pages/es/rompecabezas-cuadricula-fichas';
import crosswordEsContent from '@/content/product-pages/es/crucigramas-imagenes-fichas';
import cryptogramEsContent from '@/content/product-pages/es/criptogramas-imagenes-fichas';
import mathPuzzleEsContent from '@/content/product-pages/es/rompecabezas-matematicos-fichas';
import missingPiecesEsContent from '@/content/product-pages/es/piezas-faltantes-fichas';
import picturePathEsContent from '@/content/product-pages/es/laberintos-imagenes-fichas';
import moreLessEsContent from '@/content/product-pages/es/mayor-menor-fichas';
import oddOneOutEsContent from '@/content/product-pages/es/encuentra-el-diferente';
import patternTrainEsContent from '@/content/product-pages/es/tren-patrones-fichas';
import patternWorksheetEsContent from '@/content/product-pages/es/fichas-patrones';
import pictureSortEsContent from '@/content/product-pages/es/clasificar-imagenes-fichas';
import prepositionsEsContent from '@/content/product-pages/es/preposiciones-fichas';
import shadowMatchEsContent from '@/content/product-pages/es/asociacion-sombras-fichas';

// Italian content imports
import alphabetTrainItContent from '@/content/product-pages/it/treno-alfabeto-schede';
import coloringItContent from '@/content/product-pages/it/disegni-da-colorare';
import mathWorksheetsItContent from '@/content/product-pages/it/math-worksheets';
import wordScrambleItContent from '@/content/product-pages/it/anagrammi-schede';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

/**
 * Schema Markup Component for SEO
 * Injects JSON-LD structured data for Google Search
 */
function SchemaScripts({
  appData,
  locale,
  slug
}: {
  appData: AppProductData;
  locale: string;
  slug: string;
}) {
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const pageUrl = `${baseUrl}/${locale}/apps/${slug}`;
  const schemas = generateAppProductSchemas(appData, locale, pageUrl, baseUrl);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // DYNAMIC: Check content registry first for SEO metadata
  // This handles all product pages with content files (including non-English pages)
  const content = getContentBySlug(params.locale, params.slug);
  if (content?.seo) {
    const alternateUrls = getAlternateLanguageUrls(content.seo.appId || params.slug, params.locale);
    return {
      title: content.seo.title,
      description: content.seo.description,
      keywords: content.seo.keywords,
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: content.seo.canonicalUrl || `https://www.lessoncraftstudio.com/${params.locale}/apps/${params.slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
        url: content.seo.canonicalUrl || `https://www.lessoncraftstudio.com/${params.locale}/apps/${params.slug}`,
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy hardcoded metadata (kept for backwards compatibility)
  // Product pages have custom SEO metadata
  if (params.slug === 'addition-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Addition Worksheets | Professional Math Worksheet Generator',
      description: 'Create professional addition worksheets with our math worksheet generator. Generate custom printable worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'addition worksheets, math worksheets, kindergarten worksheets, printable worksheets, addition practice, math worksheet generator, free worksheets, first grade math, addition problems, visual addition',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/addition-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Addition Worksheets | LessonCraftStudio',
        description: 'Create professional addition worksheets with our math worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/addition-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Word Search Worksheets product page SEO
  if (params.slug === 'word-search-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Word Search Worksheets | Word Search Generator for Kindergarten',
      description: 'Create professional word search worksheets in seconds with our word search generator. Perfect for kindergarten teachers, first grade educators, and homeschool parents. Generate custom word search puzzles using images or words in just three clicks.',
      keywords: 'word search worksheets, word search generator, kindergarten worksheets, printable worksheets, word search puzzles, free worksheets, first grade worksheets, vocabulary worksheets, sight words worksheets, phonics worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
        },
      },
      openGraph: {
        title: 'Free Printable Word Search Worksheets | LessonCraftStudio',
        description: 'Create professional word search worksheets with our word search generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Word Search Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'ordletar-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Gratis Ordletare Generator | Arbetsblad för Förskoleklass och Lågstadiet',
      description: 'Skapa professionella ordletarpussel med vår gratis ordletare generator. Perfekt för förskoleklass material och lågstadiet. Ladda ner arbetsblad gratis som högkvalitativa PDF-filer på under tre minuter.',
      keywords: 'ordletare generator, arbetsblad gratis, förskoleklass material, matematik arbetsblad, ordletarpussel, gratis arbetsblad, lågstadiet, bokstäver lära sig, skriva bokstäver, målarbilder barn',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
        },
      },
      openGraph: {
        title: 'Gratis Ordletare Generator | LessonCraftStudio',
        description: 'Skapa professionella ordletarpussel med vår gratis ordletare generator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish slug to new slug (for backwards compatibility)
  if (params.slug === 'word-search-worksheets' && params.locale === 'sv') {
    return {
      title: 'Gratis Ordletare Generator | Arbetsblad för Förskoleklass och Lågstadiet',
      description: 'Skapa professionella ordletarpussel med vår gratis ordletare generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad', // Point to new URL
      },
    };
  }

  // Word Search Worksheets - German product page SEO (new German slug)
  if (params.slug === 'suchsel-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Suchsel Generator - Kostenlose Arbeitsblätter Grundschule - Buchstaben lernen und Deutsch Arbeitsblätter',
      description: 'Erstellen Sie professionelle Suchsel-Arbeitsblätter für die Grundschule mit unserem kostenlosen Generator. Perfekt für Buchstaben lernen, Deutsch Arbeitsblätter und Vorschule Arbeitsblätter. Der Suchsel Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse bis 3. Klasse.',
      keywords: 'suchsel generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
        },
      },
      openGraph: {
        title: 'Suchsel Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Suchsel-Arbeitsblätter für die Grundschule mit unserem kostenlosen Generator. Perfekt für Buchstaben lernen und Deutsch Arbeitsblätter.',
        url: 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German slug to new slug (for backwards compatibility)
  if (params.slug === 'word-search-worksheets' && params.locale === 'de') {
    return {
      title: 'Suchsel Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Suchsel-Arbeitsblätter mit unserem kostenlosen Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Word Search Worksheets - French product page SEO (new French slug)
  if (params.slug === 'mots-caches-fiches' && params.locale === 'fr') {
    return {
      title: 'Générateur de Mots Mêlés Gratuit | Fiches à Imprimer Gratuit Maternelle et CP',
      description: 'Créez des mots mêlés professionnels avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
      keywords: 'mots mêlés, générateur mots cachés, fiches maternelle, fiches à imprimer gratuit, exercices CP, apprendre à lire, alphabet, graphisme maternelle, tables de multiplication, coloriage à imprimer',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/mots-caches-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/ordletar-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchsel-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/mots-caches-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-search-worksheets',
        },
      },
      openGraph: {
        title: 'Générateur de Mots Mêlés Gratuit | LessonCraftStudio',
        description: 'Créez des mots mêlés professionnels avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/mots-caches-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French slug to new slug (for backwards compatibility)
  if (params.slug === 'word-search-worksheets' && params.locale === 'fr') {
    return {
      title: 'Générateur de Mots Mêlés Gratuit - Fiches Maternelle',
      description: 'Créez des mots mêlés professionnels avec notre générateur de fiches gratuit.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/mots-caches-fiches', // Point to new URL
      },
    };
  }

  // Addition Worksheets - French product page SEO (new French slug)
  if (params.slug === 'addition-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches d\'Addition à Imprimer Gratuit | Générateur d\'Exercices Maths pour Maternelle et CP',
      description: 'Créez des fiches d\'addition professionnelles avec notre générateur d\'exercices maths. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
      keywords: 'fiches addition, exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, addition avec images, générateur fiches, mathématiques maternelle, calcul visuel',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/addition-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/addition-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/addition-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/addition-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches d\'Addition à Imprimer Gratuit | LessonCraftStudio',
        description: 'Créez des fiches d\'addition professionnelles avec notre générateur d\'exercices maths. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French addition slug to new slug (for backwards compatibility)
  if (params.slug === 'addition-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches d\'Addition à Imprimer Gratuit - Générateur d\'Exercices Maths',
      description: 'Créez des fiches d\'addition professionnelles avec notre générateur d\'exercices maths gratuit.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches', // Point to new URL
      },
    };
  }

  // Alphabet Train Worksheets - French product page SEO (new French slug)
  if (params.slug === 'train-alphabet-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches Alphabet à Imprimer Gratuit | Générateur de Fiches Maternelle pour Apprendre les Lettres',
      description: 'Créez des fiches alphabet professionnelles avec notre générateur de train alphabet multilingue. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
      keywords: 'fiches alphabet, fiches maternelle, apprendre les lettres, fiches à imprimer gratuit, exercices CP, exercices CE1, train alphabet, générateur fiches, graphisme maternelle, coloriage à imprimer',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/train-alphabet-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/alfabettag-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/alphabet-zug-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/train-alphabet-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches Alphabet à Imprimer Gratuit | LessonCraftStudio',
        description: 'Créez des fiches alphabet professionnelles avec notre générateur de train alphabet. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/train-alphabet-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French alphabet-train slug to new slug (for backwards compatibility)
  if (params.slug === 'alphabet-train-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches Alphabet à Imprimer Gratuit - Générateur de Fiches Maternelle',
      description: 'Créez des fiches alphabet professionnelles avec notre générateur de train alphabet multilingue.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/train-alphabet-fiches', // Point to new URL
      },
    };
  }

  // Coloring Worksheets - French product page SEO (new French slug)
  if (params.slug === 'coloriage-fiches' && params.locale === 'fr') {
    return {
      title: 'Coloriage à Imprimer Gratuit | Générateur de Fiches Maternelle et CP',
      description: 'Créez des pages de coloriage personnalisées avec notre générateur de fiches maternelle. Plus de 3000 images adaptées aux enfants. Téléchargez en PDF haute qualité 300 DPI. Parfait pour les enseignants de maternelle, CP et CE1.',
      keywords: 'coloriage à imprimer, fiches maternelle, graphisme maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, coloriage enfant, générateur coloriage, coloriage maternelle, pages de coloriage',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/coloriage-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/coloring-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/malarbilder-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/malvorlagen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/coloriage-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/coloring-worksheets',
        },
      },
      openGraph: {
        title: 'Coloriage à Imprimer Gratuit | LessonCraftStudio',
        description: 'Créez des pages de coloriage personnalisées avec notre générateur de fiches maternelle. Plus de 3000 images adaptées aux enfants.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/coloriage-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French coloring slug to new slug (for backwards compatibility)
  if (params.slug === 'coloring-worksheets' && params.locale === 'fr') {
    return {
      title: 'Coloriage à Imprimer Gratuit - Générateur de Fiches Maternelle',
      description: 'Créez des pages de coloriage personnalisées avec notre générateur de fiches maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/coloriage-fiches', // Point to new URL
      },
    };
  }

  // Alphabet Train Worksheets - German product page SEO (new German slug)
  if (params.slug === 'alphabet-zug-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Alphabet-Zug Generator - Kostenlose Arbeitsblätter Grundschule zum Buchstaben lernen',
      description: 'Erstellen Sie professionelle Arbeitsblätter zum Buchstaben lernen mit unserem Alphabet-Zug Generator. Perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule. Kombinieren Sie mit Schwungübungen und Ausmalbilder für komplette Lernpakete.',
      keywords: 'alphabet zug, buchstaben lernen, arbeitsblätter grundschule, vorschule arbeitsblätter, kostenlose arbeitsblätter, deutsch arbeitsblätter, schwungübungen, ausmalbilder, abc lernen, alphabet arbeitsblätter',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/alphabet-zug-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/alfabettag-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/alphabet-zug-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets',
        },
      },
      openGraph: {
        title: 'Alphabet-Zug Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Arbeitsblätter zum Buchstaben lernen mit unserem Alphabet-Zug Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/alphabet-zug-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German alphabet-train slug to new slug (for backwards compatibility)
  if (params.slug === 'alphabet-train-worksheets' && params.locale === 'de') {
    return {
      title: 'Alphabet-Zug Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Alphabet-Zug Arbeitsblätter mit unserem kostenlosen Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/alphabet-zug-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Coloring Worksheets - German product page SEO (new German slug)
  if (params.slug === 'malvorlagen-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Malvorlagen-Generator - Kostenlose Ausmalbilder für Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
      description: 'Erstelle professionelle Malvorlagen und Ausmalbilder mit unserem Malvorlagen-Generator für Arbeitsblätter Grundschule. Kombiniere Ausmalbilder mit Schwungübungen, Buchstaben lernen und Mathe Arbeitsblättern. Perfekt für Vorschule Arbeitsblätter und kostenlose Arbeitsblätter 1. Klasse.',
      keywords: 'malvorlagen generator, ausmalbilder, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, schwungübungen, buchstaben lernen, mathe arbeitsblätter, deutsch arbeitsblätter, einmaleins',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/malvorlagen-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/coloring-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/malarbilder-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/malvorlagen-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/coloring-worksheets',
        },
      },
      openGraph: {
        title: 'Malvorlagen-Generator - Kostenlose Ausmalbilder für Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstelle professionelle Malvorlagen und Ausmalbilder mit unserem Malvorlagen-Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/malvorlagen-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German coloring slug to new slug (for backwards compatibility)
  if (params.slug === 'coloring-worksheets' && params.locale === 'de') {
    return {
      title: 'Malvorlagen-Generator - Kostenlose Ausmalbilder für Arbeitsblätter Grundschule',
      description: 'Erstelle professionelle Malvorlagen und Ausmalbilder mit unserem kostenlosen Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/malvorlagen-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Math Worksheets - German product page SEO (new German slug)
  if (params.slug === 'mathe-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Mathe-Rätsel Generator - Kostenlose Mathe Arbeitsblätter Grundschule - Rechnen lernen Vorschule',
      description: 'Erstellen Sie professionelle Mathe Arbeitsblätter mit visuellen Rechenrätseln für Grundschule und Vorschule. Perfekt für Rechnen lernen, Arbeitsblätter Grundschule und Vorschule Arbeitsblätter. Der Mathe-Rätsel Generator eignet sich ideal für kostenlose Arbeitsblätter in der 1. Klasse.',
      keywords: 'mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1 klasse, einmaleins, schwungübungen, ausmalbilder, deutsch arbeitsblätter',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
        },
      },
      openGraph: {
        title: 'Mathe-Rätsel Generator - Kostenlose Mathe Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Mathe Arbeitsblätter mit visuellen Rechenrätseln. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German math-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'math-worksheets' && params.locale === 'de') {
    return {
      title: 'Mathe-Rätsel Generator - Kostenlose Mathe Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Mathe Arbeitsblätter mit visuellen Rechenrätseln für Grundschule.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // German Find and Count (Zählübungen) Worksheets product page SEO
  if (params.slug === 'suchen-und-zaehlen-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Zählübungen-Generator - Kostenlose Arbeitsblätter Grundschule für Vorschule und Mathe Arbeitsblätter',
      description: 'Erstellen Sie professionelle Suchen-und-Zählen-Arbeitsblätter mit unserem Generator für Arbeitsblätter Grundschule. Kombinieren Sie visuelle Diskriminierung mit Zählübungen für Vorschule Arbeitsblätter. Perfekt für Mathe Arbeitsblätter und kostenlose Arbeitsblätter 1. Klasse.',
      keywords: 'zählübungen generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, ich sehe was was du nicht siehst, zählen lernen, visuelle wahrnehmung, einmaleins',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-och-rakna-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/buscar-contar-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets',
        },
      },
      openGraph: {
        title: 'Zählübungen-Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Suchen-und-Zählen-Arbeitsblätter mit unserem Generator für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German find-and-count-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'find-and-count-worksheets' && params.locale === 'de') {
    return {
      title: 'Zählübungen-Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Suchen-und-Zählen-Arbeitsblätter mit unserem Generator für Vorschule und Grundschule.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // German Matching (Zuordnungs) Worksheets product page SEO
  if (params.slug === 'zuordnungs-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Zuordnungs-Arbeitsblätter - Kostenlose Arbeitsblätter Grundschule - Zuordnungs-Generator für Vorschule und Buchstaben lernen',
      description: 'Erstellen Sie professionelle Zuordnungsübungen mit unserem Zuordnungs-Generator. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter, Buchstaben lernen und Deutsch Arbeitsblätter. Laden Sie kostenlose Arbeitsblätter in unter 3 Minuten herunter.',
      keywords: 'zuordnungs arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/zuordnungs-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/matching-worksheets',
          'de': 'https://www.lessoncraftstudio.com/de/apps/zuordnungs-arbeitsblaetter',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/matchnings-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/matching-worksheets',
        },
      },
      openGraph: {
        title: 'Zuordnungs-Arbeitsblätter - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Zuordnungsübungen mit unserem Zuordnungs-Generator für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/zuordnungs-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German matching-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'matching-worksheets' && params.locale === 'de') {
    return {
      title: 'Zuordnungs-Arbeitsblätter - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Zuordnungsübungen mit unserem Zuordnungs-Generator für Vorschule und Grundschule.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/zuordnungs-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // German Picture Bingo (Bilder-Bingo) Worksheets product page SEO
  if (params.slug === 'bilder-bingo-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Bilder-Bingo Generator - Kostenlose Arbeitsblätter für Vorschule und Grundschule',
      description: 'Erstellen Sie professionelle Bilder-Bingo-Karten mit unserem Bingo-Generator. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter, Buchstaben lernen und Rechnen lernen. Laden Sie kostenlose Arbeitsblätter in unter 3 Minuten herunter.',
      keywords: 'bilder bingo arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, buchstaben lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilder-bingo-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilder-bingo-arbeitsblaetter',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildlotto-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets',
        },
      },
      openGraph: {
        title: 'Bilder-Bingo Generator - Kostenlose Arbeitsblätter für Vorschule und Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Bilder-Bingo-Karten mit unserem Bingo-Generator für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/bilder-bingo-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German picture-bingo-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'picture-bingo-worksheets' && params.locale === 'de') {
    return {
      title: 'Bilder-Bingo Generator - Kostenlose Arbeitsblätter für Vorschule und Grundschule',
      description: 'Erstellen Sie professionelle Bilder-Bingo-Karten mit unserem Bingo-Generator für Vorschule und Grundschule.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilder-bingo-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // German Chart Count (Bilddiagramm) Worksheets product page SEO
  if (params.slug === 'bilddiagramm-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Bilddiagramm Arbeitsblätter Generator - Kostenlose Arbeitsblätter für Mathe in der Grundschule und Vorschule',
      description: 'Erstellen Sie professionelle Bilddiagramm Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator. Mit Ihrem Voller Zugang Abo erhalten Sie unbegrenzten Zugang ohne zusätzliche Gebühren pro Arbeitsblatt. Generieren Sie druckfertige Arbeitsblätter Grundschule und Vorschule Arbeitsblätter perfekt zum Zählen und für Datenvisualisierung.',
      keywords: 'bilddiagramm arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, deutsch arbeitsblätter, einmaleins, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilddiagramm-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilddiagramm-arbeitsblaetter',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/diagram-rakning-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets',
        },
      },
      openGraph: {
        title: 'Bilddiagramm Arbeitsblätter Generator - Kostenlose Arbeitsblätter für Mathe | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Bilddiagramm Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator für Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/bilddiagramm-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German chart-count-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'chart-count-worksheets' && params.locale === 'de') {
    return {
      title: 'Bilddiagramm Arbeitsblätter Generator - Kostenlose Arbeitsblätter für Mathe',
      description: 'Erstellen Sie professionelle Bilddiagramm Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilddiagramm-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // German Code Addition (Bilder-Additions) Worksheets product page SEO
  if (params.slug === 'bilder-additions-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Bilder-Additions-Generator - Mathe Arbeitsblätter Grundschule - Rechnen lernen mit Bildern',
      description: 'Erstellen Sie professionelle Bilder-Additions-Arbeitsblätter für Grundschule und Vorschule mit unserem Generator. Perfekt für Rechnen lernen, Mathe Arbeitsblätter und Vorschule Arbeitsblätter. Der Bilder-Additions-Generator eignet sich ideal für kostenlose Arbeitsblätter mit visueller Mathematik.',
      keywords: 'bilder addition generator, mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1 klasse, einmaleins, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilder-additions-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/code-addition-worksheets',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilder-additions-arbeitsblaetter',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/kodaddition-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/code-addition-worksheets',
        },
      },
      openGraph: {
        title: 'Bilder-Additions-Generator - Mathe Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Bilder-Additions-Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator für Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/bilder-additions-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German code-addition-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'code-addition-worksheets' && params.locale === 'de') {
    return {
      title: 'Bilder-Additions-Generator - Mathe Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Bilder-Additions-Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilder-additions-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // German Find Objects (Suchbilder) Worksheets product page SEO
  if (params.slug === 'suchbilder-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Suchbilder Generator - Kostenlose Arbeitsblätter Grundschule - Ich-Sehe-Was Vorschule Arbeitsblätter',
      description: 'Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Mathe Arbeitsblätter. Generieren Sie Ich-Sehe-Was und Welches-Passt-Nicht Aktivitäten.',
      keywords: 'suchbilder arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, ich sehe was, welches passt nicht, visuelle wahrnehmung, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-foremal-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets',
        },
      },
      openGraph: {
        title: 'Suchbilder Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German find-objects-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'find-objects-worksheets' && params.locale === 'de') {
    return {
      title: 'Suchbilder Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Suchbilder-Arbeitsblätter mit unserem Generator für visuelle Wahrnehmung.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Crossword Worksheets - German product page SEO (new German slug)
  if (params.slug === 'bilderkreuzwortraetsel-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Bilderkreuzworträtsel Generator - Kostenlose Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
      description: 'Erstellen Sie professionelle Bilderkreuzworträtsel mit unserem Kreuzworträtsel-Generator. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Deutsch Arbeitsblätter. Kinder verbinden Bilder mit Rechtschreibung. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
      keywords: 'bilderkreuzworträtsel, kreuzworträtsel generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, deutsch arbeitsblätter, buchstaben lernen, mathe arbeitsblätter, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilderkreuzwortraetsel-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/crossword-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilderkreuzwortraetsel-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/crossword-worksheets',
        },
      },
      openGraph: {
        title: 'Bilderkreuzworträtsel Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Bilderkreuzworträtsel mit unserem Kreuzworträtsel-Generator. Perfekt für Arbeitsblätter Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/bilderkreuzwortraetsel-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German crossword-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'crossword-worksheets' && params.locale === 'de') {
    return {
      title: 'Bilderkreuzworträtsel Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Bilderkreuzworträtsel mit unserem Kreuzworträtsel-Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilderkreuzwortraetsel-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Cryptogram Worksheets - German product page SEO (new German slug)
  if (params.slug === 'bildkryptogramm-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Bilder-Kryptogramm Generator - Kostenlose Arbeitsblätter Grundschule und Vorschule Arbeitsblätter',
      description: 'Erstellen Sie professionelle Bilder-Kryptogramm Arbeitsblätter mit unserem Kryptogramm-Generator. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Deutsch Arbeitsblätter. Schüler entschlüsseln geheime Botschaften mit Bildcodes. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
      keywords: 'bilder-kryptogramm, kryptogramm generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, deutsch arbeitsblätter, buchstaben lernen, mathe arbeitsblätter, schwungübungen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bildkryptogramm-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/cryptogram-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildkryptogram-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bildkryptogramm-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/cryptogram-worksheets',
        },
      },
      openGraph: {
        title: 'Bilder-Kryptogramm Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Bilder-Kryptogramm Arbeitsblätter mit unserem Kryptogramm-Generator. Perfekt für Arbeitsblätter Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/bildkryptogramm-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German cryptogram-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'cryptogram-worksheets' && params.locale === 'de') {
    return {
      title: 'Bilder-Kryptogramm Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Bilder-Kryptogramm Arbeitsblätter mit unserem Kryptogramm-Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bildkryptogramm-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Math Puzzle Worksheets - German product page SEO (new German slug)
  if (params.slug === 'mathe-raetsel-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Mathe-Rätsel Generator - Kostenlose Arbeitsblätter Grundschule und Vorschule Arbeitsblätter zum Ausdrucken',
      description: 'Erstellen Sie professionelle Mathe-Rätsel Arbeitsblätter mit unserem Generator. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Rechnen lernen. Kinder lösen Additions- und Subtraktionsaufgaben um Bilderrätsel zu vervollständigen. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
      keywords: 'mathe-rätsel, mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, rechnen 1. klasse, einmaleins, addition subtraktion, ausdrucken',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/mathe-raetsel-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/mattepussel-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/mathe-raetsel-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets',
        },
      },
      openGraph: {
        title: 'Mathe-Rätsel Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Mathe-Rätsel Arbeitsblätter mit unserem Generator. Perfekt für Arbeitsblätter Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/mathe-raetsel-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German math-puzzle-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'math-puzzle-worksheets' && params.locale === 'de') {
    return {
      title: 'Mathe-Rätsel Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Mathe-Rätsel Arbeitsblätter mit unserem Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/mathe-raetsel-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Math Puzzle Worksheets - French product page SEO (new French slug)
  if (params.slug === 'puzzle-maths-fiches' && params.locale === 'fr') {
    return {
      title: 'Puzzle Maths à Imprimer | Générateur d\'Exercices de Décodage pour Maternelle et CP',
      description: 'Créez des puzzles mathématiques de décodage par symboles avec notre générateur. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité.',
      keywords: 'puzzle maths, exercices maths, décodage symboles, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, énigmes mathématiques, générateur fiches, calcul visuel',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/puzzle-maths-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/mattepussel-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/mathe-raetsel-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/puzzle-maths-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets',
        },
      },
      openGraph: {
        title: 'Puzzle Maths à Imprimer | LessonCraftStudio',
        description: 'Créez des puzzles mathématiques de décodage par symboles avec notre générateur. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/puzzle-maths-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French math-puzzle-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'math-puzzle-worksheets' && params.locale === 'fr') {
    return {
      title: 'Puzzle Maths à Imprimer - Générateur d\'Exercices de Décodage',
      description: 'Créez des puzzles mathématiques de décodage par symboles avec notre générateur.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/puzzle-maths-fiches', // Point to new URL
      },
    };
  }

  // Math Worksheets - French product page SEO (new French slug)
  if (params.slug === 'exercices-maths-fiches' && params.locale === 'fr') {
    return {
      title: 'Exercices Maths à Imprimer | Générateur de Fiches Maternelle CP CE1',
      description: 'Créez des exercices maths avec notre générateur de fiches maternelle. Fiches à imprimer gratuit pour CP et CE1. Puzzles de décodage visuels. PDF 300 DPI. Licence commerciale incluse.',
      keywords: 'exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, générateur fiches maths, puzzles mathématiques, calcul maternelle, graphisme maternelle, tables de multiplication',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/exercices-maths-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/exercices-maths-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
        },
      },
      openGraph: {
        title: 'Exercices Maths à Imprimer | LessonCraftStudio',
        description: 'Créez des exercices maths avec notre générateur de fiches maternelle. Fiches à imprimer gratuit pour CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/exercices-maths-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Math Worksheets - French legacy redirect (old English slug in French locale)
  if (params.slug === 'math-worksheets' && params.locale === 'fr') {
    return {
      title: 'Exercices Maths à Imprimer | LessonCraftStudio',
      description: 'Page déplacée. Veuillez visiter la nouvelle URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/exercices-maths-fiches', // Point to new URL
      },
    };
  }

  // Math Worksheets - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'acertijos-matematicos-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas de Matemáticas para Imprimir | Generador de Ejercicios Matemáticas Gratis',
      description: 'Crea fichas de matemáticas profesionales con nuestro generador de ejercicios matemáticas. Genera fichas para imprimir personalizadas perfectas para preescolar y primaria. Descarga ejercicios matemáticas en PDF de alta calidad en menos de 3 minutos.',
      keywords: 'fichas de matemáticas, ejercicios matemáticas, fichas para imprimir, fichas infantil, fichas preescolar, grafomotricidad, lectoescritura, aprender los números, material educativo gratis, fichas gratis, acertijos matemáticos',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/acertijos-matematicos-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/mathe-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/exercices-maths-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/acertijos-matematicos-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas de Matemáticas para Imprimir | LessonCraftStudio',
        description: 'Crea fichas de matemáticas profesionales con nuestro generador de ejercicios matemáticas. Perfectas para preescolar y primaria.',
        url: 'https://www.lessoncraftstudio.com/es/apps/acertijos-matematicos-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Math Worksheets - Spanish legacy redirect (old English slug in Spanish locale)
  if (params.slug === 'math-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas de Matemáticas para Imprimir | LessonCraftStudio',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/acertijos-matematicos-fichas', // Point to new URL
      },
    };
  }

  // Word Scramble - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'letras-revueltas-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir de Letras Revueltas | Generador de Ejercicios de Lectoescritura para Preescolar',
      description: 'Crea fichas profesionales de letras revueltas con nuestro generador educativo. Genera fichas personalizadas de lectoescritura perfectas para preescolar y primaria. Descarga ejercicios de alta calidad en PDF en menos de 3 minutos.',
      keywords: 'fichas para imprimir, letras revueltas, fichas preescolar, ejercicios de lectoescritura, fichas infantil, grafomotricidad, abecedario, fichas gratis, material educativo gratis, dibujos para colorear',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/letras-revueltas-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-scramble-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/ordpussel-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/buchstabensalat-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/mots-melanges-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/letras-revueltas-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-scramble-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas para Imprimir de Letras Revueltas | LessonCraftStudio',
        description: 'Crea fichas profesionales de letras revueltas con nuestro generador educativo. Perfectas para preescolar y primaria.',
        url: 'https://www.lessoncraftstudio.com/es/apps/letras-revueltas-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Word Scramble - Spanish legacy redirect (old English slug in Spanish locale)
  if (params.slug === 'word-scramble-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir de Letras Revueltas | LessonCraftStudio',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/letras-revueltas-fichas', // Point to new URL
      },
    };
  }

  // Find and Count - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'buscar-contar-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir Veo Veo | Material Educativo Gratis para Encontrar y Contar Objetos',
      description: 'Crea fichas para imprimir de buscar y contar objetos con nuestro generador profesional. Perfecto para maestros de educación infantil y preescolar. Genera fichas gratis ilimitadas en PDF de alta calidad en menos de 3 minutos.',
      keywords: 'fichas para imprimir, veo veo, buscar y contar, fichas preescolar, fichas infantil, fichas gratis, material educativo gratis, grafomotricidad, números, ejercicios matemáticas',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/buscar-contar-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-och-rakna-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/buscar-contar-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas para Imprimir Veo Veo | LessonCraftStudio',
        description: 'Crea fichas para imprimir de buscar y contar objetos con nuestro generador profesional. Perfecto para preescolar y primaria.',
        url: 'https://www.lessoncraftstudio.com/es/apps/buscar-contar-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Find and Count - Spanish legacy redirect (old English slug in Spanish locale)
  if (params.slug === 'find-and-count-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir Veo Veo | LessonCraftStudio',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/buscar-contar-fichas', // Point to new URL
      },
    };
  }

  // Picture Bingo - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'bingo-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas de Bingo para Imprimir | Generador de Bingo con Imágenes para Educación Infantil y Preescolar',
      description: 'Crea fichas de bingo profesionales con nuestro generador de bingo con imágenes. Genera fichas para imprimir perfectas para educación infantil, preescolar y primaria. Descarga fichas gratis de alta calidad en formato PDF en menos de 3 minutos.',
      keywords: 'fichas de bingo, bingo con imágenes, fichas para imprimir, fichas infantil, fichas preescolar, material educativo gratis, fichas gratis, abecedario, números, grafomotricidad, lectoescritura, dibujos para colorear',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/bingo-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildlotto-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilder-bingo-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/bingo-images-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/bingo-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas de Bingo para Imprimir | LessonCraftStudio',
        description: 'Crea fichas de bingo profesionales con nuestro generador de bingo con imágenes. Perfecto para educación infantil y preescolar.',
        url: 'https://www.lessoncraftstudio.com/es/apps/bingo-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Picture Bingo - Spanish legacy redirect (old English slug in Spanish locale)
  if (params.slug === 'picture-bingo-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas de Bingo para Imprimir | LessonCraftStudio',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/bingo-fichas', // Point to new URL
      },
    };
  }

  // Sudoku for Kids - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'sudoku-fichas-ninos' && params.locale === 'es') {
    return {
      title: 'Sudoku para Niños - Fichas de Sudoku Visual para Imprimir - Material Educativo Gratis',
      description: 'Crea rompecabezas de sudoku visual coloridos diseñados específicamente para niños de preescolar y educación primaria. Tu suscripción Paquete Esencial te permite generar fichas de sudoku ilimitadas. Descarga fichas para imprimir de alta calidad en menos de 3 minutos.',
      keywords: 'sudoku para niños, sudoku visual, fichas de sudoku, fichas para imprimir, fichas infantil, fichas preescolar, material educativo gratis, fichas gratis, rompecabezas lógica, pensamiento crítico, números, abecedario',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/sudoku-fichas-ninos',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildsudoku-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/kinder-sudoku-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/sudoku-enfants-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/sudoku-fichas-ninos',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets',
        },
      },
      openGraph: {
        title: 'Sudoku para Niños - Fichas de Sudoku Visual | LessonCraftStudio',
        description: 'Crea rompecabezas de sudoku visual coloridos para niños de preescolar y primaria. Perfecto para desarrollar pensamiento lógico.',
        url: 'https://www.lessoncraftstudio.com/es/apps/sudoku-fichas-ninos',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Sudoku for Kids - Spanish legacy redirect (old English slug in Spanish locale)
  if (params.slug === 'sudoku-worksheets' && params.locale === 'es') {
    return {
      title: 'Sudoku para Niños - Fichas de Sudoku Visual | LessonCraftStudio',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/sudoku-fichas-ninos', // Point to new URL
      },
    };
  }

  // Big Small - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'grande-pequeno-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas de Grande y Pequeño para Imprimir - Generador de Fichas Infantil y Preescolar',
      description: 'Crea fichas de comparación de tamaños profesionales con nuestro generador de fichas infantil. Tu suscripción a Acceso Completo te da acceso ilimitado a la creación de fichas sin costos adicionales por ficha. Descarga fichas gratis en formato PDF de alta calidad en menos de 3 minutos.',
      keywords: 'fichas grande pequeño, fichas para imprimir, fichas infantil, fichas preescolar, material educativo gratis, fichas gratis, comparación de tamaños, ejercicios matemáticas, grafomotricidad, lectoescritura, dibujos para colorear',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/grande-pequeno-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/big-small-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/stort-litet-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/gross-klein-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/grand-petit-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/grande-pequeno-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/big-small-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas de Grande y Pequeño para Imprimir | LessonCraftStudio',
        description: 'Crea fichas de comparación de tamaños profesionales con nuestro generador de fichas infantil. Perfecto para preescolar y educación infantil.',
        url: 'https://www.lessoncraftstudio.com/es/apps/grande-pequeno-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Big Small - Spanish legacy redirect (old English slug in Spanish locale)
  if (params.slug === 'big-small-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas de Grande y Pequeño | LessonCraftStudio',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/grande-pequeno-fichas', // Point to new URL
      },
    };
  }

  // Chart Count (Gráficos de Conteo) - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'graficos-conteo-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas de Gráficos con Imágenes para Imprimir | Generador de Fichas de Matemáticas para Preescolar y Primaria',
      description: 'Crea fichas de gráficos con imágenes profesionales con nuestro generador especializado. Los gráficos de conteo con imágenes enseñan a los niños a contar, clasificar y representar datos visualmente. Descarga fichas gratis de alta calidad en formato PDF en menos de 3 minutos.',
      keywords: 'fichas de gráficos, gráficos con imágenes, fichas para imprimir, fichas infantil, fichas preescolar, fichas de matemáticas, ejercicios matemáticas, material educativo gratis, fichas gratis, aprender los números, grafomotricidad, lectoescritura, dibujos para colorear, tablas de multiplicar',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/graficos-conteo-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/diagram-rakning-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilddiagramm-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/graphique-images-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/graficos-conteo-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas de Gráficos con Imágenes para Imprimir | LessonCraftStudio',
        description: 'Crea fichas de gráficos con imágenes profesionales. Los gráficos de conteo con imágenes enseñan a los niños a contar, clasificar y representar datos visualmente.',
        url: 'https://www.lessoncraftstudio.com/es/apps/graficos-conteo-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Chart Count (Gráficos de Conteo) - Spanish legacy redirect (old English slug in Spanish locale)
  if (params.slug === 'chart-count-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas de Gráficos con Imágenes | LessonCraftStudio',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/graficos-conteo-fichas', // Point to new URL
      },
    };
  }

  // Code Addition Worksheets - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'suma-codigo-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas de Matemáticas con Código de Imágenes | Generador de Fichas para Imprimir para Preescolar',
      description: 'Crea fichas de matemáticas únicas con nuestro generador de código de imágenes. Fichas infantil personalizadas perfectas para preescolar y primer grado. Descarga fichas gratis en PDF de alta calidad en menos de 3 minutos.',
      keywords: 'fichas de matemáticas, fichas para imprimir, fichas infantil, fichas preescolar, material educativo gratis, ejercicios matemáticas, suma, código imágenes, sumas con dibujos',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/suma-codigo-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/code-addition-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/kodaddition-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilder-additions-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/addition-codee-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/suma-codigo-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/code-addition-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas de Matemáticas con Código de Imágenes | LessonCraftStudio',
        description: 'Crea fichas de matemáticas únicas con nuestro generador de código de imágenes. Fichas infantil personalizadas perfectas para preescolar y primer grado.',
        url: 'https://www.lessoncraftstudio.com/es/apps/suma-codigo-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Spanish code-addition-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'code-addition-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas de Matemáticas con Código de Imágenes - Generador de Fichas para Imprimir',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/suma-codigo-fichas', // Point to new URL
      },
    };
  }

  // Draw and Color Worksheets - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'dibujo-cuadricula-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir Gratis | Generador de Dibujos para Colorear en Cuadrícula',
      description: 'Crea fichas de dibujo en cuadrícula profesionales con nuestro generador. Perfecto para maestros de educación infantil que necesitan fichas para imprimir de grafomotricidad. Material educativo gratis en PDF de alta calidad.',
      keywords: 'fichas para imprimir, fichas infantil, fichas preescolar, dibujos para colorear, grafomotricidad, material educativo gratis, fichas gratis, cuadrícula',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/dibujo-cuadricula-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/rutritning-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/rasterzeichnen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/dessin-quadrillage-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/dibujo-cuadricula-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas para Imprimir Gratis | LessonCraftStudio',
        description: 'Crea fichas de dibujo en cuadrícula profesionales con nuestro generador. Perfecto para maestros de educación infantil.',
        url: 'https://www.lessoncraftstudio.com/es/apps/dibujo-cuadricula-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Spanish draw-and-color-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'draw-and-color-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir Gratis - Generador de Dibujos para Colorear en Cuadrícula',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/dibujo-cuadricula-fichas', // Point to new URL
      },
    };
  }

  // Find Objects Worksheets - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'buscar-objetos-fichas' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir de Buscar Objetos | Generador de Fichas Infantil para Preescolar y Primaria',
      description: 'Crea fichas para imprimir de buscar objetos con nuestro generador profesional. Genera fichas preescolar de Veo Veo y encuentra el diferente. Descarga fichas de alta calidad en PDF en menos de 3 minutos. Ideal para educación infantil y primaria.',
      keywords: 'fichas para imprimir, buscar objetos, veo veo, encuentra el diferente, fichas preescolar, fichas infantil, material educativo gratis, discriminación visual, grafomotricidad, observación visual',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/buscar-objetos-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-foremal-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/buscar-objetos-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets',
        },
      },
      openGraph: {
        title: 'Fichas para Imprimir de Buscar Objetos | LessonCraftStudio',
        description: 'Crea fichas para imprimir de buscar objetos con nuestro generador profesional. Perfecto para maestros de educación infantil y primaria.',
        url: 'https://www.lessoncraftstudio.com/es/apps/buscar-objetos-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Grid Match Worksheets - Spanish product page SEO (new Spanish slug)
  if (params.slug === 'rompecabezas-cuadricula-fichas' && params.locale === 'es') {
    return {
      title: 'Rompecabezas de Cuadrícula | Generador de Fichas de Raster para Preescolar y Primaria',
      description: 'Crea rompecabezas de cuadrícula profesionales con nuestro generador de fichas para imprimir. Genera fichas de matemáticas personalizadas con rompecabezas visuales perfectos para educación infantil y primaria. Descarga en PDF en menos de 3 minutos.',
      keywords: 'rompecabezas cuadrícula, fichas para imprimir, fichas preescolar, fichas infantil, material educativo gratis, fichas de matemáticas, grafomotricidad, razonamiento espacial, puzzles visuales',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/rompecabezas-cuadricula-fichas',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/grid-match-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/rutnatsmatching-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/raster-puzzle-arbeitsblaetter',
          'es': 'https://www.lessoncraftstudio.com/es/apps/rompecabezas-cuadricula-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/grid-match-worksheets',
        },
      },
      openGraph: {
        title: 'Rompecabezas de Cuadrícula | LessonCraftStudio',
        description: 'Crea rompecabezas de cuadrícula profesionales con nuestro generador de fichas. Perfecto para maestros de educación infantil y primaria.',
        url: 'https://www.lessoncraftstudio.com/es/apps/rompecabezas-cuadricula-fichas',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Spanish grid-match-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'grid-match-worksheets' && params.locale === 'es') {
    return {
      title: 'Rompecabezas de Cuadrícula - Generador de Fichas Preescolar',
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/rompecabezas-cuadricula-fichas',
      },
    };
  }

  // Legacy: Redirect old Spanish find-objects-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'find-objects-worksheets' && params.locale === 'es') {
    return {
      title: 'Fichas para Imprimir de Buscar Objetos - Generador de Fichas Infantil',
      description: 'Página movida. Por favor visita la nueva URL.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/es/apps/buscar-objetos-fichas', // Point to new URL
      },
    };
  }

  // Find and Count Worksheets - French product page SEO (new French slug)
  if (params.slug === 'cherche-et-compte-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches Cherche et Compte à Imprimer Gratuit | Générateur de Fiches Maternelle et Exercices CP',
      description: 'Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de 3 minutes.',
      keywords: 'fiches cherche et compte, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à compter, dénombrement, générateur fiches',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-och-rakna-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchen-und-zaehlen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
          'es': 'https://www.lessoncraftstudio.com/es/apps/buscar-contar-fichas',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches Cherche et Compte à Imprimer Gratuit | LessonCraftStudio',
        description: 'Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French find-and-count-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'find-and-count-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches Cherche et Compte à Imprimer Gratuit - Générateur de Fiches Maternelle',
      description: 'Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches', // Point to new URL
      },
    };
  }

  // Matching Worksheets - French product page SEO (new French slug)
  if (params.slug === 'association-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches d\'Association | Fiches Maternelle et Exercices CP pour Apprendre à Lire',
      description: 'Créez des fiches d\'association professionnelles avec notre générateur MatchUp Maker. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de 3 minutes.',
      keywords: 'fiches association, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/association-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/matching-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/matchnings-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/zuordnungs-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/association-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/matching-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches d\'Association | LessonCraftStudio',
        description: 'Créez des fiches d\'association professionnelles avec notre générateur MatchUp Maker. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/association-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French matching-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'matching-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches d\'Association - Générateur de Fiches Maternelle',
      description: 'Créez des fiches d\'association professionnelles avec notre générateur MatchUp Maker.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/association-fiches', // Point to new URL
      },
    };
  }

  // Drawing Lines Worksheets - French product page SEO (new French slug)
  if (params.slug === 'graphisme-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches de Graphisme Maternelle | Fiches à Imprimer Gratuit pour l\'Écriture et la Motricité Fine',
      description: 'Créez des fiches de graphisme maternelle professionnelles avec notre générateur en ligne. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches pédagogiques. Téléchargez des exercices de tracé de lignes en PDF haute résolution en moins de 3 minutes.',
      keywords: 'fiches maternelle, graphisme maternelle, fiches à imprimer gratuit, écriture cursive, exercices CP, motricité fine, coloriage à imprimer, exercices maths, apprendre les lettres, tables de multiplication, exercices CE1, alphabet',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/graphisme-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/drawing-lines-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/rita-linjer-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/linien-ziehen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/graphisme-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/drawing-lines-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches de Graphisme Maternelle | LessonCraftStudio',
        description: 'Créez des fiches de graphisme maternelle professionnelles avec notre générateur en ligne. Développez la motricité fine et préparez l\'écriture cursive.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/graphisme-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // French Picture Bingo product page SEO (new French slug)
  if (params.slug === 'bingo-images-fiches' && params.locale === 'fr') {
    return {
      title: 'Générateur de Cartes Bingo Illustrées | Fiches Maternelle à Imprimer Gratuit et Exercices CP CE1',
      description: 'Créez des cartes bingo professionnelles avec notre générateur de fiches à imprimer gratuit. Votre abonnement Pack Essentiel vous offre une création illimitée de fiches maternelle sans frais supplémentaires par fiche. Téléchargez vos fiches de qualité professionnelle en PDF ou JPEG en moins de 3 minutes.',
      keywords: 'bingo images, cartes bingo, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, graphisme maternelle, jeux éducatifs, bingo alphabet, bingo maths, apprendre à lire',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/bingo-images-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildlotto-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilder-bingo-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/bingo-images-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets',
        },
      },
      openGraph: {
        title: 'Générateur de Cartes Bingo Illustrées | LessonCraftStudio',
        description: 'Créez des cartes bingo professionnelles avec notre générateur de fiches à imprimer gratuit. Parfait pour les enseignants de maternelle et du primaire.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/bingo-images-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French picture-bingo-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'picture-bingo-worksheets' && params.locale === 'fr') {
    return {
      title: 'Générateur de Cartes Bingo Illustrées | LessonCraftStudio',
      description: 'Créez des cartes bingo professionnelles avec notre générateur de fiches à imprimer gratuit.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/bingo-images-fiches', // Point to new URL
      },
    };
  }

  // Legacy: Redirect old French drawing-lines-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'drawing-lines-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches de Graphisme Maternelle - Générateur de Fiches',
      description: 'Créez des fiches de graphisme maternelle professionnelles avec notre générateur en ligne.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/graphisme-fiches', // Point to new URL
      },
    };
  }

  // French Chart Count product page SEO (new French slug)
  if (params.slug === 'graphique-images-fiches' && params.locale === 'fr') {
    return {
      title: 'Graphique en Images à Imprimer - Fiches Maternelle et Exercices CP pour Apprendre à Compter et Créer des Diagrammes',
      description: 'Créez des fiches pédagogiques de graphiques en images pour enseigner la représentation des données à vos élèves. Votre abonnement Accès Complet vous donne accès à la création illimitée de fiches sans frais supplémentaires. Générez des exercices de comptage et de graphiques en moins de 3 minutes.',
      keywords: 'graphique en images, fiches maternelle, exercices CP, fiches à imprimer gratuit, exercices maths, comptage maternelle, diagramme pictogramme, apprendre à compter, coloriage à imprimer, graphisme maternelle',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/graphique-images-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/diagram-rakning-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilddiagramm-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/graphique-images-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets',
        },
      },
      openGraph: {
        title: 'Graphique en Images à Imprimer | LessonCraftStudio',
        description: 'Créez des fiches pédagogiques de graphiques en images pour enseigner la représentation des données. Parfait pour maternelle et CP.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/graphique-images-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French chart-count-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'chart-count-worksheets' && params.locale === 'fr') {
    return {
      title: 'Graphique en Images à Imprimer | LessonCraftStudio',
      description: 'Créez des fiches pédagogiques de graphiques en images pour enseigner la représentation des données.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/graphique-images-fiches', // Point to new URL
      },
    };
  }

  // Draw and Color (Grid Drawing) - French product page SEO (new French slug)
  if (params.slug === 'dessin-quadrillage-fiches' && params.locale === 'fr') {
    return {
      title: 'Coloriage à Imprimer sur Quadrillage | Fiches Maternelle et Exercices CP',
      description: 'Créez des fiches de dessin sur quadrillage professionnelles avec notre générateur spécialisé. Générez des fiches maternelle personnalisées parfaites pour les élèves de maternelle et CP. Téléchargez des fiches à imprimer gratuit en PDF haute qualité 300 DPI en moins de 3 minutes.',
      keywords: 'coloriage à imprimer, dessin quadrillage, fiches maternelle, exercices CP, graphisme maternelle, fiches à imprimer gratuit, exercices CE1, apprendre à lire, écriture cursive, tables de multiplication',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/dessin-quadrillage-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/rutritning-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/rasterzeichnen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/dessin-quadrillage-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets',
        },
      },
      openGraph: {
        title: 'Coloriage à Imprimer sur Quadrillage | LessonCraftStudio',
        description: 'Créez des fiches de dessin sur quadrillage professionnelles. Parfait pour les exercices CP et fiches maternelle.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/dessin-quadrillage-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French draw-and-color-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'draw-and-color-worksheets' && params.locale === 'fr') {
    return {
      title: 'Coloriage à Imprimer sur Quadrillage | LessonCraftStudio',
      description: 'Créez des fiches de dessin sur quadrillage professionnelles avec notre générateur spécialisé.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/dessin-quadrillage-fiches', // Point to new URL
      },
    };
  }

  // Find Objects Worksheets - French product page SEO (new French slug)
  if (params.slug === 'cherche-objets-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches à Imprimer Gratuit | Générateur de Fiches Maternelle pour Apprendre à Lire',
      description: 'Créez des fiches professionnelles de discrimination visuelle avec notre générateur. Votre abonnement Full Access vous donne un accès illimité. Téléchargez des PDF haute qualité en moins de 3 minutes.',
      keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, discrimination visuelle, je vois, intrus, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-foremal-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/suchbilder-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches Cherche les Objets | LessonCraftStudio',
        description: 'Créez des fiches de discrimination visuelle professionnelles. Parfait pour les exercices CP et fiches maternelle.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French find-objects-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'find-objects-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches Cherche les Objets | LessonCraftStudio',
      description: 'Créez des fiches de discrimination visuelle professionnelles avec notre générateur spécialisé.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches', // Point to new URL
      },
    };
  }

  // Crossword Worksheets - French product page SEO (new French slug)
  if (params.slug === 'mots-croises-images-fiches' && params.locale === 'fr') {
    return {
      title: 'Mots Croisés en Images | Fiches à Imprimer Gratuit pour Maternelle et CP',
      description: 'Créez des mots croisés en images professionnels avec notre générateur de fiches à imprimer gratuit. Votre abonnement Accès Complet à 240 € par an vous permet de générer des fiches maternelle et exercices CP illimités. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes.',
      keywords: 'mots croisés en images, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication, exercices CE1',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/mots-croises-images-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/crossword-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilderkreuzwortraetsel-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/mots-croises-images-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/crossword-worksheets',
        },
      },
      openGraph: {
        title: 'Mots Croisés en Images | Fiches à Imprimer Gratuit | LessonCraftStudio',
        description: 'Créez des mots croisés en images professionnels avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/mots-croises-images-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French crossword-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'crossword-worksheets' && params.locale === 'fr') {
    return {
      title: 'Mots Croisés en Images | Fiches à Imprimer Gratuit',
      description: 'Créez des mots croisés en images professionnels avec notre générateur de fiches maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/mots-croises-images-fiches', // Point to new URL
      },
    };
  }

  // Cryptogram Worksheets - French product page SEO (new French slug)
  if (params.slug === 'cryptogramme-images-fiches' && params.locale === 'fr') {
    return {
      title: 'Cryptogramme en Images | Fiches Maternelle et Exercices CP pour Apprendre à Lire',
      description: 'Créez des cryptogrammes en images professionnels avec notre générateur de fiches à imprimer gratuit. Votre abonnement Accès Complet à 240 € par an vous permet de générer des fiches maternelle et exercices CP illimités. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes.',
      keywords: 'cryptogramme en images, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication, exercices CE1',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/cryptogramme-images-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/cryptogram-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildkryptogram-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bildkryptogramm-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/cryptogramme-images-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/cryptogram-worksheets',
        },
      },
      openGraph: {
        title: 'Cryptogramme en Images | Fiches Maternelle et Exercices CP | LessonCraftStudio',
        description: 'Créez des cryptogrammes en images professionnels avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/cryptogramme-images-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French cryptogram-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'cryptogram-worksheets' && params.locale === 'fr') {
    return {
      title: 'Cryptogramme en Images | Fiches Maternelle et Exercices CP',
      description: 'Créez des cryptogrammes en images professionnels avec notre générateur de fiches maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/cryptogramme-images-fiches', // Point to new URL
      },
    };
  }

  // Missing Pieces Worksheets - French product page SEO (new French slug)
  if (params.slug === 'pieces-manquantes-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches à Imprimer Gratuit - Fiches Maternelle - Générateur d\'Exercices Pièces Manquantes',
      description: 'Créez des fiches d\'exercices de pièces manquantes professionnelles en quelques clics. Notre générateur transforme n\'importe quelle image en puzzle éducatif. Les élèves identifient les morceaux manquants et choisissent la bonne pièce parmi plusieurs options.',
      keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, pièces manquantes, puzzles éducatifs, discrimination visuelle, exercices CE1, observation visuelle, graphisme maternelle, exercices maths, apprendre à lire, tables de multiplication, écriture cursive, alphabet, coloriage',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/pieces-manquantes-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/saknade-bitar-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/fehlende-puzzleteile-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/pieces-manquantes-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches Pièces Manquantes | Fiches Maternelle et Exercices CP | LessonCraftStudio',
        description: 'Créez des fiches de pièces manquantes professionnelles avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/pieces-manquantes-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French missing-pieces-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'missing-pieces-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches Pièces Manquantes | Fiches Maternelle et Exercices CP',
      description: 'Créez des fiches de pièces manquantes professionnelles avec notre générateur de fiches maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/pieces-manquantes-fiches', // Point to new URL
      },
    };
  }

  // More Less Worksheets - French product page SEO (new French slug)
  if (params.slug === 'comparaison-quantites-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches à Imprimer Gratuit de Comparaison - Exercices Maths Plus Moins Égal - Fiches Maternelle et Exercices CP',
      description: 'Créez des fiches de comparaison mathématique professionnelles avec notre générateur d\'exercices maths. Générez des exercices CP de comparaison de quantités parfaits pour la maternelle et le CP. Téléchargez des fichiers PDF de haute qualité en moins de 3 minutes.',
      keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices maths, exercices CP, plus moins égal, comparaison, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, exercices CE1',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/comparaison-quantites-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/more-less-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/mer-mindre-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/mehr-weniger-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/comparaison-quantites-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/more-less-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches à Imprimer Gratuit de Comparaison | LessonCraftStudio',
        description: 'Créez des fiches de comparaison mathématique professionnelles avec notre générateur d\'exercices maths. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/comparaison-quantites-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French more-less-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'more-less-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches de Comparaison | Exercices Maths Plus Moins Égal',
      description: 'Créez des fiches de comparaison mathématique professionnelles avec notre générateur d\'exercices maths.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/comparaison-quantites-fiches', // Point to new URL
      },
    };
  }

  // Pattern Train Worksheets - French product page SEO (new French slug)
  if (params.slug === 'train-suites-logiques-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches à Imprimer Gratuit | Générateur de Suites Logiques Train pour Fiches Maternelle',
      description: 'Créez des fiches maternelle professionnelles de reconnaissance de suites logiques avec notre générateur de train à motifs. Générez des exercices CP personnalisés parfaits pour la maternelle et le CP. Téléchargez des fiches de haute qualité en PDF en moins de 3 minutes.',
      keywords: 'fiches maternelle, suites logiques, fiches à imprimer gratuit, exercices CP, train à motifs, reconnaissance de motifs, maternelle, CP, générateur fiches, suites AB ABC',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/train-suites-logiques-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/pattern-train-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/monster-tag-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/train-suites-logiques-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/pattern-train-worksheets',
        },
      },
      openGraph: {
        title: 'Générateur de Suites Logiques Train | Fiches Maternelle | LessonCraftStudio',
        description: 'Créez des fiches de suites logiques professionnelles avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/train-suites-logiques-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French pattern-train-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'pattern-train-worksheets' && params.locale === 'fr') {
    return {
      title: 'Générateur de Suites Logiques Train | Fiches Maternelle',
      description: 'Créez des fiches de suites logiques professionnelles avec notre générateur de fiches maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/train-suites-logiques-fiches', // Point to new URL
      },
    };
  }

  // Pattern Worksheet - French product page SEO (new French slug)
  if (params.slug === 'sequences-logiques-fiches' && params.locale === 'fr') {
    return {
      title: 'Générateur de Fiches de Séquences | Fiches Maternelle et Exercices Maths à Imprimer Gratuit',
      description: 'Créez des fiches de séquences professionnelles avec notre générateur. Générez des fiches maternelle et exercices maths personnalisés parfaits pour la maternelle et le CP. Téléchargez des fiches à imprimer gratuit de haute qualité en PDF en moins de 3 minutes.',
      keywords: 'fiches maternelle, exercices maths, fiches à imprimer gratuit, exercices CP, exercices CE1, séquences logiques, graphisme maternelle, tables de multiplication, apprendre à lire, coloriage à imprimer',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/sequences-logiques-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/pattern-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/monster-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/muster-arbeitsblatt-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/sequences-logiques-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/pattern-worksheets',
        },
      },
      openGraph: {
        title: 'Générateur de Fiches de Séquences | Fiches Maternelle | LessonCraftStudio',
        description: 'Créez des fiches de séquences professionnelles avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/sequences-logiques-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French pattern-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'pattern-worksheets' && params.locale === 'fr') {
    return {
      title: 'Générateur de Fiches de Séquences | Fiches Maternelle',
      description: 'Créez des fiches de séquences professionnelles avec notre générateur de fiches maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/sequences-logiques-fiches', // Point to new URL
      },
    };
  }

  // Picture Path - French product page SEO (new French slug)
  if (params.slug === 'parcours-images-fiches' && params.locale === 'fr') {
    return {
      title: 'Générateur de Parcours d\'Images | Fiches Maternelle et Exercices CP - Fiches à Imprimer Gratuit',
      description: 'Créez des parcours d\'images professionnels en quelques clics. Notre générateur transforme vos fiches maternelle en activités ludiques et éducatives. Parfait pour le graphisme maternelle et les exercices CP. Téléchargez en PDF haute résolution en 3 minutes.',
      keywords: 'fiches à imprimer gratuit, fiches maternelle, parcours images, labyrinthe, exercices CP, graphisme maternelle, motricité fine, coloriage à imprimer, exercices maths, apprendre à lire, alphabet, tables de multiplication',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/parcours-images-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/picture-path-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildlabyrint-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilderpfad-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/parcours-images-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/picture-path-worksheets',
        },
      },
      openGraph: {
        title: 'Générateur de Parcours d\'Images | Fiches Maternelle | LessonCraftStudio',
        description: 'Créez des parcours d\'images professionnels avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/parcours-images-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French picture-path-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'picture-path-worksheets' && params.locale === 'fr') {
    return {
      title: 'Générateur de Parcours d\'Images | Fiches Maternelle',
      description: 'Créez des parcours d\'images professionnels avec notre générateur de fiches maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/parcours-images-fiches', // Point to new URL
      },
    };
  }

  // Shadow Match Worksheets - French product page SEO (new French slug)
  if (params.slug === 'discrimination-visuelle-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches Maternelle Reconnaissance Visuelle - Exercices Discrimination Visuelle - Fiches à Imprimer Gratuit',
      description: 'Créez des fiches de reconnaissance visuelle professionnelles pour la maternelle. Votre abonnement Full Access vous donne accès à ce générateur de fiches d\'association d\'ombres. Créez des exercices de discrimination visuelle adaptés à la petite section, moyenne section et grande section de maternelle. Téléchargez des fiches PDF de haute qualité en moins de 3 minutes.',
      keywords: 'fiches maternelle, discrimination visuelle, reconnaissance visuelle, association ombres, exercices CP, fiches à imprimer gratuit, graphisme maternelle, apprendre à lire, alphabet, coloriage à imprimer, écriture cursive, tables de multiplication, exercices maths',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/discrimination-visuelle-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skuggmatchning-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/schattenbilder-zuordnen-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/discrimination-visuelle-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches Maternelle Reconnaissance Visuelle - Exercices Discrimination Visuelle | LessonCraftStudio',
        description: 'Créez des fiches de reconnaissance visuelle professionnelles pour la maternelle. Générateur de fiches d\'association d\'ombres. Téléchargez des PDF haute qualité en moins de 3 minutes.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/discrimination-visuelle-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French shadow-match-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'shadow-match-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches Maternelle Reconnaissance Visuelle - Exercices Discrimination Visuelle',
      description: 'Créez des fiches de reconnaissance visuelle professionnelles pour la maternelle.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/discrimination-visuelle-fiches', // Point to new URL
      },
    };
  }

  // Subtraction Worksheets - French product page SEO (new French slug)
  if (params.slug === 'soustraction-fiches' && params.locale === 'fr') {
    return {
      title: 'Générateur de Fiches de Soustraction - Exercices Maths à Imprimer - Fiches Maternelle et CP',
      description: 'Créez des exercices de soustraction visuels avec notre générateur de fiches à imprimer. Générez des exercices maths adaptés aux élèves de maternelle, CP et CE1 avec des images qui rendent la soustraction concrète et amusante. Téléchargez des PDF haute qualité en moins de 3 minutes.',
      keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices maths, exercices CP, soustraction, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, exercices CE1',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/soustraction-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/subtraktion-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/subtraktion-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/soustraction-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets',
        },
      },
      openGraph: {
        title: 'Générateur de Fiches de Soustraction - Exercices Maths à Imprimer | LessonCraftStudio',
        description: 'Créez des exercices de soustraction visuels avec notre générateur de fiches à imprimer. Téléchargez des PDF haute qualité en moins de 3 minutes.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/soustraction-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French subtraction-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'subtraction-worksheets' && params.locale === 'fr') {
    return {
      title: 'Générateur de Fiches de Soustraction - Exercices Maths à Imprimer',
      description: 'Créez des exercices de soustraction visuels avec notre générateur de fiches à imprimer.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/soustraction-fiches', // Point to new URL
      },
    };
  }

  // Treasure Hunt Worksheets - French product page SEO (new French slug)
  if (params.slug === 'chasse-au-tresor-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches Chasse au Trésor à Imprimer Gratuit - Générateur de Fiches Maternelle et CP avec Directions',
      description: 'Créez des fiches chasse au trésor professionnelles en moins de 3 minutes. Votre abonnement Accès Complet à 240 € par an vous donne un accès illimité à notre générateur. Parfait pour enseigner les directions spatiales aux élèves de maternelle, CP et CE1.',
      keywords: 'fiches chasse au trésor, fiches à imprimer gratuit, fiches maternelle, exercices CP, directions spatiales, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/chasse-au-tresor-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skattjakt-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/schatzsuche-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/chasse-au-tresor-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches Chasse au Trésor à Imprimer - Générateur de Fiches Maternelle | LessonCraftStudio',
        description: 'Créez des fiches chasse au trésor professionnelles en moins de 3 minutes. Parfait pour enseigner les directions spatiales aux élèves de maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/chasse-au-tresor-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French treasure-hunt slug to new slug (for backwards compatibility)
  if (params.slug === 'treasure-hunt-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches Chasse au Trésor à Imprimer - Générateur de Fiches Maternelle',
      description: 'Créez des fiches chasse au trésor professionnelles en moins de 3 minutes.',
      robots: {
        index: false, // Don't index the old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/chasse-au-tresor-fiches', // Point to new URL
      },
    };
  }

  // Word Guess Worksheets - French product page SEO (new French slug)
  if (params.slug === 'deviner-mots-fiches' && params.locale === 'fr') {
    return {
      title: 'Fiches Deviner les Mots à Imprimer Gratuit - Générateur de Fiches Maternelle et CP avec Indices Visuels',
      description: 'Créez des fiches maternelle professionnelles avec notre générateur de devinettes à indices visuels. Votre abonnement Accès Complet à 240 € par an vous donne accès illimité à la création de fiches. Parfait pour l\'apprentissage du vocabulaire et de l\'écriture en maternelle, CP et CE1.',
      keywords: 'deviner les mots, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, exercices CE1',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/deviner-mots-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/deviner-mots-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
        },
      },
      openGraph: {
        title: 'Fiches Deviner les Mots à Imprimer - Générateur de Fiches Maternelle | LessonCraftStudio',
        description: 'Créez des fiches maternelle professionnelles avec notre générateur de devinettes à indices visuels. Parfait pour l\'apprentissage du vocabulaire en maternelle, CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/deviner-mots-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old French word-guess slug to new slug (for backwards compatibility)
  if (params.slug === 'word-guess-worksheets' && params.locale === 'fr') {
    return {
      title: 'Fiches Deviner les Mots à Imprimer - Générateur de Fiches Maternelle',
      description: 'Créez des fiches maternelle professionnelles avec notre générateur de devinettes à indices visuels.',
      robots: {
        index: false, // Don't index the old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/deviner-mots-fiches', // Point to new URL
      },
    };
  }

  // Missing Pieces Worksheets - German product page SEO (new German slug)
  if (params.slug === 'fehlende-puzzleteile-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Fehlende Puzzleteile Generator - Kostenlose Arbeitsblätter Grundschule - Vorschule Arbeitsblätter zum Ausdrucken',
      description: 'Erstellen Sie professionelle Puzzle-Arbeitsblätter mit unserem Generator für fehlende Puzzleteile. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und Mathe Arbeitsblätter. Generieren Sie visuelle Wahrnehmungs-Aktivitäten. Laden Sie druckfertige PDF-Dateien in unter 3 Minuten herunter.',
      keywords: 'fehlende puzzleteile arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, mathe arbeitsblätter, visuelle wahrnehmung, puzzle arbeitsblätter, schwungübungen, ausmalbilder, buchstaben lernen',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/fehlende-puzzleteile-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/saknade-bitar-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/fehlende-puzzleteile-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets',
        },
      },
      openGraph: {
        title: 'Fehlende Puzzleteile Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Puzzle-Arbeitsblätter mit unserem Generator für fehlende Puzzleteile. Perfekt für Arbeitsblätter Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/fehlende-puzzleteile-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German missing pieces slug to new slug (for backwards compatibility)
  if (params.slug === 'missing-pieces-worksheets' && params.locale === 'de') {
    return {
      title: 'Fehlende Puzzleteile Generator - Kostenlose Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Puzzle-Arbeitsblätter mit unserem Generator für fehlende Puzzleteile.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/fehlende-puzzleteile-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // More-Less (Vergleichs-Arbeitsblätter) - German product page SEO
  if (params.slug === 'mehr-weniger-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Vergleichs-Arbeitsblätter Generator - Kostenlose Arbeitsblätter Grundschule - Mathe Arbeitsblätter für Größer Kleiner Gleich',
      description: 'Erstellen Sie professionelle Vergleichs-Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator. Perfekt für Arbeitsblätter Grundschule, Vorschul-Arbeitsblätter und kostenlose Arbeitsblätter zum Rechnen lernen. Laden Sie hochwertige PDF-Arbeitsblätter in unter 3 Minuten herunter.',
      keywords: 'vergleichs arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, größer kleiner gleich, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/mehr-weniger-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/more-less-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/jamforelse-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/mehr-weniger-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/more-less-worksheets',
        },
      },
      openGraph: {
        title: 'Vergleichs-Arbeitsblätter Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Vergleichs-Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator. Perfekt für Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/mehr-weniger-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German more-less slug to new slug (for backwards compatibility)
  if (params.slug === 'more-less-worksheets' && params.locale === 'de') {
    return {
      title: 'Vergleichs-Arbeitsblätter Generator - Kostenlose Arbeitsblätter Grundschule | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Vergleichs-Arbeitsblätter mit unserem Mathe Arbeitsblätter Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/mehr-weniger-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Odd One Out (Was passt nicht) - German product page SEO
  if (params.slug === 'was-passt-nicht-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Was passt nicht Arbeitsblätter Generator - Kostenlose Arbeitsblätter für Vorschule und Grundschule',
      description: 'Erstellen Sie professionelle "Was passt nicht"-Arbeitsblätter mit unserem Generator für Arbeitsblätter Grundschule. Perfekt für Vorschule Arbeitsblätter und Mathe Arbeitsblätter. Laden Sie druckfertige PDF-Arbeitsblätter in weniger als 3 Minuten herunter.',
      keywords: 'was passt nicht arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/was-passt-nicht-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/odd-one-out-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-udda-bilden-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/was-passt-nicht-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/odd-one-out-worksheets',
        },
      },
      openGraph: {
        title: 'Was passt nicht Arbeitsblätter Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie professionelle "Was passt nicht"-Arbeitsblätter mit unserem Generator. Perfekt für Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/was-passt-nicht-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German odd-one-out slug to new slug (for backwards compatibility)
  if (params.slug === 'odd-one-out-worksheets' && params.locale === 'de') {
    return {
      title: 'Was passt nicht Arbeitsblätter Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie professionelle "Was passt nicht"-Arbeitsblätter mit unserem Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/was-passt-nicht-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Pattern Train (Muster-Zug) - German product page SEO
  if (params.slug === 'muster-zug-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Muster-Zug Generator - Kostenlose Arbeitsblätter für Mustererkennung - Arbeitsblätter Grundschule und Vorschule',
      description: 'Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Zug Generator. Mit Ihrem Full Access Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten. Perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule.',
      keywords: 'muster zug arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/pattern-train-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/monster-tag-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/pattern-train-worksheets',
        },
      },
      openGraph: {
        title: 'Muster-Zug Generator - Kostenlose Arbeitsblätter für Mustererkennung | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Zug Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German pattern-train slug to new slug (for backwards compatibility)
  if (params.slug === 'pattern-train-worksheets' && params.locale === 'de') {
    return {
      title: 'Muster-Zug Generator - Kostenlose Arbeitsblätter für Mustererkennung | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Zug Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/muster-zug-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Pattern Worksheet (Muster-Arbeitsblatt) - German product page SEO
  if (params.slug === 'muster-arbeitsblatt-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Muster-Arbeitsblatt Generator - Kostenlose Arbeitsblätter für Mustererkennung - Arbeitsblätter Grundschule und Vorschule',
      description: 'Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Arbeitsblatt Generator. Mit Ihrem Full Access Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten. Perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule.',
      keywords: 'muster arbeitsblatt generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/muster-arbeitsblatt-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/pattern-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/monster-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/muster-arbeitsblatt-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/pattern-worksheets',
        },
      },
      openGraph: {
        title: 'Muster-Arbeitsblatt Generator - Kostenlose Arbeitsblätter für Mustererkennung | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Arbeitsblatt Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/muster-arbeitsblatt-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German pattern-worksheet slug to new slug (for backwards compatibility)
  if (params.slug === 'pattern-worksheets' && params.locale === 'de') {
    return {
      title: 'Muster-Arbeitsblatt Generator - Kostenlose Arbeitsblätter für Mustererkennung | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Muster-Arbeitsblätter mit dem Muster-Arbeitsblatt Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/muster-arbeitsblatt-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Picture Path (Bilderpfad) - German product page SEO
  if (params.slug === 'bilderpfad-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Bilderpfad Labyrinth Generator - Kostenlose Arbeitsblätter zum Ausdrucken für Vorschule und Grundschule',
      description: 'Erstellen Sie professionelle Labyrinth-Arbeitsblätter mit dem Bilderpfad Generator. Mit Ihrem Full Access Abonnement gestalten Sie unbegrenzt druckbare Arbeitsblätter für die Vorschule und Grundschule. Kinder navigieren von einem Startbild zum Zielbild.',
      keywords: 'bilderpfad arbeitsblätter, labyrinth arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilderpfad-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/picture-path-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildlabyrint-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilderpfad-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/picture-path-worksheets',
        },
      },
      openGraph: {
        title: 'Bilderpfad Labyrinth Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Labyrinth-Arbeitsblätter mit dem Bilderpfad Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/bilderpfad-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German picture-path slug to new slug (for backwards compatibility)
  if (params.slug === 'picture-path-worksheets' && params.locale === 'de') {
    return {
      title: 'Bilderpfad Labyrinth Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Labyrinth-Arbeitsblätter mit dem Bilderpfad Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilderpfad-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Sortierübungen (Picture Sort) - German product page SEO
  if (params.slug === 'bilder-sortieren-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Sortierübungen Generator - Kostenlose Arbeitsblätter für Vorschule und Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Sortierarbeitsblätter mit dem Sortierübungen Generator. Mit Ihrem Full Access Abonnement gestalten Sie unbegrenzt druckbare Arbeitsblätter für die Vorschule und Grundschule. Kinder lernen spielerisch das Kategorisieren von Bildern in zwei Gruppen.',
      keywords: 'sortierübungen arbeitsblätter, sortierarbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, ausmalbilder',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilder-sortieren-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/picture-sort-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildsortering-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/bilder-sortieren-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/picture-sort-worksheets',
        },
      },
      openGraph: {
        title: 'Sortierübungen Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Sortierarbeitsblätter mit dem Sortierübungen Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/bilder-sortieren-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German picture-sort slug to new slug (for backwards compatibility)
  if (params.slug === 'picture-sort-worksheets' && params.locale === 'de') {
    return {
      title: 'Sortierübungen Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Sortierarbeitsblätter mit dem Sortierübungen Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/bilder-sortieren-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Präpositionen (Prepositions) - German product page SEO
  if (params.slug === 'praepositionen-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Präpositionen Generator - Kostenlose Arbeitsblätter für Vorschule und Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Präpositionen-Arbeitsblätter mit unserem Generator. Mit Ihrem Full Access Abonnement gestalten Sie unbegrenzt druckbare Arbeitsblätter für Vorschule und Grundschule. Kinder lernen räumliche Konzepte wie in, auf, unter und neben.',
      keywords: 'präpositionen arbeitsblätter, räumliche begriffe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, deutsch arbeitsblätter, schwungübungen, buchstaben lernen, rechnen lernen',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/praepositionen-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/prepositions-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/prepositioner-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/praepositionen-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/prepositions-worksheets',
        },
      },
      openGraph: {
        title: 'Präpositionen Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Präpositionen-Arbeitsblätter mit unserem Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/praepositionen-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German prepositions slug to new slug (for backwards compatibility)
  if (params.slug === 'prepositions-worksheets' && params.locale === 'de') {
    return {
      title: 'Präpositionen Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Präpositionen-Arbeitsblätter mit unserem Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/praepositionen-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Schattenbilder Zuordnen (Shadow Match) - German product page SEO
  if (params.slug === 'schattenbilder-zuordnen-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Schattenbilder Generator - Kostenlose Arbeitsblätter für Vorschule und Arbeitsblätter Grundschule',
      description: 'Erstellen Sie professionelle Schattenbilder-Arbeitsblätter mit unserem Generator. Mit Ihrem Voller Zugang Abonnement gestalten Sie unbegrenzt druckbare Arbeitsblätter für visuelle Wahrnehmung. Zwei Übungsmodi: Schatten zuordnen und Bild zusammenfügen.',
      keywords: 'schattenbilder arbeitsblätter, visuelle wahrnehmung übungen, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, räumliches denken, wahrnehmungsübungen, silhouetten zuordnen, mathe arbeitsblätter, deutsch arbeitsblätter',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/schattenbilder-zuordnen-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skuggmatchning-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/schattenbilder-zuordnen-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets',
        },
      },
      openGraph: {
        title: 'Schattenbilder Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Schattenbilder-Arbeitsblätter mit unserem Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/schattenbilder-zuordnen-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German shadow-match slug to new slug (for backwards compatibility)
  if (params.slug === 'shadow-match-worksheets' && params.locale === 'de') {
    return {
      title: 'Schattenbilder Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Schattenbilder-Arbeitsblätter mit unserem Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/schattenbilder-zuordnen-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Subtraktion (Subtraction) - German product page SEO
  if (params.slug === 'subtraktion-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Subtraktion Arbeitsblätter Generator - Kostenlose Mathe Arbeitsblätter zum Ausdrucken für Grundschule und Vorschule',
      description: 'Erstellen Sie hochwertige Subtraktion Arbeitsblätter mit unserem professionellen Mathe Arbeitsblätter Generator. Perfekt für Arbeitsblätter Grundschule, Vorschule Arbeitsblätter und kostenlose Arbeitsblätter zum Rechnen lernen. Laden Sie 300 DPI PDF-Arbeitsblätter in unter 3 Minuten herunter.',
      keywords: 'subtraktion arbeitsblätter, mathe arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, vorschule arbeitsblätter, rechnen lernen, minusrechnen, einmaleins, schwungübungen, buchstaben lernen',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/subtraktion-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/subtraktion-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/subtraktion-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets',
        },
      },
      openGraph: {
        title: 'Subtraktion Arbeitsblätter Generator - Kostenlose Mathe Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie hochwertige Subtraktion Arbeitsblätter mit unserem professionellen Mathe Arbeitsblätter Generator. Perfekt für Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/subtraktion-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German subtraction slug to new slug (for backwards compatibility)
  if (params.slug === 'subtraction-worksheets' && params.locale === 'de') {
    return {
      title: 'Subtraktion Arbeitsblätter Generator - Kostenlose Mathe Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie hochwertige Subtraktion Arbeitsblätter mit unserem professionellen Mathe Arbeitsblätter Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/subtraktion-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Schatzsuche (Treasure Hunt) - German product page SEO
  if (params.slug === 'schatzsuche-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Schatzsuche Arbeitsblätter Generator - Kostenlose Arbeitsblätter zum Ausdrucken für Vorschule und Grundschule',
      description: 'Erstellen Sie professionelle Schatzsuche Arbeitsblätter mit unserem Richtungsanweisungen Generator. Mit Ihrem Full Access Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten pro Blatt. Perfekt für Vorschule Arbeitsblätter und Arbeitsblätter Grundschule zum Üben von Richtungsvokabular und Leseverständnis.',
      keywords: 'schatzsuche arbeitsblätter, richtungsanweisungen arbeitsblätter, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, deutsch arbeitsblätter',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/schatzsuche-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skattjakt-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/schatzsuche-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets',
        },
      },
      openGraph: {
        title: 'Schatzsuche Arbeitsblätter Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Schatzsuche Arbeitsblätter mit unserem Richtungsanweisungen Generator. Perfekt für Vorschule und Grundschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/schatzsuche-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German treasure-hunt slug to new slug (for backwards compatibility)
  if (params.slug === 'treasure-hunt-worksheets' && params.locale === 'de') {
    return {
      title: 'Schatzsuche Arbeitsblätter Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Schatzsuche Arbeitsblätter mit unserem Richtungsanweisungen Generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/schatzsuche-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Worträtsel (Word Guess) - German product page SEO
  if (params.slug === 'woerter-raten-arbeitsblaetter' && params.locale === 'de') {
    return {
      title: 'Worträtsel-Generator - Kostenlose Arbeitsblätter zum Ausdrucken für die Grundschule',
      description: 'Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler. Der Worträtsel-Generator von LessonCraft Studio ist Ihr Werkzeug für Arbeitsblätter Grundschule. Mit Ihrem Full Access Abo generieren Sie unbegrenzt Arbeitsblätter ohne zusätzliche Kosten.',
      keywords: 'worträtsel arbeitsblätter, worträtsel generator, arbeitsblätter grundschule, kostenlose arbeitsblätter, mathe arbeitsblätter, vorschule arbeitsblätter, einmaleins, schwungübungen, buchstaben lernen, rechnen lernen, deutsch arbeitsblätter',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad',
          'de': 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
        },
      },
      openGraph: {
        title: 'Worträtsel-Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
        description: 'Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler. Perfekt für Grundschule und Vorschule.',
        url: 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old German word-guess slug to new slug (for backwards compatibility)
  if (params.slug === 'word-guess-worksheets' && params.locale === 'de') {
    return {
      title: 'Worträtsel-Generator - Kostenlose Arbeitsblätter | LessonCraftStudio',
      description: 'Erstellen Sie professionelle Worträtsel mit Bildhinweisen für Ihre Schüler.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/de/apps/woerter-raten-arbeitsblaetter', // Point to new URL
      },
    };
  }

  // Addition Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'addition-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Arbetsblad Gratis - Addition och Subtraktion Generator | Matematik Arbetsblad för Förskoleklass',
      description: 'Skapa professionella additionsarbetsblad med vår bildbaserade matematik arbetsblad generator. Generera skräddarsydda utskrivbara matte övningar perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'arbetsblad gratis, addition och subtraktion, matematik arbetsblad, förskoleklass material, matte övningar, siffror och tal, additionsarbetsblad, multiplikationstabellen, klockan lära sig, bokstäver lära sig, skriva bokstäver, målarbilder barn, finmotorik övningar',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/addition-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/addition-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/addition-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/addition-worksheets',
        },
      },
      openGraph: {
        title: 'Arbetsblad Gratis - Addition och Subtraktion Generator | LessonCraftStudio',
        description: 'Skapa professionella additionsarbetsblad med vår matematik arbetsblad generator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/addition-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish addition slug to new slug (for backwards compatibility)
  if (params.slug === 'addition-worksheets' && params.locale === 'sv') {
    return {
      title: 'Arbetsblad Gratis - Addition och Subtraktion Generator | Matematik Arbetsblad för Förskoleklass',
      description: 'Skapa professionella additionsarbetsblad med vår bildbaserade matematik arbetsblad generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/addition-arbetsblad', // Point to new URL
      },
    };
  }

  // Alphabet Train Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'alfabettag-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Alfabettåg Arbetsblad - Bokstäver Lära Sig | Förskoleklass Material Gratis',
      description: 'Skapa professionella alfabettåg-arbetsblad med vår alfabetgenerator. Generera anpassade arbetsblad gratis för utskrift perfekta för förskoleklass och lågstadiebarn. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'alfabettåg arbetsblad, bokstäver lära sig, förskoleklass material, arbetsblad gratis, alfabetgenerator, skriva bokstäver, målarbilder barn, finmotorik övningar, matematik arbetsblad, siffror och tal',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/alfabettag-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/alfabettag-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets',
        },
      },
      openGraph: {
        title: 'Alfabettåg Arbetsblad - Bokstäver Lära Sig | LessonCraftStudio',
        description: 'Skapa professionella alfabettåg-arbetsblad med vår alfabetgenerator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/alfabettag-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish alphabet-train slug to new slug (for backwards compatibility)
  if (params.slug === 'alphabet-train-worksheets' && params.locale === 'sv') {
    return {
      title: 'Alfabettåg Arbetsblad - Bokstäver Lära Sig | Förskoleklass Material Gratis',
      description: 'Skapa professionella alfabettåg-arbetsblad med vår alfabetgenerator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/alfabettag-arbetsblad', // Point to new URL
      },
    };
  }

  // Coloring Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'malarbilder-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Målarbilder Barn - Gratis Arbetsblad att Skriva Ut | Förskoleklass Material',
      description: 'Skapa professionella målarbilder barn med vårt enkla verktyg. Generera anpassade målarbilder perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-filer på under 3 minuter.',
      keywords: 'målarbilder barn, arbetsblad gratis, förskoleklass material, finmotorik övningar, matematik arbetsblad, bokstäver lära sig, siffror och tal, multiplikationstabellen, klockan lära sig, addition och subtraktion',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/malarbilder-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/coloring-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/malarbilder-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/coloring-worksheets',
        },
      },
      openGraph: {
        title: 'Målarbilder Barn - Gratis Arbetsblad | LessonCraftStudio',
        description: 'Skapa professionella målarbilder barn med vårt enkla verktyg. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/malarbilder-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish coloring slug to new slug (for backwards compatibility)
  if (params.slug === 'coloring-worksheets' && params.locale === 'sv') {
    return {
      title: 'Målarbilder Barn - Gratis Arbetsblad att Skriva Ut | Förskoleklass Material',
      description: 'Skapa professionella målarbilder barn med vårt enkla verktyg.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/malarbilder-arbetsblad', // Point to new URL
      },
    };
  }

  // Math Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'matematik-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Matematik Arbetsblad Generator - Gratis Arbetsblad för Förskoleklass och Lågstadiet',
      description: 'Skapa professionella matematik arbetsblad med vår enkla generator för matte övningar. Generera anpassade arbetsblad perfekta för förskoleklass, årskurs 1-3. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'matematik arbetsblad, arbetsblad gratis, matte övningar, förskoleklass material, addition och subtraktion, siffror och tal, multiplikationstabellen, klockan lära sig, bokstäver lära sig, målarbilder barn, finmotorik övningar',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
        },
      },
      openGraph: {
        title: 'Matematik Arbetsblad Generator - Gratis Arbetsblad | LessonCraftStudio',
        description: 'Skapa professionella matematik arbetsblad med vår enkla generator för matte övningar. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish math worksheet slug to new slug (for backwards compatibility)
  if (params.slug === 'math-worksheets' && params.locale === 'sv') {
    return {
      title: 'Matematik Arbetsblad Generator - Gratis Arbetsblad för Förskoleklass och Lågstadiet',
      description: 'Skapa professionella matematik arbetsblad med vår enkla generator för matte övningar.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/matematik-arbetsblad', // Point to new URL
      },
    };
  }

  // Word Scramble Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'ordpussel-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Ordpussel Generator - Arbetsblad Gratis för Bokstäver Lära Sig | Förskoleklass Material',
      description: 'Skapa professionella ordpussel med vår ordpussel-generator. Generera anpassningsbara arbetsblad gratis för utskrift perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'ordpussel generator, arbetsblad gratis, förskoleklass material, bokstäver lära sig, skriva bokstäver, ordpussel, matematik arbetsblad, finmotorik övningar, målarbilder barn, lågstadiet',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/ordpussel-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-scramble-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/ordpussel-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-scramble-worksheets',
        },
      },
      openGraph: {
        title: 'Ordpussel Generator - Arbetsblad Gratis | LessonCraftStudio',
        description: 'Skapa professionella ordpussel med vår ordpussel-generator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/ordpussel-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish word-scramble slug to new slug (for backwards compatibility)
  if (params.slug === 'word-scramble-worksheets' && params.locale === 'sv') {
    return {
      title: 'Ordpussel Generator - Arbetsblad Gratis för Bokstäver Lära Sig | Förskoleklass Material',
      description: 'Skapa professionella ordpussel med vår ordpussel-generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/ordpussel-arbetsblad', // Point to new URL
      },
    };
  }

  // Matching Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'matchnings-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Matchningsarbetsblad Gratis - Matematik Arbetsblad och Bokstäver Lära Sig | MatchUp Maker för Förskoleklass Material',
      description: 'Skapa professionella matchningsövningar med vår arbetsblad gratis generator. Generera anpassningsbara matematik arbetsblad och bokstäver lära sig material perfekt för förskoleklass material och årskurs 1-3. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'matchningsarbetsblad, arbetsblad gratis, förskoleklass material, matematik arbetsblad, bokstäver lära sig, matchningsövningar, finmotorik övningar, målarbilder barn, siffror och tal, multiplikationstabellen',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/matchnings-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/matching-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/matchnings-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/matching-worksheets',
        },
      },
      openGraph: {
        title: 'Matchningsarbetsblad Gratis - Matematik Arbetsblad | LessonCraftStudio',
        description: 'Skapa professionella matchningsövningar med vår arbetsblad gratis generator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/matchnings-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish matching slug to new slug (for backwards compatibility)
  if (params.slug === 'matching-worksheets' && params.locale === 'sv') {
    return {
      title: 'Matchningsarbetsblad Gratis - Matematik Arbetsblad och Bokstäver Lära Sig | Förskoleklass Material',
      description: 'Skapa professionella matchningsövningar med vår arbetsblad gratis generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/matchnings-arbetsblad', // Point to new URL
      },
    };
  }

  // Sudoku Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'bildsudoku-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Gratis Sudoku för Barn Generator | Arbetsblad för Förskoleklass och Lågstadiet',
      description: 'Skapa professionella bildsudoku med vår sudoku för barn generator. Perfekt för förskoleklass material och matematik arbetsblad. Ladda ner arbetsblad gratis som högkvalitativa PDF-filer på under 3 minuter.',
      keywords: 'sudoku för barn, bildsudoku, arbetsblad gratis, förskoleklass material, matematik arbetsblad, matte övningar, finmotorik övningar, bokstäver lära sig, siffror och tal, målarbilder barn, lågstadiet',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/bildsudoku-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildsudoku-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets',
        },
      },
      openGraph: {
        title: 'Gratis Sudoku för Barn Generator | LessonCraftStudio',
        description: 'Skapa professionella bildsudoku med vår sudoku för barn generator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/bildsudoku-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish sudoku slug to new slug (for backwards compatibility)
  if (params.slug === 'sudoku-worksheets' && params.locale === 'sv') {
    return {
      title: 'Gratis Sudoku för Barn Generator | Arbetsblad för Förskoleklass och Lågstadiet',
      description: 'Skapa professionella bildsudoku med vår sudoku för barn generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/bildsudoku-arbetsblad', // Point to new URL
      },
    };
  }

  // Big Small Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'stort-litet-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Arbetsblad Gratis för Stort och Litet - Matematik Arbetsblad och Förskoleklass Material för Storleksträning',
      description: 'Skapa professionella arbetsblad för att lära barn skilja på stort och litet. Generera anpassade matematik arbetsblad för storleksjämförelse på under 3 minuter. Ladda ner högkvalitativa PDF-filer för förskoleklass material.',
      keywords: 'arbetsblad gratis, stort och litet, storleksjämförelse, förskoleklass material, matematik arbetsblad, matte övningar, finmotorik övningar, målarbilder barn, siffror och tal',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/stort-litet-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/big-small-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/stort-litet-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/big-small-worksheets',
        },
      },
      openGraph: {
        title: 'Arbetsblad Gratis för Stort och Litet | LessonCraftStudio',
        description: 'Skapa professionella arbetsblad för storleksjämförelse. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/stort-litet-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish big-small slug to new slug (for backwards compatibility)
  if (params.slug === 'big-small-worksheets' && params.locale === 'sv') {
    return {
      title: 'Arbetsblad Gratis för Stort och Litet | Förskoleklass Material',
      description: 'Skapa professionella arbetsblad för storleksjämförelse.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/stort-litet-arbetsblad', // Point to new URL
      },
    };
  }

  // Draw and Color Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'rutritning-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Målarbilder Barn och Ritövningar - Arbetsblad Gratis för Förskoleklass Material',
      description: 'Skapa professionella målarbilder barn med vårt rutnätstekniska verktyg. Med Full Tillgång-prenumerationen får du obegränsad tillgång till ritövningar och målarbilder barn utan extra avgifter. Generera anpassade arbetsblad gratis för utskrift perfekt för förskoleklass material och finmotorik övningar.',
      keywords: 'målarbilder barn, ritövningar, arbetsblad gratis, förskoleklass material, finmotorik övningar, rutnätsteknik, matematik arbetsblad, bokstäver lära sig, siffror och tal, rutnätsritning',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/rutritning-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/rutritning-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets',
        },
      },
      openGraph: {
        title: 'Målarbilder Barn och Ritövningar | LessonCraftStudio',
        description: 'Skapa professionella rutnätsritningar med målarbilder barn. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/rutritning-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish draw-and-color slug to new slug (for backwards compatibility)
  if (params.slug === 'draw-and-color-worksheets' && params.locale === 'sv') {
    return {
      title: 'Målarbilder Barn och Ritövningar | Förskoleklass Material',
      description: 'Skapa professionella rutnätsritningar med målarbilder barn.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/rutritning-arbetsblad', // Point to new URL
      },
    };
  }

  // Crossword Worksheets - Swedish product page SEO (new Swedish slug)
  if (params.slug === 'bildkorsord-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Bildkorsord Generator - Arbetsblad Gratis för Förskoleklass Material och Bokstäver Lära Sig',
      description: 'Skapa professionella bildkorsord med vår bildkorsordsgenerator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till att skapa korsord utan extra avgifter per arbetsblad. Generera anpassade utskrivbara bildkorsord perfekta för förskoleklass material och bokstäver lära sig aktiviteter.',
      keywords: 'bildkorsord generator, arbetsblad gratis, förskoleklass material, bokstäver lära sig, korsord barn, bildkorsord, matematik arbetsblad, finmotorik övningar, målarbilder barn, ordförråd',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/crossword-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/crossword-worksheets',
        },
      },
      openGraph: {
        title: 'Bildkorsord Generator - Arbetsblad Gratis | LessonCraftStudio',
        description: 'Skapa professionella bildkorsord med vår bildkorsordsgenerator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish crossword slug to new slug (for backwards compatibility)
  if (params.slug === 'crossword-worksheets' && params.locale === 'sv') {
    return {
      title: 'Bildkorsord Generator - Arbetsblad Gratis | Förskoleklass Material',
      description: 'Skapa professionella bildkorsord med vår bildkorsordsgenerator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/bildkorsord-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Math Puzzle Worksheets product page SEO
  if (params.slug === 'mattepussel-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Mattepussel Arbetsblad - Addition och Subtraktion Generator | Matematik Arbetsblad för Förskoleklass',
      description: 'Skapa professionella mattepussel med vår generator för matematik arbetsblad. Generera anpassade pussel med addition och subtraktion perfekta för förskoleklass och årskurs 1-3. Ladda ner högkvalitativa PDF-filer på under tre minuter.',
      keywords: 'mattepussel, matematik arbetsblad, addition och subtraktion, förskoleklass material, matte övningar, siffror och tal, arbetsblad gratis, multiplikationstabellen, klockan lära sig, bokstäver lära sig, skriva bokstäver, målarbilder barn, finmotorik övningar',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/mattepussel-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/mattepussel-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets',
        },
      },
      openGraph: {
        title: 'Mattepussel Arbetsblad - Addition och Subtraktion Generator | LessonCraftStudio',
        description: 'Skapa professionella mattepussel med vår generator för matematik arbetsblad. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/mattepussel-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish math puzzle slug to new slug (for backwards compatibility)
  if (params.slug === 'math-puzzle-worksheets' && params.locale === 'sv') {
    return {
      title: 'Mattepussel Arbetsblad - Addition och Subtraktion Generator | Förskoleklass Material',
      description: 'Skapa professionella mattepussel med vår generator för matematik arbetsblad.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/mattepussel-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Missing Pieces Worksheets product page SEO
  if (params.slug === 'saknade-bitar-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Saknade Bitar Arbetsblad Gratis - Generator för Förskoleklass Material och Finmotorik Övningar',
      description: 'Skapa professionella arbetsblad med saknade bitar på bara tre minuter. Din Full Tillgång-prenumeration ger dig obegränsad skapande av saknade bitar-pussel utan extra kostnader per arbetsblad. Generera anpassade arbetsblad gratis för utskrift perfekt för förskoleklass material och finmotorik övningar.',
      keywords: 'saknade bitar arbetsblad, arbetsblad gratis, förskoleklass material, finmotorik övningar, matematik arbetsblad, bokstäver lära sig, siffror och tal, matte övningar, målarbilder barn, visuella pussel',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/saknade-bitar-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/saknade-bitar-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets',
        },
      },
      openGraph: {
        title: 'Saknade Bitar Arbetsblad Gratis - Generator för Förskoleklass Material | LessonCraftStudio',
        description: 'Skapa professionella arbetsblad med saknade bitar på bara tre minuter. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/saknade-bitar-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish missing pieces slug to new slug (for backwards compatibility)
  if (params.slug === 'missing-pieces-worksheets' && params.locale === 'sv') {
    return {
      title: 'Saknade Bitar Arbetsblad Gratis - Generator för Förskoleklass Material',
      description: 'Skapa professionella arbetsblad med saknade bitar på bara tre minuter.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/saknade-bitar-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Odd One Out Worksheets product page SEO
  if (params.slug === 'hitta-udda-bilden-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Arbetsblad Gratis - Hitta Udda Bilden Generator för Förskoleklass Material och Finmotorik Övningar | LessonCraft Studio',
      description: 'Skapa professionella arbetsblad gratis med vår hitta-udda-bilden generator. Perfekt för förskoleklass material och finmotorik övningar. Ladda ner högkvalitativa PDF-filer på under tre minuter.',
      keywords: 'arbetsblad gratis, hitta udda bilden, förskoleklass material, finmotorik övningar, matematik arbetsblad, bokstäver lära sig, visuell diskriminering, kognitiv utveckling',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/hitta-udda-bilden-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/odd-one-out-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/hitta-udda-bilden-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/odd-one-out-worksheets',
        },
      },
      openGraph: {
        title: 'Arbetsblad Gratis - Hitta Udda Bilden Generator | LessonCraftStudio',
        description: 'Skapa professionella arbetsblad gratis med vår hitta-udda-bilden generator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/hitta-udda-bilden-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish odd-one-out slug to new slug (for backwards compatibility)
  if (params.slug === 'odd-one-out-worksheets' && params.locale === 'sv') {
    return {
      title: 'Arbetsblad Gratis - Hitta Udda Bilden Generator | Förskoleklass Material',
      description: 'Skapa professionella arbetsblad gratis med vår hitta-udda-bilden generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/hitta-udda-bilden-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Pattern Worksheets product page SEO
  if (params.slug === 'monster-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Mönsterigenkänning Arbetsblad Gratis | Matematik Arbetsblad Generator för Förskoleklass Material',
      description: 'Skapa professionella mönsterigenkänning arbetsblad med vår digitala generator. Din Full Tillgång-prenumeration ger dig obegränsad tillgång till arbetsblad utan extra kostnader. Generera anpassade arbetsblad gratis för förskoleklass och lågstadiet.',
      keywords: 'mönsterigenkänning arbetsblad, arbetsblad gratis, förskoleklass material, matematik arbetsblad, matte övningar, siffror och tal, bokstäver lära sig, finmotorik övningar, målarbilder barn, lågstadiet',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/monster-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/pattern-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/monster-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/pattern-worksheets',
        },
      },
      openGraph: {
        title: 'Mönsterigenkänning Arbetsblad Gratis | LessonCraftStudio',
        description: 'Skapa professionella mönsterigenkänning arbetsblad med vår digitala generator. Perfekt för förskoleklass och lågstadiet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/monster-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish pattern-worksheets slug to new slug (for backwards compatibility)
  if (params.slug === 'pattern-worksheets' && params.locale === 'sv') {
    return {
      title: 'Mönsterigenkänning Arbetsblad Gratis | Förskoleklass Material',
      description: 'Skapa professionella mönsterigenkänning arbetsblad med vår digitala generator.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/monster-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Prepositions Worksheets product page SEO
  if (params.slug === 'prepositioner-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Prepositioner Arbetsblad Gratis - Förskoleklass Material för Barn',
      description: 'Skapa professionella prepositionsarbetsblad för förskoleklass och lågstadiet. Generera arbetsblad gratis för elever som lär sig rumsliga begrepp. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'prepositioner arbetsblad, arbetsblad gratis, förskoleklass material, finmotorik övningar, rumsliga begrepp, i på under, bredvid bakom, svenska prepositioner, lågstadiet material',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/prepositioner-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/prepositions-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/prepositioner-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/prepositions-worksheets',
        },
      },
      openGraph: {
        title: 'Prepositioner Arbetsblad Gratis | LessonCraftStudio',
        description: 'Skapa professionella prepositionsarbetsblad för förskoleklass och lågstadiet. Perfekt för att lära ut rumsliga begrepp.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/prepositioner-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish prepositions slug to new slug (for backwards compatibility)
  if (params.slug === 'prepositions-worksheets' && params.locale === 'sv') {
    return {
      title: 'Prepositioner Arbetsblad Gratis | Förskoleklass Material',
      description: 'Skapa professionella prepositionsarbetsblad för förskoleklass och lågstadiet.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/prepositioner-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Shadow Match Worksheets product page SEO
  if (params.slug === 'skuggmatchning-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Skuggmatchning Arbetsblad Gratis - Förskoleklass Material för Visuell Perception',
      description: 'Skapa professionella skuggmatchningsövningar med vår skuggmatchningsgenerator. Generera anpassade utskrivbara skuggmatchningsarbetsblad perfekta för förskoleklass material och finmotorik övningar. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'skuggmatchning arbetsblad, arbetsblad gratis, förskoleklass material, finmotorik övningar, visuell perception, matcha skuggor, gör det helt, svenska arbetsblad, lågstadiet material',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/skuggmatchning-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skuggmatchning-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets',
        },
      },
      openGraph: {
        title: 'Skuggmatchning Arbetsblad Gratis | LessonCraftStudio',
        description: 'Skapa professionella skuggmatchningsövningar för förskoleklass och lågstadiet. Perfekt för att utveckla visuell perception.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/skuggmatchning-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish shadow-match slug to new slug (for backwards compatibility)
  if (params.slug === 'shadow-match-worksheets' && params.locale === 'sv') {
    return {
      title: 'Skuggmatchning Arbetsblad Gratis | Förskoleklass Material',
      description: 'Skapa professionella skuggmatchningsövningar för förskoleklass och lågstadiet.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/skuggmatchning-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Subtraction Worksheets product page SEO
  if (params.slug === 'subtraktion-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Gratis Matematik Arbetsblad för Subtraktion | Arbetsblad Gratis för Förskoleklass Material',
      description: 'Skapa professionella subtraktionsblad med vår matematikgenerator. Generera anpassade utskrivbara matematik arbetsblad perfekta för förskoleklass material och lågstadiet. Ladda ner högkvalitativa PDF-filer med siffror och tal på under 3 minuter.',
      keywords: 'subtraktion arbetsblad, matematik arbetsblad, förskoleklass material, matte övningar, siffror och tal, arbetsblad gratis, addition och subtraktion, subtraktionsblad, räkneövningar, taluppfattning',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/subtraktion-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/subtraktion-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets',
        },
      },
      openGraph: {
        title: 'Gratis Matematik Arbetsblad för Subtraktion | LessonCraftStudio',
        description: 'Skapa professionella subtraktionsblad för förskoleklass och lågstadiet. Perfekt för addition och subtraktion övningar.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/subtraktion-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish subtraction slug to new slug (for backwards compatibility)
  if (params.slug === 'subtraction-worksheets' && params.locale === 'sv') {
    return {
      title: 'Gratis Matematik Arbetsblad för Subtraktion | Förskoleklass Material',
      description: 'Skapa professionella subtraktionsblad för förskoleklass och lågstadiet.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/subtraktion-arbetsblad', // Point to new URL
      },
    };
  }

  // Swedish Treasure Hunt Worksheets product page SEO
  if (params.slug === 'skattjakt-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Gratis Skattjakt Arbetsblad | Riktningsövningar för Förskoleklass Material',
      description: 'Skapa professionella skattjakt arbetsblad med vår generator. Generera anpassade utskrivbara riktningsövningar perfekta för förskoleklass material och lågstadiet. Ladda ner PDF på under 3 minuter.',
      keywords: 'skattjakt arbetsblad, riktningsövningar, förskoleklass material, arbetsblad gratis, bokstäver lära sig, väderstreck, upp ner vänster höger, elev material, lågstadiet, finmotorik övningar',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/skattjakt-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skattjakt-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets',
        },
      },
      openGraph: {
        title: 'Gratis Skattjakt Arbetsblad | LessonCraftStudio',
        description: 'Skapa professionella skattjakt arbetsblad för förskoleklass och lågstadiet. Perfekt för riktningsövningar och spatial medvetenhet.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/skattjakt-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish treasure hunt slug to new slug (for backwards compatibility)
  if (params.slug === 'treasure-hunt-worksheets' && params.locale === 'sv') {
    return {
      title: 'Gratis Skattjakt Arbetsblad | Förskoleklass Material',
      description: 'Skapa professionella skattjakt arbetsblad för förskoleklass och lågstadiet.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/skattjakt-arbetsblad', // Point to new URL
      },
    };
  }

  // Alphabet Train Worksheets product page SEO
  if (params.slug === 'alphabet-train-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable ABC Worksheets for Kindergarten | Alphabet Train Generator',
      description: 'Create custom alphabet train worksheets with our professional worksheet generator. Generate printable ABC worksheets that help kids learn letter recognition through a fun train theme. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'alphabet worksheets, ABC worksheets, kindergarten worksheets, printable worksheets, alphabet train, letter recognition, free worksheets, first grade worksheets, phonics worksheets, tracing worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets`,
      },
      openGraph: {
        title: 'Free Printable ABC Worksheets for Kindergarten | LessonCraftStudio',
        description: 'Create custom alphabet train worksheets with our professional worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/alphabet-train-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Coloring Worksheets product page SEO
  if (params.slug === 'coloring-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Coloring Pages | Coloring Worksheet Generator for Kindergarten',
      description: 'Create professional coloring worksheets with our easy-to-use coloring page designer. Generate custom printable coloring pages perfect for kindergarten and first grade students. Download high-quality PDF and JPEG files ready for printing.',
      keywords: 'coloring worksheets, coloring pages, kindergarten worksheets, printable coloring pages, free coloring worksheets, coloring page generator, first grade worksheets, preschool coloring, printable worksheets, coloring activities',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/coloring-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Coloring Pages | LessonCraftStudio',
        description: 'Create professional coloring worksheets with our coloring page designer. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/coloring-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Math Worksheets product page SEO
  if (params.slug === 'math-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Math Worksheets for Kindergarten | Math Worksheet Generator',
      description: 'Create picture-based math puzzles with our math worksheet generator. Generate custom printable math worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'math worksheets, kindergarten worksheets, printable worksheets, math worksheet generator, free printable worksheets, first grade worksheets, addition worksheets, math puzzles, picture puzzles, visual math',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/math-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Math Worksheets for Kindergarten | LessonCraftStudio',
        description: 'Create picture-based math puzzles with our math worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/math-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Word Scramble Worksheets product page SEO
  if (params.slug === 'word-scramble-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Word Scramble Worksheets | Word Scramble Generator for Kindergarten',
      description: 'Create professional word scramble worksheets with our word scramble generator. Generate custom printable word scramble worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'word scramble worksheets, word scramble generator, kindergarten worksheets, printable worksheets, word scramble puzzles, free worksheets, first grade worksheets, vocabulary worksheets, sight words worksheets, phonics worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/word-scramble-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Word Scramble Worksheets | LessonCraftStudio',
        description: 'Create professional word scramble worksheets with our word scramble generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/word-scramble-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Find and Count Worksheets product page SEO
  if (params.slug === 'find-and-count-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Kindergarten Worksheets | Find and Count I Spy Worksheet Generator',
      description: 'Create professional find and count worksheets with our I Spy worksheet generator. Generate custom printable kindergarten worksheets perfect for visual discrimination and counting practice. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'find and count worksheets, I Spy worksheets, kindergarten worksheets, printable worksheets, counting worksheets, free worksheets, first grade worksheets, visual discrimination, math worksheets, hidden objects worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Find and Count Worksheets | LessonCraftStudio',
        description: 'Create professional find and count I Spy worksheets with our worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/find-and-count-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Matching Worksheets product page SEO
  if (params.slug === 'matching-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Matching Worksheets | MatchUp Maker for Kindergarten and First Grade',
      description: 'Create professional matching worksheets with our MatchUp Maker generator. Generate custom printable matching worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'matching worksheets, MatchUp Maker, kindergarten worksheets, printable worksheets, alphabet worksheets, phonics worksheets, sight words worksheets, free worksheets, first grade worksheets, vocabulary worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/matching-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Matching Worksheets | LessonCraftStudio',
        description: 'Create professional matching worksheets with our MatchUp Maker generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/matching-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Drawing Lines Worksheets product page SEO
  if (params.slug === 'drawing-lines-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Drawing Lines Worksheets | Kindergarten Fine Motor Skills Generator',
      description: 'Create professional drawing lines worksheets with our fine motor skills generator. Generate custom printable kindergarten worksheets perfect for developing hand-eye coordination. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'drawing lines worksheets, fine motor skills worksheets, kindergarten worksheets, printable worksheets, matching worksheets, tracing worksheets, free worksheets, first grade worksheets, pencil control, handwriting readiness',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/drawing-lines-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Drawing Lines Worksheets | LessonCraftStudio',
        description: 'Create professional drawing lines worksheets for fine motor skills development. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/drawing-lines-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Picture Bingo Worksheets product page SEO
  if (params.slug === 'picture-bingo-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Kindergarten Bingo Cards | Picture Bingo Worksheet Generator',
      description: 'Create professional picture bingo cards with our bingo worksheet generator. Generate custom printable bingo cards perfect for kindergarten and first grade classrooms. Download high-quality PDF and JPEG bingo worksheets in under 3 minutes.',
      keywords: 'bingo worksheets, picture bingo, kindergarten worksheets, printable bingo cards, bingo card generator, free worksheets, first grade worksheets, classroom bingo, educational games, bingo printables',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Kindergarten Bingo Cards | LessonCraftStudio',
        description: 'Create professional picture bingo cards with our bingo worksheet generator. Perfect for kindergarten and first grade classrooms.',
        url: 'https://www.lessoncraftstudio.com/en/apps/picture-bingo-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Sudoku Worksheets product page SEO
  if (params.slug === 'sudoku-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Sudoku for Kids | Sudoku Worksheets for Kindergarten and First Grade',
      description: 'Create visual sudoku puzzles with our sudoku generator designed for young children. Generate custom 4x4 picture-based sudoku puzzles perfect for kindergarten and first grade students. Download professional-quality PDF worksheets with answer keys in under 3 minutes.',
      keywords: 'sudoku for kids, sudoku worksheets, kindergarten worksheets, printable sudoku, logic puzzles, free worksheets, first grade worksheets, picture sudoku, visual sudoku, math worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Sudoku for Kids | LessonCraftStudio',
        description: 'Create visual sudoku puzzles with our sudoku generator. Perfect for kindergarten and first grade students learning logic skills.',
        url: 'https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Sudoku Worksheets - French product page SEO
  if (params.slug === 'sudoku-enfants-fiches' && params.locale === 'fr') {
    return {
      title: 'Sudoku pour Enfants - Fiches Maternelle et Exercices Maths à Imprimer Gratuit',
      description: 'Créez des puzzles sudoku visuels avec notre générateur de fiches maternelle. Votre abonnement Pack Essentiel vous offre une création illimitée de fiches à imprimer gratuit. Téléchargez des PDF professionnels 300 DPI avec clés de correction en moins de 3 minutes.',
      keywords: 'sudoku enfants, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, exercices maths, graphisme maternelle, coloriage à imprimer, apprendre à lire, tables de multiplication',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/fr/apps/sudoku-enfants-fiches',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets',
          'fr': 'https://www.lessoncraftstudio.com/fr/apps/sudoku-enfants-fiches',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/sudoku-worksheets',
        },
      },
      openGraph: {
        title: 'Sudoku pour Enfants - Fiches Maternelle | LessonCraftStudio',
        description: 'Créez des puzzles sudoku visuels avec notre générateur de fiches maternelle. Parfait pour les exercices CP et CE1.',
        url: 'https://www.lessoncraftstudio.com/fr/apps/sudoku-enfants-fiches',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Big and Small Worksheets product page SEO
  if (params.slug === 'big-small-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Size Comparison Worksheets | Big and Small Worksheet Generator for Kindergarten',
      description: 'Create professional size comparison worksheets with our Big and Small worksheet generator. Generate custom printable worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets with answer keys in under 3 minutes.',
      keywords: 'big and small worksheets, size comparison worksheets, kindergarten worksheets, printable worksheets, size discrimination, free worksheets, first grade worksheets, math worksheets, preschool worksheets, visual comparison',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/big-small-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Size Comparison Worksheets | LessonCraftStudio',
        description: 'Create professional size comparison worksheets with our Big and Small generator. Perfect for kindergarten and first grade students learning size concepts.',
        url: 'https://www.lessoncraftstudio.com/en/apps/big-small-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Chart Count (Picture Graph) Worksheets product page SEO
  if (params.slug === 'chart-count-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Picture Graph Worksheets | Math Worksheet Generator for Kindergarten',
      description: 'Create professional picture graph worksheets with our math worksheet generator. Generate custom printable kindergarten and first grade worksheets for counting and graphing. Download high-quality PDF worksheets with answer keys in under 3 minutes.',
      keywords: 'picture graph worksheets, chart count worksheets, kindergarten worksheets, printable worksheets, graphing worksheets, counting worksheets, math worksheets, first grade worksheets, data worksheets, coloring worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Picture Graph Worksheets | LessonCraftStudio',
        description: 'Create professional picture graph worksheets with our math worksheet generator. Perfect for kindergarten and first grade students learning counting and graphing.',
        url: 'https://www.lessoncraftstudio.com/en/apps/chart-count-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Code Addition Worksheets (Image Addition) product page SEO
  if (params.slug === 'code-addition-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Addition Worksheets | Image Addition Worksheet Generator for Kindergarten',
      description: 'Create professional picture-based addition worksheets with our image addition worksheet generator. Generate custom printable math worksheets perfect for kindergarten and first grade students learning to count and add. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'image addition worksheets, picture addition worksheets, kindergarten worksheets, printable worksheets, math worksheet generator, free worksheets, first grade math, visual addition, counting worksheets, addition practice',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/code-addition-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Addition Worksheets | LessonCraftStudio',
        description: 'Create professional picture-based addition worksheets with our image addition worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/code-addition-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Draw and Color (Grid Drawing) Worksheets product page SEO
  if (params.slug === 'draw-and-color-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Grid Drawing Worksheets | Coloring Worksheet Generator for Kindergarten',
      description: 'Create professional grid drawing coloring worksheets with our specialized worksheet generator. Generate custom printable coloring worksheets perfect for kindergarten and first grade students. Download high-quality PDF coloring worksheets in under 3 minutes.',
      keywords: 'grid drawing worksheets, coloring worksheets, kindergarten worksheets, printable worksheets, coloring worksheet generator, free worksheets, first grade worksheets, visual-spatial skills, pattern worksheets, drawing worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Grid Drawing Worksheets | LessonCraftStudio',
        description: 'Create professional grid drawing coloring worksheets with our specialized worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/draw-and-color-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Find Objects Worksheets product page SEO
  if (params.slug === 'find-objects-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Kindergarten Worksheets | Find Objects Worksheet Generator for First Grade',
      description: 'Create professional find objects worksheets with our visual discrimination worksheet generator. Generate custom printable I Spy and Odd One Out worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'find objects worksheets, I Spy worksheets, odd one out worksheets, visual discrimination worksheets, kindergarten worksheets, printable worksheets, first grade worksheets, hidden objects worksheets, attention worksheets, visual perception worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Find Objects Worksheets | LessonCraftStudio',
        description: 'Create professional find objects worksheets with our visual discrimination worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/find-objects-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Grid Match Worksheets product page SEO
  if (params.slug === 'grid-match-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Kindergarten Worksheets | Grid Match Puzzle Worksheet Generator for First Grade',
      description: 'Create professional grid match puzzle worksheets with our advanced worksheet generator. Generate custom printable matching worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'grid match worksheets, puzzle worksheets, matching worksheets, kindergarten worksheets, printable worksheets, first grade worksheets, visual discrimination worksheets, spatial reasoning worksheets, picture puzzles, educational worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/grid-match-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Grid Match Worksheets | LessonCraftStudio',
        description: 'Create professional grid match puzzle worksheets with our worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/grid-match-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Crossword Worksheets product page SEO
  if (params.slug === 'crossword-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Crossword Worksheets | Picture Crossword Generator for Kindergarten',
      description: 'Create professional picture crossword worksheets with our crossword puzzle generator. Generate custom printable crossword worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'crossword worksheets, picture crossword, crossword generator, kindergarten worksheets, printable worksheets, first grade worksheets, phonics worksheets, sight words worksheets, vocabulary worksheets, spelling worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/crossword-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Crossword Worksheets | LessonCraftStudio',
        description: 'Create professional picture crossword worksheets with our crossword puzzle generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/crossword-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Cryptogram Worksheets product page SEO
  if (params.slug === 'cryptogram-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Picture Cryptogram Worksheets | Cryptogram Generator for Kindergarten',
      description: 'Create engaging picture cryptogram worksheets with our professional worksheet generator. Generate custom free printable worksheets perfect for kindergarten and first grade. Download high-quality PDF cryptogram worksheets in under 3 minutes.',
      keywords: 'cryptogram worksheets, picture cryptogram, cryptogram generator, kindergarten worksheets, printable worksheets, first grade worksheets, phonics worksheets, sight words worksheets, alphabet worksheets, code worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/cryptogram-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Picture Cryptogram Worksheets | LessonCraftStudio',
        description: 'Create engaging picture cryptogram worksheets with our professional worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/cryptogram-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Math Puzzle Worksheets product page SEO
  if (params.slug === 'math-puzzle-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Math Worksheets | Math Puzzle Generator for Kindergarten and First Grade',
      description: 'Create professional math puzzle worksheets with our math worksheet generator. Generate custom printable math worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'math puzzle worksheets, math worksheets, kindergarten worksheets, printable worksheets, addition worksheets, subtraction worksheets, math worksheet generator, free worksheets, first grade math, visual math',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Math Puzzle Worksheets | LessonCraftStudio',
        description: 'Create professional math puzzle worksheets with our math worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/math-puzzle-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Missing Pieces Worksheets product page SEO
  if (params.slug === 'missing-pieces-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Missing Pieces Worksheets | Visual Puzzle Generator for Kindergarten',
      description: 'Create professional missing pieces puzzle worksheets with our visual puzzle generator. Generate custom printable missing pieces worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'missing pieces worksheets, visual puzzle worksheets, kindergarten worksheets, printable worksheets, visual discrimination, spatial reasoning, worksheet generator, free worksheets, first grade worksheets, puzzle worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Missing Pieces Worksheets | LessonCraftStudio',
        description: 'Create professional missing pieces puzzle worksheets with our visual puzzle generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/missing-pieces-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // More or Less (Comparison) Worksheets product page SEO
  if (params.slug === 'more-less-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Comparison Worksheets | Greater Than Less Than Worksheet Maker',
      description: 'Create professional comparison worksheets with our greater than less than worksheet maker. Generate custom printable math worksheets perfect for kindergarten and first grade students learning number comparison skills. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'comparison worksheets, greater than less than worksheets, kindergarten worksheets, math worksheets, printable worksheets, number comparison, worksheet generator, free worksheets, first grade worksheets, more or less worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/more-less-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Comparison Worksheets | LessonCraftStudio',
        description: 'Create professional comparison worksheets with our greater than less than worksheet maker. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/more-less-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Odd One Out Worksheets product page SEO
  if (params.slug === 'odd-one-out-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Odd One Out Worksheets | Critical Thinking Worksheet Generator',
      description: 'Create professional odd one out worksheets with our critical thinking worksheet generator. Generate custom printable worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'odd one out worksheets, critical thinking worksheets, kindergarten worksheets, visual discrimination, printable worksheets, categorization worksheets, worksheet generator, free worksheets, first grade worksheets, logic worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/odd-one-out-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Odd One Out Worksheets | LessonCraftStudio',
        description: 'Create professional odd one out worksheets with our critical thinking worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/odd-one-out-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Pattern Train Worksheets product page SEO
  if (params.slug === 'pattern-train-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Pattern Train Worksheets | Pattern Recognition Worksheet Generator',
      description: 'Create professional pattern train worksheets with our pattern recognition worksheet generator. Generate custom printable worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'pattern train worksheets, pattern recognition worksheets, kindergarten worksheets, printable worksheets, AB patterns, ABC patterns, worksheet generator, free worksheets, first grade worksheets, math worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/pattern-train-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Pattern Train Worksheets | LessonCraftStudio',
        description: 'Create professional pattern train worksheets with our pattern recognition worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/pattern-train-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Pattern Worksheets product page SEO
  if (params.slug === 'pattern-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Pattern Worksheets | Math Worksheet Generator for Kindergarten',
      description: 'Create professional pattern recognition worksheets with our pattern worksheet generator. Generate custom printable math worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'pattern worksheets, math worksheets, kindergarten worksheets, printable worksheets, pattern recognition, AB patterns, ABC patterns, worksheet generator, free worksheets, first grade worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/pattern-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Pattern Worksheets | LessonCraftStudio',
        description: 'Create professional pattern recognition worksheets with our pattern worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/pattern-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Picture Path Worksheets product page SEO
  if (params.slug === 'picture-path-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Maze Worksheets | Picture Path Generator for Kindergarten',
      description: 'Create professional picture path maze worksheets with our maze generator. Generate custom printable maze worksheets with three game modes perfect for kindergarten and first grade. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'maze worksheets, picture path, kindergarten worksheets, printable worksheets, maze generator, free worksheets, first grade worksheets, visual learning, pathfinding activities, educational mazes',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/picture-path-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Maze Worksheets | LessonCraftStudio',
        description: 'Create professional picture path maze worksheets with our maze generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/picture-path-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Picture Sort Worksheets product page SEO
  if (params.slug === 'picture-sort-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Kindergarten Worksheets for Sorting Activities | Picture Sort Generator',
      description: 'Create professional picture sorting worksheets with our easy-to-use generator. Generate custom printable sorting worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'picture sort worksheets, sorting worksheets, kindergarten worksheets, printable worksheets, classification activities, free worksheets, first grade worksheets, sorting activities, categorization worksheets, visual sorting',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/picture-sort-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Kindergarten Worksheets for Sorting | LessonCraftStudio',
        description: 'Create professional picture sorting worksheets with our generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/picture-sort-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Prepositions Worksheets product page SEO
  if (params.slug === 'prepositions-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Prepositions Worksheets | Kindergarten Worksheet Generator',
      description: 'Create professional prepositions worksheets with our worksheet generator. Generate custom printable kindergarten worksheets perfect for teaching spatial concepts like in, on, under, and behind. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'prepositions worksheets, spatial concepts worksheets, kindergarten worksheets, printable worksheets, in on under behind, free worksheets, first grade worksheets, ESL worksheets, language worksheets, position words',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/prepositions-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Prepositions Worksheets | LessonCraftStudio',
        description: 'Create professional prepositions worksheets with our generator. Perfect for teaching spatial concepts to kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/prepositions-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Shadow Match Worksheets product page SEO
  if (params.slug === 'shadow-match-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Shadow Match Worksheets | Visual Perception Worksheet Generator',
      description: 'Create professional shadow match worksheets with our visual perception worksheet generator. Generate custom printable shadow matching worksheets perfect for kindergarten and first grade students developing visual discrimination skills. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'shadow match worksheets, visual perception worksheets, kindergarten worksheets, printable worksheets, shadow matching, silhouette worksheets, make it whole worksheets, spatial reasoning, visual discrimination, preschool worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Shadow Match Worksheets | LessonCraftStudio',
        description: 'Create professional shadow match worksheets with our visual perception generator. Perfect for developing visual discrimination skills in kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/shadow-match-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Subtraction Worksheets product page SEO
  if (params.slug === 'subtraction-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Subtraction Worksheets | Math Worksheet Generator for Kindergarten',
      description: 'Create professional subtraction worksheets with our math worksheet generator. Generate custom printable subtraction worksheets perfect for kindergarten and first grade students. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'subtraction worksheets, math worksheets, kindergarten worksheets, printable worksheets, subtraction practice, math worksheet generator, free worksheets, first grade math, subtraction problems, visual subtraction',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Subtraction Worksheets | LessonCraftStudio',
        description: 'Create professional subtraction worksheets with our math worksheet generator. Perfect for kindergarten and first grade students.',
        url: 'https://www.lessoncraftstudio.com/en/apps/subtraction-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Treasure Hunt Worksheets product page SEO
  if (params.slug === 'treasure-hunt-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Following Directions Worksheets | Treasure Hunt Generator for Kindergarten',
      description: 'Create professional treasure hunt worksheets with our following directions worksheet generator. Generate custom printable treasure hunt worksheets perfect for kindergarten and first grade students learning directional vocabulary and reading comprehension. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'treasure hunt worksheets, following directions worksheets, kindergarten worksheets, printable worksheets, directional vocabulary, free worksheets, first grade worksheets, spatial awareness, reading comprehension, navigation worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets`,
      },
      openGraph: {
        title: 'Free Printable Treasure Hunt Worksheets | LessonCraftStudio',
        description: 'Create professional treasure hunt worksheets with our following directions generator. Perfect for kindergarten and first grade students learning directional vocabulary.',
        url: 'https://www.lessoncraftstudio.com/en/apps/treasure-hunt-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Word Guess Worksheets product page SEO
  if (params.slug === 'word-guess-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Word Guess Worksheets | Word Guess Generator for Kindergarten',
      description: 'Create professional word guess worksheets with our word guess generator. Generate custom printable word guess worksheets perfect for kindergarten and first grade students learning vocabulary and spelling. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'word guess worksheets, word guess generator, kindergarten worksheets, printable worksheets, vocabulary worksheets, free worksheets, first grade worksheets, sight words worksheets, phonics worksheets, spelling worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets`,
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
        },
      },
      openGraph: {
        title: 'Free Printable Word Guess Worksheets | LessonCraftStudio',
        description: 'Create professional word guess worksheets with our word guess generator. Perfect for kindergarten and first grade students learning vocabulary and spelling.',
        url: 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Swedish Word Guess Worksheets product page SEO
  if (params.slug === 'gissa-ordet-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Gissa Ordet Generator - Arbetsblad Gratis för Bokstäver Lära Sig | Förskoleklass Material',
      description: 'Skapa professionella gissa-ordet-arbetsblad med vår generator. Generera anpassade arbetsblad gratis perfekta för förskoleklass och lågstadiet. Ladda ner högkvalitativa PDF-arbetsblad på under 3 minuter.',
      keywords: 'gissa ordet generator, arbetsblad gratis, förskoleklass material, bokstäver lära sig, skriva bokstäver, ordgissning, matematik arbetsblad, finmotorik övningar, målarbilder barn, lågstadiet',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/word-guess-worksheets',
        },
      },
      openGraph: {
        title: 'Gissa Ordet Generator - Arbetsblad Gratis | LessonCraftStudio',
        description: 'Skapa professionella gissa-ordet-arbetsblad för förskoleklass och lågstadiet. Perfekt för bokstäver lära sig och stavningsträning.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish word-guess slug to new slug (for backwards compatibility)
  if (params.slug === 'word-guess-worksheets' && params.locale === 'sv') {
    return {
      title: 'Gissa Ordet Generator - Arbetsblad Gratis | Förskoleklass Material',
      description: 'Skapa professionella gissa-ordet-arbetsblad för förskoleklass och lågstadiet.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/gissa-ordet-arbetsblad', // Point to new URL
      },
    };
  }

  // Writing Worksheets product page SEO
  if (params.slug === 'writing-worksheets' && params.locale === 'en') {
    return {
      title: 'Free Printable Tracing Worksheets | Letter Tracing Worksheets Generator for Kindergarten',
      description: 'Create professional handwriting practice worksheets with our writing worksheet generator. Generate custom printable tracing worksheets perfect for kindergarten and first grade students learning letter formation. Download high-quality PDF worksheets in under 3 minutes.',
      keywords: 'tracing worksheets, letter tracing worksheets, handwriting worksheets, kindergarten worksheets, printable worksheets, writing worksheets, free worksheets, first grade worksheets, alphabet worksheets, phonics worksheets',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.lessoncraftstudio.com/en/apps/writing-worksheets`,
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/writing-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skrivovningar-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/writing-worksheets',
        },
      },
      openGraph: {
        title: 'Free Printable Tracing Worksheets | LessonCraftStudio',
        description: 'Create professional handwriting practice worksheets with our writing worksheet generator. Perfect for kindergarten and first grade students learning letter formation.',
        url: 'https://www.lessoncraftstudio.com/en/apps/writing-worksheets',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Swedish Writing Worksheets product page SEO
  if (params.slug === 'skrivovningar-arbetsblad' && params.locale === 'sv') {
    return {
      title: 'Skriva Bokstäver Arbetsblad - Bokstäver Lära Sig Förskoleklass Material | Finmotorik Övningar Gratis',
      description: 'Skapa professionella arbetsblad för skrivövning med vår handstilsgenerator. Full Tillgång-prenumeration ger dig obegränsad åtkomst till alla 33 verktyg. Generera anpassade arbetsblad för bokstäver lära sig perfekta för förskoleklass och lågstadiet.',
      keywords: 'skriva bokstäver, arbetsblad gratis, förskoleklass material, finmotorik övningar, bokstäver lära sig, handstilsövningar, skrivarbetsblad, spårningsövningar, matematik arbetsblad, målarbilder barn',
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/skrivovningar-arbetsblad',
        languages: {
          'en': 'https://www.lessoncraftstudio.com/en/apps/writing-worksheets',
          'sv': 'https://www.lessoncraftstudio.com/sv/apps/skrivovningar-arbetsblad',
          'x-default': 'https://www.lessoncraftstudio.com/en/apps/writing-worksheets',
        },
      },
      openGraph: {
        title: 'Skriva Bokstäver Arbetsblad - Arbetsblad Gratis | LessonCraftStudio',
        description: 'Skapa professionella skrivarbetsblad för förskoleklass och lågstadiet. Perfekt för bokstäver lära sig och finmotorik övningar.',
        url: 'https://www.lessoncraftstudio.com/sv/apps/skrivovningar-arbetsblad',
        siteName: 'LessonCraftStudio',
        type: 'website',
      },
    };
  }

  // Legacy: Redirect old Swedish writing slug to new slug (for backwards compatibility)
  if (params.slug === 'writing-worksheets' && params.locale === 'sv') {
    return {
      title: 'Skriva Bokstäver Arbetsblad - Arbetsblad Gratis | Förskoleklass Material',
      description: 'Skapa professionella skrivarbetsblad för förskoleklass och lågstadiet.',
      robots: {
        index: false, // Don't index old URL
        follow: true,
      },
      alternates: {
        canonical: 'https://www.lessoncraftstudio.com/sv/apps/skrivovningar-arbetsblad', // Point to new URL
      },
    };
  }

  const appData = await getAppData(params.slug, params.locale);

  if (!appData) {
    return {
      title: 'App Not Found - LessonCraftStudio',
      description: 'The requested worksheet generator could not be found.'
    };
  }

  return {
    title: `${appData.name || appData.appId} - LessonCraftStudio`,
    description: appData.description || `Create professional ${appData.name || appData.appId} worksheets for your educational materials`,
    keywords: `${appData.name || appData.appId}, worksheet generator, teachers pay teachers, educational resources, printable worksheets`,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.lessoncraftstudio.com/${params.locale}/apps/${params.slug}`,
    },
  };
}

// Fetch app data from Strapi or use static data
async function getAppData(slug: string, locale: string) {
  // French translations
  const frenchTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addition avec Images',
      appId: 'image-addition',
      description: 'Créez des fiches d\'addition visuelles avec des images pour l\'apprentissage des mathématiques',
      category: 'Mathématiques',
      requiredTier: 'core',
      features: ['Problèmes mathématiques visuels', 'Difficulté personnalisable', 'Corrigés inclus', 'Format prêt à imprimer']
    },
    'alphabet-train': {
      name: 'Train de l\'Alphabet',
      appId: 'alphabet-train',
      description: 'Aidez les enfants à apprendre les lettres avec des fiches ludiques sur le thème du train',
      category: 'Langue & Lecture',
      requiredTier: 'core',
      features: ['Reconnaissance des lettres', 'Ordre alphabétique', 'Thème amusant du train', 'Plusieurs niveaux de difficulté']
    },
    'big-small-app': {
      name: 'Grand ou Petit',
      appId: 'big-small-app',
      description: 'Créez des fiches de comparaison de tailles avec des exercices visuels pour débutants',
      category: 'Apprentissage Précoce',
      requiredTier: 'full',
      features: ['Comparaisons de tailles', 'Exercices visuels', 'Choix multiples', 'Exercices de séquençage']
    },
    'chart-count-color': {
      name: 'Graphique à Compter',
      appId: 'chart-count-color',
      description: 'Créez des fiches de comptage et de graphiques colorés pour l\'apprentissage des nombres',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Exercices de comptage visuels', 'Graphiques en couleur', 'Apprentissage des nombres', 'Format prêt à imprimer']
    },
    'code-addition': {
      name: 'Addition Codée',
      appId: 'code-addition',
      description: 'Créez des exercices d\'addition avec des codes pour rendre les mathématiques amusantes',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Addition avec codes secrets', 'Activités ludiques', 'Difficulté adaptable', 'Corrigés inclus']
    },
    'coloring': {
      name: 'Pages de Coloriage',
      appId: 'coloring',
      description: 'Créez des pages de coloriage imprimables à partir de notre vaste bibliothèque d\'images',
      category: 'Art & Créativité',
      requiredTier: 'core',
      features: ['Plus de 100 images', 'Thèmes variés', 'Différents niveaux de difficulté', 'Impressions haute qualité']
    },
    'image-crossword': {
      name: 'Mots Croisés avec Images',
      appId: 'image-crossword',
      description: 'Générez des mots croisés illustrés pour enrichir le vocabulaire',
      category: 'Jeux de Mots',
      requiredTier: 'full',
      features: ['Génération automatique', 'Indices personnalisables', 'Différentes tailles de grilles', 'Corrigés inclus']
    },
    'image-cryptogram': {
      name: 'Cryptogramme avec Images',
      appId: 'image-cryptogram',
      description: 'Créez des cryptogrammes illustrés pour développer la logique et le vocabulaire',
      category: 'Énigmes',
      requiredTier: 'full',
      features: ['Cryptogrammes visuels', 'Codes personnalisables', 'Différents niveaux', 'Solutions fournies']
    },
    'draw-and-color': {
      name: 'Dessiner et Colorier',
      appId: 'draw-and-color',
      description: 'Créez des fiches combinant dessin et coloriage pour stimuler la créativité',
      category: 'Art & Créativité',
      requiredTier: 'full',
      features: ['Espaces de dessin libre', 'Zones à colorier', 'Thèmes variés', 'Stimule la créativité']
    },
    'drawing-lines': {
      name: 'Tracer des Lignes',
      appId: 'drawing-lines',
      description: 'Développez la motricité fine par des exercices de traçage de lignes',
      category: 'Motricité Fine',
      requiredTier: 'core',
      features: ['Activités de traçage', 'Reliez les points', 'Suivre un chemin', 'Préparation à l\'écriture']
    },
    'find-and-count': {
      name: 'Je vois, je vois',
      appId: 'find-and-count',
      description: 'Exercices de comptage visuel pour développer la reconnaissance des nombres',
      category: 'Perception Visuelle',
      requiredTier: 'core',
      features: ['Comptage d\'objets', 'Discrimination visuelle', 'Pratique des nombres', 'Images attrayantes']
    },
    'find-objects': {
      name: 'Chercher les Objets',
      appId: 'find-objects',
      description: 'Créez des fiches de recherche d\'objets pour améliorer l\'attention visuelle',
      category: 'Perception Visuelle',
      requiredTier: 'full',
      features: ['Exercices de recherche visuelle', 'Développe l\'attention', 'Thèmes variés', 'Différents niveaux de difficulté']
    },
    'grid-match': {
      name: 'Association sur Grille',
      appId: 'grid-match',
      description: 'Créez des exercices d\'association sur grille pour développer la perception spatiale',
      category: 'Association',
      requiredTier: 'full',
      features: ['Correspondance de motifs', 'Orientation spatiale', 'Perception visuelle', 'Difficulté progressive']
    },
    'matching-app': {
      name: 'Créateur d\'Associations',
      appId: 'matching-app',
      description: 'Créez des activités d\'association pour améliorer la mémoire et les capacités d\'association',
      category: 'Association',
      requiredTier: 'core',
      features: ['Association image à image', 'Association mot à image', 'Jeux de mémoire', 'Paires personnalisables']
    },
    'math-puzzle': {
      name: 'Énigmes Mathématiques',
      appId: 'math-puzzle',
      description: 'Créez des énigmes mathématiques stimulantes pour développer la logique',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Énigmes de calcul', 'Logique mathématique', 'Différents niveaux', 'Solutions incluses']
    },
    'math-worksheet': {
      name: 'Fiches de Mathématiques',
      appId: 'math-worksheet',
      description: 'Générez des fiches de mathématiques personnalisables pour tous les niveaux',
      category: 'Mathématiques',
      requiredTier: 'core',
      features: ['Addition et soustraction', 'Multiplication et division', 'Corrigés inclus', 'Niveaux de difficulté ajustables']
    },
    'missing-pieces': {
      name: 'Pièces Manquantes',
      appId: 'missing-pieces',
      description: 'Créez des exercices de complétion visuelle pour développer la logique',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Identification des éléments manquants', 'Raisonnement logique', 'Exercices visuels', 'Difficulté progressive']
    },
    'more-less': {
      name: 'Plus ou Moins',
      appId: 'more-less',
      description: 'Créez des exercices de comparaison de quantités pour apprendre les concepts mathématiques',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Comparaison de quantités', 'Concepts mathématiques', 'Exercices visuels', 'Apprentissage progressif']
    },
    'odd-one-out': {
      name: 'L\'Intrus',
      appId: 'odd-one-out',
      description: 'Créez des exercices pour identifier l\'élément différent et développer l\'analyse',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Identification de différences', 'Raisonnement logique', 'Catégorisation', 'Exercices variés']
    },
    'pattern-train': {
      name: 'Train des Motifs',
      appId: 'pattern-train',
      description: 'Créez des fiches de séquences sur le thème du train pour reconnaître les motifs',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Reconnaissance de motifs', 'Séquences logiques', 'Thème du train', 'Difficulté progressive']
    },
    'pattern-worksheet': {
      name: 'Fiches de Motifs',
      appId: 'pattern-worksheet',
      description: 'Créez des fiches pour apprendre les séquences et les motifs répétitifs',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Motifs et séquences', 'Reconnaissance visuelle', 'Raisonnement logique', 'Plusieurs niveaux']
    },
    'picture-bingo': {
      name: 'Loto des Images',
      appId: 'picture-bingo',
      description: 'Générez des cartes de loto personnalisées avec des images pour la classe',
      category: 'Jeux',
      requiredTier: 'core',
      features: ['Cartes de loto personnalisées', 'Images thématiques', 'Plusieurs tailles de cartes', 'Feuilles d\'appel incluses']
    },
    'picture-path': {
      name: 'Chemin des Images',
      appId: 'picture-path',
      description: 'Créez des parcours visuels pour développer la logique et le suivi de consignes',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Parcours à suivre', 'Logique séquentielle', 'Exercices visuels', 'Plusieurs niveaux de difficulté']
    },
    'picture-sort': {
      name: 'Tri d\'Images',
      appId: 'picture-sort',
      description: 'Créez des activités de classement d\'images pour développer la catégorisation',
      category: 'Logique',
      requiredTier: 'full',
      features: ['Tri et classification', 'Catégorisation', 'Raisonnement logique', 'Thèmes variés']
    },
    'prepositions': {
      name: 'Prépositions',
      appId: 'prepositions',
      description: 'Créez des exercices visuels pour apprendre les prépositions de manière ludique',
      category: 'Grammaire',
      requiredTier: 'full',
      features: ['Prépositions spatiales', 'Exercices illustrés', 'Apprentissage visuel', 'Facile à comprendre']
    },
    'shadow-match': {
      name: 'Association d\'Ombres',
      appId: 'shadow-match',
      description: 'Créez des exercices d\'association d\'objets avec leurs ombres',
      category: 'Perception Visuelle',
      requiredTier: 'full',
      features: ['Association forme-ombre', 'Perception visuelle', 'Discrimination visuelle', 'Différents niveaux']
    },
    'subtraction': {
      name: 'Soustraction',
      appId: 'subtraction',
      description: 'Créez des fiches de soustraction visuelles pour l\'apprentissage des mathématiques',
      category: 'Mathématiques',
      requiredTier: 'full',
      features: ['Exercices de soustraction', 'Support visuel', 'Difficulté adaptable', 'Corrigés inclus']
    },
    'sudoku': {
      name: 'Sudoku pour Enfants',
      appId: 'sudoku',
      description: 'Sudoku ludiques avec des images au lieu de chiffres pour les enfants',
      category: 'Logique',
      requiredTier: 'core',
      features: ['Sudoku avec images', 'Grilles 4x4 et 6x6', 'Difficulté progressive', 'Solutions incluses']
    },
    'treasure-hunt': {
      name: 'Chasse au Trésor',
      appId: 'treasure-hunt',
      description: 'Créez des fiches de chasse au trésor pour des activités ludiques et éducatives',
      category: 'Jeux Éducatifs',
      requiredTier: 'full',
      features: ['Parcours de recherche', 'Activités ludiques', 'Cartes personnalisables', 'Stimule la réflexion']
    },
    'word-guess': {
      name: 'Deviner les Mots',
      appId: 'word-guess',
      description: 'Créez des fiches pour deviner les mots et enrichir le vocabulaire',
      category: 'Jeux de Mots',
      requiredTier: 'full',
      features: ['Devinettes de mots', 'Indices visuels', 'Enrichissement du vocabulaire', 'Plusieurs niveaux']
    },
    'word-scramble': {
      name: 'Mots Mêlés',
      appId: 'word-scramble',
      description: 'Créez des fiches de mots mêlés pour améliorer le vocabulaire et l\'orthographe',
      category: 'Langue & Lecture',
      requiredTier: 'core',
      features: ['Listes de mots personnalisées', 'Vocabulaire thématique', 'Plusieurs niveaux de difficulté', 'Corrigés inclus']
    },
    'word-search': {
      name: 'Mots Cachés',
      appId: 'word-search',
      description: 'Générez des grilles de mots cachés personnalisables avec vocabulaire thématique',
      category: 'Jeux de Mots',
      requiredTier: 'free',
      features: ['Plusieurs tailles de grilles', 'Options directionnelles', 'Listes de mots thématiques', 'Corrigés inclus']
    },
    'writing-app': {
      name: 'Exercices d\'Écriture',
      appId: 'writing-app',
      description: 'Créez des fiches d\'écriture personnalisées pour développer les compétences rédactionnelles',
      category: 'Compétences Rédactionnelles',
      requiredTier: 'full',
      features: ['Lignes d\'écriture personnalisables', 'Thèmes variés', 'Support visuel', 'Format prêt à imprimer']
    }
  };

  // Spanish translations
  const spanishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Suma con Imágenes',
      appId: 'image-addition',
      description: 'Crea fichas de sumas visuales con imágenes para el aprendizaje matemático inicial',
      category: 'Matemáticas',
      requiredTier: 'core',
      features: ['Problemas matemáticos visuales', 'Dificultad personalizable', 'Hojas de respuestas', 'Formato listo para imprimir']
    },
    'alphabet-train': {
      name: 'Tren del Alfabeto',
      appId: 'alphabet-train',
      description: 'Ayuda a los niños a aprender las letras con fichas divertidas del tren del alfabeto',
      category: 'Lengua y Lectura',
      requiredTier: 'core',
      features: ['Reconocimiento de letras', 'Orden alfabético', 'Temática divertida de trenes', 'Múltiples niveles de dificultad']
    },
    'big-small-app': {
      name: 'Grande o Pequeño',
      appId: 'big-small-app',
      description: 'Crea fichas de comparación de tamaños con ejercicios visuales para primeros aprendizajes',
      category: 'Aprendizaje Temprano',
      requiredTier: 'full',
      features: ['Comparación de tamaños', 'Ejercicios visuales', 'Opción múltiple', 'Actividades de secuenciación']
    },
    'chart-count-color': {
      name: 'Gráficos para Contar',
      appId: 'chart-count-color',
      description: 'Crea fichas de conteo y gráficos coloridos para el aprendizaje numérico',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Ejercicios de conteo visual', 'Gráficos a color', 'Aprendizaje de números', 'Formato listo para imprimir']
    },
    'code-addition': {
      name: 'Suma con Códigos',
      appId: 'code-addition',
      description: 'Crea ejercicios de suma con códigos secretos para hacer las matemáticas más divertidas',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Sumas con códigos secretos', 'Actividades lúdicas', 'Dificultad ajustable', 'Hojas de respuestas incluidas']
    },
    'coloring': {
      name: 'Páginas para Colorear',
      appId: 'coloring',
      description: 'Diseña páginas para colorear imprimibles desde nuestra amplia biblioteca de imágenes',
      category: 'Arte y Creatividad',
      requiredTier: 'core',
      features: ['Más de 100 imágenes', 'Múltiples temáticas', 'Varios niveles de dificultad', 'Impresiones de alta calidad']
    },
    'image-crossword': {
      name: 'Crucigrama con Imágenes',
      appId: 'image-crossword',
      description: 'Genera crucigramas ilustrados para enriquecer el vocabulario',
      category: 'Juegos de Palabras',
      requiredTier: 'full',
      features: ['Generación automática', 'Pistas personalizables', 'Diferentes tamaños de cuadrícula', 'Hojas de respuestas incluidas']
    },
    'image-cryptogram': {
      name: 'Criptograma con Imágenes',
      appId: 'image-cryptogram',
      description: 'Crea criptogramas ilustrados para desarrollar la lógica y el vocabulario',
      category: 'Acertijos',
      requiredTier: 'full',
      features: ['Criptogramas visuales', 'Códigos personalizables', 'Diferentes niveles', 'Soluciones incluidas']
    },
    'draw-and-color': {
      name: 'Dibujar y Colorear',
      appId: 'draw-and-color',
      description: 'Crea fichas que combinan dibujo y coloreo para estimular la creatividad',
      category: 'Arte y Creatividad',
      requiredTier: 'full',
      features: ['Espacios para dibujo libre', 'Zonas para colorear', 'Temáticas variadas', 'Estimula la creatividad']
    },
    'drawing-lines': {
      name: 'Trazar Líneas',
      appId: 'drawing-lines',
      description: 'Desarrolla la motricidad fina mediante ejercicios de trazado de líneas',
      category: 'Motricidad Fina',
      requiredTier: 'core',
      features: ['Actividades de trazado', 'Une los puntos', 'Seguimiento de caminos', 'Preparación para la escritura']
    },
    'find-and-count': {
      name: 'Veo Veo',
      appId: 'find-and-count',
      description: 'Ejercicios de conteo visual para desarrollar el reconocimiento numérico',
      category: 'Percepción Visual',
      requiredTier: 'core',
      features: ['Conteo de objetos', 'Discriminación visual', 'Práctica numérica', 'Imágenes atractivas']
    },
    'find-objects': {
      name: 'Buscar Objetos',
      appId: 'find-objects',
      description: 'Crea fichas de búsqueda de objetos para mejorar la atención visual',
      category: 'Percepción Visual',
      requiredTier: 'full',
      features: ['Ejercicios de búsqueda visual', 'Desarrolla la atención', 'Temáticas variadas', 'Diferentes niveles de dificultad']
    },
    'grid-match': {
      name: 'Asociación en Cuadrícula',
      appId: 'grid-match',
      description: 'Crea ejercicios de asociación en cuadrícula para desarrollar la percepción espacial',
      category: 'Asociación',
      requiredTier: 'full',
      features: ['Correspondencia de patrones', 'Orientación espacial', 'Percepción visual', 'Dificultad progresiva']
    },
    'matching-app': {
      name: 'Creador de Parejas',
      appId: 'matching-app',
      description: 'Crea actividades de asociación para mejorar la memoria y las habilidades de emparejamiento',
      category: 'Asociación',
      requiredTier: 'core',
      features: ['Asociación imagen a imagen', 'Asociación palabra a imagen', 'Juegos de memoria', 'Parejas personalizables']
    },
    'math-puzzle': {
      name: 'Acertijos Matemáticos',
      appId: 'math-puzzle',
      description: 'Crea acertijos matemáticos desafiantes para desarrollar la lógica',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Acertijos de cálculo', 'Lógica matemática', 'Diferentes niveles', 'Soluciones incluidas']
    },
    'math-worksheet': {
      name: 'Fichas de Matemáticas',
      appId: 'math-worksheet',
      description: 'Genera fichas de práctica matemática personalizables para todos los niveles',
      category: 'Matemáticas',
      requiredTier: 'core',
      features: ['Suma y resta', 'Multiplicación y división', 'Hojas de respuestas', 'Niveles de dificultad ajustables']
    },
    'missing-pieces': {
      name: 'Piezas Faltantes',
      appId: 'missing-pieces',
      description: 'Crea ejercicios de completar elementos visuales para desarrollar la lógica',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificación de elementos faltantes', 'Razonamiento lógico', 'Ejercicios visuales', 'Dificultad progresiva']
    },
    'more-less': {
      name: 'Más o Menos',
      appId: 'more-less',
      description: 'Crea ejercicios de comparación de cantidades para aprender conceptos matemáticos',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Comparación de cantidades', 'Conceptos matemáticos básicos', 'Ejercicios visuales', 'Aprendizaje progresivo']
    },
    'odd-one-out': {
      name: 'El Diferente',
      appId: 'odd-one-out',
      description: 'Crea ejercicios para identificar el elemento diferente y desarrollar el análisis',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificación de diferencias', 'Razonamiento lógico', 'Categorización', 'Ejercicios variados']
    },
    'pattern-train': {
      name: 'Tren de Patrones',
      appId: 'pattern-train',
      description: 'Crea fichas de secuencias con temática de trenes para reconocer patrones',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Reconocimiento de patrones', 'Secuencias lógicas', 'Temática de trenes', 'Dificultad progresiva']
    },
    'pattern-worksheet': {
      name: 'Fichas de Patrones',
      appId: 'pattern-worksheet',
      description: 'Crea fichas para aprender secuencias y patrones repetitivos',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Patrones y secuencias', 'Reconocimiento visual', 'Razonamiento lógico', 'Múltiples niveles']
    },
    'picture-bingo': {
      name: 'Bingo de Imágenes',
      appId: 'picture-bingo',
      description: 'Genera cartones de bingo personalizados con imágenes para el aula',
      category: 'Juegos',
      requiredTier: 'core',
      features: ['Cartones de bingo personalizados', 'Imágenes temáticas', 'Múltiples tamaños de cartones', 'Hojas de llamado incluidas']
    },
    'picture-path': {
      name: 'Camino de Imágenes',
      appId: 'picture-path',
      description: 'Crea recorridos visuales para desarrollar la lógica y seguimiento de instrucciones',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Recorridos a seguir', 'Lógica secuencial', 'Ejercicios visuales', 'Múltiples niveles de dificultad']
    },
    'picture-sort': {
      name: 'Clasificar Imágenes',
      appId: 'picture-sort',
      description: 'Crea actividades de clasificación de imágenes para desarrollar la categorización',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Clasificación y ordenamiento', 'Categorización', 'Razonamiento lógico', 'Temáticas variadas']
    },
    'prepositions': {
      name: 'Preposiciones',
      appId: 'prepositions',
      description: 'Crea ejercicios visuales para aprender las preposiciones de forma lúdica',
      category: 'Gramática',
      requiredTier: 'full',
      features: ['Preposiciones espaciales', 'Ejercicios ilustrados', 'Aprendizaje visual', 'Fácil de comprender']
    },
    'shadow-match': {
      name: 'Asociación de Sombras',
      appId: 'shadow-match',
      description: 'Crea ejercicios de asociación de objetos con sus sombras',
      category: 'Percepción Visual',
      requiredTier: 'full',
      features: ['Asociación forma-sombra', 'Percepción visual', 'Discriminación visual', 'Diferentes niveles']
    },
    'subtraction': {
      name: 'Resta',
      appId: 'subtraction',
      description: 'Crea fichas de resta visuales para el aprendizaje matemático',
      category: 'Matemáticas',
      requiredTier: 'full',
      features: ['Ejercicios de resta', 'Apoyo visual', 'Dificultad ajustable', 'Hojas de respuestas incluidas']
    },
    'sudoku': {
      name: 'Sudoku para Niños',
      appId: 'sudoku',
      description: 'Sudokus lúdicos con imágenes en lugar de números para niños',
      category: 'Lógica',
      requiredTier: 'core',
      features: ['Sudoku con imágenes', 'Cuadrículas 4x4 y 6x6', 'Dificultad progresiva', 'Soluciones incluidas']
    },
    'treasure-hunt': {
      name: 'Búsqueda del Tesoro',
      appId: 'treasure-hunt',
      description: 'Crea fichas de búsqueda del tesoro para actividades lúdicas y educativas',
      category: 'Juegos Educativos',
      requiredTier: 'full',
      features: ['Recorridos de búsqueda', 'Actividades lúdicas', 'Mapas personalizables', 'Estimula el razonamiento']
    },
    'word-guess': {
      name: 'Adivinar Palabras',
      appId: 'word-guess',
      description: 'Crea fichas para adivinar palabras y enriquecer el vocabulario',
      category: 'Juegos de Palabras',
      requiredTier: 'full',
      features: ['Adivinanzas de palabras', 'Pistas visuales', 'Enriquecimiento del vocabulario', 'Múltiples niveles']
    },
    'word-scramble': {
      name: 'Palabras Revueltas',
      appId: 'word-scramble',
      description: 'Crea fichas de palabras revueltas para mejorar el vocabulario y la ortografía',
      category: 'Lengua y Lectura',
      requiredTier: 'core',
      features: ['Listas de palabras personalizadas', 'Vocabulario temático', 'Múltiples niveles de dificultad', 'Hojas de respuestas incluidas']
    },
    'word-search': {
      name: 'Sopa de Letras',
      appId: 'word-search',
      description: 'Genera sopas de letras personalizables con vocabulario temático',
      category: 'Juegos de Palabras',
      requiredTier: 'free',
      features: ['Múltiples tamaños de cuadrícula', 'Opciones direccionales', 'Listas de palabras temáticas', 'Hojas de respuestas incluidas']
    },
    'writing-app': {
      name: 'Ejercicios de Escritura',
      appId: 'writing-app',
      description: 'Crea fichas de escritura personalizadas para desarrollar las habilidades de redacción',
      category: 'Habilidades de Escritura',
      requiredTier: 'full',
      features: ['Líneas de escritura personalizables', 'Temáticas variadas', 'Apoyo visual', 'Formato listo para imprimir']
    }
  };

  // German translations
  const germanTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Bilder-Addition',
      appId: 'image-addition',
      description: 'Erstellen Sie visuelle Additions-Arbeitsblätter mit Bildern für den Mathematik-Einstieg',
      category: 'Mathematik',
      requiredTier: 'core',
      features: ['Anschauliche Rechenaufgaben', 'Einstellbarer Schwierigkeitsgrad', 'Lösungsblätter inklusive', 'Druckfertige Formatierung']
    },
    'alphabet-train': {
      name: 'Alphabet-Zug',
      appId: 'alphabet-train',
      description: 'Spielerisches Buchstabenlernen mit liebevoll gestalteten Zug-Arbeitsblättern',
      category: 'Sprache & Lesen',
      requiredTier: 'core',
      features: ['Buchstabenerkennung', 'Alphabetische Reihenfolge', 'Motivierendes Zug-Design', 'Verschiedene Schwierigkeitsstufen']
    },
    'big-small-app': {
      name: 'Groß oder Klein',
      appId: 'big-small-app',
      description: 'Größenvergleiche kindgerecht vermitteln mit visuellen Übungen für die Frühförderung',
      category: 'Frühförderung',
      requiredTier: 'full',
      features: ['Größenvergleiche', 'Anschauliche Übungen', 'Multiple-Choice-Aufgaben', 'Reihenfolge-Aufgaben']
    },
    'chart-count-color': {
      name: 'Diagramm Zählen & Ausmalen',
      appId: 'chart-count-color',
      description: 'Zählen und Datenvisualisierung spielerisch kombinieren mit farbenfrohen Diagramm-Arbeitsblättern',
      category: 'Datenauswertung',
      requiredTier: 'full',
      features: ['Balkendiagramme erstellen', 'Zählübungen', 'Farbcodierung', 'Dateninterpretation']
    },
    'code-addition': {
      name: 'Geheimcode-Addition',
      appId: 'code-addition',
      description: 'Rechenübungen spannend gestalten mit Geheimcode-Rätseln zur Addition',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Verschlüsselte Rechenaufgaben', 'Additions-Training', 'Entschlüsselungs-Spaß', 'Motivierende Rätsel']
    },
    'coloring': {
      name: 'Ausmalbilder',
      appId: 'coloring',
      description: 'Individuelle Ausmalbilder aus unserer umfangreichen Motivbibliothek gestalten',
      category: 'Kunst & Kreativität',
      requiredTier: 'core',
      features: ['Über 100 Motive', 'Vielfältige Themenwelten', 'Unterschiedliche Schwierigkeitsgrade', 'Hochwertige Druckqualität']
    },
    'image-crossword': {
      name: 'Bilder-Kreuzworträtsel',
      appId: 'image-crossword',
      description: 'Kreuzworträtsel mit Bildern als Hinweise für visuelles Vokabeltraining',
      category: 'Wortspiele',
      requiredTier: 'full',
      features: ['Bildbasierte Hinweise', 'Automatische Rätsel-Generierung', 'Flexible Rastergrößen', 'Lösungsschlüssel enthalten']
    },
    'image-cryptogram': {
      name: 'Bilder-Kryptogramm',
      appId: 'image-cryptogram',
      description: 'Knifflige Geheimschrift-Rätsel mit Bildern als Symbole erstellen',
      category: 'Rätsel',
      requiredTier: 'full',
      features: ['Bild-Symbole als Code', 'Entschlüsselungs-Spaß', 'Geheime Botschaften', 'Logisches Denken fördern']
    },
    'draw-and-color': {
      name: 'Zeichnen & Ausmalen',
      appId: 'draw-and-color',
      description: 'Kreativität fördern mit kombinierten Zeichen- und Ausmalvorlagen',
      category: 'Kunst & Kreativität',
      requiredTier: 'full',
      features: ['Schritt-für-Schritt-Anleitungen', 'Ausmalvorlagen', 'Zeichenübungen', 'Kreative Aufgabenstellungen']
    },
    'drawing-lines': {
      name: 'Linien Nachzeichnen',
      appId: 'drawing-lines',
      description: 'Feinmotorik spielerisch trainieren durch abwechslungsreiche Schwungübungen',
      category: 'Feinmotorik',
      requiredTier: 'core',
      features: ['Nachspurübungen', 'Punkteverbinden', 'Linienführung', 'Schreibvorbereitung']
    },
    'find-and-count': {
      name: 'Ich sehe was',
      appId: 'find-and-count',
      description: 'Zahlenverständnis aufbauen mit motivierenden Zähl- und Suchübungen',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'core',
      features: ['Objekte zählen', 'Visuelle Unterscheidung', 'Zahlenübungen', 'Ansprechende Motive']
    },
    'find-objects': {
      name: 'Objekte Finden',
      appId: 'find-objects',
      description: 'Konzentration und visuelle Wahrnehmung mit Suchbild-Arbeitsblättern schulen',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'full',
      features: ['Versteckte Objekte suchen', 'Wimmelbilder', 'Verschiedene Szenen', 'Aufmerksamkeit trainieren']
    },
    'grid-match': {
      name: 'Raster-Zuordnung',
      appId: 'grid-match',
      description: 'Räumliches Denken entwickeln mit rasterbasierte Zuordnungsübungen',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Koordinatensystem-Übungen', 'Mustererkennung', 'Räumliche Orientierung', 'Zuordnungsaufgaben']
    },
    'matching-app': {
      name: 'Zuordnungsspiel',
      appId: 'matching-app',
      description: 'Gedächtnis und Assoziationsfähigkeit trainieren mit vielseitigen Zuordnungsaufgaben',
      category: 'Zuordnung',
      requiredTier: 'core',
      features: ['Bild-zu-Bild-Zuordnung', 'Wort-zu-Bild-Zuordnung', 'Memory-Spiele', 'Individuelle Paare']
    },
    'math-puzzle': {
      name: 'Mathe-Rätsel',
      appId: 'math-puzzle',
      description: 'Mathematisches Denken fördern mit abwechslungsreichen Knobel-Aufgaben',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Spannende Rechenrätsel', 'Vielfältige Rätseltypen', 'Lösungsschlüssel', 'Anpassbare Schwierigkeit']
    },
    'math-worksheet': {
      name: 'Mathe-Arbeitsblätter',
      appId: 'math-worksheet',
      description: 'Flexible Mathematik-Übungsblätter für alle Klassenstufen und Rechenoperationen erstellen',
      category: 'Mathematik',
      requiredTier: 'core',
      features: ['Addition & Subtraktion', 'Multiplikation & Division', 'Lösungsblätter', 'Einstellbare Schwierigkeit']
    },
    'missing-pieces': {
      name: 'Fehlende Teile',
      appId: 'missing-pieces',
      description: 'Logisches Denken schulen durch Vervollständigungs-Aufgaben mit Mustern und Bildern',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'full',
      features: ['Muster vervollständigen', 'Bilder ergänzen', 'Sequenz-Übungen', 'Visuelle Analyse']
    },
    'more-less': {
      name: 'Mehr oder Weniger',
      appId: 'more-less',
      description: 'Mengenvergleiche und Zahlenverständnis mit anschaulichen Vergleichsübungen vermitteln',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Mengenvergleiche', 'Zahlenvergleiche', 'Visuelle Darstellung', 'Grundrechenarten']
    },
    'odd-one-out': {
      name: 'Was passt nicht?',
      appId: 'odd-one-out',
      description: 'Kritisches Denken fördern mit Aufgaben zum Erkennen von Ausreißern und Unterschieden',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Unterschiede erkennen', 'Logikrätsel', 'Verschiedene Themen', 'Analytisches Denken']
    },
    'pattern-train': {
      name: 'Muster-Zug',
      appId: 'pattern-train',
      description: 'Mustererkennung spielerisch üben mit motivierenden Zug-Arbeitsblättern',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Mustersequenzen', 'Liebevolles Zug-Design', 'Fortsetzungsübungen', 'Logisches Denken']
    },
    'pattern-worksheet': {
      name: 'Muster-Arbeitsblätter',
      appId: 'pattern-worksheet',
      description: 'Vielseitige Übungen zur Mustererkennung und -vervollständigung für verschiedene Altersstufen',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Abwechslungsreiche Muster', 'Sequenz-Übungen', 'Steigende Schwierigkeit', 'Visuelle Logik']
    },
    'picture-bingo': {
      name: 'Bilder-Bingo',
      appId: 'picture-bingo',
      description: 'Individuelle Bingo-Karten mit Bildern für kurzweiligen Lernspaß im Klassenzimmer',
      category: 'Spiele',
      requiredTier: 'core',
      features: ['Individuelle Bingo-Karten', 'Thematische Bilder', 'Verschiedene Kartengrößen', 'Ziehungs-Vorlagen inklusive']
    },
    'picture-path': {
      name: 'Bilderpfad',
      appId: 'picture-path',
      description: 'Wegfindung und Reihenfolgen trainieren mit bilderreichen Pfad-Übungen',
      category: 'Problemlösung',
      requiredTier: 'full',
      features: ['Wegfindungs-Aufgaben', 'Bildbasierte Pfade', 'Reihenfolgen üben', 'Richtungsübungen']
    },
    'picture-sort': {
      name: 'Bilder Sortieren',
      appId: 'picture-sort',
      description: 'Kategorisierung und Klassifizierung mit anschaulichen Sortier-Aufgaben vermitteln',
      category: 'Logik & Denken',
      requiredTier: 'full',
      features: ['Kategorien bilden', 'Sortieraufgaben', 'Klassifizierung', 'Gruppen zuordnen']
    },
    'prepositions': {
      name: 'Präpositionen',
      appId: 'prepositions',
      description: 'Räumliche Präpositionen anschaulich vermitteln mit bildhaften Übungsblättern',
      category: 'Grammatik',
      requiredTier: 'full',
      features: ['Anschauliche Beispiele', 'Positionsübungen', 'Vielfältige Präpositionen', 'Praktische Anwendungen']
    },
    'shadow-match': {
      name: 'Schatten-Zuordnung',
      appId: 'shadow-match',
      description: 'Visuelle Wahrnehmung schärfen durch Schatten-Zuordnungs-Rätsel',
      category: 'Visuelle Wahrnehmung',
      requiredTier: 'full',
      features: ['Schatten-Rätsel', 'Verschiedene Themen', 'Stufenweise Schwierigkeit', 'Visuelles Lernen']
    },
    'subtraction': {
      name: 'Subtraktion',
      appId: 'subtraction',
      description: 'Subtraktionsaufgaben anschaulich üben mit visuellen Hilfsmitteln und Bildern',
      category: 'Mathematik',
      requiredTier: 'full',
      features: ['Visuelle Subtraktionsübungen', 'Einstellbare Zahlenbereiche', 'Bildunterstützung', 'Lösungsschlüssel']
    },
    'sudoku': {
      name: 'Kinder-Sudoku',
      appId: 'sudoku',
      description: 'Altersgerechte Sudoku-Rätsel mit Bildern statt Zahlen für logisches Denken',
      category: 'Logik & Denken',
      requiredTier: 'core',
      features: ['Bild-Sudoku', '4x4 und 6x6 Raster', 'Steigende Schwierigkeit', 'Lösung enthalten']
    },
    'treasure-hunt': {
      name: 'Schatzsuche',
      appId: 'treasure-hunt',
      description: 'Spannende Schatzkarten und Such-Abenteuer für motivierenden Lernspaß gestalten',
      category: 'Spiele',
      requiredTier: 'full',
      features: ['Individuelle Karten', 'Versteckte Objekte', 'Hinweise und Rätsel', 'Abenteuer-Thema']
    },
    'word-guess': {
      name: 'Worträtsel',
      appId: 'word-guess',
      description: 'Wortschatz und Rechtschreibung mit bildergestützten Ratespielen fördern',
      category: 'Wortspiele',
      requiredTier: 'full',
      features: ['Bildhinweise', 'Buchstabenlücken', 'Thematische Wörter', 'Verschiedene Schwierigkeitsgrade']
    },
    'word-scramble': {
      name: 'Buchstabensalat',
      appId: 'word-scramble',
      description: 'Rechtschreibung und Wortschatz mit abwechslungsreichen Buchstabensalat-Rätseln trainieren',
      category: 'Sprache & Lesen',
      requiredTier: 'core',
      features: ['Eigene Wortlisten', 'Thematischer Wortschatz', 'Verschiedene Schwierigkeitsgrade', 'Lösungsschlüssel']
    },
    'word-search': {
      name: 'Wortsuche',
      appId: 'word-search',
      description: 'Individuelle Wortsuchrätsel mit thematischem Vokabular zum Ausdrucken erstellen',
      category: 'Wortspiele',
      requiredTier: 'free',
      features: ['Flexible Rastergröße', 'Suchrichtungen einstellen', 'Thematische Wortlisten', 'Lösungsblätter']
    },
    'writing-app': {
      name: 'Schreibübungen',
      appId: 'writing-app',
      description: 'Strukturierte Schreibvorlagen und Schreibanlässe für alle Altersstufen erstellen',
      category: 'Schreibfertigkeiten',
      requiredTier: 'full',
      features: ['Schreibanlässe', 'Strukturierte Vorlagen', 'Verschiedene Formate', 'Altersgerechte Übungen']
    }
  };

  // Italian translations
  const italianTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addizioni con Immagini',
      appId: 'image-addition',
      description: 'Crea schede di addizioni visuali con immagini per l\'apprendimento matematico iniziale',
      category: 'Matematica',
      requiredTier: 'core',
      features: ['Problemi matematici visuali', 'Difficoltà personalizzabile', 'Chiavi di risposta', 'Formato pronto per la stampa']
    },
    'alphabet-train': {
      name: 'Treno dell\'Alfabeto',
      appId: 'alphabet-train',
      description: 'Aiuta i bambini a imparare le lettere con divertenti schede sul tema del trenino',
      category: 'Lingua e Lettura',
      requiredTier: 'core',
      features: ['Riconoscimento delle lettere', 'Ordine alfabetico', 'Tema divertente del trenino', 'Diversi livelli di difficoltà']
    },
    'big-small-app': {
      name: 'Grande o Piccolo',
      appId: 'big-small-app',
      description: 'Crea schede di confronto dimensioni con esercizi visuali per i primi apprendimenti',
      category: 'Apprendimento Precoce',
      requiredTier: 'full',
      features: ['Confronto di dimensioni', 'Esercizi visuali', 'Scelta multipla', 'Attività di sequenza']
    },
    'chart-count-color': {
      name: 'Grafici per Contare',
      appId: 'chart-count-color',
      description: 'Crea schede con grafici colorati per l\'apprendimento dei numeri',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Esercizi di conteggio visivo', 'Grafici a colori', 'Apprendimento dei numeri', 'Formato pronto per la stampa']
    },
    'code-addition': {
      name: 'Addizioni con Codici',
      appId: 'code-addition',
      description: 'Crea esercizi di addizione con codici segreti per rendere la matematica divertente',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Addizioni con codici segreti', 'Attività ludiche', 'Difficoltà regolabile', 'Chiavi di risposta incluse']
    },
    'coloring': {
      name: 'Pagine da Colorare',
      appId: 'coloring',
      description: 'Crea pagine da colorare stampabili dalla nostra ampia biblioteca di immagini',
      category: 'Arte e Creatività',
      requiredTier: 'core',
      features: ['Oltre 100 immagini', 'Temi multipli', 'Vari livelli di difficoltà', 'Stampe di alta qualità']
    },
    'image-crossword': {
      name: 'Cruciverba con Immagini',
      appId: 'image-crossword',
      description: 'Genera cruciverba illustrati per arricchire il vocabolario',
      category: 'Giochi di Parole',
      requiredTier: 'full',
      features: ['Generazione automatica', 'Indizi personalizzabili', 'Diverse dimensioni di griglia', 'Chiavi di risposta incluse']
    },
    'image-cryptogram': {
      name: 'Crittogramma con Immagini',
      appId: 'image-cryptogram',
      description: 'Crea crittogrammi illustrati per sviluppare logica e vocabolario',
      category: 'Enigmi',
      requiredTier: 'full',
      features: ['Crittogrammi visuali', 'Codici personalizzabili', 'Diversi livelli', 'Soluzioni incluse']
    },
    'draw-and-color': {
      name: 'Disegna e Colora',
      appId: 'draw-and-color',
      description: 'Crea schede che combinano disegno e colorazione per stimolare la creatività',
      category: 'Arte e Creatività',
      requiredTier: 'full',
      features: ['Spazi per disegno libero', 'Zone da colorare', 'Temi vari', 'Stimola la creatività']
    },
    'drawing-lines': {
      name: 'Tracciare Linee',
      appId: 'drawing-lines',
      description: 'Sviluppa la motricità fine attraverso esercizi di tracciamento di linee',
      category: 'Motricità Fine',
      requiredTier: 'core',
      features: ['Attività di tracciamento', 'Unisci i puntini', 'Seguire percorsi', 'Preparazione alla scrittura']
    },
    'find-and-count': {
      name: 'Vedo Vedo',
      appId: 'find-and-count',
      description: 'Esercizi di conteggio visivo per sviluppare il riconoscimento numerico',
      category: 'Percezione Visiva',
      requiredTier: 'core',
      features: ['Conteggio di oggetti', 'Discriminazione visiva', 'Pratica numerica', 'Immagini coinvolgenti']
    },
    'find-objects': {
      name: 'Trova gli Oggetti',
      appId: 'find-objects',
      description: 'Crea schede di ricerca oggetti per migliorare l\'attenzione visiva',
      category: 'Percezione Visiva',
      requiredTier: 'full',
      features: ['Esercizi di ricerca visiva', 'Sviluppa l\'attenzione', 'Temi vari', 'Diversi livelli di difficoltà']
    },
    'grid-match': {
      name: 'Associazione su Griglia',
      appId: 'grid-match',
      description: 'Crea esercizi di associazione su griglia per sviluppare la percezione spaziale',
      category: 'Associazione',
      requiredTier: 'full',
      features: ['Corrispondenza di pattern', 'Orientamento spaziale', 'Percezione visiva', 'Difficoltà progressiva']
    },
    'matching-app': {
      name: 'Creatore di Abbinamenti',
      appId: 'matching-app',
      description: 'Crea attività di abbinamento per migliorare memoria e capacità associative',
      category: 'Associazione',
      requiredTier: 'core',
      features: ['Abbinamento immagine-immagine', 'Abbinamento parola-immagine', 'Giochi di memoria', 'Coppie personalizzabili']
    },
    'math-puzzle': {
      name: 'Enigmi Matematici',
      appId: 'math-puzzle',
      description: 'Crea enigmi matematici stimolanti per sviluppare la logica',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Enigmi di calcolo', 'Logica matematica', 'Diversi livelli', 'Soluzioni incluse']
    },
    'math-worksheet': {
      name: 'Schede di Matematica',
      appId: 'math-worksheet',
      description: 'Genera schede di esercizi matematici personalizzabili per tutti i livelli',
      category: 'Matematica',
      requiredTier: 'core',
      features: ['Addizioni e sottrazioni', 'Moltiplicazioni e divisioni', 'Chiavi di risposta', 'Livelli di difficoltà regolabili']
    },
    'missing-pieces': {
      name: 'Pezzi Mancanti',
      appId: 'missing-pieces',
      description: 'Crea esercizi di completamento visivo per sviluppare la logica',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Identificazione di elementi mancanti', 'Ragionamento logico', 'Esercizi visuali', 'Difficoltà progressiva']
    },
    'more-less': {
      name: 'Più o Meno',
      appId: 'more-less',
      description: 'Crea esercizi di confronto quantità per apprendere concetti matematici',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Confronto di quantità', 'Concetti matematici di base', 'Esercizi visuali', 'Apprendimento progressivo']
    },
    'odd-one-out': {
      name: 'L\'Intruso',
      appId: 'odd-one-out',
      description: 'Crea esercizi per identificare l\'elemento diverso e sviluppare l\'analisi',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Identificazione di differenze', 'Ragionamento logico', 'Categorizzazione', 'Esercizi vari']
    },
    'pattern-train': {
      name: 'Treno dei Pattern',
      appId: 'pattern-train',
      description: 'Crea schede di sequenze sul tema del trenino per riconoscere i pattern',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Riconoscimento di pattern', 'Sequenze logiche', 'Tema del trenino', 'Difficoltà progressiva']
    },
    'pattern-worksheet': {
      name: 'Schede di Pattern',
      appId: 'pattern-worksheet',
      description: 'Crea schede per imparare sequenze e pattern ripetitivi',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Pattern e sequenze', 'Riconoscimento visivo', 'Ragionamento logico', 'Livelli multipli']
    },
    'picture-bingo': {
      name: 'Tombola con Immagini',
      appId: 'picture-bingo',
      description: 'Genera cartelle della tombola personalizzate con immagini per la classe',
      category: 'Giochi',
      requiredTier: 'core',
      features: ['Cartelle personalizzate', 'Immagini tematiche', 'Dimensioni multiple delle cartelle', 'Fogli di chiamata inclusi']
    },
    'picture-path': {
      name: 'Percorso delle Immagini',
      appId: 'picture-path',
      description: 'Crea percorsi visuali per sviluppare logica e seguire istruzioni',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Percorsi da seguire', 'Logica sequenziale', 'Esercizi visuali', 'Diversi livelli di difficoltà']
    },
    'picture-sort': {
      name: 'Classifica le Immagini',
      appId: 'picture-sort',
      description: 'Crea attività di classificazione immagini per sviluppare la categorizzazione',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Classificazione e ordinamento', 'Categorizzazione', 'Ragionamento logico', 'Temi vari']
    },
    'prepositions': {
      name: 'Preposizioni',
      appId: 'prepositions',
      description: 'Crea esercizi visuali per imparare le preposizioni in modo ludico',
      category: 'Grammatica',
      requiredTier: 'full',
      features: ['Preposizioni spaziali', 'Esercizi illustrati', 'Apprendimento visivo', 'Facile da comprendere']
    },
    'shadow-match': {
      name: 'Abbina le Ombre',
      appId: 'shadow-match',
      description: 'Crea esercizi di abbinamento oggetti con le loro ombre',
      category: 'Percezione Visiva',
      requiredTier: 'full',
      features: ['Abbinamento forma-ombra', 'Percezione visiva', 'Discriminazione visiva', 'Diversi livelli']
    },
    'subtraction': {
      name: 'Sottrazioni',
      appId: 'subtraction',
      description: 'Crea schede di sottrazioni visuali per l\'apprendimento matematico',
      category: 'Matematica',
      requiredTier: 'full',
      features: ['Esercizi di sottrazione', 'Supporto visivo', 'Difficoltà regolabile', 'Chiavi di risposta incluse']
    },
    'sudoku': {
      name: 'Sudoku per Bambini',
      appId: 'sudoku',
      description: 'Sudoku ludici con immagini al posto dei numeri per bambini',
      category: 'Logica',
      requiredTier: 'core',
      features: ['Sudoku con immagini', 'Griglie 4x4 e 6x6', 'Difficoltà progressiva', 'Soluzioni incluse']
    },
    'treasure-hunt': {
      name: 'Caccia al Tesoro',
      appId: 'treasure-hunt',
      description: 'Crea schede di caccia al tesoro per attività ludiche ed educative',
      category: 'Giochi Educativi',
      requiredTier: 'full',
      features: ['Percorsi di ricerca', 'Attività ludiche', 'Mappe personalizzabili', 'Stimola il ragionamento']
    },
    'word-guess': {
      name: 'Indovina la Parola',
      appId: 'word-guess',
      description: 'Crea schede per indovinare le parole e arricchire il vocabolario',
      category: 'Giochi di Parole',
      requiredTier: 'full',
      features: ['Indovinelli di parole', 'Indizi visuali', 'Arricchimento del vocabolario', 'Livelli multipli']
    },
    'word-scramble': {
      name: 'Parole Mescolate',
      appId: 'word-scramble',
      description: 'Crea schede di parole mescolate per migliorare vocabolario e ortografia',
      category: 'Lingua e Lettura',
      requiredTier: 'core',
      features: ['Liste di parole personalizzate', 'Vocabolario tematico', 'Diversi livelli di difficoltà', 'Chiavi di risposta incluse']
    },
    'word-search': {
      name: 'Crucipuzzle',
      appId: 'word-search',
      description: 'Genera crucipuzzle personalizzabili con vocabolario tematico',
      category: 'Giochi di Parole',
      requiredTier: 'free',
      features: ['Dimensioni multiple della griglia', 'Opzioni direzionali', 'Liste di parole tematiche', 'Chiavi di risposta incluse']
    },
    'writing-app': {
      name: 'Esercizi di Scrittura',
      appId: 'writing-app',
      description: 'Crea schede di scrittura personalizzate per sviluppare le abilità di scrittura',
      category: 'Abilità di Scrittura',
      requiredTier: 'full',
      features: ['Righe di scrittura personalizzabili', 'Temi vari', 'Supporto visivo', 'Formato pronto per la stampa']
    }
  };

  // Portuguese translations
  const portugueseTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Adição com Imagens',
      appId: 'image-addition',
      description: 'Crie fichas de adição visuais com imagens para o aprendizado inicial de matemática',
      category: 'Matemática',
      requiredTier: 'core',
      features: ['Problemas matemáticos visuais', 'Dificuldade personalizável', 'Gabaritos incluídos', 'Formato pronto para impressão']
    },
    'alphabet-train': {
      name: 'Trem do Alfabeto',
      appId: 'alphabet-train',
      description: 'Ajude as crianças a aprender as letras com fichas divertidas no tema do trem',
      category: 'Língua e Leitura',
      requiredTier: 'core',
      features: ['Reconhecimento de letras', 'Ordem alfabética', 'Tema divertido de trem', 'Múltiplos níveis de dificuldade']
    },
    'big-small-app': {
      name: 'Grande ou Pequeno',
      appId: 'big-small-app',
      description: 'Crie fichas de comparação de tamanhos com exercícios visuais para iniciantes',
      category: 'Aprendizagem Inicial',
      requiredTier: 'full',
      features: ['Comparação de tamanhos', 'Exercícios visuais', 'Múltipla escolha', 'Atividades de sequência']
    },
    'chart-count-color': {
      name: 'Gráficos de Contagem',
      appId: 'chart-count-color',
      description: 'Crie fichas de contagem com gráficos coloridos para o aprendizado numérico',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Exercícios de contagem visual', 'Gráficos coloridos', 'Aprendizado de números', 'Formato pronto para impressão']
    },
    'code-addition': {
      name: 'Adição com Códigos',
      appId: 'code-addition',
      description: 'Crie exercícios de adição com códigos secretos para tornar a matemática divertida',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Adição com códigos secretos', 'Atividades lúdicas', 'Dificuldade ajustável', 'Gabaritos incluídos']
    },
    'coloring': {
      name: 'Páginas para Colorir',
      appId: 'coloring',
      description: 'Crie páginas para colorir imprimíveis da nossa extensa biblioteca de imagens',
      category: 'Arte e Criatividade',
      requiredTier: 'core',
      features: ['Mais de 100 imagens', 'Múltiplos temas', 'Vários níveis de dificuldade', 'Impressões de alta qualidade']
    },
    'image-crossword': {
      name: 'Palavras Cruzadas com Imagens',
      appId: 'image-crossword',
      description: 'Gere palavras cruzadas ilustradas para enriquecer o vocabulário',
      category: 'Jogos de Palavras',
      requiredTier: 'full',
      features: ['Geração automática', 'Dicas personalizáveis', 'Diferentes tamanhos de grade', 'Gabaritos incluídos']
    },
    'image-cryptogram': {
      name: 'Criptograma com Imagens',
      appId: 'image-cryptogram',
      description: 'Crie criptogramas ilustrados para desenvolver lógica e vocabulário',
      category: 'Enigmas',
      requiredTier: 'full',
      features: ['Criptogramas visuais', 'Códigos personalizáveis', 'Diferentes níveis', 'Soluções incluídas']
    },
    'draw-and-color': {
      name: 'Desenhar e Colorir',
      appId: 'draw-and-color',
      description: 'Crie fichas que combinam desenho e coloração para estimular a criatividade',
      category: 'Arte e Criatividade',
      requiredTier: 'full',
      features: ['Espaços para desenho livre', 'Áreas para colorir', 'Temas variados', 'Estimula a criatividade']
    },
    'drawing-lines': {
      name: 'Traçar Linhas',
      appId: 'drawing-lines',
      description: 'Desenvolva a coordenação motora fina através de exercícios de traçado de linhas',
      category: 'Coordenação Motora Fina',
      requiredTier: 'core',
      features: ['Atividades de traçado', 'Ligue os pontos', 'Seguir caminhos', 'Preparação para a escrita']
    },
    'find-and-count': {
      name: 'Vejo, Vejo',
      appId: 'find-and-count',
      description: 'Exercícios de contagem visual para desenvolver o reconhecimento numérico',
      category: 'Percepção Visual',
      requiredTier: 'core',
      features: ['Contagem de objetos', 'Discriminação visual', 'Prática numérica', 'Imagens atrativas']
    },
    'find-objects': {
      name: 'Encontrar Objetos',
      appId: 'find-objects',
      description: 'Crie fichas de busca de objetos para melhorar a atenção visual',
      category: 'Percepção Visual',
      requiredTier: 'full',
      features: ['Exercícios de busca visual', 'Desenvolve a atenção', 'Temas variados', 'Diferentes níveis de dificuldade']
    },
    'grid-match': {
      name: 'Associação em Grade',
      appId: 'grid-match',
      description: 'Crie exercícios de associação em grade para desenvolver a percepção espacial',
      category: 'Associação',
      requiredTier: 'full',
      features: ['Correspondência de padrões', 'Orientação espacial', 'Percepção visual', 'Dificuldade progressiva']
    },
    'matching-app': {
      name: 'Criador de Pares',
      appId: 'matching-app',
      description: 'Crie atividades de associação para melhorar memória e habilidades de emparelhamento',
      category: 'Associação',
      requiredTier: 'core',
      features: ['Associação imagem-imagem', 'Associação palavra-imagem', 'Jogos de memória', 'Pares personalizáveis']
    },
    'math-puzzle': {
      name: 'Enigmas Matemáticos',
      appId: 'math-puzzle',
      description: 'Crie enigmas matemáticos desafiadores para desenvolver a lógica',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Enigmas de cálculo', 'Lógica matemática', 'Diferentes níveis', 'Soluções incluídas']
    },
    'math-worksheet': {
      name: 'Fichas de Matemática',
      appId: 'math-worksheet',
      description: 'Gere fichas de prática matemática personalizáveis para todos os níveis',
      category: 'Matemática',
      requiredTier: 'core',
      features: ['Adição e subtração', 'Multiplicação e divisão', 'Gabaritos incluídos', 'Níveis de dificuldade ajustáveis']
    },
    'missing-pieces': {
      name: 'Peças Faltantes',
      appId: 'missing-pieces',
      description: 'Crie exercícios de completar elementos visuais para desenvolver a lógica',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificação de elementos faltantes', 'Raciocínio lógico', 'Exercícios visuais', 'Dificuldade progressiva']
    },
    'more-less': {
      name: 'Mais ou Menos',
      appId: 'more-less',
      description: 'Crie exercícios de comparação de quantidades para aprender conceitos matemáticos',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Comparação de quantidades', 'Conceitos matemáticos básicos', 'Exercícios visuais', 'Aprendizado progressivo']
    },
    'odd-one-out': {
      name: 'O Diferente',
      appId: 'odd-one-out',
      description: 'Crie exercícios para identificar o elemento diferente e desenvolver a análise',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Identificação de diferenças', 'Raciocínio lógico', 'Categorização', 'Exercícios variados']
    },
    'pattern-train': {
      name: 'Trem dos Padrões',
      appId: 'pattern-train',
      description: 'Crie fichas de sequências com tema de trem para reconhecer padrões',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Reconhecimento de padrões', 'Sequências lógicas', 'Tema de trem', 'Dificuldade progressiva']
    },
    'pattern-worksheet': {
      name: 'Fichas de Padrões',
      appId: 'pattern-worksheet',
      description: 'Crie fichas para aprender sequências e padrões repetitivos',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Padrões e sequências', 'Reconhecimento visual', 'Raciocínio lógico', 'Múltiplos níveis']
    },
    'picture-bingo': {
      name: 'Bingo de Imagens',
      appId: 'picture-bingo',
      description: 'Gere cartelas de bingo personalizadas com imagens para a sala de aula',
      category: 'Jogos',
      requiredTier: 'core',
      features: ['Cartelas de bingo personalizadas', 'Imagens temáticas', 'Múltiplos tamanhos de cartelas', 'Folhas de chamada incluídas']
    },
    'picture-path': {
      name: 'Caminho das Imagens',
      appId: 'picture-path',
      description: 'Crie percursos visuais para desenvolver lógica e seguir instruções',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Percursos a seguir', 'Lógica sequencial', 'Exercícios visuais', 'Múltiplos níveis de dificuldade']
    },
    'picture-sort': {
      name: 'Classificar Imagens',
      appId: 'picture-sort',
      description: 'Crie atividades de classificação de imagens para desenvolver a categorização',
      category: 'Lógica',
      requiredTier: 'full',
      features: ['Classificação e ordenação', 'Categorização', 'Raciocínio lógico', 'Temas variados']
    },
    'prepositions': {
      name: 'Preposições',
      appId: 'prepositions',
      description: 'Crie exercícios visuais para aprender preposições de forma lúdica',
      category: 'Gramática',
      requiredTier: 'full',
      features: ['Preposições espaciais', 'Exercícios ilustrados', 'Aprendizado visual', 'Fácil de compreender']
    },
    'shadow-match': {
      name: 'Associação de Sombras',
      appId: 'shadow-match',
      description: 'Crie exercícios de associação de objetos com suas sombras',
      category: 'Percepção Visual',
      requiredTier: 'full',
      features: ['Associação forma-sombra', 'Percepção visual', 'Discriminação visual', 'Diferentes níveis']
    },
    'subtraction': {
      name: 'Subtração',
      appId: 'subtraction',
      description: 'Crie fichas de subtração visuais para o aprendizado matemático',
      category: 'Matemática',
      requiredTier: 'full',
      features: ['Exercícios de subtração', 'Apoio visual', 'Dificuldade ajustável', 'Gabaritos incluídos']
    },
    'sudoku': {
      name: 'Sudoku para Crianças',
      appId: 'sudoku',
      description: 'Sudokus lúdicos com imagens em vez de números para crianças',
      category: 'Lógica',
      requiredTier: 'core',
      features: ['Sudoku com imagens', 'Grades 4x4 e 6x6', 'Dificuldade progressiva', 'Soluções incluídas']
    },
    'treasure-hunt': {
      name: 'Caça ao Tesouro',
      appId: 'treasure-hunt',
      description: 'Crie fichas de caça ao tesouro para atividades lúdicas e educativas',
      category: 'Jogos Educativos',
      requiredTier: 'full',
      features: ['Percursos de busca', 'Atividades lúdicas', 'Mapas personalizáveis', 'Estimula o raciocínio']
    },
    'word-guess': {
      name: 'Adivinhar Palavras',
      appId: 'word-guess',
      description: 'Crie fichas para adivinhar palavras e enriquecer o vocabulário',
      category: 'Jogos de Palavras',
      requiredTier: 'full',
      features: ['Adivinhações de palavras', 'Dicas visuais', 'Enriquecimento do vocabulário', 'Múltiplos níveis']
    },
    'word-scramble': {
      name: 'Palavras Embaralhadas',
      appId: 'word-scramble',
      description: 'Crie fichas de palavras embaralhadas para melhorar vocabulário e ortografia',
      category: 'Língua e Leitura',
      requiredTier: 'core',
      features: ['Listas de palavras personalizadas', 'Vocabulário temático', 'Múltiplos níveis de dificuldade', 'Gabaritos incluídos']
    },
    'word-search': {
      name: 'Caça-Palavras',
      appId: 'word-search',
      description: 'Gere caça-palavras personalizáveis com vocabulário temático',
      category: 'Jogos de Palavras',
      requiredTier: 'free',
      features: ['Múltiplos tamanhos de grade', 'Opções direcionais', 'Listas de palavras temáticas', 'Gabaritos incluídos']
    },
    'writing-app': {
      name: 'Exercícios de Escrita',
      appId: 'writing-app',
      description: 'Crie fichas de escrita personalizadas para desenvolver habilidades de redação',
      category: 'Habilidades de Escrita',
      requiredTier: 'full',
      features: ['Linhas de escrita personalizáveis', 'Temas variados', 'Apoio visual', 'Formato pronto para impressão']
    }
  };

  // Dutch translations
  const dutchTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Sommen met Plaatjes',
      appId: 'image-addition',
      description: 'Maak visuele optel-werkbladen met afbeeldingen voor beginnende rekenaars',
      category: 'Rekenen',
      requiredTier: 'core',
      features: ['Visuele rekensommen', 'Aanpasbare moeilijkheid', 'Antwoordbladen', 'Print-klaar formaat']
    },
    'alphabet-train': {
      name: 'Alfabettrein',
      appId: 'alphabet-train',
      description: 'Help kinderen letters leren met leuke werkbladen met het thema trein',
      category: 'Taal',
      requiredTier: 'core',
      features: ['Letterherkenning', 'Alfabetische volgorde', 'Leuk trein thema', 'Meerdere moeilijkheidsniveaus']
    },
    'big-small-app': {
      name: 'Groot of Klein',
      appId: 'big-small-app',
      description: 'Maak werkbladen voor het vergelijken van groottes met visuele oefeningen voor beginners',
      category: 'Begrippen',
      requiredTier: 'full',
      features: ['Grootte vergelijkingen', 'Visuele oefeningen', 'Meerkeuzevragen', 'Volgorde opdrachten']
    },
    'chart-count-color': {
      name: 'Telgrafieken',
      appId: 'chart-count-color',
      description: 'Maak kleurrijke tel- en grafiekwerkbladen voor het leren van getallen',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Visuele teloefeningen', 'Kleurrijke grafieken', 'Getallen leren', 'Print-klaar formaat']
    },
    'code-addition': {
      name: 'Sommen in Code',
      appId: 'code-addition',
      description: 'Maak opteloefeningen met geheime codes om rekenen leuk te maken',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Optellen met geheime codes', 'Speelse activiteiten', 'Aanpasbare moeilijkheid', 'Antwoordbladen inbegrepen']
    },
    'coloring': {
      name: 'Kleurplaten',
      appId: 'coloring',
      description: 'Ontwerp afdrukbare kleurplaten uit onze uitgebreide afbeeldingenbibliotheek',
      category: 'Kunst & Creativiteit',
      requiredTier: 'core',
      features: ['Meer dan 100 afbeeldingen', 'Meerdere thema\'s', 'Verschillende moeilijkheidsniveaus', 'Hoogwaardige afdrukken']
    },
    'image-crossword': {
      name: 'Kruiswoordpuzzel met Plaatjes',
      appId: 'image-crossword',
      description: 'Genereer geïllustreerde kruiswoordpuzzels om de woordenschat te verrijken',
      category: 'Woordspellen',
      requiredTier: 'full',
      features: ['Automatische generatie', 'Aanpasbare hints', 'Verschillende roostergroottes', 'Antwoordbladen inbegrepen']
    },
    'image-cryptogram': {
      name: 'Cryptogram met Plaatjes',
      appId: 'image-cryptogram',
      description: 'Maak geïllustreerde cryptogrammen om logica en woordenschat te ontwikkelen',
      category: 'Woordspellen',
      requiredTier: 'full',
      features: ['Visuele cryptogrammen', 'Aanpasbare codes', 'Verschillende niveaus', 'Oplossingen inbegrepen']
    },
    'draw-and-color': {
      name: 'Teken en Kleur',
      appId: 'draw-and-color',
      description: 'Maak werkbladen die tekenen en kleuren combineren om creativiteit te stimuleren',
      category: 'Kunst & Creativiteit',
      requiredTier: 'full',
      features: ['Vrij tekenruimte', 'Kleurvlakken', 'Gevarieerde thema\'s', 'Stimuleert creativiteit']
    },
    'drawing-lines': {
      name: 'Lijnen Trekken',
      appId: 'drawing-lines',
      description: 'Ontwikkel fijne motoriek door middel van lijnentrekoefeningen',
      category: 'Fijne Motoriek',
      requiredTier: 'core',
      features: ['Traceeroefeningen', 'Stippen verbinden', 'Paden volgen', 'Schrijfvoorbereiding']
    },
    'find-and-count': {
      name: 'Ik zie, ik zie',
      appId: 'find-and-count',
      description: 'Visuele teloefeningen om getalherkenning en telvaardigheden te ontwikkelen',
      category: 'Visuele Waarneming',
      requiredTier: 'core',
      features: ['Objecten tellen', 'Visuele discriminatie', 'Getallen oefenen', 'Aantrekkelijke afbeeldingen']
    },
    'find-objects': {
      name: 'Zoek de Voorwerpen',
      appId: 'find-objects',
      description: 'Maak zoekwerkbladen om visuele aandacht te verbeteren',
      category: 'Visuele Waarneming',
      requiredTier: 'full',
      features: ['Visuele zoekoefeningen', 'Ontwikkelt aandacht', 'Gevarieerde thema\'s', 'Verschillende moeilijkheidsniveaus']
    },
    'grid-match': {
      name: 'Raster Koppelen',
      appId: 'grid-match',
      description: 'Maak raster-koppeloefeningen om ruimtelijk inzicht te ontwikkelen',
      category: 'Koppelen',
      requiredTier: 'full',
      features: ['Patronen matchen', 'Ruimtelijke oriëntatie', 'Visuele waarneming', 'Oplopende moeilijkheid']
    },
    'matching-app': {
      name: 'Koppelspel',
      appId: 'matching-app',
      description: 'Maak koppelactiviteiten om geheugen en associatievaardigheden te verbeteren',
      category: 'Koppelen',
      requiredTier: 'core',
      features: ['Afbeelding-afbeelding koppelen', 'Woord-afbeelding koppelen', 'Geheugenspelletjes', 'Aanpasbare paren']
    },
    'math-puzzle': {
      name: 'Rekenraadsels',
      appId: 'math-puzzle',
      description: 'Maak uitdagende rekenpuzzels om logisch denken te ontwikkelen',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Rekenpuzzels', 'Wiskundige logica', 'Verschillende niveaus', 'Oplossingen inbegrepen']
    },
    'math-worksheet': {
      name: 'Rekenwerkbladen',
      appId: 'math-worksheet',
      description: 'Genereer aanpasbare rekenoefeningen voor alle niveaus',
      category: 'Rekenen',
      requiredTier: 'core',
      features: ['Optellen en aftrekken', 'Vermenigvuldigen en delen', 'Antwoordbladen', 'Aanpasbare moeilijkheidsniveaus']
    },
    'missing-pieces': {
      name: 'Ontbrekende Stukjes',
      appId: 'missing-pieces',
      description: 'Maak visuele aanvuloefeningen om logisch denken te ontwikkelen',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Ontbrekende elementen identificeren', 'Logisch redeneren', 'Visuele oefeningen', 'Oplopende moeilijkheid']
    },
    'more-less': {
      name: 'Meer of Minder',
      appId: 'more-less',
      description: 'Maak oefeningen voor het vergelijken van hoeveelheden om wiskundige concepten te leren',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Hoeveelheden vergelijken', 'Basis wiskundige concepten', 'Visuele oefeningen', 'Geleidelijk leren']
    },
    'odd-one-out': {
      name: 'De Vreemde Eend',
      appId: 'odd-one-out',
      description: 'Maak oefeningen om het afwijkende element te identificeren en analyseren te ontwikkelen',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Verschillen identificeren', 'Logisch redeneren', 'Categoriseren', 'Gevarieerde oefeningen']
    },
    'pattern-train': {
      name: 'Patronentrein',
      appId: 'pattern-train',
      description: 'Maak werkbladen met treinpatronen om patronen te herkennen',
      category: 'Patronen',
      requiredTier: 'full',
      features: ['Patroonherkenning', 'Logische reeksen', 'Trein thema', 'Oplopende moeilijkheid']
    },
    'pattern-worksheet': {
      name: 'Patrooonwerkbladen',
      appId: 'pattern-worksheet',
      description: 'Maak werkbladen om reeksen en herhalende patronen te leren',
      category: 'Patronen',
      requiredTier: 'full',
      features: ['Patronen en reeksen', 'Visuele herkenning', 'Logisch redeneren', 'Meerdere niveaus']
    },
    'picture-bingo': {
      name: 'Plaatjesbingo',
      appId: 'picture-bingo',
      description: 'Genereer aangepaste bingokaarten met afbeeldingen voor in de klas',
      category: 'Spelletjes',
      requiredTier: 'core',
      features: ['Aangepaste bingokaarten', 'Thematische afbeeldingen', 'Meerdere kaartgroottes', 'Trekkingslijsten inbegrepen']
    },
    'picture-path': {
      name: 'Plaatjespad',
      appId: 'picture-path',
      description: 'Maak visuele routes om logica en het volgen van instructies te ontwikkelen',
      category: 'Logica',
      requiredTier: 'full',
      features: ['Routes volgen', 'Opeenvolgende logica', 'Visuele oefeningen', 'Meerdere moeilijkheidsniveaus']
    },
    'picture-sort': {
      name: 'Plaatjes Sorteren',
      appId: 'picture-sort',
      description: 'Maak sorteeractiviteiten met afbeeldingen om categoriseren te ontwikkelen',
      category: 'Sorteren',
      requiredTier: 'full',
      features: ['Sorteren en rangschikken', 'Categoriseren', 'Logisch redeneren', 'Gevarieerde thema\'s']
    },
    'prepositions': {
      name: 'Voorzetsels',
      appId: 'prepositions',
      description: 'Maak visuele oefeningen om voorzetsels op een speelse manier te leren',
      category: 'Taal',
      requiredTier: 'full',
      features: ['Ruimtelijke voorzetsels', 'Geïllustreerde oefeningen', 'Visueel leren', 'Makkelijk te begrijpen']
    },
    'shadow-match': {
      name: 'Schaduwen Koppelen',
      appId: 'shadow-match',
      description: 'Maak oefeningen om objecten met hun schaduwen te koppelen',
      category: 'Visuele Waarneming',
      requiredTier: 'full',
      features: ['Vorm-schaduw koppeling', 'Visuele waarneming', 'Visuele discriminatie', 'Verschillende niveaus']
    },
    'subtraction': {
      name: 'Aftrekken',
      appId: 'subtraction',
      description: 'Maak visuele aftrekwerkbladen voor het leren van rekenen',
      category: 'Rekenen',
      requiredTier: 'full',
      features: ['Aftrekoefeningen', 'Visuele ondersteuning', 'Aanpasbare moeilijkheid', 'Antwoordbladen inbegrepen']
    },
    'sudoku': {
      name: 'Sudoku voor Kinderen',
      appId: 'sudoku',
      description: 'Leuke sudoku puzzels met afbeeldingen in plaats van cijfers voor kinderen',
      category: 'Logica',
      requiredTier: 'core',
      features: ['Sudoku met afbeeldingen', '4x4 en 6x6 roosters', 'Oplopende moeilijkheid', 'Oplossingen inbegrepen']
    },
    'treasure-hunt': {
      name: 'Schattenjacht',
      appId: 'treasure-hunt',
      description: 'Maak speurtochtwerkbladen voor speelse en educatieve activiteiten',
      category: 'Spelletjes',
      requiredTier: 'full',
      features: ['Zoekroutes', 'Speelse activiteiten', 'Aanpasbare kaarten', 'Stimuleert redeneren']
    },
    'word-guess': {
      name: 'Woord Raden',
      appId: 'word-guess',
      description: 'Maak werkbladen voor het raden van woorden en het verrijken van de woordenschat',
      category: 'Woordspellen',
      requiredTier: 'full',
      features: ['Woordraadsels', 'Visuele hints', 'Woordenschat verrijken', 'Meerdere niveaus']
    },
    'word-scramble': {
      name: 'Letterkraker',
      appId: 'word-scramble',
      description: 'Maak letterwisselwerkbladen om woordenschat en spelling te verbeteren',
      category: 'Taal',
      requiredTier: 'core',
      features: ['Aangepaste woordenlijsten', 'Thematische woordenschat', 'Meerdere moeilijkheidsniveaus', 'Antwoordbladen inbegrepen']
    },
    'word-search': {
      name: 'Woordzoeker',
      appId: 'word-search',
      description: 'Genereer aanpasbare woordzoekers met thematische woordenschat',
      category: 'Woordspellen',
      requiredTier: 'free',
      features: ['Meerdere roostergroottes', 'Richtingsopties', 'Thematische woordenlijsten', 'Antwoordbladen inbegrepen']
    },
    'writing-app': {
      name: 'Schrijfoefeningen',
      appId: 'writing-app',
      description: 'Maak aangepaste schrijfwerkbladen om schrijfvaardigheden te ontwikkelen',
      category: 'Fijne Motoriek',
      requiredTier: 'full',
      features: ['Aanpasbare schrijflijnen', 'Gevarieerde thema\'s', 'Visuele ondersteuning', 'Print-klaar formaat']
    }
  };

  // Swedish translations
  const swedishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addition med Bilder',
      appId: 'image-addition',
      description: 'Skapa visuella additionsarbetsblad med bilder för tidiga matematikstudier',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Visuella matteuppgifter', 'Anpassningsbar svårighetsgrad', 'Facit', 'Utskriftsklar formatering']
    },
    'alphabet-train': {
      name: 'Alfabetståget',
      appId: 'alphabet-train',
      description: 'Hjälp barn att lära sig bokstäver med roliga tågtemade alfabetsarbetsblad',
      category: 'Svenska',
      requiredTier: 'core',
      features: ['Bokstavsigenkänning', 'Alfabetisk ordning', 'Roligt tågtema', 'Flera svårighetsnivåer']
    },
    'big-small-app': {
      name: 'Stor eller Liten',
      appId: 'big-small-app',
      description: 'Skapa storleksjämförelsearbetsblad med visuella övningar för nybörjare',
      category: 'Begrepp',
      requiredTier: 'full',
      features: ['Storleksjämförelser', 'Visuella övningar', 'Flervalsfrågor', 'Sekvensuppgifter']
    },
    'chart-count-color': {
      name: 'Räknediagram',
      appId: 'chart-count-color',
      description: 'Skapa färgglada räkne- och diagramarbetsblad för att lära sig siffror',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Visuella räkneövningar', 'Färgglada diagram', 'Sifferinlärning', 'Utskriftsklar formatering']
    },
    'code-addition': {
      name: 'Addition i Kod',
      appId: 'code-addition',
      description: 'Skapa additionsövningar med hemliga koder för att göra matte roligt',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Addition med hemliga koder', 'Lekfulla aktiviteter', 'Justerbar svårighetsgrad', 'Facit ingår']
    },
    'coloring': {
      name: 'Målarbilder',
      appId: 'coloring',
      description: 'Designa utskrivbara färgläggningssidor från vårt omfattande bildbibliotek',
      category: 'Konst & Kreativitet',
      requiredTier: 'core',
      features: ['Över 100 bilder', 'Flera teman', 'Varierande svårighetsnivåer', 'Högkvalitativa utskrifter']
    },
    'image-crossword': {
      name: 'Bildkorsord',
      appId: 'image-crossword',
      description: 'Generera illustrerade korsord för att berika ordförrådet',
      category: 'Ordspel',
      requiredTier: 'full',
      features: ['Automatisk generering', 'Anpassningsbara ledtrådar', 'Olika rutnätsstorlekar', 'Facit ingår']
    },
    'image-cryptogram': {
      name: 'Bildkryptogram',
      appId: 'image-cryptogram',
      description: 'Skapa illustrerade kryptogram för att utveckla logik och ordförråd',
      category: 'Ordspel',
      requiredTier: 'full',
      features: ['Visuella kryptogram', 'Anpassningsbara koder', 'Olika nivåer', 'Lösningar ingår']
    },
    'draw-and-color': {
      name: 'Rita och Måla',
      appId: 'draw-and-color',
      description: 'Skapa arbetsblad som kombinerar ritande och färgläggning för att stimulera kreativitet',
      category: 'Konst & Kreativitet',
      requiredTier: 'full',
      features: ['Utrymme för fri teckning', 'Färgläggningsområden', 'Varierade teman', 'Stimulerar kreativitet']
    },
    'drawing-lines': {
      name: 'Rita Linjer',
      appId: 'drawing-lines',
      description: 'Utveckla finmotorik genom linjedragningsövningar',
      category: 'Finmotorik',
      requiredTier: 'core',
      features: ['Spårningsaktiviteter', 'Pricka till pricka', 'Följa stigar', 'Förskrivningsträning']
    },
    'find-and-count': {
      name: 'Jag ser, jag ser',
      appId: 'find-and-count',
      description: 'Visuella räkneövningar för att utveckla sifferigenkänning och räkneförmåga',
      category: 'Visuell Uppfattning',
      requiredTier: 'core',
      features: ['Räkna föremål', 'Visuell särskiljning', 'Sifferträning', 'Engagerande bilder']
    },
    'find-objects': {
      name: 'Hitta Föremålen',
      appId: 'find-objects',
      description: 'Skapa sökarbetsblad för att förbättra visuell uppmärksamhet',
      category: 'Visuell Uppfattning',
      requiredTier: 'full',
      features: ['Visuella sökövningar', 'Utvecklar uppmärksamhet', 'Varierade teman', 'Olika svårighetsnivåer']
    },
    'grid-match': {
      name: 'Rutnätsmatchning',
      appId: 'grid-match',
      description: 'Skapa rutnätsmatchningsövningar för att utveckla rumslig uppfattning',
      category: 'Matchning',
      requiredTier: 'full',
      features: ['Mönstermatchning', 'Rumslig orientering', 'Visuell perception', 'Progressiv svårighet']
    },
    'matching-app': {
      name: 'Matchningsspel',
      appId: 'matching-app',
      description: 'Skapa matchningsaktiviteter för att förbättra minne och associationsförmåga',
      category: 'Matchning',
      requiredTier: 'core',
      features: ['Bild-till-bild-matchning', 'Ord-till-bild-matchning', 'Minnesspel', 'Anpassningsbara par']
    },
    'math-puzzle': {
      name: 'Mattepussel',
      appId: 'math-puzzle',
      description: 'Skapa utmanande mattepussel för att utveckla logiskt tänkande',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Räknepussel', 'Matematisk logik', 'Olika nivåer', 'Lösningar ingår']
    },
    'math-worksheet': {
      name: 'Matteblad',
      appId: 'math-worksheet',
      description: 'Generera anpassningsbara matteövningsblad för alla nivåer',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Addition och subtraktion', 'Multiplikation och division', 'Facit', 'Justerbara svårighetsnivåer']
    },
    'missing-pieces': {
      name: 'Saknade Bitar',
      appId: 'missing-pieces',
      description: 'Skapa visuella kompletteringsövningar för att utveckla logiskt tänkande',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identifiera saknade element', 'Logiskt resonemang', 'Visuella övningar', 'Progressiv svårighet']
    },
    'more-less': {
      name: 'Mer eller Mindre',
      appId: 'more-less',
      description: 'Skapa mängdjämförelseövningar för att lära matematiska begrepp',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Jämföra mängder', 'Grundläggande matematiska begrepp', 'Visuella övningar', 'Progressiv inlärning']
    },
    'odd-one-out': {
      name: 'Den Udda',
      appId: 'odd-one-out',
      description: 'Skapa övningar för att identifiera det avvikande elementet och utveckla analys',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identifiera skillnader', 'Logiskt resonemang', 'Kategorisering', 'Varierade övningar']
    },
    'pattern-train': {
      name: 'Mönsterstöget',
      appId: 'pattern-train',
      description: 'Skapa sekvensarbetsblad med tågtema för att känna igen mönster',
      category: 'Mönster',
      requiredTier: 'full',
      features: ['Mönsterigenkänning', 'Logiska sekvenser', 'Tågtema', 'Progressiv svårighet']
    },
    'pattern-worksheet': {
      name: 'Mönsterblad',
      appId: 'pattern-worksheet',
      description: 'Skapa arbetsblad för att lära sig sekvenser och upprepande mönster',
      category: 'Mönster',
      requiredTier: 'full',
      features: ['Mönster och sekvenser', 'Visuell igenkänning', 'Logiskt resonemang', 'Flera nivåer']
    },
    'bingo': {
      name: 'Bildbingo',
      appId: 'bingo',
      description: 'Generera anpassade bingobrickor med bilder för klassrummet',
      category: 'Spel',
      requiredTier: 'core',
      features: ['Anpassade bingobrickor', 'Tematiska bilder', 'Flera brickstorlekar', 'Dragningslistor ingår']
    },
    'picture-path': {
      name: 'Bildväg',
      appId: 'picture-path',
      description: 'Skapa visuella stigar för att utveckla logik och instruktionsföljning',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Stigar att följa', 'Sekventiell logik', 'Visuella övningar', 'Flera svårighetsnivåer']
    },
    'picture-sort': {
      name: 'Sortera Bilder',
      appId: 'picture-sort',
      description: 'Skapa bildsorteringsaktiviteter för att utveckla kategorisering',
      category: 'Sortering',
      requiredTier: 'full',
      features: ['Sortering och ordning', 'Kategorisering', 'Logiskt resonemang', 'Varierade teman']
    },
    'prepositions': {
      name: 'Prepositioner',
      appId: 'prepositions',
      description: 'Skapa visuella övningar för att lära sig prepositioner på ett lekfullt sätt',
      category: 'Svenska',
      requiredTier: 'full',
      features: ['Rumsliga prepositioner', 'Illustrerade övningar', 'Visuell inlärning', 'Lätt att förstå']
    },
    'shadow-match': {
      name: 'Skuggmatchning',
      appId: 'shadow-match',
      description: 'Skapa övningar för att matcha föremål med deras skuggor',
      category: 'Visuell Uppfattning',
      requiredTier: 'full',
      features: ['Form-skugga-matchning', 'Visuell perception', 'Visuell särskiljning', 'Olika nivåer']
    },
    'subtraction': {
      name: 'Subtraktion',
      appId: 'subtraction',
      description: 'Skapa visuella subtraktionsarbetsblad för matematikstudier',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Subtraktionsövningar', 'Visuellt stöd', 'Justerbar svårighetsgrad', 'Facit ingår']
    },
    'sudoku': {
      name: 'Sudoku för Barn',
      appId: 'sudoku',
      description: 'Roliga sudoku-pussel med bilder istället för siffror för barn',
      category: 'Logik',
      requiredTier: 'core',
      features: ['Sudoku med bilder', '4x4 och 6x6 rutnät', 'Progressiv svårighet', 'Lösningar ingår']
    },
    'treasure-hunt': {
      name: 'Skattjakt',
      appId: 'treasure-hunt',
      description: 'Skapa skattjaktsarbetsblad för lekfulla och pedagogiska aktiviteter',
      category: 'Spel',
      requiredTier: 'full',
      features: ['Sökstigar', 'Lekfulla aktiviteter', 'Anpassningsbara kartor', 'Stimulerar resonemang']
    },
    'word-guess': {
      name: 'Gissa Ordet',
      appId: 'word-guess',
      description: 'Skapa arbetsblad för att gissa ord och berika ordförrådet',
      category: 'Ordspel',
      requiredTier: 'full',
      features: ['Ordgåtor', 'Visuella ledtrådar', 'Berika ordförrådet', 'Flera nivåer']
    },
    'word-scramble': {
      name: 'Ordmix',
      appId: 'word-scramble',
      description: 'Skapa ordblandningsarbetsblad för att förbättra ordförråd och stavning',
      category: 'Svenska',
      requiredTier: 'core',
      features: ['Anpassade ordlistor', 'Tematiskt ordförråd', 'Flera svårighetsnivåer', 'Facit ingår']
    },
    'word-search': {
      name: 'Ordletare',
      appId: 'word-search',
      description: 'Generera anpassningsbara ordletare med tematiskt ordförråd',
      category: 'Ordspel',
      requiredTier: 'free',
      features: ['Flera rutnätsstorlekar', 'Riktningsalternativ', 'Tematiska ordlistor', 'Facit ingår']
    },
    'writing-app': {
      name: 'Skrivövningar',
      appId: 'writing-app',
      description: 'Skapa anpassade skrivarbetsblad för att utveckla skrivförmåga',
      category: 'Finmotorik',
      requiredTier: 'full',
      features: ['Anpassningsbara skrivlinjer', 'Varierade teman', 'Visuellt stöd', 'Utskriftsklar formatering']
    }
  };

  // Danish translations
  const danishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addition med Billeder',
      appId: 'image-addition',
      description: 'Lav visuelle additions-arbejdsark med billeder til tidlige matematikstuderende',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Visuelle matematikopgaver', 'Tilpasbar sværhedsgrad', 'Facitlister', 'Printklar formatering']
    },
    'alphabet-train': {
      name: 'Alfabettoget',
      appId: 'alphabet-train',
      description: 'Hjælp børn med at lære bogstaver med sjove togtema-alfabetsark',
      category: 'Dansk',
      requiredTier: 'core',
      features: ['Bogstavgenkendelse', 'Alfabetisk rækkefølge', 'Sjovt togtema', 'Flere sværhedsgrader']
    },
    'big-small-app': {
      name: 'Stor eller Lille',
      appId: 'big-small-app',
      description: 'Lav størrelsessammenligningsark med visuelle øvelser for begyndere',
      category: 'Begreber',
      requiredTier: 'full',
      features: ['Størrelsessammenligninger', 'Visuelle øvelser', 'Multiple choice', 'Rækkefølgeopgaver']
    },
    'chart-count-color': {
      name: 'Tællediagrammer',
      appId: 'chart-count-color',
      description: 'Lav farverige tælle- og diagramark til at lære tal',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Visuelle tælleøvelser', 'Farverige diagrammer', 'Tallæring', 'Printklar formatering']
    },
    'code-addition': {
      name: 'Addition i Kode',
      appId: 'code-addition',
      description: 'Lav additionsøvelser med hemmelige koder for at gøre matematik sjovt',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Addition med hemmelige koder', 'Legende aktiviteter', 'Justerbar sværhedsgrad', 'Facitlister inkluderet']
    },
    'coloring': {
      name: 'Malebøger',
      appId: 'coloring',
      description: 'Design udskrivbare farvelægningssider fra vores omfattende billedbibliotek',
      category: 'Kunst & Kreativitet',
      requiredTier: 'core',
      features: ['Over 100 billeder', 'Flere temaer', 'Forskellige sværhedsgrader', 'Høj kvalitet udskrifter']
    },
    'image-crossword': {
      name: 'Billedkrydsord',
      appId: 'image-crossword',
      description: 'Generer illustrerede krydsord for at berige ordforråd',
      category: 'Ordspil',
      requiredTier: 'full',
      features: ['Automatisk generering', 'Tilpassede ledetråde', 'Forskellige gitterstørrelser', 'Facitlister inkluderet']
    },
    'image-cryptogram': {
      name: 'Billedkryptogram',
      appId: 'image-cryptogram',
      description: 'Lav illustrerede kryptogrammer for at udvikle logik og ordforråd',
      category: 'Ordspil',
      requiredTier: 'full',
      features: ['Visuelle kryptogrammer', 'Tilpassede koder', 'Forskellige niveauer', 'Løsninger inkluderet']
    },
    'draw-and-color': {
      name: 'Tegn og Mal',
      appId: 'draw-and-color',
      description: 'Lav ark, der kombinerer tegning og farvelægning for at stimulere kreativitet',
      category: 'Kunst & Kreativitet',
      requiredTier: 'full',
      features: ['Plads til fri tegning', 'Farvelægningsområder', 'Varierede temaer', 'Stimulerer kreativitet']
    },
    'drawing-lines': {
      name: 'Tegn Linjer',
      appId: 'drawing-lines',
      description: 'Udvikl finmotorik gennem linjetegningsøvelser',
      category: 'Finmotorik',
      requiredTier: 'core',
      features: ['Sporingsaktiviteter', 'Forbind prikkerne', 'Følg stier', 'Forskrivetræning']
    },
    'find-and-count': {
      name: 'Jeg ser, jeg ser',
      appId: 'find-and-count',
      description: 'Visuelle tælleøvelser for at udvikle talgenkendelse og tælleevner',
      category: 'Visuel Opfattelse',
      requiredTier: 'core',
      features: ['Tæl objekter', 'Visuel forskel', 'Talletræning', 'Engagerende billeder']
    },
    'find-objects': {
      name: 'Find Genstandene',
      appId: 'find-objects',
      description: 'Lav søgeark for at forbedre visuel opmærksomhed',
      category: 'Visuel Opfattelse',
      requiredTier: 'full',
      features: ['Visuelle søgeøvelser', 'Udvikler opmærksomhed', 'Varierede temaer', 'Forskellige sværhedsgrader']
    },
    'grid-match': {
      name: 'Gittermatchning',
      appId: 'grid-match',
      description: 'Lav gittermatchingsøvelser for at udvikle rumlig opfattelse',
      category: 'Matchning',
      requiredTier: 'full',
      features: ['Mønstermatching', 'Rumlig orientering', 'Visuel perception', 'Progressiv sværhedsgrad']
    },
    'matching-app': {
      name: 'Parspil',
      appId: 'matching-app',
      description: 'Lav matchingsaktiviteter for at forbedre hukommelse og associationsevner',
      category: 'Matchning',
      requiredTier: 'core',
      features: ['Billede-til-billede-matching', 'Ord-til-billede-matching', 'Hukommelsesspil', 'Tilpassede par']
    },
    'math-puzzle': {
      name: 'Matematikgåder',
      appId: 'math-puzzle',
      description: 'Lav udfordrende matematikgåder for at udvikle logisk tænkning',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Regngåder', 'Matematisk logik', 'Forskellige niveauer', 'Løsninger inkluderet']
    },
    'math-worksheet': {
      name: 'Matematikark',
      appId: 'math-worksheet',
      description: 'Generer tilpassede matematiktræningsark for alle niveauer',
      category: 'Matematik',
      requiredTier: 'core',
      features: ['Addition og subtraktion', 'Multiplikation og division', 'Facitlister', 'Justerbare sværhedsgrader']
    },
    'missing-pieces': {
      name: 'Manglende Brikker',
      appId: 'missing-pieces',
      description: 'Lav visuelle fuldførelsesøvelser for at udvikle logisk tænkning',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identificer manglende elementer', 'Logisk ræsonnement', 'Visuelle øvelser', 'Progressiv sværhedsgrad']
    },
    'more-less': {
      name: 'Mere eller Mindre',
      appId: 'more-less',
      description: 'Lav mængdesammenligningsøvelser for at lære matematiske begreber',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Sammenlign mængder', 'Grundlæggende matematiske begreber', 'Visuelle øvelser', 'Progressiv læring']
    },
    'odd-one-out': {
      name: 'Den Anderledes',
      appId: 'odd-one-out',
      description: 'Lav øvelser til at identificere det afvigende element og udvikle analyse',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Identificer forskelle', 'Logisk ræsonnement', 'Kategorisering', 'Varierede øvelser']
    },
    'pattern-train': {
      name: 'Mønstertoget',
      appId: 'pattern-train',
      description: 'Lav sekvensark med togtema for at genkende mønstre',
      category: 'Mønstre',
      requiredTier: 'full',
      features: ['Mønstergenkendelse', 'Logiske sekvenser', 'Togtema', 'Progressiv sværhedsgrad']
    },
    'pattern-worksheet': {
      name: 'Mønsterark',
      appId: 'pattern-worksheet',
      description: 'Lav ark for at lære sekvenser og gentagne mønstre',
      category: 'Mønstre',
      requiredTier: 'full',
      features: ['Mønstre og sekvenser', 'Visuel genkendelse', 'Logisk ræsonnement', 'Flere niveauer']
    },
    'bingo': {
      name: 'Billedbingo',
      appId: 'bingo',
      description: 'Generer tilpassede bingoplader med billeder til klasseværelset',
      category: 'Spil',
      requiredTier: 'core',
      features: ['Tilpassede bingoplader', 'Tematiske billeder', 'Flere pladestørrelser', 'Trækningslister inkluderet']
    },
    'picture-path': {
      name: 'Billedsti',
      appId: 'picture-path',
      description: 'Lav visuelle stier for at udvikle logik og instruktionsfølgning',
      category: 'Logik',
      requiredTier: 'full',
      features: ['Stier at følge', 'Sekventiel logik', 'Visuelle øvelser', 'Flere sværhedsgrader']
    },
    'picture-sort': {
      name: 'Sortér Billeder',
      appId: 'picture-sort',
      description: 'Lav billedsorteringsaktiviteter for at udvikle kategorisering',
      category: 'Sortering',
      requiredTier: 'full',
      features: ['Sortering og ordning', 'Kategorisering', 'Logisk ræsonnement', 'Varierede temaer']
    },
    'prepositions': {
      name: 'Præpositioner',
      appId: 'prepositions',
      description: 'Lav visuelle øvelser for at lære præpositioner på en legende måde',
      category: 'Dansk',
      requiredTier: 'full',
      features: ['Rumlige præpositioner', 'Illustrerede øvelser', 'Visuel læring', 'Let at forstå']
    },
    'shadow-match': {
      name: 'Skyggematching',
      appId: 'shadow-match',
      description: 'Lav øvelser til at matche genstande med deres skygger',
      category: 'Visuel Opfattelse',
      requiredTier: 'full',
      features: ['Form-skygge-matching', 'Visuel perception', 'Visuel forskel', 'Forskellige niveauer']
    },
    'subtraction': {
      name: 'Subtraktion',
      appId: 'subtraction',
      description: 'Lav visuelle subtraktionsark til matematikstudier',
      category: 'Matematik',
      requiredTier: 'full',
      features: ['Subtraktionsøvelser', 'Visuel støtte', 'Justerbar sværhedsgrad', 'Facitlister inkluderet']
    },
    'sudoku': {
      name: 'Sudoku til Børn',
      appId: 'sudoku',
      description: 'Sjove sudoku-gåder med billeder i stedet for tal til børn',
      category: 'Logik',
      requiredTier: 'core',
      features: ['Sudoku med billeder', '4x4 og 6x6 gitre', 'Progressiv sværhedsgrad', 'Løsninger inkluderet']
    },
    'treasure-hunt': {
      name: 'Skattejagt',
      appId: 'treasure-hunt',
      description: 'Lav skattejagtsark til legende og pædagogiske aktiviteter',
      category: 'Spil',
      requiredTier: 'full',
      features: ['Søgestier', 'Legende aktiviteter', 'Tilpassede kort', 'Stimulerer ræsonnement']
    },
    'word-guess': {
      name: 'Gæt Ordet',
      appId: 'word-guess',
      description: 'Lav ark til at gætte ord og berige ordforråd',
      category: 'Ordspil',
      requiredTier: 'full',
      features: ['Ordgåder', 'Visuelle ledetråde', 'Berig ordforråd', 'Flere niveauer']
    },
    'word-scramble': {
      name: 'Ordforbytter',
      appId: 'word-scramble',
      description: 'Lav ordsambleblandingsark for at forbedre ordforråd og stavning',
      category: 'Dansk',
      requiredTier: 'core',
      features: ['Tilpassede ordlister', 'Tematisk ordforråd', 'Flere sværhedsgrader', 'Facitlister inkluderet']
    },
    'word-search': {
      name: 'Ordsøgning',
      appId: 'word-search',
      description: 'Generer tilpassede ordsøgninger med tematisk ordforråd',
      category: 'Ordspil',
      requiredTier: 'free',
      features: ['Flere gitterstørrelser', 'Retningsvalg', 'Tematiske ordlister', 'Facitlister inkluderet']
    },
    'writing-app': {
      name: 'Skriveøvelser',
      appId: 'writing-app',
      description: 'Lav tilpassede skriveark for at udvikle skrivefærdigheder',
      category: 'Finmotorik',
      requiredTier: 'full',
      features: ['Tilpassede skrivelinjer', 'Varierede temaer', 'Visuel støtte', 'Printklar formatering']
    }
  };

  // Norwegian translations
  const norwegianTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Addisjon med Bilder',
      appId: 'image-addition',
      description: 'Lag visuelle addisjonsregneark med bilder for tidlige matematikkstudenter',
      category: 'Matematikk',
      requiredTier: 'core',
      features: ['Visuelle matematikkoppgaver', 'Tilpassbar vanskelighetsgrad', 'Fasitark', 'Utskriftsklar formatering']
    },
    'alphabet-train': {
      name: 'Alfabettoget',
      appId: 'alphabet-train',
      description: 'Hjelp barn med å lære bokstaver med morsomme togtema-alfabetark',
      category: 'Språk & Lesing',
      requiredTier: 'core',
      features: ['Bokstavgjenkjenning', 'Alfabetisk rekkefølge', 'Morsomt togtema', 'Flere vanskelighetsgrader']
    },
    'big-small-app': {
      name: 'Stor eller Liten',
      appId: 'big-small-app',
      description: 'Lag størrelsessammenligningsark med visuelle øvelser for nybegynnere',
      category: 'Tidlig Læring',
      requiredTier: 'full',
      features: ['Størrelsessammenligninger', 'Visuelle øvelser', 'Flervalg', 'Rekkefølgeoppgaver']
    },
    'chart-count-color': {
      name: 'Tellediagrammer',
      appId: 'chart-count-color',
      description: 'Lag fargerike telle- og diagramark for å lære tall',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Visuelle telleøvelser', 'Fargerike diagrammer', 'Tallæring', 'Utskriftsklar formatering']
    },
    'code-addition': {
      name: 'Kodeaddisjon',
      appId: 'code-addition',
      description: 'Lag addisjonsøvelser med hemmelige koder for å gjøre matte morsomt',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Addisjon med hemmelige koder', 'Lekende aktiviteter', 'Justerbar vanskelighetsgrad', 'Fasitark inkludert']
    },
    'coloring': {
      name: 'Fargesider',
      appId: 'coloring',
      description: 'Design utskrivbare fargesider fra vårt omfattende bildebibliotek',
      category: 'Kunst & Kreativitet',
      requiredTier: 'core',
      features: ['Over 100 bilder', 'Flere temaer', 'Ulike vanskelighetsgrader', 'Høykvalitets utskrifter']
    },
    'image-crossword': {
      name: 'Bildekryssord',
      appId: 'image-crossword',
      description: 'Generer illustrerte kryssord for å berike ordforrådet',
      category: 'Ordspill',
      requiredTier: 'full',
      features: ['Automatisk generering', 'Tilpassbare ledetråder', 'Ulike rutenettstørrelser', 'Fasitark inkludert']
    },
    'image-cryptogram': {
      name: 'Bildekryptogram',
      appId: 'image-cryptogram',
      description: 'Lag illustrerte kryptogrammer for å utvikle logikk og ordforråd',
      category: 'Gåter',
      requiredTier: 'full',
      features: ['Visuelle kryptogrammer', 'Tilpassbare koder', 'Ulike nivåer', 'Løsninger inkludert']
    },
    'draw-and-color': {
      name: 'Tegn og Fargelegg',
      appId: 'draw-and-color',
      description: 'Lag ark som kombinerer tegning og farging for å stimulere kreativitet',
      category: 'Kunst & Kreativitet',
      requiredTier: 'full',
      features: ['Plass til fri tegning', 'Fargeområder', 'Varierte temaer', 'Stimulerer kreativitet']
    },
    'drawing-lines': {
      name: 'Tegn Linjer',
      appId: 'drawing-lines',
      description: 'Utvikle finmotorikk gjennom linjetegningsøvelser',
      category: 'Finmotorikk',
      requiredTier: 'core',
      features: ['Sporingsaktiviteter', 'Forbind prikkene', 'Følge stier', 'Forskriving']
    },
    'find-and-count': {
      name: 'Jeg ser, jeg ser',
      appId: 'find-and-count',
      description: 'Visuelle telleøvelser for å utvikle tallgjenkjenning og telleferdigheter',
      category: 'Visuell Persepsjon',
      requiredTier: 'core',
      features: ['Telle objekter', 'Visuell diskriminering', 'Talltrening', 'Engasjerende bilder']
    },
    'find-objects': {
      name: 'Finn Gjenstander',
      appId: 'find-objects',
      description: 'Lag søkeark for å forbedre visuell oppmerksomhet',
      category: 'Visuell Persepsjon',
      requiredTier: 'full',
      features: ['Visuelle søkeøvelser', 'Utvikler oppmerksomhet', 'Varierte temaer', 'Ulike vanskelighetsgrader']
    },
    'grid-match': {
      name: 'Rutenettsmatching',
      appId: 'grid-match',
      description: 'Lag rutenettsmatchingsøvelser for å utvikle romlig oppfatning',
      category: 'Matching',
      requiredTier: 'full',
      features: ['Mønstermatching', 'Romlig orientering', 'Visuell persepsjon', 'Progressiv vanskelighetsgrad']
    },
    'matching-app': {
      name: 'Matchingmaker',
      appId: 'matching-app',
      description: 'Lag matchingsaktiviteter for å forbedre hukommelse og assosiasjonsevner',
      category: 'Matching',
      requiredTier: 'core',
      features: ['Bilde-til-bilde-matching', 'Ord-til-bilde-matching', 'Hukommelsesspill', 'Tilpassbare par']
    },
    'math-puzzle': {
      name: 'Mattegåter',
      appId: 'math-puzzle',
      description: 'Lag utfordrende mattegåter for å utvikle logisk tenkning',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Regnegåter', 'Matematisk logikk', 'Ulike nivåer', 'Løsninger inkludert']
    },
    'math-worksheet': {
      name: 'Matteregneark',
      appId: 'math-worksheet',
      description: 'Generer tilpassbare mattetreningsark for alle nivåer',
      category: 'Matematikk',
      requiredTier: 'core',
      features: ['Addisjon og subtraksjon', 'Multiplikasjon og divisjon', 'Fasitark', 'Justerbare vanskelighetsgrader']
    },
    'missing-pieces': {
      name: 'Manglende Deler',
      appId: 'missing-pieces',
      description: 'Lag visuelle fullføringsøvelser for å utvikle logisk tenkning',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Identifisere manglende elementer', 'Logisk resonnering', 'Visuelle øvelser', 'Progressiv vanskelighetsgrad']
    },
    'more-less': {
      name: 'Mer eller Mindre',
      appId: 'more-less',
      description: 'Lag mengdesammenligningsøvelser for å lære matematiske begreper',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Sammenligne mengder', 'Grunnleggende matematiske begreper', 'Visuelle øvelser', 'Progressiv læring']
    },
    'odd-one-out': {
      name: 'Hvilken Passer Ikke',
      appId: 'odd-one-out',
      description: 'Lag øvelser for å identifisere det avvikende elementet og utvikle analyse',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Identifisere forskjeller', 'Logisk resonnering', 'Kategorisering', 'Varierte øvelser']
    },
    'pattern-train': {
      name: 'Mønstertoget',
      appId: 'pattern-train',
      description: 'Lag sekvensark med togtema for å gjenkjenne mønstre',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Mønstergjenkjenning', 'Logiske sekvenser', 'Togtema', 'Progressiv vanskelighetsgrad']
    },
    'pattern-worksheet': {
      name: 'Mønsterark',
      appId: 'pattern-worksheet',
      description: 'Lag ark for å lære sekvenser og gjentakende mønstre',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Mønstre og sekvenser', 'Visuell gjenkjenning', 'Logisk resonnering', 'Flere nivåer']
    },
    'bingo': {
      name: 'Bildebingo',
      appId: 'bingo',
      description: 'Generer tilpassede bingobrett med bilder for klasserommet',
      category: 'Spill',
      requiredTier: 'core',
      features: ['Tilpassede bingobrett', 'Tematiske bilder', 'Flere brettstørrelser', 'Trekningslister inkludert']
    },
    'picture-path': {
      name: 'Bildesti',
      appId: 'picture-path',
      description: 'Lag visuelle stier for å utvikle logikk og instruksjonsfølging',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Stier å følge', 'Sekvensiell logikk', 'Visuelle øvelser', 'Flere vanskelighetsgrader']
    },
    'picture-sort': {
      name: 'Bildesortering',
      appId: 'picture-sort',
      description: 'Lag bildesorteringsaktiviteter for å utvikle kategorisering',
      category: 'Logikk',
      requiredTier: 'full',
      features: ['Sortering og ordning', 'Kategorisering', 'Logisk resonnering', 'Varierte temaer']
    },
    'prepositions': {
      name: 'Preposisjoner',
      appId: 'prepositions',
      description: 'Lag visuelle øvelser for å lære preposisjoner på en lekende måte',
      category: 'Grammatikk',
      requiredTier: 'full',
      features: ['Romlige preposisjoner', 'Illustrerte øvelser', 'Visuell læring', 'Lett å forstå']
    },
    'shadow-match': {
      name: 'Skyggematching',
      appId: 'shadow-match',
      description: 'Lag øvelser for å matche gjenstander med deres skygger',
      category: 'Visuell Persepsjon',
      requiredTier: 'full',
      features: ['Form-skygge-matching', 'Visuell persepsjon', 'Visuell diskriminering', 'Ulike nivåer']
    },
    'subtraction': {
      name: 'Subtraksjon',
      appId: 'subtraction',
      description: 'Lag visuelle subtraksjonsark for matematikkstudier',
      category: 'Matematikk',
      requiredTier: 'full',
      features: ['Subtraksjonsøvelser', 'Visuell støtte', 'Justerbar vanskelighetsgrad', 'Fasitark inkludert']
    },
    'sudoku': {
      name: 'Sudoku for Barn',
      appId: 'sudoku',
      description: 'Morsomme sudoku-gåter med bilder i stedet for tall for barn',
      category: 'Logikk',
      requiredTier: 'core',
      features: ['Sudoku med bilder', '4x4 og 6x6 rutenett', 'Progressiv vanskelighetsgrad', 'Løsninger inkludert']
    },
    'treasure-hunt': {
      name: 'Skattejakt',
      appId: 'treasure-hunt',
      description: 'Lag skattejaktark for lekende og pedagogiske aktiviteter',
      category: 'Pedagogiske Spill',
      requiredTier: 'full',
      features: ['Søkestier', 'Lekende aktiviteter', 'Tilpassbare kart', 'Stimulerer resonnering']
    },
    'word-guess': {
      name: 'Gjett Ordet',
      appId: 'word-guess',
      description: 'Lag ark for å gjette ord og berike ordforrådet',
      category: 'Ordspill',
      requiredTier: 'full',
      features: ['Ordgåter', 'Visuelle ledetråder', 'Berike ordforrådet', 'Flere nivåer']
    },
    'word-scramble': {
      name: 'Ordsammenblanding',
      appId: 'word-scramble',
      description: 'Lag ordsambleblandingsark for å forbedre ordforråd og stavning',
      category: 'Språk & Lesing',
      requiredTier: 'core',
      features: ['Tilpassede ordlister', 'Tematisk ordforråd', 'Flere vanskelighetsgrader', 'Fasitark inkludert']
    },
    'word-search': {
      name: 'Ordsøk',
      appId: 'word-search',
      description: 'Generer tilpassbare ordsøk med tematisk ordforråd',
      category: 'Ordspill',
      requiredTier: 'free',
      features: ['Flere rutenettstørrelser', 'Retningsvalg', 'Tematiske ordlister', 'Fasitark inkludert']
    },
    'writing-app': {
      name: 'Skriveøvelser',
      appId: 'writing-app',
      description: 'Lag tilpassede skriveark for å utvikle skriveferdigheter',
      category: 'Skriveferdigheter',
      requiredTier: 'full',
      features: ['Tilpassbare skrivelinjer', 'Varierte temaer', 'Visuell støtte', 'Utskriftsklar formatering']
    }
  };

  // Finnish translations
  const finnishTranslations: Record<string, any> = {
    'image-addition': {
      name: 'Yhteenlasku Kuvilla',
      appId: 'image-addition',
      description: 'Luo visuaalisia yhteenlaskutehtäviä kuvineen alkeiden matematiikkaan',
      category: 'Matematiikka',
      requiredTier: 'core',
      features: ['Visuaaliset laskutehtävät', 'Mukautettava vaikeustaso', 'Vastausavaimet', 'Tulostusvalmiit lomakkeet']
    },
    'alphabet-train': {
      name: 'Aaakkosjuna',
      appId: 'alphabet-train',
      description: 'Auta lapsia oppimaan kirjaimia hauskoilla junateemaisilla aakkostehtävillä',
      category: 'Kieli & Lukeminen',
      requiredTier: 'core',
      features: ['Kirjainten tunnistaminen', 'Aakkosjärjestys', 'Hauska junateema', 'Useita vaikeustasoja']
    },
    'big-small-app': {
      name: 'Iso vai Pieni',
      appId: 'big-small-app',
      description: 'Luo kokovertailutehtäviä visuaalisilla harjoituksilla aloittelijoille',
      category: 'Varhaiskehitys',
      requiredTier: 'full',
      features: ['Kokovertailut', 'Visuaaliset harjoitukset', 'Monivalintatehtävät', 'Järjestysharjoitukset']
    },
    'chart-count-color': {
      name: 'Laskukaaviot',
      appId: 'chart-count-color',
      description: 'Luo värikkäitä lasku- ja kaavioharjoituksia numeroiden oppimiseen',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Visuaaliset laskuharjoitukset', 'Värikkäät kaaviot', 'Numeroiden oppiminen', 'Tulostusvalmiit lomakkeet']
    },
    'code-addition': {
      name: 'Koodiyhteenlasku',
      appId: 'code-addition',
      description: 'Luo yhteenlaskutehtäviä salaisilla koodeilla matematiikan tekemiseksi hauskaksi',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Yhteenlasku salaisilla koodeilla', 'Leikkisät aktiviteetit', 'Säädettävä vaikeustaso', 'Vastausavaimet mukana']
    },
    'coloring': {
      name: 'Värityskuvat',
      appId: 'coloring',
      description: 'Suunnittele tulostettavia värityskuvia laajasta kuvakirjastostamme',
      category: 'Taide & Luovuus',
      requiredTier: 'core',
      features: ['Yli 100 kuvaa', 'Useita teemoja', 'Eri vaikeustasoja', 'Korkealaatuiset tulosteet']
    },
    'image-crossword': {
      name: 'Kuvristikko',
      appId: 'image-crossword',
      description: 'Luo kuvitettuja ristisanatehtäviä sanaston rikastamiseen',
      category: 'Sanapelit',
      requiredTier: 'full',
      features: ['Automaattinen luonti', 'Mukautettavat vihjeet', 'Eri ruudukkokoot', 'Vastausavaimet mukana']
    },
    'image-cryptogram': {
      name: 'Kuvakryptogrammi',
      appId: 'image-cryptogram',
      description: 'Luo kuvitettuja kryptogrammeja logiikan ja sanaston kehittämiseen',
      category: 'Arvoitukset',
      requiredTier: 'full',
      features: ['Visuaaliset kryptogrammit', 'Mukautettavat koodit', 'Eri tasoja', 'Ratkaisut mukana']
    },
    'draw-and-color': {
      name: 'Piirrä ja Väritä',
      appId: 'draw-and-color',
      description: 'Luo tehtäviä, jotka yhdistävät piirtämisen ja värityksen luovuuden stimuloimiseksi',
      category: 'Taide & Luovuus',
      requiredTier: 'full',
      features: ['Tilaa vapaalle piirtämiselle', 'Väritysalueet', 'Monipuoliset teemat', 'Edistää luovuutta']
    },
    'drawing-lines': {
      name: 'Viivojen Piirtäminen',
      appId: 'drawing-lines',
      description: 'Kehitä hienomotoriikkaa viivanvetoharjoituksilla',
      category: 'Hienomotoriikka',
      requiredTier: 'core',
      features: ['Jäljitysharjoitukset', 'Yhdistä pisteet', 'Polkujen seuraaminen', 'Esikirjoitusvalmennusta']
    },
    'find-and-count': {
      name: 'Minä näen',
      appId: 'find-and-count',
      description: 'Visuaaliset laskuharjoitukset numeroiden tunnistamisen ja laskutaitojen kehittämiseen',
      category: 'Visuaalinen Hahmotus',
      requiredTier: 'core',
      features: ['Esineiden laskeminen', 'Visuaalinen erottelu', 'Numeroharjoitukset', 'Kiinnostavat kuvat']
    },
    'find-objects': {
      name: 'Etsi Esineitä',
      appId: 'find-objects',
      description: 'Luo etsintätehtäviä visuaalisen tarkkaavaisuuden parantamiseen',
      category: 'Visuaalinen Hahmotus',
      requiredTier: 'full',
      features: ['Visuaaliset etsintäharjoitukset', 'Kehittää tarkkaavaisuutta', 'Monipuoliset teemat', 'Eri vaikeustasoja']
    },
    'grid-match': {
      name: 'Ruudukon Yhdistäminen',
      appId: 'grid-match',
      description: 'Luo ruudukko-yhdistämisharjoituksia tilallisen hahmotuksen kehittämiseen',
      category: 'Yhdistäminen',
      requiredTier: 'full',
      features: ['Kuvioiden yhdistäminen', 'Tilallinen suuntautuminen', 'Visuaalinen hahmotus', 'Asteittainen vaikeus']
    },
    'matching-app': {
      name: 'Parinmuodostaja',
      appId: 'matching-app',
      description: 'Luo yhdistämistehtäviä muistin ja assosiaatiokyvyn parantamiseen',
      category: 'Yhdistäminen',
      requiredTier: 'core',
      features: ['Kuva-kuvaan-yhdistäminen', 'Sana-kuvaan-yhdistäminen', 'Muistipelit', 'Mukautettavat parit']
    },
    'math-puzzle': {
      name: 'Matematiikkapulmat',
      appId: 'math-puzzle',
      description: 'Luo haastavia matematiikkapulmia loogisen ajattelun kehittämiseen',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Laskupulmat', 'Matemaattinen logiikka', 'Eri tasoja', 'Ratkaisut mukana']
    },
    'math-worksheet': {
      name: 'Matematiikkatehtävät',
      appId: 'math-worksheet',
      description: 'Luo mukautettavia matematiikkaharjoituksia kaikille tasoille',
      category: 'Matematiikka',
      requiredTier: 'core',
      features: ['Yhteen- ja vähennyslasku', 'Kerto- ja jakolasku', 'Vastausavaimet', 'Säädettävät vaikeustasot']
    },
    'missing-pieces': {
      name: 'Puuttuvat Osat',
      appId: 'missing-pieces',
      description: 'Luo visuaalisia täydennysharjoituksia loogisen ajattelun kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Puuttuvien osien tunnistaminen', 'Looginen päättely', 'Visuaaliset harjoitukset', 'Asteittainen vaikeus']
    },
    'more-less': {
      name: 'Enemmän vai Vähemmän',
      appId: 'more-less',
      description: 'Luo määrävertailuharjoituksia matemaattisten käsitteiden oppimiseen',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Määrien vertailu', 'Perusmatematiikan käsitteet', 'Visuaaliset harjoitukset', 'Asteittainen oppiminen']
    },
    'odd-one-out': {
      name: 'Mikä Ei Sovi Joukkoon',
      appId: 'odd-one-out',
      description: 'Luo harjoituksia poikkeavan elementin tunnistamiseen ja analyysikyvyn kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Erojen tunnistaminen', 'Looginen päättely', 'Luokittelu', 'Monipuoliset harjoitukset']
    },
    'pattern-train': {
      name: 'Kuviojuna',
      appId: 'pattern-train',
      description: 'Luo junatetemaisia sekvenssitehtäviä kuvioiden tunnistamiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Kuvioiden tunnistaminen', 'Loogiset sekvenssit', 'Junateema', 'Asteittainen vaikeus']
    },
    'pattern-worksheet': {
      name: 'Kuviotehtävät',
      appId: 'pattern-worksheet',
      description: 'Luo tehtäviä sekvenssien ja toistuvien kuvioiden oppimiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Kuviot ja sekvenssit', 'Visuaalinen tunnistaminen', 'Looginen päättely', 'Useita tasoja']
    },
    'bingo': {
      name: 'Kuvabingo',
      appId: 'bingo',
      description: 'Luo mukautettuja bingolappuja kuvilla luokkahuonekäyttöön',
      category: 'Pelit',
      requiredTier: 'core',
      features: ['Mukautetut bingolaput', 'Temaattiset kuvat', 'Useita lappujen kokoja', 'Arvontalistat mukana']
    },
    'picture-path': {
      name: 'Kuvapolku',
      appId: 'picture-path',
      description: 'Luo visuaalisia polkuja logiikan ja ohjeiden seuraamisen kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Seurattavat polut', 'Peräkkäinen logiikka', 'Visuaaliset harjoitukset', 'Useita vaikeustasoja']
    },
    'picture-sort': {
      name: 'Kuvien Lajittelu',
      appId: 'picture-sort',
      description: 'Luo kuvien lajittelutehtäviä luokittelukyvyn kehittämiseen',
      category: 'Logiikka',
      requiredTier: 'full',
      features: ['Lajittelu ja järjestäminen', 'Luokittelu', 'Looginen päättely', 'Monipuoliset teemat']
    },
    'prepositions': {
      name: 'Prepositiot',
      appId: 'prepositions',
      description: 'Luo visuaalisia harjoituksia prepositioiden oppimiseen leikkisästi',
      category: 'Kielioppi',
      requiredTier: 'full',
      features: ['Tilalliset prepositiot', 'Kuvitetut harjoitukset', 'Visuaalinen oppiminen', 'Helppo ymmärtää']
    },
    'shadow-match': {
      name: 'Varjojen Yhdistäminen',
      appId: 'shadow-match',
      description: 'Luo harjoituksia esineiden ja niiden varjojen yhdistämiseen',
      category: 'Visuaalinen Hahmotus',
      requiredTier: 'full',
      features: ['Muoto-varjo-yhdistäminen', 'Visuaalinen hahmotus', 'Visuaalinen erottelu', 'Eri tasoja']
    },
    'subtraction': {
      name: 'Vähennyslasku',
      appId: 'subtraction',
      description: 'Luo visuaalisia vähennyslaskutehtäviä matematiikan opiskeluun',
      category: 'Matematiikka',
      requiredTier: 'full',
      features: ['Vähennyslaskuharjoitukset', 'Visuaalinen tuki', 'Säädettävä vaikeustaso', 'Vastausavaimet mukana']
    },
    'sudoku': {
      name: 'Sudoku Lapsille',
      appId: 'sudoku',
      description: 'Hauskoja sudoku-pulmia kuvilla numeroiden sijaan lapsille',
      category: 'Logiikka',
      requiredTier: 'core',
      features: ['Sudoku kuvilla', '4x4 ja 6x6 ruudukot', 'Asteittainen vaikeus', 'Ratkaisut mukana']
    },
    'treasure-hunt': {
      name: 'Aarteenetsintä',
      appId: 'treasure-hunt',
      description: 'Luo aarteenetsintätehtäviä leikkisiin ja opettavaisiin aktiviteetteihin',
      category: 'Opetuspelit',
      requiredTier: 'full',
      features: ['Etsintäpolut', 'Leikkisät aktiviteetit', 'Mukautettavat kartat', 'Edistää päättelykykyä']
    },
    'word-guess': {
      name: 'Arvaa Sana',
      appId: 'word-guess',
      description: 'Luo sanaa-arvaustehtäviä sanaston rikastamiseen',
      category: 'Sanapelit',
      requiredTier: 'full',
      features: ['Sana-arvoitukset', 'Visuaaliset vihjeet', 'Sanaston rikastaminen', 'Useita tasoja']
    },
    'word-scramble': {
      name: 'Sekoitetut Sanat',
      appId: 'word-scramble',
      description: 'Luo sanojen sekoitustehtäviä sanaston ja oikeinkirjoituksen parantamiseen',
      category: 'Kieli & Lukeminen',
      requiredTier: 'core',
      features: ['Mukautetut sanalistat', 'Temaattinen sanasto', 'Useita vaikeustasoja', 'Vastausavaimet mukana']
    },
    'word-search': {
      name: 'Sanaristikko',
      appId: 'word-search',
      description: 'Luo mukautettavia sanaristikoita temaattisella sanastolla',
      category: 'Sanapelit',
      requiredTier: 'free',
      features: ['Useita ruudukkokokoja', 'Suuntavalinnat', 'Temaattiset sanalistat', 'Vastausavaimet mukana']
    },
    'writing-app': {
      name: 'Kirjoitusharjoitukset',
      appId: 'writing-app',
      description: 'Luo mukautettuja kirjoitustehtäviä kirjoitustaitojen kehittämiseen',
      category: 'Kirjoitustaidot',
      requiredTier: 'full',
      features: ['Mukautettavat kirjoitusviivat', 'Monipuoliset teemat', 'Visuaalinen tuki', 'Tulostusvalmiit lomakkeet']
    }
  };

  // Static app data while Strapi is being set up
  const staticAppData: Record<string, any> = {
    'image-addition': {
      name: 'Image Addition',
      appId: 'image-addition',
      description: 'Create visual addition worksheets with images for early math learners',
      category: 'Math',
      requiredTier: 'core',
      features: ['Visual math problems', 'Customizable difficulty', 'Answer keys', 'Print-ready format']
    },
    'word-search': {
      name: 'Word Search',
      appId: 'word-search',
      description: 'Generate customizable word search puzzles with themed vocabulary',
      category: 'Word Games',
      requiredTier: 'free',
      features: ['Multiple grid sizes', 'Directional options', 'Themed word lists', 'Solution keys']
    },
    'coloring': {
      name: 'Coloring Pages',
      appId: 'coloring',
      description: 'Design printable coloring pages from our extensive image library',
      category: 'Art & Creativity',
      requiredTier: 'core',
      features: ['100+ images', 'Multiple themes', 'Various difficulty levels', 'High-quality prints']
    },
    'alphabet-train': {
      name: 'Alphabet Train',
      appId: 'alphabet-train',
      description: 'Help children learn letters with fun train-themed alphabet worksheets',
      category: 'Language Arts',
      requiredTier: 'core',
      features: ['Letter recognition', 'Alphabetical order', 'Fun train theme', 'Multiple difficulty levels']
    },
    'math-worksheet': {
      name: 'Math Worksheets',
      appId: 'math-worksheet',
      description: 'Generate customizable math practice worksheets for all skill levels',
      category: 'Math',
      requiredTier: 'core',
      features: ['Addition & subtraction', 'Multiplication & division', 'Answer keys', 'Difficulty settings']
    },
    'word-scramble': {
      name: 'Word Scramble',
      appId: 'word-scramble',
      description: 'Create word scramble puzzles to improve vocabulary and spelling',
      category: 'Language Arts',
      requiredTier: 'core',
      features: ['Custom word lists', 'Themed vocabulary', 'Multiple difficulty levels', 'Solution keys']
    },
    'find-and-count': {
      name: 'I Spy',
      appId: 'find-and-count',
      description: 'Visual counting exercises to develop number recognition and counting skills',
      category: 'Visual Perception',
      requiredTier: 'core',
      features: ['Object counting', 'Visual discrimination', 'Number practice', 'Engaging images']
    },
    'matching-app': {
      name: 'MatchUp Maker',
      appId: 'matching-app',
      description: 'Create matching activities to improve memory and association skills',
      category: 'Matching',
      requiredTier: 'core',
      features: ['Image-to-image matching', 'Word-to-image matching', 'Memory games', 'Custom pairs']
    },
    'drawing-lines': {
      name: 'Drawing Lines',
      appId: 'drawing-lines',
      description: 'Fine motor skill development through line drawing exercises',
      category: 'Fine Motor Skills',
      requiredTier: 'core',
      features: ['Tracing activities', 'Connect-the-dots', 'Path following', 'Pre-writing practice']
    },
    'picture-bingo': {
      name: 'Picture Bingo',
      appId: 'picture-bingo',
      description: 'Generate custom bingo cards with images for classroom fun',
      category: 'Games',
      requiredTier: 'core',
      features: ['Custom bingo cards', 'Themed images', 'Multiple card sizes', 'Call sheets included']
    },
    'sudoku': {
      name: 'Sudoku for Kids',
      appId: 'sudoku',
      description: 'Child-friendly sudoku puzzles with images instead of numbers',
      category: 'Logic',
      requiredTier: 'core',
      features: ['Picture sudoku', '4x4 and 6x6 grids', 'Progressive difficulty', 'Solution included']
    },
    'big-small-app': {
      name: 'Big or Small',
      appId: 'big-small-app',
      description: 'Create size comparison worksheets with visual exercises for early learners',
      category: 'Early Learning',
      requiredTier: 'full',
      features: ['Size comparisons', 'Visual exercises', 'Multiple choice', 'Sequencing tasks']
    }
  };

  // Return Spanish translation if locale is 'es' and translation exists
  if (locale === 'es' && spanishTranslations[slug]) {
    return spanishTranslations[slug];
  }

  // Return French translation if locale is 'fr' and translation exists
  if (locale === 'fr' && frenchTranslations[slug]) {
    return frenchTranslations[slug];
  }

  // Return German translation if locale is 'de' and translation exists
  if (locale === 'de' && germanTranslations[slug]) {
    return germanTranslations[slug];
  }

  // Return Italian translation if locale is 'it' and translation exists
  if (locale === 'it' && italianTranslations[slug]) {
    return italianTranslations[slug];
  }

  // Return Portuguese translation if locale is 'pt' and translation exists
  if (locale === 'pt' && portugueseTranslations[slug]) {
    return portugueseTranslations[slug];
  }

  // Return Dutch translation if locale is 'nl' and translation exists
  if (locale === 'nl' && dutchTranslations[slug]) {
    return dutchTranslations[slug];
  }

  // Return Swedish translation if locale is 'sv' and translation exists
  if (locale === 'sv' && swedishTranslations[slug]) {
    return swedishTranslations[slug];
  }

  // Return Danish translation if locale is 'da' and translation exists
  if (locale === 'da' && danishTranslations[slug]) {
    return danishTranslations[slug];
  }

  // Return Norwegian translation if locale is 'no' and translation exists
  if (locale === 'no' && norwegianTranslations[slug]) {
    return norwegianTranslations[slug];
  }

  // Return Finnish translation if locale is 'fi' and translation exists
  if (locale === 'fi' && finnishTranslations[slug]) {
    return finnishTranslations[slug];
  }

  // Return static data for now
  if (staticAppData[slug]) {
    return staticAppData[slug];
  }

  // Define tier mappings for all apps
  const appTiers: Record<string, string> = {
    'word-search': 'free',
    // Core Bundle
    'image-addition': 'core',
    'alphabet-train': 'core',
    'coloring': 'core',
    'math-worksheet': 'core',
    'word-scramble': 'core',
    'find-and-count': 'core',
    'matching-app': 'core',
    'drawing-lines': 'core',
    'picture-bingo': 'core',
    'sudoku': 'core',
    // Full Access
    'big-small-app': 'full',
    'chart-count-color': 'full',
    'code-addition': 'full',
    'draw-and-color': 'full',
    'find-objects': 'full',
    'grid-match': 'full',
    'image-crossword': 'full',
    'image-cryptogram': 'full',
    'math-puzzle': 'full',
    'missing-pieces': 'full',
    'more-less': 'full',
    'odd-one-out': 'full',
    'pattern-train': 'full',
    'pattern-worksheet': 'full',
    'picture-path': 'full',
    'picture-sort': 'full',
    'prepositions': 'full',
    'shadow-match': 'full',
    'story-dice': 'full',
    'subtraction': 'full',
    'treasure-hunt': 'full',
    'word-guess': 'full',
    'writing-app': 'full'
  };
  
  // If not in static data, create a default entry based on slug
  // This ensures ALL apps work even without Strapi
  const defaultAppData = {
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    appId: slug,
    description: `Create professional ${slug.replace(/-/g, ' ')} worksheets`,
    category: 'Educational Tools',
    requiredTier: appTiers[slug] || 'full',
    features: ['Easy to use', 'Print ready', 'Professional design', 'Customizable']
  };
  
  // Try Strapi if available (but don't fail if it's not)
  try {
    const strapiUrl = 'http://localhost:1337';
    const response = await fetch(
      `${strapiUrl}/api/app-infos?filters[slug][$eq]=${slug}&populate=*`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      const strapiData = data.data?.[0]?.attributes;
      if (strapiData) {
        return strapiData;
      }
    }
  } catch (error) {
    // Silently fall back to default data
  }
  
  // Return default data so the page always works
  return defaultAppData;
}

// Check if user has access to the app
function checkAccess(userTier: string, requiredTier: string): boolean {
  const tierLevels: { [key: string]: number } = {
    'free': 0,
    'core': 1,
    'full': 2
  };
  
  return tierLevels[userTier] >= tierLevels[requiredTier];
}

// Get tier badge color
function getTierColor(tier: string): string {
  switch(tier) {
    case 'free':
      return 'from-green-600 to-green-700';
    case 'core':
      return 'from-blue-600 to-blue-700';
    case 'full':
      return 'from-purple-600 to-purple-700';
    default:
      return 'from-gray-600 to-gray-700';
  }
}

// Get tier label
function getTierLabel(tier: string, locale: string): string {
  const tierLabels: Record<string, Record<string, string>> = {
    'free': {
      'en': 'FREE TIER',
      'de': 'KOSTENLOS',
      'fr': 'GRATUIT',
      'es': 'GRATIS',
      'it': 'GRATUITO',
      'pt': 'GRATUITO',
      'nl': 'GRATIS',
      'sv': 'GRATIS',
      'da': 'GRATIS',
      'no': 'GRATIS',
      'fi': 'ILMAINEN'
    },
    'core': {
      'en': 'CORE BUNDLE',
      'de': 'BASIS-PAKET',
      'fr': 'OFFRE ESSENTIELLE',
      'es': 'PAQUETE BÁSICO',
      'it': 'PACCHETTO BASE',
      'pt': 'PACOTE ESSENCIAL',
      'nl': 'BASISPAKKET',
      'sv': 'BASPAKET',
      'da': 'BASISPAKKE',
      'no': 'BASISPAKKE',
      'fi': 'PERUSPAKETTI'
    },
    'full': {
      'en': 'FULL ACCESS',
      'de': 'VOLLZUGRIFF',
      'fr': 'ACCÈS COMPLET',
      'es': 'ACCESO COMPLETO',
      'it': 'ACCESSO COMPLETO',
      'pt': 'ACESSO COMPLETO',
      'nl': 'VOLLEDIGE TOEGANG',
      'sv': 'FULL ÅTKOMST',
      'da': 'FULD ADGANG',
      'no': 'FULL TILGANG',
      'fi': 'TÄYSI PÄÄSY'
    }
  };

  return tierLabels[tier]?.[locale] || tierLabels[tier]?.['en'] || tier.toUpperCase();
}

// SEO redirects: English slugs to language-specific slugs (301 redirect for SEO)
const seoRedirects: { [locale: string]: { [englishSlug: string]: string } } = {
  sv: {
    'word-search-worksheets': 'ordletar-arbetsblad',
    'addition-worksheets': 'addition-arbetsblad',
    'sudoku-worksheets': 'bildsudoku-arbetsblad',
    'draw-and-color-worksheets': 'rutritning-arbetsblad',
  },
  fr: {
    'draw-and-color-worksheets': 'dessin-quadrillage-fiches',
    'find-objects-worksheets': 'cherche-objets-fiches',
    'grid-match-worksheets': 'puzzle-grille-fiches',
    'crossword-worksheets': 'mots-croises-images-fiches',
  },
  it: {
    'alphabet-train-worksheets': 'treno-alfabeto-schede',
    'math-worksheets': 'matematica-schede',
    'word-scramble-worksheets': 'anagrammi-schede',
  },
  // Add more languages as they get localized slugs:
  // de: { 'word-search-worksheets': 'wortsuche-arbeitsblaetter' },
};

export default async function AppPage({ params: { locale, slug } }: PageProps) {
  // SEO: Redirect English slugs to language-specific slugs (301 permanent redirect)
  const localeRedirects = seoRedirects[locale];
  if (localeRedirects && localeRedirects[slug]) {
    redirect(`/${locale}/apps/${localeRedirects[slug]}`);
  }

  // Check if this is a product page with custom content using the content registry
  // This handles both English slugs and language-specific slugs (e.g., 'ordletar-arbetsblad' for Swedish)
  const content = getContentBySlug(locale, slug);
  if (content) {
    // Build app data for schema markup
    const schemaAppData: AppProductData = {
      appId: content.seo?.appId || slug,
      name: content.seo?.title || content.hero?.title || slug,
      description: content.seo?.description || content.hero?.subtitle || '',
      category: 'Worksheet Generator'
    };

    return (
      <>
        <SchemaScripts appData={schemaAppData} locale={locale} slug={slug} />
        <ProductPageClient locale={locale} content={content} />
      </>
    );
  }

  // Legacy fallback for content not yet in the registry
  // TODO: Remove these once all content files have SEO sections
  if (slug === 'addition-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={additionEnContent} />;
  }

  if (slug === 'alphabet-train-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={alphabetTrainEnContent} />;
  }

  if (slug === 'coloring-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={coloringEnContent} />;
  }

  if (slug === 'math-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={mathWorksheetsEnContent} />;
  }

  if (slug === 'word-scramble-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={wordScrambleEnContent} />;
  }

  if (slug === 'find-and-count-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={findAndCountEnContent} />;
  }

  if (slug === 'matching-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={matchingEnContent} />;
  }

  if (slug === 'drawing-lines-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={drawingLinesEnContent} />;
  }

  if (slug === 'picture-bingo-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={pictureBingoEnContent} />;
  }

  if (slug === 'sudoku-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={sudokuEnContent} />;
  }

  if (slug === 'big-small-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={bigSmallEnContent} />;
  }

  if (slug === 'chart-count-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={chartCountEnContent} />;
  }

  if (slug === 'code-addition-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={codeAdditionEnContent} />;
  }

  if (slug === 'draw-and-color-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={drawAndColorEnContent} />;
  }

  if (slug === 'find-objects-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={findObjectsEnContent} />;
  }

  if (slug === 'grid-match-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={gridMatchEnContent} />;
  }

  if (slug === 'crossword-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={crosswordEnContent} />;
  }

  if (slug === 'cryptogram-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={cryptogramEnContent} />;
  }

  if (slug === 'math-puzzle-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={mathPuzzleEnContent} />;
  }

  if (slug === 'missing-pieces-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={missingPiecesEnContent} />;
  }

  if (slug === 'more-less-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={moreLessEnContent} />;
  }

  if (slug === 'odd-one-out-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={oddOneOutEnContent} />;
  }

  if (slug === 'pattern-train-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={patternTrainEnContent} />;
  }

  if (slug === 'pattern-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={patternWorksheetsEnContent} />;
  }

  if (slug === 'picture-path-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={picturePathEnContent} />;
  }

  if (slug === 'picture-sort-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={pictureSortEnContent} />;
  }

  if (slug === 'prepositions-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={prepositionsEnContent} />;
  }

  if (slug === 'shadow-match-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={shadowMatchEnContent} />;
  }

  if (slug === 'subtraction-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={subtractionEnContent} />;
  }

  if (slug === 'treasure-hunt-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={treasureHuntEnContent} />;
  }

  if (slug === 'word-guess-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={wordGuessEnContent} />;
  }

  if (slug === 'writing-worksheets' && locale === 'en') {
    return <ProductPageClient locale={locale} content={writingEnContent} />;
  }

  // Fetch app data from Strapi
  const appData = await getAppData(slug, locale);
  
  // If app not found, show 404
  if (!appData) {
    notFound();
  }

  // Extract data with fallbacks
  const appName = appData.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const appDescription = appData.description || `Create professional ${appName} worksheets`;
  
  // Map slug to correct HTML filename
  const htmlFileMap: { [key: string]: string } = {
    'word-search': 'wordsearch.html',
    'image-addition': 'addition.html',
    'alphabet-train': 'alphabet train.html',
    'math-worksheet': 'math worksheet.html',
    'find-and-count': 'find and count.html',
    'matching-app': 'matching.html',
    'drawing-lines': 'drawing lines.html',
    'picture-bingo': 'bingo.html',
    'big-small-app': 'big small.html',
    'chart-count-color': 'chart count.html',
    'code-addition': 'code addition.html',
    'draw-and-color': 'draw and color.html',
    'find-objects': 'find objects.html',
    'grid-match': 'grid match.html',
    'image-crossword': 'crossword.html',
    'image-cryptogram': 'cryptogram.html',
    'math-puzzle': 'math puzzle.html',
    'missing-pieces': 'missing pieces.html',
    'more-less': 'more less.html',
    'odd-one-out': 'odd one out.html',
    'pattern-train': 'pattern train.html',
    'pattern-worksheet': 'pattern worksheet.html',
    'picture-path': 'picture path.html',
    'picture-sort': 'picture sort.html',
    'shadow-match': 'shadow match.html',
    'story-dice': 'story dice.html',
    'treasure-hunt': 'treasure hunt.html',
    'word-guess': 'word guess.html',
    'word-scramble': 'word scramble.html',
    'writing-app': 'writing.html',
    'sudoku': 'sudoku.html',
    'coloring': 'coloring.html',
    'subtraction': 'subtraction.html',
    'prepositions': 'prepositions.html'
  };
  
  // Use appId (not SEO slug) to look up HTML filename - SEO slugs like 'cherche-objets-fiches'
  // need to map back to appId 'find-objects' to find 'find objects.html'
  const actualAppId = appData.appId || slug;
  const sourceFile = appData.sourceFile || htmlFileMap[actualAppId] || `${actualAppId}.html`;
  const componentName = appData.componentName || slug;
  const appTier = appData.requiredTier || 'core';
  // Ensure features is always an array
  const features = Array.isArray(appData.features) ? appData.features : 
                   appData.features ? [appData.features] : 
                   ['Professional design', 'Easy to use', 'Print ready'];
  const category = appData.category || 'General';
  const icon = appData.icon || '📝';
  
  const tierColor = getTierColor(appTier);
  const tierLabel = getTierLabel(appTier, locale);

  // German translations for UI elements
  const uiTranslations = {
    de: {
      apps: 'Anwendungen',
      tierLabels: {
        free: 'Kostenlos',
        core: 'Kernpaket',
        full: 'Vollzugriff'
      },
      accessRequired: {
        core: 'Diese App erfordert das Kernpaket',
        full: 'Diese App erfordert Vollzugriff'
      },
      upgradeMessage: 'Upgraden Sie Ihren Plan, um auf diesen Arbeitsblatt-Generator und viele weitere professionelle Tools zuzugreifen.',
      viewPricing: 'Preispläne anzeigen',
      browseFreeApps: 'Kostenlose Apps durchsuchen',
      howToUse: 'Anleitung',
      startFreeTrial: 'Jetzt registrieren',
      viewAllPlans: 'Alle Pläne anzeigen',
      exploreMoreApps: 'Mehr Apps erkunden',
      upgradeToAccess: 'Upgrade für Zugriff',
      unlockThisApp: 'Diese App freischalten'
    }
  };

  const t = (key: string, defaultValue: string): string => {
    if (locale === 'de') {
      const value = uiTranslations.de[key as keyof typeof uiTranslations.de];
      if (typeof value === 'string') {
        return value;
      }
    }
    return defaultValue;
  };

  const getLocalizedTierLabel = () => {
    if (locale === 'de' && uiTranslations.de.tierLabels[appTier as keyof typeof uiTranslations.de.tierLabels]) {
      return uiTranslations.de.tierLabels[appTier as keyof typeof uiTranslations.de.tierLabels];
    }
    return tierLabel;
  };

  // Build app data for schema markup (fallback pages)
  const schemaAppData: AppProductData = {
    appId: appData.appId || slug,
    name: appName,
    description: appDescription,
    category: category,
    tier: appTier as 'free' | 'core' | 'full'
  };

  return (
    <>
      <SchemaScripts appData={schemaAppData} locale={locale} slug={slug} />
      <AutoLaunchApp
        appSlug={slug}
        sourceFile={sourceFile}
        locale={locale}
        appName={appName}
        appTier={appTier}
      />
    </>
  );
}

// Generate static params for all apps
export async function generateStaticParams() {
  // List of all app slugs
  const apps = [
    'addition-worksheets', // Product page slug
    'word-search-worksheets', // Product page slug (English)
    'suchsel-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug
    'mots-caches-fiches', // Product page slug (French) - language-specific SEO slug
    'addition-fiches', // Product page slug (French) - language-specific SEO slug
    'train-alphabet-fiches', // Product page slug (French) - language-specific SEO slug
    'coloriage-fiches', // Product page slug (French) - language-specific SEO slug for coloring
    'puzzle-maths-fiches', // Product page slug (French) - language-specific SEO slug for math-puzzle
    'exercices-maths-fiches', // Product page slug (French) - language-specific SEO slug for math-worksheet
    'cherche-et-compte-fiches', // Product page slug (French) - language-specific SEO slug for find-and-count
    'mots-melanges-fiches', // Product page slug (French) - language-specific SEO slug for word-scramble
    'association-fiches', // Product page slug (French) - language-specific SEO slug for matching
    'graphisme-fiches', // Product page slug (French) - language-specific SEO slug for drawing-lines
    'bingo-images-fiches', // Product page slug (French) - language-specific SEO slug for picture-bingo
    'sudoku-enfants-fiches', // Product page slug (French) - language-specific SEO slug for sudoku
    'grand-petit-fiches', // Product page slug (French) - language-specific SEO slug for big-small
    'graphique-images-fiches', // Product page slug (French) - language-specific SEO slug for chart-count
    'dessin-quadrillage-fiches', // Product page slug (French) - language-specific SEO slug for draw-and-color
    'cherche-objets-fiches', // Product page slug (French) - language-specific SEO slug for find-objects
    'puzzle-grille-fiches', // Product page slug (French) - language-specific SEO slug for grid-match
    'mots-croises-images-fiches', // Product page slug (French) - language-specific SEO slug for crossword
    'cryptogramme-images-fiches', // Product page slug (French) - language-specific SEO slug for cryptogram
    'pieces-manquantes-fiches', // Product page slug (French) - language-specific SEO slug for missing-pieces
    'comparaison-quantites-fiches', // Product page slug (French) - language-specific SEO slug for more-less
    'intrus-fiches', // Product page slug (French) - language-specific SEO slug for odd-one-out
    'train-suites-logiques-fiches', // Product page slug (French) - language-specific SEO slug for pattern-train
    'sequences-logiques-fiches', // Product page slug (French) - language-specific SEO slug for pattern-worksheet
    'parcours-images-fiches', // Product page slug (French) - language-specific SEO slug for picture-path
    'tri-images-fiches', // Product page slug (French) - language-specific SEO slug for picture-sort
    'prepositions-exercices-fiches', // Product page slug (French) - language-specific SEO slug for prepositions
    'discrimination-visuelle-fiches', // Product page slug (French) - language-specific SEO slug for shadow-match
    'soustraction-fiches', // Product page slug (French) - language-specific SEO slug for subtraction
    'chasse-au-tresor-fiches', // Product page slug (French) - language-specific SEO slug for treasure-hunt
    'deviner-mots-fiches', // Product page slug (French) - language-specific SEO slug for word-guess
    'ecriture-fiches', // Product page slug (French) - language-specific SEO slug for writing
    'acertijos-matematicos-fichas', // Product page slug (Spanish) - language-specific SEO slug for math-worksheet
    'letras-revueltas-fichas', // Product page slug (Spanish) - language-specific SEO slug for word-scramble
    'buscar-contar-fichas', // Product page slug (Spanish) - language-specific SEO slug for find-and-count
    'bingo-fichas', // Product page slug (Spanish) - language-specific SEO slug for picture-bingo
    'sudoku-fichas-ninos', // Product page slug (Spanish) - language-specific SEO slug for sudoku
    'grande-pequeno-fichas', // Product page slug (Spanish) - language-specific SEO slug for big-small
    'graficos-conteo-fichas', // Product page slug (Spanish) - language-specific SEO slug for chart-count
    'suma-codigo-fichas', // Product page slug (Spanish) - language-specific SEO slug for code-addition
    'dibujo-cuadricula-fichas', // Product page slug (Spanish) - language-specific SEO slug for draw-and-color
    'buscar-objetos-fichas', // Product page slug (Spanish) - language-specific SEO slug for find-objects
    'rompecabezas-cuadricula-fichas', // Product page slug (Spanish) - language-specific SEO slug for grid-match
    'crucigramas-imagenes-fichas', // Product page slug (Spanish) - language-specific SEO slug for crossword
    'criptogramas-imagenes-fichas', // Product page slug (Spanish) - language-specific SEO slug for cryptogram
    'rompecabezas-matematicos-fichas', // Product page slug (Spanish) - language-specific SEO slug for math-puzzle
    'piezas-faltantes-fichas', // Product page slug (Spanish) - language-specific SEO slug for missing-pieces
    'laberintos-imagenes-fichas', // Product page slug (Spanish) - language-specific SEO slug for picture-path
    'mayor-menor-fichas', // Product page slug (Spanish) - language-specific SEO slug for more-less
    'encuentra-el-diferente-fichas', // Product page slug (Spanish) - language-specific SEO slug for odd-one-out
    'tren-patrones-fichas', // Product page slug (Spanish) - language-specific SEO slug for pattern-train
    'fichas-patrones', // Product page slug (Spanish) - language-specific SEO slug for pattern-worksheet
    'clasificar-imagenes-fichas', // Product page slug (Spanish) - language-specific SEO slug for picture-sort
    'preposiciones-fichas', // Product page slug (Spanish) - language-specific SEO slug for prepositions
    'asociacion-sombras-fichas', // Product page slug (Spanish) - language-specific SEO slug for shadow-match
    'resta-fichas', // Product page slug (Spanish) - language-specific SEO slug for subtraction
    'busqueda-tesoro-fichas', // Product page slug (Spanish) - language-specific SEO slug for treasure-hunt
    'adivinar-palabras-fichas', // Product page slug (Spanish) - language-specific SEO slug for word-guess
    'lectoescritura-fichas', // Product page slug (Spanish) - language-specific SEO slug for writing
    'alphabet-zug-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug
    'malvorlagen-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug
    'mathe-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for math worksheets
    'buchstabensalat-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for word scramble
    'suchen-und-zaehlen-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for find-and-count
    'gross-klein-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for big-small
    'bilddiagramm-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for chart-count
    'bilder-additions-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for code-addition
    'suchbilder-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for find-objects
    'bilderkreuzwortraetsel-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for crossword
    'bildkryptogramm-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for cryptogram
    'mathe-raetsel-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for math-puzzle
    'fehlende-puzzleteile-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for missing-pieces
    'mehr-weniger-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for more-less
    'was-passt-nicht-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for odd-one-out
    'muster-zug-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for pattern-train
    'muster-arbeitsblatt-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for pattern-worksheet
    'bilderpfad-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for picture-path
    'bilder-sortieren-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for picture-sort
    'praepositionen-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for prepositions
    'schattenbilder-zuordnen-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for shadow-match
    'subtraktion-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for subtraction
    'schatzsuche-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for treasure-hunt
    'woerter-raten-arbeitsblaetter', // Product page slug (German) - language-specific SEO slug for word-guess
    'ordletar-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'addition-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'alfabettag-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'malarbilder-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'matematik-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'ordpussel-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'matchnings-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'rita-linjer-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'hitta-och-rakna-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'bildsudoku-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'stort-litet-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'diagram-rakning-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'kodaddition-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'rutritning-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'hitta-foremal-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'rutnatsmatching-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'bildkorsord-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'mattepussel-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'saknade-bitar-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'jamforelse-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'hitta-udda-bilden-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'monster-tag-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug
    'monster-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for pattern worksheets
    'bildlabyrint-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for picture-path
    'bildsortering-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for picture-sort
    'prepositioner-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for prepositions
    'skuggmatchning-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for shadow-match
    'subtraktion-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for subtraction
    'skattjakt-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for treasure-hunt
    'gissa-ordet-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for word-guess
    'skrivovningar-arbetsblad', // Product page slug (Swedish) - language-specific SEO slug for writing
    // Italian language-specific SEO slugs
    'treno-alfabeto-schede', // Product page slug (Italian) - language-specific SEO slug for alphabet-train
    'matematica-schede', // Product page slug (Italian) - language-specific SEO slug for math-worksheets
    'anagrammi-schede', // Product page slug (Italian) - language-specific SEO slug for word-scramble
    'trova-e-conta-schede', // Product page slug (Italian) - language-specific SEO slug for find-and-count
    'abbinamenti-schede', // Product page slug (Italian) - language-specific SEO slug for matching
    'alphabet-train-worksheets', // Product page slug
    'coloring-worksheets', // Product page slug
    'math-worksheets', // Product page slug
    'word-scramble-worksheets', // Product page slug
    'find-and-count-worksheets', // Product page slug
    'matching-worksheets', // Product page slug
    'drawing-lines-worksheets', // Product page slug
    'picture-bingo-worksheets', // Product page slug
    'sudoku-worksheets', // Product page slug
    'big-small-worksheets', // Product page slug
    'chart-count-worksheets', // Product page slug
    'code-addition-worksheets', // Product page slug
    'draw-and-color-worksheets', // Product page slug
    'find-objects-worksheets', // Product page slug
    'grid-match-worksheets', // Product page slug
    'crossword-worksheets', // Product page slug
    'cryptogram-worksheets', // Product page slug
    'math-puzzle-worksheets', // Product page slug
    'missing-pieces-worksheets', // Product page slug
    'more-less-worksheets', // Product page slug
    'odd-one-out-worksheets', // Product page slug
    'pattern-train-worksheets', // Product page slug
    'pattern-worksheets', // Product page slug
    'picture-path-worksheets', // Product page slug
    'picture-sort-worksheets', // Product page slug
    'prepositions-worksheets', // Product page slug
    'shadow-match-worksheets', // Product page slug
    'subtraction-worksheets', // Product page slug
    'treasure-hunt-worksheets', // Product page slug
    'word-guess-worksheets', // Product page slug
    'writing-worksheets', // Product page slug
    'word-search',
    'image-addition',
    'alphabet-train',
    'coloring',
    'math-worksheet',
    'word-scramble',
    'find-and-count',
    'matching-app',
    'drawing-lines',
    'picture-bingo',
    'sudoku',
    'big-small-app',
    'chart-count-color',
    'code-addition',
    'draw-and-color',
    'find-objects',
    'grid-match',
    'image-crossword',
    'image-cryptogram',
    'math-puzzle',
    'missing-pieces',
    'more-less',
    'odd-one-out',
    'pattern-train',
    'pattern-worksheet',
    'picture-path',
    'picture-sort',
    'prepositions',
    'shadow-match',
    'story-dice',
    'subtraction',
    'treasure-hunt',
    'word-guess',
    'writing-app'
  ];
  
  const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  
  // Generate params for all combinations
  const params = [];
  for (const locale of locales) {
    for (const slug of apps) {
      params.push({ locale, slug });
    }
  }
  
  return params;
}