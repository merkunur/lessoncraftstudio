// Fix ALL unescaped single quotes inside single-quoted TS string values
// Strategy: Parse each file, find string values between ' delimiters on content/heading/etc lines,
// and escape any internal single quotes

const fs = require('fs');
const path = require('path');
const dirs = ['app-content','tool-content','bundle-content','guide-content','idea-content','start-content'];
let totalFixed = 0;
let totalReplacements = 0;

for (const dir of dirs) {
  const base = path.join('frontend', 'config', dir, 'pt');
  if (!fs.existsSync(base)) continue;
  for (const f of fs.readdirSync(base)) {
    const fp = path.join(base, f);
    let content = fs.readFileSync(fp, 'utf8');
    const original = content;

    // Strategy: find all instances where we have a single quote inside a single-quoted string
    // These TS files use single quotes for all string values
    // A properly terminated string looks like: key: 'value without quotes',
    // A broken string has: key: 'value with 'inner' quotes',

    // Better approach: find content/heading string values that span to end-of-line
    // and contain unescaped single quotes

    // Match patterns like:  content: 'text...text',  or  heading: 'text',
    // where text might contain unescaped quotes

    // Use a state machine approach: process character by character
    const lines = content.split('\n');
    const fixedLines = [];
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this line starts a string property value
      // Pattern: some whitespace + key: 'value...',  or  key: 'value...\n (multiline)
      const propMatch = line.match(/^(\s*(?:content|heading|title|description|metaTitle|metaDescription|titleTag|snippetAnswer|answer|question|anchorText|primaryAlt|alt|caption|summary|intro|heroTitle|heroSubtitle|text|label|name|placeholder|bullet|step|tip):\s*')(.*)$/);

      if (propMatch) {
        const prefix = propMatch[1]; // everything up to and including opening quote
        let rest = propMatch[2];

        // Check if this line ends the string (ends with ', or ',\n)
        // For multiline strings (with \n), the closing quote is at the end of the line
        if (rest.match(/^(.*)',?\s*$/)) {
          // Single-line string value
          const endMatch = rest.match(/^(.*?)'(,?\s*)$/);
          if (endMatch) {
            // The last ' is the closing delimiter
            const stringContent = endMatch[1];
            const suffix = "'" + endMatch[2];

            // But we need to be smarter - the LAST unescaped ' is the closing delimiter
            // Find the rightmost ' that's followed by , or end of line
            const lastQuoteIdx = rest.lastIndexOf("'");
            if (lastQuoteIdx > 0) {
              const stringContent = rest.substring(0, lastQuoteIdx);
              const afterQuote = rest.substring(lastQuoteIdx);

              // Escape all unescaped single quotes in the content
              const escaped = stringContent.replace(/(?<!\\)'/g, "\\'");
              if (escaped !== stringContent) {
                fixedLines.push(prefix + escaped + afterQuote);
                changed = true;
                continue;
              }
            }
          }
        }
      }

      fixedLines.push(line);
    }

    if (changed) {
      const newContent = fixedLines.join('\n');
      fs.writeFileSync(fp, newContent, 'utf8');
      totalFixed++;
      console.log('Fixed: ' + fp);
    }
  }
}
console.log('\nTotal files fixed:', totalFixed);
