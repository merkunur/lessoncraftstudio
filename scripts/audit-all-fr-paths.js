const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/guide-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/bundle-content/fr',
];

const allPaths = [];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Match any string containing /samples/french/
      const matches = [...line.matchAll(/'([^']*\/samples\/french\/[^']*)'/g)];
      for (const m of matches) {
        let val = m[1].replace(/\\'/g, "'");
        allPaths.push(dir.replace('frontend/config/', '') + '/' + f.replace('.ts', '') + '\t' + val);
      }
    }
  }
}

// Deduplicate paths
const uniqueMap = new Map();
for (const entry of allPaths) {
  const [source, p] = entry.split('\t');
  if (!uniqueMap.has(p)) uniqueMap.set(p, []);
  uniqueMap.get(p).push(source);
}

console.log('Total references: ' + allPaths.length);
console.log('Unique paths: ' + uniqueMap.size);
console.log('\n=== UNIQUE PATHS ===');
for (const [p, sources] of [...uniqueMap.entries()].sort()) {
  console.log(p);
}
