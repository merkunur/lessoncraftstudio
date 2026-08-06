/**
 * Convert ALL single-quoted strings longer than 30 characters to backtick
 * template literals. This is the nuclear option to permanently fix
 * apostrophe-in-string issues across all content files.
 *
 * Handles multi-line strings (string content spanning multiple lines with
 * concatenation via \n).
 */
const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content',
  'frontend/config/tool-content',
  'frontend/config/guide-content',
  'frontend/config/bundle-content',
  'frontend/config/idea-content',
  'frontend/config/start-content',
  'frontend/config/compare-content',
];

let totalFiles = 0;
let totalConversions = 0;

function processFile(fp) {
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;

  // Replace all single-quoted strings that are 30+ chars
  // This regex matches '...' where ... doesn't contain unescaped '
  // It handles escaped quotes inside: 'text with \' escaped quotes'
  // Strategy: match from opening ' to closing ', handling \' inside
  let result = '';
  let i = 0;

  while (i < content.length) {
    if (content[i] === "'") {
      // Found opening single quote — scan for the matching close
      let j = i + 1;
      let stringContent = '';
      let valid = true;

      while (j < content.length) {
        if (content[j] === '\\' && j + 1 < content.length) {
          // Escaped character — include both
          stringContent += content[j] + content[j + 1];
          j += 2;
          continue;
        }
        if (content[j] === "'") {
          // Found closing quote
          break;
        }
        if (content[j] === '\n') {
          // Newline inside single-quoted string is invalid — not a string
          valid = false;
          break;
        }
        stringContent += content[j];
        j++;
      }

      if (valid && j < content.length && content[j] === "'" && stringContent.length >= 30) {
        // Convert to backtick string
        // Unescape \' back to ' (not needed in backtick strings)
        let converted = stringContent.replace(/\\'/g, "'");
        // Escape backticks and ${} in the content
        converted = converted.replace(/`/g, '\\`');
        converted = converted.replace(/\$\{/g, '\\${');

        result += '`' + converted + '`';
        totalConversions++;
        i = j + 1;
        continue;
      }

      // Not a convertible string — output the quote as-is
      result += content[i];
      i++;
    } else {
      result += content[i];
      i++;
    }
  }

  if (result !== original) {
    fs.writeFileSync(fp, result, 'utf8');
    totalFiles++;
  }
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { processDir(fp); continue; }
    if (e.name.endsWith('.ts')) processFile(fp);
  }
}

dirs.forEach(processDir);
console.log('Converted ' + totalConversions + ' strings in ' + totalFiles + ' files to backticks');
