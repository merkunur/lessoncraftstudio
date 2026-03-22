#!/usr/bin/env node
/**
 * Fix meta descriptions that exceed 160 characters.
 * Trims them to 155 chars at the nearest word boundary + ellipsis-free clean ending.
 *
 * Strategy: Cut at ~155 chars at last word boundary, then ensure it ends with a period.
 */

const fs = require('fs');
const path = require('path');

const CONFIG = path.join(__dirname, '..', 'frontend', 'config');
const MAX_LEN = 158;
const TARGET_LEN = 155;

const CONTENT_DIRS = [
  'app-content',
  'tool-content',
  'guide-content',
  'bundle-content',
  'idea-content',
  'start-content',
];

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'];

let totalFixed = 0;

for (const dir of CONTENT_DIRS) {
  for (const locale of LOCALES) {
    const localeDir = path.join(CONFIG, dir, locale);
    if (!fs.existsSync(localeDir)) continue;

    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
    for (const file of files) {
      const filePath = path.join(localeDir, file);
      let src = fs.readFileSync(filePath, 'utf8');

      // Find metaDescription value
      // Handle both single-line and multi-line formats:
      // metaDescription: 'text',
      // metaDescription: \n      'text',
      // metaDescription:\n      'text',
      const patterns = [
        // Single-quoted, possibly multiline assignment
        /metaDescription:\s*\n?\s*'((?:[^'\\]|\\.)*)'/,
        // Double-quoted
        /metaDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/,
        // Backtick
        /metaDescription:\s*\n?\s*`([^`]*)`/,
      ];

      let matched = false;
      for (const pattern of patterns) {
        const match = src.match(pattern);
        if (match && match[1]) {
          const desc = match[1];
          // Unescape any escaped quotes for length measurement
          const unescaped = desc.replace(/\\'/g, "'").replace(/\\"/g, '"');

          if (unescaped.length > MAX_LEN) {
            // Trim to TARGET_LEN at word boundary
            let trimmed = unescaped.slice(0, TARGET_LEN);
            // Find last sentence-ending period or space
            const lastPeriod = trimmed.lastIndexOf('.');
            const lastSpace = trimmed.lastIndexOf(' ');

            if (lastPeriod > TARGET_LEN - 30) {
              // End at the last period within reasonable range
              trimmed = trimmed.slice(0, lastPeriod + 1);
            } else if (lastSpace > 0) {
              // End at last word boundary, add period
              trimmed = trimmed.slice(0, lastSpace);
              // Remove trailing comma, semicolon, dash
              trimmed = trimmed.replace(/[,;—–\-]\s*$/, '').trim();
              if (!trimmed.endsWith('.')) trimmed += '.';
            }

            // Re-escape single quotes for the string literal
            const reescaped = trimmed.replace(/'/g, "\\'");

            // Replace in source
            const fullMatch = match[0];
            const newMatch = fullMatch.replace(match[1], reescaped);
            const newSrc = src.replace(fullMatch, newMatch);

            if (newSrc !== src) {
              src = newSrc;
              fs.writeFileSync(filePath, src, 'utf8');
              totalFixed++;
              const label = `${dir}/${locale}/${file}`;
              console.log(`  Fixed ${label}: ${unescaped.length} → ${trimmed.length} chars`);
            }
          }
          matched = true;
          break;
        }
      }
    }
  }
}

console.log(`\nTotal: ${totalFixed} meta descriptions trimmed to ≤${MAX_LEN} chars`);
