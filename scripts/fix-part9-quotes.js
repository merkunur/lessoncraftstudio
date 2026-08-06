const fs = require('fs');

const files = [
  'frontend/config/guide-content/fr/automate-printable-business.ts',
  'frontend/config/guide-content/fr/copyright-printable-sellers.ts',
  'frontend/config/guide-content/fr/email-marketing-printables.ts',
  'frontend/config/guide-content/fr/multilingual-printable-business.ts',
  'frontend/config/guide-content/fr/niche-selection-printables.ts',
  'frontend/config/guide-content/fr/research-profitable-niches.ts',
  'frontend/config/guide-content/fr/scale-printable-business-guide.ts',
  'frontend/config/guide-content/fr/social-media-printable-marketing.ts',
  'frontend/config/guide-content/fr/understanding-commercial-licenses.ts',
  'frontend/config/bundle-content/fr/visual-bundle.ts',
];

let fixed = 0;
for (const fp of files) {
  let content = fs.readFileSync(fp, 'utf8');
  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('primaryKeyword:') || line.trimStart().startsWith('titleTag:')) {
      // Count single quotes in the line
      const quoteCount = (line.match(/'/g) || []).length;
      if (quoteCount > 2) {
        // There are unescaped apostrophes inside the string
        // Strategy: find first and last quote, escape any quotes in between
        const firstQuote = line.indexOf("'");
        const lastQuote = line.lastIndexOf("'");
        if (firstQuote !== lastQuote) {
          const before = line.substring(0, firstQuote + 1);
          const value = line.substring(firstQuote + 1, lastQuote);
          const after = line.substring(lastQuote);
          // Escape all apostrophes in the value
          const escapedValue = value.replace(/'/g, "\\'");
          lines[i] = before + escapedValue + after;
          changed = true;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(fp, lines.join('\n'), 'utf8');
    fixed++;
    console.log('Fixed: ' + fp);
  }
}
console.log('Total fixed: ' + fixed);
