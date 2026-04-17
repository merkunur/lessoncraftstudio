const fs = require('fs');
const path = require('path');

// German action-phrase CTA headings per generator. Parallels
// scripts/add-cta-heading.js (EN). Populated on the bottom CTA block
// of each /de/apps/[slug] page via the shared AppContent.ctaHeading
// field.
const mapping = {
  'addition.ts': 'Additions-Arbeitsblätter erstellen',
  'alphabet-train.ts': 'Alphabet-Arbeitsblätter erstellen',
  'big-small.ts': 'Groß-und-Klein-Arbeitsblätter erstellen',
  'bingo.ts': 'Bingo-Karten erstellen',
  'chart-count.ts': 'Zähl-Arbeitsblätter erstellen',
  'code-addition.ts': 'Zahlencode-Mathe-Rätsel erstellen',
  'coloring.ts': 'Malvorlagen erstellen',
  'crossword.ts': 'Kreuzworträtsel erstellen',
  'cryptogram.ts': 'Kryptogramme erstellen',
  'draw-and-color.ts': 'Zeichnen-und-Malen-Arbeitsblätter erstellen',
  'drawing-lines.ts': 'Schwungübungen erstellen',
  'find-and-count.ts': 'Suchen-und-Zählen-Arbeitsblätter erstellen',
  'find-objects.ts': 'Wimmelbilder erstellen',
  'grid-match.ts': 'Gitter-Arbeitsblätter erstellen',
  'matching.ts': 'Zuordnungs-Arbeitsblätter erstellen',
  'math-puzzle.ts': 'Mathe-Rätsel erstellen',
  'math-worksheet.ts': 'Mathe-Arbeitsblätter erstellen',
  'missing-pieces.ts': 'Fehlende-Teile-Rätsel erstellen',
  'more-less.ts': 'Mehr-oder-Weniger-Arbeitsblätter erstellen',
  'odd-one-out.ts': 'Was-passt-nicht-Arbeitsblätter erstellen',
  'pattern-train.ts': 'Musterreihen-Arbeitsblätter erstellen',
  'pattern-worksheet.ts': 'Muster-Arbeitsblätter erstellen',
  'picture-path.ts': 'Labyrinthe erstellen',
  'picture-sort.ts': 'Sortier-Arbeitsblätter erstellen',
  'prepositions.ts': 'Präpositionen-Arbeitsblätter erstellen',
  'shadow-match.ts': 'Schattenbilder-Arbeitsblätter erstellen',
  'subtraction.ts': 'Subtraktions-Arbeitsblätter erstellen',
  'sudoku.ts': 'Sudoku-Rätsel erstellen',
  'treasure-hunt.ts': 'Schatzsuche-Arbeitsblätter erstellen',
  'word-guess.ts': 'Wörter-Raten-Arbeitsblätter erstellen',
  'word-scramble.ts': 'Buchstabensalat erstellen',
  'wordsearch.ts': 'Suchsel erstellen',
  'writing.ts': 'Schreibübungen erstellen',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
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
