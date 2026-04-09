/**
 * spanish-showcase-images.ts — Spanish image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Spanish sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/spanish/{folder}/{filename}
 *
 * NOTE: Some files on the server use Latin-1 encoding for accented characters.
 * This config uses correct UTF-8 characters. Files with encoding mismatches
 * will need server-side renaming to display correctly.
 */

export interface SpanishImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const spanishImages: Record<string, SpanishImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'suma-divertida-1.webp',
      'suma-divertida-2.webp',
      'suma-divertida-3.webp',
      'suma-divertida-4.webp',
      'suma-divertida-5.webp',
      'suma-divertida-1.webp',
    ],
    answerKey: 'suma-divertida-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'restas-divertidas-1.webp',
      'restas-divertidas-2.webp',
      'restas-divertidas-3.webp',
      'restas-divertidas-4.webp',
      'restas-divertidas-5.webp',
      'restas-divertidas-1.webp',
    ],
    answerKey: 'restas-divertidas-1-answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'código-secreto-suma-1.webp',
      'código-secreto-suma-2.webp',
      'código-secreto-suma-3.webp',
      'código-secreto-suma-4.webp',
      'código-secreto-suma-1.webp',
      'código-secreto-suma-2.webp',
    ],
    answerKey: 'código-secreto-suma-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'más-menos-1.webp',
      'más-menos-2.webp',
      'más-menos-3.webp',
      'más-menos-4.webp',
      'más-menos-1.webp',
      'más-menos-2.webp',
    ],
    answerKey: 'más-menos-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'rompecabezas-matemáticos-1.webp',
      'rompecabezas-matemáticos-2.webp',
      'rompecabezas-matemáticos-3.webp',
      'rompecabezas-matemáticos-4.webp',
      'rompecabezas-matemáticos-1.webp',
      'rompecabezas-matemáticos-2.webp',
    ],
    answerKey: 'rompecabezas-matemáticos-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'hoja-de-matemáticas-1.webp',
      'hoja-de-matemáticas-2.webp',
      'hoja-de-matemáticas-3.webp',
      'hoja-de-matemáticas-4.webp',
      'hoja-de-matemáticas-1.webp',
      'hoja-de-matemáticas-2.webp',
    ],
    answerKey: 'hoja-de-matemáticas-1-answer-key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'tren-del-alfabeto-1.webp',
      'tren-del-alfabeto-2.webp',
      'tren-del-alfabeto-3.webp',
      'tren-del-alfabeto-4.webp',
      'tren-del-alfabeto-1.webp',
      'tren-del-alfabeto-2.webp',
    ],
    answerKey: 'tren-del-alfabeto-1-answer-key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'preposiciones-1.webp',
      'preposiciones-2.webp',
      'preposiciones-3.webp',
      'preposiciones-4.webp',
      'preposiciones-1.webp',
      'preposiciones-2.webp',
    ],
    answerKey: 'preposiciones-1-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'adivina-la-palabra-1.webp',
      'adivina-la-palabra-2.webp',
      'adivina-la-palabra-3.webp',
      'adivina-la-palabra-4.webp',
      'adivina-la-palabra-1.webp',
      'adivina-la-palabra-2.webp',
    ],
    answerKey: 'adivina-la-palabra-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'palabras-revueltas-1.webp',
      'palabras-revueltas-2.webp',
      'palabras-revueltas-3.webp',
      'palabras-revueltas-4.webp',
      'palabras-revueltas-5.webp',
      'palabras-revueltas-1.webp',
    ],
    answerKey: 'palabras-revueltas-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'sopa-de-letras-1.webp',
      'sopa-de-letras-2.webp',
      'sopa-de-letras-3.webp',
      'sopa-de-letras-4.webp',
      'sopa-de-letras-1.webp',
      'sopa-de-letras-2.webp',
    ],
    answerKey: 'sopa-de-letras-1-answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'criptograma-de-dibujos-1.webp',
      'criptograma-de-dibujos-2.webp',
      'criptograma-de-dibujos-3.webp',
      'criptograma-de-dibujos-4.webp',
      'criptograma-de-dibujos-5.webp',
      'criptograma-de-dibujos-1.webp',
    ],
    answerKey: 'criptograma-de-dibujos-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'crucigrama-con-dibujos-1.webp',
      'crucigrama-con-dibujos-2.webp',
      'crucigrama-con-dibujos-3.webp',
      'crucigrama-con-dibujos-4.webp',
      'crucigrama-con-dibujos-1.webp',
      'crucigrama-con-dibujos-2.webp',
    ],
    answerKey: 'crucigrama-con-dibujos-1-answer-key.webp',
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing.webp',
      'writing-beginning-letter.webp',
      'writing-custom.webp',
      'writing.webp',
      'writing-beginning-letter.webp',
      'writing-custom.webp',
    ],
    answerKey: 'writing.webp',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'grande-o-pequeño-1.webp',
      'grande-o-pequeño-2.webp',
      'grande-o-pequeño-3.webp',
      'grande-o-pequeño-4.webp',
      'grande-o-pequeño-1.webp',
      'grande-o-pequeño-2.webp',
    ],
    answerKey: 'grande-o-pequeño-1-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'tren-de-patrones-1.webp',
      'tren-de-patrones-2.webp',
      'tren-de-patrones-3.webp',
      'tren-de-patrones-4.webp',
      'tren-de-patrones-5.webp',
      'tren-de-patrones-6.webp',
    ],
    answerKey: 'tren-de-patrones-1-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'rompecabezas-de-patrones-1.webp',
      'rompecabezas-de-patrones-2.webp',
      'rompecabezas-de-patrones-3.webp',
      'rompecabezas-de-patrones-4.webp',
      'rompecabezas-de-patrones-5.webp',
      'rompecabezas-de-patrones-6.webp',
    ],
    answerKey: 'rompecabezas-de-patrones-1-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'dibuja-y-colorea-1.webp',
      'dibuja-y-colorea-2.webp',
      'dibuja-y-colorea-3.webp',
      'dibuja-y-colorea-4.webp',
      'dibuja-y-colorea-5.webp',
      'dibuja-y-colorea-6.webp',
    ],
    answerKey: 'dibuja-y-colorea-1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'practica-de-dibujar-línea-1.webp',
      'practica-de-dibujar-línea-2.webp',
      'practica-de-dibujar-línea-3.webp',
      'practica-de-dibujar-línea-4.webp',
      'practica-de-dibujar-línea-5.webp',
      'practica-de-dibujar-línea-6.webp',
    ],
    answerKey: 'practica-de-dibujar-línea-1.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring-portrait-1.webp',
      'coloring-portrait-2.webp',
      'coloring-portrait-3.webp',
      'coloring-portrait-4.webp',
      'coloring-portrait-5.webp',
      'coloring-portrait-6.webp',
    ],
    answerKey: 'coloring-portrait-1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'gráfico-de-dibujos-1.webp',
      'gráfico-de-dibujos-2.webp',
      'gráfico-de-dibujos-3.webp',
      'gráfico-de-dibujos-4.webp',
      'gráfico-de-dibujos-5.webp',
      'gráfico-de-dibujos-1.webp',
    ],
    answerKey: 'gráfico-de-dibujos-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'encuentra-parejas-1.webp',
      'encuentra-parejas-2.webp',
      'encuentra-parejas-3.webp',
      'encuentra-parejas-4.webp',
      'encuentra-parejas-1.webp',
      'encuentra-parejas-2.webp',
    ],
    answerKey: 'encuentra-parejas-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'puzzle-de-cuadrícula-1.webp',
      'puzzle-de-cuadrícula-2.webp',
      'puzzle-de-cuadrícula-3.webp',
      'puzzle-de-cuadrícula-4.webp',
      'puzzle-de-cuadrícula-1.webp',
      'puzzle-de-cuadrícula-2.webp',
    ],
    answerKey: 'puzzle-de-cuadrícula-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'empareja-las-sombras-1.webp',
      'empareja-las-sombras-2.webp',
      'empareja-las-sombras-3.webp',
      'empareja-las-sombras-4.webp',
      'shadow-match-worksheet.webp',
      'empareja-las-sombras-1.webp',
    ],
    answerKey: 'empareja-las-sombras-1-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bingo-de-imágenes-1.webp',
      'bingo-de-imágenes-2.webp',
      'bingo-de-imágenes-3.webp',
      'bingo-de-imágenes-4.webp',
      'bingo-de-imágenes-5.webp',
      'bingo-de-imágenes-1.webp',
    ],
    answerKey: 'bingo-de-imágenes-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'clasificación-de-imágenes-1.webp',
      'clasificación-de-imágenes-2.webp',
      'clasificación-de-imágenes-3.webp',
      'clasificación-de-imágenes-4.webp',
      'clasificación-de-imágenes-1.webp',
      'clasificación-de-imágenes-2.webp',
    ],
    answerKey: 'clasificación-de-imágenes-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'piezas-perdidas-1.webp',
      'piezas-perdidas-2.webp',
      'piezas-perdidas-3.webp',
      'piezas-perdidas-4.webp',
      'piezas-perdidas-5.webp',
      'piezas-perdidas-1.webp',
    ],
    answerKey: 'piezas-perdidas-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'encuentra-el-diferente-1-v7.webp',
      'encuentra-el-diferente-2-v8.webp',
      'encuentra-el-diferente-3.webp',
      'encuentra-el-diferente-4.webp',
      'encuentra-el-diferente-1-v7.webp',
      'encuentra-el-diferente-2-v8.webp',
    ],
    answerKey: 'encuentra-el-diferente-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'sudoku-de-imágenes-1.webp',
      'sudoku-de-imágenes-2.webp',
      'sudoku-de-imágenes-3.webp',
      'sudoku-de-imágenes-4.webp',
      'sudoku-de-imágenes-1.webp',
      'sudoku-de-imágenes-2.webp',
    ],
    answerKey: 'sudoku-de-imágenes-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'camino-de-imágenes-1.webp',
      'camino-de-imágenes-2.webp',
      'camino-de-imágenes-3.webp',
      'camino-de-imágenes-4.webp',
      'camino-de-imágenes-5.webp',
      'camino-de-imágenes-1.webp',
    ],
    answerKey: 'camino-de-imágenes-1-answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'veo-veo-1.webp',
      'veo-veo-2.webp',
      'veo-veo-3.webp',
      'veo-veo-4.webp',
      'veo-veo-1.webp',
      'veo-veo-2.webp',
    ],
    answerKey: 'veo-veo-1-answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'encuentra-el-diferente-1-v7.webp',
      'encuentra-el-diferente-2-v8.webp',
      'encuentra-el-diferente-3.webp',
      'encuentra-el-diferente-1.webp',
      'encuentra-el-diferente-2.webp',
      'encuentra-el-diferente.webp',
    ],
    answerKey: 'encuentra-el-diferente-1-answer-key-v6.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'búsqueda-del-tesoro-1.webp',
      'búsqueda-del-tesoro-2.webp',
      'búsqueda-del-tesoro-3.webp',
      'búsqueda-del-tesoro-4.webp',
      'búsqueda-del-tesoro-1.webp',
      'búsqueda-del-tesoro-2.webp',
    ],
    answerKey: 'búsqueda-del-tesoro-1-answer-key.webp',
  },
};
