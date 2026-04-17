const fs = require('fs');
const path = require('path');

// PT H1 keeps Hotmart alongside Etsy & KDP (Brazilian market signal).
const H1_SUFFIX = ' — Crie imprimíveis para vender na Hotmart, Etsy e KDP';
// titleTag has no marketplace mentions; just generator name + brand.
const TITLE_SUFFIX = ' | LessonCraftStudio';

const generators = {
  'addition.ts': 'Gerador de atividades de adição',
  'alphabet-train.ts': 'Gerador de atividades do alfabeto',
  'big-small.ts': 'Gerador grande e pequeno',
  'bingo.ts': 'Gerador de cartelas de bingo',
  'chart-count.ts': 'Gerador de atividades de contagem',
  'code-addition.ts': 'Gerador de mensagens secretas',
  'coloring.ts': 'Gerador de páginas para colorir',
  'crossword.ts': 'Gerador de palavras cruzadas',
  'cryptogram.ts': 'Gerador de criptogramas',
  'draw-and-color.ts': 'Gerador de desenhar e colorir',
  'drawing-lines.ts': 'Gerador de atividades de traçado',
  'find-and-count.ts': 'Gerador procurar e contar',
  'find-objects.ts': 'Gerador procurar e achar',
  'grid-match.ts': 'Gerador de atividades em grade',
  'matching.ts': 'Gerador de atividades de ligar',
  'math-puzzle.ts': 'Gerador de enigmas matemáticos',
  'math-worksheet.ts': 'Gerador de atividades de matemática',
  'missing-pieces.ts': 'Gerador de peças faltantes',
  'more-less.ts': 'Gerador maior ou menor',
  'odd-one-out.ts': 'Gerador do intruso',
  'pattern-train.ts': 'Gerador de atividades de sequência',
  'pattern-worksheet.ts': 'Gerador de padrões',
  'picture-path.ts': 'Gerador de labirintos',
  'picture-sort.ts': 'Gerador de classificação',
  'prepositions.ts': 'Gerador de preposições',
  'shadow-match.ts': 'Gerador de sombras',
  'subtraction.ts': 'Gerador de atividades de subtração',
  'sudoku.ts': 'Gerador de sudokus',
  'treasure-hunt.ts': 'Gerador caça ao tesouro',
  'word-guess.ts': 'Gerador de jogo da forca',
  'word-scramble.ts': 'Gerador de letras embaralhadas',
  'wordsearch.ts': 'Gerador de caça-palavras',
  'writing.ts': 'Gerador de atividades de caligrafia',
};

function renderedLength(literalValue) {
  return literalValue.replace(/\\'/g, "'").length;
}

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'pt');
const changes = [];

for (const [file, name] of Object.entries(generators)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');

  const heroRe = /(hero:\s*\{\s*\n\s*title:\s*)'((?:[^'\\]|\\.)*)'/;
  const titleRe = /(titleTag:\s*)'((?:[^'\\]|\\.)*)'/;

  const heroMatch = src.match(heroRe);
  const titleMatch = src.match(titleRe);
  if (!heroMatch || !titleMatch) {
    console.error('PATTERN MISS: ' + file);
    process.exit(1);
  }

  const newH1 = name + H1_SUFFIX;
  const newTitle = name + TITLE_SUFFIX;

  const renderedTitleLen = renderedLength(newTitle);
  if (renderedTitleLen > 60) {
    console.error(`TITLE TOO LONG (${renderedTitleLen}): ${file} — "${newTitle}"`);
    process.exit(1);
  }

  src = src.replace(heroRe, `$1'${newH1}'`);
  src = src.replace(titleRe, `$1'${newTitle}'`);
  fs.writeFileSync(fp, src);

  changes.push({
    file,
    oldH1: heroMatch[2],
    newH1,
    oldTitle: titleMatch[2],
    newTitle,
    titleLen: renderedTitleLen,
  });
  console.log('OK ' + file + '  (title=' + renderedTitleLen + ')');
}

console.log('\nRewrote ' + changes.length + ' PT hero.titles and titleTags.');
