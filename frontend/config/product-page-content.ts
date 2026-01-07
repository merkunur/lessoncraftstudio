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
import patternTrainFrContent from '@/content/product-pages/fr/pattern-train-worksheets';
import patternWorksheetFrContent from '@/content/product-pages/fr/pattern-worksheet-worksheets';
import picturePathFrContent from '@/content/product-pages/fr/picture-path-worksheets';
import pictureSortFrContent from '@/content/product-pages/fr/picture-sort-worksheets';
import prepositionsFrContent from '@/content/product-pages/fr/prepositions-worksheets';
import shadowMatchFrContent from '@/content/product-pages/fr/shadow-match-worksheets';
import subtractionFrContent from '@/content/product-pages/fr/subtraction-worksheets';
import treasureHuntFrContent from '@/content/product-pages/fr/treasure-hunt-worksheets';
import wordGuessFrContent from '@/content/product-pages/fr/word-guess-worksheets';
import writingFrContent from '@/content/product-pages/fr/writing-worksheets';

// Spanish content imports
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
import subtractionEsContent from '@/content/product-pages/es/resta-fichas';
import treasureHuntEsContent from '@/content/product-pages/es/busqueda-tesoro-fichas';
import wordGuessEsContent from '@/content/product-pages/es/adivinar-palabras-fichas';
import writingEsContent from '@/content/product-pages/es/lectoescritura-fichas';

// Italian content imports
import wordSearchItContent from '@/content/product-pages/it/cerca-parole-schede';
import additionItContent from '@/content/product-pages/it/addizione-schede';
import alphabetTrainItContent from '@/content/product-pages/it/treno-alfabeto-schede';
import coloringItContent from '@/content/product-pages/it/disegni-da-colorare';
import mathWorksheetsItContent from '@/content/product-pages/it/math-worksheets';
import wordScrambleItContent from '@/content/product-pages/it/anagrammi-schede';
import findAndCountItContent from '@/content/product-pages/it/trova-e-conta-schede';
import matchingItContent from '@/content/product-pages/it/abbinamenti-schede';
import drawingLinesItContent from '@/content/product-pages/it/pregrafismo-schede';
import pictureBingoItContent from '@/content/product-pages/it/bingo-immagini-schede';
import sudokuItContent from '@/content/product-pages/it/sudoku-bambini-schede';
import bigSmallItContent from '@/content/product-pages/it/grande-piccolo-schede';
import chartCountItContent from '@/content/product-pages/it/grafici-immagini-schede';
import codeAdditionItContent from '@/content/product-pages/it/addizioni-immagini-schede';
import drawAndColorItContent from '@/content/product-pages/it/disegno-griglia-schede';
import findObjectsItContent from '@/content/product-pages/it/trova-oggetti-schede';
import gridMatchItContent from '@/content/product-pages/it/griglia-abbinamento-schede';
import crosswordItContent from '@/content/product-pages/it/cruciverba-immagini-schede';
import cryptogramItContent from '@/content/product-pages/it/crittogramma-schede';
import mathPuzzleItContent from '@/content/product-pages/it/puzzle-matematici-schede';
import missingPiecesItContent from '@/content/product-pages/it/pezzi-mancanti-schede';
import moreLessItContent from '@/content/product-pages/it/confronto-numeri-schede';
import oddOneOutItContent from '@/content/product-pages/it/trova-intruso-schede';
import patternTrainItContent from '@/content/product-pages/it/treno-sequenze-schede';
import patternWorksheetsItContent from '@/content/product-pages/it/schede-pattern';
import picturePathItContent from '@/content/product-pages/it/percorso-illustrato-schede';
import pictureSortItContent from '@/content/product-pages/it/classificazione-immagini-schede';
import prepositionsItContent from '@/content/product-pages/it/preposizioni-schede';
import shadowMatchItContent from '@/content/product-pages/it/abbinamento-ombre-schede';
import subtractionItContent from '@/content/product-pages/it/sottrazione-schede';
import treasureHuntItContent from '@/content/product-pages/it/caccia-tesoro-schede';
import wordGuessItContent from '@/content/product-pages/it/indovina-parole-schede';
import writingItContent from '@/content/product-pages/it/scrittura-schede';

// Portuguese (Brazilian) content imports
import wordSearchPtContent from '@/content/product-pages/pt/caca-palavras-fichas';
import additionPtContent from '@/content/product-pages/pt/adicao-fichas';
import alphabetTrainPtContent from '@/content/product-pages/pt/trem-alfabeto-fichas';
import coloringPtContent from '@/content/product-pages/pt/desenhos-colorir-fichas';
import mathWorksheetsPtContent from '@/content/product-pages/pt/atividades-matematica-fichas';
import wordScramblePtContent from '@/content/product-pages/pt/palavras-embaralhadas-fichas';
import findAndCountPtContent from '@/content/product-pages/pt/encontre-conte-fichas';
import matchingPtContent from '@/content/product-pages/pt/ligar-fichas';
import drawingLinesPtContent from '@/content/product-pages/pt/tracar-linhas-fichas';
import bingoPtContent from '@/content/product-pages/pt/bingo-ilustrado-fichas';
import sudokuPtContent from '@/content/product-pages/pt/sudoku-criancas-fichas';
import bigSmallPtContent from '@/content/product-pages/pt/grande-pequeno-fichas';
import chartCountPtContent from '@/content/product-pages/pt/grafico-pictorico-fichas';
import codeAdditionPtContent from '@/content/product-pages/pt/adicao-codigo-fichas';
import drawAndColorPtContent from '@/content/product-pages/pt/desenho-grade-fichas';
import findObjectsPtContent from '@/content/product-pages/pt/encontrar-objetos-fichas';
import gridMatchPtContent from '@/content/product-pages/pt/quebra-cabeca-grade-fichas';

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
    // French Pattern Train - uses French SEO slug
    'train-suites-logiques-fiches': patternTrainFrContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainFrContent,
    // French Pattern Worksheet - uses French SEO slug
    'sequences-logiques-fiches': patternWorksheetFrContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetFrContent,
    // French Picture Path - uses French SEO slug
    'parcours-images-fiches': picturePathFrContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathFrContent,
    // French Picture Sort - uses French SEO slug
    'tri-images-fiches': pictureSortFrContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortFrContent,
    // French Prepositions - uses French SEO slug
    'prepositions-exercices-fiches': prepositionsFrContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsFrContent,
    // French Shadow Match - uses French SEO slug
    'discrimination-visuelle-fiches': shadowMatchFrContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchFrContent,
    // French Subtraction - uses French SEO slug
    'soustraction-fiches': subtractionFrContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionFrContent,
    // French Treasure Hunt - uses French SEO slug
    'chasse-au-tresor-fiches': treasureHuntFrContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntFrContent,
    // French Word Guess - uses French SEO slug
    'deviner-mots-fiches': wordGuessFrContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessFrContent,
    // French Writing - uses French SEO slug
    'ecriture-fiches': writingFrContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingFrContent,
  },
  es: {
    // Spanish Word Search - uses Spanish SEO slug
    'sopa-letras-fichas': wordSearchEsContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchEsContent,
    // Spanish Addition - uses Spanish SEO slug
    'suma-fichas': additionEsContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionEsContent,
    // Spanish Alphabet Train - uses Spanish SEO slug
    'tren-alfabeto-fichas': alphabetTrainEsContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainEsContent,
    // Spanish Coloring - uses Spanish SEO slug
    'dibujos-colorear-fichas': coloringEsContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringEsContent,
    // Spanish Math Worksheets - uses Spanish SEO slug
    'acertijos-matematicos-fichas': mathWorksheetsEsContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsEsContent,
    // Spanish Word Scramble - uses Spanish SEO slug
    'letras-revueltas-fichas': wordScrambleEsContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleEsContent,
    // Spanish Find and Count - uses Spanish SEO slug
    'buscar-contar-fichas': findAndCountEsContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountEsContent,
    // Spanish Matching - uses Spanish SEO slug
    'relacionar-fichas': matchingEsContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingEsContent,
    // Spanish Drawing Lines - uses Spanish SEO slug
    'grafomotricidad-fichas': drawingLinesEsContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesEsContent,
    // Spanish Picture Bingo - uses Spanish SEO slug
    'bingo-fichas': bingoEsContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': bingoEsContent,
    // Spanish Sudoku - uses Spanish SEO slug
    'sudoku-fichas-ninos': sudokuEsContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuEsContent,
    // Spanish Big Small - uses Spanish SEO slug
    'grande-pequeno-fichas': bigSmallEsContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallEsContent,
    // Spanish Chart Count (Gráficos de Conteo) - uses Spanish SEO slug
    'graficos-conteo-fichas': graficosConteoEsContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': graficosConteoEsContent,
    // Spanish Code Addition (Suma con Código) - uses Spanish SEO slug
    'suma-codigo-fichas': sumaCodigoEsContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': sumaCodigoEsContent,
    // Spanish Draw and Color (Dibujo en Cuadrícula) - uses Spanish SEO slug
    'dibujo-cuadricula-fichas': dibujoCuadriculaEsContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': dibujoCuadriculaEsContent,
    // Spanish Find Objects (Buscar Objetos) - uses Spanish SEO slug
    'buscar-objetos-fichas': findObjectsEsContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsEsContent,
    // Spanish Grid Match (Rompecabezas de Cuadrícula) - uses Spanish SEO slug
    'rompecabezas-cuadricula-fichas': gridMatchEsContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchEsContent,
    // Spanish Crossword (Crucigramas con Imágenes) - uses Spanish SEO slug
    'crucigramas-imagenes-fichas': crosswordEsContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordEsContent,
    // Spanish Cryptogram (Criptogramas de Imágenes) - uses Spanish SEO slug
    'criptogramas-imagenes-fichas': cryptogramEsContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramEsContent,
    // Spanish Math Puzzle (Rompecabezas Matemáticos) - uses Spanish SEO slug
    'rompecabezas-matematicos-fichas': mathPuzzleEsContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleEsContent,
    // Spanish Missing Pieces (Piezas Faltantes) - uses Spanish SEO slug
    'piezas-faltantes-fichas': missingPiecesEsContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesEsContent,
    // Spanish Picture Path (Laberintos de Imágenes) - uses Spanish SEO slug
    'laberintos-imagenes-fichas': picturePathEsContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathEsContent,
    // Spanish More Less (Mayor Menor) - uses Spanish SEO slug
    'mayor-menor-fichas': moreLessEsContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessEsContent,
    // Spanish Odd One Out (Encuentra el Diferente) - uses Spanish SEO slug
    'encuentra-el-diferente-fichas': oddOneOutEsContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutEsContent,
    // Spanish Pattern Train (Tren de Patrones) - uses Spanish SEO slug
    'tren-patrones-fichas': patternTrainEsContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainEsContent,
    // Spanish Pattern Worksheet (Fichas de Patrones) - uses Spanish SEO slug
    'fichas-patrones': patternWorksheetEsContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetEsContent,
    // Spanish Picture Sort (Clasificar Imágenes) - uses Spanish SEO slug
    'clasificar-imagenes-fichas': pictureSortEsContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortEsContent,
    // Spanish Prepositions (Preposiciones) - uses Spanish SEO slug
    'preposiciones-fichas': prepositionsEsContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsEsContent,
    // Spanish Shadow Match (Asociación de Sombras) - uses Spanish SEO slug
    'asociacion-sombras-fichas': shadowMatchEsContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchEsContent,
    // Spanish Subtraction (Restas) - uses Spanish SEO slug
    'resta-fichas': subtractionEsContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionEsContent,
    // Spanish Treasure Hunt (Búsqueda del Tesoro) - uses Spanish SEO slug
    'busqueda-tesoro-fichas': treasureHuntEsContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntEsContent,
    // Spanish Word Guess (Adivina la Palabra) - uses Spanish SEO slug
    'adivinar-palabras-fichas': wordGuessEsContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessEsContent,
    // Spanish Writing - uses Spanish SEO slug
    'lectoescritura-fichas': writingEsContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingEsContent,
  },
  it: {
    // Italian Word Search (Crucipuzzle) - uses Italian SEO slug
    'cerca-parole-schede': wordSearchItContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchItContent,
    // Italian Addition - uses Italian SEO slug
    'addizione-schede': additionItContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionItContent,
    // Italian Alphabet Train - uses Italian SEO slug
    'treno-alfabeto-schede': alphabetTrainItContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainItContent,
    // Italian Coloring Pages - uses Italian SEO slug
    'disegni-da-colorare': coloringItContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringItContent,
    // Italian Math Worksheets - uses Italian SEO slug
    'matematica-schede': mathWorksheetsItContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsItContent,
    // Italian Word Scramble (Anagrammi) - uses Italian SEO slug
    'anagrammi-schede': wordScrambleItContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleItContent,
    // Italian Find and Count (Trova e Conta) - uses Italian SEO slug
    'trova-e-conta-schede': findAndCountItContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountItContent,
    // Italian Matching (Abbinamenti) - uses Italian SEO slug
    'abbinamenti-schede': matchingItContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingItContent,
    // Italian Drawing Lines (Pregrafismo) - uses Italian SEO slug
    'pregrafismo-schede': drawingLinesItContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesItContent,
    // Italian Picture Bingo (Bingo Immagini) - uses Italian SEO slug
    'bingo-immagini-schede': pictureBingoItContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoItContent,
    // Italian Sudoku (Sudoku per Bambini) - uses Italian SEO slug
    'sudoku-bambini-schede': sudokuItContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuItContent,
    // Italian Big Small (Grande Piccolo) - uses Italian SEO slug
    'grande-piccolo-schede': bigSmallItContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallItContent,
    // Italian Chart Count (Grafici con Immagini) - uses Italian SEO slug
    'grafici-immagini-schede': chartCountItContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountItContent,
    // Italian Code Addition (Addizioni con Immagini) - uses Italian SEO slug
    'addizioni-immagini-schede': codeAdditionItContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionItContent,
    // Italian Draw and Color (Disegno con Griglia) - uses Italian SEO slug
    'disegno-griglia-schede': drawAndColorItContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorItContent,
    // Italian Find Objects (Trova gli Oggetti) - uses Italian SEO slug
    'trova-oggetti-schede': findObjectsItContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsItContent,
    // Italian Grid Match (Griglia Abbinamento) - uses Italian SEO slug
    'griglia-abbinamento-schede': gridMatchItContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchItContent,
    // Italian Crossword (Cruciverba con Immagini) - uses Italian SEO slug
    'cruciverba-immagini-schede': crosswordItContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordItContent,
    // Italian Cryptogram (Crittogramma con Immagini) - uses Italian SEO slug
    'crittogramma-schede': cryptogramItContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramItContent,
    // Italian Math Puzzle (Puzzle Matematici) - uses Italian SEO slug
    'puzzle-matematici-schede': mathPuzzleItContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleItContent,
    // Italian Missing Pieces (Pezzi Mancanti) - uses Italian SEO slug
    'pezzi-mancanti-schede': missingPiecesItContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesItContent,
    // Italian More Less (Confronto Numeri / Maggiore Minore) - uses Italian SEO slug
    'confronto-numeri-schede': moreLessItContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessItContent,
    // Italian Odd One Out (Trova l'Intruso) - uses Italian SEO slug
    'trova-intruso-schede': oddOneOutItContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutItContent,
    // Italian Pattern Train (Treno delle Sequenze) - uses Italian SEO slug
    'treno-sequenze-schede': patternTrainItContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainItContent,
    // Italian Pattern Worksheets (Schede sui Pattern) - uses Italian SEO slug
    'schede-pattern': patternWorksheetsItContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetsItContent,
    // Italian Picture Path (Percorso Illustrato / Labirinti) - uses Italian SEO slug
    'percorso-illustrato-schede': picturePathItContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathItContent,
    // Italian Picture Sort (Classificazione Immagini) - uses Italian SEO slug
    'classificazione-immagini-schede': pictureSortItContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortItContent,
    // Italian Prepositions (Preposizioni) - uses Italian SEO slug
    'preposizioni-schede': prepositionsItContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsItContent,
    // Italian Shadow Match (Abbinamento Ombre) - uses Italian SEO slug
    'abbinamento-ombre-schede': shadowMatchItContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchItContent,
    // Italian Subtraction (Sottrazione) - uses Italian SEO slug
    'sottrazione-schede': subtractionItContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionItContent,
    // Italian Treasure Hunt (Caccia al Tesoro) - uses Italian SEO slug
    'caccia-tesoro-schede': treasureHuntItContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntItContent,
    // Italian Word Guess (Indovina la Parola) - uses Italian SEO slug
    'indovina-parole-schede': wordGuessItContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessItContent,
    // Italian Writing (Scrittura e Pregrafismo) - uses Italian SEO slug
    'scrittura-schede': writingItContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingItContent,
  },
  pt: {
    // Portuguese (Brazilian) Word Search (Caça-Palavras) - uses Portuguese SEO slug
    'caca-palavras-fichas': wordSearchPtContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchPtContent,
    // Portuguese (Brazilian) Addition (Adição) - uses Portuguese SEO slug
    'adicao-fichas': additionPtContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionPtContent,
    // Portuguese (Brazilian) Alphabet Train (Trenzinho do Alfabeto) - uses Portuguese SEO slug
    'trem-alfabeto-fichas': alphabetTrainPtContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainPtContent,
    // Portuguese (Brazilian) Coloring (Desenhos para Colorir) - uses Portuguese SEO slug
    'desenhos-colorir-fichas': coloringPtContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringPtContent,
    // Portuguese (Brazilian) Math Worksheets (Atividades de Matemática) - uses Portuguese SEO slug
    'atividades-matematica-fichas': mathWorksheetsPtContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsPtContent,
    // Portuguese (Brazilian) Word Scramble (Palavras Embaralhadas) - uses Portuguese SEO slug
    'palavras-embaralhadas-fichas': wordScramblePtContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScramblePtContent,
    // Portuguese (Brazilian) Find and Count (Encontre e Conte) - uses Portuguese SEO slug
    'encontre-conte-fichas': findAndCountPtContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountPtContent,
    // Portuguese (Brazilian) Matching (Atividades de Ligar) - uses Portuguese SEO slug
    'ligar-fichas': matchingPtContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingPtContent,
    // Portuguese (Brazilian) Drawing Lines (Traçar Linhas) - uses Portuguese SEO slug
    'tracar-linhas-fichas': drawingLinesPtContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesPtContent,
    // Portuguese (Brazilian) Picture Bingo (Bingo Ilustrado) - uses Portuguese SEO slug
    'bingo-ilustrado-fichas': bingoPtContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': bingoPtContent,
    // Portuguese (Brazilian) Sudoku (Sudoku para Crianças) - uses Portuguese SEO slug
    'sudoku-criancas-fichas': sudokuPtContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuPtContent,
    // Portuguese (Brazilian) Big Small (Grande e Pequeno) - uses Portuguese SEO slug
    'grande-pequeno-fichas': bigSmallPtContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallPtContent,
    // Portuguese (Brazilian) Chart Count (Gráfico Pictórico) - uses Portuguese SEO slug
    'grafico-pictorico-fichas': chartCountPtContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountPtContent,
    // Portuguese (Brazilian) Code Addition (Código de Adição) - uses Portuguese SEO slug
    'adicao-codigo-fichas': codeAdditionPtContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionPtContent,
    // Portuguese (Brazilian) Draw and Color (Desenho em Grade) - uses Portuguese SEO slug
    'desenho-grade-fichas': drawAndColorPtContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorPtContent,
    // Portuguese (Brazilian) Find Objects (Encontrar Objetos) - uses Portuguese SEO slug
    'encontrar-objetos-fichas': findObjectsPtContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsPtContent,
    // Portuguese (Brazilian) Grid Match (Quebra-Cabeça Grid Match) - uses Portuguese SEO slug
    'quebra-cabeca-grade-fichas': gridMatchPtContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchPtContent,
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
