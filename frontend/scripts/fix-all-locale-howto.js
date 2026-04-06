/**
 * Find and fix "How to" equivalent titles in all non-EN locales.
 * Removes the "How to" prefix, capitalizes the next word.
 *
 * Run: node frontend/scripts/fix-all-locale-howto.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPES = ['guide-content', 'blog-content', 'start-content', 'idea-content'];

const HOW_TO = {
  de: [/^Wie man /i, /^Wie Sie /i, /^So /i],
  fr: [/^Comment /i],
  es: [/^Cómo /i],
  pt: [/^Como /i],
  it: [/^Come /i],
  nl: [/^Hoe /i],
  sv: [/^Hur man /i, /^Hur du /i],
  da: [/^Sådan /i, /^Hvordan /i],
  no: [/^Slik /i, /^Hvordan /i],
  fi: [/^Miten /i, /^Kuinka /i],
};

function extractTitle(text) {
  const seoRe = /seo:\s*\{[\s\S]*?\n\s*\}/;
  const seoBlock = text.match(seoRe);
  if (!seoBlock) return null;
  const m = seoBlock[0].match(/titleTag:\s*'((?:[^'\\]|\\.)*)'/s);
  if (m) return m[1].replace(/\\'/g, "'");
  return null;
}

let fixed = 0;

for (const locale of LOCALES) {
  const patterns = HOW_TO[locale] || [];
  for (const type of TYPES) {
    const dirPath = path.join('frontend', 'config', type, locale);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');
      const title = extractTitle(text);
      if (!title) continue;

      for (const pattern of patterns) {
        if (pattern.test(title)) {
          // Remove the "How to" prefix
          const newTitle = title.replace(pattern, '').replace(/^\s*/, '');
          // Capitalize first letter
          const capitalized = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);

          const escaped = title.replace(/'/g, "\\'");
          const escapedNew = capitalized.replace(/'/g, "\\'");
          text = text.replace(
            "titleTag: '" + escaped + "'",
            "titleTag: '" + escapedNew + "'"
          );
          fs.writeFileSync(filePath, text, 'utf-8');
          fixed++;
          console.log(`FIXED: ${locale}/${type}/${file}`);
          console.log(`  OLD: ${title}`);
          console.log(`  NEW: ${capitalized}`);
          break;
        }
      }
    }
  }
}

console.log(`\nDone: ${fixed} "How to" titles fixed.`);
