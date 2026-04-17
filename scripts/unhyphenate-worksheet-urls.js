#!/usr/bin/env node
// Undo Commit G's hyphenation. Nginx serves /worksheet-generators/*
// directly from the filesystem, bypassing Next.js redirects() entirely,
// so hyphenated URLs 404 on the live site. Reverting the link emissions
// back to the original spaced filenames is the safest fix.
//
// Idempotent: only acts on paths/filenames that contain a hyphen but no
// space, and whose space-containing equivalent exists in the known list.

const fs = require('fs');
const path = require('path');

const hyphenToSpace = {
  'alphabet-train': 'alphabet train',
  'big-small': 'big small',
  'chart-count': 'chart count',
  'code-addition': 'code addition',
  'draw-and-color': 'draw and color',
  'drawing-lines': 'drawing lines',
  'find-and-count': 'find and count',
  'find-objects': 'find objects',
  'grid-match': 'grid match',
  'math-puzzle': 'math puzzle',
  'math-worksheet': 'math worksheet',
  'memory-game': 'memory game',
  'missing-pieces': 'missing pieces',
  'more-less': 'more less',
  'odd-one-out': 'odd one out',
  'pattern-complete': 'pattern complete',
  'pattern-train': 'pattern train',
  'pattern-worksheet': 'pattern worksheet',
  'picture-path': 'picture path',
  'picture-sort': 'picture sort',
  'same-different': 'same different',
  'shadow-match': 'shadow match',
  'treasure-hunt': 'treasure hunt',
  'word-guess': 'word guess',
  'word-scramble': 'word scramble',
};

const root = path.resolve(__dirname, '..');

const targets = [
  'frontend/lib/worksheet-generators.ts',
  'frontend/config/products.ts',
];

let totalReplacements = 0;

for (const rel of targets) {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) continue;
  let src = fs.readFileSync(fp, 'utf8');
  const before = src;

  // Replace /worksheet-generators/<hyphenated>.html → spaced
  src = src.replace(
    /\/worksheet-generators\/([a-z][a-z-]*[a-z])\.html/g,
    (match, slug) => {
      if (hyphenToSpace[slug]) {
        return `/worksheet-generators/${hyphenToSpace[slug]}.html`;
      }
      return match;
    }
  );

  // Replace htmlFile: 'hyphenated.html' → spaced
  src = src.replace(
    /htmlFile:\s*'([a-z][a-z-]*[a-z])\.html'/g,
    (match, slug) => {
      if (hyphenToSpace[slug]) {
        return `htmlFile: '${hyphenToSpace[slug]}.html'`;
      }
      return match;
    }
  );

  if (src !== before) {
    const count = (before.match(/\/worksheet-generators\/[a-z][a-z-]*[a-z]\.html|htmlFile:\s*'[a-z][a-z-]*[a-z]\.html'/g) || [])
      .filter((m) => {
        const s = m.match(/([a-z][a-z-]*[a-z])\.html/);
        return s && hyphenToSpace[s[1]];
      }).length;
    fs.writeFileSync(fp, src);
    console.log('OK  ' + rel + ' (' + count + ' replacements)');
    totalReplacements += count;
  } else {
    console.log('-- ' + rel + ' (no matches)');
  }
}

console.log('\nTotal replacements: ' + totalReplacements);
