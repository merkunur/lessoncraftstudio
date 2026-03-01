/**
 * Apply vocabulary fixes to raw JSON and corrections JSON
 * ========================================================
 *
 * Reads fix files from linguist agents (linguist-fixes-*.json) and applies them to:
 * - image-vocabulary-raw.json (singular fixes)
 * - vocabulary-corrections.json (plural and gender fixes)
 *
 * Usage: node scripts/apply-vocabulary-fixes.js
 */

const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, 'v2-data', 'image-vocabulary-raw.json');
const corrPath = path.join(__dirname, 'v2-data', 'vocabulary-corrections.json');

const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
const corrections = JSON.parse(fs.readFileSync(corrPath, 'utf8'));

// Load all fix files
const fixFiles = [
  'linguist-fixes-a-g.json',
  'linguist-fixes-h-o.json',
  'linguist-fixes-p-z.json',
  'linguist-fixes-supplementary.json',
];

let allFixes = [];
for (const file of fixFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const fixes = data.fixes || data;
    allFixes = allFixes.concat(fixes);
    console.log(`Loaded ${fixes.length} fixes from ${file}`);
  } else {
    console.log(`WARNING: ${file} not found, skipping`);
  }
}

console.log(`\nTotal fixes to apply: ${allFixes.length}`);

// Deduplicate (same key+locale+field = keep last occurrence)
const deduped = new Map();
for (const fix of allFixes) {
  const k = `${fix.key}:${fix.locale}:${fix.field}`;
  deduped.set(k, fix);
}
const fixes = [...deduped.values()];
console.log(`After deduplication: ${fixes.length} unique fixes`);

// Apply fixes
let singularFixed = 0, pluralFixed = 0, genderFixed = 0, skipped = 0;
const log = [];

for (const fix of fixes) {
  const { key, locale, field, wrong, correct, reason } = fix;

  if (!key || !locale || !field || !correct) {
    console.log(`  SKIP: incomplete fix entry: ${JSON.stringify(fix)}`);
    skipped++;
    continue;
  }

  if (field === 'singular') {
    // Fix in raw JSON
    if (!raw[key]) {
      console.log(`  SKIP: key "${key}" not found in raw JSON`);
      skipped++;
      continue;
    }
    const current = raw[key][locale];
    if (current === correct) {
      // Already fixed
      continue;
    }
    if (wrong && current !== wrong) {
      console.log(`  WARN: ${key}/${locale} singular expected "${wrong}" but found "${current}" - applying fix anyway`);
    }
    raw[key][locale] = correct;
    log.push(`  singular: ${key}/${locale}: "${current}" → "${correct}" (${reason || ''})`);
    singularFixed++;
  }

  if (field === 'plural') {
    // Fix in corrections JSON
    if (!corrections[key]) corrections[key] = {};
    const corrEntry = corrections[key][locale];

    if (Array.isArray(corrEntry)) {
      // [plural, gender] format
      const currentPlural = corrEntry[0];
      if (currentPlural === correct) continue;
      corrections[key][locale][0] = correct;
      log.push(`  plural: ${key}/${locale}: "${currentPlural}" → "${correct}" (${reason || ''})`);
    } else if (typeof corrEntry === 'string') {
      // Simple string plural
      if (corrEntry === correct) continue;
      corrections[key][locale] = correct;
      log.push(`  plural: ${key}/${locale}: "${corrEntry}" → "${correct}" (${reason || ''})`);
    } else {
      // No existing entry - create one
      // For gendered languages, we need to know the gender
      if (['de','fr','es','pt','it','nl','sv','da','no'].includes(locale)) {
        const gender = fix.gender || null;
        if (gender) {
          corrections[key][locale] = [correct, gender];
        } else {
          corrections[key][locale] = correct;
        }
      } else {
        corrections[key][locale] = correct;
      }
      log.push(`  plural (new): ${key}/${locale}: → "${correct}" (${reason || ''})`);
    }
    pluralFixed++;
  }

  if (field === 'gender') {
    // Fix in corrections JSON
    if (!corrections[key]) corrections[key] = {};
    const corrEntry = corrections[key][locale];

    if (Array.isArray(corrEntry)) {
      const currentGender = corrEntry[1];
      if (currentGender === correct) continue;
      corrections[key][locale][1] = correct;
      log.push(`  gender: ${key}/${locale}: "${currentGender}" → "${correct}" (${reason || ''})`);
    } else if (typeof corrEntry === 'string') {
      // Convert from string to array to add gender
      corrections[key][locale] = [corrEntry, correct];
      log.push(`  gender (new): ${key}/${locale}: → "${correct}" (${reason || ''})`);
    } else {
      console.log(`  WARN: ${key}/${locale} has no correction entry to add gender to`);
      skipped++;
      continue;
    }
    genderFixed++;
  }
}

console.log(`\n=== APPLY SUMMARY ===`);
console.log(`Singulars fixed: ${singularFixed}`);
console.log(`Plurals fixed: ${pluralFixed}`);
console.log(`Genders fixed: ${genderFixed}`);
console.log(`Skipped: ${skipped}`);

if (log.length > 0) {
  console.log(`\n--- Change Log (${log.length} changes) ---`);
  for (const entry of log) {
    console.log(entry);
  }
}

// Write updated files
if (singularFixed > 0) {
  fs.writeFileSync(rawPath, JSON.stringify(raw, null, 2), 'utf8');
  console.log(`\nWrote updated raw JSON to ${rawPath}`);
}

if (pluralFixed > 0 || genderFixed > 0) {
  fs.writeFileSync(corrPath, JSON.stringify(corrections, null, 2), 'utf8');
  console.log(`Wrote updated corrections to ${corrPath}`);
}

console.log('\nDone! Now run: node scripts/build-image-vocabulary.js');
