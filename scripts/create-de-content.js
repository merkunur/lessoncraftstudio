const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function w(name, content) {
  fs.writeFileSync(path.join(dir, name), content, 'utf8');
  console.log('Created ' + name);
}

const which = process.argv[2];
if (!which) { console.log('Usage: node create-de-content.js <filename>'); process.exit(1); }

// Helper to build file content
function build(obj) {
  return `import type { AppDetailContent } from '../types';\n\nexport const content: AppDetailContent = ${JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, (m, k) => k.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/) ? `${k}:` : m)};\n`;
}

// Actually, JSON.stringify won't produce valid TS. Let's just use the raw approach per file.
// We'll read from stdin or just hardcode per file.

console.log('Use the individual file scripts instead');
