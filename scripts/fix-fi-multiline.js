const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', 'fi');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let fixedCount = 0;

for (const file of files) {
  const fp = path.join(dir, file);
  const src = fs.readFileSync(fp, 'utf8');

  let result = '';
  let inString = false;
  let stringChar = null;

  for (let i = 0; i < src.length; i++) {
    const c = src[i];

    if (!inString) {
      if (c === "'" || c === '"') {
        inString = true;
        stringChar = c;
      }
      result += c;
    } else {
      // Inside a string
      if (c === '\\') {
        // Escaped character — keep both chars
        result += c + (src[i + 1] || '');
        i++;
      } else if (c === stringChar) {
        // End of string
        inString = false;
        result += c;
      } else if (c === '\n') {
        // Literal newline inside string — replace with \n escape
        if (src[i + 1] === '\n') {
          result += '\\n\\n';
          i++; // skip second newline (paragraph break)
        } else {
          result += '\\n';
        }
      } else if (c === '\r') {
        // Skip carriage returns
        continue;
      } else {
        result += c;
      }
    }
  }

  if (result !== src) {
    fs.writeFileSync(fp, result, 'utf8');
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} of ${files.length} DA files`);
