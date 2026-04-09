import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getIdeaConfigBySlug,
  getAllIdeaPageSlugs,
  getIdeaAlternateUrls,
  getIdeaSlugForLocale,
} from '@/config/idea-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap, generateFAQSchema, generateVideoSchema, localizedHomeLabel, getHreflangCode, generateShowcaseImageSchemas, generateImageGallerySchema } from '@/lib/schema-generator';
import { getIdeaFallbackDescription } from '@/lib/localized-meta-fallback';
import { getIdeaContent } from '@/config/idea-content';
import { getSectionLabel } from '@/config/section-labels';
import { encodeImagePath } from '@/lib/encode-image-path';
import { isValidInternalLink } from '@/lib/resolve-internal-link';
import VideoFacade from '../../apps/[slug]/VideoFacade';
import ReadMoreText from '@/components/ReadMoreText';
import {
  WorksheetShowcaseSection,
  TieredShowcaseSection,
  SpotlightSection,
  GallerySection,
} from '@/app/[locale]/apps/[slug]/showcase/ShowcaseSections';
import { getPageShowcaseConfig } from '@/config/guide-showcase-configs';
import BuyButton from '@/components/BuyButton';
import { isValidAppId } from '@/config/products';
import type { AppId } from '@/config/products';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Static hero image mapping for product idea thumbnails (per locale)
const appHeroImagesByLocale: Record<string, Record<string, string>> = {
  en: {
    'addition': '/samples/english/addition/addition-fun-1.webp',
    'image-addition': '/samples/english/addition/addition-fun-1.webp',
    'image-subtraction': '/samples/english/subtraction/subtraction-fun-1.webp',
    'subtraction': '/samples/english/subtraction/subtraction-fun-1.webp',
    'alphabet-train': '/samples/english/alphabet%20train/alphabet-train-1.webp',
    'big-small': '/samples/english/big%20small/big-small-worksheet-worksheet.webp',
    'bingo': '/samples/english/bingo/bingo-card.webp',
    'chart-count': '/samples/english/chart%20count/chart-count.webp',
    'code-addition': '/samples/english/code%20addition/code-breaker-addition-1.webp',
    'coloring': '/samples/english/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/english/crossword/crossword-worksheet.webp',
    'cryptogram': '/samples/english/cryptogram/cryptogram-worksheet.webp',
    'draw-and-color': '/samples/english/draw%20and%20color/grid-drawing-worksheet.webp',
    'drawing-lines': '/samples/english/drawing%20lines/drawing-lines-horizontal.webp',
    'find-and-count': '/samples/english/find%20and%20count/find-and-count-portrait.webp',
    'find-objects': '/samples/english/find%20objects/spotworks-worksheet.webp',
    'grid-match': '/samples/english/grid%20match/grid-match.webp',
    'matching': '/samples/english/matching/matching-portrait.webp',
    'math-puzzle': '/samples/english/math%20puzzle/math-puzzles.webp',
    'math-worksheet': '/samples/english/math%20worksheet/math-worksheet-10.webp',
    'missing-pieces': '/samples/english/missing%20pieces/missing-pieces.webp',
    'more-less': '/samples/english/more%20less/more-less-10.webp',
    'odd-one-out': '/samples/english/odd%20one%20out/find-the-odd-one-out.webp',
    'pattern-train': '/samples/english/pattern%20train/pattern-train-worksheet.webp',
    'pattern-worksheet': '/samples/english/pattern%20worksheet/pattern-worksheet.webp',
    'picture-path': '/samples/english/picture%20path/picture-pathway.webp',
    'picture-sort': '/samples/english/picture%20sort/picture-sort.webp',
    'prepositions': '/samples/english/prepositions/prepositions-worksheet-1.webp',
    'shadow-match': '/samples/english/shadow%20match/shadow-match-worksheet.webp',
    'sudoku': '/samples/english/sudoku/sudoku-worksheet.webp',
    'treasure-hunt': '/samples/english/treasure%20hunt/treasure-hunt-1.webp',
    'word-guess': '/samples/english/word%20guess/clue-grid-worksheet.webp',
    'word-scramble': '/samples/english/word%20scramble/word-scramble-portrait.webp',
    'word-search': '/samples/english/wordsearch/wordsearch-portrait.webp',
    'writing': '/samples/english/writing/writing.webp',
  },
  de: {
    'addition': '/samples/german/addition/additionsspa-1.webp',
    'image-addition': '/samples/german/addition/additionsspa-1.webp',
    'image-subtraction': '/samples/german/subtraction/worksheet.webp',
    'subtraction': '/samples/german/subtraction/worksheet.webp',
    'alphabet-train': '/samples/german/alphabet%20train/worksheet.webp',
    'big-small': '/samples/german/big%20small/big-small-worksheet-worksheet.webp',
    'bingo': '/samples/german/bingo/bilder-bingo-1.webp',
    'chart-count': '/samples/german/chart%20count/bilddiagramm-1.webp',
    'code-addition': '/samples/german/code%20addition/code-knacker-addition-1.webp',
    'coloring': '/samples/german/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/german/crossword/crossword-worksheet.webp',
    'cryptogram': '/samples/german/cryptogram/bilder-kryptogramm-1.webp',
    'draw-and-color': '/samples/german/draw%20and%20color/zeichnen-und-ausmale-1.webp',
    'drawing-lines': '/samples/german/drawing%20lines/linien-zeichnen-üben-1.webp',
    'find-and-count': '/samples/german/find%20and%20count/ich-sehe-was-1.webp',
    'find-objects': '/samples/german/find%20objects/finde-das-unpassende-1-v7.webp',
    'grid-match': '/samples/german/grid%20match/raster-puzzle-1.webp',
    'matching': '/samples/german/matching/paare-finden-1.webp',
    'math-puzzle': '/samples/german/math%20puzzle/mathe-rätsel-1.webp',
    'math-worksheet': '/samples/german/math%20worksheet/worksheet.webp',
    'missing-pieces': '/samples/german/missing%20pieces/fehlende-teile-1.webp',
    'more-less': '/samples/german/more%20less/mehr-weniger-1.webp',
    'odd-one-out': '/samples/german/odd%20one%20out/finde-das-andere-1.webp',
    'pattern-train': '/samples/german/pattern%20train/musterzug-1.webp',
    'pattern-worksheet': '/samples/german/pattern%20worksheet/pattern-worksheet.webp',
    'picture-path': '/samples/german/picture%20path/bilderpfad-1.webp',
    'picture-sort': '/samples/german/picture%20sort/bilder-sortieren-1.webp',
    'prepositions': '/samples/german/prepositions/prepositions-worksheet.webp',
    'shadow-match': '/samples/german/shadow%20match/schatten-zuordnen-1.webp',
    'sudoku': '/samples/german/sudoku/bilder-sudoku-1.webp',
    'treasure-hunt': '/samples/german/treasure%20hunt/worksheet.webp',
    'word-guess': '/samples/german/word%20guess/clue-grid-worksheet.webp',
    'word-scramble': '/samples/german/word%20scramble/buchstabensala-1.webp',
    'word-search': '/samples/german/wordsearch/worter-suchen-1.webp',
    'writing': '/samples/german/writing/writing.webp',
  },
  it: {
    'addition': '/samples/italian/addition/addizione-divertente-1.webp',
    'image-addition': '/samples/italian/addition/addizione-divertente-1.webp',
    'image-subtraction': '/samples/italian/subtraction/sottrazioni-divertenti-1.webp',
    'subtraction': '/samples/italian/subtraction/sottrazioni-divertenti-1.webp',
    'alphabet-train': "/samples/italian/alphabet train/Treno dell'alfabeto-1.webp",
    'big-small': '/samples/italian/big%20small/grande-o-piccolo-1.webp',
    'bingo': '/samples/italian/bingo/tombola-1.webp',
    'chart-count': '/samples/italian/chart%20count/grafico-con-immagini-1.webp',
    'code-addition': '/samples/italian/code%20addition/codice-segreto-addizione-1.webp',
    'coloring': '/samples/italian/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/italian/crossword/cruciverba-con-immagini-1.webp',
    'cryptogram': '/samples/italian/cryptogram/crittogramma-illustrato-1.webp',
    'draw-and-color': '/samples/italian/draw%20and%20color/disegna-e-colora-1.webp',
    'drawing-lines': '/samples/italian/drawing%20lines/pratica-del-disegno-di-linee-2.webp',
    'find-and-count': '/samples/italian/find%20and%20count/vedo-vedo-1.webp',
    'find-objects': '/samples/italian/find%20objects/trova-gli-oggetti-nascosti-1.webp',
    'grid-match': '/samples/italian/grid%20match/puzzle-a-griglia-1.webp',
    'matching': '/samples/italian/matching/trova-le-coppie-1.webp',
    'math-puzzle': '/samples/italian/math%20puzzle/rompicapi-matematici-1.webp',
    'math-worksheet': '/samples/italian/math%20worksheet/scheda-di-matematica-1.webp',
    'missing-pieces': '/samples/italian/missing%20pieces/pezzi-mancanti-1.webp',
    'more-less': '/samples/italian/more%20less/più-meno-1.webp',
    'odd-one-out': '/samples/italian/odd%20one%20out/trova-il-diverso-1-v10.webp',
    'pattern-train': '/samples/italian/pattern%20train/treno-dei-modelli-1.webp',
    'pattern-worksheet': '/samples/italian/pattern%20worksheet/puzzle-di-schemi-1.webp',
    'picture-path': '/samples/italian/picture%20path/percorso-di-immagini-1.webp',
    'picture-sort': '/samples/italian/picture%20sort/classificazione-immagini-1.webp',
    'prepositions': '/samples/italian/prepositions/preposizioni-1.webp',
    'shadow-match': '/samples/italian/shadow%20match/abbina-le-ombre-1.webp',
    'sudoku': '/samples/italian/sudoku/sudoku-con-immagini-1.webp',
    'treasure-hunt': '/samples/italian/treasure%20hunt/caccia-al-tesoro-1.webp',
    'word-guess': '/samples/italian/word%20guess/indovina-la-parola-1.webp',
    'word-scramble': '/samples/italian/word%20scramble/lettere-mescolate-1.webp',
    'word-search': '/samples/italian/wordsearch/cerca-parole-1.webp',
    'writing': '/samples/italian/writing/writing.webp',
  },
  nl: {
    'addition': '/samples/dutch/addition/optellen-is-leuk-1.webp',
    'image-addition': '/samples/dutch/addition/optellen-is-leuk-1.webp',
    'image-subtraction': '/samples/dutch/subtraction/aftrekken-is-leuk-1.webp',
    'subtraction': '/samples/dutch/subtraction/aftrekken-is-leuk-1.webp',
    'alphabet-train': '/samples/dutch/alphabet%20train/alfabettrein-1.webp',
    'big-small': '/samples/dutch/big%20small/groot-of-klein-1.webp',
    'bingo': '/samples/dutch/bingo/plaatjesbingo-1.webp',
    'chart-count': '/samples/dutch/chart%20count/plaatjesgrafiek-1.webp',
    'code-addition': '/samples/dutch/code%20addition/geheime-code-optellen-1.webp',
    'coloring': '/samples/dutch/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/dutch/crossword/plaatjes-kruiswoord-1.webp',
    'cryptogram': '/samples/dutch/cryptogram/plaatjes-cryptogram-1.webp',
    'draw-and-color': '/samples/dutch/draw%20and%20color/teken-en-kleur-1.webp',
    'drawing-lines': '/samples/dutch/drawing%20lines/lijnen-tekenen-oefenen-1.webp',
    'find-and-count': '/samples/dutch/find%20and%20count/ik-zie,-ik-zie-1.webp',
    'find-objects': '/samples/dutch/find%20objects/vind-de-verborgen-voorwerpen-1.webp',
    'grid-match': '/samples/dutch/grid%20match/rasterpuzzel-1.webp',
    'matching': '/samples/dutch/matching/zoek-de-paren-1.webp',
    'math-puzzle': '/samples/dutch/math%20puzzle/wiskundepuzzels-1.webp',
    'math-worksheet': '/samples/dutch/math%20worksheet/wiskundeblad-1.webp',
    'missing-pieces': '/samples/dutch/missing%20pieces/ontbrekende-stukjes-1.webp',
    'more-less': '/samples/dutch/more%20less/meer-minder-1.webp',
    'odd-one-out': '/samples/dutch/odd%20one%20out/vind-de-vreemde-eend-1.webp',
    'pattern-train': '/samples/dutch/pattern%20train/patroontje-1.webp',
    'pattern-worksheet': '/samples/dutch/pattern%20worksheet/patroonpuzzels-1.webp',
    'picture-path': '/samples/dutch/picture%20path/afbeeldingspad-1.webp',
    'picture-sort': '/samples/dutch/picture%20sort/afbeeldingen-sorteren-1.webp',
    'prepositions': '/samples/dutch/prepositions/voorzetsels-1.webp',
    'shadow-match': '/samples/dutch/shadow%20match/schaduw-koppelen-1.webp',
    'sudoku': '/samples/dutch/sudoku/plaatjes-sudoku-1.webp',
    'treasure-hunt': '/samples/dutch/treasure%20hunt/schattenjacht-1.webp',
    'word-guess': '/samples/dutch/word%20guess/raad-het-woord-1.webp',
    'word-scramble': '/samples/dutch/word%20scramble/letterzaak-1.webp',
    'word-search': '/samples/dutch/wordsearch/woordzoeker-1.webp',
    'writing': '/samples/dutch/writing/writing.webp',
  },
  fr: {
    'addition': '/samples/french/addition/addition-amusant-1.webp',
    'image-addition': '/samples/french/addition/addition-amusant-1.webp',
    'image-subtraction': '/samples/french/subtraction/soustractions-amusantes-1.webp',
    'subtraction': '/samples/french/subtraction/soustractions-amusantes-1.webp',
    'alphabet-train': "/samples/french/alphabet train/train-de-l'alphabet-1.webp",
    'big-small': '/samples/french/big%20small/grand-ou-petit-1.webp',
    'bingo': "/samples/french/bingo/loto-d'images-1.webp",
    'chart-count': '/samples/french/chart%20count/worksheet.webp',
    'code-addition': '/samples/french/code%20addition/code-secret-addition-1.webp',
    'coloring': '/samples/french/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/french/crossword/crossword-worksheet.webp',
    'cryptogram': '/samples/french/cryptogram/cryptogramme-en-images-1.webp',
    'draw-and-color': '/samples/french/draw%20and%20color/dessine-et-colorie-1.webp',
    'drawing-lines': '/samples/french/drawing%20lines/pratique-de-tracer-des-lignes-1.webp',
    'find-and-count': '/samples/french/find%20and%20count/je-vois,-je-voi-1.webp',
    'find-objects': "/samples/french/find%20objects/trouve-l'intrus-1.webp",
    'grid-match': '/samples/french/grid%20match/puzzle-grille-1.webp',
    'matching': '/samples/french/matching/trouve-les-paires-1.webp',
    'math-puzzle': '/samples/french/math%20puzzle/worksheet.webp',
    'math-worksheet': '/samples/french/math%20worksheet/worksheet.webp',
    'missing-pieces': '/samples/french/missing%20pieces/worksheet.webp',
    'more-less': '/samples/french/more%20less/plus-moins-1.webp',
    'odd-one-out': "/samples/french/odd%20one%20out/trouve-l'intrus-1.webp",
    'pattern-train': "/samples/french/pattern%20train/train-à-motifs-1.webp",
    'pattern-worksheet': '/samples/french/pattern%20worksheet/puzzles-de-motifs-1.webp',
    'picture-path': "/samples/french/picture%20path/chemin-d'images-1.webp",
    'picture-sort': "/samples/french/picture%20sort/tri-d'images-1.webp",
    'prepositions': '/samples/french/prepositions/prepositions-worksheet.webp',
    'shadow-match': "/samples/french/shadow%20match/trouve-l'ombre-1.webp",
    'sudoku': '/samples/french/sudoku/sudoku-en-images-1.webp',
    'treasure-hunt': '/samples/french/treasure%20hunt/worksheet.webp',
    'word-guess': '/samples/french/word%20guess/devine-le-mot-1.webp',
    'word-scramble': '/samples/french/word%20scramble/word-scramble-worksheet.webp',
    'word-search': '/samples/french/wordsearch/mots-caches-1.webp',
    'writing': '/samples/french/writing/writing.webp',
  },
  es: {
    'addition': '/samples/spanish/addition/suma-divertida-1.webp',
    'image-addition': '/samples/spanish/addition/suma-divertida-1.webp',
    'image-subtraction': '/samples/spanish/subtraction/restas-divertidas-1.webp',
    'subtraction': '/samples/spanish/subtraction/restas-divertidas-1.webp',
    'alphabet-train': '/samples/spanish/alphabet%20train/tren-del-alfabeto-1.webp',
    'big-small': '/samples/spanish/big%20small/grande-o-pequeño-1.webp',
    'bingo': '/samples/spanish/bingo/bingo-de-imágenes-1.webp',
    'chart-count': '/samples/spanish/chart%20count/gráfico-de-dibujos-1.webp',
    'code-addition': '/samples/spanish/code%20addition/código-secreto-suma-1.webp',
    'coloring': '/samples/spanish/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/spanish/crossword/crucigrama-con-dibujos-1.webp',
    'cryptogram': '/samples/spanish/cryptogram/criptograma-de-dibujos-1.webp',
    'draw-and-color': '/samples/spanish/draw%20and%20color/dibuja-y-colorea-1.webp',
    'drawing-lines': '/samples/spanish/drawing%20lines/practica-de-dibujar-línea-1.webp',
    'find-and-count': '/samples/spanish/find%20and%20count/veo-veo-1.webp',
    'find-objects': '/samples/spanish/find%20objects/encuentra-el-diferente-1.webp',
    'grid-match': '/samples/spanish/grid%20match/puzzle-de-cuadrícula-1.webp',
    'matching': '/samples/spanish/matching/encuentra-parejas-1.webp',
    'math-puzzle': '/samples/spanish/math%20puzzle/rompecabezas-matemáticos-1.webp',
    'math-worksheet': '/samples/spanish/math%20worksheet/hoja-de-matemáticas-1.webp',
    'missing-pieces': '/samples/spanish/missing%20pieces/piezas-perdidas-1.webp',
    'more-less': '/samples/spanish/more%20less/más-menos-1.webp',
    'odd-one-out': '/samples/spanish/odd%20one%20out/encuentra-el-diferente-1.webp',
    'pattern-train': '/samples/spanish/pattern%20train/tren-de-patrones-1.webp',
    'pattern-worksheet': '/samples/spanish/pattern%20worksheet/rompecabezas-de-patrones-1.webp',
    'picture-path': '/samples/spanish/picture%20path/camino-de-imágenes-1.webp',
    'picture-sort': '/samples/spanish/picture%20sort/clasificación-de-imágenes-1.webp',
    'prepositions': '/samples/spanish/prepositions/preposiciones-1.webp',
    'shadow-match': '/samples/spanish/shadow%20match/empareja-las-sombras-1.webp',
    'sudoku': '/samples/spanish/sudoku/sudoku-de-imágenes-1.webp',
    'treasure-hunt': '/samples/spanish/treasure%20hunt/búsqueda-del-tesoro-1.webp',
    'word-guess': '/samples/spanish/word%20guess/adivina-la-palabra-1.webp',
    'word-scramble': '/samples/spanish/word%20scramble/palabras-revueltas-1.webp',
    'word-search': '/samples/spanish/wordsearch/sopa-de-letras-1.webp',
    'writing': '/samples/spanish/writing/writing.webp',
  },
  pt: {
    'addition': '/samples/portuguese/addition/adição-divertida-1.webp',
    'image-addition': '/samples/portuguese/addition/adição-divertida-1.webp',
    'image-subtraction': '/samples/portuguese/subtraction/subtrações-divertidas-1.webp',
    'subtraction': '/samples/portuguese/subtraction/subtrações-divertidas-1.webp',
    'alphabet-train': '/samples/portuguese/alphabet%20train/comboio-do-alfabeto-1.webp',
    'big-small': '/samples/portuguese/big%20small/grande-ou-pequeno-1.webp',
    'bingo': '/samples/portuguese/bingo/bingo-de-imagenes-1.webp',
    'chart-count': '/samples/portuguese/chart%20count/gráfico-de-figuras-1.webp',
    'code-addition': '/samples/portuguese/code%20addition/código-secreto-adição-1.webp',
    'coloring': '/samples/portuguese/coloring/coloring-landscape-1.webp',
    'crossword': '/samples/portuguese/crossword/palavras-cruzadas-1.webp',
    'cryptogram': '/samples/portuguese/cryptogram/criptograma-ilustrado-1.webp',
    'draw-and-color': '/samples/portuguese/draw%20and%20color/desenha-e-pinta-1.webp',
    'drawing-lines': '/samples/portuguese/drawing%20lines/prática-de-desenhar-linhas-1.webp',
    'find-and-count': '/samples/portuguese/find%20and%20count/vejo,-vejo-1.webp',
    'find-objects': '/samples/portuguese/find%20objects/encontra-o-diferente-1.webp',
    'grid-match': '/samples/portuguese/grid%20match/quebra-cabeça-de-grade-1.webp',
    'matching': '/samples/portuguese/matching/encontre-os-pares-1.webp',
    'math-puzzle': '/samples/portuguese/math%20puzzle/quebra-cabeças-matemático-1.webp',
    'math-worksheet': '/samples/portuguese/math%20worksheet/folha-de-matemática-1.webp',
    'missing-pieces': '/samples/portuguese/missing%20pieces/peças-em-falta-1.webp',
    'more-less': '/samples/portuguese/more%20less/mais-menos-1.webp',
    'odd-one-out': '/samples/portuguese/odd%20one%20out/encontra-o-diferente-1-v1.webp',
    'pattern-train': '/samples/portuguese/pattern%20train/comboio-de-padrões-1.webp',
    'pattern-worksheet': '/samples/portuguese/pattern%20worksheet/quebra-cabeças-de-padrões-1.webp',
    'picture-path': '/samples/portuguese/picture%20path/caminho-de-imagen-1.webp',
    'picture-sort': '/samples/portuguese/picture%20sort/classificação-de-imagens-1.webp',
    'prepositions': '/samples/portuguese/prepositions/preposições-1.webp',
    'shadow-match': '/samples/portuguese/shadow%20match/combine-as-sombras-1.webp',
    'sudoku': '/samples/portuguese/sudoku/sudoku-de-imagens-1.webp',
    'treasure-hunt': '/samples/portuguese/treasure%20hunt/caça-ao-tesouro-1.webp',
    'word-guess': '/samples/portuguese/word%20guess/adivinha-a-palavra-1.webp',
    'word-scramble': '/samples/portuguese/word%20scramble/letras-embaralhadas-1.webp',
    'word-search': '/samples/portuguese/wordsearch/caça-palavras-1.webp',
    'writing': '/samples/portuguese/writing/writing-beginning-letter.webp',
  },
  sv: {
    'addition': '/samples/swedish/addition/addition-övning.webp',
    'image-addition': '/samples/swedish/addition/addition-övning.webp',
    'image-subtraction': '/samples/swedish/subtraction/rolig-subtraktio-1.webp',
    'subtraction': '/samples/swedish/subtraction/rolig-subtraktio-1.webp',
    'alphabet-train': '/samples/swedish/alphabet%20train/alfabetståg-portrait.webp',
    'big-small': '/samples/swedish/big%20small/2-identiska-bilder.webp',
    'bingo': '/samples/swedish/bingo/bildbingo-1.webp',
    'chart-count': '/samples/swedish/chart%20count/worksheet.webp',
    'code-addition': '/samples/swedish/code%20addition/image-addition-worksheet.webp',
    'coloring': '/samples/swedish/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/swedish/crossword/bildkorsord-1.webp',
    'cryptogram': '/samples/swedish/cryptogram/bildkryptogram-1.webp',
    'draw-and-color': '/samples/swedish/draw%20and%20color/rita-och-färglägg-1.webp',
    'drawing-lines': '/samples/swedish/drawing%20lines/horizontell.webp',
    'find-and-count': '/samples/swedish/find%20and%20count/worksheet.webp',
    'find-objects': '/samples/swedish/find%20objects/hitta-föremålen-1.webp',
    'grid-match': '/samples/swedish/grid%20match/rutnätspussel-1.webp',
    'matching': '/samples/swedish/matching/matchningsspel.webp',
    'math-puzzle': '/samples/swedish/math%20puzzle/mattepussel-1.webp',
    'math-worksheet': '/samples/swedish/math%20worksheet/mattetal-portrait.webp',
    'missing-pieces': '/samples/swedish/missing%20pieces/saknade-bitar-1.webp',
    'more-less': '/samples/swedish/more%20less/mer-mindre-1.webp',
    'odd-one-out': '/samples/swedish/odd%20one%20out/hitta-udda-fågeln-1.webp',
    'pattern-train': '/samples/swedish/pattern%20train/pattern-train-worksheet.webp',
    'pattern-worksheet': '/samples/swedish/pattern%20worksheet/mönsterpussel-1.webp',
    'picture-path': '/samples/swedish/picture%20path/bildväg-1.webp',
    'picture-sort': '/samples/swedish/picture%20sort/sortera-bilder-1.webp',
    'prepositions': '/samples/swedish/prepositions/prepositioner-1.webp',
    'shadow-match': '/samples/swedish/shadow%20match/skuggmatchning-1.webp',
    'sudoku': '/samples/swedish/sudoku/sudoku-lätt.webp',
    'treasure-hunt': '/samples/swedish/treasure%20hunt/skattjakt-1.webp',
    'word-guess': '/samples/swedish/word%20guess/gissa-ordet-1.webp',
    'word-scramble': '/samples/swedish/word%20scramble/ordmix-portrait.webp',
    'word-search': '/samples/swedish/wordsearch/ordletning-portrait.webp',
    'writing': '/samples/swedish/writing/writing.webp',
  },
  da: {
    'addition': '/samples/danish/addition/sjov-addition-1.webp',
    'image-addition': '/samples/danish/addition/sjov-addition-1.webp',
    'image-subtraction': '/samples/danish/subtraction/sjov-subtraktion-1.webp',
    'subtraction': '/samples/danish/subtraction/sjov-subtraktion-1.webp',
    'alphabet-train': '/samples/danish/alphabet%20train/alfabettog-1.webp',
    'big-small': '/samples/danish/big%20small/stort-eller-lille-1.webp',
    'bingo': '/samples/danish/bingo/billedbingo-1.webp',
    'chart-count': '/samples/danish/chart%20count/billediagram-1.webp',
    'code-addition': '/samples/danish/code%20addition/hemmelig-kode-addition-1.webp',
    'coloring': '/samples/danish/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/danish/crossword/billedkrydsord-1.webp',
    'cryptogram': '/samples/danish/cryptogram/billed-kryptogram-1.webp',
    'draw-and-color': '/samples/danish/draw%20and%20color/tegn-og-farvlæg-1.webp',
    'drawing-lines': '/samples/danish/drawing%20lines/linjetegningsøvelse-1.webp',
    'find-and-count': '/samples/danish/find%20and%20count/jeg-ser,-jeg-ser-1.webp',
    'find-objects': '/samples/danish/find%20objects/find-de-skjulte-objekter-1.webp',
    'grid-match': '/samples/danish/grid%20match/gitterpuslespil-1.webp',
    'matching': '/samples/danish/matching/find-parrene-1.webp',
    'math-puzzle': '/samples/danish/math%20puzzle/mattepuslespil-1.webp',
    'math-worksheet': '/samples/danish/math%20worksheet/matematikopgave-1.webp',
    'missing-pieces': '/samples/danish/missing%20pieces/manglende-dele-1.webp',
    'more-less': '/samples/danish/more%20less/mere-mindre-1.webp',
    'odd-one-out': '/samples/danish/odd%20one%20out/find-den-ulige-1.webp',
    'pattern-train': '/samples/danish/pattern%20train/mønstertoget-1.webp',
    'pattern-worksheet': '/samples/danish/pattern%20worksheet/mønstergåder-1.webp',
    'picture-path': '/samples/danish/picture%20path/billedsti-1.webp',
    'picture-sort': '/samples/danish/picture%20sort/sorter-billeder-1.webp',
    'prepositions': '/samples/danish/prepositions/præpositioner-1.webp',
    'shadow-match': '/samples/danish/shadow%20match/gør-billederne-hele-1.webp',
    'sudoku': '/samples/danish/sudoku/billede-sudoku-1.webp',
    'treasure-hunt': '/samples/danish/treasure%20hunt/skattejagt-1.webp',
    'word-guess': '/samples/danish/word%20guess/gæt-ordet-1.webp',
    'word-scramble': '/samples/danish/word%20scramble/bogstavrod-1.webp',
    'word-search': '/samples/danish/wordsearch/ordsøgning-1.webp',
    'writing': '/samples/danish/writing/writing.webp',
  },
  no: {
    'addition': '/samples/norwegian/addition/gøy-addisjon-1.webp',
    'image-addition': '/samples/norwegian/addition/gøy-addisjon-1.webp',
    'image-subtraction': '/samples/norwegian/subtraction/moro-med-subtraksjon-1.webp',
    'subtraction': '/samples/norwegian/subtraction/moro-med-subtraksjon-1.webp',
    'alphabet-train': '/samples/norwegian/alphabet%20train/alfabettog-1.webp',
    'big-small': '/samples/norwegian/big%20small/stort-eller-lite-1.webp',
    'bingo': '/samples/norwegian/bingo/bildebingo-1.webp',
    'chart-count': '/samples/norwegian/chart%20count/bildediagram-1.webp',
    'code-addition': '/samples/norwegian/code%20addition/hemmelig-kode-addisjon-1.webp',
    'coloring': '/samples/norwegian/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/norwegian/crossword/bildekryssord-1.webp',
    'cryptogram': '/samples/norwegian/cryptogram/bildekryptogram-1.webp',
    'draw-and-color': '/samples/norwegian/draw%20and%20color/tegn-og-fargelegg-1.webp',
    'drawing-lines': '/samples/norwegian/drawing%20lines/linjetegningøvelse-1.webp',
    'find-and-count': '/samples/norwegian/find%20and%20count/jeg-ser,-jeg-ser-1.webp',
    'find-objects': '/samples/norwegian/find%20objects/finn-de-skjulte-objektene-1.webp',
    'grid-match': '/samples/norwegian/grid%20match/rutenettspuslespill-1.webp',
    'matching': '/samples/norwegian/matching/finn-parene-1.webp',
    'math-puzzle': '/samples/norwegian/math%20puzzle/mattepuslespill-1.webp',
    'math-worksheet': '/samples/norwegian/math%20worksheet/matematikkoppgave-1.webp',
    'missing-pieces': '/samples/norwegian/missing%20pieces/manglende-deler-1.webp',
    'more-less': '/samples/norwegian/more%20less/mer-mindre-1.webp',
    'odd-one-out': '/samples/norwegian/odd%20one%20out/finn-den-rare-1.webp',
    'pattern-train': '/samples/norwegian/pattern%20train/mønstertoget-1.webp',
    'pattern-worksheet': '/samples/norwegian/pattern%20worksheet/mønstergåter-1.webp',
    'picture-path': '/samples/norwegian/picture%20path/bildesti-1.webp',
    'picture-sort': '/samples/norwegian/picture%20sort/sorter-bilder-1.webp',
    'prepositions': '/samples/norwegian/prepositions/preposisjoner-1.webp',
    'shadow-match': '/samples/norwegian/shadow%20match/fullfør-bildene-1.webp',
    'sudoku': '/samples/norwegian/sudoku/bilde-sudoku-1.webp',
    'treasure-hunt': '/samples/norwegian/treasure%20hunt/skattejakt-1.webp',
    'word-guess': '/samples/norwegian/word%20guess/gjett-ordet-1.webp',
    'word-scramble': '/samples/norwegian/word%20scramble/bokstavblanding-1.webp',
    'word-search': '/samples/norwegian/wordsearch/ordleting-1.webp',
    'writing': '/samples/norwegian/writing/writing.webp',
  },
  fi: {
    'addition': '/samples/finnish/addition/hauska-yhteenlasku-1.webp',
    'image-addition': '/samples/finnish/addition/hauska-yhteenlasku-1.webp',
    'image-subtraction': '/samples/finnish/subtraction/hauskaa-vähennyslaskua-1.webp',
    'subtraction': '/samples/finnish/subtraction/hauskaa-vähennyslaskua-1.webp',
    'alphabet-train': '/samples/finnish/alphabet%20train/aakkostjuna-1.webp',
    'big-small': '/samples/finnish/big%20small/iso-vai-pieni-1.webp',
    'bingo': '/samples/finnish/bingo/kuvabingo-1.webp',
    'chart-count': '/samples/finnish/chart%20count/kuvakaavio-1.webp',
    'code-addition': '/samples/finnish/code%20addition/salainen-koodi-yhteenlasku-1.webp',
    'coloring': '/samples/finnish/coloring/coloring-portrait-1.webp',
    'crossword': '/samples/finnish/crossword/kuvaristikko-1.webp',
    'cryptogram': '/samples/finnish/cryptogram/kuvakryptogrammi-1.webp',
    'draw-and-color': '/samples/finnish/draw%20and%20color/piirrä-ja-väritä-1.webp',
    'drawing-lines': '/samples/finnish/drawing%20lines/viivojen-piirtämisharjoitus-1.webp',
    'find-and-count': '/samples/finnish/find%20and%20count/minä-näen-1.webp',
    'find-objects': '/samples/finnish/find%20objects/löydä-piilotetut-esineet-1.webp',
    'grid-match': '/samples/finnish/grid%20match/ruudukkopalapeli-1.webp',
    'matching': '/samples/finnish/matching/yhdistä-parit-1.webp',
    'math-puzzle': '/samples/finnish/math%20puzzle/matematiikkapulmat-1.webp',
    'math-worksheet': '/samples/finnish/math%20worksheet/matematiikkalehti-1.webp',
    'missing-pieces': '/samples/finnish/missing%20pieces/puuttuvat-palat-1.webp',
    'more-less': '/samples/finnish/more%20less/enemmän-vähemmän-1.webp',
    'odd-one-out': '/samples/finnish/odd%20one%20out/löydä-outo-lintu-1.webp',
    'pattern-train': '/samples/finnish/pattern%20train/kuviojuna-1.webp',
    'pattern-worksheet': '/samples/finnish/pattern%20worksheet/kuviotehtävät-1.webp',
    'picture-path': '/samples/finnish/picture%20path/kuvapolku-2.webp',
    'picture-sort': '/samples/finnish/picture%20sort/lajittele-kuvat-1.webp',
    'prepositions': '/samples/finnish/prepositions/prepositiot-1.webp',
    'shadow-match': '/samples/finnish/shadow%20match/täydennä-kuvat-1.webp',
    'sudoku': '/samples/finnish/sudoku/kuva-sudoku-1.webp',
    'treasure-hunt': '/samples/finnish/treasure%20hunt/aarteenetsintä-1.webp',
    'word-guess': '/samples/finnish/word%20guess/arvaa-sana-1.webp',
    'word-scramble': '/samples/finnish/word%20scramble/kirjainsekoitus-1.webp',
    'word-search': '/samples/finnish/wordsearch/sanahaku-1.webp',
    'writing': '/samples/finnish/writing/writing.webp',
  },
};

function getAppHeroImage(appId: string, locale: string): string | undefined {
  return appHeroImagesByLocale[locale]?.[appId] || appHeroImagesByLocale.en[appId];
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllIdeaPageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const config = getIdeaConfigBySlug(slug);
    if (!config) return {};

    const content = await getIdeaContent(config.ideaId, locale);
    const alternateUrls = getIdeaAlternateUrls(config.ideaId, baseUrl);
    const localeSlug = getIdeaSlugForLocale(config.ideaId, locale);

    const title = content?.seo?.titleTag || `${config.ideaId} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || getIdeaFallbackDescription(locale);

    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...(content.seo.secondaryKeywords || []), ...(content.seo.lsiKeywords || [])]
      : undefined;

    // Canonical image: showcase hero first (matching JSON-LD), then themeImages
    const ideaShowcaseConfig = getPageShowcaseConfig('idea', config.ideaId, locale);
    const canonicalImagePath = ideaShowcaseConfig?.hero?.images?.[0]?.src
      ? encodeImagePath(ideaShowcaseConfig.hero.images[0].src)
      : content?.themeImages?.[0]?.src
        ? encodeImagePath(content.themeImages[0].src)
        : null;
    const canonicalImageAlt = ideaShowcaseConfig?.hero?.images?.[0]?.alt
      || content?.themeImages?.[0]?.alt
      || title;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `${baseUrl}/${locale}/ideas/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/${locale}/ideas/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
        images: [
          ...(canonicalImagePath ? [{
            url: `${baseUrl}${canonicalImagePath}`,
            width: 2480,
            height: 3508,
            alt: canonicalImageAlt,
          }] : []),
          { url: `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(title)}`, width: 1200, height: 630, alt: title },
          ...(content?.themeImages?.slice(1, 4).map((img: { src: string; alt: string }) => ({
            url: `${baseUrl}${encodeImagePath(img.src)}`,
            width: 2480,
            height: 3508,
            alt: img.alt,
          })) || []),
        ],
        videos: content?.youtubeId ? [{ url: `https://www.youtube.com/watch?v=${content.youtubeId}`, type: 'text/html', width: 1280, height: 720 }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [canonicalImagePath
          ? `${baseUrl}${canonicalImagePath}`
          : `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(title)}`],
      },
    };
  } catch {
    return {};
  }
}

export default async function IdeaPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const config = getIdeaConfigBySlug(slug);
  if (!config) notFound();

  const content = await getIdeaContent(config.ideaId, locale);

  // Look up visual showcase config (EN + DE + FR + ES + PT)
  const showcaseConfig = (locale === 'en' || locale === 'de' || locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'it' || locale === 'nl' || locale === 'sv' || locale === 'da' || locale === 'no' || locale === 'fi')
    ? getPageShowcaseConfig('idea', config.ideaId, locale)
    : null;

  // Override English hero heading with localized content title
  if (showcaseConfig && content) {
    showcaseConfig.hero.heading = content.hero.title;
  }

  if (content) {
    const localeSlug = getIdeaSlugForLocale(config.ideaId, locale);
    const pageUrl = `${baseUrl}/${locale}/ideas/${localeSlug || slug}`;

    const ideaHeroImage = showcaseConfig?.hero?.images?.[0]?.src;
    const primaryImageUrl = ideaHeroImage
      ? `${baseUrl}${encodeImagePath(ideaHeroImage)}`
      : content.themeImages?.[0]?.src
        ? `${baseUrl}${encodeImagePath(content.themeImages[0].src)}`
        : content.productIdeas?.[0]?.appId && getAppHeroImage(content.productIdeas[0].appId, locale)
          ? `${baseUrl}${encodeImagePath(getAppHeroImage(content.productIdeas[0].appId, locale)!)}`
          : null;
    const ogImageUrl = `${baseUrl}/api/og?locale=${locale}&type=idea&title=${encodeURIComponent(content.hero.title)}`;
    const isRealImage = !!primaryImageUrl;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: content.hero.title,
      description: content.hero.description,
      url: pageUrl,
      image: primaryImageUrl
        ? [primaryImageUrl, ogImageUrl]
        : [ogImageUrl],
      inLanguage: getHreflangCode(locale),
      publisher: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl },
      author: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl },
      datePublished: '2026-02-27',
      dateModified: '2026-03-20',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-headline', '.speakable-summary'] },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `${baseUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: getSectionLabel('businessIdeas', locale), item: `${baseUrl}/${locale}/ideas` },
        { '@type': 'ListItem', position: 3, name: content.hero.title },
      ],
    };

    // WebPage schema with primaryImageOfPage — aligns Google's thumbnail signal
    const ideaImageCaption = showcaseConfig?.hero?.images?.[0]?.alt
      || content.themeImages?.[0]?.alt
      || content.hero.title;
    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: content.hero.title,
      description: content.hero.description,
      isPartOf: { '@type': 'WebSite', '@id': `${baseUrl}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: primaryImageUrl || ogImageUrl,
        contentUrl: primaryImageUrl || ogImageUrl,
        caption: ideaImageCaption,
        width: isRealImage ? 2480 : 1200,
        height: isRealImage ? 3508 : 630,
      },
      mainEntity: { '@id': `${pageUrl}#article` },
      inLanguage: getHreflangCode(locale),
    };

    const schemas: object[] = [webPageSchema, articleSchema, breadcrumbSchema];
    if (content.faq?.length) {
      schemas.push(generateFAQSchema(content.faq, locale, pageUrl));
    }

    // Hero image for placement below H1 (Google thumbnail signal)
    const ideaHeroImgSrc = showcaseConfig?.hero?.images?.[0]?.src
      || content.themeImages?.[0]?.src
      || (content.productIdeas?.[0]?.appId ? getAppHeroImage(content.productIdeas[0].appId, locale) : undefined);
    const ideaHeroImgAlt = showcaseConfig?.hero?.images?.[0]?.alt
      || content.themeImages?.[0]?.alt
      || content.hero.title;

    return (
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        {content?.youtubeId && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVideoSchema({
              name: content.videoTitle || content.hero.title,
              description: content.seo?.metaDescription || content.hero.description,
              youtubeId: content.youtubeId,
            })) }}
          />
        )}
        {content.themeImages && content.themeImages.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(
              content.themeImages.slice(0, 6).map(img => ({
                '@context': 'https://schema.org',
                '@type': 'ImageObject',
                contentUrl: `${baseUrl}${encodeImagePath(img.src)}`,
                name: img.alt,
                caption: img.caption || img.alt,
                encodingFormat: 'image/webp',
                width: 2480,
                height: 3508,
                license: `${baseUrl}/${locale}/license`,
                acquireLicensePage: pageUrl,
                creditText: 'LessonCraftStudio',
                creator: { '@type': 'Organization', name: 'LessonCraftStudio' },
                copyrightHolder: { '@type': 'Organization', name: 'LessonCraftStudio' },
                copyrightNotice: '© LessonCraftStudio',
              }))
            ) }}
          />
        )}
        {/* ImageGallery schema for theme images */}
        {(() => {
          const gallerySchema = generateImageGallerySchema(
            (content.themeImages || []).slice(0, 6),
            `${content.hero.title} - Sample Worksheets`,
            locale,
            pageUrl,
          );
          return gallerySchema ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
          ) : null;
        })()}
        {/* ImageObject schemas for showcase images (hero, tiered, spotlight, gallery) */}
        {(() => {
          const themeUrls = new Set((content.themeImages || []).slice(0, 6).map(img => `${baseUrl}${encodeImagePath(img.src)}`));
          const showcaseSchemas = generateShowcaseImageSchemas(showcaseConfig, locale, pageUrl, themeUrls);
          return showcaseSchemas.length > 0 ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseSchemas) }} />
          ) : null;
        })()}
        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href={`/${locale}/ideas`} className="hover:text-amber-600">{getSectionLabel('nicheIdeas', locale)}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{content.hero.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <ReadMoreText text={content.hero.description} locale={locale} className="text-lg text-gray-600" lines={5} />
            {/* Hero image below H1 — Google thumbnail signal */}
            {ideaHeroImgSrc && (
              <div className="mt-8 rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeImagePath(ideaHeroImgSrc)}
                  alt={ideaHeroImgAlt}
                  width={800}
                  height={1132}
                  className="w-full h-auto"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            )}
          </div>
        </section>

        {/* Visual Showcase 1 — Hero */}
        {showcaseConfig && <WorksheetShowcaseSection config={showcaseConfig.hero} />}

        {/* Video */}
        {content.youtubeId && (
          <div className="container mx-auto px-4 max-w-3xl mt-8">
            <VideoFacade
              videoId={content.youtubeId}
              title={content.videoTitle || content.hero.title}
            />
          </div>
        )}

        {/* CTA 1 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              {getSectionLabel('ctaTryFree', locale)}
            </Link>
            <p className="text-sm text-gray-500 mt-2">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
          </div>
        </section>

        {/* Market Overview */}
        {content.marketOverview && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{getSectionLabel('marketOverview', locale)}</h2>
              <ReadMoreText text={content.marketOverview} locale={locale} className="text-gray-700 leading-relaxed" preserveWhitespace lines={12} />
            </div>
          </section>
        )}

        {/* Product Ideas */}
        {content.productIdeas && content.productIdeas.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('productIdeas', locale)}</h2>
              <div className="space-y-4">
                {content.productIdeas.map((idea, i) => (
                  <div key={i} className="p-5 bg-white rounded-lg border border-gray-200 flex gap-4">
                    {getAppHeroImage(idea.appId, locale) && (
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={encodeImagePath(getAppHeroImage(idea.appId, locale)!)}
                          alt={idea.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                      <ReadMoreText text={idea.description} locale={locale} className="text-gray-600 text-sm mt-1" />
                      {isValidAppId(idea.appId) && (
                        <div className="mt-2">
                          <BuyButton appId={idea.appId as AppId} locale={locale} variant="compact" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visual Showcase 2 — Features */}
        {showcaseConfig && <TieredShowcaseSection config={showcaseConfig.tiered} />}

        {/* Theme Images */}
        {content.themeImages && content.themeImages.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('themeImages', locale)}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {content.themeImages.map((img, i) => (
                  <figure key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={encodeImagePath(img.src)}
                      alt={img.alt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="p-2 text-xs text-gray-600 text-center">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Visual Showcase 3 — Progression */}
        {showcaseConfig && <SpotlightSection config={showcaseConfig.spotlight} />}

        {/* Platform Tips */}
        {content.platformTips && content.platformTips.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('sellingTips', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.platformTips.map((tip, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{tip.platform}</span>
                    <h3 className="font-semibold text-gray-900 mt-2">{tip.title}</h3>
                    <ReadMoreText text={tip.description} locale={locale} className="text-gray-600 text-sm mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA 2 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>

        {/* Visual Showcase 4 — Fun */}
        {showcaseConfig && <GallerySection config={showcaseConfig.gallery} />}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('faq', locale)}</h2>
              <div className="space-y-4">
                {content.faq.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg bg-white">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900">
                      {faq.question}
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4">
                      <ReadMoreText text={faq.answer} locale={locale} className="text-gray-600" lines={8} />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links */}
        {content.internalLinks && content.internalLinks.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('related', locale)}</h2>
              <div className="flex flex-wrap gap-3">
                {content.internalLinks.filter(link => isValidInternalLink(link.pageType, link.slug)).map((link, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/${link.pageType === 'app' ? 'apps' : link.pageType === 'tool' ? 'tools' : link.pageType === 'bundle' ? 'bundles' : link.pageType === 'start' ? 'start' : link.pageType === 'guide' ? 'guides' : 'ideas'}/${link.slug}`}
                    className="text-sm text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full"
                  >
                    {link.anchorText}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA 3 - Final */}
        <section className="py-12 md:py-16 bg-amber-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{getSectionLabel('ctaReadyToStart', locale)}</h2>
            <p className="text-amber-100 mb-8 max-w-lg mx-auto">{getSectionLabel('ctaTryFreeDesc', locale)}</p>
            <Link
              href={`/${locale}/apps`}
              className="inline-flex items-center px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
            >
              {getSectionLabel('ctaBrowseAll', locale)}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getSectionLabel('nicheIdeas', locale)}</h1>
          <p className="text-gray-600 mb-8">{getSectionLabel('comingSoon', locale)}</p>
          <Link href={`/${locale}/ideas`} className="text-indigo-600 hover:text-indigo-700 font-medium">
            {getSectionLabel('ctaExploreIdeas', locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
