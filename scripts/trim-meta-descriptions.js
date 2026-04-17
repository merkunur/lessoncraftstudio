const fs = require('fs');
const path = require('path');

const replacements = {
  'addition.ts':
    'Addition worksheet generator for Etsy and KDP sellers. 4 math modes, 104 image themes, auto answer keys, 11 languages. Try free with watermark.',
  'pattern-train.ts':
    'Pattern train worksheet generator for Etsy and KDP sellers. AB/AAB/ABB/ABC/AABB patterns, themed images, 11 languages. Commercial license. Try free.',
  'code-addition.ts':
    "Code addition puzzle generator for Etsy and KDP sellers. Crack-the-code math competitors don\\'t offer. 104 themes, answer keys. Try free.",
  'math-worksheet.ts':
    'Math worksheet generator for Etsy and KDP sellers. Addition, subtraction, multiplication, division with custom ranges. 300 DPI PDFs. Try free.',
  'pattern-worksheet.ts':
    'Pattern worksheet generator for Etsy and KDP sellers. Multiple pattern types, 104 themes, auto answer keys, 11 languages. Commercial license. Try free.',
  'picture-path.ts':
    'Picture path maze generator for Etsy and KDP sellers. Themed visual paths, multiple layouts, auto answer keys. Commercial license. Try free.',
  'shadow-match.ts':
    'Shadow match worksheet generator for Etsy and KDP sellers. 104 themed sets, answer keys, best-selling preschool format. Commercial license. Try free.',
  'subtraction.ts':
    'Subtraction worksheet generator for Etsy and KDP sellers. Visual counting, themed images, auto answer keys, 11 languages. Commercial license. Try free.',
  'chart-count.ts':
    'Chart count worksheet generator for Etsy and KDP sellers. Themed images, multiple layouts, auto answer keys, 11 languages. Commercial license. Try free.',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');
for (const [file, newMeta] of Object.entries(replacements)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');
  const re = /metaDescription:\s*('(?:[^'\\]|\\.)*')/;
  const m = src.match(re);
  if (!m) {
    console.error('NO META: ' + file);
    process.exit(1);
  }
  // Build the new value. If newMeta contains escaped apostrophe, keep it literal.
  src = src.replace(re, `metaDescription: '${newMeta}'`);
  fs.writeFileSync(fp, src);
  // Measure decoded length for reporting
  const decoded = newMeta
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  console.log('OK  ' + file.padEnd(24) + '  len=' + decoded.length);
}
