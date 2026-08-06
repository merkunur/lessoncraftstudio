const fs = require('fs');
const filePath = 'frontend/app/[locale]/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The metadata script left duplicate content. The new metadata ends with the fi entry,
// then there's "};\n" followed by "> = {" which is the old content.
// Find the pattern "};> = {" and remove everything from there until the next "};"
const badPattern = '};> = {';
const badIdx = content.indexOf(badPattern);
if (badIdx === -1) {
  console.log('Pattern not found - file may already be fixed');
  process.exit(0);
}

// The new content ends at "};", so we want to keep everything up to and including the first "};"
// after badIdx, we need to find the closing "};" of the OLD metadata
const afterBad = content.substring(badIdx + 2); // skip the "};" from new, keep the "> = {" onwards

// Find the matching closing "};" of the old metadata object
let braceCount = 0;
let endIdx = 0;
for (let i = 0; i < afterBad.length; i++) {
  if (afterBad[i] === '{') braceCount++;
  if (afterBad[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
// Include the semicolon after closing brace
if (afterBad[endIdx] === ';') endIdx++;

// Remove the old content: keep everything before badIdx + 2 (the "};") and after the old block
content = content.substring(0, badIdx + 2) + afterBad.substring(endIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed page.tsx - removed duplicate old metadata');
