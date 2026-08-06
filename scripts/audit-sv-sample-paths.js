/**
 * Audit all Swedish app-content sample image paths against actual server files.
 *
 * Usage: node scripts/audit-sv-sample-paths.js
 *
 * Reads server file list from scripts/sv-server-files.txt (one path per line).
 * Then checks every /samples/swedish/ path in app-content/sv/*.ts files.
 */

const fs = require('fs');
const path = require('path');

// Read server file list
const serverFiles = new Set();
const serverFilesRaw = fs.readFileSync(path.join(__dirname, 'sv-server-files.txt'), 'utf8').trim().split('\n');
for (const line of serverFilesRaw) {
  // Each line is like: addition/addition_övning.webp
  // URL-encode each segment for comparison
  const parts = line.trim().split('/');
  const encoded = parts.map(p => encodeURIComponent(p)).join('/');
  serverFiles.add('/samples/swedish/' + encoded);
}
console.log(`Loaded ${serverFiles.size} server files\n`);

// Scan all Swedish app-content files
const svDir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'sv');
const files = fs.readdirSync(svDir).filter(f => f.endsWith('.ts'));

let totalPaths = 0;
let brokenPaths = 0;
const broken = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(svDir, file), 'utf8');
  // Find all /samples/swedish/ paths
  const pathRegex = /['"]\/samples\/swedish\/([^'"]+)['"]/g;
  let match;
  while ((match = pathRegex.exec(content)) !== null) {
    totalPaths++;
    const rawPath = match[1];
    // The path in the content file may already be URL-encoded or not
    // Normalize: decode then re-encode each segment
    const decoded = rawPath.split('/').map(seg => {
      try { return decodeURIComponent(seg); } catch { return seg; }
    });
    const reEncoded = decoded.map(seg => encodeURIComponent(seg)).join('/');
    const fullPath = '/samples/swedish/' + reEncoded;

    if (!serverFiles.has(fullPath)) {
      brokenPaths++;
      broken.push({
        file,
        rawPath: '/samples/swedish/' + rawPath,
        decoded: decoded.join('/'),
        expected: fullPath,
      });
    }
  }
}

console.log(`Checked ${totalPaths} paths in ${files.length} files`);
console.log(`Found ${brokenPaths} broken paths\n`);

if (broken.length > 0) {
  console.log('=== BROKEN PATHS ===');
  for (const b of broken) {
    console.log(`${b.file}:`);
    console.log(`  Content: ${b.rawPath}`);
    console.log(`  Decoded: ${b.decoded}`);
    console.log();
  }
}
