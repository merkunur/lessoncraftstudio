const fs = require('fs');
const path = require('path');

// Finnish action-phrase CTA headings per generator. All written with
// proper Finnish diacritics (ä, ö). Verb-final structure: "Luo [object]".
const mapping = {
  'addition.ts': 'Luo yhteenlaskutehtäviä',
  'alphabet-train.ts': 'Luo aakkostehtäviä',
  'big-small.ts': 'Luo iso ja pieni -tehtäviä',
  'bingo.ts': 'Luo bingokortteja',
  'chart-count.ts': 'Luo laskutaulukoita',
  'code-addition.ts': 'Luo salaisen koodin laskutehtäviä',
  'coloring.ts': 'Luo värityskuvia',
  'crossword.ts': 'Luo sanaristikoita',
  'cryptogram.ts': 'Luo kryptogrammeja',
  'draw-and-color.ts': 'Luo piirrä-ja-väritä-tehtäviä',
  'drawing-lines.ts': 'Luo kirjoitusmotoriikkaharjoituksia',
  'find-and-count.ts': 'Luo etsi-ja-laske-tehtäviä',
  'find-objects.ts': 'Luo etsintäpelejä',
  'grid-match.ts': 'Luo ruudukkotehtäviä',
  'matching.ts': 'Luo yhdistämistehtäviä',
  'math-puzzle.ts': 'Luo matematiikkapulmia',
  'math-worksheet.ts': 'Luo matematiikkatehtäviä',
  'missing-pieces.ts': 'Luo puuttuvien palojen tehtäviä',
  'more-less.ts': 'Luo suurempi tai pienempi -tehtäviä',
  'odd-one-out.ts': 'Luo mikä ei kuulu joukkoon -tehtäviä',
  'pattern-train.ts': 'Luo kuvioiden sarjoja',
  'pattern-worksheet.ts': 'Luo kuviotehtäviä',
  'picture-path.ts': 'Luo labyrintteja',
  'picture-sort.ts': 'Luo lajittelutehtäviä',
  'prepositions.ts': 'Luo sijaintisanatehtäviä',
  'shadow-match.ts': 'Luo varjotehtäviä',
  'subtraction.ts': 'Luo vähennyslaskutehtäviä',
  'sudoku.ts': 'Luo sudokuja',
  'treasure-hunt.ts': 'Luo aarteenetsintöjä',
  'word-guess.ts': 'Luo hirsipuutehtäviä',
  'word-scramble.ts': 'Luo sekoitettujen kirjainten tehtäviä',
  'wordsearch.ts': 'Luo sanahakuja',
  'writing.ts': 'Luo kirjoitusharjoituksia',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'fi');
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
