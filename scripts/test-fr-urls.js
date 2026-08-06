// This script outputs curl-compatible URLs for all 99 unique FR image paths
// Simulates how a browser would encode these paths when used in <img src="...">
const fs = require('fs');
const dir = 'frontend/config/app-content/fr';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();
const unique = new Set();

for (const f of files) {
  const content = fs.readFileSync(dir + '/' + f, 'utf8');
  const lines = content.split('\n');
  let inVisuals = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('visuals:')) { inVisuals = true; braceDepth = 0; }
    if (inVisuals) {
      braceDepth += (line.match(/{/g) || []).length;
      braceDepth -= (line.match(/}/g) || []).length;
      const srcMatch = line.match(/(?:src|primary):\s*'(.+)'/);
      if (srcMatch) {
        const val = srcMatch[1].replace(/\\'/g, "'");
        if (val.includes('/samples/')) {
          unique.add(f.replace('.ts', '') + '\t' + val);
        }
      }
      if (braceDepth <= 0 && i > 0) inVisuals = false;
    }
  }
}

// For each unique path, simulate browser URL encoding
// Browser behavior: characters in src attribute get IRI-to-URI conversion
// - Spaces become %20
// - ASCII chars like ' ( ) , stay as-is or get encoded
// - Non-ASCII UTF-8 chars get percent-encoded as UTF-8 bytes
// - Already percent-encoded sequences like %E9 stay as-is
for (const entry of [...unique].sort()) {
  const [app, rawPath] = entry.split('\t');

  // Simulate browser encoding of the path
  // Split by already-encoded sequences to preserve them
  let encoded = '';
  let i = 0;
  while (i < rawPath.length) {
    if (rawPath[i] === '%' && i + 2 < rawPath.length && /[0-9A-Fa-f]{2}/.test(rawPath.substr(i+1, 2))) {
      // Already percent-encoded, keep as-is
      encoded += rawPath.substr(i, 3);
      i += 3;
    } else if (rawPath[i] === ' ') {
      encoded += '%20';
      i++;
    } else if (rawPath[i] === "'") {
      encoded += '%27';
      i++;
    } else if (rawPath[i] === ',') {
      encoded += '%2C';
      i++;
    } else if (rawPath[i] === '(') {
      encoded += '%28';
      i++;
    } else if (rawPath[i] === ')') {
      encoded += '%29';
      i++;
    } else if (rawPath.charCodeAt(i) > 127) {
      // Non-ASCII: encode as UTF-8 bytes
      const buf = Buffer.from(rawPath[i], 'utf8');
      for (const b of buf) {
        encoded += '%' + b.toString(16).toUpperCase();
      }
      i++;
    } else {
      encoded += rawPath[i];
      i++;
    }
  }

  console.log(app + '\t' + encoded);
}
