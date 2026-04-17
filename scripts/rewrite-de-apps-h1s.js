const fs = require('fs');
const path = require('path');

// Target H1 pattern (parallels EN): generator keyword leads, dashes
// separate the commercial hook. German rephrasing:
//   "[Generator Name] — Druckvorlagen für Etsy & KDP erstellen"
const H1_SUFFIX = ' — Druckvorlagen für Etsy & KDP erstellen';

// Target titleTag pattern: [Generator Name] | LessonCraftStudio.
// Simpler than EN because German compound nouns need the space
// budget for the generator name itself.
const TITLE_SUFFIX = ' | LessonCraftStudio';

// generatorName is used verbatim for both H1 (prepended to H1_SUFFIX)
// and titleTag (prepended to TITLE_SUFFIX).
const generators = {
  'addition.ts': 'Additions-Arbeitsblatt-Generator',
  'alphabet-train.ts': 'Alphabet-Zug-Generator',
  'big-small.ts': 'Groß-und-Klein-Generator',
  'bingo.ts': 'Bingo-Karten-Generator',
  'chart-count.ts': 'Strichlisten-Generator',
  'code-addition.ts': 'Zahlencode-Mathe-Generator',
  'coloring.ts': 'Malvorlagen-Generator',
  'crossword.ts': 'Kreuzworträtsel-Generator',
  'cryptogram.ts': 'Kryptogramm-Generator',
  'draw-and-color.ts': 'Zeichnen-und-Ausmalen-Generator',
  'drawing-lines.ts': 'Nachspur-Generator',
  'find-and-count.ts': 'Suchen-und-Zählen-Generator',
  'find-objects.ts': 'Wimmelbild-Generator',
  'grid-match.ts': 'Gitter-Zeichnungs-Generator',
  'matching.ts': 'Zuordnungs-Generator',
  'math-puzzle.ts': 'Mathe-Rätsel-Generator',
  'math-worksheet.ts': 'Mathe-Arbeitsblatt-Generator',
  'missing-pieces.ts': 'Fehlende-Teile-Generator',
  'more-less.ts': 'Mehr-oder-Weniger-Generator',
  'odd-one-out.ts': 'Was-passt-nicht-Generator',
  'pattern-train.ts': 'Musterreihen-Generator',
  'pattern-worksheet.ts': 'Muster-Generator',
  'picture-path.ts': 'Labyrinth-Generator',
  'picture-sort.ts': 'Sortier-Generator',
  'prepositions.ts': 'Präpositionen-Generator',
  'shadow-match.ts': 'Schattenbilder-Generator',
  'subtraction.ts': 'Subtraktions-Arbeitsblatt-Generator',
  'sudoku.ts': 'Sudoku-Generator',
  'treasure-hunt.ts': 'Schatzsuche-Generator',
  'word-guess.ts': 'Wörter-Raten-Generator',
  'word-scramble.ts': 'Buchstabensalat-Generator',
  'wordsearch.ts': 'Suchsel-Generator',
  'writing.ts': 'Schreibübungen-Generator',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
const changes = [];

for (const [file, name] of Object.entries(generators)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');

  const heroRe = /(hero:\s*\{\s*\n\s*title:\s*)'([^']*)'/;
  const titleRe = /(titleTag:\s*)'([^']*)'/;

  const heroMatch = src.match(heroRe);
  const titleMatch = src.match(titleRe);
  if (!heroMatch || !titleMatch) {
    console.error('PATTERN MISS: ' + file);
    process.exit(1);
  }

  const newH1 = name + H1_SUFFIX;
  const newTitle = name + TITLE_SUFFIX;

  if (newTitle.length > 60) {
    console.error(
      `TITLE TOO LONG (${newTitle.length}): ${file} — "${newTitle}"`
    );
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
  });
  console.log('OK ' + file + '  (title=' + newTitle.length + ')');
}

console.log('\nRewrote ' + changes.length + ' DE hero.titles and titleTags.');
console.log('\n--- DE Translation Queue (apps H1 + titleTag) ---\n');
for (const c of changes) {
  console.log(`### ${c.file}`);
  console.log(`  H1 BEFORE: ${c.oldH1}`);
  console.log(`  H1 AFTER : ${c.newH1}`);
  console.log(`  TT BEFORE: ${c.oldTitle}`);
  console.log(`  TT AFTER : ${c.newTitle}`);
  console.log('');
}
