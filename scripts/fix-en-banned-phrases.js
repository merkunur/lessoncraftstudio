#!/usr/bin/env node
/**
 * Fix banned phrases across all 194 English content files.
 * Replaces "passive income" with compliant alternatives.
 *
 * In lsiKeywords: "passive income" → "online business"
 * In FAQ answers/body text: "passive income" → "revenue"
 */
const fs = require('fs');
const path = require('path');

const DIRS = [
  path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en'),
  path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'en'),
  path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'en'),
  path.join(__dirname, '..', 'frontend', 'config', 'start-content', 'en'),
  path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'en'),
  path.join(__dirname, '..', 'frontend', 'config', 'idea-content', 'en'),
];

let totalFixed = 0;
let filesModified = 0;

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const original = fs.readFileSync(filePath, 'utf8');
    let content = original;

    // Replace "passive income" with context-appropriate alternatives
    // In lsiKeywords arrays (typically line 13-ish): replace with "online business"
    // In body text / FAQ answers: replace with "revenue"

    // Pattern 1: Inside lsiKeywords array values
    content = content.replace(
      /passive income/gi,
      (match, offset) => {
        // Check if this is inside an lsiKeywords context (within ~200 chars of 'lsiKeywords')
        const before = content.substring(Math.max(0, offset - 300), offset);
        if (before.includes('lsiKeywords')) {
          return 'online business';
        }
        // Body text / FAQ answers: use "revenue"
        return 'revenue';
      }
    );

    // Replace other banned phrases if found
    content = content.replace(/money machine/gi, 'profitable product line');
    content = content.replace(/cash cow/gi, 'reliable revenue source');
    content = content.replace(/guaranteed sales/gi, 'strong sales potential');
    content = content.replace(/guaranteed income/gi, 'reliable income potential');
    content = content.replace(/everyone is buying/gi, 'many sellers are succeeding with');
    content = content.replace(/trending now/gi, 'currently in demand');
    content = content.replace(/(?<!')best-selling/gi, 'top-performing');
    content = content.replace(/revolutionary/gi, 'powerful');
    content = content.replace(/game-changing/gi, 'highly effective');
    content = content.replace(/industry-leading/gi, 'professional-grade');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesModified++;
      const count = (original.match(/passive income/gi) || []).length;
      totalFixed += count;
      console.log(`FIXED: ${path.relative(process.cwd(), filePath)} (${count} replacements)`);
    }
  }
}

console.log(`\nDone. Modified ${filesModified} files, fixed ${totalFixed} banned phrase instances.`);
