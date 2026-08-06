const fs = require('fs');

const mainFile = 'C:/Users/rkgen/lessoncraftstudio/docs/TPT-LISTINGS-ES.md';
const tempFile = process.argv[2] || 'C:/Users/rkgen/lessoncraftstudio/docs/TPT-LISTINGS-ES-part.tmp.md';

// Read temp file
let content = fs.readFileSync(tempFile, 'utf8');

// Fix unicode escapes: \uXXXX -> actual chars
content = content.replace(/\\u([0-9a-fA-F]{4})/g, (m, hex) => String.fromCharCode(parseInt(hex, 16)));

// Remove any stray backslashes before accented/special chars (safety net)
content = content.replace(/\\([\u00e0-\u00ff\u00c0-\u00df\u2019\u2018\u201c\u201d\u2014\u2013\u2022\u00ab\u00bb\u00d7\u2192\u2264\u0153\u00f1\u00d1\u00bf\u00a1])/g, '$1');

// Append to main file
fs.appendFileSync(mainFile, content, 'utf8');

// Delete temp file
fs.unlinkSync(tempFile);

console.log('Appended and cleaned up. Main file size:', fs.statSync(mainFile).size, 'bytes');
