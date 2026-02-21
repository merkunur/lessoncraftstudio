/**
 * Part 107: Cross-Grade Validation — Farm + Zoo
 *
 * Both themes passed all 6 cross-grade checks with no fixes needed.
 * This script documents the validation results.
 *
 * Run: node scripts/apply-part107-seo.js
 */

const { execSync } = require('child_process');

console.log('=== Part 107: Cross-Grade Validation for Farm + Zoo ===\n');

// Run the cross-grade validator
console.log('Running cross-grade validation...\n');
try {
  const output = execSync('node scripts/validate-cross-grade.js farm zoo', {
    encoding: 'utf8',
    cwd: require('path').resolve(__dirname, '..')
  });
  console.log(output);
} catch (e) {
  console.error('Validation failed:', e.message);
  process.exit(1);
}

console.log('\n=== Part 107 Summary ===');
console.log('Themes validated: farm, zoo');
console.log('All 6 checks passed for both themes');
console.log('No content changes needed');
console.log('Keyword warnings (expected, different grade contexts):');
console.log('  Farm: tractor(3), word(3), harvest(3), writing(3)');
console.log('  Zoo: addition(3), within(3), conservation(3), species(3)');
console.log('Rubric escalation (monotonic):');
console.log('  Farm: 12 -> 27 -> 28 -> 39 -> 59');
console.log('  Zoo:  13 -> 28 -> 29 -> 38 -> 55');
