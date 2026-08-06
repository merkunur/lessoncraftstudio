const fs = require('fs');

const files = [
  'frontend/components/homepage/HowItWorks.tsx',
  'frontend/components/homepage/HomepageHero.tsx',
  'frontend/components/homepage/AppCategories.tsx',
  'frontend/components/homepage/HomepageFeatures.tsx',
  'frontend/components/homepage/HomepageCTA.tsx',
];

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check for the duplicate pattern "};> = {" which means old content left behind
  let idx;
  while ((idx = content.indexOf('};> = {')) !== -1) {
    // Keep everything up to and including "};"
    const before = content.substring(0, idx + 2);
    const after = content.substring(idx + 2);

    // Find the matching close of the old object in 'after' which starts with "> = {"
    let braceCount = 0;
    let endIdx = 0;
    for (let i = 0; i < after.length; i++) {
      if (after[i] === '{') braceCount++;
      if (after[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIdx = i + 1;
          break;
        }
      }
    }
    if (after[endIdx] === ';') endIdx++;

    content = before + after.substring(endIdx);
    console.log(`  Fixed duplicate in ${filePath}`);
  }

  // Also check for duplicate arrays "];const steps" or similar patterns
  const arrayDupPattern = '];const steps';
  let arrIdx = content.indexOf(arrayDupPattern);
  if (arrIdx !== -1) {
    // Keep up to and including "];"
    const before = content.substring(0, arrIdx + 2);
    const after = content.substring(arrIdx + 2);
    // Find the closing "];" of the old array
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
    console.log(`  Fixed duplicate array in ${filePath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('All duplicates fixed');
