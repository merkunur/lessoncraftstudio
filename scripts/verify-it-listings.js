const fs = require('fs');
const content = fs.readFileSync('C:/Users/rkgen/lessoncraftstudio/docs/TPT-LISTINGS-IT.md', 'utf8');

// Support all variants: A, B, C
const variantPattern = /^## (\d+)([ABC])\./m;
const allSections = content.split(/^## \d+[ABC]\./m);
allSections.shift(); // Remove header

// Extract variant labels from original content
const variantLabels = [];
let match;
const re = /^## (\d+)([ABC])\./gm;
while ((match = re.exec(content)) !== null) {
  variantLabels.push({ num: parseInt(match[1]), variant: match[2] });
}

let errors = 0;
const variantCounts = { A: 0, B: 0, C: 0 };

allSections.forEach((section, idx) => {
  const { num, variant } = variantLabels[idx];
  variantCounts[variant] = (variantCounts[variant] || 0) + 1;
  const lines = section.split('\n');

  let titleFound = false;
  let title = '';
  let tagLine = '';
  let titleBlockStart = -1;
  let tagBlockStart = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('**Titolo**')) {
      titleBlockStart = i;
    }
    if (lines[i].includes('**Tags**')) {
      tagBlockStart = i;
    }
  }

  // Get title: between ``` markers after **Titolo**
  if (titleBlockStart >= 0) {
    for (let i = titleBlockStart + 1; i < lines.length; i++) {
      if (lines[i].trim() === '```' && !titleFound) {
        titleFound = true;
        continue;
      }
      if (titleFound && lines[i].trim() === '```') {
        break;
      }
      if (titleFound) {
        title = lines[i];
        break;
      }
    }
  }

  // Get tags
  let tagsFound = false;
  if (tagBlockStart >= 0) {
    for (let i = tagBlockStart + 1; i < lines.length; i++) {
      if (lines[i].trim() === '```' && !tagsFound) {
        tagsFound = true;
        continue;
      }
      if (tagsFound && lines[i].trim() === '```') {
        break;
      }
      if (tagsFound) {
        tagLine = lines[i];
        break;
      }
    }
  }

  const titleLen = title.length;
  const titleStatus = titleLen <= 80 ? 'OK' : 'TOO LONG';
  if (titleLen > 80) errors++;

  const tags = tagLine.split(',').map(t => t.trim()).filter(t => t.length > 0);
  const tagStatus = tags.length === 10 ? 'OK' : (tags.length + ' tags');
  if (tags.length !== 10) errors++;

  const hasCorrezione = section.includes('Chiave di correzione') || section.includes('Correzione') || section.includes('Soluzione') || section.includes('Risposte') || section.includes('correzione') || section.includes('risposte');
  const hasCTA = section.includes('LessonCraftStudio.com');
  const hasLivelli = section.includes('Livelli');

  console.log(`${num}${variant}: [${titleLen} chars] [${titleStatus}] ${title}`);
  console.log(`    Tags: ${tags.length} [${tagStatus}] | Correzione: ${hasCorrezione ? 'YES' : 'NO'} | CTA: ${hasCTA ? 'YES' : 'NO'} | Livelli: ${hasLivelli ? 'YES' : 'NO'}`);
});

console.log(`\nTotal listings: ${allSections.length}`);
console.log(`By variant: A=${variantCounts.A || 0}, B=${variantCounts.B || 0}, C=${variantCounts.C || 0}`);
console.log(`Errors: ${errors}`);
