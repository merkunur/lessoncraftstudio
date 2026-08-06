const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let totalReplacements = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace TPT/TpT as standalone words, but protect slug strings
  // Strategy: temporarily replace slug strings, then replace TPT, then restore
  const slugStore = [];

  // Protect quoted slug strings containing 'tpt' (case insensitive)
  content = content.replace(/'[a-z0-9][a-z0-9-]*tpt[a-z0-9-]*'/gi, (m) => {
    slugStore.push(m);
    return `__PSLUG${slugStore.length - 1}__`;
  });

  // Also protect import paths or file references
  content = content.replace(/"[^"]*tpt[^"]*"/gi, (m) => {
    // Only protect if looks like a path/slug (no spaces, has slashes or hyphens)
    if (!m.includes(' ') && (m.includes('/') || m.includes('-'))) {
      slugStore.push(m);
      return `__PSLUG${slugStore.length - 1}__`;
    }
    return m;
  });

  // Now replace all standalone TPT and TpT
  let count = 0;
  content = content.replace(/\bTPT\b/g, () => { count++; return 'Gumroad'; });
  content = content.replace(/\bTpT\b/g, () => { count++; return 'Gumroad'; });

  // Restore slugs
  for (let i = 0; i < slugStore.length; i++) {
    content = content.replace(`__PSLUG${i}__`, slugStore[i]);
  }

  // Also fix "lehrerspezifischen" which slipped through
  const extra = [
    ['lehrerspezifischen', 'plattformspezifischen'],
    ['lehrerspezifische', 'plattformspezifische'],
    ['Klassenlehrer', 'Käufer'],
  ];
  for (const [s, r] of extra) {
    const c = content.split(s).length - 1;
    if (c > 0) { count += c; content = content.split(s).join(r); }
  }

  if (content !== original) {
    totalReplacements += count;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ${file}: ${count}`);
  }
}

console.log('Total pass-5 replacements:', totalReplacements);
