const fs = require('fs');
const path = require('path');

const dir = 'frontend/content/product-pages/en/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let totalFixed = 0;

for (const f of files) {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');

  // Look for double-backslash before apostrophe: \\'  (two actual backslash chars followed by ')
  // In the file, this is the byte sequence: 0x5C 0x5C 0x27
  // We want to replace with single-backslash apostrophe: \'  (0x5C 0x27)

  let count = 0;
  let newContent = '';
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '\\' && content[i+1] === '\\' && content[i+2] === "'") {
      // Replace \\ + ' with \ + '
      newContent += "\\'";
      i += 2; // skip the next two chars (second backslash and apostrophe)
      count++;
    } else {
      newContent += content[i];
    }
  }

  if (count > 0) {
    fs.writeFileSync(fp, newContent, 'utf8');
    console.log(`Fixed ${f}: ${count} occurrences`);
    totalFixed += count;
  }
}

console.log(`\nTotal: ${totalFixed} fixes across ${files.length} files`);

// Verify: check no double-backslash-apostrophe remains
let remaining = 0;
for (const f of files) {
  const fp = path.join(dir, f);
  const content = fs.readFileSync(fp, 'utf8');
  for (let i = 0; i < content.length - 2; i++) {
    if (content[i] === '\\' && content[i+1] === '\\' && content[i+2] === "'") {
      remaining++;
      console.log(`STILL BAD: ${f} at position ${i}`);
    }
  }
}
console.log(`\nVerification: ${remaining} remaining double-escapes`);
