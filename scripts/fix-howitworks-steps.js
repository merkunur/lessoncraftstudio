const fs = require('fs');
const filePath = 'frontend/components/homepage/HowItWorks.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the duplicate steps array: "]; = [" means old array follows new one
const badPattern = ']; = [';
const idx = content.indexOf(badPattern);
if (idx === -1) {
  console.log('Pattern not found - already fixed');
  process.exit(0);
}

// Keep everything up to "];" (including the semicolon)
const before = content.substring(0, idx + 2);
const after = content.substring(idx + 2);

// " = [" starts the old array. Find its matching "];"
let bracketCount = 0;
let endIdx = 0;
for (let i = 0; i < after.length; i++) {
  if (after[i] === '[') bracketCount++;
  if (after[i] === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
if (after[endIdx] === ';') endIdx++;

content = before + after.substring(endIdx);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed HowItWorks.tsx duplicate steps array');
