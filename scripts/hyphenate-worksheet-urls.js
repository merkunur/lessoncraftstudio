#!/usr/bin/env node
// Replace all /worksheet-generators/<spaced name>.html URL patterns with
// /worksheet-generators/<hyphenated name>.html in source files. The
// literal filesystem filenames still have spaces; next.config.js emits
// 301 redirects from the hyphenated URLs to the spaced ones so external
// backlinks and internal emissions both work.

const fs = require('fs');
const path = require('path');

const targets = [
  'frontend/lib/worksheet-generators.ts',
  'frontend/config/products.ts',
];

const root = path.resolve(__dirname, '..');
let totalReplacements = 0;

for (const rel of targets) {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) {
    console.log('SKIP (missing): ' + rel);
    continue;
  }
  let src = fs.readFileSync(fp, 'utf8');
  const before = src;

  // Match /worksheet-generators/<path that includes at least one space>.html
  // up to a closing quote or query/hash.
  src = src.replace(
    /\/worksheet-generators\/([^'"\s?)]+(?: [^'"\s?)]+)+)\.html/g,
    (_, name) => `/worksheet-generators/${name.replace(/ /g, '-')}.html`
  );

  if (src !== before) {
    const replacements = (before.match(/\/worksheet-generators\/[^'"\s?)]+(?: [^'"\s?)]+)+\.html/g) || []).length;
    fs.writeFileSync(fp, src);
    console.log('OK  ' + rel + ' (' + replacements + ' replacements)');
    totalReplacements += replacements;
  } else {
    console.log('-- ' + rel + ' (no matches)');
  }
}

console.log('\nTotal replacements: ' + totalReplacements);
