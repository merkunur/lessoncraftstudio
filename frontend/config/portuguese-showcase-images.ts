/**
 * portuguese-showcase-images.ts — Portuguese image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Portuguese sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/portuguese/{folder}/{filename}
 */

export interface PortugueseImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const portugueseImages: Record<string, PortugueseImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'adição-divertida-1.webp',
      'adição-divertida-2.webp',
      'adição-divertida-3.webp',
      'adição-divertida-4.webp',
      'adição-divertida-5.webp',
      'adição-divertida-1.webp',
    ],
    answerKey: 'adição-divertida-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'subtrações-divertidas-1.webp',
      'subtrações-divertidas-2.webp',
      'subtrações-divertidas-3.webp',
      'subtrações-divertidas-4.webp',
      'subtrações-divertidas-1.webp',
      'subtrações-divertidas-2.webp',
    ],
    answerKey: 'subtrações-divertidas-1-answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'código-secreto-adição-1.webp',
      'código-secreto-adição-2.webp',
      'código-secreto-adição-3.webp',
      'código-secreto-adição-4.webp',
      'código-secreto-adição-1.webp',
      'código-secreto-adição-2.webp',
    ],
    answerKey: 'código-secreto-adição-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'mais-menos-1.webp',
      'mais-menos-2.webp',
      'mais-menos-3.webp',
      'mais-menos-4.webp',
      'mais-menos-5.webp',
      'mais-menos-1.webp',
    ],
    answerKey: 'mais-menos-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'quebra-cabeças-matemático-1.webp',
      'quebra-cabeças-matemático-2.webp',
      'quebra-cabeças-matemático-3.webp',
      'quebra-cabeças-matemático-4.webp',
      'quebra-cabeças-matemático-1.webp',
      'quebra-cabeças-matemático-2.webp',
    ],
    answerKey: 'quebra-cabeças-matemático-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'folha-de-matemática-1.webp',
      'folha-de-matemática-2.webp',
      'folha-de-matemática-3.webp',
      'folha-de-matemática-4.webp',
      'folha-de-matemática-1.webp',
      'folha-de-matemática-2.webp',
    ],
    answerKey: 'folha-de-matemática-1-answer-key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'comboio-do-alfabeto-1.webp',
      'comboio-do-alfabeto-2.webp',
      'comboio-do-alfabeto-3.webp',
      'comboio-do-alfabeto-4.webp',
      'comboio-do-alfabeto-1.webp',
      'comboio-do-alfabeto-2.webp',
    ],
    answerKey: 'comboio-do-alfabeto-1-answer-key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'preposições-1.webp',
      'preposições-2.webp',
      'preposições-3.webp',
      'preposições-4.webp',
      'preposições-1.webp',
      'preposições-2.webp',
    ],
    answerKey: 'preposições-1-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'adivinha-a-palavra-1.webp',
      'adivinha-a-palavra-2.webp',
      'adivinha-a-palavra-3.webp',
      'adivinha-a-palavra-4.webp',
      'adivinha-a-palavra-1.webp',
      'adivinha-a-palavra-2.webp',
    ],
    answerKey: 'adivinha-a-palavra-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'letras-embaralhadas-1.webp',
      'letras-embaralhadas-2.webp',
      'letras-embaralhadas-3.webp',
      'letras-embaralhadas-4.webp',
      'letras-embaralhadas-1.webp',
      'letras-embaralhadas-2.webp',
    ],
    answerKey: 'letras-embaralhadas-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'caça-palavras-1.webp',
      'caça-palavras-2.webp',
      'caça-palavras-3.webp',
      'caça-palavras-4.webp',
      'caça-palavras-1.webp',
      'caça-palavras-2.webp',
    ],
    answerKey: 'caça-palavras-1-answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'criptograma-ilustrado-1.webp',
      'criptograma-ilustrado-2.webp',
      'criptograma-ilustrado-3.webp',
      'criptograma-ilustrado-4.webp',
      'criptograma-ilustrado-5.webp',
      'criptograma-ilustrado-1.webp',
    ],
    answerKey: 'criptograma-ilustrado-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'palavras-cruzadas-1.webp',
      'palavras-cruzadas-2.webp',
      'palavras-cruzadas-3.webp',
      'palavras-cruzadas-4.webp',
      'palavras-cruzadas-1.webp',
      'palavras-cruzadas-2.webp',
    ],
    answerKey: 'palavras-cruzadas-1-answer-key.webp',
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing-beginning-letter.webp',
      'writing-custom.webp',
      'writing.webp',
      'writing-beginning-letter.webp',
      'writing-custom.webp',
      'writing.webp',
    ],
    answerKey: 'writing-beginning-letter.webp',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'grande-ou-pequeno-1.webp',
      'grande-ou-pequeno-2.webp',
      'grande-ou-pequeno-3.webp',
      'grande-ou-pequeno-4.webp',
      'grande-ou-pequeno-1.webp',
      'grande-ou-pequeno-2.webp',
    ],
    answerKey: 'grande-ou-pequeno-1-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'comboio-de-padrões-1.webp',
      'comboio-de-padrões-2.webp',
      'comboio-de-padrões-3.webp',
      'comboio-de-padrões-4.webp',
      'comboio-de-padrões-5.webp',
      'comboio-de-padrões-1.webp',
    ],
    answerKey: 'comboio-de-padrões-1-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'quebra-cabeças-de-padrões-1.webp',
      'quebra-cabeças-de-padrões-2.webp',
      'quebra-cabeças-de-padrões-3.webp',
      'quebra-cabeças-de-padrões-4.webp',
      'quebra-cabeças-de-padrões-5.webp',
      'quebra-cabeças-de-padrões-1.webp',
    ],
    answerKey: 'quebra-cabeças-de-padrões-1-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'desenha-e-pinta-1.webp',
      'desenha-e-pinta-2.webp',
      'desenha-e-pinta-3.webp',
      'desenha-e-pinta-4.webp',
      'desenha-e-pinta-5.webp',
      'desenha-e-pinta-6.webp',
    ],
    answerKey: 'desenha-e-pinta-1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'prática-de-desenhar-linhas-1.webp',
      'prática-de-desenhar-linhas-2.webp',
      'prática-de-desenhar-linhas-3.webp',
      'prática-de-desenhar-linhas-4.webp',
      'prática-de-desenhar-linhas-5.webp',
      'prática-de-desenhar-linhas-6.webp',
    ],
    answerKey: 'prática-de-desenhar-linhas-1.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring-landscape-1.webp',
      'coloring-landscape-2.webp',
      'coloring-landscape-3.webp',
      'coloring-portrait-1.webp',
      'coloring-portrait-2.webp',
      'coloring-portrait-3.webp',
    ],
    answerKey: 'coloring-landscape-1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'gráfico-de-figuras-1.webp',
      'gráfico-de-figuras-2.webp',
      'gráfico-de-figuras-3.webp',
      'gráfico-de-figuras-4.webp',
      'gráfico-de-figuras-1.webp',
      'gráfico-de-figuras-2.webp',
    ],
    answerKey: 'gráfico-de-figuras-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'encontre-os-pares-1.webp',
      'encontre-os-pares-2.webp',
      'encontre-os-pares-3.webp',
      'encontre-os-pares-4.webp',
      'encontre-os-pares-1.webp',
      'encontre-os-pares-2.webp',
    ],
    answerKey: 'encontre-os-pares-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'quebra-cabeça-de-grade-1.webp',
      'quebra-cabeça-de-grade-2.webp',
      'quebra-cabeça-de-grade-3.webp',
      'quebra-cabeça-de-grade-4.webp',
      'quebra-cabeça-de-grade-5.webp',
      'quebra-cabeça-de-grade-6.webp',
    ],
    answerKey: 'quebra-cabeça-de-grade-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'combine-as-sombras-1.webp',
      'combine-as-sombras-2.webp',
      'combine-as-sombras-3.webp',
      'combine-as-sombras-4.webp',
      'shadow-match-worksheet.webp',
      'combine-as-sombras-1.webp',
    ],
    answerKey: 'combine-as-sombras-1-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bingo-de-imagenes-1.webp',
      'bingo-de-imagenes-2.webp',
      'bingo-de-imagenes-3.webp',
      'bingo-de-imagenes-4.webp',
      'bingo-de-imagenes-1.webp',
      'bingo-de-imagenes-2.webp',
    ],
    answerKey: 'bingo-de-imagenes-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'classificação-de-imagens-1.webp',
      'classificação-de-imagens-2.webp',
      'classificação-de-imagens-3.webp',
      'classificação-de-imagens-4.webp',
      'classificação-de-imagens-1.webp',
      'classificação-de-imagens-2.webp',
    ],
    answerKey: 'classificação-de-imagens-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'peças-em-falta-1.webp',
      'peças-em-falta-2.webp',
      'peças-em-falta-3.webp',
      'peças-em-falta-4.webp',
      'peças-em-falta-5.webp',
      'peças-em-falta-1.webp',
    ],
    answerKey: 'peças-em-falta-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'encontra-o-diferente-1-v1.webp',
      'encontra-o-diferente-2-v2.webp',
      'encontra-o-diferente-3-v3.webp',
      'encontra-o-diferente-4-v4.webp',
      'encontra-o-diferente-5-v5.webp',
      'encontra-o-diferente-6.webp',
    ],
    answerKey: 'encontra-o-diferente-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'sudoku-de-imagens-1.webp',
      'sudoku-de-imagens-2.webp',
      'sudoku-de-imagens-3.webp',
      'sudoku-de-imagens-4.webp',
      'sudoku-de-imagens-1.webp',
      'sudoku-de-imagens-2.webp',
    ],
    answerKey: 'sudoku-de-imagens-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'caminho-de-imagen-1.webp',
      'caminho-de-imagen-2.webp',
      'caminho-de-imagen-3.webp',
      'caminho-de-imagen-4.webp',
      'caminho-de-imagen-1.webp',
      'caminho-de-imagen-2.webp',
    ],
    answerKey: 'caminho-de-imagen-1-answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'vejo,-vejo-1.webp',
      'vejo,-vejo-2.webp',
      'vejo,-vejo-3.webp',
      'vejo,-vejo-4.webp',
      'vejo,-vejo-1.webp',
      'vejo,-vejo-2.webp',
    ],
    answerKey: 'vejo,-vejo-1-answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'encontra-o-diferente-1.webp',
      'encontra-o-diferente-2.webp',
      'encontra-o-diferente-3.webp',
      'encontra-o-diferente-4.webp',
      'encontra-o-diferente-5.webp',
      'encontra-o-diferente.webp',
    ],
    answerKey: 'encontra-o-diferente-answer-key-1.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'caça-ao-tesouro-1.webp',
      'caça-ao-tesouro-2.webp',
      'caça-ao-tesouro-3.webp',
      'caça-ao-tesouro-4.webp',
      'caça-ao-tesouro-1.webp',
      'caça-ao-tesouro-2.webp',
    ],
    answerKey: 'caça-ao-tesouro-1-answer-key.webp',
  },
};
