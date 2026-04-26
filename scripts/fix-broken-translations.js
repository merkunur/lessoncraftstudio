#!/usr/bin/env node
// Cleanup script: undo the run-2 buggy insertions where the script
// inserted a 4-key catalog block in the middle of a string value
// because the unquoted `\bes` regex matched inside `Sélectionnées : {`
// (and similar patterns in other locales).
//
// Detects 5-line patterns where a string ending in bare `{` is followed
// by exactly the 4 inserted catalog keys, and reconstructs the original
// single-line string.

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS');

// Multiline regex to find each broken insertion. Captures:
//   1: the broken-open string content `"...{` (without trailing newline)
//   2: the original tail that survived on the catalogExportError line, e.g. `} / {}",`
const BROKEN_RE = new RegExp(
  '("[^"\\n]*\\{)\\n' +
  '\\s*"exportToCatalog":\\s*"[^"]*",\\n' +
  '\\s*"exportingToCatalog":\\s*"[^"]*",\\n' +
  '\\s*"catalogExportSuccess":\\s*"[^"]*",\\n' +
  '\\s*"catalogExportError":\\s*"[^"]*",(.*)',
  'g'
);

function processFile(filePath) {
  const fileName = path.basename(filePath);
  let src = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  src = src.replace(BROKEN_RE, function (_full, brokenOpen, originalTail) {
    count++;
    return brokenOpen + originalTail;
  });
  if (count > 0) {
    fs.writeFileSync(filePath, src, 'utf8');
  }
  console.log(`  ${fileName.padEnd(45)} fixed ${count} broken insertion(s)`);
  return count;
}

function main() {
  const files = fs.readdirSync(TRANSLATIONS_DIR)
    .filter(f => f.startsWith('translations-') && f.endsWith('.js'))
    .map(f => path.join(TRANSLATIONS_DIR, f));
  console.log('Scanning ' + files.length + ' translation files for broken catalog insertions');
  let total = 0;
  for (const filePath of files) {
    total += processFile(filePath);
  }
  console.log('');
  console.log('Total broken insertions repaired: ' + total);
}

main();
