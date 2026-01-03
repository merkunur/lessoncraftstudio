/**
 * Product Page Content Registry
 *
 * This file centralizes all product page content imports and provides
 * lookup functions for finding content by slug or app ID.
 */

import { ProductPageContent } from '@/components/product-page/ProductPageClient';

// English content imports
import wordSearchEnContent from '@/content/product-pages/en/word-search-worksheets';
import additionEnContent from '@/content/product-pages/en/addition-worksheets';
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

// Swedish content imports
import wordSearchSvContent from '@/content/product-pages/sv/word-search-worksheets';
import additionSvContent from '@/content/product-pages/sv/addition-worksheets';
import alphabetTrainSvContent from '@/content/product-pages/sv/alphabet-train-worksheets';
import coloringSvContent from '@/content/product-pages/sv/coloring-worksheets';
import mathWorksheetsSvContent from '@/content/product-pages/sv/math-worksheets';
import wordScrambleSvContent from '@/content/product-pages/sv/word-scramble-worksheets';
import findAndCountSvContent from '@/content/product-pages/sv/find-and-count-worksheets';
import matchingSvContent from '@/content/product-pages/sv/matching-worksheets';
import drawingLinesSvContent from '@/content/product-pages/sv/drawing-lines-worksheets';
import pictureBingoSvContent from '@/content/product-pages/sv/picture-bingo-worksheets';
import sudokuSvContent from '@/content/product-pages/sv/sudoku-worksheets';
import bigSmallSvContent from '@/content/product-pages/sv/big-small-worksheets';
import chartCountSvContent from '@/content/product-pages/sv/chart-count-worksheets';
import codeAdditionSvContent from '@/content/product-pages/sv/code-addition-worksheets';
import drawAndColorSvContent from '@/content/product-pages/sv/draw-and-color-worksheets';
import findObjectsSvContent from '@/content/product-pages/sv/find-objects-worksheets';
import gridMatchSvContent from '@/content/product-pages/sv/grid-match-worksheets';
import crosswordSvContent from '@/content/product-pages/sv/crossword-worksheets';
import cryptogramSvContent from '@/content/product-pages/sv/cryptogram-worksheets';
import mathPuzzleSvContent from '@/content/product-pages/sv/math-puzzle-worksheets';
import missingPiecesSvContent from '@/content/product-pages/sv/missing-pieces-worksheets';
import moreLessSvContent from '@/content/product-pages/sv/more-less-worksheets';
import oddOneOutSvContent from '@/content/product-pages/sv/odd-one-out-worksheets';
import patternTrainSvContent from '@/content/product-pages/sv/pattern-train-worksheets';
import patternWorksheetsSvContent from '@/content/product-pages/sv/pattern-worksheets';
import picturePathSvContent from '@/content/product-pages/sv/picture-path-worksheets';
import pictureSortSvContent from '@/content/product-pages/sv/picture-sort-worksheets';
import prepositionsSvContent from '@/content/product-pages/sv/prepositions-worksheets';
import shadowMatchSvContent from '@/content/product-pages/sv/shadow-match-worksheets';
import subtractionSvContent from '@/content/product-pages/sv/subtraction-worksheets';
import treasureHuntSvContent from '@/content/product-pages/sv/treasure-hunt-worksheets';
import wordGuessSvContent from '@/content/product-pages/sv/word-guess-worksheets';
import writingSvContent from '@/content/product-pages/sv/writing-worksheets';

// German content imports
import wordSearchDeContent from '@/content/product-pages/de/word-search-worksheets';
import additionDeContent from '@/content/product-pages/de/addition-worksheets';
import alphabetTrainDeContent from '@/content/product-pages/de/alphabet-train-worksheets';
import coloringDeContent from '@/content/product-pages/de/coloring-worksheets';
import mathWorksheetsDeContent from '@/content/product-pages/de/math-worksheets';
import wordScrambleDeContent from '@/content/product-pages/de/word-scramble-worksheets';
import findAndCountDeContent from '@/content/product-pages/de/find-and-count-worksheets';
import matchingDeContent from '@/content/product-pages/de/matching-worksheets';
import drawingLinesDeContent from '@/content/product-pages/de/drawing-lines-worksheets';
import pictureBingoDeContent from '@/content/product-pages/de/picture-bingo-worksheets';
import sudokuDeContent from '@/content/product-pages/de/sudoku-worksheets';
import bigSmallDeContent from '@/content/product-pages/de/big-small-worksheets';
import chartCountDeContent from '@/content/product-pages/de/chart-count-worksheets';
import codeAdditionDeContent from '@/content/product-pages/de/code-addition-worksheets';
import drawAndColorDeContent from '@/content/product-pages/de/draw-and-color-worksheets';
import findObjectsDeContent from '@/content/product-pages/de/find-objects-worksheets';
import gridMatchDeContent from '@/content/product-pages/de/grid-match-worksheets';
import crosswordDeContent from '@/content/product-pages/de/crossword-worksheets';
import cryptogramDeContent from '@/content/product-pages/de/cryptogram-worksheets';
import mathPuzzleDeContent from '@/content/product-pages/de/math-puzzle-worksheets';
import missingPiecesDeContent from '@/content/product-pages/de/missing-pieces-worksheets';
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
import writingDeContent from '@/content/product-pages/de/schreibuebungen-arbeitsblaetter';

// French content imports
import wordSearchFrContent from '@/content/product-pages/fr/word-search-worksheets';
import additionFrContent from '@/content/product-pages/fr/addition-worksheets';
import alphabetTrainFrContent from '@/content/product-pages/fr/alphabet-train-worksheets';
import coloringFrContent from '@/content/product-pages/fr/coloring-worksheets';
import mathPuzzleFrContent from '@/content/product-pages/fr/math-puzzle-worksheets';
import mathWorksheetsFrContent from '@/content/product-pages/fr/math-worksheets';
import wordScrambleFrContent from '@/content/product-pages/fr/word-scramble-worksheets';
import findAndCountFrContent from '@/content/product-pages/fr/find-and-count-worksheets';
import matchingFrContent from '@/content/product-pages/fr/matching-worksheets';
import drawingLinesFrContent from '@/content/product-pages/fr/drawing-lines-worksheets';
import pictureBingoFrContent from '@/content/product-pages/fr/picture-bingo-worksheets';
import sudokuFrContent from '@/content/product-pages/fr/sudoku-worksheets';
import bigSmallFrContent from '@/content/product-pages/fr/big-small-worksheets';
import chartCountFrContent from '@/content/product-pages/fr/chart-count-worksheets';
import codeAdditionFrContent from '@/content/product-pages/fr/code-addition-worksheets';
import drawAndColorFrContent from '@/content/product-pages/fr/draw-and-color-worksheets';
import findObjectsFrContent from '@/content/product-pages/fr/find-objects-worksheets';
import gridMatchFrContent from '@/content/product-pages/fr/grid-match-worksheets';
import crosswordFrContent from '@/content/product-pages/fr/crossword-worksheets';
import cryptogramFrContent from '@/content/product-pages/fr/cryptogram-worksheets';
import missingPiecesFrContent from '@/content/product-pages/fr/missing-pieces-worksheets';
import moreLessFrContent from '@/content/product-pages/fr/more-less-worksheets';
import oddOneOutFrContent from '@/content/product-pages/fr/odd-one-out-worksheets';

// Content registry: maps slug to content for each locale
interface ContentRegistry {
  [locale: string]: {
    [slug: string]: ProductPageContent;
  };
}

// Build the content registry
// Content with SEO slugs are indexed by their slug
// Legacy content without SEO section uses the old slug
export const contentRegistry: ContentRegistry = {
  en: {
    // Word Search - has SEO section
    'word-search-worksheets': wordSearchEnContent,
    // Legacy content - indexed by old slugs (will be migrated)
    'addition-worksheets': additionEnContent,
    'alphabet-train-worksheets': alphabetTrainEnContent,
    'coloring-worksheets': coloringEnContent,
    'math-worksheets': mathWorksheetsEnContent,
    'word-scramble-worksheets': wordScrambleEnContent,
    'find-and-count-worksheets': findAndCountEnContent,
    'matching-worksheets': matchingEnContent,
    'drawing-lines-worksheets': drawingLinesEnContent,
    'picture-bingo-worksheets': pictureBingoEnContent,
    'sudoku-worksheets': sudokuEnContent,
    'big-small-worksheets': bigSmallEnContent,
    'chart-count-worksheets': chartCountEnContent,
    'code-addition-worksheets': codeAdditionEnContent,
    'draw-and-color-worksheets': drawAndColorEnContent,
    'find-objects-worksheets': findObjectsEnContent,
    'grid-match-worksheets': gridMatchEnContent,
    'crossword-worksheets': crosswordEnContent,
    'cryptogram-worksheets': cryptogramEnContent,
    'math-puzzle-worksheets': mathPuzzleEnContent,
    'missing-pieces-worksheets': missingPiecesEnContent,
    'more-less-worksheets': moreLessEnContent,
    'odd-one-out-worksheets': oddOneOutEnContent,
    'pattern-train-worksheets': patternTrainEnContent,
    'pattern-worksheets': patternWorksheetsEnContent,
    'picture-path-worksheets': picturePathEnContent,
    'picture-sort-worksheets': pictureSortEnContent,
    'prepositions-worksheets': prepositionsEnContent,
    'shadow-match-worksheets': shadowMatchEnContent,
    'subtraction-worksheets': subtractionEnContent,
    'treasure-hunt-worksheets': treasureHuntEnContent,
    'word-guess-worksheets': wordGuessEnContent,
    'writing-worksheets': writingEnContent,
  },
  sv: {
    // Swedish Word Search - uses Swedish slug
    'ordletar-arbetsblad': wordSearchSvContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchSvContent,
    // Swedish Addition - uses Swedish slug
    'addition-arbetsblad': additionSvContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionSvContent,
    // Swedish Alphabet Train - uses Swedish slug
    'alfabettag-arbetsblad': alphabetTrainSvContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainSvContent,
    // Swedish Coloring - uses Swedish slug
    'malarbilder-arbetsblad': coloringSvContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringSvContent,
    // Swedish Math Worksheets - uses Swedish slug
    'matematik-arbetsblad': mathWorksheetsSvContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsSvContent,
    // Swedish Word Scramble - uses Swedish slug
    'ordpussel-arbetsblad': wordScrambleSvContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleSvContent,
    // Swedish Find and Count - uses Swedish slug
    'hitta-och-rakna-arbetsblad': findAndCountSvContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountSvContent,
    // Swedish Matching - uses Swedish slug
    'matchnings-arbetsblad': matchingSvContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingSvContent,
    // Swedish Drawing Lines - uses Swedish slug
    'rita-linjer-arbetsblad': drawingLinesSvContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesSvContent,
    // Swedish Picture Bingo - uses Swedish slug
    'bildlotto-arbetsblad': pictureBingoSvContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoSvContent,
    // Swedish Sudoku - uses Swedish slug
    'bildsudoku-arbetsblad': sudokuSvContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuSvContent,
    // Swedish Big Small - uses Swedish slug
    'stort-litet-arbetsblad': bigSmallSvContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallSvContent,
    // Swedish Chart Count - uses Swedish slug
    'diagram-rakning-arbetsblad': chartCountSvContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountSvContent,
    // Swedish Code Addition - uses Swedish slug
    'kodaddition-arbetsblad': codeAdditionSvContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionSvContent,
    // Swedish Draw and Color - uses Swedish slug
    'rutritning-arbetsblad': drawAndColorSvContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorSvContent,
    // Swedish Find Objects - uses Swedish slug
    'hitta-foremal-arbetsblad': findObjectsSvContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsSvContent,
    // Swedish Grid Match - uses Swedish slug
    'rutnatsmatching-arbetsblad': gridMatchSvContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchSvContent,
    // Swedish Crossword - uses Swedish slug
    'bildkorsord-arbetsblad': crosswordSvContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordSvContent,
    // Swedish Cryptogram - uses Swedish slug
    'bildkryptogram-arbetsblad': cryptogramSvContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramSvContent,
    // Swedish Math Puzzle - uses Swedish slug
    'mattepussel-arbetsblad': mathPuzzleSvContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleSvContent,
    // Swedish Missing Pieces - uses Swedish slug
    'saknade-bitar-arbetsblad': missingPiecesSvContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesSvContent,
    // Swedish More Less - uses Swedish slug
    'jamforelse-arbetsblad': moreLessSvContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessSvContent,
    // Swedish Odd One Out - uses Swedish slug
    'hitta-udda-bilden-arbetsblad': oddOneOutSvContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutSvContent,
    // Swedish Pattern Train - uses Swedish slug
    'monster-tag-arbetsblad': patternTrainSvContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainSvContent,
    // Swedish Pattern Worksheets - uses Swedish slug
    'monster-arbetsblad': patternWorksheetsSvContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetsSvContent,
    // Swedish Picture Path - uses Swedish slug
    'bildlabyrint-arbetsblad': picturePathSvContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathSvContent,
    // Swedish Picture Sort - uses Swedish slug
    'bildsortering-arbetsblad': pictureSortSvContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortSvContent,
    // Swedish Prepositions - uses Swedish slug
    'prepositioner-arbetsblad': prepositionsSvContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsSvContent,
    // Swedish Shadow Match - uses Swedish slug
    'skuggmatchning-arbetsblad': shadowMatchSvContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchSvContent,
    // Swedish Subtraction - uses Swedish slug
    'subtraktion-arbetsblad': subtractionSvContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionSvContent,
    // Swedish Treasure Hunt - uses Swedish slug
    'skattjakt-arbetsblad': treasureHuntSvContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntSvContent,
    // Swedish Word Guess - uses Swedish slug
    'gissa-ordet-arbetsblad': wordGuessSvContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessSvContent,
    // Swedish Writing - uses Swedish slug
    'skrivovningar-arbetsblad': writingSvContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingSvContent,
  },
  de: {
    // German Word Search - uses German SEO slug
    'suchsel-arbeitsblaetter': wordSearchDeContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchDeContent,
    // German Addition - uses German SEO slug
    'addition-arbeitsblaetter': additionDeContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionDeContent,
    // German Alphabet Train - uses German SEO slug
    'alphabet-zug-arbeitsblaetter': alphabetTrainDeContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainDeContent,
    // German Coloring - uses German SEO slug
    'malvorlagen-arbeitsblaetter': coloringDeContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringDeContent,
    // German Math Worksheets - uses German SEO slug
    'mathe-arbeitsblaetter': mathWorksheetsDeContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsDeContent,
    // German Word Scramble - uses German SEO slug
    'buchstabensalat-arbeitsblaetter': wordScrambleDeContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleDeContent,
    // German Find and Count - uses German SEO slug
    'suchen-und-zaehlen-arbeitsblaetter': findAndCountDeContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountDeContent,
    // German Matching - uses German SEO slug
    'zuordnungs-arbeitsblaetter': matchingDeContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingDeContent,
    // German Drawing Lines - uses German SEO slug
    'linien-ziehen-arbeitsblaetter': drawingLinesDeContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesDeContent,
    // German Picture Bingo - uses German SEO slug
    'bilder-bingo-arbeitsblaetter': pictureBingoDeContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoDeContent,
    // German Sudoku - uses German SEO slug
    'kinder-sudoku-arbeitsblaetter': sudokuDeContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuDeContent,
    // German Big Small - uses German SEO slug
    'gross-klein-arbeitsblaetter': bigSmallDeContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallDeContent,
    // German Chart Count - uses German SEO slug
    'bilddiagramm-arbeitsblaetter': chartCountDeContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountDeContent,
    // German Code Addition - uses German SEO slug
    'bilder-additions-arbeitsblaetter': codeAdditionDeContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionDeContent,
    // German Draw and Color - uses German SEO slug
    'rasterzeichnen-arbeitsblaetter': drawAndColorDeContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorDeContent,
    // German Find Objects - uses German SEO slug
    'suchbilder-arbeitsblaetter': findObjectsDeContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsDeContent,
    // German Grid Match - uses German SEO slug
    'raster-puzzle-arbeitsblaetter': gridMatchDeContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchDeContent,
    // German Crossword - uses German SEO slug
    'bilderkreuzwortraetsel-arbeitsblaetter': crosswordDeContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordDeContent,
    // German Cryptogram - uses German SEO slug
    'bildkryptogramm-arbeitsblaetter': cryptogramDeContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramDeContent,
    // German Math Puzzle - uses German SEO slug
    'mathe-raetsel-arbeitsblaetter': mathPuzzleDeContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleDeContent,
    // German Missing Pieces - uses German SEO slug
    'fehlende-puzzleteile-arbeitsblaetter': missingPiecesDeContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesDeContent,
    // German More-Less - uses German SEO slug
    'mehr-weniger-arbeitsblaetter': moreLessDeContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessDeContent,
    // German Odd One Out - uses German SEO slug
    'was-passt-nicht-arbeitsblaetter': oddOneOutDeContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutDeContent,
    // German Pattern Train - uses German SEO slug
    'muster-zug-arbeitsblaetter': patternTrainDeContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainDeContent,
    // German Pattern Worksheet - uses German SEO slug
    'muster-arbeitsblatt-arbeitsblaetter': patternWorksheetDeContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetDeContent,
    // German Picture Path - uses German SEO slug
    'bilderpfad-arbeitsblaetter': picturePathDeContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathDeContent,
    // German Picture Sort - uses German SEO slug
    'bilder-sortieren-arbeitsblaetter': pictureSortDeContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortDeContent,
    // German Prepositions - uses German SEO slug
    'praepositionen-arbeitsblaetter': prepositionsDeContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsDeContent,
    // German Shadow Match - uses German SEO slug
    'schattenbilder-zuordnen-arbeitsblaetter': shadowMatchDeContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchDeContent,
    // German Subtraction - uses German SEO slug
    'subtraktion-arbeitsblaetter': subtractionDeContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionDeContent,
    // German Treasure Hunt - uses German SEO slug
    'schatzsuche-arbeitsblaetter': treasureHuntDeContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntDeContent,
    // German Word Guess - uses German SEO slug
    'woerter-raten-arbeitsblaetter': wordGuessDeContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessDeContent,
    // German Writing - uses German SEO slug
    'schreibuebungen-arbeitsblaetter': writingDeContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingDeContent,
  },
  fr: {
    // French Word Search - uses French SEO slug
    'mots-caches-fiches': wordSearchFrContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchFrContent,
    // French Addition - uses French SEO slug
    'addition-fiches': additionFrContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionFrContent,
    // French Alphabet Train - uses French SEO slug
    'train-alphabet-fiches': alphabetTrainFrContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainFrContent,
    // French Coloring - uses French SEO slug
    'coloriage-fiches': coloringFrContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringFrContent,
    // French Math Puzzle - uses French SEO slug
    'puzzle-maths-fiches': mathPuzzleFrContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleFrContent,
    // French Math Worksheets - uses French SEO slug
    'exercices-maths-fiches': mathWorksheetsFrContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsFrContent,
    // French Word Scramble - uses French SEO slug
    'mots-melanges-fiches': wordScrambleFrContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleFrContent,
    // French Find and Count - uses French SEO slug
    'cherche-et-compte-fiches': findAndCountFrContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountFrContent,
    // French Matching - uses French SEO slug
    'association-fiches': matchingFrContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingFrContent,
    // French Drawing Lines - uses French SEO slug
    'graphisme-fiches': drawingLinesFrContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesFrContent,
    // French Picture Bingo - uses French SEO slug
    'bingo-images-fiches': pictureBingoFrContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoFrContent,
    // French Sudoku - uses French SEO slug
    'sudoku-enfants-fiches': sudokuFrContent,
    // French Big Small - uses French SEO slug
    'grand-petit-fiches': bigSmallFrContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallFrContent,
    // French Chart Count - uses French SEO slug
    'graphique-images-fiches': chartCountFrContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountFrContent,
    // French Code Addition - uses French SEO slug
    'addition-codee-fiches': codeAdditionFrContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionFrContent,
    // French Draw and Color - uses French SEO slug
    'dessin-quadrillage-fiches': drawAndColorFrContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorFrContent,
    // French Find Objects - uses French SEO slug
    'cherche-objets-fiches': findObjectsFrContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsFrContent,
    // French Grid Match - uses French SEO slug
    'puzzle-grille-fiches': gridMatchFrContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchFrContent,
    // French Crossword - uses French SEO slug
    'mots-croises-images-fiches': crosswordFrContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordFrContent,
    // French Cryptogram - uses French SEO slug
    'cryptogramme-images-fiches': cryptogramFrContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramFrContent,
    // French Missing Pieces - uses French SEO slug
    'pieces-manquantes-fiches': missingPiecesFrContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesFrContent,
    // French More Less - uses French SEO slug
    'comparaison-quantites-fiches': moreLessFrContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessFrContent,
    // French Odd One Out - uses French SEO slug
    'intrus-fiches': oddOneOutFrContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutFrContent,
  },
};

/**
 * Get content for a specific locale and slug
 */
export function getContentBySlug(locale: string, slug: string): ProductPageContent | undefined {
  return contentRegistry[locale]?.[slug];
}

/**
 * Get all available slugs for a locale
 */
export function getAvailableSlugs(locale: string): string[] {
  return Object.keys(contentRegistry[locale] || {});
}

/**
 * Get all locale/slug combinations for generateStaticParams
 */
export function getAllStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];

  for (const [locale, slugs] of Object.entries(contentRegistry)) {
    for (const slug of Object.keys(slugs)) {
      params.push({ locale, slug });
    }
  }

  return params;
}

/**
 * Get alternate URLs for hreflang tags
 * Returns all available language versions of the same app
 */
export function getAlternateLanguageUrls(
  appId: string,
  baseUrl: string = 'https://www.lessoncraftstudio.com'
): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const [locale, slugs] of Object.entries(contentRegistry)) {
    for (const [slug, content] of Object.entries(slugs)) {
      // Check if this content matches the appId
      if (content.seo?.appId === appId) {
        alternates[locale] = `${baseUrl}/${locale}/apps/${content.seo.slug}`;
        break; // Only one URL per locale
      }
    }
  }

  return alternates;
}

/**
 * Check if content has SEO section (new format)
 */
export function hasSeoSection(content: ProductPageContent): boolean {
  return !!content.seo?.slug;
}
