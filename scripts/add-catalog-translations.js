#!/usr/bin/env node
// One-shot script: insert exportToCatalog + 3 related keys into each
// REFERENCE TRANSLATIONS/translations-*.js file's 11 locale blocks.
// Re-runnable: skips locales that already have the keys.

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS');

// Translation file → app slug. Apps not in this map are skipped.
const FILES = [
  'translations-addition-complete.js',
  'translations-alphabet-train-complete.js',
  'translations-big-small.js',
  'translations-picture-bingo.js',
  'translations-chart-count.js',
  'translations-code-addition.js',
  'translations-crossword.js',
  'translations-cryptogram.js',
  'translations-find-and-count-complete.js',
  'translations-find-objects.js',
  'translations-grid-match.js',
  'translations-matchup-maker.js',
  'translations-math-puzzle.js',
  'translations-math-worksheet-final.js',
  'translations-missing-pieces.js',
  'translations-more-less.js',
  'translations-odd-one-out.js',
  'translations-pattern-train.js',
  'translations-pattern-worksheet.js',
  'translations-picture-pathway.js',
  'translations-picture-sort.js',
  'translations-prepositions.js',
  'translations-shadow-match.js',
  'translations-subtraction.js',
  'translations-sudoku.js',
  'translations-treasure-hunt.js',
  'translations-word-guess.js',
  'translations-word-scramble-complete.js',
  'translations-wordsearch-complete.js',
];

const LOCALE_TRANSLATIONS = {
  en: {
    exportToCatalog:    'Export to catalog',
    exportingToCatalog: 'Exporting…',
    catalogExportSuccess: 'Exported to catalog: ',
    catalogExportError:   'Catalog export failed: ',
  },
  de: {
    exportToCatalog:    'In den Katalog exportieren',
    exportingToCatalog: 'Wird exportiert…',
    catalogExportSuccess: 'In Katalog exportiert: ',
    catalogExportError:   'Katalog-Export fehlgeschlagen: ',
  },
  fr: {
    exportToCatalog:    'Exporter vers le catalogue',
    exportingToCatalog: 'Exportation en cours…',
    catalogExportSuccess: 'Exporté vers le catalogue : ',
    catalogExportError:   "Échec de l'export vers le catalogue : ",
  },
  es: {
    exportToCatalog:    'Exportar al catálogo',
    exportingToCatalog: 'Exportando…',
    catalogExportSuccess: 'Exportado al catálogo: ',
    catalogExportError:   'Error al exportar al catálogo: ',
  },
  pt: {
    exportToCatalog:    'Exportar para o catálogo',
    exportingToCatalog: 'Exportando…',
    catalogExportSuccess: 'Exportado para o catálogo: ',
    catalogExportError:   'Falha ao exportar para o catálogo: ',
  },
  it: {
    exportToCatalog:    'Esporta nel catalogo',
    exportingToCatalog: 'Esportazione in corso…',
    catalogExportSuccess: 'Esportato nel catalogo: ',
    catalogExportError:   'Esportazione nel catalogo non riuscita: ',
  },
  nl: {
    exportToCatalog:    'Naar catalogus exporteren',
    exportingToCatalog: 'Bezig met exporteren…',
    catalogExportSuccess: 'Geëxporteerd naar catalogus: ',
    catalogExportError:   'Export naar catalogus mislukt: ',
  },
  sv: {
    exportToCatalog:    'Exportera till katalog',
    exportingToCatalog: 'Exporterar…',
    catalogExportSuccess: 'Exporterad till katalog: ',
    catalogExportError:   'Katalogexport misslyckades: ',
  },
  da: {
    exportToCatalog:    'Eksporter til kataloget',
    exportingToCatalog: 'Eksporterer…',
    catalogExportSuccess: 'Eksporteret til kataloget: ',
    catalogExportError:   'Katalog-eksport mislykkedes: ',
  },
  no: {
    exportToCatalog:    'Eksporter til katalog',
    exportingToCatalog: 'Eksporterer…',
    catalogExportSuccess: 'Eksportert til katalog: ',
    catalogExportError:   'Katalogeksport mislyktes: ',
  },
  fi: {
    exportToCatalog:    'Vie katalogiin',
    exportingToCatalog: 'Viedään…',
    catalogExportSuccess: 'Viety katalogiin: ',
    catalogExportError:   'Katalogin vienti epäonnistui: ',
  },
};

const LOCALES = Object.keys(LOCALE_TRANSLATIONS);

function escapeJsString(str) {
  // Match the file's existing single-quoted-or-double-quoted style — we use
  // double quotes here. Escape backslash, double quote, and tab/newline.
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function processFile(filePath) {
  const fileName = path.basename(filePath);
  let src = fs.readFileSync(filePath, 'utf8');
  let totalInsertions = 0;
  const skipped = [];

  for (const locale of LOCALES) {
    // Find the locale's object block. Two shapes seen in the wild: the
    // quoted form `"<locale>": {` (most files) and the unquoted form
    // `<locale>: {` (a few files like alphabet-train / math-worksheet).
    //
    // CRITICAL: anchor to start of a line (preceded by `\n` and optional
    // whitespace). Earlier versions matched `\bes` mid-string and broke
    // French strings like `"Sélectionnées : {} / {}"` where `é` (non-word
    // char) creates a word boundary just before `es`, then the value
    // contains ` : {`. Now we require the locale-key to be at the start
    // of an indented line.
    const localeOpenRegex = new RegExp(
      '(?:^|\\n)[ \\t]*(?:"' + locale + '"|' + locale + ')\\s*:\\s*\\{',
      'g'
    );
    const match = localeOpenRegex.exec(src);
    if (!match) {
      skipped.push(`${locale} (no block found)`);
      continue;
    }

    // Probe the FIRST 300 characters after the opening `{` only — we always
    // insert as the first 4 keys of the block, so if exportToCatalog is
    // already there, it'll be in this window. A wider probe risks false
    // positives by picking up the same key in a later locale's block (the
    // file's locale order is en/de/fr/es/IT/pt/... — so a probe starting
    // from `it` could incorrectly see `pt`'s already-inserted key).
    const probeStart = match.index + match[0].length;
    const probeWindow = src.slice(probeStart, probeStart + 300);
    if (/"exportToCatalog"\s*:/.test(probeWindow)) {
      skipped.push(`${locale} (already present)`);
      continue;
    }

    // Build the 4-key insert. Trailing newlines so the insertion sits cleanly
    // as the first 4 entries of the locale block. Use 4-space indentation —
    // matches the indentation seen in the existing files.
    const t = LOCALE_TRANSLATIONS[locale];
    const insert =
      '\n    "exportToCatalog": "' + escapeJsString(t.exportToCatalog) + '",' +
      '\n    "exportingToCatalog": "' + escapeJsString(t.exportingToCatalog) + '",' +
      '\n    "catalogExportSuccess": "' + escapeJsString(t.catalogExportSuccess) + '",' +
      '\n    "catalogExportError": "' + escapeJsString(t.catalogExportError) + '",';

    // Insert directly after the locale's opening `{`.
    const insertPoint = match.index + match[0].length;
    src = src.slice(0, insertPoint) + insert + src.slice(insertPoint);
    totalInsertions++;

    // After insertion the regex's lastIndex is invalidated; reset its index
    // by recreating it on the next loop iteration (we already do — `new RegExp`
    // each pass). lastIndex doesn't carry across pass since we're using
    // a fresh regex each iteration.
  }

  if (totalInsertions > 0) {
    fs.writeFileSync(filePath, src, 'utf8');
  }
  console.log(`  ${fileName.padEnd(45)} +${totalInsertions} locales` +
    (skipped.length ? `  (skipped: ${skipped.join(', ')})` : ''));
  return { totalInsertions, skipped };
}

function main() {
  console.log('Adding exportToCatalog (+ 3 related keys) to ' + FILES.length + ' translation files');
  console.log('  in ' + TRANSLATIONS_DIR);
  console.log('');
  let grandTotal = 0;
  for (const fileName of FILES) {
    const filePath = path.join(TRANSLATIONS_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`  ${fileName.padEnd(45)} SKIPPED (file not found)`);
      continue;
    }
    const { totalInsertions } = processFile(filePath);
    grandTotal += totalInsertions;
  }
  console.log('');
  console.log(`Total: ${grandTotal} locale-block insertions across ${FILES.length} files`);
}

main();
