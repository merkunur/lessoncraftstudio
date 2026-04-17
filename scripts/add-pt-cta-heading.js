const fs = require('fs');
const path = require('path');

// Portuguese (pt-BR) action-phrase CTA headings per generator.
const mapping = {
  'addition.ts': 'Crie atividades de adição',
  'alphabet-train.ts': 'Crie atividades do alfabeto',
  'big-small.ts': 'Crie atividades grande e pequeno',
  'bingo.ts': 'Crie cartelas de bingo',
  'chart-count.ts': 'Crie atividades de contagem',
  'code-addition.ts': 'Crie atividades de mensagens secretas',
  'coloring.ts': 'Crie desenhos para colorir',
  'crossword.ts': 'Crie palavras cruzadas',
  'cryptogram.ts': 'Crie criptogramas',
  'draw-and-color.ts': 'Crie atividades de desenhar e colorir',
  'drawing-lines.ts': 'Crie atividades de traçado',
  'find-and-count.ts': 'Crie atividades de procurar e contar',
  'find-objects.ts': 'Crie atividades de procurar e achar',
  'grid-match.ts': 'Crie atividades em grade',
  'matching.ts': 'Crie atividades de ligar',
  'math-puzzle.ts': 'Crie enigmas matemáticos',
  'math-worksheet.ts': 'Crie atividades de matemática',
  'missing-pieces.ts': 'Crie enigmas de peças faltantes',
  'more-less.ts': 'Crie atividades maior ou menor',
  'odd-one-out.ts': 'Crie atividades do intruso',
  'pattern-train.ts': 'Crie atividades de sequência',
  'pattern-worksheet.ts': 'Crie atividades de padrões',
  'picture-path.ts': 'Crie labirintos',
  'picture-sort.ts': 'Crie atividades de classificação',
  'prepositions.ts': 'Crie atividades de preposições',
  'shadow-match.ts': 'Crie atividades de sombras',
  'subtraction.ts': 'Crie atividades de subtração',
  'sudoku.ts': 'Crie sudokus',
  'treasure-hunt.ts': 'Crie caças ao tesouro',
  'word-guess.ts': 'Crie atividades de jogo da forca',
  'word-scramble.ts': 'Crie atividades de letras embaralhadas',
  'wordsearch.ts': 'Crie caça-palavras',
  'writing.ts': 'Crie atividades de caligrafia',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'pt');
let done = 0;
let skipped = 0;
const errors = [];

for (const [file, heading] of Object.entries(mapping)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) {
    errors.push('MISSING: ' + file);
    continue;
  }
  let content = fs.readFileSync(fp, 'utf8');

  if (content.includes('ctaHeading:')) {
    skipped++;
    continue;
  }

  const pattern = /(\r?\n)(  howItWorks: \{)/;
  if (!pattern.test(content)) {
    errors.push('NO MATCH: ' + file);
    continue;
  }

  content = content.replace(pattern, `$1  ctaHeading: '${heading}',$1$1$2`);
  fs.writeFileSync(fp, content);
  done++;
  console.log('OK ' + file);
}

console.log('\nWrote: ' + done + ' | Skipped: ' + skipped + ' | Errors: ' + errors.length);
if (errors.length) {
  errors.forEach((e) => console.log('  ' + e));
  process.exit(1);
}
