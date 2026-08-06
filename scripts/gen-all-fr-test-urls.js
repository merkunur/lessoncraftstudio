const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/guide-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/bundle-content/fr',
];

const uniquePaths = new Set();

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
      const matches = [...line.matchAll(/'((?:[^'\\]|\\.)*)'/g)];
      for (const m of matches) {
        let val = m[1].replace(/\\'/g, "'");
        if (val.includes('/samples/french/') && !val.endsWith('/')) {
          uniquePaths.add(val);
        }
      }
    }
  }
}

// Encode each path as browser would
function browserEncode(rawPath) {
  let encoded = '';
  let i = 0;
  while (i < rawPath.length) {
    if (rawPath[i] === '%' && i + 2 < rawPath.length && /[0-9A-Fa-f]{2}/.test(rawPath.substr(i+1, 2))) {
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
  return encoded;
}

const sorted = [...uniquePaths].sort();
for (const p of sorted) {
  const encoded = browserEncode(p);
  console.log(encoded);
}
