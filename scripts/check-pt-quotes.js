const fs = require('fs');
const path = require('path');
const dirs = ['app-content','tool-content','bundle-content','guide-content','idea-content','start-content'];

for (const dir of dirs) {
  const base = path.join('frontend', 'config', dir, 'pt');
  if (!fs.existsSync(base)) continue;
  for (const f of fs.readdirSync(base)) {
    const fp = path.join(base, f);
    const content = fs.readFileSync(fp, 'utf8');

    // Try to check for syntax issues by looking for unescaped quotes in string literals
    // Find all single-quoted string values (content between single quotes on property lines)
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Skip lines that are just structural
      if (!line.includes("'")) continue;

      // Match lines like: key: 'value',  or  'value',
      // Check for unescaped quotes inside string content
      const match = line.match(/:\s*'(.+)'/);
      if (match) {
        const val = match[1];
        // Check if the value has unescaped single quotes (not preceded by backslash)
        const unescaped = val.match(/(?<!\\)'/);
        if (unescaped) {
          // This means the string content has an unescaped quote - potential break
          console.log(fp + ':' + (i+1) + ' - unescaped quote found');
        }
      }
    }
  }
}
