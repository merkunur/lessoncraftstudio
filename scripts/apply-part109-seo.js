/**
 * Part 109 — Cross-Grade Validation: Dinosaurs + Ocean
 *
 * Dinosaurs: all 6 checks PASS — no changes needed.
 *
 * Ocean: keyword overlap fixes in seoKeywords (2nd + 3rd grade):
 *
 * Second-grade (line 195):
 *   "repeated sea creature groups" → "repeated marine animal groups"    (removes "sea" + "creature")
 *   "growing tide pattern worksheets" → "growing tide sequence worksheets"  (removes "pattern")
 *
 * Third-grade (line 230):
 *   "sea life fraction" → "aquatic life fraction"           (removes "sea")
 *   "ocean creature proportions" → "ocean animal proportions"  (removes "creature")
 *   "reef population multiplication" → "habitat population multiplication"  (removes "reef")
 *
 * Result: all 4 overlapping words drop from ≥4 grades to ≤3 (warn level).
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'frontend', 'content', 'themes', 'ocean', 'en.ts');
const content = fs.readFileSync(file, 'utf8');

const checks = [
  { old: 'repeated marine animal groups', present: true },
  { old: 'growing tide sequence worksheets', present: true },
  { old: 'aquatic life fraction', present: true },
  { old: 'ocean animal proportions', present: true },
  { old: 'habitat population multiplication', present: true },
];

let pass = true;
for (const c of checks) {
  const found = content.includes(c.old);
  if (found !== c.present) {
    console.error(`FAIL: expected "${c.old}" to be ${c.present ? 'present' : 'absent'}`);
    pass = false;
  }
}

if (pass) {
  console.log('Part 109 ocean seoKeyword fixes verified.');
} else {
  console.error('Part 109 verification FAILED.');
  process.exit(1);
}
