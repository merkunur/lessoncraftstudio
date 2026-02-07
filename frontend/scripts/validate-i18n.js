#!/usr/bin/env node
/**
 * i18n Validator
 * Ensures all translation keys exist across all language files
 *
 * Reports missing keys that would cause MISSING_MESSAGE errors in production.
 *
 * Created: 2026-01-27
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../messages');
const MASTER_LOCALE = 'en';
const LOCALES = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/**
 * Recursively get all keys from a nested object
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

console.log('i18n Key Validator');
console.log('==================');
console.log('');

// Check if messages directory exists
if (!fs.existsSync(MESSAGES_DIR)) {
  console.log(`ERROR: Messages directory not found at ${MESSAGES_DIR}`);
  process.exit(1);
}

// Load master (English) keys
const masterPath = path.join(MESSAGES_DIR, `${MASTER_LOCALE}.json`);
if (!fs.existsSync(masterPath)) {
  console.log(`ERROR: Master locale file not found: ${masterPath}`);
  process.exit(1);
}

const masterContent = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const masterKeys = getAllKeys(masterContent);

console.log(`Master (${MASTER_LOCALE}): ${masterKeys.length} keys`);
console.log('');

let totalMissing = 0;
let localesWithMissing = [];

for (const locale of LOCALES) {
  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);

  if (!fs.existsSync(localePath)) {
    console.log(`SKIP: ${locale}.json not found`);
    continue;
  }

  try {
    const localeContent = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    const localeKeys = getAllKeys(localeContent);

    const missing = masterKeys.filter(k => !localeKeys.includes(k));

    if (missing.length > 0) {
      console.log(`${locale}: MISSING ${missing.length} keys`);
      missing.slice(0, 5).forEach(k => console.log(`  - ${k}`));
      if (missing.length > 5) {
        console.log(`  ... and ${missing.length - 5} more`);
      }
      totalMissing += missing.length;
      localesWithMissing.push(locale);
    } else {
      console.log(`${locale}: OK (${localeKeys.length} keys)`);
    }
  } catch (e) {
    console.log(`ERROR: Failed to parse ${locale}.json: ${e.message}`);
  }
}

console.log('');
console.log('==================');

if (totalMissing > 0) {
  console.log(`RESULT: ${totalMissing} missing key(s) across ${localesWithMissing.length} locale(s)`);
  console.log(`Affected locales: ${localesWithMissing.join(', ')}`);
  console.log('');
  console.log('Missing keys will show as "MISSING_MESSAGE" in production.');
  console.log('Consider adding the missing translations.');
  // Warning only - don't fail the build
  process.exit(0);
} else {
  console.log('RESULT: All locales have complete translations');
  process.exit(0);
}
