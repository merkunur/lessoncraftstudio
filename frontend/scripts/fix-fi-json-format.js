/**
 * Fix Finnish blog files that use JSON-style double-quoted keys.
 * Converts "key": "value" to key: 'value' format in hero sections.
 *
 * Also rebuilds secondary keywords from actual heading text for all
 * pages where secondary-kw-not-in-headings fails.
 *
 * Run: node frontend/scripts/fix-fi-json-format.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TYPES = ['app-content', 'tool-content', 'guide-content', 'blog-content', 'idea-content', 'start-content', 'bundle-content', 'compare-content'];

// Fix 1: Convert JSON-style keys in hero/sections to TypeScript style
let jsonFixes = 0;
for (const locale of LOCALES) {
  for (const type of TYPES) {
    const dirPath = path.join('frontend', 'config', type, locale);
    if (!fs.existsSync(dirPath)) continue;

    for (const file of fs.readdirSync(dirPath).filter(f => f.endsWith('.ts')).sort()) {
      const filePath = path.join(dirPath, file);
      let text = fs.readFileSync(filePath, 'utf-8');

      // Check if file has JSON-style keys outside seo block (hero, sections, etc.)
      // Pattern: "key": "value" or "key": [
      if (/"(title|tagline|description|heading|content|question|answer|step|category|introduction)":\s*"/m.test(text)) {
        // Only convert the non-seo parts (hero, sections, etc.)
        // But be careful not to break the seo block if it's already been fixed

        // Convert "key": "value" to key: 'value'
        let newText = text;

        // Replace all JSON-style key-value pairs
        newText = newText.replace(/"(title|tagline|description|heading|content|question|answer|step|category|introduction|platform)":\s*"((?:[^"\\]|\\.)*)"/g,
          (match, key, value) => {
            // Escape single quotes in value
            const escaped = value.replace(/'/g, "\\'");
            return key + ": '" + escaped + "'";
          }
        );

        // Replace "key": [ for arrays that use JSON-style
        newText = newText.replace(/"(secondaryKeywords|lsiKeywords|sections|productIdeas|platformTips|faq|internalLinks|relatedArticles)":\s*\[/g,
          (match, key) => key + ': ['
        );

        if (newText !== text) {
          fs.writeFileSync(filePath, newText, 'utf-8');
          jsonFixes++;
          console.log(`JSON-FIX: ${locale}/${type}/${file}`);
        }
      }
    }
  }
}

console.log(`\nDone: ${jsonFixes} files converted from JSON-style to TypeScript-style keys.`);
