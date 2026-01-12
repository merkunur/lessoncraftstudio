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

// Finnish content imports
import wordSearchFiContent from '@/content/product-pages/fi/word-search-worksheets';
import additionFiContent from '@/content/product-pages/fi/yhteenlasku-tyoarkit';
import alphabetTrainFiContent from '@/content/product-pages/fi/aakkosjuna-tyoarkit';
import coloringFiContent from '@/content/product-pages/fi/varityskuvat-tyoarkit';
import mathWorksheetsFiContent from '@/content/product-pages/fi/matematiikka-tyoarkit';
import wordScrambleFiContent from '@/content/product-pages/fi/sanansekoitus-tyoarkit';
import findAndCountFiContent from '@/content/product-pages/fi/etsi-ja-laske-tyoarkit';
import matchingFiContent from '@/content/product-pages/fi/yhdista-parit-tyoarkit';
import drawingLinesFiContent from '@/content/product-pages/fi/viivojen-piirtaminen-tyoarkit';
import pictureBingoFiContent from '@/content/product-pages/fi/kuva-bingo-tyoarkit';
import sudokuFiContent from '@/content/product-pages/fi/sudoku-tyoarkit';
import bigSmallFiContent from '@/content/product-pages/fi/iso-pieni-tyoarkit';
import chartCountFiContent from '@/content/product-pages/fi/kuvakaavio-tyoarkit';
import codeAdditionFiContent from '@/content/product-pages/fi/kuva-yhteenlasku-tyoarkit';
import drawAndColorFiContent from '@/content/product-pages/fi/ruudukkopiirustus-tyoarkit';
import findObjectsFiContent from '@/content/product-pages/fi/etsi-esineet-tyoarkit';
import gridMatchFiContent from '@/content/product-pages/fi/ruudukko-sovitus-tyoarkit';
import crosswordFiContent from '@/content/product-pages/fi/ristisanatehtavat-tyoarkit';
import cryptogramFiContent from '@/content/product-pages/fi/kuvakryptogrammi-tyoarkit';
import mathPuzzleFiContent from '@/content/product-pages/fi/matematiikkapulmat-tyoarkit';
import missingPiecesFiContent from '@/content/product-pages/fi/puuttuvat-palat-tyoarkit';
import moreLessFiContent from '@/content/product-pages/fi/enemman-vahemman-tyoarkit';
import oddOneOutFiContent from '@/content/product-pages/fi/poikkea-joukosta-tyoarkit';
import patternTrainFiContent from '@/content/product-pages/fi/kuviojuna-tyoarkit';
import patternWorksheetFiContent from '@/content/product-pages/fi/kuviotehtava-tyoarkit';
import picturePathFiContent from '@/content/product-pages/fi/kuvapolku-tyoarkit';
import pictureSortFiContent from '@/content/product-pages/fi/kuvalajittelu-tyoarkit';
import prepositionsFiContent from '@/content/product-pages/fi/prepositio-tyoarkit';
import shadowMatchFiContent from '@/content/product-pages/fi/varjoyhdistely-tyoarkit';
import subtractionFiContent from '@/content/product-pages/fi/vahennyslasku-tyoarkit';
import treasureHuntFiContent from '@/content/product-pages/fi/aarteenetsinta-tyoarkit';

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
import crosswordPtContent from '@/content/product-pages/pt/palavras-cruzadas-imagens-fichas';
import cryptogramPtContent from '@/content/product-pages/pt/criptograma-imagens-fichas';
import mathPuzzlePtContent from '@/content/product-pages/pt/quebra-cabeca-matematica-fichas';
import missingPiecesPtContent from '@/content/product-pages/pt/pecas-faltantes-fichas';
import moreLessPtContent from '@/content/product-pages/pt/maior-menor-fichas';
import oddOneOutPtContent from '@/content/product-pages/pt/encontre-diferente-fichas';
import patternTrainPtContent from '@/content/product-pages/pt/trem-padroes-fichas';
import patternWorksheetPtContent from '@/content/product-pages/pt/fichas-padroes-sequencias';
import picturePathPtContent from '@/content/product-pages/pt/labirinto-caminhos-fichas';
import pictureSortPtContent from '@/content/product-pages/pt/classificacao-imagens-fichas';
import prepositionsPtContent from '@/content/product-pages/pt/preposicoes-fichas';
import shadowMatchPtContent from '@/content/product-pages/pt/combinar-sombras-fichas';
import subtractionPtContent from '@/content/product-pages/pt/subtracao-fichas';
import treasureHuntPtContent from '@/content/product-pages/pt/caca-ao-tesouro-fichas';
import wordGuessPtContent from '@/content/product-pages/pt/adivinhar-palavras-fichas';
import writingPtContent from '@/content/product-pages/pt/caligrafia-fichas';

// Dutch content imports
import wordSearchNlContent from '@/content/product-pages/nl/word-search-worksheets';
import additionNlContent from '@/content/product-pages/nl/optellen-werkbladen';
import coloringNlContent from '@/content/product-pages/nl/kleurplaten-werkbladen';
import alphabetTrainNlContent from '@/content/product-pages/nl/alphabet-train-worksheets';
import mathWorksheetsNlContent from '@/content/product-pages/nl/rekenen-werkbladen';
import wordScrambleNlContent from '@/content/product-pages/nl/woordkruisel-werkbladen';
import findAndCountNlContent from '@/content/product-pages/nl/zoek-en-tel-werkbladen';
import matchingNlContent from '@/content/product-pages/nl/verbindings-werkbladen';
import drawingLinesNlContent from '@/content/product-pages/nl/lijnen-trekken-werkbladen';
import pictureBingoNlContent from '@/content/product-pages/nl/plaatjes-bingo-werkbladen';
import sudokuNlContent from '@/content/product-pages/nl/sudoku-werkbladen';
import bigSmallNlContent from '@/content/product-pages/nl/groot-klein-werkbladen';
import chartCountNlContent from '@/content/product-pages/nl/telgrafieken-werkbladen';
import codeAdditionNlContent from '@/content/product-pages/nl/visuele-optelsommen-werkbladen';
import drawAndColorNlContent from '@/content/product-pages/nl/rastertekenen-werkbladen';
import findObjectsNlContent from '@/content/product-pages/nl/zoek-voorwerpen-werkbladen';
import gridMatchNlContent from '@/content/product-pages/nl/raster-puzzel-werkbladen';
import crosswordNlContent from '@/content/product-pages/nl/kruiswoordpuzzel-werkbladen';
import cryptogramNlContent from '@/content/product-pages/nl/cryptogram-werkbladen';
import mathPuzzleNlContent from '@/content/product-pages/nl/rekenpuzzels-werkbladen';
import missingPiecesNlContent from '@/content/product-pages/nl/ontbrekende-puzzelstukjes-werkbladen';
import moreLessNlContent from '@/content/product-pages/nl/meer-minder-werkbladen';
import oddOneOutNlContent from '@/content/product-pages/nl/welke-hoort-niet-bij-werkbladen';
import patternTrainNlContent from '@/content/product-pages/nl/patroontrein-werkbladen';
import patternWorksheetsNlContent from '@/content/product-pages/nl/patronen-werkbladen';
import picturePathNlContent from '@/content/product-pages/nl/doolhof-werkbladen';
import pictureSortNlContent from '@/content/product-pages/nl/sorteer-werkbladen';
import prepositionsNlContent from '@/content/product-pages/nl/voorzetsels-werkbladen';
import shadowMatchNlContent from '@/content/product-pages/nl/schaduw-matching-werkbladen';
import subtractionNlContent from '@/content/product-pages/nl/aftrekken-werkbladen';
import treasureHuntNlContent from '@/content/product-pages/nl/schattenjacht-werkbladen';
import wordGuessNlContent from '@/content/product-pages/nl/woordraadsel-werkbladen';
import writingNlContent from '@/content/product-pages/nl/schrijfoefeningen-werkbladen';

// Danish content imports
import wordSearchDaContent from '@/content/product-pages/da/ordsoegning-arbejdsark';
import additionDaContent from '@/content/product-pages/da/addition-arbejdsark';
import alphabetTrainDaContent from '@/content/product-pages/da/alfabet-tog-arbejdsark';
import coloringDaContent from '@/content/product-pages/da/malebog-arbejdsark';
import mathWorksheetDaContent from '@/content/product-pages/da/matematikopgaver-arbejdsark';
import wordScrambleDaContent from '@/content/product-pages/da/bogstavblanding-arbejdsark';
import findAndCountDaContent from '@/content/product-pages/da/find-og-tael-arbejdsark';
import matchingDaContent from '@/content/product-pages/da/matchning-arbejdsark';
import drawingLinesDaContent from '@/content/product-pages/da/linjetraening-arbejdsark';
import bingoDaContent from '@/content/product-pages/da/bingo-arbejdsark';
import sudokuDaContent from '@/content/product-pages/da/sudoku-arbejdsark';
import bigSmallDaContent from '@/content/product-pages/da/stor-lille-arbejdsark';
import chartCountDaContent from '@/content/product-pages/da/billediagram-arbejdsark';
import codeAdditionDaContent from '@/content/product-pages/da/kode-plusstykker-arbejdsark';
import drawAndColorDaContent from '@/content/product-pages/da/tegn-og-farvelaeg-arbejdsark';
import findObjectsDaContent from '@/content/product-pages/da/find-objekterne-arbejdsark';
import gridMatchDaContent from '@/content/product-pages/da/raster-puslespil-arbejdsark';
import crosswordDaContent from '@/content/product-pages/da/krydsord-arbejdsark';
import cryptogramDaContent from '@/content/product-pages/da/kryptogram-arbejdsark';
import mathPuzzleDaContent from '@/content/product-pages/da/matteleger-arbejdsark';
import missingPiecesDaContent from '@/content/product-pages/da/manglende-brikker-arbejdsark';
import moreLessDaContent from '@/content/product-pages/da/sammenligningsopgaver-arbejdsark';
import oddOneOutDaContent from '@/content/product-pages/da/find-den-ulige-arbejdsark';
import patternTrainDaContent from '@/content/product-pages/da/moenstertog-arbejdsark';
import patternWorksheetDaContent from '@/content/product-pages/da/moenstre-arbejdsark';
import picturePathDaContent from '@/content/product-pages/da/billedsti-arbejdsark';
import pictureSortDaContent from '@/content/product-pages/da/billedsortering-arbejdsark';
import prepositionsDaContent from '@/content/product-pages/da/praepositioner-arbejdsark';
import shadowMatchDaContent from '@/content/product-pages/da/skygge-match-arbejdsark';
import subtractionDaContent from '@/content/product-pages/da/subtraktion-arbejdsark';
import treasureHuntDaContent from '@/content/product-pages/da/skattejagt-arbejdsark';
import wordGuessDaContent from '@/content/product-pages/da/gaet-ordet-arbejdsark';
import writingDaContent from '@/content/product-pages/da/skriveopgaver-arbejdsark';

// Norwegian content imports
import wordSearchNoContent from '@/content/product-pages/no/ordsoek-arbeidsark';
import additionNoContent from '@/content/product-pages/no/addisjon-arbeidsark';
import alphabetTrainNoContent from '@/content/product-pages/no/alfabet-tog-arbeidsark';
import coloringNoContent from '@/content/product-pages/no/fargeleggingsbilder-arbeidsark';
import mathWorksheetsNoContent from '@/content/product-pages/no/matematikk-oppgaver-arbeidsark';
import wordScrambleNoContent from '@/content/product-pages/no/bokstavoppgaver-arbeidsark';
import findAndCountNoContent from '@/content/product-pages/no/finn-og-tell-arbeidsark';
import matchingNoContent from '@/content/product-pages/no/kobling-arbeidsark';
import drawingLinesNoContent from '@/content/product-pages/no/tegning-av-linjer-arbeidsark';
import pictureBingoNoContent from '@/content/product-pages/no/bildlotto-arbeidsark';
import sudokuNoContent from '@/content/product-pages/no/sudoku-arbeidsark';
import bigSmallNoContent from '@/content/product-pages/no/stor-og-liten-arbeidsark';
import chartCountNoContent from '@/content/product-pages/no/bildediagram-arbeidsark';
import codeAdditionNoContent from '@/content/product-pages/no/bildeaddisjon-arbeidsark';
import drawAndColorNoContent from '@/content/product-pages/no/rutenetttegning-arbeidsark';
import findObjectsNoContent from '@/content/product-pages/no/finn-objektene-arbeidsark';
import gridMatchNoContent from '@/content/product-pages/no/rutenett-tilpasning-arbeidsark';
import crosswordNoContent from '@/content/product-pages/no/bildekryssord-arbeidsark';
import cryptogramNoContent from '@/content/product-pages/no/kryptogram-arbeidsark';
import mathPuzzleNoContent from '@/content/product-pages/no/matematikkgater-arbeidsark';
import missingPiecesNoContent from '@/content/product-pages/no/manglende-biter-arbeidsark';
import moreLessNoContent from '@/content/product-pages/no/sammenligningsoppgaver-arbeidsark';
import oddOneOutNoContent from '@/content/product-pages/no/finn-den-ulike-arbeidsark';
import patternTrainNoContent from '@/content/product-pages/no/monstertog-arbeidsark';
import patternWorksheetNoContent from '@/content/product-pages/no/monsteroppgaver-arbeidsark';
import picturePathNoContent from '@/content/product-pages/no/bildesti-arbeidsark';
import pictureSortNoContent from '@/content/product-pages/no/bildesortering-arbeidsark';
import prepositionsNoContent from '@/content/product-pages/no/preposisjoner-arbeidsark';
import shadowMatchNoContent from '@/content/product-pages/no/skyggematching-arbeidsark';
import subtractionNoContent from '@/content/product-pages/no/subtraksjon-arbeidsark';
import treasureHuntNoContent from '@/content/product-pages/no/skattejakt-arbeidsark';
import wordGuessNoContent from '@/content/product-pages/no/gjetteoppgaver-arbeidsark';
import writingNoContent from '@/content/product-pages/no/skriveark-arbeidsark';

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
    // Portuguese (Brazilian) Crossword (Palavras Cruzadas) - uses Portuguese SEO slug
    'palavras-cruzadas-imagens-fichas': crosswordPtContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordPtContent,
    // Portuguese (Brazilian) Cryptogram (Criptograma) - uses Portuguese SEO slug
    'criptograma-imagens-fichas': cryptogramPtContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramPtContent,
    // Portuguese (Brazilian) Math Puzzle (Quebra-Cabeça de Matemática) - uses Portuguese SEO slug
    'quebra-cabeca-matematica-fichas': mathPuzzlePtContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzlePtContent,
    // Portuguese (Brazilian) Missing Pieces (Peças Faltantes) - uses Portuguese SEO slug
    'pecas-faltantes-fichas': missingPiecesPtContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesPtContent,
    // Portuguese (Brazilian) More Less (Maior e Menor) - uses Portuguese SEO slug
    'maior-menor-fichas': moreLessPtContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessPtContent,
    // Portuguese (Brazilian) Odd One Out (Qual É o Diferente) - uses Portuguese SEO slug
    'encontre-diferente-fichas': oddOneOutPtContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutPtContent,
    // Portuguese (Brazilian) Pattern Train (Trenzinho de Padrões) - uses Portuguese SEO slug
    'trem-padroes-fichas': patternTrainPtContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainPtContent,
    // Portuguese (Brazilian) Pattern Worksheet (Fichas de Padrões e Sequências) - uses Portuguese SEO slug
    'fichas-padroes-sequencias': patternWorksheetPtContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetPtContent,
    // Portuguese (Brazilian) Picture Path (Labirintos e Caminhos) - uses Portuguese SEO slug
    'labirinto-caminhos-fichas': picturePathPtContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathPtContent,
    // Portuguese (Brazilian) Picture Sort (Classificação de Imagens) - uses Portuguese SEO slug
    'classificacao-imagens-fichas': pictureSortPtContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortPtContent,
    // Portuguese (Brazilian) Prepositions (Preposições) - uses Portuguese SEO slug
    'preposicoes-fichas': prepositionsPtContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsPtContent,
    // Portuguese (Brazilian) Shadow Match (Combinar Sombras) - uses Portuguese SEO slug
    'combinar-sombras-fichas': shadowMatchPtContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchPtContent,
    // Portuguese (Brazilian) Subtraction (Subtração) - uses Portuguese SEO slug
    'subtracao-fichas': subtractionPtContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionPtContent,
    // Portuguese (Brazilian) Treasure Hunt (Caça ao Tesouro) - uses Portuguese SEO slug
    'caca-ao-tesouro-fichas': treasureHuntPtContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntPtContent,
    // Portuguese (Brazilian) Word Guess (Adivinhar Palavras) - uses Portuguese SEO slug
    'adivinhar-palavras-fichas': wordGuessPtContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessPtContent,
    // Portuguese (Brazilian) Writing (Caligrafia) - uses Portuguese SEO slug
    'caligrafia-fichas': writingPtContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingPtContent,
  },
  nl: {
    // Dutch Word Search (Woordzoeker) - uses Dutch SEO slug
    'woordzoeker-werkbladen': wordSearchNlContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchNlContent,
    // Dutch Addition (Optellen) - uses Dutch SEO slug
    'optellen-werkbladen': additionNlContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionNlContent,
    // Dutch Alphabet Train (Alfabet Trein) - uses Dutch SEO slug
    'alfabet-trein-werkbladen': alphabetTrainNlContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainNlContent,
    // Dutch Coloring (Kleurplaten) - uses Dutch SEO slug
    'kleurplaten-werkbladen': coloringNlContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringNlContent,
    // Dutch Math Worksheets (Rekenen Werkbladen) - uses Dutch SEO slug
    'rekenen-werkbladen': mathWorksheetsNlContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsNlContent,
    // Dutch Word Scramble (Woordkruisel) - uses Dutch SEO slug
    'woordkruisel-werkbladen': wordScrambleNlContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleNlContent,
    // Dutch Find and Count (Zoek en Tel) - uses Dutch SEO slug
    'zoek-en-tel-werkbladen': findAndCountNlContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountNlContent,
    // Dutch Matching (Verbindings) - uses Dutch SEO slug
    'verbindings-werkbladen': matchingNlContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingNlContent,
    // Dutch Drawing Lines (Lijnen Trekken) - uses Dutch SEO slug
    'lijnen-trekken-werkbladen': drawingLinesNlContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesNlContent,
    // Dutch Picture Bingo (Plaatjes Bingo) - uses Dutch SEO slug
    'plaatjes-bingo-werkbladen': pictureBingoNlContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoNlContent,
    // Dutch Sudoku (Sudoku) - uses Dutch SEO slug
    'sudoku-werkbladen': sudokuNlContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuNlContent,
    // Dutch Big Small (Groot Klein) - uses Dutch SEO slug
    'groot-klein-werkbladen': bigSmallNlContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallNlContent,
    // Dutch Chart Count (Telgrafieken) - uses Dutch SEO slug
    'telgrafieken-werkbladen': chartCountNlContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountNlContent,
    // Dutch Code Addition (Visuele Optelsommen) - uses Dutch SEO slug
    'visuele-optelsommen-werkbladen': codeAdditionNlContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionNlContent,
    // Dutch Draw and Color (Rastertekenen) - uses Dutch SEO slug
    'rastertekenen-werkbladen': drawAndColorNlContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorNlContent,
    // Dutch Find Objects (Zoek de Voorwerpen) - uses Dutch SEO slug
    'zoek-voorwerpen-werkbladen': findObjectsNlContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsNlContent,
    // Dutch Grid Match (Raster Puzzel) - uses Dutch SEO slug
    'raster-puzzel-werkbladen': gridMatchNlContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchNlContent,
    // Dutch Crossword (Kruiswoordpuzzel) - uses Dutch SEO slug
    'kruiswoordpuzzel-werkbladen': crosswordNlContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordNlContent,
    // Dutch Cryptogram (Cryptogram) - uses Dutch SEO slug
    'cryptogram-werkbladen': cryptogramNlContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramNlContent,
    // Dutch Math Puzzle (Rekenpuzzels) - uses Dutch SEO slug
    'rekenpuzzels-werkbladen': mathPuzzleNlContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleNlContent,
    // Dutch Missing Pieces (Ontbrekende Puzzelstukjes) - uses Dutch SEO slug
    'ontbrekende-puzzelstukjes-werkbladen': missingPiecesNlContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesNlContent,
    // Dutch More Less (Meer Minder) - uses Dutch SEO slug
    'meer-minder-werkbladen': moreLessNlContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessNlContent,
    // Dutch Odd One Out (Welke Hoort Niet Bij) - uses Dutch SEO slug
    'welke-hoort-niet-bij-werkbladen': oddOneOutNlContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutNlContent,
    // Dutch Pattern Train (Patroontrein) - uses Dutch SEO slug
    'patroontrein-werkbladen': patternTrainNlContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainNlContent,
    // Dutch Pattern Worksheets (Patronen Werkbladen) - uses Dutch SEO slug
    'patronen-werkbladen': patternWorksheetsNlContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetsNlContent,
    // Dutch Picture Path (Doolhof) - uses Dutch SEO slug
    'doolhof-werkbladen': picturePathNlContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathNlContent,
    // Dutch Picture Sort (Sorteer) - uses Dutch SEO slug
    'sorteer-werkbladen': pictureSortNlContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortNlContent,
    // Dutch Prepositions (Voorzetsels) - uses Dutch SEO slug
    'voorzetsels-werkbladen': prepositionsNlContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsNlContent,
    // Dutch Shadow Match (Schaduw Matching) - uses Dutch SEO slug
    'schaduw-matching-werkbladen': shadowMatchNlContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchNlContent,
    // Dutch Subtraction (Aftrekken) - uses Dutch SEO slug
    'aftrekken-werkbladen': subtractionNlContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionNlContent,
    // Dutch Treasure Hunt (Schattenjacht) - uses Dutch SEO slug
    'schattenjacht-werkbladen': treasureHuntNlContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntNlContent,
    // Dutch Word Guess (Woordraadsel) - uses Dutch SEO slug
    'woordraadsel-werkbladen': wordGuessNlContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessNlContent,
    // Dutch Writing (Schrijfoefeningen) - uses Dutch SEO slug
    'schrijfoefeningen-werkbladen': writingNlContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingNlContent,
  },
  da: {
    // Danish Word Search (Ordsogning) - uses Danish SEO slug
    'ordsoegning-arbejdsark': wordSearchDaContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchDaContent,
    // Danish Addition (Matematikopgaver Plus) - uses Danish SEO slug
    'addition-arbejdsark': additionDaContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionDaContent,
    // Danish Alphabet Train (Alfabettog) - uses Danish SEO slug
    'alfabet-tog-arbejdsark': alphabetTrainDaContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainDaContent,
    // Danish Coloring (Malebog) - uses Danish SEO slug
    'malebog-arbejdsark': coloringDaContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringDaContent,
    // Danish Math Worksheet (Matematikopgaver) - uses Danish SEO slug
    'matematikopgaver-arbejdsark': mathWorksheetDaContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetDaContent,
    // Danish Word Scramble (Bogstavblanding) - uses Danish SEO slug
    'bogstavblanding-arbejdsark': wordScrambleDaContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleDaContent,
    // Danish Find and Count (Find og Tæl) - uses Danish SEO slug
    'find-og-tael-arbejdsark': findAndCountDaContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountDaContent,
    // Danish Matching (Matchning) - uses Danish SEO slug
    'matchning-arbejdsark': matchingDaContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingDaContent,
    // Danish Drawing Lines (Linjetræning) - uses Danish SEO slug
    'linjetraening-arbejdsark': drawingLinesDaContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesDaContent,
    // Danish Bingo (Bingo) - uses Danish SEO slug
    'bingo-arbejdsark': bingoDaContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': bingoDaContent,
    // Danish Sudoku (Sudoku til Børn) - uses Danish SEO slug
    'sudoku-arbejdsark': sudokuDaContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuDaContent,
    // Danish Big Small (Stor og Lille) - uses Danish SEO slug
    'stor-lille-arbejdsark': bigSmallDaContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallDaContent,
    // Danish Chart Count (Billediagram) - uses Danish SEO slug
    'billediagram-arbejdsark': chartCountDaContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountDaContent,
    // Danish Code Addition (Kode-Plusstykker) - uses Danish SEO slug
    'kode-plusstykker-arbejdsark': codeAdditionDaContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionDaContent,
    // Danish Draw and Color (Tegn og Farvelæg) - uses Danish SEO slug
    'tegn-og-farvelaeg-arbejdsark': drawAndColorDaContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorDaContent,
    // Danish Find Objects (Find Objekterne) - uses Danish SEO slug
    'find-objekterne-arbejdsark': findObjectsDaContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsDaContent,
    // Danish Grid Match (Raster-Puslespil) - uses Danish SEO slug
    'raster-puslespil-arbejdsark': gridMatchDaContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchDaContent,
    // Danish Crossword (Krydsord) - uses Danish SEO slug
    'krydsord-arbejdsark': crosswordDaContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordDaContent,
    // Danish Cryptogram (Kryptogram) - uses Danish SEO slug
    'kryptogram-arbejdsark': cryptogramDaContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramDaContent,
    // Danish Math Puzzle (Matteleger) - uses Danish SEO slug
    'matteleger-arbejdsark': mathPuzzleDaContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleDaContent,
    // Danish Missing Pieces (Manglende Brikker) - uses Danish SEO slug
    'manglende-brikker-arbejdsark': missingPiecesDaContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesDaContent,
    // Danish More Less (Sammenligningsopgaver) - uses Danish SEO slug
    'sammenligningsopgaver-arbejdsark': moreLessDaContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessDaContent,
    // Danish Odd One Out (Find Den Ulige) - uses Danish SEO slug
    'find-den-ulige-arbejdsark': oddOneOutDaContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutDaContent,
    // Danish Pattern Train (Mønstertog) - uses Danish SEO slug
    'moenstertog-arbejdsark': patternTrainDaContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainDaContent,
    // Danish Pattern Worksheet (Mønster Opgaver) - uses Danish SEO slug
    'moenstre-arbejdsark': patternWorksheetDaContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetDaContent,
    // Danish Picture Path (Billedsti) - uses Danish SEO slug
    'billedsti-arbejdsark': picturePathDaContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathDaContent,
    // Danish Picture Sort (Billedsortering) - uses Danish SEO slug
    'billedsortering-arbejdsark': pictureSortDaContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortDaContent,
    // Danish Prepositions (Præpositioner) - uses Danish SEO slug
    'praepositioner-arbejdsark': prepositionsDaContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsDaContent,
    // Danish Shadow Match (Skygge-Match) - uses Danish SEO slug
    'skygge-match-arbejdsark': shadowMatchDaContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchDaContent,
    // Danish Subtraction (Subtraktion) - uses Danish SEO slug
    'subtraktion-arbejdsark': subtractionDaContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionDaContent,
    // Danish Treasure Hunt (Skattejagt) - uses Danish SEO slug
    'skattejagt-arbejdsark': treasureHuntDaContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntDaContent,
    // Danish Word Guess (Gæt Ordet) - uses Danish SEO slug
    'gaet-ordet-arbejdsark': wordGuessDaContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessDaContent,
    // Danish Writing (Skriveopgaver) - uses Danish SEO slug
    'skriveopgaver-arbejdsark': writingDaContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingDaContent,
  },
  no: {
    // Norwegian Word Search (Ordgåte/Ordsøk) - uses Norwegian SEO slug
    'ordsoek-arbeidsark': wordSearchNoContent,
    // Also keep old slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchNoContent,
    // Norwegian Addition - uses Norwegian SEO slug
    'addisjon-arbeidsark': additionNoContent,
    // Also keep old slug for backwards compatibility during transition
    'addition-worksheets': additionNoContent,
    // Norwegian Alphabet Train - uses Norwegian SEO slug
    'alfabet-tog-arbeidsark': alphabetTrainNoContent,
    // Also keep old slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainNoContent,
    // Norwegian Coloring - uses Norwegian SEO slug
    'fargeleggingsbilder-arbeidsark': coloringNoContent,
    // Also keep old slug for backwards compatibility during transition
    'coloring-worksheets': coloringNoContent,
    // Norwegian Math Worksheets - uses Norwegian SEO slug
    'matematikk-oppgaver-arbeidsark': mathWorksheetsNoContent,
    // Also keep old slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsNoContent,
    // Norwegian Word Scramble (Bokstavoppgaver) - uses Norwegian SEO slug
    'bokstavoppgaver-arbeidsark': wordScrambleNoContent,
    // Also keep old slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleNoContent,
    // Norwegian Find and Count (Finn og Tell) - uses Norwegian SEO slug
    'finn-og-tell-arbeidsark': findAndCountNoContent,
    // Also keep old slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountNoContent,
    // Norwegian Matching (Kobling) - uses Norwegian SEO slug
    'kobling-arbeidsark': matchingNoContent,
    // Also keep old slug for backwards compatibility during transition
    'matching-worksheets': matchingNoContent,
    // Norwegian Drawing Lines (Tegning av Linjer) - uses Norwegian SEO slug
    'tegning-av-linjer-arbeidsark': drawingLinesNoContent,
    // Also keep old slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesNoContent,
    // Norwegian Picture Bingo (Bildlotto) - uses Norwegian SEO slug
    'bildlotto-arbeidsark': pictureBingoNoContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoNoContent,
    // Norwegian Sudoku - uses Norwegian SEO slug
    'sudoku-arbeidsark': sudokuNoContent,
    // Also keep old slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuNoContent,
    // Norwegian Big Small (Stor og Liten) - uses Norwegian SEO slug
    'stor-og-liten-arbeidsark': bigSmallNoContent,
    // Also keep old slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallNoContent,
    // Norwegian Chart Count (Bildediagram) - uses Norwegian SEO slug
    'bildediagram-arbeidsark': chartCountNoContent,
    // Also keep old slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountNoContent,
    // Norwegian Code Addition (Bildeaddisjon) - uses Norwegian SEO slug
    'bildeaddisjon-arbeidsark': codeAdditionNoContent,
    // Also keep old slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionNoContent,
    // Norwegian Draw and Color (Rutenetttegning) - uses Norwegian SEO slug
    'rutenetttegning-arbeidsark': drawAndColorNoContent,
    // Also keep old slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorNoContent,
    // Norwegian Find Objects (Finn Objektene) - uses Norwegian SEO slug
    'finn-objektene-arbeidsark': findObjectsNoContent,
    // Also keep old slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsNoContent,
    // Norwegian Grid Match (Rutenetttilpasning) - uses Norwegian SEO slug
    'rutenett-tilpasning-arbeidsark': gridMatchNoContent,
    // Also keep old slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchNoContent,
    // Norwegian Crossword (Bildekryssord) - uses Norwegian SEO slug
    'bildekryssord-arbeidsark': crosswordNoContent,
    // Also keep old slug for backwards compatibility during transition
    'crossword-worksheets': crosswordNoContent,
    // Norwegian Cryptogram (Kryptogram) - uses Norwegian SEO slug
    'kryptogram-arbeidsark': cryptogramNoContent,
    // Also keep old slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramNoContent,
    // Norwegian Math Puzzle (Matematikkgåter) - uses Norwegian SEO slug
    'matematikkgater-arbeidsark': mathPuzzleNoContent,
    // Also keep old slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleNoContent,
    // Norwegian Missing Pieces (Manglende Biter) - uses Norwegian SEO slug
    'manglende-biter-arbeidsark': missingPiecesNoContent,
    // Also keep old slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesNoContent,
    // Norwegian More or Less (Sammenligningsoppgaver) - uses Norwegian SEO slug
    'sammenligningsoppgaver-arbeidsark': moreLessNoContent,
    // Also keep old slug for backwards compatibility during transition
    'more-less-worksheets': moreLessNoContent,
    // Norwegian Odd One Out (Finn den Ulike) - uses Norwegian SEO slug
    'finn-den-ulike-arbeidsark': oddOneOutNoContent,
    // Also keep old slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutNoContent,
    // Norwegian Pattern Train (Mønstergenkjenning) - uses Norwegian SEO slug
    'monstertog-arbeidsark': patternTrainNoContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainNoContent,
    // Norwegian Pattern Worksheet (Mønsteroppgaver) - uses Norwegian SEO slug
    'monsteroppgaver-arbeidsark': patternWorksheetNoContent,
    // Also keep old slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetNoContent,
    // Norwegian Picture Path (Bildesti) - uses Norwegian SEO slug
    'bildesti-arbeidsark': picturePathNoContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathNoContent,
    // Norwegian Picture Sort (Bildesortering) - uses Norwegian SEO slug
    'bildesortering-arbeidsark': pictureSortNoContent,
    // Also keep old slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortNoContent,
    // Norwegian Prepositions (Preposisjoner) - uses Norwegian SEO slug
    'preposisjoner-arbeidsark': prepositionsNoContent,
    // Also keep old slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsNoContent,
    // Norwegian Shadow Match (Skyggematching) - uses Norwegian SEO slug
    'skyggematching-arbeidsark': shadowMatchNoContent,
    // Also keep old slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchNoContent,
    // Norwegian Subtraction (Subtraksjon) - uses Norwegian SEO slug
    'subtraksjon-arbeidsark': subtractionNoContent,
    // Also keep old slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionNoContent,
    // Norwegian Treasure Hunt (Skattejakt) - uses Norwegian SEO slug
    'skattejakt-arbeidsark': treasureHuntNoContent,
    // Also keep old slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntNoContent,
    // Norwegian Word Guess (Gjetteoppgaver) - uses Norwegian SEO slug
    'gjetteoppgaver-arbeidsark': wordGuessNoContent,
    // Also keep old slug for backwards compatibility during transition
    'word-guess-worksheets': wordGuessNoContent,
    // Norwegian Writing (Skriveark) - uses Norwegian SEO slug
    'skriveark-arbeidsark': writingNoContent,
    // Also keep old slug for backwards compatibility during transition
    'writing-worksheets': writingNoContent,
  },
  fi: {
    // Finnish Word Search (Sananhaku) - uses Finnish SEO slug
    'sananhaku-tyoarkit': wordSearchFiContent,
    // Also keep English slug for backwards compatibility during transition
    'word-search-worksheets': wordSearchFiContent,
    // Finnish Addition (Yhteenlasku) - uses Finnish SEO slug
    'yhteenlasku-tyoarkit': additionFiContent,
    // Also keep English slug for backwards compatibility during transition
    'addition-worksheets': additionFiContent,
    // Finnish Alphabet Train (Aakkosjuna) - uses Finnish SEO slug
    'aakkosjuna-tyoarkit': alphabetTrainFiContent,
    // Also keep English slug for backwards compatibility during transition
    'alphabet-train-worksheets': alphabetTrainFiContent,
    // Finnish Coloring (Värityskuvat) - uses Finnish SEO slug
    'varityskuvat-tyoarkit': coloringFiContent,
    // Also keep English slug for backwards compatibility during transition
    'coloring-worksheets': coloringFiContent,
    // Finnish Math Worksheets (Matematiikka Tehtävät) - uses Finnish SEO slug
    'matematiikka-tyoarkit': mathWorksheetsFiContent,
    // Also keep English slug for backwards compatibility during transition
    'math-worksheets': mathWorksheetsFiContent,
    // Finnish Word Scramble (Sanansekoitus) - uses Finnish SEO slug
    'sanansekoitus-tyoarkit': wordScrambleFiContent,
    // Also keep English slug for backwards compatibility during transition
    'word-scramble-worksheets': wordScrambleFiContent,
    // Finnish Find and Count (Etsi ja Laske) - uses Finnish SEO slug
    'etsi-ja-laske-tyoarkit': findAndCountFiContent,
    // Also keep English slug for backwards compatibility during transition
    'find-and-count-worksheets': findAndCountFiContent,
    // Finnish Matching (Yhdistä Parit) - uses Finnish SEO slug
    'yhdista-parit-tyoarkit': matchingFiContent,
    // Also keep English slug for backwards compatibility during transition
    'matching-worksheets': matchingFiContent,
    // Finnish Drawing Lines (Viivojen Piirtäminen) - uses Finnish SEO slug
    'viivojen-piirtaminen-tyoarkit': drawingLinesFiContent,
    // Also keep English slug for backwards compatibility during transition
    'drawing-lines-worksheets': drawingLinesFiContent,
    // Finnish Picture Bingo (Kuva-Bingo) - uses Finnish SEO slug
    'kuva-bingo-tyoarkit': pictureBingoFiContent,
    // Also keep English slug for backwards compatibility during transition
    'picture-bingo-worksheets': pictureBingoFiContent,
    // Finnish Sudoku (Lasten Sudoku) - uses Finnish SEO slug
    'sudoku-tyoarkit': sudokuFiContent,
    // Also keep English slug for backwards compatibility during transition
    'sudoku-worksheets': sudokuFiContent,
    // Finnish Big and Small (Iso ja Pieni) - uses Finnish SEO slug
    'iso-pieni-tyoarkit': bigSmallFiContent,
    // Also keep English slug for backwards compatibility during transition
    'big-small-worksheets': bigSmallFiContent,
    // Finnish Chart Count (Kuvakaavio) - uses Finnish SEO slug
    'kuvakaavio-tyoarkit': chartCountFiContent,
    // Also keep English slug for backwards compatibility during transition
    'chart-count-worksheets': chartCountFiContent,
    // Finnish Code Addition (Kuvapohjainen Yhteenlasku) - uses Finnish SEO slug
    'kuva-yhteenlasku-tyoarkit': codeAdditionFiContent,
    // Also keep English slug for backwards compatibility during transition
    'code-addition-worksheets': codeAdditionFiContent,
    // Finnish Draw and Color (Ruudukkopiirustus) - uses Finnish SEO slug
    'ruudukkopiirustus-tyoarkit': drawAndColorFiContent,
    // Also keep English slug for backwards compatibility during transition
    'draw-and-color-worksheets': drawAndColorFiContent,
    // Finnish Find Objects (Etsi Esineet) - uses Finnish SEO slug
    'etsi-esineet-tyoarkit': findObjectsFiContent,
    // Also keep English slug for backwards compatibility during transition
    'find-objects-worksheets': findObjectsFiContent,
    // Finnish Grid Match (Ruudukko Sovitus) - uses Finnish SEO slug
    'ruudukko-sovitus-tyoarkit': gridMatchFiContent,
    // Also keep English slug for backwards compatibility during transition
    'grid-match-worksheets': gridMatchFiContent,
    // Finnish Crossword (Ristisanatehtävät) - uses Finnish SEO slug
    'ristisanatehtavat-tyoarkit': crosswordFiContent,
    // Also keep English slug for backwards compatibility during transition
    'crossword-worksheets': crosswordFiContent,
    // Finnish Cryptogram (Kuvakryptogrammi) - uses Finnish SEO slug
    'kuvakryptogrammi-tyoarkit': cryptogramFiContent,
    // Also keep English slug for backwards compatibility during transition
    'cryptogram-worksheets': cryptogramFiContent,
    // Finnish Math Puzzle (Matematiikkapulmat) - uses Finnish SEO slug
    'matematiikkapulmat-tyoarkit': mathPuzzleFiContent,
    // Also keep English slug for backwards compatibility during transition
    'math-puzzle-worksheets': mathPuzzleFiContent,
    // Finnish Missing Pieces (Puuttuvat Palat) - uses Finnish SEO slug
    'puuttuvat-palat-tyoarkit': missingPiecesFiContent,
    // Also keep English slug for backwards compatibility during transition
    'missing-pieces-worksheets': missingPiecesFiContent,
    // Finnish More Less (Enemmän vai Vähemmän) - uses Finnish SEO slug
    'enemman-vahemman-tyoarkit': moreLessFiContent,
    // Also keep English slug for backwards compatibility during transition
    'more-less-worksheets': moreLessFiContent,
    // Finnish Odd One Out (Poikkea Joukosta) - uses Finnish SEO slug
    'poikkea-joukosta-tyoarkit': oddOneOutFiContent,
    // Also keep English slug for backwards compatibility during transition
    'odd-one-out-worksheets': oddOneOutFiContent,
    // Finnish Pattern Train (Kuviojuna) - uses Finnish SEO slug
    'kuviojuna-tyoarkit': patternTrainFiContent,
    // Also keep English slug for backwards compatibility during transition
    'pattern-train-worksheets': patternTrainFiContent,
    // Finnish Pattern Worksheet (Kuviotehtävä) - uses Finnish SEO slug
    'kuviotehtava-tyoarkit': patternWorksheetFiContent,
    // Also keep English slug for backwards compatibility during transition
    'pattern-worksheets': patternWorksheetFiContent,
    // Finnish Picture Path (Kuvapolku) - uses Finnish SEO slug
    'kuvapolku-tyoarkit': picturePathFiContent,
    // Also keep English slug for backwards compatibility during transition
    'picture-path-worksheets': picturePathFiContent,
    // Finnish Picture Sort (Kuvalajittelu) - uses Finnish SEO slug
    'kuvalajittelu-tyoarkit': pictureSortFiContent,
    // Also keep English slug for backwards compatibility during transition
    'picture-sort-worksheets': pictureSortFiContent,
    // Finnish Prepositions (Prepositioharjoitukset) - uses Finnish SEO slug
    'prepositio-tyoarkit': prepositionsFiContent,
    // Also keep English slug for backwards compatibility during transition
    'prepositions-worksheets': prepositionsFiContent,
    // Finnish Shadow Match (Varjoyhdistely) - uses Finnish SEO slug
    'varjoyhdistely-tyoarkit': shadowMatchFiContent,
    // Also keep English slug for backwards compatibility during transition
    'shadow-match-worksheets': shadowMatchFiContent,
    // Finnish Subtraction (Vähennyslasku) - uses Finnish SEO slug
    'vahennyslasku-tyoarkit': subtractionFiContent,
    // Also keep English slug for backwards compatibility during transition
    'subtraction-worksheets': subtractionFiContent,
    // Finnish Treasure Hunt (Aarteenetsintä) - uses Finnish SEO slug
    'aarteenetsinta-tyoarkit': treasureHuntFiContent,
    // Also keep English slug for backwards compatibility during transition
    'treasure-hunt-worksheets': treasureHuntFiContent,
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
