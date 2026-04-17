#!/usr/bin/env node
// Add FI slug entries to product-page-slugs.ts and tool-page-slugs.ts.
// FI slugs use ASCII-only transliteration (ä→a, ö→o) per the existing
// cross-locale convention (DE `arbeitsblaetter`, NO `ordsoek`).

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const productFiSlugs = {
  'word-search': 'sanahaku-tyoarkit',
  'image-addition': 'yhteenlasku-tyoarkit',
  'alphabet-train': 'aakkoset-tyoarkit',
  'coloring': 'varityskuvat-tyoarkit',
  'math-worksheet': 'matematiikka-tyoarkit',
  'word-scramble': 'sekoitetut-sanat-tyoarkit',
  'find-and-count': 'etsi-ja-laske-tyoarkit',
  'matching-app': 'yhdista-tyoarkit',
  'drawing-lines': 'viivaharjoitus-tyoarkit',
  'picture-bingo': 'bingokortit-tyoarkit',
  'sudoku': 'sudoku-tehtavat',
  'big-small-app': 'iso-pieni-tyoarkit',
  'chart-count-color': 'laskutaulukot-tyoarkit',
  'code-addition': 'koodi-yhteenlasku-tyoarkit',
  'draw-and-color': 'piirra-varita-tyoarkit',
  'find-objects': 'piilokuvat-tyoarkit',
  'grid-match': 'ruudukko-tyoarkit',
  'image-crossword': 'kuvaristikko-tyoarkit',
  'image-cryptogram': 'kryptogrammit-tyoarkit',
  'math-puzzle': 'matikkapulmat-tyoarkit',
  'missing-pieces': 'puuttuvat-palat-tyoarkit',
  'more-less': 'enemman-vahemman-tyoarkit',
  'odd-one-out': 'mika-ei-sovi-tyoarkit',
  'pattern-train': 'kuviosarjat-tyoarkit',
  'pattern-worksheet': 'kuviot-tyoarkit',
  'picture-path': 'labyrintit-tyoarkit',
  'picture-sort': 'lajittelu-tyoarkit',
  'prepositions': 'sijaintisanat-tyoarkit',
  'shadow-match': 'varjokuvat-tyoarkit',
  'subtraction': 'vahennyslasku-tyoarkit',
  'treasure-hunt': 'aarteenetsinta-tyoarkit',
  'word-guess': 'hirsipuu-tyoarkit',
  'writing-app': 'kirjoitus-tyoarkit',
};

const toolFiSlugs = {
  'image-addition': 'yhteenlasku-generaattori',
  'image-subtraction': 'vahennyslasku-generaattori',
  'code-addition': 'koodi-yhteenlasku-generaattori',
  'more-less': 'enemman-vahemman-generaattori',
  'math-puzzle': 'matikkapulma-generaattori',
  'math-worksheet': 'matematiikka-generaattori',
  'alphabet-train': 'aakkoset-generaattori',
  'prepositions': 'sijaintisanat-generaattori',
  'word-guess': 'hirsipuu-generaattori',
  'word-scramble': 'sekoitetut-sanat-generaattori',
  'word-search': 'sanahaku-generaattori',
  'cryptogram': 'kryptogrammi-generaattori',
  'writing': 'kirjoitus-generaattori',
  'big-small': 'iso-pieni-generaattori',
  'pattern-train': 'kuviosarja-generaattori',
  'pattern-worksheet': 'kuvio-generaattori',
  'draw-and-color': 'piirra-varita-generaattori',
  'drawing-lines': 'viivaharjoitus-generaattori',
  'coloring': 'varityskuva-generaattori',
  'chart-count': 'laskutaulukko-generaattori',
  'matching': 'yhdistamis-generaattori',
  'grid-match': 'ruudukko-generaattori',
  'shadow-match': 'varjokuva-generaattori',
  'bingo': 'bingokortti-generaattori',
  'picture-sort': 'lajittelu-generaattori',
  'missing-pieces': 'puuttuvat-palat-generaattori',
  'odd-one-out': 'mika-ei-sovi-generaattori',
  'sudoku': 'sudoku-generaattori',
  'picture-path': 'labyrintti-generaattori',
  'find-and-count': 'etsi-laske-generaattori',
  'find-objects': 'piilokuva-generaattori',
  'crossword': 'kuvaristikko-generaattori',
  'treasure-hunt': 'aarteenetsinta-generaattori',
};

function processFile(filePath, idKey, fiSlugs) {
  const src = fs.readFileSync(filePath, 'utf8');
  // Match each entry by its id; find the `slugs: { ... }` block and
  // insert `fi: '...'` before the closing `},`.
  let output = src;
  let inserted = 0;
  let skipped = 0;
  const errors = [];

  for (const [id, fiSlug] of Object.entries(fiSlugs)) {
    // Anchor the regex to the specific entry: `<idKey>: '<id>',\s*slugs: {`
    // then capture everything up to the next `},` for that slugs block.
    const entryRe = new RegExp(
      `(${idKey}:\\s*'${id.replace(/[-]/g, '\\-')}',\\s*\\r?\\n\\s*slugs:\\s*\\{)([\\s\\S]*?)(\\r?\\n\\s*\\},)`,
      'g'
    );
    const before = output;
    output = output.replace(entryRe, (_, head, body, tail) => {
      if (/\bfi:\s*'/.test(body)) {
        skipped++;
        return _; // already has fi — skip
      }
      // Insert before the closing `},`. Match the indentation of the
      // last sibling (e.g. `      no: '...',`).
      const indentMatch = body.match(/\n(\s+)[a-z]{2}:\s*'/);
      const indent = indentMatch ? indentMatch[1] : '      ';
      const sep = /,\s*$/.test(body.trimEnd()) ? '' : ',';
      // If the body ends with a bare value + newline (no trailing comma),
      // add one before adding fi:.
      const trimmedBody = body.replace(/\s+$/, '');
      const newBody = `${trimmedBody}${/,\s*$/.test(trimmedBody) ? '' : ','}\n${indent}fi: '${fiSlug}'`;
      inserted++;
      return `${head}${newBody}${tail}`;
    });
    if (output === before && !Object.keys(fiSlugs).slice(0, Object.keys(fiSlugs).indexOf(id) + 1).some((k) => new RegExp(`\\bfi:\\s*'${fiSlugs[k]}'`).test(output))) {
      errors.push(`${idKey}=${id}: entry not found in ${path.basename(filePath)}`);
    }
  }

  fs.writeFileSync(filePath, output);
  return { inserted, skipped, errors };
}

console.log('--- product-page-slugs.ts ---');
const r1 = processFile(
  path.join(root, 'frontend/config/product-page-slugs.ts'),
  'appId',
  productFiSlugs
);
console.log(`Inserted: ${r1.inserted} | Skipped: ${r1.skipped} | Errors: ${r1.errors.length}`);
r1.errors.forEach((e) => console.log('  ' + e));

console.log('\n--- tool-page-slugs.ts ---');
const r2 = processFile(
  path.join(root, 'frontend/config/tool-page-slugs.ts'),
  'toolId',
  toolFiSlugs
);
console.log(`Inserted: ${r2.inserted} | Skipped: ${r2.skipped} | Errors: ${r2.errors.length}`);
r2.errors.forEach((e) => console.log('  ' + e));

if (r1.errors.length || r2.errors.length) {
  process.exit(1);
}
