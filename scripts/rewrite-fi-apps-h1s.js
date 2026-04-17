const fs = require('fs');
const path = require('path');

const H1_SUFFIX = ' — Luo tulostettavia Etsy- ja KDP-myyntiin';
const TITLE_SUFFIX = ' | LessonCraftStudio';

// Finnish generator names. Tightened to fit the 60-char titleTag
// budget (20 chars for " | LessonCraftStudio"). Proper diacritics
// throughout — these rewrites REPAIR the stripped-diacritic state
// of the current hero.title values.
const generators = {
  'addition.ts': 'Yhteenlaskugeneraattori',
  'alphabet-train.ts': 'Aakkostehtäväkone',
  'big-small.ts': 'Iso ja pieni -generaattori',
  'bingo.ts': 'Bingokorttigeneraattori',
  'chart-count.ts': 'Laskutaulukkogeneraattori',
  'code-addition.ts': 'Salaisen koodin generaattori',
  'coloring.ts': 'Värityskuvageneraattori',
  'crossword.ts': 'Sanaristikkogeneraattori',
  'cryptogram.ts': 'Kryptogrammigeneraattori',
  'draw-and-color.ts': 'Piirrä ja väritä -kone',
  'drawing-lines.ts': 'Kirjoitusmotoriikkakone',
  'find-and-count.ts': 'Etsi ja laske -generaattori',
  'find-objects.ts': 'Etsintäpelien kone',
  'grid-match.ts': 'Ruudukkotehtäväkone',
  'matching.ts': 'Yhdistämistehtäväkone',
  'math-puzzle.ts': 'Matematiikkapulmakone',
  'math-worksheet.ts': 'Matematiikkatehtäväkone',
  'missing-pieces.ts': 'Puuttuvien palojen kone',
  'more-less.ts': 'Suurempi tai pienempi -kone',
  'odd-one-out.ts': 'Mikä ei kuulu joukkoon -kone',
  'pattern-train.ts': 'Kuvioiden sarjageneraattori',
  'pattern-worksheet.ts': 'Kuviogeneraattori',
  'picture-path.ts': 'Labyrinttigeneraattori',
  'picture-sort.ts': 'Lajittelugeneraattori',
  'prepositions.ts': 'Sijaintisanojen generaattori',
  'shadow-match.ts': 'Varjotehtäväkone',
  'subtraction.ts': 'Vähennyslaskugeneraattori',
  'sudoku.ts': 'Sudokugeneraattori',
  'treasure-hunt.ts': 'Aarteenetsintägeneraattori',
  'word-guess.ts': 'Hirsipuugeneraattori',
  'word-scramble.ts': 'Sekoitettujen kirjainten kone',
  'wordsearch.ts': 'Sanahakugeneraattori',
  'writing.ts': 'Kirjoitusharjoituskone',
};

function renderedLength(v) { return v.replace(/\\'/g, "'").length; }

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'fi');
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

  const len = renderedLength(newTitle);
  if (len > 60) {
    console.error(`TITLE TOO LONG (${len}): ${file} — "${newTitle}"`);
    process.exit(1);
  }

  src = src.replace(heroRe, `$1'${newH1}'`);
  src = src.replace(titleRe, `$1'${newTitle}'`);
  fs.writeFileSync(fp, src);

  changes.push({ file, oldH1: heroMatch[2], newH1, oldTitle: titleMatch[2], newTitle, len });
  console.log('OK ' + file + '  (title=' + len + ')');
}

console.log('\nRewrote ' + changes.length + ' FI hero.titles and titleTags.');
