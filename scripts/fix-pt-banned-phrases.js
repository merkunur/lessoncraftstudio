#!/usr/bin/env node
/**
 * Fix banned phrases in PT content files.
 * Replaces "tempo limitado" → "edição sazonal" / "por época"
 * Replaces "tendência agora" → "em alta atualmente"
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');
const DIRS = [
  'app-content/pt', 'tool-content/pt', 'bundle-content/pt',
  'start-content/pt', 'guide-content/pt', 'idea-content/pt',
];

let fixed = 0;

for (const dir of DIRS) {
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Replace "tempo limitado" with context-appropriate alternatives
    // Common patterns:
    // "por tempo limitado" → "sazonais" or "por época"
    // "de tempo limitado" → "sazonais" or "por época"
    // "tempo limitado" in general → "edição sazonal"

    if (/tempo limitado/i.test(content)) {
      // "por tempo limitado" → "por época" or "sazonais"
      content = content.replace(/por tempo limitado/gi, 'por época');
      // "de tempo limitado" → "sazonais"
      content = content.replace(/de tempo limitado/gi, 'sazonais');
      // "tempo limitado" remaining → "época definida"
      content = content.replace(/tempo limitado/gi, 'época definida');
      changed = true;
    }

    if (/tendência agora/i.test(content)) {
      content = content.replace(/tendência agora/gi, 'em alta atualmente');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`FIXED: ${dir}/${file}`);
      fixed++;
    }
  }
}

console.log(`\nDone: ${fixed} files fixed`);
