const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/rkgen/lessoncraftstudio/scripts/v2-data/image-vocabulary-raw.json', 'utf8'));
const keys = Object.keys(data);

console.log('Total entries:', keys.length);

// ============================================================
// THE DEFINITIVE TEST: For each language, extract ALL translations,
// use Unicode NFD decomposition to create a "stripped" version,
// and check if the actual value equals the stripped version
// (meaning diacritics were removed).
//
// Key insight: If a word like "Björn" was stripped to "Bjorn",
// then NFD("Björn") with marks removed = "Bjorn" = the actual value.
// But we don't HAVE the correct version to compare against.
//
// BEST APPROACH: Use the data ITSELF as a reference.
// For compound words, check if substrings appear with diacritics
// elsewhere in the same language's vocabulary.
// ============================================================

// APPROACH: Build a "diacritics dictionary" from the data itself.
// Every word that HAS diacritics teaches us the correct spelling.
// Then check every word WITHOUT diacritics to see if it should have them.

console.log('\n' + '='.repeat(70));
console.log('SELF-REFERENCING ANALYSIS');
console.log('Build dictionary from entries WITH diacritics, then check entries WITHOUT');
console.log('='.repeat(70));

for (const lang of ['sv', 'da', 'no', 'fi', 'fr', 'de', 'es', 'pt', 'it']) {
  // Step 1: Build dictionary of diacritic words
  // Map: stripped_lowercase -> original_with_diacritics
  const diacDict = {};
  const allValues = [];

  for (const key of keys) {
    const val = data[key][lang];
    if (!val) continue;
    allValues.push({ key, val: val.trim() });

    // If this word has non-ASCII chars, add to dictionary
    if (/[^\x00-\x7F]/.test(val)) {
      // Split compound words and add each part
      const parts = val.trim().split(/[\s\-]/);
      for (const part of parts) {
        if (/[^\x00-\x7F]/.test(part)) {
          const stripped = part.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          if (stripped !== part.toLowerCase()) {
            diacDict[stripped] = part;
          }
        }
      }
    }
  }

  // Step 2: Check entries WITHOUT diacritics against the dictionary
  const suspiciousEntries = [];

  for (const { key, val } of allValues) {
    if (/[^\x00-\x7F]/.test(val)) continue; // Skip words that already have diacritics

    // Split into parts and check each
    const parts = val.split(/[\s\-]/);
    for (const part of parts) {
      const lower = part.toLowerCase();
      if (diacDict[lower]) {
        // This part appears elsewhere WITH diacritics
        suspiciousEntries.push({
          key,
          fullWord: val,
          suspectPart: part,
          shouldBe: diacDict[lower]
        });
        break; // Only flag once per entry
      }
    }
  }

  const langNames = {
    sv: 'SWEDISH', da: 'DANISH', no: 'NORWEGIAN', fi: 'FINNISH',
    fr: 'FRENCH', de: 'GERMAN', es: 'SPANISH', pt: 'PORTUGUESE', it: 'ITALIAN'
  };

  console.log(`\n${langNames[lang]} (${lang}):`);
  console.log(`  Dictionary size: ${Object.keys(diacDict).length} diacritic word forms learned`);
  console.log(`  Suspicious entries: ${suspiciousEntries.length}`);

  if (suspiciousEntries.length > 0) {
    console.log(`  Examples (up to 30):`);
    for (let i = 0; i < Math.min(30, suspiciousEntries.length); i++) {
      const e = suspiciousEntries[i];
      console.log(`    ${e.key}: "${e.fullWord}" (part "${e.suspectPart}" should be "${e.shouldBe}")`);
    }
    if (suspiciousEntries.length > 30) {
      console.log(`    ... and ${suspiciousEntries.length - 30} more`);
    }
  }
}

// ============================================================
// THEME-SPECIFIC CHECK: The user mentioned "house" theme
// Let's check all entries tagged with house/home themes
// ============================================================

console.log('\n' + '='.repeat(70));
console.log('THEME CHECK: "house" theme entries');
console.log('='.repeat(70));

for (const key of keys) {
  const entry = data[key];
  const themes = entry._themes || [];
  const theme = entry._theme || '';

  if (themes.includes('house') || themes.includes('home') || theme === 'house' || theme === 'home') {
    console.log(`  ${key}:`);
    console.log(`    sv: "${entry.sv}" | da: "${entry.da}" | no: "${entry.no}" | fi: "${entry.fi}"`);
  }
}

// ============================================================
// COMPREHENSIVE: Dump ALL 1,246 Swedish values, sorted,
// with a flag indicating whether they contain diacritics
// ============================================================

console.log('\n' + '='.repeat(70));
console.log('FULL DUMP: ALL Swedish entries that are pure ASCII and >4 chars');
console.log('(These could be correct OR could be missing diacritics)');
console.log('Count them and see what percentage look suspicious');
console.log('='.repeat(70));

const svPureAscii = [];
for (const key of keys) {
  const val = data[key].sv;
  if (!val) continue;
  const trimmed = val.trim();
  if (/^[A-Za-z]+$/.test(trimmed) && trimmed.length > 4) {
    svPureAscii.push({ key, val: trimmed });
  }
}

svPureAscii.sort((a, b) => a.val.localeCompare(b.val));
console.log(`Total pure-ASCII Swedish words (>4 chars): ${svPureAscii.length}`);

// Sample 100 evenly distributed
const step = Math.max(1, Math.floor(svPureAscii.length / 100));
for (let i = 0; i < svPureAscii.length; i += step) {
  console.log(`  ${svPureAscii[i].key}: "${svPureAscii[i].val}"`);
}
