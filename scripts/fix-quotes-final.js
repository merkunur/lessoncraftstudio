/**
 * Final quote fix: Replace ALL curly quotes with straight ones,
 * then convert ALL single-quoted strings to double-quoted strings.
 * Double-quoted strings in TypeScript handle apostrophes natively.
 *
 * Strategy:
 * 1. Fix curly quotes (U+2018/2019 → ', U+201C/201D → ")
 * 2. For each .ts file, parse line by line
 * 3. Convert single-quoted string literals to double-quoted
 * 4. This means apostrophes inside strings work fine
 * 5. Any existing double quotes inside content need to be escaped
 */
const fs = require('fs');
const path = require('path');

const CONFIG_DIR = 'frontend/config';
let totalFiles = 0;
let totalConversions = 0;

function processFile(fp) {
  let content = fs.readFileSync(fp, 'utf8');

  // Step 1: Replace curly quotes
  content = content.replace(/[\u2018\u2019]/g, "'");
  content = content.replace(/[\u201C\u201D]/g, '"');

  // Step 2: Convert single-quoted strings to double-quoted
  // Parse character by character, tracking string state
  let result = '';
  let i = 0;
  const original = content;

  while (i < content.length) {
    // Check for single quote that starts a string
    if (content[i] === "'") {
      // Scan forward to find the matching closing single quote
      // An unescaped ' that doesn't have a word character before AND after
      // is a delimiter. An unescaped ' between word characters is ambiguous.

      // Collect everything until we find what looks like the end of string
      let j = i + 1;
      let chars = [];
      let foundEnd = false;

      while (j < content.length && !foundEnd) {
        if (content[j] === '\\' && j + 1 < content.length) {
          // Escaped character
          if (content[j + 1] === "'") {
            // \' inside single-quoted string — this is an escaped apostrophe
            // In double-quoted string, we just need the apostrophe
            chars.push("'");
            j += 2;
            continue;
          }
          chars.push(content[j], content[j + 1]);
          j += 2;
          continue;
        }

        if (content[j] === "'") {
          // Potential end of string OR internal apostrophe
          // Heuristic: if next char is , or ) or ; or } or \n or end of line
          // OR if next char is whitespace followed by non-word context, it's the end
          const next = j + 1 < content.length ? content[j + 1] : '\n';

          // Common string-end patterns
          if (/[,);}\]\n\r]/.test(next) || next === ' ' && j + 2 < content.length && /[+})\]]/.test(content[j + 2])) {
            // This is the end of the string
            foundEnd = true;
            break;
          }

          // Check if this is a possessive/contraction (word'word or word' space)
          const prev = chars.length > 0 ? chars[chars.length - 1] : '';
          if (/[a-zA-ZÀ-ÿ]/.test(prev) && /[a-zA-ZÀ-ÿ\s]/.test(next)) {
            // Internal apostrophe — keep it as regular apostrophe
            chars.push("'");
            j++;
            continue;
          }

          // Default: treat as end of string
          foundEnd = true;
          break;
        }

        if (content[j] === '\n') {
          // Single-quoted strings can't span lines in TS — this is the end
          // Actually this means the string is broken — just output as-is
          result += "'";
          for (const c of chars) result += c;
          i = j;
          foundEnd = false;
          break;
        }

        chars.push(content[j]);
        j++;
      }

      if (foundEnd) {
        const stringContent = chars.join('');

        if (stringContent.length >= 30) {
          // Convert to double-quoted string
          // Escape any existing double quotes in the content
          const escaped = stringContent.replace(/"/g, '\\"');
          result += '"' + escaped + '"';
          totalConversions++;
        } else {
          // Short string — keep as single-quoted
          result += "'" + stringContent + "'";
        }
        i = j + 1;
      } else if (j >= content.length) {
        // Reached end of file without closing quote — output as-is
        result += "'" + chars.join('');
        i = j;
      }
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

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp);
    else if (e.name.endsWith('.ts')) processFile(fp);
  }
}

walk(CONFIG_DIR);
console.log(`Converted ${totalConversions} strings in ${totalFiles} files`);
