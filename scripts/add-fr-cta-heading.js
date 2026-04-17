const fs = require('fs');
const path = require('path');

// French action-phrase CTA headings per generator. Parallels the EN
// and DE cta-heading scripts.
//
// Encoding notes:
// - The mapping values below use JS double-quoted strings so they can
//   contain the TS file's escape sequences verbatim.
// - In the values, `\\'` represents a literal `\'` that the TS file
//   will read as an escaped apostrophe inside a single-quoted string.
// - Real Unicode characters (é, à, ê, ô, etc.) are written directly —
//   no escaping needed in either JS or TS.
const mapping = {
  'addition.ts': "Créer des fiches d\\'addition",
  'alphabet-train.ts': "Créer des fiches alphabet",
  'big-small.ts': "Créer des fiches grand et petit",
  'bingo.ts': "Créer des cartes de loto",
  'chart-count.ts': "Créer des fiches de dénombrement",
  'code-addition.ts': "Créer des fiches de messages codés",
  'coloring.ts': "Créer des coloriages",
  'crossword.ts': "Créer des mots croisés",
  'cryptogram.ts': "Créer des cryptogrammes",
  'draw-and-color.ts': "Créer des fiches dessin et coloriage",
  'drawing-lines.ts': "Créer des fiches de graphisme",
  'find-and-count.ts': "Créer des fiches cherche et compte",
  'find-objects.ts': "Créer des jeux de cherche et trouve",
  'grid-match.ts': "Créer des fiches de dessin sur quadrillage",
  'matching.ts': "Créer des fiches d\\'association",
  'math-puzzle.ts': "Créer des puzzles mathématiques",
  'math-worksheet.ts': "Créer des fiches de mathématiques",
  'missing-pieces.ts': "Créer des puzzles à pièces manquantes",
  'more-less.ts': "Créer des fiches plus ou moins",
  'odd-one-out.ts': "Créer des fiches de l\\'intrus",
  'pattern-train.ts': "Créer des fiches de suites logiques",
  'pattern-worksheet.ts': "Créer des fiches de motifs",
  'picture-path.ts': "Créer des labyrinthes",
  'picture-sort.ts': "Créer des fiches de tri",
  'prepositions.ts': "Créer des fiches de prépositions",
  'shadow-match.ts': "Créer des fiches d\\'ombres",
  'subtraction.ts': "Créer des fiches de soustraction",
  'sudoku.ts': "Créer des grilles de sudoku",
  'treasure-hunt.ts': "Créer des chasses au trésor",
  'word-guess.ts': "Créer des fiches de jeu du pendu",
  'word-scramble.ts': "Créer des fiches de lettres mélangées",
  'wordsearch.ts': "Créer des mots mêlés",
  'writing.ts': "Créer des fiches d\\'écriture",
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'fr');
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
