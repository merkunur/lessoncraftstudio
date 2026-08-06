const fs = require('fs');
const content = fs.readFileSync('C:/Users/rkgen/lessoncraftstudio/docs/TPT-LISTINGS-ES.md', 'utf8');

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
    if (lines[i].includes('**T\u00edtulo**')) {
      titleBlockStart = i;
    }
    if (lines[i].includes('**Tags**')) {
      tagBlockStart = i;
    }
  }

  // Get title: between ``` markers after **T\u00edtulo**
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

  const hasRespuestas = section.includes('Clave de respuestas') || section.includes('Respuestas') || section.includes('Soluci\u00f3n') || section.includes('respuestas');
  const hasCTA = section.includes('LessonCraftStudio.com');
  const hasNiveles = section.includes('Niveles');

  console.log(`${num}${variant}: [${titleLen} chars] [${titleStatus}] ${title}`);
  console.log(`    Tags: ${tags.length} [${tagStatus}] | Respuestas: ${hasRespuestas ? 'YES' : 'NO'} | CTA: ${hasCTA ? 'YES' : 'NO'} | Niveles: ${hasNiveles ? 'YES' : 'NO'}`);
});

console.log(`\nTotal listings: ${allSections.length}`);
console.log(`By variant: A=${variantCounts.A || 0}, B=${variantCounts.B || 0}, C=${variantCounts.C || 0}`);
console.log(`Errors: ${errors}`);
