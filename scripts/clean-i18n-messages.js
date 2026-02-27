#!/usr/bin/env node
/**
 * Clean dead i18n keys from all message files.
 * Removes: blogPage, pricing, top-level subscription (not dashboard.subscription)
 */
const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'frontend', 'messages');
const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const deadTopLevelKeys = ['blogPage', 'pricing', 'subscription'];

let totalRemoved = 0;

for (const locale of locales) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  let removed = 0;
  for (const key of deadTopLevelKeys) {
    if (content[key]) {
      const keyCount = JSON.stringify(content[key]).split('":').length - 1;
      delete content[key];
      removed += keyCount;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
  console.log(`${locale}.json: removed ${removed} keys`);
  totalRemoved += removed;
}

console.log(`\nTotal: removed ~${totalRemoved} keys across ${locales.length} files`);
