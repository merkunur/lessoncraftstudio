/**
 * FINAL comprehensive quote fixer.
 *
 * Processes each .ts file character by character, tracking whether we're
 * inside a string literal or not. Fixes:
 * 1. U+2018/U+2019 (curly single quotes) used as string delimiters → U+0027
 * 2. U+2018/U+2019 inside strings → \' (escaped straight apostrophe)
 * 3. U+201E/U+201C/U+201D (typographic double quotes) inside strings → \" (escaped straight double)
 * 4. U+00AB/U+00BB (guillemets) inside strings → \" (escaped straight double)
 *
 * Does NOT touch:
 * - Double-quoted strings (these handle apostrophes fine)
 * - Backtick template literals
 * - Regular code outside of strings
 */
const fs = require('fs');
const path = require('path');

const CONFIG_DIR = 'frontend/config';
let totalFiles = 0;

function processFile(fp) {
  const input = fs.readFileSync(fp, 'utf8');
  let output = '';
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    // Check for string literals
    if (ch === "'" || ch === '\u2018' || ch === '\u2019') {
      // Opening single-quoted string (any of: ' U+2018 U+2019)
      output += "'"; // Normalize delimiter to straight quote
      i++;

      // Scan string content until matching closing quote
      while (i < input.length) {
        const sc = input[i];

        if (sc === '\\') {
          // Escape sequence — copy as-is
          output += sc;
          i++;
          if (i < input.length) {
            output += input[i];
            i++;
          }
          continue;
        }

        if (sc === "'" || sc === '\u2019') {
          // Potential end of string or internal apostrophe
          // Heuristic: if this is followed by a string-end context, it's the closing delimiter
          const next = (i + 1 < input.length) ? input[i + 1] : '\n';

          if (/[,;)}\]\n\r:]/.test(next) || next === ' ' || next === '\t' || i + 1 >= input.length) {
            // Closing delimiter
            output += "'";
            i++;
            break;
          } else {
            // Internal apostrophe (e.g., don't, Valentine's, dell'utente, l'écriture)
            output += "\\'";
            i++;
            continue;
          }
        }

        if (sc === '\u2018') {
          // Left curly quote inside string — always an apostrophe
          output += "\\'";
          i++;
          continue;
        }

        // Handle typographic double quotes inside single-quoted strings
        if (sc === '\u201E' || sc === '\u201C' || sc === '\u201D') {
          output += '\\"';
          i++;
          continue;
        }

        if (sc === '\u00AB' || sc === '\u00BB') {
          output += '\\"';
          i++;
          continue;
        }

        if (sc === '\n') {
          // Newline in single-quoted string — string was never properly closed
          // Just output what we have and move on
          output += sc;
          i++;
          break;
        }

        // Regular character
        output += sc;
        i++;
      }
      continue;
    }

    // Double-quoted strings — pass through as-is (they handle apostrophes)
    if (ch === '"') {
      output += ch;
      i++;
      while (i < input.length) {
        if (input[i] === '\\') {
          output += input[i];
          i++;
          if (i < input.length) { output += input[i]; i++; }
          continue;
        }
        if (input[i] === '"') { output += input[i]; i++; break; }
        if (input[i] === '\n') { output += input[i]; i++; break; }
        output += input[i];
        i++;
      }
      continue;
    }

    // Backtick template literals — pass through as-is
    if (ch === '`') {
      output += ch;
      i++;
      while (i < input.length) {
        if (input[i] === '\\') {
          output += input[i];
          i++;
          if (i < input.length) { output += input[i]; i++; }
          continue;
        }
        if (input[i] === '`') { output += input[i]; i++; break; }
        output += input[i];
        i++;
      }
      continue;
    }

    // Handle curly quotes outside of any string literal
    // These might be in comments or other places — normalize them
    if (ch === '\u2018' || ch === '\u2019') {
      output += "'";
      i++;
      continue;
    }
    if (ch === '\u201E' || ch === '\u201C' || ch === '\u201D') {
      output += '"';
      i++;
      continue;
    }

    // Regular character
    output += ch;
    i++;
  }

  if (output !== input) {
    fs.writeFileSync(fp, output, 'utf8');
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
console.log('Processed ' + totalFiles + ' files');
