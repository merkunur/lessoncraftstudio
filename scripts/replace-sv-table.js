const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'frontend', 'config', 'showcase-i18n.ts');
let c = fs.readFileSync(file, 'utf8');

// Find and replace the old svStringTable with the new comprehensive one
const oldStart = "const svStringTable: Record<string, string> = {";
const oldEnd = "};\n\nfunction getStringTable";

const startIdx = c.indexOf(oldStart);
const endIdx = c.indexOf(oldEnd, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find svStringTable boundaries');
  process.exit(1);
}

const newTable = fs.readFileSync('/tmp/sv-table.txt', 'utf8').trim();

const before = c.substring(0, startIdx);
const after = c.substring(endIdx + 2); // skip the "};"

c = before + newTable + '\n\n' + after;

fs.writeFileSync(file, c, 'utf8');
console.log('Replaced svStringTable successfully');
console.log('New table has', (newTable.match(/'/g) || []).length / 4, 'approximate entries');
