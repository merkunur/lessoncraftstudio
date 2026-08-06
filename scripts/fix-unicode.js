const fs = require('fs');
const filePath = 'C:/Users/rkgen/lessoncraftstudio/docs/TPT-LISTINGS-FR.md';
let content = fs.readFileSync(filePath, 'utf8');

// Remove any remaining literal backslashes before Unicode characters
// After the partial fix, we have patterns like \é \à \è etc.
// Also handle any remaining \uXXXX sequences
content = content.replace(/\\u([0-9a-fA-F]{4})/g, (m, hex) => String.fromCharCode(parseInt(hex, 16)));

// Remove stray backslashes before accented chars and special chars
content = content.replace(/\\(\u00e9|\u00e8|\u00ea|\u00eb|\u00e0|\u00e2|\u00e7|\u00f4|\u00f9|\u00fb|\u00ee|\u00ef|\u00fc|\u00c9|\u00c8|\u00ca|\u00c0|\u00c2|\u00c7|\u2019|\u2018|\u201c|\u201d|\u2014|\u2013|\u2022|\u00ab|\u00bb|\u00d7|\u2192|\u2264|\u0153)/g, '$1');

fs.writeFileSync(filePath, content, 'utf8');

// Verify
const fixed = fs.readFileSync(filePath, 'utf8');
const hasBackslash = fixed.includes('\\');
console.log('Has remaining backslashes:', hasBackslash);
if (hasBackslash) {
  const lines = fixed.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('\\')) {
      console.log(`  Line ${i+1}: ${line.substring(0, 80)}`);
    }
  });
}
console.log('Done. File size:', fixed.length, 'chars');
