/**
 * Replace ALL non-ASCII quote characters with their ASCII equivalents,
 * properly escaped for use inside single-quoted TypeScript strings.
 *
 * Targets: U+201E „, U+201C ", U+201D ", U+00AB «, U+00BB »
 * These are INCOMPATIBLE with SWC's single-quoted string parser.
 */
const fs = require('fs');
const path = require('path');

let totalFiles = 0;

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { processDir(fp); continue; }
    if (!e.name.endsWith('.ts')) continue;

    const content = fs.readFileSync(fp, 'utf8');
    const fixed = content
      .replace(/\u201E/g, '\\"')   // „ German open double
      .replace(/\u201C/g, '\\"')   // " left double quote
      .replace(/\u201D/g, '\\"')   // " right double quote
      .replace(/\u00AB/g, '\\"')   // « French guillemet open
      .replace(/\u00BB/g, '\\"');  // » French guillemet close

    if (fixed !== content) {
      fs.writeFileSync(fp, fixed, 'utf8');
      totalFiles++;
    }
  }
}

processDir('frontend/config');
console.log('Fixed ' + totalFiles + ' files');
