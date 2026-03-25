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
      'Suma Divertida 1.webp',
      'Suma Divertida 2.webp',
      'Suma Divertida 3.webp',
      'Suma Divertida 4.webp',
      'Suma Divertida 5.webp',
      'Suma Divertida 1.webp',
    ],
    answerKey: 'Suma Divertida 1 answer_key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Restas Divertidas 1.webp',
      'Restas Divertidas 2.webp',
      'Restas Divertidas 3.webp',
      'Restas Divertidas 4.webp',
      'Restas Divertidas 5.webp',
      'Restas Divertidas 1.webp',
    ],
    answerKey: 'Restas Divertidas 1 answer_key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Código Secreto Suma 1.webp',
      'Código Secreto Suma 2.webp',
      'Código Secreto Suma 3.webp',
      'Código Secreto Suma 4.webp',
      'Código Secreto Suma 1.webp',
      'Código Secreto Suma 2.webp',
    ],
    answerKey: 'Código Secreto Suma 1 answer_key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Más Menos 1.webp',
      'Más Menos 2.webp',
      'Más Menos 3.webp',
      'Más Menos 4.webp',
      'Más Menos 1.webp',
      'Más Menos 2.webp',
    ],
    answerKey: 'Más Menos 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Rompecabezas Matemáticos 1.webp',
      'Rompecabezas Matemáticos 2.webp',
      'Rompecabezas Matemáticos 3.webp',
      'Rompecabezas Matemáticos 4.webp',
      'Rompecabezas Matemáticos 1.webp',
      'Rompecabezas Matemáticos 2.webp',
    ],
    answerKey: 'Rompecabezas Matemáticos 1 answer_key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'Hoja de Matemáticas 1.webp',
      'Hoja de Matemáticas 2.webp',
      'Hoja de Matemáticas 3.webp',
      'Hoja de Matemáticas 4.webp',
      'Hoja de Matemáticas 1.webp',
      'Hoja de Matemáticas 2.webp',
    ],
    answerKey: 'Hoja de Matemáticas 1 answer_key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'Tren del Alfabeto 1.webp',
      'Tren del Alfabeto 2.webp',
      'Tren del Alfabeto 3 .webp',
      'Tren del Alfabeto 4.webp',
      'Tren del Alfabeto 1.webp',
      'Tren del Alfabeto 2.webp',
    ],
    answerKey: 'Tren del Alfabeto 1 answer_key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'Preposiciones 1.webp',
      'Preposiciones 2.webp',
      'Preposiciones 3.webp',
      'Preposiciones 4.webp',
      'Preposiciones 1.webp',
      'Preposiciones 2.webp',
    ],
    answerKey: 'Preposiciones 1 answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Adivina la Palabra 1.webp',
      'Adivina la Palabra 2.webp',
      'Adivina la Palabra 3.webp',
      'Adivina la Palabra 4.webp',
      'Adivina la Palabra 1.webp',
      'Adivina la Palabra 2.webp',
    ],
    answerKey: 'Adivina la Palabra 1 answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Palabras Revueltas 1.webp',
      'Palabras Revueltas 2.webp',
      'Palabras Revueltas 3.webp',
      'Palabras Revueltas 4.webp',
      'Palabras Revueltas 5.webp',
      'Palabras Revueltas 1.webp',
    ],
    answerKey: 'Palabras Revueltas 1 answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Sopa de Letras 1.webp',
      'Sopa de Letras 2.webp',
      'Sopa de Letras 3.webp',
      'Sopa de Letras 4.webp',
      'Sopa de Letras 1.webp',
      'Sopa de Letras 2.webp',
    ],
    answerKey: 'Sopa de Letras 1 answer_key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Criptograma de Dibujos 1.webp',
      'Criptograma de Dibujos 2.webp',
      'Criptograma de Dibujos 3.webp',
      'Criptograma de Dibujos 4.webp',
      'Criptograma de Dibujos 5.webp',
      'Criptograma de Dibujos 1.webp',
    ],
    answerKey: 'Criptograma de Dibujos 1 answer_key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'Crucigrama con Dibujos 1.webp',
      'Crucigrama con Dibujos 2.webp',
      'Crucigrama con Dibujos 3.webp',
      'Crucigrama con Dibujos 4.webp',
      'Crucigrama con Dibujos 1.webp',
      'Crucigrama con Dibujos 2.webp',
    ],
    answerKey: 'Crucigrama con Dibujos 1 answer_key.webp',
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing.webp',
      'writing beginning letter.webp',
      'writing custom.webp',
      'writing.webp',
      'writing beginning letter.webp',
      'writing custom.webp',
    ],
    answerKey: 'writing.webp',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'Grande o Pequeño 1.webp',
      'Grande o Pequeño 2.webp',
      'Grande o Pequeño 3.webp',
      'Grande o Pequeño 4.webp',
      'Grande o Pequeño 1.webp',
      'Grande o Pequeño 2.webp',
    ],
    answerKey: 'Grande o Pequeño 1 answer_key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Tren de Patrones 1.webp',
      'Tren de Patrones 2.webp',
      'Tren de Patrones 3.webp',
      'Tren de Patrones 4.webp',
      'Tren de Patrones 5.webp',
      'Tren de Patrones 6.webp',
    ],
    answerKey: 'Tren de Patrones 1 answer_key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Rompecabezas de Patrones 1.webp',
      'Rompecabezas de Patrones 2.webp',
      'Rompecabezas de Patrones 3.webp',
      'Rompecabezas de Patrones 4.webp',
      'Rompecabezas de Patrones 5.webp',
      'Rompecabezas de Patrones 6.webp',
    ],
    answerKey: 'Rompecabezas de Patrones 1 answer_key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Dibuja y Colorea 1.webp',
      'Dibuja y Colorea 2.webp',
      'Dibuja y Colorea 3.webp',
      'Dibuja y Colorea 4.webp',
      'Dibuja y Colorea 5.webp',
      'Dibuja y Colorea 6.webp',
    ],
    answerKey: 'Dibuja y Colorea 1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'Practica de Dibujar Línea 1.webp',
      'Practica de Dibujar Línea 2.webp',
      'Practica de Dibujar Línea 3.webp',
      'Practica de Dibujar Línea 4.webp',
      'Practica de Dibujar Línea 5.webp',
      'Practica de Dibujar Línea 6.webp',
    ],
    answerKey: 'Practica de Dibujar Línea 1.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring portrait 1.webp',
      'coloring portrait 2.webp',
      'coloring portrait 3.webp',
      'coloring portrait 4.webp',
      'coloring portrait 5.webp',
      'coloring portrait 6.webp',
    ],
    answerKey: 'coloring portrait 1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'Gráfico de Dibujos 1.webp',
      'Gráfico de Dibujos 2.webp',
      'Gráfico de Dibujos 3.webp',
      'Gráfico de Dibujos 4.webp',
      'Gráfico de Dibujos 5.webp',
      'Gráfico de Dibujos 1.webp',
    ],
    answerKey: 'Gráfico de Dibujos 1 answer_key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Encuentra Parejas 1.webp',
      'Encuentra Parejas 2.webp',
      'Encuentra Parejas 3.webp',
      'Encuentra Parejas 4.webp',
      'Encuentra Parejas 1.webp',
      'Encuentra Parejas 2.webp',
    ],
    answerKey: 'Encuentra Parejas 1 answer_key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Puzzle de Cuadrícula 1.webp',
      'Puzzle de Cuadrícula 2.webp',
      'Puzzle de Cuadrícula 3.webp',
      'Puzzle de Cuadrícula 4.webp',
      'Puzzle de Cuadrícula 1.webp',
      'Puzzle de Cuadrícula 2.webp',
    ],
    answerKey: 'Puzzle de Cuadrícula 1 answer_key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Empareja las Sombras 1.webp',
      'Empareja las Sombras 2.webp',
      'Empareja las Sombras 3.webp',
      'Empareja las Sombras 4.webp',
      'shadow-match-worksheet.webp',
      'Empareja las Sombras 1.webp',
    ],
    answerKey: 'Empareja las Sombras 1 answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'Bingo de Imágenes 1.webp',
      'Bingo de Imágenes 2.webp',
      'Bingo de Imágenes 3 .webp',
      'Bingo de Imágenes 4.webp',
      'Bingo de Imágenes 5.webp',
      'Bingo de Imágenes 1.webp',
    ],
    answerKey: 'Bingo de Imágenes 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'Clasificación de Imágenes 1.webp',
      'Clasificación de Imágenes 2.webp',
      'Clasificación de Imágenes 3.webp',
      'Clasificación de Imágenes 4.webp',
      'Clasificación de Imágenes 1.webp',
      'Clasificación de Imágenes 2.webp',
    ],
    answerKey: 'Clasificación de Imágenes 1 answer_key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Piezas Perdidas 1.webp',
      'Piezas Perdidas 2.webp',
      'Piezas Perdidas 3.webp',
      'Piezas Perdidas 4.webp',
      'Piezas Perdidas 5.webp',
      'Piezas Perdidas 1.webp',
    ],
    answerKey: 'Piezas Perdidas 1 answer_key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Encuentra el Diferente 1.webp',
      'Encuentra el Diferente 2.webp',
      'Encuentra el Diferente 3.webp',
      'Encuentra el Diferente 4.webp',
      'Encuentra el Diferente 1.webp',
      'Encuentra el Diferente 2.webp',
    ],
    answerKey: 'Encuentra el Diferente 1 answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Sudoku de Imágenes 1.webp',
      'Sudoku de Imágenes 2.webp',
      'Sudoku de Imágenes 3.webp',
      'Sudoku de Imágenes 4.webp',
      'Sudoku de Imágenes 1.webp',
      'Sudoku de Imágenes 2.webp',
    ],
    answerKey: 'Sudoku de Imágenes 1 answer_key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Camino de Imágenes 1.webp',
      'Camino de Imágenes 2.webp',
      'Camino de Imágenes 3.webp',
      'Camino de Imágenes 4.webp',
      'Camino de Imágenes 5.webp',
      'Camino de Imágenes 1.webp',
    ],
    answerKey: 'Camino de Imágenes 1 answer_key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Veo Veo 1.webp',
      'Veo Veo 2.webp',
      'Veo Veo 3.webp',
      'Veo Veo 4.webp',
      'Veo Veo 1.webp',
      'Veo Veo 2.webp',
    ],
    answerKey: 'Veo Veo 1 answer_key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'Encuentra el Diferente 1.webp',
      'Encuentra el Diferente 2.webp',
      'Encuentra el Diferente 3.webp',
      'Encuentra el Diferente (1).webp',
      'Encuentra el Diferente (2).webp',
      'Encuentra el Diferente.webp',
    ],
    answerKey: 'Encuentra el Diferente 1 answer_key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Búsqueda del Tesoro 1.webp',
      'Búsqueda del Tesoro 2.webp',
      'Búsqueda del Tesoro 3.webp',
      'Búsqueda del Tesoro 4.webp',
      'Búsqueda del Tesoro 1.webp',
      'Búsqueda del Tesoro 2.webp',
    ],
    answerKey: 'Búsqueda del Tesoro 1 answer_key.webp',
  },
};
