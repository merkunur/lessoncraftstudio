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
      'Adição Divertida 1.webp',
      'Adição Divertida 2.webp',
      'Adição Divertida 3.webp',
      'Adição Divertida 4.webp',
      'Adição Divertida 5.webp',
      'Adição Divertida 1.webp',
    ],
    answerKey: "Adição Divertida 1 answer_key.webp",
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Subtrações Divertidas 1.webp',
      'Subtrações Divertidas 2.webp',
      'Subtrações Divertidas 3.webp',
      'Subtrações Divertidas 4.webp',
      'Subtrações Divertidas 1.webp',
      'Subtrações Divertidas 2.webp',
    ],
    answerKey: "Subtrações Divertidas 1 answer_key.webp",
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Código Secreto Adição 1.webp',
      'Código Secreto Adição 2.webp',
      'Código Secreto Adição 3.webp',
      'Código Secreto Adição 4.webp',
      'Código Secreto Adição 1.webp',
      'Código Secreto Adição 2.webp',
    ],
    answerKey: "Código Secreto Adição 1 answer_key.webp",
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Mais Menos 1.webp',
      'Mais Menos 2.webp',
      'Mais Menos 3.webp',
      'Mais Menos 4.webp',
      'Mais Menos 5.webp',
      'Mais Menos 1.webp',
    ],
    answerKey: 'Mais Menos 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      "Quebra-Cabeças Matemático 1.webp",
      "Quebra-Cabeças Matemático 2.webp",
      "Quebra-Cabeças Matemático 3.webp",
      "Quebra-Cabeças Matemático 4.webp",
      "Quebra-Cabeças Matemático 1.webp",
      "Quebra-Cabeças Matemático 2.webp",
    ],
    answerKey: "Quebra-Cabeças Matemático 1 answer_key.webp",
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'Folha de Matemática 1.webp',
      'Folha de Matemática 2.webp',
      'Folha de Matemática 3.webp',
      'Folha de Matemática 4.webp',
      'Folha de Matemática 1.webp',
      'Folha de Matemática 2.webp',
    ],
    answerKey: "Folha de Matemática 1 answer_key.webp",
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'Comboio do Alfabeto 1.webp',
      'Comboio do Alfabeto 2.webp',
      'Comboio do Alfabeto 3.webp',
      'Comboio do Alfabeto 4.webp',
      'Comboio do Alfabeto 1.webp',
      'Comboio do Alfabeto 2.webp',
    ],
    answerKey: "Comboio do Alfabeto 1 answer_key.webp",
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'Preposições 1.webp',
      'Preposições 2.webp',
      'Preposições 3.webp',
      'Preposições 4.webp',
      'Preposições 1.webp',
      'Preposições 2.webp',
    ],
    answerKey: 'Preposições 1 answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Adivinha a Palavra 1.webp',
      'Adivinha a Palavra 2.webp',
      'Adivinha a Palavra 3.webp',
      'Adivinha a Palavra 4.webp',
      'Adivinha a Palavra 1.webp',
      'Adivinha a Palavra 2.webp',
    ],
    answerKey: "Adivinha a Palavra 1 answer-key.webp",
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Letras Embaralhadas 1.webp',
      'Letras Embaralhadas 2.webp',
      'Letras Embaralhadas 3.webp',
      'Letras Embaralhadas 4.webp',
      'Letras Embaralhadas 1.webp',
      'Letras Embaralhadas 2.webp',
    ],
    answerKey: "Letras Embaralhadas 1 answer-key.webp",
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Caça-Palavras 1.webp',
      'Caça-Palavras 2.webp',
      'Caça-Palavras 3.webp',
      'Caça-Palavras 4.webp',
      'Caça-Palavras 1.webp',
      'Caça-Palavras 2.webp',
    ],
    answerKey: "Caça-Palavras 1 answer_key.webp",
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Criptograma Ilustrado 1.webp',
      'Criptograma Ilustrado 2.webp',
      'Criptograma Ilustrado 3.webp',
      'Criptograma Ilustrado 4.webp',
      'Criptograma Ilustrado 5.webp',
      'Criptograma Ilustrado 1.webp',
    ],
    answerKey: "Criptograma Ilustrado 1 answer_key.webp",
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'Palavras Cruzadas 1.webp',
      'Palavras Cruzadas 2.webp',
      'Palavras Cruzadas 3.webp',
      'Palavras Cruzadas 4.webp',
      'Palavras Cruzadas 1.webp',
      'Palavras Cruzadas 2.webp',
    ],
    answerKey: "Palavras Cruzadas 1 answer_key.webp",
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing beginning letter.webp',
      'writing custom.webp',
      'writing.webp',
      'writing beginning letter.webp',
      'writing custom.webp',
      'writing.webp',
    ],
    answerKey: 'writing beginning letter.webp',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'Grande ou Pequeno 1.webp',
      'Grande ou Pequeno 2.webp',
      'Grande ou Pequeno 3.webp',
      'Grande ou Pequeno 4.webp',
      'Grande ou Pequeno 1.webp',
      'Grande ou Pequeno 2.webp',
    ],
    answerKey: "Grande ou Pequeno 1 answer_key.webp",
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Comboio de Padrões 1.webp',
      'Comboio de Padrões 2.webp',
      'Comboio de Padrões 3.webp',
      'Comboio de Padrões 4.webp',
      'Comboio de Padrões 5.webp',
      'Comboio de Padrões 1.webp',
    ],
    answerKey: "Comboio de Padrões 1 answer_key.webp",
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      "Quebra-cabeças de Padrões 1.webp",
      "Quebra-cabeças de Padrões 2.webp",
      "Quebra-cabeças de Padrões 3.webp",
      "Quebra-cabeças de Padrões 4.webp",
      "Quebra-cabeças de Padrões 5.webp",
      "Quebra-cabeças de Padrões 1.webp",
    ],
    answerKey: "Quebra-cabeças de Padrões 1 answer_key.webp",
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Desenha e Pinta 1.webp',
      'Desenha e Pinta 2.webp',
      'Desenha e Pinta 3.webp',
      'Desenha e Pinta 4.webp',
      'Desenha e Pinta 5.webp',
      'Desenha e Pinta 6.webp',
    ],
    answerKey: 'Desenha e Pinta 1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      "Prática de Desenhar Linhas 1.webp",
      "Prática de Desenhar Linhas 2.webp",
      "Prática de Desenhar Linhas 3.webp",
      "Prática de Desenhar Linhas 4.webp",
      "Prática de Desenhar Linhas 5.webp",
      "Prática de Desenhar Linhas 6.webp",
    ],
    answerKey: "Prática de Desenhar Linhas 1.webp",
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring landscape 1.webp',
      'coloring landscape 2.webp',
      'coloring landscape 3.webp',
      'coloring portrait 1.webp',
      'coloring portrait 2.webp',
      'coloring portrait 3.webp',
    ],
    answerKey: 'coloring landscape 1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'Gráfico de Figuras 1.webp',
      'Gráfico de Figuras 2.webp',
      'Gráfico de Figuras 3.webp',
      'Gráfico de Figuras 4.webp',
      'Gráfico de Figuras 1.webp',
      'Gráfico de Figuras 2.webp',
    ],
    answerKey: "Gráfico de Figuras 1 answer_key.webp",
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Encontre os Pares 1.webp',
      'Encontre os Pares 2.webp',
      'Encontre os Pares 3.webp',
      'Encontre os Pares 4.webp',
      'Encontre os Pares 1.webp',
      'Encontre os Pares 2.webp',
    ],
    answerKey: "Encontre os Pares 1 answer_key.webp",
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Quebra-Cabeça de Grade 1.webp',
      'Quebra-Cabeça de Grade 2.webp',
      'Quebra-Cabeça de Grade 3.webp',
      'Quebra-Cabeça de Grade 4.webp',
      'Quebra-Cabeça de Grade 5.webp',
      'Quebra-Cabeça de Grade 6.webp',
    ],
    answerKey: "Quebra-Cabeça de Grade 1 answer_key.webp",
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Combine as Sombras 1.webp',
      'Combine as Sombras 2.webp',
      'Combine as Sombras 3.webp',
      'Combine as Sombras 4.webp',
      'shadow-match-worksheet.webp',
      'Combine as Sombras 1.webp',
    ],
    answerKey: "Combine as Sombras 1 answer-key.webp",
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'Bingo de Imagenes 1.webp',
      'Bingo de Imagenes 2.webp',
      'Bingo de Imagenes 3.webp',
      'Bingo de Imagenes 4.webp',
      'Bingo de Imagenes 1.webp',
      'Bingo de Imagenes 2.webp',
    ],
    answerKey: "Bingo de Imagenes 1 callout.webp",
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      "Classificação de Imagens 1.webp",
      "Classificação de Imagens 2.webp",
      "Classificação de Imagens 3.webp",
      "Classificação de Imagens 4.webp",
      "Classificação de Imagens 1.webp",
      "Classificação de Imagens 2.webp",
    ],
    answerKey: "Classificação de Imagens 1 answer_key.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Peças em Falta 1.webp',
      'Peças em Falta 2.webp',
      'Peças em Falta 3.webp',
      'Peças em Falta 4.webp',
      'Peças em Falta 5.webp',
      'Peças em Falta 1.webp',
    ],
    answerKey: "Peças em Falta 1 answer_key.webp",
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Encontra o Diferente 1.webp',
      'Encontra o Diferente 2.webp',
      'Encontra o Diferente 3.webp',
      'Encontra o Diferente 4.webp',
      'Encontra o Diferente 5.webp',
      'Encontra o Diferente 6.webp',
    ],
    answerKey: "Encontra o Diferente 1 answer-key.webp",
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Sudoku de Imagens 1.webp',
      'Sudoku de Imagens 2.webp',
      'Sudoku de Imagens 3.webp',
      'Sudoku de Imagens 4.webp',
      'Sudoku de Imagens 1.webp',
      'Sudoku de Imagens 2.webp',
    ],
    answerKey: "Sudoku de Imagens 1 answer_key.webp",
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Caminho de Imagen 1.webp',
      'Caminho de Imagen 2.webp',
      'Caminho de Imagen 3.webp',
      'Caminho de Imagen 4.webp',
      'Caminho de Imagen 1.webp',
      'Caminho de Imagen 2.webp',
    ],
    answerKey: "Caminho de Imagen 1 answer_key.webp",
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Vejo, Vejo 1.webp',
      'Vejo, Vejo 2.webp',
      'Vejo, Vejo 3.webp',
      'Vejo, Vejo 4.webp',
      'Vejo, Vejo 1.webp',
      'Vejo, Vejo 2.webp',
    ],
    answerKey: 'Vejo, Vejo 1 answer_key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'Encontra o Diferente (1).webp',
      'Encontra o Diferente (2).webp',
      'Encontra o Diferente (3).webp',
      'Encontra o Diferente (4).webp',
      'Encontra o Diferente (5).webp',
      'Encontra o Diferente.webp',
    ],
    answerKey: "Encontra o Diferente answer_key (1).webp",
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Caça ao Tesouro 1.webp',
      'Caça ao Tesouro 2.webp',
      'Caça ao Tesouro 3.webp',
      'Caça ao Tesouro 4.webp',
      'Caça ao Tesouro 1.webp',
      'Caça ao Tesouro 2.webp',
    ],
    answerKey: "Caça ao Tesouro 1 answer_key.webp",
  },
};
